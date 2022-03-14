import { Animator } from "./Animator";
import { Vector } from "./Vector";

export interface Dependent {
    triangleIndex: number;
    s: number;
    t: number;
    from?: Vector;
    to?: Vector;
    callback: (gridPos: Vector) => void;
}

export class CrumpledImage {
    private canvas: HTMLCanvasElement;
    private canvasDimen: Vector = Vector.NULL;
    private canvasTl: Vector = Vector.NULL;
    private imgDimen: Vector = Vector.NULL;
    private vertexCount = 0;
    private programInfo: any;
    private gl: WebGLRenderingContext;
    private nonce = 0;
    private dependents: Dependent[] = [];

    constructor(private gridDimen: Vector, private animationDurationMs: number) {
        console.log(performance.now(), "cru1");
        this.canvas = <HTMLCanvasElement>document.getElementById('map');
        this.resizeCanvas();
        this.gl = <WebGLRenderingContext>this.canvas.getContext('webgl');
        window.addEventListener('resize', () => this.resizeCanvas(), false);
        this.glSetup();
        console.log(performance.now(), "cru2");
        this.setTexture();                     
    }

    setTexCoords(srcTriangles: [Vector, Vector, Vector][], dependents: Dependent[]) {
        this.dependents = dependents;
        this.dependentsUpdateFrom(srcTriangles);
        const currentState = this.matrixConvertCoords(srcTriangles);
        this.vertexCount = currentState.length / 2;
        console.log(performance.now(), "befsrc");
        const texCoords = this.matrixConvertCoords(srcTriangles, v => this.grid2ImgCoords(v)); // 100ms
        console.log(performance.now(), "befsetip");
        this.glUpdateFrom(currentState);
        this.glTexCoords(texCoords);
       
    
        console.log(performance.now(), "aftersetup");

        console.log(performance.now(), this.canvasDimen);
        
    }

    private resizeCanvas() {
        const r = this.canvas.getBoundingClientRect();
        this.canvasDimen = new Vector(r.width, r.height);
        this.canvasTl = new Vector(r.top, r.left);
    }

    private getPreferredImgResolution() {
        const available = [1024, 2048, 4096, 8192];
        const max = this.gl.getParameter(this.gl.MAX_TEXTURE_SIZE)/2;
        let found = undefined;
        for(let i=0; i<available.length; i++) {
            if (available[i] <= max) {
                found = available[i];
            }
        }
        if (found == undefined) {
            throw Error("No texture size found");
        }
        console.log("Texture size:", found);
        return found;
    }

    private setTexture() {
        const im = new Image();
        im.onload = () => {           
            this.imgDimen = new Vector(im.width, im.height);
            this.glTexture(im);
        }
        im.src = "res/map_"+this.getPreferredImgResolution()+"x.jpg";  
        console.log(performance.now(), "cru3"); 
    }

    update(newState: [Vector, Vector, Vector][], animate: boolean) {
        console.log(performance.now(), "received update");
        const newStateCanvas = this.matrixConvertCoords(newState); //200ms
        this.mapTriangles(newStateCanvas);
        this.dependentsUpdateTo(newState);

        this.nonce++;
        if (!animate) {
            this.glInterpolate(0);
            this.dependentsInterpolate(0);
            return;
        }
        const animator = new Animator();
        
        const nonce = this.nonce;
        animator.animate(this.animationDurationMs, (x, isLast) => {
            if (this.nonce != nonce) {
                return false;
            }
            const s = performance.now();
            console.log(performance.now(), "started update");
            this.glInterpolate(x);
            this.dependentsInterpolate(x);
            
            if (isLast) {
                this.glUpdateFrom(newStateCanvas);
                this.dependentsUpdateFrom(newState);
                console.log(performance.now(), "applied update", performance.now()-s);
            }
            return true;
        });       
    }

    private weightedTriangle(triangle: [Vector, Vector, Vector], s: number, t: number) {
        return triangle[0].times((1-t)*(1-s)).add(triangle[1].times(t*(1-s))).add(triangle[2].times(s));
    }

    private dependentsUpdateFrom(newState: [Vector, Vector, Vector][]) {
        for (const dependent of this.dependents) {
            dependent.from = this.weightedTriangle(newState[dependent.triangleIndex], dependent.s, dependent.t);
            console.log(dependent.triangleIndex, newState[dependent.triangleIndex], dependent.from);
        }
    }

    private dependentsUpdateTo(newState: [Vector, Vector, Vector][]) {
        for (const dependent of this.dependents) {
            dependent.to = this.weightedTriangle(newState[dependent.triangleIndex], dependent.s, dependent.t);
        }
    }    

    private dependentsInterpolate(x: number) {
        for (const dependent of this.dependents) {
            if (dependent.from && dependent.to) {
                const gridPoint = dependent.from.between(dependent.to, x);
                dependent.callback(gridPoint);
            }
        }
    }

    private mapTriangles(newState: number[]) {
        if (newState.length/2 != this.vertexCount) {
            console.warn("newState has different length ("+newState.length/2+") than currentState ("+this.vertexCount+")");
            return;
        }
        console.log(performance.now(), "befdst");
        
      
        console.log(performance.now(), "befupd");
        this.glUpdateTo(newState);
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
    
    private glSetup() {
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

        const shaderProgram = this.initShaderProgram(vsSource, fsSource);
        if (!shaderProgram) {
            return;
        }
        this.programInfo = {
            program: shaderProgram,
            attribLocations: {
              vertexPositionFrom: this.gl.getAttribLocation(shaderProgram, 'aVertexPositionFrom'),
              vertexPositionTo: this.gl.getAttribLocation(shaderProgram, 'aVertexPositionTo'),
              textureCoord: this.gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
            },
            uniformLocations: {
              animationX: this.gl.getUniformLocation(shaderProgram, 'uAnimationX'),
              uSampler: this.gl.getUniformLocation(shaderProgram, 'uSampler'),
            },
            buffers: {
                vertexBufferFrom: this.gl.createBuffer(),
                vertexBufferTo: this.gl.createBuffer()
            },
            loaded: {
                texture: false,
                texCoord: false, 
                dstCoord: false
            }
        };
        this.gl.useProgram(this.programInfo.program);

        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        
        
        this.gl.uniform1i(this.programInfo.uniformLocations.uSampler, 0);
        this.gl.uniform1f(this.programInfo.uniformLocations.animationX, 0.0);
    }

    private glTexCoords(texCoords: number[]) {
        const texCoordBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texCoordBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(texCoords), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer( this.programInfo.attribLocations.textureCoord, 2, this.gl.FLOAT, false, 0, 0 );
        this.gl.enableVertexAttribArray( this.programInfo.attribLocations.textureCoord );

        this.programInfo.loaded.texCoord = true;
        this.glDeferredDraw();
    }

    private glTexture(im: HTMLImageElement) {
        const texName = this.gl.createTexture();
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, texName);
        console.log(performance.now(), this.gl.getParameter(this.gl.MAX_TEXTURE_SIZE), im.width, im.height, this.gl.canvas.height);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, im);
        this.gl.generateMipmap(this.gl.TEXTURE_2D);
       
        this.programInfo.loaded.texture = true;
        this.glDeferredDraw();
    }

    private glUpdateFrom(fromCoords: number[]) {
        console.log(performance.now(), "befbuffer");

        console.log(performance.now(), "befbind");

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programInfo.buffers.vertexBufferFrom);
        console.log(performance.now(), "befdata");
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(fromCoords), this.gl.STATIC_DRAW);        
        console.log(performance.now(), "befattrib");

        this.gl.vertexAttribPointer( this.programInfo.attribLocations.vertexPositionFrom, 2, this.gl.FLOAT, false, 0, 0 );
        this.gl.enableVertexAttribArray( this.programInfo.attribLocations.vertexPositionFrom );

        //this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        //this.gl.clear(this.gl.COLOR_BUFFER_BIT);          
        console.log(performance.now(), "befdraw");

        this.programInfo.loaded.dstCoord = true;
        //this.gl.drawArrays(this.gl.TRIANGLES, 0, fromCoords.length / 2);
    }

    private glUpdateTo(toCoords: number[]) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programInfo.buffers.vertexBufferTo);
        console.log(performance.now(), "befdata");
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(toCoords), this.gl.STATIC_DRAW);        
        console.log(performance.now(), "befattrib");

        this.gl.vertexAttribPointer( this.programInfo.attribLocations.vertexPositionTo, 2, this.gl.FLOAT, false, 0, 0 );
        this.gl.enableVertexAttribArray( this.programInfo.attribLocations.vertexPositionTo );
        console.log(performance.now(), "befclear");
      

        //this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        //this.gl.clear(this.gl.COLOR_BUFFER_BIT);          
        console.log(performance.now(), "befdraw");

        //this.gl.drawArrays(this.gl.TRIANGLES, 0, fromCoords.length / 2);
    }

    private glInterpolate(x: number) {
        this.gl.uniform1f(this.programInfo.uniformLocations.animationX, x);
        this.glDeferredDraw();
    }

    private glDeferredDraw() {
        if (this.programInfo.loaded.texture && this.programInfo.loaded.texCoord && this.programInfo.loaded.dstCoord) {
            this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexCount);
        }
    }

    private initShaderProgram(vsSource: string, fsSource: string) {
        const vertexShader = this.loadShader(this.gl.VERTEX_SHADER, vsSource);
        const fragmentShader = this.loadShader(this.gl.FRAGMENT_SHADER, fsSource);
    
        const shaderProgram = this.gl.createProgram();
        if (!shaderProgram || !vertexShader || !fragmentShader) {
            return;
        }
        this.gl.attachShader(shaderProgram, vertexShader);
        this.gl.attachShader(shaderProgram, fragmentShader);
        this.gl.linkProgram(shaderProgram);
    
        if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
            throw new Error("shaders program failed");
        }
    
        return shaderProgram;
    }

    private loadShader(type: number, source: string) {
        const shader = this.gl.createShader(type);
        if (!shader) {
            return;
        }    
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);    
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            this.gl.deleteShader(shader);
            throw new Error("Compiling shaders failed");
        }
    
        return shader;
    }
}