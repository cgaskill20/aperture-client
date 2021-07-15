import React, {useState} from 'react';
import ConstraintDropDown from "./constraintDropDown"
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';



export default function frameControls(props) {
    const [state, setState] = React.useState({
        checkedA: true
    });

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

    let menuOptions = props.options;

    let dropDown = ""

    let extraDropDown = ""

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
    if(props.numDropDowns > 0){
        dropDown = <ConstraintDropDown options={menuOptions} setConstraint={props.setConstraint}></ConstraintDropDown>
    }

    let closeImg = {cursor:'pointer', float:'right'};

    return(
        <div>
            {extraDropDown}
            {dropDown}
            <IconButton
                onClick={() => { props.remove(props.index) }}
                aria-label="Delete">
                <DeleteIcon
                    style={closeImg}
                />
            </IconButton>
        </div>
    )

}