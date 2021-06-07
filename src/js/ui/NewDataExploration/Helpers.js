import React from 'react';

export function isGraphable(layer, graphableLayers) {
    const collectionName = layer.collection;
    if(graphableLayers.includes(collectionName)) {
        return true;
    }
    return false;
}