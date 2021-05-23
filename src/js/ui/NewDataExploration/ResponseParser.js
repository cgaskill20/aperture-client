import React from 'react';
import AutoMenu from "../../library/autoMenu";

export let layers = [];
let layerConstraints = [];
function overwrite() {}

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
    extractConstraints();
}

function extractConstraints() {
    for(const layerInfo in layers) {
        const layerData = layers[layerInfo];
        console.log({layerData});
        for(const theseConstraints in layerData["constraints"]) {
            const constraint = layerData["constraints"][theseConstraints];
            if(!constraint["hide"]) {
                console.log({constraint});
                layerConstraints.push(constraint);
                const constraintLabel = constraint["label"];
                console.log({constraintLabel});
            }
        }
    }
    console.log({layerConstraints});
}

