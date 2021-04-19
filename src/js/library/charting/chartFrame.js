export default class ChartFrame {
    constructor(node, area, manager, type) {
        this.node = node;
        this.area = area;
        this.manager = manager;
        this.type = type;

        this.width = 400;
        this.height = 300;
    }

    setSize(width, height) {
        this.width = width;
        this.height = height;
    }

    getDOMNode() {
        return this.node;
    }

    resize() { 
        this.area.rerender(this.width, this.height);
    }

    passMessage(message) {
        this.manager.passMessage(message);
    }

    getValidFeatures() {
        return this.manager.featureManager.getAllFeatures();
    }

    addNewFeatureCallback(callback) {
        this.manager.featureManager.addCallback(callback);
    }

    getChartType() {
        return this.type;
    }
}

