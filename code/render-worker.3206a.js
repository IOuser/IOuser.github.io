/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/code/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/ts-loader/index.js!./src/workers/render/render-worker.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/ts-loader/index.js!./src/workers/render/render-worker.ts":
/*!**********************************************************************!*\
  !*** ./node_modules/ts-loader!./src/workers/render/render-worker.ts ***!
  \**********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events */ "./src/workers/render/events.ts");
/* harmony import */ var _utils_shader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/shader */ "./src/utils/shader.ts");



self.addEventListener('message', function (event) {
    var _a = event.data, type = _a.type, data = _a.data;
    console.assert(type);
    switch (type) {
        case _events__WEBPACK_IMPORTED_MODULE_1__["initRenderEvent"].toString():
            return initEventHandler(data);
    }
});
function initEventHandler(data) {
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
        var buffer, canvas, pointsCount, shaders, cells, view, frameId, lastT, renderLoop;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("renderer " + _events__WEBPACK_IMPORTED_MODULE_1__["initRenderEvent"]);
                    console.log(data);
                    buffer = data.buffer, canvas = data.canvas, pointsCount = data.pointsCount, shaders = data.shaders;
                    cells = new Float32Array(buffer, 0, Math.floor(pointsCount * 4));
                    console.log('Buffer readed', cells.length, cells.byteLength);
                    console.log('Init view', canvas);
                    return [4 /*yield*/, initView(canvas, pointsCount, shaders)];
                case 1:
                    view = _a.sent();
                    view.render(cells);
                    lastT = 0;
                    renderLoop = function (t) {
                        var dt = t - lastT;
                        if (dt > 64) {
                            dt = 64;
                        }
                        lastT = t;
                        view.render(cells);
                        frameId = requestAnimationFrame(renderLoop);
                    };
                    frameId = requestAnimationFrame(renderLoop);
                    return [2 /*return*/];
            }
        });
    });
}
function initView(canvas, pointsCount, shaders) {
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
        var gl, particlesProgram, gridProgram, linesBuffer, linesBufferLength, w, h, scaleW, scaleH;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0:
                    gl = canvas.getContext('webgl', { alpha: false, antialias: true });
                    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
                    gl.clearColor(0, 0, 0, 1);
                    gl.disable(gl.DEPTH_TEST);
                    // gl.disable(gl.CULL_FACE);
                    gl.enable(gl.BLEND);
                    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
                    return [4 /*yield*/, Object(_utils_shader__WEBPACK_IMPORTED_MODULE_2__["getProgram"])(gl, 'particles shader', [
                            [gl.VERTEX_SHADER, shaders.particlesVertex],
                            [gl.FRAGMENT_SHADER, shaders.particlesFragment],
                        ])];
                case 1:
                    particlesProgram = _a.sent();
                    return [4 /*yield*/, Object(_utils_shader__WEBPACK_IMPORTED_MODULE_2__["getProgram"])(gl, 'grid shader', [
                            [gl.VERTEX_SHADER, shaders.gridVertex],
                            [gl.FRAGMENT_SHADER, shaders.gridFragment],
                        ])];
                case 2:
                    gridProgram = _a.sent();
                    linesBuffer = new Float32Array(512 * 1024);
                    linesBufferLength = linesBuffer.length;
                    w = canvas.width;
                    h = canvas.height;
                    scaleW = 2 / w;
                    scaleH = 2 / h;
                    return [2 /*return*/, {
                            render: function (buffer) {
                                gl.clear(gl.COLOR_BUFFER_BIT);
                                gl.useProgram(particlesProgram);
                                {
                                    var uniformLocation = gl.getUniformLocation(particlesProgram, 'resolution');
                                    gl.uniform2f(uniformLocation, w, h);
                                }
                                {
                                    var attribLocation = gl.getAttribLocation(particlesProgram, 'scale');
                                    gl.disableVertexAttribArray(attribLocation);
                                    gl.vertexAttrib2f(attribLocation, scaleW, scaleH);
                                }
                                {
                                    var attribLocation = gl.getAttribLocation(particlesProgram, 'velocity');
                                    gl.enableVertexAttribArray(attribLocation);
                                    gl.vertexAttribPointer(attribLocation, // index of attr
                                    2, // pick two values X and Y
                                    gl.FLOAT, // f32
                                    false, // normalized
                                    16, // stride (step in bytes)
                                    // dx, dy
                                    8);
                                }
                                {
                                    var attribLocation = gl.getAttribLocation(particlesProgram, 'coord');
                                    gl.enableVertexAttribArray(attribLocation);
                                    gl.vertexAttribPointer(attribLocation, // index of attr
                                    2, // pick two values X and Y
                                    gl.FLOAT, // f32
                                    false, // normalized
                                    16, // stride (step in bytes)
                                    0);
                                }
                                // console.log(buffer);
                                // console.log(buffer);
                                // debugger;
                                gl.bufferData(gl.ARRAY_BUFFER, buffer, gl.DYNAMIC_DRAW);
                                gl.drawArrays(gl.POINTS, 0, pointsCount);
                                // draw grid
                                gl.useProgram(gridProgram);
                                {
                                    var attribLocation = gl.getAttribLocation(gridProgram, 'scale');
                                    gl.disableVertexAttribArray(attribLocation);
                                    gl.vertexAttrib2f(attribLocation, scaleW, scaleH);
                                }
                                {
                                    var attribLocation = gl.getAttribLocation(gridProgram, 'coord');
                                    gl.enableVertexAttribArray(attribLocation);
                                    gl.vertexAttribPointer(attribLocation, // index of attr
                                    2, // pick two values X and Y
                                    gl.FLOAT, // f32
                                    false, // normalized
                                    8, // stride (step in bytes)
                                    0);
                                }
                                // const halfSideSize = sideSize * 0.5;
                                // const qt = new QuadTree<Coord & { i: number }>(new AABB({ x: 0, y: 0 }, { w: halfSideSize, h: halfSideSize }));
                                // measurer.measure();
                                // for (let i = 0; i + 4 < buffer.length; i += 4) {
                                //     qt.insert({ i, x: buffer[i], y: buffer[i + 1] });
                                // }
                                // measurer.measureEnd();
                                // let offset = 0;
                                // let getOffset = () => offset;
                                // let setOffset = (v: number) => { offset = v };
                                linesBuffer.fill(0, 0, linesBufferLength);
                                // qt.renderNodes(linesBuffer, linesBufferLength, getOffset, setOffset);
                                // modification
                                // qt.traverse((items: (Coord & { i: number })[]) => {
                                //     const l = items.length;
                                //     for (let j = 0; j < l; j++) {
                                //         const i1 = items[j];
                                //         for(let k = 0; k < l; k++) {
                                //             if (j === k) {
                                //                 continue;
                                //             }
                                //             const i2 = items[k];
                                //             if (Math.sqrt((i2.x - i1.x) ** 2 + (i2.y - i1.y) ** 2) < 10) {
                                //                 const amp = Math.sqrt(Math.random() * 0.3 + 0.1) * 0.5 - 0.3;
                                //                 const vec = Math.random() * 2.0 * 3.14;
                                //                 buffer[i1.i + 2] += Math.sin(vec) * amp * 0.02; // dx
                                //                 buffer[i1.i + 3] += Math.cos(vec) * amp * 0.02; // dy
                                //                 buffer[i2.i + 2] += Math.sin(vec + 3.14) * amp * 0.02; // dx
                                //                 buffer[i2.i + 3] += Math.cos(vec + 3.14) * amp * 0.02; // dy
                                //             }
                                //         }
                                //     }
                                // });
                                gl.bufferData(gl.ARRAY_BUFFER, linesBuffer, gl.DYNAMIC_DRAW);
                                gl.drawArrays(gl.LINES, 0, Math.floor(linesBufferLength / 2)); // 2 it's coord num (x, y)
                            },
                            resize: function (width, height) {
                                canvas.width = width;
                                canvas.height = height;
                                gl.viewport(0, 0, width, height);
                            }
                        }];
            }
        });
    });
}


/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "./src/utils/shader.ts":
/*!*****************************!*\
  !*** ./src/utils/shader.ts ***!
  \*****************************/
/*! exports provided: getProgram */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProgram", function() { return getProgram; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

function getProgram(gl, name, descriptors) {
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
        var shaders, program, _i, shaders_1, shader, numAttribs, ii, attribInfo, numUniforms, ii, uniformInfo;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(descriptors.map(function (descriptor) { return compileShader.apply(void 0, [gl, name].concat(descriptor)); }))];
                case 1:
                    shaders = _a.sent();
                    program = gl.createProgram();
                    for (_i = 0, shaders_1 = shaders; _i < shaders_1.length; _i++) {
                        shader = shaders_1[_i];
                        gl.attachShader(program, shader);
                    }
                    gl.linkProgram(program);
                    console.groupCollapsed(name + " attributes:");
                    numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
                    for (ii = 0; ii < numAttribs; ++ii) {
                        attribInfo = gl.getActiveAttrib(program, ii);
                        if (!attribInfo) {
                            break;
                        }
                        console.log(attribInfo.name, gl.getAttribLocation(program, attribInfo.name));
                    }
                    console.groupEnd();
                    numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
                    if (numUniforms) {
                        console.groupCollapsed(name + " uniforms:");
                        for (ii = 0; ii < numUniforms; ++ii) {
                            uniformInfo = gl.getActiveUniform(program, ii);
                            if (!uniformInfo) {
                                break;
                            }
                            console.log(uniformInfo.name, gl.getAttribLocation(program, uniformInfo.name));
                        }
                        console.groupEnd();
                    }
                    // TODO: Add textures
                    return [2 /*return*/, program];
            }
        });
    });
}
function compileShader(gl, name, flavour, source) {
    var shader = gl.createShader(flavour);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    console.groupCollapsed(name);
    console.log(source);
    console.log('shaderInfoLog:');
    console.log(gl.getShaderInfoLog(shader));
    console.groupEnd();
    return shader;
}


/***/ }),

/***/ "./src/workers/render/events.ts":
/*!**************************************!*\
  !*** ./src/workers/render/events.ts ***!
  \**************************************/
/*! exports provided: initRenderEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initRenderEvent", function() { return initRenderEvent; });
var initRenderEvent = function (data) { return ({
    type: 'init-render',
    data: data,
}); };
initRenderEvent.toString = function () { return 'init-render'; };


/***/ })

/******/ });
//# sourceMappingURL=render-worker.3206a.js.map