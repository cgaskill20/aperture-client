import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Button, Grid, Paper, Switch, Typography} from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DELayerControls from "./DELayerControls";
import {findIndex, renderConstraintContainer, renderIcon} from "./IndividualLayerHelpers";
import Util from "../../library/apertureUtil";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '98%',
        margin: theme.spacing(1),
    },
}));

function updateOpenLayers(openLayers, layerOpen, index) {
    let updatedLayers = [...openLayers];
    updatedLayers[index] = layerOpen;
    return updatedLayers;
}

export default function IndividualLayer(props) {
    const classes = useStyles();
    const [check, setCheck] = useState({checked: false});
    const index = findIndex(props.workspace, props.layer);
    const layerLabel = props.layer["label"] ? props.layer["label"] : Util.capitalizeString(Util.underScoreToSpace(props.layer["collection"]));

    let checkboxes = [];
    let sliders = [];
    let radios = [];
    let advancedLayers = [];

    const handleCheck = (event) => {
        setCheck({ ...check, [event.target.name]: event.target.checked });
    };

    for(const layerConstraints in props.layer["constraints"]) {
        const constraint = props.layer["constraints"][layerConstraints];
        if(!constraint["hide"]) {
            if(constraint["type"] === "slider") {
                sliders.push(constraint);
            }
            else if(constraint["type"] === "multiselector") {
                checkboxes.push(constraint);
            }
        }
        else {
            advancedLayers.push(constraint);
        }
    }

    if(props.isWorkspace) {
        return (
            <div className={classes.root}>
                <Paper elevation={1}>
                    <Accordion
                        color="primary"
                        //FIXME I need to do something like this...
                        expanded={props.openLayers[props.index]}
                        //FIXME This onClick doesn't work. Figure out how to control the dropdown arrow action.
                        onClick={() => props.setOpenLayers(updateOpenLayers(props.openLayers, !props.openLayers[props.index], props.index))}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            {renderIcon(props.workspace, props.layer, index, props.setWorkspace)}
                            <FormControlLabel
                                aria-label="CheckLayer"
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                                onChange={handleCheck}
                                control={<Switch color="primary" />}
                                label={layerLabel}
                                name="checked"
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container direction="column">
                                <Grid item>
                                    <DELayerControls advancedLayers={advancedLayers} />
                                </Grid>
                                {renderConstraintContainer(sliders, "slider").map((section) =>
                                    <div>
                                        {section}
                                    </div>
                                )}
                                {renderConstraintContainer(checkboxes, "checkbox").map((section) =>
                                    <div>
                                        {section}
                                    </div>
                                )}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Paper>
            </div>
        );
    }

    else {
        return (
            <div className={classes.root}>
                <Paper elevation={1}>
                    <Typography>
                        {renderIcon(props.workspace, props.layer, index, props.setWorkspace)}
                        {layerLabel}
                    </Typography>
                </Paper>
            </div>
        )
    }
}