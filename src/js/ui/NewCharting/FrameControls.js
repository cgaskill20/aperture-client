import React, { useState } from 'react';
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
    const dropdownNameOptions = ["Constraint", "X-Axis County", "X-Axis Tract", "Y-Axis County", "Y-Axis Tract"];
    const [tractOrCounty, setTractOrCounty] = useState(true);
    const [dropdownName1, setDropdownName1] = useState(dropdownNameOptions[1]);
    const [dropdownName2, setDropdownName2] = useState(dropdownNameOptions[3]);
    let menuOptions = props.options;

    function handleToggle() {
        setTractOrCounty(!tractOrCounty);
        if(tractOrCounty) {
            setDropdownName1(dropdownNameOptions[2]);
            setDropdownName2(dropdownNameOptions[4]);
        }
        else {
            setDropdownName1(dropdownNameOptions[1]);
            setDropdownName2(dropdownNameOptions[3]);
        }
    }

    function renderToggle() {
        if(props.selector){
            menuOptions = tractOrCounty ? props.options[0] : props.options[1];
            return <Grid item><ToggleSwitch tractOrCounty={tractOrCounty} setTractOrCounty={() => handleToggle()}></ToggleSwitch></Grid>
        }
    }

    function renderDropdown(first) {
        const setConstraint = first ? props.setConstraint : props.setConstraint2;
        const name = first ? dropdownName1 : dropdownName2;
        if(props.numDropDowns > 0 && (first || props.numDropDowns === 2)) {
            return <Grid item><ChartDropdown dropdownName={name} options={menuOptions} setConstraint={setConstraint}></ChartDropdown></Grid>
        }
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
                {renderDropdown(true)}
                {renderDropdown(false)}
                {renderCloseButton()}
            </Grid>
        </div>
    )

}
