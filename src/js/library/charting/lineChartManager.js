
export default class LineChartManager {
    constructor(catalog, chartArea, validFeatureManager, chartSystem, chartType) {
        this.chart = new chartType();
        this.chartArea = chartArea;
        this.chartSystem = chartSystem;
    }

    update(values) {
        chart.changeData(values);
    }
}
