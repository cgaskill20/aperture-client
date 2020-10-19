

const MAPNUMBER = 2;

let queryAlertText = document.getElementById('queryInfoText');
//--------------
osmMap2 = L.map('map2', {
    renderer: L.canvas(),
    minZoom: 3,
    fullscreenControl: true,
    inertia: false,
    timeDimension: false,
    //minZoom: 11
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
            maxLayers: 20,
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

const g = { groupMem: "Census", query: 1 };
const census = {
    "Total Population": g, "Avg. Household Income": g,
    "Population by Age": g, "Median Age": g, "No. Below Poverty Line": g, "Demographics": g
}

Generator.config(census, document.getElementById("checkboxLocation"), true, changeChecked, "radio", true);

const fc = {
    groupMem: "Future Climate", 
    query: 1, 
    constraints: {
        "temperature":{
            "range":[88,110],
            "default": [88],
            "step":1
        },
        "length":{
            "label":"Length (Days)",
            "range":[1,200],
            "default":[1],
            "step":1
        },
        "years":{
            "label":"Yearly Range",
            "range":[2006,2010],
            "default":[2006,2010],
            "step":1
        }
    },
    onConstraintChange: "censusViz.updateFutureHeat(RenderInfrastructure.map, true)"
};

const age_aqi_hospitals = {
    groupMem: "Age + AQI + Hospitals", 
    query: 1, 
    constraints: {
        "average_age":{
            "label":"Average age",
            "range":[15,80],
            "default": [30,50],
            "step":1
        },
        "aqi":{
            "label":"AQI",
            "range":[0,400],
            "default":[1,50],
            "step":1
        },
        "hospital_dist":{
            "label":"No Hospital in Range (km)",
            "range":[1,100],
            "default":[5],
            "step":1
        }
    },
    onConstraintChange: "censusViz.updateAgeAQIDistanceToHospital(RenderInfrastructure.map, true)"
}

const svi_floodzone_highway = {
    groupMem: "SVI + Floodzone + Highway", 
    query: 1, 
    constraints: {
        "svi":{
            "label":"Social Vulnerability Index",
            "range":[0,1],
            "default": [0.5,1],
            "step":0.05
        },
        "Highway_dist":{
            "label":"No Highway in Range (miles)",
            "range":[0,10],
            "default":[1],
            "step":1
        }
    },
    onConstraintChange: "censusViz.updateSVIFloodzoneDist(RenderInfrastructure.map, true)"
}

const extraQueries = {
    "Heat_Waves": fc,
    "age_aqi_hospitals": age_aqi_hospitals,
    "svi_floodzone_highway": svi_floodzone_highway
}



Generator.config(extraQueries, document.getElementById("checkboxLocation"), true, changeChecked, "checkbox", true);

//map 3 merge stuff
const censusViz = census_visualizer();
censusViz.updateViz(osmMap2);
censusViz.updateFutureHeat(osmMap2);

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
        } else if (element.id in extraQueries) {
            censusViz.updateFutureHeat(osmMap2, true);
            censusViz.updateAgeAQIDistanceToHospital(osmMap2, true)
            censusViz.updateSVIFloodzoneDist(RenderInfrastructure.map, true)
        } else {
            RenderInfrastructure.addFeatureToMap(element.id);
        }
    }
    else {
        if (element.id in census)
            censusViz.setFeature(element.id);
        else if (element.id in extraQueries)
            switch(element.id){
                case "Heat_Waves":
                    censusViz.clearHeat();
                    break;
                case "svi_floodzone_highway":
                    censusViz.clearSVIFloodHighway();
                    break;
            }
        else
            RenderInfrastructure.removeFeatureFromMap(element.id);
    }
}

parent.addEventListener('updateMaps', function () {
    runQuery();
    censusViz.updateViz(osmMap2);
    censusViz.updateFutureHeat(osmMap2, false); 
    censusViz.updateAgeAQIDistanceToHospital(osmMap2, false)
    censusViz.updateSVIFloodzoneDist(RenderInfrastructure.map, false)
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