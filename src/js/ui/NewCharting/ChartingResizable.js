import React from 'react';
import { Rnd } from 'react-rnd';
import ChartGlobalControls from './ChartGlobalControls';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function ChartingResizable() {
    return (
        <div style={{
            width: '800px',
            height: '800px',
        }}>
            <Rnd default={{
                    x: 300,
                    y: 400,
                    width: 300,
                    height: 400.
                }}
                style={{
                    zIndex: 1000,
                }}
                minWidth={500}
                minHeight={190}
                bounds="window"
            >
                <Paper className={'charting-resizable-window'}>
                    <Grid container>
                        <Grid container direction="column" alignItems="center" justify="center" spacing={1}>
                            <Grid item>
                                <ChartGlobalControls/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Rnd>
        </div>
    );
}
