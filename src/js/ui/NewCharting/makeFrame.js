import React, { useState, useEffect } from 'react';
import HistogramGraph from "./Histogram";
import ConstraintDropDown from "./constraintDropDown"


export default function Frame(props) {
    const [id, setID] = useState(`${props.type.name}-frame-${Math.random().toString(36).substring(2, 6)}`);

    let frame;
    switch (props.type.name) {
        case "histogram":
           frame = <HistogramGraph size={props.size} data={props.data}></HistogramGraph>; break;
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
            <ConstraintDropDown selected={selectedConstraints}></ConstraintDropDown>
            {frame}
        </div>
    );
}
