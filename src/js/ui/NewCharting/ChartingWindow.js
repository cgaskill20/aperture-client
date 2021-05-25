import React, { useState } from 'react';
import ChartGlobalControls from './ChartGlobalControls';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import ChartFrameComponent from './ChartFrameComponent';

export default function ChartingWindow(props) {
    const [frames, setFrames] = useState([]);

    const addChartFrame = (frame) => {   
        setFrames(frames.concat([frame]));
    }

    return (
        <Grid container>
            <Grid container direction="row" alignItems="center" justify="center" spacing={1}>
                <Grid container direction="column" alignItems="center" justify="center" style={{ width: "90%" }}>
                    <ChartGlobalControls make={addChartFrame}/>
                    {frames.map((frame, index) => 
                        <ChartFrameComponent key={index} type={frame.type} containerSize={props.size}/>)}
                </Grid>
            </Grid>
        </Grid>
    );
}
