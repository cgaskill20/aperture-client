import React from "react";
import { valueToDisplay } from "./PopupUtils";
import { Table, TableContainer, TableHead, TableCell, TableRow, TableBody, Paper, makeStyles, Tooltip } from "@material-ui/core";
import PaletteIcon from '@material-ui/icons/Palette';

const useStyles = makeStyles({
    root: {
        display: 'flex'
    }
});

export default function PopupTableValue({ obj, keyValue, value }) {
    console.log({ obj, keyValue })

    const colorIcon = () => {
        if (obj.properties.colorInfo.currentColorFieldName === keyValue) {
            return <Tooltip title="Color coding is based on this field.">
                <PaletteIcon />
            </Tooltip>;
        }
    }

    return <div>
        {valueToDisplay(obj, keyValue, value)}
        {colorIcon()}

    </div>
}