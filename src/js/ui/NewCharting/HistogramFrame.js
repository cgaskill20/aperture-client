import React, { useState, useEffect } from 'react';
import Histogram from '../../library/charting/histogram';

export default function HistogramFrame(props) {
    const [id, setId] = useState(`histogram-frame-${Math.random().toString(36).substring(2, 6)}`);
    const [data, setData] = useState({});
    const [chart, setChart] = useState(new Histogram());

    useEffect(() => {
        
    });

    return (
        <div id={id}></div>
    );
}
