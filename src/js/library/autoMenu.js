import Query from './Query'
import Util from './apertureUtil'
/**
 * @namespace AutoMenu
 * @file Build a menu based on the metadata catalog & details provided by users about the metadata
 * @author Daniel Reynolds
 * @notes Work in progress!
 */

export default {
    //get the querier
    _sustainQuerier: null,

    /**
      * Main, asyncronous function which is called by an external code block
      * @memberof AutoMenu
      * @method build
      * @param {JSON} menuMetaData user-provided metadata about the metadata, which fits a schema
      * @param {JSON} overwrite Object which overwrites any fields that are auto generated, useful for custom queries.
      * @returns {JSON} JSON which can be used with menuGenerator.js to build a menu
      */
    build: async function (menuMetaData, overwrite) {
        const { data } = await Query.makeQuery({
            collection: "Metadata"
        });
        const catalog = data.reduce((acc,feature) => {
            acc[feature.collection] = feature;
            return acc;
        }, {})
        console.log(JSON.parse(JSON.stringify(catalog)))
        const autoMenu = this.bindMenuToCatalog(menuMetaData, catalog);
        return{
            ...autoMenu,
            ...overwrite,
        };
    },

    /**
      * Helper function for @method build
      * @memberof AutoMenu
      * @method bindMenuToCatalog
      */
    bindMenuToCatalog: function (menuMetaData, catalog) {
        let result = {};
        menuMetaData.forEach(metadata => {
            if (catalog[metadata.collection]) {
                const catalogLayer = catalog[metadata.collection];
                //These are hardcoded for now
                let autoMenuLayer = {};
                if (metadata.level) {
                    autoMenuLayer["group"] = metadata["group"] ? metadata["group"] : "Tract, County, & State Data";
                    autoMenuLayer["subGroup"] = metadata["subGroup"] ? metadata["subGroup"] : metadata.level === "tract" ? "Miscellaneous Tract" : "Miscellaneous County";
                    autoMenuLayer["linkedGeometry"] = metadata.level === "tract" ? "tract_geo_140mb_no_2d_index" : "county_geo_30mb_no_2d_index";
                    autoMenuLayer["joinProperty"] = "GISJOIN";
                    autoMenuLayer["minZoom"] = metadata.level === "tract" ? 9 : 7;
                }
                else {
                    autoMenuLayer["group"] = "Infrastructure & Natural Features";
                    autoMenuLayer["subGroup"] = metadata["subGroup"] ? metadata["subGroup"] : "Miscellaneous";
                    autoMenuLayer["minZoom"] = metadata.minZoom ? metadata.minZoom : 7;
                }


                if (metadata.icon)
                    autoMenuLayer["icon"] = metadata.icon;

                if (metadata.info)
                    autoMenuLayer["info"] = metadata.info;

                if (metadata.color) {
                    if (typeof metadata.color === "string") {
                        autoMenuLayer["color"] = {
                            style: "solid",
                            colorCode: metadata.color
                        };
                    }
                    else {
                        autoMenuLayer["color"] = metadata.color;
                    }
                }
                else {
                    autoMenuLayer["color"] = autoMenuLayer["color"] = {
                        style: "solid",
                        colorCode: "#000000"
                    };
                }

                //where the constraints are added, lots of cool stuff here
                autoMenuLayer["constraints"] = this.buildConstraintsFromCatalog(metadata, catalogLayer);
                autoMenuLayer["collection"] = catalogLayer.collection;
                autoMenuLayer["label"] = metadata.label;
                //gets label if provided, names it the collection name otherwise
                const label = catalogLayer.collection;

                //add finished layer to result
                result[label] = autoMenuLayer;
            }
        });

        return result;
    },


    /**
      * Helper function for @method bindMenuToCatalog
      * @memberof AutoMenu
      * @method buildConstraintsFromCatalog
      */
    buildConstraintsFromCatalog: function (metadata, catalogLayer) {
        let result = {};
        catalogLayer.fieldMetadata.forEach(constraint => {
            const fieldIndex = metadata.fieldMetadata?.findIndex(field => field.name === constraint.name) ?? -1;
            const constraintName = constraint.name;
            if (fieldIndex !== -1) {
                const hideByDefaultMask = {
                    hideByDefault: false
                }
                constraint = { //bind defined values
                    ...constraint,
                    ...hideByDefaultMask,
                    ...metadata.fieldMetadata[fieldIndex]
                }
            }
            constraint = this.convertFromDefault(constraint, metadata.temporal ?? false);
            constraint = this.selectToRange(constraint);
            constraint = this.buildStandardConstraint(constraint);
            if (constraint) {
                result[constraintName] = constraint;
            }
        });

        return result;
    },


    /**
      * Helper function for @method buildConstraintsFromCatalog
      * @memberof AutoMenu
      * @method convertFromDefault
      */
    convertFromDefault: function (constraint, temporal=false) {
        if (constraint.type === "STRING") {
            constraint.type = "multiselect";
        }
        else if (constraint.type === "NUMBER" || constraint.type === "range") {
            constraint.type = "range";
            if(temporal){
                constraint.label = `Mean ${constraint.label ?? Util.cleanUpString(constraint.name)}`;
                constraint.temporalType = 'mean';
            }
            if (!constraint.min || constraint.min === -999) {
                constraint.min = 0;
            }
        }
        else if (constraint.type === "DATE" || constraint.type === "date") {
            constraint.type = "date";
            switch (typeof (constraint.maxDate)) {
                case 'string':
                    constraint.min = new Date(constraint.minDate).getTime();
                    constraint.max = new Date(constraint.maxDate).getTime();
                    break;
                case 'number':
                    constraint.min = constraint.minDate;
                    constraint.max = constraint.maxDate;
                    break;
                case 'object':
                    if (constraint.maxDate.$numberLong) {
                        constraint.min = Number(constraint.minDate.$numberLong);
                        constraint.max = Number(constraint.maxDate.$numberLong);
                    }
                    else {
                        console.error("Cannot deal with date field!");
                        console.error(constraint);
                    }
            }
            constraint.step = 86400 * 1000;
        }

        const DEFAULTS = {
            hideByDefault: true
        }

        constraint = {
            ...DEFAULTS,
            ...constraint
        }

        return constraint;
    },

    /**
      * Helper function for @method buildConstraintsFromCatalog
      * @memberof AutoMenu
      * @method selectToRange
      */
    selectToRange: function (constraint) {
        if (constraint.selectToRangeMap) {
            constraint.step = 1;
            const values = Object.values(constraint.selectToRangeMap);
            constraint.min = Math.min(...values);
            constraint.max = Math.max(...values);
        }
        return constraint;
    },


    /**
      * Helper function for @method buildConstraintsFromCatalog
      * @memberof AutoMenu
      * @method buildStandardConstraint
      */
    buildStandardConstraint: function (constraint) {
        let result = {};

        if (constraint.label)
            result.label = constraint.label;


        if (constraint.type === "range" || constraint.type === "date") {
            result.step = constraint.step;
            const DEFAULTS = {
                step: 1,
            }
            result = {
                ...DEFAULTS,
                ...result
            }
            result.type = "slider";
            
            result.range = [constraint.min, constraint.max];
            result.default = result.range;

            if (result.range[0] === result.range[1] || !constraint.max) //error check
                return null;

            if (constraint.plus)
                result.plus = constraint.plus;

            if (constraint.type === "date")
                result.isDate = true;
            
            if (constraint.temporalType) 
                result.temporalType = constraint.temporalType;
        }
        else if (constraint.type = "multiselect") {
            result.type = "multiselector";
            result.options = constraint.values;
            if (constraint.selectToRangeMap) {
                result.selectToRangeMap = constraint.selectToRangeMap;
                result.min = constraint.min;
                result.max = constraint.max;
                result.step = constraint.step;
                result.range = [constraint.min, constraint.max];
                result.default = result.range;
            }
            if (!result.options || result.options.length < 1)
                return null;
        }
        else if (constraint.type = "select") {
            result.type = "selector";
            result.options = constraint.values;

            if (!result.options || result.options.length < 1)
                return null;
        }


        result.hide = constraint.hideByDefault;

        return result;
    }
}

try {
    module.exports = {
        AutoMenu: AutoMenu
    }
} catch (e) { }
