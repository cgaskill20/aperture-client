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
        this.db = new Dexie(collection);
        this.db.version(1).stores({
            data: 'geohash' //only need to index the geohash field
        });
    }

    //public functions ------------------------
    async getCachedData(geohashes) {
        const relevantItems = await this.db.data.where("geohash")
                                    .anyOf(geohashes)
                                    .toArray();
        if (!relevantItems)
            return null;
        let resultList = [];
        let resultGISJOINS = [];
        let relevantGeohashes = [];
        for (const item of relevantItems) {
            relevantGeohashes = this.addListToListNoDuplicates([item.geohash], relevantGeohashes)
            resultList = this.addListToListNoDuplicates(item.featureTable, resultList)
            resultGISJOINS = this.addListToListNoDuplicates(item.featureTable.map(f => { return f.GISJOIN }), resultGISJOINS)
        }
        return {
            geohashes: relevantGeohashes,
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
        const stream = this.querier.getStreamForQuery(this.collection, JSON.stringify(q));
        const miniCache = [];
        stream.on('data', async (r) => {
            const data = JSON.parse(r.getData());
            const geohashes = invertedMap[data.GISJOIN];
            responseFunction({
                geohashes: geohashes,
                GISJOINS: [data.GISJOIN],
                data: [data]
            });
            for (const geohash of geohashes) {
                if (!miniCache[geohash])
                    miniCache[geohash] = []
                miniCache[geohash] = this.addListToListNoDuplicates(miniCache[geohash], [data]);
            }
        });
        stream.on('end', (e) => {
            for (const geohash in miniCache) {
                this.db.data.put({
                    geohash: geohash,
                    featureTable: miniCache[geohash]
                });
            }
            responseFunction("END");
            return;
        });
    }

    getInvertedGeohashGISJOINMap(geohashesGISJOINS) {
        const reverse = {};
        for (const geohash in geohashesGISJOINS) {
            for (const GISJOIN of geohashesGISJOINS[geohash]) {
                if (!reverse[GISJOIN])
                    reverse[GISJOIN] = [];
                reverse[GISJOIN] = this.addListToListNoDuplicates([geohash], reverse[GISJOIN]);
            }
        }
        return reverse;
    }

    addListToListNoDuplicates(listToAdd, list) {
        return [...new Set([...listToAdd, ...list])];
    }
}

try {
    module.exports = {
        GeometryLoader: GeometryLoader
    }
} catch (e) { }
