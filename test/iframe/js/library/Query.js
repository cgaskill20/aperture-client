const assert = require('assert');
import Query from '../../../../src/js/library/Query';

const bounds = JSON.parse("{\"_southWest\":{\"lat\":39,\"lng\":-107},\"_northEast\":{\"lat\":41,\"lng\":-105}}")

describe('getBoundsGetGeohashes()', function () {
    it('should get bounds and geohashes correctly', function () {
        const [bounds,geohashes] = Query._getBoundsGetGeohashes({
            bounds,
            geohashBlacklist: []
        });
        console.log(geohashes)
    });
});