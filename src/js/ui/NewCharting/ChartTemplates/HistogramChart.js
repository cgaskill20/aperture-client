import React, { useEffect, useState } from 'react';
import * as d3 from '../../../third-party/d3.min.js';
import KernelDensityEstimator from '../../../library/charting/kernelDensityEstimator';

export default function HistogramGraph(props) {

    let svgRef = React.createRef();
    let [margin, setMargin] = useState({ top: 0, right: 10, bottom: 150, left: 20 });

    let [kdeEnabled, setKdeEnabled] = useState(false);

    let setup = () => {
        let svg = d3.select(svgRef.current);

        svg.append("g").attr("id", "rects");
        svg.append("g").attr("id", "xAxis");
        svg.append("g").attr("id", "yAxis");
        svg.append("text").attr("id", "title");
        svg.append("path").attr("id", "kdecurve");
    }

    let prepareData = data => {
        return data['map_features'][props.selected].map(e => e.data);
    }

    let rerender = (width, height) => {

        if (!props.data || !props.selected) {
            return;
        }

        let data = prepareData(props.data);
        let bins = d3.bin().thresholds(8)(data);

        let svg = d3.select(svgRef.current);
        
		svg.attr("viewBox", [0, 0, width, height]);

        let x = d3.scaleLinear()
            .range([margin.left, width - margin.right])
            .domain([bins[0].x0, bins[bins.length - 1].x1]);

        let y = d3.scaleLinear()
            .range([height - margin.bottom, margin.top])
            .domain([0, d3.max(bins, d => d.length)]).nice();

        let xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

        let yAxis = g => g
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y).ticks(height / 40))

        svg.select("g#xAxis").call(xAxis);
        svg.select("g#yAxis").call(yAxis);
        svg.select("g#rects")
            .selectAll("rect")
                .attr("fill", d => "steelblue")
            .data(bins)
            .join("rect")
                .attr("x", d => x(d.x0) + 1)
                .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
                .attr("y", d => y(d.length))
                .attr("height", d => y(0) - y(d.length));
        svg.select("text#title")
            .attr("x", width / 2)
            .attr("y", 24)
            .attr("text-anchor", "middle")
            .attr("fill", "#eee")
            .text("TITLE");

        /*
        if (kdeEnabled) {
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
        */
    }

    useEffect(setup, []);
    useEffect(rerender.bind(this, props.size.width, props.size.height));

    return (
        <div>
            <svg ref={svgRef}></svg>
        </div>
    );
}
