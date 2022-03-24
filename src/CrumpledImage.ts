import { Animator } from "./Animator";
import { Vector } from "./Vector";

export interface Dependent {
    coords: Vector;
    callback: (gridPos: Vector) => void;
}
interface EnrichedDependent extends Dependent {    
    triangleIndex: number;
    barycentric: [number, number, number];
    from?: Vector;
    to?: Vector;    
}

export class CrumpledImage {
    private pixelRatio?: number;
    private canvas: HTMLCanvasElement;
    private vertexCount = 0;
    private programInfo: any;
    private gl: WebGLRenderingContext;
    private nonce = 0;
    private dependents: EnrichedDependent[] = [];

    readonly sX = 2/this.gridDimen.x;
    readonly sY = (-2)/this.gridDimen.y;

    constructor(private gridDimen: Vector, private animationDurationMs: number) {
        this.canvas = <HTMLCanvasElement>document.getElementById('map');
        this.gl = <WebGLRenderingContext>this.canvas.getContext('webgl');
        this.pixelRatio = window.devicePixelRatio;  
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas(), false);
        this.glSetup();
        this.setTexture();                     
    }

    initialize(dependents: Dependent[]) {
        const srcTriangles = this.defaultTriangles();
        this.dependentsPrepare(dependents, srcTriangles);
        this.vertexCount = srcTriangles.length / 2;
        const texCoords = this.canvas2ImgCoords(srcTriangles);
        this.glUpdateFrom(srcTriangles);
        this.glTexCoords(texCoords);        
    }

    private defaultTriangles() {
        const triangles: number[] = [];
        for (let y=0;y<this.gridDimen.y; y+=1) {
            for (let x=0;x<this.gridDimen.x; x+=1) {
                const trX = this.sX*(x+1)-1;
                const trY = this.sY*(y)+1;
                const blX = this.sX*(x)-1;
                const blY = this.sY*(y+1)+1;
                triangles.push(this.sX*(x)-1, this.sY*(y)+1, blX, blY, trX, trY);
                triangles.push(this.sX*(x+1)-1, this.sY*(y+1)+1, trX, trY, blX, blY);
            }
        }
        return triangles;
    }

    private resizeCanvas() {
        if (window.devicePixelRatio == this.pixelRatio) {
            console.log("resize triggered")
            const w = document.documentElement.clientWidth || document.body.clientWidth;
            const h = w*this.gridDimen.y/this.gridDimen.x;
            const ratio = window.devicePixelRatio || 1;
            this.canvas.width = w*ratio;
            this.canvas.height = h*ratio;
            this.canvas.style.width = w + 'px';
            this.canvas.style.height = h + 'px';
            this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

            this.pixelRatio = window.devicePixelRatio;
            if (this.programInfo) {
                this.glDeferredDraw();
            }
        }
    }

    private getPreferredImgResolution() {
        const available = [1024, 2048, 4096, 8192, 16384];
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
            this.glTexture(im);
        }
        im.src = "/dist/map_"+this.getPreferredImgResolution()+"x.jpg"; 
    }

    private textDecode(arr: Uint8Array) {
        let str = '';
        for (var i = 0; i < arr.byteLength; i++) {
            str += String.fromCharCode(arr[i]);
        }
        return str;
    }

    async streamUpdate(newState: ReadableStream<Uint8Array>, animate: boolean) {
        const reader = newState.getReader();
        const re = /\n| /gm;
        const width = (this.gridDimen.x+1)*2;
        const scaleX = 2/this.gridDimen.x;
        const scaleY = -2/this.gridDimen.y;

        const triangles: number[] = [];
        
        let char = 0;
        let index = 0;
        let remainder = '';
        let lastLine: number[] = new Array(width);
        let currLine: number[] = new Array(width);
        
        const pump = async () => {
            const { done, value } = await reader.read();
            const chunk = remainder + (value ? this.textDecode(value) : "");
            while (true) {
                let result = re.exec(chunk);
                if (!result) {
                    remainder = chunk.substring(char);
                    char = 0;
                    re.lastIndex = 0;
                    break;
                }
                const x = index%width;
                if (x == 0 && index > 0) {
                    const tmp = lastLine;
                    lastLine = currLine;
                    currLine = tmp;
                }
                const xOrYValue = parseFloat(chunk.substring(char, result.index));
                currLine[x] = x%2 == 0 ? xOrYValue*scaleX-1 : xOrYValue*scaleY+1;
                if (x % 2 == 1 && x >= 3 && index > width) {
                    triangles.push(lastLine[x-3], lastLine[x-2], currLine[x-3], currLine[x-2], lastLine[x-1], lastLine[x-0]);
                    triangles.push(currLine[x-1], currLine[x-0], lastLine[x-1], lastLine[x-0], currLine[x-3], currLine[x-2]);
                }
                index++;
                char = re.lastIndex;
            }
            return !done;
        }
        let bytesRemaining = true;
        while (bytesRemaining) {
            bytesRemaining = await pump();
        }

        this.internalUpdate(triangles, animate);
    }

    private internalUpdate(newState: number[], animate: boolean) {
        this.mapTriangles(newState);
        this.dependentsUpdateTo(newState);

        this.nonce++;
        if (!animate) {
            this.glInterpolate(0);
            this.dependentsInterpolate(0);
            return;
        }
        const animator = new Animator();
        console.log(performance.now(), "started update");
        
        const nonce = this.nonce;
        animator.animate(this.animationDurationMs, (x, isLast) => {
            if (this.nonce != nonce) {
                return false;
            }
            
            this.glInterpolate(x);
            this.dependentsInterpolate(x);
            
            if (isLast) {
                this.glUpdateFrom(newState);
                this.dependentsUpdateFrom(newState);
                console.log(performance.now(), "applied update");
            }
            return true;
        });       
    }

    private dependentsPrepare(dependents: Dependent[], srcTriangles: number[]) {
        const enrichedDependents: EnrichedDependent[] = [];
        for (const dependent of dependents) {
            const x = dependent.coords.x;
            const y = dependent.coords.y;
            const evenIndex = (Math.floor(x)+Math.floor(y)*(this.gridDimen.x))*2;
            const uneven = x-Math.floor(x)+y-Math.floor(y) > 1 ? 1 : 0;
            const index = evenIndex + uneven;
            const v = new Vector(this.sX*x-1, this.sY*y+1);
            const barycentric = v.barycentricCoordinates(srcTriangles, index);
            enrichedDependents.push({
                coords: dependent.coords,
                callback: dependent.callback,
                triangleIndex: index,
                barycentric: barycentric,
                from: v,
                to: v
            });            
        }
        this.dependents = enrichedDependents;
        this.dependentsInterpolate(0);
    }

    private dependentsUpdateFrom(newState: number[]) {
        for (const dependent of this.dependents) {
            dependent.from = Vector.euclidianCoordinates(newState, dependent.triangleIndex, dependent.barycentric);
        }
    }

    private dependentsUpdateTo(newState: number[]) {
        for (const dependent of this.dependents) {
            dependent.to = Vector.euclidianCoordinates(newState, dependent.triangleIndex, dependent.barycentric);
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
        this.glUpdateTo(newState);
    }
    
    private canvas2ImgCoords(state: number[]) {
        const coords: number[] = new Array(state.length);
        const scaleX = 1/2;
        const scaleY = 1/-2;
        for (let i=0; i<state.length; i+=2) {
            coords[i] = state[i]*scaleX+0.5;
            coords[i+1] = state[i+1]*scaleY-0.5;
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
        this.gl.cullFace(this.gl.BACK);
        this.gl.enable(this.gl.CULL_FACE);

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
        console.log(performance.now(), "stats:", this.gl.getParameter(this.gl.MAX_TEXTURE_SIZE), im.width, im.height, this.gl.canvas.height);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, im);
        this.gl.generateMipmap(this.gl.TEXTURE_2D);
       
        this.programInfo.loaded.texture = true;
        this.glDeferredDraw();
    }

    private glUpdateFrom(fromCoords: number[]) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programInfo.buffers.vertexBufferFrom);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(fromCoords), this.gl.STATIC_DRAW);

        this.gl.vertexAttribPointer( this.programInfo.attribLocations.vertexPositionFrom, 2, this.gl.FLOAT, false, 0, 0 );
        this.gl.enableVertexAttribArray( this.programInfo.attribLocations.vertexPositionFrom );

        //this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        //this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.programInfo.loaded.dstCoord = true;
        //this.gl.drawArrays(this.gl.TRIANGLES, 0, fromCoords.length / 2);
    }

    private glUpdateTo(toCoords: number[]) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programInfo.buffers.vertexBufferTo);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(toCoords), this.gl.STATIC_DRAW);
    
        this.gl.vertexAttribPointer( this.programInfo.attribLocations.vertexPositionTo, 2, this.gl.FLOAT, false, 0, 0 );
        this.gl.enableVertexAttribArray( this.programInfo.attribLocations.vertexPositionTo );

        //this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        //this.gl.clear(this.gl.COLOR_BUFFER_BIT);     
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