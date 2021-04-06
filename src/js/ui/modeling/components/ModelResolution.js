import React, { Component } from 'react';
const e = React.createElement;

export default class ModelResolution extends React.Component {
    constructor(props) {
        super(props);
        this.onResolutionChange = this.onResolutionChange.bind(this);

        this.state = {
            resolution: props.options[0]
        }
        this.props.setResolution(this.state.resolution);
    }
    
    render() {
        return e("div", {className: "modelSelect"},
            e("label", {htmlFor: "resPicker",  className: "menuHeaderLabel"}, `Resolution: `),
            this.buildResolution()
        );
    }

    buildResolution(){
        const content = this.props.options.map(category => {
            return e("option", null, category)
        });
        return e("select", {
            id: "resPicker",
            className: "form-control",
            onChange: this.onResolutionChange,
            value: this.state.resolution
        }, ...content);
    }

    onResolutionChange(e){
        this.setState({
            resolution: e.target.value
        });
        this.props.setResolution(e.target.value);
    }
}
