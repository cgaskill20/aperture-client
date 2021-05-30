import React, {useState} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function ConstraintCheckbox(props) {
    const [state, setState] = useState({
        checked: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={state.checked}
                        onChange={handleChange}
                        name="checked"
                        // name={`check-${props.constraint}`}
                        color="primary"
                    />
                }
                label={props.constraint}
            />
        </FormGroup>
    );
}