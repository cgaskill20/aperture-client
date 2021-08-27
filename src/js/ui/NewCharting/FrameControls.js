import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ToggleSwitch from './ToggleSwitch';
import ChartDropdown from "./ChartDropdown";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        borderBottom: '1px solid #adadad',
    },
}));

export default function FrameControls(props) {
    const classes = useStyles();
    const [tractOrCounty, setTractOrCounty] = useState(true);
    let menuOptions = props.options;

    function renderToggle() {
        if(props.selector){
            if(tractOrCounty){
                menuOptions = props.options[0]
            }
            else {
                menuOptions = props.options[1]
            }
            return <Grid item><ToggleSwitch tractOrCounty={tractOrCounty} setTractOrCounty={() => setTractOrCounty(!tractOrCounty)}></ToggleSwitch></Grid>
        }
    }

    function renderDropdown(first, axis) {
        const setConstraint = first ? props.setConstraint : props.setConstraint2;
        const dropdownName = getDropdownName(axis);
        if(props.numDropDowns > 0 && (first || props.numDropDowns === 2)) {
            return <Grid item><ChartDropdown dropdownName={dropdownName} options={menuOptions} setConstraint={setConstraint}></ChartDropdown></Grid>
        }
    }

    function getDropdownName(axis) {
        if(props.type === "scatterplot") {
            return props.tractvCounty ? axis + " Tract" : axis + " County";
        }
        return "Constraint"
    }

    function renderCloseButton() {
        return  <Grid item>
            <IconButton onClick={() => { props.remove(props.index) }} aria-label="Delete">
                <DeleteIcon/>
            </IconButton>
        </Grid>
    }

    return(
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                {renderToggle()}
                {renderDropdown(false, "Y-Axis")}
                {renderDropdown(true, "X-Axis")}
                {renderCloseButton()}
            </Grid>
        </div>
    )

}
