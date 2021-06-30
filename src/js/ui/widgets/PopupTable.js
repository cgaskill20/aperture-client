import React, { useEffect, useState } from "react";
import { Table, TableContainer, TableHead, TableCell, TableRow, TableBody, Paper, makeStyles, Drawer, Typography, IconButton, Grid } from "@material-ui/core";
import { keyToDisplay, valueToDisplay, keyValueIsValid } from "./PopupUtils";

const drawerWidth = '450px';

const useStyles = makeStyles({
    table: {
        maxWidth: drawerWidth,
    }
});

export default function PopupTable({ keyValPairs, obj }) {
    const classes = useStyles();

    return <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell><b>Key</b></TableCell>
                    <TableCell><b>Value</b></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {keyValPairs
                    .filter(([key, value]) => keyValueIsValid(key, value))
                    .map(([key, value]) => (
                        <TableRow key={key}>
                            <TableCell component="th" scope="row">
                                {keyToDisplay(obj, key)}
                            </TableCell>
                            <TableCell>{valueToDisplay(obj, key, value)}</TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    </TableContainer>;
}