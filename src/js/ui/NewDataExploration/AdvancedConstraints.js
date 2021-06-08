import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button, Paper} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import AdvancedConstraintCheckbox from "./AdvancedConstraintCheckbox";
import {componentIsRendering} from "../TabSystem";
import CloseIcon from '@material-ui/icons/Close';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    modal: {
        top: '20%',
        left: '70%',
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2),
    },
    constraintSection: {
        overflowY: "auto",
        maxHeight: "50vh",
        padding: theme.spacing(1),
    },
    closeButtonSection: {
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1),
    },
    closeButton : {
        width: '100%',
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
            <Modal
                //FIXME According to https://material-ui.com/api/modal/ these should prevent the modal from 'focusing' but they don't
                // disableEnforceFocus={true}
                // disableAutoFocus={true}
                aria-labelledby="adv-constraints"
                open={open}
                onClose={() => setOpen(false)}
            >
                <Grid
                    id="adv-constraints"
                    className={classes.modal}
                    container
                    direction="column"
                    justify="center"
                    alignItems="stretch"
                >
                    <Grid item>
                        <Paper className={classes.closeButtonSection} elevation={1}>
                            <Button
                                className={classes.closeButton}
                                startIcon={<CloseIcon/>}
                                variant="outlined"
                                onClick={() => setOpen(false)}
                            >
                                Close
                            </Button>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper elevation={1} className={classes.constraintSection}>
                            {props.allLayerConstraints.map((constraint, index) => {
                                return (
                                    <div key={index}>
                                        <AdvancedConstraintCheckbox activeLayerConstraints={props.activeLayerConstraints} setActiveLayerConstraints={props.setActiveLayerConstraints}
                                                                    constraintIndex={index} constraint={constraint}/>
                                    </div>)
                            })}
                        </Paper>
                    </Grid>
                </Grid>
            </Modal>
        </div>
    );
}