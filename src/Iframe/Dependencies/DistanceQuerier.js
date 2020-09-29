DistanceQuerier = {
    currentLatlng: null,
    map: null,
    radius: 5, // in miles
    querier: null,
    shapeGroup: L.layerGroup(),

    initialize: function(map, querier) {
        this.map = map;
        this.querier = querier;
    },

    query: function(latlng) {
        DistanceQuerier.currentLatlng = latlng;
        DistanceQuerier.map.removeLayer(DistanceQuerier.shapeGroup);
        DistanceQuerier.shapeGroup.clearLayers();
        // replace this by distance query
        const nsew = DistanceQuerier.getNSEW(latlng);
        DistanceQuerier.querier.queryGRPC("CensusRequest",0,nsew,null,DistanceQuerier.mapShapes);
        DistanceQuerier.map.addLayer(DistanceQuerier.shapeGroup);
    },

    /**
     * See https://stackoverflow.com/questions/4000886/gps-coordinates-1km-square-around-a-point
     */
    getNSEW: function(latlng) {
        const circ = 24901; // circumference of earth in miles
        let latDist = Math.abs(DistanceQuerier.radius * (360 / circ));
        let lngDist = Math.abs(DistanceQuerier.radius * (360 / (Math.cos(latlng.lat) * circ)));
        //console.log("lat: " + latlng.lat + " lng: " + latlng.lng);
        //console.log("lat: " + latDist + " lng: " + lngDist);
        return {
            north: latlng.lat + latDist,
            south: latlng.lat - latDist,
            east: latlng.lng + lngDist,
            west: latlng.lng - lngDist
        };
    },

    mapShapes: function(response) {
        let shapeSpecs = DistanceQuerier.getShapeSpecs(response);
        let distance = DistanceQuerier.getDistance(shapeSpecs.centroid);
        if (distance > DistanceQuerier.radius) {
            //console.log(distance);
            return;
        }
        console.log(distance);
        let percent = 1 - distance/DistanceQuerier.radius;
        //console.log("percentage: " + DistanceQuerier.getColorForPercentage(percent));
        let color = DistanceQuerier.getColorForPercentage(percent);
        L.polygon(shapeSpecs.latlngs, {
            color: color,
            weight: 1
        }).addTo(DistanceQuerier.shapeGroup);
    },

    getShapeSpecs: function(response) {
        let latlngs = [];
        let pointSum = response.geometry.coordinates[0][0].length;
        let latSum = 0;
        let lngSum = 0;
        for (let i = 0; i < response.geometry.coordinates[0][0].length; i++) {
            let lat = response.geometry.coordinates[0][0][i][1];
            let lng = response.geometry.coordinates[0][0][i][0];
            latlngs.push([lat,lng]);
            latSum += lat;
            lngSum += lng;
        }
        let centroid = [latSum/pointSum, lngSum/pointSum];

        return {
            latlngs: latlngs,
            centroid: centroid
        }
    },

    // get distance in mi
    /**
     * https://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates
     * @param centroid
     * @returns {number}
     */
    getDistance: function(centroid) {
        const earthRadius = 3958.8;

        let dLat = DistanceQuerier.degreesToRadians(centroid[0] -
            DistanceQuerier.currentLatlng.lat);
        let dLng = DistanceQuerier.degreesToRadians(centroid[1] -
            DistanceQuerier.currentLatlng.lng);

        let lat1 = DistanceQuerier.currentLatlng.lat;
        let lat2 = centroid[0];

        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLng/2) * Math.sin(dLng/2) * Math.cos(lat1) * Math.cos(lat2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return earthRadius * c;
    },

    degreesToRadians: function(degrees) {
        return degrees * Math.PI / 180;
    },

    getColorForPercentage: function(pct) {
        const percentColors = [
            { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
            { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
            { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } } ];

        for (var i = 1; i < percentColors.length - 1; i++) {
            if (pct < percentColors[i].pct) {
                break;
            }
        }

        let lower = percentColors[i - 1];
        let upper = percentColors[i];
        let range = upper.pct - lower.pct;
        let rangePct = (pct - lower.pct) / range;
        let pctLower = 1 - rangePct;
        let pctUpper = rangePct;
        let color = {
            r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
            g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
            b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
        };

        let red = color.r.toString(16);
        if (red.length < 2)
            red = "0"+red;
        let green = color.g.toString(16);
        if (green.length < 2)
            green = "0" + green;
        return "#"+red+green+"00";
    },
};

distance_querier = function (map, querier) {
    const distance_querier = DistanceQuerier;
    distance_querier.initialize(map, querier);
    return distance_querier;
};

try {
    module.exports = {
        distance_querier: distance_querier
    }
} catch (e) { }