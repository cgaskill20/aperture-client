import {Tooltip, withStyles} from "@material-ui/core";

export const CustomTooltip = withStyles((theme) => ({
    tooltip: {
        fontSize: 14,
    },
}))(Tooltip);