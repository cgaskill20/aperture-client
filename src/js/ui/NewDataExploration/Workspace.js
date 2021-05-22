import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import DECheckbox from "./DECheckbox"
import DESearchBar from './DESearchBar'
import IndividualLayer from "./IndividualLayer";
import DECard from "./DECard";
import DELayerControls from "./DELayerControls";

import {workspaceList} from "./AllDatasetsTab";
import {layerInfos} from "./ResponseParser";

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
                <DESearchBar />
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