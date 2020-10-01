//Author: Daniel Reynolds
//Purpose: Generate d3.js graphs of different types from data
//Dependencies: d3.v4.js, grapher.css

const GRAPHTYPE = {
    bar: 1,
    pie: 2,
    histogram: 3
}


let Grapher = {
    HTML_container: null,
    currentGraphs: [],
    /**
     * Initializes Grapher onto a Div/Container
     * @memberof Grapher
     * @method init
     * @param {HTMLElement} HTML_container html element to put all the graphs into
     */
    init: function (HTML_container) {
        this.HTML_container = HTML_container;
    },

    /**
     * Creates new graph
     * @memberof Grapher
     * @method createGraph
     * @param {int} graphType enum based on GraphType
     * @returns {string} unique id for this graph, use this for updating with @method updateGraph
     */
    createGraph: function (graphType) {
        const id = GrapherUtil.createRandomId();
        let graphDiv = document.createElement("div");
        graphDiv.id = id;
        let squareSize = 400;
        graphDiv.classList.add("dataGraph");
        var checkExist = setInterval(function () {
            if ($("#" + id).length) {
                clearInterval(checkExist);
            }
        }, 100);
        this.HTML_container.appendChild(graphDiv);

        let graph = d3.select("#" + id)
            .append("svg")
            .attr("width", squareSize)
            .attr("height", squareSize)
            .append("g");
        let x = d3.scaleBand()
            .range([0, squareSize])
            .padding(0.2);
        let xAxis = graph.append("g")
            .attr("transform", "translate(0," + squareSize + ")");
        let y = d3.scaleLinear()
            .range([squareSize, 0]);
        let yAxis = graph.append("g")
            .attr("class", "myYaxis")
        this.currentGraphs.push({
            id: id, graph: graph, axes:
            {
                x: x,
                xAxis: xAxis,
                y: y,
                yAxis: yAxis
            }
        });
        return id;
    },

    /**
     * Updates an existing graph
     * @memberof Grapher
     * @method updateGraph
     * @param {string} graphId id of the graph you are updating
     * @param {object} data data in the form {group1: amount, group2: amount} EX: {male: 46, female, 54}
     * @returns {bool} true for success, false otherwise
     */
    updateGraph: function (graphId, data) {
        console.log("Update graph: " + graphId + " to " + JSON.stringify(data));
        let graph = GrapherUtil.getGraph(graphId);

        // Update the X axis
        graph.axes.x.domain(data.map(function (d) { return d.group; }))
        graph.axes.xAxis.call(d3.axisBottom(graph.axes.x))

        // Update the Y axis
        graph.axes.y.domain([0, d3.max(data, function (d) { return d.count })]);
        graph.axes.yAxis.transition().duration(1000).call(d3.axisLeft(graph.axes.y));

        let u = graph.graph.selectAll("rect")
            .data(data)

        u
            .enter()
            .append("rect") // Add a new rect for each new elements
            .merge(u) // get the already existing elements as well
            .transition() // and apply changes to all of them
            .duration(1000)
            .attr("x", function (d) { return graph.axes.x(d.group); })
            .attr("y", function (d) { return graph.axes.y(d.count); })
            .attr("width", graph.axes.x.bandwidth())
            .attr("height", function (d) { return 400 - graph.axes.y(d.count); })
            .attr("fill", "#69b3a2")

        // If less group in the new dataset, I delete the ones not in use anymore
        u
            .exit()
            .remove()
    },

    /**
     * Removes existing graph
     * @memberof Grapher
     * @method removeGraph
     * @param {string} graphId id of the graph you are removing
     * @returns {bool} true for success, false otherwise
     */
    removeGraph: function (graphId) {

    }
}

const GrapherUtil = {
    /**
     * Creates Random string/id
     * @memberof GrapherUtil
     * @method createRandomId
     * @returns {string} random id
     */
    createRandomId: function () {
        let rnd = Math.random().toString(36).substr(2, 9);
        while (true) {
            if (!this.getGraph(rnd)) {
                break;
            }
            rnd = Math.random().toString(36).substr(2, 9);
        }
        return rnd;
    },
    /**
     * Gets graph from id
     * @memberof GrapherUtil
     * @method getGraph
     * @param {string} id id of graph to get
     * @returns {object} graph
     */
    getGraph: function (id) {
        for (let i = 0; i < Grapher.currentGraphs.length; i++) {
            if (Grapher.currentGraphs[i].id == id) {
                return Grapher.currentGraphs[i];
            }
        }
        return null;
    }
}