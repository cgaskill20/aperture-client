let box1 = document.getElementById("box1");

function createChartControl(chart, graphBox, type) {
    if(type === 'scatterplot') {
        return chartControlFor2Vars(chart, graphBox);
    }
    else if (type === 'histogram' || type === 'linegraph'){
        return chartControlFor1Var(chart, graphBox);
    }
}

function chartControlFor1Var(chart, graphBox) {
    let chartControl = createChartControlArea();
    chartControl.appendChild(createChartControlGroup(chart, 'x',"Constraint"));
    chartControl.appendChild(createCloseButton(graphBox));
    graphBox.appendChild(chartControl);
    return chartControl;
}

function chartControlFor2Vars(chart, graphBox) {
    let chartControl = createChartControlArea();
    chartControl.appendChild(createChartControlGroup(chart, 'x', "X-Axis"));
    chartControl.appendChild(createChartControlGroup(chart, 'y', "Y-Axis"));
    chartControl.appendChild(createCloseButton(graphBox));
    graphBox.appendChild(chartControl);
    return chartControl;
}

function createChartControlArea() {
    let chartControl = document.createElement("div");
    chartControl.className = "chart-control";
    return chartControl;
}

function createChartControlGroup(chart, axis, dropdownTitle) {
    let chartControlGroup = document.createElement("div");
    chartControlGroup.className = "btn-group chart-control-button";
    chartControlGroup.setAttribute("role", "group");
    let leftToggle = createSideToggle(chart, axis, '<');
    let chartDropdown = createDropdown(chart, dropdownTitle, axis);
    let rightToggle = createSideToggle(chart, axis, '>');
    chartControlGroup.appendChild(leftToggle);
    chartControlGroup.appendChild(chartDropdown);
    chartControlGroup.appendChild(rightToggle);
    return chartControlGroup;
}

function createSideToggle(chart, axis, arrowDirection) {
    let sideToggle = document.createElement("button");
    sideToggle.className = "btn btn-outline-dark";
    sideToggle.type = "button";
    sideToggle.innerText = arrowDirection;
    sideToggle.onclick = arrowDirection === '<' ? () => {chart.cycleAxis(axis, "previous")} : () => {chart.cycleAxis(axis, "next")};
    return sideToggle;
}

function createDropdown(chart, title, axis) {
    let activeFeatures = chart.getValidFeatures();

    let chartDropdown = document.createElement("div");
    chartDropdown.className = "btn-group";
    chartDropdown.setAttribute("role", "group");

    let dropdownButton = document.createElement("button");
    dropdownButton.id = "drop-it-down";
    dropdownButton.type = "button";
    dropdownButton.className = "btn btn-outline-dark dropdown-toggle";
    dropdownButton.setAttribute("data-toggle", "dropdown");
    dropdownButton.setAttribute("aria-haspopup", "true");
    dropdownButton.setAttribute("aria-expanded", "false");
    dropdownButton.innerText = title;

    let dropdownMenu = document.createElement("div");
    dropdownMenu.className = "dropdown-menu";
    dropdownMenu.setAttribute("aria-labelledby", "drop-it-down");

    activeFeatures.forEach(feature => {
        let dropdownItem = document.createElement("a");
        dropdownItem.className = "dropdown-item";
        dropdownItem.href = chart.changeFeature(axis, feature);
        dropdownItem.innerText = feature;
        dropdownMenu.appendChild(dropdownItem);
    });

    // for(let i = 0; i < 3; i++) {
    //     let dropdownItem = document.createElement("a");
    //     dropdownItem.className = "dropdown-item";
    //     // dropdownItem.href = "#";
    //     dropdownItem.innerText = "Constraint " + i;
    //     dropdownMenu.appendChild(dropdownItem);
    // }

    chartDropdown.appendChild(dropdownButton);
    chartDropdown.appendChild(dropdownMenu);

    $(function () {
        $('[data-toggle="dropdown"]').dropdown()
    })

    return chartDropdown;
}

function createCloseButton(graphBox) {
    let closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "btn btn-outline-dark chart-control-button-close";
    closeButton.addEventListener('click', function() {
        box1.removeChild(graphBox);
        totalGraphs--;
        checkNumberOfGraphs();
    });
    closeButton.innerText = "Close";
    return closeButton;
}
