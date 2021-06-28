import React, { useEffect, useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Query from "../../library/Query";
import { ResponsiveLineCanvas } from '@nivo/line'

const useStyles = makeStyles({
    root: {
        height: '300px'
    }
});

//react.memo means this wont re-render unless the props change
export default React.memo(function PopupTimeChart({ collection, join, fieldToChart, temporalRange }) {
    const [data, setData] = useState([]);
    console.log({join})
    useEffect(async () => {
        console.log("requery")
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
    }, []);

    const classes = useStyles();

    const renderChart = (data) => {
        if (data.length) {
            return <ResponsiveLineCanvas
                data={[
                    {
                        id: collection,
                        data
                    }
                ]}
                margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                curve="natural"
                axisTop={null}
                isInteractive={true}
                enablePoints={data.length < 50}
                enableGridX={false}
                enableGridY={false}
            />
        }
    }

    return <div className={classes.root}>
        {renderChart(data)}
    </div>
});