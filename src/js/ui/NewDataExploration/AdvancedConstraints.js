import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import Box from "@material-ui/core/Box";
import AdvancedConstraintCheckbox from "./AdvancedConstraintCheckbox";
import {componentIsRendering} from "../TabSystem";
import {hashIndex} from "./Helpers";

const useStyles = makeStyles((theme) => ({
    modal: {
        overflowY: "auto",
        maxHeight: "50vh",
        top: '20%',
        left: '70%',
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
    },
}));

function updateActiveConstraints(activeConstraints, layerConstraints, layerIndex) {
    let tempActiveConstraints = [...activeConstraints];
    tempActiveConstraints[layerIndex] = layerConstraints;
    return tempActiveConstraints;
}

export default function AdvancedConstraints(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [layerConstraints, setLayerConstraints] = useState(props.activeConstraints[props.layerIndex]);

    const body = (
        <Box className={classes.modal}>
            <Button variant="outlined"
                    onClick={() => props.setActiveConstraints(updateActiveConstraints(props.activeConstraints, layerConstraints, props.layerIndex))}
            >
                Update Constraints
            </Button>
            {props.allLayerConstraints.map((constraint, index) => {
                    const originalIndex = index;
                    index = hashIndex(23) + index;
                    return (
                        <div key={index}>
                            <AdvancedConstraintCheckbox activeConstraints={layerConstraints}
                                                        setActiveConstraints={setLayerConstraints}
                                                        index={originalIndex} layerIndex={props.layerIndex} constraint={constraint}/>
                        </div>)
                }
            )}
        </Box>
    );

    if(componentIsRendering) {console.log("|AdvancedContraints Rerending|")}
    return (
        <div>
            <Button variant="outlined" startIcon={<SettingsIcon/>} onClick={() => setOpen(true)}>
                Advanced...
            </Button>
            <Modal
                disableEnforceFocus
                disableAutoFocus
                open={open}
                onClose={() => setOpen(false)}
            >
                {body}
            </Modal>
        </div>
    );
}