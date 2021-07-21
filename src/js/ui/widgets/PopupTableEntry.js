import React, { useEffect, useState } from "react";
import { keyToDisplay, valueToDisplay, keyValueIsValid } from "./PopupUtils";
import { Table, TableContainer, TableHead, TableCell, TableRow, TableBody, Paper, makeStyles, Tooltip } from "@material-ui/core";
import PaletteIcon from '@material-ui/icons/Palette';
import useHover from "../hooks/useHover";
import PopupTableValue from "./PopupTableValue";

const useStyles = makeStyles({
    clickable: {
        cursor: 'pointer',
        "&:hover": {
            backgroundColor: '#dedede'
        }
    }
});

export default React.memo(function PopupTableEntry({ obj, keyValue, value, currentColorField }) {
    //console.log({ obj, keyValue })
    const classes = useStyles()
    const [hoverRef, isHovered] = useHover();
    const changeColorFieldName = obj.properties.colorInfo.validColorFieldNames.includes(keyValue) ? obj.properties.colorInfo.updateColorFieldName : null;


    return <TableRow key={keyValue} className={changeColorFieldName !== null ? classes.clickable : ''} ref={hoverRef} onClick={() => {
        if (changeColorFieldName && currentColorField?.name !== keyValue) {
            changeColorFieldName(keyValue)
        }
    }}>
        <TableCell component="th" scope="row">
            {keyToDisplay(obj, keyValue)}
        </TableCell>
        <TableCell>
            <PopupTableValue obj={obj} keyValue={keyValue} value={value} currentColorField={currentColorField} isHovered={changeColorFieldName != null && isHovered} />
        </TableCell>
    </TableRow>
});