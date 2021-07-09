import Util from "../../library/apertureUtil";
import fipsToState from "../../../json/fipsToState.json"
import defaultImportantFields from "../../../json/defaultImportantFields.json"
import ScheduleIcon from '@material-ui/icons/Schedule';
import { Tooltip, Typography } from "@material-ui/core";
import React from "react";

export const keyToDisplay = (obj, key) => {
    if (obj?.meta?.[key]?.label) {
        return obj.meta[key].label;
    }
    if (defaultImportantFields[key]) {
        return defaultImportantFields[key].label ?? Util.cleanUpString(key);
    }

    return Util.cleanUpString(key);
}

export const valueToDisplay = (obj, key, value) => {
    let unit = obj?.meta?.[key]?.unit;
    if (unit?.toUpperCase() === 'NA') {
        unit = null;
    }

    if (obj?.meta?.[key]?.isDate) {
        return dateToDisplay(value);
    }
    else if (defaultImportantFields[key]?.type && !['string', 'number'].includes(defaultImportantFields[key]?.type)) {
        return specialTypeToDisplay(defaultImportantFields[key].type, value);
    }
    else if (['string', 'number'].includes(typeof value)) {
        return `${value}${unit ? ` ${Util.cleanUpString(unit)}` : ''}`;
    }
    else if (typeof value === 'object') {
        return mongoObjectToSomething(value, (s) => s);
    }
    else {
        return JSON.stringify(value);
    }
}

export const prependKey = (key, obj) => {
    if (obj?.meta?.[key]?.temporal) {
        return <div style={{ display: "inline-block" }}>
            <Tooltip title="This field is temporal">
                <ScheduleIcon />
            </Tooltip>
            <Typography>{Util.cleanUpString(key)}</Typography>
        </div>
    }
    return null;
}

export const keyValueIsValid = (key, value) => {
    if (['meta', 'id', '_id'].includes(key)) {
        return false;
    }
    return true;
}

const specialTypeToDisplay = (type, value) => {
    if (type === "stateFips") {
        return fipsToState[value];
    }
}

const mongoObjectToSomething = (object, func) => { //this function will be extended as more mongo objects leak in
    const numericTypes = ['$numberLong', '$numberDecimal'];
    for (const numericType of numericTypes) {
        if (object?.[numericType]) {
            return func(Number(object[numericType]));
        }
    }
    return JSON.stringify(object);
}

const dateToDisplay = (value) => {
    if (typeof value === 'number') {
        return epochToDateString(value);
    }
    else if (typeof value === 'object') {
        return mongoObjectToDateString(value);
    }
    return JSON.stringify(value)
}

const epochToDateString = (epoch) => {
    const str = new Date(epoch).toUTCString();
    return str.substr(0, str.length - 4);
}

const mongoObjectToDateString = (object) => {
    return mongoObjectToSomething(object, epochToDateString);
}