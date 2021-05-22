import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {IconButton, Paper, Switch, Typography} from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DELayerControls from "./DELayerControls";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

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

function getIcon(workspace, layer) {
    return workspace.includes(layer) ? <RemoveIcon/> : <AddIcon/>;
}

function findIndex(workspace, layer) {
    for(let i = 0; i < workspace.length; i++) {
        if(workspace[i] == layer) {
            return i;
        }
    }
}

function updateWorkspace(workspace, layer) {
    let newWorkspace = [...workspace];
    if(!newWorkspace.includes(layer)) {
        newWorkspace.push(layer);
    }
    else {
        newWorkspace.splice(findIndex(workspace, layer), 1);
    }
    return newWorkspace;
}

export default function IndividualLayer(props) {
    const classes = useStyles();
    const [state, setState] = useState({checked: false});

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

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
                            <IconButton aria-label="fav" color="primary" onClick={() => props.setWorkspace(updateWorkspace(props.workspace, props.layer))}>
                                {getIcon(props.workspace, props.layer)}
                            </IconButton>
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
                            <DELayerControls/>
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
                        <IconButton aria-label="fav" color="primary" onClick={() => props.setWorkspace(updateWorkspace(props.workspace, props.layer))}>
                            {getIcon(props.workspace, props.layer)}
                        </IconButton>
                        {props.layer}
                    </Typography>
                </Paper>
            </div>
        )
    }
}