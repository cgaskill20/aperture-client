import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import theme from "../global/GlobalTheme";

const useStyles = makeStyles({
    root: {
        margin: theme.spacing(1),
    },
});

export default function DECard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                {props.content}
            </CardContent>
        </Card>
    );
}