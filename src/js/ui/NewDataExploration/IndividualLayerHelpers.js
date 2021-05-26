import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, Grid, IconButton, Paper, Typography} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CardContent from "@material-ui/core/CardContent";
import DECheckbox from "./DECheckbox";
import DESlider from "./DESlider";
import {layerTitles} from "../TabSystem";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(1),
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular,
        margin: theme.spacing(2),
    },
}));

function findIndex(layerLabel) {
    for(let i = 0; i < layerTitles.length; i++) {
        if(layerTitles[i] === layerLabel) {
            return i;
        }
    }
    return -1;
}

export function renderIcon(layerLabel, openLayers, setOpenLayers, booleanWorkspace, setBooleanWorkspace) {
    const indexInDatasets = findIndex(layerLabel);
    return (
        <IconButton aria-label="fav" color="primary" onClick={() => {
            setBooleanWorkspace(updateWorkspaceAndLayers(indexInDatasets, booleanWorkspace, openLayers, setOpenLayers));
        }}>
            {getIcon(indexInDatasets, booleanWorkspace)}
        </IconButton>
    )
}

function updateWorkspaceAndLayers(indexInDatasets, booleanWorkspace, openLayers, setOpenLayers) {
    let newBooleanWorkspace = [...booleanWorkspace];
    newBooleanWorkspace[indexInDatasets] = !newBooleanWorkspace[indexInDatasets];
    let newOpenLayers = [...openLayers];
    newOpenLayers[indexInDatasets] = false;
    setOpenLayers(newOpenLayers);
    return newBooleanWorkspace;
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
                    <Card className={classes.root}>
                        <CardContent>
                            {renderSliders(constraintArray)}
                        </CardContent>
                    </Card>
                </Grid>
            );
        }
        else if(type === "checkbox") {
            for(const constraint in constraintArray) {
                renderedSections.push(
                     <Grid item>
                        <Card className={classes.root}>
                            <Typography className={classes.heading}>{constraintArray[constraint]["label"]}</Typography>
                            <CardContent>
                                {renderCheckboxes(constraintArray[constraint]["options"])}
                            </CardContent>
                        </Card>
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