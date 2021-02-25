
/**
  * A class that represents an HTML element which can hold and dynamically
  * display multiple charts.
  * 
  * @author Pierce Smith
  */
class SingleChartArea {
    static MAX_SIMULTANEOUS_CHARTS = 6;
    static MIN_CHART_SIZE = 300;

    constructor() {
        this.availableContainers = [];
        this.visibleContainers = [];
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

        this.attachChartContainers(this.container);
    }

    attachChartContainers(node) {
        for (let i = this.availableContainers.length; i < ChartArea.MAX_SIMULTANEOUS_CHARTS; i++) {
            let containerNode = document.createElement("div");
            containerNode.className = "chart-container";
            node.appendChild(containerNode);

            let containerObject = new ChartContainer(containerNode, i);
            containerObject.hide();
            this.availableContainers.push(containerObject);
        }
    }

    addChart(chart) {
        this.availableContainers.forEach(container => {
            container.addChart(chart);
        });
    }

    rerender(newWidth, newHeight) {
        if (this.hasNothingToRender) {
            this.showUsageMessage();
        } else {
            this.hideUsageMessage();
            this.resizeContainers(newWidth, newHeight);
        }
    }

    showUsageMessage() {
        this.usageMessage.style.display = "inline";
    }

    hideUsageMessage() {
        this.usageMessage.style.display = "none";
    }

    resizeContainers(newWidth, newHeight) {
        let availableSpace = this.parentNode.clientHeight;

        let i = 0;
        // Show containers we have space for
        for (; (i * ChartArea.MIN_CHART_SIZE) < availableSpace; i++) {
            this.availableContainers[i].unhide();
        }

        // Hide the rest
        for (; i < this.availableContainers.length; i++) {
            this.availableContainers[i].hide();
        }

        this.visibleContainers = this.availableContainers.filter(container => !container.hidden);
        this.visibleContainers.forEach(container => {
            container.resize(newWidth, newHeight / this.visibleContainers.length);
        });
    }

    tellNumberOfCharts(chartCount) {
        this.possibleChartCount = chartCount;
    }

    tellEmptyCharts(inaccessibleList) {
        this.hasNothingToRender = inaccessibleList.length === this.possibleChartCount;

        this.visibleContainers.forEach(container => {
            container.setForbiddenIndices(inaccessibleList);
        });
    }

}
