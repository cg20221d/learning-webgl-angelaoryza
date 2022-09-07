function main() {
    var kanvas = document.getElementById("kanvas");
    var gl = kanvas.getContext("webgl");

    //Vertex Shaders
    var vertexShaderCode = 
    "void main() {" +
    "}";

    var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderObject, vertexShaderCode);
    gl.compileShader(vertexShaderObject); // sampai sini udah jadi .o
    //Fragment Shaders
    var fragmentShaderCode = 
    `
        void main() {
            
        }
    `

    var fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
    gl.compileShader(fragmentShaderObject); // sampai sini udah jadi .o

    var shaderProgram = gl.createProgram(); //membuat sebuah mangkok
    gl.attachShader = (shaderProgram, vertexShaderObject); //semua object file tadi ditaruh ke mangkok yang sama
    gl.attachShader = (shaderProgram, fragmentShaderObject);
    gl.linkProgram(shaderProgram); //mengaduk mangkok tersebut (linking objects)
    gl.useProgram(shaderProgram);

    gl.clearColor(0.0,  0.0,    0.0,    1.0);
    //            Red   Green   Blue    Alpha(Opacity)
    gl.clear(gl.COLOR_BUFFER_BIT);
}

window.onload = main;