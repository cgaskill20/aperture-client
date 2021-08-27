import React from 'react';
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import PeopleIcon from '@material-ui/icons/People';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import {Tooltip} from "@material-ui/core";

export default function ToggleSwitch(props){
    return (
        <div><Grid component="label" container alignItems="center">
            <Grid item><Tooltip title="Chart Tract Datasets"><PeopleIcon/></Tooltip></Grid>
            <Grid item>
                <Switch
                    color="primary"
                    checked={props.tractOrCounty}
                    onChange={props.setTractOrCounty}
                    value="Tract or County"
                />
            </Grid>
            <Grid item><Tooltip title="Chart County Datasets"><AccountBalanceIcon/></Tooltip></Grid>
        </Grid></div>
    )
}