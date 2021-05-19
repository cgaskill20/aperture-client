import Worker from "./queryWorker.js"
import Util from "./apertureUtil"

/**
 * @class Query
 * @file Makes queries and returns them
 * @author Daniel Reynolds
 */

const Query = {
    linked: {},
    linkedCollections: [],
    backgroundLoader: null,
    queryWorker: new Worker(),
    /**
      * Inits this namespace
      * @memberof Query
      * @param {JSON} queryableData JSON from automenu.js
      */
    init(queryableData) {
        console.log("here")
        this.queryWorker.postMessage({
            type: "config"
        });
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
        const { collection, granularity } = query;
        query.pipeline = query.pipeline ?? []
        this._throwErrorsIfNeeded({ collection });


        const linked = this.linked[query.collection];
        if (linked) { //making an edge case for this one cause it is fast as hell
            this._linkedQuery(linked, query);
        }
        else if(granularity === "coarse"){
            this._queryCoarse(query);
        }
        else if(granularity === "fine"){
            this._queryFine(query);
        }

        if (!query.callback) {
            return await this._callbackToPromise(query);
        }
    },

    async _callbackToPromise(query) {
        return new Promise(resolve => {
            let allData = [];
            const callback = ({ event, payload }) => {
                if (event === "data") {
                    payload.data && Array.isArray(payload.data) ? allData.push(...payload.data) : allData.push(payload.data);
                }
                else if (event === "end") {
                    const ret = {
                        data: allData
                    }
                    if (payload.geohashBlacklist) {
                        ret.geohashBlacklist = payload.geohashBlacklist;
                    }
                    resolve(ret);
                }
            }
            query.callback = callback;
        });
    },

    _linkedQuery(linked, query) {
        console.log(`in linkedQuery`)
        const { granularity } = query;
        this._throwErrorsIfNeeded({ granularity });
        const epsilon = 100;
        let waitingRoom = [];
        let geohashes;
        let waitingRoomDone = false;

        const waitingRoomListener = (response) => {
            const { event, payload } = response;
            if (event === "data") {
                payload.data && Array.isArray(payload.data) ? waitingRoom.push(...payload.data) : waitingRoom.push(payload.data);
                if (waitingRoom.length >= epsilon) {
                    dumpWaitingRoom();
                }
            }
            else if (event === "end") {
                waitingRoomDone = true;
                if (payload.geohashes) {
                    geohashes = payload.geohashes;
                }
                if (waitingRoom.length) {
                    dumpWaitingRoom();
                }
                else {
                    finished();
                }
            }
        }

        const finished = () => {
            const res = {
                event: "end",
                payload: {}
            }
            if(geohashes.length){
                res.payload = {
                    geohashes
                }
            }
            query.callback(res)
        }

        const dumpCallback = (d) => {
            const { event, payload } = d;
            if (event === "data") {
                query.callback(d);
            }
            else if (event === "end" && waitingRoomDone) {
                finished();
            }
        }

        const dumpWaitingRoom = () => {
            const queryDump = JSON.parse(JSON.stringify(query))
            const GISJOINS = waitingRoom.map(entry => entry.GISJOIN);
            queryDump.pipeline = [{ "$match": { "GISJOIN": { "$in": GISJOINS } } }, ...queryDump.pipeline]
            queryDump.callback = dumpCallback;
            this._queryMongo(queryDump);
            waitingRoom = [];
        }

        const queryLinked = JSON.parse(JSON.stringify(query))
        queryLinked.collection = linked;
        queryLinked.callback = waitingRoomListener;
        if (granularity === "coarse") {
            this._queryCoarse(queryLinked);
        }
        else if (granularity === "fine") {
            this._queryFine(queryLinked);
        }
    },

    _queryCoarse(query) {
        console.log(`in queryCoarse`)
        const { collection, bounds } = query;
        if (bounds && this.linkedCollections.includes(collection)) {
            this._queryPreloadedData(query)
        }
        else if(bounds) {
            //hard part
        }
        else{
            this._queryFine(query);
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
        const { bounds, pipeline } = query;
        if(bounds){
            const barray = Util.leafletBoundsToGeoJSONPoly(bounds);
            pipeline.push({ "$match": { geometry: { "$geoIntersects": { "$geometry": { type: "Polygon", coordinates: [barray] } } } } });
        }
        this._queryMongo(query)
    },

    _queryMongo(query) {
        const { pipeline, collection } = query;
        this._throwErrorsIfNeeded({ collection, pipeline });
        console.log("query mongo")
        const sessionID = Math.random().toString(36).substring(2, 6);
        this.queryWorker.postMessage({
            type: "query",
            collection,
            queryParams: pipeline,
            senderID: sessionID
        });

        const responseListener = msg => {
            const data = msg.data;
            if (data.senderID !== sessionID)
                return;
            if (data.type === "data") {
                const dataFromServer = data.data;
                Util.normalizeFeatureID(dataFromServer);
                query.callback({ event: "data", payload: { data: dataFromServer } })
            }
            else if (data.type === "end") {
                query.callback({ event: "end" })
                this.queryWorker.removeEventListener("message", responseListener);
            }
        }

        this.queryWorker.addEventListener("message", responseListener);
    },

    _throwErrorsIfNeeded(obj) {
        for (const [key, value] of Object.entries(obj)) {
            if (value == null) {
                throw new Error(`${key} cannot be null!`);
            }
        }
    },

}
window.Query = Query;
export default Query;
