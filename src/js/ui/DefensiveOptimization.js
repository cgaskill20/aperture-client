import React, { Component, useEffect, useState } from 'react';
import { Alert } from 'reactstrap';
import AutoQuery from '../library/autoQuery';

function renderAlert(blocker,text) {
    if (blocker) {
        return <Alert color={"danger"} style={{
            width: "430px"
        }}>
            {text}
        </Alert>
    }
}

export default function DefensiveOptimization(props) {
    const [blockers, setBlockers] = useState(AutoQuery.blockers);
    useEffect(() => {
        AutoQuery.setBlockerListener((newBlockers) => { setBlockers({...newBlockers}) });
    });

    return <div className={"warningContainer"}>
        {renderAlert(blockers.tract, "Can't Query Tracts at This Zoom Level, Please Zoom In")}
        {renderAlert(blockers.county, "Can't Query Counties at This Zoom Level, Please Zoom In")}
    </div>
}