import React, { useEffect, useState } from 'react';
import * as d3 from '../../third-party/d3.min.js';
import KernelDensityEstimator from '../../library/charting/kernelDensityEstimator';

export default function LineGraph(props) {
    let svgRef = React.createRef();

    let [margin, setMargin] = useState({ top: 50, right: 20, bottom: 30, left: 50 });
    let [mouseIn, setMouseIn] = useState(false);
	let [onMouseMove, setOnMouseMove] = useState(() => {});
    
    let setup = () => {
        let svg = d3.select(svgRef.current);

        svg.append("g").attr("id", "xAxis");
        svg.append("g").attr("id", "yAxis");
		svg.append("g").attr("id", "lines")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round");
        svg.append("text")
            .attr("id", "title")
            .attr("y", 12)
            .attr("text-anchor", "middle");
        svg.append("text").attr("id", "marker");
        svg.append("text").attr("id", "subtitle")
            .attr("y", 24)
            .attr("text-anchor", "middle")
            .attr("font-size", "0.7em")
            .attr("fill", "#666");
        svg.append("text").attr("id", "queryNotice")
            .attr("y", 12)
            .attr("x", 12)
            .attr("font-size", "0.7em")
            .attr("fill", "#666")
            .text("getting data...");

		svg.on('mouseenter', () => setMouseIn(true));
        svg.on('mouseleave', () => {
            setMouseIn(false);
            svg.select("text#marker").attr("display", "none");
            svg.select("g#lines").selectAll("path").each(function() {
                d3.select(this).attr("stroke", "steelblue");
            });
        });
        svg.on('mousemove', onMouseMove);
    }

    let prepareData = data => {
        console.log(data);
        return data['county_covid'].filter(entry => entry).map(entry => {
            return { data: entry.data.map(d => {
                return { value: d.avg, date: d.date.$date };
            }), gisJoin: entry.GISJOIN, name: entry.name };
        });
    }

    let rerender = (width, height) => {
        if (!props.data || !props.data['county_covid']) {
            return;
        }

        let svg = d3.select(svgRef.current);
        let data = prepareData(props.data);

        svg.attr("viewBox", [0, 0, width, height]);

		let x = d3.scaleUtc()
            .domain([d3.min(data, entry => d3.min(entry.data, d => d.date)), 
                     d3.max(data, entry => d3.max(entry.data, d => d.date))])
            .range([margin.left, width - margin.right]);

        let y = d3.scaleLinear()
            .domain([0, d3.max(data, entry => d3.max(entry.data, d => d.value))]).nice()
            .range([height - margin.bottom, margin.top]);

        let xAxis = g => g
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

        let yAxis = g => g
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain").remove());

        let line = d3.line()
            .defined(d => !isNaN(d.value))
            .x(d => x(d.date))
            .y(d => y(d.value))

        svg.select("g#xAxis").call(xAxis);
        svg.select("g#yAxis").call(yAxis);
        svg.select("g#lines")
            .selectAll("path")
            .data(data)
            .join("path")
            .style("mix-blend-mode", "multiply")
            .attr("d", d => line(d.data));

        svg.select("text#title")
            .attr("x", width / 2)
            .attr("fill", "#111")
            .text("TITLE");

        svg.select("text#subtitle")
            .attr("x", width / 2)
            .attr("fill", "#666")
            .text("SUBTITLE");
        
        setOnMouseMove(event => {
			return;

			console.log(event);
            let rawMouse = d3.pointer(event, svgRef.current);
            let mouse = [ x.invert(rawMouse[0]).valueOf(), y.invert(rawMouse[1]) ];

            let dates = [];
            data.forEach(county => {
                county.data.forEach(entry => {
                    if (!dates.includes(entry.date)) {
                        dates.push(entry.date);
                    }
                });
            });

            dates.sort();

            let searchDateIndex = d3.bisectCenter(dates, mouse[0]);
            let closest = d3.least(data, d => {
                let entry = d.data[searchDateIndex];
                if (!entry) {
                    return; // JAVASCRIPT EXCELLENCE AWARD 2021 
                }   

                return Math.abs(d.data[searchDateIndex].value - mouse[1])
            });

            svg.select("g#lines").selectAll("path").each(function() {
                d3.select(this).attr("stroke", s => s.gisJoin === closest.gisJoin ? 'steelblue' : "#eee");
            });

            let textSpaceTolerance = closest.name.length * 7;

            svg.select("text#marker")
                .attr("display", "default")
                .attr("x", ((rawMouse[0] - width) > -textSpaceTolerance) ? rawMouse[0] - textSpaceTolerance : rawMouse[0])
                .attr("y", rawMouse[1] - 20)
                .attr("font-size", "smaller")
                .attr("fill", "#111")
                .text(closest.name);
        });

        /*
        if (this.makingQuery && !this.lastDataFailed) {
            view.svg.select("text#queryNotice")
                .attr("display", "default");
        } else {
            view.svg.select("text#queryNotice")
                .attr("display", "none");
        }
        */
    };

    useEffect(setup, []);
    useEffect(rerender.bind(this, props.size.width, props.size.height));

    return (
        <div>
            <svg ref={svgRef}></svg>
        </div>
    );
}
