import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layer from "./Layer";
import {componentIsRendering} from "../TabSystem";
import {hashIndex} from "./Helpers";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

function createWorkspace(layers, graphableLayers, openLayers, setOpenLayers, workspace, layerTitles, activeConstraints, setActiveConstraints) {
    let workspaceLayers = [];
    let referenceIndices = [];
    workspace.forEach((layer, index) => {
        if(layer) {
            const originalIndex = index;
            // index = hashIndex(7) + index;
            index = hashIndex(originalIndex, index, 1);
            const createWorkspaceLayers = `${layerTitles[originalIndex]}: ${index}`
            console.log({createWorkspaceLayers})
            workspaceLayers.push(
                <div key={index} id={`layer-div-${originalIndex}`}>
                    <Layer layer={layers[originalIndex]} layerIndex={originalIndex} graphableLayers={graphableLayers} layerTitles={layerTitles}
                           openLayers={openLayers} setOpenLayers={setOpenLayers}
                           activeConstraints={activeConstraints} setActiveConstraints={setActiveConstraints} />
                </div>
            );
            referenceIndices.push(originalIndex);
        }
    });
    return [workspaceLayers, referenceIndices];
}

export default function WorkspaceLayers(props) {
    const classes = useStyles();
    const [workspaceLayers, referenceIndices] = createWorkspace(props.layers, props.graphableLayers, props.openLayers, props.setOpenLayers,
                                                                props.workspace, props.layerTitles, props.activeConstraints, props.setActiveConstraints);

    if(componentIsRendering) {console.log("|WorkspaceLayers Rerending|")}
    return (
        <div className={classes.root}>
            {workspaceLayers.map((layer, index) => {
                const layerIndex = referenceIndices[index];
                // index = layerIndex + hashIndex(11) + index;
                index = hashIndex(layerIndex, index,2);
                const mapWorkspaceLayers = `${layerIndex}: ${index}`
                console.log({mapWorkspaceLayers});
                return (<div key={index}>{layer}</div>)
            }
            )}
        </div>
    );
}