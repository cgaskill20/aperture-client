const filterWorker = new Worker("js/library/mapDataFilterWorker.js", { name: `Charting Filter` });

const MapDataFilterWrapper = {
    add: (data) => {
        filterWorker.postMessage({
            type: "add",
            data: data
        });
    },

    get: async (feature, bounds) => {
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
                senderID: senderID
            });
        });
    } 
}