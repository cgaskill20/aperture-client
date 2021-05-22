export const testingConstants = [
    {title: 'Future Heatwaves'},
    {title: 'Median Tract Income'},
    {title: 'Median County Income'},
    {title: 'National Risk Index'},
    {title: 'Public Schools'},
    {title: 'Flood Zones'},
    {title: 'Electrical Substations'},
    {title: 'Hospitals'},
    {title: 'Public Schools'},
    {title: 'Median Tract Race'},
    {title: 'Median County Race'},
    {title: 'Fire Stations'},
    {title: 'Urgent Care Facilities'},
    {title: 'Power Plants'},
    {title: 'Electrical Transmission Lines'},
    {title: 'Natural Gas Pipelines'},
    {title: 'Surface Water'},
    {title: 'Climate & Atmospheric'},
    {title: 'Air Quality Index'},
    {title: 'US Census'},
    {title: 'Dams'},
    {title: 'SVI'},
];

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
    url: "https://urban-sustain.org/services/operationalDatasets.php#census"
};

export const Layers = [HWAccordion, MIAccordion, PSAccordion, SVIAccordion];

export const tempArray = [
    {
        title: "Checkbox 1",
        type: "checkbox"
    },
    {
        title: "Checkbox 2",
        type: "checkbox"
    },
    {
        title: "Checkbox 3",
        type: "checkbox"
    },
    {
        title: "Slider 1",
        type: "slider",
        min: 0,
        max: 100
    },
    {
        title: "Slider 2",
        type: "slider",
        min: 23,
        max: 653
    },
]