import React, { Component, useEffect, useState } from 'react';
import { Alert } from 'reactstrap';
import AutoQuery from '../library/autoQuery';

function renderAlert(blocker, text) {
    console.log(blocker)
    if (blocker) {
        console.log("here")
        return <Alert color={"danger"} style={{
            width: "445px"
        }}>
            {text}
        </Alert>
    }
}

function makeWarningText(resolution){
    return `Can't query ${resolution} at this zoom level, please zoom in.`
}

function renderBlockers(blockers){
    return Object.keys(blockers).filter(b => {console.log({b,blockers}); return blockers[b]}).map(b => {
        console.log({b,blockers})
        return renderAlert(blockers[b], makeWarningText(b))
    });
}

export default function DefensiveOptimization(props) {
    const [blockers, setBlockers] = useState(AutoQuery.blockers);
    useEffect(() => {
        AutoQuery.setBlockerListener((newBlockers) => { console.log(newBlockers); setBlockers({ ...newBlockers }) });
    });

    const HEIGHT_PER_ALERT = 65;
    const height = (Object.values(blockers)
        .map(curr => { return Number(curr !== 0) })
        .reduce((acc, curr) => {
            return acc + curr;
        }, 0) * HEIGHT_PER_ALERT).toString() + "px";
    console.log(height)
    return <div className={"warningContainer"} style={{ height: height }}>
        {renderBlockers(blockers)}
    </div>
}