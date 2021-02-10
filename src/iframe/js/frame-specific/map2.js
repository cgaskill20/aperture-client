const MAPNUMBER = 2;

//const queryAlertText = document.getElementById('queryInfoText');

//--------------
const map = L.map('map2', {
    renderer: L.canvas(),
    minZoom: 3,
    fullscreenControl: true,
    inertia: false,
    timeDimension: false,
    zoomControl: false,
    //minZoom: 11
});
window.map = map;

map.setView(map.wrapLatLng(parent.view), 11);
var tiles2 = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 18
}).addTo(map);


const zoomControl = L.control.zoom({position:"topright"}).addTo(map);

// var sidebar = L.control.sidebar('sidebar', {
//     position: 'left'
// }).addTo(map);


var markers = L.markerClusterGroup({
    showCoverageOnHover: false,
    spiderfyOnMaxZoom: true,
    maxClusterRadius: 55,
    animate: false
});
map.addLayer(markers);

const dataExplorationGroup = L.featureGroup().addTo(map);
const dataModelingGroup = L.featureGroup();

const backgroundTract = new GeometryLoader("tract_geo_GISJOIN", window.map, 300);
const backgroundCounty = new GeometryLoader("county_geo_GISJOIN", window.map, 50);

window.backgroundTract = backgroundTract;
window.backgroundCounty = backgroundCounty

map.on('click', function () {
    closeNav();
});

function showDataExploration() {
    document.getElementById("sidebar-container").style.display = "grid";
    document.getElementById("model-container").style.display = "none";
}

function showModeling() {
    document.getElementById("sidebar-container").style.display = "none";
    document.getElementById("model-container").style.display = "block";
}

function showValidation() {
    document.getElementById("sidebar-container").style.display = "none";
    document.getElementById("model-container").style.display = "none";
}

function openNav() {
  document.getElementById("sidebar-id").style.width = "52vw";
  document.getElementById("main").style.opacity = "0";
}

function closeNav() {
  document.getElementById("sidebar-id").style.width = "0";
  document.getElementById("main").style.opacity = "1";
  document.getElementById("main").style.transition = "0.5s";
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

//where the magic happens
$.getJSON("json/menumetadata.json", async function (mdata) { //this isnt on the mongo server yet so query it locally
    const finalData = await AutoMenu.build(mdata, overwrite);
    MenuGenerator.generate(finalData, document.getElementById("sidebar-container"));
});

const modelMenuConfig = {
    // "Regression":[
    //     "Linear regression",
    //     "Generalized linear regression",
    //     "Decision tree regression",
    //     "Random forest regression",
    //     "Gradient-boosted tree regression",
    //     "Survival regression",
    //     "Isotonic regression"
    // ],
    "Clustering":[
        "K-means",
        // "Gaussian mixture",
        // "Power iteration clustering (PIC)",
        // "Latent Dirichlet allocation (LDA)",
        // "Bisecting k-means",
        // "Streaming k-means"
    ],
    // "Classification":[
    //     "Binomial logistic regression",
    //     "Multinomial logistic regression",
    //     "Decision tree classifier",
    //     "Random forest classifier",
    //     "Gradient-boosted tree classifier",
    //     "Multilayer perceptron classifier",
    //     "Linear Support Vector Machine",
    //     "One-vs-Rest classifier (a.k.a. One-vs-All)",
    //     "Naive Bayes"
    // ],
}


const modelContainer = document.getElementById("model-container");
ReactDOM.render(e(ModelMenu, {config: modelMenuConfig}), modelContainer);

parent.addEventListener('updateMaps', function () {
    updateLayers();
});

//const clusterer = new ClusterManager("xd", map, dataModelingGroup, "tract_geo_GISJOIN");

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



