import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Grid, Paper, Switch} from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LayerControls from "./LayerControls";
import {renderConstraintContainer} from "./IndividualLayerHelpers";
import Util from "../../library/apertureUtil";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: theme.spacing(1),
    },
}));

function updateOpenLayers(openLayers, index) {
    let updatedLayers = [...openLayers];
    updatedLayers[index] = !updatedLayers[index];
    return updatedLayers;
}

export default function IndividualLayer(props) {
    const classes = useStyles();
    const [check, setCheck] = useState({checked: false});
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

    return (
        <div className={classes.root}>
            <Paper elevation={1}>
                <Accordion
                    color="primary"
                    expanded={props.openLayers[props.index]}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon color="primary" onClick={() => props.setOpenLayers(updateOpenLayers(props.openLayers, props.index))} />}
                    >
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
                                <LayerControls advancedLayers={advancedLayers} layerLabel={layerLabel}/>
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