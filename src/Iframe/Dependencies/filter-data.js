// Author: Ellie Martinez
// Purpose: ingest and filter data to use for graphs
// Dependencies: turf.min.js, leaflet.js, grapher.js

let ingestData = {
    ingestedData: [],
    newData: null,
    
    /**
     * Loads GeoJson data into an array
     * @memberof ingestData
     * @method ingest
     * @param {object} data in GeoJson format
     * @returns {boolean} true if success, false otherwise
     */
    ingest: function (data) {
        newData = JSON.parse(data);
        ingestedData = ingestedData.concat(newData.features);
        return true;
    },

    /**
     * Sets the current viewport
     * @memberof ingestData
     * @method setViewport
     * @param {object} viewport from map 2
     * @returns {boolean} true if success, false otherwise
     */
    setViewport: function(viewport) {
        this.viewportRaw = {north: viewport.getNorth(),
                            south: viewport.getSouth(),
                            east: viewport.getEast(),
                            west: viewport.getWest()
                            }

        this.viewportTurf = turf.polygon([[
            [viewportRaw.west, viewportRaw.north],
            [viewportRaw.east, viewportRaw.north],
            [viewportRaw.east, viewportRaw.south],
            [viewportRaw.west, viewportRaw.south]
        ]]);

        return true;
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

