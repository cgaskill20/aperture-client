import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, ButtonGroup, Grid} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import WorkspaceSearchbar from "./WorkspaceSearchbar";
import UpdateIcon from '@material-ui/icons/Update';
import {isComponentRerendering} from "./Workspace";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

function buildWorkspace(selectedDatasets, openLayers, setOpenLayers, layerTitles) {
    //FIXME This is some n^2 'ish right here, make it better
    let newWorkspace = [];
    let newOpenLayers = [...openLayers];
    for(let i = 0; i < layerTitles.length; i++) {
        if(selectedDatasets.includes(layerTitles[i])) {
            newWorkspace.push(true);
        }
        else {
            newWorkspace.push(false);
            newOpenLayers[i] = false;
        }
    }
    setOpenLayers(newOpenLayers);
    return newWorkspace;
}

export default function WorkspaceControls(props) {
    const classes = useStyles();
    const [selectedDatasets, setSelectedDatasets] = useState([]);

    if(isComponentRerendering) {console.log("|WorkspaceControls Rerending|")}
    return (
        <div className={classes.root}>
            <Grid container direction="row" justify="center" alignItems="center">
                <ButtonGroup>
                    <Button
                        variant="outlined"
                        onClick={() => props.setWorkspace(buildWorkspace(selectedDatasets, props.openLayers, props.setOpenLayers, props.layerTitles))}
                        startIcon={<UpdateIcon />}>
                        Update Workspace
                    </Button>
                    <Button variant="outlined" startIcon={<SaveIcon />}>Save Workspace</Button>
                    <Button variant="outlined" startIcon={<FolderOpenIcon />}>Load Workspace</Button>
                </ButtonGroup>
            </Grid>
            <WorkspaceSearchbar layers={props.layers} graphableLayers={props.graphableLayers} layerTitles={props.layerTitles}
                                selectedDatasets={selectedDatasets} setSelectedDatasets={setSelectedDatasets}
                                workspace={props.workspace} />
        </div>
    )
}