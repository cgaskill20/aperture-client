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
proto.sustain.JsonProxyClient =
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
proto.sustain.JsonProxyPromiseClient =
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
 *   !proto.sustain.JsonModelRequest,
 *   !proto.sustain.JsonModelResponse>}
 */
const methodDescriptor_JsonProxy_ModelQuery = new grpc.web.MethodDescriptor(
  '/sustain.JsonProxy/ModelQuery',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.sustain.JsonModelRequest,
  proto.sustain.JsonModelResponse,
  /**
   * @param {!proto.sustain.JsonModelRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sustain.JsonModelResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sustain.JsonModelRequest,
 *   !proto.sustain.JsonModelResponse>}
 */
const methodInfo_JsonProxy_ModelQuery = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sustain.JsonModelResponse,
  /**
   * @param {!proto.sustain.JsonModelRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sustain.JsonModelResponse.deserializeBinary
);


/**
 * @param {!proto.sustain.JsonModelRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sustain.JsonModelResponse>}
 *     The XHR Node Readable Stream
 */
proto.sustain.JsonProxyClient.prototype.modelQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sustain.JsonProxy/ModelQuery',
      request,
      metadata || {},
      methodDescriptor_JsonProxy_ModelQuery);
};


/**
 * @param {!proto.sustain.JsonModelRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sustain.JsonModelResponse>}
 *     The XHR Node Readable Stream
 */
proto.sustain.JsonProxyPromiseClient.prototype.modelQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sustain.JsonProxy/ModelQuery',
      request,
      metadata || {},
      methodDescriptor_JsonProxy_ModelQuery);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sustain.JsonSlidingWindowRequest,
 *   !proto.sustain.JsonSlidingWindowResponse>}
 */
const methodDescriptor_JsonProxy_SlidingWindowQuery = new grpc.web.MethodDescriptor(
  '/sustain.JsonProxy/SlidingWindowQuery',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.sustain.JsonSlidingWindowRequest,
  proto.sustain.JsonSlidingWindowResponse,
  /**
   * @param {!proto.sustain.JsonSlidingWindowRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sustain.JsonSlidingWindowResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sustain.JsonSlidingWindowRequest,
 *   !proto.sustain.JsonSlidingWindowResponse>}
 */
const methodInfo_JsonProxy_SlidingWindowQuery = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sustain.JsonSlidingWindowResponse,
  /**
   * @param {!proto.sustain.JsonSlidingWindowRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sustain.JsonSlidingWindowResponse.deserializeBinary
);


/**
 * @param {!proto.sustain.JsonSlidingWindowRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sustain.JsonSlidingWindowResponse>}
 *     The XHR Node Readable Stream
 */
proto.sustain.JsonProxyClient.prototype.slidingWindowQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sustain.JsonProxy/SlidingWindowQuery',
      request,
      metadata || {},
      methodDescriptor_JsonProxy_SlidingWindowQuery);
};


/**
 * @param {!proto.sustain.JsonSlidingWindowRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sustain.JsonSlidingWindowResponse>}
 *     The XHR Node Readable Stream
 */
proto.sustain.JsonProxyPromiseClient.prototype.slidingWindowQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sustain.JsonProxy/SlidingWindowQuery',
      request,
      metadata || {},
      methodDescriptor_JsonProxy_SlidingWindowQuery);
};


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
 *   !proto.sustain.CompoundRequest,
 *   !proto.sustain.CompoundResponse>}
 */
const methodDescriptor_Sustain_CompoundQuery = new grpc.web.MethodDescriptor(
  '/sustain.Sustain/CompoundQuery',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.sustain.CompoundRequest,
  proto.sustain.CompoundResponse,
  /**
   * @param {!proto.sustain.CompoundRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sustain.CompoundResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sustain.CompoundRequest,
 *   !proto.sustain.CompoundResponse>}
 */
const methodInfo_Sustain_CompoundQuery = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sustain.CompoundResponse,
  /**
   * @param {!proto.sustain.CompoundRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sustain.CompoundResponse.deserializeBinary
);


/**
 * @param {!proto.sustain.CompoundRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sustain.CompoundResponse>}
 *     The XHR Node Readable Stream
 */
proto.sustain.SustainClient.prototype.compoundQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sustain.Sustain/CompoundQuery',
      request,
      metadata || {},
      methodDescriptor_Sustain_CompoundQuery);
};


/**
 * @param {!proto.sustain.CompoundRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sustain.CompoundResponse>}
 *     The XHR Node Readable Stream
 */
proto.sustain.SustainPromiseClient.prototype.compoundQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sustain.Sustain/CompoundQuery',
      request,
      metadata || {},
      methodDescriptor_Sustain_CompoundQuery);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sustain.CountRequest,
 *   !proto.sustain.CountResponse>}
 */
const methodDescriptor_Sustain_CountQuery = new grpc.web.MethodDescriptor(
  '/sustain.Sustain/CountQuery',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.sustain.CountRequest,
  proto.sustain.CountResponse,
  /**
   * @param {!proto.sustain.CountRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sustain.CountResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sustain.CountRequest,
 *   !proto.sustain.CountResponse>}
 */
const methodInfo_Sustain_CountQuery = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sustain.CountResponse,
  /**
   * @param {!proto.sustain.CountRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sustain.CountResponse.deserializeBinary
);


/**
 * @param {!proto.sustain.CountRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sustain.CountResponse>}
 *     The XHR Node Readable Stream
 */
proto.sustain.SustainClient.prototype.countQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sustain.Sustain/CountQuery',
      request,
      metadata || {},
      methodDescriptor_Sustain_CountQuery);
};


/**
 * @param {!proto.sustain.CountRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sustain.CountResponse>}
 *     The XHR Node Readable Stream
 */
proto.sustain.SustainPromiseClient.prototype.countQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sustain.Sustain/CountQuery',
      request,
      metadata || {},
      methodDescriptor_Sustain_CountQuery);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sustain.ModelRequest,
 *   !proto.sustain.ModelResponse>}
 */
const methodDescriptor_Sustain_ModelQuery = new grpc.web.MethodDescriptor(
  '/sustain.Sustain/ModelQuery',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.sustain.ModelRequest,
  proto.sustain.ModelResponse,
  /**
   * @param {!proto.sustain.ModelRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sustain.ModelResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sustain.ModelRequest,
 *   !proto.sustain.ModelResponse>}
 */
const methodInfo_Sustain_ModelQuery = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sustain.ModelResponse,
  /**
   * @param {!proto.sustain.ModelRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sustain.ModelResponse.deserializeBinary
);


/**
 * @param {!proto.sustain.ModelRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sustain.ModelResponse>}
 *     The XHR Node Readable Stream
 */
proto.sustain.SustainClient.prototype.modelQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sustain.Sustain/ModelQuery',
      request,
      metadata || {},
      methodDescriptor_Sustain_ModelQuery);
};


/**
 * @param {!proto.sustain.ModelRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sustain.ModelResponse>}
 *     The XHR Node Readable Stream
 */
proto.sustain.SustainPromiseClient.prototype.modelQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sustain.Sustain/ModelQuery',
      request,
      metadata || {},
      methodDescriptor_Sustain_ModelQuery);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sustain.DirectRequest,
 *   !proto.sustain.DirectResponse>}
 */
const methodDescriptor_Sustain_DirectQuery = new grpc.web.MethodDescriptor(
  '/sustain.Sustain/DirectQuery',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.sustain.DirectRequest,
  proto.sustain.DirectResponse,
  /**
   * @param {!proto.sustain.DirectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sustain.DirectResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sustain.DirectRequest,
 *   !proto.sustain.DirectResponse>}
 */
const methodInfo_Sustain_DirectQuery = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sustain.DirectResponse,
  /**
   * @param {!proto.sustain.DirectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sustain.DirectResponse.deserializeBinary
);


/**
 * @param {!proto.sustain.DirectRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sustain.DirectResponse>}
 *     The XHR Node Readable Stream
 */
proto.sustain.SustainClient.prototype.directQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sustain.Sustain/DirectQuery',
      request,
      metadata || {},
      methodDescriptor_Sustain_DirectQuery);
};


/**
 * @param {!proto.sustain.DirectRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sustain.DirectResponse>}
 *     The XHR Node Readable Stream
 */
proto.sustain.SustainPromiseClient.prototype.directQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sustain.Sustain/DirectQuery',
      request,
      metadata || {},
      methodDescriptor_Sustain_DirectQuery);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sustain.SlidingWindowRequest,
 *   !proto.sustain.SlidingWindowResponse>}
 */
const methodDescriptor_Sustain_SlidingWindowQuery = new grpc.web.MethodDescriptor(
  '/sustain.Sustain/SlidingWindowQuery',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.sustain.SlidingWindowRequest,
  proto.sustain.SlidingWindowResponse,
  /**
   * @param {!proto.sustain.SlidingWindowRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sustain.SlidingWindowResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sustain.SlidingWindowRequest,
 *   !proto.sustain.SlidingWindowResponse>}
 */
const methodInfo_Sustain_SlidingWindowQuery = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sustain.SlidingWindowResponse,
  /**
   * @param {!proto.sustain.SlidingWindowRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sustain.SlidingWindowResponse.deserializeBinary
);


/**
 * @param {!proto.sustain.SlidingWindowRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sustain.SlidingWindowResponse>}
 *     The XHR Node Readable Stream
 */
proto.sustain.SustainClient.prototype.slidingWindowQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sustain.Sustain/SlidingWindowQuery',
      request,
      metadata || {},
      methodDescriptor_Sustain_SlidingWindowQuery);
};


/**
 * @param {!proto.sustain.SlidingWindowRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sustain.SlidingWindowResponse>}
 *     The XHR Node Readable Stream
 */
proto.sustain.SustainPromiseClient.prototype.slidingWindowQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sustain.Sustain/SlidingWindowQuery',
      request,
      metadata || {},
      methodDescriptor_Sustain_SlidingWindowQuery);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sustain.DirectRequest,
 *   !proto.sustain.DirectResponse>}
 */
const methodDescriptor_Sustain_EchoQuery = new grpc.web.MethodDescriptor(
  '/sustain.Sustain/EchoQuery',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.sustain.DirectRequest,
  proto.sustain.DirectResponse,
  /**
   * @param {!proto.sustain.DirectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sustain.DirectResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sustain.DirectRequest,
 *   !proto.sustain.DirectResponse>}
 */
const methodInfo_Sustain_EchoQuery = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sustain.DirectResponse,
  /**
   * @param {!proto.sustain.DirectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sustain.DirectResponse.deserializeBinary
);


/**
 * @param {!proto.sustain.DirectRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sustain.DirectResponse>}
 *     The XHR Node Readable Stream
 */
proto.sustain.SustainClient.prototype.echoQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sustain.Sustain/EchoQuery',
      request,
      metadata || {},
      methodDescriptor_Sustain_EchoQuery);
};


/**
 * @param {!proto.sustain.DirectRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sustain.DirectResponse>}
 *     The XHR Node Readable Stream
 */
proto.sustain.SustainPromiseClient.prototype.echoQuery =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sustain.Sustain/EchoQuery',
      request,
      metadata || {},
      methodDescriptor_Sustain_EchoQuery);
};


module.exports = proto.sustain;

