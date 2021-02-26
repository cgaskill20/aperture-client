/* 

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

let _querier;

/**
  * Gets a SmartQuerier instance for the database.
  * ALL query requests should be made through this instance.
  * @returns {Object} the SmartQuerier that should be used for all requests
  */
function getSustainQuerier() {
    if (!_querier) {
        _querier = new SmartQuerier()
    }
    return _querier;
}

/**
  * @class  SmartQuerier
  * @file   High-level wrapper for the sustain querier. This is a singleton class.
  * @author Pierce Smith
  */
class SmartQuerier {
    static dbMachine = "lattice-46";
    static dbPort = 27017;
    static bucketMaxSize = 100;

    // Collections whose queries should not be changed.
    static unmodifiableCollections = ['tract_geo_GISJOIN', 'county_geo_GISJOIN'];

    /**
      * Constructs a SmartQuerier.
      * This method should NOT be called directly. Use getSustainQuerier to get
      * an instance of a SmartQuerier.
      * @class SmartQuerier
      * @method constructor
      * @see getSustainQuerier
      */
    constructor() {
        this.querier = sustain_querier();
        this.cache = {};
        this.activeStreams = [];
    }

    /**
     * Perform a query on the database, using the given collection, mongodb
     * aggregate query, and callbacks for data receiving and stream closure.
     * @memberof SmartQuerier
     * @method query
     * @param {string} collection The name of the collection to query over
     * @param {JSON} queryParams The mongodb aggregate query, as a JS object
     * @param {Function} onDataCallback The callback to fire when data is recieved. It should take a single parameter, which is the PARSED JSON of the response. 
     * @param {Function} onStreamEndCallback The callback to fire when the stream dies.
     * @returns {Object} The associated stream. Note you don't need to use this - the callbacks should be sufficient to process data in most situations.
     */
    query(collection, queryParams, onDataCallback, onStreamEndCallback) {
        this.attachGISJOINIgnorePipeline(collection, queryParams);
        const stream = this.querier.getStreamForQuery(SmartQuerier.dbMachine, 
            SmartQuerier.dbPort, collection, JSON.stringify(queryParams));

        stream.on('data', this.wrapResponseCallback(collection, onDataCallback));
        stream.on('end', onStreamEndCallback);

        this.passCachedData(collection, onDataCallback);

        this.activeStreams.push({ "stream": stream, "collection": collection });
        return stream;
    }

    /**
      * Given a callback that fires on new data, wraps it to correctly handle
      * responses from the database and integrate with the cache.
      * This wrapped callback should be called on stream events, while the raw
      * on data callback should be called elsewhere.
      * @memberof AutoQuery
      * @method wrapResponseCallback
      * @param {Function} callback Callback to fire on data recieve
      * @returns {Function} A callback that can be passed directly to stream.on('data' ...
      */
    wrapResponseCallback(collection, callback) {
        let onResponseCallback = (response) => {
            const data = JSON.parse(response.getData());
            this.addToCache(collection, data);
            callback(data);
        }
        onResponseCallback.bind(this);
        return onResponseCallback;
    }

    /**
      * Passes any cached data for the given collection into the callback.
      * @param {Function} callback Callback to fire on data recieve
      */
    passCachedData(collection, callback) {
        Object.values(this.getCollectionBucket(collection)).forEach((GISBucket) => {
            GISBucket.forEach((item) => {
                callback(item);
            });
        });
    }

    /** 
      * Given a particular collection and a set of mongodb query parameters,
      * attacks a pipeline to the beginning that ignores GISJOINS which have already
      * been queried.
      * @memberof SmartQuerier
      * @method attachGISJOINIgnorePipeline
      * @param {string} collection
      * @param {string} params Stringified mongodb query
      * @returns The given params, but with a GISJOIN ignore pipeline prepended
      */
    attachGISJOINIgnorePipeline(collection, params) {
        if (SmartQuerier.unmodifiableCollections.find(c => c === collection)) {
            return;
        }

        let pipeline = this.getGISJOINIgnorePipeline(collection);
        // Don't concatenate an empty list of params, since this breaks everything
        if (params.length == 0) {
            return;
        }
        return pipeline.concat(params);
    }

    /** 
      * Creates the first part of a mongodb aggregate query that ignores the
      * GISJOINS that have already been queried, for a given collection.
      * @memberof SmartQuerier
      * @method getGISJOINIgnorePipeline
      * @param {string} collection The collection to filter within
      * @returns {Array<Object>} A single-element array with the GISJOIN ignore query
      */
    getGISJOINIgnorePipeline(collection) {
        let collectionBucket = this.getCollectionBucket(collection);
        let GISJOINList = Object.keys(collectionBucket);

        return [{
            "$match": { "GISJOIN": { "$nin": GISJOINList } } 
        }];
    }

    /**
      * Adds a piece of data to the cache for a specific collection.
      * The cache is structured as follows:
      * {
      *   collection1: {
      *     GISJOIN1: [ data with that GISJOIN ... ],
      *     GISJOIN2: [ data with that GISJOIN ... ],
      *     ...
      *   }, 
      *   collection2: {
      *     GISJOIN1: [ data with that GISJOIN ... ],
      *     GISJOIN2: [ data with that GISJOIN ... ],
      *     ...
      *   }
      * }
      * @memberof SmartQuerier
      * @method addToCache
      */
    addToCache(collection, data) {
        let bucket = this.getGISJOINBucket(collection, data.GISJOIN);
        bucket.push(data);

        let cbucket = this.getCollectionBucket(collection);
        if (Object.keys(cbucket).length > 10) {
            delete cbucket[Object.keys(cbucket)[0]];
        }
    }

    /** 
      * Gets the bucket object for a given collection, or creates it if it doesn't exist yet.
      * See the addToCache method for a description of how the cache is layed out.
      * @param {string} collection The collection for which to get the bucket
      * @return {Object} The collection's bucket.
      */
    getCollectionBucket(collection) {
        let bucket = this.cache[collection];
        if (!bucket) {
            bucket = {};
            this.cache[collection] = bucket;
        }
        return bucket;
    }

    /**
      * Gets a specific GISJOIN bucket in a collection, or creates it if it doesn't exist yet.
      * See the addToCache method for a description of how the cache is layed out.
      * @param {string} collection The collection for which to get the bucket
      * @param {string} GISJOIN The specific GISJOIN for which to get the bucket
      * @return {Array<Object>} The array of data items that have the given GISJOIN for the given collection
      */
    getGISJOINBucket(collection, GISJOIN) {
        let bucket = this.getCollectionBucket(collection);
        let GISBucket = bucket[GISJOIN];
        if (!GISBucket) {
            bucket[GISJOIN] = [];
            GISBucket = bucket[GISJOIN];
        }
        return GISBucket;
    }

    /**
      * Cancel every stream over the given collection.
      * @memberof SmartQuerier
      * @method killAllStreamsOverCollection
      * @param {string} collection The name of the collection to kill streams for
      */
    killAllStreamsOverCollection(collection) {
        this.activeStreams.filter((s) => s.collection === collection)
            .forEach((s) => { s.stream.cancel(); });
        this.activeStreams = this.activeStreams.filter((s) => s.collection !== collection);
    }
}

