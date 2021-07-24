import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import IndividualModelingCheckbox from "./IndividualModelingCheckbox";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(1),
    },
}));

export default function ModelingCheckbox(props) {
    const classes = useStyles();

    function getFeatures() {
        let allFeatures = [];
        props.features.forEach((feature, index) => {
            allFeatures.push(<IndividualModelingCheckbox key={index} feature={feature} />)
        })
        return allFeatures;
    }

    return (
        <div className={classes.root}>
            <FormControl className={classes.formControl}>
                <FormLabel>{props.featuresTitle}</FormLabel>
                <FormGroup>
                    {getFeatures()}
                </FormGroup>
            </FormControl>
        </div>
    );
}