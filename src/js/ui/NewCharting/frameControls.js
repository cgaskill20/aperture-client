import React, {useState} from 'react';
import ConstraintDropDown from "./constraintDropDown"
import EjectIcon from '@material-ui/icons/Eject';
import IconButton from "@material-ui/core/IconButton";



export default function frameControls(props) {

    let extraDropDown = ""

    if(props.numDropDowns == 2){
        extraDropDown = <ConstraintDropDown options={props.options} setConstraint={props.setConstraint2}></ConstraintDropDown>
    }

    return(
        <div>
            <ConstraintDropDown options={props.options} setConstraint={props.setConstraint}></ConstraintDropDown>
            {extraDropDown}
            <IconButton color="secondary">
                <EjectIcon/>
            </IconButton>
        </div>
    )

}