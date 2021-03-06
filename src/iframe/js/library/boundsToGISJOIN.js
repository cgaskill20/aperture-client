const BoundsToGISJOIN = {
    tractBuckets: null, //loaded at end of file
    countyBuckets: null, //loaded at end of file
    geohashResolution: 3,

    boundsToData: function(bounds,level,blacklist){
        let geohashes = this.boundsToLengthNGeohashes(bounds);
        geohashes = geohashes.filter((geohash) => {
            return !blacklist.includes(geohash);
        });
        const datasource = level === "tract" ? this.tractBuckets : this.countyBuckets;
        if(datasource){
            const data = {};
            for(const geohash of geohashes){
                if(datasource[geohash])
                    data[geohash] = datasource[geohash];
            }
            return data;
        }
        return {};
    },

    boundsToGISJOINS: function(bounds,level){
        const geohashes = this.boundsToLengthNGeohashes(bounds);
        const datasource = level === "tract" ? this.tractBuckets : this.countyBuckets;
        if(datasource)
            return this.geohashesToGISJOINS(geohashes,datasource);
        return []
    },

    boundsToLengthNGeohashes: function(bounds) {
        const geohashCorners = {
            sw: encode_geohash(bounds._southWest.lat,bounds._southWest.lng,this.geohashResolution),
            se: encode_geohash(bounds._southWest.lat,bounds._northEast.lng,this.geohashResolution),
            nw: encode_geohash(bounds._northEast.lat,bounds._southWest.lng,this.geohashResolution),
            ne: encode_geohash(bounds._northEast.lat,bounds._northEast.lng,this.geohashResolution)
        }
        return this.fillInSpace(geohashCorners)
    },

    fillInSpace: function(corners){
        let space = [];
        const southernBorder = this.getSouthernBorder(corners);
        let slidingBorder = JSON.parse(JSON.stringify(southernBorder))
        space = this.addListToListNoDuplicates(slidingBorder,space)
        while(slidingBorder[0] !== corners.nw){ //go bottom to top
            for(let i = 0; i < slidingBorder.length; i++){
                slidingBorder[i] = geohash_adjacent(slidingBorder[i],'n')
            }
            space = this.addListToListNoDuplicates(slidingBorder,space)
        }
        return space;
    },

    addToListNoDuplicates: function(toAdd,list) {
        if(!list.includes(toAdd))
            list.push(toAdd)
        return list;
    },

    addListToListNoDuplicates: function(listToAdd,list){
        return [...new Set([...listToAdd,...list])];
    },

    getSouthernBorder(corners){
        //go sw to se
        let bottomBorder = [corners.sw];
        let recent = bottomBorder[0];
        while(recent !== corners.se){
            recent = geohash_adjacent(recent,"e"); //go from west to east on the south edge
            bottomBorder.push(recent);
        }
        return bottomBorder;
    },

    geohashesToGISJOINS(geohashes,datasource){
        let GISJOINS = [];
        for(const geohash of geohashes)
            if(datasource[geohash])
                GISJOINS = this.addListToListNoDuplicates(datasource[geohash],GISJOINS)
        return GISJOINS;
    }
}

fetch('../../json/tractGeohashBuckets.json')
  .then(response => response.json())
  .then(data => BoundsToGISJOIN.tractBuckets = data);
  fetch('../../json/countyGeohashBuckets.json')
  .then(response => response.json())
  .then(data => BoundsToGISJOIN.countyBuckets = data);