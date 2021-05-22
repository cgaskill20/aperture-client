import React, {useState} from 'react';
import {Button, ButtonGroup, Typography} from "@material-ui/core";
import DECard from "./DECard";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from '@material-ui/icons/Favorite';
import {updateWorkspace} from "./Workspace";
import {workspaceList} from "./AllDatasetsTab";

export const [heartIcon, setHeartIcon] = useState(<FavoriteBorderIcon/>);