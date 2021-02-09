
// Demonstration class - document me pls :(
class BarChart {
    constructor(data, initialWidth, initialHeight) {
        this.data = data;
        this.width = initialWidth;
        this.height = initialHeight;
        this.binNum = 10;
    }

    rerender(newWidth, newHeight) {
        this.width = newWidth;
        this.height = newHeight;
        this.svg.attr("viewBox", [0, 0, newWidth, newHeight]);
        this.x
            .range([this.margin.left, newWidth - this.margin.right])
            .domain([this.bins[0].x0, this.bins[this.bins.length - 1].x1]);
        this.y
            .range([newHeight - this.margin.bottom, this.margin.top])
            .domain([0, d3.max(this.bins, d => d.length)]).nice();
        this.svg.select("g#xAxis").call(this.xAxis);
        this.svg.select("g#yAxis").call(this.yAxis);
        this.svg.select("g#rects")
            .selectAll("rect")
            .data(this.bins)
            .join("rect")
                .attr("x", d => this.x(d.x0) + 1)
                .attr("width", d => Math.max(0, this.x(d.x1) - this.x(d.x0) - 1))
                .attr("y", d => this.y(d.length))
                .attr("height", d => this.y(0) - this.y(d.length));
    }

    changeBins(binNum) {
        this.bins = d3.bin().thresholds(binNum)(this.data);
    }

    changeData(newData, binNum) {
        this.data = newData;
        this.changeBins(binNum);
    }

    addTo(node) {
        this.svg = d3.create("svg").attr("viewBox", [0, 0, this.width, this.height]);

        this.bins = d3.bin().thresholds(8)(this.data);
        this.margin = { top: 20, right: 20, bottom: 30, left: 40 };

        this.x = d3.scaleLinear()
            .domain([this.bins[0].x0, this.bins[this.bins.length - 1].x1])
            .range([this.margin.left, this.width - this.margin.right]);

        this.y = d3.scaleLinear()
            .domain([0, d3.max(this.bins, d => d.length)]).nice()
            .range([this.height - this.margin.bottom, this.margin.top])

        this.xAxis = g => g
            .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
            .call(d3.axisBottom(this.x).ticks(this.width / 80).tickSizeOuter(0))

        this.yAxis = g => g
            .attr("transform", `translate(${this.margin.left}, 0)`)
            .call(d3.axisLeft(this.y).ticks(this.height / 40))

        this.svg.append("g")
                .attr("fill", "steelblue")
                .attr('id', 'rects')
            .selectAll("rect")
            .data(this.bins)
            .join("rect")
                .attr("x", d => this.x(d.x0) + 1)
                .attr("width", d => Math.max(0, this.x(d.x1) - this.x(d.x0) - 1))
                .attr("y", d => this.y(d.length))
                .attr("height", d => this.y(0) - this.y(d.length));

        this.svg.append("g").attr('id', 'xAxis').call(this.xAxis);
        this.svg.append("g").attr('id', 'yAxis').call(this.yAxis);

        node.appendChild(this.svg.node());
    }
}
