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
    constructor(collection) {
        this.querier = sustain_querier();
        this.collection = collection;

        this.cache = [];
    }

    //public functions ------------------------
    getCachedData(geohashes){
        if(!Object.keys(this.cache).length)
            return null;
        const geohashesCached = Object.keys(this.cache).filter((current) => {
            if(geohashes.includes(current)) 
                return true
            return false
        });
        let resultList = [];
        let resultGISJOINS = [];
        for(const gh of geohashesCached){
            resultList = this.addListToListNoDuplicates(this.cache[gh],resultList)
            resultGISJOINS = this.addListToListNoDuplicates(this.cache[gh].map(f => {return f.GISJOIN}),resultGISJOINS)
        }
        return {
            geohashes: geohashesCached,
            GISJOINS: resultGISJOINS,
            data: resultList
        }
    }

    /**
      * Gets data within viewport, and does lots of stuff with it
      * @memberof GeometryLoader
      * @method getData
      */
    getNonCachedData(geohashesGISJOINS, responseFunction) {
        const invertedMap = this.getInvertedGeohashGISJOINMap(geohashesGISJOINS);
        const GISJOINS = Object.keys(invertedMap);
        const q = [{ "$match": { "GISJOIN": { "$in": GISJOINS } } }];
        const stream = this.querier.getStreamForQuery(this.collection,JSON.stringify(q));
        stream.on('data', (r) => {
            const data = JSON.parse(r.getData());
            const geohashes = invertedMap[data.GISJOIN];
            responseFunction({
                geohashes: geohashes,
                GISJOINS: [data.GISJOIN],
                data: [data]
            });
            for(const geohash of geohashes){
                if(!this.cache[geohash]) 
                    this.cache[geohash] = []
                this.cache[geohash] = this.addListToListNoDuplicates(this.cache[geohash],[data]);
            }
        });
        stream.on('end', (e) => {
            responseFunction("END");
            return;
        });
    }

    getInvertedGeohashGISJOINMap(geohashesGISJOINS){
        const reverse = {};
        for(const geohash in geohashesGISJOINS){
            for(const GISJOIN of geohashesGISJOINS[geohash]){
                if(!reverse[GISJOIN])
                    reverse[GISJOIN] = [];
                reverse[GISJOIN] = this.addListToListNoDuplicates([geohash],reverse[GISJOIN]);
            }
        }
        return reverse;
    }   

    addListToListNoDuplicates(listToAdd,list){
        return [...new Set([...listToAdd,...list])];
    }
}

try {
    module.exports = {
        GeometryLoader: GeometryLoader
    }
} catch (e) { }
