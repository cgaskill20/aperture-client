importScripts('./boundsToGISJOIN.js');
importScripts('./geohash_util.js');

onconnect = function(p) {
    var port = p.ports[0];

    port.onmessage = function(msg) {
        if (msg.data.type === "query") {
            port.postMessage({ 
                type: "data",
                bounds: msg.data.bounds,
                GISJOINS: BoundsToGISJOIN.boundsToGISJOINS(msg.data.bounds,msg.data.resolution)
            });
        } 
    }
}
