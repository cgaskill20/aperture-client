import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NewModeling from "./NewModeling/NewModeling";
import Workspace from "./NewDataExploration/Workspace";
import { useGlobalState } from "./global/GlobalState";
import {Button, ButtonGroup} from "@material-ui/core";
import ExploreIcon from '@material-ui/icons/Explore';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import EqualizerIcon from "@material-ui/icons/Equalizer";

export const componentIsRendering = false;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
    buttonSpacing: {
        margin: theme.spacing(2),
        marginTop: theme.spacing(3),
    },
}));

export default function TabSystem(props) {
    const classes = useStyles();
    const [globalState, setGlobalState] = useGlobalState();

    const tabSwitchingStyles = [[{display: 'block'}, 'contained', 'primary'], [{display: 'none'}, 'outlined', '']];
    const [dataExplortaionButtonStyles, setDataExplorationButtonStyles] = useState(tabSwitchingStyles[0]);
    const [modelingButtonStyles, setModelingButtonStyles] = useState(tabSwitchingStyles[1]);
    function switchTabs(index) {
        if(index === 0) {
            setDataExplorationButtonStyles(tabSwitchingStyles[0]);
            setModelingButtonStyles(tabSwitchingStyles[1]);
        }
        else if(index === 1) {
            setDataExplorationButtonStyles(tabSwitchingStyles[1]);
            setModelingButtonStyles(tabSwitchingStyles[0]);
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
                            <Button variant={dataExplortaionButtonStyles[1]} color={dataExplortaionButtonStyles[2]} startIcon={<ExploreIcon/>} onClick={() => switchTabs(0)}>Data Exploration</Button>
                            <Button variant={modelingButtonStyles[1]} color={modelingButtonStyles[2]} startIcon={<DataUsageIcon/>} onClick={() => switchTabs(1)}>Modeling</Button>
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
            <div id="data-exploration-display" style={dataExplortaionButtonStyles[0]}>
                <Workspace />
            </div>
            <div id="modeling-display" style={modelingButtonStyles[0]}>
                <NewModeling />
            </div>
        </div>
    );
}
