import React, { useState } from "react";
import { keyToDisplay, valueToDisplay, keyValueIsValid } from "./PopupUtils";
import { Table, TableContainer, TableHead, TableCell, TableRow, TableBody, Paper, makeStyles, Tooltip } from "@material-ui/core";
import PaletteIcon from '@material-ui/icons/Palette';
import useHover from "../hooks/useHover";
import PopupTableValue from "./PopupTableValue";

const useStyles = makeStyles({
    root: {
        cursor: 'pointer'
    }
});

export default function PopupTableEntry({ obj, keyValue, value }) {
    //console.log({ obj, keyValue })
    const classes = useStyles()
    const [hoverRef, isHovered] = useHover();
    const [currentColorField, setCurrentColorField] = useState(obj.properties.colorInfo.currentColorFieldName);
    const changeColorField = obj.properties.colorInfo.updateColorFieldName;

    return <TableRow key={keyValue} className={classes.root} ref={hoverRef} onClick={() => {
        if (currentColorField !== keyValue) {
            changeColorField(keyValue)
            setCurrentColorField(keyValue)
        }
    }}>
        <TableCell component="th" scope="row">
            {keyToDisplay(obj, keyValue)}
        </TableCell>
        <TableCell><PopupTableValue obj={obj} keyValue={keyValue} value={value} currentColorField={currentColorField} isHovered={isHovered} /></TableCell>
    </TableRow>
}