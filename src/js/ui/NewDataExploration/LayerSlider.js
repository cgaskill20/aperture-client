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

//FIXME include a conditional render for a single-point slider

export default function LayerSlider(props) {
    const classes = useStyles();
    const min = props.constraint["range"][0];
    const max = props.constraint["range"][1];
    const step = props.constraint["step"] ? props.constraint["step"] : 1;
    const [minMax, setMinMax] = useState([min, max]);

    const handleChange = (event, newValue) => {
        setMinMax(newValue);
    };

    // let constraintLabel;
    // if(props.constraint["label"]) {
    //     constraintLabel = props.constraint["label"];
    // }
    // else {
    //     constraintLabel = props.constraint;
    // }

    return (
        <div className={classes.root}>
            <Typography className={classes.title} id="range-slider" gutterBottom>
                {props.constraint["label"]} &nbsp;
                <span className={classes.nowrap}>{minMax[0]} - {minMax[1]}</span>
            </Typography>
            <Slider
                value={minMax}
                onChange={handleChange}
                aria-labelledby="range-slider"
                min={min}
                max={max}
                step={step}
            />
        </div>
    );
}