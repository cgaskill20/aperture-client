import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import {layerTitles} from "../TabSystem";
import theme from "../global/GlobalTheme";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags() {
    const [selectedDataset, setSelectedDataset] = useState([]);
    return (
        <Autocomplete
            multiple
            disableCloseOnSelect
            id="dataset-searchbar"
            options={layerTitles}
            onChange={(e, dataset) => {
                setSelectedDataset(dataset);
            }}
            renderOption={(option, state) => {
                const selectDatasetIndex = selectedDataset.findIndex(
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
            style={{ width: '100%', margin: theme.spacing(1) }}
            renderInput={params => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="Add Datasets..."
                />
            )}
        />
    );
}