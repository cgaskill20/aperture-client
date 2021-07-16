import React, { useEffect, useState } from 'react';
import * as d3 from '../../../third-party/d3.min.js';

export default function CorrelogramChart(props) {

    let svgRef = React.createRef();

    let setup = () => {
        // Dimension of the whole chart. Only one size since it has to be square
        var marginWhole = { top: 10, right: 10, bottom: 10, left: 10 },
            sizeWhole = 3000 - marginWhole.left - marginWhole.right;
        var margin = {
                top: 25,
                right: 80,
                bottom: 25,
                left: 25
            },
            width = 600 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;
        var color = d3
            .scaleLinear()
            .domain([-1, 0, 1])
            .range(["#B22222", "#fff", "#000080"]);
    }

    let prepareData = data => {

    }

    let rerender = (width, height) => {

    }
    React.useEffect(() => {

        let rows2 = [
            {
                "": "mpg",
                mpg: 1,
                cyl: -0.852161959426613,
                disp: -0.847551379262479,
                hp: -0.776168371826586,
                drat: 0.681171907806749,
                wt: -0.867659376517228,
                qsec: 0.418684033921778,
                vs: 0.664038919127593,
                am: 0.599832429454648,
                gear: 0.480284757338842,
                carb: -0.550925073902459
            },
            {
                "": "cyl",
                mpg: -0.852161959426613,
                cyl: 1,
                disp: 0.902032872146999,
                hp: 0.83244745272182,
                drat: -0.69993811382877,
                wt: 0.782495794463241,
                qsec: -0.591242073768869,
                vs: -0.810811796083005,
                am: -0.522607046900675,
                gear: -0.492686599389471,
                carb: 0.526988293749643
            },
            {
                "": "disp",
                mpg: -0.847551379262479,
                cyl: 0.902032872146999,
                disp: 1,
                hp: 0.790948586369806,
                drat: -0.71021392716927,
                wt: 0.887979922058138,
                qsec: -0.433697880811014,
                vs: -0.7104158907906,
                am: -0.591227040063948,
                gear: -0.555569198562483,
                carb: 0.394976864868969
            },
            {
                "": "hp",
                mpg: -0.776168371826586,
                cyl: 0.83244745272182,
                disp: 0.790948586369806,
                hp: 1,
                drat: -0.44875911687292,
                wt: 0.658747887344759,
                qsec: -0.708223388861953,
                vs: -0.72309673735245,
                am: -0.243204257185851,
                gear: -0.125704258225474,
                carb: 0.74981247154911
            },
            {
                "": "drat",
                mpg: 0.681171907806749,
                cyl: -0.69993811382877,
                disp: -0.71021392716927,
                hp: -0.44875911687292,
                drat: 1,
                wt: -0.712440646697372,
                qsec: 0.091204759651183,
                vs: 0.440278464955349,
                am: 0.71271112722627,
                gear: 0.699610131934665,
                carb: -0.0907897988688673
            },
            {
                "": "wt",
                mpg: -0.867659376517228,
                cyl: 0.782495794463241,
                disp: 0.887979922058138,
                hp: 0.658747887344759,
                drat: -0.712440646697372,
                wt: 1,
                qsec: -0.174715878713405,
                vs: -0.554915677663994,
                am: -0.692495258839484,
                gear: -0.583286996536648,
                carb: 0.427605937735487
            },
            {
                "": "qsec",
                mpg: 0.418684033921778,
                cyl: -0.591242073768869,
                disp: -0.433697880811014,
                hp: -0.708223388861953,
                drat: 0.091204759651183,
                wt: -0.174715878713405,
                qsec: 1,
                vs: 0.744535443526254,
                am: -0.229860862184883,
                gear: -0.212682229720365,
                carb: -0.656249228338059
            },
            {
                "": "vs",
                mpg: 0.664038919127593,
                cyl: -0.810811796083005,
                disp: -0.7104158907906,
                hp: -0.72309673735245,
                drat: 0.440278464955349,
                wt: -0.554915677663994,
                qsec: 0.744535443526254,
                vs: 1,
                am: 0.168345124585359,
                gear: 0.206023348733579,
                carb: -0.569607141006843
            },
            {
                "": "am",
                mpg: 0.599832429454648,
                cyl: -0.522607046900675,
                disp: -0.591227040063948,
                hp: -0.243204257185851,
                drat: 0.71271112722627,
                wt: -0.692495258839484,
                qsec: -0.229860862184883,
                vs: 0.168345124585359,
                am: 1,
                gear: 0.794058760256343,
                carb: 0.0575343510705041
            },
            {
                "": "gear",
                mpg: 0.480284757338842,
                cyl: -0.492686599389471,
                disp: -0.555569198562483,
                hp: -0.125704258225474,
                drat: 0.699610131934665,
                wt: -0.583286996536648,
                qsec: -0.212682229720365,
                vs: 0.206023348733579,
                am: 0.794058760256343,
                gear: 1,
                carb: 0.274072836357522
            },
            {
                "": "carb",
                mpg: -0.550925073902459,
                cyl: 0.526988293749643,
                disp: 0.394976864868969,
                hp: 0.74981247154911,
                drat: -0.0907897988688673,
                wt: 0.427605937735487,
                qsec: -0.656249228338059,
                vs: -0.569607141006843,
                am: 0.0575343510705041,
                gear: 0.274072836357522,
                carb: 1
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

        var
            domain = [
                "mpg",
                "cyl",
                "disp",
                "hp",
                "drat",
                "wt",
                "qsec",
                "vs",
                "am",
                "gear",
                "carb"
            ],
            num = Math.sqrt(data.length);

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
    }, []);

    return (
        <div>
            <svg ref={svgRef}></svg>
        </div>
    );
}