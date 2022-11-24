(function () {
    'use strict';

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
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
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

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

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

    class Utils {
        static getQualifiedClassName(value) {
            let type = typeof value;
            if (!value || (type != "object" && !value.prototype))
                return type;
            let prototype = value.hasOwnProperty("constructor") ? value : (value.prototype ? value.prototype : Object.getPrototypeOf(value));
            if (prototype.hasOwnProperty("__class__"))
                return prototype["__class__"];
            let className;
            if (prototype.constructor.name && prototype.constructor.name != "Function") {
                className = prototype.constructor.name;
            }
            else {
                let constructorString = prototype.constructor.toString().trim();
                className = constructorString.match(/class(.*?){/)[1].trim().split(" ")[0];
            }
            Object.defineProperty(prototype, "__class__", {
                value: className,
                enumerable: false,
                writable: true
            });
            return className;
        }
        static waitframe(frame = 1) {
            return new Promise(reslove => {
                Laya.timer.frameOnce(frame, this, reslove);
            });
        }
        static callLater(caller, method, ...args) {
            let __callLater = Laya.CallLater.I;
            let handler = __callLater._getHandler(caller, method);
            if (handler != null) {
                handler.args = args;
                return;
            }
            __callLater.callLater(caller, method, args);
        }
        static cancelCallLater(caller, method) {
            let __callLater = Laya.CallLater.I;
            var handler = __callLater._getHandler(caller, method);
            if (handler && handler.method != null) {
                __callLater._map[handler.key] = null;
                handler.clear();
            }
        }
        static iterable(method, end, start = 0) {
            let results = [];
            for (let i = start; i < end; i++) {
                results.push(method(i));
            }
            return results;
        }
        static drawRoundRect(graphics, x, y, w, h, round, fillColor, lineColor, lineWidth) {
            var path = [
                ["moveTo", round, 0],
                ["lineTo", w - round, 0],
                ["arcTo", w, 0, w, round, round],
                ["lineTo", w, h - round],
                ["arcTo", w, h, w - round, h, round],
                ["lineTo", round, h],
                ["arcTo", 0, h, 0, h - round, round],
                ["lineTo", 0, round],
                ["arcTo", 0, 0, round, 0, round],
            ];
            graphics.drawPath(x, y, path, { fillStyle: fillColor }, { strokeStyle: lineColor, lineWidth: lineWidth != undefined ? lineWidth : 0, lineJoin: "round", lineCap: "round" });
        }
        static frameExec(caller, exec, maxtimes = 20) {
            return new Promise((reslove => {
                let index = 0;
                function handler() {
                    let isStop = false;
                    let max = maxtimes;
                    while (max > 0) {
                        let result = exec.call(caller, index++);
                        if (result) {
                            Laya.timer.clear(this, handler);
                            isStop = true;
                            break;
                        }
                        max--;
                    }
                    if (isStop) {
                        reslove();
                    }
                }
                Laya.timer.frameLoop(1, this, handler);
            }));
        }
    }
    class ArrayUtil {
        static ramdom(...elements) {
            if (elements.length == 1 && Array.isArray(elements[0])) {
                return elements[0][(Math.random() * elements[0].length) >> 0];
            }
            return elements[(Math.random() * elements.length) >> 0];
        }
    }
    class EnumUtil {
        static parse($enum) {
            let keys = this.keys($enum);
            return { keys: keys, values: keys.map(k => $enum[k]) };
        }
        static keys($enum) {
            let keys = [];
            for (let k in $enum) {
                if (k === "undefined")
                    continue;
                if (!Number.isNaN(parseInt(k)))
                    continue;
                keys.push(k);
            }
            return keys;
        }
        static values($enum) {
            let keys = this.keys($enum);
            return keys.map(k => $enum[k]);
        }
        static toObject($enum) {
            let keys = this.keys($enum);
            let object = {};
            keys.forEach(k => object[k] = $enum[k]);
            return object;
        }
    }
    class ObjectUtil {
        static guid(target) {
            return (target.$_GID || (target.$_GID = Laya.Utils.getGID()));
        }
        static instance(clazz) {
            var _a;
            return (_a = clazz.prototype.__instance__) !== null && _a !== void 0 ? _a : (clazz.prototype.__instance__ = new clazz());
        }
        static setClassName(clazz, name) {
            clazz.prototype.__class__ = name;
        }
    }

    let SAVE_ID = 9898;
    class CustomValue2d extends Laya.Value2D {
        constructor() {
            let saveId = ++SAVE_ID;
            super(saveId, saveId);
            this.saveId = saveId;
            this.initialize();
        }
        createShader(vs, ps, nameMap, bindAttrib) {
            this.shader = new Laya.Shader2X(vs, ps, this.saveId, nameMap, bindAttrib);
            return this.shader;
        }
    }
    class CustomSprite extends Laya.Sprite {
        constructor(ShaderValue) {
            super();
            this._shaderValue = ObjectUtil.instance(ShaderValue);
            ;
            this.customRenderEnable = true;
            this.initialize();
        }
        initialize() {
        }
        set texture(value) {
            if (this._texture != value) {
                this._texture = value;
            }
        }
        get texture() {
            return this._texture;
        }
        setShaderValue(name, value) {
            this._shaderValue[name] = value;
        }
        getShaderValue(name) {
            return this._shaderValue[name];
        }
        customRender(context, x, y) {
            this._texture && context.drawTarget(this._texture, x, y, this._texture.width, this._texture.height, null, this._shaderValue);
        }
    }

    var vs = `
        attribute vec4 posuv;
        attribute vec4 attribColor;
        attribute vec4 attribFlags;
        attribute vec4 clipDir;
        attribute vec2 clipRect;
        uniform vec4 clipMatDir;
        uniform vec2 clipMatPos;
        varying vec2 cliped;
        uniform vec2 size;
        uniform vec2 clipOff;
        #ifdef WORLDMAT
            uniform mat4 mmat;
        #endif
        #ifdef MVP3D
            uniform mat4 u_MvpMatrix;
        #endif
        varying vec4 v_texcoordAlpha;
        varying vec4 v_color;
        varying float v_useTex;
        void main() {
            vec4 pos = vec4(posuv.xy,0.,1.);
            #ifdef WORLDMAT
                pos=mmat*pos;
            #endif
            vec4 pos1  =vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,0.,1.0);
            #ifdef MVP3D
                gl_Position=u_MvpMatrix*pos1;
            #else
                gl_Position=pos1;
            #endif
            v_texcoordAlpha.xy = posuv.zw;
            v_texcoordAlpha.z = attribColor.a/255.0;
            v_color = attribColor/255.0;
            v_color.xyz*=v_color.w;
            v_useTex = attribFlags.r/255.0;
            float clipw = length(clipMatDir.xy);
            float cliph = length(clipMatDir.zw);
            vec2 clpos = clipMatPos.xy;
            #ifdef WORLDMAT
            if(clipOff[0]>0.0){
                clpos.x+=mmat[3].x;
                clpos.y+=mmat[3].y;
            }
            #endif
            vec2 clippos = pos.xy - clpos;

            if(clipw>20000. && cliph>20000.)
                cliped = vec2(0.5,0.5);
            else {
                cliped=vec2( dot(clippos,clipMatDir.xy)/clipw/clipw, dot(clippos,clipMatDir.zw)/cliph/cliph);
            }
        }
    `;
    var ps = `
precision mediump float;
varying vec2 v_texcoord;
varying vec4 v_color;
uniform sampler2D texture;
//消融阈值  0 - 1
uniform float u_DissolveThreshold;

varying vec4 v_texcoordAlpha;

void main(){
    vec4 noiseTexValue = texture2D(texture, v_texcoordAlpha.xy);
    if (noiseTexValue.a < u_DissolveThreshold)
    {
        discard;
    }
    
    gl_FragColor = texture2D(texture, v_texcoordAlpha.xy);
}
    `;
    var uniforms;
    (function (uniforms) {
        uniforms["u_DissolveThreshold"] = "u_DissolveThreshold";
    })(uniforms || (uniforms = {}));
    class MGGShader extends CustomValue2d {
        initialize() {
            this.createShader(vs, ps);
        }
    }
    class MggSprite extends CustomSprite {
        constructor() {
            super(MGGShader);
        }
        set vlueForAlph(v) {
            this.setShaderValue(uniforms.u_DissolveThreshold, v);
        }
        get vlueForAlph() {
            return this.getShaderValue(uniforms.u_DissolveThreshold);
        }
    }

    class Shader2d_Test1 {
        constructor() {
            Laya.ClassUtils.regClass("shader2dtest1/TestScene.ts", TestScene);
            Laya.Scene.open("res/testshader1/TestScene.scene");
        }
    }
    class TestScene extends Laya.Scene {
        constructor() {
            super();
            this.resPath = "res/testshader1/";
        }
        onEnable() {
            this.create();
        }
        create() {
            return __awaiter(this, void 0, void 0, function* () {
                this.result = new Laya.Texture();
                this.waterTexture = yield this.loadPicture(`${this.resPath}water_01.png`);
                this.waterspeed = 10;
                this.waterint.on(Laya.Event.MOUSE_DOWN, this, this.mouseHandler);
                this.waterint.on(Laya.Event.MOUSE_UP, this, this.mouseHandler);
                this.waterint.on(Laya.Event.MOUSE_OUT, this, this.mouseHandler);
                this.WATER.changeHandler = new Laya.Handler(this, this.updateWaterSpeed);
                this.APHT.changeHandler = new Laya.Handler(this, this.updateWaterArph);
                this.nodetext = new Laya.Sprite();
                this.Houhua_ceng.addChild(this.nodetext);
                this.nodetext.width = Laya.stage.width;
                this.nodetext.height = Laya.stage.height;
                this.sppall = new MggSprite();
                this.result.bitmap = this.nodetext.drawToTexture(Laya.stage.width, Laya.stage.height, 0, 0);
                this.sppall.texture = (this.result);
                this.sppall.width = Laya.stage.width;
                this.sppall.height = Laya.stage.height;
                this.sppall.x = 0;
                this.sppall.y = 0;
                Laya.stage.addChild(this.sppall);
                this.sppall.vlueForAlph = (.8);
                this.sppall.frameLoop(1, this, () => {
                    this.result.bitmap.destroy();
                    this.result.bitmap = this.nodetext.drawToTexture(Laya.stage.width, Laya.stage.height, 0, 0);
                });
            });
        }
        mouseHandler(e) {
            switch (e.type) {
                case Laya.Event.MOUSE_DOWN:
                    this.isCreating = true;
                    this.updateState();
                    break;
                case Laya.Event.MOUSE_UP:
                case Laya.Event.MOUSE_OUT:
                    this.isCreating = false;
                    this.updateState();
                    break;
            }
        }
        updateWaterSpeed() {
            this.waterspeed = Math.floor(this.WATER.value);
            this.txtshow2.text = `水滴生成速度:${this.waterspeed}帧/滴`;
            this.updateState();
        }
        updateWaterArph() {
            this.sppall.vlueForAlph = Math.floor(this.APHT.value * 10) / 10;
            this.txtshow.text = `不透明度阈值:${this.sppall.vlueForAlph}`;
        }
        updateState() {
            Laya.timer.clear(this, this.createWater);
            if (this.isCreating && this.waterspeed) {
                Laya.timer.frameLoop(30 - this.waterspeed, this, this.createWater);
            }
        }
        createWater() {
            var spe2 = new Laya.Sprite();
            spe2.texture = this.waterTexture;
            spe2.width = 40;
            spe2.height = 40;
            spe2.pivot(20, 20);
            var rig = spe2.addComponent(Laya.RigidBody);
            rig.type = "dynamic";
            var collder = spe2.addComponent(Laya.CircleCollider);
            collder.radius = 6;
            collder.x = 14;
            collder.y = 14;
            collder.friction = 0;
            collder.restitution = .5;
            spe2.x = Laya.stage.mouseX;
            spe2.y = Laya.stage.mouseY;
            this.nodetext.addChild(spe2);
        }
        loadPicture(url) {
            return new Promise(reslove => {
                Laya.loader.load(url, Laya.Handler.create(this, (res) => {
                    reslove(res);
                }));
            });
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("script/GameUI.ts", Shader2d_Test1);
        }
    }
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedheight";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "test/TestScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    var vs$1 = "/*\r\n    texture和fillrect使用的。\r\n*/\r\nattribute vec4 posuv;\r\nattribute vec4 attribColor;      \r\nattribute vec4 attribFlags;  \r\nattribute vec2 texcoord;    \r\n//attribute vec4 clipDir;\r\n//attribute vec2 clipRect;\r\nuniform vec4 clipMatDir;\r\nuniform vec2 clipMatPos;                // 这个是全局的，不用再应用矩阵了。\r\nvarying vec2 cliped;\r\nuniform vec2 size;\r\nuniform vec2 clipOff;                   // 使用要把clip偏移。cacheas normal用. 只用了[0]\r\n#ifdef WORLDMAT\r\n    uniform mat4 mmat;\r\n#endif\r\n#ifdef MVP3D\r\n    uniform mat4 u_MvpMatrix;\r\n#endif\r\nvarying vec4 v_texcoordAlpha;\r\nvarying vec4 v_color;\r\nvarying float v_useTex;\r\nvarying vec2 v_size;\r\nvarying vec2 v_texcoord;\r\nvoid main() {\r\n        vec4 pos = vec4(posuv.xy,0.,1.);\r\n    #ifdef WORLDMAT\r\n        pos=mmat*pos;\r\n    #endif\r\n        vec4 pos1  =vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,0.,1.0);\r\n    #ifdef MVP3D\r\n        gl_Position=u_MvpMatrix*pos1;\r\n    #else\r\n        gl_Position=pos1;\r\n    #endif\r\n        v_texcoordAlpha.xy = posuv.zw;\r\n        //v_texcoordAlpha.z = attribColor.a/255.0;\r\n        v_color = attribColor/255.0;\r\n        v_color.xyz*=v_color.w;//反正后面也要预乘\r\n\r\n        v_useTex = attribFlags.r/255.0;\r\n        float clipw = length(clipMatDir.xy);\r\n        float cliph = length(clipMatDir.zw);\r\n\r\n        vec2 clpos = clipMatPos.xy;\r\n    #ifdef WORLDMAT\r\n        // 如果有mmat，需要修改clipMatPos,因为 这是cacheas normal （如果不是就错了）， clipMatPos被去掉了偏移\r\n        if(clipOff[0]>0.0){\r\n            clpos.x+=mmat[3].x;     //tx    最简单处理\r\n            clpos.y+=mmat[3].y;     //ty\r\n        }\r\n    #endif\r\n        vec2 clippos = pos.xy - clpos;  //pos已经应用矩阵了，为了减的有意义，clip的位置也要缩放\r\n        if(clipw>20000. && cliph>20000.)\r\n            cliped = vec2(0.5,0.5);\r\n        else {\r\n            //转成0到1之间。/clipw/clipw 表示clippos与normalize之后的clip朝向点积之后，再除以clipw\r\n            cliped=vec2( dot(clippos,clipMatDir.xy)/clipw/clipw, dot(clippos,clipMatDir.zw)/cliph/cliph);\r\n        }\r\n    v_size=size;\r\n}";

    var ps$1 = `
precision mediump float;
varying vec2 v_texcoord;
varying vec4 v_color;
uniform sampler2D texture;
uniform float u_progress;
varying vec4 v_texcoordAlpha;
varying vec2 v_size;    
void main(){
    vec4 color=texture2D(texture, v_texcoordAlpha.xy);
    if(u_progress==0.||u_progress==1.){
        gl_FragColor = color;
        return;
    }
    float progress=sqrt(v_texcoordAlpha.x*v_texcoordAlpha.x+v_texcoordAlpha.y*v_texcoordAlpha.y)*0.3;
    
    progress+=0.3;
    float off=0.3;
    float f_min=(progress-off);
    float f_max=(progress+off);
    if(u_progress>f_min&&u_progress<f_max){
        float v_off=off-abs(u_progress-progress);
        color.r=min(1.,max(color.r,color.r+v_off*2.*color.a));
        color.g=min(1.,max(color.g,color.g+v_off*2.*color.a));
        color.b=min(1.,max(color.b,color.b+v_off*2.*color.a));
    }
    
    // float off=0.2;
    // float f_min=(progress-off);
    // float f_max=(progress+off)
    // if(u_progress>f_min&&u_progress<f_max){
    //     float v_off=u_progress-progress;
    //     color.r=min(1.,max(color.r,color.r+v_off*3.*color.a));
    //     color.g=min(1.,max(color.g,color.g+v_off*3.*color.a));
    //     color.b=min(1.,max(color.b,color.b+v_off*3.*color.a));
    // }
    gl_FragColor = color;
}`;
    var uniforms$1;
    (function (uniforms) {
        uniforms["u_progress"] = "u_progress";
    })(uniforms$1 || (uniforms$1 = {}));
    class StreamerShader extends CustomValue2d {
        initialize() {
            this.createShader(vs$1, ps$1);
        }
    }
    class StreamerSprite extends CustomSprite {
        constructor() {
            super(StreamerShader);
        }
        set progress(v) {
            this.setShaderValue(uniforms$1.u_progress, v);
        }
        get progress() {
            return this.getShaderValue(uniforms$1.u_progress);
        }
    }

    class Shader2d_Test3 {
        constructor() {
            this.create();
        }
        create() {
            return __awaiter(this, void 0, void 0, function* () {
                let title = yield this.loadImage("res/logo.png");
                var mg = new StreamerSprite();
                mg.texture = title;
                mg.autoSize = true;
                mg.pivot(mg.texture.width / 2, mg.texture.height / 2);
                mg.scale(1, 1);
                mg.x = Laya.stage.width / 2 - mg.width * mg.scaleX / 2;
                mg.y = Laya.stage.height / 2 - mg.height * mg.scaleY / 2;
                Laya.stage.addChild(mg);
                let handler = () => {
                    mg.progress = 0;
                    Laya.Tween.to(mg, { progress: 1 }, 2000, Laya.Ease.cubicInOut);
                };
                Laya.timer.loop(2300, this, handler);
                handler();
            });
        }
        loadImage(url) {
            return new Promise(reslove => {
                Laya.loader.load(url, Laya.Handler.create(this, (res) => {
                    reslove(res);
                }));
            });
        }
    }

    class ShaderUtil {
        static collectionDebugShaderInfo() {
            this._shadowInfo = {};
            let count = Laya.Shader3D.debugShaderVariantCollection.variantCount;
            for (let i = 0; i < count; i++) {
                let shadervariant = Laya.Shader3D.debugShaderVariantCollection.getByIndex(i);
                let name = shadervariant.shader.name;
                let arr = this._shadowInfo[name] || (this._shadowInfo[name] = []);
                arr.push({
                    defineNames: shadervariant.defineNames,
                    passIndex: shadervariant.passIndex,
                    subShaderIndex: shadervariant.subShaderIndex
                });
            }
            console.log(JSON.stringify(this._shadowInfo, null, "  "));
        }
        static precompileShaders(config, progress) {
            let total = 0;
            let results = [];
            Object.keys(config).forEach(name => {
                config[name].forEach(item => {
                    item['name'] = name;
                    results.push(item);
                    total++;
                });
            });
            return Utils.frameExec(this, (index) => {
                let item = results[index];
                if (item) {
                    Laya.Shader3D.compileShaderByDefineNames(item.name, item.subShaderIndex, item.passIndex, item.defineNames);
                }
                progress === null || progress === void 0 ? void 0 : progress.method.call(progress.caller, (index + 1) / total);
                return index >= total;
            }, 20);
        }
    }
    ShaderUtil._shadowInfo = {};

    class Main {
        constructor() {
            Config.useRetinalCanvas = true;
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height, null, Laya.Handler.create(this, this.initMain));
            else {
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
                this.initMain();
            }
        }
        initMain() {
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            Laya.stage.bgColor = `#333333`;
            Laya.stage.screenMode = "vertical";
            new Shader2d_Test3();
            //Laya.timer.frameOnce(12, this, () => ShaderUtil.collectionDebugShaderInfo());
        }
    }
    new Main();

}());
