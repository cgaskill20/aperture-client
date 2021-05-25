import React from 'react';
import ChartGlobalControls from './ChartGlobalControls';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import ChartFrameComponent from './ChartFrameComponent';

export default class ChartingWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            frames: [],
        };
    }

    render() {
        return (
            <Grid container>
                <Grid container direction="column" alignItems="center" justify="center" spacing={1}>
                    <Grid item>
                        <ChartGlobalControls make={this.addChartFrame.bind(this)}/>
                        {this.state.frames.map((frame, index) => 
                            <ChartFrameComponent key={index} type={frame.type}/>)}
                    </Grid>
                </Grid>
            </Grid>
        );
    }

    addChartFrame(type) {
        this.setState((state, props) => ({
            frames: state.frames.concat([{ type: type }])
        }));
    }
}
