import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, ButtonGroup, Grid} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import SearchBarSection from "./SearchBarSection";
import UpdateIcon from '@material-ui/icons/Update';
import {layerTitles} from "../TabSystem";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

function buildWorkspace(selectedDatasets) {
    let newBooleanWorkspace = [];
    //FIXME This is some n^2 'ish right here, make it better
    for(let i = 0; i < layerTitles.length; i++) {
        if(selectedDatasets.includes(layerTitles[i])) {
            newBooleanWorkspace.push(true);
        }
        else {
            newBooleanWorkspace.push(false);
        }
    }
    return newBooleanWorkspace;
}

export default function LayerNavigationControl(props) {
    const classes = useStyles();
    const [selectedDatasets, setSelectedDatasets] = useState([]);

    return (
        <div className={classes.root}>
            <Grid container direction="row" justify="center" alignItems="center">
                <ButtonGroup>
                    <Button
                        variant="outlined"
                        onClick={() => props.setBooleanWorkspace(buildWorkspace(selectedDatasets))}
                        startIcon={<UpdateIcon/>}>
                        Update Workspace
                    </Button>
                    <Button variant="outlined" startIcon={<SaveIcon />}>Save Workspace</Button>
                    <Button variant="outlined" startIcon={<FolderOpenIcon />}>Load Workspace</Button>
                </ButtonGroup>
            </Grid>
            <SearchBarSection selectedDatasets={selectedDatasets} setSelectedDatasets={setSelectedDatasets}
                              openLayers={props.openLayers} setOpenLayers={props.setOpenLayers}
                              booleanWorkspace={props.booleanWorkspace} setBooleanWorkspace={props.setBooleanWorkspace}/>
        </div>
    )
}