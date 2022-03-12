/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Animator-exposed.ts":
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

/***/ "./src/CrumpledImage-exposed.ts":
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

/***/ "./src/Vector-exposed.ts":
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
const Animator_1 = __webpack_require__(/*! ./Animator */ "./src/Animator-exposed.ts");
const Vector_1 = __webpack_require__(/*! ./Vector */ "./src/Vector-exposed.ts");
class CrumpledImage {
    constructor(gridDimen, animationDurationMs) {
        this.gridDimen = gridDimen;
        this.animationDurationMs = animationDurationMs;
        this.canvasDimen = Vector_1.Vector.NULL;
        this.canvasTl = Vector_1.Vector.NULL;
        this.imgDimen = Vector_1.Vector.NULL;
        this.vertexCount = 0;
        this.nonce = 0;
        console.log(performance.now(), "cru1");
        this.canvas = document.getElementById('map');
        this.resizeCanvas();
        this.gl = this.canvas.getContext('webgl');
        window.addEventListener('resize', () => this.resizeCanvas(), false);
        this.glSetup();
        console.log(performance.now(), "cru2");
        this.setTexture();
    }
    setTexCoords(srcTriangles) {
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
        this.nonce++;
        if (!animate) {
            this.glInterpolate(0);
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
            if (isLast) {
                this.glUpdateFrom(newStateCanvas);
                console.log(performance.now(), "applied update", performance.now() - s);
            }
            return true;
        });
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
const Vector_1 = __webpack_require__(/*! ./Vector */ "./src/Vector-exposed.ts");
const CrumpledImage_1 = __webpack_require__(/*! ./CrumpledImage */ "./src/CrumpledImage-exposed.ts");
const GRID_DIMEN = new Vector_1.Vector(401, 201);
let mappings = undefined;
let initial = true;
;
const crumpledMap = new CrumpledImage_1.CrumpledImage(GRID_DIMEN, 2000);
function findTriangles(elementsCount, resolver) {
    const triangles = [];
    const rowCount = Math.floor(elementsCount / GRID_DIMEN.x);
    console.log(rowCount);
    for (let i = 0; i < GRID_DIMEN.y - 1; i += 1) {
        for (let j = 0; j < GRID_DIMEN.x - 1; j += 1) {
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
        const v = vectors[y * GRID_DIMEN.x + x];
        if (v == undefined) {
            console.log("hey", x, y);
        }
        return new Vector_1.Vector(v.x, v.y);
    };
    console.log(performance.now(), "beftriangles");
    const triangles = findTriangles(vectors.length, resolver); //600ms
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
function loadMappings() {
    console.log(performance.now(), "http1");
    fetch('res/mappings.json')
        .then(response => response.json())
        .then(json => {
        console.log(performance.now(), "res");
        mappings = json;
        createControls();
        window.setTimeout(() => {
            console.log(performance.now(), "faketriang");
            crumpledMap.setTexCoords(findTriangles(GRID_DIMEN.x * GRID_DIMEN.y, (x, y) => new Vector_1.Vector(x, y))); // 600ms
            console.log(performance.now(), "afterfaketriang");
        }, 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUM7Ozs7O1VFUEQ7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zLy4vc3JjL0FuaW1hdG9yLWV4cG9zZWQudHMiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy8uL3NyYy9DcnVtcGxlZEltYWdlLWV4cG9zZWQudHMiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy8uL3NyYy9WZWN0b3ItZXhwb3NlZC50cyIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zLy4vc3JjL21haW4tZXhwb3NlZC50cyIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zLy4vbm9kZV9tb2R1bGVzL2V4cG9zZS1sb2FkZXIvZGlzdC9ydW50aW1lL2dldEdsb2JhbFRoaXMuanMiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy8uL3NyYy9BbmltYXRvci50cyIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zLy4vc3JjL0NydW1wbGVkSW1hZ2UudHMiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy8uL3NyYy9WZWN0b3IudHMiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy8uL3NyYy9tYWluLnRzIiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX18gPSByZXF1aXJlKFwiLSEuLi9ub2RlX21vZHVsZXMvdHMtbG9hZGVyL2luZGV4LmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzBdLnVzZVsxXSEuL0FuaW1hdG9yLnRzXCIpO1xudmFyIF9fX0VYUE9TRV9MT0FERVJfR0VUX0dMT0JBTF9USElTX19fID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9leHBvc2UtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRHbG9iYWxUaGlzLmpzXCIpO1xudmFyIF9fX0VYUE9TRV9MT0FERVJfR0xPQkFMX1RISVNfX18gPSBfX19FWFBPU0VfTE9BREVSX0dFVF9HTE9CQUxfVEhJU19fXztcbl9fX0VYUE9TRV9MT0FERVJfR0xPQkFMX1RISVNfX19bXCJDQ0NcIl0gPSBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXztcbm1vZHVsZS5leHBvcnRzID0gX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX187XG4iLCJ2YXIgX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX18gPSByZXF1aXJlKFwiLSEuLi9ub2RlX21vZHVsZXMvdHMtbG9hZGVyL2luZGV4LmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzBdLnVzZVsxXSEuL0NydW1wbGVkSW1hZ2UudHNcIik7XG52YXIgX19fRVhQT1NFX0xPQURFUl9HRVRfR0xPQkFMX1RISVNfX18gPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2V4cG9zZS1sb2FkZXIvZGlzdC9ydW50aW1lL2dldEdsb2JhbFRoaXMuanNcIik7XG52YXIgX19fRVhQT1NFX0xPQURFUl9HTE9CQUxfVEhJU19fXyA9IF9fX0VYUE9TRV9MT0FERVJfR0VUX0dMT0JBTF9USElTX19fO1xuX19fRVhQT1NFX0xPQURFUl9HTE9CQUxfVEhJU19fX1tcIkNDQ1wiXSA9IF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fO1xubW9kdWxlLmV4cG9ydHMgPSBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXztcbiIsInZhciBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCItIS4uL25vZGVfbW9kdWxlcy90cy1sb2FkZXIvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbMF0udXNlWzFdIS4vVmVjdG9yLnRzXCIpO1xudmFyIF9fX0VYUE9TRV9MT0FERVJfR0VUX0dMT0JBTF9USElTX19fID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9leHBvc2UtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRHbG9iYWxUaGlzLmpzXCIpO1xudmFyIF9fX0VYUE9TRV9MT0FERVJfR0xPQkFMX1RISVNfX18gPSBfX19FWFBPU0VfTE9BREVSX0dFVF9HTE9CQUxfVEhJU19fXztcbl9fX0VYUE9TRV9MT0FERVJfR0xPQkFMX1RISVNfX19bXCJDQ0NcIl0gPSBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXztcbm1vZHVsZS5leHBvcnRzID0gX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX187XG4iLCJ2YXIgX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX18gPSByZXF1aXJlKFwiLSEuLi9ub2RlX21vZHVsZXMvdHMtbG9hZGVyL2luZGV4LmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzBdLnVzZVsxXSEuL21haW4udHNcIik7XG52YXIgX19fRVhQT1NFX0xPQURFUl9HRVRfR0xPQkFMX1RISVNfX18gPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2V4cG9zZS1sb2FkZXIvZGlzdC9ydW50aW1lL2dldEdsb2JhbFRoaXMuanNcIik7XG52YXIgX19fRVhQT1NFX0xPQURFUl9HTE9CQUxfVEhJU19fXyA9IF9fX0VYUE9TRV9MT0FERVJfR0VUX0dMT0JBTF9USElTX19fO1xuX19fRVhQT1NFX0xPQURFUl9HTE9CQUxfVEhJU19fX1tcIkNDQ1wiXSA9IF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fO1xubW9kdWxlLmV4cG9ydHMgPSBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gXCJvYmplY3RcIikge1xuICAgIHJldHVybiBnbG9iYWxUaGlzO1xuICB9XG5cbiAgdmFyIGc7XG5cbiAgdHJ5IHtcbiAgICAvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgICBnID0gdGhpcyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgcmV0dXJuIHdpbmRvdztcbiAgICB9IC8vIFRoaXMgd29ya3MgaWYgdGhlIHNlbGYgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXG5cbiAgICBpZiAodHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0gLy8gVGhpcyB3b3JrcyBpZiB0aGUgZ2xvYmFsIHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblxuXG4gICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHJldHVybiBnbG9iYWw7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGc7XG59KCk7IiwiZXhwb3J0IGNsYXNzIEFuaW1hdG9yIHtcblxuICAgIHN0YXRpYyBFQVNFX05PTkU6ICh4OiBudW1iZXIpID0+IG51bWJlciA9IHggPT4geDtcbiAgICBzdGF0aWMgRUFTRV9DVUJJQzogKHg6IG51bWJlcikgPT4gbnVtYmVyID0geCA9PiB4IDwgMC41ID8gNCAqIHggKiB4ICogeCA6IDEgLSBNYXRoLnBvdygtMiAqIHggKyAyLCAzKSAvIDI7XG4gICAgc3RhdGljIEVBU0VfU0lORTogKHg6IG51bWJlcikgPT4gbnVtYmVyID0geCA9PiAtKE1hdGguY29zKE1hdGguUEkgKiB4KSAtIDEpIC8gMjtcbiAgICBcbiAgICBwcml2YXRlIF9mcm9tOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX3RvOiBudW1iZXIgPSAxO1xuICAgIHByaXZhdGUgX3RpbWVQYXNzZWQ6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfZWFzZTogKHg6IG51bWJlcikgPT4gbnVtYmVyID0gQW5pbWF0b3IuRUFTRV9OT05FO1xuXG4gICAgcHJpdmF0ZSBjYWxsYmFjazogKHg6IG51bWJlciwgaXNMYXN0OiBib29sZWFuKSA9PiBib29sZWFuID0geCA9PiB0cnVlO1xuICAgIHByaXZhdGUgc3RhcnRUaW1lOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgZHVyYXRpb25NaWxsaXNlY29uZHM6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgZnJvbShmcm9tOiBudW1iZXIpOiBBbmltYXRvciB7XG4gICAgICAgIHRoaXMuX2Zyb20gPSBmcm9tO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgdG8odG86IG51bWJlcik6IEFuaW1hdG9yIHtcbiAgICAgICAgdGhpcy5fdG8gPSB0bztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIHRpbWVQYXNzZWQodGltZVBhc3NlZDogbnVtYmVyKTogQW5pbWF0b3Ige1xuICAgICAgICB0aGlzLl90aW1lUGFzc2VkID0gdGltZVBhc3NlZDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGVhc2UoZWFzZTogKHg6IG51bWJlcikgPT4gbnVtYmVyKTogQW5pbWF0b3Ige1xuICAgICAgICB0aGlzLl9lYXNlID0gZWFzZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIHdhaXQoZGVsYXlNaWxsaXNlY29uZHM6IG51bWJlciwgY2FsbGJhY2s6ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgaWYgKGRlbGF5TWlsbGlzZWNvbmRzID4gMCkge1xuICAgICAgICAgICAgdGhpcy50aW1lb3V0KGNhbGxiYWNrLCBkZWxheU1pbGxpc2Vjb25kcyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYW5pbWF0ZShkdXJhdGlvbk1pbGxpc2Vjb25kczogbnVtYmVyLCBjYWxsYmFjazogKHg6IG51bWJlciwgaXNMYXN0OiBib29sZWFuKSA9PiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHVyYXRpb25NaWxsaXNlY29uZHMgPSBkdXJhdGlvbk1pbGxpc2Vjb25kcztcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IHRoaXMubm93KCk7XG4gICAgICAgIHRoaXMuZnJhbWUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZyYW1lKCkge1xuICAgICAgICBjb25zdCBub3cgPSB0aGlzLm5vdygpO1xuICAgICAgICBsZXQgeCA9IDE7XG4gICAgICAgIGlmICh0aGlzLmR1cmF0aW9uTWlsbGlzZWNvbmRzID4gMCkge1xuICAgICAgICAgICAgeCA9IChub3ctdGhpcy5zdGFydFRpbWUrdGhpcy5fdGltZVBhc3NlZCkgLyB0aGlzLmR1cmF0aW9uTWlsbGlzZWNvbmRzO1xuICAgICAgICB9XG4gICAgICAgIHggPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCB4KSk7XG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLl9mcm9tICsgKHRoaXMuX3RvLXRoaXMuX2Zyb20pICogdGhpcy5fZWFzZSh4KTtcbiAgICAgICAgY29uc3QgY29udCA9IHRoaXMuY2FsbGJhY2soeSwgeCA9PSAxKTtcbiAgICAgICAgaWYgKGNvbnQgJiYgeCA8IDEpIHtcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdEZyYW1lKCgpID0+IHRoaXMuZnJhbWUoKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIWNvbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdG9wcGVkIGFuaW1hdGlvbiBiZWNhdXNlIGNhbGxiYWNrIHJldHVybmVkIGZhbHNlLicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBub3coKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdGltZW91dChjYWxsYmFjazogKCkgPT4gdm9pZCwgZGVsYXlNaWxsaXNlY29uZHM6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgZGVsYXlNaWxsaXNlY29uZHMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVxdWVzdEZyYW1lKGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEFuaW1hdG9yIH0gZnJvbSBcIi4vQW5pbWF0b3JcIjtcbmltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuL1ZlY3RvclwiO1xuXG5leHBvcnQgY2xhc3MgQ3J1bXBsZWRJbWFnZSB7XG4gICAgcHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHByaXZhdGUgY2FudmFzRGltZW46IFZlY3RvciA9IFZlY3Rvci5OVUxMO1xuICAgIHByaXZhdGUgY2FudmFzVGw6IFZlY3RvciA9IFZlY3Rvci5OVUxMO1xuICAgIHByaXZhdGUgaW1nRGltZW46IFZlY3RvciA9IFZlY3Rvci5OVUxMO1xuICAgIHByaXZhdGUgdmVydGV4Q291bnQgPSAwO1xuICAgIHByaXZhdGUgcHJvZ3JhbUluZm86IGFueTtcbiAgICBwcml2YXRlIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XG4gICAgcHJpdmF0ZSBub25jZSA9IDA7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyaWREaW1lbjogVmVjdG9yLCBwcml2YXRlIGFuaW1hdGlvbkR1cmF0aW9uTXM6IG51bWJlcikge1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJjcnUxXCIpO1xuICAgICAgICB0aGlzLmNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyk7XG4gICAgICAgIHRoaXMucmVzaXplQ2FudmFzKCk7XG4gICAgICAgIHRoaXMuZ2wgPSA8V2ViR0xSZW5kZXJpbmdDb250ZXh0PnRoaXMuY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJyk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB0aGlzLnJlc2l6ZUNhbnZhcygpLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuZ2xTZXR1cCgpO1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJjcnUyXCIpO1xuICAgICAgICB0aGlzLnNldFRleHR1cmUoKTsgICAgICAgICAgICAgICAgICAgICBcbiAgICB9XG5cbiAgICBzZXRUZXhDb29yZHMoc3JjVHJpYW5nbGVzOiBbVmVjdG9yLCBWZWN0b3IsIFZlY3Rvcl1bXSkge1xuICAgICAgICBjb25zdCBjdXJyZW50U3RhdGUgPSB0aGlzLm1hdHJpeENvbnZlcnRDb29yZHMoc3JjVHJpYW5nbGVzKTtcbiAgICAgICAgdGhpcy52ZXJ0ZXhDb3VudCA9IGN1cnJlbnRTdGF0ZS5sZW5ndGggLyAyO1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZzcmNcIik7XG4gICAgICAgIGNvbnN0IHRleENvb3JkcyA9IHRoaXMubWF0cml4Q29udmVydENvb3JkcyhzcmNUcmlhbmdsZXMsIHYgPT4gdGhpcy5ncmlkMkltZ0Nvb3Jkcyh2KSk7IC8vIDEwMG1zXG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZnNldGlwXCIpO1xuICAgICAgICB0aGlzLmdsVXBkYXRlRnJvbShjdXJyZW50U3RhdGUpO1xuICAgICAgICB0aGlzLmdsVGV4Q29vcmRzKHRleENvb3Jkcyk7XG4gICAgICAgXG4gICAgXG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImFmdGVyc2V0dXBcIik7XG5cbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIHRoaXMuY2FudmFzRGltZW4pO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2l6ZUNhbnZhcygpIHtcbiAgICAgICAgY29uc3QgciA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB0aGlzLmNhbnZhc0RpbWVuID0gbmV3IFZlY3RvcihyLndpZHRoLCByLmhlaWdodCk7XG4gICAgICAgIHRoaXMuY2FudmFzVGwgPSBuZXcgVmVjdG9yKHIudG9wLCByLmxlZnQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UHJlZmVycmVkSW1nUmVzb2x1dGlvbigpIHtcbiAgICAgICAgY29uc3QgYXZhaWxhYmxlID0gWzEwMjQsIDIwNDgsIDQwOTYsIDgxOTJdO1xuICAgICAgICBjb25zdCBtYXggPSB0aGlzLmdsLmdldFBhcmFtZXRlcih0aGlzLmdsLk1BWF9URVhUVVJFX1NJWkUpLzI7XG4gICAgICAgIGxldCBmb3VuZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8YXZhaWxhYmxlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlW2ldIDw9IG1heCkge1xuICAgICAgICAgICAgICAgIGZvdW5kID0gYXZhaWxhYmxlW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChmb3VuZCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiTm8gdGV4dHVyZSBzaXplIGZvdW5kXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGV4dHVyZSBzaXplOlwiLCBmb3VuZCk7XG4gICAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFRleHR1cmUoKSB7XG4gICAgICAgIGNvbnN0IGltID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltLm9ubG9hZCA9ICgpID0+IHsgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5pbWdEaW1lbiA9IG5ldyBWZWN0b3IoaW0ud2lkdGgsIGltLmhlaWdodCk7XG4gICAgICAgICAgICB0aGlzLmdsVGV4dHVyZShpbSk7XG4gICAgICAgIH1cbiAgICAgICAgaW0uc3JjID0gXCJyZXMvbWFwX1wiK3RoaXMuZ2V0UHJlZmVycmVkSW1nUmVzb2x1dGlvbigpK1wieC5qcGdcIjsgIFxuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJjcnUzXCIpOyBcbiAgICB9XG5cbiAgICB1cGRhdGUobmV3U3RhdGU6IFtWZWN0b3IsIFZlY3RvciwgVmVjdG9yXVtdLCBhbmltYXRlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcInJlY2VpdmVkIHVwZGF0ZVwiKTtcbiAgICAgICAgY29uc3QgbmV3U3RhdGVDYW52YXMgPSB0aGlzLm1hdHJpeENvbnZlcnRDb29yZHMobmV3U3RhdGUpOyAvLzIwMG1zXG4gICAgICAgIHRoaXMubWFwVHJpYW5nbGVzKG5ld1N0YXRlQ2FudmFzKTtcblxuICAgICAgICB0aGlzLm5vbmNlKys7XG4gICAgICAgIGlmICghYW5pbWF0ZSkge1xuICAgICAgICAgICAgdGhpcy5nbEludGVycG9sYXRlKDApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFuaW1hdG9yID0gbmV3IEFuaW1hdG9yKCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBub25jZSA9IHRoaXMubm9uY2U7XG4gICAgICAgIGFuaW1hdG9yLmFuaW1hdGUodGhpcy5hbmltYXRpb25EdXJhdGlvbk1zLCAoeCwgaXNMYXN0KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5ub25jZSAhPSBub25jZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHMgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcInN0YXJ0ZWQgdXBkYXRlXCIpO1xuICAgICAgICAgICAgdGhpcy5nbEludGVycG9sYXRlKHgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoaXNMYXN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nbFVwZGF0ZUZyb20obmV3U3RhdGVDYW52YXMpXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYXBwbGllZCB1cGRhdGVcIiwgcGVyZm9ybWFuY2Uubm93KCktcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7ICAgICAgIFxuICAgIH1cblxuICAgIHByaXZhdGUgbWFwVHJpYW5nbGVzKG5ld1N0YXRlOiBudW1iZXJbXSkge1xuICAgICAgICBpZiAobmV3U3RhdGUubGVuZ3RoLzIgIT0gdGhpcy52ZXJ0ZXhDb3VudCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwibmV3U3RhdGUgaGFzIGRpZmZlcmVudCBsZW5ndGggKFwiK25ld1N0YXRlLmxlbmd0aC8yK1wiKSB0aGFuIGN1cnJlbnRTdGF0ZSAoXCIrdGhpcy52ZXJ0ZXhDb3VudCtcIilcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYmVmZHN0XCIpO1xuICAgICAgICBcbiAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZ1cGRcIik7XG4gICAgICAgIHRoaXMuZ2xVcGRhdGVUbyhuZXdTdGF0ZSk7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgZ3JpZDJJbWdDb29yZHModjogVmVjdG9yKSB7XG4gICAgICAgIGNvbnN0IHNjYWxlID0gMSAvIHRoaXMuZ3JpZERpbWVuLng7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHYueCpzY2FsZSwgdi55KnNjYWxlKjIpO1xuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIGdyaWQyQ2FudmFzQ29vcmRzKHY6IFZlY3Rvcikge1xuICAgICAgICBjb25zdCBzY2FsZSA9IDIgLyB0aGlzLmdyaWREaW1lbi54O1xuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih2Lngqc2NhbGUtMSwgdi55Ki0yL3RoaXMuZ3JpZERpbWVuLnkrMSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYXRyaXhDb252ZXJ0Q29vcmRzKG1hdHJpeDogW1ZlY3RvciwgVmVjdG9yLCBWZWN0b3JdW10sIG1hcHBpbmc6ICh2OiBWZWN0b3IpID0+IFZlY3RvciA9ICh2KSA9PiB0aGlzLmdyaWQyQ2FudmFzQ29vcmRzKHYpKSB7XG4gICAgICAgIGNvbnN0IGNvb3JkczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaT0wO2k8bWF0cml4Lmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGRzdCA9IG1hdHJpeFtpXS5tYXAoKGM6IFZlY3RvcikgPT4gbWFwcGluZyhjKSk7XG4gICAgICAgICAgICBjb29yZHMucHVzaChkc3RbMF0ueCwgZHN0WzBdLnksIGRzdFsxXS54LCBkc3RbMV0ueSwgZHN0WzJdLngsIGRzdFsyXS55KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29vcmRzO1xuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIGdsU2V0dXAoKSB7XG4gICAgICAgIGNvbnN0IGZzU291cmNlID0gYFxuICAgICAgICAgICAgdmFyeWluZyBoaWdocCB2ZWMyIHZUZXh0dXJlQ29vcmQ7XG5cbiAgICAgICAgICAgIHVuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyO1xuXG4gICAgICAgICAgICB2b2lkIG1haW4odm9pZCkge1xuICAgICAgICAgICAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2VGV4dHVyZUNvb3JkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYDtcblxuICAgICAgICBjb25zdCB2c1NvdXJjZSA9IGBcbiAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWM0IGFWZXJ0ZXhQb3NpdGlvbkZyb207XG4gICAgICAgICAgICBhdHRyaWJ1dGUgdmVjNCBhVmVydGV4UG9zaXRpb25UbztcbiAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWMyIGFUZXh0dXJlQ29vcmQ7XG4gICAgICAgICAgICB1bmlmb3JtIGZsb2F0IHVBbmltYXRpb25YOyBcblxuICAgICAgICAgICAgdmFyeWluZyBoaWdocCB2ZWMyIHZUZXh0dXJlQ29vcmQ7XG5cbiAgICAgICAgICAgIHZvaWQgbWFpbih2b2lkKSB7XG4gICAgICAgICAgICBnbF9Qb3NpdGlvbiA9IGFWZXJ0ZXhQb3NpdGlvbkZyb20qKDEuMC11QW5pbWF0aW9uWCkrYVZlcnRleFBvc2l0aW9uVG8qdUFuaW1hdGlvblg7XG4gICAgICAgICAgICB2VGV4dHVyZUNvb3JkID0gYVRleHR1cmVDb29yZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYDtcblxuICAgICAgICBjb25zdCBzaGFkZXJQcm9ncmFtID0gdGhpcy5pbml0U2hhZGVyUHJvZ3JhbSh2c1NvdXJjZSwgZnNTb3VyY2UpO1xuICAgICAgICBpZiAoIXNoYWRlclByb2dyYW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb2dyYW1JbmZvID0ge1xuICAgICAgICAgICAgcHJvZ3JhbTogc2hhZGVyUHJvZ3JhbSxcbiAgICAgICAgICAgIGF0dHJpYkxvY2F0aW9uczoge1xuICAgICAgICAgICAgICB2ZXJ0ZXhQb3NpdGlvbkZyb206IHRoaXMuZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ2FWZXJ0ZXhQb3NpdGlvbkZyb20nKSxcbiAgICAgICAgICAgICAgdmVydGV4UG9zaXRpb25UbzogdGhpcy5nbC5nZXRBdHRyaWJMb2NhdGlvbihzaGFkZXJQcm9ncmFtLCAnYVZlcnRleFBvc2l0aW9uVG8nKSxcbiAgICAgICAgICAgICAgdGV4dHVyZUNvb3JkOiB0aGlzLmdsLmdldEF0dHJpYkxvY2F0aW9uKHNoYWRlclByb2dyYW0sICdhVGV4dHVyZUNvb3JkJyksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdW5pZm9ybUxvY2F0aW9uczoge1xuICAgICAgICAgICAgICBhbmltYXRpb25YOiB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbihzaGFkZXJQcm9ncmFtLCAndUFuaW1hdGlvblgnKSxcbiAgICAgICAgICAgICAgdVNhbXBsZXI6IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlclByb2dyYW0sICd1U2FtcGxlcicpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJ1ZmZlcnM6IHtcbiAgICAgICAgICAgICAgICB2ZXJ0ZXhCdWZmZXJGcm9tOiB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpLFxuICAgICAgICAgICAgICAgIHZlcnRleEJ1ZmZlclRvOiB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbG9hZGVkOiB7XG4gICAgICAgICAgICAgICAgdGV4dHVyZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgdGV4Q29vcmQ6IGZhbHNlLCBcbiAgICAgICAgICAgICAgICBkc3RDb29yZDogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nbC51c2VQcm9ncmFtKHRoaXMucHJvZ3JhbUluZm8ucHJvZ3JhbSk7XG5cbiAgICAgICAgdGhpcy5nbC52aWV3cG9ydCgwLCAwLCB0aGlzLmdsLmNhbnZhcy53aWR0aCwgdGhpcy5nbC5jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICB0aGlzLmdsLnVuaWZvcm0xaSh0aGlzLnByb2dyYW1JbmZvLnVuaWZvcm1Mb2NhdGlvbnMudVNhbXBsZXIsIDApO1xuICAgICAgICB0aGlzLmdsLnVuaWZvcm0xZih0aGlzLnByb2dyYW1JbmZvLnVuaWZvcm1Mb2NhdGlvbnMuYW5pbWF0aW9uWCwgMC4wKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdsVGV4Q29vcmRzKHRleENvb3JkczogbnVtYmVyW10pIHtcbiAgICAgICAgY29uc3QgdGV4Q29vcmRCdWZmZXIgPSB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgICAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHRleENvb3JkQnVmZmVyKTtcbiAgICAgICAgdGhpcy5nbC5idWZmZXJEYXRhKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHRleENvb3JkcyksIHRoaXMuZ2wuU1RBVElDX0RSQVcpO1xuICAgICAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIoIHRoaXMucHJvZ3JhbUluZm8uYXR0cmliTG9jYXRpb25zLnRleHR1cmVDb29yZCwgMiwgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDAgKTtcbiAgICAgICAgdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSggdGhpcy5wcm9ncmFtSW5mby5hdHRyaWJMb2NhdGlvbnMudGV4dHVyZUNvb3JkICk7XG5cbiAgICAgICAgdGhpcy5wcm9ncmFtSW5mby5sb2FkZWQudGV4Q29vcmQgPSB0cnVlO1xuICAgICAgICB0aGlzLmdsRGVmZXJyZWREcmF3KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnbFRleHR1cmUoaW06IEhUTUxJbWFnZUVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgdGV4TmFtZSA9IHRoaXMuZ2wuY3JlYXRlVGV4dHVyZSgpO1xuICAgICAgICB0aGlzLmdsLmFjdGl2ZVRleHR1cmUodGhpcy5nbC5URVhUVVJFMCk7XG4gICAgICAgIHRoaXMuZ2wuYmluZFRleHR1cmUodGhpcy5nbC5URVhUVVJFXzJELCB0ZXhOYW1lKTtcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIHRoaXMuZ2wuZ2V0UGFyYW1ldGVyKHRoaXMuZ2wuTUFYX1RFWFRVUkVfU0laRSksIGltLndpZHRoLCBpbS5oZWlnaHQsIHRoaXMuZ2wuY2FudmFzLmhlaWdodCk7XG4gICAgICAgIHRoaXMuZ2wudGV4SW1hZ2UyRCh0aGlzLmdsLlRFWFRVUkVfMkQsIDAsIHRoaXMuZ2wuUkdCQSwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlVOU0lHTkVEX0JZVEUsIGltKTtcbiAgICAgICAgdGhpcy5nbC5nZW5lcmF0ZU1pcG1hcCh0aGlzLmdsLlRFWFRVUkVfMkQpO1xuICAgICAgIFxuICAgICAgICB0aGlzLnByb2dyYW1JbmZvLmxvYWRlZC50ZXh0dXJlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5nbERlZmVycmVkRHJhdygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2xVcGRhdGVGcm9tKGZyb21Db29yZHM6IG51bWJlcltdKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZmJ1ZmZlclwiKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZiaW5kXCIpO1xuXG4gICAgICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy5wcm9ncmFtSW5mby5idWZmZXJzLnZlcnRleEJ1ZmZlckZyb20pO1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZkYXRhXCIpO1xuICAgICAgICB0aGlzLmdsLmJ1ZmZlckRhdGEodGhpcy5nbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoZnJvbUNvb3JkcyksIHRoaXMuZ2wuU1RBVElDX0RSQVcpOyAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZmF0dHJpYlwiKTtcblxuICAgICAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIoIHRoaXMucHJvZ3JhbUluZm8uYXR0cmliTG9jYXRpb25zLnZlcnRleFBvc2l0aW9uRnJvbSwgMiwgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDAgKTtcbiAgICAgICAgdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSggdGhpcy5wcm9ncmFtSW5mby5hdHRyaWJMb2NhdGlvbnMudmVydGV4UG9zaXRpb25Gcm9tICk7XG5cbiAgICAgICAgLy90aGlzLmdsLmNsZWFyQ29sb3IoMC4wLCAwLjAsIDAuMCwgMS4wKTtcbiAgICAgICAgLy90aGlzLmdsLmNsZWFyKHRoaXMuZ2wuQ09MT1JfQlVGRkVSX0JJVCk7ICAgICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZkcmF3XCIpO1xuXG4gICAgICAgIHRoaXMucHJvZ3JhbUluZm8ubG9hZGVkLmRzdENvb3JkID0gdHJ1ZTtcbiAgICAgICAgLy90aGlzLmdsLmRyYXdBcnJheXModGhpcy5nbC5UUklBTkdMRVMsIDAsIGZyb21Db29yZHMubGVuZ3RoIC8gMik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnbFVwZGF0ZVRvKHRvQ29vcmRzOiBudW1iZXJbXSkge1xuICAgICAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHRoaXMucHJvZ3JhbUluZm8uYnVmZmVycy52ZXJ0ZXhCdWZmZXJUbyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZmRhdGFcIik7XG4gICAgICAgIHRoaXMuZ2wuYnVmZmVyRGF0YSh0aGlzLmdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheSh0b0Nvb3JkcyksIHRoaXMuZ2wuU1RBVElDX0RSQVcpOyAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZmF0dHJpYlwiKTtcblxuICAgICAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIoIHRoaXMucHJvZ3JhbUluZm8uYXR0cmliTG9jYXRpb25zLnZlcnRleFBvc2l0aW9uVG8sIDIsIHRoaXMuZ2wuRkxPQVQsIGZhbHNlLCAwLCAwICk7XG4gICAgICAgIHRoaXMuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoIHRoaXMucHJvZ3JhbUluZm8uYXR0cmliTG9jYXRpb25zLnZlcnRleFBvc2l0aW9uVG8gKTtcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYmVmY2xlYXJcIik7XG4gICAgICBcblxuICAgICAgICAvL3RoaXMuZ2wuY2xlYXJDb2xvcigwLjAsIDAuMCwgMC4wLCAxLjApO1xuICAgICAgICAvL3RoaXMuZ2wuY2xlYXIodGhpcy5nbC5DT0xPUl9CVUZGRVJfQklUKTsgICAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZmRyYXdcIik7XG5cbiAgICAgICAgLy90aGlzLmdsLmRyYXdBcnJheXModGhpcy5nbC5UUklBTkdMRVMsIDAsIGZyb21Db29yZHMubGVuZ3RoIC8gMik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnbEludGVycG9sYXRlKHg6IG51bWJlcikge1xuICAgICAgICB0aGlzLmdsLnVuaWZvcm0xZih0aGlzLnByb2dyYW1JbmZvLnVuaWZvcm1Mb2NhdGlvbnMuYW5pbWF0aW9uWCwgeCk7XG4gICAgICAgIHRoaXMuZ2xEZWZlcnJlZERyYXcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdsRGVmZXJyZWREcmF3KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9ncmFtSW5mby5sb2FkZWQudGV4dHVyZSAmJiB0aGlzLnByb2dyYW1JbmZvLmxvYWRlZC50ZXhDb29yZCAmJiB0aGlzLnByb2dyYW1JbmZvLmxvYWRlZC5kc3RDb29yZCkge1xuICAgICAgICAgICAgdGhpcy5nbC5kcmF3QXJyYXlzKHRoaXMuZ2wuVFJJQU5HTEVTLCAwLCB0aGlzLnZlcnRleENvdW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFNoYWRlclByb2dyYW0odnNTb3VyY2U6IHN0cmluZywgZnNTb3VyY2U6IHN0cmluZykge1xuICAgICAgICBjb25zdCB2ZXJ0ZXhTaGFkZXIgPSB0aGlzLmxvYWRTaGFkZXIodGhpcy5nbC5WRVJURVhfU0hBREVSLCB2c1NvdXJjZSk7XG4gICAgICAgIGNvbnN0IGZyYWdtZW50U2hhZGVyID0gdGhpcy5sb2FkU2hhZGVyKHRoaXMuZ2wuRlJBR01FTlRfU0hBREVSLCBmc1NvdXJjZSk7XG4gICAgXG4gICAgICAgIGNvbnN0IHNoYWRlclByb2dyYW0gPSB0aGlzLmdsLmNyZWF0ZVByb2dyYW0oKTtcbiAgICAgICAgaWYgKCFzaGFkZXJQcm9ncmFtIHx8ICF2ZXJ0ZXhTaGFkZXIgfHwgIWZyYWdtZW50U2hhZGVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nbC5hdHRhY2hTaGFkZXIoc2hhZGVyUHJvZ3JhbSwgdmVydGV4U2hhZGVyKTtcbiAgICAgICAgdGhpcy5nbC5hdHRhY2hTaGFkZXIoc2hhZGVyUHJvZ3JhbSwgZnJhZ21lbnRTaGFkZXIpO1xuICAgICAgICB0aGlzLmdsLmxpbmtQcm9ncmFtKHNoYWRlclByb2dyYW0pO1xuICAgIFxuICAgICAgICBpZiAoIXRoaXMuZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihzaGFkZXJQcm9ncmFtLCB0aGlzLmdsLkxJTktfU1RBVFVTKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2hhZGVycyBwcm9ncmFtIGZhaWxlZFwiKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICByZXR1cm4gc2hhZGVyUHJvZ3JhbTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRTaGFkZXIodHlwZTogbnVtYmVyLCBzb3VyY2U6IHN0cmluZykge1xuICAgICAgICBjb25zdCBzaGFkZXIgPSB0aGlzLmdsLmNyZWF0ZVNoYWRlcih0eXBlKTtcbiAgICAgICAgaWYgKCFzaGFkZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSAgICBcbiAgICAgICAgdGhpcy5nbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzb3VyY2UpO1xuICAgICAgICB0aGlzLmdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTsgICAgXG4gICAgICAgIGlmICghdGhpcy5nbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCB0aGlzLmdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgICAgICAgdGhpcy5nbC5kZWxldGVTaGFkZXIoc2hhZGVyKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvbXBpbGluZyBzaGFkZXJzIGZhaWxlZFwiKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICByZXR1cm4gc2hhZGVyO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgVmVjdG9yIHtcbiAgICBzdGF0aWMgTlVMTDogVmVjdG9yID0gbmV3IFZlY3RvcigwLCAwKTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB4OiBudW1iZXIsIHB1YmxpYyB5OiBudW1iZXIpIHtcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbUFycmF5KGFycjogbnVtYmVyW10pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IoYXJyWzBdLCBhcnJbMV0pO1xuICAgIH1cblxuICAgIGdldCBsZW5ndGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh0aGlzLngsIDIpICsgTWF0aC5wb3codGhpcy55LCAyKSk7XG4gICAgfVxuXG4gICAgZGVsdGEodGhhdDogVmVjdG9yKTogVmVjdG9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IodGhhdC54IC0gdGhpcy54LCB0aGF0LnkgLSB0aGlzLnkpO1xuICAgIH1cblxuICAgIGFkZCh0aGF0OiBWZWN0b3IpOiBWZWN0b3Ige1xuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLnggKyB0aGF0LngsIHRoaXMueSArIHRoYXQueSk7XG4gICAgfVxuXG4gICAgd2l0aExlbmd0aChsZW5ndGg6IG51bWJlcik6IFZlY3RvciB7XG4gICAgICAgIGNvbnN0IHJhdGlvID0gdGhpcy5sZW5ndGggIT0gMCA/IGxlbmd0aC90aGlzLmxlbmd0aCA6IDA7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCpyYXRpbywgdGhpcy55KnJhdGlvKTtcbiAgICB9XG5cbiAgICBiZXR3ZWVuKG90aGVyOiBWZWN0b3IsIHg6IG51bWJlcikge1xuICAgICAgICBjb25zdCBkZWx0YSA9IHRoaXMuZGVsdGEob3RoZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5hZGQoZGVsdGEud2l0aExlbmd0aChkZWx0YS5sZW5ndGgqeCkpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi9WZWN0b3JcIjtcbmltcG9ydCB7IENydW1wbGVkSW1hZ2UgfSBmcm9tIFwiLi9DcnVtcGxlZEltYWdlXCI7XG5cbmNvbnN0IEdSSURfRElNRU4gPSBuZXcgVmVjdG9yKDQwMSwgMjAxKTtcblxubGV0IG1hcHBpbmdzOiBNYXBwaW5nQ29sbGVjdGlvbiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbmxldCBpbml0aWFsID0gdHJ1ZTtcblxuaW50ZXJmYWNlIExhYmVsIHsgW2lkOiBzdHJpbmddOiBzdHJpbmcgfVxuaW50ZXJmYWNlIE1hcHBpbmcge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgbGFiZWw6IExhYmVsO1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG59XG5pbnRlcmZhY2UgTWFwcGluZ0NvbGxlY3Rpb24geyBcbiAgICBbaWQ6IHN0cmluZ106IHtcbiAgICAgICAgbGFiZWw6IExhYmVsO1xuICAgICAgICBtYXBwaW5nOiBNYXBwaW5nW107XG4gICAgfVxufTtcblxuY29uc3QgY3J1bXBsZWRNYXAgPSBuZXcgQ3J1bXBsZWRJbWFnZShHUklEX0RJTUVOLCAyMDAwKTtcblxuZnVuY3Rpb24gZmluZFRyaWFuZ2xlcyhlbGVtZW50c0NvdW50OiBudW1iZXIsIHJlc29sdmVyOiAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IFZlY3Rvcikge1xuICAgIGNvbnN0IHRyaWFuZ2xlczogW1ZlY3RvciwgVmVjdG9yLCBWZWN0b3JdW10gPSBbXVxuICAgIGNvbnN0IHJvd0NvdW50ID0gTWF0aC5mbG9vcihlbGVtZW50c0NvdW50L0dSSURfRElNRU4ueCk7XG4gICAgY29uc29sZS5sb2cocm93Q291bnQpO1xuICAgIGZvciAobGV0IGk9MDtpPEdSSURfRElNRU4ueS0xOyBpKz0xKSB7XG4gICAgICAgIGZvciAobGV0IGo9MDtqPEdSSURfRElNRU4ueC0xOyBqKz0xKSB7XG4gICAgICAgICAgICB0cmlhbmdsZXMucHVzaChbcmVzb2x2ZXIoaiwgaSksIHJlc29sdmVyKGorMSwgaSksIHJlc29sdmVyKGosIGkrMSldKTtcbiAgICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKFtyZXNvbHZlcihqKzEsIGkrMSksIHJlc29sdmVyKGorMSwgaSksIHJlc29sdmVyKGosIGkrMSldKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJpYW5nbGVzO1xufVxuXG5mdW5jdGlvbiByZWFkR3JpZChncmlkOiBzdHJpbmcpIHtcbiAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZyZWFkXCIpOyAvLzUwMG1zXG4gICAgY29uc3Qgcm93cyA9IGdyaWQuc3BsaXQoXCJcXG5cIilcbiAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZyZWFkMVwiKTtcbiAgICByb3dzLnBvcCgpO1xuICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZnJlYWQyXCIpOyBcblxuICAgIGNvbnN0IG51bWJlcnM6IG51bWJlcltdW10gPSByb3dzLm1hcChyb3cgPT4gcm93LnNwbGl0KFwiIFwiKS5tYXAocGFyc2VGbG9hdCkpO1xuICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZnJlYWQzXCIpOyBcbiAgICBjb25zdCB2ZWN0b3JzOiBWZWN0b3JbXSA9IG51bWJlcnMubWFwKHJvdyA9PiBWZWN0b3IuZnJvbUFycmF5KHJvdykpO1xuICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZnJlYWQ0XCIpOyBcblxuXG4gICAgY29uc3QgcmVzb2x2ZXIgPSAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IHtcbiAgICAgICAgY29uc3QgdiA9IHZlY3RvcnNbeSpHUklEX0RJTUVOLngreF07XG4gICAgICAgIGlmICh2ID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZXlcIiwgeCwgeSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3Iodi54LCB2LnkpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZ0cmlhbmdsZXNcIik7XG4gICAgY29uc3QgdHJpYW5nbGVzID0gZmluZFRyaWFuZ2xlcyh2ZWN0b3JzLmxlbmd0aCwgcmVzb2x2ZXIpOyAvLzYwMG1zXG4gICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiaGV5XCIpO1xuXG4gICAgY3J1bXBsZWRNYXAudXBkYXRlKHRyaWFuZ2xlcywgIWluaXRpYWwpO1xuICAgIGluaXRpYWwgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaW50ZXJwb2xhdGVNYXBwaW5nKG1hcHBpbmdzOiBNYXBwaW5nW10sIHg6IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IHVwcGVyIDogTWFwcGluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbG93ZXIgOiBNYXBwaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIGZvciAobGV0IGk9MDsgaTxtYXBwaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobWFwcGluZ3NbaV0ueCA+PSB4ICYmICh1cHBlciA9PSB1bmRlZmluZWQgfHwgbWFwcGluZ3NbaV0ueCA8IHVwcGVyLngpKSB7XG4gICAgICAgICAgICB1cHBlciA9IG1hcHBpbmdzW2ldO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXBwaW5nc1tpXS54IDw9IHggJiYgKGxvd2VyID09IHVuZGVmaW5lZCB8fCBtYXBwaW5nc1tpXS54ID4gbG93ZXIueCkpIHtcbiAgICAgICAgICAgIGxvd2VyID0gbWFwcGluZ3NbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGxvd2VyID09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAodXBwZXIgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBpbnRlcnBvbGF0aW9uIHBvc3NpYmxlXCIpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVwcGVyLnk7XG4gICAgfVxuICAgIGlmICh1cHBlciA9PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiBsb3dlci55O1xuICAgIGlmICh1cHBlciA9PSBsb3dlcilcbiAgICAgICAgcmV0dXJuIHVwcGVyLnk7XG4gICAgcmV0dXJuICh4LWxvd2VyLngpLyh1cHBlci54LWxvd2VyLngpKih1cHBlci55LWxvd2VyLnkpK2xvd2VyLnk7XG59XG5cbmZ1bmN0aW9uIGdldEJpbmFyaWVzKCk6IE1hcHBpbmdbXSB7XG4gICAgaWYgKG1hcHBpbmdzID09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHJldHVybiBtYXBwaW5ncy55ZWFyLm1hcHBpbmcuY29uY2F0KG1hcHBpbmdzLnBhcmFtZXRlcnMubWFwcGluZywgbWFwcGluZ3MubWV0cmljcy5tYXBwaW5nLCBtYXBwaW5ncy5pbXBhY3RzLm1hcHBpbmcpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb250cm9scygpIHtcbiAgICBpZiAobWFwcGluZ3MgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjb250cm9scyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9scycpO1xuICAgIGlmIChjb250cm9scyA9PSB1bmRlZmluZWQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IHBvcHVsYXRlIGNvbnRyb2xzXCIpXG5cbiAgICBjb25zdCBiaW5hcmllcyA9IGdldEJpbmFyaWVzKCk7XG4gICAgY29uc29sZS5sb2coYmluYXJpZXMpO1xuXG4gICAgZm9yIChsZXQgaT0wOyBpPGJpbmFyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgY2hlY2tib3gudHlwZSA9ICdjaGVja2JveCc7XG4gICAgICAgIGNoZWNrYm94Lm5hbWUgPSBiaW5hcmllc1tpXS5pZDtcbiAgICAgICAgY2hlY2tib3guaWQgPSBiaW5hcmllc1tpXS5pZDtcbiAgICAgICAgY2hlY2tib3gub25pbnB1dCA9IHVwZGF0ZU1hcDtcblxuICAgICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIGxhYmVsLmh0bWxGb3IgPSBiaW5hcmllc1tpXS5pZDtcbiAgICAgICAgbGFiZWwuaW5uZXJIVE1MID0gYmluYXJpZXNbaV0ubGFiZWwuZW47XG5cbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChjaGVja2JveCk7XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgICAgIGNvbnRyb2xzLmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgIGNvbnNvbGUubG9nKGJpbmFyaWVzW2ldLmlkKTtcbiAgICB9XG4gICAgdXBkYXRlTWFwKCk7XG59XG5cbmZ1bmN0aW9uIGlzQ2hlY2tlZChpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkpLmNoZWNrZWRcbn1cblxuZnVuY3Rpb24gcGVybXV0YXRpb25TdHIoYmluYXJpZXM6IE1hcHBpbmdbXSkge1xuICAgIHJldHVybiBiaW5hcmllcy5tYXAoYiA9PiBiLmlkK1wiLVwiKygraXNDaGVja2VkKGIuaWQpKSkuam9pbihcIl9cIik7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZU1hcCgpIHtcbiAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJ1cGQgdHJpZ1wiKVxuICAgIGlmIChtYXBwaW5ncyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB5ZWFyMjEwMCA9IGlzQ2hlY2tlZChtYXBwaW5ncy55ZWFyLm1hcHBpbmdbMF0uaWQpO1xuICAgIGNvbnN0IGVtaXNzaW9ucyA9IHllYXIyMTAwID8gY3VtdWxhdGVDbzJFbWlzc2lvbnMoKSA6IDA7XG4gICAgY29uc29sZS5sb2coJ0N1bXVsYXRlZCBDTzIgZW1pc3Npb25zOicsIGVtaXNzaW9ucyk7XG4gICAgY29uc3QgdGVtcGVyYXR1cmUgPSBpbnRlcnBvbGF0ZU1hcHBpbmcobWFwcGluZ3MuaW1wYWN0c19zY2VuYXJpb3MubWFwcGluZywgZW1pc3Npb25zKTtcbiAgICBjb25zb2xlLmxvZygnVGVtcGVyYXR1cmUgZm9yZWNhc3Q6JywgdGVtcGVyYXR1cmUpO1xuICAgIHVwZGF0ZVRlbXBlcmF0dXJlKHRlbXBlcmF0dXJlKTtcblxuICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZmZldGNoXCIpO1xuXG4gICAgZmV0Y2goJ2RhdGEvJytwZXJtdXRhdGlvblN0cihnZXRCaW5hcmllcygpKSsnLmNzdicpIC8vMTAwbXNcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZnRleHRcIik7XG4gICAgICAgIGNvbnN0IHQgPSByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImFmenRleHRcIik7XG4gICAgICAgIHJldHVybiB0O1xuXG4gICAgfSlcbiAgICAudGhlbihncmlkID0+IHJlYWRHcmlkKGdyaWQpKTtcbn1cblxuZnVuY3Rpb24gY3VtdWxhdGVDbzJFbWlzc2lvbnMoKSB7XG4gICAgaWYgKG1hcHBpbmdzID09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgbGV0IGN1bXVsX2NvMiA9IG1hcHBpbmdzLnllYXIubWFwcGluZ1swXS55O1xuICAgIGNvbnN0IHBhcmFtcyA9IG1hcHBpbmdzLnBhcmFtZXRlcnMubWFwcGluZ1xuICAgIGZvciAobGV0IGk9MDsgaTxwYXJhbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY2hlY2tib3ggPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJhbXNbaV0uaWQpO1xuICAgICAgICBpZiAoY2hlY2tib3guY2hlY2tlZCkge1xuICAgICAgICAgICAgY3VtdWxfY28yICs9IHBhcmFtc1tpXS55O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjdW11bF9jbzI7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRlbXBlcmF0dXJlKHRlbXBlcmF0dXJlOiBudW1iZXIpIHtcbiAgICBjb25zdCB0ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZW1wZXJhdHVyZScpO1xuICAgIHQuaW5uZXJIVE1MID0gTWF0aC5yb3VuZCgodGVtcGVyYXR1cmUrMSkqMTApLzEwK1wiXCI7XG59XG5cbmZ1bmN0aW9uIGxvYWRNYXBwaW5ncygpIHtcbiAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJodHRwMVwiKTtcbiAgICBmZXRjaCgncmVzL21hcHBpbmdzLmpzb24nKVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwicmVzXCIpO1xuICAgICAgICBtYXBwaW5ncyA9IGpzb247XG4gICAgICAgIGNyZWF0ZUNvbnRyb2xzKCk7XG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImZha2V0cmlhbmdcIik7XG4gICAgICAgICAgICBjcnVtcGxlZE1hcC5zZXRUZXhDb29yZHMoZmluZFRyaWFuZ2xlcyhHUklEX0RJTUVOLngqR1JJRF9ESU1FTi55LCAoeCwgeSkgPT4gbmV3IFZlY3Rvcih4LCB5KSkpOyAvLyA2MDBtc1xuICAgICAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYWZ0ZXJmYWtldHJpYW5nXCIpO1xuICAgICAgICB9LCAxKTtcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJodHRwMlwiKTtcbn1cblxubG9hZE1hcHBpbmdzKCk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbi1leHBvc2VkLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9