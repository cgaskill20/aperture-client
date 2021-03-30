let maxGraphs = 6;
let totalGraphs = 0;
let maxGraphsReached = false;

function createHistogram() {
    moreGraphsPossible();

    let chart = chartSystem.getChartFrame(ChartingType.HISTOGRAM);

    let graphBox = document.createElement("div");
    graphBox.className = "colorMode1 customBorder single-chart-box";
    graphBox.appendChild(createChartControl(chart, graphBox, 'histogram'));

    graphBox.appendChild(chart.getDOMNode());
    addTheGraph(graphBox);
}

function createScatterplot() {
    moreGraphsPossible();

    let chart = chartSystem.getChartFrame(ChartingType.SCATTERPLOT);

    let graphBox = document.createElement("div");
    graphBox.className = "colorMode1 customBorder single-chart-box";
    graphBox.appendChild(createChartControl(chart, graphBox, 'scatterplot'));

    graphBox.appendChild(chart.getDOMNode());
    addTheGraph(graphBox);
}

function createLinegraph() {
    moreGraphsPossible();

    let chart = chartSystem.getChartFrame(ChartingType.LINEGRAPH);

    let graphBox = document.createElement("div");
    graphBox.className = "colorMode1 customBorder single-chart-box";
    graphBox.appendChild(createChartControl(chart, graphBox, 'linegraph'));

    graphBox.appendChild(chart.getDOMNode());
    addTheGraph(graphBox);
}

function addTheGraph(graphBox) {
    let box1 = document.getElementById("box1");
    if(box1.childNodes.length === 1) {
        box1.appendChild(graphBox);
    }
    else {
        box1.insertBefore(graphBox, box1.childNodes[2]);
    }
}

function moreGraphsPossible() {
    totalGraphs++;
    checkNumberOfGraphs();
}

function checkNumberOfGraphs() {
    if(totalGraphs >= maxGraphs) {
        maxGraphsReached = true;
    }
    else {
        maxGraphsReached = false;
    }
    buttonsOnOff();
}

function buttonsOnOff() {
    document.getElementById('histogram-button-id').disabled = maxGraphsReached;
    document.getElementById('scatterplot-button-id').disabled = maxGraphsReached;
    // document.getElementById('linegraph-button-id').disabled = maxGraphsReached; //FIXME comment in when linegraphs are implemented
}
