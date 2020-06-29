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
    commonTagNames: ["streamflow", "waterway", "man_made", "landuse", "water", "amenity", "natural"],
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
    options: JSON.parse(JSON.stringify(DEFAULTOPTIONS)),
    /**
     * Sets up instance of renderer
     * @memberof RenderInfrastructure
     * @alias RenderInfrastructure.config
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
        this.blacklist = [];
        this.queries = Util.jsonToQueryList(this.data);
    },
    /**
     * Call this when the map should be updated
     * @memberof RenderInfrastructure
     */
    update: function () {
        if (!this.map || this.queries.length == 0 || this.options.minRenderZoom < this.map.currentZoom) {
            Util.refreshInfoPopup();
            return;
        }
        let customQueryBounds = [];
        let bounds = Util.Convert.leafletBoundsToNESWObject(this.map.getBounds());
        let usefulQueries = Querier.createOverpassQueryList(this.queries, bounds);
        if (usefulQueries) {
            usefulQueries.forEach(query => {
                Querier.queryGeoJsonFromServer(query.query, query.bounds, true, RenderInfrastructure.renderGeoJson);
                customQueryBounds.push(query.bounds);
            });
        }
        //pan loading bit
        bounds = Util.expandBounds(bounds);
        usefulQueries = Querier.createOverpassQueryList(this.queries, bounds);
        if (usefulQueries) {
            usefulQueries.forEach(query => {
                Querier.queryGeoJsonFromServer(query.query, query.bounds, true, RenderInfrastructure.renderGeoJson);
                customQueryBounds.push(query.bounds);
            });
        }
        this.updateCustom(this.queries, customQueryBounds);
    },
    updateCustom: function (queries, bounds) {
        queries.forEach(query => {
            let url = Util.queryToQueryURL(query);
            if (url) {
                bounds.forEach(bound => {
                    //console.log(Querier.createCustomQueryURL(url, bound));
                    Querier.queryGeoJsonFromServer(Querier.createCustomQueryURL(url, bound), bound, false, RenderInfrastructure.renderGeoJson);
                });
            }
        });
    },
    renderGeoJson: function (geoJsonData, preProcessed) {
        if (RenderInfrastructure.options.simplifyThreshold !== -1) {
            Util.simplifyGeoJSON(geoJsonData, RenderInfrastructure.options.simplifyThreshold);
        }
        let preProcess = [];
        let resultLayer = L.geoJson(geoJsonData, {
            style: function (feature) {
                let type = Util.getFeatureType(feature);
                let weight = 3;
                let fillOpacity = 0.2;
                let name = Util.getNameFromGeoJsonFeature(feature);
                if (RenderInfrastructure.data[name] && RenderInfrastructure.data[name]["noBorder"]) {
                    weight = 0;
                    fillOpacity = 0.75;
                }
                return { color: RenderInfrastructure.getAttribute(name, ATTRIBUTE.color), weight: weight, fillOpacity: fillOpacity };
            },
            filter: function (feature) {
                let name = Util.getNameFromGeoJsonFeature(feature);
                if (RenderInfrastructure.currentLayers.includes(feature.id) || RenderInfrastructure.map.getZoom() < RenderInfrastructure.options.minRenderZoom || RenderInfrastructure.blacklist.includes(name) || RenderInfrastructure.data[name] == null) {
                    return false;
                }
                if (RenderInfrastructure.data[name]["preProcess"] && !preProcessed) {
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
                let iconName = Util.getNameFromGeoJsonFeature(feature);
                let iconDetails = Util.createDetailsFromGeoJsonFeature(feature, iconName);
                RenderInfrastructure.addIconToMap(iconName, latlng, iconDetails);
                layer.bindPopup(iconDetails);
                layer.on('click', function (e) {
                    RenderInfrastructure.map.flyToBounds(layer.getBounds(), FLYTOOPTIONS);
                });
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
        return resultLayer;
    },
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
     * @alias RenderInfrastructure.removeFeatureFromMap
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
        this.currentBounds = [Util.Convert.leafletBoundsToNESWObject(this.map.getBounds())];
        return true;
    },
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
     * @alias Querier.queryGeoJsonFromServer
     * @param {string} queryURL URL where geoJSON/Osm Xml is
     * @param {object} bounds (not necessary when using this function by itself) bounds object like: {north:?,east:?,south:?,west:?}
     * @param {boolean} isOsmData is the url going to return OSM Xml data? (such as overpass queries)
     * @param {Function} callbackFn where the geoJSON will be sent on return, should be a 1-parameter function
     */
    queryGeoJsonFromServer: async function (queryURL, bounds, isOsmData, callbackFn) {
        this.removeUnnecessaryQueries();
        let query = $.getJSON(queryURL, function (dataAsJson) {
            for (let i = 0; i < RenderInfrastructure.currentQueries.length; i++) {
                if (RenderInfrastructure.currentQueries[i].query === query) {
                    RenderInfrastructure.currentQueries.splice(i, 1)
                    break;
                }
            }
            if (RenderInfrastructure.currentLayers.length > 5000) {
                RenderInfrastructure.cleanupMap();
            }
            else if (RenderInfrastructure.currentBounds.length > 10) {
                RenderInfrastructure.currentBounds = [Util.Convert.leafletBoundsToNESWObject(RenderInfrastructure.map.getBounds())];
            }
            if (isOsmData) {
                RenderInfrastructure.currentBounds.push(bounds);
                callbackFn(osmtogeojson(dataAsJson));
            }
            else {
                callbackFn(dataAsJson);
            }
        });
        RenderInfrastructure.currentQueries.push({ query: query, bounds: bounds });
        if (isOsmData) Util.refreshInfoPopup();
    },
    removeUnnecessaryQueries: function () {
        for (let i = 0; i < RenderInfrastructure.currentQueries.length; i++) {
            let bound = Util.Convert.leafletBoundsToNESWObject(RenderInfrastructure.map.getBounds());
            bound = Util.expandBounds(bound);
            if (Util.boundsAreOutsideOfBounds(RenderInfrastructure.currentQueries[i].bounds, bound)) {
                RenderInfrastructure.currentQueries[i].query.abort();
                RenderInfrastructure.currentQueries.splice(i, 1);
                i--;
            }
        }
    },
    createOverpassQueryList: function (queryList, queryBounds) {
        let boundsToQuery = [];
        if ((RenderInfrastructure.currentBounds.length == 0 && RenderInfrastructure.currentQueries.length == 0)) {
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
        let queries = [];
        for (let i = 0; i < boundsToQuery.length; i++) {
            queries.push({
                query: this.createOverpassQueryURL(queryList, boundsToQuery[i], 111),
                bounds: boundsToQuery[i]
            });
        }
        return queries;
    },
    /**
     * Creates a overpass query URL 
     * @memberof Querier
     * @alias Querier.createOverpassQueryURL
     * @param {Array<string>} queryList list of queries ex: ['waterway=dam','natural=lake']
     * @param {object} bounds bounds object in the form: {north:?,east:?,south:?,west:?}, which states WHERE to query
     * @param {number} node_way_relation binary choice for node,way,relation -- ex:111 = nodes, ways, AND relations -- 101 = nodes AND relations -- 100 = nodes only
     * @returns {string} a valid overpass URL
     */
    createOverpassQueryURL: function (queryList, bounds, node_way_relation) {
        let queryFString = '';
        let boundsString = Util.Convert.createOverpassBoundsString(bounds);
        let nWR = Util.binaryToBool(node_way_relation);
        for (let i = 0; i < queryList.length; i++) {
            if (queryList[i].split('=')[0] === 'custom' || RenderInfrastructure.blacklist.includes(queryList[i].split('=')[1])) {
                continue; //skip if its a custom query and not a osm query, or if blacklisted
            }
            query = queryList[i].replace(/ /g, ''); //remove whitespace
            if (nWR.node) {
                queryFString += 'node[' + query + '](' + boundsString + ');';
            }
            if (nWR.way) {
                queryFString += 'way[' + query + '](' + boundsString + ');';
            }
            if (nWR.relation) {
                queryFString += 'relation[' + query + '](' + boundsString + ');';
            }
        }
        return RenderInfrastructure.options.overpassInterpreter + '?data=[out:json][timeout:' + RenderInfrastructure.options.timeout + '];(' + queryFString + ');out body geom;';
    },
    preProcessQuery: function (features) {
        if (features.length == 0) {
            return;
        }
        if (!RenderInfrastructure.preProcessData) {
            RenderInfrastructure.renderGeoJson(Util.createGeoJsonObj(features), true);
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
                //console.log(JSON.stringify(feature) + "--");
                feature.properties.tags.streamflow = "streamflowData";
                if (stations.length === 1) {
                    feature.station = stations[i];
                    feature.properties.tags.strflowGeohash = stations[i].geohash;
                    splitHits.push(feature);
                    break;
                }
                let minDist = 99999.99999;
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
                //console.log(feature.geometry.coordinates);
                hits[j].feature.geometry.coordinates = newCoords;
                feature.station = stations[i];
                feature.properties.tags.strflowGeohash = stations[i].geohash;
                splitHits.push(feature);
            }
        }
        RenderInfrastructure.renderGeoJson(Util.createGeoJsonObj(splitHits), true);
        RenderInfrastructure.renderGeoJson(Util.createGeoJsonObj(misses), true);
    },
    createCustomQueryURL: function (URL, bounds) {
        return URL.replace('{{BOUNDS}}', bounds.west + '%2C' + bounds.south + '%2C' + bounds.east + '%2C' + bounds.north);
    }
}

const Util = {
    Convert: {
        leafletBoundsToNESWObject: function (leafletBounds) {
            return {
                north: leafletBounds.getNorth(),
                east: leafletBounds.getEast(),
                south: leafletBounds.getSouth(),
                west: leafletBounds.getWest()
            };
        },
        createOverpassBoundsString: function (bounds) {
            return bounds.south + ',' + bounds.west + ',' + bounds.north + ',' + bounds.east;
        }
    },
    boundsAreWithinBounds: function (boundsToCheck, boundsToCheckAgainst) {
        return boundsToCheckAgainst.north >= boundsToCheck.north && boundsToCheckAgainst.south <= boundsToCheck.south && boundsToCheckAgainst.west <= boundsToCheck.west && boundsToCheckAgainst.east >= boundsToCheck.east;
    },
    boundsAreOutsideOfBounds: function (boundsToCheck, boundsToCheckAgainst) {
        return boundsToCheck.east < boundsToCheckAgainst.west || boundsToCheck.west > boundsToCheckAgainst.east || boundsToCheck.south > boundsToCheckAgainst.north || boundsToCheck.north < boundsToCheckAgainst.south;
    },
    pointIsWithinBounds: function (latLngPoint, boundsToCheckAgainst) {
        if (latLngPoint == null) {
            return true;
        }
        return latLngPoint.lng > boundsToCheckAgainst.west && latLngPoint.lat > boundsToCheckAgainst.south && latLngPoint.lng < boundsToCheckAgainst.east && latLngPoint.lat < boundsToCheckAgainst.north;
    },
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
    simplifyGeoJSON: function (geoJSON, threshold) {
        if (geoJSON.features) {
            geoJSON.features.forEach(feature => {
                this.simplifyFeatureCoords(feature, threshold);
            });
        }
    },
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
    subtractBoundsFromList: function (boundsListToEdit, boundsToRemove) {
        let tempBoundsList = [];
        for (let k = 0; k < boundsListToEdit.length; k++) {
            tempBoundsList = tempBoundsList.concat(this.subtractBounds(boundsListToEdit[k], boundsToRemove));
        }
        return tempBoundsList;
    },
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
    expandBounds: function (bounds) {
        return {
            north: bounds.north + (bounds.north - bounds.south),
            south: bounds.south - (bounds.north - bounds.south),
            east: bounds.east + (bounds.east - bounds.west),
            west: bounds.west - (bounds.east - bounds.west)
        };
    },
    getNameFromGeoJsonFeature: function (feature) {
        let pTObj = this.getParamsAndTagsFromGeoJsonFeature(feature);
        let params = pTObj.params;
        let tagsObj = pTObj.tagsObj;
        for (let j = 0; j < RenderInfrastructure.options.commonTagNames.length; j++) {
            for (let i = 0; i < params.length; i++) {
                if (RenderInfrastructure.options.commonTagNames[j] == params[i]) {
                    if (!RenderInfrastructure.options.blacklistedTagValues.includes(tagsObj[params[i]])) {
                        return tagsObj[params[i]];
                    }
                }
            }
        }
        for (element in RenderInfrastructure.data) {
            if (RenderInfrastructure.data[element]["identityField"]) {
                for (let i = 0; i < params.length; i++) {
                    if (params[i] == RenderInfrastructure.data[element]["identityField"]) {
                        if (RenderInfrastructure.data[element]["identityKey"]) {
                            if (tagsObj[params[i]] == RenderInfrastructure.data[element]["identityKey"]) {
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
    createDetailsFromGeoJsonFeature: function (feature, name) {
        let pTObj = this.getParamsAndTagsFromGeoJsonFeature(feature);
        return this.createPopup(name, pTObj);
    },
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
    capitalizeString: function (str) {
        if (str == null || str.length == 0) {
            return "";
        }
        str = str.split(" ");
        for (var i = 0, x = str.length; i < x; i++) {
            if (str[i] == null || str[i].length <= 1) {
                continue;
            }
            str[i] = str[i][0].toUpperCase() + str[i].substr(1);
        }
        return str.join(" ");
    },
    underScoreToSpace: function (str) {
        if (str == null) {
            return "noname"
        }
        if (typeof str !== 'string') {
            str = str.toString();
        }
        return str.replace(/_/gi, " ");
    },
    makeIcon: function (address) {
        icon = new L.Icon({
            iconUrl: address,
            iconSize: RenderInfrastructure.options.iconSize
        });
        return icon;
    },
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
    jsonToQueryList: function (json) {
        let ret = [];
        for (e in json) {
            if (json[e]['defaultRender'] && json[e]['query']) {
                ret.push(json[e]['query']);
            }
        }
        return ret;
    },
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
    dist2d: function (p1, p2) { //p2 latlng array is reversed
        return Math.pow(p1[0] - p2[1], 2) + Math.pow(p1[1] - p2[0], 2);
    },
    queryToQueryURL: function (query) {
        if (!RenderInfrastructure.data) {
            return;
        }
        for (x in RenderInfrastructure.data) {
            //console.log(RenderInfrastructure.data[x]["query"]);
            if (RenderInfrastructure.data[x]["query"] && RenderInfrastructure.data[x]["query"] === query && RenderInfrastructure.data[x]["queryURL"]) {
                return RenderInfrastructure.data[x]["queryURL"];
            }
        }
    },
    createPopup: function (id, pTObj) {
        let params = pTObj.params;
        let tagsObj = pTObj.tagsObj;
        let details = "<b>" + this.capitalizeString(this.underScoreToSpace(id)) + "</b><br>";
        if (!RenderInfrastructure.data[id]['popup']) {
            details += "<ul style='padding-inline-start:20px;margin-block-start:2.5px;'>";
            params.forEach(param => details += "<li>" + this.capitalizeString(this.underScoreToSpace(param)) + ": " + this.capitalizeString(this.underScoreToSpace(tagsObj[param])) + "</li>");
            details += "</ul>";
        }
        else {
            let tokens = RenderInfrastructure.data[id]['popup'].split(" ");
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