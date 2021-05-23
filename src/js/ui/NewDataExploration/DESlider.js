import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: 300,
    },
    title: {
        textAlign: "center",
    },
});

function valuetext(value) {
    return `${value}`;
}

//FIXME include a conditional render for a single-point slider

export default function DESlider(props) {
    const classes = useStyles();
    const [value, setValue] = useState([12, 72]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Typography className={classes.title} id="range-slider" gutterBottom>
                {props.title}
            </Typography>
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
            />
        </div>
    );
}