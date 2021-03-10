
/**
  * A class that represents an HTML element which can hold and dynamically
  * display multiple charts.
  * 
  * @author Pierce Smith, Matt Young (mostly Pierce Smith)
  */
class SingleChartArea {
    static runningID = 0;

    constructor() {
        this.viewIndex = SingleChartArea.runningID++;
        this.charts = [];
    }

    attachTo(node) {
        this.parentNode = node;
        this.container = document.createElement("div");
        this.container.className = "single-chart-area";
        this.parentNode.appendChild(this.container);

        this.addGraphBox = document.createElement("div");
        this.addGraphBox.className = "colorMode1 customBorder add-graph-box";
        this.addGraphBox.id = "graph-controller";
        this.addGraphMessage = document.createElement("p");
        this.addGraphMessage.className = "add-graph-message";
        this.addGraphMessage.innerText = "Add a...";

        this.graphButtonArea = document.createElement("div");
        this.graphButtonArea.id = "graph-button-area"
        this.histogramButton = document.createElement("button");
        this.histogramButton.className = "btn btn-outline-dark graph-button";
        this.histogramButton.id = "histogram-button-id";
        this.histogramButton.innerText = "Histogram";
        this.scatterplotButton = document.createElement("button");
        this.scatterplotButton.className = "btn btn-outline-dark graph-button";
        this.scatterplotButton.id = "scatterplot-button-id";
        this.scatterplotButton.innerText = "Scatterplot";
        this.lineGraphButton = document.createElement("button");
        this.lineGraphButton.className = "btn btn-outline-dark graph-button";
        this.lineGraphButton.id = "linegraph-button-id";
        this.lineGraphButton.innerText = "Line Graph";

        this.graphButtonArea.appendChild(this.histogramButton);
        this.graphButtonArea.appendChild(this.scatterplotButton);
        this.graphButtonArea.appendChild(this.lineGraphButton);

        this.addGraphBox.appendChild(this.addGraphMessage);
        this.addGraphBox.appendChild(this.graphButtonArea);
        this.parentNode.appendChild(this.addGraphBox);
    }

    addChart(chart) {
        this.charts.push(chart);
        chart.addTo(this.container);
        chart.hide(this.viewIndex);
    }

    showChart(index) {
        this.charts[index].unhide(this.viewIndex);
    }

    rerender(newWidth, newHeight) {
        if (this.hasNothingToRender) {
        } else {
            this.charts.forEach(chart => {
                chart.rerender(newWidth, newHeight, this.viewIndex);
            });
            this.showChart(1);
        }
    }

    tellNumberOfCharts(chartCount) {
        this.possibleChartCount = chartCount;
    }

    tellEmptyCharts(inaccessibleList) {
        this.hasNothingToRender = inaccessibleList.length === this.possibleChartCount;
    }
    
    toggleVisible() {
        if (this.container.style.display === "none") {
            this.container.style.display = "block";
        } else {
            this.container.style.display = "none";
        }
    }
}
