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
        const ctx = this.canvas.getContext('webgl');
        this.imgDimen = new Vector(this.img.width, this.img.height);
        const texCoords: number[] = [];
        console.log(performance.now(), "befsrc");
        for (let i=0;i<this.srcTriangles.length;i++) {
            const src = this.srcTriangles[i].map(c => this.grid2ImgCoords(c));
            texCoords.push(src[0].x, src[0].y, src[1].x, src[1].y, src[2].x, src[2].y);
        }
        console.log(performance.now(), "befsetip");

        this.glSetup(this.img, texCoords);
        console.log(performance.now(), "aftersetup");

        console.log(performance.now(), this.canvasDimen);
        //ctx?.drawImage(this.img, 0, 0, this.canvasDimen.x, this.imgDimen.y/this.imgDimen.x*this.canvasDimen.x);
        //if (this.currentState != undefined) this.update(this.currentState);
    }

    update(newState: [Vector, Vector, Vector][]) {
        console.log(performance.now(), "received update");

        const animator = new Animator();
        
        animator.animate(this.animationDurationMs, (x, isLast) => {
            const s = performance.now();
            console.log(performance.now(), "started update");
            this.mapTriangles(newState, x);
            if (isLast) {
                this.currentState = newState;
                console.log(performance.now(), "applied update", performance.now()-s);
            }
            return true;
        });
       
    }

    private mapTriangles(newState: [Vector, Vector, Vector][], x: number) {
        if (newState.length != this.currentState?.length) {
            throw new Error("newState has different length ("+newState.length+") than currentState ("+this.currentState?.length+")");
        }
        const dstCoords: number[] = [];
        console.log(performance.now(), "befdst");

        for (let i=0;i<newState.length;i++) {
            const start = this.currentState[i];
            const dst = newState[i].map((c: Vector, j: number) => this.grid2CanvasCoords(start[j].between(c, x)));
            if (i == 0) {
                console.log(performance.now(), start, dst);
            }
            dstCoords.push( dst[0].x, dst[0].y, dst[1].x, dst[1].y, dst[2].x, dst[2].y);
        }
        console.log(performance.now(), "befupd");

        this.glUpdate(dstCoords);
    }
    
    private grid2ImgCoords(v: Vector) {
        const scale = 1 / this.gridDimen.x;
        return new Vector(v.x*scale, v.y*scale*2);
    }
    
    private grid2CanvasCoords(v: Vector) {
        const scale = 2 / this.gridDimen.x;
        return new Vector(v.x*scale-1, v.y*-2/this.gridDimen.y+1);
    }
    
    private glSetup(im: HTMLImageElement, texCoords: number[]) {
        const gl = <WebGLRenderingContext>this.canvas.getContext('webgl');

        const fsSource = `
            varying highp vec2 vTextureCoord;

            uniform sampler2D uSampler;

            void main(void) {
            gl_FragColor = texture2D(uSampler, vTextureCoord);
            }
        `;

        const vsSource = `
            attribute vec4 aVertexPosition;
            attribute vec2 aTextureCoord;

            varying highp vec2 vTextureCoord;

            void main(void) {
            gl_Position = aVertexPosition;
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
              vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
              textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
            },
            uniformLocations: {
              matrix: gl.getUniformLocation(shaderProgram, 'uMatrix'),
              uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
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
          
 
            
        //Tell shader to use texture unit 0
        gl.uniform1i(this.programInfo.uniformLocations.uSampler, 0);
        //gl.uniform1i(programInfo.uniformLocations.matrix, 0);
        
        //Make texture unit 0 active so that the texture binds to it
        //gl.activeTexture(gl.TEXTURE0);
        const texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);
        gl.vertexAttribPointer( this.programInfo.attribLocations.textureCoord, 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( this.programInfo.attribLocations.textureCoord );

    }

    private glUpdate(dstCoords: number[]) {
        const gl = <WebGLRenderingContext>this.canvas.getContext('webgl');
        console.log(performance.now(), "befbuffer");

        const dstCoordBuffer = gl.createBuffer();
        console.log(performance.now(), "befbind");

        gl.bindBuffer(gl.ARRAY_BUFFER, dstCoordBuffer);
        console.log(performance.now(), "befdata");

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(dstCoords), gl.STATIC_DRAW);        
        console.log(performance.now(), "befattrib");

        gl.vertexAttribPointer( this.programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( this.programInfo.attribLocations.vertexPosition );

        console.log(performance.now(), "befclear");
      

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);          
        console.log(performance.now(), "befdraw");

        //gl.bindBuffer(gl.ARRAY_BUFFER, dstCoordBuffer);
        gl.drawArrays(gl.TRIANGLES, 0, dstCoords.length / 2);
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