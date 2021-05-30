import React, { useState, useEffect } from 'react';
import { ChartingType, DataSourceType } from '../../library/charting/chartSystem';
import ChartFrameComponent from "./ChartFrameComponent";
import Histogram from "./Histogram";

export default function makeFrame(type) {
    return class extends React.Component {
        constructor(props) {
            console.log(props);
            console.log(type);
            super(props);
            this.state = {
                id: `${type.name}-frame-${Math.random().toString(36).substring(2, 6)}`,
                data: {},
            };
        }

        componentDidMount() {

        }

        render() {

            return (

                <div style={{
                    width: "100%",
                    height: this.props.size.height - 50,
                    border: "1px solid red"
                }}>
                    <Histogram size={this.props.size}></Histogram>
                    <type.componentType data={this.state.data} id={this.state.id}/>
                </div>
            );
        }
    }
}
