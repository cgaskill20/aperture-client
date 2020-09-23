const MAPNUMBER = 2;

let queryAlertText = document.getElementById('queryInfoText');
//--------------
osmMap2 = L.map('map2', {
    renderer: L.canvas(),
    minZoom: 3,
    fullscreenControl: true,
    inertia: false,
    timeDimension: false,
    minZoom: 11
});

osmMap2.setView(osmMap2.wrapLatLng(parent.view), 11);
var tiles2 = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 18
}).addTo(osmMap2);


var sidebar = L.control.sidebar('sidebar', {
    position: 'right'
}).addTo(map);

var markers = L.markerClusterGroup({
    showCoverageOnHover: false,
    spiderfyOnMaxZoom: true,
    maxClusterRadius: 55,
    animate: false
});
osmMap2.addLayer(markers);

$.getJSON("Dependencies/streamflowMetadata.json", function (mdata) {
    RenderInfrastructure.preProcessData = mdata;
    $.getJSON("Dependencies/infrastructure.json", function (data) {
        RenderInfrastructure.config(osmMap2, markers, data, {
            queryAlertText: document.getElementById('queryInfoText'),
            overpassInterpreter: 'http://lattice-136.cs.colostate.edu:4096/api/interpreter',
            maxElements: 10000,
            maxLayers:20,
            simplifyThreshold: 0.00005
        });
        Generator.config(data, document.getElementById("checkboxLocation"), true, changeChecked, "checkbox", true,
        '<ul style="padding-inline-start:20px;">' +
            '<li><b>Reservoir/Lake/Basin/Pond</b>: Icon made from <a href="http://www.onlinewebfonts.com/icon">Icon Fonts</a> is licensed by CC BY 3.0</li>' +
            '<li><b>Wastewater Plant</b>: Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></li>' +
            '<li><b>Dam</b>: Icon from <a href="http://www.iconsmind.com">iconsmind.com</a></li>' +
            '<li><b>Hospital</b>: Icons from Font Awesome by Dave Gandy - <a href="https://fortawesome.github.com/Font-Awesome">fortawesome.github.com/Font-Awesome</a> / CC BY-SA (<a href="https://creativecommons.org/licenses/by-sa/3.0">creativecommons.org/licenses/by-sa/3.0</a>)</li>' +
            '<li><b>Urgent Care</b>: Icon By Bridget Gahagan, <a href="https://thenounproject.com/">noun project</a></li>' + 
            '<li><b>Fire Station</b>: Icon From <a href="https://icons8.com/">icons8.com</a></li>' +
        '</ul>',
        true);
        runQuery();
    });
});

//map 3 merge stuff
const censusViz = census_visualizer();
censusViz.updateViz(osmMap2);

const g = { groupMem: "Census", query: 1 };
const census = {
    "Total Population": g, "Avg. Household Income": g,
    "Population by Age": g, "Median Age": g, "No. Below Poverty Line": g, "Demographics": g
}

Generator.config(census, document.getElementById("checkboxLocation"), true, changeChecked, "radio", true);

function updateOverPassLayer() {
    RenderInfrastructure.update();
}

function removeOverpassLayer(map, removeLayer) {
    map.eachLayer(function (layer) {
        if (layer.options.id === "OverPassLayer" && layer.options.query == removeLayer.options.query) {
            map.removeLayer(layer);
        }
    });
}

function changeChecked(element) {
    if (element.checked) {
        if (element.id in census) {
            censusViz.setFeature(element.id);
            censusViz.updateViz(osmMap2);
        } else {
            RenderInfrastructure.addFeatureToMap(element.id);
        }
    }
    else {
        if (element.id in census)
            censusViz.setFeature(element.id);
        else
            RenderInfrastructure.removeFeatureFromMap(element.id);
    }
}

parent.addEventListener('updateMaps', function () {
    runQuery();
    censusViz.updateViz(osmMap2);
});

function runQuery() {
    updateOverPassLayer();
}

osmMap2.on("move", function (e) {
    parent.setGlobalPosition(osmMap2.getCenter(), MAPNUMBER);
});
osmMap2.on("zoomend", function () {
    parent.setGlobalPositionFORCE(osmMap2.getCenter(), MAPNUMBER);
});
//-----------
var thisMapsSetter = function (view, zoom) {
    osmMap2.setView(osmMap2.wrapLatLng(parent.view), osmMap2.getZoom());
}
parent.setterFunctions.push({
    setterFunc: thisMapsSetter,
    mapNum: MAPNUMBER
});
setTimeout(function () {
    osmMap2.setView([osmMap2.wrapLatLng(parent.view).lat, osmMap2.wrapLatLng(parent.view).lng - 0.0002], osmMap2.getZoom());
}, 1); //this is a terrible fix but it works for now