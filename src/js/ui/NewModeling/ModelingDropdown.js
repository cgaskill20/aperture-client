import React, {useState} from 'react';
import FormControl from "@material-ui/core/FormControl";
import {InputLabel, makeStyles, Select} from "@material-ui/core";

export default function ModelingDropdown(props) {
    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            width: "98%"
        },
    }));

    const classes = useStyles();
    const [category, setCategory] = useState(props.options[0]);
    const handleChange = (event) => {
        const newValue = event.target.name;
        setCategory(newValue);
    };

    function getOptions() {
        let allOptions = [];
        props.options.forEach((option, index) => {
            allOptions.push(<option key={index}>{option}</option>)
        })
        return allOptions;
    }

    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">{props.title}</InputLabel>
                <Select
                    native
                    value={category}
                    onChange={handleChange}
                    label={props.title}
                >
                    {getOptions()}
                </Select>
            </FormControl>
        </div>
    );
}