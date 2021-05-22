import React from 'react';
import AutoMenu from "../../library/autoMenu";
import Util from "../../library/apertureUtil";
import AutoQuery from "../../library/autoQuery";

export let finalData;
export let nested_json_map ={};
export let layerNames = [];
export let layerObjs = [];
export let layerQueriers = [];
export let layerInfos = [];
export let constraintNames = [];
export let constraintObjs = [];

const DEFAULT_OBJECT = {
    group: "Other",
    subGroup: "Other",
    color: "#000000",
    popup: null,
    constraints: null,
    map: function () { return window.map; }
}

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
                layerObjs.push(nested_json_map[obj][header][layer]);
                layerQueriers.push(new AutoQuery(nested_json_map[obj][header][layer])); //important
                layerInfos.push(nested_json_map[obj][header][layer].info == null ? "" : nested_json_map[obj][header][layer].info);
            }
        }
    }
}

function makeNested(json_map) {
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
    loopJSON(nested_json_map);
}

