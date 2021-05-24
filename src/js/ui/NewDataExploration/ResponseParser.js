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
        const layerName = layerData["label"] ? layerData["label"] : layerData["collection"];
        console.log({layerName})
        console.log({layerData});
        for(const theseConstraints in layerData["constraints"]) {
            const constraint = layerData["constraints"][theseConstraints];
            if(!constraint["hide"]) {
                if(constraint["type"] === "slider") {
                    //FIXME How do I get the name of the constraint if it has no label property?
                    const sliderName = constraint["label"] ? constraint["label"] : constraint;
                    console.log({sliderName});
                }
                // if(constraint["options"]) {
                //     for(const option in constraint["options"]) {
                //         const optionName = constraint["options"][option];
                //         console.log({optionName}); //the name of the option
                //     }
                // }
            }
        }
    }
}

// function extractConstraints() {
//     for(const layerInfo in layers) {
//         const layerData = layers[layerInfo];
//         console.log({layerData});
//         for(const theseConstraints in layerData["constraints"]) {
//             const constraint = layerData["constraints"][theseConstraints];
//             if(!constraint["hide"]) {
//                 console.log({constraint});
//                 layerConstraints.push(constraint);
//                 const constraintLabel = constraint["label"] ? constraint["label"] : theseConstraints;
//                 if(constraint["options"]) {
//                     for(const option in constraint["options"]) {
//                         const optionName = constraint["options"][option];
//                         console.log({optionName});
//                     }
//                 }
//                 console.log({constraintLabel});
//             }
//         }
//     }
//     console.log({layerConstraints});
// }

