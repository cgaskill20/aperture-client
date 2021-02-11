
importScripts('./smartQuerier.js');
importScripts('../grpc/GRPC_Querier/grpc_querier.bundle.js');
importScripts('../grpc/Other_Datasets/grpc_querier.bundle.js');

const querier = getSustainQuerier();

onconnect = function(p) {
    var port = p.ports[0];

    port.onmessage = function(msg) {
        if (msg.data.type === "query") {
            querier.query(msg.data.collection, 
                          msg.data.queryParams, 
                          data => { port.postMessage({ type: "data", data: data }); }, 
                          end => { port.postMessage({ type: "end" }); });
        } else if (msg.data.type === "kill streams") {
            querier.killAllStreamsOverCollection(msg.data.collection);
        }
    }
}
