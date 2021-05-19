import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";


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

export default function NewDataExploration(props) {
    const classes = useStyles();

    const [state, setState] = React.useState({
        checkedMe: true,
    });

    const handleCheckboxChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const [value, setValue] = React.useState([12, 66]);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    if(props.constraint.type === "checkbox") {
        return (
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.checkedMe}
                            onChange={handleCheckboxChange}
                            name="checkedMe"
                            color="primary"
                        />
                    }
                    label={props.constraints.title}
                />
            </FormGroup>
        );
    }
    else if (props.constraint.type === "slider") {
        return (
            <div className={classes.root}>
                <Typography className={classes.title} id="range-slider" gutterBottom>
                    {props.constraints.title}
                </Typography>
                <Slider
                    value={value}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                />
            </div>
        );
    }
}