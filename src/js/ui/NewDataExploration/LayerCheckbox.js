import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function LayerCheckbox(props) {
    const [state, setState] = React.useState({
        checkedMe: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={state.checkedMe}
                        onChange={handleChange}
                        name="checkedMe"
                        color="primary"
                    />
                }
                label={props.constraint}
            />
        </FormGroup>
    );
}