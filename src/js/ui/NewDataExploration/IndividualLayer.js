import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Grid, IconButton, Paper, Switch, Typography} from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import HandleConstraints from "./HandleConstraints";
import DELayerControls from "./DELayerControls";
import CardContent from "@material-ui/core/CardContent";
import DECheckbox from "./DECheckbox";
import DESlider from "./DESlider";
import {experimentalConstraints} from "./testingConstants";
import {layerObjs} from "./ResponseParser";
import Util from "../../library/apertureUtil";

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

function findIndex(workspace, layer) {
    for(let i = 0; i < workspace.length; i++) {
        if(workspace[i] === layer) {
            return i;
        }
    }
    return -1;
}

function updateWorkspace(workspace, layer, index) {
    let newWorkspace = [...workspace];
    index === -1 ? newWorkspace.push(layer) : newWorkspace.splice(index, 1);
    return newWorkspace;
}

function getIcon(index) {
    return index !== -1 ? <RemoveIcon/> : <AddIcon/>;
}

function renderIcon(workspace, layer, index, setWorkspace) {
    return (
        <IconButton aria-label="fav" color="primary" onClick={() => setWorkspace(updateWorkspace(workspace, layer, index))}>
            {getIcon(index)}
        </IconButton>
    )
}

export default function IndividualLayer(props) {
    const classes = useStyles();
    const [state, setState] = useState({checked: false});
    const index = findIndex(props.workspace, props.layer);

    let checkboxes = [];
    let sliders = [];
    let radios = [];

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    for(const constraint in experimentalConstraints) {
        if(experimentalConstraints[constraint].type === "checkbox") {
            checkboxes.push(experimentalConstraints[constraint].title);
        }
        else if(experimentalConstraints[constraint].type === 'slider'){
            sliders.push(experimentalConstraints[constraint].title);
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
                                label={props.layer}
                                name="checked"
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container direction="column">
                                <Grid item>
                                    <DELayerControls/>
                                </Grid>
                                <Grid item>
                                    <Paper elevation={3} className={classes.root}>
                                        <CardContent>
                                            {checkboxes.map((constraint) =>
                                                <div key={constraint}>
                                                    <DECheckbox title={constraint} />
                                                </div>
                                            )}
                                        </CardContent>
                                    </Paper>
                                </Grid>
                                <Grid item>
                                    <Paper elevation={3} className={classes.root}>
                                        <CardContent>
                                            {sliders.map((constraint) =>
                                                <div key={constraint}>
                                                    <DESlider title={constraint} />
                                                </div>
                                            )}
                                        </CardContent>
                                    </Paper>
                                </Grid>
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
                        {props.layer}
                    </Typography>
                </Paper>
            </div>
        )
    }
}