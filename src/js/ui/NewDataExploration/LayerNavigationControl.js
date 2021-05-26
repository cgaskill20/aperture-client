import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, ButtonGroup, Grid} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import SearchBarSection from "./SearchBarSection";
import UpdateIcon from '@material-ui/icons/Update';

//FIXME Replace hard coded number with this once datasets load immediately
import {layerTitles, numberOfDatasets} from "../TabSystem";

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

export function buildWorkspace(selectedDatasets) {
    let newBooleanWorkspace = [];
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
                        startIcon={<UpdateIcon/>}
                    >Update Workspace</Button>
                    {/*<Button variant="outlined" onClick={() => {*/}
                    {/*    const temp = new Array(19).fill(false);*/}
                    {/*    props.setBooleanWorkspace(temp);*/}
                    {/*}} startIcon={<ClearIcon/>}>Clear Workspace</Button>*/}
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