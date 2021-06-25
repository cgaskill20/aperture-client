import React, { useEffect, useState } from "react";
import { Table, TableContainer, TableHead, TableCell, TableRow, TableBody, Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    table: {
        maxWidth: '300px',
    },
});

export default function Popup() {
    const [obj, setObj] = useState({});

    const classes = useStyles();

    useEffect(() => {
        window.setPopupObj = setObj;
        return () => { window.setPopupObj = () => { } };
    }, [])

    const keyValueIsValid = (key, value) => {
        if(key === 'meta'){
            return false;
        }
        return true;
    }

    const keyToDisplay = (key) => {
        if(obj?.meta?.[key]?.label){
            return obj.meta[key].label;
        }
        return key;
    }

    const makeTable = () => {
        if(!obj?.properties){
            return;
        }
        return <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><b>Key</b></TableCell>
                        <TableCell align="right"><b>Value</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(obj.properties)
                    .filter(([key, value]) => keyValueIsValid(key,value))
                    .map(([key, value]) => (
                        <TableRow key={key}>
                            <TableCell component="th" scope="row">
                                {keyToDisplay(key)}
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