import React, { useEffect, useState } from "react";
import { makeStyles, Drawer, Typography, IconButton, Grid } from "@material-ui/core";
import { useGlobalState } from "../global/GlobalState";
import Util from "../../library/apertureUtil";
import CloseIcon from "@material-ui/icons/Close";
import PopupTable from "./PopupTable";
import PopupTimeChart from "./PopupTimeChart";
import { keyToDisplay } from "./PopupUtils";
import defaultImportantFields from "../../../json/defaultImportantFields.json"

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

    const makeTable = (keyValPairs) => {
        if (!keyValPairs || !keyValPairs.length) {
            return;
        }
        return <PopupTable keyValPairs={keyValPairs} obj={obj} />
    }

    const makeTables = () => {
        if (obj.properties) {
            const importantNames = new Set();
            const importantFields = Object.entries(obj.properties)
                .filter(([key, value]) => obj.properties?.meta?.[key]?.important || defaultImportantFields[key])
                .filter(([key, value]) => {
                    const keyDisp = keyToDisplay(obj, key);
                    if (importantNames.has(keyDisp)) {
                        return false;
                    }
                    importantNames.add(keyDisp)
                    return true;
                });
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
        console.log({obj})
        if (obj.properties) {
            return Object.entries(obj.properties)
                .filter(([key, value]) => obj.properties?.meta?.[key]?.temporal)
                .map(([key, value]) => <React.Fragment key={`${key}${JSON.stringify(obj.join)}${JSON.stringify(obj.temporalRange)}`}>
                    <Typography gutterBottom variant="h4">{keyToDisplay(obj, key)}</Typography>
                    <PopupTimeChart
                        collection={obj.properties.meta[key].temporal.collection}
                        fieldToChart={key}
                        join={obj.join}
                        temporalRange={obj.properties.meta[key].temporal.temporalRange}
                    />
                    <br />
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