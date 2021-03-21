const filterWorker = new Worker("js/library/mapDataFilterWorker.js", { name: `Charting Filter` });

const MapDataFilterWrapper = {
    add: (data, collection) => {
        filterWorker.postMessage({
            type: "add",
            data: data,
            collection: collection
        });
    },
    get: async (feature, bounds, samplingPercent) => {
        //create ID to know if response is for me
        const senderID = Math.random().toString(36).substring(2, 6);
        return new Promise((resolve, reject) => {
            const handleResponse = (msg) => {
                const data = msg.data;
                if(data.type === "getResponse" && data.senderID === senderID){
                    filterWorker.removeEventListener("message", handleResponse);
                    resolve(data.values);
                }
            }

            filterWorker.addEventListener("message", handleResponse);

            filterWorker.postMessage({
                type: "get",
                feature: feature,
                bounds: bounds,
                samplingPercent: samplingPercent,
                senderID: senderID
            });
        });
    }, 
    removeCollection: (collection) => {
        // boy this codebase is really good
        filterWorker.postMessage({ 
            type: "removeCollection",
            collection: collection
        });
    },
}
