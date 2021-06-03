import React, {useState, useEffect} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {componentIsRendering} from "../TabSystem";

export default function ConstraintCheckbox({constraintName, querier, option}) {
    const [check, setCheck] = useState(true);

    if(componentIsRendering) {console.log("|ContraintCheckbox Rerending|")}
    useEffect(() => {
        querier.updateConstraint(constraintName, option, check);
    }, []);
    return (
        <FormGroup id={`constraint-formGroup-${option}`}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={check}
                        onChange={() => { 
                            setCheck(!check)
                            querier.updateConstraint(constraintName, option, !check);
                        }}
                        id={`${option}`}
                        name={`${option}`}
                        color="primary"
                    />
                }
                label={option}
            />
        </FormGroup>
    );
}