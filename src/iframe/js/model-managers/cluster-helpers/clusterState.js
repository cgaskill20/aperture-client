class ClusterState {
    constructor(GISJOINS, color, layerGroup) {
        this.GISJOINS = GISJOINS;
        this.color = color;
        this.group = L.featureGroup().addTo(layerGroup);
        this.render = new RenderInfrastructure(window.map, null, this.group, {
            simplifyThreshold: 0.0001
        });
    }

    clusterHasGISJOIN(GISJOIN){
        for(const G of this.GISJOINS)
            if(G === GISJOIN)
                return true;
        return false;
    }
}