/*jshint esversion: 6 */
game.import("extension", function(lib,game,ui,get,ai,_status){
    window.decadeUIdynamicBackground = {
        off: '关闭',
        random: '随机背景',
        //skin_xiaosha_default: '小杀',
	    公孙渊_逐鹿天下: '公孙渊·逐鹿天下',
	    马钧_能工巧匠: '马钧·能工巧匠',
	    大小乔_娇卧佳黛: '大小乔·娇卧佳黛',
        张飞_明良千古: '张飞·明良千古',
        孙寒华_莲华熠熠: '孙寒华·莲华熠熠',
        祝融_飞刀烈火: '祝融·飞刀烈火',
        动态背景_花影婆娑: '动态·花影婆娑',
        动态背景_春山如黛: '动态·春山如黛',
    };
return { name:"十周年UI",content:function(config, pack){
	'use strict';
	//扫描ass的图片
	window.tenUIequipsList=[];
	if(lib.config.game_cardSet) game.saveConfig('extension_十周年UI_game_cardSet',lib.config.game_cardSet);
	if(lib.config.game_cardSet2) game.saveConfig('extension_十周年UI_game_cardSet2',lib.config.game_cardSet2);
	game.getFileList('extension/十周年UI/image/ass',function(folders,files){
        for(var i=0;i<files.length;i++) {
            if(files[i].indexOf('.png')!=-1) window.tenUIequipsList.add(files[i].slice(0,-4));
        }
    });
    if(!window.tenUItraNP) window.tenUItraNP={};
    for(var i in lib.card) {
        var ma=lib.card[i];
        if(ma.subtype&&ma.subtype=='equip3') window.tenUItraNP[i]='pos1';
        if(ma.subtype&&ma.subtype=='equip4') window.tenUItraNP[i]='neg1';
    }
    /*window.getDecPrompt=function(tipText) {
        var str='';
        if(tipText.indexOf('###')==0){
			var prompts=tipText.slice(3).split('###');
			if(prompts[0]) str=prompts[0]+'：';
			if(prompts[1]) str+=prompts[1];
		}else {
		    str=tipText;
		}
		return str;
    }*/
    window.getDecPrompt=function(tipText) {
        if(tipText.indexOf('###')==0){
			var prompts=tipText.slice(3).split('###');
			//if(prompts[0]) str=prompts[0]+'：';
			if(prompts[1]) tipText=prompts[1];
		}
		return tipText;
    }
    //alert(window.tenUIequipsList);
    //尝试解决典韦装备区问题，放弃了，，
    /*lib.skill._changeEquipExt={
        trigger:{
            player:"loseBegin",
            global:["equipAfter","addJudgeBegin","gainBegin","loseAsyncBegin"],
        },
        forced:true,
        filter:function(event,player){
            //var evt=event.getl(player);
            //return evt&&evt.player==player&&evt.es&&evt.es.length>0;
            return true;
        },
        direct:true,
        content: function() {
            var lose=trigger.getl(player).es;
            var equip=player.getCards('e');
            if(equip&&equip.length) equip.forEach(card=>{
                if(card.chars) card.chars.style.opacity=0;
            });
            if(lose&&lose.length) lose.forEach(card=>{
                if(card.chars) card.chars.style.opacity=1;
            });
        }
    }*/
    
    window.codeFixAdd=function(name,func,rzsh){
        var codeLoads='liulikill_codeFix';
        if(rzsh) codeLoads='liulikill_rz_codeFix';
        var rz='代码';
        if(rzsh) rz='如真';
        if(!name||typeof name != 'string') {
            alert(rz+'补丁：项目名称语法不正确！');
            return '创建失败';
        }
        if(!func||typeof func != 'function') {
            alert(rz+'补丁：修正函数语法不正确！');
            return '创建失败';
        }
        if(lib.config[codeLoads]&&typeof lib.config[codeLoads] == 'object') {
            var codeList=lib.config[codeLoads];
        }else {
            var codeList={};
        }
        var tihuan=false;
        if(codeList[name]) tihuan=true;
        codeList[name]=func.toString();
        game.saveConfig(codeLoads,codeList);
        if(tihuan) {
            alert(rz+'补丁：已替换'+name+'项目的原代码！');
        }else {
            alert(rz+'补丁：已创建名为'+name+'的项目！');
        }
        return '创建成功';
    };
    window.codeFixCls=function(name,rzsh) {
        var codeLoads='liulikill_codeFix';
        if(rzsh) codeLoads='liulikill_rz_codeFix';
        var rz='代码';
        if(rzsh) rz='如真';
        if(name) {
            if(typeof name != 'string') {
                alert(rz+'补丁：项目名称语法不正确！');
                return '删除失败';
            }
            if(!lib.config[codeLoads]||!lib.config[codeLoads][name]) {
                alert(rz+'补丁：项目在内容中不存在！');
                return '删除失败';
            }
            lib.config[codeLoads][name]=undefined;
            game.saveConfig(codeLoads,lib.config[codeLoads][name]);
            alert(rz+'补丁：已删除项目『'+name+'』！');
            return '删除成功';
        }
        game.saveConfig(codeLoads,{});
        alert(rz+'补丁：已清空所有项目内容！');
        return '清空成功';
    };
    window.codeFixGet=function(name,rzsh) {
        var codeLoads='liulikill_codeFix';
        if(rzsh) codeLoads='liulikill_rz_codeFix';
        var rz='代码';
        if(rzsh) rz='如真';
        if(name&&typeof name != 'string') {
            alert(rz+'补丁：项目名称语法不正确！');
            return '获取失败';
        }
        if(lib.config[codeLoads]&&typeof lib.config[codeLoads] == 'object') {
            var codeList=lib.config[codeLoads];
        }else {
            var codeList={};
        }
        if(!name) {
            var str=rz+'项目列表：\n';
            for(var i in codeList) {
                if(!codeList[i]) continue;
                str+='\n『'+i+'』：\n'+codeList[i]+'\n';
            }
            alert(str);
            return str;
        }
        if(!codeList[name]) {
            alert(rz+'补丁：找不到名为'+name+'的项目');
        }else {
            alert('项目查找：\n『'+name+'』：\n'+codeList[name]);
        }
        return '查找结束';
    };
    //游戏临时修复代码功能
    if(lib.config['liulikill_codeFix']&&typeof lib.config['liulikill_codeFix'] == 'object') {
        var codeList=lib.config['liulikill_codeFix'];
        for(var i in codeList) {
            var cds=codeList[i];
            if(cds) cds=eval('('+cds+')');
            if(cds&&typeof cds == 'function') {
                 //var func=cds;
                 try{
                     cds();
                 } catch(err) {
                     game.log('『'+i+'』代码执行出现问题！\n☞错误：'+err);
                     //alert('『'+i+'』代码执行出现问题！\n☞错误：'+err);
                 }
            }
        }
    }else {
        game.saveConfig('liulikill_codeFix',{});
    }
    //作弊立即生效
    lib.skill._ui_auto_cheat={
	    enable:'phaseUse',
	    filter:function(event,player){
	        if(player!=game.me) return false;
	        //if(!_status.auto) return false;
	        if(!lib.config.cheatNowDo) return false;
	        if(game.me?.isMad()) return false;
	        //最后一条判断是否被控
	        return (game.me._trueMe==undefined||game.me._trueMe==game.me);
	    },
	    direct:true,
	    content:function(){
	        //alert_old(666);
	        game.log('※','<span style=\"color:#00FF00\">即时指令</span>','已被成功执行');
	    },
	    ai:{
	        order:999,
	        basic: {
                order:999,
            },
	        result:{
	            player:function(){
	                if(window.hasCheat) return 999;
	                return -1;
	            },
	        },
	    },
	};
	lib.translate._ui_auto_cheat='作弊';
	//玩家边框等阶
	lib.skill._kill_framebg = {
		trigger: {
			global: ["gameStart","showCharacterEnd"],
		},
		forced: true,
		filter: function (event, player) {
						return lib.config['extension_十周年UI_newDecadeStyle'] == "on"
						},
		direct:true,
		charlotte:true,
		content: function() {
		        if(get.mode()=='boss'&&['zhu','zhong'].contains(player.identity)) {
		            if(player.identity=='zhong'){
					player.node.campWrap.dataset.borderLevel = 'four';
					player.node.hpWrap.dataset.borderLevel = 'four';
					player.node.cardWrap.dataset.borderLevel = 'four';
					}else {
					player.node.campWrap.dataset.borderLevel = 'five';
					player.node.hpWrap.dataset.borderLevel = 'five';
					player.node.cardWrap.dataset.borderLevel = 'five';
					}
					event.finish();
					return;
		        }
				if(lib.rank.rarity&&game.getRarity(player.name)=='junk'){
					player.node.campWrap.dataset.borderLevel = 'one';
					player.node.hpWrap.dataset.borderLevel = 'one';
					player.node.cardWrap.dataset.borderLevel = 'one';
					}
				if(lib.rank.rarity&&game.getRarity(player.name)=='common'){
					player.node.campWrap.dataset.borderLevel = 'two';
					player.node.hpWrap.dataset.borderLevel = 'two';
					player.node.cardWrap.dataset.borderLevel = 'two';
					}
				if(lib.rank.rarity&&game.getRarity(player.name)=='rare'){
					player.node.campWrap.dataset.borderLevel = 'three';
					player.node.hpWrap.dataset.borderLevel = 'three';
					player.node.cardWrap.dataset.borderLevel = 'three';
					}
				if(lib.rank.rarity&&game.getRarity(player.name)=='epic'){
					player.node.campWrap.dataset.borderLevel = 'four';
					player.node.hpWrap.dataset.borderLevel = 'four';
					player.node.cardWrap.dataset.borderLevel = 'four';
					}
				if(lib.rank.rarity&&game.getRarity(player.name)=='legend'){
					player.node.campWrap.dataset.borderLevel = 'five';
					player.node.hpWrap.dataset.borderLevel = 'five';
					player.node.cardWrap.dataset.borderLevel = 'five';
					}
				}
		     }


	
	/*-----------------分割线-----------------*/
	/*lib.extensionMenu['extension_十周年UI']['手杀UI'] = {
		clear: true,
		name: '点击安装手杀UI',
		intro: '点击安装自动手杀UI扩展',
		onclick: function(item) {
				// if(game.xwHasExtensionInstalled("手杀UI")){
				// alert("您已经安装此扩展！");
				// } else {
			if (lib.config.control_style == 'default') {
				alert ("开始为您安装手杀UI，请耐心等待\n导入成功后将会自动重启。");
				//alert ("已开始为您安装手杀UI，请耐心等待\n导入成功后将会自动重启。");
				alert ("如果长时间无响应且未重启\n请查看十周年UI/shoushaUI 中的文件是否出现乱码\n若乱码将其改为“手杀UI.zip”");

				var url = lib.assetURL + 'extension/十周年UI';
				lib.init.css(url, 'extension');
				game.hasExtensionInstalled = function(str){
					return lib.config.extensions && lib.config.extensions.contains(str);
				};
				window.xwOpenLoading = function(){
					var dialog = ui.create.div('.xwjh-loading',document.body);
					var text = ui.create.div('.xwjh-loading-text',dialog);
					dialog.subViews = {text};
					return dialog;
				};
				
				game.installShousha=function(){
					var loading = window.xwOpenLoading();
					loading.subViews.text.innerHTML = "正在导入手杀UI，请稍后。。。。。。";
					var fileToLoad="extension/十周年UI/shoushaUI/手杀UI.zip";
					if(game.readFile){
						game.readFile(fileToLoad,function(data){
							game.importExtension(data,function(){
								alert("导入完成，正在重启");
								game.reload();
							});
						});
					}
				};
				
				if(!game.hasExtensionInstalled('手杀UI')){
					setTimeout(function(){
						game.installShousha();
					},1000);
				}
			} else {
				if (lib.config.extension_手杀ui__enable) {
					alert ("检测到已打开手杀ui，请先关闭手杀ui并重启一次！！！"); } else {
					alert ("安装手杀UI请先将菜单/外观/按钮背景选项改为默认！"); }
			};
		},
	};*/
	/*-----------------分割线-----------------*/
	
	
	
                //龙头
                lib.skill._rarity = {
                    trigger: {
                        global: ["gameStart", "showCharacterEnd"],
                    },
                    forced: true,
                    filter: function (event, player) {
                        return lib.config['extension_十周年UI_rarityLong']
                    },
                    content: function () {
                    var rarity = game.getRarity(player.name);
                    if(get.mode()=='boss'&&['zhu','zhong'].contains(player.identity)) {
		                if(player.identity=='zhu'){
					        rarity='legend';
					    }else {
					        rarity='rare';
					    }
		            }
                    if (lib.config.extension_十周年UI_rarityLong == 'on' && lib.config.mode != 'guozhan') {
 if (rarity == 'legend'){
 var yh = document.createElement("img");
                            yh.src = decadeUIPath + "/assets/image/long1_" + rarity + ".png";
                            yh.style.cssText="pointer-events:none";
                            yh.style.position = "absolute";
                            yh.style.display = "block";
                            if (decadeUI.config.newDecadeStyle == 'on') {
                            yh.style.top = "-74px";
                            yh.style.left = "-11px";
                            yh.style.height = "200%";
                            yh.style.width = "150%";
                            yh.style.zIndex = "89";} else{
                            yh.style.top = "-86.5px";
                            yh.style.left = "-8.5px";
                            yh.style.height = "214%";
                            yh.style.width = "150%";                     
                            yh.style.zIndex = "78";}
                            player.appendChild(yh)
 }
else if   (rarity == 'rare'){
      var yh = document.createElement("img");
                            yh.src = decadeUIPath + "/assets/image/long1_" + rarity + ".png";
                            yh.style.cssText="pointer-events:none";
                            yh.style.position = "absolute";
                            yh.style.display = "block";
                            if (decadeUI.config.newDecadeStyle == 'on') {
                            yh.style.top = "-50px";
                            yh.style.left = "12px";
                            yh.style.height = "155%";
                            yh.style.width = "155%";
                            yh.style.zIndex = "89";} else{
                            yh.style.top = "-62px";
                            yh.style.left = "25.6px";
                            yh.style.width = "145%";
                            yh.style.height = "164%";                     
                            yh.style.zIndex = "78";}
                            player.appendChild(yh)
 }
 else if(rarity == 'epic'){
      var yh = document.createElement("img");
                            yh.src = decadeUIPath + "/assets/image/long1_" + rarity + ".png";
                            yh.style.cssText="pointer-events:none";
                            yh.style.position = "absolute";
                            yh.style.display = "block";
                            if (decadeUI.config.newDecadeStyle == 'on') {
                            yh.style.top = "-28px";
                            yh.style.left = "-12px";
                            yh.style.height = "130%";
                            yh.style.width = "145%";
                            yh.style.zIndex = "89";} else{
                            yh.style.top = "-36px";
                            yh.style.left = "-8px";
                            yh.style.height = "137%"; 
                            yh.style.width = "145%";                    
                            yh.style.zIndex = "78";}
                            player.appendChild(yh)
 }
else if(rarity == 'common'){
      var yh = document.createElement("img");
                            yh.src = decadeUIPath + "/assets/image/long1_" + rarity + ".png";
                            yh.style.cssText="pointer-events:none";
                            yh.style.position = "absolute";
                            yh.style.display = "block";
                            if (decadeUI.config.newDecadeStyle == 'on') {
                            yh.style.top = "-29px";
                            yh.style.left = "-15px";
                            yh.style.height = "125%";
                            yh.style.width = "145%";
                            yh.style.zIndex = "89";} else{
                            yh.style.top = "-37px";
                            yh.style.left = "-7px";
                            yh.style.width = "140%";
                            yh.style.height = "132%";                     
                            yh.style.zIndex = "78";}
                            player.appendChild(yh)
 }
 else if(rarity == 'junk'){
      var yh = document.createElement("img");
                            yh.src = decadeUIPath + "/assets/image/long1_" + rarity + ".png";
                            yh.style.cssText="pointer-events:none";
                            yh.style.position = "absolute";
                            yh.style.display = "block";
                            if (decadeUI.config.newDecadeStyle == 'on') {
                            yh.style.top = "-29px";
                            yh.style.left = "-6.3px";
                            yh.style.height = "110%";
                            yh.style.width = "134%";
                            yh.style.zIndex = "89";} else{
                            yh.style.top = "-85px";
                            yh.style.left = "-10px";
                            yh.style.height = "182%";                     
                            yh.style.zIndex = "73";}
                            player.appendChild(yh)
 }
 }
                            
                            if (lib.config.extension_十周年UI_rarityLong == 'xinon'&&game.getRarity(player.name) != 'junk' && lib.config.mode != 'guozhan') {
                    var rarity=game.getRarity(player.name);
                    var yh = document.createElement("img");
                            yh.src = decadeUIPath + "/assets/image/long_" + rarity + ".png";
                            yh.style.cssText="pointer-events:none";
                            yh.style.position = "absolute";
                            yh.style.display = "block";
                            if (decadeUI.config.newDecadeStyle == 'on') {
                            yh.style.top = "-108px";
                            yh.style.left = "-27px";
                            yh.style.height = "215%";
                            yh.style.width = "175%";
                            yh.style.zIndex = "89";}else {
                            yh.style.top = "-118px";
                            yh.style.left = "-23px";
                            yh.style.height = "222%";
                            yh.style.width = "175%";
                            yh.style.zIndex = "78";}
                            player.appendChild(yh)
                            }
                            
                            if (lib.config.extension_十周年UI_rarityLong == 'off'&&game.getRarity(player.name) != 'junk' && lib.config.mode != 'guozhan') {
                    var yh = document.createElement("img");
                            yh.src = decadeUIPath + "/assets/image/long2_" + rarity + ".png";
                            yh.style.cssText="pointer-events:none";
                            yh.style.position = "absolute";
                            yh.style.display = "block";
                            if (decadeUI.config.newDecadeStyle == 'on') {
                            yh.style.top = "-29px";
                            yh.style.left = "-15px";
                            yh.style.height = "125%";
                            yh.style.width = "145%";
                            yh.style.zIndex = "89";} else{
                            yh.style.top = "-37px";
                            yh.style.left = "-7px";
                            yh.style.width = "140%";
                            yh.style.height = "132%";                     
                            yh.style.zIndex = "78";}
                            player.appendChild(yh)
                            }
                        }
                   }
                   
//神刘备 结营
lib.skill._tiesuo_ying = {
    trigger: {
        global: ["gameDrawAfter", "dieBegin"],
    },
    forced: true,
    filter: function (event, player, name) {
        if (name == 'gameDrawAfter') {
            return player.hasSkill('nzry_jieying') || player.hasSkill('pro_nzry_jieying');
        } else if (name == 'dieBegin') {
            return event.player.getElementsByClassName("tiesuo_ying").length > 0;
        }
    },
    content: function () {
        var name = event.triggername;
        if (name == 'gameDrawAfter') {
            var isJY = player.getElementsByClassName("tiesuo_ying");
            if (isJY.length > 0) return; // 防止重复添加

            var jy = document.createElement("img");
            jy.src = decadeUIPath + "/assets/image/tiesuo_ying.png";
            jy.style.cssText = "pointer-events:none;position:absolute;display:block;opacity:0;top:32%;left:-9px;height:40px;width:147px;z-index:98;transform:scale(1.08)";
            jy.classList.add("tiesuo_ying");
            player.appendChild(jy);

            // 使用requestAnimationFrame实现动画
            var startTime = null;
            var duration = 1000; // 动画持续时间1秒
            var delay = 500; // 延迟0.5秒开始

            function animate(timestamp) {
                if (!startTime) startTime = timestamp + delay;
                var elapsed = timestamp - startTime;

                if (elapsed < 0) {
                    requestAnimationFrame(animate);
                    return;
                }

                var progress = Math.min(elapsed / duration, 1);
                jy.style.opacity = progress;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            }
            requestAnimationFrame(animate);

        } else if (name == 'dieBegin') {
            var s = trigger.player.getElementsByClassName("tiesuo_ying");
            for (var i = s.length - 1; i >= 0; i--) {
                s[i].parentNode.removeChild(s[i]);
            }
        }
    }
};

                   
	var extensionName = decadeUIName;
	var extension = lib.extensionMenu['extension_' + extensionName];
	var extensionPath = lib.assetURL + 'extension/' + extensionName + '/';

    if (!(extension && extension.enable && extension.enable.init)) return;
    
	switch(lib.config.layout){
        case 'long2':
        case 'nova':
		case 'mobile':
            break;
        default:
            alert('十周年UI提醒您，请使用<默认>、<手杀>、<新版>布局以获得良好体验（在选项-外观-布局中调整）。');
            break;
    }
	
	console.time(extensionName);
	
	window.duicfg = config;
	window.dui = window.decadeUI = {
		init:function(){
			this.extensionName = extensionName;
			
			var sensor = decadeUI.element.create('sensor', document.body);
			sensor.id = 'decadeUI-body-sensor';
			this.bodySensor = new decadeUI.ResizeSensor(sensor);
			
			var SVG_NS = 'http://www.w3.org/2000/svg';
			var svg = document.body.appendChild(document.createElementNS(SVG_NS, 'svg'));
			var defs = svg.appendChild(document.createElementNS(SVG_NS, 'defs'));
			var solo = defs.appendChild(document.createElementNS(SVG_NS, 'clipPath'));
			var duol = defs.appendChild(document.createElementNS(SVG_NS, 'clipPath'));
			var duor = defs.appendChild(document.createElementNS(SVG_NS, 'clipPath'));
			var dskin = defs.appendChild(document.createElementNS(SVG_NS, 'clipPath'));
			
			
			solo.id = 'solo-clip';
			duol.id = 'duol-clip';
			duor.id = 'duor-clip';
			dskin.id = 'dskin-clip';
			
			solo.setAttribute('clipPathUnits', 'objectBoundingBox');
			duol.setAttribute('clipPathUnits', 'objectBoundingBox');
			duor.setAttribute('clipPathUnits', 'objectBoundingBox');
			dskin.setAttribute('clipPathUnits', 'objectBoundingBox');
			
			
			var soloPath = solo.appendChild(document.createElementNS(SVG_NS, 'path'));
			var duoLPath = duol.appendChild(document.createElementNS(SVG_NS, 'path'));
			var duoRPath = duor.appendChild(document.createElementNS(SVG_NS, 'path'));
			var dskinPath = dskin.appendChild(document.createElementNS(SVG_NS, 'path'));
			/*这段代码中的数字表示路径中的坐标值，具体来说：

- M0 0：移动到坐标为(0,0)的起始点。
- H1：绘制一条水平线段，结束点的x坐标为1。
- Q1 0.05 0.9 0.06：绘制一条二次贝塞尔曲线，控制点的坐标为(1,0.05)，结束点的坐标为(0.9,0.06)。
- Q1 0.06 1 0.11：绘制一条二次贝塞尔曲线，控制点的坐标为(1,0.06)，结束点的坐标为(1,0.11)。
- V1：绘制一条垂直线段，结束点的y坐标为1。
- H0：绘制一条水平线段，结束点的x坐标为0。
- V0.11：绘制一条垂直线段，结束点的y坐标为0.11。
- Q0 0.06 0.1 0.06：绘制一条二次贝塞尔曲线，控制点的坐标为(0,0.06)，结束点的坐标为(0.1,0.06)。
- Q0 0.05 0 0：绘制一条二次贝塞尔曲线，控制点的坐标为(0,0.05)，结束点的坐标为(0,0)。
- Z：闭合路径。

soloPath.setAttribute('d', 'M0 0 H1 V0.05 Q1 0.10 0.9 0.11 V0.12 Q1 0.12 1 0.17 V1 H0 V0.17 Q0 0.12 0.1 0.12 V0.11 H0 Z');
			    duoLPath.setAttribute('d', 'M1 0 H0 Q0 0.12 0.15 0.12 Q0 0.12 0 0.17 V1 H1 Z');
			    duoRPath.setAttribute('d', 'M0 0 H1 V0.05 Q1 0.11 0.85 0.11 V0.12 Q1 0.12 1 0.17 V1 H0 Z');
			    dskinPath.setAttribute('d', 'M0 0 H1 Q1 0.1 0.94 0.1 Q0.985 0.1 1 0.13 V1 H0 V0.14 Q0 0.11 0.06 0.1 Q0 0.1 0 0 Z');

这些数字的具体含义和作用可以根据SVG路径语法进行理解和解释。*/
			if(lib.config['extension_十周年UI_outcropSkin']=='shousha') {
			    soloPath.setAttribute('d', 'M0 0 H1 V1 H0 V0.17 Q0 0.12 0.1 0.12 V0.11 H0 Z');/*Q0 0.11 0 0.06*/
			    duoLPath.setAttribute('d', 'M1 0 H0 Q0 0.12 0.15 0.12 Q0 0.12 0 0.17 V1 H1 Z');
			    duoRPath.setAttribute('d', 'M0 0 H1 V1 H0 Z')
			    //duoRPath.setAttribute('d', 'M0 0 H1 V0.05 Q1 0.11 0.85 0.11 V0.12 Q1 0.12 1 0.17 V1 H0 Z');
			    dskinPath.setAttribute('d', 'M0 0 H1 Q1 0.1 0.94 0.1 Q0.985 0.1 1 0.13 V1 H0 V0.14 Q0 0.11 0.06 0.1 Q0 0.1 0 0 Z');
			}else {
			    soloPath.setAttribute('d', 'M0 0 H1 Q1 0.05 0.9 0.06 Q1 0.06 1 0.11 V1 H0 V0.11 Q0 0.06 0.1 0.06 Q0 0.05 0 0 Z');
			    duoLPath.setAttribute('d', 'M1 0 H0 Q0 0.06 0.15 0.06 Q0 0.06 0 0.11 V1 H1 Z');
			    duoRPath.setAttribute('d', 'M0 0 H1 Q1 0.06 0.85 0.06 Q1 0.06 1 0.11 V1 H0 Z');
			    dskinPath.setAttribute('d', 'M0 0 H1 Q1 0.1 0.94 0.1 Q0.985 0.1 1 0.13 V1 H0 V0.14 Q0 0.11 0.06 0.1 Q0 0.1 0 0 Z');
			}
			document.addEventListener('click', function(e){ dui.set.activeElement(e.target); }, true);
			this.initOverride();
			return this;
		},
		initOverride:function(){
			function override (dest, src) {
				var ok = true;
				var key;
				for (key in src) {
					if (dest[key]) {
						ok = override(dest[key], src[key]);
						if (ok) {
							dest[key] = src[key];
						}
					} else {
						dest[key] = src[key];
					}
					ok = false;
				}
				
				return ok;
			};
			
			function overrides (dest, src) {
				if (!dest._super) dest._super = {};
				for (var key in src) {
					if (dest[key])
						dest._super[key] = dest[key];
					
					dest[key] = src[key];
				}
			};
			
			var base = {
				ui:{
					create:{
						card: ui.create.card,
						cards: ui.create.cards,
						confirm: ui.create.confirm,
						volume: ui.create.volume,
						chat: ui.create.chat,
						button: ui.create.button,
						menu: ui.create.menu,
						player: ui.create.player,
						selectlist: ui.create.selectlist,
					},
					
					update: ui.update,
					updatec: ui.updatec,
				},
				get:{
					infoHp: get.infoHp,
					infoMaxHp: get.infoMaxHp,
					objtype: get.objtype,
					skillState: get.skillState,
				},
				game:{
					check: game.check,
					expandSkills: game.expandSkills,
					uncheck: game.uncheck,
					loop: game.loop,
					over: game.over,
					updateRoundNumber: game.updateRoundNumber,
					phaseLoop: game.phaseLoop,
					bossPhaseLoop: game.bossPhaseLoop,
					gameDraw: game.gameDraw,
				},
				lib:{
					element:{
						card:{
							init: lib.element.card.init,
						}, 
						
						content:{
							chooseButton: lib.element.content.chooseButton,
							turnOver: lib.element.content.turnOver,
						},
						
						control:{
							add: lib.element.control.add,
							open: lib.element.control.open,
							close: lib.element.control.close,
						},
						
						player:{
							getState: lib.element.player.getState,
							init: lib.element.player.init,
							uninit: lib.element.player.uninit,
							setModeState: lib.element.player.setModeState,
							$compare: lib.element.player.$compare,
							$damage: lib.element.player.$damage,
							$damagepop: lib.element.player.$damagepop,
							$dieAfter: lib.element.player.$dieAfter,
							$skill: lib.element.player.$skill,
							getSeatNum: lib.element.player.getSeatNum,
							$syncExpand: lib.element.player.$syncExpand,
						},
						event:{
							send: lib.element.event.send,
						},
					},
				},
			};
			
			var Card = (function(Card){
				Card.moveTo = function (player) {
					if (!player)
						return;
					
					var arena = dui.boundsCaches.arena;
					if (!arena.updated)
						arena.update();
					
					player.checkBoundsCache();
					this.fixed = true;
					var x = Math.round((player.cacheWidth - arena.cardWidth) / 2 + player.cacheLeft);
					var y = Math.round((player.cacheHeight - arena.cardHeight) / 2 + player.cacheTop);
					var scale = arena.cardScale;
					
					this.tx = x;
					this.ty = y;
					this.scaled = true;
					this.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + scale + ')';
					return this;
				};
				Card.moveDelete = function(player){
					this.fixed = true;
					this.moveTo(player);
					setTimeout(function(card){
						card.delete();
					}, 460, this);
				};
				return Card;
			})({});
			
			var Event = (function(Event){
				Event.addMessageHook = function (message, callback) {
					if (this._messages == undefined)
						this._messages = {};
					
					message = message.toLowerCase();
					if (this._messages[message] == undefined)
						this._messages[message] = [];
					
					message = this._messages[message];
					message.push(callback);
				};
				Event.triggerMessage = function (message) {
					if (this._messages == undefined)
						return;
					
					message = message.toLowerCase();
					if (this._messages[message] == undefined)
						return;
					
					message = this._messages[message];
					for (var i = 0; i < message.length; i++) {
						if (typeof message[i] == 'function')
							message[i].call(this);
					}
					
					this._messages[message] = [];
				};
				
				return Event;
			})({});
			
			var Player = (function(Player){
            						Player.init = function (character, character2, skill) {
							this.doubleAvatar = (character2 && lib.character[character2]) != undefined;

							var CUR_DYNAMIC = decadeUI.CUR_DYNAMIC;
							var MAX_DYNAMIC = decadeUI.MAX_DYNAMIC;
							if (CUR_DYNAMIC == undefined) {
								CUR_DYNAMIC = 0;
								decadeUI.CUR_DYNAMIC = CUR_DYNAMIC;
							}

							if (MAX_DYNAMIC == undefined) {
								MAX_DYNAMIC = decadeUI.isMobile() ? 2 : 10;
								if (window.OffscreenCanvas)
									MAX_DYNAMIC += 8;
								decadeUI.MAX_DYNAMIC = MAX_DYNAMIC;
							}

							if (this.dynamic)
								this.stopDynamic();
							var showDynamic = (this.dynamic || CUR_DYNAMIC < MAX_DYNAMIC) && duicfg.dynamicSkin;
							if (showDynamic && _status.mode != null) {
								var skins;
								var dskins = decadeUI.dynamicSkin;
								var avatars = this.doubleAvatar ? [character, character2] : [character];
								var increased;

								for (var i = 0; i < avatars.length; i++) {
									skins = dskins[avatars[i]];
									if (skins == undefined)
										continue;

									var keys = Object.keys(skins);
									if (keys.length == 0) {
										console.error('player.init: ' + avatars[i] + ' 没有设置动皮参数');
										continue;
									}

									var skin = skins[Object.keys(skins)[0]];
									if (skin.speed == undefined)
										skin.speed = 1;
									this.playDynamic({
										name: skin.name,		//	string 骨骼文件名，一般是assets/dynamic 下的动皮文件，也可以使用.. 来寻找其他文件目录
										action: skin.action,	// string 播放动作 不填为默认
										loop: true,				// boolean 是否循环播放
										loopCount: -1,			// number 循环次数，只有loop为true时生效
										speed: skin.speed,	 	// number 播放速度
										filpX: undefined,	 	// boolean 水平镜像
										filpY: undefined,	 	// boolean 垂直翻转
										opacity: undefined,	 	// 0~1		不透明度
										x: skin.x,				// 相对于父节点坐标x，不填为居中
										// (1) x: 10, 相当于 left: 10px；
										// (2) x: [10, 0.5], 相当于 left: calc(50% + 10px)；
										y: skin.y,				// 相对于父节点坐标y，不填为居中
										// (1) y: 10，相当于 top: 10px；
										// (2) y: [10, 0.5]，相当于 top: calc(50% + 10px)；
										scale: skin.scale,		// 缩放
										angle: skin.angle,		// 角度
										hideSlots: skin.hideSlots,	// 隐藏不需要的部件，想知道具体部件名称请使用SpineAltasSplit工具查看
										clipSlots: skin.clipSlots,	// 剪掉超出头的部件，仅针对露头动皮，其他勿用
									}, i == 1);

									this.$dynamicWrap.style.backgroundImage = 'url("' + extensionPath + 'assets/dynamic/' + skin.background + '")';
									if (!increased) {
										increased = true;
										decadeUI.CUR_DYNAMIC++;
									}
								}
							}
				
				
							/*-----------------分割线-----------------*/
						/*-----------------分割线-----------------*/
						
							var result = this._super.init.apply(this, arguments);
							
							return result;
						};
						Player.uninit = function () {
							//十周年框框的函数
					if(window.doubleKuang) window.doubleKuang(this,true);
							if (this.$jieMark) {
								this.$jieMark.remove();
								this.$jieMark.undefined;
							}
							this.stopDynamic();
					this.doubleAvatar = false;
					this.node.campWrap.dataset.camp = null;
					this.node.campWrap.node.campName.innerHTML = '';
					this.node.campWrap.node.campName.style.backgroundImage = '';
					this.node.name2.innerHTML = '';
					
					this.expandedSlots = {};
					this.disabledSlots = {};
					this.$syncDisable();
					if (this.isDisabledJudge()) {
						game.broadcastAll(function(player) {
							player.storage._disableJudge = false;
							for (var i = 0; i < player.node.judges.childNodes.length; i++) {
								if (player.node.judges.childNodes[i].name == 'disable_judge') {
									player.node.judges.removeChild(player.node.judges.childNodes[i]);
									break;
								}
							}
						}, this);
					}
					//修复护甲不消失的bug
					var hujiat=this.node.hpWrap.querySelector('.hujia');
					if(hujiat) hujiat.remove();
					this.node.avatar.hide();
					this.node.count.hide();
					if (this.node.wuxing) {
						this.node.wuxing.hide();
					}
					if (this.node.name_seat) {
						this.node.name_seat.remove();
						this.node.name_seat = undefined;
					}
					
					if (this.storage.nohp) this.node.hp.show();
					this.classList.remove('unseen');
					this.classList.remove('unseen2');
					this.name = undefined;
					this.name1 = undefined;
					this.sex = undefined;
					this.group = undefined;
					this.hp = undefined;
					this.maxHp = undefined;
					this.hujia = undefined;
					
					this.clearSkills(true);
					this.node.identity.style.backgroundColor = '';
					this.node.intro.innerHTML = '';
					this.node.name.innerHTML = '';
					this.node.hp.innerHTML = '';
					this.node.count.innerHTML = '0';
					if (this.name2) {
						this.singleHp = undefined;
						this.node.avatar2.hide();
						this.node.name2.innerHTML = '';
						this.classList.remove('fullskin2');
						this.name2 = undefined;
					}
					
					for (var mark in this.marks) this.marks[mark].remove();
					ui.updatem(this);

					this.skipList = [];
					this.skills = this.skills.contains('cangji_yozuru') ? ['cangji_yozuru'] : [];
					this.initedSkills = [];
					this.additionalSkills = {};
					this.disabledSkills = {};
					this.hiddenSkills = [];
					this.awakenedSkills = [];
					this.forbiddenSkills = {};
					this.phaseNumber = 0;
					this.invisibleSkills = [];
					this.stat = [{
						card: {},
						skill: {}
					}];
					this.tempSkills = {};
					this.storage = {};
					this.marks = {};
					this.ai = {
						friend: [],
						enemy: [],
						neutral: []
					};
					this.fixShadow();

					return this;
				};
				Player.update = function(count, hp, hpMax, hujia){
					this.fixShadow();
					if (!_status.video) {
						if (this.hp >= this.maxHp) this.hp = this.maxHp;
						count = this.countCards('h');
						hp = this.hp;
						hpMax = this.maxHp;
                        var hujiat=this.node.hpWrap.querySelector('.hujia');
						game.broadcast(function(player, hp, maxHp, hujia) {
							player.hp = hp;
							player.maxHp = maxHp;
							player.hujia = hujia;
							player.update();
						}, this, hp, hpMax, this.hujia);
						/*
						if (this.hujia) {
							this.markSkill('ghujia');
						} else {
							this.unmarkSkill('ghujia');
						}
                        */ 
                        //修复死亡护甲不消失的bug
                        if (this.hujia>0&&this.isAlive()) {
                            //if(lib.config.extension_十周年UI_newDecadeStyle=='on') this.markSkill('ghujia');
						    //else{
						        if(!hujiat){
						            /*
						    	    if(lib.config.extension_十周年UI_newDecadeStyle=='on'){
								    	var hpWrapx = decadeUI.element.create('hp-wrapx');
									    //this.insertBefore(hpWrapx, this.node.hp);
								    	this.node.hpWrap = hpWrapx;
								    	hpWrapx.appendChild(this.node.hp);
						        	}
						    	    */
				                    hujiat=ui.create.div('.hujia');
			                        this.node.hpWrap.appendChild(hujiat);	 
				                }
				                hujiat.innerText=this.hujia;
				            //}
                        }
                        else{
                            /*
						    if(lib.config.extension_十周年UI_newDecadeStyle=='on'){
								var hpWrap = decadeUI.element.create('hp-wrap');
								//this.insertBefore(hpWrap, this.node.hp);
								this.node.hpWrap = hpWrap;
								hpWrap.appendChild(this.node.hp);
						    }
						    */
                            //if(lib.config.extension_十周年UI_newDecadeStyle=='on') this.unmarkSkill('ghujia');
                        	/*else*/ if(hujiat) hujiat.remove();
                        }
						
						game.addVideo('update', this, [count, hp, hpMax, this.hujia]);
					} else {
						// 虽然上面的 game.addVideo 提供了好几个参数，但是没啥用，因为videoContent里的update缺只给了1个参数。
                                if (!count)
                                    count = this.countCards('h');
                                
                                hp = this.hp;
                                hpMax = this.maxHp;     
                            }
                            
							var hpNode = this.node.hp;
							/*if (!this.storage.nohp) {
								if (hpMax > 5) {
									var hpText = (isNaN(hp) ? '×' : (hp == Infinity ? '∞' : hp));
									var hpMaxText = (isNaN(hpMax) ? '×' : (hpMax == Infinity ? '∞' : hpMax));
									if (!hpNode.textstyle) {
										hpNode.innerHTML = '';
										hpNode.textstyle = true;
										hpNode.classList.add('textstyle');
										hpNode.$hpText = hpNode.appendChild(document.createTextNode(hpText));
										hpNode.$br1 = hpNode.appendChild(document.createElement('br'));
										hpNode.$slash = hpNode.appendChild(document.createTextNode('/'));
										hpNode.$br2 = hpNode.appendChild(document.createElement('br'));
										hpNode.$hpMaxText = hpNode.appendChild(document.createTextNode(hpMaxText));
										hpNode.$div = hpNode.appendChild(document.createElement('div'));
									} else {
										hpNode.$hpText.textContent = hpText;
										hpNode.$hpMaxText.textContent = hpMaxText;
									}
									
									if (hp == 0)
										hpNode.lastChild.classList.add('lost');
								} else {
									if (hpNode.textstyle) {
										hpNode.innerHTML = '';
										hpNode.classList.remove('textstyle');
									}
									
									while (hpMax > hpNode.childNodes.length)
										ui.create.div(hpNode);
									while (hpMax < hpNode.childNodes.length)
										hpNode.lastChild.remove();
									
									for (var i = 0; i < hpMax; i++) {
										if (i < hp) {
											hpNode.childNodes[i].classList.remove('lost');
										} else {
											hpNode.childNodes[i].classList.add('lost');
										}
									}
								}
								
								if (hpNode.classList.contains('room')) {
									hpNode.dataset.condition = 'high';
								} else if (hp == 0) {
									hpNode.dataset.condition = '';
								} else if (hp > Math.round(hpMax / 2) || hp === hpMax) {
									hpNode.dataset.condition = 'high';
								} else if (hp > Math.floor(hpMax / 3)) {
									hpNode.dataset.condition = 'mid';
								} else {
									hpNode.dataset.condition = 'low';
								}
							}*/
							
						/*-----------------分割线-----------------*/
									if (!this.storage.nohp) {
                                if (hpMax > 5||(this.hujia&&hpMax>3)) {
							hpNode.innerHTML = (isNaN(hp) ? '×' : (hp == Infinity ? '∞' : hp)) + '<br>/<br>'
								+ (isNaN(hpMax) ? '×' : (hpMax == Infinity ? '∞' : hpMax)) + '<div></div>';
							if (hp == 0) hpNode.lastChild.classList.add('lost');
							hpNode.classList.add('textstyle');
						}
						else {
							hpNode.innerHTML = '';
							hpNode.classList.remove('textstyle');
							while (hpMax > hpNode.childNodes.length) ui.create.div(hpNode);
							while (Math.max(0,hpMax) < hpNode.childNodes.length) hpNode.lastChild.remove();

							for (var i = 0; i < Math.max(0,hpMax); i++) {
								var index = i;
								if (get.is.newLayout()) {
									index = hpMax - i - 1;
								}
								if (i < hp) {
									hpNode.childNodes[index].classList.remove('lost');
								} else {
									hpNode.childNodes[index].classList.add('lost');
									}
							}
						}
						
						if (hpNode.classList.contains('room')) {
							hpNode.dataset.condition = 'high';
						} else if (hp == 0) {
							hpNode.dataset.condition = '';
						} else if (hp > Math.round(hpMax / 2) || hp === hpMax) {
							hpNode.dataset.condition = 'high';
						} else if (hp > Math.floor(hpMax / 3)) {
							hpNode.dataset.condition = 'mid';
						} else {
							hpNode.dataset.condition = 'low';
						}
					}
									/*-----------------分割线-----------------*/

					
					this.node.count.innerHTML = count;
					if (count >= 10) {
						this.node.count.dataset.condition = 'low';
					} else if (count > 5) {
						this.node.count.dataset.condition = 'higher';
					} else if (count > 2) {
						this.node.count.dataset.condition = 'high';
					} else if (count > 0) {
						this.node.count.dataset.condition = 'mid';
					} else {
						this.node.count.dataset.condition = 'none';
					}
					
					this.dataset.maxHp = hpMax;
					this.updateMarks();
					
					if (this.updates) {
						for (var i = 0; i < lib.element.player.updates.length; i++) {
							lib.element.player.updates[i](this);
						}
					}
					
					return this;
				};
				Player.chooseToRespond = function () {
					var next = game.createEvent('chooseToRespond');
					next.player = this;
					for (var i = 0; i < arguments.length; i++) {
						if (typeof arguments[i] == 'number') {
							next.selectCard = [arguments[i], arguments[i]];
						} else if (get.itemtype(arguments[i]) == 'select') {
							next.selectCard = arguments[i];
						} else if (typeof arguments[i] == 'boolean') {
							next.forced = arguments[i];
						} else if (get.itemtype(arguments[i]) == 'position') {
							next.position = arguments[i];
						} else if (typeof arguments[i] == 'function') {
							if (next.filterCard) next.ai = arguments[i];
							else next.filterCard = arguments[i];
						} else if (typeof arguments[i] == 'object' && arguments[i]) {
							next.filter = arguments[i];
							next.filterCard = get.filter(arguments[i]);
							
						} else if (arguments[i] == 'nosource') {
							next.nosource = true;
						} else if (typeof arguments[i] == 'string') {
							next.prompt = arguments[i];
						}
					}
					if (next.filterCard == undefined) next.filterCard = lib.filter.all;
					if (next.selectCard == undefined) next.selectCard = [1, 1];
					if (next.source == undefined && !next.nosource) next.source = _status.event.player;
					if (next.ai == undefined) next.ai = get.unuseful2;
					next.position = 'hs';
					if (next.ai2 == undefined) next.ai2 = (() => 1);
					next.setContent('chooseToRespond');
					next._args = Array.from(arguments);
					return next;
				};
				Player.directgain = function (cards, broadcast, gaintag) {
					var player = this;
					var handcards = player.node.handcards1;
					var fragment = document.createDocumentFragment();

					var card;
					for (var i = 0; i < cards.length; i++) {
						card = cards[i];
						card.fix();
						if (card.parentNode == handcards) {
							cards.splice(i--, 1);
							continue;
						}
						
						if (gaintag)
							card.addGaintag(gaintag);

							fragment.insertBefore(card, fragment.firstChild);
					}
					
					if (player == game.me) {
						dui.layoutHandDraws(cards.reverse());
						dui.queueNextFrameTick(dui.layoutHand, dui);
					}
			
					var s = player.getCards('s');
					if (s.length)
								handcards.insertBefore(fragment, s[0]);
					else
						handcards.appendChild(fragment);

					if (!_status.video) {
						game.addVideo('directgain', this, get.cardsInfo(cards));
						this.update();
					}
					
					if (broadcast !== false) 
						game.broadcast(function(player, cards) {
							player.directgain(cards);
						}, this, cards);
					return this;
				};
				Player.useCard = function () {
						var event = this._super.useCard.apply(this, arguments);
						Object.defineProperties(event, {
					oncard:{
							get:function() {
								return this._oncard;
							},
							set:function(value) {
								this._oncard2 = value;
							}
						}
					});
					event.finish = function () {
						this.finished = true;
						var targets = this.targets;
						for (var i = 0; i < targets.length; i++) {
							targets[i].classList.remove('target');
						}
					};
					event._oncard = function (card, player) {
						var player = this.player;
						var targets = this.targets;
						for (var i = 0; i < targets.length; i++) {
							if (targets[i] != player)
								targets[i].classList.add('target');
						}
						
						
						if (this._oncard2) this._oncard2(card, player);
					}
					return event;
				};
				Player.lose = function () {
					var next = this._super.lose.apply(this, arguments);
					var event = _status.event;
					if (event.name == 'useCard') {
						next.animate = true;
						next.blameEvent = event;
						event.throw = false;
					}
					
					return next;
				};
				Player.line = function (target, config) {
					if (get.itemtype(target) == 'players') {
						for (var i = 0; i < target.length; i++) {
							this.line(target[i], config);
						}
					} else if (get.itemtype(target) == 'player') {
						if (target == this)
							return;
						
						var player = this;
						game.broadcast(function(player, target, config) {
							player.line(target, config);
						}, player, target, config);
						game.addVideo('line', player, [target.dataset.position, config]);
						//修改指示线屏幕居中触发开始
						player.checkBoundsCache(true);
						target.checkBoundsCache(true);
						var x1, y1;
						var x2, y2;
						var hand = dui.boundsCaches.hand;
						var targetRect = target.getBoundingClientRect();
						var playerRect = player.getBoundingClientRect();
						if (player == game.me) {
							hand.check();
							//x1 = hand.x + hand.width / 2;
							//y1 = hand.y;
							x1 = playerRect.right / 2;
							y1 = hand.y;
						} else {
							//x1 = player.cacheLeft + player.cacheWidth / 2;
							//y1 = player.cacheTop + player.cacheHeight / 2;
							x1 = playerRect.x + playerRect.width / 2;
							y1 = playerRect.y + playerRect.height / 2;
						}
						
						if (target == game.me) {
							hand.check();
							//x2 = hand.x + hand.width / 2;
							//y2 = hand.y;
							x2 = targetRect.right / 2;
							y2 = hand.y;
						} else {
							//x2 = target.cacheLeft + target.cacheWidth / 2;
							//y2 = target.cacheTop + target.cacheHeight / 2;
							x2 = targetRect.x + targetRect.width / 2;
							y2 = targetRect.y + targetRect.height / 2;
						}
						//修改指示线屏幕居中触发结束
						//新增两个player，target参数，方便祖安武将指示线调用
						game.linexy([x1, y1, x2, y2], config, true, player, target);
					}
				};
				Player.lineInfo = function (target, config) {
				    if (get.itemtype(target) != 'player') return false;
					if (target == this)
						return false;
					
					var player = this;
					game.broadcast(function(player, target, config) {
						player.line(target, config);
					}, player, target, config);
					game.addVideo('line', player, [target.dataset.position, config]);
					//修改指示线屏幕居中触发开始
					player.checkBoundsCache(true);
					target.checkBoundsCache(true);
					var x1, y1;
					var x2, y2;
					var hand = dui.boundsCaches.hand;
					var targetRect = target.getBoundingClientRect();
					var playerRect = player.getBoundingClientRect();
					if (player == game.me) {
						hand.check();
						//x1 = hand.x + hand.width / 2;
						//y1 = hand.y;
						x1 = playerRect.right / 2;
						y1 = hand.y;
					} else {
						//x1 = player.cacheLeft + player.cacheWidth / 2;
						//y1 = player.cacheTop + player.cacheHeight / 2;
						x1 = playerRect.x + playerRect.width / 2;
						y1 = playerRect.y + playerRect.height / 2;
					}
					
					if (target == game.me) {
						hand.check();
						//x2 = hand.x + hand.width / 2;
						//y2 = hand.y;
						x2 = targetRect.right / 2;
						y2 = hand.y;
					} else {
						//x2 = target.cacheLeft + target.cacheWidth / 2;
						//y2 = target.cacheTop + target.cacheHeight / 2;
						x2 = targetRect.x + targetRect.width / 2;
						y2 = targetRect.y + targetRect.height / 2;
					}
					//修改指示线屏幕居中触发结束
					//新增两个player，target参数，方便祖安武将指示线调用
					return [[x1, y1, x2, y2], config, true, player, target];
				};
				Player.checkBoundsCache = function (forceUpdate) {
					var update;
					var refer = dui.boundsCaches.arena;
					refer.check();
					
					if (this.cacheReferW != refer.width || 
						this.cacheReferH != refer.height || 
						this.cachePosition != this.dataset.position)
						update = true;
					
					this.cacheReferW = refer.width;
					this.cacheReferH = refer.height;
					this.cachePosition = this.dataset.position;
					if (this.cacheLeft == null)
						update = true;
						
					if (update || forceUpdate) {
						this.cacheLeft = this.offsetLeft;
						this.cacheTop = this.offsetTop;
						this.cacheWidth = this.offsetWidth;
						this.cacheHeight = this.offsetHeight;
					}
				};
				Player.queueCssAnimation = function (animation) {
					var current = this.style.animation;
					var animations = this._cssanimations;
					if (animations == undefined) {
						animations = [];
						this._cssanimations = animations;
						this.addEventListener('animationend', function(e){
							if (this.style.animationName != e.animationName)
								return;
							
							var current = this.style.animation;
							var animations = this._cssanimations;
							while (animations.length) {
								this.style.animation = animations.shift();
								if (this.style.animation != current)
									return;
								
								animations.current = this.style.animation;
							}
							
							animations.current = '';
							this.style.animation = '';
						});
					}
					
					if (animations.current || animations.length) {
						animations.push(animation);
						return;
					}
					
					animations.current = animation;
					this.style.animation = animation;
				};
				Player.$draw = function (num, init, config) {
					if (game.chess) 
						return this._super.$draw.call(this, num, init, config);
					
					if (init !== false && init !== 'nobroadcast'){
						game.broadcast(function(player, num, init, config){
							player.$draw(num, init, config);
						}, this, num, init, config);
					}
					
					var cards;
					var isDrawCard;
					if (get.itemtype(num) == 'cards') {
						cards = num.concat();
						isDrawCard = true;
					} else if (get.itemtype(num) == 'card') {
						cards = [num];
						isDrawCard = true;
					} else if (typeof num == 'number') {
						cards = new Array(num);
					} else {
						cards = new Array(1);
					}
					
					if (init !== false){
						if (isDrawCard){
							game.addVideo('drawCard', this, get.cardsInfo(cards));
						} else {
							game.addVideo('draw', this, num);
						}
					}				
					
					if (game.me == this && !isDrawCard)
						return;
					
					var fragment = document.createDocumentFragment();
					var card;
					for (var i = 0; i < cards.length; i++){
						card = cards[i];
						if (card == null)
							card = dui.element.create('card thrown drawingcard');
						else
							card = card.copy('thrown', 'drawingcard', false);
						
						card.fixed = true;
						cards[i] = card;
						fragment.appendChild(card);
					}
					
					var player = this;
					dui.layoutDrawCards(cards, player, true);
					ui.arena.appendChild(fragment);
					dui.queueNextFrameTick(function(){
						dui.layoutDrawCards(cards, player);
						dui.delayRemoveCards(cards, 460, 220);
					});
				};
				Player.$give = function (cards, target, log, record) {
					var itemtype;
					var duiMod = (cards.duiMod && game.me == target);
					if (typeof cards == 'number') {
						itemtype = 'number';
						cards = new Array(cards);
					} else {
						itemtype = get.itemtype(cards);
						if (itemtype == 'cards') {
							cards = cards.concat();
						} else if (itemtype == 'card') {
							cards = [cards];
						} else {
							return;
						}
					}
					
					if (record !== false) {
						var cards2 = cards;
						if (itemtype == 'number') {
							cards2 = cards.length;
							game.addVideo('give', this, [cards2, target.dataset.position]);
						} else {
							game.addVideo('giveCard', this, [get.cardsInfo(cards2), target.dataset.position]);
						}
						
						game.broadcast(function(source, cards2, target, record) {
							source.$give(cards2, target, false, record);
						}, this, cards2, target, record);
					}
					
					if (log != false) {
						if (itemtype == 'number')
							game.log(target, '从', this, '获得了' + get.cnNumber(cards.length) + '张牌');
						else
							game.log(target, '从', this, '获得了', cards);
					}
					
					if (this.$givemod) {
						this.$givemod(cards, target);
						return;
					}
					
					if (duiMod)
						return;
					
					var card;
					var hand = dui.boundsCaches.hand;
					hand.check();
					
					var draws = [];
					var player = this;
					var fragment = document.createDocumentFragment();
					for (var i = 0; i < cards.length; i++) {
						card = cards[i];
						if (card) {
							var cp = card.copy('card', 'thrown', 'gainingcard', false);
							var hs = player == game.me;
							if (hs) {
								if (card.throwWith)
									hs = card.throwWith == 'h' || card.throwWith == 's';
								else
									hs = card.parentNode == player.node.handcards1;
							}
							
							if (hs) {
								cp.tx = Math.round(hand.x + card.tx);
								cp.ty = Math.round(hand.y + 30 + card.ty);
								cp.scaled = true;
								cp.style.transform = 'translate(' + cp.tx + 'px,' + cp.ty + 'px) scale(' + hand.cardScale + ')';
							} else {
								draws.push(cp);
							}
							card = cp;
						} else {
							card = dui.element.create('card thrown gainingcard');
							draws.push(card);
						}
						
						cards[i] = card;
						cards[i].fixed = true;
						fragment.appendChild(cards[i]);
					}
					
					if (draws.length)
						dui.layoutDrawCards(draws, player);
					
					ui.arena.appendChild(fragment);
					dui.queueNextFrameTick(function(){
						dui.layoutDrawCards(cards, target);
						dui.delayRemoveCards(cards, 460, 220);
					});
				};
				Player.$gain2 = function (cards, log){
					var type = get.itemtype(cards);
					if (type != 'cards') {
						if (type != 'card')
							return;
						
						type = 'cards';
						cards = [cards];
					}
					
					if (log === true)
						game.log(this, '获得了', cards);
					
					game.broadcast(function(player, cards){
						player.$gain2(cards);
					}, this, cards);
					
					var gains = [];
					var draws = [];
					
					var card;
					var clone;
					for (var i = 0; i < cards.length; i++) {
						clone = cards[i].clone;
						card = cards[i].copy('thrown', 'gainingcard');
						card.fixed = true;
						if (clone && clone.parentNode == ui.arena) {
							card.scaled = true;
							card.style.transform = clone.style.transform;
							gains.push(card);
						} else {
							draws.push(card);
						}
					}
					
					if (gains.length)
						game.addVideo('gain2', this, get.cardsInfo(gains));
					
					if (draws.length)
						game.addVideo('drawCard', this, get.cardsInfo(draws));
					
					if (cards.duiMod && this == game.me)
						return;
					
					cards = gains.concat(draws);
					dui.layoutDrawCards(draws, this, true);
					
					var player = this;
					var fragment = document.createDocumentFragment();
					for (var i = 0; i < cards.length; i++)
						fragment.appendChild(cards[i]);
					
					ui.arena.appendChild(fragment);
					dui.queueNextFrameTick(function(){
						dui.layoutDrawCards(cards, player);
						dui.delayRemoveCards(cards, 460, 220);
					});
				};
				/*Player.$damage = function (source) {
					if (get.itemtype(source) == 'player') {
						game.addVideo('damage', this, source.dataset.position);
					} else {
						game.addVideo('damage', this);
					}
					game.broadcast(function(player, source){
						player.$damage(source);
					}, this, source);
					
					this.queueCssAnimation('player-hurt 0.3s');
				};*///修复标记补充的刀剑斧动画延迟
				Player.$damage = function (source) {
                    var me = this;
                    var animation = function() {
                        if (get.itemtype(source) == 'player') {
                            game.addVideo('damage', me, source.dataset.position);
                        } else {
                            game.addVideo('damage', me);
                        }
                        game.broadcast(function(player, source){
                            player.$damage(source);
                        }, me, source);
                        
                        me.queueCssAnimation('player-hurt 0.3s');
                    }
                    if(me.$damageDelay) {
                        setTimeout(function() {
                            animation();
                        }, 400);
                    }else {
                        animation();
                    }
                };
				Player.$throw = function(cards, time, record, nosource) {
					var itemtype;
					var card;//代码来自蒸套装
					//	console.log(cards)
					var duiMod = (cards.duiMod && game.me == this && !nosource);
					if (typeof cards == 'number') {
						itemtype = 'number';
						cards = new Array(cards);
					} else {
						itemtype = get.itemtype(cards);
						if (itemtype == 'cards') {
							cards = cards.concat();
						} else if (itemtype == 'card') {
							cards = [cards];
						} else {
							//	return;
							var evt = _status.event;
							if (evt && evt.card && evt.cards === cards) {
								var card = ui.create.card().init([
									evt.card.suit,
									evt.card.number,
									evt.card.name,
									evt.card.nature,
								]);
								if (evt.card.suit == 'none') card.node.suitnum.style.display = 'none';
								card.dataset.virtualCard = true;
								cards = [card];
								card.virtualMark = ui.create.div('.virtualMark', card);
							}
						}
					}
					var clone;
					var player = this;
					var hand = dui.boundsCaches.hand;
					hand.check();
					let cardk = _status.event.parent.card;
					for (var i = 0; i < cards.length; i++) {
						card = cards[i];
						if (card) {
							//这个地方是卡牌启动函数，从这个地方的参数位置启动)
							//清除打出去的牌的横tag，以免进入弃牌堆里有tag，洗牌后tag跟着牌一起回来
							if (card._tempName) card._tempName.remove()
							//如果没有bianhua（主动）和bianhua2（被动））且没有cardk或者有cardk但card和cardk完全相同 
							if (card.bianhua != true && card.bianhua2 != true && (!cardk || (card.name == cardk.name && card.nature == cardk.nature && card.number == cardk.number && card.suit == cardk.suit))) clone = card.copy('thrown');
							//否则的话如果此时是usecard事件和respond事件就从克隆卡牌变为创建新卡牌
							else if (_status.event.parent.name == 'useCard' || _status.event.parent.name == 'respond') {
								clone = ui.create.card().init([
									_status.event.parent.card.suit,
									_status.event.parent.card.number,
									_status.event.parent.card.name,
									_status.event.parent.card.nature,
								]);
								clone.classList.add('thrown')
								//转标记
								clone._tempNamed = ui.create.div('.temp-name', clone)
								clone._tempNamed.innerHTML = '<div style="width:33px; height:31px; left:71px; top:5px; position:absolute; background-image: url(' + lib.assetURL + 'extension/十周年UI/image/vcard/zhuan.png);background-size: 100% 100%;"></div>';
								//无色有点数
								if (cardk.suit == 'none' && cardk.number) clone.querySelector('.suit-num').querySelectorAll('span.suit')[0].innerHTML = "<img src='" + lib.assetURL + "extension/十周年UI/image/vcard/none.png" + "' style='position:relative;width:20px;height:35px;bottom:0px;left:3px;'/>";
								//颜色变化
								//无点数且大于1
								else if (get.color(cardk) == 'none' && cardk.cards && cardk.cards.length > 1) clone.getElementsByClassName("suit-num")[0].innerHTML = "<img src='" + lib.assetURL + "extension/十周年UI/image/vcard/none.png" + "' style='position:relative;width:20px;height:35px;bottom:0px;left:3px;'/>";
								else if (get.color(cardk) == 'red' && cardk.cards && cardk.cards.length > 1) clone.getElementsByClassName("suit-num")[0].innerHTML = "<img src='" + lib.assetURL + "extension/十周年UI/image/vcard/red.png" + "' style='position:relative;width:20px;height:35px;bottom:0px;left:3px;'/>";
								else if (get.color(cardk) == 'black' && cardk.cards && cardk.cards.length > 1) clone.getElementsByClassName("suit-num")[0].innerHTML = "<img src='" + lib.assetURL + "extension/十周年UI/image/vcard/black.png" + "' style='position:relative;width:20px;height:35px;bottom:0px;left:3px;'/>";
								//		decadeUI.animation.cap.playSpineTo(clone, 'kapaizhuanhuan', {speed: 0.7},);			
							} else clone = card.copy('thrown');
							if (duiMod && (card.throwWith == 'h' || card.throwWith == 's') || (_status.event.name == 'useSkill' && player == game.me)) {
								clone.tx = Math.round(hand.x + card.tx);
								if (_status.event.parent && _status.event.parent.name != 'discard') clone.tx -= 60 * i;
								clone.ty = Math.round(hand.y + 30 + card.ty);
								//	console.log(hand)
								clone.scaled = true;
								clone.throwordered = true;
								clone.style.transform = 'translate(' + clone.tx + 'px,' + clone.ty + 'px) scale(' + hand.cardScale + ')';
							} else if (card.dataset.virtualCard && player == game.me) {
								clone.tx = Math.round(hand.width * 0.5);
								clone.ty = Math.round(hand.y + 30);
								clone.scaled = true;
								clone.throwordered = true;
								clone.style.transform = 'translate(' + clone.tx + 'px,' + clone.ty + 'px) scale(' + hand.cardScale + ')';
							}
							card = clone;
				} else {
							card = dui.element.create('card infohidden infoflip');
							card.moveTo = lib.element.card.moveTo;
							card.moveDelete = lib.element.card.moveDelete;
						}
						
						cards[i] = card;
					}
					
					if (record !== false) {
						if (record !== 'nobroadcast') {
							game.broadcast(function(player, cards, time, record, nosource) {
								player.$throw(cards, time, record, nosource);
							}, this, cards, 0, record, nosource);
						}
						
						game.addVideo('throw', this, [get.cardsInfo(cards), 0, nosource]);
					}
					
					if (duiMod && cards.length > 2) {
						cards.sort(function(a, b){
							if (a.tx == undefined && b.tx == undefined)
								return 0;
							
							if (a.tx == undefined)
								return duicfg.rightLayout ? -1 : 1;
							
							if (b.tx == undefined)
								return duicfg.rightLayout ? 1 : -1;
							
							return b.tx - a.tx;
						});
					}
					
					for (var i = 0; i < cards.length; i++)
						player.$throwordered2(cards[i], nosource);
					
					if (game.chess)
						this.chessFocus();
					
					return cards[cards.length - 1];
				};
				Player.$throwordered2 = function(card, nosource) {
					if (_status.connectMode)
						ui.todiscard = [];
					
					if (card.throwordered == undefined) {
						var x, y;
						var bounds = dui.boundsCaches.arena;
						if (!bounds.updated)
							bounds.update();
						
						this.checkBoundsCache();
						if (nosource){
							x = ((bounds.width - bounds.cardWidth) / 2 - bounds.width * 0.08);
							y = ((bounds.height - bounds.cardHeight) / 2);
						} else {
							x = ((this.cacheWidth - bounds.cardWidth) / 2 + this.cacheLeft);
							y = ((this.cacheHeight - bounds.cardHeight) / 2 + this.cacheTop);
						}
						
						x = Math.round(x);
						y = Math.round(y);
						
						card.tx = x;
						card.ty = y;
						card.scaled = true;
						card.classList.add('thrown');
						card.style.transform = 'translate(' + x + 'px, ' + y + 'px)' + 'scale(' + bounds.cardScale + ')';
					} else {
						card.throwordered = undefined;
					}
					
					if (card.fixed)
						return ui.arena.appendChild(card);
						
					var before;
					for (var i = 0; i < ui.thrown; i++){
						if (ui.thrown[i].parentNode == ui.arena){
						   before = ui.thrown[i];
						   break;
						}
					}
					
					var tagNode = card.querySelector('.used-info');
					if (tagNode == null)
						tagNode = card.appendChild(dui.element.create('used-info'));
					
					card.$usedtag = tagNode;
					ui.thrown.unshift(card);
					if (before)
						ui.arena.insertBefore(before, card);
					else
						ui.arena.appendChild(card);
					
					dui.tryAddPlayerCardUseTag(card, this, _status.event);
					dui.queueNextFrameTick(dui.layoutDiscard, dui);
					return card;
				};
				Player.$phaseJudge = function(card) {
					game.addVideo('phaseJudge', this, get.cardInfo(card));
					this.$throw(card);
					dui.delay(451);
				};
				return Player;
			})({});
			
			var EventContent = (function(EventContent){
				EventContent.changeHp = function () {
					game.getGlobalHistory().changeHp.push(event);
					//changeHujia moved here
					if(num<0&&player.hujia>0&&event.getParent().name=='damage'&&!player.hasSkillTag('nohujia')){
						event.hujia=Math.min(-num,player.hujia);
						event.getParent().hujia=event.hujia;
						event.num+=event.hujia;
						game.log(player,'的护甲抵挡了'+get.cnNumber(event.hujia)+'点伤害');
						player.changeHujia(-event.hujia).type='damage';
					}
					num=event.num;
					player.hp += num;
					if (isNaN(player.hp)) player.hp = 0;
					if (player.hp > player.maxHp) player.hp = player.maxHp;
					player.update();
					if (event.popup !== false) {
						player.$damagepop(num, 'water');
					}
					if (_status.dying.contains(player) && player.hp > 0) {
						_status.dying.remove(player);
						game.broadcast(function(list) {
							_status.dying = list;
						},
						_status.dying);
						var evt = event.getParent('_save');
						if (evt && evt.finish) evt.finish();
						evt = event.getParent('dying');
						if (evt && evt.finish) evt.finish()
					}
					event.trigger('changeHp');
					dui.delay(68);
				};
				EventContent.chooseBool = function () {
					"step 0"
					if (event.isMine()) {
						//手杀进度条
						game.Jindutiaoplayer();
					if (event.frequentSkill && !lib.config.autoskilllist.contains(event.frequentSkill)) {
							ui.click.ok();
							return;
						} else if (event.hsskill && _status.prehidden_skills.contains(event.hsskill)) {
							ui.click.cancel();
							return;
						}
						ui.create.confirm('oc');
						if (event.createDialog && !event.dialog) {
							if (Array.isArray(event.createDialog)) {
								event.dialog = ui.create.dialog.apply(this, event.createDialog);
								if (event.dialogselectx) {
									for (var i = 0; i < event.dialog.buttons.length; i++) {
										event.dialog.buttons[i].classList.add('selectedx');
									}
								}
							}
						}
						if (event.dialog) {
							event.dialog.open();
						} else if (event.prompt !== false) {
							var tipText;
							var handTip = event.handTip = dui.showHandTip();
							if (typeof event.prompt == 'function') {
								tipText = event.prompt(event);
							} else if (typeof event.prompt == 'string') {
								tipText = event.prompt;
							}
							
							if (event.prompt2) {
								if (tipText == null)
									tipText = ''
								
								handTip.setInfomation(event.prompt2);
							}
							
							if (tipText != undefined) {
								event.dialog = handTip;
								tipText = tipText.replace(/<\/?.+?\/?>/g, '');
								//去掉＃适应
								tipText=window.getDecPrompt(tipText);
								handTip.appendText(tipText)
								handTip.strokeText();
								handTip.show();
							} else {
								handTip.close();
							}
						}
						game.pause();
						game.countChoose();
						event.choosing = true;
					} else if (event.isOnline()) {
						event.send();
					} else {
						event.result = 'ai';
					}
					"step 1"
					if (event.result == 'ai') {
						if (event.ai) {
							event.choice = event.ai(event.getParent(), player);
						}
						event.result = {
							bool: event.choice
						};
					}
					_status.imchoosing = false;
					event.choosing = false;
					if (event.dialog) event.dialog.close();
					event.resume();
				};
				EventContent.chooseTarget = function () {
					"step 0"
					if (event.isMine()) {
						if (event.hsskill && !event.forced && _status.prehidden_skills.contains(event.hsskill)) {
							ui.click.cancel();
							return;
						}
						game.check();
						game.pause();
						if (event.createDialog && !event.dialog && Array.isArray(event.createDialog)) {
							event.dialog = ui.create.dialog.apply(this, event.createDialog);
						} else if (event.prompt !== false) {
							var tipText;
							var handTip = event.handTip = dui.showHandTip();
							if (typeof event.prompt == 'function') {
								tipText = event.prompt(event);
							} else if (typeof event.prompt == 'string') {
								tipText = event.prompt;
							} else {
								tipText = '请选择';
								var range = get.select(event.selectTarget);
								if (range[0] == range[1]) 
									tipText += get.cnNumber(range[0]);
								else if (range[1] == Infinity) 
									tipText += '至少' + get.cnNumber(range[0]);
								else 
									tipText += get.cnNumber(range[0]) + '至' + get.cnNumber(range[1]);
								
								tipText += '个目标';
							}
							
							if (event.prompt2) {
								if (tipText == null)
									tipText = ''
								
								handTip.setInfomation(event.prompt2);
							}
							
							if (tipText != undefined) {
								event.dialog = handTip;
								tipText = tipText.replace(/<\/?.+?\/?>/g, '');
								//去掉＃适应
								tipText=window.getDecPrompt(tipText);
								handTip.appendText(tipText);
								if (event.promptbar != 'none') {
									event.promptbar = handTip.appendText(' 0 - ' + get.select(event.selectTarget)[1]);
									event.promptbar.sels = 0;
									event.promptbar.reqs = get.numStr(get.select(event.selectTarget)[1], 'target');
									event.custom.add.target = function() {
										var handTip = _status.event.dialog;
										var promptbar = _status.event.promptbar;
										if (promptbar.sels == ui.selected.cards.length)
											return;
										
										promptbar.sels = ui.selected.targets.length;
										promptbar.textContent = ' ' + promptbar.sels + ' - ' + promptbar.reqs;
										handTip.strokeText();
									}
								}
								handTip.strokeText();
								handTip.show();
							} else {
								handTip.close();
							}
						} else if (get.itemtype(event.dialog) == 'dialog') {
							event.dialog.open();
						}
					} else if (event.isOnline()) {
						event.send();
					} else {
						event.result = 'ai';
					}
					"step 1"
					if (event.result == 'ai') {
						game.check();
						if ((ai.basic.chooseTarget(event.ai) || forced) && (!event.filterOk || event.filterOk())) {
							ui.click.ok();
						} else {
							ui.click.cancel();
						}
					}
					if (event.result.bool && event.animate !== false) {
						for (var i = 0; i < event.result.targets.length; i++) {
							event.result.targets[i].animate('target');
						}
					}
					if (event.dialog) event.dialog.close();
					event.resume();
					"step 2"
					if (event.onresult) {
						event.onresult(event.result);
					}
					if (event.result.bool && event.autodelay && !event.isMine()) {
						if (typeof event.autodelay == 'number') {
							game.delayx(event.autodelay);
						} else {
							game.delayx();
						}
					}
				};
				EventContent.chooseToDiscard = function () {
					"step 0"
					if (event.autochoose()) {
						event.result = {
							bool: true,
							autochoose: true,
							cards: player.getCards(event.position),
							rawcards: player.getCards(event.position),
						}
						for (var i = 0; i < event.result.cards.length; i++) {
							if (!lib.filter.cardDiscardable(event.result.cards[i], player, event)) {
								event.result.cards.splice(i--, 1);
							}
						}
					} else {
						if (game.modeSwapPlayer && !_status.auto && player.isUnderControl()) {
							game.modeSwapPlayer(player);
						}
						event.rangecards = player.getCards(event.position);
						for (var i = 0; i < event.rangecards.length; i++) {
							if (lib.filter.cardDiscardable(event.rangecards[i], player, event)) {
								event.rangecards.splice(i--, 1);
							} else {
								event.rangecards[i].uncheck('chooseToDiscard');
							}
						}
						var range = get.select(event.selectCard);
						game.check();
						if (event.isMine()) {
							if (event.hsskill && !event.forced && _status.prehidden_skills.contains(event.hsskill)) {
								ui.click.cancel();
								return;
							}
							game.pause();
							if (range[1] > 1 && typeof event.selectCard != 'function') {
								event.promptdiscard = ui.create.control('提示', function () {
									//提示必须修改，在选中假牌时自动转为真牌（代码来自蒸套装）
									ai.basic.chooseCard(event.ai);
									if (_status.event.custom.add.card) {
										_status.event.custom.add.card();
									}
									for (var i = 0; i < ui.selected.cards.length; i++) {

										ui.selected.cards[i].updateTransform(true);
										let cardf = ui.selected.cards[i];
										let cardt = cardf.truecard;
										if (cardt) {
											ui.selected.cards.remove(cardf)
											ui.selected.cards[i] = cardt;
											ui.selected.cards[i].updateTransform(true);
										}

									}
								});
								event.promptdiscard.id = 'aitips';
							}
					
							if (Array.isArray(event.dialog)) {
								event.dialog = ui.create.dialog.apply(this, event.dialog);
								event.dialog.open();
								event.dialog.classList.add('noselect');
							} else if (event.prompt !== false) {
								var tipText;
								var handTip = event.handTip = dui.showHandTip();
								if (typeof event.prompt == 'function') {
									tipText = event.prompt(event);
								} else if (typeof event.prompt == 'string') {
									tipText = event.prompt;
								} else {
									tipText = '请弃置';
									if (range[0] == range[1]) 
										tipText += get.cnNumber(range[0]);
									else if (range[1] == Infinity) 
										tipText += '至少' + get.cnNumber(range[0]);
									else 
										tipText += get.cnNumber(range[0]) + '至' + get.cnNumber(range[1]);
									
									tipText += '张';
									if (event.position == 'h' || event.position == undefined) 
										tipText += '手';
									if (event.position == 'e') 
										tipText += '装备';
									tipText += '牌';
								}
								
								if (event.prompt2) {
									if (tipText == null)
										tipText = ''
									
									handTip.setInfomation(event.prompt2);
								}
								
								if (tipText != undefined) {
									event.dialog = handTip;
									tipText = tipText.replace(/<\/?.+?\/?>/g, '');
								//去掉＃适应
								tipText=window.getDecPrompt(tipText);
									handTip.appendText(tipText);
									if (Array.isArray(event.selectCard)) {
										event.promptbar = handTip.appendText(' 0 - ' + event.selectCard[1]);
										event.promptbar.sels = 0;
										event.promptbar.reqs = get.numStr(event.selectCard[1], 'card');
										event.custom.add.card = function() {
											var handTip = _status.event.dialog;
											var promptbar = _status.event.promptbar;
											if (promptbar.sels == ui.selected.cards.length)
												return;
											
											promptbar.sels = ui.selected.cards.length;
											promptbar.textContent = ' ' + promptbar.sels + ' - ' + promptbar.reqs;
											handTip.strokeText();
										}
									}
									
									handTip.strokeText();
									handTip.show();
								} else {
									handTip.close();
								}
							} else if (get.itemtype(event.dialog) == 'dialog') {
								event.dialog.style.display = '';
								event.dialog.open();
							}
						} else if (event.isOnline()) {
							event.send();
						} else {
							event.result = 'ai';
						}
					}
					"step 1"
					if (event.result == 'ai') {
						game.check();
						if ((ai.basic.chooseCard(event.ai) || forced) && (!event.filterOk || event.filterOk())) {
							ui.click.ok();
						} else if (event.skill) {
							var skill = event.skill;
							ui.click.cancel();
							event._aiexclude.add(skill);
							event.redo();
							game.resume();
						} else {
							ui.click.cancel();
						}
					}
					if (event.rangecards) {
						for (var i = 0; i < event.rangecards.length; i++) {
							event.rangecards[i].recheck('chooseToDiscard');
						}
					}
					"step 2"
					event.resume();
					if (event.promptdiscard) {
						event.promptdiscard.close();
					}
					"step 3"
					if (event.result.bool && event.result.cards && event.result.cards.length && !game.online && event.autodelay && !event.isMine()) {
						if (typeof event.autodelay == 'number') {
							game.delayx(event.autodelay);
						} else {
							game.delayx();
						}
					}
					"step 4"
					if (event.logSkill && event.result.bool && !game.online) {
						if (typeof event.logSkill == 'string') {
							player.logSkill(event.logSkill);
						} else if (Array.isArray(event.logSkill)) {
							player.logSkill.apply(player, event.logSkill);
						}
					}
					if (!game.online) {
						if (typeof event.delay == 'boolean') {
							event.done = player.discard(event.result.cards).set('delay', event.delay);
						} else {
							event.done = player.discard(event.result.cards);
						}
						event.done.discarder = player;
					}
					if (event.dialog && event.dialog.close) event.dialog.close();
				};
				EventContent.chooseToRespond = function () {
					"step 0"
					if (event.responded) {
						event.dialog = undefined;
						return;
					}
					var skills = player.getSkills('invisible').concat(lib.skill.global);
					game.expandSkills(skills);
					for (var i = 0; i < skills.length; i++) {
						var info = lib.skill[skills[i]];
						if (info && info.onChooseToRespond) {
							info.onChooseToRespond(event);
						}
					}
					_status.noclearcountdown = true;
					if (!_status.connectMode && lib.config.skip_shan && event.autochoose && event.autochoose()) {
						event.result = {
							bool: false
						};
					} else {
						if (game.modeSwapPlayer && !_status.auto && player.isUnderControl()) {
							game.modeSwapPlayer(player);
						}
						if (event.isMine()) {
							if (event.hsskill && !event.forced && _status.prehidden_skills.contains(event.hsskill)) {
								ui.click.cancel();
								return;
							}
							var ok = game.check();
							if (!ok) {
								game.pause();
								var tipText;
								var handTip = event.handTip = dui.showHandTip();
								if (event.openskilldialog) {
									tipText = event.openskilldialog;
									event.openskilldialog = undefined;
								} else if (event.prompt !== false) {
									if (typeof event.prompt == 'function') {
										tipText = event.prompt(event);
									} else if (typeof event.prompt == 'string') {
										tipText = event.prompt;
									} else {
										tipText = '请打出' + get.cnNumber(event.selectCard[0]) + '张';
										if (event.source) {
											handTip.appendText(get.translation(event.source), 'player');
											handTip.appendText('使用了');
											handTip.appendText(get.translation(event.getParent().name), 'card');
											tipText = '，' + tipText;
										}
										
										if (event.filter && event.filter.name) {
											handTip.appendText(tipText);
											handTip.appendText(get.translation(event.filter.name), 'card');
											tipText = '';
										} else {
											tipText += '牌';
										}
									}
									
									if (event.prompt2) {
										if (tipText == null)
											tipText = ''
										
										handTip.setInfomation(event.prompt2);
									}
								}
								
								if (tipText != undefined) {
									event.dialog = handTip;
									tipText = tipText.replace(/<\/?.+?\/?>/g, '');
								//去掉＃适应
								tipText=window.getDecPrompt(tipText);
									handTip.appendText(tipText)
									handTip.strokeText();
									handTip.show();
								} else {
									handTip.close();
								}
							}
						} else if (event.isOnline()) {
							event.send();
						} else {
							event.result = 'ai';
						}
					}
					"step 1"
					if (event.result == 'ai') {
						var ok = game.check();
						if (ok) {
							ui.click.ok();
                        } else if (ai.basic.chooseCard(event.ai1 || event.ai)) {
                            if (ai.basic.chooseTarget(event.ai2) && (!event.filterOk || event.filterOk())) {
                                ui.click.ok();
                                event._aiexcludeclear = true;
                            } else {
                                if (!event.norestore) {
                                    if (event.skill) {
                                        var skill = event.skill;
                                        ui.click.cancel();
                                        event._aiexclude.add(skill);
                                        var info = get.info(skill);
                                        if (info.sourceSkill) {
                                            event._aiexclude.add(info.sourceSkill);
                                        }
                                    } else {
                                        get.card(true).aiexclude();
                                        game.uncheck();
                                    }
                                    event.redo();
                                    game.resume();
                                } else {
                                    ui.click.cancel();
                                }
                            }
						} else if (event.skill && !event.norestore) {
							var skill = event.skill;
							ui.click.cancel();
							event._aiexclude.add(skill);
							var info = get.info(skill);
							if (info.sourceSkill) {
								event._aiexclude.add(info.sourceSkill);
							}
							event.redo();
							game.resume();
						} else {
							ui.click.cancel();
						}
						if (event.aidelay && event.result && event.result.bool) {
							game.delayx();
						}
					}
					"step 2"
					event.resume();
					if(event.result){
						if(event.result._sendskill){
							lib.skill[event.result._sendskill[0]]=event.result._sendskill[1];
						}
						if(event.result.skill){
							var info=get.info(event.result.skill);
							if(info&&info.chooseButton){
								if(event.dialog&&typeof event.dialog=='object') event.dialog.close();
								var dialog=info.chooseButton.dialog(event,player);
								if(info.chooseButton.chooseControl){
									var next=player.chooseControl(info.chooseButton.chooseControl(event,player));
									if(dialog.direct) next.direct=true;
									if(dialog.forceDirect) next.forceDirect=true;
									next.dialog=dialog;
									next.set('ai',info.chooseButton.check||function(){return 0;});
								}
								else{
									var next=player.chooseButton(dialog);
									if(dialog.direct) next.direct=true;
									if(dialog.forceDirect) next.forceDirect=true;
									next.set('ai',info.chooseButton.check||function(){return 1;});
									next.set('filterButton',info.chooseButton.filter||function(){return true;});
									next.set('selectButton',info.chooseButton.select||1);
								}
								event.buttoned=event.result.skill;
							}
							else if(info&&info.precontent&&!game.online){
								var next=game.createEvent('pre_'+event.result.skill);
								next.setContent(info.precontent);
								next.set('result',event.result);
								next.set('player',player);
							}
						}
					}
					"step 3"
					if (event.buttoned) {
						if (result.bool || result.control && result.control != 'cancel2') {
							var info = get.info(event.buttoned).chooseButton;
							lib.skill[event.buttoned + '_backup'] = info.backup(info.chooseControl ? result: result.links, player);
							lib.skill[event.buttoned + '_backup'].sourceSkill = event.buttoned;
							if (game.online) {
								event._sendskill = [event.buttoned + '_backup', lib.skill[event.buttoned + '_backup']];
							}
							event.backup(event.buttoned + '_backup');
							if (info.prompt) {
								event.openskilldialog = info.prompt(info.chooseControl ? result: result.links, player);
							}
						} else {
							ui.control.animate('nozoom', 100);
							event._aiexclude.add(event.buttoned);
						}
						event.goto(0);
						delete event.buttoned;
					}
					"step 4"
					_status.noclearcountdown = undefined;
					if (event.skillDialog && get.objtype(event.skillDialog) == 'div') {
						event.skillDialog.close();
					}
					if (event.result.bool && !game.online) {
						if (event.result._sendskill) {
							lib.skill[event.result._sendskill[0]] = event.result._sendskill[1];
						}
						var info = get.info(event.result.skill);
						if (event.onresult) {
							event.onresult(event.result);
						}
						if (event.result.skill) {
							if (info.direct && !info.clearTime) {
								_status.noclearcountdown = true;
							}
						}
						if (event.logSkill) {
							if (typeof event.logSkill == 'string') {
								player.logSkill(event.logSkill);
							} else if (Array.isArray(event.logSkill)) {
								player.logSkill.apply(player, event.logSkill);
							}
						}
						if (!event.result.card && event.result.skill) {
							event.result.used = event.result.skill;
							player.useSkill(event.result.skill, event.result.cards, event.result.targets);
						} else {
							if (info && info.prerespond) {
								info.prerespond(event.result, player);
							}
							var next = player.respond(event.result.cards, event.result.card, event.animate, event.result.skill, event.source);
							if (event.result.noanimate) next.animate = false;
							if (event.parent.card && event.parent.type == 'card') {
								next.set('respondTo', [event.parent.player, event.parent.card]);
							}
							if (event.noOrdering) next.noOrdering = true;
						}
					} else if (event._sendskill) {
						event.result._sendskill = event._sendskill;
					}
					if (event.dialog && event.dialog.close) event.dialog.close();
					if (!_status.noclearcountdown) {
						game.stopCountChoose();
					}
				};
				EventContent.chooseToUse = function () {
					"step 0"
					if (event.responded) return;
					if (game.modeSwapPlayer && !_status.auto && player.isUnderControl() && !lib.filter.wuxieSwap(event)) {
						game.modeSwapPlayer(player);
					}
					var skills = player.getSkills('invisible').concat(lib.skill.global);
					game.expandSkills(skills);
					for (var i = 0; i < skills.length; i++) {
						var info = lib.skill[skills[i]];
						if (info && info.onChooseToUse) {
							info.onChooseToUse(event);
						}
					}
					_status.noclearcountdown = true;
					if (event.type == 'phase') {
						if (event.isMine()) {
							event.endButton = ui.create.control('结束回合', 'stayleft',
							function() {
								if (_status.event.skill) {
									ui.click.cancel();
								}
								ui.click.cancel();
							});
							event.fakeforce = true;
						} else {
							if (event.endButton) {
								event.endButton.close();
								delete event.endButton;
							}
							event.fakeforce = false;
						}
					}
					if (event.player.isUnderControl() && !_status.auto) {
						event.result = {
							bool: false
						}
						return;
					} else if (event.isMine()) {
						if (event.hsskill && !event.forced && _status.prehidden_skills.contains(event.hsskill)) {
							ui.click.cancel();
							return;
						}
						if (event.type == 'wuxie') {
							if (ui.tempnowuxie) {
								var triggerevent = event.getTrigger();
								if (triggerevent && triggerevent.targets && triggerevent.num == triggerevent.targets.length - 1) {
									ui.tempnowuxie.close();
								}
							}
							if (lib.filter.wuxieSwap(event)) {
								event.result = {
									bool: false
								}
								return;
							}
						}
						var ok = game.check();
						if (!ok || !lib.config.auto_confirm) {
							game.pause();
							if (lib.config.enable_vibrate && player._noVibrate) {
								delete player._noVibrate;
								game.vibrate();
							}
						}
						if (!ok) {
							var tipText;
							var handTip = event.handTip = dui.showHandTip();
							if (event.openskilldialog) {
								tipText = event.openskilldialog;
								event.openskilldialog = undefined;
							} else if (event.prompt !== false) {
								if (typeof event.prompt == 'function') {
									tipText = event.prompt(event);
								} else if (typeof event.prompt == 'string') {
									tipText = event.prompt;
								} else {
									if (typeof event.filterCard == 'object') {
										var filter = event.filterCard;
										tipText = '请使用' + get.cnNumber(event.selectCard[0]) + '张'
										if (filter.name) {
											tipText += get.translation(filter.name);
										} else {
											tipText += '牌';
										}
									} else {
										tipText = '请选择一张卡牌';
									}
									
									if (event.type == 'phase' && event.isMine()) {
										handTip.appendText('出牌阶段', 'phase');
										tipText = '，' + tipText
									}
								}
								
								if (event.prompt2) {
									if (tipText == null)
										tipText = ''
									
									handTip.setInfomation(event.prompt2);
								}
							}
							
							if (tipText != undefined) {
								event.dialog = handTip;
								tipText = tipText.replace(/<\/?.+?\/?>/g, '');
								//去掉＃适应
								tipText=window.getDecPrompt(tipText);
								handTip.appendText(tipText);
								handTip.strokeText();
								handTip.show();
							} else {
								handTip.close();
							}
						}
					} else if (event.isOnline()) {
						event.send();
					} else {
						event.result = 'ai';
					}
					"step 1"
					if (event.result == 'ai') {
						var ok = game.check();
						if (ok) {
							ui.click.ok();
						} else if (ai.basic.chooseCard(event.ai1)) {
							if (ai.basic.chooseTarget(event.ai2) && (!event.filterOk || event.filterOk())) {
								ui.click.ok();
								event._aiexcludeclear = true;
							} else {
								if (!event.norestore) {
									if (event.skill) {
										var skill = event.skill;
										ui.click.cancel();
										event._aiexclude.add(skill);
										var info = get.info(skill);
										if (info.sourceSkill) {
											event._aiexclude.add(info.sourceSkill);
										}
									} else {
										get.card(true).aiexclude();
										game.uncheck();
									}
									event.redo();
									game.resume();
								} else {
									ui.click.cancel();
								}
							}
						} else if (event.skill && !event.norestore) {
							var skill = event.skill;
							ui.click.cancel();
							event._aiexclude.add(skill);
							var info = get.info(skill);
							if (info.sourceSkill) {
								event._aiexclude.add(info.sourceSkill);
							}
							event.redo();
							game.resume();
						} else {
							ui.click.cancel();
						}
						if (event.aidelay && event.result && event.result.bool) {
							game.delayx();
						}
					}
					"step 2"
					if(event.endButton){
						event.endButton.close();
						delete event.endButton;
					}
					event.resume();
					if(event.result){
						if(event.result._sendskill){
							lib.skill[event.result._sendskill[0]]=event.result._sendskill[1];
						}
						if(event.result.skill){
							var info=get.info(event.result.skill);
							if(info&&info.chooseButton){
								if(event.dialog&&typeof event.dialog=='object') event.dialog.close();
								var dialog=info.chooseButton.dialog(event,player);
								if(info.chooseButton.chooseControl){
									var next=player.chooseControl(info.chooseButton.chooseControl(event,player));
									if(dialog.direct) next.direct=true;
									if(dialog.forceDirect) next.forceDirect=true;
									next.dialog=dialog;
									next.set('ai',info.chooseButton.check||function(){return 0;});
									if(event.id) next._parent_id=event.id;
									next.type='chooseToUse_button';
								}
								else{
									var next=player.chooseButton(dialog);
									if(dialog.direct) next.direct=true;
									if(dialog.forceDirect) next.forceDirect=true;
									next.set('ai',info.chooseButton.check||function(){return 1;});
									next.set('filterButton',info.chooseButton.filter||function(){return true;});
									next.set('selectButton',info.chooseButton.select||1);
									if(event.id) next._parent_id=event.id;
									next.type='chooseToUse_button';
								}
								event.buttoned=event.result.skill;
							}
							else if(info&&info.precontent&&!game.online&&!event.nouse){
								var next=game.createEvent('pre_'+event.result.skill);
								next.setContent(info.precontent);
								next.set('result',event.result);
								next.set('player',player);
							}
						}
					}
					"step 3"
					if (event.buttoned) {
						if (result.bool || result.control && result.control != 'cancel2') {
							var info = get.info(event.buttoned).chooseButton;
							lib.skill[event.buttoned + '_backup'] = info.backup(info.chooseControl ? result: result.links, player);
							lib.skill[event.buttoned + '_backup'].sourceSkill = event.buttoned;
							if (game.online) {
								event._sendskill = [event.buttoned + '_backup', lib.skill[event.buttoned + '_backup']];
							}
							event.backup(event.buttoned + '_backup');
							if (info.prompt) {
								event.openskilldialog = info.prompt(info.chooseControl ? result: result.links, player);
							}
						} else {
							ui.control.animate('nozoom', 100);
							event._aiexclude.add(event.buttoned);
						}
						event.goto(0);
						delete event.buttoned;
					}
					"step 4"
					if (event._aiexcludeclear) {
						delete event._aiexcludeclear;
						event._aiexclude.length = 0;
					}
					delete _status.noclearcountdown;
					if (event.skillDialog && get.objtype(event.skillDialog) == 'div') {
						event.skillDialog.close();
					}
					if (event.result && event.result.bool && !game.online && !event.nouse) {
						player.useResult(event.result, event);
					} else if (event._sendskill) {
						event.result._sendskill = event._sendskill;
					}
					if (event.dialog && typeof event.dialog == 'object') event.dialog.close();
					if (!_status.noclearcountdown) {
						game.stopCountChoose();
					}
					"step 5"
					if (event._result && event.result) {
						event.result.result = event._result;
					}
				};
				EventContent.equip = function() {
                            "step 0"
                            var owner = get.owner(card);
                            if (owner) {
                                var next = owner.lose(card, ui.special, 'visible')
                                    .set('type', 'equip')
                                    .set('getlx', false);
                                next.animate = true;
                                next.blameEvent = event;
                            } else if (get.position(card) == 'c') event.updatePile = true;

                            "step 1"
                            if (event.cancelled) {
                                event.finish();
                                return;
                            }
                            if (card.destroyed) {
                                if (player.hasSkill(card.destroyed)) {
                                    delete card.destroyed;
                                } else {
                                    event.finish();
                                    return;
                                }
                            } else if (event.owner) {
                                if (event.owner.getCards('hejsx')
                                    .contains(card)) {
                                    event.finish();
                                    return;
                                }
                            }
                            if (event.draw) {
                                game.delay(0, 300);
                                player.$draw(card);
                            }
                            "step 2"
                            if (card.clone) player.$gain2(card);
                            player.equiping = true;
                            "step 3"
                            var info = get.info(card, false);
                            var next = game.createEvent('replaceEquip');
                            next.player = player;
                            next.card = card;
                            next.setContent(info.replaceEquip || 'replaceEquip');
                            "step 4"
                            var info = get.info(card, false);
                            if (get.itemtype(result) == 'cards') {
                                player.lose(result, false, 'visible')
                                    .set('type', 'equip')
                                    .set('getlx', false)
                                    .swapEquip = true;
                                if (info.loseThrow) {
                                    player.$throw(result,1000);
                                }
                                event.swapped = true;
                            }
                            "step 5"
                            // if (player.isMin() || player.countCards('e', {
                            // 	subtype: get.subtype(card)
                            // })) {
                            if (player.isMin() || !player.canEquip(card)) {
                                event.finish();
                                game.cardsDiscard(card);
                                delete player.equiping;
                                return;
                            }
                            //开始
                            var subtype = get.subtype(card);
                            //equip6和equip3还是区分开来
                            //if (subtype == 'equip6') subtype = 'equip3';
                            game.broadcastAll(function(type) {
                                if (lib.config.background_audio) {
                                    game.playAudio('effect', type);
                                }
                            }, subtype);
                            //结束					
                            player.$equip(card);
                            game.addVideo('equip', player, get.cardInfo(card));
                            game.log(player, '装备了', card);
                            //开始
                            if (event.updatePile) game.updateRoundNumber();
                            //结束
                            "step 6"
                            var info = get.info(card, false);
                            if (info.onEquip && (!info.filterEquip || info.filterEquip(card, player))) {
                                if (Array.isArray(info.onEquip)) {
                                    for (var i = 0; i < info.onEquip.length; i++) {
                                        var next = game.createEvent('equip_' + card.name);
                                        next.setContent(info.onEquip[i]);
                                        next.player = player;
                                        next.card = card;
                                    }
                                } else {
                                    var next = game.createEvent('equip_' + card.name);
                                    next.setContent(info.onEquip);
                                    next.player = player;
                                    next.card = card;
                                }
                                if (info.equipDelay != 'false') game.delayx();
                            }
                            delete player.equiping;
                            if (event.delay) {
                                game.delayx();
                            }
                        };
				EventContent.respond = function () {
					"step 0"
				var cardaudio = true;	
					if (event.skill) {
						if (lib.skill[event.skill].audio) {
							cardaudio = false;
						}
						player.logSkill(event.skill);
						player.checkShow(event.skill, true);
						if (lib.skill[event.skill].onrespond && !game.online) {
							lib.skill[event.skill].onrespond(event, player);
						}
					} else if (!event.nopopup) player.tryCardAnimate(card, card.name, 'wood');
					if (cardaudio && event.getParent(3).name == 'useCard') {
						game.broadcastAll(function(player, card) {
							if (lib.config.background_audio) {
								var sex = player.sex == 'female' ? 'female': 'male';
								var audioinfo = lib.card[card.name].audio;
								if (typeof audioinfo == 'string' && audioinfo.indexOf('ext:') == 0) {
									game.playAudio('..', 'extension', audioinfo.slice(4), card.name + '_' + sex);
								} else {
									game.playAudio('card', sex, card.name);
								}
							}
						}, player, card);
					}
					if(event.skill){
						if(player.stat[player.stat.length-1].skill[event.skill]==undefined){
							player.stat[player.stat.length-1].skill[event.skill]=1;
						}
						else{
							player.stat[player.stat.length-1].skill[event.skill]++;
						}
						var sourceSkill=get.info(event.skill).sourceSkill;
						if(sourceSkill){
							if(player.stat[player.stat.length-1].skill[sourceSkill]==undefined){
								player.stat[player.stat.length-1].skill[sourceSkill]=1;
							}
							else{
								player.stat[player.stat.length-1].skill[sourceSkill]++;
							}
						}
					}
					if (cards.length && (cards.length > 1 || cards[0].name != card.name)) {
						game.log(player, '打出了', card, '（', cards, '）');
					} else {
						game.log(player, '打出了', card);
					}
					player.actionHistory[player.actionHistory.length - 1].respond.push(event);
					var cards2 = cards.concat();
					if (cards2.length) {
						var next = player.lose(cards2, ui.ordering, 'visible');
						cards2.removeArray(next.cards);
						if (event.noOrdering)
							next.noOrdering = true;
						
						if (event.animate != false && event.throw !== false) {
							next.animate = true;
							next.blameEvent = event;
						}
						
						if (cards2.length) {
							var next2 = game.cardsGotoOrdering(cards2);
							if (event.noOrdering)
								next2.noOrdering = true;
							
							player.$throw(cards2);
						}
					} else {
						//响应（代码来自蒸套装）
						var evt = _status.event;
						if (evt && evt.card && evt.cards === cards) {
							var card = ui.create.card().init([
								evt.card.suit,
								evt.card.number,
								evt.card.name,
								evt.card.nature,
							]);
							if (evt.card.suit == 'none') card.node.suitnum.style.display = 'none';
							card.dataset.virtualCard = true;
							cards2 = [card];
							card.virtualMark = ui.create.div('.virtualMark', card);
						}
						player.$throw(cards2);
					}
			event.trigger('respond');
					"step 1"
					game.delayx(0.5);
				};
				EventContent.gain = function () {
					"step 0"
					if (event.animate == 'give')
						event.visible = true;
					
					if (cards) {
						var map = {};
						for (var i of cards) {
							var owner = get.owner(i, 'judge');
							if (owner && (owner != player || get.position(i) != 'h')) {
								var id = owner.playerid;
								if (!map[id]) map[id] = [[], [], []];
								map[id][0].push(i);
								var position = get.position(i);
								if (position == 'h') map[id][1].push(i);
								else map[id][2].push(i);
							} else if (!event.updatePile && get.position(i) == 'c') event.updatePile = true;
						}
						event.losing_map = map;
						for (var i in map) {
							var owner = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
							var next = owner.lose(map[i][0], ui.special).set('type', 'gain').set('forceDie', true).set('getlx', false);
							if (event.visible == true)
								next.visible = true;
							
							event.relatedLose = next;
						}
					} else {
						event.finish();
					}
					"step 1"
					for(var i=0;i<cards.length;i++){
						if(cards[i].destroyed){
							if(player.hasSkill(cards[i].destroyed)){
								delete cards[i].destroyed;
							}
							else{
								cards.splice(i--,1);
							}
						}
						else if(event.losing_map){
							for(var id in event.losing_map){
								if(event.losing_map[id][0].contains(cards[i])){
									var source=(_status.connectMode?lib.playerOL:game.playerMap)[id];
									var hs=source.getCards('hejsx');
									if(hs.contains(cards[i])){
										cards.splice(i--,1);
									}
								}
							}
						}
					}
					if (cards.length == 0) {
						event.finish();
						return;
					}
					player.getHistory('gain').push(event);
					"step 2"
					if (player.getStat().gain == undefined) {
						player.getStat().gain = cards.length;
					} else {
						player.getStat().gain += cards.length;
					}
					"step 3"
					var gaintag = event.gaintag;
					var handcards = player.node.handcards1;
					var fragment = document.createDocumentFragment();
					
					var card;
					for (var i = 0; i < cards.length; i++) {
						card = cards[i];
						card.fix();
						if (card.parentNode == handcards) {
							cards.splice(i--, 1);
							continue;
						}
						
						if (gaintag)
							card.addGaintag(gaintag);
						
						fragment.insertBefore(card, fragment.firstChild);
						if (_status.discarded)
							_status.discarded.remove(card);
							
						for (var j = 0; j < card.vanishtag.length; j++) {
							if (card.vanishtag[j][0] != '_')
								card.vanishtag.splice(j--, 1);
						}
					}
					
					var gainTo = function (cards, nodelay) {
						cards.duiMod = event.source;
						if (player == game.me) {
							dui.layoutHandDraws(cards.reverse());
							dui.queueNextFrameTick(dui.layoutHand, dui);
							game.addVideo('gain12', player, [get.cardsInfo(fragment.childNodes), gaintag]);
						}
						
						var s = player.getCards('s');
						if (s.length)
							handcards.insertBefore(fragment, s[0]);
						else
							handcards.appendChild(fragment);
						
							game.broadcast(function (player, cards, num, gaintag) {
								player.directgain(cards, null, gaintag);
							_status.cardPileNum = num;
						}, player, cards, ui.cardPile.childNodes.length, gaintag);
						
						if (nodelay !== true) {
							setTimeout(function (player) {
								player.update();
								game.resume();
							}, get.delayx(400, 400) + 66, player);
						} else {
							player.update();
						}
					};
					if (event.animate == 'draw') {
						game.pause();
						gainTo(cards);
						player.$draw(cards.length);
					} else if (event.animate == 'gain') {
						game.pause();
						gainTo(cards);
						player.$gain(cards,event.log);
					} else if (event.animate == 'gain2' || event.animate == 'draw2') {
						game.pause();
						gainTo(cards);
						player.$gain2(cards,event.log);
					} else if (event.animate == 'give' || event.animate == 'giveAuto') {
						game.pause();
						gainTo(cards);
						var evtmap = event.losing_map;
						if (event.animate == 'give') {
							for (var i in evtmap) {
								var source = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
								source.$give(evtmap[i][0],player,event.log)
							}
						} else {
							for (var i in evtmap) {
								var source = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
								if (evtmap[i][1].length) source.$giveAuto(evtmap[i][1],player,event.log);
								if (evtmap[i][2].length) source.$give(evtmap[i][2],player,event.log);
							}
						}
					} else if (typeof event.animate == 'function') {
						var time = event.animate(event);
						game.pause();
						setTimeout(function () {
							addv();
							player.node.handcards1.insertBefore(frag1, player.node.handcards1.firstChild);
							player.node.handcards2.insertBefore(frag2, player.node.handcards2.firstChild);
							player.update();
							if (player == game.me) ui.updatehl();
							broadcast();
							game.resume();
						}, get.delayx(time, time));
					} else {
						gainTo(cards, true);
						event.finish();
					}
					"step 4"
					if (event.updatePile) game.updateRoundNumber();
					event.finish();
				};
				EventContent.gameDraw = function () {
					"step 0"
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
					} while ( player != end );
					event.changeCard = get.config('change_card');
					if (_status.connectMode || (lib.config.mode == 'doudizhu' && _status.mode == 'online') || lib.config.mode != 'identity' && lib.config.mode != 'guozhan' && lib.config.mode != 'doudizhu') {
						event.changeCard = 'disabled';
					}
					"step 1"
					if (event.changeCard != 'disabled' && !_status.auto) {
						event.dialog = dui.showHandTip('是否使用手气卡？');
						event.dialog.strokeText();
						ui.create.confirm('oc');
						event.custom.replace.confirm = function(bool) {
							_status.event.bool = bool;
							game.resume();
						}
					} else {
						event.goto(4);
					}
					"step 2"
					if (event.changeCard == 'once') {
						event.changeCard = 'disabled';
					} else if (event.changeCard == 'twice') {
						event.changeCard = 'once';
					} else if (event.changeCard == 'disabled') {
						event.bool = false;
						return;
					}
					_status.imchoosing = true;
					event.switchToAuto = function() {
						_status.event.bool = false;
						game.resume();
					}
					game.pause();
					"step 3"
					_status.imchoosing = false;
					if (event.bool) {
						if (game.changeCoin) {
							game.changeCoin( - 3);
						}
						var hs = game.me.getCards('h');
						game.addVideo('lose', game.me, [get.cardsInfo(hs), [], [], []]);
						for (var i = 0; i < hs.length; i++) {
							hs[i].discard(false);
						}
						game.me.directgain(get.cards(hs.length));
						event.goto(2);
					} else {
						if (event.dialog) event.dialog.close();
						if (ui.confirm) ui.confirm.close();
						game.me._start_cards = game.me.getCards('h');
						event.goto(4);
					}
					"step 4"
					setTimeout(decadeUI.effect.gameStart, 51);
				};
				EventContent.judge = function () {
					"step 0"
					var judgestr = get.translation(player) + '的' + event.judgestr + '判定';
					event.videoId = lib.status.videoId++;
					var cardj = event.directresult;
					if (!cardj) {
						if (player.getTopCards) cardj = player.getTopCards()[0];
						else cardj = get.cards()[0];
					}
					var owner = get.owner(cardj);
					if (owner) {
						owner.lose(cardj, 'visible', ui.ordering);
					} else {
						var nextj = game.cardsGotoOrdering(cardj);
						if (event.position != ui.discardPile) nextj.noOrdering = true;
					}
					player.judging.unshift(cardj);
					game.addVideo('judge1', player, [get.cardInfo(player.judging[0]), judgestr, event.videoId]);
					game.broadcastAll(function(player, card, str, id, cardid) {
						var event = game.online ? {} : _status.event;
						if (game.chess)
							event.node = card.copy('thrown', 'center', ui.arena).animate('start');
						else
							event.node = player.$throwordered2(card.copy(), true);
						
						if (lib.cardOL) lib.cardOL[cardid] = event.node;
						event.node.cardid = cardid;
						if (!window.decadeUI) {
							ui.arena.classList.add('thrownhighlight');
							event.node.classList.add('thrownhighlight');
							event.dialog = ui.create.dialog(str);
							event.dialog.classList.add('center');
						} else {
							event.dialog = dui.showHandTip(str);
							event.dialog.strokeText();
							if (game.online)
								ui.dialogs.push(event.dialog);
						}
						
						event.dialog.videoId = id;
					}, player, player.judging[0], judgestr, event.videoId, get.id());

					game.log(player, '进行' + event.judgestr + '判定，亮出的判定牌为', player.judging[0]);
					game.delay(2);
					if (!event.noJudgeTrigger)
						event.trigger('judge');
					"step 1"
					event.result = {
						card: player.judging[0],
						name: player.judging[0].name,
						number: get.number(player.judging[0]),
						suit: get.suit(player.judging[0]),
						color: get.color(player.judging[0]),
						node: event.node,
					};
					if (event.fixedResult) {
						for (var i in event.fixedResult) {
							event.result[i] = event.fixedResult[i];
						}
					}
					event.result.judge = event.judge(event.result);
					if (event.result.judge > 0) event.result.bool = true;
					else if (event.result.judge < 0) event.result.bool = false;
					else event.result.bool = null;
					player.judging.shift();
					game.checkMod(player, event.result, 'judge', player);
					if (event.judge2) {
						var judge2 = event.judge2(event.result);
						if (typeof judge2 == 'boolean') player.tryJudgeAnimate(judge2);
					};
					if (event.clearArena != false) {
						game.broadcastAll(ui.clear);
					}
					
					event.dialog.close();
					game.broadcast(function(id) {
						var dialog = get.idDialog(id);
						if (dialog)
							dialog.close();
						
						if (!window.decadeUI)
							ui.arena.classList.remove('thrownhighlight');
					}, event.videoId);
					
					game.addVideo('judge2', null, event.videoId);
					game.log(player, '的判定结果为', event.result.card);
					event.trigger('judgeFixing');
					event.triggerMessage('judgeresult');
					if (event.callback) {
						var next = game.createEvent('judgeCallback', false);
						next.player = player;
						next.card = event.result.card;
						next.judgeResult = get.copy(event.result);
						next.setContent(event.callback);
					} else {
						if (!get.owner(event.result.card)) {
							if (event.position != ui.discardPile)
								event.position.appendChild(event.result.card);
						}
					}
				};
				//判定区弃牌的地方
				EventContent.lose = function () {
					"step 0"
					if (event.insert_card && event.position == ui.cardPile)
						event.cards.reverse();
					
					event.stockcards = cards.concat();
					var hs = [], es = [], js = [], ss = [], xs = [];
					var unmarks = [];
					var cards = event.cards;
					var gainmap = event.gaintag_map = {};
					var be = event.blameEvent;
					var pe = event.getParent();
					var pename = pe.name;
					
					if (be == undefined && (pename != 'discard' || event.type != 'discard') && (pename != 'loseToDiscardpile' || event.type != 'loseToDiscardpile')) {
						event.animate = false;
						event.delay = false;
					} else {
						if (pe.delay === false)
							event.delay = false;
						
						if (event.animate == undefined)
							event.animate = pe.animate;
					}
					
					
					var card, pileNode;
					var hej = player.getCards('hejsx');
					for (var i = 0; i < cards.length; i++) {
						card = cards[i];

						pileNode = card.parentNode;
						if (!hej.contains(card)) {
							cards.splice(i--, 1);
							continue;
						} else if (pileNode) {
							if (pileNode.classList.contains('equips')) {
								es.push(card);
								card.throwWith = card.original = 'e';
							} else if (pileNode.classList.contains('judges')) {
								js.push(card);
								/*坤坤的美化 判定区位置跟随技能*/
								if (decadeUI.config.newDecadeStyle == 'off') {
                                        if (player == game.me) {
                                            var skillControl = document.getElementById("arena").getElementsByClassName("skill-control");

                                            if (skillControl.length > 0) {
                                                var skillControlJudges = skillControl[0].getElementsByClassName("judges")[0];
                                                
                                                //这里修复一下，如果没有动态图遮罩就算了
                                                if(skillControlJudges) for (var i = 0; i < skillControlJudges.childElementCount; i++) {

                                                    var keywards = skillControlJudges.childNodes[i].getAttribute("keywards");
                                                    // console.log(keywards);

                                                    if (card.viewAs == keywards) {
                                                        skillControlJudges.childNodes[i].remove();

                                                        break;
                                                    }

                                                }

                                            }
                                        }
                                }
                                        /*末 */
								card.throwWith = card.original = 'j';
							} else if (pileNode.classList.contains('expansions')) {
								xs.push(card);
								card.throwWith = card.original = 'x';
								if (card.gaintag && card.gaintag.length) unmarks.addArray(card.gaintag);
							} else if (pileNode.classList.contains('handcards')) {
								if (card.classList.contains('glows')) {
									ss.push(card);
									card.throwWith = card.original = 's';
								} else {
									hs.push(card);
									card.throwWith = card.original = 'h';
								}
							} else {
								card.throwWith = card.original = null;
							}
						}
						if (card.gaintag && card.gaintag.length) {
							gainmap[card.cardid] = card.gaintag.concat();
							card.removeGaintag(true);
						}
						
						var info = lib.card[card.name];
						if (info.destroy || card._destroy) {
							card.delete();
							card.destroyed = info.destroy || card._destroy;
						} else if (event.position) {
							if (_status.discarded) {
								if (event.position == ui.discardPile) {
									_status.discarded.add(card);
								} else {
									_status.discarded.remove(card);
								}
							}
							
							if (event.insert_index) {
								card.fix();
								event.position.insertBefore(card, event.insert_index(event, card));
							} else if (event.insert_card) {
								card.fix();
								event.position.insertBefore(card, event.position.firstChild);
							} else {
								if (event.position == ui.cardPile)
									card.fix();
								
								event.position.appendChild(card);
							}
						} else {
							card.remove();
						}
						
						card.recheck();
						card.classList.remove('glow');
						card.classList.remove('glows');
					}
					
					if (player == game.me)
						dui.queueNextFrameTick(dui.layoutHand, dui);
					
					ui.updatej(player);
					game.broadcast(function (player, cards, num) {
						for (var i = 0; i < cards.length; i++) {
							cards[i].classList.remove('glow');
							cards[i].classList.remove('glows');
							cards[i].fix();
							cards[i].remove();
						}
						
						if (player == game.me)
							ui.updatehl();
						
						ui.updatej(player);
						_status.cardPileNum = num;
					}, player, cards, ui.cardPile.childNodes.length);
					if (event.animate != false) {
						pe.discardid = lib.status.videoId++;
						game.broadcastAll(function (player, cards, id) {
							cards.duiMod = true;
							player.$throw(cards, null, 'nobroadcast');
							var cardnodes = [];
							cardnodes._discardtime = get.time();
							for (var i = 0; i < cards.length; i++) {
								if (cards[i].clone) {
									cardnodes.push(cards[i].clone);
								}
							}
							ui.todiscard[id] = cardnodes;
						}, player, cards, pe.discardid);
						if (lib.config.sync_speed && cards[0] && cards[0].clone) {
							var evt;
							if (pe.delay != false)
								evt = pe;
							else if (pe.getParent().discardTransition)
								evt = pe.getParent();
							
							if (evt) {
								evt.discardTransition = undefined;
								var waitingForTransition = get.time();
								evt.waitingForTransition = waitingForTransition;
								cards[0].clone.listenTransition(function () {
									if (_status.waitingForTransition == waitingForTransition && _status.paused)
										game.resume();
									
									evt.waitingForTransition = undefined;
								});
							}
						}
					}
					
					game.addVideo('lose', player, [get.cardsInfo(hs), get.cardsInfo(es), get.cardsInfo(js), get.cardsInfo(ss), get.cardsInfo(xs)]);
					event.cards2 = hs.concat(es);
					player.getHistory('lose').push(event);
					game.getGlobalHistory().cardMove.push(event);
					player.update();
					game.addVideo('loseAfter', player);
					event.num = 0;
					if (event.position == ui.ordering) {
						var evt = event.relatedEvent || event.getParent();
						if (!evt.orderingCards) evt.orderingCards = [];
						if (!event.noOrdering && !event.cardsOrdered) {
							event.cardsOrdered = true;
							var next = game.createEvent('orderingDiscard', false, evt.getParent());
							next.relatedEvent = evt;
							next.setContent('orderingDiscard');
						}
						if (!event.noOrdering) {
							evt.orderingCards.addArray(cards);
							evt.orderingCards.addArray(ss);
						}
					} else if (event.position == ui.cardPile) {
						game.updateRoundNumber();
					}
					if (event.toRenku) _status.renku.addArray(cards);
					if (unmarks.length) {
						for (var i of unmarks) {
							player[(lib.skill[i] && lib.skill[i].mark || player.hasCard((card) => card.hasGaintag(i), 'x')) ? 'markSkill' : 'unmarkSkill'](i);
						}
					}
					event.hs = hs;
					event.es = es;
					event.js = js;
					event.ss = ss;
					event.xs = xs;
					"step 1"
					if (num < cards.length) {
						if (event.es.contains(cards[num])) {
							event.loseEquip = true;
							player.removeEquipTrigger(cards[num]);
							var info = get.info(cards[num]);
							if (info.onLose && (!info.filterLose || info.filterLose(cards[num], player))) {
								event.goto(2);
								return;
							}
						}
						event.num++;
						event.redo();
					} else {
						if (event.loseEquip) {
							player.addEquipTrigger();
						}
						event.goto(3);
					}
					"step 2"
					var info = get.info(cards[num]);
					if (info.loseDelay != false && (player.isAlive() || info.forceDie)) {
						player.popup(cards[num].name);
						game.delayx();
					}
					if (Array.isArray(info.onLose)) {
						for (var i = 0; i < info.onLose.length; i++) {
							var next = game.createEvent('lose_' + cards[num].name);
							next.setContent(info.onLose[i]);
							if (info.forceDie) next.forceDie = true;
							next.player = player;
							next.card = cards[num];
						}
					} else {
						var next = game.createEvent('lose_' + cards[num].name);
						next.setContent(info.onLose);
						next.player = player;
						if (info.forceDie) next.forceDie = true;
						next.card = cards[num];
					}
					event.num++;
					event.goto(1);
					"step 3"
							if (event.toRenku) {
								if (_status.renku.length > 6) {
									var cards = _status.renku.splice(0, _status.renku.length - 6);
									game.log(cards, '从仁库进入了弃牌堆');
									game.cardsDiscard(cards).set('outRange', true).fromRenku = true;
								}
								game.updateRenku();
							}
							"step 4"
							var evt = event.getParent();
							if (evt.name != 'discard' && event.type != 'discard' && evt.name != 'loseToDiscardpile' && event.type != 'loseToDiscardpile') return;
							if (event.animate === false || event.delay === false) return;
							if (evt.delay != false) {
								if (evt.waitingForTransition) {
									_status.waitingForTransition = evt.waitingForTransition;
									game.pause();
								} else {
									game.delayx();
								}
							}
						};
										/*-----------------分割线-----------------*/
				EventContent.turnOver = function() {
					game.log(player, '翻面');
					player.classList.toggle('turnedover');
					game.broadcast(function(player){
						player.classList.toggle('turnedover');
					}, player);
					game.addVideo('turnOver', player, player.classList.contains('turnedover'));
					player.queueCssAnimation('turned-over 0.5s linear');
				};
				return EventContent;
			})({});
			
			var Skill = (function(Skill){
				Skill._save = {
					priority:5,
					forced:true,
					popup:false,
					filter:function(){ return false; },
					content:function(){
						"step 0"
						event.dying = trigger.player;
						if (!event.acted) event.acted = [];
						"step 1"
						if (trigger.player.isDead()) {
							event.finish();
							return;
						}
						event.acted.push(player);
						if (lib.config.tao_enemy && event.dying.side != player.side && lib.config.mode != 'identity' && lib.config.mode != 'guozhan' && !event.dying.hasSkillTag('revertsave')) {
							event._result = {
								bool: false
							}
						} else if (player.canSave(event.dying)) {
							player.chooseToUse({
								filterCard: function(card, player, event) {
									event = event || _status.event;
									return lib.filter.cardSavable(card, player, event.dying);
								},
								dyingPlayer: trigger.player,
								filterTarget: trigger.player,
								prompt:function(event){
									var handTip = event.handTip;
									var player = event.player;
									var target = event.dyingPlayer;
									if (player != target) {
										handTip.appendText(get.translation(target), 'player');
										handTip.appendText('濒死，需要');
										handTip.appendText((Math.abs(target.hp) + 1), 'number');
										handTip.appendText('个');
										handTip.appendText('桃', 'card');
										handTip.appendText('，是否对其使用');
										handTip.appendText('桃', 'card');
										handTip.appendText('？');
									} else {
										handTip.appendText('你当前体力值为');
										handTip.appendText(target.hp, 'number');
										handTip.appendText('，需要');
										handTip.appendText((Math.abs(target.hp) + 1), 'number');
										handTip.appendText('个');
										handTip.appendText('酒', 'card');
										handTip.appendText('或');
										handTip.appendText('桃', 'card');
									}
							
									return '';
								},
								ai1:function(card) {
									if (typeof card == 'string') {
										var info = get.info(card);
										if (info.ai && info.ai.order) {
											if (typeof info.ai.order == 'number') {
												return info.ai.order;
											} else if (typeof info.ai.order == 'function') {
												return info.ai.order();
											}
										}
									}
									return 1;
								},
								ai2: get.effect_use,
								type: 'dying',
								targetRequired: true,
								dying: event.dying
							});
						} else {
							event._result = {
								bool: false
							}
						}
						"step 2"
						if (result.bool) {
							if (trigger.player.hp <= 0 && !trigger.player.nodying && trigger.player.isAlive() && !trigger.player.isOut() && !trigger.player.removed) event.goto(0);
							else trigger.untrigger();
						} else {
							for (var i = 0; i < 20; i++) {
								if (event.acted.contains(event.player.next)) {
									break;
								} else {
									event.player = event.player.next;
									if (!event.player.isOut()) {
										event.goto(1);
										break;
									}
								}
							}
						}
					}
				};
				return Skill;
			})({});
			
			var Click = (function(Click){
				Click.skill = function (skill) {
					var info = get.info(skill);
					var event = _status.event;
					event.backup(skill);
					if (info.filterCard && info.discard != false && info.lose != false && !info.viewAs) {
						var cards = event.player.getCards(event.position);
						for (var i = 0; i < cards.length; i++) {
							if (!lib.filter.cardDiscardable(cards[i], event.player)) {
								cards[i].uncheck('useSkill');
							}
						}
					}
					if (typeof event.skillDialog == 'object') {
						event.skillDialog.close();
					}
					if (event.isMine()) {
						event.skillDialog = true;
					}
					game.uncheck();
					game.check();
					if (event.skillDialog) {
						var title = get.translation(skill);
						var intro;
						if (info.prompt) {
							if (typeof info.prompt == 'function') {
								intro = info.prompt(event);
							} else {
								intro = info.prompt;
							}
						} else if (info.promptfunc) {
							intro = info.promptfunc(event, event.player);
						} else if (lib.dynamicTranslate[skill]) {
							intro = lib.dynamicTranslate[skill](event.player, skill);
						} else if (lib.translate[skill + '_info']) {
							intro = lib.translate[skill + '_info'];
						}
						
						if (intro != undefined) {
							if (intro.length > 25) {
								event.skillDialog = ui.create.dialog(title, '<div><div style="width:100%">' + intro + '</div></div>');
							} else {
								var handTip = dui.showHandTip(intro);
								handTip.strokeText();
								event.skillDialog = handTip;
							}
						}
					}
				};
				return Click;
			})({});
			
			var Create = (function(Create){
				Create.prebutton = function (item, type, position, noclick) {
					var button = ui.create.div();
					button.style.display = 'none';
					button.link = item;
					button.activate = function() {
						var node = ui.create.button(item, type, undefined, noclick, button);
						node.activate = undefined;
					};
					_status.prebutton.push(button);
					if (position) position.appendChild(button);
					return button;
				};
				return Create;
			})({});
			
			var Game = (function(Game){
				Game.logv = function (player, card, targets, event, forced, logvid) {
					if (!player) {
						player = _status.event.getParent().logvid;
						if (!player) return;
					}
					const node = ui.create.div('.hidden');
					node.node = {};
					logvid = logvid || get.id();
					game.broadcast((player, card, targets, event, forced, logvid) => game.logv(player, card, targets, event, forced, logvid), player, card, targets, event, forced, logvid);
					if (typeof player == 'string') {
						const childNode = Array.from(ui.historybar.childNodes).find(value => value.logvid == player);
						if (childNode) childNode.added.push(card);
						return;
					}
					if (typeof card == 'string') {
						if (card != 'die') {
							if (lib.skill[card] && lib.skill[card].logv === false && !forced) return;
							if (!lib.translate[card]) return;
						}
						let avatar;
						if (!player.isUnseen(0)) avatar = player.node.avatar.cloneNode();
						else if (!player.isUnseen(1)) avatar = player.node.avatar2.cloneNode();
						else return;
						node.node.avatar = avatar;
						avatar.style.transform = '';
						avatar.className = 'avatar';
						if (card == 'die') {
							node.dead = true;
							node.player = player;
							const avatar2 = avatar.cloneNode();
							avatar2.className = 'avatarbg grayscale1';
							avatar.appendChild(avatar2);
							avatar.style.opacity = 0.6;
						} else {
							node.node.text = ui.create.div('', get.translation(card, 'skill'), avatar);
							node.node.text.dataset.nature = 'water';
							node.skill = card;
						}
						node.appendChild(avatar);
						if (card == 'die' && targets && targets != player) {
							node.source = targets;
							player = targets;
							if (!player.isUnseen(0)) avatar = player.node.avatar.cloneNode();
							else if (!player.isUnseen(1)) avatar = player.node.avatar2.cloneNode();
							else if (get.mode() == 'guozhan' && player.node && player.node.name_seat) {
								avatar = ui.create.div('.avatar.cardbg');
								avatar.innerHTML = player.node.name_seat.innerHTML[0];
							} else return;
							avatar.style.transform = '';
							node.node.avatar2 = avatar;
							avatar.classList.add('avatar2');
							node.appendChild(avatar);
						}
					} else if (Array.isArray(card)) {
						node.cards = card[1].slice(0);
						card = card[0];
						const info = [card.suit || '', card.number || '', card.name || '', card.nature || ''];
						if (!Array.isArray(node.cards) || !node.cards.length) {
							node.cards = [ui.create.card(node, 'noclick', true).init(info)];
						}
						if (card.name == 'wuxie') {
							if (ui.historybar.firstChild && ui.historybar.firstChild.type == 'wuxie') {
								ui.historybar.firstChild.players.push(player);
								ui.historybar.firstChild.cards.addArray(node.cards);
								return;
							}
							node.type = 'wuxie';
							node.players = [player];
						}
						if (card.copy) card.copy(node, false);
						else {
							card = ui.create.card(node, 'noclick', true);
							card.init(info);
						}
						let avatar;
						if (!player.isUnseen(0)) avatar = player.node.avatar.cloneNode();
						else if (!player.isUnseen(1)) avatar = player.node.avatar2.cloneNode();
						else if (get.mode() == 'guozhan' && player.node && player.node.name_seat) {
							avatar = ui.create.div('.avatar.cardbg');
							avatar.innerHTML = player.node.name_seat.innerHTML[0];
						} else return;
						node.node.avatar = avatar;
						avatar.style.transform = '';
						avatar.classList.add('avatar2');
						node.appendChild(avatar);

						if (targets && targets.length == 1 && targets[0] != player && get.itemtype(targets[0]) == 'player') (() => {
							var avatar2;
							var target = targets[0];
							if (!target.isUnseen(0)) {
								avatar2 = target.node.avatar.cloneNode();
							} else if (!player.isUnseen(1)) {
								avatar2 = target.node.avatar2.cloneNode();
							} else if (get.mode() == 'guozhan' && target.node && target.node.name_seat) {
								avatar2 = ui.create.div('.avatar.cardbg');
								avatar2.innerHTML = target.node.name_seat.innerHTML[0];
							} else {
								return;
							}
							node.node.avatar2 = avatar2;
							avatar2.style.transform = '';
							avatar2.classList.add('avatar2');
							avatar2.classList.add('avatar3');
							node.insertBefore(avatar2, avatar);
						})();
					}
					if (targets && targets.length) {
						if (targets.length == 1 && targets[0] == player) {
							node.targets = [];
						} else {
							node.targets = targets;
						}
					}

					const bounds = dui.boundsCaches.window;
					bounds.check();
					const fullheight = bounds.height, num = Math.round((fullheight - 8) / 50), margin = (fullheight - 42 * num) / (num + 1);
					node.style.transform = 'scale(0.8)';
					ui.historybar.insertBefore(node, ui.historybar.firstChild);
					ui.refresh(node);
					node.classList.remove('hidden');
					Array.from(ui.historybar.childNodes).forEach((value, index) => {
						if (index < num) {
							value.style.transform = `scale(1) translateY(${margin + index * (42 + margin) - 4}px)`;
							return;
						}
						if (value.removetimeout) return;
						value.style.opacity = 0;
						value.style.transform = `scale(1) translateY(${fullheight}px)`;
						value.removetimeout = setTimeout((current => () => current.remove())(value), 500);
					});
					if (lib.config.touchscreen) node.addEventListener('touchstart', ui.click.intro);
					else {
						// node.addEventListener('mouseenter',ui.click.intro);
						node.addEventListener(lib.config.pop_logv ? 'mousemove' : 'click', ui.click.logv);
						node.addEventListener('mouseleave', ui.click.logvleave);
					}
					node.logvid = logvid;
					node.added = [];
					if (!game.online) {
						event = event || _status.event;
						event.logvid = node.logvid;
					}
					return node;
				};
				Game.phaseLoop = function (player) {
					game.broadcastAll(function(firstAction){
						var cur;
						for (var i = 0; i < game.players.length; i++) {
							cur = game.players[i];
							if (!cur.node.seat)
								cur.node.seat = decadeUI.element.create('seat', cur);
							
							cur.seat = get.distance(firstAction, cur, 'absolute') + 1;
							cur.node.seat.innerHTML = get.cnNumber(cur.seat, true);
						}
					}, player);
					
					return this._super.phaseLoop.apply(this, arguments);
				};
				return Game;
			})({});
			
			overrides(lib.element.card, Card);
			overrides(lib.element.event, Event);
			overrides(lib.element.player, Player);
			overrides(lib.element.content, EventContent);
			overrides(lib.skill, Skill);
			overrides(ui.click, Click);
			overrides(ui.create, Create);
			overrides(game, Game);
			
			var ride = {};
			ride.lib = {
				element:{
					dialog:{
						add:function(item, noclick, zoom){
							if (typeof item == 'string') {
								if (item.indexOf('###') == 0) {
									var items = item.slice(3).split('###');
									this.add(items[0], noclick, zoom);
									this.addText(items[1], items[1].length <= 20, zoom);
								} else if (noclick) {
									var strstr = item;
									item = ui.create.div('', this.content);
									item.innerHTML = strstr;
								} else {
									item = ui.create.caption(item, this.content);
								}
							} else if (get.objtype(item) == 'div') {
								this.content.appendChild(item);
							} else if (get.itemtype(item) == 'cards') {
								var buttons = ui.create.div('.buttons', this.content);
								if (zoom) buttons.classList.add('smallzoom');
								this.buttons = this.buttons.concat(ui.create.buttons(item, 'card', buttons, noclick));
							} else if (get.itemtype(item) == 'players') {
								var buttons = ui.create.div('.buttons', this.content);
								if (zoom) buttons.classList.add('smallzoom');
								this.buttons = this.buttons.concat(ui.create.buttons(item, 'player', buttons, noclick));
							}
							else if(item[1]=='textbutton'){
								ui.create.textbuttons(item[0],this,noclick);
							}
							 else {
								var buttons = ui.create.div('.buttons', this.content);
								if (zoom) buttons.classList.add('smallzoom');
								
								if (item[1] && item[1].indexOf('character') != -1) {
									if (this.intersection == undefined && self.IntersectionObserver) {
										this.intersection = new IntersectionObserver(function(entries){
											for (var i = 0; i < entries.length; i++) {
												if (entries[i].intersectionRatio > 0) {
													var target = entries[i].target;
													target.setBackground(target.awaitItem, 'character');
													this.unobserve(target);
												}
											}
										},{
											root: this,
											rootMargin: '0px',
											thresholds: 0.01,
										});
									}
									
									buttons.intersection = this.intersection;
								}
								
								this.buttons = this.buttons.concat(ui.create.buttons(item[0], item[1], buttons, noclick));
							}
							if (this.buttons.length) {
								if (this.forcebutton !== false) this.forcebutton = true;
								if (this.buttons.length > 3 || (zoom && this.buttons.length > 5)) {
									this.classList.remove('forcebutton-auto');
								} else if (!this.noforcebutton) {
									this.classList.add('forcebutton-auto');
								}
							}
							ui.update();
							return item;
						},
						
						open:function(){
							if (this.noopen) return;
							for (var i = 0; i < ui.dialogs.length; i++) {
								if (ui.dialogs[i] == this) {
									this.show();
									this.refocus();
									ui.dialogs.remove(this);
									ui.dialogs.unshift(this);
									ui.update();
									return this;
								}
								if (ui.dialogs[i].static) ui.dialogs[i].unfocus();
								else ui.dialogs[i].hide();
							}
							ui.dialog = this;
							ui.arena.appendChild(this);
							ui.dialogs.unshift(this);
							ui.update();
							if (!this.classList.contains('prompt')) {
								this.style.animation = 'open-dialog 0.5s';
							}
							
							return this;
						},
						
						close:function(){
							if (this.intersection) {
								this.intersection.disconnect();
								this.intersection = undefined;
							}
							
							ui.dialogs.remove(this);
							if (ui.dialogs.length > 0){
								ui.dialog = ui.dialogs[0];
								ui.dialog.show();
								ui.dialog.refocus();
								ui.update();
							}
							
							this.delete();
							return this;
						},
					},
					
					card:{
						init:function(card){
							if (Array.isArray(card)) {
								if (card[2] == 'huosha') {
									card[2] = 'sha';
									card[3] = 'fire';
								}
								if (card[2] == 'leisha') {
									card[2] = 'sha';
									card[3] = 'thunder';
								}
								if (card[2] == 'kamisha') {
									card[2] = 'sha';
									card[3] = 'kami';
								}
								if (card[2] == 'icesha') {
									card[2] = 'sha';
									card[3] = 'ice';
								}
								if(card[2]=='cisha'){
									card[2] = 'sha';
									card[3] = 'stab';
								}
							} else if (typeof card == 'object') {
								card = [card.suit, card.number, card.name, card.nature];
							}
							
							var cardnum = card[1] || '';
							var cardsuit = get.translation(card[0]);
							if (parseInt(cardnum) == cardnum) cardnum = parseInt(cardnum);
							if ([1, 11, 12, 13].contains(cardnum)) {
								cardnum = {
									'1': 'A',
									'11': 'J',
									'12': 'Q',
									'13': 'K'
								} [cardnum];
							}
							if (!lib.card[card[2]]) lib.card[card[2]] = {};
							var info = lib.card[card[2]];
							if (info.global && !this.classList.contains('button')) {
								if (Array.isArray(info.global)) {
									while (info.global.length) {
										game.addGlobalSkill(info.global.shift());
									}
								} else if (typeof info.global == 'string') {
									game.addGlobalSkill(info.global);
								}
								delete info.global;
							}
							if (this.name) {
								this.classList.remove('epic');
								this.classList.remove('legend');
								this.classList.remove('gold');
								this.classList.remove('unique');
								this.style.background = '';
								var subtype = get.subtype(this);
								if (subtype) {
									this.classList.remove(subtype);
								}
							}
							if (info.epic) {
								this.classList.add('epic');
							} else if (info.legend) {
								this.classList.add('legend');
							} else if (info.gold) {
								this.classList.add('gold');
							} else if (info.unique) {
								this.classList.add('unique');
							}
							var bg = card[2];
							if (info.cardimage) {
								bg = info.cardimage;
							}
							var img = lib.card[bg].image;
							if (img) {
								if (img.indexOf('db:') == 0) {
									img = img.slice(3);
								} else if (img.indexOf('ext:') != 0) {
									img = null;
								}
							}
							this.classList.remove('fullskin');
							this.classList.remove('fullimage');
							this.classList.remove('fullborder');
							this.dataset.cardName = card[2];
							this.dataset.cardType = info.type || '';
							this.dataset.cardSubype = info.subtype || '';
							this.dataset.cardMultitarget = info.multitarget ? '1': '0';
							if (this.node.name.dataset.nature) this.node.name.dataset.nature = '';
							if (!lib.config.hide_card_image && lib.card[bg].fullskin) {
								this.classList.add('fullskin');
								if (img) {
									if (img.indexOf('ext:') == 0) {
										this.node.image.setBackgroundImage(img.replace(/ext:/, 'extension/'));
									} else {
										this.node.image.setBackgroundDB(img);
									}
								} else {
									if (lib.card[bg].modeimage) {
										this.node.image.setBackgroundImage('image/mode/' + lib.card[bg].modeimage + '/card/' + bg + '.png');
									} else {
										if (bg == 'sha' && card[3] == 'stab') 
											this.node.image.setBackgroundImage('image/card/cisha.png');
										else
											this.node.image.setBackgroundImage('image/card/' + bg + '.png');
									}
								}
							// } else if (lib.card[bg].image == 'background') {
								// if (card[3]) this.node.background.setBackground(bg + '_' + card[3], 'card');
								// else this.node.background.setBackground(bg, 'card');
							} else if (lib.card[bg].fullimage) {
								this.classList.add('fullimage');
								if (img) {
									if (img.indexOf('ext:') == 0) {
										this.setBackgroundImage(img.replace(/ext:/, 'extension/'));
										this.style.backgroundSize = 'cover !important';
									} else {
										this.setBackgroundDB(img);
									}
								} else if (lib.card[bg].image) {
									if (lib.card[bg].image.indexOf('character:') == 0) {
										this.setBackground(lib.card[bg].image.slice(10), 'character');
									} else {
										this.setBackground(lib.card[bg].image);
									}
								} else {
									var cardPack = lib.cardPack['mode_' + get.mode()];
									if (Array.isArray(cardPack) && cardPack.contains(bg)) {
										this.setBackground('mode/' + get.mode() + '/card/' + bg);
									} else {
										this.setBackground('card/' + bg);
									}
								}
							} else if (lib.card[bg].fullborder) {
								this.classList.add('fullborder');
								if (lib.card[bg].fullborder == 'gold') {
									this.node.name.dataset.nature = 'metalmm';
								} else if (lib.card[bg].fullborder == 'silver') {
									this.node.name.dataset.nature = 'watermm';
								}
								if (!this.node.avatar) {
									this.node.avatar = ui.create.div('.cardavatar');
									this.insertBefore(this.node.avatar, this.firstChild);
								}
								if (!this.node.framebg) {
									this.node.framebg = ui.create.div('.cardframebg');
									this.node.framebg.dataset.auto = lib.card[bg].fullborder;
									this.insertBefore(this.node.framebg, this.firstChild);
								}
								if (img) {
									if (img.indexOf('ext:') == 0) {
										this.node.avatar.setBackgroundImage(img.replace(/ext:/, 'extension/'));
										this.node.avatar.style.backgroundSize = 'cover !important';
									} else {
										this.node.avatar.setBackgroundDB(img);
									}
								} else if (lib.card[bg].image) {
									if (lib.card[bg].image.indexOf('character:') == 0) {
										this.node.avatar.setBackground(lib.card[bg].image.slice(10), 'character');
									} else {
										this.node.avatar.setBackground(lib.card[bg].image);
									}
								} else {
									var cardPack = lib.cardPack['mode_' + get.mode()];
									if (Array.isArray(cardPack) && cardPack.contains(bg)) {
										this.node.avatar.setBackground('mode/' + get.mode() + '/card/' + bg);
									} else {
										this.node.avatar.setBackground('card/' + bg);
									}
								}
							} else if (lib.card[bg].image == 'card') {
								if (card[3]) this.setBackground(bg + '_' + card[3], 'card');
								else this.setBackground(bg, 'card');
							} else if (typeof lib.card[bg].image == 'string' && !lib.card[bg].fullskin) {
								if (img) {
									if (img.indexOf('ext:') == 0) {
										this.setBackgroundImage(img.replace(/ext:/, 'extension/'));
										this.style.backgroundSize = 'cover !important';
									} else {
										this.setBackgroundDB(img);
									}
								} else {
									this.setBackground(lib.card[bg].image);
								}
							} else {
								this.node.background.textContent = lib.translate[bg + '_cbg'] || lib.translate[bg + '_bg'] || get.translation(bg)[0];
								// if (this.node.background.innerHTML.length > 1) this.node.background.classList.add('tight');
								// else this.node.background.classList.remove('tight');
							}
							if (!lib.card[bg].fullborder && this.node.avatar && this.node.framebg) {
								this.node.avatar.remove();
								this.node.framebg.remove();
								this.node.avatar = undefined;
								this.node.framebg = undefined;
							}
							if (info.noname && !this.classList.contains('button')) {
								this.node.name.style.display = 'none';
							}
							if (info.addinfo) {
								if (!this.node.addinfo) {
									this.node.addinfo = ui.create.div('.range', this);
								}
								this.node.addinfo.innerHTML = info.addinfo;
							} else if (this.node.addinfo) {
								this.node.addinfo.remove();
								delete this.node.addinfo;
							}
							
							if (card[0] == 'heart' || card[0] == 'diamond') {
								this.node.info.classList.add('red');
							}
							
							this.node.image.className = 'image';
							
							var filename = card[2];
							var cardname = get.translation(card[2]);
							this.dataset.suit = card[0];
							this.$suitnum.$num.textContent = cardnum;
							this.$suitnum.$suit.textContent = cardsuit;
							
							if (card[2] == 'sha') {
								if (card[3] == 'fire') {
									cardname = '火' + cardname;
									filename = 'huosha';
									this.node.image.classList.add('fire');
								} else if (card[3] == 'thunder') {
									cardname = '雷' + cardname;
									filename = 'leisha';
									this.node.image.classList.add('thunder');
								} else if (card[3] == 'kami') {
									cardname = '神' + cardname;
									this.node.image.classList.add('kami');
								} else if (card[3] == 'ice') {
									cardname = '冰' + cardname;
									filename = 'bingsha';
									this.node.image.classList.add('ice');
								} else if (card[3] == 'stab') {
									name = '刺' + name;
									filename = 'cisha';
								}
							}
							
							this.$name.innerText = cardname;
							this.$vertname.innerText = cardname;
							this.$equip.$suitnum.textContent = cardsuit + cardnum;
							this.$equip.$name.textContent = ' ' + cardname;
							
							this.suit = card[0];
							this.number = parseInt(card[1]) || 0;
							this.name = card[2];
							this.classList.add('card');
							if (card[3]) {
								if (lib.nature.contains(card[3])) this.nature = card[3];
								this.classList.add(card[3]);
							} else if (this.nature) {
								this.classList.remove(this.nature);
								delete this.nature;
							}
							if (info.subtype) this.classList.add(info.subtype);
							if (this.inits) {
								for (var i = 0; i < lib.element.card.inits.length; i++) {
									lib.element.card.inits[i](this);
								}
							}
							if (typeof info.init == 'function') info.init();
							switch (get.subtype({card:this.name})) {
								case 'equip1':
									var added = false;
									if (lib.card[this.name] && lib.card[this.name].distance) {
										var dist = lib.card[this.name].distance;
										if (dist.attackFrom) {
											added = true;
											this.$range.textContent = '范围: ' + ( - dist.attackFrom + 1);
										}
									}
									if (!added) this.$range.textContent = '范围: 1';
									break;
								case 'equip3':
									if (info.distance && info.distance.globalTo) {
										this.$range.textContent = '防御: ' + info.distance.globalTo;
										this.$equip.$name.textContent += '+';
									}
									break;
								case 'equip4':
									if (info.distance && info.distance.globalFrom) {
										this.$range.textContent = '进攻: ' + ( - info.distance.globalFrom);
										this.$equip.$name.textContent += '-';
									}
									break;
								default:
									this.$range.textContent = '';
									break;
							}
							if (_status.connectMode && !game.online && lib.cardOL && !this.cardid) {
								this.cardid = get.id();
								lib.cardOL[this.cardid] = this;
							}
							
							var tags = [];
							if (!_status.connectMode && !_status.video) this.cardid = get.id();
							if (Array.isArray(card[4])) tags.addArray(card[4]);
							
							if (this.cardid) {
								if (!_status.cardtag) _status.cardtag = {};
								for (var i in _status.cardtag) if (_status.cardtag[i].contains(this.cardid)) { tags.add(i); }
								if (tags.length) {
									var tagText = '';
									for (var i = 0; i < tags.length; i++) {
										var tag = tags[i];
										if (!_status.cardtag[tag]) {
											_status.cardtag[tag] = [];
										}
										_status.cardtag[tag].add(this.cardid);
										tagText += lib.translate[tag + '_tag'];
									}
									
									this.$range.textContent = tagText;
									this.$range.classList.add('card-tag');
								}
							}
							
							var imgFormat = decadeUI.config.cardPrettify;
							if (imgFormat != 'off'){
								this.classList.add('decade-card');
								if (!this.classList.contains('infohidden')) {
									var res = dui.statics.cards;
									var asset = res[filename];
									if (res.READ_OK) {			
											//卡牌美化开始带万智牌昆特牌显示
																			if (asset == undefined && typeof lib.decade_extCardImage == "object" && typeof lib.decade_extCardImage[filename] == "string") res[filename] = asset = {
													url: lib.decade_extCardImage[filename],
													name: filename,
													loaded: true,
												};
												if (asset == undefined) {
													this.classList.remove('decade-card');
												} else {
													this.style.background = 'url("' + asset.url + '")';
													if (this.node.avatar) this.node.avatar.remove();
													if (this.node.framebg) this.node.framebg.remove();
												}
											} else {
												var url = lib.assetURL + 'extension/' + extensionName + '/image/card/' + filename + '.' + imgFormat;
												if (typeof lib.decade_extCardImage == "object" && typeof lib.decade_extCardImage[filename] == "string") url = lib.decade_extCardImage[filename];
												//卡牌美化结束
										if (!asset) {
											res[filename] = asset = {
												name: filename,
												url: undefined,			// 图片路径
												loaded: undefined, 		// 是否加载
												rawUrl: undefined, 		// 原图片地址	
											};
										}
										
										if (asset.loaded !== false) {
											if (asset.loaded == undefined) {
												var image = new Image();
												image.onload = function(){
													asset.loaded = true;
													image.onload = undefined;
												};
												
												var card = this;
												image.onerror = function(){
													asset.loaded = false;
													image.onerror = undefined;
													card.style.background = asset.rawUrl;
													card.classList.remove('decade-card');
												}
												
												asset.url = url;
												asset.rawUrl = this.style.background || this.style.backgroundImage;
												asset.image = image;
												image.src = url;
											}
											
											this.style.background = 'url("' + url + '")';
										} else {
											this.classList.remove('decade-card');
										}
									}
								}
							} else {
								this.classList.remove('decade-card');
							}
							
                            //装备栏2开始
						                       //手杀十周年装备栏
						                              // if(lib.config.extension_十周年UI_SSEquip != true){
						                                   var ele = this.getElementsByClassName("name2");
						                                   if (decadeUI.config.newDecadeStyle != 'on') {
						                                   if (!(ele.length > 1)) {
						                                       var e = ele[0].children;
						                                       var subype = this.getAttribute("data-card-subype");
						                                       var cardName = this.getAttribute("data-card-name");
						                                       if (!(e[0].nodeName == "IMG")) {
						                                           var colour = this.getAttribute("data-suit");
						                                           if (subype) {
						                                               for (var i = 0; i < e.length; i++) {
						                                                   this.style.top = ""
						                                                   e[i].style['z-index']=1;
						                                                   if (i == 0) {
						                                                       if (colour == 'heart' || colour == 'diamond') e[i].style.color = "#ef1806";
						                                                       else e[i].style.color = "#8dbede";
						                                                       e[i].style.fontSize = "12px";//花色大小
						                                                       e[i].style.marginLeft = "16.5px"; //装备花色字体整体右移
						                                                       e[i].style.position = "absolute";
						                                                       e[i].style.marginTop = "2.2px";//花色字体上下
						                                                     //  e[i].style.transform = "scale(1,1.2)";
						                                                   } else {
						                                                       if (subype == "equip3" || subype == "equip4") {
						                                                           var b = subype == "equip3" ? "pos" : "neg";
						                                                           var newele = document.createElement("img");
						                                                           newele.setAttribute("src",decadeUIPath + "/image/ass/" + b + "1.png")
						                                                           newele.style.marginLeft = "3.5px";
						                                                           newele.style.height = "80%";
						                                                           newele.style.transform = "scale(1,1)";
						                                                           if(lib.config['extension_十周年UI_shoushaNewEquip']){
						                                                               newele.style.filter=' drop-shadow(0px 0px 1.7px #000000)';
						                                                           }
						                                                           newele.onerror = function () {
						                                                               this.src = decadeUIPath + "/image/ass/weizhi.png";
						                                                               this.onerror = null;
						                                                           }
						                                                           e[0].style.left = "10%";
						                                                           e[0].parentNode.insertBefore(newele,e[0]);
						                                                           e[i].parentNode.removeChild(e[i+1]);
						                                                           continue;
						                                                       }  else {
						                                                           e[i].style.color = "#e9e8e3";
						                                                           e[i].style.position = "absolute";
						                                                           e[i].style.marginLeft = "34px";//装备字体右移
						                                                           e[i].style.marginTop = "1.8px";//装备字体上下
						                                                       }
						                                                       e[i].style.fontSize = "15px";//装备字体大小
						                                                        e[i].style.transform = "scale(0.9,0.9)";
						                                                   }
						                                       //            e[i].style.webkittextstroke= "0.7px rgba(0,0,0,0.5)";
						                                                    e[i].style.textShadow = "-1.3px 0px 2.2px #000, 0px -1.3px 2.2px #000, 1.3px 0px 2.2px #000 ,0px 1.3px 2.2px #000"; // 装备字体描边显示
						                                                   
						                                               }
						                                               if (!(subype == "equip3" || subype == "equip4")) {
						                                                   var newele = document.createElement("img");
						                                                   //newele.setAttribute("src",decadeUIPath + "/image/ass/" + cardName + ".png")
						                                               if(lib.config['extension_十周年UI_shoushaNewEquip']){
						                                                   var cardNameTra=cardName;
						                                                   if(window.tenUItraNP&&window.tenUItraNP[cardName]) {
						                                                     cardNameTra=window.tenUItraNP[cardName];
						                                                   }
						                                                 if(window.tenUIequipsList&&!window.tenUIequipsList.contains(cardNameTra)) {
						                                                   var cardNameTra=cardName.indexOf('txhj_')==-1?cardName:cardName.slice(5);
						                                                   var fileImage = lib.assetURL + "image/card/" + cardNameTra + ".png";
						                                                   if(typeof lib.card[cardName]?.image=='string') {
						                                                     var imageLoad = lib.card[cardName].image;
						                                                     if(imageLoad.indexOf('ext:')==0) {
						                                                       imageLoad = 'extension/' + imageLoad.slice(4);
						                                                     }
						                                                     fileImage = lib.assetURL + imageLoad;
						                                                   }
						                                                   //image:"ext:祖安武将/card/zhanshen_xieshen.png",
						                                                   newele.setAttribute("src", fileImage);
						                                                   newele.style.filter='grayscale(0.8) brightness(2.5) contrast(1.5) drop-shadow(0px 0px 1.7px #000000)';
						                                                   newele.style.height = "80%";
						                                                   newele.style.marginLeft = "3.5px";
						                                                   newele.style.transform='scale(1.5) translate(-1.2px, -2px)';
						                                                   newele.style.opacity='0.85';
						                                                   //newele.style.clip='rect(5px,auto,auto,5px)';
						                                                   //newele.style.position='absolute';
						                                                   //newele.style['border-radius']='50%';
						                                                   //newele.style['background-size']='150% 150%';
						                                                   //newele.style['background-position']='right right';
						                                                 }else {
						                                                   newele.setAttribute("src",decadeUIPath + "/image/ass/" + cardNameTra + ".png")
						                                                   newele.style.height = "80%";
						                                                   newele.style.marginLeft = "3.5px";
						                                                   //左移一点
						                                                   newele.style.transform='translateX(-1.2px)';
						                                                   newele.style.opacity='1';
						                                                   newele.style.filter=' drop-shadow(0px 0px 1.7px #000000)';
						                                                 }
						                                                   newele.onerror = function () {
						                                                       this.src = decadeUIPath + "/image/ass/weizhi.png";
						                                                       this.onerror = null;
						                                                       this.style.transform = "";
						                                                       this.style.filter=' drop-shadow(0px 0px 1.7px #000000)';
						                                                       this.style.opacity='1';
						                                                       //this.style['border-radius']='0%';
						                                                   }
						                                               }else {
						                                                   newele.setAttribute("src",decadeUIPath + "/image/ass/" + cardName + ".png")
						                                                   newele.style.height = "80%";
						                                                   newele.style.marginLeft = "3.5px";
						                                                   newele.onerror = function () {
						                                                       this.src = decadeUIPath + "/image/ass/weizhi.png";
						                                                       this.onerror = null;
						                                                   }
						                                               }
						                                                   if (SSEquip && e[1]) { //hela什么鬼，这都报错？
						                                                       var t = e[1].textContent.substring(1,e[1].textContent.length)
						                                                       if (SSEquip[t]) {
						                                                           e[1].textContent = SSEquip[t]
						                                                       }
						                                                   }
						                                                   e[0].parentNode.insertBefore(newele,e[0]);
						                                               }
						                                           }
						                                       } else {
						                                           if (subype) {
						                                               if (SSEquip && e[2]) { //hela什么鬼，这都报错？
						                                                   var t = e[2].textContent.substring(1,e[2].textContent.length)
						                                                   if (SSEquip[t]) {
						                                                       e[2].textContent = SSEquip[t]
						                                                       if (!(subype == "equip3" || subype == "equip4")) {
						                                                           e[0].setAttribute("src", decadeUIPath + "/image/ass/" + cardName + ".png")
						                                                           // if (cardName == "guding") e[0].style.height = "61%";
						                                                       }
						                                                   }
						                                               }
						                                               
						                                           }
						                                       }
						                                   }
						                               } else {
						                               if (!(ele.length > 1)) {
						                                       var e = ele[0].children;
						                                       var subype = this.getAttribute("data-card-subype");
						                                       var cardName = this.getAttribute("data-card-name");
						                                       if (!(e[0].nodeName == "IMG")) {
						                                           var colour = this.getAttribute("data-suit");
						                                           if (subype) {
						                                               for (var i = 0; i < e.length; i++) {
						                                                   this.style.top = ""
						                                                   e[i].style['z-index']=1;
						                                                   if (i == 0) {
						                                                       if (colour == 'heart' || colour == 'diamond') e[i].style.color = "#ef1806";
						                                                       else e[i].style.color = "#181818";
						                                                       e[i].style.fontSize = "12px";//花色大小
						                                                       e[i].style.fontFamily = "shousha";
						                                                       e[i].style.position = "absolute"; 
						                                                      // e[i].style.transform = "scale(0.7,1.1)";
						                              
						                                                       e[i].style.marginLeft = "61px"; //装备花色字体整体右移
						                                                       e[i].style.marginTop = "2px";//花色字体上下
						                                                   } else {
						                                                      
						                                                           e[i].style.color = "#392418";
						                                                           e[i].style.marginLeft = "-6.5px";
						                                                       
						                                                       e[i].style.fontSize = "13px";//装备字体大小
						                                                       
						                                                       e[i].style.position = "absolute"; 
						                                                       e[i].style.marginTop = "2px";//装备字体上下
						                                                   }
						                       e[i].style.textShadow = "-1.3px 0px 2.2px #fff3d6, 0px -1.3px 2.2px #fff3d6, 1.3px 0px 2.2px #fff3d6 ,0px 1.3px 2.2px #fff3d6"; // 装备字体描边显示
						                                                   
						                                               }
						                                                   var newele = document.createElement("img");
						                                                   if(cardName!="liulongcanjia"){
						                                                   newele.setAttribute("src",decadeUIPath + "/image/ass/decade/"+subype+".png")}else{newele.setAttribute("src",decadeUIPath + "/image/ass/decade/liulongcanjia.png")}
						                                                   newele.style.opacity = '0.83';//图标透明度
						                                                   newele.style.height = "106%";
						                                                   newele.style.width = "100%";
						                                                   //newele.style.marginLeft = "-5.5px";
						                                                   if (SSEquip) {
						                                                       var t = e[1].textContent.substring(1,e[1].textContent.length)
						                                                       if (SSEquip[t]) {
						                                                           e[1].textContent = SSEquip[t]
						                                                       }
						                                                   }
						                                                   e[0].parentNode.insertBefore(newele,e[0]);
						                                               }
						                                       } else {
						                                           if (subype) {
						                                               if (SSEquip) {
						                                                   var t = e[2].textContent.substring(1,e[2].textContent.length)
						                                                   if (SSEquip[t]) {
						                                                       e[2].textContent = SSEquip[t]
						                                                   }
						                                               }
						                                               
						                                           }
						                                       }
						                                   }
						                               }
						                           //}				                        
							//装备栏2结束

							return this;
						},
						
						updateTransform:function(bool, delay){
							if (delay) {
								var that = this;
								setTimeout(function() {
									that.updateTransform(that.classList.contains('selected'));
								}, delay);
							} else {
								if (_status.event.player != game.me) return;
								if (this._transform && this.parentNode && this.parentNode.parentNode && 
									this.parentNode.parentNode.parentNode == ui.me && (!_status.mousedown || _status.mouseleft)) {
									if (bool) {
										this.style.transform = this._transform + ' translateY(-' + (decadeUI.isMobile() ? 10: 12) + 'px)';
									} else {
										this.style.transform = this._transform || '';
									}
								}
							}
						},
					},
					
					control:{
						add:function(item){
							//哇！金色传说
							var addGoldFont=function(str,add){
                        	    if(!add) add='';
                        	    return '<span style="'+add+'background-image: linear-gradient(180deg, #f0d775 30%, #ab8c31 57%, #b0a04d 67%);	font-weight:bold; -webkit-background-clip: text; -webkit-text-fill-color: transparent; white-space: nowrap; -webkit-text-stroke: 0px rgba(38,37,34,0.5); text-shadow: none;">'+str+'</span>';
                	        }
                	        var str = get.translation(item);
                	        var gold = lib.config['extension_十周年UI_skill_control_gold'];
                	        if((!game.roundNumber&&gold=='onstart')||gold=='forever') {
                	            str = addGoldFont(str,"filter: drop-shadow(1.5px 1.5px 0px #5b6727) drop-shadow(-1px 1.5px 0px #5b6727) drop-shadow(1.5px -1px 0px #5b6727) drop-shadow(-1px -1px 0px #5b6727);");
                	        }
							var node = document.createElement('div');
							node.link = item;
							node.innerHTML = str;
							node.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.control);
							this.appendChild(node);
							this.updateLayout();
						},
						
						open:function(){
							ui.control.insertBefore(this, _status.createControl || ui.confirm);
							ui.controls.unshift(this);
							return this;
						},
						
						close:function(){
							this.remove();
							ui.controls.remove(this);
							if(ui.confirm == this) ui.confirm = null;
							if(ui.skills == this)  ui.skills  = null;
							if(ui.skills2 == this) ui.skills2 = null;
							if(ui.skills3 == this) ui.skills3 = null;
						},
						
						replace:function(){
							var items;
							var index = 0;
							var nodes = this.childNodes;
							
							if (Array.isArray(arguments[0])) {
								items = arguments[0];
							} else {
								items = arguments;
							}
							
							this.custom = undefined;
							
							for (var i = 0; i < items.length; i++){
								if (typeof items[i] == 'function') {
									this.custom = items[i];
								} else {
									if (index < nodes.length) {
										nodes[i].link = items[i];
										nodes[i].innerHTML = get.translation(items[i]);
									} else {
										this.add(items[i]);
									}
									
									index++;
								}
							}
							
							while (index < nodes.length) {
								nodes[index].remove();
							}
							
							this.updateLayout();
							ui.updatec();
							return this;
						},
						
						updateLayout:function(){
							var nodes = this.childNodes;
							if (nodes.length >= 2) {
								this.classList.add('combo-control');
								for (var i = 0; i < nodes.length; i++) nodes[i].classList.add('control');
							} else {
								this.classList.remove('combo-control');
								if (nodes.length == 1) nodes[0].classList.remove('control');
							}
						},
					},
					
					player:{
						mark:function(item, info, skill){
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
								var markText = lib.translate[item + '_bg'];
								if (!markText || markText[0] == '+' || markText[0] == '-') {
									markText = get.translation(item).substr(0, 2);
									if (decadeUI.config.playerMarkStyle != 'decade') {
										markText = markText[0];
									}
								}
									mark.text = decadeUI.element.create('mark-text', mark);
									if (lib.skill[item] && lib.skill[item].markimage) {
										markText = '　';
										mark.text.style.animation = 'none';
										mark.text.setBackgroundImage(lib.skill[item].markimage);
										mark.text.style['box-shadow'] = 'none';
										mark.text.style.backgroundPosition = 'center';
										mark.text.style.backgroundSize = 'contain';
										mark.text.style.backgroundRepeat = 'no-repeat';
										mark.text.classList.add('before-hidden');
									} 
									else if (markText.length == 2) mark.text.classList.add('small-text');
									if (lib.skill[item] && lib.skill[item].zhuanhuanji) {
										mark.text.style.animation = 'none';
										mark.text.classList.add('before-hidden');
										}
									mark.text.innerHTML = markText;
							}
							
							mark.name = item;
							mark.skill = skill || item;
							if (typeof info == 'object') {
								mark.info = info;
							} else if (typeof info == 'string') {
								mark.markidentifer = info;
							}
							
							mark.addEventListener(lib.config.touchscreen ? 'touchend': 'click', ui.click.card);
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
						},
						markCharacter:function(name, info, learn, learn2){
							if (typeof name == 'object') name = name.name;
							
							var nodeMark = ui.create.div('.card.mark');
							var nodeMarkText = ui.create.div('.mark-text', nodeMark);
							
							if (!info) info = {};
							if (!info.name) info.name = get.translation(name);
							if (!info.content) info.content = get.skillintro(name, learn, learn2);
							
							if (name.indexOf('unknown') == 0) {
								nodeMarkText.innerHTML = get.translation(name)[0];
							} else {
								if (!lib.character[name]) return console.error(name);
								var text = info.name.substr(0, 2);
								if (text.length == 2) nodeMarkText.classList.add('small-text');
								nodeMarkText.innerHTML = text;
							}
							
							nodeMark.name = name + '_charactermark';
							nodeMark.info = info;
							nodeMark.addEventListener(lib.config.touchscreen ? 'touchend': 'click', ui.click.card);
							if (!lib.config.touchscreen) {
								if (lib.config.hover_all) {
									lib.setHover(nodeMark, ui.click.hoverplayer);
								}
								if (lib.config.right_info) {
									nodeMark.oncontextmenu = ui.click.rightplayer;
								}
							}
							
							this.node.marks.appendChild(nodeMark);
							ui.updatem(this);
							return nodeMark;
						},
						markSkillCharacter: function (id, target, name, content) {
							if (typeof target == 'object') target = target.name;
							game.broadcastAll(function (player, target, name, content, id) {
								if (player.marks[id]) {
									player.marks[id].name = name + '_charactermark';
									player.marks[id].info = {
										name: name,
										content: content,
										id: id
									};
									player.marks[id].setBackground(target, 'character');
									game.addVideo('changeMarkCharacter', player, {
										id: id,
										name: name,
										content: content,
										target: target
									});
								}
								else {
									player.marks[id] = player.markCharacter(target, {
										name: name,
										content: content,
										id: id
									});
									game.addVideo('markCharacter', player, {
								name: name,
										content: content,
										id: id,
										target: target
									});
									}
									player.marks[id]._name = target;
									player.marks[id].style.setProperty('background-size', 'cover', 'important');
								}, this, target, name, content, id);
								return this;
							},
							playDynamic:function(animation, deputy){
								deputy = deputy === true;
							if (animation == undefined) return console.error('playDynamic: 参数1不能为空');
							var dynamic = this.dynamic;
							if (!dynamic) {
								dynamic = new duilib.DynamicPlayer('assets/dynamic/');
								dynamic.dprAdaptive = true;
								this.dynamic = dynamic;
								this.$dynamicWrap.appendChild(dynamic.canvas);
							} else {
								if (deputy && dynamic.deputy) {
									dynamic.stop(dynamic.deputy);
									dynamic.deputy = null;
								} else if (dynamic.primary) {
									dynamic.stop(dynamic.primary);
									dynamic.primary = null;
								}
							}
							
							if (typeof animation == 'string') animation = { name: animation };
							if (this.doubleAvatar) {
								if (Array.isArray(animation.x)) {
									animation.x = animation.x.concat();
									animation.x[1] += deputy ? 0.25 : -0.25;
								} else {
									if (animation.x == undefined) {
										animation.x = [0, deputy ? 0.75 : 0.25];
									} else {
										animation.x = [animation.x, deputy ? 0.25 : -0.25];
									}
								}
								
								animation.clip = { 
									x: [0, deputy ? 0.5 : 0],
									y: 0,
									width: [0, 0.5], 
									height:[0, 1], 
									clipParent: true
								};
							}
							
							if (this.$dynamicWrap.parentNode != this) this.appendChild(this.$dynamicWrap);
							
							dynamic.outcropMask = duicfg.dynamicSkinOutcrop;
							var avatar = dynamic.play(animation);
							if (deputy === true) {
								dynamic.deputy = avatar;
							} else {
								dynamic.primary = avatar;
							}
							
							this.classList.add(deputy ? 'd-skin2' : 'd-skin');
						},
						
						stopDynamic:function(primary, deputy){
							var dynamic = this.dynamic;
							if (!dynamic) return;
							
							primary = primary === true;
							deputy  = deputy  === true;
							
							if (primary && dynamic.primary) {
								dynamic.stop(dynamic.primary);
								dynamic.primary = null;
							} else if (deputy && dynamic.deputy) {
								dynamic.stop(dynamic.deputy);
								dynamic.deputy = null;
							} else if (!primary && !deputy) {
								dynamic.stopAll();
								dynamic.primary = null;
								dynamic.deputy = null;
							}
							
							if (!dynamic.primary && !dynamic.deputy) {
								this.classList.remove('d-skin');
								this.classList.remove('d-skin2');
								this.$dynamicWrap.remove();
							}
						},
						
						say:function(str){
							str = str.replace(/##assetURL##/g, lib.assetURL);
							
							if (!this.$chatBubble) {
								this.$chatBubble = decadeUI.element.create('chat-bubble');
							} 
							
							var bubble = this.$chatBubble;
							bubble.innerHTML = str;
							if (this != bubble.parentNode) this.appendChild(bubble);
							bubble.classList.remove('removing');
							bubble.style.animation = 'fade-in 0.3s';
							
							if (bubble.timeout) clearTimeout(bubble.timeout)
							bubble.timeout = setTimeout(function(bubble) {
								bubble.timeout = undefined;
								bubble.delete();
							}, 2000, bubble);
							
							var getNickName = function(me) {
							    if(me==game.me) {
							        return lib.config.connect_nickname;
							    }else {
							        return me.nickname;
							    }
							}
							
							var name = get.translation(this.name);
							var info = [name ? (name + '[' + getNickName(this) + ']') : getNickName(this), str];
							lib.chatHistory.push(info);
							if (_status.addChatEntry) {
								if (_status.addChatEntry._origin.parentNode) {
									_status.addChatEntry(info, false);
								} else {
									_status.addChatEntry = undefined;
								}
							}
							if (lib.config.background_speak && lib.quickVoice.indexOf(str) != -1) {
								game.playAudio('voice', (this.sex == 'female' ? 'female': 'male'), lib.quickVoice.indexOf(str));
							}
							if(lib.config.chatLogs) {
							    var currentTime = new Date(); // 创建一个表示当前日期和时间的Date对象
							    // 提取年、月、日、小时、分钟和秒数
							    var year = currentTime.getFullYear();
							    var month = currentTime.getMonth() + 1; // 注意月份从0开始计算，所以需要加上1
							    var day = currentTime.getDate();
							    var hours = currentTime.getHours();
							    var minutes = currentTime.getMinutes();
							    var seconds = currentTime.getSeconds();
							    if(minutes<10) minutes='0'+minutes;
							    if(seconds<10) seconds='0'+seconds;
							    var player=get.translation(this);
							    if(getNickName(this)) {
							        if(!this.name) player='未知武将';
							        var boldFontText=lib.config.boldFontText?'font-weight:bold':' ';
							        game.log('<span isChat=\"true\" style=\"opacity:0.7\">「'+hours+':'+minutes+':'+seconds+'」</span>','<li>','<span style=\"'+boldFontText+';color:#8BDEFF\">'+getNickName(this)+'</span>','<span style=\"opacity:0.8;color:#8BDEFF\">('+get.translation(player)+')</span>','：',str);
							    }else {
							        if(!this.name) player='匿名玩家';
							        game.log('<span isChat=\"true\" style=\"opacity:0.7\">「'+hours+':'+minutes+':'+seconds+'」</span>','<span style=\"color:#8BDEFF\">'+player+'</span>','：',str);
							    }
							}
						},
						
						/*-----------------分割线-----------------*/
						updateMark:function(name, storage){
							if (!this.marks[name]) {
								if (lib.skill[name] && lib.skill[name].intro && (this.storage[name] || lib.skill[name].intro.markcount)) {
									this.markSkill(name);
									if (!this.marks[name]) return this;
								} else {
									return this;
								}
							}
							
							var mark = this.marks[name];
							if (storage && this.storage[name]) this.syncStorage(name);
							if (lib.skill[name] && lib.skill[name].intro && !lib.skill[name].intro.nocount && (this.storage[name] || lib.skill[name].intro.markcount)) {
								var num = 0;
								if (typeof lib.skill[name].intro.markcount == 'function') {
									num = lib.skill[name].intro.markcount(this.storage[name], this);
								/*-----------------分割线-----------------*/
								} else if (lib.skill[name].intro.markcount == 'expansion') {
									num = this.countCards('x', (card) => card.hasGaintag(name));
								
								} else if (typeof this.storage[name + '_markcount'] == 'number') {
									num = this.storage[name + '_markcount'];
								} else if (name == 'ghujia') {
									num = this.hujia;
								} else if (typeof this.storage[name] == 'number') {
									num = this.storage[name];
								} else if (Array.isArray(this.storage[name])) {
									num = this.storage[name].length;
								} /*else if (typeof this.storage[name] == 'boolean') {
									num = this.storage[name] ? '+' : '-';
								}
								*/
								
								if (num) {
									if (!mark.markcount) mark.markcount = decadeUI.element.create('mark-count', mark);
									mark.markcount.textContent = num;
								} else if (mark.markcount) {
									mark.markcount.delete();
									mark.markcount = undefined;
								}
							} else {
							if (mark.markcount) {
								mark.markcount.delete();
								mark.markcount = undefined;
							}
							
							if (lib.skill[name].mark == 'auto') {
								this.unmarkSkill(name);
							}
						}
						
						return this;
					},
					
					/***********************分割线**********************/
					/*
					updateMark: function (name, storage) {
					
						if (!this.marks[name]) {
							if (lib.skill[name] && lib.skill[name].intro && (this.storage[name] || lib.skill[name].intro.markcount)) {
								this.markSkill(name);
								if (!this.marks[name]) return this;
							} else {
								return this;
							}
						}

						var mark = this.marks[name];
						if (storage && this.storage[name]) this.syncStorage(name);
						if (lib.skill[name] && lib.skill[name].intro && !lib.skill[name].intro.nocount && (this.storage[name] || lib.skill[name].intro.markcount)){
						
							var num = 0;
							if (typeof lib.skill[name].intro.markcount == 'function') {
									num = lib.skill[name].intro.markcount(this.storage[name], this);
								} else if (typeof this.storage[name + '_markcount'] == 'number') {
									num = this.storage[name + '_markcount'];
								} else if (name == 'ghujia') {
									num = this.hujia;
								} else if (typeof this.storage[name] == 'number') {
									num = this.storage[name];
								} else if (Array.isArray(this.storage[name])) {
									num = this.storage[name].length;
								} else if (typeof this.storage[name] == 'boolean') {
									num = this.storage[name] ? '+' : '-';
								}
								
								for (var i in lib.skill[name]) {
									if (i=='zhuanhuanji') {
										if (lib.skill[name][i]) {
											num='-';
											mark.markcount = decadeUI.element.create('mark-count', mark);
											mark.markcount.textContent = num;
										}
									}
								}
								if (num) {
									if (!mark.markcount) mark.markcount = decadeUI.element.create('mark-count', mark);
									mark.markcount.textContent = num;
								} else if (mark.markcount) {
									mark.markcount.delete();
									mark.markcount = undefined;
								}
							} else {
								if (mark.markcount) {
									mark.markcount.delete();
									mark.markcount = undefined;
								}
								
								if (lib.skill[name].mark == 'auto') {
									this.unmarkSkill(name);
								}
								for (var i in lib.skill[name]) {
									if (i=='zhuanhuanji') {
										if (lib.skill[name][i]) {
											num='+';
											mark.markcount = decadeUI.element.create('mark-count', mark);
											mark.markcount.textContent = num;
										}
									}
								}
							}
							
							return this;
						},
						*/
						/*-----------------分割线-----------------*/

        						$dieAfter:function(){
        							this.stopDynamic();

        							if (!decadeUI.config.playerDieEffect) {
        								if (base.lib.element.player.$dieAfter) base.lib.element.player.$dieAfter.apply(this, arguments);
        								return;
        							}

        							if(!this.node.dieidentity) this.node.dieidentity = ui.create.div('died-identity', this);
        							this.node.dieidentity.classList.add('died-identity');

        							var that = this;
        							var image = new Image();
									var identity = decadeUI.getPlayerIdentity(this);
									if(game.storyBgMode=='paiwei') {
									    if(identity=='friend') {
									        identity='enemy';
									    }else if(identity=='enemy'){
									        identity='friend';
									    }
									}
		
		
									
									/*-----------------分割线-----------------*/
								    // 不同阵亡图片样式
									if (decadeUI.config.newDecadeStyle == 'on') {
        							var url = extensionPath + 'image/decoration/dead_' + identity + '.png'; 
        							} else {
        							var num=[0,1].randomGet();
        		                    if(num==0){
        		                        var url = extensionPath + 'image/decoration/dead_likai_' + identity + '.png';
        		                    }else{
        		                        var url = extensionPath + 'image/decoration/dead_new_' + identity + '.png';
    		                        }
    		                        if(this==game.me) url = extensionPath + 'image/decoration/dead_me.png';
    		                        }
        							    image.onerror = function(){
        								that.node.dieidentity.innerHTML = decadeUI.getPlayerIdentity(that, that.identity, true) + '<br>阵亡';
        							};
        							var num = [0, 1].randomGet();
                                    if (num == 1) {
                                        if (lib.config.extension_十周年UI_newDecadeStyle == 'on') {
                                            that.node.dieidentity.innerHTML = '<div style="width:40.2px; height:20px; left:0px; top:-32px; position:absolute; background-image: url(' + lib.assetURL + 'extension/十周年UI/assets/image/likai_1.png);background-size: 100% 100%;"></div>';
                                        }
                                    } else {
                                        that.node.dieidentity.innerHTML = '';
                                    }
        							that.node.dieidentity.style.backgroundImage = 'url("' + url + '")';
        							image.src = url;
        							setTimeout(function(){
        								var rect = that.getBoundingClientRect();
        								if (lib.config.extension_十周年UI_newDecadeStyle == 'off') {
        								decadeUI.animation.playSpine('SS_zhenwang', {
        									x: rect.left + rect.width / 1.8,
        									y: decadeUI.get.bodySize().height - rect.top - rect.height / 2 + 1,
        									scale: 0.8,
        								})} else
        								if (lib.config.extension_十周年UI_newDecadeStyle == 'on') {
        								decadeUI.animation.playSpine('SZN_zhenwang', {
        									x: rect.left + rect.width / 2 - 7,
        									y: decadeUI.get.bodySize().height - rect.top - rect.height / 2 + 1,
        									scale: 0.8,
        								});}
        							}, 250);
        						},
						
						$skill:function(name, type, color, avatar){
							if (!decadeUI.config.gameAnimationEffect || !decadeUI.animation.gl) return base.lib.element.player.$skill.apply(this, arguments);
							var _this = this;
							if (typeof type != 'string') type = 'legend';
							
							game.addVideo('skill', this, [name, type, color, avatar]);
							game.broadcastAll(function(player, type, name, color, avatar){
									if (window.decadeUI == void 0) {
										game.delay(2.5);
										if (name) player.$fullscreenpop(name, color, avatar);
										return;
									}
									
									decadeUI.delay(2500);
									if (name) decadeUI.effect.skill(player, name, avatar);
								}, _this, type, name, color, avatar);
							},
							$syncExpand: function (map) {
								if(this!=game.me) return;
								if (base.lib.element.player.$syncExpand) base.lib.element.player.$syncExpand.apply(this, arguments);
								ui.equipSolts.back.innerHTML = new Array(5 + Object.values(this.expandedSlots).reduce((previousValue, currentValue) => previousValue + currentValue, 0)).fill('<div></div>').join('');
							},
						},
						
				}
			};

			ride.ui = {
				updatec:function(){
					var controls = ui.control.childNodes;
					var stayleft;
					var offsetLeft;
					for (var i = 0; i < controls.length; i++) {
						if (!stayleft && controls[i].stayleft) {
							stayleft = controls[i];
						} else if (!offsetLeft) {
							offsetLeft = controls[i].offsetLeft;
						}
						
						if (stayleft && offsetLeft) break;
					}
					
					if (stayleft) {
						if (ui.$stayleft != stayleft) {
							stayleft._width = stayleft.offsetWidth
							ui.$stayleft = stayleft;
						}
						
						if (offsetLeft < stayleft._width) {
							stayleft.style.position = 'static';
						} else {
							stayleft.style.position = 'absolute';
						}
					}
				},
				
				updatehl:function(){
					dui.queueNextFrameTick(dui.layoutHand, dui);
				},
				
				updatej:function(player){
					if (!player) return;
				
					var judges = player.node.judges.childNodes;
					for (var i = 0; i < judges.length; i++){
						if (judges[i].classList.contains('removing'))
							continue;
						
						judges[i].classList.remove('drawinghidden');
						if (_status.connectMode) {
							if (judges[i].viewAs){
								judges[i].node.judgeMark.node.judge.innerHTML = get.translation(judges[i].viewAs)[0];
							} else {
								judges[i].node.judgeMark.node.judge.innerHTML = get.translation(judges[i].name)[0];
							}
						}
					}
				},
				
				updatem:function(player){
					// 不需要
				},
				
				updatez:function(){
					//666盐都不盐了
					window.documentZoom = game.documentZoom;
					/*document.body.style.zoom = game.documentZoom;
					document.body.style.width = '100%';
					document.body.style.height = '100%';
					document.body.style.transform = '';*/
					var width=document.documentElement.offsetWidth;
        			var height=document.documentElement.offsetHeight;
        			var zoom=game.documentZoom;
        			if(zoom!=1){
        				document.body.style.width=width/zoom+'px';
        				document.body.style.height=height/zoom+'px';
        				document.body.style.transform='scale('+zoom+')';
        			}
        			else{
        				document.body.style.width=width+'px';
        				document.body.style.height=height+'px';
        				document.body.style.transform='';
        			}
				},
				
				update:function(){
					for (var i = 0; i < ui.updates.length; i++) ui.updates[i]();
					if (ui.dialog == undefined || ui.dialog.classList.contains('noupdate')) return;
					if (game.chess) return base.ui.update();
	
					//变过去
					if ((!ui.dialog.buttons || !ui.dialog.buttons.length) && !ui.dialog.forcebutton && ui.dialog.classList.contains('fullheight') == false && get.mode() != 'stone') {
						ui.dialog.classList.add('prompt');
						if(ui.dialog.changeToGoldTitleDialog) {
						    ui.dialog.changeToGoldTitleDialog(false);
						}
						/*if(ui.dialog.changGoldTitle&&ui.dialog.changGoldTitle.from&&ui.dialog.changGoldTitle.to&&!ui.dialog.changGoldTitle.back) {
						    ui.dialog.changGoldTitle.back=ui.dialog.changGoldTitle.from.innerHTML;
						    ui.dialog.changGoldTitle.from.innerHTML=ui.dialog.changGoldTitle.to;
						    if(ui.dialog.changGoldTitle.deletes&&ui.dialog.changGoldTitle.deletes.length) {
						        ui.dialog.changGoldTitle.deletes.forEach(node=>{
						            node.style.display='none';
						        });
						    }
						}*/
					} else {//变回来
						ui.dialog.classList.remove('prompt');
						var height = ui.dialog.content.offsetHeight;
						if (decadeUI.isMobile())
							height = decadeUI.get.bodySize().height * 0.75 - 80;
						else
							height = decadeUI.get.bodySize().height * 0.45;
							
						ui.dialog.style.height = Math.min(height, ui.dialog.content.offsetHeight + (ui.dialog.contentContainer.classList.contains('contentContainerFixed')?45:0)) + 'px';
						if(ui.dialog.changeToGoldTitleDialog) {
						    ui.dialog.changeToGoldTitleDialog(true);
						}
						/*if(ui.dialog.changGoldTitle&&ui.dialog.changGoldTitle.from&&ui.dialog.changGoldTitle.back) {
						    ui.dialog.changGoldTitle.from.innerHTML=ui.dialog.changGoldTitle.back;
						    if(ui.dialog.changGoldTitle.deletes&&ui.dialog.changGoldTitle.deletes.length) {
						        ui.dialog.changGoldTitle.deletes.forEach(node=>{
						            node.style.display='block';
						        });
						    }
						    ui.dialog.changGoldTitle.back=undefined;
						}*/
					}
					
					if (!ui.dialog.forcebutton && !ui.dialog._scrollset) {
						ui.dialog.classList.remove('scroll1');
						ui.dialog.classList.remove('scroll2');
					} else {
						ui.dialog.classList.add('scroll1');
						ui.dialog.classList.add('scroll2');
					}
				},
				
				create:{
					rarity:function(button){
								var rarity = game.getRarity(button.link);
								var intro = button.node.intro;
								intro.classList.add('showintro');
								intro.classList.add('rarity');
								if (intro.innerText)
									intro.innerText = '';

								if (lib.config.extension_十周年UI_newDecadeStyle == 'on') {
								intro.style.backgroundImage = 'url("' + decadeUIPath + 'assets/image/rarity_' + rarity + '.png")';} else {
								intro.style.backgroundImage = 'url("' + decadeUIPath + 'assets/image/rarity_' + rarity + '2.png")';}
								if ((button.link == 'xushu' || button.link == 'xin_xushu') && button.node && button.node.name && button.node.group) {
									if (button.classList.contains('newstyle')) {
										button.node.name.dataset.nature = 'watermm';
										button.node.group.dataset.nature = 'water';
									} else {
										button.node.group.style.backgroundColor = get.translation('weiColor');
									}
								}
							},

					button:function(item, type, position, noclick, node){
						if (type != 'character' && type != 'characterx') {
							var button = base.ui.create.button.apply(this, arguments);
							if (position) position.appendChild(button);
							return button;
						}
						
						if (node) {
							node.classList.add('button');
							node.classList.add('character');
							node.classList.add('decadeUI');
							node.style.display = '';
						} else {
							node = ui.create.div('.button.character.decadeUI');
						}
						
						node._link = item;
						if (type =='characterx') {
							if (_status.noReplaceCharacter) {
								type = 'character';
							} else if (lib.characterReplace[item] && lib.characterReplace[item].length) {
								item = lib.characterReplace[item].randomGet();
							}
						}
						
						node.link = item;
						var doubleCamp = get.is.double(node._link, true);
						var character = dui.element.create('character', node);
						
						if (doubleCamp) node._changeGroup = true;
						if (type=='characterx' && lib.characterReplace[node._link] && lib.characterReplace[node._link].length > 1) {
							node._replaceButton = true;
						}
						
						node.refresh = function(node, item, intersection){
							if (intersection) {
								node.awaitItem = item;
								intersection.observe(node);
								// node.setBackground(item, 'character');
							} else {
								node.setBackground(item, 'character');
							}
							
							if (node.node) {
								node.node.name.remove();
								node.node.hp.remove();
								node.node.group.remove();
								node.node.intro.remove();
								if (node.node.replaceButton) node.node.replaceButton.remove();
							}
							node.node = {
								name: decadeUI.element.create('name', node),
								hp: decadeUI.element.create('hp', node),
								group: decadeUI.element.create('identity', node),
								intro: decadeUI.element.create('intro', node),
							};
							var infoitem = lib.character[item];
							if (!infoitem) {
								for (var itemx in lib.characterPack) {
									if (lib.characterPack[itemx][item]) {
										infoitem = lib.characterPack[itemx][item];
										break;
									}
								}
							}
							
							node.node.name.innerHTML = get.slimName(item).replace(/<br>/g, '\n');
							if (lib.config.buttoncharacter_style == 'default' || lib.config.buttoncharacter_style == 'simple') {
								if (lib.config.buttoncharacter_style == 'simple') {
									node.node.group.style.display = 'none';
								}
								node.classList.add('newstyle');
								node.node.name.dataset.nature = get.groupnature(get.bordergroup(infoitem));
								node.node.group.dataset.nature = get.groupnature(get.bordergroup(infoitem), 'raw');
								ui.create.div(node.node.hp);
								var hp=get.infoHp(infoitem[2]),maxHp=get.infoMaxHp(infoitem[2]),hujia=get.infoHujia(infoitem[2]);
								var check=((get.mode()=='guozhan'||get.config('double_character'))&&(_status.connectMode||get.mode()=='single'||get.config('double_hp')=='pingjun'));
								var str=get.numStr(hp/(check?2:1));
								if(hp!=maxHp){
									str+='/';
									str+=get.numStr(maxHp/(check?2:1));
								}
								var textnode=ui.create.div('.text',str,node.node.hp);
								if(infoitem[2]==0){
									node.node.hp.hide();
								}
								else if(get.infoHp(infoitem[2])<=3){
									node.node.hp.dataset.condition='mid';
								}
								else{
									node.node.hp.dataset.condition='high';
								}
								if(hujia>0){
									ui.create.div(node.node.hp,'.shield');
									ui.create.div('.text',get.numStr(hujia),node.node.hp);
								}
							} else {
								var hp = get.infoHp(infoitem[2]);
								var maxHp = get.infoMaxHp(infoitem[2]);
								var shield = get.infoHujia(infoitem[2]);
								if (maxHp > 14) {
									if (typeof infoitem[2] == 'string') node.node.hp.innerHTML = infoitem[2];
									else node.node.hp.innerHTML = get.numStr(infoitem[2]);
									node.node.hp.classList.add('text');
								} else {
									for (var i = 0; i < maxHp; i++) {
										var next = ui.create.div('', node.node.hp);
										if (i >= hp) next.classList.add('exclude');
									}
									for(var i=0;i<shield;i++){
										ui.create.div(node.node.hp,'.shield');
									}
								}
							}
							if (node.node.hp.childNodes.length == 0) {
								node.node.name.style.top = '8px';
							}
							if (node.node.name.querySelectorAll('br').length >= 4) {
								node.node.name.classList.add('long');
								if (lib.config.buttoncharacter_style == 'old') {
									node.addEventListener('mouseenter', ui.click.buttonnameenter);
									node.addEventListener('mouseleave', ui.click.buttonnameleave);
								}
							}
							
							node.node.intro.innerText = lib.config.intro;
							if (!noclick) lib.setIntro(node);
							if (infoitem[1]) {
								if (doubleCamp) {
									var text = '';
									node.node.group.innerHTML = doubleCamp.reduce((previousValue, currentValue) => `${previousValue}<div data-nature="${get.groupnature(currentValue)}">${get.translation(currentValue)}</div>`, '');
									if (doubleCamp.length > 4) if (new Set([5, 6, 9]).has(doubleCamp.length)) node.node.group.style.height = '48px';
									else node.node.group.style.height = '64px';
								}
								else node.node.group.innerHTML = `<div>${get.translation(infoitem[1])}</div>`;
								node.node.group.style.backgroundColor = get.translation(`${get.bordergroup(infoitem)}Color`);
							}
							else {
								node.node.group.style.display = 'none';
							}
							if (node._replaceButton) {
								var intro = ui.create.div('.button.replaceButton', node);
								node.node.replaceButton = intro;
								intro.innerText = '切换';
								intro._node = node;
								intro.addEventListener(lib.config.touchscreen ? 'touchend': 'click', function() {
									_status.tempNoButton = true;
									var node = this._node;
									var list = lib.characterReplace[node._link];
									var link = node.link;
									var index = list.indexOf(link);
									if (index == list.length - 1) index = 0;
									else index++;
									link = list[index];
									node.link = link;
									node.refresh(node, link);
									setTimeout(function(_status) { _status.tempNoButton = undefined; }, 200, _status);
								});
							}
						};
				
						node.refresh(node, item, position ? position.intersection : undefined);
						if (!noclick) {
							node.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.button);
						} else {
							node.classList.add('noclick');
							if (node.querySelector('.intro')) {
								node.querySelector('.intro').remove();
							}
						}
						
						for (var i in lib.element.button) node[i] = lib.element.button[i];
                if (position) position.appendChild(node);

                return node;
        },
					
					buttons:function(list, type, position, noclick, zoom){
						var buttons = [];
						var pre = (type.substr(0,3) == 'pre');
						if (pre) {
							if (!_status.prebutton) {
								_status.prebutton = [];
								lib.onfree.push(function(){
									for (var i = 0; i < _status.prebutton.length; i++) {
										if (_status.prebutton[i].activate) {
											_status.prebutton[i].activate();
										}
									}
									_status.prebutton = undefined;
								});
							}
						}
						
						var fragment = document.createDocumentFragment();
						if (position && position.intersection) {
							fragment.intersection = position.intersection;
						}
						
						for (var i = 0; i < list.length; i++) {
							if (pre) {
								buttons.push(ui.create.prebutton(list[i], type.slice(3), fragment, noclick));
							} else {
								buttons.push(ui.create.button(list[i], type, fragment, noclick));
							}
						}
						
						if (position && fragment.childElementCount) position.appendChild(fragment);
						return buttons;
					},
					
					/*-----------------分割线-----------------*/
					/* 修复手杀UI不兼容问题，fly佬提供方法
					confirm:function(str, func){
						if (ui.confirm && ui.confirm.str == str) return;
						
						switch (str) {
							case 'o':
								if (ui.confirm) {
									ui.confirm.replace('ok');
								} else {
									ui.confirm = ui.create.control('ok');
								}
								break;
								
							case 'oc':
							case 'co':
								if (ui.confirm) {
									ui.confirm.replace('ok', 'cancel');
								} else {
									ui.confirm = ui.create.control('ok', 'cancel');
								}
								break;
								
							case 'c':
								if (ui.confirm) {
									ui.confirm.replace('cancel');
								} else {
									ui.confirm = ui.create.control('cancel');
								}
								break;
								
							default:
								if (ui.confirm) {
									ui.confirm.close();
									ui.confirm = undefined;
								}
								break;
						}
						
						if (ui.confirm) {
							ui.confirm.str = str;
							if (func) {
								ui.confirm.custom = func;
							} else {
								ui.confirm.custom = undefined;
							}
						}
					},
					*/
					/*-----------------分割线-----------------*/
					
					control:function(){
						var i, controls;
						var nozoom = false;
						if (Array.isArray(arguments[0])) {
							controls = arguments[0];
						} else {
							controls = arguments;
						}
						
						var control = document.createElement('div');
						control.className = 'control';
						control.style.opacity = 1;
						for (i in lib.element.control) control[i] = lib.element.control[i];
						for (i = 0; i < controls.length; i++) {
							if (typeof controls[i] == 'function') {
								control.custom = controls[i];
							} else if (controls[i] == 'nozoom') {
								nozoom = true;
							} else if (controls[i] == 'stayleft') {
								control.stayleft = true;
								control.classList.add('stayleft');
							} else {
								control.add(controls[i]);
							}
						}
						ui.controls.unshift(control);
						ui.control.insertBefore(control, _status.createControl || ui.confirm);
						control.addEventListener(lib.config.touchscreen ? 'touchend': 'click', ui.click.control2);
						return control;
					},
					
					dialog:function(){
						var i;
						var hidden = false;
						var notouchscroll = false;
						var forcebutton = false;
						var noforcebutton = false;
						var dialog = decadeUI.element.create('dialog');
						dialog.contentContainer = decadeUI.element.create('content-container', dialog);
						dialog.content = decadeUI.element.create('content', dialog.contentContainer);
						dialog.buttons = [];
						for (i in lib.element.dialog) dialog[i] = lib.element.dialog[i];
						//这里插入一个检测，如果存在'notouchscroll'类型的就屏蔽金色字体
						if(lib.config.dialog_gold_title) for (i = 0; i < arguments.length; i++) {
							if (arguments[i] == 'notouchscroll') dialog.isNoTouch=true;
						}
						for (i = 0; i < arguments.length; i++) {
							if (typeof arguments[i] == 'boolean') dialog.static = arguments[i];
							else if (arguments[i] == 'hidden') hidden = true;
							else if (arguments[i] == 'notouchscroll') notouchscroll = true;
							else if (arguments[i] == 'forcebutton') forcebutton = true;
							else if (arguments[i] == 'noforcebutton') noforcebutton = true;
							else dialog.add(arguments[i]);
						}
						if (!hidden) dialog.open();
						if (!lib.config.touchscreen) dialog.contentContainer.onscroll = ui.update;
						if (!notouchscroll) {
							dialog.contentContainer.ontouchstart = ui.click.dialogtouchStart;
							dialog.contentContainer.ontouchmove = ui.click.touchScroll;
							dialog.contentContainer.style.WebkitOverflowScrolling = 'touch';
							dialog.ontouchstart = ui.click.dragtouchdialog;
						}
						if(noforcebutton){
        					dialog.noforcebutton=true;
        				}
						if (forcebutton) {
							dialog.forcebutton = true;
							dialog.classList.add('forcebutton');
						}
						//进度条修改
						if(game.initJinDuTiao&&_status.event&&_status.event.player&&game.me&&game.me.name&&!game.forbidResumeJinDu) {
			                game.initJinDuTiao(_status.event.player);
			            }
						return dialog;
					},
					
					selectlist:function(list, init, position, onchange){
						var select = document.createElement('select');
						for (var i = 0; i < list.length; i++) {
							var option = document.createElement('option');
							if (Array.isArray(list[i])) {
								option.value = list[i][0];
								option.innerText = list[i][1];
							} else {
								option.value = list[i];
								option.innerText = list[i];
							}
							if (init == option.value) option.selected = 'selected';
							select.appendChild(option);
						}
						if (position) position.appendChild(select);
						if (onchange) select.onchange = onchange;
						return select;
					},
				},
				
				click:{
					card:function(e){
						delete this._waitingfordrag;
						if (_status.dragged) return;
						if (_status.clicked) return;
						if (ui.intro) return;
						_status.clicked = true;
						if (this.parentNode && (this.parentNode.classList.contains('judges') || this.parentNode.classList.contains('dui-marks'))) {
							if (!(e && e instanceof MouseEvent)) {
								var rect = this.getBoundingClientRect();
								e = {
									clientX: (rect.left + 10) * game.documentZoom,
									clientY: (rect.top+ 10) * game.documentZoom,
								};
							}
							
							ui.click.touchpop();
                                    var dialog = ui.click.intro.call(this, e);
                                    if (this.parentNode.classList.contains('judges')) {
                                        dialog.style.height = '340px';
                                        dialog.setCaption(get.translation(this.getAttribute('keywards')))
                                        dialog.add(this.cloneNode(true))
                                    }
                                    /*ui.click.intro.call(this, e);*///坤坤对照，取消这一句，换成上面的
							_status.clicked = false;
							return;
						}
						var custom = _status.event.custom;
						if (custom.replace.card) {
							custom.replace.card(this);
							return;
						}
						if (this.classList.contains('selectable') == false) return;
						if (this.classList.contains('selected')) {
							ui.selected.cards.remove(this);
							if (_status.multitarget || _status.event.complexSelect) {
								game.uncheck();
								game.check();
							} else {
								this.classList.remove('selected');
								this.updateTransform();
							}
						} else {
							ui.selected.cards.add(this);
							this.classList.add('selected');
							this.updateTransform(true);
						}
						if (game.chess && get.config('show_range') && !_status.event.skill && this.classList.contains('selected') && _status.event.isMine() && _status.event.name == 'chooseToUse') {
							var player = _status.event.player;
							var range = get.info(this).range;
							if (range) {
								if (typeof range.attack === 'number') {
									player.createRangeShadow(Math.min(8, player.getAttackRange(true) + range.attack - 1));
								} else if (typeof range.global === 'number') {
									player.createRangeShadow(Math.min(8, player.getGlobalFrom() + range.global));
								}
							}
						}
						if (custom.add.card) {
							custom.add.card();
						}
						game.check();

						if (lib.config.popequip && get.is.phoneLayout() && arguments[0] != 'popequip' && ui.arena && ui.arena.classList.contains('selecting') && this.parentNode.classList.contains('popequip')) {
							var rect = this.getBoundingClientRect();
							ui.click.touchpop();
							ui.click.intro.call(this.parentNode, {
								clientX: rect.left + 18,
								clientY: rect.top + 12
							});
						}
					},
				},
				
				
			};
			
			ride.game = {
				addOverDialog:function(dialog, result){
					var sprite = decadeUI.backgroundAnimation.current;
					if (!(sprite && sprite.name == 'skin_xiaosha_default')) return;
					
					decadeUI.backgroundAnimation.canvas.style.zIndex = 7;
					switch (result) {
						case '战斗胜利':
							sprite.scaleTo(1.8, 600);
							sprite.setAction('shengli');
							break;
						case '平局':
						case '战斗失败':
							if (!duicfg.rightLayout) sprite.flipX = true;
							
							sprite.moveTo([0, 0.5], [0, 0.25], 600);
							sprite.scaleTo(2.5, 600);
							sprite.setAction('gongji');
							break;
					}
				},
				
				
				expandSkills:function(skills){
					var expands = [];
					var info;
					for(var i = 0; i < skills.length; i++){
						info = get.info(skills[i]);
						if (info) {
							if(info.group) {
								expands.add(info.group);
							}
						} else{
							console.log(skills[i]);
						}
					}
					
					var i, j;
					for (i = 0; i < expands.length; i++) {
						if (Array.isArray(expands[i])) {
							for (j = 0; j < expands[i].length; j++) {
								skills.add(expands[i][j]);
							}
						} else {
							skills.add(expands[i]);
						}
					}
					return skills;
				},
				
				gameDraw:function(){
					decadeUI.delay(100);
					return base.game.gameDraw.apply(game, arguments);
				},
				
				loop:function(){
					if (game.loopLocked) return;
					if (decadeUI.eventDialog) {
						decadeUI.game.wait();
						return;
					}
					
					game.loopLocked = true;
					var loop;
					do {
						loop = decadeUI.game.loop(_status);
						game.looping = false;
					} while (loop);
					game.loopLocked = false;
				},
			};
			
			ride.get = {
				objtype:function(obj){
					obj = Object.prototype.toString.call(obj);
					switch (obj) {
						case '[object Array]':
							return 'array';
						case '[object Object]':
							return 'object';
						case '[object HTMLDivElement]':
							return 'div';
						case '[object HTMLTableElement]':
							return 'table';
						case '[object HTMLTableRowElement]':
							return 'tr';
						case '[object HTMLTableCellElement]':
							return 'td';
						case '[object HTMLBodyElement]':
							return 'td';
					}
				},
			}
			
			override(lib, ride.lib);
			override(ui, ride.ui);
			override(game, ride.game);
			override(get, ride.get);
			
			decadeUI.get.extend(decadeUI, duilib);
			if (decadeModule.modules)
				for (var i = 0; i < decadeModule.modules.length; i++)
					decadeModule.modules[i](lib, game, ui, get, ai, _status);

			var getNodeIntro = get.nodeintro;
			var gameLinexyFunction = game.linexy;
		    var gameUncheckFunction = game.uncheck;
			var swapControlFunction = game.swapControl;
		    var swapPlayerFunction = game.swapPlayer;
			var baseChooseCharacter = game.chooseCharacter;
		    var createArenaFunction = ui.create.arena;
			var createPauseFunction = ui.create.pause;
			var createMenuFunction = ui.create.menu;
			var initCssstylesFunction = lib.init.cssstyles;
			var initLayoutFunction = lib.init.layout;
			
			var cardCopyFunction = lib.element.card.copy;
			var playerInitFunction = lib.element.player.init;
			var playerUninitFunction = lib.element.player.uninit;
			var playerAddSkillFunction = lib.element.player.addSkill;
			var playerRemoveSkillFunction = lib.element.player.removeSkill
			var playerUpdateFunction = lib.element.player.update;
			var playerChooseTargetFunction = lib.element.player.chooseTarget;
			var playerThrowFunction = lib.element.player.$throw;
			var playerDrawFunction = lib.element.player.$draw;
			var playerDieFlipFunction = lib.element.player.$dieflip;
			
			ui.updatejm = function (player, nodes, start, inv) {
				if (typeof start != 'number') start = 0;
				
				for (var i = 0; i < nodes.childElementCount; i++) {
					var node = nodes.childNodes[i];
					if (i < start) {
						node.style.transform = '';
					} else if (node.classList.contains('removing')) {
						start++;
					} else {
						node.classList.remove('drawinghidden');
					}
				}
			};
			
			ui.updatexr = duilib.throttle(ui.updatex, 100, ui);
			document.body.onresize = ui.updatexr;
			
			get.infoHp = function(hp){
				if (typeof hp == 'number') {
					return hp;
				} else if (typeof hp == 'string') {
					var index = hp.indexOf('/');
					if (index >= 0) hp = hp.slice(0, hp.indexOf('/'));
					if (hp == 'Infinity' || hp == '∞') {
						return Infinity;
					} else {
						return parseInt(hp);
					}
				}

				return 0;
			};
			
			get.infoMaxHp = function(hp){
				if (typeof hp == 'number') {
					return hp;
				} else if (typeof hp == 'string') {
					var index = hp.indexOf('/');
					if (index >= 0) hp = hp.slice(hp.indexOf('/') + 1);
					if (hp == 'Infinity' || hp == '∞') {
						return Infinity;
					} else {
						return parseInt(hp);
					}
						
				}

				return 0;
			};
			
			get.skillState = function (player) {
				var skills = base.get.skillState.apply(this, arguments);
				if (game.me != player) {
					var global = skills.global = skills.global.concat();
					for (var i = global.length - 1; i >= 0; i--) {
						if (global[i].indexOf('decadeUI') >= 0) global.splice(i, 1);
					}
				}
				return skills;
			};
			/*转移至meihua.js*/
			/*game.check = function(event){
				var i, j, range;
				if (event == undefined) event = _status.event;
				var custom = event.custom || {};
				var ok = true,
				auto = true;
				var player = event.player;
				var auto_confirm = lib.config.auto_confirm;
				var players = game.players.slice(0);
				if (event.deadTarget) players.addArray(game.dead);
				if (!event.filterButton && !event.filterCard && !event.filterTarget && (!event.skill || !event._backup)) {
					if (event.choosing) {
						_status.imchoosing = true;
					}
					return;
				}
				player.node.equips.classList.remove('popequip');
				if (event.filterButton) {
					var dialog = event.dialog;
					range = get.select(event.selectButton);
					var selectableButtons = false;
					if (event.forceAuto && ui.selected.buttons.length == range[1]) auto = true;
					else if (range[0] != range[1] || range[0] > 1) auto = false;
					for (i = 0; i < dialog.buttons.length; i++) {
						if (dialog.buttons[i].classList.contains('unselectable')) continue;
						if (event.filterButton(dialog.buttons[i], player) && lib.filter.buttonIncluded(dialog.buttons[i])) {
							if (ui.selected.buttons.length < range[1]) {
								dialog.buttons[i].classList.add('selectable');
							} else if (range[1] == -1) {
								dialog.buttons[i].classList.add('selected');
								ui.selected.buttons.add(dialog.buttons[i]);
							} else {
								dialog.buttons[i].classList.remove('selectable');
							}
						} else {
							dialog.buttons[i].classList.remove('selectable');
							if (range[1] == -1) {
								dialog.buttons[i].classList.remove('selected');
								ui.selected.buttons.remove(dialog.buttons[i]);
							}
						}
						if (dialog.buttons[i].classList.contains('selected')) {
							dialog.buttons[i].classList.add('selectable');
						} else if (!selectableButtons && dialog.buttons[i].classList.contains('selectable')) {
							selectableButtons = true;
						}
					}
					if (ui.selected.buttons.length < range[0]) {
						if (!event.forced || selectableButtons) {
							ok = false;
						}
						if (event.complexSelect || event.getParent().name == 'chooseCharacter' || event.getParent().name == 'chooseButtonOL') {
							ok = false;
						}
					}
					if (custom.add.button) {
						custom.add.button();
					}
				}
				if (event.filterCard) {
					if (ok == false) {
						game.uncheck('card');
					} else {
						var cards = player.getCards(event.position);
						var firstCheck = false;
						range = get.select(event.selectCard);
						if (!event._cardChoice && typeof event.selectCard != 'function' && !event.complexCard && range[1] != -1 && !lib.config.compatiblemode) {
							event._cardChoice = [];
							firstCheck = true;
						}
						if (event.isMine() && event.name == 'chooseToUse' && event.parent.name == 'phaseUse' && !event.skill && !event._targetChoice && !firstCheck && window.Map && !lib.config.compatiblemode) {
							event._targetChoice = new Map();
							for (var i = 0; i < event._cardChoice.length; i++) {
								if (!lib.card[event._cardChoice[i].name].complexTarget) {
									var targets = [];
									for (var j = 0; j < players.length; j++) {
										if (event.filterTarget(event._cardChoice[i], player, players[j])) {
											targets.push(players[j]);
										}
									}
									event._targetChoice.set(event._cardChoice[i], targets);
								}
							}
						}
						
						var selectableCards = false;
						if (range[0] != range[1] || range[0] > 1) auto = false;
						for (i = 0; i < cards.length; i++) {
							if (lib.config.cardtempname != 'off') {
								var cardname = get.name(cards[i]);
								var cardnature = get.nature(cards[i]);
								var cardsuit = get.suit(cards[i]);
								var cardnumber = get.number(cards[i]);
								if ((cards[i].name != cardname) || (cards[i].nature != cardnature) || (cards[i].suit != cardsuit) || (cards[i].number != cardnumber)){
									if(lib.config.extension_十周年UI_showTemp){
										if (!cards[i]._tempName) cards[i]._tempName = ui.create.div('.temp-name', cards[i]);
										var tempname = '';
										if (cards[i].suit != cardsuit) {
											var suitData = {
												'heart': "<span style='color:red;text-shadow:black 0 0 3px;'>"+get.translation('heart')+"</span>",
												'diamond': "<span style='color:red;text-shadow:black 0 0 3px;'>"+get.translation('diamond')+"</span>",
												'spade': "<span style='color:black;text-shadow:black 0 0 3px;'>"+get.translation('spade')+"</span>",
												'club': "<span style='color:black;text-shadow:black 0 0 3px;'>"+get.translation('club')+"</span>",
												'none': "<span style='color:white;text-shadow:black 0 0 3px;'>"+get.translation('none')+"</span>"
											};
											tempname += suitData[cardsuit];
										}
										if (cards[i].number != cardnumber) {
											tempname += "<b>" + cardnumber + "</b>";
										}
										if ((cards[i].name != cardname) || (cards[i].nature != cardnature)) {
											var tempname2 = get.translation(cardname);
											if (cardnature) {
												cards[i]._tempName.dataset.nature = cardnature;
												if (cardname == 'sha') {
													tempname2 = get.translation(cardnature) + tempname2;
												}
											}
											tempname += tempname2;
										}
	
										cards[i]._tempName.innerHTML = tempname;
										cards[i]._tempName.tempname = tempname;
									}
									else{
										var node=ui.create.cardTempName(cards[i]);
										var cardtempnameConfig=lib.config.cardtempname;
										if(cardtempnameConfig!=='default') node.classList.remove('vertical');
									}
								}
							}
							
							var nochess = true;
							if (!lib.filter.cardAiIncluded(cards[i])) {
								nochess = false;
							} else if (event._cardChoice && !firstCheck) {
								if (!event._cardChoice.contains(cards[i])) {
									nochess = false;
								}
							} else {
								if (player.isOut() || !lib.filter.cardRespondable(cards[i], player) || cards[i].classList.contains('uncheck') || !event.filterCard(cards[i], player)) {
									nochess = false;
								}
							}
							if (nochess) {
								if (ui.selected.cards.length < range[1]) {
									cards[i].classList.add('selectable');
									if (event._cardChoice && firstCheck) {
										event._cardChoice.push(cards[i]);
									}
								} else if (range[1] == -1) {
									cards[i].classList.add('selected');
									cards[i].updateTransform(true);
									ui.selected.cards.add(cards[i]);
								} else {
									cards[i].classList.remove('selectable');
								}
							} else {
								cards[i].classList.remove('selectable');
								if (range[1] == -1) {
									cards[i].classList.remove('selected');
									cards[i].updateTransform();
									ui.selected.cards.remove(cards[i]);
								}
							}
							if (cards[i].classList.contains('selected')) {
								cards[i].classList.add('selectable');
							} else if (!selectableCards && cards[i].classList.contains('selectable')) {
								selectableCards = true;
							}
						}
						if (ui.selected.cards.length < range[0]) {
							if (!event.forced || selectableCards || event.complexSelect) {
								ok = false;
							}
						}
					}
					if (custom.add.card) {
						custom.add.card();
					}
				}
				if (event.filterTarget) {
					if (ok == false) {
						game.uncheck('target');
					} else {
						var card = get.card();
						var firstCheck = false;
						range = get.select(event.selectTarget);
						var selectableTargets = false;
						if (range[0] != range[1] || range[0] > 1) auto = false;
						for (i = 0; i < players.length; i++) {
							var nochess = true;
							if (game.chess && !event.chessForceAll && player && get.distance(player, players[i], 'pure') > 7) {
								nochess = false;
							} else if (players[i].isOut()) {
								nochess = false;
							} else if (event._targetChoice && event._targetChoice.has(card)) {
								var targetChoice = event._targetChoice.get(card);
								if (!Array.isArray(targetChoice) || !targetChoice.contains(players[i])) {
									nochess = false;
								}
							} else if (!event.filterTarget(card, player, players[i])) {
								nochess = false;
							}
							if (nochess) {
								if (ui.selected.targets.length < range[1]) {
									players[i].classList.add('selectable');
									if (Array.isArray(event._targetChoice)) {
										event._targetChoice.push(players[i]);
									}
								} else if (range[1] <= -1) {
									players[i].classList.add('selected');
									ui.selected.targets.add(players[i]);
								} else {
									players[i].classList.remove('selectable');
								}
							} else {
								players[i].classList.remove('selectable');
								if (range[1] <= -1) {
									players[i].classList.remove('selected');
									ui.selected.targets.remove(players[i]);
								}
							}
							
							if (players[i].classList.contains('selected')) {
								players[i].classList.add('selectable');
							} else if (!selectableTargets && players[i].classList.contains('selectable')) {
								selectableTargets = true;
							}
							
							if (players[i].classList.contains('selected') || players[i].classList.contains('selectable')) {
								players[i].classList.remove('un-selectable');
							} else {
								players[i].classList.add('un-selectable');
							}
							
							if (players[i].instance) {
								if (players[i].classList.contains('selected')) {
									players[i].instance.classList.add('selected');
								} else {
									players[i].instance.classList.remove('selected');
								}
								if (players[i].classList.contains('selectable')) {
									players[i].instance.classList.add('selectable');
								} else {
									players[i].instance.classList.remove('selectable');
								}
							}
						}
						if (ui.selected.targets.length < range[0]) {
							if (!event.forced || selectableTargets || event.complexSelect) {
								ok = false;
							}
						}
						if (range[1] <= -1 && ui.selected.targets.length == 0 && event.targetRequired) {
							ok = false;
						}
					}
					if (custom.add.target) {
						custom.add.target();
					}
				}
				if (!event.skill && get.noSelected() && !_status.noconfirm) {
					var skills = [],
					enable,
					info;
					var skills2;
					if (event._skillChoice) {
						skills2 = event._skillChoice;
						for (var i = 0; i < skills2.length; i++) {
							if (event.isMine() || !event._aiexclude.contains(skills2[i])) {
								skills.push(skills2[i]);
							}
						}
					} else {
						var skills2;
						if (get.mode() == 'guozhan' && player.hasSkillTag('nomingzhi', false, null, true)) {
							skills2 = player.getSkills(false, true, false);
						} else {
							skills2 = player.getSkills('invisible', true, false);
						}
						skills2 = game.filterSkills(skills2.concat(lib.skill.global), player, player.getSkills('e').concat(lib.skill.global));
						event._skillChoice = [];
						game.expandSkills(skills2);
						for (i = 0; i < skills2.length; i++) {
							info = get.info(skills2[i]);
							enable = false;
							if (typeof info.enable == 'function') enable = info.enable(event);
							else if (typeof info.enable == 'object') enable = info.enable.contains(event.name);
							else if (info.enable == 'phaseUse') enable = (event.type == 'phase');
							else if (typeof info.enable == 'string') enable = (info.enable == event.name);
							
							if (enable) {
								if (!game.expandSkills(player.getSkills(false).concat(lib.skill.global)).contains(skills2[i]) && (info.noHidden || get.mode()!='guozhan' || player.hasSkillTag('nomingzhi',false,null,true))) enable=false;
								if(info.filter && !info.filter(event,player)) enable=false;
								if (info.viewAs && typeof info.viewAs != 'function' && event.filterCard && !event.filterCard(info.viewAs, player, event)) enable = false;
								if (info.viewAs && typeof info.viewAs != 'function' && info.viewAsFilter && info.viewAsFilter(player) == false) enable = false;
								
								if (info.usable && get.skillCount(skills2[i]) >= info.usable) enable = false;
								if (info.chooseButton && _status.event.noButton) enable = false;
								if (info.round && (info.round - (game.roundNumber - player.storage[skills2[i] + '_roundcount']) > 0)) enable = false;
							}
							
							if (enable) {
								if (event.isMine() || !event._aiexclude.contains(skills2[i])) {
									skills.add(skills2[i]);
								}
								event._skillChoice.add(skills2[i]);
							}
						}
					}

					var globalskills = [];
					var globallist = lib.skill.global.slice(0);
					game.expandSkills(globallist);
					for (var i = 0; i < skills.length; i++) {
						if (globallist.contains(skills[i])) {
							globalskills.push(skills.splice(i--, 1)[0]);
						}
					}
					var equipskills = [];
					var ownedskills = player.getSkills('invisible', false);
					game.expandSkills(ownedskills);
					for (var i = 0; i < skills.length; i++) {
						if (!ownedskills.contains(skills[i])) {
							equipskills.push(skills.splice(i--, 1)[0]);
						}
					}
					if (equipskills.length) {
						ui.create.skills3(equipskills);
					} else if (ui.skills3) {
						ui.skills3.close();
					}
					if (skills.length) {
						ui.create.skills(skills);
					} else if (ui.skills) {
						ui.skills.close();
					}
					if (globalskills.length) {
						ui.create.skills2(globalskills);
					} else if (ui.skills2) {
						ui.skills2.close();
					}
				} else {
					if (ui.skills) {
						ui.skills.close()
					}
					if (ui.skills2) {
						ui.skills2.close()
					}
					if (ui.skills3) {
						ui.skills3.close()
					}
				}
				_status.multitarget = false;
				var skillinfo = get.info(_status.event.skill);
				if (_status.event.name == 'chooseToUse') {
					if (skillinfo && skillinfo.multitarget && !skillinfo.multiline) {
						_status.multitarget = true;
					}
					if ((skillinfo && skillinfo.viewAs && typeof skillinfo.viewAs != 'function') || !_status.event.skill) {
						var cardinfo = get.info(get.card());
						if (cardinfo && cardinfo.multitarget && !cardinfo.multiline) {
							_status.multitarget = true;
						}
					}
				} else if (_status.event.multitarget) {
					_status.multitarget = true;
				}
				if (event.isMine()) {
					if (game.chess && game.me && get.config('show_distance')) {
						for (var i = 0; i < players.length; i++) {
							if (players[i] == game.me) {
								players[i].node.action.hide();
							} else {
								players[i].node.action.show();
								var dist = get.distance(game.me, players[i], 'pure');
								var dist2 = get.distance(game.me, players[i]);
								players[i].node.action.innerHTML = '距离：' + dist2 + '/' + dist;
								if (dist > 7) {
									players[i].node.action.classList.add('thunder');
								} else {
									players[i].node.action.classList.remove('thunder');
								}
							}
						}
					}
					if (ok && (!event.filterOk || event.filterOk()) && auto && (auto_confirm || (skillinfo && skillinfo.direct)) && (!_status.mousedragging || !_status.mouseleft) && !_status.mousedown && !_status.touchnocheck) {
						if (ui.confirm) {
							if (!skillinfo || !skillinfo.preservecancel) {
								ui.confirm.close();
							}
						}
						if (skillinfo && skillinfo.preservecancel && !ui.confirm) {
							ui.create.confirm('c');
						}
						if (event.skillDialog == true) event.skillDialog = false;
						ui.click.ok();
						_status.mousedragging = null;
					} else {
						ui.arena.classList.add('selecting');
						if (event.filterTarget && (!event.filterCard || !event.position || (typeof event.position == 'string' && event.position.indexOf('e') == -1))) {
							ui.arena.classList.add('tempnoe');
						}
						game.countChoose();
						if (!_status.noconfirm && !_status.event.noconfirm) {
							if (!_status.mousedown || _status.mouseleft) {
								var str = '';
								if (ok && (!event.filterOk || event.filterOk())) str += 'o';
								if (!event.forced && !event.fakeforce && get.noSelected()) str += 'c';
								ui.create.confirm(str);
							}
						}
					}
					if (ui.confirm && ui.confirm.lastChild.link == 'cancel') {
						if (_status.event.type == 'phase' && !_status.event.skill) {
							
							// 弹出按钮 根据手杀ui选项开关调用不同样式
							if (lib.config['extension_手杀ui_yangShi'] == 'on') {
								ui.confirm.lastChild.innerHTML = '结束出牌';
							} else if (lib.config['extension_手杀ui_yangShi'] == 'off') {
								ui.confirm.lastChild.innerHTML = '回合结束';
							} else {
								ui.confirm.lastChild.innerHTML = '结束';
							}
							
						} else {
							ui.confirm.lastChild.innerHTML = '取消';
						}
					}
				}
				return ok;
			};*/
			/*转移至meihua.js*/
			
			game.uncheck = function(){
				var i, j;
				if (game.chess) {
					var shadows = ui.chessContainer.getElementsByClassName('playergrid temp');
					while (shadows.length) {
						shadows[0].remove();
					}
				}
				
				if(lib.config.enable_touchdragline) {
					// 拖拽指示线修复Helasisy
					// 在现有代码中找到这两个地方：
                    _status.mousedragging = null;
                    _status.mousedragorigin = null;
                    
                    // 在这两个赋值语句后添加：
                    if(ui.ctx&&ui.canvas) ui.ctx.clearRect(0, 0, ui.canvas.width, ui.canvas.height);
                    if(ui.canvas) ui.canvas.width = ui.canvas.width; // 可选强制清空
                }
				var args = new Array(arguments.length);
				for (var i = 0; i < args.length; i++) args[i] = arguments[i];
				if ((args.length == 0 || args.contains('card')) && _status.event.player) {
					var cards = _status.event.player.getCards('hejs');
					for (j = 0; j < cards.length; j++) {
						cards[j].classList.remove('selected');
						cards[j].classList.remove('selectable');
						if (cards[j]._tempName) {
							cards[j]._tempName.innerHTML = '';
						}
						cards[j].updateTransform();
					}
					ui.selected.cards.length = 0;
					_status.event.player.node.equips.classList.remove('popequip');
				}
				var players = game.players.slice(0);
				if (_status.event.deadTarget) players.addArray(game.dead);
				if ((args.length == 0 || args.contains('target'))) {
					for (j = 0; j < players.length; j++) {
						players[j].classList.remove('selected');
						players[j].classList.remove('selectable');
						players[j].classList.remove('un-selectable');
						if (players[j].instance) {
							players[j].instance.classList.remove('selected');
							players[j].instance.classList.remove('selectable');
						}
					}
					ui.selected.targets.length = 0;
				}
				if ((args.length == 0 || args.contains('button')) && _status.event.dialog && _status.event.dialog.buttons) {
					for (j = 0; j < _status.event.dialog.buttons.length; j++) {
						_status.event.dialog.buttons[j].classList.remove('selectable');
						_status.event.dialog.buttons[j].classList.remove('selected');
					}
					ui.selected.buttons.length = 0;
				}
				if (args.length == 0) {
					ui.arena.classList.remove('selecting');
					ui.arena.classList.remove('tempnoe');
					_status.imchoosing = false;
					_status.lastdragchange.length = 0;
					_status.mousedragging = null;
					_status.mousedragorigin = null;

					while (ui.touchlines.length) {
						ui.touchlines.shift().delete();
					}
				}
				
				for (var i = 0; i < players.length; i++) {
					players[i].unprompt();
				}
				for (var i = 0; i < _status.dragline.length; i++) {
					if (_status.dragline[i]) _status.dragline[i].remove();
				}
				ui.arena.classList.remove('dragging');
				_status.dragline.length = 0;
			};
			
			game.swapPlayer = function(player, player2){
				var result = swapPlayerFunction.call(this, player, player2);
	/*-----------------分割线-----------------*/
			// 单独装备栏
			if (lib.config.extension_十周年UI_aloneEquip && lib.config.extension_十周年UI_newDecadeStyle == 'on') {
				if (game.me && game.me != ui.equipSolts.me) {
					ui.equipSolts.me.appendChild(ui.equipSolts.equips);
					ui.equipSolts.me = game.me;
					ui.equipSolts.equips = game.me.node.equips;
					ui.equipSolts.appendChild(game.me.node.equips);
				}
			}
			
				return result;
			};
			
			game.swapControl = function(player){
				var result = swapControlFunction.call(this, player);
			/*-----------------分割线-----------------*/
			// 单独装备栏
			if (lib.config.extension_十周年UI_aloneEquup) {
				if (game.me && game.me != ui.equipSolts.me) {
					ui.equipSolts.me.appendChild(ui.equipSolts.equips);
					ui.equipSolts.me = game.me;
					ui.equipSolts.equips = game.me.node.equips;
					ui.equipSolts.appendChild(game.me.node.equips);
				}
			}
			
				return result;
			};
			
			game.linexy = function(path){
				if (!decadeUI.config.playerLineEffect) return gameLinexyFunction.apply(this, arguments);
				decadeUI.effect.line(path);
			};
			
			ui.click.intro = function(e){
				if (this.classList.contains('infohidden') || _status.dragged) return;
                _status.clicked = true;
                if (this.classList.contains('player') && !this.name) return;
                if (this.parentNode == ui.historybar){
                    if (ui.historybar.style.zIndex == '22'){
                        if (_status.removePop){
                            if (_status.removePop(this) == false) return;
                        } else {
                            return;
                        }
                    }
                    ui.historybar.style.zIndex = 22;
                }
				
                var uiintro = uiintro || get.nodeintro(this, false, e);
                if (!uiintro) return;
                uiintro.classList.add('popped');
                uiintro.classList.add('static');
                //标记详情金色字体修复！——Helasisy
                if(uiintro.changeToGoldTitleDialog) {
				    uiintro.changeToGoldTitleDialog(false);
				}
                /*if(uiintro.changGoldTitle&&uiintro.changGoldTitle.from&&uiintro.changGoldTitle.to) {
				    uiintro.changGoldTitle.from.innerHTML=uiintro.changGoldTitle.to;
				    if(uiintro.changGoldTitle.deletes&&uiintro.changGoldTitle.deletes.length) {
				        uiintro.changGoldTitle.deletes.forEach(node=>{
				            node.remove();
				        });
				    }
				}*/
                ui.window.appendChild(uiintro);
                var layer = ui.create.div('.poplayer', ui.window);
                var clicklayer = function(e){
                    if (_status.touchpopping) return;
                    delete _status.removePop;
                    uiintro.delete();
                    this.remove();
                    ui.historybar.style.zIndex = '';
                    delete _status.currentlogv;
                    if (!ui.arena.classList.contains('menupaused') && !uiintro.noresume) game.resume2();
                    if (e && e.stopPropagation) e.stopPropagation();
                    if (uiintro._onclose){
                        uiintro._onclose();
                    }
                    return false;
                };
                
                layer.addEventListener(lib.config.touchscreen ? 'touchend': 'click', clicklayer);
                if (!lib.config.touchscreen) layer.oncontextmenu = clicklayer;
                if (this.parentNode == ui.historybar && lib.config.touchscreen){
                    var rect = this.getBoundingClientRect();
                    e = {
                        clientX: 0,
                        clientY: rect.top + 30
                    };
                }
				
				lib.placePoppedDialog(uiintro, e, this);
				if (this.parentNode == ui.historybar){
					if (lib.config.show_history == 'right'){
						uiintro.style.left = (ui.historybar.offsetLeft - 230) + 'px';
					} else {
						uiintro.style.left = (ui.historybar.offsetLeft + 60) + 'px';
					}
				}
				
				uiintro.style.zIndex = 21;
                var clickintro = function(){
                    if (_status.touchpopping) return;
                    delete _status.removePop;
                    layer.remove();
                    this.delete();
                    ui.historybar.style.zIndex = '';
                    delete _status.currentlogv;
                    if (!ui.arena.classList.contains('menupaused') && !uiintro.noresume) game.resume2();
                    if (uiintro._onclose){
                        uiintro._onclose();
                    }
                };
                var currentpop = this;
                _status.removePop = function(node){
                    if (node == currentpop) return false;
                    layer.remove();
                    uiintro.delete();
                    _status.removePop = null;
                    return true;
                };
                if (uiintro.clickintro){
                    uiintro.listen(function(){
                        _status.clicked = true;
                    });
                    uiintro._clickintro = clicklayer;
                } else if (!lib.config.touchscreen){
                    uiintro.addEventListener('mouseleave', clickintro);
                    uiintro.addEventListener('click', clickintro);
                } else if (uiintro.touchclose){
                    uiintro.listen(clickintro);
                }
                uiintro._close = clicklayer;
            
                game.pause2('pop');
                return uiintro;
            };
            
            ui.click.identity = function(e){
                if (_status.dragged || !game.getIdentityList || _status.video || this.parentNode.forceShown) return;
				_status.clicked = true;
                var identityList = game.getIdentityList(this.parentNode);
                if (!identityList) return;
                //屏蔽特殊模式
                //if (get.config('identity_mode')&&get.config('identity_mode')=='purple') return;
				
				if (lib.config.mark_identity_style == 'click') {
					var getNext = false;
					var theNext;
					var key;
					var current = this.firstChild.innerText;
					
					for (key in identityList) {
						if (theNext == null || getNext) {
							theNext = key;
							if (getNext) break;
						}
						
						if (current == identityList[key]) getNext = true;
					}
					
					this.parentNode.setIdentity(theNext);
					
                } else {
                    if (get.mode() == 'guozhan') {
                        identityList = {
                            wei: '魏',
                            shu: '蜀',
                            wu: '吴',
                            qun: '群',
							jin: '晋',
							ye: "野",
                        };
						if (_status.forceKey) identityList.key = '键';
                    }
                    
					if (!dui.$identityMarkBox) {
						dui.$identityMarkBox = decadeUI.element.create('identity-mark-box');
						//身份场身份标记框位置调整
						if (get.mode() == 'identity') {
						    dui.$identityMarkBox.style.width = '100%';
						    dui.$identityMarkBox.style.height = '100%';
							dui.$identityMarkBox.style.top = '0%';
							dui.$identityMarkBox.style.left = '1%';
						}
						// 国战势力标记框位置调整
						if (get.mode() == 'guozhan') {
						    dui.$identityMarkBox.style.width = '100%';
						    dui.$identityMarkBox.style.height = '100%';
							dui.$identityMarkBox.style.top = '0%';
							dui.$identityMarkBox.style.left = '1%';
						}
						// 谋攻篇模式身份标记框位置调整（预更新）
						if (get.mode() == 'th_mougong') {
						    dui.$identityMarkBox.style.width = '100%';
						    dui.$identityMarkBox.style.height = '100%';
							dui.$identityMarkBox.style.top = '0%';
							dui.$identityMarkBox.style.left = '1%';
						}
						
						dui.$identityMarkBox.ondeactive = function(){
							dui.$identityMarkBox.remove();
							_status.clicked = false;
							if (!ui.arena.classList.contains('menupaused')) game.resume2();
						}
					}
					
					var index = 0;
					var node;
					var nodes = dui.$identityMarkBox.childNodes;
					//alert(identityList);
					var purpleKeyTra={
					    'cai':'cai_blue',
					    'cai2':'cai',
					    'rZhong':'qianfeng',
					    'rNei':'xizuo',
					    'rYe':'ye',
					    'bZhong':'qianfeng_blue',
					    'bNei':'xizuo_blue',
					    'bYe':'ye_blue',
					};
					for (key in identityList) {
						node = nodes[index];
						if (!node) {
							node = decadeUI.element.create('identity-mark-item', dui.$identityMarkBox);
							if (get.mode() == 'guozhan') {
							node.style.width = '32%';
							node.style.height = '25%';
							node.style.margin = '5% 5%';
						}
						if (lib.config.mode == 'identity' && get.config('identity_mode') != 'zhong') {
							node.style.width = '32%';
							node.style.height = '25%';
							node.style.margin = '16.5% 7%';
						}
						if (lib.config.mode == 'identity' && get.config('identity_mode') == 'zhong') {
							node.style.width = '32%';
							node.style.height = '25%';
							node.style.margin = '5.5% 7%';
						}
						if (get.mode() == 'th_mougong') {
							node.style.width = '32%';
							node.style.height = '25%';
							node.style.margin = '0% 5%';
						}
							node.addEventListener(lib.config.touchscreen ? 'touchend': 'click', function(){
								this.player.setIdentity(this.link);
								dui.$identityMarkBox.remove();
								_status.clicked = false;
							});
						} else {
							node.style.display = '';
						}
						var imgkey=key;
						if(get.config('identity_mode')&&get.config('identity_mode')=='purple') {
						    if(purpleKeyTra[key]) imgkey=purpleKeyTra[key];
						}
					    var extensionPath = lib.assetURL + 'extension/十周年UI/';
					    if (lib.config.extension_十周年UI_newDecadeStyle == 'off') {
       				    var url = extensionPath + 'image/decoration/identity_new_' + imgkey + '.png';
 				        if (get.mode() == 'guozhan') url = extensionPath + 'image/decoration/camp_new_' + key + '.png';
 				        if (get.mode() == 'taixuhuanjing') {
     				             var url = extensionPath + 'image/decoration/identity_tx_' + key + '.png';
   				        }
                    }
            else {
                 var url = extensionPath + 'image/decoration/identity_' + key + '.png';
                 if (get.mode() == 'guozhan') url = extensionPath + 'image/decoration/camp_' + key + '.png';
            }
            node.style.backgroundImage ='url("' + url + '")';
						node.link = key;
						node.player = this.parentNode;
						//node.innerText = identityList[key];
						index++;
					}
					
					while (index < nodes.length) {
						nodes[index].style.display = 'none';
						index++;
					}
					
					game.pause2();
					setTimeout(function(player){ 
						player.appendChild(dui.$identityMarkBox);
						dui.set.activeElement(dui.$identityMarkBox); 
					}, 0, this.parentNode);
				}
				
				
            };
			
			ui.click.volumn = function(){
				if(game.initJinDuTiao&&game.me&&game.me.name&&!game.forbidPauseJinDu) {
			        game.initJinDuTiao('pause');
			    }
				var setting = ui.create.dialog('hidden');
				//防止变金色传说
				setting.isNoTouch=true;
				setting.listen(function(e) {
					e.stopPropagation();
				});
				
				var backVolume = decadeUI.component.slider(0, 8, parseInt(lib.config.volumn_background));
				var gameVolume = decadeUI.component.slider(0, 8, parseInt(lib.config.volumn_audio));
				
				backVolume.onchange = function(){
					game.saveConfig('volumn_background', backVolume.value);
					ui.backgroundMusic.volume = backVolume.value / 8;
				};
				
				gameVolume.onchange = function(){
					game.saveConfig('volumn_audio', gameVolume.value);
				};
				
				setting.add('背景音量');
				setting.content.appendChild(backVolume);
				setting.add('游戏音量');
				setting.content.appendChild(gameVolume);
				setting.add(ui.create.div('.placeholder'));
				return setting;
			};
			
			ui.create.pause = function(){
				var dialog = createPauseFunction.call(this);
				dialog.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
				return dialog;
			};
				
			ui.clear = function(){
				game.addVideo('uiClear');
				var nodes = document.getElementsByClassName('thrown');
				for(var i = nodes.length - 1; i >= 0; i--){
				    if (nodes[i].fixed)
				        continue;
				    
				    if (nodes[i].classList.contains('card')){
				        decadeUI.layout.clearout(nodes[i]);
					}else{
					    nodes[i].delete();
					}
				}
			};
			
			// if ((typeof ui.create.menu) == 'function') {
				// var str = ui.create.menu.toString();
				// str = str.substring(str.indexOf('{'));
				// str = str.replace(/game\.documentZoom|1\.3/g, '1');
				// createMenuFunction = new Function('connectMenu', '_status','lib','game','ui','get','ai', str);
			// }
			
			// ui.create.menu = function(connectMenu){
				// return createMenuFunction.call(this, connectMenu, _status, lib, game, ui, get, ai);
			// };
			
			ui.create.arena = function(){
				ui.updatez();
				var result = createArenaFunction.apply(this, arguments);
				ui.arena.classList.remove('slim_player'); 
				ui.arena.classList.remove('uslim_player');
				ui.arena.classList.remove('mslim_player');
				ui.arena.classList.remove('lslim_player');
				ui.arena.classList.remove('oldlayout');
				ui.arena.classList.remove('mobile');
				ui.arena.classList.add('decadeUI');
				ui.control.id = 'dui-controls';
				
				decadeUI.config.update();
				return result;
			};
			
			ui.create.me = function(hasme) {
                        ui.arena.dataset.layout = game.layout;

                        ui.mebg = ui.create.div('#mebg', ui.arena);
                        ui.me = ui.create.div('.hand-wrap', ui.arena);
                        ui.handcards1Container = decadeUI.element.create('hand-cards', ui.me);
                        ui.handcards1Container.dataset.borders=lib.config['extension_十周年UI_cardBorder'];
                        ui.handcards1Container.onmousewheel = decadeUI.handler.handMousewheel;

                        ui.handcards2Container = ui.create.div('#handcards2');
                        ui.arena.classList.remove('nome');
                        //开始				
                        if (lib.config.mousewheel && !lib.config.touchscreen) {
                            ui.handcards1Container.onmousewheel = decadeUI.handler.handMousewheel;
                            ui.handcards2Container.onmousewheel = ui.click.mousewheel;
                        }
                        //结束				
                        var equipSolts = ui.equipSolts = decadeUI.element.create('equips-wrap');
                        equipSolts.back = decadeUI.element.create('equips-back', equipSolts);

                        for (let repetition = 0; repetition < 5; repetition++) {
                            decadeUI.element.create(null, equipSolts.back);
                        }

                        ui.arena.insertBefore(equipSolts, ui.me);
                        decadeUI.bodySensor.addListener(decadeUI.layout.resize);
                        decadeUI.layout.resize();

                        ui.handcards1Container.ontouchstart = ui.click.touchStart;
                        ui.handcards2Container.ontouchstart = ui.click.touchStart;
                        //开始
                        ui.handcards1Container.ontouchmove = decadeUI.handler.touchScroll;
                        ui.handcards2Container.ontouchmove = decadeUI.handler.touchScroll;
                        //结束
                        ui.handcards1Container.style.WebkitOverflowScrolling = 'touch';
                        ui.handcards2Container.style.WebkitOverflowScrolling = 'touch';

                        if (hasme && game.me) {
                            ui.handcards1 = game.me.node.handcards1;
                            ui.handcards2 = game.me.node.handcards2;
                            ui.handcards1Container.appendChild(ui.handcards1);
                            ui.handcards2Container.appendChild(ui.handcards2);
                        } else if (game.players.length) {
                            game.me = game.players[0];
                            ui.handcards1 = game.me.node.handcards1;
                            ui.handcards2 = game.me.node.handcards2;
                            ui.handcards1Container.appendChild(ui.handcards1);
                            ui.handcards2Container.appendChild(ui.handcards2);
                        }
                        
                        
                        //创造玩家时修正昵称分配的问题
				if(game.me.nickname&&game.hasPlayer(function(current){
				    return !current.nickname;
				})) {
				    var noname=game.filterPlayer(function(current){
				        return !current.nickname;
			    	})[0];
				    noname.nickname=game.me.nickname;
				    if(window.rzsh_djj&&window.rzsh_djj[noname.nickname]) {
					    noname.guanjie=window.rzsh_djj[noname.nickname];
				    }
				    if(window.rzsh_lv&&window.rzsh_lv[noname.nickname]) {
					    noname.level=window.rzsh_lv[noname.nickname];
				    }
				    game.me.nickname='无主之魂';
				    game.me.guanjie='dayuanshuai';
				    game.me.level=220;
				}
				
			/*-----------------分割线-----------------*/
			if (lib.config.extension_十周年UI_aloneEquip && lib.config.extension_十周年UI_newDecadeStyle == 'on') {
				if (game.me){
					equipSolts.me = game.me;
					equipSolts.equips = game.me.node.equips;
					equipSolts.appendChild(game.me.node.equips);
				}
			}
			
			};
			
			ui.create.player = function(position, noclick){
				var player = ui.create.div('.player', position);
				var playerExtend = {
					node: {
						avatar: ui.create.div('.primary-avatar', player, ui.click.avatar).hide(),
						avatar2: ui.create.div('.deputy-avatar', player, ui.click.avatar2).hide(),
						turnedover: decadeUI.element.create('turned-over', player),
						framebg: ui.create.div('.framebg', player),
						intro: ui.create.div('.intro', player),
						identity: ui.create.div('.identity', player),
						hp: ui.create.div('.hp', player),
						//------创造位置-----//
						long: ui.create.div('.long', player),
						wei: ui.create.div('.wei', player),
						//-------分割线------//
						name: ui.create.div('.name', player),
						name2: ui.create.div('.name.name2', player),
						nameol: ui.create.div('.nameol', player),
						count: ui.create.div('.card-count', player),
						equips: ui.create.div('.equips', player).hide(),
						judges: ui.create.div('.judges', player),
						marks: decadeUI.element.create('dui-marks', player),
						chain: decadeUI.element.create('chain', player),
						handcards1: ui.create.div('.handcards'),
						handcards2: ui.create.div('.handcards'),
						expansions: ui.create.div('.expansions'),
					},
					phaseNumber: 0,
					invisibleSkills: [],
					skipList: [],
					skills: [],
					initedSkills: [],
					additionalSkills: {},
					disabledSkills: {},
					hiddenSkills: [],
					awakenedSkills: [],
					forbiddenSkills: {},
					popups: [],
					damagepopups: [],
					judging: [],
					stat: [{
						card: {},
						skill: {}
					}],
					actionHistory: [{
						useCard: [],
						respond: [],
						skipped: [],
						lose: [],
						gain: [],
						sourceDamage: [],
						damage: [],
						custom: [],
						useSkill: []
					}],
					tempSkills: {},
					storage: {},
					marks: {},
					expandedSlots: {},
					disabledSlots: {},
					ai: {
						friend: [],
						enemy: [],
						neutral: [],
						handcards: {
							global: [],
							source: [],
							viewed: []
						}
					},
					queueCount: 0,
					outCount: 0,
				};
				
				var chainImg = new Image();
				chainImg.onerror = function() {
					var node = decadeUI.element.create('chain-back', player.node.chain);
					for (var i = 0; i < 40; i++) decadeUI.element.create('cardbg', node).style.transform = 'translateX(' + (i * 5 - 5) + 'px)';
					chainImg.onerror = undefined;
				};
				chainImg.src = decadeUIPath + 'assets/image/tie_suo.png';
				
				var extend = {
					$cardCount: playerExtend.node.count,
					$dynamicWrap: decadeUI.element.create('dynamic-wrap'),
				}
				
				decadeUI.get.extend(player, extend);
				decadeUI.get.extend(player, playerExtend);
				decadeUI.get.extend(player, lib.element.player);
				
				player.node.action = ui.create.div('.action', player.node.avatar);
				var realIdentity = ui.create.div(player.node.identity);
				realIdentity.player = player;
				
				Object.defineProperties(realIdentity, {
					innerHTML:{
						configurable: true,
						get:function(){
							return this.innerText;
						},
						set:function(value){
							if (get.mode() == 'guozhan' || _status.mode == 'jiange' || _status.mode == 'siguo') {
								this.style.display = 'none';
								this.innerText = value;
								this.parentNode.classList.add('guozhan-mode');
								return;
							}
							
							var filename;
							var checked;
							var identity = this.parentNode.dataset.color;
							var gameMode = get.mode();
							var isExt = false;
							if(lib.decade_extIdentity && (lib.decade_extIdentity[this.player.identity] || lib.decade_extIdentity[value]) && value!='猜'){
								if(lib.decade_extIdentity[value]){
									filename = lib.decade_extIdentity[value];
								}else{
									filename = lib.decade_extIdentity[this.player.identity];
								}
								isExt = true;
							}else{
							switch (value) {
								case '猜':
									filename = 'cai';
									if (_status.mode == 'purple' && identity == 'cai') {
										filename += '_blue';
										checked = true;
									}
									break;
								case '友':
									filename = 'friend';
									break;
								case '敌':
									filename = 'enemy';
									break;
								case '反':
									filename = 'fan';
									if (get.mode() == 'doudizhu') {
										filename = 'nongmin';
										checked = true;
									}
									break;
								case '主':
									filename = 'zhu';
									if (get.mode() == 'versus' && get.translation(player.side + 'Color') == 'wei') { 
										filename += '_blue';
										this.player.classList.add('opposite-camp');
										checked = true;
									} else if (get.mode() == 'doudizhu') {
										filename = 'dizhu';
										checked = true;
									}
									break;
								case '忠':
									filename = 'zhong';
									if (gameMode == 'identity' && _status.mode == 'purple') {
										filename = 'qianfeng';
									} else if (get.mode() == 'versus' && get.translation(player.side + 'Color') == 'wei') { 
										filename += '_blue';
										this.player.classList.add('opposite-camp');
										checked = true;
									}
									break;
								case '内':
									if (_status.mode == 'purple') { 
										filename = identity == 'rNei' ? 'xizuo' : 'xizuo_blue';
										checked = true;
									} else {
										filename = 'nei';
									}
									break;
								case '野':
									filename = 'ye';
									break;
								case '首':
									filename = 'zeishou';
									break;
								case '帅':
									filename = 'zhushuai';
									break;
								case '将':
									filename = 'dajiang';
									if (_status.mode == 'three' || get.translation(player.side + 'Color') == 'wei') {
										filename = 'zhushuai_blue';
										checked = true;
									}
									break;
								case '先':
                                    filename = 'xianshou';
                                    break;
                                case '后':
                                    filename = 'houshou';
                                    break;
								case '兵':
								case '卒':
									filename = this.player.side === false ? 'qianfeng_blue' : 'qianfeng';
									checked = true;
									break;
								case '师':
									filename = 'junshi';
									break;
								case '盟':
									filename = 'mengjun';
									break;
								case '神':
									filename = 'boss';
									break;
								case '从':
									filename = 'suicong';
									break;
								default:
									this.innerText = value;
									this.style.visibility = '';
									this.parentNode.style.backgroundImage = '';
									return;
								}
							}
							
							if (!checked && this.parentNode.dataset.color) {
								if (this.parentNode.dataset.color[0] == 'b') {
									filename += '_blue';
									this.player.classList.add('opposite-camp');
								}
							}
							
							this.innerText = value;
							if (decadeUI.config.campIdentityImageMode) {
								this.style.visibility = 'hidden';
								var image = new Image();
								image.node = this;
								image.onerror = function() { this.node.style.visibility = ''; };
								
	         /*-----------------分割线-----------------*/
							// 不同样式身份标记
							if (decadeUI.config.newDecadeStyle == 'off') {
						  	  if (get.mode() == 'taixuhuanjing') {
        					      image.src = extensionPath + 'image/decoration/identity_tx_' + filename + '.png';
       					      }else {
								  image.src = extensionPath + 'image/decoration/identity_new_' + filename + '.png';
						      } 
							} else {
								image.src = extensionPath + 'image/decoration/identity_' + filename + '.png'; }
								this.parentNode.style.backgroundImage = 'url("' + image.src + '")';
							} else {
								this.style.visibility = '';
							}
						}
					}
				});
				
				Object.defineProperties(player.node.count, {
					innerHTML:{
						configurable: true,
						get:function(){
							return this.textContent;
						},
						set:function(value){
							if (this.textContent == value) return;
							this.textContent = value;
							this.dataset.text = value;
						}
					}
				});
				
				if (!noclick) {
					player.addEventListener(lib.config.touchscreen ? 'touchend': 'click', ui.click.target);
					player.node.identity.addEventListener(lib.config.touchscreen ? 'touchend': 'click', ui.click.identity);
					if (lib.config.touchscreen) {
						player.addEventListener('touchstart', ui.click.playertouchstart);
					}
				} else {
					player.noclick = true;
				}

				var campWrap = decadeUI.element.create('camp-wrap');
				var hpWrap = decadeUI.element.create('hp-wrap');
				//十周年武将评级边框
				if (lib.config.extension_十周年UI_newDecadeStyle == 'on') {
				var cardWrap = decadeUI.element.create('card-count');}
				
				player.insertBefore(campWrap, player.node.name);
				player.insertBefore(hpWrap, player.node.hp);
				if (lib.config.extension_十周年UI_newDecadeStyle == 'on') {
				player.insertBefore(cardWrap, player.node.count);}
				player.node.campWrap = campWrap;
				player.node.hpWrap = hpWrap;
				if (lib.config.extension_十周年UI_newDecadeStyle == 'on') {
				player.node.cardWrap = cardWrap;}
				hpWrap.appendChild(player.node.hp);
				
				var campWrapExtend = {
					node:{
						back: decadeUI.element.create('camp-back', campWrap),
						border: decadeUI.element.create('camp-border', campWrap),
						campName: decadeUI.element.create('camp-name', campWrap),
						avatarName: player.node.name,
						avatarName2: player.node.name2,
						avatarDefaultName: decadeUI.element.create('avatar-name-default', campWrap),
					}
				};
				
				decadeUI.get.extend(campWrap, campWrapExtend);
				
				//Helasisy修，这里搞回原版的
				//campWrap.appendChild(player.node.name);
				//campWrap.node.avatarName.className = 'avatar-name';
            if(lib.config.mode=='guozhan'){
            campWrap.node.avatarDefaultName.innerHTML = '主<br>将';
            } else {
            campWrap.node.avatarDefaultName.innerHTML = '隐<br>匿';
            };
				
				var node = {
					mask: player.insertBefore(decadeUI.element.create('mask'), player.node.identity),
					gainSkill: decadeUI.element.create('gain-skill', player),
				}
				
				var properties = {
					gainSkill:{
						player: player,
						gain:function(skill){
							var sender = this;
							
							if (!sender.skills) sender.skills = [];
							if (!sender.skills.contains(skill) && lib.translate[skill]) {
								var info = lib.skill[skill];
								if(!info || info.charlotte || info.sub || (info.mark && !info.limited) || (info.nopop || info.popup === false)) return;
								if (info.onremove && game.me != this.player.storage[skill]) return;
								if(lib.config.extension_十周年UI_gainSkillsShown) {
    								//标记_noAutoMarkFilter（选择器，对象）或_noAutoMarkMe，可以避免显示遮挡
    								let canMark = true;
    								if (typeof info._noAutoMarkFilter == 'object') {
    								    for(let i in info._noAutoMarkFilter) {
    								        if(info._noAutoMarkFilter[i](sender.parentNode)) canMark = false;
    								    }
    								}
    								if (info._noAutoMarkMe) canMark = false;
    								if (canMark && !info.intro) info.intro = {//蒸套装，获得技能变标记形式
    									content: function () {
    										//多了一种情况那就是没有translation的时候，一般是标记效果
    										if(get.translation(skill + '_info')!=skill + '_info') {
    										    return get.translation(skill + '_info');
    										}else {
    										    return '技能标记';
    										}
    									},
    								};
    								player.markSkill(skill);
								}

								sender.skills.push(skill);
						        var html = '';
								for (var i = 0; i < sender.skills.length; i++) {
									/*-----------------分割线-----------------*/
									if (lib.config.extension_十周年UI_newDecadeStyle == 'on') {
										html += '[' + lib.translate[sender.skills[i]] + ']'; } else {
										html += '' + lib.translate[sender.skills[i]] + ' '; }
								}
								
								sender.innerHTML = html;
							}
						},
						lose:function(skill){
							var sender = this;
							var index = sender.skills.indexOf(skill);
							if (index >= 0) {
								sender.skills.splice(index, 1);
								var html = '';
								for (var i = 0; i < sender.skills.length; i++) {
									/*-----------------分割线-----------------*/
									if (lib.config.extension_十周年UI_newDecadeStyle == 'on') {
										html += '[' + lib.translate[sender.skills[i]] + ']'; } else {
										html += '' + lib.translate[sender.skills[i]] + ' '; }
								}
								
								sender.innerHTML = html;
							}
						},
					},
				};
				
				decadeUI.get.extend(node.gainSkill, properties.gainSkill);
				decadeUI.get.extend(player.node, node);
				
				Object.defineProperties(player, {
					group: {
						configurable: true,
						get:function(){
							return this._group;
						},
						set:function(value){
							this._group = value;
							this.node.campWrap.dataset.camp = get.bordergroup(this.name, true) || value;

							if (value){
								if (decadeUI.config.campIdentityImageMode){
									var that = this;
									var image = new Image();
									/*-----------------分割线-----------------*/
									// 武将边框样式
								var list = ['qin', 'qi', 'chu', 'yan', 'zhao', 'han', 'jing', 'hang', 'xia', 'shang', 'zhou', 'liang'];
                            
								if (list.contains(value)) {
								    var url = extensionPath + 'image/decorations/name2_' + value + '.png';
								}else if (decadeUI.config.newDecadeStyle == 'off') {
												var url = extensionPath + 'image/decoration/name_new_' + value + '.png';} else {
												var url = extensionPath + 'image/decoration/name_' + value + '.png';}
											//使用国战样式框会错位，不搞了
											if (false&&lib.config.mode == 'guozhan'&&(lib.config['extension_十周年UI_newDecadeStyle'] == "off")) {
												var url = extensionPath + 'image/decoration/name_guozhan_' + value + '.png';}
									if(lib.decade_extGroupImage && lib.decade_extGroupImage[value]){
										url = lib.decade_extGroupImage[value];
									}
								    that._finalGroup = value;
									
								    image.onerror = function(){
								        that.node.campWrap.node.campName.innerHTML = that._finalGroup ? get.translation(that._finalGroup)[0] : '';
								    };
								    
								    that.node.campWrap.node.campName.innerHTML = '';
								    that.node.campWrap.node.campName.style.backgroundImage = 'url("' + url + '")';
									image.src = url;
									
								    return;
								}
								this.node.campWrap.node.campName.innerHTML = value ? get.translation(value)[0] : '';
							}
						}
					}
				});
				
				return player;
			};
			
			
			ui.create.card = function(position, info, noclick){
				var card = ui.create.div('.card');
				card.node = {
					image: ui.create.div('.image', card),
					info: ui.create.div('.info'),
					suitnum: decadeUI.element.create('suit-num', card),
					name: ui.create.div('.name', card),
					name2: ui.create.div('.name2', card),
					background: ui.create.div('.background', card),
					intro: ui.create.div('.intro', card),
					range: ui.create.div('.range', card),
					gaintag: decadeUI.element.create('gaintag info', card),
					judgeMark: decadeUI.element.create('judge-mark', card),
					cardMask: decadeUI.element.create('card-mask', card),
				};
				
				var extend = {
					$name: decadeUI.element.create('top-name', card),
					$vertname: card.node.name,
					$equip: card.node.name2,
					$suitnum: card.node.suitnum,
					$range: card.node.range,
					$gaintag: card.node.gaintag,
				};
				
				
				for (var i in extend) card[i] = extend[i];
				for (var i in lib.element.card) card[i] = lib.element.card[i];
				card.node.intro.innerText = lib.config.intro;
				if (!noclick) lib.setIntro(card);
				
				card.storage = {};
				card.vanishtag = [];
				card.gaintag = [];
				card._uncheck = [];
				if (info != 'noclick') {
					card.addEventListener(lib.config.touchscreen ? 'touchend': 'click', ui.click.card);
					if (lib.config.touchscreen) {
						card.addEventListener('touchstart', ui.click.cardtouchstart);
						card.addEventListener('touchmove', ui.click.cardtouchmove);
					}
					if (lib.cardSelectObserver) {
						lib.cardSelectObserver.observe(card, {
							attributes: true
						});
					}
				}
				
				//字体字体字体！花色字体！
				card.$suitnum.$num = decadeUI.element.create(null, card.$suitnum, 'span');
				//card.$suitnum.$num.style.fontFamily = '"STHeiti","SimHei","Microsoft JhengHei","Microsoft YaHei","WenQuanYi Micro Hei",Helvetica,Arial,sans-serif';
				card.$suitnum.$num.style.fontFamily = '"'+lib.config.card_suit_font+'","SimHei","Microsoft JhengHei","Microsoft YaHei","WenQuanYi Micro Hei",Helvetica,Arial,sans-serif';
				card.$suitnum.$br = decadeUI.element.create(null, card.$suitnum, 'br');
				card.$suitnum.$suit = decadeUI.element.create('suit', card.$suitnum, 'span');
				//card.$suitnum.$suit.style.fontFamily = '"STHeiti","SimHei","Microsoft JhengHei","Microsoft YaHei","WenQuanYi Micro Hei",Helvetica,Arial,sans-serif';
				card.$suitnum.$suit.style.fontFamily = '"'+lib.config.card_suit_font+'","SimHei","Microsoft JhengHei","Microsoft YaHei","WenQuanYi Micro Hei",Helvetica,Arial,sans-serif';
				card.$equip.$suitnum = decadeUI.element.create(null, card.$equip, 'span');
				card.$equip.$name = decadeUI.element.create(null, card.$equip, 'span');
				
				
				card.node.judgeMark.node = {
					back: decadeUI.element.create('back', card.node.judgeMark),
					mark: decadeUI.element.create('mark', card.node.judgeMark),
					judge: decadeUI.element.create('judge', card.node.judgeMark)
				};
				
				if (position) position.appendChild(card);
				return card;
			};
			
			ui.create.cards = function(){
				var result = base.ui.create.cards.apply(this, arguments);
				game.updateRoundNumber();
				return result;
			};
			
			// 不联机就不用
			// ui.create.chat = function(){
				// var chatBox = ui.arena.appendChild(decadeUI.component.chatBox());
				// for (var i = 0; i < lib.chatHistory.length; i++) {
					// chatBox.addEntry(lib.chatHistory[i]);
				// }
				
				// _status.addChatEntry = chatBox.addEntry;
				// Object.defineProperties(_status, {
					// addChatEntry: {
						// configurable: true,
						// get:function(){
							// return chatBox.addEntry;
						// },
						// set:function(value){
							// chatBox.overrideEntry = value;
						// }
					// },
				// });
				
				// var retVal = base.ui.create.chat.apply(this, arguments);
				// chatBox.addEntry._origin = chatBox;
				// return retVal;
			// };
			
			lib.init.cssstyles = function(){
			    var temp = lib.config.glow_phase;
			    lib.config.glow_phase = '';
			    initCssstylesFunction.call(this);
			    lib.config.glow_phase = temp;
				ui.css.styles.sheet.insertRule('.avatar-name, .avatar-name-default { font-family: "' + (lib.config.name_font || 'xinkai') + '", "xinwei" }', 0);
			};

			lib.init.layout = function(layout, nosave){
			    if (!nosave) game.saveConfig('layout',layout);
				game.layout = layout;

				var relayout = function(){
					//Helasisy修：防没加载好报错
					if(!ui.arena) {
					    return setTimeout(relayout, 500);
					}
					ui.arena.dataset.layout = game.layout;
					if(get.is.phoneLayout()){
						ui.css.phone.href = lib.assetURL + 'layout/default/phone.css';
						ui.arena.classList.add('phone');
					}
					else{
						ui.css.phone.href = '';
						ui.arena.classList.remove('phone');
					}
					
					for (var i = 0; i < game.players.length; i++) {
						if (get.is.linked2(game.players[i])) {
							if (game.players[i].classList.contains('linked')) {
								game.players[i].classList.remove('linked');
								game.players[i].classList.add('linked2');
							}
						} else {
							if (game.players[i].classList.contains('linked2')) {
								game.players[i].classList.remove('linked2');
								game.players[i].classList.add('linked');
							}
						}
					}
					
					ui.updatej();
					ui.updatem();
					setTimeout(function(){
						if (game.me) game.me.update();
						setTimeout(function(){
							ui.updatex();
						}, 500);
						
						setTimeout(function(){
							ui.updatec();
						}, 1000);
					}, 100);
				};
				
				setTimeout(relayout, 500);
			};
			
			lib.skill._usecard = {
				trigger: { global: 'useCardAfter' },
				forced: true,
				popup: false,
				priority: -100,
				filter:function(event){
					return ui.clear.delay === 'usecard' && event.card.name != 'wuxie';
				},
				content:function(){
					ui.clear.delay = false;
    				game.broadcastAll(function(){
    					ui.clear();
    				});
				}
			};
			
			lib.skill._decadeUI_usecardBegin = {
				trigger:{ global:'useCardBegin' },
				forced: true,
				popup: false,
				priority: -100,
				filter:function(event){
				    return !ui.clear.delay && event.card.name != 'wuxie';
				},
				content:function(){
					ui.clear.delay = 'usecard';
				}
			};
	        
			lib.skill._discard = {
				trigger: { global: ['discardAfter', 'loseToDiscardpileAfter', 'loseAsyncAfter'] },
				filter: function (event) {
					return ui.todiscard[event.discardid] ? true : false;
				},
				forced: true,
				popup: false,
				priority: -100,
				content: function () {
					game.broadcastAll(function (id) {
						if (window.decadeUI) {
							ui.todiscard = [];
							ui.clear();
							return;
						}
						var todiscard = ui.todiscard[id];
						delete ui.todiscard[id];
						if (todiscard) {
							var time = 1000;
							if (typeof todiscard._discardtime == 'number') {
								time += todiscard._discardtime - get.time();
							}
							if (time < 0) {
								time = 0;
							}
							setTimeout(function () {
								for (var i = 0; i < todiscard.length; i++) {
									todiscard[i].delete();
								}
							},time);
						}
					}, trigger.discardid);
				}
			};
			
			lib.skill._decadeUI_dieKillEffect = {
				trigger:{ source:['dieBegin'] },
				forced: true,
				popup: false,
				priority: -100,
				lastDo: true,
				content:function(){
					if (!(trigger.source && trigger.player)) return;
					game.broadcastAll(function(source, player){
						if (!window.decadeUI) return;
						if (!decadeUI.config.playerKillEffect) return;
						decadeUI.effect.kill(source, player);
					}, trigger.source, trigger.player);
				}
			};
			
			lib.element.content.addJudge = function(){
				"step 0";
				if (cards){
					var owner = get.owner(cards[0]);
					if (owner){
						event.relatedLose = owner.lose(cards, 'visible').set('getlx', false);
					}
				}else if(typeof card == 'object') {
				    event.cards=card;    
				};
				"step 1";
				if(event.cards) {
				    var cards=event.cards;
				    var card=card.name;
				}
				if (cards[0].destroyed){
					if (player.hasSkill(cards[0].destroyed)){
						delete cards[0].destroyed;
					} else {
						event.finish();
						return;
					}
				}
				else if(event.relatedLose){
					var owner=event.relatedLose.player;
					if(owner.getCards('hejsx').contains(card)){
						event.finish();
						return;
					}
				}
				cards[0].fix();
				cards[0].style.transform = '';
				cards[0].classList.remove('drawinghidden');
				cards[0]._transform = null;
				
				var viewAs = typeof card == 'string' ? card: card.name;
				if (!lib.card[viewAs] || !lib.card[viewAs].effect){
					game.cardsDiscard(cards[0]);
				} else {
					cards[0].style.transform = '';
					player.node.judges.insertBefore(cards[0], player.node.judges.firstChild);
					if (_status.discarded){
						_status.discarded.remove(cards[0]);
					}
					ui.updatej(player);
					game.broadcast(function(player, card, viewAs){
						card.fix();
						card.style.transform = '';
						card.classList.add('drawinghidden');
						card.viewAs = viewAs;
						if (viewAs && viewAs != card.name){
							if (window.decadeUI){
								card.classList.add('fakejudge');
								card.node.judgeMark.node.judge.innerHTML = get.translation(viewAs)[0];
								
							}else if (card.classList.contains('fullskin') || card.classList.contains('fullborder')){
								card.classList.add('fakejudge');
								card.node.background.innerHTML = lib.translate[viewAs+'_bg'] || get.translation(viewAs)[0];
							}
						} else {
							card.classList.remove('fakejudge');
							if (window.decadeUI) card.node.judgeMark.node.judge.innerHTML = get.translation(card.name)[0];
						}
						
						player.node.judges.insertBefore(card, player.node.judges.firstChild);
						ui.updatej(player);
						if (card.clone && (card.clone.parentNode == player.parentNode || card.clone.parentNode == ui.arena)){
							card.clone.moveDelete(player);
							game.addVideo('gain2', player, get.cardsInfo([card]));
						}
					}, player, cards[0], viewAs);
					
					if (cards[0].clone && (cards[0].clone.parentNode == player.parentNode || cards[0].clone.parentNode == ui.arena)){
						cards[0].clone.moveDelete(player);
						game.addVideo('gain2', player, get.cardsInfo(cards));
					}

					if (get.itemtype(card) != 'card'){
						if (typeof card == 'string') cards[0].viewAs = card;
						else cards[0].viewAs = card.name;
					} else {
						cards[0].viewAs = null;
					}
					
					if (cards[0].viewAs && cards[0].viewAs != cards[0].name){
						cards[0].classList.add('fakejudge');
						cards[0].node.judgeMark.node.judge.innerHTML = get.translation(cards[0].viewAs)[0];
						game.log(player, '被贴上了<span class="yellowtext">' + get.translation(cards[0].viewAs) + '</span>（', cards, '）');
					} else {
						cards[0].classList.remove('fakejudge');
						cards[0].node.judgeMark.node.judge.innerHTML = get.translation(cards[0].name)[0];
						game.log(player, '被贴上了', cards);
					}
							//分离兵乐闪标记图标
							var judgeText = cards[0].node.judgeMark.node.judge.innerHTML;
							var map = {
								"兵": 'bingliang',
								"乐": 'lebu',
								"闪": 'shandian',
								"浮": 'fulei',
								"草": 'caomu',
								"火": 'huoshan',
								"洪": 'hongshui',
								"琴": 'dczixi_card',
							};
							if (true || judgeText == "兵" || judgeText == "乐" || judgeText == "闪" || judgeText == "火" || judgeText == "浮" || judgeText == "草" || judgeText == "洪" || judgeText == "琴") {
								//修复没有标记样式时的错位和没问题
								if(map[judgeText]) {
								    cards[0].node.judgeMark.node.judge.innerHTML = "";
    								if (lib.config.extension_十周年UI_newDecadeStyle == 'on') {
    								    cards[0].node.judgeMark.node.judge.style.backgroundImage='url("'+lib.assetURL+"extension/十周年UI/assets/image/"+ map[judgeText] +".png"+'")';
    								} else {
    								    cards[0].node.judgeMark.node.judge.style.backgroundImage='url("'+lib.assetURL+"extension/十周年UI/assets/image/"+ map[judgeText] +"2.png"+'")';
    								}
								}else {
								    cards[0].node.judgeMark.node.judge.style.backgroundImage='url("'+lib.assetURL+"extension/十周年UI/assets/image/normal.gif"+'")';
								    cards[0].node.judgeMark.node.judge.style.filter='drop-shadow(0 0 1.7px #000)';
								    cards[0].node.judgeMark.node.judge.style.fontSize='16px';
								    cards[0].node.judgeMark.style.right='0';
								}
								cards[0].node.judgeMark.node.judge.style.zIndex = '99';			
								cards[0].node.judgeMark.node.judge.parentElement.children[0].style.background = "none";
								cards[0].node.judgeMark.node.judge.parentElement.children[0].style.display = "none";
								if(!game._tempViewAs) game._tempViewAs = {};
								if (cards[0].name != cards[0].viewAs || game._tempViewAs[cards[0].name]) {

									var realViewAs = game._tempViewAs[cards[0].name] || cards[0].viewAs;
									
									var tempHandCard = document.createElement('div');
									tempHandCard.classList.add('temp-handCard');
									tempHandCard.setAttribute('data-nature', realViewAs)
									tempHandCard.setBackgroundImage('extension/十周年UI/image/vcard/' + realViewAs + '.png');
									//Helasisy修：转换成延时锦囊牌到手牌中可刷没
									if (cards[0]._tempName) {
                                        cards[0]._tempName.remove();
                                        cards[0]._tempName = undefined;
                                    }
									cards[0].appendChild(tempHandCard);
									cards[0]._tempName=tempHandCard;
									var tempDiv = document.createElement('div');
								}
								cards[0].setAttribute("keywards", cards[0].viewAs);
								var cardPrompt = get.prompt2(cards[0].viewAs);
								cards[0].setAttribute("cardName", get.translation(cards[0]));
								cards[0].setAttribute("cardPrompt", cardPrompt.substr(cardPrompt.lastIndexOf('###') + 3));
								if (decadeUI.config.newDecadeStyle == 'off') {
								if (player == game.me) {
									var skillControl = document.getElementById("arena").getElementsByClassName("skill-control");

									if (skillControl.length > 0) {
										var skillControlJudges = skillControl[0].getElementsByClassName("judges");
										if (skillControlJudges.length > 0) {
											skillControlJudges[0].remove();
										}
										cards[0].parentElement.style.display = "none";
										var cloneNode = cards[0].parentElement.cloneNode(true);


										cloneNode.style.display = "flex";
										cloneNode.id = "judgesCloneNode";
										//====================
										for (var i = 0; i < cloneNode.childElementCount; i++) {
									
											cloneNode.childNodes[i].addEventListener('click', function (e) {

                                                delete this._waitingfordrag;
                                                if (_status.dragged) return;
                                                if (_status.clicked) return;
                                                if (ui.intro) return;
                                                _status.clicked = true;
                                                if (this.parentNode && (this.parentNode.classList.contains('judges') || this.parentNode.classList.contains('dui-marks'))) {
                                                    if (!(e && e instanceof MouseEvent)) {
                                                        var rect = this.getBoundingClientRect();
                                                        e = {
                                                            clientX: (rect.left + 10) * game.documentZoom,
                                                            clientY: (rect.top + 10) * game.documentZoom
                                                        };
                                                    }

                                                    ui.click.touchpop();
                                                    var dialog = ui.click.intro.call(this, e);

                                                    dialog.style.height = '340px';
                                                    dialog.style.top = 'auto';
                                                    dialog.style.bottom = '140px';

                                                    dialog.setCaption(get.translation(this.getAttribute('keywards')))
                                                    dialog.addText('(' + this.getAttribute('cardName') + ')');
                                                    dialog.addText(this.getAttribute('cardPrompt'));
                                                    dialog.add(this.cloneNode(true));
                                                    _status.clicked = false;
                                                    return;
                                                }

                                            })
                                        }

                                        //====================

                                        skillControl[0].prepend(cloneNode);
									}

								}
								/*修改结束 */
							}
							}
							game.addVideo('addJudge', player, [get.cardInfo(cards[0]), cards[0].viewAs]);
						}
					};
			//普通拼点适配增加126版本compareCardShowBefore（拼点牌亮出前）的时机	
//将以下代码完全覆盖原来的拼点代码
				lib.element.content.chooseToCompare = function () {
				"step 0"
				if (((!event.fixedResult || !event.fixedResult[player.playerid])
					&& player.countCards('h') == 0) || ((!event.fixedResult || !event.fixedResult[target.playerid])
						&& target.countCards('h') == 0)) {
					event.result = {
						cancelled: true,
						bool: false
					};
					event.finish();
					return;
				}
				game.log(player, '对', target, '发起拼点');
				event.lose_list = [];

				// 更新拼点框
				if (event.parent.name == null || event.parent.name == 'trigger') {
					event.compareName = event.name;
				} else {
					event.compareName = event.parent.name;
				}

				// 有空重写拼点
				event.addMessageHook('finished', function () {
					var dialog = ui.dialogs[this.compareName];
					if (dialog)
						dialog.close();
				});
				game.broadcastAll(function (player, target, eventName) {
					if (!window.decadeUI) return;

					var dialog = decadeUI.create.compareDialog();
					dialog.caption = game.changeToGoldTitle(get.translation(eventName) + '拼点',true)/*'▾'*/;
					dialog.player = player;
					dialog.target = target;
					dialog.open();

					decadeUI.delay(400);
					ui.dialogs[eventName] = dialog;
				}, player, target, event.compareName);

				"step 1"
				var sendback = function () {
					if (_status.event != event) {
						return function () {
							event.resultOL = _status.event.resultOL;
						};
					}
				};

				if (event.fixedResult && event.fixedResult[player.playerid]) {
					event.card1 = event.fixedResult[player.playerid];
					event.lose_list.push([player, event.card1]);//共同丢失逻辑。
				} else if (player.isOnline()) {
					player.wait(sendback);
					event.ol = true;
					player.send(function (ai) {
						game.me.chooseCard('请选择拼点牌', true).set('prompt', false).set('type', 'compare').ai = ai;
						game.resume();
					}, event.ai);
				} else {
					event.localPlayer = true;
					player.chooseCard('请选择拼点牌', true).set('prompt', false).set('type', 'compare').ai = event.ai;
				}

				if (event.fixedResult && event.fixedResult[target.playerid]) {
					event.card2 = event.fixedResult[target.playerid];
					event.lose_list.push([target, event.card2]);//共同丢失逻辑。
				} else if (target.isOnline()) {
					target.wait(sendback);
					event.ol = true;
					target.send(function (ai) {
						game.me.chooseCard('请选择拼点牌', true).set('prompt', false).set('type', 'compare').ai = ai;
						game.resume();
					},
						event.ai);
				} else {
					event.localTarget = true;
				}

				"step 2"
				if (event.localPlayer) {
					if (result.skill && lib.skill[result.skill] && lib.skill[result.skill].onCompare) {
						result.cards = lib.skill[result.skill].onCompare(player);
						player.logSkill(result.skill);
					} else {
						event.lose_list.push([player, result.cards[0]]);
					}
					event.card1 = result.cards[0];
					// 更新拼点框
					game.broadcastAll(function (eventName) {
						if (!window.decadeUI) return;

						var dialog = ui.dialogs[eventName];
						dialog.$playerCard.classList.add('infohidden');
						dialog.$playerCard.classList.add('infoflip');
					}, event.compareName);
				}
				if (event.localTarget) {
					target.chooseCard('请选择拼点牌', true).set('prompt', false).set('type', 'compare').ai = event.ai;
				}

				"step 3"
				if (event.localTarget) {
					if (result.skill && lib.skill[result.skill] && lib.skill[result.skill].onCompare) {
						target.logSkill(result.skill);
						result.cards = lib.skill[result.skill].onCompare(target);
					} else {
						event.lose_list.push([target, result.cards[0]]);
					}

					event.card2 = result.cards[0];

					// 更新拼点框
					game.broadcastAll(function (eventName) {
						if (!window.decadeUI) return;

						var dialog = ui.dialogs[eventName];
						dialog.$targetCard.classList.add('infohidden');
						dialog.$targetCard.classList.add('infoflip');
					}, event.compareName);
				}
				if (!event.resultOL && event.ol) {
					game.pause();
				}

				"step 4"
				try {
					if (!event.card1) {
						if (event.resultOL[player.playerid].skill && lib.skill[event.resultOL[player.playerid].skill] && lib.skill[event.resultOL[player.playerid].skill].onCompare) {
							player.logSkill(event.resultOL[player.playerid].skill);
							event.resultOL[player.playerid].cards = lib.skill[event.resultOL[player.playerid].skill].onCompare(player);
						} else {
							event.lose_list.push([player, event.resultOL[player.playerid].cards[0]]);
						}
						event.card1 = event.resultOL[player.playerid].cards[0];

						// 更新拼点框
						game.broadcastAll(function (eventName) {
							if (!window.decadeUI) return;

							var dialog = ui.dialogs[eventName];
							dialog.$playerCard.classList.add('infohidden');
							dialog.$playerCard.classList.add('infoflip');
						}, event.compareName);
					}
					;
					if (!event.card2) {
						if (event.resultOL[target.playerid].skill && lib.skill[event.resultOL[target.playerid].skill] && lib.skill[event.resultOL[target.playerid].skill].onCompare) {
							target.logSkill(event.resultOL[target.playerid].skill);
							event.resultOL[target.playerid].cards = lib.skill[event.resultOL[target.playerid].skill].onCompare(player);
						} else {
							event.lose_list.push([target, event.resultOL[target.playerid].cards[0]]);
						}
						event.card2 = event.resultOL[target.playerid].cards[0];
						// 更新拼点框
						game.broadcastAll(function (eventName) {
							if (!window.decadeUI) return;

							var dialog = ui.dialogs[eventName];
							dialog.$targetCard.classList.add('infohidden');
							dialog.$targetCard.classList.add('infoflip');
						}, event.compareName);
					}
					if (!event.card1 || !event.card2) {
						throw ('err');
					}
				} catch (e) {
					console.log(e);
					game.print(e);
					event.finish();
					return;
				}
				if (event.card2.number >= 10 || event.card2.number <= 4) {
					if (target.countCards('h') > 2) {
						event.addToAI = true;
					}
				}
				if (event.lose_list.length) {
					game.loseAsync({
						lose_list: event.lose_list
					}).setContent('chooseToCompareLose');
				}

				"step 5"
				event.trigger('compareCardShowBefore');

				"step 6"
				// 更新拼点框
				game.broadcastAll(function (eventName, player, target, playerCard, targetCard) {
					if (!window.decadeUI) {
						ui.arena.classList.add('thrownhighlight');
						player.$compare(playerCard, target, targetCard);
						return;
					}

					var dialog = ui.dialogs[eventName];
					dialog.playerCard = playerCard.copy();
					dialog.targetCard = targetCard.copy();
				}, event.compareName, player, target, event.card1, event.card2);

				game.log(player, '的拼点牌为', event.card1);
				game.log(target, '的拼点牌为', event.card2);
				var getNum = function (card) {
					for (var i of event.lose_list) {
						if (i[1] == card) return get.number(card, i[0]);
					}
					return get.number(card, false);
				};
				event.num1 = getNum(event.card1);
				event.num2 = getNum(event.card2);
				event.trigger('compare');
				decadeUI.delay(400);

				"step 7"
				event.result = {
					player: event.card1,
					target: event.card2,
					num1: event.num1,
					num2: event.num2
				};
				var str;
				if (event.num1 > event.num2) {
					event.result.bool = true;
					event.result.winner = player;
					str = get.translation(player) + '拼点成功';
					player.popup('胜');
					target.popup('负');
				} else {
					event.result.bool = false;
					str = get.translation(player) + '拼点失败';
					if (event.num1 == event.num2) {
						event.result.tie = true;
						player.popup('平');
						target.popup('平');
					} else {
						event.result.winner = target;
						player.popup('负');
						target.popup('胜');
					}
				}

				// 更新拼点框
				game.broadcastAll(function (str, eventName, result) {
					if (!window.decadeUI) {
						var dialog = ui.create.dialog(str);
						dialog.classList.add('center');
						setTimeout(function (dialog) {
							dialog.close();
						}, 1000, dialog);
						return;
					}

					var dialog = ui.dialogs[eventName];
					dialog.$playerCard.dataset.result = result ? '赢' : '没赢';
					dialog.$targetCard.dataset.result = (event.num2 > event.num1) ? '赢' : '没赢';
					setTimeout(function (dialog, eventName) {
						dialog.close();
						setTimeout(function (dialog) {
							dialog.playerCard.judge = true;
							dialog.targetCard.judge = true;
							dialog.player.$throwordered2(dialog.playerCard, true);
							dialog.target.$throwordered2(dialog.targetCard, true);
						}, 180, dialog);
						ui.dialogs[eventName] = undefined;

					}, 1400, dialog, eventName);

				}, str, event.compareName, event.result.bool);
				decadeUI.delay(1800);

				"step 8"
				if (typeof event.target.ai.shown == 'number' && event.target.ai.shown <= 0.85 && event.addToAI) {
					event.target.ai.shown += 0.1;
				}
				game.broadcastAll(function () {
					if (!window.decadeUI) ui.arena.classList.remove('thrownhighlight');
				});
				game.addVideo('thrownhighlight2');
				if (event.clear !== false) {
					game.broadcastAll(ui.clear);
				}
				if (typeof event.preserve == 'function') {
					event.preserve = event.preserve(event.result);
				} else if (event.preserve == 'win') {
					event.preserve = event.result.bool;
				} else if (event.preserve == 'lose') {
					event.preserve = !event.result.bool;
				}
			};
			
			//多人拼点适配增加126版本compareCardShowBefore（拼点牌亮出前）的时机	
//将以下代码完全覆盖原来的拼点代码
lib.element.content.chooseToCompareMultiple = function () {
				"step 0"
				if (player.countCards('h') == 0) {
					event.result = { cancelled: true, bool: false }
					event.finish();
					return;
				}
				for (var i = 0; i < targets.length; i++) {
					if (targets[i].countCards('h') == 0) {
						event.result = { cancelled: true, bool: false }
						event.finish();
						return;
					}
				}
				if (!event.multitarget) {
					targets.sort(lib.sort.seat);
				}
				game.log(player, '对', targets, '发起拼点');
				"step 1"
				var compareDialogMultiple = ui.create.div('.compareDialogMultiple', ui.arena);
				var compareTitleMultiple = ui.create.div('.compareTitleMultiple', compareDialogMultiple);
				compareTitleMultiple.innerHTML = get.translation(event.getParent().name);
				var cardArea = ui.create.div('.cardArea', compareDialogMultiple);
				var playerArea = ui.create.div('.playerArea', cardArea);
					playerArea.style.setProperty('transform','translate(0px, 3.5%) scale(1.07)','');
					playerArea.style.setProperty('transition','background 0.5s ease','');
				var playerAreaName = ui.create.div('.playerAreaName', cardArea);
				playerAreaName.innerHTML = get.rawName(player.name);
				for (var targetNum = 0; targetNum < Math.max(targets.length, 3); targetNum++) {
					var cardArea = ui.create.div('.cardArea', compareDialogMultiple);
					var targetAreaName = ui.create.div('.targetAreaName', cardArea);
					var targetArea = ui.create.div('.targetArea', cardArea);
					    targetArea.style.setProperty('transform','translate(0px, 3.5%) scale(1.07)','');
					    targetArea.style.setProperty('transition','background 0.5s ease','');
					if(targetNum < targets.length) {
    					targetAreaName.innerHTML = get.rawName(targets[targetNum].name);
    					targetArea.setAttribute('id', 'targetArea' + targets[targetNum].name);
					}
				}
				
	
				event._result = [];
				event.list = targets.filter(function (current) {
					return !event.fixedResult || !event.fixedResult[current.playerid];
				});
				if (event.list.length || !event.fixedResult || !event.fixedResult[player.playerid]) {
					if (!event.fixedResult || !event.fixedResult[player.playerid]) event.list.unshift(player);
					player.chooseCardOL(event.list, '请选择拼点牌', true).set('type', 'compare').set('ai', event.ai).set('source', player).aiCard = function (target) {
						var hs = target.getCards('h');
						var event = _status.event;
						event.player = target;
						hs.sort(function (a, b) {
							return event.ai(b) - event.ai(a);
						});
						delete event.player;
						return { bool: true, cards: [hs[0]] };
					};
				}
				"step 2"
				var cards = [];
				var lose_list = [];
				if (event.fixedResult && event.fixedResult[player.playerid]) {
					event.list.unshift(player);
					result.unshift({ bool: true, cards: [event.fixedResult[player.playerid]] });
					lose_list.push([player, [event.fixedResult[player.playerid]]]);
				}
				else {
					if (result[0].skill && lib.skill[result[0].skill] && lib.skill[result[0].skill].onCompare) {
						player.logSkill(result[0].skill);
						result[0].cards = lib.skill[result[0].skill].onCompare(player)
					}
					else lose_list.push([player, result[0].cards]);
				};
				for (var j = 0; j < targets.length; j++) {
					if (event.list.contains(targets[j])) {
						var i = event.list.indexOf(targets[j]);
						if (result[i].skill && lib.skill[result[i].skill] && lib.skill[result[i].skill].onCompare) {
							event.list[i].logSkill(result[i].skill);
							result[i].cards = lib.skill[result[i].skill].onCompare(event.list[i]);
						}
						else lose_list.push([targets[j], result[i].cards]);
						cards.push(result[i].cards[0]);
					}
					else if (event.fixedResult && event.fixedResult[targets[j].playerid]) {
						cards.push(event.fixedResult[targets[j].playerid]);
						lose_list.push([targets[j], [event.fixedResult[targets[j].playerid]]]);
					}
				}
				if (lose_list.length) {
					game.loseAsync({
						lose_list: lose_list,
					}).setContent('chooseToCompareLose');
				}
				event.lose_list = lose_list;
				event.getNum = function (card) {
					for (var i of event.lose_list) {
						if (i[1].contains && i[1].contains(card)) return get.number(card, i[0]);
					}
					return get.number(card, false);
				}
				event.cardlist = cards;
				event.cards = cards;
				event.card1 = result[0].cards[0];
				event.num1 = event.getNum(event.card1);
				event.iwhile = 0;
				event.result = {
					player: event.card1,
					targets: event.cardlist.slice(0),
					num1: [],
					num2: [],
				};
				event.trigger('compareCardShowBefore');
				
				var playerArea = document.getElementsByClassName('playerArea')[0];
				var playerCard = event.card1.cloneNode(true);
				playerCard.card = event.card1;
				playerCard.style.setProperty('transform','translate(0px, 0px) scale(1)','');   
				playerArea.style.setProperty('transform','translate(0px, 0px) scale(1)','');
				playerArea.appendChild(playerCard);
	
				for (var i = 0; i < targets.length; i++) {
					var targetArea = document.getElementById('targetArea' + targets[i].name);
					//卡背跟随主题
					if(lib.config.cardback_style=='default'){
					    targetArea.setBackgroundImage('extension/十周年UI/assets/image/cardstyle_back.png');
					}else {
					    targetArea.setBackgroundImage('theme/style/cardback/image/'+lib.config.cardback_style+'.png');
					}
					//卡背大小调整一下下，放前面了
					//targetArea.style.setProperty('transform','translate(0px, 3.5%) scale(1.07)','');
					//targetArea.style.transform='scale(1.05)';
				}
				
				game.log(player, '的拼点牌为', event.card1);
				"step 3"
				if (event.iwhile < targets.length) {
					event.target = targets[event.iwhile];
					event.target.animate('target');
					player.animate('target');
					event.card2 = event.cardlist[event.iwhile];
					event.num2 = event.getNum(event.card2);
					event.card2.style.setProperty('transform','translate(0px, 0px) scale(1)','');
					game.log(event.target, '的拼点牌为', event.card2);
					
					
					var targetArea = document.getElementById('targetArea' + targets[event.iwhile].name);
					var targetCard = event.card2.cloneNode(true);
					targetCard.card = event.card2;
					targetCard.style.setProperty('transform','translate(0px, 0px) scale(1)','');   
					targetArea.style.setProperty('transform','translate(0px, 0px) scale(1)','');
					targetArea.appendChild(targetCard);
				
					player.line(event.target);
					//player.$compare(event.card1, event.target, event.card2); //动画
					event.trigger('compare');
					game.delay(0, 1500);
				}
				else {
					event.goto(7);
				}
				"step 4"
				event.result.num1[event.iwhile] = event.num1;
				event.result.num2[event.iwhile] = event.num2;
				var str;
				if (event.num1 > event.num2) {
					str = get.translation(player) + '拼点成功';
					var area = document.getElementsByClassName('playerArea')[0];
					area.childNodes[0].dataset.result = 'win';
					var area2 = document.getElementById('targetArea' + targets[event.iwhile].name);
					area2.childNodes[0].dataset.result = 'lose';
					player.popup('胜');
					target.popup('负');
				}
				else {
	
					if (event.num1 == event.num2) {
						player.popup('平');
						target.popup('平');
						var area = document.getElementsByClassName('playerArea')[0];
						area.childNodes[0].dataset.result = 'lose';
						var area2 = document.getElementById('targetArea' + targets[event.iwhile].name);
						area2.childNodes[0].dataset.result = 'lose';
						str = get.translation(player) + '拼点失败';
					}
					else {
						player.popup('负');
						target.popup('胜');
						var area = document.getElementsByClassName('playerArea')[0];
						area.childNodes[0].dataset.result = 'lose';
						var area2 = document.getElementById('targetArea' + targets[event.iwhile].name);
						area2.childNodes[0].dataset.result = 'win';
						str = get.translation(player) + '拼点失败';
					}
				}
				game.broadcastAll(function (str) {
					var dialog = ui.create.dialog(str);
					dialog.classList.add('center');
					setTimeout(function () {
						dialog.close();
					}, 1000);
				}, str);
				game.delay(2);
				"step 5"
				if (event.callback) {
					game.broadcastAll(function (card1, card2) {
						if (card1.clone) card1.clone.style.opacity = 0.5;
						if (card2.clone) card2.clone.style.opacity = 0.5;
					}, event.card1, event.card2);
					var next = game.createEvent('compareMultiple');
					next.player = player;
					next.target = event.target;
					next.card1 = event.card1;
					next.card2 = event.card2;
					next.num1 = event.num1;
					next.num2 = event.num2;
					next.setContent(event.callback);
					event.compareMultiple = true;
				}
				"step 6"
				game.broadcastAll(ui.clear);
				event.iwhile++;
				event.goto(3);
				"step 7"
				game.pause();
			   
				setTimeout(function cancelCompare() {
					game.resume();
					var compareDialogMultiple = document.getElementsByClassName('compareDialogMultiple')[0];
					if (compareDialogMultiple) compareDialogMultiple.parentNode.removeChild(compareDialogMultiple);
				}, 500);
				event.cards.add(event.card1);
	
			};
			
         //126版本新增了多人同时拼点函数，因此原来的lib.skill已失效
//多人同时拼点适配增加126版本compareCardShowBefore（拼点牌亮出前）的时机	
//搜索lib.skill.twchaofeng.chooseToCompareMeanwhile将以下代码完全覆盖原来的拼点代码
    lib.element.content.chooseToCompareMeanwhile = function () {
                        'step 0'
                    
                        if (player.countCards('h') == 0) {
                            event.result = { cancelled: true, bool: false }
                            event.finish();
                            return;
                        }
                        for (var i = 0; i < targets.length; i++) {
                            if (targets[i].countCards('h') == 0) {
                                event.result = { cancelled: true, bool: false }
                                event.finish();
                                return;
                            }
                        }
                        if (!event.multitarget) {
                            targets.sort(lib.sort.seat);
                        }
                        game.log(player, '对', targets, '发起了共同拼点');
                        event.compareMeanwhile = true;
                        'step 1'
                      
                        var compareDialog = ui.create.div('.compareDialog', ui.arena);
                        var compareDialogTitle = ui.create.div('.compareDialogTitle', compareDialog);
                        compareDialogTitle.innerText = get.translation(event.getParent().name);
                        var playerAreaDialog = ui.create.div('.playerAreaDialog', compareDialog)
                        var playerArea = ui.create.div('.playerArea', playerAreaDialog);
                        var playerAreaName = ui.create.div('.playerAreaName', playerAreaDialog);
                        playerAreaName.innerHTML = get.rawName(player.name);
                        for (var targetNum = 0; targetNum < targets.length; targetNum++) {
                            var targetAreaDialog = ui.create.div('.targetAreaDialog', compareDialog);
                            var targetAreaName = ui.create.div('.targetAreaName', targetAreaDialog);
                            var targetArea = ui.create.div('.targetArea', targetAreaDialog);
                            targetAreaName.innerHTML = get.rawName(targets[targetNum].name);
                            targetArea.setAttribute('id', 'targetArea' + targets[targetNum].name);
                        }
            
                    
                        event._result = [];
                        event.list = targets.filter(function (current) {
                            return !event.fixedResult || !event.fixedResult[current.playerid];
                        });
                        if (event.list.length || !event.fixedResult || !event.fixedResult[player.playerid]) {
                            if (!event.fixedResult || !event.fixedResult[player.playerid]) event.list.unshift(player);
                            player.chooseCardOL(event.list, '请选择拼点牌', true).set('type', 'compare').set('ai', event.ai).set('source', player).aiCard = function (target) {
                                var hs = target.getCards('h');
                                var event = _status.event;
                                event.player = target;
                                hs.sort(function (a, b) {
                                    return event.ai(b) - event.ai(a);
                                });
                                delete event.player;
                                return { bool: true, cards: [hs[0]] };
                            };
                        }
                        'step 2'
                        var cards = [];
                        var lose_list = [];
                        if (event.fixedResult && event.fixedResult[player.playerid]) {
                            event.list.unshift(player);
                            result.unshift({ bool: true, cards: [event.fixedResult[player.playerid]] });
                            lose_list.push([player, [event.fixedResult[player.playerid]]]);
                        }
                        else {
                            if (result[0].skill && lib.skill[result[0].skill] && lib.skill[result[0].skill].onCompare) {
                                player.logSkill(result[0].skill);
                                result[0].cards = lib.skill[result[0].skill].onCompare(player)
                            }
                            else lose_list.push([player, result[0].cards]);
                        };
                        for (var j = 0; j < targets.length; j++) {
                            if (event.list.contains(targets[j])) {
                                var i = event.list.indexOf(targets[j]);
                                if (result[i].skill && lib.skill[result[i].skill] && lib.skill[result[i].skill].onCompare) {
                                    event.list[i].logSkill(result[i].skill);
                                    result[i].cards = lib.skill[result[i].skill].onCompare(event.list[i]);
                                }
                                else lose_list.push([targets[j], result[i].cards]);
                                cards.push(result[i].cards[0]);
                            }
                            else if (event.fixedResult && event.fixedResult[targets[j].playerid]) {
                                cards.push(event.fixedResult[targets[j].playerid]);
                                lose_list.push([targets[j], [event.fixedResult[targets[j].playerid]]]);
                            }
                        }
                        if (lose_list.length) {
                            game.loseAsync({
                                lose_list: lose_list,
                            }).setContent('chooseToCompareLose');
                        }
                        event.lose_list = lose_list;
                        event.getNum = function (card) {
                            for (var i of event.lose_list) {
                                if (i[1].contains && i[1].contains(card)) return get.number(card, i[0]);
                            }
                            return get.number(card, false);
                        }
                        event.cardlist = cards;
                        event.cards = cards;
                        event.card1 = result[0].cards[0];
                        event.num1 = event.getNum(event.card1);
                        event.iwhile = 0;
                        event.winner = null;
                        event.maxNum = -1;
                        event.tempplayer = event.player;
                        event.result = {
                            winner: null,
                            player: event.card1,
                            targets: event.cardlist.slice(0),
                            num1: [],
                            num2: [],
                        };
                        event.trigger('compareCardShowBefore');
                        //player.$compareMultiple(event.card1, targets, cards);//去除原版的动画
                        game.log(player, '的拼点牌为', event.card1);
                     
                        var playerArea = document.getElementsByClassName('playerArea')[0];
                        var playerCard = result[0].cards[0].cloneNode(true);
                        playerCard.card = result[0].cards[0];
                        playerCard.style.setProperty('transform','translate(0px, 0px) scale(1)','');   
                        playerArea.appendChild(playerCard);
            
                       
                        player.animate('target');
                        game.delay(0, 1000);
                        'step 3'
                        event.target = null;
                        event.trigger('compare');
                        'step 4'
            
                        if (event.iwhile < targets.length) {
                            event.target = targets[event.iwhile];
                            event.target.animate('target');
                            event.card2 = event.cardlist[event.iwhile];
                            event.num2 = event.getNum(event.card2);
                            game.log(event.target, '的拼点牌为', event.card2);
            
                            
                            var targetArea = document.getElementById('targetArea' + targets[event.iwhile].name);
                            var targetCard = event.card2.cloneNode(true);
                            targetCard.card = event.card2;
                            targetCard.style.setProperty('transform','translate(0px, 0px) scale(1)','');   
                            targetArea.appendChild(targetCard);
                            delete event.player;
                            event.trigger('compare');
            
                        }
                        else {
            
                            game.delay(0, 1000);
                            event.goto(7);
                        }
                        'step 5'
            
                        event.result.num1[event.iwhile] = event.num1;
                        event.result.num2[event.iwhile] = event.num2;
                        var list = [[event.tempplayer, event.num1], [event.target, event.num2]];
                        for (var i of list) {
                            if (i[1] > event.maxNum) {
                                event.maxNum = i[1];
                                event.winner = i[0];
                            }
                            else if (event.winner && i[1] == event.maxNum && i[0] != event.winner) {
                                event.winner = null;
                            }
                        }
                        'step 6'
                        event.iwhile++;
                        event.goto(4);
                        'step 7'
                        if (event.num1 != event.card1.number) {
                            var playerArea = document.getElementsByClassName('playerArea')[0];
                            var num = playerArea.childNodes[0].getElementsByClassName("suit-num")[0].getElementsByTagName("span")[0];
                            num.innerText = get.strNumber(event.num1);
                        }
                       
                        var player = event.tempplayer;
                        event.player = player;
                        delete event.tempplayer;
                        var str = '无人拼点成功';
                        var list = [player].addArray(targets);
                        if (event.winner) {
                            event.result.winner = event.winner;
                            str = get.translation(event.winner) + '拼点成功';
                            game.log(event.winner, '拼点成功');
                            event.winner.popup('胜');
                            if (event.winner == player) var area = document.getElementsByClassName('playerArea')[0];
                            else var area = document.getElementById('targetArea' + event.winner.name);
                            area.childNodes[0].dataset.result = 'win';
                        } else {
                            game.log('#b无人', '拼点成功');
                        }
            
                        list.remove(event.winner);
                        for (var i of list) {
                            i.popup('负');
                            if (i == player) var area = document.getElementsByClassName('playerArea')[0];
                            else var area = document.getElementById('targetArea' + i.name);
                            area.childNodes[0].dataset.result = 'lose';
                        }
                        if (str) {
                            game.broadcastAll(function (str) {
                                var dialog = ui.create.dialog(str);
                                dialog.classList.add('center');
                                setTimeout(function () {
                                    dialog.close();
                                }, 1000);
                            }, str);
                        }
                        
                        game.pause();
                      
                         setTimeout(function cancelCompare() {
                            game.resume();
                            var compareDialog = document.getElementsByClassName('compareDialog')[0];
                            if (compareDialog) compareDialog.parentNode.removeChild(compareDialog);
                        }, 2000);
            
                        'step 8'
                        game.broadcastAll(ui.clear);
                        'step 9'
                        event.cards.add(event.card1);
                    };
        
			lib.element.content.chooseToGuanxing = function(){
				"step 0"
				if (player.isUnderControl()) {
					game.modeSwapPlayer(player);
				}
				
				var cards = get.cards(num);
				var guanxing = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
				if (this.getParent() && this.getParent().name && get.translation(this.getParent().name) != this.getParent().name) {
					//guanxing.caption = '【' + get.translation(this.getParent().name) + '】';
					guanxing.caption = game.changeToGoldTitle(get.translation(this.getParent().name),false,37);
				} else {
					guanxing.caption = "请按顺序排列牌。";
				}
				game.broadcast(function(player, cards, callback){
					if (!window.decadeUI) return;
					var guanxing = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
					//guanxing.caption = '【观星】';
					guanxing.caption = game.changeToGoldTitle('观星',false,37);
					guanxing.callback = callback;
				}, player, cards, guanxing.callback);
				
				event.switchToAuto = function(){
					var cards = guanxing.cards[0].concat();
					var cheats = [];
					var judges = player.node.judges.childNodes;

					//game.me.countCards('j')修复废除装备栏判错ai的bug
					if (judges.length&&game.me.countCards('j')) cheats = decadeUI.get.cheatJudgeCards(cards, judges, true);
					if (cards.length) {
						for (var i = 0; i >= 0 && i < cards.length; i++) {
							if (get.value(cards[i], player) >= 5) {
								cheats.push(cards[i]);
								cards.splice(i, 1)
							}
						}
					}
					
					var time = 500;
					for (var i = 0; i < cheats.length; i++) {
						setTimeout(function(card, index, finished){
							guanxing.move(card, index, 0);
							if (finished) guanxing.finishTime(1000);
						}, time, cheats[i], i, (i >= cheats.length - 1) && cards.length == 0);
						time += 500;
					}
					
					for (var i = 0; i < cards.length; i++) {
						setTimeout(function(card, index, finished){
							guanxing.move(card, index, 1);
							if (finished) guanxing.finishTime(1000);
						}, time, cards[i], i, (i >= cards.length - 1));
						time += 500;
					}
				}
				
				if (event.isOnline()) {
					event.player.send(function(){
						if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
					}, event.player);
					
					event.player.wait();
					decadeUI.game.wait();
				} else if (!event.isMine()) {
					event.switchToAuto();
				}
				"step 1"
				player.popup(get.cnNumber(event.num1) + '上' + get.cnNumber(event.num2) + '下');
				game.log(player, '将' + get.cnNumber(event.num1) + '张牌置于牌堆顶，' + get.cnNumber(event.num2) +'张牌置于牌堆底');
				game.updateRoundNumber()
			};
			
			lib.element.player.setIdentity = function(identity){
				if (!identity) identity = this.identity;
				
				this.node.identity.dataset.color = identity;
				if (get.mode() == 'guozhan') {
					if (identity == 'ye' && get.is.jun(this)) this.identity = identity = lib.character[this.name1][1];
					this.group = identity;
					this.node.identity.firstChild.innerHTML = get.translation(identity);
					return this;
				}
				 
				if (get.is.jun(this)) {
					this.node.identity.firstChild.innerHTML = '君';
				} else {
					this.node.identity.firstChild.innerHTML = get.translation(identity);
				}
				
				return this;
				
				// if(!identity) identity = this.identity;
				
				// var identityColor = identity;
				// var identityNode = this.node.identity;
				
				// switch(get.mode()){
				    // case 'identity':
						// if (_status.mode == 'purple' && identity.indexOf('cai') >= 0) {
							// if (this.identity[0] == 'r') {
								// identity = 'cai';
							// } else {
								// identity = 'cai2';
								// this.classList.add('opposite-camp');
								// this.finalSide = false;
							// }
							
						// }
						// break;
					
					// case 'guozhan':
				        // if (identity == 'ye' && get.is.jun(this)) {
							// this.identity = identity = lib.character[this.name1][1];
						// }
						// this.group = identity;
				        // break;
				    // case 'versus':
						// this.finalSide = this.side;
						// if (this.side === false) this.classList.add('opposite-camp');
				        // break;
				// }
				
				// this.finalShownIdentity = identity;
				// identityNode.dataset.color = identityColor;
				// if (lib.huanhuazhizhan) return this;
				
				// if (decadeUI.config.campIdentityImageMode){
					// var that = this;
					// var image = new Image();
					// var url = extensionPath + 'image/decoration/identity_' + decadeUI.getPlayerIdentity(that, identity) + '.png';
				    // that.finalShownIdentity = identity;
					
					// image.identity = identity;
				    // image.onerror = function(){
						// if (this.identity != that.finalShownIdentity) return;
						
						// that.node.identity.firstChild.style.opacity = '';
						// that.node.identity.firstChild.innerHTML = get.mode() == 'boss' ? get.translation(that.finalShownIdentity) :
							// decadeUI.getPlayerIdentity(that, that.finalShownIdentity, true, true);
				    // };
				    
					// that.node.identity.firstChild.innerHTML = '';
					// that.node.identity.firstChild.style.opacity = '0';
					// that.node.identity.style.backgroundImage = 'url("' + url + '")';
					// image.src = url;
					
				// } else {
				    // this.node.identity.firstChild.innerHTML = get.is.jun(this) ? '君' : get.translation(identity);
				// }
				
				// return this;
			};
			
			lib.element.player.addSkill = function(skill){
				var skill = playerAddSkillFunction.apply(this, arguments);
				if (!Array.isArray(skill)) {
					var character1 = lib.character[this.name];
					var character2 = lib.character[this.name2];
					if ((!character1 || !character1[3].contains(skill)) && (!character2 || !character2[3].contains(skill))) {
						this.node.gainSkill.gain(skill);
					}
				}

				return skill;
			};
			
			lib.element.player.removeSkill = function(skill){
				var skill = playerRemoveSkillFunction.apply(this, arguments);
				if (!Array.isArray(skill)) {
					if (this.node.gainSkill.skills && this.node.gainSkill.skills.contains(skill)) {
						this.node.gainSkill.lose(skill);
					}
				}

				return skill;
			};
			
			lib.element.player.getState = function(){
				var state = base.lib.element.player.getState.apply(this, arguments);
				state.seat = this.seat;
				return state;
			};
			
			lib.element.player.setModeState = function(info){
				if (info && info.seat) {
					if (!this.node.seat) this.node.seat = decadeUI.element.create('seat', this);
					this.node.seat.innerHTML = get.cnNumber(info.seat, true);
				}
				
				if (base.lib.element.player.setModeState) {
					return base.lib.element.player.setModeState.apply(this, arguments);
				} else {
					return this.init(info.name, info.name2);
				}
			};
			
			lib.element.player.$damagepop = function(num, nature, font, nobroadcast){
				if (typeof num == 'number' || typeof num == 'string') {
    game.addVideo('damagepop', this, [num, nature, font]);
    if (nobroadcast !== false) {
		game.broadcast(function(player, num, nature, font) {
			player.$damagepop(num, nature, font);
      }, this, num, nature, font);
    }

    var node;
    if (this.popupNodeCache && this.popupNodeCache.length) {
      node = this.popupNodeCache.shift();
    } else {
      node = decadeUI.element.create('damage');
    }

    if (font) {
      node.classList.add('normal-font');
    } else {
      node.classList.remove('normal-font');
    }

    if (typeof num == 'number') {
      node.popupNumber = num;
      if (num == Infinity) {
		num = '+∞'
	} else if (num == -Infinity) {
        num = '-∞';
      } else if (num > 0) {
        //num = '+' + num;
        num = '' ;//体力数字赋空
      } else if (num < 0) {
        //num = '-' + num;
        num = '' ;//体力数字赋空
      }

    } else {
      node.popupNumber = null;
    }

    //弹出文字样式
    if (lib.config["extension_十周年UI_shadowStyle"] == "off") {
      node.innerHTML = null;
      ui.create.div('.damage-child', node, num);
      ui.create.div('.damage-child2', node, num);
    } else {
      node.textContent = num;
    }
    node.dataset.text = num;
    node.nature = nature || 'soil';
    this.damagepopups.push(node);
  }
				
				if (this.damagepopups.length && !this.damagepopLocked) {
							var node = this.damagepopups.shift();
							this.damagepopLocked = true;
							if (this != node.parentNode) this.appendChild(node);

							var player = this;
							if (typeof node.popupNumber == 'number') {
								var popupNum = node.popupNumber;
								if (popupNum < 0) {
									switch (node.nature) {
										case 'thunder':
											if (popupNum <= -2) {
												//decadeUI.animation.playSpine({ name: 'effect_shoujidonghua', action: 'play6' }, { scale: 0.8, parent: player });
											} else {
											//	decadeUI.animation.playSpine({ name: 'effect_shoujidonghua', action: 'play5' }, { scale: 0.8, parent: player });
											}
											break;
										case 'fire':
											if (popupNum <= -2) {
										//		decadeUI.animation.playSpine({ name: 'effect_shoujidonghua', action: 'play4' }, { scale: 0.8, parent: player });
											} else {
									//			decadeUI.animation.playSpine({ name: 'effect_shoujidonghua', action: 'play3' }, { scale: 0.8, parent: player });
											}
											break;
										case 'water':
											break;
										default:
											if (popupNum <= -2) {
										//		decadeUI.animation.playSpine({ name: 'effect_shoujidonghua', action: 'play2' }, { scale: 0.8, parent: player });
											} else {
										//		decadeUI.animation.playSpine({ name: 'effect_shoujidonghua', action: 'play1' }, { scale: 0.8, parent: player });
											}
											break;
									}
								} else {
									if (node.nature == 'wood'&&decadeUI.config.EffectWood) {
										decadeUI.animation.playSpine('effect_zhiliao', { scale: 0.7, parent: player });
									}
								}
							}
					
					node.style.animation = 'open-fade-in-out 1.2s';
					setTimeout(function(player, node){
						if (!player.popupNodeCache) player.popupNodeCache = [];
						node.style.animation = '';
						player.popupNodeCache.push(node);
					}, 1210, player, node);
				
					setTimeout(function(player) {
						player.damagepopLocked = false;
						player.$damagepop();
					}, 500, player);
				}
			};
			//弹出文字样式
			lib.element.player.prompt = function (str, nature) {
  var node;
  if (this.node.prompt) {
    node = this.node.prompt;
    node.innerHTML = '';
    node.className = 'damage normal-font damageadded';
  } else {
    node = ui.create.div('.damage.normal-font', this);
    this.node.prompt = node;
    ui.refresh(node);
    node.classList.add('damageadded');
  }

  if (lib.config["extension_十周年UI_shadowStyle"] == "off") {
    node.innerHTML = null;
    ui.create.div('.damage-child', node, str);
    ui.create.div('.damage-child2', node, str);
  } else {
    node.innerHTML = str;
  }

  node.dataset.text = str;
  node.dataset.nature = nature || 'soil';
};
			
			lib.element.player.$dieflip = function(){
				if (!decadeUI.config.playerDieEffect && playerDieFlipFunction) playerDieFlipFunction.apply(this, arguments);
			};
			
			Object.defineProperties(lib.element.player, {
				$dieAfter: {
					configurable: true,
					get:function(){
						return ride.lib.element.player.$dieAfter;
					},
					set:function(value){
						base.lib.element.player.$dieAfter = value;
					}
				}
			});	
			
			lib.element.player.$compare = function(card1, target, card2){
				game.broadcast(function(player, target, card1, card2) {
					player.$compare(card1, target, card2);
				}, this, target, card1, card2);
				game.addVideo('compare', this, [get.cardInfo(card1), target.dataset.position, get.cardInfo(card2)]);
				var player = this;
				target.$throwordered2(card2.copy(false));
				player.$throwordered2(card1.copy(false));
			};

			lib.element.player.$compareMultiple=function(card1,targets,cards){
				game.broadcast(function(player,card1,targets,cards){
					player.$compareMultiple(card1,targets,cards);
				},this,card1,targets,cards);
				game.addVideo('compareMultiple',this,[get.cardInfo(card1),get.targetsInfo(targets),get.cardsInfo(cards)]);
				var player=this;
				for(var i=targets.length-1;i>=0;i--){
					targets[i].$throwordered2(cards[i].copy(false));
				}
				player.$throwordered2(card1.copy(false));
			};
                        ///装备栏3同步装备区废除牌显示状态
				lib.element.player.$syncDisable = function(map){
					var player=this;
					//var suits={equip3:'+1马栏',equip4:'-1马栏',equip6:'特殊栏'};
					var suits={equip1:'none',equip2:'none',equip3:'none',equip4:'none',equip5:'none',equip6:'none'};
					if(!map){
						map=(player.disabledSlots||{});
					}
					game.addVideo('$syncDisable',player,get.copy(map))
					game.broadcast(function(player,map){
						player.disabledSlots=map;
						player.$syncDisable(map);
					},player,map)
					var map2=get.copy(map);
					var cards=Array.from(player.node.equips.childNodes);
					for(var card of cards){
						if(card.name.indexOf('feichu_')==0){
							var index=card.name.slice(7);
							if(!map2[index]) map2[index]=0;
							map2[index]--;
						}
					}
					for(var index in map2){
						if(index.indexOf('equip')!=0||!(parseInt(index.slice(5))>0)) continue;
						var num=map2[index];
						if(num>0){
							for(var i=0;i<num;i++){
								var card=game.createCard('feichu_'+index,(suits[index]||(get.translation(index)+'栏')),'');
								card.fix();
								card.style.transform='';
								card.classList.remove('drawinghidden');
								card.classList.add('feichu');
								delete card._transform;

                        //废除装备栏开始
                        if (lib.config.extension_十周年UI_newDecadeStyle != 'on') {
                            var ele = card.getElementsByClassName("name2");
                            if (!(ele.length > 1)) {
                                var e = ele[0].children;
                                var subype = card.getAttribute("data-card-subype");
                                var b = subype == "equip3" ? "pos" : subype == "equip4" ? "neg" : false;
                                var parent = e[0].parentNode;
                                while (parent.hasChildNodes()) {
                                    parent.removeChild(parent.firstChild);
                                }
                                var img = document.createElement("img");
                                img.classList.add("eng-feichu");
                                if (b) img.src = decadeUIPath + "/image/ass/feichuma.png";
                                else img.src = decadeUIPath + "/image/ass/feichu.png";
                                if (b == "-") parent.parentNode.style.left = "51px"
                                parent.appendChild(img);
                            }
                        }
                        //结束

								var equipNum=get.equipNum(card);
								var equipped=false;
								for(var j=0;j<player.node.equips.childNodes.length;j++){
									if(get.equipNum(player.node.equips.childNodes[j])>=equipNum){
										player.node.equips.insertBefore(card,player.node.equips.childNodes[j]);
										equipped=true;
										break;
									}
								}
								if(!equipped){
									player.node.equips.appendChild(card);
									if(_status.discarded){
										_status.discarded.remove(card);
									}
								}
							}
						}
						else if(num<0){
							for(var i=0;i>num;i--){
								var card=cards.find(card=>card.name=='feichu_'+index);
								if(card){
									player.node.equips.removeChild(card);
									cards.remove(card);
								}
							}
						}
					}
				};

			//装备栏3废除结束		
			//坤坤美化 修改判定区废除，跟随技能
			if (decadeUI.config.newDecadeStyle == 'off') {
                    lib.element.player.$enableJudge = function (skill) {

                        game.broadcast(function (player, skill) {
                            player.$enableJudge(skill);
                        }, this, skill);

                        var player = this;
                        player.storage._disableJudge = false;

                        for (var i = 0; i < player.node.judges.childNodes.length; i++) {
                            if (player.node.judges.childNodes[i].name == 'disable_judge') {
                                player.node.judges.removeChild(player.node.judges.childNodes[i]);
                                break;
                            }
                        }
                        if (player == game.me) {
                            var skillControl = document.getElementById("arena").getElementsByClassName("skill-control");
                            if (skillControl.length > 0) {
                                var skillControlFeichu = skillControl[0].getElementsByClassName("eng-feichu");
                                if (skillControlFeichu && skillControlFeichu.length > 0) {
                                    for (var i = 0; i < skillControlFeichu.length; i++) {
                                        skillControlFeichu[i].remove();
                                    }
                                }
                            }
                        }
                    };

                    lib.element.player.$disableJudge = function (skill) {

                        game.broadcast(function (player, skill) {
                            player.$disableJudge(skill);
                        }, this, skill);

                        var player = this;
                        var card = game.createCard('disable_judge', '', '');
                        player.storage._disableJudge = true;
                        card.fix();

                        card.node.judgeMark.style.display = 'flex';

                        card.node.judgeMark.node.judge.style.backgroundImage = 'url("' + lib.assetURL + "extension/十周年UI/assets/image/feichu.png" + '")';
                        card.classList.add('feichu');
                        card.style.transform = '';
                        card.classList.add('drawinghidden');
                        player.node.judges.insertBefore(card, player.node.judges.firstChild);
                        ui.updatej(player);


                        if (player == game.me) {
                            card.node.judgeMark.style.display = 'none';
                            var skillControl = document.getElementById("arena").getElementsByClassName("skill-control");
                            if (skillControl.length > 0) {
                                var skillControlFeichu = skillControl[0].getElementsByClassName("eng-feichu");
                                if (skillControlFeichu && skillControlFeichu.length > 0) {
                                    for (var i = 0; i < skillControlFeichu.length; i++) {
                                        skillControlFeichu[i].remove();
                                    }
                                }
                                var skillControlJudges = skillControl[0].getElementsByClassName("judges");
                                if (skillControlJudges && skillControlJudges.length > 0) {
                                    skillControlJudges[0].remove();
                                }

                                var img = document.createElement("img");
                                var imgDiv = document.createElement("div");
                                imgDiv.classList.add("eng-feichuDiv");
                                img.classList.add("eng-feichu");
                                img.src = decadeUIPath + 'assets/image/feichu.png';
                                img.style.height = '30px';
                                img.addEventListener('click', function (e) {

                                    delete this._waitingfordrag;
                                    if (_status.dragged) return;
                                    if (_status.clicked) return;
                                    if (ui.intro) return;
                                    _status.clicked = true;
                                        if (!(e && e instanceof MouseEvent)) {
                                            var rect = this.getBoundingClientRect();
                                            e = {
                                                clientX: (rect.left + 10) * game.documentZoom,
                                                clientY: (rect.top + 10) * game.documentZoom
                                            };
                                        }
                                        ui.click.touchpop();
                                        var dialog = ui.click.intro.call(this, e);
                                        dialog.style.height = '50px';
                                        dialog.style.top = 'auto';
                                        dialog.style.bottom = '100px';
                                        dialog.addText('判定区已经废除');
                                        _status.clicked = false;

                                })

                                imgDiv.prepend(img);
                                skillControl[0].prepend(imgDiv);
                            }

                        }
                    };
                    }
                    /*末*/
			
			lib.element.card.copy = function(){
				var clone = cardCopyFunction.apply(this, arguments);
				clone.nature = this.nature;
				
				var res = dui.statics.cards;
				var asset = res[clone.name];
				if (!res.READ_OK)
					return clone;
				
				if (asset && !asset.loaded && clone.classList.contains('decade-card')) {
					if (asset.loaded == undefined) {
						var image = asset.image;
						image.addEventListener('error', function(){
							clone.style.background = asset.rawUrl;
							clone.classList.remove('decade-card');
						});
					} else {
						clone.style.background = asset.rawUrl;
						clone.classList.remove('decade-card');
					} 
				}
				
				return clone;
			};
			
            
		},
		dialog:{
			create:function(className, parentNode, tagName){
				var element = !tagName ? document.createElement('div') : document.createElement(tagName);
				for(var i in decadeUI.dialog){
					if (decadeUI.dialog[i]) element[i] = decadeUI.dialog[i];
				}
				
				element.listens = {};
				for(var i in decadeUI.dialog.listens){
					if (decadeUI.dialog.listens[i]) element.listens[i] = decadeUI.dialog.listens[i];
				}
					
				element.listens._dialog = element;
				element.listens._list = [];
				
				if (className) element.className = className;
				if (parentNode) parentNode.appendChild(element);
				
				return element;
			},
			open:function(){
				if (this == decadeUI.dialog) return console.error('undefined');
			},
			show:function(){
				if (this == decadeUI.dialog) return console.error('undefined');
				
				this.classList.remove('hidden');
			},
			hide:function(){
				if (this == decadeUI.dialog) return console.error('undefined');
				
				this.classList.add('hidden');
			},
			animate:function(property, duration, toArray, fromArrayOptional){
				if (this == decadeUI.dialog) return console.error('undefined');
				if (property == null || duration == null || toArray == null) return console.error('arguments');
				
				var propArray = property.replace(/\s*/g, '').split(',');
				if (!propArray || propArray.length == 0) return console.error('property');
				
				var realDuration = 0;
				if (duration.lastIndexOf('s') != -1){
					if (duration.lastIndexOf('ms') != -1){
						duration = duration.replace(/ms/, '');
						duration = parseInt(duration);
						if (isNaN(duration)) return console.error('duration');
						realDuration = duration;
					}else{
						duration = duration.replace(/s/, '');
						duration = parseFloat(duration);
						if (isNaN(duration)) return console.error('duration');
						realDuration = duration * 1000;
					}
				}else {
					duration = parseInt(duration);
					if (isNaN(duration)) return console.error('duration');
					realDuration = duration;
				}
				
				if (fromArrayOptional){
					for (var i = 0; i < propArray.length; i++){
						this.style.setProperty(propArray[i], fromArrayOptional[i]);
					}
				}
				
				var duraBefore = this.style.transitionDuration;
				var propBefore = this.style.transitionProperty;
				this.style.transitionDuration = realDuration + 'ms';
				this.style.transitionProperty = property;
				
				ui.refresh(this);
				for (var i = 0; i < propArray.length; i++){
					this.style.setProperty(propArray[i], toArray[i]);
				}
				
				var restore = this;
				setTimeout(function(){
					restore.style.transitionDuration = duraBefore;
					restore.style.transitionProperty = propBefore;
				}, realDuration);
			},
			close:function(delayTime, fadeOut){
				if (this == decadeUI.dialog) return console.error('undefined');
				this.listens.clear();
				
				if (!this.parentNode) return;
				
				if (fadeOut === true && delayTime) {
					this.animate('opacity', delayTime, 0);
				}
				
				if (delayTime) {
					var remove = this;
					delayTime = (typeof delayTime == 'number') ? delayTime : parseInt(delayTime);
					setTimeout(function(){ 
						if (remove.parentNode) remove.parentNode.removeChild(remove);
					}, delayTime);
					return;
				}
				
				this.parentNode.removeChild(this);
				return;
			},
			listens:{
				add:function(listenElement, event, func, useCapture){
					if (!this._dialog || !this._list) return console.error('undefined');
					if (!(listenElement instanceof HTMLElement) || !event || (typeof func !== 'function')) return console.error('arguments');
					
					this._list.push(new Array(listenElement, event, func));
					listenElement.addEventListener(event, func);
				}, 
				remove:function(listenElementOptional, eventOptional, funcOptional){
					if (!this._dialog || !this._list) return console.error('undefined');
					
					var list = this._list;
					if (listenElementOptional && eventOptional && funcOptional){
						var index = list.indexOf(new Array(listenElementOptional, eventOptional, funcOptional));
						if (index != -1){
							list[index][0].removeEventListener(list[index][1], list[index][2]);
							list.splice(index, 1);
							return;
						}
					}else if (listenElementOptional && eventOptional){
						for (var i = list.length - 1; i >= 0; i--){
							if (list[i][0] == listenElementOptional && list[i][1] == eventOptional){
								list[i][0].removeEventListener(list[i][1], list[i][2]);
								list.splice(i, 1);
							}
						}
					}else if (listenElementOptional && funcOptional){
						for (var i = list.length - 1; i >= 0; i--){
							if (list[i][0] == listenElementOptional && list[i][2] == funcOptional){
								list[i][0].removeEventListener(list[i][1], list[i][2]);
								list.splice(i, 1);
							}
						}
					}else if (eventOptional && funcOptional){
						for (var i = list.length - 1; i >= 0; i--){
							if (list[i][1] == eventOptional && list[i][2] == funcOptional){
								list[i][0].removeEventListener(list[i][1], list[i][2]);
								list.splice(i, 1);
							}
						}
					}else if (listenElementOptional){
						for (var i = list.length - 1; i >= 0; i--){
							if (list[i][0] == listenElementOptional){
								list[i][0].removeEventListener(list[i][1], list[i][2]);
								list.splice(i, 1);
							}
						}
					}else if (eventOptional){
						for (var i = list.length - 1; i >= 0; i--){
							if (list[i][1] == eventOptional){
								list[i][0].removeEventListener(list[i][1], list[i][2]);
								list.splice(i, 1);
							}
						}
					}else if (funcOptional){
						for (var i = list.length - 1; i >= 0; i--){
							if (list[i][2] == funcOptional){
								list[i][0].removeEventListener(list[i][1], list[i][2]);
								list.splice(i, 1);
							}
						}
					}
				},
				clear:function(){
					if (!this._dialog || !this._list) return console.error('undefined');
					
					var list = this._list;
					for (var i = list.length - 1; i >= 0; i--){
						list[i][0].removeEventListener(list[i][1], list[i][2]);
						list[i] = undefined;
					}
					list.length = 0;
				}
			}
		},
		animate:{
			check:function(){
				if (!ui.arena) return false;
				if (this.updates == undefined) this.updates = [];
				if (this.canvas == undefined) {
					this.canvas = ui.arena.appendChild(document.createElement('canvas'));
					this.canvas.id = 'decadeUI-canvas-arena';
				}
				
				return true;
			},
			add:function(frameFunc){
				if (typeof frameFunc != 'function') return;
				if (!this.check()) return;

				var obj = {
					inits: [],
					update: frameFunc,
					id: decadeUI.getRandom(0, 100),
				};
				
				if (arguments.length > 2) {
					obj.inits = new Array(arguments.length - 2);
					for (var i = 2; i < arguments.length; i++) {
						obj.inits[i - 2] = arguments[i];
					}
				}
				
				this.updates.push(obj);
				if (this.frameId == undefined) this.frameId = requestAnimationFrame(this.update.bind(this));
			},
			update:function(){
				var frameTime = performance.now();
				var delta = frameTime - (this.frameTime == undefined ? frameTime : this.frameTime);
				
				this.frameTime = frameTime;
				var e = {
					canvas: this.canvas,
					context: this.canvas.getContext('2d'),
					deltaTime: delta,
					save:function(){
						this.context.save();
						return this.context;
					},
					restore:function(){
						this.context.restore();
						return this.context;
					},
					drawLine:function(x1, y1, x2, y2, color, lineWidth){
						if (x1 == null || y1 == null) throw 'arguments';
						
						var context = this.context;
						context.beginPath();
						
						if (color) context.strokeStyle = color;
						if (lineWidth) context.lineWidth = lineWidth;
						
						if (x2 == null || y2 == null) {
							context.lineTo(x1, y1);
						} else {
							context.moveTo(x1, y1);
							context.lineTo(x2, y2);
						}
						
						context.stroke();
					},
					drawRect:function(x, y , width, height, color, lineWidth){
						if (x == null || y == null || width == null || height == null) throw 'arguments';
						
						var ctx = this.context;
						ctx.beginPath();
						
						if (color) ctx.strokeStyle = color;
						if (lineWidth) ctx.lineWidth = lineWidth;
						ctx.rect(x, y, width, height);
						ctx.stroke();
					},
					drawText:function(text, font, color, x, y, textAlign, textBaseline, stroke){
						if (!text) return;
						if (x == null || y == null) throw 'x or y';
						var context = this.context;
						
						if (font) context.font = font;
						if (textAlign) context.textAlign = textAlign;
						if (textBaseline) context.textBaseline = textBaseline;
						if (color) {
							if (!stroke) context.fillStyle = color;
							else context.strokeStyle = color;
						}
						
						if (!stroke) context.fillText(text, x, y);
						else context.strokeText(text, x, y);
					},
					drawStrokeText:function(text, font, color, x, y, textAlign, textBaseline){
						this.drawText(text, font, color, x, y, textAlign, textBaseline, true);
					},
					fillRect:function(x, y , width, height, color){
						if (color) this.context.fillStyle = color;
						this.context.fillRect(x, y , width, height);
					},
				}
				
				if (!decadeUI.dataset.animSizeUpdated) {
					decadeUI.dataset.animSizeUpdated = true;
					e.canvas.width = e.canvas.parentNode.offsetWidth;
					e.canvas.height = e.canvas.parentNode.offsetHeight;
				}
				
				e.canvas.height = e.canvas.height;
				var args;
				var task;
				for (var i = 0; i < this.updates.length; i++) {
					task = this.updates[i];
					args = Array.from(task.inits);
					args.push(e);
					e.save();
					if (task.update.apply(task, args)) {
						this.updates.remove(task);i--;
					}
					e.restore();
				}
				
				if (this.updates.length == 0) {
					this.frameId = undefined;
					this.frameTime = undefined;
					return;
				}
				
				this.frameId = requestAnimationFrame(this.update.bind(this));
			},
		},
		//尝试用新的方法
		/*ResizeSensor: (function() {
            function ResizeSensor(element) {
                this.element = element;
                this.width = element.clientWidth || 1;
                this.height = element.clientHeight || 1;
                this.events = [];
                
                // 使用现代ResizeObserver API
                this.observer = new ResizeObserver(entries => {
                    for (const entry of entries) {
                        if (entry.target === this.element) {
                            const newWidth = Math.floor(entry.contentRect.width);
                            const newHeight = Math.floor(entry.contentRect.height);
                            
                            if (newWidth !== this.width || newHeight !== this.height) {
                                this.width = newWidth;
                                this.height = newHeight;
                                this.dispatchEvent();
                            }
                        }
                    }
                });
                
                // 开始观察元素
                this.observer.observe(this.element);
            }
            
            ResizeSensor.prototype.addListener = function(callback, capture) {
                if (!this.events) this.events = [];
                this.events.push({
                    callback: callback,
                    capture: capture
                });
            };
            
            ResizeSensor.prototype.dispatchEvent = function() {
                let capture = false;
                
                for (let i = 0; i < this.events.length; i++) {
                    const evt = this.events[i];
                    if (evt.capture) {
                        evt.callback();
                    } else {
                        capture = true;
                    }
                }
                
                if (capture) {
                    requestAnimationFrame(this.dispatchFrameEvent.bind(this));
                }
            };
            
            ResizeSensor.prototype.dispatchFrameEvent = function() {
                for (let i = 0; i < this.events.length; i++) {
                    const evt = this.events[i];
                    if (!evt.capture) {
                        evt.callback();
                    }
                }
            };
            
            ResizeSensor.prototype.close = function() {
                if (this.observer) {
                    this.observer.disconnect();
                    this.observer = null;
                }
                this.events = null;
                this.element = null;
            };
            
            return ResizeSensor;
        })(),*/
		ResizeSensor: (function() {
            function ResizeSensor(element) {
                this.element = element;
                this.width = element.clientWidth || 1;
                this.height = element.clientHeight || 1;
                this.maximumWidth = 10000 * (this.width);
                this.maximumHeight = 10000 * (this.height);
                this.events = [];
                
                var expand = document.createElement('div');
                expand.style.cssText = 'position:absolute;top:0;bottom:0;left:0;right:0;z-index:-10000;overflow:hidden;visibility:hidden;transition:all 0s;';
                var shrink = expand.cloneNode(false);
        
                var expandChild = document.createElement('div');
                expandChild.style.cssText = 'transition: all 0s !important; animation: none !important;';
                var shrinkChild = expandChild.cloneNode(false);
        
                expandChild.style.width = this.maximumWidth + 'px';
                expandChild.style.height = this.maximumHeight + 'px';
                shrinkChild.style.width = '250%';
                shrinkChild.style.height = '250%';
                
                expand.appendChild(expandChild);
                shrink.appendChild(shrinkChild);
                element.appendChild(expand);
                element.appendChild(shrink);
                
                if (expand.offsetParent !== element) {
                    element.style.position = 'relative';
                }
                
                expand.scrollTop = shrink.scrollTop = this.maximumHeight;
                expand.scrollLeft = shrink.scrollLeft = this.maximumWidth;
                
                var sensor = this;
                sensor.onscroll = function() {
                    var newWidth = sensor.element.clientWidth || 1;
                    var newHeight = sensor.element.clientHeight || 1;
                    
                    if (newWidth !== sensor.width || newHeight !== sensor.height) {
                        sensor.width = newWidth;
                        sensor.height = newHeight;
                        sensor.dispatchEvent();
                    }
                    
                    expand.scrollTop = shrink.scrollTop = sensor.maximumHeight;
                    expand.scrollLeft = shrink.scrollLeft = sensor.maximumWidth;
                };
                
                expand.addEventListener('scroll', sensor.onscroll);
                shrink.addEventListener('scroll', sensor.onscroll);
                sensor.expand = expand;
                sensor.shrink = shrink;
            }
            
            ResizeSensor.prototype.addListener = function(callback, capture) {
                if (this.events === undefined) this.events = [];
                this.events.push({
                    callback: callback,
                    capture: !!capture
                });
            };
            
            ResizeSensor.prototype.dispatchEvent = function() {
                var hasCaptureListeners = false;
                
                for (var i = 0; i < this.events.length; i++) {
                    var evt = this.events[i];
                    if (evt.capture) {
                        hasCaptureListeners = true;
                        evt.callback();
                    }
                }
                
                if (!hasCaptureListeners) {
                    requestAnimationFrame(this.dispatchFrameEvent.bind(this));
                }
            };
            
            ResizeSensor.prototype.dispatchFrameEvent = function() {
                for (var i = 0; i < this.events.length; i++) {
                    var evt = this.events[i];
                    if (!evt.capture) {
                        evt.callback();
                    }
                }
            };
            
            ResizeSensor.prototype.close = function() {
                if (this.expand) {
                    this.expand.removeEventListener('scroll', this.onscroll);
                }
                if (this.shrink) {
                    this.shrink.removeEventListener('scroll', this.onscroll);
                }
                
                if (this.element && this.expand && this.shrink) {
                    this.element.removeChild(this.expand);
                    this.element.removeChild(this.shrink);
                }
                
                this.events = null;
                this.expand = null;
                this.shrink = null;
                this.element = null;
            };
            
            return ResizeSensor;
        })(),
		sheet:{
			init:function(){
				if (!this.sheetList){
					this.sheetList = [];
					for (var i = 0; i < document.styleSheets.length; i++){
						if (document.styleSheets[i].href && document.styleSheets[i].href.indexOf('extension/' + encodeURI(extensionName)) != -1){
							this.sheetList.push(document.styleSheets[i]);
						}
					}
				}
				
				if (this.sheetList) delete this.init;
			},
			getStyle:function(selector, cssName){
				if (!this.sheetList) this.init();
				if (!this.sheetList) throw 'sheet not loaded';
				if ((typeof selector != 'string') || !selector) throw 'parameter "selector" error';
				if (!this.cachedSheet) this.cachedSheet = {};
				if (this.cachedSheet[selector]) return this.cachedSheet[selector];
				
				
				var sheetList = this.sheetList;
				var sheet;
				var shouldBreak = false;
				
				for (var j = sheetList.length - 1; j >= 0; j--) {
					if (typeof cssName == 'string') {
						cssName = cssName.replace(/.css/, '') + '.css';
						for (var k = j; k >= 0; k--) {
							if (sheetList[k].href.indexOf(cssName) != -1) {
								sheet = sheetList[k];
							}
						}
						
						shouldBreak = true;
						if (!sheet) throw 'cssName not found';
					} else {
						sheet = sheetList[j];
					}

					for (var i = 0; i < sheet.cssRules.length; i++) {
						if (!(sheet.cssRules[i] instanceof CSSMediaRule)) {
							if (sheet.cssRules[i].selectorText == selector) {
								this.cachedSheet[selector] = sheet.cssRules[i].style;
								return sheet.cssRules[i].style;
							}
						} else {
							var rules = sheet.cssRules[i].cssRules;
							for (var j = 0; j < rules.length; j++) {
								if (rules[j].selectorText == selector) {
									return rules[j].style;
								}
							}
						}
					}
					
					
					if (shouldBreak) break;
				}
				
				return null;
			},
			insertRule:function(rule, index, cssName){
				if (!this.sheetList) this.init();
				if (!this.sheetList) throw 'sheet not loaded';
				if ((typeof rule != 'string') || !rule) throw 'parameter "rule" error';
				
				var sheet;
				if (typeof cssName == 'string') {
					for (var j = sheetList.length - 1; j >= 0; j--) {
						cssName = cssName.replace(/.css/, '') + '.css';
						if (sheetList[j].href.indexOf(cssName) != -1) {
							sheet = sheetList[k];
						}
					}
					
					if (!sheet) throw 'cssName not found';
				}
				
				if (!sheet) sheet = this.sheetList[this.sheetList.length - 1];
				var inserted = 0;
				if (typeof index == 'number'){
					inserted = sheet.insertRule(rule, index);
				} else {
					inserted = sheet.insertRule(rule, sheet.cssRules.length);
				}
				
				return sheet.cssRules[inserted].style;
			}
		},
		layout:{
			update:function(){
				this.updateHand();
				this.updateDiscard();

			},
			updateHand:function(){
				if (!game.me)
					return;
				
				var handNode = ui.handcards1;
				if (!handNode)
					return console.error('hand undefined');
				
				var card;
				var cards = [];
				var childs = handNode.childNodes;
				for (var i = 0; i < childs.length; i++) {
					card = childs[i];
					if (!card.classList.contains('removing')) {
						cards.push(card);
					} else {
						card.scaled = false;
					}
				}
				
				if (!cards.length)
					return;
				
				var bounds = dui.boundsCaches.hand;
				bounds.check();
				
				var pw = bounds.width;
				var ph = bounds.height;
				var cw = bounds.cardWidth;
				var ch = bounds.cardHeight;
				var cs = bounds.cardScale;
				
				var csw  = cw * cs;
				var x;
				var y = Math.round((ch * cs - ch) / 2);
				
				var xMargin = csw + 2;
				var xStart = (csw - cw) / 2;
				var totalW = cards.length * csw + (cards.length - 1) * 2;
				var limitW = pw;
				var expand;
				
				if (totalW > limitW) {
					xMargin = csw - Math.abs(limitW - csw * cards.length) / (cards.length - 1);
					if (lib.config.fold_card) {
						var min = 27 * cs;
						if (xMargin < min) {
							expand = true;
							xMargin = min;
						}
					}
				} else {
					/*-----------------分割线-----------------*/
					// 手牌折叠方式
					// xStart += (limitW - totalW) / 2; //居中
					// xStart += (limitW - totalW) / 1; //靠右
					xStart += 0; //靠左
				}
				
				var card;
				for (var i = 0; i < cards.length; i++){
					x = Math.round(xStart + i * xMargin);
					card = cards[i];
					card.tx = x;
					card.ty = y;
					card.scaled = true;
					card.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + cs + ')';
					card._transform = card.style.transform;
				}
				
				if (expand) {
					/*-----------------分割线-----------------*/
					// 手牌滑动，咸鱼大佬提供代码
					ui.handcards1Container.classList.add("scrollh");
					ui.handcards1Container.style.overflowX = 'scroll';
					ui.handcards1Container.style.overflowY = 'hidden';
					handNode.style.width = Math.round(cards.length * xMargin + (csw - xMargin)) + 'px';
				} else {
					/*-----------------分割线-----------------*/
					// 手牌滑动，咸鱼大佬提供代码
					ui.handcards1Container.classList.remove("scrollh");
					ui.handcards1Container.style.overflowX = '';
					ui.handcards1Container.style.overflowY = '';
					handNode.style.width = '100%';
				}
			},
			updateDiscard:function(){
				if (!ui.thrown)
					ui.thrown = [];
				
				for (var i = ui.thrown.length - 1; i >= 0; i--){
					if (ui.thrown[i].classList.contains('drawingcard') ||
					   ui.thrown[i].classList.contains('removing') ||
					   ui.thrown[i].parentNode != ui.arena || ui.thrown[i].fixed){
						ui.thrown.splice(i, 1);
					}else{
					    ui.thrown[i].classList.remove('removing');
					}
				}
				
				if (!ui.thrown.length)
					return;
				
				var cards = ui.thrown;
				var bounds = dui.boundsCaches.arena;
				bounds.check();
				
				var pw = bounds.width;
				var ph = bounds.height;
				var cw = bounds.cardWidth;
				var ch = bounds.cardHeight;
				var cs = bounds.cardScale;
				
				var csw  = cw * cs;
				var x;
				var y = Math.round((ph - ch) / 2);
				
				var xMargin = csw + 2;
				var xStart = (csw - cw) / 2;
				var totalW = cards.length * csw + (cards.length - 1) * 2;
				var limitW = pw;
				
				if (totalW > limitW) {
					xMargin = csw - Math.abs(limitW - csw * cards.length) / (cards.length - 1);
				} else {
					xStart += (limitW - totalW) / 2;
				}
				
				var card;
				for (var i = 0; i < cards.length; i++){
					x = Math.round(xStart + i * xMargin);
					card = cards[i];
					card.tx = x;
					card.ty = y;
					card.scaled = true;
					card.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + cs + ')';
				}
			},
			clearout:function(card){
			    if (!card)
					return;
				
			    if (card.fixed || card.classList.contains('removing'))
					return;
			    
				if (ui.thrown.indexOf(card) == -1){
					ui.thrown.splice(0, 0, card);
					dui.queueNextFrameTick(dui.layoutDiscard, dui);
				}
				
				if (!card.classList.contains('invalided')) {
				    
					var event = _status.event;
    				var judging = event.triggername == 'judge' || event.name == 'judge';
    				if (event.name == 'judge' && !ui.clear.delay){
    				    ui.clear.delay = 'judge';
    				    event.parent.addMessageHook('finished', function(){
							if (ui.clear.delay == 'judge'){
								ui.clear.delay = false;
								ui.clear();
							}
						});
    				}
    				if (ui.clear.delay || (judging && !event.finished))
						return;
				}
				if (lib.config["extension_史诗卡牌_cardPhantom"]) {
    				if(!card.isInvlocked) card.classList.add('invalidlock');
    				card.classList.add('invalided');
    				setTimeout(function(card){
    					card.classList.remove('invalidlock');
    					card.isInvlocked=true;
    					setTimeout(function(card){
        					card.classList.add('cardfly');
        					setTimeout(function(card){
            					card.remove();
            					dui.queueNextFrameTick(dui.layoutDiscard, dui);
        					}, 333, card);
    					}, 2000, card);
    				}, 500, card);
    				//清除弃牌显示的位置，需要调整这里和EpicFX幻影牌的关系
				}else {
				    //原版
				    card.classList.add('invalided');
    				setTimeout(function(card){
    					card.remove();
    					dui.queueNextFrameTick(dui.layoutDiscard, dui);
    				}, 2333, card);
				}
			},
			delayClear:function(){
			    var timestamp = 500;
			    var nowTime = new Date().getTime();
			    if (this._delayClearTimeout){
			        clearTimeout(this._delayClearTimeout);
			        timestamp = nowTime - this._delayClearTimeoutTime;
			        if (timestamp > 1000){
			            this._delayClearTimeout = null;
			            this._delayClearTimeoutTime = null;
			            ui.clear();
			            return;
			        }
			    }else{
			        this._delayClearTimeoutTime = nowTime;
			    }
			    
			    this._delayClearTimeout = setTimeout(function(){
			        decadeUI.layout._delayClearTimeout = null;
			        decadeUI.layout._delayClearTimeoutTime = null;
			        ui.clear();
			    }, timestamp);
			},
			invalidate:function(){
			    this.invalidateHand();
			    this.invalidateDiscard();
			},
			invalidateHand:function(debugName){
			    //和上下面的有点重复，有空合并
			    var timestamp = 40;
			    var nowTime = new Date().getTime();
			    if (this._handcardTimeout){
			        clearTimeout(this._handcardTimeout);
			        timestamp = nowTime - this._handcardTimeoutTime;
			        if (timestamp > 180){
			            this._handcardTimeout = null;
			            this._handcardTimeoutTime = null;
			            this.updateHand();
			            return;
			        }
			    }else{
			        this._handcardTimeoutTime = nowTime;
			    }
			    
			    this._handcardTimeout = setTimeout(function(){
			        decadeUI.layout._handcardTimeout = null;
			        decadeUI.layout._handcardTimeoutTime = null;
			        decadeUI.layout.updateHand();
			    }, timestamp);
			},
			invalidateDiscard:function(){
			    var timestamp = (ui.thrown && ui.thrown.length > 15) ? 80 : 40;
			    var nowTime = new Date().getTime();
			    if (this._discardTimeout){
			        clearTimeout(this._discardTimeout);
			        timestamp = nowTime - this._discardTimeoutTime;
			        if (timestamp > 180){
			            this._discardTimeout = null;
			            this._discardTimeoutTime = null;
			            this.updateDiscard();
			            return;
			        }
			    }else{
			        this._discardTimeoutTime = nowTime;
			    }
			    
			    this._discardTimeout = setTimeout(function(){
			        decadeUI.layout._discardTimeout = null;
			        decadeUI.layout._discardTimeoutTime = null;
			        decadeUI.layout.updateDiscard();
			    }, timestamp);
			},
			resize:function(){
				if (decadeUI.isMobile())
					ui.arena.classList.add('dui-mobile');
				else 
					ui.arena.classList.remove('dui-mobile');
				
				var set = decadeUI.dataset;
				set.animSizeUpdated = false;
				set.bodySize.updated = false;
				
				var caches = decadeUI.boundsCaches;
				for (var key in caches)
					caches[key].updated = false;
				
				var buttonsWindow = decadeUI.sheet.getStyle('#window > .dialog.popped .buttons:not(.smallzoom)');
				if (!buttonsWindow) {
					buttonsWindow = decadeUI.sheet.insertRule('#window > .dialog.popped .buttons:not(.smallzoom) { zoom: 1; }');
				}
				
				var buttonsArena = decadeUI.sheet.getStyle('#arena:not(.choose-character) .buttons:not(.smallzoom)');
				if (!buttonsArena){
				    buttonsArena = decadeUI.sheet.insertRule('#arena:not(.choose-character) .buttons:not(.smallzoom) { zoom: 1; }');
				}
				
				decadeUI.zooms.card = decadeUI.getCardBestScale();
				if (ui.me) {
					var height = Math.round(decadeUI.getHandCardSize().height * decadeUI.zooms.card + 40) + 'px';
					ui.me.style.height = height;
				}
				
				if (buttonsArena) {
					buttonsArena.zoom = decadeUI.zooms.card;
				}
				
				if (buttonsWindow) {
					buttonsWindow.zoom = decadeUI.zooms.card;
				}
				
			    decadeUI.layout.invalidate();
			},
			
		},
		handler:{
			handMousewheel:function(e){
				if (!ui.handcards1Container) return console.error('ui.handcards1Container');
				
				var hand = ui.handcards1Container;
				if (hand.scrollNum == void 0) hand.scrollNum = 0;
				if (hand.lastFrameTime == void 0) hand.lastFrameTime = performance.now();
				
				function handScroll () {
					var now = performance.now();
					var delta = now - hand.lastFrameTime;
					var num = Math.round(delta / 16 * 16);
					hand.lastFrameTime = now;
					
					if (hand.scrollNum > 0) {
						num = Math.min(hand.scrollNum, num);
						hand.scrollNum -= num;
					} else {
						num = Math.min(-hand.scrollNum, num);
						hand.scrollNum += num;
						num = -num;
					}
					
					if (hand.scrollNum == 0) {
						hand.frameId = void 0;
						hand.lastFrameTime = void 0;
					} else {
						hand.frameId = requestAnimationFrame(handScroll);
						ui.handcards1Container.scrollLeft += num;
					}
				}
				
				if (e.wheelDelta > 0) {
					hand.scrollNum -= 84;
				} else {
					hand.scrollNum += 84;
				}
				
				if (hand.frameId == void 0) {
					hand.frameId = requestAnimationFrame(handScroll);
				}
			},
		},
		zooms:{
			body: 1,
			card: 1,
		},
		isMobile:function(){
		    //赫拉震怒
		    return true;
		    //return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent));
		},
		delay:function(milliseconds){
		   if (typeof milliseconds != 'number') throw 'milliseconds is not number';
		    if(_status.paused) return;
			game.pause();
			_status.timeout = setTimeout(game.resume, milliseconds);
		},
		
		queueNextTick:function(callback, ctx){
			if (!dui._tickEntries)
				dui._tickEntries = [];
			
			dui._tickEntries.push({
				ctx: ctx,
				callback: callback
			});
			
			if (dui._queueTick)
				return;
			
			dui._queueTick = Promise.resolve().then(function(){
				dui._queueTick = null;
				var entries = dui._tickEntries;
				dui._tickEntries = [];
				for (var i = 0; i < entries.length; i++)
					entries[i].callback.call(entries[i].ctx);
			});
		},
		queueNextFrameTick:function(callback, ctx){
			if (!dui._frameTickEntries)
				dui._frameTickEntries = [];
			
			dui._frameTickEntries.push({
				ctx: ctx,
				callback: callback
			});
			
			if (dui._queueFrameTick)
				return;
			
			dui._queueFrameTick = requestAnimationFrame(function(){
				dui._queueFrameTick = null;
				setTimeout(function(entries){
					for (var i = 0; i < entries.length; i++)
						entries[i].callback.call(entries[i].ctx);
					
				}, 0, dui._frameTickEntries);
				dui._frameTickEntries = [];
			})
			
			var elements = document.querySelectorAll(".phantom");
			if(elements.length) for(let e=0;e<elements.length;e++) {
			    //if(!elements[e].parentCard) continue;
			    //elements[e].style.transform=elements[e].parentCard.style.transform;
			    if(!elements[e].followParent) continue;
			    elements[e].followParent();
			}
		},
		
		layoutHand:function(){
			dui.layout.updateHand();
		},
		
		layoutHandDraws:function(cards){
			var bounds = dui.boundsCaches.hand;
			bounds.check();
			
			var x, y;
			var pw = bounds.width;
			var ph = bounds.height;
			var cw = bounds.cardWidth;
			var ch = bounds.cardHeight;
			var cs = bounds.cardScale;
			var csw = cw * cs;
			var xStart, xMargin;
			
			var draws = [];
			var card;
			var clone;
			var source = cards.duiMod;
			if (source && source != game.me) {
				source.checkBoundsCache();
				xMargin = 27;
				xStart =  source.cacheLeft - bounds.x - csw / 2 - (cw - csw) / 2;
				var totalW = xMargin * cards.length + (csw - xMargin);
				var limitW = source.cacheWidth + csw;
				if (totalW > limitW) {
					xMargin = csw - Math.abs(limitW - csw * cards.length) / (cards.length - 1);
				} else {
					xStart += (limitW - totalW) / 2;
				}
				
				y = Math.round((source.cacheTop - bounds.y - 30 + (source.cacheHeight - ch) / 2));
				for (var i = 0; i < cards.length; i++) {
					x = Math.round(xStart + i * xMargin);
					card = cards[i];
					card.tx = x;
					card.ty = y;
					card.fixed = true;
					card.scaled = true;
					card.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + cs + ')';
				}
				return;
			} else {
				for (var i = 0; i < cards.length; i++) {
					card = cards[i];
					clone = card.clone;
					if (clone && !clone.fixed && clone.parentNode == ui.arena) {
						x = Math.round(clone.tx - bounds.x);
						y = Math.round(clone.ty - (bounds.y + 30));
						card.tx = x;
						card.ty = y;
						card.scaled = true;
						card.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + cs + ')';
					} else {
						draws.push(card);
					}
				}
			}
			
			y = Math.round(-ch * cs * 2);
			xMargin = csw * 0.5;
			xStart = (pw - xMargin * (draws.length + 1)) / 2 - (cw - csw) / 2;
			
			for (var i = 0; i < draws.length; i++) {
				x = Math.round(xStart + i * xMargin);
				card = draws[i];
				card.tx = x;
				card.ty = y;
				card.scaled = true;
				card.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + cs + ')';
			}
		},
		
		layoutDrawCards:function(cards, player, center){
			var bounds = dui.boundsCaches.arena;
			if (!bounds.updated)
				bounds.update();
			
			player.checkBoundsCache();
			var playerX = player.cacheLeft;
			var playerY = player.cacheTop;
			var playerW = player.cacheWidth;
			var playerH = player.cacheHeight;
			
			var pw = bounds.width;
			var ph = bounds.height;
			var cw = bounds.cardWidth;
			var ch = bounds.cardHeight;
			var cs = bounds.cardScale;
			var csw = cw * cs;
			
			var xMargin = 27;
			var xStart = (center ? (pw - playerW) / 2 : playerX) - csw / 2 - (cw - csw) / 2;
			var totalW = xMargin * cards.length + (csw - xMargin);
			var limitW = playerW + csw;
			
			if (totalW > limitW) {
				xMargin = csw - Math.abs(limitW - csw * cards.length) / (cards.length - 1);
			} else {
				xStart += (limitW - totalW) / 2;
			}
			
			var x;
			var y;
			if (center)
				y = Math.round((ph - ch) / 2);
			else
				y = Math.round(playerY + (playerH - ch) / 2);
			
			var card;
			for (var i = 0; i < cards.length; i++) {
				x = Math.round(xStart + i * xMargin);
				card = cards[i];
				card.tx = x;
				card.ty = y;
				card.scaled = true;
				card.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + cs + ')';
			}
		},
		
		layoutDiscard:function(){
			dui.layout.updateDiscard();
		},
		
		delayRemoveCards:function(cards, delay, delay2){
			if (!Array.isArray(cards))
				cards = [cards];
			
			setTimeout(function(cards, delay2){
				var remove = function (cards) {
					for (var i = 0; i < cards.length; i++)
						cards[i].remove();
				};
				
				if (delay2 == null) {
					remove(cards);
					return;
				}
				
				for (var i = 0; i < cards.length; i++)
					cards[i].classList.add('removing');
				
				setTimeout(remove, delay2, cards)
			}, delay, cards, delay2)
		},
		
		tryAddPlayerCardUseTag:function(card, player, event){
			if (!card)
				return;
			
			if (!player)
				return;
			
			if (!event)
				return;
			
			var noname;
			var tagText = '';
			var tagNode = card.querySelector('.used-info');
			if (tagNode == null)
				tagNode = card.appendChild(dui.element.create('used-info'));
			
			card.$usedtag = tagNode;
			var blameEvent;
			if (event.blameEvent)
				event = event.blameEvent;
			
			switch (event.name.toLowerCase()) {
				case 'usecard':
                            if (event.targets.length == 1) {
                                if (event.targets[0] == player) {
                                    tagText = '<br>' + "<font color=\"#FFFF00;\">" + "对" + "</font>" + get.translation(player);//绿色

                                }
                                else
                                    tagText = '<br>' + "<font color=\"#FFFF00 ;\">" + '对' + "</font>" + get.translation(event.targets[0]);//红色

                            } else {
                                tagText = '<br>' + "<font color=\"#FFFF00 ;\">" + '使用' + "</font>";//紫色
                            }
                        case 'respond':
                            if (tagText == '')
                                tagText = '<br>' + "<font color=\"#FFFF00;\">" + '打出' + "</font>";
					
                            var cardname = event.card.name;
                            var cardnature = event.card.nature;
							if ((lib.config.cardtempname != 'off') && ((card.name != cardname) || (card.nature != cardnature))) {
								if (!card._tempName) card._tempName = ui.create.div('.temp-name', card);
								
								var tempname = get.translation(cardname);
								if (cardnature&&!['huogong'].contains(cardname)) {
									card._tempName.dataset.nature = cardnature;
									card._tempName.dataset.name = cardname;
									if (cardname == 'sha') {
										tempname = get.translation(cardnature) + tempname;
									}
								}
								//------------定义卡牌名称----------//
								if(cardname){
									card._tempName.dataset.name = cardname;
									tempname = get.translation(cardname);
								}
								//--------------------------//
							}
							
					if (duicfg.cardUseEffect && event.card && (!event.card.cards || event.card.cards.length == 1)) {
						var name = event.card.name;
						var nature = event.card.nature;
						
						switch (name) {
							case 'effect_caochuanjiejian':
								decadeUI.animation.cap.playSpineTo(card, 'effect_caochuanjiejian');
								break;
							case 'sha':
								switch (nature) {
									case 'thunder':
										decadeUI.animation.cap.playSpineTo(card, 'effect_leisha');
										break;
									case 'fire':
										decadeUI.animation.cap.playSpineTo(card, 'effect_huosha');
										break;
									default:
										if (get.color(card) == 'red') {
											decadeUI.animation.cap.playSpineTo(card, 'effect_hongsha');
										} else {
											decadeUI.animation.cap.playSpineTo(card, 'effect_heisha');
										}
										break;
								}
								break;
							case 'shan':
								decadeUI.animation.cap.playSpineTo(card, 'effect_shan');
								break;
							case 'tao':
								decadeUI.animation.cap.playSpineTo(card, 'effect_tao', { scale: 0.9 });
								break;
							case 'tiesuo':
								decadeUI.animation.cap.playSpineTo(card, 'effect_tiesuolianhuan', { scale: 0.9 });
								break;
							case 'jiu':
								decadeUI.animation.cap.playSpineTo(card, 'effect_jiu', { y:[-30, 0.5] });
								break;
							case 'kaihua':
								decadeUI.animation.cap.playSpineTo(card, 'effect_shushangkaihua');
								break;
							case 'wuzhong':
								decadeUI.animation.cap.playSpineTo(card, 'effect_wuzhongshengyou');
								break;
							case 'wuxie':
								decadeUI.animation.cap.playSpineTo(card, 'effect_wuxiekeji', { y:[10, 0.5], scale: 0.9 });
								// break;
							// case 'nanman':
								// decadeUI.animation.cap.playSpineTo(card, 'effect_nanmanruqin', { scale: 0.45 });
								break;
							case 'wanjian':
								   decadeUI.animation.cap.playSpineTo(card, 'effect_wanjianqifa', { scale: 0.78 });
								break;
							case 'wugu':
								decadeUI.animation.cap.playSpineTo(card, 'effect_wugufengdeng', { y:[10, 0.5] });
								break;
							   case 'taoyuan':
								decadeUI.animation.cap.playSpineTo(card, 'effect_taoyuanjieyi', { y:[10, 0.5] });
								break;
							case 'shunshou':
								decadeUI.animation.cap.playSpineTo(card, 'effect_shunshouqianyang');
								break;
							case 'huogong':
								decadeUI.animation.cap.playSpineTo(card, 'effect_huogong', { x:[8, 0.5], scale: 0.5 });
								break;
							case 'guohe':
								decadeUI.animation.cap.playSpineTo(card, 'effect_guohechaiqiao', { y:[10, 0.5] });
								break;
							case 'yuanjiao':
								decadeUI.animation.cap.playSpineTo(card, 'effect_yuanjiaojingong');
								break;
							case 'zhibi':
								decadeUI.animation.cap.playSpineTo(card, 'effect_zhijizhibi');
								break;
							case 'zhulu_card':
								decadeUI.animation.cap.playSpineTo(card, 'effect_zhulutianxia');
								break;
						}
					}
					break;
                        case 'useskill':
                            /*tagText = "<font color=\"#FFFF00 ;\">" + '发动' + "</font>";*/
                            tagText = "";
                            break;
                        case 'die':
                            tagText = '<br>' + "<font color=\"#FFFF00 ;\">" + '弃牌' + "</font>";
                            card.classList.add('invalided');
                            dui.layout.delayClear();
                            break;
                        case 'lose':
                            if (event.parent && event.parent.name == 'discard' && event.parent.parent) {
                                var skillEvent = event.parent.parent.parent;
                                if (skillEvent) {
                                    /*tagText = '';*/
                                    if (lib.translate[skillEvent.name != 'useSkill' ? skillEvent.name : skillEvent.skill]) {
                                        if (lib.translate[skillEvent.name != 'useSkill' ? skillEvent.name : skillEvent.skill] == '过河拆桥')
                                            tagText = '<br>' + "<font color=\"#FFFF00 ;\">" + '被拆' + "</font>";
                                        else {
                                            tagText = '<br>' + "<font color=\"#FFFF00 ;\">" + lib.translate[skillEvent.name != 'useSkill' ? skillEvent.name : skillEvent.skill] + "</font>";
                                            if (!tagText)
                                                tagText = '<br>';
                                            /* tagText += '弃置';*/
                                            tagText += "<font color=\"#FFFF00 ;\">" + '弃牌' + "</font>";
                                        }
                                    }
                                    else
                                        tagText = '<br>' + "<font color=\"#FFFF00 ;\">" + '弃牌' + "</font>";
                                    break;
                                }
                            }
                        case 'discard':
                            tagText = '<br>' + "<font color=\"#FFFF00 ;\">" + '弃牌' + "</font>";
                            break;
                        case 'phaseJudge':
                            tagText = '<br>' + "<font color=\"#FFFF00 ;\">" + '即将生效' + "</font>";
                            break;
                        case 'judge':
                            noname = true;
                            tagText = event.judgestr + '的' + '<br>' + "<font color=\"#FFFF00;\">" + '判定牌' + "</font>";
                            event.addMessageHook('judgeResult', function () {
                                var event = this;
                                var card = event.result.card.clone;
                                var apcard = event.apcard;

                                var tagText = '';
                                var tagNode = card.querySelector('.used-info');
                                if (tagNode == null)
                                    tagNode = card.appendChild(dui.element.create('used-info'));

                                var action;
                                var judgeValue;
                                var getEffect = event.judge2;
                                if (getEffect) {
                                    judgeValue = getEffect(event.result);
                                } else {
                                    judgeValue = decadeUI.get.judgeEffect(event.judgestr, event.result.judge);
                                }

                                if ((typeof judgeValue == 'boolean')) {
                                    judgeValue = judgeValue ? 1 : -1;
                                } else {
                                    judgeValue = event.result.judge;
                                }

								if (judgeValue >= 0) {

									action = 'play1';
									tagText = '<br>' + "<font color=\"#33FF00;\">" + '判定生效' + "</font>";
								} else {
									action = 'play2';
									tagText = '<br>' + "<font color=\"#FF0000;\">" + '判定失效' + "</font>";
								}

			/*					if (apcard && apcard._ap)
									apcard._ap.stopSpineAll();
								if (apcard && apcard._ap && apcard == card) {
									apcard._ap.playSpine({
										name: 'effect_panding',
										action: action
									});
								} else {
									decadeUI.animation.playSpine( {
										name: 'effect_panding',
										action: action
									},{parent:card});
								}
*/
								event.apcard = undefined;
								tagNode.innerHTML = get.translation(event.judgestr) + tagText;
							});

						/*	if (duicfg.cardUseEffect) {
								decadeUI.animation.cap.playSpineTo(card, {
									name: 'effect_panding',
									action: 'play',
									loop: true
								});

								event.apcard = card;
							}*/
							break;
						case 'showcards':
							tagText = '<br>' + "<font color=\"#FFFF00 ;\">" + get.translation(event.getParent()) + "展示</font>";
							break;
						case "loseasync":
							if (event.parent) {
								if (player == event.parent.target) {
									tagText = `<span class="colorText warpAndBigger">被 拆</span>`;
								} else {
									tagText = `<span class="colorText warpAndBigger">${get.translation(event.parent.name)}弃牌</span>`;
								}
							}
							break;
						default:
							//   tagText = '<br>' + "<font color=\"#FFFF00 ;\">" + get.translation(event.name) +"展示</font>";
							let tagText1 = get.translation(event.name);
							if (tagText1 == event.name)
								tagText = '';

							break;
					}

					if (tagNode.textContent) tagNode.textContent = '';
					if (noname) {
						tagNode.textContent = '';
					} else {
						tagNode.insertAdjacentHTML("afterbegin", `<span>${get.translation(player)}${tagText}</span>`);
					}

				},

				getRandom: function (min, max) {
			if (min == null) {
				min = -2147483648;
			}
			
			if (max == null) {
				max = 2147483648;
			}
			
			if (min > max) {
				min = min + max;
				max = min - max;
				min = min - max;
			}
			
			var diff = 0;
			if (min < 0) {
				diff = min;
				min = 0;
				max -= diff;
			}
			
			return Math.floor(Math.random() * (max + 1 - min)) + min + diff;
		},
		getCardBestScale:function(size){
			if (!(size && size.height)) size = decadeUI.getHandCardSize();
			
			var bodySize = decadeUI.get.bodySize();
			return Math.min(bodySize.height * (decadeUI.isMobile() ? 0.23 : 0.18) / size.height, 1);
		},
		getHandCardSize:function(canUseDefault){
			var style = decadeUI.sheet.getStyle('.media_defined > .card');
			if (style == null) style = decadeUI.sheet.getStyle('.hand-cards > .handcards > .card');
			if (style == null) return canUseDefault ? { width: 108, height: 150 } : { width: 0, height: 0 };
			var size = { width: parseFloat(style.width), height: parseFloat(style.height) };
			return size;
		},
		getMapElementPos:function(elementFrom, elementTo){
			if (!(elementFrom instanceof HTMLElement) || !(elementTo instanceof HTMLElement)) return console.error('arguments');
			var rectFrom = elementFrom.getBoundingClientRect();
			var rectTo = elementTo.getBoundingClientRect();
			var pos = { x: rectFrom.left - rectTo.left, y: rectFrom.top - rectTo.top };
			pos.left = pos.x;
			pos.top = pos.y;
			return pos;
		},
		getPlayerIdentity:function(player, identity, chinese, isMark){
			if (!(player instanceof HTMLElement && get.itemtype(player) == 'player')) throw 'player';
			if (!identity) identity = player.identity;
			
			
			var mode = get.mode();
			var translated = false;
			if (!chinese) {
				switch (mode) {
					case 'identity':
						if (!player.isAlive() || player.identityShown || player == game.me) {
							identity = (player.special_identity ? player.special_identity : identity).replace(/identity_/, '');
						}
						
						break;
					
					case 'guozhan':
						if (identity == 'unknown') {
							identity = player.wontYe() ? lib.character[player.name1][1] : 'ye';
						}
						
						if (get.is.jun(player)) identity += 'jun';
						break;
						
					case 'versus':
						if (!game.me) break;
						switch (_status.mode) {
							case 'standard':
								switch (identity) {
									case 'trueZhu': return 'shuai';
									case 'trueZhong': return 'bing';
									case 'falseZhu': return 'jiang';
									case 'falseZhong': return 'zu';
								}
								break;
							case 'three':
							case 'four':
							case 'guandu':
								if (get.translation(player.side + 'Color') == 'wei') identity += '_blue';
								break;
								
							case 'two':
								var side = player.finalSide ? player.finalSide : player.side;
								identity = game.me.side == side ? 'friend' : 'enemy';
								break;
						}
						
						break;
					case 'doudizhu':
						identity = identity == 'zhu' ? 'dizhu' : 'nongmin';
						break;
					case 'boss':
						switch (identity) {
							case 'zhu': identity = 'boss'; break;
							case 'zhong': identity = 'cong'; break;
							case 'cai': identity = 'meng'; break;
						}
						break;
						case 'single':
						switch (identity) {
							case 'zhu': identity = 'xianshou'; break;
							case 'fan': identity = 'houshou'; break;
						}
						break;
				}
			} else {
				switch(mode){
					case 'identity':
						if (identity.indexOf('cai') < 0) {
							if (isMark) {
								if (player.special_identity) identity = player.special_identity + '_bg';
							} else {
								identity = player.special_identity ? player.special_identity : identity + '2';
							}
						}
						
						// ok
						break;
						
					case 'guozhan':
						if (identity == 'unknown') {
							identity = player.wontYe() ? lib.character[player.name1][1] : 'ye';
						}
						
						if (get.is.jun(player)) {
							identity = isMark ? '君' : get.translation(identity) + '君';
						} else {
							identity = identity == 'ye' ? '野心家' : (identity == 'qun' ? '群雄' : get.translation(identity) + '将');
						}
						translated = true;
						break;
						
					case 'versus':
						translated = true;
						if (!game.me) break;
						switch (_status.mode) {
							case 'three':
							case 'standard':
							case 'four':
							case 'guandu':
								switch (identity) {
									case 'zhu': identity = '主公'; break;
									case 'zhong': identity = '忠臣'; break;
									case 'fan': identity = '反贼'; break;
									default: translated = false; break;
								}
								break;
								
							case 'two':
								var side = player.finalSide ? player.finalSide : player.side;
								identity = game.me.side == side ? '友方' : '敌方';
								break;
							
							case 'siguo':
							case 'jiange':
								identity = get.translation(identity) + '将';
								break;
								
							default:
								translated = false;
								break;
						}
						break;
						
					case 'doudizhu':
						identity += '2';
						break;
					case 'boss':
						translated = true;
						switch (identity) {
							case 'zhu': identity = 'BOSS'; break;
							case 'zhong': identity = '仆从'; break;
							case 'cai': identity = '盟军'; break;
							default: translated = false; break;
						}
						break;
				}
				
				if (!translated) identity = get.translation(identity);
				if (isMark) identity = identity[0];
			}
			
			return identity;
		},
		
		create:{
			skillDialog:function(){
				var dialog = document.createElement('div');
				dialog.className = 'skill-dialog';
				
				var extend = {
					caption: undefined,
					tip: undefined,
					
					open:function(customParent){
						if (!customParent) {
							var size = decadeUI.get.bodySize();
							this.style.minHeight = (parseInt(size.height * 0.42)) + 'px';
							if (this.parentNode != ui.arena) ui.arena.appendChild(this);
						}
						
						this.style.animation = 'open-dialog 0.4s';
						return this;
					},
					show:function(){
						this.style.animation = 'open-dialog 0.4s';;
					},
					hide:function(){
						this.style.animation = 'close-dialog 0.1s forwards';
					},
					close:function(){
						var func = function(e){
							if (e.animationName != 'close-dialog') return;
							this.remove();
							this.removeEventListener('animationend', func);
						};
						
						var animation = 'close-dialog';
						if (this.style.animationName == animation) {
							setTimeout(function(dialog){
								dialog.remove();
							}, 100, this);
						} else {
							this.style.animation = animation + ' 0.1s forwards';
							this.addEventListener('animationend', func);
						}
					},
					
					appendControl:function(text, clickFunc){
						var control = document.createElement('div');
						control.className = 'control-button';
						control.textContent = text;
						if (clickFunc) {
							control.addEventListener('click', clickFunc);
						}
						
						return this.$controls.appendChild(control);
					},
					
					$caption: decadeUI.element.create('caption', dialog),
					$content: decadeUI.element.create('content', dialog),
					$tip: decadeUI.element.create('tip', dialog),
					$controls: decadeUI.element.create('controls', dialog),
				}; decadeUI.get.extend(dialog, extend);
				
				Object.defineProperties(dialog, {
					caption: {
						configurable: true,
						get:function(){
							return this.$caption.innerHTML;
						},
						set:function(value){
							if (this.$caption.innerHTML == value) return;
							this.$caption.innerHTML = value;
						},
					},
					tip: {
						configurable: true,
						get:function(){
							return this.$tip.innerHTML;
						},
						set:function(value){
							if (this.$tip.innerHTML == value) return;
							this.$tip.innerHTML = value;
						},
					},
				});
				
				return dialog;
			},
			
			compareDialog:function(player, target){
				var dialog = decadeUI.create.skillDialog();
				dialog.classList.add('compare');
				dialog.$content.classList.add('buttons');
				
				var extend = {
					player: undefined,
					target: undefined,
					playerCard: undefined,
					targetCard: undefined,
					
					$player: decadeUI.element.create('player-character player1', dialog.$content),
					$target: decadeUI.element.create('player-character player2', dialog.$content),
					$playerCard: decadeUI.element.create('player-card', dialog.$content),
					$targetCard: decadeUI.element.create('target-card', dialog.$content),
					$vs: decadeUI.element.create('vs', dialog.$content),
				}; decadeUI.get.extend(dialog, extend);
				
				decadeUI.element.create('image', dialog.$player),
				decadeUI.element.create('image', dialog.$target),
				
				Object.defineProperties(dialog, {
					player: {
						configurable: true,
						get:function(){
							return this._player;
						},
						set:function(value){
							if (this._player == value) return;
							this._player = value;

							if (value == null || value.isUnseen()) {
								this.$player.firstChild.style.backgroundImage = '';
							} else {
								this.$player.firstChild.style.backgroundImage = (value.isUnseen(0) ? value.node.avatar2 : value.node.avatar).style.backgroundImage;
							}
							
							if (value) this.$playerCard.dataset.text = get.translation(value) + '发起';
						},
					},
					target: {
						configurable: true,
						get:function(){
							return this._target;
						},
						set:function(value){
							if (this._target == value) return;
							this._target = value;
							if (value == null || value.isUnseen()) {
								this.$target.firstChild.style.backgroundImage = '';
							} else {
								this.$target.firstChild.style.backgroundImage = (value.isUnseen(0) ? value.node.avatar2 : value.node.avatar).style.backgroundImage;
							}
							
							if (value) this.$targetCard.dataset.text = get.translation(value);
						},
					},
					playerCard: {
						configurable: true,
						get:function(){
							return this._playerCard;
						},
						set:function(value){
							if (this._playerCard == value) return;
							if (this._playerCard) this._playerCard.remove();
							this._playerCard = value;
							if (value) this.$playerCard.appendChild(value);
						},
					},
					targetCard: {
						configurable: true,
						get:function(){
							return this._targetCard;
						},
						set:function(value){
							if (this._targetCard == value) return;
							if (this._targetCard) this._targetCard.remove();
							this._targetCard = value;
							if (value) this.$targetCard.appendChild(value);
						},
					},
				});
				
				if (player) dialog.player = player;
				if (target) dialog.target = target;
				
				return dialog;
			},
			
		},
		
		get:{
			
			
			judgeEffect:function(name, value){
				switch (name) {
					case 'caomu':		case '草木皆兵':
					case 'fulei': 		case '浮雷':
					case 'shandian': 	case '闪电':
					case 'hongshui': 	case '洪水':
					case 'huoshan': 	case '火山':
					case 'bingliang':	case '兵粮寸断':
					case 'lebu':		case '乐不思蜀':
					case 'dczixi_card':		case '琴':
					return value < 0 ? true : false;
				}
				
				return value;
			},
			
			isWebKit:function(){
				return document.body.style.WebkitBoxShadow !== undefined;
			},
			
			lerp:function(min, max, fraction){
				return (max - min) * fraction + min;
			},
			
			ease:function(fraction){
				if (!decadeUI.get._bezier3) decadeUI.get._bezier3 = new duilib.CubicBezierEase(0.25, 0.1, 0.25, 1);
				return decadeUI.get._bezier3.ease(fraction);
			},
			
			extend:function(target, source){
				if (source === null || typeof source !== 'object') return target;
				
				var keys = Object.keys(source);
				var i = keys.length;
				while (i--) {
					target[keys[i]] = source[keys[i]];
				}

				return target;
			},
			
			bodySize:function(){
				var size = decadeUI.dataset.bodySize;
				if (!size.updated) {
					var body = document.body;
					size.updated = true;
					size.height = body.clientHeight;
					size.width = body.clientWidth;
				}
				
				return size;
			},
			
			bestValueCards:function(cards, player){
				if (!player) player = _status.event.player;
				
				var matchs = [];
				var basics = [];
				var equips = [];
				var hasEquipSkill = player.hasSkill('xiaoji');
				cards.sort(function(a, b){
					return get.value(b, player) - get.value(a, player);
				});
				
				for (var i = 0; i >= 0 && i < cards.length; i++) {
					var limited = false;
					switch (get.type(cards[i])) {
						case 'basic':
							for (var j = 0; j < basics.length; j++) {
								if (!cards[i].toself && basics[j].name == cards[i].name) {
									limited = true;
									break;
								}
							}
							
							if (!limited) basics.push(cards[i]);
							break;
						
						case 'equip':
							if (hasEquipSkill) break;
							for (var j = 0; j < equips.length; j++) {
								if (get.subtype(equips[j]) == get.subtype(cards[i])) {
									limited = true;
									break;
								}
							}
							
							if (!limited) equips.push(cards[i]);
							break;
					}
					
					if (!limited) {
						matchs.push(cards[i]);
						cards.splice(i--, 1);
					}
				}
				
				cards.sort(function(a, b){
					return get.value(b, player) - get.value(a, player);
				});
				
				cards = matchs.concat(cards);
				return cards;
			},
			cheatJudgeCards:function(cards, judges, friendly){
				if (!cards || !judges) throw arguments;
				
				var cheats = [];
				var judgeCost;
				for(var i = 0; i < judges.length; i++){
					var judge = get.judge(judges[i]);
					cards.sort(function(a, b) {
						return friendly ? judge(b) - judge(a) : judge(a) - judge(b);
					});
					
					judgeCost = judge(cards[0]);
					if ((friendly && judgeCost >= 0) || (!friendly && judgeCost < 0)) {
						cheats.push(cards.shift());
					} else {
						break;
					}
				}
				
				return cheats;
			},
			elementLeftFromWindow:function(element){
				var left = element.offsetLeft;
				var current = element.offsetParent;
				
				while (current != null) {
					left += current.offsetLeft;
					current = current.offsetParent;
				}
				
				return left;
			},
			elementTopFromWindow:function(element){
				var top = element.offsetTop;
				var current = element.offsetParent;
				
				while (current != null) {
					top += current.offsetTop;
					current = current.offsetParent;
				}
				
				return top;
			},
			handcardInitPos:function(){
				var hand = dui.boundsCaches.hand;
				if (!hand.updated)
					hand.update();
				
				var cardW = hand.cardWidth;
				var cardH = hand.cardHeight;
				var scale = hand.cardScale;
				
				var x = -Math.round((cardW - cardW * scale) / 2);
				var y = ((cardH * scale - cardH) / 2);

				return {
					x: x,
					y: y,
					scale: scale
				};
			},
		},
		
		set:(function(set){
			set.activeElement = function (element) {
				var deactive = dui.$activeElement;
				dui.$activeElement = element;
				if (deactive && deactive != element && (typeof deactive.ondeactive == 'function')) {
					deactive.ondeactive();
				}
				
				if (element && element != deactive && (typeof element.onactive == 'function')) {
					element.onactive();
				}
			};
			return set;
		})({}),
		statics:{
			cards: (function(cards){
				var specialCards= {
				    helasisy: ['bingliang', 'bingsha', 'cisha', 'guohe', 'huogong', 'huosha', 'jiedao', 'jiu', 'juedou', 'lebu', 'leisha', 'nanman', 'sha', 'shan', 'shandian', 'shunshou', 'tao', 'taoyuan', 'tiesuo', 'wanjian', 'wugu', 'wuxie', 'wuzhong'],
				    xiaosha: ['bingliang', 'bingsha', 'guohe', 'huosha', 'jiu', 'lebu', 'leisha', 'nanman', 'sha', 'shan', 'shunshou', 'tao', 'wanjian', 'wuxie', 'wuzhong'],
				    nsfw: ['bingliang', 'guohe', 'huogong', 'huosha', 'jiedao', 'jiu', 'juedou', 'lebu', 'leisha', 'nanman', 'sha', 'shan', 'shandian', 'shunshou', 'tao', 'taoyuan', 'tiesuo', 'wanjian', 'wugu', 'wuzhong'],
				    hakimi: ['bingliang', 'guohe', 'huogong', 'huosha', 'jiedao', 'juedou', 'lebu', 'leisha', 'nanman', 'sha', 'shan', 'shandian', 'shunshou', 'tao', 'taoyuan', 'tiesuo', 'wanjian', 'wugu', 'wuxie', 'wuzhong'],
			    };
				var readFiles = function (files, entry) {
					var index, cardname, filename;
					var cards = dui.statics.cards;
					var format = duicfg.cardPrettify;
					var prefix = decadeUIPath + 'image/card/';
					cards.READ_OK = true;
					if (format == null)
						format = 'webp';
					if (format === 'off')
						return;
					
					format = '.' + format.toLowerCase();
					var offline=sessionStorage.getItem('Network');
			        if(!offline) offline='offline';
			        let hllC = offline == 'offline' ? lib.config.extension_十周年UI_cardHelasisy : lib.config.extension_十周年UI_cardHelasisy2;
					for (var i = 0; i < files.length; i++) {
						filename = entry ? files[i].name : files[i];
						index = filename.lastIndexOf(format);
						if (index == -1)
							continue;
						
						cardname = filename.substring(0, index);
						if(specialCards[hllC] && specialCards[hllC].contains(filename.split('.')[0])) {
    					    var filename_helasisy = decadeUIPath + 'image/card_' + hllC + '/' + filename.split('.')[0] + '.png';
    						cards[cardname] = {
    							url: filename_helasisy,
    							name: cardname,
    							loaded: true,
    						};
    					}else {
    						cards[cardname] = {
    							url: prefix + filename,
    							name: cardname,
    							loaded: true,
    						};
						}
					}
				};
				
				if (window.fs) {
					fs.readdir(__dirname + '/' + decadeUIPath + 'image/card/', function(err, files){
						if (err)
							return;
						
						readFiles(files);
					});
				} else if (window.resolveLocalFileSystemURL) {
					resolveLocalFileSystemURL(decadeUIPath + 'image/card/', function(entry) {
						var reader = entry.createReader();
						reader.readEntries(function(entries){
							readFiles(entries, true);
						});
					});
				}
				return cards;
			})({}),
			// images: (function(images){
				// var readFiles = function (files, entry, prefix) {
					// var index, name, filename;
					// var images = dui.statics.images;
					// images.READ_OK = true;
					// for (var i = 0; i < files.length; i++) {
						// filename = entry ? files[i].name : files[i];
						// index = filename.lastIndexOf('.png');
						// if (index == -1)
							// continue;
						
						// name = filename.substring(0, index);
						// images[name] = prefix + filename;
					// }
				// };
				
				// var prefix = decadeUIPath + 'assets/image/';
				// if (window.fs) {
					// prefix = __dirname + '/' + prefix;
					// fs.readdir(prefix, function(err, files){
						// if (err)
							// return;
						
						// readFiles(files, false, prefix);
					// });
				// } else if (window.resolveLocalFileSystemURL) {
					// resolveLocalFileSystemURL(prefix, function(entry) {
						// var reader = entry.createReader();
						// reader.readEntries(function(entries){
							// readFiles(entries, true, prefix);
						// });
					// });
				// }
				// return images;
			// })({}),
			handTips: [],
			
		},
		
		dataset:{
			animSizeUpdated: false,
			bodySizeUpdated: false,
			bodySize: {
				height: 1,
				width: 1,
				updated: false,
			},
		},
	};
	
	
	dui.showHandTip = function (text) {
		var tip;
		var tips = this.statics.handTips;
		for (var i = 0; i < tips.length; i++) {
			if (tip == undefined && tips[i].closed) {
				tip = tips[i];
				tip.closed = false;
			} else {
				tips[i].hide();
			}
		}
		
		if (tip == undefined) {
			tip = dui.element.create('hand-tip', ui.arena);
			tips.unshift(tip);
			tip.clear = function () {
				var nodes = this.childNodes;
				for (var i = 0; i < nodes.length; i++)
					nodes[i].textContent = '';
				
				this.dataset.text = '';
			};
			tip.setText = function (text, type) {
				this.clear();
				this.appendText(text, type);
			};
			tip.setInfomation = function (text) {
				if (this.$info == null)
					this.$info = dui.element.create('hand-tip-info', ui.arena);
				
				this.$info.innerHTML = text;
			};
			tip.appendText = function (text, type) {
				if (text == undefined || text === '')
					return;
				if (type == undefined)
					type = '';
				
				var nodes = this.childNodes;
				for (var i = 0; i < nodes.length; i++) {
					if (nodes[i].textContent == '') {
						nodes[i].textContent = text;
						nodes[i].dataset.type = type;
						return nodes[i];
					}
				}
				
				var span = document.createElement('span');
				span.textContent = text;
				span.dataset.type = type;
				return this.appendChild(span);
			};
			tip.strokeText = function () {
				this.dataset.text = this.innerText;
			};
			tip.show = function () {
				this.classList.remove('hidden');
				if (this.$info && this.$info.innerHTML)
					this.$info.show();
			};
			tip.hide = function () {
				this.classList.add('hidden');
				if (this.$info)
					this.$info.hide();
			};
			tip.close = function () {
				this.closed = true;
				this.hide();
				if (tip.$info)
					tip.$info.innerHTML = '';
				var tips = dui.statics.handTips;
				for (var i = 0; i < tips.length; i++) {
					if (tips[i].closed)
						continue;
					
					tips[i].show();
					return;
				}
			};
			tip.isEmpty = function () {
				var nodes = this.childNodes;
				for (var i = 0; i < nodes.length; i++) {
					if (nodes[i].textContent != '')
						return false;
				}
				
				return true;
			};
		}
		tip.setText(text);
		tip.show();
		return tip;
	};
	
	decadeUI.BoundsCache = (function(){
		function BoundsCache (element, updateBefore) {
			this.element = element;
			this.updateBefore = updateBefore;
			this.updated = false;
			Object.defineProperties(this, {
				x:{
					configurable: true,
					get:function(){
						if (!this.updated) this.update();
						return this._x;
					},
					set:function(value){
						this._x == value;
					}
				},
				y:{
					configurable: true,
					get:function(){
						if (!this.updated) this.update();
						return this._y;
					},
					set:function(value){
						this._y == value;
					}
				},
				width:{
					configurable: true,
					get:function(){
						if (!this.updated) this.update();
						return this._width;
					},
					set:function(value){
						this._width == value;
					}
				},
				height:{
					configurable: true,
					get:function(){
						if (!this.updated) this.update();
						return this._height;
					},
					set:function(value){
						this._height == value;
					}
				},
			});
		};
		
		BoundsCache.prototype.check = function () {
			if (!this.updated)
				this.update();
		};
		BoundsCache.prototype.update = function () {
			if (this.updateBefore)
				this.updateBefore();
			
			var element = this.element;
			this.updated = true;
			if (element == undefined) return;
			this._x = element.offsetLeft;
			this._y = element.offsetTop;
			this._width = element.offsetWidth;
			this._height = element.offsetHeight;
		};
		
		return BoundsCache;
	})();
	
	decadeUI.boundsCaches = (function(boundsCaches){
		boundsCaches.window = new decadeUI.BoundsCache(null, function(){
			this.element = ui.window;
		});
		boundsCaches.arena = new decadeUI.BoundsCache(null, function(){
			this.element = ui.arena;
			if (ui.arena == null)
				return;
			
			this.cardScale = dui.getCardBestScale();
			if (this.cardWidth != null)
				return;
			
			var childs = ui.arena.childNodes;
			for (var i = 0; i < childs.length; i++) {
				if (childs[i].classList.contains('card')) {
					this.cardWidth = childs[i].offsetWidth;
					this.cardHeight = childs[i].offsetHeight;
					return;
				}
			}
			
			var card = dui.element.create('card');
			card.style.opacity = 0;
			ui.arena.appendChild(card);
			this.cardWidth = card.offsetWidth;
			this.cardHeight = card.offsetHeight;
			card.remove();
		});
		boundsCaches.hand = new decadeUI.BoundsCache(null, function(){
			this.element = ui.me;
			if (ui.handcards1 == null)
				return;
			
			this.cardScale = dui.getCardBestScale();
			if (this.cardWidth != null)
				return;
			
			var childs = ui.handcards1.childNodes;
			for (var i = 0; i < childs.length; i++) {
				if (childs[i].classList.contains('card')) {
					this.cardWidth = childs[i].offsetWidth;
					this.cardHeight = childs[i].offsetHeight;
					return;
				}
			}
			
			var card = dui.element.create('card');
			card.style.opacity = 0;
			ui.handcards1.appendChild(card);
			this.cardWidth = card.offsetWidth;
			this.cardHeight = card.offsetHeight;
			card.remove();
		});
		
		return boundsCaches;
	})({});
	
	decadeUI.element = {
		base:{
			removeSelf:function(milliseconds){
				var remove = this;
				if (milliseconds) {
					milliseconds = (typeof milliseconds == 'number') ? milliseconds : parseInt(milliseconds);
					setTimeout(function(){ 
						if (remove.parentNode) remove.parentNode.removeChild(remove);
					}, milliseconds);
					return;
				}
				
				if (remove.parentNode) remove.parentNode.removeChild(remove);
				return;
			}
		},
		create:function(className, parentNode, tagName){
			var tag = tagName == void 0 ? 'div' : tagName;
			var element = document.createElement(tag);
			element.view = {};
			
			for(var key in this.base){
				element[key] = this.base[key];
			}
			
			if (className)
				element.className = className;
			
			if (parentNode)
				parentNode.appendChild(element);
			
			return element;
		},
		clone:function(element){
			
		},
	};
	
	decadeUI.game = {
		loop:function(){
			if (game.looping) return false; 
			game.looping = true;
			var event = _status.event;
			var step = event.step;
			var source = event.source;
			var player = event.player;
			var target = event.target;
			var targets = event.targets;
			var card = event.card;
			var cards = event.cards;
			var skill = event.skill;
			var forced = event.forced;
			var num = event.num;
			var trigger = event._trigger;
			var result = event._result;
			if (decadeUI.eventDialog) {
				decadeUI.game.wait();
				return false;
			}
			
			if (!game.loopTime) 
				game.loopTime = performance.now();
			if ((_status.paused2 || _status.imchoosing) && !lib.status.dateDelaying) {
				lib.status.dateDelaying = new Date();
			}
			
			if (_status.paused || _status.paused2 || _status.over) {
				game.loopTime = undefined;
				return false;
			}
			
			if (_status.paused3) {
				_status.paused3 = 'paused';
				game.loopTime = undefined;
				return false;
			}
			if (lib.status.dateDelaying) {
				lib.status.dateDelayed += lib.getUTC(new Date()) - lib.getUTC(lib.status.dateDelaying);
				lib.status.dateDelaying = undefined;
			}
			
			if (event.next.length > 0) {
				var next = event.next.shift();
				if (next.player && next.player.skipList.contains(next.name)) {
					event.trigger(next.name + 'Skipped');
					next.player.skipList.remove(next.name);
					if (lib.phaseName.contains(next.name)) next.player.getHistory('skipped').add(next.name);
				} else {
					next.parent = event;
					_status.event = next;
				}
			} else if (event.finished) {
				if (event._triggered == 1) {
					if (event.type == 'card') event.trigger('useCardToOmitted');
					event.trigger(event.name + 'Omitted');
					event._triggered = 4;
				} else if (event._triggered == 2) {
					if (event.type == 'card') event.trigger('useCardToEnd');
					event.trigger(event.name + 'End');
					event._triggered = 3;
				} else if (event._triggered == 3) {
					if (event.type == 'card') event.trigger('useCardToAfter');
					event.trigger(event.name + 'After');
					event._triggered++;
				} else if (event.after && event.after.length) {
					var next = event.after.shift();
					if (next.player && next.player.skipList.contains(next.name)) {
						event.trigger(next.name + 'Skipped');
						next.player.skipList.remove(next.name);
						if (lib.phaseName.contains(next.name)) next.player.getHistory('skipped').add(next.name)
					} else {
						next.parent = event;
						_status.event = next;
					}
				} else {
					if (event.triggerMessage)
						event.triggerMessage('finished');
					
					if (event.parent) {
						if (event.result) event.parent._result = event.result;
						_status.event = event.parent;
					} else {
						game.loopTime = undefined;
						game.loopLocked = false;
						return false;
					}
				}
			} else {
				if (event._triggered == 0) {
					if (event.type == 'card') event.trigger('useCardToBefore');
					event.trigger(event.name + 'Before');
					event._triggered++;
				} else if (event._triggered == 1) {
					if (event.type == 'card') event.trigger('useCardToBegin');
					if (event.name == 'phase' && !event._begun) {
						var next = game.createEvent('phasing', false, event);
						next.player = event.player;
						next.skill = event.skill;
						next.setContent('phasing');
						event._begun = true;
					} else {
						event.trigger(event.name + 'Begin');
						event._triggered++;
					}
				} else {
					if (player && player.classList.contains('dead') && !event.forceDie && event.name != 'phaseLoop') {
						game.broadcastAll(function() {
							while (_status.dieClose.length) {
								_status.dieClose.shift().close();
							}
						});
						if (event._oncancel) {
							event._oncancel();
						}
						event.finish();
					} else if (player && player.removed && event.name != 'phaseLoop') {
						event.finish();
					} else if (player && player.isOut() && event.name != 'phaseLoop' && !event.includeOut) {
						if (event.name == 'phase' && player == _status.roundStart && !event.skill) {
							_status.roundSkipped = true;
						}
						event.finish();
					} else {
						decadeUI.game.tryContent(event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result, _status, lib, game, ui, get, ai);
					}
					event.step++;
				}
			}
			
			var delta = performance.now() - game.loopTime;
			if (delta > 15 && (!decadeUI.config.asyncMode || game.isMine())) {
				game.loopTime = undefined;
				requestIdleCallback(game.loop, { timeout: 16 });
				return false;
			}
			
			return true;
		},
		
		wait:function(){
			game.pause();
		},
		
		resume:function(){
			if (!game.loopLocked) {
				var ok = false;
				try {
					if (decadeUI.eventDialog && !decadeUI.eventDialog.finished && !decadeUI.eventDialog.finishing) {
						decadeUI.eventDialog.finish();
						decadeUI.eventDialog = undefined;
						ok = true;
					}
				} finally {
					if (!ok) game.resume();
				}
			} else {
				_status.paused = false;
			}
		},
		
		tryContent:function(event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result, _status, lib, game, ui, get, ai){
			if (_status.withError || lib.config.compatiblemode || (_status.connectMode && !lib.config.debug)) {
				try {
					event.content(event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result, _status, lib, game, ui, get, ai);
				} catch(e) {
					game.print('游戏出错：' + event.name);
					game.print(e.toString());
					console.log(e);
				}
			} else {
				event.content(event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result, _status, lib, game, ui, get, ai);
			}
		}
	};
	
	
	decadeUI.config = config;
	duicfg.update = function(){
	    var menu = lib.extensionMenu['extension_' + extensionName];
		for (var key in menu) {
			if (menu[key] && (typeof menu[key] == 'object')) {
				if (typeof menu[key].update == 'function') {
					menu[key].update();
				}
			}
		}
	};
	
	decadeUI.init();
	console.timeEnd(extensionName);
},
precontent:function(){

//装备栏4开始
	if (lib.config.extension_十周年UI_newDecadeStyle == 'on') {
	    SSEquip = {
	        "爪黄飞电": "爪黄",
	        "吴六剑": "2吴六剑",
	        "机关弩": "1机关弩",
	        "雌雄双股剑": "2雌雄劍",
	        "方天画戟": "4方天戟",
	        "贯石斧": "3贯石斧",
	        "寒冰剑": "2寒冰剑",
	        "麒麟弓": "5麒麟弓",
	        "青釭剑": "2青釭剑",
	        "青龙偃月刀": "3青龙刀",
	        "丈八蛇矛": "3丈八矛",
	        "古锭刀": "2古锭刀",
	        "朱雀羽扇": "4朱雀扇",
	        "七宝刀": "2七宝刀",
	        "银月枪": "3银月枪",
	        "衠钢槊": "3衠钢槊",
	        "飞龙夺凤": "2飞龙刀",
	        "三尖两刃刀": "3三尖刀",
	        "诸葛连弩": "1諸葛弩",
	        "倚天剑": "2倚天剑",
	        "七星宝刀": "2七星刀",
	        "折戟": "0折戟",
	        "无锋剑": "1无锋剑",
	        "涯角枪": "3涯角枪",
	        "五行鹤翎扇": "4五行扇",
	        "断剑": "0断剑",
	        "霹雳车": "9霹雳车",
	        "水波剑": "2水波剑",
	        "红缎枪": "3红缎枪",
	        "天雷刃": "4天雷刃",
	        "混毒弯匕": "1混毒匕",
	        "元戎精械弩": "3精械弩",
	        "乌铁锁链": "3铁锁链",
	        "太极拂尘": "5太极拂",
	        "灵宝仙壶": "3灵宝壶",
	        "冲应神符": "冲应符",
	        "先天八卦阵": "先天八卦",
	        "照月狮子盔": "狮子盔",
	        "白银狮子": "白银狮子",
	        "仁王金刚盾": "金剛盾",
	        "桐油百韧甲": "百韧甲",
	        "定澜夜明珠": "夜明珠",
	        "赤龙牙": "2赤龙牙",
	        "封雪刃": "2封雪刃",
	        "鬼眼法刀": "2鬼眼刀",
	        "盘古斧": "4盘古斧",
	        "轩辕剑": "3轩辕剑",
	        "吸血鬼指环": "吸血指环",
	        "如意金箍棒": "金箍棒",
	        "碎裂金箍棒": "金箍棒",
	        "霹雳投石车": "霹雳车",	        
	    }
	}
	    if (lib.config.extension_十周年UI_newDecadeStyle != 'on') {
	        SSEquip = {
	            "吴六剑": "吴六剑2",
	            "机关弩": "机关弩1",
	            "雌雄双股剑": "雌雄剑2",
	            "方天画戟": "方天戟4",
	            "贯石斧": "贯石斧3",
	            "寒冰剑": "寒冰剑2",
	            "麒麟弓": "麒麟弓5",
	            "青釭剑": "青釭剑2",
	            "青龙偃月刀": "青龙刀3",
	            "丈八蛇矛": "丈八矛3",
	            "古锭刀": "古锭刀2",
	            "朱雀羽扇": "朱雀扇4",
	            "七宝刀": "七宝刀2",
	            "银月枪": "银月枪3",
	            "衠钢槊": "衠钢槊3",
	            "飞龙夺凤": "飞龙刀2",
	            "三尖两刃刀": "三尖刀3",
	            "诸葛连弩": "诸葛弩1",
	            "倚天剑": "倚天剑2",
	            "七星宝刀": "七星刀2",
	            "折戟": "折戟0",
	            "无锋剑": "无锋剑1",
	            "涯角枪": "涯角枪3",
	            "五行鹤翎扇": "五行扇4",
	            "断剑": "断剑0",
	            "霹雳车": "霹雳车9",
	            "水波剑": "水波剑2",
	            "红缎枪": "红缎枪3",
	            "天雷刃": "天雷刃4",
	            "混毒弯匕": "混毒匕1",
	            "元戎精械弩": "精械弩3",
	            "乌铁锁链": "铁锁链3",
	            "太极拂尘": "太极拂5",
	            "灵宝仙壶": "灵宝壶3",
	            "冲应神符": "冲应符",
	            "先天八卦阵": "先天八卦",
	            "照月狮子盔": "狮子盔",
	            "白银狮子": "白银狮子",
	            "仁王金刚盾": "金刚盾",
	            "桐油百韧甲": "百韧甲",
	            "定澜夜明珠": "夜明珠",
	            "镔铁双戟": "镔铁戟3",
	            "玲珑狮蛮带": "狮蛮带",
	            "束发紫金冠": "束发金冠",
	            "红棉百花袍": "百花袍",
	            "虚妄之冕": "虚妄之冕",
	            "无双方天戟": "无双戟4",
	            "鬼龙斩月刀": "斩月刀3",
	            "赤焰镇魂琴": "镇魂琴4",
	            "赤龙牙": "赤龙牙2",
	            "封雪刃": "封雪刃2",
	            "鬼眼法刀": "鬼眼刀2",
	            "盘古斧": "盘古斧4",
	            "轩辕剑": "轩辕剑3",
	            "吸血鬼指环": "吸血指环",
	            "如意金箍棒": "金箍棒",
	            "碎裂金箍棒": "金箍棒",
	            "霹雳投石车": "霹雳车",
	        }
	    }
	//装备栏4结束
	window.decadeUIName = '十周年UI';
	window.decadeUIPath = lib.assetURL + 'extension/' + decadeUIName + '/';
	if (lib.config['extension_' + decadeUIName + '_eruda']) {
		var script = document.createElement('script');
		script.src = decadeUIPath + 'eruda.js'; 
		document.body.appendChild(script); 
		script.onload = function(){
			eruda.init();
		};
	}

	const extension = lib.extensionMenu[`extension_${decadeUIName}`];
	if (!(extension && extension.enable && extension.enable.init)) return;

	if (window.require && !window.fs) window.fs = require('fs');

	lib.configMenu.appearence.config.layout.visualMenu = (node, link) => {
		node.className = `button character themebutton ${lib.config.theme}`;
		node.classList.add(link);
		if (node.created) return;
		node.created = true;
		node.style.overflow = 'scroll';

		const list = ['re_caocao', 're_liubei', 'sp_zhangjiao', 'sunquan'];
		while (list.length) {
			ui.create.div('.avatar', ui.create.div('.seat-player.fakeplayer', node)).setBackground(list.randomRemove(), 'character');
		}
	};

	window.decadeModule = function (decadeModule) {
		var version=lib.extensionPack.十周年UI.version;
		if (ui.css.layout) {
			if (!ui.css.layout.href || ui.css.layout.href.indexOf('long2') < 0) ui.css.layout.href = lib.assetURL + 'layout/long2/layout.css';
		}
		
		if (ui.css.fontsheet) ui.css.fontsheet.remove();

		decadeModule.init = function () {
			/*-----------------分割线-----------------*/
			this.js(decadeUIPath + 'spine.js');
			this.js(decadeUIPath + 'component.js');
			this.js(decadeUIPath + 'skill.js');
			this.js(decadeUIPath + 'content.js');
			this.js(decadeUIPath + 'effect.js');
			//更新覆盖保留动皮
			//这一段替代默认方案呢
			decadeModule.import(function (lib, game, ui, get, ai, _status) {
    			decadeUI.dynamicSkin = {};
                var extend = {};
    	        decadeUI.get.extend(decadeUI.dynamicSkin, extend);
	        });
			//这一段替代默认方案呢
			//this.js(decadeUIPath + 'dynamicSkin_default.js');
			
			try{
			    this.js(decadeUIPath + 'dynamicSkin.js');
			}catch {
			    //decadeUI.dynamicSkin = {};
			}
			this.js(decadeUIPath + 'menu.js');
			this.js(decadeUIPath + 'animationlist.js');
			this.js(decadeUIPath + 'meihua.js');
			this.js(decadeUIPath + 'splash.js');			
			this.js(decadeUIPath + 'markskill.js');

			//--------------------//
			this.css(decadeUIPath + 'splash.css');
			this.css(decadeUIPath + 'font.css');
			this.css(decadeUIPath + 'decadeLayout.css');
			this.css(decadeUIPath + 'card.css');
			this.css(decadeUIPath + 'meihua.css');
			
			/*-----------------分割线-----------------*/
			this.js(decadeUIPath + 'vconsole.min.js');
			if(lib.config.new_pause=='shousha') {
			    this.js(decadeUIPath + 'pause.js');
			    this.css(decadeUIPath + 'pause.css');
			}
			// 不同样式文件调用
			if (lib.config.extension_十周年UI_newDecadeStyle == 'on') {
			this.js(decadeUIPath + 'animation.js');
			this.css(decadeUIPath + 'dialog.css');
			this.css(decadeUIPath + 'layout.css');
			this.css(decadeUIPath + 'player.css');
			this.css(decadeUIPath + 'newdialog.css');
			}
			if (lib.config.extension_十周年UI_newDecadeStyle == 'off') {
			this.js(decadeUIPath + 'animation_new.js');
			this.css(decadeUIPath + 'dialog_new.css');
			this.css(decadeUIPath + 'layout_new.css');
			this.css(decadeUIPath + 'player_new.css');
			//修复webview122标记不换行问题
			if (getChromeVersion() >= 122) {
			    this.css(decadeUIPath + 'player_mark_fix.css');
			}else if(lib.config['extension_十周年UI_shoushaNewMark']) {
			    this.css(decadeUIPath + 'player_mark.css');
			}
			this.css(decadeUIPath + 'newdialog_new.css');
			var offline=sessionStorage.getItem('Network');
			if(!offline) offline='online';
			if (lib.config.extension_十周年UI_JBDDZ&&offline!='offline') {
			this.js(decadeUIPath + 'junba.js');
			this.js(decadeUIPath + 'doudizhu.js');
			this.js(decadeUIPath + 'dizhuqiangdu.js');
			this.css(decadeUIPath + 'junba.css');
			this.css(decadeUIPath + 'doudizhu.css');
			}
			}
			return this;
		};
		decadeModule.js = function (path) {
			if (!path) return console.error('path');

			const script = document.createElement('script');
			script.onload = function () {
				this.remove();
			};
			script.onerror = function () {
				this.remove();
				console.error(`${this.src}not found`);
			};
			script.src = `${path}?v=${version}`;
			document.head.appendChild(script);
			return script;
		};
		decadeModule.css = function (path) {
			if (!path) return console.error('path');
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = `${path}?v=${version}`;
			document.head.appendChild(link);
			return link;
		};
		decadeModule.import = function (module) {
			if (!this.modules) this.modules = [];
			if (typeof module != 'function') return console.error('import failed');
			this.modules.push(module);
		};
		return decadeModule.init();
	}({});

	Object.defineProperties(_status, {
		connectMode: {
			configurable: true,
			get: function () {
				return this._connectMode;
			},
			set: function (value) {
				this._connectMode = value;
				if (!value || !lib.extensions) return;
				const decadeExtension = lib.extensions.find(value => value[0] == decadeUIName);
				if (!decadeExtension) return;

				const startBeforeFunction = lib.init.startBefore;
				lib.init.startBefore = function () {
					try {
						_status.extension = decadeExtension[0];
						_status.evaluatingExtension = decadeExtension[3];
						decadeExtension[1](decadeExtension[2], decadeExtension[4]);
						delete _status.extension;
						delete _status.evaluatingExtension;
						console.log(`%c${decadeUIName}: 联机成功`, 'color:blue');
					} catch (e) {
						console.log(e);
					}

					if (startBeforeFunction) startBeforeFunction.apply(this, arguments);
				};
			}
		},
		_connectMode: {
			value: false,
			writable: true
		}
	});
	
},help:{},
config:{
    /*smoothMode: {
		name: '流畅模式',
		init: true,
	},*/
	asyncMode: {
		name: '加速·异步模式',
		init: false,
		intro: "开启这个模式，然后将游戏速度调快…人机出牌速度就会真正飞起来。那么，代价是什么呢？<li>开启可能会造成卡顿，慎重考虑！",
	},
	eruda:{
		name: '调试助手',
		init: false,
		unshow:true,//隐藏这个设置
	},
	rightLayout:{
        name: '右手布局',
        init: true,
		update:function(){
			if (window.decadeUI) ui.arena.dataset.rightLayout = lib.config['extension_十周年UI_rightLayout'] ? 'on' : 'off';
		},
		unshow:true,//隐藏这个设置
    },
    game_cardSet:{
		name:'<span style="color: rgb(200, 200, 255); font-weight: bold;">单机：卡牌风格</span>',
		init:'off',
		item:{
			'off':'关闭',
			//'none':'默认',
			'gold':'金色',
			'hand':'手杀',
			'new':'新版',
			'mian':'面杀',
			'dian':'典藏',
			'zun':'至尊',
			'tong':'铜雀',
			'zhi':'龙纹',
			'black':'黑金',
		},
		onclick:function(item){
			game.saveConfig('game_cardSet',item);
			//game.saveConfig('extension_十周年UI_game_cardSet',item);
		},
		intro:'为游戏设置整体卡牌风格，和选项-外观的设置是一样的',
		"textMenu": function(node, link) {
            lib.setScroll(node.parentNode);
            if(link!=false) {
                const trast={
        			'off':'关闭',
        			'gold':'金色',
        			'hand':'手杀',
        			'new':'新版',
        			'mian':'面杀',
        			'dian':'典藏',
        			'zun':'至尊',
        			'tong':'铜雀',
        			'zhi':'龙纹',
					'black':'黑金',
                };
                let showImg=`<span style="display: inline-block; width: 60px; height: 80px;">
                  ${trast[link]}
                  <img src="${lib.assetURL}extension/十周年UI/assets/item/${link}.jpg" style="width: 100%; height: auto; object-fit: contain; border-radius: 5px;" alt="${trast[link]}">
                </span>`;
                node.innerHTML = showImg;
            }
        },
	},
	cardHelasisy:{
	    name: '<span style="color: rgb(200, 200, 255);">↘特殊卡牌</span>',
	    init: 'off',
	    item: {
			off: '关闭',
			helasisy: '娘化卡牌',
			xiaosha:  '虚拟偶像',
			nsfw: '艺术鉴赏',
			hakimi: '南北绿豆',
		},
		"textMenu": function(node, link) {
            lib.setScroll(node.parentNode);
            const trast={
    			//off: '关闭',
    			helasisy: '娘化卡牌',
    			xiaosha:  '虚拟偶像',
    			nsfw: '艺术鉴赏',
    			hakimi: '南北绿豆',
            };
            if(link!=false && trast[link]) {
                let showImg=`<span style="display: inline-block; width: 60px; height: 80px; font-size: 15px;">
                  ${trast[link]}
                  <img src="${lib.assetURL}extension/十周年UI/image/card_${link}/sha.png" style="width: 100%; height: auto; object-fit: contain; border-radius: 3px;" alt="${trast[link]}">
                </span>`;
                node.innerHTML = showImg;
            }
        },
	    intro: '可以为卡牌图片替换一些特殊的风格。<li>娘化卡牌 由 赫拉西斯 制作，适配于大将军金色卡牌风格。<li>虚拟偶像 、 艺术鉴赏 和 南北绿豆 由网友分享，适配新版高清风格、面杀风格的卡牌',
	},
	game_cardSet2:{
		name:'<span style="color: rgb(255, 255, 145); font-weight: bold;">如真：卡牌风格</span>',
		init:'off',
		item:{
			'off':'关闭',
			//'none':'默认',
			'gold':'金色',
			'hand':'手杀',
			'new':'新版',
			'mian':'面杀',
			'dian':'典藏',
			'zun':'至尊',
			'tong':'铜雀',
			'zhi':'龙纹',
			'black':'黑金',
		},
		intro:'为游戏设置如真似幻线上的卡牌风格（如真似幻专属），和选项-外观的设置是一样的',
		onclick:function(item){
            game.saveConfig('game_cardSet2',item);
            //game.saveConfig('extension_十周年UI_game_cardSet2',item);
		},
		"textMenu": function(node, link) {
            lib.setScroll(node.parentNode);
            if(link!=false) {
                const trast={
        			'off':'关闭',
        			'gold':'金色',
        			'hand':'手杀',
        			'new':'新版',
        			'mian':'面杀',
        			'dian':'典藏',
        			'zun':'至尊',
        			'tong':'铜雀',
        			'zhi':'龙纹',
					'black':'黑金',
                };
                let showImg=`<span style="display: inline-block; width: 60px; height: 80px;">
                  ${trast[link]}
                  <img src="${lib.assetURL}extension/十周年UI/assets/item/${link}.jpg" style="width: 100%; height: auto; object-fit: contain; border-radius: 5px;" alt="${trast[link]}">
                </span>`;
                node.innerHTML = showImg;
            }
        },
	},
	cardHelasisy2:{
	    name: '<span style="color: rgb(255, 255, 145);">↘特殊卡牌</span>',
	    init: 'off',
	    item: {
			off: '关闭',
			helasisy: '娘化卡牌',
			xiaosha:  '虚拟偶像',
			nsfw: '艺术鉴赏',
			hakimi: '南北绿豆',
		},
		"textMenu": function(node, link) {
            lib.setScroll(node.parentNode);
            const trast={
    			//off: '关闭',
    			helasisy: '娘化卡牌',
    			xiaosha:  '虚拟偶像',
    			nsfw: '艺术鉴赏',
    			hakimi: '南北绿豆',
            };
            if(link!=false && trast[link]) {
                let showImg=`<span style="display: inline-block; width: 60px; height: 80px; font-size: 15px;">
                  ${trast[link]}
                  <img src="${lib.assetURL}extension/十周年UI/image/card_${link}/sha.png" style="width: 100%; height: auto; object-fit: contain; border-radius: 3px;" alt="${trast[link]}">
                </span>`;
                node.innerHTML = showImg;
            }
        },
	    intro: '可以为卡牌图片替换一些特殊的风格。<li>娘化卡牌 由 赫拉西斯 制作，适配于大将军金色卡牌风格。<li>虚拟偶像 、 艺术鉴赏 和 南北绿豆 由网友分享，适配新版高清风格、面杀风格的卡牌',
	},
	cardPrettify:{
        name: '卡牌美化',
        init: 'png',
		item: {
			off: '关闭',
			webp: '金色将军',
			png:  '手杀风格',
			jpg:  '高清卡牌',
			bmp: '面杀风格',
		},
		onclick:function(item){
		    var offline=sessionStorage.getItem('Network');
			if(!offline) offline='offline';
			if(offline=='offline') {
			    if(lib.config.game_cardSet!='off') alert('已将卡牌整体的单机风格设置为关闭！');
			    game.saveConfig('game_cardSet','off');
			    //game.saveConfig('extension_十周年UI_game_cardSet','off');
			}else {
			    if(lib.config.game_cardSet2!='off') alert('已将卡牌整体的如真风格设置为关闭！');
			    game.saveConfig('game_cardSet2','off');
			    //game.saveConfig('extension_十周年UI_game_cardSet2','off');
			}
			game.saveConfig('extension_十周年UI_cardPrettify',item);
		},
		"textMenu": function(node, link) {
            lib.setScroll(node.parentNode);
            const trast={
    			//off: '关闭',
    			webp: '金色将军',
    			png:  '手杀风格',
    			jpg:  '高清卡牌',
    			bmp: '面杀风格',
            };
            if(link!=false && trast[link]) {
                let showImg=`<span style="display: inline-block; width: 60px; height: 80px; font-size: 15px;">
                  ${trast[link]}
                  <img src="${lib.assetURL}extension/十周年UI/image/card/sha.${link}" style="width: 100%; height: auto; object-fit: contain; border-radius: 3px;" alt="${trast[link]}">
                </span>`;
                node.innerHTML = showImg;
            }
        },
    },
    cardBorder:{
        name: '卡牌边框',
        init: 'off',
		item: {
			off: '关闭',
			one: '金凤丹玉',
			two:  '镶金边框',
			three:  '镶银边框',
			four: '赤焰图腾',
			five: '寒冰图腾',
			six: '典藏边框',
			seven: '龙纹边框',
			eight: '铜雀边框',
			night: '至尊边框',
		},
		onclick:function(item){
		    var offline=sessionStorage.getItem('Network');
			if(!offline) offline='offline';
			if(offline=='offline') {
			    if(lib.config.game_cardSet!='off') alert('已将卡牌整体的单机风格设置为关闭！');
			    game.saveConfig('game_cardSet','off');
			    //game.saveConfig('extension_十周年UI_game_cardSet','off');
			}else {
			    if(lib.config.game_cardSet2!='off') alert('已将卡牌整体的如真风格设置为关闭！');
			    game.saveConfig('game_cardSet2','off');
			    //game.saveConfig('extension_十周年UI_game_cardSet2','off');
			}
			game.saveConfig('extension_十周年UI_cardBorder',item);
			//if (window.decadeUI) ui.arena.dataset.cardBorder=lib.config['extension_十周年UI_cardBorder'];
		},
		"textMenu": function(node, link) {
            lib.setScroll(node.parentNode);
            const numTra=['zero','one','two','three','four','five','six','seven','eight','night','ten'];
            const trast={
    			//off: '关闭',
    			one: '金凤丹玉',
    			two:  '镶金边框',
    			three:  '镶银边框',
    			four: '赤焰图腾',
    			five: '寒冰图腾',
    			six: '典藏边框',
    			seven: '龙纹边框',
    			eight: '铜雀边框',
    			night: '至尊边框',
            };
            if(link!=false && trast[link]) {
                let showImg=`<span style="display: inline-block; width: 60px; height: 80px; font-size: 15px;">
                  ${trast[link]}
                  <img src="${lib.assetURL}extension/十周年UI/assets/image/card${numTra.indexOf(link)}.png" style="width: 100%; height: auto; object-fit: contain; border-radius: 3px; background-color: rgba(0, 0, 0, 0.4);" alt="${trast[link]}">
                </span>`;
                node.innerHTML = showImg;
            }
        },
		update:function(){
		    if (window.decadeUI) ui.arena.dataset.cardBorder=lib.config['extension_十周年UI_cardBorder'];
		    if (ui.handcards1Container) ui.handcards1Container.dataset.borders=lib.config['extension_十周年UI_cardBorder'];
		    if (window.decadeUI) ui.window.dataset.arenaCardBorder=lib.config['extension_十周年UI_cardBorder'];
		},
    },
	gold_suitnum:{
		name: '视为点数花色高亮',
        init: 'gold',
        intro: '高亮“视为”牌点数和花色变化牌的内容，重启后生效',
        item: {
          	none: '关闭',
          	gold: '金色',
          	blue: '蓝色',
	  	},
	},
	dynamicBackground:{
		name: '动态背景(导入骨骼包才可使用)',
		init: 'off',
		item: window.decadeUIdynamicBackground,
		update:function(){
			if (!window.decadeUI) return;
			
			var item = lib.config['extension_十周年UI_dynamicBackground'];
			if (!item || item == 'off') {
				decadeUI.backgroundAnimation.stopSpineAll();
				window._tempSRDB = 'none';
			} else {
				if(item == 'random') {
				    if(!game._statusRandDynamicBackground) {
				        game._statusRandDynamicBackground = Object.keys(window.decadeUIdynamicBackground).slice(2).randomGet();
				    }
				    item = game._statusRandDynamicBackground;
				}
				if(window._tempSRDB == item) return;
				var name = item.split('_');
				var skin = name.splice(name.length - 1, 1)[0]
				name = name.join('_')
				decadeUI.backgroundAnimation.play(name, skin);
			}
		}
	},
	dynamicSkin:{
        name: '动态皮肤',
		init: false,
    },
	dynamicSkinOutcrop:{
		name: '动皮露头',
        init: true,
		update:function(){
			if (window.decadeUI) {
				var enable = lib.config['extension_十周年UI_dynamicSkinOutcrop'];
				ui.arena.dataset.dynamicSkinOutcrop = enable ? 'on' : 'off';
				var players = game.players;
				if (!players) return;
				for (var i = 0; i < players.length; i++) {
					if (players[i].dynamic) {
						players[i].dynamic.outcropMask = enable;
						players[i].dynamic.update(false);
					}
				}
			}
		}
	},
    cardAlternateNameVisible:{
        name: '牌名辅助显示',
        init: false,
		update:function(){
			if (window.decadeUI) ui.window.dataset.cardAlternateNameVisible = lib.config['extension_十周年UI_cardAlternateNameVisible'] ? 'on' : 'off';
		}
    },
	campIdentityImageMode:{
        name: '势力身份美化',
        init: true,
    },
	tuoguan_hide:{
	    name:'隐藏托管提示',
	    init:false,
	    intro:'隐藏开启托管后在界面显示的“托管中...”提示',
	    update:function(config,map){
	        function toggleAutonodeOpacity(show) {
              const styleId = 'autonode-style';
              let styleElement = document.getElementById(styleId);
              
              // 如果参数不是布尔值，可以处理为切换状态
              if (typeof show !== 'boolean') {
                show = !styleElement; // 如果已存在样式则移除，否则添加
              }
              
              if (show) {
                // 如果已经存在样式，先移除旧的再创建新的
                if (styleElement) {
                  styleElement.remove();
                }
                
                // 创建新的样式元素
                styleElement = document.createElement('style');
                styleElement.id = styleId;
                styleElement.textContent = '#autonode { opacity: 0 !important; }';
                document.head.appendChild(styleElement);
                return true; // 表示已添加样式
              } else {
                // 移除样式元素
                if (styleElement) {
                  styleElement.remove();
                  return false; // 表示已移除样式
                }
              }
              return null; // 表示无变化
            }
	        toggleAutonodeOpacity(lib.config['extension_十周年UI_tuoguan_hide']);
	    },
	},
    SanGuoShaGameStart: {
        name: '<b><font color=\"#FF0000\">游戏开场切换(需重启)',
        intro: '<b><font color=\"#FF0000\">此选项可以切换三国杀游戏开场样式，根据个人喜好自行切换，重启生效',
        init: 'shousha_dys',
        item: {
          	shizhounian: '十周年',
          	shizhounian_dys: '十周年大元帅',
          	shizhounian_djj: '十周年大将军',
		  	shizhounian_zf: '十周年中锋',
		  	shizhounian_qfz: '十周年千夫长',
          	shousha_dys: '手杀大元帅',
          	shousha_djj: '手杀大将军',
          	shousha_jj: '手杀将军',
          	shousha_xw: '手杀校尉',
          	SF_kaizhan_eff_putong: '新十周年普通',
          	SF_kaizhan_eff_jiangjun: '新十周年将军',
          	SF_kaizhan_eff_weijiangjun: '新十周年卫将军',
          	SF_kaizhan_eff_cheqijiangjun: '新十周年车骑将军',
          	SF_kaizhan_eff_piaoqijiangjun: '新十周年骠骑将军',
          	SF_kaizhan_eff_dajiangjun: '新十周年大将军',
          	SF_kaizhan_eff_dasima: '新十周年大司马',
		  	shizhounian_SJ: '十周年样式随机',
          	shousha_SJ: '手杀样式随机',
          	xinshizhounian_SJ: '新十周年样式随机',
			off: '关闭',
        },
        update: function () {
          if (window.decadeUI) ui.arena.dataset.SanGuoShaGameStart = lib.config['extension_十周年UI_SanGuoShaGameStart'];
        }
    },
    SanGuoShaGameOver:{
		name: '<b><font color=\"#FF0000\">游戏结算特效(需重启)',
		intro: '<b><font color=\"#FF0000\">此选项可以切换三国杀游戏结算样式，根据个人喜好自行切换，重启生效',
        init: 'shousha',
		item:{
            shizhounian:'十周年样式',
			shousha:'手杀样式',
			off:'关闭',
        },
		update:function(){
			if (window.decadeUI) ui.arena.dataset.SanGuoShaGameOver = lib.config['extension_十周年UI_SanGuoShaGameOver'];
		}
	},
	CPZS:{
		name: '<b><font color=\"#FF0000\">出牌指示特效(需重启)',
		intro: '<b><font color=\"#FF0000\">此选项可以切换目标指示特效，根据个人喜好自行切换，重启生效',
        init: 'shoushaX',
		item:{
		    shoushaX:'手杀经典',
		    shousha:'手杀新版',
		    jiangjun:'十周年将军',
		    weijiangjun:'十周年卫将军',
		    cheqijiangjun:'十周年车骑将军',
		    biaoqijiangjun:'十周年骠骑将军',
		    dajiangjun:'十周年大将军',
            dasima:'十周年大司马',
			off:'关闭',
        },
		update:function(){
			if (window.decadeUI) ui.arena.dataset.CPZS = lib.config['extension_十周年UI_CPZS'];
		}
	},
	JNTX:{
		name: '<b><font color=\"#FF0000\">更多局内特效(需重启)',
        init: true,
        intro: '性能不好可关闭',
	},
	JBDDZ:{
		name: '军八斗地主美化(仅手杀样式有效)',
        init: true,
        intro: '双将模式选将有问题可关闭这个',
		onclick:function(value){
            game.saveConfig('extension_十周年UI_JBDDZ', value);
			if (window.decadeUI) decadeUI.config.JBDDZ = value;
        },
	},
	playerKillEffect:{
		name: '玩家击杀特效',
        init: false,
		onclick:function(value){
            game.saveConfig('extension_十周年UI_playerKillEffect', value);
            if (window.decadeUI) decadeUI.config.playerKillEffect = value;
        },
	},
	gameAnimationEffect:{
		name: '游戏动画特效',
        init: true,
	},
	EffectWood:{
		name: '治疗特效',
        init: false,
		onclick:function(value){
            game.saveConfig('extension_十周年UI_EffectWood', value);
			if (window.decadeUI) decadeUI.config.EffectWood = value;
        },
	},
	playerDieEffect:{
		name: '玩家阵亡特效',
        init: true,
		onclick:function(value){
            game.saveConfig('extension_十周年UI_playerDieEffect', value);
			if (window.decadeUI) decadeUI.config.playerDieEffect = value;
        },
	},
	cardUseEffect:{
		name: '卡牌使用特效',
        init: false,
		onclick:function(value){
            game.saveConfig('extension_十周年UI_cardUseEffect', value);
			if (window.decadeUI) decadeUI.config.cardUseEffect = value;
        },
	},
	/*playerLineEffect:{
		name: '玩家指示线特效',
        init: false,
		onclick:function(value){
            game.saveConfig('extension_十周年UI_playerLineEffect', value);
			if (window.decadeUI) decadeUI.config.playerLineEffect = value;
        },
	},*/
	outcropSkin: {
        name: '露头皮肤(需对应素材)',
        init: 'shousha',
        item: {
              shizhounian: '十周年露头',
              shousha: '手杀露头',
              off: '关闭'
          },
        update: function () {
          if (window.decadeUI) ui.arena.dataset.outcropSkin = lib.config['extension_十周年UI_outcropSkin'] ;
        },
        unshow:true,//隐藏这个设置
      },
	borderLevel:{
		name: '玩家边框等阶',
        init: 'kill',
        item:{
            one:'一阶',
			two:'二阶',
			three:'三阶',
			four:'四阶',
			five:'五阶',
			kill:'随武将评级',
        },
		update:function(){
			if (window.decadeUI) ui.arena.dataset.borderLevel = lib.config['extension_十周年UI_borderLevel'];
		}
	},
	skill_control_gold:{
		name: '按钮文字镶金',
        init: 'none',
		intro: "开启后，会将选择按钮的文字样式变成金色",
		item:{
            none:'关闭',
			onstart:'开局前',
			forever:'保持开启',
        },
	},
	gainSkillsShown:{
	    name: '获得技能显示(标记)',
	    init: true,
	},
	gainSkillsVisible:{
		name: '获得技能显示(贴纸)',
        init: 'off',
        item:{
            on: '显示',
			off: '不显示',
			othersOn : '显示他人',
        },
		update:function(){
			if (window.decadeUI) ui.arena.dataset.gainSkillsVisible = lib.config['extension_十周年UI_gainSkillsVisible'];
		},
		unshow:true,//隐藏这个设置
	},
	playerMarkStyle:{
        name: '人物标记样式',
        init: 'decade',
        item:{
			red:'红灯笼',
			yellow:'黄灯笼',
			decade: '十周年',
        },
		update:function(){
			if (window.decadeUI) ui.arena.dataset.playerMarkStyle = lib.config['extension_十周年UI_playerMarkStyle'];
		}
    },
    shoushaNewNewMark:{
		name: '手杀标记优化',
		intro: '人物标记样式中选择“十周年”，开启此选项后将优化手杀样式的标记排版，同一行内可容纳更多的标记，使得标记栏不会拉伸得太夸张（具体见张琪瑛）',
        init: true,
	},
    newDecadeStyle: {
		name: '样式切换(需重启)',
		intro: '重启生效',
		init: 'off',
		item:{
			on: '十周年样式',
			off: '手杀样式',
		},
		update:function() {
			if (window.decadeUI) ui.arena.dataset.newDecadeStyle = lib.config['extension_十周年UI_newDecadeStyle'];
		},
		unshow:true,//隐藏这个设置
	},
	changeWujiangTX: {
		name: '换将特效',
		intro: '选将时点击右上角换将卡进行换将的特效',
		init: 'shine',
		item:{
			off: '关闭特效',
			blur:'过渡特效',
			shine: '闪光特效',
		},
		update:function() {
			if (window.decadeUI) ui.arena.dataset.newDecadeStyle = lib.config['extension_十周年UI_newDecadeStyle'];
		}
	},
	shadowStyle: {
                name: '<b><font color=\"#FF9000\">弹出文字样式',
                intro: '<b><font color=\"#FF9000\">可根据个人喜好切换局内人物弹出文字的样式',
                init: 'off',
                item: {
                    on: '原样式',
                    off: '新样式'
                },
                update: function () {
                    if (window.decadeUI) ui.arena.dataset.shadowStyle = lib.config['extension_十周年UI_shadowStyle'];
                }
            },
	rarityLong:{
		name: '龙头美化',
        intro: '仅适用于手杀样式',
		init: 'on',
		item:{
		    x: '关闭',
			on: '经典龙头',
			off: '经典龙头-静',
			xinon: '新版龙头',
		},
		update:function() {
			if (window.decadeUI) ui.arena.dataset.rarityLong = lib.config['extension_十周年UI_rarityLong'];
		}
	},
	decadeLayout: {
				name: '<b><font color=\"#0040FF\">界面布局',
				intro: '<b><font color=\"#0040FF\">切换界面布局样式，初始为十周年布局，根据个人喜好自行切换，重启生效',
				init: 'off',
				item: {
					on: '十周年样式',
					off: '手杀样式',
				},
				update: function () {
					if (window.decadeUI) ui.arena.dataset.decadeLayout = lib.config['extension_十周年UI_decadeLayout'];
				},
				unshow:true,//隐藏这个设置
			},
	aloneEquip: {
                name: '<b><font color=\"#FF7575\">单独装备栏(需重启)',
                intro: '<b><font color=\"#FF7575\">仅在十周年美化样式下生效，根据个人喜好调整',
                init: false,
                update: function() {
                    if (window.decadeUI) {
                        if (lib.config.extension_十周年UI_newDecadeStyle == 'on') ui.arena.dataset.aloneEquip = lib.config['extension_十周年UI_aloneEquip'] ? 'on' : 'off';
                        else ui.arena.dataset.aloneEquip = 'off';
                    }
                }
            },
    shoushaNewEquip: {
                name: '<b><font color=\"#FF7575\">手杀装备栏优化',
                intro: '<b><font color=\"#FF7575\">仅在手杀美化样式下生效，若无对应图片则尝试在本体的素材内添加',
                init: true,
                /*update: function() {
                    if (window.decadeUI) {
                        if (lib.config.extension_十周年UI_newDecadeStyle == 'on') ui.arena.dataset.aloneEquip = lib.config['extension_十周年UI_aloneEquip'] ? 'on' : 'off';
                        else ui.arena.dataset.aloneEquip = 'off';
                    }
                }*/
            },
    shoushaNewMark: {
                name: '<b><font color=\"#FF7575\">手杀标记栏优化',
                intro: '<b><font color=\"#FF7575\">仅在手杀美化样式下生效，使用细款字体并增加标记阴影（webview122及以上版本此开关无效）',
                init: true,
                /*update: function() {
                    if (window.decadeUI) {
                        if (lib.config.extension_十周年UI_newDecadeStyle == 'on') ui.arena.dataset.aloneEquip = lib.config['extension_十周年UI_aloneEquip'] ? 'on' : 'off';
                        else ui.arena.dataset.aloneEquip = 'off';
                    }
                }*/
            },
	loadingStyle: {
                name: '<b><font color=\"#FF6020\">更换光标+loading框',
                intro: '<b><font color=\"#FF6020\">可以更换局内选项框以及光标',
                init: 'othersOn',
                item: {
                    off: '关闭',
                    on: '<div style="width:60px;height:40px;position:relative;background-image: url(' + lib.assetURL + 'extension/十周年UI/assets/image/dialog2.png);background-size: 100% 100%;"></div>',
                    On: '<div style="width:60px;height:40px;position:relative;background-image: url(' + lib.assetURL + 'extension/十周年UI/assets/image/dialog1.png);background-size: 100% 100%;"></div>',
                    othersOn: '<div style="width:60px;height:40px;position:relative;background-image: url(' + lib.assetURL + 'extension/十周年UI/assets/image/dialog3.png);background-size: 100% 100%;"></div>',
                },
                update:function() {
                    if (window.decadeUI) ui.arena.dataset.loadingStyle = lib.config['extension_十周年UI_loadingStyle'];
                },
                unshow:true,//隐藏这个设置
            },
            
},
package:{
    character:{
        character:{
        },
        translate:{
        }
    },
    card:{
        card:{
        },
        translate:{
        },
        list:[]
    },
    skill:{
        skill:{
        },
        translate:{
        }
    },
	intro:(function(){
		var log = [
			'同步至魔改十周年 萌修 0.0.9',
		];
		return '<p style="color:rgb(210,210,000); font-size:12px; line-height:14px; text-shadow: 0 0 2px black;">' + log.join('<br>') + '</p>';
	})(),
	author:"短歌<br>修改：萌新（转型中）",
    diskURL:"",
    forumURL:"",
	version:"0.0.9",
},
files:{
    "character":[],
    "card":[],
    "skill":[]
},
editable: false
};
});