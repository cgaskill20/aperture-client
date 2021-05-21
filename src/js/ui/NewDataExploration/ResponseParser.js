import React from 'react';
import AutoMenu from "../../library/autoMenu";
import Util from "../../library/apertureUtil";

export let finalData;
export let nested_json_map ={};
export let layerNames = [];

$.getJSON("src/json/menumetadata.json", async function (mdata) {
    finalData = await AutoMenu.build(mdata, overwrite);
    makeNested(finalData);
});

function overwrite() {}

function loopJSON(json) {
    for(const obj in json) {
        for(const header in json[obj]) {
            for(const layer in json[obj][header]) {
                const layerLabel = Util.capitalizeString(Util.underScoreToSpace(json[obj][header][layer].label ? json[obj][header][layer].label : layer));
                layerNames.push(layerLabel);
            }
        }
    }
}

function makeNested(json_map) {
    // let nested_json_map = {};
    for (const obj in json_map) {
        if (json_map[obj]["notAQueryableLayer"]) {
            continue;
        }
        const mergeWithDefalt = {
            ...DEFAULT_OBJECT,
            ...json_map[obj]
        };
        if (!nested_json_map[mergeWithDefalt["group"]]) {
            nested_json_map[mergeWithDefalt["group"]] = {};
        }
        if (!nested_json_map[mergeWithDefalt["group"]][mergeWithDefalt["subGroup"]]) {
            nested_json_map[mergeWithDefalt["group"]][mergeWithDefalt["subGroup"]] = {};
        }
        nested_json_map[mergeWithDefalt["group"]][mergeWithDefalt["subGroup"]][obj] = mergeWithDefalt;
    }
    // nested_json_map = columnsAndHeadings;
    loopJSON(nested_json_map);

    // for(const obj in nested_json_map) {
    //     for(const header in nested_json_map[obj]) {
    //         for(const layer in nested_json_map[obj][header]) {
    //             const layerLabel = Util.capitalizeString(Util.underScoreToSpace(nested_json_map[obj][header][layer].label ? nested_json_map[obj][header][layer].label : layer));
    //             layerNames.push(layerLabel);
    //         }
    //     }
    // }
    console.log("layerNames from ResponseParser.js(): " + layerNames)
}

