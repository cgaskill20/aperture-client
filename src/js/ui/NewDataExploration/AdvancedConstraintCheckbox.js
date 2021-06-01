import React, {useState} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function updateLayerConstraints(layerConstraints, index) {
    let tempLayerConstraints = [...layerConstraints];
    tempLayerConstraints[index] = !tempLayerConstraints[index];
    return tempLayerConstraints;
}

export default function AdvancedConstraintCheckbox(props) {
    const [check, setCheck] = useState(props.layerConstraints[props.index]);

    return (
        <FormGroup id={`advanced-constraint-formGroup-${props.layerIndex}-${props.index}`}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={check}
                        onChange={() => {
                            setCheck(!check);
                            props.setLayerConstraints(updateLayerConstraints(props.layerConstraints, props.index));
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