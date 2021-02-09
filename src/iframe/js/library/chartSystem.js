
class ChartSystem {
    constructor(map, chartCatalogeFilename) {
        this.filter = new MapDataFilter();
        RenderInfrastructure.useFilter(this.filter);
        this.map = map;

        this.chart = new BarChart([], 1000, 300);
        this.resizable = new resizable(1000, 300, "white");
        this.resizable.addChart(this.chart);

        $.getJSON(chartCatalogeFilename, (catalog) => {
            this.catalog = catalog;
            this.initialize();
        });

        this.doNotUpdate = false;
    }

    initialize() {
        console.log(this.catalog);
        this.map.on('move', (e) => {
            if (this.doNotUpdate) {
                return;
            }

            let graphable = this.catalog.map(e => Object.keys(e.constraints));
            graphable = graphable.flat();
            let values = this.filter.getModel(graphable, this.map.getBounds());
            console.log(values);
            this.chart.changeData(values, 10);
        });
    }
}
