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
    chartControlGroup.role = "group";
    let leftToggle = createSideToggle(chart, axis, '<');
    let chartDropdown = createDropdown(dropdownTitle);
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

function createDropdown(title) {
    let chartDropdown = document.createElement("div");
    chartDropdown.className = "btn-group";
    chartDropdown.role = "group";
    let firstPart = "<button type='button' class='btn btn-outline-dark dropdown-toggle' type='button' " +
        "id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
    let lastPart = "</button> <div class='dropdown-menu' aria-labelledby='dropdownMenuButton'> " +
            "<a class='dropdown-item' href='#'>Coming Soon</a>" +
            "<a class='dropdown-item' href='#'>Coming Soon</a>" +
            "<a class='dropdown-item' href='#'>Coming Soon</a>" +
        "</div>";
    chartDropdown.innerHTML = firstPart + title + lastPart;
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
