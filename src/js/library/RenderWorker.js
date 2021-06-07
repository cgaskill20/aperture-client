import geojsonvt from 'geojson-vt';
import Util from './apertureUtil';

let featureArr = [];
let updateFeatures = false;

let tileIndex;
const update = () => {
    tileIndex = geojsonvt(Util.createGeoJsonObj(featureArr));
}
update();


onmessage = function (msg) {
    const { type, coords } = msg.data;
    if (type === "add") {

        
    }
    else if (type === "remove") {
        
    }
    else if (type === "get") {
        const { x, y, z } = coords;
    }
}