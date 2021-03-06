//webworker that takes a list of geohashes (with their corresponding GISJOINS), and return 
importScripts('../grpc/GRPC_Querier/grpc_querier.bundle.js');
importScripts('./geometryLoader.js');
importScripts('./boundsToGISJOIN.js');
importScripts('./geohash_util.js');

onconnect = function (p) {
    var port = p.ports[0];
    let loader;
    let id;

    const errorMessage = (msg, senderID) => {
        console.log(`${id} - sender: ${senderID}, ERR: ${msg}`)
        port.postMessage({
            senderID: senderID,
            type: "err",
            message: msg
        });
    }

    const queryEndResponse = (senderID) => {
        console.log(`${id} - sending END response to senderID: ${senderID}`)
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
        console.log(`${id} - sending ${data.data.length} records to ${senderID}`)
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
                console.log(`${id} - found ${cached.data.length} records in cache for sender ${senderID}`)
                queryResponse(cached,senderID)
            }
            for (const geohash of cached.geohashes)
                delete query[geohash];
        }
        if(Object.keys(query).length)
            loader.getNonCachedData(query, (data) => queryResponse(data, senderID))
    }

    port.onmessage = function (msg) {
        const data = msg.data;
        const sID = data.senderID;
        switch (data.type) {
            case "config":
                loader = new GeometryLoader(data.collection);
                BoundsToGISJOIN.config(data.collection);
                id = data.id;
                console.log(`${id} - set to use ${data.collection} collection.`)
                break;
            case "query":
                console.log(`${id} - received query from senderID: ${sID}`)
                if (!loader) {
                    errorMessage("You must set up the worker with the 'config' message!", sID);
                    break;
                }
                const queryData = BoundsToGISJOIN.boundsToData(
                    msg.data.bounds,
                    msg.data.blacklist
                );
                console.log(`${id} - found ${Object.keys(queryData).length} geohashes that match bounds for sender ${sID}`)
                //check to make sure map of geohashes & gisjoins is any good
                if(!Object.keys(queryData).length){
                    console.log(`${id} - No geohashes match for sender: ${sID}, sending END`)
                    queryEndResponse(sID);
                    break;
                }
                performQuery(queryData, sID)
                break;
        }
    }
}