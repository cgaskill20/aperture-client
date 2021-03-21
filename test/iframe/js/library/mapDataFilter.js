const assert = require('assert');
var mdf = require('../../../../src/iframe/js/library/mapDataFilter.js');

const exampleData = [
    { properties: { median_income: 44000 }},
    { properties: { median_income: 43000 }},
    { properties: { median_income: 16000 }},
    { properties: { median_income: 73000 }},
    { properties: { median_income: 244000, NAMELSAD10: "Some Tract", NAME10: "65.0" }},
    { properties: { median_income: 8000, NAMELSAD10: "Some County" }},
    { properties: { population: 7000 }},
    { properties: { population: 65000, NAME10: "Some" }},
    { properties: { population: 9000 }},
    { properties: { population: 2000 }},
];

describe('MapDataFilter', () => {
    describe('add()', () => {
        it('can add single data points', () => {
            let filter = new mdf.MapDataFilter();
            filter.add(exampleData[0], "income");
            assert(filter.data.income.length === 1);
            assert(filter.data.income[0].properties.median_income === 44000);
            filter.add(exampleData[1], "income");
            assert(filter.data.income.length === 2);
            assert(filter.data.income[1].properties.median_income === 43000);
        });
        it ('can add multiple data points', () => {
            let filter = new mdf.MapDataFilter();
            filter.add(exampleData, "coll");
            assert(filter.data.coll.length === exampleData.length);
            assert(filter.data.coll[0].properties.median_income === 44000);
            assert(filter.data.coll[5].properties.median_income === 8000);
            assert(filter.data.coll[6].properties.population === 7000);
        });
    });
    
    describe('clear()', () => {
        it('removes all data points from the filter', () => {
            let filter = new mdf.MapDataFilter();
            filter.add(exampleData);
            filter.clear();
            assert(filter.data.length === 0);
        });
    });

    describe('discardOldData()', () => {
        it('can remove data', (done) => {
            let filter = new mdf.MapDataFilter();
            filter.add(exampleData);
            setTimeout(() => { 
                filter.discardOldData(100);
                assert(filter.data.length === 0);
                done();
            }, 200);
        });

        it('properly removes only outdated data', (done) => {
            let filter = new mdf.MapDataFilter();

            filter.add(exampleData[0]);
            setTimeout(() => { filter.add(exampleData[1]); }, 100);
            setTimeout(() => { filter.add(exampleData[2]); }, 200);
            setTimeout(() => { 
                filter.discardOldData(150); 
                assert(filter.data.length === 1);
                assert(filter.data[0].properties.median_income === 16000);
                done(); 
            }, 300);
        });
    });

    describe('getModel()', () => {
        it('can create single models', () => {
            let filter = new mdf.MapDataFilter();
            filter.add(exampleData);
            let model = filter.getModel('median_income');
            assert(model.median_income.length === 6);
            assert(model.median_income[1].data === 43000);
        });

        it('can create multiple models', () => {
            let filter = new mdf.MapDataFilter();
            filter.add(exampleData);
            let model = filter.getModel(['median_income', 'population']);
            assert(model.median_income.length === 6);
            assert(model.population.length === 4);
        });

        it('properly records name and type', () => {
            let filter = new mdf.MapDataFilter();
            filter.add(exampleData);
            let model = filter.getModel(['median_income', 'population']);
            assert.equal(model.median_income[4].type, "tract");
            assert.equal(model.median_income[4].locationName, "65.0");
            assert.equal(model.median_income[5].type, "county");
        });
    });

    describe('onGetNewData', () => {
        it('can set a data callback', () => {
            let filter = new mdf.MapDataFilter();

            let callbackedData = [];
            filter.onGetNewData((data) => { callbackedData.push(data); });
            filter.add(exampleData);

            assert.equal(callbackedData.length, exampleData.length);
        });
    });
});
