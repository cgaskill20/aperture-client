import React, { useState, useEffect } from 'react';
import ConstraintDropDown from "./constraintDropDown";
import KDEWrapper from "./KDEWrapper";
import HistogramGraph from "./ChartTemplates/HistogramChart";
import LineGraph from "./ChartTemplates/LineGraph";
import PieGraph from "./ChartTemplates/PieTEST";
import ScatterPlot from "./ChartTemplates/ScatterPlot";
import BoxPlot from "./ChartTemplates/BoxPlotChart";
import RadarChart from "./ChartTemplates/RadarChart";

export default function handleFrameTypes(props) {
    const [constraint, setConstraint] = useState();
    const [constraint2, setConstraint2] = useState();
    let frame;
    let selectedConstraints = []
    if(props.data['map_features']){
        Object.keys(props.data['map_features']).map(constraint =>{
            if(props.data['map_features'][constraint].length > 0){
                selectedConstraints.push(constraint)
            }
        })
    }
    switch (props.name) {
        case "histogram":
            frame =
                <div>
                    <ConstraintDropDown options={selectedConstraints} setConstraint={setConstraint}></ConstraintDropDown>
                    <KDEWrapper>
                        <HistogramGraph size={props.size} data={props.data} selected={constraint}></HistogramGraph>
                    </KDEWrapper>
                </div>;
            break;
        case "line":
            frame = <LineGraph size={props.size} data={props.data} selected={constraint}></LineGraph>; break;
        case "piegraph":
            frame = <div><ConstraintDropDown options={selectedConstraints} setConstraint={setConstraint}></ConstraintDropDown>
                <PieGraph size={props.size} data={props.data} selected={constraint}></PieGraph></div>; break;
        case "scatterplot":
            frame =
                <div>
                    <ConstraintDropDown options={selectedConstraints} setConstraint={setConstraint}></ConstraintDropDown>
                    <ConstraintDropDown options={selectedConstraints} setConstraint={setConstraint2}></ConstraintDropDown>
                    <ScatterPlot size={props.size} data={props.data} selected={[constraint, constraint2]}></ScatterPlot>
                </div>; break;
        case "boxplot":
            frame = <div><ConstraintDropDown options={selectedConstraints} setConstraint={setConstraint}></ConstraintDropDown>
                <BoxPlot size={props.size} data={props.data} selected={constraint}></BoxPlot></div>; break;
        case "radarchart":
            frame = <div>
                <RadarChart size={props.size} data={props.data}></RadarChart></div>; break;

        default: break;
    }

    return (
        frame
    )
}