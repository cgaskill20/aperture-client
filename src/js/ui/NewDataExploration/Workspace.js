import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IndividualLayer from "./IndividualLayer";
import LayerNavigationControl from "./LayerNavigationControl";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    cardSpace: {
        margin: theme.spacing(1),
    },
}));

function printOpenLayers(nowOpenLayers) {
    console.log({nowOpenLayers});
}

export default function Workspace(props) {
    const classes = useStyles();

    printOpenLayers(props.openLayers);

    return (
        <div className={classes.root}>
            <LayerNavigationControl isWorkspace={true} datasets={props.datasets}
                                    workspace={props.workspace} setWorkspace={props.setWorkspace}/>
            {props.workspace.map((layer, index) =>
                <div key={index}>
                    <IndividualLayer layer={layer} isWorkspace={true}
                                     openLayers={props.openLayers} setOpenLayers={props.setOpenLayers}
                                     workspace={props.workspace} setWorkspace={props.setWorkspace} />
                </div>
            )}
        </div>
    );
}