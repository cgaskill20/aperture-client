import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import DECheckbox from "./DECheckbox"
import DESearchBar from './DESearchBar'
import IndividualLayer from "./IndividualLayer";
import DECard from "./DECard";
import DELayerControls from "./DELayerControls";

import {layerInfos} from "./ResponseParser";
import {Typography} from "@material-ui/core";


export let workspaceList = [];

export function updateWorkspace(layer, index) {
    if(!workspaceList.includes(layer)) {
        workspaceList.push(layer);
    }
    else {
        workspaceList.splice(index, 1);
    }
}

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

export default function Workspace() {
    const classes = useStyles();


    if(workspaceList.length !== 0) {
        return (
            <div className={classes.root}>
                <DESearchBar workspace={true} />
                {workspaceList.map((layer, index) =>
                    <div key={layer}>
                        <IndividualLayer title={layer}
                                         content={
                                             <box>
                                                 <DELayerControls text={layerInfos[index]} favorite={layer} currentlyFav={true} index={index}/>
                                             </box>
                                         }>
                        </IndividualLayer>
                    </div>
                )}
            </div>
        );
    }

    else {
        return(
            <Typography>
                Add some datasets to your Workspace from the All Datasets tab
            </Typography>
        )
    }

}