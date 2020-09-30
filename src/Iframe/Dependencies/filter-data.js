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
            if (Util.getNameFromGeoJsonFeature(data[i], IngestData.indexData) !== "none") { //check if it is even relevant
                for (let j = 0; j < IngestData.ingestedData.length; j++) { //check for duplicates
                    if (data[i].id === IngestData.ingestedData[j].id) {
                        console.log(data[i]);
                        continue entry_iterator; //continue main iterator if duplicate
                    }
                }
                //ready to be inserted!
                IngestData.ingestedData.push(data[i]);
            }
        }
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
        FilterUtil.buildModel(FilterUtil.withinViewport(IngestData.viewport, IngestData.ingestedData), "power_plant");
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
    }
}

let Runtime = {

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
        console.log(returnData);
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
                if(counts[data[i].properties[IngestData.indexData[modelName]["relevantData"]]]){
                    counts[data[i].properties[IngestData.indexData[modelName]["relevantData"]]]++;
                }
                else{
                    counts[data[i].properties[IngestData.indexData[modelName]["relevantData"]]] = 1;
                }
            }
        }
        console.log(counts)

    }
}


//pipe code -- do not edit
parent.createPipe("graph_data_ingest", IngestData.ingest);
parent.createPipe("graph_set_viewport", IngestData.setViewport);
parent.createPipe("graph_clear_data", IngestData.clearData);
//----

