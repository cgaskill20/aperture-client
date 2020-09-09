//Author: Daniel Reynolds
//Purpose: Generate d3.js graphs of different types from data
//Dependencies: d3.v4.js, grapher.css

const GraphType = {
    bar: 1,
    pie: 2,
    histogram: 3
}


let Grapher = {
    HTML_container:null,
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
        const id = Util.createRandomId();
        let graphDiv = document.createElement("div");
        graphDiv.id = id;
        graphDiv.classList.add("dataGraph");
        this.HTML_container.appendChild(graphDiv);
        
        let graph = d3.select("#" + id)
            .append("svg")
            .attr("width", 400)
            .attr("height", 400)
            .append("g");
        let x = d3.scaleBand()
            .range([0, 400])
            .padding(0.2);
        let xAxis = graph.append("g")
            .attr("transform", "translate(0," + 400 + ")");
        let y = d3.scaleLinear()
            .range([400, 0]);
        let yAxis = graph.append("g")
            .attr("class", "myYaxis")
        this.currentGraphs.push({id:id,graph:graph});
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

const Util = {
    /**
     * Creates Random string/id
     * @memberof Util
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
     * @memberof Util
     * @method getGraph
     * @param {string} id id of graph to get
     * @returns {object} graph
     */
    getGraph: function(id){
        for(let i = 0; i < Grapher.currentGraphs.length; i++){
            if(Grapher.currentGraphs[i].id == id){
                return Grapher.currentGraphs[i];
            }
        }
        return null;
    }
}