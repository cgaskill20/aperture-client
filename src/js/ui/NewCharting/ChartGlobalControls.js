import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useGlobalState } from '../global/GlobalState';
import { ChartingType } from './chartSystem';

export default function ChartGlobalControls(props) {
    const [globalState, setGlobalState] = useGlobalState();

    return (
        <div>
            {/* Graph creation buttons */}
            <ButtonGroup variant="outlined" color="primary">
                <Button onClick={() => props.make({ type: ChartingType.HISTOGRAM })}>Histogram</Button>
                <Button onClick={() => props.make({ type: ChartingType.SCATTERPLOT })}>Scatterplot</Button>
                <Button onClick={() => props.make({ type: ChartingType.LINE })}>COVID-19</Button>
            </ButtonGroup>

            {/* Close button */}
            <IconButton aria-label="close" onClick={() => setGlobalState({ chartingOpen: false })}>
                <CloseIcon/>
            </IconButton>
        </div>
    );
}
