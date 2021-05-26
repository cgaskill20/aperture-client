import React, {useState} from 'react';
import {TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {layerTitles} from "../TabSystem";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: theme.spacing(1),
    },
}));

function alert() {
    console.log("Something happened!")
}

export default function CustomSearchbar(props) {
    const classes = useStyles();
    const [input, setInput] = useState();

    return (
        <TextField
            className={classes.root}
            variant="outlined"
            label="Search Datasets..."
            autoComplete="on"
            onChange={alert}
        >

        </TextField>
    );
}
