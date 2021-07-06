import React, { useEffect, useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Query from "../../library/Query";
import { ResponsiveLineCanvas } from '@nivo/line'
import Util from "../../library/apertureUtil";
import { keyToDisplay } from "./PopupUtils";

const useStyles = makeStyles({
    root: {
        height: '300px'
    },
    tooltip: {
        backgroundColor: 'white',
        padding: '2.5px',
        borderRadius: '2.5px'
    }
});

//react.memo means this wont re-render unless the props change
export default React.memo(function PopupTimeChart({ collection, join, fieldToChart, temporalRange, obj }) {
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

    const epochTimeToShortString = (value) => {
        const offset = new Date(value).getTimezoneOffset() * 60000
        return new Date(value + offset).toLocaleDateString("en-US");
    }

    const classes = useStyles();

    const renderChart = (data) => {
        if (data.length) {
            const bottomTicks = data.filter((d, i) => i % Math.floor(data.length / 4) === 0 || i === data.length - 1).map(d => d.x);
            return <ResponsiveLineCanvas
                data={[
                    {
                        id: collection,
                        data
                    }
                ]}
                margin={{ top: 20, right: 50, bottom: 50, left: 50 }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                curve="cardinal"
                colors="rgb(27, 158, 119)"
                axisTop={null}
                isInteractive={true}
                enablePoints={data.length < 50}
                enableGridX={false}
                enableGridY={false}
                axisLeft={{
                    legend: keyToDisplay(obj, fieldToChart),
                    legendOffset: -39
                }}
                axisBottom={{
                    legend: "Date",
                    legendOffset: 36,
                    format: epochTimeToShortString,
                    tickValues: bottomTicks
                }}
                tooltip={(e) => {
                    return <div className={classes.tooltip}>
                        <Typography gutterBottom>{`Date: ${epochTimeToShortString(e.point.data.x)}`}</Typography>
                        <Typography>{`${keyToDisplay(obj, fieldToChart)}: ${e.point.data.y}`}</Typography>
                    </div>
                }}
            />
        }
    }

    return <div className={classes.root}>
        {renderChart(data)}
    </div>
});