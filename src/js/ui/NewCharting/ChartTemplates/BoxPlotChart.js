import React, { useEffect, useState } from 'react';
import * as d3 from '../../../third-party/d3.min.js';

export default function BoxPlotChart(props){

    let svgRef = React.createRef();
    let [margin, setMargin] = useState({ top: 0, right: 10, bottom: 250, left: 20 });

    let setup = () => {
        let svg = d3.select(svgRef.current);

        svg.append("g").attr("id", "plot");
        svg.append("g").attr("id", "xAxis");
        svg.append("line").attr("id", "line1");
        svg.append("rect").attr("id", "rect");
        svg.append("line").attr("id", "line2");
    }

    let prepareData = data => {
        let values = [];
        data['map_features'][props.selected].map(e => {
            values.push(e.data);
        });
        const mathdata = mathCalc(values)
        let retData = {
            max: mathdata[0],
            min: mathdata[1],
            q1: mathdata[2],
            q3: mathdata[3],
            median: mathdata[4]
        };
        return retData;
    }

    let rerender = (width, height) => {
        if (!props.data || !props.selected) {
            return;
        }
        let data = prepareData(props.data);
        let svg = d3.select(svgRef.current);
        svg.attr("viewBox", [0, 0, width, height]);


        const minI = data.min < 0 ? data.min - 5 : -5;
        const maxI = data.max + 5;
        let y = d3.scaleLinear().domain([minI, maxI]).range([height, 0]);

        svg.select("#plot")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        svg.select("#xAxis")
            .attr("transform", "translate(0," + 150 + ")")
            .call(d3.axisBottom(y));
        var center = 100;
        width = 50;
        svg.select("#line1")
            .attr("y1", center)
            .attr("y2", center)
            .attr("x1", y(data.min))
            .attr("x2", y(data.max))
            .attr("stroke", "#1C3978");

        svg.select("#rect")
            .attr("y", center - width / 2)
            .attr("x", y(data.q3))
            .attr("width", y(data.q1) - y(data.q3))
            .attr("height", width)
            .attr("stroke", "#1C3978")
            .style("fill", "#fff");
        svg
            .selectAll("toto")
            .data([data.min, data.median, data.max])
            .enter()
            .select("#line2")
            .attr("y1", center - width / 2)
            .attr("y2", center + width / 2)
            .attr("x1", function (d) {
                return y(d);
            })
            .attr("x2", function (d) {
                return y(d);
            })
            .attr("stroke", "#1C3978");

    }

    useEffect(setup, []);
    useEffect(rerender.bind(this, props.size.width, props.size.height));

    return (
        <div>
            <svg ref={svgRef}></svg>
        </div>
    );
}

function mathCalc(arr){
    const asc = arr => arr.sort((a, b) => a - b);

    const sum = arr => arr.reduce((a, b) => a + b, 0);

    const mean = arr => sum(arr) / arr.length;

    function std(arr) {
        const mu = mean(arr);
        const diffArr = arr.map(a => (a - mu) ** 2);
        return Math.sqrt(sum(diffArr) / (arr.length - 1));
    };

    function quantile(arr, q) {
        const sorted = asc(arr);
        const pos = (sorted.length - 1) * q;
        const base = Math.floor(pos);
        const rest = pos - base;
        if (sorted[base + 1] !== undefined) {
            return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
        } else {
            return sorted[base];
        }
    };
    const q25 = quantile(arr, .25);
    const q50 =  quantile(arr, .50);
    const q75 =  quantile(arr, .75);
    return [Math.max(...arr), Math.min(...arr), q25, q75, q50];
}

