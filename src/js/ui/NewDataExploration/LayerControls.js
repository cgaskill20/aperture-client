import React, {useState} from 'react';
import {Button, ButtonGroup, Card, Typography} from "@material-ui/core";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import CardContent from "@material-ui/core/CardContent";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import TuneIcon from '@material-ui/icons/Tune';
import AdvancedConstraints from "./AdvancedConstraints";
import {defaultConstraints, isComponentRerendering} from "./Workspace";

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
    const [layerConstraints, setLayerConstraints] = useState(props.activeConstraints[props.layerIndex]);

    if(isComponentRerendering) {console.log("|LayerControls Rerending|")}
    return (
        <Card>
            <CardContent>
                <Typography>
                    {props.text}
                </Typography>
                <br/>
                <ButtonGroup variant="outlined" aria-label="text primary button group">
                    <AdvancedConstraints allLayerConstraints={props.allLayerConstraints} layerIndex={props.layerIndex}
                                         layerConstraints={layerConstraints} setLayerConstraints={setLayerConstraints}
                                         activeConstraints={props.activeConstraints} setActiveConstraints={props.setActiveConstraints} />
                    <Button startIcon={<RotateLeftIcon />}>
                        Reset Constraints
                    </Button>
                    <Button startIcon={<TuneIcon />} onClick={() => {
                        setLayerConstraints(defaultConstraints[props.layerIndex]);
                        props.setActiveConstraints(defaultConstraints);
                    }}>
                        Default Constraints
                    </Button>
                    {graphIcon(props.layer, props.graphableLayers)}
                </ButtonGroup>
            </CardContent>
        </Card>
    )
}