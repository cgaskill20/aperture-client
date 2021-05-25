import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IndividualLayer from "./IndividualLayer";
import LayerNavigationControl from "./LayerNavigationControl";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

function createWorkspace() {

}

export default function Workspace(props) {
    const classes = useStyles();

    //FIXME Much less copying if we can represent Workspace with a boolean array, use datasets array to extract info
    return (
        <div className={classes.root}>
            <LayerNavigationControl isWorkspace={true} datasets={props.datasets}
                                    workspace={props.workspace} setWorkspace={props.setWorkspace}
                                    setBooleanWorkspace={props.setBooleanWorkspace} />
            {props.workspace.map((layer, index) =>
                <div key={index}>
                    <IndividualLayer layer={layer} isWorkspace={true} index={index} datasets={props.datasets}
                                     openLayers={props.openLayers} setOpenLayers={props.setOpenLayers}
                                     workspace={props.workspace} setWorkspace={props.setWorkspace}
                                     booleanWorkspace={props.booleanWorkspace} setBooleanWorkspace={props.setBooleanWorkspace} />
                </div>
            )}
        </div>
    );
}