import AutoQuery from "../library/autoQuery";
import noUiSlider from "../third-party/nouislider.min.js";
import Util from '../library/apertureUtil';

/**
 * @namespace MenuGenerator
 * @file Build's menu UI for the Aperture Client
 * @authors Daniel Reynolds, Matt Young, but mostly Daniel
 * @dependencies 
 * @notes Work in progress!
 */
const DEFAULT_OPTIONS = {
    colorCode: true,
}

const DEFAULT_OBJECT = {
    group: "Other",
    subGroup: "Other",
    color: "#000000",
    popup: null,
    constraints: null,
    map: function () { return window.map; }
}

export let nested_json_map;

let updateQueue = {};
export function updateLayers() {
    for (const layerUpdate in updateQueue) {
        updateQueue[layerUpdate](layerUpdate);
    }
}

export default {
    /** Generates the menu within a container
     * @memberof MenuGenerator
     * @method generate
     * @param {JSON} json_map JSON map
     * @param {HTMLElement} container Where to generate the menu
     * @param {object} options options object
     */
    generate(json_map, container, options) {
        let ops = JSON.parse(JSON.stringify(DEFAULT_OPTIONS)); //deep copy
        if (options) { //if options arg exists, merge options
            ops = { ...ops, ...options }; //merge both options into one obj
        }

        nested_json_map = this.makeNested(json_map); //convert to nested format
        const categoryCount = Object.keys(nested_json_map).length;
        this.configureContainer(container, categoryCount);
        this.addColumns(container, nested_json_map);
        this.addContentToColumns(nested_json_map);
    },

    /** Helper method for @method generate
     * @memberof Generator
     * @method makeNested
     * @param {JSON} json_map JSON map
     */
    makeNested(json_map) {
        let columnsAndHeadings = {};
        for (const obj in json_map) {
            if (json_map[obj]["notAQueryableLayer"]) {
                continue;
            }
            const mergeWithDefalt = {
                //merge default and user-given object
                ...DEFAULT_OBJECT,
                ...json_map[obj]
            };
            if (!columnsAndHeadings[mergeWithDefalt["group"]]) {
                columnsAndHeadings[mergeWithDefalt["group"]] = {};
            }
            if (!columnsAndHeadings[mergeWithDefalt["group"]][mergeWithDefalt["subGroup"]]) {
                columnsAndHeadings[mergeWithDefalt["group"]][mergeWithDefalt["subGroup"]] = {};
            }
            columnsAndHeadings[mergeWithDefalt["group"]][mergeWithDefalt["subGroup"]][obj] = mergeWithDefalt;
        }
        return columnsAndHeadings;
    },

    /** Helper method for @method generate
     * @memberof Generator
     * @method configureContainer
     * @param {HTMLElement} container Where to generate the menu, what we are configing
     * @param {Number} categoryCount how many categories? these will become seperate columns
     */
    configureContainer(container, categoryCount) {
        container.innerHTML = ""; //clear it out

        container.style.display = "grid";

        let columns = "";
        const perColPct = Math.floor(100 / categoryCount) + "%";
        for (let i = 0; i < categoryCount; i++)
            columns += perColPct + " ";
        container.style.gridTemplateColumns = columns; //set columns up
        container.style.height = "90%"
    },


    /** Helper method for @method generate
     * @memberof Generator
     * @method addColumns
     * @param {HTMLElement} container Where to generate the menu, what we are configing
     * @param {JSON} nested_json_map nested JSON map from @method makeNested
     */
    addColumns(container, nested_json_map) {
        for (const obj in nested_json_map) {
            const outerColumn = document.createElement("div");

            const newColumn = document.createElement("div");
            newColumn.className = "menuColumn colorMode1";
            newColumn.id = Util.spaceToUnderScore(obj);
            outerColumn.appendChild(newColumn);
            container.appendChild(outerColumn);

            const columnTitle = document.createElement("div");
            columnTitle.className = "categoryName";
            columnTitle.innerHTML = "<div class='vertical-center titleText colorMode1'>" + obj + "</div>";
            newColumn.appendChild(columnTitle);
        }
    },

    /** Helper method for @method generate
     * @memberof Generator
     * @method addColumns
     * @param {HTMLElement} container Where to generate the menu, what we are configing
     * @param {JSON} nested_json_map nested JSON map from @method makeNested
     */
    addContentToColumns(nested_json_map) {
        for (const obj in nested_json_map) {
            for (const header in nested_json_map[obj]) {
                const column = document.getElementById(Util.spaceToUnderScore(obj));
                if (!column) {
                    console.error("Error in column generation, could not find column!: " + obj);
                    return 1;
                }
                const subGroup = document.createElement("div");
                subGroup.className = "menuHeader colorMode1";
                subGroup.id = Util.spaceToUnderScore(obj) + Util.spaceToUnderScore(header);

                const subGroupHeader = document.createElement("div");
                subGroupHeader.className = "menuHeaderLabel colorMode1";
                subGroupHeader.innerHTML = Util.capitalizeString(Util.underScoreToSpace(header));
                subGroup.appendChild(subGroupHeader);

                const subGroupContainer = document.createElement("div");
                subGroupContainer.className = "menuHeaderContainer colorMode1";
                subGroup.appendChild(subGroupContainer);

                //now add content to each header
                for (const layer in nested_json_map[obj][header]) {
                    const layerName = layer;
                    const layerLabel = Util.capitalizeString(Util.underScoreToSpace(nested_json_map[obj][header][layer].label ? nested_json_map[obj][header][layer].label : layer));
                    const layerObj = nested_json_map[obj][header][layer];
                    const layerQuerier = new AutoQuery(layerObj); //important
                    const layerInfo = nested_json_map[obj][header][layer].info == null ? "" : nested_json_map[obj][header][layer].info;
                    subGroupContainer.appendChild(this.createLayerContainer(layerName, layerLabel, layerObj, layerQuerier, layerInfo)); //where most of the stuff happens
                }
                subGroupHeader.onclick = function () {
                    subGroupContainer.style.display = subGroupContainer.style.display === "none" ? "block" : "none";
                }

                column.appendChild(subGroup);
            }
        }
    },

    createLayerContainer(layerName, layerLabel, layerObj, layerQuerier, layerInfo) {
        //create entire container
        const layerContainer = document.createElement("div");
        layerContainer.className = "layerContainer";
        layerContainer.id = Util.spaceToUnderScore(layerLabel) + "_layer";

        //create checkbox selector for this layer, and add a label
        const layerSelector = document.createElement("div");
        layerSelector.className = "layerSelector colorMode1";

        const selectorLabel = document.createElement("label");
        selectorLabel.id = layerContainer.id + "_label";
        selectorLabel.innerHTML = Util.capitalizeString(Util.underScoreToSpace(layerLabel));

        const selector = document.createElement("input");
        selector.id = layerContainer.id + "_selector";
        selector.type = "checkbox";
        selector.className = "checkbox-for-layer";

        if (layerObj["defaultRender"]) { //if render by default, make it checked
            selector.checked = true;
        }
        layerSelector.appendChild(selectorLabel);
        layerSelector.appendChild(selector);
        if (layerInfo !== "") {
            layerSelector.appendChild(this.createTooltip(layerInfo));
        }
        layerContainer.appendChild(layerSelector);

        if (!layerObj["noAutoQuery"]) { //dynamic auto querying setup
            if (!layerObj["collection"]) {
                layerObj["collection"] = layerName;
            }

            layerObj["onConstraintChange"] = function (layerName, constraintName, value, isActive) {
                layerQuerier.updateConstraint(layerName, constraintName, value, isActive);
            };
            layerObj["onUpdate"] = function () { layerQuerier.query(); };
            layerObj["onAdd"] = function () { layerQuerier.onAdd(); };
            layerObj["onRemove"] = function () { layerQuerier.onRemove(); };
        }

        const onAdd = layerObj["onAdd"];
        const onRemove = layerObj["onRemove"];
        const onUpdate = layerObj["onUpdate"];
        selector.onchange = function () {
            if (selector.checked) {
                onAdd(layerName);
                updateQueue[layerName] = onUpdate;
                onUpdate(layerName);
            }
            else {
                delete updateQueue[layerName];
                onRemove(layerName);
            }
        }

        if (layerObj["constraints"]) {
            const layerConstraints = document.createElement("div");
            layerConstraints.className = "layerConstraints colorMode2 customBorder";
            layerConstraints.style.display = "none";
            let anyActiveConstraints = false;

            for (const constraint in layerObj["constraints"]) {
                const constraintName = constraint;
                const constraintDiv = this.createConstraintContainer(constraintName, layerName, layerObj, layerQuerier);
                if (constraintDiv.style.display !== "none") {
                    anyActiveConstraints = true;
                }
                layerConstraints.appendChild(constraintDiv);
            }

            if (!anyActiveConstraints) {
                layerConstraints.style.display = "none";
            }

            layerConstraints.appendChild(this.createControlSection(layerName, layerLabel, layerConstraints, layerQuerier, layerObj["constraints"], layerInfo));
            layerContainer.appendChild(layerConstraints);
            layerSelector.appendChild(this.createDropdown(layerConstraints));
        }
        return layerContainer;
    },

    resetConstraintsForLayer: function (layerName) {
        document.dispatchEvent(new CustomEvent(`${layerName}_reset_constraints`));
    },

    createControlSection(layerName, layerLabel, layerConstraints, layerQuerier, constraintsObj, layerInfo) {
        let controlDiv = document.createElement("div");
        controlDiv.className = "content-section customBorder colorMode1";
        let controlGroup = document.createElement("div");
        controlGroup.className = "layer-control-button-group col-md-auto";
        controlGroup.appendChild(this.createModal(layerLabel, layerConstraints, layerQuerier, constraintsObj, layerInfo));
        controlGroup.appendChild(this.resetConstraintButton(layerName));
        controlDiv.appendChild(controlGroup);
        return controlDiv;
    },

    createControlGroupText() {
        const controlGroupTextDiv = document.createElement("div");
        controlGroupTextDiv.className = "control-group-text";
        const controlGroupText = document.createElement("p");
        controlGroupText.innerText = "Layer Controls";
        controlGroupTextDiv.appendChild(controlGroupText);
        return controlGroupTextDiv;
    },

    resetConstraintButton: function (layerName) {
        let resetButton = document.createElement("button");
        resetButton.className = "btn btn-outline-dark reset-constraint-button";
        resetButton.type = "button";
        resetButton.innerText = "Reset Constraints";
        resetButton.onclick = () => {
            this.resetConstraintsForLayer(layerName);
        }
        return resetButton;
    },

    createModal: function (layerLabel, layerConstraints, layerQuerier, constraintsObj) {
        const modalButton = document.createElement("mod");
        modalButton.type = "modal-btn";
        modalButton.className = "btn btn-outline-dark";
        modalButton.role = "button";
        modalButton.href = "#";
        modalButton.innerHTML = "Advanced";
        // modalButton.innerHTML = "☰ Advanced...";
        modalButton.onclick = function () {
            this.selectOptions(layerLabel, layerConstraints, function (constraint, active) {
                layerQuerier.constraintSetActive(constraint, active);
            }, constraintsObj);
        }.bind(this);
        return modalButton;
    },

    createConstraintContainer: function (constraintName, layerName, layerObj, layerQuerier) {
        const constraintObj = layerObj["constraints"][constraintName];

        let container;

        if (constraintObj["type"] === "slider" || (constraintObj["type"] === "multiselector" && constraintObj["selectToRangeMap"])) {
            container = this.createSliderContainer(constraintName, constraintObj, layerObj, layerName);
            container.className = "content-section slider-section colorMode1 customBorder";
        }
        else if (constraintObj["type"] === "selector") {
            container = this.createCheckboxContainer(constraintName, constraintObj, layerObj, layerName, "radio");
        }
        else if (constraintObj["type"] === "multiselector") {
            container = this.createCheckboxContainer(constraintName, constraintObj, layerObj, layerName, "checkbox");
        }

        if (constraintObj["hide"]) {
            layerQuerier.constraintSetActive(constraintName, false);
            container.style.display = "none";
        }
        else {
            layerQuerier.constraintSetActive(constraintName, true);
        }
        return container;
    },

    createDropdown: function (layerConstraints) {
        const dropdown = document.createElement("img");
        dropdown.src = "./images/Dropdown_Black.png";
        dropdown.className = "dropdown-arrow";
        dropdown.style.transform = layerConstraints.style.display === "none" ? "rotate(0deg)" : "rotate(180deg)";
        dropdown.onclick = function () {
            layerConstraints.style.display = layerConstraints.style.display === "none" ? "block" : "none";
            dropdown.style.transform = layerConstraints.style.display === "none" ? "rotate(0deg)" : "rotate(180deg)";
        }
        return dropdown;
    },

    createTooltip: function (layerInfo) {
        const title = layerInfo;
        const tooltip = document.createElement("span");
        tooltip.innerHTML = "<img src='./images/Info_Black.png' class='tool-tip' data-toggle='tooltip'\
        data-placement='top' container='body' title=\'" + title + "\'>";
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
        return tooltip;
    },

    selectOptions: function (layerLabel, layerConstraints, setActive, constraintsObj) {
        if (document.getElementById("editConstraints")) {
            return;
        }

        const editDiv = document.createElement("div");
        editDiv.className = "editConstraints colorMode2 customBorder";
        editDiv.id = "editConstraints";

        const editDivHeader = document.createElement("div");
        editDivHeader.className = "editConstraintsHeader colorMode1";
        editDivHeader.innerHTML = `Select Constraints for ${layerLabel}`;
        editDiv.appendChild(editDivHeader);

        const editConstraintArea = document.createElement("div");
        editConstraintArea.className = "editConstraintArea colorMode1 customBorder";
        editDiv.appendChild(editConstraintArea)


        for (let i = 0; i < layerConstraints.childNodes.length - 1; i++) {

            const holderDiv = document.createElement("div");
            holderDiv.className = "editConstraintsConstraint";

            const child = layerConstraints.childNodes[i];
            const selectLabel = document.createElement("label");

            const name = Util.removePropertiesPrefix(Util.underScoreToSpace(constraintsObj[child.id].label ? constraintsObj[child.id].label : child.id));
            selectLabel.innerHTML = name;
            selectLabel.className = "checkbox-section-title"

            const select = document.createElement("input");
            select.type = "checkbox";
            select.checked = child.style.display !== "none";
            select.className = "constraintCheckbox";
            select.onchange = function () {
                setActive(child.id, select.checked);
                child.style.display = select.checked ? "block" : "none";
            }
            holderDiv.appendChild(select);
            holderDiv.appendChild(selectLabel);
            editConstraintArea.appendChild(holderDiv);
        }

        const saveAndCloseArea = document.createElement('div');
        saveAndCloseArea.className = "constraintCloseButton";

        const saveAndClose = document.createElement("button");
        saveAndClose.className = "btn btn-outline-dark"
        saveAndClose.innerHTML = "Close"
        saveAndClose.onclick = function () {
            document.body.removeChild(editDiv);
        }
        saveAndCloseArea.appendChild(saveAndClose);
        editDiv.appendChild(saveAndCloseArea);
        document.body.appendChild(editDiv);
    },

    mapNumToValue(num, stringToNumMap) {
        if(!stringToNumMap){
            return Number(num);
        }
        return Object.keys(stringToNumMap)[Object.values(stringToNumMap).indexOf(Math.floor(Number(num)))];
    },

    valueToLabel(value,step,isDate){
        return isDate ? 
            (new Date(Number(value))).toUTCString().substr(0, 16) : 
            (step < 1 ? 
                value : 
                typeof value === "number" ? 
                    Math.floor(value) : 
                    value);
    },

    valueMaxed(value,constraintObj){
        return constraintObj.plus && value >= constraintObj.range[1];
    },

    createSliderContainer: function (constraint, constraintObj, layerObj, layerName) {
        const sliderContainer = document.createElement("div");
        sliderContainer.className = "slider-individual";
        sliderContainer.id = constraint;

        const slider = document.createElement("div");
        const sliderLabel = document.createElement("div");
        sliderLabel.className = "slider-title";

        slider.id = constraint;
        noUiSlider.create(slider, {
            start: constraintObj['default'] ? constraintObj['default'] : [constraintObj['range'][0]], //default is minimum
            step: constraintObj['step'] ? constraintObj['step'] : 1, //default 1,
            range: {
                'min': constraintObj['range'][0],
                'max': constraintObj['range'][1]
            },
            connect: true,
        });

        const defaultRange = JSON.stringify(slider.noUiSlider.get());
        const name = Util.removePropertiesPrefix(Util.underScoreToSpace(constraintObj["label"] ? constraintObj["label"] : constraint));
        const step = constraintObj['step'] ? constraintObj['step'] : 1;
        const isDate = constraintObj['isDate'];
        const selectToRangeMap = constraintObj['selectToRangeMap'];
        slider.noUiSlider.on('update', function (values) {
            const value0 = this.mapNumToValue(values[0],selectToRangeMap);
            let labelHtml = '';
            labelHtml = `<div class='sliderLabel'>${name}:</div> <div class='sliderLabel' style='font-weight: bold;'>${this.valueToLabel(value0,step,isDate)}`;
            for (let i = 1; i < values.length; i++) {
                const valuei = this.mapNumToValue(values[i],selectToRangeMap);
                labelHtml += ` ➔  ${this.valueToLabel(valuei,step,isDate)}${this.valueMaxed(valuei,constraintObj) ? '+' : ''}`;
            }
            labelHtml += "</div>";
            sliderLabel.innerHTML = labelHtml;
            slider.firstElementChild.firstElementChild.firstElementChild.style.background = JSON.stringify(slider.noUiSlider.get()) === defaultRange ? "#a3a3a3" : "#007bff";
        }.bind(this));

        //listen for reset
        document.addEventListener(`${layerName}_reset_constraints`, () => {
            slider.noUiSlider.reset();
        });

        const onConstraintChange = layerObj['onConstraintChange'];
        if (onConstraintChange) {
            if(!selectToRangeMap) {
                onConstraintChange(layerName, constraint, slider.noUiSlider.get());
                slider.noUiSlider.on('set', function (values) {
                    onConstraintChange(layerName, constraint, values);
                });
            }
            else {
                const allOptions = Object.keys(selectToRangeMap);
                for(const optionName of allOptions) {
                    onConstraintChange(layerName, constraint, optionName, true);
                }
                slider.noUiSlider.on('set', function (values) {
                    const optionsSub = allOptions.filter(optionName => {
                        return selectToRangeMap[optionName] >= Math.floor(Number(values[0])) && selectToRangeMap[optionName] <= Math.floor(Number(values[1]));
                    });
                    for(const optionName of allOptions) {
                        onConstraintChange(layerName, constraint, optionName, optionsSub.includes(optionName));
                    }
                });
            }
        }
        sliderContainer.appendChild(sliderLabel);
        sliderContainer.appendChild(slider);
        return sliderContainer;
    },

    createCheckboxContainer: function (constraint, constraintObj, layerObj, layerName, type) {
        const checkboxContainer = document.createElement("div");
        checkboxContainer.className = "content-section checkbox-section colorMode1 customBorder";
        checkboxContainer.id = constraint;

        const checkboxLabel = document.createElement("div");
        checkboxLabel.className = "checkbox-section-label";
        const name = Util.removePropertiesPrefix(Util.underScoreToSpace(constraintObj["label"] ? constraintObj["label"] : constraint));
        checkboxLabel.innerHTML = name;
        checkboxContainer.appendChild(checkboxLabel);

        const checkboxConstraintContainer = document.createElement("div");
        checkboxConstraintContainer.className = "checkbox-section-options";
        checkboxContainer.appendChild(checkboxConstraintContainer);

        let isFirstCheckbox = true;
        constraintObj["options"].forEach(option => {
            if (option) {
                const checkboxSelectorContainer = document.createElement("div");
                const checkboxSelector = document.createElement("input");
                checkboxSelector.type = type;
                checkboxSelector.id = Util.spaceToUnderScore(option);
                const defaultChecked = type === "radio" ? isFirstCheckbox : true;
                checkboxSelector.checked = defaultChecked;
                //listen for reset
                document.addEventListener(`${layerName}_reset_constraints`, () => {
                    if (checkboxSelector.checked !== defaultChecked) {
                        checkboxSelector.checked = defaultChecked;
                        checkboxSelectorContainer.onchange();
                    }
                });
                checkboxSelector.name = constraint;
                isFirstCheckbox = false;
                const labelForRadioSelector = document.createElement("label");
                labelForRadioSelector.className = "checkbox-section-title";
                labelForRadioSelector.innerHTML = Util.capitalizeString(Util.underScoreToSpace(option));

                checkboxSelectorContainer.appendChild(checkboxSelector);
                checkboxSelectorContainer.appendChild(labelForRadioSelector);

                const onConstraintChange = layerObj['onConstraintChange'];
                const onUpdate = layerObj['onUpdate'];
                const optionName = option;
                if (onConstraintChange) {
                    if (checkboxSelector.checked)
                        onConstraintChange(layerName, constraint, optionName, true);

                    checkboxSelectorContainer.onchange = function () {
                        if (checkboxSelector.checked) {
                            onConstraintChange(layerName, constraint, optionName, true);
                        }
                        else if (type === "checkbox") {
                            onConstraintChange(layerName, constraint, optionName, false);
                        }
                    };
                }
                checkboxConstraintContainer.appendChild(checkboxSelectorContainer);
            }
        });
        return checkboxContainer;
    }

}