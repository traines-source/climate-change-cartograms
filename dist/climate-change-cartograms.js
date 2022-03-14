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
    weightedTriangle(triangle, s, t) {
        return triangle[0].times((1 - t) * (1 - s)).add(triangle[1].times(t * (1 - s))).add(triangle[2].times(s));
    }
    dependentsUpdateFrom(newState) {
        for (const dependent of this.dependents) {
            dependent.from = this.weightedTriangle(newState[dependent.triangleIndex], dependent.s, dependent.t);
            console.log(dependent.triangleIndex, newState[dependent.triangleIndex], dependent.from);
        }
    }
    dependentsUpdateTo(newState) {
        for (const dependent of this.dependents) {
            dependent.to = this.weightedTriangle(newState[dependent.triangleIndex], dependent.s, dependent.t);
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
        return new Vector_1.Vector(v.x * scale, v.y * scale * 2);
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
        dependents.push({
            callback: (gridPos) => {
                c.style.left = gridPos.x / GRID_DIMEN.x * 100 + '%';
                c.style.top = gridPos.y / GRID_DIMEN.y * 100 + '%';
            },
            triangleIndex: index,
            s: 0.5,
            t: 0.5
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDNUU7S0FDSjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUM7QUFFRCxTQUFTLFFBQVEsQ0FBQyxJQUFZO0lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTztJQUNsRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztJQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMzQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUUzQyxNQUFNLE9BQU8sR0FBZSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUM1RSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMzQyxNQUFNLE9BQU8sR0FBYSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsZUFBTSxDQUFD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Q0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVE7Z0JBQzlFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDdEQsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ1YsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFFRCxZQUFZLEVBQUUsQ0FBQzs7Ozs7OztVQzFPZjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7VUVQRDtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvLi9zcmMvQW5pbWF0b3IudHM/MGNiOCIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zLy4vc3JjL0NydW1wbGVkSW1hZ2UudHM/MTJhMyIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zLy4vc3JjL1ZlY3Rvci50cz81MWQ5Iiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvLi9zcmMvbWFpbi1leHBvc2VkLnRzIiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvLi9ub2RlX21vZHVsZXMvZXhwb3NlLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0R2xvYmFsVGhpcy5qcyIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zLy4vc3JjL0FuaW1hdG9yLnRzIiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvLi9zcmMvQ3J1bXBsZWRJbWFnZS50cyIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zLy4vc3JjL1ZlY3Rvci50cyIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCItIS4uL25vZGVfbW9kdWxlcy90cy1sb2FkZXIvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbMF0udXNlWzFdIS4vQW5pbWF0b3IudHNcIik7XG52YXIgX19fRVhQT1NFX0xPQURFUl9HRVRfR0xPQkFMX1RISVNfX18gPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2V4cG9zZS1sb2FkZXIvZGlzdC9ydW50aW1lL2dldEdsb2JhbFRoaXMuanNcIik7XG52YXIgX19fRVhQT1NFX0xPQURFUl9HTE9CQUxfVEhJU19fXyA9IF9fX0VYUE9TRV9MT0FERVJfR0VUX0dMT0JBTF9USElTX19fO1xuX19fRVhQT1NFX0xPQURFUl9HTE9CQUxfVEhJU19fX1tcIkNDQ1wiXSA9IF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fO1xubW9kdWxlLmV4cG9ydHMgPSBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXztcbiIsInZhciBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCItIS4uL25vZGVfbW9kdWxlcy90cy1sb2FkZXIvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbMF0udXNlWzFdIS4vQ3J1bXBsZWRJbWFnZS50c1wiKTtcbnZhciBfX19FWFBPU0VfTE9BREVSX0dFVF9HTE9CQUxfVEhJU19fXyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvZXhwb3NlLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0R2xvYmFsVGhpcy5qc1wiKTtcbnZhciBfX19FWFBPU0VfTE9BREVSX0dMT0JBTF9USElTX19fID0gX19fRVhQT1NFX0xPQURFUl9HRVRfR0xPQkFMX1RISVNfX187XG5fX19FWFBPU0VfTE9BREVSX0dMT0JBTF9USElTX19fW1wiQ0NDXCJdID0gX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX187XG5tb2R1bGUuZXhwb3J0cyA9IF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fO1xuIiwidmFyIF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fID0gcmVxdWlyZShcIi0hLi4vbm9kZV9tb2R1bGVzL3RzLWxvYWRlci9pbmRleC5qcz8/cnVsZVNldFsxXS5ydWxlc1swXS51c2VbMV0hLi9WZWN0b3IudHNcIik7XG52YXIgX19fRVhQT1NFX0xPQURFUl9HRVRfR0xPQkFMX1RISVNfX18gPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2V4cG9zZS1sb2FkZXIvZGlzdC9ydW50aW1lL2dldEdsb2JhbFRoaXMuanNcIik7XG52YXIgX19fRVhQT1NFX0xPQURFUl9HTE9CQUxfVEhJU19fXyA9IF9fX0VYUE9TRV9MT0FERVJfR0VUX0dMT0JBTF9USElTX19fO1xuX19fRVhQT1NFX0xPQURFUl9HTE9CQUxfVEhJU19fX1tcIkNDQ1wiXSA9IF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fO1xubW9kdWxlLmV4cG9ydHMgPSBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXztcbiIsInZhciBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCItIS4uL25vZGVfbW9kdWxlcy90cy1sb2FkZXIvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbMF0udXNlWzFdIS4vbWFpbi50c1wiKTtcbnZhciBfX19FWFBPU0VfTE9BREVSX0dFVF9HTE9CQUxfVEhJU19fXyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvZXhwb3NlLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0R2xvYmFsVGhpcy5qc1wiKTtcbnZhciBfX19FWFBPU0VfTE9BREVSX0dMT0JBTF9USElTX19fID0gX19fRVhQT1NFX0xPQURFUl9HRVRfR0xPQkFMX1RISVNfX187XG5fX19FWFBPU0VfTE9BREVSX0dMT0JBTF9USElTX19fW1wiQ0NDXCJdID0gX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX187XG5tb2R1bGUuZXhwb3J0cyA9IF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSBcIm9iamVjdFwiKSB7XG4gICAgcmV0dXJuIGdsb2JhbFRoaXM7XG4gIH1cblxuICB2YXIgZztcblxuICB0cnkge1xuICAgIC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICAgIGcgPSB0aGlzIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSB7XG4gICAgICByZXR1cm4gd2luZG93O1xuICAgIH0gLy8gVGhpcyB3b3JrcyBpZiB0aGUgc2VsZiByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cblxuICAgIGlmICh0eXBlb2Ygc2VsZiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSAvLyBUaGlzIHdvcmtzIGlmIHRoZSBnbG9iYWwgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXG5cbiAgICBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgcmV0dXJuIGdsb2JhbDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZztcbn0oKTsiLCJleHBvcnQgY2xhc3MgQW5pbWF0b3Ige1xuXG4gICAgc3RhdGljIEVBU0VfTk9ORTogKHg6IG51bWJlcikgPT4gbnVtYmVyID0geCA9PiB4O1xuICAgIHN0YXRpYyBFQVNFX0NVQklDOiAoeDogbnVtYmVyKSA9PiBudW1iZXIgPSB4ID0+IHggPCAwLjUgPyA0ICogeCAqIHggKiB4IDogMSAtIE1hdGgucG93KC0yICogeCArIDIsIDMpIC8gMjtcbiAgICBzdGF0aWMgRUFTRV9TSU5FOiAoeDogbnVtYmVyKSA9PiBudW1iZXIgPSB4ID0+IC0oTWF0aC5jb3MoTWF0aC5QSSAqIHgpIC0gMSkgLyAyO1xuICAgIFxuICAgIHByaXZhdGUgX2Zyb206IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfdG86IG51bWJlciA9IDE7XG4gICAgcHJpdmF0ZSBfdGltZVBhc3NlZDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9lYXNlOiAoeDogbnVtYmVyKSA9PiBudW1iZXIgPSBBbmltYXRvci5FQVNFX05PTkU7XG5cbiAgICBwcml2YXRlIGNhbGxiYWNrOiAoeDogbnVtYmVyLCBpc0xhc3Q6IGJvb2xlYW4pID0+IGJvb2xlYW4gPSB4ID0+IHRydWU7XG4gICAgcHJpdmF0ZSBzdGFydFRpbWU6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBkdXJhdGlvbk1pbGxpc2Vjb25kczogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIHB1YmxpYyBmcm9tKGZyb206IG51bWJlcik6IEFuaW1hdG9yIHtcbiAgICAgICAgdGhpcy5fZnJvbSA9IGZyb207XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyB0byh0bzogbnVtYmVyKTogQW5pbWF0b3Ige1xuICAgICAgICB0aGlzLl90byA9IHRvO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgdGltZVBhc3NlZCh0aW1lUGFzc2VkOiBudW1iZXIpOiBBbmltYXRvciB7XG4gICAgICAgIHRoaXMuX3RpbWVQYXNzZWQgPSB0aW1lUGFzc2VkO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZWFzZShlYXNlOiAoeDogbnVtYmVyKSA9PiBudW1iZXIpOiBBbmltYXRvciB7XG4gICAgICAgIHRoaXMuX2Vhc2UgPSBlYXNlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgd2FpdChkZWxheU1pbGxpc2Vjb25kczogbnVtYmVyLCBjYWxsYmFjazogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICBpZiAoZGVsYXlNaWxsaXNlY29uZHMgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWVvdXQoY2FsbGJhY2ssIGRlbGF5TWlsbGlzZWNvbmRzKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjaygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhbmltYXRlKGR1cmF0aW9uTWlsbGlzZWNvbmRzOiBudW1iZXIsIGNhbGxiYWNrOiAoeDogbnVtYmVyLCBpc0xhc3Q6IGJvb2xlYW4pID0+IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kdXJhdGlvbk1pbGxpc2Vjb25kcyA9IGR1cmF0aW9uTWlsbGlzZWNvbmRzO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gdGhpcy5ub3coKTtcbiAgICAgICAgdGhpcy5mcmFtZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZnJhbWUoKSB7XG4gICAgICAgIGNvbnN0IG5vdyA9IHRoaXMubm93KCk7XG4gICAgICAgIGxldCB4ID0gMTtcbiAgICAgICAgaWYgKHRoaXMuZHVyYXRpb25NaWxsaXNlY29uZHMgPiAwKSB7XG4gICAgICAgICAgICB4ID0gKG5vdy10aGlzLnN0YXJ0VGltZSt0aGlzLl90aW1lUGFzc2VkKSAvIHRoaXMuZHVyYXRpb25NaWxsaXNlY29uZHM7XG4gICAgICAgIH1cbiAgICAgICAgeCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHgpKTtcbiAgICAgICAgY29uc3QgeSA9IHRoaXMuX2Zyb20gKyAodGhpcy5fdG8tdGhpcy5fZnJvbSkgKiB0aGlzLl9lYXNlKHgpO1xuICAgICAgICBjb25zdCBjb250ID0gdGhpcy5jYWxsYmFjayh5LCB4ID09IDEpO1xuICAgICAgICBpZiAoY29udCAmJiB4IDwgMSkge1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0RnJhbWUoKCkgPT4gdGhpcy5mcmFtZSgpKTtcbiAgICAgICAgfSBlbHNlIGlmICghY29udCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1N0b3BwZWQgYW5pbWF0aW9uIGJlY2F1c2UgY2FsbGJhY2sgcmV0dXJuZWQgZmFsc2UuJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG5vdygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0aW1lb3V0KGNhbGxiYWNrOiAoKSA9PiB2b2lkLCBkZWxheU1pbGxpc2Vjb25kczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCBkZWxheU1pbGxpc2Vjb25kcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXF1ZXN0RnJhbWUoY2FsbGJhY2s6ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShjYWxsYmFjayk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQW5pbWF0b3IgfSBmcm9tIFwiLi9BbmltYXRvclwiO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4vVmVjdG9yXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGVwZW5kZW50IHtcbiAgICB0cmlhbmdsZUluZGV4OiBudW1iZXI7XG4gICAgczogbnVtYmVyO1xuICAgIHQ6IG51bWJlcjtcbiAgICBmcm9tPzogVmVjdG9yO1xuICAgIHRvPzogVmVjdG9yO1xuICAgIGNhbGxiYWNrOiAoZ3JpZFBvczogVmVjdG9yKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgQ3J1bXBsZWRJbWFnZSB7XG4gICAgcHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHByaXZhdGUgY2FudmFzRGltZW46IFZlY3RvciA9IFZlY3Rvci5OVUxMO1xuICAgIHByaXZhdGUgY2FudmFzVGw6IFZlY3RvciA9IFZlY3Rvci5OVUxMO1xuICAgIHByaXZhdGUgaW1nRGltZW46IFZlY3RvciA9IFZlY3Rvci5OVUxMO1xuICAgIHByaXZhdGUgdmVydGV4Q291bnQgPSAwO1xuICAgIHByaXZhdGUgcHJvZ3JhbUluZm86IGFueTtcbiAgICBwcml2YXRlIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XG4gICAgcHJpdmF0ZSBub25jZSA9IDA7XG4gICAgcHJpdmF0ZSBkZXBlbmRlbnRzOiBEZXBlbmRlbnRbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBncmlkRGltZW46IFZlY3RvciwgcHJpdmF0ZSBhbmltYXRpb25EdXJhdGlvbk1zOiBudW1iZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiY3J1MVwiKTtcbiAgICAgICAgdGhpcy5jYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpO1xuICAgICAgICB0aGlzLnJlc2l6ZUNhbnZhcygpO1xuICAgICAgICB0aGlzLmdsID0gPFdlYkdMUmVuZGVyaW5nQ29udGV4dD50aGlzLmNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbCcpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4gdGhpcy5yZXNpemVDYW52YXMoKSwgZmFsc2UpO1xuICAgICAgICB0aGlzLmdsU2V0dXAoKTtcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiY3J1MlwiKTtcbiAgICAgICAgdGhpcy5zZXRUZXh0dXJlKCk7ICAgICAgICAgICAgICAgICAgICAgXG4gICAgfVxuXG4gICAgc2V0VGV4Q29vcmRzKHNyY1RyaWFuZ2xlczogW1ZlY3RvciwgVmVjdG9yLCBWZWN0b3JdW10sIGRlcGVuZGVudHM6IERlcGVuZGVudFtdKSB7XG4gICAgICAgIHRoaXMuZGVwZW5kZW50cyA9IGRlcGVuZGVudHM7XG4gICAgICAgIHRoaXMuZGVwZW5kZW50c1VwZGF0ZUZyb20oc3JjVHJpYW5nbGVzKTtcbiAgICAgICAgY29uc3QgY3VycmVudFN0YXRlID0gdGhpcy5tYXRyaXhDb252ZXJ0Q29vcmRzKHNyY1RyaWFuZ2xlcyk7XG4gICAgICAgIHRoaXMudmVydGV4Q291bnQgPSBjdXJyZW50U3RhdGUubGVuZ3RoIC8gMjtcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYmVmc3JjXCIpO1xuICAgICAgICBjb25zdCB0ZXhDb29yZHMgPSB0aGlzLm1hdHJpeENvbnZlcnRDb29yZHMoc3JjVHJpYW5nbGVzLCB2ID0+IHRoaXMuZ3JpZDJJbWdDb29yZHModikpOyAvLyAxMDBtc1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZzZXRpcFwiKTtcbiAgICAgICAgdGhpcy5nbFVwZGF0ZUZyb20oY3VycmVudFN0YXRlKTtcbiAgICAgICAgdGhpcy5nbFRleENvb3Jkcyh0ZXhDb29yZHMpO1xuICAgICAgIFxuICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJhZnRlcnNldHVwXCIpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCB0aGlzLmNhbnZhc0RpbWVuKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNpemVDYW52YXMoKSB7XG4gICAgICAgIGNvbnN0IHIgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdGhpcy5jYW52YXNEaW1lbiA9IG5ldyBWZWN0b3Ioci53aWR0aCwgci5oZWlnaHQpO1xuICAgICAgICB0aGlzLmNhbnZhc1RsID0gbmV3IFZlY3RvcihyLnRvcCwgci5sZWZ0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFByZWZlcnJlZEltZ1Jlc29sdXRpb24oKSB7XG4gICAgICAgIGNvbnN0IGF2YWlsYWJsZSA9IFsxMDI0LCAyMDQ4LCA0MDk2LCA4MTkyXTtcbiAgICAgICAgY29uc3QgbWF4ID0gdGhpcy5nbC5nZXRQYXJhbWV0ZXIodGhpcy5nbC5NQVhfVEVYVFVSRV9TSVpFKS8yO1xuICAgICAgICBsZXQgZm91bmQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGF2YWlsYWJsZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGF2YWlsYWJsZVtpXSA8PSBtYXgpIHtcbiAgICAgICAgICAgICAgICBmb3VuZCA9IGF2YWlsYWJsZVtpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZm91bmQgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIk5vIHRleHR1cmUgc2l6ZSBmb3VuZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIlRleHR1cmUgc2l6ZTpcIiwgZm91bmQpO1xuICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRUZXh0dXJlKCkge1xuICAgICAgICBjb25zdCBpbSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbS5vbmxvYWQgPSAoKSA9PiB7ICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuaW1nRGltZW4gPSBuZXcgVmVjdG9yKGltLndpZHRoLCBpbS5oZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5nbFRleHR1cmUoaW0pO1xuICAgICAgICB9XG4gICAgICAgIGltLnNyYyA9IFwicmVzL21hcF9cIit0aGlzLmdldFByZWZlcnJlZEltZ1Jlc29sdXRpb24oKStcInguanBnXCI7ICBcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiY3J1M1wiKTsgXG4gICAgfVxuXG4gICAgdXBkYXRlKG5ld1N0YXRlOiBbVmVjdG9yLCBWZWN0b3IsIFZlY3Rvcl1bXSwgYW5pbWF0ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJyZWNlaXZlZCB1cGRhdGVcIik7XG4gICAgICAgIGNvbnN0IG5ld1N0YXRlQ2FudmFzID0gdGhpcy5tYXRyaXhDb252ZXJ0Q29vcmRzKG5ld1N0YXRlKTsgLy8yMDBtc1xuICAgICAgICB0aGlzLm1hcFRyaWFuZ2xlcyhuZXdTdGF0ZUNhbnZhcyk7XG4gICAgICAgIHRoaXMuZGVwZW5kZW50c1VwZGF0ZVRvKG5ld1N0YXRlKTtcblxuICAgICAgICB0aGlzLm5vbmNlKys7XG4gICAgICAgIGlmICghYW5pbWF0ZSkge1xuICAgICAgICAgICAgdGhpcy5nbEludGVycG9sYXRlKDApO1xuICAgICAgICAgICAgdGhpcy5kZXBlbmRlbnRzSW50ZXJwb2xhdGUoMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYW5pbWF0b3IgPSBuZXcgQW5pbWF0b3IoKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG5vbmNlID0gdGhpcy5ub25jZTtcbiAgICAgICAgYW5pbWF0b3IuYW5pbWF0ZSh0aGlzLmFuaW1hdGlvbkR1cmF0aW9uTXMsICh4LCBpc0xhc3QpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm5vbmNlICE9IG5vbmNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwic3RhcnRlZCB1cGRhdGVcIik7XG4gICAgICAgICAgICB0aGlzLmdsSW50ZXJwb2xhdGUoeCk7XG4gICAgICAgICAgICB0aGlzLmRlcGVuZGVudHNJbnRlcnBvbGF0ZSh4KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGlzTGFzdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2xVcGRhdGVGcm9tKG5ld1N0YXRlQ2FudmFzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlcGVuZGVudHNVcGRhdGVGcm9tKG5ld1N0YXRlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJhcHBsaWVkIHVwZGF0ZVwiLCBwZXJmb3JtYW5jZS5ub3coKS1zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTsgICAgICAgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSB3ZWlnaHRlZFRyaWFuZ2xlKHRyaWFuZ2xlOiBbVmVjdG9yLCBWZWN0b3IsIFZlY3Rvcl0sIHM6IG51bWJlciwgdDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0cmlhbmdsZVswXS50aW1lcygoMS10KSooMS1zKSkuYWRkKHRyaWFuZ2xlWzFdLnRpbWVzKHQqKDEtcykpKS5hZGQodHJpYW5nbGVbMl0udGltZXMocykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVwZW5kZW50c1VwZGF0ZUZyb20obmV3U3RhdGU6IFtWZWN0b3IsIFZlY3RvciwgVmVjdG9yXVtdKSB7XG4gICAgICAgIGZvciAoY29uc3QgZGVwZW5kZW50IG9mIHRoaXMuZGVwZW5kZW50cykge1xuICAgICAgICAgICAgZGVwZW5kZW50LmZyb20gPSB0aGlzLndlaWdodGVkVHJpYW5nbGUobmV3U3RhdGVbZGVwZW5kZW50LnRyaWFuZ2xlSW5kZXhdLCBkZXBlbmRlbnQucywgZGVwZW5kZW50LnQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGVwZW5kZW50LnRyaWFuZ2xlSW5kZXgsIG5ld1N0YXRlW2RlcGVuZGVudC50cmlhbmdsZUluZGV4XSwgZGVwZW5kZW50LmZyb20pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZXBlbmRlbnRzVXBkYXRlVG8obmV3U3RhdGU6IFtWZWN0b3IsIFZlY3RvciwgVmVjdG9yXVtdKSB7XG4gICAgICAgIGZvciAoY29uc3QgZGVwZW5kZW50IG9mIHRoaXMuZGVwZW5kZW50cykge1xuICAgICAgICAgICAgZGVwZW5kZW50LnRvID0gdGhpcy53ZWlnaHRlZFRyaWFuZ2xlKG5ld1N0YXRlW2RlcGVuZGVudC50cmlhbmdsZUluZGV4XSwgZGVwZW5kZW50LnMsIGRlcGVuZGVudC50KTtcbiAgICAgICAgfVxuICAgIH0gICAgXG5cbiAgICBwcml2YXRlIGRlcGVuZGVudHNJbnRlcnBvbGF0ZSh4OiBudW1iZXIpIHtcbiAgICAgICAgZm9yIChjb25zdCBkZXBlbmRlbnQgb2YgdGhpcy5kZXBlbmRlbnRzKSB7XG4gICAgICAgICAgICBpZiAoZGVwZW5kZW50LmZyb20gJiYgZGVwZW5kZW50LnRvKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3JpZFBvaW50ID0gZGVwZW5kZW50LmZyb20uYmV0d2VlbihkZXBlbmRlbnQudG8sIHgpO1xuICAgICAgICAgICAgICAgIGRlcGVuZGVudC5jYWxsYmFjayhncmlkUG9pbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYXBUcmlhbmdsZXMobmV3U3RhdGU6IG51bWJlcltdKSB7XG4gICAgICAgIGlmIChuZXdTdGF0ZS5sZW5ndGgvMiAhPSB0aGlzLnZlcnRleENvdW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJuZXdTdGF0ZSBoYXMgZGlmZmVyZW50IGxlbmd0aCAoXCIrbmV3U3RhdGUubGVuZ3RoLzIrXCIpIHRoYW4gY3VycmVudFN0YXRlIChcIit0aGlzLnZlcnRleENvdW50K1wiKVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZkc3RcIik7XG4gICAgICAgIFxuICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZnVwZFwiKTtcbiAgICAgICAgdGhpcy5nbFVwZGF0ZVRvKG5ld1N0YXRlKTtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBncmlkMkltZ0Nvb3Jkcyh2OiBWZWN0b3IpIHtcbiAgICAgICAgY29uc3Qgc2NhbGUgPSAxIC8gdGhpcy5ncmlkRGltZW4ueDtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3Iodi54KnNjYWxlLCB2Lnkqc2NhbGUqMik7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgZ3JpZDJDYW52YXNDb29yZHModjogVmVjdG9yKSB7XG4gICAgICAgIGNvbnN0IHNjYWxlID0gMiAvIHRoaXMuZ3JpZERpbWVuLng7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHYueCpzY2FsZS0xLCB2LnkqLTIvdGhpcy5ncmlkRGltZW4ueSsxKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1hdHJpeENvbnZlcnRDb29yZHMobWF0cml4OiBbVmVjdG9yLCBWZWN0b3IsIFZlY3Rvcl1bXSwgbWFwcGluZzogKHY6IFZlY3RvcikgPT4gVmVjdG9yID0gKHYpID0+IHRoaXMuZ3JpZDJDYW52YXNDb29yZHModikpIHtcbiAgICAgICAgY29uc3QgY29vcmRzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpPTA7aTxtYXRyaXgubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgY29uc3QgZHN0ID0gbWF0cml4W2ldLm1hcCgoYzogVmVjdG9yKSA9PiBtYXBwaW5nKGMpKTtcbiAgICAgICAgICAgIGNvb3Jkcy5wdXNoKGRzdFswXS54LCBkc3RbMF0ueSwgZHN0WzFdLngsIGRzdFsxXS55LCBkc3RbMl0ueCwgZHN0WzJdLnkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb29yZHM7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgZ2xTZXR1cCgpIHtcbiAgICAgICAgY29uc3QgZnNTb3VyY2UgPSBgXG4gICAgICAgICAgICB2YXJ5aW5nIGhpZ2hwIHZlYzIgdlRleHR1cmVDb29yZDtcblxuICAgICAgICAgICAgdW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7XG5cbiAgICAgICAgICAgIHZvaWQgbWFpbih2b2lkKSB7XG4gICAgICAgICAgICBnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlMkQodVNhbXBsZXIsIHZUZXh0dXJlQ29vcmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICBgO1xuXG4gICAgICAgIGNvbnN0IHZzU291cmNlID0gYFxuICAgICAgICAgICAgYXR0cmlidXRlIHZlYzQgYVZlcnRleFBvc2l0aW9uRnJvbTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWM0IGFWZXJ0ZXhQb3NpdGlvblRvO1xuICAgICAgICAgICAgYXR0cmlidXRlIHZlYzIgYVRleHR1cmVDb29yZDtcbiAgICAgICAgICAgIHVuaWZvcm0gZmxvYXQgdUFuaW1hdGlvblg7IFxuXG4gICAgICAgICAgICB2YXJ5aW5nIGhpZ2hwIHZlYzIgdlRleHR1cmVDb29yZDtcblxuICAgICAgICAgICAgdm9pZCBtYWluKHZvaWQpIHtcbiAgICAgICAgICAgIGdsX1Bvc2l0aW9uID0gYVZlcnRleFBvc2l0aW9uRnJvbSooMS4wLXVBbmltYXRpb25YKSthVmVydGV4UG9zaXRpb25Ubyp1QW5pbWF0aW9uWDtcbiAgICAgICAgICAgIHZUZXh0dXJlQ29vcmQgPSBhVGV4dHVyZUNvb3JkO1xuICAgICAgICAgICAgfVxuICAgICAgICBgO1xuXG4gICAgICAgIGNvbnN0IHNoYWRlclByb2dyYW0gPSB0aGlzLmluaXRTaGFkZXJQcm9ncmFtKHZzU291cmNlLCBmc1NvdXJjZSk7XG4gICAgICAgIGlmICghc2hhZGVyUHJvZ3JhbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvZ3JhbUluZm8gPSB7XG4gICAgICAgICAgICBwcm9ncmFtOiBzaGFkZXJQcm9ncmFtLFxuICAgICAgICAgICAgYXR0cmliTG9jYXRpb25zOiB7XG4gICAgICAgICAgICAgIHZlcnRleFBvc2l0aW9uRnJvbTogdGhpcy5nbC5nZXRBdHRyaWJMb2NhdGlvbihzaGFkZXJQcm9ncmFtLCAnYVZlcnRleFBvc2l0aW9uRnJvbScpLFxuICAgICAgICAgICAgICB2ZXJ0ZXhQb3NpdGlvblRvOiB0aGlzLmdsLmdldEF0dHJpYkxvY2F0aW9uKHNoYWRlclByb2dyYW0sICdhVmVydGV4UG9zaXRpb25UbycpLFxuICAgICAgICAgICAgICB0ZXh0dXJlQ29vcmQ6IHRoaXMuZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ2FUZXh0dXJlQ29vcmQnKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1bmlmb3JtTG9jYXRpb25zOiB7XG4gICAgICAgICAgICAgIGFuaW1hdGlvblg6IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlclByb2dyYW0sICd1QW5pbWF0aW9uWCcpLFxuICAgICAgICAgICAgICB1U2FtcGxlcjogdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ3VTYW1wbGVyJyksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnVmZmVyczoge1xuICAgICAgICAgICAgICAgIHZlcnRleEJ1ZmZlckZyb206IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCksXG4gICAgICAgICAgICAgICAgdmVydGV4QnVmZmVyVG86IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsb2FkZWQ6IHtcbiAgICAgICAgICAgICAgICB0ZXh0dXJlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0ZXhDb29yZDogZmFsc2UsIFxuICAgICAgICAgICAgICAgIGRzdENvb3JkOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdsLnVzZVByb2dyYW0odGhpcy5wcm9ncmFtSW5mby5wcm9ncmFtKTtcblxuICAgICAgICB0aGlzLmdsLnZpZXdwb3J0KDAsIDAsIHRoaXMuZ2wuY2FudmFzLndpZHRoLCB0aGlzLmdsLmNhbnZhcy5oZWlnaHQpO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZ2wudW5pZm9ybTFpKHRoaXMucHJvZ3JhbUluZm8udW5pZm9ybUxvY2F0aW9ucy51U2FtcGxlciwgMCk7XG4gICAgICAgIHRoaXMuZ2wudW5pZm9ybTFmKHRoaXMucHJvZ3JhbUluZm8udW5pZm9ybUxvY2F0aW9ucy5hbmltYXRpb25YLCAwLjApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2xUZXhDb29yZHModGV4Q29vcmRzOiBudW1iZXJbXSkge1xuICAgICAgICBjb25zdCB0ZXhDb29yZEJ1ZmZlciA9IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgdGV4Q29vcmRCdWZmZXIpO1xuICAgICAgICB0aGlzLmdsLmJ1ZmZlckRhdGEodGhpcy5nbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodGV4Q29vcmRzKSwgdGhpcy5nbC5TVEFUSUNfRFJBVyk7XG4gICAgICAgIHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlciggdGhpcy5wcm9ncmFtSW5mby5hdHRyaWJMb2NhdGlvbnMudGV4dHVyZUNvb3JkLCAyLCB0aGlzLmdsLkZMT0FULCBmYWxzZSwgMCwgMCApO1xuICAgICAgICB0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KCB0aGlzLnByb2dyYW1JbmZvLmF0dHJpYkxvY2F0aW9ucy50ZXh0dXJlQ29vcmQgKTtcblxuICAgICAgICB0aGlzLnByb2dyYW1JbmZvLmxvYWRlZC50ZXhDb29yZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZ2xEZWZlcnJlZERyYXcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdsVGV4dHVyZShpbTogSFRNTEltYWdlRWxlbWVudCkge1xuICAgICAgICBjb25zdCB0ZXhOYW1lID0gdGhpcy5nbC5jcmVhdGVUZXh0dXJlKCk7XG4gICAgICAgIHRoaXMuZ2wuYWN0aXZlVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkUwKTtcbiAgICAgICAgdGhpcy5nbC5iaW5kVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRleE5hbWUpO1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgdGhpcy5nbC5nZXRQYXJhbWV0ZXIodGhpcy5nbC5NQVhfVEVYVFVSRV9TSVpFKSwgaW0ud2lkdGgsIGltLmhlaWdodCwgdGhpcy5nbC5jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5nbC50ZXhJbWFnZTJEKHRoaXMuZ2wuVEVYVFVSRV8yRCwgMCwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlJHQkEsIHRoaXMuZ2wuVU5TSUdORURfQllURSwgaW0pO1xuICAgICAgICB0aGlzLmdsLmdlbmVyYXRlTWlwbWFwKHRoaXMuZ2wuVEVYVFVSRV8yRCk7XG4gICAgICAgXG4gICAgICAgIHRoaXMucHJvZ3JhbUluZm8ubG9hZGVkLnRleHR1cmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmdsRGVmZXJyZWREcmF3KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnbFVwZGF0ZUZyb20oZnJvbUNvb3JkczogbnVtYmVyW10pIHtcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYmVmYnVmZmVyXCIpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZmJpbmRcIik7XG5cbiAgICAgICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnByb2dyYW1JbmZvLmJ1ZmZlcnMudmVydGV4QnVmZmVyRnJvbSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZmRhdGFcIik7XG4gICAgICAgIHRoaXMuZ2wuYnVmZmVyRGF0YSh0aGlzLmdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShmcm9tQ29vcmRzKSwgdGhpcy5nbC5TVEFUSUNfRFJBVyk7ICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYmVmYXR0cmliXCIpO1xuXG4gICAgICAgIHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlciggdGhpcy5wcm9ncmFtSW5mby5hdHRyaWJMb2NhdGlvbnMudmVydGV4UG9zaXRpb25Gcm9tLCAyLCB0aGlzLmdsLkZMT0FULCBmYWxzZSwgMCwgMCApO1xuICAgICAgICB0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KCB0aGlzLnByb2dyYW1JbmZvLmF0dHJpYkxvY2F0aW9ucy52ZXJ0ZXhQb3NpdGlvbkZyb20gKTtcblxuICAgICAgICAvL3RoaXMuZ2wuY2xlYXJDb2xvcigwLjAsIDAuMCwgMC4wLCAxLjApO1xuICAgICAgICAvL3RoaXMuZ2wuY2xlYXIodGhpcy5nbC5DT0xPUl9CVUZGRVJfQklUKTsgICAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZmRyYXdcIik7XG5cbiAgICAgICAgdGhpcy5wcm9ncmFtSW5mby5sb2FkZWQuZHN0Q29vcmQgPSB0cnVlO1xuICAgICAgICAvL3RoaXMuZ2wuZHJhd0FycmF5cyh0aGlzLmdsLlRSSUFOR0xFUywgMCwgZnJvbUNvb3Jkcy5sZW5ndGggLyAyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdsVXBkYXRlVG8odG9Db29yZHM6IG51bWJlcltdKSB7XG4gICAgICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy5wcm9ncmFtSW5mby5idWZmZXJzLnZlcnRleEJ1ZmZlclRvKTtcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYmVmZGF0YVwiKTtcbiAgICAgICAgdGhpcy5nbC5idWZmZXJEYXRhKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHRvQ29vcmRzKSwgdGhpcy5nbC5TVEFUSUNfRFJBVyk7ICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYmVmYXR0cmliXCIpO1xuXG4gICAgICAgIHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlciggdGhpcy5wcm9ncmFtSW5mby5hdHRyaWJMb2NhdGlvbnMudmVydGV4UG9zaXRpb25UbywgMiwgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDAgKTtcbiAgICAgICAgdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSggdGhpcy5wcm9ncmFtSW5mby5hdHRyaWJMb2NhdGlvbnMudmVydGV4UG9zaXRpb25UbyApO1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZjbGVhclwiKTtcbiAgICAgIFxuXG4gICAgICAgIC8vdGhpcy5nbC5jbGVhckNvbG9yKDAuMCwgMC4wLCAwLjAsIDEuMCk7XG4gICAgICAgIC8vdGhpcy5nbC5jbGVhcih0aGlzLmdsLkNPTE9SX0JVRkZFUl9CSVQpOyAgICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYmVmZHJhd1wiKTtcblxuICAgICAgICAvL3RoaXMuZ2wuZHJhd0FycmF5cyh0aGlzLmdsLlRSSUFOR0xFUywgMCwgZnJvbUNvb3Jkcy5sZW5ndGggLyAyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdsSW50ZXJwb2xhdGUoeDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZ2wudW5pZm9ybTFmKHRoaXMucHJvZ3JhbUluZm8udW5pZm9ybUxvY2F0aW9ucy5hbmltYXRpb25YLCB4KTtcbiAgICAgICAgdGhpcy5nbERlZmVycmVkRHJhdygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2xEZWZlcnJlZERyYXcoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb2dyYW1JbmZvLmxvYWRlZC50ZXh0dXJlICYmIHRoaXMucHJvZ3JhbUluZm8ubG9hZGVkLnRleENvb3JkICYmIHRoaXMucHJvZ3JhbUluZm8ubG9hZGVkLmRzdENvb3JkKSB7XG4gICAgICAgICAgICB0aGlzLmdsLmRyYXdBcnJheXModGhpcy5nbC5UUklBTkdMRVMsIDAsIHRoaXMudmVydGV4Q291bnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0U2hhZGVyUHJvZ3JhbSh2c1NvdXJjZTogc3RyaW5nLCBmc1NvdXJjZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHZlcnRleFNoYWRlciA9IHRoaXMubG9hZFNoYWRlcih0aGlzLmdsLlZFUlRFWF9TSEFERVIsIHZzU291cmNlKTtcbiAgICAgICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSB0aGlzLmxvYWRTaGFkZXIodGhpcy5nbC5GUkFHTUVOVF9TSEFERVIsIGZzU291cmNlKTtcbiAgICBcbiAgICAgICAgY29uc3Qgc2hhZGVyUHJvZ3JhbSA9IHRoaXMuZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICAgICAgICBpZiAoIXNoYWRlclByb2dyYW0gfHwgIXZlcnRleFNoYWRlciB8fCAhZnJhZ21lbnRTaGFkZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdsLmF0dGFjaFNoYWRlcihzaGFkZXJQcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xuICAgICAgICB0aGlzLmdsLmF0dGFjaFNoYWRlcihzaGFkZXJQcm9ncmFtLCBmcmFnbWVudFNoYWRlcik7XG4gICAgICAgIHRoaXMuZ2wubGlua1Byb2dyYW0oc2hhZGVyUHJvZ3JhbSk7XG4gICAgXG4gICAgICAgIGlmICghdGhpcy5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHNoYWRlclByb2dyYW0sIHRoaXMuZ2wuTElOS19TVEFUVVMpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzaGFkZXJzIHByb2dyYW0gZmFpbGVkXCIpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHJldHVybiBzaGFkZXJQcm9ncmFtO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZFNoYWRlcih0eXBlOiBudW1iZXIsIHNvdXJjZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHNoYWRlciA9IHRoaXMuZ2wuY3JlYXRlU2hhZGVyKHR5cGUpO1xuICAgICAgICBpZiAoIXNoYWRlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9ICAgIFxuICAgICAgICB0aGlzLmdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHNvdXJjZSk7XG4gICAgICAgIHRoaXMuZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpOyAgICBcbiAgICAgICAgaWYgKCF0aGlzLmdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIHRoaXMuZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICAgICAgICB0aGlzLmdsLmRlbGV0ZVNoYWRlcihzaGFkZXIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ29tcGlsaW5nIHNoYWRlcnMgZmFpbGVkXCIpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHJldHVybiBzaGFkZXI7XG4gICAgfVxufSIsImV4cG9ydCBjbGFzcyBWZWN0b3Ige1xuICAgIHN0YXRpYyBOVUxMOiBWZWN0b3IgPSBuZXcgVmVjdG9yKDAsIDApO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHg6IG51bWJlciwgcHVibGljIHk6IG51bWJlcikge1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tQXJyYXkoYXJyOiBudW1iZXJbXSkge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcihhcnJbMF0sIGFyclsxXSk7XG4gICAgfVxuXG4gICAgZ2V0IGxlbmd0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMueCwgMikgKyBNYXRoLnBvdyh0aGlzLnksIDIpKTtcbiAgICB9XG5cbiAgICBkZWx0YSh0aGF0OiBWZWN0b3IpOiBWZWN0b3Ige1xuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGF0LnggLSB0aGlzLngsIHRoYXQueSAtIHRoaXMueSk7XG4gICAgfVxuXG4gICAgYWRkKHRoYXQ6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCArIHRoYXQueCwgdGhpcy55ICsgdGhhdC55KTtcbiAgICB9XG5cbiAgICB0aW1lcyhmOiBudW1iZXIpOiBWZWN0b3Ige1xuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLnggKiBmLCB0aGlzLnkgKiBmKTtcbiAgICB9XG5cbiAgICB3aXRoTGVuZ3RoKGxlbmd0aDogbnVtYmVyKTogVmVjdG9yIHtcbiAgICAgICAgY29uc3QgcmF0aW8gPSB0aGlzLmxlbmd0aCAhPSAwID8gbGVuZ3RoL3RoaXMubGVuZ3RoIDogMDtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54KnJhdGlvLCB0aGlzLnkqcmF0aW8pO1xuICAgIH1cblxuICAgIGJldHdlZW4ob3RoZXI6IFZlY3RvciwgeDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGRlbHRhID0gdGhpcy5kZWx0YShvdGhlcik7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZChkZWx0YS53aXRoTGVuZ3RoKGRlbHRhLmxlbmd0aCp4KSk7XG4gICAgfVxufSIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuL1ZlY3RvclwiO1xuaW1wb3J0IHsgQ3J1bXBsZWRJbWFnZSwgRGVwZW5kZW50IH0gZnJvbSBcIi4vQ3J1bXBsZWRJbWFnZVwiO1xuXG5jb25zdCBHUklEX0RJTUVOID0gbmV3IFZlY3Rvcig0MDAsIDIwMCk7XG5cbmxldCBtYXBwaW5nczogTWFwcGluZ0NvbGxlY3Rpb24gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5sZXQgaW5pdGlhbCA9IHRydWU7XG5cbmludGVyZmFjZSBMYWJlbCB7IFtpZDogc3RyaW5nXTogc3RyaW5nIH1cbmludGVyZmFjZSBNYXBwaW5nIHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGxhYmVsOiBMYWJlbDtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xufVxuaW50ZXJmYWNlIE1hcHBpbmdDb2xsZWN0aW9uIHsgXG4gICAgW2lkOiBzdHJpbmddOiB7XG4gICAgICAgIGxhYmVsOiBMYWJlbDtcbiAgICAgICAgbWFwcGluZzogTWFwcGluZ1tdO1xuICAgIH1cbn07XG5cbmNvbnN0IGNydW1wbGVkTWFwID0gbmV3IENydW1wbGVkSW1hZ2UoR1JJRF9ESU1FTiwgMjAwMCk7XG5cbmZ1bmN0aW9uIGZpbmRUcmlhbmdsZXMocmVzb2x2ZXI6ICh4OiBudW1iZXIsIHk6IG51bWJlcikgPT4gVmVjdG9yKSB7XG4gICAgY29uc3QgdHJpYW5nbGVzOiBbVmVjdG9yLCBWZWN0b3IsIFZlY3Rvcl1bXSA9IFtdXG4gICAgZm9yIChsZXQgaT0wO2k8R1JJRF9ESU1FTi55OyBpKz0xKSB7XG4gICAgICAgIGZvciAobGV0IGo9MDtqPEdSSURfRElNRU4ueDsgais9MSkge1xuICAgICAgICAgICAgdHJpYW5nbGVzLnB1c2goW3Jlc29sdmVyKGosIGkpLCByZXNvbHZlcihqKzEsIGkpLCByZXNvbHZlcihqLCBpKzEpXSk7XG4gICAgICAgICAgICB0cmlhbmdsZXMucHVzaChbcmVzb2x2ZXIoaisxLCBpKzEpLCByZXNvbHZlcihqKzEsIGkpLCByZXNvbHZlcihqLCBpKzEpXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRyaWFuZ2xlcztcbn1cblxuZnVuY3Rpb24gcmVhZEdyaWQoZ3JpZDogc3RyaW5nKSB7XG4gICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYmVmcmVhZFwiKTsgLy81MDBtc1xuICAgIGNvbnN0IHJvd3MgPSBncmlkLnNwbGl0KFwiXFxuXCIpXG4gICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYmVmcmVhZDFcIik7XG4gICAgcm93cy5wb3AoKTtcbiAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZyZWFkMlwiKTsgXG5cbiAgICBjb25zdCBudW1iZXJzOiBudW1iZXJbXVtdID0gcm93cy5tYXAocm93ID0+IHJvdy5zcGxpdChcIiBcIikubWFwKHBhcnNlRmxvYXQpKTtcbiAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZyZWFkM1wiKTsgXG4gICAgY29uc3QgdmVjdG9yczogVmVjdG9yW10gPSBudW1iZXJzLm1hcChyb3cgPT4gVmVjdG9yLmZyb21BcnJheShyb3cpKTtcbiAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZyZWFkNFwiKTsgXG5cblxuICAgIGNvbnN0IHJlc29sdmVyID0gKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IHYgPSB2ZWN0b3JzW3kqKEdSSURfRElNRU4ueCsxKSt4XTtcbiAgICAgICAgaWYgKHYgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhleVwiLCB4LCB5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih2LngsIHYueSk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZnRyaWFuZ2xlc1wiKTtcbiAgICBjb25zdCB0cmlhbmdsZXMgPSBmaW5kVHJpYW5nbGVzKHJlc29sdmVyKTsgLy82MDBtc1xuICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImhleVwiKTtcblxuICAgIGNydW1wbGVkTWFwLnVwZGF0ZSh0cmlhbmdsZXMsICFpbml0aWFsKTtcbiAgICBpbml0aWFsID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGludGVycG9sYXRlTWFwcGluZyhtYXBwaW5nczogTWFwcGluZ1tdLCB4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGxldCB1cHBlciA6IE1hcHBpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGxvd2VyIDogTWFwcGluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBmb3IgKGxldCBpPTA7IGk8bWFwcGluZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKG1hcHBpbmdzW2ldLnggPj0geCAmJiAodXBwZXIgPT0gdW5kZWZpbmVkIHx8IG1hcHBpbmdzW2ldLnggPCB1cHBlci54KSkge1xuICAgICAgICAgICAgdXBwZXIgPSBtYXBwaW5nc1tpXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWFwcGluZ3NbaV0ueCA8PSB4ICYmIChsb3dlciA9PSB1bmRlZmluZWQgfHwgbWFwcGluZ3NbaV0ueCA+IGxvd2VyLngpKSB7XG4gICAgICAgICAgICBsb3dlciA9IG1hcHBpbmdzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChsb3dlciA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHVwcGVyID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gaW50ZXJwb2xhdGlvbiBwb3NzaWJsZVwiKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cHBlci55O1xuICAgIH1cbiAgICBpZiAodXBwZXIgPT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gbG93ZXIueTtcbiAgICBpZiAodXBwZXIgPT0gbG93ZXIpXG4gICAgICAgIHJldHVybiB1cHBlci55O1xuICAgIHJldHVybiAoeC1sb3dlci54KS8odXBwZXIueC1sb3dlci54KSoodXBwZXIueS1sb3dlci55KStsb3dlci55O1xufVxuXG5mdW5jdGlvbiBnZXRCaW5hcmllcygpOiBNYXBwaW5nW10ge1xuICAgIGlmIChtYXBwaW5ncyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICByZXR1cm4gbWFwcGluZ3MueWVhci5tYXBwaW5nLmNvbmNhdChtYXBwaW5ncy5wYXJhbWV0ZXJzLm1hcHBpbmcsIG1hcHBpbmdzLm1ldHJpY3MubWFwcGluZywgbWFwcGluZ3MuaW1wYWN0cy5tYXBwaW5nKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29udHJvbHMoKSB7XG4gICAgaWYgKG1hcHBpbmdzID09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY29udHJvbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbHMnKTtcbiAgICBpZiAoY29udHJvbHMgPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBwb3B1bGF0ZSBjb250cm9sc1wiKVxuXG4gICAgY29uc3QgYmluYXJpZXMgPSBnZXRCaW5hcmllcygpO1xuICAgIGNvbnNvbGUubG9nKGJpbmFyaWVzKTtcblxuICAgIGZvciAobGV0IGk9MDsgaTxiaW5hcmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGNoZWNrYm94LnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICAgICBjaGVja2JveC5uYW1lID0gYmluYXJpZXNbaV0uaWQ7XG4gICAgICAgIGNoZWNrYm94LmlkID0gYmluYXJpZXNbaV0uaWQ7XG4gICAgICAgIGNoZWNrYm94Lm9uaW5wdXQgPSB1cGRhdGVNYXA7XG5cbiAgICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICBsYWJlbC5odG1sRm9yID0gYmluYXJpZXNbaV0uaWQ7XG4gICAgICAgIGxhYmVsLmlubmVySFRNTCA9IGJpbmFyaWVzW2ldLmxhYmVsLmVuO1xuXG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgICAgICBjb250cm9scy5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgICBjb25zb2xlLmxvZyhiaW5hcmllc1tpXS5pZCk7XG4gICAgfVxuICAgIHVwZGF0ZU1hcCgpO1xufVxuXG5mdW5jdGlvbiBpc0NoZWNrZWQoaWQ6IHN0cmluZykge1xuICAgIHJldHVybiAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpKS5jaGVja2VkXG59XG5cbmZ1bmN0aW9uIHBlcm11dGF0aW9uU3RyKGJpbmFyaWVzOiBNYXBwaW5nW10pIHtcbiAgICByZXR1cm4gYmluYXJpZXMubWFwKGIgPT4gYi5pZCtcIi1cIisoK2lzQ2hlY2tlZChiLmlkKSkpLmpvaW4oXCJfXCIpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVNYXAoKSB7XG4gICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwidXBkIHRyaWdcIilcbiAgICBpZiAobWFwcGluZ3MgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgeWVhcjIxMDAgPSBpc0NoZWNrZWQobWFwcGluZ3MueWVhci5tYXBwaW5nWzBdLmlkKTtcbiAgICBjb25zdCBlbWlzc2lvbnMgPSB5ZWFyMjEwMCA/IGN1bXVsYXRlQ28yRW1pc3Npb25zKCkgOiAwO1xuICAgIGNvbnNvbGUubG9nKCdDdW11bGF0ZWQgQ08yIGVtaXNzaW9uczonLCBlbWlzc2lvbnMpO1xuICAgIGNvbnN0IHRlbXBlcmF0dXJlID0gaW50ZXJwb2xhdGVNYXBwaW5nKG1hcHBpbmdzLmltcGFjdHNfc2NlbmFyaW9zLm1hcHBpbmcsIGVtaXNzaW9ucyk7XG4gICAgY29uc29sZS5sb2coJ1RlbXBlcmF0dXJlIGZvcmVjYXN0OicsIHRlbXBlcmF0dXJlKTtcbiAgICB1cGRhdGVUZW1wZXJhdHVyZSh0ZW1wZXJhdHVyZSk7XG5cbiAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZmZXRjaFwiKTtcblxuICAgIGZldGNoKCdkYXRhLycrcGVybXV0YXRpb25TdHIoZ2V0QmluYXJpZXMoKSkrJy5jc3YnKSAvLzEwMG1zXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZ0ZXh0XCIpO1xuICAgICAgICBjb25zdCB0ID0gcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJhZnp0ZXh0XCIpO1xuICAgICAgICByZXR1cm4gdDtcblxuICAgIH0pXG4gICAgLnRoZW4oZ3JpZCA9PiByZWFkR3JpZChncmlkKSk7XG59XG5cbmZ1bmN0aW9uIGN1bXVsYXRlQ28yRW1pc3Npb25zKCkge1xuICAgIGlmIChtYXBwaW5ncyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGxldCBjdW11bF9jbzIgPSBtYXBwaW5ncy55ZWFyLm1hcHBpbmdbMF0ueTtcbiAgICBjb25zdCBwYXJhbXMgPSBtYXBwaW5ncy5wYXJhbWV0ZXJzLm1hcHBpbmdcbiAgICBmb3IgKGxldCBpPTA7IGk8cGFyYW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNoZWNrYm94ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyYW1zW2ldLmlkKTtcbiAgICAgICAgaWYgKGNoZWNrYm94LmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGN1bXVsX2NvMiArPSBwYXJhbXNbaV0ueTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY3VtdWxfY28yO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVUZW1wZXJhdHVyZSh0ZW1wZXJhdHVyZTogbnVtYmVyKSB7XG4gICAgY29uc3QgdCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVtcGVyYXR1cmUnKTtcbiAgICB0LmlubmVySFRNTCA9IE1hdGgucm91bmQoKHRlbXBlcmF0dXJlKzEpKjEwKS8xMCtcIlwiO1xufVxuXG5mdW5jdGlvbiB2KHA6IG51bWJlciwgcTogbnVtYmVyLCB0OiBudW1iZXIpIHtcbiAgICByZXR1cm4gcCooMS10KStxKnQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNpdGllcyhjaXRpZXM6IGFueSwgdHJpYW5nbGVzOiBbVmVjdG9yLCBWZWN0b3IsIFZlY3Rvcl1bXSk6IERlcGVuZGVudFtdIHtcbiAgICBjb25zdCBkZXBlbmRlbnRzOiBEZXBlbmRlbnRbXSA9IFtdO1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcbiAgICBmb3IgKGxldCBpPTA7IGk8Y2l0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNpdHkgPSBjaXRpZXNbaV07XG4gICAgICAgIGNvbnN0IGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGMuaW5uZXJIVE1MID0gY2l0eVsnbmFtZSddO1xuICAgICAgICBjLmNsYXNzTmFtZSA9ICdjaXR5JztcbiAgICAgICAgY29udGFpbmVyPy5hcHBlbmRDaGlsZChjKTtcbiAgICAgICAgY29uc3QgeCA9IGNpdHlbJ2Nvb3JkaW5hdGVzJ11bMF07XG4gICAgICAgIGNvbnN0IHkgPSBjaXR5Wydjb29yZGluYXRlcyddWzFdO1xuICAgICAgICBjb25zdCBldmVuSW5kZXggPSAoTWF0aC5mbG9vcih4KStNYXRoLmZsb29yKHkpKihHUklEX0RJTUVOLngpKSoyO1xuICAgICAgICBjb25zdCB1bmV2ZW4gPSB4LU1hdGguZmxvb3IoeCkreS1NYXRoLmZsb29yKHkpID4gMSA/IDEgOiAwO1xuICAgICAgICBjb25zdCBpbmRleCA9IGV2ZW5JbmRleCArIHVuZXZlbjtcbiAgICAgICAgY29uc29sZS5sb2coY2l0eVsnbmFtZSddLCBpbmRleCwgaW5kZXglKChHUklEX0RJTUVOLngpKjIpLCB0cmlhbmdsZXNbaW5kZXhdKTtcbiAgICAgICAgZGVwZW5kZW50cy5wdXNoKHtcbiAgICAgICAgICAgIGNhbGxiYWNrOiAoZ3JpZFBvczogVmVjdG9yKSA9PiB7XG4gICAgICAgICAgICAgICAgYy5zdHlsZS5sZWZ0ID0gZ3JpZFBvcy54L0dSSURfRElNRU4ueCoxMDArJyUnO1xuICAgICAgICAgICAgICAgIGMuc3R5bGUudG9wID0gZ3JpZFBvcy55L0dSSURfRElNRU4ueSoxMDArJyUnO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyaWFuZ2xlSW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgczogMC41LFxuICAgICAgICAgICAgdDogMC41XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZGVwZW5kZW50cztcbn1cblxuZnVuY3Rpb24gbG9hZE1hcHBpbmdzKCkge1xuICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImh0dHAxXCIpO1xuICAgIGZldGNoKCdyZXMvbWFwcGluZ3MuanNvbicpXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKGpzb24gPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJyZXNcIik7XG4gICAgICAgIG1hcHBpbmdzID0ganNvbjtcbiAgICAgICAgY3JlYXRlQ29udHJvbHMoKTtcbiAgICAgICAgZmV0Y2goJ3Jlcy9jaXRpZXMuanNvbicpXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgLnRoZW4oY2l0aWVzID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJmYWtldHJpYW5nXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRyaWFuZ2xlcyA9IGZpbmRUcmlhbmdsZXMoKHgsIHkpID0+IG5ldyBWZWN0b3IoeCwgeSkpO1xuICAgICAgICAgICAgICAgIGNydW1wbGVkTWFwLnNldFRleENvb3Jkcyh0cmlhbmdsZXMsIGNyZWF0ZUNpdGllcyhjaXRpZXMsIHRyaWFuZ2xlcykpOyAvLyA2MDBtc1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImFmdGVyZmFrZXRyaWFuZ1wiKTtcbiAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICB9KTsgICAgICAgXG4gICAgfSk7XG4gICAgXG4gICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiaHR0cDJcIik7XG59XG5cbmxvYWRNYXBwaW5ncygpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW4tZXhwb3NlZC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==