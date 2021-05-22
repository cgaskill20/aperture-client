import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import DECheckbox from "./DECheckbox"
import DESlider from "./DESlider"
import DESearchBar from './DESearchBar'
import IndividualLayer from "./IndividualLayer";
import DECard from "./DECard";
import DELayerControls from "./DELayerControls";
import HandleConstraints from "./HandleConstraints"

import {Layers} from "./testingConstants"
import {finalData, nested_json_map, layerNames, layerInfos, layerObjs, layerQueriers,constraintObjs} from "./ResponseParser";
import Util from "../../library/apertureUtil";
import AutoQuery from "../../library/autoQuery";

export let workspaceList = [];

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

export default function AllDatasetsTab() {
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
                {layerNames.map((layer, index) =>
                    <div key={layer}>
                        <IndividualLayer title={layer}
                                         content={
                                         <box>
                                             <DELayerControls text={layerInfos[index]} favorite={layer} />
                                             <DECard
                                                 content={
                                                     <box>
                                                         {
                                                             constraintObjs.map((name) =>
                                                             <DECheckbox key={name} title={constraintObjs[name]}/>
                                                         )}
                                                     </box>
                                                 }>
                                             </DECard>
                                         </box>
                                     }>
                        </IndividualLayer>
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
                        <IndividualLayer title={dataset.datasetName}
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
                        </IndividualLayer>
                    </div>
                )}
            </div>
        );
    }
}