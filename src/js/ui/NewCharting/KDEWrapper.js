import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';

export default function KDEWrapper(props) {
    let [enabled, setEnabled] = useState(false)
    let [bandwidth, setBandwidth] = useState(0.1);

    const handleChange = setter => (event, newValue) => setter(newValue);

    return (
        <div>
            <Checkbox
                onChange={handleChange(setEnabled)}
                checked={enabled}
            />
            <Slider 
                value={bandwidth}
                onChange={handleChange(setBandwidth)}
                aria-labelledby="input-slider"
            />
            {React.Children.map(props.children, child =>
                React.cloneElement(child, { bandwidth: bandwidth, kdeEnabled: enabled })
            )}
        </div>
    );
}
