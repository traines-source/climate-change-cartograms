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
        this.canvasDimen = Vector_1.Vector.NULL;
        this.canvasTl = Vector_1.Vector.NULL;
        this.imgDimen = Vector_1.Vector.NULL;
        this.vertexCount = 0;
        this.nonce = 0;
        this.dependents = [];
        console.log(performance.now(), "cru1");
        this.canvas = document.getElementById('map');
        this.resizeCanvas();
        this.gl = this.canvas.getContext('webgl');
        window.addEventListener('resize', () => this.resizeCanvas(), false);
        this.glSetup();
        console.log(performance.now(), "cru2");
        this.setTexture();
    }
    setTexCoords(srcTriangles, dependents) {
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
    resizeCanvas() {
        const r = this.canvas.getBoundingClientRect();
        this.canvasDimen = new Vector_1.Vector(r.width, r.height);
        this.canvasTl = new Vector_1.Vector(r.top, r.left);
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
            this.imgDimen = new Vector_1.Vector(im.width, im.height);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxpQ0FBaUMsbUJBQU8sQ0FBQyx1S0FBZ0Y7QUFDekgsMENBQTBDLG1CQUFPLENBQUMsK0hBQTZEO0FBQy9HO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNKQSxpQ0FBaUMsbUJBQU8sQ0FBQyxpTEFBcUY7QUFDOUgsMENBQTBDLG1CQUFPLENBQUMsK0hBQTZEO0FBQy9HO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNKQSxpQ0FBaUMsbUJBQU8sQ0FBQyxtS0FBOEU7QUFDdkgsMENBQTBDLG1CQUFPLENBQUMsK0hBQTZEO0FBQy9HO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNKQSxpQ0FBaUMsbUJBQU8sQ0FBQywrSkFBNEU7QUFDckgsMENBQTBDLG1CQUFPLENBQUMsK0hBQTZEO0FBQy9HO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDSmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxNQUFNOzs7QUFHTjtBQUNBO0FBQ0EsTUFBTTs7O0FBR04sZUFBZSxxQkFBTTtBQUNyQixhQUFhLHFCQUFNO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7OztBQ2hDRCxNQUFhLFFBQVE7SUFlakI7UUFUUSxVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFFBQUcsR0FBVyxDQUFDLENBQUM7UUFDaEIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFDeEIsVUFBSyxHQUEwQixRQUFRLENBQUMsU0FBUyxDQUFDO1FBRWxELGFBQVEsR0FBNEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFDOUQsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUN0Qix5QkFBb0IsR0FBVyxDQUFDLENBQUM7SUFHekMsQ0FBQztJQUVNLElBQUksQ0FBQyxJQUFZO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxFQUFFLENBQUMsRUFBVTtRQUNoQixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNkLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxVQUFVLENBQUMsVUFBa0I7UUFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFDOUIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLElBQUksQ0FBQyxJQUEyQjtRQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sSUFBSSxDQUFDLGlCQUF5QixFQUFFLFFBQW9CO1FBQ3ZELElBQUksaUJBQWlCLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDMUMsT0FBTztTQUNWO1FBQ0QsUUFBUSxFQUFFLENBQUM7SUFDZixDQUFDO0lBRU0sT0FBTyxDQUFDLG9CQUE0QixFQUFFLFFBQWlEO1FBQzFGLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVPLEtBQUs7UUFDVCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxFQUFFO1lBQy9CLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUM7U0FDekU7UUFDRCxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdEMsSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNmLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDekM7YUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO1NBQ3JFO0lBQ0wsQ0FBQztJQUVPLEdBQUc7UUFDUCxPQUFPLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRU8sT0FBTyxDQUFDLFFBQW9CLEVBQUUsaUJBQXlCO1FBQzNELE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVPLFlBQVksQ0FBQyxRQUFvQjtRQUNyQyxNQUFNLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7QUEvRUwsNEJBZ0ZDO0FBOUVVLGtCQUFTLEdBQTBCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzFDLG1CQUFVLEdBQTBCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNuRyxrQkFBUyxHQUEwQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNKcEYsOEVBQXNDO0FBQ3RDLHdFQUFrQztBQVVsQyxNQUFhLGFBQWE7SUFXdEIsWUFBb0IsU0FBaUIsRUFBVSxtQkFBMkI7UUFBdEQsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUFVLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBUTtRQVRsRSxnQkFBVyxHQUFXLGVBQU0sQ0FBQyxJQUFJLENBQUM7UUFDbEMsYUFBUSxHQUFXLGVBQU0sQ0FBQyxJQUFJLENBQUM7UUFDL0IsYUFBUSxHQUFXLGVBQU0sQ0FBQyxJQUFJLENBQUM7UUFDL0IsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFHaEIsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLGVBQVUsR0FBZ0IsRUFBRSxDQUFDO1FBR2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQXNCLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxFQUFFLEdBQTBCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsWUFBWSxDQUFDLFlBQXdDLEVBQUUsVUFBdUI7UUFDMUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRO1FBQy9GLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUc1QixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUU3QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFckQsQ0FBQztJQUVPLFlBQVk7UUFDaEIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzlDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxlQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGVBQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRU8seUJBQXlCO1FBQzdCLE1BQU0sU0FBUyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFDLENBQUMsQ0FBQztRQUM3RCxJQUFJLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDdEIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFO2dCQUNyQixLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3hCO1NBQ0o7UUFDRCxJQUFJLEtBQUssSUFBSSxTQUFTLEVBQUU7WUFDcEIsTUFBTSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztTQUN4QztRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTyxVQUFVO1FBQ2QsTUFBTSxFQUFFLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUN2QixFQUFFLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtZQUNiLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxlQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2QixDQUFDO1FBQ0QsRUFBRSxDQUFDLEdBQUcsR0FBRyxVQUFVLEdBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLEdBQUMsT0FBTyxDQUFDO1FBQzdELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxNQUFNLENBQUMsUUFBb0MsRUFBRSxPQUFnQjtRQUN6RCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU87UUFDbEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFbEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE9BQU87U0FDVjtRQUNELE1BQU0sUUFBUSxHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO1FBRWhDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDekIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckQsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssRUFBRTtnQkFDckIsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCxNQUFNLENBQUMsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU5QixJQUFJLE1BQU0sRUFBRTtnQkFDUixJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLGdCQUFnQixFQUFFLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBQyxDQUFDLENBQUMsQ0FBQzthQUN6RTtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLG9CQUFvQixDQUFDLFFBQW9DO1FBQzdELEtBQUssTUFBTSxTQUFTLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNyQyxTQUFTLENBQUMsSUFBSSxHQUFHLGVBQU0sQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN2RyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0Y7SUFDTCxDQUFDO0lBRU8sa0JBQWtCLENBQUMsUUFBb0M7UUFDM0QsS0FBSyxNQUFNLFNBQVMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3JDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsZUFBTSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEVBQUUsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3hHO0lBQ0wsQ0FBQztJQUVPLHFCQUFxQixDQUFDLENBQVM7UUFDbkMsS0FBSyxNQUFNLFNBQVMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3JDLElBQUksU0FBUyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsRUFBRSxFQUFFO2dCQUNoQyxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ2pDO1NBQ0o7SUFDTCxDQUFDO0lBRU8sWUFBWSxDQUFDLFFBQWtCO1FBQ25DLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUN2QyxPQUFPLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxHQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxHQUFDLHVCQUF1QixHQUFDLElBQUksQ0FBQyxXQUFXLEdBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0csT0FBTztTQUNWO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFHekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRU8sY0FBYyxDQUFDLENBQVM7UUFDNUIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sSUFBSSxlQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRU8saUJBQWlCLENBQUMsQ0FBUztRQUMvQixNQUFNLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDbkMsT0FBTyxJQUFJLGVBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLEtBQUssR0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRU8sbUJBQW1CLENBQUMsTUFBa0MsRUFBRSxVQUFpQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztRQUM3SCxNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7UUFDNUIsS0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDOUIsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzNFO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVPLE9BQU87UUFDWCxNQUFNLFFBQVEsR0FBRzs7Ozs7Ozs7U0FRaEIsQ0FBQztRQUVGLE1BQU0sUUFBUSxHQUFHOzs7Ozs7Ozs7Ozs7U0FZaEIsQ0FBQztRQUVGLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNoQixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHO1lBQ2YsT0FBTyxFQUFFLGFBQWE7WUFDdEIsZUFBZSxFQUFFO2dCQUNmLGtCQUFrQixFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLHFCQUFxQixDQUFDO2dCQUNuRixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxtQkFBbUIsQ0FBQztnQkFDL0UsWUFBWSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQzthQUN4RTtZQUNELGdCQUFnQixFQUFFO2dCQUNoQixVQUFVLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDO2dCQUNwRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDO2FBQ2hFO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLGdCQUFnQixFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFO2dCQUN4QyxjQUFjLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUU7YUFDekM7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsUUFBUSxFQUFFLEtBQUs7YUFDbEI7U0FDSixDQUFDO1FBQ0YsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU3QyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUdwRSxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRU8sV0FBVyxDQUFDLFNBQW1CO1FBQ25DLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzRixJQUFJLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztRQUM1RyxJQUFJLENBQUMsRUFBRSxDQUFDLHVCQUF1QixDQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBRSxDQUFDO1FBRWpGLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDeEMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTyxTQUFTLENBQUMsRUFBb0I7UUFDbEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pHLElBQUksQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUN2QyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVPLFlBQVksQ0FBQyxVQUFvQjtRQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUU1QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUUxQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3BGLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksWUFBWSxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBRSxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztRQUNsSCxJQUFJLENBQUMsRUFBRSxDQUFDLHVCQUF1QixDQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFFLENBQUM7UUFFdkYseUNBQXlDO1FBQ3pDLG9EQUFvRDtRQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUUxQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3hDLGtFQUFrRTtJQUN0RSxDQUFDO0lBRU8sVUFBVSxDQUFDLFFBQWtCO1FBQ2pDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xGLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDMUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBRSxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztRQUNoSCxJQUFJLENBQUMsRUFBRSxDQUFDLHVCQUF1QixDQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFFLENBQUM7UUFDckYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFHM0MseUNBQXlDO1FBQ3pDLG9EQUFvRDtRQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUUxQyxrRUFBa0U7SUFDdEUsQ0FBQztJQUVPLGFBQWEsQ0FBQyxDQUFTO1FBQzNCLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRU8sY0FBYztRQUNsQixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQ3pHLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDOUQ7SUFDTCxDQUFDO0lBRU8saUJBQWlCLENBQUMsUUFBZ0IsRUFBRSxRQUFnQjtRQUN4RCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFMUUsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3BELE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsbUJBQW1CLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDbEUsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1NBQzdDO1FBRUQsT0FBTyxhQUFhLENBQUM7SUFDekIsQ0FBQztJQUVPLFVBQVUsQ0FBQyxJQUFZLEVBQUUsTUFBYztRQUMzQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQzdELElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQztTQUMvQztRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7Q0FDSjtBQW5VRCxzQ0FtVUM7Ozs7Ozs7Ozs7Ozs7OztBQzlVRCxNQUFhLE1BQU07SUFHZixZQUFtQixDQUFTLEVBQVMsQ0FBUztRQUEzQixNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBQVMsTUFBQyxHQUFELENBQUMsQ0FBUTtJQUM5QyxDQUFDO0lBRUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFhO1FBQzFCLE9BQU8sSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBWTtRQUNkLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxHQUFHLENBQUMsSUFBWTtRQUNaLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxLQUFLLENBQUMsQ0FBUztRQUNYLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsVUFBVSxDQUFDLE1BQWM7UUFDckIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEQsT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxPQUFPLENBQUMsS0FBYSxFQUFFLENBQVM7UUFDNUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELHNCQUFzQixDQUFDLFFBQWtDO1FBRXJELE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUM1QyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDNUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEIsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxRQUFrQyxFQUFFLFdBQXFDO1FBQ2pHLElBQUksQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN6QixLQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BCLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNoRDtRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQzs7QUF0REwsd0JBdURDO0FBdERVLFdBQUksR0FBVyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDRDNDLHdFQUFrQztBQUNsQyw2RkFBMkQ7QUFFM0QsTUFBTSxVQUFVLEdBQUcsSUFBSSxlQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBRXhDLElBQUksUUFBUSxHQUFrQyxTQUFTLENBQUM7QUFDeEQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBY2xCLENBQUM7QUFFRixNQUFNLFdBQVcsR0FBRyxJQUFJLDZCQUFhLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBRXhELFNBQVMsYUFBYSxDQUFDLFFBQTBDO0lBQzdELE1BQU0sU0FBUyxHQUErQixFQUFFO0lBQ2hELEtBQUssSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBRSxDQUFDLEVBQUU7UUFDL0IsS0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFFLENBQUMsRUFBRTtZQUMvQixTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDNUU7S0FDSjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUM7QUFFRCxTQUFTLFFBQVEsQ0FBQyxJQUFZO0lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTztJQUNsRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztJQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMzQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUUzQyxNQUFNLE9BQU8sR0FBZSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUM1RSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMzQyxNQUFNLE9BQU8sR0FBYSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsZUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRzNDLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxFQUFFO1FBQ3RDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQUMsQ0FBQyxV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WSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRO2dCQUM5RSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3RELENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNWLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBRUQsWUFBWSxFQUFFLENBQUM7Ozs7Ozs7VUMzT2Y7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1VFUEQ7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zLy4vc3JjL0FuaW1hdG9yLnRzPzBjYjgiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy8uL3NyYy9DcnVtcGxlZEltYWdlLnRzPzEyYTMiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy8uL3NyYy9WZWN0b3IudHM/NTFkOSIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zLy4vc3JjL21haW4tZXhwb3NlZC50cyIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zLy4vbm9kZV9tb2R1bGVzL2V4cG9zZS1sb2FkZXIvZGlzdC9ydW50aW1lL2dldEdsb2JhbFRoaXMuanMiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy8uL3NyYy9BbmltYXRvci50cyIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zLy4vc3JjL0NydW1wbGVkSW1hZ2UudHMiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy8uL3NyYy9WZWN0b3IudHMiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy8uL3NyYy9tYWluLnRzIiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX18gPSByZXF1aXJlKFwiLSEuLi9ub2RlX21vZHVsZXMvdHMtbG9hZGVyL2luZGV4LmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzBdLnVzZVsxXSEuL0FuaW1hdG9yLnRzXCIpO1xudmFyIF9fX0VYUE9TRV9MT0FERVJfR0VUX0dMT0JBTF9USElTX19fID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9leHBvc2UtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRHbG9iYWxUaGlzLmpzXCIpO1xudmFyIF9fX0VYUE9TRV9MT0FERVJfR0xPQkFMX1RISVNfX18gPSBfX19FWFBPU0VfTE9BREVSX0dFVF9HTE9CQUxfVEhJU19fXztcbl9fX0VYUE9TRV9MT0FERVJfR0xPQkFMX1RISVNfX19bXCJDQ0NcIl0gPSBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXztcbm1vZHVsZS5leHBvcnRzID0gX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX187XG4iLCJ2YXIgX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX18gPSByZXF1aXJlKFwiLSEuLi9ub2RlX21vZHVsZXMvdHMtbG9hZGVyL2luZGV4LmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzBdLnVzZVsxXSEuL0NydW1wbGVkSW1hZ2UudHNcIik7XG52YXIgX19fRVhQT1NFX0xPQURFUl9HRVRfR0xPQkFMX1RISVNfX18gPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2V4cG9zZS1sb2FkZXIvZGlzdC9ydW50aW1lL2dldEdsb2JhbFRoaXMuanNcIik7XG52YXIgX19fRVhQT1NFX0xPQURFUl9HTE9CQUxfVEhJU19fXyA9IF9fX0VYUE9TRV9MT0FERVJfR0VUX0dMT0JBTF9USElTX19fO1xuX19fRVhQT1NFX0xPQURFUl9HTE9CQUxfVEhJU19fX1tcIkNDQ1wiXSA9IF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fO1xubW9kdWxlLmV4cG9ydHMgPSBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXztcbiIsInZhciBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCItIS4uL25vZGVfbW9kdWxlcy90cy1sb2FkZXIvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbMF0udXNlWzFdIS4vVmVjdG9yLnRzXCIpO1xudmFyIF9fX0VYUE9TRV9MT0FERVJfR0VUX0dMT0JBTF9USElTX19fID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9leHBvc2UtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRHbG9iYWxUaGlzLmpzXCIpO1xudmFyIF9fX0VYUE9TRV9MT0FERVJfR0xPQkFMX1RISVNfX18gPSBfX19FWFBPU0VfTE9BREVSX0dFVF9HTE9CQUxfVEhJU19fXztcbl9fX0VYUE9TRV9MT0FERVJfR0xPQkFMX1RISVNfX19bXCJDQ0NcIl0gPSBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXztcbm1vZHVsZS5leHBvcnRzID0gX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX187XG4iLCJ2YXIgX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX18gPSByZXF1aXJlKFwiLSEuLi9ub2RlX21vZHVsZXMvdHMtbG9hZGVyL2luZGV4LmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzBdLnVzZVsxXSEuL21haW4udHNcIik7XG52YXIgX19fRVhQT1NFX0xPQURFUl9HRVRfR0xPQkFMX1RISVNfX18gPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2V4cG9zZS1sb2FkZXIvZGlzdC9ydW50aW1lL2dldEdsb2JhbFRoaXMuanNcIik7XG52YXIgX19fRVhQT1NFX0xPQURFUl9HTE9CQUxfVEhJU19fXyA9IF9fX0VYUE9TRV9MT0FERVJfR0VUX0dMT0JBTF9USElTX19fO1xuX19fRVhQT1NFX0xPQURFUl9HTE9CQUxfVEhJU19fX1tcIkNDQ1wiXSA9IF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fO1xubW9kdWxlLmV4cG9ydHMgPSBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gXCJvYmplY3RcIikge1xuICAgIHJldHVybiBnbG9iYWxUaGlzO1xuICB9XG5cbiAgdmFyIGc7XG5cbiAgdHJ5IHtcbiAgICAvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgICBnID0gdGhpcyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgcmV0dXJuIHdpbmRvdztcbiAgICB9IC8vIFRoaXMgd29ya3MgaWYgdGhlIHNlbGYgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXG5cbiAgICBpZiAodHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0gLy8gVGhpcyB3b3JrcyBpZiB0aGUgZ2xvYmFsIHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblxuXG4gICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHJldHVybiBnbG9iYWw7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGc7XG59KCk7IiwiZXhwb3J0IGNsYXNzIEFuaW1hdG9yIHtcblxuICAgIHN0YXRpYyBFQVNFX05PTkU6ICh4OiBudW1iZXIpID0+IG51bWJlciA9IHggPT4geDtcbiAgICBzdGF0aWMgRUFTRV9DVUJJQzogKHg6IG51bWJlcikgPT4gbnVtYmVyID0geCA9PiB4IDwgMC41ID8gNCAqIHggKiB4ICogeCA6IDEgLSBNYXRoLnBvdygtMiAqIHggKyAyLCAzKSAvIDI7XG4gICAgc3RhdGljIEVBU0VfU0lORTogKHg6IG51bWJlcikgPT4gbnVtYmVyID0geCA9PiAtKE1hdGguY29zKE1hdGguUEkgKiB4KSAtIDEpIC8gMjtcbiAgICBcbiAgICBwcml2YXRlIF9mcm9tOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX3RvOiBudW1iZXIgPSAxO1xuICAgIHByaXZhdGUgX3RpbWVQYXNzZWQ6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfZWFzZTogKHg6IG51bWJlcikgPT4gbnVtYmVyID0gQW5pbWF0b3IuRUFTRV9OT05FO1xuXG4gICAgcHJpdmF0ZSBjYWxsYmFjazogKHg6IG51bWJlciwgaXNMYXN0OiBib29sZWFuKSA9PiBib29sZWFuID0geCA9PiB0cnVlO1xuICAgIHByaXZhdGUgc3RhcnRUaW1lOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgZHVyYXRpb25NaWxsaXNlY29uZHM6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgZnJvbShmcm9tOiBudW1iZXIpOiBBbmltYXRvciB7XG4gICAgICAgIHRoaXMuX2Zyb20gPSBmcm9tO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgdG8odG86IG51bWJlcik6IEFuaW1hdG9yIHtcbiAgICAgICAgdGhpcy5fdG8gPSB0bztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIHRpbWVQYXNzZWQodGltZVBhc3NlZDogbnVtYmVyKTogQW5pbWF0b3Ige1xuICAgICAgICB0aGlzLl90aW1lUGFzc2VkID0gdGltZVBhc3NlZDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGVhc2UoZWFzZTogKHg6IG51bWJlcikgPT4gbnVtYmVyKTogQW5pbWF0b3Ige1xuICAgICAgICB0aGlzLl9lYXNlID0gZWFzZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIHdhaXQoZGVsYXlNaWxsaXNlY29uZHM6IG51bWJlciwgY2FsbGJhY2s6ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgaWYgKGRlbGF5TWlsbGlzZWNvbmRzID4gMCkge1xuICAgICAgICAgICAgdGhpcy50aW1lb3V0KGNhbGxiYWNrLCBkZWxheU1pbGxpc2Vjb25kcyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYW5pbWF0ZShkdXJhdGlvbk1pbGxpc2Vjb25kczogbnVtYmVyLCBjYWxsYmFjazogKHg6IG51bWJlciwgaXNMYXN0OiBib29sZWFuKSA9PiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHVyYXRpb25NaWxsaXNlY29uZHMgPSBkdXJhdGlvbk1pbGxpc2Vjb25kcztcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IHRoaXMubm93KCk7XG4gICAgICAgIHRoaXMuZnJhbWUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZyYW1lKCkge1xuICAgICAgICBjb25zdCBub3cgPSB0aGlzLm5vdygpO1xuICAgICAgICBsZXQgeCA9IDE7XG4gICAgICAgIGlmICh0aGlzLmR1cmF0aW9uTWlsbGlzZWNvbmRzID4gMCkge1xuICAgICAgICAgICAgeCA9IChub3ctdGhpcy5zdGFydFRpbWUrdGhpcy5fdGltZVBhc3NlZCkgLyB0aGlzLmR1cmF0aW9uTWlsbGlzZWNvbmRzO1xuICAgICAgICB9XG4gICAgICAgIHggPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCB4KSk7XG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLl9mcm9tICsgKHRoaXMuX3RvLXRoaXMuX2Zyb20pICogdGhpcy5fZWFzZSh4KTtcbiAgICAgICAgY29uc3QgY29udCA9IHRoaXMuY2FsbGJhY2soeSwgeCA9PSAxKTtcbiAgICAgICAgaWYgKGNvbnQgJiYgeCA8IDEpIHtcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdEZyYW1lKCgpID0+IHRoaXMuZnJhbWUoKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIWNvbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdG9wcGVkIGFuaW1hdGlvbiBiZWNhdXNlIGNhbGxiYWNrIHJldHVybmVkIGZhbHNlLicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBub3coKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdGltZW91dChjYWxsYmFjazogKCkgPT4gdm9pZCwgZGVsYXlNaWxsaXNlY29uZHM6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgZGVsYXlNaWxsaXNlY29uZHMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVxdWVzdEZyYW1lKGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEFuaW1hdG9yIH0gZnJvbSBcIi4vQW5pbWF0b3JcIjtcbmltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuL1ZlY3RvclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIERlcGVuZGVudCB7XG4gICAgdHJpYW5nbGVJbmRleDogbnVtYmVyO1xuICAgIGJhcnljZW50cmljOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl1cbiAgICBmcm9tPzogVmVjdG9yO1xuICAgIHRvPzogVmVjdG9yO1xuICAgIGNhbGxiYWNrOiAoZ3JpZFBvczogVmVjdG9yKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgQ3J1bXBsZWRJbWFnZSB7XG4gICAgcHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHByaXZhdGUgY2FudmFzRGltZW46IFZlY3RvciA9IFZlY3Rvci5OVUxMO1xuICAgIHByaXZhdGUgY2FudmFzVGw6IFZlY3RvciA9IFZlY3Rvci5OVUxMO1xuICAgIHByaXZhdGUgaW1nRGltZW46IFZlY3RvciA9IFZlY3Rvci5OVUxMO1xuICAgIHByaXZhdGUgdmVydGV4Q291bnQgPSAwO1xuICAgIHByaXZhdGUgcHJvZ3JhbUluZm86IGFueTtcbiAgICBwcml2YXRlIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XG4gICAgcHJpdmF0ZSBub25jZSA9IDA7XG4gICAgcHJpdmF0ZSBkZXBlbmRlbnRzOiBEZXBlbmRlbnRbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBncmlkRGltZW46IFZlY3RvciwgcHJpdmF0ZSBhbmltYXRpb25EdXJhdGlvbk1zOiBudW1iZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiY3J1MVwiKTtcbiAgICAgICAgdGhpcy5jYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpO1xuICAgICAgICB0aGlzLnJlc2l6ZUNhbnZhcygpO1xuICAgICAgICB0aGlzLmdsID0gPFdlYkdMUmVuZGVyaW5nQ29udGV4dD50aGlzLmNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbCcpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4gdGhpcy5yZXNpemVDYW52YXMoKSwgZmFsc2UpO1xuICAgICAgICB0aGlzLmdsU2V0dXAoKTtcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiY3J1MlwiKTtcbiAgICAgICAgdGhpcy5zZXRUZXh0dXJlKCk7ICAgICAgICAgICAgICAgICAgICAgXG4gICAgfVxuXG4gICAgc2V0VGV4Q29vcmRzKHNyY1RyaWFuZ2xlczogW1ZlY3RvciwgVmVjdG9yLCBWZWN0b3JdW10sIGRlcGVuZGVudHM6IERlcGVuZGVudFtdKSB7XG4gICAgICAgIHRoaXMuZGVwZW5kZW50cyA9IGRlcGVuZGVudHM7XG4gICAgICAgIHRoaXMuZGVwZW5kZW50c1VwZGF0ZUZyb20oc3JjVHJpYW5nbGVzKTtcbiAgICAgICAgY29uc3QgY3VycmVudFN0YXRlID0gdGhpcy5tYXRyaXhDb252ZXJ0Q29vcmRzKHNyY1RyaWFuZ2xlcyk7XG4gICAgICAgIHRoaXMudmVydGV4Q291bnQgPSBjdXJyZW50U3RhdGUubGVuZ3RoIC8gMjtcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYmVmc3JjXCIpO1xuICAgICAgICBjb25zdCB0ZXhDb29yZHMgPSB0aGlzLm1hdHJpeENvbnZlcnRDb29yZHMoc3JjVHJpYW5nbGVzLCB2ID0+IHRoaXMuZ3JpZDJJbWdDb29yZHModikpOyAvLyAxMDBtc1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZzZXRpcFwiKTtcbiAgICAgICAgdGhpcy5nbFVwZGF0ZUZyb20oY3VycmVudFN0YXRlKTtcbiAgICAgICAgdGhpcy5nbFRleENvb3Jkcyh0ZXhDb29yZHMpO1xuICAgICAgIFxuICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJhZnRlcnNldHVwXCIpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCB0aGlzLmNhbnZhc0RpbWVuKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNpemVDYW52YXMoKSB7XG4gICAgICAgIGNvbnN0IHIgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdGhpcy5jYW52YXNEaW1lbiA9IG5ldyBWZWN0b3Ioci53aWR0aCwgci5oZWlnaHQpO1xuICAgICAgICB0aGlzLmNhbnZhc1RsID0gbmV3IFZlY3RvcihyLnRvcCwgci5sZWZ0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFByZWZlcnJlZEltZ1Jlc29sdXRpb24oKSB7XG4gICAgICAgIGNvbnN0IGF2YWlsYWJsZSA9IFsxMDI0LCAyMDQ4LCA0MDk2LCA4MTkyXTtcbiAgICAgICAgY29uc3QgbWF4ID0gdGhpcy5nbC5nZXRQYXJhbWV0ZXIodGhpcy5nbC5NQVhfVEVYVFVSRV9TSVpFKS8yO1xuICAgICAgICBsZXQgZm91bmQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGF2YWlsYWJsZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGF2YWlsYWJsZVtpXSA8PSBtYXgpIHtcbiAgICAgICAgICAgICAgICBmb3VuZCA9IGF2YWlsYWJsZVtpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZm91bmQgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIk5vIHRleHR1cmUgc2l6ZSBmb3VuZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIlRleHR1cmUgc2l6ZTpcIiwgZm91bmQpO1xuICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRUZXh0dXJlKCkge1xuICAgICAgICBjb25zdCBpbSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbS5vbmxvYWQgPSAoKSA9PiB7ICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuaW1nRGltZW4gPSBuZXcgVmVjdG9yKGltLndpZHRoLCBpbS5oZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5nbFRleHR1cmUoaW0pO1xuICAgICAgICB9XG4gICAgICAgIGltLnNyYyA9IFwicmVzL21hcF9cIit0aGlzLmdldFByZWZlcnJlZEltZ1Jlc29sdXRpb24oKStcInguanBnXCI7ICBcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiY3J1M1wiKTsgXG4gICAgfVxuXG4gICAgdXBkYXRlKG5ld1N0YXRlOiBbVmVjdG9yLCBWZWN0b3IsIFZlY3Rvcl1bXSwgYW5pbWF0ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJyZWNlaXZlZCB1cGRhdGVcIik7XG4gICAgICAgIGNvbnN0IG5ld1N0YXRlQ2FudmFzID0gdGhpcy5tYXRyaXhDb252ZXJ0Q29vcmRzKG5ld1N0YXRlKTsgLy8yMDBtc1xuICAgICAgICB0aGlzLm1hcFRyaWFuZ2xlcyhuZXdTdGF0ZUNhbnZhcyk7XG4gICAgICAgIHRoaXMuZGVwZW5kZW50c1VwZGF0ZVRvKG5ld1N0YXRlKTtcblxuICAgICAgICB0aGlzLm5vbmNlKys7XG4gICAgICAgIGlmICghYW5pbWF0ZSkge1xuICAgICAgICAgICAgdGhpcy5nbEludGVycG9sYXRlKDApO1xuICAgICAgICAgICAgdGhpcy5kZXBlbmRlbnRzSW50ZXJwb2xhdGUoMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYW5pbWF0b3IgPSBuZXcgQW5pbWF0b3IoKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG5vbmNlID0gdGhpcy5ub25jZTtcbiAgICAgICAgYW5pbWF0b3IuYW5pbWF0ZSh0aGlzLmFuaW1hdGlvbkR1cmF0aW9uTXMsICh4LCBpc0xhc3QpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm5vbmNlICE9IG5vbmNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwic3RhcnRlZCB1cGRhdGVcIik7XG4gICAgICAgICAgICB0aGlzLmdsSW50ZXJwb2xhdGUoeCk7XG4gICAgICAgICAgICB0aGlzLmRlcGVuZGVudHNJbnRlcnBvbGF0ZSh4KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGlzTGFzdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2xVcGRhdGVGcm9tKG5ld1N0YXRlQ2FudmFzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlcGVuZGVudHNVcGRhdGVGcm9tKG5ld1N0YXRlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJhcHBsaWVkIHVwZGF0ZVwiLCBwZXJmb3JtYW5jZS5ub3coKS1zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTsgICAgICAgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZXBlbmRlbnRzVXBkYXRlRnJvbShuZXdTdGF0ZTogW1ZlY3RvciwgVmVjdG9yLCBWZWN0b3JdW10pIHtcbiAgICAgICAgZm9yIChjb25zdCBkZXBlbmRlbnQgb2YgdGhpcy5kZXBlbmRlbnRzKSB7XG4gICAgICAgICAgICBkZXBlbmRlbnQuZnJvbSA9IFZlY3Rvci5ldWNsaWRpYW5Db29yZGluYXRlcyhuZXdTdGF0ZVtkZXBlbmRlbnQudHJpYW5nbGVJbmRleF0sIGRlcGVuZGVudC5iYXJ5Y2VudHJpYyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkZXBlbmRlbnQudHJpYW5nbGVJbmRleCwgbmV3U3RhdGVbZGVwZW5kZW50LnRyaWFuZ2xlSW5kZXhdLCBkZXBlbmRlbnQuZnJvbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRlcGVuZGVudHNVcGRhdGVUbyhuZXdTdGF0ZTogW1ZlY3RvciwgVmVjdG9yLCBWZWN0b3JdW10pIHtcbiAgICAgICAgZm9yIChjb25zdCBkZXBlbmRlbnQgb2YgdGhpcy5kZXBlbmRlbnRzKSB7XG4gICAgICAgICAgICBkZXBlbmRlbnQudG8gPSBWZWN0b3IuZXVjbGlkaWFuQ29vcmRpbmF0ZXMobmV3U3RhdGVbZGVwZW5kZW50LnRyaWFuZ2xlSW5kZXhdLCBkZXBlbmRlbnQuYmFyeWNlbnRyaWMpO1xuICAgICAgICB9XG4gICAgfSAgICBcblxuICAgIHByaXZhdGUgZGVwZW5kZW50c0ludGVycG9sYXRlKHg6IG51bWJlcikge1xuICAgICAgICBmb3IgKGNvbnN0IGRlcGVuZGVudCBvZiB0aGlzLmRlcGVuZGVudHMpIHtcbiAgICAgICAgICAgIGlmIChkZXBlbmRlbnQuZnJvbSAmJiBkZXBlbmRlbnQudG8pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBncmlkUG9pbnQgPSBkZXBlbmRlbnQuZnJvbS5iZXR3ZWVuKGRlcGVuZGVudC50bywgeCk7XG4gICAgICAgICAgICAgICAgZGVwZW5kZW50LmNhbGxiYWNrKGdyaWRQb2ludCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG1hcFRyaWFuZ2xlcyhuZXdTdGF0ZTogbnVtYmVyW10pIHtcbiAgICAgICAgaWYgKG5ld1N0YXRlLmxlbmd0aC8yICE9IHRoaXMudmVydGV4Q291bnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIm5ld1N0YXRlIGhhcyBkaWZmZXJlbnQgbGVuZ3RoIChcIituZXdTdGF0ZS5sZW5ndGgvMitcIikgdGhhbiBjdXJyZW50U3RhdGUgKFwiK3RoaXMudmVydGV4Q291bnQrXCIpXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZmRzdFwiKTtcbiAgICAgICAgXG4gICAgICBcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYmVmdXBkXCIpO1xuICAgICAgICB0aGlzLmdsVXBkYXRlVG8obmV3U3RhdGUpO1xuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIGdyaWQySW1nQ29vcmRzKHY6IFZlY3Rvcikge1xuICAgICAgICBjb25zdCBzY2FsZSA9IDEgLyB0aGlzLmdyaWREaW1lbi54O1xuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih2Lngqc2NhbGUsIHYueSoxL3RoaXMuZ3JpZERpbWVuLnkpO1xuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIGdyaWQyQ2FudmFzQ29vcmRzKHY6IFZlY3Rvcikge1xuICAgICAgICBjb25zdCBzY2FsZSA9IDIgLyB0aGlzLmdyaWREaW1lbi54O1xuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih2Lngqc2NhbGUtMSwgdi55Ki0yL3RoaXMuZ3JpZERpbWVuLnkrMSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYXRyaXhDb252ZXJ0Q29vcmRzKG1hdHJpeDogW1ZlY3RvciwgVmVjdG9yLCBWZWN0b3JdW10sIG1hcHBpbmc6ICh2OiBWZWN0b3IpID0+IFZlY3RvciA9ICh2KSA9PiB0aGlzLmdyaWQyQ2FudmFzQ29vcmRzKHYpKSB7XG4gICAgICAgIGNvbnN0IGNvb3JkczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaT0wO2k8bWF0cml4Lmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGRzdCA9IG1hdHJpeFtpXS5tYXAoKGM6IFZlY3RvcikgPT4gbWFwcGluZyhjKSk7XG4gICAgICAgICAgICBjb29yZHMucHVzaChkc3RbMF0ueCwgZHN0WzBdLnksIGRzdFsxXS54LCBkc3RbMV0ueSwgZHN0WzJdLngsIGRzdFsyXS55KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29vcmRzO1xuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIGdsU2V0dXAoKSB7XG4gICAgICAgIGNvbnN0IGZzU291cmNlID0gYFxuICAgICAgICAgICAgdmFyeWluZyBoaWdocCB2ZWMyIHZUZXh0dXJlQ29vcmQ7XG5cbiAgICAgICAgICAgIHVuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyO1xuXG4gICAgICAgICAgICB2b2lkIG1haW4odm9pZCkge1xuICAgICAgICAgICAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2VGV4dHVyZUNvb3JkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYDtcblxuICAgICAgICBjb25zdCB2c1NvdXJjZSA9IGBcbiAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWM0IGFWZXJ0ZXhQb3NpdGlvbkZyb207XG4gICAgICAgICAgICBhdHRyaWJ1dGUgdmVjNCBhVmVydGV4UG9zaXRpb25UbztcbiAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWMyIGFUZXh0dXJlQ29vcmQ7XG4gICAgICAgICAgICB1bmlmb3JtIGZsb2F0IHVBbmltYXRpb25YOyBcblxuICAgICAgICAgICAgdmFyeWluZyBoaWdocCB2ZWMyIHZUZXh0dXJlQ29vcmQ7XG5cbiAgICAgICAgICAgIHZvaWQgbWFpbih2b2lkKSB7XG4gICAgICAgICAgICBnbF9Qb3NpdGlvbiA9IGFWZXJ0ZXhQb3NpdGlvbkZyb20qKDEuMC11QW5pbWF0aW9uWCkrYVZlcnRleFBvc2l0aW9uVG8qdUFuaW1hdGlvblg7XG4gICAgICAgICAgICB2VGV4dHVyZUNvb3JkID0gYVRleHR1cmVDb29yZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYDtcblxuICAgICAgICBjb25zdCBzaGFkZXJQcm9ncmFtID0gdGhpcy5pbml0U2hhZGVyUHJvZ3JhbSh2c1NvdXJjZSwgZnNTb3VyY2UpO1xuICAgICAgICBpZiAoIXNoYWRlclByb2dyYW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb2dyYW1JbmZvID0ge1xuICAgICAgICAgICAgcHJvZ3JhbTogc2hhZGVyUHJvZ3JhbSxcbiAgICAgICAgICAgIGF0dHJpYkxvY2F0aW9uczoge1xuICAgICAgICAgICAgICB2ZXJ0ZXhQb3NpdGlvbkZyb206IHRoaXMuZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ2FWZXJ0ZXhQb3NpdGlvbkZyb20nKSxcbiAgICAgICAgICAgICAgdmVydGV4UG9zaXRpb25UbzogdGhpcy5nbC5nZXRBdHRyaWJMb2NhdGlvbihzaGFkZXJQcm9ncmFtLCAnYVZlcnRleFBvc2l0aW9uVG8nKSxcbiAgICAgICAgICAgICAgdGV4dHVyZUNvb3JkOiB0aGlzLmdsLmdldEF0dHJpYkxvY2F0aW9uKHNoYWRlclByb2dyYW0sICdhVGV4dHVyZUNvb3JkJyksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdW5pZm9ybUxvY2F0aW9uczoge1xuICAgICAgICAgICAgICBhbmltYXRpb25YOiB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbihzaGFkZXJQcm9ncmFtLCAndUFuaW1hdGlvblgnKSxcbiAgICAgICAgICAgICAgdVNhbXBsZXI6IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlclByb2dyYW0sICd1U2FtcGxlcicpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJ1ZmZlcnM6IHtcbiAgICAgICAgICAgICAgICB2ZXJ0ZXhCdWZmZXJGcm9tOiB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpLFxuICAgICAgICAgICAgICAgIHZlcnRleEJ1ZmZlclRvOiB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbG9hZGVkOiB7XG4gICAgICAgICAgICAgICAgdGV4dHVyZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgdGV4Q29vcmQ6IGZhbHNlLCBcbiAgICAgICAgICAgICAgICBkc3RDb29yZDogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nbC51c2VQcm9ncmFtKHRoaXMucHJvZ3JhbUluZm8ucHJvZ3JhbSk7XG5cbiAgICAgICAgdGhpcy5nbC52aWV3cG9ydCgwLCAwLCB0aGlzLmdsLmNhbnZhcy53aWR0aCwgdGhpcy5nbC5jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICB0aGlzLmdsLnVuaWZvcm0xaSh0aGlzLnByb2dyYW1JbmZvLnVuaWZvcm1Mb2NhdGlvbnMudVNhbXBsZXIsIDApO1xuICAgICAgICB0aGlzLmdsLnVuaWZvcm0xZih0aGlzLnByb2dyYW1JbmZvLnVuaWZvcm1Mb2NhdGlvbnMuYW5pbWF0aW9uWCwgMC4wKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdsVGV4Q29vcmRzKHRleENvb3JkczogbnVtYmVyW10pIHtcbiAgICAgICAgY29uc3QgdGV4Q29vcmRCdWZmZXIgPSB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgICAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHRleENvb3JkQnVmZmVyKTtcbiAgICAgICAgdGhpcy5nbC5idWZmZXJEYXRhKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHRleENvb3JkcyksIHRoaXMuZ2wuU1RBVElDX0RSQVcpO1xuICAgICAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIoIHRoaXMucHJvZ3JhbUluZm8uYXR0cmliTG9jYXRpb25zLnRleHR1cmVDb29yZCwgMiwgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDAgKTtcbiAgICAgICAgdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSggdGhpcy5wcm9ncmFtSW5mby5hdHRyaWJMb2NhdGlvbnMudGV4dHVyZUNvb3JkICk7XG5cbiAgICAgICAgdGhpcy5wcm9ncmFtSW5mby5sb2FkZWQudGV4Q29vcmQgPSB0cnVlO1xuICAgICAgICB0aGlzLmdsRGVmZXJyZWREcmF3KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnbFRleHR1cmUoaW06IEhUTUxJbWFnZUVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgdGV4TmFtZSA9IHRoaXMuZ2wuY3JlYXRlVGV4dHVyZSgpO1xuICAgICAgICB0aGlzLmdsLmFjdGl2ZVRleHR1cmUodGhpcy5nbC5URVhUVVJFMCk7XG4gICAgICAgIHRoaXMuZ2wuYmluZFRleHR1cmUodGhpcy5nbC5URVhUVVJFXzJELCB0ZXhOYW1lKTtcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIHRoaXMuZ2wuZ2V0UGFyYW1ldGVyKHRoaXMuZ2wuTUFYX1RFWFRVUkVfU0laRSksIGltLndpZHRoLCBpbS5oZWlnaHQsIHRoaXMuZ2wuY2FudmFzLmhlaWdodCk7XG4gICAgICAgIHRoaXMuZ2wudGV4SW1hZ2UyRCh0aGlzLmdsLlRFWFRVUkVfMkQsIDAsIHRoaXMuZ2wuUkdCQSwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlVOU0lHTkVEX0JZVEUsIGltKTtcbiAgICAgICAgdGhpcy5nbC5nZW5lcmF0ZU1pcG1hcCh0aGlzLmdsLlRFWFRVUkVfMkQpO1xuICAgICAgIFxuICAgICAgICB0aGlzLnByb2dyYW1JbmZvLmxvYWRlZC50ZXh0dXJlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5nbERlZmVycmVkRHJhdygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2xVcGRhdGVGcm9tKGZyb21Db29yZHM6IG51bWJlcltdKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZmJ1ZmZlclwiKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZiaW5kXCIpO1xuXG4gICAgICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy5wcm9ncmFtSW5mby5idWZmZXJzLnZlcnRleEJ1ZmZlckZyb20pO1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZkYXRhXCIpO1xuICAgICAgICB0aGlzLmdsLmJ1ZmZlckRhdGEodGhpcy5nbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoZnJvbUNvb3JkcyksIHRoaXMuZ2wuU1RBVElDX0RSQVcpOyAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZmF0dHJpYlwiKTtcblxuICAgICAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIoIHRoaXMucHJvZ3JhbUluZm8uYXR0cmliTG9jYXRpb25zLnZlcnRleFBvc2l0aW9uRnJvbSwgMiwgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDAgKTtcbiAgICAgICAgdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSggdGhpcy5wcm9ncmFtSW5mby5hdHRyaWJMb2NhdGlvbnMudmVydGV4UG9zaXRpb25Gcm9tICk7XG5cbiAgICAgICAgLy90aGlzLmdsLmNsZWFyQ29sb3IoMC4wLCAwLjAsIDAuMCwgMS4wKTtcbiAgICAgICAgLy90aGlzLmdsLmNsZWFyKHRoaXMuZ2wuQ09MT1JfQlVGRkVSX0JJVCk7ICAgICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZkcmF3XCIpO1xuXG4gICAgICAgIHRoaXMucHJvZ3JhbUluZm8ubG9hZGVkLmRzdENvb3JkID0gdHJ1ZTtcbiAgICAgICAgLy90aGlzLmdsLmRyYXdBcnJheXModGhpcy5nbC5UUklBTkdMRVMsIDAsIGZyb21Db29yZHMubGVuZ3RoIC8gMik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnbFVwZGF0ZVRvKHRvQ29vcmRzOiBudW1iZXJbXSkge1xuICAgICAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHRoaXMucHJvZ3JhbUluZm8uYnVmZmVycy52ZXJ0ZXhCdWZmZXJUbyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZmRhdGFcIik7XG4gICAgICAgIHRoaXMuZ2wuYnVmZmVyRGF0YSh0aGlzLmdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheSh0b0Nvb3JkcyksIHRoaXMuZ2wuU1RBVElDX0RSQVcpOyAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZmF0dHJpYlwiKTtcblxuICAgICAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIoIHRoaXMucHJvZ3JhbUluZm8uYXR0cmliTG9jYXRpb25zLnZlcnRleFBvc2l0aW9uVG8sIDIsIHRoaXMuZ2wuRkxPQVQsIGZhbHNlLCAwLCAwICk7XG4gICAgICAgIHRoaXMuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoIHRoaXMucHJvZ3JhbUluZm8uYXR0cmliTG9jYXRpb25zLnZlcnRleFBvc2l0aW9uVG8gKTtcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYmVmY2xlYXJcIik7XG4gICAgICBcblxuICAgICAgICAvL3RoaXMuZ2wuY2xlYXJDb2xvcigwLjAsIDAuMCwgMC4wLCAxLjApO1xuICAgICAgICAvL3RoaXMuZ2wuY2xlYXIodGhpcy5nbC5DT0xPUl9CVUZGRVJfQklUKTsgICAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZmRyYXdcIik7XG5cbiAgICAgICAgLy90aGlzLmdsLmRyYXdBcnJheXModGhpcy5nbC5UUklBTkdMRVMsIDAsIGZyb21Db29yZHMubGVuZ3RoIC8gMik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnbEludGVycG9sYXRlKHg6IG51bWJlcikge1xuICAgICAgICB0aGlzLmdsLnVuaWZvcm0xZih0aGlzLnByb2dyYW1JbmZvLnVuaWZvcm1Mb2NhdGlvbnMuYW5pbWF0aW9uWCwgeCk7XG4gICAgICAgIHRoaXMuZ2xEZWZlcnJlZERyYXcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdsRGVmZXJyZWREcmF3KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9ncmFtSW5mby5sb2FkZWQudGV4dHVyZSAmJiB0aGlzLnByb2dyYW1JbmZvLmxvYWRlZC50ZXhDb29yZCAmJiB0aGlzLnByb2dyYW1JbmZvLmxvYWRlZC5kc3RDb29yZCkge1xuICAgICAgICAgICAgdGhpcy5nbC5kcmF3QXJyYXlzKHRoaXMuZ2wuVFJJQU5HTEVTLCAwLCB0aGlzLnZlcnRleENvdW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFNoYWRlclByb2dyYW0odnNTb3VyY2U6IHN0cmluZywgZnNTb3VyY2U6IHN0cmluZykge1xuICAgICAgICBjb25zdCB2ZXJ0ZXhTaGFkZXIgPSB0aGlzLmxvYWRTaGFkZXIodGhpcy5nbC5WRVJURVhfU0hBREVSLCB2c1NvdXJjZSk7XG4gICAgICAgIGNvbnN0IGZyYWdtZW50U2hhZGVyID0gdGhpcy5sb2FkU2hhZGVyKHRoaXMuZ2wuRlJBR01FTlRfU0hBREVSLCBmc1NvdXJjZSk7XG4gICAgXG4gICAgICAgIGNvbnN0IHNoYWRlclByb2dyYW0gPSB0aGlzLmdsLmNyZWF0ZVByb2dyYW0oKTtcbiAgICAgICAgaWYgKCFzaGFkZXJQcm9ncmFtIHx8ICF2ZXJ0ZXhTaGFkZXIgfHwgIWZyYWdtZW50U2hhZGVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nbC5hdHRhY2hTaGFkZXIoc2hhZGVyUHJvZ3JhbSwgdmVydGV4U2hhZGVyKTtcbiAgICAgICAgdGhpcy5nbC5hdHRhY2hTaGFkZXIoc2hhZGVyUHJvZ3JhbSwgZnJhZ21lbnRTaGFkZXIpO1xuICAgICAgICB0aGlzLmdsLmxpbmtQcm9ncmFtKHNoYWRlclByb2dyYW0pO1xuICAgIFxuICAgICAgICBpZiAoIXRoaXMuZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihzaGFkZXJQcm9ncmFtLCB0aGlzLmdsLkxJTktfU1RBVFVTKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2hhZGVycyBwcm9ncmFtIGZhaWxlZFwiKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICByZXR1cm4gc2hhZGVyUHJvZ3JhbTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRTaGFkZXIodHlwZTogbnVtYmVyLCBzb3VyY2U6IHN0cmluZykge1xuICAgICAgICBjb25zdCBzaGFkZXIgPSB0aGlzLmdsLmNyZWF0ZVNoYWRlcih0eXBlKTtcbiAgICAgICAgaWYgKCFzaGFkZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSAgICBcbiAgICAgICAgdGhpcy5nbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzb3VyY2UpO1xuICAgICAgICB0aGlzLmdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTsgICAgXG4gICAgICAgIGlmICghdGhpcy5nbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCB0aGlzLmdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgICAgICAgdGhpcy5nbC5kZWxldGVTaGFkZXIoc2hhZGVyKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvbXBpbGluZyBzaGFkZXJzIGZhaWxlZFwiKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICByZXR1cm4gc2hhZGVyO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgVmVjdG9yIHtcbiAgICBzdGF0aWMgTlVMTDogVmVjdG9yID0gbmV3IFZlY3RvcigwLCAwKTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB4OiBudW1iZXIsIHB1YmxpYyB5OiBudW1iZXIpIHtcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbUFycmF5KGFycjogbnVtYmVyW10pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IoYXJyWzBdLCBhcnJbMV0pO1xuICAgIH1cblxuICAgIGdldCBsZW5ndGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh0aGlzLngsIDIpICsgTWF0aC5wb3codGhpcy55LCAyKSk7XG4gICAgfVxuXG4gICAgZGVsdGEodGhhdDogVmVjdG9yKTogVmVjdG9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IodGhhdC54IC0gdGhpcy54LCB0aGF0LnkgLSB0aGlzLnkpO1xuICAgIH1cblxuICAgIGFkZCh0aGF0OiBWZWN0b3IpOiBWZWN0b3Ige1xuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLnggKyB0aGF0LngsIHRoaXMueSArIHRoYXQueSk7XG4gICAgfVxuXG4gICAgdGltZXMoZjogbnVtYmVyKTogVmVjdG9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54ICogZiwgdGhpcy55ICogZik7XG4gICAgfVxuXG4gICAgd2l0aExlbmd0aChsZW5ndGg6IG51bWJlcik6IFZlY3RvciB7XG4gICAgICAgIGNvbnN0IHJhdGlvID0gdGhpcy5sZW5ndGggIT0gMCA/IGxlbmd0aC90aGlzLmxlbmd0aCA6IDA7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCpyYXRpbywgdGhpcy55KnJhdGlvKTtcbiAgICB9XG5cbiAgICBiZXR3ZWVuKG90aGVyOiBWZWN0b3IsIHg6IG51bWJlcikge1xuICAgICAgICBjb25zdCBkZWx0YSA9IHRoaXMuZGVsdGEob3RoZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5hZGQoZGVsdGEud2l0aExlbmd0aChkZWx0YS5sZW5ndGgqeCkpO1xuICAgIH1cblxuICAgIGJhcnljZW50cmljQ29vcmRpbmF0ZXModHJpYW5nbGU6IFtWZWN0b3IsIFZlY3RvciwgVmVjdG9yXSk6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXVxuICAgIHtcbiAgICAgICAgY29uc3QgdjAgPSB0cmlhbmdsZVswXS5kZWx0YSh0cmlhbmdsZVsxXSlcbiAgICAgICAgY29uc3QgdjEgPSB0cmlhbmdsZVswXS5kZWx0YSh0cmlhbmdsZVsyXSlcbiAgICAgICAgY29uc3QgdjIgPSB0cmlhbmdsZVswXS5kZWx0YSh0aGlzKTtcbiAgICAgICAgY29uc3QgZGVuID0gMSAvICh2MC54ICogdjEueSAtIHYxLnggKiB2MC55KTtcbiAgICAgICAgY29uc3QgdiA9ICh2Mi54ICogdjEueSAtIHYxLnggKiB2Mi55KSAqIGRlbjtcbiAgICAgICAgY29uc3QgdyA9ICh2MC54ICogdjIueSAtIHYyLnggKiB2MC55KSAqIGRlbjtcbiAgICAgICAgY29uc3QgdSA9IDEuMCAtIHYgLSB3O1xuICAgICAgICByZXR1cm4gW3UsIHYsIHddO1xuICAgIH1cblxuICAgIHN0YXRpYyBldWNsaWRpYW5Db29yZGluYXRlcyh0cmlhbmdsZTogW1ZlY3RvciwgVmVjdG9yLCBWZWN0b3JdLCBiYXJ5Y2VudHJpYzogW251bWJlciwgbnVtYmVyLCBudW1iZXJdKTogVmVjdG9yIHtcbiAgICAgICAgbGV0IHIgPSBuZXcgVmVjdG9yKDAsIDApO1xuICAgICAgICBmb3IgKGxldCBpPTA7IGk8MzsgaSsrKSB7XG4gICAgICAgICAgICByID0gci5hZGQodHJpYW5nbGVbaV0udGltZXMoYmFyeWNlbnRyaWNbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcjtcbiAgICB9XG59IiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4vVmVjdG9yXCI7XG5pbXBvcnQgeyBDcnVtcGxlZEltYWdlLCBEZXBlbmRlbnQgfSBmcm9tIFwiLi9DcnVtcGxlZEltYWdlXCI7XG5cbmNvbnN0IEdSSURfRElNRU4gPSBuZXcgVmVjdG9yKDQwMCwgMjAwKTtcblxubGV0IG1hcHBpbmdzOiBNYXBwaW5nQ29sbGVjdGlvbiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbmxldCBpbml0aWFsID0gdHJ1ZTtcblxuaW50ZXJmYWNlIExhYmVsIHsgW2lkOiBzdHJpbmddOiBzdHJpbmcgfVxuaW50ZXJmYWNlIE1hcHBpbmcge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgbGFiZWw6IExhYmVsO1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG59XG5pbnRlcmZhY2UgTWFwcGluZ0NvbGxlY3Rpb24geyBcbiAgICBbaWQ6IHN0cmluZ106IHtcbiAgICAgICAgbGFiZWw6IExhYmVsO1xuICAgICAgICBtYXBwaW5nOiBNYXBwaW5nW107XG4gICAgfVxufTtcblxuY29uc3QgY3J1bXBsZWRNYXAgPSBuZXcgQ3J1bXBsZWRJbWFnZShHUklEX0RJTUVOLCAyMDAwKTtcblxuZnVuY3Rpb24gZmluZFRyaWFuZ2xlcyhyZXNvbHZlcjogKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiBWZWN0b3IpIHtcbiAgICBjb25zdCB0cmlhbmdsZXM6IFtWZWN0b3IsIFZlY3RvciwgVmVjdG9yXVtdID0gW11cbiAgICBmb3IgKGxldCBpPTA7aTxHUklEX0RJTUVOLnk7IGkrPTEpIHtcbiAgICAgICAgZm9yIChsZXQgaj0wO2o8R1JJRF9ESU1FTi54OyBqKz0xKSB7XG4gICAgICAgICAgICB0cmlhbmdsZXMucHVzaChbcmVzb2x2ZXIoaiwgaSksIHJlc29sdmVyKGorMSwgaSksIHJlc29sdmVyKGosIGkrMSldKTtcbiAgICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKFtyZXNvbHZlcihqKzEsIGkrMSksIHJlc29sdmVyKGorMSwgaSksIHJlc29sdmVyKGosIGkrMSldKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJpYW5nbGVzO1xufVxuXG5mdW5jdGlvbiByZWFkR3JpZChncmlkOiBzdHJpbmcpIHtcbiAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZyZWFkXCIpOyAvLzUwMG1zXG4gICAgY29uc3Qgcm93cyA9IGdyaWQuc3BsaXQoXCJcXG5cIilcbiAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZyZWFkMVwiKTtcbiAgICByb3dzLnBvcCgpO1xuICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZnJlYWQyXCIpOyBcblxuICAgIGNvbnN0IG51bWJlcnM6IG51bWJlcltdW10gPSByb3dzLm1hcChyb3cgPT4gcm93LnNwbGl0KFwiIFwiKS5tYXAocGFyc2VGbG9hdCkpO1xuICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZnJlYWQzXCIpOyBcbiAgICBjb25zdCB2ZWN0b3JzOiBWZWN0b3JbXSA9IG51bWJlcnMubWFwKHJvdyA9PiBWZWN0b3IuZnJvbUFycmF5KHJvdykpO1xuICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZnJlYWQ0XCIpOyBcblxuXG4gICAgY29uc3QgcmVzb2x2ZXIgPSAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IHtcbiAgICAgICAgY29uc3QgdiA9IHZlY3RvcnNbeSooR1JJRF9ESU1FTi54KzEpK3hdO1xuICAgICAgICBpZiAodiA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGV5XCIsIHgsIHkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHYueCwgdi55KTtcbiAgICB9XG4gICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYmVmdHJpYW5nbGVzXCIpO1xuICAgIGNvbnN0IHRyaWFuZ2xlcyA9IGZpbmRUcmlhbmdsZXMocmVzb2x2ZXIpOyAvLzYwMG1zXG4gICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiaGV5XCIpO1xuXG4gICAgY3J1bXBsZWRNYXAudXBkYXRlKHRyaWFuZ2xlcywgIWluaXRpYWwpO1xuICAgIGluaXRpYWwgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaW50ZXJwb2xhdGVNYXBwaW5nKG1hcHBpbmdzOiBNYXBwaW5nW10sIHg6IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IHVwcGVyIDogTWFwcGluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbG93ZXIgOiBNYXBwaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIGZvciAobGV0IGk9MDsgaTxtYXBwaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobWFwcGluZ3NbaV0ueCA+PSB4ICYmICh1cHBlciA9PSB1bmRlZmluZWQgfHwgbWFwcGluZ3NbaV0ueCA8IHVwcGVyLngpKSB7XG4gICAgICAgICAgICB1cHBlciA9IG1hcHBpbmdzW2ldO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXBwaW5nc1tpXS54IDw9IHggJiYgKGxvd2VyID09IHVuZGVmaW5lZCB8fCBtYXBwaW5nc1tpXS54ID4gbG93ZXIueCkpIHtcbiAgICAgICAgICAgIGxvd2VyID0gbWFwcGluZ3NbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGxvd2VyID09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAodXBwZXIgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBpbnRlcnBvbGF0aW9uIHBvc3NpYmxlXCIpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVwcGVyLnk7XG4gICAgfVxuICAgIGlmICh1cHBlciA9PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiBsb3dlci55O1xuICAgIGlmICh1cHBlciA9PSBsb3dlcilcbiAgICAgICAgcmV0dXJuIHVwcGVyLnk7XG4gICAgcmV0dXJuICh4LWxvd2VyLngpLyh1cHBlci54LWxvd2VyLngpKih1cHBlci55LWxvd2VyLnkpK2xvd2VyLnk7XG59XG5cbmZ1bmN0aW9uIGdldEJpbmFyaWVzKCk6IE1hcHBpbmdbXSB7XG4gICAgaWYgKG1hcHBpbmdzID09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHJldHVybiBtYXBwaW5ncy55ZWFyLm1hcHBpbmcuY29uY2F0KG1hcHBpbmdzLnBhcmFtZXRlcnMubWFwcGluZywgbWFwcGluZ3MubWV0cmljcy5tYXBwaW5nLCBtYXBwaW5ncy5pbXBhY3RzLm1hcHBpbmcpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb250cm9scygpIHtcbiAgICBpZiAobWFwcGluZ3MgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjb250cm9scyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9scycpO1xuICAgIGlmIChjb250cm9scyA9PSB1bmRlZmluZWQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IHBvcHVsYXRlIGNvbnRyb2xzXCIpXG5cbiAgICBjb25zdCBiaW5hcmllcyA9IGdldEJpbmFyaWVzKCk7XG4gICAgY29uc29sZS5sb2coYmluYXJpZXMpO1xuXG4gICAgZm9yIChsZXQgaT0wOyBpPGJpbmFyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgY2hlY2tib3gudHlwZSA9ICdjaGVja2JveCc7XG4gICAgICAgIGNoZWNrYm94Lm5hbWUgPSBiaW5hcmllc1tpXS5pZDtcbiAgICAgICAgY2hlY2tib3guaWQgPSBiaW5hcmllc1tpXS5pZDtcbiAgICAgICAgY2hlY2tib3gub25pbnB1dCA9IHVwZGF0ZU1hcDtcblxuICAgICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIGxhYmVsLmh0bWxGb3IgPSBiaW5hcmllc1tpXS5pZDtcbiAgICAgICAgbGFiZWwuaW5uZXJIVE1MID0gYmluYXJpZXNbaV0ubGFiZWwuZW47XG5cbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChjaGVja2JveCk7XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgICAgIGNvbnRyb2xzLmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgIGNvbnNvbGUubG9nKGJpbmFyaWVzW2ldLmlkKTtcbiAgICB9XG4gICAgdXBkYXRlTWFwKCk7XG59XG5cbmZ1bmN0aW9uIGlzQ2hlY2tlZChpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkpLmNoZWNrZWRcbn1cblxuZnVuY3Rpb24gcGVybXV0YXRpb25TdHIoYmluYXJpZXM6IE1hcHBpbmdbXSkge1xuICAgIHJldHVybiBiaW5hcmllcy5tYXAoYiA9PiBiLmlkK1wiLVwiKygraXNDaGVja2VkKGIuaWQpKSkuam9pbihcIl9cIik7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZU1hcCgpIHtcbiAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJ1cGQgdHJpZ1wiKVxuICAgIGlmIChtYXBwaW5ncyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB5ZWFyMjEwMCA9IGlzQ2hlY2tlZChtYXBwaW5ncy55ZWFyLm1hcHBpbmdbMF0uaWQpO1xuICAgIGNvbnN0IGVtaXNzaW9ucyA9IHllYXIyMTAwID8gY3VtdWxhdGVDbzJFbWlzc2lvbnMoKSA6IDA7XG4gICAgY29uc29sZS5sb2coJ0N1bXVsYXRlZCBDTzIgZW1pc3Npb25zOicsIGVtaXNzaW9ucyk7XG4gICAgY29uc3QgdGVtcGVyYXR1cmUgPSBpbnRlcnBvbGF0ZU1hcHBpbmcobWFwcGluZ3MuaW1wYWN0c19zY2VuYXJpb3MubWFwcGluZywgZW1pc3Npb25zKTtcbiAgICBjb25zb2xlLmxvZygnVGVtcGVyYXR1cmUgZm9yZWNhc3Q6JywgdGVtcGVyYXR1cmUpO1xuICAgIHVwZGF0ZVRlbXBlcmF0dXJlKHRlbXBlcmF0dXJlKTtcblxuICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZmZldGNoXCIpO1xuXG4gICAgZmV0Y2goJ2RhdGEvJytwZXJtdXRhdGlvblN0cihnZXRCaW5hcmllcygpKSsnLmNzdicpIC8vMTAwbXNcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZnRleHRcIik7XG4gICAgICAgIGNvbnN0IHQgPSByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImFmenRleHRcIik7XG4gICAgICAgIHJldHVybiB0O1xuXG4gICAgfSlcbiAgICAudGhlbihncmlkID0+IHJlYWRHcmlkKGdyaWQpKTtcbn1cblxuZnVuY3Rpb24gY3VtdWxhdGVDbzJFbWlzc2lvbnMoKSB7XG4gICAgaWYgKG1hcHBpbmdzID09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgbGV0IGN1bXVsX2NvMiA9IG1hcHBpbmdzLnllYXIubWFwcGluZ1swXS55O1xuICAgIGNvbnN0IHBhcmFtcyA9IG1hcHBpbmdzLnBhcmFtZXRlcnMubWFwcGluZ1xuICAgIGZvciAobGV0IGk9MDsgaTxwYXJhbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY2hlY2tib3ggPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJhbXNbaV0uaWQpO1xuICAgICAgICBpZiAoY2hlY2tib3guY2hlY2tlZCkge1xuICAgICAgICAgICAgY3VtdWxfY28yICs9IHBhcmFtc1tpXS55O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjdW11bF9jbzI7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRlbXBlcmF0dXJlKHRlbXBlcmF0dXJlOiBudW1iZXIpIHtcbiAgICBjb25zdCB0ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZW1wZXJhdHVyZScpO1xuICAgIHQuaW5uZXJIVE1MID0gTWF0aC5yb3VuZCgodGVtcGVyYXR1cmUrMSkqMTApLzEwK1wiXCI7XG59XG5cbmZ1bmN0aW9uIHYocDogbnVtYmVyLCBxOiBudW1iZXIsIHQ6IG51bWJlcikge1xuICAgIHJldHVybiBwKigxLXQpK3EqdDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ2l0aWVzKGNpdGllczogYW55LCB0cmlhbmdsZXM6IFtWZWN0b3IsIFZlY3RvciwgVmVjdG9yXVtdKTogRGVwZW5kZW50W10ge1xuICAgIGNvbnN0IGRlcGVuZGVudHM6IERlcGVuZGVudFtdID0gW107XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpO1xuICAgIGZvciAobGV0IGk9MDsgaTxjaXRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY2l0eSA9IGNpdGllc1tpXTtcbiAgICAgICAgY29uc3QgYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgYy5pbm5lckhUTUwgPSBjaXR5WyduYW1lJ107XG4gICAgICAgIGMuY2xhc3NOYW1lID0gJ2NpdHknO1xuICAgICAgICBjb250YWluZXI/LmFwcGVuZENoaWxkKGMpO1xuICAgICAgICBjb25zdCB4ID0gY2l0eVsnY29vcmRpbmF0ZXMnXVswXTtcbiAgICAgICAgY29uc3QgeSA9IGNpdHlbJ2Nvb3JkaW5hdGVzJ11bMV07XG4gICAgICAgIGNvbnN0IGV2ZW5JbmRleCA9IChNYXRoLmZsb29yKHgpK01hdGguZmxvb3IoeSkqKEdSSURfRElNRU4ueCkpKjI7XG4gICAgICAgIGNvbnN0IHVuZXZlbiA9IHgtTWF0aC5mbG9vcih4KSt5LU1hdGguZmxvb3IoeSkgPiAxID8gMSA6IDA7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gZXZlbkluZGV4ICsgdW5ldmVuO1xuICAgICAgICBjb25zb2xlLmxvZyhjaXR5WyduYW1lJ10sIGluZGV4LCBpbmRleCUoKEdSSURfRElNRU4ueCkqMiksIHRyaWFuZ2xlc1tpbmRleF0pO1xuICAgICAgICBjb25zdCBiYXJ5Y2VudHJpYyA9IChuZXcgVmVjdG9yKHgsIHkpKS5iYXJ5Y2VudHJpY0Nvb3JkaW5hdGVzKHRyaWFuZ2xlc1tpbmRleF0pO1xuICAgICAgICBjb25zb2xlLmxvZyh4LCB5LCBiYXJ5Y2VudHJpYywgVmVjdG9yLmV1Y2xpZGlhbkNvb3JkaW5hdGVzKHRyaWFuZ2xlc1tpbmRleF0sIGJhcnljZW50cmljKSk7XG4gICAgICAgIGRlcGVuZGVudHMucHVzaCh7XG4gICAgICAgICAgICBjYWxsYmFjazogKGdyaWRQb3M6IFZlY3RvcikgPT4ge1xuICAgICAgICAgICAgICAgIGMuc3R5bGUubGVmdCA9IGdyaWRQb3MueC9HUklEX0RJTUVOLngqMTAwKyclJztcbiAgICAgICAgICAgICAgICBjLnN0eWxlLnRvcCA9IGdyaWRQb3MueS9HUklEX0RJTUVOLnkqMTAwKyclJztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0cmlhbmdsZUluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIGJhcnljZW50cmljOiBiYXJ5Y2VudHJpY1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGRlcGVuZGVudHM7XG59XG5cbmZ1bmN0aW9uIGxvYWRNYXBwaW5ncygpIHtcbiAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJodHRwMVwiKTtcbiAgICBmZXRjaCgncmVzL21hcHBpbmdzLmpzb24nKVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwicmVzXCIpO1xuICAgICAgICBtYXBwaW5ncyA9IGpzb247XG4gICAgICAgIGNyZWF0ZUNvbnRyb2xzKCk7XG4gICAgICAgIGZldGNoKCdyZXMvY2l0aWVzLmpzb24nKVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKGNpdGllcyA9PiB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiZmFrZXRyaWFuZ1wiKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0cmlhbmdsZXMgPSBmaW5kVHJpYW5nbGVzKCh4LCB5KSA9PiBuZXcgVmVjdG9yKHgsIHkpKTtcbiAgICAgICAgICAgICAgICBjcnVtcGxlZE1hcC5zZXRUZXhDb29yZHModHJpYW5nbGVzLCBjcmVhdGVDaXRpZXMoY2l0aWVzLCB0cmlhbmdsZXMpKTsgLy8gNjAwbXNcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJhZnRlcmZha2V0cmlhbmdcIik7XG4gICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgfSk7ICAgICAgIFxuICAgIH0pO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImh0dHAyXCIpO1xufVxuXG5sb2FkTWFwcGluZ3MoKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWluLWV4cG9zZWQudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=