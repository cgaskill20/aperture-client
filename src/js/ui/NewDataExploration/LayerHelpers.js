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

export function extractActiveConstraints(layer) {
    let activeConstraints = [];
    let allLayerConstraints = [];
    for(const constraint in layer.constraints) {
        activeConstraints.push(!layer.constraints[constraint].hide);
        layer.constraints[constraint].label = layer.constraints[constraint]?.label ?? constraint;
        if(layer.constraints[constraint].label.substring(0, 11) === "properties.") {
            layer.constraints[constraint].label = layer.constraints[constraint].label.substring(11, layer.constraints[constraint].label.length);
        }
        allLayerConstraints.push(layer.constraints[constraint]);
    }
    return [activeConstraints, allLayerConstraints];
}

export function createConstraints(activeConstraints, allLayerConstraints, layerIndex, classes) {
    let constraints = [];
    activeConstraints.forEach((constraint, index) => {
        if(constraint) {
            constraints.push(
                <div key={index}>
                    {renderIndividualConstraint(allLayerConstraints[index], classes, layerIndex)}
                </div>
            );
        }
    });
    return constraints;
}

export function updateOpenLayers(openLayers, index) {
    let updatedLayers = [...openLayers];
    updatedLayers[index] = !updatedLayers[index];
    return updatedLayers;
}

export function renderIndividualConstraint(constraint, classes, layerIndex) {
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
                        {renderCheckboxes(constraint.options, layerIndex)}
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}

function renderCheckboxes(constraintOptions, layerIndex) {
    let options = [];
    for(const option in constraintOptions) {
        options.push(constraintOptions[option]);
    }
    return (
        options.map((option, index) => {
            return(<div key={index}><ConstraintCheckbox constraint={option}/></div>)
        })
    )
}