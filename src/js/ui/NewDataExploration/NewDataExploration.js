import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {finalData, nested_json_map, layerNames, layerInfos, layerObjs, layerQueriers,constraintObjs, jsonLayerObjs} from "./ResponseParser";
import BrowseDatasets from "./BrowseDatasets";
import Workspace from "./Workspace";
const printStuff = false;

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`data-exploration-tabpanel-${index}`}
            aria-labelledby={`data-exploration-tab-${index}`}
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
        id: `data-exploration-tab-${index}`,
        'aria-controls': `data-exploration-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function ScrollableTabsButtonAuto(props) {
    const classes = useStyles();

    if(printStuff) {
        console.log("findalData: " + finalData);
        console.log("nested_json_map: " + nested_json_map);
        console.log("layerNames: " + layerNames);
    }

    const handleChange = (event, newExplorationTab) => {
        props.setExplorationTab(newExplorationTab);
    };

    return (
        <div className={classes.root}>
            <Tabs
                value={props.explorationTab}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Browse Datasets" {...a11yProps(0)} />
                <Tab label="Workspace" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={props.explorationTab} index={0}>
                <BrowseDatasets datasets={layerNames} workspace={props.workspace} setWorkspace={props.setWorkspace}/>
            </TabPanel>
            <TabPanel value={props.explorationTab} index={1}>
                <Workspace datasets={props.workspace} workspace={props.workspace} setWorkspace={props.setWorkspace}/>
            </TabPanel>

        </div>
    );
}