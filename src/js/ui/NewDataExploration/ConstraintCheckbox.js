import React, {useState} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {isComponentRerendering} from "../TabSystem";

export default function ConstraintCheckbox(props) {
    const [check, setCheck] = useState(true);

    if(isComponentRerendering) {console.log("|ContraintCheckbox Rerending|")}
    return (
        <FormGroup id={`constraint-formGroup-${props.constraint}`}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={check}
                        onChange={() => setCheck(!check)}
                        id={`${props.constraint}`}
                        name={`${props.constraint}`}
                        color="primary"
                    />
                }
                label={props.constraint}
            />
        </FormGroup>
    );
}