function main() {
    var kanvas = document.getElementById("kanvas");
    var gl = kanvas.getContext("webgl");

    //Vertex Shaders
    var vertexShaderCode = 
    `
        void main() {
            float x = 0.0;
            float y = 0.0;
            gl_PointSize = 10.0;
            gl_Position = vec4(x, y, 0.0, 1.0);
            
        }
        `;

    var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderObject, vertexShaderCode);
    gl.compileShader(vertexShaderObject); // sampai sini udah jadi .o
    //Fragment Shaders
    var fragmentShaderCode = `
        void main() {
            precision mediump float;
            float r = 5.0;
            float g = 1.0;
            float b = 0.0;
            float a = 1.0;
            gl_FragColor = vec4(r, g, b, a);
        }
        `;

    var fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
    gl.compileShader(fragmentShaderObject); // sampai sini udah jadi .o

    var shaderProgram = gl.createProgram(); //membuat sebuah mangkok
    gl.attachShader(shaderProgram, vertexShaderObject); //semua object file tadi ditaruh ke mangkok yang sama
    gl.attachShader(shaderProgram, fragmentShaderObject);
    gl.linkProgram(shaderProgram); 
    gl.useProgram(shaderProgram);

    gl.clearColor(0.0,  0.0,    5.0,    1.0);
    //            Red   Green   Blue    Alpha(Opacity)
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0,1); 
    //          jenis      data     count
}

window.onload = main;

