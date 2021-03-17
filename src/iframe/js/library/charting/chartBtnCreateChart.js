let maxGraphs = 6;
let totalGraphs = 0;
let maxGraphsReached = false;

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

function createHistogram() {
    moreGraphsPossible();

    let chart = chartSystem.getChartFrame(ChartingType.HISTOGRAM);
    let box1 = document.getElementById("box1");

    let graphBox = document.createElement("div");
    graphBox.className = "colorMode1 customBorder single-chart-box";
    graphBox.appendChild(createChartControl(chart, graphBox, 'histogram'));

    graphBox.appendChild(chart.getDOMNode());
    chart.changeFeature("2010_median_household_income"); //FIXME this is hard-coded from Pierce
    box1.appendChild(graphBox);
}

function createScatterplot() {
    moreGraphsPossible();

    let chart = chartSystem.getChartFrame(ChartingType.SCATTERPLOT);
    let box1 = document.getElementById("box1");

    let graphBox = document.createElement("div");
    graphBox.className = "colorMode1 customBorder single-chart-box";
    graphBox.appendChild(createChartControl(chart, graphBox, 'scatterplot'));

    graphBox.appendChild(chart.getDOMNode());
    box1.appendChild(graphBox);

}

function createLinegraph() {
    moreGraphsPossible();

    let chart = chartSystem.getChartFrame(ChartingType.LINEGRAPH);
    let box1 = document.getElementById("box1");

    let graphBox = document.createElement("div");
    graphBox.className = "colorMode1 customBorder single-chart-box";
    graphBox.appendChild(createChartControl(chart, graphBox, 'linegraph'));

    graphBox.appendChild(chart.getDOMNode());
    box1.appendChild(graphBox);
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
    // document.getElementById('linegraph-button-id').disabled = maxGraphsReached;
}
