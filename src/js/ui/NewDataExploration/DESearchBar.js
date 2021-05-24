// import React, {useState} from 'react';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import {makeStyles} from "@material-ui/core/styles";
// import Util from "../../library/apertureUtil";
//
// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: '100%',
//         margin: theme.spacing(1),
//     },
// }));
//
// export default function DESearchBar(props) {
//     const classes = useStyles();
//
//     const searchText = props.isWorkspace ? "Search Workspace..." : "Search All Datasets...";
//     let newLayers = [];
//     for(const layer in props.datasets) {
//         const layerLabel = props.datasets[layer]["label"] ? props.datasets[layer]["label"] : Util.capitalizeString(Util.underScoreToSpace(props.datasets[layer]["collection"]));
//         // newLayers.push({layerLabel});
//         newLayers.push({title: layerLabel});
//     }
//
//     const [state, setState] = useState({checked: true})
//
//
//     const handleChange = (event) => {
//         setState({ ...state, [event.target.name]: event.target.checked });
//     };
//
//     return (
//         <div className={classes.root}>
//             <Autocomplete
//                 freeSolo
//                 id="datasetSearchBar"
//                 disableClearable
//                 options={newLayers.map((option) => option.title)}
//                 renderInput={(params) => (
//                     <TextField
//                         {...params}
//                         label={searchText}
//                         margin="normal"
//                         variant="outlined"
//                         InputProps={{...params.InputProps, type: 'search'}}
//                     />
//                 )}
//             />
//         </div>
//     );
// }








import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {makeStyles} from "@material-ui/core";
import Util from "../../library/apertureUtil";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: theme.spacing(1),
    },
}));

export default function ControllableStates(props) {
    const classes = useStyles();
    const searchText = props.isWorkspace ? "Search Workspace..." : "Search All Datasets...";

    let options = [];
    for(const layer in props.datasets) {
        const layerLabel = props.datasets[layer]["label"] ? props.datasets[layer]["label"] : Util.capitalizeString(Util.underScoreToSpace(props.datasets[layer]["collection"]));
        options.push({layerLabel});
    }

    const [value, setValue] = useState();
    const [inputValue, setInputValue] = useState('');

    return (
        <div>
            <Autocomplete
                className={classes.root}
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={options.map((options) => options.layerLabel)}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label={searchText} variant="outlined" />}
            />
        </div>
    );
}