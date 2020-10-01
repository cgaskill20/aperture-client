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

let Runtime = {
    graphs:{},

    update: function(){
        for(id in IngestData.indexData){
            if(!Runtime.graphs[id]){
                Runtime.graphs[id] = Grapher.createGraph(GRAPHTYPE.bar);
            }
            Grapher.updateGraph(Runtime.graphs[id],FilterUtil.buildModel(FilterUtil.withinViewport(IngestData.viewport, IngestData.ingestedData), id));
        }
    },

    removeAllGraphs: function(){
        for(graph in Runtime.graphs){
            console.log("Removing: " + Runtime.graphs[graph]);
            Grapher.removeGraph(Runtime.graphs[graph]);
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
        for (let i = 0; i < data.length; i++) {
            const dataType = Util.getFeatureType(data[i]);
            if (dataType === FEATURETYPE.point) {
                if (viewport.contains(L.latLng(data[i].geometry.coordinates[1], data[i].geometry.coordinates[0]))) {
                    returnData.push(data[i]);
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
            if(data[i].properties[IngestData.indexData[modelName]["relevantData"]]){
                let indx = -1;
                for(let j = 0; j < counts.length; j++){
                    if(counts[j].group === data[i].properties[IngestData.indexData[modelName]["relevantData"]]){
                        indx = j;
                        break;
                    }
                }
                if(indx !== -1){
                    counts[indx].count++;
                }
                else{
                    counts.push({
                        group: data[i].properties[IngestData.indexData[modelName]["relevantData"]],
                        count: 1
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

