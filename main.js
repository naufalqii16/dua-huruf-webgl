function main(){
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    var vertices = [
        /*
            HURUF N 
        */

        //GARIS TEGAK KIRI
        -0.2, -0.2,
        -0.2, 0.4,
        -0.3, -0.2,

        -0.3, 0.4,
        -0.3, -0.2,
        -0.2, 0.4,

        //GARIS MIRING
        -0.2, 0.4, //C
        -0.1, 0.2, //D
        -0.2, 0.2, //K

        -0.2, 0.2, //K
        -0.1, 0.2, //D
        -0.1, 0, //J

        -0.1, 0.2, //C
        0, 0, //D
        -0.1, 0, //K

        -0.1, 0, //K
        0, 0, //D
        0, -0.2, //J


        //GARIS TEGAK KANAN
        0.1, -0.2,
        0.1, 0.4,
        0, -0.2,

        0, 0.4,
        0, -0.2,
        0.1, 0.4,


        /*
            HURUF L
        */

        //GARIS TEGAK KIRI
        0.3, -0.2,
        0.3, 0.4,
        0.2, -0.2,

        0.2, 0.4,
        0.2, -0.2,
        0.3, 0.4,

        //GARIS HORIZONTAL
        0.3, -0.2,
        0.42, -0.2,
        0.42, -0.05,

        0.42, -0.05,
        0.3, -0.05,
        0.3, -0.2
        

    ]


    var vertexShaderCode = `
        attribute vec2 aposition;
        void main(){

            gl_Position = vec4(aposition, 0.0, 1.0);
            gl_PointSize = 10.0;
        }
    `;

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    var fragmentShaderCode = document.getElementById("vertexShaderCode").text;

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var aPosition = gl.getAttribLocation(program, "aposition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);


    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, 36);
}