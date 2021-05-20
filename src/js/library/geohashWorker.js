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
        querier = getSustainQuerier();
    }
}

