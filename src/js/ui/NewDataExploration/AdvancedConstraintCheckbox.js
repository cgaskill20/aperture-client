import React, {useState} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function updateActiveConstraints(activeConstraints, setActiveConstraints, index) {
    let tempActiveConstraints = [...activeConstraints];
    tempActiveConstraints[index] = !tempActiveConstraints[index];
    setActiveConstraints(tempActiveConstraints);
}

export default function AdvancedConstraintCheckbox(props) {
    const [state, setState] = useState({
        checked: props.activeConstraints[props.index],
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        // updateActiveConstraints(props.activeConstraints, props.setActiveConstraints, props.index);
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