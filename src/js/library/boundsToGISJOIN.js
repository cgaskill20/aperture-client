import {encode_geohash, geohash_adjacent} from './geohash_util.js';

export default {
    buckets: null, //loaded at config
    geohashResolution: 3,

    config: async function (collection) {
        if(collection === "tract_geo_140mb_no_2d_index"){
            this.buckets = await import('../../json/tractGeohashBuckets.json');
        }
        else{
            this.buckets = await import('../../json/countyGeohashBuckets.json');
        }
    },

    boundsToData: function (bounds, blacklist) {
        let geohashes = this.boundsToLengthNGeohashes(bounds,blacklist);
        const datasource = this.buckets;
        if (datasource) {
            const data = {};
            for (const geohash of geohashes) {
                if (datasource[geohash] && datasource[geohash].length)
                    data[geohash] = datasource[geohash];
            }
            return data;
        }
        return {};
    },

    boundsToGISJOINS: function (bounds, blacklist) {
        const geohashes = this.boundsToLengthNGeohashes(bounds, blacklist);
        const datasource = this.buckets;
        if (datasource)
            return this.geohashesToGISJOINS(geohashes, datasource);
        return []
    },

    boundsToLengthNGeohashes: function (bounds,blacklist) {
        const geohashCorners = {
            sw: encode_geohash(bounds._southWest.lat, bounds._southWest.lng, this.geohashResolution),
            se: encode_geohash(bounds._southWest.lat, bounds._northEast.lng, this.geohashResolution),
            nw: encode_geohash(bounds._northEast.lat, bounds._southWest.lng, this.geohashResolution),
            ne: encode_geohash(bounds._northEast.lat, bounds._northEast.lng, this.geohashResolution)
        }
        return this.fillInSpace(geohashCorners).filter((geohash) => {
            return !blacklist.includes(geohash);
        }).filter((geohash) => {
            return this.buckets[geohash] && this.buckets[geohash].length !== 0;
        });
    },

    fillInSpace: function (corners) {
        let space = [];
        const southernBorder = this.getSouthernBorder(corners);
        let slidingBorder = JSON.parse(JSON.stringify(southernBorder))
        space = this.addListToListNoDuplicates(slidingBorder, space)
        while (slidingBorder[0] !== corners.nw) { //go bottom to top
            for (let i = 0; i < slidingBorder.length; i++) {
                slidingBorder[i] = geohash_adjacent(slidingBorder[i], 'n')
            }
            space = this.addListToListNoDuplicates(slidingBorder, space)
        }
        return space;
    },

    addToListNoDuplicates: function (toAdd, list) {
        if (!list.includes(toAdd))
            list.push(toAdd)
        return list;
    },

    addListToListNoDuplicates: function (listToAdd, list) {
        return [...new Set([...listToAdd, ...list])];
    },

    getSouthernBorder(corners) {
        //go sw to se
        let bottomBorder = [corners.sw];
        let recent = bottomBorder[0];
        while (recent !== corners.se) {
            recent = geohash_adjacent(recent, "e"); //go from west to east on the south edge
            bottomBorder.push(recent);
        }
        return bottomBorder;
    },

    geohashesToGISJOINS(geohashes, datasource) {
        let GISJOINS = [];
        for (const geohash of geohashes)
            if (datasource[geohash])
                GISJOINS = this.addListToListNoDuplicates(datasource[geohash], GISJOINS)
        return GISJOINS;
    }
}
