import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Grid, Paper, Switch} from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LayerControls from "./LayerControls";
import {getAllLayerConstraints, createConstraints, updateOpenLayers} from "./LayerHelpers";
import {prettifyJSON} from "./Helpers";
import {extractActiveConstraints} from "../TabSystem"

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: theme.spacing(1),
    },
}));

export default function Layer(props) {
    const classes = useStyles();
    const [check, setCheck] = useState({checked: false});
    const layerLabel = props.layer.label ? props.layer.label : prettifyJSON(props.layer.collection);

    const allLayerConstraints = getAllLayerConstraints(props.layer);
    const constraints = createConstraints(props.activeConstraints, allLayerConstraints, props.index);

    const handleCheck = (event) => {
        setCheck({ ...check, [event.target.name]: event.target.checked });
    };

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
                                <LayerControls allLayerConstraints={allLayerConstraints} layer={props.layer} graphableLayers={props.graphableLayers}
                                               activeConstraints={props.activeConstraints} setActiveConstraints={props.setActiveConstraints} layerIndex={props.index} />
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