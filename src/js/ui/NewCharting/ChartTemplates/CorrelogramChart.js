import React, { useEffect, useState } from 'react';
import * as d3 from '../../../third-party/d3.min.js';

export default function CorrelogramChart(props) {

    let svgRef = React.createRef();

    // Dimension of the whole chart. Only one size since it has to be square
    var marginWhole = {top: 10, right: 10, bottom: 10, left: 10},
        sizeWhole = 640 - marginWhole.left - marginWhole.right

    let data = [{"Sepal_Length":5.1,"Sepal_Width":3.5,"Petal_Length":1.4,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.9,"Sepal_Width":3,"Petal_Length":1.4,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.7,"Sepal_Width":3.2,"Petal_Length":1.3,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.6,"Sepal_Width":3.1,"Petal_Length":1.5,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5,"Sepal_Width":3.6,"Petal_Length":1.4,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.4,"Sepal_Width":3.9,"Petal_Length":1.7,"Petal_Width":0.4,"Species":"setosa"},{"Sepal_Length":4.6,"Sepal_Width":3.4,"Petal_Length":1.4,"Petal_Width":0.3,"Species":"setosa"},{"Sepal_Length":5,"Sepal_Width":3.4,"Petal_Length":1.5,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.4,"Sepal_Width":2.9,"Petal_Length":1.4,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.9,"Sepal_Width":3.1,"Petal_Length":1.5,"Petal_Width":0.1,"Species":"setosa"},{"Sepal_Length":5.4,"Sepal_Width":3.7,"Petal_Length":1.5,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.8,"Sepal_Width":3.4,"Petal_Length":1.6,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.8,"Sepal_Width":3,"Petal_Length":1.4,"Petal_Width":0.1,"Species":"setosa"},{"Sepal_Length":4.3,"Sepal_Width":3,"Petal_Length":1.1,"Petal_Width":0.1,"Species":"setosa"},{"Sepal_Length":5.8,"Sepal_Width":4,"Petal_Length":1.2,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.7,"Sepal_Width":4.4,"Petal_Length":1.5,"Petal_Width":0.4,"Species":"setosa"},{"Sepal_Length":5.4,"Sepal_Width":3.9,"Petal_Length":1.3,"Petal_Width":0.4,"Species":"setosa"},{"Sepal_Length":5.1,"Sepal_Width":3.5,"Petal_Length":1.4,"Petal_Width":0.3,"Species":"setosa"},{"Sepal_Length":5.7,"Sepal_Width":3.8,"Petal_Length":1.7,"Petal_Width":0.3,"Species":"setosa"},{"Sepal_Length":5.1,"Sepal_Width":3.8,"Petal_Length":1.5,"Petal_Width":0.3,"Species":"setosa"},{"Sepal_Length":5.4,"Sepal_Width":3.4,"Petal_Length":1.7,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.1,"Sepal_Width":3.7,"Petal_Length":1.5,"Petal_Width":0.4,"Species":"setosa"},{"Sepal_Length":4.6,"Sepal_Width":3.6,"Petal_Length":1,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.1,"Sepal_Width":3.3,"Petal_Length":1.7,"Petal_Width":0.5,"Species":"setosa"},{"Sepal_Length":4.8,"Sepal_Width":3.4,"Petal_Length":1.9,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5,"Sepal_Width":3,"Petal_Length":1.6,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5,"Sepal_Width":3.4,"Petal_Length":1.6,"Petal_Width":0.4,"Species":"setosa"},{"Sepal_Length":5.2,"Sepal_Width":3.5,"Petal_Length":1.5,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.2,"Sepal_Width":3.4,"Petal_Length":1.4,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.7,"Sepal_Width":3.2,"Petal_Length":1.6,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.8,"Sepal_Width":3.1,"Petal_Length":1.6,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.4,"Sepal_Width":3.4,"Petal_Length":1.5,"Petal_Width":0.4,"Species":"setosa"},{"Sepal_Length":5.2,"Sepal_Width":4.1,"Petal_Length":1.5,"Petal_Width":0.1,"Species":"setosa"},{"Sepal_Length":5.5,"Sepal_Width":4.2,"Petal_Length":1.4,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.9,"Sepal_Width":3.1,"Petal_Length":1.5,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5,"Sepal_Width":3.2,"Petal_Length":1.2,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.5,"Sepal_Width":3.5,"Petal_Length":1.3,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.9,"Sepal_Width":3.6,"Petal_Length":1.4,"Petal_Width":0.1,"Species":"setosa"},{"Sepal_Length":4.4,"Sepal_Width":3,"Petal_Length":1.3,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.1,"Sepal_Width":3.4,"Petal_Length":1.5,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5,"Sepal_Width":3.5,"Petal_Length":1.3,"Petal_Width":0.3,"Species":"setosa"},{"Sepal_Length":4.5,"Sepal_Width":2.3,"Petal_Length":1.3,"Petal_Width":0.3,"Species":"setosa"},{"Sepal_Length":4.4,"Sepal_Width":3.2,"Petal_Length":1.3,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5,"Sepal_Width":3.5,"Petal_Length":1.6,"Petal_Width":0.6,"Species":"setosa"},{"Sepal_Length":5.1,"Sepal_Width":3.8,"Petal_Length":1.9,"Petal_Width":0.4,"Species":"setosa"},{"Sepal_Length":4.8,"Sepal_Width":3,"Petal_Length":1.4,"Petal_Width":0.3,"Species":"setosa"},{"Sepal_Length":5.1,"Sepal_Width":3.8,"Petal_Length":1.6,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":4.6,"Sepal_Width":3.2,"Petal_Length":1.4,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5.3,"Sepal_Width":3.7,"Petal_Length":1.5,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":5,"Sepal_Width":3.3,"Petal_Length":1.4,"Petal_Width":0.2,"Species":"setosa"},{"Sepal_Length":7,"Sepal_Width":3.2,"Petal_Length":4.7,"Petal_Width":1.4,"Species":"versicolor"},{"Sepal_Length":6.4,"Sepal_Width":3.2,"Petal_Length":4.5,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":6.9,"Sepal_Width":3.1,"Petal_Length":4.9,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":5.5,"Sepal_Width":2.3,"Petal_Length":4,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":6.5,"Sepal_Width":2.8,"Petal_Length":4.6,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":5.7,"Sepal_Width":2.8,"Petal_Length":4.5,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":6.3,"Sepal_Width":3.3,"Petal_Length":4.7,"Petal_Width":1.6,"Species":"versicolor"},{"Sepal_Length":4.9,"Sepal_Width":2.4,"Petal_Length":3.3,"Petal_Width":1,"Species":"versicolor"},{"Sepal_Length":6.6,"Sepal_Width":2.9,"Petal_Length":4.6,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":5.2,"Sepal_Width":2.7,"Petal_Length":3.9,"Petal_Width":1.4,"Species":"versicolor"},{"Sepal_Length":5,"Sepal_Width":2,"Petal_Length":3.5,"Petal_Width":1,"Species":"versicolor"},{"Sepal_Length":5.9,"Sepal_Width":3,"Petal_Length":4.2,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":6,"Sepal_Width":2.2,"Petal_Length":4,"Petal_Width":1,"Species":"versicolor"},{"Sepal_Length":6.1,"Sepal_Width":2.9,"Petal_Length":4.7,"Petal_Width":1.4,"Species":"versicolor"},{"Sepal_Length":5.6,"Sepal_Width":2.9,"Petal_Length":3.6,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":6.7,"Sepal_Width":3.1,"Petal_Length":4.4,"Petal_Width":1.4,"Species":"versicolor"},{"Sepal_Length":5.6,"Sepal_Width":3,"Petal_Length":4.5,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":5.8,"Sepal_Width":2.7,"Petal_Length":4.1,"Petal_Width":1,"Species":"versicolor"},{"Sepal_Length":6.2,"Sepal_Width":2.2,"Petal_Length":4.5,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":5.6,"Sepal_Width":2.5,"Petal_Length":3.9,"Petal_Width":1.1,"Species":"versicolor"},{"Sepal_Length":5.9,"Sepal_Width":3.2,"Petal_Length":4.8,"Petal_Width":1.8,"Species":"versicolor"},{"Sepal_Length":6.1,"Sepal_Width":2.8,"Petal_Length":4,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":6.3,"Sepal_Width":2.5,"Petal_Length":4.9,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":6.1,"Sepal_Width":2.8,"Petal_Length":4.7,"Petal_Width":1.2,"Species":"versicolor"},{"Sepal_Length":6.4,"Sepal_Width":2.9,"Petal_Length":4.3,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":6.6,"Sepal_Width":3,"Petal_Length":4.4,"Petal_Width":1.4,"Species":"versicolor"},{"Sepal_Length":6.8,"Sepal_Width":2.8,"Petal_Length":4.8,"Petal_Width":1.4,"Species":"versicolor"},{"Sepal_Length":6.7,"Sepal_Width":3,"Petal_Length":5,"Petal_Width":1.7,"Species":"versicolor"},{"Sepal_Length":6,"Sepal_Width":2.9,"Petal_Length":4.5,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":5.7,"Sepal_Width":2.6,"Petal_Length":3.5,"Petal_Width":1,"Species":"versicolor"},{"Sepal_Length":5.5,"Sepal_Width":2.4,"Petal_Length":3.8,"Petal_Width":1.1,"Species":"versicolor"},{"Sepal_Length":5.5,"Sepal_Width":2.4,"Petal_Length":3.7,"Petal_Width":1,"Species":"versicolor"},{"Sepal_Length":5.8,"Sepal_Width":2.7,"Petal_Length":3.9,"Petal_Width":1.2,"Species":"versicolor"},{"Sepal_Length":6,"Sepal_Width":2.7,"Petal_Length":5.1,"Petal_Width":1.6,"Species":"versicolor"},{"Sepal_Length":5.4,"Sepal_Width":3,"Petal_Length":4.5,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":6,"Sepal_Width":3.4,"Petal_Length":4.5,"Petal_Width":1.6,"Species":"versicolor"},{"Sepal_Length":6.7,"Sepal_Width":3.1,"Petal_Length":4.7,"Petal_Width":1.5,"Species":"versicolor"},{"Sepal_Length":6.3,"Sepal_Width":2.3,"Petal_Length":4.4,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":5.6,"Sepal_Width":3,"Petal_Length":4.1,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":5.5,"Sepal_Width":2.5,"Petal_Length":4,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":5.5,"Sepal_Width":2.6,"Petal_Length":4.4,"Petal_Width":1.2,"Species":"versicolor"},{"Sepal_Length":6.1,"Sepal_Width":3,"Petal_Length":4.6,"Petal_Width":1.4,"Species":"versicolor"},{"Sepal_Length":5.8,"Sepal_Width":2.6,"Petal_Length":4,"Petal_Width":1.2,"Species":"versicolor"},{"Sepal_Length":5,"Sepal_Width":2.3,"Petal_Length":3.3,"Petal_Width":1,"Species":"versicolor"},{"Sepal_Length":5.6,"Sepal_Width":2.7,"Petal_Length":4.2,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":5.7,"Sepal_Width":3,"Petal_Length":4.2,"Petal_Width":1.2,"Species":"versicolor"},{"Sepal_Length":5.7,"Sepal_Width":2.9,"Petal_Length":4.2,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":6.2,"Sepal_Width":2.9,"Petal_Length":4.3,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":5.1,"Sepal_Width":2.5,"Petal_Length":3,"Petal_Width":1.1,"Species":"versicolor"},{"Sepal_Length":5.7,"Sepal_Width":2.8,"Petal_Length":4.1,"Petal_Width":1.3,"Species":"versicolor"},{"Sepal_Length":6.3,"Sepal_Width":3.3,"Petal_Length":6,"Petal_Width":2.5,"Species":"virginica"},{"Sepal_Length":5.8,"Sepal_Width":2.7,"Petal_Length":5.1,"Petal_Width":1.9,"Species":"virginica"},{"Sepal_Length":7.1,"Sepal_Width":3,"Petal_Length":5.9,"Petal_Width":2.1,"Species":"virginica"},{"Sepal_Length":6.3,"Sepal_Width":2.9,"Petal_Length":5.6,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":6.5,"Sepal_Width":3,"Petal_Length":5.8,"Petal_Width":2.2,"Species":"virginica"},{"Sepal_Length":7.6,"Sepal_Width":3,"Petal_Length":6.6,"Petal_Width":2.1,"Species":"virginica"},{"Sepal_Length":4.9,"Sepal_Width":2.5,"Petal_Length":4.5,"Petal_Width":1.7,"Species":"virginica"},{"Sepal_Length":7.3,"Sepal_Width":2.9,"Petal_Length":6.3,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":6.7,"Sepal_Width":2.5,"Petal_Length":5.8,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":7.2,"Sepal_Width":3.6,"Petal_Length":6.1,"Petal_Width":2.5,"Species":"virginica"},{"Sepal_Length":6.5,"Sepal_Width":3.2,"Petal_Length":5.1,"Petal_Width":2,"Species":"virginica"},{"Sepal_Length":6.4,"Sepal_Width":2.7,"Petal_Length":5.3,"Petal_Width":1.9,"Species":"virginica"},{"Sepal_Length":6.8,"Sepal_Width":3,"Petal_Length":5.5,"Petal_Width":2.1,"Species":"virginica"},{"Sepal_Length":5.7,"Sepal_Width":2.5,"Petal_Length":5,"Petal_Width":2,"Species":"virginica"},{"Sepal_Length":5.8,"Sepal_Width":2.8,"Petal_Length":5.1,"Petal_Width":2.4,"Species":"virginica"},{"Sepal_Length":6.4,"Sepal_Width":3.2,"Petal_Length":5.3,"Petal_Width":2.3,"Species":"virginica"},{"Sepal_Length":6.5,"Sepal_Width":3,"Petal_Length":5.5,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":7.7,"Sepal_Width":3.8,"Petal_Length":6.7,"Petal_Width":2.2,"Species":"virginica"},{"Sepal_Length":7.7,"Sepal_Width":2.6,"Petal_Length":6.9,"Petal_Width":2.3,"Species":"virginica"},{"Sepal_Length":6,"Sepal_Width":2.2,"Petal_Length":5,"Petal_Width":1.5,"Species":"virginica"},{"Sepal_Length":6.9,"Sepal_Width":3.2,"Petal_Length":5.7,"Petal_Width":2.3,"Species":"virginica"},{"Sepal_Length":5.6,"Sepal_Width":2.8,"Petal_Length":4.9,"Petal_Width":2,"Species":"virginica"},{"Sepal_Length":7.7,"Sepal_Width":2.8,"Petal_Length":6.7,"Petal_Width":2,"Species":"virginica"},{"Sepal_Length":6.3,"Sepal_Width":2.7,"Petal_Length":4.9,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":6.7,"Sepal_Width":3.3,"Petal_Length":5.7,"Petal_Width":2.1,"Species":"virginica"},{"Sepal_Length":7.2,"Sepal_Width":3.2,"Petal_Length":6,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":6.2,"Sepal_Width":2.8,"Petal_Length":4.8,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":6.1,"Sepal_Width":3,"Petal_Length":4.9,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":6.4,"Sepal_Width":2.8,"Petal_Length":5.6,"Petal_Width":2.1,"Species":"virginica"},{"Sepal_Length":7.2,"Sepal_Width":3,"Petal_Length":5.8,"Petal_Width":1.6,"Species":"virginica"},{"Sepal_Length":7.4,"Sepal_Width":2.8,"Petal_Length":6.1,"Petal_Width":1.9,"Species":"virginica"},{"Sepal_Length":7.9,"Sepal_Width":3.8,"Petal_Length":6.4,"Petal_Width":2,"Species":"virginica"},{"Sepal_Length":6.4,"Sepal_Width":2.8,"Petal_Length":5.6,"Petal_Width":2.2,"Species":"virginica"},{"Sepal_Length":6.3,"Sepal_Width":2.8,"Petal_Length":5.1,"Petal_Width":1.5,"Species":"virginica"},{"Sepal_Length":6.1,"Sepal_Width":2.6,"Petal_Length":5.6,"Petal_Width":1.4,"Species":"virginica"},{"Sepal_Length":7.7,"Sepal_Width":3,"Petal_Length":6.1,"Petal_Width":2.3,"Species":"virginica"},{"Sepal_Length":6.3,"Sepal_Width":3.4,"Petal_Length":5.6,"Petal_Width":2.4,"Species":"virginica"},{"Sepal_Length":6.4,"Sepal_Width":3.1,"Petal_Length":5.5,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":6,"Sepal_Width":3,"Petal_Length":4.8,"Petal_Width":1.8,"Species":"virginica"},{"Sepal_Length":6.9,"Sepal_Width":3.1,"Petal_Length":5.4,"Petal_Width":2.1,"Species":"virginica"},{"Sepal_Length":6.7,"Sepal_Width":3.1,"Petal_Length":5.6,"Petal_Width":2.4,"Species":"virginica"},{"Sepal_Length":6.9,"Sepal_Width":3.1,"Petal_Length":5.1,"Petal_Width":2.3,"Species":"virginica"},{"Sepal_Length":5.8,"Sepal_Width":2.7,"Petal_Length":5.1,"Petal_Width":1.9,"Species":"virginica"},{"Sepal_Length":6.8,"Sepal_Width":3.2,"Petal_Length":5.9,"Petal_Width":2.3,"Species":"virginica"},{"Sepal_Length":6.7,"Sepal_Width":3.3,"Petal_Length":5.7,"Petal_Width":2.5,"Species":"virginica"},{"Sepal_Length":6.7,"Sepal_Width":3,"Petal_Length":5.2,"Petal_Width":2.3,"Species":"virginica"},{"Sepal_Length":6.3,"Sepal_Width":2.5,"Petal_Length":5,"Petal_Width":1.9,"Species":"virginica"},{"Sepal_Length":6.5,"Sepal_Width":3,"Petal_Length":5.2,"Petal_Width":2,"Species":"virginica"},{"Sepal_Length":6.2,"Sepal_Width":3.4,"Petal_Length":5.4,"Petal_Width":2.3,"Species":"virginica"},{"Sepal_Length":5.9,"Sepal_Width":3,"Petal_Length":5.1,"Petal_Width":1.8,"Species":"virginica"}]

    var svg = d3.select(svgRef.current)
        .append("svg")
        .attr("width", sizeWhole  + marginWhole.left + marginWhole.right)
        .attr("height", sizeWhole  + marginWhole.top + marginWhole.bottom)
        .append("g")
        .attr("transform", "translate(" + marginWhole.left + "," + marginWhole.top + ")");
    svg.attr("viewBox", [0, 0, props.size.width, props.size.height]);


    // What are the numeric variables in this dataset? How many do I have
    var allVar = ["Sepal_Length", "Sepal_Width", "Petal_Length", "Petal_Width"]
    var numVar = allVar.length

    // Now I can compute the size of a single chart
    var mar = 20
    var size = sizeWhole / numVar


    // ----------------- //
    // Scales
    // ----------------- //

    // Create a scale: gives the position of each pair each variable
    var position = d3.scalePoint()
        .domain(allVar)
        .range([0, sizeWhole-size])

    // Color scale: give me a specie name, I return a color
    var color = d3.scaleOrdinal()
        .domain(["setosa", "versicolor", "virginica" ])
        .range([ "#402D54", "#D18975", "#8FD175"])


    // ------------------------------- //
    // Add charts
    // ------------------------------- //
    for (let i in allVar){
        for (let j in allVar){

            // Get current variable name
            var var1 = allVar[i]
            var var2 = allVar[j]

            // If var1 == var2 i'm on the diagonal, I skip that
            if (var1 === var2) { continue; }

            // Add X Scale of each graph
            let xextent = d3.extent(data, function(d) { return +d[var1] })
            var x = d3.scaleLinear()
                .domain(xextent).nice()
                .range([ 0, size-2*mar ]);

            // Add Y Scale of each graph
            let yextent = d3.extent(data, function(d) { return +d[var2] })
            var y = d3.scaleLinear()
                .domain(yextent).nice()
                .range([ size-2*mar, 0 ]);

            // Add a 'g' at the right position
            var tmp = svg
                .append('g')
                .attr("transform", "translate(" + (position(var1)+mar) + "," + (position(var2)+mar) + ")");

            // Add X and Y axis in tmp
            tmp.append("g")
                .attr("transform", "translate(" + 0 + "," + (size-mar*2) + ")")
                .call(d3.axisBottom(x).ticks(3));
            tmp.append("g")
                .call(d3.axisLeft(y).ticks(3));

            // Add circle
            tmp
                .selectAll("myCircles")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function(d){ return x(+d[var1]) })
                .attr("cy", function(d){ return y(+d[var2]) })
                .attr("r", 3)
                .attr("fill", function(d){ return color(d.Species)})
        }
    }


    // ------------------------------- //
    // Add variable names = diagonal
    // ------------------------------- //
    for (let i in allVar){
        for (let j in allVar){
            // If var1 == var2 i'm on the diagonal, otherwise I skip
            if (i != j) { continue; }
            // Add text
            var var1 = allVar[i]
            var var2 = allVar[j]
            svg
                .append('g')
                .attr("transform", "translate(" + position(var1) + "," + position(var2) + ")")
                .append('text')
                .attr("x", size/2)
                .attr("y", size/2)
                .text(var1)
                .attr("text-anchor", "middle")

        }
    }



    return (
        <div>
            <svg ref={svgRef}></svg>
        </div>
    );
}