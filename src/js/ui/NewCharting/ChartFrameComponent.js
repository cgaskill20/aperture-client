import React from 'react';
import { ChartingType } from '../../library/charting/chartSystem';
import HistogramFrame from './HistogramFrame';

export default function ChartFrameComponent(props) {
    let frame;
    switch (props.type.name) {
        case "histogram": {
            frame = <HistogramFrame/>;
            break;
        }
        default: break;
    }

    return (
        <div style={{
            width: "100%",
            height: "300px",
            border: "1px solid red"
        }}>
            {frame}
        </div>
    );
}
