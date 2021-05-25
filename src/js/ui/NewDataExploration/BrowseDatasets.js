import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LayerNavigationControl from "./LayerNavigationControl";
import {Card} from "@material-ui/core";
import {createSection} from "./DatasetDisplayHelpers";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    section: {
        overflowY: "auto",
        maxHeight: "65vh",
    },
}));

export default function BrowseDatasets(props) {
    const classes = useStyles();
    const layerSection = createSection(props.datasets, props.workspace, props.setWorkspace,
                                       props.openLayers, props.setOpenLayers,
                                       props.booleanWorkspace, props.setBooleanWorkspace);


    return (
        <div className={classes.root}>
            <LayerNavigationControl datasets={props.datasets} setWorkspace={props.setWorkspace} setBooleanWorkspace={props.setBooleanWorkspace}/>
            <Card className={classes.section}>
                {layerSection.map((layer) =>
                    <div>{layer}</div>
                )}
            </Card>
        </div>
    )
}