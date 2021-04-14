import React, { Component, useEffect, useState } from 'react';
import { Alert } from 'reactstrap';
import AutoQuery from '../library/autoQuery';

function useBlockers() {
    const [blockers, setBlockers] = useState(AutoQuery.blockers);

    useEffect(() => {
        function handleBlockersChange(blockers) {
            console.log(blockers)
            setBlockers(blockers);
        }

        AutoQuery.addBlockerListener(handleBlockersChange);
        //cleanup the hook
        return () => {

        }
    });

    return blockers;
}

export default function DefensiveOptimization(props) {
    const blockers = useBlockers();
    console.log(blockers)
    return <div className={"warningContainer"}>

    </div>
}