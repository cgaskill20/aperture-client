import React, {useState, useEffect, createContext} from 'react';
import { Rnd } from 'react-rnd';
import Paper from '@material-ui/core/Paper';
import ChartingWindow from './ChartingWindow';
import dataContext from "./dataContext";


export default function ChartingResizable() {
    let [size, setSize] = useState({ width: 500, height: 400 });
    let [chartData, setChartData] = useState({});


    useEffect(() => {
        window.chartSystem.registerDataConsumer('charting-resizable', setChartData);
        return () => window.chartSystem.unregisterDataConsumer('charting-resizable');
    }, []);

    useEffect(() => {
        console.log(chartData);
    });

    return (
        <div style={{
            width: '800px',
            height: '800px',
        }}>
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
                }}
            >
                <Paper className={'charting-resizable-window'}>
                    <div style={{ overflowY: "scroll", maxHeight: size.height }}>
                        <ChartingWindow size={size} data={chartData}/>
                    </div>
                </Paper>
            </Rnd>
        </div>
    );
}


