let filter = new MapDataFilter();

// Tell the RenderInfrastructure object to use it.
RenderInfrastructure.useFilter(filter);

// use .getModel to get information from it.


$( document ).ready(function() {
    const test = new resizable(1000,300,"white");
    const test2 = new resizable(300,200,"black");
    valuesInBounds = [];
    map.on("move", function (e) {
        valuesInBounds = filter.getModel("2010_median_household_income", map.getBounds());
        labels = [0,10000,20000,30000,4000,50000,60000,80000];
        values = [0,0,0,0,0,0,0];
        valuesInBounds["2010_median_household_income"].map(vals =>{
            if(vals["data"] < 10000){
                values[0] += 1;
            }
            else if(vals["data"] < 20000){
                values[1] += 1;
            }
            else if(vals["data"] < 30000){
                values[2] += 1;
            }
            else if(vals["data"] < 40000){
                values[3] += 1;
            }
            else if(vals["data"] < 50000){
                values[4] += 1;
            }
            else if(vals["data"] < 60000){
                values[5] += 1;
            }
            else{
                values[6] += 1;
            }
        });

        test.test(labels,values);
    });

});