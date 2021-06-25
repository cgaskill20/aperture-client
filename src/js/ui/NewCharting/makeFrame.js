import React, { useState, useEffect } from 'react';
import HistogramGraph from "./ChartTemplates/HistogramChart";
import ConstraintDropDown from "./constraintDropDown"
import LineGraph from "./ChartTemplates/LineGraph"
import PieGraph from "./ChartTemplates/PieTEST";
import ScatterPlot from "./ChartTemplates/ScatterPlot";
import KDEWrapper from "./KDEWrapper";
import BoxPlot from "./ChartTemplates/BoxPlotChart";
import RadarChart from "./ChartTemplates/RadarChart";



export default function Frame(props) {

    const [id, setID] = useState(`${props.type.name}-frame-${Math.random().toString(36).substring(2, 6)}`);
    const [constraint, setConstraint] = useState();
    const [constraint2, setConstraint2] = useState();
    let frame;
    let data = props.data
    let selectedConstraints = []
    if(data['map_features']){
        Object.keys(data['map_features']).map(constraint =>{
            if(data['map_features'][constraint].length > 0){
                selectedConstraints.push(constraint)
            }
        })
    }

    switch (props.type.name) {

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

        <div style={{
            width: "100%",
            height: props.size.height - 80,
        }}>
            {frame}
        </div>
    );
}
