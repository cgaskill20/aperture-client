import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import WorkspaceControls from "./WorkspaceControls";
import WorkspaceLayers from "./WorkspaceLayers";
import {prettifyJSON} from "./Helpers";
import AutoMenu from "../../library/autoMenu";

function overwrite() {}
export let defaultConstraints;
export const isComponentRerendering = false;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '98%',
    },
}));

function extractActiveConstraints(layers) {
    let allActiveConstraints = [];
    for(const layer in layers) {
        let theseLayerConstraints = [];
        const individualLayer = layers[layer]
        for(const layerConstraint in individualLayer.constraints) {
            const individualConstraint = individualLayer.constraints[layerConstraint];
            if(!individualConstraint.hide) {
                theseLayerConstraints.push(true);
            }
            else {
                theseLayerConstraints.push(false);
            }
        }
        allActiveConstraints.push(theseLayerConstraints);
    }
    return allActiveConstraints;
}


export default function Workspace() {
    const classes = useStyles();
    const [selectedDatasets, setSelectedDatasets] = useState([]);

    const [layers, setLayers] = useState([]);
    const [activeConstraints, setActiveConstraints] = useState([]);
    const [workspace, setWorkspace] = useState([]);
    const [openLayers, setOpenLayers] = useState([]);
    const [layerTitles, setLayerTitles] = useState([]);
    function extractLayers(data) {
        let tempBoolean = [];
        let tempLayers = [];
        let tempLayerTitles = [];
        for(const layer in data) {
            const thisLayer = data[layer];
            tempLayers.push(data[layer]);
            // const layerName = thisLayer.label ? thisLayer.label : prettifyJSON(thisLayer.collection);
            const layerName = thisLayer?.label ?? prettifyJSON(thisLayer.collection);
            tempLayerTitles.push(layerName);
            tempBoolean.push(false);
        }
        setLayers(tempLayers);
        const extractedActiveConstraints = extractActiveConstraints(tempLayers);
        setActiveConstraints(extractedActiveConstraints);
        defaultConstraints = [...extractedActiveConstraints];
        setWorkspace(tempBoolean);
        setOpenLayers(tempBoolean);
        setLayerTitles(tempLayerTitles);
    }

    const [graphableLayers, setGraphableLayers] = useState([]);
    function extractGraphableLayers(data) {
        let tempGraphableLayers = [];
        for (const layer in data) {
            const thisLayer = data[layer];
            const layerName = thisLayer.collection;
            tempGraphableLayers.push(layerName);
        }
        setGraphableLayers(tempGraphableLayers);
    }

    useEffect(() => {
        $.getJSON("src/json/menumetadata.json", async function (mdata) {
            const finalData = await AutoMenu.build(mdata, overwrite);
            extractLayers(finalData);
        });

        $.getJSON("src/json/graphPriority.json", async function (mdata) {
            const graphableLayers = await AutoMenu.build(mdata, overwrite);
            extractGraphableLayers(graphableLayers);
        });
    }, []);
    
    
    

    if(isComponentRerendering) {console.log("|Workspace Rerending|")}
    return (
        <div className={classes.root}>
            <WorkspaceControls layers={layers} graphableLayers={graphableLayers} layerTitles={layerTitles}
                               openLayers={openLayers} setOpenLayers={setOpenLayers}
                               selectedDatasets={selectedDatasets} setSelectedDatasets={setSelectedDatasets}
                               workspace={workspace} setWorkspace={setWorkspace} />
            <WorkspaceLayers layers={layers} graphableLayers={graphableLayers} layerTitles={layerTitles}
                             openLayers={openLayers} setOpenLayers={setOpenLayers}
                             workspace={workspace} setWorkspace={setWorkspace}
                             activeConstraints={activeConstraints} setActiveConstraints={setActiveConstraints} />
        </div>
    );
}