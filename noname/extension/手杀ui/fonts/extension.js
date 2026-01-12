game.import('extension', function (lib, game, ui, get, ai, _status) {

	/*-----------------分割线-----------------*/
	//避免提示是否下载图片和字体素材（参考SJ Settings扩展）
	if (!lib.config.asset_version) {
		game.saveConfig('asset_version', '无');
	}
	// 调用启动页代码
	// 定义 layoutPath 路径
	let layoutPath = lib.assetURL + 'extension/手杀ui/';
	if (lib.config.extension_手杀ui_KGMH == "1") {
		lib.init.css(layoutPath, 'KGMH/kaiguan'); /*开关美化*/
	};
	if (lib.config.extension_手杀ui_KGMH == "2") {
		lib.init.css(layoutPath, 'KGMH/kaiguan_new'); /*开关美化*/
	};
	/*-----------------分割线-----------------*/
	/*-----------------分割线-----------------*/
	// 调用css
	if (lib.config.extension_手杀ui_qiDongYe == 'on') {
		lib.init.css(layoutPath, 'qidongye/layout_old'); /*动态启动页css文件*/
	};
	/***********************分割线**********************/
	if (lib.config.extension_手杀ui_qiDongYe == 'othersOn' || lib.config.extension_手杀ui_qiDongYe == 'othersTwo') {
		lib.init.css(layoutPath, 'qidongye/layout_new'); /*大启动页css文件*/
	};
	if (lib.config.extension_手杀ui_qiDongYe == 'othersTwo') {
		lib.init.css(layoutPath, 'qidongye/layout_xbig'); /*大启动页css文件*/
	};
	/*-----------------分割线-----------------*/
	// 检测本体按钮背景选项
	if (lib.config.control_style != 'default') {
		alert('"检测到按键显示异常，请按照以下流程操作:\n①关闭手杀ui并重启\n②打开菜单/外观/按钮背景，并改为默认\n③开启手杀ui并重启');
	};






	var app = {
		name: '手杀ui',
		each: function (obj, fn, node) {
			if (!obj) return node;
			if (typeof obj.length === 'number') {
				for (var i = 0; i < obj.length; i++) {
					if (fn.call(node, obj[i], i) === false) {
						break;
					}
				}
				return node;
			}
			for (var i in obj) {
				if (fn.call(node, obj[i], i) === false) {
					break;
				}
			}
			return node;
		},
		isFunction: function (fn) {
			return typeof fn === 'function';
		},
		event: {
			listens: {},
			on: function (name, listen, remove) {
				if (!this.listens[name]) {
					this.listens[name] = [];
				}
				this.listens[name].push({
					listen: listen,
					remove: remove,
				});
				return this;
			},
			off: function (name, listen) {
				return app.each(this.listens[name], function (item, index) {
					if (listen === item || listen === item.listen) {
						this.listens[name].splice(index, 1);
					}
				}, this);
			},
			emit: function (name) {
				var args = Array.from(arguments).slice(1);
				return app.each(this.listens[name], function (item) {
					item.listen.apply(null, args);
					item.remove && this.off(name, item);
				}, this);
			},
			once: function (name, listen) {
				return this.on(name, listen, true);
			},
		},
		create: {},
		listens: {},
		plugins: [],
		pluginsMap: {},
		path: {
			ext: function (path, ext) {
				ext = ext || app.name;
				return lib.assetURL + 'extension/' + ext + '/' + path;
			},
		},
		on: function (event, listen) {
			if (!app.listens[event]) {
				app.listens[event] = [];
			}
			app.listens[event].add(listen);
		},
		once: function (event, listen) {
			if (!app.listens[event]) {
				app.listens[event] = [];
			}
			app.listens[event].push({
				listen: listen,
				remove: true,
			});
		},
		off: function (event, listen) {
			var listens = app.listens[event] || [];
			var filters = listen ? listens.filter(function (item) {
				return item === listen || item.listen === listen;
			}) : listens.slice(0);
			filters.forEach(function (item) {
				listens.remove(item);
			});
		},
		emit: function (event) {
			var args = Array.from(arguments).slice(1);
			var listens = app.listens[event] || [];
			listens.forEach(function (item) {
				if (typeof item === 'function') {
					item.apply(null, args);
				} else if (typeof item.listen === 'function') {
					item.listen.apply(null, args);
					item.remove && listens.remove(item);
				}
			});
		},
		import: function (fn) {

			var obj = fn(lib, game, ui, get, ai, _status, app);
			if (obj) {
				if (obj.name) app.pluginsMap[obj.name] = obj;
				if (obj.precontent && (!obj.filter || obj.filter())) obj.precontent();
			}
			app.plugins.push(obj);
		},

		importPlugin: function (data, setText) {
			if (!window.JSZip) {
				var args = arguments;
				lib.init.js(lib.assetURL + 'game', 'jszip', function () {
					app.importPlugin.apply(app, args);
				});
				return;
			}
			setText = typeof setText === 'function' ? setText : function () { };
			var zip = new JSZip(data);
			var dirList = [],
				fileList = [];
			for (var i in zip.files) {
				if (/\/$/.test(i)) {
					dirList.push('extension/' + app.name + '/' + i);
				} else if (!/^extension\.(js|css)$/.test(i)) {
					fileList.push({
						id: i,
						path: 'extension/' + app.name + '/' + i.split('/').reverse().slice(1)
							.reverse().join('/'),
						name: i.split('/').pop(),
						target: zip.files[i],
					});
				}
			}

			var total = dirList.length + fileList.length;
			var finish = 0;
			var isNode = lib.node && lib.node.fs;

			var writeFile = function () {
				var file = fileList.shift();
				if (file) {
					setText('正在导入(' + (++finish) + '/' + total + ')...')
					game.writeFile(isNode ? file.target.asNodeBuffer() : file.target
						.asArrayBuffer(), file.path, file.name, writeFile);
				} else {
					alert('导入完成');
					setText('导入插件');
				}
			};
			var ensureDir = function () {
				if (dirList.length) {
					setText('正在导入(' + (++finish) + '/' + total + ')...')
					game.ensureDirectory(dirList.shift(), ensureDir);
				} else {
					writeFile();
				}
			};
			ensureDir();
		},
		loadPlugins: function (callback) {
			game.getFileList('extension/' + app.name, function (floders) {
				var total = floders.length;
				var current = 0;
				if (total === current) {
					callback();
					return;
				}
				var loaded = function () {
					if (++current === total) {
						callback();
					}
				};
				floders.forEach(function (dir) {
					if (lib.config.extension_手杀ui_yangshi == "on") {
						game.readFile('extension/' + app.name + '/' + dir + '/main1.js',
							function (data) {
								var binarry = new Uint8Array(data);
								var blob = new Blob([binarry]);
								var reader = new FileReader();
								reader.readAsText(blob);
								reader.onload = function () {
									eval(reader.result);
									loaded();
								};
							},
							function (e) {
								console.info(e);
								loaded();
							});
					} else {
						game.readFile('extension/' + app.name + '/' + dir + '/main2.js',
							function (data) {
								var binarry = new Uint8Array(data);
								var blob = new Blob([binarry]);
								var reader = new FileReader();
								reader.readAsText(blob);
								reader.onload = function () {
									eval(reader.result);
									loaded();
								};
							},
							function (e) {
								console.info(e);
								loaded();
							});
					}
				});
			});
		},
		reWriteFunction: function (target, name, replace, str) {
			if (name && typeof name === 'object') {
				return app.each(name, function (item, index) {
					app.reWriteFunction(target, index, item[0], item[1]);
				}, target);
			}

			var plugins = app.pluginsMap;
			if ((typeof replace === 'string' || replace instanceof RegExp) &&
				(typeof str === 'string' || str instanceof RegExp)) {
				var funcStr = target[name].toString().replace(replace, str);
				eval('target.' + name + ' = ' + funcStr);
			} else {
				var func = target[name];
				target[name] = function () {
					var result, cancel;
					var args = Array.from(arguments);
					var args2 = Array.from(arguments);
					if (typeof replace === 'function') cancel = replace.apply(this, [args].concat(
						args));
					if (typeof func === 'function' && !cancel) result = func.apply(this, args);
					if (typeof str === 'function') str.apply(this, [result].concat(args2));
					return cancel || result;
				};
			}
			return target[name];
		},
		reWriteFunctionX: function (target, name, replace, str) {
			if (name && typeof name === 'object') {
				return app.each(name, function (item, index) {
					app.reWriteFunction(target, index, item);
				}, target);
			}

			if (Array.isArray(replace)) {
				var item1 = replace[0];
				var item2 = replace[1];
				var item3 = replace[2];
				if (item3 === 'append') {
					item2 = item1 + item2;
				} else if (item3 === 'insert') {
					item2 = item2 + item1;
				}
				if (typeof item1 === 'string') {
					item1 = RegExp(item1);
				}
				if (item1 instanceof RegExp && typeof item2 === 'string') {
					var funcStr = target[name].toString().replace(item1, item2);
					eval('target.' + name + ' = ' + funcStr);
				} else {
					var func = target[name];
					target[name] = function () {
						var arg1 = Array.from(arguments);
						var arg2 = Array.from(arguments);
						var result;
						if (app.isFunction(item1)) result = item1.apply(this, [arg1].concat(arg1));
						if (app.isFunction(func) && !result) result = func.apply(this, arg1);
						if (app.isFunction(item2)) item2.apply(this, [result].concat(arg2));
						return result;
					};
				}
			} else {
				console.info(arguments);
			}
			return target[name];
		},
		waitAllFunction: function (fnList, callback) {
			var list = fnList.slice(0);
			var runNext = function () {
				var item = list.shift();
				if (typeof item === 'function') {
					item(runNext);
				} else if (list.length === 0) {
					callback();
				} else {
					runNext();
				}
			};
			runNext();
		},
		element: {
			runNext: {
				setTip: function (tip) {
					console.info(tip);
				},
			},
		},
		get: {
			playerSkills: function (node, arg1, arg2) {
				var skills = node.getSkills(arg1, arg2).slice(0);
				skills.addArray(Object.keys(node.forbiddenSkills));
				skills.addArray(Object.keys(node.disabledSkills).filter(function (k) {
					return !node.hiddenSkills.contains(k) &&
						node.disabledSkills[k].length &&
						node.disabledSkills[k][0] === k + '_awake';
				}));
				return skills;
			},
			skillInfo: function (skill, node) {
				var obj = {};
				obj.id = skill;
				if (lib.translate[skill + '_ab']) {
					obj.name = lib.translate[skill + '_ab'];
					obj.nameSimple = lib.translate[skill + '_ab'];
				} else if (lib.translate[skill]) {
					obj.name = lib.translate[skill];
					obj.nameSimple = lib.translate[skill].slice(0, 2);
				}
				obj.info = lib.skill[skill];
				if (node) {
					if (node.forbiddenSkills[skill]) obj.forbidden = true;
					if (node.disabledSkills[skill]) obj.disabled = true;
					if (obj.info.temp || !node.skills.contains(skill)) obj.temp = true;
					if (obj.info.frequent || obj.info.subfrequent) obj.frequent = true;
					if (obj.info.clickable && node.isIn() && node.isUnderControl(true)) obj.clickable =
						true;
					if (obj.info.nobracket) obj.nobracket = true;
				}
				obj.translation = get.skillInfoTranslation(skill);
				obj.translationSource = lib.translate[skill + '_info'];
				obj.translationAppend = lib.translate[skill + '_append'];
				if (obj.info && obj.info.enable) {
					obj.type = 'enable';
				} else {
					obj.type = 'trigger';
				}
				return obj;
			},
		},
		listen: function (node, func) {
			node.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', func);
			return function () {
				node.removeEventLisnter(lib.config.touchscreen ? 'touchend' : 'click', func);
			};
		},
		mockTouch: function (node) {
			var event = new Event(lib.config.touchscreen ? 'touchend' : 'click');
			node.dispatchEvent(event);
			return node;
		},
		nextTick: function (func, time) {
			var funcs;
			if (Array.isArray(func)) funcs = func;
			else funcs = [func];
			var next = function () {
				var item = funcs.shift();
				if (item) {
					setTimeout(function () {
						item();
						next();
					}, time || 0);
				}
			};
			next();
		},
	};

	return {
		name: app.name,
		content: function (config, pack) {


			//武将搜索代码延时
			setTimeout(function () {
				//武将搜索代码摘抄至扩展ol
				var kzol_create_characterDialog = ui.create.characterDialog;
				ui.create.characterDialog = function () {
					var dialog = kzol_create_characterDialog.apply(this, arguments);
					if (lib.config.mode == 'stone') return dialog;
					var content_container = dialog.childNodes[0];
					var content = content_container.childNodes[0];
					var switch_con = content.childNodes[0];
					var buttons = content.childNodes[1];
					var div = ui.create.div('');
					div.style.height = '35px';
					div.style.width = 'calc(100%)';
					div.style.top = '-2px';
					div.style.left = '0px';
					div.style['white-space'] = 'nowrap';
					/*圆角*/
					div.style['border-radius'] = '5px';
					div.style['text-align'] = 'center';
					div.style['line-height'] = '26px';
					div.style['font-size'] = '24px';
					div.style['font-family'] = 'xinwei';
					div.innerHTML = '搜索：' +
						'<input type="text" style="width:150px;border-radius: 3px;"></input>' + '   ' +
						'<select size="1" style="width:95px;height:21px;border-radius: 3px;">' +
						'<option value="name">名称翻译</option>' +
						'<option value="name1">名称</option>' +
						'<option value="skill">技能翻译</option>' +
						'<option value="skill1">技能</option>' +
						'<option value="skill2">技能叙述</option>' +
						'</select>';
					var input = div.querySelector('input');
					input.onkeydown = function (e) {
						e.stopPropagation();
						if (e.keyCode == 13) {
							var value = this.value;
							var choice = div.querySelector('select').options[div.querySelector('select')
								.selectedIndex].value;
							if (value) {
								if (game.say1) game.say1('搜索完成');
								//if(dialog.currentcaptnode2) dialog.currentcaptnode2.classList.remove('thundertext');
								//if(dialog.currentcaptnode) dialog.currentcaptnode.classList.remove('thundertext');
								for (var i = 0; i < buttons.childNodes.length; i++) {
									buttons.childNodes[i].classList.add('nodisplay');
									var name = buttons.childNodes[i].link;
									var skills;
									if (lib.character[name] != undefined) {
										skills = lib.character[name][3];
									};
									if (choice == 'name1') {
										if (name.indexOf(value) != -1) {
											buttons.childNodes[i].classList.remove('nodisplay');
										};
									} else if (choice == 'skill') {
										if (skills != undefined && skills.length > 0) {
											for (var j = 0; j < skills.length; j++) {
												var skill = skills[j];
												if (get.translation(skill).indexOf(value) != -1) {
													buttons.childNodes[i].classList.remove('nodisplay');
												};
											};
										};
									} else if (choice == 'skill1') {
										if (skills != undefined && skills.length > 0) {
											for (var j = 0; j < skills.length; j++) {
												var skill = skills[j];
												if (skill.indexOf(value) != -1) {
													buttons.childNodes[i].classList.remove('nodisplay');
												};
											};
										};
									} else if (choice == 'skill2') {
										if (skills != undefined && skills.length > 0) {
											for (var j = 0; j < skills.length; j++) {
												var skill = skills[j];
												if (lib.translate[skill + '_info'] != undefined && lib.translate[
													skill + '_info'].indexOf(value) != -1) {
													buttons.childNodes[i].classList.remove('nodisplay');
												};
											};
										};
									} else {
										if (get.translation(name).indexOf(value) != -1) {
											buttons.childNodes[i].classList.remove('nodisplay');
										};
									};
								};
							} else {
								if (game.say1) game.say1('请先输入需要搜索武将的名字');
							};
						};
					};
					input.onmousedown = function (e) {
						e.stopPropagation();
					};
					if (lib.config['extension_武将卡牌搜索器_enable'] == true) {
						if (lib.config['extension_扩展ol_zyxj_search1'] != false) {
							if (window.诗笺_manual != undefined) {
								div.style.height = '58px';
								div.innerHTML += '<br><button>武将卡牌搜索器</button>';
								var button = div.querySelector('button');
								button.onclick = function () {
									window.诗笺_manual.show();
								};
							};
						};
					};
					switch_con.insertBefore(div, switch_con.firstChild);
					/*
					for(var i=0;i<buttons.childNodes.length;i++){
						var name=buttons.childNodes[i].link;
						if(name!=undefined&&name.indexOf('kzsg_')!=-1){
							buttons.childNodes[i].style.display='none';
						};
					};
					*/
					return dialog;
				}

			}, 100);

			/*-------转换技，阴阳标记等----*/
			//修改changezhuanhuanji函数
			//借用了本体的changezhuanhuanji函数，
			lib.element.player.changeZhuanhuanji = function (skill) {
				var player = this, info = get.info(skill), zhuanhuan = info.zhuanhuanji;
				if (typeof zhuanhuan == 'function') zhuanhuan(player, skill);
				else if (zhuanhuan == 'number') player.addMark(skill, 1, false);
				else player.storage[skill] = !player.storage[skill];
				game.broadcastAll(function (player, skill) {
					player.$changeZhuanhuanji(skill);
				}, player, skill);
			},

				lib.element.player.$changeZhuanhuanji = function (skill) {
					var mark = this.node.xSkillMarks.querySelector('[data-id="' + skill + '"]');
					var num = this.countMark(skill);
					var url = lib.assetURL + 'extension/手杀ui/skill/images/' + skill + '_yang.png';
					function ImageIsExist(url) {
						let xmlHttp = new XMLHttpRequest();
						xmlHttp.open('Get', url, false);
						xmlHttp.send();
						if (xmlHttp.status === 404)
							return false;
						else
							return true;
					}
					try { var a = ImageIsExist(url); mark.dk = true; }
					catch (err) { mark.dk = false; };
					if (mark && lib.config.extension_手杀ui_yangshi == "on") {
						if (mark.dd == true) {
							this.yingSkill(skill);
							mark.dd = false;
							if (mark.dk) {

								mark.setBackgroundImage('extension/手杀ui/skill/images/' + skill + '_yang.png');

							} else {

								mark.setBackgroundImage('extension/手杀ui/skill/images/ditu_yang.png');

							}
						}
						else {
							this.yangSkill(skill);
							mark.dd = true;
							if (mark.dk) {

								mark.setBackgroundImage('extension/手杀ui/skill/images/' + skill + '_ying.png');

							} else {

								mark.setBackgroundImage('extension/手杀ui/skill/images/ditu_ying.png');

							}
						}
					}

					if (mark && lib.config.extension_手杀ui_yangshi == "off") {
						if (mark.classList.contains('yin')) {
							mark.classList.remove('yin');
							mark.classList.toggle('yang');
						} else {
							if (mark.classList.contains('yang'))
								mark.classList.remove('yang');
							mark.classList.toggle('yin');
						}
					}

				};
			//修改技能按钮
			//定义两个空集合阳按钮和阴按钮（别问为啥阴不是yin而是ying，问就是拿yang复制比较简单）
			lib.element.player.yangedSkills = [];
			lib.element.player.yingedSkills = [];
			//定义阴函数，将技能加入阴集合，并删除阳集合里的该技能。
			lib.element.player.yangSkill = function (skill) {
				var player = this;
				game.broadcastAll(function (player, skill) {
					player.$yangSkill(skill);
				}, player, skill);
			},
				lib.element.player.$yangSkill = function (skill) {
					this.yangedSkills.add(skill);
					this.yingedSkills.remove(skill);
				},
				//阳函数同理				
				lib.element.player.yingSkill = function (skill) {
					var player = this;
					game.broadcastAll(function (player, skill) {
						player.$yingSkill(skill);
					}, player, skill);
				},
				lib.element.player.$yingSkill = function (skill) {
					this.yingedSkills.add(skill);
					this.yangedSkills.remove(skill);
				},
				//添加failskill函数
				//这是失败函数，添加到使命技的失败分支里，作用是为使命技的class样式添加一个后缀fail，这样在使命技失败的时候创建的标记就会是白底和一个x（类似限定技使用后），而使命技成功的标记就会是红底。
				lib.element.player.failSkill = function (skill) {
					var player = this;
					game.broadcastAll(function (player, skill) {
						player.$failSkill(skill);
					}, player, skill);
				},
				lib.element.player.$failSkill = function (skill) {
					var mark = this.node.xSkillMarks.querySelector('[data-id="' + skill + '"]');
					if (mark) mark.classList.add('fail');
				},
				//添加失效函数
				//构建一个失效技能的空集合
				//失效函数是为了给技能按钮上锁的，在技能失效时，补上shixiao函数，技能就会被加入失效集合里，手杀ui那里就会检测到技能失效，从而添加上锁图片。
				lib.element.player.shixiaoedSkills = [];
			lib.element.player.shixiaoSkill = function (skill) {
				var player = this;
				game.broadcastAll(function (player, skill) {
					player.$shixiaoSkill(skill);
				}, player, skill);
			},
				lib.element.player.$shixiaoSkill = function (skill) {
					if (!this.shixiaoedSkills) this.shixiaoedSkills = [];
					this.shixiaoedSkills.add(skill);
				},
				//添加解除失效函数	
				//看名字就知道是干啥的			
				lib.element.player.unshixiaoSkill = function (skill) {
					var player = this;
					game.broadcastAll(function (player, skill) {
						player.$unshixiaoSkill(skill);
					}, player, skill);
				},
				lib.element.player.$unshixiaoSkill = function (skill) {
					this.shixiaoedSkills.remove(skill);
				};
			/*---------*/


			lib.arenaReady.push(function () {

				/*修改标记变化限制*/
				//mark释放2字以上标记，改成无字数限制
				lib.element.player.mark = function (item, info, skill) {
					if (get.itemtype(item) == 'cards') {
						var marks = new Array(item.length);
						for (var i = 0; i < item.length; i++) marks.push(this.mark(item[i], info));
						return marks;
					}
					var mark;
					if (get.itemtype(item) == 'card') {
						mark = item.copy('mark');
						mark.suit = item.suit;
						mark.number = item.number;
						if (item.classList.contains('fullborder')) {
							mark.classList.add('fakejudge');
							mark.classList.add('fakemark');
							if (!mark.node.mark) mark.node.mark = mark.querySelector('.mark-text') || decadeUI.element.create('mark-text', mark);
							mark.node.mark.innerHTML = lib.translate[name.name + '_bg'] || get.translation(name.name)[0];
						}
						item = item.name;
					} else {
						mark = ui.create.div('.card.mark');
						if (lib.skill[item] && lib.skill[item].markimage) {
							mark.text = decadeUI.element.create('mark-text', mark);
							if (decadeUI.config.playerMarkStyle == 'decade') {
								mark.text.innerHTML = "<img src='" + lib.assetURL + lib.skill[item].markimage + "' style='width:18px;height:15px;'/>";
							} else {
								mark.text.innerHTML = " ";
								mark.text.setBackgroundImage(lib.skill[item].markimage);
							}
							mark.text.style['box-shadow'] = 'none';
							mark.text.style.backgroundPosition = 'center';
							mark.text.style.backgroundSize = 'contain';
							mark.text.style.backgroundRepeat = 'no-repeat';
						} else {
							var markText = lib.translate[item + '_bg'];
							if (!markText || markText[0] == '+' || markText[0] == '-') {
								markText = get.translation(item);
								//这里释放标记名文字限制                                                                        
								if (decadeUI.config.playerMarkStyle != 'decade') {
									markText = markText[0];
								}
							}
							mark.text = decadeUI.element.create('mark-text', mark);
							if (markText.length == 2) mark.text.classList.add('small-text');
							/*正则给花色上色*/
							if (markText.toString().indexOf("♦️") != -1)
								markText = markText.replace(/♦️/g, "<span style='color:red;-webkit-text-stroke: 0.2px white;text-shadow:0 0 3px white;'>♦️</span>");
							if (markText.toString().indexOf("♥️") != -1) markText = markText.replace(/♥️/g, "<span style='color:red;-webkit-text-stroke: 0.2px white;text-shadow:0 0 3px white;'>♥</span>️️");
							if (markText.toString().indexOf("♠️️") != -1) markText = markText.replace(/♠️️/g, "<span style='color:black;-webkit-text-stroke:0.2px white;text-shadow:0 0 3px white;'>♠️</span>️️");
							if (markText.toString().indexOf("♣️️") != -1) markText = markText.replace(/♣️️/g, "<span style='color:black;-webkit-text-stroke:0.2px white;text-shadow:0 0 3px white;'>♣️</span>️️");
							mark.text.innerHTML = markText;
						}
					}

					mark.name = item;
					mark.skill = skill || item;
					if (typeof info == 'object') {
						mark.info = info;
					} else if (typeof info == 'string') {
						mark.markidentifer = info;
					}

					mark.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.card);
					if (!lib.config.touchscreen) {
						if (lib.config.hover_all) {
							lib.setHover(mark, ui.click.hoverplayer);
						}
						if (lib.config.right_info) {
							mark.oncontextmenu = ui.click.rightplayer;
						}
					}
					this.node.marks.appendChild(mark);
					this.updateMarks();
					ui.updatem(this);
					return mark;
				};
				//修改使得markcount可以是文字，修改位置在get.translation(this.storage[i])，自己对比             
				lib.element.player.updateMark = function (i, storage) {
					if (!this.marks[i]) {
						if (lib.skill[i] && lib.skill[i].intro && (lib.skill[i].zhuanhuanji || this.storage[i] || lib.skill[i].intro.markcount)) {
							//释放对storage的限制保证转换技的storage为false时能显示阴阳                                       
							this.markSkill(i);
							if (!this.marks[i]) return this;
						} else {
							return this;
						}
					}
					var mark = this.marks[i];
					if (storage && this.storage[i]) this.syncStorage(i);
					if (i == 'ghujia' || ((!mark.querySelector('.image') || this.storage[i + '_markcount']) &&
						lib.skill[i] && lib.skill[i].intro && !lib.skill[i].intro.nocount &&
						(lib.skill[i].zhuanhuanji || this.storage[i] || this.storage[i + '_markcount'] || lib.skill[i].intro.markcount))) {
						//同上                                      
						mark.classList.add('overflowmark');
						var num = 0;
						if (typeof lib.skill[i].intro.markcount == 'function') {
							num = lib.skill[i].intro.markcount(this.storage[i], this);
						} else if (lib.skill[i].intro.markcount == 'expansion') {
							num = this.countCards('x', (card) => card.hasGaintag(i));
						} else if (typeof this.storage[i + '_markcount'] == 'number') {
							num = this.storage[i + '_markcount'];
						} else if (i == 'ghujia') {
							num = this.hujia;
						} else if (typeof this.storage[i] == 'number') {
							if (lib.skill[i].zhuanhuanji) {
								if (this.storage[i] % 2 == 0) num = '阳';
								else num = '阴';
							}
							else num = this.storage[i];
						} else if (Array.isArray(this.storage[i])) {
							num = this.storage[i].length;
						} else if (typeof this.storage[i] == 'string') {//修改这里
							if (this.storage[i] == "red" || this.storage[i] == "black") {
								num = (this.storage[i] == "red") ? "红" : "黑"
							} else num = get.translation(this.storage[i]);
						} else if (lib.skill[i].zhuanhuanji) {
							num = this.storage[i] ? '阴' : '阳';
						}


						banlist = ['dulie', 'taomie', 'drlt_jieying_mark', 'zongkui_mark'];
						if (num && !banlist.contains(i)) {
							if (!mark.markcount) mark.markcount = decadeUI.element.create('mark-count', mark);
							if (num.toString().indexOf("♦️") != -1)
								num = num.replace(/♦️/g, "<span style='color:red;-webkit-text-stroke: 0.2px white;text-shadow:0 0 3px white;'>♦️</span>");
							if (num.toString().indexOf("♥️") != -1) num = num.replace(/♥️/g, "<span style='color:red;-webkit-text-stroke: 0.2px white;text-shadow:0 0 3px white;'>♥</span>️️");
							if (num.toString().indexOf("♠️️") != -1) num = num.replace(/♠️️/g, "<span style='color:black;-webkit-text-stroke:0.2px white;text-shadow:0 0 3px white;'>♠️</span>️️");
							if (num.toString().indexOf("♣️️") != -1) num = num.replace(/♣️️/g, "<span style='color:black;-webkit-text-stroke:0.2px white;text-shadow:0 0 3px white;'>♣️</span>️️");
							//正则表达式，检测方块红桃改为红色
							mark.markcount.innerHTML = num;//textconten不能显示颜色

						} else if (mark.markcount) {
							mark.markcount.delete();
							delete mark.markcount;
						}
					} else {
						if (mark.markcount) {
							mark.markcount.delete();
							delete mark.markcount;
						}

						if (lib.skill[i].mark == 'auto') {
							this.unmarkSkill(i);
						}
					}
					return this;
				};
				lib.element.player.removeMark = function (i, num, log) {
					if (!num) num = 1;
					if (!this.storage[i]) return;
					if (num > this.storage[i]) num = this.storage[i];
					this.storage[i] -= num;
					if (log !== false) {
						var str = false;
						var info = get.info(i);
						if (info && info.intro && (info.intro.name || info.intro.name2)) str = info.intro.name2 || info.intro.name;
						else str = lib.translate[i];
						if (str) game.log(this, '移去了', get.cnNumber(num), '个', '#g【' + str + '】');
					}
					this.syncStorage(i);
					this[(this.storage[i] || (lib.skill[i] && lib.skill[i].mark)) ? 'markSkill' : 'unmarkSkill'](i);
				};
				lib.element.player.addMark = function (i, num, log) {
					if (!num) num = 1;
					if (this.storage[i] == undefined) this.storage[i] = 0;
					this.storage[i] += num;
					if (log !== false) {
						var str = false;
						var info = get.info(i);
						if (info && info.intro && (info.intro.name || info.intro.name2)) str = info.intro.name2 || info.intro.name;
						else str = lib.translate[i];
						if (str) game.log(this, '获得了', get.cnNumber(num), '个', '#g【' + str + '】');
					}
					this.syncStorage(i);
					this.markSkill(i);
					//
					var next = game.createEvent('addMark');
					next.setContent('addMark');
					next.player = this;
					next.num = num;
					next.markname = i;
				};
				lib.element.content.addMark = function () {
					event.trigger("addMark");
				};
				lib.element.player.countMark = function (i) {
					if (this.storage[i] == undefined) return 0;
					if (this.storage[i] !== undefined) return this.storage[i];
					if (Array.isArray(this.storage[i])) return this.storage[i].length;
					return 0;
				};
				lib.element.player.hasMark = function (i) {
					return this.countMark(i) > 0;
				}



				/*---------------*/


				/*手牌分变化和进度条*/
				lib.element.content.gameDraw = function () {
					"step 0";
					if (_status.brawl && _status.brawl.noGameDraw)
						return event.goto(4);
					var end = player;
					var gainNum = num;
					do {
						if (typeof num == 'function')
							gainNum = num(player);

						if (player.getTopCards)
							player.directgain(player.getTopCards(gainNum));
						else
							player.directgain(get.cards(gainNum));

						player.$draw(gainNum);
						if (player.singleHp === true && get.mode() != 'guozhan' && (lib.config.mode != 'doudizhu' || _status.mode != 'online'))
							player.doubleDraw();

						player._start_cards = player.getCards('h');
						player = player.next;
					} while (player != end);
					event.changeCard = get.config('change_card');
					if (_status.connectMode || (lib.config.mode == 'doudizhu' && _status.mode == 'online') || lib.config.mode != 'identity' && lib.config.mode != 'guozhan' && lib.config.mode != 'doudizhu') {
						event.changeCard = 'disabled';
					}
					"step 1";
					if (event.changeCard != 'disabled' && !_status.auto) {
						event.numk = parseInt(Math.random() * (5001) + 5000);
						event.numt = "7";
						event.nump = "3";
						var score1 = parseInt(Math.random() * 4 + 4);
						var score2 = parseInt(Math.random() * 10);
						event.score = ui.create.div('.nmcardscore', ui.arena);
						event.scorex1 = ui.create.div('.nmscore1', event.score);
						event.scorex1.setBackgroundImage('extension/手杀ui/MH/' + score1 + '.png');
						event.scorex2 = ui.create.div('.nmscore2', event.score);
						event.scorex2.setBackgroundImage('extension/手杀ui/MH/' + score2 + '.png');
						var str = "本场还可更换" + event.numt + "次手牌(免费次数还剩" + event.nump + "次)";
						event.dialog = dui.showHandTip(str);
						event.dialog.strokeText();
						ui.create.confirm('oc');
						event.custom.replace.confirm = function (bool) {
							_status.event.bool = bool;

							game.resume();
						};
					} else {
						event.goto(4);
					}
					"step 2";
					if (event.changeCard == 'once') {
						event.changeCard = 'disabled';
					} else if (event.changeCard == 'twice') {
						event.changeCard = 'once';
					} else if (event.changeCard == 'disabled') {
						event.bool = false;
						return;
					}
					_status.imchoosing = true;
					event.switchToAuto = function () {
						_status.event.bool = false;
						game.resume();
					};
					game.pause();
					"step 3";
					_status.imchoosing = false;
					if (event.bool) {
						if (game.changeCoin) {
							game.changeCoin(-3);
						}
						var hs = game.me.getCards('h');
						game.addVideo('lose', game.me, [get.cardsInfo(hs), [], [], []]);
						for (var i = 0; i < hs.length; i++) {
							hs[i].discard(false);
						}
						game.playAudio('../extension/手杀ui/MH/huan.mp3');
						event.numk--;
						event.numt--;
						event.nump--;
						game.me.directgain(get.cards(hs.length));
						var score1 = parseInt(Math.random() * 4 + 4);
						var score2 = parseInt(Math.random() * 10);
						event.scorex1.setBackgroundImage('extension/手杀ui/MH/' + score1 + '.png');
						event.scorex2.setBackgroundImage('extension/手杀ui/MH/' + score2 + '.png');
						if (event.numt > 0) {
							var str;
							if (event.nump > 0) str = "本场还可更换" + event.numt + "次手牌(免费次数还剩" + event.nump + "次)";
							else {
								str = "本场还可更换" + event.numt + "次手牌(每次消耗一张手气卡，当前还有" + event.numk + "张)";
							}
							event.dialog.remove();
							event.dialog = dui.showHandTip(str);
							event.dialog.strokeText();
							event.goto(2);
						}
						else {
							if (event.dialog) event.dialog.close();
							//-------------//
							if (event.score) event.score.remove();
							//-------------//
							if (ui.confirm) ui.confirm.close();
							game.me._start_cards = game.me.getCards('h');
							event.goto(4);
						}
					} else {
						if (event.dialog) event.dialog.close();

						//------------//
						if (event.score) event.score.remove();

						//-----------//       
						if (ui.confirm) ui.confirm.close();
						game.me._start_cards = game.me.getCards('h');
						event.goto(4);
					}
					"step 4";
					setTimeout(decadeUI.effect.gameStart, 51);
				};
			});


			/*---------------*/

			/*选项条分离*/
			/*分离选项条 修改选项函数*/
			lib.element.content.chooseControl = function () {
				"step 0"
				if (event.controls.length == 0) {
					if (event.sortcard) {
						var sortnum = 2;
						if (event.sorttop) {
							sortnum = 1;
						}
						for (var i = 0; i < event.sortcard.length + sortnum; i++) {
							event.controls.push(get.cnNumber(i, true));
						}
					}
					else if (event.choiceList) {
						for (var i = 0; i < event.choiceList.length; i++) {
							event.controls.push('选项' + get.cnNumber(i + 1, true));
						}
					}
					else {
						event.finish();
						return;
					}
				}
				else if (event.choiceList && event.controls.length == 1 && event.controls[0] == 'cancel2') {
					event.controls.shift();
					for (var i = 0; i < event.choiceList.length; i++) {
						event.controls.push('选项' + get.cnNumber(i + 1, true));
					}
					event.controls.push('cancel2');
				}
				if (event.isMine()) {
					if (event.arrangeSkill) {
						var hidden = player.hiddenSkills.slice(0);
						game.expandSkills(hidden);
						if (hidden.length) {
							for (var i of event.controls) {
								if (_status.prehidden_skills.contains(i) && hidden.contains(i)) {
									event.result = {
										bool: true,
										control: i,
									}
									return;
								}
							}
						}
					}
					else if (event.hsskill && _status.prehidden_skills.contains(event.hsskill) && event.controls.contains('cancel2')) {
						event.result = {
							bool: true,
							control: 'cancel2',
						}
						return;
					}
					if (event.sortcard) {
						var prompt = event.prompt || '选择一个位置';
						if (event.tosort) {
							prompt += '放置' + get.translation(event.tosort);
						}
						event.dialog = ui.create.dialog(prompt, 'hidden');
						if (event.sortcard && event.sortcard.length) {
							event.dialog.addSmall(event.sortcard);
						}
						else {
							event.dialog.buttons = [];
							event.dialog.add(ui.create.div('.buttons'));
						}
						var buttons = event.dialog.content.lastChild;
						var sortnum = 2;
						if (event.sorttop) {
							sortnum = 1;
						}
						for (var i = 0; i < event.dialog.buttons.length + sortnum; i++) {
							var item = ui.create.div('.button.card.pointerdiv.mebg');
							item.style.width = '50px';
							buttons.insertBefore(item, event.dialog.buttons[i]);
							item.innerHTML = '<div style="font-family: xinwei;font-size: 25px;height: 75px;line-height: 25px;top: 8px;left: 10px;width: 30px;">第' + get.cnNumber(i + 1, true) + '张</div>';
							if (i == event.dialog.buttons.length + 1) {
								item.firstChild.innerHTML = '牌堆底';
							}
							item.link = get.cnNumber(i, true);
							item.listen(ui.click.dialogcontrol);
						}

						event.dialog.forcebutton = true;
						event.dialog.classList.add('forcebutton');
						event.dialog.open();
					}
					else if (event.dialogcontrol) {
						event.dialog = ui.create.dialog(event.prompt || '选择一项', 'hidden');
						for (var i = 0; i < event.controls.length; i++) {
							var item = event.dialog.add('<div class="popup text pointerdiv" style="width:calc(100% - 10px);display:inline-block">' + event.controls[i] + '</div>');
							item.firstChild.listen(ui.click.dialogcontrol);
							item.firstChild.link = event.controls[i];
						}
						event.dialog.forcebutton = true;
						event.dialog.classList.add('forcebutton');
						if (event.addDialog) {
							for (var i = 0; i < event.addDialog.length; i++) {
								if (get.itemtype(event.addDialog[i]) == 'cards') {
									event.dialog.addSmall(event.addDialog[i]);
								}
								else {
									event.dialog.add(event.addDialog[i]);
								}
							}
							event.dialog.add(ui.create.div('.placeholder.slim'));
						}
						event.dialog.open();
					}
					else {
						if (event.seperate || lib.config.seperate_control) {
							event.controlbars = [];
							for (var i = 0; i < event.controls.length; i++) {
								event.controlbars.push(ui.create.control([event.controls[i]]));
							}
						}
						else {
							event.controlbar = ui.create.control(event.controls);
						}
						if (event.dialog) {
							if (Array.isArray(event.dialog)) {
								event.dialog = ui.create.dialog.apply(this, event.dialog);
							}
							event.dialog.open();
						}
						else if (event.choiceList) {
							event.dialog = ui.create.dialog(event.prompt || '选择一项', 'hidden');
							event.dialog.forcebutton = true;
							var list = ui.control.childNodes;
							for (var i = 0; i < list.length; i++) {
								list[i].childNodes[0].classList.add('choice');	/*添加类名*/
								//--------背水-----//
								if (list[i].childNodes[0].innerText.indexOf('背水') != -1 && lib.config.extension_手杀ui_yangshi == "on") {
									/*list[i].childNodes[0].setBackgroundImage('extension/无名补丁/image/beishui.png');*/
									list[i].childNodes[0].setBackgroundImage('extension/手杀ui/lbtn/images/uibutton/beishui.png');
									list[i].childNodes[0].innerText = '背水';
								}
								//--------------//
							}

							event.dialog.open();
							for (var i = 0; i < event.choiceList.length; i++) {
								event.dialog.add('<div class="popup text" style="width:calc(100% - 10px);display:inline-block">' +
									(event.displayIndex !== false ? ('选项' + get.cnNumber(i + 1, true) + '：') : '') + event.choiceList[i] + '</div>');
							}
						}
						else if (event.prompt) {
							event.dialog = ui.create.dialog(event.prompt);
							if (event.prompt2) {
								event.dialog.addText(event.prompt2, event.prompt2.length <= 20 || event.centerprompt2);
							}
						}
					}
					game.pause();
					game.countChoose();
					event.choosing = true;
				}
				else if (event.isOnline()) {
					event.send();
				}
				else {
					event.result = 'ai';
				}
				"step 1"
				if (event.result == 'ai') {
					event.result = {};
					if (event.ai) {
						var result = event.ai(event.getParent(), player);
						if (typeof result == 'number') event.result.control = event.controls[result];
						else event.result.control = result;
					}
					else event.result.control = event.controls[event.choice];
				}
				event.result.index = event.controls.indexOf(event.result.control);
				event.choosing = false;
				_status.imchoosing = false;
				if (event.dialog && event.dialog.close) event.dialog.close();
				if (event.controlbar) event.controlbar.close();
				if (event.controlbars) {
					for (var i = 0; i < event.controlbars.length; i++) {
						event.controlbars[i].close();
					}
				}
				event.resume();
			};
			//----------------------------------------------------------------------------------------//
			/*隐藏结算按钮*/
			if (config.JSAN) {
				lib.onover.push(resultbool => {
					if (lib.config['extension_假装无敌_enable']) {
						ui.create.control("隐藏界面", game.buttoncloseUI);
					} else {
						ui.dialogs[0] && ui.dialogs[0].hide();
					}
				});
			}
			//-------------AI进度条-----------//
			if (get.mode() != 'connect') {
				lib.onover.push(function (bool) {
					if (document.getElementById("jindutiaoAI")) {
						document.getElementById("jindutiaoAI").remove()
					}
				});
				lib.skill._jindutiaoO = {
					trigger: {
						player: ['phaseBegin', 'useCardAfter', 'phaseZhunbeiBegin', 'useSkillBefore'],
					},
					filter: function (event, player) {
						if (document.querySelector("#jindutiaoAI") && lib.config.extension_手杀ui_jindutiaoaiUpdata == false) return false;
						return player != game.me && _status.currentPhase == player;
					},
					forced: true,
					charlotte: true,
					content: function () {
						var ab = player.getElementsByClassName("timePhase");
						if (ab[0]) ab[0].parentNode.removeChild(ab[0]);
						game.JindutiaoAIplayer();
						player.appendChild(window.boxContentAI);
					},
					group: ['_jindutiaoO_jieshuA'],
					subSkill: {
						//进度条消失
						jieshuA: {
							trigger: {
								player: ['phaseEnd', 'dieBegin', 'phaseJieshuBegin'],
							},
							filter: function (event, player) {
								return player != game.me && _status.currentPhase == player;
							},
							forced: true,
							charlotte: true,
							content: function () {
								if (window.timerai) {
									clearInterval(window.timerai);
									delete window.timerai;
								}
								if (document.getElementById("jindutiaoAI")) {
									document.getElementById("jindutiaoAI").remove();
								}
								var ab = player.getElementsByClassName("timePhase");
								if (ab[0]) ab[0].parentNode.removeChild(ab[0]);
							},
						},
					},
				}
				//------------AI回合外进度条----------//
				lib.skill._jindutiaoA = {
					trigger: {
						player: ['useCardBegin', 'respondBegin'],
					},
					forced: true,
					charlotte: true,
					filter: function (event, player) {
						if (document.querySelector("#jindutiaoAI") && lib.config.extension_手杀ui_jindutiaoaiUpdata == false) return false;
						return _status.currentPhase != player && player != game.me;
					},
					content: function () {
						var ab = player.getElementsByClassName("timeai");
						if (ab[0]) ab[0].parentNode.removeChild(ab[0]);
						var a = player.getElementsByClassName("timeai");
						game.JindutiaoAIplayer();
						player.appendChild(window.boxContentAI);
					},
					group: ['_jindutiaoA_jieshuB'],
					subSkill: {
						jieshuB: {
							trigger: {
								player: ['useCardEnd', 'respondEnd', 'dieBegin']
							},
							forced: true,
							charlotte: true,
							filter: function (event, player) {
								//var cardname=event.cards[0].name
								return player != game.me && _status.currentPhase != player;
							},
							content: function () {
								if (window.timerai) {
									clearInterval(window.timerai);
									delete window.timerai;
								}
								var ab = player.getElementsByClassName("timeai");
								if (ab[0]) ab[0].parentNode.removeChild(ab[0]);
							},
						},
					},
				}
				//---------游戏开场and响应类----------//
				lib.skill._jindutiaoKS = {
					trigger: {
						global: 'gameStart',
					},
					forced: true,
					priority: -1,
					charlotte: true,
					filter: function (event, player) {
						return true;
					},
					content: function () {
						var boxContent = document.createElement('div')
						var boxTime = document.createElement('div')
						var imgBg = document.createElement('img')
						boxContent.setAttribute('id', 'jindutiaoX')
						boxContent.classList.add("timeai");
						if (lib.config.extension_手杀ui_yangshi == "on") {
							//--------手杀样式-------------//  
							boxContent.style.cssText =
								"display:block;position:absolute;z-index:90;--w: 122px;--h: calc(var(--w) *4/145);width: var(--w);height: var(--h);left:3.5px;bottom:-6.2px;"
							boxTime.data = 125
							boxTime.style.cssText =
								"z-index:92;--w: 33px;--h: calc(var(--w) * 4/120);width: var(--w);height: var(--h);margin:1px;background-color: #dd9900;position: absolute;top: 0px;"
							imgBg.src = lib.assetURL + 'extension/手杀ui/lbtn/images/uibutton/time.png'
							imgBg.style.cssText =
								"position:absolute;z-index:91;--w: 122px;--h: calc(var(--w) * 4/145);width: var(--w);height: var(--h);top: 0;"
							//-------------------------//	
						} else {
							//----------十周年样式--------//		
							boxContent.style.cssText =
								"display:block;position:absolute;z-index:90;--w: 122px;--h: calc(var(--w) *8/162);width: var(--w);height: var(--h);left:1.5px;bottom:-8.2px;"
							boxTime.data = 120
							boxTime.style.cssText =
								"z-index:91;width: 115px;height: 3.3px;margin:1px;background-color: #f2c84b;position: absolute;top: 0px;border-radius: 3px;"
							imgBg.src = lib.assetURL + 'extension/手杀ui/lbtn/images/uibutton/timeX.png'
							imgBg.style.cssText =
								"position:absolute;z-index:90;--w: 122px;--h: calc(var(--w) * 8/162);width: var(--w);height: var(--h);top: 0;"
							//--------------------//	
						}
						boxContent.appendChild(boxTime)
						boxContent.appendChild(imgBg)
						if (player != game.me)
							player.appendChild(boxContent);

						window.timerx = setInterval(() => {
							boxTime.data--
							boxTime.style.width = boxTime.data + 'px'
							if (boxTime.data == 0) {
								clearInterval(window.timerx);
								delete window.timerx;
								boxContent.remove()
							}
						}, 150); //进度条时间
					},
					group: ['_jindutiaoKS_close'],
					subSkill: {
						close: {
							trigger: {
								global: 'phaseBefore',
							},
							filter: function (event, player) {
								event.respondx = 0;
								for (var i = 0; i < game.players.length; i++) {
									var ab = game.players[i].getElementsByClassName("timeai");
									if (ab[0]) event.respondx++;
								}
								if (game.phaseNumber == 0) return event.respondx > 0;
								return false;
							},
							forced: true,
							priority: -1,
							charlotte: true,
							content: function () {
								for (var i = 0; i < game.players.length; i++) {
									var ab = game.players[i].getElementsByClassName("timeai");
									if (ab[0]) ab[0].parentNode.removeChild(ab[0]);
								}
							},
						},
					},
				};

				//-------多目标-------//
				lib.skill._jindutiaoMB = {
					trigger: {
						player: 'useCardToPlayered',
					},
					forced: true,
					priority: -10,
					charlotte: true,
					filter: function (event, player) {
						return event.card && event.targets && event.targets.length > 1;
					},
					content: function () {
						var boxContent = document.createElement('div')
						var boxTime = document.createElement('div')
						var imgBg = document.createElement('img')
						boxContent.classList.add("timeRespond");
						if (lib.config.extension_手杀ui_yangshi == "on") {
							//--------手杀样式-------------//  
							boxContent.style.cssText =
								"display:block;position:absolute;z-index:90;--w: 122px;--h: calc(var(--w) *4/145);width: var(--w);height: var(--h);left:3.5px;bottom:-6.2px;"
							boxTime.data = 125
							boxTime.style.cssText =
								"z-index:92;--w: 33px;--h: calc(var(--w) * 4/120);width: var(--w);height: var(--h);margin:1px;background-color: #dd9900;position: absolute;top: 0px;"
							imgBg.src = lib.assetURL + 'extension/手杀ui/lbtn/images/uibutton/time.png'
							imgBg.style.cssText =
								"position:absolute;z-index:91;--w: 122px;--h: calc(var(--w) * 4/145);width: var(--w);height: var(--h);top: 0;"
							//-------------------------//	
						} else {
							//----------十周年样式--------//		
							boxContent.style.cssText =
								"display:block;position:absolute;z-index:90;--w: 122px;--h: calc(var(--w) *8/162);width: var(--w);height: var(--h);left:1.5px;bottom:-8.2px;"
							boxTime.data = 120
							boxTime.style.cssText =
								"z-index:91;width: 115px;height: 3.3px;margin:1px;background-color: #f2c84b;position: absolute;top: 0px;border-radius: 3px;"
							imgBg.src = lib.assetURL + 'extension/手杀ui/lbtn/images/uibutton/timeX.png'
							imgBg.style.cssText =
								"position:absolute;z-index:90;--w: 122px;--h: calc(var(--w) * 8/162);width: var(--w);height: var(--h);top: 0;"
							//--------------------//	
						}
						boxContent.appendChild(boxTime)
						boxContent.appendChild(imgBg)
						if (trigger.target != game.me) {
							var ab = trigger.target.getElementsByClassName("timePhase");
							if (!ab[0]) trigger.target.appendChild(boxContent);
						}
						window.timerix = setInterval(() => {
							boxTime.data--
							boxTime.style.width = boxTime.data + 'px'
							if (boxTime.data == 0) {
								clearInterval(window.timerix);
								delete window.timerix;
								boxContent.remove()
							}
						}, 150); //进度条时间
					},
					group: ['_jindutiaoMB_close'],
					subSkill: {
						close: {
							trigger: {
								global: ['phaseEnd', 'useCardAfter'],
							},
							filter: function (event, player) {
								event.respondix = 0;
								for (var i = 0; i < game.players.length; i++) {
									var ab = game.players[i].getElementsByClassName("timeRespond");
									if (ab[0]) event.respondix++;
								}
								return event.respondix > 0;
							},
							forced: true,
							priority: -1,
							charlotte: true,
							content: function () {
								for (var i = 0; i < game.players.length; i++) {
									var ab = game.players[i].getElementsByClassName("timeRespond");
									if (ab[0]) ab[0].parentNode.removeChild(ab[0]);
								}
							},
						},
					},
				};

				//--------------------//
			}
			//------------------------------------------------------------------------------------------//	

			//----文本翻译---//
			lib.translate.muniu = '木牛';


			//-------出牌中提示(手杀/十周年)---------//

			lib.skill._chupaiA = {
				trigger: {
					player: 'phaseUseBegin'
				},
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					return player != game.me;
				},
				content: function () {
					var a = player.getElementsByClassName("playertip")
					if (a.length <= 0) {
						var tipAB = document.createElement("img");
						if (lib.config.extension_手杀ui_yangshi == "on") {
							tipAB.src = lib.assetURL + 'extension/手杀ui/lbtn/images/shoushatip/tip.png';
							tipAB.classList.add("playertip")
							tipAB.style.cssText = "display:block;position:absolute;z-index:91;--w: 133px;--h: calc(var(--w) * 50/431);width: var(--w);height: var(--h);bottom:-22px;";
						} else {
							tipAB.src = lib.assetURL + 'extension/手杀ui/lbtn/images/shoushatip/phasetip.png';
							tipAB.classList.add("playertip")
							tipAB.style.cssText = "display:block;position:absolute;z-index:92;--w: 129px;--h: calc(var(--w) * 50/431);width: var(--w);height: var(--h);bottom:-9.2px;transform:scale(1.2);";
						}
						player.appendChild(tipAB)
					}
				}
			}

			lib.skill._chupaiB = {
				trigger: {
					player: ['phaseUseEnd', 'dieBegin'],
				},
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					var b = event.player.getElementsByClassName("playertip")
					return b.length > 0 && player != game.me;
				},
				content: function () {
					var b = trigger.player.getElementsByClassName("playertip")
					b[0].parentNode.removeChild(b[0])

				}
			}


			//----弃牌提示-----//
			lib.skill._chupaiC = {
				trigger: {
					player: 'phaseDiscardBegin'
				},
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					return player != game.me;
				},
				content: function () {
					var a = player.getElementsByClassName("playertipQP")
					if (a.length <= 0) {



						var tipCD = document.createElement("img");

						if (lib.config.extension_手杀ui_yangshi == "on") {
							tipCD.src = lib.assetURL + 'extension/手杀ui/lbtn/images/shoushatip/tipQP.png';
							tipCD.classList.add("playertipQP")
							tipCD.style.cssText = "display:block;position:absolute;z-index:91;--w: 133px;--h: calc(var(--w) * 50/431);width: var(--w);height: var(--h);bottom:-22px;";
						} else {
							tipCD.src = lib.assetURL + 'extension/手杀ui/lbtn/images/shoushatip/discardtip.png';
							tipCD.classList.add("playertipQP")
							tipCD.style.cssText = "display:block;position:absolute;z-index:92;--w: 129px;--h: calc(var(--w) * 50/431);width: var(--w);height: var(--h);bottom:-9.2px;transform:scale(1.2);";


						}

						player.appendChild(tipCD)



					}
				}
			}

			lib.skill._chupaiD = {
				trigger: {
					player: ['phaseDiscardEnd', 'dieBegin'],
				},
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					var c = event.player.getElementsByClassName("playertipQP")
					return c.length > 0 && player != game.me;
				},
				content: function () {
					var c = trigger.player.getElementsByClassName("playertipQP")
					c[0].parentNode.removeChild(c[0])

				}
			}





			//-----------------//

			//-----闪思考----//
			lib.skill._chupaiE = {
				trigger: {
					player: ['useCardBegin', 'respondBegin']
				},
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					// if(!player.countCards('h','shan')) return false;
					return event.card.name == 'shan' && _status.currentPhase != player && player != game.me && lib.config.extension_手杀ui_yangshi == "on";
				},
				content: function () {
					var d = player.getElementsByClassName("playertipshan")
					if (d.length <= 0) {



						var tipEF = document.createElement("img");
						tipEF.src = lib.assetURL + 'extension/手杀ui/lbtn/images/shoushatip/tipshan.png';
						tipEF.classList.add("playertipshan")
						tipEF.style.cssText = "display:block;position:absolute;z-index:91;--w: 133px;--h: calc(var(--w) * 50/431);width: var(--w);height: var(--h);bottom:-22px;";

						player.appendChild(tipEF)



					}
				}
			}

			lib.skill._chupaiF = {
				trigger: {
					player: ['useCardEnd', 'respondEnd', 'dieBegin', 'phaseBegin', 'phaseEnd']
				},
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					var e = event.player.getElementsByClassName("playertipshan")
					return e.length > 0 && player != game.me && _status.currentPhase != player;
				},
				content: function () {
					var e = trigger.player.getElementsByClassName("playertipshan")
					e[0].parentNode.removeChild(e[0])

				}
			}


			//--------------//

			//-----杀思考----//
			lib.skill._chupaiG = {
				trigger: {
					player: ['useCardBegin', 'respondBegin']
				},
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					// if(!player.countCards('h','sha')) return false;
					return event.card.name == 'sha' && _status.currentPhase != player && player != game.me && lib.config.extension_手杀ui_yangshi == "on";
				},
				content: function () {
					var e = player.getElementsByClassName("playertipsha")
					if (e.length <= 0) {



						var tipGH = document.createElement("img");
						tipGH.src = lib.assetURL + 'extension/手杀ui/lbtn/images/shoushatip/tipsha.png';
						tipGH.classList.add("playertipsha")
						tipGH.style.cssText = "display:block;position:absolute;z-index:91;--w: 133px;--h: calc(var(--w) * 50/431);width: var(--w);height: var(--h);bottom:-22px;";

						player.appendChild(tipGH)



					}
				}
			}

			lib.skill._chupaiH = {
				trigger: {
					player: ['useCardEnd', 'respondEnd', 'dieBegin', 'phaseBegin', 'phaseEnd']
				},
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					var f = event.player.getElementsByClassName("playertipsha")
					return f.length > 0 && player != game.me && _status.currentPhase != player;
				},
				content: function () {
					var f = trigger.player.getElementsByClassName("playertipsha")
					f[0].parentNode.removeChild(f[0])

				}
			}


			//--------------//

			//-----桃思考----//
			lib.skill._chupaiM = {
				trigger: {
					player: ['useCardBegin', 'respondBegin']
				},
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					// if(!player.countCards('h','sha')) return false;
					return event.card.name == 'tao' && _status.currentPhase != player && player != game.me && lib.config.extension_手杀ui_yangshi == "on";
				},
				content: function () {
					var k = player.getElementsByClassName("playertiptao")
					if (k.length <= 0) {



						var tipMN = document.createElement("img");
						tipMN.src = lib.assetURL + 'extension/手杀ui/lbtn/images/shoushatip/tiptao.png';
						tipMN.classList.add("playertiptao")
						tipMN.style.cssText = "display:block;position:absolute;z-index:91;--w: 133px;--h: calc(var(--w) * 50/431);width: var(--w);height: var(--h);bottom:-22px;";

						player.appendChild(tipMN)



					}
				}
			}

			lib.skill._chupaiN = {
				trigger: {
					player: ['useCardEnd', 'respondEnd', 'dieBegin', 'phaseBegin', 'phaseEnd']
				},
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					var l = event.player.getElementsByClassName("playertiptao")
					return l.length > 0 && player != game.me && _status.currentPhase != player;
				},
				content: function () {
					var l = trigger.player.getElementsByClassName("playertiptao")
					l[0].parentNode.removeChild(l[0])

				}
			}


			//--------------//


			//-----酒思考----//
			lib.skill._chupaiO = {
				trigger: {
					player: ['useCardBegin', 'respondBegin']
				},
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					// if(!player.countCards('h','sha')) return false;
					return event.card.name == 'jiu' && _status.currentPhase != player && player != game.me && lib.config.extension_手杀ui_yangshi == "on";
				},
				content: function () {
					var n = player.getElementsByClassName("playertipjiu")
					if (n.length <= 0) {



						var tipOP = document.createElement("img");
						tipOP.src = lib.assetURL + 'extension/手杀ui/lbtn/images/shoushatip/tipjiu.png';
						tipOP.classList.add("playertipjiu")
						tipOP.style.cssText = "display:block;position:absolute;z-index:91;--w: 133px;--h: calc(var(--w) * 50/431);width: var(--w);height: var(--h);bottom:-22px;";

						player.appendChild(tipOP)



					}
				}
			}

			lib.skill._chupaiP = {
				trigger: {
					player: ['useCardEnd', 'respondEnd', 'dieBegin', 'phaseBegin', 'phaseEnd']
				},
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					var m = event.player.getElementsByClassName("playertipjiu")
					return m.length > 0 && player != game.me && _status.currentPhase != player;
				},
				content: function () {
					var m = trigger.player.getElementsByClassName("playertipjiu")
					m[0].parentNode.removeChild(m[0])

				}
			}


			//--------------//

			//----无懈思考----//
			lib.skill._chupaiI = {
				trigger: {
					player: ['useCardBegin', 'respondBegin', 'phaseJudge']
				},
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					if (event.card.storage && event.card.storage.nowuxie) return false;
					var card = event.card;
					if (event.name == 'phaseJudge' && card.viewAs) card = {
						name: card.viewAs
					};
					var info = get.info(card);
					if (info.wuxieable === false) return false;

					return event.card.name == 'wuxie' && _status.currentPhase != player && player != game.me && lib.config.extension_手杀ui_yangshi == "on";
				},
				content: function () {
					var g = player.getElementsByClassName("playertipwuxie")
					if (g.length <= 0) {



						var tipIJ = document.createElement("img");
						tipIJ.src = lib.assetURL + 'extension/手杀ui/lbtn/images/shoushatip/tipwuxie.png';
						tipIJ.classList.add("playertipwuxie")
						tipIJ.style.cssText = "display:block;position:absolute;z-index:91;--w: 133px;--h: calc(var(--w) * 50/431);width: var(--w);height: var(--h);bottom:-22px;";

						player.appendChild(tipIJ)



					}
				}
			}

			lib.skill._chupaiJ = {
				trigger: {
					player: ['useCardEnd', 'respondEnd', 'dieBegin', 'phaseEnd']
				},
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					var h = event.player.getElementsByClassName("playertipwuxie")
					return h.length > 0 && player != game.me && _status.currentPhase != player;
				},
				content: function () {
					var h = trigger.player.getElementsByClassName("playertipwuxie")
					h[0].parentNode.removeChild(h[0])

				}
			}

			//------判断，摸牌提示---------//

			lib.skill._chupaiK = {
				trigger: {
					player: ['phaseJudgeBegin', 'phaseDrawBegin']
				},
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					return player != game.me;
				},
				content: function () {
					var l = player.getElementsByClassName("playertipplay")
					if (l.length <= 0) {



						var tipKL = document.createElement("img");
						if (lib.config.extension_手杀ui_yangshi == "on") {
							tipKL.src = lib.assetURL + 'extension/手杀ui/lbtn/images/shoushatip/tipplay.png';
							tipKL.classList.add("playertipplay")
							tipKL.style.cssText = "display:block;position:absolute;z-index:91;--w: 133px;--h: calc(var(--w) * 50/431);width: var(--w);height: var(--h);bottom:-22px;";
						} else {
							tipKL.src = lib.assetURL + 'extension/手杀ui/lbtn/images/shoushatip/thinktip.png';
							tipKL.classList.add("playertipplay")
							tipKL.style.cssText = "display:block;position:absolute;z-index:92;--w: 129px;--h: calc(var(--w) * 50/431);width: var(--w);height: var(--h);bottom:-9.2px;transform:scale(1.2);";


						}
						player.appendChild(tipKL)



					}
				}
			}

			lib.skill._chupaiL = {
				trigger: {
					player: ['phaseJudgeEnd', 'phaseDrawEnd', 'phaseEnd', 'dieBegin'],
				},
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					var m = event.player.getElementsByClassName("playertipplay")
					return m.length > 0 && player != game.me;
				},
				content: function () {
					var m = trigger.player.getElementsByClassName("playertipplay")
					m[0].parentNode.removeChild(m[0])

				}
			}


			//-----------------//

			//-----思考中十周年----//
			lib.skill._chupaiMX = {
				trigger: {
					player: ['useCardBegin', 'respondBegin']
				},
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					return _status.currentPhase != player && player != game.me && lib.config.extension_手杀ui_yangshi == "off";
				},
				content: function () {
					var d = player.getElementsByClassName("playertipthink")
					if (d.length <= 0) {

						var tipMNX = document.createElement("img");
						tipMNX.src = lib.assetURL + 'extension/手杀ui/lbtn/images/shoushatip/thinktip.png';
						tipMNX.classList.add("playertipthink")
						tipMNX.style.cssText = "display:block;position:absolute;z-index:92;--w: 129px;--h: calc(var(--w) * 50/431);width: var(--w);height: var(--h);bottom:-9.2px;transform:scale(1.2);";

						player.appendChild(tipMNX)



					}
				}
			}

			lib.skill._chupaiNX = {
				trigger: {
					player: ['useCardEnd', 'respondEnd', 'dieBegin']
				},
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					var e = event.player.getElementsByClassName("playertipthink")
					return e.length > 0 && player != game.me && _status.currentPhase != player;
				},
				content: function () {
					var e = trigger.player.getElementsByClassName("playertipthink")
					e[0].parentNode.removeChild(e[0])

				}
			}


			//--------------//

			//---------------------------//




			//狗托播报
			if (config.GTBB) {
				var txcsanm = {}
				var gddf = function () {

					var player = "玩家";
					var my = lib.config.connect_nickname;
					var suiji = ["氪金抽66", "卡宝真可爱", "蒸蒸日上", "√卡视我如父", "麒麟弓免疫枸杞", "坏可宣（老坏批）", "六千大败而归",
						"开局酒古锭", "遇事不决刷个乐", "见面两刀喜相逢", "改名出66", "时代的六万五", "韩旭", "司马长衫", "ogx",
						"狗卡不如无名杀", "王八万", "一拳兀突骨", "开局送神将", "丈八二桃", "装甲车车", "等我喝口酒", "Samuri", "马", "kimo鸡～木木",
						"Log-Frunki", "aoe银钱豹", "没有丈八就托管", "无中yyds", "给咸鱼鸽鸽打call", "小零二哟～", "长歌最帅了",
						"大猫有侠者之风", "布灵布灵❤️", "我爱～摸鱼🐠～", "小寻寻真棒", "呲牙哥超爱笑", "是俺杀哒", "阿七阿七",
						"祖安·灰晖是龙王", "吃颗桃桃好遗计", "好可宣✓良民", "藏海表锅好", "金乎？木乎？水乎！！", "无法也无天", "西风不识相",
						"神秘喵酱", "星城在干嘛？", "子鱼今天摸鱼了吗？", "阳光苞里有阳光", "诗笺的小裙裙", "轮回中的消逝", "乱踢jb的云野",
						"小一是不是...是不是...", "美羊羊爱瑟瑟", "化梦的星辰", "杰哥带你登dua郎", "世中君子人", "叹年华未央", "短咕咕", "若石", "很可爱的小白", "沉迷踢jb的云野", "厉不厉害你坤哥", "东方太白", "恶心的死宅", "风回太初", "隔壁的戴天", "林柒柒", "洛神", "ikun", "蒙娜丽喵", "只因无中", "女宝", "远道", "翘课吗？", "失败的man", "晚舟", "叙利亚野🐒", "幸运女神在微笑", "知天意，逆天寒", "明月栖木", "路卡利欧", "兔兔", "香蕉", "douyun", "启明星阿枫", "雨夜寒稠",
						"洛天依？！", "黄老板是好人～", "来点瑟瑟文和", "鲨鱼配辣椒", "萝卜～好萝卜", "废城君", "E佬细节鬼才",
						"感到棘手要怀念谁？", "半价小薯片", "JK欧拉欧拉欧拉", "新年快乐", "乔姐带你飞", "12345678？", "缘之空", "小小恐龙", "教主：杀我！", "才思泉涌的司马", "我是好人", "喜怒无常的大宝", "黄赌毒", "阴间杀～秋", "敢于劈瓜的关羽", "暮暮子", "潜龙在渊"
					].randomGet();
					var name = [suiji, my].randomGet();
					var v = ["通过", "使用", "开启"].randomGet();
					var story = ["周年", "五一", "踏青", "牛年", "开黑", "冬至", "春分", "鼠年", "盛典", "魏魂", "群魂", "蜀魂",
						"吴魂", "猪年", "圣诞", "国庆", "狗年", "金秋", "奇珍", "元旦", "小雪", "冬日", "招募", "梦之回廊",
						"虎年", "新春", "七夕", "大雪", "端午", "武将", "中秋", "庆典"
					].randomGet();
					var box = ["盒子", "宝盒", "礼包", "福袋", "礼盒", "庆典", "盛典"].randomGet();
					var a = "获得了";
					//皮肤
					var pifu = ["界钟会×1", "王朗×1", "马钧×1", "司马昭×1", "司马师×1", "王平×1", "诸葛瞻×1", "张星彩×1",
						"董允×1", "关索×1", "骆统×1", "周处*1", "界步练师*1", "界朱然*1", "贺齐*1", "苏飞*1", "公孙康×1",
						"杨彪×1", "刘璋×1", "张仲景×1", "司马徽×1", "曹婴×1", "徐荣×1", "史诗宝珠*66", "史诗宝珠*33",
						"麒麟生角·魏延*1", "史诗宝珠*10", "刘焉×1", "孙寒华×1", "戏志才×1", "界曹真×1", "曹婴×1", "王粲×1",
						"界于禁×1", "郝昭×1", "界黄忠×1", "鲍三娘×1", "周群×1", "赵襄×1", "马云禄×1", "孙皓×1", "留赞×1",
						"吴景×1", "界徐盛×1", "许攸×1", "杜预×1", "界李儒×1", "张让×1", "麹义×1", "司马徽×1", "界左慈×1",
						"鲍三娘×1", "界徐盛×1", "南华老仙×1", "韩旭の大饼*100", "神郭嘉×1", "吴景×1", "周处×1", "杜预×1",
						"司马师×1", "羊微瑜×1", "神曹操×1"
					].randomGet();

					//-------带品质-----//			
					/*			//武将
							var wujiang = ["限定*谋定天下·陆逊*1（动+静）", "限定*谋定天下·周瑜*1（动+静）", "限定*谋定天下·卧龙诸葛*1（动+静）", "限定*谋定天下·司马懿*1（动+静）", "限定*谋定天下·郭嘉*1（动+静）", "限定*谋定天下·贾诩*1（动+静）", "限定*谋定天下·荀彧*1（动+静）", "传说*龙困于渊·刘协（动+静）*1", "限定*花好月圆·貂蝉*1（动+静）", "限定*花好月圆·甄姬*1（动+静）","限定*花好月圆·马云騄*1（动+静）", "限定*花好月圆·黄月英*1（动+静）", "限定*花好月圆·sp蔡文姬*1（动+静）", "限定*花好月圆·sp孙尚香*1（动+静）", "限定*花好月圆·大乔*1（动+静）", "限定*花好月圆·小乔*1（动+静）",  "传说*星花柔矛·张星彩*1（动+静）",
								"史诗*呼啸生风·许褚*1（动+静）", "立冬牛年*牛年立冬·司马懿*1（动+静）", "立冬牛年*牛年立冬·张春华*1（动+静）", "史诗*鹰视狼顾·司马懿*1（动+静）", "史诗*洛水神韵·甄姬*1（动+静）",
								"史诗*登锋陷阵·张辽*1（动+静）", "史诗*十胜十败·郭嘉*1（动+静）", "端午史诗*猪年端午·曹丕*1（动+静）", "清明牛年*牛年清明·甄姬*1（动+静）", "清明牛年*牛年清明·曹丕*1（动+静）", "史诗*背水一战·张郃*1（动+静）",
								"史诗*神兵天降·邓艾*1（动+静）", "史诗*独来固志·王基*1（动+静）", "圣诞史诗*猪年圣诞·刘备*1（动+静）", "圣诞史诗*猪年圣诞·sp孙尚香*1（动+静）", "史诗*啸风从龙·关羽*1（动+静）",
								"史诗*西凉雄狮·马超*1（动+静）", "史诗*鏖战赤壁·黄盖*1（动+静）", "史诗*星流霆击·孙尚香*1（动+静）", "圣诞史诗*猪年圣诞·陆逊*1（动+静）",
								"七夕鼠年*鼠年七夕·貂蝉*1（动+静）", "七夕鼠年*鼠年七夕·吕布*1（动+静）", "史诗*迅雷风烈·张角*1（动+静）", "史诗*一往无前·袁绍*1（动+静）", "史诗*盛气凌人·许攸*1（动+静）",
								"清明史诗*玄天通冥·神曹操*1（动+静）", "史诗*魂牵梦绕·灵雎*1（动+静）", "史诗*超脱于世·庞德公*1（动+静）", "清明史诗*孟章诛邪·神诸葛亮*1（动+静）", "清明史诗*监兵噬魅·神吕布*1（动+静）", "清明史诗*陵光引灵·神周瑜*1（动+静）",
								"史诗*雄踞益州·刘焉*1（动+静）", "春节史诗*鼠年春节·兀突骨*1（动+静）", "端午牛年*牛年端午·孙鲁班*1（动+静）", "史诗*灵魂歌王·留赞*1（动+静）",
								"史诗*花容月貌·孙茹*1（动+静）", "春节猪年*猪年春节·孙鲁育*1（动+静）", "史诗*长沙桓王·孙笨*1（动+静）", "史诗*如花似朵·小乔*1（动+静）",
								"史诗*嫣然一笑·鲍三娘*1", "史诗*锐不可当·张翼*1（动+静）", "中秋史诗*鼠年中秋·关索*1（动+静）", "史诗*花海舞枪·马云禄*1（动+静）",
								"史诗*木牛流马·黄月英*1（动+静）", "史诗*锋芒毕露·曹婴*1（动+静）", "史诗*长坂败备·曹纯*1（动+静）", "史诗*龙袭星落·王朗*1（动+静）",
								"史诗*举棋若定·戏志才*1（动+静）", "史诗*泰山捧日·程昱*1（动+静）", "冬至鼠年*鼠年冬至·王元姬*1(动+静)",
								"七夕史诗*牛年七夕·步练师*1（动+静）", "史诗*万人辟易·神甘宁*1", "史诗*巾帼花舞·马云禄*1（动+静）", "银币*66666", "将魂*66666",
								"史诗*琪花瑶草·徐氏*1（动+静）", "史诗*肝胆相照·星甘宁*1（动+静）",
								"长衫の天牢令*100"
							].randomGet();
					*/
					//--------------//			


					//武将
					var wujiang = ["谋定天下·陆逊*1（动+静）", "龙困于渊·刘协（动+静）*1", "星花柔矛·张星彩*1（动+静）",
						"呼啸生风·许褚*1（动+静）", "牛年立冬·司马懿*1（动+静）", "鹰视狼顾·司马懿*1（动+静）", "洛水神韵·甄姬*1（动+静）",
						"登锋陷阵·张辽*1（动+静）", "十胜十败·郭嘉*1（动+静）", "猪年端午·曹丕*1（动+静）", "背水一战·张郃*1（动+静）",
						"神兵天降·邓艾*1（动+静）", "独来固志·王基*1（动+静）", "猪年圣诞·刘备*1（动+静）", "哮风从龙·关羽*1（动+静）",
						"西凉雄狮·马超*1（动+静）", "鏖战赤壁·黄盖*1（动+静）", "星流霆击·孙尚香*1（动+静）", "猪年圣诞·陆逊*1（动+静）",
						"鼠年七夕·貂蝉*1（动+静）", "迅雷风烈·张角*1（动+静）", "一往无前·袁绍*1（动+静）", "盛气凌人·许攸*1（动+静）",
						"玄冥天通·神曹操*1（动+静）", "魂牵梦绕·灵雎*1（动+静）", "肝胆相照·⭐甘宁*1（动+静）", "超脱于世·庞德公*1（动+静）",
						"雄踞益州·刘焉*1（动+静）", "鼠年春节·兀突骨*1（动+静）", "牛年端午·孙鲁班*1（动+静）", "灵魂歌王·留赞*1（动+静）",
						"花容月貌·孙茹*1（动+静）", "猪年春节·孙鲁育*1（动+静）", "长沙桓王·孙笨*1（动+静）", "如花似朵·小乔*1（动+静）",
						"嫣然一笑·鲍三娘*1", "锐不可当·张翼*1（动+静）", "鼠年中秋·关索*1（动+静）", "花海舞枪·马云禄*1（动+静）",
						"木牛流马·黄月英*1（动+静）", "锋芒毕露·曹婴*1（动+静）", "长坂败备·曹纯*1（动+静）", "龙袭星落·王朗*1（动+静）",
						"举棋若定·戏志才*1（动+静）", "泰山捧日·程昱*1（动+静）", "冬日·王元姬（动态+静态）*1",
						"牛年七夕·步练师动态包*1（动+静）", "神甘宁×1", "巾帼花舞·马云禄*1（动+静）", "银币*66666", "将魂*66666",
						"琪花瑶草·徐氏*1（动+静）", "肝胆相照·星甘宁*1（动+静）", "星流霆击·孙尚香（动+静）*1", "锋芒毕露·曹婴*1（动+静）", "长衫の天牢令*100"
					].randomGet();
					//更改对应播报颜色
					var gold = ['<font color="#56e4fa">' + pifu + '</font>', '<font color="#f3c20f">' +
						wujiang + '</font>'
					].randomGet();
					var d = [",大家快恭喜TA吧！", ",大家快恭喜TA吧。无名杀是一款非盈利游戏(づ ●─● )づ", ",祝你新的一年天天开心，万事如意"].randomGet();
					/*定义部分属性--默认手杀*/
					var fontset = 'FZLBJW';/*字体*/
					var colorA = '#efe8dc';/*颜色a*/
					var colorB = '#22c622';/*颜色b*/
					if (lib.config.extension_手杀ui_GTBBFont == "off") {
						fontset = 'yuanli';
						colorA = '#86CC5B';
						colorB = '#B3E1EC';
					}
					/*-------*/
					//----------//   
					txcsanm.div.show();
					setTimeout(function () {
						txcsanm.div.hide();
					}, 15500);

					txcsanm.div2.innerHTML = '<marquee direction="left" behavior="scroll" scrollamount=9.8" loop="1" width="100%" height="50" align="absmiddle" >' + '<font  face=' + fontset + '>' + player + '<font color=' + colorA + '>' + '<b>' + name + '</b>' + '</font>' + v + '<font color=' + colorB + '>' + '<b>' + story + box +
						'</b>' + '</font>' + a + '<b>' + gold + '</b>' + d + '</font>' + '</marquee>';

				};

				txcsanm.div = ui.create.div('');
				txcsanm.div2 = ui.create.div('', txcsanm.div);
				/*----------手杀样式-------*/
				if (config.GTBBYangshi == "on") {
					txcsanm.div.style.cssText = "pointer-events:none;width:100%;height:25px;font-size:23px;z-index:6;";
					txcsanm.div2.style.cssText = "pointer-events:none;background:rgba(0,0,0,0.5);width:100%;height:27px;";
					/*------------------------*/
				} else {
					/*-------十周年样式-------*/
					txcsanm.div.style.cssText = "pointer-events:none;width:56%;height:35px;font-size:18px;z-index:20;background-size:100% 100%;background-repeat:no-repeat;left:50%;top:15%;transform:translateX(-50%);";
					txcsanm.div.style['background-image'] = 'url(' + lib.assetURL + 'extension/手杀ui/lbtn/images/uibutton/goutuo.png';
					txcsanm.div2.style.cssText = "pointer-events:none;width:85.5%;height:35px;left:8%;line-height:35px;";
					/*------------------------*/
				}

				var id = setInterval(function () {
					if (!txcsanm.div.parentNode && ui.window) {
						ui.window.appendChild(txcsanm.div);
						clearInterval(id);
						gddf();
						setInterval(gddf, parseFloat(lib.config['extension_手杀ui_GTBBTime']));
					}
				}, 5000);

			}

			//阶段提示
			if (config.JDTS) {
				//---------------------------------//
				//等待响应 
				lib.skill._jd_ddxyA = {
					trigger: {
						player: ['chooseToRespondBegin'],
					},
					direct: true,
					filter: function (event, player) {
						return player == game.me && _status.auto == false;
					},
					content: function () {
						if (lib.config.extension_手杀ui_JDTSYangshi == "1") {
							if (get.mode() == 'taixuhuanjing' || lib.config['extension_EngEX_SSServant']) {
								game.as_showImage('extension/手杀ui/lbtn/images/JDTS/ddxy.jpg', [10, 58, 7, 6], 10)
							} else {
								game.as_showImage('extension/手杀ui/lbtn/images/JDTS/ddxy.jpg', [3, 58, 7, 6], 10)
							}
						} else {
							game.as_showImage('extension/手杀ui/lbtn/images/JDTS/ddxy.png', [18, 65, 8, 4.4], 10)
						}
					},
				};

				//成为杀的目标开始
				lib.skill._jd_ddxyB = {
					trigger: {
						target: 'shaBegin',
					},
					filter: function (event, player) {
						return game.me == event.target;
					},
					charlotte: true,
					forced: true,
					content: function () {
						if (lib.config.extension_手杀ui_JDTSYangshi == "1") {
							if (get.mode() == 'taixuhuanjing' || lib.config['extension_EngEX_SSServant']) {
								game.as_showImage('extension/手杀ui/lbtn/images/JDTS/ddxy.jpg', [10, 58, 7, 6], true)
							} else {
								game.as_showImage('extension/手杀ui/lbtn/images/JDTS/ddxy.jpg', [3, 58, 7, 6], true)
							}
						} else {
							game.as_showImage('extension/手杀ui/lbtn/images/JDTS/ddxy.png', [18, 65, 8, 4.4], true)
						}
					},
				};
				lib.skill._jd_ddxyC = {
					trigger: {
						player: ['useCardToBegin', 'phaseJudge']
					},
					filter: function (event, player) {
						if (event.card.storage && event.card.storage.nowuxie) return false;
						var card = event.card;
						if (event.name == 'phaseJudge' && card.viewAs) card = {
							name: card.viewAs
						};
						var info = get.info(card);
						if (info.wuxieable === false) return false;
						if (event.name != 'phaseJudge') {
							if (event.getParent().nowuxie) return false;
							if (!event.target) {
								if (info.wuxieable) return true;
								return false;
							}
							if (event.player.hasSkillTag('playernowuxie', false, event.card))
								return false;
							if (get.type(event.card) != 'trick' && !info.wuxieable) return false;
						}
						return player == game.me && _status.auto == false;
					},
					charlotte: true,
					forced: true,
					content: function () {
						if (lib.config.extension_手杀ui_JDTSYangshi == "1") {
							if (get.mode() == 'taixuhuanjing' || lib.config['extension_EngEX_SSServant']) {
								game.as_showImage('extension/手杀ui/lbtn/images/JDTS/ddxy.jpg', [10, 58, 7, 6], true)
							} else {
								game.as_showImage('extension/手杀ui/lbtn/images/JDTS/ddxy.jpg', [3, 58, 7, 6], true)
							}
						} else {
							game.as_showImage('extension/手杀ui/lbtn/images/JDTS/ddxy.png', [18, 65, 8, 4.4], true)
						}
					},
				};

				//使用或打出闪后
				lib.skill._jd_shiyongshanD = {
					forced: true,
					charlotte: true,
					trigger: {
						player: ["useCard", "respondAfter"],
					},
					filter: function (event, player) {
						return player == game.me && event.card.name == 'shan';
					},
					content: function () {
						game.as_removeImage();
						if (_status.as_showImage_phase) {
							if (lib.config.extension_手杀ui_JDTSYangshi == "1") {
								if (get.mode() == 'taixuhuanjing' || lib.config['extension_EngEX_SSServant']) {
									game.as_showImage('extension/手杀ui/lbtn/images/JDTS/' + _status.as_showImage_phase + '.jpg', [10, 58, 7, 6], true);
								} else {
									game.as_showImage('extension/手杀ui/lbtn/images/JDTS/' + _status.as_showImage_phase + '.jpg', [3, 58, 7, 6], true);
								}
							} else {
								game.as_showImage('extension/手杀ui/lbtn/images/JDTS/' + _status.as_showImage_phase + '.png', [18, 65, 8, 4.4], true);
							}
						}
					},
				};

				//等待响应及游戏结束 
				lib.skill._jd_ddxyE = {
					trigger: {
						player: ['chooseToRespondEnd', 'useCardToEnd', 'phaseJudgeEnd', 'respondSha',
							'shanBegin'
						],
					},
					filter: function (event, player) {
						return player == game.me && _status.auto == false;
					},
					direct: true,
					content: function () {
						game.as_removeImage();
						if (_status.as_showImage_phase) {
							if (lib.config.extension_手杀ui_JDTSYangshi == "1") {
								if (get.mode() == 'taixuhuanjing' || lib.config['extension_EngEX_SSServant']) {
									game.as_showImage('extension/手杀ui/lbtn/images/JDTS/' + _status.as_showImage_phase + '.jpg', [10, 58, 7, 6], true);
								} else {
									game.as_showImage('extension/手杀ui/lbtn/images/JDTS/' + _status.as_showImage_phase + '.jpg', [3, 58, 7, 6], true);
								}
							} else {
								game.as_showImage('extension/手杀ui/lbtn/images/JDTS/' + _status.as_showImage_phase + '.png', [18, 65, 8, 4.4], true);
							}
						}
					},
				};

				//死亡或回合结束消失 
				lib.skill._jd_wjsw = {
					trigger: {
						global: ['phaseEnd', 'useCardAfter']
					},

					filter: function (event, player) {
						return _status.currentPhase != game.me && player != game.me;
					},
					forced: true,
					charlotte: true,
					content: function () {
						game.as_removeImage();
					},
				};

				lib.skill._jd_swxs = {
					trigger: {
						global: ['dieAfter']
					},
					forced: true,
					charlotte: true,
					filter: function (event, player) {
						return player == game.me && _status.auto == false;;
					},
					content: function () {
						game.as_removeImage();
					},
				};
				//游戏结束消失
				lib.onover.push(function (bool) {
					game.as_removeImage();
				});

				//对方正在思考
				lib.skill._jd_dfsk = {
					trigger: {
						global: ['phaseBegin', 'phaseEnd', 'phaseJudgeBegin', 'phaseDrawBegin',
							'phaseUseBegin', 'phaseDiscardBegin'
						],
					},
					charlotte: true,
					forced: true,
					filter: function (event, player) {
						//剩余人数两人时
						if (game.players.length == 2 && _status.currentPhase != game.me)
							return true;
					},
					content: function () {
						if (lib.config.extension_手杀ui_JDTSYangshi == "1") {
							if (get.mode() == 'taixuhuanjing' || lib.config['extension_EngEX_SSServant']) {
								game.as_showImage('extension/手杀ui/lbtn/images/JDTS/dfsk.jpg', [10, 58, 7, 6], true)
							} else {
								game.as_showImage('extension/手杀ui/lbtn/images/JDTS/dfsk.jpg', [3, 58, 7, 6], true)
							}
						} else {
							game.as_showImage('extension/手杀ui/lbtn/images/JDTS/dfsk.png', [18, 65, 8, 4.4], true)
						}
					},
				};
				//回合开始
				lib.skill._jd_hhks = {
					trigger: {
						player: ['phaseBefore', 'phaseBegin'],
					},
					filter: function (event, player) {
						return player == game.me && _status.currentPhase == player && _status.auto == false;
					},
					charlotte: true,
					forced: true,
					content: function () {
						if (event.triggername == 'phaseBefore') {
							if (lib.config.extension_手杀ui_JDTSYangshi == "1") {
								if (get.mode() == 'taixuhuanjing' || lib.config['extension_EngEX_SSServant']) {
									game.as_showImage('extension/手杀ui/lbtn/images/JDTS/hhks.jpg', [10, 58, 7, 6], true)
								} else {
									game.as_showImage('extension/手杀ui/lbtn/images/JDTS/hhks.jpg', [3, 58, 7, 6], true)
								}
							} else {
								game.as_showImage('extension/手杀ui/lbtn/images/JDTS/hhks.png', [18, 65, 8, 4.4], true)
							}
							_status.as_showImage_phase = 'hhks';
						} else if (_status.as_showImage_phase && _status.as_showImage_phase ==
							'hhks') {
							game.as_removeImage();
							delete _status.as_showImage_phase;
						}
					},
				};

				//判定阶段
				lib.skill._jd_pdjd = {
					trigger: {
						player: ['phaseJudgeBegin', 'phaseJudgeEnd'],
					},
					filter: function (event, player) {
						return player == game.me && _status.currentPhase == player && _status.auto == false;
					},
					charlotte: true,
					forced: true,
					content: function () {
						if (event.triggername == 'phaseJudgeBegin') {
							if (lib.config.extension_手杀ui_JDTSYangshi == "1") {
								if (get.mode() == 'taixuhuanjing' || lib.config['extension_EngEX_SSServant']) {
									game.as_showImage('extension/手杀ui/lbtn/images/JDTS/pdjd.jpg', [10, 58, 7, 6], true)
								} else {
									game.as_showImage('extension/手杀ui/lbtn/images/JDTS/pdjd.jpg', [3, 58, 7, 6], true)
								}
							} else {
								game.as_showImage('extension/手杀ui/lbtn/images/JDTS/pdjd.png', [18, 65, 8, 4.4], true)
							}
							_status.as_showImage_phase = 'pdjd';
						} else if (_status.as_showImage_phase && _status.as_showImage_phase ==
							'pdjd') {
							game.as_removeImage();
							delete _status.as_showImage_phase;
						}
					},
				};

				//摸牌阶段
				lib.skill._jd_mpjd = {
					trigger: {
						player: ['phaseDrawBegin', 'phaseDrawEnd'],
					},
					filter: function (event, player) {
						return player == game.me && _status.currentPhase == player && _status.auto == false;
					},
					charlotte: true,
					forced: true,
					content: function () {
						if (event.triggername == 'phaseDrawBegin') {
							if (lib.config.extension_手杀ui_JDTSYangshi == "1") {
								if (get.mode() == 'taixuhuanjing' || lib.config['extension_EngEX_SSServant']) {
									game.as_showImage('extension/手杀ui/lbtn/images/JDTS/mpjd.jpg', [10, 58, 7, 6], true)
								} else {
									game.as_showImage('extension/手杀ui/lbtn/images/JDTS/mpjd.jpg', [3, 58, 7, 6], true)
								}
							} else {
								game.as_showImage('extension/手杀ui/lbtn/images/JDTS/mpjd.png', [18, 65, 8, 4.4], true)
							}
							_status.as_showImage_phase = 'mpjd';
						} else if (_status.as_showImage_phase && _status.as_showImage_phase ==
							'mpjd') {
							game.as_removeImage();
							delete _status.as_showImage_phase;
						}
					},
				};

				//出牌阶段
				lib.skill._jd_cpjd = {
					trigger: {
						player: ['phaseUseBegin', 'phaseUseEnd'],
					},
					filter: function (event, player) {
						return player == game.me && _status.currentPhase == player && _status.auto == false;
					},
					charlotte: true,
					forced: true,
					content: function () {
						if (event.triggername == 'phaseUseBegin') {
							if (lib.config.extension_手杀ui_JDTSYangshi == "1") {
								if (get.mode() == 'taixuhuanjing' || lib.config['extension_EngEX_SSServant']) {
									game.as_showImage('extension/手杀ui/lbtn/images/JDTS/cpjd.jpg', [10, 58, 7, 6], true)
								} else {
									game.as_showImage('extension/手杀ui/lbtn/images/JDTS/cpjd.jpg', [3, 58, 7, 6], true)
								}
							} else {
								game.as_showImage('extension/手杀ui/lbtn/images/JDTS/cpjd.png', [18, 65, 8, 4.4], true)
							}
							_status.as_showImage_phase = 'cpjd';
						} else if (_status.as_showImage_phase && _status.as_showImage_phase ==
							'cpjd') {
							game.as_removeImage();
							delete _status.as_showImage_phase;
						}
					},
				};

				//弃牌阶段
				lib.skill._jd_qpjd = {
					trigger: {
						player: ['phaseDiscardBegin', 'phaseDiscardEnd'],
					},
					filter: function (event, player) {
						return player == game.me && _status.currentPhase == player && _status.auto == false;
					},
					charlotte: true,
					forced: true,
					content: function () {
						if (event.triggername == 'phaseDiscardBegin') {
							if (lib.config.extension_手杀ui_JDTSYangshi == "1") {
								if (get.mode() == 'taixuhuanjing' || lib.config['extension_EngEX_SSServant']) {
									game.as_showImage('extension/手杀ui/lbtn/images/JDTS/qpjd.jpg', [10, 58, 7, 6], true)
								} else {
									game.as_showImage('extension/手杀ui/lbtn/images/JDTS/qpjd.jpg', [3, 58, 7, 6], true)
								}
							} else {
								game.as_showImage('extension/手杀ui/lbtn/images/JDTS/qpjd.png', [18, 65, 8, 4.4], true)
							}
							_status.as_showImage_phase = 'qpjd';
						} else if (_status.as_showImage_phase && _status.as_showImage_phase ==
							'qpjd') {
							game.as_removeImage();
							delete _status.as_showImage_phase;
						}
					},
				};

				//回合结束
				lib.skill._jd_hhjs = {
					trigger: {
						player: ['phaseEnd', 'phaseAfter']
					},
					filter: function (event, player) {
						return player == game.me && _status.currentPhase == player && _status.auto == false;
					},
					charlotte: true,
					forced: true,
					content: function () {
						if (event.triggername == 'phaseEnd') {
							if (lib.config.extension_手杀ui_JDTSYangshi == "1") {
								if (get.mode() == 'taixuhuanjing' || lib.config['extension_EngEX_SSServant']) {
									game.as_showImage('extension/手杀ui/lbtn/images/JDTS/hhjs.jpg', [10, 58, 7, 6], true)
								} else {
									game.as_showImage('extension/手杀ui/lbtn/images/JDTS/hhjs.jpg', [3, 58, 7, 6], true)
								}
							} else {
								game.as_showImage('extension/手杀ui/lbtn/images/JDTS/hhjs.png', [18, 65, 8, 4.4], true)
							}
							_status.as_showImage_phase = 'hhjs';
						} else if (_status.as_showImage_phase && _status.as_showImage_phase ==
							'hhjs') {
							game.as_removeImage();
							delete _status.as_showImage_phase;
						}
					},
				};
				//---------------------------------//

			}

			//玩家进度条
			if (get.mode() != 'connect' && config.jindutiao == true) {

				lib.onover.push(function (bool) {
					if (document.getElementById("jindutiaopl")) {
						document.getElementById("jindutiaopl").remove()
					}
				});
				//玩家回合内进度条
				lib.skill._jindutiao = {
					trigger: {
						player: ['phaseZhunbeiBegin', 'phaseBegin', 'phaseJudgeBegin', 'phaseDrawBegin', 'useCardAfter', 'phaseDiscardBegin', 'useSkillBefore', 'loseAfter']
					},
					filter: function (event, player) {
						if (document.querySelector("#jindutiaopl") && lib.config.extension_手杀ui_jindutiaoUpdata == false) return false;
						return player == game.me && _status.currentPhase == player;
					},
					forced: true,
					content: function () {
						game.Jindutiaoplayer();
					},
					group: ['_jindutiao_jieshu'],
					subSkill: {
						jieshu: {
							trigger: {
								player: ['phaseEnd', 'phaseJieshuBegin'],
							},
							forced: true,
							filter: function (event, player) {
								return player == game.me;
							},
							content: function () {
								if (window.timer) {

									clearInterval(window.timer);
									delete window.timer;
								}

								if (window.timer2) {
									clearInterval(window.timer2);
									delete window.timer2;
								}

								if (document.getElementById("jindutiaopl")) {

									document.getElementById("jindutiaopl").remove()
								}
							},
						},
					},
				}
				//---------------------------//

				/*------回合外进度条玩家----*/
				lib.skill._jindutiaopl = {
					trigger: {
						global: ['gameStart'],
						player: ['useCardToBegin', 'respondBegin', 'chooseToRespondBegin', 'damageEnd'],
						target: "useCardToTargeted",
					},
					forced: true,
					charlotte: true,
					filter: function (event, player) {
						if (document.querySelector("#jindutiaopl") && lib.config.extension_手杀ui_jindutiaoUpdata == false) return false;
						if (event.name == 'gameStart' && lib.config['extension_无名补丁_enable'])
							return false;
						return _status.currentPhase != player && player == game.me;
					},
					content: function () {
						game.Jindutiaoplayer();
					},
					group: ['_jindutiaopl_jieshu'],
					subSkill: {
						jieshu: {
							trigger: {
								global: ["useCardAfter", "useCardBefore", "phaseBefore", "loseEnd", "phaseBegin", "phaseDradBegin", "phaseUseBegin", "phaseUseEnd", "phaseEnd", "phaseDiscardAfter", "phaseDiscardBegin", "useSkillBefore", "judgeBefore", "judgeAfter"],
							},
							forced: true,
							charlotte: true,
							filter: function (event, player) {
								if (document.querySelector("#jindutiaopl"))
									return _status.currentPhase != game.me;
								return false;
							},
							content: function () {
								if (window.timer) {
									clearInterval(window.timer);
									delete window.timer;
								}
								if (window.timer2) {
									clearInterval(window.timer2);
									delete window.timer2;
								}
								if (document.getElementById("jindutiaopl")) {

									document.getElementById("jindutiaopl").remove()
								}
							},
						},

					},

				}
				//------分割线-----//	
				/* 在其他扩展内调用进度条的方法  比如马钧转转乐之类的
				//------------------//
						   if (lib.config['extension_手杀ui_enable']&&lib.config.extension_手杀ui_jindutiao==true) {
				  if (!document.querySelector("#jindutiao")&&!document.querySelector("#jindutiaopl")) {         
					game.Jindutiaoplayer();
				}
				}
				//--------------------------//   */
			}

			/*进度条测试*/
			/*	lib.skill._jindutiaouse={
				trigger:{
				player:"useCardAfter",
				},
				filter:function(event,player){
			return document.querySelector("#jindutiao")&&player==game.me&&_status.currentPhase == player;	
			},
			content:function(){
			game.log('存在进度条');
			}
		}*/

			lib.skill._wuxie = {
				trigger: {
					player: ['useCardToBegin', 'phaseJudge']
				},
				priority: 5,
				popup: false,
				forced: true,
				filter: function (event, player) {
					if (event.card.storage && event.card.storage.nowuxie) return false;
					var card = event.card;
					if (event.name == 'phaseJudge' && card.viewAs) card = {
						name: card.viewAs
					};
					var info = get.info(card);
					if (info.wuxieable === false) return false;
					if (event.name != 'phaseJudge') {
						if (event.getParent().nowuxie) return false;
						if (!event.target) {
							if (info.wuxieable) return true;
							return false;
						}
						if (event.player.hasSkillTag('playernowuxie', false, event.card))
							return false;
						if (get.type(event.card) != 'trick' && !info.wuxieable) return false;
					}
					return true;
				},
				forceLoad: true,
				content: function () {
					'step 0'
					delete event.wuxieresult;
					delete event.wuxieresult2;
					if (trigger.multitarget) {
						event.targets = trigger.targets;
					}
					event.target = trigger.target;
					if (event.triggername == 'phaseJudge') {
						event.target = trigger.player;
					}
					event.sourcex = event.targets || event.target;
					if (!event.targets && trigger.targets && trigger.targets.length == 1) {
						event.sourcex2 = trigger.player;
					}
					event.source = trigger.player;
					if (event.state == undefined) event.state = true;
					event.card = trigger.card;
					event._global_waiting = true;
					event.tempnowuxie = (trigger.targets && trigger.targets.length > 1 && !trigger
						.multitarget);
					event.filterCard = function (card, player) {
						if (get.name(card) != 'wuxie') return false;
						return lib.filter.cardEnabled(card, player, 'forceEnable');
					};
					event.send = function (player, state, isJudge, card, source, target, targets, id,
						id2, tempnowuxie, skillState) {
						if (skillState) {
							player.applySkills(skillState);
						}
						state = state ? 1 : -1;
						var str = '';
						if (isJudge) {
							str += get.translation(source) + '的';
						}
						if (isJudge) {
							str += get.translation(card, 'viewAs');
						} else {
							str += get.translation(card);
						}
						if ((targets || target) && !isJudge) {
							str += '对' + get.translation(targets || target);
						}
						str += '将' + (state > 0 ? '生效' : '失效') + '，是否无懈？';
						//------无懈进度条movehere------------//
						if (lib.config['extension_手杀ui_enable'] && lib.config.extension_手杀ui_jindutiao == true) {
							if (!document.querySelector("#jindutiaopl")) {
								game.Jindutiaoplayer();
							}
						}
						//--------------------------// 
						//------判断视角是否为玩家，且玩家是否可以使用无懈---------//
						if (player.isUnderControl(true) && !_status.auto && !ui.tempnowuxie &&
							tempnowuxie) {
							var translation = get.translation(card.name);
							if (translation.length >= 4) {
								translation = lib.translate[card.name + '_ab'] || translation
									.slice(0, 2);
							}

							ui.tempnowuxie = ui.create.control('不无懈' + translation, ui.click.tempnowuxie, 'stayleft');

							if (lib.config.extension_手杀ui_yangshi == "on") {//修改无懈
								/*var list=ui.control.childNodes;
								list[0].classList.add('dou3');
								 list[0].childNodes[0].setBackgroundImage('extension/手杀ui/lbtn/images/hu.png');*/
								ui.tempnowuxie.lastChild.innerHTML = "<image style=width:130px height 15px src=" + lib.assetURL + "extension/手杀ui/lbtn/images/uibutton/WX.png>";
								//分割
							}
							ui.tempnowuxie._origin = id2;
						}
						var next = player.chooseToUse({
							filterCard: function (card, player) {
								if (get.name(card) != 'wuxie') return false;
								return lib.filter.cardEnabled(card, player,
									'forceEnable');
							},
							prompt: str,
							type: 'wuxie',
							state: state,
							_global_waiting: true,
							ai1: function () {
								if (isJudge) {
									var name = card.viewAs || card.name;
									var info = lib.card[name];
									if (info && info.ai && info.ai.wuxie) {
										var aiii = info.ai.wuxie(source, card,
											source, _status.event.player, state);
										if (typeof aiii == 'number') return aiii;
									}
									if (Math.abs(get.attitude(_status.event.player,
										source)) < 3) return 0;
									if (source.hasSkillTag('nowuxie_judge') ||
										source.hasSkillTag('guanxing') && (source !=
											player || !source.hasSkill(
												'guanxing_fail'))) return 0;
									if (name != 'lebu' && name != 'bingliang') {
										if (source != _status.event.player) {
											return 0;
										}
									}
									var card2;
									if (name != card.name) {
										card2 = {
											name: name
										};
									} else {
										card2 = card;
									}
									var eff = get.effect(source, card2, source,
										source);
									if (eff >= 0) return 0;
									return state * get.attitude(_status.event
										.player, source);
								} else if (target) {
									var triggerevent = _status.event.getTrigger();
									if (triggerevent && triggerevent.parent &&
										triggerevent.parent.postAi &&
										triggerevent.player.isUnknown(_status.event
											.player)) {
										return 0;
									}
									var info = get.info(card);
									if (info.ai && info.ai.wuxie) {
										var aiii = info.ai.wuxie(target, card,
											source, _status.event.player, state);
										if (typeof aiii == 'number') return aiii;
									}
									if (info.multitarget && targets) {
										var eff = 0;
										for (var i = 0; i < targets.length; i++) {
											eff += get.effect(targets[i], card,
												source, _status.event.player)
										}
										return -eff * state;
									}
									if (Math.abs(get.attitude(_status.event.player,
										target)) < 3) return 0;
									return -get.effect(target, card, source, _status
										.event.player) * state;
								} else {
									var triggerevent = _status.event.getTrigger();
									if (triggerevent && triggerevent.parent &&
										triggerevent.parent.postAi &&
										triggerevent.player.isUnknown(_status.event
											.player)) {
										return 0;
									}
									var info = get.info(card);
									if (info.ai && info.ai.wuxie) {
										var aiii = info.ai.wuxie(target, card,
											source, _status.event.player, state);
										if (typeof aiii == 'number') return aiii;
									}
									if (Math.abs(get.attitude(_status.event.player,
										source)) < 3) return 0;
									return -get.attitude(_status.event.player,
										source) * state;
								}
							},
							source: target,
							source2: targets,
							id: id,
							id2: id2
						});
						if (event.stateplayer && event.statecard) next.set('respondTo', [event
							.stateplayer, event.statecard
						]);
						else if (!isJudge) {
							next.set('respondTo', [source, card]);
						}
						if (game.online) {
							_status.event._resultid = id;
							game.resume();
						} else {
							next.nouse = true;
						}
					};
					event.settle = function () {
						if (!event.state) {
							if (event.triggername == 'phaseJudge') {
								trigger.untrigger();
								trigger.cancelled = true;
							} else {
								trigger.cancel();
								if (event.guowuxie == true) {
									if (trigger.target.identity != 'ye' && trigger.target
										.identity != 'unknown') {
										trigger.getParent().excluded.addArray(game.filterPlayer(
											function (current) {
												return current.identity == trigger
													.target.identity;
											}));
									}
								}
							}
						}
						event.finish();
					};
					'step 1'
					var list = game.filterPlayer(function (current) {
						if (event.nowuxie) return false;
						if (event.directHit && event.directHit.contains(current))
							return false;
						if (event.triggername == 'phaseJudge') {
							if (game.checkMod(trigger.card, player, current, 'unchanged',
								'wuxieJudgeEnabled', current) == false) return false;
							if (game.checkMod(trigger.card, player, current, 'unchanged',
								'wuxieJudgeRespondable', player) == false) return false;
							if (event.stateplayer && event.statecard && (game.checkMod(event
								.statecard, event.stateplayer, player, current,
								'unchanged', 'wuxieRespondable', event.stateplayer
							) == false)) return false;
						} else {
							if (!event.statecard && trigger.getParent().directHit.contains(
								current)) return false;
							if (game.checkMod(trigger.card, player, trigger.target, current,
								'unchanged', 'wuxieEnabled', current) == false)
								return false;
							if (game.checkMod(trigger.card, player, trigger.target, current,
								'unchanged', 'wuxieRespondable', player) == false)
								return false;
							if (event.stateplayer && event.statecard && (game.checkMod(event
								.statecard, event.stateplayer, trigger.player,
								current, 'unchanged', 'wuxieRespondable', event
								.stateplayer) == false)) return false;
						}
						return current.hasWuxie();
					});
					event.list = list;
					event.id = get.id();
					list.sort(function (a, b) {
						return get.distance(event.source, a, 'absolute') - get.distance(
							event.source, b, 'absolute');
					});
					'step 2'
					if (event.list.length == 0) {
						event.settle();
					} else if (_status.connectMode && (event.list[0].isOnline() || event.list[0] ==
						game.me)) {
						event.goto(4);
					} else {
						event.current = event.list.shift();
						event.send(event.current, event.state, event.triggername == 'phaseJudge',
							event.card, event.source, event.target, event.targets, event.id,
							trigger.parent.id, event.tempnowuxie);
					}
					'step 3'
					if (result.bool) {
						event.wuxieresult = event.current;
						event.wuxieresult2 = result;
						event.goto(8);
					} else {
						event.goto(2);
					}
					'step 4'
					var id = event.id;
					var sendback = function (result, player) {
						if (result && result.id == id && !event.wuxieresult && result.bool) {
							event.wuxieresult = player;
							event.wuxieresult2 = result;
							game.broadcast('cancel', id);
							if (_status.event.id == id && _status.event.name == 'chooseToUse' &&
								_status.paused) {
								return (function () {
									event.resultOL = _status.event.resultOL;
									ui.click.cancel();
									if (ui.confirm) ui.confirm.close();
								});
							}
						} else {
							if (_status.event.id == id && _status.event.name == 'chooseToUse' &&
								_status.paused) {
								return (function () {
									event.resultOL = _status.event.resultOL;
								});
							}
						}
					};

					var withme = false;
					var withol = false;
					var list = event.list;
					for (var i = 0; i < list.length; i++) {
						if (list[i].isOnline()) {
							withol = true;
							list[i].wait(sendback);
							list[i].send(event.send, list[i], event.state, event.triggername ==
								'phaseJudge',
								event.card, event.source, event.target, event.targets, event.id,
								trigger.parent.id, event.tempnowuxie, get.skillState(list[i]));
							list.splice(i--, 1);
						} else if (list[i] == game.me) {
							withme = true;
							event.send(list[i], event.state, event.triggername == 'phaseJudge',
								event.card, event.source, event.target, event.targets, event.id,
								trigger.parent.id, event.tempnowuxie);
							list.splice(i--, 1);
						}
					}
					if (!withme) {
						event.goto(6);
					}
					if (_status.connectMode) {
						if (withme || withol) {
							for (var i = 0; i < game.players.length; i++) {
								game.players[i].showTimer();
							}
						}
					}
					event.withol = withol;
					'step 5'
					if (result && result.bool && !event.wuxieresult) {
						game.broadcast('cancel', event.id);
						event.wuxieresult = game.me;
						event.wuxieresult2 = result;
					}
					'step 6'
					if (event.withol && !event.resultOL) {
						game.pause();
					}
					'step 7'
					for (var i = 0; i < game.players.length; i++) {
						game.players[i].hideTimer();
					}
					'step 8'
					if (event.wuxieresult && event.wuxieresult2 && event.wuxieresult2.skill) {
						var info = get.info(event.wuxieresult2.skill);
						if (info && info.precontent && !game.online) {
							var next = game.createEvent('pre_' + event.wuxieresult2);
							next.setContent(info.precontent);
							next.set('result', event.wuxieresult2);
							next.set('player', event.wuxieresult);
						}
					}
					'step 9'
					if (event.wuxieresult) {
						var next = event.wuxieresult.useResult(event.wuxieresult2);
						if (event.stateplayer && event.statecard) next.respondTo = [event
							.stateplayer, event.statecard
						];
						else if (event.triggername != 'phaseJudge') {
							next.respondTo = [trigger.player, trigger.card];
						}
					}
					'step 10'
					if (event.wuxieresult) {
						if (result.wuxied) {
							event.nowuxie = result.nowuxie;
							event.directHit = result.directHit;
							event.stateplayer = event.wuxieresult;
							if (event.wuxieresult2 && event.wuxieresult2.used) {
								event.statecard = event.wuxieresult2.used;
							} else {
								event.statecard = true;
							}
							event.state = !event.state;
							event.goto(1);
						} else event.settle();
					} else if (event.list.length) {
						event.goto(2);
					} else {
						event.settle();
					}
					delete event.resultOL;
					delete event.wuxieresult;
					delete event.wuxieresult2;
				}
			}
			return function (next) {
				app.waitAllFunction([
					function (_next) {
						lib.init.css(lib.assetURL + 'extension/' + app.name, 'extension',
							_next);
					},
					function (_next) {
						app.loadPlugins(function () {
							var plugins = app.plugins.slice(0);
							var runNext = function () {
								var item = plugins.shift();
								if (!item) return _next();
								if (item.filter && !item.filter()) return runNext();
								if (item.content) return item.content(runNext);
								runNext();
							};
							Object.assign(runNext, app.element.runNext);
							runNext();
						});
					},
				], next);
			};

		},
		precontent: function () {
			//函数框架
			/*隐藏结算界面*/
			game.buttoncloseUI = function () {
				if (_status.showcloseUI) return false;
				_status.showcloseUI = true;
				ui.dialogs[0] && ui.dialogs[0].hide();
				setTimeout(item => {
					var popuperContainer = ui.create.div('.popup-container', {
						zIndex: 10,
						//backgroundColor: 'rgba(0,0,0,0.8)',
						width: '520px',
						height: '270px',
						top: '36%',
						left: '28.6%',
					}, ui.window);
					popuperContainer.addEventListener('click', event => {
						event.stopPropagation();
						popuperContainer.delete(200);
						ui.dialogs[0] && ui.dialogs[0].show();
						_status.showcloseUI = false;
					});
				}, 1000);
			}

			/*进度条框架*/
			game.Jindutiaoplayer = function () {

				//----------------进度条主体---------------------//
				if (window.timer) {
					clearInterval(window.timer);
					delete window.timer;
				}

				if (window.timer2) {
					clearInterval(window.timer2);
					delete window.timer2;
				}

				if (document.getElementById("jindutiaopl")) {
					document.getElementById("jindutiaopl").remove()
				}

				var boxContent = document.createElement('div');
				boxContent.setAttribute('id', 'jindutiaopl');
				//-------样式1-------//
				if (lib.config.extension_手杀ui_jindutiaoYangshi == "1") {
					//手杀进度条样式
					if (window.jindutiaoTeshu) {
						delete window.jindutiaoTeshu;
					}
					boxContent.style.backgroundColor = "rgba(0,0,0,0.4)";
					boxContent.style.width = "620px";
					boxContent.style.height = "12.3px";
					boxContent.style.borderRadius = "1000px";
					boxContent.style['boxShadow'] = "0px 0px 9px #2e2b27 inset,0px 0px 2.1px #FFFFD5";
					boxContent.style.overflow = "hidden";
					boxContent.style.border = "1.2px solid #000000";
					boxContent.style.position = "fixed";
					boxContent.style.left = "calc(50% - 300px)";
					boxContent.style.bottom = parseFloat(lib.config['extension_手杀ui_jindutiaoSet']) + '%';

					var boxTime = document.createElement('div')
					boxTime.data = 620
					boxTime.style.cssText =
						"background-image: linear-gradient(#fccc54 15%, #d01424 30%, #cc6953 90%);height:12.8px;"
					boxContent.appendChild(boxTime)
				}
				//-------样式2-----//
				if (lib.config.extension_手杀ui_jindutiaoYangshi == "2") {

					//十周年PC端进度条样式
					if (window.jindutiaoTeshu) {
						delete window.jindutiaoTeshu;
					}
					boxContent.style.width = "400px";
					boxContent.style.height = "24px";
					boxContent.style.display = "block";
					boxContent.style.left = "calc(50% - 197px)";
					boxContent.style.position = "fixed";
					boxContent.style.bottom = parseFloat(lib.config['extension_手杀ui_jindutiaoSet']) + '%';

					var boxTime = document.createElement('div')
					boxTime.data = 300
					boxTime.style.cssText =
						"width:280px;height:2px;margin:14px 0 0 85px;background-color: #E2E20A;border-right:10px solid #FFF;position: absolute;top: 4px;"
					boxContent.appendChild(boxTime)

					var imgBg = document.createElement('img')
					imgBg.src = lib.assetURL + 'extension/手杀ui/lbtn/images/uibutton/jindutiao.png'
					imgBg.style.cssText =
						"width: 400px;height:40px;position: absolute;top: 0;"
					boxContent.appendChild(imgBg)

				}

				//-------样式3-----//
				if (lib.config.extension_手杀ui_jindutiaoYangshi == "3") {

					//十周年客户端进度条样式
					if (!window.jindutiaoTeshu) {
						window.jindutiaoTeshu = true;
					}
					boxContent.style.width = "400px";
					boxContent.style.height = "13px";
					boxContent.style.display = "block";
					boxContent.style['boxShadow'] = "0 0 4px #000000";
					boxContent.style.margin = "0 0 !important";
					boxContent.style.position = "fixed";
					boxContent.style.left = "calc(50% - 197px)";
					boxContent.style.bottom = parseFloat(lib.config['extension_手杀ui_jindutiaoSet']) + '%';

					var boxTime = document.createElement('div')
					boxTime.data = 395/*黄色条长度*/
					boxTime.style.cssText =
						"width:399px;height:10px;margin:0 0 0 0;background-color: #F4C336;border-radius:2px; border-top:0px solid #000000;border-bottom:0px solid #000000;position: absolute;top: 1px;border-radius: 0.5px;"
					boxContent.appendChild(boxTime)

					var boxTime2 = document.createElement('div')
					boxTime2.data = 395/*白色条长度*/
					boxTime2.style.cssText =
						"width:399px;height:0.1px;margin:0 0 0 0.5px;background-color: #fff; opacity:0.8 ;border-top:1px solid #FFF;border-bottom:1px solid #FFF;border-left:1px solid #FFF;position: absolute;top: 17px;border-radius: 2px;"
					boxContent.appendChild(boxTime2)
					//白条底图
					var imgBg3 = document.createElement('img')
					imgBg3.src = lib.assetURL + 'extension/手杀ui/lbtn/images/uibutton/jindutiao2.1.png'
					imgBg3.style.cssText =
						"width: 400px;height:4px;position: absolute;top: 16px;z-index: -1;"
					boxContent.appendChild(imgBg3)

					var imgBg = document.createElement('img')
					imgBg.src = lib.assetURL + 'extension/手杀ui/lbtn/images/uibutton/jindutiao2.png'
					imgBg.style.cssText =
						"width: 400px;height:13px;position: absolute;top: 0;opacity:0;"
					boxContent.appendChild(imgBg)
					/*底图*/
					var imgBg2 = document.createElement('img')
					imgBg2.src = lib.assetURL + 'extension/手杀ui/lbtn/images/uibutton/jindutiao2.1.png'
					imgBg2.style.cssText =
						"width: 400px;height:14px;position: absolute;top: 0;z-index: -1;"
					boxContent.appendChild(imgBg2)
				}

				document.body.appendChild(boxContent)
				window.timer = setInterval(function () {
					boxTime.style.width = boxTime.data + 'px';
					boxTime.data--;
					if (boxTime.data == 0) {
						clearInterval(window.timer);
						delete window.timer;
						boxContent.remove();
						if (lib.config.extension_手杀ui_jindutiaotuoguan == true && _status.auto == false) {
							ui.click.auto();
						}

					}
					//--------//
				}, parseFloat(lib.config['extension_手杀ui_jindutiaoST'])); //进度条间隔时间100 
				//-------------//
				if (window.jindutiaoTeshu == true) {
					window.timer2 = setInterval(() => {
						boxTime2.data--;
						boxTime2.style.width = boxTime2.data + 'px';
						if (boxTime2.data == 0) {
							clearInterval(window.timer2);
							delete window.timer2;
							delete window.jindutiaoTeshu;
							boxTime2.remove();
							imgBg3.remove();
							//ui.click.cancel();//结束回合
							//点击托管ui.click.auto();
						}
					}, parseFloat(lib.config['extension_手杀ui_jindutiaoST']) / 2); //进度条时间
				}
				//--------------//	
				//---------------------------------------------------------------------------------------------------//    
			}

			//-----AI进度条框架----//
			game.JindutiaoAIplayer = function () {
				if (window.timerai) {
					clearInterval(window.timerai);
					delete window.timerai;
				}
				if (document.getElementById("jindutiaoAI")) {
					document.getElementById("jindutiaoAI").remove();
				}
				window.boxContentAI = document.createElement('div');
				window.boxTimeAI = document.createElement('div');
				window.boxContentAI.setAttribute('id', 'jindutiaoAI');
				window.boxContentAI.classList.add("timeai");
				if (lib.config.extension_手杀ui_yangshi == "on") {
					//--------手杀样式-------------//  
					window.boxContentAI.style.cssText =
						"display:block;position:absolute;z-index:90;--w: 122px;--h: calc(var(--w) *4/145);width: var(--w);height: var(--h);left:3.5px;bottom:-6.2px;"
					window.boxTimeAI.data = 125
					window.boxTimeAI.style.cssText =
						"z-index:92;--w: 33px;--h: calc(var(--w) * 4/120);width: var(--w);height: var(--h);margin:1px;background-color: #dd9900;position: absolute;top: 0px;"
					window.boxContentAI.appendChild(boxTimeAI)

					var imgBg = document.createElement('img')
					imgBg.src = lib.assetURL + 'extension/手杀ui/lbtn/images/uibutton/time.png'
					imgBg.style.cssText =
						"position:absolute;z-index:91;--w: 122px;--h: calc(var(--w) * 4/145);width: var(--w);height: var(--h);top: 0;"
					boxContentAI.appendChild(imgBg)

					//-------------------------//	
				} else {
					//----------十周年样式--------//		
					window.boxContentAI.style.cssText =
						"display:block;position:absolute;z-index:90;--w: 122px;--h: calc(var(--w) *8/162);width: var(--w);height: var(--h);left:1.5px;bottom:-8.2px;"
					window.boxTimeAI.data = 120
					window.boxTimeAI.style.cssText =
						"z-index:91;width: 115px;height: 3.3px;margin:1px;background-color: #f2c84b;position: absolute;top: 0px;border-radius: 3px;"
					window.boxContentAI.appendChild(boxTimeAI)

					var imgBg = document.createElement('img')
					imgBg.src = lib.assetURL + 'extension/手杀ui/lbtn/images/uibutton/timeX.png'
					imgBg.style.cssText =
						"position:absolute;z-index:90;--w: 122px;--h: calc(var(--w) * 8/162);width: var(--w);height: var(--h);top: 0;"
					window.boxContentAI.appendChild(imgBg)
					//--------------------//	
				}
				window.timerai = setInterval(() => {
					window.boxTimeAI.data--
					window.boxTimeAI.style.width = boxTimeAI.data + 'px'
					if (window.boxTimeAI.data == 0) {
						clearInterval(window.timerai);
						delete window.timerai;
						window.boxContentAI.remove()
					}
				}, 150); //进度条时间
			}

			//--------聊天框架-------//	
			//----------------------------------------------------------------------------------------//

			if (!window.chatRecord) window.chatRecord = [];
			game.addChatWord = function (strx) {
				if (window.chatRecord.length > 30) {//设置一下上限30条，不设也行，把这个if删除即可
					window.chatRecord.remove(window.chatRecord[0]);
				}
				if (strx) {
					window.chatRecord.push(strx);
				}
				var str = (window.chatRecord[0] || '') + '<br>';
				if (window.chatRecord.length > 1) {
					for (var i = 1; i < window.chatRecord.length; i++) {
						str += '<br>' + window.chatRecord[i] + '<br>';
					}
				}
				if (window.chatBackground2 != undefined) game.updateChatWord(str);
			}
			//这里
			game.showChatWordBackgroundX = function () {
				if (window.chatBg != undefined && window.chatBg.show) {//控制面板打开，首次调用此函数时打开面板，再次调用时关闭
					window.chatBg.hide();
					//关闭砸表情
					if (window.jidan.thrownn) window.jidan.thrownn = false;
					if (window.tuoxie.thrownn) window.tuoxie.thrownn = false;
					if (window.xianhua.thrownn) window.xianhua.thrownn = false;
					if (window.meijiu.thrownn) window.meijiu.thrownn = false;
					if (window.cailan.thrownn) window.cailan.thrownn = false;
					if (window.qicai.thrownn) window.qicai.thrownn = false;
					window.chatBg.show = false;
					if (window.dialog_lifesay) {
						if (window.dialog_lifesay.show) window.dialog_lifesay.style.left = '-' + window.dialog_lifesay.style.width;
						setTimeout(function () {
							window.dialog_lifesay.hide();
							window.dialog_lifesay.show = false;
						}, 100);
					}
					if (window.dialog_emoji) {
						if (window.dialog_emoji.show) window.dialog_emoji.style.top = '100%';
						setTimeout(function () {
							window.dialog_emoji.hide();
							window.dialog_emoji.show = false;
						}, 1000);
					}
					if (window.chatBackground) {
						if (window.chatBackground.show) window.chatBackground.style.left = '100%';
						setTimeout(function () {
							window.chatBackground.hide();
							window.chatBackground.show = false;
						}, 1000);
					}
					return;
				}
				var dialogChat = {};
				//聊天框整体
				window.chatBg = ui.create.div('hidden');
				window.chatBg.classList.add('popped');
				window.chatBg.classList.add('static');
				window.chatBg.show = true;
				window.chatBg.style.cssText = "display: block;--w: 420px;--h: calc(var(--w) * 430/911);width: var(--w);height: var(--h);position: fixed;left:30%;bottom:5%;opacity: 1;background-size: 100% 100%;background-color: transparent;z-index:99;";
				window.chatBg.style.transition = 'all 1.5s';
				/*window.chatBg.style.height='170px';//调整对话框背景大小，位置
				window.chatBg.style.width='550px';
					window.chatBg.style.left='calc(50%-130px)';
				window.chatBg.style.top='calc(100% - 470px)';
				window.chatBg.style.opacity=1;*/
				window.chatBg.setBackgroundImage('extension/手杀ui/sayplay/chat.png');
				/*window.chatBg.style.backgroundSize="100% 100%";
				window.chatBg.style.transition='all 0.5s';
				window.chatBg.style['box-shadow']='none';*/
				ui.window.appendChild(window.chatBg);

				var clickFK = function (div) {
					div.style.transition = 'opacity 0.5s';
					div.addEventListener(lib.config.touchscreen ? 'touchstart' : 'mousedown', function () {
						this.style.transform = 'scale(0.95)';
					});
					div.addEventListener(lib.config.touchscreen ? 'touchend' : 'mouseup', function () {
						this.style.transform = '';
					});
					div.onmouseout = function () {
						this.style.transform = '';
					};
				};
				//--------------------------------//	
				game.open_lifesay = function () {
					//打开常用语函数
					if (window.dialog_emoji) {
						if (window.dialog_emoji.show) window.dialog_emoji.style.top = '100%';
						setTimeout(function () {
							window.dialog_emoji.hide();
							window.dialog_emoji.show = false;
						}, 1000);
					}
					if (window.chatBackground) {
						if (window.chatBackground.show) window.chatBackground.style.left = '100%';
						setTimeout(function () {
							window.chatBackground.hide();
							window.chatBackground.show = false;
						}, 1000);
					}
					if (window.dialog_lifesay != undefined && window.dialog_lifesay.show) {//控制面板打开，首次调用此函数时打开面板，再次调用时关闭
						window.dialog_lifesay.hide();
						window.dialog_lifesay.show = false;
						return;
					}
					var dialogLife = {};
					window.dialog_lifesay = ui.create.div('hidden');
					window.dialog_lifesay.style['z-index'] = 999999999;
					window.dialog_lifesay.classList.add('popped');
					window.dialog_lifesay.classList.add('static');
					window.dialog_lifesay.show = true;
					window.dialog_lifesay.style.height = '300px';//整个常用语对话框的宽高
					window.dialog_lifesay.style.width = '600px';//对话框的宽度，由每一条的内容字数决定，可自行调整，使用固定大小避免手机和电脑像素不同导致冲突
					window.dialog_lifesay.style.left = '-' + window.dialog_lifesay.style.width;//这里弄一个右移的动画
					setTimeout(function () {
						window.dialog_lifesay.style.left = 'calc( 50% - 300px)';//整个对话框的位置
					}, 100);
					window.dialog_lifesay.style.top = 'calc( 20% - 100px)';//整个对话框的位置
					window.dialog_lifesay.style.transition = 'all 1s';
					window.dialog_lifesay.style.opacity = 1;
					window.dialog_lifesay.style.borderRadius = '8px';
					window.dialog_lifesay.style.backgroundSize = "100% 100%";
					window.dialog_lifesay.setBackgroundImage('extension/手杀ui/sayplay/nobg.png');//把背景dialog设置为透明
					window.dialog_lifesay.style['box-shadow'] = 'none';
					ui.window.appendChild(window.dialog_lifesay);
					dialogLife.background = window.dialog_lifesay;
					window.dialog_lifesayBgPict = ui.create.div('hidden');//这是现在的背景颜色的div，外层div
					window.dialog_lifesayBgPict.style.height = '100%';
					window.dialog_lifesayBgPict.style.width = '100%';
					window.dialog_lifesayBgPict.style.left = '0%';
					window.dialog_lifesayBgPict.style.top = '0%';
					window.dialog_lifesayBgPict.style.borderRadius = '8px';
					window.dialog_lifesayBgPict.style.backgroundSize = "100% 100%";
					window.dialog_lifesayBgPict.setBackgroundImage('extension/手杀ui/sayplay/saydiv.png');
					window.dialog_lifesayBgPict.style['box-shadow'] = 'none';
					window.dialog_lifesay.appendChild(window.dialog_lifesayBgPict);
					window.dialog_lifesayBgColor = ui.create.div('hidden');//这是原来的背景颜色的div，内层div
					window.dialog_lifesayBgColor.style.height = '70%';
					window.dialog_lifesayBgColor.style.width = '80%';
					window.dialog_lifesayBgColor.style.left = '10%';
					window.dialog_lifesayBgColor.style.top = '10%';
					window.dialog_lifesayBgColor.style.borderRadius = '8px';
					window.dialog_lifesayBgColor.setBackgroundImage('extension/手杀ui/sayplay/nobg.png');//把背景设置为透明
					//window.dialog_lifesayBgColor.style.backgroundColor='black';
					window.dialog_lifesayBgColor.style['overflow-y'] = 'scroll';
					lib.setScroll(window.dialog_lifesayBgColor);
					window.dialog_lifesay.appendChild(window.dialog_lifesayBgColor);
					window.lifesayWord = [//添加常用语
						"能不能快点呀，兵贵神速啊",
						"主公，别开枪，自己人",
						"小内再不跳，后面还怎么玩啊",
						"你们怎么忍心就这么让我酱油了",
						"我，我惹你们了吗",
						"姑娘，你真是条汉子",
						"三十六计，走为上，容我去去便回",
						"人心散了，队伍不好带啊",
						"昏君，昏君啊",
						"风吹鸡蛋壳，牌去人安乐",
						"小内啊，您老悠着点儿",
						"不好意思，刚才卡了",
						"你可以打得再烂一点吗",
						"哥们儿，给力点行吗",
						"哥，交个朋友吧",
						"妹子，交个朋友吧",
					];
					for (var i = 0; i < window.lifesayWord.length; i++) {
						window['dialog_lifesayContent_' + i] = ui.create.div('hidden', '', function () {
							game.me.say(this.content);
							window.dialog_lifesay.delete();
							delete window.dialog_lifesay;
							window.dialog_lifesay = undefined;
							game.playAudio("..", "extension", "手杀ui/sayplay/audio", this.pos + "_" + game.me.sex);
						});
						window['dialog_lifesayContent_' + i].style.height = '10%';//每一条内容的高度，可以用px也可以用百分比，由你喜欢
						window['dialog_lifesayContent_' + i].style.width = '100%';//每一条内容的宽度，默认与整个对话框宽度挂钩以美观，具体百分比可自己调整
						window['dialog_lifesayContent_' + i].style.left = '0%';
						window['dialog_lifesayContent_' + i].style.top = '0%';
						window['dialog_lifesayContent_' + i].style.position = 'relative';
						window['dialog_lifesayContent_' + i].pos = i;
						window['dialog_lifesayContent_' + i].content = window.lifesayWord[i];
						window['dialog_lifesayContent_' + i].innerHTML = '<font color=white>' + window.lifesayWord[i] + '</font>';//显示的字体可以自己改
						window.dialog_lifesayBgColor.appendChild(window['dialog_lifesayContent_' + i]);
						clickFK(window['dialog_lifesayContent_' + i]);
					}
				}
				//常用语按钮
				window.chatButton1 = ui.create.div('hidden', '', game.open_lifesay);
				window.chatButton1.style.cssText = "display: block;--w: 80px;--h: calc(var(--w) * 82/98);width: var(--w);height: var(--h);left:40px;bottom:25px;transition:none;background-size:100% 100%";
				/*window.chatButton1.style.height='70px';
				window.chatButton1.style.width='80px';
				window.chatButton1.style.left='40px';
				window.chatButton1.style.bottom='10px';
				window.chatButton1.style.transition='none';
				window.chatButton1.style.backgroundSize="100% 100%";*/
				window.chatButton1.setBackgroundImage('extension/手杀ui/sayplay/lifesay.png');

				lib.setScroll(window.chatButton1);
				window.chatBg.appendChild(window.chatButton1);
				clickFK(window.chatButton1);
				//-----------------------------------//	
				//-----------互动框---------//
				game.open_hudong = function () {
					//打开互动框函数
					if (window.dialog_hudong != undefined && dialog_hudong.show) {//控制面板打开，首次调用此函数时打开面板，再次调用时关闭
						window.dialog_hudong.hide();
						window.dialog_hudong.show = false;
						return;
					}

				}
				//------菜篮子框------//
				window.hudongkuang = ui.create.div('hidden', '', game.open_hudong);
				window.hudongkuang.style.cssText = "display: block;--w: 315px;--h: calc(var(--w) * 135/142);width: var(--w);height: var(--h);left:-280px;bottom:-30px;transition:none;background-size:100% 100%;pointer-events:none;";

				window.hudongkuang.setBackgroundImage('extension/手杀ui/sayplay/hudong.png');


				window.chatBg.appendChild(window.hudongkuang);




				//-------------------------//

				//------1--美酒-------//
				game.open_meijiu = function () {
					//打开美酒函数
					//这里
					var list = game.players;
					for (i = 0; i < game.players.length; i++) {
						list[i].onclick = function () {
							var target = this;
							if (window.meijiu.thrownn == true) {
								for (let i = 0; i < 10; i++) {
									setTimeout(() => {
										if (i <= 8)
											game.me.throwEmotion(this, 'flower');
										else game.me.throwEmotion(this, 'wine');
										window.shuliang.innerText = window.shuliang.innerText - 1;
									}, 100 * i);
									setTimeout(() => {
										if (i <= 8)
											target.throwEmotion(game.me, 'flower');
										else target.throwEmotion(game.me, 'wine');
									}, 100 * i + 500)
								}
							}
						}
					}

				}


				window.meijiu = ui.create.div('hidden', '', game.open_meijiu);
				window.meijiu.style.cssText = "display: block;--w: 63px;--h: calc(var(--w) * 50/50);width: var(--w);height: var(--h);left:-155px;bottom:173px;transition:none;background-size:100% 100%";

				window.meijiu.setBackgroundImage('extension/手杀ui/sayplay/meijiu.png');
				//这里
				window.meijiu.onclick = function () {
					window.meijiu.thrownn = true;
				}
				window.chatBg.appendChild(window.meijiu);
				lib.setScroll(window.meijiu);
				clickFK(window.meijiu);

				//-------------------//

				//---2-----鲜花-------//
				game.open_xianhua = function () {
					//打开鲜花函数
					//这里
					var list = game.players;
					for (i = 0; i < game.players.length; i++) {
						list[i].onclick = function () {
							if (window.xianhua.thrownn == true)
								game.me.throwEmotion(this, 'flower');
							window.shuliang.innerText = window.shuliang.innerText - 1;
						}
					}
				}


				window.xianhua = ui.create.div('hidden', '', game.open_xianhua);
				window.xianhua.style.cssText = "display: block;--w: 63px;--h: calc(var(--w) * 50/50);width: var(--w);height: var(--h);left:-230px;bottom:173px;transition:none;background-size:100% 100%";

				window.xianhua.setBackgroundImage('extension/手杀ui/sayplay/xianhua.png');
				//这里
				window.xianhua.onclick = function () {
					window.xianhua.thrownn = true;
				}

				window.chatBg.appendChild(window.xianhua);
				lib.setScroll(window.xianhua);
				clickFK(window.xianhua);



				//-------------------//

				//-----3---拖鞋-------//

				game.open_tuoxie = function () {
					//打开拖鞋函数
					//这里
					var list = game.players;
					var num = 10;
					for (i = 0; i < game.players.length; i++) {
						list[i].onclick = function () {
							var target = this;
							if (window.tuoxie.thrownn == true) {
								for (let i = 0; i < num; i++) {
									setTimeout(() => {
										if (i <= 8) {
											game.me.throwEmotion(this, 'egg');
											window.shuliang.innerText = window.shuliang.innerText - 1;
										}
										else {
											game.me.throwEmotion(this, 'shoe');
											window.shuliang.innerText = window.shuliang.innerText - 1;
										}
									}, 100 * i);
									setTimeout(() => {
										if (i <= 8) target.throwEmotion(game.me, 'egg');
										else target.throwEmotion(game.me, 'shoe')
									}, 100 * i + 1000)
								}
							}

						}
					}
				}


				window.tuoxie = ui.create.div('hidden', '', game.open_tuoxie);
				window.tuoxie.style.cssText = "display: block;--w: 63px;--h: calc(var(--w) * 50/50);width: var(--w);height: var(--h);left:-155px;bottom:105px;transition:none;background-size:100% 100%";

				window.tuoxie.setBackgroundImage('extension/手杀ui/sayplay/tuoxie.png');
				//这里
				window.tuoxie.onclick = function () {
					window.tuoxie.thrownn = true;
				}

				window.chatBg.appendChild(window.tuoxie);
				lib.setScroll(window.tuoxie);
				clickFK(window.tuoxie);


				//-------------------//

				//-----4---鸡蛋-------//


				game.open_jidan = function () {
					//打开鸡蛋函数
					//这里
					var list = game.players;
					for (i = 0; i < game.players.length; i++) {
						list[i].onclick = function () {
							if (window.jidan.thrownn == true) {
								game.me.throwEmotion(this, 'egg');
								window.shuliang.innerText = window.shuliang.innerText - 1;
							}

						}
					}
				}


				window.jidan = ui.create.div('hidden', '', game.open_jidan);
				window.jidan.style.cssText = "display: block;--w: 63px;--h: calc(var(--w) * 50/50);width: var(--w);height: var(--h);left:-230px;bottom:105px;transition:none;background-size:100% 100%";
				window.jidan.onclick = function () {
					window.jidan.thrownn = true;
				}

				//这里
				window.jidan.setBackgroundImage('extension/手杀ui/sayplay/jidan.png');


				window.chatBg.appendChild(window.jidan);
				lib.setScroll(window.jidan);
				clickFK(window.jidan);


				//-------------------//

				//-----5--菜篮-------//


				game.open_cailan = function () {
					//打开菜篮函数
					var list = game.players;
					for (i = 0; i < game.players.length; i++) {
						list[i].onclick = function () {
							var target = this;
							if (window.cailan.thrownn == true) {
								for (let i = 0; i < 101; i++) {
									setTimeout(() => {
										if (i <= 99)
											game.me.throwEmotion(this, 'flower');
										else game.me.throwEmotion(this, 'wine');
										window.shuliang.innerText = window.shuliang.innerText - 1;
									}, 100 * i);
									setTimeout(() => {
										if (i <= 99) target.throwEmotion(game.me, 'flower');
										else target.throwEmotion(game.me, 'wine')
									}, 100 * i + 1000)
								}
							}
						}
					}

				}


				window.cailan = ui.create.div('hidden', '', game.open_cailan);
				window.cailan.style.cssText = "display: block;--w: 63px;--h: calc(var(--w) * 50/50);width: var(--w);height: var(--h);left:-80px;bottom:173px;transition:none;background-size:100% 100%";

				window.cailan.setBackgroundImage('extension/手杀ui/sayplay/cailan.png');
				window.cailan.onclick = function () {
					window.cailan.thrownn = true;
				}

				window.chatBg.appendChild(window.cailan);
				lib.setScroll(window.cailan);
				clickFK(window.cailan);


				//-------------------//

				//------6--七彩-------//


				game.open_qicai = function () {
					//打开七彩函数
					var list = game.players;
					for (i = 0; i < game.players.length; i++) {
						list[i].onclick = function () {
							var target = this;
							if (window.qicai.thrownn == true) {
								for (let i = 0; i < 101; i++) {
									setTimeout(() => {
										if (i <= 99)
											game.me.throwEmotion(this, 'egg');
										else game.me.throwEmotion(this, 'shoe');
										window.shuliang.innerText = window.shuliang.innerText - 1;
									}, 100 * i);
									setTimeout(() => {
										if (i <= 99) target.throwEmotion(game.me, 'egg');
										else target.throwEmotion(game.me, 'shoe')
									}, 100 * i + 1000)
								}
							}
						}
					}
				}


				window.qicai = ui.create.div('hidden', '', game.open_qicai);
				window.qicai.style.cssText = "display: block;--w: 63px;--h: calc(var(--w) * 50/50);width: var(--w);height: var(--h);left:-80px;bottom:105px;transition:none;background-size:100% 100%";

				window.qicai.setBackgroundImage('extension/手杀ui/sayplay/qicai.png');

				window.qicai.onclick = function () {
					window.qicai.thrownn = true;
				}
				window.chatBg.appendChild(window.qicai);
				lib.setScroll(window.qicai);
				clickFK(window.qicai);


				//-------------------//

				//-----7---小酒-------//


				game.open_xiaojiu = function () {
					//打开小酒函数


				}


				window.xiaojiu = ui.create.div('hidden', '', game.open_xiaojiu);
				window.xiaojiu.style.cssText = "display: block;--w: 63px;--h: calc(var(--w) * 50/50);width: var(--w);height: var(--h);left:-230px;bottom:36px;transition:none;background-size:100% 100%";

				window.xiaojiu.setBackgroundImage('extension/手杀ui/sayplay/xiaojiu.png');


				window.chatBg.appendChild(window.xiaojiu);
				lib.setScroll(window.xiaojiu);
				clickFK(window.xiaojiu);


				//-------------------//

				//-----8---雪球------//


				game.open_xueqiu = function () {
					//打开雪球函数


				}


				window.xueqiu = ui.create.div('hidden', '', game.open_xueqiu);
				window.xueqiu.style.cssText = "display: block;--w: 63px;--h: calc(var(--w) * 50/50);width: var(--w);height: var(--h);left:-155px;bottom:36px;transition:none;background-size:100% 100%";

				window.xueqiu.setBackgroundImage('extension/手杀ui/sayplay/xueqiu.png');


				window.chatBg.appendChild(window.xueqiu);
				lib.setScroll(window.xueqiu);
				clickFK(window.xueqiu);


				//-------------------//


				//------9-虚无-------//


				game.open_xuwu = function () {
					//打开虚无函数


				}


				window.xuwu = ui.create.div('hidden', '', game.open_xuwu);
				window.xuwu.style.cssText = "display: block;--w: 63px;--h: calc(var(--w) * 50/50);width: var(--w);height: var(--h);left:-80px;bottom:36px;transition:none;background-size:100% 100%";

				window.xuwu.setBackgroundImage('extension/手杀ui/sayplay/xuwu.png');


				window.chatBg.appendChild(window.xuwu);
				lib.setScroll(window.xuwu);
				clickFK(window.xuwu);


				//-------------------//

				//--------菜篮子-------//



				window.cailanzi = ui.create.div('hidden', '');
				window.cailanzi.style.cssText = "display: block;--w: 100px;--h: calc(var(--w) * 59/150);width: var(--w);height: var(--h);left:-230px;bottom:250px;transition:none;background-size:100% 100%";

				window.cailanzi.setBackgroundImage('extension/手杀ui/sayplay/cailanzi.png');


				window.chatBg.appendChild(window.cailanzi);


				window.shuliang = ui.create.node('div');
				window.shuliang.innerText = Math.floor(Math.random() * (999 - 100 + 1) + 100);
				window.shuliang.style.cssText = "display: block;left:-180px;bottom:260px;font-family:'shousha';color:#97856a;font-weight: 900; text-shadow:none;transition:none;background-size:100% 100%";

				window.chatBg.appendChild(window.shuliang);

				//-------------------//




				game.open_emoji = function () {//打开emoji函数
					if (window.dialog_lifesay) {
						if (window.dialog_lifesay.show) window.dialog_lifesay.style.left = '-' + window.dialog_lifesay.style.width;
						setTimeout(function () {
							window.dialog_lifesay.hide();
							window.dialog_lifesay.show = false;
						}, 1000);
					}
					if (window.chatBackground) {
						if (window.chatBackground.show) window.chatBackground.style.left = '100%';
						setTimeout(function () {
							window.chatBackground.hide();
							window.chatBackground.show = false;
						}, 1000);
					}
					if (window.dialog_emoji != undefined && window.dialog_emoji.show) {//控制面板打开，首次调用此函数时打开面板，再次调用时关闭
						window.dialog_emoji.hide();
						window.dialog_emoji.show = false;
						return;
					}
					var dialogEmoji = {};
					window.dialog_emoji = ui.create.div('hidden');
					window.dialog_emoji.style['z-index'] = 999999999;
					window.dialog_emoji.classList.add('popped');
					window.dialog_emoji.classList.add('static');
					window.dialog_emoji.show = true;
					window.dialog_emoji.style.height = '280px';//整个选择emoji对话框的宽高
					window.dialog_emoji.style.width = '360px';
					window.dialog_emoji.style.left = 'calc( 50% - 180px)';
					window.dialog_emoji.style.top = '100%';//这里弄一个上移的动画
					window.dialog_emoji.style.transition = 'all 1s';
					setTimeout(function () {
						window.dialog_emoji.style.top = 'calc( 25% - 50px )';//上移后的位置
					}, 100);
					window.dialog_emoji.style.opacity = 1;
					window.dialog_emoji.style.borderRadius = '8px';
					window.dialog_emoji.style.backgroundSize = "100% 100%";
					window.dialog_emoji.setBackgroundImage('extension/手杀ui/sayplay/nobg.png');//把背景dialog设置为透明
					window.dialog_emoji.style['box-shadow'] = 'none';
					ui.window.appendChild(window.dialog_emoji);
					dialogEmoji.background = window.dialog_emoji;
					window.dialog_emojiBgPict = ui.create.div('hidden');//这是现在外层div
					window.dialog_emojiBgPict.style.height = '100%';
					window.dialog_emojiBgPict.style.width = '100%';
					window.dialog_emojiBgPict.style.left = '0%';
					window.dialog_emojiBgPict.style.top = '0%';
					window.dialog_emojiBgPict.style.borderRadius = '8px';
					window.dialog_emojiBgPict.style.backgroundSize = "100% 100%";
					window.dialog_emojiBgPict.setBackgroundImage('extension/手杀ui/sayplay/saydiv.png');
					window.dialog_emojiBgPict.style['box-shadow'] = 'none';
					window.dialog_emoji.appendChild(window.dialog_emojiBgPict);
					window.dialog_emojiBgColor = ui.create.div('hidden');//这是内层div
					window.dialog_emojiBgColor.style.height = '70%';
					window.dialog_emojiBgColor.style.width = '80%';
					window.dialog_emojiBgColor.style.left = '10%';
					window.dialog_emojiBgColor.style.top = '10%';
					window.dialog_emojiBgColor.style.borderRadius = '8px';
					window.dialog_emojiBgColor.style.backgroundSize = "100% 100%";
					window.dialog_emojiBgColor.setBackgroundImage('extension/手杀ui/sayplay/nobg.png');//把背景设置为透明
					window.dialog_emojiBgColor.style['overflow-y'] = 'scroll';
					lib.setScroll(window.dialog_emojiBgColor);
					window.dialog_emoji.appendChild(window.dialog_emojiBgColor);
					for (var i = 0; i < 50; i++) {
						window['dialog_emojiContent_' + i] = ui.create.div('hidden', '', function () {
							game.me.say('<img style=width:34px height:34px src="' + lib.assetURL + 'extension/手杀ui/sayplay/emoji/' + this.pos + '.png">');
							window.dialog_emoji.delete();
							delete window.dialog_emoji;
							window.dialog_emoji = undefined;
						});
						window['dialog_emojiContent_' + i].style.height = '34px';//单个表情的宽高
						window['dialog_emojiContent_' + i].style.width = '34px';
						window['dialog_emojiContent_' + i].style.left = '0px';
						window['dialog_emojiContent_' + i].style.top = '0px';
						window['dialog_emojiContent_' + i].style.position = 'relative';
						window['dialog_emojiContent_' + i].pos = i;
						window['dialog_emojiContent_' + i].setBackgroundImage('extension/手杀ui/sayplay/emoji/' + i + '.png');
						window['dialog_emojiContent_' + i].style.backgroundSize = "100% 100%";
						window.dialog_emojiBgColor.appendChild(window['dialog_emojiContent_' + i]);
						clickFK(window['dialog_emojiContent_' + i]);
					}
				}
				window.chatButton2 = ui.create.div('hidden', '', game.open_emoji);
				window.chatButton2.style.cssText = "display: block;--w: 80px;--h: calc(var(--w) * 82/98);width: var(--w);height: var(--h);left:150px;bottom:25px;transition:none;background-size:100% 100%";
				/*window.chatButton2.style.height='70px';
				window.chatButton2.style.width='80px';
				window.chatButton2.style.left='150px';
				window.chatButton2.style.bottom='10px';
				window.chatButton2.style.transition='none';
				window.chatButton2.style.backgroundSize="100% 100%";*/
				window.chatButton2.setBackgroundImage('extension/手杀ui/sayplay/emoji.png');

				lib.setScroll(window.chatButton2);
				window.chatBg.appendChild(window.chatButton2);
				clickFK(window.chatButton2);

				game.open_jilu = function () {//打开记录函数
					game.showChatWord();
				}
				window.chatButton3 = ui.create.div('hidden', '', game.open_jilu);
				window.chatButton3.style.cssText = "display: block;--w: 80px;--h: calc(var(--w) * 82/98);width: var(--w);height: var(--h);left:260px;bottom:25px;transition:none;background-size:100% 100%";
				/*window.chatButton3.style.height='70px';
				window.chatButton3.style.width='80px';
				window.chatButton3.style.left='260px';
				window.chatButton3.style.bottom='10px';
				window.chatButton3.style.transition='none';
				window.chatButton3.style.backgroundSize="100% 100%";*/
				window.chatButton3.setBackgroundImage('extension/手杀ui/sayplay/jilu.png');

				lib.setScroll(window.chatButton3);
				window.chatBg.appendChild(window.chatButton3);
				clickFK(window.chatButton3);

				window.chatSendBottom = ui.create.div('', '', function () {//发送按钮
					if (!window.input) return;
					if (window.input.value == undefined) return;
					window.sendInfo(window.input.value);
				});
				window.chatSendBottom.style.cssText = "display: block;--w: 91px;--h: calc(var(--w) * 62/160);width: var(--w);height: var(--h);left:70%;top:33px;transition:none;background-size:100% 100%;text-align:center;border-randius:8px;";
				/*window.chatSendBottom.style.height='50px';
				window.chatSendBottom.style.width='25%';
				window.chatSendBottom.style.left='calc( 60% + 62px )';
				window.chatSendBottom.style.top='23px';
				window.chatSendBottom.style.transition='none';
				window.chatSendBottom.style['text-align']='center';
				window.chatSendBottom.style.borderRadius='8px';
				window.chatSendBottom.style.backgroundSize="100% 100%";*/

				window.chatSendBottom.setBackgroundImage('extension/手杀ui/sayplay/buttonsend.png');
				window.chatSendBottom.innerHTML = '<span style="color:white;font-size:22px;line-height:32px;font-weight:400;font-family:shousha">发送</span>';
				window.chatBg.appendChild(window.chatSendBottom);
				clickFK(window.chatSendBottom);
				game.updateChatWord = function (str) {
					window.chatBackground2.innerHTML = str;
				}
				game.addChatWord();

				window.sendInfo = function (content) {
					game.me.say(content);
					window.input.value = '';
				}
				//房间
				window.chatInputOut = ui.create.div('hidden');
				window.chatInputOut.style.cssText = "display: block;--w: 265px;--h: calc(var(--w) * 50/280);width: var(--w);height: var(--h);left:30px;top:30px;transition:none;background-size:100% 100%;pointer-events:none;z-index:6;";
				/*window.chatInputOut.style.height='22px';
				window.chatInputOut.style.width='60%';
				window.chatInputOut.style.left='40px';
				window.chatInputOut.style.top='40px';
				window.chatInputOut.style.transition='none';
				window.chatInputOut.style.backgroundSize="100% 100%";*/
				window.chatInputOut.style.backgroundImage = "url('" + lib.assetURL + "extension/手杀ui/sayplay/sayX.png')";

				window.chatBg.appendChild(window.chatInputOut);
				//输入框
				window.chatInput = ui.create.dialog('hidden');
				window.chatInput.style.height = '22px';
				window.chatInput.style.width = '42%';//设置输入框宽度
				window.chatInput.style.left = '27%';
				window.chatInput.style.top = '42px';
				window.chatInput.style.transition = 'none';
				window.chatBg.appendChild(window.chatInput);
				window.ipt = ui.create.div();
				window.ipt.style.height = '22px';
				window.ipt.style.width = '100%';
				window.ipt.style.top = '0px';
				window.ipt.style.left = '0px';
				window.ipt.style.margin = '0px';
				window.ipt.style.borderRadius = '0px';
				window.ipt.style['background-image'] = 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4))';
				//window.ipt.style['box-shadow']='rgba(0, 0, 0, 0.4) 0 0 0 1px, rgba(0, 0, 0, 0.2) 0 3px 10px';
				if (window.input && window.input.value) window.input_value = window.input.value;
				window.ipt.innerHTML = '<input type="text" value=' + (window.input_value || "请输入文字") + ' style="color:white;font-family:shousha;width:calc(100% - 10px);text-align:left;"></input>';
				window.input = window.ipt.querySelector('input');
				window.input.style.backgroundImage = "url('" + lib.assetURL + "extension/手杀ui/sayplay/say.png')";
				window.input.style.backgroundSize = "120% 120%";
				window.input.style['box-shadow'] = 'none';
				window.input.onclick = function (e) {
					e.stopPropagation();
				};
				window.input.onfocus = function () {
					if (this.value == '请输入文字') this.value = '';
				};
				window.input.onkeydown = function (e) {
					e.stopPropagation();
					if (e.keyCode == 13) {
						var value = this.value;
						if (!value) return;
						if (typeof value != 'string') value = '' + value;
						window.sendInfo(value);
					};
				};
				window.chatInput.add(window.ipt);
			}

			//聊天记录栏
			game.showChatWord = function () {
				if (window.dialog_lifesay) {
					if (window.dialog_lifesay.show) window.dialog_lifesay.style.left = '-' + window.dialog_lifesay.style.width;
					setTimeout(function () {
						window.dialog_lifesay.hide();
						window.dialog_lifesay.show = false;
					}, 1000);
				}
				if (window.dialog_emoji) {
					if (window.dialog_emoji.show) window.dialog_emoji.style.top = '100%';
					setTimeout(function () {
						window.dialog_emoji.hide();
						window.dialog_emoji.show = false;
					}, 1000);
				}
				if (window.chatBackground != undefined && window.chatBackground.show) {//控制面板打开，首次调用此函数时打开面板，再次调用时关闭
					window.chatBackground.hide();
					window.chatBackground.show = false;
					return;
				}
				window.chatBackground = ui.create.div('hidden');
				window.chatBackground.style['z-index'] = 999999999;
				//window.chatBackground.classList.add('popped');
				window.chatBackground.classList.add('static');
				window.chatBackground.show = true;
				window.chatBackground.style.transition = 'all 1s';
				window.chatBackground.style.height = '330px';//调整对话框背景大小，位置
				window.chatBackground.style.width = '600px';
				window.chatBackground.style.top = 'calc( 20% - 100px )';//这里弄一个左移的动画
				window.chatBackground.style.left = '100%';//这里弄一个左移的动画
				setTimeout(function () {
					window.chatBackground.style.left = 'calc( 50% - 300px)';//左移后的位置
				}, 100);
				window.chatBackground.style.bottom = 'calc( ' + window.chatBg.style.height + ' + ' + '5px )';
				window.chatBackground.style.opacity = 1;
				window.chatBackground.style.borderRadius = '10px';
				game.mouseChatDiv = function (div) {
					;//查看时显示，不查看时，对话框虚化
					if (lib.device == undefined) {
						div.onmouseover = function () {
							this.style.opacity = 1.0;
						};
						div.onmouseout = function () {
							this.style.opacity = 0.25;
						};
					}
					else {
						div.onclick = function () {
							if (div.style.opacity == 0.25) this.style.opacity = 0.75;
							else this.style.opacity = 0.25;
						}
					}
				}
				game.mouseChatDiv(window.chatBackground);
				window.chatBackground.style.backgroundSize = "100% 100%";
				window.chatBackground.setBackgroundImage('extension/手杀ui/sayplay/nobg.png');//把背景dialog设置为透明
				window.chatBackground.style['box-shadow'] = 'none';
				ui.window.appendChild(window.chatBackground);

				window.chatBackgroundPict = ui.create.div('hidden');//外层div
				window.chatBackgroundPict.style.height = '100%';
				window.chatBackgroundPict.style.width = '100%';
				window.chatBackgroundPict.style.left = '0%';
				window.chatBackgroundPict.style.bottom = '0%';
				window.chatBackgroundPict.style.transition = 'none';
				window.chatBackgroundPict.style.backgroundColor = 'none';
				window.chatBackgroundPict.style.borderRadius = '8px';
				window.chatBackgroundPict.style.backgroundSize = "100% 100%";
				window.chatBackgroundPict.setBackgroundImage('extension/手杀ui/sayplay/saydiv.png');
				window.chatBackgroundPict.style['box-shadow'] = 'none';
				window.chatBackground.appendChild(window.chatBackgroundPict);

				window.chatBackgroundColor = ui.create.div('hidden');//内层div
				window.chatBackgroundColor.style.height = '70%';
				window.chatBackgroundColor.style.width = '80%';
				window.chatBackgroundColor.style.left = '10%';
				window.chatBackgroundColor.style.top = '10%';
				window.chatBackgroundColor.style.transition = 'none';
				window.chatBackgroundColor.style.borderRadius = '8px';
				window.chatBackgroundColor.style.backgroundSize = "100% 100%";
				window.chatBackgroundColor.setBackgroundImage('extension/手杀ui/sayplay/nobg.png');//把背景设置为透明
				window.chatBackground.appendChild(window.chatBackgroundColor);

				window.chatBackground2 = ui.create.div('hidden');
				window.chatBackground2.style.height = '100%';
				window.chatBackground2.style.width = '100%';
				window.chatBackground2.style.left = '0%';
				window.chatBackground2.style.bottom = '0%';
				window.chatBackground2.style.transition = 'none';
				window.chatBackground2.style['text-align'] = 'left';
				window.chatBackground2.innerHTML = '';
				window.chatBackground2.style['overflow-y'] = 'scroll';
				lib.setScroll(window.chatBackground2);
				window.chatBackgroundColor.appendChild(window.chatBackground2);
				game.addChatWord();
			}

			lib.skill._wmkzSayChange = {
				trigger: {
					global: ["gameStart", "phaseBegin", "phaseAfter", "useCardAfter"],
				},
				forced: true,
				filter: function (event, player) {
					return player.change_sayFunction != true;
				},
				content: function () {
					player.change_sayFunction = true;
					player.sayTextWord = player.say;
					player.say = function (str) {//对应上面函数，把其他player的发言记录到框里
						game.addChatWord('<font color=yellow>' + get.translation('' + player.name) + '</font><font color=white>：' + str + '</font>');
						player.sayTextWord(str);
					}
				},
			}
			//----------------------------------------------------------------------------------------//







			//阶段提示框架（俺杀）
			//自定义播放图片
			game.as_removeText = function () {
				if (_status.as_showText) {
					_status.as_showText.remove();
					delete _status.as_showText;
				}
				if (_status.as_showImage) {
					_status.as_showImage.show();
				}
			}
			game.as_showText = function (str, pos, time, font, size, color) {
				if (!str) return false;
				if (!pos || !Array.isArray(pos)) {
					pos = [0, 0, 100, 100];
				}
				if (!time || (isNaN(time) && time !== true)) time = 3;
				if (!font) font = 'shousha';
				if (!size) size = 16;
				if (!color) color = '#ffffff';
				if (_status.as_showText) {
					_status.as_showText.remove();
					delete _status.as_showText;
				}

				var div = ui.create.div('', str, ui.window);
				div.style.cssText = 'z-index:-3; pointer-events:none; font-family:' + font +
					'; font-size:' + size + 'px; color:' + color + '; line-height:' + size * 1.2 +
					'px; text-align:center; left:' + (pos[0] + pos[2] / 2) + '%; top:' + pos[1] +
					'%; width:0%; height:' + pos[3] +
					'%; position:absolute; transition-property:all; transition-duration:1s';
				_status.as_showText = div;

				if (_status.as_showImage) {
					_status.as_showImage.hide();
				}

				setTimeout(function () {
					div.style.left = pos[0] + '%';
					div.style.width = pos[2] + '%';
				}, 1);

				if (time === true) return true;
				setTimeout(function () {
					if (_status.as_showText) {
						_status.as_showText.remove();
						delete _status.as_showText;
					}
					if (_status.as_showImage) {
						_status.as_showImage.show();
					}
				}, time * 1000);

				return true;
			}
			game.as_removeImage = function () {
				if (_status.as_showImage) {
					_status.as_showImage.remove();
					delete _status.as_showImage;
				}
			}
			game.as_showImage = function (url, pos, time) {
				if (!url) return false;
				if (!pos || !Array.isArray(pos)) {
					pos = [0, 0, 100, 100];
				}
				if (!time || (isNaN(time) && time !== true)) time = 3;
				if (_status.as_showImage) {
					_status.as_showImage.remove();
					delete _status.as_showImage;
				}

				var div = ui.create.div('', '', ui.window);
				div.style.cssText = 'z-index:-1; pointer-events:none; left:' + (pos[0] + pos[2] / 2) +
					'%; top:' + pos[1] + '%; width:0%; height:' + pos[3] +
					'%; position:absolute; background-size:100% 100%; background-position:center center; background-image:url(' +
					lib.assetURL + url + '); transition-property:all; transition-duration:1s';
				_status.as_showImage = div;

				if (_status.as_showText) {
					_status.as_showImage.hide();
				}

				setTimeout(function () {
					div.style.left = pos[0] + '%';
					div.style.width = pos[2] + '%';
				}, 1);

				if (time === true) return true;
				setTimeout(function () {
					if (_status.as_showImage) {
						_status.as_showImage.remove();
						delete _status.as_showImage;
					}
				}, time * 1000);

				return true;
			};
			//-----华丽分割线-----// 

			// if (get.mode() == 'boss') return

			//定时器
			setTimeout(function () {
				lib.init.init = function () {
					if (typeof __dirname === 'string' && __dirname.length) {
						var dirsplit = __dirname.split('/');
						for (var i = 0; i < dirsplit.length; i++) {
							if (dirsplit[i]) {
								var c = dirsplit[i][0];
								lib.configprefix += /[A-Z]|[a-z]/.test(c) ? c : '_';
							}
						}
						lib.configprefix += '_';
					}
					window.resetGameTimeout = setTimeout(lib.init.reset, parseInt(localStorage.getItem(lib.configprefix + 'loadtime')) || 5000);
					if (window.cordovaLoadTimeout) {
						clearTimeout(window.cordovaLoadTimeout);
						delete window.cordovaLoadTimeout;
					}
					var links = document.head.querySelectorAll('link');
					for (var i = 0; i < links.length; i++) {
						if (links[i].href.indexOf('app/color.css') != -1) {
							links[i].remove();
							break;
						}
					}
					var index = window.location.href.indexOf('index.html?server=');
					if (index != -1) {
						window.isNonameServer = window.location.href.slice(index + 18);
						window.nodb = true;
					}
					else {
						index = localStorage.getItem(lib.configprefix + 'asserver');
						if (index) {
							window.isNonameServer = index;
							window.isNonameServerIp = lib.hallURL;
						}
					}

					var htmlbg = localStorage.getItem(lib.configprefix + 'background');
					if (htmlbg) {
						if (htmlbg[0] == '[') {
							try {
								htmlbg = JSON.parse(htmlbg);
								htmlbg = htmlbg[get.rand(htmlbg.length)];
								if (htmlbg.indexOf('custom_') == 0) {
									throw ('err');
								}
								_status.htmlbg = htmlbg;
							}
							catch (e) {
								htmlbg = null;
							}
						}
						if (htmlbg) {
							document.documentElement.style.backgroundImage = 'url("' + lib.assetURL + 'image/background/' + htmlbg + '.jpg")';
							document.documentElement.style.backgroundSize = 'cover';
							document.documentElement.style.backgroundPosition = '50% 50%';
						}
					}

					lib.get = get;
					lib.ui = ui;
					lib.ai = ai;
					lib.game = game;

					HTMLDivElement.prototype.animate = function (name, time) {
						var that;
						if (get.is.mobileMe(this) && name == 'target') {
							that = ui.mebg;
						}
						else {
							that = this;
						}
						that.classList.add(name);
						setTimeout(function () {
							that.classList.remove(name);
						}, time || 1000);
						return this;
					};
					HTMLDivElement.prototype.hide = function () {
						this.classList.add('hidden');
						return this;
					};
					HTMLDivElement.prototype.unfocus = function () {
						if (lib.config.transparent_dialog) this.classList.add('transparent');
						return this;
					};
					HTMLDivElement.prototype.refocus = function () {
						this.classList.remove('transparent');
						return this;
					};
					HTMLDivElement.prototype.show = function () {
						this.classList.remove('hidden');
						return this;
					};
					HTMLDivElement.prototype.delete = function (time, callback) {
						if (this.timeout) {
							clearTimeout(this.timeout);
							delete this.timeout;
						}
						if (!this._listeningEnd || this._transitionEnded) {
							if (typeof time != 'number') time = 500;
							this.classList.add('removing');
							var that = this;
							this.timeout = setTimeout(function () {
								that.remove();
								that.classList.remove('removing');
								if (typeof callback == 'function') {
									callback();
								}
							}, time);
						}
						else {
							this._onEndDelete = true;
						}
						return this;
					};
					HTMLDivElement.prototype.goto = function (position, time) {
						if (this.timeout) {
							clearTimeout(this.timeout);
							delete this.timeout;
						}

						if (typeof time != 'number') time = 500;
						this.classList.add('removing');

						var that = this;
						this.timeout = setTimeout(function () {
							if (!that.destroyed) {
								position.appendChild(that);
							}
							that.classList.remove('removing');
							delete that.destiny;
						}, time);
						this.destiny = position;
						return this;
					};
					HTMLDivElement.prototype.fix = function () {
						clearTimeout(this.timeout);
						delete this.timeout;
						delete this.destiny;
						this.classList.remove('removing');
						return this;
					};
					HTMLDivElement.prototype.setBackground = function (name, type, ext, subfolder) {
						if (!name) return;
						var src;
						if (ext == 'noskin') {
							ext = '.jpg';
						}
						ext = ext || '.jpg';
						subfolder = subfolder || 'default'
						if (type) {
							var dbimage = null, extimage = null, modeimage = null;
							var nameinfo;
							var gzbool = false;
							var mode = get.mode();
							if (type == 'character') {
								if (lib.characterPack['mode_' + mode] && lib.characterPack['mode_' + mode][name]) {
									if (mode == 'guozhan') {
										nameinfo = lib.character[name];
										if (name.indexOf('gz_shibing') == 0) {
											name = name.slice(3, 11);
										}
										else {
											if (lib.config.mode_config.guozhan.guozhanSkin && lib.character[name] && lib.character[name][4].contains('gzskin')) gzbool = true;
											name = name.slice(3);
										}
									}
									else {
										modeimage = mode;
									}
								}
								else if (lib.character[name]) {
									nameinfo = lib.character[name];
								}
								else if (name.indexOf('::') != -1) {
									name = name.split('::');
									modeimage = name[0];
									name = name[1];
								}
							}
							if (!modeimage && nameinfo && nameinfo[4]) {
								for (var i = 0; i < nameinfo[4].length; i++) {
									if (nameinfo[4][i].indexOf('ext:') == 0) {
										extimage = nameinfo[4][i]; break;
									}
									else if (nameinfo[4][i].indexOf('db:') == 0) {
										dbimage = nameinfo[4][i]; break;
									}
									else if (nameinfo[4][i].indexOf('mode:') == 0) {
										modeimage = nameinfo[4][i].slice(5); break;
									}
									else if (nameinfo[4][i].indexOf('character:') == 0) {
										name = nameinfo[4][i].slice(10); break;
									}
								}
							}
							if (extimage) {
								src = extimage.replace(/ext:/, 'extension/');
							}
							else if (dbimage) {
								this.setBackgroundDB(dbimage.slice(3));
								return this;
							}
							else if (modeimage) {
								src = 'image/mode/' + modeimage + '/character/' + name + ext;
							}
							else if (type == 'character' && lib.config.skin[name] && arguments[2] != 'noskin') {
								src = 'image/skin/' + name + '/' + lib.config.skin[name] + ext;
							}
							else {
								if (type == 'character') {
									src = 'image/character/' + (gzbool ? 'gz_' : '') + name + ext;
								}
								else {
									src = 'image/' + type + '/' + subfolder + '/' + name + ext;
								}
							}
						}
						else {
							src = 'image/' + name + ext;
						}
						this.setBackgroundImage(src);
						this.style.backgroundSize = "cover";
						return this;
					};
					HTMLDivElement.prototype.setBackgroundDB = function (img) {
						var node = this;
						game.getDB('image', img, function (src) {
							node.style.backgroundImage = "url('" + src + "')";
							node.style.backgroundSize = "cover";
						});
					};
					HTMLDivElement.prototype.setBackgroundImage = function (img) {
						this.style.backgroundImage = 'url("' + lib.assetURL + img + '")';
					},
						HTMLDivElement.prototype.listen = function (func) {
							if (lib.config.touchscreen) {
								this.addEventListener('touchend', function (e) {
									if (!_status.dragged) {
										func.call(this, e);
									}
								});
								var fallback = function (e) {
									if (!_status.touchconfirmed) {
										func.call(this, e);
									}
									else {
										this.removeEventListener('click', fallback);
									}
								}
								this.addEventListener('click', fallback);
							}
							else {
								this.addEventListener('click', func);
							}
							return this;
						};
					HTMLDivElement.prototype.listenTransition = function (func, time) {
						var that = this;
						var done = false;
						var callback = function () {
							if (!done) {
								func.call(that);
								done = true;
							}
						};
						this.addEventListener('webkitTransitionEnd', callback);
						return setTimeout(callback, time || 1000);
					};
					HTMLDivElement.prototype.setPosition = function () {
						var position;
						if (arguments.length == 4) {
							position = [];
							for (var i = 0; i < arguments.length; i++) position.push(arguments[i]);
						}
						else if (arguments.length == 1 && Array.isArray(arguments[0]) && arguments[0].length == 4) {
							position = arguments[0];
						}
						else {
							return this;
						}
						var top = 'calc(' + position[0] + '% ';
						if (position[1] > 0) top += '+ ' + position[1] + 'px)';
						else top += '- ' + Math.abs(position[1]) + 'px)';
						var left = 'calc(' + position[2] + '% ';
						if (position[3] > 0) left += '+ ' + position[3] + 'px)';
						else left += '- ' + Math.abs(position[3]) + 'px)';
						this.style.top = top;
						this.style.left = left;
						return this;
					};
					HTMLDivElement.prototype.css = function (style) {
						for (var i in style) {
							if (i == 'innerHTML') {
								this.innerHTML = style[i];
							}
							else {
								this.style[i] = style[i];
							}
						}
						return this;
					};
					HTMLTableElement.prototype.get = function (row, col) {
						if (row < this.childNodes.length) {
							return this.childNodes[row].childNodes[col];
						}
					};
					Array.prototype.filterInD = function (pos) {
						if (!pos) pos = 'o';
						var list = [];
						for (var i = 0; i < this.length; i++) {
							if (pos.indexOf(get.position(this[i], true)) != -1) list.push(this[i]);
						}
						return list;
					};
					Array.prototype.find = function (item) {
						return this.indexOf(item);
					};
					Array.prototype.contains = function (item) {
						return this.indexOf(item) != -1;
					};
					Array.prototype.add = function () {
						for (var i = 0; i < arguments.length; i++) {
							if (this.contains(arguments[i])) {
								return false;
							}
							this.push(arguments[i]);
						}
						return this;
					};
					Array.prototype.addArray = function (arr) {
						for (var i = 0; i < arr.length; i++) {
							this.add(arr[i]);
						}
						return this;
					};
					Array.prototype.remove = function (item) {
						if (Array.isArray(item)) {
							for (var i = 0; i < item.length; i++) this.remove(item[i]);
							return;
						}
						var pos = this.find(item);
						if (pos == -1) {
							return false;
						}
						this.splice(pos, 1);
						return this;
					};
					Array.prototype.removeArray = function (arr) {
						for (var i = 0; i < arr.length; i++) {
							this.remove(arr[i]);
						}
						return this;
					};
					Array.prototype.randomGet = function () {
						var arr = this.slice(0);
						for (var i = 0; i < arguments.length; i++) arr.remove(arguments[i]);
						return arr[Math.floor(Math.random() * arr.length)];
					};
					Array.prototype.randomRemove = function (num) {
						if (typeof num == 'number') {
							var list = [];
							for (var i = 0; i < num; i++) {
								if (this.length) {
									list.push(this.randomRemove());
								}
								else {
									break;
								}
							}
							return list;
						}
						else {
							return this.splice(Math.floor(Math.random() * this.length), 1)[0];
						}
					};
					Array.prototype.randomSort = function () {
						var list = [];
						while (this.length) {
							list.push(this.randomRemove());
						}
						for (var i = 0; i < list.length; i++) {
							this.push(list[i]);
						}
						return this;
					};
					Array.prototype.randomGets = function (num) {
						if (num > this.length) {
							num = this.length;
						}
						var arr = this.slice(0);
						var list = [];
						for (var i = 0; i < num; i++) {
							list.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
						}
						return list;
					};
					Array.prototype.sortBySeat = function (target) {
						lib.tempSortSeat = target;
						this.sort(lib.sort.seat);
						delete lib.tempSortSeat;
						return this;
					};
					if (!Array.from) {
						Array.from = function (args) {
							var list = [];
							if (args && args.length) {
								for (var i = 0; i < args.length; i++) {
									list.push(args[i]);
								}
							}
							return list;
						}
					}
					window.onkeydown = function (e) {
						if (!ui.menuContainer || !ui.menuContainer.classList.contains('hidden')) {
							if (e.keyCode == 116 || ((e.ctrlKey || e.metaKey) && e.keyCode == 82)) {
								if (e.shiftKey) {
									if (confirm('是否重置游戏？')) {
										var noname_inited = localStorage.getItem('noname_inited');
										var onlineKey = localStorage.getItem(lib.configprefix + 'key');
										localStorage.clear();
										if (noname_inited) {
											localStorage.setItem('noname_inited', noname_inited);
										}
										if (onlineKey) {
											localStorage.setItem(lib.configprefix + 'key', onlineKey);
										}
										if (indexedDB) indexedDB.deleteDatabase(lib.configprefix + 'data');
										game.reload();
										return;
									}
								}
								else {
									game.reload();
								}
							}
							else if (e.keyCode == 83 && (e.ctrlKey || e.metaKey)) {
								if (window.saveNonameInput) {
									window.saveNonameInput();
								}
								e.preventDefault();
								e.stopPropagation();
								return false;
							}
							else if (e.keyCode == 74 && (e.ctrlKey || e.metaKey) && lib.node) {
								lib.node.debug();
							}
						}
						else {
							game.closePopped();
							var dialogs = document.querySelectorAll('#window>.dialog.popped:not(.static)');
							for (var i = 0; i < dialogs.length; i++) {
								dialogs[i].delete();
							}
							if (e.keyCode == 32) {
								var node = ui.window.querySelector('pausedbg');
								if (node) {
									node.click();
								}
								else {
									ui.click.pause();
								}
							}
							else if (e.keyCode == 65) {
								if (ui.auto) ui.auto.click();
							}
							else if (e.keyCode == 87) {
								if (ui.wuxie && ui.wuxie.style.display != 'none') {
									ui.wuxie.classList.toggle('glow')
								}
								else if (ui.tempnowuxie) {
									ui.tempnowuxie.classList.toggle('glow')
								}
							}
							else if (e.keyCode == 116 || ((e.ctrlKey || e.metaKey) && e.keyCode == 82)) {
								if (e.shiftKey) {
									if (confirm('是否重置游戏？')) {
										var noname_inited = localStorage.getItem('noname_inited');
										var onlineKey = localStorage.getItem(lib.configprefix + 'key');
										localStorage.clear();
										if (noname_inited) {
											localStorage.setItem('noname_inited', noname_inited);
										}
										if (onlineKey) {
											localStorage.setItem(lib.configprefix + 'key', onlineKey);
										}
										if (indexedDB) indexedDB.deleteDatabase(lib.configprefix + 'data');
										game.reload();
										return;
									}
								}
								else {
									game.reload();
								}
							}
							else if (e.keyCode == 83 && (e.ctrlKey || e.metaKey)) {
								e.preventDefault();
								e.stopPropagation();
								return false;
							}
							else if (e.keyCode == 74 && (e.ctrlKey || e.metaKey) && lib.node) {
								lib.node.debug();
							}
							// else if(e.keyCode==27){
							// 	if(!ui.arena.classList.contains('paused')) ui.click.config();
							// }
						}
					};
					window.onload = function () {
						if (lib.device) {
							var script = document.createElement('script');
							script.src = 'cordova.js';
							document.body.appendChild(script);
							document.addEventListener('deviceready', function () {
								if (lib.init.cordovaReady) {
									lib.init.cordovaReady();
									delete lib.init.cordovaReady;
								}
							});
						}
						if (_status.packLoaded) {
							delete _status.packLoaded;
							lib.init.onload();
						}
						else {
							_status.windowLoaded = true;
						}
					};
					window.onerror = function (msg, src, line, column, err) {
						var str = msg;
						if (_status && _status.event) {
							var evt = _status.event;
							str += ('\n' + evt.name + ': ' + evt.step);
							if (evt.parent) str += '\n' + evt.parent.name + ': ' + evt.parent.step;
							if (evt.parent && evt.parent.parent) str += '\n' + evt.parent.parent.name + ': ' + evt.parent.parent.step;
							if (evt.player || evt.target || evt.source || evt.skill || evt.card) {
								str += '\n-------------'
							}
							if (evt.player) {
								str += '\nplayer: ' + evt.player.name;
							}
							if (evt.target) {
								str += '\ntarget: ' + evt.target.name;
							}
							if (evt.source) {
								str += '\nsource: ' + evt.source.name;
							}
							if (evt.skill) {
								str += '\nskill: ' + evt.skill.name;
							}
							if (evt.card) {
								str += '\ncard: ' + evt.card.name;
							}
						}
						str += '\n-------------';
						str += '\n' + line;
						str += '\n' + column;
						if (err && err.stack) str += '\n' + decodeURI(err.stack);
						alert(str);
						window.ea = Array.from(arguments);
						window.em = msg;
						window.el = line;
						window.ec = column;
						window.eo = err;
						game.print(msg);
						game.print(line);
						game.print(column);
						game.print(decodeURI(err.stack));
						if (!lib.config.errstop) {
							_status.withError = true;
							game.loop();
						}
					};

					if (window.noname_update) {
						lib.version = window.noname_update.version;
						lib.changeLog = window.noname_update.changeLog;
						if (window.noname_update.players) {
							lib.changeLog.push('players://' + JSON.stringify(window.noname_update.players));
						}
						if (window.noname_update.cards) {
							lib.changeLog.push('cards://' + JSON.stringify(window.noname_update.cards));
						}
						delete window.noname_update;
					}
					var noname_inited = localStorage.getItem('noname_inited');
					if (noname_inited && noname_inited !== 'nodejs') {
						var ua = navigator.userAgent.toLowerCase();
						if (ua.indexOf('android') != -1) {
							lib.device = 'android';
						}
						else if (ua.indexOf('iphone') != -1 || ua.indexOf('ipad') != -1) {
							lib.device = 'ios';
						}
						lib.assetURL = noname_inited;
					}
					if (lib.assetURL.indexOf('com.widget.noname.xiaoxuesheng') != '-1') {
						alert('您正在一个不受信任的闭源客户端上运行《无名杀》。建议您更换为其他开源的无名杀客户端，避免给您带来不必要的损失。');
					}

					var config3 = null;
					var proceed = function (config2) {
						if (config3 === null) {
							config3 = config2;
							return;
						}
						if (config2.mode) lib.config.mode = config2.mode;
						if (lib.config.mode_config[lib.config.mode] == undefined) lib.config.mode_config[lib.config.mode] = {};
						for (var i in lib.config.mode_config.global) {
							if (lib.config.mode_config[lib.config.mode][i] == undefined) {
								lib.config.mode_config[lib.config.mode][i] = lib.config.mode_config.global[i];
							}
						}
						if (lib.config.characters) {
							lib.config.defaultcharacters = lib.config.characters.slice(0);
						}
						if (lib.config.cards) {
							lib.config.defaultcards = lib.config.cards.slice(0);
						}
						for (var i in config2) {
							if (i.indexOf('_mode_config') != -1) {
								var thismode = i.substr(i.indexOf('_mode_config') + 13);
								if (!lib.config.mode_config[thismode]) {
									lib.config.mode_config[thismode] = {};
								}
								lib.config.mode_config[thismode][i.substr(0, i.indexOf('_mode_config'))] = config2[i];
							}
							else {
								lib.config[i] = config2[i];
							}
						}
						for (var i in lib.config.translate) {
							lib.translate[i] = lib.config.translate[i];
						}

						lib.config.all.characters = [];
						lib.config.all.cards = [];
						lib.config.all.plays = [];
						lib.config.all.mode = [];

						if (lib.config.debug) {
							lib.init.js(lib.assetURL + 'game', 'asset', function () {
								lib.skin = window.noname_skin_list;
								delete window.noname_skin_list;
								delete window.noname_asset_list;
							});
						}

						if (window.isNonameServer) {
							lib.config.mode = 'connect';
						}
						var pack = window.noname_package;
						delete window.noname_package;
						for (i in pack.character) {
							if (lib.config.all.sgscharacters.contains(i) || lib.config.hiddenCharacterPack.indexOf(i) == -1) {
								lib.config.all.characters.push(i);
								lib.translate[i + '_character_config'] = pack.character[i];
							}
						}
						for (i in pack.card) {
							if (lib.config.all.sgscards.contains(i) || lib.config.hiddenCardPack.indexOf(i) == -1) {
								lib.config.all.cards.push(i);
								lib.translate[i + '_card_config'] = pack.card[i];
							}
						}
						for (i in pack.play) {
							lib.config.all.plays.push(i);
							lib.translate[i + '_play_config'] = pack.play[i];
						}
						for (i in pack.submode) {
							for (var j in pack.submode[i]) {
								lib.translate[i + '|' + j] = pack.submode[i][j];
							}
						}

						if (!lib.config.gameRecord) {
							lib.config.gameRecord = {};
						}
						for (i in pack.mode) {
							if (lib.config.hiddenModePack.indexOf(i) == -1) {
								lib.config.all.mode.push(i);
								lib.translate[i] = pack.mode[i];
								if (!lib.config.gameRecord[i]) {
									lib.config.gameRecord[i] = { data: {} };
								}
							}
						}
						if (lib.config.all.mode.length == 0) {
							lib.config.all.mode.push('identity');
							lib.translate.identity = '身份';
							if (!lib.config.gameRecord.identity) {
								lib.config.gameRecord.identity = { data: {} };
							}
						}
						if (pack.background) {
							for (i in pack.background) {
								if (lib.config.hiddenBackgroundPack.contains(i)) continue;
								lib.configMenu.appearence.config.image_background.item[i] = pack.background[i];
							}
							for (var i = 0; i < lib.config.customBackgroundPack.length; i++) {
								var link = lib.config.customBackgroundPack[i];
								lib.configMenu.appearence.config.image_background.item[link] = link.slice(link.indexOf('_') + 1);
							}
							lib.configMenu.appearence.config.image_background.item.default = '默认';
						}
						if (pack.music) {
							if (lib.device || typeof window.require == 'function') {
								lib.configMenu.audio.config.background_music.item.music_custom = '自定义音乐';
							}
							lib.config.all.background_music = ['music_default'];
							for (i in pack.music) {
								lib.config.all.background_music.push(i);
								lib.configMenu.audio.config.background_music.item[i] = pack.music[i];
							}
							if (lib.config.customBackgroundMusic) {
								for (i in lib.config.customBackgroundMusic) {
									lib.config.all.background_music.push(i);
									lib.configMenu.audio.config.background_music.item[i] = lib.config.customBackgroundMusic[i];
								}
							}
							lib.configMenu.audio.config.background_music.item.music_random = '随机播放';
							lib.configMenu.audio.config.background_music.item.music_off = '关闭';
						}
						if (pack.theme) {
							for (i in pack.theme) {
								lib.configMenu.appearence.config.theme.item[i] = pack.theme[i];
							}
						}
						if (lib.config.extension_sources) {
							for (i in lib.config.extension_sources) {
								lib.configMenu.general.config.extension_source.item[i] = i;
							}
						}

						if (pack.font) {
							ui.css.fontsheet = lib.init.sheet();
							for (i in pack.font) {
								lib.configMenu.appearence.config.name_font.item[i] = pack.font[i];
								lib.configMenu.appearence.config.identity_font.item[i] = pack.font[i];
								lib.configMenu.appearence.config.cardtext_font.item[i] = pack.font[i];
								lib.configMenu.appearence.config.global_font.item[i] = pack.font[i];
								ui.css.fontsheet.sheet.insertRule("@font-face {font-family: '" + i + "'; src: url('" + lib.assetURL + "font/" + i + ".ttf');}", 0);
								if (lib.config.suits_font) ui.css.fontsheet.sheet.insertRule("@font-face {font-family: '" + i + "'; src: url('" + lib.assetURL + "font/suits.ttf');}", 0);
							}
							if (lib.config.suits_font) ui.css.fontsheet.sheet.insertRule("@font-face {font-family: 'Suits'; src: url('" + lib.assetURL + "font/suits.ttf');}", 0);
							lib.configMenu.appearence.config.cardtext_font.item.default = '默认';
							lib.configMenu.appearence.config.global_font.item.default = '默认';
						}

						var ua = navigator.userAgent.toLowerCase();
						if ('ontouchstart' in document) {
							if (!lib.config.totouched) {
								game.saveConfig('totouched', true);
								if (lib.device) {
									game.saveConfig('low_performance', true);
									game.saveConfig('confirm_exit', true);
									game.saveConfig('touchscreen', true);
									game.saveConfig('fold_mode', false);
									if (ua.indexOf('ipad') == -1) {
										game.saveConfig('phonelayout', true);
									}
									else if (lib.device == 'ios') {
										game.saveConfig('show_statusbar_ios', 'overlay');
									}
								}
								else if (confirm('是否切换到触屏模式？（触屏模式可提高触屏设备的响应速度，但无法使用鼠标）')) {
									game.saveConfig('touchscreen', true);
									if (ua.indexOf('iphone') != -1 || ua.indexOf('android') != -1) {
										game.saveConfig('phonelayout', true);
									}
									game.reload();
								}
							}
						}
						else if (lib.config.touchscreen) {
							game.saveConfig('touchscreen', false);
						}
						if (!lib.config.toscrolled && ua.indexOf('macintosh') != -1) {
							game.saveConfig('toscrolled', true);
							game.saveConfig('mousewheel', false);
						}

						var show_splash = lib.config.show_splash;
						if (show_splash == 'off') {
							show_splash = false;
						}
						else if (show_splash == 'init') {
							if (localStorage.getItem('show_splash_off')) {
								show_splash = false;
							}
						}
						localStorage.removeItem('show_splash_off');
						var extensionlist = [];
						if (!localStorage.getItem(lib.configprefix + 'disable_extension')) {
							if (lib.config.extensions && lib.config.extensions.length) {
								window.resetExtension = function () {
									for (var i = 0; i < lib.config.extensions.length; i++) {
										game.saveConfig('extension_' + lib.config.extensions[i] + '_enable', false);
									}
									localStorage.setItem(lib.configprefix + 'disable_extension', true);
								}
							}
							for (var i = 0; i < lib.config.plays.length; i++) {
								if (lib.config.all.plays.indexOf(lib.config.plays[i]) != -1) {
									extensionlist.push(lib.config.plays[i]);
								}
							}
							var alerted = false;
							for (var i = 0; i < lib.config.extensions.length; i++) {
								if (window.bannedExtensions.contains(lib.config.extensions[i])) {
									//if(!alerted) alert('读取某些扩展时出现问题。');
									alerted = true;
									continue;
								}
								var extcontent = localStorage.getItem(lib.configprefix + 'extension_' + lib.config.extensions[i]);
								if (extcontent) {
									// var backup_onload=lib.init.onload;
									_status.evaluatingExtension = true;
									try {
										eval(extcontent);
									}
									catch (e) {
										console.log(e);
									}
									// lib.init.onload=backup_onload;
									_status.evaluatingExtension = false;
								}
								else if (lib.config.mode != 'connect' || (!localStorage.getItem(lib.configprefix + 'directstart') && show_splash)) {
									extensionlist.push(lib.config.extensions[i]);
								}
							}
						}
						else {
							if (lib.config.mode != 'connect' || (!localStorage.getItem(lib.configprefix + 'directstart') && show_splash)) {
								var alerted = false;
								for (var i = 0; i < lib.config.extensions.length; i++) {
									if (window.bannedExtensions.contains(lib.config.extensions[i])) {
										//if(!alerted) alert('读取某些扩展时出现问题。');
										alerted = true;
										continue;
									}
									game.import('extension', { name: lib.config.extensions[i] });
								}
							}
						}
						var loadPack = function () {
							var toLoad = lib.config.all.cards.length + lib.config.all.characters.length + 1;
							var packLoaded = function () {
								toLoad--;
								if (toLoad == 0) {
									if (_status.windowLoaded) {
										delete _status.windowLoaded;
										lib.init.onload();
									}
									else {
										_status.packLoaded = true;
									}
								}
							};
							if (localStorage.getItem(lib.configprefix + 'playback')) {
								toLoad++;
								lib.init.js(lib.assetURL + 'mode', lib.config.mode, packLoaded, packLoaded);
							}
							else if ((localStorage.getItem(lib.configprefix + 'directstart') || !show_splash) &&
								lib.config.all.mode.indexOf(lib.config.mode) != -1) {
								toLoad++;
								lib.init.js(lib.assetURL + 'mode', lib.config.mode, packLoaded, packLoaded);
							}
							lib.init.js(lib.assetURL + 'card', lib.config.all.cards, packLoaded, packLoaded);
							lib.init.js(lib.assetURL + 'character', lib.config.all.characters, packLoaded, packLoaded);
							lib.init.js(lib.assetURL + 'character', 'rank', packLoaded, packLoaded);
							// if(lib.device!='ios'&&lib.config.enable_pressure) lib.init.js(lib.assetURL+'game','pressure');
						};

						var layout = lib.config.layout;
						if (lib.layoutfixed.indexOf(lib.config.mode) !== -1) {
							layout = 'mobile';
						}
						if (layout == 'phone') {
							layout = 'mobile';
							game.saveConfig('layout', 'mobile');
							game.saveConfig('phonelayout', true);
						}
						game.layout = layout;
						if (lib.config.image_background_random) {
							if (_status.htmlbg) {
								game.saveConfig('image_background', _status.htmlbg);
							}
							else {
								var list = [];
								for (var i in lib.configMenu.appearence.config.image_background.item) {
									if (i == 'default') continue;
									list.push(i);
								}
								game.saveConfig('image_background', list.randomGet(lib.config.image_background));
							}
							lib.init.background();
						}
						delete _status.htmlbg;

						window.game = game;
						var styleToLoad = 6;
						var styleLoaded = function () {
							styleToLoad--;
							if (styleToLoad == 0) {
								if (extensionlist.length && (lib.config.mode != 'connect' || show_splash)) {
									var extToLoad = extensionlist.length;
									var extLoaded = function () {
										extToLoad--;
										if (extToLoad == 0) {
											loadPack();
										}
									}
									//读取扩展
									var alerted = false;
									for (var i = 0; i < extensionlist.length; i++) {
										if (window.bannedExtensions.contains(extensionlist[i])) {
											alerted = true;
											extToLoad--;
											if (extToLoad == 0) {
												loadPack();
											}
											continue;
										}
										lib.init.js(lib.assetURL + 'extension/' + extensionlist[i], 'extension', extLoaded, (function (i) {
											return function () {
												game.removeExtension(i);
												extToLoad--;
												if (extToLoad == 0) {
													loadPack();
												}
											}
										}(extensionlist[i])));
									}
								}
								else {
									loadPack();
								}
							}
						};
						if (lib.config.layout != 'default') {
							ui.css.layout = lib.init.css(lib.assetURL + 'layout/' + layout, 'layout', styleLoaded);
						}
						else {
							ui.css.layout = lib.init.css();
							styleToLoad--;
						}
						if (get.is.phoneLayout()) {
							ui.css.phone = lib.init.css(lib.assetURL + 'layout/default', 'phone', styleLoaded);
						}
						else {
							ui.css.phone = lib.init.css();
							styleToLoad--;
						}
						ui.css.theme = lib.init.css(lib.assetURL + 'theme/' + lib.config.theme, 'style', styleLoaded);
						ui.css.card_style = lib.init.css(lib.assetURL + 'theme/style/card', lib.config.card_style, styleLoaded);
						ui.css.cardback_style = lib.init.css(lib.assetURL + 'theme/style/cardback', lib.config.cardback_style, styleLoaded);
						ui.css.hp_style = lib.init.css(lib.assetURL + 'theme/style/hp', lib.config.hp_style, styleLoaded);

						if (lib.config.player_style && lib.config.player_style != 'default' && lib.config.player_style != 'custom') {
							var str = '';
							switch (lib.config.player_style) {
								case 'wood': str = 'url("' + lib.assetURL + 'theme/woodden/wood.jpg")'; break;
								case 'music': str = 'linear-gradient(#4b4b4b, #464646)'; break;
								case 'simple': str = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))'; break;
							}
							ui.css.player_stylesheet = lib.init.sheet('#window .player{background-image:' + str + '}');
						}
						if (lib.config.border_style && lib.config.border_style != 'default' && lib.config.border_style != 'custom' && lib.config.border_style != 'auto') {
							ui.css.border_stylesheet = lib.init.sheet();
							var bstyle = lib.config.border_style;
							if (bstyle.indexOf('dragon_') == 0) {
								bstyle = bstyle.slice(7);
							}
							ui.css.border_stylesheet.sheet.insertRule('#window .player>.framebg,#window #arena.long.mobile:not(.fewplayer) .player[data-position="0"]>.framebg{display:block;background-image:url("' + lib.assetURL + 'theme/style/player/' + bstyle + '1.png")}', 0);
							ui.css.border_stylesheet.sheet.insertRule('#window #arena.long:not(.fewplayer) .player>.framebg, #arena.oldlayout .player>.framebg{background-image:url("' + lib.assetURL + 'theme/style/player/' + bstyle + '3.png")}', 0);
							ui.css.border_stylesheet.sheet.insertRule('.player>.count{z-index: 3 !important;border-radius: 2px !important;text-align: center !important;}', 0);
						}
						if (lib.config.control_style && lib.config.control_style != 'default' && lib.config.control_style != 'custom') {
							var str = '';
							switch (lib.config.control_style) {
								case 'wood': str = 'url("' + lib.assetURL + 'theme/woodden/wood.jpg")'; break;
								case 'music': str = 'linear-gradient(#4b4b4b, #464646);color:white;text-shadow:black 0 0 2px'; break;
								case 'simple': str = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4));color:white;text-shadow:black 0 0 2px'; break;
							}
							if (lib.config.control_style == 'wood') {
								ui.css.control_stylesheet = lib.init.sheet('#window .control,#window .menubutton,#window #system>div>div,#window #system>div>.pressdown2{background-image:' + str + '}');
							}
							else {
								ui.css.control_stylesheet = lib.init.sheet('#window .control,.menubutton:not(.active):not(.highlight):not(.red):not(.blue),#window #system>div>div{background-image:' + str + '}');
							}
						}
						if (lib.config.menu_style && lib.config.menu_style != 'default' && lib.config.menu_style != 'custom') {
							var str = '';
							switch (lib.config.menu_style) {
								case 'wood': str = 'url("' + lib.assetURL + 'theme/woodden/wood2.png")'; break;
								case 'music': str = 'linear-gradient(#4b4b4b, #464646);color:white;text-shadow:black 0 0 2px'; break;
								case 'simple': str = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4));color:white;text-shadow:black 0 0 2px'; break;
							}
							ui.css.menu_stylesheet = lib.init.sheet('html #window>.dialog.popped,html .menu,html .menubg{background-image:' + str + '}');
						}

						lib.config.duration = 500;

						if (!lib.config.touchscreen) {
							document.addEventListener('mousewheel', ui.click.windowmousewheel, { passive: true });
							document.addEventListener('mousemove', ui.click.windowmousemove);
							document.addEventListener('mousedown', ui.click.windowmousedown);
							document.addEventListener('mouseup', ui.click.windowmouseup);
							document.addEventListener('contextmenu', ui.click.right);
						}
						else {
							document.addEventListener('touchstart', ui.click.touchconfirm);
							document.addEventListener('touchstart', ui.click.windowtouchstart);
							document.addEventListener('touchend', ui.click.windowtouchend);
							document.addEventListener('touchmove', ui.click.windowtouchmove);
						}
					};
					var proceed2 = function () {
						if (config3) {
							proceed(config3);
						}
						else {
							config3 = true;
						}
					};

					ui.css = {
						menu: lib.init.css(lib.assetURL + 'layout/default', 'menu', function () {
							ui.css.default = lib.init.css(lib.assetURL + 'layout/default', 'layout');
							proceed2();
						})
					};

					if (lib.device) {
						lib.init.cordovaReady = function () {
							if (lib.device == 'android') {
								document.addEventListener("pause", function () {
									if (!_status.paused2 && (typeof _status.event.isMine == 'function' && !_status.event.isMine())) {
										ui.click.pause();
									}
									if (ui.backgroundMusic) {
										ui.backgroundMusic.pause();
									}
								});
								document.addEventListener("resume", function () {
									if (ui.backgroundMusic) {
										ui.backgroundMusic.play();
									}
								});
								document.addEventListener("backbutton", function () {
									if (ui.arena && ui.arena.classList.contains('menupaused')) {
										if (window.saveNonameInput) {
											window.saveNonameInput();
										}
										else {
											ui.click.configMenu();
										}
									}
									else if (lib.config.confirm_exit) {
										navigator.notification.confirm(
											'是否退出游戏？',
											function (index) {
												switch (index) {
													case 2: game.saveConfig('null'); game.reload(); break;
													case 3: navigator.app.exitApp(); break;
												}
											},
											'确认退出',
											['取消', '重新开始', '退出']
										);
									}
									else {
										navigator.app.exitApp();
									}
								});
							}
							game.download = function (url, folder, onsuccess, onerror, dev, onprogress) {
								if (url.indexOf('http') != 0) {
									url = get.url(dev) + url;
								}
								var fileTransfer = new FileTransfer();
								folder = lib.assetURL + folder;
								if (onprogress) {
									fileTransfer.onprogress = function (progressEvent) {
										onprogress(progressEvent.loaded, progressEvent.total);
									};
								}
								lib.config.brokenFile.add(folder);
								game.saveConfigValue('brokenFile');
								fileTransfer.download(encodeURI(url), encodeURI(folder), function () {
									lib.config.brokenFile.remove(folder);
									game.saveConfigValue('brokenFile');
									if (onsuccess) {
										onsuccess();
									}
								}, onerror);
							};
							game.readFile = function (filename, callback, onerror) {
								window.resolveLocalFileSystemURL(lib.assetURL, function (entry) {
									entry.getFile(filename, {}, function (fileEntry) {
										fileEntry.file(function (fileToLoad) {
											var fileReader = new FileReader();
											fileReader.onload = function (e) {
												callback(e.target.result);
											};
											fileReader.readAsArrayBuffer(fileToLoad, "UTF-8");
										}, onerror);
									}, onerror);
								}, onerror);
							};
							game.writeFile = function (data, path, name, callback) {
								game.ensureDirectory(path, function () { });
								if (Object.prototype.toString.call(data) == '[object File]') {
									var fileReader = new FileReader();
									fileReader.onload = function (e) {
										game.writeFile(e.target.result, path, name, callback);
									};
									fileReader.readAsArrayBuffer(data, "UTF-8");
								}
								else {
									window.resolveLocalFileSystemURL(lib.assetURL + path, function (entry) {
										entry.getFile(name, { create: true }, function (fileEntry) {
											fileEntry.createWriter(function (fileWriter) {
												fileWriter.onwriteend = callback;
												fileWriter.write(data);
											});
										});
									});
								}
							};
							game.removeFile = function (dir, callback) {
								window.resolveLocalFileSystemURL(lib.assetURL, function (entry) {
									entry.getFile(dir, {}, function (fileEntry) {
										fileEntry.remove();
										if (callback) {
											callback();
										}
									});
								});
							};
							game.getFileList = function (dir, callback) {
								var files = [], folders = [];
								window.resolveLocalFileSystemURL(lib.assetURL + dir, function (entry) {
									var dirReader = entry.createReader();
									var entries = [];
									var readEntries = function () {
										dirReader.readEntries(function (results) {
											if (!results.length) {
												entries.sort();
												for (var i = 0; i < entries.length; i++) {
													if (entries[i].isDirectory) {
														folders.push(entries[i].name);
													}
													else {
														files.push(entries[i].name);
													}
												}
												callback(folders, files);
											}
											else {
												entries = entries.concat(Array.from(results));
												readEntries();
											}
										});
									};
									readEntries();
								});
							};
							game.ensureDirectory = function (list, callback, file) {
								var directorylist;
								var num = 0;
								if (file) {
									num = 1;
								}
								if (typeof list == 'string') {
									directorylist = [list];
								}
								else {
									var directorylist = list.slice(0);
								}
								window.resolveLocalFileSystemURL(lib.assetURL, function (rootEntry) {
									var access = function (entry, dir, callback) {
										if (dir.length <= num) {
											callback();
										}
										else {
											var str = dir.shift();
											entry.getDirectory(str, { create: false }, function (entry) {
												access(entry, dir, callback);
											}, function () {
												entry.getDirectory(str, { create: true }, function (entry) {
													access(entry, dir, callback);
												});
											});
										}
									}
									var createDirectory = function () {
										if (directorylist.length) {
											access(rootEntry, directorylist.shift().split('/'), createDirectory);
										}
										else {
											callback();
										}
									};
									createDirectory();
								});
							}
							if (ui.updateUpdate) {
								ui.updateUpdate();
							}
							var showbar = function () {
								if (window.StatusBar) {
									if (lib.device == 'android') {
										if (lib.config.show_statusbar_android) {
											window.StatusBar.overlaysWebView(false);
											window.StatusBar.backgroundColorByName('black');
											window.StatusBar.show();
										}
									}
									else if (lib.device == 'ios') {
										if (lib.config.show_statusbar_ios != 'off' && lib.config.show_statusbar_ios != 'auto') {
											if (lib.config.show_statusbar_ios == 'default') {
												window.StatusBar.overlaysWebView(false);
											}
											else {
												window.StatusBar.overlaysWebView(true);
											}
											window.StatusBar.backgroundColorByName('black');
											window.StatusBar.show();
										}
									}
								}
							}
							if (lib.arenaReady) {
								lib.arenaReady.push(showbar);
							}
							else {
								showbar();
							}
						}
					}
					else if (typeof window.require == 'function') {
						lib.node = {
							fs: require('fs'),
							debug: function () {
								require('electron').remote.getCurrentWindow().toggleDevTools();
							}
						};
						game.download = function (url, folder, onsuccess, onerror, dev, onprogress) {
							if (url.indexOf('http') != 0) {
								url = get.url(dev) + url;
							}
							game.ensureDirectory(folder, function () {
								try {
									var file = lib.node.fs.createWriteStream(__dirname + '/' + folder);
								}
								catch (e) {
									onerror();
								}
								lib.config.brokenFile.add(folder);
								game.saveConfigValue('brokenFile');
								if (!lib.node.http) lib.node.http = require('http');
								if (!lib.node.https) lib.node.https = require('https');
								var opts = require('url').parse(encodeURI(url));
								opts.headers = { 'User-Agent': 'AppleWebkit' };
								var request = (url.indexOf('https') == 0 ? lib.node.https : lib.node.http).get(opts, function (response) {
									var stream = response.pipe(file);
									stream.on('finish', function () {
										lib.config.brokenFile.remove(folder);
										game.saveConfigValue('brokenFile');
										if (onsuccess) {
											onsuccess();
										}
									});
									stream.on('error', onerror);
									if (onprogress) {
										var streamInterval = setInterval(function () {
											if (stream.closed) {
												clearInterval(streamInterval);
											}
											else {
												onprogress(stream.bytesWritten);
											}
										}, 200);
									}
								});
							}, true);
						};
						game.readFile = function (filename, callback, onerror) {
							lib.node.fs.readFile(__dirname + '/' + filename, function (err, data) {
								if (err) {
									onerror(err);
								}
								else {
									callback(data);
								}
							});
						};
						game.writeFile = function (data, path, name, callback) {
							game.ensureDirectory(path, function () { });
							if (Object.prototype.toString.call(data) == '[object File]') {
								var fileReader = new FileReader();
								fileReader.onload = function (e) {
									game.writeFile(e.target.result, path, name, callback);
								};
								fileReader.readAsArrayBuffer(data, "UTF-8");
							}
							else {
								get.zip(function (zip) {
									zip.file('i', data);
									lib.node.fs.writeFile(__dirname + '/' + path + '/' + name, zip.files.i.asNodeBuffer(), null, callback);
								});
							}
						};
						game.removeFile = function (filename, callback) {
							lib.node.fs.unlink(__dirname + '/' + filename, callback || function () { });
						};
						game.getFileList = function (dir, callback) {
							var files = [], folders = [];
							dir = __dirname + '/' + dir;
							lib.node.fs.readdir(dir, function (err, filelist) {
								for (var i = 0; i < filelist.length; i++) {
									if (filelist[i][0] != '.' && filelist[i][0] != '_') {
										if (lib.node.fs.statSync(dir + '/' + filelist[i]).isDirectory()) {
											folders.push(filelist[i]);
										}
										else {
											files.push(filelist[i]);
										}
									}
								}
								callback(folders, files);
							});
						};
						game.ensureDirectory = function (list, callback, file) {
							var directorylist;
							var num = 0;
							if (file) {
								num = 1;
							}
							if (typeof list == 'string') {
								directorylist = [list];
							}
							else {
								var directorylist = list.slice(0);
							}
							var access = function (str, dir, callback) {
								if (dir.length <= num) {
									callback();
								}
								else {
									str += '/' + dir.shift();
									lib.node.fs.access(__dirname + str, function (e) {
										if (e) {
											try {
												lib.node.fs.mkdir(__dirname + str, function () {
													access(str, dir, callback);
												});
											}
											catch (e) {
												console.log(e);
											}
										}
										else {
											access(str, dir, callback);
										}
									});
								}
							}
							var createDirectory = function () {
								if (directorylist.length) {
									access('', directorylist.shift().split('/'), createDirectory);
								}
								else {
									callback();
								}
							};
							createDirectory();
						};
						if (ui.updateUpdate) {
							ui.updateUpdate();
						}
					}
					else {
						window.onbeforeunload = function () {
							if (lib.config.confirm_exit && !_status.reloading) {
								return '是否离开游戏？'
							}
							else {
								return null;
							}
						}
					}

					lib.config = window.config;
					lib.configOL = {};
					delete window.config;
					var config2;
					if (localStorage.getItem(lib.configprefix + 'nodb')) {
						window.nodb = true;
					}
					if (window.indexedDB && !window.nodb) {
						var request = window.indexedDB.open(lib.configprefix + 'data', 4);
						request.onupgradeneeded = function (e) {
							var db = e.target.result;
							if (!db.objectStoreNames.contains('video')) {
								db.createObjectStore('video', { keyPath: 'time' });
							}
							if (!db.objectStoreNames.contains('image')) {
								db.createObjectStore('image');
							}
							if (!db.objectStoreNames.contains('audio')) {
								db.createObjectStore('audio');
							}
							if (!db.objectStoreNames.contains('config')) {
								db.createObjectStore('config');
							}
							if (!db.objectStoreNames.contains('data')) {
								db.createObjectStore('data');
							}
						};
						request.onsuccess = function (e) {
							lib.db = e.target.result;
							game.getDB('config', null, function (obj) {
								if (!obj.storageImported) {
									try {
										config2 = JSON.parse(localStorage.getItem(lib.configprefix + 'config'));
										if (!config2 || typeof config2 != 'object') throw 'err'
									}
									catch (err) {
										config2 = {};
									}
									for (var i in config2) {
										game.saveConfig(i, config2[i]);
									}
									for (var i in lib.mode) {
										try {
											config2 = JSON.parse(localStorage.getItem(lib.configprefix + i));
											if (!config2 || typeof config2 != 'object' || get.is.empty(config2)) throw 'err'
										}
										catch (err) {
											config2 = false;
										}
										localStorage.removeItem(lib.configprefix + i);
										if (config2) {
											game.putDB('data', i, config2);
										}
									}
									game.saveConfig('storageImported', true);
									lib.init.background();
									localStorage.removeItem(lib.configprefix + 'config');
								}
								else {
									config2 = obj;
								}
								proceed(config2);
							});
						}
					}
					else {
						try {
							config2 = JSON.parse(localStorage.getItem(lib.configprefix + 'config'));
							if (!config2 || typeof config2 != 'object') throw 'err'
						}
						catch (err) {
							config2 = {};
							localStorage.setItem(lib.configprefix + 'config', JSON.stringify({}));
						}
						proceed(config2);
					}
				};

				game.import = function (type, content) {
					if (type == 'extension') {
						// var backup_onload=lib.init.onload;
						game.loadExtension(content);
						// lib.init.onload=backup_onload;
					}
					else {
						if (!lib.imported[type]) {
							lib.imported[type] = {};
						}
						var content2 = content(lib, game, ui, get, ai, _status);
						if (content2.name) {
							lib.imported[type][content2.name] = content2;
							delete content2.name;
						}
					}
				};


				// if (get.mode() == 'boss') return
				lib.init.onload = function () {
					ui.updated();
					game.documentZoom = game.deviceZoom;
					if (game.documentZoom != 1) {
						ui.updatez();
					}
					ui.background = ui.create.div('.background');
					ui.background.style.backgroundSize = "cover";
					ui.background.style.backgroundPosition = '50% 50%';
					if (lib.config.image_background && lib.config.image_background != 'default' && lib.config.image_background.indexOf('custom_') != 0) {
						ui.background.setBackgroundImage('image/background/' + lib.config.image_background + '.jpg');
						if (lib.config.image_background_blur) {
							ui.background.style.filter = 'blur(8px)';
							ui.background.style.webkitFilter = 'blur(8px)';
							ui.background.style.transform = 'scale(1.05)';
						}
					}
					document.documentElement.style.backgroundImage = '';
					document.documentElement.style.backgroundSize = '';
					document.documentElement.style.backgroundPosition = '';
					document.body.insertBefore(ui.background, document.body.firstChild);
					document.body.onresize = ui.updatexr;
					if (lib.config.touchscreen) {
						document.body.addEventListener('touchstart', function (e) {
							this.startX = e.touches[0].clientX / game.documentZoom;
							this.startY = e.touches[0].clientY / game.documentZoom;
							_status.dragged = false;
						});
						document.body.addEventListener('touchmove', function (e) {
							if (_status.dragged) return;
							if (Math.abs(e.touches[0].clientX / game.documentZoom - this.startX) > 10 ||
								Math.abs(e.touches[0].clientY / game.documentZoom - this.startY) > 10) {
								_status.dragged = true;
							}
						});
					}

					if (lib.config.image_background.indexOf('custom_') == 0) {
						ui.background.style.backgroundImage = "none";
						game.getDB('image', lib.config.image_background, function (fileToLoad) {
							if (!fileToLoad) return;
							var fileReader = new FileReader();
							fileReader.onload = function (fileLoadedEvent) {
								var data = fileLoadedEvent.target.result;
								ui.background.style.backgroundImage = 'url(' + data + ')';
								if (lib.config.image_background_blur) {
									ui.background.style.filter = 'blur(8px)';
									ui.background.style.webkitFilter = 'blur(8px)';
									ui.background.style.transform = 'scale(1.05)';
								}
							};
							fileReader.readAsDataURL(fileToLoad, "UTF-8");
						});
					}
					if (lib.config.card_style == 'custom') {
						game.getDB('image', 'card_style', function (fileToLoad) {
							if (!fileToLoad) return;
							var fileReader = new FileReader();
							fileReader.onload = function (fileLoadedEvent) {
								if (ui.css.card_stylesheet) {
									ui.css.card_stylesheet.remove();
								}
								ui.css.card_stylesheet = lib.init.sheet('.card:not(*:empty){background-image:url(' + fileLoadedEvent.target.result + ')}');
							};
							fileReader.readAsDataURL(fileToLoad, "UTF-8");
						});
					}
					if (lib.config.cardback_style == 'custom') {
						game.getDB('image', 'cardback_style', function (fileToLoad) {
							if (!fileToLoad) return;
							var fileReader = new FileReader();
							fileReader.onload = function (fileLoadedEvent) {
								if (ui.css.cardback_stylesheet) {
									ui.css.cardback_stylesheet.remove();
								}
								ui.css.cardback_stylesheet = lib.init.sheet('.card:empty,.card.infohidden{background-image:url(' + fileLoadedEvent.target.result + ')}');
							};
							fileReader.readAsDataURL(fileToLoad, "UTF-8");
						});
						game.getDB('image', 'cardback_style2', function (fileToLoad) {
							if (!fileToLoad) return;
							var fileReader = new FileReader();
							fileReader.onload = function (fileLoadedEvent) {
								if (ui.css.cardback_stylesheet2) {
									ui.css.cardback_stylesheet2.remove();
								}
								ui.css.cardback_stylesheet2 = lib.init.sheet('.card.infohidden:not(.infoflip){background-image:url(' + fileLoadedEvent.target.result + ')}');
							};
							fileReader.readAsDataURL(fileToLoad, "UTF-8");
						});
					}
					if (lib.config.hp_style == 'custom') {
						game.getDB('image', 'hp_style1', function (fileToLoad) {
							if (!fileToLoad) return;
							var fileReader = new FileReader();
							fileReader.onload = function (fileLoadedEvent) {
								if (ui.css.hp_stylesheet1) {
									ui.css.hp_stylesheet1.remove();
								}
								ui.css.hp_stylesheet1 = lib.init.sheet('.hp:not(.text):not(.actcount)[data-condition="high"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ')}');
							};
							fileReader.readAsDataURL(fileToLoad, "UTF-8");
						});
						game.getDB('image', 'hp_style2', function (fileToLoad) {
							if (!fileToLoad) return;
							var fileReader = new FileReader();
							fileReader.onload = function (fileLoadedEvent) {
								if (ui.css.hp_stylesheet2) {
									ui.css.hp_stylesheet2.remove();
								}
								ui.css.hp_stylesheet2 = lib.init.sheet('.hp:not(.text):not(.actcount)[data-condition="mid"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ')}');
							};
							fileReader.readAsDataURL(fileToLoad, "UTF-8");
						});
						game.getDB('image', 'hp_style3', function (fileToLoad) {
							if (!fileToLoad) return;
							var fileReader = new FileReader();
							fileReader.onload = function (fileLoadedEvent) {
								if (ui.css.hp_stylesheet3) {
									ui.css.hp_stylesheet3.remove();
								}
								ui.css.hp_stylesheet3 = lib.init.sheet('.hp:not(.text):not(.actcount)[data-condition="low"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ')}');
							};
							fileReader.readAsDataURL(fileToLoad, "UTF-8");
						});
						game.getDB('image', 'hp_style4', function (fileToLoad) {
							if (!fileToLoad) return;
							var fileReader = new FileReader();
							fileReader.onload = function (fileLoadedEvent) {
								if (ui.css.hp_stylesheet4) {
									ui.css.hp_stylesheet4.remove();
								}
								ui.css.hp_stylesheet4 = lib.init.sheet('.hp:not(.text):not(.actcount)>.lost{background-image:url(' + fileLoadedEvent.target.result + ')}');
							};
							fileReader.readAsDataURL(fileToLoad, "UTF-8");
						});
					}
					if (lib.config.player_style == 'custom') {
						ui.css.player_stylesheet = lib.init.sheet('#window .player{background-image:none;background-size:100% 100%;}');
						game.getDB('image', 'player_style', function (fileToLoad) {
							if (!fileToLoad) return;
							var fileReader = new FileReader();
							fileReader.onload = function (fileLoadedEvent) {
								if (ui.css.player_stylesheet) {
									ui.css.player_stylesheet.remove();
								}
								ui.css.player_stylesheet = lib.init.sheet('#window .player{background-image:url("' + fileLoadedEvent.target.result + '");background-size:100% 100%;}');
							};
							fileReader.readAsDataURL(fileToLoad, "UTF-8");
						});
					}
					if (lib.config.border_style == 'custom') {
						game.getDB('image', 'border_style', function (fileToLoad) {
							if (!fileToLoad) return;
							var fileReader = new FileReader();
							fileReader.onload = function (fileLoadedEvent) {
								if (ui.css.border_stylesheet) {
									ui.css.border_stylesheet.remove();
								}
								ui.css.border_stylesheet = lib.init.sheet();
								ui.css.border_stylesheet.sheet.insertRule('#window .player>.framebg{display:block;background-image:url("' + fileLoadedEvent.target.result + '")}', 0);
								ui.css.border_stylesheet.sheet.insertRule('.player>.count{z-index: 3 !important;border-radius: 2px !important;text-align: center !important;}', 0);
							};
							fileReader.readAsDataURL(fileToLoad, "UTF-8");
						});
					}
					if (lib.config.control_style == 'custom') {
						game.getDB('image', 'control_style', function (fileToLoad) {
							if (!fileToLoad) return;
							var fileReader = new FileReader();
							fileReader.onload = function (fileLoadedEvent) {
								if (ui.css.control_stylesheet) {
									ui.css.control_stylesheet.remove();
								}
								ui.css.control_stylesheet = lib.init.sheet('#window .control,.menubutton:not(.active):not(.highlight):not(.red):not(.blue),#window #system>div>div{background-image:url("' + fileLoadedEvent.target.result + '")}');
							};
							fileReader.readAsDataURL(fileToLoad, "UTF-8");
						});
					}
					if (lib.config.menu_style == 'custom') {
						game.getDB('image', 'menu_style', function (fileToLoad) {
							if (!fileToLoad) return;
							var fileReader = new FileReader();
							fileReader.onload = function (fileLoadedEvent) {
								if (ui.css.menu_stylesheet) {
									ui.css.menu_stylesheet.remove();
								}
								ui.css.menu_stylesheet = lib.init.sheet('html #window>.dialog.popped,html .menu,html .menubg{background-image:url("' + fileLoadedEvent.target.result + '");background-size:cover}');
							};
							fileReader.readAsDataURL(fileToLoad, "UTF-8");
						});
					}

					var proceed2 = function () {
						var mode = lib.imported.mode;
						var card = lib.imported.card;
						var character = lib.imported.character;
						var play = lib.imported.play;
						delete window.game;
						var i, j, k;
						for (i in mode[lib.config.mode].element) {
							if (!lib.element[i]) lib.element[i] = [];
							for (j in mode[lib.config.mode].element[i]) {
								if (j == 'init') {
									if (!lib.element[i].inits) lib.element[i].inits = [];
									lib.element[i].inits.push(mode[lib.config.mode].element[i][j]);
								}
								else {
									lib.element[i][j] = mode[lib.config.mode].element[i][j];
								}
							}
						}
						for (i in mode[lib.config.mode].ai) {
							if (typeof mode[lib.config.mode].ai[i] == 'object') {
								if (ai[i] == undefined) ai[i] = {};
								for (j in mode[lib.config.mode].ai[i]) {
									ai[i][j] = mode[lib.config.mode].ai[i][j];
								}
							}
							else {
								ai[i] = mode[lib.config.mode].ai[i];
							}
						}
						for (i in mode[lib.config.mode].ui) {
							if (typeof mode[lib.config.mode].ui[i] == 'object') {
								if (ui[i] == undefined) ui[i] = {};
								for (j in mode[lib.config.mode].ui[i]) {
									ui[i][j] = mode[lib.config.mode].ui[i][j];
								}
							}
							else {
								ui[i] = mode[lib.config.mode].ui[i];
							}
						}
						for (i in mode[lib.config.mode].game) {
							game[i] = mode[lib.config.mode].game[i];
						}
						for (i in mode[lib.config.mode].get) {
							get[i] = mode[lib.config.mode].get[i];
						}
						lib.init.start = mode[lib.config.mode].start;
						lib.init.startBefore = mode[lib.config.mode].startBefore;
						if (game.onwash) {
							lib.onwash.push(game.onwash);
							delete game.onwash;
						}
						if (game.onover) {
							lib.onover.push(game.onover);
							delete game.onover;
						}
						lib.config.banned = lib.config[lib.config.mode + '_banned'] || [];
						lib.config.bannedcards = lib.config[lib.config.mode + '_bannedcards'] || [];

						lib.rank = window.noname_character_rank;
						delete window.noname_character_rank;
						for (i in mode[lib.config.mode]) {
							if (i == 'element') continue;
							if (i == 'game') continue;
							if (i == 'ai') continue;
							if (i == 'ui') continue;
							if (i == 'get') continue;
							if (i == 'config') continue;
							if (i == 'onreinit') continue;
							if (i == 'start') continue;
							if (i == 'startBefore') continue;
							if (lib[i] == undefined) lib[i] = (Array.isArray(mode[lib.config.mode][i])) ? [] : {};
							for (j in mode[lib.config.mode][i]) {
								lib[i][j] = mode[lib.config.mode][i][j];
							}
						}
						if (typeof mode[lib.config.mode].init == 'function') {
							mode[lib.config.mode].init();
						}

						var connectCharacterPack = [];
						var connectCardPack = [];
						for (i in character) {
							if (character[i].character) {
								lib.characterPack[i] = character[i].character
							}
							for (j in character[i]) {
								if (j == 'mode' || j == 'forbid') continue;
								if (j == 'connect') {
									connectCharacterPack.push(i);
									continue;
								}
								if (j == 'character' && !lib.config.characters.contains(i) && lib.config.mode != 'connect') {
									if (lib.config.mode == 'chess' && get.config('chess_mode') == 'leader') {
										for (k in character[i][j]) {
											lib.hiddenCharacters.push(k);
										}
									}
									else if (lib.config.mode != 'boss' || i != 'boss') {
										continue;
									}
								}
								if (Array.isArray(lib[j]) && Array.isArray(character[i][j])) {
									lib[j].addArray(character[i][j]);
									continue;
								}
								for (k in character[i][j]) {
									if (j == 'character') {
										if (!character[i][j][k][4]) {
											character[i][j][k][4] = [];
										}
										if (character[i][j][k][4].contains('boss') ||
											character[i][j][k][4].contains('hiddenboss')) {
											lib.config.forbidai.add(k);
										}
										if (lib.config.forbidai_user && lib.config.forbidai_user.contains(k)) {
											lib.config.forbidai.add(k);
										}
										for (var l = 0; l < character[i][j][k][3].length; l++) {
											lib.skilllist.add(character[i][j][k][3][l]);
										}
									}
									if (j == 'skill' && k[0] == '_' && (!lib.config.characters.contains(i) || (lib.config.mode == 'connect' && !character[i].connect))) {
										continue;
									}
									if (j == 'translate' && k == i) {
										lib[j][k + '_character_config'] = character[i][j][k];
									}
									else {
										if (lib[j][k] == undefined) {
											if (j == 'skill' && lib.config.mode == 'connect' && !character[i].connect) {
												lib[j][k] = {
													nopop: character[i][j][k].nopop,
													derivation: character[i][j][k].derivation
												};
											}
											else {
												lib[j][k] = character[i][j][k];
											}
											if (j == 'card' && lib[j][k].derivation) {
												if (!lib.cardPack.mode_derivation) {
													lib.cardPack.mode_derivation = [k];
												}
												else {
													lib.cardPack.mode_derivation.push(k);
												}
											}
										}
										else if (Array.isArray(lib[j][k]) && Array.isArray(character[i][j][k])) {
											lib[j][k].addArray(character[i][j][k]);
										}
										else {
											console.log('dublicate ' + j + ' in character ' + i + ':\n' + k + '\n' + ': ' + lib[j][k] + '\n' + character[i][j][k]);
										}
									}
								}
							}
						}
						var connect_avatar_list = [];
						for (var i in lib.character) {
							connect_avatar_list.push(i);
						}
						connect_avatar_list.sort(lib.sort.capt);
						for (var i = 0; i < connect_avatar_list.length; i++) {
							var ia = connect_avatar_list[i];
							lib.mode.connect.config.connect_avatar.item[ia] = lib.translate[ia];
						}
						if (lib.config.mode != 'connect') {
							var pilecfg = lib.config.customcardpile[get.config('cardpilename') || '当前牌堆'];
							if (pilecfg) {
								lib.config.bannedpile = get.copy(pilecfg[0] || {});
								lib.config.addedpile = get.copy(pilecfg[1] || {});
							}
							else {
								lib.config.bannedpile = {};
								lib.config.addedpile = {};
							}
						}
						else {
							lib.cardPackList = {};
						}
						for (i in card) {
							lib.cardPack[i] = [];
							if (card[i].card) {
								for (var j in card[i].card) {
									if (!card[i].card[j].hidden && card[i].translate[j + '_info']) {
										lib.cardPack[i].push(j);
									}
								}
							}
							for (j in card[i]) {
								if (j == 'mode' || j == 'forbid') continue;
								if (j == 'connect') {
									connectCardPack.push(i);
									continue;
								}
								if (j == 'list') {
									if (lib.config.mode == 'connect') {
										lib.cardPackList[i] = card[i][j];
									}
									else {
										if (lib.config.cards.contains(i)) {
											var pile;
											if (typeof card[i][j] == 'function') {
												pile = card[i][j]();
											}
											else {
												pile = card[i][j];
											}
											lib.cardPile[i] = pile.slice(0);
											if (lib.config.bannedpile[i]) {
												for (var k = 0; k < lib.config.bannedpile[i].length; k++) {
													pile[lib.config.bannedpile[i][k]] = null;
												}
											}
											for (var k = 0; k < pile.length; k++) {
												if (!pile[k]) {
													pile.splice(k--, 1);
												}
											}
											if (lib.config.addedpile[i]) {
												for (var k = 0; k < lib.config.addedpile[i].length; k++) {
													pile.push(lib.config.addedpile[i][k]);
												}
											}
											lib.card.list = lib.card.list.concat(pile);
										}
									}
								} else {
									for (k in card[i][j]) {
										if (j == 'skill' && k[0] == '_' && (!lib.config.cards.contains(i) || (lib.config.mode == 'connect' && !card[i].connect))) {
											continue;
										}
										if (j == 'translate' && k == i) {
											lib[j][k + '_card_config'] = card[i][j][k];
										}
										else {
											if (lib[j][k] == undefined) {
												if (j == 'skill' && lib.config.mode == 'connect' && !card[i].connect) {
													lib[j][k] = {
														nopop: card[i][j][k].nopop,
														derivation: card[i][j][k].derivation
													};
												}
												else {
													lib[j][k] = card[i][j][k];
												}
											}
											else console.log('dublicate ' + j + ' in card ' + i + ':\n' + k + '\n' + lib[j][k] + '\n' + card[i][j][k]);
											if (j == 'card' && lib[j][k].derivation) {
												if (!lib.cardPack.mode_derivation) {
													lib.cardPack.mode_derivation = [k];
												}
												else {
													lib.cardPack.mode_derivation.push(k);
												}
											}
										}
									}
								}
							}
						}
						if (lib.cardPack.mode_derivation) {
							for (var i = 0; i < lib.cardPack.mode_derivation.length; i++) {
								if (typeof lib.card[lib.cardPack.mode_derivation[i]].derivation == 'string' && !lib.character[lib.card[lib.cardPack.mode_derivation[i]].derivation]) {
									lib.cardPack.mode_derivation.splice(i--, 1);
								}
								else if (typeof lib.card[lib.cardPack.mode_derivation[i]].derivationpack == 'string' && !lib.config.cards.contains(lib.card[lib.cardPack.mode_derivation[i]].derivationpack)) {
									lib.cardPack.mode_derivation.splice(i--, 1);
								}
							}
							if (lib.cardPack.mode_derivation.length == 0) {
								delete lib.cardPack.mode_derivation;
							}
						}
						if (lib.config.mode != 'connect') {
							for (i in play) {
								if (lib.config.hiddenPlayPack.contains(i)) continue;
								if (play[i].forbid && play[i].forbid.contains(lib.config.mode)) continue;
								if (play[i].mode && play[i].mode.contains(lib.config.mode) == false) continue;
								for (j in play[i].element) {
									if (!lib.element[j]) lib.element[j] = [];
									for (k in play[i].element[j]) {
										if (k == 'init') {
											if (!lib.element[j].inits) lib.element[j].inits = [];
											lib.element[j].inits.push(play[i].element[j][k]);
										}
										else {
											lib.element[j][k] = play[i].element[j][k];
										}
									}
								}
								for (j in play[i].ui) {
									if (typeof play[i].ui[j] == 'object') {
										if (ui[j] == undefined) ui[j] = {};
										for (k in play[i].ui[j]) {
											ui[j][k] = play[i].ui[j][k];
										}
									}
									else {
										ui[j] = play[i].ui[j];
									}
								}
								for (j in play[i].game) {
									game[j] = play[i].game[j];
								}
								for (j in play[i].get) {
									get[j] = play[i].get[j];
								}
								for (j in play[i]) {
									if (j == 'mode' || j == 'forbid' || j == 'init' || j == 'element' ||
										j == 'game' || j == 'get' || j == 'ui' || j == 'arenaReady') continue;
									for (k in play[i][j]) {
										if (j == 'translate' && k == i) {
											// lib[j][k+'_play_config']=play[i][j][k];
										}
										else {
											if (lib[j][k] != undefined) {
												console.log('dublicate ' + j + ' in play ' + i + ':\n' + k + '\n' + ': ' + lib[j][k] + '\n' + play[i][j][k]);
											}
											lib[j][k] = play[i][j][k];
										}
									}
								}
								if (typeof play[i].init == 'function') play[i].init();
								if (typeof play[i].arenaReady == 'function') lib.arenaReady.push(play[i].arenaReady);
							}
						}

						lib.connectCharacterPack = [];
						lib.connectCardPack = [];
						for (var i = 0; i < lib.config.all.characters.length; i++) {
							var packname = lib.config.all.characters[i];
							if (connectCharacterPack.contains(packname)) {
								lib.connectCharacterPack.push(packname)
							}
						}
						for (var i = 0; i < lib.config.all.cards.length; i++) {
							var packname = lib.config.all.cards[i];
							if (connectCardPack.contains(packname)) {
								lib.connectCardPack.push(packname)
							}
						}
						if (lib.config.mode != 'connect') {
							for (i = 0; i < lib.card.list.length; i++) {
								if (lib.card.list[i][2] == 'huosha') {
									lib.card.list[i] = lib.card.list[i].slice(0);
									lib.card.list[i][2] = 'sha';
									lib.card.list[i][3] = 'fire';
								}
								else if (lib.card.list[i][2] == 'leisha') {
									lib.card.list[i] = lib.card.list[i].slice(0);
									lib.card.list[i][2] = 'sha';
									lib.card.list[i][3] = 'thunder';
								}
								if (!lib.card[lib.card.list[i][2]]) {
									lib.card.list.splice(i, 1); i--;
								}
								else if (lib.card[lib.card.list[i][2]].mode &&
									lib.card[lib.card.list[i][2]].mode.contains(lib.config.mode) == false) {
									lib.card.list.splice(i, 1); i--;
								}
							}
						}

						if (lib.config.mode == 'connect') {
							_status.connectMode = true;
						}
						if (window.isNonameServer) {
							lib.cheat.i();
						}
						else if (lib.config.dev && (!_status.connectMode || lib.config.debug)) {
							lib.cheat.i();
						}
						lib.config.sort_card = get.sortCard(lib.config.sort);
						delete lib.imported.character;
						delete lib.imported.card;
						delete lib.imported.mode;
						delete lib.imported.play;
						for (var i in lib.init) {
							if (i.indexOf('setMode_') == 0) {
								delete lib.init[i];
							}
						}

						var loadExtensionCallback = function () {
							delete lib.extensions;

							if (lib.init.startBefore) {
								lib.init.startBefore();
								delete lib.init.startBefore;
							}
							ui.create.arena();
							game.createEvent('game', false).setContent(lib.init.start);
							if (lib.mode[lib.config.mode] && lib.mode[lib.config.mode].fromextension) {
								var startstr = mode[lib.config.mode].start.toString();
								if (startstr.indexOf('onfree') == -1) {
									setTimeout(lib.init.onfree, 500);
								}
							}
							delete lib.init.start;
							game.loop();
							app.emit('createArenaAfter');
						};
						if (!_status.connectMode) {
							var loadNextExtension = function () {
								var obj = lib.extensions.shift();
								if (obj) {
									try {
										_status.extension = obj[0];
										_status.evaluatingExtension = obj[3];
										if (obj[4]) {
											if (obj[4].character) {
												for (var j in obj[4].character.character) {
													game.addCharacterPack(get.copy(obj[4].character));
													break;
												}
											}
											if (obj[4].card) {
												for (var j in obj[4].card.card) {
													game.addCardPack(get.copy(obj[4].card));
													break;
												}
											}
											if (obj[4].skill) {
												for (var j in obj[4].skill.skill) {
													game.addSkill(j, obj[4].skill.skill[j],
														obj[4].skill.translate[j], obj[4].skill.translate[j + '_info']);
												}
											}
										}
										var func = obj[1](obj[2], obj[4]);
										if (typeof func === 'function') {
											func(loadNextExtension);
										} else {
											loadNextExtension();
										}
									} catch (e) {
										console.log(e);
										loadNextExtension();
									}
								} else {
									delete _status.extension;
									delete _status.evaluatingExtension;
									loadExtensionCallback();
								}
							};
							loadNextExtension();
						} else {
							loadExtensionCallback();
						}
					}
					var proceed = function () {
						if (!lib.db) {
							try {
								lib.storage = JSON.parse(localStorage.getItem(lib.configprefix + lib.config.mode));
								if (typeof lib.storage != 'object') throw ('err');
								if (lib.storage == null) throw ('err');
							}
							catch (err) {
								lib.storage = {};
								localStorage.setItem(lib.configprefix + lib.config.mode, "{}");
							}
							proceed2();
						}
						else {
							game.getDB('data', lib.config.mode, function (obj) {
								lib.storage = obj || {};
								proceed2();
							});
						}
					};
					//---------界面函数-----//		
					if (!lib.imported.mode || !lib.imported.mode[lib.config.mode]) {
						window.inSplash = true;
						clearTimeout(window.resetGameTimeout);
						delete window.resetGameTimeout;
						var clickedNode = false;
						var clickNode = function () {
							if (clickedNode) return;
							this.classList.add('clicked');
							clickedNode = true;
							lib.config.mode = this.link;
							game.saveConfig('mode', this.link);
							if (game.layout != 'mobile' && lib.layoutfixed.indexOf(lib.config.mode) !==
								-1) {
								game.layout = 'mobile';
								ui.css.layout.href = lib.assetURL + 'layout/' + game.layout +
									'/layout.css';
							} else if (game.layout == 'mobile' && lib.config.layout != 'mobile' && lib
								.layoutfixed.indexOf(lib.config.mode) === -1) {
								game.layout = lib.config.layout;
								if (game.layout == 'default') {
									ui.css.layout.href = '';
								} else {
									ui.css.layout.href = lib.assetURL + 'layout/' + game.layout +
										'/layout.css';
								}
							}
							splash.delete(1000);
							delete window.inSplash;
							window.resetGameTimeout = setTimeout(lib.init.reset, 5000);

							this.listenTransition(function () {
								lib.init.js(lib.assetURL + 'mode', lib.config.mode, proceed);
							}, 500);
						}
						var downNode = function () {
							this.classList.add('glow');
						}
						var upNode = function () {
							this.classList.remove('glow');
						}
						var splash = ui.create.div('#splash', document.body);
						if (lib.config.touchscreen) {
							splash.classList.add('touch');
							lib.setScroll(splash);
						}
						if (lib.config.player_border != 'wide') {
							splash.classList.add('slim');
						}
						splash.dataset.radius_size = lib.config.radius_size;
						for (var i = 0; i < lib.config.all.mode.length; i++) {
							var node = ui.create.div('.hidden', splash, clickNode);
							node.link = lib.config.all.mode[i];
							ui.create.div(node, '.splashtext', get.verticalStr(get.translation(lib.config
								.all.mode[i])));
							if (lib.config.all.stockmode.indexOf(lib.config.all.mode[i]) != -1) {

								/*-----------------分割线-----------------*/
								// 启动页素材调用
								// 动态启动页素材调用
								if (lib.config.extension_手杀ui_qiDongYe == 'on') {
									ui.create.div(node, '.avatar').setBackgroundImage('extension/手杀ui/qiDongYe/new/' + lib.config.all.mode[i] + '.jpg');
								}
								// 大启动页素材调用
								if (lib.config.extension_手杀ui_qiDongYe == 'othersOn') {
									ui.create.div(node, '.avatar').setBackgroundImage('extension/手杀ui/qiDongYe/big/' + lib.config.all.mode[i] + '.jpg');
								}

								//大启动页新版
								if (lib.config.extension_手杀ui_qiDongYe == 'othersTwo') {
									ui.create.div(node, '.avatar').setBackgroundImage('extension/手杀ui/qiDongYe/xbig/' + lib.config.all.mode[i] + '.jpg');
								}

								// 选择关闭时调用本体素材
								if (lib.config.extension_手杀ui_qiDongYe == 'off') {
									ui.create.div(node, '.avatar').setBackgroundImage('image/splash/' + lib.config.all.mode[i] + '.jpg');
								}
								/*-----------------分割线-----------------*/
							} else {
								var avatarnode = ui.create.div(node, '.avatar');
								var avatarbg = lib.mode[lib.config.all.mode[i]].splash;
								if (avatarbg.indexOf('ext:') == 0) {
									avatarnode.setBackgroundImage(avatarbg.replace(/ext:/, 'extension/'));
								} else {
									avatarnode.setBackgroundDB(avatarbg);
								}
							}
							if (!lib.config.touchscreen) {
								node.addEventListener('mousedown', downNode);
								node.addEventListener('mouseup', upNode);
								node.addEventListener('mouseleave', upNode);
							}
							setTimeout((function (node) {
								return function () {
									node.show();
								}
							}(node)), i * 100);
						}
						if (lib.config.mousewheel) {
							splash.onmousewheel = ui.click.mousewheel;
						}
					} else {
						proceed();
					}
					localStorage.removeItem(lib.configprefix + 'directstart');
					delete lib.init.init;
					//------------------//
				};
			}, 100);
			//定时器尾

			if (lib.config.dev) {
				window.app = app;





			}
		},
		config: {
			KZJS: {
				name: '<div class="shousha_menu">扩展介绍·点击展开</div>',
				clear: true,
				onclick: function () {
					if (this.KZJS == undefined) {
						var more = ui.create.div('.KZJS', '<div class="shousha_text">' + '<br>本扩展偏向于细节上的美化，附带一点娱乐性，需要搭配十周年UI使用，以便拥有更好的扩展体验<br><li>在众多大佬的帮助下，本扩展拥有了很高的还原度。感谢为爱发电的大佬们。无名杀是一款非盈利游戏，祝你游戏愉快' + '</div>');
						this.parentNode.insertBefore(more, this.nextSibling);
						this.KZJS = more;
						this.innerHTML = '<div class="shousha_menu">扩展介绍·点击关闭</div>';
					} else {
						this.parentNode.removeChild(this.KZJS);
						delete this.KZJS;
						this.innerHTML = '<div class="shousha_menu">扩展介绍·点击展开</div>';
					};
				}
			},
			//-----------//
			GXSM: {
				name: '<div class="shousha_menu">更新说明(点击查看)</div>',
				clear: true,
				onclick: function () {
					var h = document.body.offsetHeight;
					var w = document.body.offsetWidth;
					shousha_update = ui.create.div('.shousha_update', '<div><iframe width="' + w + 'px" height="' + h + 'px"  src="' + lib.assetURL + 'extension/手杀ui/update.html" ></iframe></div>', ui.window);
					shousha_update_close = ui.create.div('.shousha_update_close', shousha_update, function () {
						shousha_update.delete()
					});

				}
			},
			//------------//

			MX: {
				"name": "鸣谢表",
				"init": "1",
				"item": {
					"1": "点击查看",
					"2": "永远的萌新",
					"3": "Empty city°",
					"4": "阿七",
					"5": "神秘喵",
					"6": "꧁꫞꯭✨fly✨꯭꫞꧂",
					"7": "俺杀",
					"8": "呲牙哥",
					"9": "寻",
					"10": "喋血长歌",
					"11": "弩弩弩",
					"12": "萝卜",
					"13": "可宣",
					"14": "黄老板",
					"15": "只叹年华未央",
					"16": "风雪弥漫",
					"17": "阳光微凉",
					"18": "零二哟",
					"19": "群小乔",
					"20": "棘手怀念摧毁",

				},
				"textMenu": function (node, link) {
					lib.setScroll(node.parentNode);
					node.parentNode.style.transform = "translateY(-100px)";
					node.parentNode.style.height = "500px";
					node.parentNode.style.width = "300px";
					//node.style.width="400px";
					switch (link) {
						case "1":
							node.innerHTML = "<img style=width:50px src=" + lib.assetURL +
								"extension/手杀ui/lbtn/images/MX/MX.png><br>鸣谢名单";
							break;
						case "2":
							node.innerHTML = "<img style=width:50px src=" + lib.assetURL +
								"extension/手杀ui/lbtn/images/MX/zXY.png><br>提供技术指导，修复无懈可击bug。整理手牌bug。";
							break;
						case "3":
							node.innerHTML = "<img style=width:50px src=" + lib.assetURL +
								"extension/手杀ui/lbtn/images/MX/zE.png><br>参与更新测试，完善手杀样式细节优化，提出顶部滚动栏意见";
							break;
						case "4":
							node.innerHTML = "<img style=width:50px src=" + lib.assetURL +
								"extension/手杀ui/lbtn/images/MX/zAQ.png><br>提供素材美化，手牌，菜单按钮等。";
							break;
						case "5":
							node.innerHTML = "<img style=width:50px src=" + lib.assetURL +
								"extension/手杀ui/lbtn/images/MX/zSMM.png><br>提供技术指导，非常感谢(●—●)";
							break;
						case "6":
							node.innerHTML = "<img style=width:50px src=" + lib.assetURL +
								"extension/手杀ui/lbtn/images/MX/zfly.png><br>提供魔改框架，手牌显示等等";
							break;
						case "7":
							node.innerHTML = "<img style=width:50px src=" + lib.assetURL +
								"extension/手杀ui/lbtn/images/MX/zAS.png><br>提供技术指导，阶段提示框架和代码，身份提示等";
							break;
						case "8":
							node.innerHTML = "<img style=width:50px src=" + lib.assetURL +
								"extension/手杀ui/lbtn/images/MX/zCYG.png><br>提供技术指导，进度条技术，添加图片框架";
							break;
						case "9":
							node.innerHTML = "<img style=width:50px src=" + lib.assetURL +
								"extension/手杀ui/lbtn/images/MX/zX.png><br>更新样式切换功能，文件分开调用";
							break;
						case "10":
							node.innerHTML = "<img style=width:50px src=" + lib.assetURL +
								"extension/手杀ui/lbtn/images/MX/zDXZG.png><br>提供宝贵意见和帮助";
							break;
						case "11":
							node.innerHTML = "<img style=width:50px src=" + lib.assetURL +
								"extension/手杀ui/lbtn/images/MX/zNU.png><br>提供手杀素材";
							break;
						case "12":
							node.innerHTML = "<img style=width:50px src=" + lib.assetURL +
								"extension/手杀ui/lbtn/images/MX/zLB.png><br>提供素材和意见";
							break;
						case "13":
							node.innerHTML = "<img style=width:50px src=" + lib.assetURL +
								"extension/手杀ui/lbtn/images/MX/zKX.png><br>提供帮助和狗托播报的部分文案";
							break;
						case "14":
							node.innerHTML = "<img style=width:50px src=" + lib.assetURL +
								"extension/手杀ui/lbtn/images/MX/zHLB.png><br>提供部分素材和帮助";
							break;
						case "15":
							node.innerHTML = "<img style=width:50px src=" + lib.assetURL +
								"extension/手杀ui/lbtn/images/MX/zZTNH.png><br>提供帮助，部分细节代码，参与测试";
							break;
						case "16":
							node.innerHTML = "<img style=width:50px src=" + lib.assetURL +
								"extension/手杀ui/lbtn/images/MX/zFXMM.png><br>提供帮助和手杀样式的一些细节建议";
							break;
						case "17":
							node.innerHTML = "<img style=width:50px src=" + lib.assetURL +
								"extension/手杀ui/lbtn/images/MX/zYGWL.png><br>提供美化页素材和帮助";
							break;
						case "18":
							node.innerHTML = "<img style=width:50px src=" + lib.assetURL +
								"extension/手杀ui/lbtn/images/MX/zLE.png><br>提供建议和渐变色图片方案";
							break;
						case "19":
							node.innerHTML = "<img style=width:50px src=" + lib.assetURL +
								"extension/手杀ui/lbtn/images/MX/zXQ.png><br>提供聊天框架和技术指导";
							break;
						case "20":
							node.innerHTML = "<img style=width:50px src=" + lib.assetURL +
								"extension/手杀ui/lbtn/images/MX/zJS.png><br>解决了本体版本更新后本扩展无法使用的问题";
							break;
					}
				},
			},
			FL1: {
				"name": "<img style=width:240px src=" + lib.assetURL + "extension/手杀ui/line.png>",
				"intro": "",
				"init": true,
				"clear": true,
			},
			/*进度条说明*/
			JDTSM: {
				name: '<div class="shousha_menu">进度条·查看</div>',
				clear: true,
				onclick: function () {
					if (this.JDTSM == undefined) {
						var more = ui.create.div('.JDTSM', '<div class="shousha_text"><li><b>进度条</b>:完善时机包括玩家回合内、人机回合内、玩家回合外、人机回合外。<li><b>进度条时间间隔</b>:设置玩家进度条的时间间隔，默认100毫秒/次<li><b>时间间隔</b>：通俗点说，就是进度条刷新的自定义时间单位/次。时间间隔越小，进度条总时间越少，反之亦然。<li><b>切换不生效？</b>:在游戏里切换时间间隔后不会马上生效，会在下一次进度条出现时生效。<li><b>进度条高度百分比</b>:现在可以在游戏里动态调节进度条高度了，变化发生在每次刷新时，建议开启<b>进度条刷新</b>功能搭配使用。可调节的范围在10%-40%左右。<li><b>进度条刷新</b>:在游戏里开启后，进度条会在每个节点进行刷新（也就是大伙说的旧版进度条）。</div>');
						this.parentNode.insertBefore(more, this.nextSibling);
						this.JDTSM = more;
						this.innerHTML = '<div class="shousha_menu">进度条·关闭</div>';
					} else {
						this.parentNode.removeChild(this.JDTSM);
						delete this.JDTSM;
						this.innerHTML = '<div class="shousha_menu">进度条·查看</div>';
					};
				}
			},
			/*-----进度条-------*/
			jindutiao: {
				init: false,
				intro: "自己回合内显示进度条带素材",
				name: "进度条"
			},
			jindutiaoYangshi: {
				name: "进度条样式",
				init: "1",
				intro: "切换进度条样式，可根据个人喜好切换手杀进度条或十周年进度条，切换后重启生效",
				item: {
					"1": "手杀进度条",
					"2": "十周年PC端进度条",
					"3": "十周年客户端进度条",
				},
			},
			jindutiaotuoguan: {
				name: "托管效果",
				init: false,
				intro: "开启进度条的情况下，开启此选项后，当玩家的进度条时间走完时，将自动托管。",
			},
			jindutiaoST: {
				name: "进度条时间间隔",
				init: "100",
				intro: "<li>设置玩家进度条的时间间隔。",
				item: {
					"10": "10毫秒/次",
					"50": "50毫秒/次",
					"100": "100毫秒/次",
					"200": "200毫秒/次",
					"500": "500毫秒/次",
					"800": "800毫秒/次",
					"1000": "1秒/次",
					"2000": "2秒/次",
				},
			},
			jindutiaoUpdata: {
				name: "玩家进度条刷新",
				init: false,
				intro: "开启进度条的情况下，开启此选项后，玩家进度条将会进行刷新",
			},
			jindutiaoaiUpdata: {
				name: "人机进度条刷新",
				init: false,
				intro: "开启进度条的情况下，开启此选项后，ai的进度条将会进行刷新",
			},
			jindutiaoSet: {
				name: "进度条高度",
				init: "20",
				intro: "<li>设置玩家进度条的高度百分比。",
				item: {
					"10": "10%",
					"15": "15%",
					"20": "20%",
					"10": "10%",
					"15": "15%",
					"20": "20%",
					"21": "21%",
					"22": "22%",
					"23": "23%",
					"24": "24%",
					"25": "25%",
					"26": "26%",
					"27": "27%",
					"28": "28%",
					"29": "29%",
					"30": "30%",
					"31": "31%",
					"32": "32%",
					"33": "33%",
					"34": "34%",
					"35": "35%",
					"36": "36%",
					"37": "37%",
					"38": "38%",
					"39": "39%",
				},
			},

			FL2: {
				"name": "<img style=width:240px src=" + lib.assetURL + "extension/手杀ui/line.png>",
				"intro": "",
				"init": true,
				"clear": true,
			},
			/*阶段提示说明*/
			JDTSSM: {
				name: '<div class="shousha_menu">阶段提示·查看</div>',
				clear: true,
				onclick: function () {
					if (this.JDTSSM == undefined) {
						var more = ui.create.div('.JDTSSM', '<div class="shousha_text"><li><b>阶段提示</b>:回合开始、判定阶段、摸牌阶段、出牌阶段、弃牌阶段、等待响应、对方思考中，其中[对方思考中]，在游戏人数不大于两人时才会出现。<li><b>位置微调</b>：在游玩太虚幻境模式或者使用Eng侍灵扩展时，为避免遮挡，会自动判断并调整阶段提示位置<li><b>人机也有？</b>:人机做了进度条美化和阶段提示美化，样式跟随UI切换。</div>');
						this.parentNode.insertBefore(more, this.nextSibling);
						this.JDTSSM = more;
						this.innerHTML = '<div class="shousha_menu">阶段提示·关闭</div>';
					} else {
						this.parentNode.removeChild(this.JDTSSM);
						delete this.JDTSSM;
						this.innerHTML = '<div class="shousha_menu">阶段提示·查看</div>';
					};
				}
			},


			/*----阶段提示----*/
			JDTS: {
				init: false,
				intro: "自己回合内显示对应阶段图片提示",
				name: "阶段提示"
			},
			JDTSYangshi: {
				name: "阶段提示样式",
				init: "1",
				intro: "切换阶段提示样式，可根据个人喜好切换",
				item: {
					"1": "手杀阶段提示",
					"2": "十周年阶段提示",
				},
			},

			FL3: {
				"name": "<img style=width:240px src=" + lib.assetURL + "extension/手杀ui/line.png>",
				"intro": "",
				"init": true,
				"clear": true,
			},
			/*狗托播报说明*/
			GTBBSM: {
				name: '<div class="shousha_menu">狗托播报·查看</div>',
				clear: true,
				onclick: function () {
					if (this.GTBBSM == undefined) {
						var more = ui.create.div('.GTBBSM', '<div class="shousha_text"><li><b>狗托播报</b>:开启后，顶部会出现滚动播报栏。PS:狗托误我啊!<li><b>播报样式</b>：新增一种样式，可选择切换，需重启。【手杀/十周年】<li><b>播报时间间隔</b>:需重启，调整每条播报的出现频率。</div>');
						this.parentNode.insertBefore(more, this.nextSibling);
						this.GTBBSM = more;
						this.innerHTML = '<div class="shousha_menu">狗托播报·关闭</div>';
					} else {
						this.parentNode.removeChild(this.GTBBSM);
						delete this.GTBBSM;
						this.innerHTML = '<div class="shousha_menu">狗托播报·查看</div>';
					};
				}
			},


			/*-------狗托播报-----*/
			GTBB: {
				init: false,
				intro: "开启后，顶部会出现滚动播报栏。",
				name: "狗托播报"
			},
			GTBBYangshi: {
				name: "播报样式(需重启)",
				init: "on",
				intro: "切换狗托播报样式",
				item: {
					"on": "手杀",
					"off": "十周年",
				},
			},
			GTBBFont: {
				name: "播报字体",
				init: "on",
				intro: "切换狗托播报字体，可根据个人喜好切换（即时生效）",
				item: {
					"on": "<font face=\"shousha\">手杀",
					"off": "<font face=\"yuanli\">十周年",
				},
			},
			GTBBTime: {
				name: "时间间隔(重启生效)",
				init: "60000",
				intro: "更改狗托播报出现的时间间隔，可根据个人喜好调整频率",
				item: {
					"30000": "0.5min/次",
					"60000": "1min/次",
					"120000": "2min/次",
					"300000": "5min/次",
				},
			},

			/*界面样式*/
			FL4: {
				"name": "<img style=width:240px src=" + lib.assetURL + "extension/手杀ui/line.png>",
				"intro": "",
				"init": true,
				"clear": true,
			},
			/*界面样式说明*/
			JMYSSM: {
				name: '<div class="shousha_menu">界面样式·查看</div>',
				clear: true,
				onclick: function () {
					if (this.JMYSSM == undefined) {
						var more = ui.create.div('.JMYSSM', '<div class="shousha_text"><li><b>样式选择</b>:分为手杀样式和十周年样式<li><b>手杀布局</b>：点击左上角的小问号可以查看玩家当前身份提示。身份提示，做了多模式的完善。点击牌序可以切换[自动牌序]or[手动牌序]，左下角的菜篮子现在可以点砸蛋送花了。<li><b>十周年布局</b>:在此布局下点击小配件，可以选择切换左下角的素材样式（重启后生效）。点击右上角小问号可以查看玩家当前身份提示</div>');
						this.parentNode.insertBefore(more, this.nextSibling);
						this.JMYSSM = more;
						this.innerHTML = '<div class="shousha_menu">界面样式·关闭</div>';
					} else {
						this.parentNode.removeChild(this.JMYSSM);
						delete this.JMYSSM;
						this.innerHTML = '<div class="shousha_menu">界面样式·查看</div>';
					};
				}
			},
			yangshi: {
				name: '<b><font color=\"#00FFFF\">界面布局',
				init: 'on',
				intro: '切换手杀UI界面样式，初始为手杀样式，可根据个人喜好切换手杀样式或十周年样式，切换后重启生效',
				item: {
					on: '<b><font color=\"#80FF80\">手杀样式',
					off: '<b><font color=\"#FFFF00\">十周年样式',
				},
			},
			XPJ: {
				name: "小配件（十周年）",
				init: "on",
				intro: "十周年样式下，选择切换左下角小配件",
				item: {
					"on": "原版",
					"off": "新版",
				},
			},
			LTAN: {
				init: false,
				intro: "<li>手杀样式下在游戏中，隐藏左下角的聊天按钮<li>需重启",
				name: "聊天按钮隐藏"
			},

			/*其他美化*/
			FL5: {
				"name": "<img style=width:240px src=" + lib.assetURL + "extension/手杀ui/line.png>",
				"intro": "",
				"init": true,
				"clear": true,
			},
			/*其他美化说明*/
			QTMHSM: {
				name: '<div class="shousha_menu">其他美化·查看</div>',
				clear: true,
				onclick: function () {
					if (this.QTMHSM == undefined) {
						var more = ui.create.div('.QTMHSM', '<div class="shousha_text"><li><b>开关美化</b>:开启后重启，将用美化素材替换掉游戏菜单的所有开关。<li><b>启动页</b>：可以更改游戏初始界面的游戏画面。分为动态，大图两种。<li><b>结算界面隐藏</b>:开启后，在没有安装【假装无敌】扩展时，游戏结束后会直接关闭结算界面，反之会在结算界面上添加[隐藏结算]按钮。</div>');
						this.parentNode.insertBefore(more, this.nextSibling);
						this.QTMHSM = more;
						this.innerHTML = '<div class="shousha_menu">其他美化·关闭</div>';
					} else {
						this.parentNode.removeChild(this.QTMHSM);
						delete this.QTMHSM;
						this.innerHTML = '<div class="shousha_menu">其他美化·查看</div>';
					};
				}
			},
			KGMH: {
				init: "0",
				intro: "开启后可以美化游戏的选项开关，需要重启",
				name: "开关美化",
				item: {
					"0": "关闭",
					"1": "手杀",
					"2": "十周年",
				},
			},
			qiDongYe: {
				name: '<b><font color=\"#FF0000\">启动页',
				init: 'off',
				intro: '可直接通过此功能切换启动页样式',
				item: {
					on: '<b><font color=\"#FF3000\">启动页-动态',
					othersOn: '<b><font color=\"#0080FF\">启动页-大图',
					othersTwo: '<b><font color=\"#0050FF\">启动页-新版',
					off: '<b><font color=\"#00FF00\">关闭',
				},
			},
			JSAN: {
				init: false,
				intro: "<li>在游戏结束时，出现按钮隐藏结算菜单或直接隐藏结算菜单<li>可以点击游戏界面中心空白区域显示菜单",
				name: "结算按钮隐藏"
			},
			ZLLT: {
				init: false,
				name: "资料页露头(重启生效)",
				intro: "手杀样式下，点击武将资料页会适配露头皮肤。",
			},
			import: {
				name: '该扩展原作者为程序猿（暂时没有得到原作者允许）',
				clear: true,
			},
		},
		editable: false,
	};
});
