/* Some things that are currently in the catalog:
    0: "temp"
    1: "RPL_THEMES"  // SVI
                     // note: the chart system is stupid and can't tell
                     // the difference between county and tract level SVI
                     // at the moment, so this is only county SVI
                     // /shrug
    2: "2010_median_household_income"
    3: "median_age_total"
    4: "median_age_female"
    5: "median_age_male"
    6: "2010_total_population"
    7: "avgAQI"
 */

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
