game.import("extension", function (lib, game, ui, get, ai, _status) {
    //藏珍阁，启动！
    lib.config.extension_皮肤切换_czgEnable = true;
    return {
        name: "皮肤切换",
        content: function (config, pack) {
            (function () {
                const CHROME_VERSION = (function () {
                    const userAgent = navigator.userAgent;
                    const chromeMatch = userAgent.match(/Chrome\/(\d+)/);
                    return chromeMatch ? parseInt(chromeMatch[1]) : 0;
                })();
                const RECT_KEYS = ['bottom', 'height', 'left', 'right', 'top', 'width', 'x', 'y'];
                const MIN_VERSION = 114514//128;Helasisy修：暂时不需要你
                const ENHANCED_VERSION = 140;

                function getDocumentZoom() {
                    return window.documentZoom || window.devicePixelRatio || 1;
                }
                function parseTransformScale(element) {
                    try {
                        const computedStyle = window.getComputedStyle(element);
                        const transform = computedStyle.transform;

                        if (transform && transform !== 'none') {
                            const scaleMatch = transform.match(/scale\(([^)]+)\)/);
                            if (scaleMatch && scaleMatch[1]) {
                                const scale = parseFloat(scaleMatch[1]);
                                return isNaN(scale) ? 1 : scale;
                            }
                        }
                    } catch (error) {
                    }
                    return 1;
                }
                function createScaledRect(rect, scale) {
                    const scaledRect = {};
                    RECT_KEYS.forEach(key => {
                        scaledRect[key] = rect[key] / scale;
                    });
                    return scaledRect;
                }
                function createFixedGetBoundingClientRect() {
                    const originalGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect;

                    return function getBoundingClientRect() {
                        const rect = originalGetBoundingClientRect.call(this);
                        const documentZoom = getDocumentZoom();

                        if (CHROME_VERSION >= ENHANCED_VERSION) {
                            const transformScale = parseTransformScale(this);
                            const totalScale = documentZoom * transformScale;
                            return createScaledRect(rect, totalScale);
                        }

                        return createScaledRect(rect, documentZoom);
                    };
                }
                if (CHROME_VERSION >= MIN_VERSION) {
                    try {
                        HTMLElement.prototype.getBoundingClientRect = createFixedGetBoundingClientRect();
                    } catch (error) {
                    }
                }
            })();

            // 引入调整框样式
            const adjustBoxStyle = document.createElement('link')
            adjustBoxStyle.rel = 'stylesheet'
            adjustBoxStyle.href = lib.assetURL + 'extension/皮肤切换/style/adjustBox.css'
            document.head.appendChild(adjustBoxStyle)

            /* 动皮相关功能 */
            function dynamicInit() {
                // 首先需要覆盖十周年UI的动皮初始化功能
                if (!lib.config[skinSwitch.configKey.useDynamic]) {
                    return
                }
                if (!lib.config[skinSwitch.decadeKey.enable] && !lib.config[skinSwitch.decadeKey.dynamicSkin]) {
                    console.log('必须安装启用十周年UI与十周年动皮')
                    return
                }

                // 根据本地的存储内容, 更改十周年UI的skinDynamic的数据
                function updateDecadeDynamicSkin() {
                    console.log('=== updateDecadeDynamicSkin 开始执行 ===');
                    if (!skinSwitch.saveSkinParams) {
                        console.log('saveSkinParams不存在，跳过应用');
                        return;
                    }
                    console.log('当前saveSkinParams:', skinSwitch.saveSkinParams);

                    for (let k in skinSwitch.saveSkinParams) {
                        console.log(`处理角色: ${k}`);
                        // 只更新存在key的数据
                        for (let m in skinSwitch.saveSkinParams[k]) {
                            console.log(`  处理皮肤: ${m}`);
                            if (decadeUI.dynamicSkin[k] && decadeUI.dynamicSkin[k][m]) {
                                console.log(`    找到对应的dynamicSkin配置`);
                                console.log(`    保存的参数:`, skinSwitch.saveSkinParams[k][m]);
                                let gongji = decadeUI.dynamicSkin[k][m].gongji
                                if (skinSwitch.saveSkinParams[k][m].gongji) {
                                    if (typeof gongji === 'string') {
                                        gongji = {
                                            action: gongji
                                        }
                                    } else if (gongji === true) {
                                        gongji = {}
                                    } else if (typeof gongji !== 'object') {
                                        gongji = {}
                                    }
                                    if (gongji) {
                                        gongji = Object.assign(gongji, skinSwitch.saveSkinParams[k][m].gongji)
                                    }

                                }
                                for (let assignK of ['x', 'y', 'scale', 'angle']) {
                                    if (skinSwitch.saveSkinParams[k][m][assignK] != null) {
                                        console.log(`      应用${assignK}参数:`, skinSwitch.saveSkinParams[k][m][assignK]);
                                        decadeUI.dynamicSkin[k][m][assignK] = skinSwitch.saveSkinParams[k][m][assignK];
                                        console.log(`      应用后的值:`, decadeUI.dynamicSkin[k][m][assignK]);
                                    }
                                }
                                if (decadeUI.dynamicSkin[k][m].beijing && skinSwitch.saveSkinParams[k][m].beijing) {
                                    decadeUI.dynamicSkin[k][m].beijing = Object.assign(decadeUI.dynamicSkin[k][m].beijing, skinSwitch.saveSkinParams[k][m].beijing)
                                }
                                if (decadeUI.dynamicSkin[k][m].qianjing && skinSwitch.saveSkinParams[k][m].qianjing) {
                                    decadeUI.dynamicSkin[k][m].qianjing = Object.assign(decadeUI.dynamicSkin[k][m].qianjing, skinSwitch.saveSkinParams[k][m].qianjing)
                                }
                                // decadeUI.dynamicSkin[k][m] = Object.assign(decadeUI.dynamicSkin[k][m], skinSwitch.saveSkinParams[k][m])
                                if (gongji) {
                                    decadeUI.dynamicSkin[k][m].gongji = gongji
                                }

                                // 添加上千幻雷修的调整参数
                                if (skinSwitch.saveSkinParams[k][m].qhlx) {
                                    decadeUI.dynamicSkin[k][m].qhlx = skinSwitch.saveSkinParams[k][m].qhlx
                                }

                                // 添加出场出框和特殊出框调整
                                if (decadeUI.dynamicSkin[k][m].chuchang && skinSwitch.saveSkinParams[k][m].chuchang) {
                                    decadeUI.dynamicSkin[k][m].chuchang = Object.assign(decadeUI.dynamicSkin[k][m].chuchang, skinSwitch.saveSkinParams[k][m].chuchang)
                                }
                                if (decadeUI.dynamicSkin[k][m].teshu && skinSwitch.saveSkinParams[k][m].teshu) {
                                    decadeUI.dynamicSkin[k][m].teshu = Object.assign(decadeUI.dynamicSkin[k][m].teshu, skinSwitch.saveSkinParams[k][m].teshu)
                                }
                            }
                        }
                    }

                    // 为所有动皮添加皮肤名称 skinName参数
                    for (let k in decadeUI.dynamicSkin) {
                        for (let skinName in decadeUI.dynamicSkin[k]) {
                            try {
                                decadeUI.dynamicSkin[k][skinName].skinName = skinName
                            } catch (e) {
                                let str = "";
                                str += k + ":" + skinName + "\n";
                                str += JSON.stringify(decadeUI.dynamicSkin[k][skinName]);
                                alert(str);
                            }
                        }
                    }
                    console.log('=== updateDecadeDynamicSkin 执行完成 ===');
                }
                // 替换十周年内容                
                function modifyDecadeUIContent() {
                    let Player = {};

                    if (lib.config[skinSwitch.decadeKey.dynamicSkin]) {
                        if (self.OffscreenCanvas === undefined) {
                            alert("您的设备环境不支持新版手杀动皮效果，请更换更好的设备或者不使用此版本的手杀动皮效果");
                            return
                        } else {
                            // 技能
                            lib.skill._tsx = {
                                trigger: {
                                    player: ["logSkillBegin", "useSkillBegin"],
                                },
                                silent: true,
                                charlotte: true,
                                forced: true,
                                priority: 2022,
                                filter(event, player) {
                                    return player.dynamic
                                },
                                async content(event, player) {
                                    let name = event._trigger.skill
                                    if (game.phaseNumber > 0) {
                                        if (name.indexOf("_") !== 0 && skinSwitch.filterSkills.indexOf(name) === -1 || event.player.skills.indexOf(name) !== -1) {
                                            if (event.player.isAlive() && event.player.dynamic.primary && !event.player.GongJi) {
                                                if (!event.player.doubleAvatar) {
                                                    let teshu = event.player.dynamic.primary.player && event.player.dynamic.primary.player.teshu
                                                    if (typeof teshu === 'object' && teshu !== null) {
                                                        if (teshu.whitelist) {
                                                            if (teshu.whitelist.includes(name)) {
                                                                skinSwitch.chukuangWorkerApi.chukuangAction(event.player, 'TeShu');
                                                            }
                                                        } else {
                                                            skinSwitch.chukuangWorkerApi.chukuangAction(event.player, 'TeShu');
                                                        }
                                                    } else {
                                                        skinSwitch.chukuangWorkerApi.chukuangAction(event.player, 'TeShu');
                                                    }
                                                } else {
                                                    skinSwitch.chukuangWorkerApi.chukuangAction(event.player, 'TeShu');
                                                }
                                            }
                                            let skillInfo = get.info(name)
                                            if (skillInfo) {
                                                let specailEvent = (player, triggerName) => {
                                                    let res = skinSwitch.dynamic.getSpecial(player, triggerName)
                                                    res.forEach(r => {
                                                        const { avatar, special, effs, isPrimary } = r
                                                        let audio
                                                        // 判断觉醒技能是否是当前角色的
                                                        let tryPlayTransform = () => {
                                                            let pName = isPrimary ? player.name : player.name2
                                                            let cha = lib.character[pName]
                                                            if (!cha[3].includes(name)) {
                                                                // 可能是子技能触发的特效, 比如使命技
                                                                if (!cha[3].includes(name.slice(0, name.lastIndexOf('_'))))
                                                                    return
                                                            }
                                                            let transform = effs.transform
                                                            if (!transform || !(transform in special)) return
                                                            let trans = special[transform]
                                                            let dskins = decadeUI.dynamicSkin
                                                            // 播放转换的骨骼
                                                            let newName = trans.name
                                                            if (newName) {
                                                                // 分割名字, 获取骨骼, 与当前角色的骨骼的名字比较,是否是同名
                                                                let [key, skinName] = newName.split('/')
                                                                let dInfo = key && skinName && dskins[key] && dskins[key][skinName]
                                                                if (dInfo) {
                                                                    skinSwitch.dynamic.transformDst(player, isPrimary, dInfo, { huanfuEffect: effs.effect })
                                                                }
                                                            } else {
                                                                skinSwitch.dynamic.transformDst(player, isPrimary, trans, { huanfuEffect: effs.effect })
                                                            }
                                                            audio = trans.audio

                                                        }
                                                        tryPlayTransform()
                                                        // 检查是否有播放特效
                                                        let effectPlay = special.condition[triggerName].play
                                                        if (effectPlay) {
                                                            let eff = special[effectPlay]
                                                            if (eff) {
                                                                if (!eff.x) eff.x = [0, 0.5]
                                                                if (!eff.y) eff.y = [0, 0.5]
                                                                setTimeout(() => {
                                                                    skinSwitch.chukuangWorkerApi.playEffect(eff)
                                                                }, (eff.delay || 0) * 1000)
                                                                if (!audio) audio = eff.audio
                                                            }
                                                        }
                                                        if (!audio) audio = special.condition[triggerName].audio
                                                        if (audio) {
                                                            game.playAudio('..', skinSwitch.dcdPath, 'assets/dynamic', audio)
                                                        }
                                                    })
                                                }
                                                let res = skinSwitch.dynamic.getSpecial(event.player, name)
                                                res.forEach(r => {
                                                    let { avatar, isPrimary } = r
                                                    let special = avatar.special
                                                    if (!special) return;
                                                    let effs = special.condition[name]
                                                    let audio
                                                    let tryTransform = () => {
                                                        let transform = effs.transform
                                                        if (!transform || !(transform in special)) return
                                                        let trans = special[transform]
                                                        let dskins = decadeUI.dynamicSkin
                                                        // 播放转换的骨骼
                                                        let newName = trans.name
                                                        if (newName) {
                                                            // 分割名字, 获取骨骼, 与当前角色的骨骼的名字比较,是否是同名
                                                            let [key, skinName] = newName.split('/')
                                                            let dInfo = key && skinName && dskins[key] && dskins[key][skinName]
                                                            if (dInfo) {
                                                                // 添加audio属性，用于在transformDst中更新语音
                                                                dInfo.audio = trans.audio
                                                                skinSwitch.dynamic.transformDst(event.player, isPrimary, dInfo, { huanfuEffect: effs.effect })
                                                            }
                                                        } else {
                                                            skinSwitch.dynamic.transformDst(event.player, isPrimary, trans, { huanfuEffect: effs.effect })
                                                        }
                                                        audio = trans.audio
                                                    }
                                                    let tryEffectPlay = () => {
                                                        // 检查是否有播放特效
                                                        let effectPlay = effs.play
                                                        if (effectPlay) {
                                                            let eff = special[effectPlay]
                                                            if (eff) {
                                                                if (!eff.x) eff.x = [0, 0.5]
                                                                if (!eff.y) eff.y = [0, 0.5]
                                                                setTimeout(() => {
                                                                    skinSwitch.chukuangWorkerApi.playEffect(eff)
                                                                }, (eff.delay || 0) * 1000)
                                                                if (!audio) audio = eff.audio
                                                            }
                                                        }
                                                    }
                                                    tryTransform()
                                                    tryEffectPlay()
                                                })
                                                if (skillInfo.juexingji) {
                                                    specailEvent(event.player, 'juexingji')
                                                }
                                                if (skillInfo.limited) {
                                                    specailEvent(event.player, 'xiandingji')
                                                }
                                                // 检查使命技
                                                if (name.endsWith('_fail')) {
                                                    let parentSkill = name.slice(0, name.length - 5)
                                                    let parentSkillInfo = get.info(parentSkill)
                                                    if (parentSkillInfo && parentSkillInfo.dutySkill) {
                                                        specailEvent(event.player, 'shimingjiFail')
                                                    }
                                                } else if (name.endsWith('_achieve')) {
                                                    let parentSkill = name.slice(0, name.length - 8)
                                                    let parentSkillInfo = get.info(parentSkill)
                                                    if (parentSkillInfo && parentSkillInfo.dutySkill) {
                                                        specailEvent(event.player, 'shimingjiSuccess')
                                                    }
                                                }

                                            }

                                        }
                                    }
                                }
                            }
                            lib.skill._gj = {
                                // 指定多个目标也让触发攻击状态
                                trigger: { player: ['useCardBefore', 'useCard1', 'useCard2'] },
                                forced: true,
                                filter: function (event, player) {
                                    if (player.isUnseen()) return false;
                                    if (!player.dynamic) return false;
                                    if (_status.currentPhase != player) return false;
                                    if (event.card.name == "huogong") return false;
                                    let type = get.type(event.card);
                                    return ((type == 'basic' || type == 'trick') && get.tag(event.card, 'damage') > 0)
                                },
                                content: function () {
                                    // player.GongJi = true;
                                    // 判定当前是否可以攻击, 可能是国战有隐藏武将
                                    let res = skinSwitch.dynamic.checkCanBeAction(player);
                                    if (!res || !res.dynamic) return player.GongJi = false;
                                    else {
                                        // 添加指示线功能, 加载攻击指示线骨骼, 直接使用十周年ani来进行播放
                                        let dy = (player.dynamic.primary && player.dynamic.primary.player && player.dynamic.primary.player.zhishixian) || (player.dynamic.deputy && player.dynamic.deputy.player && player.dynamic.deputy.player.zhishixian)
                                        let args = null

                                        let getArgs = (filterPlayers = []) => {
                                            if (dy != null) {
                                                if (event.triggername !== 'useCardBefore' && event._trigger.targets.length < 2) {
                                                    return
                                                }
                                                let hand = dui.boundsCaches.hand;
                                                let x1, y1

                                                args = {
                                                    hand: null,  // 手牌区域
                                                    attack: {},  // 攻击方坐标
                                                    targets: [],  // 攻击目标坐标
                                                    bodySize: {
                                                        bodyWidth: decadeUI.get.bodySize().width,
                                                        bodyHeight: decadeUI.get.bodySize().height
                                                    }
                                                }

                                                player.checkBoundsCache(true);
                                                if (player === game.me) {
                                                    hand.check();
                                                    x1 = hand.x + hand.width / 2;
                                                    y1 = hand.y;
                                                    args.hand = {
                                                        x1: x1,
                                                        y1: y1
                                                    }
                                                }
                                                // 攻击方的位置
                                                args.attack = player.getBoundingClientRect()

                                                // 计算当前角色和其他角色的角度. 参考十周年ui的指示线
                                                for (let p of event._trigger.targets) {
                                                    if (filterPlayers.includes(p)) continue
                                                    p.checkBoundsCache(true);
                                                    args.targets.push({
                                                        boundRect: p.getBoundingClientRect(),
                                                    })
                                                }
                                            }
                                        }

                                        // 记忆上次的攻击事件, useCard, useCard1, useCard2,会短时间内连续触发. 这样先过滤掉

                                        let timeDelta = player.__lastGongji ? new Date().getTime() - player.__lastGongji.t : 10000
                                        // 间隔极短的连续攻击忽略不计
                                        if (timeDelta < 20) return

                                        if (timeDelta >= 200) {
                                            if (/*timeDelta <= 350 &&*/ event.triggername !== 'useCardBefore') {
                                                if (player.__lastGongji && event._trigger.targets.length <= player.__lastGongji.tLen) {
                                                    return
                                                }
                                            }
                                            getArgs()
                                            skinSwitch.chukuangWorkerApi.chukuangAction(player, 'GongJi', args ? { attackArgs: args, triggername: event.triggername } : {});
                                            player.__lastGongji = {
                                                t: new Date().getTime(),
                                                tLen: event._trigger.targets.length,
                                            }
                                        } else {
                                            if (event.triggername !== 'useCardBefore') {
                                                if (event._trigger.targets.length <= player.__lastGongji.tLen) {
                                                    return
                                                }
                                                getArgs()
                                                if (args) {
                                                    skinSwitch.chukuangWorkerApi.chukuangAction(player, 'GongJi', { attackArgs: args, triggername: event.triggername })
                                                    player.__lastGongji = {
                                                        t: new Date().getTime(),
                                                        tLen: event._trigger.targets.length,
                                                    }
                                                }
                                            }
                                        }


                                    }
                                }
                            }
                            // 只有主动发动技能才会触发这个
                            lib.skill._ts = {
                                trigger: {
                                    player: ['useSkillBefore']
                                },
                                forced: true,
                                filter: function (event, player) {
                                    return player.isAlive() && player.dynamic;
                                },
                                content: function () {
                                    // 检查限定技
                                    let skillType = ''
                                    let triggerSkill = event.getTrigger().skill
                                    if (triggerSkill && triggerSkill[0] === '_') return

                                    let skillInfo = get.info(triggerSkill)
                                    let dskins = decadeUI.dynamicSkin
                                    if (skillInfo) {
                                        if (skillInfo.limited) {
                                            let res = skinSwitch.dynamic.getSpecial(player, 'xiandingji')
                                            res.forEach(r => {
                                                const { avatar, special, effs, isPrimary } = r
                                                let pName = isPrimary ? player.name : player.name2
                                                let cha = lib.character[pName]
                                                if (!cha[3].includes(triggerSkill)) {
                                                    return
                                                }
                                                let audio
                                                let tryPlayTransform = () => {
                                                    let transform = effs.transform
                                                    if (!transform || !(transform in special)) return
                                                    let trans = special[transform]
                                                    let dskins = decadeUI.dynamicSkin
                                                    // 播放转换的骨骼
                                                    let newName = trans.name
                                                    if (newName) {
                                                        // 分割名字, 获取骨骼, 与当前角色的骨骼的名字比较,是否是同名
                                                        let [key, skinName] = newName.split('/')
                                                        let dInfo = key && skinName && dskins[key] && dskins[key][skinName]
                                                        if (dInfo) {
                                                            skinSwitch.dynamic.transformDst(player, isPrimary, dInfo, { huanfuEffect: effs.effect })
                                                        }
                                                    } else {
                                                        skinSwitch.dynamic.transformDst(player, isPrimary, trans, { huanfuEffect: effs.effect })
                                                    }
                                                    audio = trans.audio
                                                }

                                                let tryPlayEffect = () => {
                                                    let effectPlay = special.condition.xiandingji.play
                                                    if (effectPlay) {
                                                        let eff = special[effectPlay]
                                                        if (eff) {
                                                            if (!eff.x) eff.x = [0, 0.5]
                                                            if (!eff.y) eff.y = [0, 0.5]
                                                            setTimeout(() => {
                                                                skinSwitch.chukuangWorkerApi.playEffect(eff)
                                                            }, (eff.delay || 0) * 1000)

                                                            if (!audio) audio = eff.audio
                                                        }
                                                    }
                                                }
                                                tryPlayTransform()
                                                tryPlayEffect()
                                                if (!audio) audio = special.condition.xiandingji.audio
                                                if (audio) {
                                                    game.playAudio('..', skinSwitch.dcdPath, 'assets/dynamic', audio)
                                                }
                                            })
                                        } else if (skillInfo.dutySkill) {
                                            skillType = 'shimingji';

                                        } else if (skillInfo.zhuanhuanji) {
                                            let res = skinSwitch.dynamic.getSpecial(player, 'zhuanhuanji')
                                            res.forEach(r => {
                                                const { avatar, special, effs, isPrimary } = r
                                                let pName = isPrimary ? player.name : player.name2
                                                let cha = lib.character[pName]
                                                if (!cha[3].includes(triggerSkill)) {
                                                    return
                                                }
                                                player.zhuanhuanjiFlag = !player.zhuanhuanjiFlag
                                                let audio
                                                let tryPlayTransform = () => {
                                                    let transform = effs.transform
                                                    if (!transform || !(transform in special)) return
                                                    let trans = special[transform]
                                                    const originSkin = player.originSkin
                                                    if (player.zhuanhuanjiFlag) {
                                                        // 播放转换的骨骼
                                                        let newName = trans.name
                                                        if (newName) {
                                                            // 分割名字, 获取骨骼, 与当前角色的骨骼的名字比较,是否是同名
                                                            let [key, skinName] = newName.split('/')
                                                            let dInfo = key && skinName && dskins[key] && dskins[key][skinName]
                                                            if (dInfo) {
                                                                skinSwitch.dynamic.transformDst(player, isPrimary, dInfo, { huanfuEffect: effs.effect })
                                                            }
                                                        } else {
                                                            skinSwitch.dynamic.transformDst(player, isPrimary, trans, { huanfuEffect: effs.effect })
                                                        }
                                                    } else {
                                                        // 如果当前已经是变身后的骨骼, 需要恢复原始骨骼.
                                                        if (avatar.name !== originSkin.name) {
                                                            // 触发变回原始皮肤
                                                            skinSwitch.dynamic.transformDst(player, isPrimary, originSkin, { huanfuEffect: effs.effect, isOrigin: true })
                                                        } else {
                                                            skinSwitch.dynamic.transformDst(player, isPrimary, originSkin, { huanfuEffect: effs.effect, isOrigin: true })
                                                        }
                                                    }
                                                    audio = trans.audio
                                                }

                                                let tryPlayEffect = () => {
                                                    let effectPlay = special.condition.zhuanhuanji.play
                                                    if (effectPlay) {
                                                        let eff = special[effectPlay]
                                                        if (eff) {
                                                            if (!eff.x) eff.x = [0, 0.5]
                                                            if (!eff.y) eff.y = [0, 0.5]
                                                            setTimeout(() => {
                                                                skinSwitch.chukuangWorkerApi.playEffect(eff)
                                                            }, (eff.delay || 0) * 1000)
                                                            if (!audio) audio = eff.audio
                                                        }
                                                    }

                                                }
                                                tryPlayTransform()
                                                tryPlayEffect()
                                                if (!audio) audio = special.condition.zhuanhuanji.audio
                                                if (audio) {
                                                    game.playAudio('..', skinSwitch.dcdPath, 'assets/dynamic', audio)
                                                }
                                            })
                                        }
                                    }

                                    // 过滤技能白名单, 只在单将模式下生效
                                    if (!player.doubleAvatar) {
                                        let teshu = player.dynamic.primary && player.dynamic.primary.player && player.dynamic.primary.player.teshu
                                        if (typeof teshu === 'object' && teshu !== null) {
                                            if (teshu.whitelist) {
                                                if (teshu.whitelist.includes(triggerSkill)) {
                                                    skinSwitch.chukuangWorkerApi.chukuangAction(player, 'TeShu');
                                                }
                                            } else {
                                                skinSwitch.chukuangWorkerApi.chukuangAction(player, 'TeShu');
                                            }
                                        } else {
                                            skinSwitch.chukuangWorkerApi.chukuangAction(player, 'TeShu');
                                        }
                                    } else {
                                        skinSwitch.chukuangWorkerApi.chukuangAction(player, 'TeShu');
                                    }
                                }
                            }

                            lib.skill._playAudioToQueue = {
                                trigger: { player: ['useCardBefore', 'respondBefore'] },
                                forced: true,
                                filter: function (event, player) {
                                    if (player.isUnseen()) return false;
                                    if (!player.dynamic) return false;
                                    return player.dynamic.primary && player.dynamic.primary.player && player.dynamic.primary.player.audio
                                },
                                content: function () {
                                    let id = player.dynamic.id
                                    let skinId = player.dynamic.primary.id
                                    if (!skinSwitch.audioPlayQueue) {
                                        skinSwitch.audioPlayQueue = []
                                    }
                                    // 添加到队列中, 每次播放音频, 检查当前队列是否有待替换的语音需要进行播放
                                    let card = event.getTrigger().card
                                    let cardName
                                    if (card.name == 'sha' && (card.nature == 'fire' || card.nature == 'thunder' || card.nature == 'ice' || card.nature == 'stab')) {
                                        cardName = card.name + '_' + card.nature
                                    } else {
                                        cardName = card.name
                                    }

                                    skinSwitch.audioPlayQueue.push({
                                        'card': cardName,
                                        'id': id,
                                        'skinId': skinId,
                                        'time': new Date().getTime()
                                    })

                                }
                            }

                            // 回合开始,,播放出场动画, 暂时不考虑双将模式
                            lib.skill._checkDcdChuChang = {
                                trigger: {
                                    global: "phaseBefore",
                                },
                                forced: true,
                                filter: function (event, player) {
                                    return game.players.length > 1  /*&&player.phaseNumber===0*/ && player === event.player && !player.doubleAvatar && player.dynamic && player.dynamic.primary && player.dynamic.primary.player && player.dynamic.primary.player.chuchang
                                },
                                content: function () {
                                    skinSwitch.chukuangWorkerApi.chukuangAction(player, 'chuchang')
                                }
                            };


                            lib.skill._checkDcdShan = {
                                trigger: {
                                    player: 'useCard'
                                },
                                forced: true,
                                filter: function (event, player) {
                                    // 打出闪时
                                    return event.card.name === 'shan' && player.dynamic && (player.dynamic.primary && player.dynamic.primary.player && player.dynamic.primary.player.shizhounian || player.dynamic.deputy && player.dynamic.deputy.player && player.dynamic.deputy.player.shizhounian)
                                },
                                content: function () {
                                    // 如果是双将, 只指定一个进行
                                    if (player.dynamic.primary && player.dynamic.primary.player && player.dynamic.primary.player.shizhounian) {
                                        skinSwitch.postMsgApi.action(player, player.dynamic.primary.player.shan || 'play3', player.dynamic.primary)
                                    } else if (player.dynamic.deputy && player.dynamic.deputy.player && player.dynamic.deputy.player.shizhounian) {
                                        skinSwitch.postMsgApi.action(player, player.dynamic.deputy.player.shan || 'play3', player.dynamic.deputy)
                                    }

                                }
                            }

                            // 游戏开始时检查所有角色的圆弧组别是否正确
                            lib.skill._fix_yh = {
                                trigger: {
                                    global: 'gameStart'
                                },
                                forced: true,
                                filter: function (event, player) {
                                    return !(lib.config[skinSwitch.decadeKey.newDecadeStyle] === "on")
                                },
                                content: function () {
                                    skinSwitch.skinSwitchCheckYH(player)
                                }
                            }

                            // 不知道怎么合并, 在回合开始和回合结束, 检测Player的group变化
                            lib.skill._fix_phase_yh = {
                                trigger: {
                                    player: ['phaseBegin', 'phaseEnd']
                                },
                                forced: true,
                                filter: function (event, player) {
                                    return !(lib.config[skinSwitch.decadeKey.newDecadeStyle] === "on")
                                },
                                content: function () {
                                    skinSwitch.skinSwitchCheckYH(player)
                                }
                            }

                            // 回合计数变身触发
                            lib.skill._pfqh_check_roundCount = {
                                trigger: {
                                    player: "phaseBegin",
                                },
                                silent: true,
                                charlotte: true,
                                forced: true,
                                priority: 2022,
                                filter(event, player) {
                                    return player.dynamic && player.isAlive();
                                },
                                content: function () {
                                    // 获取与回合计数相关的特殊效果
                                    let res = skinSwitch.dynamic.getSpecial(player, 'roundCount');
                                    if (res && res.length > 0) {
                                        res.forEach(r => {
                                            const { avatar, special, effs, isPrimary } = r;
                                            // 检查是否达到回合数触发条件
                                            if (effs && effs.rounds && player.phaseNumber === effs.rounds) {
                                                let audio = null;

                                                // 处理变身
                                                let tryPlayTransform = () => {
                                                    let transform = effs.transform;
                                                    if (transform) {
                                                        let newSkin = null;
                                                        if (Array.isArray(transform)) {
                                                            // 多个变身选项
                                                            for (let i = 0; i < transform.length; i++) {
                                                                newSkin = special[transform[i]];
                                                                if (newSkin) break;
                                                            }
                                                        } else {
                                                            // 单个变身选项
                                                            newSkin = special[transform];
                                                        }

                                                        if (newSkin) {
                                                            if (newSkin.audio) audio = newSkin.audio;

                                                            // 如果有name属性，进行变身
                                                            if (newSkin.name) {
                                                                skinSwitch.dynamic.bianshen(player, newSkin.name, isPrimary);

                                                                // 播放变身特效
                                                                if (newSkin.effect) {
                                                                    setTimeout(() => {
                                                                        if (typeof newSkin.effect === "string") {
                                                                            skinSwitch.chukuangWorkerApi.playEffect({
                                                                                name: `../../../皮肤切换/effects/${newSkin.effect}/${newSkin.effect}`,
                                                                                version: "4.0"
                                                                            });
                                                                        }
                                                                    }, 300);
                                                                }
                                                            }
                                                        }
                                                    }
                                                };

                                                // 处理特效播放
                                                let tryPlayEffect = () => {
                                                    let effectPlay = effs.play;
                                                    if (effectPlay) {
                                                        let eff = special[effectPlay];
                                                        if (eff) {
                                                            if (!eff.x) eff.x = [0, 0.5];
                                                            if (!eff.y) eff.y = [0, 0.5];
                                                            setTimeout(() => {
                                                                skinSwitch.chukuangWorkerApi.playEffect(eff);
                                                            }, (eff.delay || 0) * 1000);
                                                            if (!audio) audio = eff.audio;
                                                        }
                                                    }
                                                };

                                                tryPlayTransform();
                                                tryPlayEffect();

                                                // 播放音效
                                                if (!audio) audio = effs.audio;
                                                if (audio) {
                                                    game.playAudio('..', skinSwitch.dcdPath, 'assets/dynamic', audio);
                                                }
                                            }
                                        });
                                    }
                                }
                            };

                            lib.skill._check_die_yh = {
                                trigger: {
                                    player: "dieBefore",
                                },
                                silent: true,
                                charlotte: true,
                                forced: true,
                                filter(event, player) {
                                    return player.dynamic
                                },
                                content: function () {
                                    let skinYh = player.getElementsByClassName("skinYh");
                                    if (skinYh.length > 0) {
                                        player.removeChild(skinYh[0]);
                                    }
                                }
                            }

                            // 添加游戏开始时重新应用保存的动皮参数的技能
                            lib.skill._pfqh_reapply_saved_params = {
                                trigger: {
                                    global: 'gameStart'
                                },
                                forced: true,
                                silent: true,
                                priority: 100, // 高优先级确保在其他技能之前执行
                                content: function () {
                                    // 多次尝试应用参数，确保成功
                                    let applyParams = () => {
                                        console.log('=== 尝试应用保存的动皮参数 ===');
                                        console.log('当前保存的参数:', window.skinSwitch ? skinSwitch.saveSkinParams : 'skinSwitch不存在');
                                        console.log('十周年UI状态:', window.decadeUI ? '已加载' : '未加载');

                                        if (window.skinSwitch && typeof skinSwitch.updateDecadeDynamicSkin === 'function' && window.decadeUI) {
                                            skinSwitch.updateDecadeDynamicSkin();
                                            console.log('已重新应用保存的动皮参数');

                                            // 输出应用后的结果
                                            if (decadeUI.dynamicSkin) {
                                                console.log('应用后的dynamicSkin:', decadeUI.dynamicSkin);
                                            }
                                            return true;
                                        } else {
                                            console.warn('条件不满足，跳过应用');
                                            return false;
                                        }
                                    };

                                    // 立即尝试一次
                                    if (!applyParams()) {
                                        // 如果失败，延迟500ms再试
                                        setTimeout(() => {
                                            if (!applyParams()) {
                                                // 如果还失败，再延迟1000ms试一次
                                                setTimeout(() => {
                                                    if (!applyParams()) {
                                                        // 最后再延迟2000ms试一次
                                                        setTimeout(applyParams, 2000);
                                                    }
                                                }, 1000);
                                            }
                                        }, 500);
                                    }
                                }
                            }

                            // 添加角色初始化时重新应用保存的动皮参数的技能
                            lib.skill._pfqh_reapply_on_init = {
                                trigger: {
                                    player: 'enterGame'
                                },
                                forced: true,
                                silent: true,
                                priority: -100, // 低优先级，确保在角色完全初始化后执行
                                filter: function (event, player) {
                                    return player.dynamic && player.dynamic.primary;
                                },
                                content: function () {
                                    // 延迟执行，确保角色完全初始化
                                    setTimeout(() => {
                                        console.log('=== 角色初始化完成，重新应用保存的动皮参数 ===', player.name);
                                        if (window.skinSwitch && typeof skinSwitch.updateDecadeDynamicSkin === 'function' && window.decadeUI) {
                                            skinSwitch.updateDecadeDynamicSkin();
                                            console.log('角色初始化时已重新应用保存的动皮参数');
                                        }
                                    }, 200);
                                }
                            }

                            // 不知道怎么合并, 在回合开始和回合结束, 检测Player的group变化
                            lib.skill._fix_phase_yh = {
                                trigger: {
                                    player: ['phaseBegin', 'phaseEnd']
                                },
                                forced: true,
                                filter: function (event, player) {
                                    return !(lib.config[skinSwitch.decadeKey.newDecadeStyle] === "on")
                                },
                                content: function () {
                                    skinSwitch.skinSwitchCheckYH(player)
                                }
                            }

                            // 回合计数变身触发
                            lib.skill._pfqh_check_roundCount = {
                                trigger: {
                                    player: "phaseBegin",
                                },
                                silent: true,
                                charlotte: true,
                                forced: true,
                                priority: 2022,
                                filter(event, player) {
                                    return player.dynamic && player.isAlive();
                                },
                                content: function () {
                                    // 获取与回合计数相关的特殊效果
                                    let res = skinSwitch.dynamic.getSpecial(player, 'roundCount');
                                    if (res && res.length > 0) {
                                        res.forEach(r => {
                                            const { avatar, special, effs, isPrimary } = r;
                                            // 检查是否达到回合数触发条件
                                            if (effs && effs.rounds && player.phaseNumber === effs.rounds) {
                                                let audio = null;

                                                // 处理变身
                                                let tryPlayTransform = () => {
                                                    let transform = effs.transform;
                                                    if (transform) {
                                                        let newSkin = null;
                                                        if (Array.isArray(transform)) {
                                                            // 多个变身选项
                                                            for (let i = 0; i < transform.length; i++) {
                                                                newSkin = special[transform[i]];
                                                                if (newSkin) break;
                                                            }
                                                        } else {
                                                            // 单个变身选项
                                                            newSkin = special[transform];
                                                        }

                                                        if (newSkin) {
                                                            if (newSkin.audio) audio = newSkin.audio;

                                                            // 如果有name属性，进行变身
                                                            if (newSkin.name) {
                                                                skinSwitch.dynamic.bianshen(player, newSkin.name, isPrimary);

                                                                // 播放变身特效
                                                                if (newSkin.effect) {
                                                                    setTimeout(() => {
                                                                        if (typeof newSkin.effect === "string") {
                                                                            skinSwitch.chukuangWorkerApi.playEffect({
                                                                                name: `../../../皮肤切换/effects/${newSkin.effect}/${newSkin.effect}`,
                                                                                version: "4.0"
                                                                            });
                                                                        }
                                                                    }, 300);
                                                                }
                                                            }
                                                        }
                                                    }
                                                };

                                                // 处理特效播放
                                                let tryPlayEffect = () => {
                                                    let effectPlay = effs.play;
                                                    if (effectPlay) {
                                                        let eff = special[effectPlay];
                                                        if (eff) {
                                                            if (!eff.x) eff.x = [0, 0.5];
                                                            if (!eff.y) eff.y = [0, 0.5];
                                                            setTimeout(() => {
                                                                skinSwitch.chukuangWorkerApi.playEffect(eff);
                                                            }, (eff.delay || 0) * 1000);
                                                            if (!audio) audio = eff.audio;
                                                        }
                                                    }
                                                };

                                                tryPlayTransform();
                                                tryPlayEffect();

                                                // 播放音效
                                                if (!audio) audio = effs.audio;
                                                if (audio) {
                                                    game.playAudio('..', skinSwitch.dcdPath, 'assets/dynamic', audio);
                                                }
                                            }
                                        });
                                    }
                                }
                            };

                            lib.skill._check_die_yh = {
                                trigger: {
                                    player: "dieBefore",
                                },
                                silent: true,
                                charlotte: true,
                                forced: true,
                                filter(event, player) {
                                    return player.dynamic
                                },
                                content: function () {
                                    let skinYh = player.getElementsByClassName("skinYh");
                                    if (skinYh.length > 0) {
                                        player.removeChild(skinYh[0]);
                                    }
                                }
                            }

                            // 血量变化时, 触发变身
                            lib.skill._pfqh_check_hp_change = {
                                trigger: {
                                    player: ['changeHp'],
                                },
                                silent: true,
                                charlotte: true,
                                forced: true,
                                filter(event, player) {
                                    // 只有动皮可以进行过滤.
                                    return player.dynamic
                                },
                                content: function () {
                                    // 获取有配置了special的角色
                                    let res = skinSwitch.dynamic.getSpecial(player, 'lowhp')
                                    res.forEach(r => {
                                        const { avatar, special, effs, isPrimary } = r
                                        // 默认回复血量不变回来, 和十周年保持一致
                                        if (event.getTrigger().num > 0 && !effs.recover) {
                                            return
                                        }
                                        let hp = player.hp
                                        if (isPrimary && player._primaryLowestHp == null) {
                                            player._primaryLowestHp = hp + 1000
                                        }
                                        if (!isPrimary && player._deputyLowestHp == null) {
                                            player._deputyLowestHp = hp + 1000
                                        }
                                        if (!effs.recover) {
                                            if ((isPrimary && hp >= player._primaryLowestHp) || (!isPrimary && hp >= player._deputyLowestHp))
                                                return // 排除救助回来, 然后继续重复变身
                                        }
                                        if (isPrimary) {
                                            player._primaryLowestHp = hp
                                        } else {
                                            player._deputyLowestHp = hp
                                        }
                                        let audio;
                                        let tryPlayTransform = () => {
                                            let lowhpTransform = effs.transform
                                            if (!lowhpTransform || lowhpTransform.length === 0) return

                                            const originSkin = isPrimary ? player.originSkin : player.originSkin2

                                            let transList = []
                                            if (lowhpTransform) {
                                                for (let transName of lowhpTransform) {
                                                    // 获取配置里的设置.
                                                    let set = special[transName]
                                                    if (set && set.hp) {
                                                        transList.push(set)
                                                    }
                                                }
                                            }
                                            transList.sort((a, b) => { return a.hp - b.hp })
                                            // 找到合适的符合当前血量的区间.
                                            let index = -1
                                            for (let i = 0; i < transList.length; i++) {
                                                if (hp <= transList[i].hp) {
                                                    index = i
                                                    break
                                                }
                                            }
                                            let trans
                                            let dskins = decadeUI.dynamicSkin

                                            // 说明当前是原始状态
                                            if (index === -1) {
                                                // 如果当前已经是变身后的骨骼, 需要恢复原始骨骼.
                                                if (!originSkin.skin) originSkin.skin = 'default'
                                                skinSwitch.dynamic.transformDst(player, isPrimary, originSkin, { huanfuEffect: effs.effect, isOrigin: true })
                                            } else {
                                                // 说明当前满足血量变化
                                                trans = transList[index]
                                                audio = trans.audio
                                                let newName = trans.name
                                                if (newName) {
                                                    // 分割名字, 获取骨骼, 与当前角色的骨骼的名字比较,是否是同名
                                                    let [key, skinName] = newName.split('/')
                                                    if (!key || !skinName) return
                                                    let dInfo = dskins[key] && dskins[key][skinName]
                                                    if (!dInfo) return

                                                    // 创建新的dInfo副本，避免修改原始对象
                                                    let newDInfo = Object.assign({}, dInfo)
                                                    console.log(newDInfo)

                                                    // 添加audio属性，确保在transformDst中更新语音
                                                    newDInfo.audio = trans.audio
                                                    console.log(newDInfo.audio)

                                                    // 标记需要更新音频
                                                    newDInfo._needUpdateAudio = true

                                                    // 传递原始皮肤的音频信息以便恢复
                                                    if (avatar && avatar.audio) {
                                                        newDInfo._originalAudio = avatar.audio
                                                    }
                                                    console.log(newDInfo._originalAudio)

                                                    skinSwitch.dynamic.transformDst(player, isPrimary, newDInfo, { huanfuEffect: effs.effect })

                                                    // 只有更换新骨骼才会触发播放语音
                                                    if (dInfo.name !== player.dynamic[isPrimary ? 'primary' : 'deputy'].name) {
                                                        tryPlayEffect()
                                                        if (!audio) audio = special.condition.lowhp.audio
                                                        if (audio) {
                                                            game.playAudio('..', skinSwitch.dcdPath, 'assets/dynamic', audio)
                                                        }

                                                        // 强制重新加载皮肤的语音
                                                        setTimeout(() => {
                                                            skinSwitch.reloadAudioForSkin(player, isPrimary, trans.audio);
                                                        }, 1000);
                                                    }
                                                } else {
                                                    skinSwitch.dynamic.transformDst(player, isPrimary, trans, { huanfuEffect: effs.effect })
                                                }
                                            }

                                        }
                                        let tryPlayEffect = () => {
                                            let effectPlay = special.condition.lowhp.play
                                            if (effectPlay) {
                                                let eff = special[effectPlay]
                                                if (eff) {
                                                    if (!eff.x) eff.x = [0, 0.5]
                                                    if (!eff.y) eff.y = [0, 0.5]
                                                    setTimeout(() => {
                                                        skinSwitch.chukuangWorkerApi.playEffect(eff)
                                                    }, (eff.delay || 0) * 1000)
                                                    if (!audio) audio = eff.audio
                                                }
                                            }
                                        }
                                        tryPlayTransform()
                                    })
                                }

                            }

                            // 检测受到伤害次数并且变身或者播放特效, 只有达到指定的次数才播放
                            lib.skill._pfqh_check_damage_times = {
                                trigger: {
                                    player: ['damage'],
                                },
                                silent: true,
                                charlotte: true,
                                forced: true,
                                filter(event, player) {
                                    // 只有动皮可以进行过滤.
                                    return player.dynamic
                                },
                                content: function () {
                                    // 获取有配置了special的角色
                                    if (player.__damage_times == null) {
                                        player.__damage_times = 1
                                    } else {
                                        player.__damage_times++
                                    }
                                    let res = skinSwitch.dynamic.getSpecial(player, 'damageTimes')
                                    res.forEach(r => {
                                        const { avatar, special, effs, isPrimary } = r
                                        // 获取低血量的配置
                                        let transforms = effs.transform || []

                                        // const originSkin = isPrimary ? player.originSkin : player.originSkin2

                                        let transList = []
                                        for (let transName of transforms) {
                                            // 获取配置里的设置.
                                            let set = special[transName]
                                            if (set && set.times) {
                                                transList.push(set)
                                            }
                                        }
                                        transList.sort((a, b) => { return a.times - b.times })
                                        let times = player.__damage_times
                                        // 找到合适的符合当前血量的区间.
                                        let index = -1
                                        for (let i = 0; i < transList.length; i++) {
                                            if (times === transList[i].times) {
                                                index = i
                                                break
                                            }
                                            if (times < transList[i].times) {
                                                break
                                            }
                                        }
                                        let trans, audio
                                        let dskins = decadeUI.dynamicSkin
                                        // 说明当前是原始状态
                                        if (index === -1) {
                                            // 如果当前已经是变身后的骨骼, 需要恢复原始骨骼.
                                            // if (!originSkin.skin) originSkin.skin = 'default'
                                            // skinSwitch.dynamic.transformDst(player, isPrimary, originSkin, true)
                                        } else {
                                            trans = transList[index]
                                            let newName = trans.name
                                            if (newName) {
                                                // 分割名字, 获取骨骼, 与当前角色的骨骼的名字比较,是否是同名
                                                let [key, skinName] = newName.split('/')
                                                let dInfo = key && skinName && dskins[key] && dskins[key][skinName]
                                                if (dInfo) {
                                                    // 添加audio属性和标记，确保语音更新
                                                    dInfo = Object.assign({}, dInfo);
                                                    dInfo.audio = trans.audio;
                                                    dInfo._needUpdateAudio = true;

                                                    skinSwitch.dynamic.transformDst(player, isPrimary, dInfo, { huanfuEffect: effs.effect })

                                                    // 只有更换新骨骼才会触发播放语音
                                                    if (dInfo.name !== avatar.name) {
                                                        // 强制重新加载皮肤的语音
                                                        setTimeout(() => {
                                                            if (trans.audio) {
                                                                skinSwitch.reloadAudioForSkin(player, isPrimary, trans.audio);
                                                            }
                                                        }, 1000);
                                                        audio = trans.audio

                                                        // 检查是否有播放特效
                                                        let effectPlay = effs.play
                                                        if (effectPlay) {
                                                            let eff = special[effectPlay]
                                                            if (eff) {
                                                                if (!eff.x) eff.x = [0, 0.5]
                                                                if (!eff.y) eff.y = [0, 0.5]
                                                                setTimeout(() => {
                                                                    skinSwitch.chukuangWorkerApi.playEffect(eff)
                                                                }, (eff.delay || 0) * 1000)

                                                                if (!audio) audio = eff.audio
                                                            }
                                                        }

                                                        if (!audio) audio = special.condition.damageTimes.audio
                                                        if (audio) {
                                                            game.playAudio('..', skinSwitch.dcdPath, 'assets/dynamic', audio)
                                                        }
                                                    }

                                                }
                                            } else {
                                                skinSwitch.dynamic.transformDst(player, isPrimary, trans, { huanfuEffect: effs.effect })
                                            }
                                        }
                                    })
                                }

                            }

                            // 检测受到伤害变身或者播放特效
                            lib.skill._pfqh_check_damage = {
                                trigger: {
                                    player: ['damage'],
                                },
                                silent: true,
                                charlotte: true,
                                forced: true,
                                filter(event, player) {
                                    // 只有动皮可以进行过滤.
                                    return player.dynamic
                                },
                                content: function () {
                                    let res = skinSwitch.dynamic.getSpecial(player, 'damage')

                                    res.forEach(r => {
                                        const { avatar, special, effs, isPrimary } = r
                                        let pName = isPrimary ? player.name : player.name2
                                        let audio
                                        let tryPlayTransform = () => {
                                            // 判断当前皮肤是否已经进行过变身了, 如果变身过, 取消变身.
                                            let key = isPrimary ? 'damagePrimaryTransform' : 'damageDeputyTransform'
                                            if (player[key]) { return }
                                            let transform = effs.transform
                                            if (!transform || !(transform in special)) return
                                            let trans = special[transform]
                                            let dskins = decadeUI.dynamicSkin
                                            // 播放转换的骨骼
                                            let newName = trans.name
                                            if (newName) {
                                                // 分割名字, 获取骨骼, 与当前角色的骨骼的名字比较,是否是同名
                                                let [key, skinName] = newName.split('/')
                                                let dInfo = key && skinName && dskins[key] && dskins[key][skinName]
                                                if (dInfo) {
                                                    // 添加audio属性和标记，确保语音更新
                                                    dInfo = Object.assign({}, dInfo);
                                                    dInfo.audio = trans.audio;
                                                    dInfo._needUpdateAudio = true;

                                                    skinSwitch.dynamic.transformDst(player, isPrimary, dInfo, { huanfuEffect: effs.effect })

                                                    // 强制重新加载皮肤的语音
                                                    setTimeout(() => {
                                                        if (trans.audio) {
                                                            skinSwitch.reloadAudioForSkin(player, isPrimary, trans.audio);
                                                        }
                                                    }, 1000);
                                                }
                                            } else {
                                                // 为trans添加标记
                                                trans = Object.assign({}, trans);
                                                trans._needUpdateAudio = true;
                                                skinSwitch.dynamic.transformDst(player, isPrimary, trans, { huanfuEffect: effs.effect })

                                                // 强制重新加载皮肤的语音
                                                setTimeout(() => {
                                                    if (trans.audio) {
                                                        skinSwitch.reloadAudioForSkin(player, isPrimary, trans.audio);
                                                    }
                                                }, 1000);
                                            }
                                            audio = trans.audio
                                        }

                                        let tryPlayEffect = () => {
                                            let effectPlay = effs.play
                                            if (effectPlay) {
                                                let eff = special[effectPlay]
                                                if (eff) {
                                                    if (!eff.x) eff.x = [0, 0.5]
                                                    if (!eff.y) eff.y = [0, 0.5]
                                                    setTimeout(() => {
                                                        skinSwitch.chukuangWorkerApi.playEffect(eff)
                                                    }, (eff.delay || 0) * 1000)

                                                    if (!audio) audio = eff.audio
                                                }
                                            }
                                        }
                                        tryPlayTransform()
                                        tryPlayEffect()
                                        if (!audio) audio = special.condition.damage.audio
                                        if (audio) {
                                            game.playAudio('..', skinSwitch.dcdPath, 'assets/dynamic', audio)
                                        }
                                    })
                                }

                            }

                            // 击杀
                            lib.skill._pfqh_check_jisha = {
                                trigger: {
                                    source: "dieBegin",
                                },
                                silent: true,
                                charlotte: true,
                                forced: true,
                                priority: 2022,
                                filter(event, player) {
                                    return player.dynamic
                                },
                                content: function () {
                                    let res = skinSwitch.dynamic.getSpecial(player, 'jisha')
                                    res.forEach(r => {
                                        const { avatar, special, effs, isPrimary } = r
                                        let audio
                                        let tryTransform = () => {
                                            let transform = effs.transform
                                            if (!transform || !(transform in special)) return
                                            let trans = special[transform]
                                            let dskins = decadeUI.dynamicSkin
                                            // 播放转换的骨骼
                                            let newName = trans.name
                                            if (newName) {
                                                // 分割名字, 获取骨骼, 与当前角色的骨骼的名字比较,是否是同名
                                                let [key, skinName] = newName.split('/')
                                                let dInfo = key && skinName && dskins[key] && dskins[key][skinName]
                                                if (dInfo) {
                                                    // 添加audio属性和标记，确保语音更新
                                                    dInfo = Object.assign({}, dInfo);
                                                    dInfo.audio = trans.audio;
                                                    dInfo._needUpdateAudio = true;

                                                    skinSwitch.dynamic.transformDst(player, isPrimary, dInfo, { huanfuEffect: effs.effect })

                                                    // 强制重新加载皮肤的语音
                                                    setTimeout(() => {
                                                        if (trans.audio) {
                                                            skinSwitch.reloadAudioForSkin(player, isPrimary, trans.audio);
                                                        }
                                                    }, 1000);
                                                }
                                            } else {
                                                // 为trans添加标记
                                                trans = Object.assign({}, trans);
                                                trans._needUpdateAudio = true;
                                                skinSwitch.dynamic.transformDst(player, isPrimary, trans, { huanfuEffect: effs.effect })

                                                // 强制重新加载皮肤的语音
                                                setTimeout(() => {
                                                    if (trans.audio) {
                                                        skinSwitch.reloadAudioForSkin(player, isPrimary, trans.audio);
                                                    }
                                                }, 1000);
                                            }
                                            audio = trans.audio
                                        }

                                        let tryEffectPlay = () => {
                                            // 检查是否有播放特效
                                            let effectPlay = effs.play
                                            if (effectPlay) {
                                                let eff = special[effectPlay]
                                                if (eff) {
                                                    if (!eff.x) eff.x = [0, 0.5]
                                                    if (!eff.y) eff.y = [0, 0.5]
                                                    setTimeout(() => {
                                                        skinSwitch.chukuangWorkerApi.playEffect(eff)
                                                    }, (eff.delay || 0) * 1000)
                                                    if (!audio) audio = eff.audio
                                                }
                                            }
                                        }
                                        tryTransform()
                                        tryEffectPlay()

                                        if (!audio) audio = special.condition.jisha.audio
                                        if (audio) {
                                            game.playAudio('..', skinSwitch.dcdPath, 'assets/dynamic', audio)
                                        }

                                    })
                                }
                            }

                            // 改变势力
                            lib.skill._pfqh_check_changeGroup = {
                                trigger: {
                                    global: 'gameStart'
                                },
                                silent: true,
                                charlotte: true,
                                forced: true,
                                priority: 2022,
                                filter(event, player) {
                                    return player.dynamic;
                                },
                                content: function () {
                                    let res = skinSwitch.dynamic.getSpecial(player, 'changeGroup');
                                    // 接口传不过来呜呜呜，再写一遍
                                    var groupMap = {
                                        'wei': ['wei'],
                                        'shu': ['shu'],
                                        'wu': ['wu'],
                                        'qun': ['qun']
                                    };
                                    function getFirstGroupType(characterName) {
                                        var group = get.groupnature(lib.character[characterName]);
                                        for (var type in groupMap) {
                                            if (groupMap[type].some(function (keyword) { return group.startsWith(keyword); })) {
                                                return type;
                                            }
                                        }
                                        return null;
                                    }
                                    var playerGroupType = getFirstGroupType(player.name);
                                    var currentPlayerGroupType = player.group;
                                    if (currentPlayerGroupType !== playerGroupType) {

                                        // 检查是否执行过换肤操作
                                        res.forEach(r => {
                                            const { avatar, special, effs, isPrimary } = r;
                                            let audio;

                                            let tryTransform = () => {
                                                let transform = effs.transform;
                                                if (!transform || !(transform in special)) return;
                                                let trans = special[transform];

                                                // 检查是否指定了特定势力变身条件
                                                if (trans.group && trans.group !== currentPlayerGroupType) {
                                                    console.log('势力不匹配，跳过变身:', {
                                                        requiredGroup: trans.group,
                                                        currentGroup: currentPlayerGroupType,
                                                        originalGroup: playerGroupType
                                                    });
                                                    return;
                                                }

                                                let dskins = decadeUI.dynamicSkin;
                                                // 播放转换的骨骼
                                                let newName = trans.name;
                                                if (newName) {
                                                    // 分割名字, 获取骨骼, 与当前角色的骨骼的名字比较,是否是同名
                                                    let [key, skinName] = newName.split('/');
                                                    let dInfo = key && skinName && dskins[key] && dskins[key][skinName];
                                                    if (dInfo) {
                                                        skinSwitch.dynamic.transformDst(player, isPrimary, dInfo, { huanfuEffect: effs.effect });
                                                    }
                                                } else {
                                                    skinSwitch.dynamic.transformDst(player, isPrimary, trans, { huanfuEffect: effs.effect });
                                                }
                                                audio = trans.audio;
                                            };

                                            let tryEffectPlay = () => {
                                                // 检查是否有播放特效
                                                let effectPlay = effs.play;
                                                if (effectPlay) {
                                                    let eff = special[effectPlay];
                                                    if (eff) {
                                                        if (!eff.x) eff.x = [0, 0.5];
                                                        if (!eff.y) eff.y = [0, 0.5];
                                                        setTimeout(() => {
                                                            skinSwitch.chukuangWorkerApi.playEffect(eff);
                                                        }, (eff.delay || 0) * 1000);
                                                        if (!audio) audio = eff.audio;
                                                    }
                                                }
                                            };
                                            tryTransform();
                                            tryEffectPlay();

                                            if (!audio) audio = special.condition.changeGroup.audio;
                                            if (audio) {
                                                game.playAudio('..', skinSwitch.dcdPath, 'assets/dynamic', audio);
                                            }

                                        });
                                    }
                                }
                            };

                            // 千幻聆音势力换肤
                            lib.skill._qhlyChangeGroupSkin = {
                                trigger: {
                                    global: 'gameStart'
                                },
                                filter: function (event, player) {
                                    return lib.qhly_skinChange[game.qhly_getRealName(player.name1)] || lib.qhly_skinChange[game.qhly_getRealName(player.name2)];
                                },
                                direct: true,
                                forced: true,
                                charlotte: true,
                                content: function () {
                                    var groupMap = {
                                        'wei': ['wei'],
                                        'shu': ['shu'],
                                        'wu': ['wu'],
                                        'qun': ['qun']
                                    };
                                    function getFirstGroupType(characterName) {
                                        var group = get.groupnature(lib.character[characterName]);
                                        for (var type in groupMap) {
                                            if (groupMap[type].some(function (keyword) { return group.startsWith(keyword); })) {
                                                return type;
                                            }
                                        }
                                        return null;
                                    }
                                    //先切换动皮，导致接口传不过去
                                    var playerGroupType = getFirstGroupType(player.name);
                                    var currentPlayerGroupType = player.group;
                                    // 检查
                                    if (currentPlayerGroupType !== playerGroupType) {
                                        if (typeof game.qhly_changeSkillSkin === 'function') {
                                            game.qhly_changeSkillSkin(player, 'changeGroup');
                                        }
                                    }
                                }
                            };

                            // 回合开始变身
                            lib.skill._pfqh_check_phaseBegin = {
                                trigger: {
                                    player: 'phaseBegin'
                                },
                                silent: true,
                                charlotte: true,
                                forced: true,
                                priority: 2022,
                                filter(event, player) {
                                    return player.dynamic;
                                },
                                content: function () {
                                    let res = skinSwitch.dynamic.getSpecial(player, 'phaseBegin');
                                    res.forEach(r => {
                                        const { avatar, special, effs, isPrimary } = r;
                                        let audio;

                                        let tryTransform = () => {
                                            let transform = effs.transform;
                                            if (!transform || !(transform in special)) return;
                                            let trans = special[transform];

                                            let dskins = decadeUI.dynamicSkin;
                                            // 播放转换的骨骼
                                            let newName = trans.name;
                                            if (newName) {
                                                // 分割名字, 获取骨骼, 与当前角色的骨骼的名字比较,是否是同名
                                                let [key, skinName] = newName.split('/');
                                                let dInfo = key && skinName && dskins[key] && dskins[key][skinName];
                                                if (dInfo) {
                                                    skinSwitch.dynamic.transformDst(player, isPrimary, dInfo, { huanfuEffect: effs.effect });
                                                }
                                            } else {
                                                skinSwitch.dynamic.transformDst(player, isPrimary, trans, { huanfuEffect: effs.effect });
                                            }
                                            audio = trans.audio;
                                        };

                                        let tryEffectPlay = () => {
                                            // 检查是否有播放特效
                                            let effectPlay = effs.play;
                                            if (effectPlay) {
                                                let eff = special[effectPlay];
                                                if (eff) {
                                                    if (!eff.x) eff.x = [0, 0.5];
                                                    if (!eff.y) eff.y = [0, 0.5];
                                                    setTimeout(() => {
                                                        skinSwitch.chukuangWorkerApi.playEffect(eff);
                                                    }, (eff.delay || 0) * 1000);
                                                    if (!audio) audio = eff.audio;
                                                }
                                            }
                                        };
                                        tryTransform();
                                        tryEffectPlay();

                                        if (!audio) audio = special.condition.phaseBegin.audio;
                                        if (audio) {
                                            game.playAudio('..', skinSwitch.dcdPath, 'assets/dynamic', audio);
                                        }

                                    });
                                }
                            };

                            // 回合结束变身
                            lib.skill._pfqh_check_phaseEnd = {
                                trigger: {
                                    player: 'phaseEnd'
                                },
                                silent: true,
                                charlotte: true,
                                forced: true,
                                priority: 2022,
                                filter(event, player) {
                                    return player.dynamic;
                                },
                                content: function () {
                                    let res = skinSwitch.dynamic.getSpecial(player, 'phaseEnd');
                                    res.forEach(r => {
                                        const { avatar, special, effs, isPrimary } = r;
                                        let audio;

                                        let tryTransform = () => {
                                            let transform = effs.transform;
                                            if (!transform || !(transform in special)) return;
                                            let trans = special[transform];

                                            let dskins = decadeUI.dynamicSkin;
                                            // 播放转换的骨骼
                                            let newName = trans.name;
                                            if (newName) {
                                                // 分割名字, 获取骨骼, 与当前角色的骨骼的名字比较,是否是同名
                                                let [key, skinName] = newName.split('/');
                                                let dInfo = key && skinName && dskins[key] && dskins[key][skinName];
                                                if (dInfo) {
                                                    skinSwitch.dynamic.transformDst(player, isPrimary, dInfo, { huanfuEffect: effs.effect });
                                                }
                                            } else {
                                                skinSwitch.dynamic.transformDst(player, isPrimary, trans, { huanfuEffect: effs.effect });
                                            }
                                            audio = trans.audio;
                                        };

                                        let tryEffectPlay = () => {
                                            // 检查是否有播放特效
                                            let effectPlay = effs.play;
                                            if (effectPlay) {
                                                let eff = special[effectPlay];
                                                if (eff) {
                                                    if (!eff.x) eff.x = [0, 0.5];
                                                    if (!eff.y) eff.y = [0, 0.5];
                                                    setTimeout(() => {
                                                        skinSwitch.chukuangWorkerApi.playEffect(eff);
                                                    }, (eff.delay || 0) * 1000);
                                                    if (!audio) audio = eff.audio;
                                                }
                                            }
                                        };
                                        tryTransform();
                                        tryEffectPlay();

                                        if (!audio) audio = special.condition.phaseEnd.audio;
                                        if (audio) {
                                            game.playAudio('..', skinSwitch.dcdPath, 'assets/dynamic', audio);
                                        }

                                    });
                                }
                            };

                            // 先初步进行初始化
                            if (!lib.config['extension_千幻聆音_enable'] || lib.config['extension_千幻聆音_qhly_decadeCloseDynamic'] || !(lib.config.qhly_currentViewSkin === 'decade' || lib.config.qhly_currentViewSkin === 'shousha')) {
                                overrides(lib.element.player, Player)
                            }
                        }
                        let retryOverride = function (times, timer) {
                            if (times < 0) return
                            if (!window.decadeUI || !lib.skill._decadeUI_usecardBegin) {
                                console.log(`第${times}次尝试`)
                                let ti = setTimeout(() => {
                                    retryOverride(times - 1, ti)
                                }, 10)
                            } else {
                                overrides(lib.element.player, Player)
                                console.log('替换十周年UI player成功')
                                // 为当前的每一个player更换init方法
                                for (let i = 0; i < game.players.length; i++) {
                                    game.players[i].playDynamic = Player.playDynamic;
                                }

                                if (timer) {
                                    clearTimeout(timer)
                                }
                            }
                        }
                        // 如果千幻聆音没有开启动皮, 或者选择的UI套装不是十周年或者手杀, 初始化
                        if (!lib.config['extension_千幻聆音_enable'] || lib.config['extension_千幻聆音_qhly_decadeCloseDynamic'] || !(lib.config.qhly_currentViewSkin === 'decade' || lib.config.qhly_currentViewSkin === 'shousha')) {
                            retryOverride(20)
                        }
                    }

                    // ======== 替换结束 ========
                }

                function overrides(dest, src) {
                    if (!src) return
                    for (let key in src) {
                        dest[key] = src[key];
                    }
                }

                // 将updateDecadeDynamicSkin函数暴露到skinSwitch对象中，以便在游戏开始时调用
                skinSwitch.updateDecadeDynamicSkin = updateDecadeDynamicSkin;

                skinSwitch.waitUntil(() => {
                    return window.decadeUI && window.decadeModule && decadeUI.dynamicSkin
                }, () => {
                    updateDecadeDynamicSkin()
                })

                skinSwitch.waitUntil(() => {
                    return window.duilib && window.newDuilib
                }, () => {
                    window.duilib = newDuilib
                })
                modifyDecadeUIContent()

            }

            function l2dInit() {
                // 等待十周年UI加载完成
                skinSwitch.waitUntil(() => {
                    return window.decadeModule
                },
                    skinSwitch.overrideExtL2dMenuItem)
            }
            dynamicInit()
            l2dInit()
        },
        precontent: function () {
            // 加载settings.js配置文件
            lib.init.js(lib.assetURL + 'extension/皮肤切换/settings.js', null, function () {
                // 从settings.js中读取showTopArc配置并设置到全局变量
                if (typeof showTopArc !== 'undefined') {
                    window.showTopArc = showTopArc;
                } else {
                    window.showTopArc = true; // 默认显示顶部圆弧
                }

                // 从扩展配置中读取showTopArc的值（优先级高于settings.js）
                if (lib.config[skinSwitch.configKey.showTopArc] !== undefined) {
                    window.showTopArc = lib.config[skinSwitch.configKey.showTopArc];
                }
            });



            window.skinSwitch = {
                name: "皮肤切换",
                version: 1.11,
                url: lib.assetURL + "extension/皮肤切换/",
                path: 'extension/皮肤切换',
                dcdPath: 'extension/十周年UI',
                dcdUrl: lib.assetURL + "extension/十周年UI",
                qhlyUrl: lib.assetURL + "extension/千幻聆音",
                configKey: {
                    'bakeup': 'extension_皮肤切换_bakeup', // 备份与替换十周年文件数据
                    'dynamicSkin': 'extension_皮肤切换_dynamicSkin', // 保存选择的皮肤的历史数据
                    'showEditMenu': 'extension_皮肤切换_showEditMenu', // 是否加入顶部菜单
                    'showPreviewDynamicMenu': 'extension_皮肤切换_showPreviewDynamicMenu', // 预览是否加入顶部菜单
                    'hideHuanFu': 'extension_皮肤切换_hideHuanFu',  // 关闭隐藏换肤按钮
                    'useDynamic': 'extension_皮肤切换_useDynamic',  // 使用皮肤切换携带的出框功能
                    'isAttackFlipX': 'extension_皮肤切换_isAttackFlipX',  //
                    'cugDynamicBg': 'extension_皮肤切换_cugDynamicBg',  // 是否裁剪动态背景

                    'lastPreviewPath': 'extension_皮肤切换_lastPreviewPath',  // 上一次预览路径
                    'savedPositions': 'extension_皮肤切换_savedPositions',  // 保存的位置参数

                    'attackEffect': 'extension_皮肤切换_attackEffect',  // 是否启用攻击和互动出框效果

                    'showTopArc': 'extension_皮肤切换_showTopArc',  // 是否显示顶部圆弧
                },
                // 十周年UI的配置key
                decadeKey: {
                    'dynamicSkin': 'extension_十周年UI_dynamicSkin',
                    'newDecadeStyle': 'extension_十周年UI_newDecadeStyle',
                    'enable': 'extension_十周年UI_enable',
                },
                'huanfu': {
                    'name': "../../../皮肤切换/images/huanfu/huanfu",
                    loop: false,
                    scale: 0.5,
                    speed: 1.5
                },
                game_hasExtension: function (str) {
                    if (!str || typeof str != 'string') return false;
                    if (lib.config && lib.config.extensions) {
                        for (var i of lib.config.extensions) {
                            if (i.indexOf(str) == 0) {
                                if (lib.config['extension_' + i + '_enable']) return true;
                            }
                        }
                    }
                    return false;
                },
                qhly_hasExtension: function (str) {
                    if (!str || typeof str != 'string') return false;
                    if (lib.config && lib.config.extensions) {
                        for (var i of lib.config.extensions) {
                            if (i.indexOf(str) == 0) {
                                if (lib.config['extension_' + i + '_enable']) return true;
                            }
                        }
                    }
                    return false;
                },

                editBoxShowOrHide: function () {
                    editBoxShowOrHide()
                },
                bodySize: function () {
                    let size = {}
                    let body = document.body
                    size.updated = true
                    size.height = body.clientHeight
                    size.width = body.clientWidth
                    return size;
                },
                // 检查圆弧
                skinSwitchCheckYH: function (player, forces) {
                    if (lib.config['extension_十周年UI_newDecadeStyle'] == "on") return;
                    if (!player || get.itemtype(player) != 'player') return;

                    // 检查是否启用顶部圆弧显示
                    if (typeof window.showTopArc !== 'undefined' && !window.showTopArc) {
                        // 如果配置为不显示顶部圆弧，则移除已有的圆弧元素
                        let skinYh = player.getElementsByClassName("skinYh");
                        if (skinYh.length > 0) {
                            player.removeChild(skinYh[0]);
                        }
                        return;
                    }

                    // 确保获取正确的势力，优先使用传入的forces参数，其次是player.group
                    let group = forces || player.group || 'weizhi';
                    let isYh = false;

                    // 检查动皮是否存在并且需要显示圆顶
                    if (player.dynamic) {
                        if (player.dynamic.primary && !player.isUnseen(0)) isYh = true;
                        if (player.dynamic.deputy && !player.isUnseen(1)) isYh = true;
                    }

                    // 获取已有的圆顶元素
                    let skinYh = player.getElementsByClassName("skinYh");

                    // 如果需要显示圆顶但不存在，则创建
                    if (isYh && skinYh.length == 0) {
                        let yh = skinSwitch.createYH(group);
                        player.appendChild(yh);
                    }
                    // 如果不需要显示圆顶但存在，则移除
                    else if (!isYh && skinYh.length > 0) {
                        player.removeChild(skinYh[0]);
                    }
                    // 如果需要显示圆顶且已存在，检查是否需要更新
                    else if (isYh && skinYh.length > 0) {
                        let yh = skinYh[0];
                        let srcPath = yh.src || '';
                        let splits = srcPath.split('/');
                        let sub = splits[splits.length - 1];
                        let curGroup = sub.split('.')[0];

                        // 如果势力不匹配，则移除旧的圆顶并创建新的
                        if (curGroup !== group) {
                            skinYh[0].remove();
                            let newYh = skinSwitch.createYH(group);
                            player.appendChild(newYh);
                        }
                    }
                },
                //判断文件、文件夹是否存在
                qhly_checkFileExist: function (path, callback) {
                    if (lib.node && lib.node.fs) {
                        try {
                            var stat = lib.node.fs.statSync(__dirname + '/' + path);
                            callback(stat);
                        } catch (e) {
                            callback(false);
                            return;
                        }
                    } else {
                        resolveLocalFileSystemURL(lib.assetURL + path, (function (name) {
                            return function (entry) {
                                callback(true);
                            }
                        }(name)), function () {
                            callback(false);
                        });
                    }
                },
                // 尝试获取多个路径, 当某一个存在后立刻返回存在的对应的路径, 主要用来获取静态图片可能存放于多个位置
                checkFilesExistAndReturnOne: function (paths, callback) {
                    let tryCheck = (index) => {
                        if (index >= paths.length) return callback(null)
                        skinSwitch.qhly_checkFileExist(paths[index], (exists) => {
                            if (exists) return callback(paths[index])
                            tryCheck(index + 1)
                        })
                    }
                    tryCheck(0)
                },
                isMobile: function () {
                    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent));
                },
                getCoordinate: function (domNode, subtr) {
                    if (!domNode && !decadeUI) return false;
                    var rect = domNode.getBoundingClientRect();
                    return {
                        x: rect.left,
                        y: decadeUI.get.bodySize().height - (subtr ? rect.bottom : 0),
                        width: rect.width,
                        height: rect.height,
                        bodyWidth: decadeUI.get.bodySize().width,
                        bodyHeight: decadeUI.get.bodySize().height,
                    };
                },
                // 计算其他角色的方向与位置, 播放动画可以调整
                getDirection: function (dom, sl) {
                    var width = document.body.clientWidth / 2;
                    var pos = this.getCoordinate(dom, true);
                    var isLeft = pos.x >= width ? false : true;
                    if (sl) {
                        if (isLeft) {
                            return { x: [0, 1.2], y: [0, 0], isLeft: isLeft };
                        } else return { x: [0, -0.1], y: [0, 0], isLeft: isLeft };
                    } else {
                        if (isLeft) {
                            return { x: [0, 0.4], y: [0, 0.5], isLeft: isLeft };
                        } else return { x: [0, 0.63], y: [0, 0.5], isLeft: isLeft };
                    }
                },
                backupFileDui: function () {
                    // 将animation的内容修改, 重新写入到十周年文件中. 并且备份原始文件
                    if (!window.decadeUI) {
                        alert("请先安装和开启十周年UI");
                        return;
                    }
                    // 备份原有文件
                    let backDir = skinSwitch.dcdPath + '/备份'
                    game.ensureDirectory(backDir, function () {
                        let progressBG = ui.create.div(".progressBG", ui.window)
                        let progressBar = ui.create.div(progressBG)

                        let files = ['animation.js', 'dynamicWorker.js', 'extension.js']
                        let tasks = files.length
                        let current = 0
                        skinSwitch.addProgress(progressBar, current, tasks)

                        for (let f of files) {
                            game.readFile(skinSwitch.dcdPath + '/' + f, function (data) {
                                game.writeFile(data, backDir, f, function () {
                                    console.log(`备份${f}成功`)
                                    skinSwitch.addProgress(progressBar, ++current, tasks)
                                    if (current >= files.length) {
                                        progressBG.style.opacity = "0";
                                        skinSwitchMessage.show({
                                            type: 'success',
                                            text: '备份完成',
                                        })
                                    }
                                })
                            })
                        }
                    })
                },
                modifyFileDui: function () {
                    // if (lib.config[skinSwitch.configKey.bakeup]) {
                    //     // alert('已经备份了十周年文件, 无需重复操作')
                    //     return
                    // }

                    if (confirm("会覆盖十周年原文件,请确认是否已经备份过原文件方便出错还原, 是否确认?")) {
                        let progressBG = ui.create.div(".progressBG", ui.window)
                        let progressBar = ui.create.div(progressBG)
                        let files = ['animation.js', 'dynamicWorker.js']
                        let tasks = files.length
                        let current = 0

                        skinSwitch.addProgress(progressBar, current, tasks)

                        // 如果已经备份过, 就不重新备份了
                        // if (!lib.config[skinSwitch.configKey.bakeup]) {
                        //     for (let f of files) {
                        //         skinSwitch.backupFileDui(skinSwitch.dcdPath, f, function () {
                        //             skinSwitch.addProgress(progressBar, ++current, tasks)
                        //         })
                        //     }
                        // }

                        // 修改十周年文件.
                        // 将本地的worker文件copy,
                        let cpWorkerFiles = ['dynamicWorker.js', 'animation.js']
                        cpWorkerFiles.forEach(cpWorkerFile => {
                            game.readFile(skinSwitch.path + '/十周年UI/' + cpWorkerFile, function (data) {
                                game.writeFile(data, skinSwitch.dcdPath, cpWorkerFile, function () {
                                    skinSwitch.addProgress(progressBar, ++current, tasks)
                                    if (current >= tasks) {
                                        game.saveConfig(skinSwitch.configKey.bakeup, true)
                                        setTimeout(() => {
                                            progressBG.style.opacity = "0";
                                            if (confirm("导入备份十周年文件成功，点击确定将重启游戏")) {
                                                progressBG.remove();
                                                game.reload();
                                            }
                                        }, 2500)
                                    }
                                })
                            })
                        })
                    }
                },

                genDynamicSkin: function () {
                    if (window.pfqhUtils) {
                        if (decadeUI.dynamicSkin) {
                            let str = pfqhUtils.transformDdyskins(decadeUI.dynamicSkin)
                            // 写入文件中
                            game.writeFile(str, skinSwitch.path, '转换后_dynamicSkin.js', function () {
                                console.log('写入saveSkinParams.js成功')
                                skinSwitchMessage.show({
                                    type: 'success',
                                    text: '转换成功',
                                    duration: 1500,    // 显示时间
                                    closeable: false, // 可手动关闭
                                })
                            })
                        }
                    }
                },
                genDyTempFile: function () {
                    if (window.pfqhUtils && decadeUI.dynamicSkin) {
                        if (decadeUI.dynamicSkin) {
                            skinSwitchMessage.show({
                                type: 'success',
                                text: '正在生成中, 请等待',
                                duration: 1500,
                            })
                            pfqhUtils.generateDynamicFile(lib, decadeUI.dynamicSkin)
                        }
                    }
                },
                addProgress: function (obj, value, total) {
                    var progress = Math.floor(value / total * 100);
                    obj.style.backgroundSize = progress + "% 100%";
                },
                getDynamicSkin: function (skinName, playerName) {
                    if (!playerName) return false;
                    var dskins = dui.dynamicSkin;
                    var skins = dskins[playerName];
                    if (skins) {
                        if (skinName) return skins[skinName];
                        else {
                            let ps
                            if (lib.config[skinSwitch.configKey.dynamicSkin]) {
                                ps = lib.config[skinSwitch.configKey.dynamicSkin][playerName]
                            }
                            if (ps) return skins[ps];
                            else return skins[Object.keys(skins)[0]]
                        }
                    } else return false;
                },
                actionFilter: function (actions, action) {
                    var res = false;
                    for (var actionKey of actions) {
                        if (actionKey == action) {
                            return res = true;
                        }
                    }
                    return res;
                },
                createYH: function (group) {
                    var yh = document.createElement("img");
                    // 修复圆顶图片路径问题，确保正确加载势力对应的图片
                    yh.src = skinSwitch.url + "/images/border/" + group + ".png";
                    // 以下是备用的空白图，如果上面的图片加载失败，可以取消注释使用
                    // yh.src = skinSwitch.url + "/images/border/kongbai.png";
                    yh.classList.add("skinYh");
                    yh.style.display = "block";
                    yh.style.position = "absolute";
                    yh.style.top = "-22px";
                    yh.style.height = "50px";
                    yh.style.width = "131.1px";
                    yh.style.zIndex = "61";
                    // 添加onerror处理，确保图片加载失败时有备用方案
                    yh.onerror = function () {
                        this.src = skinSwitch.url + "/images/border/weizhi.png";
                        console.log("势力图标加载失败，使用默认图标");
                    };

                    // 根据配置决定是否显示
                    if (typeof window.showTopArc !== 'undefined' && !window.showTopArc) {
                        yh.style.display = "none";
                    }

                    return yh;
                },
                resetDynamicData: function () {
                    if (!lib.config[skinSwitch.decadeKey.dynamicSkin]) return alert("需要先打开十周年UI的动皮,再重置");
                    if (!lib.config[skinSwitch.configKey.dynamicSkin]) alert("没有动皮存档可重置");
                    if (confirm("你确定要重置动皮存档吗？完成后会自动重启游戏")) {
                        game.saveConfig(skinSwitch.configKey.dynamicSkin, null)
                        setTimeout(() => {
                            game.reload();
                        }, 1000);
                    }
                },
                // 样式代码来自于千幻经典小窗换肤修改
                qhly_open_small: function (name, player, isPrimary) {
                    if (_status.qhly_open) return;
                    _status.qhly_open = true;
                    let background = ui.create.div('.pfqh-qh-skinchange-background', document.body);
                    let backgroundBack = ui.create.div('.pfqh-qh-skinchange-background', background);
                    let dialog = ui.create.div('.pfqh-qh-skinchange-dialog', background);
                    let dragHandle = ui.create.div('.skin-drag-handle', dialog);
                    dragHandle.title = '拖拽移动千幻小窗';
                    let exit = ui.create.div('.pfqh-qh-skinchange-exit', dialog);
                    let cover = ui.create.div('.pfqh-qh-skinchange-cover', dialog);
                    let content = ui.create.div('.pfqh-qh-skinchange-area', cover);
                    let enlarge = ui.create.div('.pfqh-qh-skinchange-enlarge', dialog);
                    let swipe_up = lib.config.swipe_up;
                    lib.config.swipe_up = '';
                    let swipe_down = lib.config.swipe_down;
                    lib.config.swipe_down = '';
                    let swipe_left = lib.config.swipe_left;
                    lib.config.swipe_left = '';
                    let swipe_right = lib.config.swipe_right;
                    lib.config.swipe_right = '';
                    let exitListener = function () {
                        lib.config.swipe_up = swipe_up;
                        lib.config.swipe_down = swipe_down;
                        lib.config.swipe_left = swipe_left;
                        lib.config.swipe_right = swipe_right;

                        // 关闭所有动画
                        am.stopSpineAll()
                        // for (let k in am.animations) {
                        //     if (am.animations[k]) {
                        //         am.animations[k].nodes = []
                        //         let webglExt = am.animations[k].gl.getExtension('WEBGL_lose_context')
                        //         if (webglExt) {
                        //             webglExt.loseContext()
                        //         }
                        //     }
                        // }

                        if (!_status.qhly_open) return;
                        background.delete();
                        delete _status.qhly_open;
                    }

                    // 创建canvas
                    let d = ui.create.div('.pfqh-small-dynamic-skin-wrap', cover)
                    // 缓存小窗的加载资源
                    if (!skinSwitch.smallWindowAm) {
                        let skinCanvas = document.createElement('canvas')
                        skinSwitch.smallWindowAm = new AnimationManager(lib.assetURL + 'extension/十周年UI/assets/dynamic/', skinCanvas, 33321, { offscreen: false })
                        skinCanvas.style.height = '100%'
                        skinCanvas.style.width = '100%'
                    }
                    let am = skinSwitch.smallWindowAm
                    let skinCanvas = am.canvas
                    d.appendChild(skinCanvas)
                    let coverSize = cover.getBoundingClientRect()
                    am.updateSpineAll({ width: coverSize.width, height: coverSize.height, dpr: Math.max(self.devicePixelRatio * (self.documentZoom ? self.documentZoom : 1), 1) })

                    let viewState = {
                        offset: 0,
                        skinTotalWidth: 500,
                        skinPerWidth: 120,
                        skinPerHeight: 200,  // 默认露头
                        jingdongWidth: 100,
                        jingdongHeight: 44,
                        skinGap: 10,
                        skins: [],
                        skinViews: [],
                        visibleWidth: function () {
                            var rect = cover.getBoundingClientRect();
                            return rect.width;
                        },
                        content: content,
                        refresh: function () {
                            this.content.style.width = Math.round(this.skinTotalWidth) + 'px';
                            this.content.style.left = Math.round(this.offset) + "px";
                        },
                        refreshSkins: function () {
                            for (let i = 0; i < this.skinViews.length; i++) {
                                let skinView = this.skinViews[i];
                                let skin = this.skins[i];

                                if (skinSwitch.game_hasExtension('千幻聆音')) {
                                    if (game.qhly_skinIs(name, skin)) {
                                        skinView.belowText.style.textShadow = '.2rem 0rem .5rem red,-.2rem 0rem .5rem red,0rem .2rem .5rem red,0rem -.2rem .5rem red';
                                    } else {
                                        skinView.belowText.style.textShadow = '.2rem 0rem .5rem blue,-.2rem 0rem .5rem blue,0rem .2rem .5rem blue,0rem -.2rem .5rem blue';
                                    }
                                } else {
                                    if (skin === currentSelect) {
                                        skinView.belowText.style.textShadow = '.2rem 0rem .5rem red,-.2rem 0rem .5rem red,0rem .2rem .5rem red,0rem -.2rem .5rem red';
                                    } else {
                                        skinView.belowText.style.textShadow = '.2rem 0rem .5rem blue,-.2rem 0rem .5rem blue,0rem .2rem .5rem blue,0rem -.2rem .5rem blue';
                                    }
                                }
                            }
                        },
                        handleMouseDown: function (x, y) {
                            if (this.skinTotalWidth <= this.visibleWidth()) {
                                return;
                            }
                            this.mouseDownX = x;
                            this.mouseDownY = y;
                            this.isTouching = true;
                            this.cancelClick = false;
                        },
                        handleMouseMove: function (x, y) {
                            if (this.isTouching) {
                                var slideX = x - this.mouseDownX;
                                this.tempoffset = this.offset + slideX;
                                if (this.tempoffset > 0) {
                                    this.tempoffset = 0;
                                } else if (this.skinTotalWidth - this.visibleWidth() < -this.tempoffset) {
                                    this.tempoffset = -(this.skinTotalWidth - this.visibleWidth());
                                }
                                this.content.style.left = Math.round(this.tempoffset) + "px";
                                return true;
                            }
                        },
                        handleMouseUp: function (x, y) {
                            if (this.isTouching) {
                                this.isTouching = false;
                                if (x && y) {
                                    var slideX = x - this.mouseDownX;
                                    this.tempoffset = this.offset + slideX;
                                    if (this.tempoffset > 0) {
                                        this.tempoffset = 0;
                                    } else if (this.skinTotalWidth - this.visibleWidth() < -this.tempoffset) {
                                        this.tempoffset = -(this.skinTotalWidth - this.visibleWidth());
                                    }
                                }
                                this.cancelClick = Math.abs(this.offset - this.tempoffset) > 50;
                                this.content.style.left = Math.round(this.tempoffset) + "px";
                                this.offset = this.tempoffset;
                            } else {
                                this.cancelClick = false;
                            }
                            this.previousX = this.mouseDownX;
                            this.previousY = this.mouseDownY;
                            delete this.mouseDownX;
                            delete this.mouseDownY;
                        }
                    };
                    if (lib.config.touchscreen) {
                        content.addEventListener('touchstart', function (event) {
                            if (event.touches && event.touches.length) {
                                viewState.handleMouseDown(event.touches[0].clientX, event.touches[0].clientY);
                            }
                        });
                        content.addEventListener('touchend', function (event) {
                            viewState.handleMouseUp();
                        });
                        content.addEventListener('touchcancel', function (event) {
                            viewState.handleMouseUp();
                        });
                        content.addEventListener('touchmove', function (event) {
                            if (event.touches && event.touches.length)
                                viewState.handleMouseMove(event.touches[0].clientX, event.touches[0].clientY);
                        });
                    } else {
                        content.addEventListener('mousewheel', function (event) {
                            viewState.handleMouseDown(event.clientX, event.clientY);
                            if (event.wheelDelta > 0) {
                                viewState.handleMouseMove(event.clientX - 30, event.clientY);
                                viewState.handleMouseUp(event.clientX - 30, event.clientY);
                            } else {
                                viewState.handleMouseMove(event.clientX + 30, event.clientY);
                                viewState.handleMouseUp(event.clientX + 30, event.clientY);
                            }
                        });
                        content.addEventListener('mousedown', function (event) {
                            viewState.handleMouseDown(event.clientX, event.clientY);
                        });
                        content.addEventListener('mouseup', function (event) {
                            viewState.handleMouseUp(event.clientX, event.clientY);
                        });
                        content.addEventListener('mouseleave', function (event) {
                            viewState.handleMouseUp(event.clientX, event.clientY);
                        });
                        content.addEventListener('mousemove', function (event) {
                            viewState.handleMouseMove(event.clientX, event.clientY);
                        });
                    }

                    // 首先所有动皮
                    const dskins = dui.dynamicSkin;
                    const skins = dskins[name];
                    let keys = skins && Object.keys(skins) || []
                    let dynamicSkinKey = skinSwitch.configKey.dynamicSkin
                    let build_id = 0
                    let beijing_id = 888888

                    let skinInfoMap = { '__default': { skinName: null } }

                    let currentSelect = null // 当前选择的动皮名称
                    if (lib.config[dynamicSkinKey]) {
                        let ps = lib.config[dynamicSkinKey][name];
                        if (ps !== 'none') currentSelect = ps + '.jpg'
                    }
                    // 没有包含千幻, 暂时不设置静皮, 静皮用小杀代替, 以后可能用系统默认皮肤代替
                    keys.map(name => {
                        skinInfoMap[name] = {
                            staticImg: "url(" + skinSwitch.url + "/images/character/小杀.png)",
                            dynamic: true,
                            dynamicState: true,  // 当前是否处于动皮小窗状态
                            imgName: name + '.jpg',  // 默认的图片设置
                            skinName: skins[name].skinName || name,
                            isDefault: true,
                        }
                        // 检测动皮目录下是否有使用
                        let skinPath = skins[name].name
                        let lastIdx = skinPath.lastIndexOf('/')
                        let foldPath
                        if (lastIdx === -1) {
                            foldPath = ''
                        } else {
                            foldPath = skinPath.slice(0, lastIdx)
                        }
                        let path = skinSwitch.dcdPath + '/assets/dynamic/' + foldPath + '/' + skins[name].skinName + '.jpg'
                        // 如果该皮肤存在, 那么设置该皮肤为静态皮肤
                        skinSwitch.qhly_checkFileExist(path, exists => {
                            if (exists) {
                                skinInfoMap[name].staticImg = 'url("' + lib.assetURL + path + '")'
                            }
                        })
                    })

                    let updateSkinInfo = staticImgs => {
                        if (!staticImgs) staticImgs = []
                        // 将动皮放上.
                        let skinSet = new Set()
                        staticImgs.map(img => {
                            let imgKey = img.substring(0, img.lastIndexOf("."))
                            if (skinSet.has(imgKey)) return
                            skinSet.add(imgKey)
                            if (imgKey in skinInfoMap) {
                                skinInfoMap[imgKey].imgName = img  // 更新一下图片背景
                                skinInfoMap[imgKey].isDefault = false
                            } else {
                                skinInfoMap[imgKey] = {
                                    // staticImg: "url(" + skinSwitch.url + "/images/character/小杀.png)",
                                    dynamic: false,
                                    imgName: img,  // 这个是用于千幻这种的
                                    skinName: imgKey
                                }
                            }
                        })
                    }

                    let playDynamic = (skinView, skinParams) => {
                        let sprite = Object.assign({}, skinParams)
                        sprite.loop = true
                        sprite.viewportNode = skinView
                        sprite.id = build_id++
                        if (sprite.beijing) {
                            sprite.beijing = Object.assign({}, sprite.beijing)
                            sprite.beijing.viewportNode = skinView
                        }
                        if (sprite.qianjing) {
                            sprite.qianjing = Object.assign({}, sprite.qianjing)
                            sprite.qianjing.viewportNode = skinView
                        }

                        sprite.player = sprite;
                        skinView.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + sprite.background + '")'

                        let dynamic = am.getAnimation(sprite.player.version)
                        let beijingDynamic
                        if (sprite.player && sprite.player.beijing != null) {
                            beijingDynamic = am.getAnimation(sprite.player.beijing.version || sprite.player.version)
                        }
                        let qianjingDynamic
                        if (sprite.player && sprite.player.qianjing != null) {
                            qianjingDynamic = am.getAnimation(sprite.player.qianjing.version || sprite.player.version)
                        }

                        let loadDaiJi = () => {
                            if (!dynamic.hasSpine(sprite.name)) {
                                dynamic.loadSpine(sprite.name, sprite.player.json ? 'json' : 'skel', () => {
                                    // 加载后播放背景和待机
                                    if (sprite.player.beijing) {
                                        runBeijing()
                                    } else {
                                        run1()
                                    }

                                    if (sprite.player.qianjing) {
                                        runqianjing()
                                    } else {
                                        run2()
                                    }
                                })
                            } else {
                                if (sprite.player.beijing) {
                                    runBeijing()
                                }
                                if (sprite.player.qianjing) {
                                    runqianjing()
                                } else {
                                    run1()
                                    run2()
                                }
                            }

                        }
                        let loadBeiJingDaiJi = () => {
                            if (!beijingDynamic.hasSpine(sprite.player.beijing.name)) {
                                beijingDynamic.loadSpine(sprite.player.beijing.name, sprite.player.beijing.json ? 'json' : 'skel', () => {
                                    // 加载后播放背景和待机
                                    loadDaiJi()
                                })
                            } else {
                                loadDaiJi()
                            }
                        }
                        let run1 = function (beijingNode) {
                            let t = dynamic.playSpine(sprite)
                            t.opacity = 0
                            t.beijingNode = beijingNode

                            let skins = t.skeleton.data.skins
                            if (sprite.player.skin) {
                                let skinFound = false;
                                for (let i = 0; i < skins.length; i++) {
                                    if (skins[i].name === sprite.player.skin) {
                                        // 设置skin
                                        try {
                                            t.skeleton.setSkinByName(skins[i].name);
                                            t.skeleton.setSlotsToSetupPose();
                                            skinFound = true;
                                        } catch (e) {
                                            console.warn('Failed to set skin:', skins[i].name, e);
                                        }
                                        break;
                                    }
                                }
                                // 如果指定的皮肤不存在，尝试使用默认皮肤或第一个可用皮肤
                                if (!skinFound && skins.length > 0) {
                                    try {
                                        // 优先尝试使用默认皮肤
                                        if (t.skeleton.data.defaultSkin) {
                                            t.skeleton.setSkin(t.skeleton.data.defaultSkin);
                                        } else {
                                            // 如果没有默认皮肤，使用第一个可用皮肤
                                            t.skeleton.setSkinByName(skins[0].name);
                                        }
                                        t.skeleton.setSlotsToSetupPose();
                                    } catch (e) {
                                        console.warn('Failed to set fallback skin:', e);
                                    }
                                }
                            }

                            let labels = getAllActionLabels(t)
                            let jinchangLabel = 'ChuChang'  // 默认的进场标签
                            if (t.player.ss_jinchang) {
                                jinchangLabel = t.player.ss_jinchang
                            }
                            if (labels.includes(jinchangLabel)) {
                                // 清空原来的state状态, 添加出场
                                t.skeleton.state.setEmptyAnimation(0, 0);
                                t.skeleton.state.setAnimation(0, jinchangLabel, false, 0);
                                if (t.player.action && t.player.action !== jinchangLabel) {
                                    t.skeleton.state.addAnimation(0, t.player.action, true, -0.01);
                                    t.action = t.player.action
                                } else {
                                    for (let defaultDaiJi of ['DaiJi', 'play']) {
                                        let da = getLabelIgnoreCase(t, defaultDaiJi)
                                        if (da) {
                                            t.skeleton.state.addAnimation(0, da, true, -0.01);
                                            t.player.action = da
                                            t.action = da
                                        }
                                    }
                                }
                            }

                            let daijiActioh = t.action || t.skeleton.defaultAction
                            let setAnimation = () => {
                                // 如果包含Teshu或者play2. 那么接着播放这两个标签
                                for (let lab of ['TeShu', 'play2']) {
                                    if (labels.includes(lab) && lab !== daijiActioh) {
                                        t.skeleton.state.addAnimation(0, lab, false, 0).listener = {
                                            complete: function (trackIndex) {
                                                t.skeleton.state.addAnimation(0, daijiActioh, true, 0)
                                                setAnimation()
                                            }
                                        }
                                        break
                                    }

                                }
                            }
                            setAnimation()

                            // 重置一下背景和待机的时间
                            if (beijingNode) {
                                beijingNode.skeleton.state.tracks[0].trackTime = 0;
                                t.skeleton.state.tracks[0].trackTime = 0;
                                beijingNode.opacity = 1;
                            }
                            if (qianjingNode) {
                                qianjingNode.skeleton.state.tracks[0].trackTime = 0;
                                t.skeleton.state.tracks[0].trackTime = 0;
                                qianjingNode.opacity = 1;
                            }
                            sortNodes();
                            t.opacity = 1;

                            // 保存当前view的node节点
                            skinView.node = t
                        }

                        // 获取骨骼的所有action标签
                        let getAllActionLabels = node => {
                            // 获取所有actions
                            let animations = node.skeleton.data.animations;
                            let res = []
                            for (let ani of animations) {
                                res.push(ani.name)
                            }
                            return res
                        }

                        // 获取标签, 忽略大小写
                        let getLabelIgnoreCase = (node, label) => {
                            if (!label) return ''
                            let animations = node.skeleton.data.animations;
                            let lowerCaseLabel = label.toLowerCase()
                            for (let ani of animations) {
                                if (ani.name.toLowerCase() === lowerCaseLabel) {
                                    return ani.name
                                }
                            }
                            return ''
                        }

                        let runBeijing = () => {
                            sprite.player.beijing.loop = true
                            sprite.player.beijing.id = beijing_id++
                            if (sprite.player.beijing.alpha == null)
                                sprite.player.beijing.alpha = sprite.player.alpha

                            // 如果是双将的话, 复制裁剪.
                            if (!sprite.player.beijing.clip && sprite.clip) {
                                sprite.player.beijing.clip = sprite.clip
                            }
                            let node
                            try {
                                node = beijingDynamic.playSpine(sprite.player.beijing)
                                node.isbeijing = true
                            } catch (e) {
                                console.error(e)
                            }

                            // 获取所有actions
                            let chuChangLabel = ''
                            let labels = getAllActionLabels(node)
                            for (let label of labels) {
                                let lowerLabel = label.toLowerCase()
                                if (lowerLabel === 'chuchang') {
                                    chuChangLabel = label
                                    break
                                }
                            }
                            // 查找背景是否也有出场标签
                            if (chuChangLabel) {
                                node.skeleton.state.setAnimation(0, chuChangLabel, false, 0);
                                // 获取所有actions

                                for (let label of labels) {
                                    let lowerLabel = label.toLowerCase()
                                    for (let daijiName of ['DaiJi', 'BeiJing', 'play']) {
                                        if (daijiName.toLowerCase() === lowerLabel) {
                                            node.skeleton.state.addAnimation(0, label, true, -0.01);
                                            node.action = label
                                            break
                                        }
                                    }
                                }
                            }
                            // 检查当前节点是否存在位于背景层下的node, 提上来
                            sortNodes()
                            run1(node)
                        }
                        let runqianjing = () => {
                            sprite.player.qianjing.loop = true
                            sprite.player.qianjing.id = qianjing_id++
                            if (sprite.player.qianjing.alpha == null)
                                sprite.player.qianjing.alpha = sprite.player.alpha

                            // 如果是双将的话, 复制裁剪.
                            if (!sprite.player.qianjing.clip && sprite.clip) {
                                sprite.player.qianjing.clip = sprite.clip
                            }
                            let node
                            try {
                                node = qianjingDynamic.playSpine(sprite.player.qianjing)
                                node.isqianjing = true
                            } catch (e) {
                                console.error(e)
                            }

                            // 获取所有actions
                            let chuChangLabel = ''
                            let labels = getAllActionLabels(node)
                            for (let label of labels) {
                                let lowerLabel = label.toLowerCase()
                                if (lowerLabel === 'chuchang') {
                                    chuChangLabel = label
                                    break
                                }
                            }
                            // 查找背景是否也有出场标签
                            if (chuChangLabel) {
                                node.skeleton.state.setAnimation(0, chuChangLabel, false, 0);
                                // 获取所有actions

                                for (let label of labels) {
                                    let lowerLabel = label.toLowerCase()
                                    for (let daijiName of ['DaiJi', 'Chuchang', 'play']) {
                                        if (daijiName.toLowerCase() === lowerLabel) {
                                            node.skeleton.state.addAnimation(0, label, true, -0.01);
                                            node.action = label
                                            break
                                        }
                                    }
                                }
                            }
                            // 检查当前节点是否存在位于背景层下的node, 提上来
                            sortNodes()
                            run2(node)
                        }

                        let sortNodes = () => {
                            dynamic.nodes.sort((a, b) => {
                                return b.id - a.id
                            })
                        }
                        if (sprite.beijing) {
                            loadBeiJingDaiJi()
                        } else {
                            loadDaiJi()
                        }
                    }

                    let setStaticSkin = () => {
                        // 设置静皮
                        let bool1 = isPrimary, bool2 = !isPrimary
                        if (player && player.dynamic) {
                            player.stopDynamic(bool1, bool2)
                            let obj = player.getElementsByClassName((bool1 ? 'primary' : 'deputy') + "-avatar")[0]
                            if (obj) {
                                obj.style.opacity = 1
                            }
                        }
                        // 选择静皮还原
                        let dynamicSkinKey = skinSwitch.configKey.dynamicSkin
                        if (!lib.config[dynamicSkinKey]) lib.config[dynamicSkinKey] = {}
                        lib.config[dynamicSkinKey][name] = 'none'
                        game.saveConfig(dynamicSkinKey, lib.config[dynamicSkinKey]);
                        // 去除静皮的class
                        player.classList.remove(!bool1 ? 'd-skin2' : 'd-skin')
                    }

                    let initSkinViews = () => {
                        // 去除了千幻自带的排序功能.
                        let skinKeys = Object.keys(skinInfoMap)
                        // viewState.skins = skinList;
                        viewState.skinTotalWidth = (viewState.skinPerWidth + viewState.skinGap) * skinKeys.length - viewState.skinGap;
                        for (let i = 0; i < skinKeys.length; i++) {
                            let skinKey = skinKeys[i]

                            let skinInfo = skinInfoMap[skinKey]
                            let skin = skinInfo.imgName
                            if (i === 0) {
                                viewState.skins.push(null)
                                skin = null
                            } else {
                                viewState.skins.push(skin)
                            }

                            let skinView = ui.create.div('.pfqh-qh-skinchange-skin', content);
                            viewState.skinViews.push(skinView);
                            skinView.style.left = Math.round((viewState.skinPerWidth + viewState.skinGap) * i) + "px";
                            skinView.style.width = Math.round(viewState.skinPerWidth) + "px";
                            skinView.style.height = Math.round(viewState.skinPerHeight) + "px";
                            skinView.classList.add('qh-not-replace');
                            skinView.belowText = ui.create.div('.pfqh-qh-skinchange-skin-text', skinView);
                            if (i !== skinKeys.length - 1) {
                                let border = ui.create.div('.pfqh-qh-skinchange-border', content);
                                border.style.width = Math.round(viewState.skinGap) + "px";
                                border.style.left = Math.round((viewState.skinPerWidth + viewState.skinGap) * i + viewState.skinPerWidth) + "px";
                            }
                            let skinSprite
                            // 只有包含千幻聆音扩展才支持设置静皮
                            if (skinInfo.dynamic) {
                                skinSprite = Object.assign({}, skins[skinKey])
                                // 是否显示动皮
                                if (lib.config[skinSwitch.configKey.previewSkinsDynamic]) {
                                    skinView.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skinSprite.background + '")';
                                    playDynamic(skinView, skinSprite)
                                } else {
                                    // 显示静皮
                                    skinView.style.backgroundImage = skinInfo.staticImg
                                }

                            }
                            if (skinSwitch.game_hasExtension('千幻聆音')) {
                                // 添加上静动素材图片
                                let jingdong
                                if (skinInfo.dynamic) {
                                    let isDynamic = skinInfo.dynamicState;
                                    jingdong = ui.create.div(isDynamic ? '.pfqh-skin-dong' : '.pfqh-skin-jing', skinView)
                                    jingdong.isDynamic = isDynamic
                                    jingdong.listen((e) => {
                                        if (!jingdong.isDynamic) {
                                            jingdong.classList.add('pfqh-skin-dong')
                                            jingdong.classList.remove('pfqh-skin-jing')
                                            jingdong.isDynamic = true
                                            skinSwitch.dynamic.selectSkinV3(skinKey, player, isPrimary)
                                            game.qhly_setCurrentSkin(name, skin, function () {
                                                viewState.refreshSkins();
                                            }, true)
                                            if (!skinView.node) {
                                                skinView.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skinSprite.background + '")';
                                                playDynamic(skinView, skinSprite)
                                            }

                                            // 背景修改
                                            if (skinSprite.background) {
                                                skinView.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skinSprite.background + '")';
                                            } else {
                                                skinView.style.backgroundImage = null;
                                            }
                                        } else {
                                            jingdong.classList.remove('pfqh-skin-dong')
                                            jingdong.classList.add('pfqh-skin-jing')
                                            jingdong.isDynamic = false
                                            // 设置动皮对应的静皮
                                            if (viewState.cancelClick) return;
                                            game.qhly_playQhlyAudio('qhly_voc_fanshu', null, true);

                                            // 设置当前皮肤的背景和语音, 调用千幻聆音
                                            // 恢复原来的静态背景
                                            if (!skinInfo.isDefault) {
                                                let file = game.qhly_getSkinFile(name, skin);
                                                skinView.qhly_origin_setBackgroundImage(file);
                                                game.qhly_setCurrentSkin(name, skin, function () {
                                                    viewState.refreshSkins();
                                                }, true)
                                            } else {
                                                skinView.style.backgroundImage = skinInfo.staticImg
                                            }
                                            // 停止播放动画.
                                            if (skinView.node) {
                                                am.getAnimation(skinView.node.version).stopSpine(skinView.node)
                                                if (skinView.node.beijingNode) {
                                                    am.getAnimation(skinView.node.beijingNode.version).stopSpine(skinView.node.beijingNode)
                                                }
                                                if (skinView.node.qianjingNode) {
                                                    am.getAnimation(skinView.node.qianjingNode.version).stopSpine(skinView.node.qianjingNode)
                                                }
                                                skinView.node = null;
                                            }
                                            setStaticSkin()
                                        }
                                        e.stopPropagation();
                                    })
                                }
                                if (skin) {
                                    // 这里不使用千幻皮肤名称了, 直接使用图片的名称
                                    skinView.belowText.innerHTML = skinInfo.skinName
                                } else {
                                    skinView.belowText.innerHTML = "初始皮肤";
                                }
                                if (game.qhly_skinIs(name, skin)) {
                                    skinView.belowText.style.textShadow = '.2rem 0rem .5rem red,-.2rem 0rem .5rem red,0rem .2rem .5rem red,0rem -.2rem .5rem red';
                                } else {
                                    skinView.belowText.style.textShadow = '.2rem 0rem .5rem blue,-.2rem 0rem .5rem blue,0rem .2rem .5rem blue,0rem -.2rem .5rem blue';
                                }
                                (function (name, skin, view) {
                                    view.listen(function () {
                                        if (viewState.cancelClick) return;
                                        if (skin !== '__default_dynamic' && game.qhly_skinIs(name, skin)) return;
                                        game.qhly_playQhlyAudio('qhly_voc_fanshu', null, true);
                                        if (jingdong && jingdong.isDynamic) {
                                            skinSwitch.dynamic.selectSkinV3(skinKey, player, isPrimary)
                                            game.qhly_setCurrentSkin(name, skin, function () {
                                                viewState.refreshSkins();
                                            }, true);
                                        } else {
                                            game.qhly_setCurrentSkin(name, skin, function () {
                                                viewState.refreshSkins();
                                            }, true);
                                            setStaticSkin()
                                        }
                                    })
                                })(name, skin, skinView);
                                if (skin) {
                                    if (!skinInfo.dynamic || !lib.config[skinSwitch.configKey.previewSkinsDynamic]) {
                                        if (skinInfo.isDefault) {
                                            skinView.style.backgroundImage = skinInfo.staticImg
                                        } else {
                                            let file = game.qhly_getSkinFile(name, skin);
                                            skinView.qhly_origin_setBackgroundImage(file);
                                        }
                                    }

                                } else {
                                    skinView.qhly_origin_setBackground(name, 'character');
                                }
                            } else {
                                if (skin) {
                                    skinView.belowText.innerHTML = skinInfo.skinName
                                } else {
                                    skinView.belowText.innerHTML = "初始皮肤"
                                }

                                if (skin === currentSelect) {
                                    skinView.belowText.style.textShadow = '.2rem 0rem .5rem red,-.2rem 0rem .5rem red,0rem .2rem .5rem red,0rem -.2rem .5rem red';
                                } else {
                                    skinView.belowText.style.textShadow = '.2rem 0rem .5rem blue,-.2rem 0rem .5rem blue,0rem .2rem .5rem blue,0rem -.2rem .5rem blue';
                                }
                                (function (name, skin, view) {
                                    view.listen(function () {
                                        if (viewState.cancelClick) return;
                                        if (skin === currentSelect) return;
                                        if (skin == null) {
                                            currentSelect = skin
                                            skinView.setBackground(name, 'character');
                                            setStaticSkin()
                                        } else {
                                            skinSwitch.dynamic.selectSkinV3(skinKey, player, isPrimary)
                                            currentSelect = skin
                                        }
                                        viewState.refreshSkins()
                                    })
                                })(name, skin, skinView);
                                if (!skin) {
                                    skinView.setBackground(name, 'character');
                                }
                            }
                        }
                        viewState.refresh();
                    }

                    let handleSkinInfo = () => {
                        if (skinSwitch.game_hasExtension('千幻聆音')) {
                            game.qhly_getSkinList(name, function (ret, list) {
                                updateSkinInfo(list)
                                initSkinViews()
                            }, false)
                        } else {
                            initSkinViews()
                        }
                    }

                    handleSkinInfo()

                    // 初始化千幻小窗拖拽功能
                    this.initSmallWindowDrag(dialog, dragHandle);

                    backgroundBack.listen(function (event) {
                        exitListener();
                    });
                    exit.listen(exitListener);
                    enlarge.listen(function () {
                        exitListener();
                        if (skinSwitch.game_hasExtension('千幻聆音')) {
                            game.qhly_open_new(name, lib.config.qhly_doubledefaultpage ? lib.config.qhly_doubledefaultpage : 'skill', player);
                        }
                    })
                },
                // 初始化千幻小窗拖拽功能
                initSmallWindowDrag: function (dialog, dragHandle) {
                    if (!dialog || !dragHandle) return;

                    let isDragging = false;
                    let startX = 0;
                    let startY = 0;
                    let initialLeft = 0;
                    let initialTop = 0;

                    // 获取事件类型
                    const downEvent = lib.config.touchscreen ? 'touchstart' : 'mousedown';
                    const moveEvent = lib.config.touchscreen ? 'touchmove' : 'mousemove';
                    const upEvent = lib.config.touchscreen ? 'touchend' : 'mouseup';

                    // 获取触摸/鼠标坐标
                    const getEventCoords = (e) => {
                        if (e.touches && e.touches.length > 0) {
                            return { x: e.touches[0].clientX, y: e.touches[0].clientY };
                        }
                        return { x: e.clientX, y: e.clientY };
                    };

                    // 开始拖拽
                    const startDrag = (e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        isDragging = true;
                        const coords = getEventCoords(e);
                        startX = coords.x;
                        startY = coords.y;

                        // 获取当前位置
                        const rect = dialog.getBoundingClientRect();
                        initialLeft = rect.left;
                        initialTop = rect.top;

                        // 添加拖拽状态样式
                        dialog.classList.add('dragging');

                        // 阻止默认的transform，使用绝对定位
                        dialog.style.position = 'fixed';
                        dialog.style.left = initialLeft + 'px';
                        dialog.style.top = initialTop + 'px';
                        dialog.style.transform = 'none';

                        // 添加全局事件监听
                        document.addEventListener(moveEvent, handleDrag, { passive: false });
                        document.addEventListener(upEvent, stopDrag);
                    };

                    // 处理拖拽
                    const handleDrag = (e) => {
                        if (!isDragging) return;

                        e.preventDefault();
                        const coords = getEventCoords(e);
                        const deltaX = coords.x - startX;
                        const deltaY = coords.y - startY;

                        const newLeft = initialLeft + deltaX;
                        const newTop = initialTop + deltaY;

                        // 限制在屏幕范围内
                        const maxLeft = window.innerWidth - dialog.offsetWidth;
                        const maxTop = window.innerHeight - dialog.offsetHeight;

                        const constrainedLeft = Math.max(0, Math.min(newLeft, maxLeft));
                        const constrainedTop = Math.max(0, Math.min(newTop, maxTop));

                        dialog.style.left = constrainedLeft + 'px';
                        dialog.style.top = constrainedTop + 'px';
                    };

                    // 停止拖拽
                    const stopDrag = () => {
                        if (!isDragging) return;

                        isDragging = false;
                        dialog.classList.remove('dragging');

                        // 移除全局事件监听
                        document.removeEventListener(moveEvent, handleDrag);
                        document.removeEventListener(upEvent, stopDrag);
                    };

                    // 重置位置功能（双击拖拽手柄）
                    const resetPosition = () => {
                        dialog.style.position = '';
                        dialog.style.left = '';
                        dialog.style.top = '';
                        dialog.style.transform = 'translate(-50%, -50%)';
                    };

                    // 绑定事件
                    dragHandle.addEventListener(downEvent, startDrag);

                    // 双击重置位置
                    let clickCount = 0;
                    dragHandle.addEventListener('click', (e) => {
                        e.stopPropagation();
                        clickCount++;
                        setTimeout(() => {
                            if (clickCount === 2) {
                                resetPosition();
                            }
                            clickCount = 0;
                        }, 300);
                    });
                },
                selectSkinData: {
                    temp: "",
                    value: "",
                },
                // 初始化角色调整窗口拖拽功能
                initEditBoxDrag: function (editBox, dragHandle) {
                    if (!editBox || !dragHandle) return;

                    let isDragging = false;
                    let startX = 0;
                    let startY = 0;
                    let initialLeft = 0;
                    let initialTop = 0;

                    // 获取事件类型
                    const downEvent = lib.config.touchscreen ? 'touchstart' : 'mousedown';
                    const moveEvent = lib.config.touchscreen ? 'touchmove' : 'mousemove';
                    const upEvent = lib.config.touchscreen ? 'touchend' : 'mouseup';

                    // 获取触摸/鼠标坐标
                    const getEventCoords = (e) => {
                        if (e.touches && e.touches.length > 0) {
                            return { x: e.touches[0].clientX, y: e.touches[0].clientY };
                        }
                        return { x: e.clientX, y: e.clientY };
                    };

                    // 开始拖拽
                    const startDrag = (e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        isDragging = true;
                        const coords = getEventCoords(e);
                        startX = coords.x;
                        startY = coords.y;

                        // 获取当前位置
                        const rect = editBox.getBoundingClientRect();
                        initialLeft = rect.left;
                        initialTop = rect.top;

                        // 添加拖拽状态样式
                        editBox.classList.add('dragging');

                        // 阻止默认的transform，使用绝对定位
                        editBox.style.position = 'fixed';
                        editBox.style.left = initialLeft + 'px';
                        editBox.style.top = initialTop + 'px';
                        editBox.style.transform = 'none';

                        // 添加全局事件监听
                        document.addEventListener(moveEvent, handleDrag, { passive: false });
                        document.addEventListener(upEvent, stopDrag);
                    };

                    // 处理拖拽
                    const handleDrag = (e) => {
                        if (!isDragging) return;

                        e.preventDefault();
                        const coords = getEventCoords(e);
                        const deltaX = coords.x - startX;
                        const deltaY = coords.y - startY;

                        const newLeft = initialLeft + deltaX;
                        const newTop = initialTop + deltaY;

                        // 限制在屏幕范围内
                        const maxLeft = window.innerWidth - editBox.offsetWidth;
                        const maxTop = window.innerHeight - editBox.offsetHeight;

                        const constrainedLeft = Math.max(0, Math.min(newLeft, maxLeft));
                        const constrainedTop = Math.max(0, Math.min(newTop, maxTop));

                        editBox.style.left = constrainedLeft + 'px';
                        editBox.style.top = constrainedTop + 'px';
                    };

                    // 停止拖拽
                    const stopDrag = () => {
                        if (!isDragging) return;

                        isDragging = false;
                        editBox.classList.remove('dragging');

                        // 移除全局事件监听
                        document.removeEventListener(moveEvent, handleDrag);
                        document.removeEventListener(upEvent, stopDrag);
                    };

                    // 重置位置功能（双击拖拽手柄）
                    const resetPosition = () => {
                        editBox.style.position = '';
                        editBox.style.left = '';
                        editBox.style.top = '';
                        editBox.style.transform = '';
                    };

                    // 绑定事件
                    dragHandle.addEventListener(downEvent, startDrag);

                    // 双击重置位置
                    let clickCount = 0;
                    dragHandle.addEventListener('click', (e) => {
                        e.stopPropagation();
                        clickCount++;
                        setTimeout(() => {
                            if (clickCount === 2) {
                                resetPosition();
                            }
                            clickCount = 0;
                        }, 300);
                    });
                },
                // 触发以下武器技能不触发角色的特殊动画
                filterSkills: [
                    'zhangba_skill', 'guding_skill',
                    'zhuque_skill', 'hanbing_skill',
                    'guanshi_skill', 'cixiong_skill',
                    'fangtian_skill', 'qilin_skill',
                    'qinggang_skill', 'zhuge_skill',
                    'bagua_skill', 'bahu',
                ],
                dynamic: {
                    initSwitch: function (player, skins) {
                        if (player.name == "unknown" && player.name1) {
                            var name = player.name1;
                        } else {
                            var name = player.name;
                        }
                        var skinDiv = ui.create.div("#skinDiv", ui.window);
                        skinSwitch.dynamic.skinDiv = skinDiv;
                        skinDiv.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
                            skinSwitch.dynamic.skinDivShowOrHide()
                        })
                        var skinDiv2 = ui.create.div("#skinDiv2", skinDiv);
                        skinDiv2.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function (e) {
                            e.stopPropagation();
                        })
                        var skinBox = ui.create.div(".skinBox", skinDiv2);
                        skinBox.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function (e) {
                            e.stopPropagation();
                        })
                        var keys = Object.keys(skins)
                        for (let i = 0; i < keys.length; i++) {
                            var t = ui.create.div(".engSkin", skinBox);
                            t.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function (e) {
                                e.stopPropagation();
                            })
                            let path = skinSwitch.url + "/images/character/" + skinSwitch.dynamic.judgingRealName(name) + "/" + keys[i] + ".png";
                            let img = document.createElement("img");
                            let saveDynamic = lib.config[skinSwitch.configKey.dynamicSkin];
                            if (saveDynamic) {
                                var skin = saveDynamic[name];
                                if (skin == keys[i]) {
                                    t.style.backgroundImage = "url(" + skinSwitch.url + "/images/base/skin_bg.png)";
                                    skinSwitch.selectSkinData.temp = t;
                                    skinSwitch.selectSkinData.value = keys[i];
                                } else t.style.backgroundImage = "url(" + skinSwitch.url + "/images/base/skin_not_bg.png)";
                            }

                            img.alt = keys[i];
                            img.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function (e) {
                                e.stopPropagation();
                                this.parentNode.alt = this.alt;
                                skinSwitch.dynamic.selectSkin(this.parentNode);
                            })
                            img.src = path;
                            img.onerror = function () {
                                this.src = skinSwitch.url + "/images/character/小杀.png";
                                this.onerror = null;
                                return true
                            }
                            t.appendChild(img);
                        }
                    },
                    dynamicSkinInfo: {},  // 保存每个有动皮角色的在十周年ui的动皮配置信息
                    playerTempSkinInfo: {
                        currentWatchId: null,  // 保存当前选择查看的角色动皮信息
                    },
                    initPlayerAvatarDynamic: (player, isPrimary) => {
                        if (player.pfqhId == null) return
                        let dInfo = skinSwitch.dynamic.dynamicSkinInfo[player.pfqhId]
                        if (!dInfo) return
                        let skinInfos = isPrimary ? dInfo.primary : dInfo.deputy
                        let characterName = isPrimary ? player.name1 : player.name2
                        // 初始化当前皮肤信息到dom中
                        let skins = document.getElementById('pfqhSkins')
                        // 删除原来的节点
                        skins.innerHTML = ''

                        let addLisName = lib.config.touchscreen ? 'touchend' : 'click'

                        let selectName = null
                        if (lib.config[skinSwitch.configKey.dynamicSkin]) {
                            selectName = lib.config[skinSwitch.configKey.dynamicSkin][characterName]
                        }

                        if (skinInfos) {
                            // 获取选择的皮肤的位置
                            let keys = Object.keys(skinInfos)
                            let curIndex = 0
                            for (let j = 0; j < keys.length; j++) {
                                if (selectName === keys[j]) {
                                    curIndex = j
                                    break
                                }
                            }
                            for (let i = 0; i < keys.length; i++) {
                                let k = keys[i]
                                let skinInfo = skinInfos[k]
                                let skinAvatar = ui.create.div(".skin-avatar", skins);
                                let skinName = ui.create.div('.pfqh-text', skinAvatar)
                                skinName.innerHTML = k
                                let skinCover = ui.create.div('.pfqh-skin-cover', skinAvatar)
                                let skinImgDiv = ui.create.div('.pfqh-skin', skinCover)
                                if (curIndex <= 2) {
                                    if (i > 2) skinAvatar.style.display = 'none'
                                } else {
                                    if (i + 2 < curIndex || i > curIndex) skinAvatar.style.display = 'none'
                                }
                                skinImgDiv.setAttribute('skinName', k)
                                skinImgDiv.addEventListener(addLisName, (e) => {
                                    e.stopPropagation()
                                    skinSwitch.dynamic.selectSkinV2(e.target.getAttribute('skinName'), e.target)
                                })

                                if (selectName === k) {
                                    skinCover.classList.add('pfqh-selected')
                                    // 并且设置选择的是当前皮肤
                                    let selInfo = skinSwitch.dynamic.playerTempSkinInfo[player.pfqhId]
                                    if (isPrimary) {
                                        selInfo.primary = { temp: skinImgDiv, value: k, curIndex: curIndex - 2 <= 0 ? 0 : curIndex - 2 }
                                    } else {
                                        selInfo.deputy = { temp: skinImgDiv, value: k, curIndex: i }
                                    }
                                }
                                if (skinSwitch.game_hasExtension('千幻聆音')) {
                                    let filename = game.qhly_getSkinFile(characterName, k)
                                    // 获取放在骨骼目录下的图片路径
                                    let skinPath = skinInfo.name
                                    let lastIdx = skinPath.lastIndexOf('/')
                                    let foldPath = lastIdx === -1 ? '' : skinPath.slice(0, lastIdx)
                                    skinSwitch.checkFilesExistAndReturnOne([filename + '.jpg', filename + '.png', skinSwitch.dcdPath + '/assets/dynamic/' + foldPath + '/' + skinInfo.skinName + '.jpg'], (path) => {
                                        if (path) {
                                            skinImgDiv.style.backgroundImage = "url(" + lib.assetURL + path + ")"
                                        } else {
                                            skinImgDiv.style.backgroundImage = "url(" + skinSwitch.url + "/images/character/小杀.png)"
                                        }

                                    })
                                } else {
                                    skinImgDiv.style.backgroundImage = "url(" + skinSwitch.url + "/images/character/小杀.png)"
                                }
                            }
                            if (keys.length < 3) {
                                skins.style = 'justify-content: flex-start;'
                                skins.children[0].style = 'margin-right:5%;'
                            } else {
                                skins.style = ''
                            }
                            let left = document.getElementById('dynamicLeftArrow')
                            let right = document.getElementById('dynamicRightArrow')
                            if (Object.keys(skinInfos).length <= 3) {
                                // 隐藏左右按钮
                                left.classList.add('hidden')
                                right.classList.add('hidden')
                            } else {
                                if (curIndex <= 2) {
                                    left.classList.add('hidden')
                                } else {
                                    left.classList.remove('hidden')
                                }
                                if (curIndex + 2 >= Object.keys(skinInfos).length) {
                                    right.classList.add('hidden')
                                } else {
                                    right.classList.remove('hidden')
                                }
                            }
                        }
                    },
                    initSwitchV2: function () {
                        // 初始化当前对局中, 所有拥有动皮角色的动皮
                        for (let i = 0; i < game.players.length; i++) {
                            let p = game.players[i]
                            let dskins = decadeUI.dynamicSkin
                            let primarySkins = dskins[p.name1]
                            let dyInfo = {}
                            if (primarySkins) {
                                dyInfo.primary = primarySkins
                            }
                            let deputySkins = dskins[p.name2]
                            if (deputySkins) {
                                dyInfo.deputy = deputySkins
                            }
                            if (primarySkins || deputySkins) {
                                p.pfqhId = i  // 动态添加一个id, 来标明当前是那个角色
                                dyInfo.player = p  // 保存当前玩家的引用
                                dyInfo.zhuFuFlag = !!primarySkins;
                                this.dynamicSkinInfo[i] = dyInfo

                                this.playerTempSkinInfo[i] = {
                                    primary: { temp: '', value: '', curIndex: 0 },
                                    deputy: { temp: '', value: '', curIndex: 0 },
                                }
                            }

                        }

                        let addLisName = lib.config.touchscreen ? 'touchend' : 'click'
                        // 初始化动皮框的全体内容
                        if (Object.keys(this.dynamicSkinInfo).length > 0) {
                            let skinDiv = ui.create.div("#skinDiv", ui.window);
                            skinDiv.innerHTML = `
                                <div class="skin-character" id="skinCharacter">
                                    <div class="selectBackground">
                                        <div class="selectOut">
                                            <select class="selectInner" id="playerSkinSelect">
                                            </select>
                                        </div>
                                    </div>
                                    <!-- 切换样式: https://code.juejin.cn/pen/7144159185901453342 -->
                                    <div class='hellokitty' id="zhuFuDiv">
                                        <div class='text active' id='zhuText1'>
                                            主将
                                        </div>
                                        <div class='btn' id='zhuFuBtn'>
                                            <div class='paw'>
                                            </div>
                                            <div class='kitty'>
                                            </div>
                                        </div>
                                        <div class='text' id='fuText2'>
                                            副将
                                        </div>
                                    </div>
                                </div>
                                <div id="skinDiv2">
                                    <div class="skin-drag-handle" id="skinDragHandle" title="拖拽移动皮肤切换窗口"></div>
                                    <div class="skinBox">
                                        <div class="pfqhLeftArrow" id="dynamicLeftArrow"></div>
                                        <div class="skins" id="pfqhSkins">
                                        </div>
                                        <div id="dynamicRightArrow" class="pfqhRightArrow"></div>
                                    </div>
                                </div>
                            `
                            document.getElementById('skinCharacter').addEventListener(addLisName, e => {
                                e.stopPropagation()
                            })
                            document.getElementById('skinDiv2').addEventListener(addLisName, e => {
                                e.stopPropagation()
                            })

                            // 添加拖拽功能
                            this.initDragFunctionality()

                            // 将座次号添加到option中
                            let playerSkinSelect = document.getElementById('playerSkinSelect')
                            let btn = document.getElementById('zhuFuBtn');
                            let text1 = document.getElementById('zhuText1');
                            let text2 = document.getElementById('fuText2');

                            for (let k in this.dynamicSkinInfo) {
                                let option = document.createElement('option')
                                option.setAttribute('value', k)
                                let p = this.dynamicSkinInfo[k].player
                                let pName = lib.translate[p.name1]
                                if (!pName) pName = p.getSeatNum() + 1 + '号位'
                                option.text = pName
                                playerSkinSelect.options.add(option)
                            }

                            let initPlayerAvatarDynamic = skinSwitch.dynamic.initPlayerAvatarDynamic
                            skinDiv.addEventListener(addLisName, function () {
                                skinSwitch.dynamic.skinDivShowOrHide()
                            })

                            let changeDynamicSkinsByIdx = (idx) => {
                                // 获取所选角色的有动皮的部分, 然后进行初始化
                                if (this.dynamicSkinInfo[idx].primary) {
                                    initPlayerAvatarDynamic(this.dynamicSkinInfo[idx].player, true)
                                    setZhuFuBtnStyle(true)
                                } else if (this.dynamicSkinInfo[idx].deputy) {
                                    initPlayerAvatarDynamic(this.dynamicSkinInfo[idx].player, false)
                                    setZhuFuBtnStyle(false)
                                }
                            }

                            let setZhuFuBtnStyle = (isPrimary) => {
                                if (!isPrimary) {
                                    btn.classList.remove('left');
                                    btn.classList.add('right');
                                    text1.classList.remove('active');
                                    text2.classList.add('active');
                                } else {
                                    btn.classList.add('left');
                                    btn.classList.remove('right');
                                    text1.classList.add('active');
                                    text2.classList.remove('active');
                                }
                            }

                            playerSkinSelect.onchange = (e) => {
                                let idx = playerSkinSelect.options[playerSkinSelect.selectedIndex].value
                                this.playerTempSkinInfo.currentWatchId = idx
                                changeDynamicSkinsByIdx(idx)
                                e.stopPropagation()
                            }


                            btn.addEventListener(addLisName, e => {
                                let curSelect = this.dynamicSkinInfo[this.playerTempSkinInfo.currentWatchId]
                                curSelect.zhuFuFlag = !curSelect.zhuFuFlag;
                                if (!curSelect.zhuFuFlag) {
                                    btn.classList.remove('left');
                                    btn.classList.add('right');
                                    text1.classList.remove('active');
                                    text2.classList.add('active');
                                    initPlayerAvatarDynamic(curSelect.player, curSelect.zhuFuFlag)
                                } else {
                                    btn.classList.add('left');
                                    btn.classList.remove('right');
                                    text1.classList.add('active');
                                    text2.classList.remove('active');
                                    initPlayerAvatarDynamic(curSelect.player, curSelect.zhuFuFlag)
                                }
                            });

                            document.getElementById('dynamicRightArrow').addEventListener(addLisName, (e) => {
                                let skins = document.getElementById('pfqhSkins').children
                                // 获取当前是主将还是副将
                                let flag = this.dynamicSkinInfo[this.playerTempSkinInfo.currentWatchId].zhuFuFlag
                                let watchId = this.playerTempSkinInfo.currentWatchId
                                let avatar = flag ? this.playerTempSkinInfo[watchId].primary : this.playerTempSkinInfo[watchId].deputy
                                let curIdx = avatar.curIndex
                                if (skins.length <= curIdx + 3) return
                                skins[curIdx].style.display = 'none'
                                skins[curIdx + 3].style.display = 'block'
                                avatar.curIndex++
                                if (skins.length <= avatar.curIndex + 3) e.target.classList.add('hidden')
                                document.getElementById('dynamicLeftArrow').classList.remove('hidden')
                            })

                            document.getElementById('dynamicLeftArrow').addEventListener(addLisName, (e) => {
                                let skins = document.getElementById('pfqhSkins').children
                                let flag = this.dynamicSkinInfo[this.playerTempSkinInfo.currentWatchId].zhuFuFlag
                                let watchId = this.playerTempSkinInfo.currentWatchId
                                let avatar = flag ? this.playerTempSkinInfo[watchId].primary : this.playerTempSkinInfo[watchId].deputy
                                let curIdx = avatar.curIndex
                                if (curIdx === 0) return
                                skins[curIdx + 2].style.display = 'none'
                                skins[curIdx - 1].style.display = 'block'
                                avatar.curIndex--
                                if (avatar.curIndex === 0) e.target.classList.add('hidden')
                                document.getElementById('dynamicRightArrow').classList.remove('hidden')
                            })

                            skinSwitch.dynamic.skinDiv = skinDiv;
                            // 初始化第一个
                            for (let k in this.dynamicSkinInfo) {
                                this.playerTempSkinInfo.currentWatchId = k
                                changeDynamicSkinsByIdx(k)
                                // 如果不是双将模式, 隐藏按钮
                                if (this.dynamicSkinInfo[k].player.name2 == null) {
                                    document.getElementById('zhuFuDiv').style.display = 'none'
                                } else {
                                    document.getElementById('zhuFuDiv').style.display = 'flex'
                                }
                                break
                            }
                        }
                    },
                    // 初始化拖拽功能
                    initDragFunctionality: function () {
                        const skinDiv2 = document.getElementById('skinDiv2');
                        const dragHandle = document.getElementById('skinDragHandle');

                        if (!skinDiv2 || !dragHandle) return;

                        let isDragging = false;
                        let startX = 0;
                        let startY = 0;
                        let initialLeft = 0;
                        let initialTop = 0;

                        // 获取事件类型
                        const downEvent = lib.config.touchscreen ? 'touchstart' : 'mousedown';
                        const moveEvent = lib.config.touchscreen ? 'touchmove' : 'mousemove';
                        const upEvent = lib.config.touchscreen ? 'touchend' : 'mouseup';

                        // 获取触摸/鼠标坐标
                        const getEventCoords = (e) => {
                            if (e.touches && e.touches.length > 0) {
                                return { x: e.touches[0].clientX, y: e.touches[0].clientY };
                            }
                            return { x: e.clientX, y: e.clientY };
                        };

                        // 开始拖拽
                        const startDrag = (e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            isDragging = true;
                            const coords = getEventCoords(e);
                            startX = coords.x;
                            startY = coords.y;

                            // 获取当前位置
                            const rect = skinDiv2.getBoundingClientRect();
                            initialLeft = rect.left;
                            initialTop = rect.top;

                            // 添加拖拽状态样式
                            skinDiv2.classList.add('dragging');

                            // 阻止默认的transform，使用绝对定位
                            skinDiv2.style.position = 'fixed';
                            skinDiv2.style.left = initialLeft + 'px';
                            skinDiv2.style.top = initialTop + 'px';
                            skinDiv2.style.transform = 'none';

                            // 添加全局事件监听
                            document.addEventListener(moveEvent, handleDrag, { passive: false });
                            document.addEventListener(upEvent, stopDrag);
                        };

                        // 处理拖拽
                        const handleDrag = (e) => {
                            if (!isDragging) return;

                            e.preventDefault();
                            const coords = getEventCoords(e);
                            const deltaX = coords.x - startX;
                            const deltaY = coords.y - startY;

                            const newLeft = initialLeft + deltaX;
                            const newTop = initialTop + deltaY;

                            // 限制在屏幕范围内
                            const maxLeft = window.innerWidth - skinDiv2.offsetWidth;
                            const maxTop = window.innerHeight - skinDiv2.offsetHeight;

                            const constrainedLeft = Math.max(0, Math.min(newLeft, maxLeft));
                            const constrainedTop = Math.max(0, Math.min(newTop, maxTop));

                            skinDiv2.style.left = constrainedLeft + 'px';
                            skinDiv2.style.top = constrainedTop + 'px';
                        };

                        // 停止拖拽
                        const stopDrag = () => {
                            if (!isDragging) return;

                            isDragging = false;
                            skinDiv2.classList.remove('dragging');

                            // 移除全局事件监听
                            document.removeEventListener(moveEvent, handleDrag);
                            document.removeEventListener(upEvent, stopDrag);
                        };

                        // 重置位置功能（双击拖拽手柄）
                        const resetPosition = () => {
                            skinDiv2.style.position = '';
                            skinDiv2.style.left = '';
                            skinDiv2.style.top = '';
                            skinDiv2.style.transform = 'translate(-50%, -50%)';
                        };

                        // 绑定事件
                        dragHandle.addEventListener(downEvent, startDrag);

                        // 双击重置位置
                        let clickCount = 0;
                        dragHandle.addEventListener('click', (e) => {
                            e.stopPropagation();
                            clickCount++;
                            setTimeout(() => {
                                if (clickCount === 2) {
                                    resetPosition();
                                }
                                clickCount = 0;
                            }, 300);
                        });
                    },
                    // 修改eng选择皮肤框的写法
                    selectSkinV2: function (skinName, target) {
                        if (!skinName) return
                        game.playAudio("..", "extension", "皮肤切换/audio/game", "Notice02.mp3")
                        let curWatchId = this.playerTempSkinInfo.currentWatchId
                        let curSkins = this.dynamicSkinInfo[curWatchId]
                        let tempSkinInfo = this.playerTempSkinInfo[curWatchId]
                        let isPrimary = curSkins.zhuFuFlag
                        let avatarSkins = isPrimary ? curSkins.primary : curSkins.deputy
                        let avatarInfo = isPrimary ? tempSkinInfo.primary : tempSkinInfo.deputy
                        if (avatarSkins && avatarInfo && avatarInfo.value !== skinName) {
                            if (avatarInfo.temp instanceof HTMLElement) {
                                avatarInfo.temp.parentNode.classList.remove('pfqh-selected')
                            }
                            target.parentNode.classList.add('pfqh-selected')
                            avatarInfo.value = skinName
                            avatarInfo.temp = target
                            let player = curSkins.player
                            if (!player.isAlive()) return
                            let avatarName = isPrimary ? player.name1 : player.name2

                            let skin = avatarSkins[skinName]
                            if (!skin) return
                            player.stopDynamic(isPrimary, !isPrimary)



                            skin.player = skin;
                            dcdAnim.playSpine(skinSwitch.huanfu, { scale: 0.5, parent: player });
                            skin.deputy = !isPrimary

                            if (skin.localePath) {
                                if (!skin.name.startsWith(skin.localePath + '/')) {
                                    skin.name = skin.localePath + '/' + skin.name
                                    skin.background = skin.localePath + '/' + skin.background
                                }
                            }

                            if (game.qhly_setCurrentSkin) {
                                // todo? 暂时先这样, 后面改成和雷音同步
                                game.qhly_setCurrentSkin(isPrimary ? player.name1 : player.name2, skin.skinName + '.jpg', () => {
                                    let namex = isPrimary ? player.name1 : player.name2
                                    if (!lib.config.qhly_skinset) {
                                        lib.config.qhly_skinset = {}
                                    }
                                    if (!lib.config.qhly_skinset.djtoggle) {
                                        lib.config.qhly_skinset.djtoggle = {}
                                    }
                                    if (!lib.config.qhly_skinset.djtoggle[namex]) {
                                        lib.config.qhly_skinset.djtoggle[namex] = {}
                                    }
                                    // 默认用.jpg结尾,
                                    lib.config.qhly_skinset.djtoggle[namex][skin.skinName + '.jpg'] = false
                                }, true)
                            }

                            player.playDynamic(skin, !isPrimary);



                            if (skin.background) {
                                player.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skin.background + '")';
                            } else {
                                player.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/皮肤切换/images/card/card.png")'
                            }
                            player.classList.add(!isPrimary ? 'd-skin2' : 'd-skin');

                            if (!lib.config[skinSwitch.configKey.dynamicSkin]) lib.config[skinSwitch.configKey.dynamicSkin] = {};
                            if (lib.config[skinSwitch.configKey.dynamicSkin]) {
                                let cg = lib.config[skinSwitch.configKey.dynamicSkin];
                                cg[avatarName] = skinName;
                                game.saveConfig(skinSwitch.configKey.dynamicSkin, cg);
                            }
                            skinSwitch.dynamic.startPlay2Random(player)

                            // 皮肤变化了, 修改编辑的全局变量
                            if (isPrimary && window.dynamicEditBox && player === game.me) {
                                dynamicEditBox.updateGlobalParams()
                            }

                        }

                    },
                    // 以千幻聆音小窗扩展形式的选择皮肤功能
                    selectSkinV3: function (skinName, player, isPrimary) {
                        if (!skinName) return
                        if (!player || !player.isAlive()) return

                        let dskins = decadeUI.dynamicSkin
                        const avatarName = isPrimary ? player.name1 : player.name2
                        const skins = dskins[avatarName]
                        let skin = skins[skinName]
                        if (!skin) return

                        player.stopDynamic(isPrimary, !isPrimary)
                        skin.player = skin



                        dcdAnim.playSpine(skinSwitch.huanfu, { scale: 0.5, parent: player })
                        skin.deputy = !isPrimary
                        player.playDynamic(skin, !isPrimary);

                        // 皮肤切换后重新应用保存的动皮参数
                        setTimeout(() => {
                            if (window.skinSwitch && typeof skinSwitch.updateDecadeDynamicSkin === 'function') {
                                console.log('皮肤切换后重新应用保存的动皮参数...');
                                skinSwitch.updateDecadeDynamicSkin();
                            }
                        }, 100);



                        if (skin.background) {
                            player.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skin.background + '")';
                        } else {
                            player.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/皮肤切换/images/card/card.png")'
                        }
                        player.classList.add(!isPrimary ? 'd-skin2' : 'd-skin');

                        if (!lib.config[skinSwitch.configKey.dynamicSkin]) lib.config[skinSwitch.configKey.dynamicSkin] = {};
                        if (lib.config[skinSwitch.configKey.dynamicSkin]) {
                            let cg = lib.config[skinSwitch.configKey.dynamicSkin];
                            cg[avatarName] = skinName;
                            game.saveConfig(skinSwitch.configKey.dynamicSkin, cg);
                        }
                        skinSwitch.dynamic.startPlay2Random(player)

                        // 皮肤变化了, 修改编辑的全局变量
                        if (isPrimary && window.dynamicEditBox && player === game.me) {
                            dynamicEditBox.updateGlobalParams()
                        }

                    },
                    // 老eng的选择皮肤
                    selectSkin: function (e) {
                        game.playAudio("..", "extension", "皮肤切换/audio/game", "Notice02.mp3");
                        let temp = skinSwitch.selectSkinData.temp;
                        if (temp === "") {
                            skinSwitch.selectSkinData.temp = e;
                            skinSwitch.selectSkinData.value = e.alt
                            return
                        }
                        if (temp !== e) {
                            if (skinSwitch.dynamic.selectSkin.cd) {
                                skinSwitch.dynamic.selectSkin.cd = false;
                                let player = game.me;
                                temp.style.backgroundImage = "url(" + skinSwitch.url + "/images/base/skin_not_bg.png)";
                                skinSwitch.selectSkinData.value = e.alt;
                                e.style.backgroundImage = "url(" + skinSwitch.url + "/images/base/skin_bg.png)";
                                skinSwitch.selectSkinData.temp = e;
                                var skin = dui.dynamicSkin[player.name][e.alt];
                                // if (skin.action) delete skin.action;
                                player.stopDynamic();



                                skinSwitch.huanfu.parent = player;
                                skin.player = skin;
                                dcdAnim.playSpine(skinSwitch.huanfu, skinSwitch.huanfu);
                                if (skin.deputy) skin.deputy = false;

                                if (skin.localePath) {
                                    if (!skin.name.startsWith(skin.localePath + '/')) {
                                        skin.name = skin.localePath + '/' + skin.name
                                        skin.background = skin.localePath + '/' + skin.background
                                    }
                                }



                                // 重新初始化
                                player.playDynamic(skin, false);

                                // 皮肤切换后重新应用保存的动皮参数
                                setTimeout(() => {
                                    if (window.skinSwitch && typeof skinSwitch.updateDecadeDynamicSkin === 'function') {
                                        console.log('皮肤切换后重新应用保存的动皮参数...');
                                        skinSwitch.updateDecadeDynamicSkin();
                                    }
                                }, 100);


                                if (skin.background) {
                                    player.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skin.background + '")';
                                } else {
                                    player.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/皮肤切换/images/card/card.png")'
                                }
                                if (lib.config[skinSwitch.configKey.dynamicSkin]) {
                                    var cg = lib.config[skinSwitch.configKey.dynamicSkin];
                                    cg[player.name] = e.alt;
                                    game.saveConfig(skinSwitch.configKey.dynamicSkin, cg);
                                }
                                skinSwitch.dynamic.skinDivShowOrHide();

                                // 皮肤变化了, 修改编辑的全局变量
                                if (window.dynamicEditBox) {
                                    dynamicEditBox.updateGlobalParams()
                                }

                                setTimeout(() => {
                                    skinSwitch.dynamic.selectSkin.cd = true;
                                }, 1000);
                            } else {
                                skinSwitchMessage.show({
                                    type: 'warning',
                                    text: '更换动皮频繁.',
                                    duration: 1500,    // 显示时间
                                    closeable: false, // 可手动关闭
                                })
                                // alert("更换动皮频繁.");
                            }
                        }
                    },
                    skinDivShowOrHide: function (show) {
                        if (show) {
                            skinSwitch.dynamic.skinDiv.style.display = "block";
                            setTimeout(() => {
                                skinSwitch.dynamic.skinDiv.style.opacity = "1";
                            }, 200);
                        } else {
                            skinSwitch.dynamic.skinDiv.style.opacity = "0";
                            setTimeout(() => {
                                skinSwitch.dynamic.skinDiv.style.display = "none";
                            }, 400);
                        }
                    },
                    judgingRealName: function (name) {
                        let shen = name.indexOf("shen_");
                        let boss = name.indexOf("boss_");
                        let special = shen > -1 ? shen : boss > -1 ? boss : -1;
                        if (special > -1) {
                            return name.substr(special, name.length);
                        } else {
                            var index = name.lastIndexOf("_");
                            return name.substr(index + 1, name.length);
                        }
                    },
                    /**
                     * 判断当前player是否触发攻击特效, 使用动皮攻击会自动触发攻击特效, 比如如果是暗将, 就不触发攻击特效
                     * @param player: player对象
                     * @returns {Object|false}
                     * { deputy: boolean,  // 是否是副将
                     *   needHide: Number, // 需要隐藏的副将的skinId 当两个皮肤都是动皮的时候,需要隐藏一个动皮的出框动画
                     *   isDouble: boolean  // 是否是双将
                     *   dynamic: 需要播放的动皮参数
                     * }
                     */
                    checkCanBeAction: function (player) {
                        let isPrimary = player.dynamic.primary;
                        let res = {
                            isDouble: false,
                            deputy: false,
                            needHide: undefined
                        }
                        if (player.doubleAvatar) {
                            res.isDouble = true;
                            let isDeputy = player.dynamic.deputy;
                            let unseen = player.isUnseen(0);
                            let unseen2 = player.isUnseen(1);
                            // 默认会只播放动皮的攻击动画.
                            if (isPrimary && !unseen) {
                                res.dynamic = isPrimary;
                            } else if (isDeputy && !unseen2) {
                                res.dynamic = isDeputy;
                                res.deputy = true;
                            } else {
                                return false;
                            }
                            // 两个都是动皮, 并且都不是隐藏状态, 那么2号可能需要隐藏
                            if (isPrimary && isDeputy) {
                                if (!unseen && !unseen2) {
                                    res.needHide = isDeputy.id;
                                }
                            }
                        } else {
                            res.dynamic = isPrimary;
                        }
                        return res;
                    },
                    getSkinName: function (roleName, skinPath) {
                        let dskins = decadeUI.dynamicSkin[roleName]
                        for (let k in dskins) {
                            if (dskins[k].name === skinPath) {
                                return k
                            }
                        }
                    },
                    setBackground: function (avatar, player) {
                        // 设置背景, 配合千幻使用, 会自动设置, 西瓜大佬的限定技需要读取这个角色的默认背景放到图框里面, 配合兼容
                        let skin = player.dynamic[avatar];
                        let obj = player.getElementsByClassName(avatar + "-avatar")[0];
                        // 如果已经设置了, 就不再进行设置
                        if (obj.style.backgroundImage == null) {
                            obj.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skin.background + '")';
                        }

                        // 设置动态皮肤背景
                        if (player.$dynamicWrap && skin.player && skin.player.background) {
                            player.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skin.player.background + '")';
                        }

                    },

                    // 随机播放十周年动皮的play2动画
                    startPlay2Random: function (player) {
                        // 检查当前角色的动皮
                        let checkCanPlay2 = (isPrimary) => {
                            if (!player.dynamic) return false
                            let avatar = isPrimary ? player.dynamic.primary : player.dynamic.deputy
                            if (avatar) {
                                let sprite = avatar.player
                                return sprite.shizhounian;
                            }
                            return false
                        }
                        let getPlay2Action = (sprite) => {
                            // 定时播放的就不读取特殊的标签了, 如果要重新指定标签, 单独指定
                            // if (typeof sprite.teshu === 'string') {
                            //     action = sprite.teshu
                            // } else if (typeof sprite.teshu === 'object') {
                            //     if (sprite.name === sprite.teshu.name) {
                            //         action = sprite.teshu.action || 'play2'
                            //     }
                            // }
                            return sprite.play2 || 'play2'
                        }
                        let firstLast
                        if (!player.playPrimaryTimer) {
                            if (checkCanPlay2(true)) {
                                let sprite = player.dynamic.primary.player
                                let action = getPlay2Action(sprite)
                                let randomInterval = function (timer) {
                                    clearTimeout(player.playPrimaryTimer)
                                    if (!checkCanPlay2(true)) {
                                        return
                                    }
                                    // 只有非攻击状态才播放play2
                                    if ((!player.lastPlayTime || (new Date().getTime() - player.lastPlayTime) > 10000) && !player.GongJi) {
                                        skinSwitch.postMsgApi.playAvatar(player, true, action)
                                    }
                                    if (firstLast) {
                                        // console.log('play2 time', (new Date().getTime() - firstLast) / 1000)
                                    }
                                    firstLast = new Date().getTime()
                                    player.playPrimaryTimer = setTimeout(() => {
                                        randomInterval()
                                    }, Math.floor(Math.random() * 6000) + 10000)

                                }
                                // 10s后开启自动播放play2模式
                                setTimeout(randomInterval, 10 * 1000)
                            }
                        }
                        let last
                        if (!player.playDeputyTimer) {
                            if (checkCanPlay2(false)) {
                                let sprite = player.dynamic.deputy.player
                                let action = getPlay2Action(sprite)
                                let randomInterval = function () {
                                    clearTimeout(player.playDeputyTimer)
                                    if (!checkCanPlay2(false)) {
                                        return
                                    }
                                    if ((!player.lastPlayTime || (new Date().getTime() - player.lastPlayTime) > 8000) && !player.GongJi) {
                                        skinSwitch.postMsgApi.playAvatar(player, false, action)
                                    }
                                    if (last) {
                                        // console.log('play2 time', (new Date().getTime() - last) / 1000)
                                    }
                                    last = new Date().getTime()

                                    player.playDeputyTimer = setTimeout(() => {
                                        randomInterval()
                                    }, Math.floor(Math.random() * 6000) + 8000)
                                }
                                // 10s后开启自动播放play2模式
                                setTimeout(randomInterval, 10 * 1000)
                            }
                        }
                    },
                    // 下面两个方法配合动皮更换骨骼等特殊事件
                    // 返回单将或者双将满足条件的判断
                    getSpecial: (player, triName) => {
                        let getSpecialEffs = (avatar, isPrimary) => {
                            if (!avatar) return null
                            if (isPrimary) {
                                if (!player.originSkin) {
                                    player.originSkin = avatar.player
                                }
                            }
                            else {
                                if (!player.originSkin2) {
                                    player.originSkin2 = avatar.player  // 副将的原始皮肤
                                }
                            }

                            // 优先使用当前皮肤的special配置，如果不存在则使用原始皮肤的配置
                            let currentSkin = avatar.player;
                            let originSkin = isPrimary ? player.originSkin : player.originSkin2
                            let special = currentSkin?.special;
                            if (!special && originSkin) {
                                special = originSkin.special;
                            }
                            if (!special) return null
                            let effs
                            effs = special.condition[triName]
                            if (!effs) return null
                            return { avatar, special, effs, isPrimary }
                        }
                        let res = []
                        if (player.dynamic) {
                            let r = getSpecialEffs(player.dynamic.primary, true)
                            if (r) res.push(r)
                            if (player.doubleAvatar) {
                                r = getSpecialEffs(player.dynamic.deputy, false)
                                if (r) res.push(r)
                            }
                        }
                        return res
                    },
                    // 更改为指定参数的状态,
                    transformDst: (player, isPrimary, dstInfo, extraParams = { isOrigin: false, huanfuEffect: null }) => {
                        const avatar = isPrimary ? player.dynamic.primary : player.dynamic.deputy
                        let { isOrigin, huanfuEffect } = extraParams
                        // 标明这时转换播放骨骼
                        dstInfo = Object.assign({}, dstInfo)
                        dstInfo._transform = true

                        // 记录原始骨骼的音频配置，确保可以恢复
                        if (avatar && avatar.audio && !dstInfo.audio) {
                            dstInfo.audio = avatar.audio
                        }

                        if (dstInfo.name == null || dstInfo.name === avatar.name) {
                            if (dstInfo.action) {
                                skinSwitch.postMsgApi.changeAvatarAction(player, isPrimary, dstInfo, isOrigin)
                            }
                            if (dstInfo.skin) {
                                skinSwitch.postMsgApi.changeSkelSkin(player, dstInfo.skin, isPrimary)
                            }
                        } else {

                            dstInfo.player = dstInfo
                            let huanfuEff = {
                                name: '../../../皮肤切换/effects/transform/default',
                                scale: 0.7,
                                speed: 0.6,
                                delay: 0.3, // 默认设置的延迟是0.2秒
                            }

                            const changeEffects = skinSwitch.effects.transformEffects

                            if (huanfuEffect) {
                                if (typeof huanfuEffect === 'string') {
                                    if (huanfuEffect in changeEffects) {
                                        huanfuEffect = changeEffects[huanfuEffect]
                                    } else {
                                        huanfuEffect = { name: huanfuEffect };
                                    }
                                }
                                huanfuEff = Object.assign(huanfuEff, huanfuEffect)
                                huanfuEff.name = '../../../皮肤切换/effects/transform/' + huanfuEffect.name
                            }
                            skinSwitch.chukuangWorkerApi.playEffect(huanfuEff, { parent: player })
                            dstInfo.deputy = !isPrimary

                            setTimeout(() => {
                                player.stopDynamic(isPrimary, !isPrimary)

                                // 添加_needUpdateAudio标记，确保playDynamic会重新初始化音频
                                dstInfo._needUpdateAudio = true



                                // 确保游戏音频系统被初始化
                                if (!skinSwitch.pfqh_originPlayAudio) {
                                    skinSwitch.pfqh_originPlayAudio = game.playAudio
                                }
                                if (!skinSwitch.qfqh_originPlaySkillAudio) {
                                    skinSwitch.qfqh_originPlaySkillAudio = game.playSkillAudio
                                }

                                // 重新初始化语音
                                if (dstInfo.audio) {
                                    let id = player.dynamic.id
                                    let skinId = isPrimary ?
                                        (player.dynamic.primary ? player.dynamic.primary.id : null) :
                                        (player.dynamic.deputy ? player.dynamic.deputy.id : null)

                                    if (!skinSwitch.audioMap) {
                                        skinSwitch.audioMap = {}
                                    }

                                    // 处理音频路径
                                    let skillPath = dstInfo.audio.skill
                                    let cardPath = dstInfo.audio.card
                                    let rootPath = skinSwitch.dcdPath + '/assets/dynamic/'



                                    // 处理文件扩展名的辅助函数
                                    let qhly_earse_ext = function (path) {
                                        let foundDot = path.lastIndexOf('.');
                                        if (foundDot < 0) return path;
                                        return path.slice(0, foundDot);
                                    }

                                    // 更新技能语音
                                    if (skillPath) {
                                        let path = rootPath + skillPath
                                        game.getFileList(path, function (folds, files) {
                                            for (let file of files) {
                                                file = qhly_earse_ext(file);
                                                let key
                                                if (file === name) {
                                                    key = 'die/' + file
                                                    skinSwitch.audioMap[key] = '../' + path + '/' + file;
                                                } else if (file === 'victory' || file === 'win') {
                                                    key = 'effect/' + id + '/' + skinId + '/' + 'victory'
                                                    skinSwitch.audioMap[key] = '../' + path + '/' + file;
                                                } else {
                                                    key = 'skill/' + file
                                                    skinSwitch.audioMap[key] = '../' + path + '/' + file;
                                                }
                                                if (skinSwitch.avatarAudioSkinMap[name]) {
                                                    skinSwitch.avatarAudioSkinMap[name][key] = null
                                                }
                                            }
                                        })
                                    }

                                    // 更新卡牌语音
                                    if (cardPath) {
                                        let cardRootPath = rootPath;
                                        let path = cardRootPath + cardPath
                                        game.getFileList(path, function (folds, files) {
                                            for (let file of files) {
                                                file = qhly_earse_ext(file);
                                                let key = 'card/' + id + '/' + skinId + '/' + file
                                                skinSwitch.audioMap[key] = '../' + path + '/' + file
                                                if (skinSwitch.avatarAudioSkinMap[name]) {
                                                    skinSwitch.avatarAudioSkinMap[name][key] = null
                                                }
                                            }
                                        })
                                    }
                                }



                            }, (huanfuEff.delay || 0) * 1000)

                            if (dstInfo.background) {
                                player.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + dstInfo.background + '")';
                            }
                            player.classList.add(!isPrimary ? 'd-skin2' : 'd-skin');

                            skinSwitch.dynamic.startPlay2Random(player)

                            // 皮肤变化了, 修改编辑的全局变量
                            if (isPrimary && window.dynamicEditBox && player === game.me) {
                                dynamicEditBox.updateGlobalParams()
                            }
                        }
                    },
                },

                // 统一管理向worker发送消息后, 防止worker回复的消息被覆盖而出的异常
                rendererOnMessage: {
                    dynamicEvents: {},  // 内部动皮事件管理器
                    onmessage: function (e) {
                        let _this = skinSwitch.rendererOnMessage
                        let data = e.data

                        if (typeof data !== "object") return
                        if (data) {
                            // 读取data.id, 来确定是那个角色发出的消息的返回
                            let id = data.id
                            let type = data.type
                            if (id in _this.dynamicEvents && type in _this.dynamicEvents[id]) {
                                // 调用之前注册的方法
                                _this.dynamicEvents[id][type](data)
                            }

                        }
                    },
                    /**
                     * 添加worker对应消息类型的回调, 当worker发出对应的消息, 当前线程(主线程)调用对应的回调函数
                     * @param player 当前角色
                     * @param type  处理worker传回发回的消息类型
                     * @param callback  回调
                     * @param bind  调用回调函数时绑定this的对象, 默认为player
                     */
                    addListener: function (player, type, callback, bind) {
                        let id = player.dynamic.id
                        let renderer = player.dynamic.renderer
                        if (renderer.onmessage !== this.onmessage) {
                            renderer.onmessage = this.onmessage
                        }
                        if (!(id in this.dynamicEvents)) {
                            this.dynamicEvents[id] = {}
                        }
                        // 直接覆盖之前的消息, 并且绑定回调函数的this为player
                        this.dynamicEvents[id][type] = callback.bind(bind || player)
                        // if (!(type in this.dynamicEvents[id])) {
                        //     this.dynamicEvents[id][type] = callback.bind(player)
                        // }
                    }
                },
                // 向worker通信发送的消息api, 统一管理
                postMsgApi: {
                    _onchangeDynamicWindow: function (player, res) {
                        let canvas = player.getElementsByClassName("animation-player")[0];
                        let dynamicWrap
                        if (player.isQhlx) {
                            dynamicWrap = player.getElementsByClassName("qhdynamic-big-wrap")[0];
                        } else {
                            // if (lib.config['extension_十周年UI_newDecadeStyle'] === "on") {
                            //     dynamicWrap = player.getElementsByClassName("dynamicPlayerCanvas")[0]
                            //
                            // } else {
                            dynamicWrap = player.getElementsByClassName("dynamic-wrap")[0];
                            // }
                        }
                        skinSwitch.rendererOnMessage.addListener(player, 'chukuangFirst', function (data) {
                            // 直接设置属性, 第一优先生效, 这里播放攻击动画, 调整播放canvas的位置, 不再跟随皮肤框,也就是动皮出框
                            dynamicWrap.style.zIndex = 100;
                            canvas.style.position = "fixed";
                            canvas.style.height = "100%";
                            canvas.style.width = "100%";
                            if (!player.isQhlx) {
                                player.style.zIndex = 10;
                            } else {
                                player.style.zIndex = 64  // 防止遮住血量
                            }
                            // canvas.style.opacity = 0
                            // 防止闪烁,
                            canvas.classList.add('pfqhFadeInEffect')
                            // setTimeout(() => {
                            //     canvas.classList.remove('hidden')
                            // }, 250)
                        })

                        skinSwitch.rendererOnMessage.addListener(player, 'canvasRecover', function (data) {
                            if (lib.config['extension_十周年UI_newDecadeStyle'] === "on") {
                                dynamicWrap.style.zIndex = "62";
                            } else {
                                dynamicWrap.style.zIndex = "60";
                            }
                            canvas.style.height = null;
                            canvas.style.width = null;
                            canvas.style.position = null;
                            if (player.isQhlx) {
                                dynamicWrap.style.zIndex = 62
                                player.style.zIndex = 62
                            }
                            else player.style.zIndex = 4;
                            player.GongJi = false;
                        })

                        skinSwitch.rendererOnMessage.addListener(player, 'chukuangSecond', function (data) {
                            // 这里表示动画已经准备好了, 可以显示
                            setTimeout(() => {
                                canvas.classList.remove('pfqhFadeIn')
                            }, 50)

                            let playName
                            if (res.dynamic.gongji && res.dynamic.gongji.name) {
                                playName = res.dynamic.gongji.name
                            } else {
                                playName = res.dynamic.name
                            }
                            if (res.dynamic.localePath && playName.startsWith(res.dynamic.localePath)) {
                                playName = playName.substr(res.dynamic.localePath.length + 1, playName.length)
                            }
                            game.playAudio("..", "extension", "皮肤切换/audio/effect", playName + ".mp3");
                        })
                    },

                    /**
                     * 单独播放某个角色的动画
                     * @param player  当前角色
                     * @param isPrimary  是否是主将的
                     * @param action  动画标签
                     */
                    playAvatar: function (player, isPrimary, action) {
                        if (!player.dynamic) return
                        let avatar = isPrimary ? player.dynamic.primary : player.dynamic.deputy
                        if (!avatar) return
                        player.dynamic.renderer.postMessage({
                            message: 'ACTION',
                            id: player.dynamic.id,
                            action: action,
                            skinID: avatar.id,
                        })
                    },
                    // 更改角色的动作或者额外播放一段action
                    changeAvatarAction: function (player, isPrimary, skinInfo, isDefault) {
                        if (!player.dynamic) return
                        let avatar = isPrimary ? player.dynamic.primary : player.dynamic.deputy
                        if (!avatar) return
                        player.dynamic.renderer.postMessage({
                            message: 'CHANGE_ACTION',
                            id: player.dynamic.id,
                            skinInfo,
                            isDefault,  // 标明是否返回默认的待机状态
                            skinID: avatar.id,
                        })
                    },
                    /**
                     * 请求worker播放对应的动画
                     * @param player  当前player对象, 自己就是game.me
                     * @param action  播放对应的动画action名称, TeShu/GongJi
                     * @param playAvatar  可以指定播放哪个角色
                     * @constructor
                     */
                    action: function (player, action, playAvatar) {
                        let res = skinSwitch.dynamic.checkCanBeAction(player)
                        if (res.dynamic && playAvatar && playAvatar !== res.dynamic) {
                            res.skinID = playAvatar.id
                            res.needHide = res.dynamic.id
                            res.deputy = !res.deputy
                        }
                        let pp = skinSwitch.getCoordinate(player, true)
                        let me = player === game.me
                        if (res && res.dynamic) {
                            if (!player.dynamic.renderer.postMessage) {
                                skinSwitchMessage.show({
                                    type: 'warning',
                                    text: '当前动皮过多',
                                    duration: 1500,    // 显示时间
                                    closeable: false, // 可手动关闭
                                })
                                // 尝试清除千幻对应的特效
                                clearInterval(_status.texiaoTimer);
                                clearTimeout(_status.texiaoTimer2);
                                return
                            }
                            player.dynamic.renderer.postMessage({
                                message: 'ACTION',
                                id: player.dynamic.id,
                                action: action,
                                skinID: res.dynamic.id,
                                isDouble: res.isDouble,
                                deputy: res.deputy,
                                needHide: res.needHide,
                                me: me,
                                direction: me ? false : skinSwitch.getDirection(player),
                                player: pp,
                                selfPhase: _status.currentPhase === player  // 是否是自己的回合
                            })
                        } else {
                            player.GongJi = false
                        }
                        return res
                    },
                    actionTeShu: function (player) {
                        let r = this.action(player, 'TeShu')
                        if (r) {
                            // 记录teshu上次的时间, 防止重复播放特殊动画
                            player.lastPlayTime = new Date().getTime()
                            skinSwitch.rendererOnMessage.addListener(player, 'teshuChuKuang', function (data) {
                                if (data.chukuang) {
                                    this._onchangeDynamicWindow(player, r)
                                }
                            }, this)
                        }
                    },
                    // 播放十周年的出场动画
                    actionChuChang: function (player) {
                        let r = this.action(player, 'chuchang')
                        if (r) {
                            player.GongJi = true
                            this._onchangeDynamicWindow(player, r)
                        }
                    },
                    actionGongJi: function (player, extraParams) {
                        skinSwitch.chukuangWorkerApi.chukuangAction(player, 'GongJi', extraParams)
                        // let r = this.action(player, 'GongJi')
                        // if (r) {
                        //     player.lastPlayTime = new Date().getTime()
                        //     this._onchangeDynamicWindow(player, r)
                        // }
                    },
                    debug: function (player, mode) {
                        if (!(player.dynamic && player.dynamic.primary)) {
                            skinSwitchMessage.show({
                                type: 'error',
                                text: '只有当前角色是动皮时才可以编辑动皮参数',
                                duration: 1500,    // 显示时间
                                closeable: false, // 可手动关闭
                            })
                        }
                        if (!player.dynamic.renderer.postMessage) {
                            skinSwitchMessage.show({
                                type: 'warning',
                                text: '当前动皮过多',
                                duration: 1500,    // 显示时间
                                closeable: false, // 可手动关闭
                            })
                        }
                        // 当前角色位置
                        let pp = skinSwitch.getCoordinate(player, true)
                        player.dynamic.renderer.postMessage({
                            message: "DEBUG",
                            id: player.dynamic.id,
                            action: "GongJi",
                            skinID: player.dynamic.primary.id,
                            isDouble: false,
                            needHide: false,
                            me: true,
                            direction: false,
                            player: pp,
                            mode: mode,
                        })
                    },
                    position: function (player, mode) {
                        if (!(player.dynamic && player.dynamic.primary)) {
                            skinSwitchMessage.show({
                                type: 'error',
                                text: '只有当前角色是动皮时才可以编辑动皮参数',
                                duration: 1500,    // 显示时间
                                closeable: false, // 可手动关闭
                            })
                        }
                        if (!player.dynamic.renderer.postMessage) {
                            return
                        }
                        player.dynamic.renderer.postMessage({
                            message: "POSITION",
                            id: player.dynamic.id,
                            skinID: player.dynamic.primary.id,
                            mode: mode,
                        })
                    },
                    adjust: function (player, mode, posData) {
                        if (!(player.dynamic && player.dynamic.primary)) {
                            skinSwitchMessage.show({
                                type: 'error',
                                text: '只有当前角色是动皮时才可以编辑动皮参数',
                                duration: 1500,    // 显示时间
                                closeable: false, // 可手动关闭
                            })
                        }
                        if (!player.dynamic.renderer.postMessage) {
                            skinSwitchMessage.show({
                                type: 'warning',
                                text: '当前动皮过多',
                                duration: 1500,    // 显示时间
                                closeable: false, // 可手动关闭
                            })
                        }
                        player.dynamic.renderer.postMessage({
                            message: "ADJUST",
                            id: player.dynamic.id,
                            skinID: player.dynamic.primary.id,
                            mode: mode,
                            xyPos: posData.xyPos,
                            x: posData.x,
                            y: posData.y,
                            scale: posData.scale,
                            angle: posData.angle
                        })
                        if (mode === 'chukuang') {
                            skinSwitch.chukuangWorkerApi.adjust(player, posData, 'GongJi')
                        } else if (mode === 'chuchang') {
                            skinSwitch.chukuangWorkerApi.adjust(player, posData, 'chuchang')
                        } else if (mode === 'teshu') {
                            skinSwitch.chukuangWorkerApi.adjust(player, posData, 'TeShu')
                        }
                    },
                    show: function (player, skinId) {
                        if (!(player.dynamic && (player.dynamic.primary || player.dynamic.deputy))) {
                            skinSwitchMessage.show({
                                type: 'error',
                                text: '只有当前角色是动皮时才可以编辑动皮参数',
                                duration: 1500,    // 显示时间
                                closeable: false, // 可手动关闭
                            })
                        }
                        if (!player.dynamic.renderer.postMessage) {
                            skinSwitchMessage.show({
                                type: 'warning',
                                text: '当前动皮过多',
                                duration: 1500,    // 显示时间
                                closeable: false, // 可手动关闭
                            })
                        }
                        player.dynamic.renderer.postMessage({
                            message: 'SHOW',
                            id: player.dynamic.id,
                            skinID: skinId
                        });
                    },
                    /**
                     player: 当前动皮角色
                     mode: 当前编辑的模式
                     posData: {x: [0, 0.5], y: [0, 0.5], scale: 1, angle: 25}
                     */
                    resizePos: function (player, mode, posData) {
                        if (!(player.dynamic && player.dynamic.primary)) {
                            skinSwitchMessage.show({
                                type: 'error',
                                text: '只有当前角色是动皮时才可以编辑动皮参数',
                                duration: 1500,    // 显示时间
                                closeable: false, // 可手动关闭
                            })
                        }
                        if (!player.dynamic.renderer.postMessage) {
                            skinSwitchMessage.show({
                                type: 'warning',
                                text: '当前动皮过多',
                                duration: 1500,    // 显示时间
                                closeable: false, // 可手动关闭
                            })
                        }
                        player.dynamic.renderer.postMessage({
                            message: "RESIZE",
                            id: player.dynamic.id,
                            skinID: player.dynamic.primary.id,
                            mode: mode,
                            ...posData
                        })
                        if (mode === 'chukuang') {
                            skinSwitch.chukuangWorkerApi.adjust(player, posData, 'GongJi')
                        } else if (mode === 'chuchang') {
                            skinSwitch.chukuangWorkerApi.adjust(player, posData, 'chuchang')
                        } else if (mode === 'teshu') {
                            skinSwitch.chukuangWorkerApi.adjust(player, posData, 'TeShu')
                        }
                    },
                    getNodeInfo: function (player) {
                        if (!(player.dynamic && player.dynamic.primary)) {
                            skinSwitchMessage.show({
                                type: 'error',
                                text: '只有当前角色是动皮时才可以编辑动皮参数',
                                duration: 1500,    // 显示时间
                                closeable: false, // 可手动关闭
                            })
                        }
                        if (!player.dynamic.renderer.postMessage) {
                            skinSwitchMessage.show({
                                type: 'warning',
                                text: '当前动皮过多',
                                duration: 1500,    // 显示时间
                                closeable: false, // 可手动关闭
                            })
                        }
                        player.dynamic.renderer.postMessage({
                            message: "GET_NODE_INFO",
                            id: player.dynamic.id,
                            skinID: player.dynamic.primary.id,
                        })
                    },

                    startPlay: function (player, data) {
                        if (!player.dynamic) return
                        skinSwitch.rendererOnMessage.addListener(player, 'logMessage', function (data) {
                            console.log('dyWorker', data)
                        })

                        player.dynamic.renderer.postMessage({
                            message: 'StartPlay',
                            data: data,
                        })
                        skinSwitch.rendererOnMessage.addListener(player, 'playSkinEnd', function () {
                            let img = player.$dynamicWrap.style.backgroundImage
                            // 取消原来设置的默认动皮
                            if (img.endsWith('card.png")')) {
                                player.$dynamicWrap.style.backgroundImage = ''
                            }
                        })
                    },
                    changeSkelSkin: function (player, newSkinName, isPrimary) {
                        if (!player.dynamic) return
                        let avatar = isPrimary ? player.dynamic.primary : player.dynamic.deputy
                        if (!avatar) return

                        player.dynamic.renderer.postMessage({
                            message: 'changeSkelSkin',
                            id: player.dynamic.id,
                            skinId: avatar.id,
                            skinName: newSkinName,
                        })
                    }
                },
                chukuangWorkerApi: {
                    create: function () {
                        let canvas = document.createElement('canvas')
                        canvas.className = 'chukuang-canvas'
                        canvas.style = `position: fixed; left: 0px; top: 0px; pointer-events:none; width:100%;height:100%;`
                        // canvas.height = decadeUI.get.bodySize().height
                        // canvas.width = decadeUI.get.bodySize().width
                        canvas.height = decadeUI.get.bodySize().height
                        canvas.width = decadeUI.get.bodySize().width
                        let div = ui.create.div('.chukuang-canvas-wraper', document.body)
                        div.appendChild(canvas)
                        div.id = 'chukuang-canvas-wraper'
                        canvas.id = 'chukuang-canvas'
                        // 监听屏幕大小变化, 重新更新canvas大小
                        if (self.ResizeObserver) {
                            let ro = new ResizeObserver(entries => {
                                for (let entry of entries) {
                                    if (skinSwitch.chukuangWorker) {
                                        const cr = entry.contentRect
                                        skinSwitch.chukuangWorker.postMessage({
                                            message: 'UPDATE',
                                            width: cr.width,
                                            height: cr.height,
                                        })
                                    }
                                }
                            });
                            ro.observe(document.body);
                        }


                        let offsetCanvas = canvas.transferControlToOffscreen();

                        // worker与主线程的通信方式, 这里是发起一个创建动态皮肤的请求
                        skinSwitch.chukuangWorker.postMessage({
                            message: 'CREATE',
                            canvas: offsetCanvas,
                            pathPrefix: '../十周年UI/assets/dynamic/',
                            isMobile: skinSwitch.isMobile(),
                            dpr: Math.max(window.devicePixelRatio * (window.documentZoom ? window.documentZoom : 1), 1),
                            isAttackFlipX: lib.config[skinSwitch.configKey.isAttackFlipX]
                        }, [offsetCanvas]);

                    },
                    create2: function () {
                        let canvas = document.createElement('canvas')
                        canvas.className = 'chukuang-canvas2'
                        canvas.style = `position: fixed; left: 0px; top: 0px; pointer-events:none; width:100%;height:100%; z-index: 4;`
                        canvas.height = decadeUI.get.bodySize().height
                        canvas.width = decadeUI.get.bodySize().width
                        let div = ui.create.div('.chukuang-canvas-wraper2', document.body)
                        div.style.zIndex = '4'
                        div.appendChild(canvas)
                        div.id = 'chukuang-canvas-wraper2'
                        canvas.id = 'chukuang-canvas2'
                        // 监听屏幕大小变化, 重新更新canvas大小
                        if (self.ResizeObserver) {
                            let ro = new ResizeObserver(entries => {
                                for (let entry of entries) {
                                    if (skinSwitch.chukuangWorker2) {
                                        const cr = entry.contentRect
                                        skinSwitch.chukuangWorker2.postMessage({
                                            message: 'UPDATE',
                                            width: cr.width,
                                            height: cr.height,
                                        })
                                    }
                                }
                            });
                            ro.observe(document.body);
                        }

                        let offsetCanvas = canvas.transferControlToOffscreen();

                        // worker与主线程的通信方式, 这里是发起一个创建动态皮肤的请求
                        skinSwitch.chukuangWorker2.postMessage({
                            message: 'CREATE',
                            canvas: offsetCanvas,
                            pathPrefix: '../十周年UI/assets/dynamic/',
                            isMobile: skinSwitch.isMobile(),
                            dpr: Math.max(window.devicePixelRatio * (window.documentZoom ? window.documentZoom : 1), 1),
                            isAttackFlipX: lib.config[skinSwitch.configKey.isAttackFlipX]
                        }, [offsetCanvas]);

                    },
                    preLoad: function (id, skinId, skinPlayer) {
                        skinSwitch.chukuangWorker.postMessage({
                            message: 'PRELOAD',
                            player: skinPlayer,
                            id: id,
                            skinId: skinId
                        })
                    },
                    action: function (player, action) {
                        let res = skinSwitch.dynamic.checkCanBeAction(player)
                        let pp = skinSwitch.getCoordinate(player, true)
                        let me = player === game.me
                        if (res && res.dynamic) {
                            if (!player.dynamic.renderer.postMessage) {
                                skinSwitchMessage.show({
                                    type: 'warning',
                                    text: '当前动皮过多',
                                    duration: 1500,    // 显示时间
                                    closeable: false, // 可手动关闭
                                })
                                // 尝试清除千幻对应的特效
                                clearInterval(_status.texiaoTimer);
                                clearTimeout(_status.texiaoTimer2);
                                return
                            }
                            skinSwitch.chukuangWorkerInit()
                            skinSwitch.chukuangWorker.postMessage({
                                message: 'ACTION',
                                id: player.dynamic.id,
                                action: action,
                                skinId: res.dynamic.id,
                                isDouble: res.isDouble,
                                deputy: res.deputy,
                                needHide: res.needHide,
                                me: me,
                                direction: me ? false : skinSwitch.getDirection(player),
                                player: pp,
                                selfPhase: _status.currentPhase === player  // 是否是自己的回合
                            })
                        } else {
                            player.GongJi = false
                        }
                        return res
                    },
                    chukuangAction: function (player, action, extraParams) {
                        let dynamic = player.dynamic
                        if (!dynamic || (!dynamic.primary && !dynamic.deputy)) {
                            return
                        }
                        skinSwitch.chukuangWorkerInit()
                        // 添加如果当前是国战模式隐藏状态下, 不允许出框
                        skinSwitch.chukuangWorker.postMessage({
                            message: 'isChuKuang',
                            id: dynamic.id,
                            primarySkinId: (!player.isUnseen || !player.isUnseen(0)) && dynamic.primary && dynamic.primary.id,
                            deputySkinId: (!player.isUnseen || !player.isUnseen(1)) && dynamic.deputy && dynamic.deputy.id,
                            action: action,
                            extraParams: extraParams,  // 表示需要更新出框的播放效果
                        })
                    },
                    adjust: function (player, posData, action) {
                        skinSwitch.chukuangWorkerInit()
                        skinSwitch.chukuangWorker.postMessage({
                            message: "ADJUST",
                            id: player.dynamic.id,
                            skinId: player.dynamic.primary.id,
                            action: action,  // 添加action参数
                            xyPos: posData.xyPos,
                            x: posData.x,
                            y: posData.y,
                            scale: posData.scale,
                            angle: posData.angle
                        })
                    },
                    // 播放特效
                    playEffect: function (sprite, position) {
                        skinSwitch.chukuangWorkerInit()
                        if (position && position.parent) {
                            position.parent = {
                                boundRect: position.parent.getBoundingClientRect(),
                                bodySize: {
                                    bodyWidth: decadeUI.get.bodySize().width,
                                    bodyHeight: decadeUI.get.bodySize().height
                                }
                            }
                        }
                        skinSwitch.chukuangWorker.postMessage({
                            message: "PLAY_EFFECT",
                            sprite,
                            position: position,
                        })
                    },
                    playEffect2: function (sprite, position) {
                        skinSwitch.chukuangWorkerInit2()
                        if (position && position.parent) {
                            position.parent = {
                                boundRect: position.parent.getBoundingClientRect(),
                                bodySize: {
                                    bodyWidth: decadeUI.get.bodySize().width,
                                    bodyHeight: decadeUI.get.bodySize().height
                                }
                            }
                        }
                        skinSwitch.chukuangWorker2.postMessage({
                            message: "PLAY_EFFECT2",
                            sprite,
                            position: position,
                        })
                    },
                    clearEffect2: function (sprite) {
                        skinSwitch.chukuangWorkerInit2()
                        skinSwitch.chukuangWorker2.postMessage({
                            message: "CLEAR_EFFECT2",
                            sprite: sprite,
                        })
                    },
                    clearEffect: function (sprite) {
                        skinSwitch.chukuangWorkerInit()
                        skinSwitch.chukuangWorker.postMessage({
                            message: "CLEAR_EFFECT",
                            sprite: sprite,
                        })
                    },
                    // 清除所有特效2
                    clearAllEffects2: function () {
                        skinSwitch.chukuangWorkerInit2()
                        skinSwitch.chukuangWorker2.postMessage({
                            message: "CLEAR_ALL_EFFECTS2"
                        })
                    },
                    // 清除所有特效
                    clearAllEffects: function () {
                        skinSwitch.chukuangWorkerInit()
                        skinSwitch.chukuangWorker.postMessage({
                            message: "CLEAR_ALL_EFFECTS"
                        })
                    },
                    // 提前加载资源, 防止突然换肤卡顿
                    loadResources: function (players, skels) {
                        skinSwitch.chukuangWorkerInit()
                        skinSwitch.chukuangWorker.postMessage({
                            message: "LOAD_RESOURCES",
                            players,  // 角色参数
                            skels,  // 普通骨骼
                        })
                    }
                },
                chukuangWorkerOnMessage: {
                    init: function () {
                        skinSwitch.chukuangWorker.onmessage = e => {
                            let data = e.data
                            switch (data.message) {
                                case "chukuangPrepare":
                                    this.chukuangStart(data)
                                    break
                                case "recoverDaiJi":
                                    this.recoverDaiJi(data)
                                    break
                                case 'noActionChuKuang':
                                    this.noActionChuKuang(data)
                                    break
                            }
                        }
                    },
                    getPlayerById: function (id, isQhlx) {
                        for (let p of game.players) {
                            if (p.dynamic && p.dynamic.id === id) {
                                return p
                            }
                        }
                        // 千幻雷修的手杀大屏预览
                        let p = document.getElementById('mainView')
                        // 尝试查找手杀大屏的node
                        if (p) {
                            let _canvas = p.getElementsByClassName('animation-player')
                            if (_canvas.length) {
                                return _canvas[0].parentNode.parentNode
                            }

                        }
                        // 查找十周年样式的出框样式
                        return null
                    },
                    chukuangStart: function (data) {
                        // 如果当前不是自己回合, 特殊动作, 不出框
                        // 根据返回的data, 查出当前属于哪个player
                        let player = this.getPlayerById(data.id, data.qhlxBigAvatar)
                        if (!player || !player.dynamic) return
                        let dynamic = player.dynamic
                        let avatar = data.isPrimary ? dynamic.primary : dynamic.deputy
                        if (!avatar) {
                            return
                        }
                        if (_status.currentPhase !== player && data.action === 'TeShu' && !avatar.player.shizhounian) {
                            return
                        }
                        player.dynamic.renderer.postMessage({
                            message: 'hideAllNode',
                            id: dynamic.id,
                            isPrimary: data.isPrimary,
                            skinId: data.skinId
                        })
                        skinSwitch.rendererOnMessage.addListener(player, 'hideAllNodeEnd', function () {
                            let pp = skinSwitch.getCoordinate(player, true)
                            let me = player === game.me
                            skinSwitch.chukuangWorker.postMessage({
                                id: data.id,
                                skinId: data.skinId,
                                message: 'chukuangStart',
                                action: data.action,
                                me: me,
                                direction: me ? false : skinSwitch.getDirection(player),
                                player: pp,
                            })
                            // 标记为出框状态
                            player.chukuangState = {
                                status: true,
                                action: data.action
                            }

                            if (data.action === 'GongJi' || data.action === 'TeShu') {
                                // 音效默认寻找与待机动作同名的音效
                                let playName = avatar.player.name
                                // 暂时不区分不同出框攻击的音效.
                                // 开始播放音效, 音效名等同
                                // 优先播放十周年同名文件夹下同名的音效文件
                                let path = 'extension/十周年UI/assets/dynamic/' + playName + '.mp3'
                                skinSwitch.qhly_checkFileExist(path, exists => {
                                    if (exists) {
                                        game.playAudio("..", path)
                                    } else {
                                        game.playAudio("..", "extension", "皮肤切换/audio/effect", playName + ".mp3")
                                    }
                                })
                            }
                            if (data.action === 'GongJi') {
                                // 音效默认寻找与待机动作同名的音效
                                let playName = avatar.player.name
                                // 暂时不区分不同出框攻击的音效.
                                // 开始播放音效, 音效名等同
                                // 优先播放十周年同名文件夹下同名的音效文件
                                let path = 'extension/十周年UI/assets/dynamic/' + playName + '_1.mp3'
                                skinSwitch.qhly_checkFileExist(path, exists => {
                                    if (exists) {
                                        game.playAudio("..", path)
                                    } else {
                                        game.playAudio("..", "extension", "皮肤切换/audio/effect", playName + "_1.mp3")
                                    }
                                })
                            }
                            if (data.action === 'TeShu') {
                                // 音效默认寻找与待机动作同名的音效
                                let playName = avatar.player.name
                                // 暂时不区分不同出框攻击的音效.
                                // 开始播放音效, 音效名等同
                                // 优先播放十周年同名文件夹下同名的音效文件
                                let path = 'extension/十周年UI/assets/dynamic/' + playName + '_2.mp3'
                                skinSwitch.qhly_checkFileExist(path, exists => {
                                    if (exists) {
                                        game.playAudio("..", path)
                                    } else {
                                        game.playAudio("..", "extension", "皮肤切换/audio/effect", playName + "_2.mp3")
                                    }
                                })
                            }

                        })

                    },
                    recoverDaiJi: function (data) {
                        let player = this.getPlayerById(data.id, data.qhlxBigAvatar)
                        if (!player || !player.dynamic) return
                        let dynamic = player.dynamic
                        player.chukuangState = {
                            status: false,
                        }
                        if (!dynamic.primary && !dynamic.deputy) {
                            return
                        }
                        player.dynamic.renderer.postMessage({
                            message: 'recoverDaiJi',
                            id: data.id,
                            skinId: data.skinId,
                        })
                        player.GongJi = false
                    },
                    // 当没有出框的做法
                    noActionChuKuang: function (data) {
                        // 请求动皮worker查看是否有未出框的动作
                        let player = this.getPlayerById(data.id, data.qhlxBigAvatar)
                        if (!player || !player.dynamic) return
                        let dynamic = player.dynamic
                        if (!dynamic.primary && !dynamic.deputy) {
                            return
                        }
                        if (data.action === 'GongJi') {
                            // 如果参数直接指明包含不出框的话, 那么直接请求待机worker
                            if (dynamic.primary) {
                                let playerP = dynamic.primary.player;
                                if (playerP.gongji && playerP.gongji.ck === false) {
                                    return skinSwitch.postMsgApi.action(player, playerP.gongji.action, dynamic.primary)
                                }
                            }
                            if (dynamic.deputy) {
                                let playerP = dynamic.deputy.player
                                if (playerP.gongji && playerP.gongji.ck === false) {
                                    return skinSwitch.postMsgApi.action(player, playerP.gongji.action, dynamic.deputy)
                                }
                            }
                        }
                        if (data.action === 'TeShu') {
                            skinSwitch.postMsgApi.actionTeShu(player)
                        }
                    },
                    debugChuKuang: function (data) {
                        let player = this.getPlayerById(data.id, data.qhlxBigAvatar)
                        if (!player || !player.dynamic) return
                        let dynamic = player.dynamic
                        let avatar = data.isPrimary ? dynamic.primary : dynamic.deputy
                        if (!avatar) {
                            return
                        }
                        player.dynamic.renderer.postMessage({
                            message: 'hideAllNode',
                            id: dynamic.id,
                        })
                        // 将原来的置空
                        skinSwitch.rendererOnMessage.addListener(player, 'hideAllNodeEnd', function () { })
                    }

                },
                chukuangWorkerOnMessage2: {
                    init: function () {
                        skinSwitch.chukuangWorker2.onmessage = e => {
                            let data = e.data
                            switch (data.message) {
                                case "chukuangPrepare":
                                    this.chukuangStart(data)
                                    break
                                case "recoverDaiJi":
                                    this.recoverDaiJi(data)
                                    break
                                case 'noActionChuKuang':
                                    this.noActionChuKuang(data)
                                    break
                            }
                        }
                    },
                    getPlayerById: function (id, isQhlx) {
                        for (let p of game.players) {
                            if (p.dynamic && p.dynamic.id === id) {
                                return p
                            }
                        }
                       
                        let p = document.getElementById('mainView')
                      
                        if (p) {
                            let _canvas = p.getElementsByClassName('animation-player')
                            if (_canvas.length) {
                                return _canvas[0].parentNode.parentNode
                            }

                        }
                      
                        return null
                    },
                    chukuangStart: function (data) {
                        let player = this.getPlayerById(data.id, data.qhlxBigAvatar)
                        if (!player || !player.dynamic) return
                        let dynamic = player.dynamic
                        let avatar = data.isPrimary ? dynamic.primary : dynamic.deputy
                        if (!avatar) {
                            return
                        }
                        if (_status.currentPhase !== player && data.action === 'TeShu' && !avatar.player.shizhounian) {
                            return
                        }
                        player.dynamic.renderer.postMessage({
                            message: 'hideAllNode',
                            id: dynamic.id,
                            isPrimary: data.isPrimary,
                            skinId: data.skinId
                        })
                        skinSwitch.rendererOnMessage.addListener(player, 'hideAllNodeEnd', function () {
                            let pp = skinSwitch.getCoordinate(player, true)
                            let me = player === game.me
                            skinSwitch.chukuangWorker2.postMessage({
                                id: data.id,
                                skinId: data.skinId,
                                message: 'chukuangStart',
                                action: data.action,
                                me: me,
                                direction: me ? false : skinSwitch.getDirection(player),
                                player: pp,
                            })
                          
                            player.chukuangState2 = {
                                status: true,
                                action: data.action
                            }

                            if (data.action === 'GongJi' || data.action === 'TeShu') {
                                
                                let playName = avatar.player.name
                                let path = 'extension/十周年UI/assets/dynamic/' + playName + '.mp3'
                                skinSwitch.qhly_checkFileExist(path, exists => {
                                    if (exists) {
                                        game.playAudio("..", path)
                                    } else {
                                        game.playAudio("..", "extension", "皮肤切换/audio/effect", playName + ".mp3")
                                    }
                                })
                            }
                            if (data.action === 'GongJi') {
                               
                                let playName = avatar.player.name
                                
                                let path = 'extension/十周年UI/assets/dynamic/' + playName + '_1.mp3'
                                skinSwitch.qhly_checkFileExist(path, exists => {
                                    if (exists) {
                                        game.playAudio("..", path)
                                    } else {
                                        game.playAudio("..", "extension", "皮肤切换/audio/effect", playName + "_1.mp3")
                                    }
                                })
                            }
                            if (data.action === 'TeShu') {
                                let playName = avatar.player.name
                                let path = 'extension/十周年UI/assets/dynamic/' + playName + '_2.mp3'
                                skinSwitch.qhly_checkFileExist(path, exists => {
                                    if (exists) {
                                        game.playAudio("..", path)
                                    } else {
                                        game.playAudio("..", "extension", "皮肤切换/audio/effect", playName + "_2.mp3")
                                    }
                                })
                            }

                        })

                    },
                    recoverDaiJi: function (data) {
                        let player = this.getPlayerById(data.id, data.qhlxBigAvatar)
                        if (!player || !player.dynamic) return
                        let dynamic = player.dynamic
                        player.chukuangState2 = {
                            status: false,
                        }
                        if (!dynamic.primary && !dynamic.deputy) {
                            return
                        }
                        player.dynamic.renderer.postMessage({
                            message: 'recoverDaiJi',
                            id: data.id,
                            skinId: data.skinId,
                        })
                        player.GongJi2 = false
                    },
                    // 当没有出框的做法
                    noActionChuKuang: function (data) {
                        // 请求动皮worker查看是否有未出框的动作
                        let player = this.getPlayerById(data.id, data.qhlxBigAvatar)
                        if (!player || !player.dynamic) return
                        let dynamic = player.dynamic
                        if (!dynamic.primary && !dynamic.deputy) {
                            return
                        }
                        if (data.action === 'GongJi') {
                            // 如果参数直接指明包含不出框的话, 那么直接请求待机worker
                            if (dynamic.primary) {
                                let playerP = dynamic.primary.player;
                                if (playerP.gongji && playerP.gongji.ck === false) {
                                    return skinSwitch.postMsgApi.action(player, playerP.gongji.action, dynamic.primary)
                                }
                            }
                            if (dynamic.deputy) {
                                let playerP = dynamic.deputy.player
                                if (playerP.gongji && playerP.gongji.ck === false) {
                                    return skinSwitch.postMsgApi.action(player, playerP.gongji.action, dynamic.deputy)
                                }
                            }
                        }
                        if (data.action === 'TeShu') {
                            skinSwitch.postMsgApi.actionTeShu(player)
                        }
                    },
                    debugChuKuang: function (data) {
                        let player = this.getPlayerById(data.id, data.qhlxBigAvatar)
                        if (!player || !player.dynamic) return
                        let dynamic = player.dynamic
                        let avatar = data.isPrimary ? dynamic.primary : dynamic.deputy
                        if (!avatar) {
                            return
                        }
                        player.dynamic.renderer.postMessage({
                            message: 'hideAllNode',
                            id: dynamic.id,
                        })
                        // 将原来的置空
                        skinSwitch.rendererOnMessage.addListener(player, 'hideAllNodeEnd', function () { })
                    }

                },
                chukuangWorker: null,  // 管理出框的worker
                chukuangWorker2: null,  // 管理出框的worker2 (z-index: 4)
                chukuangWorkerInit: function () {
                    if (!skinSwitch.chukuangWorker) {
                        skinSwitch.chukuangWorker = new Worker(skinSwitch.url + 'chukuangWorker.js')
                        skinSwitch.chukuangWorkerApi.create()
                        skinSwitch.chukuangWorkerOnMessage.init()
                    }
                },
                chukuangWorkerInit2: function () {
                    if (!skinSwitch.chukuangWorker2) {
                        skinSwitch.chukuangWorker2 = new Worker(skinSwitch.url + 'chukuangWorker.js')
                        skinSwitch.chukuangWorkerApi.create2()
                        skinSwitch.chukuangWorkerOnMessage2.init()
                    }
                },
                cleanupAfterStopDynamic: function (player, primary, deputy) {
                    // 清除某个角色的语音映射
                    let clearAudioMap = (name) => {
                        if (skinSwitch.avatarAudioSkinMap) {
                            let avatarKeys = skinSwitch.avatarAudioSkinMap[name]
                            if (avatarKeys) {
                                for (let key in avatarKeys) {
                                    delete skinSwitch.audioMap[key]
                                }
                                delete skinSwitch.avatarAudioSkinMap[name]
                            }
                            console.log('skinSwitch.audioMap', skinSwitch.audioMap, 'skinSwitch.avatarAudioSkinMap', skinSwitch.avatarAudioSkinMap)
                        }
                    }
                    if (primary && player.name1) {
                        clearAudioMap(player.name1)
                    }
                    if (deputy && player.name2) {
                        clearAudioMap(player.name2)
                    }
                },

                // 强制重新加载角色皮肤的语音 - 用于解决觉醒掉血技能切换皮肤后语音不更新的问题
                reloadAudioForSkin: function (player, isPrimary, audioConfig) {
                    // 确保player和dynamic还存在
                    if (!player || !player.isAlive() || !player.dynamic) {
                        return;
                    }

                    // 获取当前角色名称和ID
                    let name = isPrimary ? player.name1 : player.name2;
                    if (!name) return;

                    let id = player.dynamic.id;
                    let skinId = isPrimary ?
                        (player.dynamic.primary ? player.dynamic.primary.id : null) :
                        (player.dynamic.deputy ? player.dynamic.deputy.id : null);

                    if (!skinId) return;

                    console.log('开始重新加载语音:', name, id, skinId, '当前位置:', isPrimary ? '主将' : '副将');

                    // 更彻底地清除语音映射 - 清除所有相关的key
                    this.clearAllAudioMappings(name, id, skinId);



                    // 重新初始化语音系统
                    if (!audioConfig) {
                        console.warn('觉醒切换皮肤 - 无法获取音频配置，跳过语音重新加载');
                        return;
                    }

                    let skillPath = audioConfig.skill;
                    let cardPath = audioConfig.card;
                    if (!skillPath && !cardPath) return;

                    let rootPath = skinSwitch.dcdPath + '/assets/dynamic/';



                    // 重新创建语音映射
                    if (!skinSwitch.audioMap) {
                        skinSwitch.audioMap = {};
                    }
                    if (!skinSwitch.avatarAudioSkinMap) {
                        skinSwitch.avatarAudioSkinMap = {};
                    }
                    skinSwitch.avatarAudioSkinMap[name] = {};

                    // 处理文件扩展名的辅助函数
                    let qhly_earse_ext = function (path) {
                        let foundDot = path.lastIndexOf('.');
                        if (foundDot < 0) return path;
                        return path.slice(0, foundDot);
                    };

                    // 强制重建语音映射
                    console.log('开始重建语音映射...');
                    this.rebuildAudioMappings(name, id, skinId, skillPath, cardPath, rootPath, qhly_earse_ext);

                    // 确保音频系统初始化
                    this.ensureAudioSystemInitialized(id, skinId);

                    console.log('已重新初始化语音系统', name, id, skinId);
                },

                // 新增：更彻底地清除所有相关的语音映射
                clearAllAudioMappings: function (name, id, skinId) {
                    console.log('清除所有语音映射:', name, id, skinId);

                    // 清除avatarAudioSkinMap中的映射
                    if (skinSwitch.avatarAudioSkinMap && skinSwitch.avatarAudioSkinMap[name]) {
                        for (let key in skinSwitch.avatarAudioSkinMap[name]) {
                            delete skinSwitch.audioMap[key];
                        }
                        delete skinSwitch.avatarAudioSkinMap[name];
                    }

                    // 清除所有可能的语音key模式
                    const keysToRemove = [];
                    for (let key in skinSwitch.audioMap) {
                        // 清除以下模式的key:
                        // - skill/技能名
                        // - die/角色名 
                        // - card/id/skinId/卡牌名
                        // - effect/id/skinId/victory
                        if (key.startsWith('skill/') ||
                            key.startsWith('die/' + name) ||
                            key.includes('/' + id + '/' + skinId + '/') ||
                            key.includes('/effect/' + id + '/' + skinId)) {
                            keysToRemove.push(key);
                        }
                    }

                    // 删除找到的所有相关key
                    keysToRemove.forEach(key => {
                        console.log('删除旧语音映射:', key);
                        delete skinSwitch.audioMap[key];
                    });

                    console.log('清除了', keysToRemove.length, '个旧的语音映射');
                },

                // 新增：强制重建语音映射
                rebuildAudioMappings: function (name, id, skinId, skillPath, cardPath, rootPath, qhly_earse_ext) {
                    console.log('重建语音映射:', { name, id, skinId, skillPath, cardPath, rootPath });

                    // 确保映射表存在
                    if (!skinSwitch.audioMap) {
                        skinSwitch.audioMap = {};
                    }
                    if (!skinSwitch.avatarAudioSkinMap) {
                        skinSwitch.avatarAudioSkinMap = {};
                    }
                    if (!skinSwitch.avatarAudioSkinMap[name]) {
                        skinSwitch.avatarAudioSkinMap[name] = {};
                    }

                    // 立即添加标记，表示这个角色正在使用新的语音映射
                    skinSwitch.avatarAudioSkinMap[name]['_rebuilding'] = true;

                    // 重建技能语音映射
                    if (skillPath) {
                        this.buildSkillAudioMapping(name, id, skinId, skillPath, rootPath, qhly_earse_ext);
                    }

                    // 重建卡牌语音映射
                    if (cardPath) {
                        this.buildCardAudioMapping(name, id, skinId, cardPath, rootPath, qhly_earse_ext);
                    }

                    // 强制刷新语音系统缓存
                    setTimeout(() => {
                        this.refreshAudioSystemCache(name, id, skinId);
                    }, 100);
                },

                // 新增：构建技能语音映射
                buildSkillAudioMapping: function (name, id, skinId, skillPath, rootPath, qhly_earse_ext) {
                    let skillRootPath = rootPath;

                    let path = skillRootPath + skillPath;
                    console.log('构建技能语音映射:', path);

                    // 使用安全的文件列表获取
                    this.safeGetFileList(path, (folds, files) => {
                        let mappingCount = 0;
                        for (let file of files) {
                            file = qhly_earse_ext(file);
                            let key;
                            let audioPath = '../' + path + '/' + file;

                            if (file === name) {
                                key = 'die/' + file;
                            } else if (file === 'victory' || file === 'win') {
                                key = 'effect/' + id + '/' + skinId + '/' + 'victory';
                            } else {
                                key = 'skill/' + file;
                            }

                            // 强制覆盖旧的映射
                            skinSwitch.audioMap[key] = audioPath;
                            skinSwitch.avatarAudioSkinMap[name][key] = audioPath;
                            mappingCount++;

                            console.log('添加技能语音映射:', key, '->', audioPath);
                        }
                        console.log('技能语音映射构建完成，共', mappingCount, '个文件');
                    }, (error) => {
                        console.warn('技能语音目录访问失败:', skillPath, error);
                    });
                },

                // 新增：构建卡牌语音映射
                buildCardAudioMapping: function (name, id, skinId, cardPath, rootPath, qhly_earse_ext) {
                    let cardRootPath = rootPath;

                    let path = cardRootPath + cardPath;
                    console.log('构建卡牌语音映射:', path);

                    // 使用安全的文件列表获取
                    this.safeGetFileList(path, (folds, files) => {
                        let mappingCount = 0;
                        for (let file of files) {
                            file = qhly_earse_ext(file);
                            let key = 'card/' + id + '/' + skinId + '/' + file;
                            let audioPath = '../' + path + '/' + file;

                            // 强制覆盖旧的映射
                            skinSwitch.audioMap[key] = audioPath;
                            skinSwitch.avatarAudioSkinMap[name][key] = audioPath;
                            mappingCount++;

                            console.log('添加卡牌语音映射:', key, '->', audioPath);
                        }
                        console.log('卡牌语音映射构建完成，共', mappingCount, '个文件');
                    }, (error) => {
                        console.warn('卡牌语音目录访问失败:', cardPath, error);
                    });
                },

                // 新增：刷新语音系统缓存
                refreshAudioSystemCache: function (name, id, skinId) {
                    console.log('刷新语音系统缓存:', name, id, skinId);

                    // 标记重建完成
                    if (skinSwitch.avatarAudioSkinMap && skinSwitch.avatarAudioSkinMap[name]) {
                        delete skinSwitch.avatarAudioSkinMap[name]['_rebuilding'];
                        skinSwitch.avatarAudioSkinMap[name]['_lastRefresh'] = Date.now();
                    }

                    // 输出当前的语音映射状态
                    console.log('当前语音映射状态:', {
                        audioMapSize: Object.keys(skinSwitch.audioMap).length,
                        characterMappings: skinSwitch.avatarAudioSkinMap[name] ? Object.keys(skinSwitch.avatarAudioSkinMap[name]).length : 0
                    });

                    // 强制触发一次音频系统重新初始化
                    if (skinSwitch.pfqh_originPlayAudio && skinSwitch.qfqh_originPlaySkillAudio) {
                        console.log('语音系统已重新初始化，新的语音映射生效');
                    }
                },

                // 安全的getFileList函数，在目录不存在时不会抛出错误
                safeGetFileList: function (path, callback, errorCallback) {
                    try {
                        game.getFileList(path, function (folds, files) {
                            if (files && files.length > 0) {
                                console.log('成功读取语音目录:', path, files.length + '个文件');
                                if (callback) callback(folds, files);
                            } else {
                                console.warn('语音目录为空:', path);
                                if (errorCallback) errorCallback('目录为空');
                            }
                        });
                    } catch (e) {
                        console.warn('语音目录访问失败:', path, e.message);
                        if (errorCallback) errorCallback(e);
                    }
                },

                // 加载语音文件
                loadAudioFiles: function (name, id, skinId, skillPath, cardPath, rootPath, qhly_earse_ext) {

                    // 更新技能语音
                    if (skillPath) {
                        let skillRootPath = rootPath;

                        let path = skillRootPath + skillPath;
                        this.safeGetFileList(path, function (folds, files) {
                            for (let file of files) {
                                file = qhly_earse_ext(file);
                                let key;
                                if (file === name) {
                                    key = 'die/' + file;
                                    skinSwitch.audioMap[key] = '../' + path + '/' + file;
                                } else if (file === 'victory' || file === 'win') {
                                    key = 'effect/' + id + '/' + skinId + '/' + 'victory';
                                    skinSwitch.audioMap[key] = '../' + path + '/' + file;
                                } else {
                                    key = 'skill/' + file;
                                    skinSwitch.audioMap[key] = '../' + path + '/' + file;
                                }
                                if (skinSwitch.avatarAudioSkinMap[name]) {
                                    skinSwitch.avatarAudioSkinMap[name][key] = null;
                                }
                            }
                            console.log('重新加载语音完成 - 技能语音', name, id, skinId, skillPath);
                        }, function (error) {
                            console.warn('技能语音目录访问失败:', skillPath, error);
                        });
                    }

                    // 更新卡牌语音
                    if (cardPath) {
                        let cardRootPath = rootPath;

                        let path = cardRootPath + cardPath;
                        this.safeGetFileList(path, function (folds, files) {
                            for (let file of files) {
                                // 储存技能映射
                                file = qhly_earse_ext(file);
                                // 储存动皮相关的id和角色名字
                                let id = player.dynamic.id
                                let skinId = isPrimary ? player.dynamic.primary.id : player.dynamic.deputy.id
                                let key = 'card/' + id + '/' + skinId + '/' + file
                                skinSwitch.audioMap[key] = '../' + path + '/' + file
                                skinSwitch.avatarAudioSkinMap[name][key] = null
                            }
                            console.log('重新加载语音完成 - 卡牌语音', name, id, skinId, cardPath);
                        }, function (error) {
                            console.warn('卡牌语音目录访问失败:', cardPath, error);
                        });
                    }
                },

                // 确保音频系统已初始化
                ensureAudioSystemInitialized: function (id, skinId) {
                    // 确保音频系统已经被初始化
                    if (!skinSwitch.pfqh_originPlayAudio) {
                        skinSwitch.pfqh_originPlayAudio = game.playAudio;
                        game.playAudio = function () {
                            let string = '';
                            let others = [];
                            for (let arg of arguments) {  //将参数拼接成一个字符串，方便查找映射
                                if (typeof arg == 'string' || typeof arg == 'number') {
                                    string = string + "/" + arg;
                                } else {
                                    others.push(arg);
                                }
                            }

                            let replaces = string.split('/');
                            let replace = '';

                            if (string.startsWith('/skill') && replaces.length === 3) {
                                replace = string.slice(1);
                            } else if (string.startsWith('/die') && replaces.length === 3) {
                                replace = string.slice(1);
                            } else if (string.startsWith('/effect/win')) {
                                replace = 'effect/' + id + '/' + skinId + '/' + 'victory';
                            }

                            if (replace.length) {
                                let rp = skinSwitch.audioMap[replace];
                                if (rp) {
                                    let args = rp.split("/");
                                    args.addArray(others);
                                    return skinSwitch.pfqh_originPlayAudio.apply(this, args);
                                }
                            }
                            return skinSwitch.pfqh_originPlayAudio.apply(this, arguments);
                        };
                    }

                    if (!skinSwitch.qfqh_originPlaySkillAudio) {
                        skinSwitch.qfqh_originPlaySkillAudio = game.playSkillAudio;
                        game.playSkillAudio = function (name, index) {
                            let replaceKey = "skill/" + name;
                            if (!index) {
                                index = Math.ceil(Math.random() * 2);
                            }
                            replaceKey = replaceKey + index;
                            let rp = skinSwitch.audioMap[replaceKey];
                            if (rp) {
                                let args = rp.split("/");
                                return skinSwitch.pfqh_originPlayAudio.apply(this, args);
                            }
                            return skinSwitch.qfqh_originPlaySkillAudio.apply(this, arguments);
                        };
                    }
                },
                chukuangPlayerInit: function (player, isPrimary, playParams) {
                    if (!player.dynamic) return

                    // 动皮播放开始播放骨骼.  虽然放在这里不是很合适. 为了减少其他扩展添加的扩展. todo, 后面更换
                    skinSwitch.rendererOnMessage.addListener(player, 'loadFinish', function (data) {
                        skinSwitch.postMsgApi.startPlay(player, data)
                    })


                    let isPlayer = get.itemtype(player) === 'player'

                    // 检查只有当前是player或者是千幻大屏预览才会进行初始化
                    if (!(isPlayer || [...player.classList].includes('qh-shousha-big-avatar') || player.getElementsByClassName('qhdynamic-decade-big-wrap').length || player.getElementsByClassName('qhdynamic-big-wrap').length)) {
                        return
                    }
                    if (!isPlayer) {
                        playParams.qhlxBigAvatar = true
                        // 标明当前的样式是十周年的还是手杀的.
                        playParams.isDecade = lib.config.qhly_currentViewSkin === 'decade'
                        playParams.divPos = skinSwitch.getCoordinate(player, true)
                    }
                    let _this = this
                    if (!this.transformInitTime) {
                        this.transformInitTime = new Date().getTime()
                    }
                    let initPlayerAudio = () => {
                        if (!player.dynamic) {
                            return
                        }
                        if (!player.dynamic.primary && !player.dynamic.deputy) {
                            return
                        }
                        let name = isPrimary ? player.name1 : player.name2
                        let id = player.dynamic.id
                        let skinId = isPrimary ? player.dynamic.primary.id : player.dynamic.deputy.id

                        // 检查是否需要强制更新音频
                        let forceUpdate = playParams._needUpdateAudio === true

                        // 如果强制更新，先清除现有映射
                        if (forceUpdate && skinSwitch.avatarAudioSkinMap && skinSwitch.avatarAudioSkinMap[name]) {
                            for (let key in skinSwitch.avatarAudioSkinMap[name]) {
                                delete skinSwitch.audioMap[key]
                                delete skinSwitch.avatarAudioSkinMap[name][key]
                            }
                        }

                        // 检查是否有配置动皮的专属语音, 懒加载替换playAudio语音, 如果有需要专门配置的语音, 那么进行替换
                        if (playParams.audio && isPlayer) {

                            let skillPath = playParams.audio.skill
                            let cardPath = playParams.audio.card
                            let rootPath = skinSwitch.dcdPath + '/assets/dynamic/'


                            if (!skinSwitch.audioMap) {
                                skinSwitch.audioMap = {}
                            }
                            if (!skinSwitch.avatarAudioSkinMap) {
                                skinSwitch.avatarAudioSkinMap = {}
                            }
                            skinSwitch.avatarAudioSkinMap[name] = {}
                            // 切换皮肤后需要删除原来的语音映射
                            //将某个文件路径抹除扩展名。如file.txt -> file
                            let qhly_earse_ext = function (path) {
                                let foundDot = path.lastIndexOf('.');
                                if (foundDot < 0) return path;
                                return path.slice(0, foundDot);
                            }
                            // 获取该文件夹下的所有技能和卡牌语音
                            if (skillPath) {
                                let path = rootPath + skillPath
                                game.getFileList(path, function (folds, files) {
                                    let name = isPrimary ? player.name1 : player.name2
                                    for (let file of files) {
                                        // 储存技能映射
                                        file = qhly_earse_ext(file);
                                        let key
                                        if (file === name) {
                                            key = 'die/' + file
                                            skinSwitch.audioMap[key] = '../' + path + '/' + file;
                                        } else if (file === 'victory' || file === 'win') {
                                            key = 'effect/' + id + '/' + skinId + '/' + 'victory'
                                            skinSwitch.audioMap[key] = '../' + path + '/' + file;
                                        } else {
                                            key = 'skill/' + file
                                            skinSwitch.audioMap[key] = '../' + path + '/' + file;
                                        }
                                        skinSwitch.avatarAudioSkinMap[name][key] = null
                                    }
                                })
                            }

                            if (cardPath) {
                                let cardRootPath = rootPath;
                                let path = cardRootPath + cardPath
                                game.getFileList(path, function (folds, files) {
                                    for (let file of files) {
                                        // 储存技能映射
                                        file = qhly_earse_ext(file);
                                        // 储存动皮相关的id和角色名字
                                        let id = player.dynamic.id
                                        let skinId = isPrimary ? player.dynamic.primary.id : player.dynamic.deputy.id
                                        let key = 'card/' + id + '/' + skinId + '/' + file
                                        skinSwitch.audioMap[key] = '../' + path + '/' + file
                                        skinSwitch.avatarAudioSkinMap[name][key] = null
                                    }
                                })
                            }

                            // 添加取消替换语音映射的回调函数.

                            if (!this._initAudio) {
                                // if (false) {
                                skinSwitch.pfqh_originPlayAudio = game.playAudio;
                                game.playAudio = function () {
                                    let string = '';
                                    let others = [];
                                    for (let arg of arguments) {  //将参数拼接成一个字符串，方便查找映射
                                        if (typeof arg == 'string' || typeof arg == 'number') {
                                            string = string + "/" + arg;
                                        } else {
                                            others.push(arg);
                                        }
                                    }
                                    let replaces = string.split('/')
                                    let replace = ''

                                    const cardEn2Cn = {
                                        bingliang: '兵粮寸断',
                                        guohe: '过河拆桥',
                                        huogong: '火攻',
                                        jiedao: '借刀杀人',
                                        jiu: '酒',
                                        juedou: '决斗',
                                        lebu: '乐不思蜀',
                                        nanman: '南蛮入侵',
                                        sha: '杀',
                                        tao: '桃',
                                        sha_fire: '火杀',
                                        sha_thunder: '雷杀',
                                        shan: '闪',
                                        shandian: '闪电',
                                        shunshou: '顺手牵羊',
                                        taoyuan: '桃园结义',
                                        tiesuo: '铁索连环',
                                        wanjian: '万箭齐发',
                                        wugu: '五谷丰登',
                                        wuxie: '无懈可击',
                                        wuzhong: '无中生有',
                                        yiyi: '以逸待劳',
                                        yuanjiao: '远交近攻',
                                        zhibi: '知彼知己',
                                        caomu: '草木皆兵',
                                        diaohulishan: '调虎离山',
                                        huoshaolianying: '火烧连营',
                                        chuqibuyi: '出其不意',
                                        shuiyanqijun: '水淹七军',
                                        binglinchengxiax: '兵临城下',
                                        lulitongxin: '戮力同心',
                                        lianjunshengyan: '联军盛宴',
                                        sha_ice: '冰杀',
                                        dongzhuxianji: '洞烛先机',
                                    }

                                    if (string.startsWith('/card') && replaces.length === 4) {
                                        let cardName = replaces[3]
                                        // 检索待播放队列是否进行替换
                                        if (skinSwitch.audioPlayQueue) {
                                            for (let i = 0; i < skinSwitch.audioPlayQueue.length; i++) {
                                                if (new Date().getTime() - skinSwitch.audioPlayQueue[i].time > 2000) {
                                                    // 删除超时未播放的或不存在的语音
                                                    skinSwitch.audioPlayQueue.splice(i, 1)
                                                    i--
                                                    continue
                                                }
                                                let au = skinSwitch.audioPlayQueue[i]
                                                if (au.card === cardName) {
                                                    replace = 'card/' + au.id + '/' + au.skinId + '/' + cardEn2Cn[cardName]
                                                    if (skinSwitch.audioMap[replace]) {
                                                        skinSwitch.audioPlayQueue.splice(i, 1)
                                                        break
                                                    } else {
                                                        replace = 'card/' + au.id + '/' + au.skinId + '/' + cardName
                                                        if (skinSwitch.audioMap[replace]) {
                                                            skinSwitch.audioPlayQueue.splice(i, 1)
                                                            break
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    } else if (string.startsWith('/skill') && replaces.length === 3) {
                                        replace = string.slice(1)
                                    } else if (string.startsWith('/die') && replaces.length === 3) {
                                        // 检索待播放队列是否进行替换
                                        replace = string.slice(1)
                                    } else if (string.startsWith('/effect/win')) {
                                        replace = 'effect/' + id + '/' + skinId + '/' + 'victory'
                                    }
                                    console.log('string...', string)
                                    if (replace.length) {
                                        let rp = skinSwitch.audioMap[replace];
                                        if (rp) {
                                            //如果存在映射，用映射的路径替换原有的路径，并调用原来的音频播放函数，以达到替换配音的效果。
                                            let args = rp.split("/");
                                            args.addArray(others);
                                            return skinSwitch.pfqh_originPlayAudio.apply(this, args);
                                        }
                                    }
                                    return skinSwitch.pfqh_originPlayAudio.apply(this, arguments);
                                };

                                skinSwitch.qfqh_originPlaySkillAudio = game.playSkillAudio
                                game.playSkillAudio = function (name, index) {
                                    let replaceKey = "skill/" + name;
                                    if (!index) {
                                        index = Math.ceil(Math.random() * 2);
                                    }
                                    replaceKey = replaceKey + index;
                                    let rp = skinSwitch.audioMap[replaceKey]
                                    if (rp) {
                                        let args = rp.split("/");
                                        return skinSwitch.pfqh_originPlayAudio.apply(this, args);
                                    }
                                    return skinSwitch.qfqh_originPlaySkillAudio.apply(this, arguments);
                                };

                                this._initAudio = true
                            }

                        }

                        // 检查一下是否有变身的骨骼, 提前加载, 防止突然更换卡顿现象
                        if (isPlayer && playParams.special && playParams.special.condition) {
                            let dskins = decadeUI.dynamicSkin
                            let newSkelLike = []
                            let newTransformEffects = []
                            let getNewSkel = (transform) => {
                                let trans = playParams.special[transform]
                                // 播放转换的骨骼
                                let newName = trans.name
                                if (newName && newName !== playParams.name) {
                                    // 分割名字, 获取骨骼, 与当前角色的骨骼的名字比较,是否是同名
                                    let [key, skinName] = newName.split('/')
                                    let dInfo = key && skinName && dskins[key] && dskins[key][skinName]
                                    if (dInfo) {
                                        newSkelLike.push(dInfo)
                                        let huanfuEff = {
                                            name: '../../../皮肤切换/effects/transform/default',
                                            scale: 0.7,
                                            speed: 0.6,
                                            delay: 0.1, // 默认设置的延迟是0.2秒
                                        }
                                        let huanfuEffect = trans.effect
                                        const changeEffects = skinSwitch.effects.transformEffects
                                        if (huanfuEffect) {
                                            if (typeof huanfuEffect === 'string') {
                                                if (huanfuEffect in changeEffects) {
                                                    huanfuEffect = changeEffects[huanfuEffect]
                                                } else {
                                                    huanfuEffect = { name: huanfuEffect };
                                                }
                                            }
                                            huanfuEff = Object.assign(huanfuEff, huanfuEffect)
                                            huanfuEff.name = '../../../皮肤切换/effects/transform/' + huanfuEffect.name

                                            newTransformEffects.push(huanfuEff)
                                        }
                                    }

                                }
                            }

                            for (let cond of Object.values(playParams.special.condition)) {
                                let transform = cond.transform
                                if (typeof transform === 'string') {
                                    getNewSkel(transform)
                                } else if (Array.isArray(transform)) {
                                    for (let t of transform) {
                                        getNewSkel(t)
                                    }
                                }

                            }
                            let basic = 6000
                            if (new Date().getTime() - _this.transformInitTime < 2000) {
                                _this.transformInitTime = _this.transformInitTime + 2000
                                basic = 6000 + _this.transformInitTime - new Date().getTime()
                            } else {
                                _this.transformInitTime = new Date().getTime()
                            }
                            setTimeout(() => {
                                if (newSkelLike.length) {
                                    skinSwitch.chukuangWorkerApi.loadResources(newSkelLike, newTransformEffects)
                                    // 传递到worker进行预加载
                                    player.dynamic.renderer.postMessage({
                                        message: 'LOAD_RESOURCES',
                                        id: player.dynamic.id,
                                        players: newSkelLike,
                                    })
                                }
                            }, basic)
                        }
                    }
                    // 更换皮肤后, 删除原来保存的原始动皮参数
                    if (isPlayer && player.originSkin && !playParams._transform) {
                        delete player.originSkin
                    }
                    if (isPlayer) {
                        let key = isPrimary ? 'damagePrimaryTransform' : 'damageDeputyTransform'
                        if (player[key]) delete player[key]
                    }
                    if (!isPlayer && player.originSkin2 && !playParams._transform) {
                        delete player.originSkin2;
                    }
                    // 检查参数同目录下是否包含静态皮肤, 如果包含的话, 同时给角色设置静皮为对应的皮肤
                    let checkChangeSkin = () => {
                        let skinPath = playParams.name
                        let lastIdx = skinPath.lastIndexOf('/')
                        let foldPath
                        if (lastIdx === -1) {
                            foldPath = ''
                        } else {
                            foldPath = skinPath.slice(0, lastIdx)
                        }
                        let path = skinSwitch.dcdPath + '/assets/dynamic/' + foldPath + '/' + playParams.skinName + '.jpg'
                        // 如果该皮肤存在, 那么设置该皮肤为静态皮肤
                        skinSwitch.qhly_checkFileExist(path, exists => {
                            if (exists) {
                                let avatar = player.getElementsByClassName((isPrimary ? 'primary' : 'deputy') + '-avatar')
                                if (avatar.length) {
                                    avatar[0].style.backgroundImage = 'url("' + lib.assetURL + path + '")'
                                }
                            }
                        })
                    }
                    // 将替换皮肤增加到当前角色的inits里面
                    if (isPlayer) {
                        if (!player._inits) {
                            player._inits = []
                        }
                        // 查看角色初始化, 发现有预留这个钩子函数等待角色初始化好毕完毕 做一些额外的初始化操作
                        player._inits.push(function () {
                            checkChangeSkin()
                            initPlayerAudio()
                        })
                    }
                    if (isPlayer && player.name1) {
                        initPlayerAudio()
                        checkChangeSkin()

                        // 检查是否需要强制重新加载语音（觉醒掉血技能专用）
                        if (playParams._needUpdateAudio) {
                            setTimeout(() => {
                                skinSwitch.reloadAudioForSkin(player, isPrimary, playParams.audio);
                            }, 500);
                        }
                    }

                    skinSwitch.chukuangWorkerInit()
                    if (!isPrimary && player.dynamic.deputy) {
                        skinSwitch.chukuangWorkerApi.preLoad(player.dynamic.id, player.dynamic.deputy.id, playParams)
                    }
                    else if (isPrimary && player.dynamic.primary) {
                        skinSwitch.chukuangWorkerApi.preLoad(player.dynamic.id, player.dynamic.primary.id, playParams)
                    }
                },

                // 特殊特效预定义的
                effects: {
                    transformEffects: {
                        default: {
                            scale: 0.7,
                            speed: 0.6,
                            delay: 0.1, // 默认设置的延迟是0.1秒
                        },
                        posui: {
                            scale: 0.6,
                            speed: 1,
                            name: 'posui',
                            json: true,
                            delay: 0.5, // 控制多少秒后开始播放骨骼动画
                        },
                        jinka: {
                            scale: 0.6,
                            speed: 1,
                            name: 'jinka',
                            json: true,
                            delay: 0.5, // 控制多少秒后开始播放骨骼动画
                        },
                        qiancheng: {
                            scale: 0.6,
                            speed: 1,
                            name: 'qiancheng',
                            json: true,
                            delay: 0.5, // 控制多少秒后开始播放骨骼动画
                        },
                        shaohui: {
                            scale: 0.6,
                            speed: 1,
                            x: [0, 0.6],
                            y: [0, 0.5],
                            name: 'shaohui',
                            json: true,
                            delay: 0.5, // 控制多少秒后开始播放骨骼动画
                        },
                    }
                },
                previewDynamic: function () {

                    let background = ui.create.div('.pfqh-preview-background', ui.window);

                    let previewWindow = ui.create.div('.previewWindow', background)
                    previewWindow.id = 'previewWindowDiv'
                    previewWindow.style = `background: rgb(60,60,60);z-index: 3000;position: fixed; width: 100%; height: 100%;`
                    previewWindow.innerHTML = `
                    <style>
                        a,a:link,a:visited,a:hover,a:active{
                            text-decoration: none;
                            color:inherit;
                        }
                        #preview-canvas { position: absolute; width: 100% ;height: 100%; }
                        #previewSpineDom span {display: inline-block; margin-left: 20px}
                        input[type='range'] {
                        -webkit-appearance: none;
                        width: 180px;
                        border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
                      }
                      input[type='range']::-webkit-slider-thumb {
                        -webkit-appearance: none;
                      }
                      input[type='range']::-webkit-slider-runnable-track {
                        height: 8px;
                        border-radius: 10px; /*将轨道设为圆角的*/
                        background-color: #d6a63c;
                      }
                      input[type='range']:focus {
                        outline: none;
                      }
                
                      input[type='range']::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        height: 24px;
                        width: 24px;
                        margin-top: -8px; /*使滑块超出轨道部分的偏移量相等*/
                        background: #ffffff;
                        border-radius: 50%;
                        cursor: pointer;
                      }
                
                      input[type='range']:focus::-webkit-slider-thumb {
                        background: #d6a63c;
                        /* background-image: url('https://p3-passport.byteacctimg.com/img/user-avatar/fc8114566fc29a28d2d49e1964872775~300x300.image'),
                          -webkit-gradient(linear, left top, left bottom, color-stop(0, #fefefe), color-stop(0.49, #dddddd), color-stop(0.51, #d1d1d1), color-stop(1, #a1a1a1));
                        background-size: 20px;
                        background-repeat: no-repeat;
                        background-position: 50%; */
                        box-shadow: 0 0 0 3px #fff, 0 0 0 6px #d6a63c;
                      }
                
                      input[type='range']::-webkit-slider-thumb:hover {
                        background: #d6a63c;
                      }
                      input[type='range']:active::-webkit-slider-thumb {
                        background: #d6a63c;
                      }
                      
                       #previewSpineDom select{
                        margin-bottom: 8px;
                      }
                      
                      #previewSpineDom select{
                        height: 26px;
                      }
                      
                      .closeBtn {
                        border-radius: 3px;
                        color: white;
                        margin: 0;
                        line-height: 1;
                        padding: 0 14px;
                        height: 34px;
                        border: none;
                        display: inline-flex;
                        flex-wrap: nowrap;
                        flex-shrink: 0;
                        align-items: center;
                        justify-content: center;
                        user-select: none;
                        text-align: center;
                        cursor: pointer;
                        text-decoration: none;
                        white-space: nowrap;
                        background-color: #18a058;  
                      }
                    
                    .wp-s-core-pan__body-detail, .wp-s-core-pan__body-detail div {
                        position: relative;
                        width: 100%;
                        
                    }
                    
                    /* 弹出的框的大小*/
                    .wp-s-core-pan__body-detail {
                        /*width: 296px;*/
                        /*height: 400px;*/
                        /*border-left: 1px solid #f0f0f0;*/
                    }
                    .wp-s-core-pan__detail-slot {
                        width: 100%;
                        height: 100%;
                    }
            
                    /*.nd-detail{*/
                    /*    display: inline-block;*/
                    /*    position: relative;*/
                    /*    padding: 24px;*/
                    /*    font-size: 12px;*/
                    /*    overflow: auto;*/
                    /*}*/
                    .nd-new-main-list__detail {
                        height: 100%;
                        width: 100%;
                        padding-top: 0!important;
                        padding-right: 0!important;
                    }
                    .nd-new-main-list__detail {
                        min-height: 356px;
                    }
            
                    .nd-new-main-list__detail .nd-detail-filelist__title, .nd-new-main-list__detail .nd-detail__title {
                        height: 40px;
                        line-height: 40px;
                        padding-bottom: 0;
                    }
                    .nd-detail-filelist__title {
                        /*margin-bottom: #f1f2f4;*/
                        padding-bottom: 15px;
                        font-weight: 600;
                        /*color: #03081a;*/
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-pack: justify;
                        -ms-flex-pack: justify;
                        justify-content: space-between;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                    }
            
                    .nd-detail-filelist__name{
                        padding: 12px 0;
                        border-bottom: 1px solid #f1f2f4;
                        font-size: 14px;
                        /*color: #454d5a;*/
                        font-weight: 600;
                        word-break: break-all;
                    }
                    
                    .nd-detail-filename:hover {
                        background-color: #847a93;
                        cursor: pointer;
                    }
                    
                    .previewSelect {
                        background-color: #847a93;
                    }
            
                    .nd-detail-filelist__put-away-btn {
                        color: #818999;
                        cursor: pointer;
                        font-weight: 400;
                    }
            
                    .nd-detail-filelist__put-away-btn .u-uicon{
                        margin-right: 4px;
                        position: relative;
                        top: -1px;
                    }
            
                    [class*=" u-icon-"], [class^=u-icon-] {
                        font-family: union-design-icons!important;
                        speak: none;
                        font-style: normal;
                        font-weight: 400;
                        font-variant: normal;
                        text-transform: none;
                        line-height: 1;
                        vertical-align: baseline;
                        display: inline-block;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                    .nd-detail-filelist__name .u-file-icon--list {
                        width: 32px;
                        height: 32px;
                        -o-object-fit: contain;
                        object-fit: contain;
                        margin-right: 8px;
                    }
                    .u-file-icon.u-file-icon--list {
                        width: 40px;
                        height: 40px;
                    }
                    .u-file-icon {
                        display: inline-block;
                        vertical-align: middle;
                    }
            
                    .nd-detail-filelist__list {
                        width: 100%;
                        /*min-height: 400px;*/
                        /*height: calc(100% - 140px);*/
                        border-radius: 13px;
                        position: relative;
                        margin-top: 14px;
                        padding: 0 12px;
                        overflow-y: auto;
                    }
                    .u-file-icon.u-file-icon--list {
                        width: 40px;
                        height: 40px;
                    }
                    .nd-detail-filelist__list .u-file-icon--list {
                        width: 24px;
                        height: 24px;
                    }
            
                    .u-file-icon {
                        display: inline-block;
                        vertical-align: middle;
                    }
            
                    .nd-detail-filename__title-text {
                        padding-left: 5px;
                        line-height: 40px;
                        max-width: calc(92%);
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                    .text-clip, .text-ellip, .text-ellipsis {
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .inline-block-v-middle {
                        display: inline-block;
                        vertical-align: middle;
                    }
                    .text-clip, .text-ellip, .text-ellipsis {
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .text-elip, .text-ellip {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .inline-block-v-middle {
                        display: inline-block;
                        vertical-align: middle;
                    }
            
                    .filesHeight::-webkit-scrollbar {
                        width: 10px;
                        height: 10px;
                        display: block;
                    }
            
                    .filesHeight::-webkit-scrollbar-track {
                        border-radius: 0;
                        background: none;
                    }
            
                    .filesHeight::-webkit-scrollbar-thumb {
                        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.2);
                        background: rgb(255 255 255 / 53%);
                    }
            
                    .filesHeight::-webkit-scrollbar-thumb:hover {
                        border-radius: 5px;
                        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.2);
                        background: rgb(255 200 0);;
                    }
                    
                    .aButton{
                        cursor: pointer;
                        text-align: center;
                        display: block;
                        text-decoration: none;
                        height: 30px;
                        line-height: 30px;
                    }
                    
                    /* 内容宽度*/ 
                    /* @media (max-height: 1200px) {*/
                    /*     .filesHeight {*/
                    /*        overflow-y: auto;*/
                    /*        height: 600px;*/
                    /*     }*/
                    /*}*/
                    
                    /* @media (max-height: 600px) {*/
                    /*    .filesHeight {*/
                    /*        overflow-y: auto;*/
                    /*        height: 320px;*/
                    /*    }*/
                    /*}*/
                    
                    
                    /*@media (max-height: 380px) {*/
                    /*    .filesHeight {*/
                    /*        overflow-y: auto;*/
                    /*        height: 260px;*/
                    /*    }*/
                    /*}*/
                    .filesHeight {
                            overflow-y: auto;
                            height: 60vh;
                            overflow-x: hidden;
                        }
                        
                    /* 模式预览样式开始 */
                    
                    .yk-preview {
                        position: relative;
                        width: 100%;
                        height: 100%;
                    }
                    
                    .yk-preview__container div{
                        position: relative;
                        display: block;                         
                    }
                    
                    .yk-preview__container {
                        position: relative;
                        height: calc(100% - 60px);
                        transition: width .5s;
                    }
                    
                    .yk-preview__container .yk-preview__closeBtn {
                        position: absolute;
                        z-index: 9999;
                        width: 50px;
                        height: 50px;
                        text-align: center;
                        line-height: 50px;
                        border-radius: 50%;
                        background-color: rgba(0, 0, 0, 0.8);
                        border: 2px solid #fff;
                        box-sizing: border-box;
                        top: 20px;
                        right: 20px;
                        color: #fff;
                        font-size: 20px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                    }
                    
                    .yk-preview__container .yk-preview__closeBtn:hover {
                        background-color: rgba(255, 0, 0, 0.8);
                        transform: scale(1.1);
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
                    }
                    
                    .yk-preview__container .yk-preview__list{
                        width: 100%;
                        height: 100%;
                    }
                    
                    .yk-preview__container .yk-preview__image {
                        display: flex;
                        align-items: center;
                        width: 100%;
                        height: 100%;
                        text-align: center;
                        position: absolute;
                    }
                    
                    .yk-preview__container .yk-preview__operate {
                        z-index: 2;
                        position: relative;
                    }
                    
                    .yk-preview__container .preview-operate {
                        width: 100%;
                        height: 60px;
                        bottom: 0;
                        background-color: rgba(0,0,0,.6);
                        color: #c9c9c9;
                        font-size: 14px;
                        transition: width .5s;
                    }
                    .yk-preview__container .add-photo, .yk-preview__container .preview-operate {
                        position: fixed;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    
                    .yk-preview__container .preview-operate .image-detail:last-child {
                        margin-right: 0;
                    }
                    .yk-preview__container .preview-operate .image-delete, .yk-preview__container .preview-operate .image-detail {
                        cursor: pointer;
                    }
                    
                    .yk-preview__container .preview-operate .image-detail {
                        position: relative;
                        padding: 0 15px;
                    }
                    
                    .yk-preview__container .preview-operate .image-detail:last-child {
                        margin-right: 0;
                    }
                    .yk-preview__container .preview-operate .image-delete, .preview-operate .image-detail {
                        cursor: pointer;
                    }
                    .yk-preview__container .preview-operate .image-detail {
                        position: relative;
                        padding: 0 15px;
                    }
                    
                    .yk-preview__container .preview-operate .iconfont {
                        font-size: 28px;
                        width: 40px;
                        height: 40px;
                        vertical-align: middle;
                        display: inline-block;
                        line-height: 40px;
                        text-align: center;
                    }
                    
                    /* 底部关闭按钮特殊样式 */
                    #previewOperateClose .image-detail {
                        background-color: transparent;
                        border-radius: 0;
                        border: none;
                        transition: all 0.3s ease;
                    }
                    
                    #previewOperateClose .image-detail:hover {
                        background-color: transparent;
                        transform: scale(1.1);
                        box-shadow: none;
                    }
                    
                    #previewOperateClose .iconfont {
                        color: #ff4444;
                        font-weight: bold;
                    }
                    
                    .yk-preview__container .preview-operate .image-detail .intro {
                        border-radius: 6px;
                        width: 85px;
                        height: 50px;
                        top: -65px;
                        left: 50%;
                        transform: translate(-50%);
                        display: flex;
                        position: absolute;
                        font-family: PingFangSC-Medium;
                        font-size: 12px;
                        color: #fff;
                        letter-spacing: 0;
                        text-align: center;
                        white-space: nowrap;
                        background: #333;
                        box-shadow: 0 2px 8px 0 rgb(0 0 0 / 20%);
                        line-height: 17px;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                    }
                    
                    .yk-preview__container .preview-operate .image-detail .intro img {
                        position: absolute;
                        width: 15px;
                        height: 9px;
                        bottom: -8px;
                        left: 50%;
                        transform: translate(-50%);
                    }
                    .yk-preview .yk-preview__info {
                        position: fixed;
                        top: 0;
                        right: 0;
                        z-index: 3;
                        /*width: 312px;*/
                        width: 20%;
                        height: 100%;
                        padding: 24px 40px;
                        margin-bottom: 50px;
                        box-sizing: border-box;
                        background: #212221;
                        color: #fff;
                        font-weight: 700;
                        transition: right .5s;
                    }
                    
                    .yk-preview .yk-preview__info div {
                        display: block;
                        position: relative;
                    }
                    .yk-preview .yk-preview__info .title {
                        margin-bottom: 50px;
                        font-size: 16px;
                    }
                    
                    .yk-preview .yk-preview__info .info-item {
                        display: flex;
                        flex-direction: row;
                        margin-bottom: 30px;
                        font-size: 12px;
                        align-items: center;
                    }
                    
                    .yk-preview .yk-preview__info .info-item i {
                        width: 24px;
                        height: 24px;
                        font-size: 20px;
                        font-weight: 400;
                        color: #999;
                    }
                    
                    .yk-preview .yk-preview__info .info-item .right {
                        padding-left: 15px;
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                    }
                    .yk-preview .yk-preview__info .info-item .info-name {
                        white-space: nowrap;
                    }
                    .yk-preview .yk-preview__info .info-item .content {
                        display: flex;
                        flex-wrap: wrap;
                        flex: 1;
                        color: #999;
                        padding-top: 4px;
                        font-size: 12px;
                        word-break: break-all;
                    }
                    .yk-preview .yk-preview__info--hidemenu {
                        position: absolute !important;
                        top: 50%;
                        left: 0;
                        transform: translateY(-50%);
                        cursor: pointer;
                        width: 18px;
                        height: 70px;
                        line-height: 70px;
                        text-align: center;
                        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAATJJREFUOBGNkz1uwkAQhbMrI7mkIBJngFMkt0CKLORIdkFBRcEFKNKkoLItWb5FSp+AJlLuEIWeBv/w3rJYtuNdGMkyO7vfm7czRqRpOiuK4s1xnE/f949PD0SSJIu6ridBEOxFHMc7LLZCiB+IvNwTAbypquoDdU54xpKVCUNkDic5HD2bTLTgCswqDMOz4GFChClictKD32E/I6sE+MMmYoI7AiaRsiyX+s603VTmeUbj4LrsOpFS/gKeYm8QHhRgktdB5W/CqFojtebIuNcP2U9wrW0rGI2ly9A0nX8C7YYBXHMqthF3BNqwbtieH5dNpGniAJzBgQrbiJWADb4nIgEvbHO+CfA/4rrua+s6X9yTaNAE75O+c8akKTzP+9MiB3DjPM8ddTaKopEJMuVv8AXIBQzYmzjo8QAAAABJRU5ErkJggg==);
                        background-repeat: no-repeat;
                        background-size: cover;
                    }
                    
                    .yk-preview .actionItemTagOuter {
                        margin: 10px;
                        cursor: pointer;
                    }
                    
                    .yk-preview .actionItemTag .actionItemTagIcon {
                        border-radius: 50%;
                        text-align: center;
                        position: relative;
                        cursor: pointer;
                        font-size: 20px;
                        height: 32px;
                        width: 32px;
                        line-height: 32px;
                        vertical-align: middle;
                        top: -1px;
                        right: -5px;
                    }
                    .yk-preview .actionItemTag {
                        display: inline-block;
                        height: 32px;
                        /* padding: 10px; */
                        line-height: 30px;
                        font-size: 16px;
                        border-radius: 4px;
                        box-sizing: border-box;
                        white-space: nowrap;
                        /* background-color: #ecf5ff; */
                        /* color: #409eff; */
                        /* border: 1px solid #d9ecff; */
                        background-color: #909399;
                        border-color: #909399;
                        color: #fff;
                        padding-right: 10px;
                    }
                    
                    .yk-preview .list-item-box .selectItemTag {
                        color: #409eff;
                        border: 1px solid #d9ecff;
                        background-color: #ecf5ff;
                    }
                    
                    .yk-preview .actionItemTag.slotVisible {
                        background-color: #67c23a;
                        border-color: #67c23a;
                        color: #fff;
                    }
                    
                    .yk-preview .actionItemTag.slotHidden {
                        background-color: #f56c6c;
                        border-color: #f56c6c;
                        color: #fff;
                        opacity: 0.6;
                    }
                    
                    .yk-preview #previewOperateAlpha.alphaSelect {
                        color: #0bdee9;
                    }
                    
                    .yk-preview .previewModal {
                        position: fixed;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        width: 100%;
                        max-height: 60%;
                        bottom: calc(120px);
                        z-index: 99999;
                        transition: all 0s;
                        padding-left: 20px;
                    }
                    
                    .yk-preview .list-container {
                        width: 300px;
                        max-width: 30%;
                        max-height: 70vh;
                        position: relative;
                        background: #fff;
                        border: 1px solid #ebeef5;
                        border-radius: 6px;
                        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
                        z-index: 10000;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: center;
                        overflow: hidden;
                    }
                    
                    .yk-preview .closeModal {
                        width: 20px;
                        height: 20px;
                        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAATJJREFUOBGNkz1uwkAQhbMrI7mkIBJngFMkt0CKLORIdkFBRcEFKNKkoLItWb5FSp+AJlLuEIWeBv/w3rJYtuNdGMkyO7vfm7czRqRpOiuK4s1xnE/f949PD0SSJIu6ridBEOxFHMc7LLZCiB+IvNwTAbypquoDdU54xpKVCUNkDic5HD2bTLTgCswqDMOz4GFChClictKD32E/I6sE+MMmYoI7AiaRsiyX+s603VTmeUbj4LrsOpFS/gKeYm8QHhRgktdB5W/CqFojtebIuNcP2U9wrW0rGI2ly9A0nX8C7YYBXHMqthF3BNqwbtieH5dNpGniAJzBgQrbiJWADb4nIgEvbHO+CfA/4rrua+s6X9yTaNAE75O+c8akKTzP+9MiB3DjPM8ddTaKopEJMuVv8AXIBQzYmzjo8QAAAABJRU5ErkJggg==) no-repeat;
                        background-size: cover;
                        position: absolute;
                        top: 17px;
                        right: 20px;
                        cursor: pointer;
                        z-index: 9;
                    }
                    
                    .yk-preview .list-item-box {
                       text-shadow: none;
                    }
                    
                    .yk-preview .list-title {
                        width: 100%;
                        height: 50px;
                        line-height: 50px;
                        font-size: 24px;
                        text-align: center;
                        color: #333;
                          text-shadow: none;
                    }
                    
                    .yk-preview .list-item-box {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: flex-start;
                        align-content: flex-start;
                        max-height: calc(70vh - 100px);
                        overflow-y: auto;
                        overflow-x: hidden;
                        padding: 10px;
                        box-sizing: border-box;
                        width: 100%;
                    }
                    
                    .yk-preview .list-item-box::-webkit-scrollbar {
                        width: 8px;
                    }
                    
                    .yk-preview .list-item-box::-webkit-scrollbar-track {
                        background: #f1f1f1;
                        border-radius: 4px;
                    }
                    
                    .yk-preview .list-item-box::-webkit-scrollbar-thumb {
                        background: #c1c1c1;
                        border-radius: 4px;
                    }
                    
                    .yk-preview .list-item-box::-webkit-scrollbar-thumb:hover {
                        background: #a8a8a8;
                    }
                    
                    .bpx-player-ctrl-volume.bpx-state-show .bpx-player-ctrl-volume-box {
                        display: block;
                    }
                    
                    .yk-preview .bpx-player-ctrl-volume-box {
                        /* display: none; */
                        position: absolute;
                        bottom: 41px;
                        left: 50%;
                        margin-left: -16px;
                        width: 32px;
                        height: 160px;
                        background: rgba(21,21,21,.9);
                        border-radius: 2px;
                    }
                    .yk-preview .bpx-player-ctrl-volume-number {
                        color: #e5e9ef;
                        width: 100%;
                        text-align: center;
                        font-size: 12px;
                        height: 28px;
                        line-height: 28px;
                        margin-bottom: 2px;
                    }
                    .yk-preview .bui-slider {
                        height: 12px;
                        cursor: pointer;
                    }
                    
                    .yk-preview .bui {
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        vertical-align: middle;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                        -webkit-box-pack: start;
                        -ms-flex-pack: start;
                        justify-content: flex-start;
                    }
                    
                    .yk-preview .bpx-player-ctrl-volume-progress {
                        margin: 0 auto;
                        height: 80px!important;
                    }
                    
                    .yk-preview .bui .bui-area {
                        width: 100%;
                        height: 100%;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        vertical-align: middle;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                        -webkit-box-pack: start;
                        -ms-flex-pack: start;
                        justify-content: flex-start;
                        line-height: normal;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                    }
                    
                    .yk-preview .bpx-player-ctrl-volume-progress .bui-area {
                        -webkit-box-pack: center!important;
                        -ms-flex-pack: center!important;
                        justify-content: center!important;
                    }
                    
                    .yk-preview .bui-slider .bui-track.bui-track-vertical {
                        height: 100%;
                        width: 5px;
                        -webkit-box-align: end;
                        -ms-flex-align: end;
                        align-items: flex-end;
                    }
                    
                    
                    .yk-preview .bui-slider .bui-track {
                        position: relative;
                        width: 100%;
                        height: 2px;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                    }
                    .yk-preview .bui-slider .bui-track .bui-bar-wrap {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        border-radius: 2.5px;
                        overflow: hidden;
                        background: #e7e7e7;
                    }
                    .yk-preview .bui-slider .bui-track.bui-track-vertical .bui-bar-wrap .bui-bar {
                        position: absolute;
                        -webkit-transform-origin: 0 100%;
                        transform-origin: 0 100%;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background: #00a1d6;
                    }
                    
                    .yk-preview .bui-slider .bui-track .bui-bar-wrap .bui-bar {
                        position: absolute;
                        -webkit-transform-origin: 0 0;
                        transform-origin: 0 0;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background: #00a1d6;
                    }
                    
                    .yk-preview .bui-slider .bui-track.bui-track-vertical .bui-thumb {
                        bottom: 0;
                        top: auto;
                        position: relative;
                    }
                    
                    .yk-preview .bui-slider .bui-track .bui-thumb {
                        cursor: pointer;
                    }
                    
                    .bui-slider .bui-track .bui-thumb .bui-thumb-dot, .bui-slider .bui-track .bui-thumb .bui-thumb-dot-special {
                        -webkit-transition: all .2s;
                        -o-transition: all .2s;
                        transition: all .2s;
                        -webkit-transform: translateZ(0);
                        transform: translateZ(0);
                    }
                    
                    .yk-preview .bui-slider .bui-track .bui-thumb .bui-thumb-dot {
                        width: 12px;
                        height: 12px;
                        border-radius: 50%;
                        background-color: #00a1d6;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        vertical-align: middle;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                    }
                    
                    </style>
                    <canvas id="preview-canvas"></canvas>
                    <div id="previewSpineDom" style="color: #fff; position: absolute; top: 0; left: 30px;">
                        <span style="font-weight: bold">spine动画预览窗口</span>
                        <span id="curVersionText">当前版本:</span>
                        <span><a id="foldTreeAbtn" href="#unique-id" class="closeBtn aButton" style="display: block">目录</a></span>
                         <span>flipX:</span><input type="checkbox" id="flipX">
                        <span>flipY:</span><input type="checkbox" id="flipY">
                        <span>x: <input id="posX" type="number" value="0.5" step="0.05" style="width: 50px"></span>
                        <span>y: <input id="posY" type="number" value="0.5" step="0.05" style="width: 50px"></span>
<!--                        <span>Debug:</span><input type="checkbox" id="debug">-->
                        <span>α预乘:</span><input type="checkbox" id="premultipliedAlpha">
                   
                        <span>动画标签:</span><select id="animationList"></select>
                        <span>皮肤:</span><select id="skinList"></select>
                     
                        <span>动画时长:<span id="aniTime"></span></span>
                        <span>大小:<input id="scale" type="number" value="0.5" step="0.05" style="width: 50px"></span>

                        <button id="closePreviewWindow" style="margin-left: 20px; margin-top: 10px;" class="closeBtn">关闭预览窗口</button>
                    </div>
                    <!--  模态框       -->
                    <div class="light-modal" id="unique-id" role="dialog" aria-labelledby="light-modal-label" aria-hidden="false">
                        <div class="light-modal-content animated zoomInUp">
                            <!-- light modal header -->
                            <div class="light-modal-header">
                                <h3 class="light-modal-heading">选择文件夹预览</h3>
                                <a href="#" id="closeTreeModal" class="light-modal-close-icon" aria-label="close">&times;</a>
                            </div>
                            <!-- light modal body -->
                            <div class="light-modal-body">
                               <div class="wp-s-core-pan__body-detail">
                                 <div class="wp-s-core-pan__detail-slot">
                                    <section class="nd-detail nd-new-main-list__detail"><!---->
                                        <div class="nd-detail-filelist" 
                                             type="simple">
                                            <div class="nd-detail-filelist__contain">
                                                <div class="nd-detail-filelist__title">
                                                    <div>文件夹内容</div>
                                                    <div style="display: flex; align-items: center">
                                                        <i class="iconfont icon-paixu1" id="btnSortDirFiles" style="cursor: pointer; margin-right: 25px;margin-left: -40px;font-size: 26px;"></i>
                                                        <i class="iconfont icon-fanhui" id="btnReturnLastDir" style="cursor: pointer; font-size: 20px;margin-right: 25px; "></i>
                                                        <i class="iconfont icon-shousuo" id="btnShouSuoDir" style="cursor: pointer; font-size: 26px;"></i>
                                                    </div>
                                                </div>
                                                <div class="nd-detail-filelist__name"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABRUExURUxpcf++Hv/ZU//OPv/DL/+9Gv/BI/+4Bf+4Ef/XcP/LOP/TSf/RRP/WTv/JM/+3Ef+9Ff/bhf+5BP/DJf+yDv/imv/kqv/bXP/w0v/fd//calQXUgwAAAAKdFJOUwB///8d3L9enl8sr20gAAACN0lEQVRYw+2Y65abIBRGE1EzVbyNSW18/wctHA6XYw4q9Ee7Vt2AgOHbcVyTOMztdnFxcXFMWf7gKHN190VRKDpFC0iNqB5ZvqpXzJRxHoF7hrAa9/hK9j2oYIA2QA/UqXeyNg5QDBrshhHbUH8xxO+uT7sOJ/tU5a4wh0eK8KmKHTxd28Bfo16pqphep5l6I+R/p8xr668kVghVceH8M5EZYnGhnBKRceGqmaZXPPw2xbO+1xU+8axwe8NfzkIV7xVZdF0AVhi+rWdxIfgmwloE6CkrDCPwJbYUeFgK61icxFcNKyxIxE+WgnllQ0y4+HffzZ8WZtJlCDtz+CzqaaFaVGiWBNEOZZ15zihsT2CFnXk4QStsLohTU3FC+Af8I8JWV1fa1jy8u+hnOUy2vnd5SkeGrJBfHZwDbxe87pfxQvejmMZZYxxdYSoyVyixSvtXFLJ7hWq5xCRNSTozczzHCj8T54kI5d8QCtvZAodDIa7DgRkJaII2hBfaJC7EOE7D076XuIoVBu8oN3kpBLVt4YXBVaUSFSbS5Akb00znSoPn9KCJCN0am7SnGhganC4kKhR2MV0vvEn4M7bFhM3GIZqtgfiPr9BdSAYnrnCX3rQeB/2xsKcHouiBBhpO+phQL9CdjmKqsRkXpkMz57dmfTY1v3k8is26zvN2A6yIbKVqm/tMjFBMp5jpxrWKbsB1dJw/AsC3Lt/YEaK7x1t5r7aLj3ned/fRj1TK3H9wXFxc/F/8BgM0jBZ4nc19AAAAAElFTkSuQmCC"
                                                                                        alt="folder" class="u-file-icon u-file-icon--list"><span id="pfqhCurFold">当前文件夹</span></div>
                                                <div class="nd-detail-filelist__list bg">
                                                  
                                                    <div style="display: flex; flex-direction: row">
                                                      <div class="filesHeight" style="width: 45%;">
                                                         <div id="pfqhFoldList" style="white-space: nowrap;  display: flex;flex-direction: column; width: 90%" >
                                                                <div class="nd-detail-filename" id="pfqhLastDir">
                                                                <img
                                                                     src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABRUExURUxpcf++Hv/ZU//OPv/DL/+9Gv/BI/+4Bf+4Ef/XcP/LOP/TSf/RRP/WTv/JM/+3Ef+9Ff/bhf+5BP/DJf+yDv/imv/kqv/bXP/w0v/fd//calQXUgwAAAAKdFJOUwB///8d3L9enl8sr20gAAACN0lEQVRYw+2Y65abIBRGE1EzVbyNSW18/wctHA6XYw4q9Ee7Vt2AgOHbcVyTOMztdnFxcXFMWf7gKHN190VRKDpFC0iNqB5ZvqpXzJRxHoF7hrAa9/hK9j2oYIA2QA/UqXeyNg5QDBrshhHbUH8xxO+uT7sOJ/tU5a4wh0eK8KmKHTxd28Bfo16pqphep5l6I+R/p8xr668kVghVceH8M5EZYnGhnBKRceGqmaZXPPw2xbO+1xU+8axwe8NfzkIV7xVZdF0AVhi+rWdxIfgmwloE6CkrDCPwJbYUeFgK61icxFcNKyxIxE+WgnllQ0y4+HffzZ8WZtJlCDtz+CzqaaFaVGiWBNEOZZ15zihsT2CFnXk4QStsLohTU3FC+Af8I8JWV1fa1jy8u+hnOUy2vnd5SkeGrJBfHZwDbxe87pfxQvejmMZZYxxdYSoyVyixSvtXFLJ7hWq5xCRNSTozczzHCj8T54kI5d8QCtvZAodDIa7DgRkJaII2hBfaJC7EOE7D076XuIoVBu8oN3kpBLVt4YXBVaUSFSbS5Akb00znSoPn9KCJCN0am7SnGhganC4kKhR2MV0vvEn4M7bFhM3GIZqtgfiPr9BdSAYnrnCX3rQeB/2xsKcHouiBBhpO+phQL9CdjmKqsRkXpkMz57dmfTY1v3k8is26zvN2A6yIbKVqm/tMjFBMp5jpxrWKbsB1dJw/AsC3Lt/YEaK7x1t5r7aLj3ned/fRj1TK3H9wXFxc/F/8BgM0jBZ4nc19AAAAAElFTkSuQmCC"
                                                                     alt="folder" class="category u-file-icon u-file-icon--list">
                                                                <span class="nd-detail-filename__title-text inline-block-v-middle text-ellip">返回上级</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="filesHeight" style="margin-left: 5%; width: 50%; ">
                                                            <div id="pfqhFilesList" style="white-space: nowrap; display: flex;flex-direction: column; width: 90%">
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <!-- 图集模式预览 -->
                    <div class="picPreviewBg hidden" id="picPreviewBg" style="width: 100%; height: 100%; left: 0; top: 0">
                        <div class="yk-preview">
                            <div class="yk-preview__container" style="width: 100%;" id="previewContainer">
                                <div class="yk-preview__closeBtn" id="closeImgPreview" title="关闭预览">
                                    <i class="iconfont icon-close"></i>
                                </div>
                                <div class="yk-preview__list">
                                   
                                </div>
                                <div class="yk-preview__operate">
                                    <div class="preview-operate" id="preview-operate" style="width: 100%;">
                                        <div id="opFoldTree" style="position: absolute; left: 10px; cursor:pointer;"><i class="iconfont icon-shuliebiao"></i></div>
                                        <div id="previewOperateLeft">
                                            <div class="image-detail">
                                                <i class="iconfont icon-left"></i>
                                            </div>
                                        </div>
                                        <div id="previewOperateRight">
                                            <div class="image-detail">
                                                <i class="iconfont icon-right"></i>
                                            </div>
                                        </div>
                                           <div id="previewOperateQieHuan">
                                            <div class="image-detail">
                                              <i class="iconfont icon-qiehuan"></i>
                                            </div>
                                        </div>
                                        <div id="previewOperateFangda">
                                            <div class="image-detail">
                                                <i class="iconfont icon-fangda"></i>
                                            </div>
                                        </div>
                                        <div id="previewOperateSuoxiao">
                                            <div class="image-detail">
                                              <i class="iconfont icon-suoxiao"></i>
                                            </div>
                                        </div>
                                        <div id="previewOperateNizhuan">
                                            <div class="image-detail">
                                                <i class="iconfont icon-nizhuan"></i>
                                            </div>
                                        </div>
                                        <div id="previewOperateAlpha"> 
                                            <div class="image-detail">
                                              <i class="iconfont icon-alpha"></i>
                                            </div>
                                        </div>
                                        <div id="previewOperateDonghuaAction">
                                            <div class="image-detail">
                                              <i class="iconfont icon-donghua"></i>
                                            </div>
                                        </div>
                                        <div id="previewOperatePifu">
                                            <div class="image-detail">
                                              <i class="iconfont icon-pifu"></i>
                                            </div>
                                        </div>
                                        <div id="previewOperateBoneSlots">
                                            <div class="image-detail">
                                              <span style="font-size: 24px;">🧩</span>
                                            </div>
                                        </div>
                                        
                                         <div id="previewOperateSpeed">
                                            <div class="image-detail">
                                              <i class="iconfont icon-sudutiaojie"></i>
                                            </div>
                                            <div class="bpx-player-ctrl-volume-box hidden" id="previewOperateSpeedCtrl">
                                                <div class="bpx-player-ctrl-volume-number">1.0</div>
                                                <div class="bpx-player-ctrl-volume-progress bui bui-slider" id="dataProgressBar">
                                                    <div class="bui-area">
                                                        <div class="bui-track bui-track-vertical" style="">
                                                            <div class="bui-bar-wrap">
                                                                <div class="bui-bar bui-bar-normal" role="progressbar" style="transform: scaleY(0.61);"></div>
                                                            </div>
                                                            <div class="bui-thumb" style="left: -4px; transform: translateY(-29.28px);">
                                                                <div class="bui-thumb-dot" style=""></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="previewOperateInfo">
                                            <div class="image-detail">
                                              <i class="iconfont icon-info1"></i>
                                            </div>
                                        </div>
                                        <div id="previewOperateClose">
                                            <div class="image-detail" title="关闭预览">
                                              <i class="iconfont icon-close"></i>
                                            </div>
                                        </div>
                                        
                                        <div class="previewModal hidden" id="previewImgModal">
                                            <div class="list-container">
                                                <div class="closeModal" id="closeModal"></div>
                                                <div style="width: 100%">
                                                    <div class="list-title" id="previewModalTitle">骨骼标签</div>
                                                    <div class="list-item-box" id="modalItemsList">具体内容</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                              
                            </div>
                            <div class="yk-preview__info hidden" id="previewDetailInfo">
                                <div class="title">详情</div>
                                <div class="info-wrap">
                                    <div class="info-item"><i class="iconfont icon-kanwumingcheng"></i>
                                        <div class="right">
                                            <div class="info-name">骨骼名称</div>
                                            <div class="content">无</div>
                                        </div>
                                    </div>
                                    <div class="info-item"><i class="iconfont icon-banben"></i>
                                        <div class="right">
                                            <div class="label">版本</div>
                                            <div class="content">3.6</div>
                                        </div>
                                    </div>
                                    <div class="info-item"><i class="iconfont icon-shichang"></i>
                                        <div class="right">
                                            <div class="label">动画时长</div>
                                            <div class="content">5</div>
                                        </div>
                                    </div>
                                    <div class="info-item"><i class="iconfont icon-donghua"></i>
                                        <div class="right">
                                            <div class="label">动作信息</div>
                                            <div class="content">标签: idle, 皮肤: default</div>
                                        </div>
                                    </div>
                                    <div class="info-item"><i class="iconfont icon-qitaxinxi"></i>
                                        <div class="right">
                                            <div class="label">其他信息</div>
                                            <div class="content">大小: 0.5, 速度: 1.0</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="yk-preview__info--hidemenu" id="previewInfoHideMenu"><i class="u-icon-next-page"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    `

                    let canvas;
                    let activeSkeleton = null
                    let currentNode = null
                    let isClosed = false   // 全局信号, 通知关闭, 停止渲染
                    let isUpdate = false
                    const previewSpineDom = document.getElementById('previewSpineDom')

                    canvas = document.getElementById('preview-canvas')

                    let animationManager = new AnimationManager(lib.assetURL, canvas, 123456)

                    // 被监视的元素
                    let px = document.getElementById('posX')
                    let py = document.getElementById('posY')
                    let canvasSize = canvas.getBoundingClientRect()

                    let dpr = Math.max(window.devicePixelRatio * (window.documentZoom ? window.documentZoom : 1), 1)
                    canvas.width = dpr * skinSwitch.bodySize().width
                    canvas.height = dpr * skinSwitch.bodySize().height
                    let x = 0.65 * canvasSize.width
                    let y = 0.5 * canvasSize.height
                    let scale = 0.5
                    // 开始监视el上的手势变化
                    const at = new AnyTouch(canvas)
                    let currentPath = lib.config[skinSwitch.configKey.lastPreviewPath]
                    if (!currentPath) {
                        game.saveConfig(skinSwitch.configKey.lastPreviewPath, 'extension/皮肤切换/assets')
                        currentPath = 'extension/皮肤切换/assets';
                    }
                    // 检查文件夹是否存在, 不存在初始化为默认文件夹
                    skinSwitch.qhly_checkFileExist(currentPath, (exists) => {
                        if (!exists) {
                            currentPath = 'extension/皮肤切换/assets'
                        }
                    })

                    // 获取模态框文件夹和文件列表dom
                    let foldsEle = document.getElementById('pfqhFoldList')
                    let filesEle = document.getElementById('pfqhFilesList')
                    let curFoldEle = document.getElementById('pfqhCurFold')

                    let clickName = lib.config.touchscreen ? 'touchend' : 'click'

                    let lastSelFile = null
                    if (!skinSwitch.nodePreviewedInfo) {
                        skinSwitch.nodePreviewedInfo = {};  // 保存已经预览的骨骼的相关数据
                    }

                    // 添加页面可见性变化和页面卸载事件监听器，用于保存当前路径
                    const saveCurrentPath = () => {
                        if (currentPath) {
                            game.saveConfig(skinSwitch.configKey.lastPreviewPath, currentPath)
                        }
                    }

                    // 页面可见性变化时保存路径
                    document.addEventListener('visibilitychange', () => {
                        if (document.hidden) {
                            saveCurrentPath()
                        }
                    })

                    // 页面卸载时保存路径
                    window.addEventListener('beforeunload', saveCurrentPath)
                    window.addEventListener('pagehide', saveCurrentPath)

                    // 添加搜索框 - 确保DOM元素已存在再添加
                    if (foldsEle && foldsEle.parentNode) {
                        // 创建一个新的搜索行容器
                        let searchRow = document.createElement('div');
                        searchRow.className = 'folder-search-row';
                        searchRow.style.padding = '5px';
                        searchRow.style.marginBottom = '10px';
                        searchRow.style.width = '100%';
                        searchRow.style.display = 'flex';
                        searchRow.style.flexDirection = 'row';
                        searchRow.style.alignItems = 'center';
                        searchRow.style.borderBottom = '1px solid #ddd';
                        searchRow.style.paddingBottom = '10px';

                        // 搜索框内容
                        searchRow.innerHTML = `
                            <span style="margin-right: 10px; white-space: nowrap; font-weight: bold;">搜索文件:</span>
                            <input type="text" placeholder="<小曦>提供搜索" id="folderSearchInput" style="flex-grow: 1; padding: 6px; border-radius: 4px; border: 1px solid #ccc; box-sizing: border-box; font-size: 13px;">
                            <button id="clearSearchBtn" style="margin-left: 10px; padding: 4px 12px; border-radius: 4px; border: 1px solid #ccc; background: #f5f5f5; cursor: pointer; box-sizing: border-box; font-size: 13px;">清除</button>
                        `;

                        // 获取文件内容区域的父元素，将搜索行插入到整个文件列表的顶部
                        let fileContentContainer = document.querySelector('.nd-detail-filelist__name').parentNode;
                        fileContentContainer.insertBefore(searchRow, fileContentContainer.firstChild);

                        // 搜索功能实现 - 直接通过创建的元素获取引用
                        let folderSearchInput = searchRow.querySelector('#folderSearchInput');
                        let clearSearchBtn = searchRow.querySelector('#clearSearchBtn');

                        if (folderSearchInput && clearSearchBtn) {
                            folderSearchInput.addEventListener('input', function () {
                                let searchValue = this.value;  // 不转为小写，保留中文原样
                                let allFolders = foldsEle.querySelectorAll('.nd-detail-filename');

                                // 第一个是返回上层目录按钮，从第二个开始是文件夹
                                for (let i = 1; i < allFolders.length; i++) {
                                    let folderName = allFolders[i].getAttribute('fold');
                                    if (folderName) {
                                        // 不转为小写，保留中文原样
                                        if (searchValue === '' || folderName.indexOf(searchValue) !== -1) {
                                            allFolders[i].style.display = 'block';
                                            // 确保元素可交互
                                            allFolders[i].style.pointerEvents = 'auto';
                                        } else {
                                            allFolders[i].style.display = 'none';
                                            // 不要阻止其他交互
                                            allFolders[i].style.pointerEvents = 'none';
                                        }
                                    }
                                }
                            });

                            clearSearchBtn.addEventListener(clickName, function () {
                                folderSearchInput.value = '';
                                // 触发input事件以更新显示
                                folderSearchInput.dispatchEvent(new Event('input'));
                            });
                        }
                    }

                    let currentFoldInfo = {
                        curFiles: [],  // 存储当前目录下的spine文件列表
                        curFileIndex: 0,  // 当前在文件夹的索引
                    }

                    let contentModal = document.getElementById('unique-id').getElementsByClassName('light-modal-body')[0]

                    contentModal.addEventListener('touchstart', touchstart, true);
                    contentModal.addEventListener('touchmove', touchmove, true);//添加touchmove方法
                    contentModal.addEventListener('touchend', touchend, true);
                    function touchstart(e) {
                        // console.log(e.changedTouches[0].pageY,"开始时触摸的位置")
                        this.move = false //添加一个move参数，触摸时置为false
                        // this.start = e.changedTouches[0].pageY
                        this.start = e.pageY
                    }
                    function touchmove() {
                        this.move = true // 触发滑动事件时move置为true
                    }

                    function touchend(e) {
                        // this.end = e.changedTouches[0].pageY
                        this.end = e.pageY
                        if (this.move) { //只有当move为true时才会触发滑动事件
                            e.stopPropagation()
                        } else {
                            if (e.target.touchend) {
                                e.target.touchend(e.target)
                            }
                        }
                    }


                    curFoldEle.innerText = currentPath

                    const returnLastDir = function (e) {
                        // 获取之前预览的文件夹名字
                        let lastDirName
                        if (currentPath) {
                            lastDirName = currentPath.substring(currentPath.lastIndexOf('/') + 1, currentPath.length)
                        }
                        currentPath = currentPath === '' ? '' : currentPath.substring(0, currentPath.lastIndexOf('/'));
                        game.saveConfig(skinSwitch.configKey.lastPreviewPath, currentPath)
                        initFoldsInfo(lastDirName)
                    }

                    // 返回上一级事件
                    document.getElementById('pfqhLastDir').addEventListener(clickName, function (e) {
                        returnLastDir()
                    })
                    // 同返回上一级
                    document.getElementById('btnReturnLastDir').addEventListener(clickName, function (e) {
                        returnLastDir()
                    })
                    // 收缩文件夹
                    document.getElementById('btnShouSuoDir').addEventListener(clickName, function (e) {
                        let node = foldsEle.parentNode
                        let fileNode = filesEle.parentNode
                        let isHide = node.style.display === 'none'
                        if (isHide) {
                            node.style.display = 'inline-block'
                            fileNode.style.width = '50%'
                            fileNode.style.marginLeft = '5%'
                        } else {
                            node.style.display = 'none'
                            fileNode.style.width = '100%'
                            fileNode.style.marginLeft = '0px'
                        }
                    })

                    let sortDirs = (sorts) => {
                        let box = document.getElementById('pfqhFoldList')
                        let arr = []
                        for (let i = 1; i < box.children.length; i++) {
                            arr.push(box.children[i])
                        }
                        if (sorts == null || sorts === 0) {
                            arr.sort(function (a, b) {
                                return a.getAttribute('fold').localeCompare(b.getAttribute('fold'))
                            })

                        } else if (sorts === 1) {
                            arr.sort(function (a, b) {
                                return b.getAttribute('fold').localeCompare(a.getAttribute('fold'))
                            })
                        }

                        for (let i = 0; i < arr.length; i++) {
                            box.appendChild(arr[i])
                        }
                    }

                    document.getElementById('btnSortDirFiles').addEventListener(clickName, function (e) {
                        let sorts = this._sorts
                        if (sorts == null || sorts === 1) {
                            this._sorts = 0
                            this.classList.add('icon-paixu1')
                            this.classList.remove('icon-daoxu')
                        } else {
                            this._sorts = 1
                            this.classList.remove('icon-paixu1')
                            this.classList.add('icon-daoxu')
                        }
                        sortDirs(this._sorts)
                    })

                    // 只过滤出包含完整spine骨骼的文件进行预览
                    let filterSpineFile = (files) => {
                        let skinInfoMap = {}
                        for (let f of files) {
                            let name = f.substring(0, f.lastIndexOf("."))
                            let ext = f.substring(f.lastIndexOf(".") + 1)
                            if (!(name in skinInfoMap)) {
                                skinInfoMap[name] = {}
                            }
                            if (ext === 'png') {
                                skinInfoMap[name].png = true
                            } else if (ext === 'skel') {
                                skinInfoMap[name].type = 'skel';
                            } else if (ext === 'json') {
                                skinInfoMap[name].type = 'json';
                            } else if (ext === 'atlas') {
                                skinInfoMap[name].altas = true
                            }
                        }
                        let retFiles = []
                        for (let k in skinInfoMap) {
                            let info = skinInfoMap[k]
                            // 如果十周年文件里面已经有了对应武将和对应皮肤的话, 跳过.
                            if (info.type && info.altas /*&& info.png*/) {
                                retFiles.push({
                                    path: k + '.' + info.type,
                                    name: k
                                })
                            }

                        }
                        return retFiles
                    }

                    let initFoldsInfo = (lastDirName) => {
                        // 获取这个文件夹下的所有合法的skel文件和所有文件夹
                        pfqhUtils.getFoldsFiles(currentPath, function (file, path) {
                            let suffixes = ['.png', '.atlas', '.json', '.skel', '.jpg']
                            for (let suf of suffixes) {
                                if (file.endsWith(suf)) {
                                    return true
                                }
                            }
                            return false
                        }, function (folds, files) {
                            curFoldEle.innerText = currentPath
                            // 删除之前节点
                            for (let i = foldsEle.childNodes.length - 1; i > 1; i--) {
                                foldsEle.childNodes[i].remove()
                            }
                            for (let i = filesEle.childNodes.length - 1; i > 0; i--) {
                                filesEle.childNodes[i].remove()
                            }
                            for (let i = 0; i < folds.length; i++) {
                                let div = document.createElement('div');
                                div.innerHTML = `
                                    <img
                                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABRUExURUxpcf++Hv/ZU//OPv/DL/+9Gv/BI/+4Bf+4Ef/XcP/LOP/TSf/RRP/WTv/JM/+3Ef+9Ff/bhf+5BP/DJf+yDv/imv/kqv/bXP/w0v/fd//calQXUgwAAAAKdFJOUwB///8d3L9enl8sr20gAAACN0lEQVRYw+2Y65abIBRGE1EzVbyNSW18/wctHA6XYw4q9Ee7Vt2AgOHbcVyTOMztdnFxcXFMWf7gKHN190VRKDpFC0iNqB5ZvqpXzJRxHoF7hrAa9/hK9j2oYIA2QA/UqXeyNg5QDBrshhHbUH8xxO+uT7sOJ/tU5a4wh0eK8KmKHTxd28Bfo16pqphep5l6I+R/p8xr668kVghVceH8M5EZYnGhnBKRceGqmaZXPPw2xbO+1xU+8axwe8NfzkIV7xVZdF0AVhi+rWdxIfgmwloE6CkrDCPwJbYUeFgK61icxFcNKyxIxE+WgnllQ0y4+HffzZ8WZtJlCDtz+CzqaaFaVGiWBNEOZZ15zihsT2CFnXk4QStsLohTU3FC+Af8I8JWV1fa1jy8u+hnOUy2vnd5SkeGrJBfHZwDbxe87pfxQvejmMZZYxxdYSoyVyixSvtXFLJ7hWq5xCRNSTozczzHCj8T54kI5d8QCtvZAodDIa7DgRkJaII2hBfaJC7EOE7D076XuIoVBu8oN3kpBLVt4YXBVaUSFSbS5Akb00znSoPn9KCJCN0am7SnGhganC4kKhR2MV0vvEn4M7bFhM3GIZqtgfiPr9BdSAYnrnCX3rQeB/2xsKcHouiBBhpO+phQL9CdjmKqsRkXpkMz57dmfTY1v3k8is26zvN2A6yIbKVqm/tMjFBMp5jpxrWKbsB1dJw/AsC3Lt/YEaK7x1t5r7aLj3ned/fRj1TK3H9wXFxc/F/8BgM0jBZ4nc19AAAAAElFTkSuQmCC"
                                         alt="folder" class="category u-file-icon u-file-icon--list">
                                    <span class="nd-detail-filename__title-text inline-block-v-middle text-ellip">${folds[i]}</span>
                                `;
                                div.setAttribute('fold', folds[i]);
                                div.classList.add('nd-detail-filename');
                                div.style.cursor = 'pointer'; // 确保鼠标悬停时显示为可点击状态
                                div.addEventListener(clickName, function (e) {
                                    if (currentPath) {
                                        currentPath = `${currentPath}/${this.getAttribute('fold')}`
                                    } else {
                                        currentPath = this.getAttribute('fold')
                                    }
                                    game.saveConfig(skinSwitch.configKey.lastPreviewPath, currentPath)

                                    // 清除搜索框内容，方便查看新目录内容
                                    let searchInput = document.querySelector('#folderSearchInput');
                                    if (searchInput) {
                                        searchInput.value = '';
                                    }

                                    initFoldsInfo()
                                    e.stopPropagation()
                                });
                                foldsEle.appendChild(div);
                            }
                            // 排序一下节点
                            let _sorts = document.getElementById('btnSortDirFiles')._sorts
                            if (_sorts != null) {
                                sortDirs(_sorts)
                            }

                            // 搜索框值更新后，保持文件夹筛选状态
                            let folderSearchInput = document.querySelector('#folderSearchInput');
                            if (folderSearchInput && folderSearchInput.value) {
                                folderSearchInput.dispatchEvent(new Event('input'));
                            }

                            for (let i = 1; i < foldsEle.children.length; i++) {
                                let foldName = foldsEle.children[i].getAttribute('fold')
                                if (lastDirName && lastDirName === foldName) {
                                    foldsEle.children[i].classList.add('previewSelect')
                                    // 计算滚动条, 滚动到对应的文件夹位置
                                    if (i > 5) {
                                        foldsEle.parentNode.scrollTop = 40 * (i - 5)
                                    }
                                } else {
                                    foldsEle.children[i].classList.remove('previewSelect')
                                }
                            }

                            // 点击文件夹时 初始化一下当前file
                            currentFoldInfo.curFiles.length = 0
                            currentFoldInfo.curFileIndex = -1

                            let retFiles = filterSpineFile(files)
                            for (let i = 0; i < retFiles.length; i++) {
                                let div = document.createElement('div')
                                div.innerHTML = `
                                    <img
                                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABIUExURUxpcTOL+DSL+DqO+Veb/mKl/kmX+zWL+U6a+2ao/0aW+0CS+kyZ/GCk/mWn/1yi/lef/VGc/Pr9/+jz/2+s+46//b3a/4O3/AJIojgAAAAKdFJOUwDf//8d3U+en52O09RGAAACF0lEQVRYw+2Y63ajIBCAW8ZqHC5KrZv3f9MFhpuJTQfrjz1n/SDIbT4npw2pfXu7uLi4YNOP39O367rRvOKja/V9GHOqcTTmVGNnzLlGl6A2WvvWxGsqJo9ajKMuGP0dDcbxSWTShKlGfOOoebCNRTidYxynDXrb1dUU0ziGEF3ZdHHoza14xocMXzJyhLdpmme/e6ag2XeobqYCnBRvs98fm32meId56nnCErk+czfVhlub0CyfOyzaHhTa9XOX9aDQqnU/w7uyjULrcC3i+ocI4iUOVkQ7+8IVeptXWgUgMXD3xjv1UYCyCa6QUAiC0E64fMUBYBTOrUJnROmBryCEMEAsCbYKrSIkCSXS0LYLla8U6K4KSYi+H5ZsWmcJY1ohmpos3OLWmoSF9JajX9m8ckyIRfjIrzM8KERfq5J/yridZwrDx0HF6suOMF24QoXJGijCR/gZboB/TZgDYyd9lqU8mqGPlGQMJR8OfiDjZNjDEQ5S0hlDZ4ushWkqwxSWJCgezOKYIMsw7Ri4wi0g3HfBKuF55bBQTNod1WcKw9kv6yShTQgUQA6A6IsjAEmFJ4RXOF24W+gBcIUxAaiapChi/zolw5rfC+GYUKTqG1G11Vxo2Bn6AJLk8NiPC6JBKOjXLv0ZEruwN2AJe8GCnKzHgEGw4STonm/fub535rNUx8xx4D+RdsPP9Af+m3FxcfH/8hcLt2QJ3T9wuwAAAABJRU5ErkJggg=="
                                         class="category u-file-icon u-file-icon--list" alt="${retFiles[i].path}">
                                    <span class="nd-detail-filename__title-text inline-block-v-middle text-ellip">${retFiles[i].path}</span>
                                `
                                div.setAttribute('path', retFiles[i].path)
                                div.classList.add('nd-detail-filename')
                                div.addEventListener(clickName, function (e) {
                                    if (lastSelFile === this) return

                                    playSelectAsset(this.getAttribute('path'))

                                    // 添加选择的样式
                                    if (lastSelFile) {
                                        lastSelFile.classList.remove('previewSelect')
                                    }
                                    lastSelFile = this
                                    this.classList.add('previewSelect')

                                    // 可能需要更新一下滚动条以及索引
                                    for (let idx = 0; idx < this.parentNode.children.length; idx++) {
                                        if (this === this.parentNode.children[idx]) {
                                            // 清理图集相关的信息
                                            currentFoldInfo.curFileIndex = idx
                                            if (window.location.hash === '#unique-id') {
                                                let scrollTop = filesEle.parentNode.scrollTop;
                                                if (scrollTop > (idx * 40)) {
                                                    filesEle.parentNode.scrollTop = 40 * (idx - 3)
                                                } else if ((idx * 40 - scrollTop) > 10 * 40) {
                                                    filesEle.parentNode.scrollTop = 40 * (idx)
                                                }
                                            }
                                            break
                                        }
                                    }

                                    closeModalFunc()

                                    // e.stopPropagation()
                                })
                                filesEle.appendChild(div)

                                currentFoldInfo.curFiles.push(div)
                                currentFoldInfo.curFileIndex = -1
                                closeModalFunc()
                            }
                        }
                        )
                    }

                    initFoldsInfo()

                    let playSelectAsset = (path) => {
                        // 拼接当前所选择的文件, 获取版本号, 然后进行资源载入与播放
                        let fullPath
                        if (currentPath) {
                            fullPath = currentPath + '/' + path
                        } else {
                            fullPath = path
                        }
                        pfqhUtils.getSpineFileVersion(fullPath, function (version) {
                            if (version == null) {
                                version = '3.6'
                            }
                            if ((!['3.5.35', '3.6', '3.7', '3.8', '4.0', '4.1', '4.2'].includes(version))) {
                                skinSwitchMessage.show({
                                    'type': 'warning',
                                    'text': `当前不支持${version}版本的骨骼文件播放`,
                                    'duration': 1500
                                });
                                return;
                            }

                            // 加载当前骨骼
                            let dy = animationManager.getAnimation(version)

                            let name = path.substring(0, path.lastIndexOf("."))
                            let ext = path.substring(path.lastIndexOf(".") + 1)
                            let filename
                            if (currentPath) {
                                filename = currentPath + '/' + name
                            } else {
                                filename = name
                            }
                            if (!isUpdate) {
                                dy.update({
                                    width: decadeUI.get.bodySize().width,
                                    height: decadeUI.get.bodySize().height,
                                    dpr: Math.max(window.devicePixelRatio * (window.documentZoom ? window.documentZoom : 1), 1),
                                })
                            }

                            let play = () => {
                                if (skinSwitch.nodePreviewedInfo[filename] === false) return
                                // 播放下一个之前, 保存上一个的node的数据
                                if (currentNode) {
                                    skinSwitch.nodePreviewedInfo[currentNode.name] = {
                                        x: [0, x / canvas.width],
                                        y: [0, y / canvas.height],
                                        scale: currentNode.scale,
                                        speed: currentNode.speed,
                                        angle: currentNode.angle,
                                        action: currentNode.skeleton.state.tracks[0].animation.name,
                                    }
                                }
                                animationManager.stopSpineAll()
                                let playInfo = {
                                    x: [0, 0.65],
                                    y: [0, 0.5],
                                    name: filename,
                                    scale: 0.5,
                                    loop: true
                                }
                                let isPreviewed = false
                                if (filename in skinSwitch.nodePreviewedInfo) {
                                    playInfo = Object.assign(playInfo, skinSwitch.nodePreviewedInfo[filename])
                                    isPreviewed = true
                                }

                                let node = dy.playSpine(playInfo)

                                let state = node.skeleton.state;
                                let activeAnimation = state.tracks[0].animation.name;

                                let checkHasDaiJi = (act) => {
                                    // 自动寻找待机标签
                                    const idleAction = ['idle', 'daiji', 'play', 'animation']
                                    let res = false
                                    for (let idle of idleAction) {
                                        if (act.toLowerCase().indexOf(idle) !== -1) {
                                            res = true
                                            break
                                        }
                                    }
                                    return res
                                }
                                if (!isPreviewed && !checkHasDaiJi(activeAnimation)) {
                                    for (let i = 1; i < node.skeleton.data.animations.length; i++) {
                                        let name = node.skeleton.data.animations[i].name
                                        if (checkHasDaiJi(name)) {
                                            node.skeleton.state.setAnimation(0, name, true);
                                            node.skeleton.setToSetupPose();
                                            // 重新计算bounds
                                            node.skeleton.updateWorldTransform();
                                            node.skeleton.bounds = { offset: new dy.spineLib.Vector2(), size: new dy.spineLib.Vector2() };
                                            node.skeleton.getBounds(node.skeleton.bounds.offset, node.skeleton.bounds.size, []);

                                            break
                                        }
                                    }
                                }

                                // 自动在屏幕中央
                                let autoFit = (t) => {
                                    let canvasW = canvas.width
                                    let canvasH = canvas.height
                                    let bounds = t.skeleton.bounds
                                    // 有些没有插槽, 就无法获取size, 返回默认的size
                                    if (!Number.isFinite(t.skeleton.bounds.offset.x)) {
                                        initCurrentNodeInfo()
                                        return
                                    }

                                    let centerX = bounds.offset.x + bounds.size.x / 2;
                                    let centerY = bounds.offset.y + bounds.size.y / 2;
                                    let scaleX = bounds.size.x / canvasW;
                                    let scaleY = bounds.size.y / canvasH;
                                    let tempScale = Math.max(scaleX, scaleY);
                                    tempScale = 1 / tempScale;

                                    let width = canvasW / tempScale;
                                    let height = canvasH / tempScale;

                                    // 手动设置x和y值.
                                    let xx = -(centerX - width / 2) / width
                                    let yy = 1 - (centerY + height / 2) / height

                                    if (tempScale < 1) {
                                        t.scale = tempScale * height / width * 1.2
                                    } else {
                                        t.scale = tempScale * height / width / 1.2
                                    }

                                    if (bounds.size.x < bounds.size.y) {
                                        t.scale = tempScale * height / width / 1.2
                                    }

                                    if (window.location.hash === '#unique-id') {
                                        xx += 0.15
                                    }

                                    if (picPreviewBg.classList.contains('hidden')) {
                                        yy -= 0.07
                                    }

                                    if (!document.getElementById('previewDetailInfo').classList.contains('hidden')) {
                                        xx -= 0.1;
                                    }

                                    t.x = [0, xx];
                                    t.y = [0, yy]

                                    // 修改一些全局变量
                                    document.getElementById('scale').value = t.scale
                                    document.getElementById('posX').value = xx
                                    document.getElementById('posY').value = yy
                                    scaleSlider.value = t.scale
                                    // 手动触发change事件
                                    scaleSlider.dispatchEvent(new CustomEvent('input'))
                                    x = xx * canvasW
                                    y = yy * canvasH
                                    scale = tempScale * 1.2
                                    initCurrentNodeInfo()
                                }

                                document.getElementById('curVersionText').innerText = `当前版本: ${version}`
                                // 切换当前的骨骼
                                activeSkeleton = node.skeleton
                                currentNode = node
                                // 更新当前骨骼的标签信息
                                init()
                                if (!isPreviewed) {
                                    autoFit(node)
                                } else {
                                    // 修改一些全局变量
                                    let xx = playInfo.x[1]
                                    let yy = playInfo.y[1]
                                    document.getElementById('scale').value = currentNode.scale
                                    document.getElementById('posX').value = xx
                                    document.getElementById('posY').value = yy
                                    scaleSlider.value = currentNode.scale
                                    // 手动触发change事件
                                    scaleSlider.dispatchEvent(new CustomEvent('input'))
                                    x = xx * canvas.width
                                    y = yy * canvas.height
                                    scale = playInfo.scale || 1
                                    initCurrentNodeInfo()
                                }

                                // 生成缩略图
                                // setTimeout(() => {
                                //     canvas.toBlob(function(blob) {
                                //         let newImg = document.createElement("img")
                                //         previewWindow.appendChild(newImg);
                                //         let url = URL.createObjectURL(blob, 'image/webp', 0.01);
                                //         debugger
                                //
                                //         newImg.onload = function() {
                                //             // no longer need to read the blob so it's revoked
                                //             URL.revokeObjectURL(url);
                                //         }
                                //         newImg.src = url;
                                //         newImg.style.width = '100px'
                                //         newImg.style.height = '100px'
                                //         newImg.style.position = 'absolute'
                                //         newImg.style.top = '500px'
                                //
                                //     });
                                // }, 2000)
                            }

                            if (dy.hasSpine(filename)) {
                                play()
                            } else {
                                dy.loadSpine(filename, ext, () => {
                                    play()
                                }, (err, err2) => {
                                    console.log('加载骨骼错误', err, err2)
                                    let errMsg = ''
                                    if (err2 && err2.indexOf('atlas page image') !== -1) {
                                        errMsg = '缺少切图'
                                    }
                                    skinSwitchMessage.show({
                                        type: 'warning',
                                        text: `加载${filename}错误 ${errMsg}`
                                    })
                                    skinSwitch.nodePreviewedInfo[filename] = false
                                })
                            }

                        }, function () {
                            skinSwitchMessage.show({
                                'type': 'warning',
                                'text': `获取版本号错误`,
                                'duration': 1500
                            })
                        })

                    }

                    let scaleSlider
                    {
                        scaleSlider = document.createElement('input')
                        scaleSlider.min = '0'
                        scaleSlider.max = '3'
                        scaleSlider.value = '0.5'
                        scaleSlider.type = 'range';

                        // scaleSlider = decadeUI.component.slider(0.1, 3, 0.5)
                        scaleSlider.setAttribute('step', '0.01')
                        let scaleNode = document.getElementById('scale')
                        scaleNode.parentNode.insertBefore(scaleSlider, scaleNode)
                    }

                    let speedSlider
                    {
                        speedSlider = document.createElement('input')
                        speedSlider.min = '0'
                        speedSlider.max = '4'
                        speedSlider.type = 'range';
                        // speedSlider = decadeUI.component.slider(0, 3, 1)
                        speedSlider.setAttribute('step', '0.1')

                        let con = document.createElement('span')
                        let speedText = document.createElement('span')
                        speedText.innerHTML = '速度: 1'
                        speedSlider.value = '1'
                        con.appendChild(speedText)
                        con.appendChild(speedSlider)

                        let closePreviewWindow = document.getElementById('closePreviewWindow')
                        closePreviewWindow.parentNode.insertBefore(con, closePreviewWindow)

                        speedSlider.onchange = function () {
                            if (currentNode) {
                                currentNode.speed = speedSlider.value
                            }
                            speedText.innerHTML = '速度: ' + speedSlider.value
                        };

                    }
                    // 将会包装事件的 debounce 函数
                    function debounce(fn, delay) {
                        // 维护一个 timer
                        let timer = null;

                        return function () {
                            // 通过 'this' 和 'arguments' 获取函数的作用域和变量
                            let context = this;
                            let args = arguments;

                            clearTimeout(timer);
                            timer = setTimeout(function () {
                                fn.apply(context, args);
                            }, delay);
                        }
                    }

                    let thunderForbidTouch = function () {
                        _status.th_swipe_up = lib.config.swipe_up;
                        lib.config.swipe_up = ''
                        _status.th_swipe_down = lib.config.swipe_down;
                        lib.config.swipe_down = ''
                        _status.th_swipe_left = lib.config.swipe_left;
                        lib.config.swipe_left = ''
                        _status.th_swipe_right = lib.config.swipe_right;
                        lib.config.swipe_right = ''
                        _status.th_gamePause = ui.click.pause
                        ui.click.pause = () => { }
                    }

                    let thunderAllowTouch = function () {
                        if (_status.th_swipe_up) {
                            lib.config.swipe_up = _status.th_swipe_up
                            lib.config.swipe_down = _status.th_swipe_down
                            lib.config.swipe_left = _status.th_swipe_left
                            lib.config.swipe_right = _status.th_swipe_right
                            ui.click.pause = _status.th_gamePause
                        }
                    }

                    thunderForbidTouch()

                    // 拨动动画时长, 跳转到某刻 https://juejin.cn/post/7125409030113067015
                    let timeSlider
                    {
                        timeSlider = document.createElement('input')
                        timeSlider.min = '0'
                        timeSlider.max = '1'
                        // timeSlider = decadeUI.component.slider(0, 1, 0)
                        timeSlider.setAttribute('step', '0.01')
                        timeSlider.type = 'range';

                        let con = document.createElement('span')
                        let text = document.createElement('span')
                        text.innerHTML = '进度: 0.00'
                        timeSlider.value = '0'
                        con.appendChild(text)
                        con.appendChild(timeSlider)

                        let closePreviewWindow = document.getElementById('closePreviewWindow')
                        closePreviewWindow.parentNode.insertBefore(con, scaleSlider.parentNode)

                        timeSlider.addEventListener('input', debounce(function (e) {
                            text.innerHTML = `进度: ${Number(timeSlider.value).toFixed(2)}`

                            // 修改speed为0, 并且跳转到具体的时间
                            speedSlider.value = 0
                            speedSlider.onchange()

                            if (currentNode) {
                                currentNode.speed = speedSlider.value
                                let state = activeSkeleton.state
                                let entry = state.tracks[0]
                                entry.trackTime = Number(timeSlider.value) * entry.animationEnd
                            }


                        }, 10))
                    }

                    let angleSlider
                    {
                        angleSlider = document.createElement('input')
                        angleSlider.min = '0'
                        angleSlider.max = '360'
                        angleSlider.type = 'range'
                        // angleSlider = decadeUI.component.slider(0, 360, 0)
                        angleSlider.setAttribute('step', '1')

                        let con = document.createElement('span')
                        let text = document.createElement('span')
                        text.innerHTML = '角度: 0°'
                        angleSlider.value = '0'
                        con.appendChild(text)
                        con.appendChild(angleSlider)

                        let closePreviewWindow = document.getElementById('closePreviewWindow')
                        closePreviewWindow.parentNode.insertBefore(con, scaleSlider.parentNode)

                        angleSlider.onchange = function () {
                            text.innerHTML = '角度: ' + angleSlider.value + '°'
                            if (currentNode) {
                                currentNode.angle = angleSlider.value
                            }
                        };

                    }

                    /* ********** 图集模式相关的定义 开始 **********/
                    const picPreviewModeBtn = document.createElement('button')
                    picPreviewModeBtn.classList.add('closeBtn')
                    picPreviewModeBtn.style.marginLeft = '10px'
                    picPreviewModeBtn.innerText = '图集模式'
                    let closePreviewWindow = document.getElementById('closePreviewWindow')
                    closePreviewWindow.parentNode.insertBefore(picPreviewModeBtn, closePreviewWindow)

                    const closeImgPreview = document.getElementById('closeImgPreview')
                    const picPreviewBg = document.getElementById('picPreviewBg')

                    const previewImgModal = document.getElementById('previewImgModal')
                    const modalItemsList = document.getElementById('modalItemsList')
                    const modalClose = document.getElementById('closeModal')
                    // 滑动条
                    const dataProgressBar = document.getElementById('dataProgressBar')
                    const previewOperateSpeedCtrl = document.getElementById('previewOperateSpeedCtrl')

                    // 详情
                    const previewDetailInfo = document.getElementById('previewDetailInfo')
                    const previewInfoHideMenu = document.getElementById('previewInfoHideMenu')  // 隐藏按钮

                    const operateBtn = {
                        left: document.getElementById('previewOperateLeft'),
                        right: document.getElementById('previewOperateRight'),
                        switchAction: document.getElementById('previewOperateQieHuan'),  // 快速切换标签
                        scaleAdd: document.getElementById('previewOperateFangda'),
                        scaleSub: document.getElementById('previewOperateSuoxiao'),
                        AngleAdd: document.getElementById('previewOperateNizhuan'),
                        alpha: document.getElementById('previewOperateAlpha'),
                        action: document.getElementById('previewOperateDonghuaAction'),
                        skin: document.getElementById('previewOperatePifu'),
                        boneSlots: document.getElementById('previewOperateBoneSlots'),
                        speed: document.getElementById('previewOperateSpeed'),
                        info: document.getElementById('previewOperateInfo'),
                        close: document.getElementById('previewOperateClose'),
                    }

                    document.getElementById('opFoldTree').listen(() => {
                        if (window.location.hash !== '#unique-id') {
                            document.getElementById('foldTreeAbtn').click()
                            setTimeout(() => {
                                if (lastSelFile) {
                                    for (let idx = 0; idx < filesEle.children.length; idx++) {
                                        if (lastSelFile === filesEle.children[idx]) {
                                            if (idx > 5) {
                                                filesEle.parentNode.scrollTop = 40 * (idx - 5)
                                            }
                                            break
                                        }
                                    }
                                }
                            }, 100)
                        } else {
                            document.getElementById('closeTreeModal').click()
                        }
                    })

                    picPreviewModeBtn.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
                        // 隐藏原来的按钮, 进入图集模式
                        picPreviewBg.classList.remove('hidden')
                        previewSpineDom.classList.add('hidden')

                    })

                    closeImgPreview.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
                        picPreviewBg.classList.add('hidden')
                        previewSpineDom.classList.remove('hidden')
                        previewOperateSpeedCtrl.classList.add('hidden')
                    })

                    operateBtn.left.listen((e) => {
                        let len = currentFoldInfo.curFiles.length
                        if (len === 0) return
                        if (currentFoldInfo.curFileIndex === -1) currentFoldInfo.curFileIndex = 0
                        else {
                            if (len === 1) return
                            if (currentFoldInfo.curFileIndex === 0) currentFoldInfo.curFileIndex = len - 1
                            else currentFoldInfo.curFileIndex--
                        }
                        currentFoldInfo.curFiles[currentFoldInfo.curFileIndex].dispatchEvent(new CustomEvent(lib.config.touchscreen ? 'touchend' : 'click'))
                        // 关闭标签预览页
                        closeModalFunc()
                    })

                    operateBtn.right.listen((e) => {
                        let len = currentFoldInfo.curFiles.length
                        if (len === 0) return
                        if (currentFoldInfo.curFileIndex === -1) currentFoldInfo.curFileIndex = 0
                        else {
                            if (len === 1) return
                            if (currentFoldInfo.curFileIndex === len - 1) currentFoldInfo.curFileIndex = 0
                            else currentFoldInfo.curFileIndex++
                        }
                        currentFoldInfo.curFiles[currentFoldInfo.curFileIndex].dispatchEvent(new CustomEvent(lib.config.touchscreen ? 'touchend' : 'click'))

                        closeModalFunc()
                    })

                    operateBtn.switchAction.listen(() => {
                        if (currentNode == null) return
                        closeModalFunc()
                        // 获取当前角色
                        let skeleton = activeSkeleton
                        let state = skeleton.state;
                        if (skeleton.data.animations.length <= 1) return
                        let activeAnimation = state.tracks[0].animation.name;
                        let findIndex = 0
                        for (let i = 0; i < skeleton.data.animations.length; i++) {
                            if (activeAnimation === skeleton.data.animations[i].name) {
                                findIndex = i
                                break
                            }
                        }

                        if (findIndex === skeleton.data.animations.length - 1) {
                            findIndex = 0
                        } else {
                            findIndex++
                        }
                        state.setAnimationWith(0, skeleton.data.animations[findIndex], true)
                        skeleton.setToSetupPose();

                        initCurrentNodeInfo()

                    })

                    skinSwitch.continuousClick(operateBtn.scaleAdd, () => {
                        if (!currentNode) return
                        currentNode.scale = (Number(currentNode.scale) || 1) + 0.02
                        initCurrentNodeInfo(4)
                    })

                    skinSwitch.continuousClick(operateBtn.scaleSub, () => {
                        if (!currentNode) return
                        let s = (Number(currentNode.scale) || 1) - 0.02
                        if (s <= 0.01) s = 0.01
                        currentNode.scale = s

                        initCurrentNodeInfo(4)
                    })

                    skinSwitch.continuousClick(operateBtn.AngleAdd, () => {
                        if (!currentNode) return
                        currentNode.angle = (Number(currentNode.angle) || 0) + 30
                    })

                    operateBtn.alpha.listen(function (e) {
                        let premultipliedAlpha = document.getElementById('premultipliedAlpha')
                        let isSelect = premultipliedAlpha.checked
                        if (isSelect) {
                            this.classList.remove('alphaSelect')
                        } else {
                            this.classList.add('alphaSelect')
                        }
                        currentNode.premultipliedAlpha = !isSelect
                        premultipliedAlpha.checked = !premultipliedAlpha.checked
                    })

                    operateBtn.speed.listen(function (e) {
                        previewOperateSpeedCtrl.classList.remove('hidden')
                        const maxSpeed = 4
                        if (currentNode) {
                            let curSpeed = currentNode.speed == null ? 1 : currentNode.speed
                            if (curSpeed >= maxSpeed) curSpeed = maxSpeed
                            else if (curSpeed <= 0) curSpeed = 0
                            let percent = curSpeed / maxSpeed
                            progressData.progressBarText.innerText = curSpeed.toFixed(1)
                            progressData.progressBarWrap.style.transform = `scaleY(${percent})`
                            progressData.progressBarThumb.style.transform = `translateY(-${percent * 78}px)`
                        }
                        closeModalFunc()

                    })

                    operateBtn.skin.listen(function (e) {
                        if (currentNode == null) return

                        if (!previewImgModal.classList.contains('hidden')) {
                            if (document.getElementById('previewModalTitle').innerText === '骨骼皮肤') {
                                closeModalFunc()
                                return
                            }
                        }

                        // 获取当前角色
                        let skeleton = activeSkeleton;
                        let activeSkin = skeleton.skin.name
                        let skinsList = []
                        for (let i = 0; i < skeleton.data.skins.length; i++) {
                            skinsList.push(skeleton.data.skins[i].name)
                        }
                        document.getElementById('previewModalTitle').innerText = '骨骼皮肤'
                        initItemsModal(skinsList, activeSkin, (skinName) => {
                            if (!activeSkeleton) return
                            let skeleton = activeSkeleton

                            try {
                                skeleton.setSkinByName(skinName);
                                skeleton.setSlotsToSetupPose();
                            } catch (e) {
                                console.warn('Failed to set skin:', skinName, e);
                                // 如果设置指定皮肤失败，尝试使用默认皮肤
                                if (skeleton.data.defaultSkin) {
                                    try {
                                        skeleton.setSkin(skeleton.data.defaultSkin);
                                        skeleton.setSlotsToSetupPose();
                                    } catch (e2) {
                                        console.warn('Failed to set default skin:', e2);
                                    }
                                }
                            }

                            initCurrentNodeInfo()
                        })
                    })

                    operateBtn.action.listen((e) => {
                        if (currentNode == null) return

                        if (!previewImgModal.classList.contains('hidden')) {
                            if (document.getElementById('previewModalTitle').innerText === '骨骼标签') {
                                closeModalFunc()
                                return
                            }
                        }
                        // 获取当前角色
                        let skeleton = activeSkeleton
                        let state = skeleton.state;
                        let activeAnimation = state.tracks[0].animation.name;
                        let aniList = []
                        for (let i = 0; i < skeleton.data.animations.length; i++) {
                            aniList.push(skeleton.data.animations[i].name)
                        }
                        document.getElementById('previewModalTitle').innerText = '骨骼标签'

                        initItemsModal(aniList, activeAnimation, (animationName) => {
                            if (!activeSkeleton) return
                            let skeleton = activeSkeleton
                            let state = skeleton.state;
                            state.setAnimation(0, animationName, true);
                            skeleton.setToSetupPose();

                            initCurrentNodeInfo()
                        })
                    })

                    operateBtn.boneSlots.listen((e) => {
                        if (currentNode == null) return

                        if (!previewImgModal.classList.contains('hidden')) {
                            if (document.getElementById('previewModalTitle').innerText === '骨骼部件') {
                                closeModalFunc()
                                return
                            }
                        }

                        // 获取当前骨骼的所有槽位
                        let skeleton = activeSkeleton
                        let slotsList = []
                        let slotsVisibility = {}

                        for (let i = 0; i < skeleton.slots.length; i++) {
                            let slot = skeleton.slots[i]
                            let slotName = slot.data.name
                            slotsList.push(slotName)
                            // 记录当前槽位的可见性状态
                            slotsVisibility[slotName] = slot.attachment !== null
                        }

                        document.getElementById('previewModalTitle').innerText = '骨骼部件'

                        // 使用自定义的槽位模态框初始化函数
                        initSlotsModal(slotsList, slotsVisibility, (slotName, isVisible) => {
                            if (!activeSkeleton) return
                            let skeleton = activeSkeleton

                            // 查找对应的槽位
                            let targetSlot = skeleton.findSlot(slotName)
                            if (targetSlot) {
                                if (isVisible) {
                                    // 显示槽位 - 恢复原始附件
                                    let attachmentName = targetSlot.data.attachmentName
                                    if (attachmentName) {
                                        targetSlot.setAttachment(skeleton.getAttachment(targetSlot.data.index, attachmentName))
                                    }
                                } else {
                                    // 隐藏槽位 - 移除附件
                                    targetSlot.setAttachment(null)
                                }
                            }
                        })
                    })

                    operateBtn.info.listen(function (e) {
                        let isHidden = previewDetailInfo.classList.contains('hidden')
                        if (isHidden) {
                            previewDetailInfo.classList.remove('hidden')
                            // 修改样式
                            document.getElementById('previewContainer').style.width = '80%'
                            document.getElementById('preview-operate').style.width = '80%'
                            initCurrentNodeInfo()
                        } else {
                            // 关闭.
                            closeNodeInfo()
                        }

                    })

                    // 底部关闭按钮事件
                    operateBtn.close.listen(function (e) {
                        picPreviewBg.classList.add('hidden')
                        previewSpineDom.classList.remove('hidden')
                        previewOperateSpeedCtrl.classList.add('hidden')
                        // 如果详情面板是打开的，也要关闭
                        if (!previewDetailInfo.classList.contains('hidden')) {
                            closeNodeInfo()
                        }
                    })

                    previewInfoHideMenu.listen(function (e) {
                        closeNodeInfo()
                    })

                    // 初始化当前节点的基本信息
                    const initCurrentNodeInfo = (index) => {
                        // 获取各个节点
                        let contentNodes = previewDetailInfo.getElementsByClassName('content')
                        let currentAni = currentNode.skeleton.state.tracks[0].animation
                        if (currentNode) {
                            if (index == null) {
                                contentNodes[0].innerText = lastSelFile.getAttribute('path')
                                contentNodes[1].innerText = document.getElementById('curVersionText').innerText
                                contentNodes[2].innerText = currentAni.duration.toFixed(1)
                                contentNodes[3].innerText = `标签: ${currentAni.name}, 皮肤: ${currentNode.skeleton.skin.name}`
                                let speed
                                if (currentNode.speed == null) {
                                    speed = 1.0
                                } else {
                                    speed = Number(currentNode.speed).toFixed(1)
                                }
                                contentNodes[4].innerText = `大小: ${Number(currentNode.scale).toFixed(2)}, 速度: ${speed}`
                            } else {
                                switch (index) {
                                    case 0:
                                        contentNodes[0].innerText = lastSelFile.getAttribute('path')
                                        break
                                    case 1:
                                        contentNodes[1].innerText = document.getElementById('curVersionText').innerText
                                        break
                                    case 2:
                                        contentNodes[2].innerText = currentAni.duration.toFixed(1)
                                        break
                                    case 3:
                                        contentNodes[3].innerText = `标签: ${currentAni.name}, 皮肤: ${currentNode.skeleton.skin.name}`
                                        break
                                    case 4:
                                        let speed
                                        if (currentNode.speed == null) {
                                            speed = 1.0
                                        } else {
                                            speed = Number(currentNode.speed).toFixed(1)
                                        }
                                        contentNodes[4].innerText = `大小: ${Number(currentNode.scale).toFixed(2)}, 速度: ${speed}`
                                        break
                                }
                            }

                        }
                    }

                    const closeNodeInfo = () => {
                        document.getElementById('previewContainer').style.width = '100%'
                        document.getElementById('preview-operate').style.width = '100%'
                        previewDetailInfo.classList.add('hidden')
                    }

                    // 调节速度的滚动条事件
                    let progressData = {
                        isDown: false,
                        posY: 0,
                        progressBarText: dataProgressBar.previousElementSibling,
                        progressBarWrap: dataProgressBar.getElementsByClassName('bui-bar-normal')[0],
                        progressBarThumb: dataProgressBar.getElementsByClassName('bui-thumb')[0],

                    }
                    dataProgressBar.addEventListener(lib.config.touchscreen ? 'touchstart' : 'mousedown', function (e) {
                        e.stopPropagation()
                        progressData.isDown = true
                        picPreviewBg.isTouching = false
                        if (e.touches && e.touches.length) {
                            progressData.posY = e.touches[0].clientY
                        } else {
                            progressData.posY = e.clientY
                        }
                    })
                    picPreviewBg.addEventListener(lib.config.touchscreen ? 'touchstart' : 'mousedown', function (e) {
                        if (!progressData.isDown) {
                            previewOperateSpeedCtrl.classList.add('hidden')
                        }
                    })

                    picPreviewBg.addEventListener(lib.config.touchscreen ? 'touchmove' : 'mousemove', function (e) {
                        if (!progressData.isDown) return
                        let deltaY, curY
                        if (e.touches && e.touches.length) {
                            curY = e.touches[0].clientY
                        } else {
                            curY = e.clientY
                        }
                        deltaY = curY - progressData.posY
                        const maxSpeed = 4
                        if (currentNode) {
                            let curSpeed = currentNode.speed == null ? 1 : currentNode.speed
                            curSpeed = -deltaY / 60 * 4 + curSpeed
                            if (curSpeed >= maxSpeed) curSpeed = maxSpeed
                            else if (curSpeed <= 0) curSpeed = 0
                            let percent = curSpeed / maxSpeed
                            progressData.progressBarText.innerText = curSpeed.toFixed(1)
                            progressData.progressBarWrap.style.transform = `scaleY(${percent})`
                            progressData.progressBarThumb.style.transform = `translateY(-${percent * 78}px)`

                            currentNode.speed = curSpeed
                        }
                        progressData.posY = curY
                    })

                    picPreviewBg.addEventListener(lib.config.touchscreen ? 'touchend' : 'mouseup', function (e) {
                        if (progressData.isDown) {
                            initCurrentNodeInfo(4)
                        }
                        progressData.isDown = false

                    })

                    picPreviewBg.addEventListener(lib.config.touchscreen ? 'touchcancel' : 'mouseleave', function (e) {
                        progressData.isDown = false
                    })

                    modalClose.listen(() => {
                        closeModalFunc()
                    })

                    // 新的双指放大缩小与滑动功能
                    function mouseupEvent(event) {
                        picPreviewBg._mouseup(event);
                    }
                    function mousemoveEvent(event) {
                        if (event) {
                            if (event.touches && event.touches.length) {
                                picPreviewBg._mousemove(event.touches[0].clientX, event.touches[0].clientY);
                            }
                            else picPreviewBg._mousemove(event.clientX, event.clientY);
                        }
                    }
                    function mousedownEvent(event) {
                        if (event) {
                            // 清空之前的数据
                            if (this.posX) delete this.posX
                            if (this.posY) delete this.posY
                            if (event.touches && event.touches.length) picPreviewBg._mousedown(event.touches[0].clientX, event.touches[0].clientY);
                            else picPreviewBg._mousedown(event.clientX, event.clientY);
                        }
                    }
                    picPreviewBg._mousedown = function (x, y) {
                        this.posX = x
                        this.posY = y
                        this.isTouching = true
                    }
                    picPreviewBg._mousemove = function (clientX, clientY) {
                        if (!this.isTouching) return;
                        let deltaX = clientX - this.posX;
                        let deltaY = clientY - this.posY;
                        x += deltaX
                        y -= deltaY
                        let vx = x / canvas.width
                        let vy = y / canvas.height

                        if (currentNode) {
                            currentNode.x = [0, vx]
                            currentNode.y = [0, vy]
                        }
                        this.posX = clientX
                        this.posY = clientY
                    }
                    picPreviewBg._mouseup = function (event) {
                        this.isTouching = false;
                        delete this.posX;
                        delete this.posY;
                    }
                    picPreviewBg.addEventListener('touchstart', mousedownEvent, true);
                    picPreviewBg.addEventListener('touchend', mouseupEvent, true);
                    picPreviewBg.addEventListener('touchcancel', mouseupEvent, true);
                    picPreviewBg.addEventListener('touchmove', mousemoveEvent, true);
                    picPreviewBg.addEventListener('mousedown', mousedownEvent, true);
                    picPreviewBg.addEventListener('mouseup', mouseupEvent, true);
                    picPreviewBg.addEventListener('mouseleave', mouseupEvent, true);
                    picPreviewBg.addEventListener('mousemove', mousemoveEvent, true);

                    // 监听图集事件的滚轮缩放事件
                    picPreviewBg.addEventListener('wheel', debounce(function (e) {
                        let ratio = 0.05;
                        // 缩小

                        let scale = Number(scaleSlider.value)

                        if (e.deltaY > 0) {
                            ratio = -0.05;
                        }
                        scale = scale + ratio;
                        // 限制缩放倍数
                        if (scale < 0.05) scale = 0.05
                        scaleSlider.value = scale.toString()
                        // 手动触发change事件
                        if (currentNode) {
                            currentNode.scale = scaleSlider.value
                        }
                        document.getElementById('scale').value = scaleSlider.value;
                        initCurrentNodeInfo(4)
                        // e.preventDefault();
                    }, 0))


                    const closeModalFunc = () => {
                        previewImgModal.classList.add('hidden')
                        modalItemsList.innerHTML = '' // 清空数据
                    }

                    const initItemsModal = (itemList, selectItem, func) => {
                        previewImgModal.classList.remove('hidden')
                        modalItemsList.innerHTML = ''

                        // 阻止模态框内的滚动事件传播到背景
                        let listContainer = previewImgModal.querySelector('.list-container')

                        listContainer.addEventListener('wheel', function (e) {
                            e.stopPropagation()
                        })

                        listContainer.addEventListener('touchmove', function (e) {
                            e.stopPropagation()
                        })

                        modalItemsList.addEventListener('wheel', function (e) {
                            e.stopPropagation()
                        })

                        modalItemsList.addEventListener('touchmove', function (e) {
                            e.stopPropagation()
                        })

                        itemList.forEach(item => {
                            let it = document.createElement('div')
                            it.classList.add('actionItemTagOuter')
                            it.innerHTML = `<span class="actionItemTag"><i class="iconfont icon-collect actionItemTagIcon" ></i>${item}</span>`
                            modalItemsList.appendChild(it)
                            it.setAttribute('value', item)

                            if (selectItem === item) {
                                it.getElementsByTagName('span')[0].classList.add('selectItemTag')
                            }
                            it.listen(function (e) {
                                skinSwitch.refreshDomList(
                                    Array.from(modalItemsList.children).map(v => v.getElementsByTagName('span')[0]),
                                    'selectItemTag',
                                    this.getElementsByTagName('span')[0]
                                )
                                func(this.getAttribute('value'))
                            })
                        })
                    }

                    const initSlotsModal = (slotsList, slotsVisibility, func) => {
                        previewImgModal.classList.remove('hidden')
                        modalItemsList.innerHTML = ''

                        // 阻止模态框内的滚动事件传播到背景
                        let listContainer = previewImgModal.querySelector('.list-container')

                        listContainer.addEventListener('wheel', function (e) {
                            e.stopPropagation()
                        })

                        listContainer.addEventListener('touchmove', function (e) {
                            e.stopPropagation()
                        })

                        modalItemsList.addEventListener('wheel', function (e) {
                            e.stopPropagation()
                        })

                        modalItemsList.addEventListener('touchmove', function (e) {
                            e.stopPropagation()
                        })

                        // 复制部件名称函数
                        const copySlotName = (slotName) => {
                            const input = document.createElement('textarea');
                            input.setAttribute('readonly', 'readonly');
                            input.value = slotName;
                            document.body.appendChild(input);

                            if (document.execCommand('copy')) {
                                input.select();
                                document.execCommand('copy');
                                if (window.skinSwitchMessage) {
                                    skinSwitchMessage.show({
                                        type: 'success',
                                        text: `已复制部件名称: ${slotName}`,
                                        duration: 1500,
                                        closeable: false,
                                    });
                                }
                            }
                            document.body.removeChild(input);
                        };

                        slotsList.forEach(slotName => {
                            let it = document.createElement('div')
                            it.classList.add('actionItemTagOuter')
                            let isVisible = slotsVisibility[slotName]
                            let eyeIcon = isVisible ? 'icon-eye' : 'icon-eye-close'
                            let visibilityClass = isVisible ? 'slotVisible' : 'slotHidden'

                            it.innerHTML = `<span class="actionItemTag ${visibilityClass}"><i class="iconfont ${eyeIcon} actionItemTagIcon" ></i>${slotName}</span>`
                            modalItemsList.appendChild(it)
                            it.setAttribute('value', slotName)
                            it.setAttribute('visible', isVisible.toString())

                            // 双击计数器
                            let clickCount = 0;
                            let clickTimer = null;

                            it.listen(function (e) {
                                clickCount++;

                                // 如果是双击，复制部件名称
                                if (clickCount === 2) {
                                    clearTimeout(clickTimer);
                                    clickCount = 0;
                                    copySlotName(this.getAttribute('value'));
                                    return;
                                }

                                // 单击延迟执行，如果在300ms内有第二次点击则取消
                                clickTimer = setTimeout(() => {
                                    if (clickCount === 1) {
                                        // 单击：切换显示/隐藏状态
                                        let currentVisible = this.getAttribute('visible') === 'true'
                                        let newVisible = !currentVisible
                                        this.setAttribute('visible', newVisible.toString())

                                        let span = this.getElementsByTagName('span')[0]
                                        let icon = span.getElementsByTagName('i')[0]

                                        if (newVisible) {
                                            span.classList.remove('slotHidden')
                                            span.classList.add('slotVisible')
                                            icon.classList.remove('icon-eye-close')
                                            icon.classList.add('icon-eye')
                                        } else {
                                            span.classList.remove('slotVisible')
                                            span.classList.add('slotHidden')
                                            icon.classList.remove('icon-eye')
                                            icon.classList.add('icon-eye-close')
                                        }

                                        func(this.getAttribute('value'), newVisible)
                                    }
                                    clickCount = 0;
                                }, 300);
                            })

                            // 右键复制功能
                            it.addEventListener('contextmenu', function (e) {
                                e.preventDefault();
                                copySlotName(this.getAttribute('value'));
                            });
                        })
                    }

                    /* ******************** 图集模式相关的定义 结束 ********************/

                    // 当拖拽的时候pan事件触发 拖拽事件
                    at.on('pan', (e) => {
                        if (e.nativeEvent.touches && e.nativeEvent.touches.length > 1) return
                        // e包含位移/速度/方向等信息
                        // 获取x,y偏移
                        let deltaX = e.deltaX
                        let deltaY = e.deltaY
                        x += deltaX
                        y -= deltaY
                        let vx = x / canvas.width
                        let vy = y / canvas.height
                        px.value = vx.toString()
                        py.value = vy.toString()
                        if (currentNode) {
                            currentNode.x = [0, vx]
                            currentNode.y = [0, vy]
                        }
                    })

                    at.on(['pinchin', 'pinchout'], debounce((e) => {
                        // e包含位移/速度/方向等信息
                        // 获取x,y偏移
                        // scale *= e.scale
                        if (e.scale > 1) scale += 0.1
                        else if (e.scale < 1) scale -= 0.1
                        scaleSlider.value = scale
                        // 手动触发change事件
                        scaleSlider.dispatchEvent(new CustomEvent('input'));
                        e.preventDefault();
                    }, 250))

                    canvas.addEventListener('wheel', debounce(function (e) {
                        let ratio = 0.05;
                        // 缩小

                        let scale = Number(scaleSlider.value)

                        if (e.deltaY > 0) {
                            ratio = -0.05;
                        }
                        scale = scale + ratio;
                        // 限制缩放倍数
                        if (scale < 0.05) scale = 0.05
                        scaleSlider.value = scale.toString()
                        // 手动触发change事件
                        if (currentNode) {
                            currentNode.scale = scaleSlider.value
                        }
                        document.getElementById('scale').value = scaleSlider.value;
                        // e.preventDefault();
                    }, 0))

                    document.getElementById('closePreviewWindow').addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
                        // 保存当前路径
                        game.saveConfig(skinSwitch.configKey.lastPreviewPath, currentPath)
                        // 删除自己当前节点即可
                        let self = background
                        // let self = document.getElementById('previewWindowDiv')
                        let parent = self.parentElement
                        // 停止当前的render
                        isClosed = true
                        thunderAllowTouch()
                        setTimeout(() => {
                            // 延时删除节点, 等待最后一次渲染完成
                            parent.removeChild(self)
                        }, 200)
                    })

                    function init() {

                        if (!activeSkeleton) {
                            return
                        }

                        document.getElementById('scale').oninput = function (e) {
                            let v = e.srcElement.value
                            if (scaleSlider) {
                                scaleSlider.value = v
                                scale = Number(v)
                            }
                            if (currentNode) {
                                currentNode.scale = Number(v) || 0.5
                            }

                        }
                        document.getElementById('posX').oninput = function (e) {
                            let v = e.srcElement.value
                            if (currentNode) {
                                currentNode.y = [0, Number(v) || 0.65]
                            }
                        }
                        document.getElementById('posY').oninput = function (e) {
                            let v = e.srcElement.value
                            if (currentNode) {
                                currentNode.y = [0, Number(v) || 0.5]
                            }

                        }

                        document.getElementById('premultipliedAlpha').onchange = function (e) {
                            if (currentNode) {
                                currentNode.premultipliedAlpha = e.target.checked
                            }
                        }

                        document.getElementById('flipX').onchange = function (e) {
                            if (currentNode) {
                                currentNode.flipX = e.target.checked
                            }
                        }
                        document.getElementById('flipY').onchange = function (e) {
                            if (currentNode) {
                                currentNode.flipY = e.target.checked
                            }
                        }


                        scaleSlider.oninput = function () {
                            // let v= s1.value / 8;
                            if (currentNode) {
                                currentNode.scale = scaleSlider.value
                            }
                            document.getElementById('scale').value = scaleSlider.value;
                        }

                        let setupAnimationUI = () => {
                            // 初始化骨骼数据
                            if (!activeSkeleton) {
                                return
                            }
                            let animationList = document.getElementById('animationList')
                            animationList.options.length = 0

                            let skeleton = activeSkeleton
                            let state = skeleton.state;
                            let activeAnimation = state.tracks[0].animation.name;
                            for (let i = 0; i < skeleton.data.animations.length; i++) {
                                let name = skeleton.data.animations[i].name;
                                let option = document.createElement('option')
                                option.setAttribute('value', name)
                                option.text = name
                                if (name === activeAnimation) {
                                    option.setAttribute('selected', 'selected')
                                    document.getElementById('aniTime').innerText = Number(skeleton.data.animations[i].duration).toFixed(1)
                                }
                                animationList.options.add(option)
                            }

                            animationList.onchange = function () {
                                let skeleton = activeSkeleton
                                let state = skeleton.state;
                                let animationName = animationList.options[animationList.selectedIndex].text
                                skeleton.setToSetupPose();
                                state.setAnimation(0, animationName, true);
                                let ani = skeleton.data.findAnimation(animationName)
                                document.getElementById('aniTime').innerText = Number(ani.duration).toFixed(1)
                            }
                        }

                        let setupSkinUI = function () {
                            if (!activeSkeleton) {
                                return
                            }

                            let skinList = document.getElementById('skinList')
                            skinList.options.length = 0

                            let skeleton = activeSkeleton
                            let skins = skeleton.data.skins

                            for (let i = 0; i < skins.length; i++) {
                                let name = skins[i].name;
                                let option = document.createElement('option')
                                option.setAttribute('value', name)
                                option.text = name
                                if (i === 0) {
                                    option.setAttribute('selected', 'selected')
                                    document.getElementById('aniTime').innerText = Number(skeleton.data.animations[i].duration).toFixed(1)
                                }
                                skinList.options.add(option)
                            }

                            skinList.onchange = function () {
                                let skeleton = activeSkeleton
                                let skinName = skinList.options[skinList.selectedIndex].text
                                try {
                                    skeleton.setSkinByName(skinName);
                                    skeleton.setSlotsToSetupPose();
                                } catch (e) {
                                    console.warn('Failed to set skin:', skinName, e);
                                    // 如果设置指定皮肤失败，尝试使用默认皮肤
                                    if (skeleton.data.defaultSkin) {
                                        try {
                                            skeleton.setSkin(skeleton.data.defaultSkin);
                                            skeleton.setSlotsToSetupPose();
                                        } catch (e2) {
                                            console.warn('Failed to set default skin:', e2);
                                        }
                                    }
                                }
                            }
                        }

                        setupAnimationUI()
                        setupSkinUI()

                        // 初始化xy坐标
                        x = 0.65 * canvas.width
                        y = 0.5 * canvas.height
                        scaleSlider.value = 0.5
                        document.getElementById('scale').value = 0.5
                        currentNode.premultipliedAlpha = document.getElementById('premultipliedAlpha').checked
                        currentNode.flipX = document.getElementById('flipX').checked
                        currentNode.flipY = document.getElementById('flipY').checked
                    }
                },
                
                
                // 手杀藏珍阁
                cangZhenGe: function () {
                    const div = ui.create.div("#pfqhCzg", document.body);
                    const cangzhengeCanvasWrapper = ui.create.div('.czg-canvas-wrapper', div)
                    const bg = ui.create.div('.czgBg', div)

                    const relW = 1920  // 参考宽度
                    const relH = 1080  // 参考高度

                    const ratio = relW / relH  // 以这个比例来进行统一规划
                    const bodyW= skinSwitch.bodySize().width
                    const bodyH = skinSwitch.bodySize().height

                    // 屏幕分辨率问题, 参考https://blog.51cto.com/u_15064642/4040771
                    let dpr = Math.max(window.devicePixelRatio * (window.documentZoom ? window.documentZoom : 1), 1)
                    const app = new PIXI.Application({
                        // width: actualW/ dpr,
                        // height: actualH/ dpr,
                        width: bodyW/ dpr,
                        height: bodyH/ dpr,
                        backgroundAlpha: 0,
                        resolution: dpr,
                        antialias: true,     // 消除锯齿
                        autoDensity: true,
                    });
                    app.renderer.resize(bodyW, bodyH);
                    cangzhengeCanvasWrapper.appendChild(app.view);
                    let boxbeijing = null  // 抽卡盒子动画

                    // const loadResource = () => {
                    //     if (!app.loader.resources.aar_cangbaoge) {
                    //
                    //     }
                    // }

                    const loadAnimations = () => {

                        app.loader.onError.add((err) => {
                            console.log('err', err)
                        })

                        app.loader
                            .add("gongxihuode_biankuang", skinSwitch.url + "images/cangZhenGe/spineAni/gongxihuode/gongxihuode_biankuang.skel")
                            .add("aar_cangbaoge", skinSwitch.url +"images/cangZhenGe/spineAni/aar_cangbaoge.skel")
                            .add('item_board', skinSwitch.url + 'images/cangZhenGe/game_hist_headbg.png')
                            .add('previewBox', skinSwitch.url + `images/cangZhenGe/奖励预览框.png`)
                            .load(onAssetsLoaded);
                    }

                    function setDefaultAni(spineObj, loop) {
                        const animation = spineObj.spineData.animations[0]
                        spineObj.state.setAnimationWith(0, animation, loop)
                    }

                    function drawItem(itemInfo, count, resource, hasSpine) {
                        // 奖励道具
                        const rewardItem = new PIXI.Container()
                        // 边框
                        const board = new PIXI.Sprite.from(skinSwitch.url + 'images/cangZhenGe/game_hist_headbg.png')
                        rewardItem.addChild(board)
                        board.visible = false
                        board.scale.set(boardFactor )

                        let item
                        if (itemInfo.type === 'wujiang') {
                            item = new PIXI.Sprite.from(skinSwitch.url + `images/cangZhenGe/wujiang/${itemInfo.id}.png`);
                        } else {
                            item = new PIXI.Sprite.from(skinSwitch.url + `images/cangZhenGe/items/${itemInfo.id}.png`);
                        }

                        rewardItem.scale.set(0.6)
                        item.x = boardWidth  * 0.04
                        item.y = boardWidth * 0.03
                        // item.scale.set(0.94)
                        const ease = new Ease.Ease()
                        item.scale.set(2)
                        const scaleTime = 150
                        ease.add(item, {scale: boardFactor * 0.92}, {repeat: false, duration: scaleTime})

                        // 加上这个延时, 可以防止突然变化大小的闪屏
                        setTimeout(() => {
                            rewardItem.addChild(item)
                        }, 20)
                        setTimeout(() => {

                            // ease.destroy()
                            // item.visible = false
                            board.visible = true
                            if (hasSpine) {
                                let chouzhong = new PIXI.spine.Spine(resource.gongxihuode_daojuchuxian.spineData)
                                rewardItem.addChild(chouzhong)
                                setDefaultAni(chouzhong, false)
                                let localPos = chouzhong.getLocalBounds()
                                chouzhong.position.set(
                                    -localPos.x + (boardWidth  - localPos.width) / 2,
                                    -localPos.y + (boardWidth- localPos.height) / 2,
                                )
                                chouzhong.state.timeScale = 0.7
                                chouzhong.scale.set(1.1)

                            }

                            if (itemInfo.gaoji) {
                                // 如果是高级道具, 添加边框特效
                                let gaojidaoju = new PIXI.spine.Spine(resource.gongxihuode_gaojidaoju.spineData);
                                rewardItem.addChild(gaojidaoju)
                                setDefaultAni(gaojidaoju, true)
                                let localPos = gaojidaoju.getLocalBounds()
                                gaojidaoju.position.set(
                                    -localPos.x + (boardWidth  - localPos.width) / 2 + 2,
                                    -localPos.y + (boardWidth - localPos.height) / 2,
                                )
                                gaojidaoju.state.timeScale = 1
                                gaojidaoju.scale.set(0.86 * boardFactor)
                                gaojidaoju.zIndex = -1
                            }
                        }, scaleTime * 1.3)
                        rewardItem.sortableChildren = true

                        setTimeout(() => {
                            // 添加宝珠物品的数量
                            const countStyle = new PIXI.TextStyle({
                                fontFamily: 'shousha',
                                fontSize: parseInt(20 * boardFactor),
                                fill: 'white',
                                letterSpacing: 1,
                                dropShadow: true,
                                dropShadowColor: 'black',
                                dropShadowBlur: 1,
                                dropShadowDistance: 1
                            });

                            const itemCount = new PIXI.Text(`x${count}`, countStyle);
                            itemCount.x = board.width - itemCount.width - 5;
                            itemCount.y = board.y + board.height - itemCount.height - 5

                            rewardItem.addChild(itemCount);

                            // 添加宝主物品的文字显示
                            const style = new PIXI.TextStyle({
                                fontFamily: 'shousha',
                                fontSize: parseInt(20 * boardFactor),
                                fill: 'white',
                                wordWrap: true,
                                // wordWrapWidth: 12,
                                align: 'center',
                                lineJoin: 'round',
                                leading: 0,


                            });

                            let name = itemInfo.name
                            let newName = ''
                            for (let i = 0; i < name.length; i+=7) {
                                if (i > 0) {
                                    newName += ' '
                                }
                                newName += name.slice(i, i + 7)
                            }
                            const itemName = new PIXI.Text(newName, style);

                            // const itemName = new PIXI.Text(itemInfo.name, style);
                            itemName.x = (board.width - itemName.width) / 2;
                            itemName.y = board.y + board.height + 10

                            rewardItem.addChild(itemName);

                        }, 600)

                        return rewardItem
                    }

                    function onAssetsLoaded(loader, resource) {
                        boxbeijing = new PIXI.spine.Spine(resource.aar_cangbaoge.spineData);
                        // debugger
                        // set the position
                        let localPos = boxbeijing.getLocalBounds()  // 骨骼的本地坐标
                        let scale
                        scale = app.screen.width / localPos.width * 0.4

                        // 设置绝对偏移
                        boxbeijing.scale.set(scale);  // 设置新的大小后, 本地坐标会进行偏移
                        // 设置相对canvas的中心
                        boxbeijing.position.set(
                            -localPos.x + (app.screen.width  - localPos.width ) / 2 + 20,
                            -localPos.y + (app.screen.height - localPos.height) / 2 - 10,
                        )

                        app.stage.addChild(boxbeijing)
                        boxbeijing.state.setAnimation(0, 'play1', true)

                        // 接着加载第二批资源
                        app.loader
                            .add("chouzhong", skinSwitch.url + "images/cangZhenGe/spineAni/Ss_M_WWJ_chouzhong.skel")
                            .add("gongxihuode_daojuchuxian", skinSwitch.url + "images/cangZhenGe/spineAni/gongxihuode/gongxihuode_daojuchuxian.skel")
                            .add("gongxihuode_gaojidaoju", skinSwitch.url + "images/cangZhenGe/spineAni/gongxihuode/gongxihuode_gaojidaoju.skel")
                            .add("gongxihuode_lizi", skinSwitch.url +"images/cangZhenGe/spineAni/gongxihuode/gongxihuode_lizi.skel")
                            .add('back', skinSwitch.url + 'images/cangZhenGe/dialog2.png')
                            .add('rr_yuan_pan', skinSwitch.url + 'images/cangZhenGe/rewardresult/rr_yuan_pan.png')
                            .add('title', skinSwitch.url + 'images/cangZhenGe/rewardresult/rr_title.png')
                    }

                    bg.listen = function (e) {
                        e.stopPropagation();
                    }

                    // 藏珍阁logo
                    ui.create.div(".czg-logo", bg);

                    const statBtn = ui.create.div('.stat-btn', bg)

                    const totalRewards = {
                        totalCount: 0,
                        items: {}
                    }
                    const statBg = ui.create.div('.stat-bg', bg)
                    const closeBtn = ui.create.div('.stat-close-btn', statBg)
                    closeBtn.innerHTML = '×'
                    closeBtn.listen(() => {statBg.hide()})
                    const desc = ui.create.div('.stat-text', statBg)
                    statBg.hide()

                    const refreshStatData = () => {
                        // 打开统计面板
                        let title = '\n\u3000累计抽取' + totalRewards.totalCount + '次\n\n'
                        let res = []
                        for (let k in totalRewards.items) {
                            res.push(totalRewards.items[k])
                        }
                        res.sort((a, b) => {
                            let w1 = a.weight || 3000
                            let w2 = b.weight || 3000
                            return w1 - w2
                        })
                        let textArray = [title]
                        for (let item of res) {
                            var str="";
                            if(item.name.length>8||item.name.indexOf('*')!=-1) {
                                textArray.push(`\u3000◈ ${item.name}`)
                            }else {
                                for(var l=item.name.length;l<9;l++) str=str+'┅';
                                var nums=Math.min(item.count,9999);
                                textArray.push(`\u3000◈ ${item.name} ${str} ${nums}`)
                            }
                        }
                        textArray.push(`\n\n`);
                        desc.innerText = textArray.join('\n')
                    }

                    statBtn.listen(() => {
                        statBg.show()
                        refreshStatData()
                    })


                    // 返回
                    const back1 = ui.create.div(".ret-back1", bg)
                    setTimeout(() => {
                        back1.listen(() => {
                            setTimeout(() => {
                                if(game.initJinDuTiao&&game.me&&game.me.name&&!game.forbidPauseJinDu) {
                                    game.initJinDuTiao('pause');
                                }
                                if(window.shoushaBlanks) {
				                    window.shoushaBlanks.forEach(node=>{
				                        window.shoushaBlanks_show(0,20,node);
				                    });
			                	}
                                div.remove();
                                if(window.inSplash ){
                                if(ui.window)ui.window.remove();
                                delete ui.window;
                                if(ui.arena)ui.arena.remove();
                                delete ui.arena;
                                
                                
                                }
                                // 清楚所有动画

                            }, 50);
                        })

                    }, 1000)

                    // 中间盒子抽卡动画的背景
                    const choukaBg = ui.create.div('.chouka-bg', bg)

                    const openOne = ui.create.div('.open-one', bg)
                    const openAll = ui.create.div('.open-all', bg)


                    const openAllTip = ui.create.div('.open-all-tip', bg)
                    openAllTip.innerHTML = '<span style=\'color:#DEB887; text-shadow:0 0 1px black;font-weight:600;font-family:shousha\'>每次最多开50个</span>'

                    // 盒子配置
                    const boxSettings = skinSwitch.czgSettings.boxes.map(item => {
                        return {
                            name: item.name,
                            isHot: item.isHot,
                            tip: item.tip,
                            count: 5000
                        }
                    })
                    const boxBugTip = ui.create.div(".box-buy-tip", bg);
                    boxBugTip.innerHTML = "<span style='color:red; text-shadow:0 0 0.5px gray,0 0 0.5px gray;font-weight:500;font-family:shousha'>2023年七夕活动首发，后续请关注每周末限时活动</span>";
                    // 各个盒子部分
                    const boxBg = ui.create.div('.box-bg', bg)
                    const boxItems = []
                    for (let i = 0; i < boxSettings.length; i++) {
                        let boxInfo = boxSettings[i]
                        const boxDiv = ui.create.div('.box-item', boxBg)
                        const nameParent = ui.create.div('.name-parent', boxDiv)
                        const boxNameDiv = ui.create.div(".box-item-name", nameParent)
                        const boxCountDiv = ui.create.div(".box-item-count", nameParent)
                        boxNameDiv.innerHTML = boxInfo.name
                        boxCountDiv.innerHTML = `拥有：${boxInfo.count}`

                        if (boxInfo.isHot) {
                            const boxHotTag = ui.create.div(".box-item-hot-tag", boxDiv)
                        }

                        if (i === 0) {
                            boxDiv.classList.add('box-item-select')
                            boxBugTip.getElementsByTagName('span')[0].innerText = boxInfo.tip
                        }
                        boxItems.push(boxDiv)
                        boxDiv.index = i
                        boxDiv.listen(function () {
                            skinSwitch.refreshDomList(boxItems, 'box-item-select', boxDiv)
                            boxBugTip.getElementsByTagName('span')[0].innerText = boxInfo.tip
                            currenBox = skinSwitch.czgSettings.boxes[this.index]
                            setCurrentBoxUi(currenBox)
                        })
                    }

                    // 当前抽取的盒子
                    let currenBox = skinSwitch.czgSettings.boxes[0]

                    // 稀世珍宝 右边的武将部分
                    const xishi = ui.create.div('.xishizhenbao', bg)
                    const xishiImg = ui.create.div('.xishizhenbao-img', xishi)
                    const xishiText = ui.create.div('.xishizhenbao-text', xishi)  // 武将名字
                    const xishiLabelText = ui.create.div('.xishizhenbao-label-text', xishi)  // 稀释珍宝标识
                    const xishiRareLabel = ui.create.div('.xishizhenbao-rare-label', xishi)  // 史诗标识

                    function setCurrentBoxUi(box) {
                        xishi.style.backgroundImage = 'url("' + skinSwitch.url + `images/cangZhenGe/bskin/${box.xishizhenbao.id}.jpg")`
                        xishiText.innerText = box.xishizhenbao.name
                    }

                    setCurrentBoxUi(currenBox)

                    // 打开一个遮罩层
                    const maskDiv = ui.create.div(div)
                    maskDiv.style.width = '100%'
                    maskDiv.style.height = '100%'
                    maskDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
                    maskDiv.hide()

                    let closeRewardResultWindow = null
                    let closeRewardPreviewWindow = null

                    maskDiv.listen(() => {
                        // 遮罩层关闭
                        maskDiv.hide()
                        console.log('遮罩层关闭')
                        if (closeRewardResultWindow) {
                            closeRewardResultWindow()
                            closeRewardResultWindow = null // 执行一次后,置空
                        }

                        if (closeRewardPreviewWindow) {
                            closeRewardPreviewWindow()
                            closeRewardPreviewWindow = null
                        }
                    })

                    function bindDragEvent(divBg, scrollView) {
                        let mousedownEvent = function (e) {
                            this.isDown = true
                            if (e.touches && e.touches.length) {
                                this.posX = e.touches[0].clientX
                                this.posY = e.touches[0].clientY
                            } else {
                                this.posX = e.clientX
                                this.posY = e.clientY
                            }
                        }

                        let mouseupEvent = function (e) {
                            // 清空之前的数据
                            if (this.posX) delete this.posX
                            if (this.posY) delete this.posY
                            this.isDown = false
                        }

                        let mousemoveEvent = function (e) {
                            let curX, curY
                            if (!this.isDown) return
                            if (e.touches && e.touches.length) {
                                curX = e.touches[0].clientX
                                curY = e.touches[0].clientY
                            } else {
                                curX = e.clientX
                                curY = e.clientY
                            }
                            let contentHeight = scrollView.content.height
                            let top = scrollView.content.top
                            let deltaY = curY - this.posY

                            // 设置阈值, 如果变化小于5, 不进行变化
                            const threshold = 5
                            const factor = 0.75
                            if (Math.abs(deltaY) < threshold) {
                                return
                            }
                            deltaY *= factor;  // 放缓变化速度

                            if (deltaY === 0 || top >= contentHeight && deltaY < 0 || deltaY > 0 && top <= 0) {
                                return
                            } else {
                                top -= deltaY
                                if (top <= 0) top = 0
                                else if (top >= contentHeight) {
                                    top = contentHeight
                                }
                                scrollView.content.top = top
                            }

                            this.posX = curX
                            this.posY = curY
                        }

                        divBg.addEventListener('touchstart', mousedownEvent);
                        divBg.addEventListener('touchend', mouseupEvent);
                        divBg.addEventListener('touchcancel', mouseupEvent);
                        divBg.addEventListener('touchmove', mousemoveEvent);
                        divBg.addEventListener('mousedown', mousedownEvent);
                        divBg.addEventListener('mouseup', mouseupEvent);
                        divBg.addEventListener('mouseleave', mouseupEvent);
                        divBg.addEventListener('mousemove', mousemoveEvent);
                    }

                    // 定义道具的宽度
                    const boardFactor = app.screen.width / 1588 * 1.4
                    const boardWidth = 88 * boardFactor

                    function openRewardResult(counts) {
                        maskDiv.show()
                        // const clickContinue = ui.create.div('.clickContinue', maskDiv)
                        // clickContinue.innerText = '请点击屏幕空白处继续'

                        // 打开奖励窗口
                        let resource = app.loader.resources
                        // 圆盘
                        const yuan_pan = new PIXI.Sprite(resource.rr_yuan_pan.texture)
                        yuan_pan.anchor.set(0.5)
                        yuan_pan.x = app.screen.width / 2;
                        yuan_pan.y = app.screen.height * 0.48;
                        yuan_pan.scale.set(app.screen.width / yuan_pan.texture.orig.width * 0.25)
                        app.stage.addChild(yuan_pan)

                        yuan_pan.rotateForever = (delta) => {
                            yuan_pan.rotation += 0.01 * delta;
                        }

                        app.ticker.add(yuan_pan.rotateForever);

                        // 奖励区
                        const back = new PIXI.Sprite(resource.back.texture)
                        back.scale.set(app.screen.width / back.texture.orig.width * 0.62)
                        back.anchor.set(0.5)
                        back.x = app.screen.width / 2;
                        back.y = app.screen.height * 0.54;
                        app.stage.addChild(back)


                        // 文字
                        const title = new PIXI.Sprite(resource.title.texture)
                        title.anchor.set(0.5)
                        let titleSize = app.screen.width / title.texture.orig.width * 0.15
                        title.scale.set(titleSize * 1.5)
                        title.x = app.screen.width / 2;
                        title.y = back.y - back.height * 0.5;
                        app.stage.addChild(title)

                        const ease = new Ease.Ease()
                        ease.add(title, {scale: titleSize   }, {repeat: false, duration: 500})

                        // 奖励道具边框


                        // 可滑动的窗口, 滑动奖励区域
                        let scrollBoxWidth = boardWidth * 6 + 5 * boardWidth * 0.2
                        let scrollBoxHeight = boardWidth * 2 + 20
                        const scrollbox = new Scrollbox.Scrollbox({
                            boxWidth: scrollBoxWidth,
                            boxHeight: scrollBoxHeight,
                            overflowY: 'hidden',
                            overflowX: 'none',
                            // stopPropagation: false,
                            dragScroll: false

                        })
                        scrollbox.x = back.x - (scrollBoxWidth / 2);
                        scrollbox.y = back.y - (scrollBoxHeight / 2)

                        // const scrollbox = new Scrollbox.Scrollbox({
                        //     boxWidth: (88 * 6 + 5 * 40 + 120) * 0.6,
                        //     boxHeight: (88 * 2 ),
                        //     overflowY: 'hidden',
                        //     overflowX: 'none',
                        //     // stopPropagation: false,
                        //     dragScroll: false
                        //
                        // })
                        // scrollbox.x = back.x - (88 + 40) * 0.6 * 2 - 60 * 0.6 - 88 * 0.6;
                        // scrollbox.y = back.y - 138 * 0.6 - 20
                        // 抽取盒子
                        function drawOutBox(count) {
                            // 根据当前盒子设置的稀有度等东西, 进行抽取
                            // 方法, 将所有权重按从小到大的顺序铺好 随机抽取一个数字, 看数字落在哪个区间里, 就表示抽取到了哪个
                            let result = []
                            let start = 0
                            let total_weight = 0
                            let current_weight = 0
                            const weight_steps = currenBox.items.map(itemInfo => {
                                total_weight += itemInfo.weight
                                return total_weight
                            })

                            // 放入必中的保底
                            skinSwitch.czgSettings.fixed.forEach(i => {
                                result.push({
                                    id: i.id,
                                    name: i.name,
                                    count: count * i.count
                                })
                            })

                            let randomR
                            // 模拟抽取
                            for (let i = 0; i < count; i++) {
                                randomR = Math.random() * total_weight
                                for (let j = 0; j < weight_steps.length; j++) {
                                    if (randomR < weight_steps[j]) {
                                        let isExist = false
                                        // 如果存在, 则返回的结果数量累计
                                        for (let r of result) {
                                            if (r.id === currenBox.items[j].id){
                                                r.count = (r.count || 1) + (currenBox.items[j].count || 1)
                                                isExist = true
                                                if (currenBox.items[j].gaoji) {
                                                    r.gaoji = currenBox.items[j].gaoji
                                                }

                                                if (currenBox.items[j].weight < (r.weight || 1000)) {
                                                    r.weight = currenBox.items[j].weight
                                                }
                                                break;
                                            }
                                        }
                                        if (!isExist) {
                                            result.push({...currenBox.items[j]});
                                        }
                                        break
                                    }
                                }
                            }
                            return result

                        }

                        let results = drawOutBox(counts)

                        // 将抽奖结果添加到统计里面
                        for (let r of results) {
                            let v = totalRewards.items[r.id] || {id: r.id, name: r.name, count: 0, weight: r.weight || 3000}
                            if (v.weight && v.weight > r.weight) {
                                v.weight = r.weight
                            }
                            v.count += r.count || 1
                            totalRewards.items[r.id] = v
                        }

                        // 排序一下, 将稀有的物品放到前面
                        if (results.length > 8) {
                            results.sort((a, b) => {
                                let w1 = a.weight || 1000
                                let w2 = b.weight || 1000
                                return w1 - w2
                            });
                        }
                        // 从中间开始闪现出现items, 4个4个一起出现
                        game.playAudio('../extension/皮肤切换/images/cangZhenGe/mp3/guo1.mp3')
                        for (let i = 0; i < results.length; i++) {
                            let itemInfo = results[i]

                            const _drawItem = (i) => {
                                let rewardItem = drawItem(itemInfo, itemInfo.count || 1, resource, i < 12)

                                if (results.length <= 6) {

                                    if (results.length <= 4) {
                                        let startX = (scrollBoxWidth - results.length * boardWidth * 1.2) / 2
                                        rewardItem.x = startX * 1.7  + (boardWidth * 1.1) * (i % results.length);
                                    } else if (results.length === 5) {
                                        let startX = (scrollBoxWidth - results.length * boardWidth * 1.1) / 2
                                        rewardItem.x = startX * 1.5 + (boardWidth * 1.1) * (i % results.length);
                                    } else {
                                        let startX = (scrollBoxWidth - 6 * boardWidth) / 2
                                        rewardItem.x = startX * 1.5   + (boardWidth * 1.05) * (i % 6);
                                    }
                                    rewardItem.y = 56
                                } else if (results.length < 12) {
                                    let startX = (scrollBoxWidth - 6 * boardWidth) / 2
                                    rewardItem.x = startX * 1.5   + (boardWidth * 1.05) * (i % 6);
                                    rewardItem.y = 20 + parseInt(i / 6) * boardWidth * 1.2
                                } else {
                                    let startX = (scrollBoxWidth - 6 * boardWidth) / 2
                                    rewardItem.x = startX * 2   + (boardWidth * 0.96) * (i % 6);
                                    rewardItem.y = 20 + parseInt(i / 6) * boardWidth * 1.2

                                }


                                scrollbox.content.addChild(rewardItem)
                            }

                            if (i < 12) {
                                let firstIndex = []
                                let secondIndex = []
                                let lastIndex = []
                                if (results.length === 4) {
                                    firstIndex = [1, 2]
                                    secondIndex = [0, 3]
                                } else if (results.length === 5) {
                                    firstIndex = [1, 2, 3]
                                    secondIndex = [0, 4]
                                } else {
                                    firstIndex = [2, 3, 8, 9]
                                    secondIndex = [1, 4, 7, 10]
                                    lastIndex = [0, 5, 6, 11]
                                }
                                if (firstIndex.includes(i)) {
                                    _drawItem(i)
                                } else if (secondIndex.includes(i)){
                                    setTimeout(() => {
                                        _drawItem(i)
                                    }, 350)
                                } else {
                                    // 最后一批出现
                                    setTimeout(() => {
                                        _drawItem(i)
                                    }, 700)
                                }
                            } else {
                                _drawItem(i)
                            }

                        }

                        // 为了防止内容撑不开容器, 再添加一个透明的填充物
                        const tmp = new PIXI.Sprite.from(PIXI.Texture.EMPTY)
                        tmp.height = 100
                        tmp.width = 50

                        // 添加星星spine
                        // debugger
                        // set the position
                        setTimeout(() => {
                            const xingxingAni = new PIXI.spine.Spine(resource.gongxihuode_lizi.spineData);
                            let localPos = xingxingAni.getLocalBounds()  // 骨骼的本地坐标
                            let scale
                            scale = scrollBoxWidth/ localPos.width * 0.15
                            // 设置绝对偏移
                            xingxingAni.scale.set(0.5 * boardFactor);  // 设置新的大小后, 本地坐标会进行偏移
                            // 设置相对canvas的中心
                            xingxingAni.position.set(
                                -localPos.x + (scrollBoxWidth / 3 ) / 2,
                                -localPos.y + (scrollBoxHeight / 2) / 2 ,
                            )
                            window.xingxingAni = xingxingAni
                            xingxingAni.state.timeScale = 0.6
                            setDefaultAni(xingxingAni, true)
                            scrollbox.content.addChild(xingxingAni)
                        }, 2000)

                        scrollbox.content.addChild(tmp)

                        // scrollbox.boxHeight = scrollbox.content.children[0].children[0].height * 1.8
                        scrollbox.update()

                        // 奖励物品可以滑动
                        // add the viewport to the stage
                        app.stage.addChild(scrollbox)


                        // 页面上添加一个透明的div框来进行拖拽滑动
                        const dragDiv = ui.create.div('.drag-div')
                        dragDiv.style.width = scrollbox.boxWidth + 'px'
                        dragDiv.style.height = scrollbox.boxHeight * 1.8 + 'px'
                        div.appendChild(dragDiv)

                        // 添加文字提示, 继续

                        const continueTitleStyle = new PIXI.TextStyle({
                            fontFamily: 'shousha',
                            fontSize: parseInt(18 * boardFactor),
                            fill: '#DEB887',
                            letterSpacing: 1
                        })
                        const continueTitle = new PIXI.Text('请点击屏幕空白处继续', continueTitleStyle)
                        continueTitle.x = back.x - continueTitle.width / 2;
                        continueTitle.y = back.y + back.height / 2
                        app.stage.addChild(continueTitle);

                        bindDragEvent(dragDiv, scrollbox)
                        // 定义关闭当前奖励窗口函数
                        closeRewardResultWindow = function () {
                            yuan_pan.destroy()
                            app.ticker.remove(yuan_pan.rotateForever)
                            title.destroy()
                            back.destroy()
                            continueTitle.destroy()
                            scrollbox.destroy()
                            div.removeChild(dragDiv)
                        };

                        window.pixiApp = app
                        window.pixiBeiJing = boxbeijing
                    }

                    openAll.listen(function () {
                        game.playAudio('../extension/皮肤切换/images/cangZhenGe/mp3/knock.mp3')
                        if (boxbeijing) {
                            boxbeijing.state.setAnimation(0, 'play2', false);
                            boxbeijing.state.addAnimation(0, 'play1', true, 4);
                            game.playAudio('../extension/皮肤切换/images/cangZhenGe/mp3/guo.mp3')
                            let lis  =  {
                                complete: function (track) {
                                    boxbeijing.state.setAnimation(0, 'play1', true)
                                    boxbeijing.state.remove
                                    // 打开奖励窗口
                                    let c = skinSwitch.czgSettings.drawCount || 50
                                    openRewardResult(c)
                                    boxbeijing.state.removeListener(lis)
                                    totalRewards.totalCount += c
                                    refreshStatData()
                                }
                            }

                            boxbeijing.state.listeners = [lis]
                        }
                    })
                    //
                    openOne.listen(function () {
                        if (boxbeijing) {
                            boxbeijing.state.setAnimation(0, 'play2', false);
                            boxbeijing.state.addAnimation(0, 'play1', true, 4);

                            let lis  =  {
                                complete: function (track) {
                                    boxbeijing.state.setAnimation(0, 'play1', true)
                                    boxbeijing.state.remove
                                    // 打开奖励窗口
                                    openRewardResult(1)
                                    totalRewards.totalCount += 1
                                    refreshStatData()
                                    boxbeijing.state.removeListener(lis)
                                }
                            }

                            boxbeijing.state.listeners = [lis]
                        }
                    })

                    // 画预览的道具
                    function drawPreviewItem(itemInfo) {
                        let resource = app.loader.resources
                        // 奖励道具
                        const rewardItem = new PIXI.Container()
                        // 边框
                        const board = new PIXI.Sprite.from(skinSwitch.url + 'images/cangZhenGe/preview_reward.png')
                        rewardItem.addChild(board)
                        board.visible = true
                        board.scale.set(boardWidth / 131)  // 盒子尺寸/素材尺寸  131/88

                        let item
                        if (itemInfo.type === 'wujiang') {
                            item = new PIXI.Sprite.from(skinSwitch.url + `images/cangZhenGe/wujiang/${itemInfo.id}.png`);
                        } else {
                            item = new PIXI.Sprite.from(skinSwitch.url + `images/cangZhenGe/items/${itemInfo.id}.png`);
                        }
                        rewardItem.scale.set(0.6)
                        item.x = boardWidth  * 0.025
                        item.y = boardWidth * 0.01
                        item.scale.set(boardFactor)
                        rewardItem.addChild(item)

                        // 高级物品的边框
                        if (itemInfo.gaoji) {
                            // 如果是高级道具, 添加边框特效
                            let gaojidaoju = new PIXI.spine.Spine(resource.gongxihuode_biankuang.spineData);
                            rewardItem.addChild(gaojidaoju)
                            setDefaultAni(gaojidaoju, true)
                            let localPos = gaojidaoju.getLocalBounds()
                            gaojidaoju.position.set(
                                -localPos.x + (boardWidth  - localPos.width) / 2 + 2,
                                -localPos.y + (boardWidth - localPos.height) / 2,
                            )
                            gaojidaoju.state.timeScale = 1
                            gaojidaoju.scale.set(0.88 * boardFactor)
                            gaojidaoju.zIndex = -1
                        }

                        rewardItem.sortableChildren = true

                        // 预览物品有点特殊, 只有宝珠物品需要区分66和单个, 也只有66宝珠需要画数量
                        // 添加宝珠物品的数量, 只有权重少于100并且数量大于1的才显示数字
                        if (itemInfo.count && itemInfo.count > 1 && itemInfo.weight < 100) {
                            const countStyle = new PIXI.TextStyle({
                                fontFamily: 'shousha',
                                fontSize: parseInt(19 * boardFactor),
                                fill: 'white',
                                letterSpacing: true
                            });

                            const itemCount = new PIXI.Text(`x${itemInfo.count}`, countStyle);
                            itemCount.x = boardWidth - itemCount.width - 5;
                            itemCount.y = board.y + boardWidth - itemCount.height - 5
                            rewardItem.addChild(itemCount);
                        }
                        // 中文的换行宽度设置可能不起作用, 需要自己手动添加换行符, 分隔符等进行换行
                        // 添加宝主物品的文字显示
                        const style = new PIXI.TextStyle({
                            fontFamily: 'shousha',
                            fontSize: parseInt(20 * boardFactor),
                            fill: 'white',
                            wordWrap: true,
                            // breakWords: true,
                            // wordWrapWidth: 20,
                            align: 'center',
                            lineJoin: 'round',
                            leading: 0,
                        });
                        let name = itemInfo.name
                        let newName = ''
                        for (let i = 0; i < name.length; i+=5) {
                            if (i > 0) {
                                newName += ' '
                            }
                            newName += name.slice(i, i + 5)
                        }
                        const itemName = new PIXI.Text(newName, style);
                        itemName.x = boardWidth / 2 - itemName.width / 2;
                        itemName.y = boardWidth + 10

                        rewardItem.addChild(itemName);

                        return rewardItem


                    }

                    // 显示右下角的按钮组
                    const btnGroups = ui.create.div('.cbgBtnsGroup', div)
                    const tehui = ui.create.div('.cbgTehuiBtn', btnGroups)  // 特惠
                    const xinyuan = ui.create.div('.cbgXinyuanBtn', btnGroups) // 心愿商城
                    const preview = ui.create.div('.cbgYuranBtn', btnGroups)  // 预览
                    preview.listen(() => {
                        previewReward()
                    })
                    // 预览当前盒子的奖励物品
                    function previewReward() {
                        boxBugTip.style.zIndex=-1;
                        const resource = app.loader.resources
                        const previewContaner = new PIXI.Container()
                        const back = new PIXI.Sprite(resource.previewBox.texture);
                        back.scale.set((boardWidth * 5 + boardWidth * 0.25 * 4) / 1037)
                        back.anchor.set(0.5)
                        back.x = app.screen.width / 2;
                        back.y = app.screen.height * 0.54;
                        // 添加背景框
                        previewContaner.addChild(back)

                        // 添加一个可以滑动的窗口
                        let scrollBoxWidth = (boardWidth * 5 + 4 *boardWidth * 0.25)
                        let scrollBoxHeight = (boardWidth * 3)
                        const scrollbox = new Scrollbox.Scrollbox({
                            boxWidth: scrollBoxWidth,
                            boxHeight:scrollBoxHeight,
                            overflowY: 'hidden',
                            overflowX: 'none',
                            // stopPropagation: false,
                            dragScroll: false

                        })

                        scrollbox.x = back.x - (scrollBoxWidth / 2);
                        scrollbox.y = back.y - (scrollBoxHeight / 2)
                        // scrollbox.x = back.x - (88 + 25) * 0.6 * 2 - 60 * 0.6 - 88 * 0.6;
                        // scrollbox.y = back.y - 88 * 1.5
                        // 抽取盒子

                        function getPreviewItems() {

                            maskDiv.show()

                            let idSet = new Set()
                            let result = []
                            // 放入必中的保底
                            skinSwitch.czgSettings.fixed.forEach(i => {
                                result.push({
                                    id: i.id,
                                    name: i.name,
                                    weight: 3000,  // 默认保底奖励, 权重3000
                                })
                            })

                            for (let item of currenBox.items) {
                                if (idSet.has(item.id)) {
                                    if (item.weight && item.weight <= 100) {
                                        result.push({...item})
                                        idSet.add(item.id)
                                    }
                                } else {
                                    idSet.add(item.id)
                                    result.push({...item})
                                }
                            }

                            // 排序一下, 将稀有的物品放到前面
                            result.sort((a, b) => {
                                let w1 = a.weight || 1000
                                let w2 = b.weight || 1000
                                return w1 - w2
                            })

                            return result
                        }

                        let results = getPreviewItems()

                        // 遍历所有的奖励框
                        for (let i = 0; i < results.length; i++) {
                            let info = results[i]
                            // 和之前一样的逻辑将奖励物品画进去
                            const pItem = drawPreviewItem(info)
                            let startX = (scrollBoxWidth - 5 * boardWidth) / 2
                            pItem.x = startX * 1   + (boardWidth * 1.05) * (i % 5);
                            pItem.y = 6 + parseInt(i / 5) * boardWidth
                            scrollbox.content.addChild(pItem)

                        }
                        scrollbox.content.top = 0

                        previewContaner.addChild(scrollbox)
                        scrollbox.update()
                        window.preBox = scrollbox
                        const dragDiv = ui.create.div('.drag-div')
                        dragDiv.style.width = scrollbox.boxWidth + 'px'
                        dragDiv.style.height = scrollbox.boxHeight * 1.8 + 'px'
                        div.appendChild(dragDiv)
                        bindDragEvent(dragDiv, scrollbox)

                        // 为了防止内容撑不开容器, 再添加一个透明的填充物
                        // const tmp = new PIXI.Sprite.from(PIXI.Texture.EMPTY)
                        // tmp.height = 100
                        // tmp.width = 50
                        // scrollbox.content.addChild(tmp)

                        app.stage.addChild(previewContaner)

                        // 定义关闭函数
                        closeRewardPreviewWindow = function () {
                            console.log('销毁预览窗口')
                            boxBugTip.style.zIndex=1;
                            previewContaner.destroy({children: true})
                            div.removeChild(dragDiv)
                        }
                    }

                    // 加载动画
                    loadAnimations()
                    // openRewardResult(50)


                },



                // todo: 通过点击角色身上的按钮,打开设置动皮的变身事件
                openEventBindWindow: function (player, isPrimary) {

                    const eventBindWindow = ui.create.div('.eventBindWindow', document.body)
                    const eventBindToolBox = ui.create.div('.eventBindToolBox', eventBindWindow)
                    const toolItems = ui.create.div('.toolItems', eventBindToolBox)

                    const triggerSelectOut = ui.create.div('.triggerSelectOut', toolItems)
                    const transformBtn = ui.create.div('.transformBtn .eventBindButton .success', toolItems)
                    const playEffectBtn = ui.create.div('.playEffectBtn .eventBindButton .success', toolItems)
                    const previewBtn = ui.create.div('.previewBtn .eventBindButton .success', toolItems)
                    const saveEffect = ui.create.div('.eventBindButton .success', toolItems)
                    const exit = ui.create.div('.eventBindButton .success', toolItems)
                    triggerSelectOut.innerHTML = `
                        <select id="triggerSelect" class="triggerSelect"></select> 
                    `
                    const triggerSelect = document.getElementById('triggerSelect')
                    transformBtn.innerText = '变换'
                    playEffectBtn.innerText = '播放特效'
                    previewBtn.innerText = '预览'
                    saveEffect.innerText = '保存'
                    exit.innerText = '退出'

                    const transformContent = ui.create.div('.transformContent', eventBindWindow)
                    const contentHeaders = ui.create.div('.contentHeaders', transformContent)  // 内容区域的选项区域
                    const contentArea = ui.create.div('.contentArea', transformContent)  // 内容区域真正内容

                    const transTemps = document.createElement('select')
                    contentHeaders.appendChild(transTemps)
                    const sameSkel = ui.create.div('.eventBindButton', contentHeaders)
                    const diffSkel = ui.create.div('.eventBindButton', contentHeaders)
                    const newTemp = ui.create.div('.eventBindButton', contentHeaders)


                    sameSkel.innerText = '同骨骼'
                    diffSkel.innerText = '不同骨骼'
                    newTemp.innerText = '新建'

                    // 初始化预览播放器, 共用十周年UI定义的播放器的canvas
                    if (!skinSwitch.animationManager) {
                        skinSwitch.animationManager = new AnimationManager(lib.assetURL + 'extension/十周年UI/assets/animation/', dcdAnim.canvas, 988888, { offscreen: false })
                    }
                    const am = skinSwitch.animationManager

                    // 一些常量
                    const dyskins = decadeUI.dynamicSkin
                    const dyskinKeys = Object.keys(dyskins)

                    // 一些初始化函数
                    const initOptions = (selectDom, keyValueMap, func) => {
                        selectDom.options.length = 0
                        for (let k in keyValueMap) {
                            let text = keyValueMap[k]
                            let option = document.createElement('option')
                            option.setAttribute('value', k)
                            option.text = text
                            selectDom.options.add(option)
                        }
                        if (func) {
                            selectDom.onchange = function (e) {
                                func(this.options[this.selectedIndex].value, e)
                            }
                        }

                    }

                    // 初始化同骨骼的内容
                    const initSameSkelInfo = () => {
                        contentArea.innerHTML = `
                            <div class="sameBox">
                                <div class="sameBoxItem">
                                    <div class="label">标签</div>
                                    <select id="sameActionSelect" class="sameActionSelect"></select> 
                                </div>
                                <div class="sameBoxItem">
                                    <div class="label">皮肤</div>
                                    <select id="sameSkinSelect" class="sameSkinSelect"></select> 
                                </div>
                                <div class="sameBoxItem">
                                    <div class="label">血量</div>
                                    <select id="sameHpSelect" class="sameHpSelect"></select> 
                                    <input type="text">
                                </div>
                            </div>
                        `
                    }

                    let transformTempKV = {
                        变身1: '变身1',
                        变身2: '变身2',
                    }
                    initOptions(transTemps, transformTempKV)
                    // 初始化不同骨骼的内容
                    const initDiffSkelInfo = () => {
                        contentArea.innerHTML = `
                            <div class="adjustBox">
                                <div class="title">角色调整</div>
                                <div class="closeBtn">×</div>
                                <div class="btnGroup">
                                    <div class="btnItem" id="daijiBtn">调整待机</div>
                                    <div class="btnItem" id="beijingBtn">调整背景</div>
                                    <div class="btnItem" id="qianjingBtn">调整前景</div>
                                    <div class="btnItem" id="chukuangBtn">调整出框</div>
                                    <div class="btnItem" id="chuchangBtn">调整出场</div>
                                    <div class="btnItem" id="teshuBtn">调整特殊</div>
                                    <div class="btnItem" id="zhishixianBtn">调整指示线</div>

                                </div>
                                <div class="bottomBtns">
                                    <div class="btnItem" id="saveBtn">保存</div>
                                    <div class="btnItem" id="cancelBtn">返回</div>
                                </div>
                            </div>
                        `
                        const daijiBtn = document.getElementById('daijiBtn')
                        const beijingBtn = document.getElementById('beijingBtn')
                        const qianjingBtn = document.getElementById('qianjingBtn')
                        const chukuangBtn = document.getElementById('chukuangBtn')
                        const chuchangBtn = document.getElementById('chuchangBtn')
                        const teshuBtn = document.getElementById('teshuBtn')
                        const zhishixianBtn = document.getElementById('zhishixianBtn')

                        const saveBtn = document.getElementById('saveBtn')
                        const cancelBtn = document.getElementById('cancelBtn')
                        const closeBtn = document.querySelector('.closeBtn')

                        // 当前选中的按钮
                        let currentBtn = null

                        // 按钮点击处理函数
                        const handleBtnClick = (btn, mode) => {
                            if (currentBtn) {
                                currentBtn.classList.remove('btnSelect')
                            }
                            btn.classList.add('btnSelect')
                            currentBtn = btn
                            currentMode = mode  // 设置当前模式

                            // 显示调整界面
                            showAdjustBar()
                            showShizi(true)
                            initPosParams()

                            // 播放对应动画
                            if (mode === 'chuchang') {
                                skinSwitch.chukuangWorkerApi.chukuangAction(player, 'chuchang')
                            } else if (mode === 'chukuang') {
                                skinSwitch.chukuangWorkerApi.chukuangAction(player, 'GongJi')
                            } else if (mode === 'teshu') {
                                skinSwitch.chukuangWorkerApi.chukuangAction(player, 'TeShu')
                            } else if (mode === 'zhishixian') {
                                // 播放指示线动画，需要模拟攻击事件来触发指示线
                                playZhishixianAnimation()
                            } else {
                                selfLoopPlay(mode)
                            }
                        }

                        // 保存按钮
                        saveBtn.addEventListener('click', () => {
                            // 保存当前调整
                            saveCurrentModeAdjustment()

                            // 只保存当前模式的调整参数
                            saveToFile(true) // 传入true表示显示保存消息

                            // 从临时调整中移除当前已保存的模式
                            if (tempAdjustments[currentMode]) {
                                delete tempAdjustments[currentMode]
                            }
                        })

                        // 取消按钮
                        cancelBtn.addEventListener('click', () => {
                            // 隐藏调整界面
                            hide(editBox)
                        })

                        // 关闭按钮
                        closeBtn.addEventListener('click', () => {
                            // 隐藏调整界面
                            hide(editBox)
                        })

                        // 指示线动画播放函数
                        const playZhishixianAnimation = () => {
                            // 检查当前角色是否有指示线配置
                            let playerParams = player.dynamic.primary.player
                            if (!playerParams.zhishixian) {
                                return
                            }

                            // 模拟攻击事件来触发指示线
                            let targets = game.players.filter(p => p !== player && p.isAlive())
                            if (targets.length === 0) {
                                // 如果没有其他玩家，创建一个虚拟目标
                                targets = [{
                                    getBoundingClientRect: () => ({
                                        left: window.innerWidth * 0.7,
                                        top: window.innerHeight * 0.5,
                                        width: 100,
                                        height: 150
                                    }),
                                    checkBoundsCache: () => { }
                                }]
                            }

                            // 构造指示线参数
                            let args = {
                                hand: null,
                                attack: {},
                                targets: [],
                                bodySize: {
                                    bodyWidth: decadeUI.get.bodySize().width,
                                    bodyHeight: decadeUI.get.bodySize().height
                                }
                            }

                            // 获取攻击方位置
                            if (player.checkBoundsCache) player.checkBoundsCache(true)
                            args.attack = player.getBoundingClientRect()

                            // 获取目标位置（选择第一个目标）
                            let target = targets[0]
                            if (target.checkBoundsCache) target.checkBoundsCache(true)
                            args.targets.push({
                                boundRect: target.getBoundingClientRect(),
                            })

                            // 如果是玩家，添加手牌区域
                            if (player === game.me && dui.boundsCaches && dui.boundsCaches.hand) {
                                let hand = dui.boundsCaches.hand
                                hand.check()
                                let x1 = hand.x + hand.width / 2
                                let y1 = hand.y
                                args.hand = {
                                    x1: x1,
                                    y1: y1
                                }
                            }

                            // 播放指示线动画
                            skinSwitch.chukuangWorkerApi.chukuangAction(player, 'GongJi', {
                                attackArgs: args,
                                triggername: 'useCard'
                            })
                        }

                        // 添加按钮点击事件
                        daijiBtn.addEventListener('click', () => handleBtnClick(daijiBtn, 'daiji'))
                        beijingBtn.addEventListener('click', () => handleBtnClick(beijingBtn, 'beijing'))
                        qianjingBtn.addEventListener('click', () => handleBtnClick(qianjingBtn, 'qianjing'))
                        chukuangBtn.addEventListener('click', () => handleBtnClick(chukuangBtn, 'chukuang'))
                        chuchangBtn.addEventListener('click', () => handleBtnClick(chuchangBtn, 'chuchang'))
                        teshuBtn.addEventListener('click', () => handleBtnClick(teshuBtn, 'teshu'))
                        zhishixianBtn.addEventListener('click', () => {
                            // 检查当前角色是否有指示线配置
                            let playerParams = player.dynamic.primary.player
                            if (!playerParams.zhishixian) {
                                alert('当前皮肤没有设置指示线动画配置')
                                return
                            }
                            handleBtnClick(zhishixianBtn, 'zhishixian')
                        })



                        const lettersList = ['ABCDEFGHIJKLM', 'NOPQRSTUVWXYZ']
                        const defaultTransformDir = 'extension/皮肤切换/effects/transform'

                        searchPlayerIdBtn.listen(function (e) {
                            let inputVal = this.previousElementSibling.value
                            let wujiangIds = searchWuJiangId(inputVal)
                            initWuJiangIds(wujiangIds)
                            refreshSelectLetter(null)
                        })

                        for (let i = 0; i < 2; i++) {
                            const letterChild = letterDiv.children[i]
                            const letters = lettersList[i]

                            for (let t of letters) {
                                let span = document.createElement('span')
                                span.innerText = t
                                span.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
                                    let letter = this.innerText
                                    let wujiangIds = searchWuJiangId(letter, true)
                                    refreshSelectLetter(letter)
                                    // 改变下面的武将id列表
                                    initWuJiangIds(wujiangIds)

                                })
                                letterChild.appendChild(span)
                            }
                        }

                        const refreshSelectLetter = (selected) => {
                            for (let i = 0; i < 2; i++) {
                                const letterChild = letterDiv.children[i]
                                for (let span of letterChild.children) {
                                    if (span.innerText === selected) {
                                        span.classList.add('firstActive')
                                    } else {
                                        span.classList.remove('firstActive')
                                    }
                                }
                            }
                        }

                        const initWuJiangIds = (wujiangIds) => {
                            for (let i = wujiangIdList.children.length - 1; i >= 0; i--) {
                                wujiangIdList.children[i].remove()
                            }
                            for (let i = 0; i < wujiangIds.length; i++) {
                                let idDiv = ui.create.div('.wujiangIdItem', wujiangIdList);
                                idDiv.style.cursor = 'pointer';
                                idDiv.innerText = wujiangIds[i];
                                idDiv.listen(function () {
                                    // 更新当前武将所对应的皮肤.
                                    let wujiangId = this.innerText
                                    const skins = decadeUI.dynamicSkin[wujiangId]
                                    let keys = Object.keys(skins)
                                    let keysMap = {}
                                    for (let k of keys) {
                                        keysMap[k] = k
                                    }
                                    initOptions(wujiangSkinSelect, keysMap)
                                });
                            }
                        }

                        // 获取所有的切换骨骼特效
                        const initTransformEffect = () => {
                            let allEffects = {}
                            for (let k in skinSwitch.effects.transformEffects) {
                                allEffects[k] = Object.assign({}, skinSwitch.effects.transformEffects[k])
                            }
                            pfqhUtils.getFoldsFiles(defaultTransformDir, function (file, path) {
                                let suffixes = ['.json', '.skel']
                                for (let suf of suffixes) {
                                    if (file.endsWith(suf)) {
                                        return true
                                    }
                                }
                                return false
                            }, function (folds, files) {
                                // 获取所有的特效
                                for (let f of files) {
                                    let name = f.substring(0, f.lastIndexOf("."))
                                    let ext = f.substring(f.lastIndexOf(".") + 1)
                                    if (name in allEffects) {

                                    } else {
                                        allEffects[name] = {
                                            scale: 0.5,  // 默认的参数值
                                            speed: 1,
                                            delay: 0.3,
                                            json: ext === 'json'
                                        }
                                    }
                                }
                                let optionKeys = {}
                                for (let k in allEffects) {
                                    optionKeys[k] = k
                                }
                                initOptions(transEffectSelect, optionKeys, function (key, e) {
                                    let eff = allEffects[key]
                                    if (eff) {
                                        transItemScale.value = eff.scale || 0.5
                                        transItemDelay.value = eff.delay || 0.3
                                        transItemSpeed.value = eff.speed || 1
                                        transItemAngle.value = eff.angle || 0
                                        if (eff.x) {
                                            transItemX.value = eff.x[1]
                                        } else {
                                            transItemX.value = null
                                        }
                                        if (eff.y) {
                                            transItemY.value = eff.y[1]
                                        } else {
                                            transItemY.value = null
                                        }
                                    }
                                })

                            })
                        }

                        setTimeout(() => {
                            initTransformEffect()
                        }, 2000)

                    }

                    const searchWuJiangId = (str, isFirstLetter = false) => {
                        if (isFirstLetter) {
                            return dyskinKeys.filter(v => {
                                return v[0].toLowerCase() === str.toLowerCase()
                            })
                        }
                        return dyskinKeys.filter(v => {
                            return v.toLowerCase().indexOf(str.toLowerCase()) !== -1
                        })
                    }

                    // const playEffectContent = ui.create.div('.playEffectContent', eventBindWindow)

                    const triggerConstant = {
                        lowhp: '血量变化',
                        jisha: '击杀',
                        changeGroup: '改变势力',
                        juexing: '觉醒技',
                        xiandingji: '限定技',
                        zhuanhuanji: '转换技',
                        damage: '受伤次数',
                        roundCount: '回合计数',
                        phaseBegin: '回合开始',
                        phaseEnd: '回合结束',
                    }

                    initOptions(triggerSelect, triggerConstant)

                    // initSameSkelInfo()
                    initDiffSkelInfo()

                },

                // 管理滑动事件 status: true  -> 开启
                allowTouchEvent: function (status) {
                    let thunderForbidTouch = function () {
                        _status.th_swipe_up = lib.config.swipe_up;
                        lib.config.swipe_up = ''
                        _status.th_swipe_down = lib.config.swipe_down;
                        lib.config.swipe_down = ''
                        _status.th_swipe_left = lib.config.swipe_left;
                        lib.config.swipe_left = ''
                        _status.th_swipe_right = lib.config.swipe_right;
                        lib.config.swipe_right = ''
                        _status.th_gamePause = ui.click.pause
                        ui.click.pause = () => { }
                    }

                    let thunderAllowTouch = function () {
                        if (_status.th_swipe_up) {
                            lib.config.swipe_up = _status.th_swipe_up
                            lib.config.swipe_down = _status.th_swipe_down
                            lib.config.swipe_left = _status.th_swipe_left
                            lib.config.swipe_right = _status.th_swipe_right
                            ui.click.pause = _status.th_gamePause
                        }
                    }
                    if (status) {
                        thunderAllowTouch()
                    } else {
                        thunderForbidTouch()
                    }
                },

                // 覆盖menu菜单
                overrideExtL2dMenuItem: function () {
                    // 修改配置, 只获取前10个
                    let count = 10
                    if (window.pfqhLive2dSettings) {
                        let newItem = {};
                        for (let k in pfqhLive2dSettings.models) {
                            if (!count) break
                            count--
                            newItem[k] = pfqhLive2dSettings.models[k].name || k
                        }

                    }
                },
                /**
                 * 使用requestAnimationFrame函数来等待某个退出条件, 主要用来等待十周年Ui这种扩展执行完成, 然后执行之后的逻辑.
                 * @param conditionFunc  达到条件, 执行execFunc的内容
                 * @param execFunc  执行的内容
                 */
                waitUntil: function (conditionFunc, execFunc) {
                    if (conditionFunc()) {
                        execFunc()
                    } else {
                        requestAnimationFrame(function () {
                            skinSwitch.waitUntil(conditionFunc, execFunc)
                        })
                    }
                },

                // 刷新设置一组dom只有一个active状态.
                refreshDomList: function (domList, activeClass, activeItem) {
                    for (let dom of domList) {
                        if (dom === activeItem) {
                            dom.classList.add(activeClass)
                        } else {
                            dom.classList.remove(activeClass)
                        }
                    }
                },
                // 封装长按事件
                continuousClick: function (dom, func) {
                    const downEvent = lib.config.touchscreen ? 'touchstart' : 'mousedown'
                    const upEvent = lib.config.touchscreen ? 'touchend' : 'mouseup'
                    const cancelEvent = lib.config.touchscreen ? 'touchcancel' : 'mouseleave'

                    let downFunc = function (e) {
                        // 改变骨骼的位置
                        //获取鼠标按下时的时间
                        let t = setInterval((e) => { func(e, ++downFunc._times) }, 120)
                        clearInterval(downFunc.timer)
                        downFunc.timer = t
                        downFunc._times = 0  // 表示触发了多少次
                        func(e, ++downFunc._times)  // 立马执行一次
                    }
                    let holdUp = function () {
                        clearInterval(downFunc.timer);
                        downFunc._times = 0
                    }

                    dom.addEventListener(downEvent, downFunc)
                    dom.addEventListener(upEvent, holdUp)
                    dom.addEventListener(cancelEvent, holdUp)

                }
            }

            skinSwitch.lib = lib
            skinSwitch.game = game
            skinSwitch.ui = ui
            skinSwitch.get = get

            skinSwitch.dynamic.selectSkin.cd = true;

            lib.init.css(skinSwitch.url + "style", "base")
            if (lib.config[skinSwitch.configKey.useDynamic]) {
                lib.init.css(skinSwitch.url + "style", "dynamic");
            }
            lib.init.css(skinSwitch.url + "style", "edit")
            lib.init.css(skinSwitch.url + "component", "iconfont")
            lib.init.css(skinSwitch.url + "component", "message")
            lib.init.css(skinSwitch.url + "style", "light-modal")
            lib.init.js(skinSwitch.url, 'saveSkinParams', function () {
                if (typeof window.skinSwitchLoadParams === 'function') {
                    window.skinSwitchLoadParams(lib, game, ui, get, ai, _status);
                }
            }, function () {
                skinSwitch.saveSkinParams = {}
            });


            // 加载新的ani
            lib.init.js(skinSwitch.url, 'animation')
            lib.init.js(skinSwitch.url + 'component', 'any-touch.umd.min')
            // 覆盖十周年的spine

            skinSwitch.waitUntil(() => {
                return window.spine
            }, () => {
                lib.init.js(skinSwitch.url, 'spine', function () {
                    lib.init.js(skinSwitch.url + 'spine-lib', 'spine_4_0_64', function () {
                        lib.init.js(skinSwitch.url + 'spine-lib', 'spine_3_8', function () {
                            lib.init.js(skinSwitch.url + 'spine-lib', 'spine_4_1', function () {
                                lib.init.js(skinSwitch.url + 'spine-lib', 'spine_4_2', function () {
                                    lib.init.js(skinSwitch.url, 'animations', function () { })
                                    lib.init.js(skinSwitch.url + 'spine-lib', 'spine_3_5_35', function () { })
                                    lib.init.js(skinSwitch.url + 'spine-lib', 'spine_3_7', function () { })
                                })
                            })
                        })
                    })
                })
            })

            lib.init.js(skinSwitch.url, 'effects', function () {
                for (let k in pfqhSkillEffect) {
                    for (let i = 0; i < pfqhSkillEffect[k].length; i++) {
                        lib.skill[`__pfqh_${k}_${i}`] = pfqhSkillEffect[k][i]
                    }
                }
            })

            let editBox  // 编辑动皮参数的弹窗
            let player   // 当前角色
            let dynamic   // 当前角色的apnode对象, 包含皮肤id
            let renderer  // 当前动皮与worker的通信中继


            // 创建UI
            function editBoxInit() {
                if (editBox) return

                const downEvent = lib.config.touchscreen ? 'touchstart' : 'mousedown'
                const upEvent = lib.config.touchscreen ? 'touchend' : 'mouseup'
                const cancelEvent = lib.config.touchscreen ? 'touchcancel' : 'mouseleave'

                // 当前支持调整的模式
                const modes = {
                    daiji: 'daiji',
                    chukuang: 'chukuang',
                    beijing: 'beijing',
                    qianjing: 'qianjing',
                    chuchang: 'chuchang',
                    teshu: 'teshu',
                    zhishixian: 'zhishixian',
                }
                const funcs = {
                    player: 'player',
                    qhShouSha: 'qhShouSha',  // 千幻手杀大屏
                    qhDecade: 'qhDecade'  // 千幻十周年大屏
                }
                let currentFunc = funcs.player  // 定义当前正在调整的功能
                // 定义一些变量调整参数
                let currentMode = modes.daiji  // 默认调整待机模式
                let adjustX
                let adjustY   // 用于存储当前角色的位置
                let adjustScale
                let adjustAngle = 0 // 调整的角度

                // 用于临时存储多个调整，实现批量保存功能
                let tempAdjustments = {}

                // 循环播放功能
                let selfLoopPlay = function (mode) {
                    // 清除之前的定时器
                    if (selfLoopPlay.loopTimer) {
                        clearInterval(selfLoopPlay.loopTimer);
                        selfLoopPlay.loopTimer = null;
                    }

                    let canvas = player.getElementsByClassName("animation-player")[0];
                    let dynamicWrap
                    if (player.isQhlx) {
                        dynamicWrap = canvas.parentNode;
                    } else {
                        dynamicWrap = player.getElementsByClassName("dynamic-wrap")[0];
                    }

                    // 根据不同模式播放不同动画
                    if (mode === modes.chuchang) {
                        // 播放出场动画，添加循环播放
                        let playChuchang = () => {
                            skinSwitch.chukuangWorkerApi.chukuangAction(player, 'chuchang')
                        }
                        playChuchang(); // 立即播放一次
                        // 设置循环播放，每1秒重复一次
                        selfLoopPlay.loopTimer = setInterval(playChuchang, 1000);
                        // 等待一段时间让动画开始播放
                        setTimeout(() => {
                            initPosParams()
                        }, 300)
                    } else if (mode === modes.teshu) {
                        // 播放特殊动画，添加循环播放
                        let playTeshu = () => {
                            skinSwitch.chukuangWorkerApi.chukuangAction(player, 'TeShu')
                        }
                        playTeshu(); // 立即播放一次
                        // 设置循环播放，每1秒重复一次
                        selfLoopPlay.loopTimer = setInterval(playTeshu, 1000);
                        // 等待一段时间让动画开始播放
                        setTimeout(() => {
                            initPosParams()
                        }, 300)
                    } else if (mode === modes.zhishixian) {
                        // 播放指示线动画，添加循环播放
                        let playZhishixian = () => {
                            // 检查当前角色是否有指示线配置
                            let playerParams = player.dynamic.primary.player
                            if (!playerParams.zhishixian) {
                                return
                            }

                            // 模拟攻击事件来触发指示线
                            let targets = game.players.filter(p => p !== player && p.isAlive())
                            if (targets.length === 0) {
                                return
                            }

                            // 构造指示线参数
                            let args = {
                                hand: null,
                                attack: {},
                                targets: [],
                                bodySize: {
                                    bodyWidth: decadeUI.get.bodySize().width,
                                    bodyHeight: decadeUI.get.bodySize().height
                                }
                            }

                            // 获取攻击方位置
                            player.checkBoundsCache(true)
                            args.attack = player.getBoundingClientRect()

                            // 获取目标位置（选择第一个目标）
                            let target = targets[0]
                            target.checkBoundsCache(true)
                            args.targets.push({
                                boundRect: target.getBoundingClientRect(),
                            })

                            // 如果是玩家，添加手牌区域
                            if (player === game.me) {
                                let hand = dui.boundsCaches.hand
                                if (hand) {
                                    hand.check()
                                    let x1 = hand.x + hand.width / 2
                                    let y1 = hand.y
                                    args.hand = {
                                        x1: x1,
                                        y1: y1
                                    }
                                }
                            }

                            // 播放指示线动画
                            skinSwitch.chukuangWorkerApi.chukuangAction(player, 'GongJi', {
                                attackArgs: args,
                                triggername: 'useCard'
                            })
                        }
                        playZhishixian(); // 立即播放一次
                        // 设置循环播放，每1秒重复一次
                        selfLoopPlay.loopTimer = setInterval(playZhishixian, 1000);
                        // 等待一段时间让动画开始播放
                        setTimeout(() => {
                            initPosParams()
                        }, 300)
                    } else {
                        // 其他模式使用原来的debug方式
                        skinSwitch.postMsgApi.debug(player, mode)
                    }

                    // 判断是否需要出框
                    let needChukuang = false;
                    if (mode === modes.chukuang || mode === modes.zhishixian) {
                        needChukuang = true;
                    } else if (mode === modes.chuchang || mode === modes.teshu) {
                        // 检查当前动皮是否有对应的出框参数
                        let playerParams = player.dynamic.primary.player
                        if (mode === modes.chuchang && playerParams.chuchang && playerParams.chuchang.ck !== false) {
                            needChukuang = true;
                        } else if (mode === modes.teshu && playerParams.shizhounian) {
                            needChukuang = true;
                        }
                    }

                    if (needChukuang) {
                        skinSwitch.rendererOnMessage.addListener(player, 'debugChuKuang', function (e) {
                            dynamicWrap.style.zIndex = "100";
                            canvas.style.position = "fixed";
                            canvas.style.width = "100%";

                            if (player.isQhlx) {
                                let bodyHeight = decadeUI.get.bodySize().height
                                let qhDivHeight = dynamicWrap.parentNode.parentNode.getBoundingClientRect().height
                                let top = (bodyHeight - qhDivHeight) / 2
                                canvas.style.top = -top + 'px'
                                canvas.style.height = Math.round((decadeUI.get.bodySize().height / dynamicWrap.parentNode.parentNode.getBoundingClientRect().height * 100)) + '%'
                                player.style.zIndex = 100
                            } else {
                                canvas.style.height = "100%";
                                player.style.zIndex = 10;
                            }

                            canvas.classList.add('hidden')
                            setTimeout(() => {
                                canvas.classList.remove('hidden')
                            }, 250)
                        })
                    }

                    skinSwitch.rendererOnMessage.addListener(player, 'canvasRecover', function (e) {
                        dynamicWrap.style.zIndex = "60";
                        canvas.style.height = null;
                        canvas.style.width = null;
                        canvas.style.position = null;
                        player.style.zIndex = 4;
                        canvas.style.top = null
                    })
                    skinSwitch.rendererOnMessage.addListener(player, 'debugNoChuKuang', function (e) {
                        // 没有出框动画无法调整
                        showAdjustBar(true)
                        show(editBox)

                        skinSwitch.chukuangWorkerApi.chukuangAction(player, 'GongJi', {
                            attackArgs: {
                                hand: null,
                                attack: {},
                                targets: [],
                                bodySize: {
                                    bodyWidth: decadeUI.get.bodySize().width,
                                    bodyHeight: decadeUI.get.bodySize().height
                                }
                            },
                            triggername: 'useCard'
                        })
                    })
                }

                editBox = ui.create.div('.editDynamic', ui.window)

                // 添加拖拽手柄
                const dragHandle = ui.create.div('.skin-drag-handle', editBox)
                dragHandle.title = '拖拽移动角色调整窗口'

                const funcContent = ui.create.div('.funcContent', editBox)
                const funcTitle = ui.create.div('.titleDiv', funcContent)
                // 功能页.
                const btnGroup = ui.create.div('.btnGroup', funcContent)
                const playerBtn = ui.create.div('.funcBtn .btnItem', btnGroup)
                const qhShouShaBtn = ui.create.div('.funcBtn .btnItem', btnGroup)
                const qhDecadeBtn = ui.create.div('.funcBtn .btnItem', btnGroup)
                funcTitle.innerText = '功能页'
                playerBtn.innerText = '角色调整'
                qhShouShaBtn.innerText = '千幻手杀'
                qhDecadeBtn.innerText = '千幻十周年'

                // 角色调整页
                const adjustContent = ui.create.div('.playerContent .hidden', editBox)
                const adjustTitle = ui.create.div('.titleDiv', adjustContent)
                adjustTitle.innerText = '角色调整'
                const adjustBtnGroup = ui.create.div('.btnGroup', adjustContent)
                const daijiBtn = ui.create.div('.funcBtn .btnItem', adjustBtnGroup)
                const beijingBtn = ui.create.div('.funcBtn .btnItem', adjustBtnGroup)
                const qianjingBtn = ui.create.div('.funcBtn .btnItem', adjustBtnGroup)
                const chukuangBtn = ui.create.div('.funcBtn .btnItem', adjustBtnGroup)
                const chuchangBtn = ui.create.div('.funcBtn .btnItem', adjustBtnGroup)
                const teshuBtn = ui.create.div('.funcBtn .btnItem', adjustBtnGroup)
                const zhishixianBtn = ui.create.div('.funcBtn .btnItem', adjustBtnGroup)
                const saveBtn = ui.create.div('.funcBtn .btnItem', adjustBtnGroup)
                const retBtn = ui.create.div('.funcBtn .btnItem', adjustBtnGroup)

                const closeBtn = ui.create.div('.iconfont .icon-close .closeEditBtn', editBox)

                daijiBtn.innerText = '调整待机'
                beijingBtn.innerText = '调整背景'
                qianjingBtn.innerText = '调整前景'
                chukuangBtn.innerText = '调整出框'
                chuchangBtn.innerText = '调整出场'
                teshuBtn.innerText = '调整特殊'
                zhishixianBtn.innerText = '调整指示线'
                saveBtn.innerText = '保存'
                retBtn.innerText = '返回'

                // 封装连续按事件
                let continuousClick = function (dom, func) {
                    let downFunc = function (e) {
                        // 改变骨骼的位置
                        //获取鼠标按下时的时间
                        let t = setInterval((e) => { func(e, ++downFunc._times) }, 120)
                        clearInterval(downFunc.timer)
                        downFunc.timer = t
                        downFunc._times = 0  // 表示触发了多少次
                        func(e, ++downFunc._times)  // 立马执行一次
                    }
                    let holdUp = function () {
                        clearInterval(downFunc.timer);
                        downFunc._times = 0
                    }

                    dom.addEventListener(downEvent, downFunc)
                    dom.addEventListener(upEvent, holdUp)
                    dom.addEventListener(cancelEvent, holdUp)

                }

                closeBtn.listen(() => {
                    // 清除循环播放定时器
                    if (selfLoopPlay.loopTimer) {
                        clearInterval(selfLoopPlay.loopTimer);
                        selfLoopPlay.loopTimer = null;
                    }
                    hide(editBox)
                })

                // 初始化角色调整窗口拖拽功能
                skinSwitch.initEditBoxDrag(editBox, dragHandle)

                let changeInfoData = () => {
                    if (!textInfoShow) return
                    let x = adjustX[1].toFixed(3)
                    let y = adjustY[1].toFixed(3)
                    let scale = adjustScale.toFixed(3)
                    let angle = Number(adjustAngle) || 0
                    textInfoShow.innerHTML = `x: [${adjustX[0]}, ${x}]<br> y: [${adjustY[0]}, ${y}]<br>大小: ${scale}<br> 角度: ${angle}`
                }

                let initBlackBg = () => {
                    // 添加调整工具箱
                    blackbg = ui.create.div('.pfqh_qhly_blackbg .hidden', document.body);
                    let dataShowDiv = ui.create.div('.dataShowDiv', blackbg);  // 显示当前节点的数据信息
                    textInfoShow = ui.create.div('.textInfoShow', dataShowDiv)
                    let copyJudgeInfo = ui.create.div('.copyCurrentInfoDiv', dataShowDiv)  // 复制信息
                    copyJudgeInfo.innerText = '复制参数'
                    textInfoShow.innerHTML = `x: [0, 0.5]<br> y: [0, 0.5]<br>大小: 0.5<br> 角度: 0`

                    copyJudgeInfo.listen(() => {
                        adjustX[1] = Number(adjustX[1].toFixed(3))
                        adjustY[1] = Number(adjustY[1].toFixed(3))
                        copyToClipboard({
                            x: adjustX,
                            y: adjustY,
                            angle: adjustAngle,
                            scale: Number(adjustScale.toFixed(3)),
                        })
                    })

                    let buttonbar = ui.create.div('.pfqh_qhly_bigeditbar', blackbg);
                    let buttons = new Array(8);
                    for (let i = 0; i < 6; i++) {
                        buttons[i] = ui.create.div('.pfqh_qhly_bigeditbutton' + i, buttonbar);
                        buttons[i].id = 'pfqh_qhly_bigedit' + i;

                        if (i < 4) {
                            switch (i) {
                                case 0: {
                                    // 放大, 每次scale+0.01, 支持连点
                                    continuousClick(buttons[i], (e, times) => {
                                        if (times >= 10) {
                                            adjustScale += 0.02
                                        } else {
                                            adjustScale += 0.01
                                        }
                                        skinSwitch.postMsgApi.resizePos(player, currentMode, { scale: adjustScale })

                                        // 对于出框相关模式，立即更新出框Worker
                                        if (currentMode === modes.chukuang || currentMode === modes.chuchang || currentMode === modes.teshu || currentMode === modes.zhishixian) {
                                            let actionType;
                                            if (currentMode === modes.chukuang || currentMode === modes.zhishixian) actionType = 'GongJi';
                                            else if (currentMode === modes.chuchang) actionType = 'chuchang';
                                            else if (currentMode === modes.teshu) actionType = 'TeShu';

                                            skinSwitch.chukuangWorkerApi.adjust(player, {
                                                x: adjustX,
                                                y: adjustY,
                                                scale: adjustScale,
                                                angle: adjustAngle
                                            }, actionType);
                                        }

                                        changeInfoData()
                                    })
                                    break;
                                }
                                case 1: {
                                    // 缩小, 每次scale-0.01,
                                    continuousClick(buttons[i], (e, times) => {
                                        if (times >= 10) {
                                            adjustScale -= 0.02
                                        } else {
                                            adjustScale -= 0.01
                                        }
                                        if (adjustScale <= 0) adjustScale = 0.01
                                        skinSwitch.postMsgApi.resizePos(player, currentMode, { scale: adjustScale })

                                        // 对于出框相关模式，立即更新出框Worker
                                        if (currentMode === modes.chukuang || currentMode === modes.chuchang || currentMode === modes.teshu || currentMode === modes.zhishixian) {
                                            let actionType;
                                            if (currentMode === modes.chukuang || currentMode === modes.zhishixian) actionType = 'GongJi';
                                            else if (currentMode === modes.chuchang) actionType = 'chuchang';
                                            else if (currentMode === modes.teshu) actionType = 'TeShu';

                                            skinSwitch.chukuangWorkerApi.adjust(player, {
                                                x: adjustX,
                                                y: adjustY,
                                                scale: adjustScale,
                                                angle: adjustAngle
                                            }, actionType);
                                        }

                                        changeInfoData()
                                    })
                                    break;
                                }
                                case 2: {
                                    continuousClick(buttons[i], (e, times) => {
                                        if (times >= 10) {
                                            adjustAngle += 2
                                        } else {
                                            adjustAngle++
                                        }
                                        skinSwitch.postMsgApi.resizePos(player, currentMode, { angle: adjustAngle })

                                        // 对于出框相关模式，立即更新出框Worker
                                        if (currentMode === modes.chukuang || currentMode === modes.chuchang || currentMode === modes.teshu || currentMode === modes.zhishixian) {
                                            let actionType;
                                            if (currentMode === modes.chukuang || currentMode === modes.zhishixian) actionType = 'GongJi';
                                            else if (currentMode === modes.chuchang) actionType = 'chuchang';
                                            else if (currentMode === modes.teshu) actionType = 'TeShu';

                                            skinSwitch.chukuangWorkerApi.adjust(player, {
                                                x: adjustX,
                                                y: adjustY,
                                                scale: adjustScale,
                                                angle: adjustAngle
                                            }, actionType);
                                        }

                                        changeInfoData()
                                    })
                                    break;
                                }
                                case 3: {
                                    continuousClick(buttons[i], (e, times) => {
                                        if (times >= 10) {
                                            adjustAngle -= 2
                                        } else {
                                            adjustAngle--
                                        }
                                        skinSwitch.postMsgApi.resizePos(player, currentMode, { angle: adjustAngle })

                                        // 对于出框相关模式，立即更新出框Worker
                                        if (currentMode === modes.chukuang || currentMode === modes.chuchang || currentMode === modes.teshu || currentMode === modes.zhishixian) {
                                            let actionType;
                                            if (currentMode === modes.chukuang || currentMode === modes.zhishixian) actionType = 'GongJi';
                                            else if (currentMode === modes.chuchang) actionType = 'chuchang';
                                            else if (currentMode === modes.teshu) actionType = 'TeShu';

                                            skinSwitch.chukuangWorkerApi.adjust(player, {
                                                x: adjustX,
                                                y: adjustY,
                                                scale: adjustScale,
                                                angle: adjustAngle
                                            }, actionType);
                                        }

                                        changeInfoData()
                                    })
                                    break;
                                }
                            }
                        } else {
                            buttons[i].listen(function () {
                                switch (this.id) {
                                    case 'pfqh_qhly_bigedit4': {
                                        // 显示十字键辅助微调
                                        this._show = !adjustDirection || adjustDirection.classList.contains('hidden')
                                        showShizi(!this._show)
                                        break;
                                    }
                                    case 'pfqh_qhly_bigedit5': {
                                        // 调整后返回
                                        showAdjustBar(true)
                                        show(editBox)
                                        // 恢复播放待机动画
                                        // currentMode = modes.daiji
                                        //  initPosParams()
                                        selfLoopPlay(modes.daiji)
                                        break;
                                    }
                                    case 'pfqh_qhly_bigedit6': {

                                    }
                                }
                            })
                        }
                    }

                    // 绑定全局可以滑动调整

                    function mouseupEvent(event) {
                        blackbg._mouseup(event);
                    }
                    function mousemoveEvent(event) {
                        if (event) {
                            if (event.touches && event.touches.length) {
                                blackbg._mousemove(event.touches[0].clientX, event.touches[0].clientY);
                            }
                            else blackbg._mousemove(event.clientX, event.clientY);
                        }
                    }
                    function mousedownEvent(event) {
                        if (event) {
                            // 清空之前的数据
                            if (this.posX) delete this.posX
                            if (this.posY) delete this.posY
                            if (event.touches && event.touches.length) blackbg._mousedown(event.touches[0].clientX, event.touches[0].clientY);
                            else blackbg._mousedown(event.clientX, event.clientY);
                        }
                    }
                    blackbg._mousedown = function (x, y) {
                        this.posX = x
                        this.posY = y
                        this.isTouching = true
                    }
                    blackbg._mousemove = function (x, y) {
                        if (!this.isTouching) return;
                        let slideX = x - this.posX;
                        let slideY = y - this.posY;
                        if (currentMode === modes.chukuang || currentMode === modes.chuchang || currentMode === modes.teshu || currentMode === modes.zhishixian) {
                            adjustX[1] += slideX * 0.0007;
                            adjustY[1] -= slideY * 0.0007;
                        } else {
                            adjustX[1] += slideX * 0.003;
                            adjustY[1] -= slideY * 0.003;
                        }
                        changeInfoData()

                        // 调用常规的位置更新
                        skinSwitch.postMsgApi.resizePos(player, currentMode, {
                            message: 'RESIZE',
                            x: adjustX,
                            y: adjustY,
                        })

                        // 对于出框相关模式，立即更新出框Worker中正在播放的动画位置
                        if (currentMode === modes.chukuang || currentMode === modes.chuchang || currentMode === modes.teshu || currentMode === modes.zhishixian) {
                            let actionType;
                            if (currentMode === modes.chukuang || currentMode === modes.zhishixian) actionType = 'GongJi';
                            else if (currentMode === modes.chuchang) actionType = 'chuchang';
                            else if (currentMode === modes.teshu) actionType = 'TeShu';

                            // 直接调用出框Worker的adjust函数，立即更新位置
                            skinSwitch.chukuangWorkerApi.adjust(player, {
                                x: adjustX,
                                y: adjustY,
                                scale: adjustScale,
                                angle: adjustAngle
                            }, actionType);
                        }

                        this.posX = x
                        this.posY = y
                    }
                    blackbg._mouseup = function (event) {
                        this.isTouching = false;
                        delete this.posX;
                        delete this.posY;
                    }
                    blackbg.addEventListener('touchstart', mousedownEvent, true);
                    blackbg.addEventListener('touchend', mouseupEvent, true);
                    blackbg.addEventListener('touchcancel', mouseupEvent, true);
                    blackbg.addEventListener('touchmove', mousemoveEvent, true);
                    blackbg.addEventListener('mousedown', mousedownEvent, true);
                    blackbg.addEventListener('mouseup', mouseupEvent, true);
                    blackbg.addEventListener('mouseleave', mouseupEvent, true);
                    blackbg.addEventListener('mousemove', mousemoveEvent, true);
                }

                let blackbg
                let textInfoShow
                let showAdjustBar = hidden => {
                    if (!blackbg) {
                        initBlackBg()
                    }
                    if (hidden) {
                        blackbg.classList.add('hidden')
                        showShizi(true)
                    }
                    else blackbg.classList.remove('hidden')
                }

                let initPosParams = () => {
                    // 确保adjustX和adjustY有默认值
                    if (!adjustX) adjustX = [0, 0.5];
                    if (!adjustY) adjustY = [0, 0.5];
                    
                    getDynamicPos(currentMode, (data) => {
                        if (data && data.x) adjustX = data.x;
                        if (data && data.y) adjustY = data.y;
                        if (data && data.scale) adjustScale = data.scale;
                        adjustAngle = (data && data.angle) || 0;

                        if (adjustX[0] !== 0 || adjustY[0] !== 0) {
                            adjustX[0] = 0;
                            adjustY[0] = 0;
                            skinSwitch.postMsgApi.resizePos(player, currentMode, { x: adjustX, y: adjustY })
                            initPosParams()
                            return
                        }

                        // 如果有临时保存的调整，优先使用临时保存的
                        if (tempAdjustments[currentMode]) {
                            adjustX = [...tempAdjustments[currentMode].x]
                            adjustY = [...tempAdjustments[currentMode].y]
                            adjustScale = tempAdjustments[currentMode].scale
                            adjustAngle = tempAdjustments[currentMode].angle || 0
                            // 立即应用临时保存的调整
                            skinSwitch.postMsgApi.resizePos(player, currentMode, {
                                x: adjustX,
                                y: adjustY,
                                scale: adjustScale,
                                angle: adjustAngle
                            })

                            // 对于出框相关模式，立即更新出框Worker
                            if (currentMode === modes.chukuang || currentMode === modes.chuchang || currentMode === modes.teshu || currentMode === modes.zhishixian) {
                                let actionType;
                                if (currentMode === modes.chukuang || currentMode === modes.zhishixian) actionType = 'GongJi';
                                else if (currentMode === modes.chuchang) actionType = 'chuchang';
                                else if (currentMode === modes.teshu) actionType = 'TeShu';

                                skinSwitch.chukuangWorkerApi.adjust(player, {
                                    x: adjustX,
                                    y: adjustY,
                                    scale: adjustScale,
                                    angle: adjustAngle
                                }, actionType);
                            }
                        }

                        changeInfoData()
                    })
                }

                let refreshBtnState = (selectDiv) => {
                    let allBtns = [daijiBtn, beijingBtn, qianjingBtn, chukuangBtn, chuchangBtn, teshuBtn, zhishixianBtn]
                    for (let item of allBtns) {
                        if (item === selectDiv) {
                            item.classList.add('btnSelect')
                        } else {
                            item.classList.remove('btnSelect')
                        }
                    }
                }

                retBtn.listen(() => {
                    // 清除循环播放定时器
                    if (selfLoopPlay.loopTimer) {
                        clearInterval(selfLoopPlay.loopTimer);
                        selfLoopPlay.loopTimer = null;
                    }
                    funcContent.classList.remove('hidden')
                    adjustContent.classList.add('hidden')
                    showShizi(true)
                    showAdjustBar(true)
                    refreshBtnState(null)  // 清空所有状态
                })

                // 调整角色功能页功能
                playerBtn.listen(() => {
                    editBox.updateGlobalParams()
                    funcContent.classList.add('hidden')
                    adjustContent.classList.remove('hidden')
                    currentMode = modes.daiji
                    initPosParams()
                    showShizi(true)
                    currentFunc = funcs.player
                    // 清理其他
                })

                // 在切换模式前保存当前模式的调整
                let saveCurrentModeAdjustment = () => {
                    if (!adjustX || !adjustY) return

                    // 保存当前模式的调整到临时存储
                    if (adjustX && adjustX[1] != null) adjustX[1] = Number(adjustX[1].toFixed(3));
                    if (adjustY && adjustY[1] != null) adjustY[1] = Number(adjustY[1].toFixed(3));
                    tempAdjustments[currentMode] = {
                        x: [...adjustX],
                        y: [...adjustY],
                        scale: Number(adjustScale.toFixed(3)),
                        angle: Number(adjustAngle.toFixed(3)),
                    }
                }

                daijiBtn.listen(() => {
                    saveCurrentModeAdjustment()
                    currentMode = modes.daiji
                    showAdjustBar()
                    showShizi(true)
                    initPosParams()
                    selfLoopPlay(currentMode)
                    refreshBtnState(daijiBtn)
                    hide(editBox)
                })

                beijingBtn.listen(() => {
                    saveCurrentModeAdjustment()
                    let playerParams = player.dynamic.primary.player
                    if (!playerParams.beijing) {
                        skinSwitchMessage.show({
                            type: 'warning',
                            text: '当前皮肤没有设置动态背景',
                            duration: 1500,    // 显示时间
                            closeable: false, // 可手动关闭
                        })
                        return
                    }

                    currentMode = modes.beijing
                    showAdjustBar()
                    showShizi(true)
                    initPosParams()
                    selfLoopPlay(currentMode)
                    refreshBtnState(beijingBtn)
                    hide(editBox)
                })

                qianjingBtn.listen(() => {
                    saveCurrentModeAdjustment()
                    let playerParams = player.dynamic.primary.player
                    if (!playerParams.qianjing) {
                        skinSwitchMessage.show({
                            type: 'warning',
                            text: '当前皮肤没有设置动态前景',
                            duration: 1500,    // 显示时间
                            closeable: false, // 可手动关闭
                        })
                        return
                    }

                    currentMode = modes.qianjing
                    showAdjustBar()
                    showShizi(true)
                    initPosParams()
                    selfLoopPlay(currentMode)
                    refreshBtnState(qianjingBtn)
                    hide(editBox)
                })

                chukuangBtn.listen(() => {
                    saveCurrentModeAdjustment()
                    currentMode = modes.chukuang
                    showAdjustBar()
                    showShizi(true)
                    initPosParams()
                    selfLoopPlay(currentMode)
                    refreshBtnState(chukuangBtn)
                    hide(editBox)
                })

                chuchangBtn.listen(() => {
                    saveCurrentModeAdjustment()
                    let playerParams = player.dynamic.primary.player
                    currentMode = modes.chuchang
                    showAdjustBar()
                    showShizi(true)
                    initPosParams()
                    selfLoopPlay(currentMode)
                    refreshBtnState(chuchangBtn)
                    hide(editBox)
                })

                teshuBtn.listen(() => {
                    saveCurrentModeAdjustment()
                    let playerParams = player.dynamic.primary.player
                    currentMode = modes.teshu
                    showAdjustBar()
                    showShizi(true)
                    initPosParams()
                    selfLoopPlay(currentMode)
                    refreshBtnState(teshuBtn)
                    hide(editBox)
                })

                // 添加指示线按钮的事件监听器
                zhishixianBtn.listen(() => {
                    saveCurrentModeAdjustment()
                    let playerParams = player.dynamic.primary.player
                    if (!playerParams.zhishixian) {
                        skinSwitchMessage.show({
                            type: 'warning',
                            text: '当前皮肤没有设置指示线动画',
                            duration: 1500,
                            closeable: false,
                        })
                        return
                    }

                    currentMode = modes.zhishixian
                    showAdjustBar()
                    showShizi(true)
                    initPosParams()
                    selfLoopPlay(currentMode)
                    refreshBtnState(zhishixianBtn)
                    hide(editBox)
                })

                saveBtn.listen(() => {
                    // 保存当前调整
                    saveCurrentModeAdjustment()

                    // 只保存当前模式的调整参数
                    saveToFile(true) // 传入true表示显示保存消息

                    // 从临时调整中移除当前已保存的模式
                    if (tempAdjustments[currentMode]) {
                        delete tempAdjustments[currentMode]
                    }
                })

                let adjustDirection
                let arena = document.getElementById('arena')

                let showShizi = (hidden) => {
                    // 初始化十字键
                    if (!adjustDirection) {
                        adjustDirection = ui.create.div('.adjustDirection', arena);
                        adjustDirection.innerHTML = `
                            <div class="directionDiv" style="top:0;left:32.3%">
                                <button id="upbtn"><i class="up"></i></button>
                            </div>
                            <div class="directionDiv" style="top:26.3%;left:-30.3%">
                                <button id="leftbtn"><i class="left"></i></button>
                            </div>  
                            <div class="directionDiv" style="top:18.3%;left:32.3%">
                                <button id="bottombtn"><i class="down"></i></button>
                            </div>
                            <div class="directionDiv" style="top:-7%;left:23.3%">
                                <button id="rightbtn"><i class="right"></i></button>
                            </div>
                        `

                        continuousClick(adjustDirection.querySelector('#upbtn'), () => {
                            adjustY[1] += 0.01
                            skinSwitch.postMsgApi.resizePos(player, currentMode, { x: adjustX, y: adjustY })

                            // 对于出框相关模式，立即更新出框Worker
                            if (currentMode === modes.chukuang || currentMode === modes.chuchang || currentMode === modes.teshu || currentMode === modes.zhishixian) {
                                let actionType;
                                if (currentMode === modes.chukuang || currentMode === modes.zhishixian) actionType = 'GongJi';
                                else if (currentMode === modes.chuchang) actionType = 'chuchang';
                                else if (currentMode === modes.teshu) actionType = 'TeShu';

                                skinSwitch.chukuangWorkerApi.adjust(player, {
                                    x: adjustX,
                                    y: adjustY,
                                    scale: adjustScale,
                                    angle: adjustAngle
                                }, actionType);
                            }

                            changeInfoData()
                        })

                        continuousClick(adjustDirection.querySelector('#bottombtn'), () => {
                            adjustY[1] -= 0.01
                            skinSwitch.postMsgApi.resizePos(player, currentMode, { x: adjustX, y: adjustY })

                            // 对于出框相关模式，立即更新出框Worker
                            if (currentMode === modes.chukuang || currentMode === modes.chuchang || currentMode === modes.teshu || currentMode === modes.zhishixian) {
                                let actionType;
                                if (currentMode === modes.chukuang || currentMode === modes.zhishixian) actionType = 'GongJi';
                                else if (currentMode === modes.chuchang) actionType = 'chuchang';
                                else if (currentMode === modes.teshu) actionType = 'TeShu';

                                skinSwitch.chukuangWorkerApi.adjust(player, {
                                    x: adjustX,
                                    y: adjustY,
                                    scale: adjustScale,
                                    angle: adjustAngle
                                }, actionType);
                            }

                            changeInfoData()
                        })

                        continuousClick(adjustDirection.querySelector('#leftbtn'), () => {
                            adjustX[1] -= 0.01
                            skinSwitch.postMsgApi.resizePos(player, currentMode, { x: adjustX, y: adjustY })

                            // 对于出框相关模式，立即更新出框Worker
                            if (currentMode === modes.chukuang || currentMode === modes.chuchang || currentMode === modes.teshu || currentMode === modes.zhishixian) {
                                let actionType;
                                if (currentMode === modes.chukuang || currentMode === modes.zhishixian) actionType = 'GongJi';
                                else if (currentMode === modes.chuchang) actionType = 'chuchang';
                                else if (currentMode === modes.teshu) actionType = 'TeShu';

                                skinSwitch.chukuangWorkerApi.adjust(player, {
                                    x: adjustX,
                                    y: adjustY,
                                    scale: adjustScale,
                                    angle: adjustAngle
                                }, actionType);
                            }

                            changeInfoData()
                        })

                        continuousClick(adjustDirection.querySelector('#rightbtn'), () => {
                            adjustX[1] += 0.01
                            skinSwitch.postMsgApi.resizePos(player, currentMode, { x: adjustX, y: adjustY })

                            // 对于出框相关模式，立即更新出框Worker
                            if (currentMode === modes.chukuang || currentMode === modes.chuchang || currentMode === modes.teshu || currentMode === modes.zhishixian) {
                                let actionType;
                                if (currentMode === modes.chukuang || currentMode === modes.zhishixian) actionType = 'GongJi';
                                else if (currentMode === modes.chuchang) actionType = 'chuchang';
                                else if (currentMode === modes.teshu) actionType = 'TeShu';

                                skinSwitch.chukuangWorkerApi.adjust(player, {
                                    x: adjustX,
                                    y: adjustY,
                                    scale: adjustScale,
                                    angle: adjustAngle
                                }, actionType);
                            }

                            changeInfoData()
                        })
                    }
                    if (hidden) adjustDirection.classList.add('hidden')
                    else adjustDirection.classList.remove('hidden')

                }

                qhShouShaBtn.listen(function () {

                    // 寻找千幻的节点,并更新当前player
                    let qhNode
                    let p = document.getElementById('mainView')
                    // 尝试查找手杀大屏的node
                    if (p) {
                        let _canvas = p.getElementsByClassName('animation-player')
                        if (_canvas.length) {
                            qhNode = _canvas[0].parentNode.parentNode
                        }

                    }
                    if (!qhNode || !qhNode.dynamic || !qhNode.dynamic.primary) {
                        skinSwitchMessage.show({
                            'type': 'error',
                            'text': '必须打开千幻大屏预览页且当前预览角色是动皮才可以进行编辑调整'
                        })
                        return
                    }
                    currentFunc = funcs.qhShouSha
                    // 必须保证当前已经打开了千幻的皮肤选择界面.
                    funcContent.classList.add('hidden')
                    adjustContent.classList.remove('hidden')

                    // 停止原来的自动播放攻击动画和待机..
                    clearInterval(_status.texiaoTimer);
                    clearTimeout(_status.texiaoTimer2);

                    // 检查全局参数的引用是否发生变化. 如果发生变化需要进行重新初始化
                    player = qhNode
                    player.isQhlx = true; // 表示当前动皮角色是千幻雷修版本的
                    renderer = player.dynamic.renderer;
                    dynamic = player.dynamic.primary;  // 这个是指代主将的sprite也就是APNode对象
                    currentMode = modes.daiji
                    initPosParams()
                })

                qhDecadeBtn.listen(function () {

                    // 寻找千幻的节点,并更新当前player
                    let qhNode
                    let p = document.getElementById('mainView')
                    // 尝试查找手杀大屏的node
                    if (p) {
                        let _canvas = p.getElementsByClassName('animation-player')
                        if (_canvas.length) {
                            qhNode = _canvas[0].parentNode.parentNode
                        }

                    }
                    if (!qhNode || !qhNode.dynamic || !qhNode.dynamic.primary) {
                        skinSwitchMessage.show({
                            'type': 'error',
                            'text': '必须打开千幻大屏预览页且当前预览角色是动皮才可以进行编辑调整'
                        })
                        return
                    }
                    currentFunc = funcs.qhDecade
                    // 必须保证当前已经打开了千幻的皮肤选择界面.
                    funcContent.classList.add('hidden')
                    adjustContent.classList.remove('hidden')

                    // 检查全局参数的引用是否发生变化. 如果发生变化需要进行重新初始化
                    player = qhNode
                    player.isQhlx = true; // 表示当前动皮角色是千幻雷修版本的
                    renderer = player.dynamic.renderer;
                    dynamic = player.dynamic.primary;  // 这个是指代主将的sprite也就是APNode对象
                    currentMode = modes.daiji
                    initPosParams()
                })

                let getDynamicPos = function (mode, func) {
                    // 初始化adjustX和adjustY的默认值
                    if (!adjustX) adjustX = [0, 0.5];
                    if (!adjustY) adjustY = [0, 0.5];
                    
                    skinSwitch.postMsgApi.position(player, mode)
                    skinSwitch.rendererOnMessage.addListener(player, 'position', func)
                }



                // 增加一个新的方法, 修改全局参数, 尤其是当皮肤也进行了变化
                editBox.updateGlobalParams = function () {
                    // 检查全局参数的引用是否发生变化. 如果发生变化需要进行重新初始化
                    // 优先使用全局设置的目标玩家，否则使用当前玩家
                    let targetPlayer = window.qhly_editTargetPlayer || window.currentEditPlayer || player || game.me;
                    player = targetPlayer;
                    if (!player.dynamic) return
                    renderer = player.dynamic.renderer;
                    dynamic = player.dynamic.primary  // 这个是指代主将的sprite也就是APNode对象
                    initPosParams()
                }

                let copyToClipboard = function (data) {
                    // 保存当前动皮参数
                    let copyData = `\t\t\t\tx: [${data.x}],\n\t\t\t\ty: [${data.y}],\n`
                    if (data.angle) {
                        copyData += `\t\t\t\tangle: ${data.angle},\n`
                    }
                    if (data.scale != null) {
                        copyData += `\t\t\t\tscale: ${data.scale},\n`
                    }
                    // 复制到剪切板, 复制代码来源: https://juejin.cn/post/6844903567480848391
                    const input = document.createElement('textarea');
                    input.setAttribute('readonly', 'readonly');
                    // input.setAttribute('value', copyData);
                    input.value = copyData
                    document.body.appendChild(input);
                    if (document.execCommand('copy')) {
                        input.select()
                        document.execCommand('copy')
                        skinSwitchMessage.show({
                            type: 'success',
                            text: '复制成功',
                            duration: 1500,    // 显示时间
                            closeable: false, // 可手动关闭
                        })
                    }
                    document.body.removeChild(input);
                }

                let saveToFile = function () {
                    let primaryDynamic = player.dynamic.primary.player
                    let playerName = player.name || player.parentNode.name
                    if (!playerName) return

                    let dskins = decadeUI.dynamicSkin[playerName]
                    let saveKey
                    for (let k in dskins) {
                        if (dskins[k].name === primaryDynamic.name) {
                            saveKey = k
                            break
                        }
                    }

                    if (saveKey) {
                        let modeToKey = {
                            daiji: 'daiji',
                            chukuang: 'gongji',
                            beijing: 'beijing',
                            qianjing: 'qianjing',
                            chuchang: 'chuchang',
                            teshu: 'teshu',
                            zhishixian: 'zhishixian'
                        }

                        // 统一初始化参数
                        if (!skinSwitch.saveSkinParams) {
                            skinSwitch.saveSkinParams = {}
                        }
                        if (!skinSwitch.saveSkinParams[playerName]) {
                            skinSwitch.saveSkinParams[playerName] = {}
                        }
                        if (!skinSwitch.saveSkinParams[playerName][saveKey]) {
                            skinSwitch.saveSkinParams[playerName][saveKey] = {}
                        }

                        let toSaveData
                        if (player.isQhlx) {
                            if (!skinSwitch.saveSkinParams[playerName][saveKey].qhlx) {
                                skinSwitch.saveSkinParams[playerName][saveKey].qhlx = {}
                            }
                            if (currentFunc === funcs.qhDecade) {
                                if (!skinSwitch.saveSkinParams[playerName][saveKey].qhlx.decade) {
                                    skinSwitch.saveSkinParams[playerName][saveKey].qhlx.decade = {}
                                }
                                toSaveData = skinSwitch.saveSkinParams[playerName][saveKey].qhlx.decade
                            } else {
                                toSaveData = skinSwitch.saveSkinParams[playerName][saveKey].qhlx
                            }
                        } else {
                            toSaveData = skinSwitch.saveSkinParams[playerName][saveKey]
                        }

                        // 保存当前模式的位置数据
                        adjustX[1] = Number(adjustX[1].toFixed(3))
                        adjustY[1] = Number(adjustY[1].toFixed(3))
                        let modeData = {
                            x: adjustX,
                            y: adjustY,
                            scale: Number(adjustScale.toFixed(3)),
                            angle: Number(adjustAngle.toFixed(3))
                        }

                        let k = modeToKey[currentMode]
                        if (!player.isQhlx && currentMode === modes.daiji) {
                            skinSwitch.saveSkinParams[playerName][saveKey] = Object.assign(skinSwitch.saveSkinParams[playerName][saveKey], modeData)
                        } else {
                            toSaveData[k] = modeData
                        }

                        // 立即保存到文件
                        let str = `window.skinSwitchLoadParams = function(lib, game, ui, get, ai, _status){window.skinSwitch.saveSkinParams =\n`
                        str += JSON.stringify(skinSwitch.saveSkinParams, null, 4)
                        str += '\n}'

                        // 添加防止短时间内多次显示保存成功的逻辑
                        if (!skinSwitch.lastSaveSuccessTime || (new Date().getTime() - skinSwitch.lastSaveSuccessTime) > 3000) {
                            skinSwitch.lastSaveSuccessTime = new Date().getTime();
                            game.writeFile(str, skinSwitch.path, 'saveSkinParams.js', function () {
                                console.log('写入saveSkinParams.js成功')
                                skinSwitchMessage.show({
                                    type: 'success',
                                    text: '保存成功',
                                    duration: 1500,
                                    closeable: false
                                })
                            })
                        } else {
                            // 短时间内重复保存，不显示消息，只写入文件
                            game.writeFile(str, skinSwitch.path, 'saveSkinParams.js', function () {
                                console.log('写入saveSkinParams.js成功')
                            })
                        }

                        // 修改千幻雷修版本的值
                        if (skinSwitch.saveSkinParams[playerName][saveKey].qhlx) {
                            decadeUI.dynamicSkin[playerName][saveKey].qhlx = skinSwitch.saveSkinParams[playerName][saveKey].qhlx
                        }
                    }
                }

                editBox.updateGlobalParams()
            }

            function editBoxShowOrHide() {
                // 初始化一些参数
                if (!editBox) {
                    // 优先使用全局设置的目标玩家
                    let targetPlayer = window.qhly_editTargetPlayer || window.currentEditPlayer || game.me;
                    player = targetPlayer;
                    renderer = player.dynamic.renderer;
                    dynamic = player.dynamic.primary  // 这个是指代主将的sprite也就是APNode对象
                    editBoxInit()
                    return editBox
                } else {
                    // 检查是否有新的目标玩家
                    let targetPlayer = window.qhly_editTargetPlayer || window.currentEditPlayer;
                    if (targetPlayer && targetPlayer !== player) {
                        player = targetPlayer;
                        renderer = player.dynamic.renderer;
                        dynamic = player.dynamic.primary  // 这个是指代主将的sprite也就是APNode对象
                        editBox.updateGlobalParams(); // 更新编辑框参数
                    } else if (game.me !== player && !targetPlayer) {
                        player = game.me
                        renderer = player.dynamic.renderer;
                        dynamic = player.dynamic.primary  // 这个是指代主将的sprite也就是APNode对象
                        editBox.updateGlobalParams(); // 更新编辑框参数
                    } else if (player.dynamic.primary !== dynamic) {
                        renderer = player.dynamic.renderer;
                        dynamic = player.dynamic.primary  // 这个是指代主将的sprite也就是APNode对象
                    }
                }
                toggleShow(editBox)
                return editBox
            }

            function isHide(dom) {
                return [...dom.classList].includes('hidden-adjust')
            }

            function hide(dom) {
                if (![...dom.classList].includes('hidden-adjust')) {
                    dom.classList.add('hidden-adjust')
                }
            }

            function show(dom) {
                if ([...dom.classList].includes('hidden-adjust')) {
                    dom.classList.remove('hidden-adjust')
                }
            }

            function toggleShow(dom) {
                if ([...dom.classList].includes('hidden-adjust')) {
                    dom.classList.remove('hidden-adjust')
                    skinSwitch.allowTouchEvent(false)
                } else {
                    // 关闭编辑窗口时，清除循环播放定时器
                    if (typeof selfLoopPlay !== 'undefined' && selfLoopPlay.loopTimer) {
                        clearInterval(selfLoopPlay.loopTimer);
                        selfLoopPlay.loopTimer = null;
                    }
                    dom.classList.add('hidden-adjust')
                    skinSwitch.allowTouchEvent(true)
                }
            }

            lib.arenaReady.push(function () { //游戏加载完成执行的内容
                lib.init.js(skinSwitch.url, 'pfqhUtils', function () {
                    //顶部菜单
                    if (lib.config[skinSwitch.configKey.showEditMenu]) {
                        // 添加编辑动皮参数
                        ui.create.system('编辑动皮参数', function () {
                            setTimeout(function () {
                                if (!lib.config[skinSwitch.configKey.useDynamic]) {
                                    skinSwitchMessage.show({
                                        type: 'warning',
                                        text: '请先打开动皮功能',
                                        duration: 1500,    // 显示时间
                                        closeable: false, // 可手动关闭
                                    })
                                    return
                                }
                                // 只能编辑自己
                                if (game.me) {
                                    let player = game.me
                                    if (!player.dynamic || (!player.dynamic.primary)) {
                                        // alert("只能编辑当前角色的动皮位置参数")
                                        skinSwitchMessage.show({
                                            type: 'warning',
                                            text: '只能当前角色是动皮才可编辑参数',
                                            duration: 1500,    // 显示时间
                                            closeable: false, // 可手动关闭
                                        })
                                        return
                                    }
                                    if (get.mode() === 'guozhan' || player.name2 !== undefined) {
                                        skinSwitchMessage.show({
                                            type: 'warning',
                                            text: '只能在单将模式下编辑参数',
                                            duration: 1500,    // 显示时间
                                            closeable: false, // 可手动关闭
                                        })
                                        return
                                    }
                                    // 设置一个全局变量
                                    window.dynamicEditBox = editBoxShowOrHide()
                                }

                            }, 100);
                        }, true)
                    }

                    if (lib.config[skinSwitch.configKey.showPreviewDynamicMenu]) {
                        ui.create.system('预览spine', function () {
                            skinSwitch.previewDynamic()
                        }, true)
                    }


                }, function (err) {
                    console.log(err)
                })

                // 调试, 打开编辑窗口
                // skinSwitch.openEventBindWindow()

                // 引入js
                let js = function (path, onload, onerror) {
                    if (!path) return console.error('path');

                    let script = document.createElement('script');
                    script.onload = onload
                    script.onerror = onerror || function () {
                        console.error(this.src + 'not found');
                    }
                    script.src = path
                    document.head.appendChild(script);
                }
                // <!-- 消息外层容器，因为消息提醒基本上是全局的，所以这里用id，所有的弹出消息都是需要插入到这个容器里边的 -->
                let msgContainer = ui.create.div(document.getElementById('arena'))
                msgContainer.id = 'message-container'
                js(skinSwitch.url + 'component/message.js', () => {
                    window.skinSwitchMessage = new SkinSwitchMessage()
                })
            })
            //藏珍阁
            lib.init.css(skinSwitch.url + "style", "cang-zhen-ge")
            if (skinSwitch.qhly_hasExtension('如真似幻')) {
                   /*     let czgscript = document.createElement('script');
            czgscript.src = lib.assetURL + 'extension/皮肤切换/czg_setting.js';
            document.head.appendChild(czgscript);*/
                lib.init.js(skinSwitch.url, "czg_setting")
                // lib.init.js(skinSwitch.url + "spine-lib/pixi", "pixi-spine.umd")
             //   lib.init.js(skinSwitch.url + "spine-lib/pixi", "pixi_viewport_scrollbox")
            //      lib.init.js(skinSwitch.url + "spine-lib/pixi", "pixi-ease")
            }else {
                lib.init.js(skinSwitch.url + "spine-lib/pixi", "pixi.min", () => {
                    lib.init.js(skinSwitch.url, "czg_setting")
                    lib.init.js(skinSwitch.url + "spine-lib/pixi", "pixi-spine.umd")
                    lib.init.js(skinSwitch.url + "spine-lib/pixi", "pixi_viewport_scrollbox")
                    lib.init.js(skinSwitch.url + "spine-lib/pixi", "pixi-ease")
                });
            }
        },
        config: {
            //
            "GXNR": {
                "name": "更新内容",
                "init": "xin",
                "unfrequent": true,
                "item": {
                    "xin": "点击查看",
                },
                "textMenu": function (node, link) {
                    lib.setScroll(node.parentNode);
                    node.parentNode.style.transform = "translateY(-100px)";
                    node.parentNode.style.height = "200px";
                    node.parentNode.style.width = "320px";
                    switch (link) {
                        case "xin":
                            node.innerHTML = "<img style=width:100% src=" + lib.assetURL + "extension/皮肤切换/gengxin/1.06_更新.png>"
                            break;
                    }
                },
            },
            // "backupFileDui": {
            //     name: "<div><button class='engBtn' onclick='skinSwitch.backupFileDui()'>备份十周年文件</button></div>",
            //     clear: true
            // },
            // "ImportFileDui": {
            //     name: "<div><button id='importFileDui' class='engBtn' onclick='skinSwitch.modifyFileDui()'>导入十周年文件</button> </div>",
            //     clear: true
            // },
            "previewDynamic": {
                name: "<div><button onclick='skinSwitch.previewDynamic()'>预览spine动画(资源文件放入asset文件中)</button></div>",
                clear: true
            },
            "resetArchiveDynamicSkin": {
                name: "<button id='resetDynamicBtn' class='engBtn' type='button' onclick='skinSwitch.resetDynamicData()' >重置动皮存档</button>",
                intro: "当你更换的dynamicSkin.js与上一个版本内容差距较大时，需重置",
                clear: true
            },
            // 'closeXYPosAdjust': {
            //     name: "关闭位置微调",
            //     "init": true,
            //     "intro": "预览窗口空间有点不够,这个微调功能用到比较少,所以可以选择关闭",
            // },
            "showEditMenu": {
                "name": "编辑动态皮肤加入顶部菜单",
                "init": false,
                "intro": "将编辑动态皮肤参数界面加入顶部菜单栏",
            },
            "showPreviewDynamicMenu": {
                name: "预览spine加入顶部菜单",
                "init": false,
                "intro": "将预览动态皮肤参数界面加入顶部菜单栏",
            },
            "hideHuanFu": {
                name: "隐藏更换动皮按钮",
                "init": true,
                "intro": "如果安装了千幻雷修,可以隐藏更换动皮按钮",
            },
            'useDynamic': {
                name: "使用出框功能",
                "init": true,
                "intro": "如果设备不支持离屏渲染或者使用EngEx或D扩展出框, 请关闭此出框功能",
            },
            // 'replaceDecadeAni': {
            //     name: "支持播放ol4.0特效",
            //     "init": false,
            //     "intro": "替换十周年UI的decadeUi.animation对象后允许播放3.8,4.0的特效",
            // },
            'isAttackFlipX': {
                name: "AI出框是否翻转X轴",
                "init": false,
                "intro": "AI在屏幕左侧(中央往左小于50%)出框是否翻转X轴, 也可以在动皮参数处添加参数控制单个动皮的出框翻转",
            },
            'cugDynamicBg': {
                name: "是否裁剪动态背景",
                "init": false,
                "intro": "为了更好的适配动皮露头, 在待机处可以裁剪动态背景",
            },
            'genDynamicSkin': {
                name: "<div><button onclick='skinSwitch.genDynamicSkin()'>转换D动态参数(生成的新文件在扩展文件夹下)</button></div>",
                clear: true
            }, // generateDynamicFile
            'genDyTempFile': {
                name: "<div><button onclick='skinSwitch.genDyTempFile()'>自动生成动皮模板参数</button></div>",
                clear: true,
                info: '动皮文件夹结构是 --> 武将中文名(武将id也行)/皮肤名称/骨骼  <--- 形式的话, 可以自动根据当前已填写的参数动态生成动皮模板'
            },

            'previewSkinsDynamic': {
                name: "预览角色使用动皮",
                "init": true,
                "intro": "预览皮肤使用动皮",
            },
            'clickPlayerDynamic': {
                name: "点击角色换肤",
                "init": false,
                "intro": "点击角色弹出换肤功能",
            },
            'showTopArc': {
                name: "显示顶部圆弧",
                "init": true,
                "intro": "是否显示顶部圆弧",
                onchange: function (value) {
                    window.showTopArc = value;
                    // 为所有已存在的角色重新检查圆弧显示
                    game.players.concat(game.dead).forEach(function (player) {
                        if (player) skinSwitch.skinSwitchCheckYH(player);
                    });
                }
            },

        },
        help: {},
        package: {
            character: {
                character: {

                },
                translate: {

                },
            },
            card: {
                card: {
                },
                translate: {
                },
                list: [],
            },
            skill: {
                skill: {
                },
                translate: {
                },
            },
            intro: '更新者：微微曦子<br><br>&nbsp;&nbsp;<font color=#00FF7F>版本号:1.24-1003<br>&nbsp;&nbsp;1.更新内容：点击查看<br>&nbsp;&nbsp;2.删了光污染内容<br>&nbsp;&nbsp;3.当前扩展可以对待机动皮和出框动皮的位置参数的调整.<br>&nbsp;&nbsp;4.可以支持手杀和十周年真动皮的出框攻击,攻击附带指示线以及十周年动皮的出场动作播放.<br>&nbsp;&nbsp;5.界面内置spine骨骼动画预览.可以把骨骼文件或文件夹塞入扩展目录下的assets即可预览<br>&nbsp;&nbsp;6.现在动皮支持json的骨骼以及可以添加alpha预乘参数<br>&nbsp;&nbsp;7.本次更新添加了调整特殊调整出窗以及可以点击角色自由调整动皮位置<br></font><br>&nbsp;&nbsp;扩展本身拥有动静皮切换功能。<br><br>&nbsp;&nbsp;最后,感谢墨渊、微微曦子、//凌梦帮助前景修改，无名杀超市群的逝去の記憶,鹰击长空、逍遥自在、若水帮忙测试与提出意见,感谢默.颜提供的骨骼素材,感谢鸭佬扒的素材<br><br><img style=width:225px src=extension/皮肤切换/皮肤切换logo.png>',
            // intro: '<br>&nbsp;&nbsp;<font color=\"green\">&nbsp;&nbsp;初次使用请先备份并导入十周年UI的animation.js和dynamicWorker.js文件<br>&nbsp;&nbsp;1. 当前扩展可以对待机动皮和出框动皮的位置参数的调整.<br>&nbsp;&nbsp;2.可以支持手杀和十周年真动皮的出框攻击,以及十周年动皮的出场动作播放.<br>&nbsp;&nbsp;3.界面内置spine骨骼动画预览.可以把骨骼文件或文件夹塞入扩展目录下的assets即可预览<br></font><br>&nbsp;&nbsp;扩展本身拥有搬自于EngEX扩展的动皮换肤部分魔改.原来使用E佬写的EngEX插件自动出框非常好用,但是非常麻烦的是调整参数不方便, 于是就自己观摩E佬和特效测试扩展大佬的代码编写了调整参数这个简单的扩展\n" +
            //     "基于本人是个后端人员,审美有限(汗),所以换肤部分样式素材基本照搬E佬的EngEX扩展. 第一次写插件,应该有挺多bug,希望见谅.",
            author: "前更新者：yscl",
            diskURL: "",
            forumURL: "",
            version: "1.24",
        },
        files: { "character": [], "card": [], "skill": [] }
    }
})

/** 1.02版本更新:
 1. 主要增加对千幻聆音雷修版本的兼容与对应功能的适配.
 原来雷修版本因为要做到通用, 所以大屏页面播放的适配头像都比较大, 我对比了手杀的动皮播放页面发现还是需要做更多的微调兼容,
 现在可以使用原来调整待机动画的方式调整大屏页面播放的大小与位置细节了.  不过需要对千幻雷修的extension.js文件做一定的修改,
 readme.md中我会详细记录如何修改以使得雷修版本比较好的进行兼容.
 2. 如果一个动皮的攻击动作有两个(比如吕绮玲的战场绝版), 可以两个动作标签都进行填写了, 这样进行攻击操作会随机播放一个动作.
 3. spine预览现在可以直接放进去文件夹进行预览
 4. 原来的player.logSkill技能我是copy的游戏本体比较老的版本, 所以这个会出现一些问题, 现在补充为最新的了.
 5. 现在支持在十周年真动皮的角色在回合开始播放出场动画, 以及十周年动皮默认原地出框和不位移(需要在dynamicSkin配置参数)

 十周年动皮细节: 出框攻击速度会提高为1.2, 出场动作会默认提高放大scale1.2倍

 */

/** 1.03版本更新:
 1. 重写了动画出框的逻辑, 现在统一把所有需要出框播放的动画放到单独的worker进行工作, 不再是原来eng的出框原理了, 不会再复现一瞬间闪屏的问题.
 2. 十周年UI文件不再需要导入, 现在十周年UI版本随意, 已经测试了最新的showK版本的十周年Ui, 没有出现问题.
 3. 十周年样式下出框背景不再会被覆盖.
 4. 所有动皮的出框播放速度默认为1.2
 5. 千幻大屏预览下, 可以进行调整背景.
 */

/** 1.04版本更新:
 1. 重置动皮存档功能, 当你更换的dynamicSkin.js与上一个版本内容差距较大时，需重置
 2. 瓜佬的限定技特效等需要读取动皮的皮肤放到框内, 适配了这一逻辑, 防止读取不到皮肤的问题.
 3. 配合千幻雷修1.64版本增加了手杀大屏播放出框允许反转的功能.
 4. 增加了出场可以使用待机皮肤进行出场代替.
 */

/** 1.05版本更新:
 1. 修复双将模式下的背景问题. 现在双将模式下如果都有动态背景的话, 会使用各自的背景, 而不会互相覆盖.  当然静态背景还是只会使用一个
 2. 千幻大屏预览下, 可以进行调整背景.
 3. 国战双将模式下, 显示武将问题修复, 层级问题修复. (千幻雷修的手杀和十周年套装下, 动皮即使是暗将也会直接显示(千幻bug))
 */

/** 1.06版本更新:
 1. 修复logSkill bug, 让技能在释放前触发特殊动画
 2. 添加指示线测试. 暂时效果不算很好, 比较乱
 3. 预览spine添加动画时间显示
 */

/** 1.07版本更新
  1. 指示线能正确指示武将框中央.
  2. 将十周年worker的文件放到自己这边进行管理, 以后不用进行替换十周年文件替换了
  3. 增加将动皮音效放入十周年文件夹动皮同文件下, 也ok
  4. 可以使用json骨骼作为待机骨骼, 可以使用需要alpha预乘的骨骼
  6. 增加开局和回合开始结束检查角色的框是否正确. 修复界左慈这类可以变换势力的武将
  7. 预览spine添加鼠标控制以及滑动控制大小位置, 双指捏合放大缩小
  8. 修复动皮出框可能抽搤抖动问题
*/

/** 1.08版本更新
 1. 修复logSkill bug, 让技能在释放前触发特殊动画
 2. 添加指示线测试. 暂时效果不算很好, 比较乱
 3. 预览spine添加动画时间显示
 */

/** 1.09版本更新
 1. 指示线能正确指示武将框中央.
 2. 将十周年worker的文件放到自己这边进行管理, 以后不用进行替换十周年文件替换了
 3. 增加将动皮音效放入十周年文件夹动皮同文件下, 也ok
 4. 可以使用json骨骼作为待机骨骼, 可以使用需要alpha预乘的骨骼
 6. 增加开局和回合开始结束检查角色的框是否正确. 修复界左慈这类可以变换势力的武将
 7. 预览spine添加鼠标控制以及滑动控制大小位置, 双指捏合放大缩小
 8. 修复动皮出框可能抽搤抖动问题
*/

/** 1.10版本更新
 1. 修复logSkill bug, 让技能在释放前触发特殊动画
 2. 添加指示线测试. 暂时效果不算很好, 比较乱
 3. 预览spine添加动画时间显示
 */

/** 1.11版本更新
 1. 指示线能正确指示武将框中央.
 2. 将十周年worker的文件放到自己这边进行管理, 以后不用进行替换十周年文件替换了
 3. 增加将动皮音效放入十周年文件夹动皮同文件下, 也ok
 4. 可以使用json骨骼作为待机骨骼, 可以使用需要alpha预乘的骨骼
 6. 增加开局和回合开始结束检查角色的框是否正确. 修复界左慈这类可以变换势力的武将
 7. 预览spine添加鼠标控制以及滑动控制大小位置, 双指捏合放大缩小
 8. 修复动皮出框可能抽搤抖动问题
*/

/** 1.11.1与1.11.2版本更新
 1. 骨骼预览判断更完整, 防止报错
 2. 骨骼预览图层关闭bug
 3. 手杀骨骼连续出框抽搤抖动问题
 4. 修复ani文件修改导致位置偏移bug

 */

/** 1.12版本更新
 1. 更新4.0骨骼预览
 2. 修复晋武将会显示的bug
 3. 添加ai攻击翻转参数, 根据当前是否在屏幕中央的左侧, 是就就行翻转X轴, 也可以在动皮参数处添加参数控制单个动皮的出框翻转
 4. 修复出框模糊问题 (添加dpr适配就行)
 5. 手机预览骨骼时稍微增加下间隙.

 */

/** 1.13版本更新
 1. 增加了3.8和4.0骨骼在游戏内的支持
 2. 预览同步更新了3.8骨骼的预览
 3. 指示线攻击方式稍微做了修改.

 */

/** 1.14版本更新
 1. 增加d动态皮肤参数转化
 2. 修复4.0和3.8无法clip和hide slots的问题. 模仿3.6的做法
 3. 添加长按骨骼更换骨骼皮肤.
 4. 指示线增加非攻击角色也可以添加
 5. 可以主动攻击不出框
 6. 添加待机可以指定骨骼的皮肤, 出框也可以指定.
 */

/** 1.15版本更新
 1. 修复d动态皮肤参数转换错误
 2. 修复4.0和3.8clip slots报错bug
 3. 支持播放spine 4.0特效
 */

/** 1.16版本更新
 1. 添加动态生成模板参数, 已经有的不会继续添加
 2. 骨骼动画现在可以任意版本进行混用
 3. 修改预览页面, 可以指定文件夹
 4. 调整骨骼位置可以长按十字键修改, 并且可以拖动编辑显示框
 5. l2d尝试, 卡的话关闭该功能即可.
 6. 内置了两个蔡文姬的特效, 一个是判定特效, 一个是击杀特效.
 */

/** 1.17版本更新
 1. 更改动静切换皮肤功能
 2. 修改编辑动皮样式
 3. 预览spine可以记录上一次访问的路径
 4. 添加多个可以自动更换骨骼的时机. 配合十周年曹纯至臻双动皮皮肤
 5. l2d功能稍微添加下, 长按可以切换.

 */

/** 1.18版本更新
 1. 修复觉醒与限定技弹窗bug
 2. 支持3.5-4.1版本骨骼播放
 3. 修复部分机型不能使用spine3.8骨骼的问题
 4. 增加图集预览骨骼的模式
 5. 预览模式下, 初始化尽量自适应大小与查看位置
 6. 兼容千幻雷修1.75版本调整大页面数据无效的问题, 不过需要手动在雷修ext添加几行代码
 7. 指示线额外添加两种位置, 分别可以指定起始点或者固定起始点. 技能出框添加白名单, 只有在白名单的技能才可以技能出框, 可以添加玩家的出场位置
 8. 适当调大了编辑骨骼参数工具条之间的距离, 添加了一个显示当前编辑参数的信息框.
 9. 修复了攻击骨骼和待机骨骼指定了不同版本会报错的问题
 */

/** 1.19版本更新
 1. 更新自动变身可以读取卡牌语音和技能语音, 并且支持自动更换动皮对应的静皮
 2. 需要变身的骨骼提前预加载, 防止突然觉醒加载大骨骼导致的卡顿闪退现象
 3. 修复变身的一些问题
 4. 特殊特效都支持播放动画与播放一段语音
 5. 修复特殊白名单问题,
 6. 增加指定同骨骼其他标签达到手杀动皮进场的效果. 原来默认为ChuChang且不可指定
 */

/** 1.19.1版本更新
 1. 添加两个时机,
    1) 使命技失败和成功
    2) 添加受伤时机, 更改以前的受伤次数时机
 2. 修复安装特效测试使用静皮可能报错的问题.
 */

/** 1.20版本更新
 1. 修复自由选将报id错误
 1) 添加藏宝阁功能
 */

/**1.21版本更新
1.添加前景、技能变身换肤
2.删除藏珍阁*/