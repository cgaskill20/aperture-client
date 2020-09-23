const { OsmRequest, DatasetRequest, CensusRequest } = require("./sustain_pb.js")
const { SustainClient } = require('./sustain_grpc_web_pb.js');

/**
 * @namespace Census_GRPCQuerier
 * @file Contains utilities for sending and recieving gRPC queries to a server containing census data
 * @author Kevin Bruhwiler, edited by Daniel Reynolds
*/

GRPCQuerier = {
  /**
    * Initializes the GRPCQuerier object
    *
    * @memberof Census_GRPCQuerier
    * @method initialize
    */
  initialize: function () {
    this.service = new SustainClient("http://lattice-2.cs.colostate.edu:9092", "sustainServer");
  },

  getOSMData: function (geojson, filters) {
    const request = new OsmRequest();
    request.setDataset(5); //all
    request.setSpatialop(1); //intersection
    request.setRequestgeojson(geojson);
    let reqParams = [];
    filters.forEach(filter => {
      const params = new OsmRequest.OsmRequestParam();
      params.setKey('properties.' + filter.key);
      params.setValue(filter.value);
      reqParams.push(params);
    });
    request.setRequestparamsList(reqParams);
    //params.set('properties.' + filter.key, filter.value);
    return this.service.osmQuery(request, {});
  },

  getDatasetData: function (dataset, geojson) {
    const request = new DatasetRequest();
    request.setDataset(dataset);
    request.setSpatialop(1);
    request.setRequestgeojson(geojson);
    request.clearRequestparamsMap();
    return this.service.datasetQuery(request, {});
  },

  /**
      * Converts the bounds of a rectangle into a geojson string
      *
      * @memberof Census_GRPCQuerier
      * @method _makeGeoJson
      * @param {Object} southwest 
      *        A lat/lng object identifying the southwest corner of the bounding box
      * @param {Object} northeast 
      *        A lat/lng object identifying the northeast corner of the bounding box
      * @return {string} 
      *         A geojson string representing the bounding polygon
      */
  _makeGeoJson: function (southwest, northeast) {
    const geo = { type: "Feature", properties: {} };
    const geometry = {
      type: "polygon", coordinates: [[
        [southwest.lng, southwest.lat],
        [southwest.lng, northeast.lat],
        [northeast.lng, northeast.lat],
        [northeast.lng, southwest.lat],
        [southwest.lng, southwest.lat]]]
    };
    geo.geometry = geometry;
    return JSON.stringify(geo);
  },

  /**
    * Converts the bounds of a rectangle into a geojson string
    *
    * @memberof Census_GRPCQuerier
    * @function getCensusData
    * @param {Number} resolution 
    *        The resolution of the census data being queried
    * @param {Object} southwest 
    *        A lat/lng object identifying the southwest corner of the bounding box
    * @param {Object} northeast 
    *        A lat/lng object identifying the northeast corner of the bounding box
    * @param {Callback} callback 
    *        The function called on the returned data
    * @param {Number} feature 
    *        The feature being queried
    * @return {string} 
    *         A geojson string representing the bounding polygon
    */
  getCensusData: function (resolution, southwest, northeast, feature) {
    const request = new CensusRequest();
    request.setCensusresolution(resolution); //tract
    request.setCensusfeature(feature); //median household income
    request.setSpatialop(1); //intersection
    request.setRequestgeojson(this._makeGeoJson(southwest, northeast));
    return this.service.censusQuery(request, {})
  }
};

/**
   * Returns a GRPCQuerier object
   *
   * @method grpc_querier
   * @return {Census_GRPCQuerier}
   *         A GRPCQuerier object
   */
grpc_querier = function () {
  const grpcQuerier = GRPCQuerier;
  grpcQuerier.initialize();
  return grpcQuerier;
};

try {
  module.exports = {
    grpc_querier: grpc_querier
  }
} catch (e) { }
