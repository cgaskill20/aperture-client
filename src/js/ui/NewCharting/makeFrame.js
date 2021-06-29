import React, { useState, useEffect } from 'react';
import HistogramGraph from "./ChartTemplates/HistogramChart";
import ConstraintDropDown from "./constraintDropDown"
import LineGraph from "./ChartTemplates/LineGraph"
import PieGraph from "./ChartTemplates/PieTEST";
import ScatterPlot from "./ChartTemplates/ScatterPlot";
import KDEWrapper from "./KDEWrapper";
import BoxPlot from "./ChartTemplates/BoxPlotChart";

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

    let wrapWithDropDown = (component, opts, setc) => {
        return (
            <div>
                <ConstraintDropDown options={opts} setConstraint={setc}/>
                {component}
            </div>
        );
    }

    switch (props.type.name) {
        case "histogram":
            frame = 
                <KDEWrapper>
                    <HistogramGraph size={props.size} pos={props.pos} data={props.data} selected={constraint}/>
                </KDEWrapper>
            frame = wrapWithDropDown(frame, selectedConstraints, setConstraint);
            break;
        case "line":
            frame = <LineGraph size={props.size} pos={props.pos} data={props.data} selected={constraint}/>;
            break;
        case "piegraph2":
            frame = <PieGraph size={props.size} pos={props.pos} data={props.data} selected={constraint}/>; 
            frame = wrapWithDropDown(frame, selectedConstraints, setConstraint);
            break;
        case "scatterplot":
            frame =  <ScatterPlot size={props.size} pos={props.pos} data={props.data} selected={[constraint, constraint2]}/>
            frame = wrapWithDropDown(frame, selectedConstraints, setConstraint);
            frame = wrapWithDropDown(frame, selectedConstraints, setConstraint2);
            break;
        case "piegraph":
            frame = <BoxPlot size={props.size} pos={props.pos} data={props.data} selected={constraint}/>;
            frame = wrapWithDropDown(frame, selectedConstraints, setConstraint);
            break;
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
