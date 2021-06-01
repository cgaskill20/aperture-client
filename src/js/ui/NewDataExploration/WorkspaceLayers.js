import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layer from "./Layer";
import {isComponentRerendering} from "./Workspace";
import {randomizeIndex} from "./Helpers";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

function createWorkspace(layers, graphableLayers, openLayers, setOpenLayers, workspace, setWorkspace, layerTitles) {
    let workspaceLayers = [];
    workspace.forEach((layer, index) => {
        if(layer) {
            const originalIndex = index;
            index = randomizeIndex();
            workspaceLayers.push(
                <div key={index} id={`layer-div-${originalIndex}`}>
                    <Layer layer={layers[originalIndex]} layerIndex={originalIndex} graphableLayers={graphableLayers} layerTitles={layerTitles}
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
            {workspaceLayers.map((layer, index) => {
                    index = randomizeIndex();
                    return (<div key={index}>{layer}</div>)
                }
            )}
        </div>
    );
}