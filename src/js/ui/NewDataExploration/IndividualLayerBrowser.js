import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Typography} from "@material-ui/core";
import {renderIcon} from "./IndividualLayerHelpers";
import Util from "../../library/apertureUtil";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '98%',
        margin: theme.spacing(1),
    },
}));

export default function IndividualLayerBrowser(props) {
    const classes = useStyles();
    const layerLabel = props.layer["label"] ? props.layer["label"] : Util.capitalizeString(Util.underScoreToSpace(props.layer["collection"]));

    return (
        <div className={classes.root}>
            <Paper elevation={1}>
                <Typography>
                    {renderIcon(layerLabel, props.openLayers, props.setOpenLayers, props.booleanWorkspace, props.setBooleanWorkspace)}
                    {layerLabel}
                </Typography>
            </Paper>
        </div>
    )
}