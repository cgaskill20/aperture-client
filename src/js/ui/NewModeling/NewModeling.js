import React from 'react';
import {componentIsRendering} from "../TabSystem"
import Typography from "@material-ui/core/Typography";

export default function NewModeling() {
    if(componentIsRendering) console.log("|NewModeling|");
    return (
        <Typography>Coming Soon</Typography>
    )
}