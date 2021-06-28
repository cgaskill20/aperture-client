import React, { useEffect, useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Query from "../../library/Query";
import { ResponsiveLineCanvas } from '@nivo/line'
import Util from "../../library/apertureUtil";

const useStyles = makeStyles({
    root: {
        height: '300px'
    }
});

//react.memo means this wont re-render unless the props change
export default React.memo(function PopupTimeChart({ collection, join, fieldToChart, temporalRange }) {
    const [data, setData] = useState([]);

    useEffect(async () => {
        const pipe = [
            { $match: join },
            {
                $match:
                {
                    epoch_time: {
                        $gte: temporalRange[0],
                        $lte: temporalRange[1]
                    }
                }
            },
            { $sample: { size: 1000 } },
            { $project: { [fieldToChart]: 1, epoch_time: 1, [Object.keys(join)[0]]: 1 } }
        ];
        console.log({ pipe })
        const d = await Query.makeQuery({
            collection,
            pipeline: pipe,
            dontLink: true
        })
        setData(d.data.map(p => {
            if (typeof p.epoch_time === 'object') {
                p.epoch_time = p.epoch_time.$numberLong ? Number(p.epoch_time.$numberLong) : Number(p.epoch_time.$numberDecimal)
            }
            return { x: p.epoch_time, y: p[fieldToChart] }
        }).sort((a, b) => a.x - b.x));
        // .map(p => {
        //     p.x = new Date(p.x);
        //     return p;
        // }));
    }, []);

    const classes = useStyles();

    const renderChart = (data) => {
        if (data.length) {
            const bottomTicks = data.filter((d, i) => i % Math.floor(data.length / 4) === 0 || i === data.length - 1).map(d => d.x);
            console.log({bottomTicks})
            return <ResponsiveLineCanvas
                data={[
                    {
                        id: collection,
                        data
                    }
                ]}
                margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                curve="natural"
                axisTop={null}
                isInteractive={true}
                enablePoints={data.length < 50}
                enableGridX={false}
                enableGridY={false}
                axisLeft={{
                    legend: Util.cleanUpString(fieldToChart),
                    legendOffset: -31
                }}
                axisBottom={{
                    legend: "Date",
                    legendOffset: 36,
                    format: (value) => {
                        const offset = new Date(value).getTimezoneOffset() * 60000
                        return new Date(value + offset).toLocaleDateString("en-US");
                    },
                    tickValues: bottomTicks
                }}
            />
        }
    }

    return <div className={classes.root}>
        {renderChart(data)}
    </div>
});