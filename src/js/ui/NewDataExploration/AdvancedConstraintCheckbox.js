import React, {useState} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function updateActiveConstraints(activeConstraints, setActiveConstraints, index) {
    let tempActiveConstraints = [...activeConstraints];
    tempActiveConstraints[index] = !tempActiveConstraints[index];
    setActiveConstraints(tempActiveConstraints);
}

function updateLayerConstraints(constraints, setConstraints, isChecked, constraint) {
    let tempConstraints = [...constraints];
    if(!isChecked) {
        tempConstraints.push(constraint);
    }
    else {
        tempConstraints.splice(findIndexOfConstraint(constraint, constraints), 1);
    }
    setConstraints(tempConstraints);
}

function findIndexOfConstraint(constraint, constraints) {
    for(let i = 0; i < constraints.length; i++) {
        if(constraints[i].label === constraint.label) {
            console.log({i});
            return i;
        }
    }
}

export default function AdvancedConstraintCheckbox(props) {
    const [state, setState] = useState({
        checked: props.activeConstraints[props.index],
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        updateActiveConstraints(props.activeConstraints, props.setActiveConstraints, props.index);
        if(props.constraint.type === "slider") {
            updateLayerConstraints(props.sliders, props.setSliders, state.checked, props.constraint)
        }
        else if(props.constraint.type === "multiselector") {
            updateLayerConstraints(props.checkboxes, props.setCheckboxes, state.checked, props.constraint)
        }
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