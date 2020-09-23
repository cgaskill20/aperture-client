const MAPNUMBER = 3;

var buildingmap = new L.Map('map3');
buildingmap.setView(buildingmap.wrapLatLng(parent.view), 10, false);
console.log(buildingmap.getCenter())

new L.TileLayer('https://api.mapbox.com/styles/v1/osmbuildings/cjt9gq35s09051fo7urho3m0f/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoib3NtYnVpbGRpbmdzIiwiYSI6IjNldU0tNDAifQ.c5EU_3V8b87xO24tuWil0w', {
    attribution: '© Map tiles <a href="https://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    maxNativeZoom: 20
}).addTo(buildingmap);

var osmb = new OSMBuildings(buildingmap).load('https://{s}.data.osmbuildings.org/0.2/anonymous/tile/{z}/{x}/{y}.json');

//updates controller----------------------------------------------
buildingmap.on("move", function () {
    parent.setGlobalPosition(buildingmap.getCenter(), MAPNUMBER);
});
buildingmap.on("zoomend", function () {
    parent.setGlobalPositionFORCE(buildingmap.getCenter(), MAPNUMBER);
});
//----------------------------------------------------------------

var thisMapsSetter = function (view, zoom) {
    buildingmap.setView(buildingmap.wrapLatLng(view), buildingmap.getZoom());
}
parent.setterFunctions.push({
    setterFunc: thisMapsSetter,
    mapNum: MAPNUMBER
});