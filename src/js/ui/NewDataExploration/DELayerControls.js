import React from 'react';
import {Button, ButtonGroup, Typography} from "@material-ui/core";
import DECard from "./DECard";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from '@material-ui/icons/Favorite';
import SettingsIcon from '@material-ui/icons/Settings';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import {updateWorkspace} from "./Workspace"
import {workspaceList} from "./AllDatasetsTab";

export function getFavIcon(layer) {
    return workspaceList.includes(layer) ? <FavoriteIcon/> : <FavoriteBorderIcon/>;
}

export default function DELayerControls(props) {
    const buttonText = workspaceList.includes(props.favorite) ? "Remove From Workspace" : "Add To Workspace";
    return (
        <div>
            <DECard
                content={
                    <div>
                        <Typography>
                            {props.text}
                        </Typography>
                        <br/>
                        <ButtonGroup variant="outlined" aria-label="text primary button group">
                            <Button
                                startIcon={getFavIcon(props.favorite)}
                                onClick={() => updateWorkspace(props.favorite, props.index)}
                            >
                                {buttonText}
                            </Button>
                            <Button startIcon={<SettingsIcon />}>
                                Advanced...
                            </Button>
                            <Button startIcon={<RotateLeftIcon />}>
                                Reset Constraints
                            </Button>
                        </ButtonGroup>
                    </div>
                }
            />
        </div>
    )
}