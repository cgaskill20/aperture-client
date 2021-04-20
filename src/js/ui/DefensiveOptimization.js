import React, { Component, useEffect, useState } from 'react';
import { Alert } from 'reactstrap';
import AutoQuery from '../library/autoQuery';

function renderAlert(blocker, text) {
    if (blocker) {
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

export default function DefensiveOptimization(props) {
    const [blockers, setBlockers] = useState(AutoQuery.blockers);
    useEffect(() => {
        AutoQuery.setBlockerListener((newBlockers) => { setBlockers({ ...newBlockers }) });
    });

    const HEIGHT_PER_ALERT = 65;
    const height = (Object.values(blockers)
        .map(curr => { return Number(curr !== 0) })
        .reduce((acc, curr) => {
            return acc + curr;
        }, 0) * HEIGHT_PER_ALERT).toString() + "px";

    return <div className={"warningContainer"} style={{ height: height }}>
        {renderAlert(blockers.tract, makeWarningText("tracts"))}
        {renderAlert(blockers.county, makeWarningText("counties"))}
    </div>
}