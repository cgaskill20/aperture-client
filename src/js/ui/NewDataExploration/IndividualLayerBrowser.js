import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Typography} from "@material-ui/core";
import {renderIcon} from "./IndividualLayerHelpers";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '98%',
        margin: theme.spacing(1),
    },
}));

export default function IndividualLayerBrowser(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={1}>
                <Typography>
                    {renderIcon(props.layerLabel, props.openLayers, props.setOpenLayers, props.booleanWorkspace, props.setBooleanWorkspace)}
                    {props.layerLabel}
                </Typography>
            </Paper>
        </div>
    )
}