import React, { useState, useEffect } from 'react';
import HistogramGraph from "./ChartTemplates/HistogramChart";
import ConstraintDropDown from "./constraintDropDown"
import LineGraph from "./ChartTemplates/LineGraph"
import PieGraph from "./ChartTemplates/PieTEST";

export default function Frame(props) {
    const [id, setID] = useState(`${props.type.name}-frame-${Math.random().toString(36).substring(2, 6)}`);
    const [constraint, setConstraint] = useState()
    let frame;
    switch (props.type.name) {
        case "histogram":
            frame = <HistogramGraph size={props.size} data={props.data} selected={constraint}></HistogramGraph>; break;
        case "line":
            frame = <LineGraph size={props.size} data={props.data} selected={constraint}></LineGraph>; break;
        case "scatterplot":
            frame = <PieGraph size={props.size} data={props.data} selected={constraint}></PieGraph>; break;
        default: break;
    }
    let data = props.data
    let selectedConstraints = []
    if(data['map_features']){
        Object.keys(data['map_features']).map(constraint =>{
            if(data['map_features'][constraint].length > 0){
                selectedConstraints.push(constraint)
            }
        })
    }
    let selected = ""
    return (

        <div style={{
            width: "100%",
            height: props.size.height - 80,
        }}>
            <ConstraintDropDown options={selectedConstraints} setConstraint={setConstraint}></ConstraintDropDown>
            {frame}
        </div>
    );
}
