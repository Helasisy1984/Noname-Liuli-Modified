// 1. 千幻改动两处
// 给动皮预览添加name

// 2.
// 初始化修改一处

// 3
// 预览大屏头像 playDynamic 增加一个参数  816

// 4 调用skin的播放动皮操作 1012行

// 修改两处判断eng的

// 开头添加, 全局hasEx

// 8373行: 手杀大页播放函数里,  雷佬1.62版本没有停止大页的动画, 导致退出去会与默认头像的重叠, 主动停止动画
if (subView.avatar.dynamic && subView.avatar.dynamic.primary) {
    subView.avatar.stopDynamic()
}

// 6474行: 同理十周年UI的关闭返回按钮同样关闭动画的播放, 防止重叠.


// 修改完动皮后, 取消原来的背景设置
if (get.itemtype(node) === 'player' && eng) {
    let ava = bool1 ? 'primary' : 'deputy'
    let obj = node.getElementsByClassName(ava + "-avatar")[0];
    obj.style.backgroundImage = null
}

let qhly_hasExtension = function (str) {
    if (!str || typeof str != 'string') return false;
    if (lib.config && lib.config.extensions) {
        for (var i of lib.config.extensions) {
            if (i.indexOf(str) == 0) {
                if (lib.config['extension_' + i + '_enable']) return true;
            }
        }
    }
    return false;
}
if (qhly_hasExtension('皮肤切换')) {
    window.dynamicExt = window.skinSwitch
} else{
    window.dynamicExt = window.eng
}

game.playShoushaAvatar = function (node) {
    if (lib.config['extension_千幻聆音_qhly_shoushaTexiao'] && game.qhly_hasExtension('皮肤切换')) {
        // 留空表示可以往下走.
    } else if (!lib.config['extension_千幻聆音_qhly_shoushaTexiao'] || !game.qhly_hasExtension('EngEX') || !lib.config['extension_EngEX_SSSEffect']) return;
    var mainPlayer = document.getElementById('mainView');
    if (!mainPlayer || !node.dynamic || !node.dynamic.primary || node.dynamic.primary.name != _status.currentTexiao) {
        clearInterval(_status.texiaoTimer);
        clearTimeout(_status.texiaoTimer2);
        return;
    }
    if (game.qhly_hasExtension('皮肤切换')) {
        node.isQhlx = true // 表示当前动皮角色是千幻雷修版本的
        window.skinSwitch.postMsgApi.actionGongJi(node)  // 直接调用封装的播放动皮
    } else {
        let res = dynamicExt.dynamic.checkCanBeAction(node);
        if (res) {
            var renderer = node.dynamic.renderer;
            var canvas = node.getElementsByClassName("animation-player")[0];
            var dynamicWrap = node.getElementsByClassName("qhdynamic-big-wrap")[0];
            renderer.onmessage = function (e) {
                if (e.data) {
                    if (dynamicWrap) dynamicWrap.style.zIndex = "64";
                    if (canvas) {
                        canvas.style.position = "fixed";
                        canvas.style.height = "100%";
                        canvas.style.width = "100%";
                    }
                    node.style.zIndex = 64;

                    renderer.onmessage = function (e) {
                        if (e.data) {
                            game.playAudio("..", "extension", "EngEX/audio/effect", res.dynamic.name + ".mp3");
                            renderer.onmessage = function (e) {
                                if (dynamicWrap) dynamicWrap.style.zIndex = "62";
                                if (canvas) {
                                    canvas.style.height = null;
                                    canvas.style.width = null;
                                    canvas.style.position = null;
                                }
                                node.style.zIndex = 62;
                                node.GongJi = false;
                            };
                        }
                    };
                } else {
                    dynamicWrap = null;
                    canvas = null;
                    renderer = null;
                    res = null;
                }
            };
            var pp = dynamicExt.getCoordinate(node, true);
            if (renderer.postMessage) renderer.postMessage({
                message: "ACTION",
                id: node.dynamic.id,
                action: "Qhly",
                skinID: res.dynamic.id,
                //isDouble: res.isDouble,
                //deputy: res.deputy,
                //needHide: res.needHide,
                //me: false,
                //direction: dynamicExt.getDirection(node),
                player: pp
            });
        }
    }
}


player添加点击事件, 防止影响选择游戏选择事件, 需要过滤.
// 49399行 if(_status.event.name=='chooseTarget'||_status.event.name=='chooseToUse'||_status.event.name=='chooseCardTarget'){
