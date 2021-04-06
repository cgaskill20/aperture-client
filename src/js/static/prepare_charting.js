
let filter = new MapDataFilter();
window.renderInfrastructure.useFilter(filter);

let chartCataloge;
$.getJSON("json/graphPriority.json", (cataloge) => {
    chartCataloge = cataloge;
});

$(document).ready(() => {
    const chartingWindow = new resizable(1000, 3000, 'white');
    map.on('move', (e) => {
        
        values = filter.getModel
    });
});
