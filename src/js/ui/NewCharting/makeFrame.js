import React, { useState, useEffect } from 'react';
import HistogramGraph from "./ChartTemplates/HistogramChart";
import ConstraintDropDown from "./constraintDropDown"
import LineGraph from "./ChartTemplates/LineGraph"
import PieGraph from "./ChartTemplates/PieTEST";
import ScatterPlot from "./ChartTemplates/ScatterPlot";
import KDEWrapper from "./KDEWrapper";
import BoxPlot from "./ChartTemplates/BoxPlotChart";
import RadarChart from "./ChartTemplates/RadarChart";
import HandleFrameTypes from "./handleFrameTypes";



export default function Frame(props) {
    const [id, setID] = useState(`${props.type.name}-frame-${Math.random().toString(36).substring(2, 6)}`);

    let frame;
    let data = props.data




    return (

        <div style={{
            width: "100%",
            height: props.size.height - 80,
        }}>
            <HandleFrameTypes size={props.size} data={props.data} name={props.type.name}></HandleFrameTypes>
        </div>
    );
}
