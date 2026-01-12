'use strict';
importScripts('spine.js', './spine-lib/spine_4_0_64.js', './spine-lib/spine_3_8.js',
	'./spine-lib/spine_3_5_35.js', './spine-lib/spine_3_7.js', './spine-lib/spine_4_1.js', './spine-lib/spine_4_2.js',
	'animation.js', 'settings.js', 'animations.js');

console.log('new worker...')

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
var animationManagers = [];

let chukuangId = 99999   // 自动出框的nodeID起始, 为了不和主线程传过去的skinId重复

let isMobile = false
let dpr = 1
// 已删除modifyQhlxPreview变量

let isQhlxDecade = false  // 标明当前是否是千幻的十周年样式.

/**
 * 获取动皮管理对象DynamicPlayer
 * @param id  DynamicPlayer对象的id
 * @returns {AnimationManager}
 */
animationManagers.getById = function (id) {
	for (let i = 0; i < this.length; i++) {
		if (this[i].id === id) {
			return this[i]
		}
	}
	return null;
}

function preLoadChuKuangSkel(dynamic, apnode) {
	completeParams(apnode)
	let pLoad = function (actionParams) {
		if (actionParams) {
			if (!dynamic.hasSpine(actionParams.name)) {
				dynamic.loadSpine(actionParams.name, actionParams.json ? 'json' : 'skel', function () {
					console.log('预加载出场骨骼成功')
				}, function (data) {
					console.log('播放骨骼失败, 参数: ', data)
				})
			}
		}
	}
	let arr = [apnode.name]
	for (let act of [apnode.player.gongjiAction]) {
		if (act && !arr.includes(act.name)) {
			arr.push(act.name)
			pLoad(act)
		}
	}
}


// 播放, 稍微修改以下, 如果包含不一样的皮肤出框, 提前加载好对应的骨骼,减少下次的加载时间
// 将这个函数改成只加载, 加载后再进行播放.
function playSkin(am, data) {

	let sprite = (typeof data.sprite == 'string') ? { name: data.sprite } : data.sprite;
	let player;

	if (!sprite.player) {
		sprite.player = sprite
	}
	// 获取正确的ani
	let dynamic = am.getAnimation(sprite.player.version)
	let beijingDynamic
	if (sprite.player && sprite.player.beijing != null) {
		beijingDynamic = am.getAnimation(sprite.player.beijing.version || sprite.player.version)
	}
	let qianjingDynamic
	if (sprite.player && sprite.player.qianjing != null) {
		qianjingDynamic = am.getAnimation(sprite.player.qianjing.version || sprite.player.version)
	}
	update(am, data);

	sprite.loop = true;
	player = sprite.player;
	sprite.alpha = player.alpha;

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

	// 兼容雷修千幻
	// 获取保存的参数, 如果存在保存的参数, 则使用保存的参数进行播放.
	if (sprite.qhlxBigAvatar) {
		if (sprite.isDecade) {
			sprite.player.qhlx = sprite.player.qhlx && sprite.player.qhlx.decade // 如果当前是十周年样式, 用十周年的配置覆盖.
		}

		if (sprite.player.qhlx) {
			if (sprite.player.qhlx.gongji) {
				initPlayerGongJi()
				sprite.player.gongji = Object.assign(sprite.player.gongji, sprite.player.qhlx.gongji)
			} else {
				// 使用雷修默认的出框参数
				initPlayerGongJi()
				// if (player.isMobile) {
				// 	player.gongji.x = player.divPos.x + player.divPos.width / 2;
				// 	player.gongji.y = player.divPos.y + player.divPos.height / 2;
				// 	if (player.gongji.name === player.name) {
				// 		player.gongji.scale = player.scale * 0.6
				// 	} else {
				// 		player.gongji.scale = player.largeFactor * (player.gongji.scale || 1) * 0.55
				// 	}
				// } else {
				// 	player.gongji.x = player.divPos.x + player.divPos.width / 2;
				// 	player.gongji.y = player.divPos.y + player.divPos.height / 2;
				// 	player.gongji.scale = player.scale * 0.55
				// }
			}
			if (sprite.player.qhlx.daiji) {
				sprite = Object.assign(sprite, sprite.player.qhlx.daiji)
				sprite.player = Object.assign(sprite.player, sprite.player.qhlx.daiji)
			} else {
				sprite.player.scale = sprite.scale
			}
		} else {
			sprite.player.scale = sprite.scale
			initPlayerGongJi()
			// fix 大屏预览参数使用雷修默认的出框偏移
			// if (player.isMobile) {
			// 	player.gongji.x = player.divPos.x + player.divPos.width / 2;
			// 	player.gongji.y = player.divPos.y + player.divPos.height / 2;
			// 	if (player.gongji.name === player.name) {
			// 		player.gongji.scale = player.scale * 0.6
			// 	} else {
			// 		player.gongji.scale = player.largeFactor * (player.gongji.scale || 1) * 0.55
			// 	}
			// } else {
			// 	player.gongji.x = player.divPos.x + player.divPos.width / 2;
			// 	player.gongji.y = player.divPos.y + player.divPos.height / 2;
			// 	player.gongji.scale = player.scale * 0.55
			// }
		}
		if (sprite.player.beijing) {
			// sprite.player.beijing.scale = (sprite.player.beijing.scale || 1) * sprite.player.largeFactor
			if (sprite.player.qhlx && sprite.player.qhlx.beijing) {
				sprite.player.beijing = Object.assign(sprite.player.beijing, sprite.player.qhlx.beijing)
			}
		}
		if (sprite.player.qianjing) {
			// sprite.player.qianjing.scale = (sprite.player.qianjing.scale || 1) * sprite.player.largeFactor
			if (sprite.player.qhlx && sprite.player.qhlx.qianjing) {
				sprite.player.qianjing = Object.assign(sprite.player.qianjing, sprite.player.qhlx.qianjing)
			}
		}

	}
	// 将千幻的大小改成自适应
	let loadAllSkels = () => {
		let loadDaiJi = () => {
			let skelType = sprite.player.json ? 'json' : 'skel'
			try {
				let setNewScale = () => {
					// 已删除千幻大屏预览待机大小调整功能
				}
				// 停止并移除旧的骨骼动画节点
				if (dynamic.nodes.length > 0) {
					for (let node of dynamic.nodes) {
						if (node.name !== sprite.name) {
							dynamic.stopSpine(node);
							dynamic.nodes = dynamic.nodes.filter(n => n !== node);
						}
					}
				}
				if (dynamic.hasSpine(sprite.name)) {
					// 获取骨骼的具体大小
					setNewScale()
					postMessage({ id: data.id, type: 'loadFinish', sprite: sprite })
				} else {
					try {
						dynamic.loadSpine(sprite.name, skelType, () => {
							setNewScale()
							postMessage({ id: data.id, type: 'loadFinish', sprite: sprite });
						}, (errMsg) => {
							if (errMsg) {
								console.error(errMsg)
								postMessage({ id: data.id, type: 'logMessage', msg: { errMsg: errMsg } })
							}
							console.log('加载骨骼失败', sprite)
						})
					} catch (e) {
						postMessage({ id: data.id, type: 'logMessage', msg: { errMsg: e.toString() } })
					}

				}
			} catch (e) {
				postMessage({ id: data.id, type: 'logMessage', msg: { errMsg: e.toString() } })
			}
		}

		let loadPromises = [];

		if (sprite.player && sprite.player.beijing != null) {
			if (beijingDynamic.hasSpine(sprite.player.beijing.name)) {
				loadPromises.push(Promise.resolve());
			} else {
				loadPromises.push(new Promise((resolve, reject) => {
					beijingDynamic.loadSpine(sprite.player.beijing.name, sprite.player.beijing.json ? 'json' : 'skel', resolve, reject);
				}));
			}
		} else {
			loadPromises.push(Promise.resolve());
		}

		if (sprite.player && sprite.player.qianjing != null) {
			if (qianjingDynamic.hasSpine(sprite.player.qianjing.name)) {
				loadPromises.push(Promise.resolve());
			} else {
				loadPromises.push(new Promise((resolve, reject) => {
					qianjingDynamic.loadSpine(sprite.player.qianjing.name, sprite.player.qianjing.json ? 'json' : 'skel', resolve, reject);
				}));
			}
		} else {
			loadPromises.push(Promise.resolve());
		}

		Promise.all(loadPromises).then(() => {
			loadDaiJi();
		}).catch((error) => {
			console.error('加载骨骼失败:', error);
		});
	}
	loadAllSkels();
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

// 获取骨骼的所有action标签
function getAllActionLabels(node) {
	// 获取所有actions
	let animations = node.skeleton.data.animations;
	let res = []
	for (let ani of animations) {
		res.push(ani.name)
	}
	return res
}

// 获取标签, 忽略大小写
function getLabelIgnoreCase(node, label) {
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

/*************** 每个函数处理worker消息 start ***************/

function create(data) {
	if (animationManagers.length >= 4) return;
	let am = new AnimationManager(data.pathPrefix, data.canvas, data.id);
	if (data.dpr) dpr = data.dpr
	// 已删除modifyQhlxPreview参数
	animationManagers.push(am);
}

function play(data) {
	let am = animationManagers.getById(data.id);
	if (!am) return;

	playSkin(am, data)
}

// 骨骼加载后真正开始播放
function startPlaySkin(data) {
	data = data.data
	let am = animationManagers.getById(data.id);

	if (!am) return;
	let sprite = data.sprite
	let dynamic = am.getAnimation(sprite.player.version)
	let beijingDynamic
	if (sprite.player && sprite.player.beijing != null) {
		beijingDynamic = am.getAnimation(sprite.player.beijing.version || sprite.player.version)
	}

	let qianjingDynamic
	if (sprite.player && sprite.player.qianjing != null) {
		qianjingDynamic = am.getAnimation(sprite.player.qianjing.version || sprite.player.version)
	}

	let run1 = function (beijingNode) {
		let t = dynamic.playSpine(sprite)
		t.opacity = 0
		t.beijingNode = beijingNode

		let skins = t.skeleton.data.skins
		if (sprite.player.skin && skins && skins.length > 0) {
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
			if (!skinFound) {
				try {
					// 优先尝试使用默认皮肤
					if (t.skeleton.data.defaultSkin) {
						t.skeleton.setSkin(t.skeleton.data.defaultSkin);
					} else if (skins.length > 0) {
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
				for (let defaultDaiJi of dwDefaultDaiJiAction) {
					let da = getLabelIgnoreCase(t, defaultDaiJi)
					if (da) {
						t.skeleton.state.addAnimation(0, da, true, -0.01);
						t.player.action = da
						t.action = da
					}
				}
			}
		}
		// 重置一下背景和待机的时间
		if (beijingNode) {
			beijingNode.skeleton.state.tracks[0].trackTime = 0
			t.skeleton.state.tracks[0].trackTime = 0
		}
		sortNodes();
		t.opacity = 1;
		// 将node保存一下, 表示是千幻大屏预览的node
		t.qhlxBigAvatar = sprite.qhlxBigAvatar
		return t;
	}

	let run2 = function (qianjingNode, mainNode) {
		// 如果已经有主节点，就不需要再创建了，直接关联前景节点
		if (mainNode) {
			mainNode.qianjingNode = qianjingNode;
			return mainNode;
		}
		
		let t = dynamic.playSpine(sprite)
		t.opacity = 0
		t.qianjingNode = qianjingNode

		let skins = t.skeleton.data.skins
		if (sprite.player.skin && skins && skins.length > 0) {
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
			if (!skinFound) {
				try {
					// 优先尝试使用默认皮肤
					if (t.skeleton.data.defaultSkin) {
						t.skeleton.setSkin(t.skeleton.data.defaultSkin);
					} else if (skins.length > 0) {
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
				for (let defaultDaiJi of dwDefaultDaiJiAction) {
					let da = getLabelIgnoreCase(t, defaultDaiJi)
					if (da) {
						t.skeleton.state.addAnimation(0, da, true, -0.01);
						t.player.action = da
						t.action = da
					}
				}
			}
		}
		// 重置一下背景和待机的时间
		if (qianjingNode) {
			qianjingNode.skeleton.state.tracks[0].trackTime = 0
			t.skeleton.state.tracks[0].trackTime = 0
		}
		sortNodes();
		t.opacity = 1;
		// 将node保存一下, 表示是千幻大屏预览的node
		t.qhlxBigAvatar = sprite.qhlxBigAvatar
		return t;
	}

	let runBeijing = () => {
		sprite.player.beijing.loop = true;
		sprite.player.beijing.id = chukuangId++;
		if (sprite.player.beijing.alpha == null)
			sprite.player.beijing.alpha = sprite.player.alpha;

		// 如果是双将的话, 复制裁剪.
		if (!sprite.player.beijing.clip && sprite.clip) {
			sprite.player.beijing.clip = sprite.clip;
		}
		let node;
		try {
			node = beijingDynamic.playSpine(sprite.player.beijing);
			node.isbeijing = true;
		} catch (e) {
			console.error(e);
			console.log('dynamic=====', dynamic, data);
		}

		// 获取所有actions
		let chuChangLabel = '';
		let labels = getAllActionLabels(node);
		for (let label of labels) {
			let lowerLabel = label.toLowerCase();
			if (lowerLabel === 'chuchang') {
				chuChangLabel = label;
				break;
			}
		}
		// 查找背景是否也有出场标签
		if (chuChangLabel) {
			node.skeleton.state.setAnimation(0, chuChangLabel, false, 0);
			// 获取所有actions
			for (let label of labels) {
				let lowerLabel = label.toLowerCase();
				for (let daijiName of dwBeiJingDaiJiActions) {
					if (daijiName.toLowerCase() === lowerLabel) {
						node.skeleton.state.addAnimation(0, label, true, -0.01);
						node.action = label;
						break;
					}
				}
			}
		}
		// 检查当前节点是否存在位于背景层下的node, 提上来
		sortNodes();
		return node;
	}

	let runqianjing = () => {
		sprite.player.qianjing.loop = true;
		sprite.player.qianjing.id = chukuangId++;
		if (sprite.player.qianjing.alpha == null)
			sprite.player.qianjing.alpha = sprite.player.alpha;

		// 如果是双将的话, 复制裁剪.
		if (!sprite.player.qianjing.clip && sprite.clip) {
			sprite.player.qianjing.clip = sprite.clip;
		}
		let node;
		try {
			node = qianjingDynamic.playSpine(sprite.player.qianjing);
			node.isqianjing = true;
		} catch (e) {
			console.error(e);
			console.log('dynamic=====', dynamic, data);
		}

		// 获取所有actions
		let chuChangLabel = '';
		let labels = getAllActionLabels(node);
		for (let label of labels) {
			let lowerLabel = label.toLowerCase();
			if (lowerLabel === 'chuchang') {
				chuChangLabel = label;
				break;
			}
		}
		// 查找背景是否也有出场标签
		if (chuChangLabel) {
			node.skeleton.state.setAnimation(0, chuChangLabel, false, 0);
			// 获取所有actions
			for (let label of labels) {
				let lowerLabel = label.toLowerCase();
				for (let daijiName of dwqianjingDaiJiActions) {
					if (daijiName.toLowerCase() === lowerLabel) {
						node.skeleton.state.addAnimation(0, label, true, -0.01);
						node.action = label;
						break;
					}
				}
			}
		}
		return node;
	}

	let sortNodes = () => {
		dynamic.nodes.sort((a, b) => {
			return b.id - a.id;
		});
		let qianjingNodes = dynamic.nodes.filter(node => node.isqianjing);
		dynamic.nodes = dynamic.nodes.filter(node => !node.isqianjing).concat(qianjingNodes);
	}

	// 修复逻辑，按照正确的渲染顺序处理节点
	let beijingNode = null;
	let qianjingNode = null;
	let mainNode = null;

	// 第一步：先创建背景节点（如果有）
	if (sprite.player.beijing) {
		beijingNode = runBeijing();
	}

	// 第二步：创建主角色节点
	mainNode = run1(beijingNode);
	
	// 第三步：最后创建前景节点（如果有）并关联到主节点
	if (sprite.player.qianjing) {
		qianjingNode = runqianjing();
		// 确保前景节点在最上层
		if (qianjingNode) {
			// 从渲染列表中移除前景节点，然后添加到最后
			dynamic.nodes = dynamic.nodes.filter(n => n !== qianjingNode);
			dynamic.nodes.push(qianjingNode);
			
			// 确保前景节点与主节点正确关联
			if (mainNode) {
				mainNode.qianjingNode = qianjingNode;
			}
		}
	}

	// 重新排序所有节点确保正确的渲染顺序
	sortNodes();
	
	// 发送消息表示播放完成
	postMessage({ id: data.id, type: 'playSkinEnd' });
}

function stop(data) {
	let am = animationManagers.getById(data.id);
	if (!am) return;
	let sprite = data.sprite
	let dynamic = am.getAnimationBySkinId(sprite.id)
	// 为了解决删除节点失败的问题, 只能多尝试删除几次
	let retryStop = function (times) {
		if (times < 0) return
		let sprite = dynamic.stopSpine(data.sprite)
		console.log('stop ....dynamic=========', dynamic, sprite)
		if (!sprite) {
			setTimeout(() => {
				retryStop(times - 1)
			}, 100)
		} else {
			if (sprite.beijingNode) {
				dynamic.stopSpine(sprite.beijingNode)
			}
			if (sprite.qianjingNode) {
				dynamic.stopSpine(sprite.qianjingNode)
			}
		}
	}
	// 重试3次
	retryStop(dwStopTimes)
}

function stopAll(data) {
	let am = animationManagers.getById(data.id);
	if (!am) return;
	am.stopSpineAll();
}

function msgUpdate(data) {
	let am = animationManagers.getById(data.id);
	if (!am) return;
	update(am, data);
}

function action(data) {
	let am = animationManagers.getById(data.id);
	if (!am) return;
	let dynamic = am.getAnimationBySkinId(data.skinID)
	let apnode = am.getNodeBySkinId(data.skinID);
	if (!apnode) return
	let animation
	// 这里只是单纯的和雷修原来自带的手杀大页播放的功能兼容,保留.
	let qhlyAction = function () {
		if (data.action === 'Qhly') animation = apnode.skeleton.data.findAnimation('GongJi');
		if (!animation) {
			if (data.needHide) {
				var hideNode = getHideDynamic(d, apnode);
				animation = hideNode.skeleton.data.findAnimation(data.action);
				if (!animation) {
					window.postMessage(false);
					return
				} else {
					apnode = hideNode;
					data.deputy = !data.deputy;
				}
			} else {
				window.postMessage(false);
				return
			}
		}
		apnode.opacity = 0;
		window.postMessage(true);
		apnode.x = [apnode.player.x[0] * 0.58, apnode.player.x[1] * 0.58];
		apnode.y = [apnode.player.y[0] * 1.4, apnode.player.y[1] * 1.4];

		if (apnode.player.angle) {
			apnode.angle = apnode.player.angle;
		}
		setTimeout(() => {
			apnode.opacity = 1;
			setTimeout(() => {
				setTimeout(() => {
					apnode.opacity = 0
					apnode.x = apnode.player.x;
					apnode.y = apnode.player.y;
					window.postMessage(true);
					setTimeout(() => {
						apnode.opacity = 1;
					}, 200);
				}, 450);
			}, animation.duration * 1000 - 500);
			playAction(apnode, animation);
			window.postMessage(true);
		}, 200);
	}

	if (data.action === 'Qhly') {
		return qhlyAction()
	}

	completeParams(apnode)
	// 如果是双将, 且两个都是动皮, 那么需要添加判断, 如果动皮1是假动皮, 动皮2是真动皮, 那么就需要播放2号的动皮
	// 只有攻击动作需要判断是否有攻击动作
	if (data.isDouble && data.needHide) {
		let hasGongJi = function () {
			let tempParams = apnode.player.gongjiAction
			if (!tempParams) {
				return false
			}
			if (tempParams.name === apnode.name) {
				if (!tempParams.action) return true  // 说明是播放假动皮的出框动作
				if (Array.isArray(tempParams.action)) return true  // 手动填写了多个攻击动作
				let animation = apnode.skeleton.data.findAnimation(tempParams.action)
				return Boolean(animation)
			}
			return true

		}
		let hasTeShu = function () {
			let tempParams = apnode.player.teshuAction
			if (!tempParams) {
				return false
			}
			if (tempParams.name === apnode.name) {
				if (!tempParams.action) return false
				let animation = apnode.skeleton.data.findAnimation(tempParams.action)
				return Boolean(animation)
			}
			// 骨骼不同不再这里worker里出框了
			return false
		}
		let changeNode = function () {
			let hideNode = getHideDynamic(dynamic, data.needHide)
			// 修改data的参数
			data.needHide = apnode.id
			data.deputy = true  // 标记为副将显示动皮
			data.skinID = hideNode.id
			completeParams(hideNode)
			// 更换隐藏和显示的节点
			apnode = hideNode
		}
		if (data.action === 'GongJi') {
			// 检查一号是否有真动皮, 没有就更换需要播放的角色为2号位
			if (!hasGongJi()) {
				changeNode()
			}
		}
		// 特殊动作同理也只播放一个动皮的动作
		else if (data.action === 'TeShu') {
			if (!hasTeShu()) {
				changeNode()
			}
		}
	}

	let player = apnode.player

	let playChuKuangSpine = function (apnode, animation, playNode) {
		let hideNode
		if (data.isDouble) {
			if (data.needHide !== undefined) {
				hideNode = getHideDynamic(dynamic, data.needHide);
			}
			if (hideNode) {
				hideNode.opacity = 0;
				hideNode.clip = undefined;
				hideNode.renderClip = undefined;
			}
			apnode.clip = undefined;
			apnode.renderClip = undefined;
		}
		// window.postMessage(true)
		let actualPlayNode = playNode ? playNode : apnode
		actualPlayNode.angle = undefined
		// 直接将待机动作置空防止闪烁

		apnode.opacity = 0
		apnode.skeleton.state.setEmptyAnimation(0, 0)
		dynamic.gl.clearColor(0, 0, 0, 0)
		dynamic.gl.clear(dynamic.gl.COLOR_BUFFER_BIT);
		// 先移动到看不到的地方, 然后再显示出框
		apnode.x = [0, 102]
		apnode.y = [0, 102]

		postMessage({ id: data.id, type: 'chukuangFirst' })

		setTimeout(() => {
			// 播放完动画从播放的位置移动到待机的位置
			let recoverDaiji = () => {
				actualPlayNode.opacity = 0

				if (data.isDouble) {
					apnode.clip = {
						x: [0, data.deputy ? 0.5 : 0],
						y: 0,
						width: [0, 0.5],
						height: [0, 1],
						clipParent: true
					};
					setRenderClip(dynamic, apnode);
					if (hideNode) {
						hideNode.clip = {
							x: [0, data.deputy ? 0 : 0.5],
							y: 0,
							width: [0, 0.5],
							height: [0, 1],
							clipParent: true
						};
						setRenderClip(dynamic, hideNode);
					}
				}
				// 出框结束, 重新显示待机动画
				if (apnode.player.angle) {
					apnode.angle = apnode.player.angle
				}
				if (apnode.player.scale) {
					apnode.scale = apnode.player.scale
				}
				if (apnode.player.gongjiAction.speed) {
					actualPlayNode.speed = apnode.player.gongjiAction.speed
				}
				actualPlayNode.x = apnode.player.x;
				actualPlayNode.y = apnode.player.y;
				apnode.x = apnode.player.x;
				apnode.y = apnode.player.y;
				// window.postMessage(true)
				postMessage({ id: data.id, type: 'canvasRecover' })
				setTimeout(() => {
					// 原来的节点恢复显示
					apnode.opacity = 1
					if (hideNode) hideNode.opacity = 1;
					console.log('apnode', apnode.action, apnode)
					// 假动皮不需要回复原有姿势
					if (!playNode && apnode.skeleton.defaultAction === animation.name) {
						console.log('aaaa', apnode, animation)
					} else {
						apnode.skeleton.state.setAnimation(0, apnode.action || apnode.skeleton.defaultAction, true)
					}
				}, 150);
			}

			let showTime = (animation.showTime || animation.duration) * 1000

			if (actualPlayNode.player.shizhounian && data.action === 'GongJi') {
				showTime /= 1.2
				actualPlayNode.speed = 1.2
			}

			setTimeout(() => {
				// 如果是手杀大屏预览的页面则不位移到原处
				if (apnode.qhlxBigAvatar || apnode.player.shizhounian || apnode.player.chuchang) {
					recoverDaiji()
				}
				else {
					actualPlayNode.moveTo(data.player.x, data.player.y, 500);
					setTimeout(() => {
						recoverDaiji()
					}, 350)
				}
			}, showTime - 500)
			if (playNode) {
				// 重新恢复攻击pose
				// playNode.skeleton.setToSetupPose()
				if (data.action === 'chuchang') {
					// 出场动画直接使用调整后的大小，不进行额外的放大缩小
					// 保持当前设置的scale值不变
					// 注释掉放大缩小逻辑，让角色按照调整的大小直接播放
				}
			} else {
				playAction(apnode, animation);
			}
			setPos(actualPlayNode, data);
			// 重新绑定开始渲染
			actualPlayNode.opacity = 1
			postMessage({ id: data.id, type: 'chukuangSecond', delayTime: playNode ? 130 : 100 })
		}, 200)
	}

	// 说明出框和待机动作不是同一个皮肤, 那么需要临时重新加载
	let playChukuang = function (actionParams) {
		actionParams.id = chukuangId++
		if (Array.isArray(actionParams.action) && actionParams.action.length > 0) {
			actionParams._oldAction = actionParams.action
			actionParams.action = randomChoice(actionParams.action)
		} else if (actionParams._oldAction) {
			// 防止第二次进来就不随机了
			actionParams.action = randomChoice(actionParams._oldAction)
		}
		console.log('chukuangactionParams--->', actionParams)
		let playedSprite = dynamic.playSpine(actionParams)
		// 播放当前节点的动画, 隐藏原来的节点动画
		playedSprite.opacity = 0
		apnode.opacity = 0
		playedSprite.player = apnode.player
		// 获取动画播放时间
		let d = getActionDuration(dynamic, playedSprite.name, playedSprite.action)
		if (!d) {
			return
		}
		playChuKuangSpine(apnode, { duration: actionParams.showTime || d }, playedSprite)
	}

	let errPlaySpine = function (data) {
		console.log('播放失败....', data)
	}

	if (data.action === 'GongJi') {
		let actionParams = player.gongjiAction
		if (!actionParams) return

		if (actionParams.name === apnode.name) {
			// 说明是同一个皮肤, 那么只需要改变位置即可.
			// 查找动画
			let actionName = actionParams.action
			let duration
			if (Array.isArray(actionName)) {
				if (actionName.length === 0) {
					actionName = undefined
				}
				actionName = randomChoice(actionParams.action)
				actionParams._oldAction = actionParams.action
			} else if (actionParams._oldAction) {
				// 防止第二次进来就不随机了
				actionName = randomChoice(actionParams._oldAction)
			}
			// 允许调整出框的大小和静态的大小不一致
			if (actionParams.scale) {
				apnode.scale = actionParams.scale
			}
			// 假动皮在千幻雷修的大页面播放下
			if (!actionName) {
				let defaultGongJiAction = getDefaultGongJiAction(dynamic, actionParams.name)
				if (!defaultGongJiAction) return
				// 防止假动皮出框
				if (apnode.qhlxBigAvatar && defaultGongJiAction.name !== 'GongJi') {
					postMessage({ id: data.id, type: 'canvasRecover' })
					return
				}
				actionName = defaultGongJiAction.name
				actionParams.action = actionName
				// 有些静皮时间有点久, 需要重新指定一下
				if (actionName === 'GongJi') duration = defaultGongJiAction.duration
				else duration = actionParams.showTime || (defaultGongJiAction.duration > 2 ? 2 : defaultGongJiAction.duration)
			}
			let animation = apnode.skeleton.data.findAnimation(actionName)
			// 如果没有动画, 查找第二个角色的动画
			if (!animation) {
				if (data.needHide !== undefined) {
					let hideNode = getHideDynamic(dynamic, data.needHide);
					animation = hideNode.skeleton.data.findAnimation(actionName);
					if (!animation) {
						postMessage({ id: data.id, type: 'canvasRecover' })
						return
					} else {
						apnode = hideNode;
						data.deputy = !data.deputy;
					}
				} else {
					postMessage({ id: data.id, type: 'canvasRecover' })
					return
				}
			}
			if (!animation.duration) {
				animation.duration = duration
			} else {
				// 如果是假动皮
				if (actionParams.action === apnode.action || apnode.skeleton.defaultAction === actionParams.action) {
					// animation.duration = actionParams.showTime || duration
					animation.showTime = actionParams.showTime || 2
				}
			}
			playChuKuangSpine(apnode, animation)

		} else {

			if (!dynamic.hasSpine(actionParams.name)) {
				dynamic.loadSpine(actionParams.name, actionParams.json ? 'json' : 'skel', function () {
					playChukuang(actionParams)
				}, errPlaySpine)
			} else {
				playChukuang(actionParams)
			}
		}

	} else if (data.action === 'TeShu') {
		let actionParams = player.teshuAction
		if (!actionParams) return
		// 特殊动画和待机皮肤一样, 那么从原始动画里面寻找, 并且不出框播放. 和原始皮肤一样, 那么出框播放
		if (actionParams.name === apnode.name) {
			animation = apnode.skeleton.data.findAnimation(actionParams.action)
			if (animation) {
				apnode.skeleton.state.setAnimationWith(0, animation, false);
				apnode.skeleton.state.addAnimation(0, apnode.player.action || apnode.skeleton.defaultAction, true, 0);
				postMessage({ id: data.id, type: 'teshuChuKuang', 'chukuang': false })
			}
		}
	} else if (data.action === 'chuchang') {
		// 暂时只让不同皮肤出框.

		let actionParams = player.chuchangAction
		if (!actionParams) return
		// 如果是同一个节点
		if (actionParams.name === apnode.name) {
			animation = apnode.skeleton.data.findAnimation(actionParams.action)
			if (!animation) return
			if (!animation.duration && !actionParams.showTime) {
				animation.showTime = 2
			}
			playChuKuangSpine(apnode, animation)
		} else {
			if (!dynamic.hasSpine(actionParams.name)) {
				dynamic.loadSpine(actionParams.name, actionParams.json ? 'json' : 'skel', function () {
					playChukuang(actionParams)
				}, errPlaySpine)
			} else {
				playChukuang(actionParams)
			}
		}

	} else {
		animation = apnode.skeleton.data.findAnimation(data.action)
		if (!animation) return
		apnode.skeleton.state.data.setMix(apnode.player.action || apnode.skeleton.defaultAction, animation.name, 1)
		apnode.skeleton.state.setAnimationWith(0, animation, false)
		apnode.skeleton.state.addAnimation(0, apnode.player.action || apnode.skeleton.defaultAction, true, 0)
	}
}

function position(data) {
	let am = animationManagers.getById(data.id);
	if (!am) return;
	let dynamic = am.getAnimationBySkinId(data.skinID)
	let apnode = am.getNodeBySkinId(data.skinID);
	if (!apnode) return
	completeParams(apnode)

	if (data.mode === 'daiji') {
		window.postMessage({ id: data.id, type: 'position', x: apnode.player.x, y: apnode.player.y, scale: apnode.player.scale, angle: apnode.player.angle })
	} else if (data.mode === 'beijing') {
		if (apnode.beijingNode) {
			if (apnode.player.beijing.x == null) {
				apnode.player.beijing.x = [0, 0]
			}
			if (apnode.player.beijing.y == null) {
				apnode.player.beijing.y = [0, 0]
			}
			window.postMessage({ id: data.id, type: 'position', x: apnode.player.beijing.x, y: apnode.player.beijing.y, scale: apnode.player.beijing.scale, angle: apnode.player.beijing.angle })
		}
	} else if (data.mode === 'qianjing') {
		if (apnode.qianjingNode) {
			if (apnode.player.qianjing.x == null) {
				apnode.player.qianjing.x = [0, 0]
			}
			if (apnode.player.qianjing.y == null) {
				apnode.player.qianjing.y = [0, 0]
			}
			window.postMessage({ id: data.id, type: 'position', x: apnode.player.qianjing.x, y: apnode.player.qianjing.y, scale: apnode.player.qianjing.scale, angle: apnode.player.qianjing.angle })
		}
	} else {
		// 否则以配置中的pos作为出框的位置
		let actionParams = apnode.player.gongjiAction
		if (!actionParams)
			return
		window.postMessage({ id: data.id, type: 'position', x: actionParams.x, y: actionParams.y, scale: actionParams.scale, })
	}
}

function debug(data) {
	let am = animationManagers.getById(data.id);
	if (!am) return;
	let dynamic = am.getAnimationBySkinId(data.skinID)
	let apnode = am.getNodeBySkinId(data.skinID);
	if (!apnode) return
	completeParams(apnode)

	// 循环播放动皮动作. 然后接受准备
	if (data.mode === 'daiji') {
		if (apnode.chukuangNode) {
			// 停止当前播放的动画
			apnode.chukuangNode.opacity = 0

		}
		// 恢复原来的node位置
		apnode.x = apnode.player.x
		apnode.y = apnode.player.y
		apnode.scale = apnode.player.scale
		// 播放待机
		apnode.skeleton.state.setEmptyAnimation(0, 0)
		if (apnode.player.angle) {
			apnode.angle = apnode.player.angle
		}
		playDaiJi(apnode)
		apnode.opacity = 1
		if (apnode.beijingNode) {
			apnode.beijingNode.opacity = 1
		}
		if (apnode.qianjingNode) {
			apnode.qianjingNode.opacity = 1
		}
		window.postMessage({ id: data.id, type: 'canvasRecover' })

	} else if (data.mode === 'chukuang') {
		// 如果已经存在出框的apnode的引用了, 那么直接播放即可.
		if (apnode.chukuangNode) {
			// 先停止原来的动画
			apnode.opacity = 0
			if (apnode.beijingNode) {
				apnode.beijingNode.opacity = 0
			}
			if (apnode.qianjingNode) {
				apnode.qianjingNode.opacity = 0
			}
			setTimeout(() => {
				apnode.chukuangNode.opacity = 1
				// 获取出框node的action
				let action = apnode.chukuangNode.player.gongjiAction.action
				if (!action) action = apnode.chukuangNode.skeleton.defaultAction
				apnode.chukuangNode.skeleton.setToSetupPose();
				apnode.chukuangNode.skeleton.state.setAnimation(0, action, 1)
			}, 350)
			window.postMessage({ id: data.id, type: 'debugChuKuang' })
			// window.postMessage(true)
			return
		}
		// 获取对应的骨骼标签, 如果没有获取第一个
		let actionParams = apnode.player.gongjiAction
		if (actionParams.version) {
			dynamic = am.getAnimation(actionParams.version)
		}
		if (actionParams) {
			let playSpine = function (apnode, animation, playNode) {
				apnode.opacity = 0
				if (apnode.beijingNode) {
					apnode.beijingNode.opacity = 0
				}
				if (apnode.qianjingNode) {
					apnode.qianjingNode.opacity = 0
				}

				let actualPlayNode = playNode ? playNode : apnode
				setPos(actualPlayNode, data);
				actualPlayNode.angle = undefined
				setTimeout(() => {
					if (playNode) {
						// 重新恢复攻击pose
						playNode.skeleton.setToSetupPose()
						actualPlayNode.opacity = 1
						playNode.loop = true
					} else {
						actualPlayNode.opacity = 1
						playAction(apnode, animation);
					}
				}, 200)
				// window.postMessage(true);
				window.postMessage({ id: data.id, type: 'debugChuKuang' })
			}

			let errPlaySpine = function (data) {
				// window.postMessage(false)
				window.postMessage({ id: data.id, type: 'canvasRecover' })
				window.postMessage({ id: data.id, type: 'debugNoChuKuang' })
				console.log('播放骨骼失败, 参数: ', data)
			}

			if (actionParams.name === apnode.name) {
				let actionName = actionParams.action
				if (actionParams.scale) {
					apnode.scale = actionParams.scale
				}
				if (Array.isArray(actionName)) {
					if (actionName.length === 0) {
						actionName = undefined
					}
					actionName = randomChoice(actionParams.action)
					actionParams._oldAction = actionParams.action
				} else if (actionParams._oldAction) {
					// 防止第二次进来就不随机了
					actionName = randomChoice(actionParams._oldAction)
				}
				if (!actionName) {
					// 获取攻击动作
					let defaultGongJiAction = getDefaultGongJiAction(dynamic, actionParams.name)
					if (!defaultGongJiAction) return
					actionName = defaultGongJiAction.name
					actionParams.action = actionName
				}
				let animation = apnode.skeleton.data.findAnimation(actionName)
				// 如果没有动画, 查找第二个角色的动画
				if (!animation) {
					window.postMessage({ id: data.id, type: 'debugNoChuKuang' })
					return
				}
				playSpine(apnode, animation)
			} else {
				let playChukuang = function () {
					actionParams.id = chukuangId++
					if (Array.isArray(actionParams.action) && actionParams.action.length > 0) {
						actionParams._oldAction = actionParams.action
						actionParams.action = randomChoice(actionParams.action)
					} else if (actionParams._oldAction) {
						// 防止第二次进来就不随机了
						actionParams.action = randomChoice(actionParams._oldAction)
					}
					let playedSprite = dynamic.playSpine(actionParams)
					// 播放当前节点的动画, 隐藏原来的节点动画
					playedSprite.opacity = 0
					playedSprite.player = apnode.player
					// 保存出框的node引用
					apnode.chukuangNode = playedSprite
					// 获取动画播放时间
					playSpine(apnode, {}, playedSprite)
				}

				if (!dynamic.hasSpine(actionParams.name)) {
					dynamic.loadSpine(actionParams.name, actionParams.json ? 'json' : 'skel', playChukuang, errPlaySpine)
				} else {
					playChukuang()
				}
			}
		}
	} else if (data.mode === 'beijing') {
		if (apnode.chukuangNode) {
			// 停止当前播放的动画
			apnode.chukuangNode.opacity = 0

		}
		apnode.opacity = 0
		if (apnode.beijingNode) {
			apnode.beijingNode.opacity = 1
		}
		window.postMessage({ id: data.id, type: 'canvasRecover' })
	} else if (data.mode === 'qianjing') {
		if (apnode.chukuangNode) {
			// 停止当前播放的动画
			apnode.chukuangNode.opacity = 0

		}
		apnode.opacity = 0
		if (apnode.qianjingNode) {
			apnode.qianjingNode.opacity = 1
		}
		window.postMessage({ id: data.id, type: 'canvasRecover' })
	}
}

// 调整动皮的位置
function adjust(data) {
	let am = animationManagers.getById(data.id);
	if (!am) return;
	let dynamic = am.getAnimationBySkinId(data.skinID)
	let apnode = am.getNodeBySkinId(data.skinID);
	if (!apnode) return
	completeParams(apnode)

	if (data.mode === 'daiji') {
		if (data.x !== undefined && data.y !== undefined) {
			apnode.x = data.x
			apnode.y = data.y
			apnode.player.x = data.x
			apnode.player.y = data.y
		} else if (data.xyPos !== undefined) {
			if (data.xyPos.x !== undefined) {
				apnode.x[0] = data.xyPos.x
				apnode.player.x[0] = data.xyPos.x
			} else if (data.xyPos.y !== undefined) {
				apnode.y[0] = data.xyPos.y
				apnode.player.y[0] = data.xyPos.y
			}
		} else if (data.scale !== undefined) {
			apnode.scale = data.scale
			apnode.player.scale = data.scale
		} else if (data.angle !== undefined) {
			apnode.angle = data.angle
			apnode.player.angle = data.angle
		}
		console.log('当前待机位置参数x', apnode.x, '当前待机位置参数y', apnode.y, 'scale', apnode.scale, 'angle', apnode.angle)
	} else if (data.mode === 'chukuang') {
		let actionParams = apnode.player.gongjiAction
		if (!actionParams) return

		if (data.x !== undefined && data.y !== undefined) {
			if (apnode.chukuangNode) {
				apnode.chukuangNode.x = data.x
				apnode.chukuangNode.y = data.y
			} else {
				// 说明是同一节点
				apnode.x = data.x
				apnode.y = data.y
			}
			// 修改参数
			actionParams.x = data.x
			actionParams.y = data.y
		} else if (data.xyPos) {
			if (data.xyPos.x !== undefined) {
				if (apnode.chukuangNode) {
					apnode.chukuangNode.x[0] = data.xyPos.x
				} else {
					apnode.x[0] = data.xyPos.x
				}
				actionParams.x[0] = data.xyPos.x
			} else if (data.xyPos.y !== undefined) {
				if (apnode.chukuangNode) {
					apnode.chukuangNode.y[0] = data.xyPos.y
				} else {
					apnode.y[0] = data.xyPos.y
				}
				actionParams.y[0] = data.xyPos.y
			}
		} else if (data.scale !== undefined) {
			if (apnode.chukuangNode) {
				apnode.chukuangNode.scale = data.scale
				actionParams.scale = data.scale
			} else {
				apnode.scale = data.scale
				// 同一个动皮出框通过调整静态大小即可.
				if (actionParams.scale) {
					actionParams.scale = data.scale
				}

			}
		}
		actionParams.posAuto = false
		if (apnode.chukuangNode) {
			console.log('当前出框位置参数x', apnode.chukuangNode.x, '当前出框位置参数y', apnode.chukuangNode.y, 'scale', apnode.chukuangNode.scale)
		} else {
			console.log('当前出框位置参数x', apnode.x, '当前出框位置参数y', apnode.y, 'scale', apnode.scale)
		}
	} else if (data.mode === 'beijing') {
		if (apnode.beijingNode == null) {
			return
		}
		if (data.x != null && data.y != null) {
			apnode.beijingNode.x = data.x
			apnode.beijingNode.y = data.y
		} else if (data.xyPos != null) {
			if (data.xyPos.x != null) {
				apnode.beijingNode.x[0] = data.xyPos.x
			} else if (data.xyPos.y != null) {
				apnode.beijingNode.y[0] = data.xyPos.y
			}
		} else if (data.scale != null) {
			apnode.beijingNode.scale = data.scale
		} else if (data.angle != null) {
			apnode.beijingNode.angle = data.angle
		}
		console.log('当前待机位置参数x', apnode.beijingNode.x, '当前待机位置参数y', apnode.beijingNode.y, 'scale', apnode.beijingNode.scale, 'angle', apnode.beijingNode.angle)
	} else if (data.mode === 'qianjing') {
		if (apnode.qianjingNode == null) {
			return
		}
		if (data.x != null && data.y != null) {
			apnode.qianjingNode.x = data.x
			apnode.qianjingNode.y = data.y
		} else if (data.xyPos != null) {
			if (data.xyPos.x != null) {
				apnode.qianjingNode.x[0] = data.xyPos.x
			} else if (data.xyPos.y != null) {
				apnode.qianjingNode.y[0] = data.xyPos.y
			}
		} else if (data.scale != null) {
			apnode.qianjingNode.scale = data.scale
		} else if (data.angle != null) {
			apnode.qianjingNode.angle = data.angle
		}
		console.log('当前待机位置参数x', apnode.qianjingNode.x, '当前待机位置参数y', apnode.qianjingNode.y, 'scale', apnode.qianjingNode.scale, 'angle', apnode.qianjingNode.angle)
	}
}

// 调整动皮v2
function resize(data) {
	let am = animationManagers.getById(data.id);
	if (!am) return;
	let apnode = am.getNodeBySkinId(data.skinID);
	if (!apnode) return
	completeParams(apnode)

	if (data.mode === 'daiji') {
		if (data.x != null && data.y != null) {
			apnode.x = data.x
			apnode.y = data.y
			apnode.player.x = data.x
			apnode.player.y = data.y
		}
		if (data.scale != null) {
			apnode.scale = data.scale
			apnode.player.scale = data.scale
		}
		if (data.angle != null) {
			apnode.angle = data.angle
			apnode.player.angle = data.angle
		}
	} else if (data.mode === 'chukuang') {
		let actionParams = apnode.player.gongjiAction
		if (!actionParams) return

		if (data.x != null && data.y != null) {
			if (apnode.chukuangNode) {
				apnode.chukuangNode.x = data.x
				apnode.chukuangNode.y = data.y
			} else {
				// 说明是同一节点
				apnode.x = data.x
				apnode.y = data.y
			}
			// 修改参数
			actionParams.x = data.x
			actionParams.y = data.y
		}
		if (data.scale != null) {
			if (apnode.chukuangNode) {
				apnode.chukuangNode.scale = data.scale
				actionParams.scale = data.scale
			} else {
				apnode.scale = data.scale
				// 同一个动皮出框通过调整静态大小即可.
				actionParams.scale = data.scale
			}
		}
		if (data.angle != null) {
			if (apnode.chukuangNode) {
				apnode.chukuangNode.angle = data.angle
				actionParams.angle = data.angle
			} else {
				apnode.angle = data.angle
				actionParams.angle = data.angle
			}
		}
		actionParams.posAuto = false
	} else if (data.mode === 'beijing') {
		if (apnode.beijingNode == null) {
			return
		}
		if (data.x != null && data.y != null) {
			apnode.beijingNode.x = data.x
			apnode.beijingNode.y = data.y
			apnode.player.beijing.x = data.x
			apnode.player.beijing.y = data.y

		} else if (data.scale != null) {
			apnode.beijingNode.scale = data.scale
			apnode.player.beijing.scale = data.scale
		} else if (data.angle != null) {
			apnode.beijingNode.angle = data.angle
			apnode.player.beijing.angle = data.angle
		}
	} else if (data.mode === 'qianjing') {
		if (apnode.qianjingNode == null) {
			return
		}
		if (data.x != null && data.y != null) {
			apnode.qianjingNode.x = data.x
			apnode.qianjingNode.y = data.y
			apnode.player.qianjing.x = data.x
			apnode.player.qianjing.y = data.y

		} else if (data.scale != null) {
			apnode.qianjingNode.scale = data.scale
			apnode.player.qianjing.scale = data.scale
		} else if (data.angle != null) {
			apnode.qianjingNode.angle = data.angle
			apnode.player.qianjing.angle = data.angle
		}
	}
}

// 获取动皮的所有参数信息
function getNodeInfo(data) {
	let am = animationManagers.getById(data.id);
	if (!am) return;
	let apnode = am.getNodeBySkinId(data.skinID);
	if (!apnode) return
	completeParams(apnode)

	// 获取当前动皮的参数信息, daiji/gongji/beijing
	let retData = {
		id: data.id,
		type: 'getNodeInfo',
		daiji: {
			x: apnode.player.x,
			y: apnode.player.y,
			scale: apnode.player.scale,
			angle: apnode.player.angle
		},

	}

	// 获取所有的部件名字
	let slots = {
		daiji: {}
	}

	let hideSlots = new Set(apnode.player.hideSlots || [])
	apnode.skeleton.slots.forEach((slot) => {
		let slotName = slot.data.name
		slots.daiji[slotName] = hideSlots.has(slotName)
	})

	let gongjiInfo = null, beijingInfo = null, qianjingInfo = null
	if (apnode.player.gongjiAction) {
		let actionParams = apnode.player.gongjiAction
		gongjiInfo = {
			x: actionParams.x, y: actionParams.y, scale: actionParams.scale, angle: actionParams.angle
		}
	}
	if (apnode.beijingNode) {
		beijingInfo = {
			x: apnode.player.beijing.x, y: apnode.player.beijing.y, scale: apnode.player.beijing.scale, angle: apnode.player.beijing.angle
		}
	}
	if (apnode.qianjingNode) {
		qianjingInfo = {
			x: apnode.player.qianjing.x, y: apnode.player.qianjing.y, scale: apnode.player.qianjing.scale, angle: apnode.player.qianjing.angle
		}
	}
	retData.gongji = gongjiInfo
	retData.beijing = beijingInfo
	retData.qianjing = qianjingInfo
	retData.slots = slots

	window.postMessage(retData)

}

// 更换当前动皮的其他骨骼标签
function changeAction(data) {
	let am = animationManagers.getById(data.id);
	if (!am) return;
	let apnode = am.getNodeBySkinId(data.skinID);
	if (!apnode) return
	completeParams(apnode)

	if (data.isDefault) {
		apnode.skeleton.state.addAnimation(0, apnode.player.action || apnode.skeleton.defaultAction, true, 0)
		for (let s of ['x', 'y', 'scale', 'angle']) {
			if (s in apnode.player) {
				apnode[s] = apnode.player[s]
			}
		}
	} else {
		let skinInfo = data.skinInfo  // 获取新的action的参数信息
		let animation = apnode.skeleton.data.findAnimation(skinInfo.action)
		if (!animation) return  // 后面再加上标签不存在报一些错误信息
		apnode.skeleton.state.data.setMix(apnode.player.action || apnode.skeleton.defaultAction, animation.name, 0.6)
		if (skinInfo.loop) {
			apnode.skeleton.state.setAnimationWith(0, animation, true)
		} else {
			// 获取当前正在播放的action
			let currentEntry = apnode.skeleton.state.tracks[0]
			let currentAniName = currentEntry.animation.name
			apnode.skeleton.state.setAnimationWith(0, animation, false)
			if (currentEntry.loop) {
				apnode.skeleton.state.addAnimation(0, currentAniName, true, 0)
			} else {
				apnode.skeleton.state.addAnimation(0, apnode.player.action || apnode.skeleton.defaultAction, true, 0)
			}
		}
		// 重新覆盖一些参数
		for (let s of ['x', 'y', 'scale', 'angle']) {
			if (s in skinInfo) {
				apnode[s] = skinInfo[s]
			}
		}
	}
}


function loadResources(data) {
	const { players } = data
	let preLoad = (am, player) => {
		// 获取正确的ani
		let dynamic = am.getAnimation(player.version)
		let beijingDynamic
		if (player.beijing != null) {
			beijingDynamic = am.getAnimation(player.beijing.version || player.version)
		}
		let qianjingDynamic
		if (player.qianjing != null) {
			qianjingDynamic = am.getAnimation(player.qianjing.version || player.version)
		}
		// 将千幻的大小改成自适应
		let loadAllSkels = () => {
			let loadDaiJi = () => {
				let skelType = player.json ? 'json' : 'skel'
				if (!dynamic.hasSpine(player.name)) {
					dynamic.loadSpine(player.name, skelType, () => { }, (errMsg) => {
						if (errMsg) {
							console.error(errMsg)
						}
					})
				}
			}
			let loadPromises = [];

			if (player && player.beijing != null) {
				if (beijingDynamic.hasSpine(player.beijing.name)) {
					loadPromises.push(Promise.resolve());
				} else {
					loadPromises.push(new Promise((resolve, reject) => {
						beijingDynamic.loadSpine(player.beijing.name, player.beijing.json ? 'json' : 'skel', resolve, reject);
					}));
				}
			} else {
				loadPromises.push(Promise.resolve());
			}

			if (player && player.qianjing != null) {
				if (qianjingDynamic.hasSpine(player.qianjing.name)) {
					loadPromises.push(Promise.resolve());
				} else {
					loadPromises.push(new Promise((resolve, reject) => {
						qianjingDynamic.loadSpine(player.qianjing.name, player.qianjing.json ? 'json' : 'skel', resolve, reject);
					}));
				}
			} else {
				loadPromises.push(Promise.resolve());
			}

			Promise.all(loadPromises).then(() => {
				loadDaiJi();
			}).catch((error) => {
				console.error('加载骨骼失败:', error);
			});
		}
		loadAllSkels()
	}

	if (players) {
		let am = animationManagers.getById(data.id);
		if (!am) return;
		for (let res of players) {
			preLoad(am, res)
		}
		console.log('预加载待机骨骼成功')
	}
}


function find(data) {
	let am = animationManagers.getById(data.id);
	if (!am) return;
	let dynamic = am.getAnimationBySkinId(data.skinID)
	let apnode = am.getNodeBySkinId(data.skinID);
	if (!apnode) return
	let animation = apnode.skeleton.data.findAnimation(data.action);
	window.postMessage((animation != null && apnode.opacity == 1));
}

function show(data) {
	let am = animationManagers.getById(data.id);
	if (!am) return;
	console.log('am-----', am)
	let dynamic = am.getAnimationBySkinId(data.skinID)
	let apnode = am.getNodeBySkinId(data.skinID);
	if (!apnode) return
	apnode.opacity = 1
	apnode.speed = 1
	playDaiJi(apnode)
}

function hideAllNode(data) {
	let am = animationManagers.getById(data.id);
	if (!am) return;
	let dynamic = am.getAnimationBySkinId(data.skinId)
	for (let node of dynamic.nodes) {
		// if (node.isbeijing) {
		// 	continue
		// }
		if (data.skinId != null && node.id === data.skinId) {
			node.opacity = 0
			break
		}

	}
	postMessage({
		type: 'hideAllNodeEnd',
		id: data.id
	})
}

function recoverDaiJi(data) {
	let am = animationManagers.getById(data.id);
	if (!am) return;
	let dynamic = am.getAnimationBySkinId(data.skinId)
	let chukuangNode
	for (let node of dynamic.nodes) {
		if (node.chukuangNode) chukuangNode = node.chukuangNode
		if (node === chukuangNode) continue
		node.opacity = 1
	}
}

function destroy(data) {
	let am = animationManagers.getById(data.id);
	if (!am) return;
	// 删除动皮所带的canvas
	for (let k in am.animations) {
		if (am.animations[k]) {
			am.animations[k].nodes = []
			let webglExt = am.animations[k].gl.getExtension('WEBGL_lose_context')
			if (webglExt) {
				webglExt.loseContext()
			}
		}
	}
	animationManagers.remove(am)
	am.canvas = null
}

function changeSkelSkin(data) {
	let am = animationManagers.getById(data.id);
	if (!am) return;
	let apnode = am.getNodeBySkinId(data.skinId)
	if (!apnode) return
	let specifySkinName = data.skinName

	let skins = apnode.skeleton.data.skins
	if (specifySkinName) {
		for (let i = 0; i < skins.length; i++) {
			if (skins[i].name === specifySkinName) {
				try {
					apnode.skeleton.setSkinByName(specifySkinName);
					apnode.skeleton.setSlotsToSetupPose();
					return
				} catch (e) {
					console.warn('Failed to set skin:', specifySkinName, e);
					// 如果设置指定皮肤失败，尝试使用默认皮肤
					if (apnode.skeleton.data.defaultSkin) {
						try {
							apnode.skeleton.setSkin(apnode.skeleton.data.defaultSkin);
							apnode.skeleton.setSlotsToSetupPose();
						} catch (e2) {
							console.warn('Failed to set default skin:', e2);
						}
					}
					return
				}
			}
		}
	}

	if (skins.length > 1) {
		let curSkin = apnode.skeleton.skin.name
		// 替换当前皮肤为下一个皮肤
		for (let i = 0; i < skins.length; i++) {
			if (skins[i].name === curSkin) {
				let j = i + 1
				if (j === skins.length) {
					j = 0
				}
				try {
					apnode.skeleton.setSkinByName(skins[j].name);
					apnode.skeleton.setSlotsToSetupPose();
					return
				} catch (e) {
					console.warn('Failed to set skin:', skins[j].name, e);
					return
				}
			}
		}
	}
}

function update(animationManager, data) {
	animationManager.updateSpineAll(data)
}

function getBound(data) {
	let am = animationManagers.getById(data.id);
	if (!am) return;

	let name = data.name
	let version = data.version
	let eventId = data.eventId
	let type = data.type
	let dynamic = am.getAnimation(version)

	// let apnode = am.getNodeBySkinId(data.skinId)
	// if (!apnode) return

	if (dynamic.hasSpine(name)) {
		let bounds = dynamic.getSpineBounds(name)
		postMessage({
			eventId: eventId,
			bounds: bounds
		})
	} else {
		dynamic.loadSpine(name, type || 'skel', () => {
			let bounds = dynamic.getSpineBounds(name)
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
}
function changeQhlxFactor(data) {
	if (data.factor) {
		qhlxFactor = data.factor
	}
}

function getDefaultParam(dynamic, t) {
	// 这里尝试自动适配骨骼, 让骨骼能居中显示在canvas中.
	let canvasW = dynamic.canvas.width
	let canvasH = dynamic.canvas.height
	let bounds = t.skeleton.bounds
	let centerX = bounds.offset.x + bounds.size.x / 2;
	let centerY = bounds.offset.y + bounds.size.y / 2;
	let scaleX = bounds.size.x / canvasW;
	let scaleY = bounds.size.y / canvasH;
	let scale = Math.max(scaleX, scaleY);
	if (scale > 1) scale = 1 / scale;
	scale *= canvasH / canvasW
	let width = canvasW / scale;
	let height = canvasH / scale;

	// 手动设置x和y值.
	let xx = -(centerX - width / 2) / width
	let yy = 1 - (centerY + height / 2) / height
	// t.scale = scale
	// t.x = [0, xx]
	// t.y = [0, yy]

	console.log('scale', 'x', 'y', scale, xx, yy)
}


// 获取需要隐藏的apnode
function getHideDynamic(d, hideSkinId) {
	if (d.nodes.length > 1) {
		for (let i = 0; i < d.nodes.length; i++) {
			if (d.nodes[i].id === hideSkinId) return d.nodes[i];
		}
	} else return false;
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


// 补全配置参数
function completeParams(node) {
	if (node.isCompleteParams) {
		return
	}
	let player = node.player  // 这个是播放待机动作存取的配置参数
	if (!player) return

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
			if (!chuchang.name) { chuchang.name = node.name }
			if (!chuchang.action) { chuchang.action = 'play' }
			if (!chuchang.scale) { chuchang.scale = player.scale }
			player.chuchangAction = chuchang
		}
	}

	// 这是原来的EngEX扩展的判断手杀真动皮的写法. player.pos用来调整出框位置参数, 兼容此种写法, 如果填写了pos认为是原来的真动皮
	if (player.pos) {
		gongjiAction = {
			name: node.name,  // 和原来的皮肤一样
			x: player.pos.x,
			y: player.pos.y,
			scale: player.scale,
			action: 'GongJi'
		}
		teshuAction = {
			name: node.name,
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
				name: node.name,  // 和原来的皮肤一样
				x: [0, 0.5],
				y: [0, 0.5],
				scale: player.scale,  //
				action: player.gongji,
			}
		}
		// 如果是简单的设置为true, 那么说明当前动皮是静态皮肤, 也想出框, 那么和上面一样, 播放当前待机动作到中央
		else if (gongji === true) {
			gongjiAction = {
				name: node.name,  // 和原来的皮肤一样
				x: [0, 0.5],
				y: [0, 0.5],
				scale: player.scale,  //
				showTime: 2  // 静态皮肤可以指定出框的时间, 因为有些静态皮肤的待机动作时间太长了, 需要提前结束
			}
		} else if (gongjiType === 'object') {
			gongjiAction = gongji
			if (!gongjiAction.name) {
				gongjiAction.name = node.name
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
			if (!gongjiAction.scale) { gongjiAction.scale = player.scale }
		} else {
			// 默认从当前皮肤的GongJi标签来播放动作
			gongjiAction = {
				name: node.name,  // 和原来的皮肤一样
				x: [0, 0.5],
				y: [0, 0.5],
				scale: player.scale,
				action: 'GongJi'  // 寻找默认的攻击动画标签名称
			}
		}

		// 特殊动作同样处理
		if (teshuType === 'string') {
			teshuAction = {
				name: node.name,  // 和原来的皮肤一样
				x: [0, 0.5],
				y: [0, 0.5],
				scale: player.scale,
				action: player.teshu,
			}
		}
		// 特殊动作, 原地播放待机动画没啥意义, 就不提供
		// else if (teshuType === true) {
		// 	gongjiAction = {
		// 		name: node.name,  // 和原来的皮肤一样
		// 		x: [0, 0.5],
		// 		y: [0, 0.5],
		// 		scale: player.scale,  //
		// 		action: player.gongji,
		// 		showTime: 2  // 静态皮肤可以指定出框的时间, 因为有些静态皮肤的待机动作时间太长了, 需要提前结束
		// 	}
		// }
		else if (teshuType === 'object') {
			teshuAction = teshu
			if (!teshuAction.name) {
				teshuAction.name = node.name
			} else {
				teshuAction.name = getFullName(player.localePath, teshu.name)
			}
			// 特殊动画还是最好不要出框, 不然触发频率太高了...
			if (teshuAction.name !== node.name) {
				if (!teshuAction.x) { teshuAction.x = [0, 0.5] }
				if (!teshuAction.y) { teshuAction.y = [0, 0.5] }

			} else {
				if (!teshuAction.x) { teshuAction.x = player.x }
				if (!teshuAction.y) { teshuAction.y = player.y }
			}
			if (!teshuAction.scale) { teshuAction.scale = player.scale }
			if (!teshuAction.showTime) { teshuAction.showTime = 2 }
		} else {
			// 默认从当前皮肤的GongJi标签来播放动作
			teshuAction = {
				name: node.name,  // 和原来的皮肤一样
				x: [0, 0.5],
				y: [0, 0.5],
				scale: player.scale,
				action: 'TeShu'  // 寻找默认的攻击动画标签名称
			}
		}
	}
	node.player.gongji = gongjiAction
	gongjiAction.alpha = gongjiAction.alpha == null ? node.player.alpha : gongjiAction.alpha
	node.player.teshu = teshuAction  // 重新赋值

	node.player.gongjiAction = gongjiAction
	node.player.teshuAction = teshuAction

	node.isCompleteParams = true
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
	apnode.skeleton.state.setAnimationWith(0, animation, false);
	apnode.skeleton.state.addEmptyAnimation(0, 0)
}

function setShiZhouNianGongJiPos(apnode, data) {
	if (data.me) {
		apnode.x = data.player.x - data.player.width / 3
		apnode.y = data.player.y + data.player.height * 1.1
		// apnode.scale *= 1.2
	} else {
		// 根据每个人当时的位置偏移
		let xRate = data.player.x / data.player.bodyWidth
		let yRate = data.player.y / data.player.bodyHeight
		apnode.x = data.player.x + data.player.width / 2
		apnode.y = data.player.y + data.player.height / 2
		// apnode.scale *= 1.2
		console.log('x,y', xRate, yRate)
		if (xRate < 0.3) {
			apnode.x += data.player.width * 0.25
		}

		if (xRate > 0.6) {
			apnode.x -= data.player.width * 0.4
		}

		if (yRate > 0.6) {
			apnode.y -= data.player.height * 0.25
		}

		if (yRate < 0.3) {
			apnode.y += data.player.height * 0.25
		}
		// else if (xRate > 0.85) {
		// 	apnode.x = data.player.x - 40
		// }else {
		// 	apnode.x = data.player.x
		// }
		// if (yRate < 0.15) {
		// 	apnode.y = data.player.y + 40
		// } else if (yRate > 0.85) {
		// 	apnode.y = data.player.y - 40
		// } else {
		// 	apnode.y = data.player.y
		// }

	}
}

function setPos(apnode, data) {
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
		} else if (data.action === 'chuchang') {
			apnode.x = data.player.x + data.player.width / 2
			apnode.y = data.player.y + data.player.height * 0.8
			return
			// 出场是原地出场
		} else {
			return
		}
		apnode.x = actionParams.x
		apnode.y = actionParams.y
		data.player.y += 180
	} else {
		if (data.action === 'chuchang') {
			// apnode.x = data.player.x + data.player.width / 2
			// apnode.y = data.player.y + data.player.height / 2
			return setShiZhouNianGongJiPos(apnode, data)
		}
		else if (data.action === 'GongJi') {
			if (apnode.player.shizhounian) {
				return setShiZhouNianGongJiPos(apnode, data)
			}
		}
		apnode.x = data.direction.x;
		apnode.y = data.direction.y;
		if (data.direction.isLeft) data.player.x += 85; else data.player.x += 40;
	}
}

// 根据已有的apnode直接播放待机动画
function playDaiJi(apnode) {
	if (apnode.player.scale) {
		apnode.scale = apnode.player.scale
	}
	if (apnode.player.action) {
		// find chuchang
		let animation = apnode.skeleton.data.findAnimation("ChuChang");
		if (animation) {
			apnode.skeleton.state.setAnimationWith(0, animation, false, -0.01);
			apnode.skeleton.state.addAnimation(0, apnode.player.action, true, 0);
		} else {
			apnode.skeleton.state.setAnimation(0, apnode.player.action, true, 0);
		}
	} else {
		apnode.skeleton.state.setAnimation(0, apnode.skeleton.defaultAction, true, 0);
	}
	if (apnode.beijingNode) {
		apnode.beijingNode.skeleton.state.tracks[0].trackTime = 0
		apnode.skeleton.state.tracks[0].trackTime = 0
	}
	if (apnode.qianjingNode) {
		apnode.qianjingNode.skeleton.state.tracks[0].trackTime = 0
		apnode.skeleton.state.tracks[0].trackTime = 0
	}
}


/**
 *
 * @param dynamic  AnimationPlayer对象
 * @param name  骨骼名字
 * @returns {Object||null} {name: 'actionName', 'duration': duration}
 */
function getDefaultAction(dynamic, name) {
	// 获取默认的动作
	let spineActions = dynamic.getSpineActions(name)
	if (!spineActions) return null
	return spineActions[0]
}

// 获取默认的攻击动作标签
function getDefaultGongJiAction(dynamic, name) {
	let spineActions = dynamic.getSpineActions(name)
	if (spineActions && spineActions.length > 0) {
		for (let item of spineActions) {
			if (item.name === 'GongJi') {
				return item
			}
		}
		return spineActions[0]
	}
	return null
}

function getActionDuration(dynamic, skelName, actionName) {
	let spineActions = dynamic.getSpineActions(skelName)
	let duration = null
	if (actionName) {
		for (let a of spineActions) {
			if (a.name === actionName) {
				duration = a.duration
				break
			}
		}
	} else {
		duration = spineActions[0].duration
	}
	return duration
}


/*************** 每个函数处理worker消息 end ***************/

onmessage = function (e) {
	let data = e.data

	const messageMap = {
		CREATE: create,
		PLAY: play,
		StartPlay: startPlaySkin,
		STOP: stop,
		STOPALL: stopAll,
		UPDATE: msgUpdate,
		ACTION: action,
		FIND: find,
		SHOW: show,
		ADJUST: adjust,
		DEBUG: debug,
		POSITION: position,
		hideAllNode: hideAllNode,
		recoverDaiJi: recoverDaiJi,
		DESTROY: destroy,
		changeSkelSkin: changeSkelSkin,
		getBound: getBound,
		changeQhlxFactor: changeQhlxFactor,
		GET_NODE_INFO: getNodeInfo,
		RESIZE: resize,
		CHANGE_ACTION: changeAction,
		LOAD_RESOURCES: loadResources
	}
	if (data.message in messageMap) {
		messageMap[data.message](data)
	}

}