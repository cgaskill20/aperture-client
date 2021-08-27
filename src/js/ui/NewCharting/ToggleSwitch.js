import React from 'react';
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';

export default function ToggleSwitch(props){
    return (
        <div><Grid component="label" container alignItems="center">
            <Grid item><PersonIcon/></Grid>
            <Grid item>
                <Switch
                    checked={props.tractOrCounty}
                    onChange={props.setTractOrCounty}
                    value="Tract or County"
                />
            </Grid>
            <Grid item><PeopleIcon/></Grid>
        </Grid></div>
    )
}