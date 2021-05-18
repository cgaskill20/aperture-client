import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DECheckbox from "./DECheckbox"
import DESlider from "./DESlider"
import SearchIcon from '@material-ui/icons/Search';
import DESearchBar from './DESearchBar'
import {InputBase, TextField} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function DataExploration() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <DESearchBar/>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Future Heatwaves</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <DECheckbox title="Heatwaves Checkbox 1"/>
                    <DESlider title="Heatwaves Slider 1"/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>Median Income</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <DESlider title="Income Slider 1"/>
                </AccordionDetails>
            </Accordion>

        </div>
    );
}