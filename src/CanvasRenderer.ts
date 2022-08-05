import { Renderer } from "./CommonRenderer";

export class CanvasRenderer implements Renderer {
    private canvas: HTMLCanvasElement;
    private programInfo: any;
    private gl: WebGLRenderingContext;
    private pixelRatio?: number;
    private vertexCount = 0;

    constructor(private aspectRatio: number) {
        this.canvas = <HTMLCanvasElement>document.getElementById('map');
        this.gl = <WebGLRenderingContext>this.canvas.getContext('webgl');
        this.pixelRatio = window.devicePixelRatio;  
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas(), false);
        this.glSetup();
        this.setTexture();
    }

    initialize(triangles: number[]): void {
        this.vertexCount = triangles.length / 2;
        this.updateFrom(triangles);
        const texCoords = this.canvas2ImgCoords(triangles);
        this.glTexCoords(texCoords);
    }

    updateFrom(triangles: number[]) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programInfo.buffers.vertexBufferFrom);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(triangles), this.gl.STATIC_DRAW);

        this.gl.vertexAttribPointer(this.programInfo.attribLocations.vertexPositionFrom, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPositionFrom);

        //this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        //this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.programInfo.loaded.dstCoord = true;
        //this.gl.drawArrays(this.gl.TRIANGLES, 0, fromCoords.length / 2);
    }

    updateTo(triangles: number[]) {
        if (triangles.length/2 != this.vertexCount) {
            console.warn("newState has different length ("+triangles.length/2+") than currentState ("+this.vertexCount+")");
            return;
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programInfo.buffers.vertexBufferTo);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(triangles), this.gl.STATIC_DRAW);
    
        this.gl.vertexAttribPointer(this.programInfo.attribLocations.vertexPositionTo, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPositionTo);

        //this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        //this.gl.clear(this.gl.COLOR_BUFFER_BIT);     
        //this.gl.drawArrays(this.gl.TRIANGLES, 0, fromCoords.length / 2);
    }

    interpolate(x: number) {
        this.gl.uniform1f(this.programInfo.uniformLocations.animationX, x);
        this.glDeferredDraw();
    }

    private resizeCanvas() {
        if (window.devicePixelRatio == this.pixelRatio) {
            console.log("resize triggered")
            const w = Math.min(2800, document.documentElement.clientWidth || document.body.clientWidth);
            const h = w/this.aspectRatio;
            const resRatio = window.devicePixelRatio || 1;
            this.canvas.width = w*resRatio;
            this.canvas.height = h*resRatio;
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
            this.glTexture(im);
        }
        im.src = "/dist/map_"+this.getPreferredImgResolution()+"x.jpg"; 
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

    private glTexCoords(texCoords: number[]) {
        const texCoordBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texCoordBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(texCoords), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this.programInfo.attribLocations.textureCoord, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.programInfo.attribLocations.textureCoord);

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

    private glDeferredDraw() {
        if (this.programInfo.loaded.texture && this.programInfo.loaded.texCoord && this.programInfo.loaded.dstCoord) {
            this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexCount);
        }
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