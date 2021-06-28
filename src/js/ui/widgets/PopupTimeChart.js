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
            { $sample: { size: 100 } },
            { $project: { [fieldToChart]: 1, epoch_time: 1, [Object.keys(join)[0]]: 1 } }
        ];
        const d = await Query.makeQuery({
            collection,
            pipeline: pipe,
            dontLink: true
        })
        setData(d.data.map(p => {
            if(typeof p.epoch_time === 'object'){
                p.epoch_time = p.epoch_time.$numberLong ? Number(p.epoch_time.$numberLong) : Number(p.epoch_time.$numberDecimal)
            }
            return { x: p.epoch_time, y: p[fieldToChart] }
        }))
    }, []);

    const classes = useStyles();

    return <div className={classes.root}>
        <ResponsiveLine
            data={[
                {
                    id: collection,
                    data
                }
            ]}
        />
    </div>
}