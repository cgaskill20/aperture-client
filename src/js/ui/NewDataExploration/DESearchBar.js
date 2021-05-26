import React, {useState} from 'react';
import theme from "../global/GlobalTheme";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import {Checkbox, FormControlLabel} from "@material-ui/core";
import {layerTitles} from "../TabSystem";
import {findIndex, updateWorkspaceAndLayers} from "./IndividualLayerHelpers";

const useStyles = makeStyles({
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
});

export default function DESearchBar(props) {
    const classes = useStyles();

    return (
        <Autocomplete
            id="country-select-demo"
            style={{ width: '100%',
                     margin: theme.spacing(1)}}
            options={layerTitles}
            classes={{option: classes.option}}
            autoHighlight
            renderOption={(option) => (
                <React.Fragment>
                    <FormControlLabel control={
                        <Checkbox
                            checked={props.booleanWorkspace[findIndex({option}['option'])]}
                            onChange={() => updateWorkspaceAndLayers(findIndex({option}['option']), props.booleanWorkspace, props.openLayers, props.setOpenLayers)}
                            name={option['option']}
                            color="primary"
                        />
                    }
                        label={option}
                    />
                </React.Fragment>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Add Datasets..."
                    variant="outlined"
                    inputProps={{
                        ...params.inputProps,
                    }}
                />
            )}
        />
    );
}
