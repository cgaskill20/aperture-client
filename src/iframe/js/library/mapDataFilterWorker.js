importScripts('./mapDataFilter.js');
importScripts('./apertureUtil.js');

const filter = new MapDataFilter();

onmessage = function (msg) {
    const data = msg.data;
    if (data.type === "add") {
        filter.add(data.data);
    }
    else if (data.type === "get") {
        const values = filter.getModel(data.feature,data.bounds);
        postMessage({
            type: "getResponse",
            senderID: data.senderID,
            values: values
        });
    }
    else if (data.type === "removeCollection") {
        filter.removeAllOverCollection(data.collection);
    }
}

