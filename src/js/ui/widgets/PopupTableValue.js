import React, { useState } from "react";
import { valueToDisplay } from "./PopupUtils";
import { Table, TableContainer, TableHead, TableCell, TableRow, TableBody, Paper, makeStyles, Tooltip } from "@material-ui/core";
import PaletteIcon from '@material-ui/icons/Palette';
import useHover from "../hooks/useHover";

const useStyles = makeStyles({
    root: {
        display: 'flex'
    }
});

export default function PopupTableValue({ obj, keyValue, value, currentColorField, isHovered }) {
    //console.log({ obj, keyValue })
    const classes = useStyles()

    const colorIcon = () => {
        if (currentColorField.name === keyValue) {
            return <Tooltip title="Color coding is based on this field.">
                <PaletteIcon />
            </Tooltip>;
        }
        else if(isHovered){
            return <PaletteIcon color="disabled"/>
        }
    }

    return <div className={classes.root}>
        {valueToDisplay(obj, keyValue, value)}
        {colorIcon()}
    </div>
}
