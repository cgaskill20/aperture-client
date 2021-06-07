import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NewModeling from "./NewModeling/NewModeling";
import Workspace from "./NewDataExploration/Workspace";
import { useGlobalState } from "./global/GlobalState";
import { showGraph } from "../library/charting/chartBtnNewChartWindow";
import {Button, ButtonGroup} from "@material-ui/core";
import ExploreIcon from '@material-ui/icons/Explore';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import EqualizerIcon from "@material-ui/icons/Equalizer";

export const componentIsRendering = false;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '98%',
    },
    buttonSpacing: {
        margin: theme.spacing(2),
        marginTop: theme.spacing(3),
    },
}));

export default function TabSystem(props) {
    const classes = useStyles();
    const [globalState, setGlobalState] = useGlobalState();

    //FIXME do something like this: selectedArray = [selectedDatasets, setSelectedDatasets]

    const [dataExplorationDisplay, setDataExplorationDisplay] = useState({display: 'block'});
    const [modelingDisplay, setModelingDisplay] = useState({display: 'none'})
    const [dataExplorationButtonDisplay, setDataExplorationButtonDisplay] = useState('contained')
    const [modelingButtonDisplay, setModelingButtonDisplay] = useState('outlined')
    const [dataExplorationButtonColor, setDataExplorationButtonColor] = useState('primary')
    const [modelingButtonColor, setModelingButtonColor] = useState('')
    function switchTabs(index) {
        if(index === 0) {
            setDataExplorationDisplay({display: 'block'});
            setModelingDisplay({display: 'none'});
            setDataExplorationButtonDisplay('contained');
            setModelingButtonDisplay('outlined');
            setDataExplorationButtonColor('primary');
            setModelingButtonColor('');
        }
        else if(index === 1) {
            setDataExplorationDisplay({display: 'none'});
            setModelingDisplay({display: 'block'});
            setDataExplorationButtonDisplay('outlined');
            setModelingButtonDisplay('contained');
            setDataExplorationButtonColor('');
            setModelingButtonColor('primary');
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
                    <Grid item>
                        <ButtonGroup className={classes.buttonSpacing} size="large">
                            <Button variant={dataExplorationButtonDisplay} color={dataExplorationButtonColor} startIcon={<ExploreIcon/>} onClick={() => switchTabs(0)}>Data Exploration</Button>
                            <Button variant={modelingButtonDisplay} color={modelingButtonColor} startIcon={<DataUsageIcon/>} onClick={() => switchTabs(1)}>Modeling</Button>
                            <Button variant="outlined" startIcon={<EqualizerIcon/>} id="nav-graph-button" onClick={() => {
                                setGlobalState({ chartingOpen: !globalState.chartingOpen })
                                props.handleDrawerClose()
                            }}>Graphing</Button>
                            <Button variant="outlined" startIcon={<ChevronLeftIcon/>} onClick={props.handleDrawerClose}>Close</Button>
                        </ButtonGroup>
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
