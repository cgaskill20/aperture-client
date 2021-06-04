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

function getLayerText(layerInfo) {
    if(layerInfo) {
        return (
            <div>
                <Typography>{layerInfo}</Typography>
                <br/>
            </div>
        )
    }
}


//FIXME Connect this to the layer text
export default function LayerControls(props) {
    const layer = props.layer;
    console.log({layer})
    if(componentIsRendering) {console.log("|LayerControls Rerending|")}
    return (
        <Card>
            <CardContent>
                {getLayerText(props.layer.info)}
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