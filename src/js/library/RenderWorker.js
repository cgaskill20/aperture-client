import geojsonvt from 'geojson-vt';
import Util from './apertureUtil';
console.log = () => {}

let featureArr = [];
let shouldUpdate = false;

let tileIndex;
const update = () => {
    console.log("here")
    tileIndex = geojsonvt(Util.createGeoJsonObj(featureArr), {
        indexMaxZoom: 19,
        maxZoom: 19
    });
    shouldUpdate = false;
}
update();

const tryUpdate = () => {
    shouldUpdate && update();
}

setInterval(() => {
    tryUpdate();
}, 500)

const addOne = (newFeature) => {
    if (!new Set(featureArr.map(feature => feature.id)).has(newFeature.id)) {
        featureArr.push(newFeature);
        shouldUpdate = true;
    }
}

const addMultiple = (newFeatures) => {
    for (const newFeature of newFeatures) {
        addOne(newFeature);
    }
}

const removeOne = (idToRemove) => {
    removeMultiple([idToRemove]);
}

const removeMultiple = (idsToRemove) => {
    featureArr.filter(feature => !idsToRemove.includes(feature.id));
}

onmessage = function (msg) {
    const { type, coords, toAdd, toRemove, senderID } = msg.data;
    if (type === "add") {
        if (Array.isArray(toAdd)) {
            addMultiple(toAdd);
        }
        else {
            addOne(toAdd);
        }
    }
    else if (type === "remove") {
        if (Array.isArray(toRemove)) {
            removeMultiple(toRemove);
        }
        else {
            removeOne(toRemove);
        }
    }
    else if (type === "get") {
        const { x, y, z } = coords;
        console.log(tileIndex)
        postMessage({
            type: "getResponse",
            senderID,
            data: tileIndex.getTile(z,x,y)
        });
    }
}