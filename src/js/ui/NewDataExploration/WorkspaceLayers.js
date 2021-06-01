import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layer from "./Layer";
import {isComponentRerendering} from "./Workspace";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

function createWorkspace(layers, graphableLayers, openLayers, setOpenLayers, workspace, setWorkspace,  layerTitles) {
    let workspaceLayers = [];
    workspace.forEach((layer, index) => {
        if(layer) {
            workspaceLayers.push(
                <div id={`layer-div-${index}`}>
                    <Layer layer={layers[index]} layerIndex={index} graphableLayers={graphableLayers} layerTitles={layerTitles}
                           openLayers={openLayers} setOpenLayers={setOpenLayers}
                           workspace={workspace} setWorkspace={setWorkspace} />
                </div>
            );
        }
    });
    return workspaceLayers;
}

export default function WorkspaceLayers(props) {
    const classes = useStyles();
    const workspaceLayers = createWorkspace(props.layers, props.graphableLayers, props.openLayers, props.setOpenLayers,
                                            props.workspace, props.setWorkspace, props.layerTitles);

    if(isComponentRerendering) {console.log("|WorkspaceLayers Rerending|")}
    return (
        <div className={classes.root}>
            {workspaceLayers.map((layer, index) =>
                <div key={index}>{layer}</div>
            )}
        </div>
    );
}