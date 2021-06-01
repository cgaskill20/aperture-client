import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Grid, Paper, Switch} from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LayerControls from "./LayerControls";
import {getAllLayerConstraints, updateOpenLayers, renderIndividualConstraint} from "./LayerHelpers";
import {isComponentRerendering} from "./Workspace";

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

function createConstraints(activeConstraints, allLayerConstraints, layerIndex, classes) {
    let constraints = [];
    activeConstraints[layerIndex].forEach((constraint, index) => {
        let individualConstraint = renderIndividualConstraint(allLayerConstraints[index], classes);
        if(constraint) {
            constraints.push(<div id={`constraint-container-${layerIndex}-${index}`}>{individualConstraint}</div>);
        }
        else {
            constraints.push(<div className={classes.hide} id={`constraint-container-${layerIndex}-${index}`}>{individualConstraint}</div>);
        }
    });
    return constraints;
}

export default function Layer(props) {
    const layerConstraintBuffer = 1000;
    const classes = useStyles();
    const [check, setCheck] = useState(false);
    const allLayerConstraints = getAllLayerConstraints(props.layer);
    const constraints = createConstraints(props.activeConstraints, allLayerConstraints, props.layerIndex, classes);

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
                                <Switch id={`layer-switch-${props.layerIndex}`}
                                        name={`layer-switch-${props.layerIndex}`}
                                        onChange={() => {}}
                                        color="primary"
                                />
                            }
                            label={props.layerTitles[props.layerIndex]}
                            id={`layer-form-control-${props.layerIndex}`}
                            name={`layer-form-control-${props.layerIndex}`}
                        />
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container direction="column">
                            <Grid item>
                                <LayerControls allLayerConstraints={allLayerConstraints} layer={props.layer} graphableLayers={props.graphableLayers}
                                               activeConstraints={props.activeConstraints} setActiveConstraints={props.setActiveConstraints} layerIndex={props.layerIndex} />
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