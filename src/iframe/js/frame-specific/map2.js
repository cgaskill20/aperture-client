const MAPNUMBER = 2;

//const queryAlertText = document.getElementById('queryInfoText');

//--------------
const map = L.map('map2', {
    renderer: L.canvas(),
    minZoom: 3,
    fullscreenControl: true,
    inertia: false,
    timeDimension: false,
    //minZoom: 11
});
window.map = map;

map.setView(map.wrapLatLng(parent.view), 11);
var tiles2 = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 18
}).addTo(map);


var sidebar = L.control.sidebar('sidebar', {
    position: 'right'
}).addTo(map);


map.on('click', function () {
    sidebar.close();
});

const markers = L.markerClusterGroup({
    showCoverageOnHover: false,
    spiderfyOnMaxZoom: true,
    maxClusterRadius: 55,
    animate: false
});
map.addLayer(markers);

const dataExplorationGroup = L.featureGroup().addTo(map);
const dataModelingGroup = L.featureGroup();


const dataExplorationTab = document.getElementById("dataExplorationTab");
const dataModelingTab = document.getElementById("dataModelingTab");
const dataExploration = document.getElementById("checkboxLocation");
const dataModeling = document.getElementById("dataModeling");
const dataModelingLegend = document.getElementById("modelLegend");

dataExplorationTab.onclick = function () {
    if(dataExploration.style.display === "grid")
        return;
    dataExploration.style.display = "grid";
    dataModeling.style.display = "none";
    dataModelingLegend.style.display = "none";

    map.addLayer(markers);
    map.addLayer(dataExplorationGroup);
    map.removeLayer(dataModelingGroup);
}
dataModelingTab.onclick = function () {
    if(dataModeling.style.display === "block")
        return;
    dataModeling.style.display = "block";
    dataModelingLegend.style.display = "block";
    dataExploration.style.display = "none";

    map.removeLayer(markers);
    map.removeLayer(dataExplorationGroup);
    map.addLayer(dataModelingGroup);
}


const backgroundTract = new GeometryLoader("tract_geo_GISJOIN", window.map, 2500);
const backgroundCounty = new GeometryLoader("county_geo_GISJOIN", window.map, 50);

window.backgroundTract = backgroundTract;
window.backgroundCounty = backgroundCounty

const overwrite = { //leaving this commented cause it explains the schema really well 
}

window.renderInfrastructure = new RenderInfrastructure(window.map, markers, dataExplorationGroup, {
    queryAlertText: document.getElementById('queryInfoText'),
    maxElements: 10000,
    maxLayers: 20,
    simplifyThreshold: 0.0001
});

//where the magic happens
$.getJSON("json/menumetadata.json", async function (mdata) { //this isnt on the mongo server yet so query it locally
    const finalData = await AutoMenu.build(mdata, overwrite);
    MenuGenerator.generate(finalData, dataExploration);
});

parent.addEventListener('updateMaps', function () {
    updateLayers();
});

const clusterer = new ClusterManager("xd", map, dataModelingGroup, "tract_geo_GISJOIN");


//-----------
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
