'use strict';

const fps = null

if (self.spine_4_2 && self.spine) {
    // 给4.0的mvp添加新的方法.
    spine_4_2.Matrix4.prototype.scale = spine.webgl.Matrix4.prototype.scale
    spine_4_2.Matrix4.prototype.rotate = spine.webgl.Matrix4.prototype.rotate
    spine_4_2.Matrix4.prototype.concat = spine.webgl.Matrix4.prototype.concat
    spine_4_2.Matrix4.prototype.setPos2D = spine.webgl.Matrix4.prototype.setPos2D
    spine_4_2.Matrix4.prototype.originTranslate = spine_4.Matrix4.prototype.translate
    spine_4_2.Matrix4.prototype.translate = spine.webgl.Matrix4.prototype.translate

    // 4.0 loadTexture在无名杀手机上莫名其妙不能加载需要改造... 花了我好长时间排错找
    spine_4_2.AssetManager.prototype.loadTexture =  function loadTexture(path, success = null, error = null) {
        path = this.start(path);
        let isBrowser = !!(typeof window !== "undefined" && typeof navigator !== "undefined" && window.document);
        let isWebWorker = !isBrowser;
        let _this = this
        if (isWebWorker) {
            this.downloadImageBitmap(path, function (imageBitmap) {
                spine.lodedAssets[path] = imageBitmap;
                let texture = _this.textureLoader(imageBitmap);
                _this.success(success, path, texture);
            }, function (status, response) {
                _this.error(error, path, `Couldn't load image: ${path}`);
            })
        } else {
            let image = new Image();
            image.crossOrigin = "anonymous";
            image.onload = () => {
                this.success(success, path, this.textureLoader(image));
            };
            image.onerror = () => {
                this.error(error, path, `Couldn't load image: ${path}`);
            };
            if (this.downloader.rawDataUris[path])
                path = this.downloader.rawDataUris[path];
            image.src = path;
        }
    }
    spine_4_2.AssetManager.prototype.downloadImageBitmap = spine.webgl.AssetManager.prototype.downloadImageBitmap
}

if (self.spine_4_1 && self.spine) {
    // 给4.0的mvp添加新的方法.
    spine_4_1.Matrix4.prototype.scale = spine.webgl.Matrix4.prototype.scale
    spine_4_1.Matrix4.prototype.rotate = spine.webgl.Matrix4.prototype.rotate
    spine_4_1.Matrix4.prototype.concat = spine.webgl.Matrix4.prototype.concat
    spine_4_1.Matrix4.prototype.setPos2D = spine.webgl.Matrix4.prototype.setPos2D
    spine_4_1.Matrix4.prototype.originTranslate = spine_4.Matrix4.prototype.translate
    spine_4_1.Matrix4.prototype.translate = spine.webgl.Matrix4.prototype.translate

    // 4.0 loadTexture在无名杀手机上莫名其妙不能加载需要改造... 花了我好长时间排错找
    spine_4_1.AssetManager.prototype.loadTexture =  function loadTexture(path, success = null, error = null) {
        path = this.start(path);
        let isBrowser = !!(typeof window !== "undefined" && typeof navigator !== "undefined" && window.document);
        let isWebWorker = !isBrowser;
        let _this = this
        if (isWebWorker) {
            this.downloadImageBitmap(path, function (imageBitmap) {
                spine.lodedAssets[path] = imageBitmap;
                let texture = _this.textureLoader(imageBitmap);
                _this.success(success, path, texture);
            }, function (status, response) {
                _this.error(error, path, `Couldn't load image: ${path}`);
            })
        } else {
            let image = new Image();
            image.crossOrigin = "anonymous";
            image.onload = () => {
                this.success(success, path, this.textureLoader(image));
            };
            image.onerror = () => {
                this.error(error, path, `Couldn't load image: ${path}`);
            };
            if (this.downloader.rawDataUris[path])
                path = this.downloader.rawDataUris[path];
            image.src = path;
        }
    }
    spine_4_1.AssetManager.prototype.downloadImageBitmap = spine.webgl.AssetManager.prototype.downloadImageBitmap
}

if (self.spine_4 && self.spine) {
    // 给4.0的mvp添加新的方法.
    spine_4.Matrix4.prototype.scale = spine.webgl.Matrix4.prototype.scale
    spine_4.Matrix4.prototype.rotate = spine.webgl.Matrix4.prototype.rotate
    spine_4.Matrix4.prototype.concat = spine.webgl.Matrix4.prototype.concat
    spine_4.Matrix4.prototype.setPos2D = spine.webgl.Matrix4.prototype.setPos2D
    spine_4.Matrix4.prototype.originTranslate = spine_4.Matrix4.prototype.translate
    spine_4.Matrix4.prototype.translate = spine.webgl.Matrix4.prototype.translate

    // 4.0 loadTexture在无名杀手机上莫名其妙不能加载需要改造... 花了我好长时间排错找
    spine_4.AssetManager.prototype.loadTexture =  function loadTexture(path, success = null, error = null) {
        path = this.start(path);
        let isBrowser = !!(typeof window !== "undefined" && typeof navigator !== "undefined" && window.document);
        let isWebWorker = !isBrowser;
        let _this = this
        if (isWebWorker) {
            this.downloadImageBitmap(path, function (imageBitmap) {
                spine.lodedAssets[path] = imageBitmap;
                let texture = _this.textureLoader(imageBitmap);
                _this.success(success, path, texture);
            }, function (status, response) {
                _this.error(error, path, `Couldn't load image: ${path}`);
            })
        } else {
            let image = new Image();
            image.crossOrigin = "anonymous";
            image.onload = () => {
                this.success(success, path, this.textureLoader(image));
            };
            image.onerror = () => {
                this.error(error, path, `Couldn't load image: ${path}`);
            };
            if (this.downloader.rawDataUris[path])
                path = this.downloader.rawDataUris[path];
            image.src = path;
        }
    }
    spine_4.AssetManager.prototype.downloadImageBitmap = spine.webgl.AssetManager.prototype.downloadImageBitmap
}

if (self.spine3_8 && self.spine) {
    // 给4.0的mvp添加新的方法.
    spine3_8.webgl.Matrix4.prototype.scale = spine.webgl.Matrix4.prototype.scale
    spine3_8.webgl.Matrix4.prototype.rotate = spine.webgl.Matrix4.prototype.rotate
    spine3_8.webgl.Matrix4.prototype.concat = spine.webgl.Matrix4.prototype.concat
    spine3_8.webgl.Matrix4.prototype.setPos2D = spine.webgl.Matrix4.prototype.setPos2D
    spine3_8.webgl.Matrix4.prototype.originTranslate = spine_4.Matrix4.prototype.translate
    spine3_8.webgl.Matrix4.prototype.translate = spine.webgl.Matrix4.prototype.translate

    //
    // 	spine3_8.TextureAtlasReader = TextureAtlasReader;

    spine3_8.webgl.AssetManager.prototype.loadTexture = spine.webgl.AssetManager.prototype.loadTexture
    spine3_8.webgl.AssetManager.prototype.downloadImageBitmap = spine.webgl.AssetManager.prototype.downloadImageBitmap
    spine3_8.webgl.AssetManager.prototype.downloadText = spine.webgl.AssetManager.prototype.downloadText

}

const Ani4StartId = 40000  // 4.0spine内部维护的起始id
const Ani3_8StartId = 50000  // 3.8spine内部维护的起始id
const Ani3_5_35_StartId = 60000  // 3.5.35和3.5版本之前的spine内部维护的起始id
const Ani3_7_StartId = 70000  // 3.7版本之前的spine内部维护的起始id
const Ani4_1_StartId = 80000  // 4.1版本之前的spine内部维护的起始id
const Ani4_2_StartId = 90000  // 4.1版本之前的spine内部维护的起始id
const SupportSpineVersion = {
    v3_6: '3.6',
    v4_0: '4.0',
    v3_8: '3.8',
    v3_5_35: '3.5.35',
    v3_7: '3.7',
    v4_1: '4.1',
    v4_2: '4.2'
}

class BaseAPNode {
    constructor(initParam) {
        if (initParam == null) initParam = {};
        this.id = undefined;								// 内部属性，不可更改
        this.x = initParam.x;
        this.y = initParam.y;
        this.height = initParam.height;
        this.width = initParam.width;
        this.angle = initParam.angle;
        this.scale = initParam.scale;
        this.opacity = initParam.opacity;
        this.clip = initParam.clip;
        this.hideSlots = initParam.hideSlots;
        this.clipSlots = initParam.clipSlots;
        this.disableMask = initParam.disableMask;
        this.renderX = undefined;							// 内部属性，不可更改
        this.renderY = undefined;							// 内部属性，不可更改
        this.renderAngle = undefined;						// 内部属性，不可更改
        this.renderScale = undefined;						// 内部属性，不可更改
        this.renderOpacity = undefined;						// 内部属性，不可更改
        this.renderClip = undefined;						// 内部属性，不可更改
        this.skeleton = initParam.skeleton;					// 内部属性，不可更改
        this.name = initParam.name;							// 内部属性，不可更改
        this.action = initParam.action;						// 内部属性，不可更改
        this.loop = initParam.loop;
        this.loopCount = initParam.loopCount;
        this.speed = initParam.speed;
        this.onupdate = initParam.onupdate;
        this.oncomplete = initParam.oncomplete;
        this.completed = true;								// 内部属性，不可更改
        this.referNode = initParam.referNode;
        this.referFollow = initParam.referFollow;
        this.referBounds = undefined;						// 内部属性，不可更改
        this.timestepMap = {};								// 内部属性，不可更改
        this.flipX = initParam.flipX;
        this.flipY = initParam.flipY;
        this.player = initParam.player
        this.premultipliedAlpha = initParam.alpha  // alpha预乘
        this.mvp = undefined  // 控制变换平移
        this.viewportNode = initParam.viewportNode  // 用来单独控制viewport裁剪用的node节点
    }

    fadeTo (opacity, duration) {
        if (opacity != null) {
            this.updateTimeStep('opacity', (this.opacity == null ? 1 : this.opacity), opacity, duration);
            this.opacity = opacity;
        }

        return this;
    }

    moveTo (x, y, duration) {
        if (x != null) {
            this.updateTimeStep('x', (this.x == null ? [0, 0.5] : this.x), x, duration);
            this.x = x;
        }

        if (y != null) {
            this.updateTimeStep('y', (this.y == null ? [0, 0.5] : this.y), y, duration);
            this.y = y;
        }

        return this;
    };

    scaleTo (scale, duration) {
        if (scale != null) {
            this.updateTimeStep('scale', (this.scale == null ? 1 : this.scale), scale, duration);
            this.scale = scale;
        }

        return this;
    };

    rotateTo (angle, duration) {
        if (angle != null) {
            this.updateTimeStep('angle', (this.angle == null ? 0 : this.angle), angle, duration);
            this.angle = angle;
        }

        return this;
    };

    update (e) {
        function calc(value, refer, dpr) {
            if (Array.isArray(value)) {
                return value[0] * dpr + value[1] * refer;
            } else {
                return value * dpr;
            }
        }

        var domX, domY, domDefaultX, domDefaultY;
        var dpr = e.dpr;
        var referSize = { width: e.canvas.width, height: e.canvas.height };
        var domNode = this.referNode instanceof HTMLElement ? this.referNode : undefined;
        if (domNode) {
            if (this.referFollow || !this.referBounds) {
                var rect = domNode.getBoundingClientRect();
                let y
                if (window.decadeUI) {
                    y = decadeUI.get.bodySize().height - rect.bottom
                } else {
                    y = domNode.bodySize.bodyHeight - rect.bottom
                }
                this.referBounds = {
                    x: rect.left,
                    y: y,
                    width: rect.width,
                    height: rect.height,
                };
            }

            referSize.height = this.referBounds.height * dpr;
            referSize.width = this.referBounds.width * dpr;
        }

        var timestep, percent;
        var renderX, renderY, renderScale, renderScaleX, renderScaleY;
        var skeletonSize = this.skeleton.bounds.size;

        timestep = this.timestepMap.x;
        if (timestep != null && !timestep.completed) {
            timestep.update(e.delta);
            renderX = calc(timestep.current, referSize.width, dpr);
        } else if (this.x != null) {
            renderX = calc(this.x, referSize.width, dpr);
        }

        timestep = this.timestepMap.y;
        if (timestep != null && !timestep.completed) {
            timestep.update(e.delta);
            renderY = calc(timestep.current, referSize.height, dpr);
        } else if (this.y != null) {
            renderY = calc(this.y, referSize.height, dpr);
        }


        if (this.width != null) renderScaleX = calc(this.width, referSize.width, dpr) / skeletonSize.x;
        if (this.height != null) renderScaleY = calc(this.height, referSize.height, dpr) / skeletonSize.y;

        if (domNode) {
            if (renderX == null) {
                renderX = (this.referBounds.x + this.referBounds.width / 2) * dpr;
            } else {
                renderX += this.referBounds.x * dpr;
            }

            if (renderY == null) {
                renderY = (this.referBounds.y + this.referBounds.height / 2) * dpr;
            } else {
                renderY += this.referBounds.y * dpr;;
            }
        }

        this.mvp.ortho2d(0, 0, e.canvas.width, e.canvas.height);
        if (renderX !== void 0 && renderY == void 0) {
            this.mvp.translate(renderX, 0, 0);
            this.mvp.setY(0);
        } else if (renderX == void 0 && renderY !== void 0) {
            this.mvp.translate(0, renderY, 0);
            this.mvp.setX(0);
        } else if (renderX !== void 0 && renderY !== void 0) {
            this.mvp.translate(renderX, renderY, 0);
        } else {
            this.mvp.setPos2D(0, 0);
        }

        timestep = this.timestepMap.scale;
        if (timestep != null && !timestep.completed) {
            timestep.update(e.delta);
            renderScale = timestep.current;
        } else {
            renderScale = (this.scale == null ? 1 : this.scale);
        }

        if (renderScaleX && !renderScaleY) {
            renderScale *= renderScaleX;
        } else if (!renderScaleX && renderScaleY) {
            renderScale *= renderScaleY;
        } else if (renderScaleX && renderScaleY) {
            renderScale *= Math.min(renderScaleX, renderScaleY);
        } else {
            renderScale *= dpr;
        }

        if (renderScale !== 1) {
            this.mvp.scale(renderScale, renderScale, 0);
        }

        timestep = this.timestepMap.angle;
        if (timestep != null && !timestep.completed) {
            timestep.update(e.delta);
            this.renderAngle = timestep.current;
        } else {
            this.renderAngle = this.angle;
        }

        if (this.renderAngle) {
            this.mvp.rotate(this.renderAngle, 0, 0, 1);
        }

        timestep = this.timestepMap.opacity;
        if (timestep != null && !timestep.completed) {
            timestep.update(e.delta);
            this.renderOpacity = timestep.current;
        } else {
            this.renderOpacity = this.opacity;
        }

        this.renderX = renderX;
        this.renderY = renderY;
        this.renderScale = renderScale;
        if (this.clip) {
            this.renderClip = {
                x: calc(this.clip.x, e.canvas.width, dpr),
                y: calc(this.clip.y, e.canvas.height, dpr),
                width: calc(this.clip.width, e.canvas.width, dpr),
                height: calc(this.clip.height, e.canvas.height, dpr)
            };
        }

        if (this.onupdate) this.onupdate();
    };

    setAction (action, transtion) {
        if (this.skeleton && this.skeleton.node == this) {
            if (this.skeleton.data.findAnimation(action) == null) return console.error('setAction: 未找到对应骨骼动作');
            transtion = transtion == null ? 0.5 : transtion / 1000;
            var entry = this.skeleton.state.setAnimation(0, action, this.loop);
            entry.mixDuration = transtion;
        } else {
            console.error('setAction: 节点失去关联');
        }
    };

    resetAction (transtion) {
        if (this.skeleton && this.skeleton.node == this) {
            transtion = transtion == null ? 0.5 : transtion / 1000;
            var entry = this.skeleton.state.setAnimation(0, this.skeleton.defaultAction, this.loop);
            entry.mixDuration = transtion;
        } else {
            console.error('resetAction: 节点失去关联');
        }
    };

    complete () {
        if (!this.oncomplete)
            return;

        if (typeof this.oncomplete == 'string') {
            var code = this.oncomplete;
            var a = code.indexOf('{');
            var b = code.lastIndexOf('}');
            if (a == -1 || b == -1) {
                this.oncomplete = undefined;
                return console.error(this.name + ' 的oncomplete函数语法错误');
            }

            this.oncomplete = new Function(code.substring(a + 1, b));
        }


        if (typeof this.oncomplete == 'function')
            this.oncomplete();
    };

    updateTimeStep (key, start, end, duration) {
        if (duration == null || duration == 0)
            return;

        var timestep = this.timestepMap[key];
        if (timestep) {
            timestep.start = timestep.completed ? start : timestep.current;
            timestep.end = end;
            timestep.time = 0;
            timestep.percent = 0;
            timestep.completed = false;
            timestep.duration = duration;
        } else {
            timestep = this.timestepMap[key] = new TimeStep({
                start: start,
                end: end,
                duration: duration,
            });
        }

        return timestep;
    }
}

class APNode3_6 extends BaseAPNode {
    constructor(initParam) {
        super(initParam)
        this.mvp = new spine.webgl.Matrix4()
    }
}

class APNode4_0 extends BaseAPNode {
    constructor(initParam) {
        super(initParam)
        // this.mvp = new spine.webgl.Matrix4()
        this.mvp = new spine_4.Matrix4()
    }
}

class APNode4_1 extends BaseAPNode {
    constructor(initParam) {
        super(initParam)
        this.mvp = new spine_4_1.Matrix4()
    }
}
class APNode4_2 extends BaseAPNode {
    constructor(initParam) {
        super(initParam)
        this.mvp = new spine_4_2.Matrix4()
    }
}

class APNode3_8 extends BaseAPNode {
    constructor(initParam) {
        super(initParam)
        this.mvp = new spine3_8.webgl.Matrix4()
    }
}


class CubicBezierEase {
    constructor(p1x, p1y, p2x, p2y) {
        this.cX = 3 * p1x;
        this.bX = 3 * (p2x - p1x) - this.cX;
        this.aX = 1 - this.cX - this.bX;

        this.cY = 3 * p1y;
        this.bY = 3 * (p2y - p1y) - this.cY;
        this.aY = 1 - this.cY - this.bY;
    }

   getX (t) {
        return t * (this.cX + t * (this.bX + t * this.aX));
    }

   getXDerivative(t) {
        return this.cX + t * (2 * this.bX + 3 * this.aX * t);
    }

    ease(x) {
        var prev,
            t = x;
        do {
            prev = t;
            t = t - ((this.getX(t) - x) / this.getXDerivative(t));
        } while (Math.abs(t - prev) > 1e-4);


        return t * (this.cY + t * (this.bY + t * this.aY));
    }
}

class TimeStep{
    constructor(initParam) {
        this.start = initParam.start;
        this.current = initParam.start;
        this.end = initParam.end;
        this.time = 0;
        this.percent = 0;
        this.duration = initParam.duration;
        this.completed = false;
    };

    lerp (min, max, fraction){
        return (max - min) * fraction + min;
    }

    ease(fraction){
        if (!this.b3ease) this.b3ease = new CubicBezierEase(0.25, 0.1, 0.25, 1);
        return this.b3ease.ease(fraction);
    }

    update (delta) {
        this.time += delta;
        this.percent = this.ease(Math.min(this.time / this.duration, 1));

        var start, end;
        var isArray = false;
        if (Array.isArray(this.start)) {
            isArray = true;
            start = this.start;
        } else {
            start = [this.start, 0];
        }

        if (Array.isArray(this.end)) {
            isArray = true;
            end = this.end;
        } else {
            end = [this.end, 0];
        }

        if (isArray) {
            this.current = [this.lerp(start[0], end[0], this.percent), this.lerp(start[1], end[1], this.percent)];
        } else {
            this.current = this.lerp(start[0], end[0], this.percent);
        }

        if (this.time >= this.duration) this.completed = true;
    };

}

class BaseAnimation {
    constructor() {
        this.spine = {}
        this.offscreen = true;
        this.gl = undefined;
        this.canvas = undefined;
        this.frameTime = undefined;
        this.running = false;
        this.resized = false;
        this.dpr = 1;
        this.nodes = [];
        this.BUILT_ID = 0;  // 管理当前的动画id.  每个动画id对应一个APNode对象, 存入nodes数组.
        this._dprAdaptive = false;

        this._fps = fps
        this._lastTime = 0

        Object.defineProperties(this, {
            dprAdaptive: {
                get:function(){
                    return this._dprAdaptive;
                },
                set:function(value){
                    if (this._dprAdaptive === value) return;
                    this._dprAdaptive = value;
                    this.resized = false;
                },
            },
            useMipMaps: {
                get:function(){
                    if (!gl) return;
                    return this.gl.useMipMaps;
                },
                set:function(value){
                    if (!gl) return;
                    this.gl.useMipMaps = value;
                },
            }
        });
    }

    newFpsRender(time) {
        if (this._fps && time - this._lastTime < 1000 / this._fps) {
            // console.log('返回')
            this.requestId = requestAnimationFrame(this.newFpsRender.bind(this))
            return
        }
        // let realFPS = 1000 / (time - this._lastTime)
        // console.log('real fps', realFPS, this._fps)
        this.render(time)
        this._lastTime = time
    }

    hasSpine(filename) {
        return this.spine.assets[filename] != null;
    };

    removeSpine(filename, skelType) {
        // 移除已经加载好的spine资源, 节省内存
        if (this.hasSpine(filename)) {
            for (let suffix of ['.png', '.atlas', '.' + skelType]) {
                this.spine.assetManager.remove(filename + suffix)
            }
            delete this.spine.assets[filename]
        }
    }

    loopSpine(sprite, position) {
        if (typeof sprite == 'string') {
            sprite = {
                name: sprite,
                loop: true,
            }
        } else {
            sprite.loop = true;
        }

        return this.playSpine(sprite, position);
    };

    stopSpineAll() {
        let sprite;
        let nodes = this.nodes;
        for (let i = 0; i < nodes.length; i++) {
            sprite = nodes[i];
            if (!sprite.completed) {
                sprite.completed = true;
                sprite.skeleton.state.setEmptyAnimation(0);
            }
        }
    }

    getSpineActions(filename, toLoadActions) {
        if (!this.hasSpine(filename)) return console.error('getSpineActions: [' + filename + '] 骨骼没有加载');;
        let skeleton;
        let skeletons = this.spine.skeletons;
        for (let i = 0; i < skeletons.length; i++) {
            skeleton = skeletons[i];
            if (skeleton.name === filename) break;
            skeleton = undefined;
        }

        if (skeleton == null) skeleton = this.prepSpine(filename, false, toLoadActions);
        let actions = skeleton.data.animations;
        let result = new Array(actions.length);
        for (let i = 0; i < actions.length; i++) result[i] = { name: actions[i].name, duration: actions[i].duration };
        return result;
    }

    getSpineBounds(filename) {
        if (!this.hasSpine(filename)) return console.error('getSpineBounds: [' + filename + '] 骨骼没有加载');

        let skeleton;
        let skeletons = this.spine.skeletons;
        for (let i = 0; i < skeletons.length; i++) {
            skeleton = skeletons[i];
            if (skeleton.name === filename) break;
            skeleton = undefined;
        }

        if (skeleton == null) skeleton = this.prepSpine(filename);
        return skeleton.bounds;
    }

    loadSpine(filename, skelType, onload, onerror) {}


    prepSpine(filename, autoLoad, toLoadActions) {}

    playSpine(sprite, position){}

    stopSpine(sprite) {}

    render(timestamp) {}

    update(data) {
        if (!data) data = {}
        this.resized = false
        if (data.dpr != null) this.dpr = data.dpr;
        if (data.dprAdaptive != null) this.dprAdaptive = data.dprAdaptive;
        if (data.outcropMask != null) this.outcropMask = data.outcropMask;
        if (data.useMipMaps != null) this.useMipMaps = data.useMipMaps;
        if (data.width != null) this.width = data.width;
        if (data.height != null) this.height = data.height;
    }

    // 添加显示部件名称的方法
    showPartsNames(filename) {
        if (!this.hasSpine(filename)) return console.error('showPartsNames: [' + filename + '] 骨骼没有加载');
        
        let skeleton;
        let skeletons = this.spine.skeletons;
        for (let i = 0; i < skeletons.length; i++) {
            skeleton = skeletons[i];
            if (skeleton.name === filename) break;
            skeleton = undefined;
        }
        
        if (skeleton == undefined) skeleton = this.prepSpine(filename);
        
        // 切换显示部件名称的标志
        this.showSlotNames = !this.showSlotNames;
        
        // 清除已有的文本元素
        if (this.slotNameTexts) {
            for (let i = 0; i < this.slotNameTexts.length; i++) {
                if (this.slotNameTexts[i] && this.slotNameTexts[i].parentNode) {
                    this.slotNameTexts[i].parentNode.removeChild(this.slotNameTexts[i]);
                }
            }
        }
        
        this.slotNameTexts = [];
        
        // 如果开启了显示部件名称，则显示所有部件的名称
        if (this.showSlotNames) {
            let slots = skeleton.slots;
            let canvas = this.canvas;
            let container = canvas.parentNode || document.body;
            
            for (let i = 0; i < slots.length; i++) {
                let slot = slots[i];
                if (!slot.attachment) continue;
                
                let nameElement = document.createElement('div');
                nameElement.style.position = 'absolute';
                nameElement.style.color = 'white';
                nameElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                nameElement.style.padding = '2px 5px';
                nameElement.style.borderRadius = '3px';
                nameElement.style.fontSize = '12px';
                nameElement.style.zIndex = '9999';
                nameElement.style.pointerEvents = 'none';
                nameElement.textContent = slot.data.name;
                nameElement.setAttribute('data-slot-index', i); // 添加索引，方便更新位置时识别
                
                container.appendChild(nameElement);
                this.slotNameTexts.push(nameElement);
            }
            
            // 添加更新部件名称位置的函数到渲染循环中
            this._updateSlotNamePositions = true;
        } else {
            this._updateSlotNamePositions = false;
        }
        
        return this.showSlotNames;
    }
    
    // 辅助函数：更新部件名称的位置
    updateSlotNamesPosition(skeleton) {
        if (!this._updateSlotNamePositions || !this.slotNameTexts || this.slotNameTexts.length === 0) return;
        
        const canvas = this.canvas;
        const rect = canvas.getBoundingClientRect();
        const slots = skeleton.slots;
        const worldVertices = new Float32Array(8);
        
        for (let i = 0; i < this.slotNameTexts.length; i++) {
            const nameElement = this.slotNameTexts[i];
            const slotIndex = parseInt(nameElement.getAttribute('data-slot-index'));
            if (isNaN(slotIndex) || slotIndex >= slots.length) continue;
            
            const slot = slots[slotIndex];
            if (!slot || !slot.attachment) continue;
            
            // 根据附件类型计算位置
            let x, y;
            
            if (slot.attachment.computeWorldVertices) {
                try {
                    slot.attachment.computeWorldVertices(slot, 0, slot.attachment.worldVerticesLength, worldVertices, 0, 2);
                    // 计算中心点
                    x = 0; y = 0;
                    const vertexCount = slot.attachment.worldVerticesLength / 2;
                    for (let v = 0; v < slot.attachment.worldVerticesLength; v += 2) {
                        x += worldVertices[v];
                        y += worldVertices[v + 1];
                    }
                    x /= vertexCount;
                    y /= vertexCount;
                } catch (e) {
                    // 使用骨骼位置作为替代
                    x = slot.bone.worldX;
                    y = slot.bone.worldY;
                }
            } else {
                // 使用骨骼位置作为替代
                x = slot.bone.worldX;
                y = slot.bone.worldY;
            }
            
            // 转换为屏幕坐标
            x = rect.left + (x * canvas.clientWidth / canvas.width);
            y = rect.top + (rect.height - y * canvas.clientHeight / canvas.height);
            
            // 更新文本元素位置
            nameElement.style.left = (x - nameElement.offsetWidth / 2) + 'px';
            nameElement.style.top = (y - nameElement.offsetHeight - 5) + 'px';
        }
    }

}

class Animation3_6 extends BaseAnimation {
    constructor (pathPrefix, canvas, dpr, isOffscreen) {
        super()
        if (!self.spine) return console.error('spine 未定义.');

        let config = { alpha: true, preserveDrawingBuffer: true };  // 可能需要保留缓冲区
        let gl = canvas.getContext('webgl2', config);
        if (gl == null) {
            gl = canvas.getContext('webgl', config) || canvas.getContext('experimental-webgl', config);
        } else {
            gl.isWebgl2 = true;
        }
        if (isOffscreen != null) {
            this.offscreen = isOffscreen
        }
        if (gl) {
            // 定义了spine动画的相关上下文, 都是后面渲染动画需要的内容, 文档可以参考官方后面的文档, 当前的文档找不到了, 只能找到ts版本的了.
            // https://github.com/EsotericSoftware/spine-runtimes/blob/726ad4ddbe5c9c8b386b495692c2f55c2039d15d/spine-ts/spine-webgl/example/index.html#L64
            this.spine = {
                shader: spine.webgl.Shader.newTwoColoredTextured(gl),
                batcher: new spine.webgl.PolygonBatcher(gl),
                skeletonRenderer: new spine.webgl.SkeletonRenderer(gl),
                assetManager: new spine.webgl.AssetManager(gl, pathPrefix),
                assets: {},
                skeletons: [],
            }
        } else {
            this.spine = { assets: {} };
            console.error('当前设备不支持 WebGL.');
        }
        this.gl = gl;
        this.canvas = canvas;
        this.dpr = dpr
        this.dprAdaptive = true
        this.spineLib = spine
    };

    createTextureRegion(image, name) {
        var page = new spine.TextureAtlasPage();
        page.name = name;
        page.uWrap = spine.TextureWrap.ClampToEdge;
        page.vWrap = spine.TextureWrap.ClampToEdge;
        page.texture = this.spine.assetManager.textureLoader(image);
        page.texture.setWraps(page.uWrap, page.vWrap);
        page.width = page.texture.getImage().width;
        page.height = page.texture.getImage().height;
        var region = new spine.TextureAtlasRegion();
        region.page = page;
        region.rotate = false;
        region.width = page.width;
        region.height = page.height;
        region.x = 0;
        region.y = 0;
        region.u = region.x / page.width;
        region.v = region.y / page.height;
        if (region.rotate) {
            region.u2 = (region.x + region.height) / page.width;
            region.v2 = (region.y + region.width) / page.height;
        }
        else {
            region.u2 = (region.x + region.width) / page.width;
            region.v2 = (region.y + region.height) / page.height;
        }

        region.originalWidth = page.width;
        region.originalHeight = page.height;
        region.index = -1;
        region.texture = page.texture;
        region.renderObject = region;

        return region;
    };

    loadSpine(filename, skelType, onload, onerror) {
        skelType = skelType == null ? 'skel' : skelType.toLowerCase();
        var thisAnim = this;
        var reader = {
            name: filename,
            filename: filename,
            skelType: skelType,
            onsuccess: onload,
            onfailed: onerror,
            loaded: 0,
            errors: 0,
            toLoad: 2,
            onerror:function(path, msg){
                var _this = reader;
                _this.toLoad--;
                _this.errors++;
                if (_this.toLoad == 0) {
                    console.error('loadSpine: [' + _this.filename + '] 加载失败.');
                    if (_this.onfailed) _this.onfailed();
                }
            },
            onload:function(path, data){
                var _this = reader;
                _this.toLoad--;
                _this.loaded++;
                if (_this.toLoad == 0) {
                    if (_this.errors > 0) {
                        console.error('loadSpine: [' + _this.filename + '] 加载失败.');
                        if (_this.onfailed) _this.onfailed();
                    } else {
                        thisAnim.spine.assets[_this.filename] = { name: _this.filename, skelType: _this.skelType };
                        if (_this.onsuccess) _this.onsuccess();
                    }
                }
            },
            ontextLoad:function(path, data){
                var _this = reader;
                var imageName = null;
                var atlasReader = new spine.TextureAtlasReader(data);
                var prefix = '';
                var a = _this.name.lastIndexOf('/');
                var b = _this.name.lastIndexOf('\\');
                if (a != -1 || b != -1) {
                    if (a > b)
                        prefix = _this.name.substring(0, a + 1);
                    else
                        prefix = _this.name.substring(0, b + 1);
                }

                while (true) {
                    var line = atlasReader.readLine();
                    if (line == null) break;
                    line = line.trim();

                    if (line.length == 0) {
                        imageName = null;
                    } else if (!imageName) {
                        imageName = line;
                        _this.toLoad++;
                        thisAnim.spine.assetManager.loadTexture(prefix + imageName,
                            _this.onload, _this.onerror);
                    } else {
                        continue;
                    }
                }

                _this.onload(path, data);
            },
        };

        if (skelType == 'json') {
            thisAnim.spine.assetManager.loadText(filename + '.json',
                reader.onload, reader.onerror);
        } else {
            thisAnim.spine.assetManager.loadBinary(filename + '.skel',
                reader.onload, reader.onerror);
        }

        thisAnim.spine.assetManager.loadText(filename + '.atlas',
            reader.ontextLoad, reader.onerror);
    };

    prepSpine(filename, autoLoad, toLoadActions) {
        var _this = this;
        var spineAssets = _this.spine.assets;
        if (!spineAssets[filename]) {
            if (autoLoad) {
                _this.loadSpine(filename, 'skel', function(){
                    _this.prepSpine(filename);
                });
                return 'loading';
            }
            return console.error('prepSpine: [' + filename + '] 骨骼没有加载');;
        }

        var skeleton;
        var skeletons = _this.spine.skeletons;
        for (var i = 0; i < skeletons.length; i++) {
            skeleton = skeletons[i];
            if (skeleton.name == filename && skeleton.completed) return skeleton;
        }

        var asset = spineAssets[filename];
        var manager = _this.spine.assetManager;

        // 下面的获取原始数据是spine动画的固定写法, api可以参考官网 https://github.com/EsotericSoftware/spine-runtimes/blob/726ad4ddbe5c9c8b386b495692c2f55c2039d15d/spine-ts/spine-webgl/example/index.html#L158
        var skelRawData = asset.skelRawData;
        if (!skelRawData) {
            var prefix = '';
            var a = filename.lastIndexOf('/');
            var b = filename.lastIndexOf('\\');
            if (a != -1 || b != -1) {
                if (a > b)
                    prefix = filename.substring(0, a + 1);
                else
                    prefix = filename.substring(0, b + 1);
            }
            var atlas = new spine.TextureAtlas(manager.get(filename + '.atlas'), function(path){
                return manager.get(prefix + path);
            });

            var atlasLoader = new spine.AtlasAttachmentLoader(atlas);
            if (asset.skelType.toLowerCase() == 'json') {
                skelRawData = new spine.SkeletonJson(atlasLoader);
            } else {
                skelRawData = new spine.SkeletonBinary(atlasLoader);
            }

            spineAssets[filename].skelRawData = skelRawData;
            spineAssets[filename].ready = true;
        }

        var data = skelRawData.readSkeletonData(manager.get(filename + '.' + asset.skelType), toLoadActions);
        skeleton = new spine.Skeleton(data);

        // 为骨骼添加名字
        skeleton.name = filename;
        // 标记骨骼加载状态为true
        skeleton.completed = true;

        skeleton.setSkinByName('default');
        skeleton.setToSetupPose();
        skeleton.updateWorldTransform();
        skeleton.state = new spine.AnimationState(new spine.AnimationStateData(skeleton.data));
        skeleton.state.addListener({
            complete:function(track){
                var node = skeleton.node;
                if (node) {
                    track.loop = (node.loop == null ? false : node.loop);
                    if (track.loop && node.loopCount > 0) {
                        node.loopCount--;
                        if (node.loopCount == 0) track.loop = false;
                    }
                    skeleton.completed = node.completed = !track.loop;
                    if (node.complete) node.complete();
                } else {
                    skeleton.completed = !track.loop;
                    console.error('skeleton complete: 超出预期的错误');
                }
            }
        });
        skeleton.bounds = { offset: new spine.Vector2(), size: new spine.Vector2() };
        skeleton.getBounds(skeleton.bounds.offset, skeleton.bounds.size, []);
        skeleton.defaultAction = data.animations[0].name;
        skeleton.node = undefined;
        skeletons.push(skeleton);
        return skeleton;
    };

    playSpine(sprite, position){
        if (sprite == null) return console.error('playSpine: parameter undefined');
        if (typeof sprite == 'string') sprite = { name: sprite }

        if (!this.hasSpine(sprite.name)) return console.error('playSpine: [' + sprite.name + '] 骨骼没有加载');

        var skeletons = this.spine.skeletons;
        var skeleton;
        if (!(sprite instanceof APNode3_6 && sprite.skeleton.completed)) {
            for (var i = 0; i < skeletons.length; i++) {
                skeleton = skeletons[i];
                if (skeleton.name == sprite.name && skeleton.completed) break;
                skeleton = null;
            }; if (!skeleton) skeleton = this.prepSpine(sprite.name, false, sprite.toLoadActions);

            if (!(sprite instanceof APNode3_6)) {
                var param = sprite;
                sprite = new APNode3_6(sprite);
                sprite.id = param.id == null ? this.BUILT_ID++ : param.id;
                this.nodes.push(sprite);
            }

            sprite.skeleton = skeleton;
            skeleton.node = sprite;
        }

        sprite.completed = false;
        skeleton.completed = false;

        if (position != null) {
            sprite.referNode = position.parent;
            sprite.referFollow = position.follow;
            for (let k in position) {
                sprite[k] = position[k]
            }
        }

        var entry = skeleton.state.setAnimation(0, sprite.action ? sprite.action : skeleton.defaultAction, sprite.loop);
        entry.mixDuration = 0;
        if (this.requestId == null) {
            this.running = true;
            if (!this.offscreen) this.canvas.style.visibility = 'visible';
            this.requestId = requestAnimationFrame(this.newFpsRender.bind(this));
        }

        sprite.referBounds = undefined;
        return sprite;
    };

    stopSpine(sprite) {
        var nodes = this.nodes;
        var id = sprite.id == null ? sprite : sprite.id;
        for (var i = 0; i < nodes.length; i++) {
            sprite = nodes[i];
            if (sprite.id == id) {
                if (!sprite.completed) {
                    sprite.completed = true;
                    sprite.skeleton.state.setEmptyAnimation(0);
                }
                return sprite;
            }
        }

        return null;
    };

    render(timestamp) {
        var canvas = this.canvas;
        var offscreen = this.offscreen;
        var dpr = 1;
        if (this.dprAdaptive) {
            if (offscreen)
                dpr = this.dpr != null ? this.dpr : 1;
            else
                dpr = Math.max(self.devicePixelRatio * (self.documentZoom ? self.documentZoom : 1), 1);
        }
        var delta = timestamp - ((this.frameTime == null) ? timestamp : this.frameTime);
        this.frameTime = timestamp;
        var erase = true;
        var resize = !this.resized || canvas.width == 0 || canvas.height == 0;
        if (resize) {
            this.resized = true;
            if (!offscreen) {
                canvas.width  = dpr * canvas.clientWidth;
                canvas.height = dpr * canvas.clientHeight;
                erase = false;
            } else {
                if (this.width)  {
                    canvas.width  = dpr * this.width;
                    erase = false;
                }
                if (this.height) {
                    canvas.height = dpr * this.height;
                    erase = false;
                }
            }
        }

        var ea = {
            dpr: dpr,
            delta: delta,
            canvas: canvas,
            frameTime: timestamp,
        };

        var nodes = this.nodes;
        for (var i = 0; i < nodes.length; i++) {
            if (!nodes[i].completed) {
                // 不需要重新viewport那么, 更新node状态
                // if (i === 3) {
                //     debugger
                // }
                if (!nodes[i].viewportNode) {
                    nodes[i].update(ea);
                }
            } else {
                nodes.remove(nodes[i]);i--;
            }
        }

        var gl = this.gl;
        gl.viewport(0, 0, canvas.width, canvas.height);

        // 因为有多个program公用一个gl上下文, 所以不能直接清除. 得控制让只有一个ani来执行.
        if (gl.renderAni == null) {
            gl.renderAni = this
        }

        if (erase && gl.renderAni === this) {
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }

        if (nodes.length === 0) {
            this.frameTime = void 0;
            this.requestId = void 0;
            this.running = false;
            gl.renderAni = null
            return;
        }
        
        // 如果开启了显示部件名称，则更新部件名称的位置
        if (this._updateSlotNamePositions && this.slotNameTexts && this.slotNameTexts.length > 0) {
            // 查找当前活动的骨骼
            for (var i = 0; i < this.spine.skeletons.length; i++) {
                if (!this.spine.skeletons[i].completed) {
                    this.updateSlotNamesPosition(this.spine.skeletons[i]);
                    break;
                }
            }
        }

        var sprite, state, skeleton;
        var shader = this.spine.shader;
        var batcher = this.spine.batcher;
        var renderer = this.spine.skeletonRenderer;

        gl.enable(gl.SCISSOR_TEST);
        gl.scissor(0, 0, canvas.width, canvas.height);

        if (this.bindShader == null) {
            this.bindShader = shader;
            shader.bind();
            shader.setUniformi(spine.webgl.Shader.SAMPLER, 0);
        }

        var speed;
        for (var i = 0; i < nodes.length; i++) {
            sprite = nodes[i];
            if (sprite.renderClip != null) {
                gl.clipping = sprite.renderClip;
                gl.scissor(gl.clipping.x, gl.clipping.y, gl.clipping.width, gl.clipping.height);
            }

            if (sprite.viewportNode) {
                let rect = sprite.viewportNode.getBoundingClientRect()
                let canvasRect = canvas.getBoundingClientRect()
                let width  = rect.right - rect.left;
                let height = rect.bottom - rect.top;
                if (rect.x + width - canvasRect.x < 0 || rect.x - canvasRect.x > canvasRect.width) {
                    continue;  // 超出canvas外面了, 不用计算世界位置了, 忽略
                }

                // 重新更新一下node的值
                sprite.update({
                    dpr: dpr,
                    delta: delta,
                    canvas: {width: width * dpr, height: height * dpr},
                    frameTime: timestamp,
                })
                // 将当前视口选在小窗的位置上
                gl.viewport((rect.x - canvasRect.x) * dpr, (canvasRect.bottom - rect.bottom) * dpr, width * dpr, height * dpr);
                gl.scissor((rect.x - canvasRect.x) * dpr, (canvasRect.bottom - rect.bottom) * dpr, width * dpr, height * dpr);
            }

            skeleton = sprite.skeleton;
            state = skeleton.state;
            speed = sprite.speed == null ? 1 : sprite.speed;
            skeleton.flipX = sprite.flipX;
            skeleton.flipY = sprite.flipY
            skeleton.opacity = (sprite.renderOpacity == null ? 1 : sprite.renderOpacity);
            state.hideSlots = sprite.hideSlots;
            state.update(delta / 1000 * speed);
            state.apply(skeleton);
            skeleton.updateWorldTransform();

            // gl.linkProgram(this.spine.shader.program);
            gl.useProgram(this.spine.shader.program);

            shader.setUniform4x4f(spine.webgl.Shader.MVP_MATRIX, sprite.mvp.values);
            batcher.begin(shader);
            renderer.premultipliedAlpha = sprite.premultipliedAlpha;
            renderer.outcropMask = this.outcropMask;
            if (renderer.outcropMask) {
                renderer.outcropX = sprite.renderX;
                renderer.outcropY = sprite.renderY;
                renderer.outcropScale = sprite.renderScale;
                renderer.outcropAngle = sprite.renderAngle;
                renderer.clipSlots = sprite.clipSlots;
            }

            renderer.hideSlots = sprite.hideSlots;
            renderer.disableMask = sprite.disableMask;
            renderer.draw(batcher, skeleton);
            batcher.end();

            if (gl.clipping) {
                gl.clipping = undefined;
                gl.scissor(0, 0, canvas.width, canvas.height);
            }
            if (sprite.viewportNode) {
                gl.viewport(0, 0, canvas.width, canvas.height);
                gl.scissor(0, 0, canvas.width, canvas.height);
            }
        }

        gl.disable(gl.SCISSOR_TEST);

        this.requestId = requestAnimationFrame(this.newFpsRender.bind(this));
    };
}

class Animation4_0 extends BaseAnimation{

    constructor (pathPrefix, canvas, dpr, isOffscreen) {
        super()
        if (!self.spine_4) return console.error('spine4 未定义.');
        let config = { alpha: true };
        let gl = canvas.getContext('webgl2', config);
        if (gl == null) {
            gl = canvas.getContext('webgl', config) || canvas.getContext('experimental-webgl', config);
        } else {
            gl.isWebgl2 = true;
        }
        if (isOffscreen != null) {
            this.offscreen = isOffscreen
        }
        if (gl) {
            // 定义了spine动画的相关上下文, 都是后面渲染动画需要的内容, 文档可以参考官方后面的文档, 当前的文档找不到了, 只能找到ts版本的了.
            // https://github.com/EsotericSoftware/spine-runtimes/blob/726ad4ddbe5c9c8b386b495692c2f55c2039d15d/spine-ts/spine-webgl/example/index.html#L64
            this.spine = {
                shader: spine_4.Shader.newTwoColoredTextured(gl),
                batcher: new spine_4.PolygonBatcher(gl),
                skeletonRenderer: new spine_4.SkeletonRenderer(gl),
                assetManager: new spine_4.AssetManager(gl, pathPrefix),
                assets: {},
                skeletons: [],
            }
        } else {
            this.spine = { assets: {} };
            console.error('当前设备不支持 WebGL.');
        }
        this.gl = gl;
        this.canvas = canvas;
        this.BUILT_ID = Ani4StartId;  // 4.0的id从40000开始
        this.dpr = dpr
        this.dprAdaptive = true
        this.spineLib = spine_4
    }

    // 不知道下面这个函数的作用, 保留, 出错再修改...
    createTextureRegion(image, name) {
        let page = new spine_4.TextureAtlasPage();
        page.name = name;
        page.uWrap = spine_4.TextureWrap.ClampToEdge;
        page.vWrap = spine_4.TextureWrap.ClampToEdge;
        page.texture = this.spine.assetManager.textureLoader(image);
        page.texture.setWraps(page.uWrap, page.vWrap);
        page.width = page.texture.getImage().width;
        page.height = page.texture.getImage().height;

        let region = new spine_4.TextureAtlasRegion();
        region.page = page;
        region.rotate = false;
        region.width = page.width;
        region.height = page.height;
        region.x = 0;
        region.y = 0;
        region.u = region.x / page.width;
        region.v = region.y / page.height;
        if (region.rotate) {
            region.u2 = (region.x + region.height) / page.width;
            region.v2 = (region.y + region.width) / page.height;
        }
        else {
            region.u2 = (region.x + region.width) / page.width;
            region.v2 = (region.y + region.height) / page.height;
        }

        region.originalWidth = page.width;
        region.originalHeight = page.height;
        region.index = -1;
        region.texture = page.texture;
        region.renderObject = region;

        return region;
    }

    loadTexture(path, success = null, error = null) {

        path = this.start(path);
        let isBrowser = !!(typeof window !== "undefined" && typeof navigator !== "undefined" && window.document);
        let isWebWorker = !isBrowser;
        let _this = this
        if (isWebWorker) {
            this.downloadImageBitmap(path, function (imageBitmap) {
                spine.lodedAssets[path] = imageBitmap;
                let texture = _this.textureLoader(imageBitmap);
                _this.success(success, path, texture);
            }, function (status, response) {
                _this.error(error, path, `Couldn't load image: ${path}`);
            })

            // fetch(path, { mode: "cors" }).then((response) => {
            //     if (response.ok)
            //         return response.blob();
            //     this.error(error, path, `Couldn't load image: ${path}`);
            //     return null;
            // }).then((blob) => {
            //     return blob ? createImageBitmap(blob, { premultiplyAlpha: "none", colorSpaceConversion: "none" }) : null;
            // }).then((bitmap) => {
            //     if (bitmap)
            //         this.success(success, path, this.textureLoader(bitmap));
            // });
        } else {
            let image = new Image();
            image.crossOrigin = "anonymous";
            image.onload = () => {
                this.success(success, path, this.textureLoader(image));
            };
            image.onerror = () => {
                this.error(error, path, `Couldn't load image: ${path}`);
            };
            if (this.downloader.rawDataUris[path])
                path = this.downloader.rawDataUris[path];
            image.src = path;
        }
    }

    loadSpine(filename, skelType, onload, onerror) {
        skelType = skelType == null ? 'skel' : skelType.toLowerCase();
        let thisAnim = this;
        if (skelType === 'json') {
            thisAnim.spine.assetManager.loadText(filename + '.json', () => {
                thisAnim.spine.assetManager.loadTextureAtlas(filename + '.atlas', () => {
                    thisAnim.spine.assets[filename] = { name: filename, skelType: skelType };
                    if (onload) onload()
                }, onerror);
            }, onerror);
        } else {
            thisAnim.spine.assetManager.loadBinary(filename + '.skel', () => {
                thisAnim.spine.assets[filename] = { name: filename, skelType: skelType };
                thisAnim.spine.assetManager.loadTextureAtlas(filename + '.atlas', onload, onerror);
            }, onerror);
        }

    };

    prepSpine(filename, autoLoad) {
        let _this = this;
        let spineAssets = _this.spine.assets;
        if (!spineAssets[filename]) {
            if (autoLoad) {
                _this.loadSpine(filename, 'skel', function(){
                    _this.prepSpine(filename);
                });
                return 'loading';
            }
            return console.error('prepSpine: [' + filename + '] 骨骼没有加载');;
        }

        let skeleton;
        let skeletons = _this.spine.skeletons;
        for (let i = 0; i < skeletons.length; i++) {
            skeleton = skeletons[i];
            if (skeleton.name === filename && skeleton.completed) return skeleton;
        }

        let asset = spineAssets[filename];
        let manager = _this.spine.assetManager;

        // 下面的获取原始数据是spine动画的固定写法, api可以参考官网 https://github.com/EsotericSoftware/spine-runtimes/blob/726ad4ddbe5c9c8b386b495692c2f55c2039d15d/spine-ts/spine-webgl/example/index.html#L158
        let skelRawData = asset.skelRawData;
        if (!skelRawData) {
            let atlas = manager.get(filename + ".atlas");
            let atlasLoader = new spine_4.AtlasAttachmentLoader(atlas);
            if (asset.skelType.toLowerCase() === 'json') {
                skelRawData = new  spine_4.SkeletonJson(atlasLoader)
            } else {
                skelRawData = new spine_4.SkeletonBinary(atlasLoader);
            }
            spineAssets[filename].skelRawData = skelRawData;
            spineAssets[filename].ready = true;
        }

        let data = skelRawData.readSkeletonData(manager.get(filename + '.' + asset.skelType));
        skeleton = new spine_4.Skeleton(data)

        // 为骨骼添加名字
        skeleton.name = filename;
        // 标记骨骼加载状态为true
        skeleton.completed = true;

        skeleton.setSkinByName('default');
        skeleton.setToSetupPose();
        skeleton.updateWorldTransform();
        skeleton.state = new spine_4.AnimationState(new spine_4.AnimationStateData(skeleton.data));
        skeleton.state.addListener({
            complete:function(track){
                var node = skeleton.node;
                if (node) {
                    track.loop = (node.loop == null ? false : node.loop);
                    if (track.loop && node.loopCount > 0) {
                        node.loopCount--;
                        if (node.loopCount === 0) track.loop = false;
                    }
                    skeleton.completed = node.completed = !track.loop;
                    if (node.complete) node.complete();
                } else {
                    skeleton.completed = !track.loop;
                    console.error('skeleton complete: 超出预期的错误');
                }
            }
        })
        skeleton.bounds = { offset: new spine_4.Vector2(), size: new spine_4.Vector2() }
        skeleton.getBounds(skeleton.bounds.offset, skeleton.bounds.size, []);
        skeleton.defaultAction = data.animations[0].name;
        skeleton.node = undefined;
        skeletons.push(skeleton);
        return skeleton;
    };

    playSpine(sprite, position){
        if (sprite == undefined) return console.error('playSpine: parameter undefined');
        if (typeof sprite == 'string') sprite = { name: sprite };
        if (!this.hasSpine(sprite.name)) return console.error('playSpine: [' + sprite.name + '] 骨骼没有加载');

        var skeletons = this.spine.skeletons;
        var skeleton;
        if (!(sprite instanceof APNode4_0 && sprite.skeleton.completed)) {
            for (var i = 0; i < skeletons.length; i++) {
                skeleton = skeletons[i];
                if (skeleton.name == sprite.name && skeleton.completed) break;
                skeleton = null;
            }; if (!skeleton) skeleton = this.prepSpine(sprite.name);

            if (!(sprite instanceof APNode4_0)) {
                var param = sprite;
                sprite = new APNode4_0(sprite);
                sprite.id = param.id == undefined ? this.BUILT_ID++ : param.id;
                this.nodes.push(sprite);
            }

            sprite.skeleton = skeleton;
            skeleton.node = sprite;
        }

        sprite.completed = false;
        skeleton.completed = false;

        if (position != undefined) {
            sprite.referNode = position.parent;
            sprite.referFollow = position.follow;
            for (let k in position) {
                sprite[k] = position[k]
            }
        }

        var entry = skeleton.state.setAnimation(0, sprite.action ? sprite.action : skeleton.defaultAction, sprite.loop);
        entry.mixDuration = 0;
        if (this.requestId == undefined) {
            this.running = true;
            if (!this.offscreen) this.canvas.style.visibility = 'visible';
            this.requestId = requestAnimationFrame(this.newFpsRender.bind(this));
        }

        sprite.referBounds = undefined;
        return sprite;
    };

    stopSpine(sprite) {
        var nodes = this.nodes;
        var id = sprite.id == null ? sprite : sprite.id;
        for (var i = 0; i < nodes.length; i++) {
            sprite = nodes[i];
            if (sprite.id === id) {
                if (!sprite.completed) {
                    sprite.completed = true;
                    sprite.skeleton.state.setEmptyAnimation(0);
                }
                return sprite;
            }
        }

        return null;
    };

    render(timestamp) {
        let canvas = this.canvas;
        let offscreen = this.offscreen;
        let dpr = 1;
        if (this.dprAdaptive) {
            if (offscreen)
                dpr = this.dpr !== undefined ? this.dpr : 1;
            else
                dpr = Math.max(self.devicePixelRatio * (self.documentZoom ? self.documentZoom : 1), 1);
        }
        let delta = timestamp - ((this.frameTime == undefined) ? timestamp : this.frameTime);
        this.frameTime = timestamp;

        let erase = true;
        let resize = !this.resized || canvas.width == 0 || canvas.height == 0;
        if (resize) {
            this.resized = true;
            if (!offscreen) {
                canvas.width  = dpr * canvas.clientWidth;
                canvas.height = dpr * canvas.clientHeight;
                erase = false;
            } else {
                if (this.width)  {
                    canvas.width  = dpr * this.width;
                    erase = false;
                }
                if (this.height) {
                    canvas.height = dpr * this.height;
                    erase = false;
                }
            }
        }

        let ea = {
            dpr: dpr,
            delta: delta,
            canvas: canvas,
            frameTime: timestamp,
        };

        let nodes = this.nodes;
        for (let i = 0; i < nodes.length; i++) {
            if (!nodes[i].completed) {
                // 不需要重新viewport那么, 更新node状态
                if (!nodes[i].viewportNode) {
                    nodes[i].update(ea);
                }
            } else {
                nodes.remove(nodes[i]);i--;
            }
        }

        let gl = this.gl;
        gl.viewport(0, 0, canvas.width, canvas.height);

        if (gl.renderAni == null) {
            gl.renderAni = this
        }

        if (erase && gl.renderAni === this) {
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }

        if (nodes.length === 0) {
            this.frameTime = void 0;
            this.requestId = void 0;
            this.running = false;
            gl.renderAni = null
            return;
        }

        let sprite, state, skeleton;
        let shader = this.spine.shader;
        let batcher = this.spine.batcher;
        let renderer = this.spine.skeletonRenderer;
        gl.enable(gl.SCISSOR_TEST);
        gl.scissor(0, 0, canvas.width, canvas.height);

        if (this.bindShader == null) {
            this.bindShader = shader;
            shader.bind();
            shader.setUniformi(spine_4.Shader.SAMPLER, 0);
        }

        let speed;
        for (let i = 0; i < nodes.length; i++) {
            sprite = nodes[i];
            if (sprite.renderClip != null) {
                gl.clipping = sprite.renderClip;
                gl.scissor(gl.clipping.x, gl.clipping.y, gl.clipping.width, gl.clipping.height);
            }

            if (sprite.viewportNode) {
                let rect = sprite.viewportNode.getBoundingClientRect()
                let canvasRect = canvas.getBoundingClientRect()
                let width  = rect.right - rect.left;
                let height = rect.bottom - rect.top;
                if (rect.x + width - canvasRect.x < 0 || rect.x - canvasRect.x > canvasRect.width) {
                    continue;  // 超出canvas外面了, 不用计算世界位置了, 忽略
                }

                // 重新更新一下node的值
                sprite.update({
                    dpr: dpr,
                    delta: delta,
                    canvas: {width: width * dpr, height: height * dpr},
                    frameTime: timestamp,
                })
                // 将当前视口选在小窗的位置上
                gl.viewport((rect.x - canvasRect.x) * dpr, (canvasRect.bottom - rect.bottom) * dpr, width * dpr, height * dpr);
                gl.scissor((rect.x - canvasRect.x) * dpr, (canvasRect.bottom - rect.bottom) * dpr, width * dpr, height * dpr);
            }

            skeleton = sprite.skeleton;
            state = skeleton.state;
            speed = sprite.speed == null ? 1 : sprite.speed;
            // skeleton.flipX = sprite.flipX;
            // skeleton.flipY = sprite.flipY
            skeleton.scaleX = sprite.flipX ? -1 : 1
            skeleton.scaleY = sprite.flipY ? -1 : 1

            // 4.0的修改透明度方法变了, 需要使用下面这种方法.
            skeleton.color.a = (sprite.renderOpacity == null ? 1 : sprite.renderOpacity);

            state.hideSlots = sprite.hideSlots;
            state.update(delta / 1000 * speed);
            state.apply(skeleton);
            skeleton.updateWorldTransform();

            // Get a uniform location from program1
            // var location1 = gl.getUniformLocation(p1, "someUniform");
            // gl.uniform4fv(location1, [1, 2, 3, 4]);  // ERROR!!!
            // Try to use that location on program2
            gl.useProgram(this.spine.shader.program);

            shader.setUniform4x4f(spine_4.Shader.MVP_MATRIX, sprite.mvp.values);
            batcher.begin(shader);
            renderer.premultipliedAlpha = sprite.premultipliedAlpha;
            renderer.outcropMask = this.outcropMask;
            if (renderer.outcropMask) {
                renderer.outcropX = sprite.renderX;
                renderer.outcropY = sprite.renderY;
                renderer.outcropScale = sprite.renderScale;
                renderer.outcropAngle = sprite.renderAngle;
                renderer.clipSlots = sprite.clipSlots;
            }

            renderer.hideSlots = sprite.hideSlots;
            renderer.disableMask = sprite.disableMask;
            renderer.draw(batcher, skeleton);
            batcher.end();

            if (gl.clipping) {
                gl.clipping = undefined;
                gl.scissor(0, 0, canvas.width, canvas.height);
            }
            if (sprite.viewportNode) {
                gl.viewport(0, 0, canvas.width, canvas.height);
                gl.scissor(0, 0, canvas.width, canvas.height);
            }
        }

        gl.disable(gl.SCISSOR_TEST);
        this.requestId = requestAnimationFrame(this.newFpsRender.bind(this));
    };

}

class Animation4_1 extends BaseAnimation{

    constructor (pathPrefix, canvas, dpr, isOffscreen) {
        super()
        if (!self.spine_4_1) return console.error('spine4_1 未定义.');
        this.spineLib = spine_4_1
        let config = { alpha: true };
        let gl = canvas.getContext('webgl2', config);
        if (gl == null) {
            gl = canvas.getContext('webgl', config) || canvas.getContext('experimental-webgl', config);
        } else {
            gl.isWebgl2 = true;
        }
        if (isOffscreen != null) {
            this.offscreen = isOffscreen
        }
        if (gl) {
            // 定义了spine动画的相关上下文, 都是后面渲染动画需要的内容, 文档可以参考官方后面的文档, 当前的文档找不到了, 只能找到ts版本的了.
            // https://github.com/EsotericSoftware/spine-runtimes/blob/726ad4ddbe5c9c8b386b495692c2f55c2039d15d/spine-ts/spine-webgl/example/index.html#L64
            this.spine = {
                shader: this.spineLib.Shader.newTwoColoredTextured(gl),
                batcher: new this.spineLib.PolygonBatcher(gl),
                skeletonRenderer: new this.spineLib.SkeletonRenderer(gl),
                assetManager: new this.spineLib.AssetManager(gl, pathPrefix),
                assets: {},
                skeletons: [],
            }
        } else {
            this.spine = { assets: {} };
            console.error('当前设备不支持 WebGL.');
        }
        this.gl = gl;
        this.canvas = canvas;
        this.BUILT_ID = Ani4StartId;  // 4.0的id从40000开始
        this.dpr = dpr
        this.dprAdaptive = true

    }

    // 不知道下面这个函数的作用, 保留, 出错再修改...
    createTextureRegion(image, name) {
        let page = new this.spineLib.TextureAtlasPage();
        page.name = name;
        page.uWrap = this.spineLib.TextureWrap.ClampToEdge;
        page.vWrap = this.spineLib.TextureWrap.ClampToEdge;
        page.texture = this.spine.assetManager.textureLoader(image);
        page.texture.setWraps(page.uWrap, page.vWrap);
        page.width = page.texture.getImage().width;
        page.height = page.texture.getImage().height;

        let region = new this.spineLib.TextureAtlasRegion();
        region.page = page;
        region.rotate = false;
        region.width = page.width;
        region.height = page.height;
        region.x = 0;
        region.y = 0;
        region.u = region.x / page.width;
        region.v = region.y / page.height;
        if (region.rotate) {
            region.u2 = (region.x + region.height) / page.width;
            region.v2 = (region.y + region.width) / page.height;
        }
        else {
            region.u2 = (region.x + region.width) / page.width;
            region.v2 = (region.y + region.height) / page.height;
        }

        region.originalWidth = page.width;
        region.originalHeight = page.height;
        region.index = -1;
        region.texture = page.texture;
        region.renderObject = region;

        return region;
    }

    loadTexture(path, success = null, error = null) {

        path = this.start(path);
        let isBrowser = !!(typeof window !== "undefined" && typeof navigator !== "undefined" && window.document);
        let isWebWorker = !isBrowser;
        let _this = this
        if (isWebWorker) {
            this.downloadImageBitmap(path, function (imageBitmap) {
                spine.lodedAssets[path] = imageBitmap;
                let texture = _this.textureLoader(imageBitmap);
                _this.success(success, path, texture);
            }, function (status, response) {
                _this.error(error, path, `Couldn't load image: ${path}`);
            })

            // fetch(path, { mode: "cors" }).then((response) => {
            //     if (response.ok)
            //         return response.blob();
            //     this.error(error, path, `Couldn't load image: ${path}`);
            //     return null;
            // }).then((blob) => {
            //     return blob ? createImageBitmap(blob, { premultiplyAlpha: "none", colorSpaceConversion: "none" }) : null;
            // }).then((bitmap) => {
            //     if (bitmap)
            //         this.success(success, path, this.textureLoader(bitmap));
            // });
        } else {
            let image = new Image();
            image.crossOrigin = "anonymous";
            image.onload = () => {
                this.success(success, path, this.textureLoader(image));
            };
            image.onerror = () => {
                this.error(error, path, `Couldn't load image: ${path}`);
            };
            if (this.downloader.rawDataUris[path])
                path = this.downloader.rawDataUris[path];
            image.src = path;
        }
    }

    loadSpine(filename, skelType, onload, onerror) {
        skelType = skelType == null ? 'skel' : skelType.toLowerCase();
        let thisAnim = this;
        if (skelType === 'json') {
            thisAnim.spine.assetManager.loadText(filename + '.json', () => {
                thisAnim.spine.assetManager.loadTextureAtlas(filename + '.atlas', () => {
                    thisAnim.spine.assets[filename] = { name: filename, skelType: skelType };
                    if (onload) onload()
                }, onerror);
            }, onerror);
        } else {
            thisAnim.spine.assetManager.loadBinary(filename + '.skel', () => {
                thisAnim.spine.assets[filename] = { name: filename, skelType: skelType };
                thisAnim.spine.assetManager.loadTextureAtlas(filename + '.atlas', onload, onerror);
            }, onerror);
        }

    };

    prepSpine(filename, autoLoad) {
        let _this = this;
        let spineAssets = _this.spine.assets;
        if (!spineAssets[filename]) {
            if (autoLoad) {
                _this.loadSpine(filename, 'skel', function(){
                    _this.prepSpine(filename);
                });
                return 'loading';
            }
            return console.error('prepSpine: [' + filename + '] 骨骼没有加载');;
        }

        let skeleton;
        let skeletons = _this.spine.skeletons;
        for (let i = 0; i < skeletons.length; i++) {
            skeleton = skeletons[i];
            if (skeleton.name === filename && skeleton.completed) return skeleton;
        }

        let asset = spineAssets[filename];
        let manager = _this.spine.assetManager;

        // 下面的获取原始数据是spine动画的固定写法, api可以参考官网 https://github.com/EsotericSoftware/spine-runtimes/blob/726ad4ddbe5c9c8b386b495692c2f55c2039d15d/spine-ts/spine-webgl/example/index.html#L158
        let skelRawData = asset.skelRawData;
        if (!skelRawData) {
            let atlas = manager.get(filename + ".atlas");
            let atlasLoader = new this.spineLib.AtlasAttachmentLoader(atlas);
            if (asset.skelType.toLowerCase() === 'json') {
                skelRawData = new  this.spineLib.SkeletonJson(atlasLoader)
            } else {
                skelRawData = new this.spineLib.SkeletonBinary(atlasLoader);
            }
            spineAssets[filename].skelRawData = skelRawData;
            spineAssets[filename].ready = true;
        }

        let data = skelRawData.readSkeletonData(manager.get(filename + '.' + asset.skelType));
        skeleton = new this.spineLib.Skeleton(data)

        // 为骨骼添加名字
        skeleton.name = filename;
        // 标记骨骼加载状态为true
        skeleton.completed = true;

        skeleton.setSkinByName('default');
        skeleton.setToSetupPose();
        skeleton.updateWorldTransform();
        skeleton.state = new this.spineLib.AnimationState(new this.spineLib.AnimationStateData(skeleton.data));
        skeleton.state.addListener({
            complete:function(track){
                var node = skeleton.node;
                if (node) {
                    track.loop = (node.loop == null ? false : node.loop);
                    if (track.loop && node.loopCount > 0) {
                        node.loopCount--;
                        if (node.loopCount === 0) track.loop = false;
                    }
                    skeleton.completed = node.completed = !track.loop;
                    if (node.complete) node.complete();
                } else {
                    skeleton.completed = !track.loop;
                    console.error('skeleton complete: 超出预期的错误');
                }
            }
        })
        skeleton.bounds = { offset: new this.spineLib.Vector2(), size: new this.spineLib.Vector2() }
        skeleton.getBounds(skeleton.bounds.offset, skeleton.bounds.size, []);
        skeleton.defaultAction = data.animations[0].name;
        skeleton.node = undefined;
        skeletons.push(skeleton);
        return skeleton;
    };

    playSpine(sprite, position){
        if (sprite == undefined) return console.error('playSpine: parameter undefined');
        if (typeof sprite == 'string') sprite = { name: sprite };
        if (!this.hasSpine(sprite.name)) return console.error('playSpine: [' + sprite.name + '] 骨骼没有加载');

        var skeletons = this.spine.skeletons;
        var skeleton;
        if (!(sprite instanceof APNode4_0 && sprite.skeleton.completed)) {
            for (var i = 0; i < skeletons.length; i++) {
                skeleton = skeletons[i];
                if (skeleton.name == sprite.name && skeleton.completed) break;
                skeleton = null;
            }; if (!skeleton) skeleton = this.prepSpine(sprite.name);

            if (!(sprite instanceof APNode4_0)) {
                var param = sprite;
                sprite = new APNode4_0(sprite);
                sprite.id = param.id == undefined ? this.BUILT_ID++ : param.id;
                this.nodes.push(sprite);
            }

            sprite.skeleton = skeleton;
            skeleton.node = sprite;
        }

        sprite.completed = false;
        skeleton.completed = false;

        if (position != undefined) {
            sprite.referNode = position.parent;
            sprite.referFollow = position.follow;
            for (let k in position) {
                sprite[k] = position[k]
            }
        }

        var entry = skeleton.state.setAnimation(0, sprite.action ? sprite.action : skeleton.defaultAction, sprite.loop);
        entry.mixDuration = 0;
        if (this.requestId == undefined) {
            this.running = true;
            if (!this.offscreen) this.canvas.style.visibility = 'visible';
            this.requestId = requestAnimationFrame(this.newFpsRender.bind(this));
        }

        sprite.referBounds = undefined;
        return sprite;
    };

    stopSpine(sprite) {
        var nodes = this.nodes;
        var id = sprite.id == null ? sprite : sprite.id;
        for (var i = 0; i < nodes.length; i++) {
            sprite = nodes[i];
            if (sprite.id === id) {
                if (!sprite.completed) {
                    sprite.completed = true;
                    sprite.skeleton.state.setEmptyAnimation(0);
                }
                return sprite;
            }
        }

        return null;
    };

    render(timestamp) {
        let canvas = this.canvas;
        let offscreen = this.offscreen;
        let dpr = 1;
        if (this.dprAdaptive) {
            if (offscreen)
                dpr = this.dpr !== undefined ? this.dpr : 1;
            else
                dpr = Math.max(self.devicePixelRatio * (self.documentZoom ? self.documentZoom : 1), 1);
        }
        let delta = timestamp - ((this.frameTime == undefined) ? timestamp : this.frameTime);
        this.frameTime = timestamp;

        let erase = true;
        let resize = !this.resized || canvas.width == 0 || canvas.height == 0;
        if (resize) {
            this.resized = true;
            if (!offscreen) {
                canvas.width  = dpr * canvas.clientWidth;
                canvas.height = dpr * canvas.clientHeight;
                erase = false;
            } else {
                if (this.width)  {
                    canvas.width  = dpr * this.width;
                    erase = false;
                }
                if (this.height) {
                    canvas.height = dpr * this.height;
                    erase = false;
                }
            }
        }

        let ea = {
            dpr: dpr,
            delta: delta,
            canvas: canvas,
            frameTime: timestamp,
        };

        let nodes = this.nodes;
        for (let i = 0; i < nodes.length; i++) {
            if (!nodes[i].completed) {
                // 不需要重新viewport那么, 更新node状态
                if (!nodes[i].viewportNode) {
                    nodes[i].update(ea);
                }
            } else {
                nodes.remove(nodes[i]);i--;
            }
        }

        let gl = this.gl;
        gl.viewport(0, 0, canvas.width, canvas.height);

        if (gl.renderAni == null) {
            gl.renderAni = this
        }

        if (erase && gl.renderAni === this) {
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }

        if (nodes.length === 0) {
            this.frameTime = void 0;
            this.requestId = void 0;
            this.running = false;
            gl.renderAni = null
            return;
        }

        let sprite, state, skeleton;
        let shader = this.spine.shader;
        let batcher = this.spine.batcher;
        let renderer = this.spine.skeletonRenderer;
        gl.enable(gl.SCISSOR_TEST);
        gl.scissor(0, 0, canvas.width, canvas.height);

        if (this.bindShader == null) {
            this.bindShader = shader;
            shader.bind();
            shader.setUniformi(this.spineLib.Shader.SAMPLER, 0);
        }

        let speed;
        for (let i = 0; i < nodes.length; i++) {
            sprite = nodes[i];
            if (sprite.renderClip != null) {
                gl.clipping = sprite.renderClip;
                gl.scissor(gl.clipping.x, gl.clipping.y, gl.clipping.width, gl.clipping.height);
            }

            if (sprite.viewportNode) {
                let rect = sprite.viewportNode.getBoundingClientRect()
                let canvasRect = canvas.getBoundingClientRect()
                let width  = rect.right - rect.left;
                let height = rect.bottom - rect.top;
                if (rect.x + width - canvasRect.x < 0 || rect.x - canvasRect.x > canvasRect.width) {
                    continue;  // 超出canvas外面了, 不用计算世界位置了, 忽略
                }

                // 重新更新一下node的值
                sprite.update({
                    dpr: dpr,
                    delta: delta,
                    canvas: {width: width * dpr, height: height * dpr},
                    frameTime: timestamp,
                })
                // 将当前视口选在小窗的位置上
                gl.viewport((rect.x - canvasRect.x) * dpr, (canvasRect.bottom - rect.bottom) * dpr, width * dpr, height * dpr);
                gl.scissor((rect.x - canvasRect.x) * dpr, (canvasRect.bottom - rect.bottom) * dpr, width * dpr, height * dpr);
            }

            skeleton = sprite.skeleton;
            state = skeleton.state;
            speed = sprite.speed == null ? 1 : sprite.speed;
            // skeleton.flipX = sprite.flipX;
            // skeleton.flipY = sprite.flipY
            skeleton.scaleX = sprite.flipX ? -1 : 1
            skeleton.scaleY = sprite.flipY ? -1 : 1

            // 4.0的修改透明度方法变了, 需要使用下面这种方法.
            skeleton.color.a = (sprite.renderOpacity == null ? 1 : sprite.renderOpacity);

            state.hideSlots = sprite.hideSlots;
            state.update(delta / 1000 * speed);
            state.apply(skeleton);
            skeleton.updateWorldTransform();

            // Get a uniform location from program1
            // var location1 = gl.getUniformLocation(p1, "someUniform");
            // gl.uniform4fv(location1, [1, 2, 3, 4]);  // ERROR!!!
            // Try to use that location on program2
            gl.useProgram(this.spine.shader.program);

            shader.setUniform4x4f(this.spineLib.Shader.MVP_MATRIX, sprite.mvp.values);
            batcher.begin(shader);
            renderer.premultipliedAlpha = sprite.premultipliedAlpha;
            renderer.outcropMask = this.outcropMask;
            if (renderer.outcropMask) {
                renderer.outcropX = sprite.renderX;
                renderer.outcropY = sprite.renderY;
                renderer.outcropScale = sprite.renderScale;
                renderer.outcropAngle = sprite.renderAngle;
                renderer.clipSlots = sprite.clipSlots;
            }

            renderer.hideSlots = sprite.hideSlots;
            renderer.disableMask = sprite.disableMask;
            renderer.draw(batcher, skeleton);
            batcher.end();

            if (gl.clipping) {
                gl.clipping = undefined;
                gl.scissor(0, 0, canvas.width, canvas.height);
            }
            if (sprite.viewportNode) {
                gl.viewport(0, 0, canvas.width, canvas.height);
                gl.scissor(0, 0, canvas.width, canvas.height);
            }
        }

        gl.disable(gl.SCISSOR_TEST);
        this.requestId = requestAnimationFrame(this.newFpsRender.bind(this));
    };

}

class Animation4_2 extends BaseAnimation{

    constructor (pathPrefix, canvas, dpr, isOffscreen) {
        super()
        if (!self.spine_4_2) return console.error('spine4_2 未定义.');
        this.spineLib = spine_4_2
        let config = { alpha: true };
        let gl = canvas.getContext('webgl2', config);
        if (gl == null) {
            gl = canvas.getContext('webgl', config) || canvas.getContext('experimental-webgl', config);
        } else {
            gl.isWebgl2 = true;
        }
        if (isOffscreen != null) {
            this.offscreen = isOffscreen
        }
        if (gl) {
            // 定义了spine动画的相关上下文, 都是后面渲染动画需要的内容, 文档可以参考官方后面的文档, 当前的文档找不到了, 只能找到ts版本的了.
            // https://github.com/EsotericSoftware/spine-runtimes/blob/726ad4ddbe5c9c8b386b495692c2f55c2039d15d/spine-ts/spine-webgl/example/index.html#L64
            this.spine = {
                shader: this.spineLib.Shader.newTwoColoredTextured(gl),
                batcher: new this.spineLib.PolygonBatcher(gl),
                skeletonRenderer: new this.spineLib.SkeletonRenderer(gl),
                assetManager: new this.spineLib.AssetManager(gl, pathPrefix),
                assets: {},
                skeletons: [],
            }
        } else {
            this.spine = { assets: {} };
            console.error('当前设备不支持 WebGL.');
        }
        this.gl = gl;
        this.canvas = canvas;
        this.BUILT_ID = Ani4StartId;  // 4.0的id从40000开始
        this.dpr = dpr
        this.dprAdaptive = true

    }

    // 不知道下面这个函数的作用, 保留, 出错再修改...
    createTextureRegion(image, name) {
        let page = new this.spineLib.TextureAtlasPage();
        page.name = name;
        page.uWrap = this.spineLib.TextureWrap.ClampToEdge;
        page.vWrap = this.spineLib.TextureWrap.ClampToEdge;
        page.texture = this.spine.assetManager.textureLoader(image);
        page.texture.setWraps(page.uWrap, page.vWrap);
        page.width = page.texture.getImage().width;
        page.height = page.texture.getImage().height;

        let region = new this.spineLib.TextureAtlasRegion();
        region.page = page;
        region.rotate = false;
        region.width = page.width;
        region.height = page.height;
        region.x = 0;
        region.y = 0;
        region.u = region.x / page.width;
        region.v = region.y / page.height;
        if (region.rotate) {
            region.u2 = (region.x + region.height) / page.width;
            region.v2 = (region.y + region.width) / page.height;
        }
        else {
            region.u2 = (region.x + region.width) / page.width;
            region.v2 = (region.y + region.height) / page.height;
        }

        region.originalWidth = page.width;
        region.originalHeight = page.height;
        region.index = -1;
        region.texture = page.texture;
        region.renderObject = region;

        return region;
    }

    loadTexture(path, success = null, error = null) {

        path = this.start(path);
        let isBrowser = !!(typeof window !== "undefined" && typeof navigator !== "undefined" && window.document);
        let isWebWorker = !isBrowser;
        let _this = this
        if (isWebWorker) {
            this.downloadImageBitmap(path, function (imageBitmap) {
                spine.lodedAssets[path] = imageBitmap;
                let texture = _this.textureLoader(imageBitmap);
                _this.success(success, path, texture);
            }, function (status, response) {
                _this.error(error, path, `Couldn't load image: ${path}`);
            })

            // fetch(path, { mode: "cors" }).then((response) => {
            //     if (response.ok)
            //         return response.blob();
            //     this.error(error, path, `Couldn't load image: ${path}`);
            //     return null;
            // }).then((blob) => {
            //     return blob ? createImageBitmap(blob, { premultiplyAlpha: "none", colorSpaceConversion: "none" }) : null;
            // }).then((bitmap) => {
            //     if (bitmap)
            //         this.success(success, path, this.textureLoader(bitmap));
            // });
        } else {
            let image = new Image();
            image.crossOrigin = "anonymous";
            image.onload = () => {
                this.success(success, path, this.textureLoader(image));
            };
            image.onerror = () => {
                this.error(error, path, `Couldn't load image: ${path}`);
            };
            if (this.downloader.rawDataUris[path])
                path = this.downloader.rawDataUris[path];
            image.src = path;
        }
    }

    loadSpine(filename, skelType, onload, onerror) {
        skelType = skelType == null ? 'skel' : skelType.toLowerCase();
        let thisAnim = this;
        if (skelType === 'json') {
            thisAnim.spine.assetManager.loadText(filename + '.json', () => {
                thisAnim.spine.assetManager.loadTextureAtlas(filename + '.atlas', () => {
                    thisAnim.spine.assets[filename] = { name: filename, skelType: skelType };
                    if (onload) onload()
                }, onerror);
            }, onerror);
        } else {
            thisAnim.spine.assetManager.loadBinary(filename + '.skel', () => {
                thisAnim.spine.assets[filename] = { name: filename, skelType: skelType };
                thisAnim.spine.assetManager.loadTextureAtlas(filename + '.atlas', onload, onerror);
            }, onerror);
        }

    };

    prepSpine(filename, autoLoad) {
        let _this = this;
        let spineAssets = _this.spine.assets;
        if (!spineAssets[filename]) {
            if (autoLoad) {
                _this.loadSpine(filename, 'skel', function(){
                    _this.prepSpine(filename);
                });
                return 'loading';
            }
            return console.error('prepSpine: [' + filename + '] 骨骼没有加载');;
        }

        let skeleton;
        let skeletons = _this.spine.skeletons;
        for (let i = 0; i < skeletons.length; i++) {
            skeleton = skeletons[i];
            if (skeleton.name === filename && skeleton.completed) return skeleton;
        }

        let asset = spineAssets[filename];
        let manager = _this.spine.assetManager;

        // 下面的获取原始数据是spine动画的固定写法, api可以参考官网 https://github.com/EsotericSoftware/spine-runtimes/blob/726ad4ddbe5c9c8b386b495692c2f55c2039d15d/spine-ts/spine-webgl/example/index.html#L158
        let skelRawData = asset.skelRawData;
        if (!skelRawData) {
            let atlas = manager.get(filename + ".atlas");
            let atlasLoader = new this.spineLib.AtlasAttachmentLoader(atlas);
            if (asset.skelType.toLowerCase() === 'json') {
                skelRawData = new  this.spineLib.SkeletonJson(atlasLoader)
            } else {
                skelRawData = new this.spineLib.SkeletonBinary(atlasLoader);
            }
            spineAssets[filename].skelRawData = skelRawData;
            spineAssets[filename].ready = true;
        }

        let data = skelRawData.readSkeletonData(manager.get(filename + '.' + asset.skelType));
        skeleton = new this.spineLib.Skeleton(data)

        // 为骨骼添加名字
        skeleton.name = filename;
        // 标记骨骼加载状态为true
        skeleton.completed = true;

        skeleton.setSkinByName('default');
        skeleton.setToSetupPose();
        skeleton.updateWorldTransform();
        skeleton.state = new this.spineLib.AnimationState(new this.spineLib.AnimationStateData(skeleton.data));
        skeleton.state.addListener({
            complete:function(track){
                var node = skeleton.node;
                if (node) {
                    track.loop = (node.loop == null ? false : node.loop);
                    if (track.loop && node.loopCount > 0) {
                        node.loopCount--;
                        if (node.loopCount === 0) track.loop = false;
                    }
                    skeleton.completed = node.completed = !track.loop;
                    if (node.complete) node.complete();
                } else {
                    skeleton.completed = !track.loop;
                    console.error('skeleton complete: 超出预期的错误');
                }
            }
        })
        skeleton.bounds = { offset: new this.spineLib.Vector2(), size: new this.spineLib.Vector2() }
        skeleton.getBounds(skeleton.bounds.offset, skeleton.bounds.size, []);
        skeleton.defaultAction = data.animations[0].name;
        skeleton.node = undefined;
        skeletons.push(skeleton);
        return skeleton;
    };

    playSpine(sprite, position){
        if (sprite == undefined) return console.error('playSpine: parameter undefined');
        if (typeof sprite == 'string') sprite = { name: sprite };
        if (!this.hasSpine(sprite.name)) return console.error('playSpine: [' + sprite.name + '] 骨骼没有加载');

        var skeletons = this.spine.skeletons;
        var skeleton;
        if (!(sprite instanceof APNode4_0 && sprite.skeleton.completed)) {
            for (var i = 0; i < skeletons.length; i++) {
                skeleton = skeletons[i];
                if (skeleton.name == sprite.name && skeleton.completed) break;
                skeleton = null;
            }; if (!skeleton) skeleton = this.prepSpine(sprite.name);

            if (!(sprite instanceof APNode4_0)) {
                var param = sprite;
                sprite = new APNode4_0(sprite);
                sprite.id = param.id == undefined ? this.BUILT_ID++ : param.id;
                this.nodes.push(sprite);
            }

            sprite.skeleton = skeleton;
            skeleton.node = sprite;
        }

        sprite.completed = false;
        skeleton.completed = false;

        if (position != undefined) {
            sprite.referNode = position.parent;
            sprite.referFollow = position.follow;
            for (let k in position) {
                sprite[k] = position[k]
            }
        }

        var entry = skeleton.state.setAnimation(0, sprite.action ? sprite.action : skeleton.defaultAction, sprite.loop);
        entry.mixDuration = 0;
        if (this.requestId == undefined) {
            this.running = true;
            if (!this.offscreen) this.canvas.style.visibility = 'visible';
            this.requestId = requestAnimationFrame(this.newFpsRender.bind(this));
        }

        sprite.referBounds = undefined;
        return sprite;
    };

    stopSpine(sprite) {
        var nodes = this.nodes;
        var id = sprite.id == null ? sprite : sprite.id;
        for (var i = 0; i < nodes.length; i++) {
            sprite = nodes[i];
            if (sprite.id === id) {
                if (!sprite.completed) {
                    sprite.completed = true;
                    sprite.skeleton.state.setEmptyAnimation(0);
                }
                return sprite;
            }
        }

        return null;
    };

    render(timestamp) {
        let canvas = this.canvas;
        let offscreen = this.offscreen;
        let dpr = 1;
        if (this.dprAdaptive) {
            if (offscreen)
                dpr = this.dpr !== undefined ? this.dpr : 1;
            else
                dpr = Math.max(self.devicePixelRatio * (self.documentZoom ? self.documentZoom : 1), 1);
        }
        let delta = timestamp - ((this.frameTime == undefined) ? timestamp : this.frameTime);
        this.frameTime = timestamp;

        let erase = true;
        let resize = !this.resized || canvas.width == 0 || canvas.height == 0;
        if (resize) {
            this.resized = true;
            if (!offscreen) {
                canvas.width  = dpr * canvas.clientWidth;
                canvas.height = dpr * canvas.clientHeight;
                erase = false;
            } else {
                if (this.width)  {
                    canvas.width  = dpr * this.width;
                    erase = false;
                }
                if (this.height) {
                    canvas.height = dpr * this.height;
                    erase = false;
                }
            }
        }

        let ea = {
            dpr: dpr,
            delta: delta,
            canvas: canvas,
            frameTime: timestamp,
        };

        let nodes = this.nodes;
        for (let i = 0; i < nodes.length; i++) {
            if (!nodes[i].completed) {
                // 不需要重新viewport那么, 更新node状态
                if (!nodes[i].viewportNode) {
                    nodes[i].update(ea);
                }
            } else {
                nodes.remove(nodes[i]);i--;
            }
        }

        let gl = this.gl;
        gl.viewport(0, 0, canvas.width, canvas.height);

        if (gl.renderAni == null) {
            gl.renderAni = this
        }

        if (erase && gl.renderAni === this) {
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }

        if (nodes.length === 0) {
            this.frameTime = void 0;
            this.requestId = void 0;
            this.running = false;
            gl.renderAni = null
            return;
        }

        let sprite, state, skeleton;
        let shader = this.spine.shader;
        let batcher = this.spine.batcher;
        let renderer = this.spine.skeletonRenderer;
        gl.enable(gl.SCISSOR_TEST);
        gl.scissor(0, 0, canvas.width, canvas.height);

        if (this.bindShader == null) {
            this.bindShader = shader;
            shader.bind();
            shader.setUniformi(this.spineLib.Shader.SAMPLER, 0);
        }

        let speed;
        for (let i = 0; i < nodes.length; i++) {
            sprite = nodes[i];
            if (sprite.renderClip != null) {
                gl.clipping = sprite.renderClip;
                gl.scissor(gl.clipping.x, gl.clipping.y, gl.clipping.width, gl.clipping.height);
            }

            if (sprite.viewportNode) {
                let rect = sprite.viewportNode.getBoundingClientRect()
                let canvasRect = canvas.getBoundingClientRect()
                let width  = rect.right - rect.left;
                let height = rect.bottom - rect.top;
                if (rect.x + width - canvasRect.x < 0 || rect.x - canvasRect.x > canvasRect.width) {
                    continue;  // 超出canvas外面了, 不用计算世界位置了, 忽略
                }

                // 重新更新一下node的值
                sprite.update({
                    dpr: dpr,
                    delta: delta,
                    canvas: {width: width * dpr, height: height * dpr},
                    frameTime: timestamp,
                })
                // 将当前视口选在小窗的位置上
                gl.viewport((rect.x - canvasRect.x) * dpr, (canvasRect.bottom - rect.bottom) * dpr, width * dpr, height * dpr);
                gl.scissor((rect.x - canvasRect.x) * dpr, (canvasRect.bottom - rect.bottom) * dpr, width * dpr, height * dpr);
            }

            skeleton = sprite.skeleton;
            state = skeleton.state;
            speed = sprite.speed == null ? 1 : sprite.speed;
            // skeleton.flipX = sprite.flipX;
            // skeleton.flipY = sprite.flipY
            skeleton.scaleX = sprite.flipX ? -1 : 1
            skeleton.scaleY = sprite.flipY ? -1 : 1

            // 4.0的修改透明度方法变了, 需要使用下面这种方法.
            skeleton.color.a = (sprite.renderOpacity == null ? 1 : sprite.renderOpacity);

            state.hideSlots = sprite.hideSlots;
            state.update(delta / 1000 * speed);
            state.apply(skeleton);
            skeleton.updateWorldTransform();

            // Get a uniform location from program1
            // var location1 = gl.getUniformLocation(p1, "someUniform");
            // gl.uniform4fv(location1, [1, 2, 3, 4]);  // ERROR!!!
            // Try to use that location on program2
            gl.useProgram(this.spine.shader.program);

            shader.setUniform4x4f(this.spineLib.Shader.MVP_MATRIX, sprite.mvp.values);
            batcher.begin(shader);
            renderer.premultipliedAlpha = sprite.premultipliedAlpha;
            renderer.outcropMask = this.outcropMask;
            if (renderer.outcropMask) {
                renderer.outcropX = sprite.renderX;
                renderer.outcropY = sprite.renderY;
                renderer.outcropScale = sprite.renderScale;
                renderer.outcropAngle = sprite.renderAngle;
                renderer.clipSlots = sprite.clipSlots;
            }

            renderer.hideSlots = sprite.hideSlots;
            renderer.disableMask = sprite.disableMask;
            renderer.draw(batcher, skeleton);
            batcher.end();

            if (gl.clipping) {
                gl.clipping = undefined;
                gl.scissor(0, 0, canvas.width, canvas.height);
            }
            if (sprite.viewportNode) {
                gl.viewport(0, 0, canvas.width, canvas.height);
                gl.scissor(0, 0, canvas.width, canvas.height);
            }
        }

        gl.disable(gl.SCISSOR_TEST);
        this.requestId = requestAnimationFrame(this.newFpsRender.bind(this));
    };

}

class Animation3_8 extends BaseAnimation {
    constructor (pathPrefix, canvas, dpr, isOffscreen) {
        super()
        if (!self.spine) return console.error('spine 未定义.');

        let config = { alpha: true, };
        let gl = canvas.getContext('webgl2', config);
        if (gl == null) {
            gl = canvas.getContext('webgl', config) || canvas.getContext('experimental-webgl', config);
        } else {
            gl.isWebgl2 = true;
        }
        if (isOffscreen != null) {
            this.offscreen = isOffscreen
        }
        if (gl) {
            // 定义了spine动画的相关上下文, 都是后面渲染动画需要的内容, 文档可以参考官方后面的文档, 当前的文档找不到了, 只能找到ts版本的了.
            // https://github.com/EsotericSoftware/spine-runtimes/blob/726ad4ddbe5c9c8b386b495692c2f55c2039d15d/spine-ts/spine-webgl/example/index.html#L64
            this.spine = {
                shader: spine3_8.webgl.Shader.newTwoColoredTextured(gl),
                batcher: new spine3_8.webgl.PolygonBatcher(gl),
                skeletonRenderer: new spine3_8.webgl.SkeletonRenderer(gl),
                assetManager: new spine3_8.webgl.AssetManager(gl, pathPrefix),
                assets: {},
                skeletons: [],
            }
        } else {
            this.spine = { assets: {} };
            console.error('当前设备不支持 WebGL.');
        }
        this.gl = gl;
        this.canvas = canvas;
        this.dpr = dpr
        this.dprAdaptive = true
        this.spineLib = spine3_8
    };

    createTextureRegion(image, name) {
        var page = new spine.TextureAtlasPage();
        page.name = name;
        page.uWrap = spine3_8.TextureWrap.ClampToEdge;
        page.vWrap = spine3_8.TextureWrap.ClampToEdge;
        page.texture = this.spine.assetManager.textureLoader(image);
        page.texture.setWraps(page.uWrap, page.vWrap);
        page.width = page.texture.getImage().width;
        page.height = page.texture.getImage().height;
        var region = new spine.TextureAtlasRegion();
        region.page = page;
        region.rotate = false;
        region.width = page.width;
        region.height = page.height;
        region.x = 0;
        region.y = 0;
        region.u = region.x / page.width;
        region.v = region.y / page.height;
        if (region.rotate) {
            region.u2 = (region.x + region.height) / page.width;
            region.v2 = (region.y + region.width) / page.height;
        }
        else {
            region.u2 = (region.x + region.width) / page.width;
            region.v2 = (region.y + region.height) / page.height;
        }

        region.originalWidth = page.width;
        region.originalHeight = page.height;
        region.index = -1;
        region.texture = page.texture;
        region.renderObject = region;

        return region;
    };

    loadSpine(filename, skelType, onload, onerror) {
        skelType = skelType == null ? 'skel' : skelType.toLowerCase();
        var thisAnim = this;
        var reader = {
            name: filename,
            filename: filename,
            skelType: skelType,
            onsuccess: onload,
            onfailed: onerror,
            loaded: 0,
            errors: 0,
            toLoad: 2,
            onerror:function(path, msg){
                var _this = reader;
                _this.toLoad--;
                _this.errors++;
                if (_this.toLoad == 0) {
                    console.error('loadSpine: [' + _this.filename + '] 加载失败.');
                    if (_this.onfailed) _this.onfailed();
                }
            },
            onload:function(path, data){
                var _this = reader;
                _this.toLoad--;
                _this.loaded++;
                if (_this.toLoad == 0) {
                    if (_this.errors > 0) {
                        console.error('loadSpine: [' + _this.filename + '] 加载失败.');
                        if (_this.onfailed) _this.onfailed();
                    } else {
                        thisAnim.spine.assets[_this.filename] = { name: _this.filename, skelType: _this.skelType };
                        if (_this.onsuccess) _this.onsuccess();
                    }
                }
            },
            ontextLoad:function(path, data){
                var _this = reader;
                var imageName = null;
                var atlasReader = new spine3_8.TextureAtlasReader(data);
                var prefix = '';
                var a = _this.name.lastIndexOf('/');
                var b = _this.name.lastIndexOf('\\');
                if (a != -1 || b != -1) {
                    if (a > b)
                        prefix = _this.name.substring(0, a + 1);
                    else
                        prefix = _this.name.substring(0, b + 1);
                }

                while (true) {
                    var line = atlasReader.readLine();
                    if (line == null) break;
                    line = line.trim();

                    if (line.length == 0) {
                        imageName = null;
                    } else if (!imageName) {
                        imageName = line;
                        _this.toLoad++;
                        thisAnim.spine.assetManager.loadTexture(prefix + imageName,
                            _this.onload, _this.onerror);
                    } else {
                        continue;
                    }
                }

                _this.onload(path, data);
            },
        };

        if (skelType == 'json') {
            thisAnim.spine.assetManager.loadText(filename + '.json',
                reader.onload, reader.onerror);
        } else {
            thisAnim.spine.assetManager.loadBinary(filename + '.skel',
                reader.onload, reader.onerror);
        }

        thisAnim.spine.assetManager.loadText(filename + '.atlas',
            reader.ontextLoad, reader.onerror);
    };

    prepSpine(filename, autoLoad) {
        var _this = this;
        var spineAssets = _this.spine.assets;
        if (!spineAssets[filename]) {
            if (autoLoad) {
                _this.loadSpine(filename, 'skel', function(){
                    _this.prepSpine(filename);
                });
                return 'loading';
            }
            return console.error('prepSpine: [' + filename + '] 骨骼没有加载');;
        }

        var skeleton;
        var skeletons = _this.spine.skeletons;
        for (var i = 0; i < skeletons.length; i++) {
            skeleton = skeletons[i];
            if (skeleton.name == filename && skeleton.completed) return skeleton;
        }

        var asset = spineAssets[filename];
        var manager = _this.spine.assetManager;

        // 下面的获取原始数据是spine动画的固定写法, api可以参考官网 https://github.com/EsotericSoftware/spine-runtimes/blob/726ad4ddbe5c9c8b386b495692c2f55c2039d15d/spine-ts/spine-webgl/example/index.html#L158
        var skelRawData = asset.skelRawData;
        if (!skelRawData) {
            var prefix = '';
            var a = filename.lastIndexOf('/');
            var b = filename.lastIndexOf('\\');
            if (a != -1 || b != -1) {
                if (a > b)
                    prefix = filename.substring(0, a + 1);
                else
                    prefix = filename.substring(0, b + 1);
            }
            var atlas = new spine3_8.TextureAtlas(manager.get(filename + '.atlas'), function(path){
                return manager.get(prefix + path);
            });

            var atlasLoader = new spine3_8.AtlasAttachmentLoader(atlas);
            if (asset.skelType.toLowerCase() == 'json') {
                skelRawData = new spine3_8.SkeletonJson(atlasLoader);
            } else {
                skelRawData = new spine3_8.SkeletonBinary(atlasLoader);
            }

            spineAssets[filename].skelRawData = skelRawData;
            spineAssets[filename].ready = true;
        }

        var data = skelRawData.readSkeletonData(manager.get(filename + '.' + asset.skelType));
        skeleton = new spine3_8.Skeleton(data);

        // 为骨骼添加名字
        skeleton.name = filename;
        // 标记骨骼加载状态为true
        skeleton.completed = true;

        try {
            // 尝试设置默认皮肤，如果失败不会中断程序
            skeleton.setSkinByName('default');
        } catch (e) {
            console.warn('设置默认皮肤失败，尝试备选方案:', e.message);
            // 如果有可用皮肤，则使用第一个
            if (skeleton.data.skins.length > 0) {
                skeleton.setSkin(skeleton.data.skins[0]);
                console.warn('使用第一个可用皮肤作为默认皮肤');
            }
        }
        skeleton.setToSetupPose();
        skeleton.updateWorldTransform();
        skeleton.state = new spine3_8.AnimationState(new spine.AnimationStateData(skeleton.data));
        skeleton.state.addListener({
            complete:function(track){
                var node = skeleton.node;
                if (node) {
                    track.loop = (node.loop == null ? false : node.loop);
                    if (track.loop && node.loopCount > 0) {
                        node.loopCount--;
                        if (node.loopCount == 0) track.loop = false;
                    }
                    skeleton.completed = node.completed = !track.loop;
                    if (node.complete) node.complete();
                } else {
                    skeleton.completed = !track.loop;
                    console.error('skeleton complete: 超出预期的错误');
                }
            }
        });
        skeleton.bounds = { offset: new spine3_8.Vector2(), size: new spine3_8.Vector2() };
        skeleton.getBounds(skeleton.bounds.offset, skeleton.bounds.size, []);
        skeleton.defaultAction = data.animations[0].name;
        skeleton.node = undefined;
        skeletons.push(skeleton);
        return skeleton;
    };

    playSpine(sprite, position){
        if (sprite == null) return console.error('playSpine: parameter undefined');
        if (typeof sprite == 'string') sprite = { name: sprite }

        if (!this.hasSpine(sprite.name)) return console.error('playSpine: [' + sprite.name + '] 骨骼没有加载');

        var skeletons = this.spine.skeletons;
        var skeleton;
        if (!(sprite instanceof APNode3_8 && sprite.skeleton.completed)) {
            for (var i = 0; i < skeletons.length; i++) {
                skeleton = skeletons[i];
                if (skeleton.name == sprite.name && skeleton.completed) break;
                skeleton = null;
            }; if (!skeleton) skeleton = this.prepSpine(sprite.name);

            if (!(sprite instanceof APNode3_8)) {
                var param = sprite;
                sprite = new APNode3_8(sprite);
                sprite.id = param.id == null ? this.BUILT_ID++ : param.id;
                this.nodes.push(sprite);
            }

            sprite.skeleton = skeleton;
            skeleton.node = sprite;
        }

        sprite.completed = false;
        skeleton.completed = false;

        if (position != null) {
            sprite.referNode = position.parent;
            sprite.referFollow = position.follow;
            for (let k in position) {
                sprite[k] = position[k]
            }
        }

        var entry = skeleton.state.setAnimation(0, sprite.action ? sprite.action : skeleton.defaultAction, sprite.loop);
        entry.mixDuration = 0;
        if (this.requestId == null) {
            this.running = true;
            if (!this.offscreen) this.canvas.style.visibility = 'visible';
            this.requestId = requestAnimationFrame(this.newFpsRender.bind(this));
        }

        sprite.referBounds = undefined;
        return sprite;
    };

    stopSpine(sprite) {
        var nodes = this.nodes;
        var id = sprite.id == null ? sprite : sprite.id;
        for (var i = 0; i < nodes.length; i++) {
            sprite = nodes[i];
            if (sprite.id == id) {
                if (!sprite.completed) {
                    sprite.completed = true;
                    sprite.skeleton.state.setEmptyAnimation(0);
                }
                return sprite;
            }
        }

        return null;
    };

    render(timestamp) {
        var canvas = this.canvas;
        var offscreen = this.offscreen;
        var dpr = 1;
        if (this.dprAdaptive) {
            if (offscreen)
                dpr = this.dpr != null ? this.dpr : 1;
            else
                dpr = Math.max(self.devicePixelRatio * (self.documentZoom ? self.documentZoom : 1), 1);
        }
        var delta = timestamp - ((this.frameTime == null) ? timestamp : this.frameTime);
        this.frameTime = timestamp;
        var erase = true;
        var resize = !this.resized || canvas.width == 0 || canvas.height == 0;
        if (resize) {
            this.resized = true;
            if (!offscreen) {
                canvas.width  = dpr * canvas.clientWidth;
                canvas.height = dpr * canvas.clientHeight;
                erase = false;
            } else {
                if (this.width)  {
                    canvas.width  = dpr * this.width;
                    erase = false;
                }
                if (this.height) {
                    canvas.height = dpr * this.height;
                    erase = false;
                }
            }
        }

        var ea = {
            dpr: dpr,
            delta: delta,
            canvas: canvas,
            frameTime: timestamp,
        };

        var nodes = this.nodes;
        for (var i = 0; i < nodes.length; i++) {
            if (!nodes[i].completed) {
                // 不需要重新viewport那么, 更新node状态
                if (!nodes[i].viewportNode) {
                    nodes[i].update(ea);
                }
            } else {
                nodes.remove(nodes[i]);i--;
            }
        }

        var gl = this.gl;
        gl.viewport(0, 0, canvas.width, canvas.height);

        if (gl.renderAni == null) {
            gl.renderAni = this
        }

        if (erase && gl.renderAni === this) {
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }

        if (nodes.length === 0) {
            this.frameTime = void 0;
            this.requestId = void 0;
            this.running = false;
            gl.renderAni = null
            return;
        }

        var sprite, state, skeleton;
        var shader = this.spine.shader;
        var batcher = this.spine.batcher;
        var renderer = this.spine.skeletonRenderer;

        gl.enable(gl.SCISSOR_TEST);
        gl.scissor(0, 0, canvas.width, canvas.height);

        if (this.bindShader == null) {
            this.bindShader = shader;
            shader.bind();
            shader.setUniformi(spine.webgl.Shader.SAMPLER, 0);
        }

        var speed;
        for (var i = 0; i < nodes.length; i++) {
            sprite = nodes[i];
            if (sprite.renderClip != null) {
                gl.clipping = sprite.renderClip;
                gl.scissor(gl.clipping.x, gl.clipping.y, gl.clipping.width, gl.clipping.height);
            }

            if (sprite.viewportNode) {
                let rect = sprite.viewportNode.getBoundingClientRect()
                let canvasRect = canvas.getBoundingClientRect()
                let width  = rect.right - rect.left;
                let height = rect.bottom - rect.top;
                if (rect.x + width - canvasRect.x < 0 || rect.x - canvasRect.x > canvasRect.width) {
                    continue;  // 超出canvas外面了, 不用计算世界位置了, 忽略
                }

                // 重新更新一下node的值
                sprite.update({
                    dpr: dpr,
                    delta: delta,
                    canvas: {width: width * dpr, height: height * dpr},
                    frameTime: timestamp,
                })
                // 将当前视口选在小窗的位置上
                gl.viewport((rect.x - canvasRect.x) * dpr, (canvasRect.bottom - rect.bottom) * dpr, width * dpr, height * dpr);
                gl.scissor((rect.x - canvasRect.x) * dpr, (canvasRect.bottom - rect.bottom) * dpr, width * dpr, height * dpr);
            }

            skeleton = sprite.skeleton;
            state = skeleton.state;
            speed = sprite.speed == null ? 1 : sprite.speed;

            // skeleton.flipX = sprite.flipX;
            // skeleton.flipY = sprite.flipY
            skeleton.scaleX = sprite.flipX ? -1 : 1
            skeleton.scaleY = sprite.flipY ? -1 : 1
            skeleton.color.a = (sprite.renderOpacity == null ? 1 : sprite.renderOpacity);
            skeleton.opacity = (sprite.renderOpacity == null ? 1 : sprite.renderOpacity);

            state.hideSlots = sprite.hideSlots;
            state.update(delta / 1000 * speed);
            state.apply(skeleton);
            skeleton.updateWorldTransform();

            // gl.linkProgram(this.spine.shader.program);
            gl.useProgram(this.spine.shader.program);

            shader.setUniform4x4f(spine.webgl.Shader.MVP_MATRIX, sprite.mvp.values);
            batcher.begin(shader);
            renderer.premultipliedAlpha = sprite.premultipliedAlpha;
            renderer.outcropMask = this.outcropMask;
            if (renderer.outcropMask) {
                renderer.outcropX = sprite.renderX;
                renderer.outcropY = sprite.renderY;
                renderer.outcropScale = sprite.renderScale;
                renderer.outcropAngle = sprite.renderAngle;
                renderer.clipSlots = sprite.clipSlots;
            }

            renderer.hideSlots = sprite.hideSlots;
            renderer.disableMask = sprite.disableMask;
            renderer.draw(batcher, skeleton);
            batcher.end();

            if (gl.clipping) {
                gl.clipping = undefined;
                gl.scissor(0, 0, canvas.width, canvas.height);
            }

            if (sprite.viewportNode) {
                gl.viewport(0, 0, canvas.width, canvas.height);
                gl.scissor(0, 0, canvas.width, canvas.height);
            }
        }

        gl.disable(gl.SCISSOR_TEST);

        this.requestId = requestAnimationFrame(this.newFpsRender.bind(this));
    };
}

// 3.5.35版本与3.6版本差别很小
class Animation3_5_35 extends BaseAnimation {
    constructor (pathPrefix, canvas, dpr, isOffscreen) {
        super()
        if (!self.spine_3_5_35) return console.error('spine 未定义.');
        this.spineLib = spine_3_5_35
        
        let config = { alpha: true };
        let gl = canvas.getContext('webgl2', config);
        if (gl == null) {
            gl = canvas.getContext('webgl', config) || canvas.getContext('experimental-webgl', config);
        } else {
            gl.isWebgl2 = true;
        }
        if (isOffscreen != null) {
            this.offscreen = isOffscreen
        }
        if (gl) {
            // 定义了spine动画的相关上下文, 都是后面渲染动画需要的内容, 文档可以参考官方后面的文档, 当前的文档找不到了, 只能找到ts版本的了.
            // https://github.com/EsotericSoftware/spine-runtimes/blob/726ad4ddbe5c9c8b386b495692c2f55c2039d15d/spine-ts/spine-webgl/example/index.html#L64
            this.spine = {
                shader: this.spineLib.webgl.Shader.newTwoColoredTextured(gl),
                batcher: new this.spineLib.webgl.PolygonBatcher(gl),
                skeletonRenderer: new this.spineLib.webgl.SkeletonRenderer(gl),
                assetManager: new this.spineLib.webgl.AssetManager(gl, pathPrefix),
                assets: {},
                skeletons: [],
            }
        } else {
            this.spine = { assets: {} };
            console.error('当前设备不支持 WebGL.');
        }
        this.gl = gl;
        this.canvas = canvas;
        this.dpr = dpr
        this.dprAdaptive = true
    };

    createTextureRegion(image, name) {
        var page = new this.spineLib.TextureAtlasPage();
        page.name = name;
        page.uWrap = this.spineLib.TextureWrap.ClampToEdge;
        page.vWrap = this.spineLib.TextureWrap.ClampToEdge;
        page.texture = this.spine.assetManager.textureLoader(image);
        page.texture.setWraps(page.uWrap, page.vWrap);
        page.width = page.texture.getImage().width;
        page.height = page.texture.getImage().height;
        var region = new this.spineLib.TextureAtlasRegion();
        region.page = page;
        region.rotate = false;
        region.width = page.width;
        region.height = page.height;
        region.x = 0;
        region.y = 0;
        region.u = region.x / page.width;
        region.v = region.y / page.height;
        if (region.rotate) {
            region.u2 = (region.x + region.height) / page.width;
            region.v2 = (region.y + region.width) / page.height;
        }
        else {
            region.u2 = (region.x + region.width) / page.width;
            region.v2 = (region.y + region.height) / page.height;
        }

        region.originalWidth = page.width;
        region.originalHeight = page.height;
        region.index = -1;
        region.texture = page.texture;
        region.renderObject = region;

        return region;
    };

    loadSpine(filename, skelType, onload, onerror) {
        skelType = skelType == null ? 'skel' : skelType.toLowerCase();
        var thisAnim = this;
        var reader = {
            name: filename,
            filename: filename,
            skelType: skelType,
            onsuccess: onload,
            onfailed: onerror,
            loaded: 0,
            errors: 0,
            toLoad: 2,
            onerror:function(path, msg){
                var _this = reader;
                _this.toLoad--;
                _this.errors++;
                if (_this.toLoad == 0) {
                    console.error('loadSpine: [' + _this.filename + '] 加载失败.');
                    if (_this.onfailed) _this.onfailed();
                }
            },
            onload:function(path, data){
                var _this = reader;
                _this.toLoad--;
                _this.loaded++;
                if (_this.toLoad == 0) {
                    if (_this.errors > 0) {
                        console.error('loadSpine: [' + _this.filename + '] 加载失败.');
                        if (_this.onfailed) _this.onfailed();
                    } else {
                        thisAnim.spine.assets[_this.filename] = { name: _this.filename, skelType: _this.skelType };
                        if (_this.onsuccess) _this.onsuccess();
                    }
                }
            },
            ontextLoad:function(path, data){
                var _this = reader;
                var imageName = null;
                var atlasReader = new thisAnim.spineLib.TextureAtlasReader(data);
                var prefix = '';
                var a = _this.name.lastIndexOf('/');
                var b = _this.name.lastIndexOf('\\');
                if (a != -1 || b != -1) {
                    if (a > b)
                        prefix = _this.name.substring(0, a + 1);
                    else
                        prefix = _this.name.substring(0, b + 1);
                }

                while (true) {
                    var line = atlasReader.readLine();
                    if (line == null) break;
                    line = line.trim();

                    if (line.length == 0) {
                        imageName = null;
                    } else if (!imageName) {
                        imageName = line;
                        _this.toLoad++;
                        thisAnim.spine.assetManager.loadTexture(prefix + imageName,
                            _this.onload, _this.onerror);
                    } else {
                        continue;
                    }
                }

                _this.onload(path, data);
            },
        };

        if (skelType == 'json') {
            thisAnim.spine.assetManager.loadText(filename + '.json',
                reader.onload, reader.onerror);
        } else {
            thisAnim.spine.assetManager.loadBinary(filename + '.skel',
                reader.onload, reader.onerror);
        }

        thisAnim.spine.assetManager.loadText(filename + '.atlas',
            reader.ontextLoad, reader.onerror);
    };

    prepSpine(filename, autoLoad) {
        var _this = this;
        var spineAssets = _this.spine.assets;
        if (!spineAssets[filename]) {
            if (autoLoad) {
                _this.loadSpine(filename, 'skel', function(){
                    _this.prepSpine(filename);
                });
                return 'loading';
            }
            return console.error('prepSpine: [' + filename + '] 骨骼没有加载');;
        }

        var skeleton;
        var skeletons = _this.spine.skeletons;
        for (var i = 0; i < skeletons.length; i++) {
            skeleton = skeletons[i];
            if (skeleton.name == filename && skeleton.completed) return skeleton;
        }

        var asset = spineAssets[filename];
        var manager = _this.spine.assetManager;

        // 下面的获取原始数据是spine动画的固定写法, api可以参考官网 https://github.com/EsotericSoftware/spine-runtimes/blob/726ad4ddbe5c9c8b386b495692c2f55c2039d15d/spine-ts/spine-webgl/example/index.html#L158
        var skelRawData = asset.skelRawData;
        if (!skelRawData) {
            var prefix = '';
            var a = filename.lastIndexOf('/');
            var b = filename.lastIndexOf('\\');
            if (a != -1 || b != -1) {
                if (a > b)
                    prefix = filename.substring(0, a + 1);
                else
                    prefix = filename.substring(0, b + 1);
            }
            var atlas = new this.spineLib.TextureAtlas(manager.get(filename + '.atlas'), function(path){
                return manager.get(prefix + path);
            });

            var atlasLoader = new this.spineLib.AtlasAttachmentLoader(atlas);
            if (asset.skelType.toLowerCase() == 'json') {
                skelRawData = new this.spineLib.SkeletonJson(atlasLoader);
            } else {
                skelRawData = new this.spineLib.SkeletonBinary(atlasLoader);
            }

            spineAssets[filename].skelRawData = skelRawData;
            spineAssets[filename].ready = true;
        }

        var data = skelRawData.readSkeletonData(manager.get(filename + '.' + asset.skelType));
        skeleton = new this.spineLib.Skeleton(data);

        // 为骨骼添加名字
        skeleton.name = filename;
        // 标记骨骼加载状态为true
        skeleton.completed = true;

        skeleton.setSkinByName('default');
        skeleton.setToSetupPose();
        skeleton.updateWorldTransform();
        skeleton.state = new this.spineLib.AnimationState(new this.spineLib.AnimationStateData(skeleton.data));
        skeleton.state.addListener({
            complete:function(track){
                var node = skeleton.node;
                if (node) {
                    track.loop = (node.loop == null ? false : node.loop);
                    if (track.loop && node.loopCount > 0) {
                        node.loopCount--;
                        if (node.loopCount == 0) track.loop = false;
                    }
                    skeleton.completed = node.completed = !track.loop;
                    if (node.complete) node.complete();
                } else {
                    skeleton.completed = !track.loop;
                    console.error('skeleton complete: 超出预期的错误');
                }
            }
        });
        skeleton.bounds = { offset: new this.spineLib.Vector2(), size: new this.spineLib.Vector2() };
        skeleton.getBounds(skeleton.bounds.offset, skeleton.bounds.size, []);
        skeleton.defaultAction = data.animations[0].name;
        skeleton.node = undefined;
        skeletons.push(skeleton);
        return skeleton;
    };

    playSpine(sprite, position){
        if (sprite == null) return console.error('playSpine: parameter undefined');
        if (typeof sprite == 'string') sprite = { name: sprite }

        if (!this.hasSpine(sprite.name)) return console.error('playSpine: [' + sprite.name + '] 骨骼没有加载');

        var skeletons = this.spine.skeletons;
        var skeleton;
        if (!(sprite instanceof APNode3_6 && sprite.skeleton.completed)) {
            for (var i = 0; i < skeletons.length; i++) {
                skeleton = skeletons[i];
                if (skeleton.name == sprite.name && skeleton.completed) break;
                skeleton = null;
            }; if (!skeleton) skeleton = this.prepSpine(sprite.name);

            if (!(sprite instanceof APNode3_6)) {
                var param = sprite;
                sprite = new APNode3_6(sprite);
                sprite.id = param.id == null ? this.BUILT_ID++ : param.id;
                this.nodes.push(sprite);
            }

            sprite.skeleton = skeleton;
            skeleton.node = sprite;
        }

        sprite.completed = false;
        skeleton.completed = false;

        if (position != null) {
            sprite.referNode = position.parent;
            sprite.referFollow = position.follow;
            for (let k in position) {
                sprite[k] = position[k]
            }
        }

        var entry = skeleton.state.setAnimation(0, sprite.action ? sprite.action : skeleton.defaultAction, sprite.loop);
        entry.mixDuration = 0;
        if (this.requestId == null) {
            this.running = true;
            if (!this.offscreen) this.canvas.style.visibility = 'visible';
            this.requestId = requestAnimationFrame(this.newFpsRender.bind(this));
        }

        sprite.referBounds = undefined;
        return sprite;
    };

    stopSpine(sprite) {
        var nodes = this.nodes;
        var id = sprite.id == null ? sprite : sprite.id;
        for (var i = 0; i < nodes.length; i++) {
            sprite = nodes[i];
            if (sprite.id == id) {
                if (!sprite.completed) {
                    sprite.completed = true;
                    sprite.skeleton.state.setEmptyAnimation(0);
                }
                return sprite;
            }
        }

        return null;
    };

    render(timestamp) {
        var canvas = this.canvas;
        var offscreen = this.offscreen;
        var dpr = 1;
        if (this.dprAdaptive) {
            if (offscreen)
                dpr = this.dpr != null ? this.dpr : 1;
            else
                dpr = Math.max(self.devicePixelRatio * (self.documentZoom ? self.documentZoom : 1), 1);
        }
        var delta = timestamp - ((this.frameTime == null) ? timestamp : this.frameTime);
        this.frameTime = timestamp;
        var erase = true;
        var resize = !this.resized || canvas.width == 0 || canvas.height == 0;
        if (resize) {
            this.resized = true;
            if (!offscreen) {
                canvas.width  = dpr * canvas.clientWidth;
                canvas.height = dpr * canvas.clientHeight;
                erase = false;
            } else {
                if (this.width)  {
                    canvas.width  = dpr * this.width;
                    erase = false;
                }
                if (this.height) {
                    canvas.height = dpr * this.height;
                    erase = false;
                }
            }
        }

        var ea = {
            dpr: dpr,
            delta: delta,
            canvas: canvas,
            frameTime: timestamp,
        };

        var nodes = this.nodes;
        for (var i = 0; i < nodes.length; i++) {
            if (!nodes[i].completed) {
                // 不需要重新viewport那么, 更新node状态
                if (!nodes[i].viewportNode) {
                    nodes[i].update(ea);
                }
            } else {
                nodes.remove(nodes[i]);i--;
            }
        }

        var gl = this.gl;
        gl.viewport(0, 0, canvas.width, canvas.height);

        // 因为有多个program公用一个gl上下文, 所以不能直接清除. 得控制让只有一个ani来执行.
        if (gl.renderAni == null) {
            gl.renderAni = this
        }

        if (erase && gl.renderAni === this) {
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }

        if (nodes.length === 0) {
            this.frameTime = void 0;
            this.requestId = void 0;
            this.running = false;
            gl.renderAni = null
            return;
        }

        var sprite, state, skeleton;
        var shader = this.spine.shader;
        var batcher = this.spine.batcher;
        var renderer = this.spine.skeletonRenderer;

        gl.enable(gl.SCISSOR_TEST);
        gl.scissor(0, 0, canvas.width, canvas.height);

        if (this.bindShader == null) {
            this.bindShader = shader;
            shader.bind();
            shader.setUniformi(this.spineLib.webgl.Shader.SAMPLER, 0);
        }

        var speed;
        for (var i = 0; i < nodes.length; i++) {
            sprite = nodes[i];
            if (sprite.renderClip != null) {
                gl.clipping = sprite.renderClip;
                gl.scissor(gl.clipping.x, gl.clipping.y, gl.clipping.width, gl.clipping.height);
            }
            if (sprite.viewportNode) {
                let rect = sprite.viewportNode.getBoundingClientRect()
                let canvasRect = canvas.getBoundingClientRect()
                let width  = rect.right - rect.left;
                let height = rect.bottom - rect.top;
                if (rect.x + width - canvasRect.x < 0 || rect.x - canvasRect.x > canvasRect.width) {
                    continue;  // 超出canvas外面了, 不用计算世界位置了, 忽略
                }

                // 重新更新一下node的值
                sprite.update({
                    dpr: dpr,
                    delta: delta,
                    canvas: {width: width * dpr, height: height * dpr},
                    frameTime: timestamp,
                })
                // 将当前视口选在小窗的位置上
                gl.viewport((rect.x - canvasRect.x) * dpr, (canvasRect.bottom - rect.bottom) * dpr, width * dpr, height * dpr);
                gl.scissor((rect.x - canvasRect.x) * dpr, (canvasRect.bottom - rect.bottom) * dpr, width * dpr, height * dpr);
            }
            skeleton = sprite.skeleton;
            state = skeleton.state;
            speed = sprite.speed == null ? 1 : sprite.speed;
            skeleton.flipX = sprite.flipX;
            skeleton.flipY = sprite.flipY
            skeleton.opacity = (sprite.renderOpacity == null ? 1 : sprite.renderOpacity);
            state.hideSlots = sprite.hideSlots;
            state.update(delta / 1000 * speed);
            state.apply(skeleton);
            skeleton.updateWorldTransform();

            // gl.linkProgram(this.spine.shader.program);
            gl.useProgram(this.spine.shader.program);

            shader.setUniform4x4f(this.spineLib.webgl.Shader.MVP_MATRIX, sprite.mvp.values);
            batcher.begin(shader);
            renderer.premultipliedAlpha = sprite.premultipliedAlpha;
            renderer.outcropMask = this.outcropMask;
            if (renderer.outcropMask) {
                renderer.outcropX = sprite.renderX;
                renderer.outcropY = sprite.renderY;
                renderer.outcropScale = sprite.renderScale;
                renderer.outcropAngle = sprite.renderAngle;
                renderer.clipSlots = sprite.clipSlots;
            }

            renderer.hideSlots = sprite.hideSlots;
            renderer.disableMask = sprite.disableMask;
            renderer.draw(batcher, skeleton);
            batcher.end();

            if (gl.clipping) {
                gl.clipping = undefined;
                gl.scissor(0, 0, canvas.width, canvas.height);
            }

            if (sprite.viewportNode) {
                gl.viewport(0, 0, canvas.width, canvas.height);
                gl.scissor(0, 0, canvas.width, canvas.height);
            }
        }

        gl.disable(gl.SCISSOR_TEST);

        this.requestId = requestAnimationFrame(this.newFpsRender.bind(this));
    };
}

class Animation3_7 extends BaseAnimation {
    constructor (pathPrefix, canvas, dpr, isOffscreen) {
        super()
        if (!self.spine3_7) return console.error('spine 未定义.');
        this.spineLib = spine3_7

        let config = { alpha: true };
        let gl = canvas.getContext('webgl2', config);
        if (gl == null) {
            gl = canvas.getContext('webgl', config) || canvas.getContext('experimental-webgl', config);
        } else {
            gl.isWebgl2 = true;
        }

        if (isOffscreen != null) {
            this.offscreen = isOffscreen
        }
        if (gl) {
            // 定义了spine动画的相关上下文, 都是后面渲染动画需要的内容, 文档可以参考官方后面的文档, 当前的文档找不到了, 只能找到ts版本的了.
            // https://github.com/EsotericSoftware/spine-runtimes/blob/726ad4ddbe5c9c8b386b495692c2f55c2039d15d/spine-ts/spine-webgl/example/index.html#L64
            this.spine = {
                shader: this.spineLib.webgl.Shader.newTwoColoredTextured(gl),
                batcher: new this.spineLib.webgl.PolygonBatcher(gl),
                skeletonRenderer: new this.spineLib.webgl.SkeletonRenderer(gl),
                assetManager: new this.spineLib.webgl.AssetManager(gl, pathPrefix),
                assets: {},
                skeletons: [],
            }
        } else {
            this.spine = { assets: {} };
            console.error('当前设备不支持 WebGL.');
        }
        this.gl = gl;
        this.canvas = canvas;
        this.dpr = dpr
        this.dprAdaptive = true
    };

    createTextureRegion(image, name) {
        var page = new this.spineLib.TextureAtlasPage();
        page.name = name;
        page.uWrap = this.spineLib.TextureWrap.ClampToEdge;
        page.vWrap = this.spineLib.TextureWrap.ClampToEdge;
        page.texture = this.spine.assetManager.textureLoader(image);
        page.texture.setWraps(page.uWrap, page.vWrap);
        page.width = page.texture.getImage().width;
        page.height = page.texture.getImage().height;
        var region = new this.spineLib.TextureAtlasRegion();
        region.page = page;
        region.rotate = false;
        region.width = page.width;
        region.height = page.height;
        region.x = 0;
        region.y = 0;
        region.u = region.x / page.width;
        region.v = region.y / page.height;
        if (region.rotate) {
            region.u2 = (region.x + region.height) / page.width;
            region.v2 = (region.y + region.width) / page.height;
        }
        else {
            region.u2 = (region.x + region.width) / page.width;
            region.v2 = (region.y + region.height) / page.height;
        }

        region.originalWidth = page.width;
        region.originalHeight = page.height;
        region.index = -1;
        region.texture = page.texture;
        region.renderObject = region;

        return region;
    };

    loadSpine(filename, skelType, onload, onerror) {
        skelType = skelType == null ? 'skel' : skelType.toLowerCase();
        var thisAnim = this;
        var reader = {
            name: filename,
            filename: filename,
            skelType: skelType,
            onsuccess: onload,
            onfailed: onerror,
            loaded: 0,
            errors: 0,
            toLoad: 2,
            onerror:function(path, msg){
                var _this = reader;
                _this.toLoad--;
                _this.errors++;
                if (_this.toLoad == 0) {
                    console.error('loadSpine: [' + _this.filename + '] 加载失败.');
                    if (_this.onfailed) _this.onfailed();
                }
            },
            onload:function(path, data){
                var _this = reader;
                _this.toLoad--;
                _this.loaded++;
                if (_this.toLoad == 0) {
                    if (_this.errors > 0) {
                        console.error('loadSpine: [' + _this.filename + '] 加载失败.');
                        if (_this.onfailed) _this.onfailed();
                    } else {
                        thisAnim.spine.assets[_this.filename] = { name: _this.filename, skelType: _this.skelType };
                        if (_this.onsuccess) _this.onsuccess();
                    }
                }
            },
            ontextLoad:function(path, data){
                var _this = reader;
                var imageName = null;
                var atlasReader = new thisAnim.spineLib.TextureAtlasReader(data);
                var prefix = '';
                var a = _this.name.lastIndexOf('/');
                var b = _this.name.lastIndexOf('\\');
                if (a != -1 || b != -1) {
                    if (a > b)
                        prefix = _this.name.substring(0, a + 1);
                    else
                        prefix = _this.name.substring(0, b + 1);
                }

                while (true) {
                    var line = atlasReader.readLine();
                    if (line == null) break;
                    line = line.trim();

                    if (line.length == 0) {
                        imageName = null;
                    } else if (!imageName) {
                        imageName = line;
                        _this.toLoad++;
                        thisAnim.spine.assetManager.loadTexture(prefix + imageName,
                            _this.onload, _this.onerror);
                    } else {
                        continue;
                    }
                }

                _this.onload(path, data);
            },
        };

        if (skelType == 'json') {
            thisAnim.spine.assetManager.loadText(filename + '.json',
                reader.onload, reader.onerror);
        } else {
            thisAnim.spine.assetManager.loadBinary(filename + '.skel',
                reader.onload, reader.onerror);
        }

        thisAnim.spine.assetManager.loadText(filename + '.atlas',
            reader.ontextLoad, reader.onerror);
    };

    prepSpine(filename, autoLoad) {
        var _this = this;
        var spineAssets = _this.spine.assets;
        if (!spineAssets[filename]) {
            if (autoLoad) {
                _this.loadSpine(filename, 'skel', function(){
                    _this.prepSpine(filename);
                });
                return 'loading';
            }
            return console.error('prepSpine: [' + filename + '] 骨骼没有加载');;
        }

        var skeleton;
        var skeletons = _this.spine.skeletons;
        for (var i = 0; i < skeletons.length; i++) {
            skeleton = skeletons[i];
            if (skeleton.name == filename && skeleton.completed) return skeleton;
        }

        var asset = spineAssets[filename];
        var manager = _this.spine.assetManager;

        // 下面的获取原始数据是spine动画的固定写法, api可以参考官网 https://github.com/EsotericSoftware/spine-runtimes/blob/726ad4ddbe5c9c8b386b495692c2f55c2039d15d/spine-ts/spine-webgl/example/index.html#L158
        var skelRawData = asset.skelRawData;
        if (!skelRawData) {
            var prefix = '';
            var a = filename.lastIndexOf('/');
            var b = filename.lastIndexOf('\\');
            if (a != -1 || b != -1) {
                if (a > b)
                    prefix = filename.substring(0, a + 1);
                else
                    prefix = filename.substring(0, b + 1);
            }
            var atlas = new this.spineLib.TextureAtlas(manager.get(filename + '.atlas'), function(path){
                return manager.get(prefix + path);
            });

            var atlasLoader = new this.spineLib.AtlasAttachmentLoader(atlas);
            if (asset.skelType.toLowerCase() == 'json') {
                skelRawData = new this.spineLib.SkeletonJson(atlasLoader);
            } else {
                skelRawData = new this.spineLib.SkeletonBinary(atlasLoader);
            }

            spineAssets[filename].skelRawData = skelRawData;
            spineAssets[filename].ready = true;
        }

        var data = skelRawData.readSkeletonData(manager.get(filename + '.' + asset.skelType));
        skeleton = new this.spineLib.Skeleton(data);

        // 为骨骼添加名字
        skeleton.name = filename;
        // 标记骨骼加载状态为true
        skeleton.completed = true;

        skeleton.setSkinByName('default');
        skeleton.setToSetupPose();
        skeleton.updateWorldTransform();
        skeleton.state = new this.spineLib.AnimationState(new this.spineLib.AnimationStateData(skeleton.data));
        skeleton.state.addListener({
            complete:function(track){
                var node = skeleton.node;
                if (node) {
                    track.loop = (node.loop == null ? false : node.loop);
                    if (track.loop && node.loopCount > 0) {
                        node.loopCount--;
                        if (node.loopCount == 0) track.loop = false;
                    }
                    skeleton.completed = node.completed = !track.loop;
                    if (node.complete) node.complete();
                } else {
                    skeleton.completed = !track.loop;
                    console.error('skeleton complete: 超出预期的错误');
                }
            }
        });
        skeleton.bounds = { offset: new this.spineLib.Vector2(), size: new this.spineLib.Vector2() };
        skeleton.getBounds(skeleton.bounds.offset, skeleton.bounds.size, []);
        skeleton.defaultAction = data.animations[0].name;
        skeleton.node = undefined;
        skeletons.push(skeleton);
        return skeleton;
    };

    playSpine(sprite, position){
        if (sprite == null) return console.error('playSpine: parameter undefined');
        if (typeof sprite == 'string') sprite = { name: sprite }

        if (!this.hasSpine(sprite.name)) return console.error('playSpine: [' + sprite.name + '] 骨骼没有加载');

        var skeletons = this.spine.skeletons;
        var skeleton;
        if (!(sprite instanceof APNode3_6 && sprite.skeleton.completed)) {
            for (var i = 0; i < skeletons.length; i++) {
                skeleton = skeletons[i];
                if (skeleton.name == sprite.name && skeleton.completed) break;
                skeleton = null;
            }; if (!skeleton) skeleton = this.prepSpine(sprite.name);

            if (!(sprite instanceof APNode3_6)) {
                var param = sprite;
                sprite = new APNode3_6(sprite);
                sprite.id = param.id == null ? this.BUILT_ID++ : param.id;
                this.nodes.push(sprite);
            }

            sprite.skeleton = skeleton;
            skeleton.node = sprite;
        }

        sprite.completed = false;
        skeleton.completed = false;

        if (position != null) {
            sprite.referNode = position.parent;
            sprite.referFollow = position.follow;
            for (let k in position) {
                sprite[k] = position[k]
            }
        }

        var entry = skeleton.state.setAnimation(0, sprite.action ? sprite.action : skeleton.defaultAction, sprite.loop);
        entry.mixDuration = 0;
        if (this.requestId == null) {
            this.running = true;
            if (!this.offscreen) this.canvas.style.visibility = 'visible';
            this.requestId = requestAnimationFrame(this.newFpsRender.bind(this));
        }

        sprite.referBounds = undefined;
        return sprite;
    };

    stopSpine(sprite) {
        var nodes = this.nodes;
        var id = sprite.id == null ? sprite : sprite.id;
        for (var i = 0; i < nodes.length; i++) {
            sprite = nodes[i];
            if (sprite.id == id) {
                if (!sprite.completed) {
                    sprite.completed = true;
                    sprite.skeleton.state.setEmptyAnimation(0);
                }
                return sprite;
            }
        }

        return null;
    };

    render(timestamp) {
        var canvas = this.canvas;
        var offscreen = this.offscreen;
        var dpr = 1;
        if (this.dprAdaptive) {
            if (offscreen)
                dpr = this.dpr != null ? this.dpr : 1;
            else
                dpr = Math.max(self.devicePixelRatio * (self.documentZoom ? self.documentZoom : 1), 1);
        }
        var delta = timestamp - ((this.frameTime == null) ? timestamp : this.frameTime);
        this.frameTime = timestamp;
        var erase = true;
        var resize = !this.resized || canvas.width == 0 || canvas.height == 0;
        if (resize) {
            this.resized = true;
            if (!offscreen) {
                canvas.width  = dpr * canvas.clientWidth;
                canvas.height = dpr * canvas.clientHeight;
                erase = false;
            } else {
                if (this.width)  {
                    canvas.width  = dpr * this.width;
                    erase = false;
                }
                if (this.height) {
                    canvas.height = dpr * this.height;
                    erase = false;
                }
            }
        }

        var ea = {
            dpr: dpr,
            delta: delta,
            canvas: canvas,
            frameTime: timestamp,
        };

        var nodes = this.nodes;
        for (var i = 0; i < nodes.length; i++) {
            if (!nodes[i].completed) {
                // 不需要重新viewport那么, 更新node状态
                if (!nodes[i].viewportNode) {
                    nodes[i].update(ea);
                }
            } else {
                nodes.remove(nodes[i]);i--;
            }
        }

        var gl = this.gl;
        gl.viewport(0, 0, canvas.width, canvas.height);

        // 因为有多个program公用一个gl上下文, 所以不能直接清除. 得控制让只有一个ani来执行.
        if (gl.renderAni == null) {
            gl.renderAni = this
        }

        if (erase && gl.renderAni === this) {
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }

        if (nodes.length === 0) {
            this.frameTime = void 0;
            this.requestId = void 0;
            this.running = false;
            gl.renderAni = null
            return;
        }

        var sprite, state, skeleton;
        var shader = this.spine.shader;
        var batcher = this.spine.batcher;
        var renderer = this.spine.skeletonRenderer;

        gl.enable(gl.SCISSOR_TEST);
        gl.scissor(0, 0, canvas.width, canvas.height);

        if (this.bindShader == null) {
            this.bindShader = shader;
            shader.bind();
            shader.setUniformi(this.spineLib.webgl.Shader.SAMPLER, 0);
        }

        var speed;
        for (var i = 0; i < nodes.length; i++) {
            sprite = nodes[i];
            if (sprite.renderClip != null) {
                gl.clipping = sprite.renderClip;
                gl.scissor(gl.clipping.x, gl.clipping.y, gl.clipping.width, gl.clipping.height);
            }

            if (sprite.viewportNode) {
                let rect = sprite.viewportNode.getBoundingClientRect()
                let canvasRect = canvas.getBoundingClientRect()
                let width  = rect.right - rect.left;
                let height = rect.bottom - rect.top;
                if (rect.x + width - canvasRect.x < 0 || rect.x - canvasRect.x > canvasRect.width) {
                    continue;  // 超出canvas外面了, 不用计算世界位置了, 忽略
                }

                // 重新更新一下node的值
                sprite.update({
                    dpr: dpr,
                    delta: delta,
                    canvas: {width: width * dpr, height: height * dpr},
                    frameTime: timestamp,
                })
                // 将当前视口选在小窗的位置上
                gl.viewport((rect.x - canvasRect.x) * dpr, (canvasRect.bottom - rect.bottom) * dpr, width * dpr, height * dpr);
                gl.scissor((rect.x - canvasRect.x) * dpr, (canvasRect.bottom - rect.bottom) * dpr, width * dpr, height * dpr);
            }

            skeleton = sprite.skeleton;
            state = skeleton.state;
            speed = sprite.speed == null ? 1 : sprite.speed;
            skeleton.flipX = sprite.flipX;
            skeleton.flipY = sprite.flipY
            skeleton.opacity = (sprite.renderOpacity == null ? 1 : sprite.renderOpacity);
            state.hideSlots = sprite.hideSlots;
            state.update(delta / 1000 * speed);
            state.apply(skeleton);
            skeleton.updateWorldTransform();

            // gl.linkProgram(this.spine.shader.program);
            gl.useProgram(this.spine.shader.program);

            shader.setUniform4x4f(this.spineLib.webgl.Shader.MVP_MATRIX, sprite.mvp.values);
            batcher.begin(shader);
            renderer.premultipliedAlpha = sprite.premultipliedAlpha;
            renderer.outcropMask = this.outcropMask;
            if (renderer.outcropMask) {
                renderer.outcropX = sprite.renderX;
                renderer.outcropY = sprite.renderY;
                renderer.outcropScale = sprite.renderScale;
                renderer.outcropAngle = sprite.renderAngle;
                renderer.clipSlots = sprite.clipSlots;
            }

            renderer.hideSlots = sprite.hideSlots;
            renderer.disableMask = sprite.disableMask;
            renderer.draw(batcher, skeleton);
            batcher.end();

            if (gl.clipping) {
                gl.clipping = undefined;
                gl.scissor(0, 0, canvas.width, canvas.height);
            }

            if (sprite.viewportNode) {
                gl.viewport(0, 0, canvas.width, canvas.height);
                gl.scissor(0, 0, canvas.width, canvas.height);
            }
        }

        gl.disable(gl.SCISSOR_TEST);

        this.requestId = requestAnimationFrame(this.newFpsRender.bind(this));
    };
}

// 多版本管理器, 自动根据传过来的id选择正确的版本来进行播放.
class AnimationManager {

    constructor(pathPrefix, canvas, id, params) {
        this.pathPrefix = pathPrefix  // 资源路径前缀
        this.canvas = canvas  // 为了节省资源, 一个canvas公用
        this.id = id == null ? 777777 : id   // 每个角色的动皮对应一个id, 而每个角色又可能同时使用不同版本的动皮
        this.animations = {}
        if (params) {
            this.dpr = params.dpr
            this.dprAdaptive = true
            if (params.animation) {
                this.animations[SupportSpineVersion.v3_6] = params.animation
            }
            if (params.offscreen != null) {
                this.offscreen = params.offscreen
            } else {
                this.offscreen = true
            }
        }
        this.width = undefined
        this.height = undefined
        this.aniVersionMap = {}
    }

    /**
     * 获取一个指定版本的anim
     * @param version {string|null}
     * @returns {BaseAnimation}
     */
    getAnimation(version) {
        if (version == null) {
            version = '3.6'
        }

        switch (version) {
            case SupportSpineVersion.v3_6:
                if (!this.animations[version]) {
                    this.animations[version] = new Animation3_6(this.pathPrefix, this.canvas, this.dpr, this.offscreen)
                    this.animations[version].update({width: this.width, height: this.height})
                }
                break
            case SupportSpineVersion.v4_0:
                if (!this.animations[version]) {
                    this.animations[version] = new Animation4_0(this.pathPrefix, this.canvas, this.dpr, this.offscreen)
                    this.animations[version].update({width: this.width, height: this.height})
                }
                break
            case SupportSpineVersion.v3_8:
                if (!this.animations[version]) {
                    this.animations[version] = new Animation3_8(this.pathPrefix, this.canvas, this.dpr, this.offscreen)
                    this.animations[version].update({width: this.width, height: this.height})
                }
                break
            case SupportSpineVersion.v3_5_35:
                if (!this.animations[version]) {
                    this.animations[version] = new Animation3_5_35(this.pathPrefix, this.canvas, this.dpr, this.offscreen)
                    this.animations[version].update({width: this.width, height: this.height})
                }
                break
            case SupportSpineVersion.v3_7:
                if (!this.animations[version]) {
                    this.animations[version] = new Animation3_7(this.pathPrefix, this.canvas, this.dpr, this.offscreen)
                    this.animations[version].update({width: this.width, height: this.height})
                }
                break
            case SupportSpineVersion.v4_1:
                if (!this.animations[version]) {
                    this.animations[version] = new Animation4_1(this.pathPrefix, this.canvas, this.dpr, this.offscreen)
                    this.animations[version].update({width: this.width, height: this.height})
                }
                break
            case SupportSpineVersion.v4_2:
                if (!this.animations[version]) {
                    this.animations[version] = new Animation4_2(this.pathPrefix, this.canvas, this.dpr, this.offscreen)
                    this.animations[version].update({width: this.width, height: this.height})
                }
                break
            default:
                if (!this.animations[SupportSpineVersion.v3_6]) {
                    this.animations[SupportSpineVersion.v3_6] = new Animation3_6(this.pathPrefix, this.canvas, this.dpr, this.offscreen)
                    this.animations[version].update({width: this.width, height: this.height})
                }
                return this.animations[SupportSpineVersion.v3_6]
        }
        return this.animations[version]
    }

    /**
     * 获取一个指定版本的anim
     * @param skinId {Number}
     * @returns {BaseAnimation}
     */
    getAnimationBySkinId(skinId) {
        let ani
        if (100000 > skinId && skinId >= Ani4_2_StartId) {
            ani = this.getAnimation(SupportSpineVersion.v4_2)
        }
        if (90000 > skinId && skinId >= Ani4_1_StartId) {
            ani = this.getAnimation(SupportSpineVersion.v4_1)
        }
        else if (80000 > skinId && skinId >= Ani3_7_StartId) {
            ani = this.getAnimation(SupportSpineVersion.v3_7)
        }
        else if (70000 > skinId && skinId >= Ani3_5_35_StartId) {
            ani = this.getAnimation(SupportSpineVersion.v3_5_35)
        }else if (60000 > skinId && skinId >= Ani3_8StartId) {
            ani = this.getAnimation(SupportSpineVersion.v3_8)
        } else if (50000 > skinId && skinId >= Ani4StartId) {
            ani = this.getAnimation(SupportSpineVersion.v4_0)
        } else {
            ani = this.getAnimation(SupportSpineVersion.v3_6)
        }
        return ani
    }

    /**
     * 获取一个APNode对象
     * @param skinId {Number}
     * @returns {BaseAPNode}
     */
    getNodeBySkinId(skinId) {
        let ani = this.getAnimationBySkinId(skinId)
        if (ani.nodes.length > 0) {
            for (let i = 0; i < ani.nodes.length; i++) {
                let temp = ani.nodes[i];
                if (temp.id === skinId) {
                    return temp
                }
            }
        } else {
            return null
        }
    }
    /**
     * 停止所有spine动画
     */
    stopSpineAll() {
        // 删除自己所有的活动的spine动画
        for (let k in this.animations) {
            if (this.animations[k]) {
                this.animations[k].stopSpineAll()
            }
        }
    }

    // 更新所有版本播放器的相关数据
    updateSpineAll(data) {
        if (data.width) {
            this.width = data.width
        }
        if (data.height) {
            this.height = data.height
        }
        if (data.dpr) {
            this.dpr = data.dpr
        }
        for (let k in this.animations) {
            if (this.animations[k]) {
                let dynamic = this.animations[k]
                dynamic.update(data)
            }
        }
    }

    /**
     * 加载骨骼并且播放, version参数包含在data里了
     * @param sprite  播放参数, 包含位置信息等
     * @param onsuccess 参数是播放后的sprite
     * @param onerror
     * @param position  同原来的位置参数
     */
    loadAndPlay(sprite, onsuccess, onerror, position) {
        let version = sprite.version
        let dynamic = this.getAnimation(version)
        if (typeof sprite === 'string') {
            sprite = {name: sprite}
        }
        if (dynamic.hasSpine(sprite.name)) {
            let node = dynamic.playSpine(sprite, position)
            if (onsuccess) onsuccess(node)
        } else {
            dynamic.loadSpine(sprite.name, sprite.json ? 'json': 'skel', () => {
                let node = dynamic.playSpine(sprite, position)
                if (onsuccess) {
                    onsuccess(node)
                }
            }, (data) => {
                if (onerror) onerror(data)
                console.error('播放spine error', data)
            })
        }
    }
}


// todo: 代理十周年ui原来非离屏渲染的动画, 功能暂时有问题, 有些是异步返回的, 需要修改的有点多
class DecadeAnimationOffscreenProxy {

    constructor(animation, pathPrefix, lib) {
        if (!animation) return

        let destroyOldCanvas = () => {
            let webglExt = animation.gl.getExtension('WEBGL_lose_context')
            if (webglExt) {
                webglExt.loseContext()
            }
            delete animation.canvas
            document.getElementById('decadeUI-canvas').remove()
        }
        destroyOldCanvas()

        let canvas = document.createElement('canvas');
        canvas.className = 'animation-player';
        canvas.id = 'decadeUI-canvas'
        document.body.appendChild(canvas);

        let offsetCanvas = canvas.transferControlToOffscreen()
        this.worker = new Worker(skinSwitch.url +'chukuangWorker.js')
        // 监听屏幕大小变化, 重新更新canvas大小
        if (self.ResizeObserver) {
            let ro = new ResizeObserver(entries => {
                for (let entry of entries) {
                    const cr = entry.contentRect
                    this.worker.postMessage({
                        message: 'UPDATE',
                        width: cr.width,
                        height: cr.height,
                    })
                }
            });
            ro.observe(document.body);
        }
        this.worker.onmessage = this.onmessage.bind(this)
        this.eventId = 33333  // 管理每个eventId请求id
        this.eventMap = {}  // 处理所以的回调
        this.worker.postMessage({
            message: 'CREATE_DECADE_ANI',
            canvas: offsetCanvas,
            pathPrefix: '../十周年UI/assets/animation/',
            isMobile: skinSwitch.isMobile(),
        }, [offsetCanvas])
        // this.cap = {
        //     playSpineTo: (element, animation, position) => {
        //         return this.playSpine(animation, position)
        //     },
        //     loadSpine: (filename, skelType, onload, onerror) => {
        //         return this.loadSpine(filename, skelType, onload, onerror)
        //     }
        // }
        let _this = this
        lib.arenaReady.push(function () {
            _this.worker.postMessage({
                message: 'UPDATE',
                width: decadeUI.get.bodySize().width,
                height: decadeUI.get.bodySize().height,
                dpr: Math.max(window.devicePixelRatio * (window.documentZoom ? window.documentZoom : 1), 1)
            })
            // 提前加载
            for (let item of fileList) {
                _this.loadSpine(item.name, item.fileType ? item.fileType : 'skel', null, () => {
                    console.log('骨骼加载失败', item.name)
                }, '3.6')
            }
        });
        this.cap = animation.cap

        var skillAnimation = (function(){
            var defines = {
                skill:{
                    bagua_skill: { skill: 'bagua_skill', name: 'effect_baguazhen', scale: 0.6 },
                    baiyin_skill: { skill: 'baiyin_skill', name: 'effect_baiyinshizi', scale: 0.5 },
                    bazhen_bagua: { skill: 'bazhen_bagua', name: 'effect_baguazhen', scale: 0.6 },
                    cixiong_skill: { skill: 'cixiong_skill', name: 'effect_cixiongshuanggujian', scale: 0.5 },
                    fangtian_skill: { skill: 'fangtian_skill', name: 'effect_fangtianhuaji', scale: 0.7 },
                    guanshi_skill: { skill: 'guanshi_skill', name: 'effect_guanshifu', scale: 0.7 },
                    guding_skill: { skill: 'guding_skill', name: 'effect_gudingdao', scale: 0.6, x: [0, 0.4], y: [0, 0.05] },
                    hanbing_skill: { skill: 'hanbing_skill', name: 'effect_hanbingjian', scale: 0.5 },
                    linglong_bagua: { skill: 'linglong_bagua', name: 'effect_baguazhen', scale: 0.5 },
                    qilin_skill: { skill: 'qilin_skill', name: 'effect_qilingong', scale: 0.5 },
                    qinggang_skill: { skill: 'qinggang_skill', name: 'effect_qinggangjian', scale: 0.7 },
                    qinglong_skill: { skill: 'qinglong_skill', name: 'effect_qinglongyanyuedao', scale: 0.6 },
                    renwang_skill: { skill: 'renwang_skill', name: 'effect_renwangdun', scale: 0.5 },
                    tengjia1: { skill: 'tengjia1', name: 'effect_tengjiafangyu', scale: 0.6 },
                    tengjia2: { skill: 'tengjia2', name: 'effect_tengjiaranshao', scale: 0.6 },
                    tengjia3: { skill: 'tengjia3', name: 'effect_tengjiafangyu', scale: 0.6 },
                    zhangba_skill: { skill: 'zhangba_skill', name: 'effect_zhangbashemao', scale: 0.7 },
                    zhuge_skill: { skill: 'zhuge_skill', name: 'effect_zhugeliannu', scale: 0.5 },
                    zhuque_skill: { skill: 'zhuque_skill', name: 'effect_zhuqueyushan', scale: 0.6 },
                    jinhe_lose: { skill: 'jinhe_lose', name: 'effect_jinhe',scale: 0.4 },
                    numa: { skill: 'numa', name: 'effect_numa', scale: 0.4 },
                    nvzhuang: { skill: 'nvzhuang', name: 'effect_nvzhuang', scale: 0.5 },
                    wufengjian_skill: { skill: 'wufengjian_skill', name: 'effect_wufengjian', scale: 0.4 },
                    yajiaoqiang_skill: { skill: 'yajiaoqiang_skill', name: 'effect_yajiaoqiang', scale: 0.5 },
                    yinfengjia_skill: { skill: 'yinfengjia_skill', name: 'effect_yinfengjia', scale: 0.5 },
                    zheji: { skill: 'zheji', name: 'effect_zheji', scale: 0.35 },
                    lebu: { skill: 'lebu', name: 'effect_lebusishu', scale: 0.7 },
                    bingliang: { skill: 'bingliang', name: 'effect_bingliangcunduan', scale: 0.7 },
                    shandian: { skill: 'shandian', name: 'effect_shandian', scale: 0.7 },
                },
                card: {
                    nanman: { card: 'nanman', name: 'effect_nanmanruqin', scale: 0.6, y: [0, 0.4] },
                    wanjian: { card: 'wanjian', name: 'effect_wanjianqifa_full', scale: 1.5},
                    taoyuan: { card: 'taoyuan', name: 'effect_taoyuanjieyi'},
                }
            }

            var cardAnimate = function(card){
                var anim = defines.card[card.name];
                if (!anim) return console.error('cardAnimate:' + card.name);
                _this.playSpine(anim.name, { x: anim.x, y: anim.y, scale: anim.scale });
            };

            for (var key in defines.card) {
                lib.animate.card[defines.card[key].card] = cardAnimate;
            }

            var skillAnimate = function (name) {
                var anim = defines.skill[name];
                if (!anim) return console.error('skillAnimate:' + name);
                _this.playSpine(anim.name, { x: anim.x, y: anim.y, scale: anim.scale, parent:this });
            };

            for (var key in defines.skill) {
                lib.animate.skill[defines.skill[key].skill] = skillAnimate;
            }

        })();

        var fileList = [
            { name: 'effect_youxikaishi' },
            { name: 'effect_youxikaishi_shousha' },
            { name: 'effect_baguazhen' },
            { name: 'effect_baiyinshizi' },
            { name: 'effect_cixiongshuanggujian' },
            { name: 'effect_fangtianhuaji' },
            { name: 'effect_guanshifu' },
            { name: 'effect_gudingdao' },
            { name: 'effect_hanbingjian' },
            { name: 'effect_qilingong' },
            { name: 'effect_qinggangjian' },
            { name: 'effect_qinglongyanyuedao' },
            { name: 'effect_renwangdun' },
            { name: 'effect_shoujidonghua' },
            { name: 'effect_tengjiafangyu' },
            { name: 'effect_tengjiaranshao' },
            { name: 'effect_zhangbashemao' },
            { name: 'effect_zhiliao' },
            { name: 'effect_zhugeliannu' },
            { name: 'effect_zhuqueyushan' },
            { name: 'effect_jinhe' },
            { name: 'effect_numa' },
            { name: 'effect_nvzhuang' },
            { name: 'effect_wufengjian' },
            { name: 'effect_yajiaoqiang' },
            { name: 'effect_yinfengjia' },
            { name: 'effect_zheji' },
            { name: 'effect_jisha1' },
            { name: 'effect_zhenwang' },
            { name: 'effect_lebusishu' },
            { name: 'effect_bingliangcunduan' },
            { name: 'effect_nanmanruqin'},
            { name: 'effect_taoyuanjieyi'},
            { name: 'effect_shandian' },
            { name: 'effect_wanjianqifa_full'},
            { name: 'effect_xianding', fileType: 'json' },
            { name: 'huanfu'},//国战亮将
            { name: 'SSZBB_PJN_junling'},//军令翻牌特效
        ]
    }

    onmessage(data) {
        if (data && data.data) {
            let eventId = data.data.eventId
            if (eventId in this.eventMap) {
                this.eventMap[eventId](data.data)
                delete this.eventMap[eventId]
                console.log('this.eventMap', this.eventMap)
            }
        }

    }

    postFuncMsg(funcName, args, callback) {
        let eventId = this.eventId++
        this.worker.postMessage({
            message: 'DECADE_ANI_FUNC',
            funcName: funcName,
            args: args,
            eventId: eventId
        })
        if (callback) {
            this.eventMap[eventId] = callback
        }

    }

    createTextureRegion(image, name) {
       this.postFuncMsg('createTextureRegion', [image, name])
    };

    hasSpine(filename) {
        return true
        this.postFuncMsg('hasSpine', [filename])
    };

    loadSpine(filename, skelType, onload, onerror, version) {
        this.postFuncMsg('loadSpine', [filename, skelType, version], data => {
            if (data.success && onload) {
                onload()
            } else if (data.error && onerror) {
                onerror()
            }
        })
    }

    prepSpine(filename, autoLoad) {
        this.postFuncMsg('prepSpine', [filename, autoLoad])
    };

    playSpine(sprite, position){
        if (position && position.parent) {
            position.parent = {
                boundRect: position.parent.getBoundingClientRect(),
                bodySize: {
                    bodyWidth: decadeUI.get.bodySize().width,
                    bodyHeight: decadeUI.get.bodySize().height
                }
            }
        }
        this.postFuncMsg('playSpine', [sprite, position])
    };

    loopSpine(sprite, position) {
        if (position && position.parent) {
            position.parent = {
                boundRect: position.parent.getBoundingClientRect(),
                bodySize: {
                    bodyWidth: decadeUI.get.bodySize().width,
                    bodyHeight: decadeUI.get.bodySize().height
                }
            }
        }
        this.postFuncMsg('loopSpine', [sprite, position])
    };

    stopSpine(sprite) {
        this.postFuncMsg('stopSpine', [sprite])
    };

    stopSpineAll() {
        this.postFuncMsg('stopSpineAll', [])
    };

    getSpineActions(filename, callback) {
        this.postFuncMsg('getSpineActions', [filename], (data) => {
            console.log('响应消息, data======', data)
        })
    };

    getSpineBounds(filename, callback) {
        this.postFuncMsg('getSpineBounds', [filename], (data) => {
            if (callback) {
                console.log('---> bounds', data)
                callback(data.data)
            }
        })
    };

}


// todo: 这个没有啥用处, 考虑删掉
class DecadeAnimationProxy {

    constructor(animation, lib) {
        if (!animation) return
        animation.render = Animation3_6.prototype.render.bind(animation)
        this.am = new AnimationManager(lib.assetURL + 'extension/十周年UI/assets/animation/', animation.canvas, 88888, )
        this.cap = animation.cap
        this.nameVersionMap = {}
        this.canvas = animation.canvas
    }

    createTextureRegion(image, name, version) {
        return this.getAni(null, version).loadSpine(image, name)
    }

    /**
     *
     * @param name 骨骼名称
     * @param version 可以指定版本, 如果不指定会优先去查询已经加载的骨骼, 如果已经加载了, 可以省略此参数, 否则默认3.6
     * @returns {BaseAnimation}
     */
    getAni(name, version) {
        if (version) {
            return this.am.getAnimation(version)
        }
        return this.am.getAnimation(this.nameVersionMap[name])
    }

    hasSpine(name, version) {
        return this.getAni(name, version).hasSpine(name)
    };

    loadSpine(filename, skelType, onload, onerror, version) {
        let _this = this
        return this.getAni(filename, version).loadSpine(filename, skelType, () => {
            if (version && version !== '3.6') {
                _this.nameVersionMap[filename] = version
            }
            if (onload) onload()
        }, onerror)
    }

    prepSpine(filename, autoLoad, version) {
        return this.getAni(filename, version).prepSpine(filename, autoLoad)
    };

    playSpine(sprite, position, version){
        if (typeof sprite === 'string') {
            sprite = {name: sprite}
        }
        return this.getAni(sprite.name, version).playSpine(sprite, position);
    };

    loopSpine(sprite, position, version) {
        if (typeof sprite === 'string') {
            sprite = {name: sprite}
        }
        return this.getAni(sprite.name, version).playSpine(sprite, position);
    };

    stopSpine(sprite, version) {
        if (typeof sprite === 'string') {
            sprite = {name: sprite}
        }
        return this.getAni(sprite.name, version).stopSpine(sprite);
    };

    stopSpineAll(version) {
        return this.getAni(null, version).stopSpineAll();
    };

    getSpineActions(filename, version) {
        return this.getAni(filename, version).getSpineActions(filename);
    };

    getSpineBounds(filename, version) {
        return this.getAni(filename, version).getSpineBounds(filename);
    };

    // 不检查是否已经加载, 如果未加载, 会先加载然后进行播放
    loadAndPlaySpine(sprite, position, version, onsuccess, onerror) {
        let _this = this
        if (typeof sprite === 'string') {
            sprite = {name: sprite}
        }
        let dynamic = this.getAni(sprite.name, version);
        if (dynamic.hasSpine(sprite.name)) {
            dynamic.playSpine(sprite, position)
            if (onsuccess) onsuccess()
        } else {
            dynamic.loadSpine(sprite.name, sprite.json ? 'json': 'skel', () => {
                if (version && version !== '3.6') {
                    _this.nameVersionMap[sprite.name] = version
                }
                console.log('version.....', version, sprite)
                dynamic.playSpine(sprite, position)
                if (onsuccess) {
                    onsuccess()
                }
            }, (data) => {
                if (onerror) onerror(data)
                console.log('error', data)
            })
        }
    }
}


if (self.window) {
    window.DecadeAnimationOffscreenProxy = DecadeAnimationOffscreenProxy
    window.DecadeAnimationProxy = DecadeAnimationProxy
    window.AnimationManager = AnimationManager
}



