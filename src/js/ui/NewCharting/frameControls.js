import React, {useState} from 'react';
import ConstraintDropDown from "./constraintDropDown"
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ToggleSwitch from './toggleSwitch';



export default function frameControls(props) {
    const [state, setState] = useState({
        tractvCounty: true
    });

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

    let menuOptions = props.options;
    let selector = "";
    let dropDown = "";
    let extraDropDown = "";

    if(props.selector){
        if(state.tractvCounty){
            menuOptions = props.options[0]
        }
        if(!state.tractvCounty){
            menuOptions = props.options[1]
        }

        selector = <ToggleSwitch bool={state.tractvCounty} change={handleChange}></ToggleSwitch>
    }
    if(props.numDropDowns == 2){
        extraDropDown = <ConstraintDropDown options={menuOptions} setConstraint={props.setConstraint2}></ConstraintDropDown>
    }
    if(props.numDropDowns > 0){
        dropDown = <ConstraintDropDown options={menuOptions} setConstraint={props.setConstraint}></ConstraintDropDown>
    }

    let closeImg = {cursor:'pointer', float:'right'};

    return(
        <div>
            {selector}{extraDropDown}{dropDown}
            <IconButton onClick={() => { props.remove(props.index) }} aria-label="Delete">
                <DeleteIcon style={closeImg}/>
            </IconButton>
        </div>
    )

}