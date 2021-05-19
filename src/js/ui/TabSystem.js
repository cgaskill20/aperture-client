import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Paper} from "@material-ui/core";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NewDataExploration from "./NewDataExploration/NewDataExploration";
import NewModeling from "./NewModeling/NewModeling";
import NewValidation from "./NewValidation/NewValidation";
import { useGlobalState } from "./global/GlobalState";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`auto-tabpanel-${index}`}
            aria-labelledby={`auto-tab-${index}`}
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
        id: `auto-tab-${index}`,
        'aria-controls': `auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
}));

export default function TabSystem() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [globalState, setGlobalState] = useGlobalState();
    const valueMap = {
        1: "dataExloration",
        2: "modeling",
        3: "validation"
    }

    const handleChange = (event, newValue) => {
        setGlobalState({ mode: valueMap[newValue] });
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Paper>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Data Exploration" {...a11yProps(0)} />
                    <Tab label="Modeling" {...a11yProps(1)} />
                    <Tab label="Validation" {...a11yProps(2)} />
                </Tabs>
            </Paper>
            <TabPanel value={value} index={0}>
                <NewDataExploration />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <NewModeling />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <NewValidation />
            </TabPanel>
        </div>
    );
}