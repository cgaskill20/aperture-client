import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Query from "../../library/Query";
import { ResponsiveLine } from '@nivo/line'

const useStyles = makeStyles({
    root: {
        height: '400px'
    }
});

export default function PopupTimeChart({ collection, fieldToChart }) {
    const [data,setData] = useState([]);

    const classes = useStyles();

    return <div className={classes.root}>

    </div>
}