import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Button, Checkbox, IconButton, Paper, Switch} from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import {ChangeHistory, CheckBox} from "@material-ui/icons";

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
                        {/*<FormControlLabel*/}
                        {/*    aria-label="CheckLayer"*/}
                        {/*    onClick={(event) => event.stopPropagation()}*/}
                        {/*    onFocus={(event) => event.stopPropagation()}*/}
                        {/*    onChange={handleChange}*/}
                        {/*    control={<CheckBox color="primary"/>}*/}
                        {/*    name="fav"*/}
                        {/*    //Make this checkbox a heart icon*/}
                        {/*/>*/}
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
                        {props.content}
                    </AccordionDetails>
                </Accordion>
            </Paper>
        </div>
    );
}