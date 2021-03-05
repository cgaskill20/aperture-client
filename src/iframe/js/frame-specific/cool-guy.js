//cracked lib that will find all gisjoins for a geohash
const querier = sustain_querier();
const base32 = '0123456789bcdefghjkmnpqrstuvwxyz';
const tlhcare = "bcf9d"
let boundsQueue = []
let results = {}

for (const indx1 of tlhcare) {
    for (const indx2 of base32) {
        for (const indx3 of base32) {
            const geohash = `${indx1}${indx2}${indx3}`
            boundsQueue.push({
                geohash: geohash,
                bounds: geohash_bounds(geohash)
            })
            results[geohash] = [];
        }
    }
}
console.log(boundsQueue)

const geoboundsToGeoJSONPoly = (b) => {
    return [[b.sw.lon, b.sw.lat], [b.sw.lon, b.ne.lat],
    [b.ne.lon, b.ne.lat], [b.ne.lon, b.sw.lat],
    [b.sw.lon, b.sw.lat]];
}
let proc = 0;
const process = () => {
    console.log(JSON.stringify(results))
    console.log(`Process ${++proc} / 5028`)
    const bounds = boundsQueue.shift()
    if (!bounds) return;
    let q = [];
    const barray = geoboundsToGeoJSONPoly(bounds.bounds);
    q.push({ "$match": { geometry: { "$geoIntersects": { "$geometry": { type: "Polygon", coordinates: [barray] } } } } }); //only get geometry in viewport
    q.push({ $project: { "_id":0,"GISJOIN":1 } })
    const stream = querier.getStreamForQuery(SmartQuerier.dbMachine, SmartQuerier.dbPort, "county_geo_GISJOIN", JSON.stringify(q));
    stream.on('data', function (r) {
        const data = JSON.parse(r.getData());
        results[bounds.geohash].push(data.GISJOIN)
        console.log(`zw Added ${data.GISJOIN} to the ${bounds.geohash} bucket`)
    });
    stream.on('end', function(e){
        console.log("end")
        setTimeout(function(){
            process()
        }, 100);
    });
}
//process();


