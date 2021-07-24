import React, {useState} from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function IndividualModelingCheckbox(props) {
    const [checked, setChecked] = useState(true);

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    color="primary"
                />
            }
            label={props.feature}
        />
    );
}