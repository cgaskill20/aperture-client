import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import AllDatasetsTab from "./AllDatasetsTab";
// import Workspace from "./Workspace";
import DatasetsNavigator from "./DatasetsNavigator";

import {finalData, nested_json_map, layerNames, layerInfos, layerObjs, layerQueriers,constraintObjs} from "./ResponseParser";
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

export let workspaceList = [];

export function updateWorkspace(layer, index) {
    if(!workspaceList.includes(layer)) {
        workspaceList.push(layer);
    }
    else {
        workspaceList.splice(index, 1);
    }
}

export default function ScrollableTabsButtonAuto() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    if(printStuff) {
        console.log("findalData: " + finalData);
        console.log("nested_json_map: " + nested_json_map);
        console.log("layerNames: " + layerNames);
    }

    //FIXME get this hook working
    let [workspace, setWorkspace] = useState([]);

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
                <Tab label="All Datasets" {...a11yProps(0)} />
                <Tab label="Workspace" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                {/*<DatasetsNavigator datasets={layerNames} workspace={workspaceList} setWorkspace={updateWorkspace}/>*/}
                <DatasetsNavigator datasets={layerNames} workspace={workspace} setWorkspace={setWorkspace}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                {/*<DatasetsNavigator datasets={workspaceList} workspace={workspaceList} setWorkspace={updateWorkspace} isWorkspace={true}/>*/}
                <DatasetsNavigator datasets={workspace} workspace={workspace} setWorkspace={setWorkspace} isWorkspace={true}/>
            </TabPanel>

        </div>
    );
}