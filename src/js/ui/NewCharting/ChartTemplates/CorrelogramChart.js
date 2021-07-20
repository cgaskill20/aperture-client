import React, { useEffect, useState } from 'react';
import * as d3 from '../../../third-party/d3.min.js';
const calculateCorrelation = require("calculate-correlation");

export default function CorrelogramChart(props) {

    let svgRef = React.createRef();

    // Dimension of the whole chart. Only one size since it has to be square
    var marginWhole = { top: 10, right: 10, bottom: 10, left: 10 },
        sizeWhole = 3000 - marginWhole.left - marginWhole.right;

    let setup = () => {
        let retData = {};
        if(props.data['map_features']) {
            for (const [key, value] of Object.entries(props.data['map_features'])) {
                if (value.length > 0) {
                    retData[key] = {};
                    value.forEach(loc => {
                        retData[key][loc['locationName']] = loc.data;
                    })
                }
            }

            for (const [key, value] of Object.entries(retData)){
                let x = []
                let y = []
                for (const [key2, value2] of Object.entries(retData)){
                    if(key == key2){
                        continue;
                    }
                    for (const [key3, value3] of Object.entries(value)){
                        if(key3 in value2){
                            x.push(value3)
                            y.push(value2[key3])
                        }
                    }
                }

                const correlation = calculateCorrelation(x, y);
                console.log(correlation);
            }
        }
        rerender(100,100)
    }

    let prepareData = data => {

    }

    let rerender = (width, height) => {
        let rows2 = [
            {
                "": "mpg",
                mpg: 1,
                cyl: -0.852161959426613,
                disp: -0.847551379262479,
                hp: -0.776168371826586
            },
            {
                "": "cyl",
                mpg: -0.852161959426613,
                cyl: 1,
                disp: 0.902032872146999,
                hp: 0.83244745272182
            },
            {
                "": "disp",
                mpg: -0.847551379262479,
                cyl: 0.902032872146999,
                disp: 1,
                hp: 0.790948586369806
            },
            {
                "": "hp",
                mpg: -0.776168371826586,
                cyl: 0.83244745272182,
                disp: 0.790948586369806,
                hp: 1
            }
        ];

        var data = [];

        rows2.forEach(function (d) {
            var x = d[""];
            delete d[""];
            for (var prop in d) {
                var y = prop,
                    value = d[prop];
                data.push({
                    x: x,
                    y: y,
                    value: +value
                });
            }
        });

        var margin = {
                top: 25,
                right: 80,
                bottom: 25,
                left: 25
            },
            width = 350 - margin.left - margin.right,
            height = 350 - margin.top - margin.bottom,
            domain = [
                "mpg",
                "cyl",
                "disp",
                "hp",
            ],
            num = Math.sqrt(data.length),
            color = d3
                .scaleLinear()
                .domain([-1, 0, 1])
                .range(["#B22222", "#fff", "#000080"]);

        var x = d3.scalePoint().range([0, width]).domain(domain),
            y = d3.scalePoint().range([0, height]).domain(domain),
            xSpace = x.range()[1] - x.range()[0],
            ySpace = y.range()[1] - y.range()[0];
        ySpace = y.range()[1] - y.range()[0];
        var svg = d3
            .select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.attr("viewBox", [0, 0, props.size.width, props.size.height]);

        var cor = svg
            .selectAll(".cor")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "cor")
            .attr("transform", function (d) {
                return "translate(" + x(d.x) + "," + y(d.y) + ")";
            });

        cor
            .append("rect")
            .attr("width", xSpace / 10)
            .attr("height", ySpace / 10)
            .attr("x", -xSpace / 20)
            .attr("y", -ySpace / 20);

        cor
            .filter(function (d) {
                var ypos = domain.indexOf(d.y);
                var xpos = domain.indexOf(d.x);
                for (var i = ypos + 1; i < num; i++) {
                    if (i === xpos) return false;
                }
                return true;
            })
            .append("text")
            .attr("y", 5)
            .text(function (d) {
                if (d.x === d.y) {
                    return d.x;
                } else {
                    return d.value.toFixed(2);
                }
            })
            .style("font-size", 11)
            .style("text-align", "center")
            .style("fill", function (d) {
                if (d.value === 1) {
                    return "#FFFFFF";
                } else {
                    return color(d.value);
                }
            });

        cor
            .filter(function (d) {
                var ypos = domain.indexOf(d.y);
                var xpos = domain.indexOf(d.x);
                for (var i = ypos + 1; i < num; i++) {
                    if (i === xpos) return true;
                }
                return false;
            })
            .append("circle")
            .attr("r", function (d) {
                return (width / (num * 2)) * (Math.abs(d.value) + 0.1);
            })
            .style("fill", function (d) {
                if (d.value === 1) {
                    return "#000";
                } else {
                    return color(d.value);
                }
            })
            .style("opacity", 0.8);

        var aS = d3
            .scaleLinear()
            .range([-margin.top + 5, height + margin.bottom - 5])
            .domain([1, -1]);

        var yA = d3.axisRight().scale(aS).tickPadding(7);

        var aG = svg
            .append("g")
            .attr("class", "y axis")
            .call(yA)
            .attr("transform", "translate(" + (width + margin.right / 2) + " ,0)");

        var iR = d3.range(-1, 1.01, 0.01);
        var h = height / iR.length + 3;
        iR.forEach(function (d) {
            aG.append("rect")
                .style("fill", color(d))
                .style("stroke-width", 0)
                .style("stoke", "none")
                .attr("height", h)
                .attr("width", 10)
                .attr("x", 0)
                .attr("y", aS(d));
        });
    }
    useEffect(setup, []);
    //useEffect(rerender.bind(this, props.size.width, props.size.height));

    return (
        <div>
            <svg ref={svgRef}></svg>
        </div>
    );
}