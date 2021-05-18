import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DECheckbox from "./DECheckbox"
import DESlider from "./DESlider"
import DESearchBar from './DESearchBar'
import DEAccordion from "./DEAccordion";

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
            <DEAccordion
                title="Future Heatwaves"
                content={
                    <box>
                        <DECheckbox title="Heatwaves Checkbox 1" />
                        <DECheckbox title="Heatwaves Checkbox 2" />
                        <DECheckbox title="Heatwaves Checkbox 3" />
                        <DESlider title="Heatwaves Slider 1" />
                        <DESlider title="Heatwaves Slider 2" />
                    </box>
                }
            />
            <DEAccordion
                title="Median Tract Income"
                content={
                    <box>
                        <DECheckbox title="Median Income Checkbox 1" />
                        <DECheckbox title="Median Income Checkbox 2" />
                        <DECheckbox title="Median Income Checkbox 3" />
                        <DECheckbox title="Median Income Checkbox 4" />
                        <DESlider title="Median Income Slider 1" />
                        <DESlider title="Median Income Slider 2" />
                    </box>
                }
            />
        </div>
    );
}