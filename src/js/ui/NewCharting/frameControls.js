import React, {useState} from 'react';
import ConstraintDropDown from "./constraintDropDown"
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";



export default function frameControls(props) {
    const [state, setState] = React.useState({
        checkedA: true
    });

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

    let extraDropDown = ""

    if(props.numDropDowns == 2){
        if(state.checkedA){
            const result = props.options.map(name => !name.toLowerCase().includes("tract"))
            console.log(result)
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
        <ConstraintDropDown options={props.options} otherConstraint={props.constraint} setConstraint={props.setConstraint2}></ConstraintDropDown></div>
    }


    return(
        <div>
            {extraDropDown}
            <ConstraintDropDown options={props.options} otherConstraint={props.constraint2} setConstraint={props.setConstraint}></ConstraintDropDown>
        </div>
    )

}