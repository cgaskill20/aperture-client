import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DESearchBar from './DESearchBar'
import IndividualLayer from "./IndividualLayer";
import {Button, ButtonGroup, Grid, Typography} from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import FolderIcon from '@material-ui/icons/Folder';

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


    if(props.workspace.length !== 0) {
        return (
            <div className={classes.root}>
                <DESearchBar isWorkspace={true} datasets={props.datasets}/>
                <Grid container direction="row" justify="center" alignItems="center">
                    <ButtonGroup>
                        <Button variant="outlined" onClick={() => props.setWorkspace([])} startIcon={<ClearIcon/>}>Clear Workspace</Button>
                        <Button variant="outlined" startIcon={<SaveIcon />}>Save Workspace</Button>
                        <Button variant="outlined" startIcon={<FolderOpenIcon />}>Load Workspace</Button>
                    </ButtonGroup>
                </Grid>
                {props.datasets.map((layer, index) =>
                    <div key={layer}>
                        <IndividualLayer layer={layer} index={index} workspace={props.workspace}
                                         setWorkspace={props.setWorkspace} isWorkspace={true}/>
                    </div>
                )}
            </div>
        );
    }

    else {
        return(
            <div className={classes.root}>
                <Grid container direction="row" justify="center" alignItems="center">
                    <ButtonGroup>
                        <Button variant="outlined" startIcon={<SaveIcon />}>Save Workspace</Button>
                        <Button variant="outlined" startIcon={<FolderOpenIcon />}>Load Workspace</Button>
                    </ButtonGroup>
                </Grid>
            </div>
        )
    }

}