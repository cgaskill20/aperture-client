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

export function renderIcon(workspace, layer, index, setWorkspace) {
    return (
        <IconButton aria-label="fav" color="primary" onClick={() => setWorkspace(updateWorkspace(workspace, layer, index))}>
            {getIcon(index)}
        </IconButton>
    )
}

function updateWorkspace(workspace, layer, index) {
    let newWorkspace = [...workspace];
    index === -1 ? newWorkspace.push(layer) : newWorkspace.splice(index, 1);
    return newWorkspace;
}

function getIcon(index) {
    return index !== -1 ? <RemoveIcon/> : <AddIcon/>;
}

export function renderConstraintContainer(constraintArray, type) {
    const classes = useStyles();
    if(constraintArray.length > 0) {
        if(type === "slider"){
            return (
                <Grid item>
                    <Paper elevation={3} className={classes.root}>
                        <CardContent>
                            {renderSliders(constraintArray)}
                        </CardContent>
                    </Paper>
                </Grid>
            )
        }
        else if(type === "checkbox") {
            console.log("In the checkboxes conditional!");
            console.log({constraintArray});
            for(const constraint in constraintArray) {
                let thisConstraint = constraintArray[constraint];
                console.log({thisConstraint});
                return (
                    <Grid item>
                        <Paper elevation={3} className={classes.root}>
                            <Typography className={classes.heading}>{constraintArray[constraint]["label"]}</Typography>
                            <CardContent>
                                {renderCheckboxes(constraintArray[constraint]["options"])}
                            </CardContent>
                        </Paper>
                    </Grid>
                )
            }
        }
    }
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