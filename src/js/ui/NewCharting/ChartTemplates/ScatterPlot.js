import React, { useEffect, useState } from 'react';
import * as d3 from '../../../third-party/d3.min.js';



export default function ScatterPlot(props) {

    let svgRef = React.createRef();
    let [margin, setMargin] = useState({ top: 0, right: 10, bottom: 150, left: 20 });
    let setup = () => {

    }

    let prepareData = (data, xVar, yVar) => {

        let retData = {};

        data['map_features'][xVar].map(e => {
            retData[e['locationName']] = {
                [xVar]: e.data,
                [yVar] : 0,
            }
        });

        data['map_features'][yVar].map(e => {
            retData[e['locationName']][yVar] = e.data;
        });

        return retData;
    }

    let rerender = (width, height) => {
        const margin = {
            top: 20,
            right: 10,
            bottom: 50,
            left: 60
        };
        const radius = 5;
        const color = "blue";
        let svg = d3.select(svgRef.current);
        if(!props.selected[0]){
            return;
        }
        let drawWidth = width - margin.left - margin.right;
        let drawHeight = height - margin.top - margin.bottom;
        let xVar = props.selected[0];
        let yVar = xVar;
        if(props.selected[1]){
            yVar = props.selected[1];
        }


        svg.append('svg')
            .attr('width', width)
            .attr('height', height);
        let chartG = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .attr('height', drawHeight)
            .attr('width', drawWidth);

        let rawData = prepareData(props.data,xVar,yVar);

        let data = [];
        console.log(rawData);

        for (const [key, value] of Object.entries(rawData)) {
            console.log(value);
            data.push({
                x: value[props.selected[0]],
                y: value[props.selected[1]],
                label: key
            })
        }


        let xMax = d3.max(data, (d) => +d.x) * 1.05;


        let xMin = d3.min(data, (d) => +d.x) * 0.9;

        let xScale = d3.scaleLinear()
            .range([0, drawWidth])
            .domain([xMin, xMax]);

        let yMax = d3.max(data, (d) => +d.y) * 1.05;


        let yMin = d3.min(data, (d) => +d.y) * 0.9;


        let yScale = d3.scaleLinear()
            .range([0, drawHeight])
            .domain([yMax, yMin]);


        let xAxis = d3.axisBottom(xScale);

        let yAxis = d3.axisLeft(yScale);

        let xAxisLabel = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + (drawHeight + margin.top) + ')')
            .attr('class', 'axis')
            .call(xAxis);


        let yAxisLabel = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')')
            .attr('class', 'axis')
            .call(yAxis);


        let title = svg.append('text')
            .attr('transform', `translate(${margin.left},15)`)
            .text("Midwest Counties");


        let xAxisText = svg.append('text')
            .attr('transform', `translate(${(margin.left + drawWidth / 2)}, ${(height - margin.bottom + 30)})`)
            .attr('class', 'axis-label')
            .text(xVar);


        svg.append('text')
            .attr('transform', `translate( ${(margin.left - 30)},${(margin.top + drawHeight / 2)}) rotate(-90)`)
            .attr('class', 'axis-label')
            .text(yVar);



        /*let tip = d3.tip().attr('class', 'd3-tip').html(function (d) {
            return d.label;
        }); */


        let circles = chartG.selectAll('circle').data(data);


        circles.enter().append('circle')
            //.on('mouseover', tip.show)
            //.on('mouseout', tip.hide)
            .attr('r', (d) => radius)
            .attr('fill', (d) => color)
            .attr('label', (d) => d.label)
            .style('fill-opacity', 0.3)
            .merge(circles)
            .transition().duration(500)
            .attr('cx', (d) => xScale(d.x))
            .attr('cy', (d) => yScale(d.y));


        circles.exit().remove();


        //chartG.call(tip);
    }
    useEffect(setup, []);
    useEffect(rerender.bind(this, props.size.width, props.size.height));

    return (
        <div>
            <svg ref={svgRef}></svg>
        </div>
    );

}

