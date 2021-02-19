/**
 * @class GeometryLoader
 * @file Load trivial geometry in the background.
 * @author Daniel Reynolds
 * @dependencies autoQuery.js
 * @notes Work in progress!
 */

class GeometryLoader {
    /**
      * Constructor which initializes the GeometryLoader
      * @memberof GeometryLoader
      * @method constructor
      * @param {string} collection name of MongoDB collection which this file will be throwing queries at
      * @param {Leaflet Map} map leaflet map which is relevant to this loader
      * @param {Number} maxSize represents the maximum size of this loader's cache. This should be smaller
      * for coarser grained geometry (counties) and higher for finer grained geometries (tracts) 
      */
    constructor(collection, map, maxSize) {
        this.map = map;
        this.queryWorker = new SharedWorker('js/library/queryWorker.js'); //init querier
        this.collection = collection;
        this.maxSize = maxSize;

        this.cache = [];
        this.tempCache = [];
        this.listeners = [];
        this.streams = [];
    }


    //public functions ------------------------
    /**
      * Gets cached GISJOINS, which represent the readily available layers
      * @memberof GeometryLoader
      * @method getCachedGISJOINS
      * @returns {Array<string>} array of GISJOINS
      */
    getCachedGISJOINS() {
        return this.convertArrayToGISJOINS(this.cache);
    }

    /**
      * Gets geometry from a GISJOIN
      * @memberof GeometryLoader
      * @method getGeometryFromGISJOIN
      * @param {string} GISJOIN GISJOIN pertaining to the geometry we are looking fore
      * @param {Array<GeoJSON>} arr OPTIONAL parameter. If this is not provided, the method will search the cache
      * for the GISJOIN. If it is, it will search @param arr for the GISJOIN.
      * @returns {GeoJSON} GeoJSON feature which matches the GISJOIN, null if it doesnt exist
      */
    getGeometryFromGISJOIN(GISJOIN, arr) {
        const indx = arr ? this.indexInArray(GISJOIN, arr) : this.indexInCache(GISJOIN);
        if (indx === -1)
            return null;
        return arr ? arr[indx] : this.cache[indx];
    }

    /**
      * Adds a function listener that listens for new results.
      * @memberof GeometryLoader
      * @method addNewResultListener
      * @param {Function} func function which will listen for new results. The function will be provided with a 
      * array of GeoJSON features whenever new results come in.
      */
    addNewResultListener(func) {
        this.listeners.push(func);
    }

    /**
      * Gets all GISJOINS from an array of GeoJSON features
      * @memberof GeometryLoader
      * @method convertArrayToGISJOINS
      * @param {Array<GeoJSON>} arr array of GeoJSON features
      * @returns {Array<string>} of GISJOINS
      */
    convertArrayToGISJOINS(arr) {
        let ret = [];
        for (const obj of arr) {
            ret.push(obj.GISJOIN);
        }
        return ret;
    }

    /**
      * Kills old streams and runs a query. This is called from an external file
      * @memberof GeometryLoader
      * @method runQuery
      */
    runQuery() {
        this.queryWorker.port.postMessage({ type: "kill", collection: this.collection });
        this.getData();
    }


    //private functions -----------------------

    /**
      * Sends new results to all listeners
      * @memberof GeometryLoader
      * @method broadcastNewResults
      * @param {Array<GeoJSON>} newResults array of GeoJSON features
      */
    broadcastNewResults(newResults) {
        for (const callback of this.listeners) {
            callback(newResults);
        }
    }

    /**
      * Gets data within viewport, and does lots of stuff with it
      * @memberof GeometryLoader
      * @method getData
      */
    getData() {
        let newResults = [];
        /*
        this.sustainQuerier.query(this.collection, this.getBasicSpatialQuery(), 
            (data) => {
                Util.normalizeFeatureID(data);

                //remove an existing refrence
                const indexInCache = this.indexInCache(data.GISJOIN);
                if (indexInCache !== -1) {
                    this.cache.splice(indexInCache, 1);
                }
                else {
                    newResults.push(data);
                }

                this.cache.unshift(data); //add it to the front of the arr

                if (this.cache.length > this.maxSize) { //if length is too long, pop from end
                    this.cache.pop();
                }
            }, () => {
                this.broadcastNewResults(newResults);
            }
        );
        */

        this.queryWorker.port.postMessage({
            type: "query",
            collection: this.collection,
            queryParams: this.getBasicSpatialQuery(),
        });

        this.queryWorker.port.onmessage = msg => {
            if (msg.data.type == "data") {
                let data = msg.data.data;
                Util.normalizeFeatureID(data);

                //remove an existing refrence
                const indexInCache = this.indexInCache(data.GISJOIN);
                if (indexInCache !== -1) {
                    this.cache.splice(indexInCache, 1);
                }
                else {
                    newResults.push(data);
                }

                this.cache.unshift(data); //add it to the front of the arr

                if (this.cache.length > this.maxSize) { //if length is too long, pop from end
                    this.cache.pop();
                }
            } else if (msg.data.type == "end") {
                this.broadcastNewResults(newResults);
            }
        };
    }

    /**
      * Finds a GISJOINS' index in the cache
      * @memberof GeometryLoader
      * @method indexInCache
      * @param {string} GISJOIN GISJOIN to search for
      */
    indexInCache(GISJOIN) {
        return this.indexInArray(GISJOIN, this.cache);
    }

    /**
      * Finds a GISJOINS' index in an array of GeoJSON
      * @memberof GeometryLoader
      * @method indexInArray
      * @param {string} GISJOIN GISJOIN to search for
      * @param {Array<GeoJSON>} arr array to search through
      */
    indexInArray(GISJOIN, arr) {
        let indx = 0;
        for (const obj of arr) {
            if (obj.GISJOIN === GISJOIN) {
                return indx;
            }
            indx++;
        }
        return -1;
    }

    /**
      * Gets GeoJSON bounds array of this classes' leaflet map
      * @memberof GeometryLoader
      * @method getMapBoundsArray
      */
    getMapBoundsArray() {
        const b = this.map.wrapLatLngBounds(this.map.getBounds());
        const barray = Util.leafletBoundsToGeoJSONPoly(b);
        return barray;
    }

    /**
      * Build a mongodb aggregation query to look for all geometry within the map's current viewport
      * @memberof GeometryLoader
      * @method getBasicSpatialQuery
      */
    getBasicSpatialQuery() {
        return [{ "$match": { geometry: { "$geoIntersects": { "$geometry": { type: "Polygon", coordinates: [this.getMapBoundsArray()] } } } } }];
    }
}

try {
  module.exports = {
      GeometryLoader: GeometryLoader
  }
} catch (e) { }
