import React, { useEffect, useState } from 'react';
import * as d3 from '../../third-party/d3.min.js';

export default function PieTEST(props) {
    let svgRef = React.createRef();
    var width = props.size.width;
    var height = props.size.height;

    let [margin, setMargin] = useState({ top: 0, right: 0, bottom: 0, left: 0 });
    var innerRadius = 90,
        outerRadius = Math.min(width, height) / 2;
    
    let setup = () => {
        let svg = d3.select(svgRef.current);

        svg.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");


    }

    let prepareData = data => {
        let retData = [];
        data['map_features'][props.selected].map(e =>{
            retData.push({"Country" : e.locationName, "Value": e.data})
        });
        return retData;
    }

    let rerender = (width, height) => {
        if (!props.data || !props.selected) {
            return;
        }

        let svg = d3.select(svgRef.current);
        let data = prepareData(props.data);

        var x = d3.scaleBand()
            .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
            .align(0)                  // This does nothing
            .domain(data.map(function(d) { return d.Country; })); // The domain of the X axis is the list of states.
        var y = d3.scaleRadial()
            .range([innerRadius, outerRadius])   // Domain will be define later.
            .domain([0, 14000]); // Domain of Y is from 0 to the max seen in the data

        // Add the bars
        svg.append("g")
            .selectAll("path")
            .data(data)
            .enter()
            .append("path")
            .attr("fill", "#69b3a2")
            .attr("d", d3.arc()     // imagine your doing a part of a donut plot
                .innerRadius(innerRadius)
                .outerRadius(function(d) { return y(d['Value']); })
                .startAngle(function(d) { return x(d.Country); })
                .endAngle(function(d) { return x(d.Country) + x.bandwidth(); })
                .padAngle(0.01)
                .padRadius(innerRadius))

        // Add the labels
        svg.append("g")
            .selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("text-anchor", function(d) { return (x(d.Country) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
            .attr("transform", function(d) { return "rotate(" + ((x(d.Country) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d['Value'])+10) + ",0)"; })
            .append("text")
            .text(function(d){return(d.Country)})
            .attr("transform", function(d) { return (x(d.Country) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
            .style("font-size", "11px")
            .attr("alignment-baseline", "middle")
    };

    useEffect(setup, []);
    useEffect(rerender.bind(this, props.size.width, props.size.height));

    return (
        <div>
            <svg ref={svgRef}></svg>
        </div>
    );
}
