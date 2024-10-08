// Wait for the page to load
window.onload = function() {
    // Vertex shader program
    const vssSource = `
        attribute vec4 aVertexPosition;
        void main() {
            gl_Position = aVertexPosition;
        }
    `;

    // Fragment shader program
    var fssSource = `
        void main() {
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
    `;

    function createShape(fsSource, vsSource){
        // Get the canvas element
        const canvas = document.getElementById('glCanvas');
        // Initialize the GL context
        const gl = canvas.getContext('webgl');

        // Only continue if WebGL is available and working
        if (!gl) {
            alert('Unable to initialize WebGL. Your browser may not support it.');
            return;
        }

        // Set clear color to black, fully opaque
        gl.clearColor(0.5, 0.5, 0.5, 1.0);
        // Clear the color buffer with specified clear color
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Initialize a shader program
        const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    
        // Get the attribute location
        const vertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
    
        // Create a buffer for the rectangle's positions.
        const positionBuffer = gl.createBuffer();
    
        // Select the positionBuffer as the one to apply buffer operations to from here out
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    
        // Create an array of positions for the rectangle.
        const positions = [
            -0.7,  0.5,
            0.7,  0.5,
            -0.7, -0.5,
            0.7, -0.5,
        ];
    
        // Pass the list of positions into WebGL to build the shape
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    
        // Tell WebGL how to pull out the positions from the position buffer into the vertexPosition attribute
        gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vertexPosition);
    
        // Use our shader program
        gl.useProgram(shaderProgram);
    
        // Draw the rectangle
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    
    createShape(fssSource, vssSource);

    let def = document.getElementById("default");
    let red = document.getElementById("red");
    let green = document.getElementById("green");
    let blue = document.getElementById("blue");
    let submit = document.getElementById("submit");
    
    def.addEventListener("click", function(){
        fssSource = `
            void main() {
                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
            }
        `;
        createShape(fssSource, vssSource);
    });

    red.addEventListener("click", function(){
        fssSource = `
            void main() {
                gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            }
        `;
        createShape(fssSource, vssSource);
    });

    green.addEventListener("click", function(){
        fssSource = `
            void main() {
                gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
            }
        `;
        createShape(fssSource, vssSource);
    });

    blue.addEventListener("click", function(){
        fssSource = `
            void main() {
                gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
            }
        `;
        createShape(fssSource, vssSource);
    });
    
    // For hex code converter
    function hexCodeDic(code){
        if('a' <= code && code <= 'f'){
            switch(code){
                case 'a':
                    return 10;
                    break;

                case 'b':
                    return 11;
                    break;

                case 'c':
                    return 12;
                    break;

                case 'd':
                    return 13;
                    break;

                case 'e':
                    return 14;
                    break;

                case 'f':
                    return 15;
                    break;
            }
        }else{
            return parseInt(code); // Parsing a character in number to integer data type
        }
        
    }
    
    submit.addEventListener("click", function(){
        let hexCode = document.getElementById("color").value;
        // For changing color RGB
        let R = 0; 
        let G = 0; 
        let B = 0; 
        for(let i = 1; i < 7; i++){
            switch(i){
                case 1:
                    R += (16 * hexCodeDic(hexCode[i]));
                    break;

                case 2:
                    R += hexCodeDic(hexCode[i]);
                    break;

                case 3:
                    G += (16 * hexCodeDic(hexCode[i]));
                    break;

                case 4:
                    G += hexCodeDic(hexCode[i]);
                    break;

                case 5:
                    B += (16 * hexCodeDic(hexCode[i]));
                    break;

                case 6:
                    B += hexCodeDic(hexCode[i]);
                    break;
            }
        }
        R = R/255;
        G = G/255;
        B = B/255;
        
        fssSource = `
            void main() {
                gl_FragColor = vec4(${R}, ${G}, ${B}, 1.0);
            }
        `;

        createShape(fssSource, vssSource);
    });

}

// Initialize a shader program, so WebGL knows how to draw our data
function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create the shader program
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    return shaderProgram;
}

// Creates a shader of the given type, uploads the source and compiles it.
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // Send the source to the shader object
    gl.shaderSource(shader, source);

    // Compile the shader program
    gl.compileShader(shader);

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}


