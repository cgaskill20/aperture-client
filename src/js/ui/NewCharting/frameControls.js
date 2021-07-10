import React, {useState} from 'react';
import ConstraintDropDown from "./constraintDropDown"
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import CloseIcon from '@material-ui/icons/Close';



export default function frameControls(props) {
    const [state, setState] = React.useState({
        checkedA: true
    });

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

    let extraDropDown = ""

    let menuOptions = props.options;


    if(props.numDropDowns == 2){
        if(state.checkedA){
            menuOptions = props.options[0]
        }
        if(!state.checkedA){
            menuOptions = props.options[1]
        }

        extraDropDown = <div><Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Tract</Grid>
            <Grid item>
                <Switch
                    checked={state.checkedA}
                    onChange={handleChange("checkedA")}
                    value="checkedA"
                />
            </Grid>
            <Grid item>County</Grid>
        </Grid>
        <ConstraintDropDown options={menuOptions} setConstraint={props.setConstraint2}></ConstraintDropDown></div>
    }

    let closeImg = {cursor:'pointer', float:'right'};

    return(
        <div>
            {extraDropDown}
            <ConstraintDropDown options={menuOptions} setConstraint={props.setConstraint}></ConstraintDropDown>
            <CloseIcon
                style={closeImg}
                onClick={() => { console.log("here") }}
            />
        </div>
    )

}