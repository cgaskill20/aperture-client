import React from 'react';
import AutoMenu from "../../library/autoMenu";
import Util from "../../library/apertureUtil";

export let nested_json_map;
export let layerNames = [];

$.getJSON("src/json/menumetadata.json", async function (mdata) { //this isnt on the mongo server yet so query it locally
    const finalData = await AutoMenu.build(mdata, overwrite);
    makeNested(finalData);
});

function makeNested(json_map) {
    let columnsAndHeadings = {};
    for (const obj in json_map) {
        if (json_map[obj]["notAQueryableLayer"]) {
            continue;
        }
        const mergeWithDefalt = {
            //merge default and user-given object
            ...DEFAULT_OBJECT,
            ...json_map[obj]
        };
        if (!columnsAndHeadings[mergeWithDefalt["group"]]) {
            columnsAndHeadings[mergeWithDefalt["group"]] = {};
        }
        if (!columnsAndHeadings[mergeWithDefalt["group"]][mergeWithDefalt["subGroup"]]) {
            columnsAndHeadings[mergeWithDefalt["group"]][mergeWithDefalt["subGroup"]] = {};
        }
        columnsAndHeadings[mergeWithDefalt["group"]][mergeWithDefalt["subGroup"]][obj] = mergeWithDefalt;
    }
    nested_json_map = columnsAndHeadings;

    for(const obj in nested_json_map) {
        for(const header in nested_json_map[obj]) {
            for(const layer in nested_json_map[obj][header]) {
                const layerLabel = Util.capitalizeString(Util.underScoreToSpace(nested_json_map[obj][header][layer].label ? nested_json_map[obj][header][layer].label : layer));
                layerNames.push(layerLabel);
            }
        }
    }
}

