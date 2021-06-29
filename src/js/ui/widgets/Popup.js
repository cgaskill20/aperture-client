import React, { useEffect, useState } from "react";
import { Table, TableContainer, TableHead, TableCell, TableRow, TableBody, Paper, makeStyles, Drawer, Typography, IconButton, Grid } from "@material-ui/core";
import { useGlobalState } from "../global/GlobalState";
import Util from "../../library/apertureUtil";
import fipsToState from "../../../json/fipsToState.json"
import defaultImportantFields from "../../../json/defaultImportantFields.json"
import CloseIcon from "@material-ui/icons/Close";
import PopupTimeChart from "./PopupTimeChart";

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
        if (['meta', 'id', '_id'].includes(key)) {
            return false;
        }
        return true;
    }

    const keyToDisplay = (key) => {
        if (obj?.meta?.[key]?.label) {
            return obj.meta[key].label;
        }
        if (defaultImportantFields[key]) {
            return defaultImportantFields[key].label ?? Util.cleanUpString(key);
        }

        return Util.cleanUpString(key);
    }

    const valueToDisplay = (key, value) => {
        let unit = obj?.meta?.[key]?.unit;
        if (unit?.toUpperCase() === 'NA') {
            unit = null;
        }

        if (obj?.meta?.[key]?.isDate) {
            return dateToDisplay(value);
        }
        else if (defaultImportantFields[key]?.type && !['string', 'number'].includes(defaultImportantFields[key]?.type)) {
            return specialTypeToDisplay(defaultImportantFields[key].type, value);
        }
        else if (['string', 'number'].includes(typeof value)) {
            return `${value}${unit ? ` ${Util.cleanUpString(unit)}` : ''}`;
        }
        else if (typeof value === 'object') {
            return mongoObjectToSomething(value, (s) => s);
        }
        else {
            return JSON.stringify(value);
        }
    }

    const specialTypeToDisplay = (type, value) => {
        if (type === "stateFips") {
            return fipsToState[value];
        }
    }

    const mongoObjectToSomething = (object, func) => { //this function will be extended as more mongo objects leak in
        const numericTypes = ['$numberLong', '$numberDecimal'];
        for (const numericType of numericTypes) {
            if (object?.[numericType]) {
                return func(Number(object[numericType]));
            }
        }
        return JSON.stringify(object);
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
        return mongoObjectToSomething(object, epochToDateString);
    }

    const makeTable = (keyValPairs) => {
        if (!keyValPairs || !keyValPairs.length) {
            return;
        }
        return <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><b>Key</b></TableCell>
                        <TableCell><b>Value</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {keyValPairs
                        .filter(([key, value]) => keyValueIsValid(key, value))
                        .map(([key, value]) => (
                            <TableRow key={key}>
                                <TableCell component="th" scope="row">
                                    {keyToDisplay(key)}
                                </TableCell>
                                <TableCell>{valueToDisplay(key, value)}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    }

    const makeTables = () => {
        if (obj.properties) {
            const importantFields = Object.entries(obj.properties).filter(([key, value]) => obj.properties?.meta?.[key]?.important || defaultImportantFields[key]);
            return <>
                {
                    importantFields.length ?
                        <>
                            <Typography variant="h6" gutterBottom>
                                Important Fields
                            </Typography>
                            {makeTable(importantFields)}
                            <br />
                        </> : null
                }
                {makeCharts()}
                <Typography variant="h6" gutterBottom>
                    All Fields
                </Typography>
                {makeTable(Object.entries(obj.properties))}
            </>
        }
    }

    const makeCharts = () => {
        if (obj.properties) {
            return Object.entries(obj.properties)
                .filter(([key, value]) => obj.properties?.meta?.[key]?.temporal)
                .map(([key, value]) => <React.Fragment key={`${key}${JSON.stringify(obj.join)}${JSON.stringify(obj.temporalRange)}`}>
                    <Typography gutterBottom variant="h4">{Util.cleanUpString(key)}</Typography>
                    <PopupTimeChart
                        collection={obj.name}
                        fieldToChart={key}
                        join={obj.join}
                        temporalRange={obj.temporalRange}
                    />
                    <br/>
                </React.Fragment>)
        }
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
                <Grid container>
                    <Grid item xs={10}>
                        <Typography variant="h4" gutterBottom>
                            {Util.cleanUpString(obj.name)}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton onClick={() => setGlobalState({ popupOpen: false })}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        {makeTables()}
                    </Grid>
                </Grid>
            </div>
        </Drawer>
    </div>
}