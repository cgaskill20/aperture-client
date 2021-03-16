const MAPNUMBER = 2;
const e = React.createElement;

const PAGE_URL = window.location.href;
const DEV = PAGE_URL.includes("dev") || PAGE_URL.includes("127.0.0.1");
if (DEV) {
    console.log("Aperture client set to DEV mode.")
    AutoQuery.minCountyZoom = 1;
    AutoQuery.minTractZoom = 1;
}

//--------------
const standardTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 18
});

const topoTiles = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 18,
    ext: 'png'
});

const satelliteTiles = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 18
});

const baseMaps = {
    "Default": standardTiles,
    "Topography": topoTiles,
    "Satellite": satelliteTiles
};

const map = L.map('map2', {
    renderer: L.canvas(),
    minZoom: 3,
    fullscreenControl: true,
    inertia: false,
    timeDimension: false,
    zoomControl: false
});
window.map = map;

L.control.layers(baseMaps).addTo(map);
standardTiles.addTo(map);

map.setView(map.wrapLatLng(parent.view), 11);

const zoomControl = L.control.zoom({ position: "topright" }).addTo(map);

var markers = L.markerClusterGroup({
    showCoverageOnHover: false,
    spiderfyOnMaxZoom: true,
    maxClusterRadius: 55,
    animate: false
});
map.addLayer(markers);

const dataExplorationGroup = L.layerGroup().addTo(map);
const dataModelingGroup = L.layerGroup();
window.dataModelingGroup = dataModelingGroup;


const preloadStatusContainer = document.getElementById("preloadStatus");
let bgTractId = "bgTract";
let bgCountyId = "bgCounty";
const backgroundTract = new Worker("js/library/geometryLoaderWorker.js", { name: `Background tract worker: ${bgTractId}` });
const backgroundCounty = new Worker("js/library/geometryLoaderWorker.js", { name: `Background county worker: ${bgCountyId}` });
ReactDOM.render(e(PreloadingMenu,{
    loaders: [
        {
            id: bgTractId,
            loader: backgroundTract,
            collection: "tract_geo_140mb_no_2d_index"
        },
        {
            id: bgCountyId,
            loader: backgroundCounty,
            collection: "county_geo_30mb_no_2d_index"
        }
    ]
}), preloadStatusContainer);
window.backgroundTract = backgroundTract;
window.backgroundCounty = backgroundCounty;


map.on('click', function () {
    closeNav();
});

document.getElementById('nav-menu-button').addEventListener('click', openNav);
document.getElementById('nav-close-button').addEventListener('click', closeNav);
document.getElementById('nav-data-exploration-button').addEventListener('click', showDataExploration);
document.getElementById('nav-modeling-button').addEventListener('click', showModeling);
document.getElementById('nav-validation-button').addEventListener('click', showValidation);

function openNav() {
    document.getElementById("sidebar-id").style.width = "52vw";
    document.getElementById("main").style.opacity = "0";
}

function closeNav() {
    document.getElementById("sidebar-id").style.width = "0";
    document.getElementById("main").style.opacity = "1";
}

function showDataExploration() {
    document.getElementById("sidebar-container").style.display = "grid";
    document.getElementById("model-container").style.display = "none";
    document.getElementById("clusterLegendContainer").style.display = "none";
    map.removeLayer(dataModelingGroup)
    map.addLayer(dataExplorationGroup)
}

function showModeling() {
    document.getElementById("sidebar-container").style.display = "none";
    document.getElementById("model-container").style.display = "block";
    document.getElementById("clusterLegendContainer").style.display = "block";
    map.addLayer(dataModelingGroup)
    map.removeLayer(dataExplorationGroup)
}

function showValidation() {
    document.getElementById("sidebar-container").style.display = "none";
    document.getElementById("model-container").style.display = "none";
}

const overwrite = { //leaving this commented cause it explains the schema really well 
    // "covid_county": {
    //     "group": "Tract, County, & State Data",
    //     "subGroup": "County Level",
    //     "constraints": {
    //         date_range: {
    //             "type": "slider",
    //             "label": "Date Range",
    //             "range": [1580169600000, 1580169600000 + 1000 * 60 * 60 * 24 * 266],
    //             "default": [1580169600000, 1580169600000 + 1000 * 60 * 60 * 24 * 266],
    //             "step": 1000 * 60 * 60 * 24,
    //             "isDate": true
    //         }
    //     },
    //     "onConstraintChange": function (layer, constraintName, value) {
    //         console.log(layer + "-" + constraintName + "-");
    //         COVID.dateStart = Number(value[0]);
    //         COVID.dateEnd = Number(value[1]);
    //         COVID.changeFlag = true;
    //         COVID.makeQuery(map);
    //     },
    //     "onAdd": function () {
    //         COVID.allowRender = true;
    //     },
    //     "onRemove": function () {
    //         COVID.allowRender = false;
    //         COVID.clear();
    //     },
    //     "onUpdate": function () {
    //         COVID.makeQuery(map);
    //     },
    //     "noAutoQuery": true
    // },
}

window.renderInfrastructure = new RenderInfrastructure(map, markers, dataExplorationGroup, overwrite, {
    queryAlertText: document.getElementById('queryInfoText'),
    maxElements: 10000,
    maxLayers: 20,
    simplifyThreshold: 0.0001
});
const chartSystem = new ChartSystem(map, "json/graphPriority.json", window.renderInfrastructure);

//where the magic happens
$.getJSON("json/menumetadata.json", async function (mdata) { //this isnt on the mongo server yet so query it locally
    const finalData = await AutoMenu.build(mdata, overwrite);
    MenuGenerator.generate(finalData, document.getElementById("sidebar-container"));
});

const modelContainer = document.getElementById("model-container");
ReactDOM.render(e(ModelMenu), modelContainer);

map.on("moveend", function (e) {
    updateLayers();
});
map.on("move", function (e) {
    parent.setGlobalPosition(map.getCenter(), MAPNUMBER);
});
map.on("zoomend", function () {
    parent.setGlobalPositionFORCE(map.getCenter(), MAPNUMBER);
});

//-----------
var thisMapsSetter = function (view, zoom) {
    map.setView(map.wrapLatLng(parent.view), map.getZoom());
}
parent.setterFunctions.push({
    setterFunc: thisMapsSetter,
    mapNum: MAPNUMBER
});
setTimeout(function () {
    map.setView([map.wrapLatLng(parent.view).lat, map.wrapLatLng(parent.view).lng - 0.0002], map.getZoom());
}, 1); //this is a terrible fix but it works for now
