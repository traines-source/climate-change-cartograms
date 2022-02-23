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
    constructor(gridDimen, animationDurationMs, srcTriangles) {
        this.gridDimen = gridDimen;
        this.animationDurationMs = animationDurationMs;
        this.srcTriangles = srcTriangles;
        this.canvasDimen = Vector_1.Vector.NULL;
        this.canvasTl = Vector_1.Vector.NULL;
        this.imgDimen = Vector_1.Vector.NULL;
        this.currentState = srcTriangles;
        this.canvas = document.getElementById('map');
        this.img = document.getElementById('map-src');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas(), false);
        if (this.img.complete) {
            this.initialDraw();
        }
        else {
            this.img.onload = () => this.initialDraw();
        }
    }
    resizeCanvas() {
        const r = this.canvas.getBoundingClientRect();
        this.canvasDimen = new Vector_1.Vector(r.width, r.height);
        this.canvasTl = new Vector_1.Vector(r.top, r.left);
    }
    initialDraw() {
        const ctx = this.canvas.getContext('2d');
        this.imgDimen = new Vector_1.Vector(this.img.width, this.img.height);
        console.log(this.canvasDimen);
        //ctx?.drawImage(this.img, 0, 0, this.canvasDimen.x, this.imgDimen.y/this.imgDimen.x*this.canvasDimen.x);
        if (this.currentState != undefined)
            this.update(this.currentState);
    }
    update(newState) {
        console.log("received update");
        const animator = new Animator_1.Animator();
        const ctx = this.canvas.getContext('2d');
        if (ctx != null) {
            animator.animate(this.animationDurationMs, (x, isLast) => {
                const s = performance.now();
                console.log("started update");
                this.mapTriangles(newState, x, ctx);
                if (isLast) {
                    this.currentState = newState;
                    console.log("applied update", performance.now() - s);
                }
                return true;
            });
        }
    }
    mapTriangles(newState, x, ctx) {
        var _a, _b;
        if (newState.length != ((_a = this.currentState) === null || _a === void 0 ? void 0 : _a.length)) {
            throw new Error("newState has different length (" + newState.length + ") than currentState (" + ((_b = this.currentState) === null || _b === void 0 ? void 0 : _b.length) + ")");
        }
        ctx.clearRect(0, 0, this.canvasDimen.x, this.canvasDimen.y);
        for (let i = 0; i < newState.length; i++) {
            const src = this.srcTriangles[i].map(c => this.grid2ImgCoords(c));
            const start = this.currentState[i];
            const dst = newState[i].map((c, j) => this.grid2CanvasCoords(start[j].between(c, x)));
            if (i == 0) {
                console.log(src, start, dst);
            }
            this.drawTriangle(ctx, this.img, dst[0], dst[1], dst[2], src[0], src[1], src[2]);
        }
    }
    grid2ImgCoords(v) {
        const scale = this.imgDimen.x / this.gridDimen.x;
        return new Vector_1.Vector(v.x * scale, v.y * scale);
    }
    grid2CanvasCoords(v) {
        const scale = this.canvasDimen.x / this.gridDimen.x;
        return new Vector_1.Vector(v.x * scale, v.y * scale);
    }
    // inspired by http://tulrich.com/geekstuff/canvas/jsgl.js
    drawTriangle(ctx, im, d0, d1, d2, s0, s1, s2) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(d0.x, d0.y);
        ctx.lineTo(d1.x, d1.y);
        ctx.lineTo(d2.x, d2.y);
        ctx.closePath();
        //ctx.stroke();
        ctx.clip();
        var denom = s0.x * (s2.y - s1.y) - s1.x * s2.y + s2.x * s1.y + (s1.x - s2.x) * s0.y;
        if (denom == 0) {
            return;
        }
        var m11 = -(s0.y * (d2.x - d1.x) - s1.y * d2.x + s2.y * d1.x + (s1.y - s2.y) * d0.x) / denom;
        var m12 = (s1.y * d2.y + s0.y * (d1.y - d2.y) - s2.y * d1.y + (s2.y - s1.y) * d0.y) / denom;
        var m21 = (s0.x * (d2.x - d1.x) - s1.x * d2.x + s2.x * d1.x + (s1.x - s2.x) * d0.x) / denom;
        var m22 = -(s1.x * d2.y + s0.x * (d1.y - d2.y) - s2.x * d1.y + (s2.x - s1.x) * d0.y) / denom;
        var dx = (s0.x * (s2.y * d1.x - s1.y * d2.x) + s0.y * (s1.x * d2.x - s2.x * d1.x) + (s2.x * s1.y - s1.x * s2.y) * d0.x) / denom;
        var dy = (s0.x * (s2.y * d1.y - s1.y * d2.y) + s0.y * (s1.x * d2.y - s2.x * d1.y) + (s2.x * s1.y - s1.x * s2.y) * d0.y) / denom;
        ctx.transform(m11, m12, m21, m22, dx, dy);
        ctx.drawImage(im, 0, 0);
        ctx.restore();
    }
    ;
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
const CrumpledImage_1 = __webpack_require__(/*! ./CrumpledImage */ "./src/CrumpledImage.ts");
const GRID_DIMEN = new Vector_1.Vector(601, 301);
let mappings = undefined;
;
const crumpledMap = new CrumpledImage_1.CrumpledImage(GRID_DIMEN, 0, findTriangles(GRID_DIMEN.x * GRID_DIMEN.y, (x, y) => new Vector_1.Vector(x, y)));
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
    const triangles = findTriangles(vectors.length, resolver);
    console.log("hey");
    crumpledMap.update(triangles);
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
    if (mappings == undefined) {
        return;
    }
    const year2100 = isChecked(mappings.year.mapping[0].id);
    const emissions = year2100 ? cumulateCo2Emissions() : 0;
    console.log('Cumulated CO2 emissions:', emissions);
    const temperature = interpolateMapping(mappings.impacts_scenarios.mapping, emissions);
    console.log('Temperature forecast:', temperature);
    updateTemperature(temperature);
    fetch('data/' + permutationStr(getBinaries()) + '.csv')
        .then(response => response.text())
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
    fetch('res/mappings.json')
        .then(response => response.json())
        .then(json => {
        mappings = json;
        createControls();
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDN0YsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDNUYsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDNUYsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM3RixJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ2hJLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFFaEksR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxF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QUM7U0FDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ1QsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixjQUFjLEVBQUUsQ0FBQztJQUNyQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCxZQUFZLEVBQUUsQ0FBQzs7Ozs7OztVQ3pLZjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7VUVQRDtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvLi9zcmMvQW5pbWF0b3IudHM/MGNiOCIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zLy4vc3JjL0NydW1wbGVkSW1hZ2UudHM/MTJhMyIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zLy4vc3JjL1ZlY3Rvci50cz81MWQ5Iiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvLi9zcmMvbWFpbi1leHBvc2VkLnRzIiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvLi9ub2RlX21vZHVsZXMvZXhwb3NlLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0R2xvYmFsVGhpcy5qcyIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zLy4vc3JjL0FuaW1hdG9yLnRzIiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvLi9zcmMvQ3J1bXBsZWRJbWFnZS50cyIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zLy4vc3JjL1ZlY3Rvci50cyIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCItIS4uL25vZGVfbW9kdWxlcy90cy1sb2FkZXIvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbMF0udXNlWzFdIS4vQW5pbWF0b3IudHNcIik7XG52YXIgX19fRVhQT1NFX0xPQURFUl9HRVRfR0xPQkFMX1RISVNfX18gPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2V4cG9zZS1sb2FkZXIvZGlzdC9ydW50aW1lL2dldEdsb2JhbFRoaXMuanNcIik7XG52YXIgX19fRVhQT1NFX0xPQURFUl9HTE9CQUxfVEhJU19fXyA9IF9fX0VYUE9TRV9MT0FERVJfR0VUX0dMT0JBTF9USElTX19fO1xuX19fRVhQT1NFX0xPQURFUl9HTE9CQUxfVEhJU19fX1tcIkNDQ1wiXSA9IF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fO1xubW9kdWxlLmV4cG9ydHMgPSBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXztcbiIsInZhciBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCItIS4uL25vZGVfbW9kdWxlcy90cy1sb2FkZXIvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbMF0udXNlWzFdIS4vQ3J1bXBsZWRJbWFnZS50c1wiKTtcbnZhciBfX19FWFBPU0VfTE9BREVSX0dFVF9HTE9CQUxfVEhJU19fXyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvZXhwb3NlLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0R2xvYmFsVGhpcy5qc1wiKTtcbnZhciBfX19FWFBPU0VfTE9BREVSX0dMT0JBTF9USElTX19fID0gX19fRVhQT1NFX0xPQURFUl9HRVRfR0xPQkFMX1RISVNfX187XG5fX19FWFBPU0VfTE9BREVSX0dMT0JBTF9USElTX19fW1wiQ0NDXCJdID0gX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX187XG5tb2R1bGUuZXhwb3J0cyA9IF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fO1xuIiwidmFyIF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fID0gcmVxdWlyZShcIi0hLi4vbm9kZV9tb2R1bGVzL3RzLWxvYWRlci9pbmRleC5qcz8/cnVsZVNldFsxXS5ydWxlc1swXS51c2VbMV0hLi9WZWN0b3IudHNcIik7XG52YXIgX19fRVhQT1NFX0xPQURFUl9HRVRfR0xPQkFMX1RISVNfX18gPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2V4cG9zZS1sb2FkZXIvZGlzdC9ydW50aW1lL2dldEdsb2JhbFRoaXMuanNcIik7XG52YXIgX19fRVhQT1NFX0xPQURFUl9HTE9CQUxfVEhJU19fXyA9IF9fX0VYUE9TRV9MT0FERVJfR0VUX0dMT0JBTF9USElTX19fO1xuX19fRVhQT1NFX0xPQURFUl9HTE9CQUxfVEhJU19fX1tcIkNDQ1wiXSA9IF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fO1xubW9kdWxlLmV4cG9ydHMgPSBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXztcbiIsInZhciBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCItIS4uL25vZGVfbW9kdWxlcy90cy1sb2FkZXIvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbMF0udXNlWzFdIS4vbWFpbi50c1wiKTtcbnZhciBfX19FWFBPU0VfTE9BREVSX0dFVF9HTE9CQUxfVEhJU19fXyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvZXhwb3NlLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0R2xvYmFsVGhpcy5qc1wiKTtcbnZhciBfX19FWFBPU0VfTE9BREVSX0dMT0JBTF9USElTX19fID0gX19fRVhQT1NFX0xPQURFUl9HRVRfR0xPQkFMX1RISVNfX187XG5fX19FWFBPU0VfTE9BREVSX0dMT0JBTF9USElTX19fW1wiQ0NDXCJdID0gX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX187XG5tb2R1bGUuZXhwb3J0cyA9IF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSBcIm9iamVjdFwiKSB7XG4gICAgcmV0dXJuIGdsb2JhbFRoaXM7XG4gIH1cblxuICB2YXIgZztcblxuICB0cnkge1xuICAgIC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICAgIGcgPSB0aGlzIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSB7XG4gICAgICByZXR1cm4gd2luZG93O1xuICAgIH0gLy8gVGhpcyB3b3JrcyBpZiB0aGUgc2VsZiByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cblxuICAgIGlmICh0eXBlb2Ygc2VsZiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSAvLyBUaGlzIHdvcmtzIGlmIHRoZSBnbG9iYWwgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXG5cbiAgICBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgcmV0dXJuIGdsb2JhbDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZztcbn0oKTsiLCJleHBvcnQgY2xhc3MgQW5pbWF0b3Ige1xuXG4gICAgc3RhdGljIEVBU0VfTk9ORTogKHg6IG51bWJlcikgPT4gbnVtYmVyID0geCA9PiB4O1xuICAgIHN0YXRpYyBFQVNFX0NVQklDOiAoeDogbnVtYmVyKSA9PiBudW1iZXIgPSB4ID0+IHggPCAwLjUgPyA0ICogeCAqIHggKiB4IDogMSAtIE1hdGgucG93KC0yICogeCArIDIsIDMpIC8gMjtcbiAgICBzdGF0aWMgRUFTRV9TSU5FOiAoeDogbnVtYmVyKSA9PiBudW1iZXIgPSB4ID0+IC0oTWF0aC5jb3MoTWF0aC5QSSAqIHgpIC0gMSkgLyAyO1xuICAgIFxuICAgIHByaXZhdGUgX2Zyb206IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfdG86IG51bWJlciA9IDE7XG4gICAgcHJpdmF0ZSBfdGltZVBhc3NlZDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9lYXNlOiAoeDogbnVtYmVyKSA9PiBudW1iZXIgPSBBbmltYXRvci5FQVNFX05PTkU7XG5cbiAgICBwcml2YXRlIGNhbGxiYWNrOiAoeDogbnVtYmVyLCBpc0xhc3Q6IGJvb2xlYW4pID0+IGJvb2xlYW4gPSB4ID0+IHRydWU7XG4gICAgcHJpdmF0ZSBzdGFydFRpbWU6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBkdXJhdGlvbk1pbGxpc2Vjb25kczogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIHB1YmxpYyBmcm9tKGZyb206IG51bWJlcik6IEFuaW1hdG9yIHtcbiAgICAgICAgdGhpcy5fZnJvbSA9IGZyb207XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyB0byh0bzogbnVtYmVyKTogQW5pbWF0b3Ige1xuICAgICAgICB0aGlzLl90byA9IHRvO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgdGltZVBhc3NlZCh0aW1lUGFzc2VkOiBudW1iZXIpOiBBbmltYXRvciB7XG4gICAgICAgIHRoaXMuX3RpbWVQYXNzZWQgPSB0aW1lUGFzc2VkO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZWFzZShlYXNlOiAoeDogbnVtYmVyKSA9PiBudW1iZXIpOiBBbmltYXRvciB7XG4gICAgICAgIHRoaXMuX2Vhc2UgPSBlYXNlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgd2FpdChkZWxheU1pbGxpc2Vjb25kczogbnVtYmVyLCBjYWxsYmFjazogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICBpZiAoZGVsYXlNaWxsaXNlY29uZHMgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWVvdXQoY2FsbGJhY2ssIGRlbGF5TWlsbGlzZWNvbmRzKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjaygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhbmltYXRlKGR1cmF0aW9uTWlsbGlzZWNvbmRzOiBudW1iZXIsIGNhbGxiYWNrOiAoeDogbnVtYmVyLCBpc0xhc3Q6IGJvb2xlYW4pID0+IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kdXJhdGlvbk1pbGxpc2Vjb25kcyA9IGR1cmF0aW9uTWlsbGlzZWNvbmRzO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gdGhpcy5ub3coKTtcbiAgICAgICAgdGhpcy5mcmFtZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZnJhbWUoKSB7XG4gICAgICAgIGNvbnN0IG5vdyA9IHRoaXMubm93KCk7XG4gICAgICAgIGxldCB4ID0gMTtcbiAgICAgICAgaWYgKHRoaXMuZHVyYXRpb25NaWxsaXNlY29uZHMgPiAwKSB7XG4gICAgICAgICAgICB4ID0gKG5vdy10aGlzLnN0YXJ0VGltZSt0aGlzLl90aW1lUGFzc2VkKSAvIHRoaXMuZHVyYXRpb25NaWxsaXNlY29uZHM7XG4gICAgICAgIH1cbiAgICAgICAgeCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHgpKTtcbiAgICAgICAgY29uc3QgeSA9IHRoaXMuX2Zyb20gKyAodGhpcy5fdG8tdGhpcy5fZnJvbSkgKiB0aGlzLl9lYXNlKHgpO1xuICAgICAgICBjb25zdCBjb250ID0gdGhpcy5jYWxsYmFjayh5LCB4ID09IDEpO1xuICAgICAgICBpZiAoY29udCAmJiB4IDwgMSkge1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0RnJhbWUoKCkgPT4gdGhpcy5mcmFtZSgpKTtcbiAgICAgICAgfSBlbHNlIGlmICghY29udCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1N0b3BwZWQgYW5pbWF0aW9uIGJlY2F1c2UgY2FsbGJhY2sgcmV0dXJuZWQgZmFsc2UuJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG5vdygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0aW1lb3V0KGNhbGxiYWNrOiAoKSA9PiB2b2lkLCBkZWxheU1pbGxpc2Vjb25kczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCBkZWxheU1pbGxpc2Vjb25kcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXF1ZXN0RnJhbWUoY2FsbGJhY2s6ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShjYWxsYmFjayk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQW5pbWF0b3IgfSBmcm9tIFwiLi9BbmltYXRvclwiO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4vVmVjdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBDcnVtcGxlZEltYWdlIHtcbiAgICBwcml2YXRlIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgcHJpdmF0ZSBjYW52YXNEaW1lbjogVmVjdG9yID0gVmVjdG9yLk5VTEw7XG4gICAgcHJpdmF0ZSBjYW52YXNUbDogVmVjdG9yID0gVmVjdG9yLk5VTEw7XG4gICAgcHJpdmF0ZSBpbWc6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBpbWdEaW1lbjogVmVjdG9yID0gVmVjdG9yLk5VTEw7XG4gICAgcHJpdmF0ZSBjdXJyZW50U3RhdGU/OiBbVmVjdG9yLCBWZWN0b3IsIFZlY3Rvcl1bXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JpZERpbWVuOiBWZWN0b3IsIHByaXZhdGUgYW5pbWF0aW9uRHVyYXRpb25NczogbnVtYmVyLCBwcml2YXRlIHNyY1RyaWFuZ2xlczogW1ZlY3RvciwgVmVjdG9yLCBWZWN0b3JdW10pIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBzcmNUcmlhbmdsZXM7XG4gICAgICAgIHRoaXMuY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKTtcbiAgICAgICAgdGhpcy5pbWcgPSA8SFRNTEltYWdlRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLXNyYycpO1xuICAgICAgICB0aGlzLnJlc2l6ZUNhbnZhcygpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4gdGhpcy5yZXNpemVDYW52YXMoKSwgZmFsc2UpO1xuXG4gICAgICAgIGlmICh0aGlzLmltZy5jb21wbGV0ZSkge1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsRHJhdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbWcub25sb2FkID0gKCkgPT4gdGhpcy5pbml0aWFsRHJhdygpO1xuICAgICAgICB9ICAgICAgICBcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2l6ZUNhbnZhcygpIHtcbiAgICAgICAgY29uc3QgciA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB0aGlzLmNhbnZhc0RpbWVuID0gbmV3IFZlY3RvcihyLndpZHRoLCByLmhlaWdodCk7XG4gICAgICAgIHRoaXMuY2FudmFzVGwgPSBuZXcgVmVjdG9yKHIudG9wLCByLmxlZnQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdGlhbERyYXcoKSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIHRoaXMuaW1nRGltZW4gPSBuZXcgVmVjdG9yKHRoaXMuaW1nLndpZHRoLCB0aGlzLmltZy5oZWlnaHQpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNhbnZhc0RpbWVuKTtcbiAgICAgICAgLy9jdHg/LmRyYXdJbWFnZSh0aGlzLmltZywgMCwgMCwgdGhpcy5jYW52YXNEaW1lbi54LCB0aGlzLmltZ0RpbWVuLnkvdGhpcy5pbWdEaW1lbi54KnRoaXMuY2FudmFzRGltZW4ueCk7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZSAhPSB1bmRlZmluZWQpIHRoaXMudXBkYXRlKHRoaXMuY3VycmVudFN0YXRlKTtcbiAgICB9XG5cbiAgICB1cGRhdGUobmV3U3RhdGU6IFtWZWN0b3IsIFZlY3RvciwgVmVjdG9yXVtdKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgdXBkYXRlXCIpO1xuICAgICAgICBjb25zdCBhbmltYXRvciA9IG5ldyBBbmltYXRvcigpO1xuICAgICAgICBjb25zdCBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBpZiAoY3R4ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGFuaW1hdG9yLmFuaW1hdGUodGhpcy5hbmltYXRpb25EdXJhdGlvbk1zLCAoeCwgaXNMYXN0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3RhcnRlZCB1cGRhdGVcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBUcmlhbmdsZXMobmV3U3RhdGUsIHgsIGN0eCk7XG4gICAgICAgICAgICAgICAgaWYgKGlzTGFzdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFwcGxpZWQgdXBkYXRlXCIsIHBlcmZvcm1hbmNlLm5vdygpLXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYXBUcmlhbmdsZXMobmV3U3RhdGU6IFtWZWN0b3IsIFZlY3RvciwgVmVjdG9yXVtdLCB4OiBudW1iZXIsIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XG4gICAgICAgIGlmIChuZXdTdGF0ZS5sZW5ndGggIT0gdGhpcy5jdXJyZW50U3RhdGU/Lmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibmV3U3RhdGUgaGFzIGRpZmZlcmVudCBsZW5ndGggKFwiK25ld1N0YXRlLmxlbmd0aCtcIikgdGhhbiBjdXJyZW50U3RhdGUgKFwiK3RoaXMuY3VycmVudFN0YXRlPy5sZW5ndGgrXCIpXCIpO1xuICAgICAgICB9XG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXNEaW1lbi54LCB0aGlzLmNhbnZhc0RpbWVuLnkpO1xuICAgICAgICBmb3IgKGxldCBpPTA7aTxuZXdTdGF0ZS5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICBjb25zdCBzcmMgPSB0aGlzLnNyY1RyaWFuZ2xlc1tpXS5tYXAoYyA9PiB0aGlzLmdyaWQySW1nQ29vcmRzKGMpKTtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5jdXJyZW50U3RhdGVbaV07XG4gICAgICAgICAgICBjb25zdCBkc3QgPSBuZXdTdGF0ZVtpXS5tYXAoKGM6IFZlY3RvciwgajogbnVtYmVyKSA9PiB0aGlzLmdyaWQyQ2FudmFzQ29vcmRzKHN0YXJ0W2pdLmJldHdlZW4oYywgeCkpKTtcbiAgICAgICAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzcmMsIHN0YXJ0LCBkc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kcmF3VHJpYW5nbGUoY3R4LCB0aGlzLmltZyxcbiAgICAgICAgICAgICAgICBkc3RbMF0sIGRzdFsxXSwgZHN0WzJdLFxuICAgICAgICAgICAgICAgIHNyY1swXSwgc3JjWzFdLCBzcmNbMl1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBncmlkMkltZ0Nvb3Jkcyh2OiBWZWN0b3IpIHtcbiAgICAgICAgY29uc3Qgc2NhbGUgPSB0aGlzLmltZ0RpbWVuLnggLyB0aGlzLmdyaWREaW1lbi54O1xuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih2Lngqc2NhbGUsIHYueSpzY2FsZSk7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgZ3JpZDJDYW52YXNDb29yZHModjogVmVjdG9yKSB7XG4gICAgICAgIGNvbnN0IHNjYWxlID0gdGhpcy5jYW52YXNEaW1lbi54IC8gdGhpcy5ncmlkRGltZW4ueDtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3Iodi54KnNjYWxlLCB2Lnkqc2NhbGUpO1xuICAgIH1cbiAgICBcbiAgICAvLyBpbnNwaXJlZCBieSBodHRwOi8vdHVscmljaC5jb20vZ2Vla3N0dWZmL2NhbnZhcy9qc2dsLmpzXG4gICAgcHJpdmF0ZSBkcmF3VHJpYW5nbGUoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGltOiBIVE1MSW1hZ2VFbGVtZW50LCBkMDogVmVjdG9yLCBkMTogVmVjdG9yLCBkMjogVmVjdG9yLCBzMDogVmVjdG9yLCBzMTogVmVjdG9yLCBzMjogVmVjdG9yKSB7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyhkMC54LCBkMC55KTtcbiAgICAgICAgY3R4LmxpbmVUbyhkMS54LCBkMS55KTtcbiAgICAgICAgY3R4LmxpbmVUbyhkMi54LCBkMi55KTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICAvL2N0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmNsaXAoKTtcbiAgICBcbiAgICAgICAgdmFyIGRlbm9tID0gczAueCAqIChzMi55IC0gczEueSkgLSBzMS54ICogczIueSArIHMyLnggKiBzMS55ICsgKHMxLnggLSBzMi54KSAqIHMwLnk7XG4gICAgICAgIGlmIChkZW5vbSA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG0xMSA9IC0oczAueSAqIChkMi54IC0gZDEueCkgLSBzMS55ICogZDIueCArIHMyLnkgKiBkMS54ICsgKHMxLnkgLSBzMi55KSAqIGQwLngpIC8gZGVub207XG4gICAgICAgIHZhciBtMTIgPSAoczEueSAqIGQyLnkgKyBzMC55ICogKGQxLnkgLSBkMi55KSAtIHMyLnkgKiBkMS55ICsgKHMyLnkgLSBzMS55KSAqIGQwLnkpIC8gZGVub207XG4gICAgICAgIHZhciBtMjEgPSAoczAueCAqIChkMi54IC0gZDEueCkgLSBzMS54ICogZDIueCArIHMyLnggKiBkMS54ICsgKHMxLnggLSBzMi54KSAqIGQwLngpIC8gZGVub207XG4gICAgICAgIHZhciBtMjIgPSAtKHMxLnggKiBkMi55ICsgczAueCAqIChkMS55IC0gZDIueSkgLSBzMi54ICogZDEueSArIChzMi54IC0gczEueCkgKiBkMC55KSAvIGRlbm9tO1xuICAgICAgICB2YXIgZHggPSAoczAueCAqIChzMi55ICogZDEueCAtIHMxLnkgKiBkMi54KSArIHMwLnkgKiAoczEueCAqIGQyLnggLSBzMi54ICogZDEueCkgKyAoczIueCAqIHMxLnkgLSBzMS54ICogczIueSkgKiBkMC54KSAvIGRlbm9tO1xuICAgICAgICB2YXIgZHkgPSAoczAueCAqIChzMi55ICogZDEueSAtIHMxLnkgKiBkMi55KSArIHMwLnkgKiAoczEueCAqIGQyLnkgLSBzMi54ICogZDEueSkgKyAoczIueCAqIHMxLnkgLSBzMS54ICogczIueSkgKiBkMC55KSAvIGRlbm9tO1xuICAgIFxuICAgICAgICBjdHgudHJhbnNmb3JtKG0xMSwgbTEyLCBtMjEsIG0yMiwgZHgsIGR5KTsgICAgICAgIFxuICAgICAgICBjdHguZHJhd0ltYWdlKGltLCAwLCAwKTtcbiAgICAgICAgXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfTtcbn0iLCJleHBvcnQgY2xhc3MgVmVjdG9yIHtcbiAgICBzdGF0aWMgTlVMTDogVmVjdG9yID0gbmV3IFZlY3RvcigwLCAwKTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB4OiBudW1iZXIsIHB1YmxpYyB5OiBudW1iZXIpIHtcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbUFycmF5KGFycjogbnVtYmVyW10pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IoYXJyWzBdLCBhcnJbMV0pO1xuICAgIH1cblxuICAgIGdldCBsZW5ndGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh0aGlzLngsIDIpICsgTWF0aC5wb3codGhpcy55LCAyKSk7XG4gICAgfVxuXG4gICAgZGVsdGEodGhhdDogVmVjdG9yKTogVmVjdG9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IodGhhdC54IC0gdGhpcy54LCB0aGF0LnkgLSB0aGlzLnkpO1xuICAgIH1cblxuICAgIGFkZCh0aGF0OiBWZWN0b3IpOiBWZWN0b3Ige1xuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLnggKyB0aGF0LngsIHRoaXMueSArIHRoYXQueSk7XG4gICAgfVxuXG4gICAgd2l0aExlbmd0aChsZW5ndGg6IG51bWJlcik6IFZlY3RvciB7XG4gICAgICAgIGNvbnN0IHJhdGlvID0gdGhpcy5sZW5ndGggIT0gMCA/IGxlbmd0aC90aGlzLmxlbmd0aCA6IDA7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCpyYXRpbywgdGhpcy55KnJhdGlvKTtcbiAgICB9XG5cbiAgICBiZXR3ZWVuKG90aGVyOiBWZWN0b3IsIHg6IG51bWJlcikge1xuICAgICAgICBjb25zdCBkZWx0YSA9IHRoaXMuZGVsdGEob3RoZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5hZGQoZGVsdGEud2l0aExlbmd0aChkZWx0YS5sZW5ndGgqeCkpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi9WZWN0b3JcIjtcbmltcG9ydCB7IENydW1wbGVkSW1hZ2UgfSBmcm9tIFwiLi9DcnVtcGxlZEltYWdlXCI7XG5cbmNvbnN0IEdSSURfRElNRU4gPSBuZXcgVmVjdG9yKDYwMSwgMzAxKTtcblxubGV0IG1hcHBpbmdzOiBNYXBwaW5nQ29sbGVjdGlvbiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblxuaW50ZXJmYWNlIExhYmVsIHsgW2lkOiBzdHJpbmddOiBzdHJpbmcgfVxuaW50ZXJmYWNlIE1hcHBpbmcge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgbGFiZWw6IExhYmVsO1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG59XG5pbnRlcmZhY2UgTWFwcGluZ0NvbGxlY3Rpb24geyBcbiAgICBbaWQ6IHN0cmluZ106IHtcbiAgICAgICAgbGFiZWw6IExhYmVsO1xuICAgICAgICBtYXBwaW5nOiBNYXBwaW5nW107XG4gICAgfVxufTtcblxuY29uc3QgY3J1bXBsZWRNYXAgPSBuZXcgQ3J1bXBsZWRJbWFnZShHUklEX0RJTUVOLCAwLCBmaW5kVHJpYW5nbGVzKEdSSURfRElNRU4ueCpHUklEX0RJTUVOLnksICh4LCB5KSA9PiBuZXcgVmVjdG9yKHgsIHkpKSk7XG5cbmZ1bmN0aW9uIGZpbmRUcmlhbmdsZXMoZWxlbWVudHNDb3VudDogbnVtYmVyLCByZXNvbHZlcjogKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiBWZWN0b3IpIHtcbiAgICBjb25zdCB0cmlhbmdsZXM6IFtWZWN0b3IsIFZlY3RvciwgVmVjdG9yXVtdID0gW11cbiAgICBjb25zdCByb3dDb3VudCA9IE1hdGguZmxvb3IoZWxlbWVudHNDb3VudC9HUklEX0RJTUVOLngpO1xuICAgIGNvbnNvbGUubG9nKHJvd0NvdW50KTtcbiAgICBmb3IgKGxldCBpPTA7aTxHUklEX0RJTUVOLnktMTsgaSs9MSkge1xuICAgICAgICBmb3IgKGxldCBqPTA7ajxHUklEX0RJTUVOLngtMTsgais9MSkge1xuICAgICAgICAgICAgdHJpYW5nbGVzLnB1c2goW3Jlc29sdmVyKGosIGkpLCByZXNvbHZlcihqKzEsIGkpLCByZXNvbHZlcihqLCBpKzEpXSk7XG4gICAgICAgICAgICB0cmlhbmdsZXMucHVzaChbcmVzb2x2ZXIoaisxLCBpKzEpLCByZXNvbHZlcihqKzEsIGkpLCByZXNvbHZlcihqLCBpKzEpXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRyaWFuZ2xlcztcbn1cblxuZnVuY3Rpb24gcmVhZEdyaWQoZ3JpZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgcm93cyA9IGdyaWQuc3BsaXQoXCJcXG5cIilcbiAgICByb3dzLnBvcCgpO1xuICAgIGNvbnN0IHZlY3RvcnM6IFZlY3RvcltdID0gcm93cy5tYXAocm93ID0+IFZlY3Rvci5mcm9tQXJyYXkocm93LnNwbGl0KFwiIFwiKS5tYXAocGFyc2VGbG9hdCkpKTtcblxuICAgIGNvbnN0IHJlc29sdmVyID0gKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IHYgPSB2ZWN0b3JzW3kqR1JJRF9ESU1FTi54K3hdO1xuICAgICAgICBpZiAodiA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGV5XCIsIHgsIHkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHYueCwgdi55KTtcbiAgICB9XG4gICAgY29uc3QgdHJpYW5nbGVzID0gZmluZFRyaWFuZ2xlcyh2ZWN0b3JzLmxlbmd0aCwgcmVzb2x2ZXIpO1xuICAgIGNvbnNvbGUubG9nKFwiaGV5XCIpO1xuICAgIGNydW1wbGVkTWFwLnVwZGF0ZSh0cmlhbmdsZXMpOyAgICBcbn1cblxuZnVuY3Rpb24gaW50ZXJwb2xhdGVNYXBwaW5nKG1hcHBpbmdzOiBNYXBwaW5nW10sIHg6IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IHVwcGVyIDogTWFwcGluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbG93ZXIgOiBNYXBwaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIGZvciAobGV0IGk9MDsgaTxtYXBwaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobWFwcGluZ3NbaV0ueCA+PSB4ICYmICh1cHBlciA9PSB1bmRlZmluZWQgfHwgbWFwcGluZ3NbaV0ueCA8IHVwcGVyLngpKSB7XG4gICAgICAgICAgICB1cHBlciA9IG1hcHBpbmdzW2ldO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXBwaW5nc1tpXS54IDw9IHggJiYgKGxvd2VyID09IHVuZGVmaW5lZCB8fCBtYXBwaW5nc1tpXS54ID4gbG93ZXIueCkpIHtcbiAgICAgICAgICAgIGxvd2VyID0gbWFwcGluZ3NbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGxvd2VyID09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAodXBwZXIgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBpbnRlcnBvbGF0aW9uIHBvc3NpYmxlXCIpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVwcGVyLnk7XG4gICAgfVxuICAgIGlmICh1cHBlciA9PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiBsb3dlci55O1xuICAgIGlmICh1cHBlciA9PSBsb3dlcilcbiAgICAgICAgcmV0dXJuIHVwcGVyLnk7XG4gICAgcmV0dXJuICh4LWxvd2VyLngpLyh1cHBlci54LWxvd2VyLngpKih1cHBlci55LWxvd2VyLnkpK2xvd2VyLnk7XG59XG5cbmZ1bmN0aW9uIGdldEJpbmFyaWVzKCk6IE1hcHBpbmdbXSB7XG4gICAgaWYgKG1hcHBpbmdzID09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHJldHVybiBtYXBwaW5ncy55ZWFyLm1hcHBpbmcuY29uY2F0KG1hcHBpbmdzLnBhcmFtZXRlcnMubWFwcGluZywgbWFwcGluZ3MubWV0cmljcy5tYXBwaW5nLCBtYXBwaW5ncy5pbXBhY3RzLm1hcHBpbmcpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb250cm9scygpIHtcbiAgICBpZiAobWFwcGluZ3MgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjb250cm9scyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9scycpO1xuICAgIGlmIChjb250cm9scyA9PSB1bmRlZmluZWQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IHBvcHVsYXRlIGNvbnRyb2xzXCIpXG5cbiAgICBjb25zdCBiaW5hcmllcyA9IGdldEJpbmFyaWVzKCk7XG4gICAgY29uc29sZS5sb2coYmluYXJpZXMpO1xuXG4gICAgZm9yIChsZXQgaT0wOyBpPGJpbmFyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgY2hlY2tib3gudHlwZSA9ICdjaGVja2JveCc7XG4gICAgICAgIGNoZWNrYm94Lm5hbWUgPSBiaW5hcmllc1tpXS5pZDtcbiAgICAgICAgY2hlY2tib3guaWQgPSBiaW5hcmllc1tpXS5pZDtcbiAgICAgICAgY2hlY2tib3gub25pbnB1dCA9IHVwZGF0ZU1hcDtcblxuICAgICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIGxhYmVsLmh0bWxGb3IgPSBiaW5hcmllc1tpXS5pZDtcbiAgICAgICAgbGFiZWwuaW5uZXJIVE1MID0gYmluYXJpZXNbaV0ubGFiZWwuZW47XG5cbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChjaGVja2JveCk7XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgICAgIGNvbnRyb2xzLmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgIGNvbnNvbGUubG9nKGJpbmFyaWVzW2ldLmlkKTtcbiAgICB9XG4gICAgdXBkYXRlTWFwKCk7XG59XG5cbmZ1bmN0aW9uIGlzQ2hlY2tlZChpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkpLmNoZWNrZWRcbn1cblxuZnVuY3Rpb24gcGVybXV0YXRpb25TdHIoYmluYXJpZXM6IE1hcHBpbmdbXSkge1xuICAgIHJldHVybiBiaW5hcmllcy5tYXAoYiA9PiBiLmlkK1wiLVwiKygraXNDaGVja2VkKGIuaWQpKSkuam9pbihcIl9cIik7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZU1hcCgpIHtcbiAgICBpZiAobWFwcGluZ3MgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgeWVhcjIxMDAgPSBpc0NoZWNrZWQobWFwcGluZ3MueWVhci5tYXBwaW5nWzBdLmlkKTtcbiAgICBjb25zdCBlbWlzc2lvbnMgPSB5ZWFyMjEwMCA/IGN1bXVsYXRlQ28yRW1pc3Npb25zKCkgOiAwO1xuICAgIGNvbnNvbGUubG9nKCdDdW11bGF0ZWQgQ08yIGVtaXNzaW9uczonLCBlbWlzc2lvbnMpO1xuICAgIGNvbnN0IHRlbXBlcmF0dXJlID0gaW50ZXJwb2xhdGVNYXBwaW5nKG1hcHBpbmdzLmltcGFjdHNfc2NlbmFyaW9zLm1hcHBpbmcsIGVtaXNzaW9ucyk7XG4gICAgY29uc29sZS5sb2coJ1RlbXBlcmF0dXJlIGZvcmVjYXN0OicsIHRlbXBlcmF0dXJlKTtcbiAgICB1cGRhdGVUZW1wZXJhdHVyZSh0ZW1wZXJhdHVyZSk7XG5cbiAgICBmZXRjaCgnZGF0YS8nK3Blcm11dGF0aW9uU3RyKGdldEJpbmFyaWVzKCkpKycuY3N2JylcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpXG4gICAgLnRoZW4oZ3JpZCA9PiByZWFkR3JpZChncmlkKSk7XG59XG5cbmZ1bmN0aW9uIGN1bXVsYXRlQ28yRW1pc3Npb25zKCkge1xuICAgIGlmIChtYXBwaW5ncyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGxldCBjdW11bF9jbzIgPSBtYXBwaW5ncy55ZWFyLm1hcHBpbmdbMF0ueTtcbiAgICBjb25zdCBwYXJhbXMgPSBtYXBwaW5ncy5wYXJhbWV0ZXJzLm1hcHBpbmdcbiAgICBmb3IgKGxldCBpPTA7IGk8cGFyYW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNoZWNrYm94ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyYW1zW2ldLmlkKTtcbiAgICAgICAgaWYgKGNoZWNrYm94LmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGN1bXVsX2NvMiArPSBwYXJhbXNbaV0ueTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY3VtdWxfY28yO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVUZW1wZXJhdHVyZSh0ZW1wZXJhdHVyZTogbnVtYmVyKSB7XG4gICAgY29uc3QgdCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVtcGVyYXR1cmUnKTtcbiAgICB0LmlubmVySFRNTCA9IE1hdGgucm91bmQoKHRlbXBlcmF0dXJlKzEpKjEwKS8xMCtcIlwiO1xufVxuXG5mdW5jdGlvbiBsb2FkTWFwcGluZ3MoKSB7XG4gICAgZmV0Y2goJ3Jlcy9tYXBwaW5ncy5qc29uJylcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgIG1hcHBpbmdzID0ganNvbjtcbiAgICAgICAgY3JlYXRlQ29udHJvbHMoKTtcbiAgICB9KTsgXG59XG5cbmxvYWRNYXBwaW5ncygpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW4tZXhwb3NlZC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==