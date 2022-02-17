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
const GRID_DIMEN = new Vector_1.Vector(202, 101);
const crumpledMap = new CrumpledImage_1.CrumpledImage(GRID_DIMEN, 2000, findTriangles(GRID_DIMEN.x * GRID_DIMEN.y, (x, y) => new Vector_1.Vector(x, y)));
function findTriangles(elementsCount, resolver) {
    const triangles = [];
    const rowCount = Math.floor(elementsCount / GRID_DIMEN.x);
    console.log(rowCount);
    for (let i = 0; i < GRID_DIMEN.y; i += 1) {
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
    const resolver = (x, y) => vectors[y * GRID_DIMEN.x + x];
    const triangles = findTriangles(vectors.length, resolver);
    crumpledMap.update(triangles);
}
fetch('data/wildfires.dat')
    .then(response => response.text())
    .then(grid => readGrid(grid));


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDN0YsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDNUYsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDNUYsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM3RixJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ2hJLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFFaEksR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV4QixHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUFBLENBQUM7Q0FDTDtBQS9HRCxzQ0ErR0M7Ozs7Ozs7Ozs7Ozs7OztBQ2xIRCxNQUFhLE1BQU07SUFHZixZQUFtQixDQUFTLEVBQVMsQ0FBUztRQUEzQixNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBQVMsTUFBQyxHQUFELENBQUMsQ0FBUTtJQUM5QyxDQUFDO0lBRUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFhO1FBQzFCLE9BQU8sSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBWTtRQUNkLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxHQUFHLENBQUMsSUFBWTtRQUNaLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxVQUFVLENBQUMsTUFBYztRQUNyQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RCxPQUFPLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFhLEVBQUUsQ0FBUztRQUM1QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RCxDQUFDOztBQTlCTCx3QkErQkM7QUE5QlUsV0FBSSxHQUFXLElBQUksTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUNEM0Msd0VBQWtDO0FBQ2xDLDZGQUFnRDtBQUVoRCxNQUFNLFVBQVUsR0FBRyxJQUFJLGVBQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFFeEMsTUFBTSxXQUFXLEdBQUcsSUFBSSw2QkFBYSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksZUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFOUgsU0FBUyxhQUFhLENBQUMsYUFBcUIsRUFBRSxRQUEwQztJQUNwRixNQUFNLFNBQVMsR0FBK0IsRUFBRTtJQUNoRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QixLQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUUsQ0FBQyxFQUFFO1FBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLElBQUUsQ0FBQyxFQUFFO1lBQ2pDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1RTtLQUNKO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQUVELFNBQVMsUUFBUSxDQUFDLElBQVk7SUFDMUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDN0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ1gsTUFBTSxPQUFPLEdBQWEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLGVBQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTVGLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzFELFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEMsQ0FBQztBQUVELEtBQUssQ0FBQyxvQkFBb0IsQ0FBQztLQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7VUNoQ2xDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztVRVBEO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy8uL3NyYy9BbmltYXRvci50cz8wY2I4Iiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvLi9zcmMvQ3J1bXBsZWRJbWFnZS50cz8xMmEzIiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvLi9zcmMvVmVjdG9yLnRzPzUxZDkiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy8uL3NyYy9tYWluLWV4cG9zZWQudHMiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy8uL25vZGVfbW9kdWxlcy9leHBvc2UtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRHbG9iYWxUaGlzLmpzIiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvLi9zcmMvQW5pbWF0b3IudHMiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy8uL3NyYy9DcnVtcGxlZEltYWdlLnRzIiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvLi9zcmMvVmVjdG9yLnRzIiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NsaW1hdGUtY2hhbmdlLWNhcnRvZ3JhbXMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9jbGltYXRlLWNoYW5nZS1jYXJ0b2dyYW1zL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2xpbWF0ZS1jaGFuZ2UtY2FydG9ncmFtcy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fID0gcmVxdWlyZShcIi0hLi4vbm9kZV9tb2R1bGVzL3RzLWxvYWRlci9pbmRleC5qcz8/cnVsZVNldFsxXS5ydWxlc1swXS51c2VbMV0hLi9BbmltYXRvci50c1wiKTtcbnZhciBfX19FWFBPU0VfTE9BREVSX0dFVF9HTE9CQUxfVEhJU19fXyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvZXhwb3NlLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0R2xvYmFsVGhpcy5qc1wiKTtcbnZhciBfX19FWFBPU0VfTE9BREVSX0dMT0JBTF9USElTX19fID0gX19fRVhQT1NFX0xPQURFUl9HRVRfR0xPQkFMX1RISVNfX187XG5fX19FWFBPU0VfTE9BREVSX0dMT0JBTF9USElTX19fW1wiQ0NDXCJdID0gX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX187XG5tb2R1bGUuZXhwb3J0cyA9IF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fO1xuIiwidmFyIF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fID0gcmVxdWlyZShcIi0hLi4vbm9kZV9tb2R1bGVzL3RzLWxvYWRlci9pbmRleC5qcz8/cnVsZVNldFsxXS5ydWxlc1swXS51c2VbMV0hLi9DcnVtcGxlZEltYWdlLnRzXCIpO1xudmFyIF9fX0VYUE9TRV9MT0FERVJfR0VUX0dMT0JBTF9USElTX19fID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9leHBvc2UtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRHbG9iYWxUaGlzLmpzXCIpO1xudmFyIF9fX0VYUE9TRV9MT0FERVJfR0xPQkFMX1RISVNfX18gPSBfX19FWFBPU0VfTE9BREVSX0dFVF9HTE9CQUxfVEhJU19fXztcbl9fX0VYUE9TRV9MT0FERVJfR0xPQkFMX1RISVNfX19bXCJDQ0NcIl0gPSBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXztcbm1vZHVsZS5leHBvcnRzID0gX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX187XG4iLCJ2YXIgX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX18gPSByZXF1aXJlKFwiLSEuLi9ub2RlX21vZHVsZXMvdHMtbG9hZGVyL2luZGV4LmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzBdLnVzZVsxXSEuL1ZlY3Rvci50c1wiKTtcbnZhciBfX19FWFBPU0VfTE9BREVSX0dFVF9HTE9CQUxfVEhJU19fXyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvZXhwb3NlLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0R2xvYmFsVGhpcy5qc1wiKTtcbnZhciBfX19FWFBPU0VfTE9BREVSX0dMT0JBTF9USElTX19fID0gX19fRVhQT1NFX0xPQURFUl9HRVRfR0xPQkFMX1RISVNfX187XG5fX19FWFBPU0VfTE9BREVSX0dMT0JBTF9USElTX19fW1wiQ0NDXCJdID0gX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX187XG5tb2R1bGUuZXhwb3J0cyA9IF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fO1xuIiwidmFyIF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fID0gcmVxdWlyZShcIi0hLi4vbm9kZV9tb2R1bGVzL3RzLWxvYWRlci9pbmRleC5qcz8/cnVsZVNldFsxXS5ydWxlc1swXS51c2VbMV0hLi9tYWluLnRzXCIpO1xudmFyIF9fX0VYUE9TRV9MT0FERVJfR0VUX0dMT0JBTF9USElTX19fID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9leHBvc2UtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRHbG9iYWxUaGlzLmpzXCIpO1xudmFyIF9fX0VYUE9TRV9MT0FERVJfR0xPQkFMX1RISVNfX18gPSBfX19FWFBPU0VfTE9BREVSX0dFVF9HTE9CQUxfVEhJU19fXztcbl9fX0VYUE9TRV9MT0FERVJfR0xPQkFMX1RISVNfX19bXCJDQ0NcIl0gPSBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXztcbm1vZHVsZS5leHBvcnRzID0gX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICByZXR1cm4gZ2xvYmFsVGhpcztcbiAgfVxuXG4gIHZhciBnO1xuXG4gIHRyeSB7XG4gICAgLy8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gICAgZyA9IHRoaXMgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgfSAvLyBUaGlzIHdvcmtzIGlmIHRoZSBzZWxmIHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblxuXG4gICAgaWYgKHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiKSB7XG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9IC8vIFRoaXMgd29ya3MgaWYgdGhlIGdsb2JhbCByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cblxuICAgIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICByZXR1cm4gZ2xvYmFsO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnO1xufSgpOyIsImV4cG9ydCBjbGFzcyBBbmltYXRvciB7XG5cbiAgICBzdGF0aWMgRUFTRV9OT05FOiAoeDogbnVtYmVyKSA9PiBudW1iZXIgPSB4ID0+IHg7XG4gICAgc3RhdGljIEVBU0VfQ1VCSUM6ICh4OiBudW1iZXIpID0+IG51bWJlciA9IHggPT4geCA8IDAuNSA/IDQgKiB4ICogeCAqIHggOiAxIC0gTWF0aC5wb3coLTIgKiB4ICsgMiwgMykgLyAyO1xuICAgIHN0YXRpYyBFQVNFX1NJTkU6ICh4OiBudW1iZXIpID0+IG51bWJlciA9IHggPT4gLShNYXRoLmNvcyhNYXRoLlBJICogeCkgLSAxKSAvIDI7XG4gICAgXG4gICAgcHJpdmF0ZSBfZnJvbTogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF90bzogbnVtYmVyID0gMTtcbiAgICBwcml2YXRlIF90aW1lUGFzc2VkOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX2Vhc2U6ICh4OiBudW1iZXIpID0+IG51bWJlciA9IEFuaW1hdG9yLkVBU0VfTk9ORTtcblxuICAgIHByaXZhdGUgY2FsbGJhY2s6ICh4OiBudW1iZXIsIGlzTGFzdDogYm9vbGVhbikgPT4gYm9vbGVhbiA9IHggPT4gdHJ1ZTtcbiAgICBwcml2YXRlIHN0YXJ0VGltZTogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIGR1cmF0aW9uTWlsbGlzZWNvbmRzOiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGZyb20oZnJvbTogbnVtYmVyKTogQW5pbWF0b3Ige1xuICAgICAgICB0aGlzLl9mcm9tID0gZnJvbTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIHRvKHRvOiBudW1iZXIpOiBBbmltYXRvciB7XG4gICAgICAgIHRoaXMuX3RvID0gdG87XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyB0aW1lUGFzc2VkKHRpbWVQYXNzZWQ6IG51bWJlcik6IEFuaW1hdG9yIHtcbiAgICAgICAgdGhpcy5fdGltZVBhc3NlZCA9IHRpbWVQYXNzZWQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBlYXNlKGVhc2U6ICh4OiBudW1iZXIpID0+IG51bWJlcik6IEFuaW1hdG9yIHtcbiAgICAgICAgdGhpcy5fZWFzZSA9IGVhc2U7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyB3YWl0KGRlbGF5TWlsbGlzZWNvbmRzOiBudW1iZXIsIGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIGlmIChkZWxheU1pbGxpc2Vjb25kcyA+IDApIHtcbiAgICAgICAgICAgIHRoaXMudGltZW91dChjYWxsYmFjaywgZGVsYXlNaWxsaXNlY29uZHMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFuaW1hdGUoZHVyYXRpb25NaWxsaXNlY29uZHM6IG51bWJlciwgY2FsbGJhY2s6ICh4OiBudW1iZXIsIGlzTGFzdDogYm9vbGVhbikgPT4gYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmR1cmF0aW9uTWlsbGlzZWNvbmRzID0gZHVyYXRpb25NaWxsaXNlY29uZHM7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgdGhpcy5zdGFydFRpbWUgPSB0aGlzLm5vdygpO1xuICAgICAgICB0aGlzLmZyYW1lKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmcmFtZSgpIHtcbiAgICAgICAgY29uc3Qgbm93ID0gdGhpcy5ub3coKTtcbiAgICAgICAgbGV0IHggPSAxO1xuICAgICAgICBpZiAodGhpcy5kdXJhdGlvbk1pbGxpc2Vjb25kcyA+IDApIHtcbiAgICAgICAgICAgIHggPSAobm93LXRoaXMuc3RhcnRUaW1lK3RoaXMuX3RpbWVQYXNzZWQpIC8gdGhpcy5kdXJhdGlvbk1pbGxpc2Vjb25kcztcbiAgICAgICAgfVxuICAgICAgICB4ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgeCkpO1xuICAgICAgICBjb25zdCB5ID0gdGhpcy5fZnJvbSArICh0aGlzLl90by10aGlzLl9mcm9tKSAqIHRoaXMuX2Vhc2UoeCk7XG4gICAgICAgIGNvbnN0IGNvbnQgPSB0aGlzLmNhbGxiYWNrKHksIHggPT0gMSk7XG4gICAgICAgIGlmIChjb250ICYmIHggPCAxKSB7XG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RGcmFtZSgoKSA9PiB0aGlzLmZyYW1lKCkpO1xuICAgICAgICB9IGVsc2UgaWYgKCFjb250KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU3RvcHBlZCBhbmltYXRpb24gYmVjYXVzZSBjYWxsYmFjayByZXR1cm5lZCBmYWxzZS4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbm93KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHRpbWVvdXQoY2FsbGJhY2s6ICgpID0+IHZvaWQsIGRlbGF5TWlsbGlzZWNvbmRzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIGRlbGF5TWlsbGlzZWNvbmRzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlcXVlc3RGcmFtZShjYWxsYmFjazogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNhbGxiYWNrKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBBbmltYXRvciB9IGZyb20gXCIuL0FuaW1hdG9yXCI7XG5pbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi9WZWN0b3JcIjtcblxuZXhwb3J0IGNsYXNzIENydW1wbGVkSW1hZ2Uge1xuICAgIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBwcml2YXRlIGNhbnZhc0RpbWVuOiBWZWN0b3IgPSBWZWN0b3IuTlVMTDtcbiAgICBwcml2YXRlIGNhbnZhc1RsOiBWZWN0b3IgPSBWZWN0b3IuTlVMTDtcbiAgICBwcml2YXRlIGltZzogSFRNTEltYWdlRWxlbWVudDtcbiAgICBwcml2YXRlIGltZ0RpbWVuOiBWZWN0b3IgPSBWZWN0b3IuTlVMTDtcbiAgICBwcml2YXRlIGN1cnJlbnRTdGF0ZT86IFtWZWN0b3IsIFZlY3RvciwgVmVjdG9yXVtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBncmlkRGltZW46IFZlY3RvciwgcHJpdmF0ZSBhbmltYXRpb25EdXJhdGlvbk1zOiBudW1iZXIsIHByaXZhdGUgc3JjVHJpYW5nbGVzOiBbVmVjdG9yLCBWZWN0b3IsIFZlY3Rvcl1bXSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHNyY1RyaWFuZ2xlcztcbiAgICAgICAgdGhpcy5jYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpO1xuICAgICAgICB0aGlzLmltZyA9IDxIVE1MSW1hZ2VFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAtc3JjJyk7XG4gICAgICAgIHRoaXMucmVzaXplQ2FudmFzKCk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB0aGlzLnJlc2l6ZUNhbnZhcygpLCBmYWxzZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaW1nLmNvbXBsZXRlKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxEcmF3KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmltZy5vbmxvYWQgPSAoKSA9PiB0aGlzLmluaXRpYWxEcmF3KCk7XG4gICAgICAgIH0gICAgICAgIFxuICAgIH1cblxuICAgIHByaXZhdGUgcmVzaXplQ2FudmFzKCkge1xuICAgICAgICBjb25zdCByID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHRoaXMuY2FudmFzRGltZW4gPSBuZXcgVmVjdG9yKHIud2lkdGgsIHIuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5jYW52YXNUbCA9IG5ldyBWZWN0b3Ioci50b3AsIHIubGVmdCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0aWFsRHJhdygpIHtcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgdGhpcy5pbWdEaW1lbiA9IG5ldyBWZWN0b3IodGhpcy5pbWcud2lkdGgsIHRoaXMuaW1nLmhlaWdodCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2FudmFzRGltZW4pO1xuICAgICAgICAvL2N0eD8uZHJhd0ltYWdlKHRoaXMuaW1nLCAwLCAwLCB0aGlzLmNhbnZhc0RpbWVuLngsIHRoaXMuaW1nRGltZW4ueS90aGlzLmltZ0RpbWVuLngqdGhpcy5jYW52YXNEaW1lbi54KTtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFN0YXRlICE9IHVuZGVmaW5lZCkgdGhpcy51cGRhdGUodGhpcy5jdXJyZW50U3RhdGUpO1xuICAgIH1cblxuICAgIHVwZGF0ZShuZXdTdGF0ZTogW1ZlY3RvciwgVmVjdG9yLCBWZWN0b3JdW10pIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCB1cGRhdGVcIik7XG4gICAgICAgIGNvbnN0IGFuaW1hdG9yID0gbmV3IEFuaW1hdG9yKCk7XG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGlmIChjdHggIT0gbnVsbCkge1xuICAgICAgICAgICAgYW5pbWF0b3IuYW5pbWF0ZSh0aGlzLmFuaW1hdGlvbkR1cmF0aW9uTXMsICh4LCBpc0xhc3QpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdGFydGVkIHVwZGF0ZVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcFRyaWFuZ2xlcyhuZXdTdGF0ZSwgeCwgY3R4KTtcbiAgICAgICAgICAgICAgICBpZiAoaXNMYXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gbmV3U3RhdGU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYXBwbGllZCB1cGRhdGVcIiwgcGVyZm9ybWFuY2Uubm93KCktcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG1hcFRyaWFuZ2xlcyhuZXdTdGF0ZTogW1ZlY3RvciwgVmVjdG9yLCBWZWN0b3JdW10sIHg6IG51bWJlciwgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcbiAgICAgICAgaWYgKG5ld1N0YXRlLmxlbmd0aCAhPSB0aGlzLmN1cnJlbnRTdGF0ZT8ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJuZXdTdGF0ZSBoYXMgZGlmZmVyZW50IGxlbmd0aCAoXCIrbmV3U3RhdGUubGVuZ3RoK1wiKSB0aGFuIGN1cnJlbnRTdGF0ZSAoXCIrdGhpcy5jdXJyZW50U3RhdGU/Lmxlbmd0aCtcIilcIik7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhc0RpbWVuLngsIHRoaXMuY2FudmFzRGltZW4ueSk7XG4gICAgICAgIGZvciAobGV0IGk9MDtpPG5ld1N0YXRlLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHNyYyA9IHRoaXMuc3JjVHJpYW5nbGVzW2ldLm1hcChjID0+IHRoaXMuZ3JpZDJJbWdDb29yZHMoYykpO1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmN1cnJlbnRTdGF0ZVtpXTtcbiAgICAgICAgICAgIGNvbnN0IGRzdCA9IG5ld1N0YXRlW2ldLm1hcCgoYzogVmVjdG9yLCBqOiBudW1iZXIpID0+IHRoaXMuZ3JpZDJDYW52YXNDb29yZHMoc3RhcnRbal0uYmV0d2VlbihjLCB4KSkpO1xuICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNyYywgc3RhcnQsIGRzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRyYXdUcmlhbmdsZShjdHgsIHRoaXMuaW1nLFxuICAgICAgICAgICAgICAgIGRzdFswXSwgZHN0WzFdLCBkc3RbMl0sXG4gICAgICAgICAgICAgICAgc3JjWzBdLCBzcmNbMV0sIHNyY1syXVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIGdyaWQySW1nQ29vcmRzKHY6IFZlY3Rvcikge1xuICAgICAgICBjb25zdCBzY2FsZSA9IHRoaXMuaW1nRGltZW4ueCAvIHRoaXMuZ3JpZERpbWVuLng7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHYueCpzY2FsZSwgdi55KnNjYWxlKTtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBncmlkMkNhbnZhc0Nvb3Jkcyh2OiBWZWN0b3IpIHtcbiAgICAgICAgY29uc3Qgc2NhbGUgPSB0aGlzLmNhbnZhc0RpbWVuLnggLyB0aGlzLmdyaWREaW1lbi54O1xuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih2Lngqc2NhbGUsIHYueSpzY2FsZSk7XG4gICAgfVxuICAgIFxuICAgIC8vIGluc3BpcmVkIGJ5IGh0dHA6Ly90dWxyaWNoLmNvbS9nZWVrc3R1ZmYvY2FudmFzL2pzZ2wuanNcbiAgICBwcml2YXRlIGRyYXdUcmlhbmdsZShjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgaW06IEhUTUxJbWFnZUVsZW1lbnQsIGQwOiBWZWN0b3IsIGQxOiBWZWN0b3IsIGQyOiBWZWN0b3IsIHMwOiBWZWN0b3IsIHMxOiBWZWN0b3IsIHMyOiBWZWN0b3IpIHtcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICBcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubW92ZVRvKGQwLngsIGQwLnkpO1xuICAgICAgICBjdHgubGluZVRvKGQxLngsIGQxLnkpO1xuICAgICAgICBjdHgubGluZVRvKGQyLngsIGQyLnkpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIC8vY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguY2xpcCgpO1xuICAgIFxuICAgICAgICB2YXIgZGVub20gPSBzMC54ICogKHMyLnkgLSBzMS55KSAtIHMxLnggKiBzMi55ICsgczIueCAqIHMxLnkgKyAoczEueCAtIHMyLngpICogczAueTtcbiAgICAgICAgaWYgKGRlbm9tID09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbTExID0gLShzMC55ICogKGQyLnggLSBkMS54KSAtIHMxLnkgKiBkMi54ICsgczIueSAqIGQxLnggKyAoczEueSAtIHMyLnkpICogZDAueCkgLyBkZW5vbTtcbiAgICAgICAgdmFyIG0xMiA9IChzMS55ICogZDIueSArIHMwLnkgKiAoZDEueSAtIGQyLnkpIC0gczIueSAqIGQxLnkgKyAoczIueSAtIHMxLnkpICogZDAueSkgLyBkZW5vbTtcbiAgICAgICAgdmFyIG0yMSA9IChzMC54ICogKGQyLnggLSBkMS54KSAtIHMxLnggKiBkMi54ICsgczIueCAqIGQxLnggKyAoczEueCAtIHMyLngpICogZDAueCkgLyBkZW5vbTtcbiAgICAgICAgdmFyIG0yMiA9IC0oczEueCAqIGQyLnkgKyBzMC54ICogKGQxLnkgLSBkMi55KSAtIHMyLnggKiBkMS55ICsgKHMyLnggLSBzMS54KSAqIGQwLnkpIC8gZGVub207XG4gICAgICAgIHZhciBkeCA9IChzMC54ICogKHMyLnkgKiBkMS54IC0gczEueSAqIGQyLngpICsgczAueSAqIChzMS54ICogZDIueCAtIHMyLnggKiBkMS54KSArIChzMi54ICogczEueSAtIHMxLnggKiBzMi55KSAqIGQwLngpIC8gZGVub207XG4gICAgICAgIHZhciBkeSA9IChzMC54ICogKHMyLnkgKiBkMS55IC0gczEueSAqIGQyLnkpICsgczAueSAqIChzMS54ICogZDIueSAtIHMyLnggKiBkMS55KSArIChzMi54ICogczEueSAtIHMxLnggKiBzMi55KSAqIGQwLnkpIC8gZGVub207XG4gICAgXG4gICAgICAgIGN0eC50cmFuc2Zvcm0obTExLCBtMTIsIG0yMSwgbTIyLCBkeCwgZHkpOyAgICAgICAgXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoaW0sIDAsIDApO1xuICAgICAgICBcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9O1xufSIsImV4cG9ydCBjbGFzcyBWZWN0b3Ige1xuICAgIHN0YXRpYyBOVUxMOiBWZWN0b3IgPSBuZXcgVmVjdG9yKDAsIDApO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHg6IG51bWJlciwgcHVibGljIHk6IG51bWJlcikge1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tQXJyYXkoYXJyOiBudW1iZXJbXSkge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcihhcnJbMF0sIGFyclsxXSk7XG4gICAgfVxuXG4gICAgZ2V0IGxlbmd0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMueCwgMikgKyBNYXRoLnBvdyh0aGlzLnksIDIpKTtcbiAgICB9XG5cbiAgICBkZWx0YSh0aGF0OiBWZWN0b3IpOiBWZWN0b3Ige1xuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGF0LnggLSB0aGlzLngsIHRoYXQueSAtIHRoaXMueSk7XG4gICAgfVxuXG4gICAgYWRkKHRoYXQ6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCArIHRoYXQueCwgdGhpcy55ICsgdGhhdC55KTtcbiAgICB9XG5cbiAgICB3aXRoTGVuZ3RoKGxlbmd0aDogbnVtYmVyKTogVmVjdG9yIHtcbiAgICAgICAgY29uc3QgcmF0aW8gPSB0aGlzLmxlbmd0aCAhPSAwID8gbGVuZ3RoL3RoaXMubGVuZ3RoIDogMDtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54KnJhdGlvLCB0aGlzLnkqcmF0aW8pO1xuICAgIH1cblxuICAgIGJldHdlZW4ob3RoZXI6IFZlY3RvciwgeDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGRlbHRhID0gdGhpcy5kZWx0YShvdGhlcik7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZChkZWx0YS53aXRoTGVuZ3RoKGRlbHRhLmxlbmd0aCp4KSk7XG4gICAgfVxufSIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuL1ZlY3RvclwiO1xuaW1wb3J0IHsgQ3J1bXBsZWRJbWFnZSB9IGZyb20gXCIuL0NydW1wbGVkSW1hZ2VcIjtcblxuY29uc3QgR1JJRF9ESU1FTiA9IG5ldyBWZWN0b3IoMjAyLCAxMDEpO1xuXG5jb25zdCBjcnVtcGxlZE1hcCA9IG5ldyBDcnVtcGxlZEltYWdlKEdSSURfRElNRU4sIDIwMDAsIGZpbmRUcmlhbmdsZXMoR1JJRF9ESU1FTi54KkdSSURfRElNRU4ueSwgKHgsIHkpID0+IG5ldyBWZWN0b3IoeCwgeSkpKTtcblxuZnVuY3Rpb24gZmluZFRyaWFuZ2xlcyhlbGVtZW50c0NvdW50OiBudW1iZXIsIHJlc29sdmVyOiAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IFZlY3Rvcikge1xuICAgIGNvbnN0IHRyaWFuZ2xlczogW1ZlY3RvciwgVmVjdG9yLCBWZWN0b3JdW10gPSBbXVxuICAgIGNvbnN0IHJvd0NvdW50ID0gTWF0aC5mbG9vcihlbGVtZW50c0NvdW50L0dSSURfRElNRU4ueCk7XG4gICAgY29uc29sZS5sb2cocm93Q291bnQpO1xuICAgIGZvciAobGV0IGk9MDtpPEdSSURfRElNRU4ueTsgaSs9MSkge1xuICAgICAgICBmb3IgKGxldCBqPTA7ajxHUklEX0RJTUVOLngtMTsgais9MSkge1xuICAgICAgICAgICAgdHJpYW5nbGVzLnB1c2goW3Jlc29sdmVyKGosIGkpLCByZXNvbHZlcihqKzEsIGkpLCByZXNvbHZlcihqLCBpKzEpXSk7XG4gICAgICAgICAgICB0cmlhbmdsZXMucHVzaChbcmVzb2x2ZXIoaisxLCBpKzEpLCByZXNvbHZlcihqKzEsIGkpLCByZXNvbHZlcihqLCBpKzEpXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRyaWFuZ2xlcztcbn1cblxuZnVuY3Rpb24gcmVhZEdyaWQoZ3JpZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgcm93cyA9IGdyaWQuc3BsaXQoXCJcXG5cIilcbiAgICByb3dzLnBvcCgpO1xuICAgIGNvbnN0IHZlY3RvcnM6IFZlY3RvcltdID0gcm93cy5tYXAocm93ID0+IFZlY3Rvci5mcm9tQXJyYXkocm93LnNwbGl0KFwiIFwiKS5tYXAocGFyc2VGbG9hdCkpKTtcblxuICAgIGNvbnN0IHJlc29sdmVyID0gKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiB2ZWN0b3JzW3kqR1JJRF9ESU1FTi54K3hdO1xuICAgIGNvbnN0IHRyaWFuZ2xlcyA9IGZpbmRUcmlhbmdsZXModmVjdG9ycy5sZW5ndGgsIHJlc29sdmVyKTtcbiAgICBjcnVtcGxlZE1hcC51cGRhdGUodHJpYW5nbGVzKTsgICAgXG59XG5cbmZldGNoKCdkYXRhL3dpbGRmaXJlcy5kYXQnKVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRleHQoKSlcbiAgICAudGhlbihncmlkID0+IHJlYWRHcmlkKGdyaWQpKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW4tZXhwb3NlZC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==