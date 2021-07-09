import React from "react";
import { Table, TableContainer, TableHead, TableCell, TableRow, TableBody, Paper, makeStyles } from "@material-ui/core";
import { keyToDisplay, valueToDisplay, keyValueIsValid, prependKey } from "./PopupUtils";
import PopupTableValue from "./PopupTableValue";

const drawerWidth = '450px';

const useStyles = makeStyles({
    table: {
        maxWidth: drawerWidth,
    }
});

export default React.memo(function PopupTable({ keyValPairs, obj }) {
    const classes = useStyles();
    console.log(obj)
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
                            <TableCell>
                                <PopupTableValue keyName={key} value={value} obj={obj}/>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    </TableContainer>;
});