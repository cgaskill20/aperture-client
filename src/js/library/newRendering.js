import geojsonvt from 'geojson-vt';
import xyz from 'xyz-affair';
import Util from './apertureUtil';
import { GridLayer, DomUtil } from 'leaflet';

let tileIndex;
let jsonArr = [];
export default function newRendering(geojson) {
    jsonArr.push(geojson)
}

export function getFeatures(){
    const tiles = getTiles();
    tileIndex = geojsonvt(Util.createGeoJsonObj(jsonArr));
    let allbits = []
    for(const {x,y,z} of tiles){
        //console.log(tileIndex)
        const bits = tileIndex.getTile(z, x, y)?.features
        allbits = [...allbits, bits]
    }
    return allbits;
}

const getTiles = () => {
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
    return xyz(bounds,globalThis.map.getZoom())
}

setInterval(() => {
    //console.log({features: getFeatures()})
},10*1000)

document.onkeypress = function (e) {
    e = e || window.event;
    if(e.keyCode === 114){
        for(const coords of getTiles()){
            createLayer(coords)
        }
    }
};

const createLayer = coords => {
    // ...
    const CanvasLayer = GridLayer.extend({
      createTile: function(coords) { // 
        // console.log(coords); { x: Number, y: Number, z: Number }
        // leaflet will run this method for each tile needed in the viewport
        // create a canvas (we will use this canvas to draw our features)
        let tile = DomUtil.create('canvas', 'leaflet-tile leaflet-sedesol');
        // Set the tile size
        tile.width = 256;
        tile.height = 256;
        // at the moment we will just return an empty canvas
        return tile;
      }
    });
    // Add layer to the canvas
    globalThis.map.addLayer(new CanvasLayer());
  };