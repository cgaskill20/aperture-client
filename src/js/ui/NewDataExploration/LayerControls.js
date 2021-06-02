import React, {useState} from 'react';
import {Button, ButtonGroup, Card, Typography} from "@material-ui/core";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import CardContent from "@material-ui/core/CardContent";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import TuneIcon from '@material-ui/icons/Tune';
import AdvancedConstraints from "./AdvancedConstraints";
import {componentIsRendering} from "../TabSystem";

function graphIcon(layer, graphableLayers) {
    const collectionName = layer.collection;
    if(graphableLayers.includes(collectionName)) {
        return <Button startIcon={<EqualizerIcon />}>
            Graph Me
        </Button>
    }
    return;
}

function setDefaultConstraints(activeConstraints, defaultConstraints, layerIndex) {
    let newActiveConstraints = [...activeConstraints];
    newActiveConstraints[layerIndex] = defaultConstraints;
    return newActiveConstraints;
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
                                         activeConstraints={props.activeConstraints} setActiveConstraints={props.setActiveConstraints} />
                    <Button startIcon={<RotateLeftIcon />}>
                        Reset Constraints
                    </Button>
                    <Button startIcon={<TuneIcon />} onClick={() => {
                        props.setActiveConstraints(setDefaultConstraints(props.activeConstraints, props.defaultConstraints, props.layerIndex));
                    }}>
                        Default Constraints
                    </Button>
                    {graphIcon(props.layer, props.graphableLayers)}
                </ButtonGroup>
            </CardContent>
        </Card>
    )
}