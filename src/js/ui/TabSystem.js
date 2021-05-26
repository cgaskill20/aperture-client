import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Paper} from "@material-ui/core";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NewDataExploration from "./NewDataExploration/NewDataExploration";
import NewModeling from "./NewModeling/NewModeling";
import { useGlobalState } from "./global/GlobalState";
import IconButton from "@material-ui/core/IconButton";
import BarChartIcon from "@material-ui/icons/BarChart";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {showGraph} from "../library/charting/chartBtnNewChartWindow";
import AutoMenu from "../library/autoMenu";
import Util from "../library/apertureUtil";

function overwrite() {}
export let layers = [];
export let layerTitles = [];
export let graphableLayers = [];

$.getJSON("src/json/menumetadata.json", async function (mdata) {
    const finalData = await AutoMenu.build(mdata, overwrite);
    extractLayers(finalData);
});

$.getJSON("src/json/graphPriority.json", async function (mdata) {
    const graphableLayers = await AutoMenu.build(mdata, overwrite);
    extractGraphableLayers(graphableLayers);
});

function extractLayers(data) {
    for(const layer in data) {
        const thisLayer = data[layer];
        layers.push(thisLayer);
        const layerName = thisLayer["label"] ? thisLayer["label"] : Util.capitalizeString(Util.underScoreToSpace(thisLayer["collection"]));
        layerTitles.push(layerName);
    }
}

function extractGraphableLayers(data) {
    for (const layer in data) {
        const thisLayer = data[layer];
        const layerName = thisLayer["collection"];
        graphableLayers.push(layerName);
    }
}

//FIXME Once the datasets load immediately this will work
export const numberOfDatasets = layers.length;

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

export default function TabSystem(props) {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [globalState, setGlobalState] = useGlobalState();

    //FIXME Replace these hard coded values with numberOfDatasets once datasets load immediately
    const [booleanWorkspace, setBooleanWorkspace] = useState(new Array(19).fill(false));
    const [openLayers, setOpenLayers] = useState(new Array(19).fill(false));

    const valueMap = {
        0: "dataExploration",
        1: "modeling"
    }
    const [explorationTab, setExplorationTab] = useState(0);

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
                            <Tab label="Modeling" {...a11yProps(1)} />
                        </Tabs></Grid>
                    <Grid
                        item
                    >
                        <IconButton id="nav-graph-button" onClick={showGraph}>
                            <BarChartIcon color="primary" />
                        </IconButton>
                        <IconButton onClick={props.handleDrawerClose}>
                            <ChevronLeftIcon color="primary" />
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>
            <TabPanel value={value} index={0}>
                <NewDataExploration openLayers={openLayers} setOpenLayers={setOpenLayers}
                                    booleanWorkspace={booleanWorkspace} setBooleanWorkspace={setBooleanWorkspace}
                                    explorationTab={explorationTab} setExplorationTab={setExplorationTab} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <NewModeling />
            </TabPanel>
        </div>
    );
}