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
const Vector_1 = __webpack_require__(/*! ./Vector */ "./src/Vector.ts");
const CrumpledImage_1 = __webpack_require__(/*! ./CrumpledImage */ "./src/CrumpledImage-exposed.ts");
const GRID_DIMEN = new Vector_1.Vector(601, 301);
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
    rows.pop();
    const vectors = rows.map(row => Vector_1.Vector.fromArray(row.split(" ").map(parseFloat)));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WUFBWSxDQUFDLENBQUM7WUFDN0MsV0FBVyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxlQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVE7WUFDeEcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUN0RCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDVixDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFFRCxZQUFZLEVBQUUsQ0FBQzs7Ozs7OztVQy9MZjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7VUVQRDtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvLi9zcmMvQW5pbWF0b3IudHM/MGNiOCIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zLy4vc3JjL0NydW1wbGVkSW1hZ2UtZXhwb3NlZC50cyIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zLy4vc3JjL1ZlY3Rvci50cz81MWQ5Iiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvLi9zcmMvbWFpbi1leHBvc2VkLnRzIiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvLi9ub2RlX21vZHVsZXMvZXhwb3NlLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0R2xvYmFsVGhpcy5qcyIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zLy4vc3JjL0FuaW1hdG9yLnRzIiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvLi9zcmMvQ3J1bXBsZWRJbWFnZS50cyIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zLy4vc3JjL1ZlY3Rvci50cyIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCItIS4uL25vZGVfbW9kdWxlcy90cy1sb2FkZXIvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbMF0udXNlWzFdIS4vQW5pbWF0b3IudHNcIik7XG52YXIgX19fRVhQT1NFX0xPQURFUl9HRVRfR0xPQkFMX1RISVNfX18gPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2V4cG9zZS1sb2FkZXIvZGlzdC9ydW50aW1lL2dldEdsb2JhbFRoaXMuanNcIik7XG52YXIgX19fRVhQT1NFX0xPQURFUl9HTE9CQUxfVEhJU19fXyA9IF9fX0VYUE9TRV9MT0FERVJfR0VUX0dMT0JBTF9USElTX19fO1xuX19fRVhQT1NFX0xPQURFUl9HTE9CQUxfVEhJU19fX1tcIkNDQ1wiXSA9IF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fO1xubW9kdWxlLmV4cG9ydHMgPSBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXztcbiIsInZhciBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCItIS4uL25vZGVfbW9kdWxlcy90cy1sb2FkZXIvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbMF0udXNlWzFdIS4vQ3J1bXBsZWRJbWFnZS50c1wiKTtcbnZhciBfX19FWFBPU0VfTE9BREVSX0dFVF9HTE9CQUxfVEhJU19fXyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvZXhwb3NlLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0R2xvYmFsVGhpcy5qc1wiKTtcbnZhciBfX19FWFBPU0VfTE9BREVSX0dMT0JBTF9USElTX19fID0gX19fRVhQT1NFX0xPQURFUl9HRVRfR0xPQkFMX1RISVNfX187XG5fX19FWFBPU0VfTE9BREVSX0dMT0JBTF9USElTX19fW1wiQ0NDXCJdID0gX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX187XG5tb2R1bGUuZXhwb3J0cyA9IF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fO1xuIiwidmFyIF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fID0gcmVxdWlyZShcIi0hLi4vbm9kZV9tb2R1bGVzL3RzLWxvYWRlci9pbmRleC5qcz8/cnVsZVNldFsxXS5ydWxlc1swXS51c2VbMV0hLi9WZWN0b3IudHNcIik7XG52YXIgX19fRVhQT1NFX0xPQURFUl9HRVRfR0xPQkFMX1RISVNfX18gPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2V4cG9zZS1sb2FkZXIvZGlzdC9ydW50aW1lL2dldEdsb2JhbFRoaXMuanNcIik7XG52YXIgX19fRVhQT1NFX0xPQURFUl9HTE9CQUxfVEhJU19fXyA9IF9fX0VYUE9TRV9MT0FERVJfR0VUX0dMT0JBTF9USElTX19fO1xuX19fRVhQT1NFX0xPQURFUl9HTE9CQUxfVEhJU19fX1tcIkNDQ1wiXSA9IF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fO1xubW9kdWxlLmV4cG9ydHMgPSBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXztcbiIsInZhciBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCItIS4uL25vZGVfbW9kdWxlcy90cy1sb2FkZXIvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbMF0udXNlWzFdIS4vbWFpbi50c1wiKTtcbnZhciBfX19FWFBPU0VfTE9BREVSX0dFVF9HTE9CQUxfVEhJU19fXyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvZXhwb3NlLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0R2xvYmFsVGhpcy5qc1wiKTtcbnZhciBfX19FWFBPU0VfTE9BREVSX0dMT0JBTF9USElTX19fID0gX19fRVhQT1NFX0xPQURFUl9HRVRfR0xPQkFMX1RISVNfX187XG5fX19FWFBPU0VfTE9BREVSX0dMT0JBTF9USElTX19fW1wiQ0NDXCJdID0gX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX187XG5tb2R1bGUuZXhwb3J0cyA9IF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSBcIm9iamVjdFwiKSB7XG4gICAgcmV0dXJuIGdsb2JhbFRoaXM7XG4gIH1cblxuICB2YXIgZztcblxuICB0cnkge1xuICAgIC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICAgIGcgPSB0aGlzIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSB7XG4gICAgICByZXR1cm4gd2luZG93O1xuICAgIH0gLy8gVGhpcyB3b3JrcyBpZiB0aGUgc2VsZiByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cblxuICAgIGlmICh0eXBlb2Ygc2VsZiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSAvLyBUaGlzIHdvcmtzIGlmIHRoZSBnbG9iYWwgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXG5cbiAgICBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgcmV0dXJuIGdsb2JhbDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZztcbn0oKTsiLCJleHBvcnQgY2xhc3MgQW5pbWF0b3Ige1xuXG4gICAgc3RhdGljIEVBU0VfTk9ORTogKHg6IG51bWJlcikgPT4gbnVtYmVyID0geCA9PiB4O1xuICAgIHN0YXRpYyBFQVNFX0NVQklDOiAoeDogbnVtYmVyKSA9PiBudW1iZXIgPSB4ID0+IHggPCAwLjUgPyA0ICogeCAqIHggKiB4IDogMSAtIE1hdGgucG93KC0yICogeCArIDIsIDMpIC8gMjtcbiAgICBzdGF0aWMgRUFTRV9TSU5FOiAoeDogbnVtYmVyKSA9PiBudW1iZXIgPSB4ID0+IC0oTWF0aC5jb3MoTWF0aC5QSSAqIHgpIC0gMSkgLyAyO1xuICAgIFxuICAgIHByaXZhdGUgX2Zyb206IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfdG86IG51bWJlciA9IDE7XG4gICAgcHJpdmF0ZSBfdGltZVBhc3NlZDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9lYXNlOiAoeDogbnVtYmVyKSA9PiBudW1iZXIgPSBBbmltYXRvci5FQVNFX05PTkU7XG5cbiAgICBwcml2YXRlIGNhbGxiYWNrOiAoeDogbnVtYmVyLCBpc0xhc3Q6IGJvb2xlYW4pID0+IGJvb2xlYW4gPSB4ID0+IHRydWU7XG4gICAgcHJpdmF0ZSBzdGFydFRpbWU6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBkdXJhdGlvbk1pbGxpc2Vjb25kczogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIHB1YmxpYyBmcm9tKGZyb206IG51bWJlcik6IEFuaW1hdG9yIHtcbiAgICAgICAgdGhpcy5fZnJvbSA9IGZyb207XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyB0byh0bzogbnVtYmVyKTogQW5pbWF0b3Ige1xuICAgICAgICB0aGlzLl90byA9IHRvO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgdGltZVBhc3NlZCh0aW1lUGFzc2VkOiBudW1iZXIpOiBBbmltYXRvciB7XG4gICAgICAgIHRoaXMuX3RpbWVQYXNzZWQgPSB0aW1lUGFzc2VkO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZWFzZShlYXNlOiAoeDogbnVtYmVyKSA9PiBudW1iZXIpOiBBbmltYXRvciB7XG4gICAgICAgIHRoaXMuX2Vhc2UgPSBlYXNlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgd2FpdChkZWxheU1pbGxpc2Vjb25kczogbnVtYmVyLCBjYWxsYmFjazogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICBpZiAoZGVsYXlNaWxsaXNlY29uZHMgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWVvdXQoY2FsbGJhY2ssIGRlbGF5TWlsbGlzZWNvbmRzKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjaygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhbmltYXRlKGR1cmF0aW9uTWlsbGlzZWNvbmRzOiBudW1iZXIsIGNhbGxiYWNrOiAoeDogbnVtYmVyLCBpc0xhc3Q6IGJvb2xlYW4pID0+IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kdXJhdGlvbk1pbGxpc2Vjb25kcyA9IGR1cmF0aW9uTWlsbGlzZWNvbmRzO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gdGhpcy5ub3coKTtcbiAgICAgICAgdGhpcy5mcmFtZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZnJhbWUoKSB7XG4gICAgICAgIGNvbnN0IG5vdyA9IHRoaXMubm93KCk7XG4gICAgICAgIGxldCB4ID0gMTtcbiAgICAgICAgaWYgKHRoaXMuZHVyYXRpb25NaWxsaXNlY29uZHMgPiAwKSB7XG4gICAgICAgICAgICB4ID0gKG5vdy10aGlzLnN0YXJ0VGltZSt0aGlzLl90aW1lUGFzc2VkKSAvIHRoaXMuZHVyYXRpb25NaWxsaXNlY29uZHM7XG4gICAgICAgIH1cbiAgICAgICAgeCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHgpKTtcbiAgICAgICAgY29uc3QgeSA9IHRoaXMuX2Zyb20gKyAodGhpcy5fdG8tdGhpcy5fZnJvbSkgKiB0aGlzLl9lYXNlKHgpO1xuICAgICAgICBjb25zdCBjb250ID0gdGhpcy5jYWxsYmFjayh5LCB4ID09IDEpO1xuICAgICAgICBpZiAoY29udCAmJiB4IDwgMSkge1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0RnJhbWUoKCkgPT4gdGhpcy5mcmFtZSgpKTtcbiAgICAgICAgfSBlbHNlIGlmICghY29udCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1N0b3BwZWQgYW5pbWF0aW9uIGJlY2F1c2UgY2FsbGJhY2sgcmV0dXJuZWQgZmFsc2UuJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG5vdygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0aW1lb3V0KGNhbGxiYWNrOiAoKSA9PiB2b2lkLCBkZWxheU1pbGxpc2Vjb25kczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCBkZWxheU1pbGxpc2Vjb25kcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXF1ZXN0RnJhbWUoY2FsbGJhY2s6ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShjYWxsYmFjayk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQW5pbWF0b3IgfSBmcm9tIFwiLi9BbmltYXRvclwiO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4vVmVjdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBDcnVtcGxlZEltYWdlIHtcbiAgICBwcml2YXRlIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgcHJpdmF0ZSBjYW52YXNEaW1lbjogVmVjdG9yID0gVmVjdG9yLk5VTEw7XG4gICAgcHJpdmF0ZSBjYW52YXNUbDogVmVjdG9yID0gVmVjdG9yLk5VTEw7XG4gICAgcHJpdmF0ZSBpbWdEaW1lbjogVmVjdG9yID0gVmVjdG9yLk5VTEw7XG4gICAgcHJpdmF0ZSB2ZXJ0ZXhDb3VudCA9IDA7XG4gICAgcHJpdmF0ZSBwcm9ncmFtSW5mbzogYW55O1xuICAgIHByaXZhdGUgZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dDtcbiAgICBwcml2YXRlIG5vbmNlID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JpZERpbWVuOiBWZWN0b3IsIHByaXZhdGUgYW5pbWF0aW9uRHVyYXRpb25NczogbnVtYmVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImNydTFcIik7XG4gICAgICAgIHRoaXMuY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKTtcbiAgICAgICAgdGhpcy5yZXNpemVDYW52YXMoKTtcbiAgICAgICAgdGhpcy5nbCA9IDxXZWJHTFJlbmRlcmluZ0NvbnRleHQ+dGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wnKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHRoaXMucmVzaXplQ2FudmFzKCksIGZhbHNlKTtcbiAgICAgICAgdGhpcy5nbFNldHVwKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImNydTJcIik7XG4gICAgICAgIHRoaXMuc2V0VGV4dHVyZSgpOyAgICAgICAgICAgICAgICAgICAgIFxuICAgIH1cblxuICAgIHNldFRleENvb3JkcyhzcmNUcmlhbmdsZXM6IFtWZWN0b3IsIFZlY3RvciwgVmVjdG9yXVtdKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IHRoaXMubWF0cml4Q29udmVydENvb3JkcyhzcmNUcmlhbmdsZXMpO1xuICAgICAgICB0aGlzLnZlcnRleENvdW50ID0gY3VycmVudFN0YXRlLmxlbmd0aCAvIDI7XG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZnNyY1wiKTtcbiAgICAgICAgY29uc3QgdGV4Q29vcmRzID0gdGhpcy5tYXRyaXhDb252ZXJ0Q29vcmRzKHNyY1RyaWFuZ2xlcywgdiA9PiB0aGlzLmdyaWQySW1nQ29vcmRzKHYpKTsgLy8gMTAwbXNcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYmVmc2V0aXBcIik7XG4gICAgICAgIHRoaXMuZ2xVcGRhdGVGcm9tKGN1cnJlbnRTdGF0ZSk7XG4gICAgICAgIHRoaXMuZ2xUZXhDb29yZHModGV4Q29vcmRzKTtcbiAgICAgICBcbiAgICBcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYWZ0ZXJzZXR1cFwiKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgdGhpcy5jYW52YXNEaW1lbik7XG4gICAgICAgIFxuICAgIH1cblxuICAgIHByaXZhdGUgcmVzaXplQ2FudmFzKCkge1xuICAgICAgICBjb25zdCByID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHRoaXMuY2FudmFzRGltZW4gPSBuZXcgVmVjdG9yKHIud2lkdGgsIHIuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5jYW52YXNUbCA9IG5ldyBWZWN0b3Ioci50b3AsIHIubGVmdCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRQcmVmZXJyZWRJbWdSZXNvbHV0aW9uKCkge1xuICAgICAgICBjb25zdCBhdmFpbGFibGUgPSBbMTAyNCwgMjA0OCwgNDA5NiwgODE5Ml07XG4gICAgICAgIGNvbnN0IG1heCA9IHRoaXMuZ2wuZ2V0UGFyYW1ldGVyKHRoaXMuZ2wuTUFYX1RFWFRVUkVfU0laRSkvMjtcbiAgICAgICAgbGV0IGZvdW5kID0gdW5kZWZpbmVkO1xuICAgICAgICBmb3IobGV0IGk9MDsgaTxhdmFpbGFibGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChhdmFpbGFibGVbaV0gPD0gbWF4KSB7XG4gICAgICAgICAgICAgICAgZm91bmQgPSBhdmFpbGFibGVbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvdW5kID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJObyB0ZXh0dXJlIHNpemUgZm91bmRcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJUZXh0dXJlIHNpemU6XCIsIGZvdW5kKTtcbiAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0VGV4dHVyZSgpIHtcbiAgICAgICAgY29uc3QgaW0gPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW0ub25sb2FkID0gKCkgPT4geyAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmltZ0RpbWVuID0gbmV3IFZlY3RvcihpbS53aWR0aCwgaW0uaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuZ2xUZXh0dXJlKGltKTtcbiAgICAgICAgfVxuICAgICAgICBpbS5zcmMgPSBcInJlcy9tYXBfXCIrdGhpcy5nZXRQcmVmZXJyZWRJbWdSZXNvbHV0aW9uKCkrXCJ4LmpwZ1wiOyAgXG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImNydTNcIik7IFxuICAgIH1cblxuICAgIHVwZGF0ZShuZXdTdGF0ZTogW1ZlY3RvciwgVmVjdG9yLCBWZWN0b3JdW10sIGFuaW1hdGU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwicmVjZWl2ZWQgdXBkYXRlXCIpO1xuICAgICAgICBjb25zdCBuZXdTdGF0ZUNhbnZhcyA9IHRoaXMubWF0cml4Q29udmVydENvb3JkcyhuZXdTdGF0ZSk7IC8vMjAwbXNcbiAgICAgICAgdGhpcy5tYXBUcmlhbmdsZXMobmV3U3RhdGVDYW52YXMpO1xuXG4gICAgICAgIHRoaXMubm9uY2UrKztcbiAgICAgICAgaWYgKCFhbmltYXRlKSB7XG4gICAgICAgICAgICB0aGlzLmdsSW50ZXJwb2xhdGUoMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYW5pbWF0b3IgPSBuZXcgQW5pbWF0b3IoKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG5vbmNlID0gdGhpcy5ub25jZTtcbiAgICAgICAgYW5pbWF0b3IuYW5pbWF0ZSh0aGlzLmFuaW1hdGlvbkR1cmF0aW9uTXMsICh4LCBpc0xhc3QpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm5vbmNlICE9IG5vbmNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwic3RhcnRlZCB1cGRhdGVcIik7XG4gICAgICAgICAgICB0aGlzLmdsSW50ZXJwb2xhdGUoeCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChpc0xhc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdsVXBkYXRlRnJvbShuZXdTdGF0ZUNhbnZhcylcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJhcHBsaWVkIHVwZGF0ZVwiLCBwZXJmb3JtYW5jZS5ub3coKS1zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTsgICAgICAgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYXBUcmlhbmdsZXMobmV3U3RhdGU6IG51bWJlcltdKSB7XG4gICAgICAgIGlmIChuZXdTdGF0ZS5sZW5ndGgvMiAhPSB0aGlzLnZlcnRleENvdW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJuZXdTdGF0ZSBoYXMgZGlmZmVyZW50IGxlbmd0aCAoXCIrbmV3U3RhdGUubGVuZ3RoLzIrXCIpIHRoYW4gY3VycmVudFN0YXRlIChcIit0aGlzLnZlcnRleENvdW50K1wiKVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZkc3RcIik7XG4gICAgICAgIFxuICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZnVwZFwiKTtcbiAgICAgICAgdGhpcy5nbFVwZGF0ZVRvKG5ld1N0YXRlKTtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBncmlkMkltZ0Nvb3Jkcyh2OiBWZWN0b3IpIHtcbiAgICAgICAgY29uc3Qgc2NhbGUgPSAxIC8gdGhpcy5ncmlkRGltZW4ueDtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3Iodi54KnNjYWxlLCB2Lnkqc2NhbGUqMik7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgZ3JpZDJDYW52YXNDb29yZHModjogVmVjdG9yKSB7XG4gICAgICAgIGNvbnN0IHNjYWxlID0gMiAvIHRoaXMuZ3JpZERpbWVuLng7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHYueCpzY2FsZS0xLCB2LnkqLTIvdGhpcy5ncmlkRGltZW4ueSsxKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1hdHJpeENvbnZlcnRDb29yZHMobWF0cml4OiBbVmVjdG9yLCBWZWN0b3IsIFZlY3Rvcl1bXSwgbWFwcGluZzogKHY6IFZlY3RvcikgPT4gVmVjdG9yID0gKHYpID0+IHRoaXMuZ3JpZDJDYW52YXNDb29yZHModikpIHtcbiAgICAgICAgY29uc3QgY29vcmRzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpPTA7aTxtYXRyaXgubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgY29uc3QgZHN0ID0gbWF0cml4W2ldLm1hcCgoYzogVmVjdG9yKSA9PiBtYXBwaW5nKGMpKTtcbiAgICAgICAgICAgIGNvb3Jkcy5wdXNoKGRzdFswXS54LCBkc3RbMF0ueSwgZHN0WzFdLngsIGRzdFsxXS55LCBkc3RbMl0ueCwgZHN0WzJdLnkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb29yZHM7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgZ2xTZXR1cCgpIHtcbiAgICAgICAgY29uc3QgZnNTb3VyY2UgPSBgXG4gICAgICAgICAgICB2YXJ5aW5nIGhpZ2hwIHZlYzIgdlRleHR1cmVDb29yZDtcblxuICAgICAgICAgICAgdW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7XG5cbiAgICAgICAgICAgIHZvaWQgbWFpbih2b2lkKSB7XG4gICAgICAgICAgICBnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlMkQodVNhbXBsZXIsIHZUZXh0dXJlQ29vcmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICBgO1xuXG4gICAgICAgIGNvbnN0IHZzU291cmNlID0gYFxuICAgICAgICAgICAgYXR0cmlidXRlIHZlYzQgYVZlcnRleFBvc2l0aW9uRnJvbTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWM0IGFWZXJ0ZXhQb3NpdGlvblRvO1xuICAgICAgICAgICAgYXR0cmlidXRlIHZlYzIgYVRleHR1cmVDb29yZDtcbiAgICAgICAgICAgIHVuaWZvcm0gZmxvYXQgdUFuaW1hdGlvblg7IFxuXG4gICAgICAgICAgICB2YXJ5aW5nIGhpZ2hwIHZlYzIgdlRleHR1cmVDb29yZDtcblxuICAgICAgICAgICAgdm9pZCBtYWluKHZvaWQpIHtcbiAgICAgICAgICAgIGdsX1Bvc2l0aW9uID0gYVZlcnRleFBvc2l0aW9uRnJvbSooMS4wLXVBbmltYXRpb25YKSthVmVydGV4UG9zaXRpb25Ubyp1QW5pbWF0aW9uWDtcbiAgICAgICAgICAgIHZUZXh0dXJlQ29vcmQgPSBhVGV4dHVyZUNvb3JkO1xuICAgICAgICAgICAgfVxuICAgICAgICBgO1xuXG4gICAgICAgIGNvbnN0IHNoYWRlclByb2dyYW0gPSB0aGlzLmluaXRTaGFkZXJQcm9ncmFtKHZzU291cmNlLCBmc1NvdXJjZSk7XG4gICAgICAgIGlmICghc2hhZGVyUHJvZ3JhbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvZ3JhbUluZm8gPSB7XG4gICAgICAgICAgICBwcm9ncmFtOiBzaGFkZXJQcm9ncmFtLFxuICAgICAgICAgICAgYXR0cmliTG9jYXRpb25zOiB7XG4gICAgICAgICAgICAgIHZlcnRleFBvc2l0aW9uRnJvbTogdGhpcy5nbC5nZXRBdHRyaWJMb2NhdGlvbihzaGFkZXJQcm9ncmFtLCAnYVZlcnRleFBvc2l0aW9uRnJvbScpLFxuICAgICAgICAgICAgICB2ZXJ0ZXhQb3NpdGlvblRvOiB0aGlzLmdsLmdldEF0dHJpYkxvY2F0aW9uKHNoYWRlclByb2dyYW0sICdhVmVydGV4UG9zaXRpb25UbycpLFxuICAgICAgICAgICAgICB0ZXh0dXJlQ29vcmQ6IHRoaXMuZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ2FUZXh0dXJlQ29vcmQnKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1bmlmb3JtTG9jYXRpb25zOiB7XG4gICAgICAgICAgICAgIGFuaW1hdGlvblg6IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlclByb2dyYW0sICd1QW5pbWF0aW9uWCcpLFxuICAgICAgICAgICAgICB1U2FtcGxlcjogdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ3VTYW1wbGVyJyksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnVmZmVyczoge1xuICAgICAgICAgICAgICAgIHZlcnRleEJ1ZmZlckZyb206IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCksXG4gICAgICAgICAgICAgICAgdmVydGV4QnVmZmVyVG86IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsb2FkZWQ6IHtcbiAgICAgICAgICAgICAgICB0ZXh0dXJlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0ZXhDb29yZDogZmFsc2UsIFxuICAgICAgICAgICAgICAgIGRzdENvb3JkOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdsLnVzZVByb2dyYW0odGhpcy5wcm9ncmFtSW5mby5wcm9ncmFtKTtcblxuICAgICAgICB0aGlzLmdsLnZpZXdwb3J0KDAsIDAsIHRoaXMuZ2wuY2FudmFzLndpZHRoLCB0aGlzLmdsLmNhbnZhcy5oZWlnaHQpO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZ2wudW5pZm9ybTFpKHRoaXMucHJvZ3JhbUluZm8udW5pZm9ybUxvY2F0aW9ucy51U2FtcGxlciwgMCk7XG4gICAgICAgIHRoaXMuZ2wudW5pZm9ybTFmKHRoaXMucHJvZ3JhbUluZm8udW5pZm9ybUxvY2F0aW9ucy5hbmltYXRpb25YLCAwLjApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2xUZXhDb29yZHModGV4Q29vcmRzOiBudW1iZXJbXSkge1xuICAgICAgICBjb25zdCB0ZXhDb29yZEJ1ZmZlciA9IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgdGV4Q29vcmRCdWZmZXIpO1xuICAgICAgICB0aGlzLmdsLmJ1ZmZlckRhdGEodGhpcy5nbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodGV4Q29vcmRzKSwgdGhpcy5nbC5TVEFUSUNfRFJBVyk7XG4gICAgICAgIHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlciggdGhpcy5wcm9ncmFtSW5mby5hdHRyaWJMb2NhdGlvbnMudGV4dHVyZUNvb3JkLCAyLCB0aGlzLmdsLkZMT0FULCBmYWxzZSwgMCwgMCApO1xuICAgICAgICB0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KCB0aGlzLnByb2dyYW1JbmZvLmF0dHJpYkxvY2F0aW9ucy50ZXh0dXJlQ29vcmQgKTtcblxuICAgICAgICB0aGlzLnByb2dyYW1JbmZvLmxvYWRlZC50ZXhDb29yZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZ2xEZWZlcnJlZERyYXcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdsVGV4dHVyZShpbTogSFRNTEltYWdlRWxlbWVudCkge1xuICAgICAgICBjb25zdCB0ZXhOYW1lID0gdGhpcy5nbC5jcmVhdGVUZXh0dXJlKCk7XG4gICAgICAgIHRoaXMuZ2wuYWN0aXZlVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkUwKTtcbiAgICAgICAgdGhpcy5nbC5iaW5kVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRleE5hbWUpO1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgdGhpcy5nbC5nZXRQYXJhbWV0ZXIodGhpcy5nbC5NQVhfVEVYVFVSRV9TSVpFKSwgaW0ud2lkdGgsIGltLmhlaWdodCwgdGhpcy5nbC5jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5nbC50ZXhJbWFnZTJEKHRoaXMuZ2wuVEVYVFVSRV8yRCwgMCwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlJHQkEsIHRoaXMuZ2wuVU5TSUdORURfQllURSwgaW0pO1xuICAgICAgICB0aGlzLmdsLmdlbmVyYXRlTWlwbWFwKHRoaXMuZ2wuVEVYVFVSRV8yRCk7XG4gICAgICAgXG4gICAgICAgIHRoaXMucHJvZ3JhbUluZm8ubG9hZGVkLnRleHR1cmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmdsRGVmZXJyZWREcmF3KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnbFVwZGF0ZUZyb20oZnJvbUNvb3JkczogbnVtYmVyW10pIHtcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYmVmYnVmZmVyXCIpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZmJpbmRcIik7XG5cbiAgICAgICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnByb2dyYW1JbmZvLmJ1ZmZlcnMudmVydGV4QnVmZmVyRnJvbSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZmRhdGFcIik7XG4gICAgICAgIHRoaXMuZ2wuYnVmZmVyRGF0YSh0aGlzLmdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShmcm9tQ29vcmRzKSwgdGhpcy5nbC5TVEFUSUNfRFJBVyk7ICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYmVmYXR0cmliXCIpO1xuXG4gICAgICAgIHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlciggdGhpcy5wcm9ncmFtSW5mby5hdHRyaWJMb2NhdGlvbnMudmVydGV4UG9zaXRpb25Gcm9tLCAyLCB0aGlzLmdsLkZMT0FULCBmYWxzZSwgMCwgMCApO1xuICAgICAgICB0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KCB0aGlzLnByb2dyYW1JbmZvLmF0dHJpYkxvY2F0aW9ucy52ZXJ0ZXhQb3NpdGlvbkZyb20gKTtcblxuICAgICAgICAvL3RoaXMuZ2wuY2xlYXJDb2xvcigwLjAsIDAuMCwgMC4wLCAxLjApO1xuICAgICAgICAvL3RoaXMuZ2wuY2xlYXIodGhpcy5nbC5DT0xPUl9CVUZGRVJfQklUKTsgICAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZmRyYXdcIik7XG5cbiAgICAgICAgdGhpcy5wcm9ncmFtSW5mby5sb2FkZWQuZHN0Q29vcmQgPSB0cnVlO1xuICAgICAgICAvL3RoaXMuZ2wuZHJhd0FycmF5cyh0aGlzLmdsLlRSSUFOR0xFUywgMCwgZnJvbUNvb3Jkcy5sZW5ndGggLyAyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdsVXBkYXRlVG8odG9Db29yZHM6IG51bWJlcltdKSB7XG4gICAgICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy5wcm9ncmFtSW5mby5idWZmZXJzLnZlcnRleEJ1ZmZlclRvKTtcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYmVmZGF0YVwiKTtcbiAgICAgICAgdGhpcy5nbC5idWZmZXJEYXRhKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHRvQ29vcmRzKSwgdGhpcy5nbC5TVEFUSUNfRFJBVyk7ICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYmVmYXR0cmliXCIpO1xuXG4gICAgICAgIHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlciggdGhpcy5wcm9ncmFtSW5mby5hdHRyaWJMb2NhdGlvbnMudmVydGV4UG9zaXRpb25UbywgMiwgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDAgKTtcbiAgICAgICAgdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSggdGhpcy5wcm9ncmFtSW5mby5hdHRyaWJMb2NhdGlvbnMudmVydGV4UG9zaXRpb25UbyApO1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZjbGVhclwiKTtcbiAgICAgIFxuXG4gICAgICAgIC8vdGhpcy5nbC5jbGVhckNvbG9yKDAuMCwgMC4wLCAwLjAsIDEuMCk7XG4gICAgICAgIC8vdGhpcy5nbC5jbGVhcih0aGlzLmdsLkNPTE9SX0JVRkZFUl9CSVQpOyAgICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYmVmZHJhd1wiKTtcblxuICAgICAgICAvL3RoaXMuZ2wuZHJhd0FycmF5cyh0aGlzLmdsLlRSSUFOR0xFUywgMCwgZnJvbUNvb3Jkcy5sZW5ndGggLyAyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdsSW50ZXJwb2xhdGUoeDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZ2wudW5pZm9ybTFmKHRoaXMucHJvZ3JhbUluZm8udW5pZm9ybUxvY2F0aW9ucy5hbmltYXRpb25YLCB4KTtcbiAgICAgICAgdGhpcy5nbERlZmVycmVkRHJhdygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2xEZWZlcnJlZERyYXcoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb2dyYW1JbmZvLmxvYWRlZC50ZXh0dXJlICYmIHRoaXMucHJvZ3JhbUluZm8ubG9hZGVkLnRleENvb3JkICYmIHRoaXMucHJvZ3JhbUluZm8ubG9hZGVkLmRzdENvb3JkKSB7XG4gICAgICAgICAgICB0aGlzLmdsLmRyYXdBcnJheXModGhpcy5nbC5UUklBTkdMRVMsIDAsIHRoaXMudmVydGV4Q291bnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0U2hhZGVyUHJvZ3JhbSh2c1NvdXJjZTogc3RyaW5nLCBmc1NvdXJjZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHZlcnRleFNoYWRlciA9IHRoaXMubG9hZFNoYWRlcih0aGlzLmdsLlZFUlRFWF9TSEFERVIsIHZzU291cmNlKTtcbiAgICAgICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSB0aGlzLmxvYWRTaGFkZXIodGhpcy5nbC5GUkFHTUVOVF9TSEFERVIsIGZzU291cmNlKTtcbiAgICBcbiAgICAgICAgY29uc3Qgc2hhZGVyUHJvZ3JhbSA9IHRoaXMuZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICAgICAgICBpZiAoIXNoYWRlclByb2dyYW0gfHwgIXZlcnRleFNoYWRlciB8fCAhZnJhZ21lbnRTaGFkZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdsLmF0dGFjaFNoYWRlcihzaGFkZXJQcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xuICAgICAgICB0aGlzLmdsLmF0dGFjaFNoYWRlcihzaGFkZXJQcm9ncmFtLCBmcmFnbWVudFNoYWRlcik7XG4gICAgICAgIHRoaXMuZ2wubGlua1Byb2dyYW0oc2hhZGVyUHJvZ3JhbSk7XG4gICAgXG4gICAgICAgIGlmICghdGhpcy5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHNoYWRlclByb2dyYW0sIHRoaXMuZ2wuTElOS19TVEFUVVMpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzaGFkZXJzIHByb2dyYW0gZmFpbGVkXCIpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHJldHVybiBzaGFkZXJQcm9ncmFtO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZFNoYWRlcih0eXBlOiBudW1iZXIsIHNvdXJjZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHNoYWRlciA9IHRoaXMuZ2wuY3JlYXRlU2hhZGVyKHR5cGUpO1xuICAgICAgICBpZiAoIXNoYWRlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9ICAgIFxuICAgICAgICB0aGlzLmdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHNvdXJjZSk7XG4gICAgICAgIHRoaXMuZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpOyAgICBcbiAgICAgICAgaWYgKCF0aGlzLmdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIHRoaXMuZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICAgICAgICB0aGlzLmdsLmRlbGV0ZVNoYWRlcihzaGFkZXIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ29tcGlsaW5nIHNoYWRlcnMgZmFpbGVkXCIpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHJldHVybiBzaGFkZXI7XG4gICAgfVxufSIsImV4cG9ydCBjbGFzcyBWZWN0b3Ige1xuICAgIHN0YXRpYyBOVUxMOiBWZWN0b3IgPSBuZXcgVmVjdG9yKDAsIDApO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHg6IG51bWJlciwgcHVibGljIHk6IG51bWJlcikge1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tQXJyYXkoYXJyOiBudW1iZXJbXSkge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcihhcnJbMF0sIGFyclsxXSk7XG4gICAgfVxuXG4gICAgZ2V0IGxlbmd0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMueCwgMikgKyBNYXRoLnBvdyh0aGlzLnksIDIpKTtcbiAgICB9XG5cbiAgICBkZWx0YSh0aGF0OiBWZWN0b3IpOiBWZWN0b3Ige1xuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGF0LnggLSB0aGlzLngsIHRoYXQueSAtIHRoaXMueSk7XG4gICAgfVxuXG4gICAgYWRkKHRoYXQ6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCArIHRoYXQueCwgdGhpcy55ICsgdGhhdC55KTtcbiAgICB9XG5cbiAgICB3aXRoTGVuZ3RoKGxlbmd0aDogbnVtYmVyKTogVmVjdG9yIHtcbiAgICAgICAgY29uc3QgcmF0aW8gPSB0aGlzLmxlbmd0aCAhPSAwID8gbGVuZ3RoL3RoaXMubGVuZ3RoIDogMDtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54KnJhdGlvLCB0aGlzLnkqcmF0aW8pO1xuICAgIH1cblxuICAgIGJldHdlZW4ob3RoZXI6IFZlY3RvciwgeDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGRlbHRhID0gdGhpcy5kZWx0YShvdGhlcik7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZChkZWx0YS53aXRoTGVuZ3RoKGRlbHRhLmxlbmd0aCp4KSk7XG4gICAgfVxufSIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuL1ZlY3RvclwiO1xuaW1wb3J0IHsgQ3J1bXBsZWRJbWFnZSB9IGZyb20gXCIuL0NydW1wbGVkSW1hZ2VcIjtcblxuY29uc3QgR1JJRF9ESU1FTiA9IG5ldyBWZWN0b3IoNjAxLCAzMDEpO1xuXG5sZXQgbWFwcGluZ3M6IE1hcHBpbmdDb2xsZWN0aW9uIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xubGV0IGluaXRpYWwgPSB0cnVlO1xuXG5pbnRlcmZhY2UgTGFiZWwgeyBbaWQ6IHN0cmluZ106IHN0cmluZyB9XG5pbnRlcmZhY2UgTWFwcGluZyB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBsYWJlbDogTGFiZWw7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbn1cbmludGVyZmFjZSBNYXBwaW5nQ29sbGVjdGlvbiB7IFxuICAgIFtpZDogc3RyaW5nXToge1xuICAgICAgICBsYWJlbDogTGFiZWw7XG4gICAgICAgIG1hcHBpbmc6IE1hcHBpbmdbXTtcbiAgICB9XG59O1xuXG5jb25zdCBjcnVtcGxlZE1hcCA9IG5ldyBDcnVtcGxlZEltYWdlKEdSSURfRElNRU4sIDIwMDApO1xuXG5mdW5jdGlvbiBmaW5kVHJpYW5nbGVzKGVsZW1lbnRzQ291bnQ6IG51bWJlciwgcmVzb2x2ZXI6ICh4OiBudW1iZXIsIHk6IG51bWJlcikgPT4gVmVjdG9yKSB7XG4gICAgY29uc3QgdHJpYW5nbGVzOiBbVmVjdG9yLCBWZWN0b3IsIFZlY3Rvcl1bXSA9IFtdXG4gICAgY29uc3Qgcm93Q291bnQgPSBNYXRoLmZsb29yKGVsZW1lbnRzQ291bnQvR1JJRF9ESU1FTi54KTtcbiAgICBjb25zb2xlLmxvZyhyb3dDb3VudCk7XG4gICAgZm9yIChsZXQgaT0wO2k8R1JJRF9ESU1FTi55LTE7IGkrPTEpIHtcbiAgICAgICAgZm9yIChsZXQgaj0wO2o8R1JJRF9ESU1FTi54LTE7IGorPTEpIHtcbiAgICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKFtyZXNvbHZlcihqLCBpKSwgcmVzb2x2ZXIoaisxLCBpKSwgcmVzb2x2ZXIoaiwgaSsxKV0pO1xuICAgICAgICAgICAgdHJpYW5nbGVzLnB1c2goW3Jlc29sdmVyKGorMSwgaSsxKSwgcmVzb2x2ZXIoaisxLCBpKSwgcmVzb2x2ZXIoaiwgaSsxKV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cmlhbmdsZXM7XG59XG5cbmZ1bmN0aW9uIHJlYWRHcmlkKGdyaWQ6IHN0cmluZykge1xuICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZnJlYWRcIik7IC8vNTAwbXNcbiAgICBjb25zdCByb3dzID0gZ3JpZC5zcGxpdChcIlxcblwiKVxuICAgIHJvd3MucG9wKCk7XG4gICAgY29uc3QgdmVjdG9yczogVmVjdG9yW10gPSByb3dzLm1hcChyb3cgPT4gVmVjdG9yLmZyb21BcnJheShyb3cuc3BsaXQoXCIgXCIpLm1hcChwYXJzZUZsb2F0KSkpO1xuXG4gICAgY29uc3QgcmVzb2x2ZXIgPSAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IHtcbiAgICAgICAgY29uc3QgdiA9IHZlY3RvcnNbeSpHUklEX0RJTUVOLngreF07XG4gICAgICAgIGlmICh2ID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZXlcIiwgeCwgeSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3Iodi54LCB2LnkpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJiZWZ0cmlhbmdsZXNcIik7XG4gICAgY29uc3QgdHJpYW5nbGVzID0gZmluZFRyaWFuZ2xlcyh2ZWN0b3JzLmxlbmd0aCwgcmVzb2x2ZXIpOyAvLzYwMG1zXG4gICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiaGV5XCIpO1xuXG4gICAgY3J1bXBsZWRNYXAudXBkYXRlKHRyaWFuZ2xlcywgIWluaXRpYWwpO1xuICAgIGluaXRpYWwgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaW50ZXJwb2xhdGVNYXBwaW5nKG1hcHBpbmdzOiBNYXBwaW5nW10sIHg6IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IHVwcGVyIDogTWFwcGluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbG93ZXIgOiBNYXBwaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIGZvciAobGV0IGk9MDsgaTxtYXBwaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobWFwcGluZ3NbaV0ueCA+PSB4ICYmICh1cHBlciA9PSB1bmRlZmluZWQgfHwgbWFwcGluZ3NbaV0ueCA8IHVwcGVyLngpKSB7XG4gICAgICAgICAgICB1cHBlciA9IG1hcHBpbmdzW2ldO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXBwaW5nc1tpXS54IDw9IHggJiYgKGxvd2VyID09IHVuZGVmaW5lZCB8fCBtYXBwaW5nc1tpXS54ID4gbG93ZXIueCkpIHtcbiAgICAgICAgICAgIGxvd2VyID0gbWFwcGluZ3NbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGxvd2VyID09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAodXBwZXIgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBpbnRlcnBvbGF0aW9uIHBvc3NpYmxlXCIpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVwcGVyLnk7XG4gICAgfVxuICAgIGlmICh1cHBlciA9PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiBsb3dlci55O1xuICAgIGlmICh1cHBlciA9PSBsb3dlcilcbiAgICAgICAgcmV0dXJuIHVwcGVyLnk7XG4gICAgcmV0dXJuICh4LWxvd2VyLngpLyh1cHBlci54LWxvd2VyLngpKih1cHBlci55LWxvd2VyLnkpK2xvd2VyLnk7XG59XG5cbmZ1bmN0aW9uIGdldEJpbmFyaWVzKCk6IE1hcHBpbmdbXSB7XG4gICAgaWYgKG1hcHBpbmdzID09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHJldHVybiBtYXBwaW5ncy55ZWFyLm1hcHBpbmcuY29uY2F0KG1hcHBpbmdzLnBhcmFtZXRlcnMubWFwcGluZywgbWFwcGluZ3MubWV0cmljcy5tYXBwaW5nLCBtYXBwaW5ncy5pbXBhY3RzLm1hcHBpbmcpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb250cm9scygpIHtcbiAgICBpZiAobWFwcGluZ3MgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjb250cm9scyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9scycpO1xuICAgIGlmIChjb250cm9scyA9PSB1bmRlZmluZWQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IHBvcHVsYXRlIGNvbnRyb2xzXCIpXG5cbiAgICBjb25zdCBiaW5hcmllcyA9IGdldEJpbmFyaWVzKCk7XG4gICAgY29uc29sZS5sb2coYmluYXJpZXMpO1xuXG4gICAgZm9yIChsZXQgaT0wOyBpPGJpbmFyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgY2hlY2tib3gudHlwZSA9ICdjaGVja2JveCc7XG4gICAgICAgIGNoZWNrYm94Lm5hbWUgPSBiaW5hcmllc1tpXS5pZDtcbiAgICAgICAgY2hlY2tib3guaWQgPSBiaW5hcmllc1tpXS5pZDtcbiAgICAgICAgY2hlY2tib3gub25pbnB1dCA9IHVwZGF0ZU1hcDtcblxuICAgICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIGxhYmVsLmh0bWxGb3IgPSBiaW5hcmllc1tpXS5pZDtcbiAgICAgICAgbGFiZWwuaW5uZXJIVE1MID0gYmluYXJpZXNbaV0ubGFiZWwuZW47XG5cbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChjaGVja2JveCk7XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgICAgIGNvbnRyb2xzLmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgIGNvbnNvbGUubG9nKGJpbmFyaWVzW2ldLmlkKTtcbiAgICB9XG4gICAgdXBkYXRlTWFwKCk7XG59XG5cbmZ1bmN0aW9uIGlzQ2hlY2tlZChpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkpLmNoZWNrZWRcbn1cblxuZnVuY3Rpb24gcGVybXV0YXRpb25TdHIoYmluYXJpZXM6IE1hcHBpbmdbXSkge1xuICAgIHJldHVybiBiaW5hcmllcy5tYXAoYiA9PiBiLmlkK1wiLVwiKygraXNDaGVja2VkKGIuaWQpKSkuam9pbihcIl9cIik7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZU1hcCgpIHtcbiAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJ1cGQgdHJpZ1wiKVxuICAgIGlmIChtYXBwaW5ncyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB5ZWFyMjEwMCA9IGlzQ2hlY2tlZChtYXBwaW5ncy55ZWFyLm1hcHBpbmdbMF0uaWQpO1xuICAgIGNvbnN0IGVtaXNzaW9ucyA9IHllYXIyMTAwID8gY3VtdWxhdGVDbzJFbWlzc2lvbnMoKSA6IDA7XG4gICAgY29uc29sZS5sb2coJ0N1bXVsYXRlZCBDTzIgZW1pc3Npb25zOicsIGVtaXNzaW9ucyk7XG4gICAgY29uc3QgdGVtcGVyYXR1cmUgPSBpbnRlcnBvbGF0ZU1hcHBpbmcobWFwcGluZ3MuaW1wYWN0c19zY2VuYXJpb3MubWFwcGluZywgZW1pc3Npb25zKTtcbiAgICBjb25zb2xlLmxvZygnVGVtcGVyYXR1cmUgZm9yZWNhc3Q6JywgdGVtcGVyYXR1cmUpO1xuICAgIHVwZGF0ZVRlbXBlcmF0dXJlKHRlbXBlcmF0dXJlKTtcblxuICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZmZldGNoXCIpO1xuXG4gICAgZmV0Y2goJ2RhdGEvJytwZXJtdXRhdGlvblN0cihnZXRCaW5hcmllcygpKSsnLmNzdicpIC8vMTAwbXNcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImJlZnRleHRcIik7XG4gICAgICAgIGNvbnN0IHQgPSByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImFmenRleHRcIik7XG4gICAgICAgIHJldHVybiB0O1xuXG4gICAgfSlcbiAgICAudGhlbihncmlkID0+IHJlYWRHcmlkKGdyaWQpKTtcbn1cblxuZnVuY3Rpb24gY3VtdWxhdGVDbzJFbWlzc2lvbnMoKSB7XG4gICAgaWYgKG1hcHBpbmdzID09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgbGV0IGN1bXVsX2NvMiA9IG1hcHBpbmdzLnllYXIubWFwcGluZ1swXS55O1xuICAgIGNvbnN0IHBhcmFtcyA9IG1hcHBpbmdzLnBhcmFtZXRlcnMubWFwcGluZ1xuICAgIGZvciAobGV0IGk9MDsgaTxwYXJhbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY2hlY2tib3ggPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJhbXNbaV0uaWQpO1xuICAgICAgICBpZiAoY2hlY2tib3guY2hlY2tlZCkge1xuICAgICAgICAgICAgY3VtdWxfY28yICs9IHBhcmFtc1tpXS55O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjdW11bF9jbzI7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRlbXBlcmF0dXJlKHRlbXBlcmF0dXJlOiBudW1iZXIpIHtcbiAgICBjb25zdCB0ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZW1wZXJhdHVyZScpO1xuICAgIHQuaW5uZXJIVE1MID0gTWF0aC5yb3VuZCgodGVtcGVyYXR1cmUrMSkqMTApLzEwK1wiXCI7XG59XG5cbmZ1bmN0aW9uIGxvYWRNYXBwaW5ncygpIHtcbiAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJodHRwMVwiKTtcbiAgICBmZXRjaCgncmVzL21hcHBpbmdzLmpzb24nKVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwicmVzXCIpO1xuICAgICAgICBtYXBwaW5ncyA9IGpzb247XG4gICAgICAgIGNyZWF0ZUNvbnRyb2xzKCk7XG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLm5vdygpLCBcImZha2V0cmlhbmdcIik7XG4gICAgICAgICAgICBjcnVtcGxlZE1hcC5zZXRUZXhDb29yZHMoZmluZFRyaWFuZ2xlcyhHUklEX0RJTUVOLngqR1JJRF9ESU1FTi55LCAoeCwgeSkgPT4gbmV3IFZlY3Rvcih4LCB5KSkpOyAvLyA2MDBtc1xuICAgICAgICAgICAgY29uc29sZS5sb2cocGVyZm9ybWFuY2Uubm93KCksIFwiYWZ0ZXJmYWtldHJpYW5nXCIpO1xuICAgICAgICB9LCAxKTtcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSwgXCJodHRwMlwiKTtcbn1cblxubG9hZE1hcHBpbmdzKCk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbi1leHBvc2VkLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9