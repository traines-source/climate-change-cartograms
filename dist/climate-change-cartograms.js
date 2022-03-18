/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Animator.ts":
/*!*********************************!*\
  !*** ./src/Animator-exposed.ts ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ___EXPOSE_LOADER_IMPORT___ = __webpack_require__(/*! -!../node_modules/ts-loader/index.js??ruleSet[1].rules[0].use[1]!./Animator.ts */ "./node_modules/ts-loader/index.js??ruleSet[1].rules[0].use[1]!./src/Animator.ts");
var ___EXPOSE_LOADER_GET_GLOBAL_THIS___ = __webpack_require__(/*! ../node_modules/expose-loader/dist/runtime/getGlobalThis.js */ "./node_modules/expose-loader/dist/runtime/getGlobalThis.js");
var ___EXPOSE_LOADER_GLOBAL_THIS___ = ___EXPOSE_LOADER_GET_GLOBAL_THIS___;
___EXPOSE_LOADER_GLOBAL_THIS___["CCC"] = ___EXPOSE_LOADER_IMPORT___;
module.exports = ___EXPOSE_LOADER_IMPORT___;


/***/ }),

/***/ "./src/CrumpledImage.ts":
/*!**************************************!*\
  !*** ./src/CrumpledImage-exposed.ts ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ___EXPOSE_LOADER_IMPORT___ = __webpack_require__(/*! -!../node_modules/ts-loader/index.js??ruleSet[1].rules[0].use[1]!./CrumpledImage.ts */ "./node_modules/ts-loader/index.js??ruleSet[1].rules[0].use[1]!./src/CrumpledImage.ts");
var ___EXPOSE_LOADER_GET_GLOBAL_THIS___ = __webpack_require__(/*! ../node_modules/expose-loader/dist/runtime/getGlobalThis.js */ "./node_modules/expose-loader/dist/runtime/getGlobalThis.js");
var ___EXPOSE_LOADER_GLOBAL_THIS___ = ___EXPOSE_LOADER_GET_GLOBAL_THIS___;
___EXPOSE_LOADER_GLOBAL_THIS___["CCC"] = ___EXPOSE_LOADER_IMPORT___;
module.exports = ___EXPOSE_LOADER_IMPORT___;


/***/ }),

/***/ "./src/Vector.ts":
/*!*******************************!*\
  !*** ./src/Vector-exposed.ts ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ___EXPOSE_LOADER_IMPORT___ = __webpack_require__(/*! -!../node_modules/ts-loader/index.js??ruleSet[1].rules[0].use[1]!./Vector.ts */ "./node_modules/ts-loader/index.js??ruleSet[1].rules[0].use[1]!./src/Vector.ts");
var ___EXPOSE_LOADER_GET_GLOBAL_THIS___ = __webpack_require__(/*! ../node_modules/expose-loader/dist/runtime/getGlobalThis.js */ "./node_modules/expose-loader/dist/runtime/getGlobalThis.js");
var ___EXPOSE_LOADER_GLOBAL_THIS___ = ___EXPOSE_LOADER_GET_GLOBAL_THIS___;
___EXPOSE_LOADER_GLOBAL_THIS___["CCC"] = ___EXPOSE_LOADER_IMPORT___;
module.exports = ___EXPOSE_LOADER_IMPORT___;


/***/ }),

/***/ "./src/main-exposed.ts":
/*!*****************************!*\
  !*** ./src/main-exposed.ts ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ___EXPOSE_LOADER_IMPORT___ = __webpack_require__(/*! -!../node_modules/ts-loader/index.js??ruleSet[1].rules[0].use[1]!./main.ts */ "./node_modules/ts-loader/index.js??ruleSet[1].rules[0].use[1]!./src/main.ts");
var ___EXPOSE_LOADER_GET_GLOBAL_THIS___ = __webpack_require__(/*! ../node_modules/expose-loader/dist/runtime/getGlobalThis.js */ "./node_modules/expose-loader/dist/runtime/getGlobalThis.js");
var ___EXPOSE_LOADER_GLOBAL_THIS___ = ___EXPOSE_LOADER_GET_GLOBAL_THIS___;
___EXPOSE_LOADER_GLOBAL_THIS___["CCC"] = ___EXPOSE_LOADER_IMPORT___;
module.exports = ___EXPOSE_LOADER_IMPORT___;


/***/ }),

/***/ "./node_modules/expose-loader/dist/runtime/getGlobalThis.js":
/*!******************************************************************!*\
  !*** ./node_modules/expose-loader/dist/runtime/getGlobalThis.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// eslint-disable-next-line func-names
module.exports = function () {
  if (typeof globalThis === "object") {
    return globalThis;
  }

  var g;

  try {
    // This works if eval is allowed (see CSP)
    // eslint-disable-next-line no-new-func
    g = this || new Function("return this")();
  } catch (e) {
    // This works if the window reference is available
    if (typeof window === "object") {
      return window;
    } // This works if the self reference is available


    if (typeof self === "object") {
      return self;
    } // This works if the global reference is available


    if (typeof __webpack_require__.g !== "undefined") {
      return __webpack_require__.g;
    }
  }

  return g;
}();

/***/ }),

/***/ "./node_modules/ts-loader/index.js??ruleSet[1].rules[0].use[1]!./src/Animator.ts":
/*!***************************************************************************************!*\
  !*** ./node_modules/ts-loader/index.js??ruleSet[1].rules[0].use[1]!./src/Animator.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Animator = void 0;
class Animator {
    constructor() {
        this._from = 0;
        this._to = 1;
        this._timePassed = 0;
        this._ease = Animator.EASE_NONE;
        this.callback = x => true;
        this.startTime = 0;
        this.durationMilliseconds = 0;
    }
    from(from) {
        this._from = from;
        return this;
    }
    to(to) {
        this._to = to;
        return this;
    }
    timePassed(timePassed) {
        this._timePassed = timePassed;
        return this;
    }
    ease(ease) {
        this._ease = ease;
        return this;
    }
    wait(delayMilliseconds, callback) {
        if (delayMilliseconds > 0) {
            this.timeout(callback, delayMilliseconds);
            return;
        }
        callback();
    }
    animate(durationMilliseconds, callback) {
        this.durationMilliseconds = durationMilliseconds;
        this.callback = callback;
        this.startTime = this.now();
        this.frame();
    }
    frame() {
        const now = this.now();
        let x = 1;
        if (this.durationMilliseconds > 0) {
            x = (now - this.startTime + this._timePassed) / this.durationMilliseconds;
        }
        x = Math.max(0, Math.min(1, x));
        const y = this._from + (this._to - this._from) * this._ease(x);
        const cont = this.callback(y, x == 1);
        if (cont && x < 1) {
            this.requestFrame(() => this.frame());
        }
        else if (!cont) {
            console.log('Stopped animation because callback returned false.');
        }
    }
    now() {
        return performance.now();
    }
    timeout(callback, delayMilliseconds) {
        window.setTimeout(callback, delayMilliseconds);
    }
    requestFrame(callback) {
        window.requestAnimationFrame(callback);
    }
}
exports.Animator = Animator;
Animator.EASE_NONE = x => x;
Animator.EASE_CUBIC = x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
Animator.EASE_SINE = x => -(Math.cos(Math.PI * x) - 1) / 2;


/***/ }),

/***/ "./node_modules/ts-loader/index.js??ruleSet[1].rules[0].use[1]!./src/CrumpledImage.ts":
/*!********************************************************************************************!*\
  !*** ./node_modules/ts-loader/index.js??ruleSet[1].rules[0].use[1]!./src/CrumpledImage.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CrumpledImage = void 0;
const Animator_1 = __webpack_require__(/*! ./Animator */ "./src/Animator.ts");
const Vector_1 = __webpack_require__(/*! ./Vector */ "./src/Vector.ts");
class CrumpledImage {
    constructor(gridDimen, animationDurationMs) {
        this.gridDimen = gridDimen;
        this.animationDurationMs = animationDurationMs;
        this.vertexCount = 0;
        this.nonce = 0;
        this.dependents = [];
        console.log(performance.now(), "cru1");
        this.canvas = document.getElementById('map');
        this.gl = this.canvas.getContext('webgl');
        this.pixelRatio = window.devicePixelRatio;
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas(), false);
        this.glSetup();
        console.log(performance.now(), "cru2");
        this.setTexture();
    }
    setTexCoords(srcTriangles, dependents) {
        this.dependents = dependents;
        this.dependentsUpdateFrom(srcTriangles);
        this.dependentsUpdateTo(srcTriangles);
        this.dependentsInterpolate(0);
        const currentState = this.matrixConvertCoords(srcTriangles);
        this.vertexCount = currentState.length / 2;
        console.log(performance.now(), "befsrc");
        const texCoords = this.matrixConvertCoords(srcTriangles, v => this.grid2ImgCoords(v)); // 100ms
        console.log(performance.now(), "befsetip");
        this.glUpdateFrom(currentState);
        this.glTexCoords(texCoords);
        console.log(performance.now(), "aftersetup");
    }
    resizeCanvas() {
        if (window.devicePixelRatio == this.pixelRatio) {
            console.log("resize");
            const w = document.documentElement.clientWidth || document.body.clientWidth;
            const h = w * this.gridDimen.y / this.gridDimen.x;
            const ratio = window.devicePixelRatio || 1;
            this.canvas.width = w * ratio;
            this.canvas.height = h * ratio;
            this.canvas.style.width = w + 'px';
            this.canvas.style.height = h + 'px';
            this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
            this.pixelRatio = window.devicePixelRatio;
        }
    }
    getPreferredImgResolution() {
        const available = [1024, 2048, 4096, 8192];
        const max = this.gl.getParameter(this.gl.MAX_TEXTURE_SIZE) / 2;
        let found = undefined;
        for (let i = 0; i < available.length; i++) {
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
    setTexture() {
        const im = new Image();
        im.onload = () => {
            this.glTexture(im);
        };
        im.src = "res/map_" + this.getPreferredImgResolution() + "x.jpg";
        console.log(performance.now(), "cru3");
    }
    update(newState, animate) {
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
        const animator = new Animator_1.Animator();
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
                console.log(performance.now(), "applied update", performance.now() - s);
            }
            return true;
        });
    }
    dependentsUpdateFrom(newState) {
        for (const dependent of this.dependents) {
            dependent.from = Vector_1.Vector.euclidianCoordinates(newState[dependent.triangleIndex], dependent.barycentric);
            console.log(dependent.triangleIndex, newState[dependent.triangleIndex], dependent.from);
        }
    }
    dependentsUpdateTo(newState) {
        for (const dependent of this.dependents) {
            dependent.to = Vector_1.Vector.euclidianCoordinates(newState[dependent.triangleIndex], dependent.barycentric);
        }
    }
    dependentsInterpolate(x) {
        for (const dependent of this.dependents) {
            if (dependent.from && dependent.to) {
                const gridPoint = dependent.from.between(dependent.to, x);
                dependent.callback(gridPoint);
            }
        }
    }
    mapTriangles(newState) {
        if (newState.length / 2 != this.vertexCount) {
            console.warn("newState has different length (" + newState.length / 2 + ") than currentState (" + this.vertexCount + ")");
            return;
        }
        console.log(performance.now(), "befdst");
        console.log(performance.now(), "befupd");
        this.glUpdateTo(newState);
    }
    grid2ImgCoords(v) {
        const scale = 1 / this.gridDimen.x;
        return new Vector_1.Vector(v.x * scale, v.y * 1 / this.gridDimen.y);
    }
    grid2CanvasCoords(v) {
        const scale = 2 / this.gridDimen.x;
        return new Vector_1.Vector(v.x * scale - 1, v.y * -2 / this.gridDimen.y + 1);
    }
    matrixConvertCoords(matrix, mapping = (v) => this.grid2CanvasCoords(v)) {
        const coords = [];
        for (let i = 0; i < matrix.length; i++) {
            const dst = matrix[i].map((c) => mapping(c));
            coords.push(dst[0].x, dst[0].y, dst[1].x, dst[1].y, dst[2].x, dst[2].y);
        }
        return coords;
    }
    glSetup() {
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
    glTexCoords(texCoords) {
        const texCoordBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texCoordBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(texCoords), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this.programInfo.attribLocations.textureCoord, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.programInfo.attribLocations.textureCoord);
        this.programInfo.loaded.texCoord = true;
        this.glDeferredDraw();
    }
    glTexture(im) {
        const texName = this.gl.createTexture();
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, texName);
        console.log(performance.now(), this.gl.getParameter(this.gl.MAX_TEXTURE_SIZE), im.width, im.height, this.gl.canvas.height);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, im);
        this.gl.generateMipmap(this.gl.TEXTURE_2D);
        this.programInfo.loaded.texture = true;
        this.glDeferredDraw();
    }
    glUpdateFrom(fromCoords) {
        console.log(performance.now(), "befbuffer");
        console.log(performance.now(), "befbind");
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programInfo.buffers.vertexBufferFrom);
        console.log(performance.now(), "befdata");
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(fromCoords), this.gl.STATIC_DRAW);
        console.log(performance.now(), "befattrib");
        this.gl.vertexAttribPointer(this.programInfo.attribLocations.vertexPositionFrom, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPositionFrom);
        //this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        //this.gl.clear(this.gl.COLOR_BUFFER_BIT);          
        console.log(performance.now(), "befdraw");
        this.programInfo.loaded.dstCoord = true;
        //this.gl.drawArrays(this.gl.TRIANGLES, 0, fromCoords.length / 2);
    }
    glUpdateTo(toCoords) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.programInfo.buffers.vertexBufferTo);
        console.log(performance.now(), "befdata");
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(toCoords), this.gl.STATIC_DRAW);
        console.log(performance.now(), "befattrib");
        this.gl.vertexAttribPointer(this.programInfo.attribLocations.vertexPositionTo, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPositionTo);
        console.log(performance.now(), "befclear");
        //this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        //this.gl.clear(this.gl.COLOR_BUFFER_BIT);          
        console.log(performance.now(), "befdraw");
        //this.gl.drawArrays(this.gl.TRIANGLES, 0, fromCoords.length / 2);
    }
    glInterpolate(x) {
        this.gl.uniform1f(this.programInfo.uniformLocations.animationX, x);
        this.glDeferredDraw();
    }
    glDeferredDraw() {
        if (this.programInfo.loaded.texture && this.programInfo.loaded.texCoord && this.programInfo.loaded.dstCoord) {
            this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexCount);
        }
    }
    initShaderProgram(vsSource, fsSource) {
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
    loadShader(type, source) {
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
exports.CrumpledImage = CrumpledImage;


/***/ }),

/***/ "./node_modules/ts-loader/index.js??ruleSet[1].rules[0].use[1]!./src/Vector.ts":
/*!*************************************************************************************!*\
  !*** ./node_modules/ts-loader/index.js??ruleSet[1].rules[0].use[1]!./src/Vector.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Vector = void 0;
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static fromArray(arr) {
        return new Vector(arr[0], arr[1]);
    }
    get length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    delta(that) {
        return new Vector(that.x - this.x, that.y - this.y);
    }
    add(that) {
        return new Vector(this.x + that.x, this.y + that.y);
    }
    times(f) {
        return new Vector(this.x * f, this.y * f);
    }
    withLength(length) {
        const ratio = this.length != 0 ? length / this.length : 0;
        return new Vector(this.x * ratio, this.y * ratio);
    }
    between(other, x) {
        const delta = this.delta(other);
        return this.add(delta.withLength(delta.length * x));
    }
    barycentricCoordinates(triangle) {
        const v0 = triangle[0].delta(triangle[1]);
        const v1 = triangle[0].delta(triangle[2]);
        const v2 = triangle[0].delta(this);
        const den = 1 / (v0.x * v1.y - v1.x * v0.y);
        const v = (v2.x * v1.y - v1.x * v2.y) * den;
        const w = (v0.x * v2.y - v2.x * v0.y) * den;
        const u = 1.0 - v - w;
        return [u, v, w];
    }
    static euclidianCoordinates(triangle, barycentric) {
        let r = new Vector(0, 0);
        for (let i = 0; i < 3; i++) {
            r = r.add(triangle[i].times(barycentric[i]));
        }
        return r;
    }
}
exports.Vector = Vector;
Vector.NULL = new Vector(0, 0);


/***/ }),

/***/ "./node_modules/ts-loader/index.js??ruleSet[1].rules[0].use[1]!./src/main.ts":
/*!***********************************************************************************!*\
  !*** ./node_modules/ts-loader/index.js??ruleSet[1].rules[0].use[1]!./src/main.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const Vector_1 = __webpack_require__(/*! ./Vector */ "./src/Vector.ts");
const CrumpledImage_1 = __webpack_require__(/*! ./CrumpledImage */ "./src/CrumpledImage.ts");
const GRID_DIMEN = new Vector_1.Vector(400, 200);
let mappings = undefined;
let initial = true;
;
const crumpledMap = new CrumpledImage_1.CrumpledImage(GRID_DIMEN, 2000);
function findTriangles(resolver) {
    const triangles = [];
    for (let i = 0; i < GRID_DIMEN.y; i += 1) {
        for (let j = 0; j < GRID_DIMEN.x; j += 1) {
            triangles.push([resolver(j, i), resolver(j + 1, i), resolver(j, i + 1)]);
            triangles.push([resolver(j + 1, i + 1), resolver(j + 1, i), resolver(j, i + 1)]);
        }
    }
    return triangles;
}
function readGrid(grid) {
    console.log(performance.now(), "befread"); //500ms
    const rows = grid.split("\n");
    console.log(performance.now(), "befread1");
    rows.pop();
    console.log(performance.now(), "befread2");
    const numbers = rows.map(row => row.split(" ").map(parseFloat));
    console.log(performance.now(), "befread3");
    const vectors = numbers.map(row => Vector_1.Vector.fromArray(row));
    console.log(performance.now(), "befread4");
    const resolver = (x, y) => {
        const v = vectors[y * (GRID_DIMEN.x + 1) + x];
        if (v == undefined) {
            console.log("hey", x, y);
        }
        return new Vector_1.Vector(v.x, v.y);
    };
    console.log(performance.now(), "beftriangles");
    const triangles = findTriangles(resolver); //600ms
    console.log(performance.now(), "hey");
    crumpledMap.update(triangles, !initial);
    initial = false;
}
function interpolateMapping(mappings, x) {
    let upper = undefined;
    let lower = undefined;
    for (let i = 0; i < mappings.length; i++) {
        if (mappings[i].x >= x && (upper == undefined || mappings[i].x < upper.x)) {
            upper = mappings[i];
        }
        if (mappings[i].x <= x && (lower == undefined || mappings[i].x > lower.x)) {
            lower = mappings[i];
        }
    }
    if (lower == undefined) {
        if (upper == undefined) {
            throw new Error("No interpolation possible");
        }
        return upper.y;
    }
    if (upper == undefined)
        return lower.y;
    if (upper == lower)
        return upper.y;
    return (x - lower.x) / (upper.x - lower.x) * (upper.y - lower.y) + lower.y;
}
function getBinaries() {
    if (mappings == undefined) {
        return [];
    }
    return mappings.year.mapping.concat(mappings.parameters.mapping, mappings.metrics.mapping, mappings.impacts.mapping);
}
function createControls() {
    if (mappings == undefined) {
        return;
    }
    const controls = document.getElementById('controls');
    if (controls == undefined)
        throw new Error("Can't populate controls");
    const binaries = getBinaries();
    console.log(binaries);
    for (let i = 0; i < binaries.length; i++) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = binaries[i].id;
        checkbox.id = binaries[i].id;
        checkbox.oninput = updateMap;
        const label = document.createElement('label');
        label.htmlFor = binaries[i].id;
        label.innerHTML = binaries[i].label.en;
        const div = document.createElement('div');
        div.appendChild(checkbox);
        div.appendChild(label);
        controls.appendChild(div);
        console.log(binaries[i].id);
    }
    updateMap();
}
function isChecked(id) {
    return document.getElementById(id).checked;
}
function permutationStr(binaries) {
    return binaries.map(b => b.id + "-" + (+isChecked(b.id))).join("_");
}
function updateMap() {
    console.log(performance.now(), "upd trig");
    if (mappings == undefined) {
        return;
    }
    const year2100 = isChecked(mappings.year.mapping[0].id);
    const emissions = year2100 ? cumulateCo2Emissions() : 0;
    console.log('Cumulated CO2 emissions:', emissions);
    const temperature = interpolateMapping(mappings.impacts_scenarios.mapping, emissions);
    console.log('Temperature forecast:', temperature);
    updateTemperature(temperature);
    console.log(performance.now(), "beffetch");
    fetch('data/' + permutationStr(getBinaries()) + '.csv') //100ms
        .then(response => {
        console.log(performance.now(), "beftext");
        const t = response.text();
        console.log(performance.now(), "afztext");
        return t;
    })
        .then(grid => readGrid(grid));
}
function cumulateCo2Emissions() {
    if (mappings == undefined) {
        return 0;
    }
    let cumul_co2 = mappings.year.mapping[0].y;
    const params = mappings.parameters.mapping;
    for (let i = 0; i < params.length; i++) {
        const checkbox = document.getElementById(params[i].id);
        if (checkbox.checked) {
            cumul_co2 += params[i].y;
        }
    }
    return cumul_co2;
}
function updateTemperature(temperature) {
    const t = document.getElementById('temperature');
    t.innerHTML = Math.round((temperature + 1) * 10) / 10 + "";
}
function v(p, q, t) {
    return p * (1 - t) + q * t;
}
function createCities(cities, triangles) {
    const dependents = [];
    const container = document.getElementById('container');
    for (let i = 0; i < cities.length; i++) {
        const city = cities[i];
        const c = document.createElement('span');
        c.innerHTML = city['name'];
        c.className = 'city';
        container === null || container === void 0 ? void 0 : container.appendChild(c);
        const x = city['coordinates'][0];
        const y = city['coordinates'][1];
        const evenIndex = (Math.floor(x) + Math.floor(y) * (GRID_DIMEN.x)) * 2;
        const uneven = x - Math.floor(x) + y - Math.floor(y) > 1 ? 1 : 0;
        const index = evenIndex + uneven;
        console.log(city['name'], index, index % ((GRID_DIMEN.x) * 2), triangles[index]);
        const barycentric = (new Vector_1.Vector(x, y)).barycentricCoordinates(triangles[index]);
        console.log(x, y, barycentric, Vector_1.Vector.euclidianCoordinates(triangles[index], barycentric));
        dependents.push({
            callback: (gridPos) => {
                c.style.left = gridPos.x / GRID_DIMEN.x * 100 + '%';
                c.style.top = gridPos.y / GRID_DIMEN.y * 100 + '%';
            },
            triangleIndex: index,
            barycentric: barycentric
        });
    }
    return dependents;
}
function loadMappings() {
    console.log(performance.now(), "http1");
    fetch('res/mappings.json')
        .then(response => response.json())
        .then(json => {
        console.log(performance.now(), "res");
        mappings = json;
        createControls();
        fetch('res/cities.json')
            .then(response => response.json())
            .then(cities => {
            window.setTimeout(() => {
                console.log(performance.now(), "faketriang");
                const triangles = findTriangles((x, y) => new Vector_1.Vector(x, y));
                crumpledMap.setTexCoords(triangles, createCities(cities, triangles)); // 600ms
                console.log(performance.now(), "afterfaketriang");
            }, 1);
        });
    });
    console.log(performance.now(), "http2");
}
loadMappings();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main-exposed.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Y2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy8uL3NyYy9BbmltYXRvci50cz8wY2I4Iiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvLi9zcmMvQ3J1bXBsZWRJbWFnZS50cz8xMmEzIiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvLi9zcmMvVmVjdG9yLnRzPzUxZDkiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy8uL3NyYy9tYWluLWV4cG9zZWQudHMiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy8uL25vZGVfbW9kdWxlcy9leHBvc2UtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRHbG9iYWxUaGlzLmpzIiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvLi9zcmMvQW5pbWF0b3IudHMiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy8uL3NyYy9DcnVtcGxlZEltYWdlLnRzIiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvLi9zcmMvVmVjdG9yLnRzIiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fID0gcmVxdWlyZShcIi0hLi4vbm9kZV9tb2R1bGVzL3RzLWxvYWRlci9pbmRleC5qcz8/cnVsZVNldFsxXS5ydWxlc1swXS51c2VbMV0hLi9BbmltYXRvci50c1wiKTtcbnZhciBfX19FWFBPU0VfTE9BREVSX0dFVF9HTE9CQUxfVEhJU19fXyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvZXhwb3NlLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0R2xvYmFsVGhpcy5qc1wiKTtcbnZhciBfX19FWFBPU0VfTE9BREVSX0dMT0JBTF9USElTX19fID0gX19fRVhQT1NFX0xPQURFUl9HRVRfR0xPQkFMX1RISVNfX187XG5fX19FWFBPU0VfTE9BREVSX0dMT0JBTF9USElTX19fW1wiQ0NDXCJdID0gX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX187XG5tb2R1bGUuZXhwb3J0cyA9IF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fO1xuIiwidmFyIF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fID0gcmVxdWlyZShcIi0hLi4vbm9kZV9tb2R1bGVzL3RzLWxvYWRlci9pbmRleC5qcz8/cnVsZVNldFsxXS5ydWxlc1swXS51c2VbMV0hLi9DcnVtcGxlZEltYWdlLnRzXCIpO1xudmFyIF9fX0VYUE9TRV9MT0FERVJfR0VUX0dMT0JBTF9USElTX19fID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9leHBvc2UtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRHbG9iYWxUaGlzLmpzXCIpO1xudmFyIF9fX0VYUE9TRV9MT0FERVJfR0xPQkFMX1RISVNfX18gPSBfX19FWFBPU0VfTE9BREVSX0dFVF9HTE9CQUxfVEhJU19fXztcbl9fX0VYUE9TRV9MT0FERVJfR0xPQkFMX1RISVNfX19bXCJDQ0NcIl0gPSBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXztcbm1vZHVsZS5leHBvcnRzID0gX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX187XG4iLCJ2YXIgX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX18gPSByZXF1aXJlKFwiLSEuLi9ub2RlX21vZHVsZXMvdHMtbG9hZGVyL2luZGV4LmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzBdLnVzZVsxXSEuL1ZlY3Rvci50c1wiKTtcbnZhciBfX19FWFBPU0VfTE9BREVSX0dFVF9HTE9CQUxfVEhJU19fXyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvZXhwb3NlLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0R2xvYmFsVGhpcy5qc1wiKTtcbnZhciBfX19FWFBPU0VfTE9BREVSX0dMT0JBTF9USElTX19fID0gX19fRVhQT1NFX0xPQURFUl9HRVRfR0xPQkFMX1RISVNfX187XG5fX19FWFBPU0VfTE9BREVSX0dMT0JBTF9USElTX19fW1wiQ0NDXCJdID0gX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX187XG5tb2R1bGUuZXhwb3J0cyA9IF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fO1xuIiwidmFyIF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fID0gcmVxdWlyZShcIi0hLi4vbm9kZV9tb2R1bGVzL3RzLWxvYWRlci9pbmRleC5qcz8/cnVsZVNldFsxXS5ydWxlc1swXS51c2VbMV0hLi9tYWluLnRzXCIpO1xudmFyIF9fX0VYUE9TRV9MT0FERVJfR0VUX0dMT0JBTF9USElTX19fID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9leHBvc2UtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRHbG9iYWxUaGlzLmpzXCIpO1xudmFyIF9fX0VYUE9TRV9MT0FERVJfR0xPQkFMX1RISVNfX18gPSBfX19FWFBPU0VfTE9BREVSX0dFVF9HTE9CQUxfVEhJU19fXztcbl9fX0VYUE9TRV9MT0FERVJfR0xPQkFMX1RISVNfX19bXCJDQ0NcIl0gPSBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXztcbm1vZHVsZS5leHBvcnRzID0gX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICByZXR1cm4gZ2xvYmFsVGhpcztcbiAgfVxuXG4gIHZhciBnO1xuXG4gIHRyeSB7XG4gICAgLy8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gICAgZyA9IHRoaXMgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgfSAvLyBUaGlzIHdvcmtzIGlmIHRoZSBzZWxmIHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblxuXG4gICAgaWYgKHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiKSB7XG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9IC8vIFRoaXMgd29ya3MgaWYgdGhlIGdsb2JhbCByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cblxuICAgIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICByZXR1cm4gZ2xvYmFsO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnO1xufSgpOyIsImV4cG9ydCBjbGFzcyBBbmltYXRvciB7XG5cbiAgICBzdGF0aWMgRUFTRV9OT05FOiAoeDogbnVtYmVyKSA9PiBudW1iZXIgPSB4ID0+IHg7XG4gICAgc3RhdGljIEVBU0VfQ1VCSUM6ICh4OiBudW1iZXIpID0+IG51bWJlciA9IHggPT4geCA8IDAuNSA/IDQgKiB4ICogeCAqIHggOiAxIC0gTWF0aC5wb3coLTIgKiB4ICsgMiwgMykgLyAyO1xuICAgIHN0YXRpYyBFQVNFX1NJTkU6ICh4OiBudW1iZXIpID0+IG51bWJlciA9IHggPT4gLShNYXRoLmNvcyhNYXRoLlBJICogeCkgLSAxKSAvIDI7XG4gICAgXG4gICAgcHJpdmF0ZSBfZnJvbTogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF90bzogbnVtYmVyID0gMTtcbiAgICBwcml2YXRlIF90aW1lUGFzc2VkOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX2Vhc2U6ICh4OiBudW1iZXIpID0+IG51bWJlciA9IEFuaW1hdG9yLkVBU0VfTk9ORTtcblxuICAgIHByaXZhdGUgY2FsbGJhY2s6ICh4OiBudW1iZXIsIGlzTGFzdDogYm9vbGVhbikgPT4gYm9vbGVhbiA9IHggPT4gdHJ1ZTtcbiAgICBwcml2YXRlIHN0YXJ0VGltZTogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIGR1cmF0aW9uTWlsbGlzZWNvbmRzOiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGZyb20oZnJvbTogbnVtYmVyKTogQW5pbWF0b3Ige1xuICAgICAgICB0aGlzLl9mcm9tID0gZnJvbTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIHRvKHRvOiBudW1iZXIpOiBBbmltYXRvciB7XG4gICAgICAgIHRoaXMuX3RvID0gdG87XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyB0aW1lUGFzc2VkKHRpbWVQYXNzZWQ6IG51bWJlcik6IEFuaW1hdG9yIHtcbiAgICAgICAgdGhpcy5fdGltZVBhc3NlZCA9IHRpbWVQYXNzZWQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBlYXNlKGVhc2U6ICh4OiBudW1iZXIpID0+IG51bWJlcik6IEFuaW1hdG9yIHtcbiAgICAgICAgdGhpcy5fZWFzZSA9IGVhc2U7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyB3YWl0KGRlbGF5TWlsbGlzZWNvbmRzOiBudW1iZXIsIGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIGlmIChkZWxheU1pbGxpc2Vjb25kcyA+IDApIHtcbiAgICAgICAgICAgIHRoaXMudGltZW91dChjYWxsYmFjaywgZGVsYXlNaWxsaXNlY29uZHMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFuaW1hdGUoZHVyYXRpb25NaWxsaXNlY29uZHM6IG51bWJlciwgY2FsbGJhY2s6ICh4OiBudW1iZXIsIGlzTGFzdDogYm9vbGVhbikgPT4gYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmR1cmF0aW9uTWlsbGlzZWNvbmRzID0gZHVyYXRpb25NaWxsaXNlY29uZHM7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgdGhpcy5zdGFydFRpbWUgPSB0aGlzLm5vdygpO1xuICAgICAgICB0aGlzLmZyYW1lKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmcmFtZSgpIHtcbiAgICAgICAgY29uc3Qgbm93ID0gdGhpcy5ub3coKTtcbiAgICAgICAgbGV0IHggPSAxO1xuICAgICAgICBpZiAodGhpcy5kdXJhdGlvbk1pbGxpc2Vjb25kcyA+IDApIHtcbiAgICAgICAgICAgIHggPSAobm93LXRoaXMuc3RhcnRUaW1lK3RoaXMuX3RpbWVQYXNzZWQpIC8gdGhpcy5kdXJhdGlvbk1pbGxpc2Vjb25kcztcbiAgICAgICAgfVxuICAgICAgICB4ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgeCkpO1xuICAgICAgICBjb25zdCB5ID0gdGhpcy5fZnJvbSArICh0aGlzLl90by10aGlzLl9mcm9tKSAqIHRoaXMuX2Vhc2UoeCk7XG4gICAgICAgIGNvbnN0IGNvbnQgPSB0aGlzLmNhbGxiYWNrKHksIHggPT0gMSk7XG4gICAgICAgIGlmIChjb250ICYmIHggPCAxKSB7XG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RGcmFtZSgoKSA9PiB0aGlzLmZyYW1lKCkpO1xuICAgICAgICB9IGVsc2UgaWYgKCFjb250KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU3RvcHBlZCBhbmltYXRpb24gYmVjYXVzZSBjYWxsYmFjayByZXR1cm5lZCBmYWxzZS4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbm93KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHRpbWVvdXQoY2FsbGJhY2s6ICgpID0+IHZvaWQsIGRlbGF5TWlsbGlzZWNvbmRzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIGRlbGF5TWlsbGlzZWNvbmRzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlcXVlc3RGcmFtZShjYWxsYmFjazogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNhbGxiYWNrKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBBbmltYXRvciB9IGZyb20gXCIuL0FuaW1hdG9yXCI7XG5pbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi9WZWN0b3JcIjtcblxuZXhwb3J0IGludGVyZmFjZSBEZXBlbmRlbnQge1xuICAgIHRyaWFuZ2xlSW5kZXg6IG51bWJlcjtcbiAgICBiYXJ5Y2VudHJpYzogW251bWJlciwgbnVtYmVyLCBudW1iZXJdXG4gICAgZnJvbT86IFZlY3RvcjtcbiAgICB0bz86IFZlY3RvcjtcbiAgICBjYWxsYmFjazogKGdyaWRQb3M6IFZlY3RvcikgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIENydW1wbGVkSW1hZ2Uge1xuICAgIHByaXZhdGUgcGl4ZWxSYXRpbz86IG51bWJlcjtcbiAgICBwcml2YXRlIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgcHJpdmF0ZSB2ZXJ0ZXhDb3VudCA9IDA7XG4gICAgcHJpdmF0ZSBwcm9ncmFtSW5mbzogYW55O1xuICAgIHByaXZhdGUgZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dDtcbiAgICBwcml2YXRlIG5vbmNlID0gMDtcbiAgICBwcml2YXRlIGRlcGVuZGVudHM6IERlcGVuZGVudFtdID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyaWREaW1lbjogVmVjdG9yLCBwcml2YXRlIGFuaW1hdGlvbkR1cmF0aW9uTXM6IG51bWJlcikge1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJjcnUxXCIpO1xuICAgICAgICB0aGlzLmNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyk7XG4gICAgICAgIHRoaXMuZ2wgPSA8V2ViR0xSZW5kZXJpbmdDb250ZXh0PnRoaXMuY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJyk7XG4gICAgICAgIHRoaXMucGl4ZWxSYXRpbyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvOyAgXG4gICAgICAgIHRoaXMucmVzaXplQ2FudmFzKCk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB0aGlzLnJlc2l6ZUNhbnZhcygpLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuZ2xTZXR1cCgpO1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJjcnUyXCIpO1xuICAgICAgICB0aGlzLnNldFRleHR1cmUoKTsgICAgICAgICAgICAgICAgICAgICBcbiAgICB9XG5cbiAgICBzZXRUZXhDb29yZHMoc3JjVHJpYW5nbGVzOiBbVmVjdG9yLCBWZWN0b3IsIFZlY3Rvcl1bXSwgZGVwZW5kZW50czogRGVwZW5kZW50W10pIHtcbiAgICAgICAgdGhpcy5kZXBlbmRlbnRzID0gZGVwZW5kZW50cztcbiAgICAgICAgdGhpcy5kZXBlbmRlbnRzVXBkYXRlRnJvbShzcmNUcmlhbmdsZXMpO1xuICAgICAgICB0aGlzLmRlcGVuZGVudHNVcGRhdGVUbyhzcmNUcmlhbmdsZXMpO1xuICAgICAgICB0aGlzLmRlcGVuZGVudHNJbnRlcnBvbGF0ZSgwKTtcbiAgICAgICAgY29uc3QgY3VycmVudFN0YXRlID0gdGhpcy5tYXRyaXhDb252ZXJ0Q29vcmRzKHNyY1RyaWFuZ2xlcyk7XG4gICAgICAgIHRoaXMudmVydGV4Q291bnQgPSBjdXJyZW50U3RhdGUubGVuZ3RoIC8gMjtcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYmVmc3JjXCIpO1xuICAgICAgICBjb25zdCB0ZXhDb29yZHMgPSB0aGlzLm1hdHJpeENvbnZlcnRDb29yZHMoc3JjVHJpYW5nbGVzLCB2ID0+IHRoaXMuZ3JpZDJJbWdDb29yZHModikpOyAvLyAxMDBtc1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZzZXRpcFwiKTtcbiAgICAgICAgdGhpcy5nbFVwZGF0ZUZyb20oY3VycmVudFN0YXRlKTtcbiAgICAgICAgdGhpcy5nbFRleENvb3Jkcyh0ZXhDb29yZHMpO1xuICAgICAgIFxuICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJhZnRlcnNldHVwXCIpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2l6ZUNhbnZhcygpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID09IHRoaXMucGl4ZWxSYXRpbykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXNpemVcIilcbiAgICAgICAgICAgIGNvbnN0IHcgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGggPSB3KnRoaXMuZ3JpZERpbWVuLnkvdGhpcy5ncmlkRGltZW4ueDtcbiAgICAgICAgICAgIGNvbnN0IHJhdGlvID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdypyYXRpbztcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGgqcmF0aW87XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9IHcgKyAncHgnO1xuICAgICAgICAgICAgdGhpcy5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gaCArICdweCc7XG4gICAgICAgICAgICB0aGlzLmdsLnZpZXdwb3J0KDAsIDAsIHRoaXMuZ2wuY2FudmFzLndpZHRoLCB0aGlzLmdsLmNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICAgICAgICB0aGlzLnBpeGVsUmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UHJlZmVycmVkSW1nUmVzb2x1dGlvbigpIHtcbiAgICAgICAgY29uc3QgYXZhaWxhYmxlID0gWzEwMjQsIDIwNDgsIDQwOTYsIDgxOTJdO1xuICAgICAgICBjb25zdCBtYXggPSB0aGlzLmdsLmdldFBhcmFtZXRlcih0aGlzLmdsLk1BWF9URVhUVVJFX1NJWkUpLzI7XG4gICAgICAgIGxldCBmb3VuZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8YXZhaWxhYmxlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlW2ldIDw9IG1heCkge1xuICAgICAgICAgICAgICAgIGZvdW5kID0gYXZhaWxhYmxlW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChmb3VuZCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiTm8gdGV4dHVyZSBzaXplIGZvdW5kXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGV4dHVyZSBzaXplOlwiLCBmb3VuZCk7XG4gICAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFRleHR1cmUoKSB7XG4gICAgICAgIGNvbnN0IGltID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2xUZXh0dXJlKGltKTtcbiAgICAgICAgfVxuICAgICAgICBpbS5zcmMgPSBcInJlcy9tYXBfXCIrdGhpcy5nZXRQcmVmZXJyZWRJbWdSZXNvbHV0aW9uKCkrXCJ4LmpwZ1wiOyAgXG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImNydTNcIik7IFxuICAgIH1cblxuICAgIHVwZGF0ZShuZXdTdGF0ZTogW1ZlY3RvciwgVmVjdG9yLCBWZWN0b3JdW10sIGFuaW1hdGU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwicmVjZWl2ZWQgdXBkYXRlXCIpO1xuICAgICAgICBjb25zdCBuZXdTdGF0ZUNhbnZhcyA9IHRoaXMubWF0cml4Q29udmVydENvb3JkcyhuZXdTdGF0ZSk7IC8vMjAwbXNcbiAgICAgICAgdGhpcy5tYXBUcmlhbmdsZXMobmV3U3RhdGVDYW52YXMpO1xuICAgICAgICB0aGlzLmRlcGVuZGVudHNVcGRhdGVUbyhuZXdTdGF0ZSk7XG5cbiAgICAgICAgdGhpcy5ub25jZSsrO1xuICAgICAgICBpZiAoIWFuaW1hdGUpIHtcbiAgICAgICAgICAgIHRoaXMuZ2xJbnRlcnBvbGF0ZSgwKTtcbiAgICAgICAgICAgIHRoaXMuZGVwZW5kZW50c0ludGVycG9sYXRlKDApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFuaW1hdG9yID0gbmV3IEFuaW1hdG9yKCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBub25jZSA9IHRoaXMubm9uY2U7XG4gICAgICAgIGFuaW1hdG9yLmFuaW1hdGUodGhpcy5hbmltYXRpb25EdXJhdGlvbk1zLCAoeCwgaXNMYXN0KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5ub25jZSAhPSBub25jZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHMgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcInN0YXJ0ZWQgdXBkYXRlXCIpO1xuICAgICAgICAgICAgdGhpcy5nbEludGVycG9sYXRlKHgpO1xuICAgICAgICAgICAgdGhpcy5kZXBlbmRlbnRzSW50ZXJwb2xhdGUoeCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChpc0xhc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdsVXBkYXRlRnJvbShuZXdTdGF0ZUNhbnZhcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXBlbmRlbnRzVXBkYXRlRnJvbShuZXdTdGF0ZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYXBwbGllZCB1cGRhdGVcIiwgcGVyZm9ybWFuY2Uubm93KCktcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7ICAgICAgIFxuICAgIH1cblxuICAgIHByaXZhdGUgZGVwZW5kZW50c1VwZGF0ZUZyb20obmV3U3RhdGU6IFtWZWN0b3IsIFZlY3RvciwgVmVjdG9yXVtdKSB7XG4gICAgICAgIGZvciAoY29uc3QgZGVwZW5kZW50IG9mIHRoaXMuZGVwZW5kZW50cykge1xuICAgICAgICAgICAgZGVwZW5kZW50LmZyb20gPSBWZWN0b3IuZXVjbGlkaWFuQ29vcmRpbmF0ZXMobmV3U3RhdGVbZGVwZW5kZW50LnRyaWFuZ2xlSW5kZXhdLCBkZXBlbmRlbnQuYmFyeWNlbnRyaWMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGVwZW5kZW50LnRyaWFuZ2xlSW5kZXgsIG5ld1N0YXRlW2RlcGVuZGVudC50cmlhbmdsZUluZGV4XSwgZGVwZW5kZW50LmZyb20pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZXBlbmRlbnRzVXBkYXRlVG8obmV3U3RhdGU6IFtWZWN0b3IsIFZlY3RvciwgVmVjdG9yXVtdKSB7XG4gICAgICAgIGZvciAoY29uc3QgZGVwZW5kZW50IG9mIHRoaXMuZGVwZW5kZW50cykge1xuICAgICAgICAgICAgZGVwZW5kZW50LnRvID0gVmVjdG9yLmV1Y2xpZGlhbkNvb3JkaW5hdGVzKG5ld1N0YXRlW2RlcGVuZGVudC50cmlhbmdsZUluZGV4XSwgZGVwZW5kZW50LmJhcnljZW50cmljKTtcbiAgICAgICAgfVxuICAgIH0gICAgXG5cbiAgICBwcml2YXRlIGRlcGVuZGVudHNJbnRlcnBvbGF0ZSh4OiBudW1iZXIpIHtcbiAgICAgICAgZm9yIChjb25zdCBkZXBlbmRlbnQgb2YgdGhpcy5kZXBlbmRlbnRzKSB7XG4gICAgICAgICAgICBpZiAoZGVwZW5kZW50LmZyb20gJiYgZGVwZW5kZW50LnRvKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3JpZFBvaW50ID0gZGVwZW5kZW50LmZyb20uYmV0d2VlbihkZXBlbmRlbnQudG8sIHgpO1xuICAgICAgICAgICAgICAgIGRlcGVuZGVudC5jYWxsYmFjayhncmlkUG9pbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYXBUcmlhbmdsZXMobmV3U3RhdGU6IG51bWJlcltdKSB7XG4gICAgICAgIGlmIChuZXdTdGF0ZS5sZW5ndGgvMiAhPSB0aGlzLnZlcnRleENvdW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJuZXdTdGF0ZSBoYXMgZGlmZmVyZW50IGxlbmd0aCAoXCIrbmV3U3RhdGUubGVuZ3RoLzIrXCIpIHRoYW4gY3VycmVudFN0YXRlIChcIit0aGlzLnZlcnRleENvdW50K1wiKVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZkc3RcIik7XG4gICAgICAgIFxuICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZnVwZFwiKTtcbiAgICAgICAgdGhpcy5nbFVwZGF0ZVRvKG5ld1N0YXRlKTtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBncmlkMkltZ0Nvb3Jkcyh2OiBWZWN0b3IpIHtcbiAgICAgICAgY29uc3Qgc2NhbGUgPSAxIC8gdGhpcy5ncmlkRGltZW4ueDtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3Iodi54KnNjYWxlLCB2LnkqMS90aGlzLmdyaWREaW1lbi55KTtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBncmlkMkNhbnZhc0Nvb3Jkcyh2OiBWZWN0b3IpIHtcbiAgICAgICAgY29uc3Qgc2NhbGUgPSAyIC8gdGhpcy5ncmlkRGltZW4ueDtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3Iodi54KnNjYWxlLTEsIHYueSotMi90aGlzLmdyaWREaW1lbi55KzEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWF0cml4Q29udmVydENvb3JkcyhtYXRyaXg6IFtWZWN0b3IsIFZlY3RvciwgVmVjdG9yXVtdLCBtYXBwaW5nOiAodjogVmVjdG9yKSA9PiBWZWN0b3IgPSAodikgPT4gdGhpcy5ncmlkMkNhbnZhc0Nvb3Jkcyh2KSkge1xuICAgICAgICBjb25zdCBjb29yZHM6IG51bWJlcltdID0gW107XG4gICAgICAgIGZvciAobGV0IGk9MDtpPG1hdHJpeC5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkc3QgPSBtYXRyaXhbaV0ubWFwKChjOiBWZWN0b3IpID0+IG1hcHBpbmcoYykpO1xuICAgICAgICAgICAgY29vcmRzLnB1c2goZHN0WzBdLngsIGRzdFswXS55LCBkc3RbMV0ueCwgZHN0WzFdLnksIGRzdFsyXS54LCBkc3RbMl0ueSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvb3JkcztcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBnbFNldHVwKCkge1xuICAgICAgICBjb25zdCBmc1NvdXJjZSA9IGBcbiAgICAgICAgICAgIHZhcnlpbmcgaGlnaHAgdmVjMiB2VGV4dHVyZUNvb3JkO1xuXG4gICAgICAgICAgICB1bmlmb3JtIHNhbXBsZXIyRCB1U2FtcGxlcjtcblxuICAgICAgICAgICAgdm9pZCBtYWluKHZvaWQpIHtcbiAgICAgICAgICAgIGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCh1U2FtcGxlciwgdlRleHR1cmVDb29yZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIGA7XG5cbiAgICAgICAgY29uc3QgdnNTb3VyY2UgPSBgXG4gICAgICAgICAgICBhdHRyaWJ1dGUgdmVjNCBhVmVydGV4UG9zaXRpb25Gcm9tO1xuICAgICAgICAgICAgYXR0cmlidXRlIHZlYzQgYVZlcnRleFBvc2l0aW9uVG87XG4gICAgICAgICAgICBhdHRyaWJ1dGUgdmVjMiBhVGV4dHVyZUNvb3JkO1xuICAgICAgICAgICAgdW5pZm9ybSBmbG9hdCB1QW5pbWF0aW9uWDsgXG5cbiAgICAgICAgICAgIHZhcnlpbmcgaGlnaHAgdmVjMiB2VGV4dHVyZUNvb3JkO1xuXG4gICAgICAgICAgICB2b2lkIG1haW4odm9pZCkge1xuICAgICAgICAgICAgZ2xfUG9zaXRpb24gPSBhVmVydGV4UG9zaXRpb25Gcm9tKigxLjAtdUFuaW1hdGlvblgpK2FWZXJ0ZXhQb3NpdGlvblRvKnVBbmltYXRpb25YO1xuICAgICAgICAgICAgdlRleHR1cmVDb29yZCA9IGFUZXh0dXJlQ29vcmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIGA7XG5cbiAgICAgICAgY29uc3Qgc2hhZGVyUHJvZ3JhbSA9IHRoaXMuaW5pdFNoYWRlclByb2dyYW0odnNTb3VyY2UsIGZzU291cmNlKTtcbiAgICAgICAgaWYgKCFzaGFkZXJQcm9ncmFtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9ncmFtSW5mbyA9IHtcbiAgICAgICAgICAgIHByb2dyYW06IHNoYWRlclByb2dyYW0sXG4gICAgICAgICAgICBhdHRyaWJMb2NhdGlvbnM6IHtcbiAgICAgICAgICAgICAgdmVydGV4UG9zaXRpb25Gcm9tOiB0aGlzLmdsLmdldEF0dHJpYkxvY2F0aW9uKHNoYWRlclByb2dyYW0sICdhVmVydGV4UG9zaXRpb25Gcm9tJyksXG4gICAgICAgICAgICAgIHZlcnRleFBvc2l0aW9uVG86IHRoaXMuZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ2FWZXJ0ZXhQb3NpdGlvblRvJyksXG4gICAgICAgICAgICAgIHRleHR1cmVDb29yZDogdGhpcy5nbC5nZXRBdHRyaWJMb2NhdGlvbihzaGFkZXJQcm9ncmFtLCAnYVRleHR1cmVDb29yZCcpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVuaWZvcm1Mb2NhdGlvbnM6IHtcbiAgICAgICAgICAgICAgYW5pbWF0aW9uWDogdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ3VBbmltYXRpb25YJyksXG4gICAgICAgICAgICAgIHVTYW1wbGVyOiB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbihzaGFkZXJQcm9ncmFtLCAndVNhbXBsZXInKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBidWZmZXJzOiB7XG4gICAgICAgICAgICAgICAgdmVydGV4QnVmZmVyRnJvbTogdGhpcy5nbC5jcmVhdGVCdWZmZXIoKSxcbiAgICAgICAgICAgICAgICB2ZXJ0ZXhCdWZmZXJUbzogdGhpcy5nbC5jcmVhdGVCdWZmZXIoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxvYWRlZDoge1xuICAgICAgICAgICAgICAgIHRleHR1cmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRleENvb3JkOiBmYWxzZSwgXG4gICAgICAgICAgICAgICAgZHN0Q29vcmQ6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2wudXNlUHJvZ3JhbSh0aGlzLnByb2dyYW1JbmZvLnByb2dyYW0pO1xuXG4gICAgICAgIHRoaXMuZ2wudmlld3BvcnQoMCwgMCwgdGhpcy5nbC5jYW52YXMud2lkdGgsIHRoaXMuZ2wuY2FudmFzLmhlaWdodCk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgdGhpcy5nbC51bmlmb3JtMWkodGhpcy5wcm9ncmFtSW5mby51bmlmb3JtTG9jYXRpb25zLnVTYW1wbGVyLCAwKTtcbiAgICAgICAgdGhpcy5nbC51bmlmb3JtMWYodGhpcy5wcm9ncmFtSW5mby51bmlmb3JtTG9jYXRpb25zLmFuaW1hdGlvblgsIDAuMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnbFRleENvb3Jkcyh0ZXhDb29yZHM6IG51bWJlcltdKSB7XG4gICAgICAgIGNvbnN0IHRleENvb3JkQnVmZmVyID0gdGhpcy5nbC5jcmVhdGVCdWZmZXIoKTtcbiAgICAgICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCB0ZXhDb29yZEJ1ZmZlcik7XG4gICAgICAgIHRoaXMuZ2wuYnVmZmVyRGF0YSh0aGlzLmdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheSh0ZXhDb29yZHMpLCB0aGlzLmdsLlNUQVRJQ19EUkFXKTtcbiAgICAgICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKCB0aGlzLnByb2dyYW1JbmZvLmF0dHJpYkxvY2F0aW9ucy50ZXh0dXJlQ29vcmQsIDIsIHRoaXMuZ2wuRkxPQVQsIGZhbHNlLCAwLCAwICk7XG4gICAgICAgIHRoaXMuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoIHRoaXMucHJvZ3JhbUluZm8uYXR0cmliTG9jYXRpb25zLnRleHR1cmVDb29yZCApO1xuXG4gICAgICAgIHRoaXMucHJvZ3JhbUluZm8ubG9hZGVkLnRleENvb3JkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5nbERlZmVycmVkRHJhdygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2xUZXh0dXJlKGltOiBIVE1MSW1hZ2VFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IHRleE5hbWUgPSB0aGlzLmdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICAgICAgdGhpcy5nbC5hY3RpdmVUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRTApO1xuICAgICAgICB0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGV4TmFtZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCB0aGlzLmdsLmdldFBhcmFtZXRlcih0aGlzLmdsLk1BWF9URVhUVVJFX1NJWkUpLCBpbS53aWR0aCwgaW0uaGVpZ2h0LCB0aGlzLmdsLmNhbnZhcy5oZWlnaHQpO1xuICAgICAgICB0aGlzLmdsLnRleEltYWdlMkQodGhpcy5nbC5URVhUVVJFXzJELCAwLCB0aGlzLmdsLlJHQkEsIHRoaXMuZ2wuUkdCQSwgdGhpcy5nbC5VTlNJR05FRF9CWVRFLCBpbSk7XG4gICAgICAgIHRoaXMuZ2wuZ2VuZXJhdGVNaXBtYXAodGhpcy5nbC5URVhUVVJFXzJEKTtcbiAgICAgICBcbiAgICAgICAgdGhpcy5wcm9ncmFtSW5mby5sb2FkZWQudGV4dHVyZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZ2xEZWZlcnJlZERyYXcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdsVXBkYXRlRnJvbShmcm9tQ29vcmRzOiBudW1iZXJbXSkge1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZidWZmZXJcIik7XG5cbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYmVmYmluZFwiKTtcblxuICAgICAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHRoaXMucHJvZ3JhbUluZm8uYnVmZmVycy52ZXJ0ZXhCdWZmZXJGcm9tKTtcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYmVmZGF0YVwiKTtcbiAgICAgICAgdGhpcy5nbC5idWZmZXJEYXRhKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KGZyb21Db29yZHMpLCB0aGlzLmdsLlNUQVRJQ19EUkFXKTsgICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZhdHRyaWJcIik7XG5cbiAgICAgICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKCB0aGlzLnByb2dyYW1JbmZvLmF0dHJpYkxvY2F0aW9ucy52ZXJ0ZXhQb3NpdGlvbkZyb20sIDIsIHRoaXMuZ2wuRkxPQVQsIGZhbHNlLCAwLCAwICk7XG4gICAgICAgIHRoaXMuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoIHRoaXMucHJvZ3JhbUluZm8uYXR0cmliTG9jYXRpb25zLnZlcnRleFBvc2l0aW9uRnJvbSApO1xuXG4gICAgICAgIC8vdGhpcy5nbC5jbGVhckNvbG9yKDAuMCwgMC4wLCAwLjAsIDEuMCk7XG4gICAgICAgIC8vdGhpcy5nbC5jbGVhcih0aGlzLmdsLkNPTE9SX0JVRkZFUl9CSVQpOyAgICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYmVmZHJhd1wiKTtcblxuICAgICAgICB0aGlzLnByb2dyYW1JbmZvLmxvYWRlZC5kc3RDb29yZCA9IHRydWU7XG4gICAgICAgIC8vdGhpcy5nbC5kcmF3QXJyYXlzKHRoaXMuZ2wuVFJJQU5HTEVTLCAwLCBmcm9tQ29vcmRzLmxlbmd0aCAvIDIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2xVcGRhdGVUbyh0b0Nvb3JkczogbnVtYmVyW10pIHtcbiAgICAgICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnByb2dyYW1JbmZvLmJ1ZmZlcnMudmVydGV4QnVmZmVyVG8pO1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZkYXRhXCIpO1xuICAgICAgICB0aGlzLmdsLmJ1ZmZlckRhdGEodGhpcy5nbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodG9Db29yZHMpLCB0aGlzLmdsLlNUQVRJQ19EUkFXKTsgICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZhdHRyaWJcIik7XG5cbiAgICAgICAgdGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKCB0aGlzLnByb2dyYW1JbmZvLmF0dHJpYkxvY2F0aW9ucy52ZXJ0ZXhQb3NpdGlvblRvLCAyLCB0aGlzLmdsLkZMT0FULCBmYWxzZSwgMCwgMCApO1xuICAgICAgICB0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KCB0aGlzLnByb2dyYW1JbmZvLmF0dHJpYkxvY2F0aW9ucy52ZXJ0ZXhQb3NpdGlvblRvICk7XG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZmNsZWFyXCIpO1xuICAgICAgXG5cbiAgICAgICAgLy90aGlzLmdsLmNsZWFyQ29sb3IoMC4wLCAwLjAsIDAuMCwgMS4wKTtcbiAgICAgICAgLy90aGlzLmdsLmNsZWFyKHRoaXMuZ2wuQ09MT1JfQlVGRkVSX0JJVCk7ICAgICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZkcmF3XCIpO1xuXG4gICAgICAgIC8vdGhpcy5nbC5kcmF3QXJyYXlzKHRoaXMuZ2wuVFJJQU5HTEVTLCAwLCBmcm9tQ29vcmRzLmxlbmd0aCAvIDIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2xJbnRlcnBvbGF0ZSh4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5nbC51bmlmb3JtMWYodGhpcy5wcm9ncmFtSW5mby51bmlmb3JtTG9jYXRpb25zLmFuaW1hdGlvblgsIHgpO1xuICAgICAgICB0aGlzLmdsRGVmZXJyZWREcmF3KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnbERlZmVycmVkRHJhdygpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZ3JhbUluZm8ubG9hZGVkLnRleHR1cmUgJiYgdGhpcy5wcm9ncmFtSW5mby5sb2FkZWQudGV4Q29vcmQgJiYgdGhpcy5wcm9ncmFtSW5mby5sb2FkZWQuZHN0Q29vcmQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2wuZHJhd0FycmF5cyh0aGlzLmdsLlRSSUFOR0xFUywgMCwgdGhpcy52ZXJ0ZXhDb3VudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRTaGFkZXJQcm9ncmFtKHZzU291cmNlOiBzdHJpbmcsIGZzU291cmNlOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgdmVydGV4U2hhZGVyID0gdGhpcy5sb2FkU2hhZGVyKHRoaXMuZ2wuVkVSVEVYX1NIQURFUiwgdnNTb3VyY2UpO1xuICAgICAgICBjb25zdCBmcmFnbWVudFNoYWRlciA9IHRoaXMubG9hZFNoYWRlcih0aGlzLmdsLkZSQUdNRU5UX1NIQURFUiwgZnNTb3VyY2UpO1xuICAgIFxuICAgICAgICBjb25zdCBzaGFkZXJQcm9ncmFtID0gdGhpcy5nbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgICAgIGlmICghc2hhZGVyUHJvZ3JhbSB8fCAhdmVydGV4U2hhZGVyIHx8ICFmcmFnbWVudFNoYWRlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2wuYXR0YWNoU2hhZGVyKHNoYWRlclByb2dyYW0sIHZlcnRleFNoYWRlcik7XG4gICAgICAgIHRoaXMuZ2wuYXR0YWNoU2hhZGVyKHNoYWRlclByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcbiAgICAgICAgdGhpcy5nbC5saW5rUHJvZ3JhbShzaGFkZXJQcm9ncmFtKTtcbiAgICBcbiAgICAgICAgaWYgKCF0aGlzLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIoc2hhZGVyUHJvZ3JhbSwgdGhpcy5nbC5MSU5LX1NUQVRVUykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInNoYWRlcnMgcHJvZ3JhbSBmYWlsZWRcIik7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgcmV0dXJuIHNoYWRlclByb2dyYW07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkU2hhZGVyKHR5cGU6IG51bWJlciwgc291cmNlOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc2hhZGVyID0gdGhpcy5nbC5jcmVhdGVTaGFkZXIodHlwZSk7XG4gICAgICAgIGlmICghc2hhZGVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gICAgXG4gICAgICAgIHRoaXMuZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKTtcbiAgICAgICAgdGhpcy5nbC5jb21waWxlU2hhZGVyKHNoYWRlcik7ICAgIFxuICAgICAgICBpZiAoIXRoaXMuZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgdGhpcy5nbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgICAgICAgIHRoaXMuZ2wuZGVsZXRlU2hhZGVyKHNoYWRlcik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb21waWxpbmcgc2hhZGVycyBmYWlsZWRcIik7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgcmV0dXJuIHNoYWRlcjtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIFZlY3RvciB7XG4gICAgc3RhdGljIE5VTEw6IFZlY3RvciA9IG5ldyBWZWN0b3IoMCwgMCk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgeDogbnVtYmVyLCBwdWJsaWMgeTogbnVtYmVyKSB7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb21BcnJheShhcnI6IG51bWJlcltdKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKGFyclswXSwgYXJyWzFdKTtcbiAgICB9XG5cbiAgICBnZXQgbGVuZ3RoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3codGhpcy54LCAyKSArIE1hdGgucG93KHRoaXMueSwgMikpO1xuICAgIH1cblxuICAgIGRlbHRhKHRoYXQ6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHRoYXQueCAtIHRoaXMueCwgdGhhdC55IC0gdGhpcy55KTtcbiAgICB9XG5cbiAgICBhZGQodGhhdDogVmVjdG9yKTogVmVjdG9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54ICsgdGhhdC54LCB0aGlzLnkgKyB0aGF0LnkpO1xuICAgIH1cblxuICAgIHRpbWVzKGY6IG51bWJlcik6IFZlY3RvciB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCAqIGYsIHRoaXMueSAqIGYpO1xuICAgIH1cblxuICAgIHdpdGhMZW5ndGgobGVuZ3RoOiBudW1iZXIpOiBWZWN0b3Ige1xuICAgICAgICBjb25zdCByYXRpbyA9IHRoaXMubGVuZ3RoICE9IDAgPyBsZW5ndGgvdGhpcy5sZW5ndGggOiAwO1xuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLngqcmF0aW8sIHRoaXMueSpyYXRpbyk7XG4gICAgfVxuXG4gICAgYmV0d2VlbihvdGhlcjogVmVjdG9yLCB4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgZGVsdGEgPSB0aGlzLmRlbHRhKG90aGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkKGRlbHRhLndpdGhMZW5ndGgoZGVsdGEubGVuZ3RoKngpKTtcbiAgICB9XG5cbiAgICBiYXJ5Y2VudHJpY0Nvb3JkaW5hdGVzKHRyaWFuZ2xlOiBbVmVjdG9yLCBWZWN0b3IsIFZlY3Rvcl0pOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl1cbiAgICB7XG4gICAgICAgIGNvbnN0IHYwID0gdHJpYW5nbGVbMF0uZGVsdGEodHJpYW5nbGVbMV0pXG4gICAgICAgIGNvbnN0IHYxID0gdHJpYW5nbGVbMF0uZGVsdGEodHJpYW5nbGVbMl0pXG4gICAgICAgIGNvbnN0IHYyID0gdHJpYW5nbGVbMF0uZGVsdGEodGhpcyk7XG4gICAgICAgIGNvbnN0IGRlbiA9IDEgLyAodjAueCAqIHYxLnkgLSB2MS54ICogdjAueSk7XG4gICAgICAgIGNvbnN0IHYgPSAodjIueCAqIHYxLnkgLSB2MS54ICogdjIueSkgKiBkZW47XG4gICAgICAgIGNvbnN0IHcgPSAodjAueCAqIHYyLnkgLSB2Mi54ICogdjAueSkgKiBkZW47XG4gICAgICAgIGNvbnN0IHUgPSAxLjAgLSB2IC0gdztcbiAgICAgICAgcmV0dXJuIFt1LCB2LCB3XTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXVjbGlkaWFuQ29vcmRpbmF0ZXModHJpYW5nbGU6IFtWZWN0b3IsIFZlY3RvciwgVmVjdG9yXSwgYmFyeWNlbnRyaWM6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSk6IFZlY3RvciB7XG4gICAgICAgIGxldCByID0gbmV3IFZlY3RvcigwLCAwKTtcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPDM7IGkrKykge1xuICAgICAgICAgICAgciA9IHIuYWRkKHRyaWFuZ2xlW2ldLnRpbWVzKGJhcnljZW50cmljW2ldKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfVxufSIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuL1ZlY3RvclwiO1xuaW1wb3J0IHsgQ3J1bXBsZWRJbWFnZSwgRGVwZW5kZW50IH0gZnJvbSBcIi4vQ3J1bXBsZWRJbWFnZVwiO1xuXG5jb25zdCBHUklEX0RJTUVOID0gbmV3IFZlY3Rvcig0MDAsIDIwMCk7XG5cbmxldCBtYXBwaW5nczogTWFwcGluZ0NvbGxlY3Rpb24gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5sZXQgaW5pdGlhbCA9IHRydWU7XG5cbmludGVyZmFjZSBMYWJlbCB7IFtpZDogc3RyaW5nXTogc3RyaW5nIH1cbmludGVyZmFjZSBNYXBwaW5nIHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGxhYmVsOiBMYWJlbDtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xufVxuaW50ZXJmYWNlIE1hcHBpbmdDb2xsZWN0aW9uIHsgXG4gICAgW2lkOiBzdHJpbmddOiB7XG4gICAgICAgIGxhYmVsOiBMYWJlbDtcbiAgICAgICAgbWFwcGluZzogTWFwcGluZ1tdO1xuICAgIH1cbn07XG5cbmNvbnN0IGNydW1wbGVkTWFwID0gbmV3IENydW1wbGVkSW1hZ2UoR1JJRF9ESU1FTiwgMjAwMCk7XG5cbmZ1bmN0aW9uIGZpbmRUcmlhbmdsZXMocmVzb2x2ZXI6ICh4OiBudW1iZXIsIHk6IG51bWJlcikgPT4gVmVjdG9yKSB7XG4gICAgY29uc3QgdHJpYW5nbGVzOiBbVmVjdG9yLCBWZWN0b3IsIFZlY3Rvcl1bXSA9IFtdXG4gICAgZm9yIChsZXQgaT0wO2k8R1JJRF9ESU1FTi55OyBpKz0xKSB7XG4gICAgICAgIGZvciAobGV0IGo9MDtqPEdSSURfRElNRU4ueDsgais9MSkge1xuICAgICAgICAgICAgdHJpYW5nbGVzLnB1c2goW3Jlc29sdmVyKGosIGkpLCByZXNvbHZlcihqKzEsIGkpLCByZXNvbHZlcihqLCBpKzEpXSk7XG4gICAgICAgICAgICB0cmlhbmdsZXMucHVzaChbcmVzb2x2ZXIoaisxLCBpKzEpLCByZXNvbHZlcihqKzEsIGkpLCByZXNvbHZlcihqLCBpKzEpXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRyaWFuZ2xlcztcbn1cblxuZnVuY3Rpb24gcmVhZEdyaWQoZ3JpZDogc3RyaW5nKSB7XG4gICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYmVmcmVhZFwiKTsgLy81MDBtc1xuICAgIGNvbnN0IHJvd3MgPSBncmlkLnNwbGl0KFwiXFxuXCIpXG4gICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYmVmcmVhZDFcIik7XG4gICAgcm93cy5wb3AoKTtcbiAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZyZWFkMlwiKTsgXG5cbiAgICBjb25zdCBudW1iZXJzOiBudW1iZXJbXVtdID0gcm93cy5tYXAocm93ID0+IHJvdy5zcGxpdChcIiBcIikubWFwKHBhcnNlRmxvYXQpKTtcbiAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZyZWFkM1wiKTsgXG4gICAgY29uc3QgdmVjdG9yczogVmVjdG9yW10gPSBudW1iZXJzLm1hcChyb3cgPT4gVmVjdG9yLmZyb21BcnJheShyb3cpKTtcbiAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZyZWFkNFwiKTsgXG5cblxuICAgIGNvbnN0IHJlc29sdmVyID0gKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IHYgPSB2ZWN0b3JzW3kqKEdSSURfRElNRU4ueCsxKSt4XTtcbiAgICAgICAgaWYgKHYgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhleVwiLCB4LCB5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih2LngsIHYueSk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZnRyaWFuZ2xlc1wiKTtcbiAgICBjb25zdCB0cmlhbmdsZXMgPSBmaW5kVHJpYW5nbGVzKHJlc29sdmVyKTsgLy82MDBtc1xuICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImhleVwiKTtcblxuICAgIGNydW1wbGVkTWFwLnVwZGF0ZSh0cmlhbmdsZXMsICFpbml0aWFsKTtcbiAgICBpbml0aWFsID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGludGVycG9sYXRlTWFwcGluZyhtYXBwaW5nczogTWFwcGluZ1tdLCB4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGxldCB1cHBlciA6IE1hcHBpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGxvd2VyIDogTWFwcGluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBmb3IgKGxldCBpPTA7IGk8bWFwcGluZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKG1hcHBpbmdzW2ldLnggPj0geCAmJiAodXBwZXIgPT0gdW5kZWZpbmVkIHx8IG1hcHBpbmdzW2ldLnggPCB1cHBlci54KSkge1xuICAgICAgICAgICAgdXBwZXIgPSBtYXBwaW5nc1tpXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWFwcGluZ3NbaV0ueCA8PSB4ICYmIChsb3dlciA9PSB1bmRlZmluZWQgfHwgbWFwcGluZ3NbaV0ueCA+IGxvd2VyLngpKSB7XG4gICAgICAgICAgICBsb3dlciA9IG1hcHBpbmdzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChsb3dlciA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHVwcGVyID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gaW50ZXJwb2xhdGlvbiBwb3NzaWJsZVwiKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cHBlci55O1xuICAgIH1cbiAgICBpZiAodXBwZXIgPT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gbG93ZXIueTtcbiAgICBpZiAodXBwZXIgPT0gbG93ZXIpXG4gICAgICAgIHJldHVybiB1cHBlci55O1xuICAgIHJldHVybiAoeC1sb3dlci54KS8odXBwZXIueC1sb3dlci54KSoodXBwZXIueS1sb3dlci55KStsb3dlci55O1xufVxuXG5mdW5jdGlvbiBnZXRCaW5hcmllcygpOiBNYXBwaW5nW10ge1xuICAgIGlmIChtYXBwaW5ncyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICByZXR1cm4gbWFwcGluZ3MueWVhci5tYXBwaW5nLmNvbmNhdChtYXBwaW5ncy5wYXJhbWV0ZXJzLm1hcHBpbmcsIG1hcHBpbmdzLm1ldHJpY3MubWFwcGluZywgbWFwcGluZ3MuaW1wYWN0cy5tYXBwaW5nKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29udHJvbHMoKSB7XG4gICAgaWYgKG1hcHBpbmdzID09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY29udHJvbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbHMnKTtcbiAgICBpZiAoY29udHJvbHMgPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBwb3B1bGF0ZSBjb250cm9sc1wiKVxuXG4gICAgY29uc3QgYmluYXJpZXMgPSBnZXRCaW5hcmllcygpO1xuICAgIGNvbnNvbGUubG9nKGJpbmFyaWVzKTtcblxuICAgIGZvciAobGV0IGk9MDsgaTxiaW5hcmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGNoZWNrYm94LnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICAgICBjaGVja2JveC5uYW1lID0gYmluYXJpZXNbaV0uaWQ7XG4gICAgICAgIGNoZWNrYm94LmlkID0gYmluYXJpZXNbaV0uaWQ7XG4gICAgICAgIGNoZWNrYm94Lm9uaW5wdXQgPSB1cGRhdGVNYXA7XG5cbiAgICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICBsYWJlbC5odG1sRm9yID0gYmluYXJpZXNbaV0uaWQ7XG4gICAgICAgIGxhYmVsLmlubmVySFRNTCA9IGJpbmFyaWVzW2ldLmxhYmVsLmVuO1xuXG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgICAgICBjb250cm9scy5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgICBjb25zb2xlLmxvZyhiaW5hcmllc1tpXS5pZCk7XG4gICAgfVxuICAgIHVwZGF0ZU1hcCgpO1xufVxuXG5mdW5jdGlvbiBpc0NoZWNrZWQoaWQ6IHN0cmluZykge1xuICAgIHJldHVybiAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpKS5jaGVja2VkXG59XG5cbmZ1bmN0aW9uIHBlcm11dGF0aW9uU3RyKGJpbmFyaWVzOiBNYXBwaW5nW10pIHtcbiAgICByZXR1cm4gYmluYXJpZXMubWFwKGIgPT4gYi5pZCtcIi1cIisoK2lzQ2hlY2tlZChiLmlkKSkpLmpvaW4oXCJfXCIpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVNYXAoKSB7XG4gICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwidXBkIHRyaWdcIilcbiAgICBpZiAobWFwcGluZ3MgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgeWVhcjIxMDAgPSBpc0NoZWNrZWQobWFwcGluZ3MueWVhci5tYXBwaW5nWzBdLmlkKTtcbiAgICBjb25zdCBlbWlzc2lvbnMgPSB5ZWFyMjEwMCA/IGN1bXVsYXRlQ28yRW1pc3Npb25zKCkgOiAwO1xuICAgIGNvbnNvbGUubG9nKCdDdW11bGF0ZWQgQ08yIGVtaXNzaW9uczonLCBlbWlzc2lvbnMpO1xuICAgIGNvbnN0IHRlbXBlcmF0dXJlID0gaW50ZXJwb2xhdGVNYXBwaW5nKG1hcHBpbmdzLmltcGFjdHNfc2NlbmFyaW9zLm1hcHBpbmcsIGVtaXNzaW9ucyk7XG4gICAgY29uc29sZS5sb2coJ1RlbXBlcmF0dXJlIGZvcmVjYXN0OicsIHRlbXBlcmF0dXJlKTtcbiAgICB1cGRhdGVUZW1wZXJhdHVyZSh0ZW1wZXJhdHVyZSk7XG5cbiAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZmZXRjaFwiKTtcblxuICAgIGZldGNoKCdkYXRhLycrcGVybXV0YXRpb25TdHIoZ2V0QmluYXJpZXMoKSkrJy5jc3YnKSAvLzEwMG1zXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZ0ZXh0XCIpO1xuICAgICAgICBjb25zdCB0ID0gcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJhZnp0ZXh0XCIpO1xuICAgICAgICByZXR1cm4gdDtcblxuICAgIH0pXG4gICAgLnRoZW4oZ3JpZCA9PiByZWFkR3JpZChncmlkKSk7XG59XG5cbmZ1bmN0aW9uIGN1bXVsYXRlQ28yRW1pc3Npb25zKCkge1xuICAgIGlmIChtYXBwaW5ncyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGxldCBjdW11bF9jbzIgPSBtYXBwaW5ncy55ZWFyLm1hcHBpbmdbMF0ueTtcbiAgICBjb25zdCBwYXJhbXMgPSBtYXBwaW5ncy5wYXJhbWV0ZXJzLm1hcHBpbmdcbiAgICBmb3IgKGxldCBpPTA7IGk8cGFyYW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNoZWNrYm94ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyYW1zW2ldLmlkKTtcbiAgICAgICAgaWYgKGNoZWNrYm94LmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGN1bXVsX2NvMiArPSBwYXJhbXNbaV0ueTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY3VtdWxfY28yO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVUZW1wZXJhdHVyZSh0ZW1wZXJhdHVyZTogbnVtYmVyKSB7XG4gICAgY29uc3QgdCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVtcGVyYXR1cmUnKTtcbiAgICB0LmlubmVySFRNTCA9IE1hdGgucm91bmQoKHRlbXBlcmF0dXJlKzEpKjEwKS8xMCtcIlwiO1xufVxuXG5mdW5jdGlvbiB2KHA6IG51bWJlciwgcTogbnVtYmVyLCB0OiBudW1iZXIpIHtcbiAgICByZXR1cm4gcCooMS10KStxKnQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNpdGllcyhjaXRpZXM6IGFueSwgdHJpYW5nbGVzOiBbVmVjdG9yLCBWZWN0b3IsIFZlY3Rvcl1bXSk6IERlcGVuZGVudFtdIHtcbiAgICBjb25zdCBkZXBlbmRlbnRzOiBEZXBlbmRlbnRbXSA9IFtdO1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcbiAgICBmb3IgKGxldCBpPTA7IGk8Y2l0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNpdHkgPSBjaXRpZXNbaV07XG4gICAgICAgIGNvbnN0IGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGMuaW5uZXJIVE1MID0gY2l0eVsnbmFtZSddO1xuICAgICAgICBjLmNsYXNzTmFtZSA9ICdjaXR5JztcbiAgICAgICAgY29udGFpbmVyPy5hcHBlbmRDaGlsZChjKTtcbiAgICAgICAgY29uc3QgeCA9IGNpdHlbJ2Nvb3JkaW5hdGVzJ11bMF07XG4gICAgICAgIGNvbnN0IHkgPSBjaXR5Wydjb29yZGluYXRlcyddWzFdO1xuICAgICAgICBjb25zdCBldmVuSW5kZXggPSAoTWF0aC5mbG9vcih4KStNYXRoLmZsb29yKHkpKihHUklEX0RJTUVOLngpKSoyO1xuICAgICAgICBjb25zdCB1bmV2ZW4gPSB4LU1hdGguZmxvb3IoeCkreS1NYXRoLmZsb29yKHkpID4gMSA/IDEgOiAwO1xuICAgICAgICBjb25zdCBpbmRleCA9IGV2ZW5JbmRleCArIHVuZXZlbjtcbiAgICAgICAgY29uc29sZS5sb2coY2l0eVsnbmFtZSddLCBpbmRleCwgaW5kZXglKChHUklEX0RJTUVOLngpKjIpLCB0cmlhbmdsZXNbaW5kZXhdKTtcbiAgICAgICAgY29uc3QgYmFyeWNlbnRyaWMgPSAobmV3IFZlY3Rvcih4LCB5KSkuYmFyeWNlbnRyaWNDb29yZGluYXRlcyh0cmlhbmdsZXNbaW5kZXhdKTtcbiAgICAgICAgY29uc29sZS5sb2coeCwgeSwgYmFyeWNlbnRyaWMsIFZlY3Rvci5ldWNsaWRpYW5Db29yZGluYXRlcyh0cmlhbmdsZXNbaW5kZXhdLCBiYXJ5Y2VudHJpYykpO1xuICAgICAgICBkZXBlbmRlbnRzLnB1c2goe1xuICAgICAgICAgICAgY2FsbGJhY2s6IChncmlkUG9zOiBWZWN0b3IpID0+IHtcbiAgICAgICAgICAgICAgICBjLnN0eWxlLmxlZnQgPSBncmlkUG9zLngvR1JJRF9ESU1FTi54KjEwMCsnJSc7XG4gICAgICAgICAgICAgICAgYy5zdHlsZS50b3AgPSBncmlkUG9zLnkvR1JJRF9ESU1FTi55KjEwMCsnJSc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHJpYW5nbGVJbmRleDogaW5kZXgsXG4gICAgICAgICAgICBiYXJ5Y2VudHJpYzogYmFyeWNlbnRyaWNcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBkZXBlbmRlbnRzO1xufVxuXG5mdW5jdGlvbiBsb2FkTWFwcGluZ3MoKSB7XG4gICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiaHR0cDFcIik7XG4gICAgZmV0Y2goJ3Jlcy9tYXBwaW5ncy5qc29uJylcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcInJlc1wiKTtcbiAgICAgICAgbWFwcGluZ3MgPSBqc29uO1xuICAgICAgICBjcmVhdGVDb250cm9scygpO1xuICAgICAgICBmZXRjaCgncmVzL2NpdGllcy5qc29uJylcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbihjaXRpZXMgPT4ge1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImZha2V0cmlhbmdcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgdHJpYW5nbGVzID0gZmluZFRyaWFuZ2xlcygoeCwgeSkgPT4gbmV3IFZlY3Rvcih4LCB5KSk7XG4gICAgICAgICAgICAgICAgY3J1bXBsZWRNYXAuc2V0VGV4Q29vcmRzKHRyaWFuZ2xlcywgY3JlYXRlQ2l0aWVzKGNpdGllcywgdHJpYW5nbGVzKSk7IC8vIDYwMG1zXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYWZ0ZXJmYWtldHJpYW5nXCIpO1xuICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgIH0pOyAgICAgICBcbiAgICB9KTtcbiAgICBcbiAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJodHRwMlwiKTtcbn1cblxubG9hZE1hcHBpbmdzKCk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbi1leHBvc2VkLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9