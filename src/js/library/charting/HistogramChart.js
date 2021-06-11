import React from 'react';
import * as d3 from '../../third-party/d3.min.js';
import KernelDensityEstimator from './kernelDensityEstimator';

export default class HistogramChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            kdeEnabled: false,
        }
        
        this.containerRef = React.createRef();
        this.kde = new KernelDensityEstimator();
        this.binNum = 10;
        this.colorScale = () => "steelblue";
    }

    componentDidMount() {
        this.setup();
    }

    componentDidUpdate(prevProps) {
        this.rerender(props.size.width, props.size.height);
    }

    render() {
        return (
            <div ref={this.containerRef} />
        );
    }

    setup() {
        let container = d3.select(this.containerRef.current);
        container.selectAll("p").data(this.props.data).enter().append("p").text(function(d) { return d });
    }

    /*
    setup() {
        let view = {};
        view.width = width;
        view.height = height;
        view.svg = d3.select(this.containerRef.current).append("svg").attr("viewBox", [0, 0, width, height]);

        view.bins = d3.bin().thresholds(8)(this.data);
        view.margin = { top: 60, right: 20, bottom: 30, left: 40 };

        view.svg.append("g").attr("id", "rects");
        view.svg.append("g").attr("id", "xAxis");
        view.svg.append("g").attr("id", "yAxis");
        view.svg.append("text").attr("id", "title");
        view.svg.append("path").attr("id", "kdecurve")
            .attr("fill", "none")
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round");

        this.addBandwidthSlider(view.svg);
        this.addKDEToggle(view.svg);

        this.view = view;
    }

    addBandwidthSlider(svg) {
        svg.append("foreignObject")
            .attr("x", 20)
            .attr("y", 20)
            .attr("width", 300)
            .attr("height", 40)
            .append("xhtml:div")
            .append("xhtml:input")
            .attr("name", "bwslider")
            .attr("type", "range")
            .attr("min", 0.4)
            .attr("max", 10)
            .attr("step", "any")
            .attr("id", "kdeSlider");

        svg.select("foreignObject div")
            .append("text")

        let kde = this.kde;
        svg.select("foreignObject input#kdeSlider").node().oninput = function() { 
            if (histogram.kdeEnabled) {
                kde.setBandwidth(this.value); 

                svg.select("foreignObject div text")
                    .text(`${Number.parseFloat(this.value).toPrecision(2)}`)
            }
        };
    }

    rerender(newWidth, newHeight) {
        if (this.data.length === 0) {
            return;
        }

        let view = this.view;

        newWidth = newWidth < Chart.MINIMUM_WIDTH ? Chart.MINIMUM_WIDTH : newWidth;
        newHeight = newHeight < Chart.MINIMUM_HEIGHT ? Chart.MINIMUM_HEIGHT : newHeight;
        view.width = newWidth;
        view.height = newHeight;

        view.svg.attr("viewBox", [0, 0, newWidth, newHeight]);

        view.x = d3.scaleLinear()
            .range([view.margin.left, newWidth - view.margin.right])
            .domain([this.bins[0].x0, this.bins[this.bins.length - 1].x1]);

        view.y = d3.scaleLinear()
            .range([newHeight - view.margin.bottom, view.margin.top])
            .domain([0, d3.max(this.bins, d => d.length)]).nice();

        view.xAxis = g => g
            .attr("transform", `translate(0,${newHeight - view.margin.bottom})`)
            .call(d3.axisBottom(view.x).ticks(newWidth / 80).tickSizeOuter(0))

        view.yAxis = g => g
            .attr("transform", `translate(${view.margin.left}, 0)`)
            .call(d3.axisLeft(view.y).ticks(newHeight / 40))

        view.svg.select("g#xAxis").call(view.xAxis);
        view.svg.select("g#yAxis").call(view.yAxis);
        view.svg.select("g#rects")
            .selectAll("rect")
                .attr("fill", d => this.colorScale(d.x1))
            .data(this.bins)
            .join("rect")
                .attr("x", d => view.x(d.x0) + 1)
                .attr("width", d => Math.max(0, view.x(d.x1) - view.x(d.x0) - 1))
                .attr("y", d => view.y(d.length))
                .attr("height", d => view.y(0) - view.y(d.length));
        view.svg.select("text#title")
            .attr("x", newWidth / 2)
            .attr("y", 24)
            .attr("text-anchor", "middle")
            .attr("fill", this.getBasicThemeColor())
            .text(this.title);

        if (this.kdeEnabled) {
            let maxBarHeight = d3.max(this.bins, d => d.length);
            let kdePoints = this.kde.estimate(view.x.ticks(30), this.data, maxBarHeight);

            view.kdeLine = d3.line()
                .curve(d3.curveBasis)
                .x(d => view.x(d[0]))
                .y(d => view.y(d[1]));
            view.svg.select("path#kdecurve")
                .datum(kdePoints)
                .attr("stroke", this.getBasicThemeColor())
                .attr("d", view.kdeLine)
                .attr("display", "default");
        } else {
            view.svg.select("path#kdecurve")
                .attr("display", "none");
        }
    }
    */
}
