import React, {useEffect, useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ToggleSwitch from './ToggleSwitch';
import ChartDropdown from "./ChartDropdown";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        borderBottom: '1px solid #adadad',
    },
    dropdowns: {
        width: "98%",
    },
}));

export default function FrameControls(props) {
    const classes = useStyles();
    const dropdownNameOptions = ["Constraint", "X-Axis County", "X-Axis Tract", "Y-Axis County", "Y-Axis Tract"];
    const [tractOrCounty, setTractOrCounty] = useState(true);
    const [dropdownName1, setDropdownName1] = useState("");
    const [dropdownName2, setDropdownName2] = useState("");
    const menuOptions = props.selector ? tractOrCounty ? props.options[0] : props.options[1] : props.options;

    useEffect(() => {
        const initialDropdownName1 = props.type === "scatterplot" ? dropdownNameOptions[1] : dropdownNameOptions[0];
        setDropdownName1(initialDropdownName1);
        setDropdownName2(dropdownNameOptions[3]);
    }, []);

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
            <IconButton onClick={() => { props.remove(props.index) }}>
                <CloseIcon/>
            </IconButton>
        </Grid>
    }

    return(
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >
                {renderDropdown(true)}
                {renderDropdown(false)}
                {renderToggle()}
                {renderCloseButton()}
            </Grid>
        </div>
    )

}
