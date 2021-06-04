import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import Box from "@material-ui/core/Box";
import AdvancedConstraintCheckbox from "./AdvancedConstraintCheckbox";
import {componentIsRendering} from "../TabSystem";

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

export default function AdvancedConstraints(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    if(componentIsRendering) {console.log("|AdvancedContraints Rerending|")}
    return (
        <div>
            <Button variant="outlined" startIcon={<SettingsIcon/>} onClick={() => setOpen(true)}>
                Advanced...
            </Button>
            <Modal disableEnforceFocus disableAutoFocus open={open} onClose={() => setOpen(false)}>
                <Box className={classes.modal}>
                    {props.allLayerConstraints.map((constraint, index) => {
                        return (
                            <div key={index}>
                                <AdvancedConstraintCheckbox activeLayerConstraints={props.activeLayerConstraints} setActiveLayerConstraints={props.setActiveLayerConstraints}
                                                            index={index} constraint={constraint}/>
                            </div>)
                    })}
                </Box>
            </Modal>
        </div>
    );
}