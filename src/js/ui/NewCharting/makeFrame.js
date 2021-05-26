import React, { useState, useEffect } from 'react';
import { ChartingType, DataSourceType } from '../../library/charting/chartSystem';

export default function makeFrame(type) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                id: `${type.name}-frame-${Math.random().toString(36).substring(2, 6)}`,
                data: {},
            };
        }

        componentDidMount() {
            // do smth
        }

        render() {
            return (
                <div style={{
                    width: "100%",
                    height: "300px",
                    border: "1px solid red"
                }}>
                    <type.componentType data={this.state.data} id={this.state.id}/>
                </div>
            );
        }
    }
}
