import Worker from "./queryWorker.js"

/**
 * @class Query
 * @file Makes queries and returns them
 * @author Daniel Reynolds
 */

const Query = {
    linked: {},
    linkedCollections: [],
    backgroundLoader: null,
    queryWorker = new Worker(),
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
        console.log(this.linked)
    },

    /**
      * Makes a query
      * @memberof Query
      * @param {JSON} query JSON that matches a query schema
      */
    async makeQuery(query) {
        console.log(`in makeQuery`)
        const { collection } = query;
        this._throwErrorsIfNeeded({ collection });
        // if (!this.backgroundLoader) {
        //     throw "Query namespace needs to be `init`ted!";
        // }

        const linked = this.linked[query.collection];
        if (linked) { //making an edge case for this one cause it is fast as hell
            this._linkedQuery(linked, query);
        }

    },

    _linkedQuery(linked, query) {
        console.log(`in linkedQuery`)
        const { granularity } = query;
        this._throwErrorsIfNeeded({ granularity });
        const epsilon = 100;
        let waitingRoom = [];

        const waitingRoomListener = (response) => {
            const { event, payload } = response;
            if (event === "data") {
                payload.data && waitingRoom.push(payload.data);
                if (waitingRoom.length >= epsilon) {
                    dumpWaitingRoom();
                }
            }
            else if (event === "end") {
                if (waitingRoom.length) {
                    dumpWaitingRoom();
                }
            }
        }

        const dumpWaitingRoom = () => {
            const queryClone = JSON.parse(JSON.stringify(query))
            const GISJOINS = waitingRoom.map(entry => entry.GISJOIN);
            queryClone.pipeline = [{ "$match": { "GISJOIN": { "$in": GISJOINS } } }, ...queryClone.pipeline]
            this._queryMongo(queryClone);
            waitingRoom = [];
        }

        const queryClone = JSON.parse(JSON.stringify(query))
        queryClone.collection = linked;
        queryClone.callback = waitingRoomListener;
        if (granularity === "coarse") {
            this._queryCoarse(queryClone);
        }
    },

    _queryCoarse(query) {
        console.log(`in queryCoarse`)
        const { collection } = query;
        if (this.linkedCollections.includes(collection)) {
            this._queryPreloadedData(query)
        }
        else {

        }
    },

    _queryPreloadedData(query) {
        const { collection, bounds, geohashBlacklist, callback } = query;
        this._throwErrorsIfNeeded({ collection, bounds, callback });

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
                callback({ event: "data", payload: { data: data.data.data } });
                newGeohashes = [...new Set([...data.data.geohashes, ...newGeohashes])];
            }
            else if (data.type === "end") {
                //close the listener
                loader.removeEventListener("message", responseListener);
                callback({ event: "end", payload: { geohashes: newGeohashes } });
            }

        }
        loader.addEventListener("message", responseListener)
    },

    _queryFine(query) {

    },

    _queryMongo(query) {
        const { pipeline, collection } = query;
        this._throwErrorsIfNeeded({ collection, pipeline });
    },

    _throwErrorsIfNeeded(obj) {
        for (const [key, value] of Object.entries(obj)) {
            if (value == null) {
                throw new Error(`${key} cannot be null!`);
            }
        }
    }

    // addToExistingFeaturesNoDuplicates(existingFeatures, newFeatures) {
    //     const newFeaturesNoDuplicates = newFeatures.filter(nFeature => {
    //         return !existingFeatures.find(eFeature => eFeature.GISJOIN === nFeature.GISJOIN)
    //     });
    //     return existingFeatures.concat(newFeaturesNoDuplicates)
    // },

}
window.Query = Query;
export default Query;
