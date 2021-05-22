import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import DESearchBar from './DESearchBar'
import IndividualLayer from "./IndividualLayer";


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
                        <IndividualLayer layer={layer} index={index} workspace={props.workspace} setWorkspace={props.setWorkspace}/>
                    </div>
                )}
            </div>
        );

}