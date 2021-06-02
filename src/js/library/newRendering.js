import geojsonvt from 'geojson-vt';
import xyz from 'xyz-affair';
import Util from './apertureUtil';

let tileIndex;
let jsonArr = [];
export default function newRendering(geojson) {
    jsonArr.push(geojson)
}

export function getFeatures(){
    const leafletBounds = globalThis.map.getBounds();
    const bounds = [
        [
            leafletBounds.getWest(),
            leafletBounds.getSouth()
        ],
        [
            leafletBounds.getEast(),
            leafletBounds.getNorth()
        ]
    ]
    const tiles = xyz(bounds,globalThis.map.getZoom())
    tileIndex = geojsonvt(Util.createGeoJsonObj(jsonArr));
    let allbits = []
    for(const {x,y,z} of tiles){
        //console.log(tileIndex)
        const bits = tileIndex.getTile(z, x, y)?.features
        allbits = [...allbits, bits]
    }
    return allbits;
}

setInterval(() => {
    console.log({features: getFeatures()})
},10*1000)