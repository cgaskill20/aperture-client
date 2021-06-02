import React from 'react';
import Util from "../../library/apertureUtil";

export function prettifyJSON(name) {
    return Util.capitalizeString(Util.underScoreToSpace(name));
}

export function hashIndex(seed) {
    return (seed * 18423) / 13;
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