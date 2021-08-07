/*                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/


Software in the Sustain Ecosystem are Released Under Terms of Apache Software License 

This research has been supported by funding from the US National Science Foundation's CSSI program through awards 1931363, 1931324, 1931335, and 1931283. The project is a joint effort involving Colorado State University, Arizona State University, the University of California-Irvine, and the University of Maryland - Baltimore County. All redistributions of the software must also include this information. 

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION


1. Definitions.

"License" shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.

"Licensor" shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.

"Legal Entity" shall mean the union of the acting entity and all other entities that control, are controlled by, or are under common control with that entity. For the purposes of this definition, "control" means (i) the power, direct or indirect, to cause the direction or management of such entity, whether by contract or otherwise, or (ii) ownership of fifty percent (50%) or more of the outstanding shares, or (iii) beneficial ownership of such entity.

"You" (or "Your") shall mean an individual or Legal Entity exercising permissions granted by this License.

"Source" form shall mean the preferred form for making modifications, including but not limited to software source code, documentation source, and configuration files.

"Object" form shall mean any form resulting from mechanical transformation or translation of a Source form, including but not limited to compiled object code, generated documentation, and conversions to other media types.

"Work" shall mean the work of authorship, whether in Source or Object form, made available under the License, as indicated by a copyright notice that is included in or attached to the work (an example is provided in the Appendix below).

"Derivative Works" shall mean any work, whether in Source or Object form, that is based on (or derived from) the Work and for which the editorial revisions, annotations, elaborations, or other modifications represent, as a whole, an original work of authorship. For the purposes of this License, Derivative Works shall not include works that remain separable from, or merely link (or bind by name) to the interfaces of, the Work and Derivative Works thereof.

"Contribution" shall mean any work of authorship, including the original version of the Work and any modifications or additions to that Work or Derivative Works thereof, that is intentionally submitted to Licensor for inclusion in the Work by the copyright owner or by an individual or Legal Entity authorized to submit on behalf of the copyright owner. For the purposes of this definition, "submitted" means any form of electronic, verbal, or written communication sent to the Licensor or its representatives, including but not limited to communication on electronic mailing lists, source code control systems, and issue tracking systems that are managed by, or on behalf of, the Licensor for the purpose of discussing and improving the Work, but excluding communication that is conspicuously marked or otherwise designated in writing by the copyright owner as "Not a Contribution."

"Contributor" shall mean Licensor and any individual or Legal Entity on behalf of whom a Contribution has been received by Licensor and subsequently incorporated within the Work.

2. Grant of Copyright License. Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare Derivative Works of, publicly display, publicly perform, sublicense, and distribute the Work and such Derivative Works in Source or Object form.

3. Grant of Patent License. Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable (except as stated in this section) patent license to make, have made, use, offer to sell, sell, import, and otherwise transfer the Work, where such license applies only to those patent claims licensable by such Contributor that are necessarily infringed by their Contribution(s) alone or by combination of their Contribution(s) with the Work to which such Contribution(s) was submitted. If You institute patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Work or a Contribution incorporated within the Work constitutes direct or contributory patent infringement, then any patent licenses granted to You under this License for that Work shall terminate as of the date such litigation is filed.

4. Redistribution. You may reproduce and distribute copies of the Work or Derivative Works thereof in any medium, with or without modifications, and in Source or Object form, provided that You meet the following conditions:

You must give any other recipients of the Work or Derivative Works a copy of this License; and
You must cause any modified files to carry prominent notices stating that You changed the files; and
You must retain, in the Source form of any Derivative Works that You distribute, all copyright, patent, trademark, and attribution notices from the Source form of the Work, excluding those notices that do not pertain to any part of the Derivative Works; and
If the Work includes a "NOTICE" text file as part of its distribution, then any Derivative Works that You distribute must include a readable copy of the attribution notices contained within such NOTICE file, excluding those notices that do not pertain to any part of the Derivative Works, in at least one of the following places: within a NOTICE text file distributed as part of the Derivative Works; within the Source form or documentation, if provided along with the Derivative Works; or, within a display generated by the Derivative Works, if and wherever such third-party notices normally appear. The contents of the NOTICE file are for informational purposes only and do not modify the License. You may add Your own attribution notices within Derivative Works that You distribute, alongside or as an addendum to the NOTICE text from the Work, provided that such additional attribution notices cannot be construed as modifying the License. 

You may add Your own copyright statement to Your modifications and may provide additional or different license terms and conditions for use, reproduction, or distribution of Your modifications, or for any such Derivative Works as a whole, provided Your use, reproduction, and distribution of the Work otherwise complies with the conditions stated in this License.
5. Submission of Contributions. Unless You explicitly state otherwise, any Contribution intentionally submitted for inclusion in the Work by You to the Licensor shall be under the terms and conditions of this License, without any additional terms or conditions. Notwithstanding the above, nothing herein shall supersede or modify the terms of any separate license agreement you may have executed with Licensor regarding such Contributions.

6. Trademarks. This License does not grant permission to use the trade names, trademarks, service marks, or product names of the Licensor, except as required for reasonable and customary use in describing the origin of the Work and reproducing the content of the NOTICE file.

7. Disclaimer of Warranty. Unless required by applicable law or agreed to in writing, Licensor provides the Work (and each Contributor provides its Contributions) on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied, including, without limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely responsible for determining the appropriateness of using or redistributing the Work and assume any risks associated with Your exercise of permissions under this License.

8. Limitation of Liability. In no event and under no legal theory, whether in tort (including negligence), contract, or otherwise, unless required by applicable law (such as deliberate and grossly negligent acts) or agreed to in writing, shall any Contributor be liable to You for damages, including any direct, indirect, special, incidental, or consequential damages of any character arising as a result of this License or out of the use or inability to use the Work (including but not limited to damages for loss of goodwill, work stoppage, computer failure or malfunction, or any and all other commercial damages or losses), even if such Contributor has been advised of the possibility of such damages.

9. Accepting Warranty or Additional Liability. While redistributing the Work or Derivative Works thereof, You may choose to offer, and charge a fee for, acceptance of support, warranty, indemnity, or other liability obligations and/or rights consistent with this License. However, in accepting such obligations, You may act only on Your own behalf and on Your sole responsibility, not on behalf of any other Contributor, and only if You agree to indemnify, defend, and hold each Contributor harmless for any liability incurred by, or claims asserted against, such Contributor by reason of your accepting any such warranty or additional liability. 

END OF TERMS AND CONDITIONS
*/
import Worker from "./queryWorker.js"
import Util from "./apertureUtil"
import boundsToGISJOIN from "./boundsToGISJOIN"
import { geohash_adjacent, geohash_bounds } from "./geohash_util"

const defaultQuery = {
    granularity: "fine",
    pipeline: [],
    geohashBlacklist: []
}

/**
 * @class Query
 * @file Makes queries and returns them
 * @author Daniel Reynolds
 */

const Query = {
    linked: {},
    backgroundLoader: null,
    queryWorker: new Worker(),
    killedQueries: new Set(),
    currentQueries: {},
    backgroundLoader: (linked) => {
        if (linked === "tract_geo_140mb_no_2d_index") {
            return window.backgroundTract;
        }
        else if (linked === "county_geo_30mb_no_2d_index") {
            return window.backgroundCounty;
        }
        return null;
    },

    /**
      * Inits this namespace
      * @memberof Query
      * @param {JSON} queryableData JSON from automenu.js
      */
    init(queryableData) {
        for (const [collection, data] of Object.entries(queryableData)) {
            if (data.linkedGeometry) {
                this.linked[collection] = {
                    collection: data.linkedGeometry,
                    field: data.joinField
                };
            }
        }
    },

    /**
    * Makes a query
    * @memberof Query
    * @param {JSON} query JSON that matches a query schema
    * Query schema (as a TS interface): 
    * interface QuerySchema{
    *     granularity: string, //either `fine`, which only intersects or is within bounds, or `coarse`. Defaults to `fine`
    *     geohashBlacklist?: string[], //blacklist of geohashes 
    *     callback?: (data: CallbackResponse) => void, //if this is given, this function will be called whenever data is collected. If not, a promise will be returned.
    *     bounds?: L.LatLngBounds, //bounds to query
    *     collection: string, //mongo dataset to query. Required!
    *     pipeline?: {}[], //mongodb aggregation pipeline
    *     dontLink?: boolean, //dont link this query to another collection
    * }
    *
    * interface CallbackResponse {
    *     event: string, //eiher `data` or `info` or `end`
    *     payload?: { //only included on `data` and `info` events 
    *         data?: GeoJSON.Feature, //only included on the `data` event
    *         geohashes?: string[], //only sometimes included on the `info` event, when the query granularity was `coarse`, represents all of the geohashes data will be coming back from
    *         id: string //included on the `info` event, unique id which can be used to kill the query
    *     } 
    * }
    *
    * interface PromiseResponse {
    *     data: GeoJSON.Feature[],
    *     geohashBlacklist?: string[] //only included if the `granularity` was `coarse`
    * }
    **/
    async makeQuery(query) {
        query = { ...defaultQuery, ...query }
        query.id = Math.random().toString(36).substring(2, 6);
        this.currentQueries[query.id] = query;
        const { dontLink } = query;

        let promiseFlag = false;
        let callbackToPromise;
        if (!query.callback) {
            promiseFlag = true;
            callbackToPromise = this._callbackToPromise(query);
        }

        const linked = this.linked[query.collection];
        if (linked && !dontLink) { //making an edge case for this one cause it is fast as hell
            this._linkedQuery(linked, query);
        }
        else {
            this._queryFineOrCoarse(query);
        }

        if (promiseFlag) {
            return await callbackToPromise;
        }
    },

    /**
    * Kills a query
    * @memberof Query
    * @param {string} qid
    **/
    killQuery(qid) {
        this.queryWorker.postMessage({
            type: "kill",
            id: qid
        });
        this.killedQueries.add(qid)
        this.currentQueries[qid].callback({ event: "end" })
        this.currentQueries[qid].callback = () => {}
        this.killedQueries.delete(qid)
    },

    _queryFineOrCoarse(query) {
        const { granularity } = query;
        if (granularity === "coarse") {
            this._queryCoarse(query);
        }
        else if (granularity === "fine") {
            this._queryFine(query);
        }
    },

    async _callbackToPromise(query) {
        return new Promise(resolve => {
            let allData = [];
            let geohashes;
            const callback = ({ event, payload }) => {
                if (event === "data") {
                    payload.data && allData.push(payload.data);
                }
                else if (event === "info") {
                    if (payload.geohashes) {
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

                    if (this.killedQueries.has(query.id)) {
                        ret.geohashes = [];
                        ret.data = [];
                        this.killedQueries.delete(query.id)
                    }
                    resolve(ret);
                }
            }
            query.callback = callback;
        });
    },

    _linkedQuery({ collection, field }, query) {
        const { granularity, id } = query;
        const epsilon = 100;
        let waitingRoom = [];
        let geohashes;
        let currentDumpNums = new Set();
        let allowFinish = false;

        const waitingRoomListener = (response) => {
            const { event, payload } = response;
            if (event === "data") {
                payload.data && Array.isArray(payload.data) ? waitingRoom.push(...payload.data) : waitingRoom.push(payload.data);
                if (waitingRoom.length >= epsilon) {
                    dumpWaitingRoom();
                }
            }
            else if (event === "info") {
                if (payload.geohashes) {
                    geohashes = payload.geohashes;
                }
                query.callback({ event: "info", payload: { geohashes, id } })
            }
            else if (event === "end") {
                allowFinish = true;
                if (waitingRoom.length) {
                    dumpWaitingRoom();
                }
            }
        }

        const finished = () => {
            query.callback({ event: "end" })
        }

        const dumpCallback = (d, localDumpNum, waitingRoomSnapshotMap) => {
            const { event } = d;
            if (event === "data") {
                const complimentaryData = { ...d.payload.data };
                const realData = waitingRoomSnapshotMap[complimentaryData[field]];

                Util.normalizeFeatureID(realData);
                realData.id = `${realData.id}_${complimentaryData.id}`
                realData.properties = {
                    ...realData.properties,
                    ...complimentaryData,
                }
                d.payload.data = realData;
                query.callback(d);

            }
            else if (event === "end") {
                currentDumpNums.delete(localDumpNum);
                waitingRoomSnapshotMap = null;
                if (!currentDumpNums.size && allowFinish) {
                    finished();
                }
            }
        }

        let dumpNum = 0;
        const dumpWaitingRoom = () => {
            const thisDumpNum = dumpNum++;
            currentDumpNums.add(thisDumpNum)
            const queryDump = JSON.parse(JSON.stringify(query))
            const waitingRoomSnapshotMap = waitingRoom.reduce((acc, curr) => {
                acc[curr[field]] = curr;
                return acc;
            }, {});
            const JOINS = Object.keys(waitingRoomSnapshotMap);
            queryDump.pipeline = [{ "$match": { [field]: { "$in": JOINS } } }, ...queryDump.pipeline]
            //queryDump.id = `${queryDump.id}_dump${thisDumpNum}`
            queryDump.callback = (d) => { dumpCallback(d, thisDumpNum, waitingRoomSnapshotMap) };
            this._queryMongo(queryDump);
            waitingRoom = [];
        }

        const queryLinked = JSON.parse(JSON.stringify(query))
        queryLinked.collection = collection;
        queryLinked.pipeline = [];
        queryLinked.id = `${queryLinked.id}_LINKED`
        queryLinked.callback = waitingRoomListener;
        this._queryFineOrCoarse(queryLinked);
    },

    _queryCoarse(query) {
        const { collection, bounds, id } = query;
        if (!query.geohashBlacklist) {
            query.geohashBlacklist = [];
        }
        if (bounds && this.backgroundLoader(collection)) {
            this._queryPreloadedData(query)
        }
        else if (bounds) {
            //hard part
            const [coarseBounds, newGeohashes] = this._getBoundsGetGeohashes(query);
            query.callback({
                event: "info",
                payload: {
                    geohashes: newGeohashes,
                    id
                }
            });
            const coarseCallback = (d, ignoreEnd = true) => {
                const { event, payload } = d;
                if (event === "data") {
                    query.callback(d);
                }
                else if (event === "end" && !ignoreEnd) {
                    query.callback(d)
                }
            }

            coarseBounds.forEach((coarseBound, index) => {
                const queryClone = JSON.parse(JSON.stringify(query))
                queryClone.pipeline.unshift({ "$match": { geometry: { "$geoIntersects": { "$geometry": { type: "Polygon", coordinates: coarseBound } } } } });
                queryClone.callback = (d) => { coarseCallback(d, index !== coarseBounds.length - 1) };
                this._queryMongo(queryClone)
            });
        }
        else {
            this._queryMongo(query);
        }
    },

    _getBoundsGetGeohashes(query) { //just another very complex space-filling algorithm...
        const { bounds, geohashBlacklist } = query;
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
            polys = polys.sort((a, b) => b.length - a.length).map(poly => {
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
        const { collection, bounds, geohashBlacklist, callback, id } = query;

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
                callback({ event: "info", payload: { geohashes: newGeohashes, id } });
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
        const { pipeline, collection, callback, id } = query;
        query.callback({ event: "info", payload: { id } })
        this.queryWorker.postMessage({
            type: "query",
            collection,
            queryParams: pipeline,
            senderID: id
        });

        const responseListener = msg => {
            const data = msg.data;
            if (data.senderID !== id)
                return;
            if (data.type === "data") {
                const dataFromServer = data.data;
                Util.normalizeFeatureID(dataFromServer);
                callback({ event: "data", payload: { data: dataFromServer } })
            }
            else if (data.type === "end") {
                callback({ event: "end" })
                this.queryWorker.removeEventListener("message", responseListener);
            }
        }

        this.queryWorker.addEventListener("message", responseListener);
    },
}

try {
    Query.queryWorker.postMessage({
        type: "config"
    });
}
catch { }

window.Query = Query;
export default Query;
