importScripts('./smartQuerier.js');
importScripts('../grpc/GRPC_Querier/grpc_querier.bundle.js');

let querier;

onmessage = function (msg) {
    if (msg.data.type === "query") {
        //console.log(msg.data.queryParams)
        querier.query(msg.data.collection,
            msg.data.queryParams,
            data => { postMessage({ type: "data", data: data, senderID: msg.data.senderID }); },
            end => { postMessage({ type: "end", senderID: msg.data.senderID }); });
    } else if (msg.data.type === "kill") {
        querier.killAllStreamsOverCollection(msg.data.collection);
    } else if (msg.data.type === "config") {
        globalThis.latticeNum = msg.data.latticeNum;
        querier = getSustainQuerier();
    }
}

