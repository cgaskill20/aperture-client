import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {makeStyles} from "@material-ui/core/styles";
import {layerNames} from "./ResponseParser";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: theme.spacing(1),
    },
}));

export default function DESearchBar(props) {
    const classes = useStyles();

    const searchText = props.isWorkspace ? "Search Workspace..." : "Search All Datasets...";
    let newLayers = [];
    for(const layer in props.datasets) {
        newLayers.push({title: layerNames[layer]});
    }

    return (
        <div className={classes.root}>
            <Autocomplete
                freeSolo
                id="datasetSearchBar"
                disableClearable
                options={newLayers.map((option) => option.title)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={searchText}
                        margin="normal"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                )}
            />
        </div>
    );
}