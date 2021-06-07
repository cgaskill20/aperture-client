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
    }
}

export default RenderWorkerWrapper;