import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DECheckbox from "./DECheckbox"
import DESlider from "./DESlider"
import DESearchBar from './DESearchBar'
import DEAccordion from "./DEAccordion";
import DECard from "./DECard";
import {Typography} from "@material-ui/core";

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

    let HWCheckboxes = ['Heatwaves Checkbox 1', 'Heatwaves Checkbox 2', 'Heatwaves Checkbox 3'];
    let HWSliders = ['Heatwaves Slider 1', 'Heatwaves Slider 2'];
    let MICheckboxes = ['Median Income Checkbox 1', 'Median Income Checkbox 2', 'Median Income Checkbox 3', 'Median Income Checkbox 4'];
    let MISliders = ['Median Income Slider 1', 'Median Income Slider 2', 'Median Income Slider 3'];
    let PSCheckboxes = ['Public Schools Checkbox 1', 'Public Schools Checkbox 2'];
    let PSSliders = ['Public Schools Slider 1', 'Public Schools Slider 2'];
    let SVICheckboxes = ['SVI Checkbox 1', 'SVI Checkbox 2', 'SVI Checkbox 3', 'SVI Checkbox 4'];
    let SVISliders = ['SVI Slider 1'];

    let HWAccordion = {
            datasetName: "Future Heatwaves",
            checkboxes: HWCheckboxes,
            sliders: HWSliders,
            url: "https://urban-sustain.org/services/operationalDatasets.php#climate"
        };

    let MIAccordion = {
            datasetName: "Median Household Income",
            checkboxes: MICheckboxes,
            sliders: MISliders,
            url: "https://urban-sustain.org/services/operationalDatasets.php#census"
        };

    let PSAccordion = {
            datasetName: "Public Schools",
            checkboxes: PSCheckboxes,
            sliders: PSSliders,
            url: "https://urban-sustain.org/services/operationalDatasets.php#schools"
        };

    let SVIAccordion = {
            datasetName: "SVI",
            checkboxes: SVICheckboxes,
            sliders: SVISliders,
            text: "Social Vulnerability Index is calculated by the....yada yada yada. ",
            url: "https://urban-sustain.org/services/operationalDatasets.php#svi"
        };

    let MasterArray = [HWAccordion, MIAccordion, PSAccordion, SVIAccordion];

    return (
        <div className={classes.root}>
            <DESearchBar />
            {MasterArray.map((dataset, index) =>
                <div key={index}>
                    <DEAccordion title={dataset.datasetName}
                        content={
                            <box>
                                <Typography>
                                    {dataset.text}
                                    Find more info about this <a href={dataset.url} target="_blank">dataset</a> on our website.
                                </Typography>
                                <DECard
                                    content={
                                        <box>
                                            {dataset.checkboxes.map((name) =>
                                                <DECheckbox title={name}/>
                                            )}
                                        </box>
                                    }>
                                </DECard>
                                <DECard
                                    content={
                                        <box>
                                            {dataset.sliders.map((name) =>
                                                <DESlider title={name}/>
                                            )}
                                        </box>
                                    }>
                                </DECard>
                            </box>
                        }>
                    </DEAccordion>
                </div>
            )}
        </div>
    );
}