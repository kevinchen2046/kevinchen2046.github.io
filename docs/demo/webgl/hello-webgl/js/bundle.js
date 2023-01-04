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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Geometry.ts":
/*!*************************!*\
  !*** ./src/Geometry.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Geometry = void 0;
const Util_1 = __webpack_require__(/*! ./core/Util */ "./src/core/Util.ts");
class Geometry {
    constructor(sigX, sigY) {
        this.size = 1;
        this.map = new Util_1.Hashtable();
        this.rects = [];
        let halfX = sigX / 2;
        let halfY = sigY / 2;
        for (let b = 0; b <= sigY; b++) {
            for (let a = 0; a <= sigX; a++) {
                this.map.set(`${a}_${b}`, new Point((a - halfX) / sigX, (halfY - b) / sigY, this.randColor()));
            }
        }
        for (let b = 0; b < sigY; b++) {
            for (let a = 0; a < sigX; a++) {
                let index = b * sigX + a;
                if (!this.rects[index]) {
                    let ra = this.getPoint(a, b);
                    let rb = this.getPoint(a, b + 1);
                    let rc = this.getPoint(a + 1, b + 1);
                    let rd = this.getPoint(a + 1, b);
                    this.rects[index] = new Rect(ra, rb, rc, rd);
                }
            }
        }
        // console.log(this.map.length);
        // console.log(this.rects.length);
        this.points = [];
        this.rects.forEach(rect => rect.concat(this.points));
        this.values = new Array(this.points.length * 5);
        this.buffer = new Float32Array(this.values);
    }
    getPoint(a, b) {
        return this.map.get(`${a}_${b}`);
    }
    randColor() {
        return Math.floor(Math.random() * 0xFFFFFF);
    }
    update() {
        this.points.forEach((p, i) => {
            let index = i * 5;
            this.buffer[index] = p.x;
            this.buffer[index + 1] = p.y;
            this.buffer[index + 2] = p.r;
            this.buffer[index + 3] = p.g;
            this.buffer[index + 4] = p.b;
        });
    }
    pointToString() {
        return this.points.map((p, i) => {
            return { x: p.x, y: p.y };
        });
    }
}
exports.Geometry = Geometry;
class Point {
    constructor(x = 0, y = 0, color = 0xFFFFFF) {
        this.x = x;
        this.y = y;
        this.setColor(color);
    }
    clone() {
        let _p = new Point();
        _p.x = this.x;
        _p.y = this.y;
        _p.r = this.r;
        _p.g = this.g;
        _p.b = this.b;
        return _p;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
    setColor(v) {
        let { r, g, b } = Util_1.ColorUtil.extract(v);
        this.r = r / 0xFF;
        this.g = g / 0xFF;
        this.b = b / 0xFF;
    }
    format() {
        return [
            this.x,
            this.y,
            this.r,
            this.g,
            this.b
        ];
    }
    average(target) {
        if (this.x == target.x) {
            return { x: this.x, y: this.y + (target.y - this.y) / 2, r: Math.floor(this.r + target.r / 2), g: Math.floor(this.g + target.g / 2), b: Math.floor(this.b + target.b / 2) };
        }
        if (this.y == target.y) {
            return { x: this.x + (target.x - this.x) / 2, y: this.y, r: Math.floor(this.r + target.r / 2), g: Math.floor(this.g + target.g / 2), b: Math.floor(this.b + target.b / 2) };
        }
        return { x: this.x + (target.x - this.x) / 2, y: this.y + (target.y - this.y) / 2, r: Math.floor(this.r + target.r / 2), g: Math.floor(this.g + target.g / 2), b: Math.floor(this.b + target.b / 2) };
    }
}
class Rect {
    constructor(a, b, c, d) {
        this.points = [a, b, c, d];
        //[a, b, d, b, c, d]
    }
    concat(list) {
        return list.push(this.a, this.b, this.d, this.b, this.c, this.d);
    }
    get a() { return this.points[0]; }
    get b() { return this.points[1]; }
    get c() { return this.points[2]; }
    get d() { return this.points[3]; }
}


/***/ }),

/***/ "./src/HelloWebGL.ts":
/*!***************************!*\
  !*** ./src/HelloWebGL.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloWebGL = void 0;
const Geometry_1 = __webpack_require__(/*! ./Geometry */ "./src/Geometry.ts");
const GLSL_1 = __webpack_require__(/*! ./core/GLSL */ "./src/core/GLSL.ts");
const RenderContext_1 = __webpack_require__(/*! ./core/RenderContext */ "./src/core/RenderContext.ts");
let MyVS = class MyVS extends GLSL_1.GLSL_Vertex {
    st(a, b, s) {
        return (a - s + a + s + b);
    }
    main() {
        let x = this.a_Position.x;
        let y = this.a_Position.y;
        let time = this.u_time / 30.0;
        let x1 = x - 0.5;
        let y1 = 0.5 - y;
        let dis = GLSL_1.sin(0.5 - x1) + GLSL_1.cos(y1);
        x += GLSL_1.sin(dis + time) / 5.0;
        y += GLSL_1.cos(dis + time) / 5.0;
        this.gl_Position = GLSL_1._vec4(x, y, 0.0, 1.0);
        this.v_Color = this.a_Color;
        this.v_TexCoord = GLSL_1._vec2(this.a_Position.x - 0.5, 0.5 - this.a_Position.y);
    }
};
__decorate([
    GLSL_1.attribute(GLSL_1.DefinedType.vec2)
], MyVS.prototype, "a_Position", void 0);
__decorate([
    GLSL_1.attribute(GLSL_1.DefinedType.float)
], MyVS.prototype, "a_Color", void 0);
__decorate([
    GLSL_1.uniform(GLSL_1.DefinedType.float)
], MyVS.prototype, "u_time", void 0);
__decorate([
    GLSL_1.varying(GLSL_1.DefinedType.float)
], MyVS.prototype, "v_Color", void 0);
__decorate([
    GLSL_1.varying(GLSL_1.DefinedType.vec2)
], MyVS.prototype, "v_TexCoord", void 0);
__decorate([
    GLSL_1.method([GLSL_1.DefinedType.float], GLSL_1.DefinedType.float)
], MyVS.prototype, "st", null);
MyVS = __decorate([
    GLSL_1.precision(GLSL_1.PrecisionType.mediump)
], MyVS);
let MyFS = class MyFS extends GLSL_1.GLSL_Fragment {
    main() {
        this.gl_FragColor = GLSL_1.texture2D(this.u_Sampler, this.v_TexCoord);
    }
};
__decorate([
    GLSL_1.uniform(GLSL_1.DefinedType.sampler2D)
], MyFS.prototype, "u_Sampler", void 0);
__decorate([
    GLSL_1.uniform(GLSL_1.DefinedType.float)
], MyFS.prototype, "u_time", void 0);
__decorate([
    GLSL_1.varying(GLSL_1.DefinedType.float)
], MyFS.prototype, "v_Color", void 0);
__decorate([
    GLSL_1.varying(GLSL_1.DefinedType.vec2)
], MyFS.prototype, "v_TexCoord", void 0);
MyFS = __decorate([
    GLSL_1.precision(GLSL_1.PrecisionType.mediump)
], MyFS);
class HelloWebGL {
    constructor() {
        this.initialize();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            var canvas = document.getElementById('webgl');
            //创建渲染器
            let context = new RenderContext_1.RenderContext(canvas);
            //创建Shader
            let shader = context.createProgram().createShader(MyVS, MyFS);
            shader.printf();
            //创建几何面
            let geometry = new Geometry_1.Geometry(8, 8);
            geometry.update();
            //创建Buffer
            let buffer = shader.createBuffer(geometry.buffer, 5, context.gl.DYNAMIC_DRAW);
            //将存储属性a_Position链接到Buffer数据
            shader.getAttribute("a_Position").linkBuffer(buffer, 2, 0);
            //将存储属性a_Color链接到Buffer数据
            shader.getAttribute("a_Color").linkBuffer(buffer, 3, 2);
            //加载图片
            var image = yield this.loadImage('./res/yellowflower.jpg');
            //创建纹理
            shader.createTexture("u_Sampler", image, 0);
            //循环渲染
            context.tick(frame => {
                //更新u_time值
                shader.set("u_time", frame);
                context.updateRender();
            });
        });
    }
    loadImage(url) {
        return new Promise(reslove => {
            var image = new Image();
            if (!image) {
                console.log('Failed to create the image object');
                reslove(null);
                return;
            }
            image.onload = () => reslove(image);
            image.src = url;
        });
    }
}
exports.HelloWebGL = HelloWebGL;


/***/ }),

/***/ "./src/core/GLSL.ts":
/*!**************************!*\
  !*** ./src/core/GLSL.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GLSL_Fragment = exports.GLSL_Vertex = exports.getGlsl = exports.getGlslInfo = exports.method = exports.varying = exports.uniform = exports.attribute = exports.smoothstep = exports.step = exports.textureCube = exports.texture2D = exports.not = exports.all = exports.any = exports.equal = exports.greaterThanEqual = exports.greaterThan = exports.lessThanEqual = exports.lessThan = exports.matrixCompMult = exports.mix = exports.clamp = exports.mod = exports.max = exports.min = exports.fract = exports.ceil = exports.floor = exports.sign = exports.abs = exports.inversesqrt = exports.sqrt = exports.log2 = exports.exp2 = exports.log = exports.exp = exports.pow = exports.reflect = exports.faceforward = exports.normalize = exports.cross = exports.dot = exports.distance = exports.length = exports.atan = exports.acos = exports.asin = exports.tan = exports.cos = exports.sin = exports.degrees = exports.radians = exports._vec4 = exports._vec3 = exports._vec2 = exports.samplerCube = exports.sampler2D = exports.mat4 = exports.mat3 = exports.mat2 = exports.vec4 = exports.vec3 = exports.vec2 = exports.DefinedType = exports.Define = exports.PrecisionType = exports.precision = void 0;
const Util_1 = __webpack_require__(/*! ./Util */ "./src/core/Util.ts");
function getClazzName(clazz) {
    if (clazz.prototype) {
        return clazz.prototype.constructor.name;
    }
    return clazz.constructor.name;
}
function createGlslObject() {
    return {
        attributes: [],
        uniforms: [],
        varyings: [],
        methods: [],
        precision: ""
    };
}
let glslMap = {};
function precision(type) {
    return function (clazz) {
        let clzname = getClazzName(clazz);
        if (!glslMap[clzname])
            glslMap[clzname] = createGlslObject();
        glslMap[clzname].precision = `#ifdef GL_ES\n  precision ${Util_1.EnumUtil.getKey(PrecisionType, type)} float;\n#endif`;
    };
}
exports.precision = precision;
var PrecisionType;
(function (PrecisionType) {
    /**精确度低 */
    PrecisionType[PrecisionType["lowp"] = 0] = "lowp";
    /**精确度中 */
    PrecisionType[PrecisionType["mediump"] = 1] = "mediump";
    /**精确度高 */
    PrecisionType[PrecisionType["highp"] = 2] = "highp";
})(PrecisionType = exports.PrecisionType || (exports.PrecisionType = {}));
var Define;
(function (Define) {
    /**存储值 */
    Define[Define["attribute"] = 0] = "attribute";
    /**固定值 */
    Define[Define["uniform"] = 1] = "uniform";
    /**传递值 */
    Define[Define["varying"] = 2] = "varying";
})(Define = exports.Define || (exports.Define = {}));
var DefinedType;
(function (DefinedType) {
    DefinedType[DefinedType["sampler2D"] = 0] = "sampler2D";
    DefinedType[DefinedType["float"] = 1] = "float";
    DefinedType[DefinedType["vec2"] = 2] = "vec2";
    DefinedType[DefinedType["vec3"] = 3] = "vec3";
    DefinedType[DefinedType["vec4"] = 4] = "vec4";
    DefinedType[DefinedType["mat2"] = 5] = "mat2";
    DefinedType[DefinedType["mat3"] = 6] = "mat3";
    DefinedType[DefinedType["mat4"] = 7] = "mat4";
    DefinedType[DefinedType["int"] = 8] = "int";
})(DefinedType = exports.DefinedType || (exports.DefinedType = {}));
let DefinedTypeData = {};
function Property(type) {
    return function (clazz, ...args) {
        let clzname = getClazzName(clazz);
        DefinedTypeData[Util_1.EnumUtil.getValue(DefinedType, clzname)] = Util_1.EnumUtil.getValue(DefinedType, type);
    };
}
class vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    get xy() {
        return new vec2(this.x, this.y);
    }
}
__decorate([
    Property("float")
], vec2.prototype, "x", void 0);
__decorate([
    Property("float")
], vec2.prototype, "y", void 0);
exports.vec2 = vec2;
class vec3 {
    constructor(x, y, z) {
        this.x = x !== null && x !== void 0 ? x : 0;
        this.y = y !== null && y !== void 0 ? y : 0;
        this.z = z !== null && z !== void 0 ? z : 0;
    }
    get r() { return this.x; }
    get g() { return this.y; }
    get b() { return this.z; }
    get xy() { return new vec3(this.x, this.y); }
    get xyz() { return new vec3(this.x, this.y, this.z); }
    get yx() { return new vec3(this.x, this.y); }
    get yxz() { return new vec3(this.x, this.y, this.z); }
    get xz() { return new vec3(this.x, 0, this.z); }
    get xzy() { return new vec3(this.x, this.y, this.z); }
    get zx() { return new vec3(this.x, 0, this.z); }
    get zxy() { return new vec3(this.x, this.y, this.z); }
    get yz() { return new vec3(0, this.y, this.z); }
    get yzx() { return new vec3(this.x, this.y, this.z); }
    get zy() { return new vec3(0, this.y, this.z); }
    get zyx() { return new vec3(this.x, this.y, this.z); }
    ////
    get rg() { return new vec3(this.x, this.y); }
    get rgb() { return new vec3(this.x, this.y, this.z); }
    get gr() { return new vec3(this.x, this.y); }
    get grb() { return new vec3(this.x, this.y, this.z); }
    get rb() { return new vec3(this.x, 0, this.z); }
    get rbg() { return new vec3(this.x, this.y, this.z); }
    get br() { return new vec3(this.x, 0, this.z); }
    get brg() { return new vec3(this.x, this.y, this.z); }
    get gb() { return new vec3(0, this.y, this.z); }
    get gbr() { return new vec3(this.x, this.y, this.z); }
    get bg() { return new vec3(0, this.y, this.z); }
    get bgr() { return new vec3(this.x, this.y, this.z); }
}
__decorate([
    Property("float")
], vec3.prototype, "x", void 0);
__decorate([
    Property("float")
], vec3.prototype, "y", void 0);
__decorate([
    Property("float")
], vec3.prototype, "z", void 0);
exports.vec3 = vec3;
class vec4 {
    constructor(x, y, z, w) {
        this.x = x !== null && x !== void 0 ? x : 0;
        this.y = y !== null && y !== void 0 ? y : 0;
        this.z = z !== null && z !== void 0 ? z : 0;
        this.w = w !== null && w !== void 0 ? w : 0;
    }
    get r() { return this.x; }
    get g() { return this.y; }
    get b() { return this.z; }
    get a() { return this.w; }
    get xy() { return new vec4(this.x, this.y); }
    get xyz() { return new vec4(this.x, this.y, this.z); }
    get xyzw() { return new vec4(this.x, this.y, this.z, this.w); }
    get xywz() { return new vec4(this.x, this.y, this.z, this.w); }
    get yx() { return new vec4(this.x, this.y); }
    get yxz() { return new vec4(this.x, this.y, this.z); }
    get yxzw() { return new vec4(this.x, this.y, this.z, this.w); }
    get yxwz() { return new vec4(this.x, this.y, this.z, this.w); }
    get xz() { return new vec4(this.x, 0, this.z); }
    get xzy() { return new vec4(this.x, this.y, this.z); }
    get xzyw() { return new vec4(this.x, this.y, this.z, this.w); }
    get zx() { return new vec4(this.x, 0, this.z); }
    get zxy() { return new vec4(this.x, this.y, this.z); }
    get zxyw() { return new vec4(this.x, this.y, this.z, this.w); }
    get yz() { return new vec4(0, this.y, this.z); }
    get yzx() { return new vec4(this.x, this.y, this.z); }
    get yzxw() { return new vec4(this.x, this.y, this.z, this.w); }
    get zy() { return new vec4(0, this.y, this.z); }
    get zyx() { return new vec4(this.x, this.y, this.z); }
    get zyxw() { return new vec4(this.x, this.y, this.z, this.w); }
    get xw() { return new vec4(0, 0, this.z, this.w); }
    get xwy() { return new vec4(this.x, 0, this.z, this.w); }
    get xwyz() { return new vec4(this.x, this.y, this.z, this.w); }
    get wx() { return new vec4(this.x, 0, 0, this.w); }
    get wxy() { return new vec4(this.x, this.y, 0, this.w); }
    get wxyz() { return new vec4(this.x, this.y, this.z, this.w); }
    get yw() { return new vec4(0, this.y, 0, this.w); }
    get ywx() { return new vec4(this.x, this.y, 0, this.w); }
    get ywxz() { return new vec4(this.x, this.y, this.z, this.w); }
    get wy() { return new vec4(0, this.y, 0, this.w); }
    get wyx() { return new vec4(this.x, this.y, 0, this.w); }
    get wyxz() { return new vec4(this.x, this.y, this.z, this.w); }
    ////
    get rg() { return new vec4(this.x, this.y); }
    get rgb() { return new vec4(this.x, this.y, this.z); }
    get gr() { return new vec4(this.x, this.y); }
    get grb() { return new vec4(this.x, this.y, this.z); }
    get rb() { return new vec4(this.x, 0, this.z); }
    get rbg() { return new vec4(this.x, this.y, this.z); }
    get br() { return new vec4(this.x, 0, this.z); }
    get brg() { return new vec4(this.x, this.y, this.z); }
    get gb() { return new vec4(0, this.y, this.z); }
    get gbr() { return new vec4(this.x, this.y, this.z); }
    get bg() { return new vec4(0, this.y, this.z); }
    get bgr() { return new vec4(this.x, this.y, this.z); }
}
__decorate([
    Property("float")
], vec4.prototype, "x", void 0);
__decorate([
    Property("float")
], vec4.prototype, "y", void 0);
__decorate([
    Property("float")
], vec4.prototype, "z", void 0);
__decorate([
    Property("float")
], vec4.prototype, "w", void 0);
exports.vec4 = vec4;
class mat2 {
}
exports.mat2 = mat2;
class mat3 {
}
exports.mat3 = mat3;
class mat4 {
}
exports.mat4 = mat4;
class sampler2D {
}
exports.sampler2D = sampler2D;
class samplerCube {
}
exports.samplerCube = samplerCube;
function _vec2(x, y) {
    return new vec2();
}
exports._vec2 = _vec2;
function _vec3(x, y, z) {
    return new vec3();
}
exports._vec3 = _vec3;
function _vec4(x, y, z, w) {
    return new vec4();
}
exports._vec4 = _vec4;
/////////////////////////内置函数/////////////////////////////////
///////////////////角度函数和三角函数
/**角度值转弧度值 */
function radians(v) { return null; }
exports.radians = radians;
/**弧度值转角度值 */
function degrees(v) { return null; }
exports.degrees = degrees;
/**正弦值 */
function sin(v) { return null; }
exports.sin = sin;
/**余弦值 */
function cos(v) { return null; }
exports.cos = cos;
/**正切值 */
function tan(v) { return null; }
exports.tan = tan;
/**反正弦值(弧度) */
function asin(v) { return null; }
exports.asin = asin;
/**反余弦值(弧度) */
function acos(v) { return null; }
exports.acos = acos;
/**反正切值(弧度) */
function atan(v) { return null; }
exports.atan = atan;
///////////////////几何函数
/**向量a长度 */
function length(a) { return null; }
exports.length = length;
/**a、b两点之间距离 */
function distance(a, b) { return null; }
exports.distance = distance;
/**两向量点积*/
function dot(a, b) { return null; }
exports.dot = dot;
/**两向量叉乘*/
function cross(a, b) { return null; }
exports.cross = cross;
/**向量a归一化,长度变为1，方向不变，即返回值单位向量*/
function normalize(a) { return null; }
exports.normalize = normalize;
/**向量朝前：如果c、b两向量点乘小于0(dot(c,b) < 0)，则返回a，否则返回-a*/
function faceforward(a, b, c) { return null; }
exports.faceforward = faceforward;
/**向量反射：比如通过入射光计算反射光方向向量,Fa表示反射平面的法线方向(单位向量)，Ru表示入射光线的方向(单位向量)，Zh表示折射率*/
function reflect(Ru, Fa, Zh) { return null; }
exports.reflect = reflect;
///////////////////指数函数
/**x的n次幂函数*/
function pow(x, n) { return null; }
exports.pow = pow;
/**x的自然指数e*/
function exp(x) { return null; }
exports.exp = exp;
/**x自然对数*/
function log(x) { return null; }
exports.log = log;
/**2的指数x*/
function exp2(x) { return null; }
exports.exp2 = exp2;
/**对数函数，底数为2*/
function log2() { return null; }
exports.log2 = log2;
/**平方根*/
function sqrt() { return null; }
exports.sqrt = sqrt;
/**平方根倒数*/
function inversesqrt() { return null; }
exports.inversesqrt = inversesqrt;
///////////////////通用函数
/**绝对值*/
function abs(x) { return null; }
exports.abs = abs;
/**判断参数符号，x是正数返回1.0；x是0.0返回0.0，x是负数返回 - 1.0*/
function sign(x) { return null; }
exports.sign = sign;
/**取整，向下取整*/
function floor(x) { return null; }
exports.floor = floor;
/**取整，向上取整*/
function ceil(x) { return null; }
exports.ceil = ceil;
/**返回x小数部分*/
function fract(x) { return null; }
exports.fract = fract;
/**比较大小，返回较小的值*/
function min(a, b) { return null; }
exports.min = min;
/**比较大小，返回较大的值*/
function max(a, b) { return null; }
exports.max = max;
/**表示x–y * floor(x / y)*/
function mod(x, y) { return null; }
exports.mod = mod;
/**规整输入值, x与min和max比较大小返回中间大小的值，运算规则：min(max(x, min), max)*/
function clamp(x, min, max) { return null; }
exports.clamp = clamp;
/**线性插值计算, 插值区间[m, n], 插值系数k，插值计算公式：m(1 - k) + nk*/
function mix(m, n, k) { return null; }
exports.mix = mix;
///////////////////矩阵函数
/**同行同列的元素相乘 */
function matrixCompMult(x, y) { return null; }
exports.matrixCompMult = matrixCompMult;
///////////////////向量关系函数
/**x是否小于y, 参数是vec或ivec*/
function lessThan(x, y) { return null; }
exports.lessThan = lessThan;
/**x是否小于或等于y, 参数是vec或ivec*/
function lessThanEqual(x, y) { return null; }
exports.lessThanEqual = lessThanEqual;
/**x是否大于y, 参数是vec或ivec*/
function greaterThan(x, y) { return null; }
exports.greaterThan = greaterThan;
/**x是否大于或等于y, 参数是vec或ivec*/
function greaterThanEqual(x, y) { return null; }
exports.greaterThanEqual = greaterThanEqual;
/**x是否等于y，向量每个分量是否都相等, 参数是vec或ivec*/
function equal(x, y) { return null; }
exports.equal = equal;
/**x向量是否存在一个分量是true，参数是bvec*/
function any(x) { return null; }
exports.any = any;
/**x向量所有分量是否全部为true ，参数是bvec*/
function all(x) { return null; }
exports.all = all;
/**x所有分量执行逻辑非运算 ，参数是bvec*/
function not(x) { return null; }
exports.not = not;
///////////////////纹理采样函数
/**
 * 2d纹理采样函数
 * @param sampler
 * @param uv
 * @param k 在为具有mipmap的纹理计算适当的细节级别之后，在执行实际纹理查找操作之前添加偏差
 * @returns
 */
function texture2D(sampler, uv, k) {
    return new vec4();
}
exports.texture2D = texture2D;
/**
 * 立方体纹理采样函数
 * @param sampler
 * @param uv
 * @param k 在为具有mipmap的纹理计算适当的细节级别之后，在执行实际纹理查找操作之前添加偏差
 * @returns
 */
function textureCube(sampler, uv, k) {
    return new vec4();
}
exports.textureCube = textureCube;
///////////////////其他函数
/**根据两个数值生成阶梯函数
 * - 如果`x<edge`则返回`0.0`
 * - 否则返回`1.0`
 */
function step(edge, x) { return null; }
exports.step = step;
/**
 * 经过Hermite插值的阶梯函数。
 * - 如果`x<=edge0`则返回`0.0`，
 * - 如果`x>=edge1`则返回`1.0`，
 * - 否则按照如下方法返回插值
 * ----
 * ```c#
 *
 * (float|vec2|vec3|vec4) t;
 * t=clamp((x-edge0)/(edge1-edge0),0,1);
 * return t*t*(3-2*t);
 *
 * ```
 */
function smoothstep(edge0, edge1, x) { return null; }
exports.smoothstep = smoothstep;
//////////////////////////////////////////////////
/**存储值 */
function attribute(type) {
    return function (clazz, name) {
        let clzname = getClazzName(clazz);
        if (!glslMap[clzname])
            glslMap[clzname] = createGlslObject();
        if (!glslMap[clzname].attributes)
            glslMap[clzname].attributes = [];
        let attributes = glslMap[clzname].attributes;
        attributes.push({ name: name, type: type });
    };
}
exports.attribute = attribute;
/**固定值 */
function uniform(type) {
    return function (clazz, name) {
        let clzname = getClazzName(clazz);
        if (!glslMap[clzname])
            glslMap[clzname] = createGlslObject();
        if (!glslMap[clzname].uniforms)
            glslMap[clzname].uniforms = [];
        let uniforms = glslMap[clzname].uniforms;
        uniforms.push({ name: name, type: type });
    };
}
exports.uniform = uniform;
/**传递值 */
function varying(type) {
    return function (clazz, name) {
        let clzname = getClazzName(clazz);
        if (!glslMap[clzname])
            glslMap[clzname] = createGlslObject();
        if (!glslMap[clzname].varyings)
            glslMap[clzname].varyings = [];
        let varyings = glslMap[clzname].varyings;
        varyings.push({ name: name, type: type });
    };
}
exports.varying = varying;
/**
 * 定义函数
 * @param params 参数类型 - 类型相同时只需传入首个类型
 * @param type 函数类型 - 返回类型
 * @returns
 */
function method(params, type) {
    return function (clazz, name) {
        let clzname = getClazzName(clazz);
        if (!glslMap[clzname])
            glslMap[clzname] = createGlslObject();
        if (!glslMap[clzname].methods)
            glslMap[clzname].methods = [];
        let methods = glslMap[clzname].methods;
        methods.push({ content: clazz[name].toString(), types: { params: params, type: type } });
    };
}
exports.method = method;
function isWhitespace(character) {
    switch (character) {
        case " ":
        case "\t":
        case "\r":
        case "\n":
        case "\f":
        case "  ":
            return true;
        default:
            return false;
    }
}
function trimLeft(v) {
    let i = 0;
    while (i < v.length) {
        if (isWhitespace(v.charAt(i))) {
            i++;
            continue;
        }
        break;
    }
    return v.substring(i);
}
function trimRight(v) {
    let i = v.length - 1;
    while (i >= 0) {
        if (isWhitespace(v.charAt(i))) {
            i--;
            continue;
        }
        break;
    }
    return v.substring(0, i);
}
function trim(v) {
    v = trimLeft(v);
    v = trimRight(v);
    return v;
}
/**字符串必须为指定源内字符组成 */
function iscompose(str, source) {
    let i = 0;
    while (i < str.length) {
        if (source.search(str.charAt(i++)) == -1)
            return false;
    }
    return true;
}
function getReturnType(expression) {
    if (/vec2\(|vec3\(|vec4\(/.test(expression)) {
        let index = expression.lastIndexOf(").");
        if (iscompose(expression.substring(index + 2), "xyzwrgba")) {
            switch (expression.length - index - 2) {
                case 1: return "float";
                case 2: return "vec2";
                case 3: return "vec3";
                case 4: return "vec4";
            }
        }
        if (/vec2\(/.test(expression))
            return "vec2";
        if (/vec3\(/.test(expression))
            return "vec3";
        if (/vec4\(/.test(expression))
            return "vec4";
    }
    return "float";
}
function getGlslInfo(clazz) {
    let clzname = getClazzName(clazz);
    return glslMap[clzname];
}
exports.getGlslInfo = getGlslInfo;
function getGlsl(clazz) {
    let clzname = getClazzName(clazz);
    let info = glslMap[clzname];
    return [
        info.precision,
        ...info.attributes.map(v => {
            let type = Util_1.EnumUtil.getKey(DefinedType, v.type);
            return `attribute ${type} ${v.name};`;
        }),
        ...info.uniforms.map(v => {
            let type = Util_1.EnumUtil.getKey(DefinedType, v.type);
            return `uniform ${type} ${v.name};`;
        }),
        ...info.varyings.map(v => {
            let type = Util_1.EnumUtil.getKey(DefinedType, v.type);
            return `varying ${type} ${v.name};`;
        }),
        ...info.methods.map(v => {
            let results = v.content.match(/(\()(.*)(\))/);
            let params = results[2].split(",").map((v1, i) => {
                let type = Array.isArray(v.types.params) ? (i >= v.types.params.length ? v.types.params[v.types.params.length - 1] : v.types.params[i]) : v.types.params;
                return `${Util_1.EnumUtil.getKey(DefinedType, type)} ${v1.trim()}`;
            });
            let content = `${Util_1.EnumUtil.getKey(DefinedType, v.types.type)} ${v.content.replace(results[2], params.join(","))}`;
            return content;
        }),
        `void ${((content) => {
            let lines = content.split("\n");
            lines = lines.map(v => {
                v = trimLeft(v);
                v = v.replace(/this./g, "");
                v = v.replace(/_vec2/g, "vec2");
                v = v.replace(/_vec3/g, "vec3");
                v = v.replace(/_vec4/g, "vec4");
                v = v.replace(/GLSL_[0-9]./g, "");
                if (/let |var /g.test(v)) {
                    //todo...类型推断
                    let expression = v.split("=")[1];
                    expression = trim(expression);
                    let type = getReturnType(expression);
                    v = v.replace(/let |var /g, `${type} `);
                }
                return v;
            });
            return [lines.slice(0, lines.length - 1).join("\n  "), lines[lines.length - 1]].join("\n");
            //return lines.join("\n   ");
        })(clazz.prototype.main.toString())}`
    ].join("\n");
}
exports.getGlsl = getGlsl;
/**顶点着色器模板 */
class GLSL_Vertex {
    main() {
    }
}
exports.GLSL_Vertex = GLSL_Vertex;
/**片段着色器模板 */
class GLSL_Fragment {
    main() {
    }
}
exports.GLSL_Fragment = GLSL_Fragment;


/***/ }),

/***/ "./src/core/RenderContext.ts":
/*!***********************************!*\
  !*** ./src/core/RenderContext.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderContext = void 0;
const RenderProgram_1 = __webpack_require__(/*! ./RenderProgram */ "./src/core/RenderProgram.ts");
class RenderContext {
    constructor(canvas) {
        this.gl = Utils.getWebGLContext(canvas);
        if (!this.gl) {
            console.log('Failed to get the rendering context for WebGL');
            return;
        }
        this.frame = 0;
        this.programs = [];
        this.ticks = [];
        let __this = this;
        function __loop() {
            __this.frame++;
            for (let i = 0; i < __this.ticks.length; i++) {
                __this.ticks[i](__this.frame);
            }
            window.requestAnimationFrame(__loop);
        }
        __loop();
    }
    createProgram() {
        let program = new RenderProgram_1.RenderProgram(this.gl);
        this.programs.push(program);
        return program;
    }
    updateRender() {
        for (let i = 0; i < this.programs.length; i++) {
            this.programs[i].updateRender();
        }
    }
    tick(func) {
        this.ticks.push(func);
    }
}
exports.RenderContext = RenderContext;


/***/ }),

/***/ "./src/core/RenderProgram.ts":
/*!***********************************!*\
  !*** ./src/core/RenderProgram.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderProgram = void 0;
const Shader_1 = __webpack_require__(/*! ./Shader */ "./src/core/Shader.ts");
class RenderProgram {
    constructor(gl) {
        this.gl = gl;
        this.shaders = [];
    }
    createShader(vs, ps) {
        let shader = new Shader_1.Shader(this.gl, vs, ps);
        this.shaders.push(shader);
        return shader;
    }
    clear() {
        let gl = this.gl;
        // Specify the color for clearing <canvas>
        gl.clearColor(0, 0, 0, 1);
        // Clear <canvas>
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
    updateRender() {
        this.clear();
        for (let i = 0; i < this.shaders.length; i++) {
            this.shaders[i].updateRender();
        }
    }
}
exports.RenderProgram = RenderProgram;


/***/ }),

/***/ "./src/core/Shader.ts":
/*!****************************!*\
  !*** ./src/core/Shader.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Texture = exports.Uniform = exports.Attribute = exports.ShaderProperty = exports.ShaderBuffer = exports.Shader = void 0;
const GLSL_1 = __webpack_require__(/*! ./GLSL */ "./src/core/GLSL.ts");
class Shader {
    constructor(gl, vs, ps) {
        this.gl = gl;
        //console.log(getGlsl(vs));
        this.vertexString = GLSL_1.getGlsl(vs);
        this.framentString = GLSL_1.getGlsl(ps);
        if (!Utils.initShaders(this.gl, this.vertexString, this.framentString)) {
            console.error('Failed to intialize shaders.');
            return;
        }
        this.properties = new Map();
        this.buffers = [];
        this.textures = [];
        let vsInfo = GLSL_1.getGlslInfo(vs);
        vsInfo.attributes.forEach(value => this.createAttribute(value.name, value.type));
        vsInfo.uniforms.forEach(value => this.createUniform(value.name, value.type));
        // vsInfo.varyings.forEach(value => this.createVarying(value.name, value.type));
        let psInfo = GLSL_1.getGlslInfo(ps);
        psInfo.attributes.forEach(value => this.createAttribute(value.name, value.type));
        psInfo.uniforms.forEach(value => this.createUniform(value.name, value.type));
        // psInfo.varyings.forEach(value => this.createVarying(value.name, value.type));
    }
    updateRender() {
        this.properties.forEach((value) => {
            value.upload();
        });
        for (let i = 0; i < this.buffers.length; i++) {
            this.buffers[i].draw(this.gl);
        }
    }
    get(name) {
        return this.properties.get(name);
    }
    getAttribute(name) {
        return this.properties.get(name);
    }
    set(name, value) {
        var _a;
        if (!this.properties.has(name))
            return;
        (_a = this.properties.get(name)) === null || _a === void 0 ? void 0 : _a.set(value);
    }
    createUniform(name, type) {
        if (this.properties.has(name))
            return this.properties.get(name);
        let location = this.gl.getUniformLocation(this.gl.program, name);
        if (location < 0) {
            console.error(`Failed to get the storage location of ${name}`);
            return;
        }
        let uniform = new Uniform(name, type, location);
        uniform.gl = this.gl;
        this.properties.set(name, uniform);
        return uniform;
    }
    createAttribute(name, type) {
        if (this.properties.has(name))
            return this.properties.get(name);
        let location = this.gl.getAttribLocation(this.gl.program, name);
        if (location < 0) {
            console.error(`Failed to get the storage location of ${name}`);
            return;
        }
        let attribute = new Attribute(name, type, location);
        attribute.gl = this.gl;
        this.properties.set(name, attribute);
        return attribute;
    }
    /**
     * 创建Buffer
     * @param data 写入缓冲区对象的数据(类型化数组)
     * @param elementLength 元素长度 每个元素存在于数据中的长度
     * @param usage 表示程序将如何使用存储在缓冲区对象中的数据。该参数将帮助WebGL优化操作,但是就算你传入了错误的值,也不会终止程序(仅仅是降低程序的效率)
     *  - `gl.STATIC_DRAW` 只会向缓冲区对象中写入一次数据,但需要绘制很多次
     *  - `gl.STREAM_DRAW` 只会向缓冲区对象中写入一次数据,然后绘制若干次
     *  - `gl.DYNAMIC_DRAW` 会向缓冲区对象中多次写入数据,并绘制很多次
     * @returns
     */
    createBuffer(data, elementLength, usage) {
        // Create a buffer object
        var glbuffer = this.gl.createBuffer();
        if (!glbuffer) {
            console.log('Failed to create the buffer object');
            return;
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, glbuffer);
        // Write date into the buffer object
        this.gl.bufferData(this.gl.ARRAY_BUFFER, data, usage);
        let buffer = new ShaderBuffer(glbuffer, data, elementLength);
        this.buffers.push(buffer);
        return buffer;
    }
    /**
     * 创建纹理
     * @param name 取样器名称
     * @param image 已加载完成的HTMLImageElement元素对象
     * @param texturePosition 纹理单元队列 默认0位 在片段着色器中至少有8个纹理单元
     * @returns
     */
    createTexture(name, image, texturePosition = 0) {
        var gltexture = this.gl.createTexture(); // Create a texture object
        if (!gltexture) {
            console.log('Failed to create the texture object');
            return false;
        }
        let uniform = this.createUniform(name, GLSL_1.DefinedType.sampler2D);
        let texture = new Texture(uniform, gltexture, image, texturePosition);
        texture.upload(this.gl);
        this.textures.push(texture);
        return texture;
    }
    printf() {
        console.group("shader:");
        console.group("vertex:");
        console.info(`%c${this.vertexString}`, "color:grey");
        console.groupEnd();
        console.group("frament:");
        console.info(`%c${this.framentString}`, "color:grey");
        console.groupEnd();
        console.groupEnd();
    }
}
exports.Shader = Shader;
class ShaderBuffer {
    constructor(buffer, data, elementLength) {
        this.buffer = buffer;
        this.data = data;
        this.elementLength = elementLength;
        this.count = data.length / elementLength; // The number of vertices
    }
    draw(gl) {
        // Draw the rectangle
        gl.drawArrays(gl.TRIANGLES, 0, this.count);
    }
}
exports.ShaderBuffer = ShaderBuffer;
class ShaderProperty {
    constructor(name, type, location) {
        this.name = name;
        this.type = type;
        this.location = location;
    }
    get() {
        return this.value;
    }
    set(...vals) {
        this.value = vals;
        let gl = this.gl;
        switch (this.type) {
            case GLSL_1.DefinedType.sampler2D:
            case GLSL_1.DefinedType.int:
                if (Array.isArray(this.value)) {
                    switch (this.value.length) {
                        case 1:
                            gl.uniform1iv(this.location, this.value);
                            break;
                        case 2:
                            gl.uniform2iv(this.location, this.value);
                            break;
                        case 3:
                            gl.uniform3iv(this.location, this.value);
                            break;
                        case 4:
                            gl.uniform4iv(this.location, this.value);
                            break;
                    }
                }
                else {
                    gl.uniform1i(this.location, this.value);
                }
                break;
            case GLSL_1.DefinedType.float:
            case GLSL_1.DefinedType.vec2:
            case GLSL_1.DefinedType.vec3:
            case GLSL_1.DefinedType.vec4:
                if (Array.isArray(this.value)) {
                    switch (this.value.length) {
                        case 1:
                            gl.uniform1fv(this.location, this.value);
                            break;
                        case 2:
                            gl.uniform2fv(this.location, this.value);
                            break;
                        case 3:
                            gl.uniform3fv(this.location, this.value);
                            break;
                        case 4:
                            gl.uniform4fv(this.location, this.value);
                            break;
                    }
                }
                else {
                    gl.uniform1f(this.location, this.value);
                }
                break;
        }
    }
    upload() {
    }
}
exports.ShaderProperty = ShaderProperty;
class Attribute extends ShaderProperty {
    constructor(name, type, location) {
        super(name, type, location);
    }
    /**
     * 链接缓冲区数据
     * @param gl gl上下文
     * @param buffer 创建的缓冲区数据封装对象
     * @param length 取缓冲区数据元素的长度
     * @param position 取缓冲区数据元素的起始位置
     * - 比如缓冲区数据[x,y,r,g,b,....],其元素长度为5
     * - position的长度为2 位置为0
     * - color的长度为3 位置为2
     */
    linkBuffer(buffer, length, position) {
        this.buffer = buffer;
        this.length = length;
        this.position = position;
        return this;
    }
    /**
     *
     * @param gl
     */
    upload() {
        let gl = this.gl;
        //数组中每个元素的字节大小。
        //const FSIZE = this.buffer.data.BYTES_PER_ELEMENT;
        // Assign the buffer object to a_Position variable
        //指定分配 attribute 中的存储地址
        let location = this.location;
        //指定缓冲区每个顶点分量的个数 1-4
        let size = this.length;
        //指定数据的类型
        let type = gl.FLOAT;
        //是否将非浮点型数据归一化 - 默认 true
        let normalized = false;
        //指定相邻两个顶点间的字节数 - 默认 0
        let stride = this.buffer.data.BYTES_PER_ELEMENT * this.buffer.elementLength;
        //指定缓冲区对象中的偏移量 - 默认 0
        let offset = this.buffer.data.BYTES_PER_ELEMENT * this.position;
        gl.vertexAttribPointer(location, size, type, normalized, stride, offset);
        // Enable the assignment to a_Position variable
        gl.enableVertexAttribArray(this.location);
    }
}
exports.Attribute = Attribute;
class Uniform extends ShaderProperty {
    constructor(name, type, location) {
        super(name, type, location);
    }
}
exports.Uniform = Uniform;
/**纹理 */
class Texture {
    constructor(sample, gltexture, image, position = 0) {
        this.sample = sample;
        this.gltexture = gltexture;
        this.image = image;
        this.position = position;
    }
    upload(gl) {
        // Enable texture unit0
        gl.activeTexture(gl.TEXTURE0 + this.position);
        // Bind the texture object to the target
        gl.bindTexture(gl.TEXTURE_2D, this.gltexture);
        // Set the texture parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        // Set the texture image
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
        // Set the texture unit 0 to the sampler
        // gl.uniform1i(u_Sampler, 0);
        this.sample.set(0);
    }
}
exports.Texture = Texture;


/***/ }),

/***/ "./src/core/Util.ts":
/*!**************************!*\
  !*** ./src/core/Util.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Hashtable = exports.ColorUtil = exports.EnumUtil = void 0;
class EnumUtil {
    static getKey(enmu, value) {
        for (let k in enmu) {
            if (enmu[k] == value)
                return k;
        }
        return '';
    }
    static getValue(enmu, key) {
        for (let k in enmu) {
            if (k == key)
                return enmu[k];
        }
        return '';
    }
}
exports.EnumUtil = EnumUtil;
class ColorUtil {
    /**
     * 从颜色值中提取三原色
     * @param color
     * @return
     */
    static extract(color) {
        return {
            r: ((color & 0xff0000) >> 16),
            g: ((color & 0x00ff00) >> 8),
            b: ((color & 0x0000ff))
        };
    }
    /**
     * 将三原色合并
     * @param r
     * @param g
     * @param b
     * @return
     */
    static merge(r, g, b) {
        return Math.max(0, Math.min(r, 0xFF)) << 16 | Math.max(0, Math.min(g, 0xFF)) << 8 | Math.max(0, Math.min(b, 0xFF));
    }
    static averageColor(color1, color2) {
        let { r: r1, g: g1, b: b1 } = this.extract(color1);
        let { r: r2, g: g2, b: b2 } = this.extract(color2);
        return this.merge(Math.floor(r1 + r2 / 2), Math.floor(g1 + g2 / 2), Math.floor(b1 + b2 / 2));
    }
}
exports.ColorUtil = ColorUtil;
class Hashtable {
    constructor() {
        this._map = {};
        this._list = [];
    }
    set(key, value) {
        this._map[key] = { value: value, index: this._list.length };
        this._list.push(value);
        return value;
    }
    has(key) {
        return !!this._map[key];
    }
    get(key) {
        return this._map[key] ? this._map[key].value : null;
    }
    remove(key) {
        if (this._map.hasOwnProperty(key)) {
            let info = this._map[key];
            let index = info.index;
            let res = info.value;
            this._map[key] = null;
            delete this._map[key];
            this._list.splice(index, 1);
            return res;
        }
        return null;
    }
    forEach(callbackfn, thisArg) {
        let list = this._list;
        let length = list.length;
        if (!!thisArg)
            callbackfn = callbackfn.bind(thisArg);
        for (let i = 0; i < length; i++) {
            callbackfn(list[i], i);
        }
    }
    get list() { return this._list; }
    get length() { return this._list.length; }
    clone() {
        let map = new Hashtable();
        map._list = this._list.concat();
        map._map = Object.assign({}, map._map);
        return map;
    }
}
exports.Hashtable = Hashtable;


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HelloWebGL_1 = __webpack_require__(/*! ./HelloWebGL */ "./src/HelloWebGL.ts");
new HelloWebGL_1.HelloWebGL();


/***/ }),

/***/ 0:
/*!************************!*\
  !*** multi ./src/main ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/main */"./src/main.ts");


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map