
/**
  * A class that represents an HTML element which can hold and dynamically
  * display multiple charts.
  * 
  * @author Pierce Smith
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
        this.addGraphBox.className = "colorMode1 customBorder graph-box";
        this.addGraphMessage = document.createElement("p");
        this.addGraphMessage.className = "add-graph-message";
        this.addGraphMessage.innerText = "Add a graph...";

        this.graphButtonArea = document.createElement("div");
        this.histogramButton = document.createElement("button");
        this.histogramButton.className = "btn btn-outline-dark graph-button";
        this.histogramButton.innerText = "Histogram";
        this.scatterplotButton = document.createElement("button");
        this.scatterplotButton.className = "btn btn-outline-dark graph-button";
        this.scatterplotButton.innerText = "Scatterplot";
        this.lineGraphButton = document.createElement("button");
        this.lineGraphButton.className = "btn btn-outline-dark graph-button";
        this.lineGraphButton.innerText = "Line Graph";

        this.graphButtonArea.appendChild(this.histogramButton);
        this.graphButtonArea.appendChild(this.scatterplotButton);
        this.graphButtonArea.appendChild(this.lineGraphButton);

        this.usageMessage = document.createElement("p");
        this.usageMessage.innerText = "Enable data exploration to begin graphing";
        this.usageMessage.className = "chart-usage-message";
        this.usageMessage.style.display = "none";
        this.parentNode.appendChild(this.usageMessage);
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
            this.showUsageMessage();
        } else {
            this.hideUsageMessage();
            this.charts.forEach(chart => {
                chart.rerender(newWidth, newHeight, this.viewIndex);
            });
            this.showChart(1);
        }
    }

    showUsageMessage() {
        this.usageMessage.style.display = "inline";
    }

    hideUsageMessage() {
        this.usageMessage.style.display = "none";
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
