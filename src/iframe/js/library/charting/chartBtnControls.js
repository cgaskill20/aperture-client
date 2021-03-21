let box1 = document.getElementById("box1");

function createChartControl(chart, graphBox, type) {
    let chartControl = document.createElement("div");
    chartControl.className = "chart-control row justify-content-md-center";
    let col1 = createEmptyColumn();
    let col2 = createEmptyColumn();
    let col3 = createEmptyColumn();
    col2.className = "col-sm-auto";
    if(type === 'scatterplot') {
        col2.appendChild(createChartControlGroup(chart, 'x', "X-Axis"));
        col2.appendChild(createChartControlGroup(chart, 'y', "Y-Axis"));
    }
    else {
        col2.appendChild(createChartControlGroup(chart, 'x',"Constraint"));
    }
    col3.appendChild(createCloseButton(graphBox));
    chartControl.appendChild(col1);
    chartControl.appendChild(col2);
    chartControl.appendChild(col3);
    return chartControl;
}

function createEmptyColumn() {
    let emptyCol = document.createElement("div");
    emptyCol.className = "col-sm"
    return emptyCol;
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

    chart.addNewFeatureCallback((activeFeatures) => {
        while(dropdownMenu.firstChild) {
            dropdownMenu.removeChild(dropdownMenu.firstChild);
        }
        activeFeatures.forEach(feature => {
            let dropdownItem = document.createElement("a");
            dropdownItem.className = "dropdown-item";
            dropdownItem.onclick = ()=> {
                chart.changeFeature(axis, feature);
            }
            dropdownItem.innerText = feature;
            dropdownMenu.appendChild(dropdownItem);
        });
    });

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
