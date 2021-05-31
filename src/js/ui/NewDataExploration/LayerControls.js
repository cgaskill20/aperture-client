import React from 'react';
import {Button, ButtonGroup, Card, Typography} from "@material-ui/core";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import CardContent from "@material-ui/core/CardContent";
// import {graphableLayers} from "../TabSystem";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import AdvancedConstraints from "./AdvancedConstraints";

function graphIcon(layer, graphableLayers) {
    const collectionName = layer.collection;
    if(graphableLayers.includes(collectionName)) {
        return <Button startIcon={<EqualizerIcon />}>
            Graph Me
        </Button>
    }
    return;
}

export default function LayerControls(props) {
    return (
        <Card>
            <CardContent>
                <Typography>
                    {props.text}
                </Typography>
                <br/>
                <ButtonGroup variant="outlined" aria-label="text primary button group">
                    <AdvancedConstraints allLayerConstraints={props.allLayerConstraints} layer={props.layer} layerIndex={props.layerIndex}
                                         activeConstraints={props.activeConstraints} setActiveConstraints={props.setActiveConstraints} />
                    <Button startIcon={<RotateLeftIcon />}>
                        Reset Constraints
                    </Button>
                    {graphIcon(props.layer, props.graphableLayers)}
                </ButtonGroup>
            </CardContent>
        </Card>
    )
}