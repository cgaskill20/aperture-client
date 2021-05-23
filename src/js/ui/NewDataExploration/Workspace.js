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

    return (
        <div className={classes.root}>
            <LayerNavigationControl isWorkspace={true} datasets={props.datasets} setWorkspace={props.setWorkspace}/>
            {props.datasets.map((layer) =>
                <div key={layer}>
                    <IndividualLayer layer={layer} workspace={props.workspace}
                                         setWorkspace={props.setWorkspace} isWorkspace={true}/>
                </div>
            )}
        </div>
    );
}