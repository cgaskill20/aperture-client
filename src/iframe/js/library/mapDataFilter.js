/**
 * @class  MapDataFilter
 * @author Pierce Smith
 */

class MapDataFilter {
    constructor() {
        this.msCacheMaxAge = 10000;
        this.data = [];
    }

    /** Inserts a data element or array of data elements into the filter.
      * Data elements should be complete responses from the database,
      * with valid `geometry` and `properties` props.
      * 
      * @memberof MapDataFilter
      * @method add
      * @param {(object|Array<object>)} newData - the data to add, as a direct response from the database
      */
    add(newData) {
        if (Array.isArray(newData)) {
            this.addMultiple(newData);
        } else {
            this.addSingle(newData);
        }
    }

    /** Inserts a single data element to the filter.
      * @memberof MapDataFilter
      * @method add
      * @param {object} newData - the data to add, as a direct response from the database
      * @see add
      */
    addSingle(newData) {
        let entryAlreadyExists = this.data.find(entry => {
            if (newData.GISJOIN) {
                return entry.GISJOIN === newData.GISJOIN;
            } else {
                return false;
            }
        });

        if (entryAlreadyExists) {
            return;
        }

        newData.entryTime = Date.now();
        this.data.push(newData);

        if (this.newDataCallback) {
            this.newDataCallback(this.model(newData)); 
        }

        return true;
    }

    /** Inserts an array of data elements into the filter.
      * @memberof MapDataFilter
      * @method addMultiple
      * @param {Array<object>} newData - an array of data elements
      * @see add
      */
    addMultiple(newData) {
        for (let data of newData) {
            this.addSingle(data);
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
      * @param {Array<object>} data - an array of raw data as passed into the `add` method
      * @param {Leaflet Bounds} bounds
      * @returns {Array<object>} a subset of the data including only entries the filter is interested in
      */
    filter(data, bounds) {
        let filtered = data.filter(entry => Util.isInBounds(entry, bounds));
        this.discardOldData(this.msCacheMaxAge);
        return filtered;
    }

    /** Removes any data from the filter that is older in miliseconds than the
      * given max age.
      * @memberof MapDataFilter
      * @method discardOldData
      * @param {number} maxAge - the age, in milliseconds, that which any older data should be removed
      */
    discardOldData(maxAge) {
        this.data = this.data.filter(entry => (Date.now() - entry.entryTime) < maxAge)
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

        for (const entry of data) {
            if (entry.properties[feature] !== undefined) {
                model[feature].push(this.model(entry, feature));
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
            data: entry.properties[feature],
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
