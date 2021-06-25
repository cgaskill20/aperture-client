import React, { useEffect, useState } from "react";
import { Table, TableContainer, TableHead, TableCell, TableRow, TableBody, Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    table: {
        width: '98%',
    },
});

export default function Popup() {
    const [obj, setObj] = useState({});

    const classes = useStyles();

    useEffect(() => {
        window.setPopupObj = setObj;
        return () => { window.setPopupObj = () => { } };
    }, [])

    const makeTable = () => {
        return <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Key</TableCell>
                        <TableCell align="right">Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(obj).map(([key, value]) => (
                        <TableRow key={key}>
                            {console.log({ key, value })}
                            <TableCell component="th" scope="row">
                                {key}
                            </TableCell>
                            <TableCell align="right">{JSON.stringify(value)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    }

    return <>
        {makeTable()}
    </>;
}