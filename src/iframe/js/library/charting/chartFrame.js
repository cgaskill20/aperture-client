class ChartFrame {
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
        this.area.rerender(this.width, this.height);
    }

    changeFeature(feature) {
        this.manager.changeFeature(feature);
    }

    cycleAxis(axis, direction) {
        this.manager.cycleAxis(axis, direction);
    }
}

