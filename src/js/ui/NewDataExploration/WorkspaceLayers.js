import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layer from "./Layer";
// import {layers} from "../TabSystem";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

function createWorkspace(layers, graphableLayers, openLayers, setOpenLayers, booleanWorkspace, setBooleanWorkspace, activeConstraints, setActiveConstraints) {
    let workspaceLayers = [];
    booleanWorkspace.forEach((layer, index) => {
        if(layer) {
            workspaceLayers.push(
                <Layer layer={layers[index]} index={index} graphableLayers={graphableLayers}
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
                                            props.activeConstraints, props.setActiveConstraints);

    return (
        <div className={classes.root}>
            {workspaceLayers.map((layer) =>
                <div>{layer}</div>
            )}
        </div>
    );
}