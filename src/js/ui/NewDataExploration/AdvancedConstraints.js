import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import Box from "@material-ui/core/Box";
import AdvancedConstraintCheckbox from "./AdvancedConstraintCheckbox";

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

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <Box id={`adv-constraints-${props.layer.label}`} className={classes.modal}>
            {props.allLayerConstraints.map((constraint, index) =>
                <AdvancedConstraintCheckbox activeConstraints={props.activeConstraints} setActiveConstraints={props.setActiveConstraints}
                                            index={index} layerIndex={props.layerIndex} constraint={constraint} />
            )}
        </Box>
    );

    return (
        <div>
            <Button variant="outlined" startIcon={<SettingsIcon/>} onClick={handleOpen}>
                Advanced...
            </Button>
            <Modal
                disableEnforceFocus
                disableAutoFocus
                open={open}
                onClose={handleClose}
                aria-labelledby={`adv-constraints-${props.layer.label}`}
            >
                {body}
            </Modal>
        </div>
    );
}