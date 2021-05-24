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
import {Checkbox, FormControlLabel, ListItemText, makeStyles, MenuItem} from "@material-ui/core";
import Util from "../../library/apertureUtil";
import {updateWorkspace, getIndex} from "./IndividualLayerHelpers";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: theme.spacing(1),
    },
}));

function getName(layer) {
    return layer["label"] ? layer["label"] : Util.capitalizeString(Util.underScoreToSpace(layer["collection"]))
}

export default function ControllableStates(props) {
    const classes = useStyles();
    const searchText = props.isWorkspace ? "Search Workspace..." : "Search All Datasets...";
    const [check, setCheck] = useState(false);

    let options = [];
    for(const layer in props.datasets) {
        const layerLabel = props.datasets[layer]["label"] ? props.datasets[layer]["label"] : Util.capitalizeString(Util.underScoreToSpace(props.datasets[layer]["collection"]));
        options.push(layerLabel);
    }

    // props.datasets.map((layer) =>
    //     options.push(
    //         <FormControlLabel
    //             control={<Checkbox checked={check} onChange={() => setCheck(!check)} name={() => {getName(props.datasets[layer])}} />}
    //             label={() => {getName(props.datasets[layer])}}
    //         />
    //     )
    // )
    // console.log({options});

    // for(const layer in props.datasets) {
    //     const layerLabel = props.datasets[layer]["label"] ? props.datasets[layer]["label"] : Util.capitalizeString(Util.underScoreToSpace(props.datasets[layer]["collection"]));
    //     options.push(
    //         <FormControlLabel
    //             control={<Checkbox checked={check} onChange={() => setCheck(!check)} name="check" />}
    //             label={layerLabel}
    //         />
    //     );
    // }

    const [value, setValue] = useState();
    const [inputValue, setInputValue] = useState('');

    return (
        <div>
            <Autocomplete
                className={classes.root}
                // value={value}
                // onClick={() => props.setWorkspace(updateWorkspace(props.workspace, value, getIndex(props.workspace, inputValue)))}
                // onChange={(event, newValue) => {
                //     setValue(newValue);
                // }}
                // inputValue={inputValue}
                // onInputChange={(event, newInputValue) => {
                //     setInputValue(newInputValue);
                // }}
                id="controllable-states-demo"
                // options={options.map((options) => options.layerLabel)}
                options={options}
                renderInput={(params) => <TextField {...params} label={searchText} variant="outlined" />}
            />
        </div>
    );
}









// import React, {useState} from 'react';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import ListItemText from '@material-ui/core/ListItemText';
// import Select from '@material-ui/core/Select';
// import Checkbox from '@material-ui/core/Checkbox';
// import Util from "../../library/apertureUtil";
// import {updateWorkspace, getIndex} from "./IndividualLayerHelpers";
//
// const useStyles = makeStyles((theme) => ({
//     formControl: {
//         margin: theme.spacing(1),
//         width: '100%',
//     },
//     noLabel: {
//         marginTop: theme.spacing(3),
//     },
// }));
//
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };
//
// export default function MultipleSelect(props) {
//     const classes = useStyles();
//     const [personName, setPersonName] = useState([]);
//
//     const handleChange = (event) => {
//         console.log("handleChange() was called");
//         // setPersonName(event.target.value);
//         props.setWorkspace(updateWorkspace(props.workspace, personName, getIndex(props.workspace, personName)));
//     };
//
//     let options = [];
//     for(const layer in props.datasets) {
//         const layerLabel = props.datasets[layer]["label"] ? props.datasets[layer]["label"] : Util.capitalizeString(Util.underScoreToSpace(props.datasets[layer]["collection"]));
//         options.push(layerLabel);
//     }
//
//     return (
//         <div>
//             <FormControl className={classes.formControl}>
//                 <InputLabel id="demo-mutiple-checkbox-label">Search Datasets...</InputLabel>
//                 <Select
//                     labelId="demo-mutiple-checkbox-label"
//                     id="demo-mutiple-checkbox"
//                     multiple
//                     value={personName}
//                     onChange={handleChange}
//                     input={<Input />}
//                     renderValue={(selected) => selected.join(', ')}
//                     MenuProps={MenuProps}
//                 >
//                     {options.map((name) => (
//                         <MenuItem key={name} value={name}>
//                             <Checkbox checked={personName.indexOf(name) > -1} />
//                             <ListItemText primary={name} />
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>
//         </div>
//     );
// }