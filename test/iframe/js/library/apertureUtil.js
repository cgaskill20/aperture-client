const assert = require('assert');
var util = require('../../../../src/iframe/js/library/apertureUtil');

const pointGeoJSON = JSON.parse('{"geometry":{"type":"Point","coordinates":[-105.03530293462781,40.567845225922326]},"_id":{"$oid":"5f868381c2af109387d74fec"},"type":"Feature","properties":{"ZIP":"80525","POPULATION":288,"LONGITUDE":-105.03530293499995,"FT_TEACHER":18,"STATE":"CO","VAL_DATE":"2016/01/15","DISTRICTID":"803990","COUNTYFIPS":"08069","OBJECTID":99066,"ENROLLMENT":270,"STATUS":"1","NAICS_CODE":"611110","END_GRADE":"08","NCESID":"080399006573","COUNTRY":"USA","TYPE":"1","COUNTY":"LARIMER","LEVEL_":"ELEMENTARY","ST_GRADE":"KG","TELEPHONE":"(970) 568-5456","NAME":"MOUNTAIN SAGE COMMUNITY SCHOOL","VAL_METHOD":"IMAGERY","CITY":"FORT COLLINS","SHELTER_ID":"NOT AVAILABLE","ADDRESS":"2310 EAST PROSPECT ROAD","SOURCE":"http://nces.ed.gov/GLOBALLOCATOR/sch_info_popup.asp?Type=Public&ID=080399006573","SOURCEDATE":"2016/01/05","ZIP4":"NOT AVAILABLE","LATITUDE":40.56784522600003,"NAICS_DESC":"ELEMENTARY AND SECONDARY SCHOOLS","WEBSITE":"NOT AVAILABLE"},"id":"5f868381c2af109387d74fec"}');
const lineGeoJSON = JSON.parse('{"geometry":{"type":"LineString","coordinates":[[-104.80239,40.37141],[-104.80694,40.94508],[-104.74965,40.96079],[-104.2806,40.98829],[-104.08579,40.99178],[-102.99201,41.20027]]},"_id":{"$oid":"5f16543c4b8c2a92130731c6"},"id":30808,"type":"Feature","properties":{"Operator":"Tallgrass Interstate Gas Transmission","Shape_Leng":0.88671076607,"TYPEPIPE":"Interstate","Shape__Len":290626.23415315}}');
const polyGeoJSON = JSON.parse('{"geometry":{"type":"Polygon","coordinates":[[[-105.13885544065886,40.40299726423427],[-105.13875448713502,40.40303334703509],[-105.13844432906546,40.40308151025965],[-105.13885544065886,40.40299726423427]]]},"_id":{"$oid":"5f3a83a15c90881617f44ec9"},"type":"Feature","properties":{"VELOCITY":-9999,"DFIRM_ID":"08069C","BFE_REVERT":-9999,"SFHA_TF":"T","VERSION_ID":"1.1.1.0","DUAL_ZONE":"F","SOURCE_CIT":"08069C_FIRM1","STUDY_TYP":"NP","FLD_ZONE":"AE","DEP_REVERT":-9999,"STATIC_BFE":-9999,"DEPTH":-9999},"id":"5f3a83a15c90881617f44ec9"}');
const multiPolyGeoJSON = JSON.parse('{"geometry":{"type":"MultiPolygon","coordinates":[[[[-105.13885544065886,40.40299726423427],[-105.13875448713502,40.40303334703509],[-105.13844432906546,40.40308151025965],[-105.13885544065886,40.40299726423427]]], [[[105.13, 40.40], [105.60, 41.50]]]]},"_id":{"$oid":"5f3a83a15c90881617f44ec9"},"type":"Feature","properties":{"VELOCITY":-9999,"DFIRM_ID":"08069C","BFE_REVERT":-9999,"SFHA_TF":"T","VERSION_ID":"1.1.1.0","DUAL_ZONE":"F","SOURCE_CIT":"08069C_FIRM1","STUDY_TYP":"NP","FLD_ZONE":"AE","DEP_REVERT":-9999,"STATIC_BFE":-9999,"DEPTH":-9999},"id":"5f3a83a15c90881617f44ec9"}');
const polyGeoJSONClone = JSON.parse(JSON.stringify(polyGeoJSON));

describe('Util', function () {
    describe('getParamsAndTagsFromGeoJsonFeature()', function () {
        it('gets params and tags from the object passed to it', function () {
            assert.deepEqual(util.Util.getParamsAndTagsFromGeoJsonFeature({ properties: { tags: { man_made: "water_works", waterway: "dam" } } }), { params: ["man_made", "waterway"], tagsObj: { man_made: "water_works", waterway: "dam" } });
        });
    });
    describe('getLatLngFromGeoJsonFeature()', function () {
        it('gets latlng from the object passed to it', function () {
            assert.deepEqual(util.Util.getLatLngFromGeoJsonFeature({ geometry: { type: "none", coordinates: L.latLng(40, 90) } }), { lat: 0, lng: 0 });
            assert.deepEqual(util.Util.getLatLngFromGeoJsonFeature(pointGeoJSON), { lat: 40.567845225922326, lng: -105.03530293462781 });
            assert.deepEqual(util.Util.getLatLngFromGeoJsonFeature(lineGeoJSON), { lat: 40.78584, lng: -103.899475 });
            assert.deepEqual(util.Util.getLatLngFromGeoJsonFeature(polyGeoJSON), { lat: 40.40303938724696, lng: -105.13864988486216 });
        });
    });
    describe('getFeatureType()', function () {
        it('gets type from the geoJSON passed to it', function () {
            assert.deepEqual(util.Util.getFeatureType({ geometry: { type: "none", coordinates: L.latLng(40, 90) } }), -1);
            assert.deepEqual(util.Util.getFeatureType(pointGeoJSON), util.Util.FEATURETYPE.point);
            assert.deepEqual(util.Util.getFeatureType(lineGeoJSON), util.Util.FEATURETYPE.lineString);
            assert.deepEqual(util.Util.getFeatureType(polyGeoJSON), util.Util.FEATURETYPE.polygon);
        });
    });
    describe('simplifyGeoJSON()', function () {
        it('simplifies GeoJSON using the simplify.js library', function () {
            util.Util.simplifyGeoJSON(polyGeoJSON, 0.01);
            assert.deepEqual(polyGeoJSON.geometry, JSON.parse('{"type":"Polygon","coordinates":[[[-105.13885544065886,40.40299726423427],[-105.13885544065886,40.40299726423427]]]}'));
        });
    });
    describe('getNameFromGeoJsonFeature()', function () {
        it('gets a name from a GeoJSON feature', function () {
            assert.deepEqual(util.Util.getNameFromGeoJsonFeature(polyGeoJSON, { "testName": { "color": "#FF0000" } }), "testName");
        });
    });
    describe('createDetailsFromGeoJsonFeature()', function () {
        it('creates details from a geoJSON feature', function () {
            assert.deepEqual(util.Util.createDetailsFromGeoJsonFeature(polyGeoJSON, "testName", { "testName": { "color": "#FF0000" } }), "<b>TestName</b><br><ul style='padding-inline-start:20px;margin-block-start:2.5px;'><li>VELOCITY: -9999</li><li>DFIRM ID: 08069C</li><li>BFE REVERT: -9999</li><li>SFHA TF: T</li><li>VERSION ID: 1.1.1.0</li><li>DUAL ZONE: F</li><li>SOURCE CIT: 08069C FIRM1</li><li>STUDY TYP: NP</li><li>FLD ZONE: AE</li><li>DEP REVERT: -9999</li><li>STATIC BFE: -9999</li><li>DEPTH: -9999</li></ul>");
        });
    });
    describe('getParamsAndTagsFromGeoJsonFeature()', function () {
        it('gets params and tags from a geoJSON feature', function () {
            assert.deepEqual(util.Util.getParamsAndTagsFromGeoJsonFeature(polyGeoJSON), { params: ['VELOCITY', 'DFIRM_ID', 'BFE_REVERT', 'SFHA_TF', 'VERSION_ID', 'DUAL_ZONE', 'SOURCE_CIT', 'STUDY_TYP', 'FLD_ZONE', 'DEP_REVERT', 'STATIC_BFE', 'DEPTH'], tagsObj: { BFE_REVERT: -9999, DEPTH: -9999, DEP_REVERT: -9999, DFIRM_ID: '08069C', DUAL_ZONE: 'F', FLD_ZONE: 'AE', SFHA_TF: 'T', SOURCE_CIT: '08069C_FIRM1', STATIC_BFE: -9999, STUDY_TYP: 'NP', VELOCITY: -9999, VERSION_ID: '1.1.1.0' } });
        });
    });
    describe('capitalizeString()', function () {
        it('capitalizes strings', function () {
            assert.deepEqual(util.Util.capitalizeString("test1 test2 Test3"), "Test1 Test2 Test3");
        });
    });
    describe('underScoreToSpace()', function () {
        it('converts underscores to spaces', function () {
            assert.deepEqual(util.Util.underScoreToSpace("test1_test2_Test3"), "test1 test2 Test3");
        });
    });
    describe('spaceToUnderScore()', function () {
        it('converts spaces to underscores', function () {
            assert.deepEqual(util.Util.spaceToUnderScore("test1 test2 Test3"), "test1_test2_Test3");
        });
    });
    describe('createGeoJsonObj()', function () {
        it('creates a full geojson object from a feature array', function () {
            assert.deepEqual(util.Util.createGeoJsonObj([polyGeoJSON]), {
                "type": "FeatureCollection",
                "features": [polyGeoJSON]
            });
        });
    });
    describe('fixGeoJSONID()', function () {
        it('if a geoJSON feature is misidentified as a line, make it a poly', function () {
            polyGeoJSONClone.geometry.type = "LineString";
            util.Util.fixGeoJSONID(polyGeoJSONClone);
            assert.deepEqual(polyGeoJSONClone.geometry.type, "Polygon");

            polyGeoJSONClone.geometry.type = "LineString";
            const newTest = util.Util.createGeoJsonObj([polyGeoJSONClone]);
            util.Util.fixGeoJSONID(newTest);
            assert.deepEqual(newTest.features[0].geometry.type, "Polygon");
        });
    });
    describe('normalizeFeatureID()', function () {
        it('make weird mongodb ids into string .ids', function () {
            polyGeoJSONClone.id = null;
            polyGeoJSONClone._id = { $oid: "12345" };
            util.Util.normalizeFeatureID(polyGeoJSONClone);
            assert.deepEqual(polyGeoJSONClone.id, "12345");
        });
    });
    describe('removePropertiesPrefix()', function () {
        it('removes properties. from name of variable', function () {
            assert.deepEqual(util.Util.removePropertiesPrefix("properties.test"), "test");
        });
    });
    describe('leafletBoundsToGeoJSONPoly()', function () {
        it('removes properties. from name of variable', function () {
            assert.deepEqual(util.Util.leafletBoundsToGeoJSONPoly(JSON.parse('{"_southWest":{"lat":40.32874883206875,"lng":-105.53878784179689},"_northEast":{"lat":40.817446884558805,"lng":-104.63516235351562}}')), [
                [
                    -105.53878784179689,
                    40.32874883206875
                ],
                [
                    -105.53878784179689,
                    40.817446884558805
                ],
                [
                    -104.63516235351562,
                    40.817446884558805
                ],
                [
                    -104.63516235351562,
                    40.32874883206875
                ],
                [
                    -105.53878784179689,
                    40.32874883206875
                ]
            ]
            );
        });
    });
    describe('mirrorLatLng()', () => {
        it('swaps entires when passed an array', () => {
            let latlng = [20, 30];
            assert(util.Util.mirrorLatLng(latlng)[0] === 30);
            assert(util.Util.mirrorLatLng(latlng)[1] === 20);
        });

        it('swaps entires when passed an object', () => {
            let latlng = { lat: 20, lng: 30, };
            assert(util.Util.mirrorLatLng(latlng).lat === 30);
            assert(util.Util.mirrorLatLng(latlng).lng === 20);
        });
    });
    describe('arePointsApproximatelyInBounds()', () => {
        it('can guess for small numbers of points', () => {
            this.timeout(2000);
            let points = [
                [1, 1],
                [2, 1],
                [3, 1], 
                [4, 1],
                [5, 1],
                [6, 1],
            ];
            let bounds = L.latLngBounds(
                [3.5, 3],
                [5.5, -3],
            );
            let badbounds = L.latLngBounds(
                [7.5, 3],
                [8.5, -3],
            );
            assert(util.Util.arePointsApproximatelyInBounds(points, bounds));
            assert(!util.Util.arePointsApproximatelyInBounds(points, badbounds));
        });
    });

    describe('isInBounds()', () => {
        it('can determine bounds for multipolygon', () => {
            let entry = multiPolyGeoJSON;
            debugger;
            assert(util.Util.isInBounds(entry, L.latLngBounds([30, -100], [50, -120])));
            assert(util.Util.isInBounds(entry, L.latLngBounds([30, 100], [50, 120])));
            assert(!util.Util.isInBounds(entry, L.latLngBounds([30, 20], [50, 30])));
        });
    });
});

