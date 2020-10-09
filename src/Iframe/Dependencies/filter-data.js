// Author: Ellie Martinez
// Purpose: ingest and filter data to use for graphs
// Dependencies: leaflet.js, grapher.js, getInfrastructure.js

let IngestData = {
    ingestedData: [],
    newData: null,
    viewport: null,
    indexData: null,

    /**
     * Loads GeoJson data into an array
     * @memberof IngestData
     * @method ingest
     * @param {object} data in GeoJson format
     * @returns {boolean} true if success, false otherwise
     */
    ingest: function (data) {
        if (data.length === 0) return;
        entry_iterator:
        for (let i = 0; i < data.length; i++) { //loop over entries
            let name = Util.getNameFromGeoJsonFeature(data[i], IngestData.indexData);
            if (name !== "none") { //check if it is even relevant
                for (let j = 0; j < IngestData.ingestedData.length; j++) { //check for duplicates
                    if (data[i].id === IngestData.ingestedData[j].id) {
                        console.log(data[i]);
                        continue entry_iterator; //continue main iterator if duplicate
                    }
                }
                //ready to be inserted!
                let dataToPush = {
                    id: data[i].id,
                    geometry: data[i].geometry,
                    properties: {}
                }
                dataToPush.properties[IngestData.indexData[name]["identityField"]] = data[i].properties[IngestData.indexData[name]["identityField"]];
                dataToPush.properties[IngestData.indexData[name]["relevantData"]] = data[i].properties[IngestData.indexData[name]["relevantData"]];
                IngestData.ingestedData.push(dataToPush);
            }
        }
        Runtime.update();
        return true;
    },

    /**
     * Sets the current viewport
     * @memberof IngestData
     * @method setViewport
     * @param {object} viewport from map 2
     * @returns {boolean} true if success, false otherwise
     */
    setViewport: function (viewport) {
        IngestData.viewport = viewport;
        Runtime.update();
        return true;
    },

    /**
     * Clears ingestedData in the event the main map clears its data of interest
     * @memberof IngestData
     * @method clearData
     * @returns {boolean} true if success, false otherwise
     */
    clearData(placeholder) {
        IngestData.ingestedData = [];
        Runtime.removeAllGraphs();
    }
}

let previousViewport = null;
let Runtime = {
    graphs: {},

    update: function () {
        const now = Date.now();
        if(IngestData.viewport === previousViewport){
            //return;
        }
        previousViewport = IngestData.viewport;
        const dataWithinViewport = FilterUtil.withinViewport(IngestData.viewport, IngestData.ingestedData);
        for (id in IngestData.indexData) {
            const idData = FilterUtil.buildModel(dataWithinViewport, id);
            if (idData.length !== 0) {
                if (!Runtime.graphs[id]) {
                    Runtime.graphs[id] = Grapher.createGraph(GRAPHTYPE.bar);
                }
                Grapher.updateGraph(Runtime.graphs[id], idData);
            }
        }
        console.log(Date.now() - now);
    },

    removeAllGraphs: function () {
        for (graph in Runtime.graphs) {
            Grapher.removeGraph(Runtime.graphs[graph]);
            delete Runtime.graphs[graph];
        }
    }

}


const FilterUtil = {
    /**
    * Checks if data is within current viewport
    * @memberof IngestData
    * @method withinViewport
    * @param {object} viewport
    * @param {Array<object>} data
    * @returns {Array<object>} data within viewport
    */
    withinViewport: function (viewport, data) {
        let returnData = [];
        within_loop:
        for (let i = 0; i < data.length; i++) {
            const dataType = Util.getFeatureType(data[i]);
            if (dataType === FEATURETYPE.point) {
                if (viewport.contains(L.latLng(data[i].geometry.coordinates[1], data[i].geometry.coordinates[0]))) {
                    returnData.push(data[i]);
                    continue within_loop;
                }
            }
            else if(dataType === FEATURETYPE.multipolygon){
                for(let n = 0; n < data[i].geometry.coordinates[0].length; n++){
                    for(let coord = 0; coord < data[i].geometry.coordinates[0][n].length; coord++){
                        //console.log(data[i].geometry.coordinates[0][n]);
                        //console.log("coordinates[0]["+n+"]");
                        //console.log(data[i].geometry.coordinates[0][n][coord][1] + ", " + data[i].geometry.coordinates[0][n][coord][0]);
                        if (viewport.contains(L.latLng(data[i].geometry.coordinates[0][n][coord][1], data[i].geometry.coordinates[0][n][coord][0]))) {
                            returnData.push(data[i]);
                            continue within_loop;
                        }
                    }
                }
            }
        }
        return returnData;
    },
    /**
    * Builds a model to be pushed to grapher.js/d3.js
    * @memberof FilterUtil
    * @method buildModels
    * @param {Array<object>} data
    * @returns {Array<object>} models/counts
    */
    buildModel: function (data, modelName) {
        let counts = [];
        for (let i = 0; i < data.length; i++) {
            let dataOfRelevance = data[i].properties[IngestData.indexData[modelName]["relevantData"]];
            if (dataOfRelevance) {
                let sortIndex = 0;
                let indx = -1;
                if(IngestData.indexData[modelName]["bands"]){ //if bands exist (quatitative data only), this data must be organized into bands
                    for(let n = 0; n < IngestData.indexData[modelName]["bands"].length; n++){
                        if(dataOfRelevance >= IngestData.indexData[modelName]["bands"][n]["range"][0] && dataOfRelevance < IngestData.indexData[modelName]["bands"][n]["range"][1]){
                            dataOfRelevance = IngestData.indexData[modelName]["bands"][n]["label"];
                            sortIndex = n;
                            break;
                        }
                    }
                }
                for (let j = 0; j < counts.length; j++) {
                    if (counts[j].group === dataOfRelevance) {
                        indx = j;
                        break;
                    }
                }
                if (indx !== -1) {
                    counts[indx].count++;
                }
                else {
                    counts.push({
                        group: dataOfRelevance,
                        count: 1,
                        sortIndex: sortIndex
                    });
                }
            }
        }
        return counts;
    }
}


//pipe code -- do not edit
parent.createPipe("graph_data_ingest", IngestData.ingest);
parent.createPipe("graph_set_viewport", IngestData.setViewport);
parent.createPipe("graph_clear_data", IngestData.clearData);
//----

