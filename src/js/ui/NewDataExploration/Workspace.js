import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import DECheckbox from "./DECheckbox"
import DESearchBar from './DESearchBar'
import IndividualLayer from "./IndividualLayer";
import DECard from "./DECard";
import DELayerControls from "./DELayerControls";

import {workspaceList} from "./AllDatasetsTab";
import {layerInfos} from "./ResponseParser";

export function updateWorkspace(layer, index) {
    if(!workspaceList.includes(layer)) {
        workspaceList.push(layer);
    }
    else {
        workspaceList.splice(index, 1);
    }
    console.log(workspaceList);
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