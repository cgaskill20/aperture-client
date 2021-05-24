import React, {useState} from 'react';
import {Button, ButtonGroup, Typography} from "@material-ui/core";
import DECard from "./DECard";
import SettingsIcon from '@material-ui/icons/Settings';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import AdvancedMenu from "./AdvancedMenu";
import {makeStyles} from "@material-ui/core/styles";
import Portal from "@material-ui/core/Portal";

const useStyles = makeStyles((theme) => ({
    dropdown: {
        position: 'fixed',
        width: 200,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function DELayerControls(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    // const container = React.useRef(null);

    return (
        <div>
            <DECard
                content={
                    <div>
                        <Typography>
                            {props.text}
                        </Typography>
                        <br/>
                        <ButtonGroup variant="outlined" aria-label="text primary button group">

                            <Button startIcon={<SettingsIcon  onClick={handleClick}/>}>
                                Advanced...
                            </Button>
                            {open ? (
                                <Portal>
                                    <div className={classes.dropdown}>
                                        <AdvancedMenu advancedLayers={props.advancedLayers}/>
                                    </div>
                                </Portal>
                            ) : null}

                            <Button startIcon={<RotateLeftIcon />}>
                                Reset Constraints
                            </Button>
                        </ButtonGroup>
                    </div>
                }
            />
        </div>
    )
}