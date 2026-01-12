'use strict';
window.nmimport(function(lib, game, ui, get, ai, _status){
	let checkList = {};
	ui.fixEditZoom = function(bool) {
	    window._tempZoom = bool ? 1 : undefined;
	};
	
	game.getItemLink = function(item, link) {
	    if(!link) return '空白';
	    if(item[link]) return item[link];
	    if(typeof link=='string' && link.indexOf('24st/')==0) return link.slice(5);
	    if(link == true) return '开启';
	    if(link == false) return '关闭';
	    return link;
	};
	
	const originalAdd = ui.window.classList.add.bind(ui.window.classList);
	const originalRemove = ui.window.classList.remove.bind(ui.window.classList);

    //也是神人了
    Object.defineProperty(ui.window.classList, 'add', {
      value: function(...classes) {
        if (classes.includes('systempaused')) {
          ui.fixEditZoom(true);
        }
        originalAdd(...classes);
      },
      writable: true,
      configurable: true
    });
    Object.defineProperty(ui.window.classList, 'remove', {
      value: function(...classes) {
        if (classes.includes('systempaused')) {
          ui.fixEditZoom(false);
        }
        originalRemove(...classes);
      },
      writable: true,
      configurable: true
    });
	//优化这一块
	game.isForbidedCharacter = function(name) {
	    if(typeof checkList[name]=='boolean') {
	        return checkList[name];
	    }
	    let bool = function() {
    	    if(!lib.character[name]) return false;
            if(lib.character[name][4]?.contains('unseen')) {
                return true;
            }
            return false;
        };
        return (checkList[name] = bool());
	};
	game.sortEditCharacterList = function(list) {
	    list.sort(function(as, bs) {
			let a = as[0];
			let b = bs[0];
			let aa = a,
			bb = b;
			let hA = game.isForbidedCharacter(a),
			hB = game.isForbidedCharacter(b);
			if (hA && !hB) return 1;
			if (!hA && hB) return -1;
			if (aa.lastIndexOf('_') != -1) {
				aa = aa.slice(aa.lastIndexOf('_') + 1);
			}
			if (bb.lastIndexOf('_') != -1) {
				bb = bb.slice(bb.lastIndexOf('_') + 1);
			}
			if (aa != bb) {
				return aa > bb ? 1 : -1;
			}
			return a > b ? 1 : -1;
		});
	};
	ui.create.menu = function (connectMenu) {
	    //创造的起源
		var menuTimeout = null;
		if (!connectMenu && !game.syncMenu) {
			menuTimeout = setTimeout(lib.init.reset, 1000);
		}
		var menu, menuContainer;
		var startButton;
		var popupContainer;
		var closeMenu = function() {
			if (popupContainer.noclose) {
				popupContainer.noclose = false;
				return;
			}
			popupContainer.classList.add('hidden');
			if (popupContainer.onclose) {
				popupContainer.onclose();
			}
		};
		popupContainer = ui.create.div('.popup-container.hidden', ui.window, closeMenu);
        
        var openMenu = function(node, e, onclose) {
            window.notPlayChangeSkinEffect = true;
            window.hasMenu = true;
            popupContainer.innerHTML = '';
            var clickX = e.clientX;
            var clickY = e.clientY;
            popupContainer.appendChild(node);
            
            // 更新可视化组件
            if (node.classList.contains('visual')) {
                for (var i = 0; i < node.childElementCount; i++) {
                    if (node.childNodes[i].update) {
                        node.childNodes[i].update();
                    }
                }
            }
            
            // 获取当前视口尺寸
            var winHeight = window.innerHeight;
            var winWidth = window.innerWidth;
            
            // 计算菜单自然尺寸
            var menuHeight = node.offsetHeight;
            var menuWidth = node.offsetWidth;
            
            // ===== 垂直定位优化 =====
            // 计算最大允许高度（屏幕高度 - 20px边距）
            var maxAllowedHeight = winHeight - 20;
            var useBottomPosition = false;
            
            // 检查是否需要贴底显示
            if ((clickY + menuHeight) > winHeight) {
                // 菜单高度超过屏幕可用空间时启用滚动
                if (menuHeight > maxAllowedHeight) {
                    node.style.maxHeight = maxAllowedHeight + 'px';
                    node.style.overflowY = 'auto';
                    menuHeight = Math.min(menuHeight, maxAllowedHeight); // 更新高度值
                }
                
                // 使用bottom定位（贴底显示）
                node.style.bottom = '10px';
                node.style.top = 'auto';
                useBottomPosition = true;
            } else {
                // 正常高度显示
                node.style.maxHeight = '';
                node.style.overflowY = '';
                node.style.bottom = 'auto';
                
                // 调整顶部位置确保在屏幕内
                var finalTop = Math.max(10, Math.min(clickY, winHeight - menuHeight - 10));
                node.style.top = finalTop + 'px';
            }
            
            // ===== 水平定位优化 =====
            var finalLeft = clickX;
            var rightSpace = winWidth - clickX;
            
            // 检查右侧空间是否不足（考虑菜单宽度80% + 右侧空间 > 屏幕50%则需调整）
            if (menuWidth * 0.8 + rightSpace > winWidth * 0.5) {
                // 计算需要向左移动的距离
                var moveLeft = Math.min(
                    menuWidth * 0.8 + rightSpace - winWidth * 0.5, // 基础偏移量
                    clickX - 10  // 不能超出左边界
                );
                node.style.transform = 'translateX(-' + moveLeft + 'px)';
            } else {
                // 左侧空间检查（防止移出左屏幕）
                if (clickX < menuWidth * 0.2) {
                    node.style.transform = 'translateX(' + (10 - clickX) + 'px)';
                } else {
                    node.style.transform = '';
                }
            }
            
            // ===== 最终显示 =====
            popupContainer.classList.remove('hidden');
            popupContainer.onclose = onclose;
        };
        /*var openMenu = function(node, e, onclose) {
			window.notPlayChangeSkinEffect=true;
			window.hasMenu=true;
			popupContainer.innerHTML='';
			var left = e.clientX;
			var zoom = 1;
			popupContainer.appendChild(node);
			if (node.classList.contains('visual')) {
				for (var i = 0; i < node.childElementCount; i++) {
					if (node.childNodes[i].update) {
						node.childNodes[i].update();
					}
				}
			}
			var height = node.offsetHeight;
			var width= node.offsetWidth;
			var idealtop = e.clientY;
			if (idealtop < 10) {
				idealtop = 10;
			} else if ((idealtop + height) * zoom + 10 > ui.window.offsetHeight) {
				idealtop = (ui.window.offsetHeight - 10) / zoom - height;
			}
			node.style.top = idealtop + 'px';
			//alert(idealtop+'+'+height+'='+(idealtop+height+11)+'<'+window.innerHeight//窗口高度ui.window.offsetHeight);
			if(idealtop+height+11<window.innerHeight//窗口高度ui.window.offsetHeight) {
			node.style.bottom = 'auto';
			}else {
			node.style.bottom = '10px';
			}
			var cent=600;
			var right=window.innerWidth-left;
			//这里可以微调
			//alert((width*0.8+right)+'>'+(window.innerWidth*0.5));
			if(width*0.8+right>window.innerWidth*0.5) {
			    var rightChg=width*0.8+right-window.innerWidth*0.5;
			    node.style.transform = 'translateX(' + rightChg + 'px)';
			}
			//node.style.left = left + 'px';
			popupContainer.classList.remove('hidden');
			//game.playAudio('../extension/手杀ui/audio/Menu.mp3');
			//这里也是第一次点击选项的声音
			popupContainer.onclose = onclose;
		};*/
		var clickToggle = function() {
			if (this.classList.contains('disabled')) return;
			var node = this;
			//if(node._link.config.unshow&&lib.config.lock_menu_item) {
			if(node.isUnshowing) {
			    if(game.unshowLockItem!=node._link.config._name) {
			        //game.unshowLockItem=node._link.config._name;
			        if(window.tipsClick) window.tipsClick('Unlock');
			        game.alert('该设置已锁定，不建议更改<br>（可在选项-通用中解除）');
			        return;
			    }
			}
    		game.playAudio('../extension/手杀ui/audio/MidButton.mp3');
    		/*关闭选项的声音*/
			this.classList.toggle('on');			
			var config = this._link.config;
			if (config.onclick) {		
				if (config.onclick.call(this, this.classList.contains('on')) === false) {
					this.classList.toggle('on');
				}
			}
			if (config.update) {
				config.update();
			}
		};
		var clickSwitcher = function() {
			if (this.classList.contains('disabled')) return;
			var node = this;
			//if(node._link.config.unshow&&lib.config.lock_menu_item) {
			if(node.isUnshowing) {
			    if(game.unshowLockItem!=node._link.config._name) {
			        //game.unshowLockItem=node._link.config._name;
			        if(window.tipsClick) window.tipsClick('Unlock');
			        game.alert('该设置已锁定，不建议更改<br>（可在选项-通用中解除）');
			        return;
			    }
			}
			this.classList.add('on');
			game.playAudio('../extension/手杀ui/audio/WinButton.mp3');
			/*内部选项第一下点击的声音*/
			if (this._link.menu) {
				var pos1 = this.lastChild.getBoundingClientRect();
				var pos2 = ui.window.getBoundingClientRect();
				if (this._link.menu.classList.contains('visual')) {
					openMenu(this._link.menu, {
						clientX: pos1.left + pos1.width + 5 - pos2.left,
						clientY: pos1.top - pos2.top
					},
					function() {
						node.classList.remove('on');
					});
				} else if (this._link.menu.childElementCount > 10) {
					openMenu(this._link.menu, {
						clientX: pos1.left + pos1.width + 5 - pos2.left,
						clientY: Math.min((ui.window.offsetHeight - 400) / 2, pos1.top - pos2.top)
					},
					function() {
						node.classList.remove('on');
					});
					lib.setScroll(this._link.menu);
				} else {
					openMenu(this._link.menu, {
						clientX: pos1.left + pos1.width + 5 - pos2.left,
						clientY: pos1.top - pos2.top
					},
					function() {
						node.classList.remove('on');
					});
				}
			}
		};
		var clickContainer = function() {
		    //加一个函数防止误触退出
			if(game.noReturnMenu) return;
			menuContainer.classList.add('hidden');
			if (connectMenu) {			
				if (_status.enteringroom) {
					_status.enteringroom = false;
				}
				if (_status.creatingroom) {
					_status.creatingroom = false;
				}
				ui.window.classList.remove('shortcutpaused');
			} else {
				window.hasMenu=false;
				game.resume2();
				if (game.onresume2) {
					game.onresume2();
				}				
				ui.arena.classList.remove('menupaused');
				ui.historybar.classList.remove('menupaused');
				ui.window.classList.remove('touchinfohidden');
				ui.config2.classList.remove('pressdown2');
			}
		};
		var clickMenuItem = function() {
			var node = this.parentNode._link;
			var config = node._link.config;
			node._link.current = this.link;
			var tmpName = node.lastChild.innerHTML;
			node.lastChild.innerHTML = game.getItemLink(config.item, this._link);//config.item[this._link];
			game.playAudio('../extension/手杀ui/audio/TinyButton.mp3');
			/*内部选项，比如斗地主选模式等*/
			if (config.onclick) {
				if (config.onclick.call(node, this._link, this) === false) {
					node.lastChild.innerHTML = tmpName;
				}
			}
			if (config.update) {
				config.update();
			}
		};
		var createMenu = function(tabs, config) {
			//window.hasMenu=true;
			var createPage = function(position) {
				var node = ui.create.div(position);
				lib.setScroll(ui.create.div('.left.pane', node));
				lib.setScroll(ui.create.div('.right.pane', node));
				return node;
			};
			var menu = ui.create.div('.main.menu.dialog.popped.static', config.position,
			function(e) {
			/*game.playAudio('../extension/手杀ui/audio/Menu.mp3');
			/*全部选项的声音*/
				e.stopPropagation();
			});
			if (connectMenu) {
				menu.classList.add('center');
				menuContainer.classList.add('centermenu');
			}
			var menuTab = ui.create.div('.menu-tab', menu);
			var menuTabBar = ui.create.div('.menu-tab-bar', menu);
			menuTabBar.style.left = (config.bar || 0) + 'px';
			if (Math.round(2 * 1) < 2) {
				menuTabBar.style.height = '3px';
			}
			var menuContent = ui.create.div('.menu-content', menu);
			var clickTab = function() {
			game.playAudio('../extension/手杀ui/audio/Menu.mp3');
			/*顶部菜单栏声音*/
				if (this.classList.contains('disabled')) return;
				var active = this.parentNode.querySelector('.active');
				if (active) {
					active.classList.remove('active');
					active._link.remove();
				/*	game.playAudio('../extension/手杀ui/audio/Menu.mp3');
					/*写这里一样*/
				}
				this.classList.add('active');
				menuTabBar.style.transform = 'translateX(' + (this.getBoundingClientRect().left - this.parentNode.firstChild.getBoundingClientRect().left) / 1 + 'px)';
				menuContent.appendChild(this._link);
			};
			ui.click.menuTab = function(tab) {
				for (var i = 0; i < menuTab.childNodes.length; i++) {
					if (menuTab.childNodes[i].innerHTML == tab) {
						clickTab.call(menuTab.childNodes[i]);
						return;
					}
				}
			};
			var pages = [];
			for (var i = 0; i < tabs.length; i++) {
				var active = (i === (config.init || 0));
				pages[i] = createPage(active ? menuContent: null);
				ui.create.div(active ? '.active': '', tabs[i], menuTab, clickTab)._link = pages[i];
			}
			return {
				menu: menu,
				pages: pages
			};
		};
		var createConfig = function(config, position) {
			var name = ((config.unshow&&lib.config.lock_menu_item)?'<span style="font-size: 16px; vertical-align: top">🔒</span>':'')+config.name;
			var node = ui.create.div('.config', name);
			if(config.unshow&&lib.config.lock_menu_item) {
			    node.style.filter='grayscale(1) brightness(0.85)';
			    node.isUnshowing=true;
			    //node.style.pointerEvents='none';
			    if(config._name&&lib.config[config._name]!=config.init) {
			        game.saveConfig(config._name,config.init);
			    }
			}
			node._link = {
				config: config
			};
			if (!config.clear) {
				if (config.name != '开启') {
					if (config.name == '屏蔽弱将') {
						config.intro = '强度过低的武将（孙策除外）不会出现在选将框，也不会被AI选择'
					} else if (config.name == '屏蔽强将') {
						config.intro = '强度过高的武将不会出现在选将框，也不会被AI选择'
					} else if (!config.intro) {
						config.intro = '设置' + config.name;
					}
					lib.setIntro(node,
					function(uiintro) {
						if (lib.config.touchscreen) _status.dragged = true;
						uiintro.style.width = '170px';
						var str = config.intro;
						if (typeof str == 'function') {
							str = str();
						}
						uiintro._place_text = uiintro.add('<div class="text" style="display:inline">' + str + '</div>');
					});
				}
			} else {
				node.innerHTML = '<span>' + config.name + '</span>';
				if (!config.nopointer) {
					node.classList.add('pointerspan');
				}
			}
			if (config.item) {
				if (typeof config.item == 'function') {
					config.item = config.item();
				}
				if (Array.isArray(config.init)) {

		        } else {
					node.classList.add('switcher');
					node.listen(clickSwitcher);
					node._link.choosing = ui.create.div('', game.getItemLink(config.item, config.init), node);
					node._link.menu = ui.create.div('.menu');
					if (config.visualMenu) {
						node._link.menu.classList.add('visual');
						var updateVisual = function() {
							config.visualMenu(this, this._link, game.getItemLink(config.item, this._link), config);
						};
						var createNode = function(i, before) {
							var visualMenu = ui.create.div();
							if (config.visualBar) {
								if (before) {
									node._link.menu.insertBefore(visualMenu, before);
								} else {
									node._link.menu.insertBefore(visualMenu, node._link.menu.lastChild);
								}
							} else {
								node._link.menu.appendChild(visualMenu);
							}
							ui.create.div('.name', get.verticalStr(game.getItemLink(config.item, i)), visualMenu);
							visualMenu._link = i;
							if (config.visualMenu(visualMenu, i, game.getItemLink(config.item, i), config) !== false) {
								visualMenu.listen(clickMenuItem);
							}
							visualMenu.update = updateVisual;
						};
						if (config.visualBar) {
							var visualBar = ui.create.div(node._link.menu,
							function() {
								this.parentNode.parentNode.noclose = true;
							});
							node._link.menu.classList.add('withbar');
							config.visualBar(visualBar, config.item, createNode, node);
							visualBar.update = function() {
								config.visualBar(visualBar, config.item, createNode, node);
							}
						}
						for (var i in config.item) {
							createNode(i);
						}
						lib.setScroll(node._link.menu);
						node._link.menu.updateBr = function() {
							var br = Array.from(this.querySelectorAll('.menu.visual>br'));
							while (br.length) {
								br.shift().remove();
							}
							var split = [];
							for (var i = 1; i < this.childElementCount; i++) {
								if (i % 3 == 0) {
									split.push(this.childNodes[i]);
								}
							}
							for (var i = 0; i < split.length; i++) {
								this.insertBefore(ui.create.node('br'), split[i]);
							}
						}
						node._link.menu.updateBr();
					} else {
						for (var i in config.item) {
							var textMenu = ui.create.div('', game.getItemLink(config.item, i), node._link.menu, clickMenuItem);
							textMenu._link = i;
							if (config.textMenu) {
								config.textMenu(textMenu, i, game.getItemLink(config.item, i), config)
							}
							lib.setScroll(node._link.menu);
						}
					}
					node._link.menu._link = node;
					node._link.current = config.init;
				}
			} else if (config.range) {

		} else if (config.clear) {
				if (node.innerHTML.length >= 15) node.style.height = 'auto';
				node.listen(clickToggle);
			} else if (config.input) {
				node.classList.add('switcher');
				var input = ui.create.div(node);
				if (!config.fixed) {
					input.contentEditable = true;
					input.style.webkitUserSelect = 'text';
				}
				input.style.minWidth = '10px';
				input.onkeydown = function(e) {
					if (e.keyCode == 13) {
						e.preventDefault();
						e.stopPropagation();
						input.blur();
					}
				};
				if (config.name == '联机昵称') {
					input.innerHTML = config.init || '无名玩家';
					input.onblur = function() {
						input.innerHTML = input.innerHTML.replace(/<br>/g, '');
						if (!input.innerHTML || get.is.banWords(input.innerHTML)) {
							input.innerHTML = '无名玩家';
						}
						input.innerHTML = input.innerHTML.slice(0, 12);
						game.saveConfig('connect_nickname', input.innerHTML);
						game.saveConfig('connect_nickname', input.innerHTML, 'connect');
					}
				} else if (config.name == '联机大厅') {
					input.innerHTML = config.init || lib.hallURL;
					input.onblur = function() {
						if (!input.innerHTML) {
							input.innerHTML = lib.hallURL;
						}
						input.innerHTML = input.innerHTML.replace(/<br>/g, '');
						game.saveConfig('hall_ip', input.innerHTML, 'connect');
					}
				} else {
					input.innerHTML = config.init;
					input.onblur = config.onblur;
				}
			} else {
				node.classList.add('toggle');
				node.listen(clickToggle);
				ui.create.div(ui.create.div(node));
				if (config.init == true) {
					node.classList.add('on');
				}
			}
			if(config.lockEnable) {
			    node = ui.create.div('');
			}
			if (position) {
				position.appendChild(node);
			}
			return node;
		};
		var updateActive, updateActiveCard;
		var menuUpdates = [];
		menuContainer = ui.create.div('.menu-container.hidden', ui.window, clickContainer);
		var menux;
		if (!connectMenu) {
			ui.menuContainer = menuContainer;
			ui.click.configMenu = function() {
			    window.notPlayChangeSkinEffect=true;
			    window.hasMenu=true;
			    if(typeof txhj !== "undefined"&&txhj.servant) txhj.servant.hide();
				ui.click.shortcut(false);
				if (menuContainer.classList.contains('hidden')) {
					ui.config2.classList.add('pressdown2');
					ui.arena.classList.add('menupaused');
					ui.historybar.classList.add('menupaused');
					ui.window.classList.add('touchinfohidden');
					menuContainer.classList.remove('hidden');
					if(!window.ss_closeMenu) window.ss_closeMenu=ui.create.div('#closemenu1',menuContainer);
	        var head = window.ss_closeMenu;
			head.ontouchend = function() {
			if(typeof txhj !== "undefined"&&txhj.servant) txhj.servant.show();
			game.playAudio('../extension/手杀ui/audio/MidButton.mp3');
	clickContainer.call(menuContainer);
	return false
			}
			head.onclick= function() {
			if(typeof txhj !== "undefined"&&txhj.servant) txhj.servant.show();
			game.playAudio('../extension/手杀ui/audio/MidButton.mp3');
	clickContainer.call(menuContainer);
	return false
			}
					for (var i = 0; i < menuUpdates.length; i++) {
						menuUpdates[i]();
					}
				} else {
					clickContainer.call(menuContainer);
				}
			}
			menux = createMenu(['开始', '选项', '武将', '卡牌', '扩展', '其它'], {
				position: menuContainer,
				bar: 33
			});
		} else {
			ui.connectMenuContainer = menuContainer;
			ui.click.connectMenu = function() {
				if (menuContainer.classList.contains('hidden')) {
					if (_status.waitingForPlayer) {
						startButton.innerHTML = '设';
						var start = menux.pages[0].firstChild;
						for (var i = 0; i < start.childNodes.length; i++) {
							if (start.childNodes[i].mode != lib.configOL.mode) {
								start.childNodes[i].classList.add('unselectable');
								start.childNodes[i].classList.remove('active');
								start.childNodes[i].link.remove();
							} else {
								start.childNodes[i].classList.add('active');
								start.nextSibling.appendChild(start.childNodes[i].link);
							}
						}
					}
					ui.window.classList.add('shortcutpaused');
					menuContainer.classList.remove('hidden');								
					for (var i = 0; i < menuUpdates.length; i++) {
						menuUpdates[i]();
					}
				} else {
					clickContainer.call(menuContainer);
				}
			}

			menux = createMenu(['模式', '武将', '卡牌'], {
				position: menuContainer,
				bar: 123
			});
			menu = menux.menu;
		}
		var menuxpages = menux.pages.slice(0);

		var copyObj = get.copy;

		(function() {
			var start = menuxpages.shift();
			var rightPane = start.lastChild;
			startButton = ui.create.div('.menubutton.round.highlight', '启', start,
			function() {
				if (this.animating || this.classList.contains('dim')) {
					return;
				}
				var active = this.parentNode.querySelector('.active');
				if (active) {			
					if (connectMenu) {
						if (_status.waitingForPlayer) {
							var config = {};
							for (var i in lib.mode[lib.configOL.mode].connect) {
								if (i == 'update') continue;
								config[i.slice(8)] = get.config(i, lib.configOL.mode);
							}
							config.zhinang_tricks = lib.config.connect_zhinang_tricks;
							if (game.online) {
								if (game.onlinezhu) {
									game.send('changeRoomConfig', config);
								}
							} else {
								game.broadcastAll(function(config) {
									for (var i in config) {
										lib.configOL[i] = config[i];
									}
								},
								config);
								if (lib.configOL.mode == 'identity' && lib.configOL.identity_mode == 'zhong' && game.connectPlayers) {
									for (var i = 0; i < game.connectPlayers.length; i++) {
										game.connectPlayers[i].classList.remove('unselectable2');
									}
									lib.configOL.number = 8;
									game.updateWaiting();
								}
								if (game.onlineroom) {
									game.send('server', 'config', lib.configOL);
								}
								game.connectPlayers[0].chat('房间设置已更改');
							}
						} else if (_status.enteringroom || _status.creatingroom) {
							lib.configOL.mode = active.mode;
							if (_status.enteringroomserver) {
								game.saveConfig('connect_mode', lib.configOL.mode);

								var config = {};
								for (var i in lib.mode[lib.configOL.mode].connect) {
									if (i == 'update') continue;
									config[i.slice(8)] = get.config(i, lib.configOL.mode);
								}
								config.zhinang_tricks = lib.config.connect_zhinang_tricks;

								config.characterPack = lib.connectCharacterPack.slice(0);
								config.cardPack = lib.connectCardPack.slice(0);
								for (var i = 0; i < lib.config.connect_characters.length; i++) {
									config.characterPack.remove(lib.config.connect_characters[i]);
								}
								for (var i = 0; i < lib.config.connect_cards.length; i++) {
									config.cardPack.remove(lib.config.connect_cards[i]);
								}
								config.banned = lib.config['connect_' + active.mode + '_banned'];
								config.bannedcards = lib.config['connect_' + active.mode + '_bannedcards'];
								game.send('server', 'create', game.onlineKey, get.connectNickname(), lib.config.connect_avatar, config, active.mode);
							} else {
								game.send('server', 'create', game.onlineKey, get.connectNickname(), lib.config.connect_avatar);
							}
						} else {
							localStorage.setItem(lib.configprefix + 'directstart', true);
							game.saveConfig('directstartmode', active.mode);
							game.saveConfig('mode', 'connect');
							ui.exitroom = ui.create.system('退出房间',
							function() {
								game.saveConfig('directstartmode');
								game.reload();
							},
							true);
							game.switchMode(active.mode);
						}
						clickContainer.call(menuContainer);
					} else {
						game.saveConfig('mode', active.mode);
						localStorage.setItem(lib.configprefix + 'directstart', true);
						game.reload();
					}
				}
			});

			var clickMode = function() {
			game.playAudio('../extension/手杀ui/audio/TinyButton.mp3');
			/*开始左侧栏的声音*/
				if (this.classList.contains('unselectable')) return;
				var active = this.parentNode.querySelector('.active');
				if (active === this) {
					return;
				}
				active.classList.remove('active');
				active.link.remove();
				active = this;
				this.classList.add('active');
				rightPane.appendChild(this.link);
				if (connectMenu) {
					if (updateActive) updateActive();
					if (updateActiveCard) updateActiveCard();
				}
			};

			var createModeConfig = function(mode, position) {
				var info = lib.mode[mode];
				var page = ui.create.div('');
				var node = ui.create.div('.menubutton.large', info.name, position, clickMode);
				node.link = page;
				node.mode = mode;
				if (connectMenu) {
					if (mode == lib.config.connect_mode) {
						node.classList.add('active');
					}
				} else {
					if (mode == lib.config.mode) {
						node.classList.add('active');
					}
				}
				var map = {};
				var infoconfig = connectMenu ? info.connect: info.config;
				if (infoconfig) {
					var hiddenNodes = [];
					var config = lib.config.mode_config[mode] || {};
					if (connectMenu) {
						infoconfig.connect_choose_timeout = {
							name: '出牌时限',
							init: '30',
							item: {
								'10': '10秒',
								'15': '15秒',
								'30': '30秒',
								'60': '60秒',
								'90': '90秒',
							},
							connect: true,
							frequent: true
						};
						infoconfig.connect_observe = {
							name: '允许旁观',
							init: true,
							connect: true
						};
						infoconfig.connect_observe_handcard = {
							name: '允许观看手牌',
							init: false,
							connect: true
						};
					}
					for (var j in infoconfig) {
						if (j === 'update') {
							continue;
						}
						var cfg = copyObj(infoconfig[j]);
						cfg._name = j;
						cfg.mode = mode;
						if (!config.hasOwnProperty(j)) {
							game.saveConfig(j, cfg.init, mode);
						} else {
							cfg.init = config[j];
						}
						if (!cfg.onclick) {
							cfg.onclick = function(result) {
								var cfg = this._link.config;
								game.saveConfig(cfg._name, result, mode);
								if (cfg.onsave) {
									cfg.onsave.call(this, result);
								}
								if (!_status.connectMode || game.online) {
									if (typeof cfg.restart == 'function') {
										if (cfg.restart()) {
											startButton.classList.add('glowing');
										}
									} else if (cfg.restart) {
										startButton.classList.add('glowing');
									}
								}
							};
						}
						if (infoconfig.update) {
							cfg.update = function() {
								infoconfig.update(config, map);
							};
						}
						var cfgnode = createConfig(cfg);
						map[j] = cfgnode;
						if (cfg.frequent) {
							page.appendChild(cfgnode);
						} else {
							cfgnode.classList.add('auto-hide');
							hiddenNodes.push(cfgnode);
						}
					}
					if (!connectMenu) {
						var move = ui.create.div('.auto-hide.config', '<div style="margin-right:10px" class="pointerdiv">上移↑</div><div class="pointerdiv">下移↓</div>');
						move.firstChild.listen(function() {
						game.playAudio('../extension/手杀ui/audio/TinyButton.mp3');
						/*上移按钮的声音*/
							if (node.previousSibling) {

								node.parentNode.insertBefore(node, node.previousSibling);
								var order = [];
								for (var i = 0; i < node.parentNode.childNodes.length; i++) {
									order.push(node.parentNode.childNodes[i].mode);
								}
								game.saveConfig('modeorder', order);
							}
						});
						move.lastChild.listen(function() {
						game.playAudio('../extension/手杀ui/audio/TinyButton.mp3');
						/*下移按钮的声音*/
							if (node.nextSibling) {
								if (node.nextSibling.nextSibling) {
									node.parentNode.insertBefore(node, node.nextSibling.nextSibling);
								} else {
									node.parentNode.insertBefore(node.nextSibling, node);
								}
								var order = [];
								for (var i = 0; i < node.parentNode.childNodes.length; i++) {
									order.push(node.parentNode.childNodes[i].mode);
								}
								game.saveConfig('modeorder', order);
							}
						});
						hiddenNodes.push(move);
					}
					var expanded = false;
					var hasexpand = true;
					if (hiddenNodes.length) {
						if (lib.config.fold_mode) {
							var clickmore = function(type) {
								if (type === 'expand' && expanded) return;
								if (type === 'unexpand' && !expanded) return;
								if (expanded) {
									this.classList.remove('on');
									this.parentNode.classList.remove('expanded');
								} else {
									this.classList.add('on');
									this.parentNode.classList.add('expanded');
								}
								expanded = !expanded;
							};
							var morenodes = ui.create.div('.config.more', '更多 <div>&gt;</div>', page);
							morenodes.listen(clickmore);
							morenodes._onclick = clickmore;
							page.morenodes = morenodes;
						} else {
							page.classList.add('expanded');
							if (!connectMenu) {
								page.classList.add('expanded2');
							}
						}
						for (var k = 0; k < hiddenNodes.length; k++) {
							page.appendChild(hiddenNodes[k]);
						}
					} else {
						hasexpand = false;
					}
					if (!connectMenu) {
						var hidemode = ui.create.div('.config.pointerspan', '<span>隐藏此模式</span>', page,
						function() {
						game.playAudio('../extension/手杀ui/audio/TinyButton.mp3');
							if (this.firstChild.innerHTML == '隐藏此模式') {						
								this.firstChild.innerHTML = '此模式将在重启后隐藏';
								lib.config.hiddenModePack.add(mode);
								if (!lib.config.prompt_hidepack) {
									alert('隐藏的扩展包可通过选项-其它-重置隐藏内容恢复');
									game.saveConfig('prompt_hidepack', true);
								}
							} else {		
								this.firstChild.innerHTML = '隐藏此模式';
								lib.config.hiddenModePack.remove(mode);
							}
							game.saveConfig('hiddenModePack', lib.config.hiddenModePack);
						});
						if (hasexpand) {
							hidemode.classList.add('auto-hide');
						}
					}
					if (infoconfig.update) {
						infoconfig.update(config, map);
						node.update = function() {
							infoconfig.update(config, map);
						}
					}
				}
				if (connectMenu) {
					menuUpdates.push(function() {
						if (_status.waitingForPlayer) {
							if (map.connect_player_number) {
								map.connect_player_number.style.display = 'none';
							}
							if (map.connect_versus_mode) {
								map.connect_versus_mode.style.display = 'none';
							}
						}
					})
				}
				return node;
			};
			var modeorder = lib.config.modeorder || [];
			for (var i in lib.mode) {
				modeorder.add(i);
			}
			for (var i = 0; i < modeorder.length; i++) {
				if (connectMenu) {
					if (!lib.mode[modeorder[i]].connect) continue;
					if (!lib.config['connect_' + modeorder[i] + '_banned']) {
						lib.config['connect_' + modeorder[i] + '_banned'] = [];
					}
					if (!lib.config['connect_' + modeorder[i] + '_bannedcards']) {
						lib.config['connect_' + modeorder[i] + '_bannedcards'] = [];
					}
				}
				if (lib.config.all.mode.contains(modeorder[i])) {
					createModeConfig(modeorder[i], start.firstChild);
				}
			}
			var active = start.firstChild.querySelector('.active');
			if (!active) {
				active = start.firstChild.firstChild;
				active.classList.add('active');
			}
			rightPane.appendChild(active.link);
			if (lib.config.fold_mode) {
				rightPane.addEventListener('mousewheel',
				function(e) {
					var morenodes = this.firstChild.morenodes;
					if (morenodes) {
						if (e.wheelDelta < 0) {
							morenodes._onclick.call(morenodes, 'expand');
						} else if (this.scrollTop == 0) {
							morenodes._onclick.call(morenodes, 'unexpand');
						}
					}
				},
				{
					passive: false
				});
			}
		} ());

		(function() {
			if (connectMenu) return;
			var start = menuxpages.shift();
			var rightPane = start.lastChild;

			var clickMode = function() {
			game.playAudio('../extension/手杀ui/audio/TinyButton.mp3');
			/*选项的左侧声音*/
				var active = this.parentNode.querySelector('.active');
				if (active === this) {
					return;
				}
				active.classList.remove('active');
				active.link.remove();
				active = this;
				this.classList.add('active');
				rightPane.appendChild(this.link);
			};

			var clickAutoSkill = function(bool) {
				var name = this._link.config._name;
				var list = lib.config.autoskilllist;
				if (bool) {
					list.remove(name);
				} else {
					list.add(name);
				}
				game.saveConfig('autoskilllist', list);
			};
			var skilllistexpanded = game.expandSkills(lib.skilllist);
			for (var i in lib.skill) {
				if (!skilllistexpanded.contains(i)) continue;
				if (lib.skill[i].frequent && lib.translate[i]) {
					lib.configMenu.skill.config[i] = {
						name: lib.translate[i + '_noconf'] || lib.translate[i],
						init: true,
						type: 'autoskill',
						onclick: clickAutoSkill,
						intro: lib.translate[i + '_info']
					}
				}
			}
			var clickBanSkill = function(bool) {
				var name = this._link.config._name;
				var list = lib.config.forbidlist;
				if (bool) {
					list.remove(name);
				} else {
					list.add(name);
				}
				game.saveConfig('forbidlist', list);
			};
			var forbid = lib.config.forbid;
			if (!lib.config.forbidlist) {
				game.saveConfig('forbidlist', []);
			}
			for (var i = 0; i < forbid.length; i++) {
				var skip = false;
				var str = '';
				var str2 = '';
				var str3 = '';
				for (var j = 0; j < forbid[i].length; j++) {
					if (!lib.skilllist.contains(forbid[i][j])) {
						skip = true;
						break;
					}
					str += get.translation(forbid[i][j]) + '+';
					str2 += forbid[i][j] + '+';
					str3 += get.translation(forbid[i][j]) + '：' + lib.translate[forbid[i][j] + '_info'];
					if (j < forbid[i].length - 1) {
						str3 += '<div class="placeholder slim" style="display:block;height:8px"></div>';
					}
				}
				if (skip) continue;
				str = str.slice(0, str.length - 1);
				str2 = str2.slice(0, str2.length - 1);

				lib.configMenu.skill.config[str2] = {
					name: str,
					init: true,
					type: 'banskill',
					onclick: clickBanSkill,
					intro: str3
				}
			}

			var updateView = null;
			var updateAppearence = null;
			var createModeConfig = function(mode, position) {
				var info = lib.configMenu[mode];
				var page = ui.create.div('');
				var node = ui.create.div('.menubutton.large', info.name, position, clickMode);
				node.link = page;
				node.mode = mode;
				var map = {};
				if (info.config) {
					var hiddenNodes = [];
					var autoskillNodes = [];
					var banskillNodes = [];
					var custombanskillNodes = [];
					var banskill;

					if (mode == 'skill') {
						var autoskillexpanded = false;
						var banskillexpanded = false;
						ui.create.div('.config.more', '自动发动 <div>&gt;</div>', page,
						function() {
							if (autoskillexpanded) {
								this.classList.remove('on');
								for (var k = 0; k < autoskillNodes.length; k++) {
									autoskillNodes[k].style.display = 'none';
								}
							} else {
								this.classList.add('on');
								for (var k = 0; k < autoskillNodes.length; k++) {
									autoskillNodes[k].style.display = '';
								}
							}
							autoskillexpanded = !autoskillexpanded;
						});
						banskill = ui.create.div('.config.more', '双将禁配 <div>&gt;</div>', page,
						function() {
							if (banskillexpanded) {
								this.classList.remove('on');
								for (var k = 0; k < banskillNodes.length; k++) {
									banskillNodes[k].style.display = 'none';
								}
							} else {
								this.classList.add('on');
								for (var k = 0; k < banskillNodes.length; k++) {
									banskillNodes[k].style.display = '';
								}
							}
							banskillexpanded = !banskillexpanded;
						});

						var banskilladd = ui.create.div('.config.indent', '<span class="pointerdiv">添加...</span>', page,
						function() {
							this.nextSibling.classList.toggle('hidden');
						});
						banskilladd.style.display = 'none';
						banskillNodes.push(banskilladd);

						var banskilladdNode = ui.create.div('.config.indent.hidden.banskilladd', page);
						banskilladdNode.style.display = 'none';
						banskillNodes.push(banskilladdNode);

						var matchBanSkill = function(skills1, skills2) {
							if (skills1.length != skills2.length) return false;
							for (var i = 0; i < skills1.length; i++) {
								if (!skills2.contains(skills1[i])) return false;
							}
							return true;
						}
						var deleteCustomBanSkill = function() {
							for (var i = 0; i < lib.config.customforbid.length; i++) {
								if (matchBanSkill(lib.config.customforbid[i], this.parentNode.link)) {
									lib.config.customforbid.splice(i--, 1);
									break;
								}
							}
							game.saveConfig('customforbid', lib.config.customforbid);
							this.parentNode.remove();
						}
						var createCustomBanSkill = function(skills) {
							var node = ui.create.div('.config.indent.toggle');
							node.style.display = 'none';
							node.link = skills;
							banskillNodes.push(node);
							custombanskillNodes.push(node);
							var str = get.translation(skills[0]);
							for (var i = 1; i < skills.length; i++) {
								str += '+' + get.translation(skills[i]);
							}
							node.innerHTML = str;
							var span = document.createElement('span');
							span.classList.add('cardpiledelete');
							span.innerHTML = '删除';
							span.onclick = deleteCustomBanSkill;
							node.appendChild(span);
							page.insertBefore(node, banskilladdNode.nextSibling);
							return node;
						};
						for (var i = 0; i < lib.config.customforbid.length; i++) {
							createCustomBanSkill(lib.config.customforbid[i]);
						} (function() {
							var list = [];
							for (var i in lib.character) {
								if (lib.character[i][3].length) {
								    //list.push([i, lib.translate[i]]);
								    var indexss=Math.max(i.lastIndexOf('_')+1,0);
					                var alpha=i.slice(indexss,indexss+1);
					                list.push([i, (game.isForbidedCharacter(i) ? '🚫' : '') + alpha.toUpperCase()+'-'+lib.translate[i]]);
								}
							}

							game.sortEditCharacterList(list);
							/*list.sort(function(a, b) {
								a = a[0];
								b = b[0];
								var aa = a,
								bb = b;
								if (aa.lastIndexOf('_') != -1) {
									aa = aa.slice(aa.lastIndexOf('_') + 1);
								}
								if (bb.lastIndexOf('_') != -1) {
									bb = bb.slice(bb.lastIndexOf('_') + 1);
								}
								if (aa != bb) {
									return aa > bb ? 1 : -1;
								}
								return a > b ? 1 : -1;
							});*/

							var list2 = [];
							var skills = lib.character[list[0][0]][3];
							for (var i = 0; i < skills.length; i++) {
								list2.push([skills[i], lib.translate[skills[i]]]);
							}

							var selectname = ui.create.selectlist(list, list[0], banskilladdNode);
							selectname.onchange = function() {
								var skills = lib.character[this.value][3];
								skillopt.innerHTML = '';
								for (var i = 0; i < skills.length; i++) {
									var option = document.createElement('option');
									option.value = skills[i];
									option.innerHTML = lib.translate[skills[i]];
									skillopt.appendChild(option);
								}
							};
							selectname.style.maxWidth = '85px';
							var skillopt = ui.create.selectlist(list2, list2[0], banskilladdNode);

							var span = document.createElement('span');
							span.innerHTML = '＋';
							banskilladdNode.appendChild(span);
							var br = document.createElement('br');
							banskilladdNode.appendChild(br);

							var selectname2 = ui.create.selectlist(list, list[0], banskilladdNode);
							selectname2.onchange = function() {
								var skills = lib.character[this.value][3];
								skillopt2.innerHTML = '';
								for (var i = 0; i < skills.length; i++) {
									var option = document.createElement('option');
									option.value = skills[i];
									option.innerHTML = lib.translate[skills[i]];
									skillopt2.appendChild(option);
								}
							};
							selectname2.style.maxWidth = '85px';
							var skillopt2 = ui.create.selectlist(list2, list2[0], banskilladdNode);
							var confirmbutton = document.createElement('button');
							confirmbutton.innerHTML = '确定';
							banskilladdNode.appendChild(confirmbutton);

							confirmbutton.onclick = function() {
								var skills = [skillopt.value, skillopt2.value];
								if (skills[0] == skills[1]) {
									skills.shift();
								}
								if (!lib.config.customforbid) return;
								for (var i = 0; i < lib.config.customforbid.length; i++) {
									if (matchBanSkill(lib.config.customforbid[i], skills)) return;
								}
								lib.config.customforbid.push(skills);
								game.saveConfig('customforbid', lib.config.customforbid);
								createCustomBanSkill(skills).style.display = '';
							}
						} ());
						page.style.paddingBottom = '10px';
					}
					var config = lib.config;
					if (mode == 'appearence') {
						updateAppearence = function() {
							info.config.update(config, map);
						};
					} else if (mode == 'view') {
						updateView = function() {
							info.config.update(config, map);
						};
					}
					for (var j in info.config) {
						if (j === 'update') {
							continue;
						}
						var cfg = copyObj(info.config[j]);
						cfg._name = j;
						if (!config.hasOwnProperty(j)) {
							if (cfg.type != 'autoskill' && cfg.type != 'banskill') {
								game.saveConfig(j, cfg.init);
							}
						} else {
							cfg.init = config[j];
						}
						if (!cfg.onclick) {
							cfg.onclick = function(result) {
								var cfg = this._link.config;
								game.saveConfig(cfg._name, result);
								if (cfg.onsave) {
									cfg.onsave.call(this, result);
								}
							};
						}
						if (info.config.update) {
							if (mode == 'appearence' || mode == 'view') {
								cfg.update = function() {
									if (updateAppearence) {
										updateAppearence();
									}
									if (updateView) {
										updateView();
									}
								};
							} else {
								cfg.update = function() {
									info.config.update(config, map);
								};
							}
						}
						var cfgnode = createConfig(cfg);
						if (cfg.type == 'autoskill') {
							autoskillNodes.push(cfgnode);
							// cfgnode.style.transition='all 0s';
							cfgnode.classList.add('indent');
							// cfgnode.hide();
							cfgnode.style.display = 'none';
						} else if (cfg.type == 'banskill') {
							banskillNodes.push(cfgnode);
							// cfgnode.style.transition='all 0s';
							cfgnode.classList.add('indent');
							// cfgnode.hide();
							cfgnode.style.display = 'none';
						}
						if (j == 'import_data_button') {
							ui.import_data_button = cfgnode;
							cfgnode.hide();
							cfgnode.querySelector('button').onclick = function() {
								var fileToLoad = this.previousSibling.files[0];
								if (fileToLoad) {
									var fileReader = new FileReader();
									fileReader.onload = function(fileLoadedEvent) {
										var data = fileLoadedEvent.target.result;
										if (!data) return;
										try {
											data = JSON.parse(lib.init.decode(data));
											if (!data || typeof data != 'object') {
												throw ('err');
											}
											if (lib.db && (!data.config || !data.data)) {
												throw ('err');
											}
										} catch(e) {
											console.log(e);
											alert('导入失败');
											return;
										}
										alert('导入成功');
										if (!lib.db) {
											var noname_inited = localStorage.getItem('noname_inited');
											var onlineKey = localStorage.getItem(lib.configprefix + 'key');
											localStorage.clear();
											if (noname_inited) {
												localStorage.setItem('noname_inited', noname_inited);
											}
											if (onlineKey) {
												localStorage.setItem(lib.configprefix + 'key', onlineKey);
											}
											for (var i in data) {
												localStorage.setItem(i, data[i]);
											}
										} else {
											for (var i in data.config) {
												game.putDB('config', i, data.config[i]);
												lib.config[i] = data.config[i];
											}
											for (var i in data.data) {
												game.putDB('data', i, data.data[i]);
											}
										}
										lib.init.background();
										game.reload();
									};
									fileReader.readAsText(fileToLoad, "UTF-8");
								}
							}
						} else if (j == 'import_music') {
							cfgnode.querySelector('button').onclick = function() {
								if (_status.music_importing) return;
								_status.music_importing = true;
								var fileToLoad = this.previousSibling.files[0];
								if (fileToLoad) {
									if (!lib.config.customBackgroundMusic) lib.config.customBackgroundMusic = {};
									var name = fileToLoad.name;
									if (name.indexOf('.') != -1) {
										name = name.slice(0, name.indexOf('.'));
									}
									var link = (game.writeFile ? 'cdv_': 'custom_') + name;
									if (lib.config.customBackgroundMusic[link]) {
										if (!confirm('已经存在文件名称相同的背景音乐，是否仍然要继续导入？')) {
											_status.music_importing = false;
											return
										};
										for (var i = 1; i < 1000; i++) {
											if (!lib.config.customBackgroundMusic[link + '_' + i]) {
												link = link + '_' + i;
												break;
											}
										}
									}
									var callback = function() {
										var nodexx = ui.background_music_setting;
										var nodeyy = nodexx._link.menu;
										var nodezz = nodexx._link.config;
										var musicname = link.slice(link.lastIndexOf('_') + 1);
										game.prompt('###请输入音乐的名称###' + musicname, true,
										function(str) {
											if (str) musicname = str;
											lib.config.customBackgroundMusic[link] = musicname;
											lib.config.background_music = link;
											lib.config.all.background_music.add(link);
											game.saveConfig('background_music', link);
											game.saveConfig('customBackgroundMusic', lib.config.customBackgroundMusic);
											nodezz.item[link] = lib.config.customBackgroundMusic[link];
											var textMenu = ui.create.div('', lib.config.customBackgroundMusic[link], nodeyy, clickMenuItem, nodeyy.childElementCount - 2);
											textMenu._link = link;
											nodezz.updatex.call(nodexx, []);
											_status.music_importing = false;
											if (!_status._aozhan) game.playBackgroundMusic();
										});
									};
									if (game.writeFile) {
										game.writeFile(fileToLoad, 'audio/background', link + '.mp3', callback);
									} else {
										game.putDB('audio', link, fileToLoad, callback);
									}
								}
							}
						} else if (j == 'extension_source') {
							ui.extension_source = cfgnode;
							cfgnode.updateInner = function() {
								this._link.choosing.innerHTML = lib.config.extension_source;
							}
						}
						map[j] = cfgnode;
						if (!cfg.unfrequent) {
							if (cfg.type == 'autoskill') {
								page.insertBefore(cfgnode, banskill);
							} else {
								page.appendChild(cfgnode);
							}
						} else {
							// cfgnode.classList.add('auto-hide');
							hiddenNodes.push(cfgnode);
						}
					}
					var expanded = false;
					if (hiddenNodes.length) {
						// ui.create.div('.config.more','更多 <div>&gt;</div>',page,function(){
						//     if(expanded){
						//      			this.classList.remove('on');
						//      			this.parentNode.classList.remove('expanded');
						//     }
						//     else{
						//      			this.classList.add('on');
						//      			this.parentNode.classList.add('expanded');
						//     }
						//     expanded=!expanded;
						// });
						page.classList.add('morenodes');
						for (var k = 0; k < hiddenNodes.length; k++) {
							page.appendChild(hiddenNodes[k]);
						}
					}
					if (info.config.update) {
						info.config.update(config, map);
					}
				}
				return node;
			};

			for (var i in lib.configMenu) {
				if (i != 'others') createModeConfig(i, start.firstChild);
			} (function() {
				if (!game.download && !lib.device) return;
				var page = ui.create.div('#create-extension');
				var node = ui.create.div('.menubutton.large', '文件', start.firstChild, clickMode);
				node.link = page;
				node.mode = 'create';
				var pageboard = ui.create.div(page);

				var importextensionexpanded = false;
				var importExtension;
				var extensionnode = ui.create.div('.config.more', '导入素材包 <div>&gt;</div>', pageboard,
				function() {
					if (importextensionexpanded) {
						this.classList.remove('on');
						importExtension.style.display = 'none';
					} else {
						this.classList.add('on');
						importExtension.style.display = '';
					}
					importextensionexpanded = !importextensionexpanded;
				});
				extensionnode.style.padding = '13px 33px 4px';
				extensionnode.style.left = '0px';
				importExtension = ui.create.div('.new_character.export.import', pageboard);
				importExtension.style.padding = '0px 33px 10px';
				importExtension.style.display = 'none';
				importExtension.style.width = '100%';
				importExtension.style.textAlign = 'left';
				ui.create.div('', '<input type="file" accept="application/zip" style="width:153px"><button>确定</button>', importExtension);
				var promptnode = ui.create.div('', '<div style="width:153px;font-size:small;margin-top:8px">', importExtension);
				promptnode.style.display = 'none';
				importExtension.firstChild.lastChild.onclick = function() {
					if (promptnode.style.display != 'none') return;
					var fileToLoad = this.previousSibling.files[0];
					if (fileToLoad) {
						promptnode.style.display = '';
						promptnode.firstChild.innerHTML = '正在解压...';
						var fileReader = new FileReader();
						fileReader.onload = function(fileLoadedEvent) {
							var data = fileLoadedEvent.target.result;
							var loadData = function() {
								var zip = new JSZip();
								zip.load(data);
								var images = [],
								audios = [],
								fonts = [],
								directories = {},
								directorylist = [];
								for (var i in zip.files) {
									var ext = i.slice(i.lastIndexOf('.') + 1);
									if (i.indexOf('audio/') == 0 && (ext == 'mp3' || ext == 'ogg')) {
										audios.push(i);
									} else if (i.indexOf('font/') == 0 && ext == 'ttf') {
										fonts.push(i);
									} else if (i.indexOf('image/') == 0 && (ext == 'jpg' || ext == 'png')) {
										images.push(i);
									} else {
										continue;
									}
									var index = i.lastIndexOf('/');
									var str = i.slice(0, index);
									if (!directories[str]) {
										directories[str] = [];
										directorylist.push(str);
									}
									directories[str].push(i.slice(index + 1));
								}
								if (audios.length || fonts.length || images.length) {
									var str = '';
									if (audios.length) {
										str += audios.length + '个音频文件';
									}
									if (fonts.length) {
										if (str.length) str += '、';
										str += fonts.length + '个字体文件';
									}
									if (images.length) {
										if (str.length) str += '、';
										str += images.length + '个图片文件';
									}
									var filelist = audios.concat(fonts).concat(images);
									if (filelist.length > 200) {
										str += '，导入时间可能较长';
									}
									var assetLoaded = function() {
										promptnode.firstChild.innerHTML = '导入成功。<span class="hrefnode">重新启动</span><span class="closenode">×</span>';
										promptnode.firstChild.querySelectorAll('span')[0].onclick = game.reload;
										promptnode.firstChild.querySelectorAll('span')[1].onclick = function() {
											promptnode.style.display = 'none';
										}
									};
									if (confirm('本次将导入' + str + '，是否继续？')) {
										promptnode.firstChild.innerHTML = '正在导入... <span class="hrefnode">详细信息</span>';
										promptnode.firstChild.querySelector('span.hrefnode').onclick = ui.click.consoleMenu;
										if (lib.node && lib.node.fs) {
											var writeFile = function() {
												if (filelist.length) {
													var str = filelist.shift();
													game.print(str.slice(str.lastIndexOf('/') + 1));
													lib.node.fs.writeFile(__dirname + '/' + str, zip.files[str].asNodeBuffer(), null, writeFile);
												} else {
													assetLoaded();
												}
											};
											game.ensureDirectory(directorylist, writeFile);

										} else {
											var getDirectory = function() {
												if (directorylist.length) {
													var dir = directorylist.shift();
													var filelist = directories[dir];
													window.resolveLocalFileSystemURL(lib.assetURL + dir,
													function(entry) {
														var writeFile = function() {
															if (filelist.length) {
																var filename = filelist.shift();
																game.print(filename);
																entry.getFile(filename, {
																	create: true
																},
																function(fileEntry) {
																	fileEntry.createWriter(function(fileWriter) {
																		fileWriter.onwriteend = writeFile;
																		fileWriter.onerror = function(e) {
																			game.print('Write failed: ' + e.toString());
																		};
																		fileWriter.write(zip.files[dir + '/' + filename].asArrayBuffer());
																	});
																});
															} else {
																getDirectory();
															}
														};
														writeFile();
													});
												} else {
													assetLoaded();
												}
											};
											game.ensureDirectory(directorylist, getDirectory);
										}
									} else {
										promptnode.style.display = 'none';
									}
								} else {
									alert('没有检测到素材');
								}
							}
							if (!window.JSZip) {
								lib.init.js(lib.assetURL + 'game', 'jszip', loadData);
							} else {
								loadData();
							}
						};
						fileReader.readAsArrayBuffer(fileToLoad, "UTF-8");
					}
				}

				var dashboard = ui.create.div(pageboard);
				var clickDash = function() {
					ui.create.templayer();
					pageboard.hide();
					this.link.show();
					if (this.link.init) {
						this.link.init();
					}
				};
				var createDash = function(str1, str2, node) {
					var dash = ui.create.div('.menubutton.large.dashboard');
					dashboard.appendChild(dash);
					page.appendChild(node);
					dash.link = node;
					node.link = dash;
					dash.listen(clickDash);
					lib.setScroll(node);
					ui.create.div('', str1, dash);
					ui.create.div('', str2, dash);
				};
				var createDash2 = function(str1, str2, path, page) {
					var dash = ui.create.div('.menubutton.large.dashboard.dashboard2');
					page.appendChild(dash);
					dash.listen(function() {
						page.path = path;
						enterDirectory(page, path);
					});
					ui.create.div('', str1, dash);
					ui.create.div('', str2, dash);
				};
				var removeFile = function(selected, page) {
					if (lib.node && lib.node.fs) {
						var unlink = function() {
							if (selected.length) {
								lib.node.fs.unlink(__dirname + '/' + selected.shift().path, unlink);
							} else {
								enterDirectory(page, page.currentpath);
							}
						}
						unlink();
					} else {
						window.resolveLocalFileSystemURL(lib.assetURL + page.currentpath,
						function(entry) {
							var unlink = function() {
								if (selected.length) {
									entry.getFile(selected.shift().filename, {
										create: false
									},
									function(fileEntry) {
										fileEntry.remove(unlink);
									});
								} else {
									enterDirectory(page, page.currentpath);
								}
							}
							unlink();
						});
					}
				};
				var clickDirectory = function() {
					if (_status.dragged) return;
					var page = this.parentNode.parentNode.parentNode;
					if (page.deletebutton.classList.contains('active')) {
						if (confirm('确认删除' + this.innerHTML + '文件夹？（此操作不可撤销）')) {
							if (lib.node && lib.node.fs) {
								try {
									var removeDirectory = function(path, callback) {
										lib.node.fs.readdir(__dirname + '/' + path,
										function(err, list) {
											if (err) {
												console.log(err);
												return;
											}
											var removeFile = function() {
												if (list.length) {
													var filename = list.shift();
													var url = __dirname + '/' + path + '/' + filename;
													if (lib.node.fs.statSync(url).isDirectory()) {
														removeDirectory(path + '/' + filename, removeFile);
													} else {
														lib.node.fs.unlink(url, removeFile);
													}
												} else {
													lib.node.fs.rmdir(__dirname + '/' + path, callback);
												}
											}
											removeFile();
										});
									};
									removeDirectory(this.path,
									function() {
										enterDirectory(page, page.currentpath);
									});
								} catch(e) {
									console.log(e);
								}
							} else {
								window.resolveLocalFileSystemURL(lib.assetURL + this.path,
								function(entry) {
									entry.removeRecursively(function() {
										enterDirectory(page, page.currentpath);
									});
								});
							}
						}
						return;
					}
					enterDirectory(page, this.path);
				};
				var clickFile = function() {
					if (_status.dragged) return;
					var page = this.parentNode.parentNode.parentNode;
					if (page.deletebutton.classList.contains('active')) {
						if (confirm('确认删除' + this.innerHTML + '？（此操作不可撤销）')) {
							removeFile([this], page);
						}
						return;
					}
					this.classList.toggle('thundertext');
					page.clicked = true;
					if (this.ext == 'jpg' || this.ext == 'png') {
						if (this.classList.contains('thundertext')) {
							if (!this.previewnode) {
								this.previewnode = document.createElement('img');
								this.previewnode.src = lib.assetURL + this.path;
								this.previewnode.width = '60';
								this.previewnode.style.maxHeight = '120px';
								this.parentNode.appendChild(this.previewnode);
							}
						} else {
							if (this.previewnode) {
								this.previewnode.remove();
								delete this.previewnode;
							}
						}
					} else if (this.ext == 'mp3' || this.ext == 'ogg') {
						if (this.classList.contains('thundertext')) {
							if (!this.previewnode) {
								this.previewnode = game.playAudio(this.path.slice(6));
							}
						} else {
							if (this.previewnode) {
								this.previewnode.remove();
								delete this.previewnode;
							}
						}
					}
				};
				var clickFileList = function() {
					if (!this.parentNode) return;
					if (this.parentNode.clicked) {
						this.parentNode.clicked = false;
					} else {
						var selected = Array.from(this.querySelectorAll('span.thundertext'));
						for (var i = 0; i < selected.length; i++) {
							selected[i].classList.remove('thundertext');
							if (selected[i].previewnode) {
								selected[i].previewnode.remove();
								delete selected[i].previewnode;
							}
						}
					}
				};
				var enterDirectory = function(page, path) {
					page.innerHTML = '';
					page.currentpath = path;
					var backbutton = ui.create.div('.menubutton.roundo', '返', page,
					function() {
						page.clicked = false;
						clickFileList.call(filelist);
						if (page.path == path) {
							page.reset();
						} else {
							if (path.indexOf('/') == -1) {
								enterDirectory(page, '');
							} else {
								enterDirectory(page, path.slice(0, path.lastIndexOf('/')));
							}
						}
					});
					backbutton.style.zIndex = 1;
					backbutton.style.right = '10px';
					backbutton.style.bottom = '15px';

					var refresh = function() {
						enterDirectory(page, path);
					};
					var addbutton = ui.create.div('.menubutton.roundo', '添', page,
					function() {
						var pos1 = this.getBoundingClientRect();
						var pos2 = ui.window.getBoundingClientRect();
						openMenu(this.menu, {
							clientX: pos1.left + pos1.width + 5 - pos2.left,
							clientY: pos1.top - pos2.top
						});
					});
					addbutton.menu = ui.create.div('.menu');
					ui.create.div('', '添加文件', addbutton.menu,
					function() {
						popupContainer.noclose = true;
					});
					var createDir = function(str) {
						if (lib.node && lib.node.fs) {
							lib.node.fs.mkdir(__dirname + '/' + path + '/' + str, refresh);
						} else {
							window.resolveLocalFileSystemURL(lib.assetURL + path,
							function(entry) {
								entry.getDirectory(str, {
									create: true
								},
								refresh);
							});
						}
					};
					ui.create.div('', '添加目录', addbutton.menu,
					function() {
						ui.create.templayer();
						game.prompt('输入目录名称',
						function(str) {
							if (str) {
								createDir(str);
							}
						});
					});
					var input = document.createElement('input');
					input.className = 'fileinput';
					input.type = 'file';
					input.onchange = function() {
						var fileToLoad = input.files[0];
						game.print(fileToLoad.name);
						if (fileToLoad) {
							var fileReader = new FileReader();
							fileReader.onload = function(e) {
								game.writeFile(e.target.result, path, fileToLoad.name, refresh);
							};
							fileReader.readAsArrayBuffer(fileToLoad, "UTF-8");
						}
					};
					addbutton.menu.firstChild.appendChild(input);
					addbutton.style.zIndex = 1;
					addbutton.style.right = '10px';
					addbutton.style.bottom = '80px';

					var deletebutton = ui.create.div('.menubutton.roundo', '删', page,
					function() {
						if (!this.parentNode) return;
						if (!this.classList.contains('active')) {
							var selected = Array.from(filelist.querySelectorAll('span.thundertext'));
							if (selected.length) {
								if (confirm('一共要删除' + selected.length + '个文件，此操作不可撤销，是否确定？')) {
									removeFile(selected, page);
								}
							} else {
								this.classList.add('active');
							}
						} else {
							this.classList.remove('active');
						}
					});
					deletebutton.style.zIndex = 1;
					deletebutton.style.right = '10px';
					deletebutton.style.bottom = '145px';

					page.backbutton = backbutton;
					page.addbutton = addbutton;
					page.deletebutton = deletebutton;
					var filelist = ui.create.div(page);
					filelist.classList.add('file-container');
					filelist.listen(clickFileList);
					lib.setScroll(filelist);
					game.getFileList(path,
					function(folders, files) {
						var sort = function(a, b) {
							if (a > b) return 1;
							if (a < b) return - 1;
							return 0;
						}
						folders.sort(sort);
						files.sort(sort);
						var parent = path;
						if (parent) {
							parent += '/';
						}
						for (var i = 0; i < folders.length; i++) {
							if (!page.path && folders[i] == 'app') continue;
							var entry = ui.create.div('', '<span>' + folders[i], filelist);
							entry.firstChild.addEventListener(lib.config.touchscreen ? 'touchend': 'click', clickDirectory);
							entry.firstChild.path = parent + folders[i]
						}
						for (var i = 0; i < files.length; i++) {
							if (!page.path) {
								if (files[i] == 'app.html') continue;
								if (files[i] == 'main.js') continue;
								if (files[i] == 'package.json') continue;
							}
							var entry = ui.create.div('', '<span>' + files[i], filelist);
							entry.firstChild.addEventListener(lib.config.touchscreen ? 'touchend': 'click', clickFile);
							entry.firstChild.ext = files[i].slice(files[i].lastIndexOf('.') + 1);
							entry.firstChild.path = parent + files[i];
							entry.firstChild.filename = files[i];
						}
					});
				};
				var dash1 = (function() {
					var page = ui.create.div('.hidden.menu-buttons');
					page.reset = function() {
						page.innerHTML = '';
						var backbutton = ui.create.div('.menubutton.roundo', '返', page,
						function() {
							ui.create.templayer();
							page.hide();
							pageboard.show();
						});
						backbutton.style.zIndex = 1;
						backbutton.style.right = '10px';
						backbutton.style.bottom = '15px';
						var placeholder = ui.create.div('.placeholder', page);
						placeholder.style.position = 'relative';
						placeholder.style.display = 'block';
						placeholder.style.width = '100%';
						placeholder.style.height = '14px';
						createDash2('将', '武将图片', 'image/character', page);
						createDash2('肤', '皮肤图片', 'image/skin', page);
						createDash2('卡', '卡牌图片', 'image/card', page);
						createDash2('模', '模式图片', 'image/mode', page);
						createDash2('始', '开始图片', 'image/splash', page);
						createDash2('景', '背景图片', 'image/background', page);
					};
					page.reset();
					return page;
				} ());
				var dash2 = (function() {
					var page = ui.create.div('.hidden.menu-buttons');
					page.reset = function() {
						page.innerHTML = '';
						var backbutton = ui.create.div('.menubutton.roundo', '返', page,
						function() {
							ui.create.templayer();
							page.hide();
							pageboard.show();
						});
						backbutton.style.zIndex = 1;
						backbutton.style.right = '10px';
						backbutton.style.bottom = '15px';
						var placeholder = ui.create.div('.placeholder', page);
						placeholder.style.position = 'relative';
						placeholder.style.display = 'block';
						placeholder.style.width = '100%';
						placeholder.style.height = '14px';
						createDash2('技', '技能配音', 'audio/skill', page);
						createDash2('卡', '男性卡牌', 'audio/card/male', page);
						createDash2('牌', '女性卡牌', 'audio/card/female', page);
						createDash2('亡', '阵亡配音', 'audio/die', page);
						createDash2('效', '游戏音效', 'audio/effect', page);
						createDash2('景', '背景音乐', 'audio/background', page);
					};
					page.reset();
					return page;
				} ());
				var dash3 = (function() {
					var page = ui.create.div('.hidden.menu-buttons');
					page.path = 'font';
					page.reset = function() {
						ui.create.templayer();
						page.hide();
						pageboard.show();
					};
					page.init = function() {
						enterDirectory(page, 'font');
					};
					return page;
				} ());
				var dash4 = (function() {
					var page = ui.create.div('.hidden.menu-buttons');
					page.path = '';
					page.reset = function() {
						ui.create.templayer();
						page.hide();
						pageboard.show();
					};
					page.init = function() {
						enterDirectory(page, '');
					};
					return page;
				} ());
				createDash('图', '图片文件', dash1);
				createDash('音', '音频文件', dash2);
				createDash('字', '字体文件', dash3);
				createDash('全', '全部文件', dash4);
			} ());
			createModeConfig('others', start.firstChild);

			var active = start.firstChild.querySelector('.active');
			if (!active) {
				active = start.firstChild.firstChild;
				active.classList.add('active');
			}
			rightPane.appendChild(active.link);
		} ());

		(function() {
			var start = menuxpages.shift();
			var rightPane = start.lastChild;

			var clickMode = function() {
			game.playAudio('../extension/手杀ui/audio/TinyButton.mp3');
			/*武将栏左侧的声音*/
				var active = this.parentNode.querySelector('.active');
				if (active) {
					if (active === this) {
						return;
					}
					active.classList.remove('active');
					active.link.remove();
				}
				this.classList.add('active');
				updateActive(this);
				rightPane.appendChild(this.link);
			};
			updateActive = function(node) {
				if (!node) {
					node = start.firstChild.querySelector('.active');
					if (!node) {
						return;
					}
				}
				for (var i = 0; i < node.link.childElementCount; i++) {
					if (node.link.childNodes[i].updateBanned) {
						node.link.childNodes[i].updateBanned();
					}
				}
			};
			var updateNodes = function() {
				for (var i = 0; i < start.firstChild.childNodes.length; i++) {
					var node = start.firstChild.childNodes[i];
					if (node.link) {
						if (node.mode.indexOf('mode_') == 0) continue;
						if (node.mode == 'custom') continue;
						if (connectMenu) {
							if (!lib.config.connect_characters.contains(node.mode)) {
								node.classList.remove('off');
								node.link.firstChild.classList.add('on');
							} else {
								node.classList.add('off');
								node.link.firstChild.classList.remove('on');
							}
						} else {
							if (lib.config.characters.contains(node.mode)) {
								node.classList.remove('off');
								node.link.firstChild.classList.add('on');
							} else {
								node.classList.add('off');
								node.link.firstChild.classList.remove('on');
							}
						}
					}
				}
			}
			var togglePack = function(bool) {
				var name = this._link.config._name;
				if (connectMenu) {
					if (!bool) {
						lib.config.connect_characters.add(name);
					} else {
						lib.config.connect_characters.remove(name);
					}
					game.saveConfig('connect_characters', lib.config.connect_characters);
				} else {
					if (bool) {
						lib.config.characters.add(name);
					} else {
						lib.config.characters.remove(name);
					}
					game.saveConfig('characters', lib.config.characters);
				}
				updateNodes();
			};

			var createModeConfig = function(mode, position, position2) {
				var info = lib.characterPack[mode];
				var page = ui.create.div('');
				var node = ui.create.div('.menubutton.large', lib.translate[mode + '_character_config'], position, clickMode);
				if (node.innerHTML.length >= 5) {
					node.classList.add('smallfont');
				}
				if (position2) {
					position.insertBefore(node, position2);
				}
				node.link = page;
				node.mode = mode;
				page.node = node;
				var list = [];
				var boolAI = true;
				var alterableSkills = [];
				var alterableCharacters = [];
				var charactersToAlter = [];
				for (var i in info) {
					if (info[i][4] && info[i][4].contains('unseen')) continue;
					if (connectMenu && lib.connectBanned.contains(i)) continue;
					list.push(i);
					if (boolAI && !lib.config.forbidai_user.contains(i)) boolAI = false;
					for (var j = 0; j < info[i][3].length; j++) {
						if (!lib.skill[info[i][3][j]]) {
							continue;
						}
						if (lib.skill[info[i][3][j]].alter) {
							alterableSkills.add(info[i][3][j]);
							alterableCharacters.add(i);
							if (lib.config.vintageSkills.contains(info[i][3][j])) {
								charactersToAlter.add(i);
							}
						}
					}
				}
				alterableCharacters.sort();
				var getGroup = function(name) {
					var group = get.is.double(name, true);
					if (group) return group[0];
					return lib.character[name][1];
				};
				var groupSort = function(name) {
					if (!lib.character[name]) return 7;
					var group = getGroup(name);
					if (group == 'devil') return - 2;
					if (group == 'shen') return - 1;
					if (group == 'wei') return 0;
					if (group == 'shu') return 1;
					if (group == 'wu') return 2;
					if (group == 'qun') return 3;
					if (group == 'jin') return 4;
					if (group == 'key') return 5;
					if (group == 'western') return 6;
					return 7;
				}
				list.sort(function(a, b) {
					var del = groupSort(a) - groupSort(b);
					if (del != 0) return del;
					var aa = a,
					bb = b;
					if (a.lastIndexOf('_') != -1) {
						a = a.slice(a.lastIndexOf('_') + 1);
					}
					if (b.lastIndexOf('_') != -1) {
						b = b.slice(b.lastIndexOf('_') + 1);
					}
					if (a != b) {
						return a > b ? 1 : -1;
					}
					return aa > bb ? 1 : -1;
				});
				var list2 = list.slice(0);
				var cfgnode = createConfig({
					name: '开启',
					_name: mode,
					init: lib.config.characters.contains(mode),
					onclick: togglePack
				});
				var cfgnodeAI = createConfig({
					name: '仅点将可用',
					_name: mode,
					init: boolAI,
					intro: '将该武将包内的武将全部设置为仅点将可用',
					onclick: function(bool) {
						if (bool) {
							for (var i = 0; i < list.length; i++) {
								lib.config.forbidai_user.add(list[i]);
							}
						} else {
							for (var i = 0; i < list.length; i++) {
								lib.config.forbidai_user.remove(list[i]);
							}
						}
						game.saveConfig('forbidai_user', lib.config.forbidai_user);
					},
				});
				if (mode.indexOf('mode_') != 0) {
					cfgnodeAI.style.marginTop = '0px';
					page.appendChild(cfgnode);
					page.appendChild(cfgnodeAI);
					if (alterableCharacters.length) {
						var cfgnode2 = createConfig({
							name: '新版替换',
							_name: mode,
							init: charactersToAlter.length == 0,
							intro: '以下武将将被修改：' + get.translation(alterableCharacters),
							onclick: function(bool) {
								if (bool) {
									for (var i = 0; i < alterableSkills.length; i++) {
										lib.config.vintageSkills.remove(alterableSkills[i]);
										lib.translate[alterableSkills[i] + '_info'] = lib.translate[alterableSkills[i] + '_info_alter'];
									}
								} else {
									for (var i = 0; i < alterableSkills.length; i++) {
										lib.config.vintageSkills.add(alterableSkills[i]);
										lib.translate[alterableSkills[i] + '_info'] = lib.translate[alterableSkills[i] + '_info_origin'];
									}
								}
								game.saveConfig('vintageSkills', lib.config.vintageSkills);
							}
						});
						cfgnode2.style.marginTop = '0px';
						page.appendChild(cfgnode2);
					}
				} else if (mode.indexOf('mode_extension') == 0) {
					page.appendChild(cfgnodeAI);
				} else {
					page.style.paddingTop = '8px';
				}
				var banCharacter = function(e) {
					if (_status.clicked) {
						_status.clicked = false;
						return;
					}
					if (mode.indexOf('mode_') == 0 && mode.indexOf('mode_extension_') != 0 && mode != 'mode_favourite' && mode != 'mode_banned') {
						if (!connectMenu && lib.config.show_charactercard) {
							ui.click.charactercard(this.link, this, mode == 'mode_guozhan' ? 'guozhan': true);
						}
						return;
					}
					ui.click.touchpop();
					this._banning = connectMenu ? 'online': 'offline';
					if (!connectMenu && lib.config.show_charactercard) {
						ui.click.charactercard(this.link, this);
					} else {
						ui.click.intro.call(this, e);
					}
					_status.clicked = false;
					delete this._banning;
				};
				var updateBanned = function() {
					var list;
					if (connectMenu) {
						var mode = menux.pages[0].firstChild.querySelector('.active');
						if (mode && mode.mode) {
							list = lib.config['connect_' + mode.mode + '_banned'];
						}
					} else {
						list = lib.config[get.mode() + '_banned'];
					}
					if (list && list.contains(this.link)) {
						this.classList.add('banned');
					} else {
						this.classList.remove('banned');
					}
				};
				if (lib.characterSort[mode]) {
					var listb = [];
					if (!connectMenu) {
						listb = lib.config[get.mode() + '_banned'] || [];
					} else {
						var modex = menux.pages[0].firstChild.querySelector('.active');
						if (modex && modex.mode) {
							listb = lib.config['connect_' + modex.mode + '_banned'];
						}
					}
					for (var pak in lib.characterSort[mode]) {
						var info = lib.characterSort[mode][pak];
						var listx = [];
						var boolx = false;
						for (var ii = 0; ii < list2.length; ii++) {
							if (info.contains(list2[ii])) {
								listx.add(list2[ii]);
								if (!listb.contains(list2[ii])) boolx = true;
								list2.splice(ii--, 1);
							}
						}
						if (listx.length) {
							var cfgnodeY = {
								name: lib.translate[pak],
								_name: pak,
								init: boolx,
								onclick: function(bool) {
									var banned = [];
									if (connectMenu) {
										var modex = menux.pages[0].firstChild.querySelector('.active');
										if (modex && modex.mode) {
											banned = lib.config['connect_' + modex.mode + '_banned'];
										}
									} else if (_status.connectMode) return;
									else banned = lib.config[get.mode() + '_banned'] || [];
									var listx = lib.characterSort[mode][this._link.config._name];
									if (bool) {
										for (var i = 0; i < listx.length; i++) {
											banned.remove(listx[i]);
										}
									} else {
										for (var i = 0; i < listx.length; i++) {
											banned.add(listx[i]);
										}
									}
									game.saveConfig(connectMenu ? ('connect_' + modex.mode + '_banned') : (get.mode() + '_banned'), banned);
									updateActive();
								},
							};
							if (mode.indexOf('mode_') == 0 && mode.indexOf('mode_extension_') != 0 && mode.indexOf('mode_guozhan') != 0) {
								cfgnodeY.clear = true;
								delete cfgnodeY.onclick;
							}
							var cfgnodeX = createConfig(cfgnodeY);
							page.appendChild(cfgnodeX);
							var buttons = ui.create.buttons(listx, 'character', page);
							for (var i = 0; i < buttons.length; i++) {
								buttons[i].classList.add('noclick');
								buttons[i].listen(banCharacter);
								ui.create.rarity(buttons[i]);
								buttons[i].node.hp.style.transition = 'all 0s';
								buttons[i].node.hp._innerHTML = buttons[i].node.hp.innerHTML;
								if (mode != 'mode_banned') {
									buttons[i].updateBanned = updateBanned;
								}
							}
						}
					}
					if (list2.length) {
						var cfgnodeX = createConfig({
							name: '其他',
							_name: 'others',
							clear: true,
						});
						page.appendChild(cfgnodeX);
						var buttons = ui.create.buttons(list2, 'character', page);
						for (var i = 0; i < buttons.length; i++) {
							buttons[i].classList.add('noclick');
							buttons[i].listen(banCharacter);
							ui.create.rarity(buttons[i]);
							buttons[i].node.hp.style.transition = 'all 0s';
							buttons[i].node.hp._innerHTML = buttons[i].node.hp.innerHTML;
							if (mode != 'mode_banned') {
								buttons[i].updateBanned = updateBanned;
							}
						}
					}
				} else {
					var buttons = ui.create.buttons(list, 'character', page);
					for (var i = 0; i < buttons.length; i++) {
						buttons[i].classList.add('noclick');
						ui.create.rarity(buttons[i]);
						buttons[i].listen(banCharacter);
						buttons[i].node.hp.style.transition = 'all 0s';
						buttons[i].node.hp._innerHTML = buttons[i].node.hp.innerHTML;
						if (mode != 'mode_banned') {
							buttons[i].updateBanned = updateBanned;
						}
					}
				}
				page.classList.add('menu-buttons');
				page.classList.add('leftbutton');
				if (!connectMenu) {
					if (mode.indexOf('mode_') != 0) {
						ui.create.div('.config.pointerspan', '<span>隐藏武将包</span>', page,
						function() {
							if (this.firstChild.innerHTML == '隐藏武将包') {
								this.firstChild.innerHTML = '武将包将在重启后隐藏';
								lib.config.hiddenCharacterPack.add(mode);
								if (!lib.config.prompt_hidepack) {
									alert('隐藏的扩展包可通过选项-其它-重置隐藏内容恢复');
									game.saveConfig('prompt_hidepack', true);
								}
							} else {
								this.firstChild.innerHTML = '隐藏武将包';
								lib.config.hiddenCharacterPack.remove(mode);
							}
							game.saveConfig('hiddenCharacterPack', lib.config.hiddenCharacterPack);
						});
					}
				}
				return node;
			};
			if (lib.config.show_favourite_menu && !connectMenu && Array.isArray(lib.config.favouriteCharacter)) {
				lib.characterPack.mode_favourite = {};
				for (var i = 0; i < lib.config.favouriteCharacter.length; i++) {
					var favname = lib.config.favouriteCharacter[i];
					if (lib.character[favname]) {
						lib.characterPack.mode_favourite[favname] = lib.character[favname];
					}
				}
				ui.favouriteCharacter = createModeConfig('mode_favourite', start.firstChild).link;
				if (get.is.empty(lib.characterPack.mode_favourite)) {
					ui.favouriteCharacter.node.style.display = 'none';
				}
				delete lib.characterPack.mode_favourite;
			}
			if (!connectMenu && lib.config.show_ban_menu) {
				lib.characterPack.mode_banned = {};
				for (var i = 0; i < lib.config.all.mode.length; i++) {
					var banned = lib.config[lib.config.all.mode[i] + '_banned'];
					if (banned) {
						for (var j = 0; j < banned.length; j++) {
							if (lib.character[banned[j]]) {
								lib.characterPack.mode_banned[banned[j]] = lib.character[banned[j]];
							}
						}
					}
				}
				var bannednode = createModeConfig('mode_banned', start.firstChild);
				if (get.is.empty(lib.characterPack.mode_banned)) {
					bannednode.style.display = 'none';
				}
				delete lib.characterPack.mode_banned;
			}
			var characterlist = connectMenu ? lib.connectCharacterPack: lib.config.all.characters;
			for (var i = 0; i < characterlist.length; i++) {
				createModeConfig(characterlist[i], start.firstChild);
			}
			if (!connectMenu) {
				for (var i in lib.characterPack) {
					if (i.indexOf('mode_') == 0) {
						createModeConfig(i, start.firstChild);
					}
				}
			}
			var active = start.firstChild.querySelector('.active');
			if (!active) {
				active = start.firstChild.firstChild;
				if (active.style.display == 'none') {
					active = active.nextSibling;
					if (active.style.display == 'none') {
						active = active.nextSibling;
					}
				}
				active.classList.add('active');
				updateActive(active);
			}
			rightPane.appendChild(active.link);

			if (!connectMenu) {
				var node1 = ui.create.div('.lefttext', '全部开启', start.firstChild,
				function() {
				game.playAudio('../extension/手杀ui/audio/TinyButton.mp3');
					game.saveConfig('characters', lib.config.all.characters);
					updateNodes();
				});
				var node2 = ui.create.div('.lefttext', '恢复默认', start.firstChild,
				function() {
				game.playAudio('../extension/手杀ui/audio/TinyButton.mp3');
					game.saveConfig('characters', lib.config.defaultcharacters);
					updateNodes();
				});
				node1.style.marginTop = '12px';
				node2.style.marginTop = '7px';
			}

			updateNodes();
		} ());

		(function() {
			var start = menuxpages.shift();
			var rightPane = start.lastChild;
			var pileCreated = false;
			var recreatePile = function() {
				lib.config.customcardpile['当前牌堆'] = [lib.config.bannedpile, lib.config.addedpile];
				game.saveConfig('customcardpile', lib.config.customcardpile);
				game.saveConfig('cardpilename', '当前牌堆', true);
				pileCreated = false;
			};

			var clickMode = function() {
			game.playAudio('../extension/手杀ui/audio/TinyButton.mp3');
			/*卡牌栏左侧*/
				var active = this.parentNode.querySelector('.active');
				if (active === this) {
					return;
				}
				active.classList.remove('active');
				active.link.remove();
				active = this;
				this.classList.add('active');
				updateActiveCard(this);
				if (this.mode == 'cardpile') {
					this.create();
				}
				rightPane.appendChild(this.link);
			};
			updateActiveCard = function(node) {
				if (!node) {
					node = start.firstChild.querySelector('.active');
					if (!node) {
						return;
					}
				}
				for (var i = 0; i < node.link.childElementCount; i++) {
					if (node.link.childNodes[i].updateBanned) {
						node.link.childNodes[i].updateBanned();
					}
				}
			};
			var updateNodes = function() {
				for (var i = 0; i < start.firstChild.childNodes.length; i++) {
					var node = start.firstChild.childNodes[i];
					if (node.link) {
						if (node.mode.indexOf('mode_') == 0) continue;
						if (node.mode == 'custom') continue;
						if (node.mode == 'cardpile') continue;
						if (connectMenu) {
							if (!lib.config.connect_cards.contains(node.mode)) {
								node.classList.remove('off');
								node.link.firstChild.classList.add('on');
							} else {
								node.classList.add('off');
								node.link.firstChild.classList.remove('on');
							}
						} else {
							if (lib.config.cards.contains(node.mode)) {
								node.classList.remove('off');
								node.link.firstChild.classList.add('on');
							} else {
								node.classList.add('off');
								node.link.firstChild.classList.remove('on');
							}
						}
					}
				}
			}
			var togglePack = function(bool) {
				var name = this._link.config._name;
				if (connectMenu) {
					if (!bool) {
						lib.config.connect_cards.add(name);
					} else {
						lib.config.connect_cards.remove(name);
					}
					game.saveConfig('connect_cards', lib.config.connect_cards);
				} else {
					if (bool) {
						lib.config.cards.add(name);
					} else {
						lib.config.cards.remove(name);
					}
					game.saveConfig('cards', lib.config.cards);
				}
				updateNodes();
			};
			var toggleCardPile = function(bool) {
				var name = this._link.config._name;
				var number = this._link.config._number;
				if (!lib.config.bannedpile[name]) {
					lib.config.bannedpile[name] = [];
				}
				if (bool) {
					lib.config.bannedpile[name].remove(number);
				} else {
					lib.config.bannedpile[name].add(number);
				}
				recreatePile();
			}

			var createModeConfig = function(mode, position) {
				var info = lib.cardPack[mode];
				var page = ui.create.div('');
				var node = ui.create.div('.menubutton.large', lib.translate[mode + '_card_config'], position, clickMode);
				if (node.innerHTML.length >= 5) {
					node.classList.add('smallfont');
				}
				node.link = page;
				node.mode = mode;
				var list = [];
				for (var i = 0; i < info.length; i++) {
					if (!lib.card[info[i]] || (lib.card[info[i]].derivation && mode != 'mode_derivation')) continue;
					list.push(['', get.translation(get.type(info[i], 'trick')), info[i]]);
				}
				var sortCard = function(card) {
					var type = lib.card[card[2]].type;
					var subtype = lib.card[card[2]].subtype;
					if (lib.cardType[subtype]) {
						return lib.cardType[subtype];
					}
					if (lib.cardType[type]) {
						return lib.cardType[type];
					}
					switch (type) {
					case 'basic':
						return 0;
					case 'chess':
						return 1.5;
					case 'trick':
						return 2;
					case 'delay':
						return 3;
					case 'equip':
						{
							switch (lib.card[card[2]].subtype) {
							case 'equip1':
								return 4.1;
							case 'equip2':
								return 4.2;
							case 'equip3':
								return 4.3;
							case 'equip4':
								return 4.4;
							case 'equip5':
								return 4.5;
							default:
								return 4;
							}
						}
					case 'zhenfa':
						return 5;
					default:
						return 6;
					}
				}
				list.sort(function(a, b) {
					var sort1 = sortCard(a);
					var sort2 = sortCard(b);
					if (sort1 == sort2) {
						return (b[2] < a[2]) ? 1 : -1;
					} else if (sort1 > sort2) {
						return 1;
					} else {
						return - 1;
					}
				});
				var cfgnode = createConfig({
					name: '开启',
					_name: mode,
					init: lib.config.cards.contains(mode),
					onclick: togglePack
				});
				if (mode.indexOf('mode_') != 0) {
					page.appendChild(cfgnode);
				} else {
					page.style.paddingTop = '8px';
				}
				var banCard = function(e) {
					if (_status.clicked) {
						_status.clicked = false;
						return;
					}
					if (mode.indexOf('mode_') == 0 && mode.indexOf('mode_extension_') != 0 && mode != 'mode_banned') {
						return;
					}
					ui.click.touchpop();
					this._banning = connectMenu ? 'online': 'offline';
					ui.click.intro.call(this, e);
					_status.clicked = false;
					delete this._banning;
				};
				var updateBanned = function() {
					var list;
					if (connectMenu) {
						var mode = menux.pages[0].firstChild.querySelector('.active');
						if (mode && mode.mode) {
							list = lib.config['connect_' + mode.mode + '_bannedcards'];
						}
					} else {
						list = lib.config[get.mode() + '_bannedcards'];
					}
					if (list && list.contains(this.link[2])) {
						this.classList.add('banned');
					} else {
						this.classList.remove('banned');
					}
				};
				var buttons = ui.create.buttons(list, 'vcard', page);
				for (var i = 0; i < buttons.length; i++) {
					buttons[i].classList.add('noclick');
					buttons[i].listen(banCard);
					if (mode != 'mode_banned') {
						buttons[i].updateBanned = updateBanned;
					}
				}
				page.classList.add('menu-buttons');
				page.classList.add('leftbutton');
				if (!connectMenu && mode.indexOf('mode_') != 0) {
					ui.create.div('.config.pointerspan', '<span>隐藏卡牌包</span>', page,
					function() {
						if (this.firstChild.innerHTML == '隐藏卡牌包') {
							this.firstChild.innerHTML = '卡牌包将在重启后隐藏';
							lib.config.hiddenCardPack.add(mode);
							if (!lib.config.prompt_hidepack) {
								alert('隐藏的扩展包可通过选项-其它-重置隐藏内容恢复');
								game.saveConfig('prompt_hidepack', true);
							}
						} else {
							this.firstChild.innerHTML = '隐藏卡牌包';
							lib.config.hiddenCardPack.remove(mode);
						}
						game.saveConfig('hiddenCardPack', lib.config.hiddenCardPack);
					});
				}
				if (mode.indexOf('mode_') != 0 && lib.cardPile[mode]) {
					var cardpileNodes = [];
					var cardpileexpanded = false;
					if (!lib.config.bannedpile[mode]) {
						lib.config.bannedpile[mode] = [];
					}
					if (!lib.config.addedpile[mode]) {
						lib.config.addedpile[mode] = [];
					}
					ui.create.div('.config.more.pile', '编辑牌堆 <div>&gt;</div>', page,
					function() {
						if (cardpileexpanded) {
							this.classList.remove('on');
							for (var k = 0; k < cardpileNodes.length; k++) {
								cardpileNodes[k].style.display = 'none';
							}
						} else {
							this.classList.add('on');
							for (var k = 0; k < cardpileNodes.length; k++) {
								cardpileNodes[k].style.display = '';
							}
						}
						cardpileexpanded = !cardpileexpanded;
					});
					var cfgnode = ui.create.div(page, '.config.pointerspan.cardpilecfg.toggle');
					var cfgaddcard = ui.create.node('button', '', '添加卡牌', cfgnode,
					function() {
						this.parentNode.nextSibling.classList.toggle('hidden');
					});
					var cfgbancard = ui.create.node('button', '', '全部关闭', cfgnode,
					function() {
						for (var i = 0; i < cardpileNodes.length; i++) {
							if (cardpileNodes[i].type == 'defaultcards' && cardpileNodes[i].classList.contains('on')) {
								clickToggle.call(cardpileNodes[i]);
							}
						}
					});
					var cfgenablecard = ui.create.node('button', '', '全部开启', cfgnode,
					function() {
						for (var i = 0; i < cardpileNodes.length; i++) {
							if (cardpileNodes[i].type == 'defaultcards' && !cardpileNodes[i].classList.contains('on')) {
								clickToggle.call(cardpileNodes[i]);
							}
						}
					});
					cfgbancard.style.marginLeft = '5px';
					cfgenablecard.style.marginLeft = '5px';
					cardpileNodes.push(cfgnode);
					cfgnode.style.display = 'none';
					cfgnode.classList.add('cardpilecfg');
					cfgnode.classList.add('toggle');
					cfgnode.style.marginTop = '5px';
					page.appendChild(cfgnode);

					var cardpileadd = ui.create.div('.config.toggle.hidden.cardpilecfg.cardpilecfgadd', page);
					var pileaddlist = [];
					for (var i = 0; i < lib.config.cards.length; i++) {
						if (!lib.cardPack[lib.config.cards[i]]) continue;
						for (var j = 0; j < lib.cardPack[lib.config.cards[i]].length; j++) {
							var cname = lib.cardPack[lib.config.cards[i]][j];
							pileaddlist.push([cname, get.translation(cname)]);
							if (cname == 'sha') {
								pileaddlist.push(['huosha', '火杀']);
								pileaddlist.push(['leisha', '雷杀']);
								pileaddlist.push(['icesha', '冰杀']);
								pileaddlist.push(['cisha', '刺杀']);
							}
						}
					}
					var cardpileaddname = ui.create.selectlist(pileaddlist, null, cardpileadd);
					cardpileaddname.style.width = '75px';
					cardpileaddname.style.marginRight = '2px';
					cardpileaddname.style.marginLeft = '-1px';
					var cardpileaddsuit = ui.create.selectlist([['heart', '红桃'], ['diamond', '方片'], ['club', '梅花'], ['spade', '黑桃'], ], null, cardpileadd);
					cardpileaddsuit.style.width = '53px';
					cardpileaddsuit.style.marginRight = '2px';
					var cardpileaddnumber = ui.create.selectlist([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], null, cardpileadd);
					cardpileaddnumber.style.width = '43px';
					cardpileaddnumber.style.marginRight = '2px';
					var button = document.createElement('button');
					button.innerHTML = '确定';
					button.style.width = '40px';
					var deletecard = function() {
						this.parentNode.remove();
						var info = this.parentNode._info;
						var list = lib.config.addedpile[mode];
						for (var i = 0; i < list.length; i++) {
							if (list[i][0] == info[0] && list[i][1] == info[1] && list[i][2] == info[2]) {
								list.splice(i, 1);
								break;
							}
						}
						recreatePile();
					};
					button.onclick = function() {
						var card = [cardpileaddsuit.value, cardpileaddnumber.value, cardpileaddname.value, ];
						lib.config.addedpile[mode].push(card);
						recreatePile();
						var cfgnode = ui.create.div('.config.toggle.cardpilecfg');
						cfgnode._info = card;
						cfgnode.innerHTML = get.translation(card[2]) + ' ' + get.translation(card[0]) + get.strNumber(card[1]);
						var cfgnodedelete = document.createElement('span');
						cfgnodedelete.classList.add('cardpiledelete');
						cfgnodedelete.innerHTML = '删除';
						cfgnodedelete.onclick = deletecard;
						cfgnode.appendChild(cfgnodedelete);
						page.insertBefore(cfgnode, cardpileadd.nextSibling);
					};
					cardpileadd.appendChild(button);
					cardpileadd.style.whiteSpace = 'nowrap';
					cardpileNodes.push(cardpileadd);

					for (var i = 0; i < lib.config.addedpile[mode].length; i++) {
						var card = lib.config.addedpile[mode][i];
						var cfgnode = ui.create.div('.config.toggle.cardpilecfg');
						cfgnode._info = card;
						cfgnode.innerHTML = get.translation(card[2]) + ' ' + get.translation(card[0]) + card[1];
						var cfgnodedelete = document.createElement('span');
						cfgnodedelete.classList.add('cardpiledelete');
						cfgnodedelete.innerHTML = '删除';
						cfgnodedelete.onclick = deletecard;
						cfgnode.appendChild(cfgnodedelete);
						cfgnode.style.display = 'none';
						cardpileNodes.push(cfgnode);
						page.appendChild(cfgnode);
					}

					for (var i = 0; i < lib.cardPile[mode].length; i++) {
						var card = lib.cardPile[mode][i];
						var cfgnode = createConfig({
							name: ((card[2] == 'sha' && card[3]) ? (get.translation(card[3])) : '') + get.translation(card[2]) + ' ' + get.translation(card[0]) + get.strNumber(card[1]),
							_number: i,
							_name: mode,
							init: !lib.config.bannedpile[mode].contains(i),
							onclick: toggleCardPile
						});
						cfgnode.type = 'defaultcards';
						cardpileNodes.push(cfgnode);
						cfgnode.style.display = 'none';
						cfgnode.classList.add('cardpilecfg');
						page.appendChild(cfgnode);
					}
					ui.create.div('.menuplaceholder', page);
				}
				return node;
			};
			if (!connectMenu && lib.config.show_ban_menu) {
				lib.cardPack.mode_banned = [];
				for (var i = 0; i < lib.config.all.mode.length; i++) {
					var banned = lib.config[lib.config.all.mode[i] + '_bannedcards'];
					if (banned) {
						for (var j = 0; j < banned.length; j++) {
							lib.cardPack.mode_banned.add(banned[j]);
						}
					}
				}
				var bannednode = createModeConfig('mode_banned', start.firstChild);
				if (lib.cardPack.mode_banned.length == 0) {
					bannednode.style.display = 'none';
				}
				delete lib.cardPack.mode_banned;
			}
			for (var i = 0; i < lib.config.all.cards.length; i++) {
				if (connectMenu && !lib.connectCardPack.contains(lib.config.all.cards[i])) continue;
				createModeConfig(lib.config.all.cards[i], start.firstChild);
			}
			if (!connectMenu) {
				for (var i in lib.cardPack) {
					if (i.indexOf('mode_') == 0) {
						createModeConfig(i, start.firstChild);
					}
				}
			}
			var active = start.firstChild.querySelector('.active');
			if (!active) {
				active = start.firstChild.firstChild;
				if (active.style.display == 'none') {
					active = active.nextSibling;
				}
				active.classList.add('active');
				updateActiveCard(active);
			}
			rightPane.appendChild(active.link);

			(function() {
				if (connectMenu) return;
				var page = ui.create.div('.menu-buttons');
				var node = ui.create.div('.menubutton.large', '牌堆', clickMode);
				start.firstChild.insertBefore(node, start.firstChild.querySelector('.lefttext'));
				node.link = page;
				node.mode = 'cardpile';
				node.create = function() {
					if (pileCreated) return;
					pileCreated = true;
					page.innerHTML = '';

					var pileList = null;
					var createList = function() {
						if (pileList) {
							pileList.remove();
						}
						var list = ['默认牌堆'];
						if (lib.config.customcardpile['当前牌堆']) {
							list.push('当前牌堆');
						}
						for (var i in lib.config.customcardpile) {
							list.add(i);
						}
						var currentpile = get.config('cardpilename');
						if (!currentpile) {
							if (list.contains('当前牌堆')) {
								currentpile = '当前牌堆';
							} else {
								currentpile = '默认牌堆';
							}
						}
						pileList = ui.create.selectlist(list, currentpile, pileChoose,
						function(e) {
							game.saveConfig('cardpilename', this.value, true);
							restart.style.display = '';
						});
						pileList.style.float = 'right';
					}
					var pileChoose = ui.create.div('.config.toggle.cardpilecfg.nomarginleft', '选择牌堆', page);
					createList();

					var pileDel = function() {
						delete lib.config.customcardpile[this.parentNode.link];
						this.parentNode.remove();
						game.saveConfig('customcardpile', lib.config.customcardpile);
						for (var i in lib.config.mode_config) {
							if (i == 'global') continue;
							if (lib.config.mode_config[i].cardpilename == this.parentNode.link) {
								game.saveConfig('cardpilename', null, i);
							}
						}
						createList();
					};

					var restart = ui.create.div('.config.more', '重新启动', game.reload, page);
					restart.style.display = 'none';
					var createPileNode = function(name) {
						var node = ui.create.div('.config.toggle.cardpilecfg.nomarginleft', name);
						node.link = name;
						var del = document.createElement('span');
						del.innerHTML = '删除';
						del.classList.add('cardpiledelete');
						del.onclick = pileDel;
						node.appendChild(del);
						if (name == '当前牌堆') {
							page.insertBefore(node, pileChoose.nextSibling);
						} else {
							page.insertBefore(node, restart);
						}
					};
					for (var i in lib.config.customcardpile) {
						createPileNode(i);
					}
					var exportCardPile;
					ui.create.div('.config.more', '保存当前牌堆 <div>&gt;</div>', page,
					function() {
						this.classList.toggle('on');
						if (this.classList.contains('on')) {
							exportCardPile.classList.remove('hidden');
						} else {
							exportCardPile.classList.add('hidden');
						}
					});
					exportCardPile = ui.create.div('.config.cardpileadd.indent', page);
					exportCardPile.classList.add('hidden');
					ui.create.div('', '名称：<input type="text"><button>确定</button>', exportCardPile);
					var input = exportCardPile.firstChild.lastChild.previousSibling;
					input.value = '自定义牌堆';
					input.style.marginRight = '3px';
					input.style.width = '120px';
					exportCardPile.firstChild.lastChild.onclick = function() {
						var name = input.value;
						var ok = true;
						if (lib.config.customcardpile[name] || name == '默认牌堆' || name == '当前牌堆') {
							for (var i = 1; i <= 1000; i++) {
								if (!lib.config.customcardpile[name + '(' + i + ')']) {
									name = name + '(' + i + ')';
									break;
								}
							}
						}
						lib.config.customcardpile[name] = [lib.config.bannedpile, lib.config.addedpile];
						delete lib.config.customcardpile['当前牌堆'];
						for (var i in lib.mode) {
							if (lib.config.mode_config[i] && (lib.config.mode_config[i].cardpilename == '当前牌堆' || !lib.config.mode_config[i].cardpilename)) {
								game.saveConfig('cardpilename', name, i);
							}
						}
						for (var i = 0; i < page.childElementCount; i++) {
							if (page.childNodes[i].link == '当前牌堆') {
								page.childNodes[i].remove();
								break;
							}
						}
						game.saveConfig('customcardpile', lib.config.customcardpile);
						createPileNode(name);
						createList();
					};
				}
			} ());

			if (!connectMenu) {
				var node1 = ui.create.div('.lefttext', '全部开启', start.firstChild,
				function() {
				game.playAudio('../extension/手杀ui/audio/TinyButton.mp3');
					game.saveConfig('cards', lib.config.all.cards);
					updateNodes();
				});
				var node2 = ui.create.div('.lefttext', '恢复默认', start.firstChild,
				function() {
				game.playAudio('../extension/手杀ui/audio/TinyButton.mp3');
					game.saveConfig('cards', lib.config.defaultcards);
					updateNodes();
				});
				node1.style.marginTop = '12px';
				node2.style.marginTop = '7px';
			}

			updateNodes();
		} ());

		(function() {
			if (connectMenu) return;
			var start = menuxpages.shift();
			var rightPane = start.lastChild;

			var clickMode = function() {
			game.playAudio('../extension/手杀ui/audio/TinyButton.mp3');
			/*扩展栏左侧的声音*/
				if (this.mode == 'get') {
					this.update();
				}
				var active = this.parentNode.querySelector('.active');
				if (active === this) {
					return;
				}
				active.classList.remove('active');
				active.link.remove();
				active = this;
				this.classList.add('active');
				rightPane.appendChild(this.link);
			};
			ui.click.extensionTab = function(name) {
				ui.click.menuTab('扩展');
				for (var i = 0; i < start.firstChild.childElementCount; i++) {
					if (start.firstChild.childNodes[i].innerHTML == name) {
						clickMode.call(start.firstChild.childNodes[i]);
						break;
					}
				}
			}
			var updateNodes = function() {
				for (var i = 0; i < start.firstChild.childNodes.length; i++) {
					var node = start.firstChild.childNodes[i];
					if (node.link) {
						if (node.mode == 'get') continue;
						if (node.mode == 'create') continue;
						if (node.mode.indexOf('extension_') == 0) {
							if (lib.config[node.mode + '_enable']) {
								node.classList.remove('off');
								node.link.firstChild.classList.add('on');
							} else {
								node.classList.add('off');
								node.link.firstChild.classList.remove('on');
							}
						} else {
							if (lib.config.plays.contains(node.mode)) {
								node.classList.remove('off');
								node.link.firstChild.classList.add('on');
							} else {
								node.classList.add('off');
								node.link.firstChild.classList.remove('on');
							}
						}
					}
				}
			}
			var togglePack = function(bool) {
				var name = this._link.config._name;
				if (name.indexOf('extension_') == 0) {
					if (bool) {
						game.saveConfig(name, true);
					} else {
						game.saveConfig(name, false);
					}
				} else {
					name = name.slice(0, name.indexOf('_enable_playpackconfig'));
					if (bool) {
						lib.config.plays.add(name);
					} else {
						lib.config.plays.remove(name);
					}
					game.saveConfig('plays', lib.config.plays);
				}
				if (this.onswitch) {
					this.onswitch(bool);
				}
				updateNodes();
			};

			var createModeConfig = function(mode, position) {
				var page = ui.create.div('');
				page.style.paddingBottom = '10px';
				var node;
				if (mode.indexOf('extension_') == 0) {
				//标记一处扩展名翻译的地方。关键词：扩展按钮
						    //受影响的地方：game/手杀ui/十周年UI
						    /*var tralist={
		AI优化:"智能优化",
		标记补充:"标记补充",
		皮肤切换:"藏珍宝阁",
		千幻聆音:"千幻聆音",
		全能搜索:"全能搜索",
		十周年UI:"新十周年",
		手杀MVP:"结算界面",
		手杀禁将:"手杀禁将",
		祖安武将:"祖安武将",
		如真似幻:"如真似幻",	
		手杀ui:"手杀界面",
		太虚幻境:"太虚幻境",
		无名补丁:"无名补丁",
		更新保护:"更新保护",
		雷霆万钧:"雷霆万钧",
						    };*/
						    var tratype=lib.config.ext_translation_type||'new';
						    var tralist=window.extTraList[tratype];
						    if(tralist&&tralist[mode.slice(10)]) {
						        var strmode=tralist[mode.slice(10)];
						    }else {
						        var strmode=mode.slice(10);
						    }
					node = ui.create.div('.menubutton.large', strmode, position, clickMode);
					/*if (mode.slice(10) == "EngEX") {
						node.style.backgroundImage = "url(" + eng.url + "/images/q.jpg)";
						node.style.backgroundSize = "100% 100%";
						// node.textContent = null;
						node.style.animation = "changeable 20s infinite";
					}*/
				} else {
					node = ui.create.div('.menubutton.large', lib.translate[mode + '_play_config'], position, clickMode);
				}
				if (node.innerHTML.length >= 5) {
					node.classList.add('smallfont');
				}
				node.link = page;
				node.mode = mode;
				for (var i in lib.extensionMenu[mode]) {
					if (i == 'game') continue;
					var cfg = copyObj(lib.extensionMenu[mode][i]);
					var j;
					if (mode.indexOf('extension_') == 0) {
						j = mode + '_' + i;
					} else {
						j = mode + '_' + i + '_playpackconfig';
					}
					cfg._name = j;
					if (!lib.config.hasOwnProperty(j)) {
						game.saveConfig(j, cfg.init);
					} else {
						cfg.init = lib.config[j];
					}

					if (i == 'enable') {
						cfg.onclick = togglePack;
					} else if (!lib.extensionMenu[mode][i].onclick) {
						cfg.onclick = function(result) {
							var cfg = this._link.config;
							game.saveConfig(cfg._name, result);
						};
					}
					var cfgnode = createConfig(cfg);
					if (cfg.onswitch) {
						cfgnode.onswitch = cfg.onswitch;
					}
					page.appendChild(cfgnode);
				}
				return node;
			};
			var extList=[];
			for (var i in lib.extensionMenu) extList.push(i);
			var tratype=lib.config.ext_translation_type||'new';
		    var tralist=window.extTraList[tratype];
			extList.sort((a,b)=>{
			    var from=a;
			    var to=b;
			    var baseFrom=4;
			    var baseTo=4;
			    if(tralist[from.slice(10)]) {
			        baseFrom=2;
			        from=tralist[a.slice(10)];
			    }
			    if(tralist[to.slice(10)]) {
			        baseTo=2;
			        to=tralist[b.slice(10)];
			    }
			    if(from.indexOf('extension_')==0) {
			        baseFrom=0;
			        from=a.slice(10);
			    }
			    if(to.indexOf('extension_')==0) {
			        baseTo=0;
			        to=b.slice(10);
			    }
			    if(a.slice(10)=="游戏说明") baseFrom=6;
			    if(b.slice(10)=="游戏说明") baseTo=6;
			    var tips=['补丁','管理','美化'];
			    if(tratype=='new') {
			        if(baseFrom==2&&tips.contains(from.slice(2))) from=from.slice(2)+from.slice(0,2);
			        if(baseTo==2&&tips.contains(to.slice(2))) to=to.slice(2)+to.slice(0,2);
			    }
			    return baseTo-baseFrom+from.localeCompare(to, 'zh-Hans-CN');
			});
			for (var i of extList) {
				if (lib.config.all.stockextension.contains(i) && !lib.config.all.plays.contains(i)) continue;
				if (lib.config.hiddenPlayPack.contains(i)) continue;
				createModeConfig(i, start.firstChild);
			} (function() {
				if (!lib.device && !lib.db) return;
				if (lib.config.show_extensionmaker == false) return;
				var page = ui.create.div('#create-extension');
				var node = ui.create.div('.menubutton.large', '制作扩展', start.firstChild, clickMode);
				node.link = page;
				node.mode = 'create';
				var pageboard = ui.create.div(page);
				var inputExtLine = ui.create.div(pageboard);
				inputExtLine.style.transition = 'all 0s';
				inputExtLine.style.padding = '10px';
				inputExtLine.style.height = '22px';
				inputExtLine.style.lineHeight = '22px';
				inputExtLine.style.whiteSpace = 'nowrap';
				inputExtLine.style.overflow = 'visible';
				var inputExtSpan = document.createElement('span');
				inputExtSpan.innerHTML = '扩展名：';
				inputExtLine.appendChild(inputExtSpan);
				var inputExtName = document.createElement('input');
				inputExtName.type = 'text';
				inputExtName.value = '我的扩展';//无名扩展
				inputExtName.style.width = '80px';
				inputExtName.style.textAlign = 'center';
				inputExtLine.appendChild(inputExtName);

				var buttonConfirmOnclick = function() {
					buttonConfirm.style.display = 'none';
					inputExtSpan.style.display = 'none';
					inputExtName.style.display = 'none';
					authorExtLine.style.display = 'none';
					introExtLine.style.display = 'none';
					forumExtLine.style.display = 'none';
					diskExtLine.style.display = 'none';
					versionExtLine.style.display = 'none';
					okExtLine.style.display = 'none';
					inputExtLine.style.padding = '10px';
					buttonRename.style.display = '';
					buttonSave.style.display = '';
					buttonReset.style.display = '';
					buttonExport.style.display = '';
					inputExtSpan.innerHTML = '扩展名称：';
					inputExtName.style.width = '100px';
					inputExtName.style.textAlign = '';

					dashboard.style.display = '';
				};
				var createExtLine = function(str, str2) {
					var infoExtLine = ui.create.div(pageboard);
					infoExtLine.style.display = 'none';
					infoExtLine.style.padding = '0 10px 10px 10px';
					infoExtLine.style.height = '22px';
					infoExtLine.style.lineHeight = '22px';
					infoExtLine.style.whiteSpace = 'nowrap';
					infoExtLine.style.overflow = 'visible';
					if (typeof str == 'boolean') {
						var inputConfirm = document.createElement('button');
						inputConfirm.innerHTML = '确定';
						inputConfirm.onclick = buttonConfirmOnclick;
						infoExtLine.appendChild(inputConfirm);
						return infoExtLine;
					}
					var infoExtSpan = document.createElement('span');
					infoExtSpan.innerHTML = str + '：';
					infoExtLine.appendChild(infoExtSpan);
					var infoExtName = document.createElement('input');
					infoExtName.type = 'text';
					infoExtName.style.width = '100px';
					infoExtName.value = str2 || '';
					infoExtLine.appendChild(infoExtName);
					return infoExtLine;
				};
				var authorExtLine = createExtLine('扩展作者', get.connectNickname());
				var introExtLine = createExtLine('扩展描述');
				var versionExtLine = createExtLine('扩展版本', '1.0');
				var diskExtLine = createExtLine('网盘地址');
				var forumExtLine = createExtLine('讨论地址');
				var okExtLine = createExtLine(true);

				game.editExtension = function(name) {
					page.currentExtension = name || '我的扩展';
					inputExtName.value = page.currentExtension;
					if (name && lib.extensionPack[name]) {
						authorExtLine.querySelector('input').value = lib.extensionPack[name].author || '';
						introExtLine.querySelector('input').value = lib.extensionPack[name].intro || '';
						diskExtLine.querySelector('input').value = lib.extensionPack[name].diskURL || '';
						forumExtLine.querySelector('input').value = lib.extensionPack[name].forumURL || '';
						versionExtLine.querySelector('input').value = lib.extensionPack[name].version || '';
					} else {
						authorExtLine.querySelector('input').value = get.connectNickname() || '';
						introExtLine.querySelector('input').value = '';
						diskExtLine.querySelector('input').value = '';
						forumExtLine.querySelector('input').value = '';
						versionExtLine.querySelector('input').value = '1.0';
					}
					if (name) {
						inputExtName.disabled = true;
						buttonConfirm.style.display = 'none';
						inputExtSpan.style.display = 'none';
						inputExtName.style.display = 'none';
						buttonRename.style.display = '';
						buttonSave.style.display = '';
						buttonReset.style.display = '';
						buttonExport.style.display = '';
					} else {
						inputExtName.disabled = false;
						buttonConfirm.style.display = '';
						inputExtSpan.innerHTML = '扩展名：';
						inputExtName.style.width = '80px';
						inputExtName.style.textAlign = 'center';
						inputExtSpan.style.display = '';
						inputExtName.style.display = '';
						buttonRename.style.display = 'none';
						buttonSave.style.display = 'none';
						buttonReset.style.display = 'none';
						buttonExport.style.display = 'none';
					}

					dashboard.style.display = '';

					exportExtLine.style.display = 'none';
					shareExtLine.style.display = 'none';
					authorExtLine.style.display = 'none';
					introExtLine.style.display = 'none';
					forumExtLine.style.display = 'none';
					diskExtLine.style.display = 'none';
					versionExtLine.style.display = 'none';
					okExtLine.style.display = 'none';
					inputExtLine.style.padding = '10px';
					dash1.reset(name);
					dash2.reset(name);
					dash3.reset(name);
					dash4.reset(name);
					dash1.link.classList.remove('active');
					dash2.link.classList.remove('active');
					dash3.link.classList.remove('active');
					dash4.link.classList.remove('active');
					var active = node.parentNode.querySelector('.active');
					if (active === node) {
						return;
					}
					active.classList.remove('active');
					active.link.remove();
					node.classList.add('active');
					rightPane.appendChild(node.link);
				}
				var processExtension = function(exportext) {
					if (page.currentExtension) {
						if (page.currentExtension != inputExtName.value && !exportext) {
							game.removeExtension(page.currentExtension);
						}
					}
					inputExtName.disabled = true;
					setTimeout(function() {
						var ext = {};
						var config = null,
						help = null;
						for (var i in dash4.content) {
							try {
								if (i == 'content' || i == 'precontent') {
									eval('ext[i]=' + dash4.content[i]);
									if (typeof ext[i] != 'function') {
										throw ('err');
									} else {
										ext[i] = ext[i].toString();
									}
								} else {
									eval(dash4.content[i]);
									eval('ext[i]=' + i);
									if (ext[i] == null || typeof ext[i] != 'object') {
										throw ('err');
									} else {
										ext[i] = JSON.stringify(ext[i]);
									}
								}
							} catch(e) {
								console.log(e);
								delete ext[i];
							}
						}
						page.currentExtension = inputExtName.value || '我的扩展';
						var str = '{name:"' + page.currentExtension + '"';
						for (var i in ext) {
							str += ',' + i + ':' + ext[i];
						}
						dash2.content.pack.list = [];
						for (var i = 0; i < dash2.pile.childNodes.length; i++) {
							dash2.content.pack.list.push(dash2.pile.childNodes[i].link);
						}
						str += ',package:' + get.stringify({
							character: dash1.content.pack,
							card: dash2.content.pack,
							skill: dash3.content.pack,
							intro: introExtLine.querySelector('input').value || '',
							author: authorExtLine.querySelector('input').value || '',
							diskURL: diskExtLine.querySelector('input').value || '',
							forumURL: forumExtLine.querySelector('input').value || '',
							version: versionExtLine.querySelector('input').value || '',
						});
						var files = {
							character: [],
							card: [],
							skill: []
						};
						for (var i in dash1.content.image) {
							files.character.push(i);
						}
						for (var i in dash2.content.image) {
							files.card.push(i);
						}
						for (var i in dash3.content.audio) {
							files.skill.push(i);
						}
						str += ',files:' + JSON.stringify(files);
						str += '}';
						var extension = {
							'extension.js': 'game.import("extension",function(lib,game,ui,get,ai,_status){return ' + str + '})'
						};
						for (var i in dash1.content.image) {
							extension[i] = dash1.content.image[i];
						}
						for (var i in dash2.content.image) {
							extension[i] = dash2.content.image[i];
						}
						if (exportext) {
							var proexport = function() {
								game.importExtension(extension, null, page.currentExtension, {
									intro: introExtLine.querySelector('input').value || '',
									author: authorExtLine.querySelector('input').value || '',
									netdisk: diskExtLine.querySelector('input').value || '',
									forum: forumExtLine.querySelector('input').value || '',
									version: versionExtLine.querySelector('input').value || '',
								});
							};
							if (game.getFileList) {
								game.getFileList('extension/' + page.currentExtension,
								function(folders, files) {
									extension._filelist = files;
									proexport();
								});
							} else {
								proexport();
							}
						} else {
							game.importExtension(extension,
							function() {
								exportExtLine.style.display = '';
							});
						}
					},
					500);
				};
				var buttonConfirm = document.createElement('button');
				buttonConfirm.innerHTML = '确定';
				buttonConfirm.style.marginLeft = '5px';
				buttonConfirm.onclick = buttonConfirmOnclick;
				inputExtLine.appendChild(buttonConfirm);
				var buttonRename = document.createElement('button');
				buttonRename.innerHTML = '选项';
				buttonRename.style.marginLeft = '2px';
				buttonRename.style.marginRight = '2px';
				buttonRename.style.display = 'none';
				buttonRename.onclick = function() {
					inputExtSpan.style.display = '';
					inputExtName.style.display = '';
					authorExtLine.style.display = '';
					introExtLine.style.display = '';
					forumExtLine.style.display = '';
					diskExtLine.style.display = '';
					versionExtLine.style.display = '';
					okExtLine.style.display = 'block';
					inputExtLine.style.padding = '20px 10px 10px 10px';
					inputExtName.disabled = false;
					buttonRename.style.display = 'none';
					buttonSave.style.display = 'none';
					buttonReset.style.display = 'none';
					buttonExport.style.display = 'none';
					inputExtSpan.innerHTML = '扩展名称：';
					inputExtName.style.width = '100px';
					inputExtName.style.textAlign = '';

					dashboard.style.display = 'none';
				};
				inputExtLine.appendChild(buttonRename);
				var buttonReset = document.createElement('button');
				buttonReset.innerHTML = '重置';
				buttonReset.style.marginLeft = '2px';
				buttonReset.style.marginRight = '2px';
				buttonReset.style.display = 'none';
				buttonReset.onclick = function() {
					if (confirm('当前扩展将被清除，是否确定？')) {
						game.editExtension();
					}
				};
				inputExtLine.appendChild(buttonReset);
				var buttonSave = document.createElement('button');
				buttonSave.innerHTML = '保存';
				buttonSave.style.marginLeft = '2px';
				buttonSave.style.marginRight = '2px';
				buttonSave.style.display = 'none';
				buttonSave.onclick = function() {
					dash1.link.classList.remove('active');
					dash2.link.classList.remove('active');
					dash3.link.classList.remove('active');
					dash4.link.classList.remove('active');
					processExtension();
				};
				inputExtLine.appendChild(buttonSave);
				var buttonExport = document.createElement('button');
				buttonExport.innerHTML = '导出';
				buttonExport.style.marginLeft = '2px';
				buttonExport.style.marginRight = '2px';
				buttonExport.style.display = 'none';
				buttonExport.onclick = function() {
					processExtension(true);
					if (lib.config.show_extensionshare) {
						shareExtLine.style.display = '';
					}
				};
				inputExtLine.appendChild(buttonExport);
				//改改改：扩展页面位置微调
				var showExtLine = ui.create.div(pageboard);
				showExtLine.style.display = '';
				showExtLine.style.width = 'calc(100% - 40px)';
				showExtLine.style.textAlign = 'left';
				showExtLine.style.marginBottom = '5px';
				showExtLine.innerHTML = '◈扩展制作页面>>';
				/*showExtLine.querySelectorAll('span')[0].onclick = game.reload;
				showExtLine.querySelectorAll('span')[1].onclick = function() {
					exportExtLine.style.display = 'none';
				};*/
				var exportExtLine = ui.create.div(pageboard);
				exportExtLine.style.display = 'none';
				exportExtLine.style.width = 'calc(100% - 40px)';
				exportExtLine.style.textAlign = 'left';
				exportExtLine.style.marginBottom = '5px';
				if (lib.device == 'ios') {
					exportExtLine.innerHTML = '已保存。退出游戏并重新打开后生效<span class="closenode">×</span>';
					exportExtLine.querySelectorAll('span')[0].onclick = function() {
						exportExtLine.style.display = 'none';
					};
				} else {
					exportExtLine.innerHTML = '重启后生效。<span class="hrefnode">立即重启</span><span class="closenode">×</span>';
					exportExtLine.querySelectorAll('span')[0].onclick = game.reload;
					exportExtLine.querySelectorAll('span')[1].onclick = function() {
						exportExtLine.style.display = 'none';
					};
				}

				var shareExtLine = ui.create.div(pageboard);
				shareExtLine.style.display = 'none';
				shareExtLine.style.width = 'calc(100% - 40px)';
				shareExtLine.style.textAlign = 'left';
				shareExtLine.style.marginBottom = '5px';
				shareExtLine.innerHTML = '已导出扩展。<span class="hrefnode">分享扩展</span><span class="closenode">×</span>';
				shareExtLine.querySelectorAll('span')[0].onclick = function() {
					game.open('https://tieba.baidu.com/p/5439380222');
				};
				shareExtLine.querySelectorAll('span')[1].onclick = function() {
					shareExtLine.style.display = 'none';
				};

				var dashboard = ui.create.div(pageboard);
				var clickDash = function() {
					ui.create.templayer();
					pageboard.hide();
					this.link.show();
					if (this.link.init) {
						this.link.init();
					}
				};
				var createDash = function(str1, str2, node) {
					var dash = ui.create.div('.menubutton.large.dashboard');
					dashboard.appendChild(dash);
					page.appendChild(node);
					dash.link = node;
					node.link = dash;
					dash.listen(clickDash);
					lib.setScroll(node);
					ui.create.div('', str1, dash);
					ui.create.div('', str2, dash);
				};
				var dash1 = (function() {
					var page = ui.create.div('.hidden.menu-buttons');
					//page.style.transform='scale(1.1) translateX(5%)';
					var currentButton = null;
					page.init = function() {
						if (!page.querySelector('.button.character')) {
							toggle.classList.add('on');
							newCharacter.style.display = '';
						}
					};
					var updateButton = function() {
						var name = page.querySelector('input.new_name').value;
						if (!name) {
							editnode.classList.add('disabled');
							return;
						}
						name = name.split('|');
						name = name[0];
						if (currentButton) {
							if (currentButton.link != name) {
								if (lib.character[name] || page.content.pack.character[name]) {
									editnode.classList.add('disabled');
									return;
								}
							}
						} else {
							if (lib.character[name] || page.content.pack.character[name]) {
								editnode.classList.add('disabled');
								return;
							}
						}
						/*if (!fakeme.image) {
							if (!page.content.image[name + '.jpg']) {
								editnode.classList.add('disabled');
								return;
							}
						}*/
						editnode.classList.remove('disabled');
					};
					var clickButton = function() {
						if (currentButton == this) {
							resetEditor();
							return;
						}
						resetEditor();
						currentButton = this;
						toggle.classList.add('on');
						newCharacter.style.display = '';
						fakeme.classList.add('inited');
						fakeme.style.backgroundImage = this.style.backgroundImage;
						if (page.content.pack.translate[this.link] != this.link) {
							newCharacter.querySelector('.new_name').value = this.link + '|' + page.content.pack.translate[this.link];
						} else {
							newCharacter.querySelector('.new_name').value = this.link;
						}
						var info = page.content.pack.character[this.link];
						newCharacter.querySelector('.new_hp').value = info[2];
						sexes.value = info[0];
						groups.value = info[1];
						hasChaImg=false;
						if (moreOpt.childNodes[0]?.lastChild) moreOpt.childNodes[0].lastChild.checked = false;
                        moreOpt.classList.remove('canNotChangeOutcropStyle');
						if (info[4]) {
							for (var i = 0; i < options.childNodes.length - 1; i++) {
								if (options.childNodes[i].lastChild && info[4].contains(options.childNodes[i].lastChild.name)) {
									options.childNodes[i].lastChild.checked = true;
								} else if (options.childNodes[i].lastChild) {
									options.childNodes[i].lastChild.checked = false;
								}
							}
							if(info[4].contains('No_Outcrop')) {
							    if (moreOpt.childNodes[0]?.lastChild) moreOpt.childNodes[0].lastChild.checked = false;
							}else {
						        if (moreOpt.childNodes[0]?.lastChild) moreOpt.childNodes[0].lastChild.checked = true;
							}
							for (var i = 0; i < info[4].length; i++) {
								if (info[4][i].indexOf('des:') == 0) {
									newCharacter.querySelector('.new_des').value = info[4][i].slice(4);
								}
								if (info[4][i].indexOf('character:') == 0) {
						            hasChaImg=true;
		                            moreOpt.classList.add('canNotChangeOutcropStyle');
		                            if (moreOpt.childNodes[0]?.lastChild) moreOpt.childNodes[0].lastChild.checked = true;
		                            setname.value = info[4][i].slice(10);
								}
							}
							
						}

						var skills = info[3];
						for (var i = 0; i < skills.length; i++) {
							var node = document.createElement('button');
							node.skill = skills[i];
							node.onclick = deletenode;
							node.innerHTML = lib.translate[skills[i]];
							skillList.firstChild.appendChild(node);
						}

						toggle.innerHTML = '编辑武将 <div>&gt;</div>';
						editnode.innerHTML = '编辑武将';
						editnode.classList.remove('disabled');
						delnode.innerHTML = '删除';
						delnode.button = this;
					}
					var bgimage=function(meme,male){
						    var nameinfo = get.character(name);
						    var sex = nameinfo ? nameinfo[0] : 'male';
						    if(male) sex=male;
						    meme.style.backgroundImage = [
						    meme.style.backgroundImage,
						    `url("${lib.assetURL}image/character/default_silhouette_${sex}.jpg")`,
						    `url("${lib.assetURL}image/character/default_silhouette_male.jpg")`,
						    ].join(",");
						};
					var createButton = function(name, image) {
						var button = ui.create.div('.button.character');
						button.link = name;
						if(!image&&fakeme.style.backgroundImage) {
						    image = fakeme.style.backgroundImage;
						    if(image.indexOf('url(')==0) {
						        image=image.slice(4,-1);
						    }
						}
						button.image = image;
						button.style.backgroundImage = 'url(' + image + ')';
						bgimage(button);
						button.style.backgroundSize = 'cover';
						button.listen(clickButton);
						button.classList.add('noclick');
						button.nodename = ui.create.div(button, '.name', get.verticalStr(page.content.pack.translate[name]));
						button.nodename.style.top = '8px';
						button.nodename.style.left = '2.5px';
						button.nodename.style.filter='drop-shadow(0px 0px 1.5px black)';
						page.insertBefore(button, page.childNodes[1]);
					}
					var hasChaImg = true;
					if(game.createCss) {
					    game.createCss(`.canNotChangeOutcropStyle{
					        opacity: 0.5;
					        pointer-events: none;
					    }`);
					}
					page.reset = function(name) {
						resetEditor();
						var buttons = page.querySelectorAll('.button.character');
						var list = [];
						for (var i = 0; i < buttons.length; i++) {
							list.push(buttons[i]);
						}
						for (var i = 0; i < list.length; i++) {
							list[i].remove();
						}
						if (lib.extensionPack[name]) {
							page.content.pack = lib.extensionPack[name].character || {
								character: {},
								translate: {}
							};
							page.content.image = {};
							for (var i in page.content.pack.character) {
								//alert(page.content.pack.character);
								var infos=page.content.pack.character[i][4];
								var hasImg=false;
								if(infos&&infos.length) {
								    for(var a=0;a<infos.length;a++) {
								        var infoa=infos[a];
								        if(infoa.indexOf('character:')==0) {
								            hasImg=lib.assetURL+'image/character/'+infoa.slice(10)+'.jpg';
								        }
								    }
								}
								var file = i + '.jpg';
								var loadImage = function(file, data) {
									var img = new Image();
									img.crossOrigin = 'Anonymous';
									img.onload = function() {
										var canvas = document.createElement('CANVAS');
										var ctx = canvas.getContext('2d');
										var dataURL;
										canvas.height = this.height;
										canvas.width = this.width;
										ctx.drawImage(this, 0, 0);
										canvas.toBlob(function(blob) {
											var fileReader = new FileReader();
											fileReader.onload = function(e) {
												page.content.image[file] = e.target.result;
											};
											fileReader.readAsArrayBuffer(blob, "UTF-8");
										});
									};
									img.src = data;
								}
								if (game.download) {
									var url = lib.assetURL + 'extension/' + name + '/' + file;
									if(hasImg) url = hasImg;
									createButton(i, url);
									if (!window.isPcApp()/*lib.device == 'ios' || lib.device == 'android'*/) {
										window.resolveLocalFileSystemURL(lib.assetURL + 'extension/' + name,
										function(entry) {
											entry.getFile(file, {},
											function(fileEntry) {
												fileEntry.file(function(fileToLoad) {
													var fileReader = new FileReader();
													fileReader.onload = function(e) {
														page.content.image[file] = e.target.result;
													};
													fileReader.readAsArrayBuffer(fileToLoad, "UTF-8");
												});
											});
										});
									} else {
										loadImage(file, url);
									}
								} else {
									game.getDB('image', 'extension-' + name + ':' + file, (function(file, name) {
										return function(data) {
											createButton(name, data);
											loadImage(file, data);
										};
									} (file, i)))
								}
							}
						} else {
							page.content = {
								pack: {
									character: {},
									translate: {}
								},
								image: {}
							};
							toggle.classList.add('on');
							newCharacter.style.display = '';
						}
					};
					ui.create.div('.config.more', '<div style="transform:none;margin-right:3px">←</div>返回', page,
					function() {
					game.playAudio('../extension/手杀ui/audio/TinyButton.mp3');
						ui.create.templayer();
						page.hide();
						pageboard.show();
					});
					page.content = {
						pack: {
							character: {},
							translate: {}
						},
						image: {}
					};
					var newCharacter;
					var toggle = ui.create.div('.config.more.on', '创建武将 <div>&gt;</div>', page,
					function() {
						this.classList.toggle('on');
						if (this.classList.contains('on')) {
							newCharacter.style.display = '';
						} else {
							newCharacter.style.display = 'none';
						}
					});
					var resetEditor = function() {
						currentButton = null;
						toggle.classList.remove('on');
						newCharacter.style.display = 'none';
						fakeme.classList.remove('inited');
						delete fakeme.image;
						delete fakeme.image64;
						if (moreOpt.childNodes[0]?.lastChild) moreOpt.childNodes[0].lastChild.checked = true;
				        moreOpt.classList.add('canNotChangeOutcropStyle');
						fakeme.style.backgroundImage = '';
						fakeme.setBackgroundImage('image/character/noname.jpg');
						var inputs = newCharacter.querySelectorAll('input');
						for (var i = 0; i < inputs.length; i++) {
							inputs[i].value = '';
						}
						inputs = newCharacter.querySelectorAll('textarea');
						for (var i = 0; i < inputs.length; i++) {
							inputs[i].value = '';
						}
						page.setname.value = 'noname';
						skillList.firstChild.innerHTML = '';
						toggle.innerHTML = '创建武将 <div>&gt;</div>';
						editnode.innerHTML = '创建武将';
						editnode.classList.add('disabled');
						delnode.innerHTML = '取消';
						delete delnode.button;
					}

					newCharacter = ui.create.div('.new_character', page);
					newCharacter.style.left = '27%';
					newCharacter.style.width = '50%';
					//var fakeme = ui.create.div('.avatar', newCharacter);
					var fakemeBlank = ui.create.div('.avatar', newCharacter);
					fakemeBlank.style.overflow='visible';
					var fakeme = ui.create.div(fakemeBlank);
					
					fakeme.style.width='100%';
					fakeme.style.height='100%';
					//fakeme.style.height='118%';
					fakeme.style.bottom='0';
					fakeme.style.left='0';
					fakeme.style.backgroundSize='cover';
					fakeme.style.backgroundPosition='top';
					fakeme.style.borderRadius='5px';

					var bgimage=function(meme,male){
						    var nameinfo = get.character(name);
						    var sex = nameinfo ? nameinfo[0] : 'male';
						    if(male) sex=male;
						    meme.style.backgroundImage = [
						    meme.style.backgroundImage,
						    `url("${lib.assetURL}image/character/default_silhouette_${sex}.jpg")`,
						    `url("${lib.assetURL}image/character/default_silhouette_male.jpg")`,
						    ].join(",");
						};
					var input = document.createElement('input');
					input.type = 'file';
					input.accept = 'image/*';
					input.className = 'fileinput';
					input.onchange = function() {
						var fileToLoad = input.files[0];
						if (fileToLoad) {
							var fileReader = new FileReader();
							fileReader.onload = function(fileLoadedEvent) {
								var data = fileLoadedEvent.target.result;
								fakeme.style.backgroundImage = 'url(' + data + ')';
								fakeme.image64 = data;
								fakeme.classList.add('inited');
								var fileReader = new FileReader();
								fileReader.onload = function(fileLoadedEvent) {
									fakeme.image = fileLoadedEvent.target.result;
									updateButton();
									moreOpt.classList.remove('canNotChangeOutcropStyle');
									hasChaImg = true;
									if (moreOpt.childNodes[0]?.lastChild) moreOpt.childNodes[0].lastChild.checked = false;
								};
								fileReader.readAsArrayBuffer(fileToLoad, "UTF-8");
							};
							fileReader.readAsDataURL(fileToLoad, "UTF-8");
						}else {
						    fakeme.setBackgroundImage('image/character/noname.jpg');
						}
					}
					fakeme.appendChild(input);
					//bgimage(fakeme);
					ui.create.div('.select_avatar', ' ', fakeme);
					fakeme.setBackgroundImage('image/character/noname.jpg');
					//if(!fakeme.image64) fakeme.image64=lib.assetURL+'image/character/noname.jpg';
					

					ui.create.div('.indent', '姓名：<input class="new_name" type="text" style="width: 95px">', newCharacter).style.paddingTop = '8px';
					ui.create.div('.indent', '介绍：<input class="new_des" type="text" style="width: 95px">', newCharacter).style.paddingTop = '8px';
					ui.create.div('.indent', '体力：<input class="new_hp" type="text" style="width: 95px">', newCharacter).style.paddingTop = '8px';
					newCharacter.querySelector('input.new_name').onblur = updateButton;
					var sexes = ui.create.selectlist([['male', '男'], ['female', '女'], ['none', '无'], ], null, ui.create.div('.indent', '性别：', newCharacter));
					var grouplist = [];
					for (var i = 0; i < lib.group.length; i++) {
						grouplist.push([lib.group[i], get.translation(lib.group[i])]);
					};
					if(!lib.group.contains('western')) grouplist.push(['devil', get.translation('devil')]);
					if(!lib.group.contains('western')) grouplist.push(['western', get.translation('western')]);
					var groups = ui.create.selectlist(grouplist, null, ui.create.div('.indent', '势力：', newCharacter));
					var options = ui.create.div('.add_skill.options', '<span>主公<input type="checkbox" name="zhu"></span><span>BOSS<input type="checkbox" name="boss"></span><span>仅点将可用<input type="checkbox" name="forbidai"></span><br><span>隐匿将<input type="checkbox" name="hiddenSkill"></span><span>借用原画</span><br>', newCharacter);
					var moreOpt = ui.create.div('.add_skill.options', '<span>原画露头<input type="checkbox" name="No_Outcrop"></span>');
					options.appendChild(moreOpt);
					if (moreOpt.childNodes[0]?.lastChild) moreOpt.childNodes[0].lastChild.checked = true;
				    moreOpt.classList.add('canNotChangeOutcropStyle');
					moreOpt.style.transform = 'translateY(-95px) scale(0.9)';
					//var addTietu = ui.create.div('.add_skill.options', '<br>选择贴图<br>', newCharacter);
					var namef = [['noname','预设武将'],['none','关闭']];
					var names = [];
					for (var i in lib.character) {
					    if(!lib.character[i]) continue;
					    if(lib.character[i][4]) {
					        var adds=lib.character[i][4];
					        var next=false;
					        for(var j=0;j<adds.length;j++) {
					            if(adds[j].indexOf('ext:')==0) next=true;
					            if(adds[j].indexOf('character:')==0) next=true;
					            if(adds[j].indexOf('db:')==0) next=true;
					        }
					        if(next) continue;
					    }
					    var indexss=Math.max(i.lastIndexOf('_')+1,0);
					    var alpha=i.slice(indexss,indexss+1);
					    names.push([i, (game.isForbidedCharacter(i) ? '🚫' : '') + alpha.toUpperCase()+'-'+lib.translate[i]]);
					}
					game.sortEditCharacterList(names);
					/*names.sort(function(a, b) {
						a = a[0];
						b = b[0];
						var aa = a,
						bb = b;
						if (aa.lastIndexOf('_') != -1) {
							aa = aa.slice(aa.lastIndexOf('_') + 1);
						}
						if (bb.lastIndexOf('_') != -1) {
							bb = bb.slice(bb.lastIndexOf('_') + 1);
						}
						if (aa != bb) {
							return aa > bb ? 1 : -1;
						}
						return a > b ? 1 : -1;
					});*/
					names=namef.concat(names);
					var setname = ui.create.selectlist(names, names[0], options);
					page.setname = setname;
					setname.style.maxWidth = '95px';
					setname.style.transform = 'translate(180px, -23px)';
					setname.onchange = function() {
					    var heads=setname.value;
					    if(!heads) return;
					    //if(fakeme.image) return;
					    if(fakeme.image) {
					        delete fakeme.image;
					    }
					    hasChaImg=true;
					    if (moreOpt.childNodes[0]?.lastChild) moreOpt.childNodes[0].lastChild.checked = true;
					    moreOpt.classList.add('canNotChangeOutcropStyle');
					    fakeme.style.transition='all 0.2s ease';
					    fakeme.setBackgroundImage('image/character/'+heads+'.jpg');
					    //if(!fakeme.image64) fakeme.image64=lib.assetURL+'image/character/'+heads+'.jpg';
						bgimage(fakeme);
					}
					//setname.value = 'noname';
					var addSkill = ui.create.div('.add_skill', '◈添加技能>><br>', newCharacter);
					var list = [];
					for (var i in lib.character) {
						if (lib.character[i][3].length) {
							//list.push([i, lib.translate[i]]);
							var indexss=Math.max(i.lastIndexOf('_')+1,0);
					        var alpha=i.slice(indexss,indexss+1);
					        list.push([i, (game.isForbidedCharacter(i) ? '🚫' : '') + alpha.toUpperCase()+'-'+lib.translate[i]]);
						}
					}
					game.sortEditCharacterList(list);
					/*list.sort(function(a, b) {
						a = a[0];
						b = b[0];
						var aa = a,
						bb = b;
						if (aa.lastIndexOf('_') != -1) {
							aa = aa.slice(aa.lastIndexOf('_') + 1);
						}
						if (bb.lastIndexOf('_') != -1) {
							bb = bb.slice(bb.lastIndexOf('_') + 1);
						}
						if (aa != bb) {
							return aa > bb ? 1 : -1;
						}
						return a > b ? 1 : -1;
					});*/
					var list2 = [];
					var skills = lib.character[list[0][0]][3];
					for (var i = 0; i < skills.length; i++) {
						list2.push([skills[i], lib.translate[skills[i]]]);
					}
					list.unshift(['current_extension', '此扩展']);

					var selectname = ui.create.selectlist(list, list[1], addSkill);
					selectname.value=list[1][0];
					//selectname.innerHTML = list[1][1];
					page.selectname = selectname;
					selectname.onchange = function() {
						skillopt.innerHTML = '';
						if (this.value == 'current_extension') {
							for (var i in dash3.content.pack.skill) {
								var option = document.createElement('option');
								option.value = i;
								option.innerHTML = dash3.content.pack.translate[i];
								skillopt.appendChild(option);
							}
						} else {
							var skills = lib.character[this.value][3];
							for (var i = 0; i < skills.length; i++) {
								var option = document.createElement('option');
								option.value = skills[i];
								option.innerHTML = lib.translate[skills[i]];
								skillopt.appendChild(option);
							}
						}
					};
					//selectname.style.maxWidth = '85px';
					selectname.style.maxWidth = '110px';
					var skillopt = ui.create.selectlist(list2, list2[0], addSkill);
					skillopt.style.maxWidth = '60px';
					page.skillopt = skillopt;
					var addSkillButton = document.createElement('button');
					addSkillButton.innerHTML = '添加';
					addSkill.appendChild(addSkillButton);
					page.addSkillButton = addSkillButton;
					var deletenode = function() {
						this.remove();
					}
					addSkillButton.onclick = function() {
						for (var i = 0; i < skillList.firstChild.childNodes.length; i++) {
							if (skillList.firstChild.childNodes[i].skill == skillopt.value) return;
						}
						var node = document.createElement('button');
						node.skill = skillopt.value;
						node.onclick = deletenode;
						for (var i = 0; i < skillopt.childElementCount; i++) {
							if (skillopt.childNodes[i].value == skillopt.value) {
								node.innerHTML = skillopt.childNodes[i].innerHTML;
								break;
							}
						}
						skillList.firstChild.appendChild(node);
					};
					var createSkillButton = document.createElement('button');
					createSkillButton.innerHTML = '创建';
					createSkillButton.style.marginLeft = '3px';
					addSkill.appendChild(createSkillButton);
					createSkillButton.onclick = function() {
						ui.create.templayer();
						page.hide();
						dash3.show();
						dash3.fromchar = 'add';
						dash3.toggle.classList.add('on');
						dash3.newSkill.style.display = '';
					};
					page.updateSkill = function() {
						for (var i = 0; i < skillList.firstChild.childNodes.length; i++) {
							var node = skillList.firstChild.childNodes[i];
							var skill = skillList.firstChild.childNodes[i].skill;
							if (dash3.content.pack.skill[skill]) {
								node.innerHTML = dash3.content.pack.translate[skill];
							} else if (lib.skill[skill]) {
								node.innerHTML = lib.translate[skill];
							} else {
								node.remove();
								i--;
							}
						}
					};
					var skillList = ui.create.div('.skill_list', newCharacter);
					ui.create.div(skillList);
					var editnode = ui.create.div('.menubutton.large.disabled', '创建武将', ui.create.div(skillList),
					function() {
						var name = page.querySelector('input.new_name').value;
						if (!name) {
							alert('请填写武将名\n提示：武将名格式为id+|+中文名，其中id必须惟一');
							return;
						}
						name = name.split('|');
						var translate = name[1] || name[0];
						name = name[0];
						var tags = [];
						if (currentButton) {
							if (currentButton.link != name) {
								if (lib.character[name] || page.content.pack.character[name]) {
									alert('武将名与现有武将重复，请更改\n提示：武将名格式为id+|+中文名，其中id必须惟一');
									return;
								}
								page.content.image[name + '.jpg'] = page.content.image[currentButton.link + '.jpg'];
								delete page.content.image[currentButton.link + '.jpg'];
								delete page.content.pack.character[currentButton.link];
								delete page.content.pack.translate[currentButton.link];
								currentButton.link = name;
							}
						} else {
							if (lib.character[name] || page.content.pack.character[name]) {
								alert('武将名与现有武将重复，请更改\n提示：武将名格式为id+|+中文名，其中id必须惟一');
								return;
							}
						}
					    if(!(moreOpt.childNodes[0]?.lastChild?.checked)) {
					        tags.add('No_Outcrop');//不要露头
					    }
						if (fakeme.image) {
							page.content.image[name + '.jpg'] = fakeme.image;
						} else {
							//允许无头像武将
							var heads=setname.value;
							if(heads&&heads!='none'&&hasChaImg) {
							    tags.add('character:'+heads);
							}
							/*if (!page.content.image[name + '.jpg']) {
								alert('请选择武将头像');
								return;
							}*/
						}
						//单独标识为扩展武将（主要是经常改，适应名字）
						tags.add('isExtension');
						var hp = page.querySelector('input.new_hp').value;
						if (hp == 'Infinity') hp = Infinity;
						else if (hp.indexOf('/') == -1) hp = parseInt(hp) || 1;
						var skills = [];
						for (var i = 0; i < skillList.firstChild.childNodes.length; i++) {
							skills.add(skillList.firstChild.childNodes[i].skill);
						}
						for (var i = 0; i < options.childNodes.length - 1; i++) {
							if (options.childNodes[i].lastChild && options.childNodes[i].lastChild.checked) {
								tags.push(options.childNodes[i].lastChild.name);
							}
						}
						if (tags.contains('boss')) {
							tags.add('bossallowed');
						}
						var des = page.querySelector('input.new_des').value;
						if (des) {
							tags.add('des:' + des);
						}

						//if(!fakeme.image64) fakeme.image64=lib.assetURL+'image/noname.jpg';
						page.content.pack.translate[name] = translate;
						page.content.pack.character[name] = [sexes.value, groups.value, hp, skills, tags];
						if (this.innerHTML == '创建武将') {
							createButton(name, fakeme.image64);
						} else if (currentButton) {
							if (fakeme.image64) {
								currentButton.image = fakeme.image64;
								currentButton.style.backgroundImage = 'url(' + fakeme.image64 + ')';
							}else {
							    currentButton.style.backgroundImage = fakeme.style.backgroundImage;
							}
							currentButton.nodename.innerHTML = get.verticalStr(translate);
						}
						resetEditor();
						dash1.link.classList.add('active');
					});
					var delnode = ui.create.div('.menubutton.large', '取消', editnode.parentNode,
					function() {
						if (this.innerHTML == '删除') {
							this.button.remove();
							var name = this.button.link;
							delete dash1.content.pack.character[name];
							delete dash1.content.pack.translate[name];
							delete dash1.content.image[name];
							dash1.link.classList.add('active');
						}
						resetEditor();
					});
					delnode.style.marginLeft = '13px';

					return page;
				} ());
				var dash2 = (function() {
					var page = ui.create.div('.hidden.menu-buttons');
					var currentButton = null;
					page.init = function() {
						if (!page.querySelector('.button.card')) {
							toggle.classList.add('on');
							newCard.style.display = '';
						}
					};
					var updateButton = function() {
						var name = page.querySelector('input.new_name').value;
						if (!name) {
							editnode.classList.add('disabled');
							return;
						}
						name = name.split('|');
						name = name[0];
						if (currentButton) {
							if (currentButton.link != name) {
								if (lib.card[name] || page.content.pack.card[name]) {
									editnode.classList.add('disabled');
									return;
								}
							}
						} else {
							if (lib.card[name] || page.content.pack.card[name]) {
								editnode.classList.add('disabled');
								return;
							}
						}
						/*if (!fakeme.image && !fakeme.classList.contains('inited')) {
							editnode.classList.add('disabled');
							return;
						}*/
						editnode.classList.remove('disabled');
					};
					var clickButton = function() {
						if (currentButton == this) {
							resetEditor();
							return;
						}
						resetEditor();
						currentButton = this;
						toggle.classList.add('on');
						newCard.style.display = '';
						fakeme.classList.add('inited');
						delete fakeme.image;
						delete fakeme.image64;
						if (this.classList.contains('fullskin')) {
							fakeme.imagenode.style.backgroundImage = this.imagenode.style.backgroundImage;
							fakeme.classList.add('fullskin');
						} else {
							fakeme.style.backgroundImage = this.style.backgroundImage;
							fakeme.classList.remove('fullskin');
						}
						if (page.content.pack.translate[this.link] != this.link) {
							newCard.querySelector('.new_name').value = this.link + '|' + page.content.pack.translate[this.link];
						} else {
							newCard.querySelector('.new_name').value = this.link;
						}
						newCard.querySelector('.new_description').value = page.content.pack.translate[this.link + '_info'];
						var info = page.content.pack.card[this.link];
						container.code = 'card=' + get.stringify(info);

						toggle.innerHTML = '编辑卡牌 <div>&gt;</div>';
						editnode.innerHTML = '编辑卡牌';
						editnode.classList.remove('disabled');
						delnode.innerHTML = '删除';
						delnode.button = this;
					}
					var createButton = function(name, image, fullskin, nopic) {
						var button = ui.create.div('.button.card');
						button.link = name;
						button.image = image;
						button.imagenode = ui.create.div('.image', button);
						if (image) {
							if (fullskin) {
								button.imagenode.style.backgroundImage = 'url(' + image + ')';
								button.style.backgroundImage = '';
								button.style.backgroundSize = '';
								button.classList.add('fullskin');
							} else {
								button.style.color = 'white';
								button.style.textShadow = 'black 0 0 2px';
								button.imagenode.style.backgroundImage = '';
								button.style.backgroundImage = 'url(' + image + ')';
								button.style.backgroundSize = 'cover';
							}
						}
						if(nopic) {
						    button.noPic=true;
						    button.classList.add('fullskin');
						}else {
						    button.noPic=false;
						}
						button.listen(clickButton);
						button.classList.add('noclick');
						button.nodename = ui.create.div(button, '.name', get.verticalStr(page.content.pack.translate[name]));
						page.insertBefore(button, page.childNodes[1]);
					}
					page.reset = function(name) {
						resetEditor();
						var buttons = page.querySelectorAll('.button.card');
						var list = [];
						for (var i = 0; i < buttons.length; i++) {
							list.push(buttons[i]);
						}
						for (var i = 0; i < list.length; i++) {
							list[i].remove();
						}
						if (lib.extensionPack[name]) {
							page.content.pack = lib.extensionPack[name].card || {
								card: {},
								translate: {}
							};
							page.content.image = {};
							if (Array.isArray(page.content.pack.list)) {
								for (var i = 0; i < page.content.pack.list.length; i++) {
									var card = page.content.pack.list[i];
									var node = document.createElement('button');
									node.innerHTML = page.content.pack.translate[card[2]] + ' ' + lib.translate[card[0]] + card[1];
									node.name = card[2];
									node.link = card;
									pile.appendChild(node);
									node.onclick = function() {
										this.remove();
									}
								}
							}
							for (var i in page.content.pack.card) {
								var file;
								var fullskin = page.content.pack.card[i].fullskin ? true: false;
								if (fullskin) {
									file = i + '.png';
								} else {
									file = i + '.jpg';
								}
								var loadImage = function(file, data) {
									var img = new Image();
									img.crossOrigin = 'Anonymous';
									img.onload = function() {
										var canvas = document.createElement('CANVAS');
										var ctx = canvas.getContext('2d');
										var dataURL;
										canvas.height = this.height;
										canvas.width = this.width;
										ctx.drawImage(this, 0, 0);
										canvas.toBlob(function(blob) {
											var fileReader = new FileReader();
											fileReader.onload = function(e) {
												page.content.image[file] = e.target.result;
											};
											fileReader.readAsArrayBuffer(blob, "UTF-8");
										});
									};
									img.src = data;
								}
								if (game.download) {
									var url = lib.assetURL + 'extension/' + name + '/' + file;
									createButton(i, url, (fullskin||page.content.pack.card[i].noPic), page.content.pack.card[i].noPic);
									if (!window.isPcApp()/*lib.device == 'ios' || lib.device == 'android'*/) {
										window.resolveLocalFileSystemURL(lib.assetURL + 'extension/' + name,
										function(entry) {
											entry.getFile(file, {},
											function(fileEntry) {
												fileEntry.file(function(fileToLoad) {
													var fileReader = new FileReader();
													fileReader.onload = function(e) {
														page.content.image[file] = e.target.result;
													};
													fileReader.readAsArrayBuffer(fileToLoad, "UTF-8");
												});
											});
										});
									} else {
										loadImage(file, url);
									}
								} else {
									game.getDB('image', 'extension-' + name + ':' + file, (function(file, name, fullskin) {
										return function(data) {
											createButton(name, data, fullskin);
											loadImage(file, data);
										};
									} (file, i, fullskin)))
								}
							}
						} else {
							page.content = {
								pack: {
									card: {},
									translate: {}
								},
								image: {}
							};
							toggle.classList.add('on');
							newCard.style.display = '';
						}
						updatePile();
					};
					ui.create.div('.config.more.margin-bottom', '<div style="transform:none;margin-right:3px">←</div>返回', page,
					function() {
						ui.create.templayer();
						page.hide();
						pageboard.show();
					});
					page.content = {
						pack: {
							card: {},
							translate: {},
							list: []
						},
						image: {}
					};
					var newCard;
					var toggle = ui.create.div('.config.more.on', '创建卡牌 <div>&gt;</div>', page,
					function() {
						this.classList.toggle('on');
						if (this.classList.contains('on')) {
							newCard.style.display = '';
						} else {
							newCard.style.display = 'none';
						}
					});
					var resetEditor = function() {
						currentButton = null;
						toggle.classList.remove('on');
						newCard.style.display = 'none';
						fakeme.classList.remove('inited');
						fakeme.noPic=false;
						fakeme.classList.add('fullskin');
						delete fakeme.image;
						delete fakeme.image64;
						fakeme.style.backgroundImage = '';
						fakeme.imagenode.style.backgroundImage = '';
						var inputs = newCard.querySelectorAll('input');
						for (var i = 0; i < inputs.length; i++) {
							inputs[i].value = '';
						}
						toggle.innerHTML = '创建卡牌 <div>&gt;</div>';
						editnode.innerHTML = '创建卡牌';
						editnode.classList.add('disabled');
						delnode.innerHTML = '取消';
						delete delnode.button;
						container.code = 'card={\n    \n}\n\n\/*\n示例：\ncard={\n    type:"basic",\n    enable:true,\n    filterTarget:true,\n    content:function(){\n        target.draw()\n    },\n    ai:{\n        order:1,\n        result:{\n            target:1\n        }\n    }\n}\n此例的效果为目标摸一张牌\n导出时本段代码中的换行、缩进以及注释将被清除\n*\/';
					}

					newCard = ui.create.div('.new_character', page);
					newCard.style.left = '30%';
					newCard.style.width = '50%';
					newCard.style.height = '173px';
					var fakeme = ui.create.div('.card.fullskin', newCard);
					fakeme.style.width='73px';//100px
					fakeme.style.transform='scale(1.2) translate('+(1.2*(100-73)*0.5)+'px, 0)';

					var input = document.createElement('input');
					input.type = 'file';
					input.accept = 'image/*';
					input.className = 'fileinput';
					input.onchange = function() {
						var fileToLoad = input.files[0];
						if (fileToLoad) {
							var fileReader = new FileReader();
							var fullimage = (fileToLoad.name.indexOf('.jpg') != -1);
							fileReader.onload = function(fileLoadedEvent) {
								var data = fileLoadedEvent.target.result;
								if (fullimage) {
									fakeme.imagenode.style.backgroundImage = '';
									fakeme.style.backgroundImage = 'url(' + data + ')';
									fakeme.classList.remove('fullskin');
								} else {
									fakeme.style.backgroundImage = '';
									fakeme.imagenode.style.backgroundImage = 'url(' + data + ')';
									fakeme.classList.add('fullskin');
								}
								fakeme.imagenode.style['background-size']='contain';
								fakeme.image64 = data;
								fakeme.classList.add('inited');
								var fileReader = new FileReader();
								fileReader.onload = function(fileLoadedEvent) {
									fakeme.image = fileLoadedEvent.target.result;
									fakeme.noPic=false;
									updateButton();
								};
								fileReader.readAsArrayBuffer(fileToLoad, "UTF-8");
							};
							fileReader.readAsDataURL(fileToLoad, "UTF-8");
						}
					}
					fakeme.appendChild(input);

					fakeme.imagenode = ui.create.div('.image', fakeme);
					fakeme.imagenode.style.transition='all 0.2s ease';
					fakeme.imagenode.style.width='100%';
					fakeme.imagenode.style.height='100%';
					fakeme.imagenode.style['background-size']='contain';
					fakeme.imagenode.style['background-position']='center bottom';
					fakeme.imagenode.style['background-repeat']='no-repeat';
					ui.create.div('.name', '选<br>择<br>背<br>景', fakeme);

					ui.create.div('.indent', '名称：<input class="new_name" type="text">', newCard).style.paddingTop = '8px';
					ui.create.div('.indent', '描述：<input class="new_description" type="text">', newCard).style.paddingTop = '6px';
					newCard.querySelector('input.new_name').onblur = updateButton;
					var codeButton = document.createElement('button');
					newCard.appendChild(codeButton);
					codeButton.innerHTML = '编辑代码';
					codeButton.style.left = '123px';
					codeButton.style.top = '66px';
					codeButton.style.position = 'absolute';

					var citeButton = document.createElement('button');
					newCard.appendChild(citeButton);
					citeButton.innerHTML = '引用代码';
					citeButton.style.left = '123px';
					citeButton.style.top = '90px';
					citeButton.style.position = 'absolute';
					citeButton.onclick = function() {
						codeButton.style.display = 'none';
						citeButton.style.display = 'none';
						selectname.style.display = '';
						confirmcontainer.style.display = '';
					}

					var list = [];
					for (var i in lib.card) {
						if (lib.translate[i]) {
							//list.push([i, lib.translate[i]]);
							var indexss=Math.max(i.lastIndexOf('_')+1,0);
					        var alpha=i.slice(indexss,indexss+1);
					        list.push([i, alpha.toUpperCase()+'-'+lib.translate[i]]);
						}
					}
					list.sort(function(a, b) {
						a = a[0];
						b = b[0];
						var aa = a,
						bb = b;
						if (aa.lastIndexOf('_') != -1) {
							aa = aa.slice(aa.lastIndexOf('_') + 1);
						}
						if (bb.lastIndexOf('_') != -1) {
							bb = bb.slice(bb.lastIndexOf('_') + 1);
						}
						if (aa != bb) {
							return aa > bb ? 1 : -1;
						}
						return a > b ? 1 : -1;
					});
					var selectname = ui.create.selectlist(list, list[0], newCard);
					selectname.style.left = '123px';
					selectname.style.top = '66px';
					selectname.style.position = 'absolute';
					selectname.style.display = 'none';

					var confirmcontainer = ui.create.div(newCard);
					confirmcontainer.style.left = '123px';
					confirmcontainer.style.top = '90px';
					confirmcontainer.style.position = 'absolute';
					confirmcontainer.style.display = 'none';

					var citeconfirm = document.createElement('button');
					citeconfirm.innerHTML = '引用';
					confirmcontainer.appendChild(citeconfirm);
					citeconfirm.onclick = function() {
						codeButton.style.display = '';
						citeButton.style.display = '';
						selectname.style.display = 'none';
						confirmcontainer.style.display = 'none';
						container.code = 'card=' + get.stringify(lib.card[selectname.value]);
						//container.code = game.codeAllFixed(container.code);
						codeButton.onclick.call(codeButton);
						if (lib.translate[selectname.value + '_info']) {
							newCard.querySelector('input.new_description').value = lib.translate[selectname.value + '_info'];
						}
					}

					var citecancel = document.createElement('button');
					citecancel.innerHTML = '取消';
					citecancel.style.marginLeft = '3px';
					confirmcontainer.appendChild(citecancel);
					citecancel.onclick = function() {
						codeButton.style.display = '';
						citeButton.style.display = '';
						selectname.style.display = 'none';
						confirmcontainer.style.display = 'none';
					}

					codeButton.onclick = function() {
						var node = container;
						ui.window.classList.add('shortcutpaused');
						ui.window.classList.add('systempaused');
						window.saveNonameInput = saveInput;
						if (node.aced) {
							ui.window.appendChild(node);
							node.editor.setValue(game.codeAllFixed(node.code, true), 1);
						} else if (lib.device == 'ios') {
							ui.window.appendChild(node);
							if (!node.textarea) {
								var textarea = document.createElement('textarea');
								editor.appendChild(textarea);
								node.textarea = textarea;
								lib.setScroll(textarea);
							}
							node.textarea.value = node.code;
						} else {
							var aceReady = function() {
								ui.window.appendChild(node);
								var mirror = window.CodeMirror(editor, {
									value: game.codeAllFixed(node.code, true),
									mode: "javascript",
									lineWrapping: !lib.config.touchscreen && lib.config.mousewheel,
									lineNumbers: true,
									indentUnit: 4,
									autoCloseBrackets: true,
									theme: 'mdn-like'
								});
								lib.setScroll(editor.querySelector('.CodeMirror-scroll'));
								node.aced = true;
								node.editor = mirror;
							}
							if (!window.CodeMirror) {
								lib.init.js(lib.assetURL + 'game', 'codemirror', aceReady);
								lib.init.css(lib.assetURL + 'layout/default', 'codemirror');
							} else {
								aceReady();
							}
						}
					}

					var container = ui.create.div('.popup-container.editor');
					var editorpage = ui.create.div(container);
					var discardConfig = ui.create.div('.editbutton', '取消', editorpage,
					function() {
						ui.window.classList.remove('shortcutpaused');
						ui.window.classList.remove('systempaused');
						container.delete(null);
						delete window.saveNonameInput;
					});
					var saveInput = function() {
						var code;
						if (container.editor) {
							code = container.editor.getValue();
						} else if (container.textarea) {
							code = container.textarea.value;
						}
						code = game.codeAllFixed(code);
						try {
							var card = null;
							eval(code);
							if (card == null || typeof card != 'object') {
								throw ('err');
							}
						} catch(e) {
							if (e == 'err') {
								alert('代码格式有错误，请对比示例代码仔细检查');
							} else {
								alert('代码语法有错误，请仔细检查（' + e + '）')
							}
							return;
						}
						dash2.link.classList.add('active');
						ui.window.classList.remove('shortcutpaused');
						ui.window.classList.remove('systempaused');
						container.delete();
						container.code = code;
						delete window.saveNonameInput;
					};
					var saveConfig = ui.create.div('.editbutton', '保存', editorpage, saveInput);
					var editor = ui.create.div(editorpage);
					container.code = 'card={\n    \n}\n\n\/*\n示例：\ncard={\n    type:"basic",\n    enable:true,\n    filterTarget:true,\n    content:function(){\n        target.draw()\n    },\n    ai:{\n        order:1,\n        result:{\n            target:1\n        }\n    }\n}\n此例的效果为目标摸一张牌\n导出时本段代码中的换行、缩进以及注释将被清除\n*\/';

					var editnode = ui.create.div('.menubutton.large.new_card.disabled', '创建卡牌', newCard,
					function() {
						var name = page.querySelector('input.new_name').value;
						if (!name) {
							alert('请填写卡牌名\n提示：卡牌名格式为id+|+中文名，其中id必须惟一');
							return;
						}
						name = name.split('|');
						var translate = name[1] || name[0];
						var info = page.querySelector('input.new_description').value;
						name = name[0];
						if (currentButton) {
							if (currentButton.link != name) {
								if (lib.card[name] || page.content.pack.card[name]) {
									alert('卡牌名与现有卡牌重复，请更改\n提示：卡牌名格式为id+|+中文名，其中id必须惟一');
									return;
								}
								var extname;
								if (currentButton.classList.contains('fullskin')) {
									extname = '.png';
								} else {
									extname = '.jpg';
								}
								page.content.image[name + extname] = page.content.image[currentButton.link + extname];
								delete page.content.image[currentButton.link + extname];
								delete page.content.pack.card[currentButton.link];
								delete page.content.pack.translate[currentButton.link];
								delete page.content.pack.translate[currentButton.link + '_info'];
								currentButton.link = name;
							}
						} else {
							if (lib.card[name] || page.content.pack.card[name]) {
								alert('卡牌名与现有卡牌重复，请更改\n提示：卡牌名格式为id+|+中文名，其中id必须惟一');
								return;
							}
						}
						if (fakeme.image) {
							if (fakeme.classList.contains('fullskin')) {
								page.content.image[name + '.png'] = fakeme.image;
								delete page.content.image[name + '.jpg'];
							} else {
								page.content.image[name + '.jpg'] = fakeme.image;
								delete page.content.image[name + '.png'];
							}
						}/* else if (!fakeme.classList.contains('inited')) {
							alert('请选择一个卡牌背景');
							return;
						}*/
						page.content.pack.translate[name] = translate;
						page.content.pack.translate[name + '_info'] = info;
						try {
							var card = null;
							eval(container.code);
							if (card == null || typeof card != 'object') {
								throw ('err');
							}
							page.content.pack.card[name] = card;
						} catch(e) {
							page.content.pack.card[name] = {};
						}
						//alert(fakeme.classList.contains('inited'));
						if (fakeme.classList.contains('inited')&&fakeme.image64) {
							if (fakeme.classList.contains('fullskin')) {
								page.content.pack.card[name].fullskin = true;
								delete page.content.pack.card[name].fullimage;
							} else {
								page.content.pack.card[name].fullimage = true;
								delete page.content.pack.card[name].fullskin;
							}
							delete page.content.pack.card[name].noPic;
						}else {
							delete page.content.pack.card[name].fullimage;
							delete page.content.pack.card[name].fullskin;
							fakeme.noPic=true;
							page.content.pack.card[name].noPic = true;
						}
						if (this.innerHTML == '创建卡牌') {
							createButton(name, fakeme.image64, (fakeme.classList.contains('fullskin')||fakeme.noPic), fakeme.noPic);
						} else if (currentButton) {
							if(fakeme.image64) {
								if (fakeme.classList.contains('fullskin')) {
									currentButton.style.color = '';
									currentButton.style.textShadow = '';
									currentButton.imagenode.style.backgroundImage = 'url(' + fakeme.image64 + ')';
									currentButton.style.backgroundImage = '';
									currentButton.style.backgroundSize = '';
									currentButton.classList.add('fullskin');
								} else {
									currentButton.style.color = 'white';
									currentButton.style.textShadow = 'black 0 0 2px';
									currentButton.imagenode.style.backgroundImage = '';
									currentButton.style.backgroundImage = 'url(' + fakeme.image64 + ')';
									currentButton.style.backgroundSize = 'cover';
									currentButton.classList.remove('fullskin');
								}
								currentButton.noPic=false;
							}else {
							    currentButton.classList.add('fullskin');
							    currentButton.noPic=true;
							}
							currentButton.nodename.innerHTML = get.verticalStr(translate);
						}
						resetEditor();
						updatePile();
						dash2.link.classList.add('active');
						fakeme.noPic=false;
					});
					var delnode = ui.create.div('.menubutton.large.new_card_delete', '取消', editnode.parentNode,
					function() {
						if (this.innerHTML == '删除') {
							this.button.remove();
							var name = this.button.link;
							delete dash2.content.pack.card[name];
							delete dash2.content.pack.translate[name];
							delete dash2.content.pack.translate[name + '_info'];
							delete dash2.content.image[name];
							updatePile();
							dash2.link.classList.add('active');
						}
						resetEditor();
					});

					var editPile;
					var toggle2 = ui.create.div('.config.more', '编辑牌堆 <div>&gt;</div>', page,
					function() {
						this.classList.toggle('on');
						if (this.classList.contains('on')) {
							editPile.style.display = '';
						} else {
							editPile.style.display = 'none';
						}
					});

					editPile = ui.create.div('.edit_pile', page);
					editPile.style.display = 'none';

					var cardpileadd = ui.create.div('.config.toggle.cardpilecfg.cardpilecfgadd', editPile);
					var pile = ui.create.div(editPile);
					page.pile = pile;
					var cardpileaddname = document.createElement('select');
					var updatePile = function() {
						cardpileaddname.innerHTML = '';
						var list = [];
						var list2 = [];
						for (var i in page.content.pack.card) {
							list.push([i, page.content.pack.translate[i]]);
							list2.push(i);
						}
						if (list.length) {
							toggle2.style.display = '';
							if (toggle2.classList.contains('on')) {
								editPile.style.display = '';
							} else {
								editPile.style.display = 'none';
							}
							for (var i = 0; i < list.length; i++) {
								var option = document.createElement('option');
								option.value = list[i][0];
								option.innerHTML = list[i][1];
								cardpileaddname.appendChild(option);
							}
							for (var i = 0; i < pile.childNodes.length; i++) {
								if (!list2.contains(pile.childNodes[i].name)) {
									pile.childNodes[i].remove();
									i--;
								}
							}
						} else {
							toggle2.style.display = 'none';
							editPile.style.display = 'none';
							pile.innerHTML = '';
						}
					};
					updatePile();
					cardpileadd.appendChild(cardpileaddname);
					cardpileaddname.style.width = '75px';
					cardpileaddname.style.marginRight = '2px';
					cardpileaddname.style.marginLeft = '-1px';
					var cardpileaddsuit = ui.create.selectlist([['heart', '红桃'], ['diamond', '方片'], ['club', '梅花'], ['spade', '黑桃'], ], null, cardpileadd);
					cardpileaddsuit.style.width = '53px';
					cardpileaddsuit.style.marginRight = '2px';
					var cardpileaddnumber = ui.create.selectlist([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], null, cardpileadd);
					cardpileaddnumber.style.width = '43px';
					cardpileaddnumber.style.marginRight = '2px';
					var button = document.createElement('button');
					button.innerHTML = '确定';
					button.style.width = '40px';
					button.onclick = function() {
						var card = [cardpileaddsuit.value, cardpileaddnumber.value, cardpileaddname.value, ];
						var node = document.createElement('button');
						node.innerHTML = page.content.pack.translate[card[2]] + ' ' + lib.translate[card[0]] + card[1];
						node.name = card[2];
						node.link = card;
						pile.appendChild(node);
						node.onclick = function() {
							this.remove();
						}
					};
					cardpileadd.appendChild(button);
					cardpileadd.style.whiteSpace = 'nowrap';
					cardpileadd.style.position = 'relative';
					cardpileadd.style.right = '-4px';

					return page;
				} ());
				var dash3 = (function() {
					var page = ui.create.div('.hidden.menu-buttons.new_skill');
					var updateButton = function() {
						var name = page.querySelector('input.new_name').value;
						if (!name) {
							editnode.classList.add('disabled');
							return;
						}
						name = name.split('|');
						name = name[0];
						if (currentButton) {
							if (currentButton.link != name) {
								if (lib.skill[name] || page.content.pack.skill[name]) {
									editnode.classList.add('disabled');
									return;
								}
							}
						} else {
							if (lib.skill[name] || page.content.pack.skill[name]) {
								editnode.classList.add('disabled');
								return;
							}
						}
						editnode.classList.remove('disabled');
					};
					page.init = function() {
						if (!page.querySelector('.menubutton:not(.large)')) {
							toggle.classList.add('on');
							newSkill.style.display = '';
						}
					};
					page.reset = function(name) {
						resetEditor();
						var buttons = page.querySelectorAll('.menubutton:not(.large)');
						var list = [];
						for (var i = 0; i < buttons.length; i++) {
							list.push(buttons[i]);
						}
						for (var i = 0; i < list.length; i++) {
							list[i].remove();
						}
						if (lib.extensionPack[name]) {
							page.content.pack = lib.extensionPack[name].skill || {
								skill: {},
								translate: {}
							};
							page.content.audio = {};
							for (var i in page.content.pack.skill) {
								createButton(i);
							}
							dash1.updateSkill();
						} else {
							page.content = {
								pack: {
									skill: {},
									translate: {}
								},
								audio: {}
							};
							toggle.classList.add('on');
							newSkill.style.display = '';
						}
					};
					ui.create.div('.config.more.margin-bottom', '<div style="transform:none;margin-right:3px">←</div>返回', page,
					function() {
						ui.create.templayer();
						page.hide();
						if (page.fromchar) {
							dash1.show();
							delete page.fromchar;
						} else {
							pageboard.show();
						}
					});
					var currentButton = null;
					var clickButton = function() {
						if (currentButton == this) {
							resetEditor();
							return;
						}
						resetEditor();
						currentButton = this;
						toggle.classList.add('on');
						newSkill.style.display = '';
						if (page.content.pack.translate[this.link] != this.link) {
							newSkill.querySelector('.new_name').value = this.link + '|' + page.content.pack.translate[this.link];
						} else {
							newSkill.querySelector('.new_name').value = this.link;
						}
						newSkill.querySelector('.new_description').value = page.content.pack.translate[this.link + '_info'];
						var info = page.content.pack.skill[this.link];
						container.code = 'skill=' + get.stringify(info);

						toggle.innerHTML = '编辑技能 <div>&gt;</div>';
						editnode.innerHTML = '编辑技能';
						editnode.classList.remove('disabled');
						delnode.button = this;
						delnode.innerHTML = '删除';
					}
					var createButton = function(name) {
						var button = ui.create.div('.menubutton');
						button.link = name;
						button.innerHTML = page.content.pack.translate[name];
						button.listen(clickButton);
						page.insertBefore(button, page.childNodes[1]);
					}
					var newSkill;
					var toggle = ui.create.div('.config.more.on', '创建技能 <div>&gt;</div>', page,
					function() {
						this.classList.toggle('on');
						if (this.classList.contains('on')) {
							newSkill.style.display = '';
						} else {
							newSkill.style.display = 'none';
						}
					});
					page.toggle = toggle;
					var resetEditor = function() {
						currentButton = null;
						toggle.classList.remove('on');
						newSkill.style.display = 'none';
						var inputs = newSkill.querySelectorAll('input');
						for (var i = 0; i < inputs.length; i++) {
							inputs[i].value = '';
						}
						var inputs = newSkill.querySelectorAll('textarea');
						for (var i = 0; i < inputs.length; i++) {
							inputs[i].value = '';
						}
						toggle.innerHTML = '创建技能 <div>&gt;</div>';
						editnode.innerHTML = '创建技能';
						editnode.classList.add('disabled');
						delnode.innerHTML = '取消';
						delete delnode.button;
						container.code = 'skill={\n    \n}\n\n\/*\n示例：\nskill={\n    trigger:{player:"phaseJieshuBegin"},\n    frequent:true,\n    content:function(){\n        player.draw()\n    }\n}\n此例为闭月代码\n导出时本段代码中的换行、缩进以及注释将被清除\n*\/';
						if (page.fromchar == 'add') {
							page.fromchar = true;
						}
					}

					newSkill = ui.create.div('.new_character.new_skill', page);
					newSkill.style.left = '33%';
					newSkill.style.width = '50%';
					page.newSkill = newSkill;
					var namenode = ui.create.div('.config', '名称：<input class="new_name" type="text" style="width:140px"></input>', newSkill);
					var descnode = ui.create.div('.config', '描述：<input class="new_description" type="text" style="width:140px"></input>', newSkill);
					namenode.querySelector('input.new_name').onblur = updateButton;
					var commandline = ui.create.div('.config', newSkill);
					var editbutton = document.createElement('button');
					editbutton.innerHTML = '编辑代码';
					commandline.appendChild(editbutton);
					editbutton.onclick = function() {
						var node = container;
						ui.window.classList.add('shortcutpaused');
						ui.window.classList.add('systempaused');
						window.saveNonameInput = saveInput;
						if (node.aced) {
							ui.window.appendChild(node);
							node.editor.setValue(game.codeAllFixed(node.code, true), 1);
						} else if (lib.device == 'ios') {
							ui.window.appendChild(node);
							if (!node.textarea) {
								var textarea = document.createElement('textarea');
								editor.appendChild(textarea);
								node.textarea = textarea;
								lib.setScroll(textarea);
							}
							node.textarea.value = node.code;
						} else {
							var aceReady = function() {
								ui.window.appendChild(node);
								var mirror = window.CodeMirror(editor, {
									value: game.codeAllFixed(node.code, true),
									mode: "javascript",
									lineWrapping: !lib.config.touchscreen && lib.config.mousewheel,
									lineNumbers: true,
									indentUnit: 4,
									autoCloseBrackets: true,
									theme: 'mdn-like'
								});
								lib.setScroll(editor.querySelector('.CodeMirror-scroll'));
								node.aced = true;
								node.editor = mirror;
							}
							if (!window.ace) {
								lib.init.js(lib.assetURL + 'game', 'codemirror', aceReady);
								lib.init.css(lib.assetURL + 'layout/default', 'codemirror');
							} else {
								aceReady();
							}
						}
					}

					var container = ui.create.div('.popup-container.editor');
					var editorpage = ui.create.div(container);
					var discardConfig = ui.create.div('.editbutton', '取消', editorpage,
					function() {
						ui.window.classList.remove('shortcutpaused');
						ui.window.classList.remove('systempaused');
						container.delete(null);
						delete window.saveNonameInput;
					});
					var saveInput = function() {
						var code;
						if (container.editor) {
							code = container.editor.getValue();
						} else if (container.textarea) {
							code = container.textarea.value;
						}
						code = game.codeAllFixed(code);
						try {
							var skill = null;
							eval(code);
							if (skill == null || typeof skill != 'object') {
								throw ('err');
							}
						} catch(e) {
							if (e == 'err') {
								alert('代码格式有错误，请对比示例代码仔细检查');
							} else {
								alert('代码语法有错误，请仔细检查（' + e + '）')
							}
							return;
						}
						dash3.link.classList.add('active');
						ui.window.classList.remove('shortcutpaused');
						ui.window.classList.remove('systempaused');
						container.delete();
						container.code = code;
						delete window.saveNonameInput;
					};
					var saveConfig = ui.create.div('.editbutton', '保存', editorpage, saveInput);
					var editor = ui.create.div(editorpage);
					container.code = 'skill={\n    \n}\n\n\/*\n示例：\nskill={\n    trigger:{player:"phaseJieshuBegin"},\n    frequent:true,\n    content:function(){\n        player.draw()\n    }\n}\n此例为闭月代码\n导出时本段代码中的换行、缩进以及注释将被清除\n*\/';

					var citebutton = document.createElement('button');
					citebutton.innerHTML = '引用代码';
					commandline.appendChild(citebutton);
					citebutton.onclick = function() {
						editbutton.style.display = 'none';
						citebutton.style.display = 'none';
						selectname.style.display = '';
						skillopt.style.display = '';
						addSkillButton.style.display = '';
						cancelSkillButton.style.display = '';
					}

					var list = [];
					for (var i in lib.character) {
						if (lib.character[i][3].length) {
							//list.push([i, lib.translate[i]]);
							var indexss=Math.max(i.lastIndexOf('_')+1,0);
					        var alpha=i.slice(indexss,indexss+1);
					        list.push([i, (game.isForbidedCharacter(i) ? '🚫' : '') + alpha.toUpperCase()+'-'+lib.translate[i]]);
						}
					}
					game.sortEditCharacterList(list);
					/*list.sort(function(a, b) {
						a = a[0];
						b = b[0];
						var aa = a,
						bb = b;
						if (aa.lastIndexOf('_') != -1) {
							aa = aa.slice(aa.lastIndexOf('_') + 1);
						}
						if (bb.lastIndexOf('_') != -1) {
							bb = bb.slice(bb.lastIndexOf('_') + 1);
						}
						if (aa != bb) {
							return aa > bb ? 1 : -1;
						}
						return a > b ? 1 : -1;
					});*/
					list.push(['others', '其它']);
					var list2 = [];
					var skills = lib.character[list[0][0]][3];
					for (var i = 0; i < skills.length; i++) {
						list2.push([skills[i], lib.translate[skills[i]]]);
					}
					var selectname = ui.create.selectlist(list, list[0], commandline);
					var list3 = [];
					for (var i in lib.skill) {
						if (i != 'global' && !get.is.empty(lib.skill[i]) && !lib.skilllist.contains(i)) {
							list3.push(i);
						}
					}
					list3.sort(function(a, b) {
						return a > b ? 1 : -1;
					});
					selectname.onchange = function() {
						var skills;
						skillopt.innerHTML = '';
						if (this.value == 'others') {
							skills = list3;
							for (var i = 0; i < skills.length; i++) {
								var option = document.createElement('option');
								option.value = skills[i];
								option.innerHTML = skills[i];
								skillopt.appendChild(option);
							}
						} else {
							skills = lib.character[this.value][3];
							for (var i = 0; i < skills.length; i++) {
								var option = document.createElement('option');
								option.value = skills[i];
								option.innerHTML = lib.translate[skills[i]];
								skillopt.appendChild(option);
							}
						}
					};
					selectname.style.display = 'none';
					selectname.style.maxWidth = '95px';
					var skillopt = ui.create.selectlist(list2, list2[0], commandline);
					skillopt.style.display = 'none';
					skillopt.style.maxWidth = '60px';
					var addSkillButton = document.createElement('button');
					addSkillButton.style.display = 'none';
					addSkillButton.innerHTML = '引用';
					commandline.appendChild(addSkillButton);
					addSkillButton.onclick = function() {
						editbutton.style.display = '';
						citebutton.style.display = '';
						selectname.style.display = 'none';
						skillopt.style.display = 'none';
						addSkillButton.style.display = 'none';
						cancelSkillButton.style.display = 'none';
						container.code = 'skill=' + get.stringify(lib.skill[skillopt.value]);
						//container.code = game.codeAllFixed(container.code);
						editbutton.onclick.call(editbutton);
						if (lib.translate[skillopt.value + '_info']) {
							newSkill.querySelector('input.new_description').value = lib.translate[skillopt.value + '_info'];
						}
					}
					var cancelSkillButton = document.createElement('button');
					cancelSkillButton.style.display = 'none';
					cancelSkillButton.innerHTML = '取消';
					commandline.appendChild(cancelSkillButton);
					cancelSkillButton.onclick = function() {
						editbutton.style.display = '';
						citebutton.style.display = '';
						selectname.style.display = 'none';
						skillopt.style.display = 'none';
						addSkillButton.style.display = 'none';
						cancelSkillButton.style.display = 'none';
					}

					var editnode = ui.create.div('.menubutton.large.new_skill.disabled', '创建技能',
					function() {
						var name = page.querySelector('input.new_name').value;
						if (!name) {
							alert('请填写技能名\n提示：技能名格式为id+|+中文名，其中id必须惟一');
							return;
						}
						name = name.split('|');
						var translate = name[1] || name[0];
						var info = page.querySelector('input.new_description').value;
						name = name[0];
						if (currentButton) {
							if (currentButton.link != name) {
								if (lib.skill[name] || page.content.pack.skill[name]) {
									alert('技能名与现有技能重复，请更改\n提示：技能名格式为id+|+中文名，其中id必须惟一');
									return;
								}
								delete page.content.pack.skill[currentButton.link];
								delete page.content.pack.translate[currentButton.link];
								delete page.content.pack.translate[currentButton.link + '_info'];
								currentButton.link = name;
							}
						} else {
							if (lib.skill[name] || page.content.pack.skill[name]) {
								alert('技能名与现有技能重复，请更改\n提示：技能名格式为id+|+中文名，其中id必须惟一');
								return;
							}
						}
						page.content.pack.translate[name] = translate;
						page.content.pack.translate[name + '_info'] = info;
						try {
							var skill = null;
							eval(container.code);
							if (skill == null || typeof skill != 'object') {
								throw ('err');
							}
							page.content.pack.skill[name] = skill;
						} catch(e) {
							page.content.pack.skill[name] = {};
						}
						dash1.selectname.value = 'current_extension';
						dash1.selectname.onchange.call(dash1.selectname);
						if (this.innerHTML == '创建技能') {
							createButton(name);
							if (page.fromchar == 'add') {
								ui.create.templayer();
								page.hide();
								dash1.show();
								dash1.skillopt.value = name;
								dash1.addSkillButton.onclick();
								delete page.fromchar;
							}
						} else if (currentButton) {
							currentButton.innerHTML = translate;
						}
						resetEditor();
						dash3.link.classList.add('active');
						dash1.updateSkill();
					},
					newSkill);
					var delnode = ui.create.div('.menubutton.large.new_card_delete', '取消', editnode.parentNode,
					function() {
						if (this.innerHTML == '删除') {
							this.button.remove();
							var name = this.button.link;
							delete dash3.content.pack.skill[name];
							delete dash3.content.pack.translate[name];
							delete dash3.content.pack.translate[name + '_info'];
							dash3.link.classList.add('active');
							if (get.is.empty(dash3.content.pack.skill)) {
								dash1.selectname.value = dash1.selectname.childNodes[1].value;
							}
							dash1.selectname.onchange.call(dash1.selectname);
							dash1.updateSkill();
							resetEditor();
						} else if (page.fromchar == 'add') {
							ui.create.templayer();
							page.hide();
							dash1.show();
							delete page.fromchar;
							setTimeout(resetEditor, 600);
						} else {
							resetEditor();
						}
					});

					page.content = {
						pack: {
							skill: {},
							translate: {}
						},
						audio: {}
					};
					return page;
				} ());
				var dash4 = (function() {
					var page = ui.create.div('.hidden.menu-buttons');
					ui.create.div('.config.more.margin-bottom', '<div style="transform:none;margin-right:3px">←</div>返回', page,
					function() {
						ui.create.templayer();
						page.hide();
						pageboard.show();
					});
					page.reset = function(name) {
						page.content = {};
						if (lib.extensionPack[name]) {
							for (var i in dashes) {
								dashes[i].node.code = '';
							}
							for (var i in lib.extensionPack[name].code) {
								switch (typeof lib.extensionPack[name].code[i]) {
								case 'function':
									page.content[i] = lib.extensionPack[name].code[i].toString();
									break;
								case 'object':
									page.content[i] = i + '=' + get.stringify(lib.extensionPack[name].code[i]);
									break;
								}
							}
							for (var i in page.content) {
								dashes[i].node.code = page.content[i] || '';
							}
						} else {
							dashes.content.node.code = 'function(config,pack){\n    \n}\n\n\/*\n函数执行时机为游戏数据加载之后、界面加载之前\n参数1扩展选项（见选项代码）；参数2为扩展定义的武将、卡牌和技能等（可在此函数中修改）\n导出时本段代码中的换行、缩进以及注释将被清除\n*\/';
							dashes.precontent.node.code = 'function(){\n    \n}\n\n\/*\n函数执行时机为游戏数据加载之前，且不受禁用扩展的限制\n除添加模式外请慎用\n导出时本段代码中的换行、缩进以及注释将被清除\n*\/';
							dashes.config.node.code = 'config={\n    \n}\n\n\/*\n示例：\nconfig={\n    switcher_example:{\n    name:"示例列表选项",\n        init:"3",\n        item:{"1":"一","2":"二","3":"三"}\n    },\n    toggle_example:{\n        name:"示例开关选项",\n        init:true\n    }\n}\n此例中传入的主代码函数的默认参数为{switcher_example:"3",toggle_example:true}\n导出时本段代码中的换行、缩进以及注释将被清除\n*\/';
							dashes.help.node.code = 'help={\n    \n}\n\n\/*\n示例：\nhelp={\n    "帮助条目":"<ul><li>列表1-条目1<li>列表1-条目2</ul><ol><li>列表2-条目1<li>列表2-条目2</ul>"\n}\n帮助内容将显示在菜单－选项－帮助中\n导出时本段代码中的换行、缩进以及注释将被清除\n*\/';
						}
					};
					var dashes = {};
					var createCode = function(str1, str2, sub, func, link, str) {
						var dash = ui.create.div('.menubutton.large.dashboard');
						dashes[link] = dash;
						sub.appendChild(dash);
						dash.listen(func);
						dash.link = link;
						ui.create.div('', str1, dash);
						ui.create.div('', str2, dash);
						var container = ui.create.div('.popup-container.editor');
						var editorpage = ui.create.div(container);
						var discardConfig = ui.create.div('.editbutton', '取消', editorpage,
						function() {
							ui.window.classList.remove('shortcutpaused');
							ui.window.classList.remove('systempaused');
							container.delete(null);
							delete window.saveNonameInput;
						});
						var saveInput = function() {
							var code;
							if (container.editor) {
								code = container.editor.getValue();
							} else if (container.textarea) {
								code = container.textarea.value;
							}
							code = game.codeAllFixed(code);
							try {
								if (link == 'content' || link == 'precontent') {
									var func = null;
									eval('func=' + code);
									if (typeof func != 'function') {
										throw ('err');
									}
								} else if (link == 'config') {
									var config = null;
									eval(code);
									if (config == null || typeof config != 'object') {
										throw ('err');
									}
								} else if (link == 'help') {
									var help = null;
									eval(code);
									if (help == null || typeof help != 'object') {
										throw ('err');
									}
								}
							} catch(e) {
								if (e == 'err') {
									alert('代码格式有错误，请对比示例代码仔细检查');
								} else {
									alert('代码语法有错误，请仔细检查（' + e + '）')
								}
								return;
							}
							dash4.link.classList.add('active');
							ui.window.classList.remove('shortcutpaused');
							ui.window.classList.remove('systempaused');
							container.delete();
							container.code = code;
							page.content[link] = code;
							delete window.saveNonameInput;
						};
						var saveConfig = ui.create.div('.editbutton', '保存', editorpage, saveInput);
						var editor = ui.create.div(editorpage);
						container.code = str;
						dash.editor = editor;
						dash.node = container;
						dash.saveInput = saveInput;
						page.content[link] = str;
					};
					var clickCode = function() {
						var node = this.node;
						ui.window.classList.add('shortcutpaused');
						ui.window.classList.add('systempaused');
						window.saveNonameInput = this.saveInput;
						if (node.aced) {
							ui.window.appendChild(node);
							node.editor.setValue(game.codeAllFixed(node.code, true), 1);
						} else if (lib.device == 'ios') {
							ui.window.appendChild(node);
							if (!node.textarea) {
								var textarea = document.createElement('textarea');
								this.editor.appendChild(textarea);
								node.textarea = textarea;
								lib.setScroll(textarea);
							}
							node.textarea.value = node.code;
						} else {
							var editor = this.editor;
							var aceReady = function() {
								ui.window.appendChild(node);
								var mirror = window.CodeMirror(editor, {
									value: game.codeAllFixed(node.code, true),
									mode: "javascript",
									lineWrapping: !lib.config.touchscreen && lib.config.mousewheel,
									lineNumbers: true,
									indentUnit: 4,
									autoCloseBrackets: true,
									theme: 'mdn-like'
								});
								lib.setScroll(editor.querySelector('.CodeMirror-scroll'));
								node.aced = true;
								node.editor = mirror;
							}
							if (!window.ace) {
								lib.init.js(lib.assetURL + 'game', 'codemirror', aceReady);
								lib.init.css(lib.assetURL + 'layout/default', 'codemirror');
							} else {
								aceReady();
							}
						}
					};
					page.content = {}
					createCode('主', '主代码', page, clickCode, 'content', 'function(config,pack){\n    \n}\n\n\/*\n函数执行时机为游戏数据加载之后、界面加载之前\n参数1扩展选项（见选项代码）；参数2为扩展定义的武将、卡牌和技能等（可在此函数中修改）\n导出时本段代码中的换行、缩进以及注释将被清除\n*\/');
					createCode('启', '启动代码', page, clickCode, 'precontent', 'function(){\n    \n}\n\n\/*\n函数执行时机为游戏数据加载之前，且不受禁用扩展的限制\n除添加模式外请慎用\n导出时本段代码中的换行、缩进以及注释将被清除\n*\/');
					createCode('选', '选项代码', page, clickCode, 'config', 'config={\n    \n}\n\n\/*\n示例：\nconfig={\n    switcher_example:{\n        name:"示例列表选项",\n        init:"3",\n     	  item:{"1":"一","2":"二","3":"三"}\n    },\n    toggle_example:{\n        name:"示例开关选项",\n        init:true\n    }\n}\n此例中传入的主代码函数的默认参数为{switcher_example:"3",toggle_example:true}\n导出时本段代码中的换行、缩进以及注释将被清除\n*\/');
					createCode('帮', '帮助代码', page, clickCode, 'help', 'help={\n    \n}\n\n\/*\n示例：\nhelp={\n    "帮助条目":"<ul><li>列表1-条目1<li>列表1-条目2</ul><ol><li>列表2-条目1<li>列表2-条目2</ul>"\n}\n帮助内容将显示在菜单－选项－帮助中\n导出时本段代码中的换行、缩进以及注释将被清除\n*\/');

					return page;
				} ());
				createDash('将', '编辑武将', dash1);
				createDash('卡', '编辑卡牌', dash2);
				createDash('技', '编辑技能', dash3);
				createDash('码', '编辑代码', dash4);
			} ()); (function() {
				var page = ui.create.div('');
				var node = ui.create.div('.menubutton.large', '获取扩展', start.firstChild, clickMode);
				node.link = page;
				node.mode = 'get';
				page.listen(function() {
					if (!page.currenttimeout) {
						var active = page.querySelector('.videonode.current');
						if (active) {
							active.classList.remove('current');
						}
					}
				});
				var importextensionexpanded = false;
				page.style.paddingBottom = '10px';
				var importExtension;
				var extensionnode = ui.create.div('.config.more', '导入扩展 <div>&gt;</div>', page,
				function() {
					if (importextensionexpanded) {
						this.classList.remove('on');
						importExtension.style.display = 'none';
					} else {
						this.classList.add('on');
						importExtension.style.display = '';
					}
					importextensionexpanded = !importextensionexpanded;
				});
				importExtension = ui.create.div('.new_character.export.import', page);
				importExtension.style.marginLeft = '5px';
				importExtension.style.marginTop = '5px';
				importExtension.style.marginBottom = '5px';
				importExtension.style.display = 'none';
				importExtension.style.width = '100%';
				importExtension.style.textAlign = 'left';
				ui.create.div('', '<input type="file" accept="application/zip" style="width:153px"><button>确定</button>', importExtension);

				var extensionURL;
				var source = lib.config.extension_sources,
				index = lib.config.extension_source;
				if (source && source[index]) extensionURL = source[index];
				else extensionURL = lib.updateURL.replace(/noname/g, 'noname-extension') + '/master/';

				var reloadnode = ui.create.div('.config.toggle.pointerdiv', '重新启动', page, game.reload);
				reloadnode.style.display = 'none';
				var placeholder = ui.create.div('.config.toggle', page);
				placeholder.style.height = 0;
				placeholder.style.marginTop = '5px';

				importExtension.firstChild.lastChild.onclick = function() {
					var fileToLoad = this.previousSibling.files[0];
					if (fileToLoad) {
						var fileReader = new FileReader();
						fileReader.onload = function(fileLoadedEvent) {
							var finishLoad = function() {
								extensionnode.innerHTML = '导入成功，3秒后将重启';
								setTimeout(function() {
									extensionnode.innerHTML = '导入成功，2秒后将重启';
									setTimeout(function() {
										extensionnode.innerHTML = '导入成功，1秒后将重启';
										setTimeout(game.reload, 1000);
									},
									1000);
								},
								1000);
							};
							var data = fileLoadedEvent.target.result;
							if (game.importExtension(data, finishLoad) !== false) {
								importExtension.style.display = 'none';
							}
						};
						fileReader.readAsArrayBuffer(fileToLoad, "UTF-8");
					}
				}

				var clickExtension = function() {
					var active = this.parentNode.querySelector('.videonode.current');
					if (active && active != this) {
						active.classList.remove('current');
					}
					this.classList.add('current');
					clearTimeout(page.currenttimeout);
					page.currenttimeout = setTimeout(function() {
						delete page.currenttimeout;
					},
					200);
				};
				var downloadExtension = function(e) {
					if ((this.innerHTML != '下载扩展' && this.innerHTML != '更新扩展') || !window.JSZip) return;
					this.classList.remove('update');
					if (e) {
						e.stopPropagation();
					}
					node.updated = true;
					var that = this;
					var list = [];
					var size = parseFloat(this.info.size) || 0;
					if (size) {
						if (this.info.size.indexOf('MB') != -1) {
							size *= 1024 * 1024;
						} else if (this.info.size.indexOf('KB') != -1) {
							size *= 1024;
						}
					}

					this.innerHTML = '<span>正在下载</span><div>正在下载</div>';
					this.classList.add('nopointer');
					this.classList.add('button-downloading');
					var progress = ui.create.div('.button-progress', this);
					ui.create.div(progress);
					var url = extensionURL + this.info.name + '.zip';
					var onprogress = function(byte, total) {
						if (total) {
							size = total;
						}
						if (byte == -1) {
							byte = size;
						}
						progress.firstChild.style.width = Math.round(100 * byte / size) + '%';
					};
					var files = this.info.files || [];
					for (var i = 0; i < files.length; i++) {
						files[i] = 'extension/' + that.info.name + '/' + files[i];
					}
					game.checkFileList(files,
					function() {
						files.unshift('extension/' + that.info.name + '/extension.js');
						for (var i = 0; i < files.length; i++) {
							files[i] = extensionURL + that.info.name + '/' + files[i].slice(10 + that.info.name.length + 1);
						}
						var n1 = 0,
						n2 = files.length;
						game.multiDownload(files,
						function() {
							n1++;
							onprogress(n1, n2);
						},
						function(e) {
							game.print('下载失败：' + e.source);
						},
						function() {
							onprogress( - 1);
							_status.importingExtension = true;
							window.game = game;
							lib.init.js(lib.assetURL + 'extension/' + that.info.name, 'extension',
							function() {
								if (!lib.config.dev) delete window.game;
								if (game.importedPack) {
									var extname = game.importedPack.name;
									if (lib.config.extensions.contains(extname)) {
										game.removeExtension(extname, true);
									}
									lib.config.extensions.add(extname);
									game.saveConfig('extensions', lib.config.extensions);
									game.saveConfig('extension_' + extname + '_enable', true);
									game.saveConfig('extension_' + extname + '_version', that.info.version);
									for (var i in game.importedPack.config) {
										if (game.importedPack.config[i] && game.importedPack.config[i].hasOwnProperty('init')) {
											game.saveConfig('extension_' + extname + '_' + i, game.importedPack.config[i].init);
										}
									}
									reloadnode.style.display = '';
									that.childNodes[0].innerHTML = '安装成功';
									that.childNodes[1].innerHTML = '安装成功';
									that.classList.remove('active');
									that.classList.remove('highlight');
									delete game.importedPack;
								} else {
									that.innerHTML = '安装失败';
									that.classList.add('nopointer');
								}
								_status.importingExtension = false;
							},
							function() {
								that.innerHTML = '下载失败';
								that.classList.add('nopointer');
								_status.importingExtension = false;
							});
						},
						function(current) {
							return 'extension/' + current.slice(extensionURL.length);
						});
					});
				};

				node.update = function() {
					if (this.updated) return;
					if (!window.JSZip) {
						lib.init.js(lib.assetURL + 'game', 'jszip');
					}
					var toremove = [];
					for (var i = 0; i < page.childElementCount; i++) {
						if (page.childNodes[i].classList.contains('menubutton') || page.childNodes[i].classList.contains('loading')) {
							toremove.push(page.childNodes[i]);
						}
					}
					for (var i = 0; i < toremove.length; i++) {
						toremove[i].remove();
					}

					var loading = ui.create.div('.loading.config.toggle', '载入中...', page);
					var loaded = function(list) {
						var list = [];
						var extension = window.extension;
						for (var i in extension) {
							extension[i].name = i;
							list.push(extension[i]);
						}
						list.randomSort();
						delete window.extension;
						loading.style.display = 'none';
						for (var i = 0; i < list.length; i++) {
							var node = ui.create.div('.videonode.menubutton.extension.large', page, clickExtension);
							ui.create.div('.caption', list[i].name, node);
							ui.create.div('.text.author', '作者：' + list[i].author + '<span>(' + list[i].size + ')</span>', node);
							ui.create.div('.text', list[i].intro, node);
							var download = ui.create.div('.menubutton.text.active', '下载扩展', node.firstChild);
							if (game.download) {
								if (list[i].netdisk) {
									var linknode = ui.create.div('.text', node);
									ui.create.node('span.hrefnode', '网盘链接',
									function() {
										game.open(this.link);
									},
									linknode).link = list[i].netdisk;
									if (list[i].forum) {
										ui.create.node('span', linknode).style.marginRight = '10px';
										ui.create.node('span.hrefnode', '参与讨论',
										function() {
											game.open(this.link);
										},
										linknode).link = list[i].forum;
									}
								} else if (list[i].forum) {
									var linknode = ui.create.div('.text', node);
									ui.create.node('span.hrefnode', '参与讨论',
									function() {
										game.open(this.link);
									},
									linknode).link = list[i].forum;
								}
								download.listen(downloadExtension);
								if (lib.config.extensions.contains(list[i].name)) {
									download.classList.remove('active');
									if (lib.extensionPack[list[i].name] && lib.extensionPack[list[i].name].version == list[i].version) {
										download.classList.add('transparent2');
										download.classList.remove('active');
										download.innerHTML = '已安装';
									} else if (lib.config['extension_' + list[i].name + '_version'] != list[i].version) {
										download.innerHTML = '更新扩展';
										download.classList.add('highlight');
										download.classList.add('update');
									} else {
										download.classList.add('transparent2');
										download.classList.remove('active');
										download.innerHTML = '已安装';
									}
								}
								download.info = list[i];
							} else {
								if (list[i].forum) {
									var linknode = ui.create.div('.text', node);
									ui.create.node('span', linknode);
									ui.create.node('span.hrefnode', '参与讨论',
									function() {
										game.open(this.link);
									},
									linknode).link = list[i].forum;
								}
								download.listen(function() {
									game.open(this.link);
								});
								download.link = list[i].netdisk;
							}
						}
					};
					window.extension = {};
					loading.innerHTML = '';
					return;
					if (game.download) {
						lib.init.req(extensionURL + 'catalog.js',
						function() {
							try {
								eval(this.responseText);
								// if(!window.noname_extension_list){
								// 	throw('err');
								// }
							} catch(e) {
								delete window.extension;
								loading.innerHTML = '连接失败';
								return;
							}
							loaded();
						},
						function() {
							delete window.extension;
							loading.innerHTML = '连接失败';
						});
					} else {
						lib.init.js(extensionURL.replace(/raw\.githubusercontent\.com/, 'rawgit.com') + 'catalog.js', null, loaded,
						function() {
							delete window.extension;
							loading.innerHTML = '连接失败';
						});
					}
				};
			} ());
			var active = start.firstChild.querySelector('.active');
			if (!active) {
				active = start.firstChild.firstChild;
				active.classList.add('active');
			}
			rightPane.appendChild(active.link);
			updateNodes();
		} ());

		(function() {
			if (connectMenu) return;
			var start = menuxpages.shift();
			var rightPane = start.lastChild;
			var cheatButton = ui.create.div('.menubutton.roundo.highlight', '作', start);
			cheatButton.style.display = 'none';
			var runButton = ui.create.div('.menubutton.roundo.highlight', '执', start);
			runButton.style.display = 'none';
			var clearButton = ui.create.div('.menubutton.roundo.highlight', '清', start);
			clearButton.style.display = 'none';
			//clearButton.style.left = '275px';
			clearButton.style.left = 'calc(100% - 160px)';
			var playButton = ui.create.div('.menubutton.roundo.highlight.hidden', '播', start);
			playButton.style.display = 'none';
			playButton.style.left = '215px';
			playButton.style.transition = 'opacity 0.3s';
			var deleteButton = ui.create.div('.menubutton.roundo.highlight.hidden', '删', start);
			deleteButton.style.display = 'none';
			deleteButton.style.left = '275px';
			deleteButton.style.transition = 'opacity 0.3s';
			var saveButton = ui.create.div('.menubutton.roundo.highlight.hidden', '存', start);
			saveButton.style.display = 'none';
			saveButton.style.transition = 'opacity 0.3s';

			var clickMode = function() {
			game.playAudio('../extension/手杀ui/audio/TinyButton.mp3');
			/*其他栏左侧的声音*/
				if (this.classList.contains('off')) return;
				var active = this.parentNode.querySelector('.active');
				if (active === this) {
					return;
				}
				if (active) {
					active.classList.remove('active');
					active.link.remove();
				}
				active = this;
				this.classList.add('active');
				rightPane.appendChild(this.link);
				if (this.type == 'cheat') {
					cheatButton.style.display = '';
				} else {
					cheatButton.style.display = 'none';
				}
				if (this.type == 'cmd') {
					runButton.style.display = '';
					clearButton.style.display = '';
				} else {
					runButton.style.display = 'none';
					clearButton.style.display = 'none';
				}
				//禁止处理录像
				if (false&&this.type == 'video') {
					playButton.style.display = '';
					saveButton.style.display = '';
					deleteButton.style.display = '';
				} else {
					playButton.style.display = 'none';
					saveButton.style.display = 'none';
					deleteButton.style.display = 'none';
				}
			};

			ui.click.consoleMenu = function() {
				ui.click.menuTab('其它');
				clickMode.call(ui.commandnode);
			}; (function() {
				var page = ui.create.div('');
				var node = ui.create.div('.menubutton.large', '更新', start.firstChild, clickMode);
				node.link = page;
				page.classList.add('menu-help');
				var ul = document.createElement('ul');
				var li1 = document.createElement('li');
				var li2 = document.createElement('li');
				var li3 = document.createElement('li');
				var trimurl = function(str) {
					if (str == lib.updateURLS.github) {
						return 'GitHub';
					}
					if (str == lib.updateURLS.coding) {
						return 'Coding';
					}
					var index;
					index = str.indexOf('://');
					if (index != -1) {
						str = str.slice(index + 3);
					}
					index = str.indexOf('/');
					if (index != -1) {
						str = str.slice(0, index);
					}
					if (str.length > 15) {
						var list = str.split('.');
						if (list.length > 1) {
							list.shift();
						}
						str = list[0];
						for (var i = 1; i < list.length; i++) {
							str += '.' + list[i];
						}
					}
					if (str.length > 15) {
						var list = str.split('.');
						if (list.length > 1) {
							list.pop();
						}
						str = list[0];
						for (var i = 1; i < list.length; i++) {
							str += '.' + list[i];
						}
					}
					return str;
				}
				li1.innerHTML = '游戏版本：' + lib.version + '<p style="margin-top:8px;white-space:nowrap"></p>';
				li2.innerHTML = '素材版本：' + (lib.config.asset_version || '无') + '<p style="margin-top:8px"></p>';
				li3.innerHTML = '更新地址：<span>' + trimurl(lib.config.updateURL || lib.updateURL) + '</span><p style="margin-top:8px"></p>';
				li3.style.whiteSpace = 'nowrap';
				li3.style.display = 'none'; // coding
				var button1, button2, button3, button4, button5;

				game.checkForUpdate = function(forcecheck, dev) {
					if (!dev && button1.disabled) {
						return;
					} else if (dev && button3.disabled) {
						return;
					} else if (!game.download) {
						alert('此版本不支持游戏内更新，请手动更新');
						return;
					} else {
						if (dev) {
							button3.innerHTML = '正在检查更新';
						} else {
							button1.innerHTML = '正在检查更新';
						}
						button3.disabled = true;
						button1.disabled = true;

						var goupdate = function(files, update) {
							lib.version = update.version;
							if (update.dev && !lib.config.debug) {
								dev = 'nodev';
							}
							lib.init.req('game/source.js',
							function() {
								try {
									eval(this.responseText);
									if (!window.noname_source_list) {
										throw ('err');
									}
								} catch(e) {
									alert('更新地址有误');
									console.log(e);
									return;
								}

								var updates = window.noname_source_list;
								delete window.noname_source_list;
								if (Array.isArray(files)) {
									files.add('game/update.js');
									var files2 = [];
									for (var i = 0; i < files.length; i++) {
										var str = files[i].indexOf('*');
										if (str != -1) {
											str = files[i].slice(0, str);
											files.splice(i--, 1);
											for (var j = 0; j < updates.length; j++) {
												if (updates[j].indexOf(str) == 0) {
													files2.push(updates[j]);
												}
											}
										}
									}
									updates = files.concat(files2);
								}
								for (var i = 0; i < updates.length; i++) {
									if (updates[i].indexOf('theme/') == 0 && updates[i].indexOf('.css') == -1) {
										updates.splice(i--, 1);
									} else if (updates[i].indexOf('node_modules/') == 0 && !update.node) {
										updates.splice(i--, 1);
									}
								}

								if (!ui.arena.classList.contains('menupaused')) {
									ui.click.configMenu();
									ui.click.menuTab('其它');
								}
								var p = button1.parentNode;
								button1.remove();
								button3.remove();
								var span = document.createElement('span');
								var n1 = 0;
								var n2 = updates.length;
								span.innerHTML = '正在下载文件（' + n1 + '/' + n2 + '）';
								p.appendChild(span);
								var finish = function() {
									span.innerHTML = '游戏更新完毕（' + n1 + '/' + n2 + '）';
									p.appendChild(document.createElement('br'));
									var button = document.createElement('button');
									button.innerHTML = '重新启动';
									button.onclick = game.reload;
									button.style.marginTop = '8px';
									p.appendChild(button);
								}
								game.multiDownload(updates,
								function() {
									n1++;
									span.innerHTML = '正在下载文件（' + n1 + '/' + n2 + '）';
								},
								function(e) {
									game.print('下载失败：' + e.source);
								},
								function() {
									setTimeout(finish, 500);
								},
								null, dev);
							},
							function() {
								alert('更新地址有误');
							},
							true);
						};

						lib.init.req('game/update.js',
						function() {
							try {
								eval(this.responseText);
								if (!window.noname_update) {
									throw ('err');
								}
							} catch(e) {
								alert('更新地址有误');
								console.log(e);
								return;
							}

							var update = window.noname_update;
							delete window.noname_update;
							if (forcecheck === false) {
								if (update.version == lib.config.check_version) {
									return;
								}
							}
							game.saveConfig('check_version', update.version);
							var goon = true;
							if (!dev) {
								if (update.version.indexOf('beta') != -1 || update.version == lib.version) {
									goon = false;
								}
							}
							if (goon) {
								var files = null;
								var version = lib.version;
								if (Array.isArray(update.dev) && dev) {
									files = update.dev;
								} else if (Array.isArray(update.files) && update.update && !dev) {
									var version1 = version.split('.');
									var version2 = update.update.split('.');
									for (var i = 0; i < version1.length && i < version2.length; i++) {
										if (version2[i] > version1[i]) {
											files = false;
											break;
										} else if (version1[i] > version2[i]) {
											files = update.files.slice(0);
											break;
										}
									}
									if (files === null) {
										if (version1.length >= version2.length) {
											files = update.files.slice(0);
										}
									}
								}
								var str;
								if (dev) {
									str = '开发版仅供测试使用，可能存在风险，是否确定更新？'
								} else {
									str = '有新版本' + update.version + '可用，是否下载？';
								}
								if (navigator.notification && navigator.notification.confirm) {
									var str2;
									if (dev) {
										str2 = str;
										str = '更新到开发版';
									} else {
										str2 = update.changeLog[0];
										for (var i = 1; i < update.changeLog.length; i++) {
											if (update.changeLog[i].indexOf('://') == -1) {
												str2 += '；' + update.changeLog[i];
											}
										}
									}
									navigator.notification.confirm(str2,
									function(index) {
										if (index == 1) {
											goupdate(files, update);
										} else {
											button1.disabled = false;
											button1.innerHTML = '检查游戏更新';
											button3.disabled = false;
											button3.innerHTML = '更新到开发版';
										}
									},
									str, ['确定', '取消']);
								} else {
									if (confirm(str)) {
										goupdate(files, update);
									} else {
										button1.disabled = false;
										button1.innerHTML = '检查游戏更新';
										button3.disabled = false;
										button3.innerHTML = '更新到开发版';
									}
								}
							} else {
								alert('当前版本已是最新');
								button1.disabled = false;
								button1.innerHTML = '检查游戏更新';
								button3.disabled = false;
								button3.innerHTML = '更新到开发版';
							}
						},
						function() {
							if (forcecheck === false) {
								return;
							}
							alert('连接失败');
							button1.disabled = false;
							button1.innerHTML = '检查游戏更新';
							button3.disabled = false;
							button3.innerHTML = '更新到开发版';
						},
						true);
					}
				};
				game.checkForAssetUpdate = function(type) {
					if (button2.disabled) {
						return;
					} else if (game.download) {
						button2.innerHTML = '正在检查更新';
						button2.disabled = true;
						lib.init.req('game/asset.js',
						function() {
							try {
								eval(this.responseText);
								if (!window.noname_asset_list || !window.noname_skin_list) {
									throw ('err');
								}
							} catch(e) {
								alert('更新地址有误');
								console.log(e);
								return;
							}

							var updates = window.noname_asset_list;
							delete window.noname_asset_list;
							var skins = window.noname_skin_list;
							delete window.noname_skin_list;
							var asset_version = updates.shift();

							var skipcharacter = [],
							skipcard = ['tiesuo_mark'];
							if (!lib.config.asset_full) {
								for (var i = 0; i < lib.config.all.sgscharacters.length; i++) {
									var pack = lib.characterPack[lib.config.all.sgscharacters[i]];
									for (var j in pack) {
										skipcharacter.add(j);
									}
								}
								for (var i = 0; i < lib.config.all.sgscards.length; i++) {
									var pack = lib.cardPack[lib.config.all.sgscards[i]];
									if (pack) {
										skipcard = skipcard.concat(pack);
									}
								}
							}
							for (var i = 0; i < updates.length; i++) {
								switch (updates[i].slice(0, 5)) {
								case 'image':
									{
										if (!lib.config.asset_full) {
											if (!lib.config.asset_image) {
												updates.splice(i--, 1);
											} else {
												if (updates[i].indexOf('image/character') == 0) {
													if (updates[i].indexOf('jun_') != 16 && updates[i].indexOf('gz_') != 16 && !skipcharacter.contains(updates[i].slice(16, updates[i].lastIndexOf('.')))) {
														updates.splice(i--, 1);
													}
												} else if (updates[i].indexOf('image/card') == 0) {
													if (updates[i].indexOf('qiaosi_card') != 11 && !skipcard.contains(updates[i].slice(11, updates[i].lastIndexOf('.')))) {
														updates.splice(i--, 1);
													}
												} else if (updates[i].indexOf('image/mode/stone') == 0) {
													updates.splice(i--, 1);
												}
											}
										}
										break;
									}
								case 'audio':
									{
										if (!lib.config.asset_audio) {
											updates.splice(i--, 1);
										}
										break;
									}
								case 'font/':
									{
										if (!lib.config.asset_font) {
											updates.splice(i--, 1);
										}
									}
								}
							}
							if (lib.config.asset_skin) {
								for (var i in skins) {
									for (var j = 1; j <= skins[i]; j++) {
										updates.push('image/skin/' + i + '/' + j + '.jpg');
									}
								}
							}
							if (!ui.arena.classList.contains('menupaused')) {
								ui.click.configMenu();
								ui.click.menuTab('其它');
							}

							var proceed = function() {
								if (updates.length == 0) {
									game.print(updates);
									game.saveConfig('asset_version', asset_version);
									alert('素材已是最新');
									button2.disabled = false;
									button2.innerHTML = '检查素材更新';
									return;
								}
								var p = button2.parentNode;
								button2.remove();
								var span = document.createElement('span');
								span.style.whiteSpace = 'nowrap';
								var n1 = 0;
								var n2 = updates.length;
								span.innerHTML = '正在下载素材（' + n1 + '/' + n2 + '）';
								span1.remove();
								span2.remove();
								span2_check.remove();
								span3.remove();
								span3_check.remove();
								span4.remove();
								span4_check.remove();
								span5.remove();
								span5_check.remove();
								span6.remove();
								span6_check.remove();
								span2_br.remove();
								span3_br.remove();
								span4_br.remove();
								span5_br.remove();
								span6_br.remove();
								p.appendChild(span);

								var br6 = ui.create.node('br');
								var span7 = ui.create.div('.hrefnode', '详细信息');
								span7.style.marginTop = '6px';
								span7.listen(ui.click.consoleMenu);
								p.appendChild(br6);
								p.appendChild(span7);

								var finish = function() {
									if (n1 == n2) {
										game.saveConfig('asset_version', asset_version);
									}
									span.innerHTML = '素材更新完毕（' + n1 + '/' + n2 + '）';
									p.appendChild(document.createElement('br'));
									var button = document.createElement('button');
									button.innerHTML = '重新启动';
									button.onclick = game.reload;
									button.style.marginTop = '8px';
									p.appendChild(button);
								}
								game.multiDownload(updates,
								function() {
									n1++;
									span.innerHTML = '正在下载素材（' + n1 + '/' + n2 + '）';
								},
								function(e) {
									game.print('下载失败：' + e.source);
								},
								function() {
									setTimeout(finish, 500);
								});
							};
							game.checkFileList(updates, proceed);
						},
						function() {
							alert('连接失败');
							button2.disabled = false;
							button2.innerHTML = '检查素材更新';
						},
						true);
					} else {
						alert('此版本不支持游戏内更新素材，请手动更新');
					}
				};

				button1 = document.createElement('button');
				button1.innerHTML = '检查游戏更新';
				button1.onclick = game.checkForUpdate;
				li1.lastChild.appendChild(button1);

				button3 = document.createElement('button');
				button3.innerHTML = '更新到开发版';
				button3.style.marginLeft = '5px';
				button3.onclick = function() {
					game.checkForUpdate(null, true);
				};
				// if(lib.config.dev){
				//     li1.lastChild.appendChild(button3);
				// }
				(function() {
					var updatep1 = li1.querySelector('p');
					var updatep2 = li2;
					var updatep3 = li3;
					var updatep4 = node;
					var updatepx = ui.create.node('p');
					li1.appendChild(updatepx);
					updatepx.style.display = 'none';
					updatepx.style.whiteSpace = 'nowrap';
					updatepx.style.marginTop = '8px';
					var buttonx = ui.create.node('button', '访问项目主页',
					function() {
						window.open('https://github.com/libccy/noname');
					});
					updatepx.appendChild(buttonx);
					ui.updateUpdate = function() {
						if (!game.download) {
							updatep1.style.display = 'none';
							updatep2.style.display = 'none';
							updatep3.style.display = 'none';
							updatepx.style.display = '';
							updatep4.innerHTML = '关于';
						} else {
							updatep1.style.display = '';
							updatep2.style.display = '';
							updatep3.style.display = 'none'; // coding
							updatepx.style.display = 'none';
							updatep4.innerHTML = '更新';
						}
					}
					ui.updateUpdate();
				} ());

				button4 = document.createElement('button');
				button4.innerHTML = '设置更新地址';
				button4.onclick = function() {
					game.prompt('设置更新地址',
					function(str) {
						if (str) {
							game.saveConfig('updateURL', str);
							li3.querySelector('span').innerHTML = trimurl(str);
							button5.style.display = '';
							button6.style.display = 'none';
						}
					});
				};
				// li3.lastChild.appendChild(button4);
				var button6 = document.createElement('button');
				button6.innerHTML = '设为备用镜像';
				button6.style.display = 'none'; // coding
				// button6.style.marginLeft='5px';
				button6.onclick = function() {
					game.saveConfig('updateURL', lib.mirrorURL);
					button5.style.display = '';
					button6.style.display = 'none';
					li3.querySelector('span').innerHTML = trimurl(lib.mirrorURL);
				};
				li3.lastChild.appendChild(button6);

				button5 = document.createElement('button');
				button5.innerHTML = '设为默认镜像';
				// button5.style.marginLeft='5px';
				button5.onclick = function() {
					game.saveConfig('updateURL');
					button5.style.display = 'none';
					button6.style.display = '';
					li3.querySelector('span').innerHTML = trimurl(lib.updateURL);
				};
				li3.lastChild.appendChild(button5);
				if (!lib.config.updateURL) {
					button5.style.display = 'none';
				} else {
					button6.style.display = 'none';
				}

				button2 = document.createElement('button');
				button2.innerHTML = '检查素材更新';
				button2.onclick = game.checkForAssetUpdate;
				li2.lastChild.appendChild(button2);

				var span1 = ui.create.div('.config.more', '选项 <div>&gt;</div>');
				span1.style.fontSize = 'small';
				span1.style.display = 'inline';
				span1.toggle = function() {
					if (!this.classList.toggle('on')) {
						game.saveConfig('asset_toggle_off', true);
						span2.style.display = 'none';
						span2_br.style.display = 'none';
						span2_check.style.display = 'none';
						span3.style.display = 'none';
						span3_br.style.display = 'none';
						span3_check.style.display = 'none';
						span4.style.display = 'none';
						span4_br.style.display = 'none';
						span4_check.style.display = 'none';
						span5.style.display = 'none';
						span5_br.style.display = 'none';
						span5_check.style.display = 'none';
						span6.style.display = 'none';
						span6_br.style.display = 'none';
						span6_check.style.display = 'none';
					} else {
						game.saveConfig('asset_toggle_off');
						span2.style.display = '';
						span2_br.style.display = '';
						span2_check.style.display = '';
						span3.style.display = '';
						span3_br.style.display = '';
						span3_check.style.display = '';
						span4.style.display = '';
						span4_br.style.display = '';
						span4_check.style.display = '';
						span5.style.display = '';
						span5_br.style.display = '';
						span5_check.style.display = '';
						span6.style.display = '';
						span6_br.style.display = '';
						span6_check.style.display = '';
					}
				};
				span1.listen(span1.toggle);
				li2.lastChild.appendChild(span1);

				var span6_br = ui.create.node('br');
				li2.lastChild.appendChild(span6_br);

				var span5 = ui.create.div('', '图片素材（精简，126MB）');
				span5.style.fontSize = 'small';
				span5.style.lineHeight = '16px';
				var span5_check = document.createElement('input');
				span5_check.type = 'checkbox';
				span5_check.style.marginLeft = '5px';
				if (lib.config.asset_image) {
					span5_check.checked = true;
				}
				span5_check.onchange = function() {
					game.saveConfig('asset_image', this.checked);
				}
				var span2_br = ui.create.node('br');

				var span4 = ui.create.div('', '字体素材（48MB）');
				span4.style.fontSize = 'small';
				span4.style.lineHeight = '16px';
				li2.lastChild.appendChild(span4);
				var span4_check = document.createElement('input');
				span4_check.type = 'checkbox';
				span4_check.style.marginLeft = '5px';
				if (lib.config.asset_font) {
					span4_check.checked = true;
				}
				span4_check.onchange = function() {
					game.saveConfig('asset_font', this.checked);
				}
				li2.lastChild.appendChild(span4_check);
				var span3_br = ui.create.node('br');
				li2.lastChild.appendChild(span3_br);

				var span3 = ui.create.div('', '音效素材（125MB）');
				span3.style.fontSize = 'small';
				span3.style.lineHeight = '16px';
				li2.lastChild.appendChild(span3);
				var span3_check = document.createElement('input');
				span3_check.type = 'checkbox';
				span3_check.style.marginLeft = '5px';
				if (lib.config.asset_audio) {
					span3_check.checked = true;
				}
				span3_check.onchange = function() {
					game.saveConfig('asset_audio', this.checked);
				}
				li2.lastChild.appendChild(span3_check);
				var span4_br = ui.create.node('br');
				li2.lastChild.appendChild(span4_br);

				var span2 = ui.create.div('', '皮肤素材（351MB）');
				span2.style.fontSize = 'small';
				span2.style.lineHeight = '16px';
				li2.lastChild.appendChild(span2);
				var span2_check = document.createElement('input');
				span2_check.type = 'checkbox';
				span2_check.style.marginLeft = '5px';
				if (lib.config.asset_skin) {
					span2_check.checked = true;
				}
				span2_check.onchange = function() {
					game.saveConfig('asset_skin', this.checked);
				}
				li2.lastChild.appendChild(span2_check);
				var span5_br = ui.create.node('br');
				li2.lastChild.appendChild(span5_br);

				li2.lastChild.appendChild(span5);
				li2.lastChild.appendChild(span5_check);
				li2.lastChild.appendChild(span2_br);

				var span6 = ui.create.div('', '图片素材（完整，203MB）');
				span6.style.fontSize = 'small';
				span6.style.lineHeight = '16px';
				li2.lastChild.appendChild(span6);
				var span6_check = document.createElement('input');
				span6_check.type = 'checkbox';
				span6_check.style.marginLeft = '5px';
				if (lib.config.asset_full) {
					span6_check.checked = true;
				}
				span6_check.onchange = function() {
					game.saveConfig('asset_full', this.checked);
				}
				li2.lastChild.appendChild(span6_check);

				span2.style.display = 'none';
				span2_br.style.display = 'none';
				span2_check.style.display = 'none';
				span3.style.display = 'none';
				span3_br.style.display = 'none';
				span3_check.style.display = 'none';
				span4.style.display = 'none';
				span4_br.style.display = 'none';
				span4_check.style.display = 'none';
				span5.style.display = 'none';
				span5_br.style.display = 'none';
				span5_check.style.display = 'none';
				span6.style.display = 'none';
				span6_br.style.display = 'none';
				span6_check.style.display = 'none';

				ul.appendChild(li1);
				ul.appendChild(li2);
				ul.appendChild(li3);
				page.appendChild(ul);

				if (!lib.config.asset_toggle_off) {
					span1.toggle();
				}
			} ()); (function() {
				var norow2 = function() {
					var node = currentrow1;
					if (!node) return false;
					return node.innerHTML == '横置' || node.innerHTML == '翻面' || node.innerHTML == '换人' || node.innerHTML == '复活' || node.innerHTML == '死亡';
				};
				var checkCheat = function() {
					var createList=['🔥火伤','⚡雷伤','❄️冰伤','💔流血'];
					if (currentrow1 && (createList.contains(currentrow1.innerHTML)||currentrow1.innerHTML=='伤害')) {
					    var nodedamages={};
					    //var nodedamage = ui.create.div('.menubutton', '伤害', row1, clickrow1);
					    for (var i = 0; i < createList.length; i++) {
					        var has=false;
					        var name=createList[i];
					        for(var j=0;j<row1.childNodes.length;j++) {
					            var names=row1.childNodes[j].innerHTML;
					            if(names==name) {
					                has=true;
					                break;
					            }
					        }
					        if(has) continue;
					        if(i==0) {
					            var br=document.createElement("br");
					            br.isBr=true;
					            row1.appendChild(br);
					            nodedamages['br']=br;
					        }
					        nodedamages[name]=ui.create.div('.menubutton', name, row1, clickrow1);
					        nodedamages[name].style.marginTop='5px';
							//row2.childNodes[i].classList.remove('selectedx');
							//row2.childNodes[i].classList.add('unselectable');
						}
					}else {
					    for (var i = 0; i < row1.childNodes.length; i++) {
							if (createList.contains(row1.childNodes[i].innerHTML)||row1.childNodes[i].isBr) {
								row1.childNodes[i].remove();
								i--;
							}
						}
					}
					var midnum=5;
					var maxnum=midnum*2;
					var disnum=7;
					var createdList=['✋','⚔️','🌧️','选择','全部'];
					if (currentrow1 && currentrow1.innerHTML == '弃牌') {
					    //var nodexh = ui.create.div('.menubutton', '手牌', row2, clickrow2);
					    //var nodexe = ui.create.div('.menubutton', '装备', row2, clickrow2);
					    //var nodexj = ui.create.div('.menubutton', '判定', row2, clickrow2);
					    //var nodexall = ui.create.div('.menubutton', '全部', row2, clickrow2);
					    var nodecards={};
					    for (var i = 0; i < createdList.length; i++) {
					        var has=false;
					        var name=createdList[i];
					        for(var j=0;j<row2.childNodes.length;j++) {
					            var names=row2.childNodes[j].innerHTML;
					            if(names==name) {
					                has=true;
					                break;
					            }
					        }
					        if(has) continue;
					        nodecards[name]=ui.create.div('.menubutton', name, row2, clickrow2);
					    }
					    for (var i=0;i<row2.childNodes.length;i++) {
					        if(i>=disnum&&!createdList.contains(row2.childNodes[i].innerHTML)) {
					            row2.childNodes[i].remove();
					            i--;
					        }
					    }
					    //if(game.me) var nodexme = ui.create.div('.menubutton', '自选', row2, clickrow2);
					}else {
					    for (var i = 0; i < row2.childNodes.length; i++) {
					        var name=row2.childNodes[i].innerHTML;
					        if(createdList.contains(name)) {
					            if(currentrow2&&currentrow2==row2.childNodes[i]) currentrow2=false;
					            row2.childNodes[i].remove();
					            i--;
					        }
					    }
					    var nodes={};
					    for (var i = row2.childNodes.length; i < maxnum; i++) {
					        nodes[i]=ui.create.div('.menubutton', get.cnNumber(i), row2, clickrow2);
					    }
					}
					
					if (currentrow1 && currentrow1.innerHTML == '上限') {
					    for (var i = 0; i < Math.min(row2.childNodes.length,maxnum); i++) {
					        if(i<midnum) {
					            var add='-';
					            var num=midnum-i;
					        }else {
					            var add='+';
					            var num=i+1-midnum;
					        }
					        row2.childNodes[i].innerHTML=add+num;
					    }
					} else {
					    if (currentrow1 && currentrow1.innerHTML == '弃牌') maxnum=disnum;
					    for (var i = 0; i < Math.min(row2.childNodes.length,maxnum); i++) {
					        row2.childNodes[i].innerHTML=get.cnNumber(i+1,true);
					    }
					}
					if (norow2()) {
						for (var i = 0; i < row2.childElementCount; i++) {
							row2.childNodes[i].classList.remove('selectedx');
							row2.childNodes[i].classList.add('unselectable');
						}
					} else {
					    var forbidcho=['选择'];
						for (var i = 0; i < row2.childElementCount; i++) {
						    if(forbidcho.contains(row2.childNodes[i].innerHTML)){
						        if(game.me&&game.me.name) {
					                row2.childNodes[i].classList.remove('unselectable');
					            }else {
					                row2.childNodes[i].classList.remove('selectedx');
							        row2.childNodes[i].classList.add('unselectable');
					            }
					        }else {
							    row2.childNodes[i].classList.remove('unselectable');
							}
						}
					}
					if (currentrow1 && currentrow1.innerHTML == '复活') {
						for (var i = 0; i < row3.childNodes.length; i++) {
							if (row3.childNodes[i].dead) {
								row3.childNodes[i].style.display = '';
							} else {
								row3.childNodes[i].style.display = 'none';
								row3.childNodes[i].classList.remove('glow');
							}
							row3.childNodes[i].classList.remove('unselectable');
						}
					} else {
						for (var i = 0; i < row3.childElementCount; i++) {
							if (currentrow1 && currentrow1.innerHTML == '换人' && row3.childNodes[i].link == game.me) {
								row3.childNodes[i].classList.add('unselectable');
							} else {
								row3.childNodes[i].classList.remove('unselectable');
							}
							if (!row3.childNodes[i].dead) {
								row3.childNodes[i].style.display = '';
							} else {
								row3.childNodes[i].style.display = 'none';
								row3.childNodes[i].classList.remove('glow');
							}
						}
					}
					if (currentrow1 && (currentrow2 || norow2()) && row3.querySelector('.glow')) {
						cheatButton.classList.add('glowing');
						return true;
					} else {
						cheatButton.classList.remove('glowing');
						return false;
					}
				}
				cheatButton.listen(function() {
					if (checkCheat()) {
						var num;
						if (currentrow2) {
							switch (currentrow2.innerHTML) {
							case '-5':
							    num = -5;
								break;
							case '-4':
							    num = -4;
								break;
							case '-3':
							    num = -3;
								break;
							case '-2':
							    num = -2;
								break;
							case '-1':
							    num = -1;
								break;
							case '+1':
							    num = 1;
								break;
							case '+2':
							    num = 2;
								break;
							case '+3':
							    num = 3;
								break;
							case '+4':
							    num = 4;
								break;
							case '+5':
							    num = 5;
								break;
							case '一':
								num = 1;
								break;
							case '二':
								num = 2;
								break;
							case '三':
								num = 3;
								break;
							case '四':
								num = 4;
								break;
							case '五':
								num = 5;
								break;
							case '六':
								num = 6;
								break;
							case '七':
								num = 7;
								break;
							case '八':
								num = 8;
								break;
							case '九':
								num = 9;
								break;
							case '十':
								num = 10;
								break;
							case '选择':
								num = 'choose';
								break;
							case '全部':
								num = 'all';
								break;
							case '✋':
								num = 'h';
								break;
							case '⚔️':
								num = 'e';
								break;
							case '🌧️':
								num = 'j';
								break;
							}
						}
						var targets = [];
						var buttons = row3.querySelectorAll('.glow');
						for (var i = 0; i < buttons.length; i++) {
							targets.push(buttons[i].link);
						}
						var hasZuobi=true;
						window.funcCheat=[];
						var needAuto=(_status.event&&_status.event.player&&(_status.event.player==game.me||_status.event.player.isUnderControl())&&_status.event.name&&_status.event.name=='chooseToUse');
						if(!lib.config.cheatNowDo) needAuto=false;
						//if(!window.funcCheat) window.funcCheat=[];
						while (targets.length) {
							var target = targets.shift();
							switch (currentrow1.innerHTML) {
							case '伤害':
								//target.damage(num, 'nosource');
								if(needAuto){
							        window.funcCheat.push([function(target){
							            target.damage(num, 'nosource');
							        },target]);
							    }else {
							        target.damage(num, 'nosource');
							    }
								break;
							case '🔥火伤':
								//target.damage(num, 'nosource', 'fire');
								if(needAuto){
							        window.funcCheat.push([function(target){
							            target.damage(num, 'nosource', 'fire');
							        },target]);
							    }else {
							        target.damage(num, 'nosource', 'fire');
							    }
								break;
							case '⚡雷伤':
								//target.damage(num, 'nosource', 'thunder');
								if(needAuto){
							        window.funcCheat.push([function(target){
							            target.damage(num, 'nosource', 'thunder');
							        },target]);
							    }else {
							        target.damage(num, 'nosource', 'thunder');
							    }
								break;
							case '❄️冰伤':
								//target.damage(num, 'nosource' ,'ice');
								if(needAuto){
							        window.funcCheat.push([function(target){
							            target.damage(num, 'nosource' ,'ice');
							        },target]);
							    }else {
							        target.damage(num, 'nosource' ,'ice');
							    }
								break;
							case '💔流血':
								//target.loseHp(num);
								if(needAuto){
							        window.funcCheat.push([function(target){
							            target.loseHp(num);
							        },target]);
							    }else {
							        target.loseHp(num);
							    }
								break;
							case '上限':
							    /*if(num>0) {
								    target.gainMaxHp(num);
								}else if(num<0) {
								    target.loseMaxHp(-num);
								}*/
								if(needAuto){
							        window.funcCheat.push([function(target){
							            if(num>0) {
							        	    target.gainMaxHp(num);
							        	}else if(num<0) {
								            target.loseMaxHp(-num);
							        	}
							        },target]);
							    }else {
							        if(num>0) {
							    	    target.gainMaxHp(num);
								    }else if(num<0) {
							    	    target.loseMaxHp(-num);
							    	}
							    }
								break;
							case '回复':
								//target.recover(num, 'nosource');
								if(needAuto){
							        window.funcCheat.push([function(target){
							            target.recover(num, 'nosource');
							        },target]);
							    }else {
							        target.recover(num, 'nosource');
							    }
								break;
							case '摸牌':
								//target.draw(num);
								if(needAuto){
							        window.funcCheat.push([function(target){
							            target.draw(num);
							        },target]);
							    }else {
							        target.draw(num);
							    }
								break;
							case '弃牌':
							    if(num=='choose') {
							        if(needAuto){
							            window.funcCheat.push([function(target){
							                game.me.discardPlayerCard(target,'hej',[0,Infinity],true,'visible');
							            },target]);
							        }else {
							            game.me.discardPlayerCard(target,'hej',[0,Infinity],true,'visible');
							        }
							    }else if(num=='all') {
							        if(needAuto){
							            window.funcCheat.push([function(target){
							                target.discard(target.getCards('he'));
							            },target]);
							        }else {
							            target.discard(target.getCards('he'));
							        }
							    }else if(num=='h') {
							        if(needAuto){
							            window.funcCheat.push([function(target){
							                target.discard(target.getCards('h'));
							            },target]);
							        }else {
							            target.discard(target.getCards('h'));
							        }
							    }else if(num=='e') {
							        if(needAuto){
							            window.funcCheat.push([function(target){
							                target.discard(target.getCards('e'));
							            },target]);
							        }else {
							            target.discard(target.getCards('e'));
							        }
							    }else if(num=='j') {
							        if(needAuto){
							            window.funcCheat.push([function(target){
							                target.discard(target.getCards('j'));
							            },target]);
							        }else {
							            target.discard(target.getCards('j'));
							        }
							    }else {
							        if(needAuto){
							            window.funcCheat.push([function(target){
							                target.discard(target.getCards('he').randomGets(num));
							            },target]);
							        }else {
							            target.discard(target.getCards('he').randomGets(num));
							        }
							    }
								break;
							case '横置':
								//target.link();
								if(needAuto){
							        window.funcCheat.push([function(target){
							            target.link();
							        },target]);
							    }else {
							        target.link();
							    }
								break;
							case '翻面':
								//target.turnOver();
								if(needAuto){
							        window.funcCheat.push([function(target){
							            target.turnOver();
							        },target]);
							    }else {
							        target.turnOver();
							    }
								break;
							case '死亡':
								//target.die();
								if(needAuto){
							        window.funcCheat.push([function(target){
							            target.die();
							        },target]);
							    }else {
							        target.die();
							    }
								break;
							case '复活':
								//target.revive(target.maxHp);
								if(needAuto){
							        window.funcCheat.push([function(target){
							            target.revive(target.maxHp);
							        },target]);
							    }else {
							        target.revive(target.maxHp);
							    }
								break;
							case '换人':
								{
									hasZuobi=false;
									if (_status.event.isMine()) {
										if (!ui.auto.classList.contains('hidden')) {
											setTimeout(function() {
												ui.click.auto();
												setTimeout(function() {
													ui.click.auto();
													game.swapPlayer(target);
												},
												500);
											});
										}
									} else {
										game.swapPlayer(target);
									}
									break;
								}
							default:
							    hasZuobi=false;
							}
						}
						if(hasZuobi&&needAuto) {
						    //game.me.addTempSkill('menu_cheat');
						    window.hasCheat=true;
						    /*game.me.tempSkills['menu_cheat']=['phaseAfter','phaseBefore'];
						    game.me.update();*/
						    if(!_status.auto) setTimeout(function() {
						        ui.click.auto();
						    });
						}else {
						    if(!window.funcCheat||!window.funcCheat.length) window.funcCheat=false;
						}
						if (ui.coin) {
							game.changeCoin( - 20);
						}
						clickContainer.call(menuContainer);
					}
				});

				var page = ui.create.div('');
				var node = ui.create.div('.menubutton.large', '控制', start.firstChild, clickMode);
				node.link = page;
				node.type = 'cheat';
				page.classList.add('menu-sym');

				var currentrow1 = null;
				var row1 = ui.create.div('.menu-cheat', page);
				var clickrow1 = function() {
					if (this.classList.contains('unselectable')) return;
					if (currentrow1 == this) {
						this.classList.remove('selectedx');
						currentrow1 = null;
					} else {
						this.classList.add('selectedx');
						if (currentrow1) {
							currentrow1.classList.remove('selectedx');
						}
						currentrow1 = this;
						if (this.innerHTML == '换人') {
							for (var i = 0; i < row3.childNodes.length; i++) {
								row3.childNodes[i].classList.remove('glow');
							}
						}
					}
					checkCheat();
				};
				var nodedamage = ui.create.div('.menubutton', '伤害', row1, clickrow1);
				//var nodelosehp = ui.create.div('.menubutton', '流血', row1, clickrow1);
				var noderecover = ui.create.div('.menubutton', '回复', row1, clickrow1);
				var noderemax = ui.create.div('.menubutton', '上限', row1, clickrow1);
				var nodedraw = ui.create.div('.menubutton', '摸牌', row1, clickrow1);
				var nodediscard = ui.create.div('.menubutton', '弃牌', row1, clickrow1);
				var nodelink = ui.create.div('.menubutton', '横置', row1, clickrow1);
				var nodeturnover = ui.create.div('.menubutton', '翻面', row1, clickrow1);
				var nodekill = ui.create.div('.menubutton', '死亡', row1, clickrow1);
				var noderevive = ui.create.div('.menubutton', '复活', row1, clickrow1);
				var nodereplace = ui.create.div('.menubutton', '换人', row1, clickrow1);
				if (lib.config.mode != 'identity' && lib.config.mode != 'guozhan' && lib.config.mode != 'doudizhu') {
					nodereplace.classList.add('unselectable');
				}

				var currentrow2 = null;
				var row2 = ui.create.div('.menu-cheat', page);
				var clickrow2 = function() {
					if (this.classList.contains('unselectable')) return;
					if (currentrow2 == this) {
						this.classList.remove('selectedx');
						currentrow2 = null;
					} else {
						this.classList.add('selectedx');
						if (currentrow2) {
							currentrow2.classList.remove('selectedx');
						}
						currentrow2 = this;
					}
					checkCheat();
				};
				var nodex1 = ui.create.div('.menubutton', '一', row2, clickrow2);
				var nodex2 = ui.create.div('.menubutton', '二', row2, clickrow2);
				var nodex3 = ui.create.div('.menubutton', '三', row2, clickrow2);
				var nodex4 = ui.create.div('.menubutton', '四', row2, clickrow2);
				var nodex5 = ui.create.div('.menubutton', '五', row2, clickrow2);
				var nodex6 = ui.create.div('.menubutton', '六', row2, clickrow2);
				var nodex7 = ui.create.div('.menubutton', '七', row2, clickrow2);
				var nodex8 = ui.create.div('.menubutton', '八', row2, clickrow2);
				var nodex9 = ui.create.div('.menubutton', '九', row2, clickrow2);
				var nodex10 = ui.create.div('.menubutton', '十', row2, clickrow2);

				var row3 = ui.create.div('.menu-buttons.leftbutton.commandbutton', page);
				row3.style.marginTop = '3px';
				var clickrow3 = function() {
					if (this.classList.contains('unselectable')) return;
					this.classList.toggle('glow');
					if (currentrow1 && currentrow1.innerHTML == '换人' && this.classList.contains('glow')) {
						if (this.link == game.me) {
							this.classList.remove('glow');
						}
						for (var i = 0; i < row3.childElementCount; i++) {
							if (row3.childNodes[i] != this) {
								row3.childNodes[i].classList.remove('glow');
							}
						}
					}
					checkCheat();
				};
				menuUpdates.push(function() {
					if (_status.video || _status.connectMode) {
						node.classList.add('off');
						if (node.classList.contains('active')) {
							node.classList.remove('active');
							node.link.remove();
							active = start.firstChild.firstChild;
							active.classList.add('active');
							rightPane.appendChild(active.link);
						}

						page.remove();
						cheatButton.remove();
						if (_status.video) node.remove();
						return;
					}
					var list = [];
					for (var i = 0; i < game.players.length; i++) {
						if (lib.character[game.players[i].name] || game.players[i].name1) {
							list.push(game.players[i]);
						}
					}
					for (var i = 0; i < game.dead.length; i++) {
						if (lib.character[game.dead[i].name] || game.dead[i].name1) {
							list.push(game.dead[i]);
						}
					}
					if (list.length) {
						row1.show();
						row2.show();
						row3.innerHTML = '';
						var buttons = ui.create.buttons(list, 'player', row3, true);
						for (var i = 0; i < buttons.length; i++) {
							var names=get.translation(buttons[i].link);
							
							if(buttons[i].link==game.me) {
							    if(names.length>5&&names.indexOf('手杀')==0) names=names.slice(2);
							    if(names.length>5&&names.indexOf('TW')==0) names=names.slice(2);
							    names='⭐'+names;
							}
							buttons[i].innerHTML = names;
							buttons[i].style['white-space']='nowrap';
							buttons[i].style['text-align']='center';
							buttons[i].style['overflow']='hidden';
							var groupColor='#000000';
							if(get.translation(buttons[i].link.group+'Color')) groupColor=get.translation(buttons[i].link.group+'Color');
							buttons[i].style.filter='drop-shadow(0px -1px 0px '+groupColor+')';
							buttons[i].style['font-size']=buttons[i].link==game.me?'16px':'17px';
							if(names.length>=5) buttons[i].style['font-size']=(((buttons[i].link==game.me)?19:20)-names.length)+'px';
							buttons[i].listen(clickrow3);
							if (game.dead.contains(buttons[i].link)) {
								buttons[i].dead = true;
							}
						}
						checkCheat();
					} else {
						row1.hide();
						row2.hide();
					}
					if (lib.config.mode == 'identity' || lib.config.mode == 'guozhan' || lib.config.mode == 'doudizhu') {
						if (game.notMe || (game.me && (game.me._trueMe || game.hasPlayer(function(current) {
							return current._trueMe == game.me;
						}))) || !game.phaseNumber || _status.qianlidanji) {
							nodereplace.classList.add('unselectable');
						} else if (_status.event.isMine() && ui.auto.classList.contains('hidden')) {
							nodereplace.classList.add('unselectable');
						} else {
							nodereplace.classList.remove('unselectable');
						}
					}
					if (game.dead.length == 0) {
						noderevive.classList.add('unselectable');
					} else {
						noderevive.classList.remove('unselectable');
					}
					checkCheat();
				});
			} ()); (function() {
				var page = ui.create.div('');
				var node = ui.create.div('.menubutton.large', '命令', start.firstChild, clickMode);
				ui.commandnode = node;
				node.type = 'cmd';
				node.link = page;
				page.classList.add('menu-sym');
				menuUpdates.push(function() {
					if (_status.connectMode) {
						node.classList.add('off');
						if (node.classList.contains('active')) {
							node.classList.remove('active');
							node.link.remove();
							active = start.firstChild.firstChild;
							active.classList.add('active');
							rightPane.appendChild(active.link);
						}
					}
				});
				var text = document.createElement('div');
				//text.style.width = '194px';
				//text.style.height = '124px';
				text.style.width = '594px';
				text.style.height = '200px';
				text.style.padding = '3px';
				text.style.borderRadius = '5px';
				text.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0 0 0 1px';
				text.style.textAlign = 'left';
				text.style.webkitUserSelect = 'initial';
				text.style.overflow = 'scroll';
				text.style.position = 'absolute';
				text.style.left = '30px';
				text.style.top = '50px';
				text.style.wordBreak = 'break-all';
				text.style.backgroundColor = "rgba(0,0,0,0.3)";
				text.style.border = '1.5px solid rgba(255,255,255,0.5)';
				var pre = ui.create.node('pre.fullsize', text);
				pre.style.margin = 0;
				pre.style.padding = 0;
				pre.style.position = 'relative';
				lib.setScroll(pre);
				page.appendChild(text);

				// var caption=ui.create.div('','输入命令',page);
				// caption.style.margin='6px';
				// caption.style.position='absolute';
				// caption.style.width='120px';
				// caption.style.top='129px';
				// caption.style.left='64px';
				var text2 = document.createElement('input');
				//text2.style.width = '200px';
				//text2.style.height = '20px';
				text2.style.width = '600px';
				text2.style.height = '20px';
				text2.style.padding = '0';
				text2.style.position = 'absolute';
				text2.style.top = '15px';
				text2.style.left = '30px';
				text2.style.resize = 'none';
				text2.style.fontSize = '15px';
				//text2.style.border = 'none';
				text2.style.border = '1.5px solid rgba(255,255,255,0.5)';
				text2.style.borderRadius = '5px';
				text2.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0 0 0 1px';
				//text2.style.backgroundColor = "rgba(0,0,0,0.3)";
				//text2.style.border = '1.5px solid rgba(255,255,255,0.5)';
				//text2.style.backgroundColor = "rgba(255,255,255,0.8)";
				var g = {};
				var logs = [];
				var logindex = -1;
				var cheat = lib.cheat;
				var runCommand = function(e) {
					if (text2.value && !['up', 'down'].contains(text2.value)) {
						logindex = -1;
						logs.unshift(text2.value);
					}
					if (text2.value == 'cls') {
						pre.innerHTML = '';
						text2.value = '';
					} else if (text2.value == 'up') {
						if (logindex + 1 < logs.length) {
							text2.value = logs[++logindex];
						} else {
							text2.value = '';
						}
					} else if (text2.value == 'down') {
						if (logindex >= 0) {
							logindex--;
							if (logindex < 0) {
								text2.value = '';
							} else {
								text2.value = logs[logindex];
							}
						} else {
							text2.value = '';
						}
					} else if (text2.value == '我要玩原神' || text2.value == '我要玩原神！') {
						game.print('原神？启动！');
						game.saveConfig('password_kk', true);
						text2.value = '';
					} else if (text2.value == '卸载原神' || text2.value == '卸载原神！') {
						game.print('原神？卸载！');
						game.saveConfig('password_kk', false);
						text2.value = '';
					} else if (text2.value.indexOf('无天使') != -1 && (text2.value.indexOf('无神佛') != -1 || text2.value.indexOf('无神') != -1 && text2.value.indexOf('无佛') != -1)) {
						game.print('密码正确！欢迎来到死后世界战线！');
						_status.keyVerified = true;
						text2.value = '';
					} else {
						if (!game.observe && !game.online) {
							try {
								var result = eval(text2.value);
								game.print(result);
							} catch(e) {
								game.print(e);
							}
						}
						text2.value = '';
					}
				}
				text2.addEventListener('keydown',
				function(e) {
					if (e.keyCode == 13) {
						runCommand();
					} else if (e.keyCode == 38) {
						if (logindex + 1 < logs.length) {
							text2.value = logs[++logindex];
						}
					} else if (e.keyCode == 40) {
						if (logindex >= 0) {
							logindex--;
							if (logindex < 0) {
								text2.value = '';
							} else {
								text2.value = logs[logindex];
							}
						}
					}
				});
				page.appendChild(text2);
				game.print = function() {
					var textstr = '';
					for (var i = 0; i < arguments.length; i++) {
						if (get.is.object(arguments[i])) {
							var argi = get.stringify(arguments[i]);
							if (argi && argi.length < 5000) {
								textstr += argi;
							} else {
								textstr += arguments[i].toString();
							}
						} else {
							textstr += arguments[i];
						}
						if (i < arguments.length - 1) {
							textstr += ' ';
						}
					}
					textstr += '<br>';
					pre.innerHTML += textstr;
					text.scrollTop = text.scrollHeight;
				}
				if (_status.toprint) {
					for (var i = 0; i < _status.toprint.length; i++) {
						game.print.apply(this, _status.toprint[i]);
					}
					delete _status.toprint;
				}
				runButton.listen(runCommand);
				clearButton.listen(function() {
					pre.innerHTML = '';
				});
			} ()); (function() {
				var page = ui.create.div('');
				var node = ui.create.div('.menubutton.large', '战绩', start.firstChild, clickMode);
				node.type = 'rec';
				node.link = page;
				page.style.paddingBottom = '10px';
				var reset = function() {
					if (this.innerHTML == '重置') {
						this.innerHTML = '确定';
						var that = this;
						setTimeout(function() {
							that.innerHTML = '重置';
						},
						1000);
					} else {
						this.parentNode.previousSibling.remove();
						this.parentNode.remove();
						lib.config.gameRecord[this.parentNode.link] = {
							data: {}
						};
						game.saveConfig('gameRecord', lib.config.gameRecord);
					}
				}
				for (var i = 0; i < lib.config.all.mode.length; i++) {
					if (!lib.config.gameRecord[lib.config.all.mode[i]]) continue;
					if (lib.config.gameRecord[lib.config.all.mode[i]].str) {
						ui.create.div('.config.indent', lib.translate[lib.config.all.mode[i]], page).style.marginBottom = '-5px';
						var item = ui.create.div('.config.indent', lib.config.gameRecord[lib.config.all.mode[i]].str + '<span>重置</span>', page);
						item.style.height = 'auto';
						item.lastChild.addEventListener('click', reset);
						item.lastChild.classList.add('pointerdiv');
						item.link = lib.config.all.mode[i];
					}
				}
			} ()); (function() {
				if (!window.indexedDB || window.nodb) return;
				var page = ui.create.div('');
				//var node = ui.create.div('.menubutton.large', '录像', start.firstChild, clickMode);
				var node = ui.create.div('.menubutton.large', '记录', start.firstChild, clickMode);
				node.type = 'video';
				node.link = page;

				var store = lib.db.transaction(['video'], 'readwrite').objectStore('video');
				lib.videos = [];
				store.openCursor().onsuccess = function(e) {
					var cursor = e.target.result;
					if (cursor) {
						lib.videos.push(cursor.value);
						cursor.
						continue ();
					} else {
						lib.videos.sort(function(a, b) {
							return parseInt(b.time) - parseInt(a.time);
						});
						var clickcapt = function() {
							var current = this.parentNode.querySelector('.videonode.active');
							if (current && current != this) {
								current.classList.remove('active');
							}
							if (false&&this.classList.toggle('active')) {
								playButton.show();
								deleteButton.show();
								saveButton.show();
							} else {
								playButton.hide();
								deleteButton.hide();
								saveButton.hide();
							}
						};
						var staritem = function() {
							this.parentNode.classList.toggle('starred');
							var store = lib.db.transaction(['video'], 'readwrite').objectStore('video');
							if (this.parentNode.classList.contains('starred')) {
								this.parentNode.link.starred = true;
							} else {
								this.parentNode.link.starred = false;
							}
							store.put(this.parentNode.link);
						}
						var createNode = function(video, before) {
							var node = ui.create.div('.videonode.menubutton.large', clickcapt);
							node.link = video;
							var nodename1 = ui.create.div('.menubutton.videoavatar', node);
							nodename1.setBackground(video.name1, 'character');
							if (video.name2) {
								var nodename2 = ui.create.div('.menubutton.videoavatar2', node);
								nodename2.setBackground(video.name2, 'character');
							}
							var date = new Date(video.time);
							var str = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + (date.getDate()) + ' ' + date.getHours() + ':';
							var minutes = date.getMinutes();
							if (minutes < 10) {
								str += '0';
							}
							str += minutes;
							ui.create.div('.caption', video.name[0], node);
							ui.create.div('.text', str + '<br>' + video.name[1], node);
							if (video.win) {
								ui.create.div('.victory', '胜', node);
							}

							if (before) {
								page.insertBefore(node, page.firstChild);
							} else {
								page.appendChild(node);
							}
							ui.create.div('.video_star', '★', node, staritem);
							if (video.starred) {
								node.classList.add('starred');
							}
						}
						for (var i = 0; i < lib.videos.length; i++) {
							createNode(lib.videos[i]);
						}
						ui.create.videoNode = createNode;
						//不给导入录像
						/*var importVideoNode = ui.create.div('.config.switcher.pointerspan', '<span class="underlinenode slim ">导入录像...</span>',
						function() {
							this.nextSibling.classList.toggle('hidden');
						},
						page);
						importVideoNode.style.marginLeft = '12px';
						importVideoNode.style.marginTop = '3px';*/
						var importVideo = ui.create.div('.config.hidden', page);
						importVideo.style.whiteSpace = 'nowrap';
						importVideo.style.marginBottom = '80px';
						importVideo.style.marginLeft = '13px';
						importVideo.style.width = 'calc(100% - 30px)';
						importVideo.innerHTML = '<input type="file" style="width:calc(100% - 40px)">' + '<button style="width:40px">确定</button>';
						importVideo.lastChild.onclick = function() {
							var fileToLoad = importVideo.firstChild.files[0];
							var fileReader = new FileReader();
							fileReader.onload = function(fileLoadedEvent) {
								var data = fileLoadedEvent.target.result;
								if (!data) return;
								try {
									data = JSON.parse(lib.init.decode(data));
								} catch(e) {
									console.log(e);
									alert('导入失败');
									return;
								}
								var store = lib.db.transaction(['video'], 'readwrite').objectStore('video');
								var videos = lib.videos.slice(0);
								for (var i = 0; i < videos.length; i++) {
									if (videos[i].starred) {
										videos.splice(i--, 1);
									}
								}
								for (var deletei = 0; deletei < 5; deletei++) {
									if (videos.length >= parseInt(lib.config.video) && videos.length) {
										var toremove = videos.pop();
										lib.videos.remove(toremove);
										store.delete(toremove.time);
										for (var i = 0; i < page.childNodes.length; i++) {
											if (page.childNodes[i].link == toremove) {
												page.childNodes[i].remove();
												break;
											}
										}
									} else {
										break;
									}
								}
								for (var i = 0; i < lib.videos.length; i++) {
									if (lib.videos[i].time == data.time) {
										alert('录像已存在');
										return;
									}
								}
								lib.videos.unshift(data);
								store.put(data);
								createNode(data, true);
							};
							fileReader.readAsText(fileToLoad, "UTF-8");
						}

						playButton.listen(function() {
							var current = this.parentNode.querySelector('.videonode.active');
							if (current) {
								game.playVideo(current.link.time, current.link.mode);
							}
						});
						deleteButton.listen(function() {
							var current = this.parentNode.querySelector('.videonode.active');
							if (current) {
								lib.videos.remove(current.link);
								var store = lib.db.transaction(['video'], 'readwrite').objectStore('video');
								store.delete(current.link.time);
								current.remove();
							}
						});
						saveButton.listen(function() {
							var current = this.parentNode.querySelector('.videonode.active');
							if (current) {
								game.export(lib.init.encode(JSON.stringify(current.link)), '无名杀 - 录像 - ' + current.link.name[0] + ' - ' + current.link.name[1]);
							}
						});

						ui.updateVideoMenu = function() {
							var active = start.firstChild.querySelector('.active');
							if (active) {
								active.classList.remove('active');
								active.link.remove();
							}
							node.classList.add('active');
							rightPane.appendChild(page);
							playButton.style.display = '';
							deleteButton.style.display = '';
							saveButton.style.display = '';
						}
					}
				};
			} ());

			for (var i in lib.help) {
				var page = ui.create.div('');
				var node = ui.create.div('.menubutton.large', i, start.firstChild, clickMode);
				node.type = 'help';
				node.link = page;
				node.style.display = 'none';
				page.classList.add('menu-help');
				page.innerHTML = lib.help[i];
			}

			if (!connectMenu) {
				var node = ui.create.div('.menubutton.large', '帮助', start.firstChild,
				function() {
				game.playAudio('../extension/手杀ui/audio/TinyButton.mp3');
					var activex = start.firstChild.querySelector('.active');
					if (this.innerHTML == '帮助') {
						cheatButton.style.display = 'none';
						runButton.style.display = 'none';
						clearButton.style.display = 'none';
						playButton.style.display = 'none';
						saveButton.style.display = 'none';
						deleteButton.style.display = 'none';

						this.innerHTML = '返回';
						for (var i = 0; i < start.firstChild.childElementCount; i++) {
							var nodex = start.firstChild.childNodes[i];
							if (nodex == node) continue;
							if (nodex.type == 'help') {
								nodex.style.display = '';
								if (activex && activex.type != 'help') {
									activex.classList.remove('active');
									activex.link.remove();
									activex = null;
									nodex.classList.add('active');
									rightPane.appendChild(nodex.link);
								}
							} else {
								nodex.style.display = 'none';
							}
						}
					} else {
						this.innerHTML = '帮助';
						for (var i = 0; i < start.firstChild.childElementCount; i++) {
							var nodex = start.firstChild.childNodes[i];
							if (nodex == node) continue;
							if (nodex.type != 'help') {
								nodex.style.display = '';
								if (activex && activex.type == 'help') {
									activex.classList.remove('active');
									activex.link.remove();
									activex = null;
									clickMode.call(nodex);
								}
							} else {
								nodex.style.display = 'none';
							}
						}
					}
				});
			}

			var active = start.firstChild.querySelector('.active');
			if (!active) {
				active = start.firstChild.firstChild;
				active.classList.add('active');
			}
			rightPane.appendChild(active.link);
		} ());

		if (menuTimeout) {
			clearTimeout(menuTimeout);
			delete window.resetExtension;
			localStorage.removeItem(lib.configprefix + 'disable_extension', true);
		}
	};	
});

