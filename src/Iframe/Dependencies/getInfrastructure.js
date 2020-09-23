//Author: Daniel Reynolds
//Purpose: Get osm nodes, ways, and relations, and then translate them onto a leaflet map
//Dependencies: Leaflet, osmtogeojson, jquery, Leaflet.markerCluster
const FLYTOOPTIONS = { //for clicking on icons
    easeLinearity: 0.4,
    duration: 0.25,
    maxZoom: 17
};
const NSEW = {
    ns: 0,
    ew: 1
}
const ATTRIBUTE = { //attribute enums
    icon: 'icon',
    color: 'color'
}
const FEATURETYPE = { //attribute enums
    point: 0,
    lineString: 1,
    polygon: 2
}
const DEFAULTOPTIONS = {
    overpassInterpreter: 'https://overpass.kumi.systems/api/interpreter',
    timeout: 30,
    maxElements: 5000,
    maxLayers: 10,
    minRenderZoom: 10,
    commonTagNames: ["streamflow", "waterway", "man_made", "landuse", "amenity", "natural", "water"],
    blacklistedTagValues: ["yes", "amenity"],
    queryAlertText: null,
    iconSize: [25, 25],
    simplifyThreshold: -1
};
const GEOM = {
    node: 100,
    way: 10,
    relation: 1
}

/**
 * Where the Rendering/Management related functions are
 * @namespace RenderInfrastructure
*/
let RenderInfrastructure = {
    map: null,
    markerLayer: null,
    data: null,
    preProcessData: null,
    queries: [],
    currentBounds: [],
    currentLayers: [],
    currentQueries: [],
    blacklist: [],
    grpcQuerier: null,
    options: JSON.parse(JSON.stringify(DEFAULTOPTIONS)),
    idCounter: 0,
    /**
     * Sets up instance of renderer
     * @memberof RenderInfrastructure
     * @method config
     * @param {L.Map} map - Leaflet map that will have things rendered to it
     * @param {L.markerClusterGroup} markerLayer - Marker cluster that will contain markers
     * @param {JSON} data - JSON that contains needed information for renderable things
     * @param {object} options - object with attributes
     */
    config: function (map, markerLayer, data, options) { //basically a constructor
        this.options = JSON.parse(JSON.stringify(DEFAULTOPTIONS));
        L.Util.setOptions(this, options);
        this.map = map;
        this.markerLayer = markerLayer;
        this.data = data;
        this.currentBounds = [];
        this.currentLayers = [];
        this.currentQueries = [];
        this.blacklist = Util.jsonToQueryList(this.data, true);
        this.queries = Util.jsonToQueryList(this.data);
        this.grpcQuerier = grpc_querier();
        this.idCounter = 0;
    },
    /**
     * Call this when the map should be updated
     * @memberof RenderInfrastructure
     * @method update
     */
    update: function () {
        if (!this.map || this.queries.length == 0 || this.options.minRenderZoom < this.map.currentZoom) {
            Util.refreshInfoPopup();
            return;
        }
        let customQueryBounds = [];
        let bounds = Util.Convert.leafletBoundsToNESWObject(this.map.getBounds());
        usefulBounds = Querier.createBoundsList(bounds);
        if (usefulBounds) {
            usefulBounds.forEach(bound => {
                let filter = Util.makeOSMFilter();
                if (filter.length > 0) {
                    Querier.queryGRPC("OSMRequest", null, bound, filter);
                }
                customQueryBounds.push(bound);
            });
        }
        // //pan loading bit
        bounds = Util.Convert.leafletBoundsToNESWObject(this.map.getBounds());
        bounds = Util.expandBounds(bounds);
        usefulBounds = Querier.createBoundsList(bounds);
        if (usefulBounds) {
            usefulBounds.forEach(bound => {
                let filter = Util.makeOSMFilter();
                if (filter.length > 0) {
                    Querier.queryGRPC("OSMRequest", null, bound, filter);
                }
                customQueryBounds.push(bound);
            });
        }
        this.updateCustom(this.queries, customQueryBounds);
    },
    /**
     * Call this when the map should be updated with custom elements
     * @memberof RenderInfrastructure
     * @method updateCustom
     * @param {Array} queries list of queries id's, can be generated with Util.jsonToQueryList()
     * @param {Array} bounds list of bounding boxes, they can be generated with Util.convert.leafletBoundsToNESWObject()
     */
    updateCustom: function (queries, bounds) {
        queries.forEach(query => {
            let url = Util.queryToQueryURL(query);
            if (url) {
                bounds.forEach(bound => {
                    Querier.queryGeoJsonFromServer(Querier.createCustomQueryURL(url, bound), bound, RenderInfrastructure.renderGeoJson);
                });
                return;
            }
            let grpc = Util.queryToGRPCDetails(query);
            if (grpc) {
                //console.log(query);
                bounds.forEach(bound => {
                    Querier.queryGRPC("DatasetRequest", grpc.dataset, bound);
                });
                return;
            }
        });
    },
    /**
     * Renders geojson
     * @memberof RenderInfrastructure
     * @method renderGeoJson
     * @param {JSON} geoJsonData GeoJSON 
     * @param {bool} preProcess (optional) does this need to be preprocessed before rendering? false if not related to streamflow stuff
     * @param {JSON} indexData (optional) custom JSON data (if you don't want to use Renderinfrastructure.data as your indexing file)
     * @returns {Array<int>} array of integers which contain the id of added layers
     */
    renderGeoJson: function (geoJsonData, preProcessed, indexData) {
        if (RenderInfrastructure.options.simplifyThreshold !== -1) {
            Util.simplifyGeoJSON(geoJsonData, RenderInfrastructure.options.simplifyThreshold);
        }
        Util.fixGeoJSONID(geoJsonData);
        const datasource = indexData ? indexData : RenderInfrastructure.data;
        let preProcess = [];
        let layers = [];
        L.geoJson(geoJsonData, {
            style: function (feature) {
                let weight = 3;
                let fillOpacity = 0.2;
                let name = Util.getNameFromGeoJsonFeature(feature,indexData);
                if (datasource[name] && datasource[name]["noBorder"]) {
                    weight = 0;
                    fillOpacity = 0.75;
                }
                return { color: datasource[name]["color"], weight: weight, fillOpacity: fillOpacity };
            },
            filter: function (feature) {
                if (!feature.id && feature._id.$oid) feature.id = feature._id.$oid; //osm data was kinda messy so had to hard code this
                let name = Util.getNameFromGeoJsonFeature(feature,indexData);
                if (RenderInfrastructure.currentLayers.includes(feature.id) || RenderInfrastructure.map.getZoom() < RenderInfrastructure.options.minRenderZoom || RenderInfrastructure.blacklist.includes(name) || datasource[name] == null) {
                    return false;
                }
                if (datasource[name]["preProcess"] && preProcessed) {
                    preProcess.push(feature);
                    return false;
                }
                RenderInfrastructure.currentLayers.push(feature.id);
                return true;
            },
            onEachFeature: function (feature, layer) {
                latlng = Util.getLatLngFromGeoJsonFeature(feature);
                if (latlng === -1) {
                    return;
                }
                let iconName = Util.getNameFromGeoJsonFeature(feature,indexData);
                let iconDetails = Util.createDetailsFromGeoJsonFeature(feature, iconName, indexData);
                RenderInfrastructure.addIconToMap(iconName, latlng, iconDetails);
                layer.bindPopup(iconDetails);
                layer.on('click', function (e) {
                    RenderInfrastructure.map.flyToBounds(layer.getBounds(), FLYTOOPTIONS);
                });
                layer.specifiedId = RenderInfrastructure.idCounter++;
                layers.push(layer.specifiedId);
            },
            pointToLayer: function () {
                return L.marker([0, 0], {
                    opacity: 0
                });
            }

        }).addTo(RenderInfrastructure.map);
        Util.refreshInfoPopup();
        //RenderInfrastructure.markerLayer.refreshClusters();
        if (!preProcessed) {
            Querier.preProcessQuery(preProcess);
        }
        return layers;
    },
    /**
     * Adds icon to map
     * @memberof RenderInfrastructure
     * @method addIconToMap
     * @param {string} iconName defines the bit of the JSON from this.data the icon will pull from
     * @param {Array} latLng latlng array where the icon will be put
     * @param {string} popUpContent the content that will display for this element when clicked, accepts HTML formatting
     */
    addIconToMap: function (iconName, latLng, popUpContent) {
        let icon = RenderInfrastructure.getAttribute(iconName, ATTRIBUTE.icon)
        if (!icon || icon === "noicon") {
            return false;
        }
        let marker = L.marker(latLng, {
            icon: icon,
            opacity: 1
        });
        marker.uniqueId = iconName;
        RenderInfrastructure.markerLayer.addLayer(marker.on('click', function (e) {
            if(e.target.__parent._group._spiderfied){
                return;
            }
            if (RenderInfrastructure.map.getZoom() < 16) {
                RenderInfrastructure.map.flyTo(e.latlng, 16, FLYTOOPTIONS);
            }
            else {
                RenderInfrastructure.map.flyTo(e.latlng, RenderInfrastructure.map.getZoom(), FLYTOOPTIONS);
            }
        }).bindPopup(popUpContent));
        return true;
    },
    /**
     * Removes a feature id from the map
     * @memberof RenderInfrastructure
     * @method removeFeatureFromMap
     * @param {string} featureId id which should be removed from map, ex: 'dam' or 'weir'
     * @returns {boolean} true if feature was removed, false if not
     */
    removeFeatureFromMap: function (featureId) {
        if (!this.data[featureId]) {
            return false;
        }
        else if (!this.queries.includes(this.data[featureId]['query']) && this.data[featureId]['query']) {
            return false;
        }
        else if (this.data[featureId]['refrences']) {
            this.data[featureId]['refrences'].forEach(element => {
                this.removeFeatureFromMap(element);
            });
            return false;
        }
        this.queries.splice(this.queries.indexOf(this.data[featureId]['query']), 1);
        if (RenderInfrastructure.getAttribute(featureId, ATTRIBUTE.icon) != "noicon") {
            this.markerLayer.eachLayer(function (layer) {
                if (layer.uniqueId && layer.uniqueId === featureId) {
                    RenderInfrastructure.markerLayer.removeLayer(layer);
                }
            });
        }
        this.map.eachLayer(function (layer) {
            if (layer.feature && Util.getNameFromGeoJsonFeature(layer.feature) == featureId) {
                RenderInfrastructure.map.removeLayer(layer);
                RenderInfrastructure.currentLayers.splice(RenderInfrastructure.currentLayers.indexOf(layer.feature.id), 1);
            }
        });
        this.blacklist.push(featureId);
        return true;
    },
    /**
     * Removes a feature id from the map
     * @memberof RenderInfrastructure
     * @method removeFeatureFromMap
     * @param {Array<int>} specifiedIds id which should be removed from map, ex: 'dam' or 'weir'
     * @returns {boolean} true if ids were removed
     */
    removeSpecifiedLayersFromMap: function (specifiedIds) {
        this.map.eachLayer(function (layer) {
            if (layer.feature && specifiedIds.includes(layer.specifiedId)) {
                RenderInfrastructure.currentLayers.splice(RenderInfrastructure.currentLayers.indexOf(layer.feature.id), 1);
                RenderInfrastructure.map.removeLayer(layer);
            }
        });
        return true;
    },
    /**
     * Removes all features from the map
     * @memberof RenderInfrastructure
     * @method removeAllFeaturesFromMap
     * @returns {boolean} true if successful, there will be an error otherwise
     */
    removeAllFeaturesFromMap: function () {
        this.markerLayer.eachLayer(function (layer) {
            RenderInfrastructure.markerLayer.removeLayer(layer);
        });
        this.map.eachLayer(function (layer) {
            if (layer.feature) {
                RenderInfrastructure.map.removeLayer(layer);
            }
        });
        this.blacklist = [];
        this.queries = [];
        this.currentBounds = [];
        this.currentLayers = [];
        this.currentQueries = [];
        for (x in RenderInfrastructure.data) {
            if (RenderInfrastructure.data[x]['query']) {
                this.blacklist.push(x);
            }
        }
        return true;
    },
    /**
     * Adds a feature id to the map and forces an update
     * @memberof RenderInfrastructure
     * @alias RenderInfrastructure.addFeatureToMap
     * @param {string} featureId id which should be added to map, ex: 'dam' or 'weir'
     * @returns {boolean} true if feature was added, false if JSON doesnt contain tag or objects is already being rendered
     */
    addFeatureToMap: function (featureId) {
        if (this.data[featureId]) {
            if (!this.queries.includes(this.data[featureId]['query'])) {
                this.currentBounds = [];
                this.currentQueries.forEach(e => {
                    e.bounds = { north: 0, south: 0, east: 0, west: 0 }
                });
                this.blacklist.splice(this.blacklist.indexOf(featureId), 1);
                this.queries.push(this.data[featureId]['query']);
                this.update();
                return true;
            }
        }
        return false;
    },
    /**
     * Cleans up elements outside of the current viewportX2
     * @memberof RenderInfrastructure
     * @returns true if successful, false otherwise
     */
    cleanupMap: function () {
        let iconsToRemove = [];
        this.markerLayer.eachLayer(function (layer) {
            let ltlng = layer._latlng;
            if (!Util.pointIsWithinBounds(ltlng, Util.expandBounds(Util.Convert.leafletBoundsToNESWObject(RenderInfrastructure.map.getBounds())))) {
                iconsToRemove.push(layer);
            }
        });
        this.markerLayer.removeLayers(iconsToRemove);
        this.map.eachLayer(function (layer) {
            if (layer.feature != null) {
                let ltlng = RenderInfrastructure.map.getCenter;
                if (Util.getLatLngFromGeoJsonFeature(layer.feature) != null) {
                    ltlng = Util.getLatLngFromGeoJsonFeature(layer.feature);
                }
                if (!Util.pointIsWithinBounds(ltlng, Util.expandBounds(Util.Convert.leafletBoundsToNESWObject(RenderInfrastructure.map.getBounds())))) {
                    if (layer.feature.properties.type == 'node' || layer.feature.properties.type == 'way' || layer.feature.properties.type == 'relation' || layer.feature.properties.TYPEPIPE != null) {
                        RenderInfrastructure.map.removeLayer(layer);
                        RenderInfrastructure.currentLayers.splice(RenderInfrastructure.currentLayers.indexOf(layer.feature.id), 1);
                    }
                }
            }
        });
        this.currentBounds = [Util.expandBounds(Util.Convert.leafletBoundsToNESWObject(this.map.getBounds()))];
        return true;
    },
    /**
     * Cleans up elements outside of the current viewportX2
     * @memberof RenderInfrastructure
     * @method getAttribute
     * @param {string} id to get from the data JSON
     * @param {number} attribute options defined in the ATTRIBUTE enum
     * @returns {string} either a address to an icon or a hex color string
     */
    getAttribute: function (tag, attribute) {
        if (this.data) {
            if (this.data[tag]) {
                if (attribute == ATTRIBUTE.color) {
                    if (this.data[tag]["color"]) {
                        return this.data[tag]["color"];
                    }
                }
                else {
                    if (this.data[tag]["iconAddr"]) {
                        return Util.makeIcon(this.data[tag]["iconAddr"]);
                    }
                }
            }
        }
        if (attribute == ATTRIBUTE.color) {
            return "#000000";
        }
        else {
            return "noicon"
        }
    }
}
/**
 * Where the querying related functions are
 * @namespace Querier 
*/
const Querier = {
    /**
     * Queries geoJSON or OSM Xml from an endpoint and returns it as geoJSON
     * @memberof Querier
     * @method queryGeoJsonFromServer
     * @param {string} queryURL URL where geoJSON/Osm Xml is
     * @param {object} bounds (not necessary when using this function by itself) bounds object like: {north:?,east:?,south:?,west:?}
     * @param {Function} callbackFn where the geoJSON will be sent on return, should be a 1-parameter function
     */
    queryGeoJsonFromServer: async function (queryURL, bounds, callbackFn) {
        this.removeUnnecessaryQueries();
        let query = $.getJSON(queryURL, function (dataAsJson) {
            for (let i = 0; i < RenderInfrastructure.currentQueries.length; i++) {
                if (RenderInfrastructure.currentQueries[i].query === query) {
                    RenderInfrastructure.currentQueries.splice(i, 1)
                    break;
                }
            }
            if (RenderInfrastructure.currentLayers.length > RenderInfrastructure.options.maxElements) {
                RenderInfrastructure.cleanupMap();
            }
            else if (RenderInfrastructure.currentBounds.length > RenderInfrastructure.options.maxLayers) {
                RenderInfrastructure.currentBounds = [Util.expandBounds(Util.Convert.leafletBoundsToNESWObject(RenderInfrastructure.map.getBounds()))];
            }
            let relevantBounds = Querier.createBoundsList(bounds);
            if(relevantBounds)
                RenderInfrastructure.currentBounds = RenderInfrastructure.currentBounds.concat(relevantBounds /*This is a weird use of this function but it works*/); 
            callbackFn(dataAsJson);
        });
        RenderInfrastructure.currentQueries.push({ query: query, bounds: bounds });
        Util.refreshInfoPopup();
    },
    /**
     * Removes queries that shouldnt be continued, for example if something was loading far away from the viewport,
     * this would remove it
     * @memberof Querier
     * @method removeUnnecessaryQueries
     */
    removeUnnecessaryQueries: function () {
        for (let i = 0; i < RenderInfrastructure.currentQueries.length; i++) {
            let bound = Util.Convert.leafletBoundsToNESWObject(RenderInfrastructure.map.getBounds());
            bound = Util.expandBounds(bound);
            if (Util.boundsAreOutsideOfBounds(RenderInfrastructure.currentQueries[i].bounds, bound)) {
                //RenderInfrastructure.currentQueries[i].query.abort();
                RenderInfrastructure.currentQueries.splice(i, 1);
                i--;
            }
        }
    },
    /**
     * Gives you a list of queries to run based on bounds that already exist
     * @memberof Querier
     * @method createBoundsList
     * @param {Object} queryBounds bbox to query
     * @returns {Array} of bounds that dont intersect existing bounds
     */
    createBoundsList: function (queryBounds) {
        let boundsToQuery = [];
        if ((RenderInfrastructure.currentBounds.length === 0 && RenderInfrastructure.currentQueries.length == 0)) {
            boundsToQuery = [queryBounds];
        }
        else {
            if (RenderInfrastructure.currentBounds.length > 0) {
                boundsToQuery = Util.subtractBounds(queryBounds, RenderInfrastructure.currentBounds[0]);
                if (boundsToQuery.length > 0) {
                    for (let j = 1; j < RenderInfrastructure.currentBounds.length; j++) {
                        boundsToQuery = Util.subtractBoundsFromList(boundsToQuery, RenderInfrastructure.currentBounds[j]);
                    }
                }
            }
            if (RenderInfrastructure.currentQueries.length > 0) {
                let startIndex = 0;
                if (boundsToQuery.length == 0) {
                    boundsToQuery = Util.subtractBounds(queryBounds, RenderInfrastructure.currentQueries[0].bounds);
                    startIndex = 1;
                }
                if (boundsToQuery.length > 0) {
                    for (let n = startIndex; n < RenderInfrastructure.currentQueries.length; n++) {
                        boundsToQuery = Util.subtractBoundsFromList(boundsToQuery, RenderInfrastructure.currentQueries[n].bounds);
                    }
                }
            }
        }
        if (boundsToQuery.length == 0) return null;
        boundsToQuery = Util.optimizeBoundsList(boundsToQuery, RenderInfrastructure.options.simplifyThreshold);
        if (boundsToQuery.length == 0) return null;
        return boundsToQuery;
    },
    /**
     * Pre-processes a query
     * @memberof Querier
     * @method preProcessQuery
     * @param {Array} features features from GeoJSON that should be preprocessed. This is used for streams in this implementation
     * @returns {string} a valid overpass URL
     */
    preProcessQuery: function (features) {
        if (features.length == 0) {
            return;
        }
        if (!RenderInfrastructure.preProcessData || true) { //disabling this entire function for now
            RenderInfrastructure.renderGeoJson(Util.createGeoJsonObj(features));
            return;
        }
        let hits = [];
        let misses = [];
        features.forEach(fea => {
            let hit = RenderInfrastructure.preProcessData[fea.id];
            if (hit) {
                hits.push({ feature: fea, stations: hit.stations });
            }
            else {
                misses.push(fea);
            }
        });
        //RenderInfrastructure.renderGeoJson(Util.createGeoJsonObj(hit),true);
        let splitHits = [];
        for (let j = 0; j < hits.length; j++) {
            let stations = hits[j].stations;
            for (let i = 0; i < stations.length; i++) {
                let feature = JSON.parse(JSON.stringify(hits[j].feature));
                feature.properties.streamflow = "streamflowData";
                if (stations.length === 1) {
                    feature.station = stations[i];
                    feature.properties.strflowGeohash = stations[i].geohash;
                    splitHits.push(feature);
                    break;
                }
                let minDist = Infinity;
                let indx = 0;
                for (let k = 0; k < feature.geometry.coordinates.length; k++) {
                    let d = Util.dist2d(stations[i].latlng, feature.geometry.coordinates[k]);
                    if (d < minDist) {
                        minDist = d;
                        indx = k;
                    }
                }
                let newCoords = feature.geometry.coordinates.splice(indx + 1);
                if (feature.geometry.type == 'Polygon') {
                    feature.geometry.coordinates.push(feature.geometry.coordinates[0]);
                }
                hits[j].feature.geometry.coordinates = newCoords;
                feature.station = stations[i];
                feature.properties.strflowGeohash = stations[i].geohash;
                splitHits.push(feature);
            }
        }
        RenderInfrastructure.renderGeoJson(Util.createGeoJsonObj(splitHits), true);
        RenderInfrastructure.renderGeoJson(Util.createGeoJsonObj(misses), true);
    },
    /**
     * Helper method for RenderInfrastructure.updateCustom
     * @memberof Querier
     * @method createCustomQueryURL
     * @param {string} URL the url which will edited, probably from the data JSON
     * @param {object} bounds NESW object, can be created with Util.Convert.leafletBoundsToNESWObject()
     * @returns {string} a url with the bounds replaced with @param bounds 
     */
    createCustomQueryURL: function (URL, bounds) {
        return URL.replace('{{BOUNDS}}', bounds.west + '%2C' + bounds.south + '%2C' + bounds.east + '%2C' + bounds.north);
    },
    /**
     * Queries from the grpc server
     * @memberof Querier
     * @method queryGRPC
     * @param {string} func which type of request? "DatasetRequest" or "OSMRequest"
     * @param {int} dataset int from sustain.proto datasets list
     * @param {object} bounds NESW object, can be created with @method Util.Convert.leafletBoundsToNESWObject()
     * @param {array<object>} filter can be made with @method Util.makeOSMFilter() or can be supplied like [{key:"natural",value:"water"}, ...]
     * @param {function} callback (optional) function to stream geoJSON features into
     */
    queryGRPC: function (func, dataset, bounds, filter, callback) {
        const callbackFunc = callback ? callback : RenderInfrastructure.renderGeoJson;
        let stream;
        if (func === "DatasetRequest") {
            stream = RenderInfrastructure.grpcQuerier.getDatasetData(dataset, Util.Convert.createGeoJSONPoly(bounds));
        }
        else if (func === "OSMRequest" && filter) {
            stream = RenderInfrastructure.grpcQuerier.getOSMData(Util.Convert.createGeoJSONPoly(bounds), filter);
        }
        stream.on('data', function (response) {
            callbackFunc(JSON.parse(response.array[0]));
        });
        stream.on('status', function (status) {
            //console.log(status.code, status.details, status.metadata);
        });
        stream.on('end', function (end) {
            for (let i = 0; i < RenderInfrastructure.currentQueries.length; i++) {
                if (RenderInfrastructure.currentQueries[i].query === stream) {
                    if(!RenderInfrastructure.currentBounds.includes(RenderInfrastructure.currentQueries[i].bounds)){
                        RenderInfrastructure.currentBounds.push(RenderInfrastructure.currentQueries[i].bounds);
                    }
                    RenderInfrastructure.currentQueries.splice(i, 1);
                    break;
                }
            }
            Util.refreshInfoPopup();
        });
        RenderInfrastructure.currentQueries.push({ query: stream, bounds: bounds });
    }
}

/**
* Where utility functions are
* @namespace Util
*/
const Util = {
    /**
     * Where conversion functions are
     * @namespace Convert
     * @memberof Util
     */
    Convert: {
        /**
        * Converts leaflet bounds to NSEW
        * @memberof Util
        * @method leafletBoundsToNESWObject
        * @param {object} leafletBounds leaflet bounds object
        * @returns {object} an object which has simple, readable north, south, east, and west attributes
        */
        leafletBoundsToNESWObject: function (leafletBounds) {
            return {
                north: leafletBounds.getNorth(),
                east: leafletBounds.getEast(),
                south: leafletBounds.getSouth(),
                west: leafletBounds.getWest()
            };
        },
        /**
        * Converts leaflet bounds to NSEW
        * @memberof Util
        * @method createOverpassBoundsString
        * @param {object} bounds NSEW bounds object
        * @returns {object} an object which has simple, readable north, south, east, and west attributes
        */
        createOverpassBoundsString: function (bounds) {
            return bounds.south + ',' + bounds.west + ',' + bounds.north + ',' + bounds.east;
        },
        /**
        * Converts bounds obj to GeoJSON polygon used for queries
        * @memberof Util
        * @method createOverpassBoundsString
        * @param {object} bounds NSEW bounds object
        * @returns {object} GeoJSON polygon
        */
        createGeoJSONPoly: function (bounds) {
            let geo = {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "polygon", coordinates: [[
                        [bounds.west, bounds.south],
                        [bounds.west, bounds.north],
                        [bounds.east, bounds.north],
                        [bounds.east, bounds.south],
                        [bounds.west, bounds.south]]]
                }
            };
            return JSON.stringify(geo);
        }
    },
    /**
     * Are bounds COMPLETELY within other bounds?
     * @memberof Util
     * @method boundsAreWithinBounds
     * @param {object} boundsToCheck NSEW bounds object that will be checked to see if it is within @param boundsToCheckAgainst
     * @param {object} boundsToCheckAgainst bounds NSEW object, will be checked against
     * @returns {boolean} is it within (true) or not (false)
     */
    boundsAreWithinBounds: function (boundsToCheck, boundsToCheckAgainst) {
        return boundsToCheckAgainst.north >= boundsToCheck.north && boundsToCheckAgainst.south <= boundsToCheck.south && boundsToCheckAgainst.west <= boundsToCheck.west && boundsToCheckAgainst.east >= boundsToCheck.east;
    },
    /**
     * Are bounds COMPLETELY outside other bounds?
     * @memberof Util
     * @method boundsAreOutsideOfBounds
     * @param {object} boundsToCheck NSEW bounds object that will be checked to see if it is outside of @param boundsToCheckAgainst
     * @param {object} boundsToCheckAgainst bounds NSEW object, will be checked against
     * @returns {boolean} is it COMPLETELY outside (true) or not (false)
     */
    boundsAreOutsideOfBounds: function (boundsToCheck, boundsToCheckAgainst) {
        return boundsToCheck.east < boundsToCheckAgainst.west || boundsToCheck.west > boundsToCheckAgainst.east || boundsToCheck.south > boundsToCheckAgainst.north || boundsToCheck.north < boundsToCheckAgainst.south;
    },
    /**
     * Is a point within a bounds?
     * @memberof Util
     * @method pointIsWithinBounds
     * @param {object} latLngPoint lat lng point in {lat:y,lng:x} format, will be checked to see if within @param boundsToCheckAgainst
     * @param {object} boundsToCheckAgainst bounds NSEW object, will be checked against
     * @returns {boolean} is it COMPLETELY outside (true) or not (false)
     */
    pointIsWithinBounds: function (latLngPoint, boundsToCheckAgainst) {
        if (latLngPoint == null) {
            return true;
        }
        return latLngPoint.lng > boundsToCheckAgainst.west && latLngPoint.lat > boundsToCheckAgainst.south && latLngPoint.lng < boundsToCheckAgainst.east && latLngPoint.lat < boundsToCheckAgainst.north;
    },
    /**
     * What is the best latLng point for a GeoJSON feature?
     * @memberof Util
     * @method getLatLngFromGeoJsonFeature
     * @param {object} feature GeoJSON feature, a latlng point will be extracted. Can be a point, linestring, or polygon.
     * @returns {object} Leaflet latLng object
     */
    getLatLngFromGeoJsonFeature: function (feature) {
        let type = this.getFeatureType(feature);
        latlng = [];
        if (type === FEATURETYPE.polygon) {
            let pos = L.latLngBounds(feature.geometry.coordinates[0]).getCenter();
            latlng.push(pos.lat);
            latlng.push(pos.lng);
        }
        else if (type === FEATURETYPE.lineString) {
            let pos = L.latLngBounds(feature.geometry.coordinates).getCenter();
            latlng.push(pos.lat);
            latlng.push(pos.lng);
        }
        else if (type === FEATURETYPE.point) {
            latlng = feature.geometry.coordinates;
        }
        else {
            return [0, 0];
        }
        return L.latLng(latlng[1], latlng[0]);
    },
    /**
     * What type is a GeoJSON feature?
     * @memberof Util
     * @method getFeatureType
     * @param {object} feature GeoJSON feature, a latlng point will be extracted. Can be a point, linestring, or polygon.
     * @returns {number} Enum from FEATURETYPE or -1 if not found
     */
    getFeatureType: function (feature) {
        if ((feature.geometry) && (feature.geometry.type !== undefined) && (feature.geometry.type === "Polygon")) {
            return FEATURETYPE.polygon;
        }
        else if ((feature.geometry) && (feature.geometry.type !== undefined) && (feature.geometry.type === "LineString")) {
            return FEATURETYPE.lineString;
        }
        else if ((feature.geometry) && (feature.geometry.type !== undefined) && (feature.geometry.type === "Point")) {
            return FEATURETYPE.point;
        }
        else {
            return -1;
        }
    },
    /**
     * Simplifies GeoJSON 
     * @memberof Util
     * @method simplifyGeoJSON
     * @param {object} GeoJSON GeoJSON obj
     * @param {number} threshold threshold to simplify by
     */
    simplifyGeoJSON: function (geoJSON, threshold) {
        if (geoJSON.features) {
            geoJSON.features.forEach(feature => {
                this.simplifyFeatureCoords(feature, threshold);
            });
        }
    },
    /**
     * Helper for simplify GeoJSON, simplifies a single feature
     * @memberof Util
     * @method simplifyFeatureCoords
     * @param {object} feature feature to be simplified
     * @param {number} threshold threshold to simplify by
     */
    simplifyFeatureCoords: function (feature, threshold) {
        let type = this.getFeatureType(feature);
        if (type === -1 || type === FEATURETYPE.point) {
            return;
        }
        if (type === FEATURETYPE.polygon) {
            feature.geometry.coordinates[0] = simplify(feature.geometry.coordinates[0], threshold, false);
        }
        else if (type === FEATURETYPE.lineString) {
            feature.geometry.coordinates = simplify(feature.geometry.coordinates, threshold, false);
        }
    },
    /**
     * Removes bounds from another bounds
     * @memberof Util
     * @method subtractBounds
     * @param {object} boundsToSlice bounds that will be edited
     * @param {object} boundSlicer bounds that will be removed from @param boundsToSlice
     * @returns {Array} array that contains bounds that dont include @param boundSlicer
     */
    subtractBounds: function (boundsToSlice, boundSlicer) {
        if (this.boundsAreWithinBounds(boundsToSlice, boundSlicer)) {
            return []; //the bounds are within eachother
        }
        if (this.boundsAreOutsideOfBounds(boundsToSlice, boundSlicer)) {
            return [boundsToSlice];
        }
        let returnList = [];
        if (boundSlicer.west > boundsToSlice.west) {
            returnList.push({
                north: boundsToSlice.north,
                south: boundsToSlice.south,
                east: boundSlicer.west,
                west: boundsToSlice.west
            });
        }
        if (boundSlicer.east < boundsToSlice.east) {
            returnList.push({
                north: boundsToSlice.north,
                south: boundsToSlice.south,
                east: boundsToSlice.east,
                west: boundSlicer.east
            });
        }
        if (boundSlicer.south > boundsToSlice.south) {
            returnList.push({
                north: boundSlicer.south,
                south: boundsToSlice.south,
                east: Math.min(boundSlicer.east, boundsToSlice.east),
                west: Math.max(boundSlicer.west, boundsToSlice.west)
            });
        }
        if (boundSlicer.north < boundsToSlice.north) {
            returnList.push({
                north: boundsToSlice.north,
                south: boundSlicer.north,
                east: Math.min(boundSlicer.east, boundsToSlice.east),
                west: Math.max(boundSlicer.west, boundsToSlice.west)
            });
        }
        return returnList;
    },
    /**
     * Same thing as @method subtractBounds but for a list of bounds
     * @memberof Util
     * @method subtractBoundsFromList
     * @param {Array} boundsListToEdit bounds that will be edited
     * @param {object} boundSlicer bounds that will be removed from @param boundsListToEdit
     * @returns {Array} array that contains bounds that dont include @param boundSlicer
     */
    subtractBoundsFromList: function (boundsListToEdit, boundsToRemove) {
        let tempBoundsList = [];
        for (let k = 0; k < boundsListToEdit.length; k++) {
            tempBoundsList = tempBoundsList.concat(this.subtractBounds(boundsListToEdit[k], boundsToRemove));
        }
        return tempBoundsList;
    },
    /**
     * Can simplify a bounds list to have less objects, with the approximate same geometry
     * @memberof Util
     * @method optimizeBoundsList
     * @param {Array} boundsListToOptimize bounds that will be optimized
     * @param {number} epsilon how approximate should the joins be
     * @returns {Array} a (hopefully) shorter array than @param boundsListToOptimize
     */
    optimizeBoundsList: function (boundsListToOptimize, epsilon) {
        for (let i = 0; i < boundsListToOptimize.length; i++) {
            if (boundsListToOptimize[i].east - boundsListToOptimize[i].west < epsilon || boundsListToOptimize[i].north - boundsListToOptimize[i].south < epsilon) {
                boundsListToOptimize.splice(i, 1);
                i--;
            }
        }
        for (let i = 0; i < boundsListToOptimize.length; i++) {
            for (let j = i + 1; j < boundsListToOptimize.length; j++) {
                if (i < 0 || j < 0) {
                    continue;
                }
                let minimize = false;
                if (Math.abs(boundsListToOptimize[i].north - boundsListToOptimize[j].north) <= epsilon && Math.abs(boundsListToOptimize[i].south - boundsListToOptimize[j].south) <= epsilon && (Math.abs(boundsListToOptimize[i].east - boundsListToOptimize[j].west) <= epsilon || Math.abs(boundsListToOptimize[i].west - boundsListToOptimize[j].east) <= epsilon)) {
                    minimize = true;
                    boundsListToOptimize.push(this.concatenateBounds(boundsListToOptimize[i], boundsListToOptimize[j], NSEW.ns));
                }
                else if (Math.abs(boundsListToOptimize[i].east - boundsListToOptimize[j].east) <= epsilon && Math.abs(boundsListToOptimize[i].west - boundsListToOptimize[j].west) <= epsilon && (Math.abs(boundsListToOptimize[i].south - boundsListToOptimize[j].north) <= epsilon || Math.abs(boundsListToOptimize[i].north - boundsListToOptimize[j].south) <= epsilon)) {
                    minimize = true;
                    boundsListToOptimize.push(this.concatenateBounds(boundsListToOptimize[i], boundsListToOptimize[j], NSEW.ew));
                }
                if (minimize) {
                    boundsListToOptimize.splice(i, 1);
                    i--;
                    boundsListToOptimize.splice(j - 1, 1);
                    j--;
                }
            }
        }
        return boundsListToOptimize;
    },
    /**
     * Concatenates bounds
     * @memberof Util
     * @method optimizeBoundsList
     * @param {object} bounds1 NSEW obj
     * @param {object} bounds2 NSEW obj
     * @param {number} sharedAxis Enum from NSEW enums
     * @returns {object} a object with b1 and b2 joined
     */
    concatenateBounds: function (bounds1, bounds2, sharedAxis) {
        if (sharedAxis == NSEW.ns) {
            return {
                north: Math.min(bounds1.north, bounds2.north),
                south: Math.max(bounds1.south, bounds2.south),
                east: Math.max(bounds1.east, bounds2.east),
                west: Math.min(bounds1.west, bounds2.west)
            };
        }
        else {
            return {
                north: Math.max(bounds1.north, bounds2.north),
                south: Math.min(bounds1.south, bounds2.south),
                east: Math.min(bounds1.east, bounds2.east),
                west: Math.max(bounds1.west, bounds2.west)
            };
        }
    },
    /**                                                                            XXX
     * Expands a bounds to have 9X the area, bounds go from this -> X to this ->   XXX
     *                                                                             XXX
     * @memberof Util
     * @method expandBounds
     * @param {object} bounds
     * @returns {object} expanded @param bounds
     */
    expandBounds: function (bounds) {
        return {
            north: bounds.north + (bounds.north - bounds.south),
            south: bounds.south - (bounds.north - bounds.south),
            east: bounds.east + (bounds.east - bounds.west),
            west: bounds.west - (bounds.east - bounds.west)
        };
    },
    /**                                                                            
     * gets JSON data defined name for geojson feature
     * @memberof Util
     * @method getNameFromGeoJsonFeature
     * @param {object} feature feature to get name of
     * @param {JSON} indexData (optional) custom JSON data (if you don't want to use Renderinfrastructure.data as your indexing file)
     * @returns {string} name/id of feature, "none" if not found
     */
    getNameFromGeoJsonFeature: function (feature, indexData) {
        let pTObj = this.getParamsAndTagsFromGeoJsonFeature(feature);
        let params = pTObj.params;
        let tagsObj = pTObj.tagsObj;
        const datasource = indexData ? indexData : RenderInfrastructure.data;
        for (let j = 0; j < RenderInfrastructure.options.commonTagNames.length; j++) {
            for (let i = 0; i < params.length; i++) {
                if (RenderInfrastructure.options.commonTagNames[j] === params[i]) {
                    if (!RenderInfrastructure.options.blacklistedTagValues.includes(tagsObj[params[i]])) {
                        return tagsObj[params[i]];
                    }
                }
            }
        }
        for (element in datasource) {
            if (datasource[element]["identityField"]) {
                for (let i = 0; i < params.length; i++) {
                    if (params[i] === datasource[element]["identityField"]) {
                        if (datasource[element]["identityKey"]) {
                            if (tagsObj[params[i]] === datasource[element]["identityKey"]) {
                                return element;
                            }
                        }
                        else {
                            return element;
                        }
                    }
                }
            }

        }
        return 'none';
    },
    /**                                                                            
     * creates popup based on the JSON data
     * @memberof Util
     * @method createDetailsFromGeoJsonFeature
     * @param {object} feature
     * @param {string} name
     * @param {JSON} indexData (optional) custom JSON data (if you don't want to use Renderinfrastructure.data as your indexing file)
     * @returns {string} html to put on popup
     */
    createDetailsFromGeoJsonFeature: function (feature, name, indexData) {
        let pTObj = this.getParamsAndTagsFromGeoJsonFeature(feature);
        return this.createPopup(name, pTObj, indexData);
    },
    /**                                                                            
     * gets tags from GeoJSON feature
     * @memberof Util
     * @method getParamsAndTagsFromGeoJsonFeature
     * @param {object} feature
     * @returns {object} object with params and tags
     */
    getParamsAndTagsFromGeoJsonFeature: function (feature) {
        let params;
        let tagsObj;
        if (feature.properties.tags) {
            params = Object.keys(feature.properties.tags);
            tagsObj = feature.properties.tags;
            if (params.length == 0) {
                params = Object.keys(feature.properties.relations[0].reltags);
                tagsObj = feature.properties.relations[0].reltags;
            }
        }
        else if (feature.properties) { //non-osm data is here
            params = Object.keys(feature.properties);
            tagsObj = feature.properties;
        }
        else {
            return "nodata";
        }
        return { params: params, tagsObj: tagsObj };
    },
    /**                                                                            
     * Capitalizes First Letter In Every Word Unless The Word is 2 Chars or Less
     * @memberof Util
     * @method capitalizeString
     * @param {string} str
     * @returns {string} 
     */
    capitalizeString: function (str) {
        if (str == null || str.length == 0) {
            return "";
        }
        str = str.split(" ");
        for (var i = 0, x = str.length; i < x; i++) {
            if (str[i] == null || str[i].length <= 2) {
                continue;
            }
            str[i] = str[i][0].toUpperCase() + str[i].substr(1);
        }
        return str.join(" ");
    },
    /**                                                                            
     * Converts_underscores -> to spaces.
     * @memberof Util
     * @method underScoreToSpace
     * @param {string} str
     * @returns {string} 
     */
    underScoreToSpace: function (str) {
        if (str == null) {
            return "noname"
        }
        if (typeof str !== 'string') {
            str = str.toString();
        }
        return str.replace(/_/gi, " ");
    },
    /**                                                                            
     * Creates a leaflet icon from an image address.
     * @memberof Util
     * @method makeIcon
     * @param {string} address
     * @returns {object} leaflet icon
     */
    makeIcon: function (address) {
        icon = new L.Icon({
            iconUrl: address,
            iconSize: RenderInfrastructure.options.iconSize
        });
        return icon;
    },
    /**                                                                            
     * Refreshes the popup on the bottom left of the map that tells you what is happening
     * @memberof Util
     * @method refreshInfoPopup
     */
    refreshInfoPopup: function () {
        if (RenderInfrastructure.options.queryAlertText) {
            if (RenderInfrastructure.map.getZoom() >= RenderInfrastructure.options.minRenderZoom && RenderInfrastructure.currentQueries.length == 0) {
                RenderInfrastructure.options.queryAlertText.parentElement.style.display = "none";
            }
            else if (RenderInfrastructure.map.getZoom() < RenderInfrastructure.options.minRenderZoom) {
                RenderInfrastructure.options.queryAlertText.parentElement.style.display = "block";
                RenderInfrastructure.options.queryAlertText.innerHTML = "Current Zoom: " + RenderInfrastructure.map.getZoom() + ", Data at: " + RenderInfrastructure.options.minRenderZoom;
            }
            else {
                RenderInfrastructure.options.queryAlertText.parentElement.style.display = "block";
                RenderInfrastructure.options.queryAlertText.innerHTML = "Loading Data...";
            }
        }
    },
    /**                                                                            
     * Converts binary to an object with booleans
     * @memberof Util
     * @method binaryToBool
     * @param {integer} bin binary int like 101 or 001 or 000 or 111 ... 
     * @returns {object} that has node, way, relation set to true or false based on the input.
     */
    binaryToBool: function (bin) {
        //not real binary, but it converts 110 to true, true, false and such 
        let nWR = {
            node: false,
            way: false,
            relation: false
        }
        for (let j = 0; j < 3; j++) {
            if (bin % 10 === 1) {
                nWR.relation = true;
            }
            bin = Math.floor(bin / 10);
            if (bin % 10 === 1) {
                nWR.way = true;
            }
            bin = Math.floor(bin / 10);
            if (bin % 10 === 1) {
                nWR.node = true;
            }
        }
        return nWR;
    },
    /**                                                                            
     * Creates query list based on json data, can also make a blacklist for query id's that shouldnt be on by default
     * @memberof Util
     * @method binaryToBool
     * @param {object} json 
     * @param {boolean} blacklist true if a list of inf that shouldnt be queried should be returned
     * @returns {Array} with the queries to run
     */
    jsonToQueryList: function (json, blacklist) {
        let ret = [];
        for (e in json) {
            if (json[e]['defaultRender'] && json[e]['query'] && !blacklist) {
                ret.push(json[e]['query']);
            }
            else if (!json[e]['defaultRender'] && json[e]['query'] && blacklist) {
                ret.push(json[e]['query'].split("=")[1]);
            }
        }
        return ret;
    },
    /**                                                                            
     * Creates a full geojson object from a feature array
     * @memberof Util
     * @method createGeoJsonObj
     * @param {Array} features
     * @returns {object} full geojson
     */
    createGeoJsonObj: function (features) {
        let geojson = {
            "type": "FeatureCollection",
            "features": []
        }
        features.forEach(fea => {
            geojson["features"].push(fea);
        });
        return geojson;
    },
    /**                                                                            
     * Gives non-square-rooted 2d distance, one input latlng is reversed
     * @memberof Util
     * @method dist2d
     * @param {Array} p1
     * @param {Array} p2
     * @returns {number} distance
     */
    dist2d: function (p1, p2) { //p2 latlng array is reversed
        return Math.pow(p1[0] - p2[1], 2) + Math.pow(p1[1] - p2[0], 2);
    },
    /**                                                                            
     * Gets query url from query
     * @memberof Util
     * @method queryToQueryURL
     * @param {string} query
     * @returns {string} queryURL
     */
    queryToQueryURL: function (query) {
        if (!RenderInfrastructure.data) return;
        for (x in RenderInfrastructure.data) {
            if (RenderInfrastructure.data[x]["query"] && RenderInfrastructure.data[x]["query"] === query && RenderInfrastructure.data[x]["queryURL"]) {
                return RenderInfrastructure.data[x]["queryURL"];
            }
        }
    },
    /**                                                                            
     * Gets query url from query
     * @memberof Util
     * @method queryToGRPCDetails
     * @param {string} query
     * @returns {object} details
     */
    queryToGRPCDetails: function (query) {
        if (!RenderInfrastructure.data) return;
        for (x in RenderInfrastructure.data) {
            if (RenderInfrastructure.data[x]["query"] && RenderInfrastructure.data[x]["query"] === query && RenderInfrastructure.data[x]["grpc"] && RenderInfrastructure.data[x]["grpc"] != "OSMRequest") {
                return {
                    func: RenderInfrastructure.data[x]["grpc"],
                    dataset: RenderInfrastructure.data[x]["grpcDataset"]
                };
            }
        }
    },
    /**                                                                            
     * Makes an osm filter ready for grpc calls
     * @memberof Util
     * @method makeOSMFilter
     * @returns {Array} filter
     */
    makeOSMFilter: function () {
        let ret = [];
        for (inf in RenderInfrastructure.data) {
            if (RenderInfrastructure.data[inf]["query"] && RenderInfrastructure.data[inf]["grpc"] && RenderInfrastructure.data[inf]["grpc"] === "OSMRequest" && !RenderInfrastructure.blacklist.includes(inf)) {
                ret.push({
                    key: RenderInfrastructure.data[inf]["query"].split("=")[0],
                    value: RenderInfrastructure.data[inf]["query"].split("=")[1]
                });
            }
        }
        return ret;
    },
    /**                                                                            
     * Changed linestring to polygon if it is misidentified
     * @memberof Util
     * @method fixGeoJSONID
     * @param geoJSON object or collection
     * @returns {Object} geoJSON, object or full group
     */
    fixGeoJSONID: function (geoJSON) {
        if(geoJSON.features){
            geoJSON.features.forEach(feature => {
                this.fixFeatureID(feature);
            });
        }
        else{
            this.fixFeatureID(geoJSON);
        }
    },
    /**                                                                            
     * Changed linestring to polygon if it is misidentified
     * @memberof Util
     * @method fixFeatureID
     * @param {Object} feature geojson feature
     */
    fixFeatureID: function (feature) {
        if(this.getFeatureType(feature) === FEATURETYPE.lineString && JSON.stringify(feature.geometry.coordinates[0]) === JSON.stringify(feature.geometry.coordinates[feature.geometry.coordinates.length - 1])){
            feature.geometry.type = "Polygon";
            feature.geometry.coordinates = [feature.geometry.coordinates];
        }
    },
    /**                                                                            
     * Makes popup text
     * @memberof Util
     * @method createPopup
     * @param {string} id JSON data id
     * @param {object} pTObj params and tags object created with @method getParamsAndTagsFromGeoJsonFeature
     * @param {JSON} indexData (optional) custom JSON data (if you don't want to use Renderinfrastructure.data as your indexing file)
     * @returns {string} html to put in popup
     */
    createPopup: function (id, pTObj, indexData) {
        let params = pTObj.params;
        let tagsObj = pTObj.tagsObj;
        let details = "<b>" + this.capitalizeString(this.underScoreToSpace(id)) + "</b><br>";
        const datasource = indexData ? indexData : RenderInfrastructure.data;
        if (!datasource[id]['popup']) {
            details += "<ul style='padding-inline-start:20px;margin-block-start:2.5px;'>";
            params.forEach(param => details += "<li>" + this.capitalizeString(this.underScoreToSpace(param)) + ": " + this.capitalizeString(this.underScoreToSpace(tagsObj[param])) + "</li>");
            details += "</ul>";
        }
        else {
            let tokens = datasource[id]['popup'].split(" ");
            tokens.forEach(token => {
                if (token.substring(0, 2) === "@@") {
                    let to = token.substring(2).indexOf("@@"); //second @@
                    let tokenMark = tagsObj[token.substring(2, to + 2)];
                    if (tokenMark && tokenMark.length > 2) {
                        tokenMark = this.capitalizeString(tokenMark.toLowerCase());
                    }
                    details += tokenMark + token.substring(to + 4);
                }
                else {
                    details += token;
                }
                details += " ";
            });
            details = details.substring(0, details.length - 1);
        }
        return details;
    }
}

//mocha-test stuff only down from here

try {
    module.exports = {
        ATTRIBUTE: ATTRIBUTE,
        RenderInfrastructure: RenderInfrastructure,
        Querier: Querier,
        Util: Util
    }
} catch (e) { }
