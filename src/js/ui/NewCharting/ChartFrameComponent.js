import React from 'react'
import { ChartingType } from '../../library/charting/chartSystem'

export default class ChartFrameComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{
                width: "100%",
                height: "300px",
                backgroundColor: "#eee",
                border: "1px solid red"
            }}>
                <p>{this.props.type}</p>
            </div>
        );
    }
}
