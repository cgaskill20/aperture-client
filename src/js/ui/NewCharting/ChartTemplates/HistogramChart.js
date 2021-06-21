import React, { useEffect, useState } from 'react';
import * as d3 from '../../../third-party/d3.min.js';
import KernelDensityEstimator from '../../../library/charting/kernelDensityEstimator';

export default function HistogramGraph(props) {

    let svgRef = React.createRef();
    let [margin, setMargin] = useState({ top: 0, right: 10, bottom: 250, left: 20 });
    let [kde, setKde] = useState(new KernelDensityEstimator());

    let setup = () => {
        let svg = d3.select(svgRef.current);

        svg.append("g").attr("id", "rects");
        svg.append("g").attr("id", "xAxis");
        svg.append("g").attr("id", "yAxis");
        svg.append("path").attr("id", "kdecurve");
    }

    let prepareData = data => {
        return data['map_features'][props.selected].map(e => e.data);
    }

    let rerender = (width, height) => {
        kde.setBandwidth(props.bandwidth)

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


        if (props.kdeEnabled) {
            let maxBarHeight = d3.max(bins, d => d.length);
            let kdePoints = kde.estimate(x.ticks(30), data, maxBarHeight);

            let kdeLine = d3.line()
                .curve(d3.curveBasis)
                .x(d => x(d[0]))
                .y(d => y(d[1]));
            svg.select("path#kdecurve")
                .datum(kdePoints)
                .attr("stroke", "#111")
                .attr("fill", "none")
                .attr("d", kdeLine)
                .attr("display", "default");
        } else {
            svg.select("path#kdecurve")
                .attr("display", "none");
        }
    }

    useEffect(setup, []);
    useEffect(rerender.bind(this, props.size.width, props.size.height));

    return (
        <div>
            <svg ref={svgRef}></svg>
        </div>
    );
}
