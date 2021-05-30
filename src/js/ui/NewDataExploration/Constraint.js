import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

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

export default function Constraint(props) {
    const classes = useStyles();

    if(props.type === "slider") {
        const min = props.constraint.range[0];
        const max = props.constraint.range[1];
        const step = props.constraint.step ? props.constraint.step : 1;
        const [minMax, setMinMax] = useState([min, max]);
        const handleSliderChange = (event, newValue) => {
            setMinMax(newValue);
        };

        return (
            <div className={classes.root}>
                <Typography className={classes.title} id="range-slider" gutterBottom>
                    {props.constraint.label} &nbsp;
                    <span className={classes.nowrap}>{minMax[0]} - {minMax[1]}</span>
                </Typography>
                <Slider
                    value={minMax}
                    onChange={handleSliderChange}
                    aria-labelledby="range-slider"
                    min={min}
                    max={max}
                    step={step}
                />
            </div>
        );
    }

    else if(props.type === "multiselector") {
        const [state, setState] = useState({
            checked: true,
        });
        const handleCheckboxChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.checked });
        };

        return (
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.checked}
                            onChange={handleCheckboxChange}
                            name="checked"
                            // name={`check-${props.constraint}`}
                            color="primary"
                        />
                    }
                    label={props.constraint}
                />
            </FormGroup>
        );
    }
}