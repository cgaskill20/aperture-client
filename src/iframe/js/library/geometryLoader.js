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
        if (!relevantItems.length)
            return null;
        let resultList = [];
        let resultGISJOINS = [];
        let relevantGeohashes = [];
        for (const item of relevantItems) {
            relevantGeohashes = this.addListToListNoDuplicates([item.geohash], relevantGeohashes)
            resultList = this.addFeatureListToFeatureListNoDuplicates(item.featureTable, resultList)
            resultGISJOINS = this.addListToListNoDuplicates(item.featureTable.map(f => { return f.GISJOIN }), resultGISJOINS)
        }
        return {
            geohashes: relevantGeohashes,
            GISJOINS: resultGISJOINS,
            data: resultList
        }
    }

    async getPreloadedBuckets() {
        return new Promise(((resolve) => {
            const waitForExist = () => {
                if(!BoundsToGISJOIN.buckets || !Object.keys(BoundsToGISJOIN.buckets).length){
                    setTimeout(function(){
                        waitForExist();
                    }, 150);
                }
                else{
                    resolve(BoundsToGISJOIN.buckets);
                }
            }
            waitForExist();
        }));
    }

    async preloadData(statusCallback,endCallback) {
        const preloadedBuckets = await this.getPreloadedBuckets();
        const testDBExistence = await this.getCachedData(Object.keys(preloadedBuckets).slice(0,10));
        if(testDBExistence){
            console.log("DB exists, no preload required")
            endCallback();
            return;
        }
        console.log("Preloading database")
        const invertedMap = this.getInvertedGeohashGISJOINMap(preloadedBuckets);
        const total = Object.keys(invertedMap).length;
        const stream = this.querier.getStreamForQuery(this.collection, '[]');
        const miniCache = {};
        let numResponse = 0;
        let prevPctDone = 0;
        stream.on('data', async (r) => {
            const data = JSON.parse(r.getData());
            const geohashes = invertedMap[data.GISJOIN];
            numResponse++;
            let pctDone = Math.floor(numResponse / total * 100);
            if(pctDone > prevPctDone){
                statusCallback({
                    pctDone: pctDone
                });
                prevPctDone = pctDone;
            }
            for (const geohash of geohashes) {
                if (!miniCache[geohash])
                    miniCache[geohash] = []
                miniCache[geohash] = this.addListToListNoDuplicates(miniCache[geohash], [data]);
            }
        });
        stream.on('end', (e) => {
            let toPut = [];
            statusCallback({
                pctDone: 100
            });
            for (const geohash in miniCache) {
                toPut.push({
                    geohash: geohash,
                    featureTable: miniCache[geohash]
                });
            }
            this.db.data.bulkPut(toPut).then(done => {
                console.log("DB is ready!")
                endCallback();
            })
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

    addFeatureListToFeatureListNoDuplicates(newFeatures, existingFeatures) {
        const newFeaturesNoDuplicates = newFeatures.filter(nFeature => {
            return !existingFeatures.find(eFeature => eFeature.GISJOIN === nFeature.GISJOIN)
        });
        return existingFeatures.concat(newFeaturesNoDuplicates)
    }
}

try {
    module.exports = {
        GeometryLoader: GeometryLoader
    }
} catch (e) { }
