//Author: Daniel Reynolds
//Purpose: Add selectable checkboxes to html for getInfrastructure.js
//Dependencies: getInfrastructure.js

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
                selectContainer.innerHTML += "<button type='button' class='collapsible'>" + groupInfo.groups[i] + "</button>"
                let innerHTML = this.makeList(groupInfo.elements[i], elementsJson, type, colorCode, callFunc);
                selectContainer.innerHTML += "<div class='content' style='display:none;'>" + innerHTML + "</div>";
            }
            if (clearFunc) {
                selectContainer.innerHTML += "<button id='clearFeatures' onClick='RenderInfrastructure.removeAllFeaturesFromMap(); Generator.clearChecks();'>Clear All Features</button>";
            }
            if (attribution) {
                this.attribution(attribution, selectContainer);
            }
            var coll = document.getElementsByClassName("collapsible");
            for (let i = 0; i < coll.length; i++) {
                coll[i].addEventListener("click", function () {
                    this.classList.toggle("active");
                    var content = this.nextElementSibling;
                    if (content.style.display === "block") content.style.display = "none";
                    else content.style.display = "block";
                });
            }
        }
        else {
            if (attribution) {
                this.attribution(attribution, selectContainer);
            }
            selectContainer.innerHTML += this.makeList(Object.keys(elementsJson), elementsJson, type, colorCode, callFunc);
        }
        let featureChecks = document.getElementsByClassName("featureCheck")
        for (let i = 0; i < featureChecks.length; i++) {
            featureChecks[i].onchange = function () { callFunc(featureChecks[i]); };
        }
        if (clearFunc) {
            document.getElementById("clearFeatures").onclick = function () { RenderInfrastructure.removeAllFeaturesFromMap(); Generator.clearChecks(); };
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
    makeList: function (elements, elementsJson, type, colorCode, callFunc) {
        let retHTML = '';
        elements.forEach(element => {
            let checked = elementsJson[element]['defaultRender'] ? 'checked' : '';
            let color = colorCode && elementsJson[element]['color'] ? 'style="border-bottom:3px solid ' + elementsJson[element]['color'] + ';"' : '';
            retHTML += '<div style="margin-top:3px;margin-bottom:3px"><input class="featureCheck" type="' + type + '" name="selector" id="' + element + '" ' + checked + '><label for="' + element + '" ' + color + '>' + Util.capitalizeString(Util.underScoreToSpace(element)) + '</label></div>';
        });
        return retHTML;
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
        htmlElement.innerHTML += '<button class="attributionContainer" id="attributionClickable"><div class="clickableAttr">Icon Attributions</div><div id="attrText" class="attribution">' + html + '</div></button>';
        console.log(document.getElementById);
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
