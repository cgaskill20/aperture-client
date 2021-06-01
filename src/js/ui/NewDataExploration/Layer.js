import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Grid, Paper, Switch} from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LayerControls from "./LayerControls";
import {updateOpenLayers, renderIndividualConstraint} from "./LayerHelpers";
import {isComponentRerendering} from "./Workspace";
import Util from "../../library/apertureUtil";
import {prettifyJSON} from "./Helpers";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: theme.spacing(1),
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular,
        margin: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
}));

function extractActiveConstraints(layer) {
    let activeConstraints = [];
    let allLayerConstraints = [];
    for(const constraint in layer.constraints) {
        activeConstraints.push(!layer.constraints[constraint].hide);
        layer.constraints[constraint].label = layer.constraints[constraint]?.label ?? constraint;
        if(layer.constraints[constraint].label.substring(0, 11) === "properties.") {
            layer.constraints[constraint].label = layer.constraints[constraint].label.substring(11, layer.constraints[constraint].label.length);
        }
        allLayerConstraints.push(layer.constraints[constraint]);
    }
    return [activeConstraints, allLayerConstraints];
}

function createConstraints(activeConstraints, allLayerConstraints, classes) {
    let constraints = [];
    activeConstraints.forEach((constraint, index) => {
        let individualConstraint = renderIndividualConstraint(allLayerConstraints[index], classes);
        if(constraint) {
            constraints.push(<div>{individualConstraint}</div>);
        }
        else {
            constraints.push(<div className={classes.hide}>{individualConstraint}</div>);
        }
    });
    return constraints;
}

export default function Layer(props) {
    const classes = useStyles();
    const layerConstraintBuffer = 1000;
    const [check, setCheck] = useState(false);

    const [initializedActiveConstraints, allLayerConstraints] = extractActiveConstraints(props.layer);
    const [activeConstraints, setActiveConstraints] = useState(initializedActiveConstraints);
    const constraints = createConstraints(activeConstraints, allLayerConstraints, classes);
    const defaultConstraints = initializedActiveConstraints;

    //FIXME find out if layer is graphable here, pass as boolean
    if(isComponentRerendering) console.log("|Layer|");
    return (
        <div id={`layer-div-${props.layerTitles[props.layerIndex]}`} className={classes.root}>
            <Paper elevation={1}>
                <Accordion
                    color="primary"
                    expanded={props.openLayers[props.layerIndex]}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon color="primary" onClick={() => props.setOpenLayers(updateOpenLayers(props.openLayers, props.layerIndex))} />}
                    >
                        <FormControlLabel
                            aria-label="CheckLayer"
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                            onChange={() => setCheck(!check)}
                            control={
                                <Switch onChange={() => {}}
                                        color="primary"
                                />
                            }
                            label={props.layerTitles[props.layerIndex]}
                        />
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container direction="column">
                            <Grid item>
                                <LayerControls allLayerConstraints={allLayerConstraints} layer={props.layer} graphableLayers={props.graphableLayers}
                                               defaultConstraints={defaultConstraints} activeConstraints={activeConstraints} setActiveConstraints={setActiveConstraints}
                                               layerIndex={props.layerIndex} />
                            </Grid>
                            {constraints.map((constraint, index) => {
                                    index = props.layerIndex * layerConstraintBuffer + index;
                                    return (<div key={index}>{constraint}</div>)
                                }
                            )}
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Paper>
        </div>
    );
}