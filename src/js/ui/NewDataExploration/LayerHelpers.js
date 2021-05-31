import React from 'react';
import {Card, Grid, Typography} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import {prettifyJSON} from "./Helpers";
import ConstraintSlider from "./ConstraintSlider";
import ConstraintCheckbox from "./ConstraintCheckbox";

export function getAllLayerConstraints(layer) {
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

export function updateOpenLayers(openLayers, index) {
    let updatedLayers = [...openLayers];
    updatedLayers[index] = !updatedLayers[index];
    return updatedLayers;
}

export function renderIndividualConstraint(constraint, classes) {
    if(constraint.type === "slider") {
        return (
            <Grid item>
                <Card className={classes.root}>
                    <CardContent>
                        <ConstraintSlider constraint={constraint} />
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
            <ConstraintCheckbox constraint={option} />
        )
    )
}