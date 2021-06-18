import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';

export default function KDEWrapper(props) {
    let [bandwidth, setBandwidth] = useState(0.1);

    const handleChange = (event, newValue) => setBandwidth(newValue);

    return (
        <div>
            <Slider 
                value={bandwidth}
                onChange={handleChange}
                aria-labelledby="input-slider"
            />
            { props.children }
        </div>
    );
}
