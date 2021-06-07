import geojsonvt from 'geojson-vt';
import Util from './apertureUtil';

let featureArr = [];
let shouldUpdate = false;

let tileIndex;
const update = () => {
    tileIndex = geojsonvt(Util.createGeoJsonObj(featureArr));
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
    !new Set(featureArr.map(feature => feature.id)).has(newFeature.id) && featureArr.push(newFeature);
}

const addMultiple = (newFeatures) => {
    for(const newFeature of newFeatures){
        addOne(newFeature);
    }
}

onmessage = function (msg) {
    const { type, coords, toAdd } = msg.data;
    if (type === "add") {
        if(Array.isArray(toAdd)){
            addMultiple(toAdd);
        }
        else{
            addOne(toAdd);
        }
    }
    else if (type === "remove") {
        
    }
    else if (type === "get") {
        const { x, y, z } = coords;
    }
}