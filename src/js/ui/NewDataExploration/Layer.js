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

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: theme.spacing(1),
    },
}));

function createConstraints(activeConstraints, allLayerConstraints, index) {
    let constraints = [];
    for(let i = 0; i < activeConstraints[index].length; i++) {
        if(activeConstraints[index][i]) {
            let individualConstraint = renderIndividualConstraint(allLayerConstraints[i], i);
            constraints.push(individualConstraint);
        }
    }
    return constraints;
}

export default function Layer(props) {
    const classes = useStyles();
    const [check, setCheck] = useState({checked: false});

    const allLayerConstraints = getAllLayerConstraints(props.layer);
    const constraints = createConstraints(props.activeConstraints, allLayerConstraints, props.layerIndex);

    const handleCheck = (event) => {
        setCheck({ ...check, [event.target.name]: event.target.checked });
    };

    return (
        <div className={classes.root}>
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
                            onChange={handleCheck}
                            control={<Switch color="primary" />}
                            label={props.layerTitles[props.layerIndex]}
                            name="checked"
                        />
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container direction="column">
                            <Grid item>
                                <LayerControls allLayerConstraints={allLayerConstraints} layer={props.layer} graphableLayers={props.graphableLayers}
                                               activeConstraints={props.activeConstraints} setActiveConstraints={props.setActiveConstraints} layerIndex={props.layerIndex} />
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