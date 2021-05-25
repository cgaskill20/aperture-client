import React from 'react';
import IndividualLayer from "./IndividualLayer";

export function createSection(datasets, workspace, setWorkspace,
                              openLayers, setOpenLayers,
                              booleanWorkspace, setBooleanWorkspace) {
    let layerSection = [];
    datasets.map((layer) =>
        layerSection.push(
            <IndividualLayer layer={layer} workspace={workspace} setWorkspace={setWorkspace}
                             openLayers={openLayers} setOpenLayers={setOpenLayers}
                             booleanWorkspace={booleanWorkspace} setBooleanWorkspace={setBooleanWorkspace} datasets={datasets}/>
        )
    )
    return layerSection;
}
