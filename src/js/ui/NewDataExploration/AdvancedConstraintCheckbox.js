import React, {useState} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {componentIsRendering} from "../TabSystem";

function updateLayerConstraints(activeLayerConstraints, index) {
    let tempActiveConstraints = [...activeLayerConstraints];
    tempActiveConstraints[index] = !tempActiveConstraints[index];
    return tempActiveConstraints;
}

export default function AdvancedConstraintCheckbox(props) {
    const [check, setCheck] = useState(props.activeLayerConstraints[props.constraintIndex]);

    if(componentIsRendering) {console.log("|AdvancedContraintCheckbox Rerending|")}
    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={check}
                        onChange={() => {
                            setCheck(!check);
                            props.setActiveLayerConstraints(updateLayerConstraints(props.activeLayerConstraints, props.constraintIndex));
                        }}
                        color="primary"
                    />
                }
                label={props.constraint.label}
            />
        </FormGroup>
    );
}