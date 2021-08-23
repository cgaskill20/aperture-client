import React, {useState, useEffect, createContext} from 'react';
import { Rnd } from 'react-rnd';
import Paper from '@material-ui/core/Paper';



export default function ChartPopOut(props){
    let [size, setSize] = useState({ width: 200, height: 200 });


    return (
        <div style={{
            width: '200px',
            height: '200px',
        }}>
            <Rnd default={{
                x: 500,
                y: 0,
                width: size.width,
                height: size.height

            }}

                 style={{
                     zIndex: 1001,
                 }}
                 minWidth={200}
                 minHeight={190}
                 bounds="window"
                 onResizeStop={(e, dir, refToElement, delta, position) => {
                     setSize({ width: size.width + delta.width, height: size.height + delta.height});
                 }}
                 onDrag={e => {
                     e.stopImmediatePropagation();
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