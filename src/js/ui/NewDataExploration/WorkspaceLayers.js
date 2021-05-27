import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layer from "./Layer";
import {layers} from "../TabSystem";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

function createWorkspace(openLayers, setOpenLayers, booleanWorkspace, setBooleanWorkspace) {
    let workspaceLayers = [];
    booleanWorkspace.forEach((layer, index) => {
        if(layer) {
            workspaceLayers.push(
                <Layer layer={layers[index]} index={index}
                       openLayers={openLayers} setOpenLayers={setOpenLayers}
                       booleanWorkspace={booleanWorkspace} setBooleanWorkspace={setBooleanWorkspace} />
            );
        }
    });
    return workspaceLayers;
}

export default function WorkspaceLayers(props) {
    const classes = useStyles();
    const workspaceLayers = createWorkspace(props.openLayers, props.setOpenLayers, props.booleanWorkspace, props.setBooleanWorkspace);

    return (
        <div className={classes.root}>
            {workspaceLayers.map((layer) =>
                <div>{layer}</div>
            )}
        </div>
    );
}