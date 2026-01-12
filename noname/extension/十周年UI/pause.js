"use strict";
decadeModule.import(function (lib, game, ui, get, ai, _status) {
	//历史记录栏美化
	ui.click.pauseClick = function (e) {
		return;
		event.stopPropagation(); // 阻止事件冒泡

		if (_status.dragged || !game.getIdentityList || _status.video || this.parentNode.forceShown) return;
		_status.clicked = true;
		var identityList;
		try {
			identityList = game.getIdentityList(this.parentNode);
		} catch (error) {}
		if (!identityList) {
			if (get.mode() == "guozhan") {
				identityList = {
					wei: "魏",
					shu: "蜀",
					wu: "吴",
					qun: "群",
					jin: "晋",
					ye: "野",
				};
				if (_status.forceKey) identityList["key"] = "键";
			}
		}
		if (!identityList) return;
		if (!this.classList.contains("guessing")) return;

		if (!window.pauseContainer) {
			window.pauseContainer = decadeUI.element.create("identity-mark-box");
			window.pauseContainer.ondeactive = function () {
				window.pauseContainer.remove();
				_status.clicked = false;
				if (!ui.arena.classList.contains("menupaused")) game.resume2();
			};
		}

		var index = 0;
		var node;
		var nodes = window.pauseContainer.childNodes;
		for (const key in identityList) {
			node = nodes[index];
			if (!node) {
				node = decadeUI.element.create("identity-mark-item", window.pauseContainer);
				node.addEventListener(lib.config.touchscreen ? "touchend" : "click", function () {
					event.stopPropagation(); // 阻止事件冒泡

					var headbg = this.parentNode.parentNode;
					var identity = headbg.querySelector(".identity");
					var seat = Number(headbg.getAttribute("data-seat-num"));
					var targets = game.players.concat(game.dead).filter(function (current) {
						return current.getSeatNum() == seat;
					});
					if (targets.length) {
						var tar = targets[0];
						for (var element of tar.childNodes) {
							if (element.classList.contains("identity")) {
								if (element.classList.contains("guessing")) {
									if (get.mode() == "guozhan") {
										// 修改player的身份
										tar.setIdentity(this.link);
										// 修改headbg的身份
										var group_dict = {
											unknown: "unknown",
											wei: "cnty0",
											shu: "cnty1",
											wu: "cnty2",
											qun: "cnty3",
											jin: "cnty4",
											ye: "cnty5",
											key: "cnty6",
										};
										var group = tar.group;
										if (group in group_dict) identity.setBackgroundImage(`extension/十周年UI/image/pause/game_hist_gz_${group_dict[group]}.png`);
										else identity.setBackgroundImage(`extension/十周年UI/image/pause/game_hist_gz_${group_dict["unknown"]}.png`);
										// 修改namebg的颜色
										var namebgs = headbg.querySelectorAll(".char>.namebg");
										if (namebgs.length) {
											for (var namebg of namebgs) {
												if (game.dead.includes(tar)) namebg.style.filter = "grayscale(0%)";
												if (tar.group == "wei") namebg.style.backgroundColor = "rgba(46, 88, 148, 0.5)";
												else if (tar.group == "shu") namebg.style.backgroundColor = "rgba(133, 1, 1, 0.5)";
												else if (tar.group == "wu") namebg.style.backgroundColor = "rgba(94, 140, 49, 0.5)";
												else if (tar.group == "shen") namebg.style.backgroundColor = "rgba(248, 213, 104, 0.5)";
												else if (tar.group == "devil") namebg.style.backgroundColor = "rgba(255, 11, 255, 0.5)";
												else if (tar.group == "jin" || tar.group == "ye" || tar.group == "western") namebg.style.backgroundColor = "rgba(147, 112, 219, 0.5)";
												else namebg.style.backgroundColor = "rgba(210, 206, 133, 0.5)";
											}
										}
									} else {
										// 修改player的身份
										tar.setIdentity(this.link);
										// 修改headbg的身份
										var style = window.getComputedStyle(element);
										var backgroundImage = style.backgroundImage;
										backgroundImage = decodeURIComponent(backgroundImage); // 将经过URL编码的字符串转换回其原始的UTF-8字符串
										var url = backgroundImage.replace(/url\(["']?(.*?)["']?\)/i, "$1");
										url = url.slice(lib.assetURL.length);
										identity.setBackgroundImage(url);
									}
								}
								break;
							}
						}
					}
					window.pauseContainer.remove();
					_status.clicked = false;
				});
			} else {
				node.style.display = "";
			}

			node.link = key;
			node.player = this.parentNode;
			node.innerText = identityList[key];
			index++;
		}

		while (index < nodes.length) {
			nodes[index].style.display = "none";
			index++;
		}

		game.pause2();
		setTimeout(
			function (player) {
				player.appendChild(window.pauseContainer);
			},
			0,
			this.parentNode
		);
	};
	lib.ui.create.pause = function () {
		if(_status.pausing) return;
		if(window.hasntResume) return;
		ui.click.shortcut(false);
		var node = ui.create.div(".pausedbg", ui.window);
		node.style.backgroundColor = "rgba(0,0,0,0.5)";
		node.style.backgroundSize = "100% 100%";
		var node_resume = ui.create.div(".resumedbg", node);
		node_resume.style.backgroundSize = "100% 100%";
		// node_resume.zIndex = '6';
		// node.style["background-image"] = ('url("' + lib.assetURL + 'extension/十周年UI/image/pause/43.png")');
		// node.style["background-position"] = '0% 0%';
		// node.style["background-repeat"] = 'no-repeat';
		// node.style["background-size"] = '100% 100%';
		// node.style["opacity"] = '1';
		_status.pausing = true;
		window.shoushaBlanksNotShow = true;
		setTimeout(function () {
			_status.pausing = false;
			window.shoushaBlanksNotShow = false;
		}, 500);
		game.realPause=true;
		if(window.shoushaBlanks&&!window.shoushaBlanksNotHide) {
    	    window.shoushaBlanks.forEach(node=>{
    	        window.shoushaBlanks_hide(0,20,node);
    	    });
	    }
		if (lib.config.touchscreen) {
			setTimeout(function () {
				node_resume.addEventListener("touchend", function () {
					node.addEventListener("touchend", ui.click.resume);
					node.addEventListener("touchend", function(){
    					if(game.realPause) return;
    					if(window.shoushaBlanks&&!window.shoushaBlanksNotShow) {
        				    window.shoushaBlanks.forEach(node=>{
        				        window.shoushaBlanks_show(0,20,node);
        				    });
    				    }
					});
				});
			}, 500);
		} else {
			node.addEventListener("click", ui.click.resume);
		}
		if (!lib.config.touchscreen) {
			node.oncontextmenu = ui.click.resume;
		}

		// var node2 = ui.create.div(node);
		// if (_status.connectMode) {
		//     node2.innerHTML = '';
		// } else {
		//     node2.innerHTML = '';
		// };

		// node2.listen(function () {
		// 	_status.clicked = true;
		// 	if (ui.sidebar.classList.contains('hidden')) {
		// 		ui.sidebar.show();
		// 		ui.sidebar3.show();
		// 	} else {
		// 		ui.sidebar.hide();
		// 		ui.sidebar3.hide();
		// 	};
		// });
		return node;
	};
	lib.ui.click.pause = function () {
		if (_status.paused2 || _status.pausing || _status.nopause || !ui.pause) return;
		if (!_status.video) {
			if (ui.pause.classList.contains("hidden")) return;
			if (!_status.gameStarted) return;
		}
		ui.system.hide();
		game.pause2();
		for (var element of ui.sidebar.children) {
			element.style.display = "block";
		}
		var node = ui.create.pause();
		if (!node) return;
		// node.addTempClass("start");
		var historybg = ui.create.div(".historybg", node);
		var columnbox = ui.create.div(".content", node);
		if (get.mode() == "guozhan") columnbox.classList.add("guozhan");
		// 获取场上所有角色
		var player_list = [];
		var click = [];
		for (var player of game.players) {
			player_list.add(player);
			if (player.getElementsByClassName("yinni").length > 0) {
				player.name = "yinni";
				lib.translate.yinni = "主将";
			}
		}
		if (game.dead.length > 0) {
			for (var player of game.dead) {
				player_list.add(player);
			}
		}
		player_list.sort(function (a, b) {
			return a.getSeatNum() - b.getSeatNum();
		});
		for (var tar of player_list) {
			var headbg = ui.create.div(".headbg", columnbox);
			if (get.mode() == "guozhan") headbg.classList.add("guozhan");
			headbg.setAttribute("data-seat-num", tar.getSeatNum());
			var char = ui.create.div(".char", headbg);
			if (get.mode() == "guozhan") {
				if (tar == game.me) char.style.backgroundImage = tar.node.avatar.style.backgroundImage;
				else char.style.backgroundImage = tar.isUnseen(0) ? "linear-gradient(0deg, #000000, #000000)" : tar.node.avatar.style.backgroundImage;
				var char_biaoji = ui.create.div(".char_biaoji", char);
				char_biaoji.innerHTML = "主";
			} else char.style.backgroundImage = tar.isUnseen(0) ? (tar.isUnseen(1) ? "linear-gradient(0deg, #000000, #000000)" : tar.node.avatar2.style.backgroundImage) : tar.node.avatar.style.backgroundImage;
			var namebg = ui.create.div(".namebg", char);
			if (game.dead.includes(tar)) char.style.filter = "grayscale(100%)";
			if (game.dead.includes(tar)) namebg.style.filter = "grayscale(0%)";
			if (tar.group == "wei") namebg.style.backgroundColor = "rgba(46, 88, 148, 0.5)";
			else if (tar.group == "shu") namebg.style.backgroundColor = "rgba(133, 1, 1, 0.5)";
			else if (tar.group == "wu") namebg.style.backgroundColor = "rgba(94, 140, 49, 0.5)";
			else if (tar.group == "shen") namebg.style.backgroundColor = "rgba(248, 213, 104, 0.5)";
			else if (tar.group == "devil") namebg.style.backgroundColor = "rgba(255, 11, 255, 0.5)";
			else if (tar.group == "jin" || tar.group == "ye" || tar.group == "western") namebg.style.backgroundColor = "rgba(147, 112, 219, 0.5)";
			else namebg.style.backgroundColor = "rgba(210, 206, 133, 0.5)";
			var name = document.createElement("span");
			name.classList.add("name");
			if (get.mode() == "guozhan") name.innerHTML = tar != game.me && tar.isUnseen(0) ? "未知将" : get.translation(tar.name1);
			else name.innerHTML = get.translation(tar.name);
			namebg.appendChild(name);
			if (get.mode() == "guozhan") {
				var gzchar = ui.create.div(".char", headbg);
				gzchar.classList.add("guozhan");
				if (tar == game.me) gzchar.style.backgroundImage = tar.node.avatar2.style.backgroundImage;
				else gzchar.style.backgroundImage = tar.isUnseen(1) ? "linear-gradient(0deg, #000000, #000000)" : tar.node.avatar2.style.backgroundImage;
				var gzchar_biaoji = ui.create.div(".char_biaoji", gzchar);
				gzchar_biaoji.innerHTML = "副";
				var gznamebg = ui.create.div(".namebg", gzchar);
				if (game.dead.includes(tar)) gzchar.style.filter = "grayscale(100%)";
				if (game.dead.includes(tar)) gznamebg.style.filter = "grayscale(0%)";
				if (tar.group == "wei") gznamebg.style.backgroundColor = "rgba(46, 88, 148, 0.5)";
				else if (tar.group == "shu") gznamebg.style.backgroundColor = "rgba(133, 1, 1, 0.5)";
				else if (tar.group == "wu") gznamebg.style.backgroundColor = "rgba(94, 140, 49, 0.5)";
				else if (tar.group == "shen") gznamebg.style.backgroundColor = "rgba(248, 213, 104, 0.5)";
				else if (tar.group == "devil") gznamebg.style.backgroundColor = "rgba(255, 11, 255, 0.5)";
				else if (tar.group == "jin" || tar.group == "ye" || tar.group == "western") gznamebg.style.backgroundColor = "rgba(147, 112, 219, 0.5)";
				else gznamebg.style.backgroundColor = "rgba(210, 206, 133, 0.5)";
				var gzname = document.createElement("span");
				gzname.classList.add("name");
				gzname.innerHTML = tar != game.me && tar.isUnseen(1) ? "未知将" : get.translation(tar.name2);
				gznamebg.appendChild(gzname);
				var seatNum = ui.create.div(".seat_num", headbg);
			}
			var headbg_selected = ui.create.div(".headbg_selected", headbg);
			if (get.mode() == "guozhan") headbg_selected.classList.add("guozhan");
			headbg_selected.addEventListener("click", function () {
				event.stopPropagation(); // 阻止事件冒泡

				var selected = this.parentNode.querySelector(".light");
				if (selected) {
					selected.classList.remove("light");
					click.remove(selected);
					event.link = this;
				}
				if (selected == this) {
					// 调整显示内容
					for (var element of ui.sidebar.children) {
						element.style.display = "block";
					}
				} else {
					if (click[0]) {
						click[0].classList.remove("light");
						click.remove(click[0]);
						event.link = null;
					}
					click.add(this);
					this.classList.add("light");
					event.link = this;
					// 调整显示内容
					var seat = Number(this.parentNode.getAttribute("data-seat-num"));
					var targets = game.players.concat(game.dead).filter(function (current) {
						return current.getSeatNum() == seat;
					});
					if (targets.length) {
						var current = targets[0];
						var names = [current.name, current.name1, current.name2];
						names = [...new Set(names)];
						names = names.map(name => get.translation(name)).filter(name => name.length > 0);
						for (var element of ui.sidebar.children) {
							var hasPlayer = false;
							var text = element.innerText || element.textContent || "";
							if (text.trim().length == 0) {
								element.style.display = "block";
								continue;
							}
							for (var name of names) {
								if (text.includes(name)) {
									hasPlayer = true;
									element.style.display = "block";
									break;
								}
							}
							if (!hasPlayer) element.style.display = "none";
						}
					}
				}
				// +++ 新增滚动条刷新逻辑 +++
                setTimeout(function() {
                    // 强制浏览器重排以获取最新尺寸
                    void ui.sidebar.offsetHeight; 
                    
                    const scrollHeight = ui.sidebar.scrollHeight;
                    const clientHeight = ui.sidebar.clientHeight;
                    const scrollbarHeight = scrollbar.clientHeight;
                    
                    // 重新计算按钮高度
                    const buttonHeight = (scrollbarHeight * clientHeight) / scrollHeight;
                    scrollbutton.style.height = `${Math.max(2, buttonHeight)}px`;
                    
                    // 强制重置滑块位置
                    scrollbutton.style.top = "0px";
                }, 10);
            
                // 重置滚动位置
                ui.sidebar.scrollTop = 0;
                ui.sidebar.dispatchEvent(new Event('scroll'));
			});
			// 获取猜测身份
			var identity = ui.create.div(".identity", headbg);
			if (get.mode() == "guozhan") identity.classList.add("guozhan");
			for (var element of tar.childNodes) {
				if (element.classList.contains("identity")) {
					if (["identity", "guozhan"].includes(get.mode())) {
						if (element.classList.contains("guessing")) identity.classList.add("guessing");
					}
					if (get.mode() == "guozhan") {
						var group_dict = {
							unknown: "unknown",
							wei: "cnty0",
							shu: "cnty1",
							wu: "cnty2",
							qun: "cnty3",
							jin: "cnty4",
							ye: "cnty5",
							key: "cnty6",
						};
						var group = tar.group;
						if (tar == game.me) {
							// 如果该玩家是玩家本人，则显示真实身份
							group = tar.trueIdentity ? tar.trueIdentity : lib.character[tar.name1][1];
						}
						if (group in group_dict) identity.setBackgroundImage(`extension/十周年UI/image/pause/game_hist_gz_${group_dict[group]}.png`);
						else identity.setBackgroundImage(`extension/十周年UI/image/pause/game_hist_gz_${group_dict["unknown"]}.png`);
					} else {
						var style = window.getComputedStyle(element);
						var backgroundImage = style.backgroundImage;
						var url = backgroundImage.replace(/url\(["']?(.*?)["']?\)/i, "$1");
						url = url.slice(lib.assetURL.length);
						identity.setBackgroundImage(url);
					}
					break;
				}
			}
			// 身份场选身份
			if (["identity", "guozhan"].includes(get.mode())) {
				identity.addEventListener(lib.config.touchscreen ? "touchend" : "click", ui.click.pauseClick);
			}
		}
		ui.sidebar3.innerHTML = "";
		if (lib.config.show_discardpile) {
			for (var i = 0; i < ui.discardPile.childNodes.length; i++) {
				var div = ui.create.div(ui.sidebar3);
				div.innerHTML = get.translation(ui.discardPile.childNodes[i]);
				ui.sidebar3.insertBefore(div, ui.sidebar3.firstChild);
			}
		}
		historybg.appendChild(ui.sidebar);
		node.appendChild(ui.sidebar3);
		ui.historybar.classList.add("paused");
		ui.arena.classList.add("paused");
		ui.window.classList.add("touchinfohidden");
		ui.time.hide();
		if (game.onpause) {
			game.onpause();
		}
		if (ui.sidebar.childNodes.length && ui.sidebar.scrollHeight > ui.sidebar.offsetHeight) {
			ui.sidebar.scrollTop = ui.sidebar.scrollHeight - ui.sidebar.clientHeight;
		}
		// 创建滚轮
		function getConfig(ext, id, def) {
			var str = ["extension", ext, id].join("_");
			var val = lib.config[str];
			return typeof val !== "undefined" || val ? val : def;
		}
		var scrollbar = ui.create.div('.scrollbar', node);
        scrollbar.style.right = getConfig("十周年UI", "pausescrollsize", 22).toFixed(1) + "%";
        var scrollbutton = ui.create.div('.scrollbutton', scrollbar);
        scrollbutton.classList.add("bottom");
        ui.sidebar.scrollTop = 0; // 设置初始位置为最顶部
        const scrollbarHeight = scrollbar.clientHeight;
        ui.sidebar.addEventListener('scroll', function() {
            const scrollHeight = ui.sidebar.scrollHeight; // 滚动框窗口总高度
            const clientHeight = ui.sidebar.clientHeight; // 滚动框展示窗口高度
            const scrollTop = ui.sidebar.scrollTop; // 从滚动框顶部开始到当前位置的长度
            // 设置按钮的大小
            const buttonHeight = (scrollbarHeight * clientHeight) / scrollHeight;
            scrollbutton.style.height = `${Math.max(2, buttonHeight).toFixed(1)}px`;
            // 设置按钮的位置
            const buttonPos = (scrollbarHeight - scrollbutton.clientHeight) * (scrollTop / (scrollHeight - clientHeight));
            scrollbutton.style.top = `${buttonPos}px`;
        });
		// 猜测身份按钮
		// if (['identity', 'guozhan'].includes(get.mode())) {
		//     var identity_btn = ui.create.div(".identity_btn", node);
		//     var identity_cai = ui.create.div(".identity_cai", identity_btn);
		//     if (get.mode() == "guozhan") identity_cai.classList.add("guozhan");
		//     identity_cai.addEventListener('click', function() {
		//         event.stopPropagation(); // 阻止事件冒泡
		//     });
		// };
	};
	game.log = function () {
		let str = "",
			str2 = "",
			logvid = null;
		const color = new Map([
			["r", "fire"],
			["y", "yellow"],
			["g", "green"],
			["b", "blue"],
		]);
		Array.from(arguments).forEach(value => {
			const itemtype = get.itemtype(value);
			if (itemtype == "player" || itemtype == "players") {
				str += `<span class="bluetext">${get.translation(value)}</span>`;
				str2 += get.translation(value);
			} else if (itemtype == "cards" || itemtype == "card" || (typeof value == "object" && value && value.name)) {
				str += `<span class="yellowtext">${get.translation(value)}</span>`;
				str2 += get.translation(value);
			} else if (typeof value == "object") {
				if (value.parentNode == ui.historybar) logvid = value.logvid;
				else {
					str += get.translation(value);
					str2 += get.translation(value);
				}
			} else if (typeof value == "string") {
				if (value[0] == "【" && value[value.length - 1] == "】") {
					str += `<span class="greentext">${get.translation(value)}</span>`;
					str2 += get.translation(value);
				} else if (value[0] == "#") {
					str += `<span class="${color.get(value[1]) || ""}text">${get.translation(value.slice(2))}</span>`;
					str2 += get.translation(value.slice(2));
				} else {
					str += get.translation(value);
					str2 += get.translation(value);
				}
			} else {
				str += value;
				str2 += value;
			}
		});
		const node = ui.create.div();
		node.innerHTML = lib.config.log_highlight ? str : str2;
		ui.sidebar.appendChild(node);
		game.addVideo("log", null, lib.config.log_highlight ? str : str2);
		game.broadcast((str, str2) => game.log(lib.config.log_highlight ? str : str2), str, str2);
		if (!_status.video && !game.online) {
			if (logvid) game.logv(logvid, `<div class="text center">${lib.config.log_highlight ? str : str2}</div>`);
			else logvid = _status.event.getLogv();
		}
		if (lib.config.show_log == "off" || game.chess) return;
		const nodeentry = node.cloneNode(true);
		ui.arenalog.insertBefore(nodeentry, ui.arenalog.firstChild);
		if (!lib.config.clear_log)
			while (ui.arenalog.childNodes.length && ui.arenalog.scrollHeight > ui.arenalog.offsetHeight) {
				ui.arenalog.lastChild.remove();
			}
		if (!lib.config.low_performance) {
			nodeentry.style.transition = "all 0s";
			nodeentry.style.marginBottom = `-${nodeentry.offsetHeight}px`;
			ui.refresh(nodeentry);
			nodeentry.style.transition = "";
			nodeentry.style.marginBottom = "";
		}
		if (!lib.config.clear_log) return;
		nodeentry.timeout = setTimeout(() => nodeentry.delete(), 1000);
		Array.from(ui.arenalog.childNodes).forEach(value => {
			if (!value.timeout) value.remove();
		});
	};
});
