// exampleFilterDigester.js

// Create a filter.
let filter = new MapDataFilter();

// Tell the RenderInfrastructure object to use it.
RenderInfrastructure.useFilter(filter);

// use .getModel to get information from it.
window.setInterval(() => {
    console.log(filter.getModel("2010_median_household_income", map.getBounds()));
}, 2000);


