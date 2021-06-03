import React from 'react';
import Util from "../../library/apertureUtil";

export function prettifyJSON(name) {
    return Util.capitalizeString(Util.underScoreToSpace(name));
}

export function hashIndex(layerIndex, index, seed) {
    const newSeed = ((layerIndex + 7) * 1763) % (seed * 17);
    const hash = ((newSeed * 18423) / 257) + index;
    if(hash === NaN) console.log(`NaN found with args[${layerIndex}-${index}-${seed}]`);
    return hash;
}