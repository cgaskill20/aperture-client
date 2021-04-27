import { createHistogram, createScatterplot, createLinegraph} from "./chartBtnCreateChart";

document.getElementById('nav-graph-button').addEventListener('click', showGraph);
let buttonsOn = false;

function showGraph() {
    window.chartSystem.toggleVisible();
    if(!buttonsOn) {
        createAddChartArea();
        makeButtonsWork();
        buttonsOn = true;
    }
}

function createAddChartArea() {
    let addGraphBox = document.createElement("div");
    addGraphBox.className = "colorMode1 add-graph-box";
    addGraphBox.id = "graph-controller";
    addGraphBox.appendChild(makeGraphButtonGroup());
    document.getElementById('box1').appendChild(addGraphBox);
}

function makeGraphButtonGroup() {
    let graphButtonAreaDiv = document.createElement("div");
    graphButtonAreaDiv.className = "row justify-content-center";
    graphButtonAreaDiv.appendChild(createGraphButtonArea());
    return graphButtonAreaDiv;
}

function createGraphButtonArea() {
    let graphButtonArea = document.createElement("div");
    graphButtonArea.className = "btn-group";
    graphButtonArea.setAttribute("role", "group");
    createGraphButtons(graphButtonArea);
    return graphButtonArea;
}

function createGraphButtons(graphButtonArea) {
    let histogramButton = makeGraphButton("histogram-button-id", "Histogram");
    let scatterplotButton = makeGraphButton("scatterplot-button-id", "Scatterplot");
    let lineGraphButton = makeGraphButton("linegraph-button-id", "Line Graph");
    let closeGraphButton = makeCloseButton();

    graphButtonArea.appendChild(histogramButton);
    graphButtonArea.appendChild(scatterplotButton);
    graphButtonArea.appendChild(lineGraphButton);
    graphButtonArea.appendChild(closeGraphButton);
}

function makeGraphButton(id, name, disable = false) {
    let button = document.createElement("button");
    button.className = "btn btn-outline-dark";
    button.id = id;
    button.innerText = name;
    button.disabled = disable;
    return button;
}

function makeCloseButton() {
    let closeGraphButton = document.createElement("button");
    closeGraphButton.className = "btn btn-outline-dark";
    closeGraphButton.innerText = "Close";
    closeGraphButton.addEventListener('click', showGraph);
    return closeGraphButton;
}

function makeButtonsWork() {
    document.getElementById('histogram-button-id').addEventListener('click', createHistogram);
    document.getElementById('scatterplot-button-id').addEventListener('click', createScatterplot);
    document.getElementById('linegraph-button-id').addEventListener('click', createLinegraph);
}
