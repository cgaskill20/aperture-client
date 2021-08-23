import React from 'react';
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";

export default function toggleSwitch(props){
    return (
        <div><Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Tract</Grid>
            <Grid item>
                <Switch
                    checked={props.bool}
                    onChange={props.change("tractvCounty")}
                    value="Tract or County"
                />
            </Grid>
            <Grid item>County</Grid>
        </Grid></div>
    )
}