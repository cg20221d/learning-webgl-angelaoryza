function main() {
    var kanvas = document.getElementById("kanvas");
    var gl = kanvas.getContext("webgl");

    var vertices = [ 
        0.5, 0.5, 0.0, 1.0, 1.0, //A : Kanan atas (CYAN)
        0.0, 0.0, 1.0, 0.0, 1.0,//B : Bawah Tengah (MAGENTA)
        -0.5, 0.5, 1.0, 1.0, 0.0, //C : Kiri Atas (KUNING)
        0.0, 1.0, 1.0, 1.0, 1.0 //D: Atas Tengah (Putih)
    ]; //buat array untuk segitiga, tapi ini masih di cpu

    var buffer = gl.createBuffer(); 
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer); // ini define alamat gpu
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    //udah tersambung ke gpu (udah dipindah ke alam GPU)

    //Vertex Shaders
    var vertexShaderCode = 
    `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        uniform float uTheta;
        varying vec3 vColor;
        void main() {
            float x = -sin(uTheta) * aPosition.x + cos(uTheta) * aPosition.y;
            float y = sin(uTheta) * aPosition.y + cos(uTheta) * aPosition.x;
            // gl_PointSize = 10.0;
            gl_Position = vec4(x, y, 0.0, 1.0);
            vColor = aColor;
        }
        `;

    var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderObject, vertexShaderCode);
    gl.compileShader(vertexShaderObject); // sampai sini udah jadi .o
    //Fragment Shaders
    var fragmentShaderCode = `
    precision mediump float;
    varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1.0);
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

    //Variabel lokal
    var theta = 0.0;

    //Variabel pointer ke GLSL
    var uTheta = gl.getUniformLocation(shaderProgram, "uTheta")

    //Mengajari GPU bagaimana caranya mengoleksi
    // nilai posisi dari ARRAY_BUFFER
    //untuk setiap verteks yang sedang diproses

    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 
        5 * Float32Array.BYTES_PER_ELEMENT, 
        0);
    //                      index   dimensi              warna
    gl.enableVertexAttribArray(aPosition);

    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 
        5 * Float32Array.BYTES_PER_ELEMENT, 
        2 * Float32Array.BYTES_PER_ELEMENT);
    //                      index   dimensi              warna
    gl.enableVertexAttribArray(aColor);

    function render() {
            gl.clearColor(0.0,  0.0,    5.0,    1.0);
            //            Red   Green   Blue    Alpha(Opacity)
            gl.clear(gl.COLOR_BUFFER_BIT);
            theta += 0.1;
            gl.uniform1f(uTheta, theta);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 4); 
            //          jenis      data     count
            requestAnimationFrame(render);
    }
    // setInterval(render, 10000/60);
    requestAnimationFrame(render);

}

window.onload = main;

//LINE_LOOP : looping
//LINE_STRIP : ngga balik
//LINES : dua titik
