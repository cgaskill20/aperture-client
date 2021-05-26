import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Workspace from "./Workspace";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function ScrollableTabsButtonAuto(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Workspace openLayers={props.openLayers} setOpenLayers={props.setOpenLayers}
                       booleanWorkspace={props.booleanWorkspace} setBooleanWorkspace={props.setBooleanWorkspace} />
        </div>
    );
}