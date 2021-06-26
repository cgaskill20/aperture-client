import React, { useEffect, useState } from "react";
import { Table, TableContainer, TableHead, TableCell, TableRow, TableBody, Paper, makeStyles, Drawer, Typography } from "@material-ui/core";
import { useGlobalState } from "../global/GlobalState";
import Util from "../../library/apertureUtil";

const drawerWidth = '450px';

const useStyles = makeStyles({
    table: {
        maxWidth: drawerWidth,
    },
    root: {
        display: 'flex',
        zIndex: 10000,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth,
        opacity: 0.95,
    },
    contentContainer: {
        margin: '20px'
    }
});

export default function Popup() {
    const [obj, setObj] = useState({});
    const [globalState, setGlobalState] = useGlobalState();

    const classes = useStyles();

    useEffect(() => {
        window.setPopupObj = (o) => { 
            setObj(o); 
            setGlobalState({ popupOpen: true, sidebarOpen: false, preloading: false });
        };
        return () => { window.setPopupObj = () => { } };
    }, [])

    const keyValueIsValid = (key, value) => {
        if (key === 'meta') {
            return false;
        }
        return true;
    }

    const keyToDisplay = (key) => {
        if (obj?.meta?.[key]?.label) {
            return obj.meta[key].label;
        }
        return Util.cleanUpString(key);
    }

    const valueToDisplay = (key, value) => {
        if (obj?.meta?.[key]?.isDate) {
            return dateToDisplay(value);
        }
        else if (typeof value === 'string' || typeof value === 'number') {
            return value;
        }
        else {
            return JSON.stringify(value);
        }
    }

    const dateToDisplay = (value) => {
        if (typeof value === 'number') {
            return epochToDateString(value);
        }
        else if (typeof value === 'object') {
            return mongoObjectToDateString(value);
        }
        return JSON.stringify(value)
    }

    const epochToDateString = (epoch) => {
        const str = new Date(epoch).toUTCString();
        return str.substr(0, str.length - 4);
    }

    const mongoObjectToDateString = (object) => {
        if (object.$numberLong) {
            if (typeof object.$numberLong === 'string') {
                object.$numberLong = Number(object.$numberLong);
            }
            return epochToDateString(object.$numberLong);
        }
        return JSON.stringify(object)
    }

    const makeTable = () => {
        if (!obj?.properties) {
            return;
        }
        return <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><b>Key</b></TableCell>
                        <TableCell align="right"><b>Value</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(obj.properties)
                        .filter(([key, value]) => keyValueIsValid(key, value))
                        .map(([key, value]) => (
                            <TableRow key={key}>
                                <TableCell component="th" scope="row">
                                    {keyToDisplay(key)}
                                </TableCell>
                                <TableCell align="right">{valueToDisplay(key, value)}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    }

    return <div className={classes.root}>
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="right"
            open={globalState.popupOpen}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.contentContainer}>
                <Typography variant="h5">All fields</Typography>
                {makeTable()}
            </div>
        </Drawer>
    </div>
}