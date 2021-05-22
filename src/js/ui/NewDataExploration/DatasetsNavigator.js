import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import DESearchBar from './DESearchBar'
import IndividualLayer from "./IndividualLayer";
import DECard from "./DECard";
import DELayerControls from "./DELayerControls";

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

export default function DatasetsNavigator(props) {
    const classes = useStyles();

        return (
            <div className={classes.root}>
                <DESearchBar isWorkspace={props.isWorkspace} datasets={props.datasets}/>
                {props.datasets.map((layer, index) =>
                    <div key={layer}>
                        <IndividualLayer title={layer} index={index} setWorkspace={props.setWorkspace} workspace={props.workspace}
                                         content={
                                             <box>
                                                 <DELayerControls text={layerInfos[index]} layer={layer} workspace={props.workspace} setWorkspace={props.setWorkspace}/>
                                                 <DECard
                                                     content={
                                                         <box>
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