
class Chart {
    constructor(data) {
        this.views = [];
        this.data = data;
    }

    addTo(node) {
        let view = this.makeNewView();
        this.views.push(view);
        node.appendChild(view.svg.node());
    }

    hide(viewIndex) {
        this.view.svg.style("display", "none");
    }

    unhide(viewIndex) {
        this.view.svg.style("display", "default");
    }
}
