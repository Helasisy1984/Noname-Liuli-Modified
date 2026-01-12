/*
 * @!: *********************************************************************
 * @Author: Weidows
 * @LastEditors: Weidows
 * @Date: 2023-02-04 20:29:50
 * @LastEditTime: 2023-02-10 00:46:44
 * @FilePath: \Blog-private\source\_posts\Web\JavaScript\Live2dLoader\src\Live2dLoader.js
 * @Description: live2d loader
 * @?: *********************************************************************
 */

// Under two lines for dev to see functions, Comment before Commit.
// import * as PIXI from "pixi.js";
// import * as live2d from "pixi-live2d-display";

// 来自于 https://github.com/Weidows-projects/Live2dLoader  修改
var live2d = PIXI.live2d;

var CustomLive2dLoader = class Live2dLoader {
    constructor(models) {
        let config = models[0];
        this.load(config);
    }

    isMobile() {
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent));
    }

    async load(config) {
        let canvas = document.createElement("canvas");
        canvas.id = "l2dCanvas";
        document.body.appendChild(canvas);
        this.canvas = canvas
        canvas.style.position = "fixed";
        canvas.style.zIndex = '2'
        // canvas.style.border = '1px solid red'
        if (config.left) canvas.style.left = config.left;
        if (config.right) canvas.style.right = config.right;
        if (config.top) canvas.style.top = config.top;
        else if (config.bottom) canvas.style.bottom = config.bottom;
        else canvas.style.bottom = 0;
        if (config.opacity) canvas.style.opacity = config.opacity;
        if (config.background) {
            canvas.style.background = "url(" + config.background + ")";
            canvas.style.backgroundSize = "cover";
        }

        let dpr = Math.max(window.devicePixelRatio * (window.documentZoom ? window.documentZoom : 1), 1);
        canvas.style.height = config.height * 100 + '%'
        canvas.style.width = config.width * 100 + '%'
        config.height = config.height * skinSwitch.bodySize().height * dpr
        config.width = config.width * skinSwitch.bodySize().width * dpr

        // console.log(app.renderer.type); // 回傳目前 PixiJS app 的renderer 模式：
        // PIXI.RENDERER_TYPE，值為 0、1、2
        this.app = new PIXI.Application({
            view: document.getElementById("l2dCanvas"),
            width: config.width || 800,
            height: config.height || 600,
            transparent: true,
            antialias: true, // 抗锯齿
            autoStart: true,
        });

        await this.initModel(config)
        this.initMotionSelectDiv(config)
    }

    initMotionSelectDiv(config) {
        // 初始化表情选择样式
        let _this = this
        const ui = skinSwitch.ui
        const lib = skinSwitch.lib
        const game = skinSwitch.game
        let box = ui.create.div('.l2d-hoverBox .hidden', document.body)
        box.id = 'l2d-hoverBox'
        let rect = this.canvas.getBoundingClientRect()
        box.id = 'l2dHoverBox'
        box.style.left = (parseInt(config.left) || 0) + rect.width / 3 + 'px'
        box.style.bottom = (parseInt(config.bottom) || 0) + rect.height / 2 + 'px'

        let toolBtn = ui.create.div('.l2d-hoverBtn', box)
        let img = document.createElement('img')
        img.style.width = '95%'
        img.style.height = '95%'
        toolBtn.appendChild(img)
        img.src = lib.assetURL + 'extension/皮肤切换/images/other/l2d-tool.png'

        let nextBtn = ui.create.div('.l2d-next-hoverBtn', box)
        let img2 = document.createElement('img')
        img2.style.width = '70%'
        img2.style.height = '70%'
        img2.style.verticalAlign = 'middle'
        nextBtn.appendChild(img2)
        img2.src = lib.assetURL + 'extension/皮肤切换/images/other/change-model.png'

        const clickEvent = lib.config.touchscreen ? 'touchend' : 'click'
        const downEvent = lib.config.touchscreen ? 'touchstart' : 'mousedown'
        const moveEvent = lib.config.touchscreen ? 'touchmove' : 'mousemove'
        const upEvent = lib.config.touchscreen ? 'touchend' : 'mouseup'
        const cancelEvent = lib.config.touchscreen ? 'touchcancel' : 'mouseleave'

        let toolDiv = ui.create.div('.l2d-tool-background hidden', document.body)
        toolDiv.id = 'l2d-tool-div'
        toolDiv.innerHTML = `
            <div class="model-setting" id="l2d-model-setting">
<!--                <div class="cur-model" id="l2d-cur-model">当前model: xxxx</div>-->
                <div class="l2d-button1" id="l2d-button1" style="background-image: url(&quot;extension/皮肤切换/images/other/newui_button_selected_wz.png&quot;);">显示
                </div>
                <div class="l2d-button2" id="l2d-button2" style="background-image: url(&quot;extension/皮肤切换/images/other/newui_button_wz.png&quot;);">动作
                </div>
                <div class="l2d-button3" id="l2d-button3" style="background-image: url(&quot;extension/皮肤切换/images/other/newui_button_wz.png&quot;);">表情
                </div>
                <div class="l2d-button4" id="l2d-button4" style="background-image: url(&quot;extension/皮肤切换/images/other/newui_button_wz.png&quot;);">切换
                </div>
                <div class="model-set-cont1" id="l2d-model-cont1">
                    <div style="display: flex; width: 100%; height: 100%">
                        <div class="slider-group">
                            <div class="slider-group-input">
                                <img alt="" style="width: 28px; height: 28px; margin-right: 5%">
                                <input type="range" class="slider-input" id="l2d-scale-value" step="0.005" max="2" min="0.005">
                            </div>
                            <div class="input-value" id="l2d-scale-text">0.5</div>
                        </div>
                        <div class="slider-group">
                            <div class="slider-group-input" style="margin-top: 28%">
                                <img alt="" style="width: 28px; height: 28px;  margin-right: 5%;">
                                <input type="range" class="slider-input" id="l2d-angle-value" min="0" max="6.28" step="0.01">
                            </div>
                            <div class="input-value" style="margin-top: 39%" id="l2d-angle-text">0°</div>
                        </div>
                    </div>
                </div>
                <div class="model-set-cont2 hidden" id="l2d-model-cont2"></div>
                <div class="model-set-cont3 hidden" id="l2d-model-cont3"> </div>
                <div class="model-set-cont4 hidden" id="l2d-model-cont4"> </div>
            </div>
        `
        let l2dModelSetting = document.getElementById('l2d-model-setting')
        let disBtn = document.getElementById('l2d-button1')
        let motionBtn = document.getElementById('l2d-button2')
        let expBtn = document.getElementById('l2d-button3')
        let switchBtn = document.getElementById('l2d-button4')
        let displayContent = document.getElementById('l2d-model-cont1')
        let motionContent = document.getElementById('l2d-model-cont2')
        let expressionContent = document.getElementById('l2d-model-cont3')
        let switchContent = document.getElementById('l2d-model-cont4')

        let scaleInputValue = document.getElementById('l2d-scale-value')
        let scaleInputText = document.getElementById('l2d-scale-text')
        let angleInputValue = document.getElementById('l2d-angle-value')
        let angleInputText = document.getElementById('l2d-angle-text')

        let size = skinSwitch.bodySize()
        l2dModelSetting.style.height = size.height * 0.5 + 'px'
        l2dModelSetting.style.width = size.width * 0.5 + 'px'

        let images = displayContent.getElementsByTagName('img')
        images[0].src = lib.assetURL + 'extension/皮肤切换/images/other/change-scale.png'
        images[1].src = lib.assetURL + 'extension/皮肤切换/images/other/change-angle.png'

        // 绑定canvas的长按事件
        this.canvas.longClick = 0
        let longClickEvent

        this.canvas.addEventListener(downEvent, (e) => {
            longClickEvent = setTimeout(() => {
                this.canvas.longClick = 1
            }, 500)
        })
        this.canvas.addEventListener(upEvent, (e) => {
            clearTimeout(longClickEvent)
            if (this.canvas.longClick) {
                box.classList.remove('hidden')
                let _this = this
                setTimeout(() => {
                    _this.canvas.longClick = 0
                }, 100)
            }
        })
        this.canvas.addEventListener(moveEvent, () => {
            clearTimeout(longClickEvent)
            this.canvas.longClick = 0
        })
        this.canvas.addEventListener(cancelEvent, () => {
            clearTimeout(longClickEvent)
            this.canvas.longClick = 0
        })

        // 绑定调整模型事件
        toolBtn.addEventListener(clickEvent, (e) => {
            toolDiv.classList.remove('hidden')
            box.classList.add('hidden')
            e.stopPropagation()
        })
        box.addEventListener(clickEvent, (e) => {
            console.log('隐藏box.....')
            box.classList.add('hidden')
        })

        toolDiv.addEventListener(clickEvent, (e) => {
            toolDiv.classList.add('hidden')
        })

        l2dModelSetting.addEventListener(clickEvent, (e) => {
            e.stopPropagation()
        })

        let setSelectStyle = (btn, content, isSelected) => {
            if (isSelected) {
                content.classList.remove('hidden')
                btn.style.backgroundImage = "url(" + skinSwitch.url + "images/other/newui_button_selected_wz.png)"
            } else {
                content.classList.add('hidden')
                btn.style.backgroundImage = "url(" + skinSwitch.url + "images/other/newui_button_wz.png)"
            }
        }

        disBtn.addEventListener(clickEvent, (e) => {
            setSelectStyle(disBtn, displayContent, true)
            setSelectStyle(motionBtn, motionContent, false)
            setSelectStyle(expBtn, expressionContent, false)
            setSelectStyle(switchBtn, switchContent, false)
        })

        motionBtn.addEventListener(clickEvent, (e) => {
            setSelectStyle(disBtn, displayContent, false)
            setSelectStyle(motionBtn, motionContent, true)
            setSelectStyle(expBtn, expressionContent, false)
            setSelectStyle(switchBtn, switchContent, false)
        })

        expBtn.addEventListener(clickEvent, (e) => {
            setSelectStyle(disBtn, displayContent, false)
            setSelectStyle(motionBtn, motionContent, false)
            setSelectStyle(expBtn, expressionContent, true)
            setSelectStyle(switchBtn, switchContent, false)
        })

        switchBtn.addEventListener(clickEvent, (e) => {
            setSelectStyle(disBtn, displayContent, false)
            setSelectStyle(motionBtn, motionContent, false)
            setSelectStyle(expBtn, expressionContent, false)
            setSelectStyle(switchBtn, switchContent, true)
        })

        let initDisplay = () => {
            scaleInputText.innerText = this.modelArgs.scale.toFixed(3)
            scaleInputValue.value = this.modelArgs.scale
            angleInputText.innerText = Math.round((this.modelArgs.rotation || 0) / Math.PI * 180) + '°'
            angleInputValue.value = this.modelArgs.rotation
            scaleInputValue.addEventListener('input', (e) => {
                let v = Number(e.target.value) || _this.modelArgs.scale
                _this.changeScale(v)
                scaleInputText.innerText = v.toFixed(3)
            })

            angleInputValue.addEventListener('input', (e) => {
                let v = Number(e.target.value) || 0
                _this.changeAngle(v)
                angleInputText.innerText = Math.round((v || 0) / Math.PI * 180) + '°'
            })
        }
        // 初始化分组信息
        let initMotionGroup = () => {
            for (const motionGroup of _this.modelArgs.motionGroups) {
                const mg = document.createElement('div')
                mg.classList.add('motion-group')
                let groupName = ui.create.div('.motion-group-name', mg)
                let motionList = ui.create.div('.motion-list', mg)
                groupName.innerText = motionGroup.name
                const nameSet = new Set()
                motionGroup.motions.map((motion, i) => {
                    let f = motion.file.replace('.mtn', '').replace('.motion3.json', '')
                    if (!f) return
                    if (nameSet.has(f)) return
                    nameSet.add(f)
                    let fpaths = f.split('/')
                    if (fpaths.length > 1) f = fpaths[fpaths.length - 1]
                    let motionBtn = ui.create.div('.motion-btn', motionList)
                    motionBtn.innerText = f
                    motionBtn.addEventListener(clickEvent, (e) => {
                        _this.model.motion(motionGroup.name, i, live2d.MotionPriority.FORCE);
                    })
                })
                motionContent.appendChild(mg)
            }
        }

        // 表情
        let initExpression = () => {
            const expList = ui.create.div('.motion-list', expressionContent)
            expList.style.marginTop = '10px'
            const nameSet = new Set()
            this.modelArgs.expressions.map((exp, i) => {
                let f = exp.file.replace('.exp.json', '').replace('.exp3.json', '')
                if (!f) return
                if (nameSet.has(f)) return
                let fpaths = f.split('/')
                if (fpaths.length > 1) f = fpaths[fpaths.length - 1]
                let expBtn = ui.create.div('.motion-btn', expList)
                expBtn.innerText = f
                expBtn.addEventListener(clickEvent, (e) => {
                    _this.model.expression(i)
                })
            })
        }

        initDisplay()
        initMotionGroup()
        initExpression()

        // 下一个模型
        nextBtn.addEventListener(clickEvent, async (e) => {
            // 获取当前的下一个
            let modelKey = _this.modelKey
            let i, keys = Object.keys(pfqhLive2dSettings.models)
            for (i = 0; i < keys.length; i++) {
                if (keys[i] === modelKey) {
                    break
                }
            }
            let value = i === keys.length - 1 ? keys[0] : keys[i + 1]
            let base = Object.assign({}, pfqhLive2dSettings.baseSetting)
            for (let k in pfqhLive2dSettings.models[value]) {
                base[k] = pfqhLive2dSettings.models[value][k]
            }
            base.role = lib.assetURL + base.basePath + base.role
            base.key = value
            game.saveConfig(skinSwitch.configKey.l2dSetting, value)
            // _this.changeModel(base)
            if (this.model) {
                this.app.stage.removeChild(this.model)
            }
            e.stopPropagation()
            await this.initModel(base)
            scaleInputText.innerText = _this.modelArgs.scale.toFixed(3)
            scaleInputValue.value = _this.modelArgs.scale
            angleInputText.innerText = Math.round((this.modelArgs.rotation || 0) / Math.PI * 180) + '°'
            angleInputValue.value = _this.modelArgs.rotation
            motionContent.innerHTML = ''
            expressionContent.innerHTML = ''
            initMotionGroup()
            initExpression()
            console.log('下一个模型.....')
        })

        // 初始化所有的模型名字
        const mList = ui.create.div('.motion-list', switchContent)
        mList.style.marginTop = '10px'
        for (const [key, modelInfo] of Object.entries(pfqhLive2dSettings.models)) {
            let btn = ui.create.div('.motion-btn', mList)
            btn.innerText = key
            btn.addEventListener(clickEvent, async (e) => {
                let base = Object.assign({}, pfqhLive2dSettings.baseSetting)
                for (let k in modelInfo) {
                    base[k] = modelInfo[k]
                }
                base.role = lib.assetURL + base.basePath + base.role
                base.key = key
                game.saveConfig(skinSwitch.configKey.l2dSetting, key)
                // 不删除
                if (this.model) {
                    this.app.stage.removeChild(this.model)
                    // this.model.destroy()
                }
                await this.initModel(base)

                scaleInputText.innerText = _this.modelArgs.scale.toFixed(3)
                scaleInputValue.value = _this.modelArgs.scale
                angleInputText.innerText = Math.round((this.modelArgs.rotation || 0) / Math.PI * 180) + '°'
                angleInputValue.value = _this.modelArgs.rotation
                motionContent.innerHTML = ''
                expressionContent.innerHTML = ''
                initMotionGroup()
                initExpression()
                // _this.changeModel(base)
            })

        }
    }

    async initModel(config) {
        this.model = await live2d.Live2DModel.from(config.role);
        this.modelKey = config.key
        this.app.stage.addChild(this.model);

        let scale
        if (config.scale) {
            scale = config.scale
            this.model.scale.set(config.scale);
        } else {
            const scaleX = this.canvas.width / this.model.width;
            const scaleY = this.canvas.height / this.model.height;
            // fit the window
            scale = Math.min(scaleX, scaleY) * config.scaleFactor
            this.model.scale.set(scale);
        }

        if (config.x) {
            this.model.x = config.x
        }
        if (config.y) {
            this.model.y = config.y
        }
        const motionManager = this.model.internalModel.motionManager;
        const definitions = motionManager.definitions;
        const expressionManager = motionManager.expressionManager
        let expressions
        const motionGroups = []

        for (const [group, motions] of Object.entries(definitions)) {
            motionGroups.push({
                name: group,
                motions: motions && motions.map((motion, index) => ({
                    file: motion.file || motion.File || '',
                 })) || [],
            });
        }

        expressions = expressionManager && expressionManager.definitions.map((expression, index) => ({
            file: expression.file || expression.File || '',
        })) || [];

        // 需要指定一个默认的待机group,  默认是idle或者Idle, 但是有些没有设置这些, 所以需要手动添加自定义的待机group
        if ('idle' in definitions) {
            this.model.internalModel.motionManager.groups.idle = 'idle';
        } else if ('Idle' in definitions) {
            this.model.internalModel.motionManager.groups.idle = 'Idle';
        } else {
            // 不包含idle分组的非标准live2d文件, 自动寻找带有某些前缀的作为待机分组
            let newIdleGroup = []
            let idleKeys = config.idleKeys || ['idle', 'home', 'stand', 'loop']
            for (let k in definitions) {
                for (let file of definitions[k]) {
                    for (let idleKey of idleKeys) {
                        if (file.File.toLowerCase().includes(idleKey)) {
                            newIdleGroup.push(file)
                        }
                    }
                }
            }
            if (newIdleGroup.length) {
                definitions['customIdleGroup'] = newIdleGroup
                this.model.internalModel.motionManager.groups.idle = 'customIdleGroup'
                this.model.internalModel.motionManager.motionGroups['customIdleGroup'] = []
            } else {
                this.model.internalModel.motionManager.groups.idle = config.idle || Object.keys(definitions)[0]
            }
        }

        this.modelArgs = {
            scale: scale,
            rotation: this.model.rotation,
            motionState: motionManager.state,
            expressions,
            expressionManager,
            motionManager,
            motionGroups,
            currentExpressionIndex: -1,
            pendingExpressionIndex: -1.
        }
        // 添加调试的框
        // const hitAreaFrames = new live2d.HitAreaFrames();
        //
        // this.model.addChild(hitAreaFrames);
        // hitAreaFrames.visible = true
        //
        // const foreground = PIXI.Sprite.from(PIXI.Texture.WHITE);
        // foreground.width = this.model.internalModel.width;
        // foreground.height = this.model.internalModel.height;
        // foreground.alpha = 0.2;
        //
        // this.model.addChild(foreground);
        // foreground.visible = true

        if (config.draggable === true) {}this.draggable(this.model);

        // 设置语音播放音量
        live2d.SoundManager.volume = config.volume

        this.addListener(config);
    }

    async changeModel(config) {
        if (this.model) {
            this.app.stage.removeChild(this.model)
            // this.model.destroy()
        }
        await this.initModel(config)
        // 事先销毁原来的选择框
        let _toolDiv = document.getElementById('l2d-tool-div')
        let _l2dHoverBox = document.getElementById('l2dHoverBox')
        _toolDiv && _toolDiv.remove()
        _l2dHoverBox && _l2dHoverBox.remove()
        this.initMotionSelectDiv(config)
    }

    changeScale(scale) {
        if (!this.model) return
        this.model.scale.set(scale)
        this.modelArgs.scale = scale
    }
    changeAngle(rotation) {
        if (!this.model) return
        this.model.rotation = rotation;
        this.modelArgs.rotation = rotation
    }

    // 可拖动
    draggable(model) {
        // model.buttonMode = true;
        let c = this.canvas
        c.addEventListener('pointerdown', (e) => {
            model._pointerX = e.offsetX;
            model._pointerY = e.offsetY;
            model.dragging = true;
        })

        c.addEventListener('pointermove', (e) => {
            if (model.dragging) {
                if (e.offsetX >= c.width + c.offsetLeft || e.offsetY >= c.height + c.offsetTop) {
                    model.dragging = false
                    return
                }
                model.x = model.x + e.offsetX - model._pointerX;
                model.y = model.y + e.offsetY - model._pointerY;
                model._pointerX = e.offsetX
                model._pointerY = e.offsetY;
            }
        })
        document.addEventListener('pointerup', () => (model.dragging = false));


        // model.on("pointerdown", (e) => {
        //     model.dragging = true;
        //     model._pointerX = e.data.global.x - model.x;
        //     model._pointerY = e.data.global.y - model.y;
        //     console.log('eeee', e.data, model.x, model.y)
        // });
        // model.on("pointermove", (e) => {
        //     if (model.dragging) {
        //         model.position.x = e.data.global.x - model._pointerX;
        //         model.position.y = e.data.global.y - model._pointerY;
        //     }
        // });
        // model.on("pointerupoutside", () => (model.dragging = false));
        // model.on("pointerup", () => (model.dragging = false));
    }

    addListener(config) {
        // 有的旧模型(比如lafei)不支持, 无法触发执行; 所以统一监听document的点击事件
        // this.model.on("hit", (hitAreas) => {});
        // this.model.emit("hit");
        let cn = skinSwitch.lib.config.touchscreen ? 'touchend' : 'click'
        let offsetX, offsetY
        let _this = this
        this._clickTime = Date.now()
        let eve = (event) => {
            if (_this.canvas.longClick) return
            if (Date.now() - _this._clickTime <= 3000) {
                return
            }
            if (skinSwitch.lib.config.touchscreen) {
                offsetX = event.changedTouches[0].pageX - this.app.view.offsetLeft
                offsetY = event.changedTouches[0].pageY - this.app.view.offsetTop
            } else {
                offsetX = event.clientX - this.app.view.offsetLeft
                offsetY = event.clientY - this.app.view.offsetTop
            }

            if (!Number.isFinite(offsetX) || !Number.isFinite(offsetY)) return
            event.stopPropagation();
            let keys = Object.keys(
                this.model.internalModel.motionManager.motionGroups
            );
            this.model.internalModel.motionManager.startRandomMotion(
                keys[Math.floor(Math.random() * keys.length)]
            );
            console.log("Start motion: random");
            _this._clickTime = Date.now()
        }
        this.canvas.addEventListener(cn, eve);
    }

    hitTest(poX, poY) {
        let hitAreas = [];
        ["TouchHead", "TouchSpecial", "TouchBody"].forEach((id) => {
            let bounds = this.model.internalModel.getDrawableBounds(id);
            let b =
                bounds.x < poX &&
                poX < bounds.x + bounds.width &&
                bounds.y < poY &&
                poY < bounds.y + bounds.height;
            if (b) {
                hitAreas.push(id);
                // console.log(id);
            }
        });
        return hitAreas;
    }
}