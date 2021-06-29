import React, {useState, useEffect, createContext} from 'react';
import { Rnd } from 'react-rnd';
import Paper from '@material-ui/core/Paper';
import shouldAvoidDragging from './ChartingResizable';


export default function ChartPopOut(props){
    let [size, setSize] = useState({ width: 700, height: 450 });

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

                    </div>
                </Paper>
            </Rnd>
        </div>
    );
}