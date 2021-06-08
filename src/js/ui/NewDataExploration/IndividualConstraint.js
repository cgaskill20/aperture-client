import React from 'react';
import {Card, Grid, Typography} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import ConstraintSlider from "./ConstraintSlider";
import ConstraintMultiSelect from "./ConstraintMultiSelect";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular,
        margin: theme.spacing(2),
    },
}));

export default function IndividualConstraint(props) {
    const classes = useStyles();
    if(props.constraint.type === "slider") {
        return (
            <Grid item>
                <Card className={classes.root}>
                    <CardContent>
                        <ConstraintSlider constraint={props.constraint} querier={props.querier} />
                    </CardContent>
                </Card>
            </Grid>
        );
    }

    else if(props.constraint.type === "multiselector") {
        return (
            <Grid item>
                <Card className={classes.root}>
                    <Typography className={classes.heading}>{props.constraint.label}</Typography>
                    <CardContent>
                        <ConstraintMultiSelect constraint={props.constraint} querier={props.querier}/>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}
