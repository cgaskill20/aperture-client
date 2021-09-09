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
import React, { Component } from 'react';
const e = React.createElement;
import ModelCollection from "./ModelCollection";
import ModelParameter from "./ModelParameter";
import ModelResolution from "./ModelResolution";
import Util from "../../../library/apertureUtil";
import { sustain_querier } from "../../../grpc/GRPC_Querier/grpc_querier.js";
import ClusterManager from "../../../model-managers/clusterManager"
import RegressionManager from "../../../model-managers/regressionManager"
import Query from "../../../library/Query"

export default class ModelMenu extends React.Component {
    constructor(props) {
        super(props);

        this.onCategoryChange = this.onCategoryChange.bind(this)
        this.onTypeChange = this.onTypeChange.bind(this)
        this.setParameter = this.setParameter.bind(this)
        this.setCollection = this.setCollection.bind(this)
        this.runModel = this.runModel.bind(this)
        this.setResolution = this.setResolution.bind(this)
        this.restart = this.restart.bind(this)

        this.collections = {};
        this.parameters = {};

        this.modelManager = null;

        this._sustainQuerier = sustain_querier();
        this.whitelist = [
            "K_MEANS_CLUSTERING",
            "BISECTING_K_MEANS",
            "GAUSSIAN_MIXTURE",
            "LATENT_DIRICHLET_ALLOCATION",
            "LINEAR_REGRESSION"
        ];
        this.resolutionWhitelist = [
            "County"
        ];
        this.populateCatalog();

        this.keyVal = 0;
        this.resolutionKey = 999;
        this.state = {
            modelStatus: "none"
        }
        this.recentGeometry = [];
    }


    render() {
        if (!this.state || !this.state.catalog) return null;
        switch (this.state.modelStatus) {
            case "none":
                return this.createModelBuilder();
            case "building":
                return e("div", null,
                    "Building your model, this may take awhile..."
                );
            case "built":
                return this.createModelBuilt()
        }
    }

    createModelBuilder() {
        return e("div", null,
            this.createModelSelect(),
            this.createResolution(),
            e("div", { className: "menuHeaderLabel modelMenuHeader" }, "Features"),
            ...this.createCollections(),
            e("div", { className: "menuHeaderLabel modelMenuHeader" }, "Hyperparameters"),
            ...this.createParameters(),
            this.createModelRunButton(),
        );
    }

    createModelBuilt() {
        return e("div", null,
            e("div", {
                style: { display: "block" }
            }, "Your model is done, check it out on the map!"),
            e("br"),
            this.createResetButton()
        );
    }

    createResetButton() {
        return e("button", { type: "button", className: "btn btn-outline-dark modelButton", onClick: this.restart },
            "Build a New Model"
        );
    }

    restart() {
        this.modelManager.clear();
        this.clearAll();
        this.setState({
            modelStatus: "none"
        });
    }

    async populateCatalog() {
        const { data } = await Query.makeQuery({
            collection: "model_catalogue"
        });
        const catalog = data.reduce((acc, entry) => {
            acc[entry.type] = entry;
            return acc;
        }, {});
        const catalogMap = this.catalogMap(catalog);
        const categoryDefault = "CLUSTERING";
        this.setState({
            catalog: catalog,
            config: catalogMap,
            modelCategory: categoryDefault,
            modelType: Object.keys(catalogMap[categoryDefault])[0],
            modelStatus: "none"
        })
    }

    catalogMap(catalog) {
        const ret = {};
        for (const entry in catalog) {
            // if (!this.whitelist.includes(entry))
            //     continue;
            if (!ret[catalog[entry].category])
                ret[catalog[entry].category] = {}

            ret[catalog[entry].category][catalog[entry].type] = catalog[entry];
        }
        return ret;
    }

    createModelSelect() {
        return e("div", { className: "modelSelect colorMode1" },
            e("label", { htmlFor: "categorySelector", className: "menuHeaderLabel modelMenuHeader" }, "Category"),
            this.createCategorySelector(),
            e("label", { htmlFor: "typeSelector", className: "menuHeaderLabel modelMenuHeader" }, "Type"),
            this.createTypeSelector(),
        );
    }

    createCategorySelector() {
        const categories = Object.keys(this.state.config);
        const content = categories.map(category => {
            return e("option", null, category)
        });

        return e("select", {
            id: "categorySelector",
            className: "form-control",
            onChange: this.onCategoryChange,
            value: this.state.modelCategory
        }, ...content)
    }

    onCategoryChange(e) {
        this.setState({
            modelCategory: e.target.value,
            modelType: Object.keys(this.state.config[e.target.value])[0]
        });
        this.clearAll()
    }


    createTypeSelector() {
        const types = Object.keys(this.state.config[this.state.modelCategory]);
        const content = types.map(type => {
            return e("option", null, type)
        });

        return e("select", {
            id: "typeSelector",
            className: "form-control",
            onChange: this.onTypeChange,
            value: this.state.modelType
        }, ...content)
    }

    onTypeChange(e) {
        this.setState({ modelType: e.target.value });
        this.clearAll();
    }

    createParameters() {
        const params = this.getCurrentConfig().parameters.map(parameter => {
            const obj = {
                config: parameter,
                setParameter: this.setParameter,
                key: this.keyVal++
            }
            return e(ModelParameter, obj);
        });
        return params;
    }

    clearParameters() {
        this.parameters = {};
    }

    setParameter(name, value) {
        this.parameters[name] = value;
    }

    createResolution() {
        return e(ModelResolution, {
            options: this.getResolutionOptions(),
            setResolution: this.setResolution,
            key: this.resolutionKey
        })
    }

    getResolutionOptions() {
        let ret = [];
        for (const collection of this.getCurrentConfig().collections)
            if (!ret.includes(collection.resolution) && this.resolutionWhitelist.includes(collection.resolution))
                ret.push(collection.resolution);
        return ret;
    }

    setResolution(resolution) {
        this.setState({
            resolution: resolution
        });
        this.clearCollections();
    }

    createCollections() {
        return this.getCurrentConfig().collections.filter(collection => {
            return collection.resolution === this.state.resolution
        }).map(collection => {
            return e(ModelCollection, {
                config: collection,
                setCollection: this.setCollection,
                key: this.keyVal++
            })
        });
    }

    clearCollections() {
        this.collections = {};
    }

    setCollection(name, feature, value) {
        if (!this.collections[name])
            this.collections[name] = {};
        this.collections[name][feature] = value;
    }

    createModelRunButton() {
        return e("button", { type: "button", className: "btn btn-outline-dark modelButton", onClick: this.runModel },
            "Run Model"
        );
    }

    async runModel() {
        this.setState({
            modelStatus: "building"
        });
        this.modelManager = null;
        const q = {};
        q.type = this.state.modelType;
        q.collections = this.convertCollectionsToCollectionsQuery()
        q[this.getCurrentConfig().requestName] = {
            ...this.parameters,
            ...await this.getExtraRequestParams()
        };


        console.log(JSON.stringify(q))
        console.log(q)
        const stream = this._sustainQuerier.executeModelQuery(JSON.stringify(q));
        let resData = [];
        stream.on('data', function (r) {
            const data = JSON.parse(r.getJson());
            console.log({data})
            this.handleSingleResponse(data);
            resData.push(data);
        }.bind(this));
        stream.on('end', function (end) {
            //console.log("end")
            this.handleFullResponse(resData);
            this.setState({
                modelStatus: "built"
            });
        }.bind(this));
    }

    clearAll() {
        this.clearParameters();
        this.clearCollections();
        this.modelManager = null;
        this.resolutionKey++;
    }


    handleSingleResponse(data) {
        switch (this.state.modelCategory) {
            case "REGRESSION":
                //console.log(data)
                break;
            case "CLUSTERING":
                //console.log(data)
                break;
            default:
                return null;
        }
    }

    handleFullResponse(data) {
        switch (this.state.modelCategory) {
            case "REGRESSION":
                this.handleFullRegressionResponse(data);
                break;
            case "CLUSTERING":
                this.handleFullClusteringResponse(data);
                break;
            default:
                return null;
        }
    }

    handleFullClusteringResponse(data) {
        const refinedData = data.map(d => {
            return d[Object.keys(d)[0]];
        })
        this.modelManager = new ClusterManager(refinedData, window.map, window.dataModelingGroup, this.getGeometryCollectionName());
    }

    handleFullRegressionResponse(data) {
        const refinedData = data.map(d => {
            return d[Object.keys(d)[0]];
        });
        this.modelManager = new RegressionManager(refinedData, window.map, window.dataModelingGroup, this.recentGeometry);
    }

    convertCollectionsToCollectionsQuery() {
        let ret = [];
        for (const collection in this.collections) {
            const col = {
                "name": collection,
                "features": this.convertFeaturesToFeaturesQuery(this.collections[collection])
            }
            if (col.features.length === 0) continue;
            if (this.state.modelCategory === "REGRESSION")
                col["label"] = "max_max_air_temperature";
            ret.push(col);
        }
        return ret;
    }

    convertFeaturesToFeaturesQuery(collectionFeatures) {
        let ret = [];
        for (const feature in collectionFeatures)
            if (collectionFeatures[feature])
                ret.push(feature);
        return ret;
    }

    getCurrentConfig() {
        return this.state.config[this.state.modelCategory][this.state.modelType];
    }

    async getExtraRequestParams() {
        switch (this.state.modelCategory) {
            case "REGRESSION":
                const GISJOINS = await this.getCurrentViewportGISJOINS();
                return {
                    "gisJoins": GISJOINS
                }
            case "CLUSTERING":
                return {
                    "resolution": this.state.resolution
                }
            default:
                return null;
        }
    }

    async getCurrentViewportGISJOINS() {
        this.recentGeometry = [];
        return new Promise(resolve => {
            const collectionName = this.getGeometryCollectionName2dIndexed();
            const b = map.wrapLatLngBounds(map.getBounds());
            const barray = Util.leafletBoundsToGeoJSONPoly(b);
            const q = [
                { "$match": { geometry: { "$geoIntersects": { "$geometry": { type: "Polygon", coordinates: [barray] } } } } }
            ];
            const stream = this._sustainQuerier.getStreamForQuery(collectionName, JSON.stringify(q));

            let GISJOINS = [];
            stream.on('data', function (r) {
                const data = JSON.parse(r.getData());
                this.recentGeometry.push(data);
                GISJOINS.push(data.GISJOIN);
            }.bind(this));

            stream.on('end', function (end) {
                resolve(GISJOINS);
            });
        });
    }

    getGeometryCollectionName() {
        return this.state.resolution === "Tract" ? "tract_geo_140mb_no_2d_index" : "county_geo_30mb_no_2d_index";
    }

    getGeometryCollectionName2dIndexed() {
        return this.state.resolution === "Tract" ? "tract_geo_140mb" : "county_geo_30mb";
    }
}
