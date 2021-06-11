import React from 'react';
import { ResponsiveLine } from '@nivo/line'

export default function LineChart(props) {
    const data = [{"id":"japan","color":"hsl(45, 70%, 50%)","data":[{"x":"plane","y":292},{"x":"helicopter","y":229},{"x":"boat","y":67},{"x":"train","y":121},{"x":"subway","y":18},{"x":"bus","y":119},{"x":"car","y":260},{"x":"moto","y":180},{"x":"bicycle","y":276},{"x":"horse","y":259},{"x":"skateboard","y":88},{"x":"others","y":216}]},{"id":"france","color":"hsl(96, 70%, 50%)","data":[{"x":"plane","y":235},{"x":"helicopter","y":165},{"x":"boat","y":16},{"x":"train","y":277},{"x":"subway","y":42},{"x":"bus","y":33},{"x":"car","y":212},{"x":"moto","y":278},{"x":"bicycle","y":144},{"x":"horse","y":73},{"x":"skateboard","y":190},{"x":"others","y":114}]},{"id":"us","color":"hsl(262, 70%, 50%)","data":[{"x":"plane","y":54},{"x":"helicopter","y":90},{"x":"boat","y":164},{"x":"train","y":154},{"x":"subway","y":164},{"x":"bus","y":101},{"x":"car","y":37},{"x":"moto","y":22},{"x":"bicycle","y":285},{"x":"horse","y":208},{"x":"skateboard","y":177},{"x":"others","y":32}]},{"id":"germany","color":"hsl(200, 70%, 50%)","data":[{"x":"plane","y":123},{"x":"helicopter","y":196},{"x":"boat","y":231},{"x":"train","y":251},{"x":"subway","y":88},{"x":"bus","y":140},{"x":"car","y":206},{"x":"moto","y":19},{"x":"bicycle","y":143},{"x":"horse","y":207},{"x":"skateboard","y":102},{"x":"others","y":257}]},{"id":"norway","color":"hsl(207, 70%, 50%)","data":[{"x":"plane","y":110},{"x":"helicopter","y":39},{"x":"boat","y":213},{"x":"train","y":44},{"x":"subway","y":63},{"x":"bus","y":280},{"x":"car","y":273},{"x":"moto","y":169},{"x":"bicycle","y":266},{"x":"horse","y":68},{"x":"skateboard","y":272},{"x":"others","y":209}]}]

    function groupmonth(value, index, array){
        let bymonth={};
        let d = new Date(value['date']);
        d = new Date(value['date']['$date']);
        d = (d.getFullYear()-1970)*12 + d.getMonth();
        bymonth[d]=bymonth[d]||[];
        bymonth[d].push(value);
        return bymonth
    }
    try {
        console.log(props.data['county_covid'][0]['data'].map(groupmonth))
    }
    catch(err){console.log(err)}
    return(
        <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'transportation',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'count',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    );
}