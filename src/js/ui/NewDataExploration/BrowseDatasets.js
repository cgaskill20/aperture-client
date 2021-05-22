import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DESearchBar from './DESearchBar'
import IndividualLayer from "./IndividualLayer";
import {Button, Grid} from "@material-ui/core";

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

export default function BrowseDatasets(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <DESearchBar isWorkspace={props.isWorkspace} datasets={props.datasets} />
            <Grid container direction="row" justify="center" alignItems="center">
                <Button variant="outlined" onClick={() => props.setWorkspace(props.datasets)}>Add All Datasets To Workspace</Button>
            </Grid>
            {props.datasets.map((layer, index) =>
                <div key={layer}>
                    <IndividualLayer layer={layer} index={index} workspace={props.workspace}
                                     setWorkspace={props.setWorkspace}/>
                </div>
            )}
        </div>
    )
}