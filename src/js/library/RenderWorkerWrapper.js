import Util from "./apertureUtil"
import Worker from "./mapDataFilterWorker.js"
const RenderWorker = new Worker();

/**
 * @namespace RenderWorkerWrapper
 * @file Wrapper for the render worker, this is all you should need to deal with.
 * @author Daniel Reynolds
 */

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
        const senderID = Util.randomString(4);
        return new Promise(resolve => {
            const handleResponse = (msg) => {
                const data = msg.data;
                if(data.type === "getResponse" && data.senderID === senderID){
                    RenderWorker.removeEventListener("message", handleResponse);
                    resolve(data.data);
                }
            }

            RenderWorker.addEventListener("message", handleResponse);

            RenderWorker.postMessage({
                type: "get",
                coords,
                senderID
            });
        });
    },
}

export default RenderWorkerWrapper;