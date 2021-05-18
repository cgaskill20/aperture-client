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
import {Card, CardContent} from "@material-ui/core";
import theme from "../global/GlobalTheme";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    cardSpace: {
        margin: theme.spacing(1),
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
                        <Card className={classes.cardSpace} variant="outlined">
                            <CardContent>
                                <DECheckbox title="Heatwaves Checkbox 1" />
                                <DECheckbox title="Heatwaves Checkbox 2" />
                                <DECheckbox title="Heatwaves Checkbox 3" />
                            </CardContent>
                        </Card>

                        <Card className={classes.cardSpace} variant="outlined">
                            <CardContent>
                                <DESlider title="Heatwaves Slider 1" />
                                <DESlider title="Heatwaves Slider 2" />
                            </CardContent>
                        </Card>
                    </box>
                }
            />
            <DEAccordion
                title="Median Tract Income"
                content={
                    <box>
                        <Card className={classes.cardSpace} variant="outlined">
                            <CardContent>
                                <DECheckbox title="Median Income Checkbox 1" />
                                <DECheckbox title="Median Income Checkbox 2" />
                                <DECheckbox title="Median Income Checkbox 3" />
                                <DECheckbox title="Median Income Checkbox 4" />
                            </CardContent>
                        </Card>
                        <Card className={classes.cardSpace} variant="outlined">
                            <CardContent>
                                <DESlider title="Median Income Slider 1" />
                                <DESlider title="Median Income Slider 2" />
                            </CardContent>
                        </Card>
                    </box>
                }
            />
        </div>
    );
}