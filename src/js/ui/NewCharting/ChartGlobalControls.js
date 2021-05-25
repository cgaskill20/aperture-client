import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useGlobalState } from '../global/GlobalState';

export default function ChartGlobalControls() {
    const [globalState, setGlobalState] = useGlobalState();

    return (
        <div>
            <ButtonGroup variant="outlined" color="primary">
                <Button>Histogram</Button>
                <Button>Scatterplot</Button>
                <Button>COVID-19</Button>
            </ButtonGroup>
            <IconButton aria-label="close" onClick={() => setGlobalState({ chartingOpen: false })}>
                <CloseIcon/>
            </IconButton>
        </div>
    );
}
