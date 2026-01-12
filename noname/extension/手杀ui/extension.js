game.import('extension', function (lib, game, ui, get, ai, _status) {
    //node跟随主题隐藏
    window.shoushaBlanks=[];
    window.shoushaBlanks_isHide=false;
    window.shoushaBlanks_hide=function(num,sum,node) {
	    //触发时删除手杀ui菜篮子
		if(window.chatBg != undefined && window.chatBg.shown && game.showChatWordBackgroundX) {
	        game.showChatWordBackgroundX();
	    }
	    //取消点击事件
	    if(node.pointerEvents) {
            node.style['pointer-events']='none';
            return;
        }
        window.shoushaBlanks_isHide=true;
	    node.style.transition='all 0.3s';
	    node.style.opacity=0.3;
	    if(lib.config.blur_ui) {
            node.style.filter='blur(3px)';
        }else {
            node.style.filter='';
        }
        //这个结算直接去掉
        if(node.id&&node.id=='shouShaJieSuanDiv') {
            node.hide();
        }
        //这个就尝试点击一下
        if(node.needToClick&&node.click) node.click();
        //这个就尝试隐藏
        if(node.needToHide) {
            node.style.display='none';
            node.style['pointer-events']='none';
        }
        /*var opa=((sum-num)/sum);
        if(lib.config.blur_ui) {
            node.style.filter='blur('+3*(1-opa)+'px)';
            node.style.opacity=opa*0.7+0.3;
        }else {
            node.style.filter='';
            node.style.opacity=opa*0.7+0.3;
        }
        if(num<sum) {
            setTimeout(function(){
                window.shoushaBlanks_hide(num+1,sum,node);
            },10);
        }/*else {
            node.style.opacity=0.3;
        }*/
    }
    window.shoushaBlanks_show=function(num,sum,node) {
        //恢复点击事件
        if(node.pointerEvents) {
            node.style['pointer-events']='auto';
            return;
        }
        window.shoushaBlanks_isHide=false;
        node.style.transition='all 0.3s';
	    node.style.opacity=1;
	    node.style.filter='';
	    if(node.id&&node.id=='shouShaJieSuanDiv') {
            node.show();
        }
        //这个就尝试隐藏
        if(node.needToHide) {
            node.style.display='';
            node.style['pointer-events']='auto';
        }
        /*var opa=(num/sum);
        if(lib.config.blur_ui) {
            node.style.filter='blur('+3*(1-opa)+'px)';
            node.style.opacity=opa*0.7+0.3;
        }else {
            node.style.filter='';
            node.style.opacity=opa*0.7+0.3;
        }
        if(num<sum) {
            setTimeout(function(){
                window.shoushaBlanks_show(num+1,sum,node);
            },10);
        }/*else {
            node.style.opacity=1;
        }*/
    }
    //死亡后取消托管（时机比蔡文姬断肠要晚）
    lib.skill._dieNoTuoguan={
        trigger:{
            player:"dieAfter",
        },
        forced:true,
        forceDie:true,
        direct:true,
        silent:true,
        priority:-999,
        filter:function(event,player) {
            return player==game.me&&ui.autonode;
        },
        content:function() {
            ui.autonode.hide();
        },
    };
    //作弊即时生效的代码
    lib.translate._menuCheat='指令';
    lib.skill._menuCheat={
	    //group:'menu_cheat_use',
	    enable:'chooseToUse',
	    silent:true,
	    direct:true,
	    popup:false,
	    filter:function(event,player) {
	        return player==game.me&&_status.auto&&window.hasCheat;
	    },
	    content:function(){
	        'step 0'
	        if(_status.auto) ui.click.auto();
	        'step 1'
	        if(window.funcCheat&&window.funcCheat.length) window.funcCheat.forEach(func=>{
	            func[0](func[1]);
	        });
	        'step 2'
	        window.funcCheat=false;
	        window.hasCheat=false;
	        //player.removeSkill('menu_cheat');
	    },
	    ai:{
            order:Infinity,
            result:{
                player:Infinity,
            },
        },
        "_priority":Infinity,
        subSkill:{
            use:{
                trigger:{
                    player:['useCardBefore','respondBefore'/*,'drawBefore'*/],
                },
                priority:Infinity,
                direct:true,
                filter:function(event,player) {
	                //if(event.name=='draw'&&event.skill) alert(event.skill);
	                return player==game.me&&_status.auto&&window.hasCheat;
	            },
                content:function(){
                    trigger.cancel();
                },
                "_priority":Infinity,
                sub:true,
            },
        },
	}

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
		//alert('"检测到按键显示异常，请按照以下流程操作:\n①关闭手杀ui并重启\n②打开菜单/外观/按钮背景，并改为默认\n③开启手杀ui并重启');
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
					var type='';
					if(dir.indexOf('character')==0) {
					    var key=lib.config.extension_无名补丁_charactermenu?lib.config.extension_无名补丁_charactermenu:'new';
					    type='_'+key;
					}
					if (lib.config.extension_手杀ui_yangshi == "on") {
						game.readFile('extension/' + app.name + '/' + dir + '/main1'+type+'.js',
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
			//发动技能函数
			var shoushaUI = lib.element.player.trySkillAnimate;
			lib.element.player.trySkillAnimate = function (name, popname, checkShow) {
				shoushaUI.apply(this, arguments);
				var that = this;

				//------技能进度条------------//
				if (lib.config['extension_手杀ui_enable'] && lib.config.extension_手杀ui_jindutiao == true) {
					if (!document.querySelector("#jindutiaopl") && that == game.me) {
						game.Jindutiaoplayer();
					} else if (that != game.me) {

						//game.log('技能进度条生效');
						var ab = that.getElementsByClassName("timeai");//进度条
						var cd = that.getElementsByClassName("tipshow");//阶段，出牌提示条
						var ef = that.getElementsByClassName("tipskill");//技能提示条

						//-------初始化-----//
						//if (ab[0]) ab[0].parentNode.removeChild(ab[0]);
						if(ab[0]) {
						    lib.shoushaRTip(ab[0],that);
						}
						//if (cd[0]) cd[0].parentNode.removeChild(cd[0]);
						if(cd[0]) {
						    lib.shoushaRTip(cd[0],that);
						}
						//if (ef[0]) ef[0].parentNode.removeChild(ef[0]);
						if(ef[0]) {
						    lib.shoushaRTip(ef[0],that);
						}


						game.JindutiaoAIplayer();
						window.boxContentAI.classList.add("timeai");
						that.appendChild(window.boxContentAI);

						var tipbanlist = ["_recasting", "jiu"];//过滤部分触发技能，可以自己添加

						if (!tipbanlist.contains(name) && lib.config.extension_手杀ui_yangshi == "on") {
							var tipskillbox = document.createElement('div');//盒子
							var tipshow = document.createElement("img");//图片思考中
							var tipskilltext = document.createElement('div');//技能文本

							//------盒子样式--------//
							tipskillbox.classList.add("tipskill");//盒子设置技能类名
							tipskillbox.style.cssText = "display:block;position:absolute;pointer-events:none;z-index:90;--w: 133px;--h: calc(var(--w) * 50/431);width: var(--w);height: var(--h);bottom:0px;";

							//--------技能文本-----//
							tipskilltext.innerHTML = get.skillTranslation(name, that).slice(0, 2);//font-size:11px;//bottom:-22px;//left:15px;
							tipskilltext.style.cssText = "color:#ADC63A;text-shadow:#707852 0 0;font-size:12.7px;font-family:shousha;display:block;position:absolute;z-index:91;bottom:-22.5px;letter-spacing:1.5px;line-height:15px;left:17px;";

							//-----思考中底图------//
							tipshow.src = lib.assetURL + 'extension/手杀ui/lbtn/images/shoushatip/skilltip.png';
							tipshow.style.cssText = "display:block;position:absolute;z-index:91;--w: 133px;--h: calc(var(--w) * 50/431);width: var(--w);height: var(--h);bottom:-22px;";

							lib.shoushaSTip(tipskillbox,that);
							tipskillbox.appendChild(tipshow);
							tipskillbox.appendChild(tipskilltext);
							that.appendChild(tipskillbox);
						}


					}

				}
				//--------------------------//   
			};
			//武将搜索代码摘抄至扩展ol
			var kzol_create_characterDialog = ui.create.characterDialog;
			ui.create.characterDialog = function() {
			var args = [{needsToDo: function(dlgs){
			    if(lib.config.dialog_gold_title) {
			        dlgs.add('自由选将');
			    }
			}}];
			for(var i=0; i<arguments.length; i++) {
			    args.push(arguments[i]);
			}
			var dialog = kzol_create_characterDialog.apply(this, args);
			if (lib.config.mode == 'stone') return dialog;
			/*var content_container = dialog.childNodes[0];
			var content = content_container.childNodes[0];
			var switch_con = content.childNodes[0];
			var buttons = content.childNodes[1];*/
			var toNext = lib.config.dialog_gold_title ? 1 : 0;
			var content_container = dialog.childNodes[0];
			var content = content_container.childNodes[0];
			var switch_con = content.childNodes[0+toNext];
			var buttons = content.childNodes[1+toNext];
			var div = ui.create.div('');
			div.style.height = '35px';
			div.style.width = 'calc(100%)';
			div.style.top = '-2px';
			div.style.left = '0px';
			div.style['white-space'] = 'nowrap';
			div.style['text-align'] = 'center';
			div.style['line-height'] = '26px';
			div.style['font-size'] = '24px';
			//div.style['font-family'] = 'xinwei';
			div.style['font-family'] = 'shousha';
			div.innerHTML = '<span style="color:#FFFFA3;text-shadow: 0 0 5px #000, 0 0 5px #000, 0 0 5px #000">搜索·</span>' +//搜索：
			/*	'<input type="text" style="width:150px;"></input>' +*/
				'<select size="1" style="width:80px;height:21px;transform:translateY(-3.7px);font-family:shousha;background-color:rgba(20,20,20,0.8)/*transparent这是全透明*/;color:#FFFFA3;box-shadow: 0 0 5px #000">' +//<select size="1" style="width:75px;height:21px;">
				'<option value="name">武将名称</option>' +
				'<option value="name1">武将ID</option>' +
				'<option value="skill">技能名称</option>' +
				'<option value="skill1">技能ID</option>' +
				'<option value="skill2">技能叙述</option>' +
				'→' +
				'<input type="text" style="width:145px;transform:translateY(-3.5px);font-family:shousha;background-color:rgba(50,50,50,0.8)/*transparent*/;color:rgba(255,255,255,0.8)/*#FFFFFF*/;box-shadow: 0 0 5px #000"></input>'+//<input type="text" style="width:150px;"></input>
				'</select>';
			var input = div.querySelector('input');
			input.onkeydown = function(e) {
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
			input.onmousedown = function(e) {
				e.stopPropagation();
			};
			if (lib.config['extension_武将卡牌搜索器_enable'] == true) {
				if (lib.config['extension_扩展ol_zyxj_search1'] != false) {
					if (window.诗笺_manual != undefined) {
						div.style.height = '58px';
						div.innerHTML += '<br><button>武将卡牌搜索器</button>';
						var button = div.querySelector('button');
						button.onclick = function() {
							window.诗笺_manual.show();
						};
					};
				};
			};
			if(dialog._titles?.goldTitle) {
			    dialog.content.style.paddingTop='13px';
			    //dialog._titles.goldTitle.innerHTML='';
			    dialog._titles.goldTitle.appendChild(div);
			    dialog._titles.goldTitle.style.zIndex=20;
			}else {
				switch_con.insertBefore(div, switch_con.firstChild);
			}
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

           
            //-----//
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
				player.updateMark(skill);
			};

			var originchangeZhuanhuanji=lib.element.player.$changeZhuanhuanji;
			lib.element.player.$changeZhuanhuanji = function (skill) {
				originchangeZhuanhuanji.apply(this,arguments);
				var info=get.info(skill);
				if(!info||!info.zhuanhuanji) return;
				//许邵随机到转换技就没有mark，强行动会报错
				var mark = this.node.xSkillMarks.querySelector('[data-id="' + skill + '"]');
				if(!mark) return;
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



            //-----适配尾--//
            
            //-------//

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
									/*list[i].childNodes[0].setBackgroundImage('extension/手杀ui/image/beishui.png');*/
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
				//--------AI回合内进度条-------类名timePhase------//
				lib.skill._jindutiaoO = {
					trigger: {
						player: ['phaseZhunbeiBegin', 'phaseBegin', 'phaseJudgeBegin', 'phaseDrawBegin', 'useCardAfter', 'phaseDiscardBegin', 'useSkillBefore', 'loseAfter']
					},
					filter: function (event, player) {
						if (document.querySelector("#jindutiaoAI") && lib.config.extension_手杀ui_jindutiaoaiUpdata == false) return false;
						return player != game.me && _status.currentPhase == player;
					},
					forced: true,
					charlotte: true,
					content: function () {
						var ab = player.getElementsByClassName("timePhase");
						if (ab[0]) {
						    //ab[0].parentNode.removeChild(ab[0]);
						    lib.shoushaRTip(ab[0],player);
						}
						game.JindutiaoAIplayer();
						window.boxContentAI.classList.add("timePhase");
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
								if (ab[0]) {
								    //ab[0].parentNode.removeChild(ab[0]);
								    lib.shoushaRTip(ab[0],player);
								}
							},
						},
					},
				};
				//------------AI回合外进度条-----类名timeai 以下都是-----//
				lib.skill._jindutiaoA = {
					trigger: {
						player: ['useCardBegin', 'respondBegin', 'chooseToRespondBegin', 'damageEnd', 'judgeEnd'],
					},
					forced: true,
					charlotte: true,
					filter: function (event, player) {
						if (document.querySelector("#jindutiaoAI") && lib.config.extension_手杀ui_jindutiaoaiUpdata == false) return false;
						return _status.currentPhase != player && player != game.me;
					},
					content: function () {
						var ab = player.getElementsByClassName("timeai");
						if (ab[0]) {
						    //ab[0].parentNode.removeChild(ab[0]);
						    lib.shoushaRTip(ab[0],player);
						}
						game.JindutiaoAIplayer();
						window.boxContentAI.classList.add("timeai");
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
								return player != game.me && _status.currentPhase != player;
							},
							content: function () {
								if (window.timerai) {
									clearInterval(window.timerai);
									delete window.timerai;
								}
								var ab = player.getElementsByClassName("timeai");
								if (ab[0]) {
								    //ab[0].parentNode.removeChild(ab[0]);
								    lib.shoushaRTip(ab[0],player);
								}
							},
						},
					},
				}
				//-------多目标-------//
				lib.skill._jindutiaoMB = {
					trigger: {
						player: 'useCardToPlayered',
					},
					forced: true,
					priority: -10,
					charlotte: true,
					filter: function (event, player) {
						return event.card && event.targets && event.targets.length;
					},
					content: function () {
						var boxContent = document.createElement('div')
						var boxTime = document.createElement('div')
						var imgBg = document.createElement('img')
						boxContent.classList.add("timeai");
						if (lib.config.extension_手杀ui_yangshi == "on") {
							//--------手杀样式-------------//  
							boxContent.style.cssText =
								"display:block;position:absolute;z-index:90;--w: 122px;--h: calc(var(--w) *4/145);width: var(--w);height: var(--h);left:3.5px;bottom:-6.2px;"
							boxTime.dataSum = boxTime.data = 125
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
							boxTime.dataSum = boxTime.data = 120
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
							var ab = trigger.target.getElementsByClassName("timeai");
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
						//------容错清除 全场-------------//
						close: {
							trigger: {
								global: ['phaseEnd', 'useCardAfter', 'dieBegin'],
							},
							filter: function (event, player) {
								event.respondix = 0;
								for (var i = 0; i < game.players.length; i++) {
									var ab = game.players[i].getElementsByClassName("timeai");
									if (ab[0]) event.respondix++;
								}
								return event.respondix > 0;
							},
							forced: true,
							priority: -1,
							charlotte: true,
							content: function () {
								for (var i = 0; i < game.players.length; i++) {
									var ab = game.players[i].getElementsByClassName("timeai");
									if (ab[0]) {
									    //ab[0].parentNode.removeChild(ab[0]);
									    lib.shoushaRTip(ab[0],player);
									}
								}
							},
						},
					},
				};
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
						boxContent.classList.add("timeai");
						if (lib.config.extension_手杀ui_yangshi == "on") {
							//--------手杀样式-------------//  
							boxContent.style.cssText =
								"display:block;position:absolute;z-index:90;--w: 122px;--h: calc(var(--w) *4/145);width: var(--w);height: var(--h);left:3.5px;bottom:-6.2px;"
							boxTime.dataSum = boxTime.data = 125
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
							boxTime.dataSum = boxTime.data = 120
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
									if (ab[0]) {
									    //ab[0].parentNode.removeChild(ab[0]);
									    lib.shoushaRTip(ab[0],game.players[i]);
									}
								}
							},
						},
					},
				};
				//------------回合外进度条消失------------//
				lib.skill._jindutiao_close = {
					close: {
						trigger: {
							player: ['phaseEnd', 'useCardAfter', 'gainEnd', 'loseEnd', 'damageAfter'],
						},
						filter: function (event, player) {
							return player != game.me && _status.currentPhase != player;
						},
						forced: true,
						priority: -1,
						charlotte: true,
						content: function () {
							var ab = player.getElementsByClassName("timeai");
							if (ab[0]) {
							    //ab[0].parentNode.removeChild(ab[0]);
							    lib.shoushaRTip(ab[0],player);
							}
						},
					},
				};
			}
			//-------出牌中提示(手杀/十周年)---------//

			lib.skill._chupaiA = {
				trigger: {
					player: ['phaseUseBegin', 'useCardEnd', 'loseEnd'],
				},
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					var a = player.getElementsByClassName("playertip");
					return player != game.me && _status.currentPhase == player && player.isPhaseUsing() && a.length <= 0;
				},
				content: function () {
					var tipss = player.getElementsByClassName("tipskill");
					if (tipss[0]) {
					    //tipss[0].parentNode.removeChild(tipss[0]);
					    lib.shoushaRTip(tipss[0],player);
					}

					var a = player.getElementsByClassName("playertip")
					if (a.length <= 0) {
						var tipAB = document.createElement("img");
						tipAB.classList.add("tipshow");//设置统一类名
						
						if (lib.config.extension_手杀ui_yangshi == "on") {
							tipAB.src = lib.assetURL + 'extension/手杀ui/lbtn/images/shoushatip/tip.png';
							tipAB.classList.add("playertip")
							tipAB.style.cssText = "display:block;position:absolute;z-index:91;--w: 133px;--h: calc(var(--w) * 50/431);width: var(--w);height: var(--h);bottom:-22px;";
						} else {
							tipAB.src = lib.assetURL + 'extension/手杀ui/lbtn/images/shoushatip/phasetip.png';
							tipAB.classList.add("playertip")
							tipAB.style.cssText = "display:block;position:absolute;z-index:92;--w: 129px;--h: calc(var(--w) * 50/431);width: var(--w);height: var(--h);bottom:-9.2px;transform:scale(1.2);";
						}
						lib.shoushaSTip(tipAB,player);
						player.appendChild(tipAB)
					}
				},
			};

			lib.skill._chupaiB = {
				trigger: {
					global: ['phaseUseEnd', 'dieBegin', 'phaseBegin'],
				},
				forced: true,
				priority: -1,
				charlotte: true,
				filter: function (event, player) {
					event.respondix = 0;
					for (var i = 0; i < game.players.length; i++) {
						var ab = game.players[i].getElementsByClassName("playertip");
						if (ab[0]) event.respondix++;
					}
					return event.respondix > 0;
				},
				content: function () {
					for (var i = 0; i < game.players.length; i++) {
						var ab = game.players[i].getElementsByClassName("playertip");
						if (ab[0]) {
						    //ab[0].parentNode.removeChild(ab[0]);
						    lib.shoushaRTip(ab[0],game.players[i]);
						}
					}
				},
			};


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
					var tipss = player.getElementsByClassName("tipskill");
					if (tipss[0]) {
					    //tipss[0].parentNode.removeChild(tipss[0]);
					    lib.shoushaRTip(tipss[0],player);
					}
					var a = player.getElementsByClassName("playertipQP")
					if (a.length <= 0) {
						var tipCD = document.createElement("img");
						tipCD.classList.add("tipshow");//设置统一类名
						
						if (lib.config.extension_手杀ui_yangshi == "on") {
							tipCD.src = lib.assetURL + 'extension/手杀ui/lbtn/images/shoushatip/tipQP.png';
							tipCD.classList.add("playertipQP")
							tipCD.style.cssText = "display:block;position:absolute;z-index:91;--w: 133px;--h: calc(var(--w) * 50/431);width: var(--w);height: var(--h);bottom:-22px;";
						} else {
							tipCD.src = lib.assetURL + 'extension/手杀ui/lbtn/images/shoushatip/discardtip.png';
							tipCD.classList.add("playertipQP")
							tipCD.style.cssText = "display:block;position:absolute;z-index:92;--w: 129px;--h: calc(var(--w) * 50/431);width: var(--w);height: var(--h);bottom:-9.2px;transform:scale(1.2);";
						}
						lib.shoushaSTip(tipCD,player);
						player.appendChild(tipCD)

					}
				}
			};
			lib.skill._chupaiD = {
				trigger: {
					global: ['phaseDiscardEnd', 'dieBegin'],
				},
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					event.respondix = 0;
					for (var i = 0; i < game.players.length; i++) {
						var ab = game.players[i].getElementsByClassName("playertipQP");
						if (ab[0]) event.respondix++;
					}
					return event.respondix > 0;
				},
				content: function () {
					for (var i = 0; i < game.players.length; i++) {
						var ab = game.players[i].getElementsByClassName("playertipQP");
						if (ab[0]) {
						    //ab[0].parentNode.removeChild(ab[0]);
						    lib.shoushaRTip(ab[0],game.players[i]);
						}
					}
				},
			};
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
					var tipss = player.getElementsByClassName("tipskill");
					if (tipss[0]) {
					    //tipss[0].parentNode.removeChild(tipss[0]);
					    lib.shoushaRTip(tipss[0],player);
					}
					var d = player.getElementsByClassName("playertipshan")
					if (d.length <= 0) {
						var tipEF = document.createElement("img");
						tipEF.classList.add("tipshow");//设置统一类名
						
						tipEF.src = lib.assetURL + 'extension/手杀ui/lbtn/images/shoushatip/tipshan.png';
						tipEF.classList.add("playertipshan")
						tipEF.style.cssText = "display:block;position:absolute;z-index:91;--w: 133px;--h: calc(var(--w) * 50/431);width: var(--w);height: var(--h);bottom:-22px;";
						lib.shoushaSTip(tipEF,player);
						player.appendChild(tipEF)
					}
				}
			};
			lib.skill._chupaiF = {
				trigger: {
					global: ['useCardEnd', 'respondEnd', 'dieBegin', 'phaseBegin', 'phaseEnd']
				},
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					event.respondix = 0;
					for (var i = 0; i < game.players.length; i++) {
						var ab = game.players[i].getElementsByClassName("playertipshan");
						if (ab[0]) event.respondix++;
					}
					return event.respondix > 0;
				},
				content: function () {
					for (var i = 0; i < game.players.length; i++) {
						var ab = game.players[i].getElementsByClassName("playertipshan");
						if (ab[0]) {
						    //ab[0].parentNode.removeChild(ab[0]);
						    lib.shoushaRTip(ab[0],game.players[i]);
						}
					}
				},
			};
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
					var tipss = player.getElementsByClassName("tipskill");
					if (tipss[0]) {
					    //tipss[0].parentNode.removeChild(tipss[0]);
					    lib.shoushaRTip(tipss[0],player);
					}
					var e = player.getElementsByClassName("playertipsha")
					if (e.length <= 0) {
						var tipGH = document.createElement("img");
						tipGH.classList.add("tipshow");//设置统一类名
						
						tipGH.src = lib.assetURL + 'extension/手杀ui/lbtn/images/shoushatip/tipsha.png';
						tipGH.classList.add("playertipsha")
						tipGH.style.cssText = "display:block;position:absolute;z-index:91;--w: 133px;--h: calc(var(--w) * 50/431);width: var(--w);height: var(--h);bottom:-22px;";
						lib.shoushaSTip(tipGH,player);
						player.appendChild(tipGH)

					}
				}
			};
			lib.skill._chupaiH = {
				trigger: {
					global: ['useCardEnd', 'respondEnd', 'dieBegin', 'phaseBegin', 'phaseEnd']
				},
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					event.respondix = 0;
					for (var i = 0; i < game.players.length; i++) {
						var ab = game.players[i].getElementsByClassName("playertipsha");
						if (ab[0]) event.respondix++;
					}
					return event.respondix > 0;
				},
				content: function () {
					for (var i = 0; i < game.players.length; i++) {
						var ab = game.players[i].getElementsByClassName("playertipsha");
						if (ab[0]) {
						    lib.shoushaRTip(ab[0],game.players[i]);
						}
					}
				},
			};
			//淡化入场处理
			lib.shoushaSTip=function(node,player){
			    if(!node) return;
			    node.style.opacity=0;
			    node.style.transition='all 0.1s ease';
			    setTimeout(function(){
			        node.style.opacity=1;
			        if(player&&player.node&&player.node.seat&&player.node.seat.hide) {
			            player.node.seat.hide();
			        }
			    },0);
			};
			//淡化消失处理！
			lib.shoushaRTip=function(node,player){
			    if(!node||!player||node.classList.contains("deleting")) return;
			    var hides=node.cloneNode(true);
			    hides.classList.add("deleting");
			    hides.style.transition='all 0.3s ease';
				player.appendChild(hides);
				node.parentNode.removeChild(node);
				setTimeout(function() {
					hides.style.opacity=0;
					setTimeout(function() {
					    if(typeof hides=='object'&&hides.parentNode!=null) hides.parentNode.removeChild(hides);
					    setTimeout(function() {
					    if(player&&player!=_status.currentPhase&&player.node&&player.node.seat&&player.node.seat.show) {
			                player.node.seat.show();
			            }
			            },200);
					},300);
				},0);
			};
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
					var tipss = player.getElementsByClassName("tipskill");
					if (tipss[0]) {
					    //tipss[0].parentNode.removeChild(tipss[0]);
					    lib.shoushaRTip(tipss[0],player);
					}
					var k = player.getElementsByClassName("playertiptao")
					if (k.length <= 0) {

						var tipMN = document.createElement("img");
						tipMN.classList.add("tipshow");//设置统一类名
						
						tipMN.src = lib.assetURL + 'extension/手杀ui/lbtn/images/shoushatip/tiptao.png';
						tipMN.classList.add("playertiptao")
						tipMN.style.cssText = "display:block;position:absolute;z-index:91;--w: 133px;--h: calc(var(--w) * 50/431);width: var(--w);height: var(--h);bottom:-22px;";
						lib.shoushaSTip(tipMN,player);
						player.appendChild(tipMN)
					}
				},
			};
			lib.skill._chupaiN = {
				trigger: {
					global: ['useCardEnd', 'respondEnd', 'dieBegin', 'phaseBegin', 'phaseEnd']
				},
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					event.respondix = 0;
					for (var i = 0; i < game.players.length; i++) {
						var ab = game.players[i].getElementsByClassName("playertiptao");
						if (ab[0]) event.respondix++;
					}
					return event.respondix > 0;
				},
				content: function () {
					for (var i = 0; i < game.players.length; i++) {
						var ab = game.players[i].getElementsByClassName("playertiptao");
						if (ab[0]) {
						    //ab[0].parentNode.removeChild(ab[0]);
						    lib.shoushaRTip(ab[0],game.players[i]);
						}
					}
				},
			};
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
					var tipss = player.getElementsByClassName("tipskill");
					if (tipss[0]) {
					    //tipss[0].parentNode.removeChild(tipss[0]);
					    lib.shoushaRTip(tipss[0],player);
					}
					var n = player.getElementsByClassName("playertipjiu")
					if (n.length <= 0) {
						var tipOP = document.createElement("img");
						tipOP.classList.add("tipshow");//设置统一类名
						
						tipOP.src = lib.assetURL + 'extension/手杀ui/lbtn/images/shoushatip/tipjiu.png';
						tipOP.classList.add("playertipjiu")
						tipOP.style.cssText = "display:block;position:absolute;z-index:91;--w: 133px;--h: calc(var(--w) * 50/431);width: var(--w);height: var(--h);bottom:-22px;";
						lib.shoushaSTip(tipOP,player);
						player.appendChild(tipOP)
					}
				},
			};
			lib.skill._chupaiP = {
				trigger: {
					global: ['useCardEnd', 'respondEnd', 'dieBegin', 'phaseBegin', 'phaseEnd']
				},
				forced: true,
				charlotte: true,
				filter: function (event, player) {
					event.respondix = 0;
					for (var i = 0; i < game.players.length; i++) {
						var ab = game.players[i].getElementsByClassName("playertipjiu");
						if (ab[0]) event.respondix++;
					}
					return event.respondix > 0;
				},
				content: function () {
					for (var i = 0; i < game.players.length; i++) {
						var ab = game.players[i].getElementsByClassName("playertipjiu");
						if (ab[0]) {
						    //ab[0].parentNode.removeChild(ab[0]);
						    lib.shoushaRTip(ab[0],game.players[i]);
						}
					}
				},
			};
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
					var tipss = player.getElementsByClassName("tipskill");
					if (tipss[0]) {
					    //tipss[0].parentNode.removeChild(tipss[0]);
					    lib.shoushaRTip(tipss[0],player);
					}
					var g = player.getElementsByClassName("playertipwuxie")
					if (g.length <= 0) {

						var tipIJ = document.createElement("img");
						tipIJ.classList.add("tipshow");//设置统一类名
						
						tipIJ.src = lib.assetURL + 'extension/手杀ui/lbtn/images/shoushatip/tipwuxie.png';
						tipIJ.classList.add("playertipwuxie")
						tipIJ.style.cssText = "display:block;position:absolute;z-index:91;--w: 133px;--h: calc(var(--w) * 50/431);width: var(--w);height: var(--h);bottom:-22px;";
						lib.shoushaSTip(tipIJ,player);
						player.appendChild(tipIJ)



					}
				}
			};
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
					//h[0].parentNode.removeChild(h[0])
					lib.shoushaRTip(h[0],trigger.player);

				}
			};
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
					var tipss = player.getElementsByClassName("tipskill");
					if (tipss[0]) {
					    //tipss[0].parentNode.removeChild(tipss[0]);
					    lib.shoushaRTip(tipss[0],player);
					}
					var l = player.getElementsByClassName("playertipplay")
					if (l.length <= 0) {

						var tipKL = document.createElement("img");
						tipKL.classList.add("tipshow");//设置统一类名
						
						if (lib.config.extension_手杀ui_yangshi == "on") {
							tipKL.src = lib.assetURL + 'extension/手杀ui/lbtn/images/shoushatip/tipplay.png';
							tipKL.classList.add("playertipplay")
							tipKL.style.cssText = "display:block;position:absolute;z-index:91;--w: 133px;--h: calc(var(--w) * 50/431);width: var(--w);height: var(--h);bottom:-22px;";
						} else {
							tipKL.src = lib.assetURL + 'extension/手杀ui/lbtn/images/shoushatip/thinktip.png';
							tipKL.classList.add("playertipplay")
							tipKL.style.cssText = "display:block;position:absolute;z-index:92;--w: 129px;--h: calc(var(--w) * 50/431);width: var(--w);height: var(--h);bottom:-9.2px;transform:scale(1.2);";
						}
						lib.shoushaSTip(tipKL,player);
						player.appendChild(tipKL)
					}
				}
			};
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
					//m[0].parentNode.removeChild(m[0])
					lib.shoushaRTip(m[0],trigger.player);

				}
			};
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
					var tipss = player.getElementsByClassName("tipskill");
					if (tipss[0]) {
					    //tipss[0].parentNode.removeChild(tipss[0]);
					    lib.shoushaRTip(tipss[0],player);
					}
					var d = player.getElementsByClassName("playertipthink")
					if (d.length <= 0) {

						var tipMNX = document.createElement("img");
						tipMNX.classList.add("tipshow");//设置统一类名
						
						tipMNX.src = lib.assetURL + 'extension/手杀ui/lbtn/images/shoushatip/thinktip.png';
						tipMNX.classList.add("playertipthink")
						tipMNX.style.cssText = "display:block;position:absolute;z-index:92;--w: 129px;--h: calc(var(--w) * 50/431);width: var(--w);height: var(--h);bottom:-9.2px;transform:scale(1.2);";
						lib.shoushaSTip(tipMNX,player);
						player.appendChild(tipMNX)

					}
				}
			};
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
					//e[0].parentNode.removeChild(e[0])
					lib.shoushaRTip(e[0],trigger.player);

				}
			};
			//-------技能提示条（容错清除）-------//
			lib.skill._skilltip_closeB = {
				trigger: {
					global: ['phaseUseEnd', 'dieBegin', 'dying', 'phaseBegin', 'useCardAfter', 'loseAfter', 'phaseEnd'],
				},
				forced: true,
				priority: -2,
				charlotte: true,
				filter: function (event, player) {
					event.respondix = 0;
					for (var i = 0; i < game.players.length; i++) {
						var ab = game.players[i].getElementsByClassName("tipskill");
						if (ab[0]) event.respondix++;
					}
					return event.respondix > 0;
				},
				content: function () {
					for (var i = 0; i < game.players.length; i++) {
						var ab = game.players[i].getElementsByClassName("tipskill");
						if (ab[0]) {
						    //ab[0].parentNode.removeChild(ab[0]);
						    lib.shoushaRTip(ab[0],game.players[i]);
						}
					}
				},
			};
			//狗托播报
			var offline=sessionStorage.getItem('Network');
			if(!offline) offline='online';
			if (config.GTBB&&offline!='offline'&&!window.qnssReload) {
				var txcsanm = {}
				var gddf = function () {

					var player = "玩家";
					var my = lib.config.connect_nickname;
				if(window.playerNickName&&window.playerNickName['all']) {
				    var suiji = window.playerNickName['all'].randomGet();
				}else {
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
				}
					//var name = [suiji, my].randomGet();
					var name = suiji;
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
					var d = ["，大家快恭喜TA吧！", "，大家快恭喜TA吧。(づ ●─● )づ", "，祝你新的一年天天开心，万事如意"].randomGet();
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
					txcsanm.div.style.cssText = "pointer-events:none;width:100%;height:25px;font-size:23px;z-index:99;";//index6
					txcsanm.div2.style.cssText = "pointer-events:none;background:rgba(0,0,0,0.5);width:100%;height:27px;";
					/*------------------------*/
				} else {
					/*-------十周年样式-------*/
					txcsanm.div.style.cssText = "pointer-events:none;width:56%;height:35px;font-size:18px;z-index:20;background-size:100% 100%;background-repeat:no-repeat;left:50%;top:15%;transform:translateX(-50%);";
					txcsanm.div.style['background-image'] = 'url(' + lib.assetURL + 'extension/手杀ui/lbtn/images/uibutton/goutuo.png';
					txcsanm.div2.style.cssText = "pointer-events:none;width:85.5%;height:35px;left:8%;line-height:35px;";
					/*------------------------*/
				}
				if(lib.config['extension_手杀ui_GTBBTime']=='random') {
				    var numt=[6,9,12,18,30].randomGet()*10000;
				}else {
				    var numt=parseFloat(lib.config['extension_手杀ui_GTBBTime']);
				}
				var id = setInterval(function () {
					if (!txcsanm.div.parentNode && ui.window) {
						ui.window.appendChild(txcsanm.div);
						clearInterval(id);
						gddf();
						if(lib.config['extension_手杀ui_GTBBTime']=='random') {
						    var num=[6,9,12,18,30].randomGet()*10000;
						    setInterval(gddf, num);
						}else {
						    setInterval(gddf, parseFloat(lib.config['extension_手杀ui_GTBBTime']));
						}
					}
				}, numt);

			}
			//阶段提示
			if (config.JDTS) {
				//等待响应 
				lib.skill._jd_ddxyA = {
					trigger: {
						player: ['chooseToRespondBegin'],
					},
					direct: true,
					filter: function (event, player) {
						return player == game.me;// && _status.auto == false;
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
						return player == game.me;// && _status.auto == false;
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
				game.jd_ddxy=function(){
				    if (lib.config.extension_手杀ui_JDTSYangshi == "1") {
					    if (get.mode() == 'taixuhuanjing' || lib.config['extension_EngEX_SSServant']) {
						    game.as_showImage('extension/手杀ui/lbtn/images/JDTS/ddxy.jpg', [10, 58, 7, 6], true)
				    	} else {
					    	game.as_showImage('extension/手杀ui/lbtn/images/JDTS/ddxy.jpg', [3, 58, 7, 6], true)
					    }
				    } else {
					    game.as_showImage('extension/手杀ui/lbtn/images/JDTS/ddxy.png', [18, 65, 8, 4.4], true)
				    }
				};
				game.jd_phase=function(phase){
				    if(!_status.as_showImage_phase) return;
				    if (lib.config.extension_手杀ui_JDTSYangshi == "1") {
						if (get.mode() == 'taixuhuanjing' || lib.config['extension_EngEX_SSServant']) {
							game.as_showImage('extension/手杀ui/lbtn/images/JDTS/' + phase + '.jpg', [10, 58, 7, 6], true);
						} else {
							game.as_showImage('extension/手杀ui/lbtn/images/JDTS/' + phase + '.jpg', [3, 58, 7, 6], true);
						}
					} else {
						game.as_showImage('extension/手杀ui/lbtn/images/JDTS/' + phase + '.png', [18, 65, 8, 4.4], true);
					}
				};
				//单独判断加个无懈
				lib.skill._jd_ddxyD = {
					trigger: {
						player: ['chooseToUseBegin','chooseToUseEnd'],
					},
					filter: function (event, player) {
						return event.type=='wuxie'&&game.me == event.player;
					},
					charlotte: true,
					forced: true,
					content: function () {
						if (event.triggername.indexOf('Begin')!=-1) {
						    game.jd_ddxy();
						    //alert(1);
						} else if (_status.as_showImage_phase) {
							game.jd_phase(_status.as_showImage_phase);
							//alert(2);
						}else {
							game.as_removeImage();
						}
					},
				};
				//判断加个群体卡牌
				lib.skill._jd_ddxyF = {
					trigger: {
						player: ['useCardBefore','useCardAfter'],
					},
					filter: function (event, player) {
						//alert(event.card.name);
						return event.card&&event.card.name&&lib.card[event.card.name].selectTarget!=1&&game.me == event.player;
					},
					charlotte: true,
					forced: true,
					content: function () {
						if (event.triggername.indexOf('Before')!=-1) {
						    game.jd_isRange=true;
						    //game.jd_ddxy();
						    //alert(1);
						} else if (_status.as_showImage_phase) {
							game.jd_isRange=false;
							game.jd_phase(_status.as_showImage_phase);
							//alert(2);
						}else {
							game.jd_isRange=false;
							game.as_removeImage();
						}
					},
				};
				//尝试写一个全能的（失败），暂时先用原版的
				/*lib.skill._jd_ddxyAll = {
					trigger: {
						global: ['chooseToUseBegin','chooseToUseEnd','chooseToRespondBegin','chooseToRespondEnd'],
					},
					filter: function (event, player) {
						if(_status.currentPhase == game.me) return true;
						return game.me == event.player;
					},
					charlotte: true,
					forced: true,
					content: function () {
						if(!event.triggername) return;
						if (event.triggername.indexOf('chooseToUse')==0) {
						    if(trigger.player==game.me) {
						        if(!trigger.type) return;
						        if(trigger.type!='wuxie') {
						            game.jd_phase(_status.as_showImage_phase);
						            return;
						        }
						    }else {
						        //next
						    }
						}
						//if (event.triggername == 'chooseToUseBegin') {
						if (event.triggername.indexOf('Begin')!=-1) {
						    game.jd_ddxy();
						    //alert(1);
						} else if (_status.as_showImage_phase) {
							game.jd_phase(_status.as_showImage_phase);
							//alert(2);
						}else {
							game.as_removeImage();
						}
					},
				};*/
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
						player: ['chooseToRespondEnd', 'useCardToEnd'/*, 'phaseJudgeEnd'*/, 'respondSha',
							'shanBegin'
						],
					},
					filter: function (event, player) {
						return player == game.me;// && _status.auto == false;
					},
					direct: true,
					content: function () {
						//game.as_removeImage();
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
						}else {
						    game.as_removeImage();
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
						return player == game.me;// && _status.auto == false;;
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
						//player: ['phaseBefore', 'phaseBegin'],
						player: ['phaseZhunbeiBefore','phaseZhunbeiAfter'],
					},
					filter: function (event, player) {
						return player == game.me && _status.currentPhase == player;// && _status.auto == false;
					},
					charlotte: true,
					forced: true,
					content: function () {
						//if (event.triggername == 'phaseBefore') {
						if (event.triggername == 'phaseZhunbeiBefore') {
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
						player: ['phaseJudgeBefore', 'phaseJudgeAfter'],
					},
					filter: function (event, player) {
						return player == game.me && _status.currentPhase == player;// && _status.auto == false;
					},
					charlotte: true,
					forced: true,
					content: function () {
						if (event.triggername == 'phaseJudgeBefore') {
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
						player: ['phaseDrawBefore', 'phaseDrawAfter'],
					},
					filter: function (event, player) {
						return player == game.me && _status.currentPhase == player;// && _status.auto == false;
					},
					charlotte: true,
					forced: true,
					content: function () {
						if (event.triggername == 'phaseDrawBefore') {
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
						player: ['phaseUseBefore', 'phaseUseAfter'],
					},
					filter: function (event, player) {
						return player == game.me && _status.currentPhase == player;// && _status.auto == false;
					},
					charlotte: true,
					forced: true,
					content: function () {
						if (event.triggername == 'phaseUseBefore') {
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
						player: ['phaseDiscardBefore', 'phaseDiscardAfter'],
					},
					filter: function (event, player) {
						return player == game.me && _status.currentPhase == player;// && _status.auto == false;
					},
					charlotte: true,
					forced: true,
					content: function () {
						if (event.triggername == 'phaseDiscardBefore') {
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
						//player: ['phaseEnd', 'phaseAfter']
						player: ['phaseJieshuBefore', 'phaseJieshuAfter']
					},
					filter: function (event, player) {
						return player == game.me && _status.currentPhase == player;// && _status.auto == false;
					},
					charlotte: true,
					forced: true,
					content: function () {
						//if (event.triggername == 'phaseEnd') {
						if (event.triggername == 'phaseJieshuBefore') {
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
				//回合结束
				lib.skill._jd_phaseAfter = {
					trigger: {
						player: ['phaseAfter']
					},
					filter: function (event, player) {
						return player == game.me;
					},
					charlotte: true,
					forced: true,
					content: function () {
					    setTimeout(function() {
					        if(!_status.as_showImage_phase&&_status.as_showImage&&_status.as_showImage.myUrl.indexOf('ddxy')==-1) {
					            game.as_removeImage();
					        }
					    },1000);
					}
				};
			}
			//调用进度条
            // 任务队列类
            class TaskQueue {
                constructor(interval = 250) {
                    this.queue = [];
                    this.interval = interval;
                    this.timer = null;
                    this.running = false;
                }
            
                addTask(task) {
                    this.queue.push(task);
                    if (!this.running) {
                        this.start();
                    }
                }
            
                start() {
                    if (this.running) return;
                    this.running = true;
                    this.processQueue();
                }
            
                processQueue() {
                    if (this.queue.length === 0) {
                        this.running = false;
                        return;
                    }
            
                    const task = this.queue.shift();
                    if (typeof task === 'function') {
                        try {
                            task();
                        } catch (e) {
                            console.error('Task execution error:', e);
                        }
                    }
            
                    this.timer = setTimeout(() => {
                        this.processQueue();
                    }, this.interval);
                }
            
                clear() {
                    if (this.timer) {
                        clearTimeout(this.timer);
                        this.timer = null;
                    }
                    this.queue = [];
                    this.running = false;
                }
            }
            
            // 创建全局任务队列实例
            if (!window.taskQueue) {
                window.taskQueue = new TaskQueue(200);
            }
            window.hasCheckingStaticPop = false;
            
            // 改造后的函数
            game.initJinDuTiao = function(player, remove, checking) {
                // 将任务添加到队列
                window.taskQueue.addTask(() => {
                    //结束啦不要再玩啦
                    if (_status.over && !remove) return false;
                    if (!lib.config.extension_手杀ui_jindutiao) return false;
                    if (!lib.config.extension_手杀ui_jindutiaoUpdata) return false;
                    if (!player || (player != game.me && player != 'pause')) return false;
                    if (game.me && game.me.isDead()) return false;
                    if (_status.event && _status.event.player && _status.event.player != game.me) return false;
            
                    let popped = document.getElementsByClassName('static');
    			    if(((popped.length == 1 && !popped[0].classList.contains('menu')) || popped.length > 1) && !remove) {
    			        if(!window.hasCheckingStaticPop || checking) {
			                window.hasCheckingStaticPop = true;
			                setTimeout(function() {
    			                game.initJinDuTiao(player, false, true);
    			            }, 300);
    			            return false;
    			        }
    			    }
                    if (!remove) {
                        if (document.querySelector("#jindutiaopl") && lib.config.extension_手杀ui_jindutiaoUpdata == false) return;
                        window.hasCheckingStaticPop = false;
                        game.Jindutiaoplayer();
                        return true;
                    } else { //第二个参数为true效果为删除进度条
                        if (document.getElementById("jindutiaopl")) {
                            document.getElementById("jindutiaopl").style.transition = 'all 0.3s';
                            document.getElementById("jindutiaopl").style.opacity = 0;
                            setTimeout(function() {
                                if (document.getElementById("jindutiaopl") && document.getElementById("jindutiaopl").style.opacity == 0) {
                                    document.getElementById("jindutiaopl").remove();
                                    if (window.timer) {
                                        clearInterval(window.timer);
                                        delete window.timer;
                                    }
            
                                    if (window.timer2) {
                                        clearInterval(window.timer2);
                                        delete window.timer2;
                                    }
                                }
                            }, 300);
                        }
                        return true;
                    }
                });
            };
			//玩家进度条
			if (get.mode() != 'connect' && config.jindutiao == true) {
				lib.onover.push(function (bool) {
					if (document.getElementById("jindutiaopl")) {
						document.getElementById("jindutiaopl").style.transition='all 0.3s';
									document.getElementById("jindutiaopl").style.opacity=0;
									setTimeout(function(){
									    if(document.getElementById("jindutiaopl")&&document.getElementById("jindutiaopl").style.opacity==0) {
									        document.getElementById("jindutiaopl").remove();
									    }
									},300);
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

									document.getElementById("jindutiaopl").style.transition='all 0.3s';
									document.getElementById("jindutiaopl").style.opacity=0;
									setTimeout(function(){
									    if(document.getElementById("jindutiaopl")&&document.getElementById("jindutiaopl").style.opacity==0) {
									        document.getElementById("jindutiaopl").remove();
									    }
									},300);
								}
							},
						},
					},
				}
				/*------回合外进度条玩家----*/
				lib.skill._jindutiaopl = {
					trigger: {
						global: ['gameStart'],
						player: ['useCardToBegin', 'respondBegin', 'chooseToRespondBegin', 'damageEnd', 'damageAfter', 'judgeEnd'],
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
								global: ["useCardAfter", "useCardBefore", "phaseBefore", "loseEnd", "phaseBegin", "phaseDradBegin", "phaseUseBegin", "phaseUseEnd", "phaseEnd", "phaseDiscardAfter", "phaseDiscardBegin", "useSkillBefore", "judgeAfter"],
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
									document.getElementById("jindutiaopl").style.transition='all 0.3s';
									document.getElementById("jindutiaopl").style.opacity=0;
									setTimeout(function(){
									    if(document.getElementById("jindutiaopl")&&document.getElementById("jindutiaopl").style.opacity==0) {
									        document.getElementById("jindutiaopl").remove();
									    }
									},300);
								}
							},
						},
					},
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
			    var offline=sessionStorage.getItem('Network');
			    if(!offline) offline='online';
			    if(offline=='offline') return;
			    if(!ui.shortcut.classList.contains('hidden')) return;
				//----------------进度条主体---------------------//
				if(document.getElementById("jindutiaopl")&&window.timer) {
				    window.reinitJDT=true;
				    window.reinitJDT2=true;
				    return;
				}
				if (window.timer) {
					clearInterval(window.timer);
					delete window.timer;
				}

				if (window.timer2) {
					clearInterval(window.timer2);
					delete window.timer2;
				}

				if (document.getElementById("jindutiaopl")) {
					document.getElementById("jindutiaopl").style.transition='all 0.3s';
									document.getElementById("jindutiaopl").style.opacity=0;
									setTimeout(function(){
									    if(document.getElementById("jindutiaopl")&&document.getElementById("jindutiaopl").style.opacity==0) {
									        document.getElementById("jindutiaopl").remove();
									    }
									},300);
				}

				var boxContent = document.createElement('div');
				boxContent.setAttribute('id', 'jindutiaopl');
				boxContent.style.opacity=0;
				boxContent.style.transition='all 0.3s';
				boxContent.style.zIndex=0;
				setTimeout(function(){
				    boxContent.style.opacity=1;
				},0);
				//-------样式1-------//
				if (lib.config.extension_手杀ui_jindutiaoYangshi == "1") {
					//手杀进度条样式
					if (window.jindutiaoTeshu) {
						delete window.jindutiaoTeshu;
					}
					boxContent.style.backgroundColor = "rgba(0,0,0,0.4)";
					boxContent.style.width = "520px";
					boxContent.style.height = "12px";
					boxContent.style.borderRadius = "1000px";
					boxContent.style['boxShadow'] = "0px 0px 9px #2e2b27 inset,0px 0px 2.1px #FFFFD5";
					boxContent.style.overflow = "hidden";
					boxContent.style.border = "1.2px solid #000000";
					boxContent.style.position = "fixed";
					boxContent.style.left = "calc(50% - 265px)";
					boxContent.style.bottom = parseFloat(lib.config['extension_手杀ui_jindutiaoSet'])-0.4 + '%';

					var boxTime = document.createElement('div')
					boxTime.dataSum = boxTime.data = 520
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
					boxTime.dataSum = boxTime.data = 300
					boxTime.style.cssText =
						"width:280px;height:4.3px;margin:14px 0 0 85px;background-color: #E2E20A;border-right:5px solid #FFF;position: absolute;top: -3.5px;"
					boxContent.appendChild(boxTime)

					var imgBg = document.createElement('img')
					imgBg.src = lib.assetURL + 'extension/手杀ui/lbtn/images/uibutton/jindutiao.png'
					imgBg.style.cssText =
						"--w:400px;--h:calc(var(--w)*44/759);width: var(--w);height:var(--h);position: absolute;top: 0;"
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
					boxTime.dataSum = boxTime.data = 395/*黄色条长度*/
					/*boxTime.style.cssText =
						"width:399px;height:10px;margin:0 0 0 0;background-color: #F4C336;border-radius:2px; border-top:0px solid #000000;border-bottom:0px solid #000000;position: absolute;top: 1px;border-radius: 0.5px;"*/
				   boxTime.style.cssText =
								"z-index:1;width:399px;height:8px;margin:0 0 0 1px;background-color: #F4C336;border-top:3px solid #EBE1A7;border-bottom:2px solid #73640D;border-left:1px solid #73640D;position: absolute;top: 0px;border-radius:3px;"
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
				    if(window.reinitJDT) {
				        boxTime.data = boxTime.dataSum;
				        boxTime.style.transition='all 0.2s ease-out';
				        //setTimeout(function(){
				            window.reinitJDT=false;
				        //},200);
				    }
					boxTime.style.width = boxTime.data + 'px';
					boxTime.data--;
					if (boxTime.data == 0 || _status.paused2) {
						var myTurn = document.getElementById("jindutiaopl")&&document.getElementById("jindutiaopl").style.opacity!=0;
						clearInterval(window.timer);
						delete window.timer;
						boxContent.remove();
						//加个检测，如果玩家在选择的话才能触发托管
						//var myTurn=(_status && _status.event && _status.event.player && _status.event.player==game.me);
						//屏蔽托管的函数：game.noTuoGuan=true;
						if (!game.noTuoGuan&&lib.config.extension_手杀ui_jindutiaotuoguan == true && _status.auto == false && myTurn) {
							ui.click.auto();
							if(lib.config.enable_touchdragline) {
    							// 拖拽指示线修复Helasisy
    							// 在现有代码中找到这两个地方：
                                _status.mousedragging = null;
                                _status.mousedragorigin = null;
                                
                                // 在这两个赋值语句后添加：
                                if(ui.ctx&&ui.canvas) ui.ctx.clearRect(0, 0, ui.canvas.width, ui.canvas.height);
                                if(ui.canvas) ui.canvas.width = ui.canvas.width; // 可选强制清空
                            }
						}

					}
					//--------//
				}, parseFloat(lib.config['extension_手杀ui_jindutiaoST'])); //进度条间隔时间100 
				//-------------//
				if (window.jindutiaoTeshu == true) {
					window.timer2 = setInterval(() => {
					    if(window.reinitJDT2) {
				            boxTime2.data = boxTime2.dataSum;
				            boxTime2.style.transition='all 0.2s ease-out';
				            //setTimeout(function(){
				                window.reinitJDT2=false;
				            //},200);
				        }
						boxTime2.data--;
						boxTime2.style.width = boxTime2.data + 'px';
						if (boxTime2.data == 0 || _status.paused2) {
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
			var showChatWordBackground_forbid = false;
			//这里
			game.showChatWordBackgroundX = function () {
			    if(showChatWordBackground_forbid) return;
			    showChatWordBackground_forbid = true;
			    setTimeout(function() {
			        showChatWordBackground_forbid = false;
			    }, 500);
			    var offline=sessionStorage.getItem('Network');
			    if(!offline) offline='online';
			    if (offline!='offline') {
			        game.chatReply=true;
			    }else {
			        game.chatReply=false;
			    }
			    if(window.tipsClick) window.tipsClick('WinButton');
				if (window.chatBg != undefined && window.chatBg.shown) {           
                    // 定义渐变消失函数
                    const fadeOutAndRemove = (element, duration = 500) => {
                        if (!element) return;
                        element.style.opacity = '1'; // 确保初始状态
                        element.style.transition = `opacity ${duration}ms ease`;
                        // 强制重绘以应用初始状态
                        void element.offsetHeight;
                        element.style.opacity = '0';
                        setTimeout(() => {
                            element.style.display = 'none';
                            // 如果确定要删除元素可以使用：
                            element.parentNode?.removeChild(element);
                            //element.remove();
                        }, duration);
                    };
                
                    // 替换原本的.hide()调用
                    fadeOutAndRemove(window.chatBg);
                    if (window.chatBg.overlay) fadeOutAndRemove(window.chatBg.overlay);
                    
                    game.thrown_emoji_type = undefined;
                    window.all_cailanzi = false;
                    for (let i = 0; i < game.players.length; i++) {
                        if (game.players[i].cailanzi) delete game.players[i].cailanzi;
                    }
                    window.chatBg.shown = false;
                
                    // 处理 dialog_lifesay
                    if (window.dialog_lifesay) {
                        if (window.dialog_lifesay.show) {
                            window.dialog_lifesay.style.left = '-' + window.dialog_lifesay.style.width;
                        }
                        setTimeout(() => {
                            fadeOutAndRemove(window.dialog_lifesay, 500);
                            window.dialog_lifesay.show = false;
                        }, 100);
                    }
                
                    // 处理 dialog_emoji
                    if (window.dialog_emoji) {
                        if (window.dialog_emoji.show) {
                            window.dialog_emoji.style.top = '100%';
                        }
                        setTimeout(() => {
                            fadeOutAndRemove(window.dialog_emoji, 500);
                            window.dialog_emoji.show = false;
                        }, 1000);
                    }
                
                    // 处理 chatBackground
                    if (window.chatBackground) {
                        if (window.chatBackground.show) {
                            window.chatBackground.style.left = '100%';
                        }
                        setTimeout(() => {
                            fadeOutAndRemove(window.chatBackground, 500);
                            window.chatBackground.show = false;
                        }, 1000);
                    }
                    
                    /*game.players.slice()*/
                    game.filterPlayer2().forEach(player => {
                        if(!player.touchSetupEmoji) return;
                        player.touchSetupEmoji.hide();
                    });
                
                    return;
                }
				var dialogChat = {};
				//屏幕防触控
				game.createCss(`.shousha-chat-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 35%; /* 占据父元素高度的1/3 */
                    background: linear-gradient(
                        to top, 
                        rgba(0, 0, 0, 0.6) 0%,    /* 底部50%透明度的黑色 */
                        rgba(0, 0, 0, 0) 100%     /* 顶部完全透明 */
                    );
                    z-index: 3;
                }`);
                var overlay = ui.create.div(ui.window);
                overlay.classList.add('shousha-chat-overlay');
                overlay.onclick = function(e) {
                    if(window.chatBg != undefined && window.chatBg.shown && game.showChatWordBackgroundX) {
            	        game.showChatWordBackgroundX();
            	    }
                };
				//聊天框整体
				window.chatBg = ui.create.div('hidden');
				window.chatBg.overlay = overlay;
				window.chatBg.classList.add('hidden');
				window.chatBg.overlay.classList.add('hidden');
				setTimeout(function(){
				    window.chatBg.classList.remove('hidden');
				    window.chatBg.overlay.classList.remove('hidden');
				}, 0);
				window.chatBg.classList.add('popped');
				window.chatBg.classList.add('static');
				window.chatBg.shown = true;
				window.chatBg.style.cssText = "display: block;--w: 420px;--h: calc(var(--w) * 430/911);width: var(--w);height: var(--h);position: fixed;left:30%;bottom:5%;opacity: 1;background-size: 100% 100%;background-color: transparent;z-index:99;";
				window.chatBg.style.transition = 'all 0.7s ease';
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
                    div.style.transition = 'opacity 0.5s ease';
                    
                    // ========== 触摸事件处理 ==========
                    
                    // 触摸开始：缩放效果
                    div.addEventListener('touchstart', function () {
                        this.style.transform = 'scale(0.95)';
                    });
                    
                    // 触摸结束：恢复原状
                    div.addEventListener('touchend', function () {
                        this.style.transform = '';
                    });
                    
                    // ========== 鼠标事件适配 ==========
                    
                    // 鼠标按下：缩放效果
                    div.addEventListener('mousedown', function () {
                        this.style.transform = 'scale(0.95)';
                    });
                    
                    // 鼠标释放：恢复原状
                    div.addEventListener('mouseup', function () {
                        this.style.transform = '';
                    });
                    
                    // 鼠标离开：恢复原状（防止在元素外释放鼠标时没有恢复）
                    div.addEventListener('mouseleave', function () {
                        this.style.transform = '';
                    });
                    
                    // 原有的鼠标移出事件保留
                    div.onmouseout = function () {
                        this.style.transform = '';
                    };
                    
                    // 可选：添加点击效果样式，让用户知道这是可点击的
                    /*div.style.cursor = 'pointer';
                    
                    // 可选：防止文本选中（避免拖拽时选中文本）
                    div.style.userSelect = 'none';
                    div.style.webkitUserSelect = 'none';*/
                };
				game.use_throw_emoji = function(target) {
					//if (window.meijiu.thrownn == true) {
					var emoji = game.thrown_emoji_type;
					if (emoji=='meijiu') {
						game.me.throwEmotion(target, 'wine');
						if(window.shuliang.innerText>0) window.shuliang.innerText = window.shuliang.innerText - 1;
					    if(game.chatReply&&Math.random()<0.4) setTimeout(() => {
					    	target.throwEmotion(game.me, Math.random()<0.2?'flower':'wine');
					    }, [500,700,1000,1200,1500,1700].randomGet());
					    if(game.chatReply&&Math.random()<0.25) setTimeout(() => {
					    	var lists=game.players.slice();
					    	if(lists.contains(game.me)) lists.remove(game.me);
					    	var play=lists.randomGet();
					    	play.throwEmotion(game.me, Math.random()<0.3?'flower':'wine');
					    }, [900,1100,1300,1800,2000].randomGet());
					}else if (emoji=='xianhua') {
						game.me.throwEmotion(target, 'flower');
					    if(window.shuliang.innerText>0) window.shuliang.innerText = window.shuliang.innerText - 1;
					    if(game.chatReply&&Math.random()<0.4) setTimeout(() => {
					    	target.throwEmotion(game.me, Math.random()<0.2?'wine':'flower');
					    }, [500,700,1000,1200,1500,1700].randomGet());
					    if(game.chatReply&&Math.random()<0.25) setTimeout(() => {
					    	var lists=game.players.slice();
					    	if(lists.contains(game.me)) lists.remove(game.me);
					    	var play=lists.randomGet();
					    	play.throwEmotion(game.me, Math.random()<0.3?'wine':'flower');
					    }, [900,1100,1300,1800,2000].randomGet());
					}else if (emoji=='tuoxie') {
						game.me.throwEmotion(target, 'shoe');
						if(window.shuliang.innerText>0) window.shuliang.innerText = window.shuliang.innerText - 1;
					    if(game.chatReply&&Math.random()<0.4) setTimeout(() => {
					    	target.throwEmotion(game.me, Math.random()<0.2?'egg':'shoe');
					    }, [500,700,1000,1200,1500,1700].randomGet());
					    if(game.chatReply&&Math.random()<0.25) setTimeout(() => {
					    	var lists=game.players.slice();
					    	if(lists.contains(game.me)) lists.remove(game.me);
					    	var play=lists.randomGet();
					    	play.throwEmotion(game.me, Math.random()<0.3?'egg':'shoe');
					    }, [900,1100,1300,1800,2000].randomGet());
					}else if (emoji=='jidan') {
						game.me.throwEmotion(target, 'egg');
						if(window.shuliang.innerText>0) window.shuliang.innerText = window.shuliang.innerText - 1;
					    if(game.chatReply&&Math.random()<0.4) setTimeout(() => {
					    	target.throwEmotion(game.me, Math.random()<0.2?'shoe':'egg');
					    }, [500,700,1000,1200,1500,1700].randomGet());
					    if(game.chatReply&&Math.random()<0.25) setTimeout(() => {
					    	var lists=game.players.slice();
					    	if(lists.contains(game.me)) lists.remove(game.me);
					    	var play=lists.randomGet();
					    	play.throwEmotion(game.me, Math.random()<0.3?'shoe':'egg');
					    }, [900,1100,1300,1800,2000].randomGet());
					}else if (emoji=='cailan') {
					    var reply=Math.random()<0.45;
					    var wait=[1000,1300,1600].randomGet();
						for (let i = 0; i < 10; i++) {
							setTimeout(() => {
								if (i <= 8)
									game.me.throwEmotion(target, 'flower');
								else game.me.throwEmotion(target, 'wine');
								if(window.shuliang.innerText>0) window.shuliang.innerText = window.shuliang.innerText - 1;
							}, 100 * i);
							if(game.chatReply&&reply) setTimeout(() => {
								if (i <= 8)
									target.throwEmotion(game.me, 'flower');
								else target.throwEmotion(game.me, 'wine');
							}, 100 * i + wait)
						}
					}else if (emoji=='qicai') {
					    var reply=Math.random()<0.45;
					    var wait=[1000,1300,1600].randomGet();
						for (let i = 0; i < 10; i++) {
							setTimeout(() => {
								if (i <= 8) {
									game.me.throwEmotion(target, 'egg');
									if(window.shuliang.innerText>0) window.shuliang.innerText = window.shuliang.innerText - 1;
								}
								else {
									game.me.throwEmotion(target, 'shoe');
									if(window.shuliang.innerText>0) window.shuliang.innerText = window.shuliang.innerText - 1;
								}
							}, 100 * i);
							if(game.chatReply&&reply) setTimeout(() => {
								if (i <= 8) target.throwEmotion(game.me, 'egg');
								else target.throwEmotion(game.me, 'shoe')
							}, 100 * i + wait)
						}
					}else if (emoji=='xueqiu') {
						game.me.throwEmotion(target, 'snow');
						if(window.shuliang.innerText>0) window.shuliang.innerText = window.shuliang.innerText - 1;
					    if(game.chatReply&&Math.random()<0.6) setTimeout(() => {
					    	target.throwEmotion(game.me, Math.random()<0.07?['wine','flower','shoe','egg','snow'].randomGet():'snow');
					    }, [500,700,1000,1200,1500,1700].randomGet());
					    if(game.chatReply) {
					        if(Math.random()<0.6) {
					            if(Math.random()<0.25) setTimeout(() => {
					            	var lists=game.players.slice();
					            	if(lists.contains(game.me)) lists.remove(game.me);
					            	var play=lists.randomGet();
					            	play.throwEmotion(game.me, Math.random()<0.07?['wine','flower','shoe','egg','snow'].randomGet():'snow');
					            }, [900,1100,1300,1800,2000].randomGet());
					        }else {
					            var sum=game.players.length*[1,1,1,2,2,3].randomGet();
					            for(var s=0;s<sum;s++) if(Math.random()<0.25) setTimeout(() => {
					            	var lists=game.players.slice();
				                	if(lists.contains(game.me)) lists.remove(game.me);
				                	var play=lists.randomGet();
				                	var lists2=lists.remove(play);
				                	var play2=lists2.randomGet();
				                	play.throwEmotion(Math.random()<0.2?game.me:play2, Math.random()<0.07?['wine','flower','shoe','egg','snow'].randomGet():'snow');
			            	    }, [900,1100,1300,1800,2000,2200,2500,2700,3000,3300,3500,4000,4500,5000].randomGet()+[0,50,100,150,200].randomGet());
					        }
					    }
					}
				};
				const processedPlayers = [];
				const setupPlayerClickListeners = (() => {
                    return () => {
                        game.filterPlayer2().forEach(player => {
                            if (!player.touchSetupEmoji) {
                                let touchStartX, touchStartY; // 记录触摸起点坐标
                                let mouseStartX, mouseStartY; // 记录鼠标起点坐标
                                let canUse = true;
                                let isMouseDown = false; // 鼠标按下状态
                                
                                player.touchSetupEmoji = ui.create.div(player);
                                game.createCss(`.cailanzi_click_player {
                                    width: 100%;
                                    height: 100%;
                                    top: 0;
                                    left: 0;
                                    z-index: 1000;
                                    cursor: pointer; /* 添加鼠标指针样式 */
                                }`);
                                player.touchSetupEmoji.classList.add('cailanzi_click_player');
                
                                // ========== 触摸事件处理 ==========
                                
                                // 监听触摸开始（记录起点）
                                player.touchSetupEmoji.addEventListener(
                                    'touchstart',
                                    function (e) {
                                        if(game.isMine(player)||player.isDead()||_status.over) {
                                            canUse = false;
                                            return;
                                        }
                                        const touch = e.touches[0];
                                        touchStartX = touch.clientX;
                                        touchStartY = touch.clientY;
                                    },
                                    { capture: true } // 捕获阶段触发
                                );
                
                                // 监听触摸结束（判断距离）
                                player.touchSetupEmoji.addEventListener(
                                    'touchend',
                                    function (e) {
                                        if (!touchStartX || !touchStartY || !canUse) return;
                
                                        const touch = e.changedTouches[0];
                                        const deltaX = touch.clientX - touchStartX;
                                        const deltaY = touch.clientY - touchStartY;
                                        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
                
                                        // 移动距离小于阈值视为点击（推荐 5-10px）
                                        if (distance < 10) {
                                            game.use_throw_emoji(player);
                                        }
                
                                        touchStartX = touchStartY = null; // 重置坐标
                                    },
                                    { capture: true } // 捕获阶段触发
                                );
                
                                // ========== 鼠标事件适配 ==========
                                
                                // 鼠标按下事件
                                player.touchSetupEmoji.addEventListener(
                                    'mousedown',
                                    function (e) {
                                        if(game.isMine(player)||player.isDead()||_status.over) {
                                            canUse = false;
                                            return;
                                        }
                                        isMouseDown = true;
                                        mouseStartX = e.clientX;
                                        mouseStartY = e.clientY;
                                    },
                                    { capture: true }
                                );
                
                                // 鼠标移动事件（防止拖拽误触发）
                                player.touchSetupEmoji.addEventListener(
                                    'mousemove',
                                    function (e) {
                                        if (!isMouseDown) return;
                                        
                                        // 如果移动距离过大，取消点击状态
                                        const deltaX = e.clientX - mouseStartX;
                                        const deltaY = e.clientY - mouseStartY;
                                        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
                                        
                                        if (distance > 10) {
                                            canUse = false;
                                        }
                                    },
                                    { capture: true }
                                );
                
                                // 鼠标释放事件
                                player.touchSetupEmoji.addEventListener(
                                    'mouseup',
                                    function (e) {
                                        if (!isMouseDown || !canUse) {
                                            isMouseDown = false;
                                            canUse = true;
                                            return;
                                        }
                
                                        const deltaX = e.clientX - mouseStartX;
                                        const deltaY = e.clientY - mouseStartY;
                                        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
                
                                        // 移动距离小于阈值视为点击
                                        if (distance < 10) {
                                            game.use_throw_emoji(player);
                                        }
                
                                        isMouseDown = false;
                                        mouseStartX = mouseStartY = null;
                                        canUse = true;
                                    },
                                    { capture: true }
                                );
                
                                // 鼠标离开元素时重置状态
                                player.touchSetupEmoji.addEventListener(
                                    'mouseleave',
                                    function () {
                                        isMouseDown = false;
                                        canUse = true;
                                    },
                                    { capture: true }
                                );
                
                                // 添加点击事件作为备用（简单的点击处理）
                                player.touchSetupEmoji.addEventListener(
                                    'click',
                                    function (e) {
                                        // 防止重复触发，如果已经在mouseup中处理过，这里可以不处理
                                        // 或者作为简单的点击备用方案
                                    },
                                    { capture: true }
                                );
                                
                            } else {
                                player.touchSetupEmoji.show();
                            }
                        });
                    };
                })();
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
					window.dialog_lifesay.style.transition = 'all 0.5s ease';
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
				window.chatButton1 = ui.create.div('hidden', '', game.open_lifesay);/*left:40px*/
				window.chatButton1.style.cssText = "display: block;--w: 80px;--h: calc(var(--w) * 82/98);width: var(--w);height: var(--h);left:60px;bottom:25px;transition:none;background-size:100% 100%";
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
				
				
                setupPlayerClickListeners();
				
				//------菜篮子框------//
				window.hudongkuang = ui.create.div('hidden', '', game.open_hudong);
				window.hudongkuang.style.cssText = "display: block;--w: 315px;--h: calc(var(--w) * 135/142);width: var(--w);height: var(--h);left:-280px;bottom:-30px;transition:none;background-size:100% 100%;pointer-events:none;";

				window.hudongkuang.setBackgroundImage('extension/手杀ui/sayplay/hudong.png');


				window.chatBg.appendChild(window.hudongkuang);
				window.all_cailanzi = true;




				/*var list = game.players.slice();
					for (i = 0; i < game.players.length; i++) {
					    if(list[i]==game.me) continue;
						list[i].onclick = function () {
						}
						list[i].cailanzi = list[i].onclick;
					}*/
				//-------------------------//

				//------1--美酒-------//
				game.open_meijiu = function () {}


				window.meijiu = ui.create.div('hidden', '', game.open_meijiu);
				window.meijiu.style.cssText = "display: block;--w: 63px;--h: calc(var(--w) * 50/50);width: var(--w);height: var(--h);left:-155px;bottom:173px;transition:none;background-size:100% 100%";

				window.meijiu.setBackgroundImage('extension/手杀ui/sayplay/meijiu.png');
				//这里
				window.meijiu.onclick = function () {
					//window.meijiu.thrownn = true;
					game.thrown_emoji_type = 'meijiu';
				}
				window.chatBg.appendChild(window.meijiu);
				lib.setScroll(window.meijiu);
				clickFK(window.meijiu);

				//-------------------//

				//---2-----鲜花-------//
				game.open_xianhua = function () {}


				window.xianhua = ui.create.div('hidden', '', game.open_xianhua);
				window.xianhua.style.cssText = "display: block;--w: 63px;--h: calc(var(--w) * 50/50);width: var(--w);height: var(--h);left:-230px;bottom:173px;transition:none;background-size:100% 100%";

				window.xianhua.setBackgroundImage('extension/手杀ui/sayplay/xianhua.png');
				//这里
				window.xianhua.onclick = function () {
					//window.xianhua.thrownn = true;
					game.thrown_emoji_type = 'xianhua';
				}

				window.chatBg.appendChild(window.xianhua);
				lib.setScroll(window.xianhua);
				clickFK(window.xianhua);



				//-------------------//

				//-----3---拖鞋-------//

				game.open_tuoxie = function () {}


				window.tuoxie = ui.create.div('hidden', '', game.open_tuoxie);
				window.tuoxie.style.cssText = "display: block;--w: 63px;--h: calc(var(--w) * 50/50);width: var(--w);height: var(--h);left:-155px;bottom:105px;transition:none;background-size:100% 100%";

				window.tuoxie.setBackgroundImage('extension/手杀ui/sayplay/tuoxie.png');
				//这里
				window.tuoxie.onclick = function () {
					//window.tuoxie.thrownn = true;
					game.thrown_emoji_type = 'tuoxie';
				}

				window.chatBg.appendChild(window.tuoxie);
				lib.setScroll(window.tuoxie);
				clickFK(window.tuoxie);


				//-------------------//

				//-----4---鸡蛋-------//


				game.open_jidan = function () {}


				window.jidan = ui.create.div('hidden', '', game.open_jidan);
				window.jidan.style.cssText = "display: block;--w: 63px;--h: calc(var(--w) * 50/50);width: var(--w);height: var(--h);left:-230px;bottom:105px;transition:none;background-size:100% 100%";
				window.jidan.onclick = function () {
					//window.jidan.thrownn = true;
					game.thrown_emoji_type = 'jidan';
				}

				//这里
				window.jidan.setBackgroundImage('extension/手杀ui/sayplay/jidan.png');


				window.chatBg.appendChild(window.jidan);
				lib.setScroll(window.jidan);
				clickFK(window.jidan);


				//-------------------//

				//-----5--菜篮-------//


				game.open_cailan = function () {}


				window.cailan = ui.create.div('hidden', '', game.open_cailan);
				window.cailan.style.cssText = "display: block;--w: 63px;--h: calc(var(--w) * 50/50);width: var(--w);height: var(--h);left:-80px;bottom:173px;transition:none;background-size:100% 100%";

				window.cailan.setBackgroundImage('extension/手杀ui/sayplay/cailan.png');
				window.cailan.onclick = function () {
					//window.cailan.thrownn = true;
					game.thrown_emoji_type = 'cailan';
				}

				window.chatBg.appendChild(window.cailan);
				lib.setScroll(window.cailan);
				clickFK(window.cailan);


				//-------------------//

				//------6--七彩-------//


				game.open_qicai = function () {}


				window.qicai = ui.create.div('hidden', '', game.open_qicai);
				window.qicai.style.cssText = "display: block;--w: 63px;--h: calc(var(--w) * 50/50);width: var(--w);height: var(--h);left:-80px;bottom:105px;transition:none;background-size:100% 100%";

				window.qicai.setBackgroundImage('extension/手杀ui/sayplay/qicai.png');

				window.qicai.onclick = function () {
					//window.qicai.thrownn = true;
					game.thrown_emoji_type = 'qicai';
				}
				window.chatBg.appendChild(window.qicai);
				lib.setScroll(window.qicai);
				clickFK(window.qicai);


				//-------------------//

				//-----7---小酒-------//


				game.throwEmotionXiaojiu=function(player,target,name){
					game.addVideo('throwEmotion',player,[target.dataset.position,name]);
					var getLeft=function(player){
						if(player==game.me&&!ui.fakeme&&!ui.chess) return player.getLeft()+player.node.avatar.offsetWidth/2;
						return player.getLeft()+player.offsetWidth/2;
					}
					var emotion=ui.create.div('','<div style="text-align:center"> <img src="'+lib.assetURL+'image/emotion/xiaojiu_emotion/'+name+'.gif"> </div>',game.chess?ui.chess:ui.window);
					emotion.style.width='240px';
					emotion.style.height='240px';
					emotion.style.opacity=0;
					var width=240/2;
					var height=240/2;
					if(game.chess) width+=60;
					var left=getLeft(player)-width;
					var top=player.getTop()+player.offsetHeight/3-height;
					//var left=window.innerWidth;
					//var top=window.innerHeight;
					emotion.style.left=left+'px';
					emotion.style.top=top+'px';
					//emotion.style.transform=' scale(0.5)';
					var left2=getLeft(target)-width;
					var top2=target.getTop()+target.offsetHeight/3-height;
					var left2=document.body.clientWidth/2-width;
					var top2=document.body.clientHeight*0.8/2-height;
					emotion.style['z-index']=10;
					emotion.style.transform='translateY('+(top2-top)+'px) translateX('+(left2-left)+'px)';
					setTimeout(function(){
					    emotion.style.opacity=1;
					},0);
					setTimeout(function(){
						//emotion.innerHTML=('<div style="text-align:center"> <img src="'+lib.assetURL+'image/emotion/xiaojiu_emotion/'+name+'.gif"> </div>');
						setTimeout(function(){
							emotion.delete();
						},1200);
					},600);
				};

				game.open_xiaojiu = function () {
					//打开小酒函数
					window.xiaojiu.thrownn = true;
					if (window.xiaojiu.thrownn == true) {
						var list = game.players.slice();
						for (i = 0; i < game.players.length; i++) {
							if(list[i].onclick) list[i].onclick=false;
							if(list[i].cailanzi) list[i].cailanzi=false;
						}
						var rand=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].randomGet();
						game.throwEmotionXiaojiu(game.me,game.me, rand);
						if(window.shuliang.innerText>0) window.shuliang.innerText = window.shuliang.innerText - 1;
					}
				}


				window.xiaojiu = ui.create.div('hidden', '', game.open_xiaojiu);
				window.xiaojiu.style.cssText = "display: block;--w: 63px;--h: calc(var(--w) * 50/50);width: var(--w);height: var(--h);left:-230px;bottom:36px;transition:none;background-size:100% 100%";

				window.xiaojiu.onclick = function () {
					//window.xiaojiu.thrownn = true;
					game.thrown_emoji_type = 'xiaojiu';
				}
				window.xiaojiu.setBackgroundImage('extension/手杀ui/sayplay/xiaojiu.png');


				window.chatBg.appendChild(window.xiaojiu);
				lib.setScroll(window.xiaojiu);
				clickFK(window.xiaojiu);


				//-------------------//

				//-----8---雪球------//



				game.open_xueqiu = function () {}


				window.xueqiu = ui.create.div('hidden', '', game.open_xueqiu);
				window.xueqiu.style.cssText = "display: block;--w: 63px;--h: calc(var(--w) * 50/50);width: var(--w);height: var(--h);left:-155px;bottom:36px;transition:none;background-size:100% 100%";

				window.xueqiu.onclick = function () {
					//window.xueqiu.thrownn = true;
					game.thrown_emoji_type = 'xueqiu';
				}
				window.xueqiu.setBackgroundImage('extension/手杀ui/sayplay/xueqiu.png');


				window.chatBg.appendChild(window.xueqiu);
				lib.setScroll(window.xueqiu);
				clickFK(window.xueqiu);


				//-------------------//


				//------9-虚无-------//


				game.throwEmotionDice = function(player, target, name) {
                    game.addVideo('throwEmotion', player, [target.dataset.position, name]);
                    
                    // 创建骰子容器（如果不存在）
                    if (!game.emotionDiceContainer) {
                        game.emotionDiceContainer = ui.create.div('emotion-dice-container', '', game.chess ? ui.chess : ui.window);
                        game.emotionDiceContainer.style.cssText = `
                            position: fixed;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            gap: 20px;
                            z-index: 10;
                            min-width: 100px;
                            min-height: 100px;
                            pointer-events: none;
                        `;
                        game.emotionDiceContainer.tempDiceRemoving = 0;
                    }
                    
                    var getLeft = function(player) {
                        if (player == game.me && !ui.fakeme && !ui.chess) return player.getLeft() + player.node.avatar.offsetWidth / 2;
                        return player.getLeft() + player.offsetWidth / 2;
                    }
                    
                    // 创建骰子元素
                    var emotion = ui.create.div('emotion-dice', '<div style="text-align:center"> <img src="' + lib.assetURL + 'image/emotion/throw_dice/' + name + '.gif?temp=' + Math.random() + '"> </div>');
                    emotion.style.cssText = `
                        width: 100px;
                        height: 100px;
                        position: relative;
                    `;
                    
                    // 创建临时动画容器
                    var tempContainer = ui.create.div('dice-temp-container', '', game.chess ? ui.chess : ui.window);
                    tempContainer.style.cssText = `
                        position: absolute;
                        width: 100px;
                        height: 100px;
                        z-index: 10;
                    `;
                    
                    // 设置初始位置
                    var width = 100 / 2;
                    var height = 100 / 2;
                    if (game.chess) width += 60;
                    var startLeft = getLeft(player) - width;
                    var startTop = player.getTop() + player.offsetHeight / 3 - height;
                    
                    tempContainer.style.left = startLeft + 'px';
                    tempContainer.style.top = startTop + 'px';
                    tempContainer.appendChild(emotion);
                    
                    // 计算目标位置（在容器中的位置）
                    var containerRect = game.emotionDiceContainer.getBoundingClientRect();
                    var targetLeft = containerRect.left + (game.emotionDiceContainer.children.length - game.emotionDiceContainer.tempDiceRemoving) * 120; // 100px + 20px gap
                    var targetTop = containerRect.top;
                    
                    // 飞行动画
                    emotion.style.transform = 'translateY(' + (targetTop - startTop) + 'px) translateX(' + (targetLeft - startLeft) + 'px) rotate(720deg)';
                    
                    if (lib.config.background_audio) game.playAudio('effect', 'throw_dice');
                    
                    setTimeout(function() {
                        emotion.style.filter = 'drop-shadow(10px 10px 10px rgba(0, 0, 0, .5))';
                    }, 200);
                    
                    setTimeout(function() {
                        // 动画结束后将骰子移动到主容器
                        tempContainer.removeChild(emotion);
                        tempContainer.delete();
                        
                        // 将骰子添加到主容器
                        game.emotionDiceContainer.appendChild(emotion);
                        emotion.style.transform = 'none'; // 重置变换
                        
                        setTimeout(function() {
                            window.xuwu.thrownn = false;
                            // 从容器中移除骰子
                            emotion.style.opacity = 0;
                            game.emotionDiceContainer.tempDiceRemoving++;
                            setTimeout(function() {
                                if (emotion.parentNode) {
                                    emotion.parentNode.removeChild(emotion);
                                }
                                emotion.delete();
                                game.emotionDiceContainer.tempDiceRemoving--;
                            }, 400);
                            // 如果容器为空，移除容器
                            if (game.emotionDiceContainer.children.length === 0) {
                                game.emotionDiceContainer.tempDiceRemoving = 0;
                                //game.emotionDiceContainer.delete();
                                //game.emotionDiceContainer = null;
                            }
                        }, 2000);
                    }, 400);
                };


				game.open_xuwu = function () {
					//打开虚无函数
					//这里
					//window.xuwu.thrownn = true;
					if (window.xuwu.thrownn != true) {
						var list = game.players.slice();
						for (i = 0; i < game.players.length; i++) {
							if(list[i].onclick) list[i].onclick=false;
							if(list[i].cailanzi) list[i].cailanzi=false;
						}
					    //window.xuwu.thrownn = true;
						var rand=[1,2,3,4,5,6].randomGet();
						game.throwEmotionDice(game.me,game.me, rand);
						if(window.shuliang.innerText>0) window.shuliang.innerText = window.shuliang.innerText - 1;
						if(game.chatReply&&Math.random()<(0.8-rand*0.05)) setTimeout(() => {
							var lists=game.players.slice();
							if(lists.contains(game.me)) lists.remove(game.me);
							var rand=[1,2,3,4,5,6].randomGet();
							var play=lists.randomGet();
							game.throwEmotionDice(play,play, rand);
						}, 300+[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].randomGet()*100)
						var list = game.players.slice();
						for (i = 0; i < game.players.length; i++) {
							if(list[i].onclick) delete list[i].onclick;
							if(list[i].cailanzi) delete list[i].cailanzi;
						}
					}
				}


				window.xuwu = ui.create.div('hidden', '', game.open_xuwu);
				window.xuwu.style.cssText = "display: block;--w: 63px;--h: calc(var(--w) * 50/50);width: var(--w);height: var(--h);left:-80px;bottom:36px;transition:none;background-size:100% 100%";

				window.xuwu.onclick = function () {
					//window.xuwu.thrownn = true;
					game.thrown_emoji_type = 'xuwu';
				}
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
				//window.shuliang.innerText = Math.floor(Math.random() * (999 - 100 + 1) + 100);
				//你是无限花口牙！
				window.shuliang.innerText = 999;
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
					//window.dialog_emoji.style['z-index'] = 999999999;
					window.dialog_emoji.style['z-index'] = 5;
					window.dialog_emoji.classList.add('popped');
					window.dialog_emoji.classList.add('static');
					window.dialog_emoji.show = true;
					window.dialog_emoji.style.height = '280px';//整个选择emoji对话框的宽高
					window.dialog_emoji.style.width = '360px';
					window.dialog_emoji.style.left = 'calc( 50% - 180px)';
					window.dialog_emoji.style.top = '100%';//这里弄一个上移的动画
					window.dialog_emoji.style.transition = 'all 0.5s ease';
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
				window.chatButton2 = ui.create.div('hidden', '', game.open_emoji);/*left:150px*/
				window.chatButton2.style.cssText = "display: block;--w: 80px;--h: calc(var(--w) * 82/98);width: var(--w);height: var(--h);left:170px;bottom:25px;transition:none;background-size:100% 100%";
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
				window.chatButton3 = ui.create.div('hidden', '', game.open_jilu);/*left:260px*/
				window.chatButton3.style.cssText = "display: block;--w: 80px;--h: calc(var(--w) * 82/98);width: var(--w);height: var(--h);left:280px;bottom:25px;transition:none;background-size:100% 100%";
				//window.chatButton3.style.cssText = "display: block;--w: 80px;--h: calc(var(--w) * 82/98);width: var(--w);height: var(--h);left:262px;bottom:23px;transition:none;background-size:100% 100%";
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
				//window.chatSendBottom.style.cssText = "display: block;--w: 91px;--h: calc(var(--w) * 62/160);width: var(--w);height: var(--h);left:70%;top:33px;transition:none;background-size:100% 100%;text-align:center;border-randius:8px;";
				window.chatSendBottom.style.cssText = "display: block;--w: 91px;--h: calc(var(--w) * 62/160);width: var(--w);height: var(--h);left:70%;top:36px;transition:none;background-size:100% 100%;text-align:center;border-randius:8px;";
				/*window.chatSendBottom.style.height='50px';
				window.chatSendBottom.style.width='25%';
				window.chatSendBottom.style.left='calc( 60% + 62px )';
				window.chatSendBottom.style.top='23px';
				window.chatSendBottom.style.transition='none';
				window.chatSendBottom.style['text-align']='center';
				window.chatSendBottom.style.borderRadius='8px';
				window.chatSendBottom.style.backgroundSize="100% 100%";*/

				window.chatSendBottom.setBackgroundImage('extension/手杀ui/sayplay/buttonsend.png');
				//window.chatSendBottom.innerHTML = '<span style="color:white;font-size:22px;line-height:32px;font-weight:400;font-family:shousha">发送</span>';
				window.chatSendBottom.innerHTML = '<span style="color:white;font-size:22px;line-height:35px;font-weight:400;font-family:shousha">发送</span>';
				window.chatBg.appendChild(window.chatSendBottom);
				clickFK(window.chatSendBottom);
				game.updateChatWord = function (str) {
					window.chatBackground2.innerHTML = str;
				}
				game.addChatWord();

				window.sendInfo = function (content) {
				    if(game.me) {
				        game.me.say(content);
				    }else {
				        console.log(content);
				    }
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
				window.ipt.style.top = '1.5px';//0px
				window.ipt.style.left = '1px';//0px
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
				window.chatBackground.style.transition = 'all 0.5s ease';
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
						if(this!=game.me&&lib.config.no_any_chat) return;
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
					//_status.as_showImage.remove();
					//delete _status.as_showImage;
					var div2=_status.as_showImage;
					if(window.shoushaBlanks&&window.shoushaBlanks.contains(div2)) {
					    window.shoushaBlanks.remove(div2);
					}
					_status.as_showImage = undefined;
					var left=div2.toLeft;
					var width=div2.toWidth;
					var wait=div2.runTime;
					setTimeout(function(){
					    div2.style.left = left + '%';
					    div2.style.width = width + '%';
					    //div2.style.opacity = 0;
					    div2.style.setProperty('opacity',0,'important');
					    /*if(window.shoushaBlanks&&ui.window.classList.contains('shortcutpaused')) {
				            div2.style.transform = 'scale(0)';
				        }*/
					    setTimeout(function(){
					        div2.remove();
					        delete div2;
					    },600);
					},wait+10);
				}
			}
			game.as_isWorking=false;
			game.as_workList=[];
			game.hasDDXY=function(str){
			    if(!str) return false;
			    return str.indexOf('ddxy')!=-1;
			};
			game.jd_isRange=false;
			//game.as_runTime=600;
			game.as_showImage = function (url, pos, time, working) {
				if (!url) return false;
				var jump=false;
				if(!game.hasDDXY(url)&&game.jd_isRange) jump=true;
				//同一时间申请过多时开始排队
				if(game.as_isWorking&&!working) {
				    //防止列表里塞入重复的申请（列表已经处理完时可忽略）
				    if(game.as_workList.length) {
				        if(!game.hasDDXY(url)&&game.as_workList[game.as_workList.length-1][0]==url) return false;
				        if(jump) return false;
				    }
				    game.as_workList.push([url,pos,time]);
				    return true;
				}
				//无列表时（列表处理速度/300ms，消失时间600ms，定在此之间，若加上“_status.as_showImage.runTime>=10&&”则未消失时自动屏蔽重复请求）
				if(jump||(!game.hasDDXY(url)&&_status.as_showImage&&_status.as_showImage.myUrl==url)) {
				    if(game.as_workList.length>0) {
					    var info=game.as_workList.shift();
					    game.as_showImage(info[0],info[1],info[2],true);
					}else {
					    game.as_isWorking=false;
					}
				    return false;
				}
				game.as_isWorking=true;
				if (!pos || !Array.isArray(pos)) {
					pos = [0, 0, 100, 100];
				}
				if (!time || (isNaN(time) && time !== true)) time = 3;
				if (_status.as_showImage) {
					game.as_removeImage();
					//_status.as_showImage.remove();
					//delete _status.as_showImage;
				}
				//太虚幻境位置修正
				if(get.mode()=='taixuhuanjing') pos[0]-=7;

				var div = ui.create.div('', '', ui.window);
				//阶段提示加入隐藏
				if(window.shoushaBlanks&&!ui.window.classList.contains('shortcutpaused')) {
				    window.shoushaBlanks.add(div);
				}
				div.style.cssText = 'opacity: 0; z-index:-1; pointer-events:none; left:' + (pos[0] - pos[2] / 1.5) +
					'%; top:' + pos[1] + '%; width:' + pos[2] + '%; height:' + pos[3] +
					'%; position:absolute; background-size:100% 100%; background-position:center center; background-image:url(' +
					lib.assetURL + url + ');transition: all 0.5s ease-out';// transition-property:all; transition-duration:1s';
				div.style.setProperty('opacity',0,'important');
				/*if(window.shoushaBlanks&&ui.window.classList.contains('shortcutpaused')) {
				    div.style.transform = 'scale(0)';
				}*/
				_status.as_showImage = div;

				if (_status.as_showText) {
					_status.as_showImage.hide();
				}
				div.toLeft=(pos[0] + pos[2] / 1.5);
				div.toWidth=pos[2];
				div.myUrl=url;
				div.runTime=600;

				setTimeout(function () {
					div.style.opacity = 1;
					div.style.left = pos[0] + '%';
					div.style.width = pos[2] + '%';
					/*if(window.shoushaBlanks&&ui.window.classList.contains('shortcutpaused')) {
				        div.style.transform = 'scale(1)';
				    }*/
					div.runTime=600;
					var runtime=function(divs) {
					    if(divs!=_status.as_showImage) return;
					    divs.runTime-=10;
					    if(divs.runTime>0) {
					        setTimeout(function() {
					            runtime(divs);
					        },10);
					    }
					};
					runtime(div);
					var toUrl=url;
					setTimeout(function() {
					    //game.isWorking=false;
					    if(game.as_workList.length>0) {
					        var info=game.as_workList.shift();
					        game.as_showImage(info[0],info[1],info[2],true);
					    }else {
					        //setTimeout(function() {
					            game.as_isWorking=false;
					        //},310);
					    }
					},400);
				}, 10);
				//if(url.indexOf('hhjs.')!=-1) time=1;

				if (time === true) return true;
				setTimeout(function () {
					if (_status.as_showImage) {
						game.as_removeImage();
						//_status.as_showImage.remove();
						//delete _status.as_showImage;
					}
				}, time * 1000);

				return true;
			};
			//-----华丽分割线-----// 

			// if (get.mode() == 'boss') return
            if(!lib.config.extension_如真似幻_enable) lib.init.onload = function () {
				ui.updated();
				game.documentZoom = game.deviceZoom;
				if (game.documentZoom != 1) {
					ui.updatez();
				}
				ui.background = ui.create.div('.background');
				ui.background.style.backgroundSize = "cover";
				ui.background.style.backgroundPosition = '50% 50%';
				if (lib.config.image_background && lib.config.image_background != 'default' && lib
					.config.image_background.indexOf('custom_') != 0) {
					ui.background.setBackgroundImage('image/background/' + lib.config.image_background +
						'.jpg');
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
						if (Math.abs(e.touches[0].clientX / game.documentZoom - this.startX) >
							10 ||
							Math.abs(e.touches[0].clientY / game.documentZoom - this.startY) >
							10) {
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
							ui.css.card_stylesheet = lib.init.sheet(
								'.card:not(*:empty){background-image:url(' +
								fileLoadedEvent.target.result + ')}');
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
							ui.css.cardback_stylesheet = lib.init.sheet(
								'.card:empty,.card.infohidden{background-image:url(' +
								fileLoadedEvent.target.result + ')}');
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
							ui.css.cardback_stylesheet2 = lib.init.sheet(
								'.card.infohidden:not(.infoflip){background-image:url(' +
								fileLoadedEvent.target.result + ')}');
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
							ui.css.hp_stylesheet1 = lib.init.sheet(
								'.hp:not(.text):not(.actcount)[data-condition="high"]>div:not(.lost){background-image:url(' +
								fileLoadedEvent.target.result + ')}');
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
							ui.css.hp_stylesheet2 = lib.init.sheet(
								'.hp:not(.text):not(.actcount)[data-condition="mid"]>div:not(.lost){background-image:url(' +
								fileLoadedEvent.target.result + ')}');
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
							ui.css.hp_stylesheet3 = lib.init.sheet(
								'.hp:not(.text):not(.actcount)[data-condition="low"]>div:not(.lost){background-image:url(' +
								fileLoadedEvent.target.result + ')}');
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
							ui.css.hp_stylesheet4 = lib.init.sheet(
								'.hp:not(.text):not(.actcount)>.lost{background-image:url(' +
								fileLoadedEvent.target.result + ')}');
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
				}
				if (lib.config.player_style == 'custom') {
					ui.css.player_stylesheet = lib.init.sheet(
						'#window .player{background-image:none;background-size:100% 100%;}');
					game.getDB('image', 'player_style', function (fileToLoad) {
						if (!fileToLoad) return;
						var fileReader = new FileReader();
						fileReader.onload = function (fileLoadedEvent) {
							if (ui.css.player_stylesheet) {
								ui.css.player_stylesheet.remove();
							}
							ui.css.player_stylesheet = lib.init.sheet(
								'#window .player{background-image:url("' +
								fileLoadedEvent.target.result +
								'");background-size:100% 100%;}');
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
							ui.css.border_stylesheet.sheet.insertRule(
								'#window .player>.framebg{display:block;background-image:url("' +
								fileLoadedEvent.target.result + '")}', 0);
							ui.css.border_stylesheet.sheet.insertRule(
								'.player>.count{z-index: 3 !important;border-radius: 2px !important;text-align: center !important;}',
								0);
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
							ui.css.control_stylesheet = lib.init.sheet(
								'#window .control,.menubutton:not(.active):not(.highlight):not(.red):not(.blue),#window #system>div>div{background-image:url("' +
								fileLoadedEvent.target.result + '")}');
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
							ui.css.menu_stylesheet = lib.init.sheet(
								'html #window>.dialog.popped,html .menu,html .menubg{background-image:url("' +
								fileLoadedEvent.target.result +
								'");background-size:cover}');
						};
						fileReader.readAsDataURL(fileToLoad, "UTF-8");
					});
				}

				var proceed2=function(){
					var mode=lib.imported.mode;
					var card=lib.imported.card;
					var character=lib.imported.character;
					var play=lib.imported.play;
					delete window.game;
					var i,j,k;
					for(i in mode[lib.config.mode].element){
						if(!lib.element[i]) lib.element[i]=[];
						for(j in mode[lib.config.mode].element[i]){
							if(j=='init'){
								if(!lib.element[i].inits) lib.element[i].inits=[];
								lib.element[i].inits.push(mode[lib.config.mode].element[i][j]);
							}
							else{
								lib.element[i][j]=mode[lib.config.mode].element[i][j];
							}
						}
					}
					for(i in mode[lib.config.mode].ai){
						if(typeof mode[lib.config.mode].ai[i]=='object'){
							if(ai[i]==undefined) ai[i]={};
							for(j in mode[lib.config.mode].ai[i]){
								ai[i][j]=mode[lib.config.mode].ai[i][j];
							}
						}
						else{
							ai[i]=mode[lib.config.mode].ai[i];
						}
					}
					for(i in mode[lib.config.mode].ui){
						if(typeof mode[lib.config.mode].ui[i]=='object'){
							if(ui[i]==undefined) ui[i]={};
							for(j in mode[lib.config.mode].ui[i]){
								ui[i][j]=mode[lib.config.mode].ui[i][j];
							}
						}
						else{
							ui[i]=mode[lib.config.mode].ui[i];
						}
					}
					for(i in mode[lib.config.mode].game){
						game[i]=mode[lib.config.mode].game[i];
					}
					for(i in mode[lib.config.mode].get){
						get[i]=mode[lib.config.mode].get[i];
					}
					lib.init.start=mode[lib.config.mode].start;
					lib.init.startBefore=mode[lib.config.mode].startBefore;
					if(game.onwash){
						lib.onwash.push(game.onwash);
						delete game.onwash;
					}
					if(game.onover){
						lib.onover.push(game.onover);
						delete game.onover;
					}
					lib.config.banned=lib.config[lib.config.mode+'_banned']||[];
					lib.config.bannedcards=lib.config[lib.config.mode+'_bannedcards']||[];

					lib.rank=window.noname_character_rank;
					delete window.noname_character_rank;
					for(i in mode[lib.config.mode]){
						if(i=='element') continue;
						if(i=='game') continue;
						if(i=='ai') continue;
						if(i=='ui') continue;
						if(i=='get') continue;
						if(i=='config') continue;
						if(i=='onreinit') continue;
						if(i=='start') continue;
						if(i=='startBefore') continue;
						if(lib[i]==undefined) lib[i]=(Array.isArray(mode[lib.config.mode][i]))?[]:{};
						for(j in mode[lib.config.mode][i]){
							lib[i][j]=mode[lib.config.mode][i][j];
						}
					}
					if(typeof mode[lib.config.mode].init=='function'){
						mode[lib.config.mode].init();
					}

					var connectCharacterPack=[];
					var connectCardPack=[];
					for(i in character){
						if(character[i].character){
							lib.characterPack[i]=character[i].character
						}
						for(j in character[i]){
							if(j=='mode'||j=='forbid') continue;
							if(j=='connect'){
								connectCharacterPack.push(i);
								continue;
							}
							if(j=='character'&&!lib.config.characters.contains(i)&&lib.config.mode!='connect'){
								if(lib.config.mode=='chess'&&get.config('chess_mode')=='leader'&&get.config('chess_leader_allcharacter')){
									for(k in character[i][j]){
										lib.hiddenCharacters.push(k);
									}
								}
								else if(lib.config.mode!='boss'||i!='boss'){
									continue;
								}
							}
							if(Array.isArray(lib[j])&&Array.isArray(character[i][j])){
								lib[j].addArray(character[i][j]);
								continue;
							}
							for(k in character[i][j]){
								if(j=='character'){
									if(!character[i][j][k][4]){
										character[i][j][k][4]=[];
									}
									if(character[i][j][k][4].contains('boss')||
										character[i][j][k][4].contains('hiddenboss')){
										lib.config.forbidai.add(k);
									}
									if(lib.config.forbidai_user&&lib.config.forbidai_user.contains(k)){
										lib.config.forbidai.add(k);
									}
									for(var l=0;l<character[i][j][k][3].length;l++){
										lib.skilllist.add(character[i][j][k][3][l]);
									}
								}
								if(j=='skill'&&k[0]=='_'&&(lib.config.mode!='connect'?(!lib.config.characters.contains(i)):(!character[i].connect))){
									continue;
								}
								if(j=='translate'&&k==i){
									lib[j][k+'_character_config']=character[i][j][k];
								}
								else{
									if(lib[j][k]==undefined){
										if(j=='skill'&&!character[i][j][k].forceLoad&&lib.config.mode=='connect'&&!character[i].connect){
											lib[j][k]={
												nopop:character[i][j][k].nopop,
												derivation:character[i][j][k].derivation
											};
										}
										else{
											lib[j][k]=character[i][j][k];
										}
										if(j=='card'&&lib[j][k].derivation){
											if(!lib.cardPack.mode_derivation){
												lib.cardPack.mode_derivation=[k];
											}
											else{
												lib.cardPack.mode_derivation.push(k);
											}
										}
									}
									else if(Array.isArray(lib[j][k])&&Array.isArray(character[i][j][k])){
										lib[j][k].addArray(character[i][j][k]);
									}
									else{
										console.log('dublicate '+j+' in character '+i+':\n'+k+'\n'+': '+lib[j][k]+'\n'+character[i][j][k]);
									}
								}
							}
						}
					}
					var connect_avatar_list=[];
					for(var i in lib.character){
						connect_avatar_list.push(i);
					}
					connect_avatar_list.sort(lib.sort.capt);
					for(var i=0;i<connect_avatar_list.length;i++){
						var ia=connect_avatar_list[i];
						lib.mode.connect.config.connect_avatar.item[ia]=lib.translate[ia];
					}
					if(lib.config.mode!='connect'){
						var pilecfg=lib.config.customcardpile[get.config('cardpilename')||'当前牌堆'];
						if(pilecfg){
							lib.config.bannedpile=get.copy(pilecfg[0]||{});
							lib.config.addedpile=get.copy(pilecfg[1]||{});
						}
						else{
							lib.config.bannedpile={};
							lib.config.addedpile={};
						}
					}
					else{
						lib.cardPackList={};
					}
					for(i in card){
						lib.cardPack[i]=[];
						if(card[i].card){
							for(var j in card[i].card){
								if(!card[i].card[j].hidden&&card[i].translate[j+'_info']){
									lib.cardPack[i].push(j);
								}
							}
						}
						for(j in card[i]){
							if(j=='mode'||j=='forbid') continue;
							if(j=='connect'){
								connectCardPack.push(i);
								continue;
							}
							if(j=='list'){
								if(lib.config.mode=='connect'){
									lib.cardPackList[i]=card[i][j];
								}
								else{
									if(lib.config.cards.contains(i)){
										var pile;
										if(typeof card[i][j]=='function'){
											pile=card[i][j]();
										}
										else{
											pile=card[i][j];
										}
										lib.cardPile[i]=pile.slice(0);
										if(lib.config.bannedpile[i]){
											for(var k=0;k<lib.config.bannedpile[i].length;k++){
												pile[lib.config.bannedpile[i][k]]=null;
											}
										}
										for(var k=0;k<pile.length;k++){
											if(!pile[k]){
												pile.splice(k--,1);
											}
										}
										if(lib.config.addedpile[i]){
											for(var k=0;k<lib.config.addedpile[i].length;k++){
												pile.push(lib.config.addedpile[i][k]);
											}
										}
										lib.card.list=lib.card.list.concat(pile);
									}
								}
							}
							else{
								for(k in card[i][j]){
									if(j=='skill'&&k[0]=='_'&&!card[i][j][k].forceLoad&&(lib.config.mode!='connect'?(!lib.config.cards.contains(i)):(!card[i].connect))){
										continue;
									}
									if(j=='translate'&&k==i){
										lib[j][k+'_card_config']=card[i][j][k];
									}
									else{
										if(lib[j][k]==undefined){
											if(j=='skill'&&!card[i][j][k].forceLoad&&lib.config.mode=='connect'&&!card[i].connect){
												lib[j][k]={
													nopop:card[i][j][k].nopop,
													derivation:card[i][j][k].derivation
												};
											}
											else{
												lib[j][k]=card[i][j][k];
											}
										}
										else console.log('dublicate '+j+' in card '+i+':\n'+k+'\n'+lib[j][k]+'\n'+card[i][j][k]);
										if(j=='card'&&lib[j][k].derivation){
											if(!lib.cardPack.mode_derivation){
												lib.cardPack.mode_derivation=[k];
											}
											else{
												lib.cardPack.mode_derivation.push(k);
											}
										}
									}
								}
							}
						}
					}
					if(lib.cardPack.mode_derivation){
						for(var i=0;i<lib.cardPack.mode_derivation.length;i++){
							if(typeof lib.card[lib.cardPack.mode_derivation[i]].derivation=='string'&&!lib.character[lib.card[lib.cardPack.mode_derivation[i]].derivation]){
								lib.cardPack.mode_derivation.splice(i--,1);
							}
							else if(typeof lib.card[lib.cardPack.mode_derivation[i]].derivationpack=='string'&&!lib.config.cards.contains(lib.card[lib.cardPack.mode_derivation[i]].derivationpack)){
								lib.cardPack.mode_derivation.splice(i--,1);
							}
						}
						if(lib.cardPack.mode_derivation.length==0){
							delete lib.cardPack.mode_derivation;
						}
					}
					if(lib.config.mode!='connect'){
						for(i in play){
							if(lib.config.hiddenPlayPack.contains(i)) continue;
							if(play[i].forbid&&play[i].forbid.contains(lib.config.mode)) continue;
							if(play[i].mode&&play[i].mode.contains(lib.config.mode)==false) continue;
							for(j in play[i].element){
								if(!lib.element[j]) lib.element[j]=[];
								for(k in play[i].element[j]){
									if(k=='init'){
										if(!lib.element[j].inits) lib.element[j].inits=[];
										lib.element[j].inits.push(play[i].element[j][k]);
									}
									else{
										lib.element[j][k]=play[i].element[j][k];
									}
								}
							}
							for(j in play[i].ui){
								if(typeof play[i].ui[j]=='object'){
									if(ui[j]==undefined) ui[j]={};
									for(k in play[i].ui[j]){
										ui[j][k]=play[i].ui[j][k];
									}
								}
								else{
									ui[j]=play[i].ui[j];
								}
							}
							for(j in play[i].game){
								game[j]=play[i].game[j];
							}
							for(j in play[i].get){
								get[j]=play[i].get[j];
							}
							for(j in play[i]){
								if(j=='mode'||j=='forbid'||j=='init'||j=='element'||
								j=='game'||j=='get'||j=='ui'||j=='arenaReady') continue;
								for(k in play[i][j]){
									if(j=='translate'&&k==i){
										// lib[j][k+'_play_config']=play[i][j][k];
									}
									else{
										if(lib[j][k]!=undefined){
											console.log('dublicate '+j+' in play '+i+':\n'+k+'\n'+': '+lib[j][k]+'\n'+play[i][j][k]);
										}
										lib[j][k]=play[i][j][k];
									}
								}
							}
							if(typeof play[i].init=='function') play[i].init();
							if(typeof play[i].arenaReady=='function') lib.arenaReady.push(play[i].arenaReady);
						}
					}

					lib.connectCharacterPack=[];
					lib.connectCardPack=[];
					for(var i=0;i<lib.config.all.characters.length;i++){
						var packname=lib.config.all.characters[i];
						if(connectCharacterPack.contains(packname)){
							lib.connectCharacterPack.push(packname)
						}
					}
					for(var i=0;i<lib.config.all.cards.length;i++){
						var packname=lib.config.all.cards[i];
						if(connectCardPack.contains(packname)){
							lib.connectCardPack.push(packname)
						}
					}
					if(lib.config.mode!='connect'){
						for(i=0;i<lib.card.list.length;i++){
							if(lib.card.list[i][2]=='huosha'){
								lib.card.list[i]=lib.card.list[i].slice(0);
								lib.card.list[i][2]='sha';
								lib.card.list[i][3]='fire';
							}
							else if(lib.card.list[i][2]=='leisha'){
								lib.card.list[i]=lib.card.list[i].slice(0);
								lib.card.list[i][2]='sha';
								lib.card.list[i][3]='thunder';
							}
							if(!lib.card[lib.card.list[i][2]]){
								lib.card.list.splice(i,1);i--;
							}
							else if(lib.card[lib.card.list[i][2]].mode&&
								lib.card[lib.card.list[i][2]].mode.contains(lib.config.mode)==false){
								lib.card.list.splice(i,1);i--;
							}
						}
					}

					if(lib.config.mode=='connect'){
						_status.connectMode=true;
					}
					if(window.isNonameServer){
						lib.cheat.i();
					}
					else if(lib.config.dev&&(!_status.connectMode||lib.config.debug)){
						lib.cheat.i();
					}
					lib.config.sort_card=get.sortCard(lib.config.sort);
					delete lib.imported.character;
					delete lib.imported.card;
					delete lib.imported.mode;
					delete lib.imported.play;
					for(var i in lib.init){
						if(i.indexOf('setMode_')==0){
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
						if (lib.mode[lib.config.mode] && lib.mode[lib.config.mode]
							.fromextension) {
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
												game.addCharacterPack(get.copy(obj[4]
													.character));
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
													obj[4].skill.translate[j], obj[4].skill
														.translate[j + '_info']);
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
							lib.storage = JSON.parse(localStorage.getItem(lib.configprefix + lib
								.config.mode));
							if (typeof lib.storage != 'object') throw ('err');
							if (lib.storage == null) throw ('err');
						} catch (err) {
							lib.storage = {};
							localStorage.setItem(lib.configprefix + lib.config.mode, "{}");
						}
						proceed2();
					} else {
						game.getDB('data', lib.config.mode, function (obj) {
							lib.storage = obj || {};
							proceed2();
						});
					}
				};
				//界面函数		
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
			};

			if (lib.config.dev) {
				window.app = app;
			}
		},
		config: {
			ShouShaThanks: {
				name: '作者：橙续缘',
				clear: true,
			},
			MoGaiMengXiu: {
				name: '修改：萌新（转型中）',
				clear: true,
			},
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
				init: true,
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
				init: true,
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
				init: true,
				intro: "开启进度条的情况下，开启此选项后，玩家进度条将会进行刷新",
			},
			jindutiaoaiUpdata: {
				name: "人机进度条刷新",
				init: true,
				intro: "开启进度条的情况下，开启此选项后，ai的进度条将会进行刷新",
			},
			jindutiaoSet: {
				name: "进度条高度",
				init: "26",
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
			jiangdeng: {
			    name: '手杀将灯展示',
			    init: true,
			    intro: '开启后对局中部分武将右下角会出现将灯的标记（搬运自 烧烤团子 的扩展，感谢！由于适配问题，已重构部分代码）',
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
				init: true,
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
				init: true,
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
				init: "random",
				intro: "更改狗托播报出现的时间间隔，可根据个人喜好调整频率",
				item: {
					"30000": "0.5min/次",
					"60000": "1min/次",
					"120000": "2min/次",
					"180000": "3min/次",
					"300000": "5min/次",
					"random": "随机间隔",
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
			yangshi_bg: {
				name: "菜单壁纸（手杀）",
				init: "0",
				intro: "手杀样式下，选择切换菜单背景壁纸",
				item: {
				    "0": "经典款式",
					"1": "青铜图腾",
					"2": "新杀晚夜",
					"3": "新杀春日（动态）",
					"4": "曹节花园",
					"5": "谋定天下",
					"6": "羊皮画卷·壹",
					"7": "羊皮画卷·贰",
					"8": "节气壁纸（随机）",
					"follow": "📎随游戏壁纸",
				},
				onclick:function(item){
				    game.saveConfig('extension_手杀ui_yangshi_bg', item);
				    ui.refleshMenuBackground();
				}
			},
			XPJ: {
				name: "小配件（十周年）",
				init: "off",
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
			xiandingskill_ss: {
				init: true,
				intro: "<li>手杀样式下在游戏中，限定技按钮样式美化显示",
				name: "限定技美化（手杀）"
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
				init: "1",
				intro: "开启后可以美化游戏的选项开关，需要重启",
				name: "开关美化",
				item: {
					"0": "关闭",
					"1": "手杀",
					"2": "十周年",
				},
			},
			qiDongYe: {
				name: '启动页',
				init: 'othersOn',
				intro: '可直接通过此功能切换启动页样式',
				item: {
					on: '<b><font color=\"#FF3000\">启动页-动态',
					othersOn: '<b><font color=\"#0080FF\">启动页-大图',
					othersTwo: '<b><font color=\"#0050FF\">启动页-新版',
					off: '<b><font color=\"#00FF00\">关闭',
				},
				unshow:true,//隐藏这个设置
			},
			JSAN: {
				init: false,
				intro: "<li>在游戏结束时，出现按钮隐藏结算菜单或直接隐藏结算菜单<li>可以点击游戏界面中心空白区域显示菜单",
				name: "结算按钮隐藏"
			},
			ZLLT: {
				init: true,
				name: "资料页露头(重启生效)",
				intro: "手杀样式下，点击武将资料页会适配露头皮肤。",
				unshow:true,//隐藏这个设置
			},
		},
		editable: false,
	};
});
game.import("extension",function(lib,game,ui,get,ai,_status){
return {name:"无名补丁",content:function(config,pack){
window.nmimport = function(func) {
            func(lib, game, ui, get, ai, _status);
        };   
if (lib.config.extensions && lib.config.extensions.contains('十周年UI') && lib.config['extension_十周年UI_enable']) {      
console.time('无名补丁'); 
//手气卡音效及进度条等修改
if(config.xinddraw){
lib.arenaReady.push(function(){
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
                            nmjindutiao1=ui.create.div('.nmjindutiao1',ui.arena);	
nmjindutiaox1=ui.create.div('.nmjindutiaox1',ui.arena);
nmjindutiaox1.addEventListener("webkitAnimationEnd",
 function() {      
ui.click.cancel();
})
   //event.numk=parseInt(Math.random()*(8000)+2000);  
   event.numk=99+3;  
   var offline=sessionStorage.getItem('Network');
		if(!offline) offline='online';
		if(offline=='online') {
           /*event.nump=[2,3].randomGet();
           event.numt=[3,4,5].randomGet();*/
           event.nump=3;
           event.numt=7;
        }else {
           event.nump=3;
           event.numt=Infinity;
        } 
           var  score1= parseInt(Math.random()*4+4);	
           var  score2=parseInt(Math.random()*10);
          event.score=ui.create.div('.nmcardscore',ui.arena);
          event.scorex1=ui.create.div('.nmscore1',event.score);
          event.scorex1.setBackgroundImage('extension/手杀ui/handscore/'+score1+'.png');
          event.scorex2=ui.create.div('.nmscore2',event.score);
          event.scorex2.setBackgroundImage('extension/手杀ui/handscore/'+score2+'.png');                  
              var str="本场还可更换"+event.numt+"次手牌(免费次数还剩"+event.nump+"次)" ;   
              if(lib.config['extension_无名补丁_infinitydraw']) {
                  event.numk=parseInt(Math.random()*(8000)+2000);  
                  event.numt=event.numk;
                  event.nump=0;
                  var str="本场还可更换"+event.numt+"次手牌" ;
              }
              if(offline!='online') str='本场可无限次数更换手牌';
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
                                game.playAudio('../extension/手杀ui/audio/huan.mp3');
                                event.numk--;
                                event.numt--;
                                event.nump--;
                                game.me.directgain(get.cards(hs.length));
  var score1= parseInt(Math.random()*4+4);	
 var   score2=parseInt(Math.random()*10);   
          event.scorex1.setBackgroundImage('extension/手杀ui/handscore/'+score1+'.png');
          event.scorex2.setBackgroundImage('extension/手杀ui/handscore/'+score2+'.png');    
                             if(event.numt>0){
                             var str;
                      if(event.nump>0) str= "本场还可更换"+event.numt+"次手牌(免费次数还剩"+event.nump+"次)";
                      else {str= "本场还可更换"+event.numt+"次手牌(每次消耗一张手气卡，当前还有"+event.numk+"张)";
                      if(lib.config['extension_无名补丁_infinitydraw']) {
                          str= "本场还可更换"+event.numt+"次手牌";
                          if(game.initJinDuTiao&&game.me&&game.me.name&&!game.forbidResumeJinDu) {
			                  game.initJinDuTiao('pause');
			              }
                      }
                      ui.confirm.firstChild.classList.add("huan2"); 
                      }
                      var offline=sessionStorage.getItem('Network');
		              if(!offline) offline='online';
                      if(offline!='online') str='本场可无限次数更换手牌';
                            event.dialog.remove();
                            event.dialog = dui.showHandTip(str);
                            event.dialog.strokeText();   
                                event.goto(2);}
                                else {
                                if (event.dialog) event.dialog.close();
                               if(nmjindutiao1)nmjindutiao1.remove();
   if(nmjindutiaox1)nmjindutiaox1.remove();               if(event.score)event.score.remove();          
                                if (ui.confirm) ui.confirm.close();
                                game.me._start_cards = game.me.getCards('h');
                                event.goto(4);
                            }
                            } else {
                                if (event.dialog) event.dialog.close();
                               if(nmjindutiao1)nmjindutiao1.remove();
   if(nmjindutiaox1)nmjindutiaox1.remove();                if(event.score)event.score.remove();         
                                if (ui.confirm) ui.confirm.close();
                                game.me._start_cards = game.me.getCards('h');
                                event.goto(4);
                            }
                            "step 4";
                            setTimeout(decadeUI.effect.gameStart, 51);
                        };
                        });}
//选将美化
if(config.xindchoose){//选将的将框
lib.groupnature={//这里修改控制武将边框的代码。shen的后缀是shen（本体里神的nature是thunder，和晋一样，这里修改后不用再改本体了。给扩展武将加边框，请在下面按格式填写你喜欢的属性，然后在mark.css里按例子填写边框样式图片的调用。
    shen:'shen',//素材放到无名补丁/group文件夹里
    devil:'devil',
    wei:'water',
    shu:'soil',
    wu:'wood',
    qun:'metal',
    key:'key',
    jin:'thunder',
    ye:'ye',
    western:'western',
    qun_shu:'qun_shu',
    qun_wei:'qun_wei',
    qun_wu:'qun_wu',
    shu_qun:'shu_qun',
    shu_wei:'shu_wei',
    shu_wu:'shu_wu',
    wei_qun:'wei_qun',
    wei_shu:'wei_shu',
    wei_wu:'wei_wu',
    wu_qun:'wu_qun',
    wu_shu:'wu_shu',
    wu_wei:'wu_wei',
};
};
if(config.xindsingle){
 lib.element.content.chooseButton=function(){//修改选项框函数，包括单行选将框和欢乐模式选将框靠左
			"step 0"
	            if(typeof event.dialog=='number'){
						event.dialog=get.idDialog(event.dialog);
					}
					if(event.createDialog&&!event.dialog){
						if(Array.isArray(event.createDialog)){
							event.createDialog.add('hidden');
							event.dialog=ui.create.dialog.apply(this,event.createDialog);
						}
						event.closeDialog=true;
					}
					if(event.dialog==undefined) event.dialog=ui.dialog;

					//单行选将屏蔽的模式
					var forbidModes=['dianjiang'];
					var stmode=_status.mode||'none';
					//设置_status.noEnterChoosing为true可暂时屏蔽单行选将
					if((event.isMine()||event.dialogdisplay)&&!forbidModes.contains(stmode)){
						event.dialog.style.display='';
						event.dialog.open();
		                if(_status.event.parent.name=="chooseCharacter"&&!_status.noEnterChoosing) event.dialog.classList.add("singlex");
		                if(_status.mode=="huanle"&&_status.event.parent.step=='6') event.dialog.classList.add("huanle");
	                    if((_status.mode=="huanle"&&_status.event.parent.step=='7')||(get.mode()=="identity" && _status.mode=="normal"&&_status.event.parent.step=='2')) event.dialog.classList.add("group");		
					}
					game.check();
					if(event.isMine()){
						if(event.hsskill&&!event.forced&&_status.prehidden_skills.contains(event.hsskill)){
							ui.click.cancel();
							return;
						}
						game.pause();
					}
					else if(event.isOnline()){
						event.send();
						delete event.callback;
					}
					else{
						event.result='ai';
					}
					if(event.onfree){
						lib.init.onfree();
					}
					//此处一刷新，像邓艾急袭这种框框就不会出空了
					ui.update();
					"step 1"
					if(event.result=='ai'){
						if(event.processAI){
							event.result=event.processAI();
						}
						else{
							game.check();
							if(ai.basic.chooseButton(event.ai)||forced) ui.click.ok();
							else ui.click.cancel();
						}
					}
					if(event.closeDialog){
						event.dialog.close();
					}
					if(event.callback){
						event.callback(event.player,event.result);
					}
					event.resume();
				};}
				//样式
                if (lib.config.extension_无名补丁_xindchoose == 'shousha') {
		        if(lib.config.extension_无名补丁_xindchoose_type=='old') {
		            lib.init.css(lib.assetURL + 'extension/手杀ui', 'style_old');
		        }else /*if(lib.config.extension_无名补丁_xindchoose_type=='boss') {
		            lib.init.css(lib.assetURL + 'extension/手杀ui', 'style_boss');
		        }else */{
		            lib.init.css(lib.assetURL + 'extension/手杀ui', 'style');
		        }
		        };
		        if (lib.config.extension_无名补丁_xindchoose == 'shizhounian') {
		        lib.init.css(lib.assetURL + 'extension/手杀ui', 'style2');
	            };
	            if (lib.config.extension_无名补丁_xindmenu == 'shousha') {
                    lib.init.css(lib.assetURL + 'extension/手杀ui', 'menu');
                    ui.refleshMenuBackground = function() {
                        let typeBG = lib.config.extension_手杀ui_yangshi_bg;
                        let setBG = false;
                        if(['0','1','2','3','4','5','6','7'].contains(typeBG)) {
                            setBG = `url('${lib.assetURL}extension/手杀ui/image/menu/bg${typeBG == '0' ? '' : typeBG}.jpg')`;
                        }
                        else if(typeBG == '8') {
                            let ranB = Math.floor(20 * Math.random()) + 1;
                            setBG = `url('${lib.assetURL}extension/手杀ui/image/menu/bg8/${ranB}.jpg')`;
                        }
                        else if(typeBG == 'follow') {
                            setBG = ui.background.style.backgroundImage;
                        }
                        if(setBG) {
                            game.createCss(`.menu-container>.menu.main{
                            	width: 102%;
                            	margin-left: -1.7%;
                            	height: 102%;
                            	margin-top: -1.7%;
                            	transition: all 0.3s;
                            	transform-origin:2px -35px;
                            	background-image:${setBG};
                            	background-size: 100% 100%;
                                backface-visibility: hidden; /* 避免闪动 */
                            }`, true);
                        }
                    }
	                //配合十周年演出
	                if(get.mode()=='brawl') {
	                    game.isBrawl=true;
	                    //lib.init.css(lib.assetURL + 'extension/手杀ui', 'menu3');
	                    /*var bgstyle=false;
	                    if(lib.config.extension_手杀ui_yangshi_bg=='1') bgstyle='menu_bg1';
	                    if(lib.config.extension_手杀ui_yangshi_bg=='2') bgstyle='menu_bg2';
	                    if(lib.config.extension_手杀ui_yangshi_bg=='3') bgstyle='menu_bg3';
		                if(bgstyle) lib.init.css(lib.assetURL + 'extension/手杀ui', bgstyle);*/
	                }else {
	                    lib.init.js(lib.assetURL + 'extension/手杀ui', 'menu');
	                    /*var bgstyle=false;
	                    if(lib.config.extension_手杀ui_yangshi_bg=='1') bgstyle='menu_bg1';
	                    if(lib.config.extension_手杀ui_yangshi_bg=='2') bgstyle='menu_bg2';
	                    if(lib.config.extension_手杀ui_yangshi_bg=='3') bgstyle='menu_bg3';
		                if(bgstyle) lib.init.css(lib.assetURL + 'extension/手杀ui', bgstyle);*/
	                }
                    ui.refleshMenuBackground();
		        };
		        if (lib.config.extension_无名补丁_xindmenu == 'shizhounian') {
		        lib.init.js(lib.assetURL + 'extension/手杀ui', 'menu');
		        lib.init.css(lib.assetURL + 'extension/手杀ui', 'menu2');
	            };
console.timeEnd('无名补丁');}                       
//if(config.shuohua_personChat==true||config.shuohua_personChat==undefined){
//搬运自 群小乔 的说话扩展
if(lib.config.extension_无名补丁_sayplay&&lib.config.extension_无名补丁_sayplay!='off'){
		game.chatSayCold=[];
		window.lifesayWord=[//添加常用语
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
		//if(game.shuohua_sendEmoji==undefined) 
		//if(player.shuohua_sendEmoji==undefined) player.shuohua_sendEmoji=game.shuohua_sendEmoji;
		game.shuohua_sendEmoji=function(emotion){
		    var player=this;
		    if(parseFloat(lib.config['extension_祖安设置_ransay'])==0) return false;
		    if(lib.config.extension_无名补丁_sayplay=='chg') {
                if(player==game.me) return false;
                if(game.chatSayCold&&game.chatSayCold.contains(player)) return false;
                //game.sayChatCold(player);
            }
					if(!emotion) emotion='boring2';
					var number=undefined;
					if(emotion=='happy'){
						number=get.rand(0,11);
					}
					if(emotion=='sad'){
						number=get.rand(12,17);
					}
					if(emotion=='angry'){
						number=get.rand(18,21);
					}
					if(emotion=='fear'){
						number=get.rand(22,27);
					}
					if(emotion=='interesting'){
						number=get.rand(28,30);
					}
					if(emotion=='boring'){
						number=get.rand(31,49);
					}
					if(window.emoji_num>50&&emotion=='boring2'){
						number=get.rand(50,window.emoji_num-1);
					}
					if(!number) return;
					var addList=[];
					for(var i in lib.config.shuohua_addEmojiStyle) addList.push(i);
					if(addList.contains(''+number)) this.sayChat('<img style=width:30px height:30px src="'+lib.assetURL+'extension/手杀ui/emoji/'+number+lib.config.shuohua_addEmojiStyle[number]+'">');
					else this.sayChat('<img style=width:30px height:30px src="'+lib.assetURL+'extension/手杀ui/emoji/'+number+'.png">');
					//if(addList.contains(''+number)) this.sayChat('<img style=width:50px height:50px src="'+lib.assetURL+'extension/手杀ui/emoji/'+number+lib.config.shuohua_addEmojiStyle[number]+'">');
					//else this.sayChat('<img style=width:50px height:50px src="'+lib.assetURL+'extension/手杀ui/emoji/'+number+'.png">');
		}
		lib.element.player.shuohua_sendEmoji=game.shuohua_sendEmoji;
		lib.element.player.sayChat=function(str){
		    var player=this;
		    if(parseFloat(lib.config['extension_祖安设置_ransay'])==0) return false;
		    if(lib.config.extension_无名补丁_sayplay=='chg') {
                if(player==game.me) return false;
                if(game.chatSayCold&&game.chatSayCold.contains(player)) return false;
                game.sayChatCold(player);
                setTimeout(function(){
                    player.say(str);
                },Math.ceil(Math.random()*700));
                return true;
            }else {
                player.say(str);
                return true;
            }
            return false;
		};
		game.sayChatCold=function(player) {
		    var ransec=(2+[0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,12,13,14,15,15,15,20].randomGet())*1500+[1,2,4,6,8].randomGet()*100;
            if(!game.chatSayCold.contains(player)) game.chatSayCold.push(player);
            if(ransec>0) setTimeout(function(){
                if(game.chatSayCold.contains(player)) game.chatSayCold.remove(player);
            }, ransec);
		}
		lib.skill._shuohuaSayWordphase={
			trigger:{
				global:"gameStart",
				player:["phaseBegin","phaseAfter","recoverAfter","shaAfter","shaMiss","gainAfter","gainMaxHpAfter","loseAfter","loseAsyncAfter","loseHpAfter","loseMaxHpAfter","damageAfter","die","dying","useCardToBefore","useCard","useSkill","phaseUseBegin"],
			},
			priority:-1,
			filter:function(event,player){
				if(game.wanqingIsOpen) return false;
				//if(lib.config.extension_无名补丁_sayplay=='old') return Math.random()<0.7;
				if(parseFloat(lib.config['extension_祖安设置_ransay'])==0) return false;
				if(lib.config.extension_无名补丁_sayplay=='chg') {
                    //if(player==game.me) return false;
                    //if(game.chatSayCold.contains(player)) return false;
                    return Math.random()<0.3;
                }
                return Math.random()<0.7;
			},
			forced:true,
			silent:true,
			popup:false,
			content:function(){
				if(lib.config.extension_无名补丁_sayplay=='chg') {
                    var emojiRand=0.4;
                }else {
                    var emojiRand=0.8;
                }
				game.updateEmojiNum();
				if(Math.random()<0.005){
					var pl=game.players.randomGet();
					var word=window.lifesayWord.randomGet();
					if(pl.sayChat(word)) game.playAudio("..", "extension", "手杀ui/audio",window.lifesayWord.indexOf(word)+"_" +pl.sex);
					return;
				}
				
				if(trigger.name=='phaseUse'){
					var list=[];
					var listf=[];
					var liste=[];
					for(var pl of game.players) if(pl!=player) list.push(pl);
					for(var pl of list) if(player.getFriends().contains(pl)) listf.push(pl);
					for(var pl of list) if(player.getEnemies().contains(pl)) liste.push(pl);
					for(var pl of listf){
						if(player.node.identity&&player.node.identity.firstChild&&player.node.identity.firstChild.innerHTML.indexOf('猜')==-1&&player.node.identity&&player.node.identity.dataset&&player.node.identity.dataset.color&&get.translation(player.node.identity.dataset.color)&&get.translation(player.node.identity.dataset.color).indexOf('猜')==-1){
							var skills=player.getSkills();
							var maixie=false;
							for(var skill of skills) if(lib.skill[skill].ai!=undefined&&(lib.skill[skill].ai.maixie||lib.skill[skill].ai["maixie_hp"])) maixie=true;
							if(maixie&&Math.random()<0.8){
								window.shuohua_malewords=['别BB，快砍我一刀','你倒是快砍我啊！'];
								window.shuohua_femalewords=['来，打我'];
								if(Math.random()<emojiRand) pl.sayChat(window['shuohua_'+(['male','female'].indexOf(pl.sex)==-1?'male':pl.sex)+'words'].randomGet());
								else pl.shuohua_sendEmoji(['happy','angry'].randomGet());
							}
							else if(Math.random()<0.8){
								window.shuohua_malewords=['别开枪，自己人！','自己人！真的！中国人不骗中国人！'];
								window.shuohua_femalewords=['大佬，自己人呢，亲亲！'];
								if(Math.random()<emojiRand) pl.sayChat(window['shuohua_'+(['male','female'].indexOf(pl.sex)==-1?'male':pl.sex)+'words'].randomGet());
								else pl.shuohua_sendEmoji(['sad','fear'].randomGet());
							}
						}
					}
					for(var pl of liste){
						if(player.node.identity&&player.node.identity.firstChild&&player.node.identity.firstChild.innerHTML.indexOf('猜')==-1&&player.node.identity&&player.node.identity.dataset&&player.node.identity.dataset.color&&get.translation(player.node.identity.dataset.color)&&get.translation(player.node.identity.dataset.color).indexOf('猜')==-1){
							var skills=player.getSkills();
							var maixie=false;
							for(var skill of skills) if(lib.skill[skill].ai!=undefined&&(lib.skill[skill].ai.maixie||lib.skill[skill].ai["maixie_hp"])) maixie=true;
							if(maixie&&Math.random()<0.8){
								window.shuohua_malewords=['有种来砍我啊，怂货！'];
								window.shuohua_femalewords=['来，有本事尽管来打我，老娘才不怕你呢！'];
								if(Math.random()<emojiRand) pl.sayChat(window['shuohua_'+(['male','female'].indexOf(pl.sex)==-1?'male':pl.sex)+'words'].randomGet());
								else pl.shuohua_sendEmoji(['happy','boring','boring2'].randomGet());
							}
							else if(Math.random()<0.8){
								window.shuohua_malewords=['别开枪，求你了！','大佬我错了，饶了我吧'];
								window.shuohua_femalewords=['大佬，别打我，我害怕！','大佬我错了，我几是一介弱女子，毫无反抗力的'];
								if(Math.random()<emojiRand) pl.sayChat(window['shuohua_'+(['male','female'].indexOf(pl.sex)==-1?'male':pl.sex)+'words'].randomGet());
								else pl.shuohua_sendEmoji(['sad','fear'].randomGet());
							}
						}
					}
				}
				else if(trigger.name=='useSkill'){
					window.shuohua_malewords=['技能多有什么了不起的，下一局我也换个厉害的武将[不过如此.jpg]'];
					window.shuohua_femalewords=['技能多有什么了不起的，下一局我也换个厉害的武将[不过如此.jpg]'];
					var other=game.players.randomGets(get.rand(1,2));
					if(other.length>0) for(var oth of other){
						if(oth!=player){
							if(Math.random()<emojiRand) oth.sayChat(window['shuohua_'+(['male','female'].indexOf(oth.sex)==-1?'male':oth.sex)+'words'].randomGet());
							else oth.shuohua_sendEmoji(['sad','fear','boring','boring2'].randomGet());
						}
					}
				}
				else if(trigger.name=='useCard'){
					var cardname=undefined;
					if(trigger.cards&&trigger.cards[0]) cardname=trigger.cards[0].name;
					else cardname=trigger.card.name;
					var type=undefined;
					if(trigger.cards&&trigger.cards[0]) type=get.type(trigger.cards[0]);
					else type=get.type(trigger.card);
					if(type=='equip'){
						var subtype=undefined;
						if(trigger.cards&&trigger.cards[0]) subtype=get.subtype(trigger.cards[0]);
						else subtype=get.subtype(trigger.card);
					}
					if(type=='basic'&&cardname!=undefined){
						if(cardname=='tao'){
							window.shuohua_malewords=['叮，血条已到账。','这桃味道不太行，下次换一家店','这桃这么酸，一定是pdd的吧！'];
							window.shuohua_femalewords=['叮，血条已到账。','这桃味道不太行，下次换一家店','这桃这么酸，一定是pdd的吧！'];
							if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
							else player.shuohua_sendEmoji(['happy','interesting'].randomGet());
						}
						else if(cardname=='jiu'){
							window.shuohua_malewords=['来一口82年茅台，我先干为敬！','有没有人要和我比一下酒量？','真好喝'];
							window.shuohua_femalewords=['来一口82年茅台，我先干为敬！','有没有人要和我比一下酒量？','真好喝'];
							if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
							else player.shuohua_sendEmoji(['happy','interesting'].randomGet());
						}
						else if(cardname=='shan'){
							window.shuohua_malewords=['幸亏劳资闪得快','你不要过来哇！','当时我害怕极了'];
							window.shuohua_femalewords=['我闪','你不要过来哇！','当时我害怕极了'];
							if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
							else player.shuohua_sendEmoji(['sad','fear'].randomGet());
						}
						else if(cardname=='sha'){
							window.shuohua_malewords=['杀一刀试试','我这刀下去你可能会变得撒敷敷'];
							window.shuohua_femalewords=['杀一下','我这刀下去你可能会变得撒敷敷'];
							if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
							else player.shuohua_sendEmoji(['happy','boring','boring2'].randomGet());
						}
						else if(cardname=='taoyuan'){
							window.shuohua_malewords=['我宣布，蟠桃大会开始了'];
							window.shuohua_femalewords=['我宣布，蟠桃大会开始了'];
							if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
							else player.shuohua_sendEmoji(['happy','interesting','boring2'].randomGet());
							setTimeout(function(){
								window.shuohua_malewords=['好多桃子，莫非宁就是桃子批发商？','好哥哥，分点桃'];
								window.shuohua_femalewords=['好多桃子，莫非宁就是桃子批发商？','好哥哥，分点桃'];
								var other=game.players.randomGets(get.rand(1,2));
								if(other.length>0) for(var oth of other){
									if(oth!=player){
										if(Math.random()<emojiRand) oth.sayChat(window['shuohua_'+(['male','female'].indexOf(oth.sex)==-1?'male':oth.sex)+'words'].randomGet());
										else oth.shuohua_sendEmoji(['happy','interesting','boring2'].randomGet());
									}
								}
							},3000);
						}
						else if(cardname=='nanman'){
							window.shuohua_malewords=['来来来，把你们的杀都交粗来！','放下武器，或可饶你一命','都听话，让杰哥康康你们的大不大'];
							window.shuohua_femalewords=['来来来，把你们的杀都交粗来！','放下武器，或可饶你一命'];
							if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
							else player.shuohua_sendEmoji(['happy','fear','interesting','boring2'].randomGet());
							setTimeout(function(){
								window.shuohua_malewords=['你不要过来啊！','害怕'];
								window.shuohua_femalewords=['你不要过来啊！','害怕'];
								var other=game.players.randomGets(get.rand(1,2));
								if(other.length>0) for(var oth of other){
									if(oth!=player){
										if(Math.random()<emojiRand) oth.sayChat(window['shuohua_'+(['male','female'].indexOf(oth.sex)==-1?'male':oth.sex)+'words'].randomGet());
										else oth.shuohua_sendEmoji(['happy','fear','interesting','boring2'].randomGet());
									}
								}
							},3000);
						}
						else if(cardname=='wugu'){
							window.shuohua_malewords=['来来来，一人一张，不要抢','看来是大丰收啊'];
							window.shuohua_femalewords=['来来来，一人一张，不要抢','看来是大丰收啊'];
							if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
							else player.shuohua_sendEmoji(['happy','interesting','boring2'].randomGet());
							setTimeout(function(){
								window.shuohua_malewords=['谢谢老板！','老板666','老板我给你打call','牌牌摩多摩多'];
								window.shuohua_femalewords=['谢谢老板！','老板666','老板我给你打call','牌牌摩多摩多'];
								var other=game.players.randomGets(get.rand(1,2));
								if(other.length>0) for(var oth of other){
									if(oth!=player){
										if(Math.random()<emojiRand) oth.sayChat(window['shuohua_'+(['male','female'].indexOf(oth.sex)==-1?'male':oth.sex)+'words'].randomGet());
										else oth.shuohua_sendEmoji(['happy','interesting','boring2'].randomGet());
									}
								}
							},3000);
						}
						else if(cardname=='du'){
							window.shuohua_malewords=['这毒味道不错，就是有点上头……'];
							window.shuohua_femalewords=['这毒味道不错，就是有点上头……'];
							if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
							else player.shuohua_sendEmoji(['happy','fear','sad','interesting','boring','boring2'].randomGet());
							setTimeout(function(){
								window.shuohua_malewords=['本人在此严正声明，我与赌毒不共戴天！'];
								window.shuohua_femalewords=['本人在此严正声明，我与赌毒不共戴天！'];
								var other=game.players.randomGets(get.rand(1,2));
								if(other.length>0) for(var oth of other){
									if(oth!=player){
										if(Math.random()<emojiRand) oth.sayChat(window['shuohua_'+(['male','female'].indexOf(oth.sex)==-1?'male':oth.sex)+'words'].randomGet());
										else oth.shuohua_sendEmoji(['boring2'].randomGet());
									}
								}
							},3000);
						}
					}
					if(type=='trick'&&cardname!=undefined){
						if(cardname=='wuxie'){
							window.shuohua_malewords=['看招，无shit可击！','吃我一shit！'];
							window.shuohua_femalewords=['看招，无shit可击！'];
							if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
							else player.shuohua_sendEmoji(['happy','boring2'].randomGet());
						}
						setTimeout(function(){
							window.shuohua_malewords=['你是智多星吗，这么多锦囊？！','好哥哥，分点锦囊','军师可有妙计？'];
							window.shuohua_femalewords=['你是智多星吗，这么多锦囊？！','好哥哥，分点锦囊','军师可有妙计？'];
							var other=game.players.randomGets(get.rand(1,2));
							if(other.length>0) for(var oth of other){
								if(oth!=player){
									if(Math.random()<emojiRand) oth.sayChat(window['shuohua_'+(['male','female'].indexOf(oth.sex)==-1?'male':oth.sex)+'words'].randomGet());
									else oth.shuohua_sendEmoji(['fear','interesting','boring2'].randomGet());
								}
							}
						},1500);
					}
					if(type=='delay'&&cardname!=undefined){
						if(cardname=='lebu'){
							setTimeout(function(){
								window.shuohua_malewords=['乐不思蜀，真快乐！','双手离开键盘','看来下回不用出牌了，兄弟们我先去上个撤硕嗷~'];
								window.shuohua_femalewords=['乐不思蜀，真快乐！'];
								var other=game.players.randomGets(get.rand(1,2));
								if(other.length>0) for(var oth of other){
									if(oth!=player){
										if(Math.random()<emojiRand) oth.sayChat(window['shuohua_'+(['male','female'].indexOf(oth.sex)==-1?'male':oth.sex)+'words'].randomGet());
										else oth.shuohua_sendEmoji(['fear','boring2'].randomGet());
									}
								}
							},1500);
						}
						else if(cardname=='bingliang'){
							setTimeout(function(){
								window.shuohua_malewords=['你这有点过分了嗷','真可怜，药丸药丸','把你们的粮草交粗来！'];
								window.shuohua_femalewords=['你这有点过分了嗷','真可怜，药丸药丸'];
								var other=game.players.randomGets(get.rand(1,2));
								if(other.length>0) for(var oth of other){
									if(oth!=player){
										if(Math.random()<emojiRand) oth.sayChat(window['shuohua_'+(['male','female'].indexOf(oth.sex)==-1?'male':oth.sex)+'words'].randomGet());
										else oth.shuohua_sendEmoji(['fear','boring','boring2'].randomGet());
									}
								}
							},1500);
						}
						else if(cardname=='shandian'){
							window.shuohua_malewords=['雷公助我！'];
							window.shuohua_femalewords=['雷公助我！'];
							player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
							setTimeout(function(){
								window.shuohua_malewords=['司马懿，司马哥哥在哪里，快帮我改一下QAQ','张角，张角哥哥在哪里，快帮我改一下QAQ','小乔，小乔妹妹在哪里，快帮我挡一下QAQ','你别过来我害怕','这家伙又开始放电了，正当自己是充电宝不成','你别过来我害怕','没有白银，我害怕'];
								window.shuohua_femalewords=['司马懿，司马哥哥在哪里，快帮我改一下QAQ','张角，张角哥哥在哪里，快帮我改一下QAQ','小乔，小乔妹妹在哪里，快帮我挡一下QAQ','你别过来我害怕','这家伙又开始放电了，正当自己是充电宝不成','你别过来我害怕','没有白银，我害怕'];
								var other=game.players.randomGets(get.rand(1,3));
								if(other.length>0) for(var oth of other){
									if(oth!=player){
										if(Math.random()<emojiRand) oth.sayChat(window['shuohua_'+(['male','female'].indexOf(oth.sex)==-1?'male':oth.sex)+'words'].randomGet());
										else oth.shuohua_sendEmoji(['fear','boring','boring2'].randomGet());
									}
								}
							},3000);
						}
					}
					window.shuohua_malewords=['牌好多，好想跟你混……','兄弟，最近手头有点紧，分我两张如何？'];
					window.shuohua_femalewords=['哥哥姐姐可以分我两张嘛QAQ','有钱人，羡慕'];
					var other=game.players.randomGets(get.rand(1,2));
					if(other.length>0) for(var oth of other){
						if(oth!=player){
							if(Math.random()<emojiRand) oth.sayChat(window['shuohua_'+(['male','female'].indexOf(oth.sex)==-1?'male':oth.sex)+'words'].randomGet());
							else oth.shuohua_sendEmoji(['happy','fear','boring','boring2'].randomGet());
						}
					}
					if(type=='equip'&&cardname!=undefined){
						setTimeout(function(){
							window.shuohua_malewords=['宁就是军火商？！','好哥哥，分点装备'];
							window.shuohua_femalewords=['羡慕','好哥哥，分点装备'];
							var other=game.players.randomGets(get.rand(1,2));
							if(other.length>0) for(var oth of other){
								if(oth!=player){
									if(Math.random()<emojiRand) oth.sayChat(window['shuohua_'+(['male','female'].indexOf(oth.sex)==-1?'male':oth.sex)+'words'].randomGet());
									else oth.shuohua_sendEmoji(['fear','boring','boring2'].randomGet());
								}
							}
						},1000);
						if(cardname=='zhuge'){
							setTimeout(function(){
								window.shuohua_malewords=['出现了，国产之光——加特林！','害怕'];
								window.shuohua_femalewords=['出现了，国产之光——加特林！','害怕'];
								var other=game.players.randomGets(get.rand(1,2));
								if(other.length>0) for(var oth of other){
									if(oth!=player){
										if(Math.random()<emojiRand) oth.sayChat(window['shuohua_'+(['male','female'].indexOf(oth.sex)==-1?'male':oth.sex)+'words'].randomGet());
										else oth.shuohua_sendEmoji(['fear','boring','boring2'].randomGet());
									}
								}
							},1000);
							setTimeout(function(){
								window.shuohua_malewords=['老哥，枪端稳点，别误伤友军'];
								window.shuohua_femalewords=['老哥，枪端稳点，别误伤友军'];
								var friends=[];
								for(var pl of player.getFriends()) if(player.node.identity&&player.node.identity.firstChild&&player.node.identity.firstChild.innerHTML.indexOf('猜')==-1&&player.node.identity&&player.node.identity.dataset&&player.node.identity.dataset.color&&get.translation(player.node.identity.dataset.color)&&get.translation(player.node.identity.dataset.color).indexOf('猜')==-1) friends.push(pl);
								if(friends.length>0) var pl=friends.randomGet();
								if(pl){
									if(Math.random()<emojiRand) pl.sayChat(window['shuohua_'+(['male','female'].indexOf(pl.sex)==-1?'male':pl.sex)+'words'].randomGet());
									else pl.shuohua_sendEmoji(['happy','fear','boring2'].randomGet());
								}
							},5000);
							setTimeout(function(){
								window.shuohua_malewords=['[不过如此.jpg]','就这？就这？','灵魂拷问，你有杀吗，你能杀到我吗？'];
								window.shuohua_femalewords=['[不过如此.jpg]','就这？就这？','灵魂拷问，你有杀吗，你能杀到我吗？'];
								var enemies=[];
								for(var pl of player.getEnemies()) if(player.node.identity&&player.node.identity.firstChild&&player.node.identity.firstChild.innerHTML.indexOf('猜')==-1&&player.node.identity&&player.node.identity.dataset&&player.node.identity.dataset.color&&get.translation(player.node.identity.dataset.color)&&get.translation(player.node.identity.dataset.color).indexOf('猜')==-1) enemies.push(pl);
								if(enemies.length>0) var pl=enemies.randomGet();
								if(pl){
									if(Math.random()<emojiRand) pl.sayChat(window['shuohua_'+(['male','female'].indexOf(pl.sex)==-1?'male':pl.sex)+'words'].randomGet());
									else pl.shuohua_sendEmoji(['angry','sad','fear','boring','boring2'].randomGet());
								}
							},5000);
						}
						if(cardname=='bagua'){
							window.shuohua_malewords=['看我徒手挡加特林！','我王境泽今天就算被打死，从这里跳下去，也不会用这游戏一张闪'];
							window.shuohua_femalewords=['看我徒手挡加特林！','我王境泽今天就算被打死，从这里跳下去，也不会用这游戏一张闪'];
							if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
							else player.shuohua_sendEmoji(['happy','boring','boring2'].randomGet());
							setTimeout(function(){
								window.shuohua_malewords=['出现了，国产八卦！','好哥哥，分个八卦'];
								window.shuohua_femalewords=['出现了，国产八卦！','好哥哥，分个八卦'];
								var other=game.players.randomGets(get.rand(1,2));
								if(other.length>0) for(var oth of other){
									if(oth!=player){
										if(Math.random()<emojiRand) oth.sayChat(window['shuohua_'+(['male','female'].indexOf(oth.sex)==-1?'male':oth.sex)+'words'].randomGet());
										else oth.shuohua_sendEmoji(['happy','fear','boring','boring2'].randomGet());
									}
								}
							},1000);
							setTimeout(function(){
								window.shuohua_malewords=['手气不错，再接再厉'];
								window.shuohua_femalewords=['手气不错，再接再厉'];
								var friends=[];
								for(var pl of player.getFriends()) if(player.node.identity&&player.node.identity.firstChild&&player.node.identity.firstChild.innerHTML.indexOf('猜')==-1&&player.node.identity&&player.node.identity.dataset&&player.node.identity.dataset.color&&get.translation(player.node.identity.dataset.color)&&get.translation(player.node.identity.dataset.color).indexOf('猜')==-1) friends.push(pl);
								if(friends.length>0) var pl=friends.randomGet();
								if(pl){
									if(Math.random()<emojiRand) pl.sayChat(window['shuohua_'+(['male','female'].indexOf(pl.sex)==-1?'male':pl.sex)+'words'].randomGet());
									else pl.shuohua_sendEmoji(['happy','interesting','boring2'].randomGet());
								}
							},5000);
							setTimeout(function(){
								window.shuohua_malewords=['不行，得想办法给他来一刀'];
								window.shuohua_femalewords=['不行，得想办法给他来一刀'];
								var enemies=[];
								for(var pl of player.getEnemies()) if(player.node.identity&&player.node.identity.firstChild&&player.node.identity.firstChild.innerHTML.indexOf('猜')==-1&&player.node.identity&&player.node.identity.dataset&&player.node.identity.dataset.color&&get.translation(player.node.identity.dataset.color)&&get.translation(player.node.identity.dataset.color).indexOf('猜')==-1) enemies.push(pl);
								if(enemies.length>0) var pl=enemies.randomGet();
								if(pl){
									if(Math.random()<emojiRand) pl.sayChat(window['shuohua_'+(['male','female'].indexOf(pl.sex)==-1?'male':pl.sex)+'words'].randomGet());
									else pl.shuohua_sendEmoji(['angry','sad','fear','boring','boring2'].randomGet());
								}
							},5000);
						}
					}
				}
				else if(trigger.name=='useCardTo'){
					window.shuohua_malewords=['友军，别开枪，自己人！','干嘛打我，咱不是说好了相守一辈子的好兄弟嘛？！'];
					window.shuohua_femalewords=['友军，别开枪，自己人！','那天在床上的时候，你可不是这样对我的哦！'];
					if(Math.random()<emojiRand) trigger.target.say(window['shuohua_'+(['male','female'].indexOf(trigger.target.sex)==-1?'male':trigger.target.sex)+'words'].randomGet());
					else trigger.target.shuohua_sendEmoji(['fear','boring2'].randomGet());
				}
				else if(trigger.name=='die'||trigger.name=='dying'){
					window.shuohua_malewords=['都是队友太菜，不然我怎会沦落至此','害，破游戏，不玩也罢','垃圾游戏，毁我青春，卸了卸了','都是大佬，溜了溜了','好队友，快救我！喂你到底有没有桃啊，菜鸡！'];
					window.shuohua_femalewords=['呜呜，你们一点也不怜香惜玉，下次不找你们玩了！','刚睡醒……啊！呜，我怎么要没了！','一切如泡沫般虚幻'];
					if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
					else player.shuohua_sendEmoji(['angry','sad','fear','boring2'].randomGet());
				}
				else if(trigger.name=='damage'){
					window.shuohua_malewords=['杰哥……杰哥不要！','杰哥饶了我吧，害怕~'];
					window.shuohua_femalewords=['呜呜，好痛哦，一点也不怜香惜玉！','姐妹们，就是这个坏淫，大家一起揍他！'];
					if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
					else player.shuohua_sendEmoji(['angry','sad','fear','boring2'].randomGet());
				}
				else if(trigger.name=='loseMaxHp'){
					window.shuohua_malewords=['诶？我……我血槽呢？'];
					window.shuohua_femalewords=['成功减肥，呜呜呜，感动。'];
					if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
					else player.shuohua_sendEmoji(['angry','sad','fear','boring2'].randomGet());
				}
				else if(trigger.name=='loseHp'){
					window.shuohua_malewords=['有毒，有毒啊！','刚吃了一口饭，好像有毒，但愿我没事。'];
					window.shuohua_femalewords=['别毒我，我害怕。'];
					if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
					else player.shuohua_sendEmoji(['angry','sad','fear','boring2'].randomGet());
				}
				//else if(trigger.name=='lose'&&_status.event.getParent().name!='phaseDiscard'&&_status.event.getParent().getParent().name!='phaseDiscard'&&_status.event.getParent().name!='phaseUse'&&_status.event.getParent().getParent().name!='phaseUse'){
				//这里修了一下，不知道作用大不大
				else if(trigger.name=='lose'&&trigger.type=='discard'&&trigger.getl(player)?.cards2.length>0&&trigger.getParent()?.notBySelf){
					window.shuohua_malewords=['可恶！又拆我牌！','宁是拆迁队队长吗？','旧的不去，新的不来','风吹鸡蛋壳，牌去人安乐'];
					window.shuohua_femalewords=['可恶！又拆我牌！','宁是拆迁队队长吗？','旧的不去，新的不来','风吹鸡蛋壳，牌去人安乐'];
					if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
					else player.shuohua_sendEmoji(['angry','sad','fear','boring2'].randomGet());
					var card=undefined;
					if(trigger.cards&&trigger.cards[0]) card=trigger.cards[0];
					else if(trigger.card) card=trigger.card;
					var value=0;
					if(card) value=Math.max(get.value(card),get.equipValue(card));
					var cardname=undefined;
					if(trigger.cards&&trigger.cards[0]) cardname=trigger.cards[0].name;
					else if(trigger.card) cardname=trigger.card.name;
					if(cardname){
						window.shuohua_malewords=['啊！我的'+get.translation(cardname).slice(0,2)+'！'+(value>=8?'我跟你拼了！':'')];
						window.shuohua_femalewords=['啊！我的'+get.translation(cardname).slice(0,2)+'！'+(value>=8?'我跟你拼了！':'')];
						if(Math.random()<0.35){
							if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
							else player.shuohua_sendEmoji(['angry','sad','fear','boring2'].randomGet());
						}
					}
				}
				else if(trigger.name=='gainMaxHp'){
					window.shuohua_malewords=['是要把我变成坦克吗？','请务必加大力度！'];
					window.shuohua_femalewords=['诶我是不是又胖了？','讨厌，人家要减肥啦！'];
					if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
					else player.shuohua_sendEmoji(['happy','interesting','boring','boring2'].randomGet());
				}
				else if(trigger.name=='gain'){
					window.shuohua_malewords=['奇怪的牌牌增加了！','都看我干嘛？数一数……嗯……没摸多吧？','我又有牌了，又可以浪了，太好了！','来让我摸摸……嗯真舒服'];
					window.shuohua_femalewords=['奇怪的牌牌增加了！','都看我干嘛？数一数……嗯……没摸多吧？','我又有牌了，又可以浪了，太好了！','来让我摸摸……嗯真舒服'];
					if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
					else player.shuohua_sendEmoji(['happy','interesting','boring','boring2'].randomGet());
					setTimeout(function(){
						window.shuohua_malewords=['好哥哥，分点牌','看你们拿牌真是比我自己丢牌还难受'];
						window.shuohua_femalewords=['好哥哥，分点牌','看你们拿牌真是比我自己丢牌还难受'];
						var other=game.players.randomGets(get.rand(1,2));
						if(other.length>0) for(var oth of other){
							if(oth!=player){
								if(Math.random()<emojiRand) oth.sayChat(window['shuohua_'+(['male','female'].indexOf(oth.sex)==-1?'male':oth.sex)+'words'].randomGet());
								else oth.shuohua_sendEmoji(['boring','boring2'].randomGet());
							}
						}
					},3000);
					var cardname=undefined;
					if(trigger.cards&&trigger.cards[0]) cardname=trigger.cards[0].name;
					else if(trigger.card) cardname=trigger.card.name;
					if(cardname){
						setTimeout(function(){
							window.shuohua_malewords=[get.translation(cardname).slice(0,2)+'，拿来吧你'];
							window.shuohua_femalewords=[get.translation(cardname).slice(0,2)+'，拿来吧你'];
							if(Math.random()<0.35){
								if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
								else player.shuohua_sendEmoji(['happy','interesting','boring2'].randomGet());
							}
						},2000);
					}
				}
				else if(trigger.name=='shaMiss'){
					window.shuohua_malewords=['诶嘿嘿……打不着打不着，气不气呀气不气？','宁就是人体描边大师？','想打我？呵，下次装个72倍镜再来吧','大哥，你这都打不着，近视得有3600度了吧','打不到我吧！啦啦啦啦~啦啦啦啦~'];
					window.shuohua_femalewords=['诶嘿嘿……打不着打不着，气不气呀气不气？','宁就是人体描边大师？','想打我？呵，下次装个72倍镜再来吧','大哥，你这都打不着，近视得有3600度了吧','打不到我吧！啦啦啦啦~啦啦啦啦~'];
					if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
					else player.shuohua_sendEmoji(['happy','fear','boring','boring2'].randomGet());
					setTimeout(function(){
						window.shuohua_malewords=['这小子这么欠，待会一人给他一刀，许多不许少！'];
						window.shuohua_femalewords=['这小子这么欠，待会一人给他一刀，许多不许少！'];
						var other=game.players.randomGets(get.rand(1,2));
						if(other.length>0) for(var oth of other){
							if(oth!=player){
								if(Math.random()<emojiRand) oth.sayChat(window['shuohua_'+(['male','female'].indexOf(oth.sex)==-1?'male':oth.sex)+'words'].randomGet());
								else oth.shuohua_sendEmoji(['angry','boring','boring2'].randomGet());
							}
						}
					},3000);
				}
				else if(trigger.name=='sha'){
					window.shuohua_malewords=['诶嘿嘿……乖~听话~让杰哥康康~','阿伟~阿伟~杰哥来啦！别害羞嘛！'];
					window.shuohua_femalewords=['不要小康女孩纸，小心我拿小刀刀捅你哦！','这一刀下去你可能会变得撒敷敷！'];
					if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
					else player.shuohua_sendEmoji(['happy','interesting','boring','boring2'].randomGet());
					setTimeout(function(){
						window.shuohua_malewords=['杰哥~杰哥不要！','是杰哥！awsl！','出现了！杰哥！'];
						window.shuohua_femalewords=['噫，辣眼睛！','祝你们百年好合！'];
						var other=game.players.randomGets(get.rand(1,2));
						if(other.length>0) for(var oth of other){
							if(oth!=player){
								if(Math.random()<emojiRand) oth.sayChat(window['shuohua_'+(['male','female'].indexOf(oth.sex)==-1?'male':oth.sex)+'words'].randomGet());
								else oth.shuohua_sendEmoji(['fear','boring','boring2'].randomGet());
							}
						}
					},3000);
				}
				else if(trigger.name=='recover'){
					window.shuohua_malewords=['嗯，这桃子味道不错，老板，再来一个！','干饭人干饭魂，干饭都是人上人','这桃子味道不行啊，打七折卖给我，怎么样？','吾夜观天象，抱歉各位，实在是命不该绝','我王境泽今天就算是饿死，从这里跳下去，也不会吃这破游戏一颗桃……啊真香，狗命要紧','大家苟住，坚持就是胜利！','吾日三吃吾桃……呸，吾日三省吾身！','开饭了开饭了！'];
					window.shuohua_femalewords=['酸甜可口，软硬适中','味道不错，老板，再来一个！','神清气爽','这桃，我先恰为敬','大家苟住，坚持就是胜利！','开饭了开饭了！'];
					if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
					else player.shuohua_sendEmoji(['happy','interesting','boring','boring2'].randomGet());
					setTimeout(function(){
						window.shuohua_malewords=['您就是周泰转世吗，这么能苟？！','确认过眼神，是周泰他本人！','您桃子真多诶，能不能分我一个？','桃子批发商？','好饿……队友呢？快也给我一个让我尝尝！','看你们回血真是比我自己掉血还难受'];
						window.shuohua_femalewords=['您就是周泰转世吗，这么能苟？！','确认过眼神，是周泰他本人！','您桃子真多诶，能不能分我一个？','桃子批发商？','好饿……队友呢？快也给我一个让我尝尝！','看你们回血真是比我自己掉血还难受'];
						var other=game.players.randomGets(get.rand(1,2));
						if(other.length>0) for(var oth of other){
							if(oth!=player){
								if(Math.random()<emojiRand) oth.sayChat(window['shuohua_'+(['male','female'].indexOf(oth.sex)==-1?'male':oth.sex)+'words'].randomGet());
								else oth.shuohua_sendEmoji(['angry','fear','sad','boring','boring2'].randomGet());
							}
						}
					},3000);
					setTimeout(function(){
						window.shuohua_malewords=['哼哼，你怕是不知道，我们的队友可是人称小周泰！'];
						window.shuohua_femalewords=['哼哼，你怕是不知道，我们的队友可是人称小周泰！'];
						var friends=[];
						for(var pl of player.getFriends()) if(player.node.identity&&player.node.identity.firstChild&&player.node.identity.firstChild.innerHTML.indexOf('猜')==-1&&player.node.identity&&player.node.identity.dataset&&player.node.identity.dataset.color&&get.translation(player.node.identity.dataset.color)&&get.translation(player.node.identity.dataset.color).indexOf('猜')==-1) friends.push(pl);
						if(friends.length>0) var pl=friends.randomGet();
						if(pl){
							if(Math.random()<emojiRand) pl.sayChat(window['shuohua_'+(['male','female'].indexOf(pl.sex)==-1?'male':pl.sex)+'words'].randomGet());
							else pl.shuohua_sendEmoji(['happy','interesting','boring','boring2'].randomGet());
						}
					},5000);
					setTimeout(function(){
						window.shuohua_malewords=['[不过如此.jpg]','[柠檬.jpg]','回的好，下次不许回血了'];
						window.shuohua_femalewords=['[不过如此.jpg]','[柠檬.jpg]','回的好，下次不许回血了'];
						var enemies=[];
						for(var pl of player.getEnemies()) if(player.node.identity&&player.node.identity.firstChild&&player.node.identity.firstChild.innerHTML.indexOf('猜')==-1&&player.node.identity&&player.node.identity.dataset&&player.node.identity.dataset.color&&get.translation(player.node.identity.dataset.color)&&get.translation(player.node.identity.dataset.color).indexOf('猜')==-1) enemies.push(pl);
						if(enemies.length>0) var pl=enemies.randomGet();
						if(pl){
							if(Math.random()<emojiRand) pl.sayChat(window['shuohua_'+(['male','female'].indexOf(pl.sex)==-1?'male':pl.sex)+'words'].randomGet());
							else pl.shuohua_sendEmoji(['angry','sad','fear','boring','boring2'].randomGet());
						}
					},5000);
				}
				else if(trigger.name=='phase'){
					if(Math.random()<0.3*(player.maxHp-player.hp)){
						window.shuohua_malewords=['救命！！！<br>(oT-T)尸','大家下手轻点好嘛，球球惹<br>(oT-T)尸','大佬们，饶了我吧<br>(oT-T)尸','药丸药丸','终于轮到我表演了！'];
						window.shuohua_femalewords=['大家下手轻点好嘛，么么哒~<br>(oT-T)尸','我一个弱女子，你们竟忍心这样对我！<br>(oT-T)尸','呜呜，你们都这么凶，伦家下次不和你们玩了！<br>(oT-T)尸','终于轮到我表演了！'];
						if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
						else player.shuohua_sendEmoji(['happy','interesting','boring','boring2'].randomGet());
						var canRecover=false;
						for(var card of player.getCards('h')) if(get.tag(card,'recover')) canRecover=true;
						if(!canRecover){
							setTimeout(function(){
								window.shuohua_malewords=['咦，我桃呢？','我手气咋可能这么烂，肯定是哪个杀千刀的偷了我桃，快给我还回来！','你们等着，我若不死，必要让你们血债血偿！','老子今天就不信了还吃不到一个破桃子！'];
								window.shuohua_femalewords=['有没有哪位大人愿意赏给奴家小桃桃呢？桃园也行啊……','别打我，求你们了~','老娘今天就不信了还吃不到一个破桃子！'];
								if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
								else player.shuohua_sendEmoji(['angry','sad','boring','boring2'].randomGet());
							},3000);
						}
						else{
							setTimeout(function(){
								window.shuohua_malewords=['小桃桃，mua，亲亲<br>⁄(⁄⁄•⁄ω⁄•⁄⁄)⁄','叮，让我奶一口先<br>(*/ω＼*)','剑来？血来！','吾有一桃，今不愿共享之'];
								window.shuohua_femalewords=['小桃桃，mua，亲亲<br> ⁄(⁄⁄•⁄ω⁄•⁄⁄)⁄','叮，让我奶一口先<br>(*/ω＼*)'];
								if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
								else player.shuohua_sendEmoji(['happy','interesting','boring2'].randomGet());
							},3000);
						}
						setTimeout(function(){
							window.shuohua_malewords=['观众已准备就绪，请开始你的表演'];
							window.shuohua_femalewords=['观众已准备就绪，请开始你的表演'];
							var other=game.players.randomGets(get.rand(1,2));
							if(other.length>0) for(var oth of other){
								if(oth!=player){
									if(Math.random()<emojiRand) oth.sayChat(window['shuohua_'+(['male','female'].indexOf(oth.sex)==-1?'male':oth.sex)+'words'].randomGet());
									else oth.shuohua_sendEmoji(['fear','boring','boring2'].randomGet());
								}
							}
						},3000);
					}
					if(Math.random()<0.3*(player.maxHp-player.countCards('h'))){
						window.shuohua_malewords=['没牌了要','你们别这样，和气才能生财嘛','手中无牌，万事皆休','大佬们，手下留情呀！','药丸药丸','这把要输（嗯要不要先溜了呢……）','你们是拆迁队的吗？'];
						window.shuohua_femalewords=['我也要牌牌','我几是一介弱女子~','大佬们，手下留情呀！呜呜呜','害怕','你们是拆迁队的吗？'];
						if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
						else player.shuohua_sendEmoji(['fear','sad','boring','boring2'].randomGet());
						setTimeout(function(){
							window.shuohua_malewords=['将军走此小道'];
							window.shuohua_femalewords=['将军走此小道'];
							var other=game.players.randomGets(get.rand(1,2));
							if(other.length>0) for(var oth of other){
								if(oth!=player){
									if(Math.random()<emojiRand) oth.sayChat(window['shuohua_'+(['male','female'].indexOf(oth.sex)==-1?'male':oth.sex)+'words'].randomGet());
									else oth.shuohua_sendEmoji(['happy','boring','boring2'].randomGet());
								}
							}
						},3000);
					}
					else{
						window.shuohua_malewords=['呼呼，还有牌','且待我东山再起','吾夜观天象，抱歉各位，实在是命不该绝','是时候展现真正的技术了！'];
						window.shuohua_femalewords=['呼呼，还有牌','本菜鸡还活着？太好了！','待会看老娘打爆你们！'];
						if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
						else player.shuohua_sendEmoji(['happy','interesting','boring','boring2'].randomGet());
					}
				}
				else{
					for(var pl of game.players) if(pl.shuohua_sendEmoji==undefined) pl.shuohua_sendEmoji=game.shuohua_sendEmoji;
					window.shuohua_malewords=['这把好好玩','谁坑谁孙子','菜鸡队友们，不许坑我！','你哪把好好玩了？','兄弟们，认真点行不行？','淦就完事了','千山万水总是情，认真一点行不行？','什么队友，都让开，你们会妨碍我1vN的！','一手烂牌，属实背运'];
					window.shuohua_femalewords=['这把我要认真了！','姐妹们，冲鸭！','千山万水总是情，认真一点行不行？','好戏开场了！','静看大佬们表演，嘤嘤嘤'];
					if(Math.random()<emojiRand) player.sayChat(window['shuohua_'+(['male','female'].indexOf(player.sex)==-1?'male':player.sex)+'words'].randomGet());
					else player.shuohua_sendEmoji(['happy','interesting','fear','boring','boring2'].randomGet());
				}
			},
		};
	}
	game.updateEmojiNum=function(){
		window.emoji_num=50+lib.config.shuohua_myEmojiAddNum;
	}
	        if (!lib.config.shoushaCharacterLightSort || lib.config.ext_jiangdeng_version != window.liulikillVersion) {
                game.saveConfig('ext_jiangdeng_version', window.liulikillVersion);
                try {
                    // 1. 检查基础数据是否存在
                    if (!lib?.characterSort) {
                        console.warn('lib.characterSort is not defined, using empty structure');
                        lib = { characterSort: {} };
                    }
                    
                    const list = lib.characterSort;
                    
                    // 2. 安全获取数组的函数，避免undefined导致的错误
                    const safeGetArray = (category, subCategory) => {
                        try {
                            return list[category]?.[subCategory] || [];
                        } catch (error) {
                            console.warn(`Failed to get array for ${category}.${subCategory}:`, error);
                            return [];
                        }
                    };
                    
                    // 3. 定义lightSort对象，使用安全获取方式
                    const lightSort = {
                        sb: [
                            ...safeGetArray('sb', 'sb_zhi'),
                            ...safeGetArray('sb', 'sb_shi'),
                            ...safeGetArray('sb', 'sb_tong'),
                            ...safeGetArray('sb', 'sb_yu'),
                            ...safeGetArray('sb', 'sb_neng')
                        ],
                        
                        shiji: [
                            ...safeGetArray('shiji', 'mobile_shijizhi'),
                            ...safeGetArray('shiji', 'mobile_shijixin'),
                            ...safeGetArray('shiji', 'mobile_shijiren'),
                            ...safeGetArray('shiji', 'mobile_shijiyong'),
                            ...safeGetArray('shiji', 'mobile_shijiyan')
                        ],
                        
                        refresh: [
                            ...safeGetArray('refresh', 'refresh_standard'),
                            ...safeGetArray('refresh', 'refresh_feng'),
                            ...safeGetArray('refresh', 'refresh_huo'),
                            ...safeGetArray('refresh', 'refresh_lin'),
                            ...safeGetArray('refresh', 'refresh_shan'),
                            ...safeGetArray('mobile', 'mobile_yijiang1'),
                            ...safeGetArray('mobile', 'mobile_yijiang2'),
                            ...safeGetArray('mobile', 'mobile_yijiang3'),
                            ...safeGetArray('mobile', 'mobile_yijiang4'),
                            ...safeGetArray('mobile', 'mobile_yijiang5'),
                            ...safeGetArray('mobile', 'mobile_yijiang67')
                        ],
                        
                        yijiang: [
                            ...safeGetArray('yijiang', 'yijiang_2011'),
                            ...safeGetArray('yijiang', 'yijiang_2012'),
                            ...safeGetArray('yijiang', 'yijiang_2013'),
                            ...safeGetArray('yijiang', 'yijiang_2014'),
                            ...safeGetArray('yijiang', 'yijiang_2015')
                        ],
                        
                        luanshi: [
                            ...safeGetArray('yijiang', 'yijiang_2016'),
                            ...safeGetArray('yijiang', 'yijiang_2017')
                        ],
                        
                        // 4. 硬编码的SP数组保持不变，但可以添加去重逻辑
                        SP: Array.from(new Set([
                            'zhugedan', 'maliang', 'panfeng', 'dingfeng', 'zhugejin', 'caoang', 
                            'xiahouba', 'jsp_guanyu', 'sp_sunshangxiang', 'fuwan', 'sp_jiangwei', 
                            'hetaihou', 'wenpin', 'sunluyu', 'zumao', 'sp_jiaxu', 'yuejin', 
                            'zhangbao', 'zhugeke', 'sp_machao', 'simalang', 'tw_daxiaoqiao', 
                            'guanyinping', 'caohong', 'sp_caiwenji', 'sp_caoren', 'sp_diaochan', 
                            'sp_zhaoyun', 'sp_pangde', 'liuxie', 'heqi', 'mizhu', 'litong', 
                            'jsp_huangyueying', 'yanbaihu', 'tadun', 'zhanglu', 're_lidian', 
                            're_xushu', 'chengyu', 'sp_liuqi', 'mayunlu', 're_jsp_pangtong', 
                            'lvqian', 'panjun', 'sunqian', 'mazhong', 'dongbai', 'buzhi', 
                            'zhangxingcai', 'dongcheng', 're_weiwenzhugezhi', 'zhoufang', 
                            'fanchou', 'dongyun', 'xizhicai', 'quyi', 'zhaoxiang', 'sp_taishici', 
                            'yangxiu', 'taoqian', 'yangyi', 'liuyao', 'lvdai', 'duji', 'lijue', 
                            'ol_guansuo', 'shixie', 'sunhao', 'chenlin', 'simahui', 'lvkai', 
                            'shenpei', 'beimihu', 'zhangji', 're_zhangliang', 'luzhi', 'liuyan', 
                            're_wangyun', 'kanze', 'sp_sufei', 'jiakui', 're_zhangong', 
                            're_xugong', 'shamoke', 'caoying', 're_baosanniang', 'yanjun', 
                            'xurong', 'guosi', 'dingyuan', 'furong', 'dengzhi', 'chendeng', 
                            'zhangyì', 'zhangqiying', 'old_wanglang', 'hucheer', 'gongsunkang', 
                            'zhouqun', 'lingju', 'wutugu', 'yanpu', 'mayuanyi', 'qiaozhou', 
                            'sp_maojie', 'fuqian', 'ruanhui', 'xin_mamidi', 'wangjun', 
                            'zhaotongzhaoguang', 'liuye', 'zhuling', 'lifeng', 'zhugeguo', 
                            'hujinding', 'wangyuanji', 'yanghuiyu', 'yangbiao', 'simazhao', 
                            'sp_caosong', 'peixiu', 'yangfu', 'sp_pengyang', 'tw_puyangxing', 
                            'qianzhao', 'mb_guozhao', 'xin_hansui', 'tw_yanxiang', 'mb_liwei', 
                            'wuban', 'tw_baoxin', 'mb_huban', 'mb_chengui', 'mb_huojun',  
                            'mb_muludawang', 'sp_jianggan', 'mb_yangfeng', 'sp_sunce', 
                            'mb_laimin', 'th_zhouqun'
                        ])),
                        
                        dragon: [
                            'mb_caomao', 'mb_epic_caomao', 'lizhaojiaobo', 'chengji', 'mb_sp_guanqiujian', 
                            'mb_simafu', 'mb_wangjing', 'mb_simazhou', 'mb_wenqin', 'mb_jiachong'
                        ],
                        
                        shen: [
                            ...safeGetArray('extra', 'extra_feng'),
                            ...safeGetArray('extra', 'extra_huo'),
                            ...safeGetArray('extra', 'extra_lin'),
                            ...safeGetArray('extra', 'extra_shan'),
                            ...safeGetArray('extra', 'extra_yin'),
                            'shen_ganning',
                            ...safeGetArray('extra', 'extra_decade'),
                            ...safeGetArray('extra', 'extra_mobilezhi'),
                            ...safeGetArray('extra', 'extra_mobilexin'),
                            ...safeGetArray('extra', 'extra_mobileren'),
                            'k_shenlusu',
                            'th_shen_zhouyu'
                        ],
                        
                        kun: [
                            'sunru', 'lingcao', 'liuzan', 'miheng', 'caochun', 'pangdegong', 
                            'majun', 'simashi', 'zhengxuan', 'nanhualiaoxian', 'sunhanhua', 
                            'shichangshi', 'k_shichangshi', 'th_sunhanhua', 'th_nanhualaoxian', 
                            'th_zhengxuan', 'th_majun', 'th_pangdegong', 'mb_zhangfen'
                        ],
                        
                        jiangxing: [
                            ...safeGetArray('mobile', 'mobile_yijiang'),
                            'yj_dongzhuo'
                        ],
                        
                        jiangshan: [
                            ...safeGetArray('jsrg', 'jiangshanrugu_qi'),
                            ...safeGetArray('jsrg', 'jiangshanrugu_cheng')
                        ],
                        
                        xuanjiang: ['jsrg_simazhao', 'jin_jsrg_simazhao'],
                        
                        you: [
                            //'friend_zhugeliang', 'friend_xushu', 'friend_pangtong', 'friend_cuijun', 'friend_shitao'
                            ...safeGetArray('mobile', 'mobile_laoyouji'),
                        ],
                        
                        pot: [
                            //'pot_taishici', 'pot_yuji', 'pot_weiyan'
                            ...safeGetArray('mobile', 'mobile_pot'),
                        ],
                        
                        wei: [
                            ...safeGetArray('sp2', 'sp_weizhen'),
                        ],
                        
                        wu: [
                            ...safeGetArray('xianding', 'sp2_wumiao'),
                        ],
                        
                        yue: [
                            ...safeGetArray('huicui', 'sp_zhengyin'),
                        ],
                        
                        devil: [
                            ...safeGetArray('offline', 'offline_shixin'),
                        ],
                        
                        huan: [
                            ...safeGetArray('tw', 'tw_beidingzhongyuan'),
                            ...safeGetArray('tw', 'tw_weianglongxing'),
                        ],
                        
                        liuli: [
                            ...safeGetArray('extra', 'extra_liuli'),
                        ],
                        
                        zuan: [
                            "ssr_luxun","ssr_sunquan","ssr_zhaoyun","ssr_zhugeliang","ssr_zhangliao","ssr_ganning","ssr_machao","ssr_zhouyu","ssr_liubei","ssr_dianwei","ssr_guojia","ssr_caocao","ssr_lvbu","ssr_huangzhong","ssr_xiahoudun","ssr_huatuo","ssr_yujin","ssr_zuoci","ssr_huaxiong","ssr_huanggai","ssr_diaochan","ssr_yuanshu","ssr_guanyu","ssr_lvmeng","ssr_gongsunzan","ssr_daqiao","ssr_xiaoqiao","ssr_xuzhu","ssr_zhangfei","ssr_zhenji","ssr_sunshangxiang","ssr_simayi","ssr_yiji","ssr_huangyueying","ssr_jiaxu","ssr_caiwenji","ssr_menghuo","ssr_zhurong","ssr_jiangwei","ssr_sunce","ssr_taishici","ssr_zhoutai","ssr_xiahouyuan","ssr_caoren","ssr_dengai","ssr_dongzhuo","ssr_yuji","ssr_yuanshao","ssr_xushu","ssr_fazheng","ssr_pangtong","ssr_zhanghe","ssr_re_lidian","ssr_xuhuang","ssr_sunjian","ssr_lusu","ssr_zhangzhang","ssr_zhangjiao","ssr_zhangbao","ssr_zhangliang",
                        ],
                    };
                    
                    // 5. 清理所有数组中的空值
                    Object.keys(lightSort).forEach(key => {
                        if (Array.isArray(lightSort[key])) {
                            // 移除null, undefined, 空字符串，并去重
                            lightSort[key] = Array.from(new Set(
                                lightSort[key].filter(item => item != null && item !== '')
                            ));
                        }
                    });
                    
                    // 6. 添加类型检查
                    if (!game?.saveConfig || typeof game.saveConfig !== 'function') {
                        throw new Error('game.saveConfig is not a function or game is not defined');
                    }
                    
                    // 7. 保存配置，添加错误处理
                    game.saveConfig('shoushaCharacterLightSort', lightSort);
                    
                } catch (error) {
                    console.error('Error in character sort initialization:', error);
                    // 根据实际需求决定是否抛出错误
                    // throw error;
                }
            }
            // 使用闭包创建缓存
            game.haveCharacterLight = (function() {
                // 缓存计算结果
                const cache = new Map();
                
                // 灯类型映射
                const lightMap = new Map([
                    ['谋', ['sb']],
                    ['计', ['shiji']],
                    ['界', ['refresh']],
                    ['将', ['yijiang', 'luanshi']],
                    ['SP', ['SP']],
                    ['玄', ['dragon']],
                    ['神', ['shen']],
                    ['坤', ['kun']],
                    ['星', ['jiangxing']],
                    ['江', ['jiangshan']],
                    ['玄江', ['xuanjiang']],
                    ['友', ['you']],
                    ['势', ['pot']],
                    ['威', ['wei']],
                    ['武', ['wu']],
                    ['乐', ['yue']],
                    ['魔', ['devil']],
                    ['幻', ['huan']],
                    ['璃', ['liuli']],
                    ['祖', ['zuan']],
                ]);
                
                return function(name) {
                    // 检查缓存
                    if (cache.has(name)) {
                        return cache.get(name);
                    }
                    
                    const list = lib.config.shoushaCharacterLightSort;
                    let result = false;
                    
                    // 遍历映射查找
                    for (const [light, keys] of lightMap) {
                        for (const key of keys) {
                            // 检查数组是否存在并且包含该武将
                            if (Array.isArray(list?.[key]) && list[key].includes(name)) {
                                result = light;
                                break;
                            }
                        }
                        if (result) break;
                    }
                    
                    // 存入缓存
                    cache.set(name, result);
                    return result;
                };
            })();
            /**
             * 根据武将名为玩家元素添加或移除将灯标记
             * @param {HTMLElement} player - 玩家DOM元素
             * @param {string} name - 武将名
             */
            function updateCharacterLightMarker(player, name) {
                // 检查参数有效性
                if (!player || !name || typeof name !== 'string') {
                    console.warn('Invalid parameters for updateCharacterLightMarker:', player, name);
                    return;
                }
                
                // 获取将灯类型
                const haveLight = game.haveCharacterLight(name);
                
                // 查找已存在的将灯标记（包括完整标记和半标记）
                const existingLights = player.querySelectorAll('.shoushaCharacterLight, .shoushaCharacterLightHalf');
                
                if (haveLight !== false && name != 'none') {
                    // 检查是否已有相同标记（同时检查完整标记和半标记）
                    const hasSameLight = Array.from(existingLights).some(light => {
                        // 对于img元素，检查src属性
                        if (light.tagName === 'IMG' && light.src.includes(haveLight + '.png')) {
                            return true;
                        }
                        // 对于div元素，检查backgroundImage属性
                        if (light.tagName === 'DIV' && light.style.backgroundImage.includes(haveLight + '.png')) {
                            return true;
                        }
                        return false;
                    });
                    
                    // 如果已有相同标记，则跳过创建
                    if (hasSameLight) {
                        return;
                    }
                    
                    // 移除旧的标记（如果存在）
                    existingLights.forEach(light => light.remove());
                    
                    // 创建完整的将灯标记（z-index: 69）
                    const chr_light = document.createElement('img');
                    chr_light.classList.add('shoushaCharacterLight');
                    chr_light.src = lib.assetURL + 'extension/手杀ui/image/jiangdeng/' + haveLight + '.png';
                    chr_light.alt = haveLight + '将灯';
                    
                    // 创建对角线斜切的半标记（z-index: 80）
                    const chr_half_light = document.createElement('div');
                    chr_half_light.classList.add('shoushaCharacterLightHalf');
                    // 使用与完整标记相同的图片作为背景
                    chr_half_light.style.backgroundImage = `url(${lib.assetURL}extension/手杀ui/image/jiangdeng/${haveLight}.png)`;
                    
                    // 根据龙头等级调整位置
                    if (player.longtouLevel && player.longtouLevel !== 'none') {
                        chr_light.style.bottom = '3px';
                        chr_half_light.style.bottom = '3px';
                    }
                    
                    player.appendChild(chr_light);
                    player.appendChild(chr_half_light);
                } else {
                    // 如果没有将灯，移除已存在的标记
                    existingLights.forEach(light => light.remove());
                }
            }
            
            // 如果需要在全局game对象中使用
            if (typeof game !== 'undefined') {
                game.updateCharacterLightMarker = updateCharacterLightMarker;
            }
            
            if(window.lastRunExtensions && lib.config['extension_手杀ui_jiangdeng']) {
                window.lastRunExtensions.push({
                    priority: -100,
                    content: function() {
                        if(!window.doubleKuang) return;
                        var old_doubleKuang = window.doubleKuang;
                        window.doubleKuang = function(player, remove) {
                            old_doubleKuang(player, remove);
                            var name = player.name;
                            if(player?.classList) {
                                if(player.classList.contains('fullskin2')) name = 'none';
                                if(player.name == 'shichangshi') name = 'shichangshi';
                                if(player.classList.contains('unseen')) name = 'none';
                            }
                            game.updateCharacterLightMarker(player, remove ? 'none' : name);
                        };
                    },
                });
            }
},precontent:function(){
            if(game.createCss) {
                var zIndex = 78;//69;
                var halfZIndex = 80;
                game.createCss(`
                    .shoushaCharacterLight {/*对局内的将灯*/
                      width: 20px;
                      height: 20px;
                      position: absolute;
                      right: -3px;
                      bottom: 0px;
                      background-size: contain;
                      background-repeat: no-repeat;
                      z-index: ${zIndex};
                    }
                    .shoushaCharacterLightHalf {/*对角线斜切的半标记*/
                      width: 20px;
                      height: 20px;
                      position: absolute;
                      right: -3px;
                      bottom: 0px;
                      opacity: 0.7;
                      background-size: contain;
                      background-repeat: no-repeat;
                      z-index: ${halfZIndex} !important;
                      /* 使用clip-path对角线斜切：从左上角到右下角切开，取右上部分 */
                      clip-path: polygon(100% 0, 0 0, 100% 100%);
                      /* 可选：添加轻微的光影效果增强立体感 */
                      filter: brightness(1.2) contrast(1.1);
                      /* 调整背景位置，确保显示正确的部分 */
                      background-position: center;
                      /*transform: scale(1.05);  轻微放大，确保边缘对齐 */
                      transform-origin: right bottom;
                    }
                    .shoushaChrLight {/*非对局内的将灯*/
                      width: 22px;
                      height: 22px;
                      position: absolute;
                      right: -2px;
                      bottom: -1px;
                      background-size: contain;
                      background-repeat: no-repeat;
                      z-index: ${zIndex};
                    }
                    .shoushaChrLight.bigger {/*等待选将界面的将灯*/
                      width: 32px;
                      height: 32px;
                    }
                `);
            }
			
},
config:{  
    分割线01:{
        "name":"<img style=width:240px src="+lib.assetURL+"extension/手杀ui/image/line.png>",
        "intro":"",
        "init":true,
        "clear":true,	   
    },	
    sayplay:{
		name: '表情＆说话',
		init: 'chg',
		item: {
            off: '关闭',
            old: '原版',
            chg: '新版',
              },
        intro: "搬运自 群小乔 说话扩展中，说话和发送表情的功能，内容有增删",
	},   
	charactermenu:{
		name: '武将详情',
		init: 'new',
		item: {
            none: '本体',
            old: '旧版',
            new: '新版',
        },
        intro: "武将详情页面美化，重启生效",
	},   
    xindmenu:{
		name: '菜单美化及音效',
		init: 'shousha',
		item: {
            shizhounian: '十周年',
            shousha: '手杀',
            off: '关闭',
              },
        intro: "菜单美化和音效，关闭可提升流畅度",
	},   
    xindchoose:{
		name: '选将美化',
		init: 'shousha',
		item: {
            shizhounian: '十周年',
            shousha: '手杀',
            off: '关闭',
              },
        intro: "选将框美化，提供势力框和背景框，以及单行选将。若不需要单行选将，请自行去style里注释",
	},
	xindchoose_type:{
    name: '美化版本',
    init: 'new',
    intro: "选将美化中手杀美化的旧式代码开关，因新代码使用了取巧的方式优化显示但尚不明确负面影响，因此若有显示错误问题可尝试打开此开关",
    item: {
            'old': '旧版',
            'new': '新版',
            /*'boss': '新版+挑战',*/
              },
    },
	xindsingle:{
    name: '单行选将',
    init: true,
    intro: "选将时，变为单行",
},
    xinddraw:{
		name: '手气卡美化',
		init: true,
        intro: "为手气卡刷新添加音效并修改无限次数为7次，添加进度条手牌分。",
	},
	infinitydraw:{
		name: '无限手气卡',
		init: false,
        intro: "在前一选项开启的前提下，解放无限手气卡的次数。",
	},
	分割线02:{
        "name":"<img style=width:240px src="+lib.assetURL+"extension/手杀ui/image/line.png>",
        "intro":"",
        "init":true,
        "clear":true,	   
    },
},help:{},package:{
    character:{
        character:{
        },
        translate:{
        },
    },
    card:{
        card:{
        },
        translate:{
        translate:{
        },
        },
        list:[],
    },
    skill:{
        skill:{
        },
        translate:{
        },
    },
    intro:"<b><font color=\"#FF6020\">蒸版无名补丁修改自用",
    diskURL:"",
    forumURL:"",
    version:"1.56",
},files:{"character":[],"card":[],"skill":[]}}})
