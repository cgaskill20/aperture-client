import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LayerNavigationControl from "./LayerNavigationControl";
import {Card} from "@material-ui/core";
import IndividualLayer from "./IndividualLayer";
import {layers} from "../TabSystem";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    section: {
        overflowY: "auto",
        maxHeight: "65vh",
    },
}));

function createSection(openLayers, setOpenLayers, booleanWorkspace, setBooleanWorkspace) {
    let layerSection = [];
    layers.map((layer) =>
        layerSection.push(
            <IndividualLayer layer={layer}
                             openLayers={openLayers} setOpenLayers={setOpenLayers}
                             booleanWorkspace={booleanWorkspace} setBooleanWorkspace={setBooleanWorkspace} />
        )
    )
    return layerSection;
}

export default function BrowseDatasets(props) {
    const classes = useStyles();
    const [searchedDatasets, setSearchedDatasets] = useState([]);
    const layerSection = createSection(props.openLayers, props.setOpenLayers, props.booleanWorkspace, props.setBooleanWorkspace);

    return (
        <div className={classes.root}>
            <LayerNavigationControl setBooleanWorkspace={props.setBooleanWorkspace}/>
            <Card className={classes.section}>
                {layerSection.map((layer) =>
                    <div>{layer}</div>
                )}
            </Card>
        </div>
    )
}