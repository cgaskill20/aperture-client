'use strict';
class ModelMenu extends React.Component {
    constructor(props) {
        super(props);

        this.onCategoryChange = this.onCategoryChange.bind(this)
        this.onTypeChange = this.onTypeChange.bind(this)
        this.setParameter = this.setParameter.bind(this)
        this.setCollection = this.setCollection.bind(this)
        this.runModel = this.runModel.bind(this)

        this.collections = {};
        this.parameters = {};

        this._sustainQuerier = sustain_querier();
        this.populateCatalog();
    }


    render() {
        if (!this.state || !this.state.catalog) return null;
        if (this.state.modelRunning) return null;
        return e("div", null,
            this.createModelSelect(),
            ...this.createCollections(),
            ...this.createParameters(),
            this.createModelRunButton(),
        );
    }

    populateCatalog() {
        const q = [];
        const stream = this._sustainQuerier.getStreamForQuery("lattice-46", 27017, "model_catalogue", JSON.stringify(q));
        const catalog = {};
        stream.on('data', function (r) {
            const data = JSON.parse(r.getData());
            catalog[data.type] = data;
        }.bind(this));
        stream.on('end', function (end) {
            const catalogMap = this.catalogMap(catalog);
            console.log(catalogMap)
            this.setState({
                catalog: catalog,
                config: catalogMap,
                modelCategory: Object.keys(catalogMap)[0],
                modelType: Object.keys(catalogMap[Object.keys(catalogMap)[0]])[0],
                modelRunning: false
            })
        }.bind(this));
    }

    catalogMap(catalog) {
        const ret = {};
        for (const entry in catalog) {
            if (!ret[catalog[entry].category])
                ret[catalog[entry].category] = {}

            ret[catalog[entry].category][catalog[entry].type] = catalog[entry];
        }
        return ret;
    }

    createModelSelect() {
        return e("div", { className: "modelSelect" },
            e("label", { htmlFor: "categorySelector" }, "Select category: "),
            this.createCategorySelector(),
            e("label", { htmlFor: "typeSelector" }, "Select type: "),
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
        this.clearParameters();
    }

    createParameters() {
        if(this.state.modelCategory === "CLUSTERING") return [];
        const params =  this.getCurrentConfig().parameters.map(parameter => {
            const obj = {
                config: parameter,
                setParameter: this.setParameter
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

    createCollections() {
        return this.getCurrentConfig().collections.map(collection => {
            return e(ModelCollection, {
                config: collection,
                setCollection: this.setCollection
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
        return e("button", { type: "button", className: "btn btn-primary modelRunButton", onClick: this.runModel },
            "Run Model!"
        );
    }

    runModel() {
        this.setState({
            modelRunning: false
        });
        const q = {};
        q.type = this.state.modelType;
        q.collections = this.convertCollectionsToCollectionsQuery()
        q[this.getCurrentConfig().requestName] = {
            ...this.parameters,
            ...this.getExtraRequestParams()
        };

        console.log(JSON.stringify(q))
        //q.collections = 
        const stream = this._sustainQuerier.executeModelQuery(JSON.stringify(q));
        stream.on('data', function (r) {
            const data = JSON.parse(r.getJson());
            console.log(data)
        }.bind(this));
        stream.on('end', function (end) {
            console.log("end")
        }.bind(this));
    }

    convertCollectionsToCollectionsQuery() {
        let ret = [];
        for (const collection in this.collections)
            ret.push({
                "name": collection,
                "features": this.convertFeaturesToFeaturesQuery(this.collections[collection])
            });
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

    getExtraRequestParams() {
        switch (this.state.modelCategory) {
            case "REGRESSION":
                return {
                    "gisJoins": [
                        "G0100290",
                        "G0100210",
                        "G0100190",
                        "G0100230"
                    ]
                }
            default:
                return null;
        }
    }
}
