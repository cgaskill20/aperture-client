import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layer from "./Layer";
import {componentIsRendering} from "../TabSystem";
import {hashIndex} from "./Helpers";
import {printHashes} from "./Workspace";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

function createWorkspace(layers, graphableLayers, openLayers, setOpenLayers, workspace, layerTitles, activeConstraints, setActiveConstraints) {
    let workspaceLayers = [];
    workspace.forEach((layer, index) => {
        if(layer) {
            const originalIndex = index;
            index = hashIndex(originalIndex, index, 19);
            const createWorkspaceLayers = `${layerTitles[originalIndex]}: ${index}`
            if(printHashes) console.log({createWorkspaceLayers})
            workspaceLayers.push(
                <div key={index} id={`layer-div-${originalIndex}`}>
                    <Layer layer={layers[originalIndex]} layerIndex={originalIndex} graphableLayers={graphableLayers} layerTitles={layerTitles}
                           openLayers={openLayers} setOpenLayers={setOpenLayers}
                           activeConstraints={activeConstraints} setActiveConstraints={setActiveConstraints} />
                </div>
            );
        }
    });
    return workspaceLayers;
}

export default function WorkspaceLayers(props) {
    const classes = useStyles();
    const workspaceLayers = createWorkspace(props.layers, props.graphableLayers, props.openLayers, props.setOpenLayers,
                                                                props.workspace, props.layerTitles, props.activeConstraints, props.setActiveConstraints);

    if(componentIsRendering) {console.log("|WorkspaceLayers Rerending|")}
    return (
        <div className={classes.root}>
            {workspaceLayers}
        </div>
    );
}