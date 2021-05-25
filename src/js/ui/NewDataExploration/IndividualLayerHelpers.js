import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, Grid, IconButton, Paper, Typography} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CardContent from "@material-ui/core/CardContent";
import DECheckbox from "./DECheckbox";
import DESlider from "./DESlider";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: theme.spacing(1),
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular,
        margin: theme.spacing(2),
    },
}));

export function findIndex(workspace, layer) {
    for(let i = 0; i < workspace.length; i++) {
        if(workspace[i] === layer) {
            return i;
        }
    }
    return -1;
}

export function renderIcon(workspace, layer, index, setWorkspace, openLayers, setOpenLayers, booleanWorkspace, setBooleanWorkspace, datasets) {
    const layerIndex = findIndex(datasets, layer);
    return (
        <IconButton aria-label="fav" color="primary" onClick={() => {
            setWorkspace(updateWorkspace(workspace, layer, index, openLayers, setOpenLayers));
            setBooleanWorkspace(updateBooleanWorkspace(layer, layerIndex, booleanWorkspace, openLayers, setOpenLayers));
        }}>
            {getIcon(layerIndex, booleanWorkspace)}
        </IconButton>
    )
}

export function updateWorkspace(workspace, layer, index, openLayers, setOpenLayers) {
    let newWorkspace = [...workspace];
    if (index === -1) {
        newWorkspace.push(layer)
    }
    else {
        newWorkspace.splice(index, 1);
        let newOpenLayers = [...openLayers];
        newOpenLayers[index] = false;
        setOpenLayers(newOpenLayers);
    }
    return newWorkspace;
}

export function updateBooleanWorkspace(layer, index, booleanWorkspace, openLayers, setOpenLayers) {
    let newWorkspace = [...booleanWorkspace];
    newWorkspace[index] = !newWorkspace[index];
    let newOpenLayers = [...openLayers];
    newOpenLayers[index] = false;
    setOpenLayers(newOpenLayers);
    return newWorkspace;
}

function getIcon(index, booleanWorkspace) {
    return booleanWorkspace[index] ? <RemoveIcon/> : <AddIcon/>;
}

export function renderConstraintContainer(constraintArray, type) {
    const classes = useStyles();
    let renderedSections = [];
    if(constraintArray.length > 0) {
        if(type === "slider"){
            renderedSections.push(
                <Grid item>
                    <Paper elevation={3} className={classes.root}>
                        <CardContent>
                            {renderSliders(constraintArray)}
                        </CardContent>
                    </Paper>
                </Grid>
            );
        }
        else if(type === "checkbox") {
            for(const constraint in constraintArray) {
                renderedSections.push(
                     <Grid item>
                        <Paper elevation={3} className={classes.root}>
                            <Typography className={classes.heading}>{constraintArray[constraint]["label"]}</Typography>
                            <CardContent>
                                {renderCheckboxes(constraintArray[constraint]["options"])}
                            </CardContent>
                        </Paper>
                    </Grid>
                );
            }
        }
    }
    return renderedSections;
}

function renderSliders(constraintArray) {
    return (
        constraintArray.map((constraint) =>
            <DESlider constraint={constraint} />
        )
    )
}

function renderCheckboxes(constraintOptions) {
    let options = [];
    for(const option in constraintOptions) {
        options.push(constraintOptions[option]);
    }
    return (
        options.map((option) =>
            <DECheckbox constraint={option}/>
        )
    )
}