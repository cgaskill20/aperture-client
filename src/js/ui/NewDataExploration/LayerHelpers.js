import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, Grid, Typography} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import {layerTitles} from "../TabSystem";
import Constraint from "./Constraint";
import {prettifyJSON} from "./Helpers";

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

export function getAllConstraints(layer) {
    let allConstraints = [];
    for(const layerConstraint in layer.constraints) {
        const constraint = layer.constraints[layerConstraint];
        if(!constraint.label) {
            constraint.label = prettifyJSON(layerConstraint);
        }
        allConstraints.push(constraint);
    }
    return allConstraints;
}

export function createActiveConstraints(allConstraints) {
    let initializeActiveConstraints = [];
    for(const constraint in allConstraints) {
        const thisConstraint = allConstraints[constraint];
        if(!thisConstraint.hide) {
            initializeActiveConstraints.push(true);
        }
        else {
            initializeActiveConstraints.push(false);
        }
    }
    return initializeActiveConstraints;
}

export function createConstraints(activeConstraints, allConstraints) {
    let constraints = [];
    for(let i = 0; i < activeConstraints.length; i++) {
        if(activeConstraints[i]) {
            let temp = renderIndividualConstraint(allConstraints[i], i);
            constraints.push(temp);
        }
    }
    return constraints;
}

export function updateWorkspaceAndLayers(indexInDatasets, booleanWorkspace, openLayers, setOpenLayers) {
    let newBooleanWorkspace = [...booleanWorkspace];
    newBooleanWorkspace[indexInDatasets] = !newBooleanWorkspace[indexInDatasets];
    let newOpenLayers = [...openLayers];
    newOpenLayers[indexInDatasets] = false;
    setOpenLayers(newOpenLayers);
    return newBooleanWorkspace;
}

export function renderIndividualConstraint(constraint, index) {
    const classes = useStyles();

    if(constraint.type === "slider") {
        return (
            <Grid item>
                <Card className={classes.root}>
                    <CardContent>
                        <Constraint constraint={constraint} type={constraint.type} />
                    </CardContent>
                </Card>
            </Grid>
        );
    }

    else if(constraint.type === "multiselector") {
        return (
            <Grid item>
                <Card className={classes.root}>
                    <Typography className={classes.heading}>{constraint.label}</Typography>
                    <CardContent>
                        {renderCheckboxes(constraint.options, constraint.type)}
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}

function renderCheckboxes(constraintOptions, type) {
    let options = [];
    for(const option in constraintOptions) {
        options.push(constraintOptions[option]);
    }
    return (
        options.map((option) =>
            <Constraint constraint={option} type={type} />
        )
    )
}