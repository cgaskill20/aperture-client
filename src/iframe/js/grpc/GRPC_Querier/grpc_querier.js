const {Query, CompoundRequest, JsonModelRequest, DirectRequest, JsonSlidingWindowRequest} = require("./sustain_pb.js")
const {SustainClient, JsonProxyClient} = require('./sustain_grpc_web_pb.js');

/**
 * @namespace SustainQuerier
 * @file Object used for performing gRPC queries
 * @author Kevin Bruhwiler & Daniel Reynolds
 */
SustainQuerier = {
    /**
      * Initialize the SustainQuerier object and service
      *
      * @memberof SustainQuerier
      * @method initialize
      */
    initialize: function () {
        //const LATTICE_NUM = globalThis.latticeNum;
        const LATTICE_PORT = 31415;
        const LATTICE_URL = `https://sustain.cs.colostate.edu:31415`;
        this.service = new SustainClient(LATTICE_URL, "sustainServer");
        this.modelService = new JsonProxyClient(LATTICE_URL, "sustainServer");
        return this;
    },

    /**
      * Creates a gRPC stream for the given query
      *
      * @memberof SustainQuerier
      * @method getStreamForQuery
      * @param {string} host
      *        The name of the machine hosting the queried dataset
      * @param {Number} port
      *        The port of the machine hosting the queried dataset
      * @param {string} collection
      *        The name of the collection being queried
      * @param {string} query
      *        A stringified mongodb query, in JSON format
      * @return {Object}
      *         The gRPC query stream
      */
    getStreamForQuery: function (collection, query) {
        const request = new DirectRequest();
        request.setCollection(collection);
        request.setQuery(query);
        return this.service.directQuery(request, {});
    },

    /**
      * Creates a gRPC query on a single collection
      *
      * @memberof SustainQuerier
      * @method makeQuery
      * @param {string} host
      *        The name of the machine hosting the queried dataset
      * @param {Number} port
      *        The port of the machine hosting the queried dataset
      * @param {string} collection
      *        The name of the collection being queried
      * @param {string} query
      *        A stringified mongodb query, in JSON format
      * @return {Object}
      *         The gRPC query object
      */
    makeQuery: function (host, port, collection, query) {
        const q = new Query();
        q.setHost(host);
        q.setPort(port);
        q.setCollection(collection);
        q.setQuery(query);
        return q;
    },

    /**
     * Creates a compound query out of two queries - only one "first" and one "second" query can be defined
     * If both are defined, will default to using only the basic queries
     *
     * @memberof SustainQuerier
     * @method makeCompoundQuery
     * @param {Object} firstQuery
     *        The first query object, if present
     * @param {Object} firstCompoundRequest
     *        The first compound request object, if present
     * @param {Object} secondQuery
     *        The second query object, if present
     * @param {Object} secondCompoundRequest
     *        The second compound request object, if present
     * @param {Number} join
     *        The type of join being used (number corresponding the proto definition)
     * @return {Object}
     *         The compound request object
     */
    makeCompoundQuery: function (firstQuery, firstCompoundRequest, secondQuery, secondCompoundRequest, join=0){
        const request = new CompoundRequest();

        if(firstQuery != null)
            request.setFirstQuery(firstQuery);
        else
            request.setFirstCompoundRequest(firstCompoundRequest);

        request.setJoin(join);

        if(secondQuery != null)
            request.setSecondQuery(secondQuery);
        else
            request.setSecondCompoundRequest(firstSecondRequest);

        return request;
	},

    /**
     * Executes a compound request - returns the stream of results
     *
     * @memberof SustainQuerier
     * @method makeCompoundQuery
     * @param {Object} request
     *         The compound request
     * @return {Object}
     *         The gRPC query object
     */
    executeCompoundQuery: function (request) {
        return this.service.compoundQuery(request, {});
    },
    
    executeModelQuery: function (query) {
        const request = new JsonModelRequest();
        request.setJson(query);
        return this.modelService.modelQuery(request, {});
	},

    executeSlidingWindowQuery: function (query) {
        const request = new JsonSlidingWindowRequest();
        request.setJson(query);
        return this.modelService.slidingWindowQuery(request, {});
    }
};

/**
  * returns a sustainQuerier object
  *
  * @function sustain_querier
  * @return {SustainQuerier} 
  *         The sustainQuerier object
  */
sustain_querier = function() {
    const sustainQuerier = SustainQuerier;
    sustainQuerier.initialize();
    return sustainQuerier;
};

try{
    module.exports = {
        sustain_querier: sustain_querier
    }
} catch(e) { }
