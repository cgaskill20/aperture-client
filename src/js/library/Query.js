/**
 * @class Query
 * @file Makes queries and returns them
 * @author Daniel Reynolds
 */

const Query = {
    linked: {},
    linkedCollections: [],
    backgroundLoader: null,
    /**
      * Inits this namespace
      * @memberof Query
      * @param {JSON} queryableData JSON from automenu.js
      */
    init(queryableData) {
        for (const [collection, data] of Object.entries(queryableData)) {
            if (data.linkedGeometry) {
                this.linked[collection] = data.linkedGeometry;
            }
        }
        this.linkedCollections = [...new Set(Object.values(this.linked))]
        this.backgroundLoader = (linked) => linked === "tract_geo_140mb_no_2d_index" ? window.backgroundTract : window.backgroundCounty;
        console.log(this.linkedCollections)
    },

    /**
      * Makes a query
      * @memberof Query
      * @param {JSON} query JSON that matches a query schema
      */
    async makeQuery(query) {
        // if (!this.backgroundLoader) {
        //     throw "Query namespace needs to be `init`ted!";
        // }

        const linked = this.linked[query.collection];
        if (linked) { //making an edge case for this one cause it is fast as hell
            this._linkedQuery(linked, query);
        }

    },

    _linkedQuery(linked, query) {
        const { bounds, callback, granularity, geohashBlacklist } = query;
        const epsilon = 100;
    },

    _queryCoarse(query, callbackTo = null) {
        const { collection, bounds, geohashBlacklist, callback } = query;
        callbackTo = callbackTo ?? callback
        if (this.linkedCollections.includes(collection)) {
            const loader = this.backgroundLoader(collection);
            let newGeohashes = [];
            const sessionID = Math.random().toString(36).substring(2, 6);

            loader.postMessage({
                type: "query",
                senderID: sessionID,
                bounds: bounds,
                blacklist: geohashBlacklist ?? []
            });

            const responseListener = msg => {
                const data = msg.data;
                //check that the data is sent from this querier
                if (data.senderID !== sessionID)
                    return;

                if (data.type === "data") {
                    //populate records & cache with no duplicates
                    callbackTo({ event: "data", data: data.data.data });
                    newGeohashes = [...new Set([...data.data.geohashes, ...newGeohashes])];
                }
                else if (data.type === "end") {
                    //close the listener
                    loader.removeEventListener("message", responseListener);
                    callbackTo({ event: "end", geohashes: newGeohashes });
                }

            }
            loader.addEventListener("message", responseListener)
        }
        else {

        }
    },

    _queryFine(query) {

    },

    addToExistingFeaturesNoDuplicates(existingFeatures, newFeatures) {
        const newFeaturesNoDuplicates = newFeatures.filter(nFeature => {
            return !existingFeatures.find(eFeature => eFeature.GISJOIN === nFeature.GISJOIN)
        });
        return existingFeatures.concat(newFeaturesNoDuplicates)
    },

}

export default Query;
