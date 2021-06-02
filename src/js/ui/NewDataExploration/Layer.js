import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Grid, Paper, Switch} from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LayerControls from "./LayerControls";
import {updateOpenLayers, createConstraints, extractActiveConstraints} from "./LayerHelpers";
import {componentIsRendering} from "../TabSystem";
import {hashIndex} from "./Helpers";

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

export default function Layer(props) {
    const classes = useStyles();
    const [check, setCheck] = useState(false);

    const [defaultConstraints, allLayerConstraints] = extractActiveConstraints(props.layer);
    const constraints = createConstraints(props.activeConstraints, allLayerConstraints, props.layerIndex, classes);

    //FIXME find out if layer is graphable here, pass as boolean
    if(componentIsRendering) console.log("|Layer|");
    return (
        <div id={`layer-div-${props.layerTitles[props.layerIndex]}`} className={classes.root}>
            <Paper elevation={1}>
                <Accordion
                    color="primary"
                    expanded={props.openLayers[props.layerIndex]}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon color="primary" />}
                        onClick={() => props.setOpenLayers(updateOpenLayers(props.openLayers, props.layerIndex))}
                    >
                        <FormControlLabel
                            aria-label="CheckLayer"
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                            onChange={() => setCheck(!check)}
                            control={
                                <Switch
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
                                               defaultConstraints={defaultConstraints} activeConstraints={props.activeConstraints} setActiveConstraints={props.setActiveConstraints}
                                               layerIndex={props.layerIndex} />
                            </Grid>
                            {constraints.map((constraint, index) => {
                                    index = props.layerIndex + hashIndex(13) + index;
                                    const constraintAndIndex = `${props.layerIndex}: ${index}`
                                    console.log({constraintAndIndex})
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