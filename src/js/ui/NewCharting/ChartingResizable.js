import React, {useState, useEffect, createContext} from 'react';
import { Rnd } from 'react-rnd';
import Paper from '@material-ui/core/Paper';
import ChartingWindow from './ChartingWindow';

function shouldAvoidDragging(node) {
    if (!node || !node.className || !node.className.includes) {
        return false;
    }

    const avoidClasses = [ "MuiSlider", "MuiInput" ];
    return avoidClasses.some(_class => node.className.includes(_class));
}

export default function ChartingResizable() {
    let [size, setSize] = useState({ width: 500, height: 400 });
    let [chartData, setChartData] = useState({});

    useEffect(() => {
        window.chartSystem.registerDataConsumer('charting-resizable', setChartData);
        return () => window.chartSystem.unregisterDataConsumer('charting-resizable');
    }, []);

    return (
        <div style={{
            width: '800px',
            height: '800px',
        }}>
            <Rnd default={{
                    x: 500,
                    y: 100,
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
                onDrag={(node, x, y, deltaX, deltaY, lastX, lastY) => {
                    return !shouldAvoidDragging(node.target);
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


