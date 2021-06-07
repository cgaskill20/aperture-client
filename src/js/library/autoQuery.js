import Gradient from "../third-party/Gradient"
import MapDataFilterWrapper from "./mapDataFilterWrapper"
import Util from "./apertureUtil"
import Query from "./Query"
import newRendering from "./Render"

/**
 * @class AutoQuery
 * @file Query layers in a very general fashion
 * @author Daniel Reynolds
 * @dependencies autoMenu.js menuGenerator.js geometryLoader.js
 * @notes Work in progress!
 */

export default class AutoQuery {
    static blockers = {}
    static blockerListener = null;
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
        this.map = globalThis.map;

        this.constraintData = {};
        this.constraintState = {};
        this.layerCache = {};

        this.streams = [];
        this.mapLayers = [];
        this.layerIDs = new Set();
        this.currentQueries = new Set();

        this.constraintChangedFlag = false;
        this.enabled = false;
        this.geohashCache = [];

        this.linked = this.data.linkedGeometry ? true : false;


        this.color = layerData.color;
        this.colorStyle = layerData.color.style;
        this.colorCode = this.buildColorCode(layerData);

        this.graphPipeID = graphPipeID;

        this.blockerGroup = this.data.linkedGeometry ?
            this.linked === "tract_geo_140mb_no_2d_index" ?
                "tracts" : "counties"
            : this.data.label ?
                this.data.label : Util.cleanUpString(this.collection);
                
        if(this.blockerGroup.charAt(this.blockerGroup.length-1) !== "s"){
            this.blockerGroup += "s";
        }

        this.minZoom = this.data.minZoom;
        this.blocked = false;
        AutoQuery.blockers[this.blockerGroup] = 0;

        this.map.on('moveend', () => {
            this.query();
        });
    }

    /**
      * Signals that this layer has been enabled
      * @memberof AutoQuery
      * @method onAdd
      */
    onAdd() {
        this.enabled = true;
        this.query();
    }

    /**
      * Signals that this layer has been disabled, along with some cleanup work
      * @memberof AutoQuery
      * @method onAdd
      */
    onRemove() {
        this.clearMapLayers();
        this.killCurrentQueries();

        const oldBlockers = JSON.stringify(AutoQuery.blockers);
        AutoQuery.blockers[this.blockerGroup] -= this.blocked;
        this.blocked = false;
        this.checkAndDispatch(oldBlockers);

        this.layerIDs.clear()
        this.enabled = false;
        this.geohashCache = [];
        MapDataFilterWrapper.removeCollection(this.collection);
    }

    /**
      * Updates a constraint's data, and adds it if nonexistent.
      * This is meant to plug into the "onConstraintChange" attribute of
      * menuGenerator.js
      * @memberof AutoQuery
      * @method updateConstraint
      * @param {string} constraint name of constraint
      * @param {?} value value of constraint, type is dependant of type of constraint
      * @param {boolean} isActive is this constraint selected? this is only relevant for multiselector (checkbox) constraints.
      */
    updateConstraint(constraint, value, isActive) {
        if (!constraint)
            return;
        let changed = false;
        switch (this.getConstraintType(constraint)) {
            case "slider":
                const mData = this.getConstraintMetadata(constraint);
                if (Array.isArray(value)) {
                    for (let i = 0; i < value.length; i++) //change string to number
                        value[i] = Number(value[i]);
                    if (mData.plus && value[value.length - 1] >= mData.range[1] && value[0] > mData.range[0]) //maxed out on upper bound
                        value[value.length - 1] = 2147483647;
                }
                else
                    value = Number(value);
                changed = !this.constraintData[constraint] || this.constraintData[constraint].join() !== value.join();
                this.constraintData[constraint] = value;
                break;
            case "selector":
                changed = this.constraintData[constraint] !== value;
                this.constraintData[constraint] = value;
                break;
            case "multiselector":
                if (!this.constraintData[constraint])
                    this.constraintData[constraint] = {};
                changed = this.constraintData[constraint][value] !== isActive;
                this.constraintData[constraint][value] = isActive;
                break;
        }
        if (changed)
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
            this.killCurrentQueries();
            this.geohashCache = [];
            this.query();
        }
    }
    /**
      * Kills current Queries
      * @memberof AutoQuery
      * @method killCurrentQueries
      */
    killCurrentQueries(){
        for(const qid of [...this.currentQueries]){
            Query.killQuery(qid);
        }
        this.currentQueries.clear();
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
        if (!this.enabled || !this.zoomIsValid()) {
            return;
        }
        let id;
        const callback = (d) => {
            const { event, payload } = d;
            if(event === "data"){
                this.renderGeoJSON(payload.data);
            }
            else if(event === "info"){
                payload.geohashes && this.geohashCache.push(...payload.geohashes);
                if(payload.id) { 
                    id = payload.id;
                    this.currentQueries.add(payload.id); 
                }
            }
            else if(event === "end"){
                this.currentQueries.delete(id);
            }
        }

        Query.makeQuery({
            collection: this.collection,
            pipeline: this.buildConstraintPipeline(),
            granularity: "coarse",
            callback,
            bounds: this.map.getBounds(),
            geohashBlacklist: this.geohashCache
        });
    }

    zoomIsValid() {
        const oldBlockers = JSON.stringify(AutoQuery.blockers);
        const mapZoom = this.map.getZoom();
        if (mapZoom < this.minZoom) {
            AutoQuery.blockers[this.blockerGroup] += !this.blocked;
            this.blocked = true;
            this.checkAndDispatch(oldBlockers);
            return false;
        }
        else {
            AutoQuery.blockers[this.blockerGroup] -= this.blocked;
            this.blocked = false;
        }
        this.checkAndDispatch(oldBlockers);

        return true;
    }

    checkAndDispatch(oldBlockers) {
        if (oldBlockers !== JSON.stringify(AutoQuery.blockers)) {
            AutoQuery.dispatchBlocker();
        }
    }

    static setBlockerListener(listener) {
        AutoQuery.blockerListener = listener;
    }

    static dispatchBlocker() {
        AutoQuery.blockerListener(AutoQuery.blockers);
    }

    addToExistingFeaturesNoDuplicates(existingFeatures, newFeatures) {
        const newFeaturesNoDuplicates = newFeatures.filter(nFeature => {
            return !existingFeatures.find(eFeature => eFeature.GISJOIN === nFeature.GISJOIN)
        });
        return existingFeatures.concat(newFeaturesNoDuplicates)
    }

    pullGISJOINSFromArray(arr) {
        return arr.map(feature => {
            return feature.GISJOIN;
        });
    }

    /**
      * Clears all of the current layers from this class on the map.
      * @memberof AutoQuery
      * @method clearMapLayers
      */
    clearMapLayers() {
        window.renderInfrastructure.removeSpecifiedLayersFromMap(this.mapLayers);
        this.mapLayers = [];
        this.layerIDs.clear();
    }

    /**
      * Renders GeoJSON data
      * @memberof AutoQuery
      * @method renderGeoJSON
      * @param {GeoJSON} data GeoJSON feature to be rendered
      */
    renderGeoJSON(data) {
        const id = this.linked ? data.id.split("_")[0] : data.id;
        if (!this.enabled || this.layerIDs.has(id))
            return;

        MapDataFilterWrapper.add(data, this.collection);

        let indexData = {};
        indexData[this.collection] = {
            "color": this.getColor(data.properties),
        }

        indexData[this.collection].popup = this.buildPopup();
        if (this.getIcon())
            indexData[this.collection]["iconAddr"] = `./images/map-icons/${this.getIcon()}.png`;

        indexData[this.collection]["border"] = this.color.border;
        indexData[this.collection]["opacity"] = this.color.opacity;
        data.properties.color = this.getColor(data.properties);
        newRendering(data)
        //this.mapLayers = this.mapLayers.concat(window.renderInfrastructure.renderGeoJson(data, indexData));
        this.layerIDs.add(id);

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

    addMongoProject() {
        let project = { GISJOIN: 1 };
        for (const constraintName in this.constraintState) {
            if (this.constraintState[constraintName]) {
                project[constraintName] = 1
            }
        }
        return { "$project": project };
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
        else if (this.getConstraintType(constraintName) === "slider") {
            const range = this.getConstraintMetadata(constraintName).range;
            return !(constraintData[0] <= range[0] && range[1] <= constraintData[1]);
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
                const normalizedValue = Math.min(Math.max((value - range[0]) / (range[1] - range[0]), 0), 0.9999999);
                const skewCorrectedValue = skewDir === "right" ? (1 - (Math.pow(1 - normalizedValue, skew))) : Math.pow(normalizedValue, skew); // https://www.desmos.com/calculator/gezo3xfbfj
                const colorindex = Math.floor(skewCorrectedValue * 32); //normalizes value on range. results in #0 - 31
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

