const BoundsToGISJOIN = {
    tractBuckets: null, //loaded at end of file
    countyBuckets: null, //loaded at end of file
    geohashResolution: 3,

    boundsToLengthNGeohashes: function(bounds) {
        const geohashCorners = {
            sw: encode_geohash(bounds.getSouth(),bounds.getWest(),this.geohashResolution),
            se: encode_geohash(bounds.getSouth(),bounds.getEast(),this.geohashResolution),
            nw: encode_geohash(bounds.getNorth(),bounds.getWest(),this.geohashResolution),
            ne: encode_geohash(bounds.getNorth(),bounds.getEast(),this.geohashResolution)
        }
        let geohashesInViewport = this.fillInSpace(geohashCorners)
    },

    addToListNoDuplicates: function(toAdd,list) {
        if(!list.includes(toAdd))
            list.push(toAdd)
        return list;
    },

    addListToListNoDuplicates: function(listToAdd,list){
        return [...new Set([...listToAdd,...list])];
    },

    fillInSpace: function(corners){
        console.log(corners)
        let space = [];
        for(const corner in corners)
            space = this.addToListNoDuplicates(corners[corner],space)
        space = this.addToListNoDuplicates(getSouthernBorder(corners),space)
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
    }
}
$.getJSON("json/tractGeohashBuckets.json", async function (d) { //this isnt on the mongo server yet so query it locally
    BoundsToGISJOIN.tractBuckets = d;
});