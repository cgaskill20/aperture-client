import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import {layerTitles} from "../TabSystem";
import {makeStyles} from "@material-ui/core/styles";
import {findIndex} from "./LayerHelpers";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import IconButton from "@material-ui/core/IconButton";

const icon = <CheckBoxOutlineBlankIcon color="primary" fontSize="small" />;
const checkedIcon = <CheckBoxIcon color="primary" fontSize="small" />;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: theme.spacing(1),
    },
    graphIcon: {
        float: 'right',
    },
}));

function graphIcon(layerLabel, layers, graphableLayers) {
    const index = findIndex(layerLabel);
    const collectionName = layers[index].collection;
    if(graphableLayers.includes(collectionName)) {
        return <IconButton><EqualizerIcon color="primary"/></IconButton>
    }
    return;
}

//FIXME Issue when navigating back from the Modeling Tab. Datasets are displayed as Layers and are checked BUT are not in the Searchbar's text field. Causes an issue when removing/adding.
export default function WorkspaceSearchbar(props) {
    const classes = useStyles();
    return (
        <div>
            <Autocomplete
                className={classes.root}
                multiple
                disableCloseOnSelect
                id="dataset-searchbar"
                options={layerTitles}
                onChange={(e, dataset) => {
                    props.setSelectedDatasets(dataset);
                }}
                renderOption={(option, state) => {
                    const selectDatasetIndex = props.selectedDatasets.findIndex(
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
                                checked={state.selected || props.booleanWorkspace[findIndex({option}['option'])]}
                            />
                            {option}
                            <span className={classes.graphIcon}>{graphIcon({option}['option'], props.layers, props.graphableLayers)}</span>
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