import React, { useState } from 'react';
import HistogramGraph from "./ChartTemplates/Histogram";
import ConstraintDropDown from "./constraintDropDown"
import LineChart from "./ChartTemplates/LineChart";


export default function Frame(props) {
    const [id, setID] = useState(`${props.type.name}-frame-${Math.random().toString(36).substring(2, 6)}`);
    const [constraint, setConstraint] = useState()
    let frame;
    switch (props.type.name) {
        case "histogram":
            frame = <HistogramGraph size={props.size} data={props.data} selected={constraint} />; break;
        case "line":
            frame = <LineChart size={props.size} data={props.data} selected={constraint} />; break;
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
    return (
        <div style={{
            width: "100%",
            height: props.size.height - 70,
            border: "1px solid red"
        }}>
            <ConstraintDropDown options={selectedConstraints} setConstraint={setConstraint} />
            {frame}
        </div>
    );
}
