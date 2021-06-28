import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Query from "../../library/Query";
import { ResponsiveLine } from '@nivo/line'

const useStyles = makeStyles({
    root: {
        height: '400px'
    }
});

export default function PopupTimeChart({ collection, join, fieldToChart }) {
    const [data, setData] = useState([]);

    useEffect(async () => {
        const pipe = [
            { $match: join },
            { $sample: { size: 3 } },
            { $project: { [fieldToChart]: 1, epoch_time: 1 } }
        ];
        console.log(JSON.stringify(pipe))
        const d = await Query.makeQuery({
            collection,
            pipeline: pipe
        })
        console.log(d)
    }, []);

    const classes = useStyles();

    return <div className={classes.root}>

    </div>
}