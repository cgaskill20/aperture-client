import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {datasetList} from "./datasetList"
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: theme.spacing(1),
    },
}));

export default function DESearchBar() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Autocomplete
                freeSolo
                id="datasetSearchBar"
                disableClearable
                options={datasetList.map((option) => option.title)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search Datasets"
                        margin="normal"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                )}
            />
        </div>
    );
}