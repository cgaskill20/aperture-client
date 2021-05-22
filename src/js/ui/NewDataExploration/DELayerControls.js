import React from 'react';
import {Button, ButtonGroup, Typography} from "@material-ui/core";
import DECard from "./DECard";
import SettingsIcon from '@material-ui/icons/Settings';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

export default function DELayerControls(props) {
    return (
        <div>
            <DECard
                content={
                    <div>
                        <Typography>
                            {props.text}
                        </Typography>
                        <br/>
                        <ButtonGroup variant="outlined" aria-label="text primary button group">
                            <Button startIcon={<SettingsIcon />}>
                                Advanced...
                            </Button>
                            <Button startIcon={<RotateLeftIcon />}>
                                Reset Constraints
                            </Button>
                        </ButtonGroup>
                    </div>
                }
            />
        </div>
    )
}