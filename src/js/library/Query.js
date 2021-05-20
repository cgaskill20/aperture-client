import Worker from "./queryWorker.js"
import Util from "./apertureUtil"
import boundsToGISJOIN from "./boundsToGISJOIN"
import { geohash_adjacent, geohash_bounds } from "./geohash_util"

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
        for (const [collection, data] of Object.entries(queryableData)) {
            if (data.linkedGeometry) {
                this.linked[collection] = data.linkedGeometry;
            }
        }
        this.linkedCollections = [...new Set(Object.values(this.linked))]
        this.backgroundLoader = (linked) => linked === "tract_geo_140mb_no_2d_index" ? window.backgroundTract : window.backgroundCounty;
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
        else if (granularity === "coarse") {
            this._queryCoarse(query);
        }
        else if (granularity === "fine") {
            this._queryFine(query);
        }

        if (!query.callback) {
            return await this._callbackToPromise(query);
        }
    },

    async _callbackToPromise(query) {
        return new Promise(resolve => {
            let allData = [];
            let geohashes;
            const callback = ({ event, payload }) => {
                if (event === "data") {
                    payload.data && Array.isArray(payload.data) ? allData.push(...payload.data) : allData.push(payload.data);
                }
                else if(event === "info"){
                    if(payload.geohashes){
                        geohashes = payload.geohashes;
                    }
                }
                else if (event === "end") {
                    const ret = {
                        data: allData
                    }
                    if (geohashes) {
                        ret.geohashes = geohashes;
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
            else if(event === "info"){
                if (payload.geohashes) {
                    geohashes = payload.geohashes;
                }
            }
            else if (event === "end") {
                waitingRoomDone = true;
                if (waitingRoom.length) {
                    dumpWaitingRoom(true);
                }
                else {
                    finished();
                }
            }
        }

        const finished = () => {
            query.callback({event: "info", payload: { geohashes }})
            query.callback({event: "end"})
        }

        const dumpCallback = (d, ignoreEnd = true, waitingRoomSnapshot) => {
            const { event } = d;
            if (event === "data") {
                const complimentaryData = {...d.payload.data};
                const realData = waitingRoomSnapshot.find(entry => entry.GISJOIN === complimentaryData.GISJOIN);
                Util.normalizeFeatureID(realData);
                realData.id = `${realData.id}_${complimentaryData.id}`
                realData.properties = {
                    ...realData.properties,
                    ...complimentaryData,
                }
                d.payload.data = realData;
                query.callback(d);
            }
            else if (event === "end" && !ignoreEnd) {
                waitingRoomSnapshot = null;
                finished();
            }
            else if (event === "end") {
                waitingRoomSnapshot = null;
            }
        }

        const dumpWaitingRoom = (final = false) => {
            const queryDump = JSON.parse(JSON.stringify(query))
            const GISJOINS = waitingRoom.map(entry => entry.GISJOIN);
            const waitingRoomSnapshot = JSON.parse(JSON.stringify(waitingRoom))
            queryDump.pipeline = [{ "$match": { "GISJOIN": { "$in": GISJOINS } } }, ...queryDump.pipeline]
            queryDump.callback = (d) => { dumpCallback(d, !final, waitingRoomSnapshot) };
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
        if (!query.geohashBlacklist) {
            query.geohashBlacklist = [];
        }
        if (bounds && this.linkedCollections.includes(collection)) {
            this._queryPreloadedData(query)
        }
        else if (bounds) {
            //hard part
            const [coarseBounds, newGeohashes] = this._getBoundsGetGeohashes(query);
            query.callback({
                event: "info",
                payload: {
                    geohashes: newGeohashes
                }
            });
            const coarseCallback = (d, ignoreEnd = true) => {
                const { event, payload } = d;
                if (event === "data") {
                    query.callback(d);
                }
                else if(event === "end" && !ignoreEnd){
                    query.callback(d)
                }
            }

            coarseBounds.forEach((coarseBound, index) => {
                const queryClone = JSON.parse(JSON.stringify(query))
                queryClone.pipeline.unshift({ "$match": { geometry: { "$geoIntersects": { "$geometry": { type: "Polygon", coordinates: coarseBound } } } } });
                queryClone.callback = (d) => {coarseCallback(d, index !== coarseBounds.length-1)};
                this._queryMongo(queryClone)
            });
        }
        else {
            this._queryMongo(query);
        }
    },

    _getBoundsGetGeohashes(query) { //just another very complex space-filling algorithm...
        const { bounds, geohashBlacklist } = query;
        this._throwErrorsIfNeeded({ bounds, geohashBlacklist });
        const geohashes = boundsToGISJOIN.boundsToLengthNGeohashes(bounds, geohashBlacklist);
        const geohashGroup = {}
        const edges = {};
        const dirs = ['n', 's', 'e', 'w'];

        for (const hash of geohashes) {
            geohashGroup[hash] = -1;
        }

        const groupsDone = () => !Object.values(geohashGroup).includes(-1);

        const spread = (geohash, groupNum) => {
            geohashGroup[geohash] = groupNum;
            for (const dir of dirs) {
                const adjDir = geohash_adjacent(geohash, dir)
                if (geohashGroup[adjDir] === -1) {
                    spread(adjDir, groupNum)
                }
                else if (geohashGroup[adjDir] == null) {
                    edges[groupNum] = edges[groupNum] ?? new Set();
                    const bounds = geohash_bounds(geohash);
                    switch (dir) {
                        case 'n':
                            //top left, top right
                            edges[groupNum].add([[bounds.sw.lon, bounds.ne.lat], [bounds.ne.lon, bounds.ne.lat]]);
                            break;
                        case 's':
                            //bottom right, bottom left
                            edges[groupNum].add([[bounds.ne.lon, bounds.sw.lat], [bounds.sw.lon, bounds.sw.lat]]);
                            break;
                        case 'e':
                            // top right, bottom right
                            edges[groupNum].add([[bounds.ne.lon, bounds.ne.lat], [bounds.ne.lon, bounds.sw.lat]]);
                            break;
                        case 'w':
                            // bottom left, top left
                            edges[groupNum].add([[bounds.sw.lon, bounds.sw.lat], [bounds.sw.lon, bounds.ne.lat]]);
                            break;
                    }
                }
            }
        }

        const makeEdges = () => {
            let groupNum = 0;
            while (!groupsDone()) {
                const firstOffendor = Object.keys(geohashGroup)[Object.values(geohashGroup).indexOf(-1)]
                spread(firstOffendor, groupNum)
                groupNum++;
            }
        }

        makeEdges();

        const newBounds = Object.values(edges).map((edgeGroup) => {
            edgeGroup = [...edgeGroup]
            let edgeGroupCoverage = edgeGroup.map(() => false);
            let polys = []
            while (edgeGroupCoverage.includes(false)) {
                const firstNonCoveredIndex = edgeGroupCoverage.indexOf(false);
                let poly = [...edgeGroup[firstNonCoveredIndex]];
                edgeGroupCoverage[firstNonCoveredIndex] = true;

                while (JSON.stringify(poly[0]) !== JSON.stringify(poly[poly.length - 1])) {
                    const finalPointInPoly = poly[poly.length - 1];
                    poly.push(edgeGroup.find((edge, index) => {
                        const isNext = JSON.stringify(finalPointInPoly) === JSON.stringify(edge[0])
                        if (isNext) {
                            edgeGroupCoverage[index] = true;
                            return true;
                        }
                        return false;
                    })[1]);
                }

                polys.push(poly)
            }
            polys = polys.sort((a,b) => b.length - a.length).map(poly => {
                let recentGoodPoint = 0;
                return poly.filter((point, index) => {
                    if (index === 0 || index === poly.length - 1) {
                        return true;
                    }
                    if ((poly[recentGoodPoint][0] === poly[index + 1][0] || poly[recentGoodPoint][1] === poly[index + 1][1])) {
                        return false;
                    }
                    recentGoodPoint = index;
                    return true;
                });
            })
            return polys;
        });
        return [newBounds, geohashes];
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
                callback({ event: "info", payload: { geohashes: newGeohashes } });
                callback({ event: "end" });
            }

        }
        loader.addEventListener("message", responseListener)
    },

    _queryFine(query) {
        const { bounds, pipeline } = query;
        if (bounds) {
            const barray = Util.leafletBoundsToGeoJSONPoly(bounds);
            pipeline.unshift({ "$match": { geometry: { "$geoIntersects": { "$geometry": { type: "Polygon", coordinates: [barray] } } } } });
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

Query.queryWorker.postMessage({
    type: "config"
});

window.Query = Query;
export default Query;
