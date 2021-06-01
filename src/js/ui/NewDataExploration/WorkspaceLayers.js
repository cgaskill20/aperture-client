import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layer from "./Layer";
import {isComponentRerendering} from "../TabSystem";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

function createWorkspace(layers, graphableLayers, openLayers, setOpenLayers, booleanWorkspace, setBooleanWorkspace, activeConstraints, setActiveConstraints, layerTitles) {
    let workspaceLayers = [];
    booleanWorkspace.forEach((layer, index) => {
        if(layer) {
            workspaceLayers.push(
                <div id={`layer-div-${index}`}>
                    <Layer layer={layers[index]} layerIndex={index} graphableLayers={graphableLayers} layerTitles={layerTitles}
                           openLayers={openLayers} setOpenLayers={setOpenLayers}
                           booleanWorkspace={booleanWorkspace} setBooleanWorkspace={setBooleanWorkspace}
                           activeConstraints={activeConstraints} setActiveConstraints={setActiveConstraints} />
                </div>
            );
        }
    });
    return workspaceLayers;
}

export default function WorkspaceLayers(props) {
    const classes = useStyles();
    const workspaceLayers = createWorkspace(props.layers, props.graphableLayers, props.openLayers, props.setOpenLayers, props.booleanWorkspace, props.setBooleanWorkspace,
                                            props.activeConstraints, props.setActiveConstraints, props.layerTitles);

    if(isComponentRerendering) {console.log("|WorkspaceLayers Rerending|")}
    return (
        <div className={classes.root}>
            {workspaceLayers.map((layer, index) =>
                <div key={index}>{layer}</div>
            )}
        </div>
    );
}