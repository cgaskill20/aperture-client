import React from 'react'
import { ChartingType } from '../../library/charting/chartSystem'

export default function ChartFrameComponent(props) {
    return (
        <div style={{
            width: "100%",
            height: "300px",
            backgroundColor: "#eee",
            border: "1px solid red"
        }}>
            <p>{props.type}</p>
        </div>
    );
}
