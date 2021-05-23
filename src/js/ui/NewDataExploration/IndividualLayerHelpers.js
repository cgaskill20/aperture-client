import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, IconButton, Paper} from "@material-ui/core";
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
}));

export function findIndex(workspace, layer) {
    for(let i = 0; i < workspace.length; i++) {
        if(workspace[i] === layer) {
            return i;
        }
    }
    return -1;
}

function updateWorkspace(workspace, layer, index) {
    let newWorkspace = [...workspace];
    index === -1 ? newWorkspace.push(layer) : newWorkspace.splice(index, 1);
    return newWorkspace;
}

function getIcon(index) {
    return index !== -1 ? <RemoveIcon/> : <AddIcon/>;
}

export function renderIcon(workspace, layer, index, setWorkspace) {
    return (
        <IconButton aria-label="fav" color="primary" onClick={() => setWorkspace(updateWorkspace(workspace, layer, index))}>
            {getIcon(index)}
        </IconButton>
    )
}

export function renderConstraintContainer(constraintArray, type) {
    const classes = useStyles();
    if(constraintArray.length > 0) {
        return (
            <Grid item>
                <Paper elevation={3} className={classes.root}>
                    <CardContent>
                        {renderConstraints(constraintArray, type)}
                    </CardContent>
                </Paper>
            </Grid>
        )
    }
}

function renderConstraints(constraintArray, type) {
    if(type === "slider") {
        return renderSliders(constraintArray);
    }
    else if(type === "checkbox") {
        return renderCheckboxes(constraintArray);
    }
}

function renderSliders(constraintArray) {
    return (
        constraintArray.map((constraint) =>
            <div key={constraint}>
                <DESlider constraint={constraint} />
            </div>
        )
    )
}

function renderCheckboxes(constraintArray) {
    return (
        constraintArray.map((constraint) =>
            <div key={constraint}>
                <DECheckbox constraint={constraint} />
            </div>
        )
    )
}