let filter = new MapDataFilter();
let mapBounds;

parent.Pipe.createPipe("graph_data_pipe", data => { filter.add(data) } );
parent.Pipe.createPipe("graph_report_bounds", bounds => { mapBounds = bounds } );

window.setInterval(() => {
    console.log(filter.getModel("temp", mapBounds));
}, 2000);

