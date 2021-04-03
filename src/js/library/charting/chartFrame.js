export default class ChartFrame {
    constructor(node, area, manager) {
        this.node = node;
        this.area = area;
        this.manager = manager;

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
        console.log(this.height);
        this.area.rerender(this.width, this.height);
    }

    changeFeature(axis, feature) {
        this.manager.changeFeature(axis, feature);
    }

    cycleAxis(axis, direction) {
        this.manager.cycleAxis(axis, direction);
    }

    getValidFeatures() {
        return this.manager.featureManager.getAllFeatures();
    }

    addNewFeatureCallback(callback) {
        this.manager.featureManager.addCallback(callback);
    }
}

