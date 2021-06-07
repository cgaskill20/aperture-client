/**
* Where utility functions are
* @namespace Util
*/
import simplify from "../third-party/simplify.js";

export default {
    //enums
    FEATURETYPE: {
        point: 0,
        lineString: 1,
        polygon: 2,
        multiPolygon: 3,
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
        let latlng = [];
        if (type === this.FEATURETYPE.polygon) {
            let pos = L.latLngBounds(feature.geometry.coordinates[0]).getCenter();
            latlng.push(pos.lat);
            latlng.push(pos.lng);
        }
        else if (type === this.FEATURETYPE.multiPolygon) {
            let pos = L.latLngBounds(feature.geometry.coordinates[0][0]).getCenter();
            latlng.push(pos.lat);
            latlng.push(pos.lng);
        }
        else if (type === this.FEATURETYPE.lineString) {
            let pos = L.latLngBounds(feature.geometry.coordinates).getCenter();
            latlng.push(pos.lat);
            latlng.push(pos.lng);
        }
        else if (type === this.FEATURETYPE.point) {
            latlng = feature.geometry.coordinates;
        }
        else {
            return { lat: 0, lng: 0 };

        }
        return L.latLng(latlng[1], latlng[0]);
    },
    /**
     * What type is a GeoJSON feature?
     * @memberof Util
     * @method getFeatureType
     * @param {object} feature GeoJSON feature, a latlng point will be extracted. 
     *                         Can be a point, linestring, polygon, or multipolygon.
     * @returns {number} Enum from FEATURETYPE or -1 if not found
     */
    getFeatureType: function (feature) {
        if (feature.geometry && feature.geometry.type) {
            switch (feature.geometry.type) {
                case "MultiPolygon":
                    return this.FEATURETYPE.multiPolygon;
                case "Polygon":
                    return this.FEATURETYPE.polygon;
                case "LineString":
                    return this.FEATURETYPE.lineString;
                case "Point":
                    return this.FEATURETYPE.point;
                default:
                    return -1;
            }
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
        else if (geoJSON.geometry) {
            this.simplifyFeatureCoords(geoJSON, threshold);
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
        if (type === -1 || type === this.FEATURETYPE.point) {
            return;
        }
        if (type === this.FEATURETYPE.polygon) {
            feature.geometry.coordinates[0] = simplify(feature.geometry.coordinates[0], threshold, false);
        }
        else if (type === this.FEATURETYPE.lineString) {
            feature.geometry.coordinates = simplify(feature.geometry.coordinates, threshold, false);
        }
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
        const datasource = indexData ? indexData : window.renderInfrastructure.data;
        if (indexData) { //this is quite a bit simpler than the other way.
            return Object.keys(indexData)[0];
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
        if (str == null)
            return "noname"
        if (typeof str !== 'string')
            str = str.toString();
        return str.replace(/_/gi, " ");
    },
    /**                                                                            
     * convertsCamelCase -> to spaces.
     * @memberof Util
     * @method camelCaseToSpaced
     * @param {string} str
     * @returns {string} 
     */
    camelCaseToSpaced: function (str){
        if(str.includes(" ")) return str; //its not camel case if it has space
        let result = str.replace( /([A-Z])/g, " $1" );
        let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
        return finalResult;
    },
    /**                                                                            
     * Converts_spaces -> to underscores.
     * @memberof Util
     * @method underScoreToSpace
     * @param {string} str
     * @returns {string} 
     */
    spaceToUnderScore: function (str) {
        if (typeof str !== 'string')
            str = str.toString();
        return str.replace(/ /gi, "_");
    },
    /**                                                                            
     * Cleans up gross definitions, in general
     * @memberof Util
     * @method cleanUpString
     * @param {string} str
     * @returns {string} 
     */
    cleanUpString: function (str) {
        return this.capitalizeString(this.camelCaseToSpaced(this.underScoreToSpace(str)));
    },
    /**                                                                            
     * Creates a full geojson object from a feature array
     * @memberof Util
     * @method createGeoJsonObj
     * @param {Array} features
     * @returns {object} full geojson
     */
    createGeoJsonObj: function (features) {
        const geojson = {
            "type": "FeatureCollection",
            "features": features
        }
        return geojson;
    },
    /**                                                                            
     * Changed linestring to polygon if it is misidentified
     * @memberof Util
     * @method fixGeoJSONID
     * @param geoJSON object or collection
     * @returns {Object} geoJSON, object or full group
     */
    fixGeoJSONID: function (geoJSON) {
        if (geoJSON.features) {
            geoJSON.features.forEach(feature => {
                this.fixFeatureID(feature);
            });
        }
        else {
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
        if (this.getFeatureType(feature) === this.FEATURETYPE.lineString && JSON.stringify(feature.geometry.coordinates[0]) === JSON.stringify(feature.geometry.coordinates[feature.geometry.coordinates.length - 1])) {
            feature.geometry.type = "Polygon";
            feature.geometry.coordinates = [feature.geometry.coordinates];
        }
    },
    /**                                                                            
     * Normalizes id's to the format feature.id
     * @memberof Util
     * @method normalizeFeatureID
     * @param {Object} feature geojson feature
     */
    normalizeFeatureID: function (feature) {
        if (!feature.id && feature._id.$oid)
            feature.id = feature._id.$oid;
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
        const datasource = indexData ? indexData : window.renderInfrastructure.data;
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
    },
    /**
      * Removes properties. from name of variable
      * @memberof AutoQuery
      * @method removePropertiesPrefix
      * @param {string} str
      * @returns {string} string with truncated properties.
      */
    removePropertiesPrefix: function (str) {
        return str.substr(0, 11) === "properties." ? str.substring(11, str.length) : str; //removes a "properties." if it exists
    },
    /**
      * Turns leaflet bounds into geoJSON bounds
      * @memberof AutoQuery
      * @method eafletBoundsToGeoJSONPoly
      * @param {Leaflet Bounds} b
      * @returns {Array<Array<Number>>} geojson polygon
      */
    leafletBoundsToGeoJSONPoly: function (b) {
        return [[b._southWest.lng, b._southWest.lat], [b._southWest.lng, b._northEast.lat],
        [b._northEast.lng, b._northEast.lat], [b._northEast.lng, b._southWest.lat],
        [b._southWest.lng, b._southWest.lat]];
    },

    /**
      * Swaps the latitude and longitude of a latlng object or array.
      * @memberof Util
      * @method mirrorLatLng
      * @param {(LatLng|Array<Number>)} the LatLng object or array with latitude and longitude
      * @returns {(LatLng|Array<Number>)} the argument with the lat/lng properties switched
      */
    mirrorLatLng(latlng) {
        if (Array.isArray(latlng)) {
            return [latlng[1], latlng[0]];
        } else {
            return {
                lat: latlng.lng,
                lng: latlng.lat,
            };
        }
    },

    /** 
      * Determines if a [lng,lat] point is within a leaflet bounds object. (This is used on the worker, where the leaflet bounds objects are broken)
      * @memberof Util
      * @method contains
      * @param {Array<LngLat>} point
      * @param {Leaflet Bounds} bounds
      * @returns {boolean} if the point is within the bounds
      */
    contains(point,bounds){
        return point[0] < bounds._northEast.lng && point[0] > bounds._southWest.lng && point[1] < bounds._northEast.lat && point[1] > bounds._southWest.lat;
    },

    /** 
      * Given a list of points (in leaflet latlng form) and a leaftlet latlng
      * bounds, determine _approximately_ if at least one of the points is 
      * inside the bounds.
      * @memberof Util
      * @method arePointsApproximatelyInBounds
      * @param {Array<LatLng>} points 
      * @param {Leaflet Bounds} bounds
      * @returns {boolean} whether or not the function estimates at least one point is in the bounds
      */
    arePointsApproximatelyInBounds(points, bounds) {
        let sampleSpacing = Math.floor(points.length / 10);
        // ensure sampleSpacing is not zero, or else the bad will happen
        sampleSpacing = (sampleSpacing === 0) ? 1 : sampleSpacing;

        for (let i = 0; i < points.length; i += 1) {
            if (this.contains(points[i], bounds)) {
                return true;
            }
        }
        return false;
    },

    /** Given a single entry of GeoJSON data and a leaflet bounds object, determines
      * (approximately) if the entry's geometry intersects the bounds at all.
      * If the bounds object is null or undefined, this just returns true.
      * @memberof MapDataFilter
      * @method isInBounds
      * @param {object} entry - a single entry of GeoJSON data, as directly from the database
      * @param {(Leaflet Bounds|null)} bounds
      * @returns {boolean} true if the entry seems to intersect the bounds at all, false otherwise
      */
    isInBounds(entry, bounds) {
        if (!bounds) {
            return true;
        }

        const featureType = this.getFeatureType(entry);
        switch (featureType) {
            case this.FEATURETYPE.point: {
                let point = [entry.geometry.coordinates[1], entry.geometry.coordinates[0]];
                return this.contains(point,bounds);
            }
            case this.FEATURETYPE.polygon: {
                return this.arePointsApproximatelyInBounds(entry.geometry.coordinates[0], bounds);
            }
            case this.FEATURETYPE.multiPolygon: {
                let polygons = entry.geometry.coordinates;
                return polygons.find(polygon => this.arePointsApproximatelyInBounds(polygon[0], bounds));
            }
        }

        return false;
    },

    /** Makes random alphanumeric string
      * @memberof Util
      * @method randomString
      * @param {number} length - length of id
      * @returns {string} random string
      */
    randomString(length) {
        return Math.random().toString(36).substring(2, 2 + length)
    }
}

