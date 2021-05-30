import React, { useState } from 'react';
import ChartGlobalControls from './ChartGlobalControls';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import ChartFrameComponent from './ChartFrameComponent';
import Frame from './makeFrame';

export default function ChartingWindow(props) {
    const [frames, setFrames] = useState([]);

    const addChartFrame = frame => {   
        setFrames(frames.concat([<Frame type={"histogram"} size={props.size}/>]));
        console.log(frames);
    }

    return (
        <Grid container>
            <Grid container direction="row" alignItems="center" justify="center" spacing={1}>
                <Grid container direction="column" alignItems="center" justify="center" style={{ width: "90%" }}>
                    <ChartGlobalControls make={addChartFrame}/>
                        {frames}
                </Grid>
            </Grid>
        </Grid>
    );
}
