/**
* Library for the creation and alteration of floating divs
* Author Jean-Marc
*/
class resizable {
    minimum_size = 20;
    // Allows us to add listeners to the unique overlays
    static numOfInstances = 0;
    // Each time a overlay is clicked its Z Index increases so it is seen above all other overlays
    static zIndex = 1000;
    chartJS = null;

    constructor(defaultWidth, defaultHeight, backgroundColor){
        resizable.numOfInstances += 1;
        this.width = defaultWidth;
        this.height = defaultHeight;
        this.uniqueId = resizable.numOfInstances;
        this.backgroundColor = backgroundColor;
        this.isDown = false;
        this.isResizing = false;
        this.createOverlay();
        this.collapseButton();
        this.resizeListeners();
        this.test();
        this.movementListeners();

    }
    /**
     * Generates the 3 necessary divs for the overlay and adds in the CSS based on its initialization variables
     * @memberof resizable
     * @method createOverlay()
     * @returns 3 divs appended to the body of the HTML doc
     */
    createOverlay(){
        const overlayDocument = document.createElement("div");
        this.overlayDocument = overlayDocument;
        overlayDocument.id = "overlay" + this.uniqueId;
        overlayDocument.className = "overlay";
        overlayDocument.style.width = this.width + "px";
        overlayDocument.style.height = this.height + "px";
        overlayDocument.style.background = this.backgroundColor;
        overlayDocument.style.zIndex = resizable.zIndex;
        overlayDocument.style.display = "none";
        overlayDocument.style.opacity = .9;

        const boxDocument = document.createElement("div");
        this.boxDocument = boxDocument;
        boxDocument.id = "box" + this.uniqueId;
        boxDocument.className = "box";

        // This is the button in the top right that allows the div's size to be altered
        const boxResizer = document.createElement("div");
        this.boxResizer = boxResizer;
        boxResizer.id = "resizer" + this.uniqueId;
        boxResizer.className = "resizer top-right";

        boxDocument.appendChild(boxResizer);
        overlayDocument.appendChild(boxDocument);
        document.body.appendChild(overlayDocument);

    }

    /**
     * Adds in the necessary listeners for the divs to be resized
     * @memberof resizable
     * @method resizeListeners()
     * @returns 3 listeners for mousemovement
     */
    resizeListeners(){
        this.boxResizer.addEventListener('mousedown', (e) => {
            /**
             * Since there are the same listeners for resizing and movement we need these booleans so that resizing does
             * not also move the div around and vice-versa
             */
            this.isDown = true;
            this.isResizing = true;
            e.preventDefault();
            let dimensions = this.calculateDimensions(e);
            window.addEventListener('mousemove', (e) =>{
                if(this.isDown && this.isResizing){
                    this.changeBoxSize(e, dimensions);
                }
            });
            window.addEventListener('mouseup', ()=>{
                this.isDown = false;
                this.isResizing = false;
            });
        });
    }
    /**
     * Calculates dimensions for resize, only because the resize function needed less lines
     * @memberof resizable
     * @method calculateDimensions
     * @param {event} e - the current position of the mouse
     * @returns 4 listeners for mousemovement
     */
    calculateDimensions(e){
        let dimensions = [];
        //Calculates the width
        dimensions.push(parseFloat(getComputedStyle(this.overlayDocument, null).getPropertyValue('width').replace('px', '')));
        // Calculates the height
        dimensions.push(parseFloat(getComputedStyle(this.overlayDocument, null).getPropertyValue('height').replace('px', '')));
        // Calculates the Y coordinate
        dimensions.push(this.overlayDocument.getBoundingClientRect().top);
        // Calculates the mouse X and Y coordinate
        dimensions.push(e.pageX);
        dimensions.push(e.pageY);
        return dimensions;
    }

    changeBoxSize(e, dimensions){
        this.width = dimensions[0] + (e.pageX - dimensions[3]);
        this.height = dimensions[1] - (e.pageY - dimensions[4]);
        if (this.width > this.minimum_size) {
            this.overlayDocument.style.width = this.width + 'px';
        }
        if (this.height > this.minimum_size) {
            this.overlayDocument.style.height = this.height + 'px';
            this.overlayDocument.style.top = dimensions[2] + (e.pageY - dimensions[4]) + 'px';
        }
    }
    /**
     * Adds in the necessary listeners for the div to be moved
     * @memberof resizable
     * @method movementListeners()
     * @returns 4 listeners for mousemovement
     */
    movementListeners(){
        let offset = [0,0];
        let mousePosition;
        this.overlayDocument.addEventListener('mousedown', ()=>{
            resizable.zIndex += 1;
            this.overlayDocument.style.zIndex = resizable.zIndex;
        });

        this.overlayDocument.addEventListener('mousedown', (e) => {
            this.isDown = true;
            offset = [
                this.overlayDocument.offsetLeft - e.clientX,
                this.overlayDocument.offsetTop - e.clientY
            ];

        }, true);

        this.overlayDocument.addEventListener('mouseup', () => {
            this.isDown = false;
        }, true);

        window.addEventListener('mousemove', (event) => {
            if (this.isDown && !this.isResizing) {
                mousePosition = this.moveBox(event, mousePosition, offset);
            }
        }, true);

    }

    moveBox(event, mousePosition, offset){
        mousePosition = {
            x : event.clientX,
            y : event.clientY
        };
        this.overlayDocument.style.left = (mousePosition.x + offset[0]) + 'px';
        this.overlayDocument.style.top  = (mousePosition.y + offset[1]) + 'px';
        return mousePosition;
    }

    collapseButton(){
        L.easyButton('<span>&starf;</span>', ()=>{
            this.overlayDocument.style.display =  this.overlayDocument.style.display == "none" ? "block" : "none";
        }).addTo(map);
    }

    test(labels, values){
        var divsToRemove = document.getElementsByClassName("canvas");
        for (var i = divsToRemove.length-1; i >= 0; i--) {
            divsToRemove[i].remove();
        }
        const canvas = document.createElement("div");
        canvas.classList.add('canvas');
        canvas.innerHTML = "<canvas id='myChart' width="+this.width +" height="+this.height+"></canvas>";
        this.boxDocument.appendChild(canvas);
        var ctx = document.getElementById("myChart").getContext('2d');
        var dataValues = values;
        var dataLabels = labels;
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dataLabels,
                datasets: [{
                    label: 'Group A',
                    data: dataValues,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        display: false,
                        barPercentage: 1.3,
                        ticks: {
                            max: 3,
                        }
                    }, {
                        display: true,
                        ticks: {
                            autoSkip: false,
                            max: 4,
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
        this.chartJS = myChart;

    }

}
