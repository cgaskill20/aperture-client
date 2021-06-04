import React from 'react';
import {Card, Grid, Typography} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import {prettifyJSON} from "./Helpers";
import ConstraintSlider from "./ConstraintSlider";
import ConstraintMultiSelect from "./ConstraintMultiSelect";

export function extractLayerConstraints(layer) {
    let defaultLayerConstraints = [];
    let allLayerConstraints = [];
    for(const constraint in layer.constraints) {
        defaultLayerConstraints.push(!layer.constraints[constraint].hide);
        layer.constraints[constraint].label = layer.constraints[constraint]?.label ?? constraint;
        layer.constraints[constraint].name = constraint;
        allLayerConstraints.push(layer.constraints[constraint]);
    }
    return [defaultLayerConstraints, allLayerConstraints];
}

export function createConstraints(activeLayerConstraints, allLayerConstraints, classes, querier) {
    let constraints = [];
    activeLayerConstraints.forEach((constraint, index) => {
        if(constraint) {
            constraints.push(
                <div key={index}>
                    {renderIndividualConstraint(allLayerConstraints[index], classes, querier)}
                </div>
            );
        }
    });
    return constraints;
}

export function renderIndividualConstraint(constraint, classes, querier) {
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
