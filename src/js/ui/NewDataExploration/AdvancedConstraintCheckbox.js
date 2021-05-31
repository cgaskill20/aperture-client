import React, {useState} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function updateActiveConstraints(activeConstraints, layerIndex, index) {
    let tempActiveConstraints = [...activeConstraints];
    tempActiveConstraints[layerIndex][index] = !tempActiveConstraints[layerIndex][index];
    return tempActiveConstraints;
}

export default function AdvancedConstraintCheckbox(props) {
    const [state, setState] = useState({
        checked: props.activeConstraints[props.layerIndex][props.index],
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        // props.setActiveConstraints(updateActiveConstraints(props.activeConstraints, props.layerIndex, props.index));
    };

    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={state.checked}
                        onChange={handleChange}
                        name="checked"
                        // name={`adv-check-${props.constraint}`}
                        color="primary"
                    />
                }
                label={props.constraint.label}
            />
        </FormGroup>
    );
}