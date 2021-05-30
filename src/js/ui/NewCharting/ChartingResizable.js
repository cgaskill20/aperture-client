import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import Paper from '@material-ui/core/Paper';
import ChartingWindow from './ChartingWindow';

export default function ChartingResizable() {
    let [size, setSize] = useState({ width: 500, height: 400 });
    let [chartData, setChartData] = useState({});

    return (

        <div style={{
            width: '800px',
            height: '800px',
        }}>
            {console.log("rerenderresizable")}
            <Rnd default={{
                    x: 500,
                    y: 400,
                    width: size.width,
                    height: size.height
                }}
                style={{
                    zIndex: 1000,
                }}
                minWidth={500}
                minHeight={190}
                bounds="window"
                onResizeStop={(e, dir, refToElement, delta, position) => {
                    
                    setSize({ width: size.width + delta.width, height: size.height + delta.height});
                    console.log(size.width);
                }}
            >
                <Paper className={'charting-resizable-window'}>
                    <div style={{ overflowY: "scroll", maxHeight: size.height }}>
                        <ChartingWindow size={size}/>
                    </div>
                </Paper>
            </Rnd>
        </div>
    );
}
