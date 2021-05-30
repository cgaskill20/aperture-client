import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Grid, Paper, Switch} from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LayerControls from "./LayerControls";
import {renderIndividualConstraint} from "./LayerHelpers";
import {prettifyJSON} from "./Helpers";

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

function getAllConstraints(layer) {
    let allConstraints = [];
    for(const layerConstraint in layer.constraints) {
        const constraint = layer.constraints[layerConstraint];
        if(!constraint.label) {
            constraint.label = prettifyJSON(layerConstraint);
        }
        allConstraints.push(constraint);
    }
    return allConstraints;
}

function createActiveConstraints(allConstraints) {
    let initializeActiveConstraints = [];
    for(const constraint in allConstraints) {
        const thisConstraint = allConstraints[constraint];
        if(!thisConstraint.hide) {
            initializeActiveConstraints.push(true);
        }
        else {
            initializeActiveConstraints.push(false);
        }
    }
    return initializeActiveConstraints;
}

function createConstraints(activeConstraints, allConstraints) {
    let constraints = [];
    for(let i = 0; i < activeConstraints.length; i++) {
        if(activeConstraints[i]) {
            let temp = renderIndividualConstraint(allConstraints[i], i);
            constraints.push(temp);
        }
    }
    return constraints;
}

export default function Layer(props) {
    const classes = useStyles();
    const [check, setCheck] = useState({checked: false});
    const layerLabel = props.layer.label ? props.layer.label : prettifyJSON(props.layer.collection);

    const handleCheck = (event) => {
        setCheck({ ...check, [event.target.name]: event.target.checked });
    };

    let allConstraints = getAllConstraints(props.layer);

    let initializeActiveConstraints = createActiveConstraints(allConstraints);
    const [activeConstraints, setActiveConstraints] = useState(initializeActiveConstraints);

    let constraints = createConstraints(activeConstraints, allConstraints);

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
                                <LayerControls allConstraints={allConstraints} layer={props.layer}
                                               activeConstraints={activeConstraints} setActiveConstraints={setActiveConstraints} />
                            </Grid>
                            {constraints.map((current) =>
                                <div>{current}</div>
                            )}
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Paper>
        </div>
    );
}