import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {IconButton, Paper, Typography} from "@material-ui/core";
import {renderIcon} from "./IndividualLayerHelpers";
import {graphableLayers} from "../TabSystem";
import EqualizerIcon from '@material-ui/icons/Equalizer';

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
    if(graphableLayers.includes(layerLabel)) {
        return <IconButton aria-label="graph-icon">
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