import { Animator } from "./Animator";
import { Vector } from "./Vector";

export class CrumpledImage {
    private canvas: HTMLCanvasElement;
    private canvasDimen: Vector = Vector.NULL;
    private canvasTl: Vector = Vector.NULL;
    private img: HTMLImageElement;
    private imgDimen: Vector = Vector.NULL;
    private currentState?: [Vector, Vector, Vector][];
    private programInfo: any;

    constructor(private gridDimen: Vector, private animationDurationMs: number, private srcTriangles: [Vector, Vector, Vector][]) {
        this.currentState = srcTriangles;
        this.canvas = <HTMLCanvasElement>document.getElementById('map');
        this.img = <HTMLImageElement>document.getElementById('map-src');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas(), false);

        if (this.img.complete) {
            this.initialDraw();
        } else {
            this.img.onload = () => this.initialDraw();
        }        
    }

    private resizeCanvas() {
        const r = this.canvas.getBoundingClientRect();
        this.canvasDimen = new Vector(r.width, r.height);
        this.canvasTl = new Vector(r.top, r.left);
    }

    private initialDraw() {
        const gl = <WebGLRenderingContext>this.canvas.getContext('webgl');
        this.imgDimen = new Vector(this.img.width, this.img.height);
        console.log(performance.now(), "befsrc");
        const texCoords = this.matrixConvertCoords(this.srcTriangles, v => this.grid2ImgCoords(v));
        console.log(performance.now(), "befsetip");

        this.glSetup(gl, this.img, texCoords);
        console.log(performance.now(), "aftersetup");

        console.log(performance.now(), this.canvasDimen);
        //if (this.currentState != undefined) this.update(this.currentState);
    }

    update(newState: [Vector, Vector, Vector][], animate: boolean) {
        console.log(performance.now(), "received update");
        const gl = <WebGLRenderingContext>this.canvas.getContext('webgl');
        this.mapTriangles(gl, newState);

        if (!animate) {
            return;
        }
        const animator = new Animator();
        animator.animate(this.animationDurationMs, (x, isLast) => {
            const s = performance.now();
            console.log(performance.now(), "started update");
            this.glAnimate(gl, x);
            
            if (isLast) {
                this.currentState = newState;
                console.log(performance.now(), "applied update", performance.now()-s);
            }
            return true;
        });       
    }

    private mapTriangles(gl: WebGLRenderingContext, newState: [Vector, Vector, Vector][]) {
        if (newState.length != this.currentState?.length) {
            throw new Error("newState has different length ("+newState.length+") than currentState ("+this.currentState?.length+")");
        }
        console.log(performance.now(), "befdst");
        
        const from = this.matrixConvertCoords(this.currentState);
        const to = this.matrixConvertCoords(newState);
        console.log(performance.now(), "befupd");
        this.glUpdate(gl, from, to);
    }
    
    private grid2ImgCoords(v: Vector) {
        const scale = 1 / this.gridDimen.x;
        return new Vector(v.x*scale, v.y*scale*2);
    }
    
    private grid2CanvasCoords(v: Vector) {
        const scale = 2 / this.gridDimen.x;
        return new Vector(v.x*scale-1, v.y*-2/this.gridDimen.y+1);
    }

    private matrixConvertCoords(matrix: [Vector, Vector, Vector][], mapping: (v: Vector) => Vector = (v) => this.grid2CanvasCoords(v)) {
        const coords: number[] = [];
        for (let i=0;i<matrix.length;i++) {
            const dst = matrix[i].map((c: Vector) => mapping(c));
            coords.push(dst[0].x, dst[0].y, dst[1].x, dst[1].y, dst[2].x, dst[2].y);
        }
        return coords;
    }
    
    private glSetup(gl: WebGLRenderingContext, im: HTMLImageElement, texCoords: number[]) {
        const fsSource = `
            varying highp vec2 vTextureCoord;

            uniform sampler2D uSampler;

            void main(void) {
            gl_FragColor = texture2D(uSampler, vTextureCoord);
            }
        `;

        const vsSource = `
            attribute vec4 aVertexPositionFrom;
            attribute vec4 aVertexPositionTo;
            attribute vec2 aTextureCoord;
            uniform float uAnimationX; 

            varying highp vec2 vTextureCoord;

            void main(void) {
            gl_Position = aVertexPositionFrom*(1.0-uAnimationX)+aVertexPositionTo*uAnimationX;
            vTextureCoord = aTextureCoord;
            }
        `;

        const shaderProgram = this.initShaderProgram(gl, vsSource, fsSource);
        if (!shaderProgram) {
            return;
        }
        this.programInfo = {
            program: shaderProgram,
            attribLocations: {
              vertexPositionFrom: gl.getAttribLocation(shaderProgram, 'aVertexPositionFrom'),
              vertexPositionTo: gl.getAttribLocation(shaderProgram, 'aVertexPositionTo'),
              textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
            },
            uniformLocations: {
              animationX: gl.getUniformLocation(shaderProgram, 'uAnimationX'),
              uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
            },
            buffers: {
                vertexBufferFrom: gl.createBuffer(),
                vertexBufferTo: gl.createBuffer()
            }
        };
        gl.useProgram(this.programInfo.program);

        
        const texName = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texName);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im);
        
        gl.generateMipmap(gl.TEXTURE_2D);

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        console.log(performance.now(), im.width, im.height, gl.canvas.height);
        
        gl.uniform1i(this.programInfo.uniformLocations.uSampler, 0);
        gl.uniform1f(this.programInfo.uniformLocations.animationX, 0.0);

        //gl.activeTexture(gl.TEXTURE0);
        const texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);
        gl.vertexAttribPointer( this.programInfo.attribLocations.textureCoord, 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( this.programInfo.attribLocations.textureCoord );

    }

    private glUpdate(gl: WebGLRenderingContext, fromCoords: number[], toCoords: number[]) {
        console.log(performance.now(), "befbuffer");

        console.log(performance.now(), "befbind");

        gl.bindBuffer(gl.ARRAY_BUFFER, this.programInfo.buffers.vertexBufferFrom);
        console.log(performance.now(), "befdata");
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(fromCoords), gl.STATIC_DRAW);        
        console.log(performance.now(), "befattrib");

        gl.vertexAttribPointer( this.programInfo.attribLocations.vertexPositionFrom, 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( this.programInfo.attribLocations.vertexPositionFrom );

        gl.bindBuffer(gl.ARRAY_BUFFER, this.programInfo.buffers.vertexBufferTo);
        console.log(performance.now(), "befdata");
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(toCoords), gl.STATIC_DRAW);        
        console.log(performance.now(), "befattrib");

        gl.vertexAttribPointer( this.programInfo.attribLocations.vertexPositionTo, 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( this.programInfo.attribLocations.vertexPositionTo );
        console.log(performance.now(), "befclear");
      

        //gl.clearColor(0.0, 0.0, 0.0, 1.0);
        //gl.clear(gl.COLOR_BUFFER_BIT);          
        console.log(performance.now(), "befdraw");

        gl.drawArrays(gl.TRIANGLES, 0, fromCoords.length / 2);
    }

    private glAnimate(gl: WebGLRenderingContext, x: number) {
        gl.uniform1f(this.programInfo.uniformLocations.animationX, x);
        gl.drawArrays(gl.TRIANGLES, 0, this.srcTriangles.length * 3);
    }


    private initShaderProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
        const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    
        const shaderProgram = gl.createProgram();
        if (!shaderProgram || !vertexShader || !fragmentShader) {
            return;
        }
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
    
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            throw new Error("shaders program failed");
        }
    
        return shaderProgram;
    }

    private loadShader(gl: WebGLRenderingContext, type: number, source: string) {
        const shader = gl.createShader(type);
        if (!shader) {
            return;
        }    
        gl.shaderSource(shader, source);
        gl.compileShader(shader);    
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            gl.deleteShader(shader);
            throw new Error("Compiling shaders failed");
        }
    
        return shader;
    }
}