import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LayerNavigationControl from "./LayerNavigationControl";
import {Card} from "@material-ui/core";
import {layerTitles} from "../TabSystem";
import IndividualLayerBrowser from "./IndividualLayerBrowser";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    section: {
        overflowY: "auto",
        maxHeight: "65vh",
    },
}));

function createSection(openLayers, setOpenLayers, booleanWorkspace, setBooleanWorkspace, searchedDatasets) {
    let layerSection = [];
    searchedDatasets.map((layer) =>
        layerSection.push(
            <IndividualLayerBrowser layerLabel={layer}
                             openLayers={openLayers} setOpenLayers={setOpenLayers}
                             booleanWorkspace={booleanWorkspace} setBooleanWorkspace={setBooleanWorkspace} />
        )
    )
    return layerSection;
}

export default function BrowseDatasets(props) {
    const classes = useStyles();
    const [searchedDatasets, setSearchedDatasets] = useState(layerTitles);
    const layerSection = createSection(props.openLayers, props.setOpenLayers, props.booleanWorkspace, props.setBooleanWorkspace, searchedDatasets);

    return (
        <div className={classes.root}>
            <LayerNavigationControl openLayers={props.openLayers} setOpenLayers={props.setOpenLayers}
                                    booleanWorkspace={props.booleanWorkspace} setBooleanWorkspace={props.setBooleanWorkspace}
                                    setSearchedDatasets={setSearchedDatasets}/>
            <Card className={classes.section}>
                {layerSection.map((layer) =>
                    <div>{layer}</div>
                )}
            </Card>
        </div>
    )
}