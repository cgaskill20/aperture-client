/**
 * @namespace Sketch_Visualizer
 * @file Responsible for querying sketch data and drawing it as square regions on a leaflet map
 * @author Kevin Bruhwiler
 */
Sketch_Visualizer = {

    /**
      * Initializes the Sketch_Visualizer object
      *
      * @memberof Sketch_Visualizer
      * @method initialize
      * @param {Object} percentageToColor 
      *        Declares what colors percentage values should be mapped to
      */
    initialize: function(percentageToColor) {
        this._grpcQuerier = grpc_querier();
        this._percentageToColor = percentageToColor;
        this._zoomToPixelSize = {
            3: 2,
            4: 3,
            5: 5,
            6: 8,
            7: 16,
            8: 35
        };
        this._zoomScaleFactor = {
            3: 10,
            4: 10,
            5: 8,
            6: 6,
            7: 2,
            8: 0
        };
        this._decay = 0.9999;
        this._stream = undefined;
    },

    /**
      * Draws a sketch strand onto a canvas object as a rectangle of variable size
      *
      * @memberof Sketch_Visualizer
      * @method _drawStrand
      * @param {Object} strand 
      *        The sketch strand being rendered
      * @param {Object} ctx 
      *        The rendering context of the canvas being drawn to
      * @param {Object} map 
      *        The leaflet map the canvas is attached to
      * @param {Number} epsilon 
      *        The decay factor determining the size of the rectangle being rendered
      */
    _drawStrand: function(strand, ctx, map, epsilon) {
        const lat_lng = map.wrapLatLng(decode_geohash(strand.getGeohash()));

        const center = map.latLngToContainerPoint(lat_lng);
        ctx.fillStyle = this._rgbaToString(this._getColorForPercentage((strand.getMeanList()[0] - 250) / (330 - 250), 0.5));

        const pixelSize = this._zoomToPixelSize[map.getZoom()] *
            Math.max((epsilon * this._zoomScaleFactor[map.getZoom()]), 1);

        center.x = Math.round(center.x- (pixelSize / 2));
        center.y = Math.round(center.y- (pixelSize / 2));

        ctx.clearRect(center.x, center.y, pixelSize, pixelSize);
        ctx.fillRect(center.x, center.y, pixelSize, pixelSize);
    },

    /**
      * Converts an array representing RGBA values into a string
      *
      * @memberof Sketch_Visualizer
      * @method _rgbaToString
      * @param {Array.<Number>} rgba 
      *        A length four array in RGBA order
      * @return {string} 
      *         An rgba string in CSS format
      */
    _rgbaToString: function(rgba){
        return "rgba("+rgba[0]+", "+rgba[1]+", "+rgba[2]+", "+rgba[3]+")";
    },

    /**
      * Gets an R, G, or B color value based on the current _percentageToColor object
      *
      * @memberof Sketch_Visualizer
      * @method _getColorValue
      * @param {Array.<Number>} bounds 
      *        The lower and upper bounds for the color
      * @param {Array.<Number>} pcts 
      *        The lower and upper percentages for the color
      * @param {Number} idx 
      *        The index of the color being computed
      * @return {Number} 
      *         The value of the color
      */
    _getColorValue: function(bounds, pcts, idx){
        return this._percentageToColor[bounds[0]][idx]*pcts[0] + this._percentageToColor[bounds[1]][idx]*pcts[1];
    },

    /**
      * Gets an RGBA CSS string for the given percentage and alpha value
      *
      * @memberof Sketch_Visualizer
      * @method _getColorForPercentage
      * @param {Number} pct 
      *        The percentage value being converted into a color
      * @param {Number} alpha 
      *        The alpha value for the RGBA string
      * @return {string} 
      *         An rgba string in CSS format
      */
    _getColorForPercentage: function(pct, alpha) {
        if(pct === 0) {
            pct += 0.00001;
        } else if (pct % 0.5 === 0) {
            pct -= 0.00001;
        }
        const lower = 0.5*(Math.floor(Math.abs(pct/0.5)));
        const upper = 0.5*(Math.ceil(Math.abs(pct/0.5)));
        const rangePct = (pct - lower) / (upper - lower);
        const pctLower = 1 - rangePct;
        const pctUpper = rangePct;
        const r = Math.floor(this._getColorValue([lower, upper], [pctLower, pctUpper], 0));
        const g = Math.floor(this._getColorValue([lower, upper], [pctLower, pctUpper], 1));
        const b = Math.floor(this._getColorValue([lower, upper], [pctLower, pctUpper], 2));
        return [r, g, b, alpha];
    },

    /**
      * Calculates the smallest geohash that contains the given bounds
      *
      * @memberof Sketch_Visualizer
      * @method _getBoundingGeohash
      * @param {Object} bounds 
      *        The northeast and southwest bounds of the region in question
      * @return {string} 
      *         The smallest bounding geohash
      */
    _getBoundingGeohash: function(bounds) {
        const b1 = encode_geohash(bounds._northEast.lat, bounds._northEast.lng-360);
        const b2 = encode_geohash(bounds._southWest.lat, bounds._southWest.lng-360);
        let boundingGeo = "";
        for(let i = 0; i < b1.length; i++){
            if (b1.charAt(i) === b2.charAt(i)){
                boundingGeo += b1.charAt(i)
            } else { break; }
        }
        return boundingGeo
    },

    /**
      * Calculates all geohashes of the given precision which intersect the given bounds
      *
      * @memberof Sketch_Visualizer
      * @method _getBoundingGeohash
      * @param {Object} bounds 
      *        The northeast and southwest bounds of the region in question
      * @param {string} baseGeo 
      *        The geohash we begin our search at, refined during recursive calls
      * @param {Array.<string>} geohashList 
      *        The list of intersecting geohashes - initially empty
      * @param {Number} precision 
      *        The precision of the geohashes that we're searching for
      * @return {Array.<string>} 
      *         A list of intersecting geohashes at the given precision
      */
    _searchForIntersectingGeohashes: function(bounds, baseGeo, geohashList, precision=2){
        for (let i = 0; i < getGeohashBase().length; i++) {
            const candidateGeo = baseGeo + getGeohashBase().charAt(i);
            const candidateBounds = geohash_bounds(candidateGeo);
            if(this._checkBoundIntersection(bounds, candidateBounds)) {
                if (candidateGeo.length >= precision) {
                    geohashList.push(candidateGeo);
                } else {
                    this._searchForIntersectingGeohashes(bounds, candidateGeo, geohashList, precision)
                }
            }
        }
        return geohashList;
    },

    /**
      * Checks whether the two given lat/lng bounds intersect each other.
      *
      * @memberof Sketch_Visualizer
      * @method _checkBoundIntersection
      * @param {Object} b1 
      *        The northeast/southwest bounds of the first region
      * @param {Object} b2 
      *        The northeast/southwest bounds of the second region
      * @return {boolean} 
      *         Whether or not the two bounds intersect
      */
    _checkBoundIntersection: function(b1, b2) {
        return !(b2.sw.lat > b1.ne.lat ||
            b2.ne.lat < b1.sw.lat ||
            b2.ne.lng > b1.sw.lng ||
            b2.sw.lng < b1.ne.lng);
    },

    /**
      * Standardizes the format of northeast/southwest bounding box objects
      *
      * @memberof Sketch_Visualizer
      * @method _standardizeBounds
      * @param {Object} b1 
      *        The lat/lng bounds of the first region
      * @param {Object} b2 
      *        The lat/lng bounds of the second region
      * @return {boolean} 
      *         Whether or not the two bounds intersect
      */
    _standardizeBounds: function(bounds){
        return {ne: bounds._northEast, sw: bounds._southWest};
    },

    /**
      * Queries the sketch for the given time and draws the resulting strands onto the canvas and map provided
      *
      * @memberof Sketch_Visualizer
      * @method queryTime
      * @param {Number} startTime 
      *        The lower bound of the queried time, in epoch milliseconds
      * @param {Number} endTime 
      *        The upper bound of the queried time, in epoch milliseconds
      * @param {Object} ctx 
      *        The rendering context of the canvas being drawn on
      * @param {Object} map 
      *        The leaflet map containing the canvas being drawn on
      */
    queryTime: function(startTime, endTime, ctx, map) {
        const geohashList = [];
        this._searchForIntersectingGeohashes(this._standardizeBounds(map.getBounds()),
            this._getBoundingGeohash(map.getBounds()), geohashList);

        if (this._stream)
            this._stream.cancel();

        let stream = this._grpcQuerier.getStreamForQuery("noaa_2015_jan", geohashList, startTime, endTime);

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        let epsilon = this._zoomToPixelSize[map.getZoom()];
        stream.on('data', function (response) {
            for (const strand of response.getStrandsList()) {
                this._drawStrand(strand, ctx, map, epsilon);
                epsilon *= this._decay;
            }
        }.bind(this));
        stream.on('status', function (status) {
            console.log(status.code, status.details, status.metadata);
        });
        stream.on('end', function (end) {
        }.bind(this));

        this._stream = stream;
    },
};

/**
  * Returns a Sketch_Visualizer object
  *
  * @function sketch_visualizer
  * @return {Sketch_Visualizer} 
  *         A Sketch_Visualizer object
  */
sketch_visualizer = function(percentageToColor) {
    const sketchVisualizer = Sketch_Visualizer;
    sketchVisualizer.initialize(percentageToColor);
    return sketchVisualizer;
};

try{
    module.exports = {
        sketch_visualizer: sketch_visualizer
    }
} catch(e) { }