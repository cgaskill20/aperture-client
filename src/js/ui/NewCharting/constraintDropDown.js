import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
        float: "left",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SimpleSelect(props) {
    const classes = useStyles();
    let [age, setAge] = React.useState('');

    const handleChange = (event) => {
        props.setConstraint(event.target.value);
        setAge(event.target.value);
    };

    if(age.length > 0 & !props.options.includes(age)){
       age = ""
    }


    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Select Constraint</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleChange}
                >
                    {props.options.map((name, index) => <MenuItem key={index} value={name}>{name.split("::")[2]}</MenuItem>)}
                </Select>
            </FormControl>
        </div>

    )
}