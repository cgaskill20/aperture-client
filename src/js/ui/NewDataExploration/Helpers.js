import React from 'react';
import Util from "../../library/apertureUtil";

export function prettifyJSON(name) {
    return Util.capitalizeString(Util.underScoreToSpace(name));
}

export function hashIndex(layerIndex, index, seed) {
    const newSeed = ((layerIndex + 7) * 1763) % (seed * 17);
    const hash = ((newSeed * 18423) / 257) + index;
    return hash;
}