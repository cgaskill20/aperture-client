import React from 'react';
import Util from "../../library/apertureUtil";

export function prettifyJSON(name) {
    return Util.capitalizeString(Util.underScoreToSpace(name));
}

export function hashIndex(layerIndex, index, seed) {
    const newSeed = ((layerIndex + 7) * 1763) % (seed * 17);
    return ((newSeed * 184237) / 257) + index;
}

//This function will get ALL constraints for EVERY layer and put them in a MASSIVE data structure.
function extractAllConstraints(layers) {
    let allConstraints = [];
    for(const layer in layers) {
        let theseLayerConstraints = [];
        const individualLayer = layers[layer]
        for(const layerConstraint in individualLayer.constraints) {
            const individualConstraint = individualLayer.constraints[layerConstraint];
            if(!individualConstraint.label) {
                individualConstraint.label = prettifyJSON(layerConstraint);
            }
            theseLayerConstraints.push(individualConstraint);
        }
        allConstraints.push(theseLayerConstraints);
    }
    return allConstraints;
}