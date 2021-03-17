importScripts('./mapDataFilter.js');

const filter = new MapDataFilter();

onmessage = function (msg) {
    const data = msg.data;
    if (data.type === "add") {
        filter.add(data.data);
    }
    else if (data.type === "get") {
        querier.killAllStreamsOverCollection(msg.data.collection);
    }
}

