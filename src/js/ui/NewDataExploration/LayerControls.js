import React, {useState} from 'react';
import {Button, ButtonGroup, Card, Paper, Typography} from "@material-ui/core";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import CardContent from "@material-ui/core/CardContent";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import TuneIcon from '@material-ui/icons/Tune';
import AdvancedConstraints from "./AdvancedConstraints";
import {componentIsRendering} from "../TabSystem";
import {isGraphable} from "./Helpers";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
}));

function graphIcon(layer, graphableLayers) {
    if(isGraphable(layer, graphableLayers)) {
        return <Button startIcon={<EqualizerIcon />}>
            Graph Me
        </Button>
    }
    return;
}

function getLayerText(layerInfo, classes) {
    if(layerInfo) {
        return (
            <Grid item>
                <Typography className={classes.text}>{layerInfo}</Typography>
                <br/>
            </Grid>
        )
    }
}

export default function LayerControls(props) {
    const classes = useStyles();
    if(componentIsRendering) {console.log("|LayerControls Rerending|")}
    return (
        <div>
            <Paper elevation={3}>
                <CardContent>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        {getLayerText(props.layer.info, classes)}
                        <Grid item>
                            <ButtonGroup variant="outlined">
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
                        </Grid>
                    </Grid>
                </CardContent>
            </Paper>
        </div>
    )
}