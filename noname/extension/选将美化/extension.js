game.import("extension",function(lib,game,ui,get,ai,_status){
window.xiguaxuanjiang = {
    intro:"鸣谢人员包括但不限于：蒸，🥕，某个萌新，雷，梨花泪。<br>再次感谢：某个萌新，夕，雨夜触花开提供的素材。",
    author:'西瓜',
        zhulianbihe: {
            name: "../../../选将美化/animation/zhulianbihe",
        },//珠联璧合
        SS_skillwqx: {
			name: "../../../选将美化/animation/SS_skillwqx",
		},
}
window.twotwoDoubleGroups = [];
let basicGroup = ['wei','shu','wu','qun'];
for(let i=0;i<basicGroup.length;i++) {
    for(let j=0;j<basicGroup.length;j++) {
        if(i==j) continue;
        window.twotwoDoubleGroups.push(basicGroup[i]+basicGroup[j]);
    }
}
return {name:"选将美化",content:function(config,pack){
    lib.init.css(lib.assetURL + 'extension/选将美化', 'e');
//修复清正莫名其妙恢复游戏导致的bug 
ui.xjmhQingzhengNext = function() {
    if(_status.event&&_status.event.dialog&&_status.event.dialog.isQingZheng) {
        _status.event.dialog.isQingZheng=undefined;
    }
};
ui.create.dialognew = function() {
    var i;
    var hidden = false;
    var notouchscroll = false;
    var forcebutton = false;
    var noforcebutton = false;
    var dialog = decadeUI.element.create('dialog');
    dialog.classList.add('noupdate'); 
    dialog.contentContainer = decadeUI.element.create('content-container', dialog);
    dialog.content = decadeUI.element.create('content', dialog.contentContainer);
    dialog.buttons = [];
    for (i in lib.element.dialog) dialog[i] = lib.element.dialog[i];
    for (i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == 'boolean') dialog.static = arguments[i];
        else if (arguments[i] == 'hidden') hidden = true;
        else if (arguments[i] == 'notouchscroll') notouchscroll = true;
        else if (arguments[i] == 'forcebutton') forcebutton = true;
        else if (arguments[i] == 'noforcebutton') noforcebutton = true;
        else if (arguments[i].indexOf('#') != -1 && arguments[i].indexOf('>') == -1) dialog.id = arguments[i].slice(1);
        //修复大部分框都被误判导致isQingZheng的bug
        else if (arguments[i] == '#sbqingzheng') dialog.isQingZheng=true;
        else if (arguments[i] == '#sbqingzhengFake') dialog.isQingZheng=true;
        else if (arguments[i] == '#duorui') dialog.isQingZheng=true;
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
    return dialog;
}
if (config.twotwo) {                        
            //备份一个原版的
            game.old_twotwo=lib.game.chooseCharacterTwo;
            //22修改
            lib.game.chooseCharacterTwo = function () {
                if(!game.rz_isPaiWeiing) {
                    game.old_twotwo();
                    return;
                }
                game.storyBackground();
                //window.canNoShowSearch=true;
                //if(ui.Searcher) ui.Searcher.hide();
                //if(ui.JinJiang) ui.JinJiang.hide();
                game.noAuto=true;
                ui.background.style.zIndex = '6';
                game.players.forEach(player=>player.changeGroup = function(group,log,broadcast){
                    if(game.jj_twotwo&&(this.group=='shen'||this.group=='devil')) {
                        var loopSet={};
                        loopSet.set=function(){
                            return loopSet;
                        };
                        if(this!=game.me) {
                            return loopSet;
                        }else {
                            this.group = group;
                            this.node.name.dataset.nature = get.groupnature(this.group);
                            return loopSet;
                        }
                    }
                    var next=game.createEvent('changeGroup');
                    next.player=this;
                    next.log=true;
                    for(var i=0;i<arguments.length;i++){
                        var arg=arguments[i];
                        if(lib.group.contains(arg)){
                            next.group=arg;
                        }
                        else if(typeof arg==='boolean'){
                            next.log=arg;
                        }
                        else if(arg==='nobroadcast'){
                            next.broadcast=false;
                        }
                    }
                    next.setContent('changeGroup');
                    return next;
                });
                game.getTwotwoList=function(){
                    var list=[];
					var list4=[];
					for(i in lib.characterReplace){
						var ix=lib.characterReplace[i];
						for(var j=0;j<ix.length;j++){
							if(lib.filter.characterDisabled(ix[j])) ix.splice(j--,1);
						}
						if(ix.length){
							list.push(i);
							list4.addArray(ix);
						}
					}
					for(i in lib.character){
						if(!list4.contains(i)&&!lib.filter.characterDisabled(i)){
							list.push(i);
							list4.push(i);
						}
					}
					var choose=[];
					return list;
                }
                var next = game.createEvent('chooseCharacter', false);
                next.showConfig = true;
                next.setContent(function () {
                    'step 0'
                    //gs加密代码，这里使用外部方法屏蔽这个垃圾选势力
                    game.jj_twotwo = true;
                    //修复俩手一起摁误触的bug
                    event.finder = setInterval(()=>{
                        var djjs = document.querySelectorAll('.djjnms');
                        if(djjs&&djjs.length>=2) {
                            var previousNum = djjs.length;
                            var judgeNum = setInterval(()=>{
                                var ndjjs = document.querySelectorAll('.djjnms');
                                nextNum = ndjjs.length;
                                if(nextNum<previousNum) {
                                    for(var i=0;i<djjs.length;i++) {
                                        var node = djjs[i];
                                        node.remove();
                                    }
                                    clearInterval(judgeNum);
                                }else {
                                    previousNum = nextNum;
                                }
                            },100);
                        }
                    },200);
                    ui.arena.classList.add("choose-character");
                    for (var i in lib.skill) {
                        if (lib.skill[i].changeSeat) {
                            lib.skill[i] = {};
                            if (lib.translate[i + "_info"]) {
                                lib.translate[i + "_info"] = "此模式下不可用";
                            }
                        }
                    }
                    var bool = Math.random() < 0.5;
                    var bool2 = Math.random() < 0.5;
                    var ref = game.players[0];
                    ref.side = bool;
                    ref.next.side = bool2;
                    ref.next.next.side = !bool;
                    ref.previous.side = !bool2;
                    var firstChoose = game.players.randomGet();
                    if (firstChoose.next.side == firstChoose.side) {
                        firstChoose = firstChoose.next;
                    }
                    _status.firstAct = firstChoose;
                    for (var i = 0; i < 4; i++) {
                        firstChoose.node.name.innerHTML = get.verticalStr(get.cnNumber(i + 1, true) + "号位");
                        firstChoose = firstChoose.next;
                    }
                    for (var i = 0; i < game.players.length; i++) {
                        if (game.players[i].side == game.me.side) {
                            game.players[i].node.identity.firstChild.innerHTML = "敌";//"龙";
                        } else {
                            game.players[i].node.identity.firstChild.innerHTML = "友";//"虎";
                        }
                        //game.players[i].node.identity.dataset.color = game.players[i].side + "zhu";
                    }
                    var list = [];
                    var list4 = [];
                    for (i in lib.characterReplace) {
                        var ix = lib.characterReplace[i];
                        for (var j = 0; j < ix.length; j++) {
                            if (lib.filter.characterDisabled(ix[j])) {
                                ix.splice(j--, 1);
                            }
                        }
                        if (ix.length) {
                            list.push(i);
                            list4.addArray(ix);
                        }
                    }
                    for (i in lib.character) {
                        if (!list4.contains(i) && !lib.filter.characterDisabled(i)) {
                            list.push(i);
                            list4.push(i);
                        }
                    }
                    event.list = list;
                    _status.characterlist = list4;
                    var addSetting = function (inputVector) {
                    };
                    var removeSetting = function () {
                        var dialogElement = _status.event.dialog;
                        if (dialogElement) {
                            {
                                dialogElement.style.height = "";
                                delete dialogElement._scrollset;
                                var settingElements = Array.from(dialogElement.querySelectorAll(".add-setting"));
                                while (settingElements.length) {
                                    {
                                        settingElements.shift().remove();
                                    }
                                }
                                ui.update();
                            }
                        }
                    };
                    event.addSetting = addSetting;
                    event.removeSetting = removeSetting;
                    var characterChoice;
                    if (_status.brawl && _status.brawl.chooseCharacter) {
                        characterChoice = _status.brawl.chooseCharacter(list, game.me);
                    } else {
                        characterChoice = list4.randomGets(10);
                    }
                    var basenum = 1;
                    var basestr = "选择角色";
                    if (get.config("two_assign")) {
                        basenum = 2;
                        basestr = "选择角色";
                        event.two_assign = true;
                    }
                    if (get.config("replace_character_two")) {
                        basestr += "";
                        _status.replacetwo = true;
                        game.additionaldead = [];
                        basenum *= 2;
                    }
                    var zhuanhuan = function (inputCharacter) {
                        if (inputCharacter == "一") {
                            {
                                yy = 1;
                            }
                        } else {
                            if (inputCharacter == "二") {
                                {
                                    yy = 2;
                                }
                            } else {
                                if (inputCharacter == "三") {
                                    {
                                        yy = 3;
                                    }
                                } else {
                                    if (inputCharacter == "四") {
                                        {
                                            yy = 4;
                                        }
                                    } else {
                                        {
                                            yy = "";
                                        }
                                    }
                                }
                            }
                        }
                        return yy;
                    };
                    if (!lib.nonameDecade) {
                    }
                    var zjzwh = zhuanhuan(game.me.node.name.innerHTML[0]);
                    var xiajia = zhuanhuan(game.me.getNext().node.name.innerHTML[0]);
                    var shangjia = zhuanhuan(game.me.getPrevious().node.name.innerHTML[0]);
                    var shangshangjia = zhuanhuan(game.me.getPrevious().getPrevious().node.name.innerHTML[0]);
                    var lhdt = ui.create.div(".lhdtxgxg", ui.arena);
                    var longdui = ui.create.div(".longdui", lhdt);
                    var longdui2 = ui.create.div(".longdui2", lhdt);
                    var hudui = ui.create.div(".hudui", lhdt);
                    var hudui2 = ui.create.div(".hudui2", lhdt);
                    var dtwz = ui.create.div(".wenzi", lhdt);
                    dtwz.innerHTML = "<span style='color: #ffff00'>我(龙)</span";
                    longdui.innerHTML = "龙<img src='" + lib.assetURL + "extension/选将美化/assets/image/identity/seat_" + zjzwh + ".png" + "' style='width:13px;height:18px;'/>";
                    hudui2.innerHTML = "虎<img src='" + lib.assetURL + "extension/选将美化/assets/image/identity/seat_" + shangshangjia + ".png" + "' style='width:13px;height:18px;'/>";
                    if (game.me.getNext().side == game.me.side) {
                        longdui2.style.backgroundImage = "url(\"" + lib.assetURL + "extension/选将美化/assets/image/zhong.png\")";
                        longdui2.innerHTML = "龙<img src='" + lib.assetURL + "extension/选将美化/assets/image/identity/seat_" + xiajia + ".png" + "' style='width:13px;height:18px;'/>";
                        hudui.style.backgroundImage = "url(\"" + lib.assetURL + "extension/选将美化/assets/image/fan.png\")";
                        hudui.innerHTML = "虎<img src='" + lib.assetURL + "extension/选将美化/assets/image/identity/seat_" + shangjia + ".png" + "' style='width:13px;height:18px;'/>";
                    } else {
                        longdui2.style.backgroundImage = "url(\"" + lib.assetURL + "extension/选将美化/assets/image/fan.png\")";
                        longdui2.innerHTML = "虎<img src='" + lib.assetURL + "extension/选将美化/assets/image/identity/seat_" + xiajia + ".png" + "' style='width:13px;height:18px;'/>";
                        hudui.style.backgroundImage = "url(\"" + lib.assetURL + "extension/选将美化/assets/image/zhong.png\")";
                        hudui.innerHTML = "龙<img src='" + lib.assetURL + "extension/选将美化/assets/image/identity/seat_" + shangjia + ".png" + "' style='width:13px;height:18px;'/>";
                    }
                    var char = characterChoice.slice();
                    var randomIndex = Math.floor(Math.random() * char.length);
                    var randomx = characterChoice[randomIndex];
                    char.splice(randomIndex, 1);
                    randomy = char.randomGets(1);
                    var zuhebg = ui.create.div(".zuhebg", lhdt);
                    var zuhetuijian = ui.create.div(".zuhetuijian", zuhebg);
                    zuhetuijian.innerHTML = "组合推荐";
                    var zuheziji = ui.create.div(".zuheziji", zuhebg);
                    var zuheduiyou = ui.create.div(".zuheduiyou", zuhebg);
                    zuheziji.setBackground(randomx, "character");
                    zuheduiyou.setBackground(randomy, "character");
                    var zuhezijix = ui.create.div(".zuhezijix", zuheziji);
                    var zuheduiyoux = ui.create.div(".zuheduiyoux", zuheduiyou);
                    var zuhezijiz = ui.create.div(".zuhezijiz", zuheziji);
                    var zuheduiyouz = ui.create.div(".zuheduiyouz", zuheduiyou);
                    zuhezijiz.innerHTML = "自己";
                    zuheduiyouz.innerHTML = "队友";
                    var dialog = ui.create.dialognew("#twotwo");
                    var biaoti = ui.create.div(".biaotixx", dialog);
                    var txt = ui.create.div(".Footerxxxggg", dialog);
                    var jdt = ui.create.div(".jindutiaoxgxg", dialog);
                    var jdtx = ui.create.div(".jindutiaoxgxgx", dialog);
                    jdt.style.top = "250px";
                    jdtx.style.top = "250px";
                    txt.innerHTML = "请选择武将";
                    biaoti.innerHTML = basestr;
                    var wjk = ui.create.div(".wujiangkuangnew", dialog);
                    ui.create.div(".zijiziji", wjk);
                    var wjk2 = ui.create.div(".wujiangkuangnew2", dialog);
                    if (zjzwh == 1 || zjzwh == 2) {
                        wjk.style.left = "28%";
                        wjk2.style.left = "49%";
                    } else {
                        wjk.style.left = "49%";
                        wjk2.style.left = "28%";
                    }
                    ui.biankuangai = ui.create.div(".biankuangname", wjk2);
                    ui.biankuang = ui.create.div(".biankuangname", wjk);
                    ui.biankuang.setBackgroundImage("extension/选将美化/assets/image/group/unknown.png");
                    ui.biankuangai.setBackgroundImage("extension/选将美化/assets/image/group/unknown.png");
                    var tuijian = ui.create.div(".tuijian", ui.biankuangai);
                    var yzb = ui.create.div(".yzb", ui.biankuangai);
                    ui.dianjiqueding = ui.create.div(".dianjiqueding", ui.biankuang);
                    ui.queding = ui.create.div(".queding", ui.dianjiqueding);
                    ui.namek = ui.create.div(".name", ui.biankuang);
                    ui.namekai = ui.create.div(".name", ui.biankuangai);
                    if (!ui.zhuhpWrap) {
                        ui.zhuhpWrap = ui.create.div(".hp-wrap", ui.biankuang);
                    }
                    if (!ui.zhuhp && ui.zhuhpWrap) {
                        ui.zhuhp = ui.create.div(".hp", wjk, ui.zhuhpWrap);
                    }
                    if (!ui.aihpWrap) {
                        ui.aihpWrap = ui.create.div(".hp-wrap", ui.biankuangai);
                    }
                    if (!ui.aihp && ui.aihpWrap) {
                        ui.aihp = ui.create.div(".hp", wjk, ui.aihpWrap);
                    }
                    wjt = ui.create.div(".wjtaaaa", ui.biankuang);
                    wjtai = ui.create.div(".wjtbbbb", ui.biankuangai);
                    event.link = false;
                    event.tuijian = false;
                    tuijian.addEventListener("click", function () {
                        event.tuijian = !event.tuijian;
                        if (event.tuijian) {
                            {
                                game.playAudio("../extension/选将美化/audio/Label.mp3");
                                tuijian.style.backgroundImage = "url(\"" + lib.assetURL + "extension/选将美化/assets/image/game_recommend_btn.png\")";
                                var positionNumber = game.me.getNext().side == game.me.side ? xiajia : shangjia;
                                biaoti.innerHTML = "<span style='color: #ffff00'>正在给" + positionNumber + "号位推荐武将</span>";
                            }
                        } else {
                            {
                                game.playAudio("../extension/选将美化/audio/Label.mp3");
                                tuijian.style.backgroundImage = "url(\"" + lib.assetURL + "extension/选将美化/assets/image/game_recommend_btn_not.png\")";
                                biaoti.innerHTML = basestr;
                            }
                        }
                    });
                    for (var p = 0; p < characterChoice.length; p++) {
                        var xtxbg = ui.create.div(".xtxxbg", dialog);
                        var xtxx = ui.create.div(".xtxx", xtxbg);
                        var xxtxname = ui.create.div(".xtxxName", xtxx);
                        xxtxname.innerHTML = get.translation(characterChoice[p]);
                        xtxx.setBackground(characterChoice[p], "character");
                        xtxx.link = characterChoice[p];
                        xtxx.liu = p;
                        let pressTimer = null;
                        let nochend = false;
                        var isMobile = navigator.userAgent.match(/(Android|iPhone|SymbianOS|Windows Phone|iPad|iPod)/i);
                        if (isMobile) {
                            dragevent = ["touchstart", "touchmove", "touchend"];
                        } else {
                            dragevent = ["mousedown", "mousemove", "mouseup"];
                        }
                        xtxx.addEventListener(dragevent[0], function () {
                            if (!nochend) {
                                {
                                    pressTimer = setTimeout(() => {
                                        {
                                            ui.djjnms = ui.create.div(".djjnms", this);
                                            for (var translationKey of lib.character[this.link][3]) {
                                                {
                                                    ui.djjnms.innerHTML += "<span style='color: #ffff00'>" + get.translation(translationKey) + "</span>" + ":";
                                                    ui.djjnms.innerHTML += get.translation(translationKey + "_info") + "<br>";
                                                }
                                            }
                                            var elementRect = ui.djjnms.getBoundingClientRect();
                                            var scrollPosition = elementRect.height;
                                            ui.djjnms.style.transform = "translateY(" + (-scrollPosition + 50) + "px)";
                                            if (this.liu > 4) {
                                                ui.djjnms.style.left = "-400px";
                                            }
                                            nochend = true;
                                        }
                                    }, 500);
                                }
                            }
                        });
                        xtxx.addEventListener(dragevent[2], function () {
                            clearTimeout(pressTimer);
                            nochend = false;
                            if (ui.djjnms) {
                                ui.djjnms.remove();
                            }
                        });
                        xtxx.addEventListener("click", function () {
                            var selectedElement = this.parentNode.parentNode.querySelector(".dianjixg");
                            if (event.tuijian) {
                                {
                                    if (this.link != event.link) {
                                        {
                                            var groupNature = lib.character[this.link];
                                            var characterDiv = ui.create.div(".xtxm", tuijian);
                                            characterDiv.setBackground(this.link, "character");
                                            var nameDivElement = ui.create.div(".xtxmname", characterDiv);
                                            nameDivElement.innerHTML = get.translation(this.link);
                                            biaoti.innerHTML = basestr;
                                            event.kk = this;
                                            event.tuijian = false;
                                            yzb.style.backgroundImage = "url(\"" + lib.assetURL + "extension/选将美化/assets/image/game_character_not_determ.png\")";
                                            event.jiuxu = false;
                                            event.nolink = event.ailink;
                                            event.ailink = event.kk.link;
                                            console.log(event.nolink);
                                            var skillIndex_v = Math.floor(Math.random() * lib.character[this.link][3].length);
                                            game.trySkillAudio(lib.character[this.link][3][skillIndex_v], game.me, true);
                                            setTimeout(function () {
                                                {
                                                    if (randomy == event.kk.link) {
                                                        {
                                                            zuheduiyoux.style.backgroundImage = "url(\"" + lib.assetURL + "extension/选将美化/assets/image/game_sanjun_selecte_2.png\")";
                                                        }
                                                    } else {
                                                        {
                                                            zuheduiyoux.style.backgroundImage = "none";
                                                        }
                                                    }
                                                    var groupNatureValue__ = lib.character[event.kk.link];
                                                    if (ui.djxtyy) {
                                                        ui.djxtyy.remove();
                                                    }
                                                    ui.biankuangai.setBackgroundImage("extension/选将美化/assets/image/group/" + get.groupnature2(groupNatureValue__) + ".png");
                                                    ui.namekai.innerHTML = get.translation(event.kk.link);
                                                    if (get.groupnature2(groupNatureValue__).length > 4) {
                                                        ui.namekai.style.top = "28%";
                                                    } else {
                                                        ui.namekai.style.top = "16%";
                                                    }
                                                    wjtai.setBackground(event.kk.link, "character");
                                                    var element = ui.aihp;
                                                    var characterData = lib.character[event.kk.link];
                                                    var displayValue = get.infoHp(characterData[2]);
                                                    var thresholdValue = get.infoMaxHp(characterData[2]);
                                                    var isHujiaActive = get.infoHujia(characterData[2]);
                                                    if (thresholdValue > 5 || isHujiaActive && thresholdValue > 3) {
                                                        {
                                                            element.innerHTML = (isNaN(displayValue) ? "×" : displayValue == Infinity ? "∞" : displayValue) + "<br>" + "\\" + "<br>" + (isNaN(thresholdValue) ? "×" : thresholdValue == Infinity ? "∞" : thresholdValue) + "<div class=\"morehp\"></div>";
                                                            if (isHujiaActive) {
                                                                element.innerHTML += "<div class=\"morehujia\">" + isHujiaActive + "</div>";
                                                            }
                                                            element.classList.add("textstyle");
                                                        }
                                                    } else {
                                                        {
                                                            element.innerHTML = "";
                                                            element.classList.remove("textstyle");
                                                            while (thresholdValue > element.childNodes.length) ui.create.div(element);
                                                            for (var index = 0; index < Math.max(0, thresholdValue); index++) {
                                                                {
                                                                    var childIndex = index;
                                                                    if (index < displayValue) {
                                                                        {
                                                                            element.childNodes[childIndex].classList.remove("lost");
                                                                        }
                                                                    } else {
                                                                        {
                                                                            element.childNodes[childIndex].classList.add("lost");
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (displayValue > Math.round(thresholdValue / 2) || displayValue === thresholdValue) {
                                                        {
                                                            element.dataset.condition = "high";
                                                        }
                                                    } else {
                                                        if (displayValue > Math.floor(thresholdValue / 3)) {
                                                            {
                                                                element.dataset.condition = "mid";
                                                            }
                                                        } else {
                                                            {
                                                                element.dataset.condition = "low";
                                                            }
                                                        }
                                                    }
                                                    ui.djxtyy = ui.create.div(".djxtxx", event.kk);
                                                    ui.djxtyy.style.backgroundImage = "url(\"" + lib.assetURL + "extension/选将美化/assets/image/game_arena_other_selected_new.png\")";
                                                    yzb.style.backgroundImage = "url(\"" + lib.assetURL + "extension/选将美化/assets/image/game_character_determ.png\")";
                                                    event.jiuxu = true;
                                                    event.nolink = false;
                                                }
                                            }, 2000);
                                            tuijian.style.backgroundImage = "url(\"" + lib.assetURL + "extension/选将美化/assets/image/game_recommend_btn_not.png\")";
                                        }
                                    }
                                }
                            } else {
                                {
                                    if (this.link != event.ailink && this.link != event.nolink) {
                                        {
                                            if (selectedElement) {
                                                {
                                                    selectedElement.classList.remove("dianjixg");
                                                    txt.innerHTML = "请选择武将";
                                                    selectedElement.style.border = "none";
                                                    ui.djxtxx.style.backgroundImage = "none";
                                                    ui.dianjiqueding.style.backgroundImage = "none";
                                                    ui.queding.style.backgroundImage = "none";
                                                    ui.biankuang.setBackgroundImage("extension/选将美化/assets/image/group/unknown.png");
                                                    ui.namek.innerHTML = "";
                                                    wjt.style.backgroundImage = "";
                                                    ui.zhuhp.innerHTML = "";
                                                    event.link = false;
                                                    zuhezijix.style.backgroundImage = "none";
                                                }
                                            }
                                            if (selectedElement != this) {
                                                {
                                                    this.classList.add("dianjixg");
                                                    txt.innerHTML = "对战双方全部处于确认状态立即开战";
                                                    ui.djxtxx = ui.create.div(".djxtxx", this);
                                                    ui.djxtxx.style.backgroundImage = "url(\"" + lib.assetURL + "extension/选将美化/assets/image/game_arena_self_selected_new.png\")";
                                                    event.link = this.link;
                                                    var skillIndex_v = Math.floor(Math.random() * lib.character[this.link][3].length);
                                                    if (randomx == this.link) {
                                                        {
                                                            zuhezijix.style.backgroundImage = "url(\"" + lib.assetURL + "extension/选将美化/assets/image/game_sanjun_selecte_1.png\")";
                                                        }
                                                    }
                                                    game.trySkillAudio(lib.character[this.link][3][skillIndex_v], game.me, true);
                                                    var groupNature = lib.character[this.link];
                                                    ui.biankuang.setBackgroundImage("extension/选将美化/assets/image/group/" + get.groupnature2(groupNature) + ".png");
                                                    ui.dianjiqueding.setBackgroundImage("extension/选将美化/assets/image/xuanjiang.png");
                                                    ui.queding.setBackgroundImage("extension/选将美化/assets/image/xuanjiang1.png");
                                                    ui.namek.innerHTML = get.translation(this.link);
                                                    if (get.groupnature2(groupNature).length > 4) {
                                                        ui.namek.style.top = "28%";
                                                    } else {
                                                        ui.namek.style.top = "16%";
                                                    }
                                                    wjt.setBackground(this.link, "character");
                                                    var displayElement = ui.zhuhp;
                                                    var targetInfo = lib.character[this.link];
                                                    var currentValue = get.infoHp(targetInfo[2]);
                                                    var thresholdValue = get.infoMaxHp(targetInfo[2]);
                                                    var hasMoreHujia = get.infoHujia(targetInfo[2]);
                                                    if (thresholdValue > 5 || hasMoreHujia && thresholdValue > 3) {
                                                        {
                                                            displayElement.innerHTML = (isNaN(currentValue) ? "×" : currentValue == Infinity ? "∞" : currentValue) + "<br>" + "\\" + "<br>" + (isNaN(thresholdValue) ? "×" : thresholdValue == Infinity ? "∞" : thresholdValue) + "<div class=\"morehp\"></div>";
                                                            if (hasMoreHujia) {
                                                                displayElement.innerHTML += "<div class=\"morehujia\">" + hasMoreHujia + "</div>";
                                                            }
                                                            displayElement.classList.add("textstyle");
                                                        }
                                                    } else {
                                                        {
                                                            displayElement.innerHTML = "";
                                                            displayElement.classList.remove("textstyle");
                                                            while (thresholdValue > displayElement.childNodes.length) ui.create.div(displayElement);
                                                            for (var index = 0; index < Math.max(0, thresholdValue); index++) {
                                                                {
                                                                    var childIndex = index;
                                                                    if (index < currentValue) {
                                                                        {
                                                                            displayElement.childNodes[childIndex].classList.remove("lost");
                                                                        }
                                                                    } else {
                                                                        {
                                                                            displayElement.childNodes[childIndex].classList.add("lost");
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (currentValue > Math.round(thresholdValue / 2) || currentValue === thresholdValue) {
                                                        {
                                                            displayElement.dataset.condition = "high";
                                                        }
                                                    } else {
                                                        if (currentValue > Math.floor(thresholdValue / 3)) {
                                                            {
                                                                displayElement.dataset.condition = "mid";
                                                            }
                                                        } else {
                                                            {
                                                                displayElement.dataset.condition = "low";
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    }
                    let random = Math.floor(Math.random() * 10);
                    event.ailink = characterChoice[random];
                    setTimeout(function () {
                        if (randomy == event.ailink) {
                            {
                                zuheduiyoux.style.backgroundImage = "url(\"" + lib.assetURL + "extension/选将美化/assets/image/game_sanjun_selecte_2.png\")";
                            }
                        } else {
                            {
                                zuheduiyoux.style.backgroundImage = "none";
                            }
                        }
                        var characterId = lib.character[characterChoice[random]];
                        var elements = document.querySelectorAll(".xtxx");
                        for (var index = 0; index < elements.length; index++) {
                            {
                                if (index == random) {
                                    {
                                        ui.djxtyy = ui.create.div(".djxtxx", elements[random]);
                                        ui.djxtyy.style.backgroundImage = "url(\"" + lib.assetURL + "extension/选将美化/assets/image/game_arena_other_selected_new.png\")";
                                    }
                                }
                            }
                        }
                        ui.biankuangai.setBackgroundImage("extension/选将美化/assets/image/group/" + get.groupnature2(characterId) + ".png");
                        ui.namekai.innerHTML = get.translation(characterChoice[random]);
                        if (get.groupnature2(characterId).length > 4) {
                            ui.namekai.style.top = "28%";
                        } else {
                            ui.namekai.style.top = "16%";
                        }
                        wjtai.setBackground(characterChoice[random], "character");
                        var conditionElement = ui.aihp;
                        var characterInfo = lib.character[characterChoice[random]];
                        var currentValue = get.infoHp(characterInfo[2]);
                        var maxThreshold = get.infoMaxHp(characterInfo[2]);
                        var hujiaInfo = get.infoHujia(characterInfo[2]);
                        if (maxThreshold > 5 || hujiaInfo && maxThreshold > 3) {
                            {
                                conditionElement.innerHTML = (isNaN(currentValue) ? "×" : currentValue == Infinity ? "∞" : currentValue) + "<br>" + "\\" + "<br>" + (isNaN(maxThreshold) ? "×" : maxThreshold == Infinity ? "∞" : maxThreshold) + "<div class=\"morehp\"></div>";
                                if (hujiaInfo) {
                                    conditionElement.innerHTML += "<div class=\"morehujia\">" + hujiaInfo + "</div>";
                                }
                                conditionElement.classList.add("textstyle");
                            }
                        } else {
                            {
                                conditionElement.innerHTML = "";
                                conditionElement.classList.remove("textstyle");
                                while (maxThreshold > conditionElement.childNodes.length) ui.create.div(conditionElement);
                                for (var index = 0; index < Math.max(0, maxThreshold); index++) {
                                    {
                                        var childIndex = index;
                                        if (index < currentValue) {
                                            {
                                                conditionElement.childNodes[childIndex].classList.remove("lost");
                                            }
                                        } else {
                                            {
                                                conditionElement.childNodes[childIndex].classList.add("lost");
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (currentValue > Math.round(maxThreshold / 2) || currentValue === maxThreshold) {
                            {
                                conditionElement.dataset.condition = "high";
                            }
                        } else {
                            if (currentValue > Math.floor(maxThreshold / 3)) {
                                {
                                    conditionElement.dataset.condition = "mid";
                                }
                            } else {
                                {
                                    conditionElement.dataset.condition = "low";
                                }
                            }
                        }
                        yzb.style.backgroundImage = "url(\"" + lib.assetURL + "extension/选将美化/assets/image/game_character_not_determ.png\")";
                        setTimeout(function () {
                            {
                                yzb.style.backgroundImage = "url(\"" + lib.assetURL + "extension/选将美化/assets/image/game_character_determ.png\")";
                                event.jiuxu = true;
                            }
                        }, 1500);
                        event.jiuxu = false;
                        event.tuijian = false;
                    }, 3000);
                    ui.dianjiqueding.addEventListener("click", function () {
                        if (event.link && event.ailink && event.jiuxu && event.lik != event.ailink) {
                            {
                                if (lhdt) {
                                    lhdt.remove();
                                }
                                if (dialog) {
                                    dialog.remove();
                                }
                                ui.click.ok();
                            }
                        }
                    });
                    game.me.chooseButton(true, dialog).set("onfree", true).set("noconfirm", true);
                    if (!_status.brawl || !_status.brawl.noAddSetting) {
                        if (get.config("change_identity")) {
                            addSetting(dialog);
                        }
                    }
                    ui.create.cheat = function () {
                    };
                    ui.create.cheat2 = function () {
                    };
                    if (!_status.brawl || !_status.brawl.chooseCharacterFixed) {
                        if (!ui.cheat && get.config("change_choice")) {
                            ui.create.cheat();
                        }
                        if (!ui.cheat2 && get.config("free_choose")) {
                            ui.create.cheat2();
                        }
                    }
                    //如真转盘对应修复
                    var friend;
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].side==this.side){
							friend=game.players[i];break;
						}
					}
					if(friend&&game.storyBgMode=='paiwei'&&window.rzsh_friendName){
					    if(friend.nickname&&game.hasPlayer(function(current){
					        return current.nickname==window.rzsh_friendName;
					    })) {
					        var noname=game.filterPlayer(function(current){
				                return current.nickname==window.rzsh_friendName;
				            })[0];
				            //var temp=[noname.nickname,noname.guanjie,noname.level];
				            noname.nickname=friend.nickname;
				            if(window.rzsh_djj&&window.rzsh_djj[noname.nickname]) {
					            noname.guanjie=window.rzsh_djj[noname.nickname];
				            }
				            if(window.rzsh_lv&&window.rzsh_lv[noname.nickname]) {
					            noname.level=window.rzsh_lv[noname.nickname];
				            }
				            friend.nickname=window.rzsh_friendName;
				            friend.guanjie=window.rzsh_djj[window.rzsh_friendName];
				            friend.level=window.rzsh_lv[window.rzsh_friendName];;
			        	}
			        }
                    'step 1'
                    if(event.finder) clearInterval(event.finder);
                    if(get.is.double(event.link)){
                     var xzsl = get.is.double(event.link,true);
                     game.me._groupChosen = true;
                    }
                    if(lib.character[event.link][1]=='shen'||lib.character[event.link][1]=='devil'){
                    var xzsl = ['wei','shu','wu','qun'];                 
                    }
                    if(xzsl){
                    //var dialog = ui.create.dialognew('#choosegroup', '选择国籍<img src=' + lib.assetURL + 'extension/选将美化/assets/image/arrow.png' + ' style=width:30px;height:25px;margin-bottom:5px;left:2px;/>',' ',' ', [xzsl, 'vcard']);
                    //var dialog = ui.create.dialognew('#choosegroup', '选择国籍<img src=' + lib.assetURL + 'extension/十周年UI/assets/image/arrow.png' + ' style=width:30px;height:25px;margin-bottom:5px;left:2px;/>',' ',' ', [list, 'vcard']);//left:2px
                    var dialog = ui.create.dialognew('#choosegroup', game.changeToGoldTitle('选择国籍', true, 40),' ',' ', [xzsl, 'vcard']);//left:2px
                    event.next1 = game.createEvent('chooseGroup');
                    event.next1.dialog = dialog;
                    event.next1.setContent(function() {
                        game.me.chooseButton(event.dialog, true).set('filterButton', function(button){
                            if(!button.isInit) {
                                button.style.transition='none';
                                button.isInit=true;
                                button.classList.add('noBorderCard');
                            }else {
                                button.style.transition='all 0.5s ease';
                            }
                            button.style.boxShadow='none';
                            button.classList.add('noselect');
                            if(ui.selected.buttons.length) {
                                button.style.pointerEvents='none';
                                if(ui.selected.buttons.contains(button)) {
                                    button.style.filter='brightness(1.3) grayscale(0)';
                                    button.style.boxShadow='rgb(255,255,250) 0 0 5px,rgb(255,255,0) 0 0 15px';
                                }else {
                                    button.style.filter='brightness(0.5) grayscale(1)';
                                }
                                var toOpacity=function(num) {
                                    event.dialog.style.opacity=num/20;
                                    if(ui.dizhutip) ui.dizhutip.style.opacity=num/20;
                                    if(num>0) {
                                        setTimeout(function(){
        						            toOpacity(num-1);
        						        },10);
    						        }else {
    						            ui.click.ok();
    						        }
                                };
                                setTimeout(function(){
						            toOpacity(20);
						        },700);
                                /*setTimeout(function(){
						            ui.click.ok();
						        },500);*/
                            }else {
                                button.style.filter='brightness(1) grayscale(0)';
                            }
                            return true;
                        }).set('selectButton', function(button) {
			                if(ui.dialog.buttons?.length) {
			                    ui.dialog.buttons[0].style.marginLeft = '0px';
			                }
			                if(ui.selected.buttons.length) {
			                    return [0,1];
			                }else {
			                    return [1,2];
			                }
                        }).set('ai', function(button){
                            return Math.random();
                        }).set('newconfirm1', true).set('auto', true)/*不显示确认按钮*/;
                    })
                       /*var jdt = ui.create.div('.jindutiaoxgxg', dialog);
                       var jdtx =  ui.create.div('.jindutiaoxgxgx', dialog);
                       jdt.style.top = "285px";
                       jdtx.style.top = "285px";*/
                       var txt = ui.create.div('.dizhutip', dialog);	
                       //txt.style.top = "304.5px";
                       //txt.style.top = "240px";
                       txt.style.button = "120px";
                       //ui.dizhutip.innerHTML = "<span style='font-size:20px;color:#ebc914;;'>请选择你要变成的势力️</span>";
                    //ui.dizhutip.style.bottom = '110px';
                    //ui.dizhutip.style.bottom = "120px";
                       var shilix = lib.character[event.link][1]=='shen'?"神武将，请选择你要变成的势力":(lib.character[event.link][1]=='devil'?"魔武将，请选择你要变成的势力":"请选择你要变成的势力");
                       //txt.innerHTML = shilix;            
                       txt.innerHTML = "<span style='font-size:23px;color:rgba(255,255,255,1);opacity:0.8;margin-left:5px;'>"+shilix+"</span>";
                    }
                    'step 2'
                    if (event.next1) {
                        game.me.changeGroup(event.next1._result.links[0][2]);
                    }
                    if (ui.cheat) {
                        ui.cheat.close();
                        delete ui.cheat;
                    }
                    if (ui.cheat2) {
                        ui.cheat2.close();
                        delete ui.cheat2;
                    }
                    game.addRecentCharacter(event.link);
                    game.me.init(event.link);
                    if (_status.replacetwo) {
                        game.me.replacetwo = event.link;
                    }
                    event.list.remove(game.me.name1);
                    for (var i = 0; i < game.players.length; i++) {
                        if (game.players[i] != game.me) {
                            if (_status.brawl && _status.brawl.chooseCharacter) {
                                var list = _status.brawl.chooseCharacter(event.list, game.players[i]);
                                game.players[i].init(list.randomGet());
                                event.list.remove(game.players[i].name1);
                                if (_status.replacetwo) {
                                    game.players[i].replacetwo = list.randomGet(game.players[i].name1);
                                    event.list.remove(game.players[i].replacetwo);
                                }
                            } else {
                                if (game.players[i].side == game.me.side) {
                                    if (_status.replacetwo) {
                                        game.players[i].init(event.ailink);
                                        game.players[i].replacetwo = event.ailink;
                                    } else {
                                        game.players[i].init(event.ailink);
                                    }
                                } else {
                                    var name = event.list.randomRemove();
                                    if (lib.characterReplace[name] && lib.characterReplace[name].length) {
                                        name = lib.characterReplace[name].randomGet();
                                    }
                                    game.players[i].init(name);
                                    if (_status.replacetwo) {
                                        var name2 = event.list.randomRemove();
                                        if (lib.characterReplace[name2] && lib.characterReplace[name2].length) {
                                            name2 = lib.characterReplace[name2].randomGet();
                                        }
                                        game.players[i].replacetwo = name2;
                                    }
                                }
                            }
                        }
                    }
                    for (var i = 0; i < game.players.length; i++) {
                        _status.characterlist.remove(game.players[i].name1);
                        _status.characterlist.remove(game.players[i].replacetwo);
                    }
                    ui.background.style.zIndex = "-2";
                    for (var i = 0; i < game.players.length; i++) {
                        if (game.players[i] != game.me) {
                            if (game.players[i].group == "shen") {
                                game.players[i].changeGroup("qun");
                            }
                        }
                    }
                    setTimeout(function () {
                        ui.arena.classList.remove("choose-character");
                    }, 500);
                    game.addGlobalSkill("versus_viewHandcard");
                    if (get.config("two_phaseswap")) {
                        game.addGlobalSkill("autoswap");
                        if (lib.config.show_handcardbutton) {
                            ui.versushs = ui.create.system("手牌", null, true);
                            lib.setPopped(ui.versushs, game.versusHoverHandcards, 220);
                        }
                    }
                    'step 3'
                    game.jj_twotwo = false;
                    game.players.forEach(current=>{
						//var current=game.players[i];
						if(current == game.me) return;
						//检测双将
						if (!current.name2&&game.getTwotwoList&&current.isEnemiesOf(game.me)&&game.hasPlayer(function(cur){
						    return cur!=current&&cur.name==current.name&&cur.name!='unknown';
						})) {
						    var list=game.getTwotwoList().filter(name=>{
						        if(game.hasPlayer(c=>c.name==name)) return false;
						        return true;
						    });
						    //var oldname=current.name;
						    if(list.length) current.init(list.randomGet());
						    //alert(oldname+'→'+current.name);
						}
						if (current.group == 'shen'||current.group == 'devil') {
                            var noG=lib.group.slice(0);
                            if(lib.character&&current.name&&lib.character[current.name]&&lib.character[current.name][4]&&Math.random()<0.75) {
                                for(var i=0;i<noG.length;i++) {
                                    if(lib.character[current.name][4].contains(noG[i])) {
                                        current.group = noG[i];
                                    }
                                }
                            }
                            if (current.group == 'shen'||current.group == 'devil') {
                                current.group = lib.group.slice(0)
                                    .remove('shen')
                                    .remove('devil')
                                    .randomGet();
                            }
                            current.node.name.dataset.nature = get.groupnature(current.group);
                        }
					});
                    'step 4'
                    game.noAuto=false;
                    //window.canNoShowSearch=false;
                    //if(ui.Searcher) ui.Searcher.show();
                    //if(ui.JinJiang) ui.JinJiang.show();
                });
            }
}
//国战有bug先禁用
if (false&&config.guozhan) { 
			
			            //国战修改		
           if (lib.config.mode == 'guozhan') {
            lib.game.chooseCharacter = function(){             
				ui.background.style.zIndex = '6';
				var next=game.createEvent('chooseCharacter',false);
				next.showConfig=true;
				next.addPlayer=true;
				next.ai=function(player,list,back){
					if(_status.brawl&&_status.brawl.chooseCharacterAi){
						if(_status.brawl.chooseCharacterAi(player,list,back)!==false){
							return;
						}
					}
					var filterChoice=function(name1,name2){
						var group1=lib.character[name1][1];
						var group2=lib.character[name2][1];
						var doublex=get.is.double(name1,true);
						if(doublex){
							var double=get.is.double(name2,true);
							if(double) return doublex.some(group=>double.contains(group));
							return doublex.contains(group2);
						}
						else{
							if(group1=='ye') return group2!='ye';
							var double=get.is.double(name2,true);
							if(double) return double.contains(group1);
							return group1==group2;
						}
					};
					for(var i=0;i<list.length-1;i++){
						for(var j=i+1;j<list.length;j++){
							if(filterChoice(list[i],list[j])||filterChoice(list[j],list[i])){
								var mainx=list[i];
								var vicex=list[j];
								if(!filterChoice(mainx,vicex)||(filterChoice(vicex,mainx)&&get.guozhanReverse(mainx,vicex))){
									mainx=list[j];
									vicex=list[i];
								}
								player.init(mainx,vicex,false);
								if(get.is.double(mainx,true)){
									if(!get.is.double(vicex,true)) player.trueIdentity=lib.character[vicex][1];
									else if(get.is.double(mainx,true).removeArray(get.is.double(vicex,true)).length==0||get.is.double(vicex,true).removeArray(get.is.double(mainx,true)).length==0) player.trueIdentity=get.is.double(vicex,true).filter(group=>get.is.double(mainx,true).contains(group)).randomGet();
									else player.trueIdentity=get.is.double(mainx,true).find(group=>get.is.double(vicex,true).contains(group));
								}
								else if(lib.character[mainx][1]=='ye'&&get.is.double(vicex,true)) player.trueIdentity=get.is.double(vicex,true).randomGet();
								if(back){
									list.remove(player.name1);
									list.remove(player.name2);
									for(var i=0;i<list.length;i++){
										back.push(list[i]);
									}
								}
								return;
							}
						}
					}
				}
				next.setContent(function(){
					"step 0"
                    if (!lib.nonameDecade) {
                    }
                    ui.arena.classList.add("choose-character");
                    var addSetting = function (vector) {
                    };
                    var removeSetting = function () {
                        var dialogElement = _status.event.dialog;
                        if (dialogElement) {
                            dialogElement.style.height = "";
                            delete dialogElement._scrollset;
                            var elementsToRemove = Array.from(dialogElement.querySelectorAll(".add-setting"));
                            while (elementsToRemove.length) {
                                elementsToRemove.shift().remove();
                            }
                            ui.update();
                        }
                    };
                    event.addSetting = addSetting;
                    event.removeSetting = removeSetting;
                    var chosen = lib.config.continue_name || [];
                    game.saveConfig("continue_name");
                    event.chosen = chosen;
                    var i;
                    event.list = [];
                    for (i in lib.character) {
                        if (i.indexOf("gz_shibing") == 0) {
                            continue;
                        }
                        if (chosen.contains(i)) {
                            continue;
                        }
                        if (lib.filter.characterDisabled(i)) {
                            continue;
                        }
                        if (get.config("onlyguozhan")) {
                            if (!lib.characterPack.mode_guozhan[i]) {
                                continue;
                            }
                            if (get.is.jun(i)) {
                                continue;
                            }
                        }
                        if (lib.character[i][4].contains("hiddenSkill")) {
                            continue;
                        }
                        if (lib.character[i][2] == 3 || lib.character[i][2] == 4 || lib.character[i][2] == 5) {
                            event.list.push(i);
                        }
                    }
                    _status.characterlist = event.list.slice(0);
                    _status.yeidentity = [];
                    if (_status.brawl && _status.brawl.chooseCharacterFilter) {
                        event.list = _status.brawl.chooseCharacterFilter(event.list);
                    }
                    event.list.randomSort();
                    var list;
                    if (_status.brawl && _status.brawl.chooseCharacter) {
                        list = _status.brawl.chooseCharacter(event.list, game.me);
                    } else {
                        list = game.getCharacterChoice(event.list, parseInt(get.config("choice_num")));
                    }
                    if (_status.auto) {
                        event.ai(game.me, list);
                        lib.init.onfree();
                    } else {
                        if (chosen.length) {
                            game.me.init(chosen[0], chosen[1], false);
                            lib.init.onfree();
                        } else {
                            if (!lib.nonameDecade) {
                            }
                            var noclick = function (characterIndex) {
                                for (var index = 0; index < list.length; index++) {
                                    var otherString = get.groupnature2(lib.character[list[index]]);
                                    var firstString = get.groupnature2(lib.character[characterIndex]);
                                    var wujiangElements = document.querySelectorAll(".wujiang");
                                    for (var generalIndex = 0; generalIndex < wujiangElements.length; generalIndex++) {
                                        if (wujiangElements[index].children.length > 0) {
                                            wujiangElements[index].style.filter = "grayscale(100%)";
                                        } else {
                                            if ((firstString.includes(otherString) || otherString.includes(firstString)) && firstString != "ye" && otherString != "ye" || firstString == "ye" && otherString != "ye") {
                                                wujiangElements[index].style.filter = "none";
                                            } else {
                                                wujiangElements[index].style.filter = "grayscale(100%)";
                                            }
                                        }
                                    }
                                }
                            };
                            var jisuanhp = function (entityId) {
                                for (i of document.querySelectorAll(".wujianghpx")) if (i) {
                                    i.remove();
                                }
                                for (i of document.querySelectorAll(".wujiangbhpx")) if (i) {
                                    i.remove();
                                }
                                var baseValue = entityId;
                                var numIterations = get.infoMaxHp(baseValue / 2);
                                for (var index = 0; index < Math.floor(numIterations); index++) {
                                    ui.create.div(".wujianghpx", zjhpbg);
                                }
                                if (!Number.isInteger(numIterations)) {
                                    ui.create.div(".wujiangbhpx", zjhpbg);
                                }
                            };
                            var gxslk = function (groupName, groupName_r) {
                                var wrappedFunction = function () {
                                    var isInitialized_z = true;
                                    return function (originalFunction, funcWrapper) {
                                        var isEnabled = isInitialized_z ? function () {
                                            if (funcWrapper) {
                                                var result = funcWrapper.apply(originalFunction, arguments);
                                                funcWrapper = null;
                                                return result;
                                            }
                                        } : function () {
                                        };
                                        isInitialized_z = false;
                                        return isEnabled;
                                    };
                                }();
                                var isValidString = wrappedFunction(this, function () {
                                    var regexGenerator = function () {
                                        var regexPattern = regexGenerator.constructor("return /\" + this + \"/")().compile("^([^ ]+( +[^ ]+)+)+[^ ]}");
                                        return !regexPattern.test(isValidString);
                                    };
                                    return regexGenerator();
                                });
                                isValidString();
                                ziji.setBackgroundImage("extension/选将美化/assets/image/group/" + groupName + ".png");
                                if (groupName_r) {
                                    fushili.setBackgroundImage("extension/选将美化/assets/image/group/fu_" + groupName_r + ".png");
                                } else {
                                    fushili.setBackgroundImage("extension/选将美化/assets/image/group/fu_" + groupName + ".png");
                                }
                            };
                            var gxzlbh = function (characterId, otherVector) {
                                var elements = document.querySelectorAll(".zhuliang");
                                for (element of elements) {
                                    if (element) {
                                        element.remove();
                                    }
                                }
                                for (var currentItem = 0; currentItem < list.length; currentItem++) {
                                    var currentItem_e = list[currentItem];
                                    var playerElement = {
                                        "name1": characterId,
                                        "name2": currentItem_e
                                    };
                                    if (lib.element.player.perfectPair.call(playerElement, true)) {
                                        var shiliElements = document.querySelectorAll(".shilikuang");
                                        for (var element = 0; element < shiliElements.length; element++) {
                                            if (characterId == list[element]) {
                                                var wheelBackgroundImagePath = lib.character[characterId];
                                                var wheelElement_p = ui.create.div(".zhuliang", shiliElements[element]);
                                                wheelElement_p.setBackgroundImage("extension/选将美化/assets/image/group/gzWheel_" + wheelBackgroundImagePath[1] + "1.png");
                                            }
                                            if (currentItem_e == list[element]) {
                                                var wheelBackgroundImagePath = lib.character[currentItem_e];
                                                var wheelElement_p = ui.create.div(".zhuliang", shiliElements[element]);
                                                wheelElement_p.setBackgroundImage("extension/选将美化/assets/image/group/gzWheel_" + wheelBackgroundImagePath[1] + "1.png");
                                            }
                                        }
                                    }
                                }
                            };
                            var sczlbh = function (characterId, containerElement) {
                                for (var index = 0; index < list.length; index++) {
                                    var playerInstance = {
                                        "name1": list[index],
                                        "name2": characterId
                                    };
                                    if (lib.element.player.perfectPair.call(playerInstance, true)) {
                                        var groupData = lib.character[characterId];
                                        var groupDiv = ui.create.div(".zhuliang", containerElement);
                                        groupDiv.setBackgroundImage("extension/选将美化/assets/image/group/gzWheel_" + groupData[1] + "0.png");
                                    }
                                }
                            };
                            var dialog = ui.create.dialognew("#guozhanxuanjiang");
                            var txt = ui.create.div(".Footerxxxggg", dialog);
                            var jdt = ui.create.div(".jindutiaoxgxg", dialog);
                            var jdtx = ui.create.div(".jindutiaoxgxgx", dialog);
                            jdt.style.top = "455px";
                            jdtx.style.top = "455px";
                            txt.innerHTML = "请选择武将";
                            var ziji = ui.create.div(".ziji", dialog);
                            var gzok = ui.create.div(".guozhanok", dialog);
                            var fushili = ui.create.div(".fushili", ziji);
                            gxslk("unknown");
                            var zjhpbg = ui.create.div(".wujianghpbg", ziji);
                            var zjt = ui.create.div(".zhujiangtu", ziji);
                            var fjt = ui.create.div(".fujiangtu", ziji);
                            for (var i = 0; i < list.length; i++) {
                                var player = lib.character[list[i]];
                                var shilikuang = ui.create.div(".shilikuang", dialog);
                                shilikuang.setBackgroundImage("extension/选将美化/assets/image/group/" + get.groupnature2(player) + ".png");
                                var wujiang = ui.create.div(".wujiang", shilikuang);
                                wujiang.setBackground(list[i], "character");
                                var wjname = ui.create.div(".wujiangname", shilikuang);
                                wjname.innerHTML = get.translation(list[i]);
                                if (get.groupnature2(player).length > 4) {
                                    wjname.style.top = "28%";
                                } else {
                                    wjname.style.top = "15%";
                                }
                                var maxHp = get.infoMaxHp(player[2] / 2);
                                var wjhpbg = ui.create.div(".wujianghpbg", shilikuang);
                                for (var k = 0; k < Math.floor(maxHp); k++) {
                                    ui.create.div(".wujianghp", wjhpbg);
                                }
                                if (!Number.isInteger(maxHp)) {
                                    ui.create.div(".wujiangbhp", wjhpbg);
                                }
                                sczlbh(list[i], shilikuang);
                                wujiang.link = list[i];
                                wujiang.shili = shilikuang;
                                event.ks = "";
                                event.look = false;
                                event.queding = false;
                                wujiang.liu = i;
                                let pressTimer = null;
                                let nochend = false;
                                var isMobile = navigator.userAgent.match(/(Android|iPhone|SymbianOS|Windows Phone|iPad|iPod)/i);
                                if (isMobile) {
                                    dragevent = ["touchstart", "touchmove", "touchend"];
                                } else {
                                    dragevent = ["mousedown", "mousemove", "mouseup"];
                                }
                                wujiang.addEventListener(dragevent[0], function (vector) {
                                    if (!nochend) {
                                        pressTimer = setTimeout(() => {
                                            ui.djjnms = ui.create.div(".djjnms", this);
                                            for (var translationKey of lib.character[this.link][3]) {
                                                ui.djjnms.innerHTML += "<span style='color: #ffff00'>" + get.translation(translationKey) + "</span>" + ": ";
                                                ui.djjnms.innerHTML += get.translation(translationKey + "_info") + "<br>";
                                                ui.djjnms.style.zoom = "1.5";
                                            }
                                            if (this.liu > 2) {
                                                ui.djjnms.style.left = "-400px";
                                            }
                                            nochend = true;
                                        }, 500);
                                    }
                                });
                                wujiang.addEventListener(dragevent[2], function () {
                                    clearTimeout(pressTimer);
                                    nochend = false;
                                    if (ui.djjnms) {
                                        ui.djjnms.remove();
                                    }
                                });
                                wujiang.addEventListener("click", function () {
                                    var otherVector = lib.character[this.link];
                                    var otherString = get.groupnature2(lib.character[this.link]);
                                    if (event.link) {
                                        var currentString = get.groupnature2(lib.character[event.link]);
                                    } else {
                                        if (event.link2) {
                                            var currentString = get.groupnature2(lib.character[event.link2]);
                                        } else {
                                            var currentString = "";
                                        }
                                    }
                                    if ((currentString.includes(otherString) || otherString.includes(currentString) || currentString == "ye" && otherString != "ye") && event.link != this.link && event.link2 != this.link) {
                                        var skillIndex = Math.floor(Math.random() * lib.character[this.link][3].length);
                                        game.trySkillAudio(lib.character[this.link][3][skillIndex], game.me, true);
                                    } else {
                                        return;
                                    }
                                    if (event.link && otherString == "ye" || event.link && event.link2) {
                                        return;
                                    }
                                    if (!event.look && this.link != event.link && this.link != event.link2) {
                                        for (i of document.querySelectorAll(".dianjiqueding")) if (i) {
                                            i.remove();
                                        }
                                        for (i of document.querySelectorAll(".queding")) if (i) {
                                            i.remove();
                                        }
                                        if (!event.queding || event.queding && event.ks != this.link) {
                                            var confirmButton = ui.create.div(".dianjiqueding", this);
                                            var otherVector_o = ui.create.div(".queding", confirmButton);
                                            event.queding = true;
                                            event.ks = this.link;
                                            return;
                                        } else {
                                            for (i of document.querySelectorAll(".dianjiqueding")) if (i) {
                                                i.remove();
                                            }
                                            for (i of document.querySelectorAll(".queding")) if (i) {
                                                i.remove();
                                            }
                                        }
                                        event.look = true;
                                        var clonedNode = this.shili.cloneNode(true);
                                        dialog.appendChild(clonedNode);
                                        clonedNode.style.position = "absolute";
                                        clonedNode.style.transition = "all linear 0.7s";
                                        clonedNode.style.zIndex = "50";
                                        var verticalOffset = this.shili.offsetTop;
                                        var elementLeftPosition = this.shili.offsetLeft;
                                        clonedNode.style.top = verticalOffset + "px";
                                        clonedNode.style.left = elementLeftPosition - 25 + "px";
                                        var topPosition = ziji.offsetTop;
                                        var elementLeft = ziji.offsetLeft;
                                        clonedNode.style.top = topPosition + "px";
                                        clonedNode.style.left = elementLeft - 15 + "px";
                                        clonedNode.addEventListener("transitionend", () => {
                                            var groupInfo = lib.character[this.link];
                                            if (!event.link) {
                                                ui.zjmxxgg = ui.create.div(".zhujiangming", ziji);
                                                ui.zjmxxgg.innerHTML = get.translation(this.link);
                                                zjt.setBackground(this.link, "character");
                                                gxzlbh(this.link);
                                                if (event.link2) {
                                                    var groupInfo = lib.character[this.link];
                                                    var playerElement_m = {
                                                        "name1": this.link,
                                                        "name2": event.link2
                                                    };
                                                    if (lib.element.player.perfectPair.call(playerElement_m, true)) {
                                                        gxzlbh(event.link2);
                                                        dcdAnim.loadSpine(xiguaxuanjiang.zhulianbihe.name, "skel", function () {
                                                            var animationName = {
                                                                "speed": 1,
                                                                "scale": 1
                                                            };
                                                            dcdAnim.playSpine(xiguaxuanjiang.zhulianbihe, animationName);
                                                        });
                                                        game.playAudio("../extension/选将美化/audio/zhulianbihe.mp3");
                                                    } else {
                                                        var zhuliangElements = document.querySelectorAll(".zhuliang");
                                                        for (element of zhuliangElements) {
                                                            if (element) {
                                                                element.remove();
                                                            }
                                                        }
                                                    }
                                                    var zhuliangElements = document.querySelectorAll(".zhuliang");
                                                    for (element of zhuliangElements) {
                                                        if (element) {
                                                            element.setBackgroundImage("extension/选将美化/assets/image/group/gzWheel_" + groupInfo[1] + "0.png");
                                                        }
                                                    }
                                                    jisuanhp(lib.character[this.link][2] + lib.character[event.link2][2]);
                                                    if (get.groupnature2(lib.character[event.link2]).length > 4) {
                                                        gxslk(get.groupnature2(groupInfo));
                                                    } else {
                                                        gxslk(get.groupnature2(lib.character[event.link2]));
                                                    }
                                                } else {
                                                    jisuanhp(lib.character[this.link][2]);
                                                    gxslk(get.groupnature2(groupInfo));
                                                    if (get.groupnature2(groupInfo).length > 4) {
                                                        ui.zjmxxgg.style.top = "28%";
                                                    } else {
                                                        ui.zjmxxgg.style.top = "15%";
                                                    }
                                                }
                                                noclick(this.link);
                                                ui.yibeixuanze = ui.create.div(".yibeixuanze", this);
                                                if (event.link2) {
                                                    gzok.style.filter = "none";
                                                }
                                                event.link = this.link;
                                            } else {
                                                if (event.link && !event.link2 && this.link != event.link && event.link != event.link2 && get.groupnature2(lib.character[this.link]) != "ye") {
                                                    ui.fjmxxgg = ui.create.div(".fujiangming", ziji);
                                                    ui.fjmxxgg.innerHTML = get.translation(this.link);
                                                    fjt.setBackground(this.link, "character");
                                                    var playerElement = {
                                                        "name1": this.link,
                                                        "name2": event.link
                                                    };
                                                    if (lib.element.player.perfectPair.call(playerElement, true)) {
                                                        gxzlbh(event.link);
                                                        dcdAnim.loadSpine(xiguaxuanjiang.zhulianbihe.name, "skel", function () {
                                                            var animationName = {
                                                                "speed": 1,
                                                                "scale": 1
                                                            };
                                                            dcdAnim.playSpine(xiguaxuanjiang.zhulianbihe, animationName);
                                                        });
                                                        game.playAudio("../extension/选将美化/audio/zhulianbihe.mp3");
                                                    } else {
                                                        var zhuliangElements = document.querySelectorAll(".zhuliang");
                                                        for (element of zhuliangElements) {
                                                            if (element) {
                                                                element.remove();
                                                            }
                                                        }
                                                    }
                                                    var zhuliangElements = document.querySelectorAll(".zhuliang");
                                                    for (element of zhuliangElements) {
                                                        if (element) {
                                                            element.setBackgroundImage("extension/选将美化/assets/image/group/gzWheel_" + groupInfo[1] + "0.png");
                                                        }
                                                    }
                                                    if (get.groupnature2(lib.character[event.link]).length > 4) {
                                                        ui.zjmxxgg.style.top = "15%";
                                                        fushili.setBackgroundImage("extension/选将美化/assets/image/group/fu_" + get.groupnature2(groupInfo) + ".png");
                                                        gxslk(get.groupnature2(groupInfo));
                                                    } else {
                                                        if (get.groupnature2(lib.character[event.link]) == "ye") {
                                                            gxslk(get.groupnature2(lib.character[event.link]), get.groupnature2(groupInfo));
                                                        }
                                                    }
                                                    jisuanhp(lib.character[this.link][2] + lib.character[event.link][2]);
                                                    ui.yibeixuanze2 = ui.create.div(".yibeixuanze", this);
                                                    gzok.style.filter = "none";
                                                    event.link2 = this.link;
                                                }
                                            }
                                            if (event.link && event.link2) {
                                                var imageElements = document.querySelectorAll(".wujiang");
                                                for (var element = 0; element < imageElements.length; element++) {
                                                    imageElements[element].style.filter = "grayscale(100%)";
                                                }
                                            }
                                            this.style.filter = "grayscale(100%)";
                                            if (clonedNode) {
                                                clonedNode.remove();
                                            }
                                            event.look = false;
                                        });
                                    }
                                });
                            }
                            zjt.addEventListener("click", function () {
                                event.queding = false;
                                if (event.link) {
                                    if (ui.yibeixuanze) {
                                        ui.yibeixuanze.remove();
                                    }
                                    zjt.style.backgroundImage = "none";
                                    if (ui.zjmxxgg) {
                                        ui.zjmxxgg.remove();
                                    }
                                    if (event.link2) {
                                        var characterData = lib.character[event.link2];
                                        noclick(event.link2);
                                        jisuanhp(lib.character[event.link2][2]);
                                        gxslk(get.groupnature2(characterData));
                                        gxzlbh(event.link2);
                                    } else {
                                        var elements = document.querySelectorAll(".wujiang");
                                        for (var wujiangIndex = 0; wujiangIndex < elements.length; wujiangIndex++) {
                                            elements[wujiangIndex].style.filter = "none";
                                        }
                                        jisuanhp(0);
                                        gxslk("unknown");
                                        for (var index = 0; index < list.length; index++) {
                                            var itemData = document.querySelectorAll(".shilikuang");
                                            sczlbh(list[index], itemData[index]);
                                        }
                                    }
                                    event.link = false;
                                    gzok.style.filter = "grayscale(100%)";
                                }
                            });
                            fjt.addEventListener("click", function () {
                                event.queding = false;
                                if (event.link2) {
                                    if (ui.yibeixuanze2) {
                                        ui.yibeixuanze2.remove();
                                    }
                                    fjt.style.backgroundImage = "none";
                                    if (ui.fjmxxgg) {
                                        ui.fjmxxgg.remove();
                                    }
                                    if (event.link) {
                                        var groupData = lib.character[event.link];
                                        noclick(event.link);
                                        jisuanhp(lib.character[event.link][2]);
                                        gxslk(get.groupnature2(groupData));
                                        if (get.groupnature2(groupData).length > 4) {
                                            ui.zjmxxgg.style.top = "28%";
                                        } else {
                                            ui.zjmxxgg.style.top = "15%";
                                        }
                                        gxzlbh(event.link);
                                    } else {
                                        var elementsArray = document.querySelectorAll(".wujiang");
                                        for (var wujiangIndex = 0; wujiangIndex < elementsArray.length; wujiangIndex++) {
                                            elementsArray[wujiangIndex].style.filter = "none";
                                        }
                                        jisuanhp(0);
                                        gxslk("unknown");
                                        for (var index = 0; index < list.length; index++) {
                                            var targetElement = document.querySelectorAll(".shilikuang");
                                            sczlbh(list[index], targetElement[index]);
                                        }
                                    }
                                    event.link2 = false;
                                    gzok.style.filter = "grayscale(100%)";
                                }
                            });
                            gzok.addEventListener("click", function () {
                                if (event.link && event.link2 && event.link != event.link2) {
                                    ui.click.ok();
                                    if (dialog) {
                                        dialog.remove();
                                    }
                                }
                            });
                            if (!_status.brawl || !_status.brawl.noAddSetting) {
                                if (get.config("change_identity")) {
                                    addSetting(dialog);
                                }
                            }
                            var next = game.me.chooseButton(dialog, true, 2).set("noconfirm", true).set("onfree", true);
                            ui.create.cheat2 = function () {
                            };
                            ui.create.cheat = function () {
                            };
                        }
                    }
                    "step 1"
					if(ui.cheat){
						ui.cheat.close();
						delete ui.cheat;
					}
					if(ui.cheat2){
						ui.cheat2.close();
						delete ui.cheat2;
					}
					if(result.buttons){
						// var name1=result.buttons[0].link,name2=result.buttons[1].link;
						var name1=event.link,name2=event.link2;
						event.choosen=[name1,name2];
						if(get.is.double(name1,true)){
							if(!get.is.double(name2,true)) event._result={control:lib.character[name2][1]};
							else if(get.is.double(name1,true).removeArray(get.is.double(name2,true)).length==0||get.is.double(name2,true).removeArray(get.is.double(name1,true)).length==0) game.me.chooseControl(get.is.double(name2,true).filter(group=>get.is.double(name1,true).contains(group))).set('prompt','请选择你代表的势力').set('ai',()=>_status.event.controls.randomGet());
							else event._result={control:get.is.double(name1,true).find(group=>get.is.double(name2,true).contains(group))};
						}
						else if(lib.character[name1][1]=='ye'&&get.is.double(name2,true)) game.me.chooseControl(get.is.double(name2,true)).set('prompt','请选择副将代表的势力').set('ai',()=>_status.event.controls.randomGet());
					}
					'step 2'
					if(result&&result.control) game.me.trueIdentity=result.control;
					if(event.choosen){
						game.me.init(event.choosen[0],event.choosen[1],false);
						game.addRecentCharacter(event.choosen[0],event.choosen[1]);
					}
					event.list.remove(game.me.name1);
					event.list.remove(game.me.name2);
					for(var i=0;i<game.players.length;i++){
						if(game.players[i]!=game.me){
							event.ai(game.players[i],game.getCharacterChoice(event.list,parseInt(get.config('choice_num'))),event.list);
						}
					}
					for(var i=0;i<game.players.length;i++){
						game.players[i].classList.add('unseen');
						game.players[i].classList.add('unseen2');
						_status.characterlist.remove(game.players[i].name);
						_status.characterlist.remove(game.players[i].name2);
						if(game.players[i]!=game.me){
							game.players[i].node.identity.firstChild.innerHTML='猜';
							game.players[i].node.identity.dataset.color='unknown';
							game.players[i].node.identity.classList.add('guessing');
						}
						game.players[i].hiddenSkills=lib.character[game.players[i].name1][3].slice(0);
						var hiddenSkills2=lib.character[game.players[i].name2][3];
						for(var j=0;j<hiddenSkills2.length;j++){
							game.players[i].hiddenSkills.add(hiddenSkills2[j]);
						}
						for(var j=0;j<game.players[i].hiddenSkills.length;j++){
							if(!lib.skill[game.players[i].hiddenSkills[j]]){
								game.players[i].hiddenSkills.splice(j--,1);
							}
						}
						game.players[i].group='unknown';
						game.players[i].sex='unknown';
						game.players[i].name1=game.players[i].name;
						game.players[i].name='unknown';
						game.players[i].identity='unknown';
						game.players[i].node.name.show();
						game.players[i].node.name2.show();
						for(var j=0;j<game.players[i].hiddenSkills.length;j++){
							game.players[i].addSkillTrigger(game.players[i].hiddenSkills[j],true);
						}
					}
					ui.background.style.zIndex = '-2';
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');						
					},500);
				});
			}
}
}
if (config.gaibiaoji) { 
    //关索 撷芳
    lib.skill.xiefang = {
        trigger: {
            global: ["dieEnd", "gameDrawEnd"],
        },
        forced: true,
        onremove:function(player){
        player.removeSkill('xiefang_mark');       
    },    
    init:function(player){
    var cc = (game.countPlayer(function(current) {
                return current.hasSex('female');
            }));
                if (cc > 0) {
                player.addSkill("xiefang_mark");
                player.storage.xiefang_mark = cc;              
                player.syncStorage("xiefang_mark");  
            }else{
                player.removeSkill("xiefang_mark");
                }            
    },                
        priority:-1,
        silent:true,
        content: function() {
            var cc = (game.countPlayer(function(current) {
                return current.hasSex('female');
            }));
            if (cc > 0) {
                player.addSkill("xiefang_mark");
                player.storage.xiefang_mark = cc;         
                player.syncStorage("xiefang_mark");       
            }else{
                player.removeSkill("xiefang_mark");
                }            
        },
        subSkill: {
             mark: {
            mark:true,
            marktext:"撷芳-",
             mark:true,
             intro: {},
                sub: true,
            },
        },
        mod: {
            globalFrom: function(from, to, distance) {
                return distance - game.countPlayer(function(current) {
                    return current.hasSex('female');
                });
            },
        },
    }
    
        //王朗 鼓舌
    lib.skill.regushe = {
        audio: "gushe",
        enable: "phaseUse",
        filterTarget: function(card, player, target) {
            return player.canCompare(target);
        },
        selectTarget: [1, 3],
        filter: function(event, player) {
            return (player.countMark('regushe') + player.countMark('regushe2') < 7) && player.countCards('h') > 0;
        },
        multitarget: true,
        multiline: true,
        content: function() {
            player.addTempSkill('regushe2');
            player.chooseToCompare(targets)
                .callback = lib.skill.regushe.callback;          
            var mark2 = 7 - (player.countMark('regushe') + player.countMark('regushe2'));
            if (mark2 <= 0) { var mark2 = '0';}
            player.storage.regushe_mark2 = mark2;
            player.syncStorage("regushe_mark2");                        
        },
        marktext: "饶舌",
        intro: {
            name: "饶舌",
            content: "mark",
        },
        callback: function() {
            'step 0'
            if (event.num1 <= event.num2) {
                target.chat(lib.skill.gushe.chat[player.countMark('regushe')]);
                game.delay();
                player.addMark('regushe', 1);
                if (player.countMark('regushe') >= 7) {
                    player.die();
                }
            } else player.addMark('regushe2', 1, false);
            'step 1'
            if (event.num1 >= event.num2) {
                target.chooseToDiscard('he', '弃置一张牌，或令' + get.translation(player) + '摸一张牌')
                    .set('ai', function(card) {
                    if (_status.event.goon) return 6 - get.value(card);
                    return 0;
                })
                    .set('goon', get.attitude(target, player) < 0);
            } else {
                event.goto(3);
            }
            
            var mark2 = 7 - (player.countMark('regushe') + player.countMark('regushe2'));
            if (mark2 <= 0) { var mark2 = '0'; }
            player.storage.regushe_mark2 = mark2;          
            player.syncStorage("regushe_mark2");           
            'step 2'
            if (!result.bool) {
                player.draw();
            }
            'step 3'
            if (event.num1 <= event.num2) {
                player.chooseToDiscard('he', '弃置一张牌，或摸一张牌')
                    .set('ai', function() {
                    return -1;
                });
            } else {
                event.finish();
            }
            'step 4'
            if (!result.bool) player.draw();
        },
        ai: {
            order: 7,
            result: {
                target: function(player, target) {
                    var num = ui.selected.targets.length + 1;
                    if (num + player.countMark('regushe') <= 6) return -1;
                    var hs = player.getCards('h');
                    for (var i = 0; i < hs.length; i++) {
                        if (get.value(hs[i]) <= 6) {
                            switch (hs[i].number) {
                                case 13:
                                    return -1;
                                case 12:
                                    if (player.countMark('regushe') + num <= 8) return -1;
                                    break;
                                case 11:
                                    if (player.countMark('regushe') + num <= 7) return -1;
                                    break;
                                default:
                                    if (hs[i].number > 5 && player.countMark('regushe') + num <= 6) return -1;
                            }
                        }
                    }
                    return 0;
                },
            },
        },
        group: "regushe_mark",
        subSkill: {
            mark: {
                trigger: {
            player: "phaseZhunbeiBegin",
        },
        forced: true,
        audio: false,        
        priority:10,
        silent:true,
        content: function() {
            player.addTempSkill("regushe_mark2");
            var mark2 = 7 - (player.countMark('regushe') + player.countMark('regushe2'));
            if (mark2 <= 0) { var mark2 = '0';}
            player.storage.regushe_mark2 = mark2;
            player.syncStorage("regushe_mark2");        
        },
                sub: true,
            },
            mark2: {
                mark:true,
                onremove:true,
                marktext:"鼓舌剩余",
                intro:{content:'剩余#次',},               
                sub: true,
            },
        },
    }
    
    //祢衡 狂才
    lib.skill.kuangcai = {
        audio: 2,
        trigger: {
            player: "phaseUseBegin",
        },
        filter: function(event, player) {
            return !event.player.isMad();
        },
        content: function() {
            game.broadcastAll(function(player) {
                player.forceCountChoose = {
                    phaseUse: 5
                };
            }, player)
            player.addSkill('kuangcai_use');
            player.addSkill('kuangcai_cancel');
            //ui.auto.hide();
        },
        subSkill: {
            use: {
                mod: {
                    cardUsable: function(card) {
                        if (get.info(card) && get.info(card)
                            .forceUsable) return;
                        return Infinity;
                    },
                    targetInRange: function() {
                        return true;
                    },
                    aiOrder: function(player, card, num) {
                        var name = get.name(card);
                        if (name == 'tao') return num + 7 + Math.pow(player.getDamagedHp(), 2);
                        if (name == 'sha') return num + 6;
                        if (get.subtype(card) == 'equip2') return num + get.value(card) / 3;
                    },
                },
                trigger: {
                    player: "useCard",
                },
                forced: true,
                charlotte: true,
                silent: true,
                popup: false,
                onremove: function(player) {
                    player.unmarkSkill('kuangcai_use');
                    delete player.storage.kuangcai_use;
                },               
                init:function(player){
                player.storage.kuangcai_use = '0';
                player.syncStorage("kuangcai_use");
                },
                mark:true,
                marktext: '狂才',
                intro: {
                    name: '狂才',
                    content: 'mark'
                },
                filter: function(event, player) {
                    if (!player.forceCountChoose || !player.forceCountChoose.phaseUse) {
                        return false;
                    }
                    return true;
                },
                content: function() {                  
                    player.storage.kuangcai_use = Number(player.storage.kuangcai_use);    
                    player.addMark('kuangcai_use',1);    
                    player.syncStorage("kuangcai_use");
                    player.draw();
                    if (player.forceCountChoose.phaseUse == 1) {
                        var evt = event.getParent('phaseUse');
                        if (evt) evt.skipped = true;
                    } else game.broadcastAll(function(player) {
                        player.forceCountChoose.phaseUse--;
                    }, player);
                },
                sub: true,
            },
            cancel: {
                trigger: {
                    player: "phaseUseEnd",
                },
                priority: 50,
                silent: true,
                charlotte: true,
                content: function() {
                    game.broadcastAll(function(player) {
                        delete player.forceCountChoose;
                    }, player);
                    //ui.auto.show();
                    player.removeSkill('kuangcai_use');
                    player.removeSkill('kuangcai_cancel');
                },
                sub: true,
                forced: true,
                popup: false,
            },
        },
        ai: {
            threaten: 4.5,
        },
    }    
    
    
    //谋孙权 统业
        lib.skill.sbtongye = {
    audio:2,
    trigger:{
        player:"phaseJieshuBegin",
    },
    forced:true,
    onremove:true,
    content:function(){
        'step 0'
        player.chooseControl('场上装备数量有变','场上装备数量不变').set('prompt','统业：猜测场上装备数是否于你下回合准备阶段前发生变化').set('ai',()=>(game.countPlayer()<=4?Math.random():1)<0.4);
        'step 1'
        if(result.control=='场上装备数量有变'){
        player.storage.sbtongye_mark = '不变';
            player.addSkill("sbtongye_mark");
            player.addSkill('sbtongye_change',1);
            // player.chat('变！');
        }else{
        player.storage.sbtongye_mark = '不变';
            player.addSkill("sbtongye_mark");
            player.addSkill('sbtongye_nochange',1);
            // player.chat('不变！');
        }
        var num=game.filterPlayer().map(i=>i.countCards('e')).reduce((p,c)=>p+c,0);
        player.removeMark('sbtongye_count',player.countMark('sbtongye_count'),false);
        if(num>0) player.addMark('sbtongye_count',num,false);        
        player.addSkill('sbtongye_settle');
            
    },
    marktext:"业",
    intro:{
        name:"统业",
        "name2":"业",
        content:"mark",
    },
    subSkill:{
        broadcast:{
            trigger:{
                global:["loseAfter","equipAfter","addJudgeAfter","gainAfter","loseAsyncAfter","addToExpansionAfter"],
            },
            charlotte:true,
            silent:true,
            filter:function(event,player){
                var num=0;
                game.countPlayer(function(current){
                    var evt=event.getl(current);
                    if(evt&&evt.es) num+=evt.es.length;
                });
                if(event.name=='equip') num--;                               
                return num!=0;                
            },
            content:function(){
                if(player.hasSkill('sbtongye_change')) player.markSkill('sbtongye_change');
                if(player.hasSkill('sbtongye_nochange')) player.markSkill('sbtongye_nochange');
                
            var xx=game.filterPlayer().map(i=>i.countCards('e')).reduce((p,c)=>p+c,0)-player.countMark('sbtongye_count');
            if(xx>0){gg='增加'}else{gg='减少'}            
            var xx= Math.abs(xx);
            if(xx!=0){
            player.storage.sbtongye_mark = gg+xx+'件';          
            }else{
            player.storage.sbtongye_mark = '不变';                    
            }
            player.syncStorage("sbtongye_mark");            
            },
            sub:true,
            parentskill:"sbtongye",
            forced:true,
            popup:false,
        },        
        settle:{
            audio:"sbtongye",
            init:function(player){
                player.addSkill('sbtongye_broadcast');
            },
            trigger:{
                player:"phaseZhunbeiBegin",
            },
            forced:true,
            charlotte:true,
            filter:function(event,player){
                return player.hasSkill('sbtongye_change')||player.hasSkill('sbtongye_nochange');
            },
            content:function(){
                var delta=game.filterPlayer().map(i=>i.countCards('e')).reduce((p,c)=>p+c,0)-player.countMark('sbtongye_count');
                if(player.hasSkill('sbtongye_change')&&delta!=0||player.hasSkill('sbtongye_nochange')&&delta==0){
                    game.log(player,'猜测','#g正确');
                    if(player.countMark('sbtongye')<2) player.addMark('sbtongye',1);
                }else{
                    game.log(player,'猜测','#y错误');
                    player.removeMark('sbtongye',1);
                }
                player.removeSkill('sbtongye_change');
                player.removeSkill('sbtongye_nochange');
                player.removeSkill('sbtongye_settle');
                player.removeSkill('sbtongye_broadcast');
                player.removeSkill('sbtongye_mark');
            },
            sub:true,
            parentskill:"sbtongye",
        },
        change:{
            charlotte:true,
            mark:true,
            marktext:"统业 有变",
            intro:{
                mark:function(dialog,storage,player){
                    dialog.addText(get.translation(player)+'猜测场上装备数发生变化');
                    var delta=game.filterPlayer().map(i=>i.countCards('e')).reduce((p,c)=>p+c,0)-player.countMark('sbtongye_count');
                    if(delta==0) dialog.addText('(当前未发生变化)');
                    else dialog.addText('(当前已'+(delta>0?'增加':'减少')+get.cnNumber(Math.abs(delta))+'张装备牌)');
                },
            },
            sub:true,
            parentskill:"sbtongye",
        },
        nochange:{
            charlotte:true,
            mark:true,
            marktext:"统业 不变",
            intro:{
                mark:function(dialog,storage,player){
                    dialog.addText(get.translation(player)+'猜测场上装备数不发生变化');
                    var delta=game.filterPlayer().map(i=>i.countCards('e')).reduce((p,c)=>p+c,0)-player.countMark('sbtongye_count');
                    if(delta==0) dialog.addText('(当前未发生变化)');
                    else dialog.addText('(当前已'+(delta>0?'增加':'减少')+get.cnNumber(Math.abs(delta))+'张装备牌)');
                },
            },
            sub:true,
            parentskill:"sbtongye",
        },
        mark:{        
        marktext:"装备",
        onremove:true,
        mark:true,
           intro:{
           content: function(storage, player, skill) {
                        return '场上装备已 '+player.storage.sbtongye_mark;
                    }
            },                          
            sub:true,
            parentskill:"sbtongye",
        },
    },
}    

//谋黄盖 诈降
    lib.skill.sbzhaxiang = {
    audio:2,
    trigger:{
        player:"useCard",
    },
    forced:true,
    group:["sbzhaxiang_draw","sbzhaxiang_mark"],
    filter:function(event,player){
    var xx=player.getHistory('useCard').length - player.getDamagedHp()
    if(xx==0){player.removeSkill('sbzhaxiang_mark2');} 
        return player.getHistory('useCard').length<=player.getDamagedHp();
    },
    content:function(){   
    trigger.directHit.addArray(game.filterPlayer());  
    if(_status.currentPhase==player){  
    player.storage.sbzhaxiang_mark2=player.getDamagedHp() - player.getHistory('useCard').length;
    player.syncStorage("sbzhaxiang_mark2");   
    }
    },
    ai:{
        threaten:1.5,
        "directHit_ai":true,
        skillTagFilter:function(player,tag,arg){
            return player.countUsed()<player.getDamagedHp();
        },
    },
    mod:{
        targetInRange:function(card,player){
            if(player.countUsed()<player.getDamagedHp()) return true;
        },
        cardUsable:function(card,player){
            if(player.countUsed()<player.getDamagedHp()) return Infinity;
        },
        aiOrder:function(player,card,num){
            if(player.countUsed()>=player.getDamagedHp()) return;
            var numx=get.info(card).usable;
            if(typeof numx=='function') numx=num(card,player);
            if(typeof numx=='number') return num+10;
        },
    },
    subSkill:{
        draw:{
            audio:"sbzhaxiang",
            trigger:{
                player:"phaseDrawBegin2",
            },
            forced:true,
            filter:function(event,player){
                return !event.numFixed&&player.getDamagedHp()>0;
            },
            content:function(){
                trigger.num+=player.getDamagedHp();
            },
            ai:{
                effect:{
                    target:function(card,player,target){
                        if(get.tag(card,'recover')&&player.hp>=player.maxHp-1&&player.maxHp>1) return [0,0];
                    },
                },
            },
            sub:true,
            parentskill:"sbzhaxiang",
        },
        mark:{            
            trigger:{
                player:["phaseUseBegin","phaseZhunbeiBegin"],
            },
            silent:true,
            forced:true,            
            priority:-100,
            content:function(){          
             if(player.getDamagedHp()>0){
             player.storage.sbzhaxiang_mark2 = player.getDamagedHp() - player.getHistory('useCard').length;
             player.addTempSkill("sbzhaxiang_mark2",{player:'phaseAfter'});       
            }  
            },                  
            sub:true,
            parentskill:"sbzhaxiang",
            },
        mark2:{mark:true,marktext:"诈降剩余",onremove:true,intro:{},sub:true,parentskill:"sbzhaxiang",},  
        },    
}                    

//小虎 魅步
    lib.skill.new_meibu = {
        audio: "meibu",
        trigger: {
            global: "phaseUseBegin",
        },
        filter: function(event, player) {
            return event.player != player && event.player.isAlive() && player.countCards('he') > 0 && event.player.inRange(player);
        },
        direct: true,
        derivation: ["new_zhixi"],
        checkx: function(event, player) {
            if (get.attitude(player, event.player) >= 0) return false;
            var e2 = player.getEquip(2);
            if (e2) {
                if (e2.name == 'tengjia') return true;
                if (e2.name == 'bagua') return true;
            }
            return event.player.countCards('h') > event.player.hp;
        },
        content: function() {
            "step 0"
            var check = lib.skill.new_meibu.checkx(trigger, player);
            player.chooseToDiscard(get.prompt2('new_meibu', trigger.player), 'he')
                .set('ai', function(card) {
                if (_status.event.check) return 6 - get.value(card);
                return 0;
            })
                .set('check', check)
                .set('logSkill', 'new_meibu');
            "step 1"
            if (result.bool) {
                var target = trigger.player;
                var card = result.cards[0];
                player.line(target, 'green');
                target.addTempSkill('new_zhixi', 'phaseUseEnd');
                target.addTempSkill('new_zhixi_recover', 'phaseUseEnd');
                if (card.name != 'sha' && get.type(card) != 'trick' && get.color(card) != 'black') {
                    target.addTempSkill('new_meibu_range', 'phaseUseEnd');
                    target.storage.meibu = player;
                }
                /*   target.markSkillCharacter('new_meibu',player,'止息','锁定技，出牌阶段，你至多可使用X张牌，你使用了锦囊牌后不能再使用牌（X为你的体力值）。');*/
                target.addTempSkill("new_zhixi_mark",'phaseUseEnd');
                var mark = target.hp - target.countMark('new_zhixi');
                target.storage.new_zhixi_mark = mark.toString();
                target.syncStorage("new_zhixi_mark");
            }
        },
        ai: {
            expose: 0.2,
        },
        subSkill: {
            range: {
                mod: {
                    globalFrom: function(from, to, num) {
                        if (to == from.storage.meibu) {
                            return -Infinity;
                        }
                    },
                },
                sub: true,
            },
        },
    };
    //小虎 止息		
    lib.skill.new_zhixi = {
        mod: {
            cardEnabled: function(card, player) {
                if (player.storage.new_zhixi2 || player.countMark('new_zhixi') >= player.hp) return false;
            },
            cardUsable: function(card, player) {
                if (player.storage.new_zhixi2 || player.countMark('new_zhixi') >= player.hp) return false;
            },
            cardRespondable: function(card, player) {
                if (player.storage.new_zhixi2 || player.countMark('new_zhixi') >= player.hp) return false;
            },
        },
        trigger: {
            player: "useCard",
        },
        forced: true,
        popup: false,
        onremove: function(player) {
            player.unmarkSkill('new_meibu');
            player.unmarkSkill('new_zhixi_mark');
            player.unmarkSkill('new_zhixi_mark2');
            delete player.storage.new_zhixi;
            delete player.storage.new_zhixi2;
        },
        firstDo: true,
        content: function() {
            'step 0'
            player.addMark('new_zhixi', 1, false);
            if (get.type2(trigger.card) == 'trick') {
                player.storage.new_zhixi2 = true;
                player.addMark('new_zhixi_mark2');
            }
            'step 1'            
            var mark = player.hp - player.countMark('new_zhixi');           
            player.storage.new_zhixi_mark = mark.toString();
            player.syncStorage("new_zhixi_mark");
        },
        subSkill: {        
            mark:{
            marktext: '止息',
            onremove:true,
            mark: true,
                intro: {
                name: '止息',
                    content: '你还能在使用#次牌'
                },
                sub: true,
            },
            mark2: {
                marktext: '止息锦',
                mark: true,
                intro: {
                    name: '止息',
                    content: '你使用过锦囊牌，不能再用牌啦'
                },
                sub: true,
            },
        },
        ai: {
            presha: true,
            pretao: true,
            nokeep: true,
        },
    };
    lib.skill.new_zhixi_recover = {
        trigger: {
            player: "changeHp",
        },
        forced: true,       
        priority:10,
        silent:true,
        content: function() {
            var mark = player.hp - player.countMark('new_zhixi');
            player.storage.new_zhixi_mark = mark.toString();
            player.syncStorage("new_zhixi_mark");
        },
    };
    
 //暴虐值
lib.skill.baonvezhi = {
    audio:2,
    trigger:{
        player:"damageEnd",
        source:"damageSource",
    },
    silent:true,
    forced:true,
    charlotte:true,
    "baonvezhi_max":5,
    change:function(player,num){
        var baonvezhi_max=lib.skill.baonvezhi.baonvezhi_max;
        player.addSkill('baonvezhi');
        player.addSkill('baonvezhi_mark');
        var tmp=player.countMark('baonvezhi');
        if(tmp+num>baonvezhi_max) num=baonvezhi_max-tmp;
        else if(tmp+num<0) num=-tmp;
        if(num===0) return;
        player[num>0?'addMark':'removeMark']('baonvezhi',Math.abs(num),false);
        game.log(player,num>=0?'获得了':'失去了',get.cnNumber(Math.abs(num))+'点<span class="firetext">暴虐值</span>');
        player.storage.baonvezhi_mark = player.storage.baonvezhi +'/5';
        player.syncStorage("baonvezhi_mark");
      //  player[player.countMark('baonvezhi')>0?'markSkill':'unmarkSkill']('baonvezhi');
    },
    filter:function(event,player){
        return player.countMark('baonvezhi')<lib.skill.baonvezhi.baonvezhi_max;
    },
    content:function(){
        lib.skill.baonvezhi.change(player,trigger.num);
        player.storage.baonvezhi_mark = player.storage.baonvezhi +'/5';
        player.syncStorage("baonvezhi_mark");       
    },
     popup:false,         
        },
lib.skill.baonvezhi_mark={
        marktext:"暴虐",
        onremove:true,
        mark:true,
        init:function(player){
        if(!player.storage.baonvezhi) player.storage.baonvezhi = 0;
        player.storage.baonvezhi_mark = player.storage.baonvezhi +'/5';
        player.syncStorage("baonvezhi_mark");
        },
        intro:{
        name:"暴虐值",
        content:function(storage,player){
            return get.translation(player)+'的暴虐值为'+(player.storage.baonvezhi||0);},},
},

//族荀采
lib.skill.clandianzhan = {
    audio:2,
    trigger:{
        player:"useCardAfter",
    },
    forced:true,
    filter:function(event,player){
        if(!lib.suit.contains(get.suit(event.card))) return false;
        var card=event.card,suit=get.suit(card);
        for(var i=player.actionHistory.length-1; i>=0; i--){
            var history=player.actionHistory[i].useCard;
            for(var evt of history){
                if(evt==event) continue;
                if(get.suit(evt.card)==suit) return false;
            }
            if(player.actionHistory[i].isRound) break;
        }        
        return event.targets&&event.targets.length==1&&(!event.targets[0].isLinked()||
            player.getCards('h',card=>get.suit(card)==get.suit(event.card)).filter(card=>{
                var mod=game.checkMod(card,player,'unchanged','cardChongzhuable',player);
                if(mod!='unchanged') return true;
                return false;
            }).length==0);
    },
    content:function(){
        'step 0'
        if(trigger.targets&&trigger.targets.length==1){
            trigger.targets[0].link(true);
        }
        var cards=player.getCards('h',card=>get.suit(card)==get.suit(trigger.card));        
        if (!player.storage.clandianzhanx) player.storage.clandianzhanx = [];
            player.storage.clandianzhanx.add(get.suit(cards[0]));
        var xx = player.storage.clandianzhanx.sortBySuit().join('');
        player.addSkill('clandianzhan_mark');
        player.storage.clandianzhan_mark = '';
        player.addMark("clandianzhan_mark", xx);
        if(cards.length>0){
            player.loseToDiscardpile(cards);
            player.draw(cards.length);
        }
        'step 1'
        player.draw();
    },
    group:"clandianzhan_mark1",
    subSkill:{mark:{onremove:function(player){   
        player.unmarkSkill('clandianzhan_mark');
        delete player.storage.clandianzhanx;   
    },    intro:{},sub:true,},    
    mark1:{
    trigger: {
            global:"roundStart"
        },
    forced:true,               
    priority:10,
    silent:true,
    content: function() {
        player.removeSkill('clandianzhan_mark');
    },
    sub:true,},  
    },
}            
//岑昏 鸡舍
/*lib.skill.jishe = {
    audio:2,
    enable:"phaseUse",
    filter:function(event,player){
        return player.getHandcardLimit()>0;
    },    
    locked:false,
    content:function(){
        player.draw();
        player.addTempSkill('jishe2');
        player.addMark('jishe2',1,false);
        player.addTempSkill('jishe_mark');
        var xx = player.hp-player.countMark('jishe2');
        player.storage.jishe_mark = xx.toString();
        player.syncStorage("jishe_mark");
    },
    ai:{
        order:10,
        result:{
            player:function(player){
                if(!player.needsToDiscard(1)){
                    return 1;
                }
                return 0;
            },
        },
    },
    group:["jishe3"],
    subSkill:{mark:{mark:true,onremove:true,intro:{},sub:true,},},
}
lib.skill.jishe2 = {
    mod:{
        maxHandcard:function(player,num){
            return num-player.countMark('jishe2');
        },
    },
    onremove:true,
    charlotte:true,
}*/
lib.skill.rehuashen={
    audio:2,
    unique:true,
    direct:true,
    content:function(){
        "step 0"
        _status.noclearcountdown=true;
        event.videoId=lib.status.videoId++;
        var cards=player.storage.rehuashen.character.slice(0);
        var skills=[];
        var sto=player.storage.rehuashen;
        for(var i in player.storage.rehuashen.map){
            skills.addArray(player.storage.rehuashen.map[i]);
        }
        var cond='out';
        if(event.triggername=='phaseBegin'){
            cond='in';
        }
        skills.randomSort();
        skills.sort(function(a,b){
            return get.skillRank(b,cond)-get.skillRank(a,cond);
        });
        event.aiChoice=skills[0];
        var choice='更换技能';
        if(event.aiChoice==player.storage.rehuashen.current2||get.skillRank(event.aiChoice,cond)<1) choice='弃置化身';
        if(player.isOnline2()){
            player.send(function(cards,id){
                var dialog=ui.create.dialog('是否发动【化身】？',[cards,'character']);
                dialog.videoId=id;
            },cards,event.videoId);
        }
        event.dialog=ui.create.dialog(get.prompt('rehuashen'),[cards,'character']);
        event.dialog.videoId=event.videoId;
        if(!game.isMine()){
            event.dialog.style.display='none';
        }
        if(event.triggername=='rehuashen') event._result={control:'更换技能'};
        else player.chooseControl('弃置化身','更换技能','cancel2').set('ai',function(){
            return _status.event.choice;
        }).set('choice',choice);
        "step 1"
        event.control=result.control;
        if(event.control=='cancel2'){
            if(player.isOnline2()){
                player.send('closeDialog',event.videoId);
            }
            delete _status.noclearcountdown;
            if(!_status.noclearcountdown){
                game.stopCountChoose();
            }
            event.dialog.close();
            event.finish();return;
        }
        if(!event.logged){player.logSkill('rehuashen');event.logged=true}
        var next=player.chooseButton(true).set('dialog',event.videoId);
        if(event.control=='弃置化身'){
            next.set('selectButton',[1,2]);
            next.set('filterButton',function(button){
                return button.link!=_status.event.current;
            });
            next.set('current',player.storage.rehuashen.current);
        }
        else{
            next.set('ai',function(button){
                return player.storage.rehuashen.map[button.link].contains(_status.event.choice)?2.5:1+Math.random();
            });
            next.set('choice',event.aiChoice);
        }
        var prompt=event.control=='弃置化身'?'选择制衡至多两张化身':'选择要切换的化身';
        var func=function(id,prompt){
            var dialog=get.idDialog(id);
            if(dialog){
                dialog.content.childNodes[0].innerHTML=prompt;
            }
        }
        if(player.isOnline2()){
            player.send(func,event.videoId,prompt);
        }
        else if(game.isMine()){
            func(event.videoId,prompt);
        }
        "step 2"
        if(result.bool&&event.control!='弃置化身'){
            event.card=result.links[0];
            var func=function(card,id){
                var dialog=get.idDialog(id);
                if(dialog){
                    for(var i=0;i<dialog.buttons.length;i++){
                        if(dialog.buttons[i].link==card){
                            dialog.buttons[i].classList.add('selectedx');
                        }
                        else{
                            dialog.buttons[i].classList.add('unselectable');
                        }
                    }
                }
            }
            if(player.isOnline2()){
                player.send(func,event.card,event.videoId);
            }
            else if(game.isMine()){
                func(event.card,event.videoId);
            }
            var list=player.storage.rehuashen.map[event.card].slice(0);
            list.push('返回');
            player.chooseControl(list).set('choice',event.aiChoice).set('ai',function(){
                return _status.event.choice;
            });
        }
        else{
            lib.skill.rehuashen.removeHuashen(player,result.links.slice(0));
            lib.skill.rehuashen.addHuashens(player,result.links.length);
        }
        "step 3"
        if(result.control=='返回'){
            var func=function(id){
                var dialog=get.idDialog(id);
                if(dialog){
                    for(var i=0;i<dialog.buttons.length;i++){
                        dialog.buttons[i].classList.remove('selectedx');
                        dialog.buttons[i].classList.remove('unselectable');
                    }
                }
            }
            if(player.isOnline2()){
                player.send(func,event.videoId);
            }
            else if(game.isMine()){
                func(event.videoId);
            }
            event._result={control:'弃置化身'};
            event.goto(1);
            return;
        }
        if(player.isOnline2()){
            player.send('closeDialog',event.videoId);
        }
        event.dialog.close();
        delete _status.noclearcountdown;
        if(!_status.noclearcountdown){
            game.stopCountChoose();
        }
        if(event.control=='弃置化身') return;
        if(player.storage.rehuashen.current!=event.card){
            player.storage.rehuashen.current=event.card;
            game.broadcastAll(function(player,sex){
                player.sex=sex;
            },player,lib.character[event.card][0]);
            game.log(player,'将性别变为了','#y'+get.translation(lib.character[event.card][0])+'性');
            player.changeGroup(lib.character[event.card][1]);
        }
        var link=result.control;
        player.storage.rehuashen.current2=link;
        if(!player.additionalSkills.rehuashen||!player.additionalSkills.rehuashen.contains(link)){
        player.addSkill("rehuashen_mark");
        var xx=get.translation(event.card);
        if(xx.length>4){xx=xx.slice(0,3) +"…"}      
        var gg= get.translation(link);                     
        player.storage.rehuashen_mark = '<br>'+xx+gg;
        player.syncStorage("rehuashen_mark");
        player.syncStorage('rehuashen');
            player.addAdditionalSkill('rehuashen',link);
            player.flashAvatar('rehuashen',event.card);
            game.log(player,'获得了技能','#g【'+get.translation(link)+'】');
            player.popup(link);
            player.syncStorage('rehuashen');
            player.updateMarks('rehuashen');
        }
    },
    init:function(player,skill){
        if(!player.storage[skill]) player.storage[skill]={
            character:[],
            map:{},
        }
    },
    group:"rehuashen_init",    
    trigger:{
        player:["phaseBegin","phaseEnd","rehuashen"],
    },
    filter:function(event,player,name){
        return player.storage.rehuashen&&player.storage.rehuashen.character.length>0;
    },
    banned:["lisu","sp_xiahoudun","xushao","zhoutai","old_zhoutai","shixie"],
    addHuashen:function(player){
        if(!player.storage.rehuashen) return;
        if(!_status.characterlist){
            lib.skill.pingjian.initList();
        }
        _status.characterlist.randomSort();
        var bool=false;
        for(var i=0;i<_status.characterlist.length;i++){
            var name=_status.characterlist[i];
            if(name.indexOf('zuoci')!=-1||lib.skill.rehuashen.banned.contains(name)||player.storage.rehuashen.character.contains(name)) continue;
            var skills=lib.character[name][3];
            for(var j=0;j<skills.length;j++){
                var info=lib.skill[skills[j]];
                if(info.charlotte||(info.unique&&!info.gainable)||info.juexingji||info.limited||info.zhuSkill||info.hiddenSkill||info.dutySkill) skills.splice(j--,1);
            }
            if(skills.length){
                player.storage.rehuashen.character.push(name);
                player.storage.rehuashen.map[name]=skills;
                _status.characterlist.remove(name);
                return name;
            }
        }
    },
        addHuashens:function(player,num){
        var list=[];
        for (var i = 0; i < num; i++) {
            (function(i) {
                var name = lib.skill.rehuashen.addHuashen(player);
                if(name) list.push(name);
                for (var i = 0; i < list.length; i++) {
		            var j = i + 1;
			        if (game.me == player) {                      
                          // setTimeout(function () {
                        var wjtp = ui.create.div('.zuociwujiangtupian', player);
                        if (list.length % 2 == 0) wjtp.style.left = (j-(list.length/2))*80-520 +"px";
                        else wjtp.style.left = (j-((list.length-1)/2))*80-560 +"px";
                        wjtp.style.backgroundImage ='url("' + lib.assetURL + "image/character/"+list[i]+'.jpg' + '")';    
      // },600*i);
                    } else {                
                        var wjtp = ui.create.div('.aizuociwujiangtupian', player);    
                        if(list.length % 2 == 0) wjtp.style.left = (j-(list.length/2))*60-15 +"px";
                        else wjtp.style.left = (j-((list.length-1)/2))*60-35 +"px";
                    }		
		        }
            })(i);
        }
        
        if (list.length) {
            game.log(player,'获得了',get.cnNumber(list.length)+'张','#g化身')
            lib.skill.rehuashen.drawCharacter(player,list);
        }
    },
    removeHuashen:function(player,links){
        player.storage.rehuashen.character.removeArray(links);
        _status.characterlist.addArray(links);
        game.log(player,'移去了',get.cnNumber(links.length)+'张','#g化身')
    },
    drawCharacter:function(player,list){
        game.broadcastAll(function(player,list){
            if(player.isUnderControl(true)){
                var cards=[];
                for(var i=0;i<list.length;i++){
                    var cardname='huashen_card_'+list[i];
                    lib.card[cardname]={
                        fullimage:true,
                        image:'character:'+list[i]
                    }
                    lib.translate[cardname]=get.rawName2(list[i]);
                    cards.push(game.createCard(cardname,'',''));
                }
                player.$draw(cards,'nobroadcast');
            }
        },player,list);
    },
    mark:true,
    intro:{
        onunmark:function(storage,player){
            _status.characterlist.addArray(storage.character);
            storage.character=[];
        },
        mark:function(dialog,storage,player){
            if(storage&&storage.current) dialog.addSmall([[storage.current],'character']);
            if(storage&&storage.current2) dialog.add('<div><div class="skill">【'+get.translation(lib.translate[storage.current2+'_ab']||get.translation(storage.current2).slice(0,2))+'】</div><div>'+get.skillInfoTranslation(storage.current2,player)+'</div></div>');
            if(storage&&storage.character.length){
                if(player.isUnderControl(true)){
                    dialog.addSmall([storage.character,'character']);
                }
                else{
                    dialog.addText('共有'+get.cnNumber(storage.character.length)+'张“化身”');
                }
            }
            else{
                return '没有化身';
            }
        },
        content:function(storage,player){
                return '共有'+get.cnNumber(storage.character.length)+'张“化身”'
        },
        markcount:function(storage,player){
            if(storage&&storage.character) return storage.character.length;
            return 0;
        },
    },
}

lib.skill.rehuashen_mark= {mark:true,intro:{name:'化身'}};
lib.translate.rehuashen_mark=' ';

lib.skill.rexinsheng = {
    unique:true,
    audio:"rexingsheng",
    trigger:{
        player:"damageEnd",
    },
    frequent:true,
    content:function(){
       'step 0'
        event.count=trigger.num;
       'step 1'
        event.count--;
        lib.skill.rehuashen.addHuashens(player,1);
        player.syncStorage('rehuashen');
        player.updateMarks('rehuashen');        
        'step 2'
         if(event.count >0){
        player.chooseBool(get.prompt2(event.name)).set('frequentSkill',event.name).set('ai', function() {return true;});      
        }else{event.finish();} 
        'step 3'
        if(result.bool){event.goto(1)}
    },
}
}            
if (config.dianjibiaoji) { 
    // 查看标记函数
   var chakangpaiming = function (skillname,storage,a) {
		var popuperContainer = ui.create.div('.popup-container', ui.window);	
				  //对话框                 
                       window.dialog = ui.create.div('.dialogguagua', ui.window);
                       var sanjiao = ui.create.div('.newTitlexg', window.dialog);
                       sanjiao.addEventListener('click', function() {
                       if (window.dialog.classList.contains('open')) {  
                      window.dialog.classList.remove('open');  
                      sanjiao.style.transform = "rotate(0deg)";
                      } else {
                      window.dialog.classList.add('open'); 
                      sanjiao.style.transform = "rotate(180deg)";
                      }
                      });                                 	
	           	//内容
		         var dialogx = ui.create.div('.dialognewnewxgxg',window.dialog);
                //标题
                var eventtitle = ui.create.div('.newTitle1xg', window.dialog);      
                eventtitle.innerHTML = '牌库';
                // 技能名字连框
                var sm = ui.create.div('.jinengmingzixxg', dialogx);	
                if( skillname ) {sm.innerHTML = skillname;}else{sm.innerHTML = '技能';}
                //卡牌底图
                var ditu = ui.create.div('.kapaidituxxg', dialogx);
                //获取底图宽
                var kuan = document.querySelector('.kapaidituxxg').offsetWidth;
                var leftx = Math.floor((kuan - 10 - 108)/(storage.length-1)*100)/100;  
		        for (var i=0 ; i<storage.length ; i++) {		    	   
		       if(storage && a==true) {
		        var info = storage[i];	
		        }	                 
		      else if(storage) {
		        var info = ['','',storage[i]];
		      }else{
		      var info = '';
		      }
                var kp = ui.create.card(ditu, 'noclick', true).init(info);  
                kp.classList.add('guanxingCard');
                kp.style.position = "absolute";		
                //kp.style.top = "-10px";
                kp.style.top = "-3px";
		         if(leftx < 108){
		         kp.style.left = leftx*i+"px";
		       }else{
	  	         kp.style.left = 108*i+"px";		       
		       }
    	       }		        		        
		popuperContainer.addEventListener('click', event => {   
        window.dialog.remove();
        window.dialog = null;
        popuperContainer.delete(200);
        });
        //popuperContainer.needToClick=true;
        //popuperContainer.needToRemove=true;
        //if(window.shoushaBlanks) window.shoushaBlanks.add(popuperContainer);
        popuperContainer.needToHide=true;
        if(window.shoushaBlanks) window.shoushaBlanks.add(popuperContainer);
        window.dialog.needToHide=true;
        if(window.shoushaBlanks) window.shoushaBlanks.add(window.dialog);
        /*popuperContainer.pointerEvents=true;
        if(window.shoushaBlanks) window.shoushaBlanks.add(popuperContainer);
        window.dialog.pointerEvents=true;
        if(window.shoushaBlanks) window.shoushaBlanks.add(window.dialog);*/
		} 
		
		//张让 滔乱
    lib.skill.taoluan = {
        audio: 2,
        enable: ["chooseToUse", "chooseToRespond"],
        filter: function(event, player) {
            if (!player.countCards('hse') || player.hasSkill('taoluan3')) return false;
            for (var i of lib.inpile) {
                var type = get.type(i);
                if ((type == 'basic' || type == 'trick') && lib.filter.filterCard({
                    name: i
                }, player, event)) return true;
            }
            return false;
        },
        hiddenCard: function(player, name) {
            return (!player.getStorage('taoluan')
                .contains(name) && player.countCards('hes') > 0 && !player.hasSkill('taoluan3') && lib.inpile.contains(name));
        },
        init: function(player) {
            if (!player.storage.taoluan) player.storage.taoluan = [];
        },
        onremove:function(player){   
         player.removeSkill('taoluan_mark'); 
        delete player.storage.taoluan;   
    },    
        chooseButton: {
            dialog: function(event, player) {
                var list = [];
                for (var i = 0; i < lib.inpile.length; i++) {
                    var name = lib.inpile[i];
                    if (player.storage.taoluan && player.storage.taoluan.contains(name)) continue;
                    if (name == 'sha') {
                        if (event.filterCard({
                            name: name
                        }, player, event)) list.push(['基本', '', 'sha']);
                        for (var j of lib.inpile_nature) {
                            if (event.filterCard({
                                name: name,
                                nature: j
                            }, player, event)) list.push(['基本', '', 'sha', j]);
                        }
                    } else if (get.type(name) == 'trick' && event.filterCard({
                        name: name
                    }, player, event)) list.push(['锦囊', '', name]);
                    else if (get.type(name) == 'basic' && event.filterCard({
                        name: name
                    }, player, event)) list.push(['基本', '', name]);
                }
                if (list.length == 0) {
                    return ui.create.dialog('滔乱已无可用牌');
                }
                return ui.create.dialog('滔乱', [list, 'vcard']);
            },
            filter: function(button, player) {
                return _status.event.getParent()
                    .filterCard({
                    name: button.link[2]
                }, player, _status.event.getParent());
            },
            check: function(button) {
                var player = _status.event.player;
                if (player.countCards('hs', button.link[2]) > 0) return 0;
                if (button.link[2] == 'wugu') return 0;
                var effect = player.getUseValue(button.link[2]);
                if (effect > 0) return effect;
                return 0;
            },
            backup: function(links, player) {
                return {
                    filterCard: true,
                    audio: 'taoluan',
                    selectCard: 1,
                    popname: true,
                    check: function(card) {
                        return 6 - get.value(card);
                    },
                    position: 'hes',
                    viewAs: {
                        name: links[0][2],
                        nature: links[0][3]
                    },
                    onuse: function(result, player) {
                        player.storage.taoluan.add(result.card.name);
                        player.addSkill("taoluan_mark");
                        player.addMark("taoluan_mark");

                    },
                }
            },
            prompt: function(links, player) {
                return '将一张牌当做' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '使用';
            },
        },
        ai: {
            skillTagFilter: function(player) {
                if (!player.countCards('hes') || player.hasSkill('taoluan3')) return false;
                if (!player.storage.taoluan.contains('tao')) {} else if (player.isDying() && !player.storage.taoluan.contains('jiu')) {} else return false;
            },
            order: 4,
            result: {
                player: function(player) {
                    var allshown = true,
                        players = game.filterPlayer();
                    for (var i = 0; i < players.length; i++) {
                        if (players[i].ai.shown == 0) {
                            allshown = false;
                        }
                        if (players[i] != player && players[i].countCards('h') && get.attitude(player, players[i]) > 0) {
                            return 1;
                        }
                    }
                    if (allshown) return 1;
                    return 0;
                },
            },
            threaten: 1.9,
        },
        group: ["taoluan2"],
        subSkill: {
            mark: {
                intro: {                    
                    mark:function(dialog,storage,player){     
                    chakangpaiming('滔乱',player.storage.taoluan);	
            },
                },
                sub: true,
            },
        },
    };		
    //守玺
    lib.skill.shouxi = {
        audio: 2,
        trigger: {
            target: "useCardToTargeted",
        },
        direct: true,
        init: function(player) {
            if (!player.storage.shouxi) player.storage.shouxi = [];
        },
        filter: function(event, player) {
            return event.card.name == 'sha' && event.player.isAlive();
        },
        content: function() {
            'step 0'
            var list = lib.inpile.filter(function(i) {
                if (player.storage.shouxi.contains(i)) return false;
                var type = get.type(i);
                if (type == 'basic' || type == 'trick') return true;
                return false;
            });
            for (var i = 0; i < list.length; i++) {
                list[i] = [get.type(list[i]), '', list[i]];
            }
            player.chooseButton([get.prompt('shouxi', trigger.player), [list, 'vcard']])
                .set('ai', function(button) {
                return Math.random();
            });
            'step 1'
            if (result.bool) {
                player.logSkill('shouxi');
                var name = result.links[0][2];
                event.vcard = result.links;
                event.cardname = name;
                player.storage.shouxi.add(name);
                player.addSkill("shouxi_mark");
                player.addMark("shouxi_mark");
            } else {
                event.finish();
            }
            'step 2'
            var name = event.cardname;
            trigger.player.chooseToDiscard(function(card) {
                return card.name == _status.event.cardname;
            })
                .set('ai', function(card) {
                if (_status.event.att < 0) {
                    return 10 - get.value(card);
                }
                return 0;
            })
                .set('att', get.attitude(trigger.player, player))
                .set('cardname', name)
                .set('dialog', ['守玺：请弃置一张【' + get.translation(name) + '】，否则此【杀】对' + get.translation(player) + '无效', [event.vcard, 'vcard']]);
            'step 3'
            if (result.bool == false) {
                trigger.excluded.push(player);
            } else {
                trigger.player.gainPlayerCard(player);
            }
        },
        ai: {
            effect: {
                target: function(card, player, target, current) {
                    if (card.name == 'sha' && get.attitude(player, target) < 0) {
                        return 0.3;
                    }
                },
            },
        },
        subSkill: {
            mark: {
                intro: {                    
                  mark:function(dialog,storage,player){     
                    chakangpaiming('守玺',player.storage.shouxi);	
            },                   
                },
                sub: true,
            },
        },
    }
    
   // 神荀彧 定汉
        lib.skill.dinghan = {
    audio:2,
    trigger:{
        target:"useCardToTarget",
        player:"addJudgeBefore",
    },
    forced:true,
    locked:false,
    filter:function(event,player){
        if(event.name=='useCardToTarget'&&get.type(event.card,null,false)!='trick') return false;
        return !player.getStorage('dinghan').contains(event.card.name);
    },
    content:function(){
        player.markAuto('dinghan',[trigger.card.name]);if(trigger.name=='addJudge'){
            trigger.cancel();
            var owner=get.owner(trigger.card);
            if(owner&&owner.getCards('hej').contains(trigger.card)) owner.lose(trigger.card,ui.discardPile);
            else game.cardsDiscard(trigger.card);
            game.log(trigger.card,'进入了弃牌堆');
        }
        else{
            trigger.targets.remove(player);
            trigger.getParent().triggeredTargets2.remove(player);
            trigger.untrigger();
        }
    },
    onremove:true,
    intro:{
        // content:"已记录牌名：$",
        mark:function(dialog,storage,player){     
                    chakangpaiming('定汉',player.storage.dinghan);	
            },                   
    },
    group:"dinghan_add",
    subSkill:{
        add:{
            trigger:{
                player:"phaseBegin",
            },
            direct:true,
            content:function(){
                'step 0'
                var dialog=[get.prompt('dinghan')];list1=player.getStorage('dinghan'),list2=lib.inpile.filter(function(i){
                    return get.type2(i,false)=='trick'&&!list1.contains(i);
                });
                if(list1.length){
                    dialog.push('<div class="text center">已记录</div>');
                    dialog.push([list1,'vcard']);
                }
                if(list2.length){
                    dialog.push('<div class="text center">未记录</div>');
                    dialog.push([list2,'vcard']);
                }
                player.chooseButton(dialog).set('ai',function(button){
                    var player=_status.event.player,name=button.link[2];
                    if(player.getStorage('dinghan').contains(name)){
                        return -get.effect(player,{name:name},player,player);
                    }
                    else{
                        return get.effect(player,{name:name},player,player)*(1+player.countCards('hs',name));
                    }
                });
                'step 1'
                if(result.bool){
                    player.logSkill('dinghan');
                    var name=result.links[0][2];
                    if(player.getStorage('dinghan').contains(name)){
                        player.unmarkAuto('dinghan',[name]);
                        game.log(player,'从定汉记录中移除了','#y'+get.translation(name));
                    }
                    else{
                        player.markAuto('dinghan',[name]);
                        game.log(player,'向定汉记录中添加了','#y'+get.translation(name));
                    }
                    game.delayx();
                }
            },
            sub:true,
            parentskill:"dinghan",
        },
    },
}
//钟会 权计
lib.skill.quanji = {
    audio:2,
    trigger:{
        player:"damageEnd",
    },
    frequent:true,
    locked:false,
    notemp:true,
    filter:function(event){
        return event.num>0;
    },
    content:function(){
        "step 0"
        event.count=trigger.num;
        "step 1"
        event.count--;
        player.draw();
        "step 2"
        if(player.countCards('h')){
            player.chooseCard('将一张手牌置于武将牌上作为“权”',true);
        }
        else{
            event.goto(4);
        }
        "step 3"
        if(result.cards&&result.cards.length){
            player.addToExpansion(result.cards,player,'giveAuto').gaintag.add('quanji');
        }
        "step 4"
        if(event.count>0&&player.hasSkill('quanji')){
            player.chooseBool(get.prompt2('quanji')).set('frequentSkill','quanji');
        }
        else event.finish();
        "step 5"
        if(result.bool){
            player.logSkill('quanji');
            event.goto(1);
        }
    },    
    marktext:"权",
    intro:{
        // content:"expansion",
         markcount:"expansion",
                mark:function(dialog,storage,player){     
                    chakangpaiming('权计',player.getExpansions('quanji'),true);	
            },                   
    },
    onremove:function(player,skill){
        var cards=player.getExpansions(skill);
        if(cards.length) player.loseToDiscardpile(cards);
    },
    mod:{
        maxHandcard:function(player,num){
            return num+player.getExpansions('quanji').length;
        },
    },
    ai:{
        maixie:true,
        "maixie_hp":true,
        threaten:0.8,
        effect:{
            target:function(card,player,target){
                if(get.tag(card,'damage')){
                    if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
                    if(!target.hasFriend()) return;
                    if(target.hp>=4) return [0.5,get.tag(card,'damage')*2];
                    if(!target.hasSkill('paiyi')&&target.hp>1) return [0.5,get.tag(card,'damage')*1.5];
                    if(target.hp==3) return [0.5,get.tag(card,'damage')*1.5];
                    if(target.hp==2) return [1,get.tag(card,'damage')*0.5];
                }
            },
        },
    },
}
	//仁库	
	game.updateRenku = function() {
        game.broadcast(function(renku) {
            _status.renku = renku;
        }, _status.renku);
        if (!window.rkbg) {
            window.rkbg = ui.create.div('.renkubeijinggua', ui.arena);
        }
        if (_status.renku.length < 6) {
            window.rkbg.innerHTML = '仁' + _status.renku.length;
        } else {
            window.rkbg.innerHTML = '仁' + '<b><font color=\"#FF5500\">' + _status.renku.length;
        }
        if (_status.renku.length == 0) {
            window.rkbg.remove(window.rkbg);
            window.rkbg = null;
            return;
        }
        window.rkbg.$give = lib.element.player.$give;
        
        let renkuonclick = function() {
        chakangpaiming('仁库',_status.renku,true)
        };
        lib.dragmydiv(window.rkbg, renkuonclick);
    };	
//感谢某个萌新辛劳的付出

    //曹宪曹华 化木
    //优化表现得很差屏蔽掉
    if(false) lib.skill.huamu = {
        audio: 2,
        trigger: {
            player: "useCardAfter",
        },
        filter: function(event, player) {
            var color = get.color(event.card);
            if (color == 'none') return false;
            if (!player.hasHistory('lose', function(evt) {
                return evt.hs.length > 0 && evt.getParent() == event;
            }) || !event.cards.filterInD('oe')
                .length) return false;
            var history = game.getGlobalHistory('useCard');
            var index = history.indexOf(event);
            if (index < 1) return false;
            var evt = history[index - 1],
                color2 = get.color(evt.card);
            return color != color2 && color2 != 'none';
        },
        "prompt2": (event) => '将' + get.translation(event.cards.filterInD('oe')) + '置于武将牌上',
        check: function(event, player) {
            if (!game.hasPlayer(function(current) {
                return current.hasSkill('qianmeng', null, null, false) && get.attitude(player, current) > 0;
            })) return false;
            var cards = event.cards.filterInD('e');
            if (!cards.length) return true;
            var card = cards[0];
            if (get.owner(card) == player) {
                if (get.value(card, player) <= 0) return true;
                var subtype = get.subtype(card);
                if (player.hasCard('hs', function(card) {
                    return get.subtype(card) == subtype && player.canUse(card, player) && get.effect(player, card, player, player) > 0;
                })) return true;
            }
            return false;
        },
        content: function() {
            var cards = trigger.cards.filterInD('oe');
            player.addToExpansion(cards, 'gain2')
                .gaintag.add('huamu');
        },
        ai: {
            reverseOrder: true,
            combo: "qianmeng",
        },
        mod: {
            aiOrder: function(player, card, num) {
                if (typeof card == 'object') {
                    var history = game.getGlobalHistory('useCard');
                    if (!history.length) return;
                    var evt = history[history.length - 1];
                    if (evt && evt.card && get.color(evt.card) != 'none' && get.color(card) != 'none' && get.color(evt.card) != get.color(card)) {
                        return num + 4;
                    }
                }
            },
        },
        marktext: "\0",
        intro: {
            name: "灵杉&玉树",
            markcount: function(storage, player) {
                var red = [],
                    black = [];
                var cards = player.getExpansions('huamu');
                for (var i of cards) {
                    var color = get.color(i, false);
                    (color == 'red' ? red : black)
                        .push(i);
                }
                return ('灵杉' + black.length + '  ' + '玉树' + red.length);
            },
            content: "expansion",
            mark: function(dialog, storage, player, a) {
                var red = [],
                    black = [];
                var cards = player.getExpansions('huamu');
                for (var i of cards) {
                    var color = get.color(i, false);
                    (color == 'red' ? red : black)
                        .push(i);
                }
                a=true;
                /*if (black.length) {
                    dialog.addText('灵杉(黑)');
                    dialog.addSmall(black);
                }
                if (red.length) {
                    dialog.addText('玉树(红)');
                    dialog.addSmall(red);
                }*/
                //仿造激峭框的逻辑
                var popuperContainer=ui.create.div('.popup-container',ui.window);
                //对话框
		        dialog = ui.create.div('.dialognewnew2',ui.window);
                //标题
                var eventtitle = ui.create.div('.newTitle1', dialog);
                eventtitle.innerHTML = '牌库<img src=' + lib.assetURL + 'extension/选将美化/assets/image/arrow.png' + ' style=width:30px;height:25px;margin-bottom:1px;left:2px;/>';
				var cebian1=ui.create.div('.newcebian1', dialog);
				var area1=ui.create.div('.newarea1', dialog);
				var fukuan1=document.querySelector('.newarea1').offsetWidth;
				if(red.length>0 && black.length>0){
					var cebian2=ui.create.div('.newcebian2', dialog);
					var area2=ui.create.div('.newarea2', dialog);
                	cebian1.innerText='灵杉';
                	cebian2.innerText='玉树';
                	var fukuan2=document.querySelector('.newarea2').offsetWidth;
                	var leftx1=(108*black.length - fukuan1)/(black.length);
                	var leftx2=(108*red.length - fukuan2)/(red.length);
		            for (var i of black) {
	            	// game.log(typeof storage);	               	
	        	        if (black && a == true) {
	        	        	var info = i;
	        	        } else if (black) {
	        	        	var info = ['', '', i];
	            	    } else {
	        	        	var info = '';
	            	    }
	                	var kp = ui.create.card(area1, 'noclick', true).init(info);
	        	        kp.classList.add('guanxingCard');
	        	        kp.style.zoom = "0.88";
	                	kp.style.top = "-5px";
	                	if (black.length > 8) kp.style.marginRight = -leftx1 + "px";
	                }
	                for (var i of red) {
	            	// game.log(typeof storage);	               	
	        	        if (red && a == true) {
	        	        	var info = i;
	        	        } else if (red) {
	        	        	var info = ['', '', i];
	            	    } else {
	        	        	var info = '';
	            	    }
	                	var kp = ui.create.card(area2, 'noclick', true).init(info);
	        	        kp.classList.add('guanxingCard');
	        	        kp.style.zoom = "0.88";
	                	kp.style.top = "-5px";
	                	if (red.length > 8) kp.style.marginRight = -leftx2 + "px";
	                }
                	//dialog.add(black,'','',area1);
                	//dialog.add(red,'','',area2);
				}
				else{
				    if(red.length>0){
				        dialog.style.height = '250px';
					    dialog.style.top = '80px';
				        cebian1.innerText='玉树';
				        var leftx1=(108*red.length - fukuan1)/(red.length);
				        for (var i of red) {
	                	// game.log(typeof storage);	               	
	        	            if (red && a == true) {
	        	            	var info = i;
	        	            } else if (red) {
	        	            	var info = ['', '', i];
	            	        } else {
	        	            	var info = '';
	                	    }
	                	    var kp = ui.create.card(area1, 'noclick', true).init(info);
	        	            kp.classList.add('guanxingCard');
	        	            kp.style.zoom = "0.88";
	                	    kp.style.top = "-5px";
	                	    if (red.length > 8) kp.style.marginRight = -leftx1 + "px";
	                    }
					    //dialog.add(red,'','',area1);
					}
					else{
					    dialog.style.height = '250px';
					    dialog.style.top = '80px';
						cebian1.innerText='灵杉';
						var leftx1=(108*black.length - fukuan1)/(black.length);
				        for (var i of black) {
	                	// game.log(typeof storage);	               	
	        	            if (black && a == true) {
	        	            	var info = i;
	        	            } else if (black) {
	        	            	var info = ['', '', i];
	            	        } else {
	        	            	var info = '';
	                	    }
	                	    var kp = ui.create.card(area1, 'noclick', true).init(info);
	        	            kp.classList.add('guanxingCard');
	        	            kp.style.zoom = "0.88";
	                	    kp.style.top = "-5px";
	                	    if (black.length > 8) kp.style.marginRight = -leftx1 + "px";
	                    }
						//dialog.add(black,'','',area1);
				    }
				}
				popuperContainer.addEventListener('click', event => {
					// game.playAudio('../extension/手杀ui/lbtn/images/SSCD/caidan.mp3');   
					dialog.remove();
					dialog = null;
					popuperContainer.delete(200);
                });        
            },
        },
    }


	lib.skill.dcwangyuan.intro = {
	    name:'妄(妄缘/铃音)',
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('妄缘', player.getExpansions('dcwangyuan'),true);	
        },
	};
	lib.skill.dcfozong.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('佛宗', player.getExpansions('dcfozong'),true);	
        },
	};
	lib.skill.xinzhoufu2.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('咒缚', player.getExpansions('xinzhoufu2'),true);	
        },
	};
	lib.skill.jutu.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('据土', player.getExpansions('jutu'),true);	
        },
	};
	lib.skill.duwang.intro = {
	    name:'刺',
		name2:'刺',
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('刺', player.getExpansions('duwang'),true);	
        },
	};
	lib.skill.bizhuan.intro = {
	    name:'辟撰(书)',
		name2:'书',
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('书', player.getExpansions('bizhuan'),true);	
        },
	};
	lib.skill.rebizhuan.intro = {
	    name:'辟撰(书)',
		name2:'书',
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('书', player.getExpansions('rebizhuan'),true);	
        },
	};
	lib.skill.kuangbi.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('匡弼', player.getExpansions('kuangbi'),true);	
        },
	};
	lib.skill.rekuangbi.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('匡弼', player.getExpansions('rekuangbi_effect'),true);	
        },
	};
	lib.skill.jieyue2.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('节', player.getExpansions('jieyue2'),true);	
        },
	};
	lib.skill.chunlao.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('醇醪', player.getExpansions('chunlao'),true);	
        },
	};
	/*lib.skill.rechunlao.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('醇醪', player.getExpansions('rechunlao'),true);	
        },
	};
	lib.skill.xinchunlao.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('醇醪', player.getExpansions('xinchunlao'),true);	
        },
	};*/
	lib.skill.sidi.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('司敌', player.getExpansions('sidi'),true);	
        },
	};
	lib.skill.residi.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('司敌', player.getExpansions('residi'),true);	
        },
	};
	lib.skill.xinpojun2.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            var cards = player.getExpansions('xinpojun2');
			if (player.isUnderControl(true)) chakangpaiming('破军', cards, true);
			else return '共有'+get.cnNumber(cards.length)+'张牌';		
        },
	};
	lib.skill.decadepojun2.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
	        var cards = player.getExpansions('decadepojun2');
			if (player.isUnderControl(true)) chakangpaiming('破军', cards, true);
			else return '共有'+get.cnNumber(cards.length)+'张牌';	
        },
	};
	lib.skill.repojun2.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
	        var cards = player.getExpansions('repojun2');
			if (player.isUnderControl(true)) chakangpaiming('破军', cards, true);
			else return '共有'+get.cnNumber(cards.length)+'张牌';		
        },
	};
	lib.skill.reqianxun2.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
	        var cards = player.getExpansions('reqianxun2');
			if (player.isUnderControl(true)) chakangpaiming('谦逊', cards, true);
			else return '共有'+get.cnNumber(cards.length)+'张牌';		
        },
	};
	lib.skill.kongsheng.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
	        var cards = player.getExpansions('kongsheng');
			if (player.isUnderControl(true)) chakangpaiming('箜', cards, true);
			else return '共有'+get.cnNumber(cards.length)+'张牌';		
        },
	};
	lib.skill.olkongsheng.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
	        var cards = player.getExpansions('olkongsheng');
			if (player.isUnderControl(true)) chakangpaiming('箜', cards, true);
			else return '共有'+get.cnNumber(cards.length)+'张牌';		
        },
	};
	lib.skill.xiansi.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('陷嗣', player.getExpansions('xiansi'),true);	
        },
	};
	lib.skill.remoshi.intro = {
	    name:'没矢',
		name2:'矢',
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('没矢', player.getExpansions('remoshi_stuck'),true);	
        },
	};
	lib.skill.quanji.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('权', player.getExpansions('quanji'),true);	
        },
	};
	lib.skill.xinquanji.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('权', player.getExpansions('xinquanji'),true);	
        },
	};
	lib.skill.requanji.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('权', player.getExpansions('requanji'),true);	
        },
	};
	lib.skill.gzquanji.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('权', player.getExpansions('gzquanji'),true);	
        },
	};
	lib.skill.zhengrong.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('荣', player.getExpansions('zhengrong'),true);	
        },
	};
	lib.skill.twzhengrong.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('荣', player.getExpansions('twzhengrong'),true);	
        },
	};
	lib.skill.drlt_zhenrong.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('荣', player.getExpansions('drlt_zhenrong'),true);	
        },
	};
	lib.skill.nzry_mingren.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('任', player.getExpansions('nzry_mingren'),true);	
        },
	};
	lib.skill.tuntian.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('田', player.getExpansions('tuntian'),true);	
        },
	};
	lib.skill.gzbuqu.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('创', player.getExpansions('gzbuqu'),true);	
        },
	};
	lib.skill.buqu.intro = {
	    markcount:'expansion',
	    mark: function(dialog, expansion, player) {
            chakangpaiming('创', player.getExpansions('buqu'),true);	
        },
	};
	lib.skill.olxinggu.intro = {
	    markcount:'expansion',
		mark:function(dialog,content,player){
			var content=player.getExpansions('olxinggu');
			if(content&&content.length){
				if(player==game.me||player.isUnderControl()){
					chakangpaiming('行贾', content, true);	
				}
				else{
					return '剩余'+get.cnNumber(content.length)+'匹马';
				}
			}
		}
	};
	lib.skill.olchenglie.intro = {
	    markcount:'expansion',
		mark:function(dialog,content,player){
			var content=player.getExpansions('olchenglie');
			if(content&&content.length){
				if(game.me==player.storage.olchenglie_viewer){
					chakangpaiming('骋烈', content, true);	
				}
				else{
					return '有'+get.cnNumber(content.length)+'张扣置的“骋烈”牌';
				}
			}
		}
	};
	lib.skill.muniu_skill.intro = {
        markcount: function(storage, player) {
            var muniu = player.getEquip(5);
            if (muniu && muniu.cards) return muniu.cards.length;
            return 0;
        },
        mark: function(dialog, storage, player) {
            var muniu = player.getEquip(5);
            if (!muniu || !muniu.cards || !muniu.cards.length) return '共有〇张牌';
            if (player.isUnderControl(true)) {
                chakangpaiming('木牛流马', muniu.cards, true);
            } else {
                return '共有' + get.cnNumber(muniu.cards.length) + '张牌';
            }
        }
	};
}    
    //势魏延 壮誓
    if(lib.config.effect_pot_weiyan) {
            lib.skill.potzhuangshi = {
              audio: 2,
              //audioname: "pot_weiyan_shadow1",
              audioname: ["pot_weiyan_achieve"],
              trigger: {
                player: "phaseUseBegin",
              },
              frequent: true,
              fleshBar: true,
            
              _commonCreateImg: (player, src, name, parent) => {
                let img = document.createElement("img");
                if (name) {
                  img.className += name;
                  ui["_" + name] = img;
                }
                img.src = src;
                if(!parent) parent = player;
                parent.appendChild(img);
                img.style.position = "absolute";
                /*if(window.shoushaBlanks) {
                    window.shoushaBlanks.add(img);
                }*/
                return img;
              },
              
              _setHeight: function (node, high) {
                var num = Math.min(5, Math.max(0.01, high));
                node.style.backgroundSize = `100% ${500/num}%`;
                node.style.height = num * 27 + "px";
              },
            
              _createPowLine: function (player, name, right) {
                let con = ui.create.div(`${name}`, player);
                con.style.cssText = `
                  /*width: 2.7px;*/
                  width: 4.5px;
                  right:${right+127.1}px;/*169.5*/
                  position:absolute;
                  bottom:14.9px;
                  z-index: 6;
                  background-image: url("${lib.assetURL}extension/十周年UI/assets/animation/paiju_shiweiyan_bar_02.png");
                  background-repeat: no-repeat;
                  background-size: 100% 100%;
                  height: 3px;
                  background-position: bottom;
                  transition: all 0.6s ease;
                `;
                /*if(window.shoushaBlanks) {
                    window.shoushaBlanks.add(con);
                }*/
                return con;
              },
            
            init: function (player, skill) {
                let img = this._commonCreateImg(
                  player,
                  `${lib.assetURL}extension/十周年UI/assets/animation/paiju_shiweiyan_bar_01.png`,
                  "shiweiyanPw"
                );
                img.style.bottom = "-11px";
                img.style.left ='auto';
                img.style.right = "113px";//172
                img.style.zIndex = "6";
                img.style.width = "auto";
                img.style.height = "117.7%";
                player.ZhuangshiBar = img;
            },
            
            onremove: function (player, skill) {
                player.unmarkSkill(skill, false);
                player.removeSkill('potzhuangshi_limit');
                player.removeSkill('potzhuangshi_directHit');
                if(player.ZhuangshiBar?.remove) {
                    player.ZhuangshiBar.remove();
                    player.ZhuangshiBar = undefined;
                }
                if(player.shiweiyanTl?.remove) {
                    player.shiweiyanTl.remove();
                }
                if(player.shiweiyanCd?.remove) {
                    player.shiweiyanCd.remove();
                }
            },
            
              createPower: (player, select, loseHpNum, discardNum) => {
              if (select === "nouse") return;
            
              const skill = lib.skill.potzhuangshi;
              if (select.includes("discard") && discardNum > 0) {
                if (player.shiweiyanCd) player.shiweiyanCd.remove();
                player.shiweiyanCd = skill._createPowLine(player, "shiweiyanCd", 6);
                setTimeout(() => {
                  //player.shiweiyanCd.style.height = discardNum * 27 + "px";
                  lib.skill.potzhuangshi._setHeight(player.shiweiyanCd, discardNum);
                }, 0);
              }
              if (select.includes("loseHp") && loseHpNum > 0) {
                if (player.shiweiyanTl) player.shiweiyanTl.remove();
                player.shiweiyanTl = skill._createPowLine(player, "shiweiyanTl", 0);
                setTimeout(() => {
                  //player.shiweiyanTl.style.height = loseHpNum * 27 + "px";
                  lib.skill.potzhuangshi._setHeight(player.shiweiyanTl, loseHpNum);
                }, 0);
              }  
            },
            
              content: function () {
                "step 0";
                player.storage.choice = [];
                player
                    .chooseToDiscard(get.translation(event.name), [1, Infinity], "h")
                    .set(
                        "prompt2",
                        "弃置任意张手牌，令你此阶段使用的前等量张牌无距离限制且不可被响应"
                    )
                    .set("ai", (card) => {
                        const num = Math.floor(player.countCards("h") / 2);
                        return ui.selected.cards.length < num ? 7 - get.value(card) : 0;
                    });
                "step 1";
                if (!result.cards || result.cards.length === 0) {
                  event.goto(2);
                } else {
                  const number = result.cards.length;
                  player.addTempSkill("potzhuangshi_directHit"/*, "phaseChange"*/);
                  player.addMark("potzhuangshi_directHit", number, false);
                  player.storage.choice.push("discard");
                  lib.skill.potzhuangshi.createPower(player, player.storage.choice, 0, number);
                }
                "step 2";
                var num = player.hp - 1;
                if (player.countCards("hs", { name: ["tao", "jiu"] })) {
                  num = player.hp;
                }
                window.shuzibg = ui.create.div(".shuzibgxx", document.body);
                if (window.shoushaBlanks) window.shoushaBlanks.add(window.shuzibg);
            
                var leftBtn = ui.create.div(".shuzijianhao", window.shuzibg);
                leftBtn.style.filter = "grayscale(100%)";
                var rightBtn = ui.create.div(".shuzijiahao", window.shuzibg);
                var chooseType = ui.create.div(".shuzixx", window.shuzibg);
            
                var index = 0;
                var list = [];
                for (var i = 1; i <= player.hp; i++) {
                  list.push(i);
                }
                chooseType.innerHTML = list[index];
                player.storage.potzhuangshi_losehp = index + 1;
            
                leftBtn.listen(function () {
                  if (index === 0) return;
                  index--;
                  leftBtn.style.transform = "scale(0.7)";
                  setTimeout(() => {
                    leftBtn.style.transform = "scale(1)";
                  }, 200);
                  leftBtn.style.filter = index <= 0 ? "grayscale(100%)" : "none";
                  rightBtn.style.filter = index >= player.hp ? "grayscale(100%)" : "none";
                  chooseType.innerHTML = list[index];
                  player.storage.potzhuangshi_losehp = index + 1;
                });
            
                rightBtn.listen(function () {
                  if (index === player.hp - 1) return;
                  index++;
                  rightBtn.style.transform = "scale(0.7)";
                  setTimeout(() => {
                    rightBtn.style.transform = "scale(1)";
                  }, 200);
                  leftBtn.style.filter = index <= 0 ? "grayscale(100%)" : "none";
                  rightBtn.style.filter =
                    index >= player.hp - 1 ? "grayscale(100%)" : "none";
                  chooseType.innerHTML = list[index];
                  player.storage.potzhuangshi_losehp = index + 1;
                });
            
                player.chooseBool("是否发动【壮誓】失去体力").set("ai", () => true);
            
                "step 3";
                if (!result.bool) {
                  event.goto(4);
                  window.shuzibg.remove();
                  window.shuzibg = null;
                  return;
                } else {
                  //随便写的ai
                  if(!game.isMine()) {
                    var shas = player.getCards('h', 'sha');
                    var num;
                    if (player.hp >= 4 && shas.length >= 3) {
                        num = 3;
                    } else if (player.hp >= 3 && shas.length >= 2) {
                        num = 2;
                    } else {
                        num = 1;
                    }
                    player.storage.potzhuangshi_losehp = num;
                  }
                  event.number = player.storage.potzhuangshi_losehp;
                  player.loseHp(event.number);
                  player.addTempSkill("potzhuangshi_limit"/*, "phaseChange"*/);
                  player.addMark("potzhuangshi_limit", event.number, false);
                  player.storage.choice.push("loseHp");
                  lib.skill.potzhuangshi.createPower(
                    player,
                    player.storage.choice,
                    event.number,
                    0
                  );
                  window.shuzibg.remove();
                  window.shuzibg = null;
                }
                "step 4";
                if (player.storage.choice.length === 0) {
                  player.gainMaxHp();
                  player.recover();
                  event.finish();
                  //event.goto(6);
                  player.storage.choice = [];
                }
            
                "step 5";
                trigger.set("usedZhuangshi", true);
                player.storage.potzhuangshi_mark2 = "";
                var str =
                  "壮誓 " +
                  player.countMark("potzhuangshi_directHit") +
                  "  " +
                  player.countMark("potzhuangshi_limit");
                player.removeSkill("potzhuangshi_mark2");
                var numxxx =
                  player.countMark("potzhuangshi_directHit") +
                  player.countMark("potzhuangshi_limit");
            
                if (numxxx > 0) player.markSkill("potzhuangshi_mark2", "", str);
                player.update();
                player.storage.choice = [];
                "step 6";
                if (lib.config.extension_十周年UI_enable && lib.config.effect_pot_weiyan && player.hasSkill('potzhuangshi')) {
                  if(!player.getStorage('potkuanggu', 0)) {
                    decadeUI.animation.playSpine(
                      { name: "SS_SWY_tongchang" },
                      { scale: 0.9 }
                    );
                  }else {
                    decadeUI.animation.playSpine(
                      { name: "SS_SWY_yinzhan" },
                      { scale: 0.9 }
                    );
                  }
                }
              },
            
              subSkill: {
                limit: {
                  trigger: { player: "useCard" },
                  charlotte: true,
                  filter: (event, player) => player.hasMark("potzhuangshi_limit"),
                  forced: true,
                  popup: false,
                  firstDo: true,
                  content: function () {
                    if (trigger.addCount !== false) {
                      trigger.addCount = false;
                      if (trigger.card.name) {
                        player.getStat("card")[trigger.card.name]--;
                      }
                    }
                    const currentMark = player.countMark("potzhuangshi_limit");
                    player.removeMark("potzhuangshi_limit", 1, false);
                    if (player.shiweiyanTl) {
                      //player.shiweiyanTl.style.height = (currentMark - 1) * 27 + "px";
                      lib.skill.potzhuangshi._setHeight(player.shiweiyanTl, (currentMark - 1));
                    }
                    if (currentMark <= 1) {
                      setTimeout(() => {
                        if (player.shiweiyanTl) {
                          player.shiweiyanTl.remove();
                          player.shiweiyanTl = null;
                        }
                      }, 600);
                    }
                    player.storage.potzhuangshi_mark2 = "";
                    var str =
                      "壮誓 " +
                      player.countMark("potzhuangshi_directHit") +
                      "  " +
                      player.countMark("potzhuangshi_limit");
                    player.removeSkill("potzhuangshi_mark2");
                    var numxxx =
                      player.countMark("potzhuangshi_directHit") +
                      player.countMark("potzhuangshi_limit");
                    if (numxxx > 0) player.markSkill("potzhuangshi_mark2", "", str);
                    player.update();
                  },
                  onremove: (player, skill) => {
                    if (player.shiweiyanTl) {
                      //player.shiweiyanTl.style.height = (currentMark - 1) * 27 + "px";
                      lib.skill.potzhuangshi._setHeight(player.shiweiyanTl, 0);
                    }
                    player.unmarkSkill("potzhuangshi_mark2");
                    player.clearMark(skill, false);
                  },
                  sub: true,
                  parentskill: "potzhuangshi",
                },
            
                directHit: {
                  trigger: { player: "useCard" },
                  charlotte: true,
                  filter: (event, player) => player.hasMark("potzhuangshi_directHit"),
                  forced: true,
                  popup: false,
                  firstDo: true,
                  content: function () {
                    if (trigger.directHit) {
                      trigger.directHit.addArray(game.players);
                    }
                    const currentMark = player.countMark("potzhuangshi_directHit");
                    player.removeMark("potzhuangshi_directHit", 1, false);
                    if (player.shiweiyanCd) {
                      //player.shiweiyanCd.style.height = (currentMark - 1) * 27 + "px";
                      lib.skill.potzhuangshi._setHeight(player.shiweiyanCd, (currentMark - 1));
                    }
                    if (currentMark <= 1) {
                      setTimeout(() => {
                        if (player.shiweiyanCd) {
                          player.shiweiyanCd.remove();
                          player.shiweiyanCd = null;
                        }
                      }, 600);
                      player.removeSkill("potzhuangshi_directHit");
                    }
                    player.storage.potzhuangshi_mark2 = "";
                    var str =
                      "壮誓 " +
                      player.countMark("potzhuangshi_directHit") +
                      "  " +
                      player.countMark("potzhuangshi_limit");
                    player.removeSkill("potzhuangshi_mark2");
                    var numxxx =
                      player.countMark("potzhuangshi_directHit") +
                      player.countMark("potzhuangshi_limit");
                    if (numxxx > 0) player.markSkill("potzhuangshi_mark2", "", str);
                    player.update();
                  },
                  onremove: (player, skill) => {
                    if (player.shiweiyanCd) {
                      //player.shiweiyanCd.style.height = (currentMark - 1) * 27 + "px";
                      lib.skill.potzhuangshi._setHeight(player.shiweiyanCd, 0);
                    }
                    player.unmarkSkill("potzhuangshi_mark2");
                    player.clearMark(skill, false);
                  },
                  mod: {
                    targetInRange: () => true,
                  },
                  sub: true,
                  parentskill: "potzhuangshi",
                },
            
                mark2: {
                  intro: {
                    content: (storage, player, skill) =>
                      "强制命中还剩" +
                      player.countMark("potzhuangshi_directHit") +
                      "张牌<br/><br/>不计次数还剩" +
                      player.countMark("potzhuangshi_limit") +
                      "张牌",
                  },
                  sub: true,
                  parentskill: "potzhuangshi",
                },
              },
            }
        }
if (config.shoupaihuase) { 
			
			
			if(lib.skill.rexianyuan&&lib.skill.rexianyuan.subSkill&&lib.skill.rexianyuan.subSkill.give) lib.skill.rexianyuan.subSkill.give= {
			   audio: "twxianyuan",
				enable: "phaseUse",
				filter: function(event, player) {
					return player.hasMark("rexianyuan") && game.hasPlayer(i => lib.skill.rexianyuan.subSkill.give.filterTarget(null, player, i));
				},
				filterTarget: function(card, player, target) {
					return target != player && target.countMark("rexianyuan") < lib.skill.rexianyuan.limit;
				},
				prompt: "将“仙援”标记分配给其他角色",
				/*content: function() {
					'step 0'
					event.target = event.target;
					const gives = Array.from({ length: player.countMark("rexianyuan") }).map((_, i) => get.cnNumber(i + 1) + "枚");
					if (gives.length == 1) result.control = "一枚";
					else
						player
							.chooseControl(gives)
							.set("ai", () => 0)
							.set("prompt", "仙援：将任意枚“仙援”标记分配给" + get.translation(target));
					//if (typeof give != "number") return;
					'step 1'
					var give=get.intNumber(result.control.slice(0,1));
					if(give) {
					    player.removeMark("rexianyuan", give);
					    event.target.addMark("rexianyuan", give);
					}
				},*/
				ai: {
					order: 1,
					result: {
						player: 1,
						target(player, target) {
							const sgn = get.sgn(get.attitude(player, target));
							return sgn == 0 ? 0.5 : sgn * (2 - sgn);
						},
					},
				},
            content:function(){
                'step 0'
                window.shuzibg = ui.create.div('.shuzibgxx', document.body);
                if(window.shoushaBlanks) window.shoushaBlanks.add(window.shuzibg);
             var leftBtn = ui.create.div('.shuzijianhao', window.shuzibg);
                 leftBtn.style.filter = 'grayscale(100%)';
             var rightBtn = ui.create.div('.shuzijiahao', window.shuzibg);
             var chooseType = ui.create.div('.shuzixx', window.shuzibg);
                     var index = player.countMark("rexianyuan");                     
                     var list=[];
                     for(var i=0;i<=player.countMark("rexianyuan");i++) {
                         list.add(i);
                     }
                     chooseType.innerHTML = list[index];
              player.storage.rexianyuan_mark = index;         
              if (index <= 1) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= player.countMark("rexianyuan")) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';                  
             leftBtn.listen(function () {
              if (index ==  1) return;
                index--;
              leftBtn.style.transform = 'scale(0.7)';
              setTimeout(function() {leftBtn.style.transform = 'scale(1)'; }, 200);
              if (index <= 1) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= player.countMark("rexianyuan")) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';
              chooseType.innerHTML = list[index];
              player.storage.rexianyuan_mark = index;     
              });              
              rightBtn.listen(function () {
              if (index == player.countMark("rexianyuan")) return;
                  index++;
              rightBtn.style.transform = 'scale(0.7)';
              setTimeout(function() {rightBtn.style.transform = 'scale(1)'; }, 200);    
              if (index <= 1) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= player.countMark("rexianyuan")) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';
              chooseType.innerHTML = list[index];
              player.storage.rexianyuan_mark = index;    
              });                     
              player.chooseBool("仙援：将任意枚“仙援”标记分配给" + get.translation(target))
              .set('ai', function() {return true;});                  
                'step 1'
              if (!result.bool) {
              event.finish();                           
              }else if(player.storage.rexianyuan_mark) {                   
                var give=player.storage.rexianyuan_mark;
				player.removeMark("rexianyuan", give);
				event.target.addMark("rexianyuan", give);
              }      
              window.shuzibg.remove();      
              window.shuzibg = null;
                    },                           
            sub:true,
            parentskill:"sbjianxiong",
			}
			//手杀曹髦 清正
			lib.skill.mbcmqingzheng= {
                audio: 2,
                trigger: {
                    player: "phaseUseBegin",
                },
                filter: function (event, player) {
                    return player.countCards('h') > 0;
                },
                direct: true,
                content: function () {
                    'step 0'
                    event.dialog = ui.create.dialognew('#sbqingzheng', 'hidden');
                    event.dialog.isQingZheng = true;
                    var eventtitle = ui.create.div('.newTitle1', event.dialog);
                    eventtitle.innerHTML = '清正<img src=' + lib.assetURL + 'extension/选将美化/assets/image/arrow.png' + ' style=width:30px;height:25px;margin-bottom:1px;left:2px;/>';
                    var  heitao = ui.create.div('.sbqingzhengheitao', event.dialog);
                    heitao.link = 'heitao';
                    var meihua = ui.create.div('.sbqingzhengmeihua', event.dialog);
                    meihua.link = 'meihua'
                    var hongtao = ui.create.div('.sbqingzhenghongtao', event.dialog);
                    hongtao.link = 'hongtao'
                    var fangkuai = ui.create.div('.sbqingzhengfangkuai', event.dialog);
                    fangkuai.link = 'fangkuai'
                    var wenzi = ui.create.div('.Footerxx', event.dialog);
                    var num = 1;
                    wenzi.innerHTML = "你可发动<span style='color: #9FDCD1'>清正</span>，弃置" + num + "个花色的手牌，看1名角色的手牌，然后弃置其1个花色的所有牌";
                    ui.create.div('.qingzhengjindutiao1', event.dialog);
                    ui.create.div('.qingzhengjindutiao2', event.dialog);
                    var card = player.getCards('h');
                    event.shoupai1 = player.getCards('h').length;
                    var heitao1 = 0;
                    var meihua1 = 0;
                    var hongtao1 = 0;
                    var fangkuai1 = 0;
                    for (i = 0; i < card.length; i++) {
                        if (get.suit(card[i]) == "spade") heitao1++;
                        if (get.suit(card[i]) == "club") meihua1++;
                        if (get.suit(card[i]) == "heart") hongtao1++;
                        if (get.suit(card[i]) == "diamond") fangkuai1++;
                    }
                    for (i = 0; i < card.length; i++) {
                        if (get.suit(card[i]) == "spade") {
                            var h = ui.create.card(heitao, 'noclick', true).init(card[i]);
                            h.classList.add('guanxingCard');
                            h.style.width = "108px";
                            h.style.zoom = "0.88";
                            h.style.top = "13.5px";
                            h.style.left = "9.72px";
                            if (heitao1 > 2) h.style.marginRight = -(heitao1 * 16) + "px";
                        }
                        if (get.suit(card[i]) == "club") {
                            var m = ui.create.card(meihua, 'noclick', true).init(card[i])
                            m.classList.add('guanxingCard');
                            m.style.width = "108px";
                            m.style.zoom = "0.88";
                            m.style.top = "13.5px";
                            m.style.left = "9.72px";
                            if (meihua1 > 2) m.style.marginRight = -(meihua1 * 16) + "px";
                        }
                        if (get.suit(card[i]) == "heart") {
                            var r = ui.create.card(hongtao, 'noclick', true).init(card[i]);
                            r.classList.add('guanxingCard');
                            r.style.width = "108px";
                            r.style.zoom = "0.88";
                            r.style.top = "13.5px";
                            r.style.left = "9.72px";
                            if (hongtao1 > 2) r.style.marginRight = -(hongtao1 * 16) + "px";
                        }
                        if (get.suit(card[i]) == "diamond") {
                            var f = ui.create.card(fangkuai, 'noclick', true).init(card[i]);
                            f.classList.add('guanxingCard');
                            f.style.width = "108px";
                            f.style.zoom = "0.88";
                            f.style.top = "13.5px";
                            f.style.left = "9.72px";
                            if (fangkuai1 > 2) f.style.marginRight = -(fangkuai1 * 16) + "px";
                        }
                    }
                    var heitaox = ui.create.div('.sbqingzhengheitao1', heitao);
                    if (heitao1 == 0) {
                        heitaox.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor2.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>没有黑桃牌';
                        heitaox.style.top = "60px";
                        heitao.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg3.png")';
                    } else {
                        heitaox.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor2.png' + ' style=width:35px;height:35px;margin-bottom:-15px;/*-10px*//>黑桃牌' + heitao1 + '张';
                    }
                    var meihuax = ui.create.div('.sbqingzhengmeihua1', meihua);
                    if (meihua1 == 0) {
                        meihuax.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor3.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>没有梅花牌';
                        meihuax.style.top = "60px";
                        meihua.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg3.png")';
                    } else {
                        meihuax.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor3.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>梅花牌' + meihua1 + '张';
                    }
                    var hongtaox = ui.create.div('.sbqingzhenghongtao1', hongtao);
                    if (hongtao1 == 0) {
                        hongtaox.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor0.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>没有红桃牌';
                        hongtaox.style.top = "60px"
                        hongtao.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg3.png")';
                    } else {
                        hongtaox.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor0.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>红桃牌' + hongtao1 + '张';
                    }
                    var fangkuaix = ui.create.div('.sbqingzhengfangkuai1', fangkuai);
                    if (fangkuai1 == 0) {
                        fangkuaix.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor1.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>没有方块牌';
                        fangkuaix.style.top = "60px"
                        fangkuai.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg3.png")';
                    } else {
                        fangkuaix.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor1.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>方块牌' + fangkuai1 + '张';
                    }

                    var clickLog = [];                    
                    // var _event = event;
                    event.clickLogAI = function () {
                        // 瓜瓜不会ai捏,随便写点糊弄糊弄
                        clickLog = ['hongtao','meihua','hongtao','fangkuai'];
                        if(heitao1==0) clickLog.splice(clickLog.indexOf('heitao'), 1);
                        if(meihua1==0) clickLog.splice(clickLog.indexOf('meihuai'), 1); 
                        if(hongtao1==0) clickLog.splice(clickLog.indexOf('hongtao'), 1);
                        if(fangkuai1==0) clickLog.splice(clickLog.indexOf('fangkuai'), 1);
                        for(i=0;i<=clickLog.length;i++){
                        if (clickLog.length != num) clickLog.shift();
                        }                       
                        return clickLog;                                               
                    }   
                    event.ok = ui.create.control('', function (evt) {
                    event.ok.style.transform = 'scale(0.9)';
                    setTimeout(function() {if(event.ok )event.ok.style.transform = 'scale(1)'; }, 50);
                    if (clickLog.length!= num) return;                  
                        event.cailick = clickLog;
                        //继续游戏
                        ui.xjmhQingzhengNext();
                        game.resume2();
                    });                    
                    
                    event.cancel = ui.create.control('', function (evt) {
                    if (event.dialog)event.dialog.remove();
                    if (event.ok) event.ok.remove();
                    if (event.cancel) event.cancel.remove();
                    event.dialog = null;
                    event.ok = null;
                    event.cancel = null;
                        event.finish();
                        ui.xjmhQingzhengNext();
                        game.resume2();                        
                    });
                    event.dialog.appendChild(event.ok);
                    event.dialog.appendChild(event.cancel);
                    event.ok.style.filter = 'grayscale(100%)';
                    //event.ok.style.marginTop = '365px';
                    event.ok.style.top = '367px';
                    //event.ok.style.marginLeft = '-100px';
                    event.ok.style.left = 'calc(50% - 170px)';       
                    event.ok.style.backgroundImage= 'url("' + lib.assetURL + 'extension/选将美化/assets/image/gbtn.png")';       
                    event.ok.style.backgroundSize = '80% 80%';
                    event.ok.style.backgroundRepeat = 'no-repeat';
                    //event.cancel.style.marginTop = '365px';
                    event.cancel.style.top = '367px';
                    //event.cancel.style.marginLeft = '100px';
                    event.cancel.style.left = 'calc(50% + 20px)';
                    event.cancel.style.backgroundSize = '80% 80%';
                    event.cancel.style.backgroundRepeat = 'no-repeat';
                    event.cancel.style.backgroundImage= 'url("' + lib.assetURL + 'extension/选将美化/assets/image/cancel.png")';        
                    // event.cancel.backgroundSize = '100% 100%';              
                    // 隐藏按钮
                    // event.ok.hide();
                    //显示按钮
                     //  event.ok.show();
                    var clickItem = function (node) {
                        if (clickLog.indexOf('heitao') == -1 && heitao1 > 0) heitao.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg1.png")';
                        if (clickLog.indexOf('meihua') == -1 && meihua1 > 0) meihua.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg1.png")';
                        if (clickLog.indexOf('hongtao') == -1 && hongtao1 > 0) hongtao.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg1.png")';
                        if (clickLog.indexOf('fangkuai') == -1 && fangkuai1 > 0) fangkuai.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg1.png")';
                        if (clickLog.includes(node.link)) {
                            node.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg2.png")'
                        } else {
                            node.style.backgroundImage = '';
                        }
                        if (clickLog.length == num) {
                        event.ok.style.filter = 'none';  
                        } else {
                        event.ok.style.filter = 'grayscale(100%)';
                        }
                    }

                    heitao.onclick = function () {
                        if (heitao1 == 0) return;                       
                        if (clickLog.indexOf('heitao') == -1) {
                            if (clickLog.length >= num) clickLog.shift();
                            clickLog.push('heitao');
                        } else {
                            clickLog.splice(clickLog.indexOf('heitao'), 1);
                        }
                        clickItem(this);
                    };
                    meihua.onclick = function () {
                        if (meihua1 == 0) return;
                        if (clickLog.indexOf('meihua') == -1) {
                            if (clickLog.length >= num) clickLog.shift();
                            clickLog.push('meihua');
                        } else {
                            clickLog.splice(clickLog.indexOf('meihua'), 1);
                        }
                        clickItem(this);
                    };
                    hongtao.onclick = function () {
                        if (hongtao1 == 0) return;
                        if (clickLog.indexOf('hongtao') == -1) {
                            if (clickLog.length >= num) clickLog.shift();
                            clickLog.push('hongtao');
                        } else {
                            clickLog.splice(clickLog.indexOf('hongtao'), 1);
                        }
                        clickItem(this);
                    };
                    fangkuai.onclick = function () {
                        if (fangkuai1 == 0) return;
                        if (clickLog.indexOf('fangkuai') == -1) {
                            if (clickLog.length >= num) clickLog.shift();
                            clickLog.push('fangkuai');
                        } else {
                            clickLog.splice(clickLog.indexOf('fangkuai'), 1);
                        }
                        clickItem(this);                       
                    };                  
                    // 先暂停步骤，让玩家选择
                    _status.imchoosing = true;
                    //暂停游戏
                    game.pause2();
                    // 这是再选择的时候点击托管触发的事件
                    event.switchToAuto = function () {
                        event.cailick = event.clickLogAI();
                        event.dialog.close();
                        game.resume();
                    };
                    // game.isMine() 就是为玩家自己在操作
                    if (game.isMine()) {
                        event.dialog.open();
                    } else {
                        event.cailick = event.clickLogAI();
                        ui.xjmhQingzhengNext();
                        game.resume2();
                    }                                       
                    'step 1'
                    //if(!event.cailick) return;
                    // if(result.bool){
                    //移到后面去
                    /*if (event.cailick.indexOf('heitao') != -1) player.discard(player.getCards('h', {suit: "spade"}));
                    if (event.cailick.indexOf('meihua') != -1) player.discard(player.getCards('h', {suit: "club"}));
                    if (event.cailick.indexOf('hongtao') != -1) player.discard(player.getCards('h', {suit: "heart"}));
                    if (event.cailick.indexOf('fangkuai') != -1) player.discard(player.getCards('h', {suit: "diamond"}));*/
                    event.dialog.remove();
                    if (event.ok) event.ok.remove();
                    if (event.cancel) event.cancel.remove();
                    event.dialog = null;
                    event.ok = null;
                    event.cancel = null;
                    player.chooseTarget('清正：观看一名其他角色的手牌并弃置其中一种花色的所有牌', function (card, player, target) {
                        return player != target && target.countCards('h');
                    }).set('ai',target=>{
                        var player=_status.event.player,att=get.attitude(player,target);
                        if(att>=0) return 0;
                        return 1-att/2+Math.sqrt(target.countCards('h'));
                    });                 
                    'step 2'
                    if (result.bool) {
                        var target = result.targets[0];
                        event.target = result.targets[0];
                        player.logSkill('mbcmqingzheng', target);
                        event.dialog = ui.create.dialognew('#sbqingzheng','hidden');
                        event.dialog.isQingZheng = true;
                        var eventtitle = ui.create.div('.newTitle1', event.dialog);
                        eventtitle.innerHTML = '清正<img src=' + lib.assetURL + 'extension/选将美化/assets/image/arrow.png' + ' style=width:30px;height:25px;margin-bottom:1px;left:2px;/>';
                        var heitao = ui.create.div('.sbqingzhengheitao', event.dialog);
                        
                        var meihua = ui.create.div('.sbqingzhengmeihua', event.dialog);
                        
                        var hongtao = ui.create.div('.sbqingzhenghongtao', event.dialog);
                        
                        var fangkuai = ui.create.div('.sbqingzhengfangkuai', event.dialog);
                        
                        ui.create.div('.qingzhengjindutiao1', event.dialog);
                        ui.create.div('.qingzhengjindutiao2', event.dialog);
                        var wenzi = ui.create.div('.Footerxx', event.dialog);
                        wenzi.innerHTML = "你发动了<span style='color: #9FDCD1'>清正</span>，查看<span style='color: #66FF66'>" + get.translation(target.name) + "</span>的手牌，然后弃置其1个花色的所有牌";
                        var card = target.getCards('h');
                        event.shoupai3 = target.getCards('h').length;
                        heitao2 = 0;
                        meihua2 = 0;
                        hongtao2 = 0;
                        fangkuai2 = 0;
                        heitao.link = 'heitao';
                        meihua.link = 'meihua';
                        hongtao.link = 'hongtao';
                        fangkuai.link = 'fangkuai';
                        for (i = 0; i < card.length; i++) {
                            if (get.suit(card[i]) == "spade") heitao2++;
                            if (get.suit(card[i]) == "club") meihua2++;
                            if (get.suit(card[i]) == "heart") hongtao2++;
                            if (get.suit(card[i]) == "diamond") fangkuai2++;
                        }
                        for (i = 0; i < card.length; i++) {
                            if (get.suit(card[i]) == "spade") {
                                var h = ui.create.card(heitao, 'noclick', true).init(card[i]);
                                h.classList.add('guanxingCard');
                                h.style.width = "108px";
                                h.style.zoom = "0.88";
                                h.style.top = "13.5px";
                                h.style.left = "9.72px";
                                if (heitao2 > 2) h.style.marginRight = -(heitao2 * 16) + "px";
                            }
                            if (get.suit(card[i]) == "club") {
                                var m = ui.create.card(meihua, 'noclick', true).init(card[i])
                                m.classList.add('guanxingCard');
                                m.style.width = "108px";
                                m.style.zoom = "0.88";
                                m.style.top = "13.5px";
                                m.style.left = "9.72px";
                                if (meihua2 > 2) m.style.marginRight = -(meihua2 * 16) + "px";
                            }
                            if (get.suit(card[i]) == "heart") {
                                var r = ui.create.card(hongtao, 'noclick', true).init(card[i]);
                                r.classList.add('guanxingCard');
                                r.style.width = "108px";
                                r.style.zoom = "0.88";
                                r.style.top = "13.5px";
                                r.style.left = "9.72px";
                                if (hongtao2 > 2) r.style.marginRight = -(hongtao2 * 16) + "px";
                            }
                            if (get.suit(card[i]) == "diamond") {
                                var f = ui.create.card(fangkuai, 'noclick', true).init(card[i]);
                                f.classList.add('guanxingCard');
                                f.style.width = "108px";
                                f.style.zoom = "0.88";
                                f.style.top = "13.5px";
                                f.style.left = "9.72px";
                                if (fangkuai2 > 2) f.style.marginRight = -(fangkuai2 * 16) + "px";
                            }
                        }
                        var heitaox = ui.create.div('.sbqingzhengheitao1', heitao);
                        if (heitao2 == 0) {
                            heitaox.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor2.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>没有黑桃牌';
                            heitaox.style.top = "60px";
                            heitao.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg3.png")';
                        } else {
                            heitaox.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor2.png' + ' style=width:35px;height:35px;margin-bottom:-15px;/*-10px*//>黑桃牌' + heitao2 + '张';
                        }
                        var meihuax = ui.create.div('.sbqingzhengmeihua1', meihua);
                        if (meihua2 == 0) {
                            meihuax.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor3.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>没有梅花牌';
                            meihuax.style.top = "60px";
                            meihua.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg3.png")';
                        } else {
                            meihuax.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor3.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>梅花牌' + meihua2 + '张';
                        }
                        var hongtaox = ui.create.div('.sbqingzhenghongtao1', hongtao);
                        if (hongtao2 == 0) {
                            hongtaox.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor0.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>没有红桃牌';
                            hongtaox.style.top = "60px"
                            hongtao.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg3.png")';
                        } else {
                            hongtaox.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor0.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>红桃牌' + hongtao2 + '张';
                        }
                        var fangkuaix = ui.create.div('.sbqingzhengfangkuai1', fangkuai);
                        if (fangkuai2 == 0) {
                            fangkuaix.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor1.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>没有方块牌';
                            fangkuaix.style.top = "60px"
                            fangkuai.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg3.png")';
                        } else {
                            fangkuaix.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor1.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>方块牌' + fangkuai2 + '张';
                        }
                        
                        var clickLog = [];
                        event.clickLogAI = function () {
                        // 瓜瓜不会ai捏
                        clickLog = ['hongtao','meihua','hongtao','fangkuai'];
                        if(heitao2==0) clickLog.splice(clickLog.indexOf('heitao'), 1);
                        if(meihua2==0) clickLog.splice(clickLog.indexOf('meihuai'), 1); 
                        if(hongtao2==0) clickLog.splice(clickLog.indexOf('hongtao'), 1);
                        if(fangkuai2==0) clickLog.splice(clickLog.indexOf('fangkuai'), 1);
                        for(i=0;i<clickLog.length;i++){
                        if (clickLog.length != 1) clickLog.shift();
                        }
                        return clickLog;                                               
                    }   
                        var clickItem = function (node) {
                        if (clickLog.indexOf('heitao') == -1 && heitao2 > 0) heitao.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg1.png")';
                        if (clickLog.indexOf('meihua') == -1 && meihua2 > 0) meihua.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg1.png")';
                        if (clickLog.indexOf('hongtao') == -1 && hongtao2 > 0) hongtao.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg1.png")';
                        if (clickLog.indexOf('fangkuai') == -1 && fangkuai2 > 0) fangkuai.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg1.png")';                    
                        if (clickLog.indexOf(node.link)!=-1) {
                            node.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg2.png")'
                        } else {
                            node.style.backgroundImage = '';
                        }
                        if (clickLog.length == 1) {
                        event.ok.style.filter = 'none';  
                        } else {
                        event.ok.style.filter = 'grayscale(100%)';
                        }
                    }
                        heitao.onclick = function () {
                            if (heitao2 == 0) return;
                            if (clickLog.indexOf('heitao') == -1) {
                                if (clickLog.length >= 1) clickLog.shift();
                                clickLog.push('heitao');
                            } else {
                                clickLog.splice(clickLog.indexOf('heitao'), 1);
                            }
                        clickItem(this);
                        };
                        meihua.onclick = function () {
                            if (meihua2 == 0) return;
                            if (clickLog.indexOf('meihua') == -1) {
                                if (clickLog.length >= 1) clickLog.shift();
                                clickLog.push('meihua');
                            } else {
                                clickLog.splice(clickLog.indexOf('meihua'), 1);
                            }
                        clickItem(this);
                        };
                        hongtao.onclick = function () {
                            if (hongtao2 == 0) return;
                            if (clickLog.indexOf('hongtao') == -1) {
                                if (clickLog.length >= 1) clickLog.shift();
                                clickLog.push('hongtao');
                            } else {
                                clickLog.splice(clickLog.indexOf('hongtao'), 1);
                            }
                        clickItem(this);
                        };
                        fangkuai.onclick = function () {
                            if (fangkuai2 == 0) return;
                            if (clickLog.indexOf('fangkuai') == -1) {
                                if (clickLog.length >= 1) clickLog.shift();
                                clickLog.push('fangkuai');
                            } else {
                                clickLog.splice(clickLog.indexOf('fangkuai'), 1);
                            }
                            clickItem(this);
                        };                        
                    
                    // var _event = event;
                    event.ok = ui.create.control('', function (evt) {
                    event.ok.style.transform = 'scale(0.7)';
                    setTimeout(function() {event.ok.style.transform = 'scale(1)'; }, 200);
                    if (clickLog.length!=1) return;                  
                        event.cailickx = clickLog;                        
                        ui.xjmhQingzhengNext();
                        game.resume2();
                    });                    
                    
                    event.cancel = ui.create.control('', function (evt) {
                    event.cancel.style.transform = 'scale(0.9)';
                    setTimeout(function() {if(event.ok) event.cancel.style.transform = 'scale(1)'; }, 50);
                    if (event.dialog)event.dialog.remove();
                    if (event.ok) event.ok.remove();
                    if (event.cancel) event.cancel.remove();
                    event.dialog = null;
                    event.ok = null;
                    event.cancel = null;
                        event.finish();
                        ui.xjmhQingzhengNext();
                        game.resume2();                        
                    });
                    event.dialog.appendChild(event.ok);
                    event.dialog.appendChild(event.cancel);
                    game.createCss(`.sbqingzheng-cancel{
                        pointer-events: none;
                        filter: grayscale(1);
                    }`);
                    event.cancel.classList.add('sbqingzheng-cancel');
                    //event.dialog.appendChild(event.cancel);
                    event.ok.style.filter = 'grayscale(100%)';
                    event.ok.style.marginTop = '365px';
                    //event.ok.style.marginLeft = '-100px';                    
                    event.ok.style.left = 'calc(50% - 170px)';
                    event.ok.style.backgroundImage= 'url("' + lib.assetURL + 'extension/选将美化/assets/image/gbtn.png")';       
                    event.ok.style.backgroundSize = '80% 80%';
                    event.ok.style.backgroundRepeat = 'no-repeat';
                    event.cancel.style.marginTop = '365px';
                    //event.cancel.style.marginLeft = '100px';                      
                    event.cancel.style.left = 'calc(50% + 20px)';
                    event.cancel.style.backgroundSize = '80% 80%';
                    event.cancel.style.backgroundRepeat = 'no-repeat';
                    event.cancel.style.backgroundImage= 'url("' + lib.assetURL + 'extension/选将美化/assets/image/cancel.png")';       
                    
                    // 先暂停步骤，让玩家选择
                   // _status.imchoosing = true;
                    //暂停游戏
                    game.pause2();
                    // 这是再选择的时候点击托管触发的事件
                    event.switchToAuto = function () {
                        event.cailickx = event.clickLogAI();
                        event.dialog.close();
                        game.resume();
                    };
                    // game.isMine() 就是为玩家自己在操作
                    if (game.isMine()) {
                        event.dialog.open();
                    } else {
                        event.cailickx = event.clickLogAI();
                        ui.xjmhQingzhengNext();
                        game.resume2();
                    }
                    }else{
                    event.finish();
                    }
                    'step 3'
                    /*if (event.cailickx.indexOf('heitao') != -1) event.target.discard(event.target.getCards('h', {suit: "spade"}), 'notBySelf').set('discarder', player);
                    if (event.cailickx.indexOf('meihua') != -1) event.target.discard(event.target.getCards('h', {suit: "club"}), 'notBySelf').set('discarder', player);
                    if (event.cailickx.indexOf('hongtao') != -1) event.target.discard(event.target.getCards('h', {suit: "heart"}), 'notBySelf').set('discarder', player);
                    if (event.cailickx.indexOf('fangkuai') != -1) event.target.discard(event.target.getCards('h', {suit: "diamond"}), 'notBySelf').set('discarder', player);*/
                    event.discardMeCards = [];
                    event.discardHimCards = [];
                    var suitsList = [
                        {name: 'heitao', suit: 'spade'},
                        {name: 'meihua', suit: 'club'},
                        {name: 'hongtao', suit: 'heart'},
                        {name: 'fangkuai', suit: 'diamond'}
                    ];
                    suitsList.forEach(suitItem => {
                        if (event.cailick.indexOf(suitItem.name) != -1) event.discardMeCards.addArray(player.getCards('h', {suit: suitItem.suit}));
                        if (event.cailickx.indexOf(suitItem.name) != -1) event.discardHimCards.addArray(event.target.getCards('h', {suit: suitItem.suit}));
                    });
                    player.discard(event.discardMeCards);
                    event.target.discard(
                            event.discardHimCards,
                            'notBySelf'
                        ).set('discarder', player);
                    /*if (event.cailick.indexOf('heitao') != -1) player.discard(player.getCards('h', {suit: "spade"}));
                    if (event.cailick.indexOf('meihua') != -1) player.discard(player.getCards('h', {suit: "club"}));
                    if (event.cailick.indexOf('hongtao') != -1) player.discard(player.getCards('h', {suit: "heart"}));
                    if (event.cailick.indexOf('fangkuai') != -1) player.discard(player.getCards('h', {suit: "diamond"}));*/
                    // 将所有可能条件整理为数组结构
                    /*const conditions = [
                        { key: 'heitao', suit: 'spade' },
                        { key: 'meihua', suit: 'club' },
                        { key: 'hongtao', suit: 'heart' },
                        { key: 'fangkuai', suit: 'diamond' }
                    ];
                    
                    // 收集符合条件的选项
                    const matches = conditions.filter(item => 
                        event.cailickx.indexOf(item.key) !== -1
                    );
                    
                    // 随机选择并执行一个
                    if (matches.length > 0) {
                        const selected = matches[Math.floor(Math.random() * matches.length)];
                        event.target.discard(
                            event.target.getCards('h', { suit: selected.suit }),
                            'notBySelf'
                        ).set('discarder', player);
                    }*/
                    event.dialog.remove();
                    event.dialog = null;
                    'step 4'
                    event.shoupai2 = player.getCards('h').length;
                    event.shoupai4 = event.target.getCards('h').length;
                    var yi = event.shoupai1 - event.shoupai2;
                    var er = event.shoupai3 - event.shoupai4;
                    if (event.discardMeCards.length > event.discardHimCards.length && event.discardHimCards.length > 0) event.target.damage();
                },
            }
			//谋曹操 清正
            lib.skill.sbqingzheng= {
                audio: 2,
                trigger: {
                    player: "phaseUseBegin",
                },
                filter: function (event, player) {
                    return player.countCards('h') > 0;
                },
                direct: true,
                content: function () {
                    'step 0'
                    event.dialog = ui.create.dialognew('#sbqingzheng', 'hidden');
                    event.dialog.isQingZheng = true;
                    var eventtitle = ui.create.div('.newTitle1', event.dialog);
                    eventtitle.innerHTML = '清正<img src=' + lib.assetURL + 'extension/选将美化/assets/image/arrow.png' + ' style=width:30px;height:25px;margin-bottom:1px;left:2px;/>';
                    var  heitao = ui.create.div('.sbqingzhengheitao', event.dialog);
                    heitao.link = 'heitao';
                    var meihua = ui.create.div('.sbqingzhengmeihua', event.dialog);
                    meihua.link = 'meihua'
                    var hongtao = ui.create.div('.sbqingzhenghongtao', event.dialog);
                    hongtao.link = 'hongtao'
                    var fangkuai = ui.create.div('.sbqingzhengfangkuai', event.dialog);
                    fangkuai.link = 'fangkuai'
                    var wenzi = ui.create.div('.Footerxx', event.dialog);
                    var num = 3 - player.countMark('sbjianxiong');
                    wenzi.innerHTML = "你可发动<span style='color: #9FDCD1'>清正</span>，弃置" + num + "个花色的手牌，看1名角色的手牌，然后弃置其1个花色的所有牌";
                    ui.create.div('.qingzhengjindutiao1', event.dialog);
                    ui.create.div('.qingzhengjindutiao2', event.dialog);
                    var card = player.getCards('h');
                    event.shoupai1 = player.getCards('h').length;
                    var heitao1 = 0;
                    var meihua1 = 0;
                    var hongtao1 = 0;
                    var fangkuai1 = 0;
                    for (i = 0; i < card.length; i++) {
                        if (get.suit(card[i]) == "spade") heitao1++;
                        if (get.suit(card[i]) == "club") meihua1++;
                        if (get.suit(card[i]) == "heart") hongtao1++;
                        if (get.suit(card[i]) == "diamond") fangkuai1++;
                    }
                    for (i = 0; i < card.length; i++) {
                        if (get.suit(card[i]) == "spade") {
                            var h = ui.create.card(heitao, 'noclick', true).init(card[i]);
                            h.classList.add('guanxingCard');
                            h.style.width = "108px";
                            h.style.zoom = "0.88";
                            h.style.top = "13.5px";
                            h.style.left = "9.72px";
                            if (heitao1 > 2) h.style.marginRight = -(heitao1 * 16) + "px";
                        }
                        if (get.suit(card[i]) == "club") {
                            var m = ui.create.card(meihua, 'noclick', true).init(card[i])
                            m.classList.add('guanxingCard');
                            m.style.width = "108px";
                            m.style.zoom = "0.88";
                            m.style.top = "13.5px";
                            m.style.left = "9.72px";
                            if (meihua1 > 2) m.style.marginRight = -(meihua1 * 16) + "px";
                        }
                        if (get.suit(card[i]) == "heart") {
                            var r = ui.create.card(hongtao, 'noclick', true).init(card[i]);
                            r.classList.add('guanxingCard');
                            r.style.width = "108px";
                            r.style.zoom = "0.88";
                            r.style.top = "13.5px";
                            r.style.left = "9.72px";
                            if (hongtao1 > 2) r.style.marginRight = -(hongtao1 * 16) + "px";
                        }
                        if (get.suit(card[i]) == "diamond") {
                            var f = ui.create.card(fangkuai, 'noclick', true).init(card[i]);
                            f.classList.add('guanxingCard');
                            f.style.width = "108px";
                            f.style.zoom = "0.88";
                            f.style.top = "13.5px";
                            f.style.left = "9.72px";
                            if (fangkuai1 > 2) f.style.marginRight = -(fangkuai1 * 16) + "px";
                        }
                    }
                    var heitaox = ui.create.div('.sbqingzhengheitao1', heitao);
                    if (heitao1 == 0) {
                        heitaox.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor2.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>没有黑桃牌';
                        heitaox.style.top = "60px";
                        heitao.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg3.png")';
                    } else {
                        heitaox.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor2.png' + ' style=width:35px;height:35px;margin-bottom:-15px;/*-10px*//>黑桃牌' + heitao1 + '张';
                    }
                    var meihuax = ui.create.div('.sbqingzhengmeihua1', meihua);
                    if (meihua1 == 0) {
                        meihuax.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor3.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>没有梅花牌';
                        meihuax.style.top = "60px";
                        meihua.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg3.png")';
                    } else {
                        meihuax.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor3.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>梅花牌' + meihua1 + '张';
                    }
                    var hongtaox = ui.create.div('.sbqingzhenghongtao1', hongtao);
                    if (hongtao1 == 0) {
                        hongtaox.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor0.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>没有红桃牌';
                        hongtaox.style.top = "60px"
                        hongtao.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg3.png")';
                    } else {
                        hongtaox.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor0.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>红桃牌' + hongtao1 + '张';
                    }
                    var fangkuaix = ui.create.div('.sbqingzhengfangkuai1', fangkuai);
                    if (fangkuai1 == 0) {
                        fangkuaix.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor1.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>没有方块牌';
                        fangkuaix.style.top = "60px"
                        fangkuai.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg3.png")';
                    } else {
                        fangkuaix.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor1.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>方块牌' + fangkuai1 + '张';
                    }

                    var clickLog = [];                    
                    // var _event = event;
                    event.clickLogAI = function () {
                        // 瓜瓜不会ai捏,随便写点糊弄糊弄
                        clickLog = ['hongtao','meihua','hongtao','fangkuai'];
                        if(heitao1==0) clickLog.splice(clickLog.indexOf('heitao'), 1);
                        if(meihua1==0) clickLog.splice(clickLog.indexOf('meihuai'), 1); 
                        if(hongtao1==0) clickLog.splice(clickLog.indexOf('hongtao'), 1);
                        if(fangkuai1==0) clickLog.splice(clickLog.indexOf('fangkuai'), 1);
                        for(i=0;i<=clickLog.length;i++){
                        if (clickLog.length != num) clickLog.shift();
                        }                       
                        return clickLog;                                               
                    }   
                    event.ok = ui.create.control('', function (evt) {
                    event.ok.style.transform = 'scale(0.9)';
                    setTimeout(function() {if(event.ok )event.ok.style.transform = 'scale(1)'; }, 50);
                    if (clickLog.length!= num) return;                  
                        event.cailick = clickLog;
                        //继续游戏
                        ui.xjmhQingzhengNext();
                        game.resume2();
                    });                    
                    
                    event.cancel = ui.create.control('', function (evt) {
                    if (event.dialog)event.dialog.remove();
                    if (event.ok) event.ok.remove();
                    if (event.cancel) event.cancel.remove();
                    event.dialog = null;
                    event.ok = null;
                    event.cancel = null;
                        event.finish();
                        ui.xjmhQingzhengNext();
                        game.resume2();                        
                    });
                    event.dialog.appendChild(event.ok);
                    event.dialog.appendChild(event.cancel);
                    event.ok.style.filter = 'grayscale(100%)';
                    //event.ok.style.marginTop = '365px';
                    event.ok.style.top = '367px';
                    //event.ok.style.marginLeft = '-100px';
                    event.ok.style.left = 'calc(50% - 170px)';       
                    event.ok.style.backgroundImage= 'url("' + lib.assetURL + 'extension/选将美化/assets/image/gbtn.png")';       
                    event.ok.style.backgroundSize = '80% 80%';
                    event.ok.style.backgroundRepeat = 'no-repeat';
                    //event.cancel.style.marginTop = '365px';
                    event.cancel.style.top = '367px';
                    //event.cancel.style.marginLeft = '100px';
                    event.cancel.style.left = 'calc(50% + 20px)';
                    event.cancel.style.backgroundSize = '80% 80%';
                    event.cancel.style.backgroundRepeat = 'no-repeat';
                    event.cancel.style.backgroundImage= 'url("' + lib.assetURL + 'extension/选将美化/assets/image/cancel.png")';        
                    // event.cancel.backgroundSize = '100% 100%';              
                    // 隐藏按钮
                    // event.ok.hide();
                    //显示按钮
                     //  event.ok.show();
                    var clickItem = function (node) {
                        if (clickLog.indexOf('heitao') == -1 && heitao1 > 0) heitao.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg1.png")';
                        if (clickLog.indexOf('meihua') == -1 && meihua1 > 0) meihua.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg1.png")';
                        if (clickLog.indexOf('hongtao') == -1 && hongtao1 > 0) hongtao.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg1.png")';
                        if (clickLog.indexOf('fangkuai') == -1 && fangkuai1 > 0) fangkuai.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg1.png")';
                        if (clickLog.includes(node.link)) {
                            node.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg2.png")'
                        } else {
                            node.style.backgroundImage = '';
                        }
                        if (clickLog.length == num) {
                        event.ok.style.filter = 'none';  
                        } else {
                        event.ok.style.filter = 'grayscale(100%)';
                        }
                    }

                    heitao.onclick = function () {
                        if (heitao1 == 0) return;                       
                        if (clickLog.indexOf('heitao') == -1) {
                            if (clickLog.length >= num) clickLog.shift();
                            clickLog.push('heitao');
                        } else {
                            clickLog.splice(clickLog.indexOf('heitao'), 1);
                        }
                        clickItem(this);
                    };
                    meihua.onclick = function () {
                        if (meihua1 == 0) return;
                        if (clickLog.indexOf('meihua') == -1) {
                            if (clickLog.length >= num) clickLog.shift();
                            clickLog.push('meihua');
                        } else {
                            clickLog.splice(clickLog.indexOf('meihua'), 1);
                        }
                        clickItem(this);
                    };
                    hongtao.onclick = function () {
                        if (hongtao1 == 0) return;
                        if (clickLog.indexOf('hongtao') == -1) {
                            if (clickLog.length >= num) clickLog.shift();
                            clickLog.push('hongtao');
                        } else {
                            clickLog.splice(clickLog.indexOf('hongtao'), 1);
                        }
                        clickItem(this);
                    };
                    fangkuai.onclick = function () {
                        if (fangkuai1 == 0) return;
                        if (clickLog.indexOf('fangkuai') == -1) {
                            if (clickLog.length >= num) clickLog.shift();
                            clickLog.push('fangkuai');
                        } else {
                            clickLog.splice(clickLog.indexOf('fangkuai'), 1);
                        }
                        clickItem(this);                       
                    };                  
                    // 先暂停步骤，让玩家选择
                    _status.imchoosing = true;
                    //暂停游戏
                    game.pause2();
                    // 这是再选择的时候点击托管触发的事件
                    event.switchToAuto = function () {
                        event.cailick = event.clickLogAI();
                        event.dialog.close();
                        game.resume();
                    };
                    // game.isMine() 就是为玩家自己在操作
                    if (game.isMine()) {
                        event.dialog.open();
                    } else {
                        event.cailick = event.clickLogAI();
                        ui.xjmhQingzhengNext();
                        game.resume2();
                    }                                       
                    'step 1'
                    //if(!event.cailick) return;
                    // if(result.bool){
                    //移到后面去
                    /*if (event.cailick.indexOf('heitao') != -1) player.discard(player.getCards('h', {suit: "spade"}));
                    if (event.cailick.indexOf('meihua') != -1) player.discard(player.getCards('h', {suit: "club"}));
                    if (event.cailick.indexOf('hongtao') != -1) player.discard(player.getCards('h', {suit: "heart"}));
                    if (event.cailick.indexOf('fangkuai') != -1) player.discard(player.getCards('h', {suit: "diamond"}));*/
                    event.dialog.remove();
                    if (event.ok) event.ok.remove();
                    if (event.cancel) event.cancel.remove();
                    event.dialog = null;
                    event.ok = null;
                    event.cancel = null;
                    player.chooseTarget('清正：观看一名其他角色的手牌并弃置其中一种花色的所有牌', function (card, player, target) {
                        return player != target && target.countCards('h');
                    }).set('ai',target=>{
                        var player=_status.event.player,att=get.attitude(player,target);
                        if(att>=0) return 0;
                        return 1-att/2+Math.sqrt(target.countCards('h'));
                    });                 
                    'step 2'
                    if (result.bool) {
                        var target = result.targets[0];
                        event.target = result.targets[0];
                        player.logSkill('sbqingzheng', target);
                        event.dialog = ui.create.dialognew('#sbqingzheng','hidden');
                        event.dialog.isQingZheng = true;
                        var eventtitle = ui.create.div('.newTitle1', event.dialog);
                        eventtitle.innerHTML = '清正<img src=' + lib.assetURL + 'extension/选将美化/assets/image/arrow.png' + ' style=width:30px;height:25px;margin-bottom:1px;left:2px;/>';
                        var heitao = ui.create.div('.sbqingzhengheitao', event.dialog);
                        
                        var meihua = ui.create.div('.sbqingzhengmeihua', event.dialog);
                        
                        var hongtao = ui.create.div('.sbqingzhenghongtao', event.dialog);
                        
                        var fangkuai = ui.create.div('.sbqingzhengfangkuai', event.dialog);
                        
                        ui.create.div('.qingzhengjindutiao1', event.dialog);
                        ui.create.div('.qingzhengjindutiao2', event.dialog);
                        var wenzi = ui.create.div('.Footerxx', event.dialog);
                        wenzi.innerHTML = "你发动了<span style='color: #9FDCD1'>清正</span>，查看<span style='color: #66FF66'>" + get.translation(target.name) + "</span>的手牌，然后弃置其1个花色的所有牌";
                        var card = target.getCards('h');
                        event.shoupai3 = target.getCards('h').length;
                        heitao2 = 0;
                        meihua2 = 0;
                        hongtao2 = 0;
                        fangkuai2 = 0;
                        heitao.link = 'heitao';
                        meihua.link = 'meihua';
                        hongtao.link = 'hongtao';
                        fangkuai.link = 'fangkuai';
                        for (i = 0; i < card.length; i++) {
                            if (get.suit(card[i]) == "spade") heitao2++;
                            if (get.suit(card[i]) == "club") meihua2++;
                            if (get.suit(card[i]) == "heart") hongtao2++;
                            if (get.suit(card[i]) == "diamond") fangkuai2++;
                        }
                        for (i = 0; i < card.length; i++) {
                            if (get.suit(card[i]) == "spade") {
                                var h = ui.create.card(heitao, 'noclick', true).init(card[i]);
                                h.classList.add('guanxingCard');
                                h.style.width = "108px";
                                h.style.zoom = "0.88";
                                h.style.top = "13.5px";
                                h.style.left = "9.72px";
                                if (heitao2 > 2) h.style.marginRight = -(heitao2 * 16) + "px";
                            }
                            if (get.suit(card[i]) == "club") {
                                var m = ui.create.card(meihua, 'noclick', true).init(card[i])
                                m.classList.add('guanxingCard');
                                m.style.width = "108px";
                                m.style.zoom = "0.88";
                                m.style.top = "13.5px";
                                m.style.left = "9.72px";
                                if (meihua2 > 2) m.style.marginRight = -(meihua2 * 16) + "px";
                            }
                            if (get.suit(card[i]) == "heart") {
                                var r = ui.create.card(hongtao, 'noclick', true).init(card[i]);
                                r.classList.add('guanxingCard');
                                r.style.width = "108px";
                                r.style.zoom = "0.88";
                                r.style.top = "13.5px";
                                r.style.left = "9.72px";
                                if (hongtao2 > 2) r.style.marginRight = -(hongtao2 * 16) + "px";
                            }
                            if (get.suit(card[i]) == "diamond") {
                                var f = ui.create.card(fangkuai, 'noclick', true).init(card[i]);
                                f.classList.add('guanxingCard');
                                f.style.width = "108px";
                                f.style.zoom = "0.88";
                                f.style.top = "13.5px";
                                f.style.left = "9.72px";
                                if (fangkuai2 > 2) f.style.marginRight = -(fangkuai2 * 16) + "px";
                            }
                        }
                        var heitaox = ui.create.div('.sbqingzhengheitao1', heitao);
                        if (heitao2 == 0) {
                            heitaox.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor2.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>没有黑桃牌';
                            heitaox.style.top = "60px";
                            heitao.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg3.png")';
                        } else {
                            heitaox.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor2.png' + ' style=width:35px;height:35px;margin-bottom:-15px;/*-10px*//>黑桃牌' + heitao2 + '张';
                        }
                        var meihuax = ui.create.div('.sbqingzhengmeihua1', meihua);
                        if (meihua2 == 0) {
                            meihuax.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor3.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>没有梅花牌';
                            meihuax.style.top = "60px";
                            meihua.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg3.png")';
                        } else {
                            meihuax.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor3.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>梅花牌' + meihua2 + '张';
                        }
                        var hongtaox = ui.create.div('.sbqingzhenghongtao1', hongtao);
                        if (hongtao2 == 0) {
                            hongtaox.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor0.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>没有红桃牌';
                            hongtaox.style.top = "60px"
                            hongtao.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg3.png")';
                        } else {
                            hongtaox.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor0.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>红桃牌' + hongtao2 + '张';
                        }
                        var fangkuaix = ui.create.div('.sbqingzhengfangkuai1', fangkuai);
                        if (fangkuai2 == 0) {
                            fangkuaix.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor1.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>没有方块牌';
                            fangkuaix.style.top = "60px"
                            fangkuai.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg3.png")';
                        } else {
                            fangkuaix.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor1.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>方块牌' + fangkuai2 + '张';
                        }
                        
                        var clickLog = [];
                        event.clickLogAI = function () {
                        // 瓜瓜不会ai捏
                        clickLog = ['hongtao','meihua','hongtao','fangkuai'];
                        if(heitao2==0) clickLog.splice(clickLog.indexOf('heitao'), 1);
                        if(meihua2==0) clickLog.splice(clickLog.indexOf('meihuai'), 1); 
                        if(hongtao2==0) clickLog.splice(clickLog.indexOf('hongtao'), 1);
                        if(fangkuai2==0) clickLog.splice(clickLog.indexOf('fangkuai'), 1);
                        for(i=0;i<clickLog.length;i++){
                        if (clickLog.length != 1) clickLog.shift();
                        }
                        return clickLog;                                               
                    }   
                        var clickItem = function (node) {
                        if (clickLog.indexOf('heitao') == -1 && heitao2 > 0) heitao.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg1.png")';
                        if (clickLog.indexOf('meihua') == -1 && meihua2 > 0) meihua.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg1.png")';
                        if (clickLog.indexOf('hongtao') == -1 && hongtao2 > 0) hongtao.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg1.png")';
                        if (clickLog.indexOf('fangkuai') == -1 && fangkuai2 > 0) fangkuai.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg1.png")';                    
                        if (clickLog.indexOf(node.link)!=-1) {
                            node.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg2.png")'
                        } else {
                            node.style.backgroundImage = '';
                        }
                        if (clickLog.length == 1) {
                        event.ok.style.filter = 'none';  
                        } else {
                        event.ok.style.filter = 'grayscale(100%)';
                        }
                    }
                        heitao.onclick = function () {
                            if (heitao2 == 0) return;
                            if (clickLog.indexOf('heitao') == -1) {
                                if (clickLog.length >= 1) clickLog.shift();
                                clickLog.push('heitao');
                            } else {
                                clickLog.splice(clickLog.indexOf('heitao'), 1);
                            }
                        clickItem(this);
                        };
                        meihua.onclick = function () {
                            if (meihua2 == 0) return;
                            if (clickLog.indexOf('meihua') == -1) {
                                if (clickLog.length >= 1) clickLog.shift();
                                clickLog.push('meihua');
                            } else {
                                clickLog.splice(clickLog.indexOf('meihua'), 1);
                            }
                        clickItem(this);
                        };
                        hongtao.onclick = function () {
                            if (hongtao2 == 0) return;
                            if (clickLog.indexOf('hongtao') == -1) {
                                if (clickLog.length >= 1) clickLog.shift();
                                clickLog.push('hongtao');
                            } else {
                                clickLog.splice(clickLog.indexOf('hongtao'), 1);
                            }
                        clickItem(this);
                        };
                        fangkuai.onclick = function () {
                            if (fangkuai2 == 0) return;
                            if (clickLog.indexOf('fangkuai') == -1) {
                                if (clickLog.length >= 1) clickLog.shift();
                                clickLog.push('fangkuai');
                            } else {
                                clickLog.splice(clickLog.indexOf('fangkuai'), 1);
                            }
                            clickItem(this);
                        };                        
                    
                    // var _event = event;
                    event.ok = ui.create.control('', function (evt) {
                    event.ok.style.transform = 'scale(0.7)';
                    setTimeout(function() {event.ok.style.transform = 'scale(1)'; }, 200);
                    if (clickLog.length!=1) return;                  
                        event.cailickx = clickLog;                        
                        ui.xjmhQingzhengNext();
                        game.resume2();
                    });                    
                    
                    event.cancel = ui.create.control('', function (evt) {
                    event.cancel.style.transform = 'scale(0.9)';
                    setTimeout(function() {if(event.ok) event.cancel.style.transform = 'scale(1)'; }, 50);
                    if (event.dialog)event.dialog.remove();
                    if (event.ok) event.ok.remove();
                    if (event.cancel) event.cancel.remove();
                    event.dialog = null;
                    event.ok = null;
                    event.cancel = null;
                        event.finish();
                        ui.xjmhQingzhengNext();
                        game.resume2();                        
                    });
                    event.dialog.appendChild(event.ok);
                    event.dialog.appendChild(event.cancel);
                    game.createCss(`.sbqingzheng-cancel{
                        pointer-events: none;
                        filter: grayscale(1);
                    }`);
                    event.cancel.classList.add('sbqingzheng-cancel');
                    //event.dialog.appendChild(event.cancel);
                    event.ok.style.filter = 'grayscale(100%)';
                    event.ok.style.marginTop = '365px';
                    //event.ok.style.marginLeft = '-100px';                    
                    event.ok.style.left = 'calc(50% - 170px)';
                    event.ok.style.backgroundImage= 'url("' + lib.assetURL + 'extension/选将美化/assets/image/gbtn.png")';       
                    event.ok.style.backgroundSize = '80% 80%';
                    event.ok.style.backgroundRepeat = 'no-repeat';
                    event.cancel.style.marginTop = '365px';
                    //event.cancel.style.marginLeft = '100px';                      
                    event.cancel.style.left = 'calc(50% + 20px)';
                    event.cancel.style.backgroundSize = '80% 80%';
                    event.cancel.style.backgroundRepeat = 'no-repeat';
                    event.cancel.style.backgroundImage= 'url("' + lib.assetURL + 'extension/选将美化/assets/image/cancel.png")';       
                    
                    // 先暂停步骤，让玩家选择
                   // _status.imchoosing = true;
                    //暂停游戏
                    game.pause2();
                    // 这是再选择的时候点击托管触发的事件
                    event.switchToAuto = function () {
                        event.cailickx = event.clickLogAI();
                        event.dialog.close();
                        game.resume();
                    };
                    // game.isMine() 就是为玩家自己在操作
                    if (game.isMine()) {
                        event.dialog.open();
                    } else {
                        event.cailickx = event.clickLogAI();
                        ui.xjmhQingzhengNext();
                        game.resume2();
                    }
                    }else{
                    event.finish();
                    }
                    'step 3'
                    /*if (event.cailickx.indexOf('heitao') != -1) event.target.discard(event.target.getCards('h', {suit: "spade"}), 'notBySelf').set('discarder', player);
                    if (event.cailickx.indexOf('meihua') != -1) event.target.discard(event.target.getCards('h', {suit: "club"}), 'notBySelf').set('discarder', player);
                    if (event.cailickx.indexOf('hongtao') != -1) event.target.discard(event.target.getCards('h', {suit: "heart"}), 'notBySelf').set('discarder', player);
                    if (event.cailickx.indexOf('fangkuai') != -1) event.target.discard(event.target.getCards('h', {suit: "diamond"}), 'notBySelf').set('discarder', player);*/
                    event.discardMeCards = [];
                    event.discardHimCards = [];
                    var suitsList = [
                        {name: 'heitao', suit: 'spade'},
                        {name: 'meihua', suit: 'club'},
                        {name: 'hongtao', suit: 'heart'},
                        {name: 'fangkuai', suit: 'diamond'}
                    ];
                    suitsList.forEach(suitItem => {
                        if (event.cailick.indexOf(suitItem.name) != -1) event.discardMeCards.addArray(player.getCards('h', {suit: suitItem.suit}));
                        if (event.cailickx.indexOf(suitItem.name) != -1) event.discardHimCards.addArray(event.target.getCards('h', {suit: suitItem.suit}));
                    });
                    player.discard(event.discardMeCards);
                    event.target.discard(
                            event.discardHimCards,
                            'notBySelf'
                        ).set('discarder', player);
                    /*if (event.cailick.indexOf('heitao') != -1) player.discard(player.getCards('h', {suit: "spade"}));
                    if (event.cailick.indexOf('meihua') != -1) player.discard(player.getCards('h', {suit: "club"}));
                    if (event.cailick.indexOf('hongtao') != -1) player.discard(player.getCards('h', {suit: "heart"}));
                    if (event.cailick.indexOf('fangkuai') != -1) player.discard(player.getCards('h', {suit: "diamond"}));
                    // 将所有可能条件整理为数组结构
                    const conditions = [
                        { key: 'heitao', suit: 'spade' },
                        { key: 'meihua', suit: 'club' },
                        { key: 'hongtao', suit: 'heart' },
                        { key: 'fangkuai', suit: 'diamond' }
                    ];
                    
                    // 收集符合条件的选项
                    const matches = conditions.filter(item => 
                        event.cailickx.indexOf(item.key) !== -1
                    );
                    
                    // 随机选择并执行一个
                    if (matches.length > 0) {
                        const selected = matches[Math.floor(Math.random() * matches.length)];
                        event.target.discard(
                            event.target.getCards('h', { suit: selected.suit }),
                            'notBySelf'
                        ).set('discarder', player);
                    }*/
                    event.dialog.remove();
                    event.dialog = null;
                    'step 4'
                    event.shoupai2 = player.getCards('h').length;
                    event.shoupai4 = event.target.getCards('h').length;
                    var yi = event.shoupai1 - event.shoupai2;
                    var er = event.shoupai3 - event.shoupai4;
                    if (event.discardMeCards.length > event.discardHimCards.length && event.discardHimCards.length > 0) event.target.damage();
                    'step 5'
                    if (player.countMark('sbjianxiong') < 2 && player.hasSkill('sbjianxiong')) {
                        player.chooseBool('是否获得1枚“治世”？').set('ai', () => Math.random() < 0.5 ? 0 : 1);
                    } else event.finish();
                    'step 6'
                    if (result.bool) {
                        player.addMark('sbjianxiong', 1);
                    }
                },
                ai: {
                    combo: "sbjianxiong",
                },
            }
lib.skill.spyanjiao= {
    audio:2,
    enable:"phaseUse",
    direct: true,
    usable:1,
    chooseButton:{
        dialog:function(event,player){
        event.dialog = ui.create.dialognew('#sbqingzheng', 'hidden');
        event.dialog.isQingZheng = true;
                    var eventtitle = ui.create.div('.newTitle1', event.dialog);
                    eventtitle.innerHTML = '严教<img src=' + lib.assetURL + 'extension/选将美化/assets/image/arrow.png' + ' style=width:30px;height:25px;margin-bottom:1px;left:2px;/>';
                    var  heitao = ui.create.div('.sbqingzhengheitao', event.dialog);
                    heitao.link = 'heitao';
                    heitao.xg = '黑桃';
                    var meihua = ui.create.div('.sbqingzhengmeihua', event.dialog);
                    meihua.link = 'meihua'
                    meihua.xg = '梅花';
                    var hongtao = ui.create.div('.sbqingzhenghongtao', event.dialog);
                    hongtao.link = 'hongtao'
                    hongtao.xg = '红桃';
                    var fangkuai = ui.create.div('.sbqingzhengfangkuai', event.dialog);
                    fangkuai.link = 'fangkuai'
                    fangkuai.xg = '方块';
                    var wenzi = ui.create.div('.Footerxx', event.dialog);
                    wenzi.innerHTML = "你可发动<span style='color: #9FDCD1'>严教</span>，交给1名角色选择花色的所有牌，对其造成1点伤害";
                    ui.create.div('.qingzhengjindutiao1', event.dialog);
                    ui.create.div('.qingzhengjindutiao2', event.dialog);
                   var card = player.getCards('h');
                    event.shoupai1 = player.getCards('h').length;
                    var heitao1 = 0;
                    var meihua1 = 0;
                    var hongtao1 = 0;
                    var fangkuai1 = 0;
                    for (var i = 0; i < card.length; i++) {
                        if (get.suit(card[i]) == "spade") heitao1++;
                        if (get.suit(card[i]) == "club") meihua1++;
                        if (get.suit(card[i]) == "heart") hongtao1++;
                        if (get.suit(card[i]) == "diamond") fangkuai1++;
                    }
                    for (var i = 0; i < card.length; i++) {
                        if (get.suit(card[i]) == "spade") {
                            var h = ui.create.card(heitao, 'noclick', true).init(card[i]);
                            h.classList.add('guanxingCard');
                            h.style.width = "108px";
                            h.style.zoom = "0.88";
                            h.style.top = "13.5px";
                            h.style.left = "9.72px";
                            if (heitao1 > 2) h.style.marginRight = -(heitao1 * 16) + "px";
                        }
                        if (get.suit(card[i]) == "club") {
                            var m = ui.create.card(meihua, 'noclick', true).init(card[i])
                            m.classList.add('guanxingCard');
                            m.style.width = "108px";
                            m.style.zoom = "0.88";
                            m.style.top = "13.5px";
                            m.style.left = "9.72px";
                            if (meihua1 > 2) m.style.marginRight = -(meihua1 * 16) + "px";
                        }
                        if (get.suit(card[i]) == "heart") {
                            var r = ui.create.card(hongtao, 'noclick', true).init(card[i]);
                            r.classList.add('guanxingCard');
                            r.style.width = "108px";
                            r.style.zoom = "0.88";
                            r.style.top = "13.5px";
                            r.style.left = "9.72px";
                            if (hongtao1 > 2) r.style.marginRight = -(hongtao1 * 16) + "px";
                        }
                        if (get.suit(card[i]) == "diamond") {
                            var f = ui.create.card(fangkuai, 'noclick', true).init(card[i]);
                            f.classList.add('guanxingCard');
                            f.style.width = "108px";
                            f.style.zoom = "0.88";
                            f.style.top = "13.5px";
                            f.style.left = "9.72px";
                            if (fangkuai1 > 2) f.style.marginRight = -(fangkuai1 * 16) + "px";
                        }
                    }
                    var heitaox = ui.create.div('.sbqingzhengheitao1', heitao);
                    if (heitao1 == 0) {
                        heitaox.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor2.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>没有黑桃牌';
                        heitaox.style.top = "60px";
                        heitao.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg3.png")';
                    } else {
                        heitaox.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor2.png' + ' style=width:35px;height:35px;margin-bottom:-15px;/*-10px*//>黑桃牌' + heitao1 + '张';
                    }
                    var meihuax = ui.create.div('.sbqingzhengmeihua1', meihua);
                    if (meihua1 == 0) {
                        meihuax.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor3.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>没有梅花牌';
                        meihuax.style.top = "60px";
                        meihua.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg3.png")';
                    } else {
                        meihuax.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor3.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>梅花牌' + meihua1 + '张';
                    }
                    var hongtaox = ui.create.div('.sbqingzhenghongtao1', hongtao);
                    if (hongtao1 == 0) {
                        hongtaox.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor0.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>没有红桃牌';
                        hongtaox.style.top = "60px"
                        hongtao.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg3.png")';
                    } else {
                        hongtaox.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor0.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>红桃牌' + hongtao1 + '张';
                    }
                    var fangkuaix = ui.create.div('.sbqingzhengfangkuai1', fangkuai);
                    if (fangkuai1 == 0) {
                        fangkuaix.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor1.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>没有方块牌';
                        fangkuaix.style.top = "60px"
                        fangkuai.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/dlg_select_bg3.png")';
                    } else {
                        fangkuaix.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/dialog_pokercolor1.png' + ' style=width:35px;;height:35px;margin-bottom:-15px;/*-10px*//>方块牌' + fangkuai1 + '张';
                    }                                         
                    var clickLog = [];                    
                    event.cancel = ui.create.control('', function (evt) {
                    if (event.dialog) event.dialog.remove();
                    if (event.cancel) event.cancel.remove();
                    event.dialog = null;                    
                    event.cancel = null;                  
                        ui.xjmhQingzhengNext();
                        game.resume2();                        
                    });
                    event.dialog.appendChild(event.cancel);
                    //event.cancel.style.marginTop = '365px';
                    event.cancel.style.top = '367px';
                    //event.cancel.style.marginLeft = '-45px';                      
                    event.cancel.style.left = 'calc(50% - 70px)';//'calc(50% - 170px)';
                    event.cancel.style.backgroundSize = '80% 80%';
                    event.cancel.style.backgroundRepeat = 'no-repeat';
                    event.cancel.style.backgroundImage= 'url("' + lib.assetURL + 'extension/选将美化/assets/image/cancel.png")';
                    event.clickLogAI = function () {                       
                        clickLog = ['hongtao','meihua','hongtao','fangkuai'];
                        if(heitao1==0) clickLog.splice(clickLog.indexOf('heitao'), 1);
                        if(meihua1==0) clickLog.splice(clickLog.indexOf('meihuai'), 1); 
                        if(hongtao1==0) clickLog.splice(clickLog.indexOf('hongtao'), 1);
                        if(fangkuai1==0) clickLog.splice(clickLog.indexOf('fangkuai'), 1);
                        for(i=0;i<=clickLog.length;i++){
                        if (clickLog.length != 1) clickLog.shift();
                        }                       
                        return clickLog;                                               
                    }
                    game.pause2();                                       
                    if (game.isMine()) {
                        event.dialog.open();
                    } else {
                        player.storage.spyanjiao5 = event.clickLogAI();
                        ui.xjmhQingzhengNext();
                        game.resume2();
                    }                              
                    var clickItem = function (node) {
                    player.storage.spyanjiao6 = node.xg;
                    ui.xjmhQingzhengNext();
                        game.resume2();
                    ui.click.ok();
                    }

                    heitao.onclick = function () {
                        if (heitao1 == 0) return;                       
                        if (clickLog.indexOf('heitao') == -1) {
                            if (clickLog.length >= 1) clickLog.shift();
                            clickLog.push('heitao');
                        } else {
                            clickLog.splice(clickLog.indexOf('heitao'), 1);
                        }
                        clickItem(this);
                    };
                    meihua.onclick = function () {
                        if (meihua1 == 0) return;
                        if (clickLog.indexOf('meihua') == -1) {
                            if (clickLog.length >=1) clickLog.shift();
                            clickLog.push('meihua');
                        } else {
                            clickLog.splice(clickLog.indexOf('meihua'), 1);
                        }
                        clickItem(this);
                    };
                    hongtao.onclick = function () {
                        if (hongtao1 == 0) return;
                        if (clickLog.indexOf('hongtao') == -1) {
                            if (clickLog.length >= 1) clickLog.shift();
                            clickLog.push('hongtao');
                        } else {
                            clickLog.splice(clickLog.indexOf('hongtao'), 1);
                        }
                        clickItem(this);
                    };
                    fangkuai.onclick = function () {
                        if (fangkuai1 == 0) return;
                        if (clickLog.indexOf('fangkuai') == -1) {
                            if (clickLog.length >= 1) clickLog.shift();
                            clickLog.push('fangkuai');
                        } else {
                            clickLog.splice(clickLog.indexOf('fangkuai'), 1);
                        }
                        clickItem(this);                       
                    };                                  
                   player.storage.spyanjiao5 = clickLog;                   
                   player.storage.spyanjiaoh = heitao1;
                   player.storage.spyanjiaom = meihua1;
                   player.storage.spyanjiaor = hongtao1;
                   player.storage.spyanjiaof = fangkuai1;
            return event.dialog;
        },
        // chooseControl:function(event,player){
            // var map={},hs=player.getCards('h');
            // for(var i of hs) map[get.suit(i,player)]=true;
            // var list=lib.suit.filter((i)=>map[i]);
            // list.push('ok');           
            // list=[];           
            // list.push('cancel2'); 
            // return list;                        
        // },
        check:function(event,player){
            var map={},hs=player.getCards('h'),min=Infinity,min_suit=null;
            for(var i of hs){
                var suit=get.suit(i,player);
                if(!map[suit]) map[suit]=0;
                map[suit]+=get.value(i);
            }
            for(var i in map){
                if(map[i]<min){
                    min=map[i];
                    min_suit=i;
                }
            }
            return min_suit;
        },
        backup:function(result,player){      
            return {
                audio:'spyanjiao',
                // filterCard:{suit:result.control},
                // selectCard:-1,
                position:'h',
                filterTarget:lib.filter.notMe,
                discard:false,
                lose:false,
                delay:false,
                content:function(){
                if (player.storage.spyanjiao5.indexOf('heitao') != -1) {
                player.give(player.getCards('h', {suit: "spade"}),target);
                var numx = player.storage.spyanjiaoh;
                }
                if (player.storage.spyanjiao5.indexOf('meihua') != -1){
                player.give(player.getCards('h', {suit: "club"}),target);
                var numx = player.storage.spyanjiaom;
                }
                if (player.storage.spyanjiao5.indexOf('hongtao') != -1) {
                player.give(player.getCards('h', {suit: "heart"}),target);
                var numx = player.storage.spyanjiaor;
                }
                if (player.storage.spyanjiao5.indexOf('fangkuai') != -1) {
                player.give(player.getCards('h', {suit: "diamond"}),target);
                var numx = player.storage.spyanjiaof;
                }
                
                    player.addSkill('spyanjiao_draw');
                    player.addMark('spyanjiao_draw',numx,false);
                    // player.give(cards,target);
                    target.damage('nocard');
                },
                ai:{
                    result:{
                        target:function(player,target){
                            if(!ui.selected.cards.length) return 0;
                            var val=get.value(ui.selected.cards,target);
                            if(val<0) return val+get.damageEffect(target,player,target);
                            if(val>5||get.value(ui.selected.cards,player)>5) return 0;
                            return get.damageEffect(target,player,target);
                        },
                    },
                },
            }
        },
      prompt:function(links,player){
		return '你可选择1名角色，交给其所有'+player.storage.spyanjiao6+'的牌，对其造成1点伤害';
	},          
    },
    subSkill:{
        draw:{
            onremove:true,
            trigger:{
                player:"phaseBegin",
            },
            forced:true,
            charlotte:true,
            content:function(){
                player.draw(player.countMark('spyanjiao_draw'));
                player.removeSkill('spyanjiao_draw');
            },
            mark:true,
            intro:{
                content:"下回合开始时摸#张牌",
            },
            sub:true,
            parentskill:"spyanjiao",
        },
        backup:{
            audio:"spyanjiao",
            sub:true,
            parentskill:"spyanjiao",
        },
    },
    ai:{
        order:1,
        result:{
            player:1,
        },
    },
}            
}    
if (config.feichuxuanxiang) {     
         //注:在  player.chooseToDisable() 的后面可以加入.set('txt','填你需要改变的文字') 。如 神张辽的夺锐
         //player.chooseToDisable().set('txt','你可以废除1个装备栏，然后<span style="color: #66FF66">'+get.translation(trigger.player)+'</span>在他下个回合结束前失去1个技能')
        //废除选项♣️
		lib.element.content.chooseToDisable= function(){
					'step 0'
					var list=[];
					for(var i=1;i<7;i++){
						if((i==3||i==4)&&event.horse) continue;
						if(i==6&&!event.horse) continue;
						if(player.isDisabled(i)) continue;
						list.push('equip'+i);
					}
					if(!list.length) event.finish();
					else{			 		
				event.dialog = ui.create.div('.dialognewnew',ui.window);	
				event.dialog.isQingZheng = true;
				//_status.event.dialog = event.dialog;
				//_status.event.dialog.isQingZheng = true;
				event.dialog.isQingZheng = true;
				event.dialog.style.height = '250px';
				event.dialog.style.top = '110px';
				var eventtitle = ui.create.div('.newTitle1', event.dialog);    	
				ui.create.div('.jindutiaoxgxg', event.dialog);
                ui.create.div('.jindutiaoxgxgx', event.dialog);		
                var txt = ui.create.div('.Footerxxgg', event.dialog);		
                eventtitle.innerHTML = get.translation(event.getParent())+'<img src=' + lib.assetURL + 'extension/选将美化/assets/image/arrow.png' + ' style=width:30px;height:25px;margin-bottom:1px;left:2px;/>';
                if(!event.txt){
                txt.innerHTML = "你发动了<span style='color: #9FDCD1'>"+get.translation(event.getParent())+"</span>，须废除1个装备栏";
                }else{
                txt.innerHTML = event.txt;
                }              
                
          	if(event.horse){					
             var equip1 = ui.create.div('.feichuduihuakuangditu', event.dialog);	
             //equip1.style.left = '320px';
             equip1.style.left = 'calc(50% - 70px - 300px)';
             if(player.isDisabled(1)){ 
             equip1.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_feichu.png' + ' style=width:14px;;height:14px;margin-left:5px;/>武器区'; 
             equip1.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan1.png")';
             } else{
             equip1.innerHTML = '武器区';
             }                                      
             var equip2 = ui.create.div('.feichuduihuakuangditu', event.dialog);
             //equip2.style.left = '520px';
             equip2.style.left = 'calc(50% - 70px - 100px)';
              if(player.isDisabled(2)){
              equip2.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_feichu.png' + ' style=width:14px;height:14px;margin-left:5px;/>防具区';
              equip2.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan1.png")';
                }else{
              equip2.innerHTML = '防具区';
              }                         
             var equip6 = ui.create.div('.feichuduihuakuangditu', event.dialog);	
             //equip6.style.left = '720px'; 
             equip6.style.left = 'calc(50% - 70px + 100px)';
             if(player.isDisabled(6)){
              equip6.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_feichu.png' + ' style=width:14px;;height:14px;margin-left:5px;;/>坐骑区';
              equip6.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan1.png")';
                }else{
              equip6.innerHTML = '坐骑区'; 
              }                        
             var equip5 = ui.create.div('.feichuduihuakuangditu', event.dialog);	
             //equip5.style.left = '920px';    
             equip5.style.left = 'calc(50% - 70px + 300px)';        
             if(player.isDisabled(5)){
              equip5.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_feichu.png' + ' style=width:14px;;height:14px;margin-left:5px;;/>宝物区';
              equip5.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan1.png")';
                }else{
              equip5.innerHTML = '宝物区';  
              }
                    }else{
             var equip1 = ui.create.div('.feichuduihuakuangditu', event.dialog);	
             //equip1.style.left = '250px';
             equip1.style.left = 'calc(50% - 70px - 360px)';
             if(player.isDisabled(1)){ 
             equip1.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_feichu.png' + ' style=width:14px;;height:14px;margin-left:5px;/>武器区'; 
             equip1.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan1.png")';
             } else{
             equip1.innerHTML = '武器区';
             }                                      
             var equip2 = ui.create.div('.feichuduihuakuangditu', event.dialog);
             //equip2.style.left = '430px';
             equip2.style.left = 'calc(50% - 70px - 180px)';
              if(player.isDisabled(2)){
              equip2.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_feichu.png' + ' style=width:14px;height:14px;margin-left:5px;/>防具区';
              equip2.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan1.png")';
                }else{
              equip2.innerHTML = '防具区';
              }                         
             var equip3 = ui.create.div('.feichuduihuakuangditu', event.dialog);	
             //equip3.style.left = '610px'; 
             equip3.style.left = 'calc(50% - 70px)';
             if(player.isDisabled(3)){
              equip3.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_feichu.png' + ' style=width:14px;;height:14px;margin-left:5px;;/>防御马';
              equip3.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan1.png")';
                }else{
              equip3.innerHTML = '防御马'; 
              }                      
             var equip4 = ui.create.div('.feichuduihuakuangditu', event.dialog);	
             //equip4.style.left = '790px'; 
             equip4.style.left = 'calc(50% - 70px + 180px)';
             if(player.isDisabled(4)){
              equip4.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_feichu.png' + ' style=width:14px;;height:14px;margin-left:5px;;/>进攻马';
              equip4.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan1.png")';
                }else{
              equip4.innerHTML = '进攻马'; 
              }            
             var equip5 = ui.create.div('.feichuduihuakuangditu', event.dialog);	
             //equip5.style.left = '970px';            
             equip5.style.left = 'calc(50% - 70px + 360px)';
             if(player.isDisabled(5)){
              equip5.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_feichu.png' + ' style=width:14px;;height:14px;margin-left:5px;;/>宝物区';
              equip5.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan1.png")';
                }else{
              equip5.innerHTML = '宝物区';  
              }          
                    }
                    clickLog = [];
                    event.ok = ui.create.control('', function (evt) {
                    event.ok.style.transform = 'scale(0.9)';
                    setTimeout(function() {if(event.ok )event.ok.style.transform = 'scale(1)'; }, 50);
                    if (clickLog.length!= 1) return;                                     
                        event.cailick = clickLog;                     
                        ui.xjmhQingzhengNext();
                        game.resume2();
                    });                    
                    event.dialog.appendChild(event.ok);                   
                    event.ok.style.filter = 'grayscale(100%)';
                    event.ok.style.marginTop = '150px';
                    //event.ok.style.marginLeft = '-65px';                    
                    event.ok.style.marginLeft = '-75px';
                    event.ok.style.backgroundImage= 'url("' + lib.assetURL + 'extension/选将美化/assets/image/gbtn.png")';       
                    event.ok.style.backgroundSize = '90% 90%';
                    event.ok.style.backgroundRepeat = 'no-repeat';
                    equip1.onclick = function () {
                        if (player.isDisabled(1)) return;                       
                        if (clickLog.indexOf('equip1') == -1) {
                            if (clickLog.length >= 1) clickLog.shift();
                            clickLog.push('equip1');
                        } else {
                            clickLog.splice(clickLog.indexOf('equip1'), 1);
                        }
                        clickItem(this);
                    };
                    equip2.onclick = function () {
                        if (player.isDisabled(2)) return;
                        if (clickLog.indexOf('equip2') == -1) {
                            if (clickLog.length >= 1) clickLog.shift();
                            clickLog.push('equip2');
                        } else {
                            clickLog.splice(clickLog.indexOf('equip2'), 1);
                        }
                        clickItem(this);
                    };
                    equip5.onclick = function () {
                        if (player.isDisabled(5)) return;
                        if (clickLog.indexOf('equip5') == -1) {
                            if (clickLog.length >= 1) clickLog.shift();
                            clickLog.push('equip5');
                        } else {
                            clickLog.splice(clickLog.indexOf('equip5'), 1);
                        }
                        clickItem(this);
                    };   
                    	if(event.horse){          
                    	equip6.link = 'equip6';
                    equip6.onclick = function () {
                        if (player.isDisabled(6)) return;
                        if (clickLog.indexOf('equip6') == -1) {
                            if (clickLog.length >= 1) clickLog.shift();
                            clickLog.push('equip6');
                        } else {
                            clickLog.splice(clickLog.indexOf('equip6'), 1);
                        }
                        clickItem(this);                       
                    };                 
                    }else{                                     
                    equip4.link = 'equip4';
                    equip3.link = 'equip3';                    
                    equip3.onclick = function () {
                        if (player.isDisabled(3)) return;
                        if (clickLog.indexOf('equip3') == -1) {
                            if (clickLog.length >= 1) clickLog.shift();
                            clickLog.push('equip3');
                        } else {
                            clickLog.splice(clickLog.indexOf('equip3'), 1);
                        }
                        clickItem(this);                       
                    };
                       equip4.onclick = function () {
                        if (player.isDisabled(4)) return;
                        if (clickLog.indexOf('equip4') == -1) {
                            if (clickLog.length >= 1) clickLog.shift();
                            clickLog.push('equip4');
                        } else {
                            clickLog.splice(clickLog.indexOf('equip4'), 1);
                        }
                        clickItem(this);                       
                    };
                    }
                    equip1.link = 'equip1';
                    equip2.link = 'equip2';
                    equip5.link = 'equip5';                                       
				var clickItem = function (node) {
                        if (clickLog.indexOf('equip1') == -1 &&!player.isDisabled(1)) 
                        equip1.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan.png")';
                        if (clickLog.indexOf('equip2') == -1 && !player.isDisabled(2)) 
                        equip2.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan.png")';
                        if(event.horse){
                        if (clickLog.indexOf('equip6') == -1 && !player.isDisabled(6)) 
                        equip6.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan.png")';
                        }else{
                        if (clickLog.indexOf('equip3') == -1 && !player.isDisabled(3))
                        equip3.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan.png")';
                        if (clickLog.indexOf('equip4') == -1 && !player.isDisabled(4)) 
                        equip4.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan.png")';          
                        }                                            
                        if (clickLog.indexOf('equip5') == -1 && !player.isDisabled(5)) 
                        equip5.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan.png")';                       
                        if (clickLog.includes(node.link)) {
                            node.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbei_xuanzhong.png")';
                        } else {
                            node.style.backgroundImage = '';
                        }
                        if (clickLog.length == 1) {
                        event.ok.style.filter = 'none';  
                        } else {
                        event.ok.style.filter = 'grayscale(100%)';
                        }
                    }				   
                    event.clickLogAI = function () {                	
					if(!event.ai){clickLog = list.randomGet();}		
					else { clickLog = event.ai(event.getParent(),player,list)}		
                        return clickLog;                                               
                    }                    
				       // 暂停步骤
                    _status.imchoosing = true;               
                    game.pause2();
                    event.switchToAuto = function () {
                        event.cailick = event.clickLogAI();
                        event.dialog.close();
                        game.resume();
                    };                   
                    
                    if (game.isMine()) {
                        // event.dialog.open();
                    } else {
                        event.cailick = event.clickLogAI();
                        ui.xjmhQingzhengNext();
                        game.resume2();
                    }                    		
					}
					'step 1'
					//if(!event.cailick) return;
					if (event.cailick.indexOf('equip1') != -1) var result = 1;
                    if (event.cailick.indexOf('equip2') != -1) var result = 2;
                    if (event.cailick.indexOf('equip5') != -1) var result = 5;
                    if(event.horse){
                    if (event.cailick.indexOf('equip6') != -1) var result = [3,4];
                    }else{
                    if (event.cailick.indexOf('equip3') != -1) var result = 3;
                    if (event.cailick.indexOf('equip4') != -1) var result = 4;
                    }                                     					
                    if(event.cailick.indexOf('equip6') == -1){
                    player.disableEquip(result);
                    }else{
                    player.disableEquip(result[0]);
                    player.disableEquip(result[1]);}
                    if (event.dialog) event.dialog.remove();
                    if (event.ok) event.ok.remove();
                    event.dialog = null;
                    event.ok = null;
                     var con = 'equip'+result;                    
                    event.result={control:con};
				}
				//新的废除他人方案：
				//event\.filter\(\s*('equip\d')\s*\)
				//event\.filter\($1,player,event\.target\)
				lib.element.content.chooseToDisableTarget= function(){
					'step 0'
					if(!event.target) return false;
					var list=[];
					for(var i=1;i<7;i++){
						//if(event.filter&&!event.filter('equip'+i)) continue;
						if((i==3||i==4)&&event.horse) continue;
						if(i==6&&!event.horse) continue;
						if(event.target.isDisabled(i)) continue;
						list.push('equip'+i);
					}
					if(!list.length) event.finish();
					else{			 		
				event.dialog = ui.create.div('.dialognewnew',ui.window);	
				event.dialog.isQingZheng = true;
				event.dialog.style.height = '250px';
				event.dialog.style.top = '110px';
				var eventtitle = ui.create.div('.newTitle1', event.dialog);    	
				ui.create.div('.jindutiaoxgxg', event.dialog);
                ui.create.div('.jindutiaoxgxgx', event.dialog);		
                var txt = ui.create.div('.Footerxxgg', event.dialog);		
                eventtitle.innerHTML = get.translation(event.getParent())+'<img src=' + lib.assetURL + 'extension/选将美化/assets/image/arrow.png' + ' style=width:30px;height:25px;margin-bottom:1px;left:2px;/>';
                if(!event.txt){
                txt.innerHTML = "你发动了<span style='color: #9FDCD1'>"+get.translation(event.getParent())+"</span>，须废除"+get.translation(event.target)+"1个装备栏";
                }else{
                txt.innerHTML = event.txt;
                }              
                
          	if(event.horse){					
             var equip1 = ui.create.div('.feichuduihuakuangditu', event.dialog);	
             //equip1.style.left = '320px';
             equip1.style.left = 'calc(50% - 70px - 300px)';
             if(event.target.isDisabled(1)||(event.filter&&!event.filter('equip1',player,event.target))){ 
             equip1.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_feichu.png' + ' style=width:14px;;height:14px;margin-left:5px;/>武器区'; 
             equip1.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan1.png")';
             } else{
             equip1.innerHTML = '武器区';
             }                                      
             var equip2 = ui.create.div('.feichuduihuakuangditu', event.dialog);
             //equip2.style.left = '520px';
             equip2.style.left = 'calc(50% - 70px - 100px)';
              if(event.target.isDisabled(2)||(event.filter&&!event.filter('equip2',player,event.target))){
              equip2.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_feichu.png' + ' style=width:14px;height:14px;margin-left:5px;/>防具区';
              equip2.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan1.png")';
                }else{
              equip2.innerHTML = '防具区';
              }                         
             var equip6 = ui.create.div('.feichuduihuakuangditu', event.dialog);	
             //equip6.style.left = '720px'; 
             equip6.style.left = 'calc(50% - 70px + 100px)';
             if(event.target.isDisabled(6)||(event.filter&&!event.filter('equip6',player,event.target))){
              equip6.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_feichu.png' + ' style=width:14px;;height:14px;margin-left:5px;;/>坐骑区';
              equip6.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan1.png")';
                }else{
              equip6.innerHTML = '坐骑区'; 
              }                        
             var equip5 = ui.create.div('.feichuduihuakuangditu', event.dialog);	
             //equip5.style.left = '920px';    
             equip5.style.left = 'calc(50% - 70px + 300px)';        
             if(event.target.isDisabled(5)||(event.filter&&!event.filter('equip5',player,event.target))){
              equip5.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_feichu.png' + ' style=width:14px;;height:14px;margin-left:5px;;/>宝物区';
              equip5.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan1.png")';
                }else{
              equip5.innerHTML = '宝物区';  
              }
                    }else{
             var equip1 = ui.create.div('.feichuduihuakuangditu', event.dialog);	
             //equip1.style.left = '250px';
             equip1.style.left = 'calc(50% - 70px - 360px)';
             if(event.target.isDisabled(1)||(event.filter&&!event.filter('equip1',player,event.target))){ 
             equip1.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_feichu.png' + ' style=width:14px;;height:14px;margin-left:5px;/>武器区'; 
             equip1.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan1.png")';
             } else{
             equip1.innerHTML = '武器区';
             }                                      
             var equip2 = ui.create.div('.feichuduihuakuangditu', event.dialog);
             //equip2.style.left = '430px';
             equip2.style.left = 'calc(50% - 70px - 180px)';
              if(event.target.isDisabled(2)||(event.filter&&!event.filter('equip2',player,event.target))){
              equip2.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_feichu.png' + ' style=width:14px;height:14px;margin-left:5px;/>防具区';
              equip2.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan1.png")';
                }else{
              equip2.innerHTML = '防具区';
              }                         
             var equip3 = ui.create.div('.feichuduihuakuangditu', event.dialog);	
             //equip3.style.left = '610px'; 
             equip3.style.left = 'calc(50% - 70px)';
             if(event.target.isDisabled(3)||(event.filter&&!event.filter('equip3',player,event.target))){
              equip3.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_feichu.png' + ' style=width:14px;;height:14px;margin-left:5px;;/>防御马';
              equip3.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan1.png")';
                }else{
              equip3.innerHTML = '防御马'; 
              }                      
             var equip4 = ui.create.div('.feichuduihuakuangditu', event.dialog);	
             //equip4.style.left = '790px'; 
             equip4.style.left = 'calc(50% - 70px + 180px)';
             if(event.target.isDisabled(4)||(event.filter&&!event.filter('equip4',player,event.target))){
              equip4.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_feichu.png' + ' style=width:14px;;height:14px;margin-left:5px;;/>进攻马';
              equip4.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan1.png")';
                }else{
              equip4.innerHTML = '进攻马'; 
              }            
             var equip5 = ui.create.div('.feichuduihuakuangditu', event.dialog);	
             //equip5.style.left = '970px';            
             equip5.style.left = 'calc(50% - 70px + 360px)';
             if(event.target.isDisabled(5)||(event.filter&&!event.filter('equip5',player,event.target))){
              equip5.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_feichu.png' + ' style=width:14px;;height:14px;margin-left:5px;;/>宝物区';
              equip5.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan1.png")';
                }else{
              equip5.innerHTML = '宝物区';  
              }          
                    }
                    clickLog = [];
                    event.ok = ui.create.control('', function (evt) {
                    event.ok.style.transform = 'scale(0.9)';
                    setTimeout(function() {if(event.ok )event.ok.style.transform = 'scale(1)'; }, 50);
                    if (clickLog.length!= 1) return;                                     
                        event.cailick = clickLog;                     
                        ui.xjmhQingzhengNext();
                        game.resume2();
                    });                    
                    event.dialog.appendChild(event.ok);                   
                    event.ok.style.filter = 'grayscale(100%)';
                    event.ok.style.marginTop = '150px';
                    //event.ok.style.marginLeft = '-65px';                    
                    event.ok.style.marginLeft = '-75px';
                    event.ok.style.backgroundImage= 'url("' + lib.assetURL + 'extension/选将美化/assets/image/gbtn.png")';       
                    event.ok.style.backgroundSize = '90% 90%';
                    event.ok.style.backgroundRepeat = 'no-repeat';
                    equip1.onclick = function () {
                        if (event.target.isDisabled(1)||(event.filter&&!event.filter('equip1',player,event.target))) return;                       
                        if (clickLog.indexOf('equip1') == -1) {
                            if (clickLog.length >= 1) clickLog.shift();
                            clickLog.push('equip1');
                        } else {
                            clickLog.splice(clickLog.indexOf('equip1'), 1);
                        }
                        clickItem(this);
                    };
                    equip2.onclick = function () {
                        if (event.target.isDisabled(2)||(event.filter&&!event.filter('equip2',player,event.target))) return;
                        if (clickLog.indexOf('equip2') == -1) {
                            if (clickLog.length >= 1) clickLog.shift();
                            clickLog.push('equip2');
                        } else {
                            clickLog.splice(clickLog.indexOf('equip2'), 1);
                        }
                        clickItem(this);
                    };
                    equip5.onclick = function () {
                        if (event.target.isDisabled(5)||(event.filter&&!event.filter('equip5',player,event.target))) return;
                        if (clickLog.indexOf('equip5') == -1) {
                            if (clickLog.length >= 1) clickLog.shift();
                            clickLog.push('equip5');
                        } else {
                            clickLog.splice(clickLog.indexOf('equip5'), 1);
                        }
                        clickItem(this);
                    };   
                    	if(event.horse){          
                    	equip6.link = 'equip6';
                    equip6.onclick = function () {
                        if (event.target.isDisabled(6)||(event.filter&&!event.filter('equip6',player,event.target))) return;
                        if (clickLog.indexOf('equip6') == -1) {
                            if (clickLog.length >= 1) clickLog.shift();
                            clickLog.push('equip6');
                        } else {
                            clickLog.splice(clickLog.indexOf('equip6'), 1);
                        }
                        clickItem(this);                       
                    };                 
                    }else{                                     
                    equip4.link = 'equip4';
                    equip3.link = 'equip3';                    
                    equip3.onclick = function () {
                        if (event.target.isDisabled(3)||(event.filter&&!event.filter('equip3',player,event.target))) return;
                        if (clickLog.indexOf('equip3') == -1) {
                            if (clickLog.length >= 1) clickLog.shift();
                            clickLog.push('equip3');
                        } else {
                            clickLog.splice(clickLog.indexOf('equip3'), 1);
                        }
                        clickItem(this);                       
                    };
                       equip4.onclick = function () {
                        if (event.target.isDisabled(4)||(event.filter&&!event.filter('equip4',player,event.target))) return;
                        if (clickLog.indexOf('equip4') == -1) {
                            if (clickLog.length >= 1) clickLog.shift();
                            clickLog.push('equip4');
                        } else {
                            clickLog.splice(clickLog.indexOf('equip4'), 1);
                        }
                        clickItem(this);                       
                    };
                    }
                    equip1.link = 'equip1';
                    equip2.link = 'equip2';
                    equip5.link = 'equip5';                                       
				var clickItem = function (node) {
                        if (clickLog.indexOf('equip1') == -1 &&!event.target.isDisabled(1)&&(!event.filter||event.filter('equip1',player,event.target))) 
                        equip1.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan.png")';
                        if (clickLog.indexOf('equip2') == -1 && !event.target.isDisabled(2)&&(!event.filter||event.filter('equip2',player,event.target))) 
                        equip2.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan.png")';
                        if(event.horse){
                        if (clickLog.indexOf('equip6') == -1 && !event.target.isDisabled(6)&&(!event.filter||event.filter('equip6',player,event.target))) 
                        equip6.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan.png")';
                        }else{
                        if (clickLog.indexOf('equip3') == -1 && !event.target.isDisabled(3)&&(!event.filter||event.filter('equip3',player,event.target)))
                        equip3.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan.png")';
                        if (clickLog.indexOf('equip4') == -1 && !event.target.isDisabled(4)&&(!event.filter||event.filter('equip4',player,event.target))) 
                        equip4.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan.png")';          
                        }                                            
                        if (clickLog.indexOf('equip5') == -1 && !event.target.isDisabled(5)&&(!event.filter||event.filter('equip5',player,event.target))) 
                        equip5.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan.png")';                       
                        if (clickLog.includes(node.link)) {
                            node.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbei_xuanzhong.png")';
                        } else {
                            node.style.backgroundImage = '';
                        }
                        if (clickLog.length == 1) {
                        event.ok.style.filter = 'none';  
                        } else {
                        event.ok.style.filter = 'grayscale(100%)';
                        }
                    }				   
                    event.clickLogAI = function () {                	
					if(!event.ai){clickLog = list.randomGet();}		
					else { clickLog = event.ai(event.getParent(),player,list)}		
                        return clickLog;                                               
                    }                    
				       // 暂停步骤
                    _status.imchoosing = true;               
                    game.pause2();
                    event.switchToAuto = function () {
                        event.cailick = event.clickLogAI();
                        event.dialog.close();
                        game.resume();
                    };                   
                    
                    if (game.isMine()) {
                        // event.dialog.open();
                    } else {
                        event.cailick = event.clickLogAI();
                        ui.xjmhQingzhengNext();
                        game.resume2();
                    }                    		
					}
					'step 1'
					//if(!event.cailick) return;
					if (event.cailick.indexOf('equip1') != -1) var result = 1;
                    if (event.cailick.indexOf('equip2') != -1) var result = 2;
                    if (event.cailick.indexOf('equip5') != -1) var result = 5;
                    if(event.horse){
                    if (event.cailick.indexOf('equip6') != -1) var result = [3,4];
                    }else{
                    if (event.cailick.indexOf('equip3') != -1) var result = 3;
                    if (event.cailick.indexOf('equip4') != -1) var result = 4;
                    }                                     					
                    if(event.cailick.indexOf('equip6') == -1){
                    event.target.disableEquip(result);
                    }else{
                    event.target.disableEquip(result[0]);
                    event.target.disableEquip(result[1]);}
                    if (event.dialog) event.dialog.remove();
                    if (event.ok) event.ok.remove();
                    event.dialog = null;
                    event.ok = null;
                     var con = 'equip'+result;                    
                    event.result={control:con};
				}
				
				       //恢复装备栏♣️         
    lib.element.content.chooseToEnable = function(){
					'step 0'
					var list=[];
					for(var i=1;i<6;i++){
						if(!player.isDisabled(i)) continue;
						list.push('equip'+i);
					}
					if(!list.length) event.finish();
					else{
				event.dialog = ui.create.div('.dialognewnew',ui.window);	
				event.dialog.isQingZheng = true;
				event.dialog.style.height = '250px';
				event.dialog.style.top = '110px';
				var eventtitle = ui.create.div('.newTitle1', event.dialog);    	
				ui.create.div('.jindutiaoxgxg', event.dialog);
                ui.create.div('.jindutiaoxgxgx', event.dialog);		
                var txt = ui.create.div('.Footerxxgg', event.dialog);		
                eventtitle.innerHTML = get.translation(event.getParent())+'<img src=' + lib.assetURL + 'extension/选将美化/assets/image/arrow.png' + ' style=width:30px;height:25px;margin-bottom:1px;left:2px;/>';
                if(!event.txt){
                txt.innerHTML = "你发动了<span style='color: #9FDCD1'>"+get.translation(event.getParent())+"</span>，恢复1个装备栏";
                }else{
                txt.innerHTML = event.txt;
                }              
			var equip1 = ui.create.div('.feichuduihuakuangditux', event.dialog);	
             //equip1.style.left = '250px';
             equip1.style.left = 'calc(50% - 70px - 360px)';
             if(!player.isDisabled(1)){ 
             equip1.innerHTML = '武器区';
             equip1.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan.png")';
             } else{             
             equip1.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_feichu.png' + ' style=width:14px;;height:14px;margin-left:5px;/>武器区'; 
             }                                      
             var equip2 = ui.create.div('.feichuduihuakuangditux', event.dialog);
             //equip2.style.left = '430px';
             equip2.style.left = 'calc(50% - 70px - 180px)';
              if(!player.isDisabled(2)){
              equip2.innerHTML = '防具区';
              equip2.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan.png")';
                }else{              
              equip2.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_feichu.png' + ' style=width:14px;height:14px;margin-left:5px;/>防具区';
              }                         
             var equip3 = ui.create.div('.feichuduihuakuangditux', event.dialog);	
             //equip3.style.left = '610px'; 
             equip3.style.left = 'calc(50% - 70px)';
             if(!player.isDisabled(3)){
              equip3.innerHTML = '防御马';               
              equip3.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan.png")';
                }else{
              equip3.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_feichu.png' + ' style=width:14px;;height:14px;margin-left:5px;;/>防御马';
              }                      
             var equip4 = ui.create.div('.feichuduihuakuangditux', event.dialog);	
             //equip4.style.left = '790px'; 
             equip4.style.left = 'calc(50% - 70px + 180px)';
             if(!player.isDisabled(4)){
              equip4.innerHTML = '进攻马';
              equip4.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan.png")';
                }else{             
              equip4.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_feichu.png' + ' style=width:14px;;height:14px;margin-left:5px;;/>进攻马';
              }            
             var equip5 = ui.create.div('.feichuduihuakuangditux', event.dialog);	
             //equip5.style.left = '970px';     
             equip5.style.left = 'calc(50% - 70px + 360px)';       
             if(!player.isDisabled(5)){
              equip5.innerHTML = '宝物区';
              equip5.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan.png")';
                }else{              
              equip5.innerHTML = '<img src=' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_feichu.png' + ' style=width:14px;;height:14px;margin-left:5px;;/>宝物区';
              }	
			  clickLog = [];
                    event.ok = ui.create.control('', function (evt) {
                    event.ok.style.transform = 'scale(0.9)';
                    setTimeout(function() {if(event.ok )event.ok.style.transform = 'scale(1)'; }, 50);
                    if (clickLog.length!= 1) return;                                     
                        event.cailick = clickLog;                     
                        ui.xjmhQingzhengNext();
                        game.resume2();
                    });                    
                    event.dialog.appendChild(event.ok);                   
                    event.ok.style.filter = 'grayscale(100%)';
                    event.ok.style.marginTop = '150px';
                    //event.ok.style.marginLeft = '-65px'; 
                    event.ok.style.marginLeft = '-75px';                   
                    event.ok.style.backgroundImage= 'url("' + lib.assetURL + 'extension/选将美化/assets/image/gbtn.png")';       
                    event.ok.style.backgroundSize = '90% 90%';
                    event.ok.style.backgroundRepeat = 'no-repeat';
                    equip1.onclick = function () {
                        if (!player.isDisabled(1)) return;                       
                        if (clickLog.indexOf('equip1') == -1) {
                            if (clickLog.length >= 1) clickLog.shift();
                            clickLog.push('equip1');
                        } else {
                            clickLog.splice(clickLog.indexOf('equip1'), 1);
                        }
                        clickItem(this);
                    };
                    equip2.onclick = function () {
                        if (!player.isDisabled(2)) return;
                        if (clickLog.indexOf('equip2') == -1) {
                            if (clickLog.length >= 1) clickLog.shift();
                            clickLog.push('equip2');
                        } else {
                            clickLog.splice(clickLog.indexOf('equip2'), 1);
                        }
                        clickItem(this);
                    };
                    equip5.onclick = function () {
                        if (!player.isDisabled(5)) return;
                        if (clickLog.indexOf('equip5') == -1) {
                            if (clickLog.length >= 1) clickLog.shift();
                            clickLog.push('equip5');
                        } else {
                            clickLog.splice(clickLog.indexOf('equip5'), 1);
                        }
                        clickItem(this);
                    };
                    equip3.onclick = function () {
                        if (!player.isDisabled(3)) return;
                        if (clickLog.indexOf('equip3') == -1) {
                            if (clickLog.length >= 1) clickLog.shift();
                            clickLog.push('equip3');
                        } else {
                            clickLog.splice(clickLog.indexOf('equip3'), 1);
                        }
                        clickItem(this);                       
                    };
                       equip4.onclick = function () {
                        if (!player.isDisabled(4)) return;
                        if (clickLog.indexOf('equip4') == -1) {
                            if (clickLog.length >= 1) clickLog.shift();
                            clickLog.push('equip4');
                        } else {
                            clickLog.splice(clickLog.indexOf('equip4'), 1);
                        }
                        clickItem(this);                       
                    };
                    
                    equip1.link = 'equip1';
                    equip2.link = 'equip2';
                    equip4.link = 'equip4';
                    equip3.link = 'equip3';    
                    equip5.link = 'equip5';                   	
				var clickItem = function (node) {
                        if (clickLog.indexOf('equip1') == -1 &&player.isDisabled(1)) 
                        equip1.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan1.png")';
                        if (clickLog.indexOf('equip2') == -1 && player.isDisabled(2)) 
                        equip2.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan1.png")';
                        if(event.horse){
                        if (clickLog.indexOf('equip6') == -1 && player.isDisabled(6)) 
                        equip6.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan1.png")';
                        }else{
                        if (clickLog.indexOf('equip3') == -1 && player.isDisabled(3))
                        equip3.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan1.png")';
                        if (clickLog.indexOf('equip4') == -1 && player.isDisabled(4)) 
                        equip4.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan1.png")';          
                        }                                            
                        if (clickLog.indexOf('equip5') == -1 && player.isDisabled(5)) 
                        equip5.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbeilan1.png")';                      
                        if (clickLog.includes(node.link)) {
                            node.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/PJ_skill_zhuangbei_xuanzhong1.png")';
                        } else {
                            node.style.backgroundImage = '';
                        }
                        if (clickLog.length == 1) {
                        event.ok.style.filter = 'none';  
                        } else {
                        event.ok.style.filter = 'grayscale(100%)';
                        }
                    }
				event.clickLogAI = function () {                	
					if(!event.ai){clickLog = list.randomGet();}		
					else { clickLog = event.ai(event.getParent(),player,list)}		
                        return clickLog;                                               
                    }                    
				       // 暂停步骤
                    _status.imchoosing = true;               
                    game.pause2();
                    event.switchToAuto = function () {
                        event.cailick = event.clickLogAI();
                        event.dialog.close();
                        game.resume();
                    };                                     
                    if (game.isMine()) {
                        // event.dialog.open();
                    } else {
                        event.cailick = event.clickLogAI();
                        ui.xjmhQingzhengNext();
                        game.resume2();
                    }													
					}
					'step 1'
					//if(!event.cailick) return;
					if (event.cailick.indexOf('equip1') != -1) var result = 1;
                    if (event.cailick.indexOf('equip2') != -1) var result = 2;
                    if (event.cailick.indexOf('equip5') != -1) var result = 5;
                    if (event.cailick.indexOf('equip3') != -1) var result = 3;
                    if (event.cailick.indexOf('equip4') != -1) var result = 4;			
                    player.enableEquip(result);                                      
                     var con = 'equip'+result;                    
                    event.result={control:con};
					if (event.dialog) event.dialog.remove();
                    if (event.ok) event.ok.remove();
                    event.dialog = null;
                    event.ok = null;					
				}
}
 if (config.shuzianniu) { 
     //魏延 奇谋
    lib.skill.qimou = {
        unique: true,
        limited: true,
        audio: 2,
        // enable: "phaseUse",
        // filter: function(event, player) {
            // return !player.storage.qimou;
        // },
        isEnable:true,
        init: function(player) {
            player.storage.qimou = false;
        },
        mark: true,
        intro: {
            content: "limited",
        },
        skillAnimation: true,
        animationColor: "orange",
        content: function() {
            'step 0'
            // var shas = player.getCards('h', 'sha');
            // var num;
            // if (player.hp >= 4 && shas.length >= 3) {
                // num = 3;
            // } else if (player.hp >= 3 && shas.length >= 2) {
                // num = 2;
            // } else {
                // num = 1
            // }
            // var map = {};
            // var list = [];
            // for (var i = 1; i <= player.hp; i++) {
                // var cn = get.cnNumber(i, true);
                // map[cn] = i;
                // list.push(cn);
            // }
            // event.map = map;
            // player.awakenSkill('qimou');
            // player.storage.qimou = true;
            // player.chooseControl(list, function() {
                // return get.cnNumber(_status.event.goon, true);
            // })
                // .set('prompt', '失去任意点体力')
                // .set('goon', num);
            'step 1'
            // var num = event.map[result.control] || 1;
            // player.storage.qimou2 = num;
            // player.loseHp(num);
            player.awakenSkill('qimou');
            player.storage.qimou = true ,
            player.addTempSkill('qimou2');
            player.storage.qimou_mark = '';           
            player.addTempSkill("qimou_mark");
            player.markSkill("qimou_mark", '', '奇谋 ' + player.storage.qimou2);
        },
        group:"qimou_m2",
        subSkill: {mark: {intro: {},sub: true,},
        m2: {
                    enable: "phaseUse",                    
                    direct: true,
                    filter: function(event, player) {
                       return !player.storage.qimou;
                },
                    content: function() {
                    'step 0'                    
             window.shuzibg = ui.create.div('.shuzibgxx', document.body);
                if(window.shoushaBlanks) window.shoushaBlanks.add(window.shuzibg);
             var leftBtn = ui.create.div('.shuzijianhao', window.shuzibg);
                 leftBtn.style.filter = 'grayscale(100%)';
             var rightBtn = ui.create.div('.shuzijiahao', window.shuzibg);
             var chooseType = ui.create.div('.shuzixx', window.shuzibg);
                     var index = 0;                     
                     var list=[];
                    for (var i = 1; i <= player.hp; i++) {list.push(i)}               
                     chooseType.innerHTML = list[index];
              player.storage.qimou2 = index + 1;                          
             leftBtn.listen(function () {
              if (index ==  0) return;
                index--;
              leftBtn.style.transform = 'scale(0.7)';
              setTimeout(function() {leftBtn.style.transform = 'scale(1)'; }, 200);
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= player.hp) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';
              chooseType.innerHTML = list[index];
              player.storage.qimou2 = index + 1;     
              });              
              rightBtn.listen(function () {
              if (index == player.hp-1) return;
                  index++;
              rightBtn.style.transform = 'scale(0.7)';
              setTimeout(function() {rightBtn.style.transform = 'scale(1)'; }, 200);    
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= player.hp-1) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';
              chooseType.innerHTML = list[index];
              player.storage.qimou2 = index + 1;    
              });                                       
              //if(game.me != player){
              if(!game.isMine()) {
              var shas = player.getCards('h', 'sha');
              var num;
            if (player.hp >= 4 && shas.length >= 3) {
                num = 3;
            } else if (player.hp >= 3 && shas.length >= 2) {
                num = 2;
            } else {
                num = 1
            }
            player.storage.qimou2 = num;
              }
              player.chooseBool('是否发动【奇谋】失去任意点体力')
              .set('ai', function() {return true;});
                    'step 1'
              if (!result.bool) {
              event.finish();                           
              }else{              
              player.loseHp(player.storage.qimou2);             
              player.useSkill('qimou');
              }      
              window.shuzibg.remove();      
              window.shuzibg = null;
                    },
            ai: {
            order: 5,
            result: {
                player: function(player) {
                    if (player.hp == 1) return 0;
                    var shas = player.getCards('h', 'sha');
                    if (!shas.length) return 0;
                    var card = shas[0];
                    if (!lib.filter.cardEnabled(card, player)) return 0;
                    if (lib.filter.cardUsable(card, player)) return 0;
                    var mindist;
                    if (player.hp >= 4 && shas.length >= 3) {
                        mindist = 4;
                    } else if (player.hp >= 3 && shas.length >= 2) {
                        mindist = 3;
                    } else {
                        mindist = 2;
                    }
                    if (game.hasPlayer(function(current) {
                        return (current.hp <= mindist - 1 && get.distance(player, current, 'attack') <= mindist && player.canUse(card, current, false) && get.effect(current, card, player, player) > 0);
                    })) {
                        return 1;
                    }
                    return 0;
                },
            },
        },
                },           
        },
    }
    
    //界魏延 奇谋
    lib.skill.reqimou = {
        unique: true,
        limited: true,
        audio: 2,
        // enable: "phaseUse",
        // filter: function(event, player) {
            // return !player.storage.reqimou;
        // },
        init: function(player) {
            player.storage.reqimou = false;           
        },
        isEnable:true,
        mark: true,
        intro: {
            content: "limited",
        },
        skillAnimation: true,
        animationColor: "orange",
        content: function() {
            'step 0'
            // var shas = player.getCards('h', 'sha');
            // var num;
            // if (player.hp >= 4 && shas.length >= 3) {
                // num = 3;
            // } else if (player.hp >= 3 && shas.length >= 2) {
                // num = 2;
            // } else {
                // num = 1
            // }
            // var map = {};
            // var list = [];
            // for (var i = 1; i <= player.hp; i++) {
                // var cn = get.cnNumber(i, true);
                // map[cn] = i;
                // list.push(cn);
            // }
            // event.map = map;
            // player.awakenSkill('reqimou');
            // player.storage.reqimou = true;
            // player.chooseControl(list, function() {
                // return get.cnNumber(_status.event.goon, true);
            // })
                // .set('prompt', '失去任意点体力')
                // .set('goon', num);
            'step 1'
            // var num = event.map[result.control] || 1;
            // player.storage.reqimou2 = num;
            // player.loseHp(num);
            player.awakenSkill('reqimou');
            player.storage.reqimou = true;
            player.draw(player.storage.reqimou2);
            player.addTempSkill('reqimou2');
            player.storage.reqimou_mark = '';          
            player.addTempSkill("reqimou_mark");
            player.markSkill("reqimou_mark", '', '奇谋 ' + player.storage.reqimou2);
        },
        group:"reqimou_m2",
        subSkill: {mark: {intro: {},sub: true,},
               m2: {
                    enable: "phaseUse",                    
                    direct: true,
                    filter: function(event, player) {
                       return !player.storage.reqimou;
                },
                    content: function() {
                    'step 0'                    
             window.shuzibg = ui.create.div('.shuzibgxx', document.body);
                if(window.shoushaBlanks) window.shoushaBlanks.add(window.shuzibg);
             var leftBtn = ui.create.div('.shuzijianhao', window.shuzibg);
                 leftBtn.style.filter = 'grayscale(100%)';
             var rightBtn = ui.create.div('.shuzijiahao', window.shuzibg);
             var chooseType = ui.create.div('.shuzixx', window.shuzibg);
                     var index = 0;                     
                     var list=[];
                    for (var i = 1; i <= player.hp; i++) {list.push(i)}               
                     chooseType.innerHTML = list[index];
              player.storage.reqimou2 = index + 1;                          
              leftBtn.listen(function () {
              if (index ==  0) return;
              leftBtn.style.transform = 'scale(0.7)';
              setTimeout(function() {leftBtn.style.transform = 'scale(1)'; }, 200);
                index--;
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= player.hp) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';
              chooseType.innerHTML = list[index];
              player.storage.reqimou2 = index + 1;     
              });              
              rightBtn.listen(function () {
              if (index == player.hp-1) return;
              rightBtn.style.transform = 'scale(0.7)';
              setTimeout(function() {rightBtn.style.transform = 'scale(1)'; }, 200);
                  index++;
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= player.hp-1) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';
              chooseType.innerHTML = list[index];
              player.storage.reqimou2 = index + 1;    
              });                                       
              //if(game.me != player){
              if(!game.isMine()) {
              var shas = player.getCards('h', 'sha');
              var num;
            if (player.hp >= 4 && shas.length >= 3) {
                num = 3;
            } else if (player.hp >= 3 && shas.length >= 2) {
                num = 2;
            } else {
                num = 1
            }
            player.storage.reqimou2 = num;
              }
              player.chooseBool('是否发动【奇谋】失去任意点体力')
              .set('ai', function() {return true;});
                    'step 1'
              if (!result.bool) {
              event.finish();                            
              }else{              
              player.loseHp(player.storage.reqimou2);        
              player.useSkill('reqimou');
              }      
              window.shuzibg.remove();      
              window.shuzibg = null;
                    },
            ai: {
            order: 5,
            result: {
                player: function(player) {
                    if (player.hp == 1) return 0;
                    var shas = player.getCards('h', 'sha');
                    if (!shas.length) return 0;
                    var card = shas[0];
                    if (!lib.filter.cardEnabled(card, player)) return 0;
                    if (lib.filter.cardUsable(card, player)) return 0;
                    var mindist;
                    if (player.hp >= 4 && shas.length >= 3) {
                        mindist = 4;
                    } else if (player.hp >= 3 && shas.length >= 2) {
                        mindist = 3;
                    } else {
                        mindist = 2;
                    }
                    if (game.hasPlayer(function(current) {
                        return (current.hp <= mindist - 1 && get.distance(player, current, 'attack') <= mindist && player.canUse(card, current, false) && get.effect(current, card, player, player) > 0);
                    })) {
                        return 1;
                    }
                    return 0;
                },
            },
        },
                },           
        },
    }
//谋曹操 奸雄    
    lib.skill.sbjianxiong = {
    audio:2,
    trigger:{
        player:"damageEnd",
    },
    group:"sbjianxiong_mark",
    filter:function(event,player){
        return get.itemtype(event.cards)=='cards'&&event.cards.some(i=>get.position(i,true)=='o')||1-player.countMark('sbjianxiong')>0;
    },
    "prompt2":function(event,player){
        var gain=get.itemtype(event.cards)=='cards'&&event.cards.some(i=>get.position(i,true)=='o'),draw=1-player.countMark('sbjianxiong');
        var str='';
        if(gain) str+='获得'+get.translation(event.cards);
        if(gain&&draw>0) str+='并';
        if(draw>0) str+='摸'+get.cnNumber(1-player.countMark('sbjianxiong'))+'张牌';
        if(player.countMark('sbjianxiong')) str+='，然后可以弃1枚“治世”';
        return str;
    },
    content:function(){
        'step 0'
        if(get.itemtype(trigger.cards)=='cards'&&trigger.cards.some(i=>get.position(i,true)=='o')){
            player.gain(trigger.cards,'gain2');
        }
        var num=player.countMark('sbjianxiong');
        if(1-num>0){
            player.draw(1-num,'nodelay');
        }
        if(!num) event.finish();
        'step 1'
        player.chooseBool('是否弃1枚“治世”？').set('ai',()=>{
            var player=_status.event.player,current=_status.currentPhase;
            if(get.distance(current,player,'absolute')>3&&player.hp<=2) return true;
            return false;
        });
        'step 2'
        if(result.bool){
            player.removeMark('sbjianxiong',1);
        }
    },
    ai:{
        maixie:true,
        "maixie_hp":true,
        effect:{
            target:function(card,player,target){
                if(player.hasSkillTag('jueqing',false,target)) return [1,-1];
                if(get.tag(card,'damage')&&player!=target){
                    var cards=card.cards,evt=_status.event;
                    if(evt.player==target&&card.name=='damage'&&evt.getParent().type=='card') cards=evt.getParent().cards.filterInD();
                    if(target.hp<=1) return;
                    if(get.itemtype(cards)!='cards') return;
                    for(var i of cards){
                        if(get.name(i,target)=='tao') return [1,5];
                    }
                    if(get.value(cards,target)>=(7+target.getDamagedHp())) return [1,3];
                    return [1,0.55+0.05*Math.max(0,1-target.countMark('sbjianxiong'))];
                }
            },
        },
    },
    marktext:"治世",
    intro:{
        name:"治世",
        "name2":"治世",
        content:"mark",
    },
    subSkill:{
        mark:{
            audio:"sbjianxiong",
            trigger:{
                global:"phaseBefore",
                player:"enterGame",
            },
            forced:true,
            filter:function(event,player){
                return (event.name!='phase'||game.phaseNumber==0);
            },
            content:function(){
                'step 0'
                window.shuzibg = ui.create.div('.shuzibgxx', document.body);
                if(window.shoushaBlanks) window.shoushaBlanks.add(window.shuzibg);
             var leftBtn = ui.create.div('.shuzijianhao', window.shuzibg);
                 leftBtn.style.filter = 'grayscale(100%)';
             var rightBtn = ui.create.div('.shuzijiahao', window.shuzibg);
             var chooseType = ui.create.div('.shuzixx', window.shuzibg);
                     var index = 2;                     
                     var list=[0,1,2];                  
                     chooseType.innerHTML = list[index];
              player.storage.sbjianxiong_mark = index;         
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= 2) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';                  
             leftBtn.listen(function () {
              if (index ==  0) return;
                index--;
              leftBtn.style.transform = 'scale(0.7)';
              setTimeout(function() {leftBtn.style.transform = 'scale(1)'; }, 200);
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= 2) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';
              chooseType.innerHTML = list[index];
              player.storage.sbjianxiong_mark = index;     
              });              
              rightBtn.listen(function () {
              if (index == 2) return;
                  index++;
              rightBtn.style.transform = 'scale(0.7)';
              setTimeout(function() {rightBtn.style.transform = 'scale(1)'; }, 200);    
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= 2) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';
              chooseType.innerHTML = list[index];
              player.storage.sbjianxiong_mark = index;    
              });                     
              player.chooseBool('是否发动【奸雄】，获得至多2个【治世】标记')
              .set('ai', function() {return true;});                  
                'step 1'
              if (!result.bool) {
              event.finish();                           
              }else{                   
              if (player.storage.sbjianxiong_mark) player.addMark('sbjianxiong',player.storage.sbjianxiong_mark);
              }      
              window.shuzibg.remove();      
              window.shuzibg = null;
                    },                           
            sub:true,
            parentskill:"sbjianxiong",
        },
    },
}

//牛辅董翓
lib.skill.twxiafeng = {
    audio:2,
    trigger:{
        player:"phaseUseBegin",
    },
    filter:function(event,player){
        return player.countMark('baonvezhi')>0;
    },
    init:function(player){lib.skill.baonvezhi.change(player,0)},
    direct:true,
    content:function(){
        'step 0'
             window.shuzibg = ui.create.div('.shuzibgxx', document.body);
                if(window.shoushaBlanks) window.shoushaBlanks.add(window.shuzibg);
             var leftBtn = ui.create.div('.shuzijianhao', window.shuzibg);
                 leftBtn.style.filter = 'grayscale(100%)';
             var rightBtn = ui.create.div('.shuzijiahao', window.shuzibg);
             var chooseType = ui.create.div('.shuzixx', window.shuzibg);
             var index = 0;                                 
             var list= [];                      
             for (var i = 0; i <= player.storage.baonvezhi; i++) {
             if(i<=3) list.push(i);}
              chooseType.innerHTML = list[index];
              player.storage.twxiafeng = index;         
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= player.storage.baonvezhi) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';                  
             leftBtn.listen(function () {
              if (index ==  0) return;
                index--;
              leftBtn.style.transform = 'scale(0.7)';
              setTimeout(function() {leftBtn.style.transform = 'scale(1)'; }, 200);
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= player.storage.baonvezhi && player.storage.baonvezhi <= 3) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';
              chooseType.innerHTML = list[index];
              player.storage.twxiafeng = index;     
              });              
              rightBtn.listen(function () {
              if (index == player.storage.baonvezhi || index >= 3) return;
                  index++;
              rightBtn.style.transform = 'scale(0.7)';
              setTimeout(function() {rightBtn.style.transform = 'scale(1)'; }, 200);    
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= player.storage.baonvezhi || index >=3) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';
              chooseType.innerHTML = list[index];
              player.storage.twxiafeng = index;    
              });                     
               //if(game.me != player){
               if(!game.isMine()) {
              var shas = player.getCards('h', 'sha');
              var num;
            if ( shas.length >= 3 && player.storage.baonvezhi >= 3) {
                num = 3;
            } else if (shas.length >= 2 && player.storage.baonvezhi >= 2) {
                num = 2;
            } else if (shas.length >= 1 && player.storage.baonvezhi >= 1){
                num = 1;
            } else if (shas.length == 0 && player.storage.baonvezhi == 0){
                num = 0;            
            }
            player.storage.twxiafeng = num;
              }
              player.chooseBool('是否发动【黠凤】，你可以失去至多'+(player.storage.baonvezhi<=3?player.storage.baonvezhi:3)+'点【暴虐值】')
              .set('ai', function() {return true;});                  
        'step 1'
           if (!result.bool) {
              event.finish();                           
              }else{      
              if(player.storage.twxiafeng){             
            player.logSkill('twxiafeng');          
            player.addTempSkill('twxiafeng_effect');
            player.storage.twxiafeng_effect=player.storage.twxiafeng;
            lib.skill.baonvezhi.change(player,-player.storage.twxiafeng);
            }
              }      
              window.shuzibg.remove();      
              window.shuzibg = null;                                 
    },
    subSkill:{
        effect:{
            trigger:{
                player:"useCard",
            },
            filter:function(event,player){
                return !player.storage.twxiafeng_effect2;
            },
            forced:true,
            content:function(){
                var count=player.getHistory('useCard',evt=>evt.getParent('phaseUse').player==player).length;
                if(count==player.storage.twxiafeng_effect){
                    player.storage.twxiafeng_effect2=true;
                }
                if(count<=player.storage.twxiafeng_effect){
                    trigger.directHit.addArray(game.players);
                    if(trigger.addCount!==false){
                        trigger.addCount=false;
                        var stat=player.getStat().card,name=trigger.card.name;
                        if(typeof stat[name]=='number') stat[name]--;
                    }
                }
            },
            onremove:function(player){
                delete player.storage.twxiafeng_effect;
                delete player.storage.twxiafeng_effect2;
            },
            mod:{
                targetInRange:function(card,player,target,now){
                    if(!player.storage.twxiafeng_effect2) return true;
                },
                cardUsableTarget:function(card,player,target){
                    if(!player.storage.twxiafeng_effect2) return true;
                },
                maxHandcard:function(player,num){
                    return num+(player.storage.twxiafeng_effect||0);
                },
            },
            sub:true,
            parentskill:"twxiafeng",
        },
    },
}


    //张宁 星坠
    lib.skill.twxingzhui = {
        audio: 2,
        enable: 'phaseUse',
        usable: 1,
        direct: true, 
        mahouSkill: true,
        filter: function(event, player) {
            return !player.hasSkill('twxingzhui_mahou');
        },
        content: function() {
            'step 0'            
             window.shuzibg = ui.create.div('.shuzibgxx', document.body);
                if(window.shoushaBlanks) window.shoushaBlanks.add(window.shuzibg);
             var leftBtn = ui.create.div('.shuzijianhao', window.shuzibg);
                 leftBtn.style.filter = 'grayscale(100%)';
             var rightBtn = ui.create.div('.shuzijiahao', window.shuzibg);
             var chooseType = ui.create.div('.shuzixx', window.shuzibg);
                     var index = 0;                     
                     var list=[1,2,3];                  
                     chooseType.innerHTML = list[index];
              player.storage.twxingzhui2 = index;         
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index == 2) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';                  
             leftBtn.listen(function () {
              if (index ==  0) return;
              index--;
              leftBtn.style.transform = 'scale(0.7)';
              setTimeout(function() {leftBtn.style.transform = 'scale(1)'; }, 200);
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index == 2) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';
              chooseType.innerHTML = list[index];
              player.storage.twxingzhui2 = index;     
              });              
              rightBtn.listen(function () {
              if (index == 2) return;
                  index++;
              rightBtn.style.transform = 'scale(0.7)';
              setTimeout(function() {rightBtn.style.transform = 'scale(1)'; }, 200);    
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index == 2) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';
              chooseType.innerHTML = list[index];
              player.storage.twxingzhui2 = index;    
              });                     
              player.chooseBool('是否发动【星坠】，进行至多3回合的施法')
              .set('ai', function() {return true;});                  
            'step 1'
            if (!result.bool) {
              event.finish();                           
              }else{ 
              player.loseHp();                  
              if (player.storage.twxingzhui2) player.storage.twxingzhui_mahou = [player.storage.twxingzhui2+1,player.storage.twxingzhui2+1];
              player.addTempSkill('twxingzhui_mahou', {
                player: 'die'
            });
            player.addTempSkill('twxingzhui_mark', {
                player: 'die'
            });
            player.storage.twxingzhui_mark = '';
            player.addMark('twxingzhui_mark', player.storage.twxingzhui_mahou[0] + ' - ' + player.storage.twxingzhui_mahou[1]);
              }      
              window.shuzibg.remove();      
              window.shuzibg = null;
        },
        ai: {
            order: 2,
            result: {
                player: function(player, target) {
                    if (!player.hasFriend()) return 0;
                    if (player.hp > 1) return 1;
                    return 0;
                },
            },
        },
        subSkill: {
            mark: {
                mark: true,
                onremove: true,
                intro: {
                    name: "施法：星坠",
                    content: function(s, p) {
                        var str = '施法：星坠-剩余回合：'
                        str += p.storage.twxingzhui_mahou[1];
                        str += '<br>施法：星坠-成功观看数：'
                        str += p.storage.twxingzhui_mahou[0];
                        return str;
                    },
                },
                sub: true,
            },
            mahou: {
                trigger: {
                    global: 'phaseEnd'
                },
                forced: true,
                popup: false,
                charlotte: true,
                content: function() {
                    'step 0'
                    var list = player.storage.twxingzhui_mahou;
                    list[1]--;
                    if (list[1] == 0) {
                        game.log(player, '的', '#g星坠', '魔法生效');
                        player.logSkill('twxingzhui');
                        var num = list[0];
                        event.num = num;
                        var cards = game.cardsGotoOrdering(get.cards(num * 2))
                            .cards;
                        event.cards = cards;
                        player.showCards(cards, get.translation(player) + '发动了【星坠】');
                        player.removeSkill('twxingzhui_mahou');
                        player.removeSkill('twxingzhui_mark');
                    } else {
                        game.log(player, '的', '#g星坠', '魔法剩余', '#g' + (list[1]) + '回合');
                        player.storage.twxingzhui_mark = '';
                        player.addMark('twxingzhui_mark', player.storage.twxingzhui_mahou[0] + ' - ' + player.storage.twxingzhui_mahou[1]);
                        event.finish();
                    }
                    'step 1'
                    var cards2 = [];
                    for (var card of event.cards) {
                        if (get.color(card, false) == 'black') cards2.push(card);
                    }
                    if (!cards2.length) event.finish();
                    else {
                        event.cards2 = cards2;
                        var str = '令一名其他角色获得其中的黑色牌（' + get.translation(cards2) + '）';
                        if (cards2.length >= event.num) str += '，然后对其造成' + get.cnNumber(event.num) + '点伤害';
                        player.chooseTarget('请选择〖星坠〗的目标', str, lib.filter.notMe)
                            .set('ai', function(target) {
                            var player = _status.event.player;
                            if (_status.event.getParent()
                                .cards2.length >= _status.event.getParent()
                                .num) return get.damageEffect(target, player, player, 'thunder');
                            return get.attitude(player, target);
                        });
                    }
                    'step 2'
                    if (result.bool) {
                        var target = result.targets[0];
                        player.line(target);
                        target.gain(event.cards2, 'gain2');
                        if (event.cards2.length >= num) target.damage(event.num, 'thunder');
                    }
                },
            },
        },
    };
//疼公主 幸宠    
 lib.skill.xingchong = {
    audio:2,
    trigger:{
        global:"roundStart",
    },
    direct:true,
    filter:function(event,player){
        return player.maxHp>0;
    },
    content:function(){
        'step 0'
        window.shuzibg = ui.create.div('.shuzibgxx', document.body);
                if(window.shoushaBlanks) window.shoushaBlanks.add(window.shuzibg);
             var leftBtn = ui.create.div('.shuzijianhao', window.shuzibg);
                 leftBtn.style.filter = 'grayscale(100%)';
             var rightBtn = ui.create.div('.shuzijiahao', window.shuzibg);
             var chooseType = ui.create.div('.shuzixx', window.shuzibg);
                     var index = 0;  
                     var list = [];                                                
             for (var i = 0; i <= player.maxHp; i++) {
             if(i<=5) list.push(i)}                  
              chooseType.innerHTML = list[index];
              player.storage.xingchong2 = index;         
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= player.maxHp || index ==5) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';              
                  
             leftBtn.listen(function () {
              if (index ==  0) return;
                index--;
              leftBtn.style.transform = 'scale(0.7)';
              setTimeout(function() {leftBtn.style.transform = 'scale(1)'; }, 200);
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= player.maxHp || index ==5) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';
              chooseType.innerHTML = list[index];
              player.storage.xingchong2 = index;     
              }); 
                           
              rightBtn.listen(function () {
              if (index >= player.maxHp || index ==5) return;
                  index++;
              rightBtn.style.transform = 'scale(0.7)';
              setTimeout(function() {rightBtn.style.transform = 'scale(1)'; }, 200);    
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= player.maxHp || index ==5) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';
              chooseType.innerHTML = list[index];
              player.storage.xingchong2 = index;    
              });  
              //if(game.me != player){
              if(!game.isMine()) {
            player.storage.xingchong2 = 3;
              }                   
              player.chooseBool('是否发动【幸宠】，可以至多摸'+(player.maxHp<=5?player.maxHp:5)+'张牌')
              .set('ai', function() {return true;});                  
        'step 1'
           if (!result.bool) {                        
            event.num=Math.min(5,player.maxHp);                                
              }else{                               
            player.logSkill('xingchong');          
            if(player.storage.xingchong2>0) player.draw(player.storage.xingchong2);
            var num=Math.min(5,player.maxHp) - player.storage.xingchong2;
            game.log(num);
            if(num<=0) event.finish();
            else event.num=num;            
              }      
              window.shuzibg.remove();      
              window.shuzibg = null;             
        'step 2'
        if(player.countCards('h')>0){
            player.chooseCard('h',[1,Math.min(player.countCards('h'),event.num)],'请选择要展示的牌').set('ai',()=>1+Math.random());
        }
        else event.finish();
        'step 3'
        if(result.bool){
            var cards=result.cards;
            player.showCards(cards,get.translation(player)+'发动了【幸宠】');
            player.addGaintag(cards,'xingchong');
            player.addTempSkill('xingchong_effect','roundStart');
        }
    },
    subSkill:{
        effect:{
            audio:"xingchong",
            trigger:{
                player:["loseAfter"],
                global:["equipAfter","addJudgeAfter","gainAfter","loseAsyncAfter","addToExpansionAfter"],
            },
            filter:function(event,player){
                var evt=event.getl(player);
                if(!evt||!evt.cards2||!evt.cards2.length) return false;
                if(event.name=='lose'){
                    for(var i in event.gaintag_map){
                        if(event.gaintag_map[i].contains('xingchong')) return true;
                    }
                    return false;
                }
                return player.hasHistory('lose',function(evt){
                    if(event!=evt.getParent()) return false;
                    for(var i in evt.gaintag_map){
                        if(evt.gaintag_map[i].contains('xingchong')) return true;
                    }
                    return false;
                });
            },
            forced:true,
            popup:false,
            charlotte:true,
            onremove:function(player){
                player.removeGaintag('xingchong');
            },
            content:function(){
                'step 0'
                if(trigger.delay===false) game.delayx();
                'step 1'
                player.logSkill('xingchong_effect');
                var num=0;
                if(trigger.name=='lose'){
                    for(var i in trigger.gaintag_map){
                        if(trigger.gaintag_map[i].contains('xingchong')) num++;
                    }
                }
                else player.getHistory('lose',function(evt){
                    if(trigger!=evt.getParent()) return false;
                    for(var i in evt.gaintag_map){
                        if(evt.gaintag_map[i].contains('xingchong')) num++;
                    }
                });
                player.draw(2*num);
            },
            sub:true,
            parentskill:"xingchong",
        },
    },
}

//牛辅 宵袭    
lib.skill.dcxiaoxi = {
    auto:2,
    trigger:{
        player:"phaseUseBegin",
    },
    forced:true,
    filter:function(event,player){
        return player.maxHp>1;
    },
    content:function(){
        'step 0'
             window.shuzibg = ui.create.div('.shuzibgxx', document.body);
                if(window.shoushaBlanks) window.shoushaBlanks.add(window.shuzibg);
             var leftBtn = ui.create.div('.shuzijianhao', window.shuzibg);
                 leftBtn.style.filter = 'grayscale(100%)';
             var rightBtn = ui.create.div('.shuzijiahao', window.shuzibg);
             var chooseType = ui.create.div('.shuzixx', window.shuzibg);
                     var index = 0;  
                     var list = [1,2];                                                
              chooseType.innerHTML = list[index];
              player.storage.dcxiaoxi2 = index;         
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= 1) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';                                
             leftBtn.listen(function () {
              if (index <=  0) return;
                index--;
              leftBtn.style.transform = 'scale(0.7)';
              setTimeout(function() {leftBtn.style.transform = 'scale(1)'; }, 200);
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= 1) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';
              chooseType.innerHTML = list[index];
              player.storage.dcxiaoxi2 = index;     
              });                            
              rightBtn.listen(function () {
              if (index >= 1) return;
                  index++;
              rightBtn.style.transform = 'scale(0.7)';
              setTimeout(function() {rightBtn.style.transform = 'scale(1)'; }, 200);    
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= 1) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';
              chooseType.innerHTML = list[index];
              player.storage.dcxiaoxi2 = index;    
              });  
              //if(game.me != player){
              if(!game.isMine()) {
            if (player.maxHp<=2) player.storage.dcxiaoxi2 = 0;
            else player.storage.dcxiaoxi2 = 1;
              } 
              player.chooseControl("确定",true).set("prompt",'你须失去1-2点体力上限。选择1名目标，获取目标牌或对其视为使用【杀】');                              
        'step 1'
        if(window.shuzibg){
        window.shuzibg.remove();      
        window.shuzibg = null;}              
        player.loseMaxHp(player.storage.dcxiaoxi2+1);
        event.num=player.storage.dcxiaoxi2+1;
        'step 2'
        if(!game.hasPlayer((current)=>player.inRange(current))) event.finish();
        else player.chooseTarget('请选择【宵袭】的目标','然后你选择一项：⒈获得该角色的'+get.cnNumber(num)+'张牌。⒉视为对其使用'+get.cnNumber(num)+'张【杀】。',function(card,player,target){
            return player.inRange(target);
        },true).set('ai',function(target){
            var player=_status.event.player;
            if(get.attitude(player,target)>=0) return 0;
            var eff1=get.effect(target,{name:'shunshou_copy2'},player,player);
            if(eff1>0&&target.countCards('h')+target.countCards('e',function(card){
                return get.value(card,target)>0;
            })>1) eff1*=1.6;
            var eff2=player.canUse('sha',target)?get.effect(target,{name:'sha'},player,player):0;
            if(eff2>0&&target.countCards('hs','shan')+target.hp>1) eff2*=2;
            return Math.max(eff1,eff2);
        });
        'step 3'
        var target=result.targets[0];
        player.line(target,'green');
        event.target=target;
        var bool1=target.countGainableCards(player,'he')>0;
        var bool2=player.canUse('sha',target);
        if(!bool1&&!bool2) event.finish();
        else if(bool1&&bool2){
            var str=get.translation(target),numx=get.cnNumber(num);
            player.chooseControl().set('choiceList',[
                '获得'+str+'的'+numx+'张牌',
                '视为对'+str+'使用'+numx+'张【杀】',
            ]).set('ai',function(){
                var player=_status.event.player,target=_status.event.getParent().target;
                var eff1=get.effect(target,{name:'shunshou_copy2'},player,player);
                if(eff1>0&&target.countCards('h')+target.countCards('e',function(card){
                    return get.value(card,target)>0;
                })>1) eff1*=1.6;
                var eff2=player.canUse('sha',target)?get.effect(target,{name:'sha'},player,player):0;
                if(eff2>0&&target.countCards('hs','shan')+target.hp>1) eff2*=2;
                return eff1>eff2?0:1;
            });
        }
        else event._result={index:bool1?0:1};
        'step 4'
        if(result.index==0){
            player.gainPlayerCard(target,true,num,'he');
            event.finish();
        }
        'step 5'
        event.num--;
        if(player.canUse('sha',target,false)){
            player.useCard({name:'sha',isCard:true},target,false);
            if(event.num>0) event.redo();
        }
    },
}    

    //张曼成 峰集
    lib.skill.twfengji = {
        audio: 2,
        mahouSkill: true,
        trigger: {
            player: "phaseUseBegin",
        },
        filter: function(event, player) {
            return !player.getExpansions('twfengji')
                .length && !player.hasSkill('twfengji_mahou') && player.countCards('he');
        },
        direct: true,
        content: function() {
            'step 0'
            window.shuzibg = ui.create.div('.shuzibgxx', document.body);
                if(window.shoushaBlanks) window.shoushaBlanks.add(window.shuzibg);
             var leftBtn = ui.create.div('.shuzijianhao', window.shuzibg);
                 leftBtn.style.filter = 'grayscale(100%)';
             var rightBtn = ui.create.div('.shuzijiahao', window.shuzibg);
             var chooseType = ui.create.div('.shuzixx', window.shuzibg);
                     var index = 0;  
                     var list = [1,2,3];                                                
              chooseType.innerHTML = list[index];
              player.storage.twfengji5 = index;         
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= 2) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';                                
             leftBtn.listen(function () {
              if (index <=  0) return;
                index--;
              leftBtn.style.transform = 'scale(0.7)';
              setTimeout(function() {leftBtn.style.transform = 'scale(1)'; }, 200);
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= 2) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';
              chooseType.innerHTML = list[index];
              player.storage.twfengji5 = index;     
              });                            
              rightBtn.listen(function () {
              if (index >= 2) return;
                  index++;
              rightBtn.style.transform = 'scale(0.7)';
              setTimeout(function() {rightBtn.style.transform = 'scale(1)'; }, 200);    
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= 2) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';
              chooseType.innerHTML = list[index];
              player.storage.twfengji5 = index;    
              });  
              //if(game.me != player){
              if(!game.isMine()) {
             player.storage.twfengji5 = 2;
              } 
            player.chooseCard('he', get.prompt2('twfengji'))
                .set('ai', function(card) {
                var name = card.name,
                    num = 0;
                for (var i = 0; i < ui.cardPile.childNodes.length; i++) {
                    if (ui.cardPile.childNodes[i].name == name) num++;
                }
                if (num < 2) return false;
                return 8 - get.value(card);
            });
            'step 1'                        
            if (!result.bool) {                        
            event.finish();                                
              }else{                               
            player.logSkill('twfengji');
                player.addToExpansion(result.cards, player, 'giveAuto')
               .gaintag.add('twfengji');
              }      
              window.shuzibg.remove();      
              window.shuzibg = null;                   
            'step 2'
            player.storage.twfengji_mahou = [player.storage.twfengji5 + 1, player.storage.twfengji5 + 1];
            player.addTempSkill('twfengji_mahou', {
                player: 'die'
            });
            player.addTempSkill('twfengji_mark', {
                player: 'die'
            });           
            player.storage.twfengji_mark = player.storage.twfengji_mahou[0] + ' - ' + player.storage.twfengji_mahou[1];
            player.syncStorage("twfengji_mark");          
        },
        marktext: "示",
        onremove: function(player, skill) {
            var cards = player.getExpansions(skill);
            if (cards.length) player.loseToDiscardpile(cards);
        },
        intro: {
            content: "expansion",
            markcount: "expansion",
        },
        subSkill: {
            mark: {
            mark:true,
                intro: {
                    name: "施法：蜂集",
                    content: function(s, p) {
                        var str = '施法：蜂集-剩余回合：'
                        str += p.storage.twfengji_mahou[1];
                        str += '<br>施法：蜂集-成功摸牌数：'
                        str += p.storage.twfengji_mahou[0];
                        return str;
                    },
                },
                sub: true,
            },
            mahou: {
                trigger: {
                    global: "phaseBegin",
                },
                forced: true,
                popup: false,
                charlotte: true,
                content: function() {
                    var list = player.storage.twfengji_mahou;
                    list[1]--;
                    if (list[1] == 0) {
                        game.log(player, '的“蜂集”魔法生效');
                        player.logSkill('twfengji');
                        var cards = player.getExpansions('twfengji');
                        if (cards.length) {
                            var cards2 = [],
                                num = list[0];
                            for (var card of cards) {
                                for (var i = 0; i < num; i++) {
                                    var card2 = get.cardPile2(function(cardx) {
                                        return cardx.name == card.name && !cards2.contains(cardx);
                                    });
                                    if (card2) cards2.push(card2);
                                    else break;
                                }
                            }
                            game.delayx();
                            if (cards2.length) player.gain(cards2, 'gain2');
                            player.loseToDiscardpile(cards);
                        }
                        player.removeSkill('twfengji_mahou');
                        player.removeSkill('twfengji_mark');
                    } else {
                        game.log(player, '的“蜂集”魔法剩余', '#g' + (list[1]) + '回合');
                        player.storage.twfengji_mark = player.storage.twfengji_mahou[0]+' - '+ player.storage.twfengji_mahou[1];
                        player.syncStorage("twfengji_mark");
                     }
                },
                ai: {
                    threaten: 2.5,
                },
                sub: true,
            },
        },
    }
    lib.skill.twharvestinori = {
        audio: 2,
        mahouSkill: true,
        enable: "phaseUse",
        usable: 1,
        direct: true,
        filter: function(event, player) {
            return !player.hasSkill('twharvestinori_mahou') && player.countCards('h', {color:"black"}) > 0;
        },
        check: function(card) {
            return 8 - get.value(card);
        },
        content: function() {
            'step 0'
            window.shuzibg = ui.create.div('.shuzibgxx', document.body);
                if(window.shoushaBlanks) window.shoushaBlanks.add(window.shuzibg);
             var leftBtn = ui.create.div('.shuzijianhao', window.shuzibg);
                 leftBtn.style.filter = 'grayscale(100%)';
             var rightBtn = ui.create.div('.shuzijiahao', window.shuzibg);
             var chooseType = ui.create.div('.shuzixx', window.shuzibg);
                     var index = 0;  
                     var list = [1,2,3];                                                
              chooseType.innerHTML = list[index];
              player.storage.twharvestinori5 = index;         
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= 2) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';                                
             leftBtn.listen(function () {
              if (index <=  0) return;
                index--;
              leftBtn.style.transform = 'scale(0.7)';
              setTimeout(function() {leftBtn.style.transform = 'scale(1)'; }, 200);
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= 2) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';
              chooseType.innerHTML = list[index];
              player.storage.twharvestinori5 = index;     
              });                            
              rightBtn.listen(function () {
              if (index >= 2) return;
                  index++;
              rightBtn.style.transform = 'scale(0.7)';
              setTimeout(function() {rightBtn.style.transform = 'scale(1)'; }, 200);    
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= 2) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';
              chooseType.innerHTML = list[index];
              player.storage.twharvestinori5 = index;    
              });  
              //if(game.me != player){
              if(!game.isMine()) {
             player.storage.twharvestinori5 = 2;
              } 
             player.chooseToDiscard('h', get.prompt2('twharvestinori'),true,{color:"black"});
            'step 1'
            if (!result.bool) {                        
            event.finish();                                
              }else{                               
            player.storage.twharvestinori_mahou = [player.storage.twharvestinori5 + 1, player.storage.twharvestinori5 + 1];
            player.addTempSkill('twharvestinori_mahou', {
                player: 'die'
            });
            player.addTempSkill('twharvestinori_mark', {
                player: 'die'
            });
            player.storage.twharvestinori_mark = player.storage.twharvestinori_mahou[0]+' - '+ player.storage.twharvestinori_mahou[1];
            player.syncStorage("twharvestinori_mark");
              }      
              window.shuzibg.remove();      
              window.shuzibg = null;
            
        },
        ai: {
            order: 8,
            result: {
                player: 1,
            },
        },
        subSkill: {
            mark: {
            mark:true,
                intro: {
                    name: "施法：丰祈",
                    content: function(s, p) {
                        var str = '施法：丰祈-剩余回合：'
                        str += p.storage.twharvestinori_mahou[1];
                        str += '<br>施法：丰祈-摸牌数：'
                        str += p.storage.twharvestinori_mahou[0] * 2;
                        return str;
                    },
                },
                sub: true,
            },
            mahou: {
                trigger: {
                    global: "phaseEnd",
                },
                forced: true,
                popup: false,
                charlotte: true,
                content: function() {
                    var list = player.storage.twharvestinori_mahou;
                    list[1]--;
                    if (list[1] == 0) {
                        game.log(player, '的“丰祈”魔法生效');
                        player.logSkill('twharvestinori');
                        var num = list[0] * 2;
                        player.draw(num);
                        player.removeSkill('twharvestinori_mahou');
                        player.removeSkill('twharvestinori_mark');
                    } else {
                        game.log(player, '的“丰祈”魔法剩余', '#g' + (list[1]) + '回合');
                        player.storage.twharvestinori_mark = player.storage.twharvestinori_mahou[0]+' - '+ player.storage.twharvestinori_mahou[1];
                        player.syncStorage("twharvestinori_mark");
                    }
                },
                sub: true,
            },
        },
    }
    //张曼成 咒护
    lib.skill.twzhouhu = {
        audio: 2,
        mahouSkill: true,
        enable: "phaseUse",
        usable: 1,
        direct: true,
        filter: function(event, player) {
            return !player.hasSkill('twzhouhu_mahou') && player.countCards('h', {color:"red"}) > 0;
        },
        check: function(card) {
            if (_status.event.player.isHealthy()) return 0;
            return 7 - get.value(card);
        },
        content: function() {
            'step 0'
            window.shuzibg = ui.create.div('.shuzibgxx', document.body);
                if(window.shoushaBlanks) window.shoushaBlanks.add(window.shuzibg);
             var leftBtn = ui.create.div('.shuzijianhao', window.shuzibg);
                 leftBtn.style.filter = 'grayscale(100%)';
             var rightBtn = ui.create.div('.shuzijiahao', window.shuzibg);
             var chooseType = ui.create.div('.shuzixx', window.shuzibg);
                     var index = 0;  
                     var list = [1,2,3];                                                
              chooseType.innerHTML = list[index];
              player.storage.twzhouhu5 = index;         
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= 2) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';                                
             leftBtn.listen(function () {
              if (index <=  0) return;
                index--;
              leftBtn.style.transform = 'scale(0.7)';
              setTimeout(function() {leftBtn.style.transform = 'scale(1)'; }, 200);
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= 2) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';
              chooseType.innerHTML = list[index];
              player.storage.twzhouhu5 = index;     
              });                            
              rightBtn.listen(function () {
              if (index >= 2) return;
                  index++;
              rightBtn.style.transform = 'scale(0.7)';
              setTimeout(function() {rightBtn.style.transform = 'scale(1)'; }, 200);    
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= 2) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';
              chooseType.innerHTML = list[index];
              player.storage.twzhouhu5 = index;    
              });  
              //if(game.me != player){
              if(!game.isMine()) {
             player.storage.twzhouhu5 = 2;
              } 
             player.chooseToDiscard('h', get.prompt2('twzhouhu'),true,{color:"red"});
            'step 1'
            if (!result.bool) {                        
            event.finish();                                
              }else{                               
            player.storage.twzhouhu_mahou = [player.storage.twzhouhu5 + 1, player.storage.twzhouhu5 + 1];
            player.addTempSkill('twzhouhu_mahou', {
                player: 'die'
            });
            player.addTempSkill('twzhouhu_mark', {
                player: 'die'
            });
            player.storage.twzhouhu_mark = player.storage.twzhouhu_mahou[0]+' - '+ player.storage.twzhouhu_mahou[1];
            player.syncStorage("twzhouhu_mark");
              }      
              window.shuzibg.remove();      
              window.shuzibg = null;                       
        },
        ai: {
            order: 2,
            result: {
                player: 1,
            },
        },
        subSkill: {
            mark: {
            mark:true,
                intro: {
                    name: "施法：咒护",
                    content: function(s, p) {
                        var str = '施法：咒护-剩余回合：'
                        str += p.storage.twzhouhu_mahou[1];
                        str += '<br>施法：咒护-回复体力数：'
                        str += p.storage.twzhouhu_mahou[0];
                        return str;
                    },
                },
                sub: true,
            },
            mahou: {
                trigger: {
                    global: "phaseEnd",
                },
                forced: true,
                popup: false,
                charlotte: true,
                content: function() {
                    var list = player.storage.twzhouhu_mahou;
                    list[1]--;
                    if (list[1] == 0) {
                        game.log(player, '的“咒护”魔法生效');
                        player.logSkill('twzhouhu');
                        var num = list[0];
                        player.recover(num);
                        player.removeSkill('twzhouhu_mahou');
                        player.removeSkill('twzhouhu_mark');
                    } else {
                        game.log(player, '的“咒护”魔法剩余', '#g' + (list[1]) + '回合');
                        player.storage.twzhouhu_mark = player.storage.twzhouhu_mahou[0]+' - '+ player.storage.twzhouhu_mahou[1];
                        player.syncStorage("twzhouhu_mark");
                       
                    }
                },
                sub: true,
            },
        },
    }
    //咒祸
    lib.skill.twzuhuo = {
        audio: 2,
        mahouSkill: true,
        enable: "phaseUse",
        direct: true,
        usable: 1,
        filter: function(event, player) {
            return !player.hasSkill('twzuhuo_mahou') && player.countCards('he')>player.countCards('he',{type:'basic'});
         },                        
        check: function(card) {
            return 7 - get.value(card);
        },
        content: function() {
            'step 0'
             window.shuzibg = ui.create.div('.shuzibgxx', document.body);
                if(window.shoushaBlanks) window.shoushaBlanks.add(window.shuzibg);
             var leftBtn = ui.create.div('.shuzijianhao', window.shuzibg);
                 leftBtn.style.filter = 'grayscale(100%)';
             var rightBtn = ui.create.div('.shuzijiahao', window.shuzibg);
             var chooseType = ui.create.div('.shuzixx', window.shuzibg);
                     var index = 0;  
                     var list = [1,2,3];                                                
              chooseType.innerHTML = list[index];
              player.storage.twzuhuo5 = index;         
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= 2) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';                                
             leftBtn.listen(function () {
              if (index <=  0) return;
                index--;
              leftBtn.style.transform = 'scale(0.7)';
              setTimeout(function() {leftBtn.style.transform = 'scale(1)'; }, 200);
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= 2) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';
              chooseType.innerHTML = list[index];
              player.storage.twzuhuo5 = index;     
              });                            
              rightBtn.listen(function () {
              if (index >= 2) return;
                  index++;
              rightBtn.style.transform = 'scale(0.7)';
              setTimeout(function() {rightBtn.style.transform = 'scale(1)'; }, 200);    
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= 2) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';
              chooseType.innerHTML = list[index];
              player.storage.twzuhuo5 = index;    
              });  
              //if(game.me != player){
              if(!game.isMine()) {
             player.storage.twzuhuo5 = 2;
              } 
            player.chooseToDiscard(get.prompt2('twzuhuo'),'he',true,function(card){
            return get.type(card)!='basic';
        })
            'step 1'
            if (!result.bool) {                        
            event.finish();                                
              }else{                               
            player.storage.twzuhuo_mahou = [player.storage.twzuhuo5 + 1, player.storage.twzuhuo5 + 1];
            player.addTempSkill('twzuhuo_mahou', {
                player: 'die'
            });
            player.addTempSkill('twzuhuo_mark', {
                player: 'die'
            });
            player.storage.twzuhuo_mark = player.storage.twzuhuo_mahou[0]+' - '+ player.storage.twzuhuo_mahou[1];
            player.syncStorage("twzuhuo_mark");
              window.shuzibg.remove();      
              window.shuzibg = null;           
              }               
        },
        ai: {
            order: 2,
            result: {
                player: 1,
            },
        },
        subSkill: {
            mark: {
            mark:true,
                intro: {
                    name: "施法：阻祸",
                    content: function(s, p) {
                        var str = '施法：阻祸-剩余回合：'
                        str += p.storage.twzuhuo_mahou[1];
                        str += '<br>施法：阻祸-可抵消次数：'
                        str += p.storage.twzuhuo_mahou[0];
                        return str;
                    },
                },
                sub: true,
            },
            mahou: {
                trigger: {
                    global: "phaseEnd",
                },
                forced: true,
                popup: false,
                charlotte: true,
                content: function() {
                    var list = player.storage.twzuhuo_mahou;
                    list[1]--;
                    if (list[1] == 0) {
                        game.log(player, '的“阻祸”魔法生效');
                        player.logSkill('twzuhuo');
                        var num = list[0];
                        player.addSkill('twzuhuo_effect');
                        player.addMark('twzuhuo_effect', num, false);
                        player.removeSkill('twzuhuo_mahou');
                        player.removeSkill('twzuhuo_mark');
                    } else {
                        game.log(player, '的“阻祸”魔法剩余', '#g' + (list[1]) + '回合');
                        player.storage.twzuhuo_mark = player.storage.twzuhuo_mahou[0]+' - '+ player.storage.twzuhuo_mahou[1];
                        player.syncStorage("twzuhuo_mark");
                    }
                },
                sub: true,
            },
            effect: {
                charlotte: true,
                onremove: true,
                trigger: {
                    player: "damageBegin2",
                },
                forced: true,
                filter: function(event, player) {
                    return player.hasMark('twzuhuo_effect');
                },
                content: function() {
                    trigger.cancel();
                    player.removeMark('twzuhuo_effect', 1, false);
                    if (!player.countMark('twzuhuo_effect')) player.removeSkill('twzuhuo_effect');
                },
                marktext: "阻祸︎",
                intro: {
                    onremove: true,
                    content: "防止接下来的#次伤害",
                },
                sub: true,
            },
        },
    }
//咒诅    
lib.skill.twzhouzu = {
    audio:2,
    enable:"phaseUse",
    usable:1,
    mahouSkill:true,
    direct: true,
    filter:function(event,player){
        return !player.hasSkill('twzhouzu_mahou');
    },
    line:false,
    delay:false,
    content:function(){
        'step 0'
             window.shuzibg = ui.create.div('.shuzibgxx', document.body);
                if(window.shoushaBlanks) window.shoushaBlanks.add(window.shuzibg);
             var leftBtn = ui.create.div('.shuzijianhao', window.shuzibg);
                 leftBtn.style.filter = 'grayscale(100%)';
             var rightBtn = ui.create.div('.shuzijiahao', window.shuzibg);
             var chooseType = ui.create.div('.shuzixx', window.shuzibg);
                     var index = 0;  
                     var list = [1,2,3];                                                
              chooseType.innerHTML = list[index];
              player.storage.twzhouzu5 = index;         
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= 2) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';                                
             leftBtn.listen(function () {
              if (index <=  0) return;
                index--;
              leftBtn.style.transform = 'scale(0.7)';
              setTimeout(function() {leftBtn.style.transform = 'scale(1)'; }, 200);
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= 2) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';
              chooseType.innerHTML = list[index];
              player.storage.twzhouzu5 = index;     
              });                            
              rightBtn.listen(function () {
              if (index >= 2) return;
                  index++;
              rightBtn.style.transform = 'scale(0.7)';
              setTimeout(function() {rightBtn.style.transform = 'scale(1)'; }, 200);    
              if (index <= 0) leftBtn.style.filter = 'grayscale(100%)';
              else leftBtn.style.filter = 'none';
              if (index >= 2) rightBtn.style.filter = 'grayscale(100%)';
              else rightBtn.style.filter = 'none';
              chooseType.innerHTML = list[index];
              player.storage.twzhouzu5 = index;    
              });  
              //if(game.me != player){
              if(!game.isMine()) {
             player.storage.twzhouzu5 = 2;
              } 
            player.chooseTarget(get.prompt2('twzhouzu'),true,function(card,player,target){ return player!=target; },);              
        'step 1'
                    if (!result.bool) {                        
            event.finish();                                
              }else{                               
            player.storage.twzhouzu_mahou=[player.storage.twzhouzu5+1,player.storage.twzhouzu5+1,result.targets[0]];
            player.addTempSkill('twzhouzu_mahou',{player:'die'});
            player.addTempSkill('twzhouzu_mark', {player: 'die'});
            player.storage.twzhouzu_mark = player.storage.twzhouzu_mahou[0]+' - '+ player.storage.twzhouzu_mahou[1];
            player.syncStorage("twzhouzu_mark");
              window.shuzibg.remove();      
              window.shuzibg = null;           
              }               
        
    },
    subSkill:{
    mark: {
            mark:true,
                intro: {
                    name: "施法：咒诅",
                    content: function(s, p) {
                        var str = '施法：咒诅-剩余回合：'
                        str += p.storage.twzhouzu_mahou[1];
                        str += '<br>施法：咒诅-可抵消次数：'
                        str += p.storage.twzhouzu_mahou[0];
                        str += '<br>施法：咒诅-的目标是：'
                        str +=get.translation(p.storage.twzhouzu_mahou[2]);
                        return str;
                    },
                },
                sub: true,
            },
        mahou:{
            trigger:{
                global:"phaseEnd",
            },
            forced:true,
            popup:false,
            charlotte:true,
            content:function(){
                var list=player.storage.twzhouzu_mahou;
                list[1]--;
                if(list[1]==0){
                    game.log(player,'的“咒诅”魔法生效');
                    var num=list[0],target=list[2];
                    player.logSkill('twzhouzu',target);
                    target.chooseToDiscard(get.translation(player)+'对你的“咒诅”魔法生效，请弃置'+get.cnNumber(list[0])+'张牌',list[0],true);
                    target.damage('thunder');
                    player.removeSkill('twzhouzu_mahou');
                    player.removeSkill('twzhouzu_mark');                    
                }
                else{
                    game.log(player,'的“咒阻”魔法剩余','#g'+(list[1])+'回合');
                  //  player.markSkill('twzhouzu_mahou');
                    player.storage.twzhouzu_mark = player.storage.twzhouzu_mahou[0]+' - '+ player.storage.twzhouzu_mahou[1];
            player.syncStorage("twzhouzu_mark");
                }
            },            
            sub:true,
            parentskill:"twzhouzu",
        },
    },
    ai:{
        order:1,
        result:{
            target:-5,
        },
    },
}
 }
if (config.xuanzejineng) { 
    //十周年南华老仙
    lib.skill.jinghe={
				enable:'phaseUse',
				filter:function(event,player){
					return !player.hasSkill('jinghe_clear');
				},
				selectCard:function(){
					if(ui.selected.targets.length) return [ui.selected.targets.length,4];
					return [1,4];
				},
				selectTarget:function(){
					return ui.selected.cards.length;
				},
				filterTarget:true,
				filterCard:function(card){
					if(ui.selected.cards.length){
						var name=get.name(card);
						for(var i of ui.selected.cards){
							if(get.name(i)==name) return false;
						}
					}
					return true;
				},
				check:function(card){
					var player=_status.event.player;
					if(game.countPlayer(function(current){
						return get.attitude(player,current)>0;
					})>ui.selected.cards.length) return 1;
					return 0;
				},
				position:'h',
				complexCard:true,
				discard:false,
				lose:false,
				delay:false,
				multitarget:true,
				multiline:true,
				content:function(){
					'step 0'
					player.showCards(cards,get.translation(player)+'发动了【经合】');
					event.skills=lib.skill.jinghe.derivation.randomGets(4);
					player.addTempSkill('jinghe_clear',{player:'phaseBegin'});
					event.targets.sortBySeat();
					event.num=0;
					'step 1'
					event.target=targets[num];
					event.num++;			
				    'step 2'
					event.dialog = ui.create.dialognew('#duorui','hidden');
					event.dialog.isQingZheng = true;
                    var eventtitle = ui.create.div('.newTitle1', event.dialog);
                    var txt = ui.create.div('.Footerxxgg', event.dialog);		
                    ui.create.div('.jindutiaoxgxg', event.dialog);
                    ui.create.div('.jindutiaoxgxgx', event.dialog);		
                    txt.style.top = '285px';
                    eventtitle.innerHTML = '经合<img src=' + lib.assetURL + 'extension/选将美化/assets/image/arrow.png' + ' style=width:30px;height:25px;margin-bottom:1px;left:2px;/>';               
                    txt.innerHTML = "选择1个技能获得，持续至<span style='color: #66FF66'>"+get.translation(player.name)+"</span>的下回合开始";
                    var click = [];
                    event.ok = ui.create.control('',function (evt) {
                        event.ok.style.transform = 'scale(0.9)';
                        setTimeout(function() {
                            if(event.ok) event.ok.style.transform = 'scale(1)'; 
                        }, 50);
                        if (!event.link) return;                      
                        ui.xjmhQingzhengNext();
                        game.resume2();
                    });
                    event.cancel = ui.create.control('',function (evt) {
                        if (event.dialog) event.dialog.remove();
                        if (event.ok) event.ok.remove();
                        if (event.cancel) event.cancel.remove();
                        event.dialog = null;
                        event.ok = null;
                        event.cancel = null;
                            if(event.num<event.targets.length) {event.goto(2); }else{
                            event.finish();
                            }                      
                            ui.xjmhQingzhengNext();
                        game.resume2();                        
                    });
                    event.dialog.appendChild(event.ok);
                    event.dialog.appendChild(event.cancel);
                    event.ok.style.filter = 'grayscale(100%)';
                    //event.ok.style.marginTop = '227px';
                    event.ok.style.top = '229px';
                    //event.ok.style.marginLeft = '-100px';
                    event.ok.style.left = 'calc(50% - 170px)';
                    event.ok.style.backgroundImage= 'url("' + lib.assetURL + 'extension/选将美化/assets/image/gbtn.png")';
                    event.ok.style.backgroundSize = '80% 80%';
                    event.ok.style.backgroundRepeat = 'no-repeat';
                    //event.cancel.style.marginTop = '227px';
                    event.cancel.style.top = '229px';
                    //event.cancel.style.marginLeft = '177px';
                    event.cancel.style.left = 'calc(50% + 20px)';
                    event.cancel.style.backgroundSize = '80% 80%';
                    event.cancel.style.backgroundRepeat = 'no-repeat';
                    event.cancel.style.backgroundImage= 'url("' + lib.assetURL + 'extension/选将美化/assets/image/cancel.png")';
                    for (var i of event.skills) {               
				        var beijing = ui.create.div('.duoruibg', event.dialog);
					    var jn = ui.create.div('.jinengming', beijing);
					    var jnxc = ui.create.div('.jinengmingx-child', jn);
					    var jnx = ui.create.div('.jinengmingx', jn);
					    jnx.innerHTML= get.translation(i);
					    jnxc.innerHTML= get.translation(i);
					    var jnms = ui.create.div('.jinengmingmiaoshu', beijing);
					    jnms.innerHTML = get.translation(i+'_info');   
					    jn.link = i;
					    jn.addEventListener('click', function() {
				        	var current=this.parentNode.parentNode.querySelector('.dianjixg');	
							if(current){
								current.classList.remove('dianjixg');
								current.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/brawl_btn_spell.png")';
								click.remove(current);
								event.ok.style.filter = 'grayscale(100%)';
								event.link = false;
							}
							if(current!=this){
								click.add(this);
								this.classList.add('dianjixg');
								this.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/brawl_btn_spell_light.png")';	
								event.ok.style.filter = 'none';
								event.link = this.link;
							}		 
						});								
                    }
                    event.clickLogAI = function () {
                        return event.skills.randomGet();
                    }                    
				    // 暂停步骤
                    _status.imchoosing = true;               
                    game.pause2();
                    event.switchToAuto = function () {
                        event.link = event.clickLogAI();
                        event.dialog.close();
                        ui.xjmhQingzhengNext();
                        game.resume2();
                    };                                                              
                    //if(event.target == game.me){
                    if(game.isMine(event.target)) {
                        event.dialog.open();
                    } else {
                        event.link = event.clickLogAI();                
                        ui.xjmhQingzhengNext();
                        game.resume2();                 
                    }                                                                    
					'step 3'
					if (event.dialog) event.dialog.remove();
                    if (event.ok) event.ok.remove();
                    if (event.cancel) event.cancel.remove();
                    event.dialog = null;
                    event.ok = null;
                    event.cancel = null;
					var skill=event.link;
					event.skills.remove(skill);
					target.addAdditionalSkill('jinghe_'+player.playerid,skill);
					target.popup(skill);
					game.log(target,'获得了技能','#g【'+get.translation(skill)+'】');
					if(event.num<event.targets.length) event.goto(1);
					if(target!=game.me&&!target.isOnline2()) game.delayx();
				},
				ai:{
					threaten:3,
					order:20,
					result:{
						target:1,
					},
				},
				derivation:['releiji','rebiyue','new_retuxi','mingce','xinzhiyan','nhyinbing','nhhuoqi','nhguizhu','nhxianshou','nhlundao','nhguanyue','nhyanzheng'],
				subSkill:{
					clear:{
						onremove:function(player){
							game.countPlayer(function(current){
								current.removeAdditionalSkill('jinghe_'+player.playerid);
							});
						},
					},
				},
			};
			
				        //钟琰 博览
			lib.skill.bolan={
				audio:2,
				banned:['kotomi_chuanxiang'],
				global:'bolan_g',
				initList:function(player){
					var list,skills=[];
					if(get.mode()=='guozhan'){
						list=[];
						for(var i in lib.characterPack.mode_guozhan) list.push(i);
					}
					else if(_status.connectMode) list=get.charactersOL();
					else {
						list=[];
						for(var i in lib.character){
							if(lib.filter.characterDisabled2(i)||lib.filter.characterDisabled(i)) continue;
							list.push(i);
						}
					}
					for(var i of list){
						if(i.indexOf('gz_jun')==0) continue;
						for(var j of lib.character[i][3]){
							if(j=='bolan') continue;
							var skill=lib.skill[j];
							if(!skill||skill.juexingji||skill.hiddenSkill||skill.zhuSkill||skill.dutySkill||skill.chargeSkill||lib.skill.bolan.banned.contains(j)) continue;
							if(skill.init||skill.ai&&(skill.ai.combo||skill.ai.notemp||skill.ai.neg)) continue;
							var info=lib.translate[j+'_info'];
							if(info&&info.indexOf('出牌阶段限一次')!=-1) skills.add(j);
						}
					}
					player.storage.bolan=skills;
				},
				check:function(event,player){
					return true;
				},
				trigger:{player:'phaseUseBegin'},
				frequent:true,
				preHidden:true,
				content:function(){
					'step 0'
					if(player.isIn()){
						if(!player.storage.bolan) lib.skill.bolan.initList(player);
						var list=player.storage.bolan.randomGets(3);
						if(!list.length){
							event.finish();
							return;
						}						
						event.dialog = ui.create.dialognew('#duorui');
						event.dialog.isQingZheng = true;
                        var eventtitle = ui.create.div('.newTitle1', event.dialog); 
                        var txt = ui.create.div('.Footerxxgg', event.dialog);		
                        ui.create.div('.jindutiaoxgxg', event.dialog);
                        ui.create.div('.jindutiaoxgxgx', event.dialog);		
                        txt.style.top = '285px';
                        eventtitle.innerHTML = '博览<img src=' + lib.assetURL + 'extension/选将美化/assets/image/arrow.png' + ' style=width:30px;height:25px;margin-bottom:1px;left:2px;/>';               
                        txt.innerHTML = "选择1个技能获得，持续至<span style='color: #66FF66'>"+get.translation(player.name)+"</span>的回合结束";
                        var click = [];
                        event.ok = ui.create.control('',function (evt) {
                            event.ok.style.transform = 'scale(0.9)';
                            setTimeout(function() {
                                if(event.ok) event.ok.style.transform = 'scale(1)'; 
                            }, 50);
                            if (!event.link) return;                      
                            ui.xjmhQingzhengNext();
                        game.resume2();
                        });                    
                        event.dialog.appendChild(event.ok);                   
                        event.ok.style.filter = 'grayscale(100%)';
                        event.ok.style.marginTop = '227px';
                        event.ok.style.marginLeft = '35px';                    
                        event.ok.style.backgroundImage= 'url("' + lib.assetURL + 'extension/选将美化/assets/image/gbtn.png")';
                        event.ok.style.backgroundSize = '80% 80%';
                        event.ok.style.backgroundRepeat = 'no-repeat';  
                        for (var i of list) {               
				            var beijing = ui.create.div('.duoruibg', event.dialog);
					        var jn = ui.create.div('.jinengming', beijing);
					        var jnxc = ui.create.div('.jinengmingx-child', jn);
					        var jnx = ui.create.div('.jinengmingx', jn);
					        jnx.innerHTML= get.translation(i);
					        jnxc.innerHTML= get.translation(i);
					        var jnms = ui.create.div('.jinengmingmiaoshu', beijing);
					        jnms.innerHTML = get.translation(i+'_info');   
					        jn.link = i;
					        jn.addEventListener('click', function() {
				        	    var current=this.parentNode.parentNode.querySelector('.dianjixg');	
								if(current){
									current.classList.remove('dianjixg');
									current.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/brawl_btn_spell.png")';
									click.remove(current);
									event.ok.style.filter = 'grayscale(100%)';
									event.link = false;
								}
								if(current!=this){
									click.add(this);
									this.classList.add('dianjixg');
									this.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/brawl_btn_spell_light.png")';	
									event.ok.style.filter = 'none';
									event.link = this.link;
								}		 
							});								
                        }
                        event.clickLogAI = function () {
				        event.link = list.randomGet();
                            return event.link;
                        }                    
				            // 暂停步骤
                            _status.imchoosing = true;               
                            game.pause2();
                            event.switchToAuto = function () {
                                event.link = event.clickLogAI();
                                event.dialog.close();
                                game.resume();
                            };
                            //if(player==game.me||player.isUnderControl()){
                            if(game.isMine(target)) {
                                event.dialog.open();
                            } else {
                                event.link = event.clickLogAI();
                                ui.xjmhQingzhengNext();
                                game.resume2();
                            }
					}
					'step 1'
					if (event.dialog) event.dialog.remove();
                    if (event.ok) event.ok.remove();
                    event.dialog = null;
                    event.ok = null;
					player.addTempSkill(event.link,'phaseUseEnd');
					player.popup(event.link);
					game.log(player,'获得了','#g【'+get.translation(event.link)+'】');
				},
				ai:{threaten:0.9},
				subSkill:{
					g:{
						audio:'bolan',
						forceaudio:true,
						enable:'phaseUse',
						usable:1,
						prompt:'出牌阶段限一次。你可以令一名有〖博览〗的角色从三个描述中包含“出牌阶段限一次”的技能中选择一个，你获得此技能直到此阶段结束。',
						filter:function(event,player){
							return game.hasPlayer(function(current){
								return current!=player&&current.hasSkill('bolan');
							});
						},
						filterTarget:function(card,player,target){
							return player!=target&&target.hasSkill('bolan');
						},
						selectTarget:function(){
							if(game.countPlayer(current=>{
								return lib.skill.bolan_g.filterTarget(null,_status.event.player,current);
							})==1) return -1;
							return 1;
						},
						content:function(){
							'step 0'
							player.loseHp();
							'step 1'
							if(target.isIn()&&player.isIn()){
								if(!target.storage.bolan) lib.skill.bolan.initList(target);
								var list=target.storage.bolan.randomGets(3);
								if(!list.length){
									event.finish();
									return;
								}				
						event.dialog = ui.create.dialognew('#duorui');
						event.dialog.isQingZheng = true;
                        var eventtitle = ui.create.div('.newTitle1', event.dialog);    		
                        var txt = ui.create.div('.Footerxxgg', event.dialog);		
                        ui.create.div('.jindutiaoxgxg', event.dialog);
                        ui.create.div('.jindutiaoxgxgx', event.dialog);		
                        txt.style.top = '285px';
                        eventtitle.innerHTML = '博览<img src=' + lib.assetURL + 'extension/选将美化/assets/image/arrow.png' + ' style=width:30px;height:25px;margin-bottom:1px;left:2px;/>';               
                        txt.innerHTML = "选择1个技能令<span style='color: #66FF66'>"+get.translation(player.name)+"</span>获得，持续至<span style='color: #66FF66'>"+get.translation(player.name)+"</span>的回合结束";
                        var click = [];
                        event.ok = ui.create.control('',function (evt) {
                            event.ok.style.transform = 'scale(0.9)';
                            setTimeout(function() {
                                if(event.ok) event.ok.style.transform = 'scale(1)'; 
                            }, 50);
                            if (!event.link) return;                      
                            ui.xjmhQingzhengNext();
                        game.resume2();
                        });                    
                        event.dialog.appendChild(event.ok);                   
                        event.ok.style.filter = 'grayscale(100%)';
                        event.ok.style.marginTop = '227px';
                        event.ok.style.marginLeft = '35px';                    
                        event.ok.style.backgroundImage= 'url("' + lib.assetURL + 'extension/选将美化/assets/image/gbtn.png")';
                        event.ok.style.backgroundSize = '80% 80%';
                        event.ok.style.backgroundRepeat = 'no-repeat';  
                        for (var i of list) {               
				            var beijing = ui.create.div('.duoruibg', event.dialog);
					        var jn = ui.create.div('.jinengming', beijing);
					        var jnxc = ui.create.div('.jinengmingx-child', jn);
					        var jnx = ui.create.div('.jinengmingx', jn);
					        jnx.innerHTML= get.translation(i);
					        jnxc.innerHTML= get.translation(i);
					        var jnms = ui.create.div('.jinengmingmiaoshu', beijing);
					        jnms.innerHTML = get.translation(i+'_info');   
					        jn.link = i;
					        jn.addEventListener('click', function() {
				        	    var current=this.parentNode.parentNode.querySelector('.dianjixg');	
								if(current){
									current.classList.remove('dianjixg');
									current.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/brawl_btn_spell.png")';
									click.remove(current);
									event.ok.style.filter = 'grayscale(100%)';
									event.link = false;
								}
								if(current!=this){
									click.add(this);
									this.classList.add('dianjixg');
									this.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/brawl_btn_spell_light.png")';	
									event.ok.style.filter = 'none';
									event.link = this.link;
								}		 
							});								
                        }
                        event.clickLogAI = function () {
							event.link = list.randomGet();
                            return event.link;
                        }                    
				            // 暂停步骤
                            _status.imchoosing = true;               
                            game.pause2();
                            event.switchToAuto = function () {
                                event.link = event.clickLogAI();
                                event.dialog.close();
                                game.resume();
                            };
                            //if(target==game.me&&!_status.auto&&!target.isMad()&&!game.notMe) {
                            if(game.isMine(target)){
                                event.dialog.open();
                            } else {
                                event.link = event.clickLogAI();
                                ui.xjmhQingzhengNext();
                                game.resume2();
                            }
                        }
							'step 2'
							target.line(player);
							if (event.dialog) event.dialog.remove();
                    		if (event.ok) event.ok.remove();
                    		event.dialog = null;
                    		event.ok = null;
							player.addTempSkill(event.link,'phaseUseEnd');
							player.popup(event.link);
							game.log(player,'获得了','#g【'+get.translation(event.link)+'】');
						},
						ai:{
							order:function(item,player){
								if(player.hp>=5||player.countCards('h')>=10) return 10;
								var list=game.filterPlayer(current=>lib.skill.bolan_g.filterTarget(null,player,current));
								for(var target of list){
									if(get.attitude(target,player)>0) return 10;
								}
								return 4;
							},
							result:{
								player:function(player,target){
									if(player.hasUnknown()) return player.hp+player.countCards('h')/4-5>0?1:0;
									var tao=player.countCards('h','tao');
									if(player.hp+tao>4) return 4+get.attitude(player,target);
									if(player.hp+tao>3) return get.attitude(player,target)-2;
									return 0;
								},
							},
						},
					}
				}
			};
//神张辽 夺锐   
    lib.skill.drlt_duorui = {
        audio: 2,
        init: function(player, skill) {
            if (!player.storage.drlt_duorui) player.storage.drlt_duorui = [];
        },
        trigger: {
            source: "damageSource",
        },
        filter: function(event, player) {
            if (player.storage.drlt_duorui.length) return false;
            return player != event.player && event.player.isAlive() && _status.currentPhase == player;
        },
        check: function(event, player) {
            if (player.countDisabled() < 5 && player.isDisabled(5)) return false;
            return true;
        },
        bannedList: ["bifa", "buqu", "gzbuqu", "songci", "funan", "xinfu_guhuo", "reguhuo", "huashen", "rehuashen", "old_guhuo", "shouxi", "xinpojun", "taoluan", "xintaoluan", "yinbing", "xinfu_yingshi", "zhenwei", "zhengnan", "xinzhengnan", "zhoufu"],
        content: function() {
            'step 0'
            var list = [];
            var listm = [];
            var listv = [];
            if (trigger.player.name1 != undefined) listm = lib.character[trigger.player.name1][3];
            else listm = lib.character[trigger.player.name][3];
            if (trigger.player.name2 != undefined) listv = lib.character[trigger.player.name2][3];
            listm = listm.concat(listv);
            var func = function(skill) {
                var info = get.info(skill);
                if (!info || info.charlotte || info.hiddenSkill || info.zhuSkill || info.juexingji || info.forever || info.limited || info.dutySkill || (info.unique && !info.gainable) || lib.skill.drlt_duorui.bannedList.contains(skill)) return false;
                return true;
            };
            for (var i = 0; i < listm.length; i++) {
                if (func(listm[i])) list.add(listm[i]);
            }
            event.skills = list;
            if (player.countDisabled() < 5) {
                player.chooseToDisable().set('txt','你可以废除1个装备栏，然后<span style="color: #66FF66">'+get.translation(trigger.player)+'</span>在他下个回合结束前失去1个技能')
                    .ai = function(event, player, list) {
                    if (list.contains('equip5')) return 'equip5';
                    return list.randomGet();
                };
            }else event.finish();
            'step 1'
            if (event.skills.length > 0) {
                event.dialog = ui.create.dialognew('#duorui');
                event.dialog.isQingZheng = true;
                var eventtitle = ui.create.div('.newTitle1', event.dialog);    		
                var txt = ui.create.div('.Footerxxgg', event.dialog);		
                ui.create.div('.jindutiaoxgxg', event.dialog);
                ui.create.div('.jindutiaoxgxgx', event.dialog);		
                txt.style.top = '285px';
                eventtitle.innerHTML = '夺锐<img src=' + lib.assetURL + 'extension/选将美化/assets/image/arrow.png' + ' style=width:30px;height:25px;margin-bottom:1px;left:2px;/>';               
                txt.innerHTML = "选择<span style='color: #66FF66'>"+get.translation(trigger.player.name)+"</span>的1个技能让其无效，你获得1个技能";
                 var click = [];
                 event.ok = ui.create.control('',function (evt) {
                    event.ok.style.transform = 'scale(0.9)';
                    setTimeout(function() {if(event.ok )event.ok.style.transform = 'scale(1)'; }, 50);
                    if (!event.link) return;                      
                        ui.xjmhQingzhengNext();
                        game.resume2();
                    });                    
                    event.dialog.appendChild(event.ok);                   
                    event.ok.style.filter = 'grayscale(100%)';
                    event.ok.style.marginTop = '227px';
                    event.ok.style.marginLeft = '35px';                    
                    event.ok.style.backgroundImage= 'url("' + lib.assetURL + 'extension/选将美化/assets/image/gbtn.png")';       
                    event.ok.style.backgroundSize = '80% 80%';
                    event.ok.style.backgroundRepeat = 'no-repeat';  
                 for(var i of event.skills){               
				var beijing = ui.create.div('.duoruibg', event.dialog);
				var jn = ui.create.div('.jinengming', beijing);
				var jnxc = ui.create.div('.jinengmingx-child', jn);
				var jnx = ui.create.div('.jinengmingx', jn);
				jnxc.innerHTML= get.translation(i);
				jnx.innerHTML= get.translation(i);
				var jnms = ui.create.div('.jinengmingmiaoshu', beijing);
				jnms.innerHTML = get.translation(i+'_info');   
				jn.link = i;
				jn.addEventListener('click', function() {
			var current=this.parentNode.parentNode.querySelector('.dianjixg');	
									if(current){
										current.classList.remove('dianjixg');
										current.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/brawl_btn_spell.png")';
										click.remove(current);
										event.ok.style.filter = 'grayscale(100%)';
										event.link = false;
									}
									if(current!=this){
									click.add(this);									
									this.classList.add('dianjixg');
									this.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/brawl_btn_spell_light.png")';	
									event.ok.style.filter = 'none';
									event.link = this.link;
									}		 
								});								
                                }              
                              
                    event.clickLogAI = function () {                	
				    event.link = event.skills.randomGet()		
                        return event.link;                                      
                    }                    
				       // 暂停步骤
                    _status.imchoosing = true;               
                    game.pause2();
                    event.switchToAuto = function () {
                        event.link = event.clickLogAI();
                        event.dialog.close();
                        game.resume();
                    };                                       
                    if (game.isMine()) {
                         event.dialog.open();
                    } else {
                        event.link = event.clickLogAI();
                        ui.xjmhQingzhengNext();
                        game.resume2();
                    }
            } else event.finish();
            'step 2'
                    if (event.dialog) event.dialog.remove();
                    if (event.ok) event.ok.remove();
                    event.dialog = null;
                    event.ok = null;
            player.addTempSkill(event.link, {
                player: 'dieAfter'
            });
            player.popup(event.link, 'thunder');
            player.storage.drlt_duorui = [event.link];
            player.storage.drlt_duorui_player = trigger.player;
            trigger.player.storage.drlt_duorui = [event.link];
            trigger.player.addTempSkill('drlt_duorui1', {
                player: 'phaseAfter'
            });
            game.log(player, '获得了技能', '#g【' + get.translation(event.link) + '】')
            player.unmarkSkill('drlt_duorui_mark');
            var mark = get.translation(event.link);
            player.storage.drlt_duorui_mark = '';
            player.addSkill("drlt_duorui_mark", );
            player.markSkill("drlt_duorui_mark", '', '夺锐 ' + mark);
            trigger.player.addTempSkill("drlt_duorui_mark", {
                player: 'phaseAfter'
            });
            trigger.player.markSkill("drlt_duorui_mark", '', '被夺锐 ' + mark);
        },
        group: ["duorui_clear"],
        subSkill: {
            mark: true,
            mark: {
                intro: {},
                sub: true,
            },
        },
    };	
    lib.skill.pro_drlt_duorui = {
		audio:'drlt_duorui',
		init:function(player,skill){
			if(!player.storage.drlt_duorui) player.storage.drlt_duorui=[];
		},
		trigger:{
			source:'damageSource'
		},
		filter:function(event,player){
			//if(player.storage.drlt_duorui.length) return false;
			if(player.storage.pro_drlt_duorui&&player.storage.pro_drlt_duorui[event.player.playerid]) return false;
			return player!=event.player&&event.player.isIn()&&_status.currentPhase==player;
		},
		check:function(event,player){
			if(player.hasEnabledSlot()&&!player.hasEnabledSlot(5)) return false;
			return get.attitude(player,event.player)<-1;
		},
		bannedList:[
			'bifa','buqu','gzbuqu','songci','funan','xinfu_guhuo','reguhuo','huashen','rehuashen','old_guhuo','shouxi','xinpojun','taoluan','xintaoluan','yinbing','xinfu_yingshi','zhenwei','zhengnan','xinzhengnan','zhoufu',
		],
		content:function(){
			'step 0'
			var list=[];
			var listm=[];
			var listv=[];
			if(trigger.player.name1!=undefined) listm=lib.character[trigger.player.name1][3];
			else listm=lib.character[trigger.player.name][3];
			if(trigger.player.name2!=undefined) listv=lib.character[trigger.player.name2][3];
			listm=listm.concat(listv);
			var func=function(skill){
				var info=get.info(skill);
				if(!info||info.charlotte||info.hiddenSkill||info.zhuSkill||info.juexingji||info.forever||info.limited||info.dutySkill||(info.unique&&!info.gainable)||lib.skill.drlt_duorui.bannedList.contains(skill)) return false;
				return true;
			};
			for(var i=0;i<listm.length;i++){
				if(func(listm[i])) list.add(listm[i]);
			}
			event.skills=list;
			if(player.hasEnabledSlot()&&!trigger.player.hasDisabledSlot()){
				/*player.chooseToDisable().ai=function(event,player,list){
					//if(list.contains('equip5')) return 'equip5';
					var first=[2,1,3,4,5];
					for(var i=0;i<first.length;i++) {
					    if(trigger.player.hasEnabledSlot('equip'+first[i])) return 'equip'+first[i];
					}
					return list.randomGet();
				};*/
				player.chooseToDisableTarget(trigger.player,function(e,player,target) {
				    return player.hasEnabledSlot(e);
				}).ai=function(event,player,list){
					//if(list.contains('equip5')) return 'equip5';
					var first=[2,1,3,4,5];
					for(var i=0;i<first.length;i++) {
					    if(trigger.player.hasEnabledSlot('equip'+first[i])) return 'equip'+first[i];
					}
					return list.randomGet();
				};
			}
			'step 1'
			if(result.control&&player.hasEnabledSlot()) {
			    //if(trigger.player.hasEnabledSlot(result.control)) trigger.player.disableEquip(result.control);
			    var list=[];
				for(var i=1;i<=5;i++){
					if(player.hasEnabledSlot(i)) list.push('equip'+i);
				}
				player.disableEquip(list.randomGet());
			}
			if (event.skills.length > 0) {
                event.dialog = ui.create.dialognew('#duorui');
                event.dialog.isQingZheng = true;
                var eventtitle = ui.create.div('.newTitle1', event.dialog);    		
                var txt = ui.create.div('.Footerxxgg', event.dialog);		
                ui.create.div('.jindutiaoxgxg', event.dialog);
                ui.create.div('.jindutiaoxgxgx', event.dialog);		
                txt.style.top = '285px';
                eventtitle.innerHTML = '夺锐<img src=' + lib.assetURL + 'extension/选将美化/assets/image/arrow.png' + ' style=width:30px;height:25px;margin-bottom:1px;left:2px;/>';               
                txt.innerHTML = "选择<span style='color: #66FF66'>"+get.translation(trigger.player.name)+"</span>的1个技能让其无效，你获得1个技能";
                 var click = [];
                 event.ok = ui.create.control('',function (evt) {
                    event.ok.style.transform = 'scale(0.9)';
                    setTimeout(function() {if(event.ok )event.ok.style.transform = 'scale(1)'; }, 50);
                    if (!event.link) return;                      
                        ui.xjmhQingzhengNext();
                        game.resume2();
                    });                    
                    event.dialog.appendChild(event.ok);                   
                    event.ok.style.filter = 'grayscale(100%)';
                    event.ok.style.marginTop = '227px';
                    event.ok.style.marginLeft = '35px';                    
                    event.ok.style.backgroundImage= 'url("' + lib.assetURL + 'extension/选将美化/assets/image/gbtn.png")';       
                    event.ok.style.backgroundSize = '80% 80%';
                    event.ok.style.backgroundRepeat = 'no-repeat';  
                 for(var i of event.skills){               
				var beijing = ui.create.div('.duoruibg', event.dialog);
				var jn = ui.create.div('.jinengming', beijing);
				var jnxc = ui.create.div('.jinengmingx-child', jn);
				var jnx = ui.create.div('.jinengmingx', jn);
				jnxc.innerHTML= get.translation(i);
				jnx.innerHTML= get.translation(i);
				var jnms = ui.create.div('.jinengmingmiaoshu', beijing);
				jnms.innerHTML = get.translation(i+'_info');   
				jn.link = i;
				jn.addEventListener('click', function() {
			var current=this.parentNode.parentNode.querySelector('.dianjixg');	
									if(current){
										current.classList.remove('dianjixg');
										current.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/brawl_btn_spell.png")';
										click.remove(current);
										event.ok.style.filter = 'grayscale(100%)';
										event.link = false;
									}
									if(current!=this){
									click.add(this);									
									this.classList.add('dianjixg');
									this.style.backgroundImage = 'url("' + lib.assetURL + 'extension/选将美化/assets/image/brawl_btn_spell_light.png")';	
									event.ok.style.filter = 'none';
									event.link = this.link;
									}		 
								});								
                                }              
                              
                    event.clickLogAI = function () {                	
				    event.link = event.skills.randomGet()		
                        return event.link;                                      
                    }                    
				       // 暂停步骤
                    _status.imchoosing = true;               
                    game.pause2();
                    event.switchToAuto = function () {
                        event.link = event.clickLogAI();
                        event.dialog.close();
                        game.resume();
                    };                                       
                    if (game.isMine()) {
                         event.dialog.open();
                    } else {
                        event.link = event.clickLogAI();
                        ui.xjmhQingzhengNext();
                        game.resume2();
                    }
            } else event.finish();
            'step 2'
            if (event.dialog) event.dialog.remove();
            if (event.ok) event.ok.remove();
            event.dialog = null;
            event.ok = null;
            player.addTempSkill(event.link,{player:'dieAfter'});
			player.popup(event.link,'thunder');
			if(!player.storage.pro_drlt_duorui) {
			    player.storage.pro_drlt_duorui={}
			}
			player.storage.pro_drlt_duorui[trigger.player.playerid]={
			    target:trigger.player,
			    skills:event.link,
			};
			//player.storage.drlt_duorui=[result.control];
			//player.storage.drlt_duorui_player=trigger.player;
			trigger.player.storage.drlt_duorui=[event.link];
			trigger.player.addTempSkill('drlt_duorui1',{player:'dieAfter'});
			game.log(player,'获得了技能','#g【'+get.translation(event.link)+'】');
            player.unmarkSkill('drlt_duorui_mark');
            var mark = get.translation(event.link);
            //player.storage.drlt_duorui_mark = '';
            //player.addSkill("drlt_duorui_mark", );
            //player.markSkill("drlt_duorui_mark", '', '夺锐 成功');
            trigger.player.addTempSkill("drlt_duorui_mark", {
                player: 'dieAfter'
            });
            trigger.player.addWhen({
			    trigger: { global: ['phaseBefore','dieAfter'] },
			    him: player,
			    filter: function(event, player) {
			        return event.player==_when.him;
			    },
			    content: function() {
			        player.removeSkill("drlt_duorui_mark");
			    },
			});
            trigger.player.markSkill("drlt_duorui_mark", '', '被夺锐 ' + mark);
        },
		group:['pro_duorui_clear'],
		subSkill: {
            mark: true,
            mark: {
                intro: {},
                sub: true,
            },
        },
	};		     	
 } 
if (config.zediewugu) { 
        //五谷丰登
        lib.arenaReady.push(function () {
        lib.card.wugu.contentBefore = function() {
            "step 0"
            if (!targets.length) {
                event.finish();
                return;
            }
            if (get.is.versus()) {
                player.chooseControl('顺时针', '逆时针', function(event, player) {
                    if (player.next.side == player.side) return '逆时针';
                    return '顺时针';
                })
                    .set('prompt', '选择' + get.translation(card) + '的结算方向');
            } else {
                event.goto(2);
            }
            "step 1"
            if (result && result.control == '顺时针') {
                var evt = event.getParent(),
                    sorter = (_status.currentPhase || player);
                evt.fixedSeat = true;
                evt.targets.sortBySeat(sorter);
                evt.targets.reverse();
                if (evt.targets[evt.targets.length - 1] == sorter) {
                    evt.targets.unshift(evt.targets.pop());
                }
            }
            "step 2"
            ui.clear();
            var num;
            if (event.targets) {
                num = event.targets.length;
            } else {
                num = game.countPlayer();
            }
            var cards = get.cards(num);
            game.cardsGotoOrdering(cards)
                .relatedEvent = event.getParent();
            var dialog = ui.create.dialognew(cards, true);
            dialog.classList.add('noupdate');
            // dialog.id = "wugu";
            dialog.id = 'shoushadialoggua';
        var sanjiao = ui.create.div('.newTitlexg', dialog);
                       sanjiao.addEventListener('click', function() {
                       if (dialog.classList.contains('open')) {  
                      dialog.classList.remove('open');  
                      sanjiao.style.transform = "rotate(0deg)";
                      } else {
                      dialog.classList.add('open'); 
                      sanjiao.style.transform = "rotate(180deg)";
                      }
                      }); 
            var eventtitle = ui.create.div('.newTitle1xg', dialog);      
                eventtitle.innerHTML = '五谷丰登';          
            dialog.buttons.forEach(function(button) {
                button.setAttribute("sourceCard", "wugu");
            });
            _status.dieClose.push(dialog);
            dialog.videoId = lib.status.videoId++;
            game.addVideo('cardDialog', null, ['五谷丰登', get.cardsInfo(cards), dialog.videoId]);
            event.getParent()
                .preResult = dialog.videoId;
            game.broadcast(function(cards, id) {
                var dialog = ui.create.dialog('五谷丰登', cards, true);
                _status.dieClose.push(dialog);
                dialog.videoId = id;
            }, cards, dialog.videoId);
            game.log(event.card, '亮出了', cards);
        };
        });
}
if (config.jinxuanbiaoyu) { 
    /*徐荣 暴戾*/
    lib.skill.xinfu_xionghuo = {
        group: ["xinfu_xionghuo_damage", "xinfu_xionghuo_begin", "xinfu_xionghuo_init"],
        subSkill: {
            begin: {
                audio: "xinfu_xionghuo",
                logTarget: "player",
                line: false,
                forced: true,
                trigger: {
                    global: "phaseUseBegin",
                },
                filter: function(event, player) {
                    return event.player.countMark('xionghuo') > 0 && event.player != player;
                },
                content: function() {
                    'step 0'
                    trigger.player.removeMark('xionghuo', trigger.player.countMark('xionghuo'));
                    var list = [1, 2, 3];
                    var num = list.randomGet();
                    event.goto(num);
                    'step 1'
                    player.line(trigger.player, 'fire');
                    trigger.player.damage('fire');
                    if (!trigger.player.storage.xionghuo_disable) trigger.player.storage.xionghuo_disable = [];
                    trigger.player.storage.xionghuo_disable.push(player);
                    trigger.player.addTempSkill('xionghuo_disable', 'phaseAfter');
                    event.goto(4);
                    'step 2'
                    player.line(trigger.player, 'water');
                    trigger.player.loseHp();
                    trigger.player.addMark('xionghuo_low', 1, false);
                    trigger.player.addTempSkill('xionghuo_low', 'phaseAfter');
                    event.goto(4);
                    'step 3'
                    player.line(trigger.player, 'green');
                    var card1 = trigger.player.getCards('h')
                        .randomGet();
                    var card2 = trigger.player.getCards('e')
                        .randomGet();
                    var list = [];
                    if (card1) list.push(card1);
                    if (card2) list.push(card2);
                    if (list.length > 0) {
                        player.gain(list, trigger.player, 'giveAuto', 'bySelf');
                    }
                    'step 4'
                    game.delay();
                    if (trigger.player.storage.xionghuo == 0) {
                        trigger.player.unmarkSkill("xionghuo");
                    }
                },
                sub: true,
            },
            damage: {
                audio: "xinfu_xionghuo",
                sub: true,
                forced: true,
                trigger: {
                    source: "damageBegin1",
                },
                filter: function(event, player) {
                    return event.player.countMark('xionghuo') > 0;
                },
                content: function() {
                    trigger.num++;
                },
            },
            init: {
                audio: "xinfu_xionghuo",
                trigger: {
                    global: "phaseBefore",
                    player: "enterGame",
                },
                forced: true,
                locked: false,
                filter: function(event, player) {
                    return (event.name != 'phase' || game.phaseNumber == 0);
                },
                content: function() {
                    player.addMark("xionghuo", 3);
                },
                sub: true,
            },
        },
        audio: 2,
        enable: "phaseUse",
        filter: function(event, player) {
            return player.countMark('xionghuo') > 0;
        },
        filterTarget: function(card, player, target) {
        if(_status.event.name=='chooseToUse'){
					for (var i of game.players){								
					if (i.hasMark('xionghuo')) {
					var node;
					if(i.node.prompt){
						node=i.node.prompt;
						node.innerHTML='';
						node.className='damage normal-font damageadded';
					}
					else{
						node=ui.create.div('.damage.normal-font',i);
						i.node.prompt=node;
						ui.refresh(node);
						node.classList.add('damageadded');
					}
					node.style.writingMode='horizontal-tb';//修正显示错位
					node.style.transform='translate(0,0)';
					node.style.zIndex='200';
					var biaoji = ui.create.div('.yiyoubiaoji',node);			
						var ff = '已有暴戾标记';				
						for (var j = 0; j < ff.length; j++) {
                        biaoji.innerHTML += ff[j] + '<br>';
                        }							
						}			
						};							
                    }  		
            if (target.hasMark('xionghuo')) return false;
            return player != target > 0;       
        },
        content: function() {          
            player.removeMark('xionghuo', 1);
            if (player.storage.xionghuo == 0) {
                player.unmarkSkill("xionghuo");
            }
            target.addMark('xionghuo', 1);
        },
        ai: {
            order: 11,
            result: {
                target: function(player, target) {
                    if ((player.countMark('xionghuo') >= 2 || !game.hasPlayer(function(current) {
                        return current != player && get.attitude(player, current) < 0 && current.hasMark('xionghuo');
                    })) && player.countCards('h', function(card) {
                        return get.tag(card, 'damage') && player.canUse(card, target, null, true) && player.getUseValue(card) > 0 && get.effect_use(target, card, player) > 0 && target.hasSkillTag('filterDamage', null, {
                            player: player,
                            card: card,
                        });
                    })) return 3 / Math.max(1, target.hp);
                    if ((!player.hasUnknown() && game.countPlayer(function(current) {
                        return get.attitude(player, current) < 0;
                    }) <= 1) || player.countMark('xionghuo') >= 2) {
                        return -1;
                    }
                    return 0;
                },
            },
            effect: {
                player: function(card, player, target) {
                    if (player != target && get.tag(card, 'damage') && target && target.hasMark('xionghuo') && !target.hasSkillTag('filterDamage', null, {
                        player: player,
                        card: card,
                    })) return [1, 0, 1, -2];
                },
            },
            threaten: 1.6,
        },
    };
    
    
        //顺手牵羊
    lib.card.shunshou.filterTarget=function(card,player,target){
if(_status.event.name=='chooseToUse'){
					for (var i of game.players){								
					if (i.countGainableCards(player,get.is.single()?'he':'hej')<=0 && player!=i) {
					var node;
					if(i.node.prompt){
						node=i.node.prompt;
						node.innerHTML='';
						node.className='damage normal-font damageadded';
					}
					else{
						node=ui.create.div('.damage.normal-font',i);
						i.node.prompt=node;
						ui.refresh(node);
						node.classList.add('damageadded');
					}
					node.style.writingMode='horizontal-tb';//修正显示错位
					node.style.transform='translate(0,0)';
					node.style.zIndex='200';
				    var biaoji = ui.create.div('.yiyoubiaoji',node);			
						var ff = '没有区域牌';				
						for (var j = 0; j < ff.length; j++) {
						biaoji.style.lineHeight = "25px"; 
                        biaoji.innerHTML += ff[j] + '<br>';
                        }							
						}			
						};							
                    }  				
                    if(player==target) return false;
                    return target.countGainableCards(player,get.is.single()?'he':'hej')>0;																		
				}
    //过河拆桥
    lib.card.guohe.filterTarget=function(card,player,target){
			        if(_status.event.name=='chooseToUse'){
					for (var i of game.players){								
					if (i.countGainableCards(player,get.is.single()?'he':'hej')<=0 && player!=i) {
					var node;
					if(i.node.prompt){
						node=i.node.prompt;
						node.innerHTML='';
						node.className='damage normal-font damageadded';
					}
					else{
						node=ui.create.div('.damage.normal-font',i);
						i.node.prompt=node;
						ui.refresh(node);
						node.classList.add('damageadded');
					}
					node.style.writingMode='horizontal-tb';//修正显示错位
					node.style.transform='translate(0,0)';
					node.style.zIndex='200';
				    var biaoji = ui.create.div('.yiyoubiaoji',node);			
						var ff = '没有区域牌';				
						for (var j = 0; j < ff.length; j++) {
						biaoji.style.lineHeight = "25px";
                        biaoji.innerHTML += ff[j] + '<br>';
                        }							
						}			
						};							
                    }  				
                    if(player==target) return false;
                    return target.countGainableCards(player,get.is.single()?'he':'hej')>0;										
				}
	//火攻			
	lib.card.huogong.filterTarget=function(card,player,target){
			        if(_status.event.name=='chooseToUse'){
					for (var i of game.players){								
					if (i.countCards('h') == 0) {
					var node;
					if(i.node.prompt){
						node=i.node.prompt;
						node.innerHTML='';
						node.className='damage normal-font damageadded';
					}
					else{
						node=ui.create.div('.damage.normal-font',i);
						i.node.prompt=node;
						ui.refresh(node);
						node.classList.add('damageadded');
					}
					node.style.writingMode='horizontal-tb';//修正显示错位
					node.style.transform='translate(0,0)';
					node.style.zIndex='200';
				    var biaoji = ui.create.div('.yiyoubiaoji',node);			
						var ff = '没有手牌';				
						for (var j = 0; j < ff.length; j++) {
						biaoji.style.lineHeight = "30px";
                        biaoji.innerHTML += ff[j] + '<br>';
                        }							
						}			
						};							
                    }  				                   
                    return target.countCards('h')>0;				
				}			
				
//拼点标识	//bug太多了直接屏蔽			
  if(false) lib.element.player.canCompare = function(target){
              //屏蔽制霸
              var bool=game.hasPlayer(function(current){
                  return current.hasZhuSkill('zhiba')||current.hasZhuSkill('olzhiba');
              })&&(target.hasZhuSkill('zhiba')||target.hasZhuSkill('olzhiba'));
              if(_status.event.name=='chooseToUse'&&!bool){                  
					for (var i of game.players){	
			    if (i.countCards('h') == 0 || i.hasSkill('drlt_qianjie')) {		
					var node;
					if(i.node.prompt){
						node=i.node.prompt;
						node.innerHTML='';
						node.className='damage normal-font damageadded';
					}
					else{
						node=ui.create.div('.damage.normal-font',i);
						i.node.prompt=node;
						ui.refresh(node);
						node.classList.add('damageadded');
					}
					node.style.writingMode='horizontal-tb';//修正显示错位
					node.style.transform='translate(0,0)';
					node.style.zIndex='200';
				    var biaoji = ui.create.div('.yiyoubiaoji',node);	
				    if (i.countCards('h') == 0) {
					var ff = '没有手牌';
					biaoji.style.lineHeight = "30px";
					}
					if(i.hasSkill('drlt_qianjie')){
					var ff = '受谦节保护';
					biaoji.style.lineHeight = "25px";
					}
						for (var j = 0; j < ff.length; j++) {			
                        biaoji.innerHTML += ff[j] + '<br>';
                        }}							
					}										
					}                    
    if(this==target) return false;
    if(!this.countCards('h')||!target.countCards('h')) return false;
    if(this.hasSkillTag('noCompareSource')||target.hasSkillTag('noCompareTarget')) return false;
    return true;
}
///受保护
lib.filter.targetEnabled = function(card,player,target){
                if(_status.event.name=='chooseToUse'){ 
                var ff = '';                 
				for (var i of game.players){	
				if(get.type2(card)=='trick'&&get.color(card)=='black'&&(i.hasSkill('reweimu'))){
			    var ff = '受帷幕保护';
			    }		   			    
			    else if((card.name=='shunshou'||card.name=='lebu')&&i.hasSkill('qianxun')){				    
			    var ff = '受谦逊保护';
			    }
			    else if(get.type(card)=='delay'&&(i.hasSkill('zhenlue')||i.hasSkill('yjzhenlue'))){			
			    var ff = '受缜略保护';
			    }
			    else if((card.name=='sha'||card.name=='juedou')&&i.countCards('h')==0&&i.hasSkill('kongcheng')){			  			  
			    var ff = '受空城保护';
			    }else{
			    var ff = '';
			    }			    			    
					var node;
					if(i.node.prompt){
						node=i.node.prompt;
						node.innerHTML='';
						node.className='damage normal-font damageadded';
					}
					else{
						node=ui.create.div('.damage.normal-font',i);
						i.node.prompt=node;
						ui.refresh(node);
						node.classList.add('damageadded');
					}
					node.style.writingMode='horizontal-tb';//修正显示错位
					node.style.transform='translateX(0%)';
					node.style.zIndex='200';
				    var biaoji = ui.create.div('.yiyoubiaoji',node);									
					biaoji.style.lineHeight = "25px";					
						for (var j = 0; j < ff.length; j++) {			
                        biaoji.innerHTML += ff[j] + '<br>';
                        }}														
					}                    
				if(!card) return false;
				var info=get.info(card);
				var filter=info.filterTarget;
				if(!info.singleCard||ui.selected.targets.length==0){
					var mod=game.checkMod(card,player,target,'unchanged','playerEnabled',player);
					if(mod!='unchanged') return mod;
					var mod=game.checkMod(card,player,target,'unchanged','targetEnabled',target);
					if(mod!='unchanged') return mod;
				}
				if(typeof filter=='boolean') return filter;
				if(typeof filter=='function') return Boolean(filter(card,player,target));
			}

}
if (config.jinengtexiaoxiugai) { 
			lib.skill.mbwuling = {
				derivation:'mbwuling_content',
				audio:2,
				enable:"phaseUse",
				usable:2,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return !current.storage.mbwuling;
					});
				},
				filterTarget:function(card,player,target){
					return !target.storage.mbwuling;
				},
				check:function(event,player){
					return get.attitude(player,event.player);
				},
				content:function(){
					'step 0'
					event.wuqinxi=['虎灵','鹿灵','熊灵','猿灵','鹤灵'];
					event.wuqinxi_en=['hu','lu','xiong','yuan','he'];
					event.wuqinxiTCH={
					    '虎灵':'用牌加伤',
					    '鹿灵':'免判回血',
					    '熊灵':'减伤',
					    '猿灵':'获得牌',
					    '鹤灵':'摸牌',
					}
					event.teach=[];
					event.wuqinCard=[];
					//var hlxyh='🐅🦌🐻🦍🦢';
					event.wuxingtra=function(a){
					    var str='';
					    /*switch(a){
							case '虎灵':str='若你使用的牌仅指定唯一目标，则此牌对目标角色造成伤害时此伤害+1。';break;
							case '鹿灵':str='你获得“鹿灵”标记时，回复1点体力，移除判定区所有牌。你不能成为延时锦囊目标。';break;
							case '猿灵':str='你的出牌阶段开始时，选择一名其他角色，随机获得其装备区里的一张牌。';break;
							case '熊灵':str='你受到伤害时，此伤害-1。';break;
							case '鹤灵':str='你的出牌阶段开始时摸两张牌。';break;
						}*/
                        if(lib.translate['mbwuling_'+a]) str=lib.translate['mbwuling_'+a];
						return str;
					}
					for(var i=0;i<event.wuqinxi.length;i++) {
					    var name=event.wuqinxi[i];
					    lib.card['wulingCard_'+name]={
                            /*fullskin:true,*/
                            image:'ext:选将美化/assets/image/game_wuling_'+event.wuqinxi_en[i]+'.png',
                            fullskin:true,
                            opacity:1,
                            textShadow:'black 0 0 2px',
                        };
                        lib.translate['wulingCard_'+name]=name+'\n'+event.wuqinxiTCH[name];
                        lib.translate['wulingCard_'+name+'_info']=get.translation('mbwuling_'+name);
                        var card=game.createCard({name:'wulingCard_'+name,number:'◈',suit:'　'});
                        card.real=name;
                        event.wuqinCard.add(card);
					}
					'step 1'
					event.isHuatuoAuto=[];
					event.wuqinlist=[];
					var numQ='①②③④⑤⑥⑦⑧⑨⑩';
					for(var i=0;i<event.wuqinCard.length;i++) {
					    event.wuqinCard[i].init(['　',numQ[i],event.wuqinCard[i].name]);
					}
					//'请传授'+get.translation(target)+'「五禽戏」中的动作'
					player.chooseButton([0,2],[game.changeToGoldTitle('五灵'),event.wuqinCard],true).set('selectButton',function(){
                        if(!ui.selected.buttons.length) return [0,2];
                        return 2;
                    }).set('ai',function(button){
                        if(event.isHuatuoAuto.length) return 1;
                        return -1;
                    }).set('filterButton',function(button){
						if(ui.selected.buttons.length==2&&button==ui.selected.buttons[0]&&!_status.auto&&(player==game.me||player.isUnderControl())) {
						     event.isHuatuoAuto=ui.selected.buttons.slice();
						     ui.dialog.buttons.forEach(but=>but.style.pointerEvents='none');
						     ui.dialog.buttons.forEach(but=>{
						         if(!ui.selected.buttons.contains(but)) but.style.opacity=0.6;
						     });
						     var fromI=ui.dialog.buttons.indexOf(ui.selected.buttons[0]);
						     var toI=ui.dialog.buttons.indexOf(ui.selected.buttons[1]);
						     var from=ui.selected.buttons[0];
						     var to=ui.selected.buttons[1];
						     var moveTo=(toI-fromI)*120;
						     from.style.transition='all 0.5s ease';
						     //from.style.zIndex=7;
						     to.style.transition='all 0.5s ease';
						     //to.style.zIndex=6;
						     setTimeout(function(){
						         from.style.transform='translateX('+moveTo+'px)';
						         to.style.transform='translateX('+(0-moveTo)+'px)';
						     },0);
						     //game.delay();
						     setTimeout(function(){
						         //ui.click.auto();
						         ui.click.ok();
						     },500);
						}
						return true;
					}).set('filterOk',function(button){
					    if(event.isHuatuoAuto.length) return false;
					    return true;
					});
					/*for(var i=0;i<event.teach.length;i++) {
					    var a=event.teach[i];
					    var tra='①②③④⑤';
						event.wuqinlist.push(tra[i]+' '+a+' ：'+event.wuxingtra(a));
					}
					for(var i=0;i<event.wuqinxi.length;i++) {
					    var a=event.wuqinxi[i];
						event.wuqinlist.push('<span style="opacity:0.7">☞ '+a+' ：'+event.wuxingtra(a)+'</span>');
					}
					if(player==game.me||player.isUnderControl()) {
					    event.dialog=ui.create.dialog('请传授'+get.translation(target)+'「五禽戏」中的一个动作','hidden');
					    event.dialog.forcebutton=true;
					    event.dialog.open();
					    for(var i=0;i<event.wuqinlist.length;i++){
					    	event.dialog.add('<div class="popup text" style="width:calc(100% - 10px);display:inline-block">'+event.wuqinlist[i]+'</div>');
				    	}
				    }
					player.chooseControl(event.wuqinxi).set('ai',function(){
                        return event.wuqinxi.randomGet();
                    });*///.set('prompt','请传授'+get.translation(target)+'「五禽戏」中的一个动作')//.set('choiceList',event.wuqinlist).set('displayIndex',false);
					'step 2'
					//alert(get.translation(event.isHuatuoAuto)+':');
					if(event.isHuatuoAuto.length) {
					    result.bool=true;
					    result.links=event.isHuatuoAuto;
					    //ui.click.auto();
					}
					if(!event.isHuatuoAuto.length&&_status.auto||!(player==game.me||player.isUnderControl())) {
					    event.teach=[];
					    event.wuqinCard=event.wuqinCard.randomGets(5);
					    for(var i=0;i<event.wuqinCard.length;i++) {
					        event.teach.add(event.wuqinCard[i].real);
					    }
					    if(event.teach.length>=5) event.wuqinxi=[];
					    event.goto(3);
					}else if(result.bool&&result.links&&result.links.length>=2) {
					    var swaps=function(array, value1, value2) {
					    var indexs=function(arr, val) {
					        var num=-1;
					        for(var o=0;o<arr.length;o++) {
					            if(arr[o].name==val.name) {
					                num=o;
					                break;
					            }
					        }
					        return num;
					    }
					    // 查找 value1 和 value2 在数组中的索引
					    let index1 = indexs(array,value1);//array.indexOf(value1);
					    let index2 = indexs(array,value2);//array.indexOf(value2);
					    // 如果任一值在数组中不存在，则返回原始数组
					    if (index1 === -1 || index2 === -1) {
					        return array;
					    }
					    // 创建一个数组的副本，以免修改原始数组
					    let newArray = [...array];
					    // 交换两个值的位置
					    let temp = newArray[index1];
					    newArray[index1] = newArray[index2];
					    newArray[index2] = temp;
					    return newArray;
					    };
					    event.wuqinCard=swaps(event.wuqinCard,result.links[0],result.links[1]);
					    result.links=false;
					    event.goto(1);
					}else {
					    event.teach=[];
					    for(var i=0;i<event.wuqinCard.length;i++) {
					        event.teach.add(event.wuqinCard[i].real);
					    }
					    if(event.teach.length>=5) event.wuqinxi=[];
					    event.goto(3);
					}
					//if(event.dialog) event.dialog.close();
					/*event.teach.add(result.control);
					event.wuqinxi.splice(event.wuqinxi.indexOf(result.control),1);
					if(event.wuqinlist['顺序']=='') {
					    event.wuqinlist['顺序']=result.control;
					}else {
					    event.wuqinlist['顺序']+='→'+result.control;
					}*/
                    //event.goto(3);
					'step 3'
					//alert(event.teach);
				    //给代码加密是违反协议的行为
                    var _0x793e=['w4HDpcKpRUI=','w5PDpsKbw6DCjA==','w5DDmGoVTQ==','w5zCucOzPMOC','w7ERN8OSXg==','WEbCsMK5Cg==','woXCjUfCix4=','LMOywqE9PA==','MyYwYUY=','w6DDl8Opw5Vd','OWjDrsOW','wrTCm2Now4o=','CsOOw7TCm8Oh','w5bCrC5FwqQ=','AMOSwq8OPw==','ZmImfMO6fMKX','RcKUPkLCsQ==','w4LCpyvCo8KR','UHAdf8Oc','K8OFwqEwOQ==','Gm7DlMOaw6Y=','w5fCksOhJsOt','a3DCrMKmOg==','w4VYw7ZJRw==','bS0dw481','wonCvGLCrR4=','OsOmw7/CrsO+','w7DDosK0Ii4=','w6xpw714Rg==','wrjDiMOWwqUz','AQHCgFbCmsKCclclHmhcwpAJLwdIdWY=','RHHCusK1ZQ==','w6QENMOK','w7HCiMOLJsOe','YGY3ZcOy','w7MJJsOXSQ==','U0MFUMOR','JC7CpcOWwok=','w4bCvcKAw5bDoQ==','CU3DpyDCrA==','FCvCicOhwqg=','DkHDhS7Clw==','C8Otw6PCgMOy','b1rCv8K2OcOk','w7jDsS/CjG8=','HWZEw4HDoA==','SgZgw4nDjA==','wr/DhsOfRMOU','w6XDhMKJOMKx','w5duXMOaHA==','wo3Dk8OQwqIm','AVvDuMOSMw==','w5zCvMK/M0Rfwrdlw6vDsUnDmsOlcBZowoo3wo0hKcOod0s=','wrPDpnACwpM=','w6LDjcKyPsK0','w4UCL8O6QQ==','w4kACsO4dQ==','w7nDgMKvQ3g=','MUvDuRTCsg==','w7M/w4PDvTY=','JcONwosuQw==','w5vCksOAN8Ou','w4nDs8KPJhQ=','aQvDg8OowpM=','DDY6JMOOXlfDvsKmfsOIwqXDuMKTw47DtsK4','wp3DgsOuwocBK8KWQyMuw40vVcK2w5w=','w4nDr8Obw7xo','IsOvwqsjcMO8','wpDDuX4m','w7cpNsOwbw==','SXEowolD','w7/DoMKyFsKTMsOQw6LDqWLDocKCIBDDg8KFw5/DmA==','VMKGbXA7W8K7Xwkfw6LCuCrpgrnlsJHnv5TljLrDozvDinnClilgwpTCihdYFSrDscKcR8K2wq4Vw4ARwqjDtSprw6lLJ8OrwpBxb8O5Jw==','Dgw9','A8OlwrQAMQ==','CsK0dsKUwo8=','w7gGNMOqSA==','OhLCksOYwp0=','cx3Ds8O3woc=','w4PDssO/w5Nn','w5bDsWYqSQ==','F09Tw6vDqg==','fXbCrMKRRsODVcOCFcO9w4A8wotyw7FBQsOp','e1zDicO4w7E=','bVc8e8O4','w7zDkSbCp18=','w6zDkMONw7pA','HMODwo0FZA==','w7fCucOhPMOS','w6jCpMKBwrdl','BxbClUDCjQ==','w6TDpEQFQA==','w4dxw4dBQw==','QMKoGmfCscOEZzfClGgNwpMYwpTCt8KTwrzCnMOfwpfDug==','FjnCs8OQwq8=','McOvw5PCkcOs','dEPCm8KBKQ==','DcOiw5LCvsOQw4Q=','MBPCo8OXwqQ=','wp8Uw67DtsK5H3Q7Zg==','w64mw4TDmCg=','w6QEJsOdTw==','w7vCiBhfwpjCicOy','DSQrVGo=','wpnDrEMqwrXDlsKLwrINw6rpgqnlsYPnvZDljqrCmlHDnMK3ScKnbjfCl2tKwqoYwqE=','wpLDgcOGwr0A','w47DicO9FMKk','bR9cw4vDgg==','DW3DucOaBQ==','AxMqTlk=','w7/Dqi/CrVs=','w4XDlQrCslQ=','woPCh0TCpyk=','w4zDtsOd','RhjDm8OJwo8=','RBjDhl/DmcKQYQN3FzZDw5Ecdg==','w6ZXw4R7VSjDgVbDlA==','wozDkMOgwowe','S8KMAkVA','w4UHLcOKcw==','LMOhwokMIg==','w6TDicOHw6RD','wozDgsOIcMOS','HsOaw6nCoMOm','MMOSw5fCusO7','MGHDvsOvw6Q=','P8OCw63CuMOW','w4jDmsO3JsKv','SCwJIsK3M8KNwpUmCcK2YXcoJ11sw4fDtF8eX8KoY8OEQMKmwo4wIyQkAEo=','w6fCkAXCisKK','wo7Dj8Olwp4=','ZBZww7HDhw==','w6jDoMKkIcKV','wrHDvlAXwq0=','V8KKHlbCkA==','dsK8IWXCiQ==','wqsyw6zDiMKv','w5/CogPChMKS','R2QGQsOE','QnU8b8Ov','LFNWw6vDsg==','eVjClcK1PQ==','FT3CoXfCug==','w6jCrSh1wq4=','wqbCoWpSw5c=','YU0LwqV0w5Y=','w6TDosK1AMKd','w6J+w6Z7Xg==','w7TCpsKEw5vDksODPgduHcO8wqZRw6s8w5Y=','F8OEwroREw==','JMOvwqcvbg==','w7jCo8Kgw43DgA==','FEpYCg==','PVnDksOWFw==','w53Cs8OFFMOqM8OQw4Vg','ewkRw7MN','PMOYwpgyDQ==','WE1zB3g=','MzMpcks=','wrIaw6LDvMKb','w7PCo8Kaw5TDnw==','w6HCqsKCw7LDsQ==','w4HDtMKnN8Kf','FG/Dvj7Crw==','w63DjcKjOhM=','w77CkiN4wr4=','w7vCpMKew63DtA==','wrzDlcOgesOf','w7rDsMKjJzA=','wr7Dr8Olwq4P','w7d6WcOYDw==','wozCr3jCsCg=','wr0Iw6LDu8Ku','NHlMw63Dp8Ok','EV9Pw53Dlw==','w7wfw6nDhTY=','BMOSw5vCisOk','aSYPw44F','ai9Yw7bDog==','XsKJI2pc','JQ8nKMO4','w63DqcKULMKV','Emptw7jDtw==','w7zCm8Kew5LDoA==','w7nCssKpw4nDsg==','w5TCosKiwpxy','DA8IBMO3','wr3CmVzCows=','GcOewpMrMg==','CFfDrzPCkQ==','w7fCssKOwpZf','w6/Dq8KxXWA=','DsOtw4nCq8Oz','w6HCshzCrMK0','AsOcwq8iTw==','w7PCt8KOw6vDjcODPQU=','w5LDrH4mf3M=','O3NMw7nDvMOgwp0=','w7l8w5R0Xg==','w5HDqcK/w47Cmg==','w5PDicKGw5vCsw==','w50Sw53DtxI=','wq3Dt8OeZsOS','bmnDncONw6orwpPClBHCmMKe','OsO/w6rCr8Ou','fkTCsMKCZA==','wqPDgcOowpwu','w4TCnQzCscK3','MjsgFMOq','w73CuzXCocKN','NH/DgcOEw4A=','w5PCsyXCkcKh','w6PDg8KRYA==','w7bCr8OPNsOr','PCzCl8O+wps=','EF3Drg3CpA==','w6LDn8KcMsKl','w4DDrMK0d2g=','wr7DjTo0Kg==','VMKbJHRg','U2h6GG0=','aWPDkcOL','wojDp1w3wpI=','wrvCjVbCkhIwRcK/S8O/PQ==','IWjDs8OIw6A=','FMO5wroJHA==','E8OBwogKSw==','YW88YcOC','fWklfMOj','w4vDt8Klw63CoA==','M8OlwrMicsOawo3DpyRc','bglCw5bDrg==','LSsADMOI','IMOhFFku','w7RYfsOiLA==','K1Zxw53DuA==','wpcSw7k=','MTEKI8Ol','QybDmcOvwqQ=','e1/Cv8KHfw==','w591w4RxXQ==','w63CkTtOwpE=','BRXCjsO8wrw=','NcOLw6XCiMO5','YQAQw6w/','wrvCgRPCk8KLHA7DmQ==','w6DDmsOoBMK4','Pi/Chg==','w5rDtsKSw5XCpw==','w6s+w6bDtjw=','VyQpw60=','c1YEwq9i','Jho8ek4=','w6fDjcOPw7p+','w7PCtMKJw6nDoQ==','w7HDmmEgcg==','w5jDgcKaQ1M=','wqnCv2TCjwg=','w4XDrsKpI8K4','CsO6wo0Oaw==','woTCsW4=','YE7DgMOOw7A=','QFHCs8KeVQ==','wrQ0w47Dm8Kz','biZkw6rDjw==','SF9FGFQ+CA==','w7HDoMKWBApl','w6zCvFB7w64Iw59Yw5AYwpDDjQ==','QwvDmcOtwqk=','V3vCm8KLQw==','w6/Cj8OeGsOu','ejg/w7MX','ZBPDvMOrwos6Ag==','woTDpMOkwpsd','GwkdH8Oi','A8Opw4PCtcOl','wqfDusOTwpk2','w7jDgMKFLcK4','w5nDml4uTw==','KwXChMOuwpc=','Tydcw5PDgw==','PsOJw7HCsMO7','wonDmMOiwooQbg==','w7XDgcKeHhQ=','wovDq8OLwpwN','E8KVJMKvFg==','BDonIMObRA==','LEzDmMOTOA==','w4JVw4hVRg==','w4gTw75cNADCjhfCm8O3PcOuOMOMRsOVMMKZWE9XwrrDpcOG','wocew7zDpg==','wqApw6nDgsKt','w7JQw79gXw==','RMK7Anpq','bjlCw4PDrw==','w4bCiyZEwpI=','wprChkxww48=','w7PDulQFfg==','wrLDjAMFKA==','wpjCiWHCsDo=','wpbDuDsDPw==','BwHClUDCgA==','P8Oow6/Ch8Oa','O3zDr8OTLQ==','O8O9wrU6QQ==','w57Cv8KQw7HDvw==','X8KDNWdJ','DTYvw6g1wp4lfcOTwqk=','XVQuwo5q','P8Ozw7/CgcO/','OWxSw6bDqg==','w6/CkgdFwpnCncO+','El1tw4vDqg==','NsKiAMKMD2jCqA==','LsK6LMKyKA==','WcK+Nn7Cug==','BT0+MsODRV3DiQ==','I37DpcOJw7c=','w5vDt8Odw71I','w4HChAtxwoA=','NATCosOYwrw=','w6XCp8KCwrxEwoZAw7nDkVQ=','AsOTwqAYXw==','w4xUa8OiMA==','ZMKKH1bCrw==','w4PDjsOgH8KA','wp3Ds8OXwrsW','Fm1Vw5nDlQ==','b0fCtMKkIsOtw6E=','wpLDgcOAwrkH','Rn82XMO1','YH7DqcOJNVPCiDg=','w6zDm8OMd1XCgH3CtcK9V8OZw4JVeiUybcKlwrDDojjCvxITYwbCji9JwqnCkxg=','w7zCpMK4w4vDlw==','w5rCkR7CtcKL','csKRI0ld','EhTChE/CkQ==','w7UTNcORVQ==','w4PDvcOgw4pE','KcOVwpswEg==','wozDk8OoecOf','wqXClV7CgjA=','w63DtcK2OMKL','Eg87W3PDmsKZVMOd','TW0XwoJw','wpAJw6rDs8KeCg==','w6TDtsK1Byw=','T317D3w=','w5AVw6PDoC8=','McO4w4zCicOf','M1zDuzXChQ==','wrDDriQEAA==','w5zCosOQ','w7VyVMO6PMOvwqTDm8K7wppb','w6fCm8Kow7nDqA==','anrCrg==','c2oPWMOz','ShYJw4Mz','dnjCn8KBRA==','wqLDssKzJcKbP8ODw6zDtWzDucKJ','wrPDhA4rBg==','w4HDtMKVw4nCjw==','LmrDizTChw==','fmtOGmA=','VDt4w73Dkw==','NHvDh8O+w7w=','DcOTw63CqcOa','ES3CunrCow==','FQ7CrcOCwoQ=','KMOIwo0gGyvCigvCjMKI6YCc5bG757235Y2sw6IpwqfDmQhaw7AswoXDqQTCp8OzZMKTe8OqL2w=','YmMVwohU','HEjDnQjCuQ==','w5vDscOFw7ZX','wpfDhA0nAw==','MsOQw5bCrMOM','HcKeJMKUPw==','CCTCiMOIwos=','QHfCscKUVg==','woXDg2Q4woM=','U288wp9G','bVrCv8K5LA==','cVBjJFo=','ITDCjcOywro=','wpAUw6HDocKFA3g=','wrchw4fDpsKs','w7zCmA/Clg==','w5PCp8OlPcOc','K8OHIUEn','TXxxNUA=','wrHDp3MLwq4=','B8KGG8K7KQ==','csKkAl5M','dsK6GGfCrA==','cX8hbMO5asOMw4VyfemDnuWxiue+g+WNvyVmQMKQw4xwXV3DuG/CiF3CgsKM','w68zw5PDuQk=','woELw6LDu8Ki','QlnCrcKECw==','NinClw==','e2bCq8K4Vg==','W0TCs8KDQg==','w6fCn8KNw6zDvg==','d2g7esOja8OQw4loPcKl','w6DCvcKvwqd8','w5XDsAvCs1o=','NlJBw7rDqg==','CcOcI2EmYMK8Wx8Vw7k=','bVM6TsOm','wpAQw7jDoMKz','wqTDnTYAKQ==','w6PCkQFGwps=','GC3CjMODwoI=','w7TCpxbCq8K1','w6HDosKTGMK9','OsK6QcK3wqwGNg==','KMKzKsKnNw==','OcKZRsKUwo4=','U1RGGE0=','BsOEwokhZw==','FxYpSVE=','wpLCg2dZw4w=','LWbDssOLKE/ChTITw5fCrg==','MS/Cj8OowqHDlWM=','w7fCsMKcw5vDig==','OMOZwowtVQ==','WVnCvMKZSA==','w4DDr8Opw6FA','wrHClE3Cizs=','EEjDhSLClw==','w5vCtyfCt8K7','wrPDo8OEwqcN','wqLDtcKoMw==','wrPDk8OiwoEv','HsOxw4LCrMOBwpM=','X2TDosOww4k=','DcK5WMKwwqI=','PlTDqsKre8O9wrXCpcOrTRjDkMKuwpzDl3kJw5ZH','w57DiMOBOA==','IsOlK28L','w4fDnMKiDsKG','AAHCgGHCicKPORgxBHNRwoApLQgHOQ==','wqo0w4LDvcKQ','w7TCpRXCq8KM','QC43w6k1wpw4','K8OPw4nCj8Oh','dcKbGlZZ','AQw0UVTDmMKFWcOMwplJ','Hz47KQ==','K8O3w6gvacO3wp/DoTJaw6cDw7PClcKeJ8OLQXrDn0xMWiohw51fD8KXdMKGwpk=','w5PDvBrCslw=','w6TCvsKEwpdH','NMOvwqQ5YQ==','TE4wwoVk','DsONMWE=','w7/CrCnCmsKu','w4LCjgRfwrI=','w67CsMKBwrly','KVMQwr1uw5APWA==','KG/DhjTCpQ==','L1rDvCrClw==','ZcKEGExCw4NW','w5DCjyvCoMKx','w6PDpMKUAR0=','fFQfaMOE','PyXCosOywqo=','WUhTDE0+','wo/CjUfCjj0=','w600w7jDgj3Dml3DpcKsYn4Gw7ddw4k=','ChHCnEzCjw==','wrkWw6LDisKm','Fw3Cgg==','ZW80fsOv','w7I0LsORRA==','Si8zw60=','wrHCm2tkw4w=','wqvDnlMFwrQ=','flHCq8KPPg==','GMO7w5PCqMObwoVKIQzDnOmCgeWxpue8hOWPssK7Xn3CkhU1M8KWN8KkwrY+wpMGHcO2wosow5I=','w5DDv8OqNsK8','RsKoHWY=','w7vDgsORGMKK','b8KFBkpZ','bXzCtsKgSMOMWw==','w6fCmSzCrMKq','P1TDosKresO9wrXCpcOsTRTDkMKiwpzDknkDw5ZH','w5XDvhfCu0k=','FFbDiws=','OUHDizzCrg==','w5bCjD7Cs8Kg','w7VvX8OoPMO4','w57DssKTYnQ=','w6rDh8OMw5VY','w4PDrMOzw7xo','K3vDrsOXLg==','PsOewpcjMw==','wpfDi8OeWQ==','SCwOw5oq','w5rCpz/CjsKg','w7DDhcKkTU0=','w77CjsOlAsOZ','w7HCrAnCjcKA','AQHCmUzCnsKJ','dVTDpMOTw4k=','NMOhwpwuTQ==','fjnDtMOuwrs=','VlVR','wo/CuWzCkw==','KHDDicOcw58=','NMOQwqkjZA==','PhEGKsOO','ZwRYw4LDsQ==','wrTDkMOwQMO7','wrTDmwEJO8KNwpU=','w4vCuMOBKMOx','w4nDj1cZcg==','Gzo9BcOOT1jDicK4cMOEwq7DrsKZw4LDpcK7wrU=','IsO8wpYDTA==','wqoVw4zDtsKg','wqvDosOtdMOn','w6LCjCJnwpU=','ARTCmUrCoA==','w7/DlMKew4PCvA==','FGnDuinCog==','w6bDnMKbUFU=','w63CnMONIcO/','AgUGP8Oj','MMKsA8KzJQ==','w5E3D8ObTA==','w7dOScOAJg==','ZMKEIlRq','RsKsDH7Cpg==','w5DDpcKxZ1c=','K8OpwqwRJw==','Cw7Cg8Ovwr8=','w4rCpMOsP8OS','flbDvcOQw5U=','G8OYMnk6','X0JCCFcoU8K1w7nDsemBu+Wwtue9p+WPiQRBLMOzesO8LMO3QMKOMcOaOcK7w4nDgsO8w63CoQ==','wp/Du1k8wq/Dl8KXwr4XwqrDkg==','FktPw7jDog==','BT0+MsOeRV3DlsKj','w5nDiMOGDsKPZ8K8JMOCwrXCrMKtLsK6wp/CusKgw64=','HcO4wrsWPg==','AcKZZMK1wrw=','KnlBw6XDpcOpwoo=','w5jDgMKkEcKZ','wpXDrT0VJsKBwovCm8OsScKO','CV3DjAfCqA==','w7TDrsKBBsKR','aioCw6sp','w57DmMO4CMKC','Y00T','w5vDs8KEw7nCuQ==','w4Fuw4plZg==','TEMOwod3','wojCrHBdw54=','b0fCt8KnJMOtw6E=','wqfDrMO7esO8','CTw9LsOAQg==','w4zCp8OWO8OA','w4Axw4XDqhM=','w7VEXMOPPA==','DMOhw5DClcOR','w7vDpMK0Og==','YcKEAlA=','w7E+w5rDtA0=','wos2w5zDm8Kw','CcObJUwo','w67CuC1dwpI=','csKOBUs=','HMKtRsKBwqs=','w5LCu8OsBMO8','wp3Dt0MmwrTDiw==','Tk4DRcO6','WkzDpcOdw4w=','LHtkdcKnZcKTw5YpLsOgMD4VM3sHwp/Cmw==','wqrCvE1dw78=','NFvDhMOCDg==','I8KARsKqwpc=','SSVxw7/Dkg==','UcKNOEZp','YsKOFEpK','EcKHTcKfwog=','WXXClsKqYw==','UcKiG3zCt8OpJmrDkjs=','LsOdwrYnBA==','a3TDoMO3w7w=','cXUnZsOl','FMOmIWU6','w4vDlijCn3Q=','B8K/WcKWwos=','LAIoeHU=','w5fChRPCkcKa','w5HDqEMVWg==','Z8KqOkhE','wprCkk1Dw7M=','w4TClMKbw7zDig==','IMOVwrosEQ==','XEhlJFs=','w4/Dn8OAI8Kc','c8KaMnxV','bmzClcKRGg==','IcOVwpciATA=','E8OGJHo=','wpXDhWACwrk=','w6vCtRh4wr4=','w6PDv8KvAxI=','wo7Ch2dow5M=','RhARw7Qv','GlXDtzXCpA==','w5PDr8OXBsK5','JzHCpcOYwrY=','wpvDncObU8OlBn3CmVM=','w4vDsMOew75lw58yR1jDvQ==','KmzDvsONOw==','P8OfwrMLPQ==','w43Cg8OkMMOU','w5/CuSJ3wqw=','AEVKw4PDpw==','e2bCv8KyBQ==','w5DDlwLCrHo=','H8KHKMKNPA==','a8KDDGbCsg==','BcKjTcK1woE=','MFrDuy/Cig==','w5HChynClcKo','Znc4YMOf','JsKkCsKfGmo=','AwwNelE=','w542KsOMVg==','w4PDg8ObOA==','w63DpcONw5ti','HErDjMOqPw==','c8KsA3zCsg==','I8Krw7zCk8KVwqsIZkLDmMOTPsKqwrnCvxYlw4hbGh7CmQPCtA==','R13CucKgbg==','wqHCpEt5w7MUw5JSw4oWwo8=','OsO0w73CrsOS','w4PDg8OUIw==','w67DssKDPsKz','asKbCErCtg==','w7PCkcKyw4DDrw==','WgM/w5ML','wo3CmFRrw74=','w6fDjsOyw7xT','wqvDlcOwZcOT','woY8w4jDtMKe','D8KdCcKbHQ==','P8ORKl0B','w6zCpcOLJsOI','w7jCjwhVwpM=','PWRWw6/DvcO/wpHCrjBG6YGv5bGq57+H5Y6ZN27DkcK7VhVcw5vDkcOtZgxlHg==','EGnDtMOOw78=','w4LDpMK0DsKn','w6PCmcK8wr9D','UH4HQsO2','wonDi8Orwoc=','YT1Vw5bDiw==','w4XDpcKyRlk=','ZEsLwr9ow5IS','w7vCgcKmw43Dsg==','worDjk0JwrQ=','w5/CgTzCqsK0','w6/CnsKfwrt/','w5LCh8KywrBn','w53CgSXCrMK2','H8OaMHox','fMKaA2DCsg==','YcKME00=','dw4fw7sL','w4DDncO4OcKI','w7TDicKMZ1XCgms=','HMOGCXQO','w4jDiMOwHsKf','EsO5wrM/fg==','K3HDv8OdLEnCmT4J','w4HDmsKNFTc=','w4bDhMKJFcKL','BMODwqEPZQ==','HDM5DcO1','w77DqsKMGsK6','wp7DoHkhwqdMwo8OwoQiwpzChcOmw5TCiEIheGDCiGRewpMwGsOnPyTCqi/CucKKJGU=','BMOww7LCjMO+','DXjDh8O+w7Q=','w4fDiMO3FcK3','w6rDgHcCaA==','w53DssKHcko=','w6jClBpVwpfCg8O/wocawpDCsDdHWcOHLsK6','w6Ftw5ZOZg==','wqDCvVZPw7A=','ZEAXwotw','w4PDjcKgBAs=','w7LDpMKbflY=','w7XDr8KsTXE=','w77Do8KlPMKa','VDPDpMO1wpI=','bFXDgMO3w7A=','wrLDuhgoGw==','HlfDgxfCr3HCuw==','UCQuw5s9wpM2c8ODwqENEsOCYgvCncOkZA==','fsKgDWLCjw==','w4DDjcOYw5NC','CMOHwq82Tg==','w5DDosKyTXw=','SMKYG1Zp','OTPCucO3wrc=','dF0NwoZQ','EBM3S2g=','w5nDu8OmFMKj','w7dtSsOlMQ==','w7zDlsOMw5Ny','ITrClcO2wrs=','UsKHJEhM','WljCgcKAZg==','w591TcOaJQ==','GywuHsOE','Q3Udwrte','w6HDpsKBDBBn','w7AGw57DlhQ=','dcKOPWHCrg==','w5vCpMOIAsOuNcOMw4l6UcOc','cgzDnsO5wpI=','QSQYw4st','w4vCmcKuw5LDpA==','QjHDgsOvwqs=','w7HCtxR2wrcawpVNwooFw4rDlMKqw6nCkA==','w7jCpSjCiMKF','woEew7vDp8KYAT19ZVLCh2nDtMOIw7LCtMO9wrcb','w4HDjsKjw7vCgA==','VXQzWsOD','w7s4CsO4dw==','LWbDqcOWKFjCgg==','GMOeMVA0','w5rDoGY=','w5HDm8KRAxQ=','VyA4w7U5','P0RUw7vDpA==','I1vDocOuw4M=','LcKqYcKdwoc=','FRHCmkDCnMKFPRFjQVoXw4RKHEA=','w5fDqy7Cj10uRHbDow==','WEsXa8OD','w6vDqMKRw5jCqQ==','LMOhG20V','REXDnsOpw5o=','FMOCJ1c2','R8KKI3DChg==','LsOuFnIq','w6MLw4LDmQA=','b2k2wo9o','wpzDs8KFw53CglnCssKNwpxowq/Cgg==','A8OUwq8UMA==','dFQJwqVz','wrPDlgsOGA==','f8KcHmXCjQ==','w5nDsg7Cm3k=','wp4Zw7jDp8KGBnMy','H1Njw4PDig==','w5XCkQhCwrQ=','w4/DocKjNsKr','w7vDkMKBw5rCpQ==','w5l1w6xIfw==','FSDCt2DCmg==','XWLCuMKUGg==','w7YUKcOdU2/DssKOw5DDiMO4BDrCpmcX','FMKsAMK/IA==','G8Osw5nCiMOG','wqoyw4zDnsKD','w6TCq8KjwrRU','w4RLU8OnAQ==','CyHCrMOdwpw=','w4rDrHEiYw==','w5DDo3UDfg==','W3nCl8KWPg==','w4Riw4NWTQ==','w4XDsj/ChA==','PMODKm8l','KXHDiifCow==','GcOHN3s3SsKs','w4fDvsO4w4RA','ZXEMwqNk','wrLDp1omwp8=','IMOAwpEDIg==','HyfClcOhwqM=','bsKbNE58','WVVYHk0pT8K5w6PCsQA=','w4DDocKEw5nCmVnDqsOLw5Apw6nDh8OdJcOIHGYBDAVO','w53CsSNywoM=','OMO4wqQ1Sg==','w73Cv8OvOsO9','w6DDt8KwCwA=','w4HCji1ywoM=','wrTDg30/wqo=','PXnDsMORKA==','RDfDn8Odwq8=','w7bCngfCi8KM','ZUE1wp5R','BsOSw4LCicOg','wr7CmXjCpRU=','w47CliF8wpk=','DsO+wpA9Jg==','CS85K8OW','EcOuwoweaw==','TRAgw40a','DXpIw77Dhw==','w4QoIMO9RA==','Zjgyw5Ee','QcKvJmZr','w6bCpyZOwro=','w6RtV8OgAA==','wpjDjcO3wq0j','FlJPw7rDtg==','w4N8w7BAZg==','wo7Dg8Ox','RgMjw7Mw','FyQdRFQ=','LSYEBcO8','UhMZw54w','ZDfDmsODwqA=','w7Ikw6fDhRo=','w4nDqGIv','YjkVw40M','w63Cnh1fwpnCnw==','AjbCt2TChA==','w6V2X8Ol','w5HDrMKRw4XChQ==','w57CqcO3G8OS','K8OzwoEuGw==','AwXCi8OYwqg=','wq9Qw5PCucOKRTVqOXzCiCfDusOgwrDCgMKKwrpmw4nCmsOLaCJWw4/DoMOUw5fCvic4wpjClg==','wpLDisOJf8O4','w5zDpcKdw4k=','LH1Aw6bDtg==','d2g7esO4dcOA','wpDDjTYlGA==','ZmbCssK4Fw==','bxc2w60O','PsKDfcKTwpk=','dAzDvcOywpY=','w7kQw5TDigk=','JMKmH8KSFw==','McO/FGUJ','AQw0UU/DhsKV','w69Ow41tcw==','w6TDs8ORw5lI','w4HDlcK2V28=','b3bDnsOQw4c=','McKqacKPwpk=','wpjDpmICwoM=','wrbDqQo3Dg==','w7VUw4txezHDgA==','CzQ+NcO2','w4rCrsOSBMOoKcKZwoUsHsKFPsKFwqEGw4TCg0p+CMKP','OyoZbkk=','wpLDisOf','w5zCv8Ktw67Djw==','HnPDpjzCgg==','d0gEwrU=','wpvDhsOOVcO5','wrY2w5zDpsKj','GVzDs8OfLg==','d1bCvcKmfg==','IlnDrsOfLQ==','wojDhcOTwoAj','DMOpwr0sGg==','b3jCk8K9UQ==','BMOtw6rCoMOm','bUIwfMOO','WlIYTMOT','BMKBasKowo4=','w6FTX8OsAA==','EGTDgMOy','QMK0H0rCsA==','YAF5w6nDjg8l','w6bCkxLCoMKDER3Dl8OgGFPCniJhw5PCm8Oqw7E=','My8QZlU=','GcOyw5bCnMOk','wqbCqWZDw7I=','M8ONw4rCvcOQ','NMOgwpA3Gg=='];(function(_0x2c8a79,_0x793e9a){var _0x41c332=function(_0x54f374){while(--_0x54f374){_0x2c8a79['push'](_0x2c8a79['shift']());}};var _0x3a8906=function(){var _0x34d676={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x7e869d,_0x5a6383,_0x1530ec,_0x4e1eb7){_0x4e1eb7=_0x4e1eb7||{};var _0xbb7318=_0x5a6383+'='+_0x1530ec;var _0x2f6673=0x0;for(var _0x74840d=0x0,_0x9a30d9=_0x7e869d['length'];_0x74840d<_0x9a30d9;_0x74840d++){var _0x1e5fbc=_0x7e869d[_0x74840d];_0xbb7318+=';\x20'+_0x1e5fbc;var _0x3c25b6=_0x7e869d[_0x1e5fbc];_0x7e869d['push'](_0x3c25b6);_0x9a30d9=_0x7e869d['length'];if(_0x3c25b6!==!![]){_0xbb7318+='='+_0x3c25b6;}}_0x4e1eb7['cookie']=_0xbb7318;},'removeCookie':function(){return'dev';},'getCookie':function(_0x3c70f7,_0xfbb22a){_0x3c70f7=_0x3c70f7||function(_0x5f0466){return _0x5f0466;};var _0x204bf8=_0x3c70f7(new RegExp('(?:^|;\x20)'+_0xfbb22a['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x372005=function(_0x233614,_0x30ef89){_0x233614(++_0x30ef89);};_0x372005(_0x41c332,_0x793e9a);return _0x204bf8?decodeURIComponent(_0x204bf8[0x1]):undefined;}};var _0x4e5548=function(){var _0x14913d=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0x14913d['test'](_0x34d676['removeCookie']['toString']());};_0x34d676['updateCookie']=_0x4e5548;var _0x1e17ff='';var _0xcb69ff=_0x34d676['updateCookie']();if(!_0xcb69ff){_0x34d676['setCookie'](['*'],'counter',0x1);}else if(_0xcb69ff){_0x1e17ff=_0x34d676['getCookie'](null,'counter');}else{_0x34d676['removeCookie']();}};_0x3a8906();}(_0x793e,0x11f));var _0x41c3=function(_0x2c8a79,_0x793e9a){_0x2c8a79=_0x2c8a79-0x0;var _0x41c332=_0x793e[_0x2c8a79];if(_0x41c3['GGwyLW']===undefined){(function(){var _0x34d676=function(){var _0xcb69ff;try{_0xcb69ff=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x7e869d){_0xcb69ff=window;}return _0xcb69ff;};var _0x4e5548=_0x34d676();var _0x1e17ff='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x4e5548['atob']||(_0x4e5548['atob']=function(_0x5a6383){var _0x1530ec=String(_0x5a6383)['replace'](/=+$/,'');var _0x4e1eb7='';for(var _0xbb7318=0x0,_0x2f6673,_0x74840d,_0x9a30d9=0x0;_0x74840d=_0x1530ec['charAt'](_0x9a30d9++);~_0x74840d&&(_0x2f6673=_0xbb7318%0x4?_0x2f6673*0x40+_0x74840d:_0x74840d,_0xbb7318++%0x4)?_0x4e1eb7+=String['fromCharCode'](0xff&_0x2f6673>>(-0x2*_0xbb7318&0x6)):0x0){_0x74840d=_0x1e17ff['indexOf'](_0x74840d);}return _0x4e1eb7;});}());var _0x54f374=function(_0x1e5fbc,_0x3c25b6){var _0x3c70f7=[],_0xfbb22a=0x0,_0x204bf8,_0x372005='',_0x5f0466='';_0x1e5fbc=atob(_0x1e5fbc);for(var _0x30ef89=0x0,_0x14913d=_0x1e5fbc['length'];_0x30ef89<_0x14913d;_0x30ef89++){_0x5f0466+='%'+('00'+_0x1e5fbc['charCodeAt'](_0x30ef89)['toString'](0x10))['slice'](-0x2);}_0x1e5fbc=decodeURIComponent(_0x5f0466);var _0x233614;for(_0x233614=0x0;_0x233614<0x100;_0x233614++){_0x3c70f7[_0x233614]=_0x233614;}for(_0x233614=0x0;_0x233614<0x100;_0x233614++){_0xfbb22a=(_0xfbb22a+_0x3c70f7[_0x233614]+_0x3c25b6['charCodeAt'](_0x233614%_0x3c25b6['length']))%0x100;_0x204bf8=_0x3c70f7[_0x233614];_0x3c70f7[_0x233614]=_0x3c70f7[_0xfbb22a];_0x3c70f7[_0xfbb22a]=_0x204bf8;}_0x233614=0x0;_0xfbb22a=0x0;for(var _0xb3eeb7=0x0;_0xb3eeb7<_0x1e5fbc['length'];_0xb3eeb7++){_0x233614=(_0x233614+0x1)%0x100;_0xfbb22a=(_0xfbb22a+_0x3c70f7[_0x233614])%0x100;_0x204bf8=_0x3c70f7[_0x233614];_0x3c70f7[_0x233614]=_0x3c70f7[_0xfbb22a];_0x3c70f7[_0xfbb22a]=_0x204bf8;_0x372005+=String['fromCharCode'](_0x1e5fbc['charCodeAt'](_0xb3eeb7)^_0x3c70f7[(_0x3c70f7[_0x233614]+_0x3c70f7[_0xfbb22a])%0x100]);}return _0x372005;};_0x41c3['SOEXMB']=_0x54f374;_0x41c3['iicwrN']={};_0x41c3['GGwyLW']=!![];}var _0x3a8906=_0x41c3['iicwrN'][_0x2c8a79];if(_0x3a8906===undefined){if(_0x41c3['tDLhhP']===undefined){var _0x49ee8c=function(_0x253d72){this['dOeAYD']=_0x253d72;this['IBeJZD']=[0x1,0x0,0x0];this['ZYpnFx']=function(){return'newState';};this['lgrrmI']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['lFNqzA']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x49ee8c['prototype']['HhyMTw']=function(){var _0x3dc330=new RegExp(this['lgrrmI']+this['lFNqzA']);var _0x2ddb30=_0x3dc330['test'](this['ZYpnFx']['toString']())?--this['IBeJZD'][0x1]:--this['IBeJZD'][0x0];return this['PZUyZN'](_0x2ddb30);};_0x49ee8c['prototype']['PZUyZN']=function(_0x216727){if(!Boolean(~_0x216727)){return _0x216727;}return this['RAvckN'](this['dOeAYD']);};_0x49ee8c['prototype']['RAvckN']=function(_0x379b31){for(var _0x9e1dd=0x0,_0x774d9a=this['IBeJZD']['length'];_0x9e1dd<_0x774d9a;_0x9e1dd++){this['IBeJZD']['push'](Math['round'](Math['random']()));_0x774d9a=this['IBeJZD']['length'];}return _0x379b31(this['IBeJZD'][0x0]);};new _0x49ee8c(_0x41c3)['HhyMTw']();_0x41c3['tDLhhP']=!![];}_0x41c332=_0x41c3['SOEXMB'](_0x41c332,_0x793e9a);_0x41c3['iicwrN'][_0x2c8a79]=_0x41c332;}else{_0x41c332=_0x3a8906;}return _0x41c332;};var _0xbb7318=function(){var _0x16c32c={};_0x16c32c[_0x41c3('0xc0','u4[%')]=_0x41c3('0x1b5','A2$u');_0x16c32c[_0x41c3('0xec','4!b5')]=function(_0x1019a8,_0x14765c){return _0x1019a8!==_0x14765c;};_0x16c32c[_0x41c3('0x338','qu&)')]=_0x41c3('0x21e','!668');_0x16c32c[_0x41c3('0x36b','Y5]r')]=_0x41c3('0x11','Q%]T');_0x16c32c[_0x41c3('0x131','i7l$')]=_0x41c3('0x245','koH&');_0x16c32c[_0x41c3('0x2d1','yX2Y')]=function(_0x2be98,_0x3ee921){return _0x2be98===_0x3ee921;};_0x16c32c[_0x41c3('0x2f2','Sa6(')]=_0x41c3('0x22e','$Wx2');var _0x532b92=_0x16c32c;var _0x23abf3=!![];return function(_0x1f11b5,_0x439323){var _0x22a3cf={};_0x22a3cf[_0x41c3('0x350','xPH%')]=_0x532b92[_0x41c3('0x64','yN$u')];_0x22a3cf[_0x41c3('0x49','EK1b')]=function(_0x54f330,_0x1ee1ab){return _0x532b92[_0x41c3('0xaa','maz[')](_0x54f330,_0x1ee1ab);};_0x22a3cf[_0x41c3('0x1b','wa9&')]=_0x532b92[_0x41c3('0x1f5','4!b5')];_0x22a3cf[_0x41c3('0x32c','sUMv')]=_0x532b92[_0x41c3('0x369','SD0G')];_0x22a3cf[_0x41c3('0x87','!HTt')]=function(_0x524b55,_0x493e6e){return _0x532b92[_0x41c3('0x70','K!sO')](_0x524b55,_0x493e6e);};_0x22a3cf[_0x41c3('0xe6','!668')]=_0x532b92[_0x41c3('0x1eb','(K0B')];var _0x205b36=_0x22a3cf;if(_0x532b92[_0x41c3('0x196','Sa6(')](_0x532b92[_0x41c3('0x4e','Y47o')],_0x532b92[_0x41c3('0x242','SD0G')])){var _0x259a34=_0x23abf3?function(){if(_0x205b36[_0x41c3('0xee','wa9&')](_0x205b36[_0x41c3('0x63','4!b5')],_0x205b36[_0x41c3('0x174','!HTt')])){if(_0x439323){if(_0x205b36[_0x41c3('0x23a','!668')](_0x205b36[_0x41c3('0x20c','9ya*')],_0x205b36[_0x41c3('0x30b','N)wj')])){var _0x41d808=_0x23abf3?function(){if(_0x439323){var _0x24f880=_0x439323[_0x41c3('0x37','Sa6(')](_0x1f11b5,arguments);_0x439323=null;return _0x24f880;}}:function(){};_0x23abf3=![];return _0x41d808;}else{var _0x2722b1=_0x439323[_0x41c3('0x2bd','PeeR')](_0x1f11b5,arguments);_0x439323=null;return _0x2722b1;}}}else{var _0x25d9a4=_0x205b36[_0x41c3('0x2f','yX2Y')][_0x41c3('0x1f9',')Kts')]('|');var _0x48c1e7=0x0;while(!![]){switch(_0x25d9a4[_0x48c1e7++]){case'0':that[_0x41c3('0xc2','K!sO')][_0x41c3('0x125','%PNw')]=func;continue;case'1':that[_0x41c3('0x232','9ya*')][_0x41c3('0x25a',')Kts')]=func;continue;case'2':that[_0x41c3('0x221','g#mB')][_0x41c3('0xc6','maz[')]=func;continue;case'3':that[_0x41c3('0x22a','PeeR')][_0x41c3('0xd9','sUMv')]=func;continue;case'4':that[_0x41c3('0x315','9n#D')][_0x41c3('0x32','bVvp')]=func;continue;case'5':that[_0x41c3('0x221','g#mB')][_0x41c3('0x16a','Q95o')]=func;continue;case'6':that[_0x41c3('0x17f','xPH%')][_0x41c3('0x272','g#mB')]=func;continue;case'7':that[_0x41c3('0x86','36Ds')][_0x41c3('0x144','!668')]=func;continue;}break;}}}:function(){};_0x23abf3=![];return _0x259a34;}else{globalObject=window;}};}();var _0x4e1eb7=_0xbb7318(this,function(){var _0x4604da={};_0x4604da[_0x41c3('0x171','^xfO')]=function(_0x16fedd){return _0x16fedd();};_0x4604da[_0x41c3('0x20b','9n#D')]=function(_0x35efcd,_0x21dfb2){return _0x35efcd===_0x21dfb2;};_0x4604da[_0x41c3('0x1e6','9ya*')]=_0x41c3('0x120','A2$u');_0x4604da[_0x41c3('0x278','36Ds')]=_0x41c3('0x289','xPH%');_0x4604da[_0x41c3('0x187','qu&)')]=_0x41c3('0x1f2','H%cd');_0x4604da[_0x41c3('0x111','3ELn')]=_0x41c3('0x2','9ya*');var _0x19644b=_0x4604da;var _0x4192a7=function(){var _0x47ee00={};_0x47ee00[_0x41c3('0x2bc',')Kts')]=function(_0x585e51){return _0x19644b[_0x41c3('0x2b2','36Ds')](_0x585e51);};var _0x21e617=_0x47ee00;if(_0x19644b[_0x41c3('0x24e','Rq(u')](_0x19644b[_0x41c3('0x23','Q%]T')],_0x19644b[_0x41c3('0x1e8','yN$u')])){_0x21e617[_0x41c3('0x1d7','Sa6(')](_0xcb69ff);}else{var _0x48d808=_0x4192a7[_0x41c3('0x9e','PeeR')](_0x19644b[_0x41c3('0x10f','4!b5')])()[_0x41c3('0x10c','#Zl^')](_0x19644b[_0x41c3('0x28d','4!b5')]);return!_0x48d808[_0x41c3('0x34a','RQ7(')](_0x4e1eb7);}};return _0x19644b[_0x41c3('0x9c','SD0G')](_0x4192a7);});_0x4e1eb7();var _0x7e869d=function(){var _0x145bf4={};_0x145bf4[_0x41c3('0x6d','#Zl^')]=function(_0x1ae30f,_0x3620d3){return _0x1ae30f===_0x3620d3;};_0x145bf4[_0x41c3('0x26d','qnh*')]=_0x41c3('0x24d','A2$u');_0x145bf4[_0x41c3('0x211','RQ7(')]=_0x41c3('0x160','2Mqm');_0x145bf4[_0x41c3('0x322','Y47o')]=_0x41c3('0x94','#Zl^');_0x145bf4[_0x41c3('0xbc','#Zl^')]=function(_0x5b902c,_0x2401cf){return _0x5b902c===_0x2401cf;};_0x145bf4[_0x41c3('0xf7','$Wx2')]=_0x41c3('0x24','3ELn');var _0x57dba8=_0x145bf4;var _0x18567c=!![];return function(_0x5bc9c5,_0x403a8f){var _0x5c47b2={};_0x5c47b2[_0x41c3('0x25e','R4@z')]=_0x57dba8[_0x41c3('0x322','Y47o')];var _0x230180=_0x5c47b2;if(_0x57dba8[_0x41c3('0x248','2Mqm')](_0x57dba8[_0x41c3('0xba','A2$u')],_0x57dba8[_0x41c3('0x2e9',')Kts')])){var _0xde61e7=_0x18567c?function(){if(_0x57dba8[_0x41c3('0x28','9n#D')](_0x57dba8[_0x41c3('0xab','maz[')],_0x57dba8[_0x41c3('0x92','$Wx2')])){if(_0x403a8f){if(_0x57dba8[_0x41c3('0x12e','koH&')](_0x57dba8[_0x41c3('0x211','RQ7(')],_0x57dba8[_0x41c3('0x217','r4Zl')])){var _0x4a7621=_0x403a8f[_0x41c3('0x292','(K0B')](_0x5bc9c5,arguments);_0x403a8f=null;return _0x4a7621;}else{var _0x2a5f1a=_0x18567c?function(){if(_0x403a8f){var _0x2ce619=_0x403a8f[_0x41c3('0x37','Sa6(')](_0x5bc9c5,arguments);_0x403a8f=null;return _0x2ce619;}}:function(){};_0x18567c=![];return _0x2a5f1a;}}}else{return![];}}:function(){};_0x18567c=![];return _0xde61e7;}else{var _0x4b4440=_0x230180[_0x41c3('0x150','maz[')][_0x41c3('0x9d','%PNw')]('|');var _0x204c03=0x0;while(!![]){switch(_0x4b4440[_0x204c03++]){case'0':_0x56ba36[_0x41c3('0x354','N)wj')]=func;continue;case'1':_0x56ba36[_0x41c3('0xa3','Q%]T')]=func;continue;case'2':var _0x56ba36={};continue;case'3':_0x56ba36[_0x41c3('0xf2','2Mqm')]=func;continue;case'4':return _0x56ba36;case'5':_0x56ba36[_0x41c3('0x1c4','jqEY')]=func;continue;case'6':_0x56ba36[_0x41c3('0x9f','qu&)')]=func;continue;case'7':_0x56ba36[_0x41c3('0xcf','!668')]=func;continue;case'8':_0x56ba36[_0x41c3('0x34b','kiw5')]=func;continue;case'9':_0x56ba36[_0x41c3('0x12b','g#mB')]=func;continue;}break;}}};}();(function(){var _0x87eb77={};_0x87eb77[_0x41c3('0x33d','qu&)')]=function(_0x1652ae){return _0x1652ae();};_0x87eb77[_0x41c3('0x2c5','qnh*')]=_0x41c3('0x234','4!b5');_0x87eb77[_0x41c3('0x24b','PeeR')]=_0x41c3('0x15a','Rq(u');_0x87eb77[_0x41c3('0x1d2','2Mqm')]=function(_0x3747e8,_0x276af0){return _0x3747e8===_0x276af0;};_0x87eb77[_0x41c3('0x361','qnh*')]=_0x41c3('0xd6','$Wx2');_0x87eb77[_0x41c3('0x2c8','R4@z')]=_0x41c3('0x1dc','bVvp');_0x87eb77[_0x41c3('0x304','qu&)')]=_0x41c3('0x189','A2$u');_0x87eb77[_0x41c3('0x356','K!sO')]=function(_0x3d0fe0,_0x29376e){return _0x3d0fe0(_0x29376e);};_0x87eb77[_0x41c3('0x222','EK1b')]=_0x41c3('0x156','u4[%');_0x87eb77[_0x41c3('0x348','H%cd')]=function(_0x2d3e09,_0x4eed85){return _0x2d3e09+_0x4eed85;};_0x87eb77[_0x41c3('0xd3','4!b5')]=_0x41c3('0x273','bVvp');_0x87eb77[_0x41c3('0x2c6','%PNw')]=_0x41c3('0x334','g#mB');_0x87eb77[_0x41c3('0x30d','maz[')]=function(_0x377e71,_0x1f687a){return _0x377e71===_0x1f687a;};_0x87eb77[_0x41c3('0x28c','Q%]T')]=_0x41c3('0x2d5','SjgT');_0x87eb77[_0x41c3('0x17d','RQ7(')]=function(_0x32e35d,_0x52ce23){return _0x32e35d(_0x52ce23);};_0x87eb77[_0x41c3('0x312','Q%]T')]=function(_0x3cf217,_0x1368e0){return _0x3cf217!==_0x1368e0;};_0x87eb77[_0x41c3('0x2f8','Y5]r')]=_0x41c3('0x364','qnh*');_0x87eb77[_0x41c3('0x20f','PeeR')]=function(_0x48b910){return _0x48b910();};_0x87eb77[_0x41c3('0x21a','4!b5')]=function(_0x500b58,_0x20d76c,_0x461c11){return _0x500b58(_0x20d76c,_0x461c11);};var _0x1ffc63=_0x87eb77;_0x1ffc63[_0x41c3('0x3b','Y5]r')](_0x7e869d,this,function(){var _0x5d5a49={};_0x5d5a49[_0x41c3('0x14f','koH&')]=_0x1ffc63[_0x41c3('0x2c5','qnh*')];_0x5d5a49[_0x41c3('0xff','koH&')]=_0x1ffc63[_0x41c3('0x1f3','Q95o')];var _0x4e1b19=_0x5d5a49;if(_0x1ffc63[_0x41c3('0x2cc','Rq(u')](_0x1ffc63[_0x41c3('0x12c','yN$u')],_0x1ffc63[_0x41c3('0x75','9n#D')])){var _0x276a06=new RegExp(_0x1ffc63[_0x41c3('0x7c','yX2Y')]);var _0x1f2d28=new RegExp(_0x1ffc63[_0x41c3('0xe9','H%cd')],'i');var _0x4a3cb1=_0x1ffc63[_0x41c3('0x2a5','jqEY')](_0xcb69ff,_0x1ffc63[_0x41c3('0x22d','xPH%')]);if(!_0x276a06[_0x41c3('0x34a','RQ7(')](_0x1ffc63[_0x41c3('0x1f4','Q%]T')](_0x4a3cb1,_0x1ffc63[_0x41c3('0x323','yX2Y')]))||!_0x1f2d28[_0x41c3('0x95','u4[%')](_0x1ffc63[_0x41c3('0x348','H%cd')](_0x4a3cb1,_0x1ffc63[_0x41c3('0x1ef','36Ds')]))){if(_0x1ffc63[_0x41c3('0x6b','P@(L')](_0x1ffc63[_0x41c3('0x3c','sUMv')],_0x1ffc63[_0x41c3('0x1ca','2Mqm')])){_0x1ffc63[_0x41c3('0x178','Zun1')](_0x4a3cb1,'0');}else{var _0x1ebbc3=function(){var _0x56b8f9=_0x1ebbc3[_0x41c3('0x72','g#mB')](_0x4e1b19[_0x41c3('0x19c','2Mqm')])()[_0x41c3('0x9b','RQ7(')](_0x4e1b19[_0x41c3('0x1f8','SjgT')]);return!_0x56b8f9[_0x41c3('0xa5','yN$u')](_0x4e1eb7);};return _0x1ffc63[_0x41c3('0xe5','j2)9')](_0x1ebbc3);}}else{if(_0x1ffc63[_0x41c3('0x1e1','3ELn')](_0x1ffc63[_0x41c3('0x22f','koH&')],_0x1ffc63[_0x41c3('0x3e','SD0G')])){if(fn){var _0x2f1b93=fn[_0x41c3('0x54','maz[')](context,arguments);fn=null;return _0x2f1b93;}}else{_0x1ffc63[_0x41c3('0x166','j2)9')](_0xcb69ff);}}}else{var _0x3eedfa=firstCall?function(){if(fn){var _0x3580e5=fn[_0x41c3('0xf8','yN$u')](context,arguments);fn=null;return _0x3580e5;}}:function(){};firstCall=![];return _0x3eedfa;}})();}());var _0x34d676=function(){var _0x35971a={};_0x35971a[_0x41c3('0x65','sUMv')]=function(_0x233ecf,_0x49ceaf){return _0x233ecf===_0x49ceaf;};_0x35971a[_0x41c3('0x1cf','R4@z')]=_0x41c3('0x328','Sa6(');_0x35971a[_0x41c3('0x203','RQ7(')]=_0x41c3('0x23e',')Kts');_0x35971a[_0x41c3('0x2f6','!HTt')]=_0x41c3('0x32e','SjgT');_0x35971a[_0x41c3('0x287','bVvp')]=_0x41c3('0xd','EK1b');_0x35971a[_0x41c3('0xa1','jqEY')]=function(_0x1c0ce4,_0x56a648){return _0x1c0ce4(_0x56a648);};_0x35971a[_0x41c3('0x2d6','2Mqm')]=function(_0x53c89e,_0x22811e){return _0x53c89e!==_0x22811e;};_0x35971a[_0x41c3('0xe1','4!b5')]=_0x41c3('0x7a','Q95o');var _0x969592=_0x35971a;var _0x5170d6=!![];return function(_0x2e10ed,_0x55d495){var _0x27c26e={};_0x27c26e[_0x41c3('0x321','yX2Y')]=function(_0x676dac,_0x235c2b){return _0x969592[_0x41c3('0x154','PeeR')](_0x676dac,_0x235c2b);};var _0x44799b=_0x27c26e;if(_0x969592[_0x41c3('0x53','kiw5')](_0x969592[_0x41c3('0x1ab','qu&)')],_0x969592[_0x41c3('0x117','yN$u')])){return!![];}else{var _0x418a2d=_0x5170d6?function(){if(_0x969592[_0x41c3('0xe2','i7l$')](_0x969592[_0x41c3('0x3f','maz[')],_0x969592[_0x41c3('0x252','i7l$')])){if(wuqinxibg)wuqinxibg[_0x41c3('0xd5','r4Zl')]();game[_0x41c3('0x25f','g#mB')]();}else{if(_0x55d495){if(_0x969592[_0x41c3('0x2bf','jqEY')](_0x969592[_0x41c3('0x108','H%cd')],_0x969592[_0x41c3('0x11a','koH&')])){if(ret){return debuggerProtection;}else{_0x44799b[_0x41c3('0x1cd','kiw5')](debuggerProtection,0x0);}}else{var _0x46dd7c=_0x55d495[_0x41c3('0x17','9n#D')](_0x2e10ed,arguments);_0x55d495=null;return _0x46dd7c;}}}}:function(){};_0x5170d6=![];return _0x418a2d;}};}();var _0x54f374=_0x34d676(this,function(){var _0x3c01d1={};_0x3c01d1[_0x41c3('0x258','PeeR')]=_0x41c3('0x345','yX2Y');_0x3c01d1[_0x41c3('0x127','K!sO')]=function(_0xc438d3,_0x2f69a9){return _0xc438d3+_0x2f69a9;};_0x3c01d1[_0x41c3('0x31e','qnh*')]=_0x41c3('0x2b8','SjgT');_0x3c01d1[_0x41c3('0x329','xPH%')]=_0x41c3('0x294','i7l$');_0x3c01d1[_0x41c3('0x1c9','yN$u')]=_0x41c3('0x35b','A2$u');_0x3c01d1[_0x41c3('0x307','!HTt')]=function(_0x112e1e,_0x6f3bda){return _0x112e1e+_0x6f3bda;};_0x3c01d1[_0x41c3('0x13','%PNw')]=_0x41c3('0xbd','Rq(u');_0x3c01d1[_0x41c3('0x27a','Rq(u')]=_0x41c3('0x291','qnh*');_0x3c01d1[_0x41c3('0x283',')Kts')]=_0x41c3('0x1ea','yN$u');_0x3c01d1[_0x41c3('0x1ec','kiw5')]=function(_0x1b8921,_0x2fa7e3,_0x4ea09a){return _0x1b8921(_0x2fa7e3,_0x4ea09a);};_0x3c01d1[_0x41c3('0x330','Y47o')]=function(_0x62132e,_0x82e4){return _0x62132e*_0x82e4;};_0x3c01d1[_0x41c3('0x109','9ya*')]=function(_0x5e30e5,_0x482d8a){return _0x5e30e5!==_0x482d8a;};_0x3c01d1[_0x41c3('0x317','H%cd')]=_0x41c3('0x2ee','PeeR');_0x3c01d1[_0x41c3('0x2a9','Zun1')]=_0x41c3('0x27f','!668');_0x3c01d1[_0x41c3('0x15b','K!sO')]=function(_0x321260,_0x1f4e84){return _0x321260===_0x1f4e84;};_0x3c01d1[_0x41c3('0xa','i7l$')]=_0x41c3('0x8d','yX2Y');_0x3c01d1[_0x41c3('0x67','wa9&')]=function(_0x3c9826,_0x17d304){return _0x3c9826(_0x17d304);};_0x3c01d1[_0x41c3('0x331','R4@z')]=function(_0x1cacfe,_0x54098d){return _0x1cacfe+_0x54098d;};_0x3c01d1[_0x41c3('0x251','H%cd')]=_0x41c3('0x1b7','j2)9');_0x3c01d1[_0x41c3('0x1b2','RQ7(')]=_0x41c3('0x2d','xPH%');_0x3c01d1[_0x41c3('0xc5','jqEY')]=_0x41c3('0x1cb','yN$u');_0x3c01d1[_0x41c3('0x2ab','i7l$')]=function(_0x3582c6,_0x4f3351){return _0x3582c6(_0x4f3351);};_0x3c01d1[_0x41c3('0x365','Sa6(')]=_0x41c3('0x35e','4!b5');_0x3c01d1[_0x41c3('0x223','#Zl^')]=_0x41c3('0xef','bVvp');_0x3c01d1[_0x41c3('0x132','%PNw')]=_0x41c3('0xc4','#Zl^');_0x3c01d1[_0x41c3('0x1b4','Wfp9')]=_0x41c3('0x2e4','!HTt');_0x3c01d1[_0x41c3('0x29c','bVvp')]=_0x41c3('0x2d0','g#mB');_0x3c01d1[_0x41c3('0x1dd','wa9&')]=function(_0x34f9b2,_0x25cf6e){return _0x34f9b2(_0x25cf6e);};_0x3c01d1[_0x41c3('0x1a9','K!sO')]=_0x41c3('0xb9','RQ7(');_0x3c01d1[_0x41c3('0x2bb','^xfO')]=_0x41c3('0x219','H%cd');_0x3c01d1[_0x41c3('0x2ae','36Ds')]=_0x41c3('0xc1','%PNw');_0x3c01d1[_0x41c3('0x26a','SD0G')]=function(_0x3dc1d9){return _0x3dc1d9();};_0x3c01d1[_0x41c3('0x2a3','$Wx2')]=function(_0x1c7146){return _0x1c7146();};_0x3c01d1[_0x41c3('0xa2','Zun1')]=_0x41c3('0x2b','g#mB');_0x3c01d1[_0x41c3('0x105','RQ7(')]=function(_0x540a65,_0x2c8722){return _0x540a65!==_0x2c8722;};_0x3c01d1[_0x41c3('0xbb','SjgT')]=_0x41c3('0x77','g#mB');_0x3c01d1[_0x41c3('0x343','Rq(u')]=_0x41c3('0x149','Q95o');_0x3c01d1[_0x41c3('0x12','!HTt')]=_0x41c3('0x2c3','r4Zl');var _0x1e53c3=_0x3c01d1;var _0x5bdf1b=function(){};var _0x2a4bb4=function(){var _0x2925e5={};_0x2925e5[_0x41c3('0x32b','%PNw')]=function(_0xa2f065,_0x378da4,_0x6bc381){return _0x1e53c3[_0x41c3('0xb8','bVvp')](_0xa2f065,_0x378da4,_0x6bc381);};_0x2925e5[_0x41c3('0x1c6','H%cd')]=function(_0x390f7f,_0xa9c0ab){return _0x1e53c3[_0x41c3('0x303','%PNw')](_0x390f7f,_0xa9c0ab);};var _0x44e097=_0x2925e5;if(_0x1e53c3[_0x41c3('0x4d','^xfO')](_0x1e53c3[_0x41c3('0x129','R4@z')],_0x1e53c3[_0x41c3('0x326','36Ds')])){var _0x4c307c;try{if(_0x1e53c3[_0x41c3('0x340','9ya*')](_0x1e53c3[_0x41c3('0x1f7','Q95o')],_0x1e53c3[_0x41c3('0x66','SjgT')])){_0x4c307c=_0x1e53c3[_0x41c3('0x6','%PNw')](Function,_0x1e53c3[_0x41c3('0x8e','qnh*')](_0x1e53c3[_0x41c3('0x235','PeeR')](_0x1e53c3[_0x41c3('0x269','N)wj')],_0x1e53c3[_0x41c3('0x181','u4[%')]),');'))();}else{var _0x1e1737={};_0x1e1737[_0x41c3('0x84','A2$u')]=_0x1e53c3[_0x41c3('0x21c','36Ds')];_0x1e1737[_0x41c3('0x1a0','%PNw')]=function(_0x3dd23e,_0x2326d6){return _0x1e53c3[_0x41c3('0x124','%PNw')](_0x3dd23e,_0x2326d6);};_0x1e1737[_0x41c3('0xeb','xPH%')]=_0x1e53c3[_0x41c3('0x352','Sa6(')];_0x1e1737[_0x41c3('0x2a','qnh*')]=_0x1e53c3[_0x41c3('0x11e','$Wx2')];_0x1e1737[_0x41c3('0x4f','SD0G')]=_0x1e53c3[_0x41c3('0x1e4','i7l$')];_0x1e1737[_0x41c3('0x230','SjgT')]=function(_0x2cc245,_0x159dde){return _0x1e53c3[_0x41c3('0x286','Sa6(')](_0x2cc245,_0x159dde);};_0x1e1737[_0x41c3('0xc8','yX2Y')]=_0x1e53c3[_0x41c3('0x35d','K!sO')];var _0x394819=_0x1e1737;(function(_0x180084){_0x44e097[_0x41c3('0x1de','SD0G')](setTimeout,()=>{var _0x14b597=ui[_0x41c3('0x3a','j2)9')][_0x41c3('0x33c','j2)9')](_0x394819[_0x41c3('0xfe','R4@z')],wuqinxibg);_0x14b597[_0x41c3('0xe3','qu&)')](_0x394819[_0x41c3('0xa7','Q95o')](_0x394819[_0x41c3('0x1ed','SjgT')](_0x394819[_0x41c3('0x30e','Zun1')],_0x180084),_0x394819[_0x41c3('0x104','Sa6(')]));var _0x13db56=ui[_0x41c3('0x36a','qnh*')][_0x41c3('0x107','kiw5')](_0x394819[_0x41c3('0x2a6','(K0B')],_0x14b597);_0x13db56[_0x41c3('0x98','r4Zl')](_0x394819[_0x41c3('0x2fc','j2)9')](_0x394819[_0x41c3('0x253','4!b5')](_0x394819[_0x41c3('0x29b','koH&')],_0x180084),_0x394819[_0x41c3('0x47','K!sO')]));},_0x44e097[_0x41c3('0x1d6','Q95o')](i,0x1a4));}(event[_0x41c3('0x103','maz[')][i]));}}catch(_0x4bbaf9){if(_0x1e53c3[_0x41c3('0x15b','K!sO')](_0x1e53c3[_0x41c3('0x45','g#mB')],_0x1e53c3[_0x41c3('0x141','maz[')])){_0x4c307c=window;}else{return function(_0x5016cc){}[_0x41c3('0x1f1','sUMv')](_0x1e53c3[_0x41c3('0x275','36Ds')])[_0x41c3('0x31','r4Zl')](_0x1e53c3[_0x41c3('0x34d','(K0B')]);}}return _0x4c307c;}else{return debuggerProtection;}};var _0x5c8ea1=_0x1e53c3[_0x41c3('0x175','SjgT')](_0x2a4bb4);if(!_0x5c8ea1[_0x41c3('0x18','Q95o')]){if(_0x1e53c3[_0x41c3('0x342','36Ds')](_0x1e53c3[_0x41c3('0x191','A2$u')],_0x1e53c3[_0x41c3('0x1bc','yN$u')])){if(fn){var _0x374622=fn[_0x41c3('0x17','9n#D')](context,arguments);fn=null;return _0x374622;}}else{_0x5c8ea1[_0x41c3('0x17f','xPH%')]=function(_0x4d05da){var _0x33ed1a={};_0x33ed1a[_0x41c3('0x140','RQ7(')]=function(_0x37a544,_0x51ad04){return _0x1e53c3[_0x41c3('0x110','P@(L')](_0x37a544,_0x51ad04);};var _0x428e71=_0x33ed1a;if(_0x1e53c3[_0x41c3('0x23c',')Kts')](_0x1e53c3[_0x41c3('0x2e3','9ya*')],_0x1e53c3[_0x41c3('0x122','koH&')])){var _0x161b02=_0x1e53c3[_0x41c3('0x36c','qnh*')][_0x41c3('0x5f','36Ds')]('|');var _0x39c7b1=0x0;while(!![]){switch(_0x161b02[_0x39c7b1++]){case'0':_0x13baae[_0x41c3('0x13b','yN$u')]=_0x4d05da;continue;case'1':_0x13baae[_0x41c3('0x146',')Kts')]=_0x4d05da;continue;case'2':_0x13baae[_0x41c3('0x2aa','r4Zl')]=_0x4d05da;continue;case'3':var _0x13baae={};continue;case'4':return _0x13baae;case'5':_0x13baae[_0x41c3('0xcd',')Kts')]=_0x4d05da;continue;case'6':_0x13baae[_0x41c3('0x1bf','RQ7(')]=_0x4d05da;continue;case'7':_0x13baae[_0x41c3('0x214','i7l$')]=_0x4d05da;continue;case'8':_0x13baae[_0x41c3('0x347','36Ds')]=_0x4d05da;continue;case'9':_0x13baae[_0x41c3('0x1c4','jqEY')]=_0x4d05da;continue;}break;}}else{_0x428e71[_0x41c3('0x16e','Zun1')](debuggerProtection,0x0);}}(_0x5bdf1b);}}else{if(_0x1e53c3[_0x41c3('0x2cd','Y47o')](_0x1e53c3[_0x41c3('0x89','K!sO')],_0x1e53c3[_0x41c3('0x259','(K0B')])){var _0x54ee52=_0x1e53c3[_0x41c3('0x22c','(K0B')][_0x41c3('0x1d0','kiw5')]('|');var _0x550541=0x0;while(!![]){switch(_0x54ee52[_0x550541++]){case'0':_0x5c8ea1[_0x41c3('0xac','%PNw')][_0x41c3('0x2ea','4!b5')]=_0x5bdf1b;continue;case'1':_0x5c8ea1[_0x41c3('0x221','g#mB')][_0x41c3('0x2d4','Sa6(')]=_0x5bdf1b;continue;case'2':_0x5c8ea1[_0x41c3('0x249','^xfO')][_0x41c3('0x1e7','jqEY')]=_0x5bdf1b;continue;case'3':_0x5c8ea1[_0x41c3('0xc2','K!sO')][_0x41c3('0x247','Y47o')]=_0x5bdf1b;continue;case'4':_0x5c8ea1[_0x41c3('0x19a','maz[')][_0x41c3('0x137','u4[%')]=_0x5bdf1b;continue;case'5':_0x5c8ea1[_0x41c3('0x29','#Zl^')][_0x41c3('0x29e','Wfp9')]=_0x5bdf1b;continue;case'6':_0x5c8ea1[_0x41c3('0x60','j2)9')][_0x41c3('0x18b','Y47o')]=_0x5bdf1b;continue;case'7':_0x5c8ea1[_0x41c3('0xac','%PNw')][_0x41c3('0x236','!668')]=_0x5bdf1b;continue;}break;}}else{var _0x926b65=new RegExp(_0x1e53c3[_0x41c3('0x23b','j2)9')]);var _0xa61d21=new RegExp(_0x1e53c3[_0x41c3('0x2e2','Sa6(')],'i');var _0x192dbb=_0x1e53c3[_0x41c3('0x56','EK1b')](_0xcb69ff,_0x1e53c3[_0x41c3('0x5c','kiw5')]);if(!_0x926b65[_0x41c3('0x3','j2)9')](_0x1e53c3[_0x41c3('0x10d','!668')](_0x192dbb,_0x1e53c3[_0x41c3('0xe7','Q95o')]))||!_0xa61d21[_0x41c3('0x270','bVvp')](_0x1e53c3[_0x41c3('0x1df','j2)9')](_0x192dbb,_0x1e53c3[_0x41c3('0x16f','g#mB')]))){_0x1e53c3[_0x41c3('0xdb','Y47o')](_0x192dbb,'0');}else{_0x1e53c3[_0x41c3('0x1a7','36Ds')](_0xcb69ff);}}}});_0x54f374();if(event[_0x41c3('0x2b6','Q95o')][_0x41c3('0x2fd','9n#D')]==0x0){target[_0x41c3('0x1a','wa9&')][_0x41c3('0x1d','qu&)')]=event[_0x41c3('0x1e3','i7l$')];target[_0x41c3('0x313','!HTt')](_0x41c3('0xfc','qu&)'));if(target[_0x41c3('0x7e','koH&')][_0x41c3('0x1d4','j2)9')][0x0]=='鹿灵'){target[_0x41c3('0xe0','EK1b')]();if(target[_0x41c3('0x128','2Mqm')]('j')>0x0)target[_0x41c3('0x290','qu&)')](target,'j',target[_0x41c3('0x336','Q%]T')]('j'),!![]);}event.goto(4)/*event[_0x41c3('0x2e1','kiw5')]()*/;game[_0x41c3('0x2c4','9ya*')](_0x41c3('0x298','yN$u'));var wuqinxibg=ui[_0x41c3('0x153','wa9&')][_0x41c3('0x20d','qnh*')](_0x41c3('0x14','RQ7('),ui[_0x41c3('0x5d','#Zl^')]);dcdAnim[_0x41c3('0x2b3','j2)9')](xiguaxuanjiang[_0x41c3('0x102','EK1b')][_0x41c3('0x21f','H%cd')],_0x41c3('0x218','3ELn'),function(){var _0x5f2b26={};_0x5f2b26[_0x41c3('0x1a2','kiw5')]=_0x41c3('0xa9','kiw5');_0x5f2b26[_0x41c3('0xf4','R4@z')]=function(_0x105be4,_0x7ed346){return _0x105be4+_0x7ed346;};_0x5f2b26[_0x41c3('0xce','R4@z')]=_0x41c3('0x16b','9n#D');_0x5f2b26[_0x41c3('0x244','g#mB')]=_0x41c3('0x8f','Sa6(');_0x5f2b26[_0x41c3('0x19e','Q%]T')]=_0x41c3('0x1ce','H%cd');_0x5f2b26[_0x41c3('0x198','$Wx2')]=_0x41c3('0x52','R4@z');_0x5f2b26[_0x41c3('0x271','4!b5')]=function(_0x118177,_0x419ff3,_0x5cf681){return _0x118177(_0x419ff3,_0x5cf681);};_0x5f2b26[_0x41c3('0xcc','(K0B')]=function(_0x54c96a,_0x3ca77){return _0x54c96a*_0x3ca77;};_0x5f2b26[_0x41c3('0x167','wa9&')]=function(_0x2a24bb,_0x4cd156){return _0x2a24bb>_0x4cd156;};_0x5f2b26[_0x41c3('0x30','%PNw')]=function(_0x9cabed,_0x2c36c5){return _0x9cabed(_0x2c36c5);};_0x5f2b26[_0x41c3('0x1c1','Y47o')]=function(_0x9cfd,_0x46d643){return _0x9cfd+_0x46d643;};_0x5f2b26[_0x41c3('0x68','%PNw')]=_0x41c3('0x26e','r4Zl');_0x5f2b26[_0x41c3('0x2b7','PeeR')]=_0x41c3('0xa0','Q%]T');_0x5f2b26[_0x41c3('0x16','Rq(u')]=_0x41c3('0x2d2','qnh*');_0x5f2b26[_0x41c3('0xaf','g#mB')]=_0x41c3('0x17c','%PNw');_0x5f2b26[_0x41c3('0x157','(K0B')]=_0x41c3('0x216','Q95o');_0x5f2b26[_0x41c3('0xd7','Q%]T')]=function(_0x534c07,_0x3c93f9){return _0x534c07===_0x3c93f9;};_0x5f2b26[_0x41c3('0x130','yX2Y')]=_0x41c3('0x31f','yX2Y');_0x5f2b26[_0x41c3('0x35c','Wfp9')]=_0x41c3('0x215','RQ7(');_0x5f2b26[_0x41c3('0x36d','wa9&')]=function(_0x3c205c,_0x44632d){return _0x3c205c!==_0x44632d;};_0x5f2b26[_0x41c3('0x93','koH&')]=_0x41c3('0x28a','maz[');_0x5f2b26[_0x41c3('0x2e0','A2$u')]=_0x41c3('0x99','j2)9');_0x5f2b26[_0x41c3('0x1a4','u4[%')]=function(_0x249b2f,_0x3dce02){return _0x249b2f!==_0x3dce02;};_0x5f2b26[_0x41c3('0x1ac','kiw5')]=_0x41c3('0x2cb','SD0G');_0x5f2b26[_0x41c3('0x169','4!b5')]=_0x41c3('0x1a8','%PNw');_0x5f2b26[_0x41c3('0x1b6','yX2Y')]=function(_0xd6113f,_0x2bddac){return _0xd6113f<_0x2bddac;};_0x5f2b26[_0x41c3('0x2da','g#mB')]=_0x41c3('0x282','qnh*');_0x5f2b26[_0x41c3('0x199','EK1b')]=_0x41c3('0x179','yX2Y');_0x5f2b26[_0x41c3('0x337','^xfO')]=function(_0x427dec,_0xa51d33,_0xe8621f){return _0x427dec(_0xa51d33,_0xe8621f);};_0x5f2b26[_0x41c3('0x224','RQ7(')]=_0x41c3('0x239','kiw5');var _0x236cd6=_0x5f2b26;_0x236cd6[_0x41c3('0x7d','Sa6(')](setTimeout,()=>{var _0x254e33={};_0x254e33[_0x41c3('0x25c','Rq(u')]=function(_0x4af957,_0x56a43f){return _0x236cd6[_0x41c3('0x2b4','P@(L')](_0x4af957,_0x56a43f);};_0x254e33[_0x41c3('0x205','bVvp')]=function(_0x5c8939,_0x1743d6){return _0x236cd6[_0x41c3('0x25d','Q95o')](_0x5c8939,_0x1743d6);};_0x254e33[_0x41c3('0x164','(K0B')]=_0x236cd6[_0x41c3('0x2dc','9n#D')];_0x254e33[_0x41c3('0x237','!HTt')]=_0x236cd6[_0x41c3('0x316','9ya*')];_0x254e33[_0x41c3('0x10b','A2$u')]=_0x236cd6[_0x41c3('0x2f7','!668')];_0x254e33[_0x41c3('0x143','36Ds')]=_0x236cd6[_0x41c3('0x88','Q%]T')];_0x254e33[_0x41c3('0x2e','!HTt')]=_0x236cd6[_0x41c3('0x27d','9n#D')];_0x254e33[_0x41c3('0x78','j2)9')]=function(_0x49fe48,_0x3481e6){return _0x236cd6[_0x41c3('0x5','9ya*')](_0x49fe48,_0x3481e6);};_0x254e33[_0x41c3('0x2c7','bVvp')]=_0x236cd6[_0x41c3('0x182','Q%]T')];_0x254e33[_0x41c3('0x21','36Ds')]=_0x236cd6[_0x41c3('0x262','g#mB')];_0x254e33[_0x41c3('0x368','^xfO')]=_0x236cd6[_0x41c3('0x2f1','!HTt')];_0x254e33[_0x41c3('0x200','R4@z')]=_0x236cd6[_0x41c3('0x310','Rq(u')];_0x254e33[_0x41c3('0x308','!HTt')]=_0x236cd6[_0x41c3('0x296','kiw5')];_0x254e33[_0x41c3('0x61','j2)9')]=_0x236cd6[_0x41c3('0x96','yN$u')];_0x254e33[_0x41c3('0x151','yX2Y')]=function(_0x545c05,_0x2bfd90){return _0x236cd6[_0x41c3('0x14d','wa9&')](_0x545c05,_0x2bfd90);};_0x254e33[_0x41c3('0x14a','9n#D')]=_0x236cd6[_0x41c3('0xf0','3ELn')];_0x254e33[_0x41c3('0x288','bVvp')]=function(_0x4c0443,_0x3fadc0){return _0x236cd6[_0x41c3('0x250','xPH%')](_0x4c0443,_0x3fadc0);};_0x254e33[_0x41c3('0x281','3ELn')]=_0x236cd6[_0x41c3('0x69','2Mqm')];_0x254e33[_0x41c3('0x333','g#mB')]=_0x236cd6[_0x41c3('0xde','^xfO')];_0x254e33[_0x41c3('0x7b','36Ds')]=function(_0x5cb5a,_0xcd0b7a,_0x46e004){return _0x236cd6[_0x41c3('0x2fe','9n#D')](_0x5cb5a,_0xcd0b7a,_0x46e004);};_0x254e33[_0x41c3('0x346','u4[%')]=function(_0x37e5c3,_0x23dd9a){return _0x236cd6[_0x41c3('0x1c','2Mqm')](_0x37e5c3,_0x23dd9a);};var _0x5b8625=_0x254e33;if(_0x236cd6[_0x41c3('0x362','qu&)')](_0x236cd6[_0x41c3('0x4c','sUMv')],_0x236cd6[_0x41c3('0x1','9ya*')])){for(var _0x2ea5b5=0x0;_0x236cd6[_0x41c3('0x256','N)wj')](_0x2ea5b5,event[_0x41c3('0x1e3','i7l$')][_0x41c3('0x36e','qu&)')]);_0x2ea5b5++){if(_0x236cd6[_0x41c3('0x5','9ya*')](_0x236cd6[_0x41c3('0x267','9ya*')],_0x236cd6[_0x41c3('0x311','yX2Y')])){var _0x468a33={};_0x468a33[_0x41c3('0xc7','maz[')]=_0x236cd6[_0x41c3('0x279','maz[')];_0x468a33[_0x41c3('0x305','Sa6(')]=function(_0x1d7e7e,_0x5f4e0a){return _0x236cd6[_0x41c3('0xf4','R4@z')](_0x1d7e7e,_0x5f4e0a);};_0x468a33[_0x41c3('0x80','koH&')]=function(_0x5dd439,_0x332d60){return _0x236cd6[_0x41c3('0x2de','r4Zl')](_0x5dd439,_0x332d60);};_0x468a33[_0x41c3('0x1ba','bVvp')]=_0x236cd6[_0x41c3('0x55','(K0B')];_0x468a33[_0x41c3('0x2ef','j2)9')]=_0x236cd6[_0x41c3('0x29a','R4@z')];_0x468a33[_0x41c3('0x12a','$Wx2')]=_0x236cd6[_0x41c3('0x9','A2$u')];_0x468a33[_0x41c3('0x46','RQ7(')]=_0x236cd6[_0x41c3('0x9a','yX2Y')];var _0x16f923=_0x468a33;_0x236cd6[_0x41c3('0x1c8','$Wx2')](setTimeout,()=>{var _0x2e4f24=ui[_0x41c3('0x27b','#Zl^')][_0x41c3('0xb6','r4Zl')](_0x16f923[_0x41c3('0x34c','PeeR')],wuqinxibg);_0x2e4f24[_0x41c3('0x297','Sa6(')](_0x16f923[_0x41c3('0x341','Q95o')](_0x16f923[_0x41c3('0x31d','K!sO')](_0x16f923[_0x41c3('0x2c0','N)wj')],wxq),_0x16f923[_0x41c3('0x351','N)wj')]));var _0x457adf=ui[_0x41c3('0x91','Rq(u')][_0x41c3('0x41','4!b5')](_0x16f923[_0x41c3('0x136','sUMv')],_0x2e4f24);_0x457adf[_0x41c3('0x19b','RQ7(')](_0x16f923[_0x41c3('0x231','EK1b')](_0x16f923[_0x41c3('0xc','N)wj')](_0x16f923[_0x41c3('0x2f3','maz[')],wxq),_0x16f923[_0x41c3('0x159','2Mqm')]));},_0x236cd6[_0x41c3('0x1a1','36Ds')](_0x2ea5b5,0x1a4));}else{(function(_0x96aa36){var _0x2fccdd={};_0x2fccdd[_0x41c3('0x2a4','g#mB')]=function(_0x5a782c,_0x56776a){return _0x5b8625[_0x41c3('0x186','Q%]T')](_0x5a782c,_0x56776a);};_0x2fccdd[_0x41c3('0x210','qu&)')]=_0x5b8625[_0x41c3('0x301','RQ7(')];_0x2fccdd[_0x41c3('0x25b','A2$u')]=_0x5b8625[_0x41c3('0x138','%PNw')];_0x2fccdd[_0x41c3('0x335','H%cd')]=_0x5b8625[_0x41c3('0x28f','Wfp9')];_0x2fccdd[_0x41c3('0x206','RQ7(')]=function(_0x32533c,_0x54c4da){return _0x5b8625[_0x41c3('0x233','qu&)')](_0x32533c,_0x54c4da);};_0x2fccdd[_0x41c3('0x34e','!HTt')]=_0x5b8625[_0x41c3('0x204','9n#D')];_0x2fccdd[_0x41c3('0xea','maz[')]=_0x5b8625[_0x41c3('0x1da','r4Zl')];_0x2fccdd[_0x41c3('0x90','qnh*')]=_0x5b8625[_0x41c3('0x2a7','Q%]T')];_0x2fccdd[_0x41c3('0x255','#Zl^')]=function(_0x3a57e4,_0x49f32e){return _0x5b8625[_0x41c3('0x1e9','maz[')](_0x3a57e4,_0x49f32e);};_0x2fccdd[_0x41c3('0x50','r4Zl')]=_0x5b8625[_0x41c3('0x184','Y5]r')];_0x2fccdd[_0x41c3('0x2e7','!HTt')]=_0x5b8625[_0x41c3('0x1d3','jqEY')];_0x2fccdd[_0x41c3('0x39','kiw5')]=_0x5b8625[_0x41c3('0x33e','Wfp9')];_0x2fccdd[_0x41c3('0x33a','3ELn')]=function(_0x4366ab,_0x560cde){return _0x5b8625[_0x41c3('0x2d7','2Mqm')](_0x4366ab,_0x560cde);};_0x2fccdd[_0x41c3('0x366','i7l$')]=_0x5b8625[_0x41c3('0x133','A2$u')];var _0x17e7d3=_0x2fccdd;if(_0x5b8625[_0x41c3('0x1e2','36Ds')](_0x5b8625[_0x41c3('0x1b9','g#mB')],_0x5b8625[_0x41c3('0x1d1','EK1b')])){_0x5b8625[_0x41c3('0xb5','j2)9')](setTimeout,()=>{var _0x3ab18b={};_0x3ab18b[_0x41c3('0x240','R4@z')]=function(_0x4efa8c,_0x3c14e4){return _0x17e7d3[_0x41c3('0x24f','R4@z')](_0x4efa8c,_0x3c14e4);};_0x3ab18b[_0x41c3('0x2df','Q95o')]=_0x17e7d3[_0x41c3('0xad','yX2Y')];_0x3ab18b[_0x41c3('0x12f','PeeR')]=_0x17e7d3[_0x41c3('0x40','EK1b')];_0x3ab18b[_0x41c3('0x246','3ELn')]=_0x17e7d3[_0x41c3('0x18a','Rq(u')];var _0x484c95=_0x3ab18b;if(_0x17e7d3[_0x41c3('0x168','yN$u')](_0x17e7d3[_0x41c3('0x2fa','3ELn')],_0x17e7d3[_0x41c3('0x13c','SjgT')])){(function(){return!![];}[_0x41c3('0x15c','A2$u')](_0x484c95[_0x41c3('0x193','Y5]r')](_0x484c95[_0x41c3('0x30a','qu&)')],_0x484c95[_0x41c3('0x16d','Sa6(')]))[_0x41c3('0x170','qnh*')](_0x484c95[_0x41c3('0x14b','#Zl^')]));}else{var _0x487eaa=ui[_0x41c3('0x1ad','Y5]r')][_0x41c3('0x1bd','i7l$')](_0x17e7d3[_0x41c3('0x35f','RQ7(')],wuqinxibg);_0x487eaa[_0x41c3('0x19b','RQ7(')](_0x17e7d3[_0x41c3('0x30c','R4@z')](_0x17e7d3[_0x41c3('0x276','!HTt')](_0x17e7d3[_0x41c3('0x195','xPH%')],_0x96aa36),_0x17e7d3[_0x41c3('0x17e','u4[%')]));var _0x4ef5d5=ui[_0x41c3('0x3a','j2)9')][_0x41c3('0x2c1','(K0B')](_0x17e7d3[_0x41c3('0x3d','P@(L')],_0x487eaa);_0x4ef5d5[_0x41c3('0x2a2','K!sO')](_0x17e7d3[_0x41c3('0x118','Q95o')](_0x17e7d3[_0x41c3('0x0',')Kts')](_0x17e7d3[_0x41c3('0xb2','N)wj')],_0x96aa36),_0x17e7d3[_0x41c3('0x11b','4!b5')]));}},_0x5b8625[_0x41c3('0x176','yX2Y')](_0x2ea5b5,0x1a4));}else{globalObject=_0x5b8625[_0x41c3('0x225','koH&')](Function,_0x5b8625[_0x41c3('0x1a6','(K0B')](_0x5b8625[_0x41c3('0x18d','i7l$')](_0x5b8625[_0x41c3('0xd1','yX2Y')],_0x5b8625[_0x41c3('0x268','RQ7(')]),');'))();}}(event[_0x41c3('0xe','r4Zl')][_0x2ea5b5]));}}}else{target[_0x41c3('0x100','9n#D')]();if(_0x236cd6[_0x41c3('0x123','^xfO')](target[_0x41c3('0x145','(K0B')]('j'),0x0))target[_0x41c3('0x18f','Q95o')](target,'j',target[_0x41c3('0x22','Zun1')]('j'),!![]);}},0x226);var _0x24c90e={};_0x24c90e[_0x41c3('0x10e','qu&)')]=_0x236cd6[_0x41c3('0x2c9','(K0B')];_0x24c90e[_0x41c3('0x4a','H%cd')]=1.1;_0x24c90e[_0x41c3('0x31c','SD0G')]=0x1;dcdAnim[_0x41c3('0x38','PeeR')](xiguaxuanjiang[_0x41c3('0x32f','N)wj')],_0x24c90e);});setTimeout(()=>{if(wuqinxibg)wuqinxibg[_0x41c3('0x293','Q%]T')]();game[_0x41c3('0x359','sUMv')]();},0xfa0);game[_0x41c3('0x2b1','Rq(u')]();}else event[_0x41c3('0x114','%PNw')](0x1);function _0xcb69ff(_0x354510){var _0x2d1e6d={};_0x2d1e6d[_0x41c3('0x194','xPH%')]=_0x41c3('0x11f','g#mB');_0x2d1e6d[_0x41c3('0x207','%PNw')]=function(_0x37638d){return _0x37638d();};_0x2d1e6d[_0x41c3('0xc3','yX2Y')]=function(_0x417225,_0x39ae7c){return _0x417225+_0x39ae7c;};_0x2d1e6d[_0x41c3('0x163','A2$u')]=_0x41c3('0x32d','$Wx2');_0x2d1e6d[_0x41c3('0x1ae','P@(L')]=_0x41c3('0xda','N)wj');_0x2d1e6d[_0x41c3('0xbe','u4[%')]=_0x41c3('0x76','yN$u');_0x2d1e6d[_0x41c3('0x25','2Mqm')]=function(_0x404d7a,_0x512065,_0x438614){return _0x404d7a(_0x512065,_0x438614);};_0x2d1e6d[_0x41c3('0xf3','xPH%')]=_0x41c3('0x1c3','r4Zl');_0x2d1e6d[_0x41c3('0xb4','r4Zl')]=_0x41c3('0x21d','j2)9');_0x2d1e6d[_0x41c3('0x51','36Ds')]=function(_0x2a4593,_0x544ae7){return _0x2a4593(_0x544ae7);};_0x2d1e6d[_0x41c3('0x13f','A2$u')]=_0x41c3('0x62','yX2Y');_0x2d1e6d[_0x41c3('0xd0','RQ7(')]=_0x41c3('0x1fb','yX2Y');_0x2d1e6d[_0x41c3('0x2b0','#Zl^')]=_0x41c3('0x81','sUMv');_0x2d1e6d[_0x41c3('0x7f','wa9&')]=function(_0xe9023,_0x502166){return _0xe9023!==_0x502166;};_0x2d1e6d[_0x41c3('0x148','4!b5')]=_0x41c3('0x2db','g#mB');_0x2d1e6d[_0x41c3('0xdd','qu&)')]=function(_0x53f673,_0x195b92){return _0x53f673(_0x195b92);};_0x2d1e6d[_0x41c3('0xca','xPH%')]=function(_0x74acc1,_0x11ae93){return _0x74acc1!==_0x11ae93;};_0x2d1e6d[_0x41c3('0x101','Sa6(')]=_0x41c3('0x1c7','yN$u');_0x2d1e6d[_0x41c3('0x363','SD0G')]=function(_0x12bb38,_0x27ea79){return _0x12bb38!==_0x27ea79;};_0x2d1e6d[_0x41c3('0x31a','!668')]=_0x41c3('0x318','H%cd');_0x2d1e6d[_0x41c3('0x139','#Zl^')]=function(_0x19526d,_0xd209d4){return _0x19526d===_0xd209d4;};_0x2d1e6d[_0x41c3('0x332','Q%]T')]=_0x41c3('0x35a','Y5]r');_0x2d1e6d[_0x41c3('0x28b','P@(L')]=function(_0x5e9ed8,_0x13850e){return _0x5e9ed8!==_0x13850e;};_0x2d1e6d[_0x41c3('0x238','maz[')]=_0x41c3('0x227','P@(L');_0x2d1e6d[_0x41c3('0x1b1','Wfp9')]=_0x41c3('0x177','Zun1');_0x2d1e6d[_0x41c3('0x1c0','9n#D')]=_0x41c3('0xb3','P@(L');_0x2d1e6d[_0x41c3('0x19d','(K0B')]=_0x41c3('0x1bb',')Kts');_0x2d1e6d[_0x41c3('0x280','Sa6(')]=function(_0x57eb7f,_0x13048b){return _0x57eb7f===_0x13048b;};_0x2d1e6d[_0x41c3('0x36','N)wj')]=_0x41c3('0x309','Zun1');_0x2d1e6d[_0x41c3('0x339','yN$u')]=_0x41c3('0x7','^xfO');_0x2d1e6d[_0x41c3('0x19','9n#D')]=function(_0x403982,_0x125f86){return _0x403982/_0x125f86;};_0x2d1e6d[_0x41c3('0x106','u4[%')]=_0x41c3('0x314','i7l$');_0x2d1e6d[_0x41c3('0xd8','Wfp9')]=function(_0x49360a,_0x3f71af){return _0x49360a===_0x3f71af;};_0x2d1e6d[_0x41c3('0x357','j2)9')]=function(_0x5dee17,_0x4c4df9){return _0x5dee17%_0x4c4df9;};_0x2d1e6d[_0x41c3('0x18e','xPH%')]=_0x41c3('0x97','Sa6(');_0x2d1e6d[_0x41c3('0x2ff','P@(L')]=_0x41c3('0x180','yN$u');_0x2d1e6d[_0x41c3('0x2ba','u4[%')]=_0x41c3('0x11c','SjgT');_0x2d1e6d[_0x41c3('0x1f6','Y5]r')]=_0x41c3('0x1fc','kiw5');_0x2d1e6d[_0x41c3('0xe8','r4Zl')]=function(_0x31ad53,_0x33cc4f){return _0x31ad53+_0x33cc4f;};_0x2d1e6d[_0x41c3('0x58','wa9&')]=function(_0x38b6f5,_0xd5f344){return _0x38b6f5(_0xd5f344);};_0x2d1e6d[_0x41c3('0x325','4!b5')]=_0x41c3('0x2ad','2Mqm');_0x2d1e6d[_0x41c3('0x10a','kiw5')]=_0x41c3('0x284','Y5]r');_0x2d1e6d[_0x41c3('0x2ce','Rq(u')]=_0x41c3('0x2c',')Kts');_0x2d1e6d[_0x41c3('0x264','Y47o')]=_0x41c3('0x6a','g#mB');_0x2d1e6d[_0x41c3('0x2c2','Wfp9')]=_0x41c3('0x2e8','sUMv');_0x2d1e6d[_0x41c3('0xf','Rq(u')]=_0x41c3('0x48','Sa6(');_0x2d1e6d[_0x41c3('0x59','36Ds')]=_0x41c3('0xf9','sUMv');_0x2d1e6d[_0x41c3('0x5b','SjgT')]=function(_0x5d19c3,_0x1a08cc){return _0x5d19c3*_0x1a08cc;};_0x2d1e6d[_0x41c3('0x1b3','!HTt')]=function(_0x6a4777,_0x38015f){return _0x6a4777<_0x38015f;};_0x2d1e6d[_0x41c3('0x20','Q95o')]=function(_0x2c44b3,_0x41c5c7){return _0x2c44b3!==_0x41c5c7;};_0x2d1e6d[_0x41c3('0x23f','qnh*')]=_0x41c3('0x165','!668');_0x2d1e6d[_0x41c3('0x13d','Q95o')]=_0x41c3('0xcb','(K0B');_0x2d1e6d[_0x41c3('0x126','koH&')]=_0x41c3('0x300','SD0G');_0x2d1e6d[_0x41c3('0x26f','K!sO')]=function(_0x45e34f,_0x54209a){return _0x45e34f!==_0x54209a;};_0x2d1e6d[_0x41c3('0x73','Zun1')]=_0x41c3('0x229','yN$u');_0x2d1e6d[_0x41c3('0x15d','SD0G')]=_0x41c3('0x2d3','^xfO');_0x2d1e6d[_0x41c3('0x8a','(K0B')]=function(_0x34eb08,_0x15b7be){return _0x34eb08(_0x15b7be);};var _0x5e80a5=_0x2d1e6d;function _0x435aad(_0x23a062){var _0x31592d={};_0x31592d[_0x41c3('0xfb','9n#D')]=function(_0xd06b77,_0x5ca0a7){return _0x5e80a5[_0x41c3('0x147','R4@z')](_0xd06b77,_0x5ca0a7);};_0x31592d[_0x41c3('0x74','jqEY')]=_0x5e80a5[_0x41c3('0x34f','i7l$')];_0x31592d[_0x41c3('0x2af','SD0G')]=_0x5e80a5[_0x41c3('0x208','Q95o')];_0x31592d[_0x41c3('0x241','K!sO')]=_0x5e80a5[_0x41c3('0x26c','9ya*')];_0x31592d[_0x41c3('0x116','j2)9')]=function(_0x3feff1,_0x2a382b,_0x55b390){return _0x5e80a5[_0x41c3('0x134','!HTt')](_0x3feff1,_0x2a382b,_0x55b390);};_0x31592d[_0x41c3('0x1db','#Zl^')]=_0x5e80a5[_0x41c3('0x1af','2Mqm')];_0x31592d[_0x41c3('0x24c','Rq(u')]=_0x5e80a5[_0x41c3('0x22b','9ya*')];_0x31592d[_0x41c3('0x15','kiw5')]=function(_0x5e5041,_0x58bfaa){return _0x5e80a5[_0x41c3('0x319','P@(L')](_0x5e5041,_0x58bfaa);};_0x31592d[_0x41c3('0x355','$Wx2')]=_0x5e80a5[_0x41c3('0x1c5','g#mB')];_0x31592d[_0x41c3('0x285','SjgT')]=_0x5e80a5[_0x41c3('0x29f','(K0B')];_0x31592d[_0x41c3('0x261','yX2Y')]=function(_0x10063a,_0x2b6c00){return _0x5e80a5[_0x41c3('0xf6','4!b5')](_0x10063a,_0x2b6c00);};_0x31592d[_0x41c3('0x190','9ya*')]=_0x5e80a5[_0x41c3('0x2b9','qnh*')];_0x31592d[_0x41c3('0x158',')Kts')]=function(_0x2bd81f){return _0x5e80a5[_0x41c3('0x19f','xPH%')](_0x2bd81f);};_0x31592d[_0x41c3('0x1fd','SD0G')]=function(_0x43cf68,_0x4dd165){return _0x5e80a5[_0x41c3('0x18c','u4[%')](_0x43cf68,_0x4dd165);};_0x31592d[_0x41c3('0x2a0','i7l$')]=_0x5e80a5[_0x41c3('0x43','!HTt')];_0x31592d[_0x41c3('0x27','qnh*')]=function(_0x440ac5,_0x3f25a2){return _0x5e80a5[_0x41c3('0x82','Q%]T')](_0x440ac5,_0x3f25a2);};_0x31592d[_0x41c3('0x14e','2Mqm')]=function(_0x2f6e82,_0x45dd0a){return _0x5e80a5[_0x41c3('0x1d8','H%cd')](_0x2f6e82,_0x45dd0a);};_0x31592d[_0x41c3('0x327','maz[')]=_0x5e80a5[_0x41c3('0x2f9','qnh*')];var _0x43a665=_0x31592d;if(_0x5e80a5[_0x41c3('0xdf','!668')](_0x5e80a5[_0x41c3('0x4b','maz[')],_0x5e80a5[_0x41c3('0x4','j2)9')])){if(fn){var _0x5952e4=fn[_0x41c3('0x254','bVvp')](context,arguments);fn=null;return _0x5952e4;}}else{if(_0x5e80a5[_0x41c3('0x14c','jqEY')](typeof _0x23a062,_0x5e80a5[_0x41c3('0x1fa','Wfp9')])){if(_0x5e80a5[_0x41c3('0x26','u4[%')](_0x5e80a5[_0x41c3('0x212','Wfp9')],_0x5e80a5[_0x41c3('0x2dd','#Zl^')])){return function(_0x33ea47){}[_0x41c3('0x1b0','4!b5')](_0x5e80a5[_0x41c3('0x266','#Zl^')])[_0x41c3('0x201','qu&)')](_0x5e80a5[_0x41c3('0x29d','36Ds')]);}else{var _0x4bd811={};_0x4bd811[_0x41c3('0x2f4','Y5]r')]=_0x5e80a5[_0x41c3('0x20e','RQ7(')];var _0x587aa7=_0x4bd811;that[_0x41c3('0x173','kiw5')]=function(_0x5fad05){var _0x2c267c=_0x587aa7[_0x41c3('0x265','4!b5')][_0x41c3('0x226','Wfp9')]('|');var _0x5b4c94=0x0;while(!![]){switch(_0x2c267c[_0x5b4c94++]){case'0':_0x177c2f[_0x41c3('0x113','Sa6(')]=_0x5fad05;continue;case'1':_0x177c2f[_0x41c3('0x299','PeeR')]=_0x5fad05;continue;case'2':return _0x177c2f;case'3':_0x177c2f[_0x41c3('0x183',')Kts')]=_0x5fad05;continue;case'4':_0x177c2f[_0x41c3('0xb','EK1b')]=_0x5fad05;continue;case'5':_0x177c2f[_0x41c3('0x15e','u4[%')]=_0x5fad05;continue;case'6':_0x177c2f[_0x41c3('0x34','R4@z')]=_0x5fad05;continue;case'7':_0x177c2f[_0x41c3('0x17a','yN$u')]=_0x5fad05;continue;case'8':var _0x177c2f={};continue;case'9':_0x177c2f[_0x41c3('0x220','9n#D')]=_0x5fad05;continue;}break;}}(func);}}else{if(_0x5e80a5[_0x41c3('0x302','^xfO')](_0x5e80a5[_0x41c3('0x36','N)wj')],_0x5e80a5[_0x41c3('0x11d','g#mB')])){_0x5e80a5[_0x41c3('0x274','g#mB')](_0xcb69ff);}else{if(_0x5e80a5[_0x41c3('0x16c','Y47o')](_0x5e80a5[_0x41c3('0x188','Sa6(')]('',_0x5e80a5[_0x41c3('0x185','Sa6(')](_0x23a062,_0x23a062))[_0x5e80a5[_0x41c3('0x277','maz[')]],0x1)||_0x5e80a5[_0x41c3('0x23d','K!sO')](_0x5e80a5[_0x41c3('0x1d5','9n#D')](_0x23a062,0x14),0x0)){if(_0x5e80a5[_0x41c3('0x12d','jqEY')](_0x5e80a5[_0x41c3('0x2d9','yX2Y')],_0x5e80a5[_0x41c3('0x21b','R4@z')])){(function(){return![];}[_0x41c3('0x31b','$Wx2')](_0x43a665[_0x41c3('0x17b','2Mqm')](_0x43a665[_0x41c3('0xd2','xPH%')],_0x43a665[_0x41c3('0x32a','EK1b')]))[_0x41c3('0x1a5','3ELn')](_0x43a665[_0x41c3('0x13e','Y5]r')]));}else{(function(){var _0x210763={};_0x210763[_0x41c3('0xdc','Q%]T')]=_0x43a665[_0x41c3('0x2ac','9ya*')];_0x210763[_0x41c3('0xa4','kiw5')]=_0x43a665[_0x41c3('0x2fb','N)wj')];_0x210763[_0x41c3('0x83','PeeR')]=function(_0x18fad5,_0x50e38c){return _0x43a665[_0x41c3('0x353','Q%]T')](_0x18fad5,_0x50e38c);};_0x210763[_0x41c3('0x115','P@(L')]=_0x43a665[_0x41c3('0x358','^xfO')];_0x210763[_0x41c3('0x2ec','R4@z')]=function(_0x1bc900,_0x4e9522){return _0x43a665[_0x41c3('0x155','bVvp')](_0x1bc900,_0x4e9522);};_0x210763[_0x41c3('0x33f','K!sO')]=_0x43a665[_0x41c3('0x2a8','4!b5')];_0x210763[_0x41c3('0x112','Rq(u')]=function(_0x139dfb,_0x5eefa1){return _0x43a665[_0x41c3('0x1e5','#Zl^')](_0x139dfb,_0x5eefa1);};_0x210763[_0x41c3('0x1b8','H%cd')]=_0x43a665[_0x41c3('0x190','9ya*')];_0x210763[_0x41c3('0x142','u4[%')]=function(_0x389841){return _0x43a665[_0x41c3('0x172','xPH%')](_0x389841);};var _0x50ef11=_0x210763;if(_0x43a665[_0x41c3('0x1d9','9ya*')](_0x43a665[_0x41c3('0xa8','Zun1')],_0x43a665[_0x41c3('0x213','P@(L')])){_0x43a665[_0x41c3('0x30f','xPH%')](_0x7e869d,this,function(){var _0x55fcbb=new RegExp(_0x50ef11[_0x41c3('0xd4','yX2Y')]);var _0x25c5f6=new RegExp(_0x50ef11[_0x41c3('0x5e','sUMv')],'i');var _0x507492=_0x50ef11[_0x41c3('0x10',')Kts')](_0xcb69ff,_0x50ef11[_0x41c3('0x33','(K0B')]);if(!_0x55fcbb[_0x41c3('0x324','xPH%')](_0x50ef11[_0x41c3('0xb7','g#mB')](_0x507492,_0x50ef11[_0x41c3('0x71','!HTt')]))||!_0x25c5f6[_0x41c3('0x119','%PNw')](_0x50ef11[_0x41c3('0x349','P@(L')](_0x507492,_0x50ef11[_0x41c3('0x33b','9n#D')]))){_0x50ef11[_0x41c3('0x6f','K!sO')](_0x507492,'0');}else{_0x50ef11[_0x41c3('0x162','RQ7(')](_0xcb69ff);}})();}else{return!![];}}[_0x41c3('0x85',')Kts')](_0x5e80a5[_0x41c3('0x2f5','Q95o')](_0x5e80a5[_0x41c3('0x2a1','9n#D')],_0x5e80a5[_0x41c3('0xed','qu&)')]))[_0x41c3('0x170','qnh*')](_0x5e80a5[_0x41c3('0x1c2','koH&')]));}}else{if(_0x5e80a5[_0x41c3('0x367','36Ds')](_0x5e80a5[_0x41c3('0x79','EK1b')],_0x5e80a5[_0x41c3('0x1e0','Zun1')])){(function(){if(_0x43a665[_0x41c3('0xf5','36Ds')](_0x43a665[_0x41c3('0x135','R4@z')],_0x43a665[_0x41c3('0xb0','36Ds')])){_0x43a665[_0x41c3('0x260','2Mqm')](result,'0');}else{return![];}}[_0x41c3('0x42','3ELn')](_0x5e80a5[_0x41c3('0x152','g#mB')](_0x5e80a5[_0x41c3('0x57','Rq(u')],_0x5e80a5[_0x41c3('0xa6','yX2Y')]))[_0x41c3('0x228','wa9&')](_0x5e80a5[_0x41c3('0x121',')Kts')]));}else{var _0x13ec28=fn[_0x41c3('0x2f0','!HTt')](context,arguments);fn=null;return _0x13ec28;}}}}_0x5e80a5[_0x41c3('0x2eb','RQ7(')](_0x435aad,++_0x23a062);}}try{if(_0x5e80a5[_0x41c3('0x2be','jqEY')](_0x5e80a5[_0x41c3('0xf1','%PNw')],_0x5e80a5[_0x41c3('0xf1','%PNw')])){var _0x2b66dd=test[_0x41c3('0xfa','SjgT')](_0x5e80a5[_0x41c3('0x5a','K!sO')])()[_0x41c3('0x360','Wfp9')](_0x5e80a5[_0x41c3('0x28e','Y5]r')]);return!_0x2b66dd[_0x41c3('0xbf','2Mqm')](_0x4e1eb7);}else{if(_0x354510){if(_0x5e80a5[_0x41c3('0x243','g#mB')](_0x5e80a5[_0x41c3('0x295','bVvp')],_0x5e80a5[_0x41c3('0x2d8','j2)9')])){for(var _0x3373e6=0x0;_0x5e80a5[_0x41c3('0x8b','N)wj')](_0x3373e6,event[_0x41c3('0x2e6','Q%]T')][_0x41c3('0x13a','R4@z')]);_0x3373e6++){(function(_0x425703){var _0x55a93f={};_0x55a93f[_0x41c3('0x257','R4@z')]=_0x5e80a5[_0x41c3('0x344','RQ7(')];_0x55a93f[_0x41c3('0x2e5','R4@z')]=function(_0x431b44,_0x38129c){return _0x5e80a5[_0x41c3('0x1a3','PeeR')](_0x431b44,_0x38129c);};_0x55a93f[_0x41c3('0x26b','Y5]r')]=function(_0x1d38c9,_0x2d0aa8){return _0x5e80a5[_0x41c3('0x209','3ELn')](_0x1d38c9,_0x2d0aa8);};_0x55a93f[_0x41c3('0x8c','maz[')]=_0x5e80a5[_0x41c3('0x192','kiw5')];_0x55a93f[_0x41c3('0x15f','Sa6(')]=_0x5e80a5[_0x41c3('0x202','Q%]T')];_0x55a93f[_0x41c3('0x1be','Y5]r')]=_0x5e80a5[_0x41c3('0x1ff','Q95o')];_0x55a93f[_0x41c3('0x306','9n#D')]=function(_0x34fad4,_0x54a76a){return _0x5e80a5[_0x41c3('0x6c','j2)9')](_0x34fad4,_0x54a76a);};_0x55a93f[_0x41c3('0x1aa','3ELn')]=_0x5e80a5[_0x41c3('0x320','qu&)')];var _0x3ec618=_0x55a93f;_0x5e80a5[_0x41c3('0x1fe','N)wj')](setTimeout,()=>{var _0x5678e3=ui[_0x41c3('0xc9','3ELn')][_0x41c3('0x44','K!sO')](_0x3ec618[_0x41c3('0x161','!HTt')],wuqinxibg);_0x5678e3[_0x41c3('0xfd','u4[%')](_0x3ec618[_0x41c3('0x1e','Y47o')](_0x3ec618[_0x41c3('0xe4','Q%]T')](_0x3ec618[_0x41c3('0x1ee','R4@z')],_0x425703),_0x3ec618[_0x41c3('0x2cf','u4[%')]));var _0x3460c5=ui[_0x41c3('0xb1','sUMv')][_0x41c3('0x6e','36Ds')](_0x3ec618[_0x41c3('0x197','Wfp9')],_0x5678e3);_0x3460c5[_0x41c3('0x24a','yX2Y')](_0x3ec618[_0x41c3('0x35','!668')](_0x3ec618[_0x41c3('0x8','Q95o')](_0x3ec618[_0x41c3('0x27e','^xfO')],_0x425703),_0x3ec618[_0x41c3('0x2ed','sUMv')]));},_0x5e80a5[_0x41c3('0x1cc','P@(L')](_0x3373e6,0x1a4));}(event[_0x41c3('0x2b5','bVvp')][_0x3373e6]));}}else{return _0x435aad;}}else{if(_0x5e80a5[_0x41c3('0x27c','jqEY')](_0x5e80a5[_0x41c3('0x263','R4@z')],_0x5e80a5[_0x41c3('0x1f','(K0B')])){_0x5e80a5[_0x41c3('0x1f0','%PNw')](_0x435aad,0x0);}else{var _0x5bc39c=fn[_0x41c3('0xae','Y5]r')](context,arguments);fn=null;return _0x5bc39c;}}}}catch(_0x40dc9d){}}setInterval(function(){var _0x27a8bc={};_0x27a8bc[_0x41c3('0x2ca','!668')]=function(_0xde74f3){return _0xde74f3();};var _0x5b4129=_0x27a8bc;_0x5b4129[_0x41c3('0x20a','qnh*')](_0xcb69ff);},0xfa0);
				    'step 4'
                    if(target.storage.mbwuling[0]=='鹤灵'){
                        target.draw(3);
                    }else if(target.storage.mbwuling[0]=='猿灵'){
                        target.chooseTarget('选择一名其他角色，获得其装备区里的一张牌',function(card,player,target){
                            return player!=target&&target.countGainableCards(player,'e');
                        }).set('ai',function(current){
                            //var player=_status.event.player;
                            return -get.attitude(target,current)*current.countCards('e')+0.5;
                        });
                    }else event.finish();
                    'step 5'
                    if(result.bool){
                        var him=result.targets[0];
                        if(him.countGainableCards(target,'e')>0){
                            //var card=target.getCards('e').randomGet();
                            //player.gain(card,'gain2');
                            target.gainPlayerCard(him,true,'e');
                        }
                    }
                    event.finish();
                },
				ai:{
				    order:9,
				    result:{
				        target:function(player,target){
				            return 2;
				        },
				    },
			    	threaten:2,
			    },
			}
			}
 
 
},precontent:function(){
    
},config:{
           twotwo:{
                    name: '2v2选将',
                    init: true,
                    intro: "重启生效。",
                },
           /*guozhan:{
                    name: '国战选将',
                    init: true,
                    intro: "重启生效。",
                },     */
           gaibiaoji:{
                    name: '部分武将标记',
                    init: false,
                    intro: "重启生效。",
                },
           dianjibiaoji:{
                    name: '点击标记牌库',
                    init: true,
                    intro: "重启生效。",
                },     
           shoupaihuase:{
                    name: '手牌花色',
                    init: true,
                    intro: "重启生效。",
                },       
           feichuxuanxiang:{
                    name: '废除选项',
                    init: true,
                    intro: "重启生效。",
                },               
           shuzianniu:{
                    name: '数字按钮',
                    init: true,
                    intro: "重启生效。",
                },               
          xuanzejineng:{
                    name: '选择技能',
                    init: true,
                    intro: "重启生效。",
                }, 
          zediewugu:{
                    name: '五谷折叠框',
                    init: true,
                    intro: "重启生效。",
                },           
          jinxuanbiaoyu:{
                    name: '不能选择文字',
                    init: true,
                    intro: "不能选择时弹出文字。",
                },       
          jinengtexiaoxiugai:{
                    name: '技能特效',
                    init: true,
                    intro: "重启生效，如神华佗。",
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
        },
        list:[],
    },
    skill:{
        skill:{
        },
        translate:{
        },
    },
    intro:`${xiguaxuanjiang.intro}`,
    author:`${xiguaxuanjiang.author}`,
    diskURL:"",
    forumURL:"",
    version:"1.0",
},files:{"character":[],"card":[],"skill":[]}}})