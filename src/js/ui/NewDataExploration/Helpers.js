import React from 'react';
import Util from "../../library/apertureUtil";

export function prettifyJSON(name) {
    return Util.capitalizeString(Util.underScoreToSpace(name));
}

export function isGraphable(layer, graphableLayers) {
    const collectionName = layer.collection;
    if(graphableLayers.includes(collectionName)) {
        return true;
    }
    return false;
}