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
    const layerSection = createSection(props.datasets, props.workspace, props.setWorkspace);


    return (
        <div className={classes.root}>
            <LayerNavigationControl datasets={props.datasets} setWorkspace={props.setWorkspace}/>
            <Card className={classes.section}>
                {layerSection.map((layer) =>
                    <div>{layer}</div>
                )}
            </Card>
            {/*{props.datasets.map((layer) =>*/}
            {/*    <div key={layer}>*/}
            {/*        <IndividualLayer layer={layer} workspace={props.workspace}*/}
            {/*                         setWorkspace={props.setWorkspace}/>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    )
}