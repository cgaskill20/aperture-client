
export default class LineChartArea {
    constructor() {
        this.currentIndex = 0;
        this.charts = [];
    }

    attachTo(node) {
        this.parentNode = node;
        this.container = document.createElement("div");
        this.container.className = "line-chart-area";

        // this.notEnoughFeaturesMessage = document.createElement("p");
        // this.notEnoughFeaturesMessage.innerText = "Enable one or more constraints to start graphing";
        // this.container.appendChild(this.notEnoughFeaturesMessage);
            
        this.parentNode.appendChild(this.container);
    }

}
