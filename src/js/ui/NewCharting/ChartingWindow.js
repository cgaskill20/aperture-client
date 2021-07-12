import React, { useState } from 'react';
import ChartGlobalControls from './ChartGlobalControls';
import Grid from '@material-ui/core/Grid';
import Frame from './makeFrame';

export default function ChartingWindow(props) {
    const [frames, setFrames] = useState([]);

    const addChartFrame = frame => {   
        setFrames(frames.concat([frame.type]))
    }
    const removeChartFrame = index => {
        frames.splice(index, 1);
        setFrames(frames)
    }
    return (
        <Grid container>
            <Grid container direction="row" alignItems="center" justify="center" spacing={1}>
                <Grid container direction="column" alignItems="center" justify="center" style={{ width: "90%" }}>
                    <ChartGlobalControls make={addChartFrame} />
                    {frames.map((frameType, index) => <Frame key={index} type={frameType} index={index} size={props.size} remove={removeChartFrame} data={props.data}/>)}
                </Grid>
            </Grid>
        </Grid>
    );
}
