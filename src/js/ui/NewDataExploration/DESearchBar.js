import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {makeStyles} from "@material-ui/core";
import Util from "../../library/apertureUtil";
import {layerTitles} from "../TabSystem";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: theme.spacing(1),
    },
}));

function getName(layer) {
    return layer["label"] ? layer["label"] : Util.capitalizeString(Util.underScoreToSpace(layer["collection"]));
}

export default function ControllableStates(props) {
    const classes = useStyles();
    const searchText = props.isWorkspace ? "Search Workspace..." : "Search All Datasets...";

    // const [value, setValue] = useState();
    const [inputValue, setInputValue] = useState('');

    // console.log({value});
    console.log({inputValue});

    return (
        <div>
            <Autocomplete
                className={classes.root}
                // value={value}
                // onChange={(event, newValue) => {
                //     setValue(newValue);
                // }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="dataset-browser-searchbar"
                options={layerTitles}
                renderInput={(params) => <TextField {...params} label={searchText} variant="outlined" />}
            />
        </div>
    );
}
