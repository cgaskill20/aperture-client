import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DatasetsNavigator from "./DatasetsNavigator";

import {finalData, nested_json_map, layerNames, layerInfos, layerObjs, layerQueriers,constraintObjs, jsonLayerObjs} from "./ResponseParser";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BrowseDatasets from "./BrowseDatasets";
import Workspace from "./Workspace";
const printStuff = false;

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`DE-tabpanel-${index}`}
            aria-labelledby={`DE-tab-${index}`}
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
        id: `DE-tab-${index}`,
        'aria-controls': `DE-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function ScrollableTabsButtonAuto(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    if(printStuff) {
        console.log("findalData: " + finalData);
        console.log("nested_json_map: " + nested_json_map);
        console.log("layerNames: " + layerNames);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Browse Datasets" {...a11yProps(0)} />
                <Tab label="Workspace" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <BrowseDatasets datasets={layerNames} workspace={props.workspace} setWorkspace={props.setWorkspace}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Workspace datasets={props.workspace} workspace={props.workspace} setWorkspace={props.setWorkspace}/>
            </TabPanel>

        </div>
    );
}