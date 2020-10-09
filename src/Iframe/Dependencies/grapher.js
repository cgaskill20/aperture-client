//Author: Daniel Reynolds
//Purpose: Generate d3.js graphs of different types from data
//Dependencies: d3.v4.js, grapher.css


const GRAPHTYPE = {
    bar: 1,
    pie: 2,
    histogram: 3
}
const MARGIN = 30;

let readyContainers = []; //buffer of containers already on dom so there is no wait time
//populate buffer

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
        for (let i = 0; i < 5; i++) {
            GrapherUtil.addContainer();
        }
    },

    /**
     * Creates new graph
     * @memberof Grapher
     * @method createGraph
     * @param {int} graphType enum based on GraphType
     * @returns {string} unique id for this graph, use this for updating with @method updateGraph
     */
    createGraph: function (graphType) {
        console.log("here");
        const id = readyContainers.shift(); //get element from front of list
        document.getElementById(id).style.display = "block";
        GrapherUtil.addContainer();

        const squareSize = document.getElementById(id).scrollWidth - MARGIN * 2;
        let graph = d3.select(document.getElementById(id))
            .append("svg")
            .attr("width", squareSize + MARGIN * 2)
            .attr("height", squareSize + MARGIN * 2)
            .append("g")
            .attr("transform",
                "translate(" + MARGIN + "," + MARGIN + ")");
        d3.select(window)
            .on("resize", function () {
                let targetWidth = graph.node().getBoundingClientRect().width;
                graph.attr("width", targetWidth);
                graph.attr("height", targetWidth);
            });
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
        let graph = GrapherUtil.getGraph(graphId);

        if (!graph) return false;

        data.sort(function (a, b) {
            return d3.ascending(a.sortIndex, b.sortIndex)
        })

        // Update the X axis
        graph.axes.x.domain(data.map(function (d) { return d.group; }))
        graph.axes.xAxis.call(d3.axisBottom(graph.axes.x))

        // Update the Y axis
        graph.axes.y.domain([0, d3.max(data, function (d) { return d.count })]);
        graph.axes.yAxis.transition().duration(1000).call(d3.axisLeft(graph.axes.y));

        let u = graph.graph.selectAll("rect")
            .data(data)

        let gHeight = document.getElementById(graphId).scrollWidth - 60;
        let fillColor = d3.scaleOrdinal().domain(data.map(function (d) { return d.group; }))
            .range(d3.schemeDark2);
        u
            .enter()
            .append("rect") // Add a new rect for each new elements
            .merge(u) // get the already existing elements as well
            .transition() // and apply changes to all of them
            .duration(200)
            .attr("x", function (d) { return graph.axes.x(d.group); })
            .attr("y", function (d) { return graph.axes.y(d.count); })
            .attr("width", graph.axes.x.bandwidth())
            .attr("height", function (d) { return gHeight - graph.axes.y(d.count); })
            .attr("fill", function (d) { return fillColor(d.group) })

        // If less group in the new dataset, I delete the ones not in use anymore
        u
            .exit()
            .remove()
        return true;
    },

    /**
     * Removes existing graph
     * @memberof Grapher
     * @method removeGraph
     * @param {string} graphId id of the graph you are removing
     * @returns {bool} true for success, false otherwise
     */
    removeGraph: function (graphId) {
        let g = document.getElementById(graphId);
        if (g) g.remove();

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
        if (GrapherUtil.getGraphIndexById(id) !== -1) {
            return Grapher.currentGraphs[GrapherUtil.getGraphIndexById(id)];
        }
        return null;
    },
    /**
     * Removes graph by id
     * @memberof GrapherUtil
     * @method removeGraph
     * @param {string} id id of graph to get
     * @returns {boolean} true if success
     */
    removeGraph: function (id) {
        if (GrapherUtil.getGraphIndexById(id) !== -1) {
            Grapher.currentGraphs.splice(GrapherUtil.getGraphIndexById(id), 1);
            return true;
        }
        return false;
    },
    /**
     * Gets graph index, helper method
     * @memberof GrapherUtil
     * @method getGraphIndexById
     * @param {string} id id of graph to get index of
     * @returns {int} -1 if not found, index otherwise
     */
    getGraphIndexById: function (id) {
        for (let i = 0; i < Grapher.currentGraphs.length; i++) {
            if (Grapher.currentGraphs[i].id == id) {
                return i;
            }
        }
        return -1;
    },
    /**
     * Adds container to buffer
     * @memberof GrapherUtil
     * @method getGraphIndexById
     * @returns {bool} true if successful
     */
    addContainer: function () {
        const id = GrapherUtil.createRandomId();
        let graphDiv = document.createElement("div");
        graphDiv.id = id;
        graphDiv.classList.add("dataGraph");
        graphDiv.style.display = "none";
        Grapher.HTML_container.appendChild(graphDiv);
        readyContainers.push(id);
        return true;
    },
}
