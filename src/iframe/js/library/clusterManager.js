class ClusterManager {
    constructor(data, map, layerGroup, linkedGeometry) {
        this.data = data;
        this.map = map;
        this.layerGroup = layerGroup;

        this.clusters = [];
        this.getData();


        this.linked = linkedGeometry;
        this.backgroundLoader = this.linked === "tract_geo_GISJOIN" ? window.backgroundTract : window.backgroundCounty;
        this.backgroundLoader.addNewResultListener(function (updates) {
            this.listenForLinkedGeometryUpdates(updates);
        }.bind(this));
    }

    listenForLinkedGeometryUpdates(updates){
        for(const feature of updates){
            const cluster = this.getClusterFromGISJOIN(feature.GISJOIN);
            if(cluster){
                cluster.render.renderGeoJson(feature, {
                    "Cluster":{
                        color: cluster.color,
                        border: 1,
                        onClick: function(layer){
                            this.removeAllLayersApartFrom(layer)
                        }.bind(this),
                        onPopupRemove: function(layer){
                            this.reAddLayers();
                        }.bind(this)
                    }
                });
            }
        }
    }

    getData() {
        const colors = ["#e6194B","#f58231","#ffe119","#bfef45","#3cb44b","#42d4f4","#4363d8","#911eb4","#f032e6","#a9a9a9"];
        let buckets = [[], [], [], [], [], [], [], [], [], []];
        let indx = 0;
        $.getJSON("json/allTracts.json", async function (data) {
            for (const d of data)
                buckets[indx++ % buckets.length].push(d);
            let j = 0;
            for(const b of buckets)
                this.clusters.push(new ClusterState(b, colors[j++], this.layerGroup));
            console.log(this.clusters);
        }.bind(this));
    }
    
    getClusterFromGISJOIN(GISJOIN){
        for(const cluster of this.clusters){
            if(cluster.clusterHasGISJOIN(GISJOIN))
                return cluster;
        }
        return null;
    }

    removeAllLayersApartFrom(layer){
        for(const cluster of this.clusters){
            if(cluster.group !== layer){
                this.layerGroup.removeLayer(cluster.group);
            }
        }
    }

    reAddLayers(){
        this.removeAllLayersApartFrom(null);
        for(const cluster of this.clusters){
            this.layerGroup.addLayer(cluster.group);
        }
    }
}