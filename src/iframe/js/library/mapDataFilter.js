importScripts('./charting/feature.js');

/**
 * @class  MapDataFilter
 * @author Pierce Smith
 */

class MapDataFilter {
    constructor() {
        this.msCacheMaxAge = 10000000;
        this.data = {};
    }

    /** Inserts a data element or array of data elements into the filter.
      * Data elements should be complete responses from the database,
      * with valid `geometry` and `properties` props.
      * 
      * @memberof MapDataFilter
      * @method add
      * @param {(object|Array<object>)} newData The data to add, as a direct response from the database
      * @param {string} collection The collection the data is a part of
      */
    add(newData, collection) {
        if (Array.isArray(newData)) {
            this.addMultiple(newData, collection);
        } else {
            this.addSingle(newData, collection);
        }
    }

    /** Inserts a single data element to the filter.
      * @memberof MapDataFilter
      * @method add
      * @param {object} newData The data to add, as a direct response from the database
      * @param {string} collection The collection the data is a part of
      * @see add
      */
    addSingle(newData, collection) {
        let entryAlreadyExists = Object.values(this.data).find(entry => {
            if (newData.id) {
                return entry.id === newData.id;
            } else {
                return false;
            }
        });

        if (entryAlreadyExists) {
            return;
        }

        newData.entryTime = Date.now();
        if (!this.data[collection]) {
            this.data[collection] = [];
        }
        this.data[collection].push(newData);

        if (this.newDataCallback) {
            this.newDataCallback(this.model(newData)); 
        }

        return true;
    }

    /** Inserts an array of data elements into the filter.
      * @memberof MapDataFilter
      * @method addMultiple
      * @param {Array<object>} newData An array of data elements
      * @param {string} collection The collection the data is a part of
      * @see add
      */
    addMultiple(newData, collection) {
        for (let data of newData) {
            this.addSingle(data, collection);
        }
    }

    /* Given the name of a feature and the bounds of the map, return a
     * formatted "model" of this data in the filter.  
     * Only data entries whose geometry fits in the bounds will be added.
     * For instance, if you want to model temperature, this is stored as a
     * "temp" property in the data entires, so you'd pass "temp" as
     * the feature.
     * Multiple features can also be passed in an array and it will model
     * each one.  
     * The resulting "model" is an object with one property for each
     * feature, whose key is the name of the feature requested and whose 
     * value is a list of all of the values associated with that feature
     * found in the data set.
     */
    getModel(feature, bounds) {
        let filteredData = this.filter(this.data, bounds);

        if (Array.isArray(feature)) {
            return this.getMultipleModel(feature, filteredData);
        } else {
            return this.getSingleModel(feature, filteredData);
        }
    }

    /** Remove all of the data from the filter.
      * @memberof MapDataFilter
      * @method clear
      */
    clear() {
        this.data = [];
    }

    /** Given a set of raw data and a leaflet bounds object,
      * return only the data that the filter is interested in.
      * This means, at a minimum, that any data outside the bounds
      * is discarded.
      * @memberof MapDataFilter
      * @method filter
      * @param {object} data An object collating raw data as passed into the `add` method
      * @param {Leaflet Bounds} bounds
      * @returns {Array<object>} a subset of the data including only entries the filter is interested in
      */
    filter(data, bounds) {
        // oh god
        let filtered = Object.values(data).map(coll => coll.filter(datum => Util.isInBounds(datum, bounds))).flat();

        // Now that unchecking collections nukes whole parts of the dataset, this probably isn't necessary
        //this.discardOldData(this.msCacheMaxAge);
        return filtered;
    }

    /** Removes any data from the filter that is older in miliseconds than the
      * given max age.
      * @memberof MapDataFilter
      * @method discardOldData
      * @param {number} maxAge - the age, in milliseconds, that which any older data should be removed
      */
    discardOldData(maxAge) {
        this.data = Object.fromEntries(Object.entries(this.data).map(kv => { 
            return [kv[0], kv[1].filter(datum => ((Date.now() - datum.entryTime) < maxAge))];
        }));
    }

    /** Gets a model for a single feature.
      * See the getModel function for more information on what a 
      * "model" means in this context.
      * @memberof MapDataFilter
      * @method getSingleModel
      * @param {string} feature - the feature to model
      * @param {Array<object>} data - the data to create the model from
      * returns {object} the model
      */
    getSingleModel(feature, data) {
        const model = {};
        model[feature] = [];

        for (const datum of data) {
            if (datum.properties[Feature.getName(feature)] !== undefined) {
                model[feature].push(this.model(datum, feature));
            }
        }

        return model;
    }

    /** Formats data to a single model datapoint.
      * Currently, the datapoints are objects with a data, type, and locationName property.
      * The data is the actual data, the type is either "county" or "tract", and
      * locationName should be self-explanatory.
      * @memberof MapDataFilter
      * @method model
      * @param {object} entry The data entry to format
      * @param {string} feature The feature to model over
      * @returns {object} An object with a data, type, and locationName property
      */
    model(entry, feature) { 
        return { 
            data: entry.properties[Feature.getName(feature)],
            type: this.dataLocation(entry),
            locationName: entry.properties.NAME10,
            feature: feature,
        };
    }

    /** Given a data entry, tell what kind of location it is tied to.
      * (e.g. county or tract)
      * @param {object} entry The data entry to examine
      * @returns {string} A string that describes the entry's location
      */
    dataLocation(entry) {
        let locationName = entry.properties.NAMELSAD10;
        if (/\bCounty\b/gi.test(locationName)) {
           return "county";
        }
        if (/\Tract\b/gi.test(locationName)) {
            return "tract";
        }
        return undefined;
    }

    /** Gets an array of models for multiple features.
      * See the getModel function for more information on what a 
      * "model" means in this context.
      * @memberof MapDataFilter
      * @method getSingleModel
      * @param {Array<string>} features The features to model
      * @param {Array<object>} data The data to create the model from
      * returns {Array<object>} the models
      */
    getMultipleModel(features, data) {
        let model = {};

        for (const feature of features) {
            const singleModel = this.getSingleModel(feature, data);
            model = { ...model, ...singleModel };
        }

        return model;
    }

    /** Removes all data in the filter over the given collection.
      * @memberof MapDataFilter
      * @method destroyAllOverCollection
      * @param {string} collection The collection for which to remove data 
     */
    removeAllOverCollection(collection) {
        this.data[collection] = []; // have fun gc
    }

    /** Set a callback that fires whenever new data arrives. The callback will
      * be given one parameter filled with the new data in its processed
      * (modeled) form.
      * @memberof MapDataFilter
      * @method onGetNewData
      * @param {Function} callback Callback to fire whenever new data comes into the filter
      */
    onGetNewData(callback) {
        this.newDataCallback = callback;
    }
}


try {
    module.exports = {
        MapDataFilter: MapDataFilter,
    }
} catch (e) { }
