import React, { Component } from 'react';
const e = React.createElement;
import Util from '../../../library/apertureUtil';

export default class ModelCollection extends React.Component {
    constructor(props) {
        super(props);
        this.name = this.props.config.name;
    }
    
    render() {
        return e("div", {className: "modelCollection"},
            e("label", {htmlFor: this.name}, `${Util.cleanUpString(this.name)}: `),
            this.buildCollection()
        );
    }

    buildCollection(){
        let key = 0;
        return this.props.config.features.map(feature => {
            const checked = true;
            if(checked)
                this.props.setCollection(this.name,feature,true);
            return e("div",{className: "modelCollectionFeatures", key: key++},
                e("label", {htmlFor: `${feature}_feature`}, `${Util.cleanUpString(feature)}: `),
                e("input", {
                    type: "checkbox", 
                    id:`${feature}_feature`, 
                    className: "modelCollectionCheckbox",
                    defaultChecked: checked,
                    onChange: (e) => {this.props.setCollection(this.name,feature,e.target.checked)}
                })
            );
        });
    }
}
