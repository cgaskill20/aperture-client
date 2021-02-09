
class ChartSystem {
    constructor(map, chartCatalogeFilename) {
        this.filter = new MapDataFilter();
        this.map = map;
        this.resizable = new resizable(1000, 300, "white");

        $.getJSON(chartCatalogeFilename, (catalog) => {
            this.chartCataloge = catalog;
        });

        this.initialize();
    }

    initialize() {
        this.map.on('move', (e) => {
            let graphable = this.cataloge.map(e => Object.keys(e.constraints));
            graphable = graphable.flat();
            values = this.filter.getModel(graphable, this.map.getBounds());


        });
    }
}
