import React from 'react';
import {Button, ButtonGroup, Typography} from "@material-ui/core";
import DECard from "./DECard";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import SettingsIcon from '@material-ui/icons/Settings';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import {workspaceList} from "./AllDatasetsTab";


export default function DELayerControls(props) {
    const buttonText = props.currentlyFav ? "Remove From Workspace" : "Add To Workspace";
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
                                startIcon={<FavoriteBorderIcon />}
                                onClick={() => {
                                    if(!props.currentlyFav) {
                                        workspaceList.push(props.favorite);
                                    }
                                    else {
                                        workspaceList.splice(props.index, 1);
                                    }
                                }}
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