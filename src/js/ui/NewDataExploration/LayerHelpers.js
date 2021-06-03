import React from 'react';
import {Card, Grid, Typography} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import {prettifyJSON} from "./Helpers";
import ConstraintSlider from "./ConstraintSlider";
import ConstraintMultiSelect from "./ConstraintMultiSelect";

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
        layer.constraints[constraint].name = constraint;
        if(layer.constraints[constraint].label.substring(0, 11) === "properties.") {
            layer.constraints[constraint].label = layer.constraints[constraint].label.substring(11, layer.constraints[constraint].label.length);
        }
        allLayerConstraints.push(layer.constraints[constraint]);
    }
    return [activeConstraints, allLayerConstraints];
}

export function createConstraints(activeConstraints, allLayerConstraints, layerIndex, classes, querier) {
    let constraints = [];
    activeConstraints.forEach((constraint, index) => {
        if(constraint) {
            constraints.push(
                <div key={index}>
                    {renderIndividualConstraint(allLayerConstraints[index], classes, layerIndex, querier)}
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

export function renderIndividualConstraint(constraint, classes, layerIndex, querier) {
    if(constraint.type === "slider") {
        return (
            <Grid item>
                <Card className={classes.root}>
                    <CardContent>
                        <ConstraintSlider constraint={constraint} querier={querier} />
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
                        <ConstraintMultiSelect constraint={constraint} querier={querier}/>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}
