'use strict';
importScripts('spine.js', './spine-lib/spine_4_0_64.js', './spine-lib/spine_3_8.js',
    './spine-lib/spine_3_5_35.js', './spine-lib/spine_3_7.js', './spine-lib/spine_4_1.js','./spine-lib/spine_4_2.js', 'animation.js', 'settings.js', 'animations.js' );
let window = self;
let devicePixelRatio = 1;
let documentZoom = 1;
let HTMLCanvasElement = function () {
    return 'HTMLCanvasElement';
};

class HTMLElement {

    constructor(bound, bodySize) {
        this.boundRect = bound
        this.bodySize = bodySize
    }

    getBoundingClientRect() {
        return this.boundRect
    }
}


Array.prototype.remove = function (item) {
    var index = this.indexOf(item);
    if (index >= 0) return this.splice(index, 1);
    return item;
}

/** @type {PlayerAnimation} */
let playerAnimation
let chukuangId = 99999   // 自动出框的nodeID起始, 为了不和主线程传过去的skinId重复

// 用来管理所有角色的公共出框animation
class PlayerAnimation {

    constructor(data) {

        this.animationManager = new AnimationManager(data.pathPrefix, data.canvas, 989898, {dpr: data.dpr})
        this.playerAni = {}  // 这个用来管理每个角色的Id及其skinId的配置数据

        this.playerState = {}  // 管理每个角色出框状态, 同时保证一个角色只能有一个出框状态.
        this.isMobile = data.isMobile
        this.isAttackFlipX = data.isAttackFlipX
    }

    getAnni(player, version) {
        if (version) {
            return this.animationManager.getAnimation(version)
        }
        return this.animationManager.getAnimation(player.version)
    }

    // 提前把当前角色动皮需要用到的骨骼加载, 可能有默认的骨骼, 出场骨骼, 攻击骨骼, 特殊骨骼
    preLoadPlayerSkel(data) {
        let player = data.player
        if (!player) return
        let _this = this
        this.completeParams(player)
        let pLoad = function (actionParams, times) {
            if (actionParams) {
                actionParams.alpha = actionParams.alpha == null ? player.alpha : actionParams.alpha
                // 修复：为version提供默认值，避免undefined错误
                let version = actionParams.version || (player && player.version) || '3.6';
                let anni = _this.getAnni(player, version)

                if (!anni.hasSpine(actionParams.name)) {
                    let skelType = actionParams.json ? 'json': 'skel';
                    anni.loadSpine(actionParams.name, skelType, function () {
                        console.log('预加载骨骼成功', actionParams.name)
                    }, function () {
                        console.log('播放骨骼失败, 参数: ', actionParams, '次数: ', times)
                        if (times < 0) {
                            pLoad(actionParams, times + 1)
                        }
                    });
                }
            }
        }
        let arr = []
        for (let act of [{name: player.name, json: player.json, alpha: player.alpha}, player.gongjiAction, player.teshuAction, player.chuchangAction]) {
            if (act && !arr.includes(act.name)) {
                arr.push(act.name)
                pLoad(act, 0)
            }
        }
        if (data.id != null && !(data.id in this.playerAni)) {
            this.playerAni[data.id] = {}
        }
        if (data.skinId != null && !(data.skinId in this.playerAni[data.id])) {
            this.playerAni[data.id][data.skinId] = {}
            this.playerAni[data.id][data.skinId] = player
        }

    }

    findPlayerParams(id, skinId) {
        if (!(id in this.playerAni)) {
            return
        }
        if (!(skinId in this.playerAni[id])) {
            return
        }
        return this.playerAni[id][skinId]
    }

    playAction(data) {
        let player = this.findPlayerParams(data.id, data.skinId)
        if (!player) return
        let actionParams
        if (data.action === 'GongJi') actionParams = player.gongjiAction
        else if (data.action === 'chukuang') actionParams = player.chuchangAction
        else if (data.action === 'TeShu') actionParams = player.teshuAction
        else actionParams = player[data.action + 'Action']
        if (!actionParams) return

        // 是否触发连续攻击
        if (actionParams.playNode) {
            clearTimeout(actionParams.moveToTimeout)
            clearTimeout(actionParams.showTimeout)
            return this.lianxuChuKuang(player, actionParams, data)
        }

        // 修复：为version提供默认值，避免undefined错误
        let version = actionParams.version || (player && player.version) || '3.6';
        if (!this.getAnni(player, version).hasSpine(actionParams.name)) {
            this.getAnni(player, version).loadSpine(actionParams.name, actionParams.json ? 'json': 'skel', () => {
                this.playChuKuang(player, actionParams, data)
            }, this.errPlaySpine)
        } else {
            this.playChuKuang(player, actionParams, data)
        }
    }

    playChuKuangSpine(playNode, animation, data, notSetPos) {

        // 是否要取消连续出框
        if (!this.playerState[data.id]) {
        }
        this.playerState[data.id] = {'time': new Date().getTime()};
        this.playerState[data.id]['action'] = data.action
        // playNode.angle = undefined
        let showTime = animation.showTime * 1000
        let delayTime = 400
        
        if (!(playNode.player.shizhounian || playNode.player.chuchang || playNode.player.qhlxBigAvatar)) {
            if (showTime <= 800) {
                delayTime = 200
            }
            if (showTime <= 1200) {
                delayTime = 300
            }
            showTime -= delayTime
            showTime += showTimeBefore

            // 暂时还是开启动画播放速度默认调为1.2, 默认为1太慢了
            if (playNode.speed == null || playNode.speed === 1) playNode.speed = 1

        } else {
            if (playNode.speed == null || playNode.speed === 1) playNode.speed = 1


        }
        showTime /= (playNode.speed || 1)
        console.log('showTime', showTime, animation.showTime, playNode.speed, 'action:', data.action)
        // 如果是连续攻击, 延长展示的时间, 回框速度加快
        // if (notSetPos && !(playNode.player.shizhounian || playNode.player.chuchang || playNode.player.qhlxBigAvatar)) {
        //     showTime += delayTime - 150
        //     delayTime = 150
        // }
        playNode.actionParams.showTimeout = setTimeout(() => {
            // 如x果是手杀大屏预览的页面则不位移到原处
            if (playNode.player.shizhounian || playNode.player.chuchang || playNode.player.qhlxBigAvatar) {
                playNode.actionParams.playNode = null
                playNode.opacity = 0
                postMessage({
                    'message': 'recoverDaiJi',
                    'id': data.id,
                    'skinId': data.skinId,
                    qhlxBigAvatar: playNode.player.qhlxBigAvatar,
                })
                this.playerState[data.id] = false
                playNode.completed = true
                playNode.skeleton.completed = true  // 这里一定要标记为true, 不然下次skeleton对象会一直重复实例化
            } else {
                playNode.moveTo(data.player.x, data.player.y, delayTime);
                playNode.actionParams.moveToTimeout = setTimeout(() => {
                    playNode.actionParams.playNode = null
                    playNode.opacity = 0
                    playNode.completed = true
                    playNode.skeleton.completed = true
                    postMessage({
                        'message': 'recoverDaiJi',
                        'id': data.id,
                        'skinId': data.skinId,
                    })

                    this.playerState[data.id] = false
                }, delayTime - showTimeBefore)
            }
        }, showTime)
        // 重新恢复攻击pose
        if (data.action === 'chuchang') {
            // 出场动画直接使用调整后的大小，不进行额外的放大缩小
            // 保持当前设置的scale值不变
            // 注释掉放大缩小逻辑，让角色按照调整的大小直接播放
        }
        // 设置是否翻转
        if (!data.me) {
            if (playNode.player.atkFlipX || this.isAttackFlipX) {
                if (data.direction.isLeft) {
                    playNode.flipX = playNode.flipX == null ? true : !playNode.flipX
                }
            }
        }
        if (!notSetPos) {
            setPos(playNode, data);
        }
        playNode.opacity = 1
        this.playZhiShiXianWithPlayNode(playNode, animation, data)
    }

    playZhiShiXianWithPlayNode(playNode, animation, data) {
        let dy = playNode.player.zhishixian
        if (dy) {
            let delay = dy.delay
            if (animation.playRate && delay) {
                delay = delay - animation.playRate
                if (delay < 0) {
                    delay = 0
                }
            }
            this.playZhiShiXian(playNode.player, playNode.actionParams.attackArgs,  data, animation.showTime * (delay * 1000 || 0), playNode)
        }

    }

    // 播放指示线
    playZhiShiXian(player, attackArgs, data, zhishixianDelay, playNode) {
        // 攻击动作播放指示线动画
        if (data.action === 'GongJi') {
            if (player && attackArgs) {
                let dy = player.zhishixian
                if (dy != null) {
                    setTimeout(() => {

                        let playBaoZha = () => {
                            for (let p of attackArgs.targets) {
                                let sprite = Object.assign({}, dy.effect)
                                // sprite.x = p.x
                                // sprite.y = attackArgs.bodySize.bodyHeight - p.y
                                let referNode = new HTMLElement(p.boundRect, attackArgs.bodySize)
                                // 修复：为version提供默认值，避免undefined错误
                                let spriteVersion = sprite.version || (player && player.version) || '3.6';
                                this.getAnni(player, spriteVersion).playSpine(sprite, {referNode: referNode})
                            }
                        }

                        let playZhishixian = () => {

                            let zhishixianTime = 0
                            console.log('attackArgs --> ', attackArgs)

                            // 获取攻击起始点
                            let getStartXY = () => {
                                let x1, y1

                                if (playNode) {
                                    if (dy.startPos === 'player') {
                                        return {
                                            x1: attackArgs.attack.x,
                                            y1: attackArgs.attack.y + attackArgs.attack.height / 2
                                        }
                                    } else if (typeof dy.startPos === 'object') {
                                        return {
                                            x1: attackArgs.bodySize.bodyWidth * dy.startPos.x[1] + dy.startPos.x[0],
                                            y1: attackArgs.bodySize.bodyHeight - attackArgs.bodySize.bodyHeight * dy.startPos.y[1] - dy.startPos.y[0],
                                        }
                                    } else {
                                        if (Array.isArray(playNode.x)) {
                                            x1 = attackArgs.bodySize.bodyWidth * playNode.x[1] + playNode.x[0];
                                        } else {
                                            x1 = playNode.x;
                                        }

                                        if (Array.isArray(playNode.y)) {
                                            y1 = attackArgs.bodySize.bodyHeight - attackArgs.bodySize.bodyHeight * playNode.y[1] - playNode.y[0]
                                        } else {
                                            y1 = attackArgs.bodySize.bodyHeight - playNode.y
                                        }
                                        if (!data.direction.isLeft) {
                                            x1 -= 50
                                        } else {
                                            x1 += 50
                                        }
                                        return {
                                            x1:  x1,
                                            y1:  y1
                                        }
                                    }


                                } else {
                                    // 起始点从攻击方的卡牌位置开始
                                    return {
                                        x1: attackArgs.attack.x,
                                        y1: attackArgs.attack.y + attackArgs.attack.height / 2
                                    }
                                }
                            }

                            // 计算当前角色和其他角色的角度. 参考十周年ui的指示线
                            for (let p of attackArgs.targets) {
                                let x2 = p.boundRect.left + p.boundRect.width / 2
                                let y2 = p.boundRect.bottom - p.boundRect.height / 2

                                let sprite = Object.assign({}, dy)

                                let {x1, y1} = getStartXY()

                                let angle = Math.round(Math.atan2(y1 - y2, x1 - x2) / Math.PI * 180)
                                sprite.angle = (dy.angle || 0) + 180 - angle

                                let startX = x1
                                let startY = y1
                                let endX = x2
                                let endY = attackArgs.bodySize.bodyHeight - y2

                                let getDis = (x1, x2, y1, y2) => {
                                    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
                                }

                                let getLineFunc = (x1, x2, y1, y2) => {
                                    // 斜率k
                                    let k = (y2 - y1) / (x2 - x1)
                                    let b = y2 - k * x2
                                    return (x) => {
                                        return k * x + b
                                    }
                                }

                                let dis = getDis(startX, x2, startY, y2)
                                if (dis < attackArgs.bodySize.bodyHeight / 2) {
                                    sprite.scale = (sprite.scale || 1) * 0.6
                                }
                                let referNode = new HTMLElement(p.boundRect, attackArgs.bodySize)
                                // let node = this.getAnni(playNode.player).playSpine(sprite, {referNode: referNode})

                                // 修复：为version提供默认值，避免undefined错误
                                let dyVersion = dy.version || (player && player.version) || '3.6';
                                let node = this.getAnni(player, dyVersion).playSpine(sprite, {x: startX, y:  attackArgs.bodySize.bodyHeight - startY})

                                if (!zhishixianTime) {
                                    let ani = node.skeleton.data.animations[0]
                                    zhishixianTime = ani.duration
                                }
                                // node.moveTo(endX, endY, zhishixianTime * 1000 * 100)
                                node.moveTo(endX, endY, zhishixianTime * 1000 * (sprite.factor || 0.5))

                            }

                            // 加载指示线后面的爆炸特效
                            if (dy.effect) {
                                // 获取指示线的动画时间, 在到达武将框后播放
                                setTimeout(() => {
                                    // 修复：为version提供默认值，避免undefined错误
                                    let effectVersion = dy.effect.version || (player && player.version) || '3.6';
                                    if (!this.getAnni(player, effectVersion).hasSpine(dy.effect.name)) {
                                        this.getAnni(player, effectVersion).loadSpine(dy.effect.name, dy.effect.json ? 'json': 'skel', playBaoZha)
                                    } else {
                                        playBaoZha()
                                    }
                                }, zhishixianTime / (dy.speed || 1)  * 1000 * dy.effect.delay || 0.5)
                            }
                        }

                        // 修复：为version提供默认值，避免undefined错误
                        let zhishixianVersion = dy.version || (player && player.version) || '3.6';
                        if (!this.getAnni(player, zhishixianVersion).hasSpine(dy.name)) {
                            this.getAnni(player, zhishixianVersion).loadSpine(dy.name, dy.json ? 'json': 'skel', playZhishixian)
                        } else {
                            playZhishixian()
                        }
                    }, zhishixianDelay)
                    // }, animation.showTime * (delay * 1000 || 0))
                }
            }
        }
    }

    setSkin(actionParams, node) {
        let skins = node.skeleton.data.skins
        if (actionParams && actionParams.skin) {
            for (let i = 0; i < skins.length; i++) {
                if (skins[i].name === actionParams.skin) {
                    // 设置skin
                    node.skeleton.setSkinByName(skins[i].name);
                    node.skeleton.setSlotsToSetupPose();

                }
            }
        }
        
        // 处理 hideSlots，用于显示或隐藏特定的骨骼部件（如头部或脸部）
        if (actionParams && actionParams.hideSlots && actionParams.hideSlots.length > 0) {
            for (let i = 0; i < node.skeleton.slots.length; i++) {
                let slot = node.skeleton.slots[i];
                if (actionParams.hideSlots.includes(slot.data.name)) {
                    // 隐藏指定的部件
                    slot.color.a = 0;
                }
            }
        }
    }

    // 手杀触发连续攻击不会马上回框, 而是会在原地重置攻击动作, 当回到框内, 则重新出框
    lianxuChuKuang(player, actionParams, data) {
        // 重置播放动作与回框倒计时.
        let playNode = actionParams.playNode
        // 这里说明上一次出框已经完成, 可能会让原来的待机显现, 保险起见, 再发一次隐藏的消息
        // 判断上次的动作是否播放完成.
        // 修复：为version提供默认值，避免undefined错误
        let version = actionParams.version || (playNode.player && playNode.player.version) || '3.6';
        if (!this.getAnni(playNode.player, version).nodes.includes(playNode)) {
            playNode.skeleton.completed = true
            
            // 确保连续攻击时也能隐藏指定部件
            if (player.hideSlots) {
                playNode.actionParams.hideSlots = player.hideSlots
            }
            
            let playedSprite = this.getAnni(playNode.player, version).playSpine(playNode.actionParams)
            this.setSkin(actionParams, playedSprite)
            playedSprite.player = player
            playedSprite.actionParams = actionParams
            actionParams.playNode = playedSprite
            return this.playChuKuangSpine(playedSprite, {showTime: actionParams.showTime}, data)
        }

        let state = actionParams.playNode.skeleton.state
        let entry = state.tracks[0]
        let lastTime = entry.animationEnd
        let curTime = entry.animationLast

        playNode.player = player
        playNode.actionParams = actionParams
        if (actionParams.triggername !== 'useCardBefore' && data.action === 'GongJi' && playNode.actionParams.attackArgs) {
            if (curTime / lastTime >= 0.75) {
                entry.trackTime = 0
                console.log('多指重置')
            } else {
                lastTime = lastTime - curTime
                console.log('多指连续')
            }
        } else if (data.action === 'chuchang') {
            // 出场动画需要播放更完整才重置
            if (curTime / lastTime >= 0.8) {
                entry.trackTime = 0
                console.log('出场动画重置----', curTime/lastTime, curTime)
            } else {
                lastTime = lastTime - curTime
                console.log('出场动画不重置------', curTime/lastTime, curTime)
            }
        } else if (data.action === 'TeShu') {
            // 特殊动画需要播放更完整才重置
            if (curTime / lastTime >= 0.7) {
                entry.trackTime = 0
                console.log('特殊动画重置----', curTime/lastTime, curTime)
            } else {
                lastTime = lastTime - curTime
                console.log('特殊动画不重置------', curTime/lastTime, curTime)
            }
        } else {
            if (curTime / lastTime >= 0.1) {
                entry.trackTime = 0
                console.log('重置----', curTime/lastTime, curTime)
            } else {
                lastTime = lastTime - curTime
                console.log('不重置------', curTime/lastTime, curTime)
            }
        }

        playNode.completed = false
        playNode.skeleton.completed = true
        let notSetPos = false
        if (!player.shizhounian) {
            // 比较当前位置和回框的位置距离, 如果比较小了, 就重新出框

            if ((Math.abs(playNode.renderY - data.player.y)) > data.player.height / 3 * 2 || Math.abs(playNode.renderX - data.player.x) > data.player.width / 3 * 2){
                notSetPos = true
            }
        }
        this.playChuKuangSpine(playNode, {showTime: lastTime, playRate: entry.trackTime / lastTime}, data, notSetPos)
    }

    playChuKuang(player, actionParams, data) {

        // 获取存储的action对应的动画状态
        let actionState = player.actionState
        if (!actionState || !actionState[data.action]) return

        actionParams.id = chukuangId++

        let actionInfo = actionState[data.action]

        if (Array.isArray(actionInfo)) {
            let selectAction = randomChoice(actionInfo)
            actionParams.showTime = selectAction.showTime
            actionParams.action = selectAction.action
        } else {
            actionParams.showTime = actionInfo.showTime
            actionParams.action = actionInfo.action
        }
        
        // 复制 hideSlots 参数到 actionParams，确保攻击出框时也能隐藏指定部件
        if (player.hideSlots) {
            actionParams.hideSlots = player.hideSlots
        }
        
        // 修复：为version提供默认值，避免undefined错误
        let version = actionParams.version || (player && player.version) || '3.6';
        let playedSprite = this.getAnni(player, version).playSpine(actionParams)
        playedSprite.player = player
        playedSprite.actionParams = actionParams
        this.setSkin(actionParams, playedSprite)
        actionParams.playNode = playedSprite

        this.playChuKuangSpine(playedSprite, {showTime: actionParams.showTime}, data);
    }

    errPlaySpine (data) {
        console.log('播放失败....', data)
    }

    // 补全配置参数 player: 这个是播放待机动作存取的配置参数
    completeParams(player) {
        if (!player) return
        // 给一些简化初始化方式的攻击参数补全
        let initPlayerGongJi = function () {
            if (!player.gongji) {
                player.gongji = {}
                player.qhlxAutoSetGongJi = true  // 用来标记是千幻页面没有设置gongji自动添加上的标记. 手杀是真动皮, 带有gongji标签
            } else if (typeof player.gongji === 'string') {
                player.gongji = {
                    action: player.gongji
                }
            } else if (player.gongji === true) {
                player.gongji = {}
                player.fakeDynamic = true
            }
        }
        if (player.qhlxBigAvatar) {
            if (player.isDecade) {
                player.qhlx = player.qhlx && player.qhlx.decade // 如果当前是十周年样式, 用十周年的配置覆盖.
            }
            if (player.qhlx) {
                if (player.qhlx.gongji) {
                    initPlayerGongJi()
                    player.gongji = Object.assign(player.gongji, player.qhlx.gongji)
                } else {
                    // 使用雷修默认的出框参数
                    initPlayerGongJi()
                    if (playerAnimation.isMobile) {
                        player.gongji.x = player.divPos.x + player.divPos.width / 2;
                        player.gongji.y = player.divPos.y + player.divPos.height / 2;
                        if (player.gongji.name === player.name) {
                            player.gongji.scale = player.scale * 0.6
                        } else {
                            player.gongji.scale = player.largeFactor * (player.gongji.scale || 1) * 0.55
                        }
                    } else {
                        player.gongji.x = player.divPos.x + player.divPos.width / 2;
                        player.gongji.y = player.divPos.y + player.divPos.height / 2;
                        player.gongji.scale = player.scale * 0.55
                    }
                }
            } else {
                initPlayerGongJi()
                // fix 大屏预览参数使用雷修默认的出框偏移
                if (playerAnimation.isMobile) {
                    if (!player.gongji) {
                        player.gongji = {}
                    }
                    player.gongji.x = player.divPos.x + player.divPos.width / 2;
                    player.gongji.y = player.divPos.y + player.divPos.height / 2;
                    if (!player.gongji.name ||  player.gongji.name === player.name) {
                        player.gongji.scale = player.scale * 0.6
                    } else {
                        player.gongji.scale = player.largeFactor * (player.gongji.scale || 1) * 0.55
                    }
                } else {
                    player.gongji.x = player.divPos.x + player.divPos.width / 2;
                    player.gongji.y = player.divPos.y + player.divPos.height / 2;
                    player.gongji.scale = player.scale * 0.55
                }
            }

        }

        let gongjiAction, teshuAction
        let gongji = player.gongji
        let teshu = player.teshu
        let gongjiType = typeof gongji
        let teshuType = typeof teshu

        // 定义为十周年的开局出场
        let chuchang = player.chuchang
        let chuchangType = typeof chuchang

        // 如果填写了出场参数, 基本确认是十周年的真动皮
        if (chuchang) {
            if (chuchangType === 'object') {
                if (!chuchang.name) {chuchang.name = player.name}
                if (!chuchang.action) {chuchang.action = 'play'}
                if (!chuchang.scale) {chuchang.scale = player.scale}
                player.chuchangAction = chuchang
            }
        }

        // 这是原来的EngEX扩展的判断手杀真动皮的写法. player.pos用来调整出框位置参数, 兼容此种写法, 如果填写了pos认为是原来的真动皮
        if (player.pos) {
            gongjiAction = {
                name: player.name,  // 和原来的皮肤一样
                x: player.pos.x,
                y: player.pos.y,
                scale: player.scale,
                action: 'GongJi'
            }
            teshuAction = {
                name: player.name,
                x: player.x,
                y: player.y,
                action: 'TeShu'  // 可以手动指定相同动皮的特殊动作
            }
            // 如果还填写了具体的攻击参数, 那么用攻击参数覆盖原来的配置
            if (gongjiType === 'object') {
                gongjiAction = Object.assign(gongjiAction, gongji)
            } else if (gongjiType === 'string') {
                gongjiAction.action = gongji
            }
            if (teshuType === 'object') {
                teshuAction = Object.assign(teshuAction, teshu)
            } else if (teshuType === 'string') {
                teshuAction.action = teshu
            }
        } else {
            // 只指定了攻击的动画标签, 那么使用当前动皮指定的标签在屏幕中间播放
            if (gongjiType === 'string') {
                gongjiAction = {
                    name: player.name,  // 和原来的皮肤一样
                    x: [0, 0.5],
                    y: [0, 0.5],
                    scale: player.scale,  //
                    action: player.gongji,
                    posAuto: true
                }
            }
            // 如果是简单的设置为true, 那么说明当前动皮是静态皮肤, 也想出框, 那么和上面一样, 播放当前待机动作到中央
            else if (gongji === true) {
                gongjiAction = {
                    name: player.name,  // 和原来的皮肤一样
                    x: [0, 0.5],
                    y: [0, 0.5],
                    scale: player.scale,  //
                    fakeDynamic: true,
                    posAuto: true
                }
            } else if (gongjiType === 'object') {
                gongjiAction = gongji
                if (!gongjiAction.name) {
                    gongjiAction.name = player.name
                } else {
                    gongjiAction.name = getFullName(player.localePath, gongjiAction.name)
                }
                if (!gongjiAction.x) {
                    gongjiAction.x = [0, 0.5]
                    gongjiAction.posAuto = true  // 自动设置的位置, 如果是十周年的动皮的话, 原地出框
                }
                if (!gongjiAction.y) {
                    gongjiAction.y = [0, 0.5]
                    gongjiAction.posAuto = true
                }
                if (!gongjiAction.scale) {gongjiAction.scale = player.scale}
                if (!gongjiAction.action && gongjiAction.name === player.name) {
                    gongjiAction.fakeDynamic = true
                }
            } else {
                // 默认从当前皮肤的GongJi标签来播放动作
                gongjiAction = {
                    name: player.name,  // 和原来的皮肤一样
                    x: [0, 0.5],
                    y: [0, 0.5],
                    scale: player.scale,
                    action: 'GongJi'  // 寻找默认的攻击动画标签名称
                }
            }

            // 特殊动作同样处理
            if (teshuType === 'string') {
                teshuAction = {
                    name: player.name,  // 和原来的皮肤一样
                    x: [0, 0.5],
                    y: [0, 0.5],
                    scale: player.scale,
                    action: player.teshu,
                }
            }
            else if (teshuType === 'object') {
                teshuAction = teshu
                if (!teshuAction.name) {
                    teshuAction.name = player.name
                } else {
                    teshuAction.name = getFullName(player.localePath, teshu.name)
                }
                // 特殊动画还是最好不要出框, 不然触发频率太高了...
                if (teshuAction.name !== player.name) {
                    if (!teshuAction.x) {
                        teshuAction.x = [0, 0.5]
                        teshuAction.posAuto = true
                    }
                    if (!teshuAction.y) {
                        teshuAction.y = [0, 0.5]
                        teshuAction.posAuto = true
                    }

                } else {
                    if (!teshuAction.x) {teshuAction.x = player.x}
                    if (!teshuAction.y) {teshuAction.y = player.y}
                }
                if (!teshuAction.scale) {teshuAction.scale = player.scale}
            } else {
                // 默认从当前皮肤的TeShu标签来播放动作
                teshuAction = {
                    name: player.name,  // 和原来的皮肤一样
                    x: [0, 0.5],
                    y: [0, 0.5],
                    scale: player.scale,
                    action: 'TeShu',  // 寻找默认的攻击动画标签名称
                    posAuto: true
                }
            }
        }

        player.gongjiAction = gongjiAction
        player.teshuAction = teshuAction
    }
}

function setShiZhouNianGongJiPos(apnode, data) {

    if (data.me) {
        let xRate = data.player.x / data.player.bodyWidth
        if (xRate < 0.5) {
            apnode.x = data.player.x + data.player.width
        } else {
            apnode.x = data.player.x - data.player.width / 3
        }
        // apnode.x = data.player.x - data.player.width / 3
        apnode.y = data.player.y + data.player.height * 1.1
    } else {
        let xRate = data.player.x / data.player.bodyWidth
        let yRate = (data.player.y + data.player.height) / data.player.bodyHeight

        // 根据每个人当时的位置偏移
        apnode.x = data.player.x + data.player.width / 2
        apnode.y = data.player.y + data.player.height / 2 - 40
        if (xRate < 0.15) {
            apnode.x += data.player.width * 0.3
        }

        if (xRate > 0.85) {
            apnode.x -= data.player.width * 0.3
        }


        if (yRate > 0.9) {
            apnode.y -= data.player.height * 0.3
        }

    }
}

function setPos(apnode, data) {
    if (apnode.player.qhlxBigAvatar){
        apnode.x = apnode.player.gongjiAction.x
        apnode.y = apnode.player.gongjiAction.y
        return
    }
    if (data.me) {
        // 获取
        let actionParams
        if (data.action === 'GongJi') {
            actionParams = apnode.player.gongjiAction
            // 十周年默认的
            if (actionParams.posAuto && apnode.player.shizhounian) {
                return setShiZhouNianGongJiPos(apnode, data)
            }
        }
        else if (data.action === 'TeShu') {
            actionParams = apnode.player.teshuAction
            if (actionParams.posAuto && apnode.player.shizhounian) {
                return setShiZhouNianGongJiPos(apnode, data)
            }
        } else if (data.action === 'chuchang') {
            // 如果设置了出场的位置, 那么不使用默认的位置
            if (apnode.player.chuchangAction.x && apnode.player.chuchangAction.y) {
                return
            }
            apnode.x = data.player.x + data.player.width / 4
            apnode.y = data.player.y + data.player.height * 0.8
            return setShiZhouNianGongJiPos(apnode, data)
            // 出场是原地出场
        } else {
            return
        }
        apnode.x = actionParams.x
        apnode.y = actionParams.y
        data.player.y += data.player.height * 0.8
        data.player.x += data.player.width * 0.4
    } else {
        if (data.action === 'chuchang') {
            apnode.x = data.player.x + data.player.width / 2
            apnode.y = data.player.y + data.player.height / 2 - 60
            return // setShiZhouNianGongJiPos(apnode, data)
        }
        else if (data.action === 'GongJi') {
            if (apnode.player.shizhounian) {
                return setShiZhouNianGongJiPos(apnode, data)
            }
        } else if (data.action === 'TeShu') {
            if (apnode.player.shizhounian) {
                return setShiZhouNianGongJiPos(apnode, data)
            }
        }
        // 调整其他玩家手杀出框位置，AI出框x反转+60
        if (data.direction.isLeft) {
            apnode.x = data.player.x + data.player.width / 2 + 90;  // 向左时，向右偏移60
        } else {
            apnode.x = data.player.x + data.player.width / 2 - 90;  // 向右时，向左偏移60
        }
        apnode.y = data.direction.y;
        if (data.direction.isLeft) data.player.x += 85; else data.player.x += 40;
    }
}

// 填写了动皮的路径, 原来默认是放在assets/dynamic文件夹下, 这样不太好管理, 可以建立角色的文件夹,
// 然后填写localePath参数即可.如果包含本地路径的话, 再添加上文件夹路径作为骨骼的路径
function getFullName(localePath, name) {
    if (!localePath) return name
    if (!name.startsWith(localePath + '/')) {
        name = localePath + '/' + name
    }
    return name
}


// 返回0-a-1中的随机整数
function randomInt(a) {
    return Math.floor(Math.random() * a)
}

// 返回数组中的随机一个值, 如果数组为空则放回undefined
function randomChoice(arr) {
    if (!arr || arr.length === 0) return undefined
    return arr[randomInt(arr.length)]
}


/** 消息处理函数 */

function createChuKuang(data) {
    playerAnimation = new PlayerAnimation(data)
    playerAnimation.dprAdaptive = false
}


// 预加载用到的骨骼
function preLoad(data) {
    playerAnimation.preLoadPlayerSkel(data)
}

function completePlayerParams(avatarPlayer, action) {
    if (avatarPlayer) {
        if (!avatarPlayer.actionState) {avatarPlayer.actionState = {}}
        else {
            if (avatarPlayer.actionState[action] === false) {
                return false
            }
            if (avatarPlayer.actionState[action] != null) {
                return true
            }
        }
        // 查找是否有该骨骼, 并且可否出框
        let daijiName = avatarPlayer.name
        let actionParams
        if (action === 'GongJi') actionParams = avatarPlayer.gongjiAction
        else if (action === 'TeShu') actionParams = avatarPlayer.teshuAction
        else if (action === 'chuchang') actionParams = avatarPlayer.chuchangAction
        else actionParams = avatarPlayer[action + 'Action']  // 这个写法是可以扩展随意任意想要出框的action, 默认可以出框的只有gongji,teshu,chuchang

        if (actionParams && actionParams.name === daijiName) {
            // 只支持假动皮攻击出框, 其他动作和待机相同, 不允许出框
            if (action === 'GongJi') {
                // 查找待机动作的默认动作标签, 并缓存
                // 修复：为version提供默认值，避免undefined错误
                let version = actionParams.version || (avatarPlayer && avatarPlayer.version) || '3.6';
                let results = playerAnimation.getAnni(avatarPlayer, version).getSpineActions(daijiName, actionParams.toLoadActions)
                if (results && results.length > 0) {
                    // 检查是否有GongJi标签, 如果有那是真动皮
                    if (actionParams.fakeDynamic) {
                        for (let r of results) {
                            if (r.name === 'GongJi') {
                                avatarPlayer.actionState[action] = {
                                    action: r.name,
                                    duration: r.duration,
                                    showTime: actionParams.showTime || r.duration
                                }
                                actionParams.fakeDynamic = false
                                avatarPlayer.qhlxAutoSetGongJi = false
                                return true
                            }
                        }
                        if (avatarPlayer.qhlxAutoSetGongJi) {
                            return false
                        }
                        avatarPlayer.actionState[action] = {
                            action: results[0].name,
                            duration: results[0].duration,
                            showTime: actionParams.showTime || Math.min(results[0].duration, 2)
                        }
                        return true

                    }
                    let isArray = Array.isArray(actionParams.action)
                    let states = []
                    for (let r of results) {
                        // 如果攻击填写的出多个标签, 那么顺便校验
                        if (isArray) {
                            if (actionParams.action.includes(r.name)) {
                                states.push({
                                    action: r.name,
                                    duration: r.duration,
                                    showTime: actionParams.showTime || r.duration
                                })
                            }
                        } else {
                            if (r.name === actionParams.action) {
                                avatarPlayer.actionState[action] = {
                                    action: r.name,
                                    duration: r.duration,
                                    showTime: actionParams.showTime || r.duration
                                }
                                return true
                            }
                        }
                    }
                    if (states.length > 0) {
                        avatarPlayer.actionState[action] = states
                        return true
                    }
                }
                avatarPlayer.actionState[action] = false
            }  else if (action === 'chuchang') {
                // 修复：为version提供默认值，避免undefined错误
                let version = actionParams.version || (avatarPlayer && avatarPlayer.version) || '3.6';
                let results = playerAnimation.getAnni(avatarPlayer, version).getSpineActions(daijiName, actionParams.toLoadActions)
                if (results && results.length > 0) {
                    for (let r of results) {
                        if (r.name === actionParams.action) {
                            avatarPlayer.actionState[action] = {
                                action: r.name,
                                duration: r.duration,
                                // 出场动画固定显示3秒
                                showTime: actionParams.showTime || 3
                            }
                            return true
                        }
                    }
                    // 使用第一个当作chuchang
                    avatarPlayer.actionState[action] = {
                        action: results[0].name,
                        duration: results[0].duration,
                        // 出场动画固定显示3秒
                        showTime: actionParams.showTime || 3
                    }
                    return true
                }
                avatarPlayer.actionState[action] = false
            } else {
                avatarPlayer.actionState[action] = false
            }
            avatarPlayer.actionState[action] = false
        } else {
            // 查找骨骼与正确的标签
            // 修复：确保actionParams存在且有有效的version参数
            if (!actionParams) {
                avatarPlayer.actionState[action] = false;
                return false;
            }
            
            // 为version提供默认值，避免undefined错误
            let version = actionParams.version || (avatarPlayer && avatarPlayer.version) || '3.6';
            let results = playerAnimation.getAnni(avatarPlayer, version).getSpineActions(actionParams.name, actionParams.toLoadActions)
            let isArray = Array.isArray(actionParams.action)
            let states = []

            if (results && results.length > 0) {
                if (!actionParams.action) {
                    avatarPlayer.actionState[action] = {
                        action: results[0].name,
                        duration: results[0].duration,
                        showTime: actionParams.showTime || results[0].duration
                    }
                    return true
                }
                for (let r of results) {
                    if (isArray) {
                        if (actionParams.action.includes(r.name)) {
                            let showTime = actionParams.showTime || r.duration
                            // 针对特殊动画确保最小显示时间
                            if (action === 'TeShu') {
                                showTime = actionParams.showTime || Math.max(r.duration, 1.5)
                            }
                            states.push({
                                action: r.name,
                                duration: r.duration,
                                showTime: showTime
                            })
                        }
                    } else {
                        if (r.name === actionParams.action) {
                            let showTime = actionParams.showTime || r.duration
                            // 针对特殊动画确保最小显示时间
                            if (action === 'TeShu') {
                                showTime = actionParams.showTime || Math.max(r.duration, 1.5)
                            }
                            avatarPlayer.actionState[action] = {
                                action: r.name,
                                duration: r.duration,
                                showTime: showTime
                            }
                            return true
                        }
                    }
                }
                if (states.length > 0) {
                    avatarPlayer.actionState[action] = states
                    return true
                }
            }
            avatarPlayer.actionState[action] = false;
        }
    }
}

function isChuKuang(data) {
    // 如果已经是出框状态, 直接返回, 不能在短时间内连续请求
    let playerState = playerAnimation.playerState[data.id]
    if (playerState) {
        let currentTime = new Date().getTime()
        
        // 针对出场动画设置更短的冷却时间，实现立即重播
        if (data.action === 'chuchang') {
            // 出场动画的冷却时间改为50ms，几乎立即重播
            if (playerState.time && currentTime - playerState.time <= 50) {
                return
            }
            playerState['time'] = currentTime
        }
        // 针对特殊动画设置更短的冷却时间，实现立即重播
        else if (data.action === 'TeShu') {
            // 特殊动画的冷却时间改为50ms，几乎立即重播
            if (playerState.time && currentTime - playerState.time <= 50) {
                return
            }
            playerState['time'] = currentTime
        }
        else {
            console.log(playerState, currentTime, currentTime - playerState.time < 40)
            if (playerState.action != null && playerState.action !== data.action) {
                return
            }
            if (playerState.lastAction === 'chuchang' && playerState.time && currentTime - playerState.time <= 50) {
                return
            }
            if (playerState.lastAction === 'TeShu' && playerState.time && currentTime - playerState.time <= 50) {
                return
            }
            // 延时40ms执行动作, 防止两次触发相近（保持原有逻辑）
            if (playerState.time && currentTime - playerState.time < 40) {
                // if (playerState.lastAction && playerState.lastAction !== data.action) {
                //     setTimeout(() => {
                //         isChuKuang(data)
                //     }, 100)
                // }
                return;
            }

        }

        // playerState['time'] = new Date().getTime()
        // playerState['lastAction'] = data.action
    }
    // else {
    //     playerAnimation.playerState[data.id] = {time: new Date().getTime(), lastAction: data.action}
    // }


    let primarySkinId = data.primarySkinId
    let deputySkinId = data.deputySkinId
    // 查找是否可以出框
    let primaryPlayer = playerAnimation.findPlayerParams(data.id, primarySkinId)

    let extraParams = data.extraParams

    // 检查是否是主动不出框
    let checkNoChukuang = (player) => {
        if (!player) return
        let actionParams
        if (data.action === 'GongJi') actionParams = player.gongjiAction
        else if (data.action === 'chukuang') actionParams = player.chuchangAction
        else if (data.action === 'TeShu') actionParams = player.teshuAction
        else actionParams = player[data.action + 'Action']
        if (extraParams) {
            if (actionParams) {
                for (let k in extraParams) {
                    actionParams[k] = extraParams[k]
                }
            }
        }
        if (actionParams && actionParams.ck === false) {
            if (player.zhishixian && extraParams) {
                playerAnimation.playZhiShiXian(player, extraParams.attackArgs, data, (player.zhishixian.delay * 1000) || 0)
            }
            postMessage({
                id: data.id,
                message: 'noActionChuKuang',
                action: data.action,
                qhlxBigAvatar: player && player.qhlxBigAvatar
            })
            return true
        }
    }
    if (checkNoChukuang(primaryPlayer)) {
        return
    }

    if (completePlayerParams(primaryPlayer, data.action)) {
        if (!playerState) {
            playerAnimation.playerState[data.id] = {time: new Date().getTime(), lastAction: data.action};
        } else {
            playerAnimation.playerState[data.id].time = new Date().getTime()
            playerAnimation.playerState[data.id].lastAction =  data.action
        }


        let actionParams
        if (data.action === 'GongJi') actionParams = primaryPlayer.gongjiAction
        else if (data.action === 'chukuang') actionParams = primaryPlayer.chuchangAction
        else if (data.action === 'TeShu') actionParams = primaryPlayer.teshuAction
        else actionParams = primaryPlayer[data.action + 'Action']
        if (extraParams) {
            if (actionParams) {
                for (let k in extraParams) {
                    actionParams[k] = extraParams[k]
                }
            }
        }
        clearTimeout(actionParams.moveToTimeout)
        clearTimeout(actionParams.showTimeout)


        return postMessage({
            id: data.id,
            skinId: primarySkinId,
            message: 'chukuangPrepare',
            action: data.action,
            isPrimary: true,
            qhlxBigAvatar: primaryPlayer.qhlxBigAvatar
        })
    }
  
    let deputyPlayer = playerAnimation.findPlayerParams(data.id, deputySkinId)
    if (checkNoChukuang(deputyPlayer)) {
        return
    }
    if (completePlayerParams(deputyPlayer, data.action)) {

        if (!playerState) {
            playerAnimation.playerState[data.id] = {time: new Date().getTime(), lastAction: data.action};
        } else {
            playerAnimation.playerState[data.id].time = new Date().getTime()
            playerAnimation.playerState[data.id].lastAction =  data.action
        }

        let actionParams
        if (data.action === 'GongJi') actionParams = deputyPlayer.gongjiAction
        else if (data.action === 'chukuang') actionParams = deputyPlayer.chuchangAction
        else if (data.action === 'TeShu') actionParams = deputyPlayer.teshuAction
        else actionParams = deputyPlayer[data.action + 'Action']
        if (extraParams) {
            if (actionParams) {
                for (let k in extraParams) {
                    actionParams[k] = extraParams[k]
                }
            }
        }
        // 需要重新出框了, 清除原来的出框消息
        clearTimeout(actionParams.moveToTimeout)
        clearTimeout(actionParams.showTimeout)
        return postMessage({
            id: data.id,
            skinId: deputySkinId,
            message: 'chukuangPrepare',
            action: data.action,
            isPrimary: false,
            qhlxBigAvatar: deputyPlayer.qhlxBigAvatar
        })
    }

    // 如果填写了指示线, 那么从指示线进行攻击
    if (primaryPlayer && primaryPlayer.zhishixian && extraParams) {
        return playerAnimation.playZhiShiXian(primaryPlayer, extraParams.attackArgs, data, (primaryPlayer.zhishixian.delay * 1000) || 0)
    }
    if (deputyPlayer && deputyPlayer.zhishixian && extraParams) {
        return playerAnimation.playZhiShiXian(deputyPlayer, extraParams.attackArgs, data, (primaryPlayer.zhishixian.delay * 1000) || 0)
    }

    postMessage({
        id: data.id,
        message: 'noActionChuKuang',
        action: data.action,
        qhlxBigAvatar: primaryPlayer && primaryPlayer.qhlxBigAvatar
    })
}


function chukuangStart(data) {
    playerAnimation.playAction(data)
}

function update(data) {
    if (playerAnimation) playerAnimation.animationManager.updateSpineAll(data)
    if (decadeUIAni) {
        decadeUIAni.updateSpineAll(data)
    }
}

function adjust(data) {
    let player = playerAnimation.findPlayerParams(data.id, data.skinId)
    if (!player) return;

    // 修复：支持调整不同类型的动作，包括出场动作
    let actionParams
    if (data.action === 'GongJi') {
        actionParams = player.gongjiAction
    } else if (data.action === 'chukuang' || data.action === 'chuchang') {
        actionParams = player.chuchangAction
    } else if (data.action === 'TeShu') {
        actionParams = player.teshuAction
    } else if (data.action) {
        actionParams = player[data.action + 'Action']
    } else {
        // 如果没有指定动作类型，默认调整攻击动作（保持兼容性）
        actionParams = player.gongjiAction
    }
    
    if (!actionParams) return

    if (data.x != null && data.y != null) {
        // 修改参数
        actionParams.x = data.x
        actionParams.y = data.y
    }
    if (data.scale != null) {
        // 同一个动皮出框通过调整静态大小即可.
        actionParams.scale = data.scale
    }
    if (data.angle != null) {
        // 同一个动皮出框通过调整静态大小即可.
        actionParams.angle = data.angle
    }
    actionParams.posAuto = false
    
    // 立即更新正在播放的动画
    let version = actionParams.version || (player && player.version) || '3.6';
    let animationManager = playerAnimation.getAnni(player, version);
    
    // 查找正在播放的动画节点
    if (animationManager && animationManager.nodes) {
        let updatedNodes = 0;
        for (let node of animationManager.nodes) {
            // 检查是否是当前玩家的动画节点且未完成
            if ((node.player === player || (node.actionParams && node.actionParams === actionParams)) && !node.completed) {
                // 立即更新节点的位置、缩放、角度
                if (data.x != null && data.y != null) {
                    node.x = actionParams.x;
                    node.y = actionParams.y;
                }
                if (data.scale != null) {
                    node.scale = actionParams.scale;
                }
                if (data.angle != null) {
                    node.angle = actionParams.angle;
                }
                updatedNodes++;
            }
        }
        console.log(`adjust: 已更新 ${updatedNodes} 个动画节点，动作类型: ${data.action}`);
    }
}


// 单纯用来播放特效
function playEffect(data) {
    let sprite = data.sprite
    let position = data.position
    if (typeof sprite === 'string') {
        sprite = {name: sprite}
    }
    let v = sprite.version || '3.6'
    let dynamic = playerAnimation.getAnni(null, v)
    if (position && position.parent) {
        position.referNode = new HTMLElement(position.parent.boundRect, position.parent.bodySize)
        position.parent = null
    }

    if (dynamic.hasSpine(sprite.name)) {
        dynamic.playSpine(sprite, position)
    } else {
        dynamic.loadSpine(sprite.name, sprite.json ? 'json': 'skel', () => {
            dynamic.playSpine(sprite, position)
        }, () => {

        })
    }


}


/** @type {AnimationManager} */
let decadeUIAni
function createDecadeAni(data) {
    decadeUIAni = new AnimationManager(data.pathPrefix, data.canvas,  null,{dpr: data.dpr})
}

// 调用十周年专用的ani播放函数
function decadeAniFunc(data) {
    let f = data.funcName
    let eventId = data.eventId
    let args = data.args
    switch (f) {
        case 'createTextureRegion':
            break
        case 'hasSpine':
            break
        case 'loadSpine':
            (() => {
                let filename = args[0]
                let skelType = args[1]
                let version = args[2]
                if (filename in decadeUIAni.aniVersionMap) {
                    postMessage({
                        eventId: eventId,
                        success: true
                    })
                }
                let dynamic = decadeUIAni.getAnimation(version)
                dynamic.loadSpine(filename, skelType || 'skel', () => {
                    if (version != null && version !== '3.6' && !(version in decadeUIAni.aniVersionMap)) {
                        decadeUIAni.aniVersionMap[filename] = version
                    }
                    postMessage({
                        eventId: eventId,
                        success: true
                    })
                }, () => {
                    postMessage({
                        eventId: eventId,
                        error: true,
                        errMsg: 'error'
                    })
                })
            })()
            break
        case 'prepSpine':
            break
        case 'playSpine':
            (() => {
                let sprite = args[0]
                let position = args[1]
                if (typeof sprite === "string") {
                    sprite = {name: sprite}
                }
                if (position && position.parent) {
                    position.referNode = new HTMLElement(position.parent.boundRect, position.parent.bodySize)
                    position.parent = null
                }
                let dynamic = decadeUIAni.getAnimation(sprite.version)

                if (dynamic.hasSpine(sprite.name)) {
                    dynamic.playSpine(sprite, position);
                } else {
                    dynamic.loadSpine(sprite.name, sprite.json ? 'json' : 'skel', () => {
                        if (sprite.version != null && sprite.version !== '3.6' && !(sprite.version in decadeUIAni.aniVersionMap)) {
                            decadeUIAni.aniVersionMap[sprite.name] = sprite.version
                        }
                        dynamic.playSpine(sprite, position)
                    }, () => {
                        console.log('err')
                    });
                }
            })()
            break
        case 'loopSpine':
            (() => {
                let sprite = args[0]
                let position = args[1]
                if (typeof sprite === "string") {
                    sprite = {name: sprite, loop: true}
                } else {
                    sprite.loop = true;
                }
                if (position && position.parent) {
                    position.parent = new HTMLElement(position.parent.boundRect, position.parent.bodySize)
                }
                let dynamic = decadeUIAni.getAnimation(sprite.version)
                if (dynamic.hasSpine(sprite.name)) {
                    dynamic.playSpine(sprite, position)
                } else {
                    dynamic.loadSpine(sprite.name, sprite.json ? 'json' : 'skel', () => {
                        if (sprite.version != null && sprite.version !== '3.6' && !(sprite.version in decadeUIAni.aniVersionMap)) {
                            decadeUIAni.aniVersionMap[sprite.name] = sprite.version
                        }
                        dynamic.playSpine(sprite, position)
                    }, () => {
                        console.log('err')
                    })
                }
            })()
            break
        case 'stopSpine':
            (() => {
                let sprite = args[0]
                if (typeof sprite === "string") {
                    sprite = {name: sprite, loop: true}
                } else {
                    sprite.loop = true;
                }
                let dynamic = decadeUIAni.getAnimation(sprite.version)
                dynamic.stopSpine(sprite)

            })()
            break
        case 'stopSpineAll':
            decadeUIAni.stopSpineAll()
            break
        case 'getSpineActions':
            (() => {
                let filename = args[0]
                let type = args[1]
                let version = decadeUIAni.aniVersionMap[filename]
                let dynamic = decadeUIAni.getAnimation(version)

                if (dynamic.hasSpine(filename)) {
                    let actions = dynamic.getSpineActions(filename)
                    postMessage({
                        eventId: eventId,
                        actions: actions
                    })
                } else {
                    dynamic.loadSpine(filename, type || 'skel', () => {
                        let actions = dynamic.getSpineActions(filename)
                        postMessage({
                            eventId: eventId,
                            actions: actions
                        })
                    }, () => {
                        postMessage({
                            error: true,
                            errMsg: 'error'
                        })
                    })
                }
            })()
            break
        case 'getSpineBounds':
            (() => {
                let filename = args[0]
                let type = args[1]
                let version = decadeUIAni.aniVersionMap[filename]
                let dynamic = decadeUIAni.getAnimation(version)

                if (dynamic.hasSpine(filename)) {
                    let bounds = dynamic.getSpineBounds(filename)
                    postMessage({
                        eventId: eventId,
                        bounds: bounds
                    })
                } else {
                    dynamic.loadSpine(filename, type || 'skel', () => {
                        let bounds = dynamic.getSpineBounds(filename)
                        postMessage({
                            eventId: eventId,
                            bounds: bounds
                        })
                    }, () => {
                        postMessage({
                            error: true,
                            errMsg: 'error'
                        })
                    })
                }
            })()
            break
    }
}

function loadResources(data) {
    const {players, skels} = data
    if (players) {
        for (let playerParams of players) {
            playerAnimation.preLoadPlayerSkel({player: playerParams})
        }
        console.log('提前加载变身骨骼', players);
    }
    if (skels) {
        let am = playerAnimation.animationManager
        for (let skel of skels) {
            let dy = am.getAnimation(skel.version)
            if (!dy.hasSpine(skel.name)) {
                dy.loadSpine(skel.name, skel.json ? 'json': 'skel')
            }
        }
        console.log('提前加载变身特效', skels);
    }


}


onmessage = function (e) {
    let data = e.data
    switch (data.message) {
        case 'CREATE':
            createChuKuang(data)
            break
        case 'UPDATE':
            update(data)
            break
        case 'PRELOAD':
            preLoad(data)
            break
        case "isChuKuang":
            isChuKuang(data)
            break
        case "chukuangStart":
            chukuangStart(data)
            break
        case 'ADJUST':
            adjust(data)
            break
        case 'PLAY_EFFECT':
            playEffect(data)
            break
        case 'CREATE_DECADE_ANI':
            createDecadeAni(data)
            break
        case 'DECADE_ANI_FUNC':
            decadeAniFunc(data)
            break
        case 'LOAD_RESOURCES':
            loadResources(data)

    }

}