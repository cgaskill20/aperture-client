import React, { useEffect, useState } from 'react';
import {ResponsiveHeatMap} from "nivo";
const calculateCorrelation = require("calculate-correlation");


export default function heatmaptest(props) {
    let retData = {};
    let keys = [];
    let data = []

    if(props.data['map_features']) {
        for (const [key, value] of Object.entries(props.data['map_features'])) {
            if (value.length > 0) {
                keys.push(key.split("::")[2])
                data.push({"constraint": key.split("::")[2]});
                retData[key] = {};
                value.forEach(loc => {
                    retData[key][loc['locationName']] = loc.data;
                })
            }
        }
        let counter = 0;
        for (const [key, value] of Object.entries(retData)){
            let x = []
            let y = []
            for (const [key2, value2] of Object.entries(retData)){
                if(key == key2){
                    data[counter][key2] = 1;
                }
                for (const [key3, value3] of Object.entries(value)){
                    if(key3 in value2){
                        x.push(value3)
                        y.push(value2[key3])
                    }
                }
                const correlation = calculateCorrelation(x, y);
                console.log(typeof correlation)
                console.log(correlation)
                data[counter][key2.split("::")[2]] = correlation.toPrecision(2)
                console.log(correlation.toPrecision(2))
            }
            counter++;
        }
    }
       /* let data = [
            {
                "country": "AD",
                "hot dog": 75,
                "burger": 38,
                "sandwich": 28,
                "kebab": 77,
                "fries": 14,
                "donut": 25,
                "junk": 30,
                "sushi": 76,
                "ramen": 34,
                "curry": 28,
                "udon": 25
            },
            {
                "country": "AE",
                "hot dog": 14,
                "burger": 30,
                "sandwich": 40,
                "kebab": 76,
                "fries": 13,
                "donut": 42,
                "junk": 62,
                "sushi": 75,
                "ramen": 55,
                "curry": 59,
                "udon": 65
            },
            {
                "country": "AF",
                "hot dog": 46,
                "burger": 56,
                "sandwich": 91,
                "kebab": 68,
                "fries": 79,
                "donut": 59,
                "junk": 90,
                "sushi": 90,
                "ramen": 50,
                "curry": 92,
                "udon": 23
            },
            {
                "country": "AG",
                "hot dog": 2,
                "burger": 60,
                "sandwich": 15,
                "kebab": 70,
                "fries": 29,
                "donut": 97,
                "junk": 33,
                "sushi": 3,
                "ramen": 30,
                "curry": 37,
                "udon": 45,
            },
            {
                "country": "AI",
                "hot dog": 23,
                "hot dogColor": "hsl(85, 70%, 50%)",
                "burger": 24,
                "burgerColor": "hsl(1, 70%, 50%)",
                "sandwich": 0,
                "sandwichColor": "hsl(5, 70%, 50%)",
                "kebab": 54,
                "kebabColor": "hsl(126, 70%, 50%)",
                "fries": 52,
                "friesColor": "hsl(310, 70%, 50%)",
                "donut": 0,
                "donutColor": "hsl(186, 70%, 50%)",
                "junk": 25,
                "junkColor": "hsl(59, 70%, 50%)",
                "sushi": 21,
                "sushiColor": "hsl(313, 70%, 50%)",
                "ramen": 53,
                "ramenColor": "hsl(69, 70%, 50%)",
                "curry": 76,
                "curryColor": "hsl(42, 70%, 50%)",
                "udon": 83,
                "udonColor": "hsl(279, 70%, 50%)"
            },
            {
                "country": "AL",
                "hot dog": 75,
                "hot dogColor": "hsl(308, 70%, 50%)",
                "burger": 41,
                "burgerColor": "hsl(58, 70%, 50%)",
                "sandwich": 47,
                "sandwichColor": "hsl(350, 70%, 50%)",
                "kebab": 53,
                "kebabColor": "hsl(17, 70%, 50%)",
                "fries": 55,
                "friesColor": "hsl(17, 70%, 50%)",
                "donut": 59,
                "donutColor": "hsl(152, 70%, 50%)",
                "junk": 61,
                "junkColor": "hsl(243, 70%, 50%)",
                "sushi": 71,
                "sushiColor": "hsl(106, 70%, 50%)",
                "ramen": 88,
                "ramenColor": "hsl(19, 70%, 50%)",
                "curry": 63,
                "curryColor": "hsl(120, 70%, 50%)",
                "udon": 35,
                "udonColor": "hsl(240, 70%, 50%)"
            },
            {
                "country": "AM",
                "hot dog": 35,
                "hot dogColor": "hsl(188, 70%, 50%)",
                "burger": 52,
                "burgerColor": "hsl(349, 70%, 50%)",
                "sandwich": 14,
                "sandwichColor": "hsl(225, 70%, 50%)",
                "kebab": 71,
                "kebabColor": "hsl(75, 70%, 50%)",
                "fries": 86,
                "friesColor": "hsl(121, 70%, 50%)",
                "donut": 59,
                "donutColor": "hsl(298, 70%, 50%)",
                "junk": 94,
                "junkColor": "hsl(51, 70%, 50%)",
                "sushi": 89,
                "sushiColor": "hsl(48, 70%, 50%)",
                "ramen": 8,
                "ramenColor": "hsl(76, 70%, 50%)",
                "curry": 75,
                "curryColor": "hsl(320, 70%, 50%)",
                "udon": 31,
                "udonColor": "hsl(144, 70%, 50%)"
            },
            {
                "country": "AO",
                "hot dog": 99,
                "hot dogColor": "hsl(293, 70%, 50%)",
                "burger": 79,
                "burgerColor": "hsl(335, 70%, 50%)",
                "sandwich": 14,
                "sandwichColor": "hsl(66, 70%, 50%)",
                "kebab": 25,
                "kebabColor": "hsl(161, 70%, 50%)",
                "fries": 24,
                "friesColor": "hsl(2, 70%, 50%)",
                "donut": 22,
                "donutColor": "hsl(234, 70%, 50%)",
                "junk": 81,
                "junkColor": "hsl(318, 70%, 50%)",
                "sushi": 93,
                "sushiColor": "hsl(350, 70%, 50%)",
                "ramen": 62,
                "ramenColor": "hsl(300, 70%, 50%)",
                "curry": 3,
                "curryColor": "hsl(341, 70%, 50%)",
                "udon": 42,
                "udonColor": "hsl(41, 70%, 50%)"
            },
            {
                "country": "AQ",
                "hot dog": 18,
                "hot dogColor": "hsl(219, 70%, 50%)",
                "burger": 80,
                "burgerColor": "hsl(92, 70%, 50%)",
                "sandwich": 22,
                "sandwichColor": "hsl(204, 70%, 50%)",
                "kebab": 49,
                "kebabColor": "hsl(98, 70%, 50%)",
                "fries": 5,
                "friesColor": "hsl(73, 70%, 50%)",
                "donut": 16,
                "donutColor": "hsl(307, 70%, 50%)",
                "junk": 76,
                "junkColor": "hsl(111, 70%, 50%)",
                "sushi": 13,
                "sushiColor": "hsl(299, 70%, 50%)",
                "ramen": 87,
                "ramenColor": "hsl(164, 70%, 50%)",
                "curry": 72,
                "curryColor": "hsl(341, 70%, 50%)",
                "udon": 15,
                "udonColor": "hsl(250, 70%, 50%)"
            }
        ]*/


    return (
            <ResponsiveHeatMap
                data={data}
                keys={keys}
                indexBy="constraint"
                margin={{ top: 100, right: 60, bottom: 60, left: 60 }}
                forceSquare={true}
                axisTop={{ orient: 'top', tickSize: 5, tickPadding: 5, tickRotation: -90, legend: '', legendOffset: 36 }}
                axisRight={null}
                axisBottom={null}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'country',
                    legendPosition: 'center',
                    legendOffset: -40
                }}
                cellOpacity={1}
                cellBorderColor= "#737373"
                labelTextColor= "#737373"
                defs={[
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: 'rgba(0, 0, 0, 0.1)',
                        rotation: -45,
                        lineWidth: 4,
                        spacing: 7
                    }
                ]}
                fill={[ { id: 'lines' } ]}
                animate={true}
                motionConfig="wobbly"
                motionStiffness={80}
                motionDamping={9}
                hoverTarget="cell"
                cellHoverOthersOpacity={0.25}
            />
    );

}