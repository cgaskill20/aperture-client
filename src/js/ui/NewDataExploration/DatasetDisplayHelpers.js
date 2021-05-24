import React from 'react';
import IndividualLayer from "./IndividualLayer";

export function createSection(datasets, workspace, setWorkspace) {
    let layerSection = [];
    datasets.map((layer) =>
        layerSection.push(
            <IndividualLayer layer={layer} workspace={workspace}
                             setWorkspace={setWorkspace}/>
        )
    )
    return layerSection;
}
