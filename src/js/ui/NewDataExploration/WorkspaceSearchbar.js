import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import {makeStyles} from "@material-ui/core/styles";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import IconButton from "@material-ui/core/IconButton";

const icon = <CheckBoxOutlineBlankIcon color="primary" fontSize="small" />;
const checkedIcon = <CheckBoxIcon color="primary" fontSize="small" />;

function findIndex(layerLabel, layerTitles) {
    for(let i = 0; i < layerTitles.length; i++) {
        if(layerTitles[i] === layerLabel) {
            return i;
        }
    }
    return -1;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: theme.spacing(1),
    },
    graphIcon: {
        float: 'right',
    },
}));

function graphIcon(index, layers, graphableLayers) {
    const collectionName = layers[index].collection;
    if(graphableLayers.includes(collectionName)) {
        return <IconButton><EqualizerIcon color="primary"/></IconButton>
    }
    return;
}

export default function WorkspaceSearchbar(props) {
    const classes = useStyles();
    return (
        <div>
            <Autocomplete
                className={classes.root}
                multiple
                disableCloseOnSelect
                id="dataset-searchbar"
                options={props.layerTitles}
                onChange={(e, dataset) => {
                    props.setSelectedDatasets(dataset);
                }}
                renderOption={(option, state) => {
                    const selectDatasetIndex = props.selectedDatasets.findIndex(
                        dataset => dataset.toLowerCase() === "all"
                    , props.layerTitles);
                    if (selectDatasetIndex > -1) {
                        state.selected = true;
                    }
                    const optionIndex = findIndex({option}['option'], props.layerTitles);
                    return (
                        <React.Fragment>
                            <Checkbox
                                id={`searchbar-checkbox-${optionIndex}`}
                                name={`searchbar-checkbox-${optionIndex}`}
                                icon={icon}
                                color="primary"
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={state.selected || props.booleanWorkspace[optionIndex]}
                            />
                            {option}
                            <span className={classes.graphIcon}>{graphIcon(optionIndex, props.layers, props.graphableLayers)}</span>
                        </React.Fragment>
                    );
                }}
                renderInput={params => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Browse Datasets..."
                    />
                )}
            />
        </div>
    );
}