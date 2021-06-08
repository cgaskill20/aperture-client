import React, { useState } from 'react';
import ChartGlobalControls from './ChartGlobalControls';
import Grid from '@material-ui/core/Grid';
import Frame from './makeFrame';

export default function ChartingWindow(props) {
    const [frames, setFrames] = useState([]);

    const addChartFrame = frame => {   
        setFrames(frames.concat([frame.type]))
    }
    return (
        <Grid container>
            <Grid container direction="row" alignItems="center" justify="center" spacing={1}>
                <Grid container direction="column" alignItems="center" justify="center" style={{ width: "90%" }}>
                    <ChartGlobalControls make={addChartFrame} />
                    {frames.map((frameType, index) => <Frame key={index} type={frameType} size={props.size} data={props.data}/>)}
                </Grid>
            </Grid>
        </Grid>
    );
}
