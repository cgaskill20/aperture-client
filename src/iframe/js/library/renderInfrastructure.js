//Author: Daniel Reynolds
//Purpose: Get osm nodes, ways, and relations, and then translate them onto a leaflet map
//Dependencies: Leaflet, osmtogeojson, jquery, Leaflet.markerCluster, apertureUtil.js

//legacy code, this giant library is being split up into smaller, more modular libraries like autoQuery.js and geometryLoader.js.
//many functions are still useful though, and are used througout the project.

const FLYTOOPTIONS = { //for clicking on icons
    easeLinearity: 0.4,
    duration: 0.25,
    maxZoom: 17
};
const ATTRIBUTE = { //attribute enums
    icon: 'icon',
    color: 'color'
}
const DEFAULTOPTIONS = {
    maxElements: 5000,
    maxLayers: 10,
    minRenderZoom: 0,
    queryAlertText: null,
    iconSize: [25, 25],
    simplifyThreshold: -1
};

/**
 * Where the Rendering/Management related functions are
 * @namespace RenderInfrastructure
*/
class RenderInfrastructure {
    /**
     * Sets up instance of renderer
     * @memberof RenderInfrastructure
     * @method config
     * @param {L.Map} map - Leaflet map that will have things rendered to it
     * @param {L.markerClusterGroup} markerLayer - Marker cluster that will contain markers
     * @param {JSON} data - JSON that contains needed information for renderable things
     * @param {object} options - object with attributes
     */
    constructor (map, markerLayer, layerGroup, options) { //basically a constructor
        this.options = JSON.parse(JSON.stringify(DEFAULTOPTIONS));
        L.Util.setOptions(this, options);
        this.map = map;
        this.markerLayer = markerLayer;
        this.layerGroup = layerGroup;
        this.currentBounds = [];
        this.currentLayers = [];
        this.idCounter = 0;
    }

    /**
     * Renders geojson
     * @memberof RenderInfrastructure
     * @method renderGeoJson
     * @param {JSON} geoJsonData GeoJSON 
     * @param {JSON} indexData (optional) custom JSON data (if you don't want to use Renderinfrastructure.data as your indexing file)
     * @returns {Array<int>} array of integers which contain the id of added layers
     */
    renderGeoJson(geoJsonData, indexData) {
        if (this.options.simplifyThreshold !== -1) {
            Util.simplifyGeoJSON(geoJsonData, this.options.simplifyThreshold);
        }
        Util.fixGeoJSONID(geoJsonData);
        const datasource = indexData;
        let layers = [];
        const newLayer = L.geoJson(geoJsonData, {
            style: function (feature) {
                let weight = 3;
                let fillOpacity = 0.2;
                let name = Util.getNameFromGeoJsonFeature(feature, indexData);
                if (datasource[name] && datasource[name]["border"]) {
                    weight = datasource[name]["border"];
                    fillOpacity = 0.2;
                }
                return { color: datasource[name]["color"], weight: weight, fillOpacity: fillOpacity };
            }.bind(this),
            filter: function (feature) {
                Util.normalizeFeatureID(feature);
                let name = Util.getNameFromGeoJsonFeature(feature, indexData);
                if (this.currentLayers.includes(feature.id) || this.map.getZoom() < this.options.minRenderZoom || datasource[name] == null) {
                    return false;
                }
                this.currentLayers.push(feature.id);
                return true;
            }.bind(this),
            onEachFeature: function (feature, layer) {
                latlng = Util.getLatLngFromGeoJsonFeature(feature);
                if (latlng === -1) {
                    return;
                }
                layer.specifiedId = this.idCounter++;
                let iconName = Util.getNameFromGeoJsonFeature(feature, indexData);
                let iconDetails = Util.createDetailsFromGeoJsonFeature(feature, iconName, indexData);
                this.addIconToMap(iconName, latlng, iconDetails, indexData, layer.specifiedId);
                layer.bindPopup(iconDetails);
                layer.on('click', function (e) {
                    this.map.flyTo(e.latlng, this.map.getZoom(), FLYTOOPTIONS);
                    if(datasource[iconName].onClick){
                        datasource[iconName].onClick(this.layerGroup);
                    }
                }.bind(this));

                if(datasource[iconName].onPopupRemove){
                    layer.getPopup().on('remove', function() {
                        datasource[iconName].onPopupRemove(this.layerGroup);
                    });
                }
                layers.push(layer.specifiedId);
            }.bind(this),
            pointToLayer: function () {
                return L.marker([0, 0], {
                    opacity: 0
                });
            }.bind(this)
        })
        newLayer.addTo(this.layerGroup);
        return layers;
    }

    /**
     * Adds icon to map
     * @memberof RenderInfrastructure
     * @method addIconToMap
     * @param {string} iconName defines the bit of the JSON the icon will pull from
     * @param {Array} latLng latlng array where the icon will be put
     * @param {string} popUpContent the content that will display for this element when clicked, accepts HTML formatting
     */
    addIconToMap (iconName, latLng, popUpContent, indexData, specifiedId) {
        let icon = this.getAttribute(iconName, ATTRIBUTE.icon, indexData)
        if (!icon || icon === "noicon") {
            return false;
        }
        let marker = L.marker(latLng, {
            icon: icon,
            opacity: 1
        });
        marker.uniqueId = iconName;
        marker.specifiedId = specifiedId;
        this.markerLayer.addLayer(marker.on('click', function (e) {
            if (e.target.__parent._group._spiderfied) 
                return;
            this.map.flyTo(e.latlng, RenderInfrastructure.map.getZoom(), FLYTOOPTIONS);
        }.bind(this)).bindPopup(popUpContent));
        return true;
    }

    /**
     * Removes a feature id from the map
     * @memberof RenderInfrastructure
     * @method removeFeatureFromMap
     * @param {Array<int>} specifiedIds id which should be removed from map, ex: 'dam' or 'weir'
     * @returns {boolean} true if ids were removed
     */
    removeSpecifiedLayersFromMap(specifiedIds) {
        this.markerLayer.eachLayer(function (layer) {
            if (layer.specifiedId !== null && specifiedIds.includes(layer.specifiedId)) {
                this.markerLayer.removeLayer(layer);
            }
        }.bind(this));
        this.layerGroup.eachLayer(function (layer) {
            const subLayer = layer.getLayers()[0];
            if(!subLayer)
                return;
            if (subLayer.feature && specifiedIds.includes(subLayer.specifiedId)) {
                this.currentLayers.splice(this.currentLayers.indexOf(subLayer.feature.id), 1);
                this.layerGroup.removeLayer(layer);
            }
        }.bind(this));
        return true;
    }

    /**
     * Removes all features from the map
     * @memberof RenderInfrastructure
     * @method removeAllFeaturesFromMap
     * @returns {boolean} true if successful, there will be an error otherwise
     */
    removeAllFeaturesFromMap () {
        this.markerLayer.eachLayer(function (layer) {
            this.markerLayer.removeLayer(layer);
        }.bind(this));
        this.layerGroup.eachLayer(function (layer) {
            const subLayer = layer.getLayers()[0];
            if(!subLayer)
                return;
            if (subLayer.feature) {
                console.log(layer);
                this.layerGroup.removeLayer(layer);
            }
        }.bind(this));
        this.currentLayers = [];
        return true;
    }
    
    /**                                                                            
     * Creates a leaflet icon from an image address.
     * @memberof Util
     * @method makeIcon
     * @param {string} address
     * @returns {object} leaflet icon
     */
    makeIcon(address) {
        const icon = new L.Icon({
            iconUrl: address,
            iconSize: this.options.iconSize
        });
        return icon;
    }

    /**
     * Cleans up elements outside of the current viewportX2
     * @memberof RenderInfrastructure
     * @method getAttribute
     * @param {string} id to get from the data JSON
     * @param {number} attribute options defined in the ATTRIBUTE enum
     * @returns {string} either a address to an icon or a hex color string
     */
    getAttribute(tag, attribute, indexData) {
        const datasource = indexData;
        if (datasource) {
            if (datasource[tag]) {
                if (attribute == ATTRIBUTE.color) {
                    if (datasource[tag]["color"]) {
                        return datasource[tag]["color"];
                    }
                }
                else {
                    if (datasource[tag]["iconAddr"]) {
                        return this.makeIcon(datasource[tag]["iconAddr"]);
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

//mocha-test stuff only down from here

try {
    module.exports = {
        ATTRIBUTE: ATTRIBUTE,
        RenderInfrastructure: RenderInfrastructure
    }
} catch (e) { }
