import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DECheckbox from "./DECheckbox"
import DESlider from "./DESlider"
import DESearchBar from './DESearchBar'
import DEAccordion from "./DEAccordion";
import DECard from "./DECard";
import DELayerControls from "./DELayerControls";
import HandleConstraints from "./HandleConstraints"

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

    let HWConstraints = {
        temperature: {
            title: "Temperature",
            type: "slider",
            min: 0,
            max: 120
        },
        someCheckbox: {
            title: "Heatwave Box 1",
            type: "checkbox",
        },
        someOtherCheckbox: {
            title: "Heatwave Box 2",
            type: "checkbox"
        }
    };

    let MIConstraints = {
        yearlyIncome: {
            title: "Yearly Income",
            type: "slider",
            min: 0,
            max: 300000
        }
    };

    let PSConstraints = {
        numStudents: {
            title: "Number of Students",
            type: "slider",
            min: 0,
            max: 3000
        },
        numFaculty: {
            title: "Number of Faculty",
            type: "slider",
            min: 1,
            max: 200
        },
        preK: {
            title: "Pre-K",
            type: "checkbox"
        },
        kindergarten: {
            title: "Kindergarten",
            type: "checkbox"
        },
        middle: {
            title: "Middle",
            type: "checkbox"
        },
        high: {
            title: "High",
            type: "checkbox"
        },
        college: {
            title: "College",
            type: "checkbox"
        }
    };

    let SVIConstraints = {
        svi: {
            title: "SVI",
            type: "slider",
            min: 0,
            max: 1
        }
    };

    let HWAccordion = {
            datasetName: "Future Heatwaves",
            constraints: HWConstraints,
            checkboxes: HWCheckboxes,
            sliders: HWSliders,
            url: "https://urban-sustain.org/services/operationalDatasets.php#climate"
        };

    let MIAccordion = {
            datasetName: "Median Household Income",
            constraints: MIConstraints,
            checkboxes: MICheckboxes,
            sliders: MISliders,
            url: "https://urban-sustain.org/services/operationalDatasets.php#census"
        };

    let PSAccordion = {
            datasetName: "Public Schools",
            constraints: PSConstraints,
            checkboxes: PSCheckboxes,
            sliders: PSSliders,
            url: "https://urban-sustain.org/services/operationalDatasets.php#schools"
        };

    let SVIAccordion = {
            datasetName: "SVI",
            constraints: SVIConstraints,
            checkboxes: SVICheckboxes,
            sliders: SVISliders,
            text: "Social Vulnerability Index is calculated by the....yada yada yada. ",
            url: "https://urban-sustain.org/services/operationalDatasets.php#census"
        };

    let Layers = [HWAccordion, MIAccordion, PSAccordion, SVIAccordion];

    return (
        <div className={classes.root}>
            <DESearchBar />
            {Layers.map((dataset, index) =>
                <div key={index}>
                    <DEAccordion title={dataset.datasetName}
                        content={
                            <box>
                                <DELayerControls text={dataset.text} url={dataset.url}/>
                                {/*{dataset.constraints.map((constraint, index) =>*/}
                                {/*    <HandleConstraints constraint={constraint} index={index}/>*/}
                                {/*)}*/}
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