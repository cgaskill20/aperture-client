import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import theme from "../global/GlobalTheme";
import {Paper} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        margin: theme.spacing(1),
    },
});

export default function DECard(props) {
    const classes = useStyles();

    return (
        <Paper elevation={3} className={classes.root}>
            <CardContent>
                {props.content}
            </CardContent>
        </Paper>
    );
}