import React, {useState} from 'react';
import ConstraintDropDown from "./constraintDropDown"

export default function frameControls(props) {


    return(
        <ConstraintDropDown options={props.options} setConstraint={props.setConstraint}></ConstraintDropDown>
    )

}