
class Chart {
    constructor(data) {
        this.views = [];
        this.data = data;
    }

    addTo(node) {
        let view = this.makeNewView(node, 1000, 1000);
        this.views.push(view);
        node.appendChild(view.svg.node());
    }

    rerenderAllViews() {
        for (let i = 0; i < this.views.length; i++) {
            this.rerender(this.views[i].width, this.views[i].height, i);
        }
    }

    hide(viewIndex) {
        this.views[viewIndex].svg.style("display", "none");
    }

    unhide(viewIndex) {
        this.views[viewIndex].svg.style("display", "default");
    }
}
