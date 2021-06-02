import React, {useState} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {componentIsRendering} from "../TabSystem";

function updateLayerConstraints(activeConstraints, index) {
    let tempActiveConstraints = [...activeConstraints];
    tempActiveConstraints[index] = !tempActiveConstraints[index];
    return tempActiveConstraints;
}

export default function AdvancedConstraintCheckbox(props) {
    const [check, setCheck] = useState(props.activeConstraints[props.index]);

    if(componentIsRendering) {console.log("|AdvancedContraintCheckbox Rerending|")}
    return (
        <FormGroup id={`advanced-constraint-formGroup-${props.layerIndex}-${props.index}`}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={check}
                        onChange={() => {
                            setCheck(!check);
                            props.setActiveConstraints(updateLayerConstraints(props.activeConstraints, props.index));
                        }}
                        id={`advanced-constraint-checkbox-${props.layerIndex}-${props.index}`}
                        name={`advanced-constraint-checkbox-${props.layerIndex}-${props.index}`}
                        color="primary"
                    />
                }
                label={props.constraint.label}
            />
        </FormGroup>
    );
}