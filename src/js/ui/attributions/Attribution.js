import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton } from "@material-ui/core";
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
});

export default function Attribution() {
    const classes = useStyles();

    return <div>
        <Card className={classes.root}>
            <CardActionArea onClick={() => window.open(`https://www.neonscience.org/`, "_blank")}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Neon
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        The National Ecological Observatory Network is a program sponsored by the National Science Foundation and operated under cooperative agreement by Battelle. This material is based in part upon work supported by the National Science Foundation through the NEON Program.
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </div>
}