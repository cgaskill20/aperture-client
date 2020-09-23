/**
 * @fileoverview gRPC-Web generated client stub for sustain
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.sustain = require('./sustain_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.sustain.SustainClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.sustain.SustainPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sustain.CensusRequest,
 *   !proto.sustain.CensusResponse>}
 */
const methodDescriptor_Sustain_CensusQuery = new grpc.web.MethodDescriptor(
  '/sustain.Sustain/CensusQuery',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.sustain.CensusRequest,
  proto.sustain.CensusResponse,
  /**
   * @param {!proto.sustain.CensusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sustain.CensusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sustain.CensusRequest,
 *   !proto.sustain.CensusResponse>}
 */
const methodInfo_Sustain_CensusQuery = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sustain.CensusResponse,
  /**
   * @param {!proto.sustain.CensusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sustain.CensusResponse.deserializeBinary
);


/**
 * @param {!proto.sustain.CensusRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sustain.CensusResponse>}
 *     The XHR Node Readable Stream
 */
proto.sustain.SustainClient.prototype.censusQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sustain.Sustain/CensusQuery',
      request,
      metadata || {},
      methodDescriptor_Sustain_CensusQuery);
};


/**
 * @param {!proto.sustain.CensusRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sustain.CensusResponse>}
 *     The XHR Node Readable Stream
 */
proto.sustain.SustainPromiseClient.prototype.censusQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sustain.Sustain/CensusQuery',
      request,
      metadata || {},
      methodDescriptor_Sustain_CensusQuery);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sustain.OsmRequest,
 *   !proto.sustain.OsmResponse>}
 */
const methodDescriptor_Sustain_OsmQuery = new grpc.web.MethodDescriptor(
  '/sustain.Sustain/OsmQuery',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.sustain.OsmRequest,
  proto.sustain.OsmResponse,
  /**
   * @param {!proto.sustain.OsmRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sustain.OsmResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sustain.OsmRequest,
 *   !proto.sustain.OsmResponse>}
 */
const methodInfo_Sustain_OsmQuery = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sustain.OsmResponse,
  /**
   * @param {!proto.sustain.OsmRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sustain.OsmResponse.deserializeBinary
);


/**
 * @param {!proto.sustain.OsmRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sustain.OsmResponse>}
 *     The XHR Node Readable Stream
 */
proto.sustain.SustainClient.prototype.osmQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sustain.Sustain/OsmQuery',
      request,
      metadata || {},
      methodDescriptor_Sustain_OsmQuery);
};


/**
 * @param {!proto.sustain.OsmRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sustain.OsmResponse>}
 *     The XHR Node Readable Stream
 */
proto.sustain.SustainPromiseClient.prototype.osmQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sustain.Sustain/OsmQuery',
      request,
      metadata || {},
      methodDescriptor_Sustain_OsmQuery);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sustain.DatasetRequest,
 *   !proto.sustain.DatasetResponse>}
 */
const methodDescriptor_Sustain_DatasetQuery = new grpc.web.MethodDescriptor(
  '/sustain.Sustain/DatasetQuery',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.sustain.DatasetRequest,
  proto.sustain.DatasetResponse,
  /**
   * @param {!proto.sustain.DatasetRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sustain.DatasetResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sustain.DatasetRequest,
 *   !proto.sustain.DatasetResponse>}
 */
const methodInfo_Sustain_DatasetQuery = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sustain.DatasetResponse,
  /**
   * @param {!proto.sustain.DatasetRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sustain.DatasetResponse.deserializeBinary
);


/**
 * @param {!proto.sustain.DatasetRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sustain.DatasetResponse>}
 *     The XHR Node Readable Stream
 */
proto.sustain.SustainClient.prototype.datasetQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sustain.Sustain/DatasetQuery',
      request,
      metadata || {},
      methodDescriptor_Sustain_DatasetQuery);
};


/**
 * @param {!proto.sustain.DatasetRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sustain.DatasetResponse>}
 *     The XHR Node Readable Stream
 */
proto.sustain.SustainPromiseClient.prototype.datasetQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sustain.Sustain/DatasetQuery',
      request,
      metadata || {},
      methodDescriptor_Sustain_DatasetQuery);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sustain.TargetedCensusRequest,
 *   !proto.sustain.TargetedCensusResponse>}
 */
const methodDescriptor_Sustain_ExecuteTargetedCensusQuery = new grpc.web.MethodDescriptor(
  '/sustain.Sustain/ExecuteTargetedCensusQuery',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.sustain.TargetedCensusRequest,
  proto.sustain.TargetedCensusResponse,
  /**
   * @param {!proto.sustain.TargetedCensusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sustain.TargetedCensusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sustain.TargetedCensusRequest,
 *   !proto.sustain.TargetedCensusResponse>}
 */
const methodInfo_Sustain_ExecuteTargetedCensusQuery = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sustain.TargetedCensusResponse,
  /**
   * @param {!proto.sustain.TargetedCensusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sustain.TargetedCensusResponse.deserializeBinary
);


/**
 * @param {!proto.sustain.TargetedCensusRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sustain.TargetedCensusResponse>}
 *     The XHR Node Readable Stream
 */
proto.sustain.SustainClient.prototype.executeTargetedCensusQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sustain.Sustain/ExecuteTargetedCensusQuery',
      request,
      metadata || {},
      methodDescriptor_Sustain_ExecuteTargetedCensusQuery);
};


/**
 * @param {!proto.sustain.TargetedCensusRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sustain.TargetedCensusResponse>}
 *     The XHR Node Readable Stream
 */
proto.sustain.SustainPromiseClient.prototype.executeTargetedCensusQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sustain.Sustain/ExecuteTargetedCensusQuery',
      request,
      metadata || {},
      methodDescriptor_Sustain_ExecuteTargetedCensusQuery);
};


module.exports = proto.sustain;

