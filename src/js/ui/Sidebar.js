import React from 'react';
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
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function Sidebar() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Button
                variant="outlined"
                color="inherit"
                className={clsx(classes.menuButton, open && classes.hide)}
                startIcon={<MenuIcon />}
                aria-label="open drawer"
                onClick={handleDrawerOpen}
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
                <TabSystem handleDrawerClose={handleDrawerClose}/>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
            </main>
        </div>
    );
}