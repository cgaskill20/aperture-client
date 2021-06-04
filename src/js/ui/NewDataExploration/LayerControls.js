import React, {useState} from 'react';
import {Button, ButtonGroup, Card, Typography} from "@material-ui/core";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import CardContent from "@material-ui/core/CardContent";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import TuneIcon from '@material-ui/icons/Tune';
import AdvancedConstraints from "./AdvancedConstraints";
import {componentIsRendering} from "../TabSystem";
import {isGraphable} from "./Helpers";

function graphIcon(layer, graphableLayers) {
    if(isGraphable(layer, graphableLayers)) {
        return <Button startIcon={<EqualizerIcon />}>
            Graph Me
        </Button>
    }
    return;
}

export default function LayerControls(props) {
    if(componentIsRendering) {console.log("|LayerControls Rerending|")}
    return (
        <Card>
            <CardContent>
                <Typography>
                    {props.text}
                </Typography>
                <br/>
                <ButtonGroup variant="outlined" aria-label="text primary button group">
                    <AdvancedConstraints allLayerConstraints={props.allLayerConstraints} layerIndex={props.layerIndex}
                                         activeLayerConstraints={props.activeLayerConstraints} setActiveLayerConstraints={props.setActiveLayerConstraints} />
                    <Button startIcon={<RotateLeftIcon />}>
                        Reset Constraints
                    </Button>
                    <Button startIcon={<TuneIcon />} onClick={() => {
                        props.setActiveLayerConstraints(props.defaultLayerConstraints);
                    }}>
                        Default Constraints
                    </Button>
                    {graphIcon(props.layer, props.graphableLayers)}
                </ButtonGroup>
            </CardContent>
        </Card>
    )
}