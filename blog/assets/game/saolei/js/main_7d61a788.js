var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
};
var game;
(function (game) {
    var ModelRank = (function (_super) {
        __extends(ModelRank, _super);
        function ModelRank() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ModelRank.prototype.initialize = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        ModelRank.prototype.updateFloorRank = function (floor) {
            vitamin.opencontext.updateRankScore("floor", floor);
            if (vitamin.platform instanceof vitamin.PBytedance) {
                vitamin.platform.setToRank("floor", floor);
            }
        };
        ModelRank.prototype.updateStarRank = function (history) {
            var score = 0;
            history.forEach(function (v) {
                if (v)
                    score += v.star;
            });
            vitamin.opencontext.updateRankScore("star", score);
            if (vitamin.platform instanceof vitamin.PBytedance) {
                vitamin.platform.setToRank("star", score);
            }
        };
        ModelRank = __decorate([
            vitamin.Model()
        ], ModelRank);
        return ModelRank;
    }(vitamin.DataModelBase));
    game.ModelRank = ModelRank;
    __reflect(ModelRank.prototype, "game.ModelRank");
})(game || (game = {}));
var game;
(function (game) {
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene() {
            var _this = _super.call(this) || this;
            _this._shockMaxOffsetX = 6;
            _this._shockMaxOffsetY = 6;
            _this._bounds = new egret.Rectangle();
            _this._lowLayer = new egret.DisplayObjectContainer();
            _this.addChild(_this._lowLayer);
            _this._midLayer = new egret.DisplayObjectContainer();
            _this.addChild(_this._midLayer);
            _this._highLayer = new egret.DisplayObjectContainer();
            _this.addChild(_this._highLayer);
            _this._effectLayer = new game.EffectLayer(3);
            _this._effectLayer.blendMode = egret.BlendMode.ADD;
            _this.addChild(_this._effectLayer);
            _this._objects = new Map();
            _this.touchEnabled = true;
            _this._nodes = [];
            _this._center = new egret.Point();
            return _this;
        }
        Scene.prototype.initializeGrids = function (sigmentX, sigmentY, size) {
            if (size === void 0) { size = 16; }
            this._sigmentX = sigmentX;
            this._sigmentY = sigmentY;
            this._width = sigmentX * size;
            this._height = sigmentY * size;
            this.clearNodes();
            this.initNodes(sigmentX, sigmentY);
            this._sigmentSize = size;
            this.onUpdateScale();
            this._center.x = this.width / 2;
            this._center.y = this.height / 2;
        };
        Scene.prototype.scale = function (v) {
            this.scaleX = this.scaleY = v;
            this.onUpdateScale();
        };
        Scene.prototype.onUpdateScale = function () {
            this._center.setTo((vitamin.stage.width / 2) / this.scaleX, (vitamin.stage.height / 2) / this.scaleY);
        };
        Scene.prototype.clearNodes = function () {
            for (var _i = 0, _a = this._nodes; _i < _a.length; _i++) {
                var list = _a[_i];
                for (var _b = 0, list_1 = list; _b < list_1.length; _b++) {
                    var node = list_1[_b];
                    vitamin.ObjectPool.to(node, true);
                }
                list.length = 0;
            }
            this._nodes.length = 0;
        };
        Scene.prototype.initNodes = function (sigmentX, sigmentY) {
            for (var b = 0; b < sigmentY; b++) {
                this._nodes[b] = [];
                for (var a = 0; a < sigmentX; a++) {
                    var node_1 = vitamin.ObjectPool.from(game.SceneNode);
                    node_1.initialize(a, b);
                    this._nodes[b][a] = node_1;
                }
            }
            for (var _i = 0, _a = this._nodes; _i < _a.length; _i++) {
                var list = _a[_i];
                for (var _b = 0, list_2 = list; _b < list_2.length; _b++) {
                    var node = list_2[_b];
                    node.initializeNeighbors(this.getNode(node.a - 1, node.b - 1), this.getNode(node.a, node.b - 1), this.getNode(node.a + 1, node.b - 1), this.getNode(node.a + 1, node.b), this.getNode(node.a + 1, node.b + 1), this.getNode(node.a, node.b + 1), this.getNode(node.a - 1, node.b + 1), this.getNode(node.a - 1, node.b));
                }
            }
        };
        Scene.prototype.forEachNodes = function (callback) {
            var index = 0;
            this._nodes.forEach(function (list) {
                for (var _i = 0, list_3 = list; _i < list_3.length; _i++) {
                    var node = list_3[_i];
                    callback(node, index);
                    index++;
                }
            });
        };
        Scene.prototype.getNode = function (a, b) {
            if (b >= 0 && b < this._nodes.length) {
                if (a >= 0 && a < this._nodes[b].length) {
                    return this._nodes[b][a];
                }
            }
            return null;
        };
        Scene.prototype.getRandomNode = function () {
            return this._nodes.random().random();
        };
        Object.defineProperty(Scene.prototype, "nodes", {
            get: function () { return this._nodes; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "sigmentSize", {
            get: function () { return this._sigmentSize; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "backGround", {
            get: function () {
                return this._backGround;
            },
            set: function (background) {
                if (this._backGround) {
                    if (this._backGround.parent)
                        this._backGround.parent.removeChild(this._backGround);
                }
                this._backGround = background;
                if (this._backGround)
                    this.addChildAt(background, 0);
            },
            enumerable: true,
            configurable: true
        });
        Scene.prototype.onResize = function (w, h) {
            this._backGround.width = w;
            this._backGround.height = h;
            this._bounds.setTo(20, 20, w - 40, h - 40);
        };
        Scene.prototype.onUpdate = function () {
            for (var name_1 in this._objects) {
                var list = this._objects[name_1];
                for (var _i = 0, list_4 = list; _i < list_4.length; _i++) {
                    var object = list_4[_i];
                    object.update();
                }
            }
        };
        Scene.prototype.clear = function () {
            for (var key in this._objects) {
                var list = this._objects[key];
                while (list.length) {
                    var object = list.pop();
                    object.removeFromScene();
                }
            }
        };
        Scene.prototype.addObject = function (object) {
            object.addToScene(this);
        };
        Scene.prototype.removeObject = function (object) {
            object.removeFromScene();
        };
        Scene.prototype.push = function (object) {
            var name = egret.getQualifiedClassName(object);
            if (!this._objects[name]) {
                this._objects[name] = [];
            }
            var list = this._objects[name];
            if (list.indexOf(object) == -1) {
                list.push(object);
            }
        };
        Scene.prototype.splice = function (object) {
            var name = egret.getQualifiedClassName(object);
            var list = this._objects[name];
            if (!list)
                return;
            var index = list.indexOf(object);
            if (index >= 0) {
                list.splice(index, 1);
            }
        };
        Scene.prototype.finds = function (clazz) {
            var name = egret.getQualifiedClassName(clazz);
            return this._objects[name];
        };
        Object.defineProperty(Scene.prototype, "objects", {
            get: function () {
                return this._objects;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "highLayer", {
            get: function () {
                return this._highLayer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "effectLayer", {
            get: function () {
                return this._effectLayer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "lowLayer", {
            get: function () {
                return this._lowLayer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "midLayer", {
            get: function () {
                return this._midLayer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "bouns", {
            get: function () {
                return this._bounds;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "sigmentX", {
            //@ts-ignore
            get: function () {
                return this._sigmentX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "sigmentY", {
            //@ts-ignore
            get: function () {
                return this._sigmentY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "width", {
            //@ts-ignore
            get: function () {
                return this._width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "height", {
            //@ts-ignore
            get: function () {
                return this._height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "realWidth", {
            //@ts-ignore
            get: function () {
                return this._width * this.scaleX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "realHeight", {
            //@ts-ignore
            get: function () {
                return this._height * this.scaleY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "center", {
            get: function () {
                return this._center;
            },
            enumerable: true,
            configurable: true
        });
        Scene.prototype.pos = function (x, y) {
            this.x = x;
            this.y = y;
            var ORIGINAL_KEY = "__original_pos__";
            if (!this[ORIGINAL_KEY])
                this[ORIGINAL_KEY] = { x: this.x, y: this.y };
            this[ORIGINAL_KEY].x = x;
            this[ORIGINAL_KEY].y = y;
        };
        Scene.prototype.cacheOriginalPosition = function (withobjects) {
            var ORIGINAL_KEY = "__original_pos__";
            if (!this[ORIGINAL_KEY])
                this[ORIGINAL_KEY] = { x: this.x, y: this.y };
            if (withobjects) {
                for (var _i = 0, withobjects_1 = withobjects; _i < withobjects_1.length; _i++) {
                    var object = withobjects_1[_i];
                    if (!object[ORIGINAL_KEY]) {
                        object[ORIGINAL_KEY] = { x: object.x, y: object.y };
                    }
                }
            }
        };
        Scene.prototype.getOriginal = function (object) {
            return (object ? object : this)['__original_pos__'];
        };
        Scene.prototype.shack = function (elastic) {
            var _this = this;
            if (elastic === void 0) { elastic = 0.5; }
            var withobjects = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                withobjects[_i - 1] = arguments[_i];
            }
            this.cacheOriginalPosition(withobjects);
            if (this.shackhandler) {
                vitamin.ticker.clear(this.shackhandler);
                this.shackhandler = undefined;
            }
            var original = this.getOriginal();
            var vx = 0;
            var vy = 0;
            this.x = original.x + vitamin.MathUtil.randSign() * this._shockMaxOffsetX;
            this.y = original.y + vitamin.MathUtil.randSign() * this._shockMaxOffsetY;
            this.shackhandler = vitamin.ticker.add(this, function () {
                vx += (original.x - _this.x) * elastic; //spring为弹性系数
                vy += (original.y - _this.y) * elastic;
                vx *= 0.9; //friction为摩擦力
                vy *= 0.9;
                _this.x += vx;
                _this.y += vy;
                for (var _i = 0, withobjects_2 = withobjects; _i < withobjects_2.length; _i++) {
                    var object = withobjects_2[_i];
                    var objoriginal = _this.getOriginal(object);
                    object.x = objoriginal.x + _this._shockMaxOffsetX * ((_this.x - original.x) / _this._shockMaxOffsetX);
                    object.y = objoriginal.y + _this._shockMaxOffsetY * ((_this.y - original.y) / _this._shockMaxOffsetY);
                }
                if (Math.abs(vx) < 0.1 && Math.abs(vy) < 0.1) {
                    vitamin.ticker.clear(_this.shockhandler);
                    _this.shockhandler = undefined;
                }
            });
            if (game.GameModel.setting.shock) {
                vitamin.platform.shock(elastic * 400);
            }
        };
        Scene.prototype.shock = function (direct /**1 | 2 | 3 | 4 */, times) {
            var _this = this;
            if (times === void 0) { times = 7; }
            this.cacheOriginalPosition();
            var original = this.getOriginal();
            if (this.shockhandler) {
                vitamin.timer.clearHandler(this.shockhandler);
                this.shockhandler = null;
            }
            this.shockhandler = vitamin.timer.loop(1000 / 60, this, function () {
                switch (direct) {
                    case 1:
                        _this.x = original.x + (times % 2 == 0 ? 1 : -1) * times;
                        break;
                    case 2:
                        _this.y = original.y + (times % 2 == 0 ? 1 : -1) * times;
                        break;
                    case 3:
                        _this.x = original.x + (times % 2 == 0 ? 1 : -1) * times;
                        _this.y = original.y + (times % 2 == 0 ? 1 : -1) * times;
                        break;
                    case 4:
                        _this.x = original.x + (times % 2 == 0 ? -1 : -1) * times;
                        _this.y = original.y + (times % 2 == 0 ? -1 : 1) * times;
                        break;
                }
                times--;
                if (times <= 0) {
                    vitamin.timer.clearHandler(_this.shockhandler);
                    _this.shockhandler = null;
                    _this.x = original.x;
                    _this.y = original.y;
                }
            });
        };
        return Scene;
    }(egret.DisplayObjectContainer));
    game.Scene = Scene;
    __reflect(Scene.prototype, "game.Scene");
})(game || (game = {}));
var game;
(function (game) {
    var KObject = (function (_super) {
        __extends(KObject, _super);
        function KObject() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KObject.prototype.onCreate = function () {
            this._skin = new vitamin.Bitmap();
            this._skin.pivot(0.5);
            this.addChild(this._skin);
            this._speed = { x: 0, y: 0, z: 0 };
        };
        KObject.prototype.initialize = function (texture) {
            this.texture = texture;
        };
        KObject.prototype.uninitialize = function () {
            this._skin.texture = null;
            this.stop();
        };
        Object.defineProperty(KObject.prototype, "texture", {
            set: function (v) {
                this._skin.texture = v;
            },
            enumerable: true,
            configurable: true
        });
        KObject.prototype.onFogChange = function (amount, bgcolor) {
            if (this.z < -80) {
                this.alpha = 1 - (-80 - this.z) / 60;
                return;
            }
            this.alpha = (1 - amount);
        };
        KObject.prototype.start = function (caller, complete) {
            vitamin.ticker.add(this, this.updateRender);
            // let totalframe = duration / 1000 * 60;
            this._speed.x = 0;
            this._speed.y = 3;
            this._speed.z = -5;
            this._speedScale = 4;
            if (this._complete)
                this._complete.recover();
            this._complete = vitamin.Handler.create(caller, complete);
        };
        KObject.prototype.stop = function () {
            if (this._complete) {
                this._complete.recover();
                this._complete = null;
            }
            vitamin.ticker.clear(this, this.updateRender);
            egret.Tween.removeTweens(this);
        };
        KObject.prototype.updateRender = function () {
            this.z += this._speed.z * this._speedScale;
            if (this.z < 50) {
                if (this.z < -150) {
                    // this.alpha += (0 - this.alpha) / 5;
                    this._speedScale += (0.3 - this._speedScale) / 10;
                    if (this.z < -300) {
                        this._complete.runWith(this);
                        this.stop();
                    }
                }
                else {
                    this._speedScale += (0.2 - this._speedScale) / 5;
                }
            }
        };
        return KObject;
    }(k25d.SceneObject));
    game.KObject = KObject;
    __reflect(KObject.prototype, "game.KObject", ["vitamin.IPool"]);
})(game || (game = {}));
var game;
(function (game) {
    var SceneObject = (function (_super) {
        __extends(SceneObject, _super);
        function SceneObject() {
            var _this = _super.call(this) || this;
            _this._skin = new vitamin.Bitmap();
            _this.addChild(_this._skin);
            _this._skin.smoothing = false;
            return _this;
        }
        SceneObject.prototype.create = function () { };
        SceneObject.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        SceneObject.prototype.uninitialize = function () { };
        SceneObject.prototype.update = function () { };
        SceneObject.prototype.addToScene = function (scene) {
            this._scene = scene;
            this._scene.push(this);
            scene.midLayer.addChild(this);
            return this;
        };
        SceneObject.prototype.removeFromScene = function () {
            if (this._scene) {
                if (this.parent) {
                    this.parent.removeChild(this);
                }
                this._scene.splice(this);
                this._scene = null;
            }
            return this;
        };
        Object.defineProperty(SceneObject.prototype, "scene", {
            get: function () { return this._scene; },
            enumerable: true,
            configurable: true
        });
        return SceneObject;
    }(vitamin.Container));
    game.SceneObject = SceneObject;
    __reflect(SceneObject.prototype, "game.SceneObject", ["vitamin.IPool"]);
})(game || (game = {}));
var game;
(function (game) {
    var ModelAds = (function (_super) {
        __extends(ModelAds, _super);
        function ModelAds() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ModelAds.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            if (this.strength == undefined)
                this.strength = 5;
            // this.strength=0;
        };
        ModelAds.prototype.strengthCost = function () {
            if (this.strength > 0) {
                this.strength--;
                this.save();
            }
        };
        ModelAds.prototype.strengthIncrease = function (count) {
            if (count === void 0) { count = 5; }
            this.strength = Math.min(25, this.strength + count);
            this.save();
        };
        ModelAds.prototype.checkIsMaxStrength = function () {
            return this.strength >= 25;
        };
        ModelAds.prototype.setVipTime = function (time) {
            var endTime = Date.now() + time;
            if (this.vipEndTime != undefined) {
                if (endTime < this.vipEndTime) {
                    return;
                }
            }
            this.vipEndTime = endTime;
            this.save();
        };
        ModelAds.prototype.checkSuccessPlay = function () {
            return game.GameModel.level.floor > 5 && game.GameModel.level.floor % 8 == 0;
        };
        ModelAds.prototype.checkIsVip = function () {
            if (this.vipEndTime == undefined)
                return false;
            if (!this.vipEndTime)
                return false;
            return Date.now() <= this.vipEndTime;
        };
        __decorate([
            vitamin.serialize()
        ], ModelAds.prototype, "strength", void 0);
        __decorate([
            vitamin.serialize()
        ], ModelAds.prototype, "vipEndTime", void 0);
        ModelAds = __decorate([
            vitamin.Model()
        ], ModelAds);
        return ModelAds;
    }(vitamin.DataModelBase));
    game.ModelAds = ModelAds;
    __reflect(ModelAds.prototype, "game.ModelAds");
})(game || (game = {}));
var game;
(function (game) {
    var TypeProp;
    (function (TypeProp) {
        TypeProp[TypeProp["HeadTapper"] = 0] = "HeadTapper";
        TypeProp[TypeProp["Boom"] = 1] = "Boom";
        TypeProp[TypeProp["SandFist"] = 2] = "SandFist";
        TypeProp[TypeProp["Kiss"] = 3] = "Kiss";
    })(TypeProp = game.TypeProp || (game.TypeProp = {}));
    var TypePokerFlower;
    (function (TypePokerFlower) {
        /**黑桃 */
        TypePokerFlower[TypePokerFlower["SPADE"] = 0] = "SPADE";
        /**红心 */
        TypePokerFlower[TypePokerFlower["HEART"] = 1] = "HEART";
        /**梅花 */
        TypePokerFlower[TypePokerFlower["CLUB"] = 2] = "CLUB";
        /**方块 */
        TypePokerFlower[TypePokerFlower["DIAMOND"] = 3] = "DIAMOND";
    })(TypePokerFlower = game.TypePokerFlower || (game.TypePokerFlower = {}));
    var TypePokerPattern;
    (function (TypePokerPattern) {
        /**顺子 */
        TypePokerPattern[TypePokerPattern["QUEUE"] = 0] = "QUEUE";
        /**两对 */
        TypePokerPattern[TypePokerPattern["TWOTWINS"] = 1] = "TWOTWINS";
        /**三条 */
        TypePokerPattern[TypePokerPattern["THREE"] = 2] = "THREE";
        /**同花 */
        TypePokerPattern[TypePokerPattern["SAMEFLOWER"] = 3] = "SAMEFLOWER";
    })(TypePokerPattern = game.TypePokerPattern || (game.TypePokerPattern = {}));
    var ModelCollect = (function (_super) {
        __extends(ModelCollect, _super);
        function ModelCollect() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ModelCollect.prototype.initialize = function () {
            if (!this.pokers) {
                this.pokers = [
                    { value: undefined, flower: undefined },
                    { value: undefined, flower: undefined },
                    { value: undefined, flower: undefined },
                    { value: undefined, flower: undefined },
                    { value: undefined, flower: undefined }
                ];
            }
            if (!this.badges) {
                this.badges = [];
                var startId = 1001;
                for (var i = 0; i < this.pokers.length; i++) {
                    this.badges[i] = [
                        { id: startId++, count: 0 },
                        { id: startId++, count: 0 },
                        { id: startId++, count: 0 },
                        { id: startId++, count: 0 },
                        { id: startId++, count: 0 }
                    ];
                }
            }
            if (this.lucktimes == undefined)
                this.lucktimes = 0;
            if (!this.pokerPattern) {
                this.pokerPattern = {
                    date: Date.now(),
                    pattern: vitamin.enumParse(TypePokerPattern).values.random()
                };
            }
            var lastDate = new Date(this.pokerPattern.date);
            var date = new Date();
            if (lastDate.getFullYear() != date.getFullYear() || lastDate.getMonth() != date.getMonth() || lastDate.getDate() != date.getDate()) {
                this.pokerPattern.date = Date.now();
                this.pokerPattern.pattern = vitamin.enumParse(TypePokerPattern).values.random();
            }
            // for (let list of this.badges) {
            //     for (let badge of list) {
            //         badge.count = 25;
            //     }
            // }
            // this.lucktimes = 10;
        };
        ModelCollect.prototype.setPoker = function (index, value, flower) {
            var poker = this.pokers[index];
            if (poker) {
                poker.value = value;
                poker.flower = flower;
            }
            this.save();
        };
        /**
         * 检查牌型
         * @returns
         */
        ModelCollect.prototype.checkPokerDone = function () {
            return game.PokerUtil.checkPokerDone(this.pokerPattern.pattern, this.pokers);
        };
        /**
         * 使用卡片抽取扑克
         * @param badgeGroupIndex
         * @returns
         */
        ModelCollect.prototype.drawPoketUseBadge = function (badgeGroupIndex, useLuck) {
            if (!this.checkBadge(badgeGroupIndex)) {
                vitamin.ui.tip("\u9519\u8BEF,\u5361\u7247\u7EC4" + badgeGroupIndex + "\u7684\u6570\u91CF\u4E0D\u8DB3!");
                return null;
            }
            var badges = this.badges[badgeGroupIndex];
            for (var _i = 0, badges_1 = badges; _i < badges_1.length; _i++) {
                var badge = badges_1[_i];
                badge.count = Math.max(badge.count - 1, 0);
            }
            if (useLuck) {
                this.lucktimes--;
                var poker = game.PokerUtil.getLuckOnce(this.pokerPattern.pattern, this.pokers);
                return poker;
            }
            return game.PokerUtil.getPoker.apply(game.PokerUtil, this.pokers);
        };
        ModelCollect.prototype.checkBadge = function (index) {
            for (var _i = 0, _a = this.badges[index]; _i < _a.length; _i++) {
                var badge = _a[_i];
                if (badge.count == 0)
                    return false;
            }
            return true;
        };
        ModelCollect.prototype.randomBadge = function () {
            return this.badges.random().random();
        };
        ModelCollect.prototype.addBadge = function (id) {
            var index = Math.floor((id - 1001) / 5);
            var badge = this.badges[index].find(function (v) { return v.id == id; });
            if (badge) {
                badge.count++;
            }
            this.save();
        };
        ModelCollect.prototype.exchangeProp = function (type) {
            vitamin.opencontext.postMessage("addProp", { type: type });
            for (var _i = 0, _a = this.pokers; _i < _a.length; _i++) {
                var poker = _a[_i];
                poker.value = undefined;
                poker.flower = undefined;
            }
            this.save();
        };
        __decorate([
            vitamin.serialize()
        ], ModelCollect.prototype, "pokers", void 0);
        __decorate([
            vitamin.serialize()
        ], ModelCollect.prototype, "badges", void 0);
        __decorate([
            vitamin.serialize()
        ], ModelCollect.prototype, "pokerPattern", void 0);
        __decorate([
            vitamin.serialize()
        ], ModelCollect.prototype, "lucktimes", void 0);
        ModelCollect = __decorate([
            vitamin.Model()
        ], ModelCollect);
        return ModelCollect;
    }(vitamin.DataModelBase));
    game.ModelCollect = ModelCollect;
    __reflect(ModelCollect.prototype, "game.ModelCollect");
})(game || (game = {}));
var game;
(function (game) {
    var ModelLevel = (function (_super) {
        __extends(ModelLevel, _super);
        function ModelLevel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.minBoomPercent = 0.1;
            _this.maxBoomPercent = 0.6;
            return _this;
        }
        ModelLevel.prototype.initialize = function () {
            var _this = this;
            if (!this.history)
                this.history = [];
            this.minSigmentX = this.minSigmentY = 5;
            var scale = (vitamin.stage.height * 0.8) / vitamin.stage.width;
            this.maxSigmentX = 16;
            this.maxSigmentY = (this.maxSigmentX * scale) >> 0;
            this.floor = this.history.length + 1;
            if (!this.history.length) {
                vitamin.ticker.callLater(this, function () {
                    game.GameModel.rank.updateFloorRank(_this.floor);
                });
            }
            this.current = this.createFloorData(this.floor);
            this.showguide = this.floor < 15;
            // let list = [];
            // for (let i = 0; i < 100; i++) {
            //     let data = this.createFloorData(i + 1);
            //     list.push(data);
            // }
            // vitamin.table(list.map(v => {
            //     v.style = Res.styles.indexOf(v.style);
            //     v.boxes = v.sigmentX * v.sigmentY;
            //     return v;
            // }));
        };
        ModelLevel.prototype.startFloor = function () {
            if (this.costStrength) {
                game.GameModel.ads.strengthCost();
                this.costStrength = false;
            }
            this.time = 0;
            vitamin.timer.loop(1000, this, this.updateFloorTimer);
        };
        ModelLevel.prototype.stopFloor = function () {
            vitamin.timer.clear(this, this.updateFloorTimer);
        };
        ModelLevel.prototype.updateFloorTimer = function () {
            this.time++;
        };
        ModelLevel.prototype.prevFloor = function () {
            if (this.history.length) {
                this.history.pop();
                this.floor = this.history.length + 1;
                this.current = this.createFloorData(this.floor);
                this.save();
                game.GameModel.rank.updateFloorRank(this.floor);
                game.GameModel.rank.updateStarRank(this.history);
            }
        };
        ModelLevel.prototype.nextFloor = function (costSecond) {
            if (this.current.floor != this.floor) {
                this.current = this.createFloorData(this.floor);
            }
            var star = this.getStar(costSecond, this.current);
            this.history[this.floor - 1] = {
                costsecond: costSecond,
                star: star
            };
            this.floor++;
            this.costStrength = true;
            this.current = this.createFloorData(this.floor);
            this.prevstar = star;
            this.save();
            game.GameModel.rank.updateFloorRank(this.floor);
            game.GameModel.rank.updateStarRank(this.history);
            this.showguide = this.floor < 15;
        };
        ModelLevel.prototype.getStar = function (second, floorData) {
            // let boompercent = floorData.boom / (floorData.sigmentX * floorData.sigmentY);
            // //难度
            // let difficulty = Math.min(1, boompercent / this.maxBoomPercent);
            // //当前难度需要的秒数
            // let needSec = difficulty * 60;
            var needSec = (floorData.sigmentX * floorData.sigmentY) * 0.3;
            if (second < needSec) {
                return 3;
            }
            if (second < needSec * 1.5) {
                return 2;
            }
            // if ((needSec / second) > 0.7) {
            //     return 2;
            // }
            // if ((needSec / second) > 0.4) {
            //     return 1;
            // }
            return 1;
        };
        ModelLevel.prototype.checkFloorOffset = function (floor) {
            return floor - this.floor;
        };
        ModelLevel.prototype.checkStarFloor = function (floor) {
            return false;
        };
        ModelLevel.prototype.createFloorData = function (floor) {
            var boomPercent = this.minBoomPercent;
            var minSigmentX = this.minSigmentX;
            var minSigmentY = this.minSigmentY;
            var sigmentX = minSigmentX;
            var sigmentY = minSigmentY;
            var chapter = 1;
            for (var i = 1; i < floor; i++) {
                if (i % 2 == 0) {
                    if (sigmentX < this.maxSigmentX) {
                        sigmentX++;
                        continue;
                    }
                }
                if (sigmentY < this.maxSigmentY) {
                    sigmentY++;
                    continue;
                }
                if (boomPercent < this.maxBoomPercent) {
                    boomPercent += 0.05;
                    minSigmentX++;
                    minSigmentY++;
                    sigmentX = minSigmentX;
                    sigmentY = minSigmentY;
                    chapter++;
                    continue;
                }
            }
            function randomStyle() {
                for (var _i = 0, _a = game.Res.styles; _i < _a.length; _i++) {
                    var style = _a[_i];
                    if (Math.random() < 0.5) {
                        return style;
                    }
                }
                return game.Res.styles.last();
            }
            var boomCount = ((sigmentX * sigmentY) * boomPercent) >> 0;
            var badgeCount = Math.min(5, Math.round(boomCount * vitamin.MathUtil.randRange(0.4, 0.8)));
            return {
                floor: floor,
                sigmentX: sigmentX,
                sigmentY: sigmentY,
                boom: boomCount,
                badge: 5,
                chaos: false,
                style: randomStyle(),
                chapter: chapter
            };
        };
        __decorate([
            vitamin.serialize()
        ], ModelLevel.prototype, "history", void 0);
        ModelLevel = __decorate([
            vitamin.Model()
        ], ModelLevel);
        return ModelLevel;
    }(vitamin.DataModelBase));
    game.ModelLevel = ModelLevel;
    __reflect(ModelLevel.prototype, "game.ModelLevel");
})(game || (game = {}));
var game;
(function (game) {
    var ModelSetting = (function (_super) {
        __extends(ModelSetting, _super);
        function ModelSetting() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.lightning = true;
            _this.shock = true;
            _this.sound = true;
            _this.music = true;
            return _this;
        }
        ModelSetting.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            vitamin.Watcher.get(this, "sound").bind(vitamin.audio, "enabledSound", { execOnce: true });
            vitamin.Watcher.get(this, "music").bind(vitamin.audio, "enabledMusic", { execOnce: true });
        };
        __decorate([
            vitamin.serialize()
        ], ModelSetting.prototype, "lightning", void 0);
        __decorate([
            vitamin.serialize()
        ], ModelSetting.prototype, "shock", void 0);
        __decorate([
            vitamin.serialize()
        ], ModelSetting.prototype, "sound", void 0);
        __decorate([
            vitamin.serialize()
        ], ModelSetting.prototype, "music", void 0);
        ModelSetting = __decorate([
            vitamin.Model()
        ], ModelSetting);
        return ModelSetting;
    }(vitamin.DataModelBase));
    game.ModelSetting = ModelSetting;
    __reflect(ModelSetting.prototype, "game.ModelSetting");
})(game || (game = {}));
var game;
(function (game) {
    var SceneView = (function (_super) {
        __extends(SceneView, _super);
        function SceneView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SceneView.prototype.tweenIn = function () {
            var _this = this;
            return new Promise(function (reslove) {
                vitamin.audio.playSound(game.Sound.Effect.fly3);
                var centerX = fairygui.GRoot.inst.width / 2;
                var centerY = fairygui.GRoot.inst.height / 2;
                var x = centerX - _this.width / 2;
                var y = centerY - _this.height / 2;
                var width = _this.width;
                var height = _this.height;
                _this.scaleX = _this.scaleY = 0;
                _this.x = centerX - (width * _this.scaleX) / 2;
                _this.y = centerY - (height * _this.scaleY) / 2;
                egret.Tween.removeTweens(_this);
                _this.alpha = 0;
                egret.Tween.get(_this).to({ scaleX: 1, scaleY: 1, x: x, y: y, alpha: 1 }, 2000, egret.Ease.sineInOut)
                    .call(reslove, _this);
            });
        };
        SceneView.prototype.tweenOut = function () {
            var _this = this;
            return new Promise(function (reslove) {
                var centerX = fairygui.GRoot.inst.width / 2;
                var centerY = fairygui.GRoot.inst.height / 2;
                var width = _this.width;
                var height = _this.height;
                var scale = 2;
                egret.Tween.removeTweens(_this);
                egret.Tween.get(_this)
                    .to({ scaleX: scale, scaleY: scale, alpha: 0, x: centerX - (width * scale) / 2, y: centerY - (height * scale) / 2 }, 500, egret.Ease.sineIn)
                    .call(function () {
                    _this.remove();
                    reslove();
                });
            });
        };
        return SceneView;
    }(vitamin.AlertItem));
    game.SceneView = SceneView;
    __reflect(SceneView.prototype, "game.SceneView");
})(game || (game = {}));
var game;
(function (game) {
    var FlyingTunnel = (function (_super) {
        __extends(FlyingTunnel, _super);
        function FlyingTunnel() {
            return _super.call(this, {
                launchers: [
                    {
                        type: vitamin.IntervalLauncher,
                        option: {
                            interval: 100,
                        },
                        particels: [FlyingTunnelBitmap]
                    }
                ]
            }) || this;
        }
        FlyingTunnel.prototype.onParticelCreate = function (particel, launcher) {
            particel.x = 0;
            particel.y = 0;
            if (particel instanceof FlyingTunnelBitmap) {
                particel.initialize(FlyingTunnel.sheet.getTexture(((Math.random() * 7) >> 0) + ''), (Math.random() * 360) >> 0);
            }
            else {
                particel.initialize(500 + Math.random() * 500, 20 + Math.random() * 60, (0xeeeeee + 0x111111 * Math.random()) >> 0, (Math.random() * 360) >> 0);
            }
        };
        return FlyingTunnel;
    }(vitamin.Effect));
    game.FlyingTunnel = FlyingTunnel;
    __reflect(FlyingTunnel.prototype, "game.FlyingTunnel");
    var FlyingTunnelShape = (function (_super) {
        __extends(FlyingTunnelShape, _super);
        function FlyingTunnelShape() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FlyingTunnelShape.prototype.initialize = function (length, height, color, angle) {
            this.cacheAsBitmap = false;
            var r = color >> 16;
            var g = (color >> 8) & 0x00FF;
            var b = color << 24 >> 24;
            if (r > 0xFF)
                r = 0xFF;
            if (g > 0xFF)
                g = 0xFF;
            if (b > 0xFF)
                b = 0xFF;
            if (r < 0)
                r = 0;
            if (g < 0)
                g = 0;
            if (b < 0)
                b = 0;
            var endColor = r << 16 | (g << 8) | b;
            this.graphics.clear();
            // this.graphics.beginFill(0xFFFFFF, 0.8);
            this.graphics.beginGradientFill(egret.GradientType.RADIAL, [color, endColor], [1, 1], [0, 255]);
            this.graphics.moveTo(0, -height * 0.2);
            this.graphics.lineTo(length, -height);
            this.graphics.lineTo(length, height);
            this.graphics.lineTo(0, height * 0.2);
            this.graphics.endFill();
            this.cacheAsBitmap = true;
            this.rotation = angle;
            _super.prototype.initialize.call(this);
        };
        FlyingTunnelShape.prototype.start = function () {
            _super.prototype.start.call(this);
            game.VCache.point = vitamin.MathUtil.getLinePointByAngle(this.x, this.y, 700, this.rotation, game.VCache.point);
            this.scaleX = 0;
            this.scaleY = 0;
            this.alpha = 1;
            egret.Tween.get(this).to({ scaleX: 3, scaleY: 2, x: game.VCache.point.x, y: game.VCache.point.y, alpha: 0 }, 800, egret.Ease.cubicInOut).call(this.end, this);
        };
        return FlyingTunnelShape;
    }(vitamin.ShapeParticel));
    game.FlyingTunnelShape = FlyingTunnelShape;
    __reflect(FlyingTunnelShape.prototype, "game.FlyingTunnelShape");
    var FlyingTunnelBitmap = (function (_super) {
        __extends(FlyingTunnelBitmap, _super);
        function FlyingTunnelBitmap() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FlyingTunnelBitmap.prototype.initialize = function (texture, angle) {
            this.texture = texture;
            this.anchorOffsetX = 0;
            this.anchorOffsetY = (texture.textureHeight / 2);
            // this.width = length;
            // this.height = height;
            this.rotation = angle;
            _super.prototype.initialize.call(this);
        };
        FlyingTunnelBitmap.prototype.start = function () {
            var _this = this;
            _super.prototype.start.call(this);
            var x = this.x;
            var y = this.y;
            this.scaleX = 0;
            this.scaleY = Math.random() * 0.3 + 0;
            this.alpha = 1;
            game.VCache.point = vitamin.MathUtil.getLinePointByAngle(x, y, Math.random() * 100 + 100, this.rotation, game.VCache.point);
            egret.Tween.get(this).to({ scaleX: 3 + Math.random() * 2, scaleY: 1 + Math.random() * 2, x: game.VCache.point.x, y: game.VCache.point.y, alpha: Math.random() * 0.5 + 0.5 }, 800, egret.Ease.sineOut).call(function () {
                game.VCache.point = vitamin.MathUtil.getLinePointByAngle(x, y, 900, _this.rotation, game.VCache.point);
                egret.Tween.get(_this).to({ scaleX: 5, scaleY: 3, x: game.VCache.point.x, y: game.VCache.point.y, alpha: 0 }, 1500, egret.Ease.sineIn).call(_this.end, _this);
            });
        };
        return FlyingTunnelBitmap;
    }(vitamin.Particel));
    game.FlyingTunnelBitmap = FlyingTunnelBitmap;
    __reflect(FlyingTunnelBitmap.prototype, "game.FlyingTunnelBitmap");
})(game || (game = {}));
var game;
(function (game) {
    var LightningEffect = (function (_super) {
        __extends(LightningEffect, _super);
        function LightningEffect() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LightningEffect.exec = function (x, y, scene) {
            var effect = vitamin.ObjectPool.from(vitamin.Animation);
            var index = game.Res.lightnings.randomIndex();
            effect.initialize(game.Res.lightnings[index]);
            switch (index) {
                case 0:
                case 1:
                    effect.pivot(0.48, 0.8);
                    break;
                case 2:
                    effect.pivot(0.48, 0.5);
                    break;
                case 3:
                case 4:
                    effect.pivot(0.48, 0.85);
                    break;
                case 5:
                    effect.pivot(0.5, 0.91);
                    break;
            }
            var point = scene.highLayer.localToGlobal(x, y, game.VCache.point);
            vitamin.layer.scene.addChild(effect);
            effect.smoothing = true;
            effect.scale(2 * vitamin.MathUtil.randSign(), 2);
            effect.pos(point.x, point.y);
            effect.blendMode = egret.BlendMode.ADD;
            effect.play(30);
            effect.once(egret.Event.LOOP_COMPLETE, function () {
                effect.parent.removeChild(effect);
                vitamin.ObjectPool.to(effect, true);
            }, this);
        };
        return LightningEffect;
    }(vitamin.Container));
    game.LightningEffect = LightningEffect;
    __reflect(LightningEffect.prototype, "game.LightningEffect", ["vitamin.IPool"]);
})(game || (game = {}));
var game;
(function (game) {
    var Boom = (function (_super) {
        __extends(Boom, _super);
        function Boom() {
            var _this = _super.call(this) || this;
            _this.targetScale = 1;
            _this.skin = new vitamin.Bitmap();
            _this.addChild(_this.skin);
            _this.skin.texture = game.Res.scene["boom0.png"];
            _this.skin.pivot(0.5);
            _this.skin.smoothing = true;
            return _this;
        }
        Boom.prototype.initialize = function (box) {
            this._box = box;
            this.skin.scale(32 / this.skin.texture.textureWidth);
            // this.white.scale(size / this.skin.texture.textureWidth);
            this.skin.visible = true;
        };
        Boom.prototype.uninitialize = function () {
            this.scale(1);
            vitamin.ticker.remove(this, this.updateRender);
        };
        Object.defineProperty(Boom.prototype, "box", {
            get: function () { return this._box; },
            enumerable: true,
            configurable: true
        });
        Boom.prototype.addToScene = function (scene) {
            _super.prototype.addToScene.call(this, scene);
            scene.highLayer.addChild(this);
            return this;
        };
        Boom.prototype.boom = function (caller, complete) {
            var _this = this;
            return new Promise(function (reslove) {
                vitamin.ticker.frame(_this, _this.updateRender);
                // this.white.visible = true;
                // this.white.alpha = 0;
                // egret.Tween.get(this.white).to({ alpha: 1 }, 1000);
                egret.Tween.removeTweens(_this);
                _this.targetScale = 1;
                egret.Tween.get(_this).to({ targetScale: 2 }, 800).call(function () {
                    vitamin.audio.playSound([game.Sound.Effect.boom, game.Sound.Effect.boom1, game.Sound.Effect.boom2].random());
                    vitamin.ticker.remove(_this, _this.updateRender);
                    complete && complete.call(caller, _this);
                    reslove();
                });
            });
        };
        Boom.prototype.updateRender = function () {
            // this.rotation = Math.sin(vitamin.ticker.curFrame * 0.7) * 15;
            this.scale((0.5 + Math.cos(vitamin.ticker.curFrame * 0.8) * 0.1) * this.targetScale);
        };
        return Boom;
    }(game.SceneObject));
    game.Boom = Boom;
    __reflect(Boom.prototype, "game.Boom");
})(game || (game = {}));
var game;
(function (game) {
    var Box = (function (_super) {
        __extends(Box, _super);
        function Box() {
            var _this = _super.call(this) || this;
            _this._back = new vitamin.Bitmap();
            _this.addChild(_this._back);
            _this._back.smoothing = false;
            _this._numeral = new game.Numeral();
            _this._numeral.addTo(_this);
            _this.touchEnabled = true;
            _this._front = new vitamin.Bitmap();
            _this.addChild(_this._front);
            _this._front.smoothing = false;
            _this._boomMark = new vitamin.Bitmap();
            _this.addChild(_this._boomMark);
            _this._boomMark.pivot(0.5);
            _this._boomMark.texture = game.Res.scene["boom4.png"];
            _this._boomMark.visible = false;
            _this._boomMark.smoothing = true;
            _this._remind = new vitamin.Bitmap();
            _this.addChild(_this._remind);
            return _this;
            // \t"@id": {"x":@x, "y":@y, "w":@w, "h":@h,"offX":@fx,"offY":@fy,"sourceW":@fw,"sourceH":@fh}@,\n
            // {\n"res": {\n@loop\n},\n"meta": {\n\t"image": "@TexName"}\n}
        }
        Box.prototype.initialize = function (node, style) {
            this._node = node;
            this._node.object = this;
            this._style = style;
            this._tile = game.Res.getStyleTexture(this._style.tile);
            this._back.texture = game.Res.getStyleTexture(this._style.floor);
            this._back.pivot(0.5);
            this._back.scale(32 / this._back.texture.textureWidth);
            this._front.alpha = 1;
            this._front.visible = true;
            this.addChild(this._front);
            this.addChild(this._remind);
            this._numeral.uninitialize();
            this._boomMark.visible = false;
            vitamin.Watcher.get(this._node, "state").watch(this, this.draw, { execOnce: true });
        };
        Box.prototype.uninitialize = function () {
            if (this._node) {
                vitamin.Watcher.get(this._node, "state").unwatch(this, this.draw);
                this._node = null;
            }
            // this.draw();
            this._boomMark.visible = false;
            egret.Tween.removeTweens(this._back);
            this._back.scale(1);
        };
        Box.prototype.setBoomMark = function (bool) {
            this._boomMark.visible = bool;
        };
        Box.prototype.shake = function () {
            this._back.scale(0.9);
            egret.Tween.get(this._back).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.bounceIn);
        };
        Box.prototype.draw = function () {
            switch (this._node.state) {
                case game.NodeState.NORMAL:
                    this._front.texture = this._tile;
                    break;
                case game.NodeState.FLAG:
                    this._front.texture = game.Res.getStyleTexture(this._style.tilemark);
                    ;
                    break;
                case game.NodeState.UNKNOW:
                    this._front.texture = game.Res.getStyleTexture(this._style.tilequestion);
                    break;
            }
            this._front.pivot(0.5);
            this._front.scale(32 / this._front.texture.textureWidth);
            this._front.y = 32 - (this._front.texture.textureHeight * this._front.scaleY);
        };
        Box.prototype.remind = function (yellow, delay) {
            var _this = this;
            if (yellow === void 0) { yellow = false; }
            if (delay === void 0) { delay = 0; }
            this._remind.texture = game.Res.getTexture(yellow ? "remind2" : "remind1");
            this._remind.pivot(0.5);
            this._remind.scale(32 / this._remind.texture.textureWidth);
            // this._remind.blendMode=egret.BlendMode.ADD;
            if (!delay) {
                vitamin.audio.playSound(game.Sound.Effect.piano8);
                this._remind.visible = true;
                this._remind.alpha = 1;
                egret.Tween.removeTweens(this._remind);
                egret.Tween.get(this._remind).to({ alpha: 0, visible: 0 }, 1000);
            }
            else {
                this._remind.visible = false;
                this._remind.alpha = 1;
                egret.Tween.removeTweens(this._remind);
                egret.Tween.get(this._remind).wait(delay).call(function () {
                    vitamin.audio.playSound(game.Sound.Effect.piano8);
                    _this._remind.visible = true;
                    egret.Tween.get(_this._remind).to({ alpha: 0, visible: 0 }, 1000);
                });
            }
        };
        Box.prototype.open = function () {
            if (this._node.isOpen)
                return false;
            this._node.isOpen = true;
            if (this._node.isBoom) {
                this._numeral.uninitialize();
            }
            else {
                var boomcount = this.node.getNeighborBoomCount();
                if (boomcount > 0) {
                    var style = boomcount - 1;
                    this._numeral.initialize();
                    this._numeral.type = style;
                    this._numeral.text = boomcount + '';
                    this._numeral.pos(-this._numeral.width / 2, -this._numeral.height / 2);
                }
            }
            this._front.visible = false;
            return true;
        };
        Box.prototype.mark = function () {
            this.node.mark();
            this.draw();
        };
        Object.defineProperty(Box.prototype, "node", {
            get: function () { return this._node; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Box.prototype, "isnumeralshowed", {
            get: function () {
                return !!this._numeral.value;
            },
            enumerable: true,
            configurable: true
        });
        return Box;
    }(game.SceneObject));
    game.Box = Box;
    __reflect(Box.prototype, "game.Box");
})(game || (game = {}));
var game;
(function (game) {
    var Card = (function (_super) {
        __extends(Card, _super);
        function Card() {
            return _super.call(this) || this;
        }
        Card.prototype.initialize = function (id) {
            this.texture = game.Res.getFguiTexture(id + '');
            this.pivot(0.5);
            this.scale(28 / this.texture.textureWidth);
            this.smoothing = true;
        };
        Card.prototype.uninitialize = function () {
            this.scale(1);
            this.texture = null;
        };
        return Card;
    }(vitamin.Bitmap));
    game.Card = Card;
    __reflect(Card.prototype, "game.Card", ["vitamin.IPool"]);
})(game || (game = {}));
var game;
(function (game) {
    var EffectLayer = (function (_super) {
        __extends(EffectLayer, _super);
        function EffectLayer(scale) {
            if (scale === void 0) { scale = 6; }
            var _this = _super.call(this, null, { threshold: 0.8, quality: 1 / scale }) || this;
            // this.scale(scale);
            _this.screenWidth = vitamin.stage.width / scale;
            _this.screenHeight = vitamin.stage.height / scale;
            _this.smoothing = false;
            return _this;
        }
        return EffectLayer;
    }(vitamin.RenderContainer));
    game.EffectLayer = EffectLayer;
    __reflect(EffectLayer.prototype, "game.EffectLayer");
})(game || (game = {}));
var game;
(function (game) {
    var FloorScene = (function (_super) {
        __extends(FloorScene, _super);
        function FloorScene() {
            var _this = _super.call(this) || this;
            _this._firstclick = false;
            _this._boxes = [];
            _this._booms = [];
            _this._boxpool = new vitamin.Pool('box', game.Box);
            _this._wall = new game.Wall();
            return _this;
        }
        Object.defineProperty(FloorScene.prototype, "boxes", {
            get: function () { return this._boxes; },
            enumerable: true,
            configurable: true
        });
        FloorScene.prototype.initialize = function (floorData) {
            var _this = this;
            this.floorData = floorData;
            this.initializeGrids(floorData.sigmentX, floorData.sigmentY, 32);
            this.initializeBadges();
            this.forEachNodes(function (node, index) {
                var box = _this._boxpool.from();
                box.initialize(node, floorData.style);
                box.addToScene(_this);
                _this._boxes.push(box);
            });
            this._wall.uninitialize();
            if (floorData.style.wall) {
                this._wall.initialize(floorData.style, this.width, this.height);
                this.highLayer.addChild(this._wall);
            }
            this._firstclick = false;
            this.resizeBoxes();
        };
        FloorScene.prototype.onUpdateScale = function () {
            _super.prototype.onUpdateScale.call(this);
            this.resizeBoxes();
        };
        FloorScene.prototype.resizeBoxes = function () {
            var startX = this._center.x - this.width / 2;
            var startY = this._center.y - this.height / 2;
            var halfBox = this.sigmentSize / 2;
            for (var _i = 0, _a = this._boxes; _i < _a.length; _i++) {
                var box = _a[_i];
                box.x = startX + box.node.a * this.sigmentSize + halfBox;
                box.y = startY + box.node.b * this.sigmentSize + halfBox;
            }
            if (this._wall.parent) {
                this._wall.x = this._boxes.first().x - this.sigmentSize / 2;
                this._wall.y = this._boxes.first().y - this.sigmentSize / 2;
            }
        };
        FloorScene.prototype.resetObjects = function () {
            for (var _i = 0, _a = this._boxes; _i < _a.length; _i++) {
                var box = _a[_i];
                box.alpha = 1;
                box.removeFromScene();
                this._boxpool.to(box, true);
            }
            this._boxes.length = 0;
            for (var _b = 0, _c = this._booms; _b < _c.length; _b++) {
                var boom = _c[_b];
                boom.removeFromScene();
                vitamin.ObjectPool.to(boom, true);
            }
            this._booms.length = 0;
            if (this._wall.parent) {
                this._wall.parent.removeChild(this._wall);
            }
        };
        FloorScene.prototype.tweenInBoxes = function (type) {
            var _this = this;
            if (type == undefined)
                type = vitamin.MathUtil.randRange(1, 3);
            // type = 1;
            var duration = 0;
            var i = 0;
            for (var _i = 0, _a = this._boxes; _i < _a.length; _i++) {
                var box = _a[_i];
                egret.Tween.removeTweens(box);
                // box.alpha = 0;
                var waitTime = void 0;
                switch (type) {
                    case 0:
                        waitTime = Math.random() * 500;
                        var tx = box.x;
                        var ty = box.y;
                        box.alpha = 0;
                        box.x = this.center.x;
                        box.y = this.center.y;
                        box.scale(0);
                        egret.Tween.get(box).wait(waitTime).to({ x: tx, y: ty, scaleX: 1, scaleY: 1, alpha: 1 }, 700, egret.Ease.circInOut);
                        break;
                    case 1:
                        waitTime = Math.random() * 1000;
                        var y = box.y;
                        box.y = box.y + vitamin.stage.height / 2;
                        box.scaleX = box.scaleY = 1;
                        egret.Tween.get(box).wait(waitTime).to({ y: y }, 500, egret.Ease.cubicOut);
                        break;
                    case 2:
                        waitTime = Math.abs(box.x);
                        box.scaleX = box.scaleY = 0;
                        egret.Tween.get(box).wait(waitTime).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.cubicOut);
                        break;
                    default:
                        waitTime = Math.abs(box.y);
                        box.scaleX = box.scaleY = 0;
                        egret.Tween.get(box).wait(waitTime).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.cubicOut);
                        break;
                }
                duration = Math.max(waitTime + 500, duration);
                i++;
            }
            return new Promise(function (reslove) {
                vitamin.timer.once(duration + 100, _this, reslove);
            });
        };
        FloorScene.prototype.tweenOutBoxes = function (type) {
            var _this = this;
            this._wall.tweenOut();
            if (type == undefined)
                type = vitamin.MathUtil.randRange(1, 2);
            var duration = 0;
            var i = 0;
            for (var _i = 0, _a = this._boxes; _i < _a.length; _i++) {
                var box = _a[_i];
                box.alpha = 1;
                var a1 = this.sigmentX - box.node.a;
                var b1 = this.sigmentY - box.node.b;
                var waitTime = (this._boxes.length - i) * 5;
                switch (type) {
                    case 0:
                        waitTime = Math.random() * 500;
                        var scale = 3;
                        var startX = this.center.x - this.width * scale / 2;
                        var startY = this.center.y - this.height * scale / 2;
                        var tx = startX + box.node.a * this.sigmentSize * scale;
                        var ty = startY + box.node.b * this.sigmentSize * scale;
                        egret.Tween.get(box).wait(waitTime).to({ x: tx, y: ty, scaleX: scale, scaleY: scale, alpha: 0 }, 1000, egret.Ease.circInOut);
                        break;
                    case 1:
                        waitTime = (Math.sqrt(a1 * a1 + b1 * b1)) * 60;
                        egret.Tween.get(box).wait(waitTime).to({ y: box.y + vitamin.stage.height }, 1000, egret.Ease.cubicIn);
                        break;
                    case 2:
                        waitTime = Math.random() * 1000;
                        egret.Tween.get(box).wait(waitTime).to({ y: box.y + vitamin.stage.height }, 1000, egret.Ease.cubicIn);
                        break;
                }
                duration = Math.max(waitTime + 1000, duration);
                i++;
            }
            return new Promise(function (reslove) {
                vitamin.timer.once(duration + 100, _this, reslove);
            });
        };
        FloorScene.prototype.showAllBooms = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, box, last, i;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _i = 0, _a = this._boxes;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            box = _a[_i];
                            if (!(box.node.isBoom && !box.node.isOpen)) return [3 /*break*/, 3];
                            box.open();
                            this.createBoom(box);
                            vitamin.audio.playSound(game.Sound.Effect.piano1);
                            return [4 /*yield*/, vitamin.wait(10)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [4 /*yield*/, vitamin.wait(100)];
                        case 5:
                            _b.sent();
                            last = this._booms.last();
                            for (i = 0; i < this._booms.length - 1; i++) {
                                this._booms[i].boom(this, this.onBoomOver);
                            }
                            return [4 /*yield*/, last.boom(this, this.onBoomOver)];
                        case 6:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        FloorScene.prototype.onBoomOver = function (boom) {
            var x = boom.x;
            var y = boom.y;
            boom.box.setBoomMark(true);
            this.removeBoom(boom);
            game.BoomEffect.exec(x, y, this);
        };
        FloorScene.prototype.initializeBooms = function (except) {
            var i = 0;
            while (i < this.floorData.boom) {
                var node = this.getRandomNode();
                if (node.isBoom || node.isOpen || node == except) {
                    continue;
                }
                if (vitamin.MathUtil.getDistance(node.a, node.b, except.a, except.b) < 2)
                    continue;
                node.isBoom = true;
                i++;
            }
        };
        FloorScene.prototype.initializeBadges = function () {
            var i = 0;
            while (i < this.floorData.badge) {
                var node = this.getRandomNode();
                if (node.isBoom || node.isOpen) {
                    continue;
                }
                node.badge = game.GameModel.collect.badges.random().random().id;
                i++;
            }
        };
        FloorScene.prototype.createBoom = function (box) {
            var boom = vitamin.ObjectPool.from(game.Boom);
            boom.addToScene(this);
            boom.initialize(box);
            boom.x = box.x;
            boom.y = box.y;
            this._booms.push(boom);
        };
        FloorScene.prototype.removeBoom = function (boom) {
            var index = this._booms.indexOf(boom);
            if (index >= 0)
                this._booms.splice(index, 1);
            boom.removeFromScene();
            vitamin.ObjectPool.to(boom, true);
        };
        FloorScene.prototype.createBadge = function (box) {
            return __awaiter(this, void 0, void 0, function () {
                var card;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            card = vitamin.ObjectPool.from(game.Card);
                            card.initialize(box.node.badge);
                            game.VCache.point = box.localToGlobal(0, 0, game.VCache.point);
                            card.pos(game.VCache.point.x, game.VCache.point.y);
                            vitamin.layer.top.addChild(card);
                            return [4 /*yield*/, vitamin.wait(500)];
                        case 1:
                            _a.sent();
                            game.VCache.point = vitamin.MathUtil.getLinePointByAngle(card.x, card.y, vitamin.MathUtil.randRange(200, 300), vitamin.MathUtil.randRange(30, -150), game.VCache.point);
                            egret.Tween.get(card).to({ scaleX: 1, scaleY: 1 }, 800, egret.Ease.circOut).call(function () {
                                egret.Tween.get(card).to({ scaleX: 0.1, scaleY: 0.1 }, 500, egret.Ease.circIn);
                            });
                            vitamin.TweenUtil.bezier(card, {
                                duration: 2000,
                                posprops: {
                                    x: game.VCache.cardsPosition.x,
                                    y: game.VCache.cardsPosition.y,
                                    controlX: game.VCache.point.x,
                                    controlY: game.VCache.point.y
                                },
                                ease: egret.Ease.cubicInOut,
                                caller: this,
                                complete: function () {
                                    game.GameModel.collect.addBadge(box.node.badge);
                                    vitamin.red.RedTree.refesh("collect");
                                    card.remove();
                                    vitamin.ObjectPool.to(card, true);
                                }
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        FloorScene.prototype.onOpen = function (box) {
            return __awaiter(this, void 0, void 0, function () {
                var i, _i, _a, neighbor;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (box.node.isOpen) {
                                if (box.isnumeralshowed) {
                                    box.remind(true, 150);
                                    i = 0;
                                    for (_i = 0, _a = box.node.neighbors; _i < _a.length; _i++) {
                                        neighbor = _a[_i];
                                        if (neighbor) {
                                            neighbor.object.remind(false, i++ * 30);
                                        }
                                    }
                                }
                                else {
                                    // this.shock(vitamin.MathUtil.randRange(1, 4), 3);
                                    this.shack();
                                    vitamin.audio.playSound(game.Sound.Effect.vaild);
                                }
                                return [2 /*return*/, box];
                            }
                            if (box.node.state != game.NodeState.NORMAL) {
                                this.shack();
                                vitamin.audio.playSound(game.Sound.Effect.vaild);
                                vitamin.ui.tip("\u5F53\u524D\u72B6\u6001\u4E0D\u80FD\u88AB\u6253\u5F00,\u4F60\u9700\u8981\u957F\u6309\u5F53\u524D\u4EE5\u5207\u6362\u72B6\u6001.", 0x663300);
                                return [2 /*return*/, null];
                            }
                            if (game.GameModel.setting.lightning)
                                game.LightningEffect.exec(box.x, box.y, this);
                            return [4 /*yield*/, vitamin.wait(200)];
                        case 1:
                            _b.sent();
                            // this.shock(vitamin.MathUtil.randRange(1, 5), 7);
                            this.shack();
                            game.BoomEffect.exec(box.x, box.y, this, 20, 80, 150, 500, 3);
                            if (!this._firstclick) {
                                this._firstclick = true;
                                this.initializeBooms(box.node);
                            }
                            vitamin.audio.playSound(game.Sound.Effect.lightning2, { volume: 0.4 });
                            return [4 /*yield*/, this.open([box])];
                        case 2: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        FloorScene.prototype.getNeighbors = function (box) {
            if (box.node.hasNeighborBoom())
                return [];
            var aroundBoxes = [];
            for (var _i = 0, _a = box.node.neighbors; _i < _a.length; _i++) {
                var neighbor = _a[_i];
                if (neighbor) {
                    if (!neighbor.isOpen && !neighbor.isBoom) {
                        aroundBoxes.push(neighbor.object);
                    }
                }
            }
            return aroundBoxes;
        };
        FloorScene.prototype.open = function (boxes) {
            return __awaiter(this, void 0, void 0, function () {
                var hasOpen, list, _i, boxes_1, box, results, _a, results_1, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            hasOpen = false;
                            list = [];
                            for (_i = 0, boxes_1 = boxes; _i < boxes_1.length; _i++) {
                                box = boxes_1[_i];
                                if (box.open()) {
                                    if (box.node.isBoom) {
                                        return [2 /*return*/, box];
                                    }
                                    if (box.node.badge) {
                                        this.createBadge(box);
                                    }
                                    results = this.getNeighbors(box);
                                    if (!results)
                                        continue;
                                    hasOpen = true;
                                    for (_a = 0, results_1 = results; _a < results_1.length; _a++) {
                                        result = results_1[_a];
                                        if (list.indexOf(result) < 0) {
                                            list.push(result);
                                        }
                                    }
                                }
                            }
                            if (hasOpen) {
                                vitamin.audio.playSound(game.Sound.pianos.random());
                            }
                            if (!list.length) return [3 /*break*/, 3];
                            return [4 /*yield*/, vitamin.wait(50)];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, this.open(list)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3: return [2 /*return*/, null];
                    }
                });
            });
        };
        FloorScene.prototype.onMark = function (box) {
            box.mark();
            switch (box.node.state) {
                case game.NodeState.NORMAL:
                    // this.shock(1, 4);
                    this.shack();
                    break;
                case game.NodeState.FLAG:
                    // this.shock(2, 8);
                    this.shack(0.4);
                    break;
                case game.NodeState.UNKNOW:
                    // this.shock(2, 6);
                    this.shack(0.3);
                    break;
            }
        };
        FloorScene.prototype.checkHasAvailabledNodes = function () {
            for (var _i = 0, _a = this._boxes; _i < _a.length; _i++) {
                var box = _a[_i];
                if (!box.node.isOpen && !box.node.isBoom) {
                    return true;
                }
            }
            return false;
        };
        return FloorScene;
    }(game.Scene));
    game.FloorScene = FloorScene;
    __reflect(FloorScene.prototype, "game.FloorScene");
})(game || (game = {}));
var game;
(function (game) {
    var KText = (function (_super) {
        __extends(KText, _super);
        function KText() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KText.prototype.onCreate = function () {
            this._rect = new egret.Rectangle(0, 0, 500, 600);
            this._text = new egret.TextField();
            this._text.width = this._rect.width;
            this._text.height = this._rect.height;
            this._text.multiline = true;
            this._text.wordWrap = false;
            this._text.textColor = 0xFFFFFF;
            this._text.fontFamily = "微软雅黑";
            this._text.size = 40;
            this._text.bold = true;
            this._text.textAlign = egret.HorizontalAlign.CENTER;
            this._text.verticalAlign = egret.VerticalAlign.MIDDLE;
            this._texture = new egret.RenderTexture();
            _super.prototype.onCreate.call(this);
            this._skin.anchor(this._rect.width / 2, this._rect.height / 2);
        };
        Object.defineProperty(KText.prototype, "text", {
            set: function (v) {
                this._text.text = v;
                this._texture.drawToTexture(this._text, this._rect);
                this.texture = this._texture;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KText.prototype, "color", {
            set: function (v) {
                this._text.textColor = v;
            },
            enumerable: true,
            configurable: true
        });
        return KText;
    }(game.KObject));
    game.KText = KText;
    __reflect(KText.prototype, "game.KText");
})(game || (game = {}));
var game;
(function (game) {
    var Numeral = (function () {
        function Numeral() {
            this._scale = 1;
            this.bitmaps = [];
            this._x = 0;
            this._y = 0;
            this._width = 0;
            this._height = 0;
            this._value = "";
        }
        /**
         * 文字类型
         * @param type 0-7
         */
        Numeral.prototype.initialize = function () {
            this._value = "";
        };
        Numeral.prototype.uninitialize = function () {
            this._x = 0;
            this._y = 0;
            this._width = 0;
            this._height = 0;
            for (var _i = 0, _a = this.bitmaps; _i < _a.length; _i++) {
                var bitmap = _a[_i];
                bitmap.remove();
                vitamin.ObjectPool.to(bitmap);
            }
            this.bitmaps.length = 0;
            this._value = "";
        };
        Numeral.prototype.addTo = function (parent) {
            this.parent = parent;
        };
        Numeral.prototype.remove = function () {
            for (var _i = 0, _a = this.bitmaps; _i < _a.length; _i++) {
                var bitmap = _a[_i];
                bitmap.remove();
            }
        };
        Numeral.prototype.scale = function (scale) {
            this._scale = scale;
        };
        Numeral.prototype.pos = function (x, y) {
            this._x = x;
            this._y = y;
            this.updatePos();
        };
        Object.defineProperty(Numeral.prototype, "type", {
            get: function () { return this._type; },
            set: function (v) {
                if (this._type != v) {
                    this._type = v;
                    this.update();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Numeral.prototype, "x", {
            get: function () { return this._x; },
            set: function (v) {
                if (this._x != v) {
                    this._x = v;
                    this.updatePos();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Numeral.prototype, "y", {
            get: function () { return this._y; },
            set: function (v) {
                if (this._y != v) {
                    this._y = v;
                    this.updatePos();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Numeral.prototype, "text", {
            set: function (v) {
                if (this._value != v) {
                    this._value = v;
                    this.update();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Numeral.prototype, "value", {
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Numeral.prototype, "width", {
            get: function () {
                return this._width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Numeral.prototype, "height", {
            get: function () {
                return this._height;
            },
            enumerable: true,
            configurable: true
        });
        Numeral.prototype.update = function () {
            if (!this.parent)
                return;
            var str = this._value + '';
            while (this.bitmaps.length > str.length) {
                var bitmap = this.bitmaps.pop();
                bitmap.remove();
                vitamin.ObjectPool.to(bitmap);
            }
            while (this.bitmaps.length < str.length) {
                var bitmap = vitamin.ObjectPool.from(vitamin.Bitmap);
                bitmap.smoothing = false;
                this.parent.addChild(bitmap);
                this.bitmaps.push(bitmap);
            }
            var scale = this._scale;
            var width = 0;
            var height = 0;
            for (var i = 0; i < str.length; i++) {
                var bitmap = this.bitmaps[i];
                bitmap.texture = game.Res.getNumeral(this._type, str.charAt(i));
                bitmap.scale(scale);
                width += bitmap.texture.textureWidth * scale;
                height = Math.max(height, bitmap.texture.textureHeight * scale);
            }
            this._width = width;
            this._height = height;
        };
        Numeral.prototype.updatePos = function () {
            var scale = this._scale;
            var startX = this._x;
            var startY = this._y;
            for (var i = 0; i < this.bitmaps.length; i++) {
                var bitmap = this.bitmaps[i];
                bitmap.pos(startX, startY);
                startX += bitmap.texture.textureWidth * scale;
            }
        };
        return Numeral;
    }());
    game.Numeral = Numeral;
    __reflect(Numeral.prototype, "game.Numeral", ["vitamin.IPool"]);
})(game || (game = {}));
var game;
(function (game) {
    var NodeState;
    (function (NodeState) {
        NodeState[NodeState["NORMAL"] = 0] = "NORMAL";
        NodeState[NodeState["FLAG"] = 1] = "FLAG";
        NodeState[NodeState["UNKNOW"] = 2] = "UNKNOW";
    })(NodeState = game.NodeState || (game.NodeState = {}));
    var SceneNode = (function () {
        function SceneNode() {
            this.neighbors = [];
        }
        SceneNode.prototype.initialize = function (a, b) {
            this.a = a;
            this.b = b;
            this.state = NodeState.NORMAL;
        };
        SceneNode.prototype.initializeNeighbors = function () {
            var nodes = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                nodes[_i] = arguments[_i];
            }
            this.neighbors.length = 0;
            (_a = this.neighbors).push.apply(_a, nodes);
            var _a;
        };
        SceneNode.prototype.uninitialize = function () {
            this.neighbors.length = 0;
            this.isBoom = false;
            this.isOpen = false;
            this.badge = 0;
            this.state = NodeState.NORMAL;
        };
        SceneNode.prototype.mark = function () {
            switch (this.state) {
                case NodeState.NORMAL:
                    this.state = NodeState.FLAG;
                    vitamin.audio.playSound(game.Sound.Effect.piano7);
                    break;
                case NodeState.FLAG:
                    this.state = NodeState.UNKNOW;
                    vitamin.audio.playSound(game.Sound.Effect.piano6);
                    break;
                case NodeState.UNKNOW:
                    this.state = NodeState.NORMAL;
                    vitamin.audio.playSound(game.Sound.Effect.piano8);
                    break;
            }
        };
        SceneNode.prototype.hasNeighborBoom = function () {
            for (var _i = 0, _a = this.neighbors; _i < _a.length; _i++) {
                var neighbor = _a[_i];
                if (neighbor && neighbor.isBoom) {
                    return true;
                }
            }
            return false;
        };
        SceneNode.prototype.getNeighborBoomCount = function () {
            var count = 0;
            for (var _i = 0, _a = this.neighbors; _i < _a.length; _i++) {
                var neighbor = _a[_i];
                if (neighbor) {
                    count += neighbor.isBoom ? 1 : 0;
                }
            }
            return count;
        };
        return SceneNode;
    }());
    game.SceneNode = SceneNode;
    __reflect(SceneNode.prototype, "game.SceneNode", ["vitamin.IPool"]);
})(game || (game = {}));
var game;
(function (game) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Game.prototype.onCreate = function () {
            this._scene = new game.FloorScene();
            vitamin.layer.scene.addChild(this._scene);
            this._background = new game.StarBackGround();
            vitamin.layer.scene.addChildAt(this._background, 0);
            this._control = new game.Control();
            this._control.onOpen = this.onOpen.bind(this);
            this._control.onMark = this.onMark.bind(this);
            this._iconTiming = new vitamin.Bitmap();
            vitamin.layer.scene.addChild(this._iconTiming);
            this._iconTiming.texture = game.Res.scene["timer.png"];
            this._iconTiming.pivot(0.5);
            this._iconTiming.scale(80 / this._iconTiming.texture.textureWidth);
            this._iconTiming.visible = false;
            // this._timing = new TimingCounter();
            // this.addChild(this._timing);
            // this._timing.visible = false;
        };
        Game.prototype.initialize = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this._background.initialize();
                    return [2 /*return*/];
                });
            });
        };
        Game.prototype.start = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.onRoundEnd(true, true)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Game.prototype.onRoundStart = function (sucess, isFirst) {
            return __awaiter(this, void 0, void 0, function () {
                var floorData, maginX, maginY, maxWidth, maxHeight, scale;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            vitamin.audio.playMusic(game.Sound.Music.bg1);
                            if (!sucess) return [3 /*break*/, 4];
                            if (!(game.GameModel.level.current.chapter != this._lastChapter)) return [3 /*break*/, 2];
                            this._background.addDynamicText("\uD83C\uDFCCChapter " + game.GameModel.level.current.chapter + "\uD83C\uDFCC\uFE0F\u200D\u2640\uFE0F", 0x8888ff);
                            return [4 /*yield*/, vitamin.wait(2000)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            this._background.addDynamicText("\uD83C\uDFC3Round " + game.GameModel.level.floor + "\uD83C\uDFC3\u200D\u2640\uFE0F", 0xffff88);
                            return [4 /*yield*/, vitamin.wait(2000)];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 7];
                        case 4:
                            this._background.addDynamicText("\uD83D\uDE2D" + game.Res.config.fail_words.random() + "\uD83D\uDE2D", 0xff8888);
                            return [4 /*yield*/, vitamin.wait(2000)];
                        case 5:
                            _a.sent();
                            this._background.addDynamicText("\uD83C\uDFCBRound " + game.GameModel.level.floor + "\uD83C\uDFCB\uFE0F\u200D\u2640\uFE0F", 0xff88ff);
                            return [4 /*yield*/, vitamin.wait(2000)];
                        case 6:
                            _a.sent();
                            _a.label = 7;
                        case 7:
                            if (game.GameModel.ads.checkIsVip()) {
                                this._background.addTunnelEffect();
                            }
                            floorData = game.GameModel.level.current;
                            if (!(floorData.chaos && !this._isTipChaos)) return [3 /*break*/, 9];
                            this._isTipChaos = true;
                            this._background.addDynamicText("\uD83C\uDFA0\u8FDB\u5165\u6DF7\u6C8C \n \u968F\u673A\u96F7\u9635\uD83C\uDFA0", 0xff88ff);
                            return [4 /*yield*/, vitamin.wait(2000)];
                        case 8:
                            _a.sent();
                            _a.label = 9;
                        case 9:
                            this._lastChapter = game.GameModel.level.current.chapter;
                            // var mx = 6 + ((Math.random() * 10) >> 0);
                            // var my = 6 + ((Math.random() * 10) >> 0);
                            // this.createBoxes(Math.min(mx, my), Math.max(mx, my), ((Math.max(mx, my) / 2) >> 0) + ((Math.random() * Math.max(mx, my)) >> 0));
                            this._scene.initialize(floorData);
                            maginX = 10;
                            maginY = 100;
                            maxWidth = vitamin.stage.width - maginX * 2;
                            maxHeight = vitamin.stage.height - maginY * 2;
                            scale = 2;
                            while (this._scene.width * scale > maxWidth || this._scene.height * scale > maxHeight) {
                                scale -= 0.1;
                            }
                            this._scene.scale(scale);
                            // this._scene.pos(vitamin.stage.width / 2 - this._scene.realWidth / 2, vitamin.stage.height / 2 - this._scene.realHeight / 2)
                            return [4 /*yield*/, this._scene.tweenInBoxes(sucess ? 0 : undefined)];
                        case 10:
                            // this._scene.pos(vitamin.stage.width / 2 - this._scene.realWidth / 2, vitamin.stage.height / 2 - this._scene.realHeight / 2)
                            _a.sent();
                            if (game.GameModel.level.floor == 1) {
                                vitamin.ui.open(game.GuideView);
                                vitamin.ui.onClose(game.GuideView, this, this.onRoundStart2, true);
                                return [2 /*return*/];
                            }
                            this.onRoundStart2();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Game.prototype.onRoundStart2 = function () {
            var _this = this;
            vitamin.audio.playSound(game.Sound.Effect.btn);
            this._iconTiming.visible = true;
            this._iconTiming.pos(vitamin.stage.width / 2, vitamin.stage.height / 2);
            this._iconTiming.scale(0);
            egret.Tween.get(this._iconTiming).to({ scaleX: 1.2, scaleY: 1.2 }, 500, egret.Ease.backOut).call(function () {
                egret.Tween.get(_this._iconTiming).wait(300).to({ x: vitamin.stage.width / 2, y: vitamin.stage.height - 80, scaleX: 0.3, scaleY: 0.3 }, 600, egret.Ease.cubicInOut).call(function () {
                    _this._iconTiming.visible = false;
                    _this._control.initialize(_this._scene.boxes);
                    game.GameModel.level.startFloor();
                });
            });
        };
        Game.prototype.onRoundEnd = function (sucess, isFirst) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            game.GameModel.level.stopFloor();
                            if (!isFirst && sucess) {
                                vitamin.effect.play(game.ColorBoom, 150).pos(vitamin.stage.width / 2, vitamin.stage.height / 2);
                            }
                            return [4 /*yield*/, this._scene.tweenOutBoxes(sucess ? 0 : undefined)];
                        case 1:
                            _a.sent();
                            this._control.uninitialize();
                            this._scene.resetObjects();
                            this._background.removeTunnelEffect();
                            if (!(!isFirst && sucess)) return [3 /*break*/, 3];
                            game.GameModel.level.nextFloor(game.GameModel.level.time);
                            this._background.addDynamicText("\uD83C\uDF89Success\uD83C\uDF89\n" + game.Res.config.success_words.random(), 0x88ff88);
                            return [4 /*yield*/, vitamin.wait(2000)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            if (!!isFirst) return [3 /*break*/, 8];
                            if (!!sucess) return [3 /*break*/, 5];
                            vitamin.ui.closeAll(vitamin.UIType.DIALOG);
                            vitamin.ui.closeAll(vitamin.UIType.ALERT);
                            return [4 /*yield*/, vitamin.ui.open(game.LossView)];
                        case 4:
                            _a.sent();
                            vitamin.ui.onClose(game.LossView, this, function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.onRoundStart(sucess)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, true);
                            return [3 /*break*/, 7];
                        case 5:
                            vitamin.ui.closeAll(vitamin.UIType.DIALOG);
                            vitamin.ui.closeAll(vitamin.UIType.ALERT);
                            return [4 /*yield*/, vitamin.ui.open(game.VectoryView)];
                        case 6:
                            _a.sent();
                            vitamin.ui.onClose(game.VectoryView, this, function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.onRoundStart(sucess)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, true);
                            _a.label = 7;
                        case 7: return [2 /*return*/];
                        case 8: return [4 /*yield*/, this.onRoundStart(sucess, isFirst)];
                        case 9:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Game.prototype.onOpen = function (box) {
            return __awaiter(this, void 0, void 0, function () {
                var resBox;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._scene.onOpen(box)];
                        case 1:
                            resBox = _a.sent();
                            if (!(resBox && resBox.node.isBoom)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.onGameFail(resBox)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                        case 3:
                            if (this.checksuccess()) {
                                this.onGameSucess();
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        Game.prototype.onMark = function (box) {
            this._scene.onMark(box);
        };
        Game.prototype.checksuccess = function () {
            return !this._scene.checkHasAvailabledNodes();
        };
        Game.prototype.onGameFail = function (box1) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._control.enabled = false;
                            this._scene.createBoom(box1);
                            return [4 /*yield*/, vitamin.wait(500)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this._scene.showAllBooms()];
                        case 2:
                            _a.sent();
                            game.LossDebugView.snapshot(this._scene, box1.x, box1.y);
                            vitamin.audio.playSound(game.Sound.Effect.fail1);
                            this.onRoundEnd(false);
                            return [2 /*return*/];
                    }
                });
            });
        };
        Game.prototype.onGameSucess = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._control.enabled = false;
                            game.LossDebugView.clearSnapshot();
                            vitamin.audio.playSound(game.Sound.Effect.sucess2);
                            return [4 /*yield*/, vitamin.wait(1000)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.onRoundEnd(true)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return Game;
    }(vitamin.GameBase));
    game.Game = Game;
    __reflect(Game.prototype, "game.Game");
})(game || (game = {}));
var game;
(function (game) {
    var StarBackGround = (function (_super) {
        __extends(StarBackGround, _super);
        function StarBackGround() {
            var _this = _super.call(this) || this;
            _this.pariticels = [];
            _this.speedScale = 1;
            _this.speed = 10;
            _this.scene = new k25d.Scene();
            _this.addChild(_this.scene);
            return _this;
        }
        StarBackGround.prototype.initialize = function () {
            // this.kscene.x = vitamin.stage.width / 2;
            // this.kscene.y = vitamin.stage.height / 2;
            // let total = 50;
            // while (total--) {
            //     this.createParticle();
            // }
            // vitamin.timer.loop(10, this, this.createParticle);
            this.particles = game.Res.rects;
            vitamin.ticker.frame(this, this.updateRender);
        };
        StarBackGround.prototype.uninitialize = function () {
            // vitamin.timer.clear(this, this.createParticle);
            vitamin.ticker.remove(this, this.updateRender);
        };
        StarBackGround.prototype.addToScene = function (object) {
            this.scene.add(object);
        };
        StarBackGround.prototype.removeFromScene = function (object) {
            this.scene.remove(object);
        };
        StarBackGround.prototype.createParticle = function () {
            var particel = vitamin.ObjectPool.from(StarParticel);
            this.scene.add(particel);
            var texture = this.particles.random();
            //RES.getRes("particel_json.rect_bg");
            particel.initialize(texture, 3);
            particel.x = vitamin.MathUtil.randRange(-1500, 1500);
            particel.y = vitamin.MathUtil.randRange(-1500, 1500);
            particel.z = 1000;
            this.pariticels.push(particel);
        };
        StarBackGround.prototype.updateRender = function () {
            var maxZ = 0;
            for (var i = 0; i < this.pariticels.length; i++) {
                var object = this.pariticels[i];
                object.z -= this.speed * this.speedScale;
                if (object.z < 0) {
                    this.pariticels.splice(i, 1);
                    this.scene.remove(object);
                    vitamin.ObjectPool.to(object, true);
                    i--;
                    continue;
                }
                maxZ = Math.max(object.z, maxZ);
            }
            if (maxZ < 980) {
                this.createParticle();
            }
        };
        StarBackGround.prototype.addTunnelEffect = function () {
            if (!this.tunnelEffect) {
                game.FlyingTunnel.sheet = game.Res.tunnel1;
                this.tunnelEffect = vitamin.effect.play(game.FlyingTunnel);
                this.tunnelEffect.blendMode = egret.BlendMode.ADD;
            }
            this.tunnelEffect.addTo(this, 1);
            this.tunnelEffect.pos(vitamin.stage.width / 2, vitamin.stage.height / 2);
            this.particles = game.Res.summers;
            egret.ticker.$startTick(this.renderEffect, this);
        };
        StarBackGround.prototype.removeTunnelEffect = function () {
            this.tunnelEffect && this.tunnelEffect.remove();
            this.particles = game.Res.rects;
            egret.ticker.$stopTick(this.renderEffect, this);
        };
        StarBackGround.prototype.renderEffect = function (t) {
            this.tunnelEffect.scaleX = Math.sin(egret.getTimer() / 2500) * 0.2 + 0.8;
            this.tunnelEffect.scaleY = Math.cos(egret.getTimer() / 1800) * 0.2 + 0.8;
            return true;
        };
        // onResize(w: number, h: number): void {
        //     this.setSize(w, h);
        //     if (this.tunnelEffect) {
        //         this.tunnelEffect.x = this.width / 2;
        //         this.tunnelEffect.y = this.height / 2;
        //     }
        // }
        StarBackGround.prototype.addDynamicText = function (text, color) {
            var _this = this;
            if (color === void 0) { color = 0xFFFFFF; }
            var tf = vitamin.ObjectPool.from(game.KText);
            tf.color = color;
            tf.text = text;
            this.addToScene(tf);
            tf.x = 0;
            tf.y = 0;
            tf.z = 1000;
            tf.start(this, function (tf) {
                _this.removeFromScene(tf);
                vitamin.ObjectPool.to(tf, true);
            });
            this.speedScale = 3;
            egret.Tween.get(this).to({ speedScale: 1 }, 2000);
            vitamin.audio.playSound(game.Sound.Effect.fly3);
        };
        return StarBackGround;
    }(egret.DisplayObjectContainer));
    game.StarBackGround = StarBackGround;
    __reflect(StarBackGround.prototype, "game.StarBackGround", ["vitamin.IPool"]);
    var StarParticel = (function (_super) {
        __extends(StarParticel, _super);
        function StarParticel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StarParticel.prototype.onCreate = function () {
            this._skin = new vitamin.Bitmap();
            this.addChild(this._skin);
            this._skin.smoothing = false;
            this._skin.pivot(0.5);
        };
        StarParticel.prototype.initialize = function (skin, scale) {
            if (scale === void 0) { scale = 1; }
            this._skin.texture = skin;
            this._skin.scale(scale);
        };
        StarParticel.prototype.uninitialize = function () {
        };
        StarParticel.prototype.onFogChange = function (amount, bgcolor) {
            this.alpha = (1 - amount);
        };
        return StarParticel;
    }(k25d.SceneObject));
    game.StarParticel = StarParticel;
    __reflect(StarParticel.prototype, "game.StarParticel", ["vitamin.IPool"]);
})(game || (game = {}));
var game;
(function (game) {
    var TimingCounter = (function (_super) {
        __extends(TimingCounter, _super);
        function TimingCounter() {
            var _this = _super.call(this) || this;
            _this._icon = new vitamin.Bitmap();
            _this.addChild(_this._icon);
            _this._icon.texture = game.Res.scene["timer.png"];
            _this._icon.pivot(0.5);
            _this._icon.scale(80 / _this._icon.texture.textureWidth);
            _this._label = new game.Numeral();
            _this._label.type = 0;
            _this._label.addTo(_this);
            _this._label.scale(4);
            // this._label.height = 80;
            // this._label.multiline = false;
            // this._label.wordWrap = false;
            // this._label.textColor = 0xFFFFFF;
            // this._label.fontFamily = "微软雅黑";
            // this._label.size = 80;
            // this._label.bold = true;
            // this._label.textAlign = egret.HorizontalAlign.LEFT;
            // this._label.verticalAlign = egret.VerticalAlign.TOP;
            // this._label.x = 40;
            // this._label.y = -30;
            // this._label.width = 432;
            _this.touchEnabled = false;
            _this.touchChildren = false;
            return _this;
        }
        TimingCounter.prototype.initialize = function () {
            this._label.initialize();
            this._label.x = 40;
        };
        TimingCounter.prototype.uninitialize = function () {
            this._label.uninitialize();
            this.stop();
        };
        TimingCounter.prototype.start = function () {
            this._second = 0;
            this.draw();
            vitamin.timer.loop(1000, this, this.updateRender);
            this._label.y = 200;
            egret.Tween.get(this._label).to({ y: -this._label.height / 2 }, 500, egret.Ease.circOut);
        };
        TimingCounter.prototype.stop = function () {
            egret.Tween.removeTweens(this._label);
            vitamin.timer.clear(this, this.updateRender);
        };
        TimingCounter.prototype.updateRender = function () {
            this._second++;
            this.draw();
        };
        TimingCounter.prototype.draw = function () {
            this._label.text = vitamin.DateUtil.formatTimeLeft(this._second, ":", true);
        };
        Object.defineProperty(TimingCounter.prototype, "second", {
            get: function () { return this._second; },
            enumerable: true,
            configurable: true
        });
        return TimingCounter;
    }(vitamin.Container));
    game.TimingCounter = TimingCounter;
    __reflect(TimingCounter.prototype, "game.TimingCounter");
})(game || (game = {}));
var game;
(function (game) {
    var Wall = (function (_super) {
        __extends(Wall, _super);
        function Wall() {
            var _this = _super.call(this) || this;
            _this.touchEnabled = false;
            _this.touchChildren = false;
            var top = _this._top = new egret.Bitmap();
            top.fillMode = egret.BitmapFillMode.REPEAT;
            _this.addChild(top);
            var bottom = _this._bottom = new egret.Bitmap();
            bottom.fillMode = egret.BitmapFillMode.REPEAT;
            _this.addChild(bottom);
            var left = _this._left = new egret.Bitmap();
            left.fillMode = egret.BitmapFillMode.REPEAT;
            _this.addChild(left);
            var right = _this._right = new egret.Bitmap();
            right.fillMode = egret.BitmapFillMode.REPEAT;
            _this.addChild(right);
            var topleft = _this._topleft = new egret.Bitmap();
            _this.addChild(topleft);
            var topright = _this._topright = new egret.Bitmap();
            _this.addChild(topright);
            var bottomleft = _this._bottomleft = new egret.Bitmap();
            _this.addChild(bottomleft);
            var bottomright = _this._bottomright = new egret.Bitmap();
            _this.addChild(bottomright);
            return _this;
        }
        Wall.prototype.initialize = function (style, width, height) {
            egret.Tween.removeTweens(this._top);
            egret.Tween.removeTweens(this._bottom);
            egret.Tween.removeTweens(this._left);
            egret.Tween.removeTweens(this._right);
            egret.Tween.removeTweens(this._topleft);
            egret.Tween.removeTweens(this._topright);
            egret.Tween.removeTweens(this._bottomleft);
            egret.Tween.removeTweens(this._bottomright);
            var top = this._top;
            this.addChild(top);
            top.texture = game.Res.getTexture(style.wall.top);
            top.width = 1;
            egret.Tween.get(top).to({ width: width }, 500);
            top.y = -top.texture.textureHeight;
            var bottom = this._bottom;
            this.addChild(bottom);
            bottom.texture = game.Res.getTexture(style.wall.bottom);
            bottom.width = 1;
            egret.Tween.get(bottom).to({ width: width }, 500);
            bottom.y = height - bottom.texture.textureHeight;
            var left = this._left;
            this.addChild(left);
            left.texture = game.Res.getTexture(style.wall.left);
            left.height = 1;
            egret.Tween.get(left).to({ height: height }, 500);
            left.x = -left.texture.textureWidth;
            var right = this._right;
            this.addChild(right);
            right.texture = game.Res.getTexture(style.wall.right);
            right.height = 1;
            egret.Tween.get(right).to({ height: height }, 500);
            right.x = width;
            var topleft = this._topleft;
            this.addChild(topleft);
            topleft.texture = game.Res.getTexture(style.wall.top_left);
            topleft.x = -topleft.texture.textureWidth;
            topleft.y = -topleft.texture.textureHeight;
            topleft.alpha = 0;
            egret.Tween.get(topleft).to({ alpha: 1 }, 500);
            var topright = this._topright;
            this.addChild(topright);
            topright.texture = game.Res.getTexture(style.wall.top_right);
            topright.x = width;
            topright.y = -topright.texture.textureHeight;
            topright.alpha = 0;
            egret.Tween.get(topright).to({ alpha: 1 }, 500);
            var bottomleft = this._bottomleft;
            this.addChild(bottomleft);
            bottomleft.texture = game.Res.getTexture(style.wall.bottom_left);
            bottomleft.x = -bottomleft.texture.textureWidth;
            bottomleft.y = height - bottomleft.texture.textureHeight;
            bottomleft.alpha = 0;
            egret.Tween.get(bottomleft).to({ alpha: 1 }, 500);
            var bottomright = this._bottomright;
            this.addChild(bottomright);
            bottomright.texture = game.Res.getTexture(style.wall.bottom_right);
            bottomright.x = width;
            bottomright.y = height - bottomleft.texture.textureHeight;
            bottomright.alpha = 0;
            egret.Tween.get(bottomright).to({ alpha: 1 }, 500);
        };
        Wall.prototype.uninitialize = function () {
            egret.Tween.removeTweens(this._top);
            egret.Tween.removeTweens(this._bottom);
            egret.Tween.removeTweens(this._left);
            egret.Tween.removeTweens(this._right);
            egret.Tween.removeTweens(this._topleft);
            egret.Tween.removeTweens(this._topright);
            egret.Tween.removeTweens(this._bottomleft);
            egret.Tween.removeTweens(this._bottomright);
            this.removeChildren();
        };
        Wall.prototype.tweenOut = function () {
            var _this = this;
            return new Promise(function (reslove) {
                egret.Tween.removeTweens(_this._top);
                egret.Tween.removeTweens(_this._bottom);
                egret.Tween.removeTweens(_this._left);
                egret.Tween.removeTweens(_this._right);
                egret.Tween.removeTweens(_this._topleft);
                egret.Tween.removeTweens(_this._topright);
                egret.Tween.removeTweens(_this._bottomleft);
                egret.Tween.removeTweens(_this._bottomright);
                egret.Tween.get(_this._top).to({ width: 1 }, 500);
                egret.Tween.get(_this._bottom).to({ width: 1 }, 500);
                egret.Tween.get(_this._left).to({ height: 1 }, 500);
                egret.Tween.get(_this._right).to({ height: 1 }, 500);
                egret.Tween.get(_this._topleft).to({ alpha: 0 }, 500);
                egret.Tween.get(_this._topright).to({ alpha: 0 }, 500);
                egret.Tween.get(_this._bottomleft).to({ alpha: 0 }, 500);
                egret.Tween.get(_this._bottomright).to({ alpha: 0 }, 500).call(reslove);
            });
        };
        return Wall;
    }(egret.DisplayObjectContainer));
    game.Wall = Wall;
    __reflect(Wall.prototype, "game.Wall", ["vitamin.IPool"]);
})(game || (game = {}));
var game;
(function (game) {
    var VCache = (function () {
        function VCache() {
        }
        VCache.cardsPosition = new egret.Point();
        VCache.point = new egret.Point();
        return VCache;
    }());
    game.VCache = VCache;
    __reflect(VCache.prototype, "game.VCache");
})(game || (game = {}));
var game;
(function (game) {
    var GameModel = (function () {
        function GameModel() {
        }
        __decorate([
            vitamin.model(game.ModelLevel)
        ], GameModel, "level", void 0);
        __decorate([
            vitamin.model(game.ModelCollect)
        ], GameModel, "collect", void 0);
        __decorate([
            vitamin.model(game.ModelSetting)
        ], GameModel, "setting", void 0);
        __decorate([
            vitamin.model(game.ModelRank)
        ], GameModel, "rank", void 0);
        __decorate([
            vitamin.model(game.ModelAds)
        ], GameModel, "ads", void 0);
        GameModel = __decorate([
            vitamin.ModelMap()
        ], GameModel);
        return GameModel;
    }());
    game.GameModel = GameModel;
    __reflect(GameModel.prototype, "game.GameModel");
})(game || (game = {}));
var game;
(function (game) {
    var Res = (function () {
        function Res() {
        }
        Res.load = function (prgress) {
            return __awaiter(this, void 0, void 0, function () {
                var loaded, queuelength, _a, lightning_json, lightning_png, lightning_map, _b, lightning_jsonb, lightning_pngb, _c, lightning_jsonc, lightning_pngc, _d, lightning_jsond, lightning_pngd, _e, scene_json, scene_png, tunnel1, i, i, name_2, i, name_3, i, a, i, styles, defaultStyle, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            loaded = 0;
                            queuelength = 7;
                            if (prgress)
                                prgress(loaded, queuelength);
                            this.lightnings = [];
                            return [4 /*yield*/, this.loadSpriteSheet("texture/lightning")];
                        case 1:
                            _a = _g.sent(), lightning_json = _a[0], lightning_png = _a[1];
                            lightning_map = new vitamin.SpriteSheet(lightning_png).parseToMap(lightning_json.res);
                            this.lightnings.push(vitamin.ArrayUtil.map(function (i) {
                                var name = vitamin.StringUtil.fill("frame_0000", i + "", true) + ".png";
                                return lightning_map[name];
                            }, 13));
                            this.lightnings.push(vitamin.ArrayUtil.map(function (i) {
                                var name = vitamin.StringUtil.fill("frame_0000", i + "", true) + ".png";
                                return lightning_map[name];
                            }, 45, 13));
                            if (prgress)
                                prgress(++loaded, queuelength);
                            return [4 /*yield*/, this.loadSpriteSheet("texture/bsp")];
                        case 2:
                            _b = _g.sent(), lightning_jsonb = _b[0], lightning_pngb = _b[1];
                            this.lightnings.push(new vitamin.SpriteSheet(lightning_pngb).parseToList(lightning_jsonb.res));
                            if (prgress)
                                prgress(++loaded, queuelength);
                            return [4 /*yield*/, this.loadSpriteSheet("texture/csp")];
                        case 3:
                            _c = _g.sent(), lightning_jsonc = _c[0], lightning_pngc = _c[1];
                            lightning_map = new vitamin.SpriteSheet(lightning_pngc).parseToMap(lightning_jsonc.res);
                            this.lightnings.push(vitamin.ArrayUtil.map(function (i) { return lightning_map["frame" + i + ".png"]; }, 8, 1));
                            this.lightnings.push(vitamin.ArrayUtil.map(function (i) { return lightning_map["frame" + i + ".png"]; }, 24, 8));
                            if (prgress)
                                prgress(++loaded, queuelength);
                            return [4 /*yield*/, this.loadSpriteSheet("texture/dsp")];
                        case 4:
                            _d = _g.sent(), lightning_jsond = _d[0], lightning_pngd = _d[1];
                            this.lightnings.push(new vitamin.SpriteSheet(lightning_pngd).parseToList(lightning_jsond.res));
                            if (prgress)
                                prgress(++loaded, queuelength);
                            return [4 /*yield*/, this.loadSpriteSheet("texture/scene")];
                        case 5:
                            _e = _g.sent(), scene_json = _e[0], scene_png = _e[1];
                            if (prgress)
                                prgress(++loaded, queuelength);
                            this.scene = new vitamin.SpriteSheet(scene_png).parseToMap(scene_json.res);
                            return [4 /*yield*/, vitamin.res.loadRes("resource/texture/tunel1.png", vitamin.TypeRes.IMAGE)];
                        case 6:
                            tunnel1 = _g.sent();
                            this.tunnel1 = new egret.SpriteSheet(tunnel1);
                            for (i = 0; i < 7; i++)
                                this.tunnel1.createTexture(i + '', 0, 18 * i, tunnel1.textureWidth, 18);
                            // let boom_json = await vitamin.res.loadRes(`resource/animate/boom.json`, vitamin.TypeRes.JSON);
                            // let boom_png = await vitamin.res.loadRes(`resource/animate/boom.png`, vitamin.TypeRes.IMAGE);
                            // let boom_sheet:vitamin.SpriteSheet = new vitamin.SpriteSheet(boom_png);
                            // this.boomframes =[];
                            // for (let k in boom_json.frames) {
                            //     let frame = boom_json.frames[k].frame;
                            //     this.boomframes.push(boom_sheet.createTexture(k,frame.x,frame.y,frame.w,frame.h));
                            // }
                            this.rects = [];
                            for (i = 1; i <= 7; i++) {
                                name_2 = "rect" + i + ".png";
                                this.rects.push(this.scene[name_2]);
                            }
                            this.summers = [];
                            for (i = 2; i <= 5; i++) {
                                name_3 = "summer" + i + ".png";
                                this.summers.push(this.scene[name_3]);
                            }
                            this.light = this.scene["light.png"];
                            this.numerals = [];
                            this.numerals[0] = [];
                            for (i = 0; i <= 10; i++) {
                                this.numerals[0][i] = this.scene["n_" + i + ".png"];
                            }
                            for (a = 1; a <= 7; a++) {
                                this.numerals[a] = [];
                                for (i = 0; i <= 10; i++) {
                                    this.numerals[a][i] = this.scene["n" + a + "_" + i + ".png"];
                                }
                            }
                            this.pieceResnames = [this.scene['piece_blue.png'], this.scene['piece_green.png'], this.scene['piece_red.png'], this.scene['piece_yellow.png']];
                            this.leafResnames = [this.scene['leaf0001.png'], this.scene['leaf0002.png'], this.scene['leaf0003.png'], this.scene['leaf0004.png']];
                            if (prgress)
                                prgress(++loaded, queuelength);
                            return [4 /*yield*/, this.loadJson("styles.json")];
                        case 7:
                            styles = _g.sent();
                            defaultStyle = styles.shift();
                            this.styles = styles.map(function (v) { return Object.assign({}, defaultStyle, v); });
                            if (prgress)
                                prgress(++loaded, queuelength);
                            _f = this;
                            return [4 /*yield*/, this.loadJson("config.json")];
                        case 8:
                            _f.config = _g.sent();
                            if (prgress)
                                prgress(++loaded, queuelength);
                            return [2 /*return*/];
                    }
                });
            });
        };
        Res.loadSpriteSheet = function (name) {
            return __awaiter(this, void 0, void 0, function () {
                var png, json;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, vitamin.res.loadRes("resource/" + name + ".png", vitamin.TypeRes.IMAGE)];
                        case 1:
                            png = _a.sent();
                            return [4 /*yield*/, vitamin.res.loadRes("resource/" + name + ".json", vitamin.TypeRes.JSON)];
                        case 2:
                            json = _a.sent();
                            return [2 /*return*/, [json, png]];
                    }
                });
            });
        };
        Res.loadJson = function (name) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, vitamin.res.loadRes("resource/data/" + name, vitamin.TypeRes.JSON)];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        Res.getTexture = function (name) {
            return this.scene[name + ".png"];
        };
        Res.getFguiTexture = function (name) {
            return fgui.UIPackage.getByName("game").getItemAssetByName(name);
        };
        Res.getStyleTexture = function (name) {
            return this.scene[(Array.isArray(name) ? name.random() : name) + ".png"];
        };
        Res.getNumeral = function (type, char) {
            if (type >= 0 && type < this.numerals.length) {
                var textures = this.numerals[type];
                switch (char) {
                    case ":":
                        return textures[10];
                    default:
                        return textures[parseInt(char)];
                }
            }
            return null;
        };
        return Res;
    }());
    game.Res = Res;
    __reflect(Res.prototype, "game.Res");
})(game || (game = {}));
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.runGame();
        return _this;
    }
    Main.prototype.loadBackground = function () {
        var _this = this;
        return new Promise(function (reslove) {
            RES.getResByUrl("resource/texture/black.png", function (texture) {
                _this._background = new egret.Bitmap(texture);
                egret.lifecycle.stage.addChild(_this._background);
                _this._background.width = egret.lifecycle.stage.stageWidth;
                _this._background.height = egret.lifecycle.stage.stageHeight;
                reslove();
            }, _this, RES.ResourceItem.TYPE_IMAGE);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var loading, systemInfo, gameTip, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        egret.ImageLoader.crossOrigin = "anonymous";
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.loadBackground()];
                    case 3:
                        _b.sent();
                        vitamin.initializePlatform((_a = {},
                            _a[vitamin.TypePlatform.WXGAME] = {},
                            _a[vitamin.TypePlatform.BYTEDANCE] = {
                                appId: "tt1a336c8e8500941402",
                                ads: {
                                    videoId: "f73cebdg4jbh6chkd2",
                                    multitonVideoId: "54khcg6l3jl77gm143",
                                    interstitialId: "799q3in2mir2knkf13"
                                }
                            },
                            _a));
                        vitamin.initialize(this.stage, {
                            appName: "game.kevin.cleanboom",
                            storage: vitamin.platform
                        }, {
                            dragonbone: false,
                            data: false,
                            opencontext: true
                        });
                        vitamin.ui.initialize(this.stage, "game");
                        vitamin.ui.initializeMessageBox({
                            bar: fgui.UIPackage.getByName("game").getItemAssetByName("progress_7"),
                            scale9Grid: new egret.Rectangle(15, 15, 4, 4),
                            textColor: 0x0,
                            strokeColor: 0x222222
                        });
                        vitamin.stage.onResize(this, function (w, h) {
                            _this._background.width = w;
                            _this._background.height = h;
                        }, true);
                        vitamin.audio.setFairyGuiButtonSound(game.Sound.Effect.piano1);
                        loading = window.loading;
                        loading && loading.color(0xff9900);
                        return [4 /*yield*/, vitamin.audio.load(game.Sound.Effect, "resource/sounds/", egret.Sound.EFFECT, function (loaded, total) { return loading && loading.progress(loaded / total * 0.3); })];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, vitamin.audio.load(game.Sound.Music, "resource/sounds/", egret.Sound.MUSIC, function (loaded, total) { return loading && loading.progress(0.3 + loaded / total * 0.2); })];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, game.Res.load(function (loaded, total) { return loading && loading.progress(0.5 + loaded / total * 0.5); })];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, vitamin.data.initialize()];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, vitamin.platform.login()];
                    case 8:
                        _b.sent();
                        if (!(vitamin.platform instanceof vitamin.PWXGame)) return [3 /*break*/, 10];
                        systemInfo = wx.getSystemInfoSync();
                        return [4 /*yield*/, vitamin.platform.getUserData({ checkSetting: false }, {
                                width: 100,
                                height: 50,
                                x: systemInfo.windowWidth / 2 - 50,
                                y: systemInfo.windowHeight / 2 - 25
                            })];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10:
                        loading && loading.remove();
                        gameTip = new game.WordsBitmap();
                        vitamin.layer.top.addChild(gameTip);
                        gameTip.initialize("\u62B5\u5236\u4E0D\u826F\u6E38\u620F\uFF0C\u62D2\u7EDD\u76D7\u7248\u6E38\u620F\u3002\n\u6CE8\u610F\u81EA\u6211\u4FDD\u62A4\uFF0C\u8C28\u9632\u53D7\u9A97\u4E0A\u5F53\u3002\n\u9002\u5EA6\u6E38\u620F\u76CA\u8111\uFF0C\u6C89\u8FF7\u6E38\u620F\u4F24\u8EAB\u3002\n\u5408\u7406\u5B89\u6392\u65F6\u95F4\uFF0C\u4EAB\u53D7\u5065\u5EB7\u751F\u6D3B\u3002", 5, 10);
                        gameTip.x = vitamin.stage.width / 2 - gameTip.width / 2;
                        gameTip.y = vitamin.stage.height / 2 - gameTip.height / 2;
                        gameTip.start(500);
                        vitamin.game.enter(game.Game);
                        vitamin.timer.once(2000, this, function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, gameTip.stop(500)];
                                    case 1:
                                        _a.sent();
                                        gameTip.remove();
                                        vitamin.game.current.start();
                                        vitamin.ui.open(game.MainView);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
var game;
(function (game) {
    game.Sound = {
        pianos: ["1.mp3",
            "2.mp3",
            "3.mp3",
            "4.mp3",
            "5.mp3",
            "6.mp3",
            "7.mp3",
            "8.mp3"],
        Effect: {
            piano1: "1.mp3",
            piano2: "2.mp3",
            piano3: "3.mp3",
            piano4: "4.mp3",
            piano5: "5.mp3",
            piano6: "6.mp3",
            piano7: "7.mp3",
            piano8: "8.mp3",
            boom: "boom.mp3",
            boom1: "boom1.mp3",
            boom2: "boom2.mp3",
            lightning1: "lightning1.mp3",
            lightning2: "lightning2.mp3",
            fail1: "fail.mp3",
            fail2: "fail2.mp3",
            sucess1: "sucess1.mp3",
            sucess2: "sucess2.mp3",
            fly1: "fly1.mp3",
            fly2: "fly2.mp3",
            fly3: "fly3.mp3",
            btn: "btn.mp3",
            vaild: "vaild.mp3",
            bubble1: "b1.mp3",
            bubble2: "b2.mp3",
            bubble3: "b3.mp3"
        },
        Music: {
            bg1: "bg1.mp3"
        }
    };
})(game || (game = {}));
var game;
(function (game) {
    var Control = (function () {
        function Control() {
            this._resultPoint = new egret.Point();
        }
        Control.prototype.initialize = function (boxes) {
            this._boxes = boxes;
            for (var _i = 0, boxes_2 = boxes; _i < boxes_2.length; _i++) {
                var box = boxes_2[_i];
                box.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
            }
            this.enabled = true;
        };
        Control.prototype.uninitialize = function () {
            this.enabled = false;
            vitamin.stage.off(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
            vitamin.stage.off(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
            if (this._boxes) {
                for (var _i = 0, _a = this._boxes; _i < _a.length; _i++) {
                    var box = _a[_i];
                    box.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
                }
            }
        };
        Control.prototype.touchHandler = function (e) {
            if (!this.enabled)
                return;
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this._curBox = e.currentTarget;
                    this._touchX = e.stageX;
                    this._touchY = e.stageY;
                    this._touchTime = egret.getTimer();
                    this._curBox.parent.addChild(this._curBox);
                    vitamin.stage.on(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                    vitamin.stage.on(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
                    this._markTimeId = egret.setTimeout(this.mark, this, 400);
                    break;
                case egret.TouchEvent.TOUCH_END:
                    if (this._markTimeId) {
                        egret.clearTimeout(this._markTimeId);
                        this._markTimeId = 0;
                    }
                    if (this._curBox) {
                        if (egret.getTimer() - this._touchTime < 200) {
                            this.open();
                        }
                        // var length: number = utils.MathUtil.getDistance(this._curBox.a * (this._size + this._space), this._curBox.b * (this._size + this._space), this._curBox.x, this._curBox.y);
                        // if (length >= 5) {
                        //     this._curBox.mark();
                        //     egret.Tween.get(this._curBox).to({ x: this._curBox.a * (this._size + this._space), y: this._curBox.b * (this._size + this._space) }, 300, egret.Ease.elasticOut);
                        // } else if (length <= 2) {
                        //     if (this._isFirst) {
                        //         this._isFirst = false;
                        //         this.pushBoom(this._curBox);
                        //     }
                        //     if (this._curBox.isBoom) {
                        //         this._curBox.open();
                        //         console.error('Boom!!');
                        //         return;
                        //     }
                        //     this.openHandler([this._curBox]);
                        // } else {
                        //     egret.Tween.get(this._curBox).to({ x: this._curBox.a * (this._size + this._space), y: this._curBox.b * (this._size + this._space) }, 300, egret.Ease.circOut);
                        // }
                        this._curBox = null;
                    }
                    vitamin.stage.off(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                    vitamin.stage.off(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
                    break;
            }
        };
        Control.prototype.open = function () {
            if (this.onOpen)
                this.onOpen(this._curBox);
        };
        Control.prototype.mark = function () {
            if (this.onMark)
                this.onMark(this._curBox);
        };
        return Control;
    }());
    game.Control = Control;
    __reflect(Control.prototype, "game.Control");
})(game || (game = {}));
var game;
(function (game) {
    var BoomEffect = (function (_super) {
        __extends(BoomEffect, _super);
        function BoomEffect() {
            var _this = _super.call(this) || this;
            _this._circel = new vitamin.Bitmap();
            _this._circel.smoothing = false;
            return _this;
        }
        BoomEffect.exec = function (x, y, scene, totalParticle, minDistacne, maxDistance, duration, delayOffset) {
            if (totalParticle === void 0) { totalParticle = 30; }
            if (minDistacne === void 0) { minDistacne = 300; }
            if (maxDistance === void 0) { maxDistance = 500; }
            if (duration === void 0) { duration = 1500; }
            if (delayOffset === void 0) { delayOffset = 50; }
            var effect = vitamin.ObjectPool.from(BoomEffect);
            scene.effectLayer.addChild(effect);
            effect.pos(x, y);
            effect.initialize({ showCircel: true, showRect: true, totalParticle: totalParticle, minDistacne: minDistacne, maxDistance: maxDistance, duration: duration, delayOffset: delayOffset });
        };
        BoomEffect.prototype.initialize = function (options) {
            var _this = this;
            var showCircel = (options && options.showCircel != undefined) ? options.showCircel : true;
            var showRect = (options && options.showRect != undefined) ? options.showRect : true;
            var maxduration = 0;
            if (showCircel) {
                this._circel.texture = game.Res.light;
                this._circel.pivot(0.5);
                //这里会造成合批中断 权衡利弊后还是加上效果好点
                // this._circel.blendMode = egret.BlendMode.ADD;
                this.addChild(this._circel);
                var targetScale = 0;
                this._circel.scale(3);
                this._circel.alpha = 1;
                var duration = 200;
                maxduration += duration;
                egret.Tween.get(this._circel).to({ scaleX: targetScale, scaleY: targetScale, alpha: 0 }, duration).call(function () {
                    _this._circel.remove();
                });
            }
            if (showRect) {
                var totalParticle = (options && options.totalParticle != undefined) ? options.totalParticle : 20;
                var minDistacne = (options && options.minDistacne != undefined) ? options.minDistacne : 300;
                var maxDistance = (options && options.maxDistance != undefined) ? options.maxDistance : 500;
                var duration = (options && options.duration != undefined) ? options.duration : 1500;
                var delayOffset = (options && options.delayOffset != undefined) ? options.delayOffset : 50;
                for (var i = 0; i < totalParticle; i++) {
                    var rect = vitamin.ObjectPool.from(vitamin.Bitmap);
                    rect.visible = true;
                    rect.smoothing = false;
                    rect.texture = game.Res.rects.random();
                    rect.scale(vitamin.MathUtil.randRangeFloat(1, 2));
                    rect.alpha = 1;
                    this.addChild(rect);
                    var length_1 = vitamin.MathUtil.randRange(minDistacne, maxDistance);
                    var angle = vitamin.MathUtil.randRange(0, 360);
                    rect.rotation = angle;
                    this.cache = vitamin.MathUtil.getLinePointByAngle(0, 0, length_1, angle, this.cache);
                    // let rectduration = length * 1.6 + i * 50;
                    var rectduration = duration + i * delayOffset;
                    maxduration = Math.max(rectduration, maxduration);
                    egret.Tween.get(rect).to({ scaleX: 0, scaleY: 0, x: this.cache.x, y: this.cache.y }, rectduration).call(function (rect1) {
                        rect1.remove();
                        vitamin.ObjectPool.to(rect1, true);
                    }, this, [rect]);
                }
            }
            vitamin.timer.once(maxduration + 100, this, function () {
                _this.remove();
                vitamin.ObjectPool.to(_this, true);
            });
        };
        BoomEffect.prototype.uninitialize = function () {
            this.alpha = 1;
            this.rotation = 0;
            this.scale(1);
        };
        return BoomEffect;
    }(vitamin.Container));
    game.BoomEffect = BoomEffect;
    __reflect(BoomEffect.prototype, "game.BoomEffect", ["vitamin.IPool"]);
})(game || (game = {}));
var game;
(function (game) {
    var PokerUtil = (function () {
        function PokerUtil() {
        }
        /**
         * 检查牌型
         * @param pattern
         * @param pokers
         * @returns
         */
        PokerUtil.checkPokerDone = function (pattern, pokers) {
            var availables = pokers.filter(function (v) {
                return v.value != undefined && v.flower != undefined;
            });
            if (availables.length < 5) {
                return false;
            }
            switch (pattern) {
                case game.TypePokerPattern.QUEUE:
                    {
                        pokers = pokers.concat();
                        pokers.sort(function (a, b) { return a.value > b.value ? 1 : -1; });
                        if (!this.checkPokerQueue(pokers)) {
                            if (pokers[0].value == 1) {
                                if (pokers[1].value == 10) {
                                    pokers.push({ value: 14, flower: pokers[0].flower });
                                    pokers.shift();
                                    return this.checkPokerQueue(pokers);
                                }
                            }
                            return false;
                        }
                        return true;
                    }
                    break;
                case game.TypePokerPattern.TWOTWINS: return this.checkPokerTwins(pokers, 2, 2);
                case game.TypePokerPattern.THREE: return this.checkPokerTwins(pokers, 3, 1);
                case game.TypePokerPattern.SAMEFLOWER: return this.checkPokerSameFlower(pokers);
            }
        };
        PokerUtil.checkPokerQueue = function (pokers) {
            var poker1 = pokers[0];
            var poker2 = pokers[1];
            if (poker1.value == undefined)
                return false;
            if (poker2.value == undefined)
                return false;
            var offset = poker2.value - poker1.value;
            if (Math.abs(offset) != 1)
                return false;
            var start = 1;
            var end = pokers.length - 1;
            for (var i = start; i < end; i++) {
                poker1 = pokers[i];
                poker2 = pokers[i + 1];
                if (poker1.value == undefined)
                    return false;
                if (poker2.value == undefined)
                    return false;
                var offset2 = poker2.value - poker1.value;
                if (Math.abs(offset2) != 1)
                    return false;
                if (offset2 != offset)
                    return false;
            }
            return true;
        };
        PokerUtil.checkPokerTwins = function (pokers, twinCount, maxCount) {
            var map = {};
            for (var _i = 0, pokers_1 = pokers; _i < pokers_1.length; _i++) {
                var poker = pokers_1[_i];
                if (poker.value == undefined)
                    return false;
                if (map[poker.value] == undefined) {
                    map[poker.value] = 1;
                    continue;
                }
                map[poker.value]++;
            }
            var count = 0;
            for (var k in map) {
                if (map[k] >= twinCount) {
                    count++;
                }
            }
            return count >= maxCount;
        };
        PokerUtil.checkPokerSameFlower = function (pokers) {
            var poker1 = pokers[0];
            if (poker1.value == undefined)
                return false;
            var start = 1;
            var end = pokers.length;
            for (var i = start; i < end; i++) {
                var poker2 = pokers[i];
                if (poker2.value == undefined)
                    return false;
                if (poker2.flower != poker1.flower) {
                    return false;
                }
            }
            return true;
        };
        ///////////////////
        PokerUtil.getFlower = function () {
            var excepts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                excepts[_i] = arguments[_i];
            }
            while (true) {
                var flower = ((Math.random() * 4) >> 0) + 1;
                if (excepts.indexOf(flower) == -1) {
                    return flower;
                }
            }
        };
        PokerUtil.getPoker = function () {
            var excepts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                excepts[_i] = arguments[_i];
            }
            var _loop_1 = function () {
                var cur = { value: ((Math.random() * 13) >> 0) + 1, flower: ((Math.random() * 4) >> 0) + 1 };
                if (excepts.findIndex(function (v) { return v.value == cur.value && v.flower == cur.flower; }) == -1) {
                    return { value: cur };
                }
            };
            while (true) {
                var state_1 = _loop_1();
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        };
        PokerUtil.getPokerUseFlowers = function (exceptPokers, exceptFlowers) {
            var _loop_2 = function () {
                var cur = { value: ((Math.random() * 13) >> 0) + 1, flower: exceptFlowers.random() };
                if (exceptPokers.findIndex(function (v) { return v.value == cur.value && v.flower == cur.flower; }) == -1) {
                    return { value: cur };
                }
            };
            while (true) {
                var state_2 = _loop_2();
                if (typeof state_2 === "object")
                    return state_2.value;
            }
        };
        PokerUtil.assortPokers = function (pokers) {
            var ones = [];
            var twos = [];
            var threes = [];
            var fours = [];
            var index;
            var _loop_3 = function () {
                var poker = pokers.shift();
                // let index = fours.findIndex(v => v[0].value == poker.value);
                // if (index >= 0) {
                //     fours[index].push(poker);
                //     continue;
                // }
                index = threes.findIndex(function (v) { return v[0].value == poker.value; });
                if (index >= 0) {
                    // threes[index].push(poker);
                    fours.push(threes[index].concat([poker]));
                    return "continue";
                }
                index = twos.findIndex(function (v) { return v[0].value == poker.value; });
                if (index >= 0) {
                    // let two=twos[index];
                    // two.push(poker);
                    threes.push(twos[index].concat([poker]));
                    return "continue";
                }
                index = pokers.findIndex(function (v) { return v.value == poker.value; });
                if (index >= 0) {
                    var other = pokers.splice(index, 1)[0];
                    twos.push([poker, other]);
                }
                else {
                    ones.push(poker);
                }
            };
            while (pokers.length) {
                _loop_3();
            }
            return [ones, twos, threes, fours];
        };
        /**
         * 获取幸运扑克
         * @param pattern
         * @param pokers
         * @returns
         */
        PokerUtil.getLuckOnce = function (pattern, pokers) {
            switch (pattern) {
                case game.TypePokerPattern.QUEUE:
                    {
                        var availables = pokers.filter(function (v) {
                            return v.value != undefined && v.flower != undefined;
                        }).map(function (v) { return v.value; });
                        if (availables.length == 0) {
                            return this.getPoker.apply(this, pokers);
                        }
                        var min = availables.reduce(function (prev, cur) { return Math.min(prev, cur); });
                        var max = availables.reduce(function (prev, cur) { return Math.max(prev, cur); });
                        var cur = void 0;
                        var list = [];
                        for (var i = min; i <= max; i++) {
                            if (availables.indexOf(i) == -1)
                                list.push(i);
                        }
                        if (list.length > 0) {
                            cur = list[(Math.random() * list.length) >> 0];
                        }
                        else {
                            if (min == 1) {
                                cur = max + 1;
                            }
                            else if (max == 13) {
                                cur = min - 1;
                            }
                            else {
                                cur = Math.random() > 0.5 ? (min - 1) : (max + 1);
                            }
                        }
                        return { value: cur, flower: 2 };
                    }
                    break;
                case game.TypePokerPattern.TWOTWINS:
                    {
                        var availables = pokers.filter(function (v) {
                            return v.value != undefined && v.flower != undefined;
                        }).concat();
                        availables.sort(function (a, b) { return a.value > b.value ? 1 : -1; });
                        var _a = this.assortPokers(availables), ones = _a[0], twos = _a[1];
                        var cur = void 0;
                        if (twos.length >= 2 || !ones.length) {
                            cur = this.getPoker.apply(this, pokers);
                        }
                        else {
                            var element = ones[(Math.random() * ones.length) >> 0];
                            cur = { value: element.value, flower: this.getFlower(element.flower) };
                        }
                        return cur;
                    }
                    break;
                case game.TypePokerPattern.THREE:
                    {
                        var availables = pokers.filter(function (v) {
                            return v.value != undefined && v.flower != undefined;
                        }).concat();
                        availables.sort(function (a, b) { return a.value > b.value ? 1 : -1; });
                        var _b = this.assortPokers(availables), ones = _b[0], twos = _b[1], threes = _b[2];
                        var cur = void 0;
                        if (threes.length >= 1) {
                            cur = this.getPoker.apply(this, pokers);
                        }
                        else if (twos.length) {
                            var elements = twos[(Math.random() * twos.length) >> 0];
                            cur = { value: elements[0].value, flower: this.getFlower.apply(this, elements.map(function (v) { return v.flower; })) };
                        }
                        else if (ones.length) {
                            var element = ones[(Math.random() * ones.length) >> 0];
                            cur = { value: element.value, flower: this.getFlower(element.flower) };
                        }
                        else {
                            cur = this.getPoker.apply(this, pokers);
                        }
                        return cur;
                    }
                    break;
                case game.TypePokerPattern.SAMEFLOWER:
                    {
                        var availables = pokers.filter(function (v) {
                            return v.value != undefined && v.flower != undefined;
                        }).concat();
                        availables.sort(function (a, b) { return a.value > b.value ? 1 : -1; });
                        if (!availables.length) {
                            return this.getPoker.apply(this, pokers);
                        }
                        var flowers = [];
                        for (var _i = 0, availables_1 = availables; _i < availables_1.length; _i++) {
                            var poker = availables_1[_i];
                            if (flowers.indexOf(poker.flower) == -1)
                                flowers.push(poker.flower);
                        }
                        return this.getPokerUseFlowers(pokers, flowers);
                    }
                    break;
            }
        };
        return PokerUtil;
    }());
    game.PokerUtil = PokerUtil;
    __reflect(PokerUtil.prototype, "game.PokerUtil");
})(game || (game = {}));
var game;
(function (game) {
    var CollectView = (function (_super) {
        __extends(CollectView, _super);
        function CollectView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CollectView.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            // this.props.forEach((v, i) => {
            //     v.getController("c1").setSelectedIndex(i);
            //     v.getChild("labCount").visible = false;
            //     v.addClickListener((e: egret.Event) => {
            //         if (GameModel.collect.props[this.props.indexOf(e.currentTarget)].count > 0) {
            //             vitamin.ui.closeByItem(this);
            //             vitamin.ui.open(RankView);
            //             return;
            //         }
            //         vitamin.ui.tip(`你还没有该道具!`, 0xddbb00);
            //     });
            // });
            // this.btnPoker.enabled = false;
            this.btnPoker.addClickListener(function () {
                vitamin.ui.alert(game.AlertPropsExchange, {});
            });
            // GameModel.collect.props.forEach(v => {
            //     vitamin.Watcher.get(v, "count").watch(this, () => {
            //         this.onPropCountChange();
            //     });
            // });
            game.GameModel.collect.pokers.forEach(function (v) {
                vitamin.Watcher.get(v, "value").watch(_this, function () {
                    _this.onPokerChange();
                });
                vitamin.Watcher.get(v, "flower").watch(_this, function () {
                    _this.onPokerChange();
                });
            });
        };
        CollectView.prototype.enter = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var patternText = "";
            switch (game.GameModel.collect.pokerPattern.pattern) {
                case game.TypePokerPattern.QUEUE:
                    patternText = "顺子";
                    break;
                case game.TypePokerPattern.TWOTWINS:
                    patternText = "两对";
                    break;
                case game.TypePokerPattern.THREE:
                    patternText = "三条";
                    break;
                case game.TypePokerPattern.SAMEFLOWER:
                    patternText = "同花";
                    break;
            }
            this.labPokerPattern.text = "\u4ECA\u5929\u7684\u5151\u6362\u724C\u578B:[color=#338800]" + patternText + "[/color]";
            // this.onPropCountChange();
            this.onPokerChange();
            // vitamin.ui.onClose(SlotMachine, this, this.onSlotMachineClose, false);
        };
        CollectView.prototype.exit = function () {
            // vitamin.ui.offClose(SlotMachine, this, this.onSlotMachineClose);
        };
        // protected onSlotMachineClose() {
        //     this.pokers.forEach((v, i) => {
        //         let data = GameModel.collect.pokers[i];
        //         if (v.value != data.value || v.flower != data.flower) {
        //             this.labPokers[i].visible = false;
        //             egret.Tween.get(v).to({ scaleX: 0 }, 250, egret.Ease.cubicIn).call((poker: PokerCard, data: Poker) => {
        //                 poker.setValue(undefined, undefined);
        //                 egret.Tween.get(poker).to({ scaleX: 1 }, 250, egret.Ease.cubicOut).call((poker: PokerCard, data: Poker) => {
        //                     egret.Tween.get(poker).to({ scaleX: 0 }, 250, egret.Ease.cubicIn).call((poker: PokerCard, data: Poker) => {
        //                         poker.setValue(data.value, data.flower);
        //                         egret.Tween.get(poker).to({ scaleX: 1 }, 250, egret.Ease.cubicOut);
        //                     }, this, [poker, data]);
        //                 }, this, [poker, data]);
        //             }, this, [v, data]);
        //         }
        //     });
        // }
        // protected onPropCountChange() {
        //     this.props.forEach((v, i) => {
        //         v.getChild("labCount").text = "x" + GameModel.collect.props[i].count + '';
        //         v.getChild("labCount").visible = GameModel.collect.props[i].count > 0;
        //     });
        // }
        CollectView.prototype.onPokerChange = function () {
            var _this = this;
            this.pokers.forEach(function (v, i) {
                var data = game.GameModel.collect.pokers[i];
                v.setValue(data.value, data.flower);
                _this.labPokers[i].visible = data.value == undefined;
            });
            this.btnPoker.enabled = game.GameModel.collect.checkPokerDone();
            vitamin.red.RedTree.refesh("collect");
        };
        __decorate([
            vitamin.bundlecomp("poker", 5)
        ], CollectView.prototype, "pokers", void 0);
        __decorate([
            vitamin.bundlecomp("labPoker", 5)
        ], CollectView.prototype, "labPokers", void 0);
        __decorate([
            vitamin.bindcomp("badges")
        ], CollectView.prototype, "list", void 0);
        CollectView = __decorate([
            vitamin.UIView("game", { resName: "CollectView", type: vitamin.UIType.DIALOG }, null, game.ModelCollect)
        ], CollectView);
        return CollectView;
    }(vitamin.WindowItem));
    game.CollectView = CollectView;
    __reflect(CollectView.prototype, "game.CollectView");
})(game || (game = {}));
var game;
(function (game) {
    var GuideView = (function (_super) {
        __extends(GuideView, _super);
        function GuideView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GuideView.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            this.btnJump.addClickListener(function () {
                vitamin.ui.closeByItem(_this);
            });
            this.btnNext.addClickListener(this.onNext, this);
            this.maxStep = this.c1.pageCount;
        };
        GuideView.prototype.enter = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.resizeNow();
            if (!this.orginals) {
                this.orginals = (_a = {},
                    _a[this.labname.hashCode] = { x: this.labname.x, y: this.labname.y },
                    _a[this.grid.hashCode] = { x: this.grid.x, y: this.grid.y },
                    _a[this.textbar.hashCode] = { x: this.textbar.x, y: this.textbar.y },
                    _a[this.btnJump.hashCode] = { x: this.btnJump.x, y: this.btnJump.y },
                    _a[this.btnNext.hashCode] = { x: this.btnNext.x, y: this.btnNext.y },
                    _a);
            }
            this.index = 0;
            this.onNext();
            this.bg.alpha = 0;
            egret.Tween.get(this.bg).to({ alpha: 1 }, 500);
            this.grid.y = -this.grid.height;
            egret.Tween.get(this.grid).to({ y: this.orginals[this.grid.hashCode].y }, 500, egret.Ease.quadOut);
            this.labname.y = -this.labname.height;
            egret.Tween.get(this.labname).wait(300).to({ y: this.orginals[this.labname.hashCode].y }, 500, egret.Ease.quadOut);
            this.textbar.y = this.height + this.textbar.height;
            egret.Tween.get(this.textbar).to({ y: this.orginals[this.textbar.hashCode].y }, 500, egret.Ease.quadOut);
            this.btnJump.x = -this.btnJump.width;
            egret.Tween.get(this.btnJump).wait(300).to({ x: this.orginals[this.btnJump.hashCode].x }, 500, egret.Ease.quadOut);
            this.btnNext.x = this.width + this.btnNext.width;
            egret.Tween.get(this.btnNext).wait(300).to({ x: this.orginals[this.btnNext.hashCode].x }, 500, egret.Ease.quadOut);
            var _a;
        };
        GuideView.prototype.onResize = function (w, h) {
            this.setSize(w, h);
        };
        GuideView.prototype.onNext = function () {
            if (this.index >= this.maxStep) {
                vitamin.ui.closeByItem(this);
                return;
            }
            this.c1.setSelectedIndex(this.index);
            this.grid.getController("c1").setSelectedIndex(this.index);
            this.index++;
        };
        GuideView = __decorate([
            vitamin.UIView("game", { resName: "GuideView", type: vitamin.UIType.FIX })
        ], GuideView);
        return GuideView;
    }(vitamin.ViewItem));
    game.GuideView = GuideView;
    __reflect(GuideView.prototype, "game.GuideView");
})(game || (game = {}));
var game;
(function (game) {
    var LossDebugView = (function (_super) {
        __extends(LossDebugView, _super);
        function LossDebugView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LossDebugView_1 = LossDebugView;
        ;
        LossDebugView.snapshot = function (scene, trigerX, trigerY) {
            if (!LossDebugView_1.texture)
                LossDebugView_1.texture = new egret.RenderTexture();
            if (!LossDebugView_1.mark) {
                var shape = new egret.Shape();
                shape.graphics.beginFill(0xFFFF00, 0.5);
                shape.graphics.drawCircle(0, 0, 16);
                shape.graphics.endFill();
                LossDebugView_1.mark = shape;
            }
            scene.midLayer.addChild(LossDebugView_1.mark);
            LossDebugView_1.mark.x = trigerX;
            LossDebugView_1.mark.y = trigerY;
            LossDebugView_1.texture.drawToTexture(scene.midLayer, new egret.Rectangle(scene.center.x - scene.width / 2, scene.center.y - scene.height / 2, scene.width, scene.height), 1 / scene.scaleX);
            scene.midLayer.removeChild(LossDebugView_1.mark);
            LossDebugView_1.size = { width: scene.midLayer.width * scene.scaleX, height: scene.midLayer.height * scene.scaleY };
        };
        LossDebugView.clearSnapshot = function () {
            if (LossDebugView_1.texture) {
                LossDebugView_1.texture.dispose();
                LossDebugView_1.texture = null;
            }
        };
        LossDebugView.prototype.create = function () {
            _super.prototype.create.call(this);
            this.magin = {
                w: this.width - this.image.width,
                h: this.height - this.image.height
            };
        };
        LossDebugView.prototype.enter = function () {
            this.image.texture = LossDebugView_1.texture;
            this.image.displayObject.smoothing = false;
            this.setSize(LossDebugView_1.size.width + this.magin.w, LossDebugView_1.size.height + this.magin.h);
        };
        LossDebugView.prototype.exit = function () {
        };
        LossDebugView = LossDebugView_1 = __decorate([
            vitamin.UIView("game", { resName: "LossDebugView", type: vitamin.UIType.DIALOG, tapOutSideClose: true })
        ], LossDebugView);
        return LossDebugView;
        var LossDebugView_1;
    }(vitamin.WindowItem));
    game.LossDebugView = LossDebugView;
    __reflect(LossDebugView.prototype, "game.LossDebugView");
})(game || (game = {}));
var game;
(function (game) {
    var LossView = (function (_super) {
        __extends(LossView, _super);
        function LossView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LossView_1 = LossView;
        LossView.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            this.labJumpBack.displayObject.touchEnabled = true;
            this.labJumpBack.addClickListener(function () {
                game.GameModel.level.prevFloor();
                vitamin.ui.closeByItem(_this);
            });
            this.btnAgain.addClickListener(function () {
                if (vitamin.platform.ads && _this.iconAds.visible) {
                    vitamin.ui.open(game.ModalLoadingView, "正在拉起广告...");
                    vitamin.platform.ads.playVideo({
                        caller: _this,
                        start: function () {
                            vitamin.ui.close(game.ModalLoadingView);
                        },
                        sucess: function () {
                            vitamin.ui.close(game.ModalLoadingView);
                            vitamin.ui.closeByItem(_this);
                        },
                        fail: function () {
                            vitamin.ui.close(game.ModalLoadingView);
                            vitamin.ui.tip("\u5982\u679C\u60A8\u80FD\u6B63\u5E38\u7684\u89C2\u770B\u5E7F\u544A,\u5F00\u53D1\u8005\u5C06\u83B7\u5F97\u652F\u6301\u505A\u51FA\u66F4\u52A0\u7CBE\u5F69\u7684\u6E38\u620F...");
                            // vitamin.ui.closeByItem(this);
                        },
                        retryTimes: 3,
                        showDefaultToast: true,
                    });
                    return;
                }
                vitamin.ui.closeByItem(_this);
            });
            this.btnGetVIP.addClickListener(function () {
                vitamin.ui.open(game.VIPVIew);
                vitamin.ui.onClose(game.VIPVIew, _this, _this.updateButtonState, true);
            });
            this.btnAgain.enabled = false;
            this.labJumpBack.enabled = false;
            this.vipGroup.visible = false;
        };
        LossView.prototype.enter = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // if (!LossView.lastState) {
            //     LossView.lastState = true;
            // } else {
            //     LossView.lastState = Math.random() > 0.5;
            // }
            LossView_1.lastState = true;
            this.updateButtonState();
        };
        LossView.prototype.updateButtonState = function () {
            if (game.GameModel.ads.checkIsVip()) {
                LossView_1.lastState = false;
            }
            this.labJumpBack.visible = LossView_1.lastState;
            this.iconAds.visible = LossView_1.lastState;
            this.btnAgain.text = LossView_1.lastState ? "\u518D\u6B21\u6311\u6218   " : "\u518D\u6B21\u6311\u6218";
            this.vipGroup.visible = !game.GameModel.ads.checkIsVip();
        };
        LossView.prototype.enterOver = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.btnAgain.enabled = true;
            this.labJumpBack.enabled = true;
            this.vipGroup.visible = !game.GameModel.ads.checkIsVip();
        };
        LossView.prototype.exit = function () {
            this.btnAgain.enabled = false;
            this.labJumpBack.enabled = false;
            this.vipGroup.visible = false;
        };
        LossView.lastState = true;
        LossView = LossView_1 = __decorate([
            vitamin.UIView("game", { resName: "LossView", type: vitamin.UIType.DIALOG, tapOutSideClose: false })
        ], LossView);
        return LossView;
        var LossView_1;
    }(game.SceneView));
    game.LossView = LossView;
    __reflect(LossView.prototype, "game.LossView");
})(game || (game = {}));
var game;
(function (game) {
    var MainView = (function (_super) {
        __extends(MainView, _super);
        function MainView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainView.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            this.hotUser.touchable = true;
            this.hotUser.displayObject.touchEnabled = true;
            this.hotUser.addClickListener(function () {
                if (!vitamin.platform.userInfo) {
                    _this.onGetUserInfo(true);
                }
            });
            this.hotCollect.touchable = true;
            this.hotCollect.displayObject.touchEnabled = true;
            this.hotCollect.addClickListener(function () {
                vitamin.ui.open(game.CollectView);
            });
            this.btnLossBug.addClickListener(function () {
                vitamin.ui.open(game.LossDebugView);
            });
            vitamin.Watcher.get(game.LossDebugView, "texture").bind(this.btnLossBug, "visible", { execOnce: true });
            this.btnGuide.addClickListener(function () {
                vitamin.ui.open(game.GuideView);
            });
            vitamin.Watcher.get(game.GameModel.level, "showguide").bind(this.btnGuide, "visible", { execOnce: true });
            vitamin.Watcher.get(game.GameModel.ads, "strength").watch(this, function () {
                _this.labStrength.text = "x " + game.GameModel.ads.strength;
            }, { execOnce: true });
            vitamin.Watcher.get(game.GameModel.ads, "vipEndTime").watch(this, function () {
                if (game.GameModel.ads.checkIsVip()) {
                    var seconds = ((game.GameModel.ads.vipEndTime - Date.now()) / 1000) >> 0;
                    vitamin.timer.countdown(seconds, _this, null, _this.onUpdateVip, true);
                }
                else {
                    vitamin.timer.clear(_this, _this.onUpdateVip);
                }
                _this.onUpdateVip();
            });
            vitamin.red.RedTree.create({
                name: "collect",
                condition: function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return game.GameModel.collect.checkPokerDone() || !!game.GameModel.collect.badges.find(function (v, i) { return game.GameModel.collect.checkBadge(i); });
                }
            });
            vitamin.red.RedTree.bind("collect", this.redIcon);
        };
        MainView.prototype.enter = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.resizeNow();
            this.pokers.forEach(function (v, i) {
                var data = game.GameModel.collect.pokers[i];
                v.setValue(data.value, data.flower);
                vitamin.Watcher.get(data, "value").watch(_this, _this.onPokerChange);
                vitamin.Watcher.get(data, "flower").watch(_this, _this.onPokerChange);
            });
            this.levelBar.setFloor(game.GameModel.level.floor, game.GameModel.level.checkFloorOffset.bind(game.GameModel.level), game.GameModel.level.checkStarFloor.bind(game.GameModel.level));
            vitamin.red.RedTree.refesh("collect");
            this.onGetUserInfo();
            this.onUpdateVip();
        };
        MainView.prototype.onUpdateVip = function () {
            if (game.GameModel.ads.checkIsVip()) {
                this.vipHeadSide.visible = true;
            }
            else {
                this.vipHeadSide.visible = false;
            }
        };
        MainView.prototype.onGetUserInfo = function (checkSetting) {
            var _this = this;
            if (checkSetting === void 0) { checkSetting = false; }
            if (vitamin.platform.userInfo) {
                this.onUpdateUserIcon();
                return;
            }
            vitamin.platform.getUserData({ checkSetting: checkSetting }).then(function (v) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!v) {
                        vitamin.ui.tip("\u672A\u6210\u529F\u83B7\u53D6\u7528\u6237\u4FE1\u606F...");
                        return [2 /*return*/];
                    }
                    this.onUpdateUserIcon();
                    return [2 /*return*/];
                });
            }); });
        };
        MainView.prototype.onUpdateUserIcon = function () {
            var _this = this;
            if (vitamin.platform.userInfo) {
                vitamin.res.loadRes(vitamin.platform.userInfo.headurl, vitamin.TypeRes.IMAGE).then(function (texture) {
                    _this.iconUser.texture = texture;
                });
            }
        };
        MainView.prototype.onFloorChange = function () {
            if (game.GameModel.level.floor < 1)
                return;
            this.levelBar.tweenFloor(game.GameModel.level.floor, game.GameModel.level.checkFloorOffset.bind(game.GameModel.level), game.GameModel.level.checkStarFloor.bind(game.GameModel.level));
        };
        MainView.prototype.updateBanner = function () {
            vitamin.ui.hasOpen() || !vitamin.game.current ? vitamin.platform.ads.showBanner() : vitamin.platform.ads.hideBanner();
        };
        MainView.prototype.onPokerChange = function (value) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            // let index=GameModel.collect.pokers.indexOf(data);
        };
        MainView.prototype.onResize = function (w, h) {
            this.setSize(w, h);
            var poker = this.pokers[2];
            var point = poker.localToGlobal();
            game.VCache.cardsPosition.setTo(point.x + 10, point.y + 25);
        };
        __decorate([
            vitamin.bundlecomp("poker", 5)
        ], MainView.prototype, "pokers", void 0);
        __decorate([
            vitamin.bindmethod("floor")
        ], MainView.prototype, "onFloorChange", null);
        MainView = __decorate([
            vitamin.UIView("game", { resName: "MainView", type: vitamin.UIType.FIX }, null, game.ModelLevel)
        ], MainView);
        return MainView;
    }(vitamin.ViewItem));
    game.MainView = MainView;
    __reflect(MainView.prototype, "game.MainView");
})(game || (game = {}));
var game;
(function (game) {
    var MenuBar = (function (_super) {
        __extends(MenuBar, _super);
        function MenuBar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MenuBar.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            this.btnSetting.addClickListener(function () { return vitamin.ui.open(game.SettingView); });
            this.btnRank.addClickListener(function () { return vitamin.ui.open(game.RankView); });
            this.btnShare.addClickListener(function () {
                vitamin.platform.share({
                    title: "聪明的人才玩的游戏",
                    imageUrl: ""
                });
            });
            this.btnInvite.addClickListener(function () {
                vitamin.platform.shareInvite();
            });
            this.btnRecord.addClickListener(function () {
                if (vitamin.platform.asMini)
                    _this.onRecord();
            });
            this.btnRecording.addClickListener(function () {
                if (vitamin.platform.asMini)
                    _this.onRecordStop();
            });
            this.btnRecorded.addClickListener(function () {
                vitamin.ui.alert(game.AlertComon, {
                    text: "你似乎之前录制过一个视频,该如何处理此视频?",
                    oklabel: "剪辑并分享",
                    cancellabel: "重新录制",
                    ok: function () {
                        _this.onRecordPublish();
                    },
                    cancel: function () {
                        _this.onRecord();
                    }
                });
            });
            if (vitamin.platform instanceof vitamin.PMini) {
                vitamin.Watcher.get(vitamin.platform, "recordState").watch(this, function () {
                    _this.c1.setSelectedIndex(vitamin.platform.asMini.recordState);
                });
            }
            this.share.setSelectedIndex(0);
            this.btnSharePop.addClickListener(function () {
                _this.onShowShare();
            });
        };
        MenuBar.prototype.onRecord = function () {
            var _this = this;
            vitamin.platform.asMini.recordStart({
                caller: this,
                fail: function () {
                    vitamin.ui.tip("\u5F55\u5C4F\u5931\u8D25...", 0xff6633);
                },
                complete: function () {
                    _this.onRecordPublish();
                }
            });
        };
        MenuBar.prototype.onRecordStop = function () {
            vitamin.platform.asMini.recordStop();
        };
        MenuBar.prototype.onRecordPublish = function () {
            vitamin.platform.asMini.recordPublish({
                title: "聪明的人才玩的游戏",
                desc: "看看谁是最强的大脑,用你的智力征服你的朋友圈吧",
                imageUrl: "",
                videoTopics: [
                    "", ""
                ]
            });
        };
        MenuBar.prototype.onShowShare = function () {
            this.share.setSelectedIndex(1);
            vitamin.stage.on(egret.TouchEvent.TOUCH_END, this.onHideShare, this);
        };
        MenuBar.prototype.onHideShare = function (e) {
            if (this.displayObject.hitTestPoint(e.stageX, e.stageY)) {
                return;
            }
            vitamin.stage.off(egret.TouchEvent.TOUCH_END, this.onHideShare, this);
            this.share.setSelectedIndex(0);
        };
        MenuBar = __decorate([
            vitamin.UIView("game", { resName: "MenuBar", type: vitamin.UIType.FIX })
        ], MenuBar);
        return MenuBar;
    }(vitamin.GRuntimeBase));
    game.MenuBar = MenuBar;
    __reflect(MenuBar.prototype, "game.MenuBar");
})(game || (game = {}));
var game;
(function (game) {
    var ModalLoadingView = (function (_super) {
        __extends(ModalLoadingView, _super);
        function ModalLoadingView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ModalLoadingView.prototype.create = function () {
            _super.prototype.create.call(this);
        };
        ModalLoadingView.prototype.enter = function (content) {
            this.resizeNow();
            this.labContent.text = content ? content : "loading...";
        };
        ModalLoadingView.prototype.onResize = function (w, h) {
            this.setSize(w, h);
        };
        ModalLoadingView = __decorate([
            vitamin.UIView("game", { resName: "ModalLoadingView", type: vitamin.UIType.FIX, layer: "alert" }, null, game.ModelLevel)
        ], ModalLoadingView);
        return ModalLoadingView;
    }(vitamin.ViewItem));
    game.ModalLoadingView = ModalLoadingView;
    __reflect(ModalLoadingView.prototype, "game.ModalLoadingView");
})(game || (game = {}));
var game;
(function (game) {
    var RankRenderer = (function (_super) {
        __extends(RankRenderer, _super);
        function RankRenderer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RankRenderer.prototype.create = function () {
            _super.prototype.create.call(this);
            this.btnFavorite.addClickListener(function () {
            });
        };
        RankRenderer.prototype.onDataChanged = function (data, old) {
            this.loader.url = this.data.headurl;
            this.labRank.text = this.data.rank + '';
            this.labName.text = this.data.name;
            this.c1.setSelectedIndex(this.data.ismine ? 1 : 0);
        };
        RankRenderer = __decorate([
            vitamin.UIView("game", { resName: "RankRenderer" })
        ], RankRenderer);
        return RankRenderer;
    }(vitamin.GRuntimeBase));
    game.RankRenderer = RankRenderer;
    __reflect(RankRenderer.prototype, "game.RankRenderer");
})(game || (game = {}));
var game;
(function (game) {
    var RankView = (function (_super) {
        __extends(RankView, _super);
        function RankView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RankView.prototype.create = function () {
            _super.prototype.create.call(this);
            vitamin.opencontext.registerView("Rank", this.container);
            this.labReason.displayObject.touchEnabled = true;
            this.labReason.displayObject.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (vitamin.platform instanceof vitamin.PBytedance) {
                    vitamin.ui.tip("\u9020\u6210\u6B64\u79CD\u60C5\u51B5\u7684\u539F\u56E0\u662F\u5E73\u53F0\u65B9\u7684\u5F00\u653E\u57DF\u4E0D\u80FD\u6B63\u5E38\u663E\u793A");
                    vitamin.ui.tip("\u8BF7\u8010\u5FC3\u7B49\u5F85\u5E73\u53F0\u65B9\u4FEE\u590D\u6B64\u95EE\u9898!");
                }
            }, this);
            this.labOpenNative.displayObject.touchEnabled = true;
            this.labOpenNative.displayObject.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (vitamin.platform instanceof vitamin.PBytedance) {
                    vitamin.platform.showNativeRank();
                }
            }, this);
        };
        RankView.prototype.enter = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        RankView.prototype.enterOver = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var px = this.x + this.container.x;
            var py = this.y + this.container.y;
            if (vitamin.platform instanceof vitamin.PMini) {
                vitamin.opencontext.showView("Rank", px, py, vitamin.platform.userInfo);
            }
        };
        RankView.prototype.exit = function () {
            vitamin.opencontext.closeView();
        };
        __decorate([
            vitamin.bindcomp("worldRank")
        ], RankView.prototype, "list", void 0);
        RankView = __decorate([
            vitamin.UIView("game", { resName: "RankView", type: vitamin.UIType.DIALOG }, null, game.ModelRank)
        ], RankView);
        return RankView;
    }(vitamin.WindowItem));
    game.RankView = RankView;
    __reflect(RankView.prototype, "game.RankView");
})(game || (game = {}));
var game;
(function (game) {
    var ColorBoom = (function (_super) {
        __extends(ColorBoom, _super);
        function ColorBoom() {
            return _super.call(this, {
                launchers: [
                    {
                        type: vitamin.IntervalLauncher,
                        option: { interval: 5, oncecount: 10, duration: 1500, maxcount: 500 },
                        particels: [ColorBoomPiece]
                    }
                ]
            }) || this;
        }
        ColorBoom.prototype.onLaunch = function (Particel, launcher) {
            if (Math.random() > 0.8)
                vitamin.audio.playSound([game.Sound.Effect.bubble1, game.Sound.Effect.bubble2, game.Sound.Effect.bubble3].random());
            _super.prototype.onLaunch.call(this, Particel, launcher);
        };
        ColorBoom.prototype.initialize = function (radius, resnames) {
            _super.prototype.initialize.call(this);
            // let total = vitamin.MathUtil.randRange((count * 0.7) >> 0, count);
            this._radius = radius;
            // this._angle = 360 / total;
            this._resnames = resnames;
            this._speed = [1, 2];
            // this.updateLauncherOptions({ count: total, });
            return this;
        };
        ColorBoom.prototype.onParticelCreate = function (particel, launcher) {
            // var off = vitamin.MathUtil.randRange(0, this._angle / 2);
            // var curAngle = launcher.count * this._angle + off;
            particel.initialize(this._resnames ? this._resnames : game.Res.pieceResnames, vitamin.MathUtil.randRangeFloat(0, 360), this._radius, 0, 0, this._speed);
        };
        return ColorBoom;
    }(vitamin.Effect));
    game.ColorBoom = ColorBoom;
    __reflect(ColorBoom.prototype, "game.ColorBoom");
    var ColorBoomPiece = (function (_super) {
        __extends(ColorBoomPiece, _super);
        function ColorBoomPiece() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.tx = 0;
            _this.ty = 0;
            _this.ta = 0;
            _this.tr = 0;
            return _this;
        }
        ColorBoomPiece.prototype.initialize = function (reses, angle, radius, centerX, centerY, speed) {
            var res = reses.random();
            this.texture = (res instanceof egret.Texture) ? res : RES.getRes(res);
            this.anchorOffsetX = this.texture.textureWidth / 2;
            this.anchorOffsetY = this.texture.textureHeight / 2;
            this.alpha = 1;
            this.rotation = Math.random() * 360;
            this.scaleX = this.scaleY = Math.random() * 0.5 + 0.5;
            game.VCache.point = vitamin.MathUtil.getLinePointByAngle(centerX, centerY, Math.random() * radius * 0.3, angle, game.VCache.point);
            this.x = game.VCache.point.x;
            this.y = game.VCache.point.y;
            game.VCache.point = vitamin.MathUtil.getLinePointByAngle(centerX + (Math.random() * 50 - 25), centerY + (Math.random() * 50 - 25), radius + Math.random() * radius, angle, game.VCache.point);
            // var controlX: number = game.VCache.point.x;
            // var controlY: number = game.VCache.point.y;
            var sp = 1;
            if (speed) {
                sp = Array.isArray(speed) ? vitamin.MathUtil.randRangeFloat(speed[0], speed[1]) : speed;
            }
            this.tx = game.VCache.point.x * 0.04 * sp;
            this.ty = game.VCache.point.y * 0.035 * sp; //* (game.VCache.point.y - this.y > 0 ? 1 : Math.abs(game.VCache.point.y - this.y)*0.003);
            this.ta = vitamin.MathUtil.randRangeFloat(0.01, 0.03);
            this.tr = vitamin.MathUtil.randRangeFloat(1, 10) * (Math.random() > 0.5 ? 1 : -1);
            // game.VCache.point = vitamin.MathUtil.getLinePointByAngle(centerX, centerY + Math.random() * radius * 5, Math.random() * radius * 3, angle, game.VCache.point);
            // var scale: number = Math.random() / 2;
            // vitamin.TweenUtil.bezier(
            //     this, 500 + Math.random() * 1000,
            //     { x: game.VCache.point.x, y: game.VCache.point.y, controlX: controlX, controlY: controlY },
            //     { scaleX: scale, scaleY: scale, rotation: Math.random() * 360, alpha: 0.5 },
            //     egret.Ease.sineIn, this, this.end);
            _super.prototype.initialize.call(this);
        };
        ColorBoomPiece.prototype.onUpdate = function () {
            this.tx *= 0.98;
            this.ty -= ColorBoomPiece.gravity;
            this.x += this.tx;
            this.y -= this.ty;
            this.scaleX = this.scaleY = this.scaleX * 0.985;
            // this.alpha -= this.ta;
            this.rotation += this.tr;
            if (this.scaleX <= 0.1) {
                this.end();
            }
        };
        ColorBoomPiece.gravity = 0.1;
        return ColorBoomPiece;
    }(vitamin.Particel));
    __reflect(ColorBoomPiece.prototype, "ColorBoomPiece");
})(game || (game = {}));
var game;
(function (game) {
    var SettingView = (function (_super) {
        __extends(SettingView, _super);
        function SettingView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SettingView.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            this.btnLightning.addClickListener(function () {
                game.GameModel.setting.lightning = _this.btnLightning.selected;
            });
            this.btnShock.addClickListener(function () {
                game.GameModel.setting.shock = _this.btnShock.selected;
            });
            this.btnSound.addClickListener(function () {
                game.GameModel.setting.sound = _this.btnSound.selected;
            });
            this.btnMusic.addClickListener(function () {
                game.GameModel.setting.music = _this.btnMusic.selected;
            });
            this.btnDevelop.addClickListener(function () {
                vitamin.platform.opencustomer();
            });
        };
        SettingView.prototype.enter = function () {
            this.btnLightning.selected = game.GameModel.setting.lightning;
            this.btnShock.selected = game.GameModel.setting.shock;
            this.btnSound.selected = game.GameModel.setting.sound;
            this.btnMusic.selected = game.GameModel.setting.music;
        };
        SettingView.prototype.enterOver = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (vitamin.platform instanceof vitamin.PMini) {
                var point = this.localToGlobal(this.btnDevelop.x, this.btnDevelop.y);
                //let point = this.btnDevelop.displayObject.localToGlobal()
                vitamin.platform.asMini.showcustomerButton(point.x, point.y, this.btnDevelop.width, this.btnDevelop.height);
            }
        };
        SettingView.prototype.exit = function () {
            if (vitamin.platform instanceof vitamin.PMini) {
                vitamin.platform.asMini.hidecustomerButton();
            }
        };
        SettingView = __decorate([
            vitamin.UIView("game", { resName: "SettingView", type: vitamin.UIType.DIALOG })
        ], SettingView);
        return SettingView;
    }(vitamin.WindowItem));
    game.SettingView = SettingView;
    __reflect(SettingView.prototype, "game.SettingView");
})(game || (game = {}));
var game;
(function (game) {
    var VectoryView = (function (_super) {
        __extends(VectoryView, _super);
        function VectoryView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        VectoryView.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            this.btnContinue.addClickListener(function () {
                if (game.GameModel.ads.strength <= 0) {
                    vitamin.ui.tip("体力不足,你可以观看广告以获取体力!", 0xffcc33);
                    return;
                }
                vitamin.ui.closeByItem(_this);
            });
            this.btnGetStrength.addClickListener(function () {
                if (game.GameModel.ads.checkIsMaxStrength()) {
                    vitamin.ui.tip("\u4F60\u5DF2\u8FBE\u5230\u6700\u5927\u4F53\u529B.");
                    return;
                }
                if (vitamin.platform.ads) {
                    // if (GameModel.ads.checkSuccessPlay()) {
                    // vitamin.ui.tip(`观看广告以解锁关卡...广告将在2秒后播放...`);
                    // let total = 2;
                    // vitamin.timer.countdown(total, this, () => {
                    //     vitamin.ui.tip(`${--total}秒...`);
                    // }, () => {
                    vitamin.ui.open(game.ModalLoadingView, "正在拉起广告...");
                    vitamin.platform.ads.playVideo({
                        caller: _this,
                        start: function () {
                            vitamin.ui.close(game.ModalLoadingView);
                        },
                        sucess: function () {
                            vitamin.ui.close(game.ModalLoadingView);
                            game.GameModel.ads.strengthIncrease();
                            _this.updateStrenth();
                        },
                        fail: function () {
                            vitamin.ui.close(game.ModalLoadingView);
                            vitamin.ui.tip("\u5982\u679C\u60A8\u80FD\u6B63\u5E38\u7684\u89C2\u770B\u5E7F\u544A,\u5F00\u53D1\u8005\u5C06\u83B7\u5F97\u652F\u6301\u505A\u51FA\u66F4\u52A0\u7CBE\u5F69\u7684\u6E38\u620F...");
                        },
                        retryTimes: 3,
                        showDefaultToast: true
                    });
                    // });
                    return;
                    // }
                }
                if (game.GameModel.ads.strength <= 0) {
                    vitamin.ui.tip("\u7531\u4E8E\u5E7F\u544A\u6A21\u5757\u4E0D\u53EF\u7528,\u5C06\u8D60\u9001\u4F60\u4E00\u4E2A\u4F53\u529B.");
                    game.GameModel.ads.strengthIncrease(1);
                    _this.updateStrenth();
                }
                else {
                    vitamin.ui.tip("\u4F60\u5DF2\u83B7\u5F97\u4F53\u529B.");
                }
            });
            this.btnContinue.enabled = false;
        };
        VectoryView.prototype.enter = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var star = game.GameModel.level.getStar(game.GameModel.level.time, game.GameModel.level.current);
            for (var i = 0; i < this.stars.length; i++) {
                this.stars[i].visible = star > i;
            }
            this.updateStrenth();
        };
        VectoryView.prototype.updateStrenth = function () {
            this.labStrength.text = "x " + game.GameModel.ads.strength;
        };
        VectoryView.prototype.enterOver = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.btnContinue.enabled = true;
        };
        VectoryView.prototype.exit = function () {
            this.btnContinue.enabled = false;
        };
        __decorate([
            vitamin.bundlecomp("star", 3)
        ], VectoryView.prototype, "stars", void 0);
        VectoryView = __decorate([
            vitamin.UIView("game", { resName: "VectoryView", type: vitamin.UIType.DIALOG, tapOutSideClose: false })
        ], VectoryView);
        return VectoryView;
    }(game.SceneView));
    game.VectoryView = VectoryView;
    __reflect(VectoryView.prototype, "game.VectoryView");
})(game || (game = {}));
var game;
(function (game) {
    var VIPVIew = (function (_super) {
        __extends(VIPVIew, _super);
        function VIPVIew() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        VIPVIew.prototype.create = function () {
            var _this = this;
            this.btnVip1.addClickListener(function () {
                vitamin.platform.ads.playMultitonVideo({
                    times: 2, reward: "20分钟VIP",
                    sucess: function (res) {
                        _this.curtimes += res.count;
                        _this.updateTimes();
                        console.log("20分钟VIP sucess", res);
                    }
                });
            });
            this.btnVip2.addClickListener(function () {
                vitamin.platform.ads.playMultitonVideo({
                    times: 4, reward: "60分钟VIP",
                    sucess: function (res) {
                        _this.curtimes += res.count;
                        _this.updateTimes();
                    }
                });
            });
            this.btnVip3.addClickListener(function () {
                vitamin.platform.ads.playMultitonVideo({
                    times: 4, reward: "24小时VIP",
                    sucess: function (res) {
                        _this.curtimes += res.count;
                        _this.updateTimes();
                    }
                });
            });
            this.btnShare.addClickListener(function () {
                vitamin.platform.shareInvite().then(function () {
                    game.GameModel.ads.setVipTime(10 * 60 * 1000);
                    vitamin.ui.tip("\u4F60\u5DF2\u83B7\u5F9710\u5206\u949FVIP");
                });
            });
        };
        VIPVIew.prototype.enter = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.curtimes = 0;
            this.updateTimes();
        };
        VIPVIew.prototype.exit = function () {
            this.saveTime();
        };
        VIPVIew.prototype.updateTimes = function () {
            this.labCount.text = this.curtimes + "\u6B21";
            this.saveTime();
            if (this.curtimes < 3) {
                this.c1.setSelectedIndex(0);
                return;
            }
            if (this.curtimes < 6) {
                this.c1.setSelectedIndex(1);
                return;
            }
            if (this.curtimes < 8) {
                this.c1.setSelectedIndex(2);
                return;
            }
            this.c1.setSelectedIndex(3);
        };
        VIPVIew.prototype.saveTime = function () {
            if (this.curtimes >= 8) {
                game.GameModel.ads.setVipTime(12 * 60 * 60 * 1000);
                return;
            }
            if (this.curtimes >= 6) {
                game.GameModel.ads.setVipTime(60 * 60 * 1000);
                return;
            }
            if (this.curtimes >= 3) {
                game.GameModel.ads.setVipTime(20 * 60 * 1000);
                return;
            }
        };
        VIPVIew = __decorate([
            vitamin.UIView("game", { resName: "VIPVIew", type: vitamin.UIType.DIALOG })
        ], VIPVIew);
        return VIPVIew;
    }(vitamin.WindowItem));
    game.VIPVIew = VIPVIew;
    __reflect(VIPVIew.prototype, "game.VIPVIew");
})(game || (game = {}));
var game;
(function (game) {
    var WordsBitmap = (function (_super) {
        __extends(WordsBitmap, _super);
        function WordsBitmap() {
            return _super.call(this) || this;
        }
        WordsBitmap.prototype.initialize = function (content, spaceX, spaceY) {
            if (spaceX === void 0) { spaceX = 0; }
            if (spaceY === void 0) { spaceY = 0; }
            var lines = content.split("\n");
            var sy = 0;
            for (var b = 0; b < lines.length; b++) {
                var words = lines[b].split("");
                var sx = 0;
                for (var a = 0; a < words.length; a++) {
                    var bitmap = new WordBitmap();
                    var color = vitamin.ColorUtil.toBright(vitamin.ColorUtil.random(), 0x66);
                    bitmap.initialize(words[a], 36, color);
                    this.addChild(bitmap);
                    bitmap.x = sx;
                    bitmap.y = sy;
                    // let filter = new egret.GlowFilter(vitamin.ColorUtil.toDark(color, 0x33), 1, 10, 10);
                    // bitmap.filters = [filter];
                    sx += bitmap.width + spaceX;
                }
                sy = this.height + spaceY;
            }
        };
        WordsBitmap.prototype.start = function (duration) {
            var _this = this;
            return new Promise(function (reslove) {
                for (var _i = 0, _a = _this.$children; _i < _a.length; _i++) {
                    var bitmap = _a[_i];
                    bitmap.alpha = 0;
                    bitmap.show(vitamin.MathUtil.randRange(duration * 0.8, duration), vitamin.MathUtil.randRange(10, duration * 0.4));
                }
                vitamin.timer.once(duration, _this, reslove);
            });
        };
        WordsBitmap.prototype.stop = function (duration) {
            var _this = this;
            return new Promise(function (reslove) {
                for (var _i = 0, _a = _this.$children; _i < _a.length; _i++) {
                    var bitmap = _a[_i];
                    bitmap.hide(vitamin.MathUtil.randRange(duration * 0.5, duration), vitamin.MathUtil.randRange(10, duration * 0.4));
                }
                vitamin.timer.once(duration, _this, reslove);
            });
        };
        return WordsBitmap;
    }(vitamin.Container));
    game.WordsBitmap = WordsBitmap;
    __reflect(WordsBitmap.prototype, "game.WordsBitmap");
    var WordBitmap = (function (_super) {
        __extends(WordBitmap, _super);
        function WordBitmap() {
            var _this = _super.call(this) || this;
            _this.smoothing = false;
            return _this;
        }
        WordBitmap.getWordTexture = function (word, size, color, font, bold) {
            if (size === void 0) { size = 24; }
            if (color === void 0) { color = 0x0; }
            if (font === void 0) { font = "黑体"; }
            if (bold === void 0) { bold = false; }
            if (!this.word) {
                this.word = new egret.TextField();
                this.word.wordWrap = false;
                this.word.multiline = false;
            }
            this.word.fontFamily = font;
            this.word.bold = bold;
            this.word.size = size;
            this.word.textColor = color;
            this.word.width = size * 2;
            this.word.height = size * 2;
            this.word.text = word;
            this.word.width = this.word.textWidth;
            this.word.height = this.word.textHeight;
            var texture = new egret.RenderTexture();
            texture.drawToTexture(this.word);
            return texture;
        };
        WordBitmap.prototype.initialize = function (word, size, color, font, bold) {
            if (size === void 0) { size = 24; }
            if (color === void 0) { color = 0x0; }
            if (font === void 0) { font = "黑体"; }
            if (bold === void 0) { bold = false; }
            this.texture = WordBitmap.getWordTexture(word, size, color, font, bold);
        };
        WordBitmap.prototype.show = function (duration, waittime) {
            var _this = this;
            if (waittime === void 0) { waittime = 0; }
            return new Promise(function (reslove) {
                var endtime = egret.getTimer() + duration;
                vitamin.timer.once(waittime, _this, function () {
                    _this.flash(endtime, true, reslove);
                });
            });
        };
        WordBitmap.prototype.hide = function (duration, waittime) {
            var _this = this;
            if (waittime === void 0) { waittime = 0; }
            return new Promise(function (reslove) {
                var endtime = egret.getTimer() + duration;
                vitamin.timer.once(waittime, _this, function () {
                    _this.flash(endtime, false, reslove);
                });
            });
        };
        WordBitmap.prototype.flash = function (endtime, endvisible, complete) {
            if (egret.getTimer() >= endtime) {
                this.visible = endvisible;
                this.alpha = 1;
                complete();
                return;
            }
            // this.visible = !this.visible;
            this.alpha = Math.random() * 0.5 + 0.1;
            vitamin.timer.once(vitamin.MathUtil.randRange(33, 100), this, this.flash, true, endtime, endvisible, complete);
            if (Math.random() > 0.9)
                vitamin.audio.playSound(game.Sound.Effect.bubble1);
        };
        return WordBitmap;
    }(egret.Bitmap));
    game.WordBitmap = WordBitmap;
    __reflect(WordBitmap.prototype, "game.WordBitmap");
})(game || (game = {}));
var game;
(function (game) {
    var AlertComon = (function (_super) {
        __extends(AlertComon, _super);
        function AlertComon() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AlertComon.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            this.btnCancel.addClickListener(function () {
                if (_this.options.cancel) {
                    _this.options.cancel.call(_this.options.caller);
                }
                vitamin.ui.closeByItem(_this);
            });
            this.btnOk.addClickListener(function () {
                if (_this.options.ok) {
                    _this.options.ok.call(_this.options.caller);
                }
                vitamin.ui.closeByItem(_this);
            });
        };
        AlertComon.prototype.enter = function (options) {
            if (!options)
                options = { text: "你似乎忘记了什么" };
            if (options.okshow == undefined)
                options.okshow = true;
            if (options.cancelshow == undefined)
                options.cancelshow = true;
            if (options.oklabel == undefined)
                options.oklabel = "确定";
            if (options.cancellabel == undefined)
                options.cancellabel = "取消";
            if (options.title == undefined)
                options.title = "提示";
            this.options = options;
            this.labTitle.text = options.title;
            this.labContent.text = options.text;
        };
        AlertComon = __decorate([
            vitamin.UIView("game", { resName: "AlertComon", type: vitamin.UIType.ALERT })
        ], AlertComon);
        return AlertComon;
    }(vitamin.AlertItem));
    game.AlertComon = AlertComon;
    __reflect(AlertComon.prototype, "game.AlertComon");
})(game || (game = {}));
var game;
(function (game) {
    var AlertPropsExchange = (function (_super) {
        __extends(AlertPropsExchange, _super);
        function AlertPropsExchange() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AlertPropsExchange.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            this.props.forEach(function (v, i) {
                v.getController("c1").setSelectedIndex(i);
                v.getChild("labCount").visible = false;
                v.addClickListener(function (e) {
                    _this.c1.setSelectedIndex(_this.props.indexOf(e.currentTarget));
                });
            });
            this.btnExchange.addClickListener(function () {
                var type;
                switch (_this.c1.selectedIndex) {
                    case 0:
                        type = game.TypeProp.HeadTapper;
                        break;
                    case 1:
                        type = game.TypeProp.Boom;
                        break;
                    case 2:
                        type = game.TypeProp.SandFist;
                        break;
                    case 3:
                        type = game.TypeProp.Kiss;
                        break;
                }
                game.GameModel.collect.exchangeProp(type);
                vitamin.ui.closeByItem(_this);
            });
        };
        AlertPropsExchange.prototype.enter = function (options) {
        };
        __decorate([
            vitamin.bundlecomp("prop", 4)
        ], AlertPropsExchange.prototype, "props", void 0);
        AlertPropsExchange = __decorate([
            vitamin.UIView("game", { resName: "AlertPropsExchange", type: vitamin.UIType.ALERT })
        ], AlertPropsExchange);
        return AlertPropsExchange;
    }(vitamin.AlertItem));
    game.AlertPropsExchange = AlertPropsExchange;
    __reflect(AlertPropsExchange.prototype, "game.AlertPropsExchange");
})(game || (game = {}));
var game;
(function (game) {
    var SlotGroup = (function (_super) {
        __extends(SlotGroup, _super);
        function SlotGroup() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.soundInterval = 100;
            _this.soundlastTime = 0;
            return _this;
        }
        SlotGroup.prototype.create = function () {
            _super.prototype.create.call(this);
            this.positions = this.items.map(function (v) { return v.y; });
            this.space = this.items[1].y - this.items[0].y;
            this.limitY = this.positions.last() + this.items.last().height / 2;
        };
        SlotGroup.prototype.start = function (duration, stopStyle, caler, complete) {
            for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                var item = _a[_i];
                egret.Tween.removeTweens(item);
            }
            this.speed = 0;
            this.soundlastTime = egret.getTimer();
            vitamin.audio.playSound(game.Sound.Effect.piano1);
            vitamin.ticker.add(this, this.updateRender);
            vitamin.timer.once(duration, this, this.stop, true, stopStyle);
            if (this.complete) {
                this.complete.recover();
                this.complete = null;
            }
            if (complete) {
                this.complete = vitamin.Handler.create(caler, complete);
            }
        };
        SlotGroup.prototype.stop = function (style) {
            var _this = this;
            vitamin.audio.playSound(game.Sound.Effect.piano8);
            for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                var item = _a[_i];
                egret.Tween.removeTweens(item);
            }
            vitamin.ticker.remove(this, this.updateRender);
            vitamin.timer.clear(this, this.stop);
            var bottom = this.items.first();
            for (var _b = 0, _c = this.items; _b < _c.length; _b++) {
                var item = _c[_b];
                if (item.y > bottom.y) {
                    bottom = item;
                }
            }
            bottom.y = this.getNextItem(bottom).y - this.space;
            var top = bottom;
            var mid = this.getNextItem(top);
            bottom = this.getNextItem(mid);
            top.y = this.positions[0] - top.height / 2;
            mid.y = this.positions[1] - mid.height / 2;
            bottom.y = this.positions[2] - bottom.height / 2;
            mid.setStyle(style);
            // if (bottom.y < this.positions.last()) {
            egret.Tween.get(top).to({ y: this.positions[0] }, 1000, egret.Ease.elasticOut);
            egret.Tween.get(mid).to({ y: this.positions[1] }, 1000, egret.Ease.elasticOut);
            egret.Tween.get(bottom).to({ y: this.positions[2] }, 1000, egret.Ease.elasticOut).call(function () {
                var complete = _this.complete;
                _this.complete = null;
                if (complete) {
                    complete.run();
                }
            });
            // } else {
            //     egret.Tween.get(top).to({ y: this.positions[0] + 10 }, 500, egret.Ease.backIn);
            //     egret.Tween.get(mid).to({ y: this.positions[1] + 10}, 500, egret.Ease.backIn);
            //     egret.Tween.get(bottom).to({ y: this.positions[2]+ 10 }, 500, egret.Ease.backIn).call(() => {
            //         egret.Tween.get(top).to({ y: this.positions[0] }, 500, egret.Ease.circOut);
            //         egret.Tween.get(mid).to({ y: this.positions[1] }, 500, egret.Ease.circOut);
            //         egret.Tween.get(bottom).to({ y: this.positions[2] }, 500, egret.Ease.circOut);
            //     });
            // }
        };
        SlotGroup.prototype.updateRender = function () {
            if (egret.getTimer() - this.soundlastTime > this.soundInterval) {
                vitamin.audio.playSound(game.Sound.pianos.random());
                this.soundlastTime = egret.getTimer();
            }
            this.speed += (15 - this.speed) / 10;
            for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                var item = _a[_i];
                item.y += this.speed;
                if (item.y > this.limitY) {
                    var offset = item.y - this.limitY;
                    var next = this.getNextItem(item);
                    item.y = next.y - this.space + offset;
                    item.setStyle();
                }
            }
        };
        SlotGroup.prototype.getNextItem = function (item) {
            var index = this.items.indexOf(item);
            if (index >= this.items.length - 1) {
                return this.items.first();
            }
            return this.items[index + 1];
        };
        SlotGroup.prototype.getPrevItem = function (item) {
            var index = this.items.indexOf(item);
            if (index <= 0) {
                return this.items.last();
            }
            return this.items[index - 1];
        };
        __decorate([
            vitamin.bundlecomp("item", 3)
        ], SlotGroup.prototype, "items", void 0);
        SlotGroup = __decorate([
            vitamin.UIView("game", { resName: "SlotGroup", type: vitamin.UIType.FIX })
        ], SlotGroup);
        return SlotGroup;
    }(vitamin.GRuntimeBase));
    game.SlotGroup = SlotGroup;
    __reflect(SlotGroup.prototype, "game.SlotGroup");
})(game || (game = {}));
var game;
(function (game) {
    var SlotItem = (function (_super) {
        __extends(SlotItem, _super);
        function SlotItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SlotItem.prototype.setStyle = function (style) {
            if (this.c1.selectedIndex == 0) {
                if (style == undefined)
                    style = vitamin.MathUtil.randRange(1, 4);
                this.flower.getController("c1").setSelectedIndex(style - 1);
            }
            else {
                if (style == undefined)
                    style = vitamin.MathUtil.randRange(1, 13);
                switch (style) {
                    case 1:
                        this.lab.text = 'A';
                        break;
                    case 11:
                        this.lab.text = 'J';
                        break;
                    case 12:
                        this.lab.text = 'Q';
                        break;
                    case 13:
                        this.lab.text = 'K';
                        break;
                    default:
                        this.lab.text = style + '';
                        break;
                }
            }
        };
        SlotItem = __decorate([
            vitamin.UIView("game", { resName: "SlotItem", type: vitamin.UIType.FIX })
        ], SlotItem);
        return SlotItem;
    }(vitamin.GRuntimeBase));
    game.SlotItem = SlotItem;
    __reflect(SlotItem.prototype, "game.SlotItem");
})(game || (game = {}));
var game;
(function (game) {
    var SlotMachine = (function (_super) {
        __extends(SlotMachine, _super);
        function SlotMachine() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SlotMachine.prototype.create = function () {
            _super.prototype.create.call(this);
            this.group2.items.forEach(function (v) {
                v.c1.setSelectedIndex(1);
            });
            this.poker.visible = false;
            this.btnLuckEnable.selected = true;
        };
        SlotMachine.prototype.enter = function (options) {
            _super.prototype.enter.call(this, options);
            this.pokerIndex = this.options.params;
            this.poker.visible = false;
            this.labLuck.text = "x " + game.GameModel.collect.lucktimes;
            this.labLuck.color = game.GameModel.collect.lucktimes > 0 ? 0xFFFF99 : 0x993333;
            this.btnStart.addClickListener(this.onStart, this);
            this.btnGet.addClickListener(this.onGet, this);
        };
        SlotMachine.prototype.exit = function () {
            this.btnStart.removeClickListener(this.onStart, this);
            this.btnGet.removeClickListener(this.onGet, this);
            this.poker.removeClickListener(this.onTapClose, this);
        };
        SlotMachine.prototype.onStart = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var useLuck, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.btnLuckEnable.selected) return [3 /*break*/, 2];
                            if (!(game.GameModel.collect.lucktimes == 0)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.onGet()];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            useLuck = this.btnLuckEnable.selected && game.GameModel.collect.lucktimes > 0;
                            result = game.GameModel.collect.drawPoketUseBadge(this.pokerIndex, useLuck);
                            if (!result) {
                                return [2 /*return*/];
                            }
                            vitamin.ui.tapOutsideClose = false;
                            this.btnStart.removeClickListener(this.onStart, this);
                            this.btnGet.removeClickListener(this.onGet, this);
                            this.c1.setSelectedIndex(1);
                            vitamin.timer.once(100, this, function () { return _this.c1.setSelectedIndex(0); });
                            this.group1.start(2000, result.flower);
                            vitamin.timer.once(300, this, function () {
                                _this.group2.start(2000, result.value, _this, function () {
                                    game.GameModel.collect.setPoker(_this.pokerIndex, result.value, result.flower);
                                    _this.poker.setValue(result.value, result.flower);
                                    _this.poker.visible = true;
                                    _this.poker.scaleX = _this.poker.scaleY = 0.1;
                                    vitamin.audio.playSound(game.Sound.Effect.bubble3);
                                    egret.Tween.get(_this.poker).to({ scaleX: 3, scaleY: 3 }, 500, egret.Ease.cubicOut).call(function () {
                                        _this.poker.addClickListener(_this.onTapClose, _this);
                                        vitamin.ui.tapOutsideClose = true;
                                    });
                                });
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        SlotMachine.prototype.onGet = function () {
            var _this = this;
            return new Promise(function (reslove, reject) {
                if (!vitamin.platform.ads) {
                    vitamin.ui.tip("广告模块不可用!", 0xff6633);
                    _this.btnLuckEnable.selected = false;
                    return;
                }
                vitamin.ui.open(game.ModalLoadingView, "正在拉起广告...");
                vitamin.platform.ads.playVideo({
                    start: function () {
                        vitamin.ui.close(game.ModalLoadingView);
                    },
                    complete: function (res) {
                        vitamin.ui.close(game.ModalLoadingView);
                        if (res && res.isEnded) {
                            game.GameModel.collect.lucktimes += 3;
                            reslove();
                        }
                        else {
                            reject();
                        }
                    }
                });
            });
        };
        SlotMachine.prototype.onTapClose = function () {
            vitamin.ui.closeByItem(this);
        };
        SlotMachine = __decorate([
            vitamin.UIView("game", { resName: "SlotMachine", type: vitamin.UIType.ALERT })
        ], SlotMachine);
        return SlotMachine;
    }(vitamin.AlertItem));
    game.SlotMachine = SlotMachine;
    __reflect(SlotMachine.prototype, "game.SlotMachine");
})(game || (game = {}));
var game;
(function (game) {
    var CardIcon = (function (_super) {
        __extends(CardIcon, _super);
        function CardIcon() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CardIcon.prototype.onDataChanged = function (data, old) {
            this.iconImage.url = "ui://game/" + data.id;
            vitamin.Watcher.get(data, "count").watch(this, this.onCountChange, { execOnce: true });
        };
        CardIcon.prototype.onDataClean = function (oldData) {
            if (oldData) {
                vitamin.Watcher.get(oldData, "count").unwatch(this, this.onCountChange);
            }
        };
        CardIcon.prototype.onCountChange = function () {
            this.labCount.text = this.data.count + '';
            this.labCount.visible = this.data.count > 0;
            this.iconImage.alpha = this.data.count > 0 ? 1 : 0.1;
        };
        CardIcon = __decorate([
            vitamin.UIView("game", { resName: "CardIcon", type: vitamin.UIType.FIX })
        ], CardIcon);
        return CardIcon;
    }(vitamin.GRuntimeBase));
    game.CardIcon = CardIcon;
    __reflect(CardIcon.prototype, "game.CardIcon");
})(game || (game = {}));
var game;
(function (game) {
    var CardRenderer = (function (_super) {
        __extends(CardRenderer, _super);
        function CardRenderer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CardRenderer.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            this.btn.addClickListener(function () {
                vitamin.ui.alert(game.SlotMachine, { params: _this.index });
            });
            this.btn.enabled = false;
        };
        CardRenderer.prototype.onDataChanged = function (list) {
            this.index = game.GameModel.collect.badges.indexOf(list);
            switch (this.index) {
                case 0:
                    this.labOrder.text = "A.";
                    break;
                case 1:
                    this.labOrder.text = "B.";
                    break;
                case 2:
                    this.labOrder.text = "C.";
                    break;
                case 3:
                    this.labOrder.text = "D.";
                    break;
                case 4:
                    this.labOrder.text = "E.";
                    break;
            }
            for (var i = 0; i < this.cards.length; i++) {
                this.cards[i].data = list[i];
            }
            for (var _i = 0, list_5 = list; _i < list_5.length; _i++) {
                var badge = list_5[_i];
                vitamin.Watcher.get(badge, "count").watch(this, this.onCountChange);
            }
            this.onCountChange();
        };
        CardRenderer.prototype.onDataClean = function (list) {
            if (list) {
                for (var _i = 0, list_6 = list; _i < list_6.length; _i++) {
                    var badge = list_6[_i];
                    vitamin.Watcher.get(badge, "count").unwatch(this, this.onCountChange);
                }
            }
            this.btn.enabled = false;
        };
        CardRenderer.prototype.onCountChange = function () {
            this.btn.enabled = game.GameModel.collect.checkBadge(this.index);
        };
        __decorate([
            vitamin.bundlecomp("card", 5)
        ], CardRenderer.prototype, "cards", void 0);
        CardRenderer = __decorate([
            vitamin.UIView("game", { resName: "CardRenderer", type: vitamin.UIType.FIX })
        ], CardRenderer);
        return CardRenderer;
    }(vitamin.GRuntimeBase));
    game.CardRenderer = CardRenderer;
    __reflect(CardRenderer.prototype, "game.CardRenderer");
})(game || (game = {}));
var game;
(function (game) {
    var LevelBar = (function (_super) {
        __extends(LevelBar, _super);
        function LevelBar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LevelBar.prototype.create = function () {
            _super.prototype.create.call(this);
            this.tempLevel = vitamin.ui.createRunTime(game.LevelItem);
            this._items = [this.preLevel, this.curLevel, this.nextLevel];
            this._positions = this._items.map(function (v) { return ({ x: v.x, y: v.y, scale: v.scaleX, alpha: 1 }); });
            this._positions = [{ x: -13, y: -24, scale: 0.3, alpha: 0 }].concat(this._positions, [{ x: 290, y: 24, scale: 0.3, alpha: 0 }]);
        };
        LevelBar.prototype.setFloor = function (floor, checkFloor, checkboss) {
            this.preLevel.setLevel(floor - 1, checkFloor, checkboss);
            this.curLevel.setLevel(floor, checkFloor, checkboss);
            this.nextLevel.setLevel(floor + 1, checkFloor, checkboss);
            this.preLevel.visible = (floor - 1) > 0;
            this.curLevel.visible = (floor) > 0;
            this.nextLevel.visible = (floor + 1) > 0;
            this._lastFloor = floor;
        };
        LevelBar.prototype.tweenFloor = function (floor, checkFloor, checkboss) {
            var _this = this;
            return new Promise(function (reslove) {
                if (_this._lastFloor == undefined) {
                    _this.setFloor(floor, checkFloor, checkboss);
                    reslove();
                    return;
                }
                if (_this._lastFloor == floor) {
                    reslove();
                    return;
                }
                var tempFloor = (floor > _this._lastFloor ? 1 : -1) + floor;
                var tempStartPosition = floor > _this._lastFloor ? _this._positions.last() : _this._positions.first();
                var tempEndPosition = floor > _this._lastFloor ? _this._positions.last(1) : _this._positions.first(1);
                _this.addChild(_this.tempLevel);
                _this.tempLevel.setLevel(tempFloor, checkFloor, checkboss);
                _this.tempLevel.x = tempStartPosition.x;
                _this.tempLevel.y = tempStartPosition.y;
                _this.tempLevel.alpha = tempStartPosition.alpha;
                _this.tempLevel.scaleX = _this.tempLevel.scaleY = tempStartPosition.scale;
                egret.Tween.removeTweens(_this.tempLevel);
                egret.Tween.get(_this.tempLevel).to({ x: tempEndPosition.x, y: tempEndPosition.y, scaleX: tempEndPosition.scale, scaleY: tempEndPosition.scale, alpha: 1 }, 1000, egret.Ease.cubicInOut);
                /////////////////
                egret.Tween.removeTweens(_this.preLevel);
                egret.Tween.removeTweens(_this.curLevel);
                egret.Tween.removeTweens(_this.nextLevel);
                var prevEndPosition = floor > _this._lastFloor ? _this._positions.first() : _this._positions.last(2);
                var curEndPosition = floor > _this._lastFloor ? _this._positions.first(1) : _this._positions.last(1);
                var nextEndPosition = floor > _this._lastFloor ? _this._positions.first(2) : _this._positions.last();
                egret.Tween.get(_this.preLevel).to({ x: prevEndPosition.x, y: prevEndPosition.y, scaleX: prevEndPosition.scale, scaleY: prevEndPosition.scale, alpha: prevEndPosition.alpha }, 1000, egret.Ease.cubicInOut);
                egret.Tween.get(_this.curLevel).to({ x: curEndPosition.x, y: curEndPosition.y, scaleX: curEndPosition.scale, scaleY: curEndPosition.scale, alpha: curEndPosition.alpha }, 1000, egret.Ease.cubicInOut);
                egret.Tween.get(_this.nextLevel).to({ x: nextEndPosition.x, y: nextEndPosition.y, scaleX: nextEndPosition.scale, scaleY: nextEndPosition.scale, alpha: nextEndPosition.alpha }, 1000, egret.Ease.cubicInOut).call(function () {
                    _this.tempLevel.removeFromParent();
                    egret.Tween.removeTweens(_this.preLevel);
                    egret.Tween.removeTweens(_this.curLevel);
                    egret.Tween.removeTweens(_this.nextLevel);
                    _this.preLevel.setLevel(floor - 1, checkFloor, checkboss);
                    _this.curLevel.setLevel(floor, checkFloor, checkboss);
                    _this.nextLevel.setLevel(floor + 1, checkFloor, checkboss);
                    for (var i = 0; i < _this._items.length; i++) {
                        var item = _this._items[i];
                        var position = _this._positions[i + 1];
                        item.alpha = position.alpha;
                        item.x = position.x;
                        item.y = position.y;
                        item.scaleX = item.scaleY = position.scale;
                    }
                    _this.preLevel.visible = (floor - 1) > 0;
                    _this.curLevel.visible = (floor) > 0;
                    _this.nextLevel.visible = (floor + 1) > 0;
                    // window["__comp"] = this;
                    // console.log(this.curLevel);
                    reslove();
                });
                _this._lastFloor = floor;
            });
        };
        LevelBar = __decorate([
            vitamin.UIView("game", { resName: "LevelBar", type: vitamin.UIType.FIX })
        ], LevelBar);
        return LevelBar;
    }(vitamin.GRuntimeBase));
    game.LevelBar = LevelBar;
    __reflect(LevelBar.prototype, "game.LevelBar");
})(game || (game = {}));
var game;
(function (game) {
    var LevelItem = (function (_super) {
        __extends(LevelItem, _super);
        function LevelItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LevelItem.prototype.setLevel = function (v, checkFloor, checkboss) {
            this.iconBoss.visible = checkboss ? checkboss(v) : false;
            this.lab.visible = !this.iconBoss.visible;
            this.lab.text = v + "";
            var offset = checkFloor(v);
            if (offset < 0) {
                this.c1.setSelectedIndex(0);
                return;
            }
            if (offset > 0) {
                this.c1.setSelectedIndex(3);
                return;
            }
            if (this.iconBoss.visible) {
                this.c1.setSelectedIndex(2);
            }
            else {
                this.c1.setSelectedIndex(1);
            }
        };
        LevelItem = __decorate([
            vitamin.UIView("game", { resName: "LevelItem", type: vitamin.UIType.FIX })
        ], LevelItem);
        return LevelItem;
    }(vitamin.GRuntimeBase));
    game.LevelItem = LevelItem;
    __reflect(LevelItem.prototype, "game.LevelItem");
})(game || (game = {}));
var game;
(function (game) {
    var PokerCard = (function (_super) {
        __extends(PokerCard, _super);
        function PokerCard() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(PokerCard.prototype, "value", {
            get: function () { return this._value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PokerCard.prototype, "flower", {
            get: function () { return this._flower; },
            enumerable: true,
            configurable: true
        });
        PokerCard.prototype.setValue = function (value, flower) {
            if (this._value == value && this._flower == flower) {
                return;
            }
            this._value = value;
            this._flower = flower;
            if (value == undefined) {
                this.c3.setSelectedIndex(0);
                return;
            }
            this.c3.setSelectedIndex(1);
            switch (value) {
                case 1:
                    this.lab.text = 'A';
                    this.c2.setSelectedIndex(0);
                    break;
                case 11:
                    this.lab.text = 'J';
                    this.c2.setSelectedIndex(1);
                    break;
                case 12:
                    this.lab.text = 'Q';
                    this.c2.setSelectedIndex(2);
                    break;
                case 13:
                    this.lab.text = 'K';
                    this.c2.setSelectedIndex(3);
                    break;
                default:
                    this.lab.text = value + '';
                    this.c2.setSelectedIndex(0);
                    break;
            }
            this.c1.setSelectedIndex(flower - 1);
            this.flower1.getController("c1").setSelectedIndex(flower - 1);
            this.flower2.getController("c1").setSelectedIndex(flower - 1);
        };
        PokerCard = __decorate([
            vitamin.UIView("game", { resName: "PokerCard", type: vitamin.UIType.FIX })
        ], PokerCard);
        return PokerCard;
    }(vitamin.GRuntimeBase));
    game.PokerCard = PokerCard;
    __reflect(PokerCard.prototype, "game.PokerCard");
})(game || (game = {}));
var game;
(function (game) {
    var TimerCounterBar = (function (_super) {
        __extends(TimerCounterBar, _super);
        function TimerCounterBar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TimerCounterBar.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);
            this.iconClock.displayObject.smoothing = true;
            this.labWhite["_bitmapContainer"].$children.forEach(function (bitmap) { return bitmap.smoothing = false; });
            vitamin.Watcher.get(game.GameModel.level, "floor").watch(this, function () {
                _this.labRound.text = "\u7B2C" + game.GameModel.level.floor + "\u5173";
            }, { execOnce: true });
        };
        TimerCounterBar.prototype.onTimeChange = function (time) {
            if (time == undefined)
                return;
            this.labWhite.text = vitamin.DateUtil.formatTimeLeft(time, ":", true);
        };
        __decorate([
            vitamin.bindmethod("time")
        ], TimerCounterBar.prototype, "onTimeChange", null);
        TimerCounterBar = __decorate([
            vitamin.UIView("game", { resName: "TimerCounterBar", type: vitamin.UIType.FIX }, null, game.ModelLevel)
        ], TimerCounterBar);
        return TimerCounterBar;
    }(vitamin.GRuntimeBase));
    game.TimerCounterBar = TimerCounterBar;
    __reflect(TimerCounterBar.prototype, "game.TimerCounterBar");
})(game || (game = {}));
//# sourceMappingURL=main.min.js.map