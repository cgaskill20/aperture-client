
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
