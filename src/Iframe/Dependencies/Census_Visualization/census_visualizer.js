
/**
 * @namespace Census_Visualizer
 * @file Responsible for querying census data and drawing it as polygons on a leaflet map
 * @author Kevin Bruhwiler, Daniel Reynolds
 * @dependencies turf.js
 */

const Census_Visualizer = {

  /**
    * Initializes the Census_Visualizer object
    *
    * @memberof Census_Visualizer
    * @method initialize
    */
  initialize: function () {
    this._grpcQuerier = grpc_querier();
    this._sustainQuerier = sustain_querier();
    this._percentageToColor = {
      0.0: [0, 0, 255],
      0.5: [0, 255, 0],
      1.0: [255, 0, 0]
    };
    this.markers = [];
    this.featureMap = {
      "Total Population": 0, "Avg. Household Income": 1,
      "Population by Age": 2, "Median Age": 3, "No. Below Poverty Line": 4, "Demographics": 5
    };
    this.propertyMap = {
      0: "2010_total_population", 1: "2010_median_household_income",
      2: "2010_population_by_age", 3: "2010_median_age", 4: "2010_poverty", 5: "2010_race"
    };
    this.ranges = { //this is temporary until we can get the dataset catalog queried
      0: [1, 10000],
      1: [10000, 200000],
      2: [0, 0], //this data doesnt work so no range yet
      3: [0, 0], //this data doesnt work so no range yet
      4: [0, 0], //this data doesnt work so no range yet
      5: [1, 10] //not sure how to use a range on this data
    }
    this.featureName = "";
    this.feature = -1;
    this.layers = [];
    this.heat_layers = [];

    this.svi_flood_highway_layers = [];
    this.svi_flood_highway_streams = [];


    this.streams = [];
  },

  /**
    * Sets the current census feature being displayed
    *
    * @memberof Census_Visualizer
    * @method setFeature
    * @param {string} f 
    *        The name of the feature being displayed
    */
  setFeature: function (f) {
    this.feature = this.featureMap[f];
    this.featureName = f;
    RenderInfrastructure.removeSpecifiedLayersFromMap(this.layers);
  },

  clearAll: function () {
    this.clearHeat();
    this.clearSVIFloodHighway();
  },

  /**
    * Clears all census layers from the map
    *
    * @memberof Census_Visualizer
    * @method clearMap
    */
  clearHeat: function () {
    RenderInfrastructure.removeSpecifiedLayersFromMap(this.heat_layers);
  },

  clearSVIFloodHighway: function () {
    RenderInfrastructure.removeSpecifiedLayersFromMap(this.svi_flood_highway_layers);
    this.svi_flood_highway_layers = [];
    this.sviPolys = {};
    this.svi_flood_highway_streams.forEach(s => s.cancel());
    this.svi_flood_highway_streams = [];
  },

  /**
    * Converts an array representing RGBA values into a string
    *
    * @memberof Census_Visualizer
    * @method _rgbaToString
    * @param {Array.<Number>} rgba 
    *        A length four array in RGBA order
    * @return {string} 
    *         An rgba string in CSS format
    */
  _rgbaToString: function (rgba) {
    return "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + rgba[3] + ")";
  },

  /**
    * Gets an R, G, or B color value based on the current _percentageToColor object
    *
    * @memberof Census_Visualizer
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
  _getColorValue: function (bounds, pcts, idx) {
    return this._percentageToColor[bounds[0]][idx] * pcts[0] + this._percentageToColor[bounds[1]][idx] * pcts[1];
  },

  /**
    * Gets an RGBA CSS string for the given percentage and alpha value
    *
    * @memberof Census_Visualizer
    * @method _getColorForPercentage
    * @param {Number} pct 
    *        The percentage value being converted into a color
    * @param {Number} alpha 
    *        The alpha value for the RGBA string
    * @return {string} 
    *         An rgba string in CSS format
    */
  _getColorForPercentage: function (pct, alpha) {
    if (pct === 0) {
      pct += 0.00001;
    } else if (pct % 0.5 === 0) {
      pct -= 0.00001;
    }
    const lower = 0.5 * (Math.floor(Math.abs(pct / 0.5)));
    const upper = 0.5 * (Math.ceil(Math.abs(pct / 0.5)));
    const rangePct = (pct - lower) / (upper - lower);
    const pctLower = 1 - rangePct;
    const pctUpper = rangePct;
    const r = Math.floor(this._getColorValue([lower, upper], [pctLower, pctUpper], 0));
    const g = Math.floor(this._getColorValue([lower, upper], [pctLower, pctUpper], 1));
    const b = Math.floor(this._getColorValue([lower, upper], [pctLower, pctUpper], 2));
    return this._rgbaToString([r, g, b, alpha]);
  },

  /**
    * Converts a geojson polygon from lng/lat format to lat/lng format
    *
    * @memberof Census_Visualizer
    * @method _reverseLatLngPolgon
    * @param {Array.<Array.<Number>>} poly 
    *        The polygon being converted
    * @return {Array.<Array.<Number>>} 
    *         The reformatted polygon
    */
  _reverseLatLngPolgon: function (poly) {
    const out = [];
    for (p in poly[0][0]) {
      out.push([poly[0][0][p][1], poly[0][0][p][0]])
    }
    return out;
  },

  /**
    * Gets the minimum and maximum values from the returned gRPC query
    *
    * @memberof Census_Visualizer
    * @method _getMinAndMax
    * @param {Array.<Object>} responseList 
    *        The response returned by the gRPC query
    * @return {Array.<Number>} 
    *         An array of length two containing the minimum and maximum values in the response
    */
  _getMinAndMax: function (responseList) {
    let min = Number.MAX_VALUE;
    let max = 0;
    for (r in responseList) {
      try {
        const data = JSON.parse(responseList[r].getData());
        const num = data[this.propertyMap[this.feature]];
        min = Math.min(min, num)
        max = Math.max(max, num)
      } catch (err) {
        console.log(err)
      }
    }
    return [min, max];
  },

  /**
    * Normalizes a value between the given minimum and maximum values
    *
    * @memberof Census_Visualizer
    * @method _normalize
    * @param {Number} val 
    *        The value being normalized
    * @param {Number} max 
    *        The maximum value
    * @param {Number} min 
    *        The minimum value
    * @return {Number} 
    *         A value between 0 and 1
    */
  _normalize: function (val, max, min) {
    return (val - min) / (max - min);
  },

  sviPolys: {},

  updateSVIFloodzoneDist: function (map, constraintsUpdated) {
    if (!document.getElementById("svi_floodzone_highway").checked) {
      return;
    }

    if (constraintsUpdated) {
      this.clearSVIFloodHighway();
    }

    const b = map.wrapLatLngBounds(map.getBounds());
    const barray = [[b._southWest.lng, b._southWest.lat], [b._southWest.lng, b._northEast.lat],
    [b._northEast.lng, b._northEast.lat], [b._northEast.lng, b._southWest.lat],
    [b._southWest.lng, b._southWest.lat]];

    const q = [{ "$match": { geometry: { "$geoIntersects": { "$geometry": { type: "Polygon", coordinates: [barray] } } } } }];

    const stream = this._sustainQuerier.getStreamForQuery("lattice-46", 27017, "tract_geo", JSON.stringify(q));
    this.svi_flood_highway_streams.push(stream);
    let GISJOINS = [];
    let polys = {};

    stream.on('data', function (r) {
      const data = JSON.parse(r.getData());
      if (this.sviPolys[data.properties.GISJOIN]) {
        return; //dont re-query!
      }
      else {
        this.sviPolys[data.properties.GISJOIN] = "e";
      }
      GISJOINS.push(data.properties.GISJOIN);
      polys[data.properties.GISJOIN] = data;
      if (GISJOINS.length > 20) {
        this._querySVITracts(GISJOINS, polys);
        GISJOINS = [];
      }
    }.bind(this));

    stream.on('end', function (end) {
      this._querySVITracts(GISJOINS, polys);
      this.svi_flood_highway_streams.splice(this.svi_flood_highway_streams.indexOf(stream), 1);
    }.bind(this));
  },


  _querySVITracts: function (GISJOINS, polys) {
    const firstMatch = "GISJOIN"
    const firstQuery = {};
    firstQuery[firstMatch] = { "$in": GISJOINS };

    const secondMatch = "svi_mean"
    const secondQuery = {};
    secondQuery[secondMatch] = { "$gte": Number(document.getElementById("svi_floodzone_highway_svi").noUiSlider.get()[0]), "$lt": Number(document.getElementById("svi_floodzone_highway_svi").noUiSlider.get()[1]) };

    const q = [
      { "$match": firstQuery },
      { "$match": secondQuery }
    ];

    const stream = this._sustainQuerier.getStreamForQuery("lattice-46", 27017, "svi", JSON.stringify(q));
    this.svi_flood_highway_streams.push(stream);

    let SVI_filtered_GISJOINS = [];
    stream.on('data', function (r) {
      const data = JSON.parse(r.getData());
      polys[data.GISJOIN].properties.svi_mean = data.svi_mean;;
      SVI_filtered_GISJOINS.push(data.GISJOIN);
    }.bind(this));
    stream.on('end', function (end) {
      this._queryFloodzones(SVI_filtered_GISJOINS, polys);
      this.svi_flood_highway_streams.splice(this.svi_flood_highway_streams.indexOf(stream), 1);
    }.bind(this));
  },

  _queryFloodzones: function (GISJOINS, polys) {
    let floodzonesGISJOINS = [];
    for (let i = 0; i < GISJOINS.length; i++) {
      const barray = polys[GISJOINS[i]]["geometry"]["coordinates"][0][0];
      const q = [{ "$match": { geometry: { "$geoIntersects": { "$geometry": { type: "Polygon", coordinates: [barray] } } } } }];

      const stream = this._sustainQuerier.getStreamForQuery("lattice-46", 27017, "flood_zones_geo", JSON.stringify(q));
      this.svi_flood_highway_streams.push(stream);

      stream.on('data', function (r) {
        try {
          let data = JSON.parse(r.getData());
          let poly1 = turf.polygon([barray]);
          let poly2 = turf.polygon(data["geometry"]["coordinates"]);
          let zone = turf.intersect(poly1, poly2);
          zone.properties.GISJOIN = GISJOINS[i];
          zone.properties.svi_mean = polys[GISJOINS[i]].properties.svi_mean;
          if (data.properties.FLD_ZONE === "AREA NOT INCLUDED" || data.properties.FLD_ZONE === "D")
            throw "bad flood zone"
          zone.properties.FLD_ZONE = data.properties.FLD_ZONE;
          zone.id = 'joint_fld_svi_' + Math.random().toString(36).substr(2, 9);
          //floodzones.push(zone);
          // if (floodzones.length > 20) {
          //   this._queryHighways(floodzones);
          //   floodzones = [];
          // }
          //this.gDraw(zone,this.svi_flood_highway_layers,"SVI + Floodzone");
          floodzonesGISJOINS.push(zone);
          if(floodzonesGISJOINS.length > 20){
            this._queryHighways(floodzonesGISJOINS);
            floodzonesGISJOINS = [];
          }
        }
        catch { }
      }.bind(this));
      stream.on('end', function (end) {
        this.svi_flood_highway_streams.splice(this.svi_flood_highway_streams.indexOf(stream), 1);
        if(i === GISJOINS.length - 1){
          this._queryHighways(floodzonesGISJOINS);
        }
        //this._queryHighways(floodzones);
      }.bind(this));
    }
  },

  _queryHighways: function (GISJOINS) {
    let filteredGISJOINS = [];
    for (let i = 0; i < GISJOINS.length; i++) {
      let pos = Util.getLatLngFromGeoJsonFeature(GISJOINS[i]);
      //console.log(pos);

      const q = [{
        "$match": {
          geometry: { "$geoWithin": { "$centerSphere": [[pos.lng, pos.lat], Number(document.getElementById("svi_floodzone_highway_Highway_dist").noUiSlider.get()) / 3963.2] } },
          "$or": [
            {
              "properties.highway": "motorway"
            },
            {
              "properties.highway": "trunk"
            },
            {
              "properties.highway": "primary"
            }
          ]
        }
      }];

      const stream = this._sustainQuerier.getStreamForQuery("lattice-46", 27017, "osm_lines_geo", JSON.stringify(q));
      this.svi_flood_highway_streams.push(stream);


      let flag = false;
      let runningCount = 0;
      stream.on('data', function (r) {
        runningCount++;
        stream.cancel();
        if (!flag) {
          flag = true;
        }
      }.bind(this));
      stream.on('end', function (end) {
        this.svi_flood_highway_streams.splice(this.svi_flood_highway_streams.indexOf(stream), 1);
        if (runningCount === 0) {
          this.gDraw(GISJOINS[i],this.svi_flood_highway_layers,"SVI + Floodzone + Highway");
          //filteredGISJOINS.push(GISJOINS[i]);
          if (filteredGISJOINS.length > 20 || i === GISJOINS.length - 1){

            //filteredGISJOINS = [];
          }
        }
        // if(runningCount === 0){
        //   console.log("render");
        //   let newLayers = RenderInfrastructure.renderGeoJson(polys[i], false, {
        //     "SVI_&_Floodzones": {
        //       "color": "#FF0000",
        //       "identityField": "GISJOIN"
        //     }
        //   });
        //   this.svi_flood_highway_layers = this.svi_flood_highway_layers.concat(newLayers);
        //}
        //this.svi_flood_highway_streams.splice(this.svi_flood_highway_streams.indexOf(stream), 1);
      }.bind(this));
    }
  },

  gDraw: function(poly,arrRef,name){
    let newLayers = RenderInfrastructure.renderGeoJson(poly, false, {
      name: {
        "color": "#FF0000",
        "identityField": "GISJOIN",
        "noBorder":true
      }
    });
    this.svi_flood_highway_layers = this.svi_flood_highway_layers.concat(newLayers);
    //console.log(this.svi_flood_highway_layers);
  },

  updateAgeAQIDistanceToHospital: function (map, constraintsUpdated) {
    if (!document.getElementById("age_aqi_hospitals").checked) {
      return;
    }

    const b = map.wrapLatLngBounds(map.getBounds());
    const barray = [[b._southWest.lng, b._southWest.lat], [b._southWest.lng, b._northEast.lat],
    [b._northEast.lng, b._northEast.lat], [b._northEast.lng, b._southWest.lat],
    [b._southWest.lng, b._southWest.lat]];

    const q = [{ "$match": { geometry: { "$geoIntersects": { "$geometry": { type: "Polygon", coordinates: [barray] } } } } }];

    const stream = this._sustainQuerier.getStreamForQuery("lattice-46", 27017, "tract_geo", JSON.stringify(q));

    let GISJOINS = [];
    let polys = {};

    stream.on('data', function (r) {
      const data = JSON.parse(r.getData());
      GISJOINS.push(data.properties.GISJOIN);
      polys[data.properties.GISJOIN] = data;
      if (GISJOINS.length > 20) {
        //this._queryMatchingValues(GISJOINS, polys);
        //GISJOINS = [];
      }
    }.bind(this));

    stream.on('end', function (end) {
      //this._querySVITracts(GISJOINS, polys);
    }.bind(this));
  },


  updateFutureHeat: function (map, constraintsUpdated) {
    if (!document.getElementById("Heat_Waves").checked) {
      return;
    }

    this.streams.forEach(s => s.cancel());

    if (this.heat_layers.length > 0 && constraintsUpdated) {
      this.clearHeat();
      this.heat_layers = [];
    }

    const b = map.wrapLatLngBounds(map.getBounds());
    const barray = [[b._southWest.lng, b._southWest.lat], [b._southWest.lng, b._northEast.lat],
    [b._northEast.lng, b._northEast.lat], [b._northEast.lng, b._southWest.lat],
    [b._southWest.lng, b._southWest.lat]];

    const q = [{ "$match": { geometry: { "$geoIntersects": { "$geometry": { type: "Polygon", coordinates: [barray] } } } } }];

    const stream = this._sustainQuerier.getStreamForQuery("lattice-46", 27017, "county_geo", JSON.stringify(q));

    this.streams.push(stream);

    const GISJOINS = [];
    const polys = {};

    stream.on('data', function (r) {
      const data = JSON.parse(r.getData());
      GISJOINS.push(data.properties.GISJOIN);
      polys[data.properties.GISJOIN] = data;
      if (GISJOINS.length > 20) {
        this._queryMatchingValues(GISJOINS, polys);
        GISJOINS.length = 0;
      }
    }.bind(this));

    stream.on('end', function (end) {
      this._queryMatchingValues(GISJOINS, polys);
    }.bind(this));
  },

  _queryMatchingValues: function (GISJOINS, polys) {
    const firstMatch = "GISJOIN"
    const firstQuery = {};
    firstQuery[firstMatch] = { "$in": GISJOINS };

    const secondMatch = "CDF." + Number(document.getElementById("Heat_Waves_length").noUiSlider.get())
    const secondQuery = {};
    secondQuery[secondMatch] = { "$exists": true };

    const thirdMatch = "temp"
    const thirdQuery = {};
    thirdQuery[thirdMatch] = { "$gte": Number(document.getElementById("Heat_Waves_temperature").noUiSlider.get()) };


    const fourthMatch = "year"
    const fourthQuery = {};
    fourthQuery[fourthMatch] = { "$gte": Number(document.getElementById("Heat_Waves_years").noUiSlider.get()[0]), "$lt": Number(document.getElementById("Heat_Waves_years").noUiSlider.get()[1]) };

    const q = [{ "$match": firstQuery },
    { "$match": secondQuery },
    { "$match": thirdQuery },
    { "$match": fourthQuery }
    ];

    const stream = this._sustainQuerier.getStreamForQuery("lattice-46", 27017, "future_heat", JSON.stringify(q));

    this.streams.push(stream);

    const properties = { "Heat Wave Length": document.getElementById("Heat_Waves_length").noUiSlider.get(), "Heat Wave Lower Bound": document.getElementById("Heat_Waves_temperature").noUiSlider.get() }

    stream.on('data', function (r) {
      const data = JSON.parse(r.getData());
      const poly = polys[data.GISJOIN];
      this.generalizedDraw({ ...data, ...poly });
    }.bind(this));
  },

  generalizedDraw: function (data, properties) {
    if (properties !== null)
      data["properties"] = { ...data["properties"], ...properties };

    if (!document.getElementById("Heat_Waves").checked)
      return;

    let newLayers = RenderInfrastructure.renderGeoJson(data, false, {
      "census": {
        "color": "#FF0000",
        "identityField": "GISJOIN"
      }
    });
    Census_Visualizer.heat_layers = Census_Visualizer.heat_layers.concat(newLayers);
  },

  /**
    * Updates the Census visualization with the current feature
    *
    * @memberof Census_Visualizer
    * @method updateViz
    * @param {Object} map 
    *        The leaflet map being updated
    */
  updateViz: function (map) {
    const draw = function (response) {
      let geo = JSON.parse(response.getResponsegeojson());
      const data = JSON.parse(response.getData());
      geo.properties = data;
      let newLayers = RenderInfrastructure.renderGeoJson(geo, false, {
        "census": {
          "color": Census_Visualizer._getColorForPercentage(Census_Visualizer._normalize(data[Census_Visualizer.propertyMap[Census_Visualizer.feature]], Census_Visualizer.ranges[Census_Visualizer.feature][0], Census_Visualizer.ranges[Census_Visualizer.feature][1]), 0.5),
          "identityField": "GISJOIN"
        }
      });
      Census_Visualizer.layers = Census_Visualizer.layers.concat(newLayers);
      // // const responseList = response.getSinglespatialresponseList();
      // // console.log(responseList);
      // // const vals = this._getMinAndMax(responseList);
      // // const min = vals[1];
      // // const max = vals[0];
      // var polygon = L.polygon(Census_Visualizer._reverseLatLngPolgon(geo.geometry.coordinates), {
      //   color: "red"
      //     //this._getColorForPercentage(this._normalize(data[this.propertyMap[this.feature]], min, max), 0.5)
      // }).addTo(map);
      // polygon.bindTooltip("2010 " +  Census_Visualizer.featureName + " of: " + data[Census_Visualizer.propertyMap[Census_Visualizer.feature]]);
      // polygon.GISJOIN = data.GISJOIN;
      // Census_Visualizer.markers.push(polygon);
    }

    if (this.featureName === "")
      return;
    const b = map.wrapLatLngBounds(map.getBounds());
    const stream = this._grpcQuerier.getCensusData(2, b._southWest, b._northEast, this.feature);
    stream.on('data', function (r) {
      //console.log(JSON.stringify(response));
      draw(r);
    });
    stream.on('status', function (status) {
      //console.log(status.code, status.details, status.metadata);
    });
    stream.on('end', function (end) {

    });
  },
};

/**
  * Returns a census_visualizer object
  *
  * @function census_visualizer
  * @return {Census_Visualizer} 
  *         A census_visualizer object
  */
census_visualizer = function () {
  const censusVisualizer = Census_Visualizer;
  censusVisualizer.initialize();
  return censusVisualizer;
};

try {
  module.exports = {
    census_visualizer: census_visualizer
  }
} catch (e) { }
