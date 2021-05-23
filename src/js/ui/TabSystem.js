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
import {showGraph} from "../library/charting/chartBtnNewChartWindow"
import {layers} from "./NewDataExploration/ResponseParser";

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
    const [workspace, setWorkspace] = useState([]);
    // const [checkboxes, setCheckboxes] = useState([]);
    // const [sliders, setSliders] = useState([]);
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
                <NewDataExploration layers={layers} workspace={workspace} setWorkspace={setWorkspace} explorationTab={explorationTab} setExplorationTab={setExplorationTab}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <NewModeling />
            </TabPanel>
        </div>
    );
}