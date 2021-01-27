/**
* Where utility functions are
* @namespace Util
*/
class resizable {
    static numOfInstances = 0;

    constructor(defaultWidth, defaultHeight, backgroundColor){
        resizable.numOfInstances += 1;
        this.width = defaultWidth;
        this.height = defaultHeight;
        this.uniqueId = resizable.numOfInstances;
        this.backgroundColor = backgroundColor;
        this.createOverlay();
        this.addListeners(this.overlayDocument);
    }

    createOverlay(){
        const overlayDocument = document.createElement("div");
        this.overlayDocument = overlayDocument;
        overlayDocument.id = "overlay" + this.uniqueId;
        overlayDocument.className = "overlay";
        overlayDocument.style.width = this.width + "px";
        overlayDocument.style.height = this.height + "px";
        overlayDocument.style.background = this.backgroundColor;

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

    //Cleaning this up need to bind anonymous functions to instance
    addListeners(overlayDocument){
           var offset = [0,0];
           var isDown = false;
           var mousePosition;
           const minimum_size = 20;

           this.boxResizer.addEventListener('mousedown', function(e) {
                isDown = false;
                e.preventDefault();

                let width =  parseFloat(getComputedStyle(overlayDocument, null).getPropertyValue('width').replace('px', ''));
                let height = parseFloat(getComputedStyle(overlayDocument, null).getPropertyValue('height').replace('px', ''));
                let yCoord = overlayDocument.getBoundingClientRect().top;
                let mouseXCoord = e.pageX;
                let mouseYCoord = e.pageY;
                window.addEventListener('mousemove', resize);
                window.addEventListener('mouseup', stopResize);

               function resize(e) {
                 let newWidth = width + (e.pageX - mouseXCoord);
                 let newHeight = height - (e.pageY - mouseYCoord);
                 if (newWidth > minimum_size) {
                     overlayDocument.style.width = newWidth + 'px';
                 }
                 if (newHeight > minimum_size) {
                     overlayDocument.style.height = newHeight + 'px';
                     overlayDocument.style.top = yCoord + (e.pageY - mouseYCoord) + 'px';
                 }
               }

               function stopResize() {
                 window.removeEventListener('mousemove', resize)
               }

           })

           overlayDocument.addEventListener('mousedown', function(e) {
               isDown = true;
               offset = [
                   overlayDocument.offsetLeft - e.clientX,
                   overlayDocument.offsetTop - e.clientY
               ];


           }, true);

           overlayDocument.addEventListener('mouseup', function() {
               isDown = false;
           }, true);

           window.addEventListener('mousemove', function(event) {
               if (isDown) {
                   mousePosition = {

                       x : event.clientX,
                       y : event.clientY

                   };
                   overlayDocument.style.left = (mousePosition.x + offset[0]) + 'px';
                   overlayDocument.style.top  = (mousePosition.y + offset[1]) + 'px';
               }
           }, true);
    }




}





// Run when page is loaded
 $( document ).ready(function() {
   const test = new resizable(100,100,"white");
   const test2 = new resizable(1000,500,"black");

 });