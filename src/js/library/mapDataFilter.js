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
import Feature from './charting/feature.js';
import Util from './apertureUtil.js';

/**
 * @class  MapDataFilter
 * @author Pierce Smith
 */

export default class MapDataFilter {
    constructor() {
        this.msCacheMaxAge = 10000000;
        this.data = {};
    }

    /** Inserts a data element or array of data elements into the filter.
      * Data elements should be complete responses from the database,
      * with valid `geometry` and `properties` props.
      * 
      * @memberof MapDataFilter
      * @method add
      * @param {(object|Array<object>)} newData The data to add, as a direct response from the database
      * @param {string} collection The collection the data is a part of
      */
    add(newData, collection) {
        if (Array.isArray(newData)) {
            this.addMultiple(newData, collection);
        } else {
            this.addSingle(newData, collection);
        }
    }

    /** Inserts a single data element to the filter.
      * @memberof MapDataFilter
      * @method add
      * @param {object} newData The data to add, as a direct response from the database
      * @param {string} collection The collection the data is a part of
      * @see add
      */
    addSingle(newData, collection) {
        let entryAlreadyExists = Object.values(this.data).find(entry => {
            if (newData.id) {
                return entry.id === newData.id;
            } else {
                return false;
            }
        });

        if (entryAlreadyExists) {
            return;
        }

        newData.entryTime = Date.now();
        if (!this.data[collection]) {
            this.data[collection] = [];
        }
        this.data[collection].push(newData);

        if (this.newDataCallback) {
            this.newDataCallback(newData); 
        }

        return true;
    }

    /** Inserts an array of data elements into the filter.
      * @memberof MapDataFilter
      * @method addMultiple
      * @param {Array<object>} newData An array of data elements
      * @param {string} collection The collection the data is a part of
      * @see add
      */
    addMultiple(newData, collection) {
        for (let data of newData) {
            this.addSingle(data, collection);
        }
    }

    /* Given the name of a feature and the bounds of the map, return a
     * formatted "model" of this data in the filter.  
     * Only data entries whose geometry fits in the bounds will be added.
     * For instance, if you want to model temperature, this is stored as a
     * "temp" property in the data entries, so you'd pass "temp" as
     * the feature.
     * Multiple features can also be passed in an array and it will model
     * each one.  
     * The resulting "model" is an object with one property for each
     * feature, whose key is the name of the feature requested and whose 
     * value is a list of all of the values associated with that feature
     * found in the data set.
     */
    getModel(feature, bounds) {

        let filteredData = this.filter(this.data, bounds);

        if (Array.isArray(feature)) {
            return this.getMultipleModel(feature, filteredData);
        } else {
            return this.getSingleModel(feature, filteredData);
        }
    }

    /** Remove all of the data from the filter.
      * @memberof MapDataFilter
      * @method clear
      */
    clear() {
        this.data = [];
    }

    /** Given a set of raw data and a leaflet bounds object,
      * return only the data that the filter is interested in.
      * This means, at a minimum, that any data outside the bounds
      * is discarded.
      * @memberof MapDataFilter
      * @method filter
      * @param {object} data An object collating raw data as passed into the `add` method
      * @param {Leaflet Bounds} bounds
      * @returns {Array<object>} a subset of the data including only entries the filter is interested in
      */
    filter(data, bounds) {
        let filtered = Object.entries(data).map(kv => {
            return { collection: kv[0], data: kv[1].filter(datum => Util.isInBounds(datum, bounds)) };
        });

        return filtered;
    }

    /** Removes any data from the filter that is older in milliseconds than the
      * given max age.
      * @memberof MapDataFilter
      * @method discardOldData
      * @param {number} maxAge - the age, in milliseconds, that which any older data should be removed
      */
    discardOldData(maxAge) {
        this.data = Object.fromEntries(Object.entries(this.data).map(kv => { 
            return [kv[0], kv[1].filter(datum => ((Date.now() - datum.entryTime) < maxAge))];
        }));
    }

    /** Gets a model for a single feature.
      * See the getModel function for more information on what a 
      * "model" means in this context.
      * @memberof MapDataFilter
      * @method getSingleModel
      * @param {string} feature - the feature to model
      * @param {Array<object>} data - the data to create the model from
      * returns {object} the model
      */
    getSingleModel(feature, data) {
        let featureCollection = Feature.getCollection(feature);
        let featureName = Feature.getName(feature);

        const model = {};
        model[feature] = [];

        data.forEach(entry => {
            entry.data.forEach(datum => {
                if (entry.collection === featureCollection && datum.properties[featureName]) {
                    model[feature].push(this.model(datum, feature));
                }
            });
        });

        return model;
    }

    /** Formats data to a single model datapoint.
      * Currently, the datapoints are objects with a data, type, and locationName property.
      * The data is the actual data, the type is either "county" or "tract", and
      * locationName should be self-explanatory.
      * @memberof MapDataFilter
      * @method model
      * @param {object} entry The data entry to format
      * @param {string} feature The feature to model over
      * @returns {object} An object with a data, type, and locationName property
      */
    model(entry, feature) { 
        return { 
            data: entry.properties[Feature.getName(feature)],
            type: this.dataLocation(entry),
            locationName: entry.properties.NAME10,
            feature: feature,
            GISJOIN: entry.properties.GISJOIN,
        };
    }

    /** Given a data entry, tell what kind of location it is tied to.
      * (e.g. county or tract)
      * @param {object} entry The data entry to examine
      * @returns {string} A string that describes the entry's location
      */
    dataLocation(entry) {
        let locationName;
        if(locationName = entry.properties.NAMELSAD10){
            if(locationName.includes("County")){
                return "county";
            }
            if(locationName.includes("Tract")){
                return "tract";
            }
            return undefined;
        }
        return false;
    }

    /** Gets an array of models for multiple features.
      * See the getModel function for more information on what a 
      * "model" means in this context.
      * @memberof MapDataFilter
      * @method getSingleModel
      * @param {Array<string>} features The features to model
      * @param {Array<object>} data The data to create the model from
      * returns {Array<object>} the models
      */
    getMultipleModel(features, data) {
        let model = {};

        for (const feature of features) {
            const singleModel = this.getSingleModel(feature, data);
            model = { ...model, ...singleModel };
        }

        return model;
    }

    /** Removes all data in the filter over the given collection.
      * @memberof MapDataFilter
      * @method destroyAllOverCollection
      * @param {string} collection The collection for which to remove data 
     */
    removeAllOverCollection(collection) {
        this.data[collection] = []; // have fun gc
    }

    /** Set a callback that fires whenever new data arrives. The callback will
      * be given one parameter filled with the new data in its processed
      * (modeled) form.
      * @memberof MapDataFilter
      * @method onGetNewData
      * @param {Function} callback Callback to fire whenever new data comes into the filter
      */
    onGetNewData(callback) {
        this.newDataCallback = callback;
    }
}
