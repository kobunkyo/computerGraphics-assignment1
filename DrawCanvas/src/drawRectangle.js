function main() {
    var canvas = document.getElementById("glcanvas");
    if(!canvas){
        console.log("canvas not exist");
        return;
    }
    // Get context for HTML5 know where the context dimension that use
    var ctx = canvas.getContext("2d");

    // Get canvas size
    const canvasWidth = canvas.scrollWidth;
    const canvasHeight = canvas.scrollHeight;
    
    // Hex code with transperancy for "context"
    ctx.fillStyle = "#000000"; // Default color
    
    // Initialize rectangle default size
    var rectWidth = 150;
    var rectHeight = 150;

    // Make a global variable for width and heigth
    var currW = rectWidth;
    var currH = rectHeight;

    // Clear canvas from rectangle shape
    function eraseRect(){
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    function drawReact(){
        // Draw rectangle and adjust to middle
        ctx.fillRect(canvasWidth/2 - currW/2, canvasHeight/2 - currH/2, currW, currH);
    }
    
    // Get any input from text field
    var colorsBtn = document.getElementById("submitColors");
    var widthBtn = document.getElementById("submitWidth");
    var heightBtn = document.getElementById("submitHeight");
    
    // If the change button from change color is clicked
    colorsBtn.addEventListener("click", function(){
        let colors = document.getElementById("colors").value;
        if (colors.length >= 7){
            ctx.fillStyle = colors; // Change color to rectangle
            drawReact();
            return;
        }
    })

    // If the change button from change width is clicked
    widthBtn.addEventListener("click", function(){
        let widthChange = Number.parseInt(document.getElementById("width").value);
        if (Number.isFinite(widthChange) && widthChange >= 0 && widthChange <= canvasWidth){
            currW = widthChange; // Change width to rectangle
            eraseRect();
            drawReact();
            return;
        }
    })

    // If the change button from change height is clicked
    heightBtn.addEventListener("click", function(){
        let heightChange = Number.parseInt(document.getElementById("height").value);
        if (Number.isFinite(heightChange) && heightChange >= 0 && heightChange <= canvasHeight){
            currH = heightChange; // Change height to rectangle
            eraseRect();
            drawReact();
            return;
        }
    })

    // Declare rectangle
    drawReact();
}