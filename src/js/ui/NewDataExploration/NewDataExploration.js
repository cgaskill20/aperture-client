import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DECheckbox from "./DECheckbox"
import DESlider from "./DESlider"
import DESearchBar from './DESearchBar'
import DEAccordion from "./DEAccordion";
import DECard from "./DECard";

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

export default function NewDataExploration() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <DESearchBar />
            <DEAccordion
                title="Future Heatwaves"
                content={
                    <box>
                        <DECard
                            content={
                                <box>
                                    <DECheckbox title="Heatwaves Checkbox 1" />
                                    <DECheckbox title="Heatwaves Checkbox 2" />
                                    <DECheckbox title="Heatwaves Checkbox 3" />
                                </box>
                            }
                        />
                        <DECard
                            content={
                                <box>
                                    <DESlider title="Heatwaves Slider 1" />
                                    <DESlider title="Heatwaves Slider 2" />
                                </box>
                            }
                        />
                    </box>
                }
            />
            <DEAccordion
                title="Median Tract Income"
                content={
                    <box>
                        <DECard
                            content={
                                <box>
                                    <DECheckbox title="Median Income Checkbox 1" />
                                    <DECheckbox title="Median Income Checkbox 2" />
                                    <DECheckbox title="Median Income Checkbox 3" />
                                    <DECheckbox title="Median Income Checkbox 4" />
                                </box>
                            }
                        />
                        <DECard
                            content={
                                <box>
                                    <DESlider title="Median Income Slider 1" />
                                    <DESlider title="Median Income Slider 2" />
                                </box>
                            }
                        />
                    </box>
                }
            />
        </div>
    );
}