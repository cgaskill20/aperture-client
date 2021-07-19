import React, { useEffect, useState } from "react";
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

export default React.memo(function PopupTableEntry({ obj, keyValue, value }) {
    //console.log({ obj, keyValue })
    const classes = useStyles()
    const [hoverRef, isHovered] = useHover();
    const [currentColorField, setCurrentColorField] = useState(obj.properties.colorInfo.currentColorFieldName);
    const changeColorField = obj.properties.colorInfo.validColorFieldNames.includes(keyValue) ? obj.properties.colorInfo.updateColorFieldName : null;

    useEffect(() => {
        obj.properties.colorInfo.subscribeToColorFieldNameChange(setCurrentColorField);
    }, [])

    return <TableRow key={keyValue} className={classes.root} ref={hoverRef} onClick={() => {
        if (changeColorField && currentColorField !== keyValue) {
            changeColorField(keyValue)
        }
    }}>
        <TableCell component="th" scope="row">
            {keyToDisplay(obj, keyValue)}
        </TableCell>
        <TableCell>
            <PopupTableValue obj={obj} keyValue={keyValue} value={value} currentColorField={currentColorField} isHovered={changeColorField != null && isHovered} />
        </TableCell>
    </TableRow>
});