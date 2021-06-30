import React, { useEffect, useState } from "react";
import { Table, TableContainer, TableHead, TableCell, TableRow, TableBody, Paper, makeStyles, Drawer, Typography, IconButton, Grid } from "@material-ui/core";

const useStyles = makeStyles({
    table: {
        maxWidth: drawerWidth,
    }
});

export default function PopupTable({ keyValPairs }) {
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
                                {keyToDisplay(key)}
                            </TableCell>
                            <TableCell>{valueToDisplay(key, value)}</TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    </TableContainer>;
}