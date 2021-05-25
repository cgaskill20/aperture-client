import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IndividualLayer from "./IndividualLayer";
import LayerNavigationControl from "./LayerNavigationControl";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

function createWorkspace(datasets, openLayers, setOpenLayers, booleanWorkspace, setBooleanWorkspace) {
    let workspaceLayers = [];
    booleanWorkspace.forEach((layer, index) => {
        if(layer) {
            workspaceLayers.push(
                <IndividualLayer layer={datasets[index]} isWorkspace={true} index={index} datasets={datasets}
                                 openLayers={openLayers} setOpenLayers={setOpenLayers}
                                 booleanWorkspace={booleanWorkspace} setBooleanWorkspace={setBooleanWorkspace} />
            );
        }
    });
    return workspaceLayers;
}

export default function Workspace(props) {
    const classes = useStyles();
    const workspaceLayers = createWorkspace(props.datasets, props.openLayers, props.setOpenLayers, props.booleanWorkspace, props.setBooleanWorkspace);

    return (
        <div className={classes.root}>
            <LayerNavigationControl isWorkspace={true} datasets={props.datasets}
                                    setBooleanWorkspace={props.setBooleanWorkspace} />
            {workspaceLayers.map((layer) =>
                <div>{layer}</div>
            )}
        </div>
    );
}