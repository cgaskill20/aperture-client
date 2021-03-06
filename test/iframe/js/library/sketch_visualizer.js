const assert = require('assert');
const {sketch_visualizer} = require('../../../../src/iframe/js/library/sketch_visualizer');
global.encode_geohash = require('../../../../src/iframe/js/library/geohash_util.js').encode_geohash;
global.geohash_bounds = require('../../../../src/iframe/js/library/geohash_util.js').geohash_bounds;
global.getGeohashBase = require('../../../../src/iframe/js/library/geohash_util.js').getGeohashBase;

const ptc = {
    0.0: [0, 0, 255],
    0.5: [0, 255, 0],
    1.0: [255, 0, 0]
};
const sv = sketch_visualizer(ptc);

describe('sketch_visualizer()', function() {
    it('should initialize the sketch_visualizer with the given percentage', function() {
        assert.notDeepEqual(sv, undefined);
        assert.deepEqual(sv._percentageToColor, ptc);
        assert.deepEqual(sv._zoomToPixelSize, {
            3: 2,
            4: 3,
            5: 5,
            6: 8,
            7: 16,
            8: 35
        });
    });
});

describe('sketch_visualizer._rgbaToString()', function() {
    it('should correctly convert an array of RGBA values to a string', function() {
        assert.deepEqual(sv._rgbaToString([0, 1, 2, 3]), "rgba(0, 1, 2, 3)");
    });
});

describe('sketch_visualizer._getColorForPercentage()', function() {
    it('should correctly convert a float to an rgba value', function() {
        assert.deepEqual(sv._getColorForPercentage(0, 0), [0, 0, 254, 0]);
        assert.deepEqual(sv._getColorForPercentage(0.25, 0.25), [0, 127, 127, 0.25]);
        assert.deepEqual(sv._getColorForPercentage(0.5, 0.5), [0, 254, 0, 0.5]);
        assert.deepEqual(sv._getColorForPercentage(0.75, 0.75), [127, 127, 0, 0.75]);
        assert.deepEqual(sv._getColorForPercentage(1, 1), [254, 0, 0, 1]);
    });
});

describe('sketch_visualizer._getBoundingGeohash()', function() {
    it('should correctly return the smallest bounding geohash for the given bounds', function() {
        let bounds = {_northEast: {lat: 90, lng: 30}, _southWest: {lat: 92, lng: 28}};
        assert.deepEqual(sv._getBoundingGeohash(bounds), "bpbpbpbpbpbp");
        bounds = {_northEast: {lat: 90, lng: 30}, _southWest: {lat: 0, lng: -180}};
        assert.deepEqual(sv._getBoundingGeohash(bounds), "");
        bounds = {_northEast: {lat: 180, lng: 360}, _southWest: {lat: 140, lng: 360}};
        assert.deepEqual(sv._getBoundingGeohash(bounds), "upbpbpbpbpbp");
    });
});

describe('sketch_visualizer._standardizeBounds()', function() {
    it('should correctly return the convert the naming in the bounds object', function() {
        const bounds = {_northEast: {lat: 90, lng: 30}, _southWest: {lat: 92, lng: 28}};
        const targetBounds = {ne: {lat: 90, lng: 30}, sw: {lat: 92, lng: 28}};
        assert.deepEqual(sv._standardizeBounds(bounds), targetBounds);
    });
});

describe('sketch_visualizer._checkBoundIntersection()', function() {
    it('should correctly return whether the given bounds intersect', function() {
        let bounds1 = {ne: {lat: 90, lng: 30}, sw: {lat: 92, lng: 28}};
        let bounds2 = {ne: {lat: 89, lng: 30}, sw: {lat: 91, lng: 28}};
        assert(sv._checkBoundIntersection(bounds1, bounds2) === false);
        bounds1 = {ne: {lat: 90, lng: 30}, sw: {lat: 92, lng: 28}};
        bounds2 = {ne: {lat: 92, lng: 28}, sw: {lat: 90, lng: 30}};
        assert(sv._checkBoundIntersection(bounds1, bounds2) === true);
    });
});

describe('sketch_visualizer._searchForIntersectingGeohashes()', function() {
    it('should correctly fill a list with geohashes intersecting the given bounds', function() {
        const bounds1 = {ne: {lat: 90, lng: 30}, sw: {lat: 89, lng: 29}};
        const bounds2 = {ne: {lat: 89, lng: 30}, sw: {lat: 89.5, lng: 30.5}};
        let geohashList = [];
        sv._searchForIntersectingGeohashes(bounds2, "", geohashList);
        assert.deepEqual(geohashList,['bp', 'br', 'bx', 'bz', 'cp', 'cr', 'cx', 'cz', 'fp', 'fr', 'fx', 'fz',
            'gp', 'gr', 'gx', 'gz', "up", "ur", "ux", "uz", "vp", "vr", "vx", "vz", "yp", "yr", "yx", "yz", "zp", "zr",
            "zx", "zz"]);
        geohashList = [];
        sv._searchForIntersectingGeohashes(bounds2, "", geohashList, 1);
        assert.deepEqual(geohashList,['b', 'c', 'f', 'g', 'u', 'v', 'y', 'z']);
    });
});