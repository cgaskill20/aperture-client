
export default class ControlDropdown {
    constructor(frame, title) {
        this.chartControlButtonGroup = this.createChartControlButtonGroup();
        let chartDropdown = this.createDropdown(frame, title);
        this.chartControlButtonGroup.appendChild(chartDropdown);
    }

    getDOMNode() {
        return this.chartControlButtonGroup;
    }

    createChartControlButtonGroup() {
        let chartControlButtonGroup = document.createElement("div");
        chartControlButtonGroup.className = "btn-group chart-control-button";
        chartControlButtonGroup.setAttribute("role", "group");
        return chartControlButtonGroup;
    }

    createDropdown(chart, title) {
        let chartDropdown = this.createChartDropdown();
        let dropdownButton = this.createDropdownButton(title);
        this.dropdownMenu = this.createDropdownMenu();

        chartDropdown.appendChild(dropdownButton);
        chartDropdown.appendChild(this.dropdownMenu);

        $(function () {
            $('[data-toggle="dropdown"]').dropdown()
        })

        return chartDropdown;
    }

    createChartDropdown() {
        let chartDropdown = document.createElement("div");
        chartDropdown.className = "btn-group";
        chartDropdown.setAttribute("role", "group");
        return chartDropdown;
    }

    createDropdownButton(title) {
        let dropdownButton = document.createElement("button");
        dropdownButton.id = "drop-it-down";
        dropdownButton.type = "button";
        dropdownButton.className = "btn btn-outline-dark dropdown-toggle";
        dropdownButton.setAttribute("data-toggle", "dropdown");
        dropdownButton.setAttribute("aria-haspopup", "true");
        dropdownButton.setAttribute("aria-expanded", "false");
        dropdownButton.innerText = title;
        return dropdownButton;
    }

    createDropdownMenu() {
        let dropdownMenu = document.createElement("div");
        dropdownMenu.className = "dropdown-menu";
        dropdownMenu.setAttribute("aria-labelledby", "drop-it-down");
        return dropdownMenu;
    }

    setOptions(options) {
        while (this.dropdownMenu.firstChild) {
            this.dropdownMenu.removeChild(this.dropdownMenu.firstChild);
        }

        for (let option of options) {
            let dropdownItem = document.createElement("a");
            dropdownItem.className = "dropdown-item dropdown-menu-item-custom";
            dropdownItem.onclick = option.onclick
            dropdownItem.innerText = option.name;
            this.dropdownMenu.appendChild(dropdownItem);
        }
    }
}
