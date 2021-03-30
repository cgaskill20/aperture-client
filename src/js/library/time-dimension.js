'use strict';


/**
 * @namespace CustomTimeDimension
 * @file An extension of the leaflet TimeDimension for displaying voluminous sketches.
 * @author Kevin Bruhwiler
 */
L.TimeDimension.Layer.CustomTimeDimension = L.TimeDimension.Layer.extend({

    /**
      * Initialize the CustomTimeDimension object.
      *
      * @memberof CustomTimeDimension
      * @method initialize
      * @param {Object} options 
      *        The options for the leaflet TimeDimension
      * @param {Object} dataloader
      *        The object responsible for loading the data that will be displayed
      */
    initialize: function(options, dataLoader) {
        L.TimeDimension.Layer.prototype.initialize.call(this, options);
        this._dataLoader = dataLoader;
        this._lastQueryTime = 0;
        this._currentLoadedTime = 0;
    },
    
    /**
      * The function called when the CustomTimeDimension layer is added to a leaflet map
      *
      * @memberof CustomTimeDimension
      * @method onAdd
      * @param {Object} map 
      *        The leaflet map the layer is being added to
      */
    onAdd: function(map) {
	this._map = map;
        L.TimeDimension.Layer.prototype.onAdd.call(this, map);

        this._initCanvas();

        if (this.options.pane) {
            this.getPane().appendChild(this._canvas);
        } else {
            map._panes.overlayPane.appendChild(this._canvas);
        }

	this._getDataForTime(this._timeDimension.getCurrentTime());
        map.on('moveend', this._reset, this);
    },

    /**
      * Adds the layer to a leaflet map
      *
      * @memberof CustomTimeDimension
      * @method addTo
      * @param {Object} map 
      *        The leaflet map the layer is being added to
      * @return {Object} 
      *         The leaflet map the layer is being added to
      */
    addTo: function (map) {
        map.addLayer(this);
        return this;
    },

    /**
      * Adds a control object to the CustomTimeDimension layer
      *
      * @memberof CustomTimeDimension
      * @method addControlReference
      * @param {Object} ctrl 
      *        The control object being added
      */
    addControlReference: function(ctrl) {
        this._ctrl = ctrl;
    },
	
    /**
      * Initializes the canvas that will be used to render data by the dataloader
      *
      * @memberof CustomTimeDimension
      * @method _initCanvas
      */
    _initCanvas: function () {
        const canvas = this._canvas = L.DomUtil.create('canvas', 'leaflet-time-dimension-layer leaflet-layer');
		this._ctx = canvas.getContext("2d");
		this._ctx.globalCompositeOperation = "lighter";

        const originProp = L.DomUtil.testProp(['transformOrigin', 'WebkitTransformOrigin', 'msTransformOrigin']);
        canvas.style[originProp] = '50% 50%';

        this._updateBounds();

        const animated = this._map.options.zoomAnimation && L.Browser.any3d;
        L.DomUtil.addClass(canvas, 'leaflet-zoom-' + (animated ? 'animated' : 'hide'));
        this._reset();
    },

    /**
      * Updates the width, height, and bounding coordinates of the layer's map
      *
      * @memberof CustomTimeDimension
      * @method _updateBounds
      */
    _updateBounds: function() {
        const size = this._map.getSize();
        this._canvas.width  = size.x;
        this._canvas.height = size.y;
        const bounds = this._map.getBounds();
        this._topLeft = {lat: bounds._northEast.lat, lng:bounds._southWest.lng};
        this._bottomRight = {lat: bounds._southWest.lat, lng:bounds._northEast.lng-360};
    },

    /**
      * Resizes the canvas to match the bounds of the current map
      *
      * @memberof CustomTimeDimension
      * @method _reset
      */
    _reset: function () {
        const topLeft = this._map.latLngToLayerPoint(this._topLeft);
        const bottomRight = this._map.latLngToLayerPoint(this._bottomRight);
        this._canvas.style.width = ""+bottomRight.x - topLeft.x+"px";
        this._canvas.style.height = ""+bottomRight.y - topLeft.y+"px";
        L.DomUtil.setPosition(this._canvas, topLeft);
    },

    /**
      * The method called when data for a new time is loaded
      *
      * @memberof CustomTimeDimension
      * @method _onNewTimeLoading
      */
    _onNewTimeLoading: function(ev) {
	this._getDataForTime(ev.time);
    },

    /**
      * Checks whether the map is currently displaying a given time
      *
      * @memberof CustomTimeDimension
      * @method isReady
      * @param {Number} time 
      *        The epoch time being checked
      * @return {boolean} 
      *         Whether the map is displaying the given time
      */
    isReady: function(time) {
        return (this._currentLoadedTime === time);
    },

    /**
      * The function called to load data for a certain time
      *
      * @memberof CustomTimeDimension
      * @method _getDataForTime
      * @param {Number} time 
      *        The epoch time being loaded
      */
    _getDataForTime: function(time) {
        if(Math.abs(this._lastQueryTime - new Date().getTime()) < 1000)
            return;
        this._lastQueryTime = new Date().getTime();

        this._updateBounds();
        this._reset();
        const endTime = time + moment.duration(this._timeDimension.options.period).asMilliseconds();
    	this._dataLoader.queryTime(time, endTime, this._ctx, this._map);

        this._currentLoadedTime = time;
        this.fire('timeload', {
            time: time
        });
    }
});

/**
* Returns a CustomTimeDimension object
*
* @function initialize
* @param {Object} options 
*        The options for the leaflet TimeDimension
* @param {Object} dataloader
*        The object responsible for loading the data that will be displayed
* @return {CustomTimeDimension} 
*         A CustomTimeDimension object
*/
L.timeDimension.layer.CustomTimeDimension = function(options, dataLoader) {
    return new L.TimeDimension.Layer.CustomTimeDimension(options, dataLoader);
};
