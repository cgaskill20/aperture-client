import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {IconButton, Paper, Typography} from "@material-ui/core";
import {renderIcon} from "./IndividualLayerHelpers";
import {graphableLayers, layers} from "../TabSystem";
import EqualizerIcon from '@material-ui/icons/Equalizer';
import {findIndex} from "./IndividualLayerHelpers";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '98%',
        margin: theme.spacing(1),
    },
    graphIcon: {
        float: "right",
    },
}));

function graphIcon(layerLabel) {
    const index = findIndex(layerLabel);
    const collectionName = layers[index]['collection'];
    if(graphableLayers.includes(collectionName)) {
        return <IconButton color="primary" aria-label="graph-icon">
            <EqualizerIcon />
        </IconButton>
    }
    return;
}

export default function IndividualLayerBrowser(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={1}>
                <Typography>
                    {renderIcon(props.layerLabel, props.openLayers, props.setOpenLayers, props.booleanWorkspace, props.setBooleanWorkspace)}
                    {props.layerLabel}
                    <span className={classes.graphIcon}>{graphIcon(props.layerLabel)}</span>
                </Typography>
            </Paper>
        </div>
    )
}