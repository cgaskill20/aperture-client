import React, { useState } from 'react';
import feature from "../../../library/charting/feature.js"
import {ResponsiveHeatMap} from "@nivo/heatmap";
import ToggleSwitch from '../ToggleSwitch';
const calculateCorrelation = require("calculate-correlation");


export default function CorrelogramGraph(props) {

    const [tractOrCounty, setTractOrCounty] = useState( true);

    let retData = {};
    let keys = [];
    let data = []


    let selector = <ToggleSwitch tractOrCounty={tractOrCounty} setTractOrCounty={() => setTractOrCounty(!tractOrCounty)}></ToggleSwitch>

    let findMatchingPoints = (object,) => {
        const keyTable = {}
        for (const [mainKey, mapOfObjects] of Object.entries(object)) {
            if(tractOrCounty && props.options[1].includes(mainKey)){
                continue;
            }
            else if(!tractOrCounty && props.options[0].includes(mainKey)){
                continue;
            }

            for (const [key, value] of Object.entries(mapOfObjects)) {
                //very nice :)
                keyTable[key] ? (() => {
                    keyTable[key].push(value)
                })() : (() => {
                    keyTable[key] = [value]
                })()
            }
        }
        const result = Object.values(keyTable);
        //get max entry length
        const maxEntryLength = result.reduce((acc, curr) => {
            return Math.max(acc,curr.length)
        },0);
        //only return the ones with the max length
        return result.filter(entry => entry.length === maxEntryLength)
    }
    let heatmap = ""
    if(props?.data['map_features'] && ((props.options[0].length > 0 && tractOrCounty) || (props.options[1].length > 0 && !tractOrCounty))) {
        for (const [key, value] of Object.entries(props.data['map_features'])) {
            if(tractOrCounty && props.options[1].includes(key)){
                continue;
            }
            else if(!tractOrCounty && props.options[0].includes(key)){
                continue;
            }
            if (value.length > 0) {
                keys.push(feature.getFriendlyName(key))
                data.push({"constraint": feature.getFriendlyName(key)});

                retData[key] = {};
                value.forEach(loc => {
                    retData[key][loc['locationName']] = loc.data;
                })
            }
        }

        let formatted = findMatchingPoints(retData)
        let points = []

        for(let i = 0; i < formatted[0].length; i++){
            let pointsArray = formatted.reduce(function(pointsArray, value){
                pointsArray.push(value[i]);
                return pointsArray;
            }, [])
            points.push(pointsArray);
        }

        for(let i = 0; i < formatted[0].length; i++){
            for(let j = 0; j < formatted[0].length;j++){
                const correlation = calculateCorrelation(points[i], points[j])
                data[i][keys[j]] = parseFloat(correlation.toPrecision(2));
            }
        }

        heatmap = <ResponsiveHeatMap
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

    }



    return (
        <div style={{width: "100%", height: props.size.height - 80,}}>
            {selector}
            {heatmap}
            </div>
    );

}