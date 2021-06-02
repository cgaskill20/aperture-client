import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {Equalizer} from "@material-ui/icons";
import NewModeling from "./NewModeling/NewModeling";
import Workspace from "./NewDataExploration/Workspace";
import { useGlobalState } from "./global/GlobalState";
import { showGraph } from "../library/charting/chartBtnNewChartWindow";
import {Button, ButtonGroup} from "@material-ui/core";

export const componentIsRendering = false;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function TabSystem(props) {
    const classes = useStyles();
    const [globalState, setGlobalState] = useGlobalState();

    //FIXME do something like this: selectedArray = [selectedDatasets, setSelectedDatasets]

    const [dataExplorationDisplay, setDataExplorationDisplay] = useState({display: 'block'});
    const [modelingDisplay, setModelingDisplay] = useState({display: 'none'})
    function switchTabs(index) {
        if(index === 0) {
            setDataExplorationDisplay({display: 'block'});
            setModelingDisplay({display: 'none'});
        }
        else if(index === 1) {
            setDataExplorationDisplay({display: 'none'});
            setModelingDisplay({display: 'block'});
        }
    }

    if(componentIsRendering) console.log("|TabSystem|");
    return (
        <div className={classes.root}>
            <Paper>
                <Grid
                    container
                    spacing={3}
                    justify="center"
                    alignItems="center"
                >
                    <Grid item></Grid>
                    <Grid item>
                        <ButtonGroup>
                            <Button variant="outlined" onClick={() => switchTabs(0)}>Data Exploration</Button>
                            <Button variant="outlined" onClick={() => switchTabs(1)}>Modeling</Button>
                        </ButtonGroup>
                    </Grid>
                    <Grid item>
                        <IconButton id="nav-graph-button" onClick={showGraph}>
                            <Equalizer color="primary" />
                        </IconButton>
                        <IconButton onClick={props.handleDrawerClose}>
                            <ChevronLeftIcon color="primary" />
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>
            <br/>
            <div id="data-exploration-display" style={dataExplorationDisplay}>
                <Workspace />
            </div>
            <div id="modeling-display" style={modelingDisplay}>
                <NewModeling />
            </div>
        </div>
    );
}
