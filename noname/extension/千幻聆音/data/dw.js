'use strict';
importScripts('../../../十周年UI/spine.js', '../../../十周年UI/animation.js');

Array.prototype.remove = function (item) {
    var index = this.indexOf(item);
    if (index >= 0) return this.splice(index, 1);
    return item;
}

var window = self;
var devicePixelRatio = 1;
var documentZoom = 1;
var HTMLCanvasElement = function () {
    return 'HTMLCanvasElement';
};
var HTMLElement = function () {
    return 'HTMLElement';
};
var dynamics = [];
dynamics.getById = function (id) {
    for (var i = 0; i < this.length; i++) {
        if (this[i].id == id) return this[i];
    }

    return null;
};

onmessage = function (e) {
    var data = e.data;
    switch (data.message) {
        case 'CREATE':
            if (dynamics.length >= 4) return;

            var dynamic = new duilib.AnimationPlayer(data.pathPrefix, 'offscreen', data.canvas);
            dynamic.id = data.id;
            dynamics.push(dynamic);
            break;
        case 'PLAY':
            var dynamic = dynamics.getById(data.id);
            if (!dynamic) return;

            update(dynamic, data);
            var sprite = (typeof data.sprite == 'string') ? { name: data.sprite } : data.sprite;
            sprite.loop = true;

            var run = function () {
                var t = dynamic.playSpine(sprite);
                if (sprite.deputy) {
                    t.opacity = 0;
                    t.speed = 0;
                } else {
                    var animation = t.skeleton.data.findAnimation("ChuChang");
                    if (animation) {
                        t.skeleton.state.addAnimation(0, "DaiJi", true, -0.05);
                    }
                    t.opacity = 1;
                }
            };

            if (dynamic.hasSpine(sprite.name)) {
                run();
            } else {
                dynamic.loadSpine(sprite.name, 'skel', run);
            }

            break;

        case 'STOP':
            var dynamic = dynamics.getById(data.id);
            if (!dynamic) return;

            dynamic.stopSpine(data.sprite);
            break;

        case 'RESIZE':
            var d = dynamics.getById(data.id);
            var apnode = getDynamic(d, data.skinID);
            if (data.x != null) {
                apnode.x = data.x;
            }
            if (data.y != null) {
                apnode.y = data.y;
            }
            if (data.scale != null) {
                apnode.scale = data.scale;
            }
            if (data.angle != null) {
                apnode.angle = data.angle;
            }
            break;
        case 'STOPALL':
            var dynamic = dynamics.getById(data.id);
            if (!dynamic) return;

            dynamic.stopSpineAll();
            break;

        case 'DESTROY':
            destroy(data);
            break;

        case 'UPDATE':
            var dynamic = dynamics.getById(data.id);
            if (!dynamic) return;

            update(dynamic, data);
            break;

        case "ACTION":
            var d = dynamics.getById(data.id);
            var apnode = getDynamic(d, data.skinID);
            var animation;
            if (data.action == 'Qhly') animation = apnode.skeleton.data.findAnimation('GongJi');
            else animation = apnode.skeleton.data.findAnimation(data.action);
            if (!animation) {
                if (data.needHide) {
                    var hideNode = getHideDynamic(d, apnode);
                    animation = hideNode.skeleton.data.findAnimation(data.action);
                    if (!animation) {
                        window.postMessage(false);
                        break;
                    } else {
                        apnode = hideNode;
                        data.deputy = !data.deputy;
                    }
                } else {
                    window.postMessage(false);
                    break;
                }
            }
            if (data.action == "Qhly") {
                apnode.opacity = 0;
                window.postMessage(true);
                apnode.x = data.chukuangX;
                apnode.y = data.chukuangY;
                apnode.scale = data.chukuangS;
                apnode.angle = data.chukuangA;
                if (data.flipX) apnode.flipX = data.flipX;
                setTimeout(() => {
                    apnode.opacity = 1;
                    setTimeout(() => {
                        setTimeout(() => {
                            if (data.flipX) apnode.flipX = false;
                            apnode.opacity = 0
                            apnode.x = data.x;
                            apnode.y = data.y;
                            apnode.scale = data.scale;
                            apnode.angle = data.angle;
                            window.postMessage(true);
                            setTimeout(() => {
                                apnode.opacity = 1;
                            }, 200);
                        }, 450);
                    }, animation.duration * 1000 - 500);
                    playAction(apnode, animation);
                    window.postMessage(true);
                }, 200);
            } else if (data.action == "GongJi") {
                apnode.opacity = 0;
                let hideNode;
                if (data.isDouble) {
                    if (data.needHide) {
                        hideNode = getHideDynamic(d, apnode);
                    }
                    if (hideNode) {
                        hideNode.opacity = 0;
                        hideNode.clip = undefined;
                        hideNode.renderClip = undefined;
                    }
                    apnode.clip = undefined;
                    apnode.renderClip = undefined;
                }
                window.postMessage(true);
                setPos(apnode, data);
                apnode.angle = undefined;
                setTimeout(() => {
                    apnode.opacity = 1;
                    setTimeout(() => {
                        apnode.moveTo(data.player.x, data.player.y, 500);
                        setTimeout(() => {
                            apnode.opacity = 0
                            apnode.x = apnode.player.x;
                            apnode.y = apnode.player.y;
                            if (data.isDouble) {
                                apnode.clip = {
                                    x: [0, data.deputy ? 0.5 : 0],
                                    y: 0,
                                    width: [0, 0.5],
                                    height: [0, 1],
                                    clipParent: true
                                };
                                setRenderClip(d, apnode);
                                if (hideNode) {
                                    hideNode.clip = {
                                        x: [0, data.deputy ? 0 : 0.5],
                                        y: 0,
                                        width: [0, 0.5],
                                        height: [0, 1],
                                        clipParent: true
                                    };
                                    setRenderClip(d, hideNode);
                                }
                            }
                            if (apnode.player.angle) {
                                apnode.angle = apnode.player.angle;
                            }
                            window.postMessage(true);
                            setTimeout(() => {
                                apnode.opacity = 1;
                                if (hideNode) hideNode.opacity = 1;
                            }, 200);
                        }, 450);
                    }, animation.duration * 1000 - 500);
                    playAction(apnode, animation);
                    window.postMessage(true);
                }, 200);
            } else {
                playAction(apnode, animation);
                if (data.isDouble) {
                    var apnode2 = getHideDynamic(d, apnode);
                    if (apnode2) {
                        var animation2 = apnode2.skeleton.data.findAnimation(data.action);
                        if (animation2) playAction(apnode2, animation2);
                    }
                }
            }
            break;

        case "HIDE":
            var d = dynamics.getById(data.id);
            var apnode = getDynamic(d, data.skinID);

            if (apnode.skeleton.data.findAnimation(data.action)) {
                apnode.opacity = 0;
                window.postMessage(true)
            } else window.postMessage(false)

            break;

        case "HIDE2":
            var d = dynamics.getById(data.id);
            var apnode = getDynamic(d, data.skinID);
            var hideNode = getHideDynamic(d, apnode);
            apnode.opacity = 0;
            if (hideNode) hideNode.opacity = 0;

            window.postMessage(true);
            break;

        case "FIND":
            var d = dynamics.getById(data.id);
            var apnode = getDynamic(d, data.skinID);
            var animation = apnode.skeleton.data.findAnimation(data.action);
            window.postMessage((animation != null && apnode.opacity == 1));
            break;

        case "SHOW":
            var d = dynamics.getById(data.id);
            var apnode = getDynamic(d, data.skinID);
            apnode.opacity = 1;
            apnode.speed = 1;
            var animation = apnode.skeleton.data.findAnimation("ChuChang");
            if (animation) {
                apnode.skeleton.state.setAnimationWith(0, animation, true);
                apnode.skeleton.state.addAnimation(0, "DaiJi", true, -0.01);
            }
            break;
    }
};

function update(dynamic, data) {
    dynamic.resized = false;
    if (data.dpr != null) dynamic.dpr = data.dpr;
    if (data.dprAdaptive != null) dynamic.dprAdaptive = data.dprAdaptive;
    if (data.outcropMask != null) dynamic.outcropMask = data.outcropMask;
    if (data.useMipMaps != null) dynamic.useMipMaps = data.useMipMaps;
    if (data.width != null) dynamic.width = data.width;
    if (data.height != null) dynamic.height = data.height;
}

function destroy(data) {
    let d = dynamics.getById(data.id);
    if (!d) return;
    d.nodes = []
    let webglExt = d.gl.getExtension('WEBGL_lose_context')
    if (webglExt) {
        webglExt.loseContext()
    }
    dynamics.remove(d);
}

function getDynamic(dynamics, id) {
    if (dynamics.nodes.length > 1) {
        for (let i = 0; i < dynamics.nodes.length; i++) {
            let temp = dynamics.nodes[i];
            if (temp.id == id) {
                return temp;
            }
        }
    } else return dynamics.nodes[0];
}

function getHideDynamic(d, node) {
    if (d.nodes.length > 1) {
        for (let i = 0; i < d.nodes.length; i++) {
            if (d.nodes[i] != node) return d.nodes[i];
        }
    } else return false;
}

function setRenderClip(d, node) {
    function calc(value, refer, dpr) {
        if (Array.isArray(value)) {
            return value[0] * dpr + value[1] * refer;
        } else {
            return value * dpr;
        }
    }

    let dpr = d.dpr;
    node.renderClip = {
        x: calc(node.clip.x, d.canvas.width, dpr),
        y: calc(node.clip.y, d.canvas.height, dpr),
        width: calc(node.clip.width, d.canvas.width, dpr),
        height: calc(node.clip.height, d.canvas.height, dpr)
    };
}

function playAction(apnode, animation) {
    apnode.skeleton.state.setAnimationWith(0, animation, true);
    apnode.skeleton.state.addAnimation(0, "DaiJi", true, -0.01);
}

function setPos(apnode, data) {
    if (data.me) {
        var pos = apnode.player.pos;
        if (pos) {
            if (pos.constructor === Object) {
                apnode.x = pos.x;
                apnode.y = pos.y;
            }
        } else {
            apnode.x = [0, 0.5];
            apnode.y = [0, 0.5];
        }
        data.player.y += 150;
    } else {
        apnode.x = data.direction.x;
        apnode.y = data.direction.y;
        if (data.direction.isLeft) data.player.x += 85; else data.player.x += 40;
    }
}