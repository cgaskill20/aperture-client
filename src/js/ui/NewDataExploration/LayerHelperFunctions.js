import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, Grid, Typography} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import ConstraintCheckbox from "./ConstraintCheckbox";
import ConstraintSlider from "./ConstraintSlider";
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

export function findIndex(layerLabel) {
    for(let i = 0; i < layerTitles.length; i++) {
        if(layerTitles[i] === layerLabel) {
            return i;
        }
    }
    return -1;
}

export function updateWorkspaceAndLayers(indexInDatasets, booleanWorkspace, openLayers, setOpenLayers) {
    let newBooleanWorkspace = [...booleanWorkspace];
    newBooleanWorkspace[indexInDatasets] = !newBooleanWorkspace[indexInDatasets];
    let newOpenLayers = [...openLayers];
    newOpenLayers[indexInDatasets] = false;
    setOpenLayers(newOpenLayers);
    return newBooleanWorkspace;
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
            <ConstraintSlider constraint={constraint} />
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
            <ConstraintCheckbox constraint={option} />
        )
    )
}