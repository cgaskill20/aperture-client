/*                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/


Software in the Sustain Ecosystem are Released Under Terms of Apache Software License 

This research has been supported by funding from the US National Science Foundation's CSSI program through awards 1931363, 1931324, 1931335, and 1931283. The project is a joint effort involving Colorado State University, Arizona State University, the University of California-Irvine, and the University of Maryland - Baltimore County. All redistributions of the software must also include this information. 

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION


1. Definitions.

"License" shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.

"Licensor" shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.

"Legal Entity" shall mean the union of the acting entity and all other entities that control, are controlled by, or are under common control with that entity. For the purposes of this definition, "control" means (i) the power, direct or indirect, to cause the direction or management of such entity, whether by contract or otherwise, or (ii) ownership of fifty percent (50%) or more of the outstanding shares, or (iii) beneficial ownership of such entity.

"You" (or "Your") shall mean an individual or Legal Entity exercising permissions granted by this License.

"Source" form shall mean the preferred form for making modifications, including but not limited to software source code, documentation source, and configuration files.

"Object" form shall mean any form resulting from mechanical transformation or translation of a Source form, including but not limited to compiled object code, generated documentation, and conversions to other media types.

"Work" shall mean the work of authorship, whether in Source or Object form, made available under the License, as indicated by a copyright notice that is included in or attached to the work (an example is provided in the Appendix below).

"Derivative Works" shall mean any work, whether in Source or Object form, that is based on (or derived from) the Work and for which the editorial revisions, annotations, elaborations, or other modifications represent, as a whole, an original work of authorship. For the purposes of this License, Derivative Works shall not include works that remain separable from, or merely link (or bind by name) to the interfaces of, the Work and Derivative Works thereof.

"Contribution" shall mean any work of authorship, including the original version of the Work and any modifications or additions to that Work or Derivative Works thereof, that is intentionally submitted to Licensor for inclusion in the Work by the copyright owner or by an individual or Legal Entity authorized to submit on behalf of the copyright owner. For the purposes of this definition, "submitted" means any form of electronic, verbal, or written communication sent to the Licensor or its representatives, including but not limited to communication on electronic mailing lists, source code control systems, and issue tracking systems that are managed by, or on behalf of, the Licensor for the purpose of discussing and improving the Work, but excluding communication that is conspicuously marked or otherwise designated in writing by the copyright owner as "Not a Contribution."

"Contributor" shall mean Licensor and any individual or Legal Entity on behalf of whom a Contribution has been received by Licensor and subsequently incorporated within the Work.

2. Grant of Copyright License. Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare Derivative Works of, publicly display, publicly perform, sublicense, and distribute the Work and such Derivative Works in Source or Object form.

3. Grant of Patent License. Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable (except as stated in this section) patent license to make, have made, use, offer to sell, sell, import, and otherwise transfer the Work, where such license applies only to those patent claims licensable by such Contributor that are necessarily infringed by their Contribution(s) alone or by combination of their Contribution(s) with the Work to which such Contribution(s) was submitted. If You institute patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Work or a Contribution incorporated within the Work constitutes direct or contributory patent infringement, then any patent licenses granted to You under this License for that Work shall terminate as of the date such litigation is filed.

4. Redistribution. You may reproduce and distribute copies of the Work or Derivative Works thereof in any medium, with or without modifications, and in Source or Object form, provided that You meet the following conditions:

You must give any other recipients of the Work or Derivative Works a copy of this License; and
You must cause any modified files to carry prominent notices stating that You changed the files; and
You must retain, in the Source form of any Derivative Works that You distribute, all copyright, patent, trademark, and attribution notices from the Source form of the Work, excluding those notices that do not pertain to any part of the Derivative Works; and
If the Work includes a "NOTICE" text file as part of its distribution, then any Derivative Works that You distribute must include a readable copy of the attribution notices contained within such NOTICE file, excluding those notices that do not pertain to any part of the Derivative Works, in at least one of the following places: within a NOTICE text file distributed as part of the Derivative Works; within the Source form or documentation, if provided along with the Derivative Works; or, within a display generated by the Derivative Works, if and wherever such third-party notices normally appear. The contents of the NOTICE file are for informational purposes only and do not modify the License. You may add Your own attribution notices within Derivative Works that You distribute, alongside or as an addendum to the NOTICE text from the Work, provided that such additional attribution notices cannot be construed as modifying the License. 

You may add Your own copyright statement to Your modifications and may provide additional or different license terms and conditions for use, reproduction, or distribution of Your modifications, or for any such Derivative Works as a whole, provided Your use, reproduction, and distribution of the Work otherwise complies with the conditions stated in this License.
5. Submission of Contributions. Unless You explicitly state otherwise, any Contribution intentionally submitted for inclusion in the Work by You to the Licensor shall be under the terms and conditions of this License, without any additional terms or conditions. Notwithstanding the above, nothing herein shall supersede or modify the terms of any separate license agreement you may have executed with Licensor regarding such Contributions.

6. Trademarks. This License does not grant permission to use the trade names, trademarks, service marks, or product names of the Licensor, except as required for reasonable and customary use in describing the origin of the Work and reproducing the content of the NOTICE file.

7. Disclaimer of Warranty. Unless required by applicable law or agreed to in writing, Licensor provides the Work (and each Contributor provides its Contributions) on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied, including, without limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely responsible for determining the appropriateness of using or redistributing the Work and assume any risks associated with Your exercise of permissions under this License.

8. Limitation of Liability. In no event and under no legal theory, whether in tort (including negligence), contract, or otherwise, unless required by applicable law (such as deliberate and grossly negligent acts) or agreed to in writing, shall any Contributor be liable to You for damages, including any direct, indirect, special, incidental, or consequential damages of any character arising as a result of this License or out of the use or inability to use the Work (including but not limited to damages for loss of goodwill, work stoppage, computer failure or malfunction, or any and all other commercial damages or losses), even if such Contributor has been advised of the possibility of such damages.

9. Accepting Warranty or Additional Liability. While redistributing the Work or Derivative Works thereof, You may choose to offer, and charge a fee for, acceptance of support, warranty, indemnity, or other liability obligations and/or rights consistent with this License. However, in accepting such obligations, You may act only on Your own behalf and on Your sole responsibility, not on behalf of any other Contributor, and only if You agree to indemnify, defend, and hold each Contributor harmless for any liability incurred by, or claims asserted against, such Contributor by reason of your accepting any such warranty or additional liability. 

END OF TERMS AND CONDITIONS
*/
//Author: Daniel Reynolds
//Purpose: Get osm nodes, ways, and relations, and then translate them onto a leaflet map
//Dependencies: Leaflet, osmtogeojson, jquery, Leaflet.markerCluster, apertureUtil.js

//legacy code, this giant library is being split up into smaller, more modular libraries like autoQuery.js and geometryLoader.js.
//many functions are still useful though, and are used througout the project.
import Util from "./apertureUtil"

let intersect = false;
window.setIntersect = (i) => {
    intersect = i;
    window.refreshIntersections(true);
};

window.refreshIntersections = (switchMode = false) => {
    if (!switchMode && !intersect) {
        return;
    }
    RenderInfrastructure.refreshIntersections.forEach(refreshIntersection => refreshIntersection())
}

let intersectionNumber = {
    tracts: 0,
    counties: 0
}
window.addOrSubtractIntersectionNumber = (add = true, tract = true) => {
    let num = add ? 1 : -1;
    const key = tract ? "tracts" : "counties"
    intersectionNumber[key] += num;
}

const FLYTOOPTIONS = { //for clicking on icons
    easeLinearity: 0.4,
    duration: 0.25,
    maxZoom: 17
};
export const ATTRIBUTE = { //attribute enums
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
export default class RenderInfrastructure {
    /**
     * Sets up instance of renderer
     * @memberof RenderInfrastructure
     * @method config
     * @param {L.Map} map - Leaflet map that will have things rendered to it
     * @param {L.markerClusterGroup} markerLayer - Marker cluster that will contain markers
     * @param {JSON} data - JSON that contains needed information for renderable things
     * @param {object} options - object with attributes
     */
    constructor(map, markerLayer, layerGroup, options) {
        this.options = JSON.parse(JSON.stringify(DEFAULTOPTIONS));
        L.Util.setOptions(this, options);
        this.map = map;
        this.markerLayer = markerLayer;
        this.layerGroup = layerGroup;
        this.currentBounds = [];
        this.currentLayers = new Set();
        this.currentGISJOINLayers = {};
        this.layerIDToGISJOINMap = {};
        this.joinColor = {};
        this.bulkIntersectionUpdateMayOccur = false;
        this.idCounter = 0;
        RenderInfrastructure.refreshIntersections.push(this.updateIntersections.bind(this));
    }

    static refreshIntersections = [];

    /**
     * Renders geojson
     * @memberof RenderInfrastructure
     * @method renderGeoJson
     * @param {JSON} geoJsonData GeoJSON 
     * @param {JSON} indexData (optional) custom JSON data (if you don't want to use Renderinfrastructure.data as your indexing file)
     * @returns {Array<int>} array of integers which contain the id of added layers
     */
    renderGeoJson(geoJsonData, indexData, specifiedId = -1) {
        if (this.options.simplifyThreshold !== -1) {
            Util.simplifyGeoJSON(geoJsonData, this.options.simplifyThreshold);
        }

        Util.fixGeoJSONID(geoJsonData);
        const iconName = Util.getNameFromGeoJsonFeature(geoJsonData, indexData)
        geoJsonData.properties.apertureName = iconName;
        if (specifiedId === -1) {
            const sharedLayers = this.gisjoinUpdate(geoJsonData, indexData);
            if (sharedLayers?.length) {
                return sharedLayers;
            }
        }

        const datasource = indexData ? indexData : this.data;
        let layers = [];
        const newLayer = L.geoJson(geoJsonData, {
            style: function (feature) {
                let weight = Util.getFeatureType(feature) === Util.FEATURETYPE.lineString ? 3 : 1;
                let fillOpacity = 0.35;
                let name = Util.getNameFromGeoJsonFeature(feature, indexData);
                const colorSetter = [Util.FEATURETYPE.multiPolygon, Util.FEATURETYPE.polygon].includes(Util.getFeatureType(feature)) ? "fillColor" : "color"
                if (datasource[name] && datasource[name]["border"] !== null && datasource[name]["border"] !== undefined)
                    weight = datasource[name]["border"];
                if (datasource[name] && datasource[name]["opacity"] !== null && datasource[name]["opacity"] !== undefined)
                    fillOpacity = datasource[name]["opacity"];
                return { color: "#828282", [colorSetter]: datasource[name]["color"], weight: weight, fillOpacity: fillOpacity };
            }.bind(this),
            filter: function (feature) {
                Util.normalizeFeatureID(feature);
                let name = Util.getNameFromGeoJsonFeature(feature, indexData);
                if (this.currentLayers.has(feature.id) || this.map.getZoom() < this.options.minRenderZoom || datasource[name] == null) {
                    return false;
                }
                this.currentLayers.add(feature.id);
                if (Util.getFeatureType(feature) === Util.FEATURETYPE.point || indexData[name].iconAddr) {
                    let latlng = Util.getLatLngFromGeoJsonFeature(feature);
                    const speccedId = specifiedId !== -1 ? specifiedId : this.idCounter++;
                    const { joinField } = indexData[Object.keys(indexData)[0]]
                    let popupObj = {
                        properties: feature.properties,
                        join: { [joinField]: feature.properties[joinField] }
                    }
                    this.addIconToMap(iconName, latlng, popupObj, indexData, speccedId, feature);
                    layers.push(speccedId);
                }
                return true;
            }.bind(this),
            onEachFeature: function (feature, layer) {
                //console.log({layer})
                let latlng = Util.getLatLngFromGeoJsonFeature(feature);
                if (latlng === -1) {
                    return;
                }
                layer.specifiedId = specifiedId !== -1 ? specifiedId : this.idCounter++;
                const { joinField } = indexData[Object.keys(indexData)[0]]
                let popupObj = {
                    properties: feature.properties,
                    join: { [joinField]: feature.properties[joinField] }
                }
                //layer.bindPopup(iconDetails);
                layer.on('click', function (e) {
                    window.setPopupObj(popupObj);
                    this.map.flyTo(e.latlng, this.map.getZoom(), FLYTOOPTIONS);
                    if (datasource[iconName].onClick) {
                        datasource[iconName].onClick(this.layerGroup);
                    }
                }.bind(this));

                if (datasource[iconName].onPopupRemove) {
                    layer.getPopup().on('remove', function () {
                        datasource[iconName].onPopupRemove(this.layerGroup);
                    });
                }
                layers.push(layer.specifiedId);
            }.bind(this),
            pointToLayer: function () { }.bind(this)
        });

        if (layers.length && specifiedId === -1) {
            this.gisjoinUpdateLayer(geoJsonData, layers[0]);
        }

        newLayer.addTo(this.layerGroup);
        return layers;
    }


    gisjoinUpdate(geojson, indexData) {
        const GISJOIN = geojson?.properties?.GISJOIN;
        if (!GISJOIN) {
            return;
        }
        const oldName = Object.keys(indexData)[0];

        const colorInfo = geojson.properties.colorInfo;

        const thisRef = {
            name: oldName,
            indexData: { ...indexData },
            properties: { ...geojson.properties }
        };

        thisRef.properties.colorInfo = colorInfo;

        if (!this.currentGISJOINLayers[GISJOIN]) {
            this.currentGISJOINLayers[GISJOIN] = {
                GISJOIN,
                geojson,
                refs: [thisRef]
            };
        }

        const layer = this.currentGISJOINLayers[GISJOIN];
        layer.refs = layer.refs.filter(ref => ref.name !== thisRef.name);
        layer.refs.push(thisRef);
        if (!intersect && layer.refs.length > 1) {
            if (layer.layerID != undefined) {
                return this.refreshAfterRefsChanged(layer.layerID, layer.refs);
            }
        }
        else if (intersect) {
            if (layer.refs.length === 1) {
                layer.layerID = this.idCounter++;
                this.layerIDToGISJOINMap[layer.layerID] = GISJOIN;
            }
            //this.updateIntersections(GISJOIN);
            layer.recentUpdate = true;

            return [layer.layerID]
        }
    }

    updateIntersections(specificGISJOIN = null) {
        if (intersect) {
            console.log("Update!")
            let layersToBeRemoved = [];
            let layersToBeRefreshedMappedToRefs = {};

            const chooseLayerPath = (GISJOIN) => {
                const level = GISJOIN.length === 14 ? "tracts" : "counties";
                const layer = this.currentGISJOINLayers[GISJOIN]

                if (layer.refs.length === intersectionNumber[level]) {
                    if (layer.refs.length !== layer.recentNumRefs || layer.offMap || layer.recentUpdate) {
                        layer.offMap = false;
                        layer.recentUpdate = false;
                        layer.recentNumRefs = layer.refs.length;
                        layersToBeRefreshedMappedToRefs[layer.layerID] = layer.refs;
                    }
                }
                else if (!layer.offMap) {
                    layer.offMap = true;
                    layersToBeRemoved.push(layer.layerID)
                }
            }

            if (specificGISJOIN) {
                chooseLayerPath(specificGISJOIN)
            }
            else {
                for (const GISJOIN in this.currentGISJOINLayers) {
                    chooseLayerPath(GISJOIN)
                }
            }

            if (Object.keys(layersToBeRefreshedMappedToRefs).length) {
                console.log(`refreshing ${Object.keys(layersToBeRefreshedMappedToRefs).length} layers`)
                this.bulkRefreshAfterRefsChanged(layersToBeRefreshedMappedToRefs, false, true);
            }

            if (layersToBeRemoved.length) {
                this.removeSpecifiedLayersFromMap(layersToBeRemoved, null, true);
            }
        }
        else {
            const layersToBeRefreshedMappedToRefs = Object.values(this.currentGISJOINLayers).reduce((acc, curr) => {
                curr.offMap = undefined;
                acc[curr.layerID] = curr.refs;
                return acc;
            }, {})
            this.bulkRefreshAfterRefsChanged(layersToBeRefreshedMappedToRefs, false, true);
        }
    }

    refsToProperties(refs) {
        return refs.reduce((acc, curr) => {
            return {
                ...acc,
                ...curr.properties,
                apertureName: `${acc.apertureName ? `${acc.apertureName} ∩` : ''} ${curr.properties.apertureName}`,
                meta: { ...acc.meta, ...curr.properties.meta },
                colorInfo: {
                    ...acc.colorInfo, ...curr.properties.colorInfo,
                    validColorFieldNames: [...acc?.colorInfo?.validColorFieldNames, ...curr.properties.colorInfo.validColorFieldNames],
                    subscribeToColorFieldChange: (func, unsubscribe = false) => {
                        curr.properties.colorInfo.subscribeToColorFieldChange(func, unsubscribe);
                        acc.colorInfo.subscribeToColorFieldChange(func, unsubscribe)
                    },
                    updateColorFieldName: (name, predefinedColor, dontRerender) => {
                        curr.properties.colorInfo.updateColorFieldName(name, predefinedColor, dontRerender);
                        acc.colorInfo.updateColorFieldName(name, predefinedColor, dontRerender)
                    },
                    colorSummary: (currentColorFieldName) => {
                        if (curr.properties.colorInfo.validColorFieldNames.includes(currentColorFieldName)) {
                            //console.log(currentColorFieldName)
                            return curr.properties.colorInfo.colorSummary();
                        }
                        return acc.colorInfo.colorSummary(currentColorFieldName);
                    },
                    currentColorField: acc.colorInfo.currentColorField,
                    getColor: (properties, featureType) => {
                        return curr.properties.colorInfo.getColor(properties, featureType) ?? acc.colorInfo.getColor(properties, featureType)
                    }
                }
            }
        }, {
            colorInfo: {
                validColorFieldNames: [],
                subscribeToColorFieldChange: () => { },
                updateColorFieldName: () => { },
                colorSummary: () => { },
                currentColorField: refs[0].properties.colorInfo.currentColorField,
                getColor: () => { }
            }
        });
    }

    bulkRefreshAfterRefsChanged(refsIDMap, deletion = false, patchHoles = false) {
        const layersToUpdate = this.getLayersForSpecifiedIds(new Set(Object.keys(refsIDMap).map(specifiedIdString => Number(specifiedIdString))));

        let idsFound = new Set();
        for (const layerToUpdate of layersToUpdate) {
            const refs = refsIDMap[layerToUpdate.specifiedId];
            idsFound.add(layerToUpdate.specifiedId)
            const properties = this.refsToProperties(refs);
            this.refreshIndividualLayer(layerToUpdate, properties, deletion)
        }

        if (patchHoles) {
            const idsWithoutLayers = Object.keys(refsIDMap)
                .map(id => Number(id))
                .filter(id => !idsFound.has(id));

            let newRefsIDMap = {};
            for (const idWithoutLayer of idsWithoutLayers) {
                const gisjoinLayerWithoutMapLayer = this.currentGISJOINLayers[this.layerIDToGISJOINMap[idWithoutLayer]];
                this.renderGeoJson(gisjoinLayerWithoutMapLayer.geojson, gisjoinLayerWithoutMapLayer.refs[0].indexData, gisjoinLayerWithoutMapLayer.layerID);
                newRefsIDMap[gisjoinLayerWithoutMapLayer.layerID] = gisjoinLayerWithoutMapLayer.refs;
            }
            if (Object.keys(newRefsIDMap).length) {
                this.bulkRefreshAfterRefsChanged(newRefsIDMap)
            }
        }
    }

    refreshAfterRefsChanged(layerID, refs, deletion = false) {
        const properties = this.refsToProperties(refs);
        const layersToUpdate = this.getLayersForSpecifiedIds(new Set([layerID]));
        let sharedLayers = layersToUpdate.map(layerToUpdate => layerToUpdate.specifiedId)
        for (const layerToUpdate of layersToUpdate) {
            this.refreshIndividualLayer(layerToUpdate, properties, deletion);
        }
        return sharedLayers;
    }

    refreshIndividualLayer(layerToUpdate, properties, deletion = false) {
        if (deletion) {
            for (const key in layerToUpdate.feature.properties) {
                delete layerToUpdate.feature.properties[key]
            }
        }
        const shouldUpdateColor = layerToUpdate?.feature?.properties?.colorInfo?.currentColorField?.name !== properties.colorInfo.currentColorField.name;
        Object.assign(layerToUpdate.feature.properties, properties)
        if (shouldUpdateColor) {
            const { colorInfo } = layerToUpdate.feature.properties;
            const color = colorInfo.getColor(layerToUpdate.feature.properties, Util.getFeatureType(layerToUpdate.feature))
            color && layerToUpdate.feature.properties.colorInfo.updateColorFieldName(layerToUpdate.feature.properties.colorInfo.currentColorField.name, null, true)
            //console.log("SETTING INLINE")
            color && layerToUpdate.setStyle({ fillColor: color });
        }
        window.forceUpdateObj(layerToUpdate.feature.properties)
    }

    gisjoinUpdateLayer(geojson, layerID) {
        const GISJOIN = geojson?.properties?.GISJOIN;
        if (!GISJOIN) {
            return;
        }
        const layer = this.currentGISJOINLayers[GISJOIN];
        layer.layerID = layerID;
        this.layerIDToGISJOINMap[layer.layerID] = GISJOIN;
    }

    removeRefs(specifiedIdsSet, collectionName) {
        console.log("removing refs")
        console.log({specifiedIdsSet})
        let layersToBeRemoved = new Set();
        let hadRefs = false;
        const refsIDMap = {};
        for (const [joinField, layer] of Object.entries(this.currentGISJOINLayers)) {
            if (specifiedIdsSet.has(layer.layerID)) {
                hadRefs = true;
                layer.refs = layer.refs.filter(ref => ref.name !== collectionName);
                if (!layer.refs.length) {
                    delete this.currentGISJOINLayers[joinField]
                    layersToBeRemoved.add(layer.layerID)
                    //this.removeSpecifiedLayersFromMap([layer.layerID], collectionName, true);
                    continue;
                }

                refsIDMap[layer.layerID] = layer.refs;
            }
        }
        this.bulkRefreshAfterRefsChanged(refsIDMap, true);
        return { hadRefs, layersToBeRemoved };
    }

    /**
     * Adds icon to map
     * @memberof RenderInfrastructure
     * @method addIconToMap
     * @param {string} iconName defines the bit of the JSON the icon will pull from
     * @param {Array} latLng latlng array where the icon will be put
     * @param {string} obj the content that will display for this element when clicked, accepts HTML formatting
     */
    addIconToMap(iconName, latLng, obj, indexData, specifiedId, feature) {
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
        marker.feature = feature;
        this.markerLayer.addLayer(marker.on('click', function (e) {
            window.setPopupObj(obj);
            if (e.target.__parent._group._spiderfied)
                return;
            this.map.flyTo(e.latlng, this.map.getZoom(), FLYTOOPTIONS);
        }.bind(this)));
        return true;
    }

    /**
     * Removes a feature id from the map
     * @memberof RenderInfrastructure
     * @method removeFeatureFromMap
     * @param {Array<int>} specifiedIds
     * @returns {boolean} true if ids were removed
     */
    removeSpecifiedLayersFromMap(specifiedIds, collectionName = null, dontRemoveRefs = false) {
        let specifiedIdsSet = new Set(specifiedIds)

        if (!dontRemoveRefs) {
            const refRemovalResult = this.removeRefs(specifiedIdsSet, collectionName);
            if (refRemovalResult.layersToBeRemoved.size) {
                specifiedIdsSet = refRemovalResult.layersToBeRemoved;
            }
            else if (refRemovalResult.hadRefs) {
                return true;
            }
        }
        const markerLayers = this.getMarkerLayersForSpecifiedIds(specifiedIdsSet)
        for (const markerLayer of markerLayers) {
            this.markerLayer.removeLayer(markerLayer);
        }
        const mapLayers = this.getMapLayersForSpecifiedIds(specifiedIdsSet);
        for (const mapLayer of mapLayers) {
            this.layerGroup.removeLayer(mapLayer);
        }
        const removedLayerIds = new Set([
            ...markerLayers.map(markerLayer => markerLayer?.feature?.id),
            ...mapLayers.map(mapLayer => mapLayer.getLayers()[0]?.feature?.id)
        ]);
        this.currentLayers = new Set([...this.currentLayers].filter(layerId => !removedLayerIds.has(layerId)))
        return true;
    }

    getLayersForSpecifiedIds(specifiedIdsSet) {
        let layersFound = this.getMarkerLayersForSpecifiedIds(specifiedIdsSet)
        layersFound = [...layersFound, ...this.getMapLayersForSpecifiedIds(specifiedIdsSet).map(layer => layer.getLayers()[0])]
        return layersFound;
    }

    getMarkerLayersForSpecifiedIds(specifiedIdsSet) {
        let layersFound = [];
        this.markerLayer.eachLayer(function (layer) {
            if (layer?.specifiedId && specifiedIdsSet.has(layer.specifiedId)) {
                layersFound.push(layer)
            }
        }.bind(this));
        return layersFound;
    }

    getMapLayersForSpecifiedIds(specifiedIdsSet) {
        let layersFound = [];
        this.layerGroup.eachLayer(function (layer) {
            const subLayer = layer.getLayers()[0];
            if (subLayer?.feature && specifiedIdsSet.has(subLayer?.specifiedId)) {
                layersFound.push(layer);
            }
        }.bind(this));
        return layersFound;
    }

    /**
     * Removes all features from the map
     * @memberof RenderInfrastructure
     * @method removeAllFeaturesFromMap
     * @returns {boolean} true if successful, there will be an error otherwise
     */
    removeAllFeaturesFromMap() {
        if (this.markerLayer)
            this.markerLayer.eachLayer(function (layer) {
                this.markerLayer.removeLayer(layer);
            }.bind(this));
        this.layerGroup.eachLayer(function (layer) {
            const subLayer = layer.getLayers()[0];
            if (!subLayer)
                return;
            if (subLayer.feature) {
                this.layerGroup.removeLayer(layer);
            }
        }.bind(this));
        this.currentLayers = new Set();
        return true;
    }

    /**                                                                            
     * Creates a leaflet icon from an image address.
     * @memberof Util
     * @method makeIcon
     * @param {string} address
     * @returns {object} leaflet icon
     */
    makeIcon(address, color) {
        const iconHTML = document.createElement('img')
        const iconMargin = 6;
        const iconSize = 40;
        const iconOffSet = (iconSize - (iconMargin * 2)) / 2
        iconHTML.setAttribute('src', address);
        iconHTML.setAttribute('width', iconSize)
        iconHTML.setAttribute('height', iconSize)
        iconHTML.style.padding = `${iconMargin}px`
        iconHTML.style.backgroundColor = color ?? 'white';
        iconHTML.style.transform = `translate(-${iconOffSet}px, -${iconOffSet}px)`
        iconHTML.style.borderRadius = `${iconSize / 2}px`

        const icon = new L.DivIcon({
            className: '',
            html: iconHTML
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
        if (datasource && datasource[tag]) {
            if (attribute == ATTRIBUTE.color) {
                if (datasource[tag]["color"]) {
                    return datasource[tag]["color"];
                }
            }
            else {
                if (datasource[tag]["iconAddr"]) {
                    return this.makeIcon(datasource[tag]["iconAddr"], indexData[Object.keys(indexData)[0]].color ?? 'white');
                }
            }
        }
        if (attribute == ATTRIBUTE.color) {
            return "#000000";
        }
        else {
            return "noicon";
        }
    }
}
