//Author: Daniel Reynolds
//Purpose: Add selectable checkboxes to html for getInfrastructure.js
//Dependencies: getInfrastructure.js, nouislider.js, nouislider.css

/** 
* @namespace Generator
*/
let Generator = {
    elementsJson: null,
    selectContainer: null,
    colorCode: null,
    /** Configurates the select container
     * @memberof Generator
     * @method config
     * @param {JSON} elementsJson Json containing the info like colors and icons
     * from getInfrastructure
     * @param {HTMLElement} selectContainer Where to add the checkboxes
     * @param {boolean} colorCode should elements with color attributes have colors near
     * @param {Function} callFunc should elements with color attributes have colors near
     * their checkboxes?
     * @param {string} type checkbox style. ex: "checkbox" or "radio"
     * @param {boolean} groupModules should modules have groups? this requires special JSON groups
     */
    config: function (elementsJson, selectContainer, colorCode, callFunc, type, groupModules, attribution, clearFunc) {
        if (selectContainer == null || elementsJson == null) {
            return;
        }
        if (groupModules) {
            let groupInfo = this.groupMods(elementsJson);
            for (let i = 0; i < groupInfo.groups.length; i++) {
                //selectContainer.insertAdjacentHTML('beforeend', "<button type='button' class='collapsible'>" + groupInfo.groups[i] + "</button>");
                let collapsibleButton = document.createElement("button");
                collapsibleButton.type = "button";
                collapsibleButton.className = "collapsible";
                collapsibleButton.innerHTML = groupInfo.groups[i];
                selectContainer.appendChild(collapsibleButton);

                let content = document.createElement("div");
                content.className = "content";
                content.style.display = "none";
                //selectContainer.insertAdjacentHTML('beforeend', "<div class='content' style='display:none;'></div>");
                this.makeList(groupInfo.elements[i], elementsJson, type, colorCode, content);
                selectContainer.appendChild(content);

                collapsibleButton.addEventListener("click", function () {
                    this.classList.toggle("active");
                    var content = this.nextElementSibling;
                    if (content.style.display === "block") content.style.display = "none";
                    else content.style.display = "block";
                });
            }
            if (clearFunc) {
                let clearFeatures = document.createElement('button');
                clearFeatures.id = 'clearFeatures';
                clearFeatures.innerHTML = 'Clear All Features';
                clearFeatures.onclick = function(){
                    RenderInfrastructure.removeAllFeaturesFromMap(); 
                    Generator.clearChecks(); 
                    Census_Visualizer.clearAll();
                };
                selectContainer.appendChild(clearFeatures);
            }
            if (attribution) {
                this.attribution(attribution, selectContainer);
            }
        }
        else {
            if (attribution) {
                this.attribution(attribution, selectContainer);
            }
            selectContainer.insertAdjacentHTML('beforeend', this.makeList(Object.keys(elementsJson), elementsJson, type, colorCode, callFunc));
        }
        let featureChecks = document.getElementsByClassName("featureCheck")
        for (let i = 0; i < featureChecks.length; i++) {
            featureChecks[i].onchange = function () { callFunc(featureChecks[i]); };
        }
    },
    /** Helper for config 
     * @memberof config
     * @method makeList
     * @param {Array} elements
     * @param {object} elementsJson
     * @param {string} type
     * @param {boolean} colorCode
     * @param {Function} callFunc
     * @returns {string}
    */
    makeList: function (elements, elementsJson, type, colorCode, container) {
        elements.forEach(element => {
            if (type === "radio" || type === "checkbox") {
                let checked = elementsJson[element]['defaultRender'] ? 'checked' : '';
                let color = colorCode && elementsJson[element]['color'] ? 'style="border-bottom:3px solid ' + elementsJson[element]['color'] + ';"' : '';
                container.insertAdjacentHTML('beforeend', '<div style="margin-top:3px;margin-bottom:3px"><input class="featureCheck" type="' + type + '" name="selector" id="' + Util.spaceToUnderScore(element) + '" ' + checked + '>' +
                    '<label for="' + element + '" ' + color + '>' + Util.capitalizeString(Util.underScoreToSpace(element)) + '</label></div>');

                
                for (constraint in elementsJson[element]['constraints']) {
                    let slider = document.createElement("div");
                    let sliderLabel = document.createElement("div");
                    container.appendChild(sliderLabel);
                    
                    slider.style.marginBottom = '15px';
                    slider.id = Util.spaceToUnderScore(element) + "_" + Util.spaceToUnderScore(constraint);

                    noUiSlider.create(slider, {
                        start: elementsJson[element]['constraints'][constraint]['default'] ? elementsJson[element]['constraints'][constraint]['default'] : [elementsJson[element]['constraints'][constraint]['range'][0]], //default is minimum
                        
                        step: elementsJson[element]['constraints'][constraint]['step'] ? elementsJson[element]['constraints'][constraint]['step'] : 1, //default 1,

                        range: {
                            'min': elementsJson[element]['constraints'][constraint]['range'][0],
                            'max': elementsJson[element]['constraints'][constraint]['range'][1]
                        },

                        connect: true,
                    });
                    const name = Util.capitalizeString(Util.underScoreToSpace(elementsJson[element]['constraints'][constraint]["label"] ? elementsJson[element]['constraints'][constraint]["label"] : constraint));
                    const step = elementsJson[element]['constraints'][constraint]['step'] ? elementsJson[element]['constraints'][constraint]['step'] : 1;
                    slider.noUiSlider.on('update', function (values) {
                        sliderLabel.innerHTML = name + ": " + (step < 1 ? values[0] : Math.floor(values[0]));
                        for(let i = 1; i < values.length; i++){
                            sliderLabel.innerHTML += " - " + (step < 1 ? values[i] : Math.floor(values[i]));
                        }
                    });
                    slider.noUiSlider.on('change', function (values) {
                        if(elementsJson[element]['onConstraintChange'])
                            eval(elementsJson[element]['onConstraintChange']);
                    });
                
                    container.appendChild(slider);
                }

            }
        });
    },
    /** Unchecks every checklist element
     * @memberof Generator
     * @method clearChecks
     */
    clearChecks: function () {
        var features = document.getElementsByClassName("featureCheck");
        for (let i = 0; i < features.length; i++) {
            features[i].checked = false;
        }
    },
    /** Helper for config
     * @memberof Generator
     * @method groupMods
     * @param {string} json
     */
    groupMods: function (json) {
        let groups = [];
        let groupElements = [];
        for (x in json) {
            if (!json[x]['groupMem'] || !json[x]['query']) {
                continue;
            }
            if (groups.includes(json[x]['groupMem'])) {
                groupElements[groups.indexOf(json[x]['groupMem'])].push(x);
            }
            else {
                groups.push(json[x]['groupMem']);
                groupElements.push([x]);
            }
        }
        return { groups: groups, elements: groupElements };
    },
    /** Helper for config
     * @memberof Generator
     * @method attribution
     * @param {string} html
     */
    attribution: function (html, htmlElement) {
        htmlElement.insertAdjacentHTML('beforeend', '<button class="attributionContainer" id="attributionClickable"><div class="clickableAttr">Icon Attributions</div><div id="attrText" class="attribution">' + html + '</div></button>');
        document.getElementById("attributionClickable").onclick = function () { Generator.showAttribution(document.getElementById("attrText")) };
    },
    showAttribution: function (htmlElement) {
        $(htmlElement).last().css({ "display": $(htmlElement).last().css("display") === "none" ? "block" : "none" });
    }
}

//mocha-test stuff only down from here

try {
    module.exports = {
        Generator: Generator
    }
} catch (e) { }
