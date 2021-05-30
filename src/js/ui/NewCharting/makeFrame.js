import React, { useState, useEffect } from 'react';
import { ChartingType, DataSourceType } from '../../library/charting/chartSystem';
import ChartFrameComponent from "./ChartFrameComponent";
import Histogram from "./Histogram";

export default function Frame(props) {
    const [id, setID] = useState(`${props.type.name}-frame-${Math.random().toString(36).substring(2, 6)}`);
    console.log("in root function");

    useEffect(() => {
        window.chartSystem.registerChart(id, props.type);
        return () => window.chartSystem.unregisterChart(id); 
    }, []);

    return (
        <div style={{
            width: "100%",
            height: props.size.height - 50,
            border: "1px solid red"
        }}>
            <Histogram size={props.size}></Histogram>
        </div>
    );
}
