import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import DECheckbox from "./DECheckbox"
import DESlider from "./DESlider"
import DESearchBar from './DESearchBar'
import AllDatasetsTab from "./AllDatasetsTab";
import DECard from "./DECard";
import DELayerControls from "./DELayerControls";
import HandleConstraints from "./HandleConstraints"

import {Layers} from "./testingConstants"
import {finalData} from "./ResponseParser";
import {nested_json_map} from "./ResponseParser";
import {layerNames} from "./ResponseParser";


const printStuff = false;
const dynamicData = false;

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

export default function DEDefaultTab() {
    const classes = useStyles();

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
                        <AllDatasetsTab title={layer}
                                        content={
                                         <box>
                                         </box>
                                     }>
                        </AllDatasetsTab>
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
                        <AllDatasetsTab title={dataset.datasetName}
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
                        </AllDatasetsTab>
                    </div>
                )}
            </div>
        );
    }
}