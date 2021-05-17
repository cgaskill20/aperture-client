import React, { Component, useEffect, useState } from 'react';
import { Alert } from 'reactstrap';
import AutoQuery from '../../library/autoQuery';


function renderAlert(blocker, text, key) {
    if (blocker) {
        return <Alert color={"danger"} style={{
            width: "445px"
        }} key={key}>
            {text}
        </Alert>
    }
}

function makeWarningText(resolution) {
    return `Can't query ${resolution} at this zoom level, please zoom in.`
}

function renderBlockers(blockers) {
    return Object.keys(blockers).filter(b => { return blockers[b] }).map(b => {
        return renderAlert(blockers[b], makeWarningText(b), Object.keys(blockers).indexOf(b))
    });
}

export default function DefensiveOptimization(props) {
    const [blockers, setBlockers] = useState(AutoQuery.blockers);
    useEffect(() => {
        AutoQuery.setBlockerListener((newBlockers) => { setBlockers({ ...newBlockers }) });
    });

    const HEIGHT_EXTRA_LINE = 24;
    const extraLineHeight = Object.keys(blockers).filter(curr => { 
        return curr.length > 9 && blockers[curr]
    }).length * HEIGHT_EXTRA_LINE;
    const HEIGHT_PER_ALERT = 66;
    const height = (Object.values(blockers)
        .map(curr => { return Number(curr !== 0) })
        .reduce((acc, curr) => {
            return acc + curr;
        }, 0) * HEIGHT_PER_ALERT + extraLineHeight).toString() + "px";
        
    return <div className={"warningContainer"} style={{ height: height }}>
        {renderBlockers(blockers)}
    </div>
}