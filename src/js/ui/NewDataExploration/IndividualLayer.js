import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {IconButton, Paper, Switch} from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DELayerControls from "./DELayerControls";
import {layerInfos} from "./ResponseParser";
import DECard from "./DECard";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

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
    return workspace.includes(layer) ? <FavoriteIcon/> : <FavoriteBorderIcon/>;
}

function updateWorkspace(workspace, layer, index) {
    //FIXME ERROR: can't call .includes() on undefined. So workspace is undefined here
    if(!workspace.includes(layer)) {
        workspace.push(layer);
    }
    else {
        workspace.splice(index, 1);
    }
    console.log("workspace is now: " + workspace);
    return workspace;
}

export default function IndividualLayer(props) {
    const classes = useStyles();

    const [state, setState] = React.useState({
        checked: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <div className={classes.root}>
            <Paper elevation={1}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <FormControlLabel
                            aria-label="AddFav"
                            onClick={() => props.setWorkspace(updateWorkspace(props.workspace, props.layer, props.index))}
                            control={<IconButton color="primary">{getFavIcon(props.title)}</IconButton>}
                            name="fav"
                        />
                        <FormControlLabel
                            aria-label="CheckLayer"
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                            onChange={handleChange}
                            control={<Switch color="primary" />}
                            label={props.title}
                            name="checked"
                        />
                    </AccordionSummary>
                    <AccordionDetails>
                        <DELayerControls text={layerInfos[index]} layer={layer} workspace={props.workspace} setWorkspace={props.setWorkspace}/>
                        <DECard
                            content={
                                <box>
                                </box>
                            }>
                        </DECard>
                    </AccordionDetails>
                </Accordion>
            </Paper>
        </div>
    );
}