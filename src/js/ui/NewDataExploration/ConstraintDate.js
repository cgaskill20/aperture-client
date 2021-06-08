import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {componentIsRendering} from "../TabSystem";
import { DatePicker } from '@material-ui/pickers'

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

export default function ConstraintDate({constraint, querier}) {
    const classes = useStyles();
    const {isDate} = constraint;
    const min = constraint.range[0];
    const max = constraint.range[1];
    const step = constraint.step ? constraint.step : 1;
    const [minMax, setMinMax] = useState([min, max]);
    const [minMaxCommited, setMinMaxCommited] = useState([min, max]);

    const numToLabel = (num) => {
        if(isDate){
            return new Date(num).toUTCString();
        }
        return num;
    }
    
    useEffect(() => {
        querier.updateConstraint(constraint.name, minMaxCommited);
    }, [minMaxCommited]);

    useEffect(() => {
        querier.constraintSetActive(constraint.name, true);
        return () => {
            querier.constraintSetActive(constraint.name, false);
        }
    }, []);

    if(componentIsRendering) {console.log("|ContraintSlider Rerending|")}
    return (
        <div className={classes.root} id={`constraint-div-${constraint.label}`}>
            <Typography className={classes.title} id={`range-slider-${constraint.label}`} gutterBottom>
                {constraint.label} &nbsp;
                <span className={classes.nowrap}>{numToLabel(minMax[0])} - {numToLabel(minMax[1])}</span>
            </Typography>
            <Slider
                value={minMax}
                onChange={(event, newValue) => setMinMax(newValue)}
                onChangeCommitted={(event, newValue) => setMinMaxCommited(newValue)}
                aria-labelledby={`range-slider-${constraint.label}`}
                min={min}
                max={max}
                step={step}
                id={`${constraint.label}`}
                name={`${constraint.label}`}
            />
        </div>
    );
}