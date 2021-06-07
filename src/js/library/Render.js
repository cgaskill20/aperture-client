import Util from './apertureUtil';
import { GridLayer, DomUtil } from 'leaflet';
import RenderWorkerWrapper from './RenderWorkerWrapper'

let layer;

export default function newRendering(geojson) {
    return RenderWorkerWrapper.add(geojson);
}

document.onkeypress = function (e) {
    e = e || window.event;
    if (e.keyCode === 114) {
        layer.redraw();
    }
};

const createLayer = () => {
    console.log("here")
    const CanvasLayer = GridLayer.extend({
        createTile: function (coords, done) {
            //console.log({x,y,z})
            let tile = DomUtil.create('canvas', 'leaflet-tile leaflet-sedesol');
            const ctx = tile.getContext('2d');

            RenderWorkerWrapper.get(coords).then(tileToRender => {
                //console.log({tileToRender})
                // Set the tile size
                tile.width = 256;
                tile.height = 256;
                ctx.clearRect(0, 0, tile.width, tile.height);
                // If tileToRender is null return just a clear canvas
                if (!tileToRender) {
                    done(null, tile);
                    return;
                }

                const { features } = tileToRender;
                ctx.strokeStyle = 'grey';
                features.forEach(feature => {
                    const { geometry, tags } = feature;
                    //console.log(geometry)
                    //console.log(tags)
                    ctx.fillStyle = tags.color;
                    ctx.globalAlpha = 0.3;
                    ctx.beginPath();
                    geometry.forEach(points => {
                        points.forEach((point, index) => { ctxDrawPolygon(ctx, point, index) });
                    });
                    ctx.fill('evenodd');
                    ctx.stroke();
                })
                done(null, tile);
            });
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
    layer = createLayer();
    globalThis.map.addLayer(layer);
}, 1000)