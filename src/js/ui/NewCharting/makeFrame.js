import React, { useState, useEffect } from 'react';
import HistogramGraph from "./ChartTemplates/HistogramChart";
import ConstraintDropDown from "./constraintDropDown"
import LineGraph from "./ChartTemplates/LineGraph"
import PieGraph from "./ChartTemplates/PieTEST";
import ScatterPlot from "./ChartTemplates/ScatterPlot";
import KDEWrapper from "./KDEWrapper";
import BoxPlot from "./ChartTemplates/BoxPlotChart";
import FrameControls from "./frameControls";
import CorrelogramChart from "./ChartTemplates/CorrelogramChart";



export default function Frame(props) {

    const [id, setID] = useState(`${props.type.name}-frame-${Math.random().toString(36).substring(2, 6)}`);

    let frame;
    const [constraint, setConstraint] = useState();
    const [constraint2, setConstraint2] = useState();

    let selectedConstraints = [];
    let trackFilters = [];
    let countyFilters = [];
    if(props.data['map_features']){
        Object.keys(props.data['map_features']).map(constraint =>{
            if(props.data['map_features'][constraint].length > 0){
                selectedConstraints.push(constraint)
                if(props.data['map_features'][constraint][0].type == "county"){
                    countyFilters.push(constraint);
                }
                if(props.data['map_features'][constraint][0].type == "tract"){
                    trackFilters.push(constraint);
                }
            }

        })
    }


    switch (props.type.name) {
        case "histogram":
            frame =
                <div>
                    <FrameControls index={props.index} remove={props.remove} options={selectedConstraints} setConstraint={setConstraint} numDropDowns={1}></FrameControls>
                    <KDEWrapper>
                        <HistogramGraph size={props.size} data={props.data} selected={constraint}></HistogramGraph>
                    </KDEWrapper>
                </div>;
                break;
        case "line":
            frame = <LineGraph size={props.size} data={props.data} selected={constraint}></LineGraph>; break;
        case "piegraph":
            frame = <div><FrameControls index={props.index} remove={props.remove} options={selectedConstraints} setConstraint={setConstraint} numDropDowns={1}></FrameControls>
                <PieGraph size={props.size} data={props.data} selected={constraint}></PieGraph></div>; break;
        case "scatterplot":
            frame =
                <div>
                    <FrameControls index={props.index} remove={props.remove} options={[countyFilters, trackFilters]} setConstraint={setConstraint} setConstraint2={setConstraint2} numDropDowns={2} selector={true}></FrameControls>
                    <ScatterPlot size={props.size} data={props.data} selected={[constraint, constraint2]}></ScatterPlot>
                </div>; break;
        case "boxplot":
            frame = <div><FrameControls index={props.index} remove={props.remove} options={selectedConstraints} setConstraint={setConstraint} numDropDowns={1}></FrameControls>
                <BoxPlot size={props.size} data={props.data} selected={constraint}></BoxPlot></div>; break;
        case "correlogram":
            frame = <div><FrameControls index={props.index} remove={props.remove} options={[countyFilters, trackFilters]} selector={true}></FrameControls>
                <CorrelogramChart size={props.size} data={props.data} selected={constraint}></CorrelogramChart></div>; break;

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
