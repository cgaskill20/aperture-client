import React, { useState } from "react";
import { keyToDisplay, valueToDisplay } from "./PopupUtils";
import { Select, MenuItem } from "@material-ui/core";

export default function PopupTableValue({ keyName, value, obj }) {
    const [isTemporal] = useState(obj?.meta?.[keyName]?.temporal != null);
    const [accumulatorOperator, setAccumulatorOperator] = useState('avg')

    if (!isTemporal) {
        return valueToDisplay(obj, keyName, value)
    }
    else {
        return <>
            {valueToDisplay(obj, keyName, obj.properties[`${keyName}_sus${accumulatorOperator}`])}
            <Select
                value={accumulatorOperator}
                onChange={(e) => {setAccumulatorOperator(e.target.value)}}
            >
                <MenuItem value={"avg"}>avg</MenuItem>
                <MenuItem value={"min"}>min</MenuItem>
                <MenuItem value={"max"}>max</MenuItem>
            </Select>
        </>
    }
}