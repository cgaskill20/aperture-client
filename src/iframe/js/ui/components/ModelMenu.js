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

        this.modelManager = null;

        this._sustainQuerier = sustain_querier();
        this.populateCatalog();

        this.keyVal = 0;
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
        //if(this.state.modelCategory === "CLUSTERING") return [];
        const params =  this.getCurrentConfig().parameters.map(parameter => {
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

    createCollections() {
        return this.getCurrentConfig().collections.map(collection => {
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
        return e("button", { type: "button", className: "btn btn-primary modelRunButton", onClick: this.runModel },
            "Run Model!"
        );
    }

    runModel() {
        this.setState({
            modelRunning: true
        });
        this.modelManager = null;
         const q = {};
         q.type = this.state.modelType;
         q.collections = this.convertCollectionsToCollectionsQuery()
         q[this.getCurrentConfig().requestName] = {
             ...this.parameters,
             ...this.getExtraRequestParams()
         };

        console.log(JSON.stringify(q))
        const stream = this._sustainQuerier.executeModelQuery(JSON.stringify(q));
        let resData = [];
        stream.on('data', function (r) {
            const data = JSON.parse(r.getJson());
            console.log(data)
            this.handleSingleResponse(data);
            resData.push(data);
        }.bind(this));
        stream.on('end', function (end) {
            console.log("end")
            this.handleFullResponse(resData);
            this.setState({
                modelRunning: false
            });
        }.bind(this));
    }

    clearAll(){
        this.clearParameters();
        this.clearCollections();
        this.modelManager = null;
    }


    handleSingleResponse(data){
        switch (this.state.modelCategory) {
            case "REGRESSION":
                console.log(data)
                break;
            case "CLUSTERING":
                console.log(data)
                break;
            default:
                return null;
        }
    }

    handleFullResponse(data){
        switch (this.state.modelCategory) {
            case "REGRESSION":
                break;
            case "CLUSTERING":
                this.handleFullClusteringResponse(data);
                break;
            default:
                return null;
        }
    }

    handleFullClusteringResponse(data){
        this.modelManager = new ClusterManager(data,window.map,window.dataModelingGroup,"tract_geo_GISJOIN");
        
    }

    convertCollectionsToCollectionsQuery() {
        let ret = [];
        for (const collection in this.collections){
            const col = {
                "name": collection,
                "features": this.convertFeaturesToFeaturesQuery(this.collections[collection])
            }
            if(col.features.length === 0) continue;
            if(this.state.modelCategory === "REGRESSION") 
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

    getExtraRequestParams() {
        switch (this.state.modelCategory) {
            case "REGRESSION":
                return {
                    "gisJoins": ["G0801230", "G0800690", "G0800130", "G0800590", "G0800470", "G0800140", "G0800010", "G0800190", "G0800310", "G0800490", "G0800570", "G0801070", "G0801170", "G5600010", "G5600070"]
                }
            default:
                return null;
        }
    }
}
