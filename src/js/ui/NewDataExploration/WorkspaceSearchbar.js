import React, {useState} from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import {makeStyles} from "@material-ui/core/styles";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import IconButton from "@material-ui/core/IconButton";
import {componentIsRendering} from "../TabSystem";
import {isGraphable} from "./Helpers";

const icon = <CheckBoxOutlineBlankIcon color="primary" fontSize="small" />;
const checkedIcon = <CheckBoxIcon color="primary" fontSize="small" />;

function findLayerIndex(layerLabel, layerTitles) {
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
    if(isGraphable(layers[index], graphableLayers)) {
        return <IconButton><EqualizerIcon color="primary"/></IconButton>
    }
    return;
}

function updateWorkspace(workspace, index) {
    let newWorkspace = [...workspace];
    newWorkspace[index] = !newWorkspace[index];
    return newWorkspace;
}

function updateOpenLayers(openLayers, index) {
    let newOpenLayers = [...openLayers];
    newOpenLayers[index] = false;
    return newOpenLayers;
}

function clearWorkspaceOrOpenLayers(length) {
    return new Array(length).fill(false);
}

let oldLayers = [];

export default function WorkspaceSearchbar(props) {
    const classes = useStyles();
    console.log({oldLayers})

    if(componentIsRendering) {console.log("|WorkspaceSearchbar Rerending|")}
    return (
        <div>
            <Autocomplete
                className={classes.root}
                multiple
                disableCloseOnSelect
                id="dataset-searchbar"
                options={props.layerTitles}
                onChange={(e, layers) => {
                    console.log({layers})
                    console.log({oldLayers})
                    if(layers.length === 0) {
                        oldLayers = [];
                        props.setWorkspace(clearWorkspaceOrOpenLayers(props.workspace.length));
                        props.setOpenLayers(clearWorkspaceOrOpenLayers(props.workspace.length));
                    }
                    else if(layers.length > oldLayers.length) {
                        const newestLayerSelected = findLayerIndex(layers[layers.length - 1], props.layerTitles);
                        props.setWorkspace(updateWorkspace(props.workspace, newestLayerSelected));
                    }
                    else if(layers.length < oldLayers.length) {
                        let setOfLayers = new Set(layers);
                        const removedLayer = oldLayers.filter(x => !setOfLayers.has(x));
                        const newestLayerSelected = findLayerIndex(removedLayer[0], props.layerTitles);
                        props.setWorkspace(updateWorkspace(props.workspace, newestLayerSelected))
                        props.setOpenLayers(updateOpenLayers(props.openLayers, newestLayerSelected))
                    }
                    oldLayers = layers;
                }}
                renderOption={(option, state) => {
                    const optionIndex = findLayerIndex({option}['option'], props.layerTitles);
                    return (
                        <React.Fragment>
                            <Checkbox
                                icon={icon}
                                color="primary"
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={props.workspace[optionIndex]}
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