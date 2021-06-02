import geojsonvt from 'geojson-vt';
import xyz from 'xyz-affair';
import Util from './apertureUtil';
import { GridLayer, DomUtil } from 'leaflet';

let tileIndex;
let jsonArr = [];
export default function newRendering(geojson) {
    jsonArr.push(geojson)
}

export function getFeatures() {
    const tiles = getTiles();
    tileIndex = geojsonvt(Util.createGeoJsonObj(jsonArr));
    let allbits = []
    for (const { x, y, z } of tiles) {
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
    return xyz(bounds, globalThis.map.getZoom())
}

setInterval(() => {
    //console.log({features: getFeatures()})
    tileIndex = geojsonvt(Util.createGeoJsonObj(jsonArr));
}, 3 * 1000)

document.onkeypress = function (e) {
    e = e || window.event;
    if (e.keyCode === 114) {
        createLayer();
    }
};

const createLayer = () => {
    console.log("here")
    const CanvasLayer = GridLayer.extend({
        createTile: function ({ x, y, z }) {
            let tile = DomUtil.create('canvas', 'leaflet-tile leaflet-sedesol');
            const ctx = tile.getContext('2d');
            // Set the tile size
            tile.width = 256;
            tile.height = 256;
            const tileToRender = tileIndex.getTile(z, x, y);
            ctx.clearRect(0, 0, tile.width, tile.height);
            // If tileToRender is null return just a clear canvas
            if (!tileToRender) {
                return tile;
            }

            const { features } = tileToRender;
            ctx.strokeStyle = 'grey';
            features.forEach(feature => {
                const geometries = feature;
                console.log(geometry)
            })
        }
    });
    // Add layer to the canvas
    globalThis.map.addLayer(new CanvasLayer());
};