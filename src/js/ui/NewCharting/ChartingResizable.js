import React from 'react';
import { Rnd } from 'react-rnd';
import Paper from '@material-ui/core/Paper';
import ChartingWindow from './ChartingWindow';

export default class ChartingResizable extends React.Component {
    render() {
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
                        <ChartingWindow/>
                    </Paper>
                </Rnd>
            </div>
        );
    }
}
