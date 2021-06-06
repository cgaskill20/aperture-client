import React, {useEffect, useRef, useState} from "react";
import * as d3 from 'd3';
import { ResponsiveBar} from "nivo";
import '../../../css/nivochart.css'

export default function Histogram(props) {
    let data = [ { "country": "AD", "hot dog": 168, "hot dogColor": "hsl(221, 70%, 50%)", "burger": 176, "burgerColor": "hsl(144, 70%, 50%)", "sandwich": 157, "sandwichColor": "hsl(158, 70%, 50%)", "kebab": 141, "kebabColor": "hsl(242, 70%, 50%)", "fries": 50, "friesColor": "hsl(268, 70%, 50%)", "donut": 175, "donutColor": "hsl(209, 70%, 50%)" }, { "country": "AE", "hot dog": 193, "hot dogColor": "hsl(141, 70%, 50%)", "burger": 179, "burgerColor": "hsl(242, 70%, 50%)", "sandwich": 191, "sandwichColor": "hsl(307, 70%, 50%)", "kebab": 146, "kebabColor": "hsl(210, 70%, 50%)", "fries": 118, "friesColor": "hsl(196, 70%, 50%)", "donut": 55, "donutColor": "hsl(14, 70%, 50%)" }, { "country": "AF", "hot dog": 197, "hot dogColor": "hsl(320, 70%, 50%)", "burger": 23, "burgerColor": "hsl(52, 70%, 50%)", "sandwich": 175, "sandwichColor": "hsl(185, 70%, 50%)", "kebab": 155, "kebabColor": "hsl(150, 70%, 50%)", "fries": 110, "friesColor": "hsl(170, 70%, 50%)", "donut": 51, "donutColor": "hsl(213, 70%, 50%)" }, { "country": "AG", "hot dog": 88, "hot dogColor": "hsl(36, 70%, 50%)", "burger": 78, "burgerColor": "hsl(175, 70%, 50%)", "sandwich": 20, "sandwichColor": "hsl(327, 70%, 50%)", "kebab": 5, "kebabColor": "hsl(352, 70%, 50%)", "fries": 57, "friesColor": "hsl(119, 70%, 50%)", "donut": 41, "donutColor": "hsl(63, 70%, 50%)" }, { "country": "AI", "hot dog": 122, "hot dogColor": "hsl(347, 70%, 50%)", "burger": 138, "burgerColor": "hsl(305, 70%, 50%)", "sandwich": 107, "sandwichColor": "hsl(35, 70%, 50%)", "kebab": 91, "kebabColor": "hsl(127, 70%, 50%)", "fries": 149, "friesColor": "hsl(192, 70%, 50%)", "donut": 50, "donutColor": "hsl(178, 70%, 50%)" }, { "country": "AL", "hot dog": 178, "hot dogColor": "hsl(141, 70%, 50%)", "burger": 30, "burgerColor": "hsl(180, 70%, 50%)", "sandwich": 144, "sandwichColor": "hsl(317, 70%, 50%)", "kebab": 75, "kebabColor": "hsl(119, 70%, 50%)", "fries": 49, "friesColor": "hsl(235, 70%, 50%)", "donut": 188, "donutColor": "hsl(51, 70%, 50%)" }, { "country": "AM", "hot dog": 199, "hot dogColor": "hsl(233, 70%, 50%)", "burger": 64, "burgerColor": "hsl(74, 70%, 50%)", "sandwich": 95, "sandwichColor": "hsl(131, 70%, 50%)", "kebab": 190, "kebabColor": "hsl(174, 70%, 50%)", "fries": 22, "friesColor": "hsl(192, 70%, 50%)", "donut": 153, "donutColor": "hsl(274, 70%, 50%)" } ]


    return (
            <ResponsiveBar
                data={data}
                keys={[ 'hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut' ]}
                indexBy="country"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'fries'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'sandwich'
                        },
                        id: 'lines'
                    }
                ]}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'country',
                    legendPosition: 'center',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'food',
                    legendPosition: 'center',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />
        )
}
