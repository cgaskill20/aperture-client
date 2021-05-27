import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import WorkspaceControls from "./WorkspaceControls";
import WorkspaceLayers from "./WorkspaceLayers";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

export default function Workspace(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <WorkspaceControls booleanWorkspace={props.booleanWorkspace} setBooleanWorkspace={props.setBooleanWorkspace} />
            <WorkspaceLayers openLayers={props.openLayers} setOpenLayers={props.setOpenLayers}
                             booleanWorkspace={props.booleanWorkspace} setBooleanWorkspace={props.setBooleanWorkspace} />
        </div>
    );
}