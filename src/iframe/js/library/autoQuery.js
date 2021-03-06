/**
 * @class AutoQuery
 * @file Query layers in a very general fashion
 * @author Daniel Reynolds
 * @dependencies autoMenu.js menuGenerator.js geometryLoader.js
 * @notes Work in progress!
 */

class AutoQuery {
    static GISJOINWorker = new SharedWorker('js/library/GISJOINQueryWorker.js');
    /**
      * Constructs the instance of the autoquerier to a specific layer
      * @memberof AutoQuery
      * @method constructor
      * @param {JSON} layerData JSON which was spit out by autoMenu.js
      * @param {string=} graphPipeID optional ID of a pipe to spit all queried data into
      */
    constructor(layerData, graphPipeID) {
        this.data = layerData;
        this.collection = layerData.collection;
        this.map = layerData.map();
        this.queryWorker = new SharedWorker('js/library/queryWorker.js'); //init querier

        this.constraintData = {};
        this.constraintState = {};
        this.layerCache = {};

        this.streams = [];
        this.mapLayers = [];
        this.layerIDs = [];

        this.constraintChangedFlag = false;
        this.enabled = false;

        if (this.data.linkedGeometry) { //linked geometry stuff
            this.linked = this.data.linkedGeometry;
            this.backgroundLoader = this.linked === "tract_geo_140mb" ? window.backgroundTract : window.backgroundCounty;
            this.geohashCache = [];
        }

        this.color = layerData.color;
        this.colorStyle = layerData.color.style;
        this.colorCode = this.buildColorCode(layerData);

        this.graphPipeID = graphPipeID;
    }

    /**
      * Signals that this layer has been enabled
      * @memberof AutoQuery
      * @method onAdd
      */
    onAdd() {
        this.enabled = true;
    }

    /**
      * Signals that this layer has been disabled, along with some cleanup work
      * @memberof AutoQuery
      * @method onAdd
      */
    onRemove() {
        this.clearMapLayers();
        this.queryWorker.port.postMessage({ type: "kill", collection: this.collection });
        this.layerIDs = [];
        this.enabled = false;
    }

    /**
      * Updates a constraint's data, and adds it if nonexistent.
      * This is meant to plug into the "onConstraintChange" attribute of
      * menuGenerator.js
      * @memberof AutoQuery
      * @method updateConstraint
      * @param {string} layer name of layer, not actually used anywhere here
      * @param {string} constraint name of constraint
      * @param {?} value value of constraint, type is dependant of type of constraint
      * @param {boolean} isActive is this constraint selected? this is only relevant for multiselector (checkbox) constraints.
      */
    updateConstraint(layer, constraint, value, isActive) {
        if (!constraint)
            return;

        switch (this.getConstraintType(constraint)) {
            case "slider":
                if (Array.isArray(value))
                    for (let i = 0; i < value.length; i++) //change string to number
                        value[i] = Number(value[i]);
                else
                    value = Number(value);
                this.constraintData[constraint] = value;
                break;
            case "selector":
                this.constraintData[constraint] = value;
                break;
            case "multiselector":
                if (!this.constraintData[constraint])
                    this.constraintData[constraint] = {};
                this.constraintData[constraint][value] = isActive;
                break;
        }

        this.reQuery();
    }

    /**
      * Restarts querying. This is used whenever a constraint changes, as any
      * layers or existing queries are no longer relevant.
      * @memberof AutoQuery
      * @method reQuery
      */
    reQuery() {
        if (this.enabled) {
            this.clearMapLayers();
            this.queryWorker.port.postMessage({ type: "kill", collection: this.collection });
            this.query();
        }
    }

    /**
      * Gets metadata for constraint, useful helper function
      * @memberof AutoQuery
      * @method getConstraintMetadata
      * @param {string} constraintName name of constraint
      * @returns {object} constraint metadata
      */
    getConstraintMetadata(constraintName) {
        return this.data.constraints[constraintName];
    }

    /**
      * Gets type of constraint, useful helper function
      * @memberof AutoQuery
      * @method getConstraintType
      * @param {string} constraintName name of constraint
      * @return {string} constraint type
      */
    getConstraintType(constraintName) {
        return this.getConstraintMetadata(constraintName).type;
    }

    /**
      * Activates or deactivates a constraint, requeries after.
      * @memberof AutoQuery
      * @method getConstraintType
      * @param {string} constraintName name of constraint
      * @param {boolean} active should the constraint be activated or deactivated
      */
    constraintSetActive(constraintName, active) {
        this.constraintState[constraintName] = active;
        this.reQuery();
    }

    /**
      * Runs a query for this layer, and automatically renders what should be
      * rendered.
      * @memberof AutoQuery
      * @method query
      * @param {Array<GeoJSON>} forcedGeometry OPTIONAL array of geojson features
      * which can overide any automatic stuff. This parameter is ONLY used when
      * new features come in with @method listenForLinkedGeometryUpdates
      */
    query() {
        let q = [];
        if (!this.linked) {
            const b = this.map.wrapLatLngBounds(this.map.getBounds());
            const barray = Util.leafletBoundsToGeoJSONPoly(b);
            q.push({ "$match": { geometry: { "$geoIntersects": { "$geometry": { type: "Polygon", coordinates: [barray] } } } } }); //only get geometry in viewport
            this.bindConstraintsAndQuery(q)
        }
        else {
            let relevantGISJOINS = [];
            let relevantData = [];
            const sessionID = Math.random().toString(36).substring(2, 15);
            AutoQuery.GISJOINWorker.port.postMessage({
                type: "query",
                senderID: sessionID,
                resolution: this.linked === "tract_geo_140mb" ? 'tract' : 'county',
                bounds: this.map.getBounds(),
                blacklist: this.geohashCache
            })
            AutoQuery.GISJOINWorker.port.onmessage = msg => {
                if (msg.data.senderID === sessionID && msg.data.type === "data") {
                    if(Object.keys(msg.data.data).length)
                        this.geohashCache = [...new Set([...Object.keys(msg.data.data),...this.geohashCache])];
                    else
                        return
                    this.backgroundLoader.port.postMessage({
                        senderID: sessionID,
                        type: "query",
                        query: msg.data.data
                    });

                    this.backgroundLoader.port.onmessage = msgBg => {
                        const data = msgBg.data;
                        if(data.senderID === sessionID && data.type === "data"){
                            //populate cache
                            console.log(data.data.data)
                            relevantGISJOINS = [...new Set([...data.data.GISJOINS,...relevantGISJOINS])];
                            relevantData = [...new Set([...data.data.data,...relevantData])];
                            if(relevantGISJOINS.length > 100){
                                this.bindConstraintsAndQuery([{ "$match": { "GISJOIN": { "$in": relevantGISJOINS } } }],relevantData);
                                relevantGISJOINS = [];
                            }
                        }
                        else if(data.senderID === sessionID && data.type === "end"){
                            if(relevantGISJOINS.length)
                                this.bindConstraintsAndQuery([{ "$match": { "GISJOIN": { "$in": relevantGISJOINS } } }],relevantData);
                        }
                    }
                }
            }
        }
    }

    bindConstraintsAndQuery(q,forcedGeometry){
        q = q.concat(this.buildConstraintPipeline());
        this.queryWorker.port.postMessage({
            type: "query",
            collection: this.collection,
            queryParams: q,
        });

        this.queryWorker.port.onmessage = msg => {
            if (msg.data.type === "data") {
                Util.normalizeFeatureID(msg.data.data);
                if (!this.layerIDs.includes(msg.data.data.id)) {
                    this.renderData(msg.data.data, forcedGeometry);
                }
            }
        }
    }

    /**
      * Clears all of the current layers from this class on the map.
      * @memberof AutoQuery
      * @method clearMapLayers
      */
    clearMapLayers() {
        window.renderInfrastructure.removeSpecifiedLayersFromMap(this.mapLayers);
        this.mapLayers = [];
        this.layerIDs = [];
    }

    /**
      * Renders data from @method query 
      * This is where the "linking" part of any linked geometry happens.
      * @memberof AutoQuery
      * @method renderData
      * @param {object} data which either links or is rendered
      * @param {Array<GeoJSON>} forcedGeometry OPTIONAL parameter, array of GeoJSON featues which
      * overides any defaults in the linking process.
      */
    renderData(data, forcedGeometry) {
        if (this.linked) {
            const GeoJSON = forcedGeometry.find(feature => feature.GISJOIN === data.GISJOIN);
            if (!GeoJSON)
                return;
            Util.normalizeFeatureID(GeoJSON)
            GeoJSON.id = `${GeoJSON.id}_${data.id}`
            if (this.layerIDs.includes(GeoJSON.id))
                return;
            GeoJSON.properties = {
                ...GeoJSON.properties,
                ...data
            }
            data = GeoJSON;
        }

        this.renderGeoJSON(data);
    }

    /**
      * Renders GeoJSON data
      * @memberof AutoQuery
      * @method renderGeoJSON
      * @param {GeoJSON} data GeoJSON feature to be rendered
      */
    renderGeoJSON(data) {
        if (!this.enabled)
            return;
        let indexData = {};
        indexData[this.collection] = {
            "color": this.getColor(data.properties),
        }

        indexData[this.collection].popup = this.buildPopup();
        if (this.getIcon())
            indexData[this.collection]["iconAddr"] = `../../images/map-icons/${this.getIcon()}.png`;

        indexData[this.collection]["border"] = this.color.border;
        indexData[this.collection]["opacity"] = this.color.opacity;

        this.mapLayers = this.mapLayers.concat(window.renderInfrastructure.renderGeoJson(data, indexData));
        this.layerIDs.push(data.id);
    }

    /**
      * Gets icon
      * @memberof AutoQuery
      * @method getIcon
      * @returns Icon data
      */
    getIcon() {
        return this.data.icon;
    }

    /**
      * Builds a mongodb aggregation pipeline for the active and
      * relevant constraints
      * @memberof AutoQuery
      * @method buildConstraintPipeline
      * @returns {Array<object>} mongodb aggregation pipeline
      */
    buildConstraintPipeline() {
        let pipeline = [];
        for (const constraintName in this.constraintState) {
            if (this.constraintState[constraintName]) {
                const constraintData = this.constraintData[constraintName];

                if (!this.constraintIsRelevant(constraintName, constraintData))
                    continue;

                const pipelineStep = { "$match": this.buildConstraint(constraintName, constraintData) };
                pipeline.push(pipelineStep);
            }
        }

        return pipeline;
    }

    /**
      * Decides if a constraint is relevant. For example, if there is a 
      * constraint where you can select categorical attributes, and they are all
      * selected, it is not relevant as it does not have any effect on the results.
      * @memberof AutoQuery
      * @method constraintIsRelevant
      * @param {string} constraintName name of constraint
      * @param {object} constraintData data about the state of the constraint
      * @returns {boolean} 
      */
    constraintIsRelevant(constraintName, constraintData) {
        if (this.getConstraintType(constraintName) === "multiselector") {
            for (const key in constraintData) {
                if (!constraintData[key])
                    return true;
            }
            return false;
        }
        else {
            return true;
        }
    }

    /**
      * Takes the state of the constraint, and turns it into a mongo query
      * @memberof AutoQuery
      * @method buildConstraint
      * @param {string} constraintName name of constraint
      * @param {object} constraintData data about the state of the constraint
      * @returns {object} mongo piece of the mongo query pipeline 
      */
    buildConstraint(constraintName, constraintData) {
        let step;
        switch (this.getConstraintType(constraintName)) {
            case "slider":
                step = {
                    "$gte": constraintData[0],
                    "$lte": constraintData[1]
                };
                break;
            case "selector":
                console.log("SELECTOR");
                break;
            case "multiselector":
                let $in = [];
                for (const opt in constraintData) {
                    if (constraintData[opt]) {
                        $in.push(opt);
                    }
                }
                step = { "$in": $in };
                break;
        }
        const queryConstraint = {};
        queryConstraint[constraintName] = step;
        return queryConstraint;
    }

    /**
      * Gets a color code to use based on the "properties" attribute of a GeoJSON
      * @memberof AutoQuery
      * @method getColor
      * @param {object} properties "properties" attribute of the geojson feature
      * being rendered.
      * @returns {string} hex color code
      */
    getColor(properties) {
        let value;
        if (this.color.variable) {
            const propsVarName = Util.removePropertiesPrefix(this.color.variable);
            value = properties[propsVarName];
        }
        const skew = this.color.skew != null ? this.color.skew + 1 : 1;
        const skewDir = this.color.skewDir != null ? this.color.skewDir : "right";
        switch (this.colorStyle) {
            case "solid":
                return this.colorCode;
            case "gradient":
                const range = this.getConstraintMetadata(this.color.variable).range;
                const normalizedValue = (value - range[0]) / (range[1] - range[0]);
                const skewCorrectedValue = skewDir === "right" ? (1 - (Math.pow(1 - normalizedValue, skew))) : Math.pow(normalizedValue, skew); // https://www.desmos.com/calculator/gezo3xfbfj
                const colorindex = Math.round(skewCorrectedValue * 32); //normalizes value on range. results in #1 - 32
                return this.colorCode[colorindex];
            case "sequential":
                if (this.color.map)
                    return this.color.map[value];
                else {
                    const index = this.getConstraintMetadata(this.color.variable).options.indexOf(value);
                    return this.colorCode[index];
                }
        }
    }

    /**
      * Builds a color code/spectrum for the layer
      * @memberof AutoQuery
      * @method buildColorCode
      * @returns {?} color code or spectrum which is relevant to the layer
      */
    buildColorCode() {
        const colorGradient = new Gradient();
        switch (this.colorStyle) {
            case "solid":
                return this.data.color.colorCode;
            case "gradient":
                const colors = this.color.gradient ? this.color.gradient : ["#FF0000", "#00FF00"];
                colorGradient.setGradient(colors[0], colors[1]);
                colorGradient.setMidpoint(32);
                return colorGradient.getArray();
            case "sequential":
                const numOptions = this.data.constraints[this.data.color.variable].options.length;
                colorGradient.setGradient("#FF0000", "#00FF00");
                colorGradient.setMidpoint(numOptions);
                return colorGradient.getArray();
        }
    }

    /**
      * Generates popup text
      * @memberof AutoQuery
      * @method buildPopup
      * @returns {string} popup text
      */
    buildPopup() {
        let returnText = "<ul style='padding-inline-start:20px;margin-block-start:2.5px;'>";
        for (const constraint in this.constraintState) {
            if (this.constraintState[constraint]) {
                const constraintNoPrefix = Util.removePropertiesPrefix(constraint);
                const constraintLabel = this.getConstraintMetadata(constraint).label ? this.getConstraintMetadata(constraint).label : constraintNoPrefix;
                returnText += "<li><b>" + constraintLabel + ":</b> @@" + constraintNoPrefix + "@@</li>";
            }
        }
        return returnText + "</ul>";
    }
}

try {
    module.exports = {
        AutoQuery: AutoQuery
    }
} catch (e) { }

