import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {componentIsRendering} from "../TabSystem";
import Grid from "@material-ui/core/Grid";
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';

const configs = {
    year: {
        views: ["year"]
    },
    day: {
        views: ["year", "month", "day"],
        format: "MM/DD/yyyy"
    },
    "30min": {
        views: ["year", "month", "day"],
        format: "MM/DD/yyyy"
    },
}


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    title: {
        textAlign: "center",
    },
    nowrap: {
        whiteSpace: "nowrap",
    },
    halfSize: {
        width: '50%',
    },
});

const epochToDate = (epoch) => {
    const refrenceTime = new Date(epoch);
    return new Date(epoch + refrenceTime.getTimezoneOffset() * 60000);
}

const dateToEpoch = (date) => {
    return date.valueOf() - date.getTimezoneOffset() * 60000;
}

export default function ConstraintDate({constraint, querier}) {
    const classes = useStyles();
    const min = constraint.range[0];
    const max = constraint.range[1];
    const [minMaxDate, setMinMaxDate] = useState([epochToDate(min), epochToDate(max)]);
    const config = configs[constraint.step];

    useEffect(() => {
        const minMaxCommited = [dateToEpoch(minMaxDate[0]), dateToEpoch(minMaxDate[1])]
        querier.updateConstraint(constraint.name, minMaxCommited);
    }, [minMaxDate]);

    useEffect(() => {
        querier.constraintSetActive(constraint.name, true);
        return () => {
            querier.constraintSetActive(constraint.name, false);
        }
    }, []);

    function handleUpdate(e, setMin) {
        setMin ? setMinMaxDate([new Date(e.valueOf()), minMaxDate[1]]) :
            setMinMaxDate([minMaxDate[0], new Date(e.valueOf())]);
    }

    function renderTime() {
        if(constraint.step === "30min") {
            return (
                <div>
                    <br/>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item className={classes.halfSize}>
                            <KeyboardTimePicker
                                label="Min Time"
                                value={minMaxDate[0]}
                                onChange={(e) => {
                                    handleUpdate(e, true)
                                }}
                            />
                        </Grid>
                        <Grid item className={classes.halfSize}>
                            <KeyboardTimePicker
                                label="Max Time"
                                value={minMaxDate[1]}
                                onChange={(e) => {
                                    handleUpdate(e, false)
                                }}
                            />
                        </Grid>
                    </Grid>
                </div>
            );
        }
    }

    if(componentIsRendering) {console.log("|ContraintSlider Rerending|")}
    return (
        <div className={classes.root} id={`constraint-div-${constraint.label}`}>
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item>
                    <Typography className={classes.title} id={`date-picker-${constraint.label}`} gutterBottom>
                        <span className={classes.nowrap}>{minMaxDate[0].toDateString()} - {minMaxDate[1].toDateString()}</span>
                    </Typography>
                </Grid>
            </Grid>
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item className={classes.halfSize}>
                    <KeyboardDatePicker
                        margin="normal"
                        label="Min Date"
                        format="MM/DD/yyyy"
                        value={minMaxDate[0]}
                        minDate={epochToDate(min)}
                        maxDate={minMaxDate[1]}
                        onChange={(e) => {
                            handleUpdate(e, true)
                        }}
                    />
            </Grid>
                <Grid item className={classes.halfSize}>
                    <KeyboardDatePicker
                        margin="normal"
                        label="Max Date"
                        format="MM/DD/yyyy"
                        value={minMaxDate[1]}
                        minDate={minMaxDate[0]}
                        maxDate={epochToDate(max)}
                        onChange={(e) => {
                            handleUpdate(e, false)
                        }}
                    />
                </Grid>
            </Grid>
            {renderTime()}
         </div>
    );
}