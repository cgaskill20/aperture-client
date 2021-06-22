import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Grid } from "@material-ui/core";
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles({
    root: {
        width: '99%'
    },
    grid: {
        flexGrow: 1,
        margin: '8px',
        padding: '16px',
        marginTop: '0px',
        paddingTop: '0px'
    },
    card: {
        maxWidth: 345,
    }
});

export default function Attribution() {
    const classes = useStyles();

    const makeCard = (name, text, link) => {
        return <Grid item>
            <Card className={classes.card}>
                <CardActionArea onClick={() => window.open(link, "_blank")}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {text}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    }

    return <div className={classes.root}>
        <Grid container spacing={2} className={classes.grid}>
            {makeCard('Neon',
            'The National Ecological Observatory Network is a program sponsored by the National Science Foundation and operated under cooperative agreement by Battelle. This material is based in part upon work supported by the National Science Foundation through the NEON Program.',
            'https://www.neonscience.org/')}
            {makeCard('NHGIS',
            'IPUMS NHGIS, University of Minnesota.',
            'https://www.nhgis.org/')}
        </Grid>
    </div>
}