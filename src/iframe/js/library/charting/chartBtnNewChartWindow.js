document.getElementById('nav-graph-button').addEventListener('click', showGraph);
let buttonsOn = false;

function showGraph() {
    chartSystem.toggleVisible();
    if(!buttonsOn) {
        createAddChartArea();
        makeButtonsWork();
        buttonsOn = true;
    }
}

function createAddChartArea() {
    let addGraphBox = document.createElement("div");
    addGraphBox.className = "colorMode1 customBorder add-graph-box";
    addGraphBox.id = "graph-controller";
    let addGraphMessageDiv = document.createElement("div");
    addGraphMessageDiv.className = "add-graph-message row justify-content-center";
    let emptyCol = document.createElement("div");
    emptyCol.className = "col-sm";
    let addGraphMessage = document.createElement("p");
    addGraphMessage.className = "add-graph-message col-sm-auto";
    addGraphMessage.innerText = "Add a...";
    let closeGraphArea = document.createElement("div");
    closeGraphArea.className = "col-sm";
    let closeGraphButton = document.createElement("button");
    closeGraphButton.className = "btn btn-outline-dark close-graph-area-button";
    closeGraphButton.innerText = "Close";
    closeGraphButton.addEventListener('click', showGraph);
    closeGraphArea.appendChild(closeGraphButton);
    addGraphMessageDiv.appendChild(emptyCol);
    addGraphMessageDiv.appendChild(addGraphMessage);
    addGraphMessageDiv.appendChild(closeGraphArea);

    let graphButtonArea = document.createElement("div");
    graphButtonArea.className = "graph-button-area row justify-content-center"
    let histogramButton = document.createElement("button");
    histogramButton.className = "btn btn-outline-dark graph-button";
    histogramButton.id = "histogram-button-id";
    histogramButton.innerText = "Histogram";
    let scatterplotButton = document.createElement("button");
    scatterplotButton.className = "btn btn-outline-dark graph-button";
    scatterplotButton.id = "scatterplot-button-id";
    scatterplotButton.innerText = "Scatterplot";
    let lineGraphButton = document.createElement("button");
    lineGraphButton.className = "btn btn-outline-dark graph-button";
    lineGraphButton.id = "linegraph-button-id";
    lineGraphButton.innerText = "Line Graph";
    lineGraphButton.disabled = true; //FIXME Remove this line once lineGraphs are implemented

    graphButtonArea.appendChild(histogramButton);
    graphButtonArea.appendChild(scatterplotButton);
    graphButtonArea.appendChild(lineGraphButton);

    addGraphBox.appendChild(addGraphMessageDiv);
    addGraphBox.appendChild(graphButtonArea);
    document.getElementById('box1').appendChild(addGraphBox);
}

function makeButtonsWork() {
    document.getElementById('histogram-button-id').addEventListener('click', createHistogram);
    document.getElementById('scatterplot-button-id').addEventListener('click', createScatterplot);
    document.getElementById('linegraph-button-id').addEventListener('click', createLinegraph);
}
