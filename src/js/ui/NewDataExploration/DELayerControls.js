import React from 'react';
import {Button, ButtonGroup, Typography} from "@material-ui/core";
import DECard from "./DECard";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import SettingsIcon from '@material-ui/icons/Settings';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from "@material-ui/core/IconButton";

export default function DELayerControls(props) {
    return (
        <div>
            <DECard
                content={
                    <div>
                        <Typography>
                            {props.text}
                            Find more info about this dataset on our <a href={props.url} target="_blank">website</a>
                        </Typography>
                        <br/>
                        <ButtonGroup variant="outlined" aria-label="text primary button group">
                            {/*<IconButton aria-label="favorite" color="secondary">*/}
                            {/*    <FavoriteBorderIcon />*/}
                            {/*</IconButton>*/}
                            {/*<IconButton aria-label="settings" color="primary">*/}
                            {/*    <SettingsIcon />*/}
                            {/*</IconButton>*/}
                            {/*<IconButton aria-label="reset" color="secondary">*/}
                            {/*    <RotateLeftIcon />*/}
                            {/*</IconButton>*/}
                            {/*<IconButton aria-label="info" color="primary">*/}
                            {/*    <InfoIcon />*/}
                            {/*</IconButton>*/}
                            <Button startIcon={<FavoriteBorderIcon />}>
                                Add To Workspace
                            </Button>
                            <Button startIcon={<SettingsIcon />}>
                                Advanced...
                            </Button>
                            <Button startIcon={<RotateLeftIcon />}>
                                Reset Constraints
                            </Button>
                            {/*<Button startIcon={<InfoIcon />}>*/}
                            {/*    More Info*/}
                            {/*</Button>*/}
                        </ButtonGroup>
                    </div>
                }
            />
        </div>
    )
}