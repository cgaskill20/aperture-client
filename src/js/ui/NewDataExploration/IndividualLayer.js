import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {IconButton, Paper, Switch, Typography} from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DELayerControls from "./DELayerControls";
import {layerInfos} from "./ResponseParser";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';

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

function getFavIcon(workspace, layer) {
    return workspace.includes(layer) ? <RemoveIcon/> : <AddIcon/>;
    // return workspace.includes(layer) ? <FavoriteIcon/> : <FavoriteBorderIcon/>;
}

// function getFavIcon(layerChecked) {
//     return layerChecked ? <FavoriteIcon/> : <FavoriteBorderIcon/>;
// }

export function updateWorkspace(workspace, layer, index) {
    let tempWorkspace = [...workspace];
    if(!tempWorkspace.includes(layer)) {
        tempWorkspace.push(layer);
    }
    else {
        tempWorkspace.splice(index, 1);
    }
    return tempWorkspace;
}

export default function IndividualLayer(props) {
    const classes = useStyles();

    const [state, setState] = useState({checked: false});
    const [layerChecked, setLayerChecked] = useState(false);

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
                            <FormControlLabel
                                aria-label="AddFav"
                                onClick={() => {
                                    props.setWorkspace(updateWorkspace(props.workspace, props.layer, props.index));
                                    // setLayerChecked(!layerChecked);
                                }}
                                control={<IconButton color="primary">{getFavIcon(props.workspace, props.layer)}</IconButton>}
                                // control={<IconButton color="secondary">{getFavIcon(layerChecked)}</IconButton>}
                                name="fav"
                            />
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
                            <DELayerControls text={layerInfos[props.index]}/>
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
                        <FormControlLabel
                            aria-label="AddFav"
                            onClick={() => {
                                props.setWorkspace(updateWorkspace(props.workspace, props.layer, props.index));
                                // setLayerChecked(!layerChecked);
                            }}
                            control={<IconButton color="primary">{getFavIcon(props.workspace, props.layer)}</IconButton>}
                            // control={<IconButton color="secondary">{getFavIcon(layerChecked)}</IconButton>}
                            name="fav"
                        />
                        {props.layer}
                    </Typography>
                </Paper>
            </div>
        )
    }
}