import geojsonvt from 'geojson-vt';
import xyz from 'xyz-affair';
import Util from './apertureUtil';
import { GridLayer, DomUtil } from 'leaflet';

let tileIndex;
let jsonArr = [];
let layer;
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

document.onkeypress = function (e) {
    e = e || window.event;
    if (e.keyCode === 114) {
        tileIndex = geojsonvt(Util.createGeoJsonObj(jsonArr));
        layer.redraw();
    }
};

const createLayer = () => {
    console.log("here")
    const CanvasLayer = GridLayer.extend({
        createTile: function ({ x, y, z }, done) {
            //console.log({x,y,z})
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
                const { geometry, tags } = feature;
                //console.log(geometry)
                //console.log(tags)
                ctx.fillStyle = tags.color;
                ctx.globalAlpha = 0.5;
                ctx.beginPath();
                geometry.forEach(points => {
                    points.forEach((point, index) => { ctxDrawPolygon(ctx, point, index) });
                });
                ctx.fill('evenodd');
                ctx.stroke();
            })
            return tile;
        }
    });
    return new CanvasLayer();
};

const ctxDrawPolygon = (ctx, point, index) => {
    const pad = 0;
    const extent = 4096;
    const x = point[0] / extent * 256;
    const y = point[1] / extent * 256;
    if (index) ctx.lineTo(x + pad, y + pad)
    else ctx.moveTo(x + pad, y + pad)
};

setTimeout(() => { 
    tileIndex = geojsonvt(Util.createGeoJsonObj(jsonArr)); 
    layer = createLayer(); 
    globalThis.map.addLayer(layer);
}, 1000)