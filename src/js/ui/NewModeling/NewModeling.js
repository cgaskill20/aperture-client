import React, {useState} from 'react';
import {Button} from "@material-ui/core";
import {componentIsRendering} from "../TabSystem"
import Typography from "@material-ui/core/Typography";

export default function NewModeling() {
    const [state, setState] = useState(0)
    function increment() {
        const newState = state + 1;
        setState(newState);
    }

    if(componentIsRendering) console.log("|NewModeling|");
    return (
        <Typography>Coming Soon</Typography>
        // <Button variant="outlined" onClick={() => increment()}>{state}</Button>
    )
}