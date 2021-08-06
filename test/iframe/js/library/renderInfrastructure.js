const assert = require('assert');
import RenderInfrastructure, { ATTRIBUTE } from '../../../../src/js/library/renderInfrastructure';

var jsdom = require('jsdom-global');
const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(200, 200);
const ctx = canvas.getContext('2d');
global.$ = require('jquery');
global.L = require('leaflet');
global.simplify = require('../../../../src/js/third-party/simplify.js');
const layerGroup = L.layerGroup();

L.Map.prototype.setSize = function (width, height) {
    this._size = new L.Point(width, height);
    this._resetView(this.getCenter(), this.getZoom());
    return this;
};
window.HTMLCanvasElement.prototype.getContext = function (a) {
    return ctx;
}
global.osmtogeojson = require('osmtogeojson');
const elem = document.createElement('div');
elem.style.cssText = 'width: "100%", height: "800px" ';
elem.id = 'testMap';
document.body.appendChild(elem);

let jsonData = require("../infrastructure.json");
let sampleQuery = require("./sampleRes.json");

const elem2 = document.createElement('div');
document.body.appendChild(elem2);

const testMap = L.map('testMap', {
    renderer: L.canvas(), minZoom: 3,
    fullscreenControl: true
}).setView(L.latLng(40.494351, -105.295029), 13);

testMap.setSize(800, 800);

testMap.refreshClusters = function () { };
testMap.removeLayers = function (layers) {
    layers.forEach(element => {
        testMap.removeLayer(element);
    });
};

global.grpc_querier = function(){
    let onner = {
        on: function(a,b){}
    }
    return {
        getOSMData: function(a,b){return onner;},
        getDatasetData: function(a,b){return onner;}
    };
}

let renderer;
describe('RenderInfrastructure', function () {
    describe('config()', function () {
        it('should configurate the renderer', function () {
            renderer = new RenderInfrastructure(testMap, testMap, layerGroup, { timeout: 15, queryAlertText: elem2, attributeData: jsonData, simplifyThreshold: 0.001 });
            global.window.renderInfrastructure = renderer;
            assert.deepEqual(renderer.map, testMap);
            assert.deepEqual(renderer.options.timeout, 15);
        });
    });
    let render;
    describe('renderGeoJson()', function () {
        it('should render geojson onto map', function () {
            render = renderer.renderGeoJson(sampleQuery, {
                "test":{
                    "color": "red"
                }
            });
            assert.deepEqual(render.length, 1);
        });
    });
    describe('removeSpecifiedLayersFromMap()', function () {
        it('removes some layers from the map', function () {
            render = renderer.removeSpecifiedLayersFromMap(render);
            assert.deepEqual(Object.keys(testMap._layers).length, 0);
        });
    });
    describe('removeAllFeaturesFromMap()', function () {
        it('removes all layers from the map', function () {
            render = renderer.renderGeoJson(sampleQuery,{
                "test":{
                    "color": "red"
                }
            });
            render = renderer.removeAllFeaturesFromMap();
            assert.deepEqual(Object.keys(testMap._layers).length, 0);
        });
    });
    describe('getAttribute()', function () {
        it('gets attributes from a name', function () {
            //render.config(testMap, testMap, jsonData, {  });
            //console.log(render.options.attributeData);
            assert.deepEqual(renderer.getAttribute("drinking_water", ATTRIBUTE.icon), "noicon");
            assert.deepEqual(renderer.getAttribute("reservoir", ATTRIBUTE.color), "#000000");
            assert.deepEqual(renderer.getAttribute("dam", ATTRIBUTE.icon), "noicon");
            assert.deepEqual(renderer.getAttribute("reservoir", ATTRIBUTE.color), "#000000");
        });
    });
});

