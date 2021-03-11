/**
 * @class ClusterManager
 * @file Takes a set of clusters and displays them
 * @author Daniel Reynolds
 * @dependencies autoQuery.js
 * @notes Work in progress!
 */

class ClusterManager {
    constructor(data, map, layerGroup, linkedGeometry) {
        this.data = data;
        this.map = map;
        this.layerGroup = layerGroup;
        this.listenForLinkedGeometryUpdates = this.listenForLinkedGeometryUpdates.bind(this)
        this.sustainQuerier = sustain_querier(); //init querier

        this.clusters = [];

        this.linked = linkedGeometry;
        this.backgroundLoader = this.linked === "tract_geo_140mb_no_2d_index" ? window.backgroundTract : window.backgroundCounty;
        this.backgroundLoader.addNewResultListener(this.listenForLinkedGeometryUpdates);

        if(document.getElementById("model-container").style.display = "block") 
            document.getElementById("clusterLegend").style.display = "block";
        this.getData();

        this.currentClusterSelected = null;
    }

    clear(){ //basically a destructor
        document.getElementById("clusterLegend").style.display = "none";
        for(const cluster of this.clusters){
            cluster.render.removeAllFeaturesFromMap();
        }
        this.backgroundLoader.removeResultListener(this.listenForLinkedGeometryUpdates)
    }

    listenForLinkedGeometryUpdates(updates) {
        for (const feature of updates) {
            const cluster = this.getClusterFromGISJOIN(feature.GISJOIN);
            if (cluster) {
                cluster.render.renderGeoJson(feature, {
                    "Cluster": {
                        color: cluster.color,
                        border: 0,
                        opacity: 0.4,
                        // onClick: function (layer) {
                        //     this.removeAllLayersApartFrom(layer)
                        // }.bind(this),
                        // onPopupRemove: function (layer) {
                        //     this.reAddLayers();
                        // }.bind(this)
                    }
                });
            }
        }
    }

    getCacheAndRender() {
        this.listenForLinkedGeometryUpdates(this.backgroundLoader.getCache());
    }

    getData() {
        this.removeAllLayers();
        this.clusters = [];
        const colors = ["#e6194B", "#f58231", "#ffe119", "#bfef45", "#3cb44b", "#42d4f4", "#4363d8", "#911eb4", "#f032e6", "#a9a9a9"];
        let buckets = [];
        for(let i = 0; i <= this.getMaxPrediction(); i++){
            buckets.push([]);
        }
        for (const d of this.data){
            buckets[d.prediction].push(d.gisJoin);
        }
        let j = 0;

        for (const b of buckets) {
            const cluster = new ClusterState(b, colors[j], this.layerGroup);
            j++;
            this.clusters.push(cluster);

            const legendClick = document.createElement("div");
            legendClick.className = "clusterLegendField";
            legendClick.style.backgroundColor = colors[j - 1];
            legendClick.onclick = function () {
                if(this.currentClusterSelected) this.currentClusterSelected.style.filter = "";
                if(this.currentClusterSelected === legendClick){
                     this.reAddLayers();
                     this.currentClusterSelected = null;
                     return;
                }
                this.currentClusterSelected = legendClick;
                legendClick.style.filter = "brightness(0.4)";
                this.reAddLayers();
                this.removeAllLayersApartFrom(cluster.group);
            }.bind(this)
            document.getElementById("clusterLegend").appendChild(legendClick);
        }
        this.getCacheAndRender();
    }

    getMaxPrediction(){
        let max = 0;
        for(const result of this.data){
            if(result.prediction > max)
                max = result.prediction;
        }
        return max;
    }

    getClusterFromGISJOIN(GISJOIN) {
        for (const cluster of this.clusters) {
            if (cluster.clusterHasGISJOIN(GISJOIN))
                return cluster;
        }
        return null;
    }

    removeAllLayers() {
        for (const cluster of this.clusters) {
            this.layerGroup.removeLayer(cluster.group);
        }
        document.getElementById("clusterLegend").innerHTML = "";
    }

    removeAllLayersApartFrom(layer) {
        for (const cluster of this.clusters) {
            if (cluster.group !== layer) {
                this.layerGroup.removeLayer(cluster.group);
            }
        }
    }

    reAddLayers() {
        this.removeAllLayersApartFrom(null);
        for (const cluster of this.clusters) {
            this.layerGroup.addLayer(cluster.group);
        }
    }
}