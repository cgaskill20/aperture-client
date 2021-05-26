import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import {layerTitles} from "../TabSystem";
import theme from "../global/GlobalTheme";
import {Button} from "@material-ui/core";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function buildWorkspace(selectedDatasets) {
    let newBooleanWorkspace = [];
    for(let i = 0; i < layerTitles.length; i++) {
        if(selectedDatasets.includes(layerTitles[i])) {
            newBooleanWorkspace.push(true);
        }
        else {
            newBooleanWorkspace.push(false);
        }
    }
    return newBooleanWorkspace;
}

export default function DESearchbar(props) {
    const [selectedDatasets, setSelectedDatasets] = useState([]);
    return (
        <div>
            <Button
                variant="outlined"
                style={{width: '25%'}}
                onClick={() => props.setBooleanWorkspace(buildWorkspace(selectedDatasets))}
            >
                Add
            </Button>
            <Autocomplete
                multiple
                disableCloseOnSelect
                id="dataset-searchbar"
                options={layerTitles}
                onChange={(e, dataset) => {
                    setSelectedDatasets(dataset);
                }}
                renderOption={(option, state) => {
                    const selectDatasetIndex = selectedDatasets.findIndex(
                        dataset => dataset.toLowerCase() === "all"
                    );
                    if (selectDatasetIndex > -1) {
                        state.selected = true;
                    }
                    return (
                        <React.Fragment>
                            <Checkbox
                                icon={icon}
                                color="primary"
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={state.selected}
                            />
                            {option}
                        </React.Fragment>
                    );
                }}
                style={{ width: '75%', margin: theme.spacing(1) }}
                renderInput={params => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Add Datasets..."
                    />
                )}
            />
        </div>
    );
}