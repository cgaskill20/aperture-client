//webworker that takes a list of geohashes (with their corresponding GISJOINS), and return 
importScripts('../grpc/GRPC_Querier/grpc_querier.bundle.js');
importScripts('./geometryLoader.js');

onconnect = function (p) {
    var port = p.ports[0];
    let loader;

    const errorMessage = (msg, senderID) => {
        port.postMessage({
            senderID: senderID,
            type: "err",
            message: msg
        });
    }

    const queryEndResponse = (senderID) => {
        port.postMessage({
            senderID: senderID,
            type: "end"
        });
    }

    const queryResponse = (data, senderID) => {
        if (data === "END") {
            queryEndResponse(senderID);
            return;
        }
        port.postMessage({
            senderID: senderID,
            type: "data",
            data: data
        });
    }

    const performQuery = (query, senderID) => {
        const cached = loader.getCachedData(Object.keys(query))
        if (cached) {
            if (cached.data.length) {
                queryResponse(cached)
            }
            for (const geohash of cached.geohashes)
                delete query[geohash];
        }
        loader.getNonCachedData(query, (data) => queryResponse(data, senderID))
    }

    port.onmessage = function (msg) {
        console.log("here99")
        const data = msg.data;
        const sID = data.senderID;
        switch (data.type) {
            case "config":
                loader = new GeometryLoader(data.collection);
                break;
            case "query":
                if (!loader) {
                    errorMessage("You must set up the worker with the 'config' message!", sID);
                    break;
                }
                performQuery(data.query, sID)
                break;
        }
    }
}