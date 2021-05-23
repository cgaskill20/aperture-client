import React from 'react';
import AutoMenu from "../../library/autoMenu";

export let layers = [];

$.getJSON("src/json/menumetadata.json", async function (mdata) {
    const finalData = await AutoMenu.build(mdata, overwrite);
    console.log({finalData});
    extractLayers(finalData);
});

function extractLayers(data) {
    for(const layer in data) {
        const thisLayer = data[layer];
        layers.push(thisLayer);
    }
    console.log({layers});
}


function overwrite() {}
