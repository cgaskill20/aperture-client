import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AutoMenu from "../library/autoMenu";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {Equalizer} from "@material-ui/icons";
import NewModeling from "./NewModeling/NewModeling";
import Workspace from "./NewDataExploration/Workspace";
import { useGlobalState } from "./global/GlobalState";
import { showGraph } from "../library/charting/chartBtnNewChartWindow";
import {prettifyJSON} from "./NewDataExploration/Helpers";

function overwrite() {}
export let layerTitles = [];

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tab-system-tabpanel-${index}`}
            aria-labelledby={`tab-system-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `tab-system-tab-${index}`,
        'aria-controls': `tab-system-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

//This function will get ALL constraints for EVERY layer and put them in a MASSIVE data structure.
function extractAllConstraints(layers) {
    let allConstraints = [];
    for(const layer in layers) {
        let theseLayerConstraints = [];
        const individualLayer = layers[layer]
        for(const layerConstraint in individualLayer.constraints) {
            const individualConstraint = individualLayer.constraints[layerConstraint];
            if(!individualConstraint.label) {
                individualConstraint.label = prettifyJSON(layerConstraint);
            }
            theseLayerConstraints.push(individualConstraint);
        }
        allConstraints.push(theseLayerConstraints);
    }
    return allConstraints;
}

//This function will return a data structure representing which constraints are on/off (visible in the layer dropdown)
function extractActiveConstraints(layers) {
    let allActiveConstraints = [];
    for(const layer in layers) {
        let theseLayerConstraints = [];
        const individualLayer = layers[layer]
        for(const layerConstraint in individualLayer.constraints) {
            const individualConstraint = individualLayer.constraints[layerConstraint];
            if(!individualConstraint.hide) {
                theseLayerConstraints.push(true);
            }
            else {
                theseLayerConstraints.push(false);
            }
        }
        allActiveConstraints.push(theseLayerConstraints);
    }
    return allActiveConstraints;
}

export default function TabSystem(props) {
    const [layers, setLayers] = useState([]);
    const [activeConstraints, setActiveConstraints] = useState([]);
    const [booleanWorkspace, setBooleanWorkspace] = useState([]);
    const [openLayers, setOpenLayers] = useState([]);
    function extractLayers(data) {
        let tempBoolean = [];
        let tempLayers = [];
        for(const layer in data) {
            const thisLayer = data[layer];
            tempLayers.push(thisLayer);
            const layerName = thisLayer.label ? thisLayer.label : prettifyJSON(thisLayer.collection);
            layerTitles.push(layerName);
            tempBoolean.push(false);
        }
        setLayers(tempLayers);
        setActiveConstraints(extractActiveConstraints(tempLayers));
        setBooleanWorkspace(tempBoolean);
        setOpenLayers(tempBoolean);
    }

    const [graphableLayers, setGraphableLayers] = useState([]);
    function extractGraphableLayers(data) {
        let tempGraphableLayers = [];
        for (const layer in data) {
            const thisLayer = data[layer];
            const layerName = thisLayer.collection;
            tempGraphableLayers.push(layerName);
        }
        setGraphableLayers(tempGraphableLayers);
    }

    useEffect(() => {
        $.getJSON("src/json/menumetadata.json", async function (mdata) {
            const finalData = await AutoMenu.build(mdata, overwrite);
            extractLayers(finalData);
        });

        $.getJSON("src/json/graphPriority.json", async function (mdata) {
            const graphableLayers = await AutoMenu.build(mdata, overwrite);
            extractGraphableLayers(graphableLayers);
        });
    }, []);

    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [globalState, setGlobalState] = useGlobalState();
    const [selectedDatasets, setSelectedDatasets] = useState([]);

    const valueMap = {
        0: "dataExploration",
        1: "modeling"
    }

    const handleChange = (event, newValue) => {
        setGlobalState({ mode: valueMap[newValue] });
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Paper>
                <Grid
                    container
                    spacing={3}
                    justify="center"
                    alignItems="center"
                >
                    <Grid
                        item
                    >
                    </Grid>
                    <Grid item>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Data Exploration" {...a11yProps(0)} />
                            <Tab disabled={true} label="Modeling" {...a11yProps(1)} />
                        </Tabs></Grid>
                    <Grid
                        item
                    >
                        <IconButton id="nav-graph-button" onClick={showGraph}>
                            <Equalizer color="primary" />
                        </IconButton>
                        <IconButton onClick={props.handleDrawerClose}>
                            <ChevronLeftIcon color="primary" />
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>
            <TabPanel value={value} index={0}>
                <Workspace layers={layers} graphableLayers={graphableLayers}
                           openLayers={openLayers} setOpenLayers={setOpenLayers}
                           selectedDatasets={selectedDatasets} setSelectedDatasets={setSelectedDatasets}
                           booleanWorkspace={booleanWorkspace} setBooleanWorkspace={setBooleanWorkspace}
                           activeConstraints={activeConstraints} setActiveConstraints={setActiveConstraints} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <NewModeling />
            </TabPanel>
        </div>
    );
}