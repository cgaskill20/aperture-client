import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Grid, IconButton, Paper, Switch, Typography} from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DELayerControls from "./DELayerControls";
import {findIndex, renderConstraintContainer, renderIcon} from "./IndividualLayerHelpers";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: theme.spacing(1),
    },
    heading: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: theme.typography.fontWeightRegular,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

export default function IndividualLayer(props) {
    const classes = useStyles();
    const [state, setState] = useState({checked: false});
    const index = findIndex(props.workspace, props.layer);
    const layerLabel = props.layer["label"] ? props.layer["label"] : props.layer;

    let checkboxes = [];
    let sliders = [];
    let radios = [];

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };


    for(const layerConstraints in props.layer["constraints"]) {
        const constraint = props.layer["constraints"][layerConstraints];
        if(!constraint["hide"]) {
            if(constraint["type"] === "slider") {
                sliders.push(constraint);
            }
            else if(constraint["type"] === "multiselector") {
                for(const option in constraint["options"]) {
                    checkboxes.push(constraint["options"][option]);
                }
            }
            const constraintLabel = constraint["label"];
        }
    }

    if(props.isWorkspace) {
        return (
            <div className={classes.root}>
                <Paper elevation={1}>
                    <Accordion color="primary">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            {renderIcon(props.workspace, props.layer, index, props.setWorkspace)}
                            <FormControlLabel
                                aria-label="CheckLayer"
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                                onChange={handleChange}
                                control={<Switch color="primary" />}
                                label={props.layer["label"]}
                                name="checked"
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container direction="column">
                                <Grid item>
                                    <DELayerControls/>
                                </Grid>
                                {renderConstraintContainer(sliders, "slider")}
                                {renderConstraintContainer(checkboxes, "checkbox")}
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
                        {props.layer["label"]}
                    </Typography>
                </Paper>
            </div>
        )
    }
}