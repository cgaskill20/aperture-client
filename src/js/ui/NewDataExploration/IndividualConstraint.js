import React from 'react';
import {Grid, Typography} from "@material-ui/core";
import ConstraintSlider from "./ConstraintSlider";
import ConstraintMultiSelect from "./ConstraintMultiSelect";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: theme.spacing(2),
        marginTop: theme.spacing(1),
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular,
        marginBottom: theme.spacing(1),
    },
}));

export default function IndividualConstraint(props) {
    const classes = useStyles();
    if(props.constraint.type === "slider") {
        return (
            <Grid item className={classes.root}>
                <ConstraintSlider constraint={props.constraint} querier={props.querier} />
            </Grid>
        );
    }

    else if(props.constraint.type === "multiselector") {
        return (
            <Grid item className={classes.root}>
                <Typography className={classes.heading}>{props.constraint.label}</Typography>
                <ConstraintMultiSelect constraint={props.constraint} querier={props.querier}/>
            </Grid>
        );
    }
}
