import React from 'react';
import {Button, ButtonGroup, Paper, Typography} from "@material-ui/core";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import EqualizerIcon from "@material-ui/icons/Equalizer";
import TuneIcon from '@material-ui/icons/Tune';
import LinkIcon from '@material-ui/icons/Link';
import AdvancedConstraints from "./AdvancedConstraints";
import {componentIsRendering} from "../TabSystem";
import {isGraphable} from "./Helpers";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}));

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
            <Grid item>
                <Typography>{layerInfo}</Typography>
                <br/>
            </Grid>
        )
    }
}

function sourceIcon(layerInfo) {
    if(layerInfo.source){
        return <Button startIcon={<LinkIcon />} onClick={() => window.open(layerInfo.source, "_blank")}>
            Source
            </Button>
    }
}

export default function LayerControls(props) {
    const classes = useStyles();
    if(componentIsRendering) {console.log("|LayerControls Rerending|")}
    return (
        <Paper elevation={3} className={classes.root}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {getLayerText(props.layer.info)}
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
                        {sourceIcon(props.layer)}
                    </ButtonGroup>
                </Grid>
            </Grid>
        </Paper>
    )
}