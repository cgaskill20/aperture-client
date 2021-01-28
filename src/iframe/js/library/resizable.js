/**
* DOCS
*
*/
class resizable {
    static numOfInstances = 0;
    static zIndex = 1000;

    constructor(defaultWidth, defaultHeight, backgroundColor){
        resizable.numOfInstances += 1;
        this.width = defaultWidth;
        this.height = defaultHeight;
        this.uniqueId = resizable.numOfInstances;
        this.backgroundColor = backgroundColor;
        this.isDown = false;
        this.isResizing = false;
        this.createOverlay();
        this.movementListeners();
        this.resizeListeners();
    }

    createOverlay(){
        const overlayDocument = document.createElement("div");
        this.overlayDocument = overlayDocument;
        overlayDocument.id = "overlay" + this.uniqueId;
        overlayDocument.className = "overlay";
        overlayDocument.style.width = this.width + "px";
        overlayDocument.style.height = this.height + "px";
        overlayDocument.style.background = this.backgroundColor;
        overlayDocument.style.zIndex = resizable.zIndex;

        const boxDocument = document.createElement("div");
        this.boxDocument = boxDocument;
        boxDocument.id = "box" + this.uniqueId;
        boxDocument.className = "box";

        const boxResizer = document.createElement("div");
        this.boxResizer = boxResizer;
        boxResizer.id = "resizer" + this.uniqueId;
        boxResizer.className = "resizer top-right";

        boxDocument.appendChild(boxResizer);
        overlayDocument.appendChild(boxDocument);
        document.body.appendChild(overlayDocument);

    }

    resizeListeners(){
        const minimum_size = 20;
        this.boxResizer.addEventListener('mousedown', (e) => {
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
                    let newWidth = width + (e.pageX - mouseXCoord);
                    let newHeight = height - (e.pageY - mouseYCoord);
                    if (newWidth > minimum_size) {
                        this.overlayDocument.style.width = newWidth + 'px';
                    }
                    if (newHeight > minimum_size) {
                        this.overlayDocument.style.height = newHeight + 'px';
                        this.overlayDocument.style.top = yCoord + (e.pageY - mouseYCoord) + 'px';
                    }
                }
            });
            window.addEventListener('mouseup', ()=>{
                this.isDown = false;
                this.isResizing = false;
            });
        });
    }

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




}


 $( document ).ready(function() {
   const test = new resizable(100,100,"white");
   const test2 = new resizable(300,200,"black");

 });