import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layer from "./Layer";

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
                <Layer layer={layers[index]} layerIndex={index} graphableLayers={graphableLayers} layerTitles={layerTitles}
                       openLayers={openLayers} setOpenLayers={setOpenLayers}
                       booleanWorkspace={booleanWorkspace} setBooleanWorkspace={setBooleanWorkspace}
                       activeConstraints={activeConstraints} setActiveConstraints={setActiveConstraints} />
            );
        }
    });
    return workspaceLayers;
}

export default function WorkspaceLayers(props) {
    const classes = useStyles();
    const workspaceLayers = createWorkspace(props.layers, props.graphableLayers, props.openLayers, props.setOpenLayers, props.booleanWorkspace, props.setBooleanWorkspace,
                                            props.activeConstraints, props.setActiveConstraints, props.layerTitles);

    return (
        <div className={classes.root}>
            {workspaceLayers.map((layer) =>
                <div>{layer}</div>
            )}
        </div>
    );
}