import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, ButtonGroup, Grid, Paper} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import WorkspaceSearchbar from "./WorkspaceSearchbar";
import {componentIsRendering} from "../TabSystem";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: theme.spacing(2),
        margin: theme.spacing(1),
    },
    buttons: {
        marginBottom:theme.spacing(2),
    },
}));

export default function WorkspaceControls(props) {
    const classes = useStyles();

    if(componentIsRendering) {console.log("|WorkspaceControls Rerending|")}
    return (
        <Paper className={classes.root} elevation={3}>
            <Grid container direction="row" justify="center" alignItems="center">
                <ButtonGroup className={classes.buttons}>
                    <Button variant="outlined" startIcon={<SaveIcon />}>Save Workspace</Button>
                    <Button variant="outlined" startIcon={<FolderOpenIcon />}>Load Workspace</Button>
                </ButtonGroup>
            </Grid>
            <WorkspaceSearchbar layers={props.layers} graphableLayers={props.graphableLayers} layerTitles={props.layerTitles}
                                workspace={props.workspace} setWorkspace={props.setWorkspace} />
        </Paper>
    )
}