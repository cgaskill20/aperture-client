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
            <WorkspaceControls layers={props.layers} graphableLayers={props.graphableLayers} layerTitles={props.layerTitles}
                               openLayers={props.openLayers} setOpenLayers={props.setOpenLayers}
                               selectedDatasets={props.selectedDatasets} setSelectedDatasets={props.setSelectedDatasets}
                               booleanWorkspace={props.booleanWorkspace} setBooleanWorkspace={props.setBooleanWorkspace} />
            <WorkspaceLayers layers={props.layers} graphableLayers={props.graphableLayers}
                             openLayers={props.openLayers} setOpenLayers={props.setOpenLayers}
                             booleanWorkspace={props.booleanWorkspace} setBooleanWorkspace={props.setBooleanWorkspace}
                             activeConstraints={props.activeConstraints} setActiveConstraints={props.setActiveConstraints} />
        </div>
    );
}