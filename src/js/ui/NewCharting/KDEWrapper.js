import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';

const MIN_BANDWIDTH = 0.1
const MAX_BANDWIDTH = 10
const BANDWIDTH_STEP = 0.1

export default function KDEWrapper(props) {
    let [enabled, setEnabled] = useState(false)
    let [bandwidth, setBandwidth] = useState(0.1);

    const handleChange = setter => (event, newValue) => setter(newValue);
    const handleEvent = setter => event => {
        let value = event.target.value;
        setter(value === '' ? '' : Number(value));
    };
    const clampValue = (setter, value, min, max) => () => {
        if (value < min) {
            setter(min);
        } else if (value > max) {
            setter(max);
        }
    }

    return (
        <div>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Checkbox
                        onChange={handleChange(setEnabled)}
                        checked={enabled}
                    />
                </Grid>
                <Grid item xs>
                    <Slider 
                        value={bandwidth}
                        onChange={handleChange(setBandwidth)}
                        step={BANDWIDTH_STEP}
                        min={MIN_BANDWIDTH}
                        max={MAX_BANDWIDTH}
                        aria-labelledby="input-slider"
                    />
                </Grid>
                <Grid item xs>
                    <Input 
                        value={bandwidth}
                        onChange={handleEvent(setBandwidth)}
                        onBlur={clampValue(setBandwidth, bandwidth, MIN_BANDWIDTH, MAX_BANDWIDTH)}
                        inputProps={{
                            type: 'number',
                            step: BANDWIDTH_STEP,
                            min: MIN_BANDWIDTH,
                            max: MAX_BANDWIDTH,
                            'aria-labelledby': "input-slider"
                        }}
                    />
                </Grid>
            </Grid>
            {React.Children.map(props.children, child =>
                React.cloneElement(child, { bandwidth: bandwidth, kdeEnabled: enabled })
            )}
        </div>
    );
}
