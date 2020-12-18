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

//map 3 merge stuff
const censusViz = census_visualizer();

const sviCalcAdjustments = {
    "type": "slider",
    "range": [
        0,
        5
    ],
    "default": [
        1
    ],
    "step": 0.1
}

const data = {
    "water_works": {
        "iconAddr": "../../../images/water_works.png",
        "color": "black",
        "defaultRender": false,
        "query": "man_made=water_works",
        "subGroup": "Water (Man Made)",
        "grpc": "OSMRequest",
        "group": "Basic Layers"
    },
    "wastewater_plant": {
        "iconAddr": "../../../images/sewage.png",
        "color": "#FF00FF",
        "defaultRender": false,
        "query": "man_made=wastewater_plant",
        "subGroup": "Water (Man Made)",
        "grpc": "OSMRequest",
        "group": "Basic Layers"
    },
    "canal": {
        "color": "teal",
        "defaultRender": false,
        "query": "waterway=canal",
        "preProcess": true,
        "subGroup": "Water (Man Made)",
        "grpc": "OSMRequest",
        "group": "Basic Layers"
    },
    "river": {
        "color": "#00008B",
        "defaultRender": false,
        "query": "waterway=river",
        "preProcess": true,
        "grpc": "OSMRequest",
        "subGroup": "Water (Natural)",
        "group": "Basic Layers"
    },
    "stream": {
        "color": "#0000BB",
        "defaultRender": false,
        "query": "waterway=stream",
        "preProcess": true,
        "subGroup": "Water (Natural)",
        "grpc": "OSMRequest",
        "group": "Basic Layers"
    },
    "ditch": {
        "color": "#0000BB",
        "defaultRender": false,
        "query": "waterway=ditch",
        "preProcess": true,
        "subGroup": "Water (Man Made)",
        "grpc": "OSMRequest",
        "group": "Basic Layers"
    },
    "lock_gate": {
        "iconAddr": "../../../images/lock_gate.png",
        "color": "#FF0000",
        "defaultRender": false,
        "query": "waterway=lock_gate",
        "subGroup": "Water (Man Made)",
        "grpc": "OSMRequest",
        "group": "Basic Layers"
    },
    "weir": {
        "iconAddr": "../../../images/weir.png",
        "color": "#FF0000",
        "defaultRender": false,
        "query": "waterway=weir",
        "subGroup": "Water (Man Made)",
        "grpc": "OSMRequest",
        "group": "Basic Layers"
    },
    "tidal_channel": {
        "color": "#0080FF",
        "defaultRender": false,
        "query": "waterway=tidal_channel",
        "subGroup": "Water (Natural)",
        "grpc": "OSMRequest",
        "group": "Basic Layers"
    },
    "water": {
        "iconAddr": "../../../images/reservoir-lake.png",
        "color": "#00FFFF",
        "defaultRender": false,
        "query": "natural=water",
        "subGroup": "Water (Man Made)",
        "grpc": "OSMRequest",
        "group": "Basic Layers"
    },
    "reservoir": {
        "notAQueryableLayer": true,
        "iconAddr": "../../../images/reservoir-lake.png",
        "color": "#00FFFF",
        "subGroup": "Water (Man Made)"
    },
    "basin": {
        "notAQueryableLayer": true,
        "iconAddr": "../../../images/reservoir-lake.png",
        "color": "#00FFFF",
        "subGroup": "Water (Natural)"
    },
    "pond": {
        "notAQueryableLayer": true,
        "color": "#00FFFF",
        "iconAddr": "../../../images/reservoir-lake.png",
        "subGroup": "Water (Natural)"
    },
    "lake": {
        "notAQueryableLayer": true,
        "color": "#00FFFF",
        "iconAddr": "../../../images/reservoir-lake.png",
        "subGroup": "Water (Natural)"
    },
    "Natural_Gas_Pipeline": {
        "color": "#8A2BE2",
        "defaultRender": false,
        "query": "custom=Natural_Gas_Pipeline",
        "grpc": "DatasetRequest",
        "grpcDataset": 4,
        "identityField": "TYPEPIPE",
        "subGroup": "Energy",
        "popup": "A(n) @@TYPEPIPE@@ natural gas pipeline operated by @@Operator@@.",
        "group": "Basic Layers"
    },
    "substation": {
        "iconAddr": "../../../images/substation.png",
        "defaultRender": false,
        "query": "custom=substation",
        "grpc": "DatasetRequest",
        "grpcDataset": 2,
        "identityField": "TYPE",
        "identityKey": "SUBSTATION",
        "subGroup": "Energy",
        "popup": "@@NAME@@ substation. An @@STATUS@@ substation in @@COUNTY@@ county with a max voltage of @@MAX_VOLT@@. Sourced from @@SOURCE@@.",
        "group": "Basic Layers"
    },
    "power_transmission_line": {
        "color": "#000000",
        "defaultRender": false,
        "query": "custom=power_transmission_line",
        "grpc": "DatasetRequest",
        "grpcDataset": 3,
        "identityField": "TYPE",
        "identityKey": "AC",
        "subGroup": "Energy",
        "popup": "A(n) @@TYPE@@ power transmission line owned by @@OWNER@@, spanning from @@SUB_1@@ to @@SUB_2@@. Sourced from @@SOURCE@@.",
        "group": "Basic Layers"
    },
    "flood_zones": {
        "defaultRender": false,
        "query": "custom=flood_zone",
        "refrences": [
            "flood_zone_A",
            "flood_zone_AE",
            "flood_zone_AH",
            "flood_zone_AO",
            "floodway"
        ],
        "subGroup": "Flood Data",
        "grpc": "DatasetRequest",
        "grpcDataset": 7,
        "group": "Basic Layers"
    },
    "floodway": {
        "notAQueryableLayer": true,
        "color": "#D60BB1",
        "identityField": "ZONE_SUBTY",
        "identityKey": "FLOODWAY",
        "noBorder": true,
        "popup": "A channel of a river or other watercourse and the adjacent land areas that must be reserved in order to discharge the base flood without cumulatively increasing the water surface elevation more than a designated height."
    },
    "flood_zone_A": {
        "notAQueryableLayer": true,
        "color": "#880000",
        "identityField": "FLD_ZONE",
        "identityKey": "A",
        "noBorder": true,
        "popup": "Areas subject to a one percent or greater annual chance of flooding in any given year."
    },
    "flood_zone_AE": {
        "notAQueryableLayer": true,
        "color": "#880000",
        "identityField": "FLD_ZONE",
        "identityKey": "AE",
        "noBorder": true,
        "popup": "Areas subject to a one percent or greater annual chance of flooding in any given year."
    },
    "flood_zone_AH": {
        "notAQueryableLayer": true,
        "color": "#008080",
        "identityField": "FLD_ZONE",
        "identityKey": "AH",
        "noBorder": true,
        "popup": "Areas subject to a one percent or greater annual chance of flooding in any given year. Flooding is usually in the form of ponding with average depths between one and three feet."
    },
    "flood_zone_AO": {
        "notAQueryableLayer": true,
        "color": "#000080",
        "identityField": "FLD_ZONE",
        "identityKey": "AO",
        "noBorder": true,
        "popup": "Areas subject to a one percent or greater annual chance of flooding in any given year. Flooding is usually in the form of sheet flow with average depths between one and three feet."
    },
    "flood_zone_V": {
        "notAQueryableLayer": true,
        "color": "#000080",
        "identityField": "FLD_ZONE",
        "identityKey": "V",
        "noBorder": true,
        "popup": "Areas subject to a one percent or greater annual chance of flooding in any given year that also have additional hazards associated with velocity wave action"
    },
    "flood_zone_VE": {
        "notAQueryableLayer": true,
        "color": "#000080",
        "identityField": "FLD_ZONE",
        "identityKey": "VE",
        "noBorder": true,
        "popup": "Areas subject to a one percent or greater annual chance of flooding in any given year that also have additional hazards associated with velocity wave action"
    },
    "dam": {
        "iconAddr": "../../../images/dam.png",
        "color": "#FF0000",
        "defaultRender": false,
        "query": "custom=dam",
        "subGroup": "Water (Man Made)",
        "grpc": "DatasetRequest",
        "grpcDataset": 1,
        "identityField": "DAM_HEIGHT",
        "popup": "@@NAME@@ dam, located along the @@RIVER@@, standing @@DAM_HEIGHT@@ feet high, located in @@COUNTY@@ county, @@STATE@@. This dam primarily affects @@CITYAFFECT@@, @@NIDSTATE@@.",
        "group": "Basic Layers"
    },
    "power_plant": {
        "iconAddr": "../../../images/power_plant.png",
        "defaultRender": false,
        "query": "custom=power_plant",
        "queryURL": "https://geodata.epa.gov/arcgis/rest/services/OEI/FRS_PowerPlants/MapServer/12/query?where=1%3D1&outFields=*&geometry={{BOUNDS}}&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outSR=4326&f=geojson",
        "identityField": "ENERGY_SRC_DESC1",
        "subGroup": "Energy",
        "popup": "@@PLANT_NAME@@ power plant, which produces energy through @@ENERGY_SRC_DESC1@@",
        "group": "Basic Layers"
    },
    "fire_station": {
        "iconAddr": "../../../images/fire_station.png",
        "defaultRender": false,
        "query": "custom=fire_station",
        "grpc": "DatasetRequest",
        "grpcDataset": 6,
        "identityField": "ISLANDMARK",
        "subGroup": "Emergency & Medical",
        "popup": "@@NAME@@, located in @@CITY@@, @@STATE@@.",
        "group": "Basic Layers"
    },
    "hospital": {
        "iconAddr": "../../../images/hospital.png",
        "defaultRender": false,
        "query": "custom=hosptial",
        "grpc": "DatasetRequest",
        "grpcDataset": 0,
        "identityField": "BEDS",
        "subGroup": "Emergency & Medical",
        "popup": "@@NAME@@, a @@OWNER@@ hospital with @@BEDS@@ beds, located in @@CITY@@, @@STATE@@.",
        "group": "Basic Layers"
    },
    "urgent_care": {
        "iconAddr": "../../../images/urgent_care.png",
        "defaultRender": false,
        "query": "custom=urgent_care",
        "queryURL": "https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Urgent_Care_Facilities/FeatureServer/0/query?where=1%3D1&outFields=*&geometry={{BOUNDS}}&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outSR=4326&f=geojson",
        "identityField": "EMERGEXT",
        "subGroup": "Emergency & Medical",
        "popup": "@@NAME@@, an urgent care facility located in @@CITY@@, @@STATE@@.",
        "group": "Basic Layers"
    },
    "streamflowData": {
        "notAQueryableLayer": true,
        "color": "#FF00FF"
    },
    "census_tracts": {
        "group": "Dynamic Layers",
        "subGroup": "Tract Level",
        "constraints": {
            "data": {
                "type": "selector",
                "options": ["Total Population", "Avg. Household Income"]
            }
        },
        "onConstraintChange": function (layer, constraintName, value) {
            //console.log("layer:" + layer + " \nContraint: " + constraintName + " \n Value: " + value);
            censusViz.setFeature(value);
        },
        "onAdd": function () {
            censusViz.allowCensusRender = true;
        },
        "onUpdate": function () {
            censusViz.updateViz(osmMap2);
        },
        "onRemove": function () {
            censusViz.allowCensusRender = false;
            censusViz.clearViz();
        }
    },
    "COVID-19": {
        "group": "Dynamic Layers",
        "subGroup": "Health",
        "constraints": {
            date_range: {
                "type": "slider",
                "label": "Date Range",
                "range": [1580169600000, 1580169600000 + 1000 * 60 * 60 * 24 * 266],
                "default": [1580169600000, 1580169600000 + 1000 * 60 * 60 * 24 * 266],
                "step": 1000 * 60 * 60 * 24,
                "isDate": true
            }
        },
        "onConstraintChange": function (layer, constraintName, value) {
            COVID.dateStart = Number(value[0]);
            COVID.dateEnd = Number(value[1]);
            COVID.changeFlag = true;
            COVID.makeQuery(osmMap2);
        },
        "onAdd": function () {
            COVID.allowRender = true;
        },
        "onRemove": function () {
            COVID.allowRender = false;
            COVID.clear();
        },
        "onUpdate": function () {
            COVID.makeQuery(osmMap2);
        }
    },
    "Heat_Waves": {
        "group": "Dynamic Layers",
        "subGroup": "Climate",
        "constraints": {
            "temperature": {
                "type": "slider",
                "range": [
                    88,
                    110
                ],
                "default": [
                    88
                ],
                "step": 1
            },
            "length": {
                "type": "slider",
                "label": "Length (Days)",
                "range": [
                    1,
                    200
                ],
                "default": [
                    1
                ],
                "step": 1
            },
            "years": {
                "type": "slider",
                "label": "Yearly Range",
                "range": [
                    2006,
                    2010
                ],
                "default": [
                    2006,
                    2010
                ],
                "step": 1
            }
        },
        "onConstraintChange": function (layer, constraintName, value) {
            if (constraintName == 'years')
                for (let i = 0; i < value.length; i++) {
                    value[i] = Number(value[i]);
                }
            else
                value = Number(value)
            Census_Visualizer.updateFutureHeatConstraint(constraintName, value);
        },
        "onUpdate": function (layer) {
            Census_Visualizer.updateFutureHeat(osmMap2);
        },
        "onAdd": function (layer) {
            //update is auto-called after add, so no need to do anything
        },
        "onRemove": function (layer) {
            Census_Visualizer.clearHeat();
        }
    },
    "Snow_Drought": {
        "group": "Dynamic Layers",
        "subGroup": "Climate",
        "constraints": {
            "percent_decrease": {
                "type": "slider",
                "range": [
                    0,
                    20
                ],
                "default": [
                    1,
                    3
                ],
                "step": 1
            },
            "length": {
                "type": "slider",
                "label": "Length (Months)",
                "range": [
                    1,
                    12
                ],
                "default": [
                    1
                ],
                "step": 1
            },
            "years": {
                "type": "slider",
                "label": "Yearly Range",
                "range": [
                    1981,
                    2018
                ],
                "default": [
                    2016,
                    2018
                ],
                "step": 1
            }
        },
        "onConstraintChange": function (layer, constraintName, value) {
            if (constraintName == 'years' || constraintName == "percent_decrease")
                for (let i = 0; i < value.length; i++) {
                    value[i] = Number(value[i]);
                }
            else
                value = Number(value)
            Census_Visualizer.updateSnowDroughtConstraint(constraintName, value);
        },
        "onUpdate": function (layer) {
            Census_Visualizer.updateSnowDrought(osmMap2);
        },
        "onAdd": function (layer) {
            //update is auto-called after add, so no need to do anything
        },
        "onRemove": function (layer) {
            Census_Visualizer.clearHeat();
        }
    },
    "Standard_Precipitation_Index": {
        "group": "Dynamic Layers",
        "subGroup": "Climate",
        "constraints": {
            "spi": {
                "type": "slider",
                "range": [
                    0,
                    4
                ],
                "default": [
                    1,
                    2
                ],
                "step": 1
            },
            "length": {
                "type": "slider",
                "label": "Length (Days)",
                "range": [
                    1,
                    20
                ],
                "default": [
                    1
                ],
                "step": 1
            },
            "years": {
                "type": "slider",
                "label": "Yearly Range",
                "range": [
                    2007,
                    2014
                ],
                "default": [
                    2012,
                    2014
                ],
                "step": 1
            }
        },
        "onConstraintChange": function (layer, constraintName, value) {
            if (constraintName == 'years' || constraintName == "spi")
                for (let i = 0; i < value.length; i++) {
                    value[i] = Number(value[i]);
                }
            else
                value = Number(value)
            Census_Visualizer.updateSPIConstraint(constraintName, value);
        },
        "onUpdate": function (layer) {
            Census_Visualizer.updateSPI(osmMap2);
        },
        "onAdd": function (layer) {
            //update is auto-called after add, so no need to do anything
        },
        "onRemove": function (layer) {
            Census_Visualizer.clearHeat();
        }
    },
    "social_vulnerability_index": {
        "group": "Dynamic Layers",
        "subGroup": "Social Vulnerability",
        "constraints": {
            below_poverty: sviCalcAdjustments,
            unemployed: sviCalcAdjustments,
            income: sviCalcAdjustments,
            no_high_school_diploma: sviCalcAdjustments,
            aged_65_or_older: sviCalcAdjustments,
            aged_17_or_younger: sviCalcAdjustments,
            age_5_or_older_with_disability: sviCalcAdjustments,
            single_parent_households: sviCalcAdjustments,
            minority: sviCalcAdjustments,
            speaks_english_less_than_well: sviCalcAdjustments,
            multi_unit_structures: sviCalcAdjustments,
            mobile_homes: sviCalcAdjustments,
            crowding: sviCalcAdjustments,
            no_vehicle: sviCalcAdjustments,
            group_quarters: sviCalcAdjustments
        },
        "onConstraintChange": function (layer, constraintName, value) {
            SVI.SVIweights[constraintName] = Number(value);
            SVI.sviWeightFlag = true;
            //console.log(SVI.SVIweights);
            SVI.makeQuery(osmMap2);
        },
        "onUpdate": function (layer) {
            SVI.makeQuery(osmMap2);
        },
        "onAdd": function (layer) {
            SVI.allowRender = true;
            //update is auto-called after add, so no need to do anything
        },
        "onRemove": function (layer) {
            SVI.allowRender = false;
            SVI.clear();
            //Census_Visualizer.clearHeat();
        }
    },
}


$.getJSON("json/streamflowMetadata.json", function (mdata) {
    RenderInfrastructure.preProcessData = mdata;
    RenderInfrastructure.config(osmMap2, markers, data, {
        queryAlertText: document.getElementById('queryInfoText'),
        overpassInterpreter: 'http://lattice-136.cs.colostate.edu:4096/api/interpreter',
        maxElements: 10000,
        maxLayers: 20,
        simplifyThreshold: 0.00005
    });
    // //Generator.config(data, document.getElementById("checkboxLocation"), true, changeChecked, "checkbox", true,
    //     '<ul style="padding-inline-start:20px;">' +
    //     '<li><b>Reservoir/Lake/Basin/Pond</b>: Icon made from <a href="http://www.onlinewebfonts.com/icon">Icon Fonts</a> is licensed by CC BY 3.0</li>' +
    //     '<li><b>Wastewater Plant</b>: Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></li>' +
    //     '<li><b>Dam</b>: Icon from <a href="http://www.iconsmind.com">iconsmind.com</a></li>' +
    //     '<li><b>Hospital</b>: Icons from Font Awesome by Dave Gandy - <a href="https://fortawesome.github.com/Font-Awesome">fortawesome.github.com/Font-Awesome</a> / CC BY-SA (<a href="https://creativecommons.org/licenses/by-sa/3.0">creativecommons.org/licenses/by-sa/3.0</a>)</li>' +
    //     '<li><b>Urgent Care</b>: Icon By Bridget Gahagan, <a href="https://thenounproject.com/">noun project</a></li>' +
    //     '<li><b>Fire Station</b>: Icon From <a href="https://icons8.com/">icons8.com</a></li>' +
    //     '</ul>',
    //     true);
    MenuGenerator.generate(data, document.getElementById("checkboxLocation"));
    runQuery();
});

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
        } else if (element.id in future_climate) {
            censusViz.updateFutureHeat(osmMap2, true);
        } else {
            RenderInfrastructure.addFeatureToMap(element.id);
        }
    }
    else {
        if (element.id in census)
            censusViz.setFeature(element.id);
        else if (element.id in future_climate)
            censusViz.clearHeat();
        else
            RenderInfrastructure.removeFeatureFromMap(element.id);
    }
}

//console.log("r");
parent.addEventListener('updateMaps', function () {
    runQuery();
    updateLayers();
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


// const q = []
// console.log(JSON.stringify(q));
// //const stream1 = sustain_querier().getStreamForQuery("lattice-46", 27017, "covid_county", JSON.stringify(q));

// stream1.on('data', function (r) {
//     const data = JSON.parse(r.getData());
//     console.log(data);
// }.bind(this));