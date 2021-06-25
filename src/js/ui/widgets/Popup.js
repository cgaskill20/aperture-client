import { useState } from "react";
import { Table, TableContainer, TableHead, TableCell, Paper } from "@material-ui/core";

export default function Popup() {
    const [obj, setObj] = useState({});

    const useStyles = makeStyles({
        table: {
          width: '98%',
        },
    });

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
                        <TableCell component="th" scope="row">
                            {key}
                        </TableCell>
                        <TableCell align="right">{value}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>;
}