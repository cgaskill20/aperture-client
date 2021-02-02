/**
* Library for the creation and alteration of floating divs
* Author Jean-Marc
*/
class resizable {
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
        this.resizeListeners();

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
        const minimum_size = 20;
        this.boxResizer.addEventListener('mousedown', (e) => {
            /**
                * Since there are the same listeners for resizing and movement we need these booleans so that resizing does
                * not also move the div around and vice-versa
            */
            this.isDown = true;
            this.isResizing = true;
            e.preventDefault();
            let width =  parseFloat(getComputedStyle(this.overlayDocument, null).getPropertyValue('width').replace('px', ''));
            let height = parseFloat(getComputedStyle(this.overlayDocument, null).getPropertyValue('height').replace('px', ''));
            let yCoord = this.overlayDocument.getBoundingClientRect().top;
            let mouseXCoord = e.pageX;
            let mouseYCoord = e.pageY;
            window.addEventListener('mousemove', (e) =>{
                if(this.isDown && this.isResizing){
                    this.width = width + (e.pageX - mouseXCoord);
                    this.height = height - (e.pageY - mouseYCoord);
                    if (this.width > minimum_size) {
                        this.overlayDocument.style.width = this.width + 'px';
                    }
                    if (this.height > minimum_size) {
                        this.overlayDocument.style.height = this.height + 'px';
                        this.overlayDocument.style.top = yCoord + (e.pageY - mouseYCoord) + 'px';
                        if(this.chartJS != null){
                            this.test()
                        }
                    }

                }
            });
            window.addEventListener('mouseup', ()=>{
                this.isDown = false;
                this.isResizing = false;
            });
        });
    }
     /**
        * Adds in the necessary listeners for the div to be moved
        * @memberof resizable
        * @method movementListeners()
        * @returns 4 listeners for mousemovement
     */
    movementListeners(){
        var offset = [0,0];
        var mousePosition;
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
                mousePosition = {
                    x : event.clientX,
                    y : event.clientY
                };
                this.overlayDocument.style.left = (mousePosition.x + offset[0]) + 'px';
                this.overlayDocument.style.top  = (mousePosition.y + offset[1]) + 'px';
            }
        }, true);

    }

    collapseButton(){
        L.easyButton('<span>&starf;</span>', ()=>{
            this.overlayDocument.style.display =  this.overlayDocument.style.display == "none" ? "block" : "none";


        }).addTo(map);
    }

    test(){
        console.log("<canvas id='myChart' width="+this.width +" height="+this.height+"></canvas>");
         const canvas = document.createElement("div");
         canvas.innerHTML = "<canvas id='myChart' width="+this.width +" height="+this.height+"></canvas>";
         this.boxDocument.appendChild(canvas);
       // this.boxDocument.innerHTML += "<canvas id='myChart' width='400' height='400'></canvas>";
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
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


 $( document ).ready(function() {
   const test = new resizable(500,500,"white");
   const test2 = new resizable(300,200,"black");

 });