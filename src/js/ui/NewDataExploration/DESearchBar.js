

import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Checkbox, FormControlLabel, ListItemText, makeStyles, MenuItem} from "@material-ui/core";
import Util from "../../library/apertureUtil";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: theme.spacing(1),
    },
}));

function getName(layer) {
    return layer["label"] ? layer["label"] : Util.capitalizeString(Util.underScoreToSpace(layer["collection"]))
}

export default function ControllableStates(props) {
    const classes = useStyles();
    const searchText = props.isWorkspace ? "Search Workspace..." : "Search All Datasets...";
    const [check, setCheck] = useState(false);

    let options = [];
    for(const layer in props.datasets) {
        const layerLabel = props.datasets[layer]["label"] ? props.datasets[layer]["label"] : Util.capitalizeString(Util.underScoreToSpace(props.datasets[layer]["collection"]));
        options.push(layerLabel);
    }

    // props.datasets.map((layer) =>
    //     options.push(
    //         <FormControlLabel
    //             control={<Checkbox checked={check} onChange={() => setCheck(!check)} name={() => {getName(props.datasets[layer])}} />}
    //             label={() => {getName(props.datasets[layer])}}
    //         />
    //     )
    // )
    // console.log({options});

    // for(const layer in props.datasets) {
    //     const layerLabel = props.datasets[layer]["label"] ? props.datasets[layer]["label"] : Util.capitalizeString(Util.underScoreToSpace(props.datasets[layer]["collection"]));
    //     options.push(
    //         <FormControlLabel
    //             control={<Checkbox checked={check} onChange={() => setCheck(!check)} name="check" />}
    //             label={layerLabel}
    //         />
    //     );
    // }

    const [value, setValue] = useState();
    const [inputValue, setInputValue] = useState('');

    return (
        <div>
            <Autocomplete
                className={classes.root}
                // value={value}
                // onClick={() => props.setWorkspace(updateWorkspace(props.workspace, value, getIndex(props.workspace, inputValue)))}
                // onChange={(event, newValue) => {
                //     setValue(newValue);
                // }}
                // inputValue={inputValue}
                // onInputChange={(event, newInputValue) => {
                //     setInputValue(newInputValue);
                // }}
                id="controllable-states-demo"
                // options={options.map((options) => options.layerLabel)}
                options={options}
                renderInput={(params) => <TextField {...params} label={searchText} variant="outlined" />}
            />
        </div>
    );
}
