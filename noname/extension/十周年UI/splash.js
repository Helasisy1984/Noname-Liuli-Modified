'use strict';
decadeModule.import(function(lib, game, ui, get, ai, _status){//代码来自各群扩展，侵删。

//国战隐匿        
			lib.skill._gzyinni = {
				trigger: {
					global: ["gameStart", "dieBegin"],
					player: ["showCharacterEnd","hideCharacterEnd"],
				},
				forced: true,
				filter: function (event, player, name) {
					if (lib.config.mode != 'guozhan') return false;
					if(lib.config['extension_十周年UI_newDecadeStyle'] != "off") return false;
					if (name == 'showCharacterEnd'||name == 'dieBegin') {
						return event.player.getElementsByClassName("gzyinni").length > 0 ||
						event.player.getElementsByClassName("gzyinni1").length > 0 ||
						event.player.getElementsByClassName("player_gz_cntry").length > 0||
						event.player.getElementsByClassName("fujiang").length > 0;
					}
					return true;
					//return (lib.config['extension_十周年UI_newDecadeStyle'] == "off")
				},
				content: function () {
					var name = event.triggername;
					
					if (name == 'gameStart') {
					    player.gzMe_delete=function(node) {
						    if(this[node]) {
						        this[node].style.opacity=0;
						        var player=this;
						        setTimeout(function(){
						            if(!player[node]) return;
						            //this.removeChild(this[node]);
						            //this[node].parentNode.removeChild(this[node]);
						            //this[node]=false;
						            player.removeChild(player[node]);
						            player[node]=false;
					        	},600);
						    }
						};
				    	//主将隐匿图
				    	if (player!=game.me) {
						var gzyn = document.createElement("img");
						gzyn.src = decadeUIPath + "/assets/image/yinnigz.png";
						gzyn.style.cssText = "pointer-events:none";
						gzyn.style.opacity=0;
						gzyn.style.transition='all 0.5s';
						gzyn.classList.add("gzyinni")
						gzyn.style.display = "block";
						gzyn.style.position = "absolute";
						gzyn.style.top = "auto";
						gzyn.style.bottom = "-3px";
						gzyn.style.left = "23px";
						gzyn.style.height = "195px";
						gzyn.style.width = "40%";
						gzyn.style.zIndex = "0.5";
						player.appendChild(gzyn)
						setTimeout(function(){
						    gzyn.style.opacity=1;
						},0);
						player.gzMe_gzyn=gzyn;
                        
                        //副将隐匿图
						var gzyn1 = document.createElement("img");
						gzyn1.src = decadeUIPath + "/assets/image/yinnigz.png";
						gzyn1.style.cssText = "pointer-events:none";
						gzyn1.style.opacity=0;
						gzyn1.style.transition='all 0.5s';
						gzyn1.classList.add("gzyinni1");
						gzyn1.style.display = "block";
						gzyn1.style.position = "absolute";
						gzyn1.style.top = "auto";
						gzyn1.style.bottom = "-3px";
						gzyn1.style.left = "60%";
						gzyn1.style.height = "195px";
						gzyn1.style.width = "43.4%";
						gzyn1.style.zIndex = "0.5";
						player.appendChild(gzyn1)
						setTimeout(function(){
						    gzyn1.style.opacity=1;
						},0);
						player.gzMe_gzyn1=gzyn1;
                        
                        //未知势力图
						var cntry = document.createElement("img");
						cntry.src = decadeUIPath + "/assets/image/player_gz_cntry.png";
						cntry.style.cssText = "pointer-events:none";
						cntry.style.opacity=0;
						cntry.style.transition='all 0.5s';
						cntry.classList.add("player_gz_cntry");
						cntry.style.display = "block";
						cntry.style.position = "absolute";
						cntry.style.top = "-8.3px";
						cntry.style.left = "-4px";
						cntry.style.height = "33.5px";
						cntry.style.width = "33.5px";
						cntry.style.zIndex = "0.5";
						player.appendChild(cntry);
						setTimeout(function(){
						    cntry.style.opacity=1;
						},0);
						player.gzMe_cntry=cntry;
						
    						//副将显示
    						/**/
    				    	if(game.createCss) {
        				    	game.createCss(`.fujiang_text {
        				    	    display: flex;
                                	align-items: top;
                                	align-content: center;
                                	justify-content: center;
                                	font-size: 16px;/*15px*/
                                	/*line-height: 0.85;*/
                                	line-height: 0.9;
                                	font-family: shousha;
                                	text-align: center;
                                	text-shadow: 0px 0px 3px #000000, 0px 0px 3px #000000/*, 0px 0px 3px #000000*/;
                                	/*2px 0px 9px #000000, 2px 0px 9px #000000*/
                                	/*left: 63.5%;*/
                                	right: 41.5%;/*34.5%*/
                                	top: 22px;/*-82px*/
                                	bottom: 1%;
                                	position: absolute;
                                	z-index: 71;
                                	/*以下为新增*/
                                	writing-mode: horizontal-tb;
                                	white-space: normal;
                                	width: 0%;
        				    	}`);
        				    	var fj = ui.create.div(player);
        				    	fj.innerHTML = '副将';
        				    	fj.style.zIndex = 71;
        				    	fj.classList.add('fujiang');
        				    	fj.classList.add('fujiang_text');
        				    	player.gzMe_fj=fj;
    				    	}else {
    				    	    var fj = document.createElement("img");
        				     	fj.src = decadeUIPath + "/assets/image/fujiang.png";
        				     	fj.style.cssText = "pointer-events:none";
        				     	fj.style.opacity=0;
        						fj.style.transition='all 0.5s';
        					    fj.style.display = "block";
        			     		fj.style.position = "absolute";
        			     		fj.classList.add("fujiang");
        					    fj.style.top = "22px";
        				    	fj.style.left = "61.5px";//"62.6px";
        				    	fj.style.height = "36.6px";
        				    	fj.style.width = "21.6px";
        				     	fj.style.zIndex = "71";
        				    	player.appendChild(fj);
        				    	setTimeout(function(){
        						    fj.style.opacity=1;
        						},0);
        				    	player.gzMe_fj=fj;
    				    	}
				    	}
					} else if (name == 'showCharacterEnd') {
						/*var gzyinni = trigger.player.getElementsByClassName("gzyinni");
						var cntry = trigger.player.getElementsByClassName("player_gz_cntry");
						var gzyinni1 = trigger.player.getElementsByClassName("gzyinni1");
						var fj = trigger.player.getElementsByClassName("fujiang");
						// 如果是亮主将或全亮
						if ([0, 2].includes(trigger.num)) {
							if (gzyinni[0]) {
								gzyinni[0].parentNode.removeChild(gzyinni[0]);
							}
						}
						// 如果是亮副将或全亮
						if ([1, 2].includes(trigger.num)) {
							if (gzyinni1[0]) {
								gzyinni1[0].parentNode.removeChild(gzyinni1[0]);
							}
							if (fj[0]) {
								fj[0].parentNode.removeChild(fj[0]);
							}
						}
						// 亮将就会移除未知势力的图标
						if (cntry[0]) {
							cntry[0].parentNode.removeChild(cntry[0]);
						}*/
						if (player!=game.me) {
						// 如果是亮主将或全亮
						if ([0, 2].includes(trigger.num)&&!trigger.player.isUnseen(0)) {
							trigger.player.gzMe_delete('gzMe_gzyn');
						}
						// 如果是亮副将或全亮
						if ([1, 2].includes(trigger.num)&&!trigger.player.isUnseen(1)) {
							trigger.player.gzMe_delete('gzMe_gzyn1');
							trigger.player.gzMe_delete('gzMe_fj');
						}
						// 亮将就会移除未知势力的图标
						if(!trigger.player.isUnseen(2)) trigger.player.gzMe_delete('gzMe_cntry');
						}
					} else if (name == 'dieBegin') {
					    /*var gzyinni = trigger.player.getElementsByClassName("gzyinni");
						var cntry = trigger.player.getElementsByClassName("player_gz_cntry");
						var gzyinni1 = trigger.player.getElementsByClassName("gzyinni1");
						var fj = trigger.player.getElementsByClassName("fujiang");
						if (gzyinni[0]) {
								gzyinni[0].parentNode.removeChild(gzyinni[0]);
							}
						if (gzyinni1[0]) {
								gzyinni1[0].parentNode.removeChild(gzyinni1[0]);
							}
						if (cntry[0]) {
							cntry[0].parentNode.removeChild(cntry[0]);
						}
						if (fj[0]) {
							fj[0].parentNode.removeChild(fj[0]);
						}*/
						if (player!=game.me) {
						// 如果是亮主将或全亮
						trigger.player.gzMe_delete('gzMe_gzyn');
						// 如果是亮副将或全亮
						trigger.player.gzMe_delete('gzMe_gzyn1');
						trigger.player.gzMe_delete('gzMe_fj');
						// 亮将就会移除未知势力的图标
						trigger.player.gzMe_delete('gzMe_cntry');
						}
					} else if (name == 'hideCharacterEnd') {
					//主将隐匿图
				    	if (player!=game.me&&player.classList&&player.classList.length) {
				    if(player.isUnseen(0)&&!player.gzMe_gzyn) {
						var gzyn = document.createElement("img");
						gzyn.src = decadeUIPath + "/assets/image/yinnigz.png";
						gzyn.style.cssText = "pointer-events:none";
						gzyn.style.opacity=0;
						gzyn.style.transition='all 0.5s';
						gzyn.classList.add("gzyinni")
						gzyn.style.display = "block";
						gzyn.style.position = "absolute";
						gzyn.style.top = "auto";
						gzyn.style.bottom = "-3px";
						gzyn.style.left = "23px";
						gzyn.style.height = "195px";
						gzyn.style.width = "40%";
						gzyn.style.zIndex = "0.5";
						player.appendChild(gzyn)
						setTimeout(function(){
						    gzyn.style.opacity=1;
						},0);
						player.gzMe_gzyn=gzyn;
                    }   
                        //副将隐匿图
                    if(player.isUnseen(1)&&!player.gzMe_gzyn1) {
						var gzyn1 = document.createElement("img");
						gzyn1.src = decadeUIPath + "/assets/image/yinnigz.png";
						gzyn1.style.cssText = "pointer-events:none";
						gzyn1.style.opacity=0;
						gzyn1.style.transition='all 0.5s';
						gzyn1.classList.add("gzyinni1");
						gzyn1.style.display = "block";
						gzyn1.style.position = "absolute";
						gzyn1.style.top = "auto";
						gzyn1.style.bottom = "-3px";
						gzyn1.style.left = "60%";
						gzyn1.style.height = "195px";
						gzyn1.style.width = "43.4%";
						gzyn1.style.zIndex = "0.5";
						player.appendChild(gzyn1)
						setTimeout(function(){
						    gzyn1.style.opacity=1;
						},0);
						player.gzMe_gzyn1=gzyn1;
                    }  
                        //未知势力图
						/*var cntry = document.createElement("img");
						cntry.src = decadeUIPath + "/assets/image/player_gz_cntry.png";
						cntry.style.cssText = "pointer-events:none";
						cntry.classList.add("player_gz_cntry");
						cntry.style.display = "block";
						cntry.style.position = "absolute";
						cntry.style.top = "-8.3px";
						cntry.style.left = "-4px";
						cntry.style.height = "33.5px";
						cntry.style.width = "33.5px";
						cntry.style.zIndex = "0.5";
						player.appendChild(cntry);
						player.gzMe_cntry=cntry;*/
						
					if(player.isUnseen(1)&&!player.gzMe_fj) {	
						//副将显示
						if(game.createCss) {
        				    	game.createCss(`.fujiang_text {
        				    	    display: flex;
                                	align-items: top;
                                	align-content: center;
                                	justify-content: center;
                                	font-size: 16px;/*15px*/
                                	/*line-height: 0.85;*/
                                	line-height: 0.9;
                                	font-family: shousha;
                                	text-align: center;
                                	text-shadow: 0px 0px 3px #000000, 0px 0px 3px #000000/*, 0px 0px 3px #000000*/;
                                	/*2px 0px 9px #000000, 2px 0px 9px #000000*/
                                	/*left: 63.5%;*/
                                	right: 41.5%;/*34.5%*/
                                	top: 22px;/*-82px*/
                                	bottom: 1%;
                                	position: absolute;
                                	z-index: 71;
                                	/*以下为新增*/
                                	writing-mode: horizontal-tb;
                                	white-space: normal;
                                	width: 0%;
        				    	}`);
        				    	var fj = ui.create.div(player);
        				    	fj.innerHTML = '副将';
        				    	fj.style.zIndex = 71;
        				    	fj.classList.add('fujiang');
        				    	fj.classList.add('fujiang_text');
        				    	player.gzMe_fj=fj;
    				    	}else {
    				    	    var fj = document.createElement("img");
        				     	fj.src = decadeUIPath + "/assets/image/fujiang.png";
        				     	fj.style.cssText = "pointer-events:none";
        				     	fj.style.opacity=0;
        						fj.style.transition='all 0.5s';
        					    fj.style.display = "block";
        			     		fj.style.position = "absolute";
        			     		fj.classList.add("fujiang");
        					    fj.style.top = "22px";
        				    	fj.style.left = "61.5px";//"62.6px";
        				    	fj.style.height = "36.6px";
        				    	fj.style.width = "21.6px";
        				     	fj.style.zIndex = "71";
        				    	player.appendChild(fj);
        				    	setTimeout(function(){
        						    fj.style.opacity=1;
        						},0);
        				    	player.gzMe_fj=fj;
    				    	}
				    }
				    	}
					}
					
				}
			}
			lib.skill._guozhan = {
				trigger: {
					global: "gameStart",
					player: "showCharacterEnd",
				},
				forced: true,
				filter: function (event, player, name) {
					 return lib.config.mode == 'guozhan'&&(lib.config['extension_十周年UI_newDecadeStyle'] == "off")
					 if (name == 'showCharacterEnd') {
						event.player.getElementsByClassName("guozhan").length > 0;
				 	 }
				},
				content: function () {
					var name = event.triggername;
					if (name == 'gameStart') {
						var gz = document.createElement("img");
						gz.src = decadeUIPath + "/assets/image/fu_unknown.png";
						gz.style.cssText = "pointer-events:none";
						gz.classList.add("guozhan")
						gz.style.display = "block";
						gz.style.position = "absolute";
						gz.style.top = "1px";
						gz.style.left = "61.5px";//"62.6px";
						gz.style.height = "173px";
						gz.style.width = "22px";
						gz.style.zIndex = "70";//Helasisy：不知道为什么原来是0.5
						//gz.style.zIndex = "0.5";
						player.appendChild(gz);
						player.gzMe_guozhan=gz;
					}
					else if (name == 'showCharacterEnd') {
					    /*var gz = trigger.player.getElementsByClassName("guozhan");
						if (gz[0]) {
							gz[0].parentNode.removeChild(gz[0]);
						}*/
						trigger.player.gzMe_delete('gzMe_guozhan');
						var yh = document.createElement("img");
						//   group2 = lib.character[player.name2][1];
						yh.src = decadeUIPath + "/assets/image/" + "fu_" + player.group + "_new.png";
						yh.style.display = "block";
						yh.style.position = "absolute";
						yh.style.top = "1px";
						yh.style.left = "61.5px";//"62.6px";
						yh.style.height = "173px";
						yh.style.width = "22px";
						yh.style.zIndex = "70";
						player.appendChild(yh)
					}
				}
			}
			
//十周年国战隐匿
			lib.skill._gzyinniszn = {
				trigger: {
					global: ["gameStart", "dieBegin"],
					player: "showCharacterEnd",
				},
				forced: true,
				filter: function (event, player, name) {
					if (lib.config.mode != 'guozhan') return false;
					if(lib.config['extension_十周年UI_newDecadeStyle'] != "on") return false;
					if (name == 'showCharacterEnd'||name == 'dieBegin') {
						return event.player.getElementsByClassName("gzyinni").length > 0 ||
						event.player.getElementsByClassName("gzyinni1").length > 0 ||
						event.player.getElementsByClassName("player_gz_cntry").length > 0||
						event.player.getElementsByClassName("fujiang").length > 0;
					}
					return true;
					//return (lib.config['extension_十周年UI_newDecadeStyle'] == "on")
				},
				content: function () {
					var name = event.triggername;
					if (name == 'gameStart') {
				    	//主将隐匿图
				    	if (player!=game.me) {
						var gzyn = document.createElement("img");
						gzyn.src = decadeUIPath + "/assets/image/yinnigz2.png";
						gzyn.style.cssText = "pointer-events:none";
						gzyn.classList.add("gzyinni")
						gzyn.style.display = "block";
						gzyn.style.position = "absolute";
						gzyn.style.top = "auto";
						gzyn.style.bottom = "0px";
						gzyn.style.left = "1px";
						gzyn.style.height = "170px";
						gzyn.style.width = "50%";
						gzyn.style.zIndex = "65";
						player.appendChild(gzyn)
						}

                        //副将隐匿图
                        if (player!=game.me) {
						var gzyn1 = document.createElement("img");
						gzyn1.src = decadeUIPath + "/assets/image/yinnigz3.png";
						gzyn1.style.cssText = "pointer-events:none";
						gzyn1.classList.add("gzyinni1");
						gzyn1.style.display = "block";
						gzyn1.style.position = "absolute";
						gzyn1.style.top = "auto";
						gzyn1.style.bottom = "0px";
						gzyn1.style.left = "50%";
						gzyn1.style.height = "170px";
						gzyn1.style.width = "50%";
						gzyn1.style.zIndex = "65";
						player.appendChild(gzyn1)
						}
                        			
						//副将名字显示图片
						if (player!=game.me) {
						var fj = document.createElement("img");
				     	fj.src = decadeUIPath + "/assets/image/fujiang2.png";
				     	fj.style.cssText = "pointer-events:none";
					    fj.style.display = "block";
			     		fj.style.position = "absolute";
			     		fj.classList.add("fujiang");
					    fj.style.top = "32px";/*越大越往下*/
				    	fj.style.left = "29px";/*越大越右*/
				    	fj.style.height = "30%";
				    	fj.style.width = "50%";
				     	fj.style.zIndex = "71";
				    	player.appendChild(fj)
				    	}
					} else if (name == 'showCharacterEnd') {
						var gzyinni = trigger.player.getElementsByClassName("gzyinni");
						var cntry = trigger.player.getElementsByClassName("player_gz_cntry");
						var gzyinni1 = trigger.player.getElementsByClassName("gzyinni1");
						var fj = trigger.player.getElementsByClassName("fujiang");
						// 如果是亮主将或全亮
						if ([0, 2].includes(trigger.num)) {
							if (gzyinni[0]) {
								gzyinni[0].parentNode.removeChild(gzyinni[0]);
							}
						}
						// 如果是亮副将或全亮
						if ([1, 2].includes(trigger.num)) {
							if (gzyinni1[0]) {
								gzyinni1[0].parentNode.removeChild(gzyinni1[0]);
							}
							if (fj[0]) {
								fj[0].parentNode.removeChild(fj[0]);
							}
						}
						// 亮将就会移除未知势力的图标
						if (cntry[0]) {
							cntry[0].parentNode.removeChild(cntry[0]);
						}
					} else if (name == 'dieBegin') {
					    var gzyinni = trigger.player.getElementsByClassName("gzyinni");
						var gzyinni1 = trigger.player.getElementsByClassName("gzyinni1");
						var fj = trigger.player.getElementsByClassName("fujiang");
						if (gzyinni[0]) {
								gzyinni[0].parentNode.removeChild(gzyinni[0]);
							}
						if (gzyinni1[0]) {
								gzyinni1[0].parentNode.removeChild(gzyinni1[0]);
							}
						if (cntry[0]) {
							cntry[0].parentNode.removeChild(cntry[0]);
						}
						if (fj[0]) {
							fj[0].parentNode.removeChild(fj[0]);
						}
					}
				}
			}			
			lib.skill._guozhanszn = {
				trigger: {
					global: "gameStart",
					player: "showCharacterEnd",
				},
				forced: true,
				filter: function (event, player, name) {
						return lib.config.mode == 'guozhan'&&(lib.config['extension_十周年UI_newDecadeStyle'] == "on")
					 if (name == 'showCharacterEnd') {
						event.player.getElementsByClassName("guozhan").length > 0;
					}
				},
				content: function () {
					var name = event.triggername;
					if (name == 'gameStart') {
						var gz = document.createElement("img");
						gz.src = decadeUIPath + "/assets/image/fu_null.png";
						gz.style.cssText = "pointer-events:none";
						gz.classList.add("guozhan")
						gz.style.display = "block";
						gz.style.position = "absolute";
						gz.style.top = "-7px";
						gz.style.left = "42.5px";
						gz.style.height = "165px";
						gz.style.width = "30px";
						gz.style.zIndex = "70";
						player.appendChild(gz)
					}
				}
			}
     
            //晋势力隐匿
            /*game.createCss(`
            .player.unseen>.primary-avatar,
            .player.unseen2>.deputy-avatar,
            .player.d-skin>.primary-avatar,
            .player.d-skin2>.deputy-avatar {
            	opacity: 1 !important;
            	background-image: url('${decadeUIPath}/assets/image/yinni.png') !important;
            }
            
            #arena:not(.observe)>.player[data-position='0'].unseen>.primary-avatar,
            #arena:not(.observe)>.player[data-position='0'].unseen2>.deputy-avatar {
            	opacity: 1 !important;
            	background-image: url('${decadeUIPath}/assets/image/yinni.png') !important;
            }
            
            #arena:not(.observe)>.player[data-position='0'].unseen.d-skin>.dynamic-wrap>.primary-bg,
            #arena:not(.observe)>.player[data-position='0'].unseen2.d-skin2>.dynamic-wrap>.deputy-bg {
            	opacity: 1 !important;
            	background-image: url('${decadeUIPath}/assets/image/yinni.png') !important;
            }`);*/
            if(false) lib.skill._yinni = {                  
                trigger: {
                    global: ["gameStart", "showCharacterEnd"],
                },                        
                forced: true,
                filter: function (event, player, name) {
                    if (name == 'gameStart') {
                        return get.translation(player) == '未知'
                    }
                    else if (name == 'showCharacterEnd') {
                        var s = event.player.getElementsByClassName("yinni")
                        return s.length > 0
                    }
                },                      
                content: function () {
                if (lib.config.mode != 'guozhan') {
                    var name = event.triggername;
                    if (name == 'gameStart') {
                        //Helasisy修：判断如果不诗人，直接init成预设角色
                        if(!player.group) {
                            player.init('unknown');
                            return;
                        }
                        var isYn = player.getElementsByClassName("yinni")
                        var yn = document.createElement("img");
                        yn.src = decadeUIPath + "/assets/image/yinni.png";
                        yn.style.cssText = "pointer-events:none";
                        yn.classList.add("yinni")
                        yn.style.display = "block";
                        yn.style.position = "absolute";
                        yn.style.top = "auto";
                    if (decadeUI.config.newDecadeStyle == 'on') {
                        yn.style.bottom = "-2px";
                        yn.style.left = "0px";
                        yn.style.height = "195px";
                        yn.style.width = "100%";
                    } else{
                        /*yn.style.bottom = "-5px";
                        yn.style.left = "21.2px";
                        yn.style.height = "190px";
                        yn.style.width = "85%";*/
                        //缩小了一些些
                        yn.style.bottom = "calc(-5px + 1.9px)";
                        yn.style.left = "calc(21.2px + 1.9px)";
                        yn.style.height = "calc(190px - 3.8px)";
                        yn.style.width = "calc(85% - 1.9px)";
                    }
                    //yn.style.transform = 'scale(0.95)';
                        yn.style.zIndex = "70";
                        player.appendChild(yn)
                        if (player != game.me) {
                            var ynhp = document.createElement("img");
                            ynhp.src = decadeUIPath + "/assets/image/yinnihp.png";
                            ynhp.style.cssText = "pointer-events:none";
                            ynhp.classList.add("yinnihp")
                            ynhp.style.display = "block";
                            ynhp.style.position = "absolute";
                            ynhp.style.top = "auto";
                            if (decadeUI.config.newDecadeStyle == 'on') {
                            ynhp.style.bottom = "5px";
                            ynhp.style.left = "99px";} else{
                            ynhp.style.bottom = "6px";
                            ynhp.style.left = "2.5px";}
                            ynhp.style.height = "17px";
                            ynhp.style.width = "17px";
                            ynhp.style.zIndex = "91";
                            player.appendChild(ynhp)
                        }
                        if (player == game.me) {
                            var ynhp = document.createElement("img");
                            ynhp.src = decadeUIPath + "/assets/image/yinnihp.png";
                            ynhp.style.cssText = "pointer-events:none";
                            ynhp.classList.add("yinnihp")
                            ynhp.style.display = "block";
                            ynhp.style.position = "absolute";
                            ynhp.style.top = "auto";
                            ynhp.style.bottom = "5px";
                            if (decadeUI.config.newDecadeStyle == 'on') {
                            ynhp.style.left = "99px";} else{
                            ynhp.style.left = "2.5px";}
                            ynhp.style.height = "17px";
                            ynhp.style.width = "17px";
                            ynhp.style.zIndex = "91";
                            player.appendChild(ynhp)
                        }

                    }
                    else if (name == 'showCharacterEnd') {
                        var s = trigger.player.getElementsByClassName("yinni");
                        var ynhp_cancel = trigger.player.getElementsByClassName("yinnihp")[0];
                        s[0].parentNode.removeChild(s[0]);
                        ynhp_cancel.parentNode.removeChild(ynhp_cancel);
                    }
                }
                }
            };
            
            // 创建CSS样式
            game.createCss(`
            .yinni {
                pointer-events: none;
                display: block;
                position: absolute;
                top: auto;
                z-index: 70;
            }
            
            .yinni.new-decade-style {
                bottom: -2px;
                left: 0px;
                height: 195px;
                width: 100%;
            }
            
            .yinni.old-decade-style {
                bottom: calc(-5px + 1.9px);
                left: calc(21.2px + 1.9px);
                height: calc(190px - 3.8px);
                width: calc(85% - 1.9px);
            }
            
            .yinnihp {
                pointer-events: none;
                display: block;
                position: absolute;
                top: auto;
                height: 17px;
                width: 17px;
                z-index: 91;
            }
            
            .yinnihp.new-decade-style {
                bottom: 5px;
                left: 99px;
            }
            
            .yinnihp.old-decade-style {
                bottom: 6px;
                left: 2.5px;
            }
            
            .yinnihp.current-player {
                bottom: 5px;
                left: 2.5px;
            }
            
            .yinnihp.current-player.new-decade-style {
                left: 99px;
            }
            `);
            //优化过的效果，但是还可以更猛
            if(false) lib.skill._yinni = {                  
                trigger: {
                    global: ["gameStart", "showCharacterEnd"],
                },                        
                forced: true,
                filter: function (event, player, name) {
                    if (name == 'gameStart') {
                        return get.translation(player) == '未知';
                    } else if (name == 'showCharacterEnd') {
                        var s = event.player.getElementsByClassName("yinni");
                        return s.length > 0;
                    }
                },                      
                content: function () {
                    if (lib.config.mode != 'guozhan') {
                        var name = event.triggername;
                        if (name == 'gameStart') {
                            // Helasisy修：判断如果不诗人，直接init成预设角色
                            if (!player.group) {
                                player.init('unknown');
                                return;
                            }
                            
                            var isYn = player.getElementsByClassName("yinni");
                            var styleClass = decadeUI.config.newDecadeStyle == 'on' ? 'new-decade-style' : 'old-decade-style';
                            
                            // 创建yinni元素
                            var yn = document.createElement("img");
                            yn.src = decadeUIPath + "/assets/image/yinni.png";
                            yn.classList.add("yinni", styleClass);
                            player.appendChild(yn);
                            
                            // 创建yinnihp元素
                            var ynhp = document.createElement("img");
                            ynhp.src = decadeUIPath + "/assets/image/yinnihp.png";
                            ynhp.classList.add("yinnihp", styleClass);
                            
                            if (player == game.me) {
                                ynhp.classList.add("current-player");
                            }
                            
                            player.appendChild(ynhp);
                            
                        } else if (name == 'showCharacterEnd') {
                            var s = trigger.player.getElementsByClassName("yinni");
                            var ynhp_cancel = trigger.player.getElementsByClassName("yinnihp")[0];
                            
                            if (s.length > 0) {
                                s[0].parentNode.removeChild(s[0]);
                            }
                            if (ynhp_cancel) {
                                ynhp_cancel.parentNode.removeChild(ynhp_cancel);
                            }
                        }
                    }
                }
            };
            window.yinni_character = function() {};
            if(get.mode() != 'guozhan') {
                window.yinni_character = function(player, remove) {
                    if (player.classList.contains('unseen') && !player.classList.contains('fullskin2') && !remove) {
                        // Helasisy修：判断如果不诗人，直接init成预设角色
                        if (!player.group) {
                            player.init('unknown');
                            return;
                        }
                        
                        var isYn = player.getElementsByClassName("yinni");
                        var styleClass = decadeUI.config.newDecadeStyle == 'on' ? 'new-decade-style' : 'old-decade-style';
                        
                        // 创建yinni元素
                        var yn = document.createElement("img");
                        yn.src = decadeUIPath + "/assets/image/yinni.png";
                        yn.classList.add("yinni", styleClass);
                        player.appendChild(yn);
                        
                        // 创建yinnihp元素
                        var ynhp = document.createElement("img");
                        ynhp.src = decadeUIPath + "/assets/image/yinnihp.png";
                        ynhp.classList.add("yinnihp", styleClass);
                        
                        if (player == game.me) {
                            ynhp.classList.add("current-player");
                        }
                        
                        player.appendChild(ynhp);
                        
                    } else {
                        var s = player.getElementsByClassName("yinni");
                        var ynhp_cancel = player.getElementsByClassName("yinnihp")[0];
                        
                        if (s.length > 0) {
                            s[0].parentNode.removeChild(s[0]);
                        }
                        if (ynhp_cancel) {
                            ynhp_cancel.parentNode.removeChild(ynhp_cancel);
                        }
                    }
                }
                let showCharacter_function = lib.element.player.$showCharacter;
                let SC_fun=showCharacter_function.toString();
                let SC_lst='this.checkConflict();';
                let SC_idx=SC_fun.lastIndexOf(SC_lst);
                let SC_new='('+SC_fun.slice(0,SC_idx+SC_lst.length)+'window.yinni_character(this);'+SC_fun.slice(SC_idx+SC_lst.length)+')';
                lib.element.player.$showCharacter=eval(SC_new);
            }
            


            //手杀双将名字显示
			lib.skill._shousha_shuangjiang = {
				trigger: {
					global: ['gameStart'],
					//player: 'enterGame',
				},
				forced: true,
				filter: function (event, player) {
					//Helasisy修：双将没有双将咋办？
					return get.config('double_character') && lib.character[player.name2];
				},
				/*init:function(player,skill) {
				    if(!get.config('double_character')) return;
				    if (lib.config.extension_十周年UI_newDecadeStyle == 'off') {
						var sj = document.createElement("img");
						group2 = lib.character[player.name2][1];
						sj.src = decadeUIPath + "/assets/image/" + "fu_" + group2 + "_new.png";
						sj.style.display = "block";
						sj.style.position = "absolute";
						sj.style.top = "1px";
						sj.style.left = "61.5px";//"62.6px";
						sj.style.height = "173px";
						sj.style.width = "22px";
						sj.style.zIndex = "70";
						player.appendChild(sj)
					}
				},*/
				content: function () {
					if (lib.config.extension_十周年UI_newDecadeStyle == 'off') {
						var sj = document.createElement("img");
						group2 = lib.character[player.name2][1];
						sj.src = decadeUIPath + "/assets/image/" + "fu_" + group2 + "_new.png";
						sj.style.display = "block";
						sj.style.position = "absolute";
						sj.style.top = "1px";
						sj.style.left = "61.5px";//"62.6px";
						sj.style.height = "173px";
						sj.style.width = "22px";
						sj.style.zIndex = "70";
						player.appendChild(sj)
					}
				}
			}
			window.doubleKuang=function(player,remove) {
			    if(!game.createCss) return;
			    //Helasisy修：国战开局延迟100ms判断，防止露馅
			    if(get.mode()=='guozhan' && !game.roundNumber) {
			        setTimeout(()=>{
			            window.doubleKuang(player,remove);
			        }, 100);
			        return;
			    }
			    //if((!player.name2||!lib.character[player.name2])&&!remove) return;
			    //接口：game.hasDoublePossble，意为有可能会出现双将，请通过判断
			    //拿来判断隐匿，remove也跟着remove吧
			    window.yinni_character(player,remove);
			    //Helasisy修：不用了 新的方法判断吧
			    if(lib.config.extension_十周年UI_newDecadeStyle != 'off') return;
			    //if (lib.config.extension_十周年UI_newDecadeStyle == 'off'&&(get.config('double_character')||game.hasDoublePossble)) {
			    //remove也不用了
			        let hasKuang = typeof remove=='boolean' ? (!remove) : (player.classList.contains('fullskin2') && !player.classList.contains('unseen2'));
			        //if(!remove) {
			        if(hasKuang) {
						//加个检查吧
						if(!player.name2||!lib.character[player.name2]) return;
						/*game.players.forEach((player)=>{
						    var needUnDouble=false;
						    if(!player.name2||!lib.character[player.name2]||!lib.character[player.name2][1]) needUnDouble=true;
						    if(!player.doubleKuang) needUnDouble=false;
						    if(needUnDouble) {
						        player.removeChild(player.doubleKuang);
						        delete player.doubleKuang;
						    }
						});*/
						let doubleKuang=player.querySelectorAll('.doubleKuang');
						if(doubleKuang&&doubleKuang.length) {
						    //player.removeChild(player.doubleKuang);
						    //delete player.doubleKuang;
						    // 确保遍历静态数组（如果是动态集合，先转换）
                            Array.from(doubleKuang).forEach(item => {
                                if (item.parentNode === player) { // 确保元素属于父节点
                                    player.removeChild(item);
                                }
                            });
						}
						let sj = document.createElement("img");
						var group2 = lib.character[player.name2][1];
						sj.src = decadeUIPath + "/assets/image/" + "fu_" + group2 + "_new.png";
						/*sj.style.display = "block";
						sj.style.position = "absolute";
						sj.style.top = "1px";
						sj.style.left = "61.5px";//"62.6px";
						sj.style.height = "173px";
						sj.style.width = "22px";
						sj.style.zIndex = "70";*/
						game.createCss(`.doubleKuang {
						    display: block;
    						position: absolute;
    						top: 1px;
    						left: 61.5px;
    						height: 173px;
    						width: 22px;
    						z-index: 70;
						}`);
						sj.classList.add('doubleKuang');
						player.appendChild(sj)
						player.doubleKuang=sj;
						player.node.name2.style.lineHeight=0.85;
					}else {
					    /*if(player.doubleKuang) {
					        player.removeChild(player.doubleKuang);
					        delete player.doubleKuang;
					    }*/
					    let doubleKuang=player.querySelectorAll('.doubleKuang');
						if(doubleKuang&&doubleKuang.length) {
						    //player.removeChild(player.doubleKuang);
						    //delete player.doubleKuang;
						    // 确保遍历静态数组（如果是动态集合，先转换）
                            Array.from(doubleKuang).forEach(item => {
                                if (item.parentNode === player) { // 确保元素属于父节点
                                    player.removeChild(item);
                                }
                            });
						}
					}
			}

            //十周年双将名字显示
			lib.skill._shizhounian_shuangjiang = {
				trigger: {
					global: 'gameStart'
				},
				forced: true,
				filter: function (event, player) {
					return get.config('double_character') && !(lib.config['extension_十周年UI_outcropSkin'])
				},
				content: function () {
					if (lib.config.extension_十周年UI_newDecadeStyle == 'on') {
						var yh = document.createElement("img");
						group2 = lib.character[player.name2][1];
						yh.src = decadeUIPath + "/assets/image/" + "fu_" + group2 + ".png";
						yh.style.display = "block";
						yh.style.position = "absolute";
						yh.style.top = "1px";
						yh.style.left = "59px";
						yh.style.height = "166.5px";
						yh.style.width = "22px";
						yh.style.zIndex = "70";
						player.appendChild(yh)
					}
				}
			}
			lib.skill._shizhounian_shuangjiang = {/*副将框参数*/
				trigger: {
					global: ["gameStart", "dieBegin"],
				},
				forced: true,
				filter: function (event, player) {
					return get.config('double_character')
				},
				content: function () {
					if (lib.config.extension_十周年UI_newDecadeStyle == 'on') {
						var yh = document.createElement("img");
						group2 = lib.character[player.name2][1];
						yh.src = decadeUIPath + "/assets/image/" + "fu_" + group2 + ".png";
						yh.style.display = "block";
						yh.style.position = "absolute";
						yh.style.top = "-12px";
						yh.style.left = "42.5px";
						yh.style.height = "165px";
						yh.style.width = "30px";
						yh.style.zIndex = "70";
						player.appendChild(yh)
					}
				}
			}

			lib.skill._shizhounian_shuangjiang2 = {
				trigger: {
					player: ["showCharacterAfter", "dieBegin"],
				},
				forced: true,
				charlotte: true,
				onremove: true,
				filter: function (event, player) {
					return lib.config.mode == 'guozhan'
				},
				content: function () {
					if (lib.config.extension_十周年UI_newDecadeStyle == 'on') {
						var yh = document.createElement("img");
						group2 = lib.character[player.name2][1];
						yh.src = decadeUIPath + "/assets/image/" + "fu_" + group2 + ".png";
						yh.style.display = "block";
						yh.style.position = "absolute";
						yh.style.top = "-7px";
						yh.style.left = "42.5px";
						yh.style.height = "165px";
						yh.style.width = "30px";
						yh.style.zIndex = "70";
						player.appendChild(yh)
					}
				}
			}
                
//游戏胜负结算
				lib.onover.push(function (bool) {
				if (decadeUI.config.SanGuoShaGameOver == 'shousha') {
					if (bool == true) {
						decadeUI.animation.playSpine({ name: 'jiesuan', action: 'jiesuan_shenli' });
					} else if (bool == false) {
						decadeUI.animation.playSpine({ name: 'jiesuan', action: 'jiesuan_shibai', speed: 0.6 });
					} else {
						decadeUI.animation.playSpine({ name: 'jiesuan', action: 'jiesuan_pingju', speed: 0.6 });
					}
				} else if (decadeUI.config.SanGuoShaGameOver == 'shizhounian') {
					if (bool == true) {
						decadeUI.animation.playSpine({ name: 'Xshengli', action: 'play', scale: 0.8, speed: 1.35 });
					} else if (bool == false) {
						decadeUI.animation.playSpine({ name: 'Xnoshengli', action: 'play', scale: 0.8, speed: 1.35 });
					} else {
						decadeUI.animation.playSpine({ name: 'Xnoshengli', action: 'play3', scale: 0.8, speed: 1.35 });
					}
				} else {}
				})
				
//目标特效
    //Helasisy修：防止点击过快造成特效无法正常删除
    lib.element.player.inits = [].concat(lib.element.player.inits || [])
    .concat(player => {
        if (player.ChupaizhishiXObserver) return;
        const ChupaizhishiX = {
            attributes: true,
            attributeFilter: ['class']
        };
        let timer = null;
        const ChupaizhishiXObserver = new globalThis.MutationObserver(mutationRecords => {
            for (const mutationRecord of mutationRecords) {
                if (mutationRecord.attributeName !== 'class') continue;
                const targetElement = mutationRecord.target; // 修正拼写错误
                if (targetElement.classList.contains('selectable')) {
                    if (!targetElement.ChupaizhishiXid) {
                        if (!window.chupaiload) {
                            window.chupaiload = true;
                        }
                        // 清除之前的定时器，重置计时
                        if (timer) {
                            clearTimeout(timer);
                            timer = null;
                        }
                        timer = setTimeout(() => {
                            // 定时器触发时检查当前状态
                            if (targetElement.classList.contains('selectable')) {
                                // 根据配置播放动画
                                if (decadeUI.config.CPZS === 'shoushaX') {
                                    targetElement.ChupaizhishiXid = dcdAnim.playSpine({ name: 'aar_chupaizhishiX', loop: true }, {
                                        parent: targetElement,
                                        scale: 0.6,
                                        speed: 1.2,
                                        x: [0, 0.6],
                                    });
                                }
                                if (decadeUI.config.CPZS == 'shousha') {
                                    targetElement.ChupaizhishiXid = dcdAnim.playSpine({name: 'aar_chupaizhishi', loop: true }, {
                                        parent: targetElement,
                                        scale: 0.8,
                                        x: [0, 0.6],
                                    })}
                                if (decadeUI.config.CPZS == 'jiangjun') {
                                    targetElement.ChupaizhishiXid = dcdAnim.playSpine({name: 'SF_xuanzhong_eff_jiangjun', loop: true }, {
                                        parent: targetElement,
                                        scale: 0.8,
                                        //x: [0, 0.6],
                                    })}
                                if (decadeUI.config.CPZS == 'weijiangjun') {
                                    targetElement.ChupaizhishiXid = dcdAnim.playSpine({name: 'SF_xuanzhong_eff_weijiangjun', loop: true }, {
                                        parent: targetElement,
                                        scale: 0.8,
                                        //x: [0, 0.6],
                                    })}
                                if (decadeUI.config.CPZS == 'cheqijiangjun') {
                                    targetElement.ChupaizhishiXid = dcdAnim.playSpine({name: 'SF_xuanzhong_eff_cheqijiangjun', loop: true }, {
                                        parent: targetElement,
                                        scale: 0.8,
                                        //x: [0, 0.6],
                                    })}
                                if (decadeUI.config.CPZS == 'biaoqijiangjun') {
                                    targetElement.ChupaizhishiXid = dcdAnim.playSpine({name: 'SF_xuanzhong_eff_biaoqijiangjun', loop: true }, {
                                        parent: targetElement,
                                        scale: 0.65,
                                        //x: [0, 0.6],
                                    })}
                                if (decadeUI.config.CPZS == 'dajiangjun') {
                                    targetElement.ChupaizhishiXid = dcdAnim.playSpine({name: 'SF_xuanzhong_eff_dajiangjun', loop: true }, {
                                        parent: targetElement,
                                        scale: 0.8,
                                        //x: [0, 0.6],
                                    })}
                                if (decadeUI.config.CPZS == 'dasima') {
                                    targetElement.ChupaizhishiXid = dcdAnim.playSpine({name: 'SF_xuanzhong_eff_dasima', loop: true }, {
                                        parent: targetElement,
                                        scale: 0.7,
                                        //x: [0, 0.6],
                                    })}
                                if (decadeUI.config.CPZS == 'off') {}
                            }
                            timer = null;
                        }, 300);
                    }
                } else {
                    if (targetElement.ChupaizhishiXid) {
                        dcdAnim.stopSpine(targetElement.ChupaizhishiXid);
                        delete targetElement.ChupaizhishiXid;
                        if (timer) {
                            clearTimeout(timer);
                            timer = null;
                        }
                    }
                }
            }
        });
        ChupaizhishiXObserver.observe(player, ChupaizhishiX);
        player.ChupaizhishiXObserver = ChupaizhishiXObserver;
    });
    /*lib.element.player.inits = [].concat(lib.element.player.inits || [])
        .concat(player => {
        if (player.ChupaizhishiXObserver) return;
        const ChupaizhishiX = {
            attributes: true,
            attributeFilter: ['class']
        };
        let timer = null;
        const ChupaizhishiXObserver = new globalThis.MutationObserver(mutationRecords => {
            for (let mutationRecord of mutationRecords) {
                if (mutationRecord.attributeName !== 'class') continue;
                const targetElemen = mutationRecord.target;
                if (targetElemen.classList.contains('selectable')) {
                    if (!targetElemen.ChupaizhishiXid) {
                        // targetElemen.qyChupaizhishiXid = window.qyAnimation.generatorUUID();
                        if (!window.chupaiload) {
                            window.chupaiload = true;
                        }
                        if (timer) return;
                        timer = setTimeout(() => {
                        if (decadeUI.config.CPZS == 'shoushaX') {
                            targetElemen.ChupaizhishiXid = dcdAnim.playSpine({name: 'aar_chupaizhishiX', loop: true }, {
                                parent: targetElemen,
                                scale: 0.6,
                                speed: 1.2,
                                x: [0, 0.6],
                            })}
                        if (decadeUI.config.CPZS == 'shousha') {
                            targetElemen.ChupaizhishiXid = dcdAnim.playSpine({name: 'aar_chupaizhishi', loop: true }, {
                                parent: targetElemen,
                                scale: 0.8,
                                x: [0, 0.6],
                            })}
                        if (decadeUI.config.CPZS == 'jiangjun') {
                            targetElemen.ChupaizhishiXid = dcdAnim.playSpine({name: 'SF_xuanzhong_eff_jiangjun', loop: true }, {
                                parent: targetElemen,
                                scale: 0.8,
                                //x: [0, 0.6],
                            })}
                        if (decadeUI.config.CPZS == 'weijiangjun') {
                            targetElemen.ChupaizhishiXid = dcdAnim.playSpine({name: 'SF_xuanzhong_eff_weijiangjun', loop: true }, {
                                parent: targetElemen,
                                scale: 0.8,
                                //x: [0, 0.6],
                            })}
                        if (decadeUI.config.CPZS == 'cheqijiangjun') {
                            targetElemen.ChupaizhishiXid = dcdAnim.playSpine({name: 'SF_xuanzhong_eff_cheqijiangjun', loop: true }, {
                                parent: targetElemen,
                                scale: 0.8,
                                //x: [0, 0.6],
                            })}
                        if (decadeUI.config.CPZS == 'biaoqijiangjun') {
                            targetElemen.ChupaizhishiXid = dcdAnim.playSpine({name: 'SF_xuanzhong_eff_biaoqijiangjun', loop: true }, {
                                parent: targetElemen,
                                scale: 0.65,
                                //x: [0, 0.6],
                            })}
                        if (decadeUI.config.CPZS == 'dajiangjun') {
                            targetElemen.ChupaizhishiXid = dcdAnim.playSpine({name: 'SF_xuanzhong_eff_dajiangjun', loop: true }, {
                                parent: targetElemen,
                                scale: 0.8,
                                //x: [0, 0.6],
                            })}
                        if (decadeUI.config.CPZS == 'dasima') {
                            targetElemen.ChupaizhishiXid = dcdAnim.playSpine({name: 'SF_xuanzhong_eff_dasima', loop: true }, {
                                parent: targetElemen,
                                scale: 0.7,
                                //x: [0, 0.6],
                            })}
                        if (decadeUI.config.CPZS == 'off') {}
                            timer = null;
                        }, 300);
                    }
                } else {
                    if (targetElemen.ChupaizhishiXid) {
                        dcdAnim.stopSpine(targetElemen.ChupaizhishiXid);
                        delete targetElemen.ChupaizhishiXid;
                        if (timer) {
                            clearTimeout(timer)
                            timer = null;
                        }
                    }
                }
            }
        });
        ChupaizhishiXObserver.observe(player, ChupaizhishiX);
        player.ChupaizhishiXObserver = ChupaizhishiXObserver;
    });*/
    
//修改拖拽指示线（需打开本体的拖拽指示线功能）
    //请将此段放至十周年UI中
    Object.assign(lib.ui.click,{
        windowmousemove: function (e) {
            if (window.inSplash) return;
            if (_status.tempunpopup) {
                if (get.evtDistance(_status.tempunpopup, e) > 5) {
                    delete _status.tempunpopup;
                }
            }
            if (e.button == 2) return;
            var dialogs = document.querySelectorAll('#window>.dialog.popped:not(.static)');
            for (var i = 0; i < dialogs.length; i++) {
                dialogs[i].delete();
            }
            var node = _status.currentmouseenter;
            var sourceitem = document.elementFromPoint(e.clientX, e.clientY);
            if (game.chess && ui.selected.cards.length) {
                var itemtype = get.itemtype(sourceitem);
                if (itemtype != 'card' && itemtype != 'button') {
                    for (var i = 0; i < game.players.length; i++) {
                        var ex = e.clientX / game.documentZoom - ui.arena.offsetLeft;
                        var ey = e.clientY / game.documentZoom - ui.arena.offsetTop;
                        var left = -ui.chessContainer.chessLeft + ui.chess.offsetLeft + game.players[i].getLeft();
                        var top = -ui.chessContainer.chessTop + ui.chess.offsetTop + game.players[i].getTop();
                        var width = game.players[i].offsetWidth;
                        var height = game.players[i].offsetHeight;
                        if (ex > left && ex < left + width && ey > top && ey < top + height) {
                            sourceitem = game.players[i];
                            break;
                        }
                    }
                }
            }
            var item = sourceitem;
            if (_status.mousedragging) {
                e.preventDefault();
                if (lib.config.enable_dragline) {
                    ui.canvas.width = ui.arena.offsetWidth;
                    ui.canvas.height = ui.arena.offsetHeight;
                    var ctx = ui.ctx;
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = 'rgba(229, 225, 92)';
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';
                    ctx.lineWidth = 10;
                    ctx.setLineDash([]);
                    ctx.beginPath();
                    var l = 25;
                    var x1 = _status.mousedragging.clientX / game.documentZoom - ui.arena.offsetLeft;
                    var y1 = _status.mousedragging.clientY / game.documentZoom - ui.arena.offsetTop;
                    var a, x2, y2, x3, y3, x4, y4;

                    ctx.moveTo(x1, y1);
                    if (_status.multitarget) {
                        for (var i = 0; i < _status.lastdragchange.length; i++) {
                            var exy = _status.lastdragchange[i]._lastdragchange;
                            ctx.lineTo(exy[0], exy[1]);
                            x2 = exy[0]; y2 = exy[1];
                            a = Math.atan2((y2 - y1), (x2 - x1));
                            x3 = x2 - l * Math.cos(a + 30 * Math.PI / 180);
                            y3 = y2 - l * Math.sin(a + 30 * Math.PI / 180);
                            x4 = x2 - l * Math.cos(a - 30 * Math.PI / 180);
                            y4 = y2 - l * Math.sin(a - 30 * Math.PI / 180);
                            ctx.moveTo(x3, y3);
                            ctx.lineTo(x2, y2);
                            ctx.lineTo(x4, y4);
                            var gnt = ctx.createLinearGradient(x1, y1, x2, y2);
                            gnt.addColorStop(0, 'transparent');
                            gnt.addColorStop(1, 'yellow');
                            ctx.strokeStyle = gnt;
                        }
                    }
                    if (!_status.selectionfull) {
                        x2 = e.clientX / game.documentZoom - ui.arena.offsetLeft;
                        y2 = e.clientY / game.documentZoom - ui.arena.offsetTop;
                        ctx.lineTo(x2, y2);
                        a = Math.atan2((y2 - y1), (x2 - x1));
                        x3 = x2 - l * Math.cos(a + 30 * Math.PI / 180);
                        y3 = y2 - l * Math.sin(a + 30 * Math.PI / 180);
                        x4 = x2 - l * Math.cos(a - 30 * Math.PI / 180);
                        y4 = y2 - l * Math.sin(a - 30 * Math.PI / 180);
                        ctx.moveTo(x3, y3);
                        ctx.lineTo(x2, y2);
                        ctx.lineTo(x4, y4);
                        var gnt = ctx.createLinearGradient(x1, y1, x2, y2);
                        gnt.addColorStop(0, 'transparent');
                        gnt.addColorStop(1, 'yellow');
                        ctx.strokeStyle = gnt;
                    }
                    ctx.stroke();



                    if (!_status.multitarget) {
                        for (var i = 0; i < _status.lastdragchange.length; i++) {
                            ctx.moveTo(_status.mousedragging.clientX / game.documentZoom - ui.arena.offsetLeft, _status.mousedragging.clientY / game.documentZoom - ui.arena.offsetTop);
                            var exy = _status.lastdragchange[i]._lastdragchange;
                            ctx.lineTo(exy[0], exy[1]);
                            x2 = exy[0]; y2 = exy[1];
                            a = Math.atan2((y2 - y1), (x2 - x1));
                            x3 = x2 - l * Math.cos(a + 30 * Math.PI / 180);
                            y3 = y2 - l * Math.sin(a + 30 * Math.PI / 180);
                            x4 = x2 - l * Math.cos(a - 30 * Math.PI / 180);
                            y4 = y2 - l * Math.sin(a - 30 * Math.PI / 180);
                            ctx.moveTo(x3, y3);
                            ctx.lineTo(x2, y2);
                            ctx.lineTo(x4, y4);
                            var gnt = ctx.createLinearGradient(x1, y1, x2, y2);
                            gnt.addColorStop(0, 'transparent');
                            gnt.addColorStop(1, 'yellow');
                            ctx.strokeStyle = gnt;
                            ctx.stroke();
                        }
                    }
                }

                while (item) {
                    if (item == _status.mousedragorigin) {
                        if (_status.mouseleft) {
                            _status.mousedragging = null;
                            _status.mousedragorigin = null;
                            _status.clicked = false;
                            if (_status.event.type == 'phase' && !_status.event.skill && ui.confirm) {
                                ui.confirm.classList.add('removing');
                            }
                            game.uncheck();
                            game.check();
                            _status.clicked = true;
                        }
                        return;
                    }
                    var itemtype = get.itemtype(item);
                    if (itemtype == 'card' || itemtype == 'button' || itemtype == 'player') {
                        _status.mouseleft = true;
                        if (ui.selected.cards.length) {
                            ui.selected.cards[0].updateTransform(true, 100);
                        }
                        var ex = e.clientX / game.documentZoom - ui.arena.offsetLeft;
                        var ey = e.clientY / game.documentZoom - ui.arena.offsetTop;
                        var exx = ex, eyy = ey;
                        if (game.chess) {
                            ex -= -ui.chessContainer.chessLeft + ui.chess.offsetLeft;
                            ey -= -ui.chessContainer.chessTop + ui.chess.offsetTop;
                        }
                        if (itemtype != 'player' || game.chess || (ex > item.offsetLeft && ex < item.offsetLeft + item.offsetWidth &&
                            ey > item.offsetTop && ey < item.offsetTop + item.offsetHeight)) {
                            var targetfixed = false;
                            if (itemtype == 'player') {
                                if (get.select(_status.event.selectTarget)[1] <= -1) {
                                    targetfixed = true;
                                }
                            }
                            if (!targetfixed && item.classList.contains('selectable') && _status.dragstatuschanged != item) {
                                _status.mouseleft = true;
                                _status.dragstatuschanged = item;
                                _status.clicked = false;
                                var notbefore = itemtype == 'player' && !item.classList.contains('selected');
                                ui.click[itemtype].call(item);
                                if (item.classList.contains('selected')) {
                                    if (notbefore) {
                                        _status.lastdragchange.push(item);
                                        item._lastdragchange = [exx, eyy];
                                    }
                                }
                                else {
                                    _status.lastdragchange.remove(item);
                                }
                                _status.selectionfull = true;
                                if (_status.event.filterButton && ui.selected.buttons.length < get.select(_status.event.selectButton)[1]) {
                                    _status.selectionfull = false;
                                }
                                else if (_status.event.filterCard && ui.selected.cards.length < get.select(_status.event.selectCard)[1]) {
                                    _status.selectionfull = false;
                                }
                                else if (_status.event.filterTarget && ui.selected.targets.length < get.select(_status.event.selectTarget)[1]) {
                                    _status.selectionfull = false;
                                }
                            }
                        }
                        return;
                    }
                    item = item.parentNode;
                }
                if (!_status.mouseleft) {
                    _status.mouseleft = true;
                    game.check();
                    for (var i = 0; i < ui.selected.cards.length; i++) {
                        ui.selected.cards[i].updateTransform(true);
                    }
                }
                _status.dragstatuschanged = null;
            }
            else {
                while (item) {
                    if (item == node && !node._mouseentercreated) {
                        ui.click.mouseentercancel();
                        var hoveration;
                        if (typeof node._hoveration == 'number') {
                            hoveration = node._hoveration;
                        }
                        else {
                            hoveration = parseInt(lib.config.hoveration);
                            if (node.classList.contains('button') ||
                                (node.parentNode && node.parentNode.parentNode) == ui.me) {
                                hoveration += 500;
                            }
                        }
                        _status._mouseentertimeout = setTimeout(function () {
                            if (_status.currentmouseenter != node || node._mouseentercreated || _status.tempunpopup ||
                                _status.mousedragging || _status.mousedown || !node.offsetWidth || !node.offsetHeight) {
                                return;
                            }
                            if (node._hoverfunc && !node._nopup) {
                                var dialog = node._hoverfunc.call(node, e);
                                if (dialog) {
                                    dialog.classList.add('popped');
                                    ui.window.appendChild(dialog);
                                    lib.placePoppedDialog(dialog, e);
                                    if (node._hoverwidth) {
                                        dialog.style.width = node._hoverwidth + 'px';
                                        dialog._hovercustomed = true;
                                    }
                                    node._mouseenterdialog = dialog;
                                    node._mouseentercreated = true;
                                }
                            }
                        }, hoveration);
                        break;
                    }
                    item = item.parentNode;
                }
                if (_status.draggingdialog) {
                    var ddialog = _status.draggingdialog;
                    if (ddialog._dragorigin && ddialog._dragtransform) {
                        var translate = ddialog._dragtransform.slice(0);
                        translate[0] += e.clientX / game.documentZoom - ddialog._dragorigin.clientX / game.documentZoom;
                        translate[1] += e.clientY / game.documentZoom - ddialog._dragorigin.clientY / game.documentZoom;
                        ui.click.checkdialogtranslate(translate, ddialog);
                    }
                    _status.clicked = true;
                }
                if (_status.draggingroundmenu) {
                    if (ui.roundmenu._dragorigin && ui.roundmenu._dragtransform) {
                        var translate = ui.roundmenu._dragtransform.slice(0);
                        translate[0] += e.clientX / game.documentZoom - ui.roundmenu._dragorigin.clientX / game.documentZoom;
                        translate[1] += e.clientY / game.documentZoom - ui.roundmenu._dragorigin.clientY / game.documentZoom;
                        ui.click.checkroundtranslate(translate);
                    }
                    _status.clicked = true;
                }
            }
        },
        windowtouchmove: function (e) {
            e.preventDefault();
            if (window.inSplash) return;
            if (_status.draggingroundmenu) {
                delete _status._swipeorigin;
                if (ui.roundmenu._dragorigin && ui.roundmenu._dragtransform && e.touches.length) {
                    var translate = ui.roundmenu._dragtransform.slice(0);
                    var dx = e.touches[0].clientX / game.documentZoom - ui.roundmenu._dragorigin.clientX / game.documentZoom;
                    var dy = e.touches[0].clientY / game.documentZoom - ui.roundmenu._dragorigin.clientY / game.documentZoom;
                    translate[0] += dx;
                    translate[1] += dy;
                    if (dx * dx + dy * dy > 100) {
                        if (ui.roundmenu._resetTimeout) {
                            clearTimeout(ui.roundmenu._resetTimeout);
                            delete ui.roundmenu._resetTimeout;
                        }
                    }
                    ui.roundmenu._dragtouches = e.touches[0];
                    ui.click.checkroundtranslate(translate);
                }
                _status.clicked = true;
            }
            else if (_status.draggingtouchdialog) {
                delete _status._swipeorigin;
                if (_status.draggingtouchdialog._dragorigin && _status.draggingtouchdialog._dragtransform && e.touches.length) {
                    var translate = _status.draggingtouchdialog._dragtransform.slice(0);
                    var dx = e.touches[0].clientX / game.documentZoom - _status.draggingtouchdialog._dragorigin.clientX / game.documentZoom;
                    var dy = e.touches[0].clientY / game.documentZoom - _status.draggingtouchdialog._dragorigin.clientY / game.documentZoom;
                    translate[0] += dx;
                    translate[1] += dy;
                    _status.draggingtouchdialog._dragtouches = e.touches[0];
                    ui.click.checkdialogtranslate(translate, _status.draggingtouchdialog);
                }
                _status.clicked = true;
            }
            else if (_status._swipeorigin && e.touches[0]) {
                _status._swipeorigin.touches = e.touches[0];
            }

            if (_status.mousedragging && e.touches.length) {
                e.preventDefault();
                var item = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
                if (game.chess && ui.selected.cards.length) {
                    var itemtype = get.itemtype(item);
                    if (itemtype != 'card' && itemtype != 'button') {
                        var ex = e.touches[0].clientX / game.documentZoom - ui.arena.offsetLeft;
                        var ey = e.touches[0].clientY / game.documentZoom - ui.arena.offsetTop;
                        for (var i = 0; i < game.players.length; i++) {
                            var left = -ui.chessContainer.chessLeft + ui.chess.offsetLeft + game.players[i].getLeft();
                            var top = -ui.chessContainer.chessTop + ui.chess.offsetTop + game.players[i].getTop();
                            var width = game.players[i].offsetWidth;
                            var height = game.players[i].offsetHeight;
                            if (ex > left && ex < left + width && ey > top && ey < top + height) {
                                item = game.players[i];
                                break;
                            }
                        }
                    }
                }
                while (item) {
                    if (lib.config.enable_touchdragline && _status.mouseleft && !game.chess) {
                        ui.canvas.width = ui.arena.offsetWidth;
                        ui.canvas.height = ui.arena.offsetHeight;
                        var ctx = ui.ctx;
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = 'rgba(229, 225, 92)';
                        ctx.lineCap = 'round';
                        ctx.lineJoin = 'round';
                        ctx.lineWidth = 10;
                        ctx.setLineDash([]);
                        ctx.beginPath();
                        var l = 25;
                        var x1 = _status.mousedragging.clientX / game.documentZoom - ui.arena.offsetLeft;
                        var y1 = _status.mousedragging.clientY / game.documentZoom - ui.arena.offsetTop;
                        var a, x2, y2, x3, y3, x4, y4;

                        ctx.moveTo(x1, y1);

                        if (_status.multitarget) {
                            for (var i = 0; i < _status.lastdragchange.length; i++) {
                                var exy = _status.lastdragchange[i]._lastdragchange;
                                ctx.lineTo(exy[0], exy[1]);
                                x2 = exy[0]; y2 = exy[1];
                                a = Math.atan2((y2 - y1), (x2 - x1));
                                x3 = x2 - l * Math.cos(a + 30 * Math.PI / 180);
                                y3 = y2 - l * Math.sin(a + 30 * Math.PI / 180);
                                x4 = x2 - l * Math.cos(a - 30 * Math.PI / 180);
                                y4 = y2 - l * Math.sin(a - 30 * Math.PI / 180);
                                ctx.moveTo(x3, y3);
                                ctx.lineTo(x2, y2);
                                ctx.lineTo(x4, y4);
                                var gnt = ctx.createLinearGradient(x1, y1, x2, y2);
                                gnt.addColorStop(0, 'transparent');
                                gnt.addColorStop(1, 'yellow');
                                ctx.strokeStyle = gnt;
                            }
                        }
                        if (!_status.selectionfull) {
                            x2 = e.touches[0].clientX/game.documentZoom-ui.arena.offsetLeft;
                            y2 = e.touches[0].clientY/game.documentZoom-ui.arena.offsetTop;
                            ctx.lineTo(x2, y2);
                            a = Math.atan2((y2 - y1), (x2 - x1));
                            x3 = x2 - l * Math.cos(a + 30 * Math.PI / 180);
                            y3 = y2 - l * Math.sin(a + 30 * Math.PI / 180);
                            x4 = x2 - l * Math.cos(a - 30 * Math.PI / 180);
                            y4 = y2 - l * Math.sin(a - 30 * Math.PI / 180);
                            ctx.moveTo(x3, y3);
                            ctx.lineTo(x2, y2);
                            ctx.lineTo(x4, y4);
                            var gnt = ctx.createLinearGradient(x1, y1, x2, y2);
                            gnt.addColorStop(0, 'transparent');
                            gnt.addColorStop(1, 'yellow');
                            ctx.strokeStyle = gnt;
                        }
                        ctx.stroke();
                        if (!_status.multitarget) {
                            for (var i = 0; i < _status.lastdragchange.length; i++) {
                                ctx.moveTo(_status.mousedragging.clientX / game.documentZoom - ui.arena.offsetLeft, _status.mousedragging.clientY / game.documentZoom - ui.arena.offsetTop);
                                var exy = _status.lastdragchange[i]._lastdragchange;
                                ctx.lineTo(exy[0], exy[1]);
                                x2 = exy[0]; y2 = exy[1];
                                a = Math.atan2((y2 - y1), (x2 - x1));
                                x3 = x2 - l * Math.cos(a + 30 * Math.PI / 180);
                                y3 = y2 - l * Math.sin(a + 30 * Math.PI / 180);
                                x4 = x2 - l * Math.cos(a - 30 * Math.PI / 180);
                                y4 = y2 - l * Math.sin(a - 30 * Math.PI / 180);
                                ctx.moveTo(x3, y3);
                                ctx.lineTo(x2, y2);
                                ctx.lineTo(x4, y4);
                                var gnt = ctx.createLinearGradient(x1, y1, x2, y2);
                                gnt.addColorStop(0, 'transparent');
                                gnt.addColorStop(1, 'yellow');
                                ctx.strokeStyle = gnt;
                                ctx.stroke();
                            }
                        }
                    }

                    if (item == _status.mousedragorigin) {
                        if (_status.mouseleft) {
                            _status.mousedragging = null;
                            _status.mousedragorigin = null;
                            _status.clicked = false;
                            game.uncheck();
                            game.check();
                            _status.clicked = true;
                        }
                        return;
                    }
                    var itemtype = get.itemtype(item);
                    if (itemtype == 'card' || itemtype == 'button' || itemtype == 'player') {
                        _status.mouseleft = true;
                        if (ui.selected.cards.length) {
                            ui.selected.cards[0].updateTransform(true, 100);
                        }
                        var ex = e.touches[0].clientX / game.documentZoom - ui.arena.offsetLeft;
                        var ey = e.touches[0].clientY / game.documentZoom - ui.arena.offsetTop;
                        var exx = ex, eyy = ey;
                        if (game.chess) {
                            ex -= -ui.chessContainer.chessLeft + ui.chess.offsetLeft;
                            ey -= -ui.chessContainer.chessTop + ui.chess.offsetTop;
                        }
                        if (itemtype != 'player' || game.chess || (ex > item.offsetLeft && ex < item.offsetLeft + item.offsetWidth &&
                            ey > item.offsetTop && ey < item.offsetTop + item.offsetHeight)) {
                            var targetfixed = false;
                            if (itemtype == 'player') {
                                if (get.select(_status.event.selectTarget)[1] <= -1) {
                                    targetfixed = true;
                                }
                            }
                            if (!targetfixed && item.classList.contains('selectable') && _status.dragstatuschanged != item) {
                                _status.mouseleft = true;
                                _status.dragstatuschanged = item;
                                _status.clicked = false;
                                _status.dragged = false;
                                var notbefore = itemtype == 'player' && !item.classList.contains('selected');
                                ui.click[itemtype].call(item);
                                if (item.classList.contains('selected')) {
                                    if (notbefore) {
                                        _status.lastdragchange.push(item);
                                        item._lastdragchange = [exx, eyy];
                                        if (lib.falseitem) {
                                            var from = [_status.mousedragging.clientX / game.documentZoom - ui.arena.offsetLeft, _status.mousedragging.clientY / game.documentZoom - ui.arena.offsetTop];
                                            var to = [exx, eyy];
                                            var node = ui.create.div('.linexy.hidden');
                                            node.style.left = from[0] + 'px';
                                            node.style.top = from[1] + 'px';
                                            node.style.transitionDuration = '0.3s';
                                            node.style.backgroundColor = 'white';
                                            var dy = to[1] - from[1];
                                            var dx = to[0] - from[0];
                                            var deg = Math.atan(Math.abs(dy) / Math.abs(dx)) / Math.PI * 180;
                                            if (dx >= 0) {
                                                if (dy <= 0) {
                                                    deg += 90;
                                                }
                                                else {
                                                    deg = 90 - deg;
                                                }
                                            }
                                            else {
                                                if (dy <= 0) {
                                                    deg = 270 - deg;
                                                }
                                                else {
                                                    deg += 270;
                                                }
                                            }
                                            node.style.transform = 'rotate(' + (-deg) + 'deg) scaleY(0)';
                                            node.style.height = get.xyDistance(from, to) + 'px';
                                            if (game.chess) {
                                                ui.chess.appendChild(node);
                                            }
                                            else {
                                                ui.arena.appendChild(node);
                                            }
                                            ui.refresh(node);
                                            node.show();
                                            node.style.transform = 'rotate(' + (-deg) + 'deg) scaleY(1)';
                                            ui.touchlines.push(node);
                                            node._origin = item;
                                        }
                                    }
                                }
                                else {
                                    _status.lastdragchange.remove(item);
                                    for (var i = 0; i < ui.touchlines.length; i++) {
                                        if (ui.touchlines[i]._origin == item) {
                                            ui.touchlines[i].delete();
                                            ui.touchlines.splice(i--, 1);
                                        }
                                    }
                                }
                                _status.selectionfull = true;
                                if (_status.event.filterButton && ui.selected.buttons.length < get.select(_status.event.selectButton)[1]) {
                                    _status.selectionfull = false;
                                }
                                else if (_status.event.filterCard && ui.selected.cards.length < get.select(_status.event.selectCard)[1]) {
                                    _status.selectionfull = false;
                                }
                                else if (_status.event.filterTarget && ui.selected.targets.length < get.select(_status.event.selectTarget)[1]) {
                                    _status.selectionfull = false;
                                }
                            }
                        }
                        return;
                    }
                    item = item.parentNode;
                }
                _status.mouseleft = true;
                _status.dragstatuschanged = null;
            }
        }
    });
    if(!lib.config.touchscreen) document.addEventListener('mousemove',ui.click.windowmousemove);
    else document.addEventListener('touchmove',ui.click.windowtouchmove);
});