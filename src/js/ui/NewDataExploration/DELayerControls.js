import React from 'react';
import {Button, ButtonGroup, Typography} from "@material-ui/core";
import DECard from "./DECard";

export default function DELayerControls(props) {
    return (
        <div>
            <DECard
                content={
                    <div>
                        <Typography>
                            {props.text}
                            Find more info about this <a href={props.url} target="_blank">dataset</a> on our website.
                        </Typography>
                        <br/>
                        <ButtonGroup variant="outlined" aria-label="text primary button group">
                            <Button>Reset Constraints</Button>
                            <Button>Advanced...</Button>
                        </ButtonGroup>
                    </div>
                }
            />
        </div>
    )
}