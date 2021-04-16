
import ControlDropdown from "./controlDropdown"
import { FeatureChartMessageType } from "./featureChartMessageType"

export default class FeatureDropdown extends ControlDropdown {
    constructor(frame, title, axis) {
        super(frame, title);

        this.axis = axis;

        let leftToggle = this.createSideToggle(frame, axis, '<');
        let rightToggle = this.createSideToggle(frame, axis, '>');
        
        this.chartControlButtonGroup.appendChild(leftToggle);
        this.chartControlButtonGroup.appendChild(rightToggle);
    }

    createSideToggle(chart, axis, arrowDirection) {
        let sideToggle = document.createElement("button");
        sideToggle.className = "btn btn-outline-dark";
        sideToggle.type = "button";
        sideToggle.innerText = arrowDirection;
        sideToggle.onclick = arrowDirection === '<' ? 
            () => { chart.passMessage({ type: FeatureChartMessageType.CYCLE_AXIS, axis: axis, direction: 'previous' }); } : 
            () => { chart.passMessage({ type: FeatureChartMessageType.CYCLE_AXIS, axis: axis, direction: 'next'}); };
        return sideToggle;
    }

    getLinkedAxis() {
        return this.axis;
    }
}
