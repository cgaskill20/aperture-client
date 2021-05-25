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

export default function Workspace(props) {
    const classes = useStyles();

    // return (
    //     <div className={classes.root}>
    //         <LayerNavigationControl isWorkspace={true} datasets={props.datasets}
    //                                 workspace={props.workspace} setWorkspace={props.setWorkspace}/>
    //         {props.workspace.map((layer, index) =>
    //             <div key={index}>
    //                 <IndividualLayer layer={layer} isWorkspace={true} index={index} datasets={props.datasets}
    //                                  openLayers={props.openLayers} setOpenLayers={props.setOpenLayers}
    //                                  workspace={props.workspace} setWorkspace={props.setWorkspace} />
    //             </div>
    //         )}
    //     </div>
    // );

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