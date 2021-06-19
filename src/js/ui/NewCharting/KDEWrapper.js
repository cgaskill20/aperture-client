import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';

export default function KDEWrapper(props) {
    let [enabled, setEnabled] = useState(false)
    let [bandwidth, setBandwidth] = useState(0.1);

    const handleChange = setter => (event, newValue) => setter(newValue);

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
                        aria-labelledby="input-slider"
                    />
                </Grid>
                <Grid item xs>
                    <Input 
                        value={bandwidth}
                        onChange={handleChange(setBandwidth)}
                        inputProps={{
                            type: 'number',
                            step: 0.1,
                            min: 0.1,
                            max: 10,
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
