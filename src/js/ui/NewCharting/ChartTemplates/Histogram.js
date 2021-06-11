import React from "react";
import { Histogram, DensitySeries, BarSeries, withParentSize, XAxis, YAxis } from '@data-ui/histogram';
export default function HistogramGraph(props) {
    const ResponsiveHistogram = withParentSize(({ parentWidth, parentHeight, ...rest}) => (
        <Histogram
            width={parentWidth}
            height={parentHeight}
            {...rest}
        />
    ))




    // Random code trying to fix this issue, doesnt seem to work, ignore
    let doReturn = null
    if(props.selected) {
        const rawData = [];
        props.data['map_features'][props.selected].map(data=>{
                rawData.push(data['data'])
            })
        doReturn = <ResponsiveHistogram
            ariaLabel="My histogram of ..."
            orientation="vertical"
            cumulative={false}
            normalized={true}
            binCount={5}
            valueAccessor={datum => datum}
            binType="numeric"
            renderTooltip={({event, datum, data, color}) => (
                <div>
                    <strong style={{color}}>{datum.bin0} to {datum.bin1}</strong>
                    <div><strong>cumulative </strong>{datum.cumulative}</div>
                    <div><strong>density </strong>{datum.density}</div>
                    <div><strong>count </strong>{datum.count}</div>
                </div>
            )}
        >
            <BarSeries
                animated
                rawData={rawData /* or binnedData={...} */}
            />
            <XAxis/>
            <YAxis/>
        </ResponsiveHistogram>


    }
    else{

    }

        return (
            doReturn
        );
}
