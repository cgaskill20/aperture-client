// Author: Ellie Martinez
// Purpose: ingest and filter data to use for graphs
// Dependencies: turf.min.js, leaflet.js, grapher.js

let ingestData = {
    ingestedData: [],
    newData: null,
    viewportRaw: null,
    viewportTurf: null,

    /**
     * Loads GeoJson data into an array
     * @memberof ingestData
     * @method ingest
     * @param {object} data in GeoJson format
     * @returns {boolean} true if success, false otherwise
     */
    ingest: function (data) {
        if (data.length === 0) return;
        //edited to just tack on the new features - make sure to check for duplicates though, cause right now this code doesnt
        ingestData.ingestedData = ingestData.ingestedData.concat(data); //things got messy so had to change 'this' to the explicit ingestData
        return true;
    },

    /**
     * Sets the current viewport
     * @memberof ingestData
     * @method setViewport
     * @param {object} viewport from map 2
     * @returns {boolean} true if success, false otherwise
     */
    setViewport: function (viewport) {
        ingestData.viewportRaw = {
            north: viewport.getNorth(),
            south: viewport.getSouth(),
            east: viewport.getEast(),
            west: viewport.getWest()
        }

        ingestData.viewportTurf = turf.polygon([[
            [ingestData.viewportRaw.west, ingestData.viewportRaw.north],
            [ingestData.viewportRaw.east, ingestData.viewportRaw.north],
            [ingestData.viewportRaw.east, ingestData.viewportRaw.south],
            [ingestData.viewportRaw.west, ingestData.viewportRaw.south],
            [ingestData.viewportRaw.west, ingestData.viewportRaw.north]
        ]]);

        return true;
    },

    /**
     * Clears ingestedData in the event the main map clears its data of interest
     * @memberof ingestData
     * @method clearData
     * @returns {boolean} true if success, false otherwise
     */
    clearData(placeholder){
        ingestData.ingestedData = [];
    }
}

let filterData = {
    /**
     * Checks if data is within current viewport
     * @memberof ingestData
     * @method withinViewport
     * @param {object} viewportTurf turf polygon with viewport coordinates
     * @returns {} data within viewport
     */
    withinViewport: function (viewportTurf) {

    }

}


//pipe code -- do not edit
parent.createPipe("graph_data_ingest", ingestData.ingest);
parent.createPipe("graph_set_viewport", ingestData.setViewport);
parent.createPipe("graph_clear_data", ingestData.clearData);
//----

