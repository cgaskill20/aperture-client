import React from 'react';
import {Card, Grid, Typography} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import ConstraintSlider from "./ConstraintSlider";
import ConstraintDate from "./ConstraintDate";
import ConstraintMultiSelect from "./ConstraintMultiSelect";

export default function IndividualConstraint(props) {
    if(props.constraint.type === "slider") {
        return (
            <Grid item>
                <Card className={props.classes.root}>
                    <CardContent>
                        {!props.constraint.isDate ? 
                            <ConstraintSlider constraint={props.constraint} querier={props.querier} /> :
                            <ConstraintDate constraint={props.constraint} querier={props.querier} />
                        }
                    </CardContent>
                </Card>
            </Grid>
        );
    }

    else if(props.constraint.type === "multiselector") {
        return (
            <Grid item>
                <Card className={props.classes.root}>
                    <Typography className={props.classes.heading}>{props.constraint.label}</Typography>
                    <CardContent>
                        <ConstraintMultiSelect constraint={props.constraint} querier={props.querier}/>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}
