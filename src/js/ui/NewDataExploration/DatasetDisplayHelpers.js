import React from 'react';
import IndividualLayer from "./IndividualLayer";

export function createSection(datasets, workspace, setWorkspace,
                              booleanWorkspace, setBooleanWorkspace) {
    let layerSection = [];
    datasets.map((layer) =>
        layerSection.push(
            <IndividualLayer layer={layer} workspace={workspace} setWorkspace={setWorkspace}
                             booleanWorkspace={booleanWorkspace} setBooleanWorkspace={setBooleanWorkspace} datasets={datasets}/>
        )
    )
    return layerSection;
}
