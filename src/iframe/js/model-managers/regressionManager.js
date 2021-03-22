class RegressionManager {
    constructor(data, map, layerGroup, geometry) {
        this.renderableData = this.bindDataAndGeometry(data,geometry);
        this.renderer = new RenderInfrastructure(map, null, layerGroup, {
            simplifyThreshold: 0.0001
        });
        this.mapLayers = [];
        this.render();
    }
    //work in progress

    bindDataAndGeometry(data, geometry){
        console.log(JSON.stringify(data))
        return data.map(result => {
            const matchingGeometry = geometry.find(geom => geom.GISJOIN === result.gisJoin);
            matchingGeometry.properties = result;
            return matchingGeometry;
        });
    }

    getRMSEMinMax(){
        
    }

    render(){
        for(const feature of this.renderableData){
            console.log(feature)
            this.mapLayers = this.mapLayers.concat(this.renderer.renderGeoJson(feature, {
                "Regression": {
                    border: 0,
                    opacity: 0.4
                }
            }));
        }
    }
}