import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import TabSystem from "./TabSystem"
import MenuIcon from '@material-ui/icons/Menu';
import {Button} from "@material-ui/core";

const drawerWidth = 800;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        zIndex: 2001,
    },
    menuButton: {
        margin: theme.spacing(5),
        zIndex: 2002,
        top: -20,
        left: -20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        opacity: 0.85,
    },
}));

export default function Sidebar() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    return (
        <div className={classes.root}>
            <Button
                variant="outlined"
                color="inherit"
                className={clsx(classes.menuButton, open && classes.hide)}
                startIcon={<MenuIcon />}
                aria-label="open drawer"
                onClick={() => setOpen(true)}
            >
                Menu
            </Button>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <TabSystem handleDrawerClose={() => {setOpen(false)}}/>
            </Drawer>
        </div>
    );
}