importScripts('./boundsToGISJOIN.js');
importScripts('./geohash_util.js');

onconnect = function(p) {
    var port = p.ports[0];

    port.onmessage = function(msg) {
        if (msg.data.type === "query") {
            port.postMessage({ 
                type: "data",
                senderID: msg.data.senderID,
                bounds: msg.data.bounds,
                data: BoundsToGISJOIN.boundsToData(msg.data.bounds,msg.data.resolution,msg.data.blacklist)
            });
        } 
    }
}
