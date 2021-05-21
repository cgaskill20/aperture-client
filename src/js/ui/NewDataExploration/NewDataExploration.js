import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Util from "../../library/apertureUtil";

import DECheckbox from "./DECheckbox"
import DESlider from "./DESlider"
import DESearchBar from './DESearchBar'
import DEAccordion from "./DEAccordion";
import DECard from "./DECard";
import DELayerControls from "./DELayerControls";
import HandleConstraints from "./HandleConstraints"

import {Layers} from "./testingConstants"
import {finalData} from "../../../../index";
import {nested_json_map} from "../../ui/menuGenerator";
// import {layerNames} from "./ResponseParser";

export let layerNames = [];

const printStuff = false;
const dynamicData = true;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    cardSpace: {
        margin: theme.spacing(1),
    },
}));

export default function NewDataExploration() {
    const classes = useStyles();
    layerNames = [];

    for(const obj in nested_json_map) {
        for(const header in nested_json_map[obj]) {
            for(const layer in nested_json_map[obj][header]) {
                const layerLabel = Util.capitalizeString(Util.underScoreToSpace(nested_json_map[obj][header][layer].label ? nested_json_map[obj][header][layer].label : layer));
                layerNames.push(layerLabel);
            }
        }
    }

    if(printStuff) {
        console.log("findalData: " + finalData);
        console.log("nested_json_map: " + nested_json_map);
        console.log("layerNames: " + layerNames);
    }

    if(dynamicData) {
        return (
            <div className={classes.root}>
                <DESearchBar />
                {layerNames.map((layer) =>
                    <div key={layer}>
                        <DEAccordion title={layer}
                                     content={
                                         <box>
                                         </box>
                                     }>
                        </DEAccordion>
                    </div>
                )}
            </div>
        );
    }

    else {
        return (
            <div className={classes.root}>
                <DESearchBar />
                {Layers.map((dataset, index) =>
                    <div key={index}>
                        <DEAccordion title={dataset.datasetName}
                                     content={
                                         <box>
                                             <DELayerControls text={dataset.text} url={dataset.url}/>
                                             <DECard
                                                 content={
                                                     <box>
                                                         {dataset.checkboxes.map((name) =>
                                                             <DECheckbox key={name} title={name}/>
                                                         )}
                                                     </box>
                                                 }>
                                             </DECard>
                                             <DECard
                                                 content={
                                                     <box>
                                                         {dataset.sliders.map((name) =>
                                                             <DESlider key={name} title={name}/>
                                                         )}
                                                     </box>
                                                 }>
                                             </DECard>
                                         </box>
                                     }>
                        </DEAccordion>
                    </div>
                )}
            </div>
        );
    }
}