import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import DESearchBar from './DESearchBar'
import IndividualLayer from "./IndividualLayer";
import {Button, ButtonGroup} from "@material-ui/core";
import {updateWorkspace} from "./Workspace";


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

function addAll(datasets, workspace) {
    for(const layer in datasets) {
        workspace.push(layer);
    }
    return workspace;
}

function removeAll() {
    return [];
}

export default function DatasetsNavigator(props) {
    const classes = useStyles();

    if(props.isWorkspace) {
        return (
            <div className={classes.root}>
                <DESearchBar isWorkspace={props.isWorkspace} datasets={props.datasets}/>
                <Button variant="outlined" onClick={() => props.setWorkspace(removeAll())}>Remove All Datasets From Workspace</Button>
                {props.datasets.map((layer, index) =>
                    <div key={layer}>
                        <IndividualLayer layer={layer} index={index} workspace={props.workspace}
                                         setWorkspace={props.setWorkspace} isWorkspace={props.isWorkspace}/>
                    </div>
                )}
            </div>
        );
    }

    else {
        return (
            <div className={classes.root}>
                <DESearchBar isWorkspace={props.isWorkspace} datasets={props.datasets} />
                <ButtonGroup>
                <Button variant="outlined" onClick={() => props.setWorkspace(props.datasets)}>Add All Datasets To Workspace</Button>
                {/*<Button variant="outlined">Add Tract Datasets To Workspace</Button>*/}
                {/*<Button variant="outlined">Add County Datasets To Workspace</Button>*/}
                </ButtonGroup>
                {props.datasets.map((layer, index) =>
                    <div key={layer}>
                        <IndividualLayer layer={layer} index={index} workspace={props.workspace}
                                         setWorkspace={props.setWorkspace}/>
                    </div>
                )}
            </div>
        )
    }
}