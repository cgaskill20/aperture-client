import React from 'react';
import DECheckbox from "./DECheckbox";
import DESlider from "./DESlider";

export default function HandleConstraints(props) {

    if(props.type === "checkbox") {
        return (
            <DECheckbox title={props.title} />
        );
    }

    else if (props.type === "slider") {
        return (
            <DESlider title={props.title} />
        );
    }
}