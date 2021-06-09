import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {componentIsRendering} from "../TabSystem";
import { DatePicker } from '@material-ui/pickers'

const configs = {
    year: {
        views: ["year"]
    },
    day: {
        views: ["year", "month", "day"],
        format: "MM/DD/yyyy"
    }
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

    if(componentIsRendering) {console.log("|ContraintSlider Rerending|")}
    return (
        <div className={classes.root} id={`constraint-div-${constraint.label}`}>
            <Typography className={classes.title} id={`date-picker-${constraint.label}`} gutterBottom>
                {constraint.label} &nbsp;
                <span className={classes.nowrap}>{minMaxDate[0].toDateString()} - {minMaxDate[1].toDateString()}</span>
            </Typography>
            <DatePicker
                {...config}
                openTo="year"
                label="Min Date"
                value={minMaxDate[0]}
                minDate={epochToDate(min)}
                maxDate={minMaxDate[1]}
                onChange={(e) => {
                    setMinMaxDate([new Date(e.valueOf()), minMaxDate[1]])
                }}
            />
            <DatePicker
                {...config}
                openTo="year"
                label="Max Date"
                value={minMaxDate[1]}
                minDate={minMaxDate[0]}
                maxDate={epochToDate(max)}
                onChange={(e) => {
                    setMinMaxDate([minMaxDate[0], new Date(e.valueOf())])
                }}
            />
        </div>
    );
}