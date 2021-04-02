import RenderInfrastructure from "../library/renderInfrastructure";
import Gradient from "../third-party/Gradient"

export default class RegressionManager {
    static gradientRes = 32;

    constructor(data, map, layerGroup, geometry) {
        this.renderableData = this.bindDataAndGeometry(data, geometry);
        this.renderer = new RenderInfrastructure(map, null, layerGroup, {
            simplifyThreshold: 0.0001
        });
        this.mapLayers = [];
        const colorGradient = new Gradient();
        colorGradient.setGradient("#4d6dbd", "#509bc7", "#f0d55d", "#e07069", "#c7445d");
        colorGradient.setMidpoint(RegressionManager.gradientRes);
        this.metric = this.getMetric(data);
        this.colorGradient = colorGradient.getArray();
        this.render();
    }
    //work in progress

    getMetric(data){
        const check = Object.keys(data[0]);
        if(check.includes("rmse")){
            return "rmse";
        }
        return "rmseResidual";
    }

    bindDataAndGeometry(data, geometry) {
        return data.map(result => {
            const matchingGeometry = geometry.find(geom => geom.GISJOIN === result.gisJoin);
            matchingGeometry.properties = result;
            return matchingGeometry;
        });
    }

    getRMSEMinMax() {
        return {
            min: this.renderableData.reduce((a, curr) => { return Math.min(a, curr.properties[this.metric]) }, Infinity), 
            max: this.renderableData.reduce((a, curr) => { return Math.max(a, curr.properties[this.metric]) }, -1)
        }
    }

    render() {
        const minMax = this.getRMSEMinMax();
        for (const feature of this.renderableData) {
            this.mapLayers = this.mapLayers.concat(this.renderer.renderGeoJson(feature, {
                "Regression": {
                    border: 0,
                    opacity: 0.4,
                    color: this.colorGradient[this.normalizeGradientPos(minMax, feature.properties[this.metric])]
                }
            }));
        }
    }

    normalizeGradientPos(minMax, value){
        if(minMax.max === minMax.min){
            return 0;
        }
        const normalized = (value - minMax.min) / (minMax.max - minMax.min);
        if(normalized === 1){
            return RegressionManager.gradientRes - 1;
        }
        return Math.floor(normalized * RegressionManager.gradientRes);
    }

    clear(){ //basically a destructor
        this.renderableData = null;
        this.renderer.removeAllFeaturesFromMap();
    }
}