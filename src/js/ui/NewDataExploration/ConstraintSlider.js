import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {Grid} from "@material-ui/core";

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

export default function ConstraintSlider(props) {
    const classes = useStyles();
    const min = props.constraint.range[0];
    const max = props.constraint.range[1];
    const step = props.constraint.step ? props.constraint.step : 1;
    const [minMax, setMinMax] = useState([min, max]);

    return (
        <div className={classes.root} id={`constraint-div-${props.constraint.label}`}>
            <Typography className={classes.title} id="range-slider" gutterBottom>
                {props.constraint.label} &nbsp;
                <span className={classes.nowrap}>{minMax[0]} - {minMax[1]}</span>
            </Typography>
            <Slider
                value={minMax}
                onChange={(event, newValue) => setMinMax(newValue)}
                aria-labelledby="range-slider"
                min={min}
                max={max}
                step={step}
                id={`${props.constraint.label}`}
                name={`${props.constraint.label}`}
            />
        </div>
    );
}