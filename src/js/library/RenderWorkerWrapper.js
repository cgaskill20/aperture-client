import Util from "./apertureUtil"
import Worker from "./RenderWorker.js"
const RenderWorker = new Worker();

/**
 * @namespace RenderWorkerWrapper
 * @file Wrapper for the render worker, this is all you should need to deal with.
 * @author Daniel Reynolds
 */

let _currentCoordBatch = {
    list: [],
    time: Date.now(),
    id: Util.randomString(4), 
    sent: false
};

const _coordBatchEpsilon = 10;

const RenderWorkerWrapper = {
    /**
    * Adds to the render list
    * @memberof RenderWorkerWrapper
    * @param {GeoJSON.Feature | GeoJSON.Feature[]} toAdd GeoJSON features to add
    * @returns {string[]} list of id's which can be used to remove the added features
    **/
    add: async (toAdd) => {
        RenderWorker.postMessage({
            type: "add",
            toAdd,
            senderID: Util.randomString(4)
        });

        if (Array.isArray(toAdd)) {
            return toAdd.map(feature => feature.id)
        }
        else {
            return [toAdd.id];
        }
    },

    /**
    * Removes from the render list
    * @memberof RenderWorkerWrapper
    * @param {string | string[]} toAdd GeoJSON features to add
    **/
    remove: async (toRemove) => {
        RenderWorker.postMessage({
            type: "remove",
            toRemove,
            senderID: Util.randomString(4)
        });
    },

    /**
    * Gets data from tile coords
    * @memberof RenderWorkerWrapper
    * @param {object} coords xyz to get
    **/
    get: async (coords) => {
        return new Promise(resolve => {
            const senderID = _currentCoordBatch.id;
            _currentCoordBatch.list.push(coords);
            const handleResponse = (msg) => {
                const data = msg.data;
                if(data.type === "getResponse" && data.senderID === senderID){
                    RenderWorker.removeEventListener("message", handleResponse);
                    console.log(`MTime: ${Date.now() - data.timeStart}`)
                    console.log(data.data)
                    resolve();
                }
            }

            RenderWorker.addEventListener("message", handleResponse);

            setTimeout(() => {
                if(_currentCoordBatch.id === senderID && !_currentCoordBatch.sent){
                    _currentCoordBatch.sent = true;

                    RenderWorker.postMessage({
                        type: "getMany",
                        coordsList: _currentCoordBatch.list,
                        senderID
                    });

                    _currentCoordBatch = {
                        list: [],
                        time: Date.now(),
                        id: Util.randomString(4), 
                        sent: false
                    }
                }
            }, _coordBatchEpsilon)
        });
    }
}

export default RenderWorkerWrapper;