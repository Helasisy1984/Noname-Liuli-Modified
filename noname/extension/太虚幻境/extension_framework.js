'use strict';
game.import("太虚幻境", function (lib, game, ui, get, ai, _status) {
    if (window.dui) {
        if (dui.isMobile()) {
            lib.init.css(""+lib.assetURL+"extension/太虚幻境","extension_MobileStyle");
        } else {
            lib.init.css(""+lib.assetURL+"extension/太虚幻境","extension_PcStyle");
        }
    } else {
        txhj.isMobile = navigator.userAgent.match(/(Android|iPhone|SymbianOS|Windows Phone|iPad|iPod)/i);
        if (txhj.isMobile) {
            lib.init.css(""+lib.assetURL+"extension/太虚幻境","extension_MobileStyle");
        } else {
            lib.init.css(""+lib.assetURL+"extension/太虚幻境","extension_PcStyle");
        }
    }
    //buff图标统一
    game.createCss(`.txhj_buffLogo {
        background-position: center center;
        background-size: 120% 120%;
        border-radius: 50% !important;
        border: 2px solid #484848 !important;
        border-width: 2px !important;
        border-style: solid !important;
        border-color: #484848 !important;
        box-sizing: border-box;
        width: 100%;
        aspect-ratio: 1/1;
        top: 0%;
        left: 0;
    }`);
    game.createCss(`.txhj_buffImg {
        width: 100px;
        height: 100px;
    }`);
    window.txhjBuffIcon=function(node) {
        var divBuff = ui.create.div(node);
        divBuff.style.backgroundImage=node.style.backgroundImage;
        //.setBackgroundImage('extension/太虚幻境/image/buff/'+id+'.png');
        //divBuff.classList.add('txhj_buffLogoSpe');
        divBuff.classList.add('txhj_buffLogo');
        node.style.backgroundImage='none';
        node.divBuff=divBuff;
        return divBuff;
    }
    window.getYC=function(){
    if(window.yusheCharacter) return;
    window.yusheCharacter={
        wei:[],
        shu:[],
        wu:[],
        qun:[],
        jin:[],
        shen:[],
    };
    var getNums=function(rarity) {
            var star;
            switch(rarity){
                case 'legend':star=5;break;
                case 'epic':star=4;break;
                case 'rare':star=3;break;
                case 'common':star=2;break;
                default:star=1;
            }
            return star;
        }
        var nandu=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:1;
    for(var gps in window.yusheCharacter) {
        var sumChas=[];
        for(var c in lib.character) {
            var info=lib.character[c];
            if(c.indexOf('txhj_')!=-1) continue;
            if(!info||!info.length) continue;
            if(info[1]!=gps) continue;
            if(info[4]&&(info[4].contains('unseen')||info[4].contains('minskin')||info[4].contains('forbidai'))) continue;
            if(lib.config.mode_config.taixuhuanjing.pingheng&&getNums(game.getRarity(c))>nandu+1) continue;
            sumChas.add(c);
        }
        var getsNum=14;
        if(gps=='shen') getsNum=7;
        var adds=sumChas.randomGets(getsNum);
        adds.sort((a,b)=>getNums(game.getRarity(a))-getNums(game.getRarity(b)));
        window.yusheCharacter[gps]=adds;
    }
    };
    txhj.rule = '太虚幻境玩法說明'
        +'<br>在此模式中，你挑戰若干個章節中隨機出現的關卡，通過戰鬥、使用挑戰中獲得的金幣購買或是經歷隨機的事件來獲得各種補強。'
        +'<br>你可以獲得新的技能、每次對局都會自動裝備的裝備、每次開局都會入手的個人牌庫牌，以及各類效果不同的祝福如果在挑戰關卡不慎失敗，就要重新開始;只有找到適合自己的組合搭配，才能挑戰最終首領，獲得這左慈修煉的太虚幻境中的“真傳之秘”'
        +'<br>本次挑戰開放五個難度，挑戰一個難度成功後即可解鎖更高難度。'
        +'<br>不同的難度下敵人的體力也不同，高難度甚至會有額外的技能加成。'
        +'<br>在賽季開放時間內，不用擔心必須要一口氣結束一整場挑戰哦'
        +'<br>每次進行選擇或者挑戰了關卡後都會存檔，賽季之中可以任意遊玩'
        +'<br>重複挑戰，嘗試強大的搭配、有趣的通關方式，擊敗最高難度的各類敵人吧!';
    if(!lib.config.txhj_collect) game.saveConfig('txhj_collect',{'Helasisy':true,cards:{},character:{},seaslist:[]});
    //用于测试：给太虚幻境存个档
    game.backuptaixu=function(){
        game.saveConfig('taixu_backup1',lib.config.taixuhuanjing);
        game.saveConfig('taixu_backup2',lib.config.taixuhuanjingNode);
        game.saveConfig('taixu_backup3',lib.config.txhj_collect);
        return '备份成功';
    }
    game.loadtaixu=function(){
        game.saveConfig('taixuhuanjing',lib.config.taixu_backup1);
        game.saveConfig('taixuhuanjingNode',lib.config.taixu_backup2);
        game.saveConfig('txhj_collect',lib.config.taixu_backup3);
        return '加载成功';
    }
    game.examineModeConfig = function(){
        var home = ui.create.div('.taixuhuanjing_examineModeHome');
        document.body.appendChild(home);
        var homeBody = ui.create.div('.taixuhuanjing_examineModeBody',home);
        var setexamineSize = function(){
            var screenWidth = ui.window.offsetWidth;
            var screenHeight = ui.window.offsetHeight;
            var whr = 1.77;
            var width;
            var height;
            if(screenWidth / whr > screenHeight){
                height = screenHeight;
                width = height * whr;
            }else{
                width = screenWidth;
                height = screenWidth/whr;
            }
            homeBody.style.height = Math.round(height)+"px";
            homeBody.style.width = Math.round(width)+"px";
        };
        setexamineSize();
        var reexaminesize = function(){
            setTimeout(setexamineSize,500);
        };
        lib.onresize.push(reexaminesize);
        game.saveConfig('examineModeConfig',undefined, false, () => {
            document.body.removeChild(home);
            lib.onresize.remove(reexaminesize);
            game.taixuhuanjingHome();
        });
    };
    game.updateModeData = function(){
        var rank;
        var season
        if (lib.config.taixuhuanjing) {
            rank = lib.config.taixuhuanjing.rank;
            season = lib.config.taixuhuanjing.season;
        }
        delete lib.config.taixuhuanjing;
        lib.config.taixuhuanjing = {
            name:null,/*当前角色*/
            point:null,/*当前点将*/
            servant:null,/*当前侍灵*/
            level:1,/*当前等级*/
            score:{/*得分统计*/
                gaincard:0,
                usecard:0,
                discard:0,
                damage:0,
                damaged:0,
                kill:0,
                skill:0,
                round:0,
                fight:0,
                time:0,
            },
            collect:{/*收集*/
                ChongYingChuLin:{
                    card:{},/*卡牌*/
                    equip:{},/*装备*/
                    skill:{},/*技能*/
                    buff:{},/*祝福*/
                    character:{},/*武将*/
                },
                HuangTianZhiNu:{
                    card:{},/*卡牌*/
                    equip:{},/*装备*/
                    skill:{},/*技能*/
                    buff:{},/*祝福*/
                    character:{},/*武将*/
                },
                HeJinZhuHuan:{
                    card:{},/*卡牌*/
                    equip:{},/*装备*/
                    skill:{},/*技能*/
                    buff:{},/*祝福*/
                    character:{},/*武将*/
                },
                HaiWaiFenghe:{
                    card:{},/*卡牌*/
                    equip:{},/*装备*/
                    skill:{},/*技能*/
                    buff:{},/*祝福*/
                    character:{},/*武将*/
                },   
                GFHuangJinZhiLuan:{
                    card:{},/*卡牌*/
                    equip:{},/*装备*/
                    skill:{},/*技能*/
                    buff:{},/*祝福*/
                    character:{},/*武将*/
                },    
                LiGuoZhiLuan:{
                    card:{},/*卡牌*/
                    equip:{},/*装备*/
                    skill:{},/*技能*/
                    buff:{},/*祝福*/
                    character:{},/*武将*/
                },  
               MGBaWangZhengCheng:{
                    card:{},/*卡牌*/
                    equip:{},/*装备*/
                    skill:{},/*技能*/
                    buff:{},/*祝福*/
                    character:{},/*武将*/
                },                      
            },
            hp:0,/*武将体力*/
            maxHp:0,/*额外体力*/
            exp:0,/*当前经验*/
            maxExp:100,/*所需经验*/
            cards:[],/*可用牌组*/
            equips:[],/*可用装备*/
            equip1:null,/*武器栏name:'qinggang',suit:'spade',number:13*/
            equip2:null,/*防具栏*/
            equip3:null,/*宝物栏*/
            equip4:null,/*宝物栏{name:'chitu',suit:'spade',number:13}*/
            minHs:4,/*初始手牌*/
            maxHs:0,/*手牌上限*/

            effect:'pinganwushi',/*突变效果*/
            buff:[],/*可用效果*/
            skills:[],/*备选技能*/
            maxSkills:5,/*技能插槽*/
            useSkills:[],/*装载技能*/
            skillSource:{},/*技能来源*/

            rank:rank || 1,/*难度1:'普通',2:'困难',3:'噩梦',4:'炼狱',5:'血战',*/
            season:season || 'HuangTianZhiNu',/*当前赛季*/
            chapter:0,/*游玩章节*/
            procedure:null,/*当前流程*/

            adjust:0,/*调度次数*/
            skin:null,/*造型加成*/

            coin:0,/*太虚金币*/
            maxCoin:0,/*最大金币*/
            skip:[],/*跳过事件*/
            exam:[],/*问答事件*/
            events:[],/*收集事件*/
            optional1:null,/*可选事件*/
            optional2:null,/*可选事件*/
            optional3:null,/*可选事件*/
            optionalExam:[],/*通用事件*/
            bowenqiangzhi:null,/*bowenqiangzhi*/
        };
        if (lib.config.taixuhuanjingNode&&lib.config.taixuhuanjingNode[lib.config.taixuhuanjing.season]&&lib.config.taixuhuanjingNode[lib.config.taixuhuanjing.season].rank>1) {
            lib.config.taixuhuanjing.rank = lib.config.taixuhuanjingNode[lib.config.taixuhuanjing.season].rank;
        }
        game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
    };
    /*记录*/
    game.txhjRecordHome = function () {
        if(ui.roundmenu) {//菜单隐藏大法
                ui.roundmenu.hide();
                //ui.roundmenu.style.opacity=0;
                ui.roundmenu.style.visibility='hidden';
                setTimeout(()=>{ui.roundmenu.show();},500);
            }
        var home = ui.create.div('.taixuhuanjing_collectHome');
        document.body.appendChild(home);
        var homeBody = ui.create.div('.taixuhuanjing_collectHomeBody',home);
        homeBody.setBackgroundImage('extension/太虚幻境/image/background/frame1.png');
        homeBody.addEventListener("click",function(){
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
        var setcollectSize = function(){
            var screenWidth = ui.window.offsetWidth;
            var screenHeight = ui.window.offsetHeight;
            var whr = 2.0;
            var width;
            var height;
            if(screenWidth / whr > screenHeight){
                height = screenHeight;
                width = height * whr;
            }else{
                width = screenWidth;
                height = screenWidth/whr;
            }
            homeBody.style.height = Math.round(height)+"px";
            homeBody.style.width = Math.round(width)+"px";
            homeBody.style.transform = 'translate(-50%,-50%) scale(0.9)';
        };
        setcollectSize();
        var recollectsize = function(){
            setTimeout(setcollectSize,500);
        };
        lib.onresize.push(recollectsize);
        var homeBoxTitle = ui.create.div('.taixuhuanjing_collectHomeBoxTitle',homeBody);
        var homeBox = ui.create.div('.taixuhuanjing_collectHomeBox',homeBody);
        lib.setScroll(homeBox);
        function func (node,num) {
            /*if(ui.roundmenu) {//菜单隐藏大法
                ui.roundmenu.hide();
                //ui.roundmenu.style.opacity=0;
                ui.roundmenu.style.visibility='hidden';
                setTimeout(()=>{ui.roundmenu.show();},500);
            }*/
            var div = ui.create.div('.taixuhuanjing_collectHomeBoxDiv');
            var divImp = ui.create.div('.taixuhuanjing_collectHomeBoxDivImp',div);
            divImp.setBackground(node.name,'character');
            var divName = ui.create.div('.taixuhuanjing_collectHomeBoxDivName',''+lib.translate[node.name],div);
            var divNum1 = ui.create.div('.taixuhuanjing_collectHomeBoxDivNum1',''+num,div);
            var divNum2 = ui.create.div('.taixuhuanjing_collectHomeBoxDivNum2','积分:'+Math.floor(node.total),div);
            var rankStr = lib.translate['txhj_'+node.season]+'';
            switch(node.rank){
                case 5:rankStr+=' 血战';break;
                case 4:rankStr+=' 炼狱';break;
                case 3:rankStr+=' 噩梦';break;
                case 2:rankStr+=' 困难';break;
                default:rankStr+=' 普通';
            }
            //渐变暗化排行榜
            if(num<=4) {
                div.style.filter='brightness('+(1.2-num*0.2)+')';
            }
            //高亮显示最近记录
            if(lib.config['taixuhuanjingRecord'].history&&node.history&&lib.config['taixuhuanjingRecord'].history==node.history) {
                div.style='box-shadow: 0px 0px 4px 4px #FFFF33;filter:brightness(1.3)';
            }
            var divRank = ui.create.div('.taixuhuanjing_collectHomeBoxDivRank',''+rankStr,div);
            return div;
        };
        var list = [];
        for(var i in lib.config.taixuhuanjingRecord){
            if (lib.config.taixuhuanjingRecord[i].total) {
                list.push(lib.config.taixuhuanjingRecord[i]);
            }
        }
        list.sort(function(a,b){
            var num1 = a.total || 0;
            var num2 = b.total || 0;
            return num2-num1;
        });
        for(var n=0;n<list.length;n++) {
            list[n].paiMing=n+1;
        }
        //让最新的记录可以显示
        list=list.slice(0,4);
        if(lib.config['taixuhuanjingRecord']&&lib.config['taixuhuanjingRecord'].newRec) {
            var newRec=lib.config.taixuhuanjingRecord[lib.config['taixuhuanjingRecord'].newRec];
            if(newRec&&!list.contains(newRec)) {
                list=list.slice(0,3);
                list.push(newRec);
            }
        }
        //新的展示：最多显示4个
        var num = 0;
        while(list.length){
            //num++;
            var node = list.shift();
            num=node.paiMing;
            homeBox.appendChild(func(node,num));
        }
        var button = ui.create.div('.taixuhuanjing_collectHomeButton',home);
        button.addEventListener("click",function(){
            if(ui.roundmenu) {//菜单显示大法
                //ui.roundmenu.style.opacity=1;
                ui.roundmenu.style.visibility='visible';
            }
            game.txhj_playAudioCall('off',null,true);
            home.delete();
            lib.onresize.remove(recollectsize);
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
        home.addEventListener("click",function(){
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
    };
    /*图鉴*/
    game.collectHome = function () {
        var home = ui.create.div('.taixuhuanjing_collectHome');
        document.body.appendChild(home);
        var homeBody = ui.create.div('.taixuhuanjing_collectHomeBody',home);
        homeBody.addEventListener("click",function(){
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
        var setcollectSize = function(){
            var screenWidth = ui.window.offsetWidth;
            var screenHeight = ui.window.offsetHeight;
            var whr = 2.0;
            var width;
            var height;
            if(screenWidth / whr > screenHeight){
                height = screenHeight;
                width = height * whr;
            }else{
                width = screenWidth;
                height = screenWidth/whr;
            }
            homeBody.style.height = Math.round(height)+"px";
            homeBody.style.width = Math.round(width)+"px";
            homeBody.style.transform = 'translate(-50%,-50%) scale(1)';
        };
        setcollectSize();
        var recollectsize = function(){
            setTimeout(setcollectSize,500);
        };
        lib.onresize.push(recollectsize);
        var comps = {
            title:(function(){
                var title = ui.create.div('.taixuhuanjing_collectHomeTitle');
                return title;
            })(),
            showBox:(function(){
                var showBox = ui.create.div('.taixuhuanjing_collectShowBox');
                if(ui.roundmenu) {//菜单隐藏大法
                    ui.roundmenu.hide();
                    //ui.roundmenu.style.opacity=0;
                    ui.roundmenu.style.visibility='hidden';
                    setTimeout(()=>{ui.roundmenu.show();},500);
                }
                showBox.update = function (type) {
                    showBox.innerHTML = '';
                    if (type=='all') {
                        function func(node){
                            var div = ui.create.div('.taixuhuanjing_collectShowBoxAllDiv');
                            div.setBackgroundImage('extension/太虚幻境/image/icon/icon_type_'+node.type+'.png');
                            var num = 0;
                            var max = 0;
                            if (node.type!='character') {
                                var list2 = game.collectPack[node.type].slice(0);
                                max = list2.length;
                                for (var i = 0; i < list2.length; i++) {
                                    if(lib.config.txhj_collect.cards[list2[i].id]) list2[i].num=lib.config.txhj_collect.cards[list2[i].id];
                                    if (list2[i].num>=list2[i].min) {
                                        num++;
                                    }
                                }
                            } else {
                                for(var i in game.collectPack.character){
                                    if(lib.config['txhj_collect'].character[i]) game.collectPack.character[i].num=lib.config['txhj_collect'].character[i];
                                    if (game.collectPack.character[i].num>=game.collectPack.character[i].min) {
                                        num++;
                                    }
                                    max++;
                                }
                            }
                            var speedBox = ui.create.div('.taixuhuanjing_collectShowBoxAllDivSpeedBox',div);
                            var speedColor = ui.create.div('.taixuhuanjing_collectShowBoxAllDivSpeedColor',speedBox);
                            var winrate = Math.round(num/max*10000)/100;
                            if (winrate<10) winrate = 10;
                            winrate = winrate + -100;
                            if (winrate>100) winrate = 100;
                            speedColor.style.left = ""+winrate+"%";
                            var divText = ui.create.div('.taixuhuanjing_collectShowBoxAllDivText',div);
                            divText.innerHTML = '进度: '+num+'/'+max;
                            return div;
                        };
                        var list = [{type:'card',info:'卡牌'},{type:'equip',info:'装备'},{type:'skill',info:'技能'},{type:'buff',info:'祝福'},{type:'character',info:'角色'}]
                        while(list.length){
                            showBox.appendChild(func(list.shift()));
                        };
                    } else if (type=='card') {
                        var showBoxcContent2 = ui.create.div('.taixuhuanjing_showBoxcContent2',showBox);
                        var showBoxcContent2Body = ui.create.div('.taixuhuanjing_showBoxcContent2Body',showBoxcContent2);
                        showBoxcContent2Body.nodes = {};
                        showBoxcContent2Body.choosingNow = null;
                        lib.setScroll(showBoxcContent2Body);
                        showBoxcContent2.update = function (node) {
                            showBoxcContent2Body.innerHTML = '';
                            var showBoxcContent2Title = ui.create.div('.taixuhuanjing_showBoxcContent2Title',showBoxcContent2Body,'?????');
                            var showBoxcContent2Text = ui.create.div('.taixuhuanjing_showBoxcContent2Text',showBoxcContent2Body);
                            showBoxcContent2Text.nodes = {};
                            showBoxcContent2Text.choosingNow = null;
                            lib.setScroll(showBoxcContent2Text);
                            if(lib.config.txhj_collect.cards[node.id]) node.num=lib.config.txhj_collect.cards[node.id];
                            if (node.num<=node.min||true) {
                                showBoxcContent2Text.style['background-color'] = 'rgb(117 107 87)';
                                showBoxcContent2Title.innerHTML = lib.translate[node.id];
                                showBoxcContent2Title.setBackgroundImage('extension/太虚幻境/image/icon/icon_title'+node.rank+'.png');
                                showBoxcContent2Text.update = function (button) {
                                    showBoxcContent2Text.innerHTML = '';
                                    showBoxcContent2Text.click = null;
                                    var season = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv3','所属赛季',showBoxcContent2Text);
                                    var saijitra=lib.translate['txhj_'+node.sort]?lib.translate['txhj_'+node.sort]:'神秘时空';
                                    var seasonText = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv4',''+saijitra,showBoxcContent2Text);
                                    var intro = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv3','描述',showBoxcContent2Text);
                                    var introText = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv4',''+lib.translate[node.id+'_info'],showBoxcContent2Text);
                                    var info = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv3','引文',showBoxcContent2Text);
                                    var nodeinfo=node.info?node.info:'神秘地出现在太虚幻境的世界里，没有人知道它的来历。';
                                    var infoText = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv4',''+nodeinfo,showBoxcContent2Text);
                                };
                                showBoxcContent2Text.update();
                            } else {
                                if (node.min==1) {
                                    showBoxcContent2Text.innerHTML = '于幻境中获得一次才能解锁';
                                } else {
                                    showBoxcContent2Text.innerHTML = '于幻境中获得（'+node.num+'/'+node.min+'）次才能解锁';
                                }
                                showBoxcContent2Text.style["background"] = "none";
                            }
                        };
                        var showBoxcContent = ui.create.div('.taixuhuanjing_showBoxcContent',showBox);
                        var showBoxcContentBody = ui.create.div('.taixuhuanjing_showBoxcContentBody',showBoxcContent);
                        showBoxcContentBody.nodes = {};
                        showBoxcContentBody.choosingNow = null;
                        lib.setScroll(showBoxcContentBody);
                        showBoxcContent.update = function (type) {
                            showBoxcContentBody.innerHTML = '';
                            function func(node){
                                var div = ui.create.div('.taixuhuanjing_showBoxcContentDivCard');
                                div.node = node;
                                var card = {
                                    name:node.id,
                                    suit:node.cardSuit,
                                    number:node.cardNumber,
                                    nature:node.cardNature,
                                }
                                var card2 = game.createCard(card);
                                card2.style.width = '95%';
                                card2.style.height = '95%';
                                card2.style.zIndex = 1;
                                card2.style["transform-origin"] = "center center";
                                div.appendChild(card2);
                                var divImp = ui.create.div('.taixuhuanjing_consoledeskAttributeBody2Imp',div);
                                var divText = ui.create.div('.taixuhuanjing_consoledeskAttributeBody2Text',divImp);
                                if(lib.config.txhj_collect.cards[node.id]) node.num=lib.config.txhj_collect.cards[node.id];
                                if (node.num<node.min) {
                                    divImp.style.filter = "brightness(0.8)";
                                    //divImp.style.webkitFilter = "grayscale(1)";
                                }
                                var cardnum = card.number||'';
                                var cardname = card.name||'';
                                if (cardname=='sha'&&card.nature=='thunder') {
                                    cardname='leisha';
                                }
                                if (cardname=='sha'&&card.nature=='fire') {
                                    cardname='huosha';
                                }
                                if([1,11,12,13].contains(cardnum)){
                                    cardnum={'1':'A','11':'J','12':'Q','13':'K'}[cardnum]
                                }
                                divText.innerHTML = cardnum+'<br>'+lib.translate[card.suit];
                                if (card.suit=='heart'||card.suit=='diamond') {
                                    divText.style.color = 'rgb(255,0,0)';
                                }
                                var cardImp = function (card){
                                    var src = lib.card[card.name].image;
                                    if (src) {
                                        if (src.indexOf('ext:') == 0) {
                                            src=src.replace(/ext:/, 'extension/');
                                        }
                                        divImp.setBackgroundImage(src);
                                    } else {
                                        var img=new Image();
                                        img.src=lib.assetURL+'image/card/'+card.name+'.png';
                                        img.onload=function(){
                                            divImp.setBackgroundImage('image/card/'+card.name+'.png');
                                        }
                                        img.onerror=function(){
                                            divImp.setBackgroundImage('image/card/'+card.name+'.png')
                                            if (card.name=='yuheng_plus'||card.name=='yuheng_pro') {
                                                divImp2.setBackgroundImage('image/card/yuheng.png');
                                            }
                                        }
                                    }
                                };
                                if(lib.config['extension_'+'十周年UI'+'_enable']){
                                    var type=lib.config['extension_'+'十周年UI'+'_cardPrettify'];
                                    type=type?'.'+type:'.jpg';
                                    var img=new Image();
                                    img.src = lib.assetURL+'extension/十周年UI/image/card/'+cardname+type;
                                    img.onload=function(){
                                        divImp.setBackgroundImage('extension/十周年UI/image/card/'+cardname+type)
                                    }
                                    img.onerror=function(){
                                        cardImp(card);
                                    }
                                } else {
                                    cardImp(card);
                                }
                                div.listen(function(e){
                                    game.txhj_playAudioCall('WinButton',null,true);
                                    if(showBoxcContentBody.choosingNow){
                                        showBoxcContentBody.choosingNow.noChoiced();
                                    }
                                    this.choiced();
                                    showBoxcContent2.update(div.node);
                                    event.cancelBubble = true;
                                    event.returnValue = false; 
                                    return false;    
                                });
                                div.choiced = function(){
                                    showBoxcContentBody.choosingNow = this;
                                    div.style.boxShadow = '-1px 0px 1px rgba(255,255,0,0.75),0px -1px 1px rgba(255,255,0,0.75),1px 0px 1px rgba(255,255,0,0.75),0px 1px 5px rgba(255,255,0,0.75)';
                                };
                                div.noChoiced = function(){
                                    showBoxcContentBody.choosingNow = null;
                                    div.style.boxShadow = 'none';
                                };
                                return div;
                            };
                            var list = [];
                            for (var i = 0; i < game.collectPack.card.length; i++) {
                                if (type=='全部') {
                                    list.push(game.collectPack.card[i]);
                                }  else if (type=='基本牌') {
                                    if (game.collectPack.card[i].type=='basic') {
                                        list.push(game.collectPack.card[i]);
                                    }
                                } else if (type=='锦囊牌') {
                                    if (game.collectPack.card[i].type=='delay'||game.collectPack.card[i].type=='trick') {
                                        list.push(game.collectPack.card[i]);
                                    }
                                } 
                            }
                            while(list.length) {
                                showBoxcContentBody.appendChild(func(list.shift()));
                            }
                        };
                        var showBoxComps = {
                            showBoxTitles:(function(){
                                var showBoxTitles = ui.create.div('.taixuhuanjing_showBoxTitles');
                                showBoxTitles.nodes = {};
                                showBoxTitles.choosingNow = null;
                                function func(node){
                                    var div = ui.create.div('.taixuhuanjing_showBoxTitle');
                                    var divText = ui.create.div('.taixuhuanjing_showBoxTitleText',''+node,div);
                                    div.addEventListener("click",function(){
                                        game.txhj_playAudioCall('WinButton',null,true);
                                        this.choiced();
                                        event.cancelBubble = true;
                                        event.returnValue = false; 
                                        return false;
                                    });
                                    div.choiced = function(){
                                        if(showBoxTitles.choosingNow){
                                            showBoxTitles.choosingNow.noChoiced();
                                        }
                                        showBoxTitles.choosingNow = this;
                                        div.setBackgroundImage('extension/太虚幻境/image/icon/icon_Button18.png');
                                        showBoxcContent.update(node);
                                    };
                                    div.noChoiced = function(){
                                        showBoxTitles.choosingNow = null;
                                        div.setBackgroundImage('extension/太虚幻境/image/icon/icon_Button19.png');
                                    };
                                    if (node=='全部') {
                                        div.choiced();
                                    }
                                    return div;
                                };
                                var list = ['全部','基本牌','锦囊牌'];
                                while(list.length){
                                    showBoxTitles.appendChild(func(list.shift()));
                                };
                                return showBoxTitles;
                            })(),
                        }
                        for(var i in showBoxComps){
                            showBox.appendChild(showBoxComps[i]);
                        }
                    } else if (type=='equip') {
                        var showBoxcContent2 = ui.create.div('.taixuhuanjing_showBoxcContent2',showBox);
                        var showBoxcContent2Body = ui.create.div('.taixuhuanjing_showBoxcContent2Body',showBoxcContent2);
                        showBoxcContent2Body.nodes = {};
                        showBoxcContent2Body.choosingNow = null;
                        lib.setScroll(showBoxcContent2Body);
                        showBoxcContent2.update = function (node) {
                            showBoxcContent2Body.innerHTML = '';
                            var showBoxcContent2Title = ui.create.div('.taixuhuanjing_showBoxcContent2Title',showBoxcContent2Body,'?????');
                            var showBoxcContent2Text = ui.create.div('.taixuhuanjing_showBoxcContent2Text',showBoxcContent2Body);
                            showBoxcContent2Text.nodes = {};
                            showBoxcContent2Text.choosingNow = null;
                            lib.setScroll(showBoxcContent2Text);
                            if(lib.config.txhj_collect.cards[node.id]) node.num=lib.config.txhj_collect.cards[node.id];
                            if (node.num>=node.min) {
                                showBoxcContent2Text.style['background-color'] = 'rgb(117 107 87)';
                                showBoxcContent2Title.innerHTML = lib.translate[node.id];
                                showBoxcContent2Title.setBackgroundImage('extension/太虚幻境/image/icon/icon_title'+node.rank+'.png');
                                var tab = ui.create.div('.taixuhuanjing_showBoxcContent2TitleTab',showBoxcContent2Title);
                                tab.setBackgroundImage('extension/太虚幻境/image/icon/icon_title'+node.rank+'tab.png');
                                showBoxcContent2Text.update = function (button) {
                                    showBoxcContent2Text.innerHTML = '';
                                    showBoxcContent2Text.click = null;
                                    var season = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv3','所属赛季',showBoxcContent2Text);
                                    var saijitra=lib.translate['txhj_'+node.sort]?lib.translate['txhj_'+node.sort]:'神秘时空';
                                    var seasonText = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv4',''+saijitra,showBoxcContent2Text);
                                    var intro = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv3','描述',showBoxcContent2Text);
                                    var introText = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv4',''+lib.translate[node.id+'_info'],showBoxcContent2Text);
                                    var info = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv3','引文',showBoxcContent2Text);
                                    if(node.info[0]=='<') node.info=false;
                                    var nodeinfo=node.info?node.info:['据说曾被某位名将持有，如今被遗落在太虚幻境的世界里。','一件不起眼的神器，但每当在夜里总会发出幽幽金光。','由多任太虚幻境勇者流传下来的宝物，据说有着不为人知的故事。','相传是某位王侯将相通天地之灵气，集日月之精华所制成。'].randomGet();
                                    //if(node.info) alert_old(node.info);
                                    var infoText = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv4',''+nodeinfo,showBoxcContent2Text);
                                };
                                showBoxcContent2Text.update();
                            } else {
                                if (node.min==1) {
                                    showBoxcContent2Text.innerHTML = '于幻境中获得一次才能解锁';
                                } else {
                                    showBoxcContent2Text.innerHTML = '于幻境中获得（'+node.num+'/'+node.min+'）次才能解锁';
                                }
                                showBoxcContent2Text.style["background"] = "none";
                            }
                        };
                        var showBoxcContent = ui.create.div('.taixuhuanjing_showBoxcContent',showBox);
                        var showBoxcContentBody = ui.create.div('.taixuhuanjing_showBoxcContentBody',showBoxcContent);
                        showBoxcContentBody.nodes = {};
                        showBoxcContentBody.choosingNow = null;
                        lib.setScroll(showBoxcContentBody);
                        showBoxcContent.update = function (type) {
                            showBoxcContentBody.innerHTML = '';
                            function func(node){
                                var div = ui.create.div('.taixuhuanjing_showBoxcContentDivCard');
                                div.node = node;
                                var card = {
                                    name:node.id,
                                    suit:node.cardSuit,
                                    number:node.cardNumber,
                                    nature:'none',
                                }
                                var card2 = game.createCard(card);
                                card2.style.width = '95%';
                                card2.style.height = '95%';
                                card2.style.zIndex = 1;
                                card2.style["transform-origin"] = "center center";
                                div.appendChild(card2);
                                var divImp = ui.create.div('.taixuhuanjing_consoledeskAttributeBody2Imp',div);
                                var divText = ui.create.div('.taixuhuanjing_consoledeskAttributeBody2Text',divImp);
                                if(lib.config.txhj_collect.cards[node.id]) node.num=lib.config.txhj_collect.cards[node.id];
                                if (node.num<node.min) {
                                    divImp.style.webkitFilter = "brightness(0.85) grayscale(1)";
                                }
                                var cardnum = card.number||'';
                                if([1,11,12,13].contains(cardnum)){
                                    cardnum={'1':'A','11':'J','12':'Q','13':'K'}[cardnum]
                                }
                                divText.innerHTML = cardnum+'<br>'+lib.translate[card.suit];
                                if (card.suit=='heart'||card.suit=='diamond') {
                                    divText.style.color = 'rgb(255,0,0)';
                                }
                                var cardImp = function (card){
                                    var src = lib.card[card.name].image;
                                    if (src) {
                                        if (src.indexOf('ext:') == 0) {
                                            src=src.replace(/ext:/, 'extension/');
                                        }
                                        divImp.setBackgroundImage(src);
                                    } else {
                                        var img=new Image();
                                        img.src=lib.assetURL+'image/card/'+card.name+'.png';
                                        img.onload=function(){
                                            divImp.setBackgroundImage('image/card/'+card.name+'.png');
                                        }
                                        img.onerror=function(){
                                            divImp.setBackgroundImage('image/card/'+card.name+'.png');
                                        }
                                    }
                                };
                                if(lib.config['extension_'+'十周年UI'+'_enable']){
                                    var type=lib.config['extension_'+'十周年UI'+'_cardPrettify'];
                                    type=type?'.'+type:'.jpg';
                                    var img=new Image();
                                    img.src = lib.assetURL+'extension/十周年UI/image/card/'+card.name+type;
                                    img.onload=function(){
                                        divImp.setBackgroundImage('extension/十周年UI/image/card/'+card.name+type)
                                    }
                                    img.onerror=function(){
                                        cardImp(card);
                                    }
                                } else {
                                    cardImp(card);
                                }
                                div.listen(function(e){
                                    game.txhj_playAudioCall('WinButton',null,true);
                                    if(showBoxcContentBody.choosingNow){
                                        showBoxcContentBody.choosingNow.noChoiced();
                                    }
                                    this.choiced();
                                    showBoxcContent2.update(div.node);
                                    event.cancelBubble = true;
                                    event.returnValue = false; 
                                    return false;    
                                });
                                div.choiced = function(){
                                    showBoxcContentBody.choosingNow = this;
                                    div.style.boxShadow = '-1px 0px 1px rgba(255,255,0,0.75),0px -1px 1px rgba(255,255,0,0.75),1px 0px 1px rgba(255,255,0,0.75),0px 1px 5px rgba(255,255,0,0.75)';
                                };
                                div.noChoiced = function(){
                                    showBoxcContentBody.choosingNow = null;
                                    div.style.boxShadow = 'none';
                                };
                                return div;
                            };
                            var list = [];
                            for (var i = 0; i < game.collectPack.equip.length; i++) {
                                if (type=='全部') {
                                    list.push(game.collectPack.equip[i]);
                                }  else if (type=='武器') {
                                    if (game.collectPack.equip[i].type=='equip1') {
                                        list.push(game.collectPack.equip[i]);
                                    }
                                } else if (type=='防具') {
                                    if (game.collectPack.equip[i].type=='equip2') {
                                        list.push(game.collectPack.equip[i]);
                                    }
                                } else if (type=='宝物') {
                                    if (game.collectPack.equip[i].type=='equip5') {
                                        list.push(game.collectPack.equip[i]);
                                    }
                                }  else if (type=='神器') {
                                    if (game.collectPack.equip[i].unique) {
                                        list.push(game.collectPack.equip[i]);
                                    }
                                } 
                            }
                            while(list.length) {
                                showBoxcContentBody.appendChild(func(list.shift()));
                            }
                        };
                        var showBoxComps = {
                            showBoxTitles:(function(){
                                var showBoxTitles = ui.create.div('.taixuhuanjing_showBoxTitles');
                                showBoxTitles.nodes = {};
                                showBoxTitles.choosingNow = null;
                                function func(node){
                                    var div = ui.create.div('.taixuhuanjing_showBoxTitle');
                                    var divText = ui.create.div('.taixuhuanjing_showBoxTitleText',''+node,div);
                                    div.addEventListener("click",function(){
                                        game.txhj_playAudioCall('WinButton',null,true);
                                        this.choiced();
                                        event.cancelBubble = true;
                                        event.returnValue = false; 
                                        return false;
                                    });
                                    div.choiced = function(){
                                        if(showBoxTitles.choosingNow){
                                            showBoxTitles.choosingNow.noChoiced();
                                        }
                                        showBoxTitles.choosingNow = this;
                                        div.setBackgroundImage('extension/太虚幻境/image/icon/icon_Button18.png');
                                        showBoxcContent.update(node);
                                    };
                                    div.noChoiced = function(){
                                        showBoxTitles.choosingNow = null;
                                        div.setBackgroundImage('extension/太虚幻境/image/icon/icon_Button19.png');
                                    };
                                    if (node=='全部') {
                                        div.choiced();
                                    }
                                    return div;
                                };
                                var list = ['全部','武器','防具','宝物','神器'];
                                while(list.length){
                                    showBoxTitles.appendChild(func(list.shift()));
                                };
                                return showBoxTitles;
                            })(),
                        }
                        for(var i in showBoxComps){
                            showBox.appendChild(showBoxComps[i]);
                        }
                    } else if (type=='skill') {
                        var showBoxcContent2 = ui.create.div('.taixuhuanjing_showBoxcContent2',showBox);
                        var showBoxcContent2Body = ui.create.div('.taixuhuanjing_showBoxcContent2Body',showBoxcContent2);
                        showBoxcContent2Body.nodes = {};
                        showBoxcContent2Body.choosingNow = null;
                        lib.setScroll(showBoxcContent2Body);
                        showBoxcContent2.update = function (node) {
                            showBoxcContent2Body.innerHTML = '';
                            var showBoxcContent2Title = ui.create.div('.taixuhuanjing_showBoxcContent2Title',showBoxcContent2Body,'?????');
                            var showBoxcContent2Text = ui.create.div('.taixuhuanjing_showBoxcContent2Text',showBoxcContent2Body);
                            showBoxcContent2Text.nodes = {};
                            showBoxcContent2Text.choosingNow = null;
                            lib.setScroll(showBoxcContent2Text);
                            if(lib.config.txhj_collect.cards[node.id]) node.num=lib.config.txhj_collect.cards[node.id];
                            if (node.num>=node.min) {
                                showBoxcContent2Text.style['background-color'] = 'rgb(117 107 87)';
                                showBoxcContent2Title.innerHTML = lib.translate[node.id];
                                showBoxcContent2Title.setBackgroundImage('extension/太虚幻境/image/icon/icon_title'+node.rank+'.png');
                                var tab = ui.create.div('.taixuhuanjing_showBoxcContent2TitleTab',showBoxcContent2Title);
                                tab.setBackgroundImage('extension/太虚幻境/image/icon/icon_title'+node.rank+'tab.png');
                                showBoxcContent2Text.update = function (button) {
                                    showBoxcContent2Text.innerHTML = '';
                                    showBoxcContent2Text.click = null;
                                    var season = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv3','所属赛季',showBoxcContent2Text);
                                    var saijitra=lib.translate['txhj_'+node.sort]?lib.translate['txhj_'+node.sort]:'神秘时空';
                                    var seasonText = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv4',''+saijitra,showBoxcContent2Text);
                                    var intro = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv3','描述',showBoxcContent2Text);
                                    var introText = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv4',''+lib.translate[node.id+'_info'],showBoxcContent2Text);
                                    var info = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv3','引文',showBoxcContent2Text);
                                    var nodeinfo=node.info?node.info:['曾为某位名将的绝学，如今已被不少武将习得。','太虚幻境中流传已久的技能，据说多加练习能够强身健体。','据说这是某位世外高人在偶然的机遇下参悟出来的。','由于内容晦涩难懂，如今习得此技能的人已经越来越少了。','曾为某些门派的秘传，随着几代人的流传已变得广为人知。'].randomGet();
                                    var infoText = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv4',''+nodeinfo,showBoxcContent2Text);
                                };
                                showBoxcContent2Text.update();
                            } else {
                                if (node.min==1) {
                                    showBoxcContent2Text.innerHTML = '于幻境中获得一次才能解锁';
                                } else {
                                    showBoxcContent2Text.innerHTML = '于幻境中获得（'+node.num+'/'+node.min+'）次才能解锁';
                                }
                                showBoxcContent2Text.style["background"] = "none";
                            }
                        };
                        var showBoxcContent = ui.create.div('.taixuhuanjing_showBoxcContent',showBox);
                        var showBoxcContentBody = ui.create.div('.taixuhuanjing_showBoxcContentBody',showBoxcContent);
                        showBoxcContentBody.nodes = {};
                        showBoxcContentBody.choosingNow = null;
                        lib.setScroll(showBoxcContentBody);
                        showBoxcContent.update = function (type) {
                            showBoxcContentBody.innerHTML = '';
                            function func(node){
                                var div = ui.create.div('.taixuhuanjing_showBoxcContentDivSkill');
                                div.node = node;
                                var divImp = ui.create.div('.taixuhuanjing_showBoxcContentDivSkillImp',div);
                                var skillName1 = ui.create.div('.taixuhuanjing_showBoxcContent2TextDivSkillName1',lib.translate[node.id]+'',divImp);
                                var skillName2 = ui.create.div('.taixuhuanjing_showBoxcContent2TextDivSkillName2',lib.translate[node.id]+'',divImp);
                                if(lib.config.txhj_collect.cards[node.id]) node.num=lib.config.txhj_collect.cards[node.id];
                                if (node.num<node.min) {
                                    divImp.style.webkitFilter = "brightness(0.85) grayscale(1)";
                                }
                                div.listen(function(e){
                                    game.txhj_playAudioCall('WinButton',null,true);
                                    if(showBoxcContentBody.choosingNow){
                                        showBoxcContentBody.choosingNow.noChoiced();
                                    }
                                    this.choiced();
                                    showBoxcContent2.update(div.node);
                                    event.cancelBubble = true;
                                    event.returnValue = false; 
                                    return false;    
                                });
                                div.choiced = function(){
                                    showBoxcContentBody.choosingNow = this;
                                    div.style.boxShadow = '-1px 0px 1px rgba(255,255,0,0.75),0px -1px 1px rgba(255,255,0,0.75),1px 0px 1px rgba(255,255,0,0.75),0px 1px 5px rgba(255,255,0,0.75)';
                                };
                                div.noChoiced = function(){
                                    showBoxcContentBody.choosingNow = null;
                                    div.style.boxShadow = 'none';
                                };
                                return div;
                            };
                            var list = [];
                            for (var i = 0; i < game.collectPack.skill.length; i++) {
                                if(!lib.translate[game.collectPack.skill[i].id]) continue;
                                if (type=='全部') {
                                    list.push(game.collectPack.skill[i]);
                                }  else if (type=='普通') {
                                    if (game.collectPack.skill[i].rank==1) {
                                        list.push(game.collectPack.skill[i]);
                                    }
                                } else if (type=='精良') {
                                    if (game.collectPack.skill[i].rank==2) {
                                        list.push(game.collectPack.skill[i]);
                                    }
                                } else if (type=='精品') {
                                    if (game.collectPack.skill[i].rank==3) {
                                        list.push(game.collectPack.skill[i]);
                                    }
                                }  else if (type=='史诗') {
                                    if (game.collectPack.skill[i].rank==4) {
                                        list.push(game.collectPack.skill[i]);
                                    }
                                } 
                            }
                            while(list.length) {
                                showBoxcContentBody.appendChild(func(list.shift()));
                            }
                        };
                        var showBoxComps = {
                            showBoxTitles:(function(){
                                var showBoxTitles = ui.create.div('.taixuhuanjing_showBoxTitles');
                                showBoxTitles.nodes = {};
                                showBoxTitles.choosingNow = null;
                                function func(node){
                                    var div = ui.create.div('.taixuhuanjing_showBoxTitle');
                                    var divText = ui.create.div('.taixuhuanjing_showBoxTitleText',''+node,div);
                                    div.addEventListener("click",function(){
                                        game.txhj_playAudioCall('WinButton',null,true);
                                        this.choiced();
                                        event.cancelBubble = true;
                                        event.returnValue = false; 
                                        return false;
                                    });
                                    div.choiced = function(){
                                        if(showBoxTitles.choosingNow){
                                            showBoxTitles.choosingNow.noChoiced();
                                        }
                                        showBoxTitles.choosingNow = this;
                                        div.setBackgroundImage('extension/太虚幻境/image/icon/icon_Button18.png');
                                        showBoxcContent.update(node);
                                    };
                                    div.noChoiced = function(){
                                        showBoxTitles.choosingNow = null;
                                        div.setBackgroundImage('extension/太虚幻境/image/icon/icon_Button19.png');
                                    };
                                    if (node=='全部') {
                                        div.choiced();
                                    }
                                    return div;
                                };
                                var list = ['全部','普通','精良','精品','史诗'];
                                while(list.length){
                                    showBoxTitles.appendChild(func(list.shift()));
                                };
                                return showBoxTitles;
                            })(),
                        }
                        for(var i in showBoxComps){
                            showBox.appendChild(showBoxComps[i]);
                        }
                    } else if (type=='buff') {
                        var showBoxcContent2 = ui.create.div('.taixuhuanjing_showBoxcContent2',showBox);
                        var showBoxcContent2Body = ui.create.div('.taixuhuanjing_showBoxcContent2Body',showBoxcContent2);
                        showBoxcContent2Body.nodes = {};
                        showBoxcContent2Body.choosingNow = null;
                        lib.setScroll(showBoxcContent2Body);
                        showBoxcContent2.update = function (node) {
                            showBoxcContent2Body.innerHTML = '';
                            var showBoxcContent2Title = ui.create.div('.taixuhuanjing_showBoxcContent2Title',showBoxcContent2Body,'?????');
                            var showBoxcContent2Text = ui.create.div('.taixuhuanjing_showBoxcContent2Text',showBoxcContent2Body);
                            showBoxcContent2Text.nodes = {};
                            showBoxcContent2Text.choosingNow = null;
                            lib.setScroll(showBoxcContent2Text);
                            if(lib.config.txhj_collect.cards[node.id]) node.num=lib.config.txhj_collect.cards[node.id];
                            if (node.num>=node.min) {
                                showBoxcContent2Text.style['background-color'] = 'rgb(117 107 87)';
                                showBoxcContent2Title.innerHTML = game.buffPack[node.id].name;
                                showBoxcContent2Title.setBackgroundImage('extension/太虚幻境/image/icon/icon_title'+node.rank+'.png');
                                var tab = ui.create.div('.taixuhuanjing_showBoxcContent2TitleTab',showBoxcContent2Title);
                                tab.setBackgroundImage('extension/太虚幻境/image/icon/icon_title'+node.rank+'tab.png');
                                showBoxcContent2Text.update = function (button) {
                                    showBoxcContent2Text.innerHTML = '';
                                    showBoxcContent2Text.click = null;
                                    var season = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv3','所属赛季',showBoxcContent2Text);
                                    var saijitra=lib.translate['txhj_'+node.sort]?lib.translate['txhj_'+node.sort]:'神秘时空';
                                    var seasonText = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv4',''+saijitra,showBoxcContent2Text);
                                    var intro = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv3','描述',showBoxcContent2Text);
                                    var introText = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv4',''+game.buffPack[node.id].info,showBoxcContent2Text);
                                    var info = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv3','引文',showBoxcContent2Text);
                                    var nodeinfo=node.info?node.info:['曾经的名将遗留下来的祝福，飘荡在太虚幻境的各个角落里。','相传由天地灵气聚集而生，也有说法是一些前人的执念。','携带着强烈的意愿，似乎是为了完成当年的某些诺言。','没人知道它的来历，似乎从太虚幻境诞生之初就已经存在了。'].randomGet();
                                    var infoText = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv4',''+nodeinfo,showBoxcContent2Text);
                                };
                                showBoxcContent2Text.update();
                            } else {
                                if (node.min==1) {
                                    showBoxcContent2Text.innerHTML = '于幻境中获得一次才能解锁';
                                } else {
                                    showBoxcContent2Text.innerHTML = '于幻境中获得（'+node.num+'/'+node.min+'）次才能解锁';
                                }
                                showBoxcContent2Text.style["background"] = "none";
                            }
                        };
                        var showBoxcContent = ui.create.div('.taixuhuanjing_showBoxcContent',showBox);
                        var showBoxcContentBody = ui.create.div('.taixuhuanjing_showBoxcContentBody',showBoxcContent);
                        showBoxcContentBody.nodes = {};
                        showBoxcContentBody.choosingNow = null;
                        lib.setScroll(showBoxcContentBody);
                        showBoxcContent.update = function (type) {
                            showBoxcContentBody.innerHTML = '';
                            function func(node){
                                var div = ui.create.div('.taixuhuanjing_showBoxcContentDivBuff');
                                div.node = node;
                                var divImp = ui.create.div('.taixuhuanjing_showBoxcContentDivBuffImp',div);
                                divImp.setBackgroundImage('extension/太虚幻境/image/buff/'+node.id+'.png');
                                window.txhjBuffIcon(divImp);
                                if(lib.config.txhj_collect.cards[node.id]) node.num=lib.config.txhj_collect.cards[node.id];
                                if (node.num<node.min) {
                                    divImp.style.webkitFilter = "brightness(0.85) grayscale(1)";
                                }
                                div.listen(function(e){
                                    game.txhj_playAudioCall('WinButton',null,true);
                                    if(showBoxcContentBody.choosingNow){
                                        showBoxcContentBody.choosingNow.noChoiced();
                                    }
                                    this.choiced();
                                    showBoxcContent2.update(div.node);
                                    event.cancelBubble = true;
                                    event.returnValue = false; 
                                    return false;    
                                });
                                div.choiced = function(){
                                    showBoxcContentBody.choosingNow = this;
                                    div.style.boxShadow = '-1px 0px 1px rgba(255,255,0,0.75),0px -1px 1px rgba(255,255,0,0.75),1px 0px 1px rgba(255,255,0,0.75),0px 1px 5px rgba(255,255,0,0.75)';
                                };
                                div.noChoiced = function(){
                                    showBoxcContentBody.choosingNow = null;
                                    div.style.boxShadow = 'none';
                                };
                                return div;
                            };
                            var list = [];
                            for (var i = 0; i < game.collectPack.buff.length; i++) {
                                if (type=='全部') {
                                    list.push(game.collectPack.buff[i]);
                                }  else if (type=='普通') {
                                    if (game.collectPack.buff[i].rank==1) {
                                        list.push(game.collectPack.buff[i]);
                                    }
                                } else if (type=='精良') {
                                    if (game.collectPack.buff[i].rank==2) {
                                        list.push(game.collectPack.buff[i]);
                                    }
                                } else if (type=='精品') {
                                    if (game.collectPack.buff[i].rank==3) {
                                        list.push(game.collectPack.buff[i]);
                                    }
                                }  else if (type=='史诗') {
                                    if (game.collectPack.buff[i].rank==4) {
                                        list.push(game.collectPack.buff[i]);
                                    }
                                } 
                            }
                            while(list.length) {
                                showBoxcContentBody.appendChild(func(list.shift()));
                            }
                        };
                        var showBoxComps = {
                            showBoxTitles:(function(){
                                var showBoxTitles = ui.create.div('.taixuhuanjing_showBoxTitles');
                                showBoxTitles.nodes = {};
                                showBoxTitles.choosingNow = null;
                                function func(node){
                                    var div = ui.create.div('.taixuhuanjing_showBoxTitle');
                                    var divText = ui.create.div('.taixuhuanjing_showBoxTitleText',''+node,div);
                                    div.addEventListener("click",function(){
                                        game.txhj_playAudioCall('WinButton',null,true);
                                        this.choiced();
                                        event.cancelBubble = true;
                                        event.returnValue = false; 
                                        return false;
                                    });
                                    div.choiced = function(){
                                        if(showBoxTitles.choosingNow){
                                            showBoxTitles.choosingNow.noChoiced();
                                        }
                                        showBoxTitles.choosingNow = this;
                                        div.setBackgroundImage('extension/太虚幻境/image/icon/icon_Button18.png');
                                        showBoxcContent.update(node);
                                    };
                                    div.noChoiced = function(){
                                        showBoxTitles.choosingNow = null;
                                        div.setBackgroundImage('extension/太虚幻境/image/icon/icon_Button19.png');
                                    };
                                    if (node=='全部') {
                                        div.choiced();
                                    }
                                    return div;
                                };
                                var list = ['全部','普通','精良','精品','史诗'];
                                while(list.length){
                                    showBoxTitles.appendChild(func(list.shift()));
                                };
                                return showBoxTitles;
                            })(),
                        }
                        for(var i in showBoxComps){
                            showBox.appendChild(showBoxComps[i]);
                        }
                    } else if (type=='character') {
                        var showBoxcContent2 = ui.create.div('.taixuhuanjing_showBoxcContent2',showBox);
                        var showBoxcContent2Body = ui.create.div('.taixuhuanjing_showBoxcContent2Body',showBoxcContent2);
                        showBoxcContent2Body.nodes = {};
                        showBoxcContent2Body.choosingNow = null;
                        lib.setScroll(showBoxcContent2Body);
                        showBoxcContent2.update = function (name) {
                            showBoxcContent2Body.innerHTML = '';
                            var showBoxcContent2Title = ui.create.div('.taixuhuanjing_showBoxcContent2Title',showBoxcContent2Body,'?????');
                            var showBoxcContent2Text = ui.create.div('.taixuhuanjing_showBoxcContent2Text',showBoxcContent2Body);
                            showBoxcContent2Text.nodes = {};
                            showBoxcContent2Text.choosingNow = null;
                            lib.setScroll(showBoxcContent2Text);
                            //if(lib.config.txhj_collect.cards[node.id]) node.num=lib.config.txhj_collect.cards[node.id];
                            //game.collectPack.character[name].num=10;
                            if(lib.config['txhj_collect'].character[name]) game.collectPack.character[name].num=lib.config['txhj_collect'].character[name];
                            if (game.collectPack.character[name]&&game.collectPack.character[name].num>=game.collectPack.character[name].min) {
                                showBoxcContent2Text.style['background-color'] = 'rgb(117 107 87)';
                                var showBoxcContent2Group = ui.create.div('.taixuhuanjing_showBoxcContent2Group',showBoxcContent2Body);
                                var getGroup=function(name){
                                    var group=get.is.double(name,true);
                                    if(group) return group[0];
                                    return lib.character[name][1];
                                }
                                showBoxcContent2Group.style["background-image"] = "url("+lib.assetURL+"extension/十周年UI/image/decoration/name_"+getGroup(name)+".png)";
                                showBoxcContent2Title.innerHTML = lib.translate[name];
                                //var showBoxcContent2Season = ui.create.div('.taixuhuanjing_showBoxcContent2Season',showBoxcContent2Text,''+lib.translate['txhj_'+sort]);
                                showBoxcContent2Text.update = function (button) {
                                    showBoxcContent2Text.innerHTML = '';
                                    showBoxcContent2Text.click = null;
                                    if (button=='技能') {
                                        var div2 = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv2');
                                        function func(skill){
                                            var div = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv');
                                            var skillName1 = ui.create.div('.taixuhuanjing_showBoxcContent2TextDivName1',lib.translate[skill]+'',div);
                                            var skillName2 = ui.create.div('.taixuhuanjing_showBoxcContent2TextDivName2',lib.translate[skill]+'',div);
                                            div.addEventListener("click",function(){
                                                game.txhj_playAudioCall('WinButton',null,true);
                                                game.txhj_TrySkillAudio(skill,{name:name},null,[1,2].randomGet());
                                                div.choiced();
                                                event.cancelBubble = true;
                                                event.returnValue = false; 
                                                return false;
                                            });
                                            div.choiced = function(){
                                                if(showBoxcContent2Text.choosingNow){
                                                    showBoxcContent2Text.choosingNow.noChoiced();
                                                }
                                                showBoxcContent2Text.choosingNow = this;
                                                div.setBackgroundImage('extension/太虚幻境/image/icon/tnode-active.png');
                                                div2.innerHTML = "<p style='margin: 1%;'>" + lib.translate[skill+'_info'] + "</p>";
                                            };
                                            div.noChoiced = function(){
                                                showBoxcContent2Text.choosingNow = null;
                                                div.style.backgroundImage = 'none';
                                            };
                                            if (showBoxcContent2Text.click == null) {
                                                showBoxcContent2Text.click = skill;
                                                div.choiced();
                                            }
                                            return div;
                                        };
                                        var skills = get.character(name,3).slice(0).filter(function(current){
                                            return lib.translate[current]&&lib.translate[current+'_info'];
                                        });
                                        while(skills.length){
                                            showBoxcContent2Text.appendChild(func(skills.shift()));
                                        };
                                        showBoxcContent2Text.appendChild(div2);
                                    } else {
                                        var season = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv3','所属赛季',showBoxcContent2Text);
                                        var saijitra=lib.translate['txhj_'+game.collectPack.character[name].sort]?lib.translate['txhj_'+game.collectPack.character[name].sort]:'神秘时空';
                                        var seasonText = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv4',''+saijitra,showBoxcContent2Text);
                                        var intro = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv3','描述',showBoxcContent2Text);
                                        var introText = ui.create.div('.taixuhuanjing_showBoxcContent2TextDiv4',''+game.collectPack.character[name].intro,showBoxcContent2Text);
                                    }
                                };
                                var showBoxcContent2Button1 = ui.create.div('.taixuhuanjing_showBoxcContent2Button1','技能',showBoxcContent2Body);
                                var showBoxcContent2Button2 = ui.create.div('.taixuhuanjing_showBoxcContent2Button2','背景',showBoxcContent2Body);
                                showBoxcContent2Button1.listen(function(e){
                                    game.txhj_playAudioCall('WinButton',null,true);
                                    showBoxcContent2Text.update('技能');
                                    showBoxcContent2Button1.style.backgroundColor = 'rgb(56 40 5 / 50%)';
                                    showBoxcContent2Button2.style.backgroundColor = 'rgb(165 154 132 / 72%)';
                                    event.cancelBubble = true;
                                    event.returnValue = false; 
                                    return false;    
                                });
                                showBoxcContent2Button2.listen(function(e){
                                    game.txhj_playAudioCall('WinButton',null,true);
                                    showBoxcContent2Text.update('背景');
                                    showBoxcContent2Button2.style.backgroundColor = 'rgb(56 40 5 / 50%)';
                                    showBoxcContent2Button1.style.backgroundColor = 'rgb(165 154 132 / 72%)';
                                    event.cancelBubble = true;
                                    event.returnValue = false; 
                                    return false;    
                                });
                                //showBoxcContent2Button1.click();
                                //前面这个失灵了，直接复制一份生效代码顶用
                                    game.txhj_playAudioCall('WinButton',null,true);
                                    showBoxcContent2Text.update('技能');
                                    showBoxcContent2Button1.style.backgroundColor = 'rgb(56 40 5 / 50%)';
                                    showBoxcContent2Button2.style.backgroundColor = 'rgb(165 154 132 / 72%)';
                                    event.cancelBubble = true;
                                    event.returnValue = false; 
                            } else {
                                if (game.collectPack.character[name].min==1) {
                                    showBoxcContent2Text.innerHTML = '于幻境中遇到一次才能解锁';
                                } else {
                                    showBoxcContent2Text.innerHTML = '于幻境中遇到（'+game.collectPack.character[name].num+'/'+game.collectPack.character[name].min+'）次才能解锁';
                                }
                                showBoxcContent2Text.style["background"] = "none";
                            }
                        };
                        var showBoxcContent = ui.create.div('.taixuhuanjing_showBoxcContent',showBox);
                        var showBoxcContentBody = ui.create.div('.taixuhuanjing_showBoxcContentBody',showBoxcContent);
                        showBoxcContentBody.nodes = {};
                        showBoxcContentBody.choosingNow = null;
                        lib.setScroll(showBoxcContentBody);
                        showBoxcContent.update = function (type) {
                            showBoxcContentBody.innerHTML = '';
                            function func(name){
                                var div = ui.create.div('.taixuhuanjing_showBoxcContentDiv');
                                var divImp = ui.create.div('.taixuhuanjing_showBoxcContentDivImp',div);
                                divImp.setBackgroundImage("extension/太虚幻境/image/yuanhua/" + name + ".jpg");
                                if(lib.config['txhj_collect'].character[name]) game.collectPack.character[name].num=lib.config['txhj_collect'].character[name];
                                if (game.collectPack.character[name]&&game.collectPack.character[name].num<game.collectPack.character[name].min) {
                                    divImp.style.webkitFilter = "brightness(0.85) grayscale(1)";
                                }
                                div.listen(function(e){
                                    game.txhj_playAudioCall('WinButton',null,true);
                                    if(showBoxcContentBody.choosingNow){
                                        showBoxcContentBody.choosingNow.noChoiced();
                                    }
                                    this.choiced();
                                    showBoxcContent2.update(name);
                                    event.cancelBubble = true;
                                    event.returnValue = false; 
                                    return false;    
                                });
                                div.choiced = function(){
                                    showBoxcContentBody.choosingNow = this;
                                    div.style.boxShadow = '-1px 0px 1px rgba(255,255,0,0.75),0px -1px 1px rgba(255,255,0,0.75),1px 0px 1px rgba(255,255,0,0.75),0px 1px 5px rgba(255,255,0,0.75)';
                                };
                                div.noChoiced = function(){
                                    showBoxcContentBody.choosingNow = null;
                                    div.style.boxShadow = 'none';
                                };
                                return div;
                            };
                            var list = [];
                            for(var i in game.collectPack.character){
                                if (type=='全部') {
                                    list.push(i);
                                } else if (type=='普通') {
                                    if (game.collectPack.character[i].type=='common') {
                                        list.push(i);
                                    } else if (Array.isArray(game.collectPack.character[i].type)&&game.collectPack.character[i].type.contains('common')) {
                                        list.push(i);
                                    }
                                } else if (type=='精英') {
                                    if (game.collectPack.character[i].type=='elite') {
                                        list.push(i);
                                    } else if (Array.isArray(game.collectPack.character[i].type)&&game.collectPack.character[i].type.contains('elite')) {
                                        list.push(i);
                                    }
                                } else if (type=='领主') {
                                    if (game.collectPack.character[i].type=='ultimate'){
                                        list.push(i);
                                    } else if (Array.isArray(game.collectPack.character[i].type)&&game.collectPack.character[i].type.contains('ultimate')) {
                                        list.push(i);
                                    }
                                } else if (type=='盟友') {
                                    if (game.collectPack.character[i].type=='friend') {
                                        list.push(i);
                                    } else if (Array.isArray(game.collectPack.character[i].type)&&game.collectPack.character[i].type.contains('friend')) {
                                        list.push(i);
                                    }
                                }
                            }
                            while(list.length) {
                                showBoxcContentBody.appendChild(func(list.shift()));
                            }
                        };
                        var showBoxComps = {
                            showBoxTitles:(function(){
                                var showBoxTitles = ui.create.div('.taixuhuanjing_showBoxTitles');
                                showBoxTitles.nodes = {};
                                showBoxTitles.choosingNow = null;
                                function func(node){
                                    var div = ui.create.div('.taixuhuanjing_showBoxTitle');
                                    var divText = ui.create.div('.taixuhuanjing_showBoxTitleText',''+node,div);
                                    div.addEventListener("click",function(){
                                        game.txhj_playAudioCall('WinButton',null,true);
                                        this.choiced();
                                        event.cancelBubble = true;
                                        event.returnValue = false; 
                                        return false;
                                    });
                                    div.choiced = function(){
                                        if(showBoxTitles.choosingNow){
                                            showBoxTitles.choosingNow.noChoiced();
                                        }
                                        showBoxTitles.choosingNow = this;
                                        div.setBackgroundImage('extension/太虚幻境/image/icon/icon_Button18.png');
                                        showBoxcContent.update(node);
                                    };
                                    div.noChoiced = function(){
                                        showBoxTitles.choosingNow = null;
                                        div.setBackgroundImage('extension/太虚幻境/image/icon/icon_Button19.png');
                                    };
                                    if (node=='全部') {
                                        div.choiced();
                                    }
                                    return div;
                                };
                                var list = ['全部','普通','精英','领主','盟友'];
                                while(list.length){
                                    showBoxTitles.appendChild(func(list.shift()));
                                };
                                return showBoxTitles;
                            })(),
                        }
                        for(var i in showBoxComps){
                            showBox.appendChild(showBoxComps[i]);
                        }
                    } else if (type=='season') {
                        var showBoxcContent = ui.create.div('.taixuhuanjing_showBoxcContent3',showBox);
                        var showBoxcContent2 = ui.create.div('.taixuhuanjing_showBoxcContent3',showBox);
                        showBoxcContent2.setBackgroundImage('extension/太虚幻境/image/background/frame18.png');
                        showBoxcContent2.style.display = 'none';
                        showBoxcContent.update = function (type) {
                            showBoxcContent.innerHTML = '';
                            function func(name){
                                var div = ui.create.div('.taixuhuanjing_showBoxcContentDivSeason');
                                var divImp1 = ui.create.div('.taixuhuanjing_showBoxcContentDivSeasonImp1',div);
                                divImp1.setBackgroundImage('extension/太虚幻境/dlc/'+name+'/rogue_bg.png');
                                var divImp2 = ui.create.div('.taixuhuanjing_showBoxcContentDivSeasonImp2',div);

                                var num = 0;
                                var max = 0;
                                var nodes = ['card','equip','skill','buff'];
                                /*while(nodes.length) {
                                    var node = nodes.shift();
                                    for (var i = 0; i < game.collectPack[node].length; i++) {
                                        if (game.collectPack[node][i].sort==name) {
                                            max++;
                                            if(lib.config.txhj_collect.cards[game.collectPack[node][i].id]) game.collectPack[node][i].num=lib.config.txhj_collect.cards[game.collectPack[node][i].id];
                                            if (game.collectPack[node][i].num>=game.collectPack[node][i].min) {
                                                num++;
                                            }
                                        }
                                    }
                                }
                                for(var i in game.collectPack.character){
                                    if (game.collectPack.character[i].sort==name) {
                                        max++;
                                        if (false&&game.collectPack.character[i].num>=game.collectPack.character[i].min) {
                                            num++;
                                        }
                                    }
                                }*/
                                //这里改成赛季难度的解锁进度
                                max=5;
                                num=0;
                                if(lib.config.taixuhuanjingNode&&lib.config.taixuhuanjingNode[name]&&lib.config.taixuhuanjingNode[name].rank) {
                                    num=lib.config.taixuhuanjingNode[name].rank-1;
                                    /*var hasRec=false;
                                    if(lib.config.taixuhuanjingNode[name].reach) {
                                        for(var r in lib.config.taixuhuanjingNode[name].reach) {
                                            hasRec=true;
                                            //var newnum=lib.config.taixuhuanjingNode[name].reach[r];
                                            //if(newnum>num) num=newnum;
                                        }
                                    }
                                    if(hasRec) num=lib.config.taixuhuanjingNode[name].rank;*/
                                }
                                if(num<5&&lib.config['txhj_collect'][name]&&lib.config['txhj_collect'][name].chapter&&lib.config['txhj_collect'][name].maxchap) {
                                    num+=Math.max(lib.config['txhj_collect'][name].chapter-1,0)/lib.config['txhj_collect'][name].maxchap;
                                }
                                //num=lib.config.taixuhuanjingNode[name]?lib.config.taixuhuanjingNode[name].rank:0;
                                var speedBox = ui.create.div('.taixuhuanjing_showBoxcContentDivSeasonSpeedBox',div);
                                var speedColor = ui.create.div('.taixuhuanjing_showBoxcContentDivSeasonSpeedColor',speedBox);
                                var winrate = Math.round(num/max*10000)/100;
                                if (winrate<0) winrate = 0;
                                if (!winrate) winrate=0;
                                if (winrate>100) winrate = 100;
                                var winrate2 = winrate;
                                if (winrate<5) {
                                    winrate2 = 5
                                }
                                speedColor.style.width = ""+winrate2+"%";
                                var divText = ui.create.div('.taixuhuanjing_showBoxcContentDivSeasonText',div);
                                divText.innerHTML = lib.translate['txhj_'+name]+': '+winrate+'%';

                                div.listen(function(e){
                                    game.txhj_playAudioCall('WinButton',null,true);
                                    showBoxcContent2.innerHTML = '';
                                    showBoxcContent2.style.display = 'block';
                                    var cloneNode = ui.create.div('.taixuhuanjing_showBoxcContentDivSeason2',showBoxcContent2);
                                    var cloneNodeImp1 = ui.create.div('.taixuhuanjing_showBoxcContentDivSeasonImp3',cloneNode);
                                    cloneNodeImp1.setBackgroundImage('extension/太虚幻境/dlc/'+name+'/rogue_bg.png');
                                    var cloneNodeImp2 = ui.create.div('.taixuhuanjing_showBoxcContentDivSeasonImp4',cloneNode);
                                    var speedBox2 = ui.create.div('.taixuhuanjing_showBoxcContentDivSeasonSpeedBox2',cloneNode);
                                    var speedColor2 = ui.create.div('.taixuhuanjing_showBoxcContentDivSeasonSpeedColor2',speedBox2);
                                    speedColor2.style.width = ""+winrate2+"%";
                                    var divText2 = ui.create.div('.taixuhuanjing_showBoxcContentDivSeasonText2',cloneNode);
                                    divText2.innerHTML = lib.translate['txhj_'+name]+': '+winrate+'%';
                                    var divText3 = ui.create.div('.taixuhuanjing_showBoxcContentDivSeasonText3',''+game.seasonPack[name].info.randomGet(),showBoxcContent2);
                                    var nodesBox = ui.create.div('.taixuhuanjing_showBoxcContentDivSeason2NodesBox',showBoxcContent2);
                                    function func2(name2){
                                        var div2 = ui.create.div('.taixuhuanjing_showBoxcContentDivSeason2Node');
                                        div2.setBackgroundImage('extension/太虚幻境/image/icon/icon_type_'+name2+'.png');
                                        var num2 = 0;
                                        var max2 = 0;
                                        if (name2!='character') {
                                            var list2 = game.collectPack[name2].slice(0);
                                            for (var i = 0; i < list2.length; i++) {
                                                if (list2[i].sort==name) {
                                                    max2++;
                                                    if (list2[i].num>=list2[i].min) {
                                                        num2++;
                                                    }
                                                }
                                            }
                                        } else {
                                            for(var i in game.collectPack.character){
                                                if (game.collectPack.character[i].sort==name){
                                                    max2++;
                                                    if (game.collectPack.character[i].num>=game.collectPack.character.min) {
                                                        num2++;
                                                    }
                                                }
                                            }
                                        }
                                        var speedBox3 = ui.create.div('.taixuhuanjing_collectShowBoxAllDivSpeedBox',div2);
                                        var speedColor3 = ui.create.div('.taixuhuanjing_collectShowBoxAllDivSpeedColor',speedBox3);
                                        var winrate2 = Math.round(num2/max2*10000)/100;
                                        if (winrate2<5) winrate2 = 5;
                                        winrate2 = winrate2 + -100;
                                        speedColor3.style.left = ""+winrate2+"%";
                                        var divText2 = ui.create.div('.taixuhuanjing_collectShowBoxAllDivText',div2);
                                        divText2.style.fontSize = '1.2vw';
                                        divText2.innerHTML = '进度: '+num2+'/'+max2;
                                        return div2;
                                    };
                                    var nodes = ['card','equip','skill','buff','character'];
                                    while(nodes.length) {
                                        nodesBox.appendChild(func2(nodes.shift()));
                                    }
                                    var button = ui.create.div('.taixuhuanjing_showBoxcContentDivSeason2button',showBoxcContent2);
                                    button.listen(function(e){
                                        game.txhj_playAudioCall('WinButton',null,true);
                                        showBoxcContent2.innerHTML = '';
                                        showBoxcContent2.style.display = 'none';
                                        event.cancelBubble = true;
                                        event.returnValue = false; 
                                        return false;  
                                    });
                                    event.cancelBubble = true;
                                    event.returnValue = false; 
                                    return false;    
                                });
                                return div;
                            };
                            if(!lib.config['txhj_collect']||!lib.config['txhj_collect'].seaslist||!lib.config['txhj_collect'].seaslist.length) {
                                var list = [/*'ChongYingChuLin',*/'HuangTianZhiNu','HeJinZhuHuan','HaiWaiFenghe','GFHuangJinZhiLuan',/*'LiGuoZhiLuan',*/'GFQiQinMengHuo','MGBaWangZhengCheng'];
                            }else {
                                var list = [].concat(lib.config['txhj_collect'].seaslist);
                                var list2 = ['HuangTianZhiNu','HeJinZhuHuan','HaiWaiFenghe','GFHuangJinZhiLuan','GFQiQinMengHuo','MGBaWangZhengCheng','ChongYingChuLin','LiGuoZhiLuan'];
                                for(var i=0;i<list2.length&&list.length<6;i++) {
                                    if(!list.contains(list2[i])) list.push(list2[i]);
                                }
                            }
                            while(list.length) {
                                showBoxcContent.appendChild(func(list.shift()));
                                
                            }
                        };
                        showBoxcContent.update();
                    }
                };
                showBox.update('all');
                return showBox;
            })(),
            typeBox:(function(){
                var typeBox = ui.create.div('.taixuhuanjing_collectTypeBox');
                typeBox.nodes = {};
                typeBox.choosingNow = null;
                function func(node){
                    var div;
                    if (node.type=='season') {
                        div = ui.create.div('.taixuhuanjing_collectTypeDiv2');
                    } else {
                        div = ui.create.div('.taixuhuanjing_collectTypeDiv');
                    }
                    div.node = node;
                    var divText = ui.create.div('.taixuhuanjing_collectTypeDivText',''+div.node.info,div);
                    div.addEventListener("click",function(){
                        game.txhj_playAudioCall('WinButton',null,true);
                        this.choiced();
                        event.cancelBubble = true;
                        event.returnValue = false; 
                        return false;
                    });
                    div.choiced = function(){
                        if(typeBox.choosingNow){
                            typeBox.choosingNow.noChoiced();
                        }
                        typeBox.choosingNow = this;
                        if (div.node.type=='season') {
                            div.setBackgroundImage('extension/太虚幻境/image/icon/icon_Button16.png');
                        } else {
                            div.setBackgroundImage('extension/太虚幻境/image/icon/icon_Button2.png');
                        }
                        if (comps&&comps.showBox) {
                            comps.showBox.update(div.node.type);
                        }
                    };
                    div.noChoiced = function(){
                        typeBox.choosingNow = null;
                        if (div.node.type=='season') {
                            div.setBackgroundImage('extension/太虚幻境/image/icon/icon_Button17.png');
                        } else {
                            div.setBackgroundImage('extension/太虚幻境/image/icon/icon_Button1.png');
                        }
                    };
                    if (div.node.type=='all') {
                        div.choiced();
                    }
                    return div;
                };
                var list = [{type:'all',info:'总览'},{type:'card',info:'卡牌'},{type:'equip',info:'装备'},{type:'skill',info:'技能'},{type:'buff',info:'祝福'},{type:'character',info:'角色'},{type:'season',info:'赛季'}];
                while(list.length){
                    typeBox.appendChild(func(list.shift()));
                };
                return typeBox;
            })(),
        };
        for(var i in comps){
            homeBody.appendChild(comps[i]);
        }
        var button = ui.create.div('.taixuhuanjing_collectHomeButton',home);
        button.addEventListener("click",function(){
            if(ui.roundmenu) {//菜单显示大法
                //ui.roundmenu.style.opacity=1;
                ui.roundmenu.style.visibility='visible';
            }
            game.txhj_playAudioCall('off',null,true);
            home.delete();
            lib.onresize.remove(recollectsize);
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
        home.addEventListener("click",function(){
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
    };
    game.taixuhuanjingHome = function(){
        var home = ui.create.div('.taixuhuanjing_Home');
        document.body.appendChild(home);
        window.taixuhomeshow=function(num,sum){
            home.style.opacity=num/sum;
            if(sum>num){
                setTimeout(function(){
                    window.taixuhomeshow(num+1,sum);
                },10);
            }else {
                home.style.opacity=1;
            }
        }
        var offline=sessionStorage.getItem('Network');
		if(!offline) offline='offline';
        if(offline!='offline') window.taixuhomeshow(0,10);

        var zoom = 1;
        if (window.dui) {
            if (dui.isMobile()) {
                zoom = 0.9;
            } else {
                zoom = 1.5;
            }
            dui.effect.gameStart = function () {
                if (lib.config.extension_十周年UI_newDecadeStyle == 'on') {
                    game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start.mp3');
                    var animation = decadeUI.animation;
                    var bounds = animation.getSpineBounds('effect_youxikaishi');
                    if (bounds == null) return;
                    var sz = bounds.size;
                    var scale = Math.min(animation.canvas.width / sz.x, animation.canvas.height / sz.y) * 0.76;
                    if (dcdAnim.dprAdaptive) scale /= 1.5
                        animation.playSpine({
                            name: 'effect_youxikaishi',
                            scale: scale
                        });
                } else {
                    game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
                    var animation = decadeUI.animation;
                    var bounds = animation.getSpineBounds('effect_youxikaishi_shousha');
                    if (bounds == null) return;
                    var sz = bounds.size;
                    var scale = Math.min(animation.canvas.width / sz.x, animation.canvas.height / sz.y) * 0.8;
                    if (dcdAnim.dprAdaptive) scale /= 1.5
                        animation.playSpine({
                            name: 'effect_youxikaishi_shousha',
                            scale: scale
                        });
                }
            };
            dui.effect.skill = function(player, skillName, vice){
                if (get.itemtype(player) != 'player') return console.error('player');

                var animation = decadeUI.animation;
                var asset = animation.spine.assets['effect_xianding'];
                if (!asset) return console.error('[effect_xianding]特效未加载');
                if (!asset.ready) animation.prepSpine('effect_xianding');

                var camp = player.group;
                var playerName, playerAvatar;
                if (vice === 'vice') {
                    playerName = get.translation(player.name2);
                    let temp = ui.create.div(".dialogAvatar",ui.arena);
                    temp.setBackground(player.name2,"character");
                    temp.style.backgroundSize = "100%";
                    playerAvatar = temp;
                } else {
                    playerName = get.translation(player.name);
                    let temp = ui.create.div(".dialogAvatar",ui.arena);
                    temp.setBackground(player.name,"character");
                    temp.style.backgroundSize = "100%";
                    playerAvatar = temp;
                }

                var url = getComputedStyle(playerAvatar).backgroundImage;
                var image = new Image();
                var bgImage = new Image();

                image.onload = function () {
                    bgImage.onload = function () {
                        var animation = decadeUI.animation;
                        var sprite = animation.playSpine('effect_xianding');
                        var skeleton = sprite.skeleton;
                        var slot = skeleton.findSlot('shilidipan');
                        var attachment = slot.getAttachment();
                        var region;

                        if (attachment.camp !== camp) {
                            if (!attachment.cached) attachment.cached = {};

                            if (!attachment.cached[camp]) {
                                region = animation.createTextureRegion(bgImage);
                                attachment.cached[camp] = region;
                            } else {
                                region = attachment.cached[camp];
                            }

                            attachment.width = region.width;
                            attachment.height = region.height;
                            attachment.setRegion(region);
                            attachment.updateOffset();
                            attachment.camp = camp;
                        }

                        slot = skeleton.findSlot('wujiang');
                        attachment = slot.getAttachment();
                        region = animation.createTextureRegion(image);

                        var scale = Math.min(288 / region.width, 378 / region.height);
                        attachment.width = region.width * scale;
                        attachment.height = region.height * scale;
                        attachment.setRegion(region);
                        attachment.updateOffset();

                        var size = skeleton.bounds.size;
                        sprite.scale = Math.max(animation.canvas.width / size.x, animation.canvas.height / size.y);
                        if (dcdAnim.dprAdaptive) sprite.scale /= 1.5;
                        var effect = decadeUI.element.create('effect-window');
                        effect.view.skillName = decadeUI.element.create('skill-name', effect);
                        effect.view.skillName.innerHTML = skillName;
                        effect.view.skillName.style.top = 'calc(50% + ' + 135 * sprite.scale + 'px)';

                        animation.canvas.parentNode.insertBefore(effect, animation.canvas.nextSibling);
                        effect.removeSelf(2180);
                    };

                    bgImage.onerror = function () {
                        bgImage.onerror = void 0;
                        bgImage.src = decadeUIPath + 'assets/image/bg_xianding_qun.png';
                    };

                    bgImage.src = decadeUIPath + 'assets/image/bg_xianding_' + camp + '.png';
                };

                image.src = url.replace(/url\(|\)|'|"/ig, '');
            }
        } else {
            txhj.isMobile = navigator.userAgent.match(/(Android|iPhone|SymbianOS|Windows Phone|iPad|iPod)/i);
            if (txhj.isMobile) {
                //zoom = 0.9;
                zoom = 1;
            } else {
                zoom = 1.5;
            }
        }
        //game.documentZoom=game.deviceZoom*zoom;
        ui.updatez();

        var homeBody = ui.create.div('.taixuhuanjing_HomeBody',home);
        var setTaiXuHomeSize = function(){
            var screenWidth = ui.window.offsetWidth;
            var screenHeight = ui.window.offsetHeight;
            var whr = 2.05;
            var width;
            var height;
            if(screenWidth / whr > screenHeight){
                height = screenHeight;
                width = height * whr;
            }else{
                width = screenWidth;
                height = screenWidth/whr;
            }
            homeBody.style.height = Math.round(height)+"px";
            homeBody.style.width = Math.round(width)+"px";
            homeBody.style.transform = 'translate(-50%,-50%) scale(0.9)';
        };
        setTaiXuHomeSize();
        var reTaiXuHomesize = function(){
            setTimeout(setTaiXuHomeSize,500);
        };
        lib.onresize.push(reTaiXuHomesize);
        var body = ui.create.div('.taixuhuanjing_HomeBodyBackground1',homeBody);
        var season = lib.config.taixuhuanjing.season;
        body.setBackgroundImage('extension/太虚幻境/dlc/'+season+'/bg_'+season+'.png');
        /*var rankBody = ui.create.div('.taixuhuanjing_HomeBodyRankBody',body);
        lib.setScroll(rankBody);
        rankBody.update = function (){
            rankBody.innerHTML = '';
            var list = [1,2,3,4,5];
            function func(num){
                var div = ui.create.div('.taixuhuanjing_HomeBodyRankDiv');
                div.setBackgroundImage('extension/太虚幻境/image/icon/icon_Rank_'+num+'.png');
                div.style.webkitFilter = "grayscale(1)";
                div.listen(function(e){
                    game.txhj_playAudioCall('WinButton',null,true);
                    if ((num!=1&&lib.config.taixuhuanjingNode[lib.config.taixuhuanjing.season]==undefined)||(num!=1&&lib.config.taixuhuanjingNode[lib.config.taixuhuanjing.season]&&lib.config.taixuhuanjingNode[lib.config.taixuhuanjing.season].rank<num)) {
                        game.messagePopup('请先完成前面的挑战');
                        return;
                    }
                    if (lib.config.taixuhuanjing.name!=null) {
                        var src = "是否删除当前挑战的进度?";
                        var d = confirm(src);
                        if (d==true){
                            game.updateModeData();
                            home.replacePlayer();
                            rankBody.update();
                        }
                        return;
                    };
                    lib.config.taixuhuanjing.rank = num;
                    var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                    this.choiced();
                    event.cancelBubble = true;
                    event.returnValue = false; 
                    return false;
                });
                div.choiced = function(){
                    if(rankBody.choosingNow){
                        rankBody.choosingNow.noChoiced();
                    }
                    rankBody.choosingNow = this;
                    div.style.webkitFilter = "grayscale(0)";
                };
                div.noChoiced = function(){
                    rankBody.choosingNow = null;
                    div.style.webkitFilter = "grayscale(1)";
                };
                if (lib.config.taixuhuanjing.rank==num) {
                    div.choiced();
                }
                return div;
            };
            while(list.length){
                rankBody.appendChild(func(list.shift()));
            };
        };
        rankBody.update();*/
      
          var Text = ui.create.div('.taixuhuanjing_HomeBodyText',homeBody);
          var updatetext = function () {
          setTimeout(function(){
              if (!game.seasonPack || !game.seasonPack[lib.config.taixuhuanjing.season]){
              updatetext(); 
              return;
              }       
              Text.innerHTML = game.seasonPack[lib.config.taixuhuanjing.season].info.randomGet();
          },1000);
          };          
          updatetext();
        var seasonName = ui.create.div('.taixuhuanjing_HomeBodySeasonName',homeBody);
        seasonName.setBackgroundImage('extension/太虚幻境/dlc/'+season+'/title_'+season+'.png');
        //seasonName.style['box-shadow']='3px 5px 5px #000000';
        seasonName.style.filter=' drop-shadow(0px 0px 5px #000000)';
        body.update = function () {
            var season = lib.config.taixuhuanjing.season;
            body.setBackgroundImage('extension/太虚幻境/dlc/'+season+'/bg_'+season+'.png');
            seasonName.setBackgroundImage('extension/太虚幻境/dlc/'+season+'/title_'+season+'.png');
            Text.innerHTML = game.seasonPack[season].info.randomGet();
        };
        seasonName.listen(function(e){
            if (lib.config.taixuhuanjing&&lib.config.taixuhuanjing.name!=null) {
                game.messagePopup('请完成当前挑战');
                return;
            }
            game.updateModeData();
            home.replacePlayer();
            //清除原来选择的嘿嘿嘿
            _status.choiceCharacter = undefined;
            var seasonPack= ['ChongYingChuLin','HuangTianZhiNu','HeJinZhuHuan','HaiWaiFenghe','GFHuangJinZhiLuan','LiGuoZhiLuan','GFQiQinMengHuo','MGBaWangZhengCheng'];
            var num = 0;
            for( var i = 0; i < seasonPack.length; i++) { 
             if(lib.config.taixuhuanjing.season == seasonPack[i]){
             num = i;
             break;
             }             
            }
            if(num + 1 == seasonPack.length){
            lib.config.taixuhuanjing.season = seasonPack[0];
            } else{
            lib.config.taixuhuanjing.season = seasonPack[num+1];
            }
            /*
            lib.config.taixuhuanjing.season = ['ChongYingChuLin','HuangTianZhiNu','HeJinZhuHuan','HaiWaiFenghe','GFHuangJinZhiLuan','LiGuoZhiLuan','GFQiQinMengHuo','MGBaWangZhengCheng'].randomGet();
            */
            if (!lib.config.taixuhuanjingNode||lib.config.taixuhuanjingNode[lib.config.taixuhuanjing.season]==undefined) {
                lib.config.taixuhuanjing.rank = 1;
            } else if(lib.config.taixuhuanjingNode[lib.config.taixuhuanjing.season]&&lib.config.taixuhuanjingNode[lib.config.taixuhuanjing.season].rank){
                lib.config.taixuhuanjing.rank = lib.config.taixuhuanjingNode[lib.config.taixuhuanjing.season].rank;
            }
            body.update();
            game.messagePopup(lib.translate['txhj_'+lib.config.taixuhuanjing.season]+'赛季');
            //清空随机将池
            if(lib.config.mode_config.taixuhuanjing.pingheng) window.yusheCharacter=false;
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
        var rule = ui.create.div('.taixuhuanjing_HomeBodySeasonRule',seasonName);
        var ruleBox = ui.create.div('.taixuhuanjing_HomeBodySeasonBox',homeBody);
        var ruleShadow = ui.create.div('.taixuhuanjing_HomeBodySeasonTitleShadow','太虚幻境通關指南',ruleBox);
        var ruleTitle = ui.create.div('.taixuhuanjing_HomeBodySeasonTitle','太虚幻境通關指南',ruleBox);
        var ruleText = ui.create.div('.taixuhuanjing_HomeBodySeasonText',txhj.rule+'',ruleBox);
        lib.setScroll(ruleText);
        ruleBox.listen(function(e){
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
        rule.listen(function(e){
            game.txhj_playAudioCall('WinButton',null,true);
            ruleBox.style.display = 'block';
            event.cancelBubble = true;
            event.returnValue = false;
            return false;
        });
        homeBody.listen(function(e){
            ruleBox.style.display = 'none';
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
        var tujianButton = ui.create.div('.taixuhuanjing_HomeBodyTuJianButton',homeBody).listen(function(e){
            game.txhj_playAudioCall('WinButton',null,true);
            game.collectHome();
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
        var jiluButton = ui.create.div('.taixuhuanjing_HomeBodyJiLuButton',homeBody).listen(function(e){
            game.txhj_playAudioCall('WinButton',null,true);
            game.txhjRecordHome();
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });

        var newJourne = ui.create.div('.taixuhuanjing_HomeBodyNewJourney',homeBody);
        newJourne.listen(function(e){
            game.txhj_playAudioCall('WinButton',null,true);
            ruleBox.style.display = 'none';
            if (lib.config.taixuhuanjing==undefined) {
                game.updateModeData();
                home.replacePlayer();
                //rankBody.update();
            } else if (lib.config.taixuhuanjing.name!=null) {
                var src = "是否删除当前挑战的进度?";
                /*var d = confirm(src);
                if (d==true){
                    game.updateModeData();
                    home.replacePlayer();
                    //rankBody.update();
                }*/
                
                navigator.notification.confirm(
          			'　　'+src,
          			function(index){
          			    if(index==1) {
          			        game.updateModeData();
          			        home.replacePlayer();
                	    }
          			},
          			'三国杀·琉璃版',
          			['删除','取消']
          		);
                /*confirms(src,function(){
                    game.updateModeData();
                    home.replacePlayer();
                });*/
                return;
            };
            home.delete();
            lib.onresize.remove(reTaiXuHomesize);
            game.chooseCharacter();
            event.cancelBubble = true;
            event.returnValue = false; 
            if(lib.config['txhj_collect']&&lib.config.taixuhuanjing.season) {
                if(!lib.config['txhj_collect'].seaslist) lib.config['txhj_collect'].seaslist=[];
                if(!lib.config['txhj_collect'].seaslist.contains(lib.config.taixuhuanjing.season)) lib.config['txhj_collect'].seaslist.unshift(lib.config.taixuhuanjing.season);
                if(lib.config['txhj_collect'].seaslist.length>6) lib.config['txhj_collect'].seaslist=lib.config['txhj_collect'].seaslist.slice(0,6);
                game.saveConfig('txhj_collect',lib.config['txhj_collect']);
            }
            return false;
        });
        var oldJourne = ui.create.div('.taixuhuanjing_HomeBodyOldJourney',homeBody);
        oldJourne.listen(function(e){
            game.txhj_playAudioCall('WinButton',null,true);
            ruleBox.style.display = 'none';
            if (lib.config.taixuhuanjing==undefined) {
                game.updateModeData();
            };
            if (lib.config.taixuhuanjing.name==null||lib.config.taixuhuanjing.servant==null) {
                game.messagePopup('无相关进度');
                return;
            }
            _status.choiceCharacter = lib.config.taixuhuanjing.name;
            game.transitionAnimation();
            setTimeout(function(){
                home.delete();
                lib.onresize.remove(reTaiXuHomesize);
                game.consoledesk();
            },1000);
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
        var point  = ui.create.div('.taixuhuanjing_HomeBodyPoint',homeBody);
        point.listen(function(e){
            game.txhj_playAudioCall('WinButton',null,true);
            ruleBox.style.display = 'none';
            if (lib.config.taixuhuanjing==undefined) {
                game.updateModeData();
            };
            if (lib.config.taixuhuanjing&&lib.config.taixuhuanjing.name!=null) {
                game.messagePopup('请完成当前挑战');
                return;
            }
            game.choiceCharacter(home);
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
        home.replacePlayer = function (value) {
            point.innerHTML = '';
            if (value) {
                if (!_status.choiceCharacter) return;
                var name = _status.choiceCharacter;
                lib.config.taixuhuanjing.point = name;
                var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                point.innerHTML = '';
                var playImp1 = ui.create.div('.taixuhuanjing_HomeBodyPointImp1',point);
                var playImp2 = ui.create.div('.taixuhuanjing_HomeBodyPointImp2',playImp1);
                playImp2.setBackground(name,'character');
                var nameText = ui.create.div('.taixuhuanjing_HomeBodyPointText',''+lib.translate[name]+'',point);
            } else {
                if (!lib.config.taixuhuanjing||lib.config.taixuhuanjing.point==null) return;
                point.innerHTML = '';
                var name = lib.config.taixuhuanjing.point;
                var playImp1 = ui.create.div('.taixuhuanjing_HomeBodyPointImp1',point);
                var playImp2 = ui.create.div('.taixuhuanjing_HomeBodyPointImp2',playImp1);
                playImp2.setBackground(name,'character');
                var nameText = ui.create.div('.taixuhuanjing_HomeBodyPointText',''+lib.translate[name]+'',point);
            }
        }
        home.replacePlayer();
    };
    game.choiceCharacter = function (view){
        var homeBody = ui.create.div('.taixuhuanjing_HomeBody2',view);
        var setChoiceCharacterSize = function(){
            var screenWidth = ui.window.offsetWidth;
            var screenHeight = ui.window.offsetHeight;
            var whr = 2.0;
            var width;
            var height;
            if(screenWidth / whr > screenHeight){
                height = screenHeight;
                width = height * whr;
            }else{
                width = screenWidth;
                height = screenWidth/whr;
            }
            homeBody.style.height = Math.round(height)+"px";
            homeBody.style.width = Math.round(width)+"px";
            homeBody.style.transform = 'translate(-50%,-50%) scale(0.9)';
        };
        setChoiceCharacterSize();
        var reChoiceCharactersize = function(){
            setTimeout(setChoiceCharacterSize,500);
        };
        lib.onresize.push(reChoiceCharactersize);

        var title = ui.create.div('.taixuhuanjing_PointTitle',homeBody);
        var body = ui.create.div('.taixuhuanjing_PointBody',homeBody);
       if(!lib.config.mode_config.taixuhuanjing.quankuo){
        var list = {
            wei:['chengyu','xunyou','re_caocao','re_simayi','re_xiahoudun','re_xuzhu','re_guojia','re_lidian','wangji','xizhicai','re_zhenji','luzhi','re_dianwei','re_xunyu','simazhao','wangyuanji','re_xuhuang',
            'caoying','jiakui','yujin_yujin','caoren','ol_xiahouyuan'],
            wei2:['chengyu','xunyou','re_caocao','re_simayi','re_xiahoudun','re_xuzhu','re_guojia','re_lidian','wangji','xizhicai','re_zhenji','luzhi','re_dianwei','re_xunyu','simazhao','wangyuanji','re_xuhuang',
            'caoying','jiakui','yujin_yujin','caoren','ol_xiahouyuan'],
            shu:['old_madai','re_guanyu','re_zhaoyun','re_machao','zhaoxiang','qinmi','re_zhugeliang','zhaotongzhaoguang','mayunlu','ol_sp_zhugeliang','zhugezhan','zhangyis','re_huangzhong','wuban','re_weiyan'],
            shu2:['old_madai','re_guanyu','re_zhaoyun','re_machao','zhaoxiang','qinmi','re_zhugeliang','zhaotongzhaoguang','mayunlu','ol_sp_zhugeliang','zhugezhan','zhangyis','re_huangzhong','wuban','re_weiyan'],
            wu:['sunru','zhugeke','liuzan','re_ganning','re_huanggai','zhuhuan','xushi','re_sunquan','zhoufang','re_xusheng'],
            wu2:['sunru','zhugeke','liuzan','re_ganning','re_huanggai','zhuhuan','xushi','re_sunquan','zhoufang','re_xusheng'],
            qun:['lvbu','dongzhuo','zhangbao','xin_liru','re_zhangjiao','re_lvbu','guotufengji','quyi','zhangrang','liuyan','re_zhangliang','xuyou','sp_liuqi','lijue','guosi','xurong','zhangji','fanchou','re_zhurong','re_dongzhuo','zhangxiu','yj_xuhuang','ol_yujin','re_liru','yj_ganning'],
            qun2:['lvbu','dongzhuo','zhangbao','xin_liru','re_zhangjiao','re_lvbu','guotufengji','quyi','zhangrang','liuyan','re_zhangliang','xuyou','sp_liuqi','lijue','guosi','xurong','zhangji','fanchou','re_zhurong','re_dongzhuo','zhangxiu','yj_xuhuang','ol_yujin','re_liru','yj_ganning'],
            jin:[],
            jin2:[],
            shen:['shen_guanyu','shen_lvmeng','shen_zhouyu','shen_lvbu','shen_zhaoyun','shen_simayi','shen_ganning','shen_zhangfei'],
            shen2:['shen_guanyu','shen_lvmeng','shen_zhouyu','shen_lvbu','shen_zhaoyun','shen_simayi','shen_ganning','shen_zhangfei'],
            common:[],
            common2:[],
        }
        var list2 = [
            /*神*/
            'shen_guanyu','shen_lvmeng','shen_zhouyu','shen_lvbu','shen_zhaoyun','shen_simayi','shen_ganning','shen_zhangfei',
            /*魏*/
            'chengyu','xunyou','re_caocao','re_simayi','re_xiahoudun','re_xuzhu','re_guojia','re_lidian','wangji','xizhicai','re_zhenji','luzhi','re_dianwei','re_xunyu','simazhao','wangyuanji','re_xuhuang',
            'caoying','jiakui','yujin_yujin','caoren','ol_xiahouyuan',
            /*蜀*/
            'old_madai','re_guanyu','re_zhaoyun','re_machao','zhaoxiang','qinmi','re_zhugeliang','zhaotongzhaoguang','mayunlu','ol_sp_zhugeliang','zhugezhan','zhangyis','re_huangzhong','wuban','re_weiyan',
            /*吴*/
            'sunru','zhugeke','liuzan','re_ganning','re_huanggai','zhuhuan','xushi','re_sunquan','zhoufang','re_xusheng',
            /*群*/
            'lvbu','dongzhuo','zhangbao','xin_liru','re_zhangjiao','re_lvbu','guotufengji','quyi','zhangrang','liuyan','re_zhangliang','xuyou','sp_liuqi','lijue','guosi','xurong','zhangji','fanchou','re_zhurong','re_dongzhuo','zhangxiu','yj_xuhuang','ol_yujin','re_liru','yj_ganning',
        ];
        if(lib.config.mode_config.taixuhuanjing.suiji) {
        list2=[];
        window.getYC();
        for(var a in window.yusheCharacter) {
            list[a]=window.yusheCharacter[a];
            list[a+'2']=window.yusheCharacter[a];
            list2=list2.concat(window.yusheCharacter[a]);
        }
        }
        for (var i = 0; i < list2.length; i++) {
            if (lib.config.taixuhuanjingNode&&lib.config.taixuhuanjingNode.use&&lib.config.taixuhuanjingNode.use[list2[i]]) {
                list.common.push(list2[i]);
                list.common2.push(list2[i]);
            }
        }
        } else{
        var list = {
                    'wei': [],
                    'wei2': [],
                    'shu': [],
                    'shu2': [],
                    'wu': [],
                    'wu2': [],
                    'qun': [],
                    'qun2': [],
                    'jin': [],
                    'jin2': [],
                    'shen': [],
                    'shen2': [],
                    'common': [],
                    'common2': []
         };

                 for (var characterpack in lib.characterPack) {
                 if(characterpack == 'mode_extension_太虚幻境') continue;
                for (var character in lib.characterPack[characterpack]) {
                    
            //        if(lib.filter.characterDisabled(character)) continue;
                    if(!lib.character[character]) continue;
                    if(lib.character[character][4]){
           //     if(lib.character[character][4].contains('forbidai')) continue;
            //    if(lib.character[character][4].contains('boss')) continue;
                if(lib.character[character][4].contains('hiddenboss')) continue;
                if(lib.character[character][4].contains('minskin')) continue;
           //     if(lib.character[character][4].contains('forbidai')) continue;
                     };
                    if(lib.character[character][4]&&lib.character[character][4].contains('unseen')) continue;
                    if (lib.character[character][1]) {
                        if (lib.character[character][1] != 'wei' && lib.character[character][1] != "shu" && lib.character[character][1] != "jin"&& lib.character[character][1] != 'wu' && lib.character[character][1] != "qun" && lib.character[character][1] != "jin"&& lib.character[character][1] != "shen") {
                            list.common.push(character);
                            continue;
                        }
                    }else{
                    continue;             
                    }
                    list[lib.character[character][1]].push(character);
                    list[lib.character[character][1] + '2'].push(character);
                   if(lib.config.taixuhuanjingNode && lib.config.taixuhuanjingNode.use && lib.config.taixuhuanjingNode.use[character]){
                   list.common.push(character);
                   list.common2.push(character);                 
                   }
                }
            }
        }
        var grouplist = ['common','wei','shu','wu','qun','jin','shen'];
        var groupBody = ui.create.div('.taixuhuanjing_PointGroup',body);
        var choicehoGroup = false;
        var choicehoPlay = false;
        var playBox = ui.create.div('.taixuhuanjing_PointPlayBox',body);
        var playBody = ui.create.div('.taixuhuanjing_PointPlayBody',playBox);
        lib.setScroll(playBody);
        function funcPlay(play){
            var div = ui.create.div('.taixuhuanjing_PointPlayDiv');
            var rankBody = ui.create.div(".taixuhuanjing_characterDivMobileRankBody2",div);
            var playImp1 = ui.create.div('.taixuhuanjing_ChoiceCharacterPlayImp1',div);
            var playImp2 = ui.create.div('.taixuhuanjing_ChoiceCharacterPlayImp2',playImp1);
            var nameText = ui.create.div('.taixuhuanjing_ChoiceCharacterPlayText',playImp1);
            playImp2.setBackground(play,'character');
            nameText.innerHTML = lib.translate[play];
            var rarity = game.getRarity(play);
            var star;
            switch(rarity){
                case 'legend':star=5;break;
                case 'epic':star=4;break;
                case 'rare':star=3;break;
                case 'common':star=2;break;
                default:star=1;
            }
            //星级修改
            if(lib.config.mode_config.taixuhuanjing.star&&lib.config.mode_config.taixuhuanjing.star!=0) star=lib.config.mode_config.taixuhuanjing.star;
            while(star--){
                var starIcon = ui.create.div(".taixuhuanjing_characterDivMobileStarICON2",rankBody);
            }
            div.listen(function(e){
                game.txhj_playAudioCall('WinButton',null,true);
                var skills = get.character(play,3).slice(0);
                game.txhj_TrySkillAudio(skills.randomGet(),{name:play},null,[1,2].randomGet());
                _status.choiceCharacter = play;
                if(playBody.choosingNow){
                    playBody.choosingNow.noChoiced();
                }
                this.choiced();
                div.style.boxShadow = '-5px 0px 5px rgba(0,255,0,0.75),0px -5px 5px rgba(0,255,0,0.75),5px 0px 5px rgba(0,255,0,0.75),0px 5px 5px rgba(0,255,0,0.75)';
                event.cancelBubble = true;
                event.returnValue = false; 
                return false;    
            });
            div.oncontextmenu = function(e){
                game.txhj_playAudioCall('WinButton',null,true);
                game.pause2();
                ui.click.charactercard(play,null,null,true,this);
                event.cancelBubble = true;
                event.returnValue = false;
                return false;           
            };
            div.choiced = function(){
                playBody.choosingNow = this;
                div.style.boxShadow = '-5px 0px 5px rgba(255,255,0,0.75),0px -5px 5px rgba(255,255,0,0.75),5px 0px 5px rgba(255,255,0,0.75),0px 5px 5px rgba(255,255,0,0.75)';
            };
            div.noChoiced = function(){
                playBody.choosingNow = null;
                div.style.boxShadow = 'none';
            };
            div.onmouseover = function() {
                if (_status.choiceCharacter==undefined||_status.choiceCharacter!=play) {
                    div.style.boxShadow = '-5px 0px 5px rgba(255,255,0,0.75),0px -5px 5px rgba(255,255,0,0.75),5px 0px 5px rgba(255,255,0,0.75),0px 5px 5px rgba(255,255,0,0.75)';
                };
            };
            div.onmouseout = function() {
                if (_status.choiceCharacter==undefined||_status.choiceCharacter!=play) {
                    div.style.boxShadow = 'none';
                };
            };
            return div;
        };
        var playBodyUpdate = function (group){
            playBody.innerHTML = '';
            var playlist = list[group].slice(0);
            if (group=='common') {
                playlist.sort(function(a,b){
                    var num1 = 0;
                    var num2 = 0;
                    if (lib.config.taixuhuanjingNode.use&&lib.config.taixuhuanjingNode.use[a]) {
                        num1 = lib.config.taixuhuanjingNode.use[a];
                    }
                    if (lib.config.taixuhuanjingNode.use&&lib.config.taixuhuanjingNode.use[b]) {
                        num2 = lib.config.taixuhuanjingNode.use[b];
                    }
                    return num2-num1;
                });
            }
            while(playlist.length){
                var play = playlist.shift();
                playBody.appendChild(funcPlay(play));
            };
        };
        playBodyUpdate('common');
        function funcGroup(group){
            var div = ui.create.div('.taixuhuanjing_PointGroupDiv');
            if (group=='common') {
                var translate = '常用';
                var num = list[group+'2'].length;
                var max = list[group].length;
                var color = 'rgb(0,0,0)';
            } else {
                var translate = lib.translate[group];
                var num = list[group+'2'].length;
                var max = list[group].length;
                var color = get.translation(group);
            }
            var divName = ui.create.div('.taixuhuanjing_ChoiceCharacterGroupDivName',div);
            divName.setBackgroundImage('extension/太虚幻境/image/style/text_'+group+'.png');
            var divMax = ui.create.div('.taixuhuanjing_ChoiceCharacterGroupDivMax',+num+'/'+max,div);
            div.listen(function(e){
                game.txhj_playAudioCall('WinButton',null,true);
                if(groupBody.choosingNow){
                    groupBody.choosingNow.noChoiced();
                }
                this.choiced();
                _status.choiceCharacter = undefined;
                playBodyUpdate(group);
                event.cancelBubble = true;
                event.returnValue = false; 
                return false;    
            });
            div.choiced = function(){
                groupBody.choosingNow = this;
                div.setBackgroundImage('extension/太虚幻境/image/icon/icon_point1.png');
            };
            div.noChoiced = function(){
                groupBody.choosingNow = null;
                div.style.backgroundImage = 'none';
            };
            if (group=='common') {
                div.choiced();
            }
            return div;
        };
        while(grouplist.length){
            var group = grouplist.shift();
            groupBody.appendChild(funcGroup(group));
        };
        var okButton = ui.create.div('.taixuhuanjing_ChoiceCharacterOkButton','确认选择',body);
        okButton.listen(function(e){
            game.txhj_playAudioCall('off',null,true);
            lib.onresize.remove(reChoiceCharactersize);
            view.removeChild(homeBody);
            if (_status.choiceCharacter) {
                view.replacePlayer(_status.choiceCharacter);
            }
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
    };
    game.chooseCharacter = function (){
        var dialog = ui.create.div('.taixuhuanjing_chooseCharacterDialog');
        document.body.appendChild(dialog);
        _status.choiceCharacter = undefined;
        var body = ui.create.div('.taixuhuanjing_chooseCharacterBody',dialog);
        if(window.shohshaMenu) window.shohshaMenu.style.zIndex=6;
        if(window.shohshaMenu2) window.shohshaMenu2.style.zIndex=7;
        var setbodySize = function(){
            var screenWidth = ui.window.offsetWidth;
            var screenHeight = ui.window.offsetHeight;
            var whr = 2.4;
            var width;
            var height;
            if(screenWidth / whr > screenHeight){
                height = screenHeight;
                width = height * whr;
            }else{
                width = screenWidth;
                height = screenWidth/whr;
            }
            body.style.height = Math.round(height)+"px";
            body.style.width = Math.round(width)+"px";
            body.style.transform = 'translate(-50%,-50%)';
        };
        setbodySize();
        var rebodysize = function(){
            setTimeout(setbodySize,500);
        };
        lib.onresize.push(rebodysize);
        var title = ui.create.div('.taixuhuanjing_consoledeskTitle',dialog);
        var titleText = ui.create.div('.taixuhuanjing_consoledeskTitleText','请选择你的武将,挑战幻境',title);
        var playBody = ui.create.div('.taixuhuanjing_chooseCharacterPlayBody',body);
        var playBodyDiv = ui.create.div('.taixuhuanjing_chooseCharacterPlayBodyDiv',playBody);
        var playBodySkills = ui.create.div('.taixuhuanjing_chooseCharacterPlayBodySkills',playBody);

        var difficultyChooseBody = ui.create.div('.taixuhuanjing_chooseCharacterDifficultyChooseBody',body);
        var difficultyChooseBodyText = ui.create.div('.taixuhuanjing_chooseCharacterDifficultyChooseBodyText',difficultyChooseBody);
        var difficultyChooseBodyButton = ui.create.div('.taixuhuanjing_chooseCharacterDifficultyChooseBodyButton',difficultyChooseBody);
        function rankFunc (rankNode){
            var difficultyChooseBodyButtonsDiv = ui.create.div('.taixuhuanjing_difficultyChooseBodyButtonsDiv');
            var difficultyChooseBodyButtonsDivT = ui.create.div('.taixuhuanjing_difficultyChooseBodyButtonsDivT',rankNode.name+'',difficultyChooseBodyButtonsDiv);
            difficultyChooseBodyButtonsDiv.node = rankNode;
            if ((rankNode.num!=1&&lib.config.taixuhuanjingNode[lib.config.taixuhuanjing.season]==undefined)||(rankNode.num!=1&&lib.config.taixuhuanjingNode[lib.config.taixuhuanjing.season]&&lib.config.taixuhuanjingNode[lib.config.taixuhuanjing.season].rank<rankNode.num)) {
                var difficultyChooseBodyButtonsIcon = ui.create.div('.taixuhuanjing_difficultyChooseBodyButtonsIcon',difficultyChooseBodyButtonsDiv);
                difficultyChooseBodyButtonsDiv.style.pointerEvents = 'none';
            }
            difficultyChooseBodyButtonsDivT.listen(function(e){
                game.txhj_playAudioCall('WinButton',null,true);
                var num = difficultyChooseBodyButtonsDiv.node.num;
                lib.config.taixuhuanjing.rank = difficultyChooseBodyButtonsDiv.node.num;
                difficultyChooseBodyButton.style.transform = 'rotate(90deg)';
                difficultyChooseBody.update();
                difficultyInfoBody.update();
                game.messagePopup(rankNode.name+'难度');
                event.cancelBubble = true;
                event.returnValue = false;
                return false;  
            });
            return difficultyChooseBodyButtonsDiv;
        };
        difficultyChooseBodyButton.listen(function(e){
            game.txhj_playAudioCall('WinButton',null,true);
            if (difficultyChooseBodyButton.style.transform == 'rotate(270deg)') {
                difficultyChooseBodyButton.style.transform = 'rotate(90deg)';
                difficultyChooseBody.update();
            } else {
                difficultyChooseBodyButton.style.transform = 'rotate(270deg)';
                var ranks = [{name:'普通',num:1},{name:'困难',num:2},{name:'噩梦',num:3},{name:'炼狱',num:4},{name:'血战',num:5}];
                while(ranks.length){
                    var rankNode = ranks.shift();
                    difficultyChooseBody.appendChild(rankFunc(rankNode));
                };
            }
            event.cancelBubble = true;
            event.returnValue = false;
            return false;    
        });
        difficultyChooseBody.update = function () {
            var rankStr = '';
            switch(lib.config.taixuhuanjing.rank){
                case 5:rankStr='血战';break;
                case 4:rankStr='炼狱';break;
                case 3:rankStr='噩梦';break;
                case 2:rankStr='困难';break;
                default:rankStr='普通';
            }
            difficultyChooseBodyText.innerHTML = "<p style='color: #fff;'>"+'当前难度: '+"</p>"+rankStr;
            var childs = difficultyChooseBody.childNodes;
            while(childs.length>2){
                difficultyChooseBody.removeChild(difficultyChooseBody.lastChild);
            }
        };
        difficultyChooseBody.update();

        var difficultyInfoBodyTitle = ui.create.div('.taixuhuanjing_chooseCharacterDifficultyInfoBodyTitle','当前难度效果:',body);
        var difficultyInfoBody = ui.create.div('.taixuhuanjing_chooseCharacterDifficultyInfoBody',body);
        difficultyInfoBody.update = function () {
            if (lib.config.taixuhuanjing.rank==1) {
                difficultyInfoBody.innerHTML = "<p style='color: #fff;margin: 4%;'>"+'每超出敌人1级，其额外+1体力及体力上限'+"</p>";
            } else if (lib.config.taixuhuanjing.rank==2) {
                difficultyInfoBody.innerHTML = "<p style='color: #fff;margin: 4%;'>"+'敌人额外+1体力及体力上限；每超出敌人1级，其额外+2体力及体力上限'+"</p>";
            } else if (lib.config.taixuhuanjing.rank==3) {
                difficultyInfoBody.innerHTML = "<p style='color: #fff;margin: 4%;'>"+'敌人额外+1体力及体力上限并拥有技能英姿与马术，每超出敌人1级，其额外+2体力及体力上限；你的体力上限-1'+"</p>";
            } else if (lib.config.taixuhuanjing.rank==4) {
                difficultyInfoBody.innerHTML = "<p style='color: #fff;margin: 4%;'>"+'敌人额外+1体力及体力上限并拥有技能英姿与马术，装备一件随机武器；每超出敌人1级，其额外+2体力及体力上限；你的体力上限-1'+"</p>";
            } else if (lib.config.taixuhuanjing.rank==5) {
                difficultyInfoBody.innerHTML = "<p style='color: #fff;margin: 4%;'>"+'敌人额外+1体力及体力上限并拥有技能英姿与马术，装备一件随机武器；每超出敌人1级，其额外+2体力及体力上限；你的体力上限-1并获得鏖战祝福'+"</p>";
            }
        };
        difficultyInfoBody.update();

        var starBodyTitle = ui.create.div('.taixuhuanjing_chooseCharacterStarBodyTitle','当前星级效果:',body);
        var starBody = ui.create.div('.taixuhuanjing_chooseCharacterStarBody',body);
        starBody.update = function (name) {
            var rarity = game.getRarity(name);
            var value = 0;
            switch(rarity){
                case 'legend':value=5;break;
                case 'epic':value=4;break;
                case 'rare':value=3;break;
                case 'common':value=2;break;
                default:value=1;
            }
            //星级修改
            if(lib.config.mode_config.taixuhuanjing.star&&lib.config.mode_config.taixuhuanjing.star!=0) value=lib.config.mode_config.taixuhuanjing.star;
            
            if (value==1) {
                starBody.innerHTML = "<p style='color: #fff;margin: 4%;'>"+'3个技能槽，手气卡次数1'+"</p>";
            } else if (value==2) {
                starBody.innerHTML = "<p style='color: #fff;margin: 4%;'>"+'300金币，3个技能槽，手气卡次数3'+"</p>";
            } else if (value==3) {
                starBody.innerHTML = "<p style='color: #fff;margin: 4%;'>"+'300金币，3个技能槽，手气卡次数3，初始手牌+1'+"</p>";
            } else if (value==4) {
                starBody.innerHTML = "<p style='color: #fff;margin: 4%;'>"+'500金币，4个技能槽，手气卡次数4，初始手牌+1，额外+1体力及体力上限'+"</p>";
            } else if (value==5) {
                starBody.innerHTML = "<p style='color: #fff;margin: 4%;'>"+'1000金币，5个技能槽，手气卡次数5，初始手牌+2，额外+2体力及体力上限'+"</p>";
            }
        };

        lib.setScroll(playBodySkills);
        playBody.update = function (name){
            playBodyDiv.innerHTML = '';
            playBodySkills.innerHTML = '';
            playBodyDiv.style.animationName = 'dlcAnimation-1';
            game.addCharacterDivMobile(name,true,playBodyDiv);
            game.txhj_playAudioCall('PopUp',null,true);
            setTimeout(function() {
                setTimeout(function() {
                    playBodyDiv.style.animationName = 'none';
                    playBodyDiv.style.opacity = '1';
                },100);
                var intro = lib.character[name];
                if(!intro){
                    for(var i in lib.characterPack){
                        if(lib.characterPack[i][name]){
                            intro=lib.characterPack[i][name];
                            break;
                        }
                    }
                }
                var skillsComps = {
                    playName:(function(){
                        var info = lib.translate[name];
                        var playName = ui.create.div('.taixuhuanjing_chooseCharacterPlayBodySkills1');
                        playName.innerHTML = lib.translate[intro[1]]+'.'+info;
                        if (intro[1]=='wei') {
                            playName.style.color = '#1E90FF';
                        } else if (intro[1]=='shu') {
                            playName.style.color = '#FF7F24';
                        } else if (intro[1]=='wu') {
                            playName.style.color = '#76EE00';
                        } else if (intro[1]=='qun') {
                            playName.style.color = '#FFFF00';
                        } else if (intro[1]=='jin') {
                            playName.style.color = '#9400D3';
                        } else {
                            playName.style.color = '#FF0000';
                        } 
                        return playName;
                    })(),
                    playHp: (function(hp){
                        var playHp = ui.create.div('.taixuhuanjing_chooseCharacterPlayBodySkills2'); 
                        if(typeof hp!='number'){
                            var hp1 = get.infoHp(hp);
                            var hp2 = hp1;
                            var maxHp1 = get.infoMaxHp(hp);
                            if (hp1<16&&maxHp1<16) {
                                var num = maxHp1 - hp1;
                                while(hp1--){
                                    var tmp = ui.create.div(".taixuhuanjing_chooseCharacterPlayBodyHpICON",playHp);
                                    if (hp2>2) {
                                        tmp.setBackgroundImage('extension/太虚幻境/image/style/glass1.png');
                                    } else if (hp2>1) {
                                        tmp.setBackgroundImage('extension/太虚幻境/image/style/glass2.png');
                                    } else if (hp2>0) {
                                        tmp.setBackgroundImage('extension/太虚幻境/image/style/glass3.png');
                                    } 
                                }
                                while(num--){
                                    var tmp = ui.create.div(".taixuhuanjing_chooseCharacterPlayBodyHpICON",playHp);
                                    tmp.setBackgroundImage('extension/太虚幻境/image/style/glass4.png');
                                }
                            } else {
                                var tmp = ui.create.div(".taixuhuanjing_chooseCharacterPlayBodyHpICON",playHp);
                                tmp.setBackgroundImage('extension/太虚幻境/image/style/glass1.png');
                                var numbody = ui.create.div(".taixuhuanjing_chooseCharacterPlayBodyHpNum",hp+'',playHp);
                            }
                        } else if (hp <= 15){
                            var num = hp;
                            while(num--){
                                var tmp = ui.create.div(".taixuhuanjing_chooseCharacterPlayBodyHpICON",playHp);
                                tmp.setBackgroundImage('extension/太虚幻境/image/style/glass1.png');
                            }
                        } else if (hp==Infinity){
                            var tmp = ui.create.div(".taixuhuanjing_chooseCharacterPlayBodyHpICON",playHp);
                            tmp.setBackgroundImage('extension/太虚幻境/image/style/glass1.png');
                            var numbody = ui.create.div(".taixuhuanjing_chooseCharacterPlayBodyHpNum",'∞',playHp);
                        } else {
                            var tmp = ui.create.div(".taixuhuanjing_chooseCharacterPlayBodyHpICON",playHp);
                            tmp.setBackgroundImage('extension/太虚幻境/image/style/glass1.png');
                            var numbody = ui.create.div(".taixuhuanjing_chooseCharacterPlayBodyHpNum",hp+'',playHp);
                        }
                        return playHp;
                    })(intro[2]),
                    playSkills:(function(){
                        var skillInfo = "";
                        var skills = get.character(name,3).slice(0);
                        for(var i=0;i<skills.length;i++){
                            if(!lib.translate[skills[i]]||!lib.translate[skills[i]+'_info']) {
                                skills.remove(skills[i]);
                                i--;
                                continue;
                            }
                            if(skillInfo!="") skillInfo+="<p>";
                            skillInfo+= "<br>"+get.translation([skills[i]])+":";
                            skillInfo+=lib.translate[skills[i]+'_info'];
                        }
                        var playSkills = ui.create.div('.taixuhuanjing_chooseCharacterPlayBodySkills3');
                        playSkills.innerHTML = skillInfo;
                        return playSkills;
                    })(),
                }
                for(var i in skillsComps){
                    playBodySkills.appendChild(skillsComps[i]);
                }
            }, 300);
        };
        var characterBody = ui.create.div('.taixuhuanjing_chooseCharacterCharacterBody',body);
        lib.setScroll(characterBody);
        function func(name){
            var div = ui.create.div('.taixuhuanjing_chooseCharacterDiv');
            game.addCharacterDivMobile(name,true,div);
            div.listen(function(e){
                game.txhj_playAudioCall('WinButton',null,true);
                var skills = get.character(name,3).slice(0);
                game.txhj_TrySkillAudio(skills.randomGet(),{name:name},null,[1,2].randomGet());
                if(characterBody.choosingNow){
                    characterBody.choosingNow.noChoiced();
                }
                this.choiced();
                div.style.boxShadow = '-5px 0px 5px rgba(0,255,0,0.75),0px -5px 5px rgba(0,255,0,0.75),5px 0px 5px rgba(0,255,0,0.75),0px 5px 5px rgba(0,255,0,0.75)';
                _status.choiceCharacter = name;
                playBody.update(name);
                starBody.update(name);
                event.cancelBubble = true;
                event.returnValue = false; 
                return false;    
            });
            div.oncontextmenu = function(e){
                game.txhj_playAudioCall('WinButton',null,true);
                game.pause2();
                ui.click.charactercard(name,null,null,true,this);
                event.cancelBubble = true;
                event.returnValue = false;
                return false;           
            };
            div.choiced = function(){
                characterBody.choosingNow = this;
                div.style.boxShadow = '-5px 0px 5px rgba(255,255,0,0.75),0px -5px 5px rgba(255,255,0,0.75),5px 0px 5px rgba(255,255,0,0.75),0px 5px 5px rgba(255,255,0,0.75)';
            };
            div.noChoiced = function(){
                characterBody.choosingNow = null;
                div.style.boxShadow = 'none';
            };
            div.onmouseover = function() {
                if (_status.choiceCharacter==undefined||_status.choiceCharacter!=name) {
                    div.style.boxShadow = '-5px 0px 5px rgba(255,255,0,0.75),0px -5px 5px rgba(255,255,0,0.75),5px 0px 5px rgba(255,255,0,0.75),0px 5px 5px rgba(255,255,0,0.75)';
                };
            };
            div.onmouseout = function() {
                if (_status.choiceCharacter==undefined||_status.choiceCharacter!=name) {
                    div.style.boxShadow = 'none';
                };
            };
            return div;
        };
        if(!lib.config.mode_config.taixuhuanjing.quankuo){
        var list = [
            /*神*/
            'shen_guanyu','shen_lvmeng','shen_zhouyu','shen_lvbu','shen_zhaoyun','shen_simayi','shen_ganning','shen_zhangfei',
            /*魏*/
            'chengyu','xunyou','re_caocao','re_simayi','re_xiahoudun','re_xuzhu','re_guojia','re_lidian','wangji','xizhicai','re_zhenji','luzhi','re_dianwei','re_xunyu','simazhao','wangyuanji','re_xuhuang',
            'caoying','jiakui','yujin_yujin','caoren','ol_xiahouyuan',
            /*蜀*/
            'old_madai','re_guanyu','re_zhaoyun','re_machao','zhaoxiang','qinmi','re_zhugeliang','zhaotongzhaoguang','mayunlu','ol_sp_zhugeliang','zhugezhan','zhangyis','re_huangzhong','wuban','re_weiyan',
            /*吴*/
            'sunru','zhugeke','liuzan','re_ganning','re_huanggai','zhuhuan','xushi','re_sunquan','zhoufang','re_xusheng',
            /*群*/
            'lvbu','dongzhuo','zhangbao','xin_liru','re_zhangjiao','re_lvbu','guotufengji','quyi','zhangrang','liuyan','re_zhangliang','xuyou','sp_liuqi','lijue','guosi','xurong','zhangji','fanchou','re_zhurong','re_dongzhuo','zhangxiu','yj_xuhuang','ol_yujin','re_liru','yj_ganning',
        ];
        if(lib.config.mode_config.taixuhuanjing.suiji) {
        list=[];
        window.getYC();
        for(var a in window.yusheCharacter) {
            list=list.concat(window.yusheCharacter[a]);
        }
        }
        } else {
        var list = [];
      
        for(var i in lib.character){
            if(lib.filter.characterDisabled(i)) continue;
            if(!lib.character[i]) continue;
            if (lib.config.taixuhuanjing&&lib.config.taixuhuanjing.point==i) continue;
            list.push(i);
        }
        }
        
        
        var list2 = [lib.config.taixuhuanjing.point].concat(list.randomRemove(5));
        while (list2.length){
            var name = list2.shift();
            if (name!=null) {
                characterBody.appendChild(func(name));
            }
        };
        var okButton = ui.create.div('.taixuhuanjing_chooseCharacterOkButton',body);
        var okText = ui.create.div('.taixuhuanjing_chooseCharacterOkText',okButton);
        body.off = function(){
            var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
            game.transitionAnimation();
            setTimeout(function(){
                dialog.delete();
                lib.onresize.remove(rebodysize);
                game.chooseServant();
            },1000);
        }
        okButton.listen(function(e){
            if (!_status.choiceCharacter) {
                game.messagePopup('请选择一名武将');
                return;
            }
            game.txhj_playAudioCall('off',null,true);
            var rarity = game.getRarity(_status.choiceCharacter);
            var star = 0;
            switch(rarity){
                case 'legend':star=5;break;
                case 'epic':star=4;break;
                case 'rare':star=3;break;
                case 'common':star=2;break;
                default:star=1;
            }
            //星级修改
            if(lib.config.mode_config.taixuhuanjing.star&&lib.config.mode_config.taixuhuanjing.star!=0) star=lib.config.mode_config.taixuhuanjing.star;
            

            lib.config.taixuhuanjing.name = _status.choiceCharacter;
            lib.config.taixuhuanjing.point = _status.choiceCharacter;
            if (lib.config.taixuhuanjingNode&&lib.config.taixuhuanjingNode.use) {
                if (!lib.config.taixuhuanjingNode.use[_status.choiceCharacter]) lib.config.taixuhuanjingNode.use[_status.choiceCharacter] = 1;
                else lib.config.taixuhuanjingNode.use[_status.choiceCharacter]++;
                game.saveConfig('taixuhuanjingNode',lib.config.taixuhuanjingNode)
            }
            lib.config.taixuhuanjing.hp = get.infoHp(lib.character[_status.choiceCharacter][2]);
            lib.config.taixuhuanjing.maxHp = get.infoMaxHp(lib.character[_status.choiceCharacter][2]);
            var skills = get.character(_status.choiceCharacter,3).slice(0);
            var skills2 = [];
            while(skills2.length<5&&skills.length){
                var skill = skills.shift();
                skills2.push(skill);
            }
            lib.config.taixuhuanjing.skills = [];
            lib.config.taixuhuanjing.useSkills = skills2.slice(0);

            if (star==5) {
                lib.config.taixuhuanjing.coin += 1000;
                lib.config.taixuhuanjing.maxCoin += 1000;
                lib.config.taixuhuanjing.maxSkills = skills2.length + 5;
                lib.config.taixuhuanjing.adjust += 5;
                lib.config.taixuhuanjing.minHs += 2;
                lib.config.taixuhuanjing.hp += 2;
                lib.config.taixuhuanjing.maxHp += 2;

            } else if (star==4) {
                lib.config.taixuhuanjing.coin += 500;
                lib.config.taixuhuanjing.maxCoin += 500;
                lib.config.taixuhuanjing.maxSkills = skills2.length + 4;
                lib.config.taixuhuanjing.adjust += 4;
                lib.config.taixuhuanjing.minHs += 1;
                lib.config.taixuhuanjing.hp += 1;
                lib.config.taixuhuanjing.maxHp += 1;
            } else if (star==3) {
                lib.config.taixuhuanjing.coin += 300;
                lib.config.taixuhuanjing.maxCoin += 300;
                lib.config.taixuhuanjing.maxSkills = skills2.length + 3;
                lib.config.taixuhuanjing.adjust += 3;
                lib.config.taixuhuanjing.minHs += 1;
            } else if (star==2) {
                lib.config.taixuhuanjing.coin += 300;
                lib.config.taixuhuanjing.maxCoin += 300;
                lib.config.taixuhuanjing.maxSkills = skills2.length + 3;
                lib.config.taixuhuanjing.adjust += 3;
            } else if (star==1) {
                lib.config.taixuhuanjing.maxSkills = skills2.length + 2;
                lib.config.taixuhuanjing.adjust += 1;
            }

            if (lib.config.taixuhuanjing.hp>15) lib.config.taixuhuanjing.hp = 15;
            if (lib.config.taixuhuanjing.maxHp>15) lib.config.taixuhuanjing.maxHp = 15;
            if (lib.config.taixuhuanjing.maxSkills>10) lib.config.taixuhuanjing.maxSkills = 10;

            body.off();
            event.cancelBubble = true;
            event.returnValue = false;
            return false;    
        });
    };
    game.chooseServant = function(){
        var div = ui.create.div(".taixuhuanjing_chooseServantDiv");
        document.body.appendChild(div);
        var topTitle = ui.create.div('.taixuhuanjing_chooseServantTopTitle',div);
        topTitle.innerHTML = "请选择你的侍灵，挑战幻境";
        var body = ui.create.div(".taixuhuanjing_chooseServantBody",div);

        var iconDiv = ui.create.div('.taixuhuanjing_chooseServantIconDiv',body);
        txhj.servantData.createServantIconList(iconDiv);

        var slDiv = ui.create.div('.taixuhuanjing_chooseSLDiv',body);
        txhj.sldiv = slDiv;
        slDiv.onclick = function () {
            txhj.servant.randomPlayAction();
        }
        var descDiv = ui.create.div('.taixuhuanjing_chooseSLDescDiv',body);
        txhj.descDiv = descDiv;
        txhj.initSLDesc = function (ele) {
            var headDiv = ui.create.div('.taixuhuanjing_chooseSLHeadDiv',ele);
            ele.headDiv = headDiv;
            var grade = new Image(102,98);
            grade.classList.add('taixuhuanjing_chooseSLHeadGrade');
            grade.src = txhjPack.path + "/image/servant/icon/" + txhj.servant.grade + ".png";
            grade.onerror = function(){
                alert("grade" + txhj.servant.grade + ".png not found");
                this.onerror = null;
            }
            headDiv.appendChild(grade);
            headDiv.grade = grade;

            var textName = document.createElement("span");
            textName.classList.add("taixuhuanjing_chooseSLTextName");
            textName.innerHTML = txhj.servant.textName;
            headDiv.appendChild(textName);
            headDiv.textName = textName;

            var bodyDiv = ui.create.div('.taixuhuanjing_chooseSLBodyDiv',ele);
            ele.bodyDiv = bodyDiv;

            txhj.resetSkillDesc(ele);

            var btn = ui.create.div('.taixuhuanjing_chooseSLBtn',ele);
            ele.btn = btn;
            var btnText = ui.create.div('.taixuhuanjing_chooseSLBtnText',btn);
            btn.onclick = function () {
                lib.config.taixuhuanjing.servant = servant.nickName;
                game.transitionAnimation();
                var buffs = Object.keys(txhj.servantData.skillDesc[txhj.servant.nickName]);
                for (const buff of buffs) {
                    lib.config.taixuhuanjing.buff.push(buff);
                }
                setTimeout(() => {
                    div.delete();
                    if (lib.config.taixuhuanjing.rank>1) {
                        if (txhj.servant) txhj.servant.hide();
                        game.chooseEffect();
                    } else {
                        game.consoledesk(_status.choiceCharacter);
                    }
                },1000);
            }

        }
        txhj.resetSkillDesc = function (ele) {
            var div = ele.bodyDiv;
            div.innerHTML = '';
            var data = txhj.servantData.skillDesc[txhj.servant.nickName];
            if (data) {
                var keys = Object.keys(data);
                for (var i = 0; i < keys.length; i++) {
                    var temp = ui.create.div(".taixuhuanjing_chooseSLSkillDescItem", div);
                    var name = ui.create.div(".taixuhuanjing_chooseSLSkillDescName", temp);
                    name.innerHTML = data[keys[i]].name;
                    var desc = ui.create.div(".taixuhuanjing_chooseSLSkillDescDesc", temp);
                    desc.innerHTML = data[keys[i]].desc;
                }
            }
        }
        txhj.resetDescHead = function (ele) {
            var div = ele.headDiv;
            div.grade.src = txhjPack.path + "/image/servant/icon/" + txhj.servant.grade + ".png";
            div.textName.innerHTML = txhj.servant.textName;
        };
        txhj.updateSLDesc = function (ele) {
            txhj.resetDescHead(ele);
            txhj.resetSkillDesc(ele);
        }

        var servant = new Servant("lulu",window.dcdAnim ? false : true);
        txhj.servant = servant;
        servant.chooseingPlay(slDiv);
        lib.config.taixuhuanjing.servant = servant.nickName;
        txhj.initSLDesc(descDiv);
    };
    game.chooseEffect = function(type){
        var dialog = ui.create.div('.taixuhuanjing_chooseEffectDialog');
        document.body.appendChild(dialog);
        var body = ui.create.div('.taixuhuanjing_chooseEffectBody',dialog);
        var setchooseEffectSize = function(){
            var screenWidth = ui.window.offsetWidth;
            var screenHeight = ui.window.offsetHeight;
            var whr = 2.1;
            var width;
            var height;
            if(screenWidth / whr > screenHeight){
                height = screenHeight;
                width = height * whr;
            }else{
                width = screenWidth;
                height = screenWidth/whr;
            }
            body.style.height = Math.round(height)+"px";
            body.style.width = Math.round(width)+"px";
            body.style.transform = 'translate(-50%,-50%)';
        };
        setchooseEffectSize();
        var rechooseEffectsize = function(){
            setTimeout(setchooseEffectSize,500);
        };
        lib.onresize.push(rechooseEffectsize);
        var title = ui.create.div('.taixuhuanjing_consoledeskTitle',dialog);
        var titleText = ui.create.div('.taixuhuanjing_consoledeskTitleText','请选择突变形式',title);
        var box = ui.create.div('.taixuhuanjing_chooseEffectBox',body);
        var title = ui.create.div('.taixuhuanjing_chooseEffectTitle','选择突变规则',box);
        var title2 = ui.create.div('.taixuhuanjing_chooseEffectTitle2','选择突变规则',box);
        if(ui.roundmenu) {//菜单隐藏大法
            ui.roundmenu.hide();
        }
        function func(name){
            var div = ui.create.div('.taixuhuanjing_chooseEffectDiv');
            var divIcon = ui.create.div('.taixuhuanjing_chooseEffectDivIcon',div);
            divIcon.setBackgroundImage('extension/太虚幻境/image/big_bg/rogue_seed_txhj_'+name+'.png');
            var divIcon2 = ui.create.div('.taixuhuanjing_chooseEffectDivIcon2',divIcon);
            var divName = ui.create.div('.taixuhuanjing_chooseEffectDivName',''+game.effectPack[name].name+'',div);
            var divInfo = ui.create.div('.taixuhuanjing_chooseEffectDivInfo',''+game.effectPack[name].info+'',div);
            var divInfo2 = ui.create.div('.taixuhuanjing_chooseEffectDivInfo2','奖励分数',div);
            var divNum = game.effectPack[name].num;
            if (divNum<1) {
                divNum = Number(divNum*100).toFixed(1)+'%';
            }
            var divInfo3 = ui.create.div('.taixuhuanjing_chooseEffectDivInfo3','+'+divNum,div);
            var divButton = ui.create.div('.taixuhuanjing_chooseEffectDivButton','选择',div);
            divButton.listen(function(e){
                game.txhj_playAudioCall('WinButton',null,true);
                lib.config.taixuhuanjing.effect = name;
                if (game.effectPack[lib.config.taixuhuanjing.effect]&&game.effectPack[lib.config.taixuhuanjing.effect].skill.length) {
                    var skills = game.effectPack[lib.config.taixuhuanjing.effect].skill.slice(0);
                    for (var ii = 0; ii < skills.length; ii++) {
                        if (lib.config.taixuhuanjing.useSkills.length<lib.config.taixuhuanjing.maxSkills) {
                            lib.config.taixuhuanjing.useSkills.add(skills[ii]);
                        } else if (!lib.config.taixuhuanjing.skills.contains(skills[ii])) {
                            lib.config.taixuhuanjing.skills.add(skills[ii]);
                        }
                    }
                }
                if (lib.config.taixuhuanjing.effect=='huanjingcaoge') {
                    var equips = [];
                    for (var i = 0; i < txhjPack.cardPack.length; i++) {
                        if (lib.translate[txhjPack.cardPack[i].cardID]&&get.type(txhjPack.cardPack[i].cardID)=='equip') {
                            var num = get.cardRank(txhjPack.cardPack[i].cardID);
                            if (num<=lib.config.taixuhuanjing.rank) {
                                equips.push(txhjPack.cardPack[i].cardID);
                            }
                        }
                    }
                    var card = {
                        name:equips.randomGet(),
                        suit:['spade', 'heart', 'club', 'diamond'].randomGet(),
                        number:[1,2,3,4,5,6,7,8,9,10,11,12,13].randomGet(),
                    }
                    setTimeout(() => {
                        game.messagePopup('获得装备['+get.translation(card.name)+']');
                    },2000);
                    if (get.subtype(card.name)!='equip5'&&get.subtype(card.name)!='equip6'&&lib.config.taixuhuanjing[get.subtype(card.name)] == null) {
                        lib.config.taixuhuanjing[get.subtype(card.name)] = card;
                    } else {
                        lib.config.taixuhuanjing.equips.push(card);
                    }
                } else if (lib.config.taixuhuanjing.effect=='lingqiyiman') {
                    lib.config.taixuhuanjing.maxHp+=2;
                    lib.config.taixuhuanjing.hp+=2;
                } else if (lib.config.taixuhuanjing.effect=='lingqikuijie') {
                    lib.config.taixuhuanjing.maxHp-=1;
                    lib.config.taixuhuanjing.hp-=1;
                } else if (lib.config.taixuhuanjing.effect=='chongfenbeizhan') {
                    lib.config.taixuhuanjing.minHs+=2;
                } else if (lib.config.taixuhuanjing.effect=='cangcuchuji') {
                    lib.config.taixuhuanjing.minHs-=3;
                }
                if (lib.config.taixuhuanjing.rank>4) {
                    lib.config.taixuhuanjing.buff.push('buff_txhj_aozhan');
                }
                if (lib.config.taixuhuanjing.rank>2) {
                    lib.config.taixuhuanjing.hp--;
                    lib.config.taixuhuanjing.maxHp--;
                }
                var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                game.transitionAnimation();
                setTimeout(() => {
                    dialog.delete();
                    lib.onresize.remove(rechooseEffectsize);
                    game.consoledesk(_status.choiceCharacter);
                },1000);
                event.cancelBubble = true;
                event.returnValue = false; 
                return false;    
            });
            return div;
        };
        var effects = [];
        for (var i in game.effectPack) {
            if (i=='pinganwushi') continue;
            if (game.effectPack[i].type=='effect') {
                effects.add(i);
            }
        }
        var list = effects.randomGets(4);
        while (list.length){
            box.appendChild(func(list.shift()));
        };
    };
    game.consoledesk = function(){
        ui.arena.hide();
        if(ui.roundmenu) {//菜单隐藏大法
            ui.roundmenu.show();
        }
        if(window.shohshaMenu) window.shohshaMenu.style.zIndex=1;
        if(window.shohshaMenu2) window.shohshaMenu2.style.zIndex=2;
        game.canTuoGuan=true;
        var home = ui.create.div('.taixuhuanjing_Home2');
        var season = lib.config.taixuhuanjing.season;
        var chapter = lib.config.taixuhuanjing.chapter;
        var exclusive;
        if(!exclusive&&lib.config.taixuhuanjing.optional1 != null){
            var node = lib.config.taixuhuanjing.optional1;
            if ((node.type=='boss'||node.type=='Ultimate')&&node.exclusive) {
                exclusive = node.exclusive;
            }
        }
        if(!exclusive&&lib.config.taixuhuanjing.optional2 != null){
            var node = lib.config.taixuhuanjing.optional2;
            if ((node.type=='boss'||node.type=='Ultimate')&&node.exclusive) {
                exclusive = node.exclusive;
            }
        }
        if(!exclusive&&lib.config.taixuhuanjing.optional3 != null){
            var node = lib.config.taixuhuanjing.optional3;
            if ((node.type=='boss'||node.type=='Ultimate')&&node.exclusive) {
                exclusive = node.exclusive;
            }
        } 
        if(exclusive){
            home.setBackgroundImage('extension/太虚幻境/dlc/'+season+'/chapter_'+chapter+'_'+exclusive+'.png');
        } else {
            home.setBackgroundImage('extension/太虚幻境/dlc/'+season+'/chapter_'+chapter+'.png');
        }
        document.body.appendChild(home);
        var homeBody = ui.create.div('.taixuhuanjing_HomeBody3',home);
        var setConsoledeskSize = function(){
            var screenWidth = ui.window.offsetWidth;
            var screenHeight = ui.window.offsetHeight;
            var whr = 1.7;
            var width;
            var height;
            if(screenWidth / whr > screenHeight){
                height = screenHeight;
                width = height * whr;
            }else{
                width = screenWidth;
                height = screenWidth/whr;
            }
            homeBody.style.height = Math.round(height)+"px";
            homeBody.style.width = Math.round(width)+"px";
            homeBody.style.transform = 'translate(-50%,-50%) scale(1)';
        };
        setConsoledeskSize();
        var reConsoledesksize = function(){
            setTimeout(setConsoledeskSize,500);
        };
        lib.onresize.push(reConsoledesksize);
        var name = _status.choiceCharacter;
        var title = ui.create.div('.taixuhuanjing_consoledeskTitle',home);
        var titleText = ui.create.div('.taixuhuanjing_consoledeskTitleText','序章',title);

        var coinBody = ui.create.div('.taixuhuanjing_consoledeskCoinBody',homeBody);
        var coinNum = ui.create.div('.taixuhuanjing_consoledeskCoinNum','X '+lib.config.taixuhuanjing.coin,coinBody);
        coinNum.interval = setInterval(function(){
            if (lib.config.taixuhuanjing==undefined) return;
            coinNum.innerHTML = '🞩 '+lib.config.taixuhuanjing.coin;
        },1000);
        var effectIcon = ui.create.div('.taixuhuanjing_consoledeskEffectIcon',homeBody);
        var effectIcon2 = ui.create.div('.taixuhuanjing_consoledeskEffectIcon2',effectIcon);
        effectIcon2.setBackgroundImage('extension/太虚幻境/image/big_bg/rogue_seed_txhj_'+lib.config.taixuhuanjing.effect+'.png');
        var str = '';
        var skills = game.effectPack[lib.config.taixuhuanjing.effect].skill.slice(0);
        for(var i=0;i<skills.length;i++){
            if(!lib.translate[skills[i]]||!lib.translate[skills[i]+'_info']) {
                skills.remove(skills[i]);
                i--;
                continue;
            }
            if(str!="") str+="<p>";
            str+= "<br>"+get.translation([skills[i]])+":";
            str+=lib.translate[skills[i]+'_info'];
        }
        var effectInfo = ui.create.div('.taixuhuanjing_consoledeskEffectInfo',effectIcon);
        effectInfo.innerHTML = "<p style='color: gold;margin: 2%;'>" + game.effectPack[lib.config.taixuhuanjing.effect].name + "</p>" +"<p style='margin: 2%;'>" + game.effectPack[lib.config.taixuhuanjing.effect].info + "</p>"+"<p style='margin: 2%;'>" + str + "</p>";
        effectIcon.onmouseover = function() {
            effectInfo.style.display = 'block';
        };
        effectIcon.onmouseout = function() {
            effectInfo.style.display = 'none';
        };
        var bottom = ui.create.div('.taixuhuanjing_consoledeskBottom',home);
        var playBody = ui.create.div('.taixuhuanjing_consoledeskPlayBody',homeBody);
        playBody.update = function (){
            playBody.innerHTML = '';
            var intro = lib.character[name];
            if(!intro){
                for(var i in lib.characterPack){
                    if(lib.characterPack[i][name]){
                        intro=lib.characterPack[i][name];
                        break;
                    }
                }
            }
            var playComps = {
                bg:(function(){
                    var bg = ui.create.div('.taixuhuanjing_consoledeskPlayBg');
                    bg.setBackgroundImage('extension/太虚幻境/image/style/name2_'+intro[1]+'.png');
                    return bg;
                })(intro[1]),
                imp:(function(){
                    var imp = ui.create.div('.taixuhuanjing_consoledeskPlayImp1');
                    //修改千幻
                    imp.classList.add("qh-not-replace");
                    //修改
                    imp.setBackground(name,'character');
                    const str = imp.style.backgroundImage;
                    if(lib.device=='ios'||lib.device=='android') {
                        var tmp =  str.split('(')[1].split(')')[0];
                        if(tmp.indexOf('"') > -1) {
                            tmp = tmp.split('"')[1].split('"')[0];
                        }
                    } else {
                        var tmp =  str.split('("')[1].split('")')[0];
                    }
                    var firstPromise = new Promise(function(resolve, reject){
                        var reader = new FileReader();
                        var img = new Image();
                        img.src = lib.assetURL+decodeURI(tmp);
                        if (lib.device=='ios'||lib.device=='android') {
                            img.src = tmp;
                        }
                        var isAlphaBackground = 0;
                        var canvas = document.createElement('canvas');
                        var context = canvas.getContext('2d');
                        img.onload = function () {
                            var originWidth = this.width;
                            var originHeight = this.height;
                            canvas.width = originWidth;
                            canvas.height = originHeight;
                            context.clearRect(0, 0, originWidth, originHeight);
                            context.drawImage(img, 0, 0);
                            isAlphaBackground = 0;
                            var imageData = context.getImageData(0, 0, 50, 50).data;
                            for (var index = 3; index < 100; index += 4) {
                                if (imageData[index] != 255) {
                                    isAlphaBackground++;
                                    if (isAlphaBackground>=25) {
                                        resolve();
                                        break;
                                    }
                                }
                            }
                        };
                    });
                    firstPromise.then(function(successMessage){                         
                        imp.style.backgroundImage = 'none';
                        var imp2 = ui.create.div('.taixuhuanjing_consoledeskPlayImpX',imp);
                        //适配千幻
                     //   imp2.classList.add("qh-not-replace");
                        //
                        imp2.setBackground(name,'character');
                    });
                    return imp;
                })(intro[1]),
                namebody: (function(name){
                    var info = lib.translate[name];
                    var namebody = ui.create.div(".taixuhuanjing_consoledeskPlayName",info);
                    return namebody;
                })(name),
                playHp: (function(hp){
                    var playHp = ui.create.div('.taixuhuanjing_consoledeskPlayHpBox'); 
                    var hp = lib.config.taixuhuanjing.hp;
                    var maxHp = lib.config.taixuhuanjing.maxHp;
                    if (hp<6&&maxHp<6) {
                        var num = maxHp - hp;
                        while(hp--){
                            var tmp = ui.create.div(".taixuhuanjing_consoledeskPlayHpICON",playHp);
                            if (lib.config.taixuhuanjing.hp>2) {
                                tmp.setBackgroundImage('extension/太虚幻境/image/style/glass1.png');
                            } else if (lib.config.taixuhuanjing.hp>1) {
                                tmp.setBackgroundImage('extension/太虚幻境/image/style/glass2.png');
                            } else if (lib.config.taixuhuanjing.hp>0) {
                                tmp.setBackgroundImage('extension/太虚幻境/image/style/glass3.png');
                            } 
                        }
                        while(num--){
                            var tmp = ui.create.div(".taixuhuanjing_consoledeskPlayHpICON",playHp);
                            tmp.setBackgroundImage('extension/太虚幻境/image/style/glass4.png');
                        }
                    } else {
                        var tmp = ui.create.div(".taixuhuanjing_consoledeskPlayHpICON2",playHp);
                        tmp.setBackgroundImage('extension/太虚幻境/image/style/glass1.png');
                        var numbody = ui.create.div(".taixuhuanjing_consoledeskPlayHpNum",hp+'',playHp);
                        numbody.innerHTML = hp+'<br>/<br>'+maxHp;
                    }
                    return playHp;
                })(intro[2]),
                playType:(function(){
                    var playType = ui.create.div('.taixuhuanjing_lookEventHomePlayType2');
                    playType.setBackgroundImage('extension/太虚幻境/image/style/identity_gameme.png');
                    return playType;
                })(),
            };
            for(var i in playComps){
                playBody.appendChild(playComps[i]);
            }
        };
        playBody.oncontextmenu = function(e){
            game.txhj_playAudioCall('WinButton',null,true);
            game.pause2();
            ui.click.charactercard(name,null,null,true,this);
            event.cancelBubble = true;
            event.returnValue = false;
            return false;           
        };
        var skillBox = ui.create.div('.taixuhuanjing_consoledeskSkillBox',homeBody);
        var skillBody = ui.create.div('.taixuhuanjing_consoledeskSkillBody',skillBox);
        lib.setScroll(skillBody);
        skillBody.Update = function(){
            skillBody.innerHTML = '';
            var skills = lib.config.taixuhuanjing.skills.slice(0);
            var max = lib.config.taixuhuanjing.maxSkills;
            var useSkills = lib.config.taixuhuanjing.useSkills.slice(0);
            useSkills.reverse();/*倒序排列*/
            function funcSkill(){
                var div = ui.create.div('.taixuhuanjing_consoledeskSkillDiv');
                if (useSkills.length&&(useSkills.length-1)==max) {
                    var skill = useSkills.shift();
                    div.setBackgroundImage('extension/太虚幻境/image/icon/icon_skill_true.png');
                    var skillName = get.translation(skill);
                    var divText2 = ui.create.div('.taixuhuanjing_consoledeskSkillDivText2',''+skillName+'',div);
                    var divText3 = ui.create.div('.taixuhuanjing_consoledeskSkillDivText3',''+skillName+'',div);

                    var skillInfo = lib.translate[skill+'_info'];
                    var desc = ui.create.div('.taixuhuanjing_skillInfoDesc');
                    document.body.appendChild(desc);
                    desc.innerHTML = "<p style='color: gold;margin: 2%;'>" + skillName + "</p>" +"<p style='margin: 2%;'>" + skillInfo + "</p>";
                } else {
                    var divText = ui.create.div('.taixuhuanjing_consoledeskSkillDivText1','技能槽',div);
                }
                div.onclick = function () {
                    game.txhj_playAudioCall('raw_equip',null,true);
                    game.lookSkill(home,true);
                }
                div.addEventListener("click",function(){
                    event.cancelBubble = true;
                    event.returnValue = false; 
                    return false;    
                });
                div.onmouseover = function(e) {
                    if (!skill||!desc) return;
                    desc.style.display = "block";
                };
                div.onmouseout = function() {
                    if (!skill||!desc) return;
                    desc.style.display = "none";
                };

                return div;
            };
            while(max--){
                skillBody.appendChild(funcSkill());
            };
        };

        var servantBox = ui.create.div('.taixuhuanjing_consoledeskServantBox',homeBody);
        servantBox.Update = function(){
            servantBox.innerHTML = '';
            var servantDiv = ui.create.div('.taixuhuanjing_consoledeskServantDiv',servantBox);
            var servantName = ui.create.div('.taixuhuanjing_consoledeskServantName','侍灵',servantBox);
            servantDiv.onclick = function () {
                txhj.servant.randomPlayAction();
            }
            if (!txhj.servant) {
                txhj.servant = new Servant(lib.config.taixuhuanjing.servant,window.dcdAnim ? false : true);
            }
            servantName.innerHTML = txhj.servant.textName;
            txhj.servant.consoledeskPlay(servantDiv);
        };

        var attributeBox = ui.create.div('.taixuhuanjing_consoledeskAttributeBox',homeBody);
        attributeBox.update = function (){
            attributeBox.innerHTML = '';
            var attributeComps = {
                attributeBody1:(function(){
                    var attributeBody1 = ui.create.div('.taixuhuanjing_consoledeskAttributeBody1');
                    function funcAttribute(text){
                        var div = ui.create.div('.taixuhuanjing_consoledeskAttributeBody1Div');
                        var divText = ui.create.div('.taixuhuanjing_consoledeskAttributeBody1DivText',div);
                        var divText2 = ui.create.div('.taixuhuanjing_consoledeskAttributeBody1DivText2',div);
                        var str1 = '<span style="color:#916843;">'+text+': </span>';
                        var str2 = '';
                        if (text=='初始手牌数') {
                            str2 = lib.config.taixuhuanjing.minHs;
                        } else if (text=='手牌上限') {
                            str2 = lib.config.taixuhuanjing.hp + lib.config.taixuhuanjing.maxHs;
                        } else if (text=='调度次数') {
                            str2 = lib.config.taixuhuanjing.adjust;
                        } else if (text=='造型加成') {
                            str2 = '0%';
                        }
                        divText.innerHTML = str1;
                        divText2.innerHTML = str2;

                        return div;
                    };
                    var list = ['初始手牌数','手牌上限','调度次数','造型加成'];
                    while(list.length){
                        attributeBody1.appendChild(funcAttribute(list.shift()));
                    }
                    return attributeBody1;
                })(),
                attributeBody2:(function(){
                    var attributeBody2 = ui.create.div('.taixuhuanjing_consoledeskAttributeBody2');
                    lib.setScroll(attributeBody2);
                    attributeBody2.onmousewheel=function(evt){
                        var node=this;
                        var num=20;
                        var speed=20;
                        clearInterval(node.interval);
                        evt.preventDefault();
                        if(evt.detail > 0 || evt.wheelDelta < 0){
                            node.interval=setInterval(function(){
                                if(num--&&Math.abs(node.scrollLeft+node.clientWidth-node.scrollWidth)>0){
                                    node.scrollLeft +=speed;
                                }
                                else{
                                    clearInterval(node.interval);
                                }
                            },16);
                        }
                        else{
                            node.interval=setInterval(function(){
                                if(num--&&node.scrollLeft>0){
                                    node.scrollLeft -=speed;
                                }
                                else{
                                    clearInterval(node.interval);
                                }
                            },16);
                        }
                    };
                    function funcAttribute(card){
                        var div = ui.create.div('.taixuhuanjing_consoledeskAttributeBody2Div');
                        if (lib.config.taixuhuanjing.cards.length>5) {
                            div.style.margin = '0% -35% 0% 0%';
                        } else if (lib.config.taixuhuanjing.cards.length>2) {
                            div.style.margin = '0% -30% 0% 0%';
                        }
                        var card2 = game.createCard(card);
                        card2.style.width = '95%';
                        card2.style.height = '95%';
                        card2.style.zIndex = 1;
                        card2.style["transform-origin"] = "center center";
                        div.appendChild(card2);
                        var divImp = ui.create.div('.taixuhuanjing_consoledeskAttributeBody2Imp',div);
                        var divText = ui.create.div('.taixuhuanjing_consoledeskAttributeBody2Text',divImp);
                        var cardnum = card.number||'';
                        if([1,11,12,13].contains(cardnum)){
                            cardnum={'1':'A','11':'J','12':'Q','13':'K'}[cardnum]
                        }
                        divText.innerHTML = cardnum+'<br>'+lib.translate[card.suit];
                        if (card.suit=='heart'||card.suit=='diamond') {
                            divText.style.color = 'rgb(255,0,0)';
                        }
                        var cardImp = function (card){
                            var src = lib.card[card.name].image;
                            if (src) {
                                if (src.indexOf('ext:') == 0) {
                                    src=src.replace(/ext:/, 'extension/');
                                }
                                divImp.setBackgroundImage(src);
                            } else {
                                var img=new Image();
                                img.src=lib.assetURL+'image/card/'+card.name+'.png';
                                img.onload=function(){
                                    divImp.setBackgroundImage('image/card/'+card.name+'.png');
                                }
                                img.onerror=function(){
                                    divImp.setBackgroundImage('image/card/'+card.name+'.png')
                                    if (card.name=='yuheng_plus'||card.name=='yuheng_pro') {
                                        divImp2.setBackgroundImage('image/card/yuheng.png');
                                    }
                                }
                            }
                        };
                        if(lib.config['extension_'+'十周年UI'+'_enable']){
                            var type=lib.config['extension_'+'十周年UI'+'_cardPrettify'];
                            type=type?'.'+type:'.jpg';
                            var img=new Image();
                            img.src = lib.assetURL+'extension/十周年UI/image/card/'+card.name+type;
                            img.onload=function(){
                                divImp.setBackgroundImage('extension/十周年UI/image/card/'+card.name+type)
                            }
                            img.onerror=function(){
                                cardImp(card);
                            }
                        } else {
                            cardImp(card);
                        }
                        return div;
                    };
                    var cards = lib.config.taixuhuanjing.cards.slice(0);
                    var list = [].concat(cards);
                    while(list.length){
                        attributeBody2.appendChild(funcAttribute(list.shift()));
                    };
                    if (lib.config.taixuhuanjing.cards.length>7) {
                        attributeBody2.style.boxShadow = '0 0 5px 3px rgba(80,80,80,0.65)';
                        var shadow = ui.create.div('.taixuhuanjing_consoledeskAttributeBody2Shadow',attributeBox);
                    }
                    return attributeBody2;
                })(),
                attributeBody3:(function(){
                    var attributeBody3 = ui.create.div('.taixuhuanjing_consoledeskAttributeBody3');
                    function funcAttribute(text){
                        var div = ui.create.div('.taixuhuanjing_consoledeskAttributeBody3Div');
                        var str = text;
                        var str2 = '';
                        var equipInfo1;
                        var equipInfo2;
                        if (text=='武器栏'&&lib.config.taixuhuanjing.equip1!=null) {
                            if (lib.config.taixuhuanjing.equip1.suit=='heart'||lib.config.taixuhuanjing.equip1.suit=='diamond') {
                                str = '<span style=\"color: red\">'+lib.translate[lib.config.taixuhuanjing.equip1.suit]+'</span>';
                            } else {
                                str = '<span style=\"color: #bffff9\">'+lib.translate[lib.config.taixuhuanjing.equip1.suit]+'</span>';
                            }
                            if (lib.config.taixuhuanjing.buff.contains('buff_txhj_majundegaizao')) {
                                if (lib.config.taixuhuanjing.equip1.name=='zhuge') {
                                    lib.config.taixuhuanjing.equip1.name = 'rewrite_zhuge';
                                    var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                                }
                            }
                            str += lib.config.taixuhuanjing.equip1.number + get.translation(lib.config.taixuhuanjing.equip1.name);
                            equipInfo1 = get.translation(lib.config.taixuhuanjing.equip1.name);
                            equipInfo2 = lib.translate[lib.config.taixuhuanjing.equip1.name+'_info'];
                        } else if (text=='防具栏'&&lib.config.taixuhuanjing.equip2!=null) {
                            if (lib.config.taixuhuanjing.equip2.suit=='heart'||lib.config.taixuhuanjing.equip2.suit=='diamond') {
                                str = '<span style=\"color: red\">'+lib.translate[lib.config.taixuhuanjing.equip2.suit]+'</span>';
                            } else {
                                str = '<span style=\"color: #bffff9\">'+lib.translate[lib.config.taixuhuanjing.equip2.suit]+'</span>';
                            }
                            if (lib.config.taixuhuanjing.buff.contains('buff_txhj_majundegaizao')) {
                                if (lib.config.taixuhuanjing.equip2.name=='lanyinjia') {
                                    lib.config.taixuhuanjing.equip2.name = 'rewrite_lanyinjia';
                                    var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                                } else if (lib.config.taixuhuanjing.equip2.name=='tengjia') {
                                    lib.config.taixuhuanjing.equip2.name = 'rewrite_tengjia';
                                    var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                                } else if (lib.config.taixuhuanjing.equip2.name=='baiyin') {
                                    lib.config.taixuhuanjing.equip2.name = 'rewrite_baiyin';
                                    var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                                } else if (lib.config.taixuhuanjing.equip2.name=='bagua') {
                                    lib.config.taixuhuanjing.equip2.name = 'rewrite_bagua';
                                    var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                                } else if (lib.config.taixuhuanjing.equip2.name=='renwang') {
                                    lib.config.taixuhuanjing.equip2.name = 'rewrite_renwang';
                                    var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                                }
                            }
                            str +=  lib.config.taixuhuanjing.equip2.number + get.translation(lib.config.taixuhuanjing.equip2.name);
                            equipInfo1 = get.translation(lib.config.taixuhuanjing.equip2.name);
                            equipInfo2 = lib.translate[lib.config.taixuhuanjing.equip2.name+'_info'];
                        } else if (text=='宝物栏1'&&lib.config.taixuhuanjing.equip3!=null) {
                            if (lib.config.taixuhuanjing.equip3.suit=='heart'||lib.config.taixuhuanjing.equip3.suit=='diamond') {
                                str = '<span style=\"color: red\">'+lib.translate[lib.config.taixuhuanjing.equip3.suit]+'</span>';
                            } else {
                                str = '<span style=\"color: #bffff9\">'+lib.translate[lib.config.taixuhuanjing.equip3.suit]+'</span>';
                            }
                            str +=  lib.config.taixuhuanjing.equip3.number + get.translation(lib.config.taixuhuanjing.equip3.name);
                            equipInfo1 = get.translation(lib.config.taixuhuanjing.equip3.name);
                            equipInfo2 = lib.translate[lib.config.taixuhuanjing.equip3.name+'_info'];
                        } else if (text=='宝物栏2'&&lib.config.taixuhuanjing.equip4!=null) {
                            if (lib.config.taixuhuanjing.equip4.suit=='heart'||lib.config.taixuhuanjing.equip4.suit=='diamond') {
                                str = '<span style=\"color: red\">'+lib.translate[lib.config.taixuhuanjing.equip4.suit]+'</span>';
                            } else {
                                str = '<span style=\"color: #bffff9\">'+lib.translate[lib.config.taixuhuanjing.equip4.suit]+'</span>';
                            }
                            str +=  lib.config.taixuhuanjing.equip4.number + get.translation(lib.config.taixuhuanjing.equip4.name);
                            equipInfo1 = get.translation(lib.config.taixuhuanjing.equip4.name);
                            equipInfo2 = lib.translate[lib.config.taixuhuanjing.equip4.name+'_info'];
                        }
                        if (equipInfo1&&equipInfo2) {
                            var desc = ui.create.div('.taixuhuanjing_equipInfoDesc');
                            document.body.appendChild(desc);
                            desc.innerHTML = "<p style='color: gold;margin: 2%;'>" + equipInfo1 + "</p>" +"<p style='margin: 2%;'>" + equipInfo2 + "</p>";
                        }
                        div.addEventListener("click",function(){
                            game.txhj_playAudioCall('raw_equip',null,true);
                            game.lookEquip(home,true);
                            event.cancelBubble = true;
                            event.returnValue = false; 
                            return false;    
                        });
                        div.onmouseover = function() {
                            if (!desc) return;
                            desc.style.display = "block";
                        };
                        div.onmouseout = function() {
                            if (!desc) return;
                            desc.style.display = "none";
                        };
                        div.innerHTML = ''+str+'';
                        return div;
                    };
                    var list = ['武器栏','防具栏','宝物栏1','宝物栏2'];
                    while(list.length){
                        attributeBody3.appendChild(funcAttribute(list.shift()));
                    };
                    return attributeBody3;
                })(),
                attributeBody4:(function(){
                    var attributeBody4 = ui.create.div('.taixuhuanjing_consoledeskAttributeBody4');
                    attributeBody4.innerHTML = '等级:'+lib.config.taixuhuanjing.level;
                    return attributeBody4;
                })(),
                attributeBody5:(function(){
                    var attributeBody5 = ui.create.div('.taixuhuanjing_consoledeskAttributeBody5');
                    var attributeBody5Imp = ui.create.div('.taixuhuanjing_consoledeskAttributeBody5Imp',attributeBody5);
                    var num = lib.config.taixuhuanjing.exp;
                    var max = lib.config.taixuhuanjing.maxExp;
                    var winrate = Math.round(num/max*10000)/100;
                    if (winrate<1) winrate = 1;
                    attributeBody5Imp.style.width = ""+winrate+"%";
                    var attributeBody5Div = ui.create.div('.taixuhuanjing_consoledeskAttributeBody5Div',attributeBody5);
                    attributeBody5Div.innerHTML = num+'/'+max;
                    return attributeBody5;
                })(),
            }
            for(var i in attributeComps){
                attributeBox.appendChild(attributeComps[i]);
            }
        };
        var buffBox = ui.create.div('.taixuhuanjing_consoledeskbuffBox',homeBody);
        buffBox.Update = function(){
            buffBox.innerHTML = '';
            function funcbuff(id){
                var div = ui.create.div('#taixuhuanjing_consoledeskBuffDiv');
                div.setBackgroundImage('extension/太虚幻境/image/buff/'+id+'.png');
                window.txhjBuffIcon(div);
                var infobody = ui.create.div('.taixuhuanjing_consoledeskbuffDivInfobody',div);
                var buff = game.buffPack[id];
                var desc = document.createElement("div");
                desc.classList.add("SLBuffDesc");
                desc.innerHTML = "<p style='color: gold;margin: 2%;'>" + buff.name + "</p>" +
                "<p style='margin: 2%;'>" + buff.info + "</p>";
                desc.style.display = "none";
                div.desc = desc;
                document.body.appendChild(desc);
                div.addEventListener("click",function(){
                    event.cancelBubble = true;
                    event.returnValue = false; 
                    return false;    
                });
                div.onmouseover = function() {
                    div.style.zIndex = '10';
                    this.desc.style.display = "block";
                };
                div.onmouseout = function() {
                    div.style.zIndex = '1';
                    this.desc.style.display = "none";
                };
                return div;
            };
           /* var descobj = txhj.servantData.skillDesc[lib.config.taixuhuanjing.servant];
            var objkeys = Object.keys(descobj);
            for (const objkey of objkeys) {
                if (!lib.config.taixuhuanjing.buff.contains(objkey)) {
                    lib.config.taixuhuanjing.buff.push(objkey);
                }
            } */
            var descobj = txhj.servantData.skillDesc[lib.config.taixuhuanjing.servant];
            if (descobj !== undefined && descobj !== null && typeof descobj === 'object') {
                var objkeys = Object.keys(descobj);
            if (lib.config.taixuhuanjing.buff === undefined || lib.config.taixuhuanjing.buff === null || !Array.isArray(lib.config.taixuhuanjing.buff)) {
                lib.config.taixuhuanjing.buff = [];
            }
            for (const objkey of objkeys) {
                if (!lib.config.taixuhuanjing.buff.includes(objkey)) {
                lib.config.taixuhuanjing.buff.push(objkey);
                }
            }
            }
            var list1 = lib.config.taixuhuanjing.buff.slice(0);
            var list2 = [];
            while(list2.length<8&&list1.length){
                list2.push(list1.shift());
                if (list2.length>=8) {
                    var buffbody = ui.create.div('.taixuhuanjing_consoledeskbuffBody',buffBox);
                    while(list2.length){
                        buffbody.appendChild(funcbuff(list2.shift()));
                    };
                } else if (!list1.length) {
                    var buffbody = ui.create.div('.taixuhuanjing_consoledeskbuffBody',buffBox);
                    while(list2.length){
                        buffbody.appendChild(funcbuff(list2.shift()));
                    };
                } 
            }
        };

        var eventBox = ui.create.div('.taixuhuanjing_consoledeskEventBox',homeBody);
        var eventTop = ui.create.div('.taixuhuanjing_consoledeskEventTop',homeBody);
        var eventTopImp = ui.create.div('.taixuhuanjing_consoledeskEventTopImp',eventTop);
        var eventTopBoss = ui.create.div('.taixuhuanjing_consoledeskEventTopBoss',eventTop);
        var eventTopStore = ui.create.div('.taixuhuanjing_consoledeskEventTopStore',eventTop);
        eventTopStore.style.display = 'none';
        var rankBody = ui.create.div('.taixuhuanjing_consoledeskRunkBody',homeBody);
        var rankText = ui.create.div('.taixuhuanjing_consoledeskRunkText',rankBody);
        var rankTextInfo = ui.create.div('.taixuhuanjing_consoledeskRunkTextInfo',rankBody);
        rankBody.onmouseover = function(e) {
            rankTextInfo.style.display = 'block';
            if (lib.config.taixuhuanjing.rank==1) {
                rankTextInfo.innerHTML = "<p style='color: #fff;margin: 2%;'>"+'每超出敌人1级，其额外+1体力及体力上限'+"</p>";
            } else if (lib.config.taixuhuanjing.rank==2) {
                rankTextInfo.innerHTML = "<p style='color: #fff;margin: 2%;'>"+'敌人额外+1体力及体力上限；每超出敌人1级，其额外+2体力及体力上限'+"</p>";
            } else if (lib.config.taixuhuanjing.rank==3) {
                rankTextInfo.innerHTML = "<p style='color: #fff;margin: 2%;'>"+'敌人额外+1体力及体力上限并拥有技能英姿与马术，每超出敌人1级，其额外+2体力及体力上限；你的体力上限-1'+"</p>";
            } else if (lib.config.taixuhuanjing.rank==4) {
                rankTextInfo.innerHTML = "<p style='color: #fff;margin: 2%;'>"+'敌人额外+1体力及体力上限并拥有技能英姿与马术，装备一件随机武器；每超出敌人1级，其额外+2体力及体力上限；你的体力上限-1'+"</p>";
            } else if (lib.config.taixuhuanjing.rank==5) {
                rankTextInfo.innerHTML = "<p style='color: #fff;margin: 2%;'>"+'敌人额外+1体力及体力上限并拥有技能英姿与马术，装备一件随机武器；每超出敌人1级，其额外+2体力及体力上限；你的体力上限-1并获得鏖战祝福'+"</p>";
            }
        };
        rankBody.onmouseout = function() {
            rankTextInfo.style.display = 'none';
        };

        eventBox.Update = function(){
            eventBox.innerHTML = '';
            var update = function(){
                var rank = lib.config.taixuhuanjing.rank;
                var season = lib.config.taixuhuanjing.season;
                var chapter = lib.config.taixuhuanjing.chapter;
                lib.config.taixuhuanjing.eventMin = 0 + lib.config.taixuhuanjing.optionalExam.length;
                lib.config.taixuhuanjing.eventMax = game.seasonPack[season][chapter].procedure.length;
                var procedure = game.seasonPack[season][chapter].procedure.slice(0);
                
                lib.config.taixuhuanjing.procedure = [];
                while(procedure.length){
                    var type = procedure.shift();
                    if (type=='side'||type=='main'||type=='micheng'||type=='boss'||type=='Ultimate') {
                        var event = game.randomBattle(type) 
                        if (event) {
                            lib.config.taixuhuanjing.procedure.push(event);
                        }
                    } else {
                        var event = game.randomEvent(type);
                        if (event) {
                            lib.config.taixuhuanjing.procedure.push(event);
                        }
                    }
                }

                var optional = 0;
                if(lib.config.taixuhuanjing.optional1 == null&&lib.config.taixuhuanjing.procedure.length){
                    optional++;
                    lib.config.taixuhuanjing.optional1 = lib.config.taixuhuanjing.procedure.shift();
                    lib.config.taixuhuanjing.eventMin++;
                    if (lib.config.taixuhuanjing.optional1.type=='exam1'||lib.config.taixuhuanjing.optional1.type=='exam2'||lib.config.taixuhuanjing.optional1.type=='exam3'||lib.config.taixuhuanjing.optional1.type=='exam4') {
                        if (!lib.config.taixuhuanjing.optionalExam.contains(lib.config.taixuhuanjing.optional1.id)) {
                            lib.config.taixuhuanjing.optionalExam.push(lib.config.taixuhuanjing.optional1.id);
                        }
                    }
                }
                if(lib.config.taixuhuanjing.optional2 == null&&lib.config.taixuhuanjing.procedure.length){
                    optional++;
                    lib.config.taixuhuanjing.optional2 = lib.config.taixuhuanjing.procedure.shift();
                    lib.config.taixuhuanjing.eventMin++;
                    if (lib.config.taixuhuanjing.optional2.type=='exam1'||lib.config.taixuhuanjing.optional2.type=='exam2'||lib.config.taixuhuanjing.optional2.type=='exam3'||lib.config.taixuhuanjing.optional2.type=='exam4') {
                        if (!lib.config.taixuhuanjing.optionalExam.contains(lib.config.taixuhuanjing.optional2.id)) {
                            lib.config.taixuhuanjing.optionalExam.push(lib.config.taixuhuanjing.optional2.id);
                        }
                    }
                }
                if(lib.config.taixuhuanjing.optional3 == null&&lib.config.taixuhuanjing.procedure.length){
                    optional++;
                    lib.config.taixuhuanjing.optional3 = lib.config.taixuhuanjing.procedure.shift();
                    lib.config.taixuhuanjing.eventMin++;
                    if (lib.config.taixuhuanjing.optional3.type=='exam1'||lib.config.taixuhuanjing.optional3.type=='exam2'||lib.config.taixuhuanjing.optional3.type=='exam3'||lib.config.taixuhuanjing.optional3.type=='exam4') {
                        if (!lib.config.taixuhuanjing.optionalExam.contains(lib.config.taixuhuanjing.optional3.id)) {
                            lib.config.taixuhuanjing.optionalExam.push(lib.config.taixuhuanjing.optional3.id);
                        }
                    }
                } 
                var str = '';
                var str2 = '普通难度';
                if (rank==2) {
                    str2 = '困难难度';
                } else if (rank==3) {
                    str2 = '噩梦难度';
                } else if (rank==4) {
                    str2 = '炼狱难度';
                } else if (rank==5) {
                    str2 = '血战难度';
                }
                str += game.seasonPack[season][chapter].name +' '+ game.seasonPack[season][chapter].info + ' ';
                rankText.innerHTML = str2;
                titleText.innerHTML = str + lib.config.taixuhuanjing.eventMin+'/'+ lib.config.taixuhuanjing.eventMax;
                var num = lib.config.taixuhuanjing.eventMin;
                var max = lib.config.taixuhuanjing.eventMax;
                var winrate = Math.round(num/max*10000)/100;
                if (winrate<1) winrate = 1;
                eventTopImp.style.width = ""+winrate+"%";
                var store1 = 0;
                var store2;
                var procedure = game.seasonPack[season][chapter].procedure.slice(0);
                if (procedure.contains('store')) {
                    eventTopStore.style.display = 'block';
                    while(procedure.length){
                        var type = procedure.shift();
                        if (!store2&&type!='store') {
                            store1++;
                        } else {
                            store2 = true;
                        }
                    }
                    var winrate2 = Math.round(store1/max*10000)/100;
                    eventTopStore.style.left =  ""+winrate2+"%";
                }
                var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
            };
            var update2 = function(){
                var rank = lib.config.taixuhuanjing.rank;
                var season = lib.config.taixuhuanjing.season;
                var chapter = lib.config.taixuhuanjing.chapter;
                var optional = 0;
                if(lib.config.taixuhuanjing.optional1 == null&&lib.config.taixuhuanjing.procedure.length){
                    optional++;
                    lib.config.taixuhuanjing.optional1 = lib.config.taixuhuanjing.procedure.shift();
                    lib.config.taixuhuanjing.eventMin++;
                    if (lib.config.taixuhuanjing.optional1.type=='exam1'||lib.config.taixuhuanjing.optional1.type=='exam2'||lib.config.taixuhuanjing.optional1.type=='exam3'||lib.config.taixuhuanjing.optional1.type=='exam4') {
                        if (!lib.config.taixuhuanjing.optionalExam.contains(lib.config.taixuhuanjing.optional1.id)) {
                            lib.config.taixuhuanjing.optionalExam.push(lib.config.taixuhuanjing.optional1.id);
                        }
                    }

                }
                if(lib.config.taixuhuanjing.optional2 == null&&lib.config.taixuhuanjing.procedure.length){
                    optional++;
                    lib.config.taixuhuanjing.optional2 = lib.config.taixuhuanjing.procedure.shift();
                    lib.config.taixuhuanjing.eventMin++;
                    if (lib.config.taixuhuanjing.optional2.type=='exam1'||lib.config.taixuhuanjing.optional2.type=='exam2'||lib.config.taixuhuanjing.optional2.type=='exam3'||lib.config.taixuhuanjing.optional2.type=='exam4') {
                        if (!lib.config.taixuhuanjing.optionalExam.contains(lib.config.taixuhuanjing.optional2.id)) {
                            lib.config.taixuhuanjing.optionalExam.push(lib.config.taixuhuanjing.optional2.id);
                        }
                    }
                }
                if(lib.config.taixuhuanjing.optional3 == null&&lib.config.taixuhuanjing.procedure.length){
                    optional++;
                    lib.config.taixuhuanjing.optional3 = lib.config.taixuhuanjing.procedure.shift();
                    lib.config.taixuhuanjing.eventMin++;
                    if (lib.config.taixuhuanjing.optional3.type=='exam1'||lib.config.taixuhuanjing.optional3.type=='exam2'||lib.config.taixuhuanjing.optional3.type=='exam3'||lib.config.taixuhuanjing.optional3.type=='exam4') {
                        if (!lib.config.taixuhuanjing.optionalExam.contains(lib.config.taixuhuanjing.optional3.id)) {
                            lib.config.taixuhuanjing.optionalExam.push(lib.config.taixuhuanjing.optional3.id);
                        }
                    }
                } 
                if (optional>0) {
                    var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                }
                var str = '';
                var str2 = '普通难度';
                if (rank==2) {
                    str2 = '困难难度';
                } else if (rank==3) {
                    str2 = '噩梦难度';
                } else if (rank==4) {
                    str2 = '炼狱难度';
                } else if (rank==5) {
                    str2 = '血战难度';
                }
                str += game.seasonPack[season][chapter].name +' '+ game.seasonPack[season][chapter].info + ' ';
                rankText.innerHTML = str2;
                titleText.innerHTML = str + lib.config.taixuhuanjing.eventMin+'/'+ lib.config.taixuhuanjing.eventMax;
                var num = lib.config.taixuhuanjing.eventMin;
                var max = lib.config.taixuhuanjing.eventMax;
                var winrate = Math.round(num/max*10000)/100;
                if (winrate<1) winrate = 1;
                eventTopImp.style.width = ""+winrate+"%";
                var store1 = 0;
                var store2;
                var procedure = game.seasonPack[season][chapter].procedure.slice(0);
                if (procedure.contains('store')) {
                    eventTopStore.style.display = 'block';
                    while(procedure.length){
                        var type = procedure.shift();
                        if (!store2&&type!='store') {
                            store1++;
                        } else {
                            store2 = true;
                        }
                    }
                    var winrate2 = Math.round(store1/max*10000)/100;
                    eventTopStore.style.left =  ""+winrate2+"%";
                }
            };
            if (lib.config.taixuhuanjing.procedure!=null) {
                update2();
            } else {
                update();
            }
            function funcBoss(node,side){
                var div = ui.create.div('.taixuhuanjing_consoledeskEventDiv');
                var eventNode = {
                    id:node.id,
                    season:lib.config.taixuhuanjing.season || lib.config.taixuhuanjing.season,
                    chapter:lib.config.taixuhuanjing.chapter,
                };
                var divComps = {
                    divImp:(function(){
                        var divImp = ui.create.div('.taixuhuanjing_consoledeskEventDivImp');
                        divImp.setBackgroundImage('extension/太虚幻境/image/big_bg/rogue_main_'+node.ext+'.png');
                        return divImp;
                    })(),
                    divRound:(function(){
                        var divRound = ui.create.div('.taixuhuanjing_consoledeskEventDivRound');
                        return divRound;
                    })(),
                    divName:(function(){
                        var divName = ui.create.div('.taixuhuanjing_consoledeskEventDivName',node.name+'');
                        return divName;
                    })(),
                    divType:(function(){
                        var divType = ui.create.div('.taixuhuanjing_consoledeskEventDivType','事件');
                        divType.style.color = '#9b8657';
                        return divType;
                    })(),
                    divLine:(function(){
                        var divLine = ui.create.div('.taixuhuanjing_consoledeskEventDivLine');
                        return divLine;
                    })(),
                    divInfo:(function(){
                        var divInfo = ui.create.div('.taixuhuanjing_consoledeskEventDivInfo',node.info+'');
                        return divInfo;
                    })(),
                    divButton:(function(){
                        var divButton = ui.create.div('.taixuhuanjing_consoledeskEventDivButton','查看');
                        divButton.addEventListener("click",function(){
                            game.txhj_playAudioCall('WinButton',null,true);
                            game.lookBoss(eventNode,home);
                            event.cancelBubble = true;
                            event.returnValue = false; 
                            return false;
                        });
                        return divButton;
                    })(),
                }
                for(var i in divComps){
                    div.appendChild(divComps[i]);
                }
                return div;
            };
            function funcEvent(node,side){
                var div = ui.create.div('.taixuhuanjing_consoledeskEventDiv3');
                div.update = function (node) {
                    div.innerHTML = '';
                    div.style.opacity = '1';
                    var eventNode = {
                        id:node.id,
                        seat:node.seat,
                        name:node.name,
                        type:node.type,
                        info:node.info,
                        text:node.text,
                        level:node.level,
                        change:node.change||false,
                        season:lib.config.taixuhuanjing.season || lib.config.taixuhuanjing.season,
                        chapter:lib.config.taixuhuanjing.chapter,
                        buttons:node.buttons,
                        ext:node.ext,
                    };
                    var divComps = {
                        divImp:(function(){
                            var divImp = ui.create.div('.taixuhuanjing_consoledeskEventDivImp');
                            divImp.setBackgroundImage('extension/太虚幻境/image/big_bg/rogue_main_'+node.ext+'.png');
                            return divImp;
                        })(),
                        divRound:(function(){
                            var divRound = ui.create.div('.taixuhuanjing_consoledeskEventDivRound');
                            return divRound;
                        })(),
                        divName:(function(){
                            var divName = ui.create.div('.taixuhuanjing_consoledeskEventDivName',node.name+'');
                            divName.style.color = '#5a3327';
                            return divName;
                        })(),
                        divType:(function(){
                            var divType = ui.create.div('.taixuhuanjing_consoledeskEventDivType','事件');
                            return divType;
                        })(),
                        divLine:(function(){
                            var divLine = ui.create.div('.taixuhuanjing_consoledeskEventDivLine');
                            return divLine;
                        })(),
                        divInfo:(function(){
                            var divInfo = ui.create.div('.taixuhuanjing_consoledeskEventDivInfo',node.info+'');
                            divInfo.style.color = '#363636';
                            return divInfo;
                        })(),
                        divOff:(function(){
                            var divOff = ui.create.div('.taixuhuanjing_consoledeskEventDivOff');
                            if (node.type=='side'||node.type=='main'||node.type=='micheng'||node.type=='choose'||node.type=='boss'||node.type=='Ultimate') {
                                divOff.style.pointerEvents = 'none';
                                divOff.style.display = 'none';
                            };
                            divOff.addEventListener("click",function(){
                                game.txhj_playAudioCall('off',null,true);
                                div.number = 0;
                                if (get.eventState(eventNode)!=true) {
                                    lib.config.taixuhuanjing.skip.push(eventNode);
                                    lib.config.taixuhuanjing.events.push(eventNode);
                                    if(lib.config.taixuhuanjing.optional1 != null){
                                        var optional = lib.config.taixuhuanjing.optional1;
                                        if (optional.id==node.id&&optional.seat==node.seat) {
                                            lib.config.taixuhuanjing.optional1 = null;
                                            div.number = 1;
                                        }
                                    }
                                    if(lib.config.taixuhuanjing.optional2 != null){
                                        var optional = lib.config.taixuhuanjing.optional2;
                                        if (optional.id==node.id&&optional.seat==node.seat) {
                                            lib.config.taixuhuanjing.optional2 = null;
                                            div.number = 2;
                                        }
                                    }
                                    if(lib.config.taixuhuanjing.optional3 != null){
                                        var optional = lib.config.taixuhuanjing.optional3;
                                        if (optional.id==node.id&&optional.seat==node.seat) {
                                            lib.config.taixuhuanjing.optional3 = null;
                                            div.number = 3;
                                        }
                                    }
                                    var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                                };
                                div.innerHTML = '';
                                div.style.backgroundImage = 'none';
                                if (lib.config.taixuhuanjing.procedure!=null) {
                                    update2();
                                } else {
                                    update();
                                }
                                setTimeout(function(){
                                    if (div.number>0) {
                                        if(lib.config.taixuhuanjing['optional'+div.number] != null&&(lib.config.taixuhuanjing['optional'+div.number].type=='boss'||lib.config.taixuhuanjing['optional'+div.number].type=='Ultimate')){
                                            eventBox.removeChild(div);
                                            var node2 = lib.config.taixuhuanjing['optional'+div.number];
                                            eventBox.appendChild(funcBoss(node2));
                                        } else if(lib.config.taixuhuanjing['optional'+div.number] != null&&lib.config.taixuhuanjing['optional'+div.number].type!='boss'&&lib.config.taixuhuanjing['optional'+div.number].type!='Ultimate'){
                                            var node2 = lib.config.taixuhuanjing['optional'+div.number];
                                            div.update(node2);
                                            div.setBackgroundImage('extension/太虚幻境/image/icon/icon_frame7.png');
                                        } else {
                                            eventBox.removeChild(div);
                                        }
                                    }
                                },500);

                                event.cancelBubble = true;
                                event.returnValue = false; 
                                return false;
                            });
                            return divOff;
                        })(),
                        divButton:(function(){
                            var divButton = ui.create.div('.taixuhuanjing_consoledeskEventDivButton','查看');
                            divButton.addEventListener("click",function(){
                                game.txhj_playAudioCall('WinButton',null,true);
                                if (node.type=='gain') {
                                    game.lookEvent(eventNode,home);
                                } else if (node.type=='side'||node.type=='micheng'||node.type=='main') {
                                    game.lookBoss(eventNode,home);
                                } else if (node.type=='store') {
                                    game.lookStore(eventNode,home);
                                } else if (node.type=='exam1'||node.type=='exam2'||node.type=='exam3'||node.type=='exam4') {
                                    game.lookAnswer(eventNode,home);
                                } else if (node.type=='trade') {
                                    game.lookTrade(eventNode,home);
                                } else if (node.type=='choose') {
                                    game.lookChoose(eventNode,home);
                                }
                                event.cancelBubble = true;
                                event.returnValue = false;
                                return false;
                            });
                            return divButton;
                        })(),
                    }
                    for(var i in divComps){
                        div.appendChild(divComps[i]);
                    }
                    if (node.change==true)  {
                        var changeButton = ui.create.div('.taixuhuanjing_consoledeskEventDivChangeButton',div);
                    }
                    if ((node.type=='exam1'||node.type=='exam2'||node.type=='exam3'||node.type=='exam4')&&lib.config.taixuhuanjingNode&&lib.config.taixuhuanjingNode.forbidden&&!lib.config.taixuhuanjingNode.forbidden.contains(node.id)) {
                        lib.config.taixuhuanjingNode.forbidden.push(node.id);
                        while(lib.config.taixuhuanjingNode.forbidden.length>=50){
                            var info = lib.config.taixuhuanjingNode.forbidden.shift();
                        };
                        game.saveConfig('taixuhuanjingNode',lib.config.taixuhuanjingNode);
                    }
                };
                div.update(node);
                return div;
            };
            if(lib.config.taixuhuanjing.optional1 != null){
                var node = lib.config.taixuhuanjing.optional1;
                if (node.type=='boss'||node.type=='Ultimate') {
                    eventBox.appendChild(funcBoss(node,1));
                    if (!exclusive&&node.exclusive) {
                        home.setBackgroundImage('extension/太虚幻境/dlc/'+lib.config.taixuhuanjing.season+'/chapter_'+lib.config.taixuhuanjing.chapter+'_'+node.exclusive+'.png');
                    }
                } else {
                    eventBox.appendChild(funcEvent(node,1),);
                }
            }
            if(lib.config.taixuhuanjing.optional2 != null){
                var node = lib.config.taixuhuanjing.optional2;
                if (node.type=='boss'||node.type=='Ultimate') {
                    eventBox.appendChild(funcBoss(node,2));
                    if (!exclusive&&node.exclusive) {
                        home.setBackgroundImage('extension/太虚幻境/dlc/'+lib.config.taixuhuanjing.season+'/chapter_'+lib.config.taixuhuanjing.chapter+'_'+node.exclusive+'.png');
                    }
                } else {
                    eventBox.appendChild(funcEvent(node,2));
                }
            }
            if(lib.config.taixuhuanjing.optional3 != null){
                var node = lib.config.taixuhuanjing.optional3;
                if (node.type=='boss'||node.type=='Ultimate') {
                    eventBox.appendChild(funcBoss(node,3));
                    if (!exclusive&&node.exclusive) {
                        home.setBackgroundImage('extension/太虚幻境/dlc/'+lib.config.taixuhuanjing.season+'/chapter_'+lib.config.taixuhuanjing.chapter+'_'+node.exclusive+'.png');
                    }
                } else {
                    eventBox.appendChild(funcEvent(node,3));
                }
            }
        };
        home.off = function(){
            game.txhj_playAudioCall('off',null,true);
            clearInterval(coinNum.interval);
            home.delete();
            lib.onresize.remove(reConsoledesksize);
            if(_status.gameStart!=undefined){
                _status.gameStart=undefined;
                game.resume();
            } else {
                game.chooseCharacterTaiXuHuanJing();
                game.resume();
            }
        };
        home.update = function(){
            if (lib.config.taixuhuanjing.equip1!=null) {
                game.equipBuffUpdate(lib.config.taixuhuanjing.equip1,true);
            }
            if (lib.config.taixuhuanjing.equip2!=null) {
                game.equipBuffUpdate(lib.config.taixuhuanjing.equip2,true);
            }
            if (lib.config.taixuhuanjing.equip3!=null) {
                game.equipBuffUpdate(lib.config.taixuhuanjing.equip3,true);
            }
            if (lib.config.taixuhuanjing.equip4!=null) {
                game.equipBuffUpdate(lib.config.taixuhuanjing.equip4,true);
            }
            if (lib.config.taixuhuanjing.useSkills.length>lib.config.taixuhuanjing.maxSkills||lib.config.taixuhuanjing.skills.length) {
                //game.lookSkill(home,true);
            };
            if (lib.config.taixuhuanjing.equips.length) {
                //game.lookEquip(home,true);
            }
            eventBox.Update();
            playBody.update();
            skillBody.Update();
            buffBox.Update();
            attributeBox.update();
            servantBox.Update();
        };
        home.update()
        var homeButton = ui.create.div('.taixuhuanjing_consoledeskHomeButton',home);          
        homeButton.onclick = function() {
            if(game.noReturnMenu) return;
            game.txhj_playAudioCall('WinButton',null,true);
            homeButton.innerHTML = '';
            var showMenu=function(node,time,scale){
                node.style.opacity=0;
                if(scale) node.style.transform='scale(1.2)';
                node.style.transition='all 0.3s';
                setTimeout(function(){
                    node.style.opacity=1;
                    node.style.transform='';
                },time);
            }
            window.homeButtonBox = ui.create.div('.taixuhuanjing_consoledeskHomeButtonBox',homeButton); 
            showMenu(homeButtonBox,0);
            homeButtonBox.onclick = function() {
                game.txhj_playAudioCall('off',null,true);
                if(homeButtonBox) {
                    homeButtonBox.style.opacity=0;
                    setTimeout(function(){
                        homeButton.innerHTML = '';
                        delete window.homeButtonBox;
                    },300);
                }else {
                    homeButton.innerHTML = '';
                }
                event.cancelBubble = true;
                event.returnValue = false;
                return false;
            };
            var homeButtonMenu = ui.create.div('.taixuhuanjing_consoledeskHomeButtonMenu',homeButtonBox); 
            showMenu(homeButtonMenu,200,true);
            homeButtonMenu.onclick = function() {
                game.txhj_playAudioCall('WinButton',null,true);
                homeButton.innerHTML = '';
                if(!ui.click.configMenu) return;
                game.closePopped();
                game.pause2();
                ui.click.configMenu();
                ui.system1.classList.remove('shown');
                ui.system2.classList.remove('shown');
                event.cancelBubble = true;
                event.returnValue = false; 
                return false;
            };
            var homeButtonOut = ui.create.div('.taixuhuanjing_consoledeskHomeButtonOut',homeButtonBox); 
            showMenu(homeButtonOut,100,true);
            homeButtonOut.onclick = function() {
                game.txhj_playAudioCall('off',null,true);
                homeButton.innerHTML = '';
                game.reload3();
                event.cancelBubble = true;
                event.returnValue = false; 
                return false;
            };
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        }
        home.onclick = function() {
            //Helasisy修
            if(typeof homeButtonBox != 'undefined'&&homeButtonBox) {
                homeButtonBox.style.opacity=0;
                setTimeout(function(){
                    homeButton.innerHTML = '';
                    delete window.homeButtonBox;
                },300);
            }else {
                homeButton.innerHTML = '';
            }
            event.cancelBubble = true;
            event.returnValue = false;
            return false;
        };
        if (_status.TaiXuHuanJingGame&&_status.TaiXuHuanJingGame.return!=null&&_status.TaiXuHuanJingGame.event) {
            eventBox.style.display = 'none';
            var homeBody2 = ui.create.div('.taixuhuanjing_StateHomeGameScore',homeBody);
            var gameEvent = game.eventPack[lib.config.taixuhuanjing.season][lib.config.taixuhuanjing.chapter][_status.TaiXuHuanJingGame.event.id];
            var gameScoreBody = ui.create.div('.taixuhuanjing_StateHomeGameScoreBody',homeBody2);
            var scoreComps = {
                gameMeName:(function(){
                    var gameMeName = ui.create.div('.taixuhuanjing_StateHomeGameScoreBodyName',''+lib.config.connect_nickname);
                    return gameMeName;
                })(),
                eventBox:(function(){
                    var eventBox = ui.create.div('.taixuhuanjing_StateHomeGameScoreBodyEventBox');
                    var eventTextBg = ui.create.div('.taixuhuanjing_StateHomeGameScoreBodyEventTextBg',eventBox);
                    var eventText = ui.create.div('.taixuhuanjing_StateHomeGameScoreBodyEventText','击败',eventTextBg);
                    if (_status.TaiXuHuanJingGame.return==false) {
                        eventText.innerHTML = '不敌';
                    }
                    var eventImp = ui.create.div('.taixuhuanjing_StateHomeGameScoreBodyEventImp',eventBox);
                    eventImp.setBackgroundImage('extension/太虚幻境/image/big_bg/rogue_main_'+gameEvent.ext+'.png');
                    var eventRound = ui.create.div('.taixuhuanjing_StateHomeGameScoreBodyEventRound',eventBox);
                    return eventBox;
                })(),
                nodeBox:(function(){
                    var nodeBox = ui.create.div('.taixuhuanjing_StateHomeGameScoreBodyNodeBox');
                    function nodeFunc (node) {
                        var nodeDiv = ui.create.div('.taixuhuanjing_StateHomeGameScoreBodyNodeDiv');
                        var nodeDivText = ui.create.div('.taixuhuanjing_StateHomeGameScoreBodyNodeDivText',nodeDiv,node.name);
                        var nodeDivNum = ui.create.div('.taixuhuanjing_StateHomeGameScoreBodyNodeDivNum',nodeDiv,node.num+'');
                        return nodeDiv;
                    };
                    /*时间转换*/
                    var formatDuring = function (time) {
                        var days = parseInt(time / (1 * 60 * 60 * 24));
                        var hours = parseInt((time % (1 * 60 * 60 * 24)) / (1 * 60 * 60));
                        var minutes = parseInt((time % (1 * 60 * 60)) / (1 * 60));
                        var seconds = Math.floor((time % (1 * 60)) / 1);
                        var str = '';
                        if (days>0) {
                            str += days + ' 天 ';
                        }
                        if (hours>0) {
                            str += hours + ' 时 ';
                        }
                        str += minutes + ' 分 ';
                        str += seconds + ' 秒 ';
                        return str;
                    };
                    var calculateValue = function () {
                        var num = 0;
                        var skillList = lib.config.taixuhuanjing.useSkills.slice();
                        for (var i = 0; i < txhjPack.skillRank.length; i++) {
                        	if(!lib.skill[txhjPack.skillRank[i].skillID]||!lib.translate[txhjPack.skillRank[i].skillID]) continue;
                            for (var s = 0; s < skillList.length; s++) {
                                if (txhjPack.skillRank[i].skillID==skillList[s]) {
                                    num += txhjPack.skillRank[i].rank*100;
                                }
                            }
                        }
                        var buffList = lib.config.taixuhuanjing.buff.slice();
                        for(var i in game.buffPack){
                            for (var b = 0; b < buffList.length; b++) {
                                if (i==buffList[b]) {
                                    num += game.buffPack[i].rank*100;
                                }
                            }
                        }
                        var cardList = lib.config.taixuhuanjing.cards.slice();
                        for (var i = 0; i < txhjPack.cardRank.length; i++) {
                            for (var c = 0; c < cardList.length; c++) {
                                if (txhjPack.cardRank[i].cardID==cardList[c].name) {
                                    num += txhjPack.cardRank[i].rank*50;
                                }
                            }
                        }

                        if (lib.config.taixuhuanjing.equip1!=null) {
                            for (var i = 0; i < txhjPack.cardRank.length; i++) {
                                if (txhjPack.cardRank[i].cardID==lib.config.taixuhuanjing.equip1.name) {
                                    num += txhjPack.cardRank[i].rank*50;
                                }
                            }
                        }
                        if (lib.config.taixuhuanjing.equip2!=null) {
                            for (var i = 0; i < txhjPack.cardRank.length; i++) {
                                if (txhjPack.cardRank[i].cardID==lib.config.taixuhuanjing.equip2.name) {
                                    num += txhjPack.cardRank[i].rank*50;
                                }
                            }
                        }
                        if (lib.config.taixuhuanjing.equip3!=null) {
                            for (var i = 0; i < txhjPack.cardRank.length; i++) {
                                if (txhjPack.cardRank[i].cardID==lib.config.taixuhuanjing.equip3.name) {
                                    num += txhjPack.cardRank[i].rank*50;
                                }
                            }
                        }
                        if (lib.config.taixuhuanjing.equip4!=null) {
                            for (var i = 0; i < txhjPack.cardRank.length; i++) {
                                if (txhjPack.cardRank[i].cardID==lib.config.taixuhuanjing.equip4.name) {
                                    num += txhjPack.cardRank[i].rank*50;
                                }
                            }
                        }
                        return num;
                    };
                    var dieNum = 0;
                    var coin = lib.config.taixuhuanjing.coin;
                    var maxCoin = lib.config.taixuhuanjing.maxCoin;
                    var valueNum = calculateValue();
                    var fightNum = lib.config.taixuhuanjing.score.fight;
                    var fightNum2 = fightNum*100;
                    var timeNum = formatDuring(lib.config.taixuhuanjing.score.time);
                    var effectNum = game.effectPack[lib.config.taixuhuanjing.effect].num;
                    var effectNum2 = 0;
                    if (effectNum>1) {
                        effectNum2 = effectNum;
                    } else {
                        effectNum2 = (valueNum+fightNum2+(maxCoin-coin))*effectNum;
                    }
                    var totalNum = valueNum+fightNum2+(maxCoin-coin)+effectNum2;
                    if (_status.TaiXuHuanJingGame.return==true) {
                        if(!lib.config['taixuhuanjingRecord'].history) lib.config['taixuhuanjingRecord'].history=0;
                        var totalNum2 = totalNum*0.10;
                        totalNum = totalNum2 + totalNum;
                        var timeID = lib.config.taixuhuanjing.time;
                        var seasID = lib.config.taixuhuanjing.season;
                        lib.config.taixuhuanjingRecord[timeID].total = totalNum;
                        lib.config['taixuhuanjingRecord'].history++;
                        lib.config.taixuhuanjingRecord[timeID].history=lib.config['taixuhuanjingRecord'].history;
                        lib.config['taixuhuanjingRecord'].newRec=timeID;
                        game.saveConfig('taixuhuanjingRecord',lib.config.taixuhuanjingRecord);
                        if(!lib.config['txhj_collect'][seasID]) lib.config['txhj_collect'][seasID]={};
                        lib.config['txhj_collect'][seasID].chapter=0;
                        lib.config['txhj_collect'][seasID].maxchap=0;
                        game.saveConfig('txhj_collect',lib.config['txhj_collect']);
                    }

                    var nodeList = [
                        {name:'未死亡奖励',typr:'die',num:dieNum},
                        {name:'突变种子奖励',typr:'effect',num:effectNum2},
                        {name:'获得金币数',typr:'coin',num:maxCoin},
                        {name:'持有内容价值',typr:'value',num:valueNum},
                        {name:'挑战对局数',typr:'battle',num:fightNum},
                        {name:'总计时间',typr:'time',num:timeNum},
                        {name:'总积分',typr:'total',num:Math.floor(totalNum)},
                    ];
                    while(nodeList.length){
                        nodeBox.appendChild(nodeFunc(nodeList.shift()));
                    };
                    game.updateModeData();
                    return nodeBox;
                })(),
                clickPrompt:(function(){
                    var clickPrompt = ui.create.div('.taixuhuanjing_StateHomeGameScoreBodyClickPrompt','点击继续');
                    clickPrompt.addEventListener("click",function(){
                        game.reload();
                        event.cancelBubble = true;
                        event.returnValue = false; 
                        return false;
                    });
                    return clickPrompt;
                })(),
            };
            for(var i in scoreComps){
                gameScoreBody.appendChild(scoreComps[i]);
            }
            var gameIcon = ui.create.div('.taixuhuanjing_StateHomeGameIcon2',homeBody2);
            var gameText = ui.create.div('.taixuhuanjing_StateHomeGameText2',gameIcon);
            if (_status.TaiXuHuanJingGame.return==false) {
                gameIcon.setBackgroundImage('extension/太虚幻境/image/style/game_false_icon.png');
                gameText.setBackgroundImage('extension/太虚幻境/image/style/game_false_text.png');
                gameText.style.bottom = '28%';
                game.txhj_playAudioCall('Loss',null,true);
            } else {
                var gameInfo = ui.create.div('.taixuhuanjing_StateHomeGameInfo2',gameIcon);
                var gameText2 = ui.create.div('.taixuhuanjing_StateHomeGameText3','恭喜最终通关',gameInfo);
                var gameText3 = ui.create.div('.taixuhuanjing_StateHomeGameText4','恭喜最终通关',gameInfo);
                gameScoreBody.style.top = "20%";
                gameIcon.setBackgroundImage('extension/太虚幻境/image/style/game_true_icon.png');
                gameText.setBackgroundImage('extension/太虚幻境/image/style/game_win_text.png');
                game.txhj_playAudioCall('Win',null,true);
            }
        }
    };
    game.equipBuffUpdate = function (equip,type){
        if (equip==null) return;
        var equiplist = ['txhj_feilong','txhj_chiyanzhenhunqin','txhj_lingbaoxianhu','txhj_taijifuchen','txhj_chongyingshenfu','txhj_guofengyupao','txhj_juechenjinge','txhj_xuwangzhimian','txhj_liulongcanjia'];
        var equipbuff = {
            //飞龙夺凤
            'txhj_feilong':['buff_txhj_pozhenzhifeng','破阵之锋'],
            //赤焰镇魂琴
            'txhj_chiyanzhenhunqin':['buff_txhj_yanhuozhiren','焱火之刃'],
            //灵宝仙葫
            'txhj_lingbaoxianhu':['buff_txhj_xianhujiqu','仙葫汲取'],
            //太极拂尘
            'txhj_taijifuchen':['buff_txhj_fuchendangmo','拂尘荡魔'],
            //冲应神符
            'txhj_chongyingshenfu':['buff_txhj_shenfuhuaxie','神符化邪'],
            //国风玉袍
            'txhj_guofengyupao':['buff_txhj_juejingzhice','绝境之策'],
            //绝尘金戈
            'txhj_juechenjinge':['buff_txhj_wuzhongshengshan','无中生闪'],
            //六龙骖驾
            'txhj_liulongcanjia':['buff_txhj_wuzhongshengsha','无中生杀'],
            //虚妄之冕
            'txhj_xuwangzhimian':['buff_txhj_shenfuhuaxie','神符化邪'],
        };
        var equipName = equip.name;
        if (!equiplist.contains(equipName)) return;
        if (equiplist.contains(equipName)) {
            if (type==true&&equipbuff[equipName]) {
                if (!lib.config.taixuhuanjing.buff.contains(equipbuff[equipName][0])) {
                    lib.config.taixuhuanjing.buff.push(equipbuff[equipName][0]);
                }
            } else if (type==false&&equipbuff[equipName]) {
                if (lib.config.taixuhuanjing.buff.contains(equipbuff[equipName][0])) {
                    lib.config.taixuhuanjing.buff.remove(equipbuff[equipName][0]);
                }
            }
        }
    };
    game.randomEvent = function (type) {
        if (!type||type=='random') {
            type = ['gain','gain','gain','gain','gain','gain','gain','gain','gain','exam'].randomGet();
        }
        var number = [4,4,4,4,3,3,3,2,2,1].randomGet();
        var list1 = [];
        var list2 = [];
        var event;
        var rank = lib.config.taixuhuanjing.rank;
        var season = lib.config.taixuhuanjing.season;
        var chapter = lib.config.taixuhuanjing.chapter;
        var obj = game.eventPack[season][chapter];
        var packs = JSON.parse(JSON.stringify(obj))
        for (var p in packs) {
            var pack = packs[p];
            if (pack.rank>rank) continue;
            if (pack.type!=type) continue;
            pack.season = season;
            pack.chapter = chapter;
            if (get.eventReserve(pack)!=true) {
                if (pack.forced&&pack.forced==true) {
                    return pack;
                    break;
                } else {
                    list1.push(pack);
                }
            };
        }
        if (type=='gain'||type=='trade') {
            var obj = game.gainPack;
            var packs = JSON.parse(JSON.stringify(obj))
            for (var i in packs) {
                if (packs[i].type!='gain'&&packs[i].type!='trade') continue;
                if (packs[i].rank>rank) continue;
                if (packs[i].priority!=number) continue;
                list2.push(packs[i]);
            }
        } else if (type=='exam') {
            var obj = game.examPack;
            var packs = JSON.parse(JSON.stringify(obj))
            for (var i in packs) {
                for (var s in packs[i]){
                    var exam = packs[i][s];
                    if (exam.rank>rank) continue;
                    if (lib.config.taixuhuanjingNode&&lib.config.taixuhuanjingNode.forbidden&&lib.config.taixuhuanjingNode.forbidden.contains(exam.id)) continue;
                    if (lib.config.taixuhuanjing.exam.contains(exam.id)) continue;
                    list2.push(exam);
                }
            }
        } else if (type=='exam3') {
            var obj = game.examPack.exam1;
            var packs = JSON.parse(JSON.stringify(obj))
            for (var s in packs){
                var exam = packs[s];
                if (exam.rank>rank) continue;
                if (lib.config.taixuhuanjingNode&&lib.config.taixuhuanjingNode.forbidden&&lib.config.taixuhuanjingNode.forbidden.contains(exam.id)) continue;
                if (lib.config.taixuhuanjing.exam.contains(exam.id)) continue;
                list2.push(exam);
            }
        } else if (type=='exam3') {
            var obj = game.examPack.exam2;
            var packs = JSON.parse(JSON.stringify(obj))
            for (var s in packs){
                var exam = packs[s];
                if (exam.rank>rank) continue;
                if (lib.config.taixuhuanjingNode&&lib.config.taixuhuanjingNode.forbidden&&lib.config.taixuhuanjingNode.forbidden.contains(exam.id)) continue;
                if (lib.config.taixuhuanjing.exam.contains(exam.id)) continue;
                list2.push(exam);
            }
        } else if (type=='exam3') {
            var obj = game.examPack.exam3;
            var packs = JSON.parse(JSON.stringify(obj))
            for (var s in packs){
                var exam = packs[s];
                if (exam.rank>rank) continue;
                if (lib.config.taixuhuanjingNode&&lib.config.taixuhuanjingNode.forbidden&&lib.config.taixuhuanjingNode.forbidden.contains(exam.id)) continue;
                if (lib.config.taixuhuanjing.exam.contains(exam.id)) continue;
                list2.push(exam);
            }
            } else if (type=='exam3') {
            var obj = game.examPack.exam4;
            var packs = JSON.parse(JSON.stringify(obj))
            for (var s in packs){
                var exam = packs[s];
                if (exam.rank>rank) continue;
                if (lib.config.taixuhuanjingNode&&lib.config.taixuhuanjingNode.forbidden&&lib.config.taixuhuanjingNode.forbidden.contains(exam.id)) continue;
                if (lib.config.taixuhuanjing.exam.contains(exam.id)) continue;
                list2.push(exam);
        }
     }
        if (list1.length<5) {
            list1 = list1.concat(list2.randomGets(5-list1.length));
        }
        while(!event&&list1.length){
            var ev = list1.randomGet();
            ev.seat = Math.ceil(Math.random()*999);
            if (ev.type=='gain'&&ev.change!=undefined&&ev.change==false&&game.changePack[ev.id]&&Math.random()<=0.03) {
                ev.change = true;
            }
            if (ev.random&&Math.random()<=ev.random) {
                event = ev;
            } else if (!ev.random){
                event = ev;
            }
        }
        return event;
    };
    /*过滤已发生的事件*/
    game.continueEvent = function (event) {
        var obj = lib.config.taixuhuanjing.events
        var packs = JSON.parse(JSON.stringify(obj));
        for (var p in packs) {
            var pack = packs[p];
            if (pack.id==event.id) {
                return true;
            }
        }
        return false;
    };
    game.randomBattle = function (type) {
        var list = [];
        var rank = lib.config.taixuhuanjing.rank;
        var season = lib.config.taixuhuanjing.season;
        var chapter = lib.config.taixuhuanjing.chapter;
        var obj = game.eventPack[season][chapter];
        var packs = JSON.parse(JSON.stringify(obj))
        for (var p in packs) {
            var pack = packs[p];
            if (pack.rank>rank) continue;
            if (pack.type!=type) continue;
            //if (game.continueEvent(pack)==true) continue;
            pack.season = season;
            pack.chapter = chapter;
            if (get.eventReserve(pack)!=true) {
                if (pack.forced&&pack.forced==true) {
                    return pack;
                    break;
                } else {
                    list.push(pack);
                }
            }
        }
        var event;
        while(!event&&list.length){
            var ev = list.randomGet();
            ev.seat = Math.ceil(Math.random()*999);
            if (ev.random&&Math.random()<=ev.random) {
                event = ev;
            } else if (!ev.random){
                event = ev;
            }
        }
        return event;
    };
    game.moveEffect = function(effect){
        if (!effect) return;
        if (!effect.name) return;
        if (!effect.number) return;
        var number = effect.number;
        if (effect.name=='coin') {
            if (number<0) {
                lib.config.taixuhuanjing.coin+=number;
                lib.config.taixuhuanjing.maxCoin += number;
                game.messagePopup('金币'+number);
            } else {
                lib.config.taixuhuanjing.coin+=number;
                lib.config.taixuhuanjing.maxCoin += number;
                game.messagePopup('金币+'+number);
            }
            if (lib.config.taixuhuanjing.coin<0) {
                lib.config.taixuhuanjing.coin = 0;
            }
        } else if (effect.name=='exp') {
            if (number<0) {
                lib.config.taixuhuanjing.exp+=number;
                game.messagePopup('经验'+number);
            } else {
                lib.config.taixuhuanjing.exp+=number;
                game.messagePopup('经验+'+number);
            }
            if (lib.config.taixuhuanjing.exp<0) {
                lib.config.taixuhuanjing.exp = 0;
            }
            if (lib.config.taixuhuanjing.exp>=lib.config.taixuhuanjing.maxExp) {
                if(lib.config.taixuhuanjing.level<10){
                    lib.config.taixuhuanjing.exp = 0;
                    lib.config.taixuhuanjing.level += 1;
                    if (lib.config.taixuhuanjing.level==2) {
                        lib.config.taixuhuanjing.maxExp = 300;
                    } else if (lib.config.taixuhuanjing.level==3) {
                        lib.config.taixuhuanjing.maxExp = 700;
                    } else if (lib.config.taixuhuanjing.level==4) {
                        lib.config.taixuhuanjing.maxExp = 1200;
                    } else if (lib.config.taixuhuanjing.level==5) {
                        lib.config.taixuhuanjing.maxExp = 1800;
                    } else if (lib.config.taixuhuanjing.level==6) {
                        lib.config.taixuhuanjing.maxExp = 2300;
                    } else if (lib.config.taixuhuanjing.level==7) {
                        lib.config.taixuhuanjing.maxExp = 3000;
                    } else if (lib.config.taixuhuanjing.level==8) {
                        lib.config.taixuhuanjing.maxExp = 3500;
                    } else if (lib.config.taixuhuanjing.level==9) {
                        lib.config.taixuhuanjing.maxExp = 4000;
                    }
                    game.messagePopup('等级提升至'+get.cnNumber(lib.config.taixuhuanjing.level,true)+'级');
                }
            }
            if (lib.config.taixuhuanjing.exp<0) {
                lib.config.taixuhuanjing.exp = 0;
            }
        }  else if (effect.name=='hp') {
            if (number<0) {
                lib.config.taixuhuanjing.hp+=number;
                game.messagePopup('体力'+number);
            } else {
                lib.config.taixuhuanjing.hp+=number;
                game.messagePopup('体力+'+number);
            }
            if (lib.config.taixuhuanjing.hp<0) {
                lib.config.taixuhuanjing.hp = 1;
            }
            if (lib.config.taixuhuanjing.maxHp<=lib.config.taixuhuanjing.hp) {
                lib.config.taixuhuanjing.hp = lib.config.taixuhuanjing.maxHp;
            }
        } else if (effect.name=='maxHp') {
            if (number<0) {
                lib.config.taixuhuanjing.hp+=number;
                lib.config.taixuhuanjing.maxHp+=number;
                game.messagePopup('体力上限'+number);
            } else {
                lib.config.taixuhuanjing.hp+=number;
                lib.config.taixuhuanjing.maxHp+=number;
                game.messagePopup('体力上限+'+number);
            }
            if (lib.config.taixuhuanjing.maxHp<0) {
                lib.config.taixuhuanjing.maxHp = 1;
            }
            if (lib.config.taixuhuanjing.maxHp<=lib.config.taixuhuanjing.hp) {
                lib.config.taixuhuanjing.hp = lib.config.taixuhuanjing.maxHp;
            }
        } else if (effect.name=='minHs') {
            if (number<0) {
                lib.config.taixuhuanjing.minHs+=number;
                game.messagePopup('初始手牌'+number);
            } else {
                lib.config.taixuhuanjing.minHs+=number;
                game.messagePopup('初始手牌+'+number);
            }
            if (lib.config.taixuhuanjing.minHs<0) {
                lib.config.taixuhuanjing.minHs = 0;
            }
        } else if (effect.name=='maxHs') {
            if (number<0) {
                lib.config.taixuhuanjing.maxHs+=number;
                game.messagePopup('手牌上限'+number);
            } else {
                lib.config.taixuhuanjing.maxHs+=number;
                game.messagePopup('手牌上限+'+number);
            }
            if (lib.config.taixuhuanjing.maxHs<0) {
                lib.config.taixuhuanjing.maxHs = 0;
            }
        } else if (effect.name=='adjust') {
            if (number<0) {
                lib.config.taixuhuanjing.adjust+=number;
                game.messagePopup('调度'+number);
            } else {
                lib.config.taixuhuanjing.adjust+=number;
                game.messagePopup('调度+'+number);
            }
            if (lib.config.taixuhuanjing.adjust<0) {
                lib.config.taixuhuanjing.adjust = 0;
            }
        } else if (effect.name=='exp') {
            if (number<0) {
                lib.config.taixuhuanjing.exp+=number;
                game.messagePopup('经验'+number);
            } else {
                lib.config.taixuhuanjing.exp+=number;
                game.messagePopup('经验+'+number);
            }
        } else if (effect.name=='maxSkills') {
            if (number<0) {
                lib.config.taixuhuanjing.maxSkills+=number;
                game.messagePopup('技能插槽'+number);
            } else {
                lib.config.taixuhuanjing.maxSkills+=number;
                game.messagePopup('技能插槽+'+number);
            }
            if (lib.config.taixuhuanjing.maxSkills<0) {
                lib.config.taixuhuanjing.maxSkills = 0;
            }
        } else if (effect.name=='card') {
            while(number--){
                var cardlist = [];
                var obj = txhjPack.cardPack;
                var key = Object.keys(obj);
                for (var i of key) {
                    if (key[i].cardID==effect.result) {
                        cardlist = key[i].list.slice(0);
                    }
                }

                if (cardlist.length) {
                    var card = cardlist.randomGet();
                } else {
                    var card = {
                        name:effect.result,
                        suit:['spade', 'heart', 'club', 'diamond'].randomGet(),
                        number:[1,2,3,4,5,6,7,8,9,10,11,12,13].randomGet(),
                        nature:'',
                    }
                    if (card.name=='sha') {
                        card.nature = ['','fire','thunder'].randomGet();
                    }
                }
                lib.config.taixuhuanjing.cards.push(card);
                var num=lib.config.txhj_collect.cards[card.name];
                if(!num) num=0;
                lib.config.txhj_collect.cards[card.name]=num+1;
                game.saveConfig('txhj_collect',lib.config.txhj_collect);
                game.messagePopup('获得卡牌['+get.translation(card.name)+']');

            }
        } else if (effect.name=='removeCard') {
            while(number--){
                if (lib.config.taixuhuanjing.cards.length) {
                    var card = lib.config.taixuhuanjing.cards.randomGet();
                    lib.config.taixuhuanjing.cards.remove(card);
                    game.messagePopup('失去卡牌['+get.translation(card.name)+']');
                }else {
                    game.moveEffect({
                        name:'maxHp',
                        number:-1,
                    });
                }
            }
        } else if (effect.name=='randomCard'||effect.name=='basic'||effect.name=='trick') {
            while(number--){
                var list = [];
                var basiclist = [];
                var tricklist = [];
                for (var i = 0; i <txhjPack.cardPack.length; i++) {
                    if (lib.translate[txhjPack.cardPack[i].cardID]) {
                        if(lib.translate[txhjPack.cardPack[i].cardID]&&get.type(txhjPack.cardPack[i].cardID)!='equip'){
                            list.push(txhjPack.cardPack[i].cardID);
                            if (get.type(txhjPack.cardPack[i].cardID)=='basic') {
                                basiclist.push(txhjPack.cardPack[i].cardID);
                            }
                            if (get.type(txhjPack.cardPack[i].cardID)=='trick'||get.type(txhjPack.cardPack[i].cardID)=='delay') {
                                tricklist.push(txhjPack.cardPack[i].cardID);
                            }
                        }
                    }
                }
                if (effect.name=='randomCard'){
                    var cardName = list.randomGet();
                    var cardlist = [];
                    var obj = txhjPack.cardPack;
                    var key = Object.keys(obj);
                    for (var i of key) {
                        if (key[i].cardID==cardName) {
                            cardlist = key[i].list.slice(0);
                        }
                    }

                    if (cardlist.length) {
                        var card = cardlist.randomGet();
                    } else {
                        var card = {
                            name:cardName,
                            suit:['spade', 'heart', 'club', 'diamond'].randomGet(),
                            number:[1,2,3,4,5,6,7,8,9,10,11,12,13].randomGet(),
                            nature:'',
                        }
                        if (card.name=='sha') {
                            card.nature = ['','fire','thunder'].randomGet();
                        }
                    }
                    lib.config.taixuhuanjing.cards.push(card);
                    var num=lib.config.txhj_collect.cards[card.name];
                    if(!num) num=0;
                    lib.config.txhj_collect.cards[card.name]=num+1;
                    game.saveConfig('txhj_collect',lib.config.txhj_collect);
                    game.messagePopup('获得随机卡牌['+get.translation(card.name)+']');
                } else if (effect.name=='basic'){
                    var cardName = basiclist.randomGet();
                    var cardlist = [];
                    var obj = txhjPack.cardPack;
                    var key = Object.keys(obj);
                    for (var i of key) {
                        if (key[i].cardID==cardName) {
                            cardlist = key[i].list.slice(0);
                        }
                    }

                    if (cardlist.length) {
                        var card = cardlist.randomGet();
                    } else {
                        var card = {
                            name:cardName,
                            suit:['spade', 'heart', 'club', 'diamond'].randomGet(),
                            number:[1,2,3,4,5,6,7,8,9,10,11,12,13].randomGet(),
                            nature:'',
                        }
                        if (card.name=='sha') {
                            card.nature = ['','fire','thunder'].randomGet();
                        }
                    }
                    lib.config.taixuhuanjing.cards.push(card);
                    var num=lib.config.txhj_collect.cards[card.name];
                    if(!num) num=0;
                    lib.config.txhj_collect.cards[card.name]=num+1;
                    game.saveConfig('txhj_collect',lib.config.txhj_collect);
                    game.messagePopup('获得基本牌['+get.translation(card.name)+']');
                } else if (effect.name=='trick'){
                    var cardName = tricklist.randomGet();
                    var cardlist = [];
                    var obj = txhjPack.cardPack;
                    var key = Object.keys(obj);
                    for (var i of key) {
                        if (key[i].cardID==cardName) {
                            cardlist = key[i].list.slice(0);
                        }
                    }

                    if (cardlist.length) {
                        var card = cardlist.randomGet();
                    } else {
                        var card = {
                            name:cardName,
                            suit:['spade', 'heart', 'club', 'diamond'].randomGet(),
                            number:[1,2,3,4,5,6,7,8,9,10,11,12,13].randomGet(),
                            nature:'',
                        }
                    }
                    lib.config.taixuhuanjing.cards.push(card);
                    var num=lib.config.txhj_collect.cards[card.name];
                    if(!num) num=0;
                    lib.config.txhj_collect.cards[card.name]=num+1;
                    game.saveConfig('txhj_collect',lib.config.txhj_collect);
                    game.messagePopup('获得锦囊牌['+get.translation(card.name)+']');
                }
            }
        }  else if (effect.name=='equip') {
            while(number--){
                var cardlist = [];
                var obj = txhjPack.cardPack;
                var key = Object.keys(obj);
                for (var i of key) {
                    if (key[i].cardID==effect.result) {
                        cardlist = key[i].list.slice(0);
                    }
                }

                if (cardlist.length) {
                    var card = cardlist.randomGet();
                } else {
                    var card = {
                        name:effect.result,
                        suit:['spade', 'heart', 'club', 'diamond'].randomGet(),
                        number:[1,2,3,4,5,6,7,8,9,10,11,12,13].randomGet(),
                        nature:'',
                    }
                }
                var num=lib.config.txhj_collect.cards[card.name];
                if(!num) num=0;
                lib.config.txhj_collect.cards[card.name]=num+1;
                game.saveConfig('txhj_collect',lib.config.txhj_collect);
                game.messagePopup('获得装备['+get.translation(card.name)+']');
                if (get.subtype(card.name)!='equip5'&&get.subtype(card.name)!='equip6'&&lib.config.taixuhuanjing[get.subtype(card.name)] == null) {
                    lib.config.taixuhuanjing[get.subtype(card.name)] = card;
                } else {
                    lib.config.taixuhuanjing.equips.push(card);
                }
            }
        } else if (effect.name=='removeEquip') {
            while(number--){
                var equips = [];
                if (lib.config.taixuhuanjing.equip1!=null) {
                    equips.push(lib.config.taixuhuanjing.equip1);
                }
                if (lib.config.taixuhuanjing.equip2!=null) {
                    equips.push(lib.config.taixuhuanjing.equip2);
                }
                if (lib.config.taixuhuanjing.equip3!=null) {
                    equips.push(lib.config.taixuhuanjing.equip3);
                }
                if (lib.config.taixuhuanjing.equip4!=null) {
                    equips.push(lib.config.taixuhuanjing.equip4);
                }
                if (lib.config.taixuhuanjing.equips&&lib.config.taixuhuanjing.equips.length) {
                    equips=equips.concat(lib.config.taixuhuanjing.equips);
                }
                if (equips.length) {
                    var equip = equips.randomGet();
                    game.equipBuffUpdate(equip,false);
                    if (lib.config.taixuhuanjing.equip1!=null&&lib.config.taixuhuanjing.equip1.name==equip.name&&lib.config.taixuhuanjing.equip1.suit==equip.suit&&lib.config.taixuhuanjing.equip1.number==equip.number) {
                        lib.config.taixuhuanjing.equip1 = null;
                    }
                    if (lib.config.taixuhuanjing.equip2!=null&&lib.config.taixuhuanjing.equip2.name==equip.name&&lib.config.taixuhuanjing.equip2.suit==equip.suit&&lib.config.taixuhuanjing.equip2.number==equip.number) {
                        lib.config.taixuhuanjing.equip2 = null;
                    }
                    if (lib.config.taixuhuanjing.equip3!=null&&lib.config.taixuhuanjing.equip3.name==equip.name&&lib.config.taixuhuanjing.equip3.suit==equip.suit&&lib.config.taixuhuanjing.equip3.number==equip.number) {
                        lib.config.taixuhuanjing.equip3 = null;
                    }
                    if (lib.config.taixuhuanjing.equip4!=null&&lib.config.taixuhuanjing.equip4.name==equip.name&&lib.config.taixuhuanjing.equip4.suit==equip.suit&&lib.config.taixuhuanjing.equip4.number==equip.number) {
                        lib.config.taixuhuanjing.equip4 = null;
                    }
                    if (lib.config.taixuhuanjing.equips.contains(equip)) {
                        lib.config.taixuhuanjing.equips.remove(equip);
                    }
                    game.messagePopup('失去装备['+get.translation(equip.name)+']');
                }else {
                    game.moveEffect({
                        name:'maxHp',
                        number:-1,
                    });
                }
            }
        } else if (effect.name=='randomEquip'||effect.name=='equip1'||effect.name=='equip2'||effect.name=='equip5') {
            var list = [];
            var list1 = [];
            var list2 = [];
            var list5 = [];
            for (var i = 0; i <txhjPack.cardPack.length; i++) {
                if (txhjPack.cardPack[i].unique==true) continue;
                if(lib.translate[txhjPack.cardPack[i].cardID]&&get.type(txhjPack.cardPack[i].cardID)=='equip'){
                    list.push(txhjPack.cardPack[i].cardID);
                    if (get.subtype(txhjPack.cardPack[i].cardID)=='equip1') {
                        list1.push(txhjPack.cardPack[i].cardID);
                    }
                    if (get.subtype(txhjPack.cardPack[i].cardID)=='equip2') {
                        list2.push(txhjPack.cardPack[i].cardID);
                    }
                    if (get.subtype(txhjPack.cardPack[i].cardID)=='equip3'||get.subtype(txhjPack.cardPack[i].cardID)=='equip4'||get.subtype(txhjPack.cardPack[i].cardID)=='equip5'||get.subtype(txhjPack.cardPack[i].cardID)=='equip6') {
                        list5.push(txhjPack.cardPack[i].cardID);
                    }
                }
            }
            while(number--){
                if (effect.name=='randomEquip') {
                    var cardName = list.randomGet();
                    var cardlist = [];
                    var obj = txhjPack.cardPack;
                    var key = Object.keys(obj);
                    for (var i of key) {
                        if (key[i].cardID==cardName) {
                            cardlist = key[i].list.slice(0);
                        }
                    }

                    if (cardlist.length) {
                        var card = cardlist.randomGet();
                    } else {
                        var card = {
                            name:cardName,
                            suit:['spade', 'heart', 'club', 'diamond'].randomGet(),
                            number:[1,2,3,4,5,6,7,8,9,10,11,12,13].randomGet(),
                            nature:'',
                        }
                    }
                    var num=lib.config.txhj_collect.cards[card.name];
                    if(!num) num=0;
                    lib.config.txhj_collect.cards[card.name]=num+1;
                    game.saveConfig('txhj_collect',lib.config.txhj_collect);
                    game.messagePopup('获得随机装备['+get.translation(card.name)+']');
                    if (get.subtype(card.name)!='equip5'&&get.subtype(card.name)!='equip6'&&lib.config.taixuhuanjing[get.subtype(card.name)] == null) {
                        lib.config.taixuhuanjing[get.subtype(card.name)] = card;
                    } else {
                        lib.config.taixuhuanjing.equips.push(card);
                    }
                } else if (effect.name=='equip1') {
                    var cardName = list1.randomGet();
                    var cardlist = [];
                    var obj = txhjPack.cardPack;
                    var key = Object.keys(obj);
                    for (var i of key) {
                        if (key[i].cardID==cardName) {
                            cardlist = key[i].list.slice(0);
                        }
                    }

                    if (cardlist.length) {
                        var card = cardlist.randomGet();
                    } else {
                        var card = {
                            name:cardName,
                            suit:['spade', 'heart', 'club', 'diamond'].randomGet(),
                            number:[1,2,3,4,5,6,7,8,9,10,11,12,13].randomGet(),
                            nature:'',
                        }
                    }
                    var num=lib.config.txhj_collect.cards[card.name];
                    if(!num) num=0;
                    lib.config.txhj_collect.cards[card.name]=num+1;
                    game.saveConfig('txhj_collect',lib.config.txhj_collect);
                    game.messagePopup('获得武器['+get.translation(card.name)+']');
                    if (get.subtype(card.name)!='equip5'&&get.subtype(card.name)!='equip6'&&lib.config.taixuhuanjing[get.subtype(card.name)] == null) {
                        lib.config.taixuhuanjing[get.subtype(card.name)] = card;
                    } else {
                        lib.config.taixuhuanjing.equips.push(card);
                    }
                } else if (effect.name=='equip2') {
                    var cardName = list2.randomGet();
                    var cardlist = [];
                    var obj = txhjPack.cardPack;
                    var key = Object.keys(obj);
                    for (var i of key) {
                        if (key[i].cardID==cardName) {
                            cardlist = key[i].list.slice(0);
                        }
                    }

                    if (cardlist.length) {
                        var card = cardlist.randomGet();
                    } else {
                        var card = {
                            name:cardName,
                            suit:['spade', 'heart', 'club', 'diamond'].randomGet(),
                            number:[1,2,3,4,5,6,7,8,9,10,11,12,13].randomGet(),
                            nature:'',
                        }
                    }
                    var num=lib.config.txhj_collect.cards[card.name];
                    if(!num) num=0;
                    lib.config.txhj_collect.cards[card.name]=num+1;
                    game.saveConfig('txhj_collect',lib.config.txhj_collect);
                    game.messagePopup('获得防具['+get.translation(card.name)+']');
                    if (get.subtype(card.name)!='equip5'&&get.subtype(card.name)!='equip6'&&lib.config.taixuhuanjing[get.subtype(card.name)] == null) {
                        lib.config.taixuhuanjing[get.subtype(card.name)] = card;
                    } else {
                        lib.config.taixuhuanjing.equips.push(card);
                    }
                } else if (effect.name=='equip5') {
                    var cardName = list5.randomGet();
                    var cardlist = [];
                    var obj = txhjPack.cardPack;
                    var key = Object.keys(obj);
                    for (var i of key) {
                        if (key[i].cardID==cardName) {
                            cardlist = key[i].list.slice(0);
                        }
                    }

                    if (cardlist.length) {
                        var card = cardlist.randomGet();
                    } else {
                        var card = {
                            name:cardName,
                            suit:['spade', 'heart', 'club', 'diamond'].randomGet(),
                            number:[1,2,3,4,5,6,7,8,9,10,11,12,13].randomGet(),
                            nature:'',
                        }
                    }
                    var num=lib.config.txhj_collect.cards[card.name];
                    if(!num) num=0;
                    lib.config.txhj_collect.cards[card.name]=num+1;
                    game.saveConfig('txhj_collect',lib.config.txhj_collect);
                    game.messagePopup('获得宝物['+get.translation(card.name)+']');
                    if (get.subtype(card.name)!='equip5'&&lib.config.taixuhuanjing[get.subtype(card.name)] == null) {
                        lib.config.taixuhuanjing[get.subtype(card.name)] = card;
                    } else {
                        lib.config.taixuhuanjing.equips.push(card);
                    }
                }  
            }
        } else if (effect.name=='randomUnique') {
            var list = [];
            for (var i = 0; i <txhjPack.cardPack.length; i++) {
                if (txhjPack.cardPack[i].unique!=true) continue;
                if(lib.translate[txhjPack.cardPack[i].cardID]&&get.type(txhjPack.cardPack[i].cardID)=='equip'){
                    list.push(txhjPack.cardPack[i].cardID);
                }
            }
            while(number--){
                var cardName = list.randomGet();
                var cardlist = [];
                var obj = txhjPack.cardPack;
                var key = Object.keys(obj);
                for (var i of key) {
                    if (key[i].cardID==cardName) {
                        cardlist = key[i].list.slice(0);
                    }
                }

                if (cardlist.length) {
                    var card = cardlist.randomGet();
                } else {
                    var card = {
                        name:cardName,
                        suit:['spade', 'heart', 'club', 'diamond'].randomGet(),
                        number:[1,2,3,4,5,6,7,8,9,10,11,12,13].randomGet(),
                        nature:'',
                    }
                    if (card.name=='sha') {
                        card.nature = ['','fire','thunder'].randomGet();
                    }
                }
                var num=lib.config.txhj_collect.cards[card.name];
                if(!num) num=0;
                lib.config.txhj_collect.cards[card.name]=num+1;
                game.saveConfig('txhj_collect',lib.config.txhj_collect);
                game.messagePopup('获得神器['+get.translation(card.name)+']');
                if (get.subtype(card.name)!='equip5'&&get.subtype(card.name)!='equip6'&&lib.config.taixuhuanjing[get.subtype(card.name)] == null) {
                    lib.config.taixuhuanjing[get.subtype(card.name)] = card;
                } else {
                    lib.config.taixuhuanjing.equips.push(card);
                }
            }
        } else if (effect.name=='skill') {
            if (lib.config.taixuhuanjing.useSkills.length<lib.config.taixuhuanjing.maxSkills) {
                lib.config.taixuhuanjing.useSkills.add(effect.result);
            } else if (!lib.config.taixuhuanjing.skills.contains(effect.result)) {
                lib.config.taixuhuanjing.skills.add(effect.result);
            }
            var num=lib.config.txhj_collect.cards[effect.result];
            if(!num) num=0;
            lib.config.txhj_collect.cards[effect.result]=num+1;
            game.saveConfig('txhj_collect',lib.config.txhj_collect);
            game.messagePopup('获得技能【'+get.translation(effect.result)+'】');

        } else if (effect.name=='removeSkill') {
            while(number--){
                var ranSkills=lib.config.taixuhuanjing.useSkills.concat(lib.config.taixuhuanjing.skills);
                if (ranSkills.length) {
                    var skill = ranSkills.randomGet();
                    if(lib.config.taixuhuanjing.useSkills.contains(skill)) {
                        lib.config.taixuhuanjing.useSkills.remove(skill);
                    }else {
                        lib.config.taixuhuanjing.skills.remove(skill);
                    }
                    game.messagePopup('失去技能【'+get.translation(skill)+'】');
                }else {
                    game.moveEffect({
                        name:'hp',
                        number:-1,
                    });
                }
            }
        } else if (effect.name=='randomSkill'||effect.name=='attack'||effect.name=='defense'||effect.name=='assist'||effect.name=='burst') {
            while(number--){
                var skills = txhjPack.skillRank.filter(function(current){
                    return lib.skill[current.skillID]&&lib.translate[current.skillID];
                }).slice(0);
                var listm = get.character(lib.config.taixuhuanjing.name,3).slice(0);
                var list = [];
                if (effect.name=='randomSkill') {
                    for (var i = 0; i < skills.length; i++) {
                        if (!lib.config.taixuhuanjing.useSkills.contains(skills[i].skillID)&&!listm.contains(skills[i].skillID)) {
                            list.push(skills[i]);
                        }
                    }
                } else {
                    for (var i = 0; i < skills.length; i++) {
                        if (lib.config.taixuhuanjing.useSkills.contains(skills[i].skillID)&&listm.contains(skills[i].skillID)) continue;
                        if (effect.name=='attack'&&skills[i].type.contains('攻击')) {
                            list.push(skills[i]);
                        } else if (effect.name=='defense'&&skills[i].type.contains('防御')) {
                            list.push(skills[i]);
                        } else if (effect.name=='assist'&&skills[i].type.contains('控制')) {
                            list.push(skills[i]);
                        } else if (effect.name=='burst'&&skills[i].type.contains('爆发')) {
                            list.push(skills[i]);
                        }
                    }
                }
                if (list.length) {
                    var skill = list.randomGet();
                    if (lib.config.taixuhuanjing.useSkills.length<lib.config.taixuhuanjing.maxSkills) {
                        lib.config.taixuhuanjing.useSkills.add(skill.skillID);
                    } else if (!lib.config.taixuhuanjing.skills.contains(skill.skillID)) {
                        lib.config.taixuhuanjing.skills.add(skill.skillID);
                    }
                    var num=lib.config.txhj_collect.cards[skill.skillID];
                    if(!num) num=0;
                    lib.config.txhj_collect.cards[skill.skillID]=num+1;
                    game.saveConfig('txhj_collect',lib.config.txhj_collect);
                    game.messagePopup('获得技能【'+get.translation(skill.skillID)+'】');
                } else {
                    game.messagePopup('无此类型技能可获得');
                }
                
            }
        } else if (effect.name=='buff') {
            if (!lib.config.taixuhuanjing.buff.contains(effect.result)){
                lib.config.taixuhuanjing.buff.add(effect.result);
            };
            var num=lib.config.txhj_collect.cards[effect.result];
            if(!num) num=0;
            lib.config.txhj_collect.cards[effect.result]=num+1;
            game.saveConfig('txhj_collect',lib.config.txhj_collect);
            game.messagePopup('获得祝福【'+game.buffPack[effect.result].name+'】');

        } else if (effect.name=='removeBuff') {
            while(number--){
                if (lib.config.taixuhuanjing.buff.length) {
                    var buff = lib.config.taixuhuanjing.buff.randomGet();
                    lib.config.taixuhuanjing.buff.remove(buff);
                    game.messagePopup('失去祝福【'+game.buffPack[buff].name+'】');
                }else {
                    game.moveEffect({
                        name:'hp',
                        number:-1,
                    });
                }
            }
        } else if (effect.name=='randomBuff') {
            var buffs = [];
            for (var i in game.buffPack) {
                if (game.buffPack[i].store==false) continue;
                if (!lib.config.taixuhuanjing.buff.contains(i)){
                    buffs.push(i);
                }
            }
            if (!buffs.length) game.messagePopup('已获得所有祝福');
            while(number--){
                if (buffs.length) {
                    var buff = buffs.randomGet();
                    lib.config.taixuhuanjing.buff.push(buff);
                    var num=lib.config.txhj_collect.cards[buff];
                    if(!num) num=0;
                    lib.config.txhj_collect.cards[buff]=num+1;
                    game.saveConfig('txhj_collect',lib.config.txhj_collect);
                    game.messagePopup('获得随机祝福【'+game.buffPack[buff].name+'】');
                }
            }
        } 
    };
    game.eventResult = function(result){
        if (result.effect&&result.effect.length) {
            for (var i = 0; i < result.effect.length; i++) {
                game.moveEffect(result.effect[i]);
            }
        }
    };
    game.lookChoose = function (node,view) {
        var home = ui.create.div('.taixuhuanjing_lookEventHome');
        document.body.appendChild(home);
        var homeBody = ui.create.div('.taixuhuanjing_lookEventHomeBody',home);
        homeBody.addEventListener("click",function(){
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
        var setLookEventSize = function(){
            var screenWidth = ui.window.offsetWidth;
            var screenHeight = ui.window.offsetHeight;
            var whr = 1.8;
            var width;
            var height;
            if(screenWidth / whr > screenHeight){
                height = screenHeight;
                width = height * whr;
            }else{
                width = screenWidth;
                height = screenWidth/whr;
            }
            homeBody.style.height = Math.round(height)+"px";
            homeBody.style.width = Math.round(width)+"px";
            homeBody.style.transform = 'translate(-50%,-50%) scale(0.6)';
        };
        setLookEventSize();
        var reLookEventsize = function(){
            setTimeout(setLookEventSize,500);
        };
        lib.onresize.push(reLookEventsize);

        var rank = lib.config.taixuhuanjing.rank;
        var season = lib.config.taixuhuanjing.season;
        var chapter = lib.config.taixuhuanjing.chapter;
        var box = ui.create.div('.taixuhuanjing_lookEventHomeBox',homeBody);
        var boxComps = {
            imp:(function(){
                var ext = game.eventPack[node.season][node.chapter][node.id].ext;
                var imp = ui.create.div('.taixuhuanjing_lookEventHomeBoxImp');
                imp.setBackgroundImage('extension/太虚幻境/image/big_bg/rogue_sub_'+ext+'.png');
                return imp;
            })(),
            title:(function(){
                var str = game.eventPack[node.season][node.chapter][node.id].name;
                var title = ui.create.div('.taixuhuanjing_lookEventHomeBoxTitle',''+str+'');
                return title;
            })(),
            info:(function(){
                var str = game.eventPack[node.season][node.chapter][node.id].text;
                var info = ui.create.div('.taixuhuanjing_lookEventHomeBoxInfo',''+str+'');
                return info;
            })(),
            buttonbg:(function(){
                var buttonbg = ui.create.div('.taixuhuanjing_lookEventHomeBoxButtonbg');
                function func2(result){
                    var button = ui.create.div('.taixuhuanjing_lookEventHomeBoxButton1');
                    button.innerHTML = result.name;
                    button.addEventListener("click",function(){
                        game.txhj_playAudioCall('WinButton',null,true);
                        if (result.result!=null&&get.eventState(node)!=true) {
                            if (result.result==true) {
                                game.messagePopup('回答正确');
                            } else {
                                game.messagePopup('回答错误');
                            }
                            lib.config.taixuhuanjing.events.push(node);
                            game.eventResult(result,'gain');
                        } 

                        if (result.result!=null) {
                            if(lib.config.taixuhuanjing.optional1 != null){
                                var optional = lib.config.taixuhuanjing.optional1;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional1 = null;
                                }
                            }
                            if(lib.config.taixuhuanjing.optional2 != null){
                                var optional = lib.config.taixuhuanjing.optional2;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional2 = null;
                                }
                            }
                            if(lib.config.taixuhuanjing.optional3 != null){
                                var optional = lib.config.taixuhuanjing.optional3;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional3 = null;
                                }
                            }
                            view.update();
                        } 
                        home.delete();
                        lib.onresize.remove(reLookEventsize);
                        var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                        event.cancelBubble = true;
                        event.returnValue = false; 
                        return false;
                    });
                    return button;
                };
                function func(result){
                    var button = ui.create.div('.taixuhuanjing_lookEventHomeBoxButton2');
                    button.innerHTML = result.name;
                    button.addEventListener("click",function(){
                        game.txhj_playAudioCall('WinButton',null,true);
                        home.delete();
                        lib.onresize.remove(reLookEventsize);
                        if (result.result!=null&&result.enemy.length) {
                            var number = 1 + result.enemy.length + result.friend.length;
                            _status.TaiXuHuanJingGame.number = number;
                            _status.TaiXuHuanJingGame.premise = result.premise;
                            _status.TaiXuHuanJingGame.event = node;
                            _status.TaiXuHuanJingGame.season = lib.config.taixuhuanjing.season;
                            _status.TaiXuHuanJingGame.chapter = lib.config.taixuhuanjing.chapter;
                            game.eventPack[node.season][node.chapter][node.id].enemy = result.enemy;
                            game.eventPack[node.season][node.chapter][node.id].friend = result.friend;
                            game.eventPack[node.season][node.chapter][node.id].spoils = result.spoils;
                            _status.TaiXuHuanJingGame.enemy = game.eventPack[node.season][node.chapter][node.id].enemy.slice(0);
                            _status.TaiXuHuanJingGame.friend = game.eventPack[node.season][node.chapter][node.id].friend.slice(0);
                            _status.TaiXuHuanJingGame.cards = lib.config.taixuhuanjing.cards;
                            _status.TaiXuHuanJingGame.skills = lib.config.taixuhuanjing.useSkills;
                            _status.gameStart=undefined;
                            game.delay(500);
                            game.chooseCharacterTaiXuHuanJing();
                            game.txhj_playAudioCall('QuickStart',null,true);
                            view.off(true);
                        } else if (result.result!=null&&result.buttons&&result.buttons.length&&(!result.enemy||!result.enemy.length)) {
                            if (result.result!=null&&get.eventState(node)!=true) {
                                lib.config.taixuhuanjing.events.push(node);
                                if (result.spoils) {
                                    var spoils = result.spoils.slice(0);
                                    for (var i = 0; i < spoils.length; i++) {
                                        if(Math.random()<=spoils[i].random){
                                            game.eventResult(spoils[i]);
                                        };
                                    };
                                }
                            } 
                            if(lib.config.taixuhuanjing.optional1 != null){
                                var optional = lib.config.taixuhuanjing.optional1;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional1 = null;
                                }
                            }
                            if(lib.config.taixuhuanjing.optional2 != null){
                                var optional = lib.config.taixuhuanjing.optional2;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional2 = null;
                                }
                            }
                            if(lib.config.taixuhuanjing.optional3 != null){
                                var optional = lib.config.taixuhuanjing.optional3;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional3 = null;
                                }
                            }
                            view.update();
                            home.delete();
                            lib.onresize.remove(reLookEventsize);
                            var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                            if (result.buttons&&result.buttons.length) {
                                var buttons = result.buttons.slice(0);
                                game.eventPack[node.season][node.chapter][node.id].buttons = buttons;
                                node.buttons = buttons;
                                setTimeout(function(){
                                    game.lookTrade(node,view);
                                },1000);
                            }
                        } else if (result.result!=null) {
                            if (result.result!=null&&get.eventState(node)!=true) {
                                lib.config.taixuhuanjing.events.push(node);
                                if (result.spoils) {
                                    var spoils = result.spoils.slice(0);
                                    for (var i = 0; i < spoils.length; i++) {
                                        if(Math.random()<=spoils[i].random){
                                            game.eventResult(spoils[i]);
                                        };
                                    };
                                }
                            } 
                            if(lib.config.taixuhuanjing.optional1 != null){
                                var optional = lib.config.taixuhuanjing.optional1;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional1 = null;
                                }
                            }
                            if(lib.config.taixuhuanjing.optional2 != null){
                                var optional = lib.config.taixuhuanjing.optional2;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional2 = null;
                                }
                            }
                            if(lib.config.taixuhuanjing.optional3 != null){
                                var optional = lib.config.taixuhuanjing.optional3;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional3 = null;
                                }
                            }
                            view.update();
                            home.delete();
                            lib.onresize.remove(reLookEventsize);
                            var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                        }
                        event.cancelBubble = true;
                        event.returnValue = false; 
                        return false;
                    });
                    return button;
                };

                var buttons = game.eventPack[node.season][node.chapter][node.id].buttons.slice(0);
                buttons.randomSort();
                if(buttons.length==1||buttons.length==3) buttons.push({
                    result:null,
                    name:'思考一下',
                    effect:[],
                    number:0,
                    buff:[],
                    card:[],
                    equip:[],
                    skill:[],
                });
                if (buttons.length<3) {
                    while(buttons.length){
                        buttonbg.appendChild(func2(buttons.shift()));
                    }
                } else {
                    while(buttons.length){
                        buttonbg.appendChild(func(buttons.shift()));
                    }
                }
                return buttonbg;
            })(),
        }
        for(var i in boxComps){
            box.appendChild(boxComps[i]);
        }
        home.addEventListener("click",function(){
            game.txhj_playAudioCall('off',null,true);
            home.delete();
            lib.onresize.remove(reLookEventsize);
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
    };
    game.lookTrade = function (node,view) {
        var home = ui.create.div('.taixuhuanjing_lookEventHome');
        document.body.appendChild(home);
        var homeBody = ui.create.div('.taixuhuanjing_lookEventHomeBody',home);
        homeBody.addEventListener("click",function(){
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
        var setLookEventSize = function(){
            var screenWidth = ui.window.offsetWidth;
            var screenHeight = ui.window.offsetHeight;
            var whr = 1.8;
            var width;
            var height;
            if(screenWidth / whr > screenHeight){
                height = screenHeight;
                width = height * whr;
            }else{
                width = screenWidth;
                height = screenWidth/whr;
            }
            homeBody.style.height = Math.round(height)+"px";
            homeBody.style.width = Math.round(width)+"px";
            homeBody.style.transform = 'translate(-50%,-50%) scale(0.6)';
        };
        setLookEventSize();
        var reLookEventsize = function(){
            setTimeout(setLookEventSize,500);
        };
        lib.onresize.push(reLookEventsize);

        var rank = lib.config.taixuhuanjing.rank;
        var season = lib.config.taixuhuanjing.season;
        var chapter = lib.config.taixuhuanjing.chapter;
        var box = ui.create.div('.taixuhuanjing_lookEventHomeBox',homeBody);
        var boxComps = {
            imp:(function(){
                var ext = node.ext;
                var imp = ui.create.div('.taixuhuanjing_lookEventHomeBoxImp');
                imp.setBackgroundImage('extension/太虚幻境/image/big_bg/rogue_sub_'+ext+'.png');
                return imp;
            })(),
            title:(function(){
                var str = node.name;
                var title = ui.create.div('.taixuhuanjing_lookEventHomeBoxTitle',''+str+'');
                return title;
            })(),
            info:(function(){
                var str = node.text;
                var info = ui.create.div('.taixuhuanjing_lookEventHomeBoxInfo',''+str+'');
                return info;
            })(),
            buttonbg:(function(){
                var buttonbg = ui.create.div('.taixuhuanjing_lookEventHomeBoxButtonbg');
                function func(result){
                    var button = ui.create.div('.taixuhuanjing_lookEventHomeBoxButton2');
                    button.innerHTML = result.name;
                    button.addEventListener("click",function(){
                        game.txhj_playAudioCall('WinButton',null,true);
                        if (get.eventState(node)!=true) {
                            lib.config.taixuhuanjing.events.push(node);
                            if(lib.config.taixuhuanjing.optional1 != null){
                                var optional = lib.config.taixuhuanjing.optional1;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional1 = null;
                                }
                            }
                            if(lib.config.taixuhuanjing.optional2 != null){
                                var optional = lib.config.taixuhuanjing.optional2;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional2 = null;
                                }
                            }
                            if(lib.config.taixuhuanjing.optional3 != null){
                                var optional = lib.config.taixuhuanjing.optional3;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional3 = null;
                                }
                            }
                        } 
                        game.eventResult(result,'trade');
                        view.update();
                        home.delete();
                        lib.onresize.remove(reLookEventsize);
                        var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                        event.cancelBubble = true;
                        event.returnValue = false; 
                        return false;
                    });
                    return button;
                };
                function func2(result){
                    var button = ui.create.div('.taixuhuanjing_lookEventHomeBoxButton1');
                    button.innerHTML = result.name;
                    button.addEventListener("click",function(){
                        game.txhj_playAudioCall('WinButton',null,true);
                        if (get.eventState(node)!=true) {
                            lib.config.taixuhuanjing.events.push(node);
                            if(lib.config.taixuhuanjing.optional1 != null){
                                var optional = lib.config.taixuhuanjing.optional1;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional1 = null;
                                }
                            }
                            if(lib.config.taixuhuanjing.optional2 != null){
                                var optional = lib.config.taixuhuanjing.optional2;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional2 = null;
                                }
                            }
                            if(lib.config.taixuhuanjing.optional3 != null){
                                var optional = lib.config.taixuhuanjing.optional3;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional3 = null;
                                }
                            }
                        } 
                        game.eventResult(result,'trade');
                        view.update();
                        home.delete();
                        lib.onresize.remove(reLookEventsize);
                        var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                        event.cancelBubble = true;
                        event.returnValue = false; 
                        return false;
                    });
                    return button;
                };
                var buttons = node.buttons.slice(0);
                if (buttons.length<3) {
                    while(buttons.length){
                        buttonbg.appendChild(func2(buttons.shift()));
                    }
                } else {
                    while(buttons.length){
                        buttonbg.appendChild(func(buttons.shift()));
                    }
                }
                return buttonbg;
            })(),
        }
        for(var i in boxComps){
            box.appendChild(boxComps[i]);
        }
        home.addEventListener("click",function(){
            game.txhj_playAudioCall('off',null,true);
            home.delete();
            lib.onresize.remove(reLookEventsize);
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
    };
    game.lookAnswer = function (node,view) {
        var home = ui.create.div('.taixuhuanjing_lookEventHome');
        document.body.appendChild(home);
        var homeBody = ui.create.div('.taixuhuanjing_lookEventHomeBody',home);
        homeBody.addEventListener("click",function(){
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
        var setLookEventSize = function(){
            var screenWidth = ui.window.offsetWidth;
            var screenHeight = ui.window.offsetHeight;
            var whr = 1.8;
            var width;
            var height;
            if(screenWidth / whr > screenHeight){
                height = screenHeight;
                width = height * whr;
            }else{
                width = screenWidth;
                height = screenWidth/whr;
            }
            homeBody.style.height = Math.round(height)+"px";
            homeBody.style.width = Math.round(width)+"px";
            homeBody.style.transform = 'translate(-50%,-50%) scale(0.6)';
        };
        setLookEventSize();
        var reLookEventsize = function(){
            setTimeout(setLookEventSize,500);
        };
        lib.onresize.push(reLookEventsize);

        var rank = lib.config.taixuhuanjing.rank;
        var season = lib.config.taixuhuanjing.season;
        var chapter = lib.config.taixuhuanjing.chapter;
        var box = ui.create.div('.taixuhuanjing_lookEventHomeBox',homeBody);
        var boxComps = {
            imp:(function(){
                var ext = game.examPack[node.type][node.id].ext;
                var imp = ui.create.div('.taixuhuanjing_lookEventHomeBoxImp');
                imp.setBackgroundImage('extension/太虚幻境/image/big_bg/rogue_sub_'+ext+'.png');
                return imp;
            })(),
            title:(function(){
                var str = game.examPack[node.type][node.id].name;
                var title = ui.create.div('.taixuhuanjing_lookEventHomeBoxTitle',''+str+'');
                return title;
            })(),
            info:(function(){
                var str = game.examPack[node.type][node.id].text;
                var info = ui.create.div('.taixuhuanjing_lookEventHomeBoxInfo',''+str+'');
                return info;
            })(),
            buttonbg:(function(){
                var buttonbg = ui.create.div('.taixuhuanjing_lookEventHomeBoxButtonbg');
                var choiceList = game.examPack[node.type][node.id].buttons.slice(0);
                function func2(result){
                    var button = ui.create.div('.taixuhuanjing_lookEventHomeBoxButton1');
                    button.innerHTML = result.name;
                    if (result.result==false&&lib.config.taixuhuanjing.buff.add('buff_txhj_bowenqiangzhi')) {
                        if (lib.config.taixuhuanjing.bowenqiangzhi==result.name) {
                            button.innerHTML = result.name+'（错误）';
                        } else if (lib.config.taixuhuanjing.bowenqiangzhi==null) {
                            button.innerHTML = result.name+'（错误）';
                            lib.config.taixuhuanjing.bowenqiangzhi = result.name;
                            var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                        }
                    }
                    button.addEventListener("click",function(){
                        game.txhj_playAudioCall('WinButton',null,true);
                        if (result.result!=null) {
                            if (result.result==true) {
                                game.messagePopup('回答正确');
                            } else {
                                game.messagePopup('回答错误');
                            }
                            lib.config.taixuhuanjing.bowenqiangzhi=null;
                            if (!lib.config.taixuhuanjing.exam.contains(node.id)) {
                                lib.config.taixuhuanjing.exam.push(node.id);
                            }
                            game.eventResult(result,'gain');
                        } 

                        if (result.result!=null) {
                            if(lib.config.taixuhuanjing.optional1 != null){
                                var optional = lib.config.taixuhuanjing.optional1;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional1 = null;
                                }
                            }
                            if(lib.config.taixuhuanjing.optional2 != null){
                                var optional = lib.config.taixuhuanjing.optional2;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional2 = null;
                                }
                            }
                            if(lib.config.taixuhuanjing.optional3 != null){
                                var optional = lib.config.taixuhuanjing.optional3;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional3 = null;
                                }
                            }
                            view.update();
                        } 
                        home.delete();
                        lib.onresize.remove(reLookEventsize);
                        var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                        event.cancelBubble = true;
                        event.returnValue = false; 
                        return false;
                    });
                    return button;
                };
                function func(result){
                    var button = ui.create.div('.taixuhuanjing_lookEventHomeBoxButton2');
                    button.innerHTML = result.name;
                    if (result.result==false&&lib.config.taixuhuanjing.buff.contains('buff_txhj_bowenqiangzhi')) {
                        if (lib.config.taixuhuanjing.bowenqiangzhi==result.name) {
                            button.innerHTML = result.name+'（错误）';
                        } else if (lib.config.taixuhuanjing.bowenqiangzhi==null) {
                            button.innerHTML = result.name+'（错误）';
                            lib.config.taixuhuanjing.bowenqiangzhi = result.name;
                            var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                        }
                    }
                    button.addEventListener("click",function(){
                        game.txhj_playAudioCall('WinButton',null,true);
                        if (result.result!=null) {
                            if (result.result==true) {
                                game.messagePopup('回答正确');
                            } else {
                                game.messagePopup('回答错误');
                            }
                            lib.config.taixuhuanjing.bowenqiangzhi=null;
                            if (!lib.config.taixuhuanjing.exam.contains(node.id)) {
                                lib.config.taixuhuanjing.exam.push(node.id);
                            }
                            game.eventResult(result,'gain');
                        } 

                        if (result.result!=null) {
                            if(lib.config.taixuhuanjing.optional1 != null){
                                var optional = lib.config.taixuhuanjing.optional1;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional1 = null;
                                }
                            }
                            if(lib.config.taixuhuanjing.optional2 != null){
                                var optional = lib.config.taixuhuanjing.optional2;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional2 = null;
                                }
                            }
                            if(lib.config.taixuhuanjing.optional3 != null){
                                var optional = lib.config.taixuhuanjing.optional3;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional3 = null;
                                }
                            }
                            view.update();
                        } 
                        view.update();
                        home.delete();
                        lib.onresize.remove(reLookEventsize);
                        var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                        event.cancelBubble = true;
                        event.returnValue = false; 
                        return false;
                    });
                    return button;
                };

                var buttons = game.examPack[node.type][node.id].buttons.slice(0);
                buttons.randomSort();
                if(buttons.length==1||buttons.length==3) buttons.push({
                    result:null,
                    name:'思考一下',
                    effect:[],
                    number:0,
                    buff:[],
                    card:[],
                    equip:[],
                    skill:[],
                });
                if (buttons.length<3) {
                    while(buttons.length){
                        buttonbg.appendChild(func2(buttons.shift()));
                    }
                } else {
                    while(buttons.length){
                        buttonbg.appendChild(func(buttons.shift()));
                    }
                }
                return buttonbg;
            })(),
        }
        for(var i in boxComps){
            box.appendChild(boxComps[i]);
        }
        home.addEventListener("click",function(){
            game.txhj_playAudioCall('off',null,true);
            home.delete();
            lib.onresize.remove(reLookEventsize);
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
    };
    game.lookEvent = function (node,view) {
        var home = ui.create.div('.taixuhuanjing_lookEventHome');
        document.body.appendChild(home);
        var homeBody = ui.create.div('.taixuhuanjing_lookEventHomeBody',home);
        homeBody.addEventListener("click",function(){
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
        var setLookEventSize = function(){
            var screenWidth = ui.window.offsetWidth;
            var screenHeight = ui.window.offsetHeight;
            var whr = 1.8;
            var width;
            var height;
            if(screenWidth / whr > screenHeight){
                height = screenHeight;
                width = height * whr;
            }else{
                width = screenWidth;
                height = screenWidth/whr;
            }
            homeBody.style.height = Math.round(height)+"px";
            homeBody.style.width = Math.round(width)+"px";
            homeBody.style.transform = 'translate(-50%,-50%) scale(0.6)';
        };
        setLookEventSize();
        var reLookEventsize = function(){
            setTimeout(setLookEventSize,500);
        };
        lib.onresize.push(reLookEventsize);

        var rank = lib.config.taixuhuanjing.rank;
        var season = lib.config.taixuhuanjing.season;
        var chapter = lib.config.taixuhuanjing.chapter;
        var box = ui.create.div('.taixuhuanjing_lookEventHomeBox',homeBody);
        var boxComps = {
            imp:(function(){
                var imp = ui.create.div('.taixuhuanjing_lookEventHomeBoxImp');
                imp.setBackgroundImage('extension/太虚幻境/image/big_bg/rogue_sub_'+node.ext+'.png');
                return imp;
            })(),
            title:(function(){
                var str = node.name;
                var title = ui.create.div('.taixuhuanjing_lookEventHomeBoxTitle',''+str+'');
                return title;
            })(),
            info:(function(){
                var str = node.text;
                var info = ui.create.div('.taixuhuanjing_lookEventHomeBoxInfo',''+str+'');
                return info;
            })(),
            buttonbg:(function(){
                var buttonbg = ui.create.div('.taixuhuanjing_lookEventHomeBoxButtonbg');
                function func2(result){
                    var button = ui.create.div('.taixuhuanjing_lookEventHomeBoxButton1');
                    button.innerHTML = result.name;
                    button.addEventListener("click",function(){
                        game.txhj_playAudioCall('WinButton',null,true);
                        if (result.result!=null&&get.eventState(node)!=true) {
                            lib.config.taixuhuanjing.events.push(node);
                            game.eventResult(result,'gain');
                        } 

                        if (result.result!=null) {
                            game.changeEvent(node);
                            if(lib.config.taixuhuanjing.optional1 != null){
                                var optional = lib.config.taixuhuanjing.optional1;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional1 = null;
                                }
                            }
                            if(lib.config.taixuhuanjing.optional2 != null){
                                var optional = lib.config.taixuhuanjing.optional2;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional2 = null;
                                }
                            }
                            if(lib.config.taixuhuanjing.optional3 != null){
                                var optional = lib.config.taixuhuanjing.optional3;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional3 = null;
                                }
                            }
                            view.update();
                        } 
                        home.delete();
                        lib.onresize.remove(reLookEventsize);
                        var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                        event.cancelBubble = true;
                        event.returnValue = false; 
                        return false;
                    });
                    return button;
                };
                function func(result){
                    var button = ui.create.div('.taixuhuanjing_lookEventHomeBoxButton2');
                    button.innerHTML = result.name;
                    button.addEventListener("click",function(){
                        game.txhj_playAudioCall('WinButton',null,true);
                        if (result.result!=null&&get.eventState(node)!=true) {
                            lib.config.taixuhuanjing.events.push(node);
                            game.eventResult(result,'gain');
                        } 

                        if (result.result!=null) {
                            game.changeEvent(node);
                            if(lib.config.taixuhuanjing.optional1 != null){
                                var optional = lib.config.taixuhuanjing.optional1;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional1 = null;
                                }
                            }
                            if(lib.config.taixuhuanjing.optional2 != null){
                                var optional = lib.config.taixuhuanjing.optional2;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional2 = null;
                                }
                            }
                            if(lib.config.taixuhuanjing.optional3 != null){
                                var optional = lib.config.taixuhuanjing.optional3;
                                if (optional.id==node.id&&optional.seat==node.seat) {
                                    lib.config.taixuhuanjing.optional3 = null;
                                }
                            }
                            view.update();
                        } 
                        view.update();
                        home.delete();
                        lib.onresize.remove(reLookEventsize);
                        var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                        event.cancelBubble = true;
                        event.returnValue = false; 
                        return false;
                    });
                    return button;
                };
                var buttons = node.buttons.slice(0);
                if(buttons.length==1||buttons.length==3) buttons.push({
                    result:null,
                    name:'思考一下',
                    effect:[],
                    number:0,
                    buff:[],
                    card:[],
                    equip:[],
                    skill:[],
                });
                    if (buttons.length<3) {
                        while(buttons.length){
                            buttonbg.appendChild(func2(buttons.shift()));
                        }
                    } else {
                        while(buttons.length){
                            buttonbg.appendChild(func(buttons.shift()));
                        }
                    }
                    return buttonbg;
                })(),
            }
            for(var i in boxComps){
                box.appendChild(boxComps[i]);
            }
            home.addEventListener("click",function(){
                game.txhj_playAudioCall('off',null,true);
                home.delete();
                lib.onresize.remove(reLookEventsize);
                event.cancelBubble = true;
                event.returnValue = false; 
                return false;
            });
    };
    game.lookBoss = function (node,view) {
        var home = ui.create.div('.taixuhuanjing_lookEventHome');
        document.body.appendChild(home);
        var homeBody = ui.create.div('.taixuhuanjing_lookBossHomeBody',home);
        homeBody.addEventListener("click",function(){
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
        var setLookEventSize = function(){
            var screenWidth = ui.window.offsetWidth;
            var screenHeight = ui.window.offsetHeight;
            var whr = 1.8;
            var width;
            var height;
            if(screenWidth / whr > screenHeight){
                height = screenHeight;
                width = height * whr;
            }else{
                width = screenWidth;
                height = screenWidth/whr;
            }
            homeBody.style.height = Math.round(height)+"px";
            homeBody.style.width = Math.round(width)+"px";
            homeBody.style.transform = 'translate(-50%,-50%) scale(0.6)';
        };
        setLookEventSize();
        var reLookEventsize = function(){
            setTimeout(setLookEventSize,500);
        };
        lib.onresize.push(reLookEventsize);
        var rank = lib.config.taixuhuanjing.rank;
        var season = lib.config.taixuhuanjing.season;
        var chapter = lib.config.taixuhuanjing.chapter;
        var box = ui.create.div('.taixuhuanjing_lookBossHomeBox',homeBody);
        var playBody = ui.create.div('.taixuhuanjing_lookEventHomePlayBody',box);
        var num = 0;
        var enemyList = game.eventPack[node.season][node.chapter][node.id].enemy.slice(0);
        var friendList = game.eventPack[node.season][node.chapter][node.id].friend.slice(0);
        var playList = enemyList.concat(friendList);
        playBody.update = function (){
            playBody.innerHTML = '';
            var play = playList[num].name;
            var level = playList[num].level;
            var type = playList[num].type;
            var playComps = {
                playImp:(function(){
                    var playImp = ui.create.div('.taixuhuanjing_lookEventHomePlayImp');
                    //大图修改
                    playImp.setBackgroundImage("extension/太虚幻境/image/yuanhua/" + play + ".jpg");

                    return playImp;
                })(),
                playFrame:(function(){
                    var playFrame = ui.create.div('.taixuhuanjing_lookEventHomePlayFrame');
                    var enemys = playList;
                    var playArrow1 = ui.create.div('.taixuhuanjing_lookEventHomePlayArrow1',playFrame);
                    playArrow1.listen(function(e){
                        game.txhj_playAudioCall('WinButton',null,true);
                        num--;
                        playBody.update();
                        textBox.update();
                    });
                    var playArrow2 = ui.create.div('.taixuhuanjing_lookEventHomePlayArrow2',playFrame);
                    playArrow2.listen(function(e){
                        game.txhj_playAudioCall('WinButton',null,true);
                        num++;
                        playBody.update();
                        textBox.update();
                    });
                    playFrame.update = function(){
                        if (enemys.length==1) {
                            playArrow1.style.display = 'none';
                            playArrow2.style.display = 'none';
                        }
                        if ((enemys.length - 1)>num) {
                            playArrow2.style.display = 'block';
                        } else {
                            playArrow2.style.display = 'none';
                        }
                        if (num>0) {
                            playArrow1.style.display = 'block';
                        } else {
                            playArrow1.style.display = 'none';
                        }
                    };
                    playFrame.update();
                    return playFrame;
                })(),
                playText:(function(){
                    var playText = ui.create.div('.taixuhuanjing_lookEventHomePlayText');
                    var playText1 = ui.create.div('.taixuhuanjing_lookEventHomePlayText1','等级'+level,playText);
                    var playHp = ui.create.div('.taixuhuanjing_lookEventHomePlayText2',playText); 
                    var intro = lib.character[play];
                    if(!intro){
                        for(var i in lib.characterPack){
                            if(lib.characterPack[i][play]){
                                intro=lib.characterPack[i][play];
                                break;
                            }
                        }
                    }
                    var hp = intro[2];
                    var hp1 = get.infoHp(hp);
                    var maxHp1 = get.infoMaxHp(hp);
                    var hp2 = playList[num].hp;
                    var maxHp2 = playList[num].maxHp;
                    hp1 += hp2;
                    maxHp1 += maxHp2;
                    if (lib.config.taixuhuanjing.rank>1) {
                        hp1++;
                        maxHp1++;
                    }
                    if (hp1<8&&maxHp1<8) {
                        var num2 = maxHp1 - hp1;
                        while(hp1--){
                            var tmp = ui.create.div(".taixuhuanjing_chooseCharacterPlayBodyHpICON",playHp);
                            tmp.style["background-image"] = "url("+lib.assetURL+"extension/太虚幻境/image/icon/maxHp.png)";
                        }
                        while(num2--){
                            var tmp = ui.create.div(".taixuhuanjing_chooseCharacterPlayBodyHpICON",playHp);
                            tmp.style["background-image"] = "url("+lib.assetURL+"extension/太虚幻境/image/icon/maxHp.png)";
                            tmp.style.webkitFilter = "grayscale(1)";
                        }
                    } else {
                        var tmp = ui.create.div(".taixuhuanjing_chooseCharacterPlayBodyHpICON",playHp);
                        tmp.style["background-image"] = "url("+lib.assetURL+"extension/太虚幻境/image/icon/maxHp.png)";
                        var numbody = ui.create.div(".taixuhuanjing_chooseCharacterPlayBodyHpNum",hp+'',playHp);
                    }
                    return playText;
                })(),
                playType:(function(){
                    var playType = ui.create.div('.taixuhuanjing_lookEventHomePlayType');
                    if (type=='boss') {
                        playType.setBackgroundImage('extension/太虚幻境/image/style/identity_boss.png');
                    } else {
                        if (friendList.contains(playList[num])) {
                            playType.setBackgroundImage('extension/太虚幻境/image/style/identity_friend.png');
                        } else {
                            playType.setBackgroundImage('extension/太虚幻境/image/style/identity_enemy.png');
                        }
                    }
                    return playType;
                })(),
            }
            for(var i in playComps){
                playBody.appendChild(playComps[i]);
            }
        };
        playBody.update();
        var title = ui.create.div('.taixuhuanjing_lookEventHomeTitle',box);
        var textBox = ui.create.div('.taixuhuanjing_lookEventHomeTextBox',box);
        textBox.update = function(){
            textBox.innerHTML = '';
            title.innerHTML = lib.translate[playList[num].name];
            var textTitle = ui.create.div('.taixuhuanjing_lookEventHomeTextTitle',textBox);
            var text = ui.create.div('.taixuhuanjing_lookEventHomeText',textBox);
            text.update = function(type){
                text.innerHTML = '';
                var play = playList[num].name;
                var str = '';
                if (type=='skill') {
                    var skills1 = get.character(play,3).slice(0);
                    var skills2 = game.effectPack[lib.config.taixuhuanjing.effect].skill.slice(0);
                    var skills = skills1.concat(skills2);
                    if (lib.config.taixuhuanjing.rank>2) {
                        if (!skills.contains('reyingzi')) {
                            skills.push('reyingzi');
                        }
                        if (!skills.contains('mashu')) {
                            skills.push('mashu');
                        }
                    }
                    for(var i=0;i<skills.length;i++){
                        if(!lib.translate[skills[i]]||!lib.translate[skills[i]+'_info']) {
                            skills.remove(skills[i]);
                            i--;
                            continue;
                        }
                        if(str!="") str+="<p>";
                        str+= "<br>"+get.translation([skills[i]])+":";
                        str+=lib.translate[skills[i]+'_info'];
                    }
                    if (!skills.length) str+="<p>无技能";
                } else if (type=='effect') {
                    var effects = playList[num].effect.slice(0);
                    if (lib.config.taixuhuanjing.rank>1) {
                        game.effectPack.correct.info = '等级补正：你每超出其一级，其额外+2体力及体力上限';
                    }
                    if (lib.config.taixuhuanjing.rank==2) {
                        effects.unshift('strengthen');
                    } else if (lib.config.taixuhuanjing.rank==3) {
                        effects.unshift('nightmare');
                    } else if (lib.config.taixuhuanjing.rank>=4) {
                        effects.unshift('purgatory');
                    }
                    for(var i=0;i<effects.length;i++){
                        if(str!="") str+="<p>";
                        str+= "<br>"+game.effectPack[effects[i]].info;
                    }
                    if (!effects.length) str+="<p><br>无特殊效果";
                } else if (type=='spoil') {
                    var spoils = playList[num].spoils.slice(0);
                    for(var i=0;i<spoils.length;i++){
                        if(str!="") str+="<p>";
                        str+= "<br>"+spoils[i].name;
                    }
                    if (!spoils.length) str+="<p><br>无战利品";
                }  else if (type=='info') {
                    var info = '<p>'+get.characterIntro(playList[num].name);
                    str+=info;
                    if (info=='') str="<p><br>无背景资料";
                }
                text.innerHTML = str;
            };
            function func(str){
                var buttonDiv = ui.create.div('.taixuhuanjing_lookEventHomeTextDiv',''+str+'');
                buttonDiv.listen(function(e){
                    game.txhj_playAudioCall('WinButton',null,true);
                    this.choiced();
                    event.cancelBubble = true;
                    event.returnValue = false; 
                    return false;    
                });
                buttonDiv.choiced = function(){
                    if(textTitle.choosingNow){
                        textTitle.choosingNow.noChoiced();
                    }
                    textTitle.choosingNow = this;
                    buttonDiv.setBackgroundImage('extension/太虚幻境/image/icon/icon_Button10.png');
                    if (str=='技能') {
                        text.update('skill');
                    } else if (str=='特殊效果') {
                        text.update('effect');
                    } else if (str=='战利品') {
                        text.update('spoil');
                    } else if (str=='背景') {
                        text.update('info');
                    } 
                };
                buttonDiv.noChoiced = function(){
                    textTitle.choosingNow = null;
                    buttonDiv.setBackgroundImage('extension/太虚幻境/image/icon/icon_Button9.png');
                };
                if (str=='技能') {
                    buttonDiv.choiced();
                };
                return buttonDiv;
            };
            var list = ['技能','特殊效果','战利品','背景'];
            while(list.length){
                textTitle.appendChild(func(list.shift()));
            };
        };
        textBox.update();
        var button = ui.create.div('.taixuhuanjing_lookEventHomeButton','挑战',box);
        button.addEventListener("click",function(){
            game.txhj_playAudioCall('WinButton',null,true);
            var number = 1 + game.eventPack[node.season][node.chapter][node.id].enemy.length + game.eventPack[node.season][node.chapter][node.id].friend.length;
            _status.TaiXuHuanJingGame.number = number;
            _status.TaiXuHuanJingGame.premise = game.eventPack[node.season][node.chapter][node.id].premise;
            _status.TaiXuHuanJingGame.event = node;
            _status.TaiXuHuanJingGame.season = lib.config.taixuhuanjing.season;
            _status.TaiXuHuanJingGame.chapter = lib.config.taixuhuanjing.chapter;
            _status.TaiXuHuanJingGame.enemy = game.eventPack[node.season][node.chapter][node.id].enemy.slice(0);
            _status.TaiXuHuanJingGame.friend = game.eventPack[node.season][node.chapter][node.id].friend.slice(0);
            _status.TaiXuHuanJingGame.cards = lib.config.taixuhuanjing.cards;
            _status.TaiXuHuanJingGame.skills = lib.config.taixuhuanjing.useSkills;
            _status.gameStart=undefined;
            game.delay(100);
            game.txhj_playAudioCall('QuickStart',null,true);
            home.delete();
            lib.onresize.remove(reLookEventsize);
            view.off(true);
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
        home.addEventListener("click",function(){
            game.txhj_playAudioCall('off',null,true);
            home.delete();
            lib.onresize.remove(reLookEventsize);
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
    };
    game.lookStore = function (node,view) {
        var home = ui.create.div('.taixuhuanjing_lookEventHome');
        document.body.appendChild(home);
        var homeBody = ui.create.div('.taixuhuanjing_lookEventHomeBody',home);
        homeBody.addEventListener("click",function(){
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
        var setLookEventSize = function(){
            var screenWidth = ui.window.offsetWidth;
            var screenHeight = ui.window.offsetHeight;
            var whr = 1.8;
            var width;
            var height;
            if(screenWidth / whr > screenHeight){
                height = screenHeight;
                width = height * whr;
            }else{
                width = screenWidth;
                height = screenWidth/whr;
            }
            homeBody.style.height = Math.round(height)+"px";
            homeBody.style.width = Math.round(width)+"px";
            homeBody.style.transform = 'translate(-50%,-50%) scale(0.7)';
        };
        setLookEventSize();
        var reLookEventsize = function(){
            setTimeout(setLookEventSize,500);
        };
        lib.onresize.push(reLookEventsize);
        var rank = lib.config.taixuhuanjing.rank;
        var season = lib.config.taixuhuanjing.season;
        var chapter = lib.config.taixuhuanjing.chapter;
        var level = game.changePack[node.id].level;
        var createCard = function(cardName){
            var card = {
                name:cardName,
                suit:['spade', 'heart', 'club', 'diamond'].randomGet(),
                number:[1,2,3,4,5,6,7,8,9,10,11,12,13].randomGet(),
                nature:['','fire','thunder'].randomGet(),
            };
            return card;
        };
        if(!lib.config.taixuhuanjing.store){
            lib.config.taixuhuanjing.store = {};
        }
        if(!lib.config.taixuhuanjing.store[node.season]){
            lib.config.taixuhuanjing.store[node.season] = {};
        }
        if(!lib.config.taixuhuanjing.store[node.season][node.chapter]){
            lib.config.taixuhuanjing.store[node.season][node.chapter] = {};
        }
        if(!lib.config.taixuhuanjing.store[node.season][node.chapter][node.id]){
            var cards = [];
            var equip = [];
            for (var i = 0; i < txhjPack.cardPack.length; i++) {
                var num = get.cardRank(txhjPack.cardPack[i].cardID);
                if (level==1) {
                    if (num<3) {
                        if (lib.translate[txhjPack.cardPack[i].cardID]&&get.type(txhjPack.cardPack[i].cardID)!='equip') {
                            cards.push(txhjPack.cardPack[i].cardID);
                        } else if (lib.translate[txhjPack.cardPack[i].cardID]){
                            equip.push(txhjPack.cardPack[i].cardID);
                        }
                    }
                } else if (level==2) {
                    if (num<4) {
                        if (lib.translate[txhjPack.cardPack[i].cardID]&&get.type(txhjPack.cardPack[i].cardID)!='equip') {
                            cards.push(txhjPack.cardPack[i].cardID);
                        } else if (lib.translate[txhjPack.cardPack[i].cardID]){
                            equip.push(txhjPack.cardPack[i].cardID);
                        }
                    }
                } else if (level==3) {
                    if (num>1) {
                        if (lib.translate[txhjPack.cardPack[i].cardID]&&get.type(txhjPack.cardPack[i].cardID)!='equip') {
                            cards.push(txhjPack.cardPack[i].cardID);
                        } else if (lib.translate[txhjPack.cardPack[i].cardID]){
                            equip.push(txhjPack.cardPack[i].cardID);
                        }
                    }
                } else if (level==4) {
                    if (num>1) {
                        if (lib.translate[txhjPack.cardPack[i].cardID]&&get.type(txhjPack.cardPack[i].cardID)!='equip') {
                            cards.push(txhjPack.cardPack[i].cardID);
                        } else if (lib.translate[txhjPack.cardPack[i].cardID]){
                            equip.push(txhjPack.cardPack[i].cardID);
                        }
                    }
                    } else if (level==5) {
                    if (num<=5) {
                        if (lib.translate[txhjPack.cardPack[i].cardID]&&get.type(txhjPack.cardPack[i].cardID)!='equip') {
                            cards.push(txhjPack.cardPack[i].cardID);
                        } else if (lib.translate[txhjPack.cardPack[i].cardID]){
                            equip.push(txhjPack.cardPack[i].cardID);
                        }
                    }
                }
            }
            var skills = [];
            for (var i = 0; i < txhjPack.skillRank.length; i++) {
            	if(!lib.skill[txhjPack.skillRank[i].skillID]||!lib.translate[txhjPack.skillRank[i].skillID]) continue;
                var num = get.skillRank(txhjPack.skillRank[i].skillID);
                if (level==1) {
                    if (num<3) {
                        skills.push(txhjPack.skillRank[i].skillID);
                    }
                } else if (level==2) {
                    if (num<4) {
                        skills.push(txhjPack.skillRank[i].skillID);
                    }
                } else if (level==3) {
                    if (num>1) {
                        skills.push(txhjPack.skillRank[i].skillID);
                    }
                } else if (level==4) {
                    if (num>2) {
                        skills.push(txhjPack.skillRank[i].skillID);
                    }
               } else if (level==5) {
                    if (num>1) {
                        skills.push(txhjPack.skillRank[i].skillID);
                    }
                }
            }
            var buffs = [];
            for (var i in game.buffPack) {
                if (game.buffPack[i].store==false) continue;
                if (lib.config.taixuhuanjing.buff.contains(i)) continue;
                var num = game.buffPack[i].rank;
                if (level==1) {
                    if (num<=3) {
                        buffs.push(i);
                    }
                } else if (level==2) {
                    if (num<=4) {
                        buffs.push(i);
                    }
                } else if (level==3) {
                    if (num>1) {
                        buffs.push(i);
                    }
                } else if (level==4) {
                    if (num>1) {
                        buffs.push(i);
                    }
               } else if (level==5) {
                    if (num<=4) {
                        buffs.push(i);
                    }
                }
            }
            for (var i = 0; i < txhjPack.skillRank.length; i++) {
            	if(!lib.skill[txhjPack.skillRank[i].skillID]||!lib.translate[txhjPack.skillRank[i].skillID]) continue;
                if (lib.config.taixuhuanjing.useSkills.contains(txhjPack.skillRank[i].skillID)) continue;
                var num = get.skillRank(txhjPack.skillRank[i]);
                if (level==1) {
                    if (num<3) {
                        skills.push(txhjPack.skillRank[i].skillID);
                    }
                } else if (level==2) {
                    if (num<4) {
                        skills.push(txhjPack.skillRank[i].skillID);
                    }
                } else if (level==3) {
                    if (num>1) {
                        skills.push(txhjPack.skillRank[i].skillID);
                    }
                } else if (level==4) {
                    if (num>1) {
                        skills.push(txhjPack.skillRank[i].skillID);
                    }
               } else if (level==5) {
                    if (num>2) {
                        skills.push(txhjPack.skillRank[i].skillID);
                    }
                }
            }
            var cards2 = [];
            var equips = [];
            var buffs2 = [];
            var skills2 = [];
            if (level==1) {
                while(cards2.length<4){
                    cards2.push(createCard(cards.randomRemove()));
                };
                while(equips.length<4){
                    equips.push(createCard(equip.randomRemove()));
                };
            } else if (level==2) {
                while(buffs2.length<4){
                    buffs2.push(buffs.randomRemove());
                };
                while(skills2.length<4){
                    skills2.push(skills.randomRemove());
                };
            } else if (level==3) {
                while(cards2.length<3){
                    cards2.push(createCard(cards.randomRemove()));
                };
                while(equips.length<3){
                    equips.push(createCard(equip.randomRemove()));
                };
                while(buffs2.length<3){
                    buffs2.push(buffs.randomRemove());
                };
                while(skills2.length<3){
                    skills2.push(skills.randomRemove());
                };
            } else if (level==4) {
                while(cards2.length<6){
                    cards2.push(createCard(cards.randomRemove()));
                };
                while(equips.length<6){
                    equips.push(createCard(equip.randomRemove()));
                };
                while(buffs2.length<6){
                    buffs2.push(buffs.randomRemove());
                };
                while(skills2.length<6){
                    skills2.push(skills.randomRemove());
                };
              } else if (level==5) {
                while(equips.length<5){
          equips.push(createCard(equip.randomRemove()));
                };
                while(skills2.length<5){
                    skills2.push(skills.randomRemove());
                };
                while(buffs2.length<3){
                    buffs2.push(buffs.randomRemove());
                    };
                    while(cards2.length<2){
                    cards2.push(createCard(cards.randomRemove()));          
                };
            }

            var store = {
                cardNum:0,
                buffNum:0,
                skillNum:0,
                equipNum:0,
                skills:skills2,
                buff:buffs2,
                equip:equips,
                cards:cards2,
            }
            lib.config.taixuhuanjing.store[node.season][node.chapter][node.id] = {};
            lib.config.taixuhuanjing.store[node.season][node.chapter][node.id] = store;
            var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
        };
        var coinBody = ui.create.div('.taixuhuanjing_consoledeskCoinBody2',homeBody);
        var coinIcon = ui.create.div('.taixuhuanjing_consoledeskCoinIcon',coinBody);
        var coinNum = ui.create.div('.taixuhuanjing_consoledeskCoinNum2',''+lib.config.taixuhuanjing.coin+'',coinBody);
        coinNum.update = function (){
            coinNum.innerHTML = lib.config.taixuhuanjing.coin+'';
        }
        var box = ui.create.div('.taixuhuanjing_lookShopHomeBox',homeBody);
        var boxComps = {
            imp:(function(){
                var ext = game.changePack[node.id].ext;
                var imp = ui.create.div('.taixuhuanjing_lookShopHomeBoxImp');
                imp.setBackgroundImage('extension/太虚幻境/image/big_bg/rogue_shop_'+ext+'.png');
                return imp;
            })(),
            buttonbg:(function(){
                var buttonbg = ui.create.div('.taixuhuanjing_lookShopHomeBoxButtonbg');
                var textTitle = ui.create.div('.taixuhuanjing_lookShopHomeBoxButtonTitle',buttonbg);
                var textBox = ui.create.div('.taixuhuanjing_lookShopHomeBoxButtonBox',buttonbg);
                lib.setScroll(textBox);
                var bottom = ui.create.div('.taixuhuanjing_lookShopHomeBoxBottom',buttonbg);
                bottom.update = function(type){
                    bottom.innerHTML = '';
                    var dec=0;
                    if (lib.config.taixuhuanjing.buff.contains('buff_txhj_juguzhidao')) {
                        dec=1;
                    }
                    if(type=='祝福'){
                        bottom.innerHTML = ['拔刀能留住落樱吗？','家人们，睡洞啊','这么便宜，尊嘟假嘟','只要充得够，佛祖来保佑','妖魔鬼怪快离开'].randomGet();
                        if (lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].buffNum>dec) {
                            bottom.innerHTML = '每次购买一项'+type+'，额外消耗金币+'+(lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].buffNum-dec)*200;
                        }
                    } else if(type=='装备'){
                        bottom.innerHTML = ['有一人前来买刀','老板，你这连弩怎么卖？','盗版连弩两百块钱一件','你嫌贵，我还嫌贵呢','你瞧瞧现在牌堆里哪有装备牌？','你是来找茬的吧，就问你要不要吧?'].randomGet();
                        if (lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].equipNum>dec) {
                            bottom.innerHTML = '每次购买一件'+type+'，额外消耗金币+'+(lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].equipNum-dec)*200;
                        }
                    } else if(type=='技能'){
                        bottom.innerHTML = ['失传秘籍十块钱一本','在我这下过单的都脱单了'].randomGet();
                        if (lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].skillNum>dec) {
                            bottom.innerHTML = '每次购买一项'+type+'，额外消耗金币+'+(lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].skillNum-dec)*200;
                        }
                    } else if(type=='卡牌'){
                        bottom.innerHTML = ['鸡汤来咯！快！趁热喝！','卖桃子咯，两块一斤，一斤两块','走过路过 不要错过','客官要不要来两斤上好的酒?'].randomGet();
                        if (lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].cardNum>dec) {
                            bottom.innerHTML = '每次购买一张'+type+'，额外消耗金币+'+(lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].cardNum-dec)*200;
                        }
                    }
                };
                _status.onmousewheel = true;
                textBox.onmousewheel=function(evt){
                    if (_status.onmousewheel==false) return;
                    var node=this;
                    var num=20;
                    var speed=20;
                    clearInterval(node.interval);
                    evt.preventDefault();
                    if(evt.detail > 0 || evt.wheelDelta < 0){
                        node.interval=setInterval(function(){
                            if(num--&&Math.abs(node.scrollLeft+node.clientWidth-node.scrollWidth)>0){
                                node.scrollLeft +=speed;
                            }
                            else{
                                clearInterval(node.interval);
                            }
                        },16);
                    }
                    else{
                        node.interval=setInterval(function(){
                            if(num--&&node.scrollLeft>0){
                                node.scrollLeft -=speed;
                            }
                            else{
                                clearInterval(node.interval);
                            }
                        },16);
                    }
                };
                function funcSkill (skill) {
                    var div = ui.create.div('.taixuhuanjing_lookShopHomeBoxCardDiv');
                    var name = get.translation(skill);
                    var rank = get.skillRank(skill);
                    if (rank==1) div.setBackgroundImage('extension/太虚幻境/image/style/goods_effect_common.png');
                    if (rank==2) div.setBackgroundImage('extension/太虚幻境/image/style/goods_effect_rare.png');
                    if (rank==3) div.setBackgroundImage('extension/太虚幻境/image/style/goods_effect_epic.png');
                    if (rank>=4) div.setBackgroundImage('extension/太虚幻境/image/style/goods_effect_legend.png');

                    var divTitle= ui.create.div('.taixuhuanjing_CardStyleDivTitle','武将技',div);
                    var skillInfo = '&emsp;&emsp;'+lib.translate[skill+'_info'];
                    var skillTitle = ui.create.div('.taixuhuanjing_lookShopHomeBoxSkillTitle',div);
                    var skillName1 = ui.create.div('.taixuhuanjing_lookShopHomeBoxSkillName1',''+name+'',skillTitle);
                    var skillName2 = ui.create.div('.taixuhuanjing_lookShopHomeBoxSkillName2',''+name+'',skillTitle);
                    var skillText1 = ui.create.div('.taixuhuanjing_lookShopHomeBoxSkillText1',div);
                    var skillText2 = ui.create.div('.taixuhuanjing_lookShopHomeBoxSkillText2',''+skillInfo+'',skillText1);
                    lib.setScroll(skillText2);
                    skillText2.onmouseover = function() {
                        _status.onmousewheel = false;
                    };
                    skillText2.onmouseout = function() {
                        _status.onmousewheel = true;
                    };
                    div.num = 1000;
                    var dec=0;
                    if (lib.config.taixuhuanjing.buff.contains('buff_txhj_juguzhidao')) {
                        dec=1;
                    }
                    div.num = get.skillValue(skill) + (Math.max(lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].skillNum-dec,0)*200);
                    var skillButton = ui.create.div('.taixuhuanjing_lookShopHomeBoxDivButton',''+div.num+'',div);
                    if (div.num>999) skillButton.style.textIndent = '2.5vw';
                    skillButton.listen(function(e){
                        game.txhj_playAudioCall('WinButton',null,true);
                        if (lib.config.taixuhuanjing.coin>=div.num) {
                            var str = '是否花费金币*'+div.num+'购买技能【'+name+'】？';
                            game.purchasePrompt('购买技能',str,homeBody,function(value){
                                if (value) {
                                    lib.config.taixuhuanjing.coin-=div.num;
                                    //全境涨价
                                    lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].skillNum++;
                                    lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].skills.remove(skill);
                                    if (lib.config.taixuhuanjing.useSkills.length<lib.config.taixuhuanjing.maxSkills) {
                                        lib.config.taixuhuanjing.useSkills.add(skill);
                                    } else if (!lib.config.taixuhuanjing.skills.contains(skill)) {
                                        lib.config.taixuhuanjing.skills.add(skill);
                                    }
                                    var num=lib.config.txhj_collect.cards[skill];
                                    if(!num) num=0;
                                    lib.config.txhj_collect.cards[skill]=num+1;
                                    game.saveConfig('txhj_collect',lib.config.txhj_collect);
                                    var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                                    game.messagePopup('购买技能【'+name+'】成功');
                                    view.update();
                                    bottom.update('技能');
                                    textBox.update('skill');
                                    coinNum.update();
                                }          
                            });
                        } else {
                            game.messagePopup('金币不足');
                        }
                        event.cancelBubble = true;
                        event.returnValue = false; 
                        return false;    
                    });
                    return div;
                };
                function funcBuff (buff) {
                    var div = ui.create.div('.taixuhuanjing_lookShopHomeBoxCardDiv');
                    div.num = game.buffPack[buff].value;
                    if (!lib.config.taixuhuanjing.buff.contains('buff_txhj_juguzhidao')) {
                        div.num += lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].buffNum*200;
                    } else if (lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].buffNum>1) {
                        div.num += (lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].buffNum-1)*200;
                    }
                    var name = game.buffPack[buff].name;
                    var rank = game.buffPack[buff].rank;
                    if (rank==1) div.setBackgroundImage('extension/太虚幻境/image/style/goods_effect_common.png');
                    if (rank==2) div.setBackgroundImage('extension/太虚幻境/image/style/goods_effect_rare.png');
                    if (rank==3) div.setBackgroundImage('extension/太虚幻境/image/style/goods_effect_epic.png');
                    if (rank>=4) div.setBackgroundImage('extension/太虚幻境/image/style/goods_effect_legend.png');
                    var divTitle= ui.create.div('.taixuhuanjing_BuffStyleDivTitle',''+game.buffPack[buff].name+'',div);
                    var divBg = ui.create.div('.taixuhuanjing_BuffStyleDivBg',div);
                    var divIcon = ui.create.div('.taixuhuanjing_BuffStyleDivIcon',divBg);
                    divIcon.setBackgroundImage('extension/太虚幻境/image/buff/'+buff+'.png');
                    window.txhjBuffIcon(divIcon);
                    var divInfo = ui.create.div('.taixuhuanjing_BuffStyleDivInfo',div);
                    divInfo.innerHTML = game.buffPack[buff].info;

                    var divButton = ui.create.div('.taixuhuanjing_lookShopHomeBoxDivButton',''+div.num+'',div);
                    if (div.num>999) divButton.style.textIndent = '1.5vw';
                    divButton.listen(function(e){
                        game.txhj_playAudioCall('WinButton',null,true);
                        if (lib.config.taixuhuanjing.coin>=div.num) {
                            var str = '是否花费金币*'+div.num+'购买祝福【'+name+'】？'
                            game.purchasePrompt('购买祝福',str,homeBody,function(value){
                                if (value) {
                                    lib.config.taixuhuanjing.coin-=div.num;
                                    //全境涨价
                                    lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].buffNum++;
                                    lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].buff.remove(buff);
                                    lib.config.taixuhuanjing.buff.add(buff);
                                    var num=lib.config.txhj_collect.cards[buff];
                                    if(!num) num=0;
                                    lib.config.txhj_collect.cards[buff]=num+1;
                                    game.saveConfig('txhj_collect',lib.config.txhj_collect);
                                    var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                                    game.messagePopup('购买祝福【'+name+'】成功');
                                    view.update();
                                    bottom.update('祝福');
                                    textBox.update('buff');
                                    coinNum.update();
                                }          
                            });
                        } else {
                            game.messagePopup('金币不足');
                        }
                        event.cancelBubble = true;
                        event.returnValue = false; 
                        return false;    
                    });
                    return div;
                };
                function funcCard (card) {
                    var div = ui.create.div('.taixuhuanjing_lookShopHomeBoxCardDiv');
                    game.addCardStyle(card,div);
                    div.num = get.cardValue(card.name);
                    if (!lib.config.taixuhuanjing.buff.contains('buff_txhj_juguzhidao')) {
                        div.num = div.num + (lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].cardNum*200);
                    } else if (lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].cardNum>1) {
                        div.num = div.num + ((lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].cardNum-1)*200);
                    }
                    var name = get.translation(card.name);
                    var divButton = ui.create.div('.taixuhuanjing_lookShopHomeBoxDivButton',''+div.num+'',div);
                    if (div.num>999) divButton.style.textIndent = '1.5vw';
                    divButton.listen(function(e){
                        game.txhj_playAudioCall('WinButton',null,true);
                        if (lib.config.taixuhuanjing.coin>=div.num) {
                            var str = '是否花费金币*'+div.num+'购买卡牌【'+name+'】？'
                            game.purchasePrompt('购买卡牌',str,homeBody,function(value){
                                if (value) {
                                    lib.config.taixuhuanjing.coin-=div.num;
                                    //全境涨价
                                    lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].cardNum++;
                                    lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].cards.remove(card);
                                    lib.config.taixuhuanjing.cards.add(card);
                                    var num=lib.config.txhj_collect.cards[card.name];
                                    if(!num) num=0;
                                    lib.config.txhj_collect.cards[card.name]=num+1;
                                    game.saveConfig('txhj_collect',lib.config.txhj_collect);
                                    var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                                    game.messagePopup('购买卡牌【'+name+'】成功');
                                    view.update();
                                    bottom.update('卡牌');
                                    textBox.update('cards');
                                    coinNum.update();
                                }          
                            });
                        } else {
                            game.messagePopup('金币不足');
                        }
                        event.cancelBubble = true;
                        event.returnValue = false; 
                        return false;    
                    });
                    return div;
                };
                function funcEquip (card) {
                    var div = ui.create.div('.taixuhuanjing_lookShopHomeBoxCardDiv');
                    game.addCardStyle(card,div);
                    //div.num = get.cardValue(card.name) + (lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].equipNum*200);
                    div.num = get.cardValue(card.name);
                    if (!lib.config.taixuhuanjing.buff.contains('buff_txhj_juguzhidao')) {
                        div.num = div.num + (lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].equipNum*200);
                    } else if (lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].equipNum>1) {
                        div.num = div.num + ((lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].equipNum-1)*200);
                    }
                    var name = get.translation(card.name);
                    var divButton = ui.create.div('.taixuhuanjing_lookShopHomeBoxDivButton',''+div.num+'',div);
                    if (div.num>999) divButton.style.textIndent = '1.5vw';
                    divButton.listen(function(e){
                        game.txhj_playAudioCall('WinButton',null,true);
                        if (lib.config.taixuhuanjing.coin>=div.num) {
                            var str = '是否花费金币*'+div.num+'购买装备【'+name+'】？'
                            game.purchasePrompt('购买装备',str,homeBody,function(value){
                                if (value) {
                                    lib.config.taixuhuanjing.coin-=div.num;
                                    //全境涨价
                                            lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].equipNum++;
                                            lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].equip.remove(card);
                                            if (get.subtype(card.name)!='equip5'&&get.subtype(card.name)!='equip6'&&lib.config.taixuhuanjing[get.subtype(card.name)] == null) {
                                                lib.config.taixuhuanjing[get.subtype(card.name)] = card;
                                            } else {
                                                lib.config.taixuhuanjing.equips.add(card);
                                            }
                                            var num=lib.config.txhj_collect.cards[card.name];
                                            if(!num) num=0;
                                            lib.config.txhj_collect.cards[card.name]=num+1;
                                            game.saveConfig('txhj_collect',lib.config.txhj_collect);
                                            var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                                            game.messagePopup('购买装备【'+name+'】成功');
                                            //alert_old(lib.config.txhj_collect.cards[card.name]+'_'+card.name);
                                            view.update();
                                            bottom.update('装备');
                                            textBox.update('equip');
                                            coinNum.update();
                                        }          
                                    });
                        } else {
                            game.messagePopup('金币不足');
                        }
                        event.cancelBubble = true;
                        event.returnValue = false; 
                        return false;    
                    });
                    return div;
                };
                textBox.update = function(type){
                    textBox.innerHTML = '';
                    if (type=='skill') {
                        var stores = lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].skills.slice(0);
                        while (stores.length){
                            textBox.appendChild(funcSkill(stores.shift()));
                        }
                    } else if (type=='buff') {
                        var buffs = lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].buff.slice(0);
                        while (buffs.length){
                            textBox.appendChild(funcBuff(buffs.shift()));
                        }
                    }  else if (type=='cards') {
                        var cards = lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].cards.slice(0);
                        while (cards.length){
                            textBox.appendChild(funcCard(cards.shift()));
                        }
                    } else if (type=='equip') {
                        var equips = lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].equip.slice(0);
                        while (equips.length){
                            textBox.appendChild(funcEquip(equips.shift()));
                        }
                    }
                };
                var buttonText = '';
                function func(str){
                    var buttonDiv = ui.create.div('.taixuhuanjing_lookShopHomeBoxButtonTextDiv',''+str+'');
                    buttonDiv.listen(function(e){
                        game.txhj_playAudioCall('WinButton',null,true);
                        this.choiced();
                        event.cancelBubble = true;
                        event.returnValue = false; 
                        return false;    
                    });
                    buttonDiv.choiced = function(){
                        if(textTitle.choosingNow){
                            textTitle.choosingNow.noChoiced();
                        }
                        textTitle.choosingNow = this;
                        buttonDiv.setBackgroundImage('extension/太虚幻境/image/icon/icon_Button10.png');
                        if (str=='技能') {
                            bottom.update('技能')
                            textBox.update('skill');
                        } else if (str=='祝福') {
                            bottom.update('祝福')
                            textBox.update('buff');
                        } else if (str=='装备') {
                            bottom.update('装备')
                            textBox.update('equip');
                        } else if (str=='卡牌') {
                            bottom.update('卡牌')
                            textBox.update('cards');
                        }
                    };
                    buttonDiv.noChoiced = function(){
                        textTitle.choosingNow = null;
                        buttonDiv.setBackgroundImage('extension/太虚幻境/image/icon/icon_Button9.png');
                    };
                    if (str==buttonText) {
                        buttonDiv.choiced();
                    };
                    return buttonDiv;
                };
                var list = [];
                if (lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].skills.length>0) list.add('技能');
                if (lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].buff.length>0) list.add('祝福');
                if (lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].equip.length>0) list.add('装备');
                if (lib.config.taixuhuanjing.store[node.season][node.chapter][node.id].cards.length>0) list.add('卡牌');
                buttonText = list[0];
                while(list.length){
                    textTitle.appendChild(func(list.shift()));
                };
                return buttonbg;
            })(),
        }
        for(var i in boxComps){
            box.appendChild(boxComps[i]);
        }
        home.addEventListener("click",function(){
            game.txhj_playAudioCall('off',null,true);
            home.delete();
            lib.onresize.remove(reLookEventsize);
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
    };
    game.lookEquip = function (view,type) {
        //if (type&&!lib.config.taixuhuanjing.equips.length) return;
        var home = document.getElementById('taixuhuanjing_adjustHome');
        if (home) return;
        var home = ui.create.div('#taixuhuanjing_adjustHome');
        document.body.appendChild(home);
        var homeBody = ui.create.div('.taixuhuanjing_lookEventHomeBody',home);
        homeBody.addEventListener("click",function(){
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
        var setLookEventSize = function(){
            var screenWidth = ui.window.offsetWidth;
            var screenHeight = ui.window.offsetHeight;
            var whr = 1.8;
            var width;
            var height;
            if(screenWidth / whr > screenHeight){
                height = screenHeight;
                width = height * whr;
            }else{
                width = screenWidth;
                height = screenWidth/whr;
            }
            homeBody.style.height = Math.round(height)+"px";
            homeBody.style.width = Math.round(width)+"px";
            homeBody.style.transform = 'translate(-50%,-50%) scale(0.7)';
        };
        setLookEventSize();
        var reLookEventsize = function(){
            setTimeout(setLookEventSize,500);
        };
        lib.onresize.push(reLookEventsize);
        var rank = lib.config.taixuhuanjing.rank;
        var season = lib.config.taixuhuanjing.season;
        var chapter = lib.config.taixuhuanjing.chapter;
        var box = ui.create.div('.taixuhuanjing_lookEquipHomeBox',homeBody);
        var list1 = [lib.config.taixuhuanjing.equip1,lib.config.taixuhuanjing.equip2,lib.config.taixuhuanjing.equip3,lib.config.taixuhuanjing.equip4];
        var list2 = lib.config.taixuhuanjing.equips.slice(0);
        var boxComps = {
            title:(function(){
                var title = ui.create.div('.taixuhuanjing_lookEquipHomeBoxTitle','调整装备');
                return title;
            })(),
            text1:(function(){
                var text1 = ui.create.div('.taixuhuanjing_lookEquipHomeBoxText','当前携带装备');
                return text1;
            })(),
            equipBody:(function(){
                var equipBody = ui.create.div('.taixuhuanjing_lookEquipHomeBoxEquipBody');

                function func(name){
                    var equipDiv = ui.create.div('.taixuhuanjing_lookEquipHomeBoxEquipDiv');
                    equipDiv.nodes = {
                        use:false,
                        num:0,
                    };
                    if (name=='武器栏') {
                        if (list1[0]!=null) {
                            var card = list1[0];
                            var card2 = game.createCard(card.name,card.suit,card.number);
                            card2.style['font-size'] = '3px';
                            card2.style.width = '95%';
                            card2.style.height = '95%';
                            card2.style.zIndex = 1;
                            card2.style["transform-origin"] = "center center";
                            equipDiv.appendChild(card2);
                            equipDiv.nodes.use=true;
                            equipDiv.nodes.num=0;
                        } else {
                            var equipText = ui.create.div('.taixuhuanjing_lookEquipHomeBoxEquipDivText',''+name+'',equipDiv);
                        }
                    } else if (name=='防具栏') {
                        if (list1[1]!=null) {
                            var card = list1[1];
                            var card2 = game.createCard(card.name,card.suit,card.number);
                            card2.style['font-size'] = '3px';
                            card2.style.width = '95%';
                            card2.style.height = '95%';
                            card2.style.zIndex = 1;
                            card2.style["transform-origin"] = "center center";
                            equipDiv.appendChild(card2);
                            equipDiv.nodes.use=true;
                            equipDiv.nodes.num=1;
                        } else {
                            var equipText = ui.create.div('.taixuhuanjing_lookEquipHomeBoxEquipDivText',''+name+'',equipDiv);
                        }
                    } else if (name=='宝物栏1') {
                        if (list1[2]!=null) {
                            var card = list1[2];
                            var card2 = game.createCard(card.name,card.suit,card.number);
                            card2.style['font-size'] = '3px';
                            card2.style.width = '96%';
                            card2.style.height = '96%';
                            card2.style.zIndex = 1;
                            card2.style["transform-origin"] = "center center";
                            equipDiv.appendChild(card2);
                            equipDiv.nodes.use=true;
                            equipDiv.nodes.num=2;
                        } else {
                            var equipText = ui.create.div('.taixuhuanjing_lookEquipHomeBoxEquipDivText',''+name+'',equipDiv);
                        }
                    } else if (name=='宝物栏2') {
                        if (list1[3]!=null) {
                            var card = list1[3];
                            var card2 = game.createCard(card.name,card.suit,card.number);
                            card2.style['font-size'] = '3px';
                            card2.style.width = '95%';
                            card2.style.height = '95%';
                            card2.style.zIndex = 1;
                            card2.style["transform-origin"] = "center center";
                            equipDiv.appendChild(card2);
                            equipDiv.nodes.use=true;
                            equipDiv.nodes.num=3;
                        } else {
                            var equipText = ui.create.div('.taixuhuanjing_lookEquipHomeBoxEquipDivText',''+name+'',equipDiv);
                        }
                    }
                    equipDiv.addEventListener("click",function(){
                        game.txhj_playAudioCall('WinButton',null,true);
                        if (!type) return;
                        if (equipDiv.nodes.use==false) return;
                        equipDiv.update();
                        event.cancelBubble = true;
                        event.returnValue = false; 
                        return false;
                    });
                    equipDiv.update = function(){
                        equipDiv.innerHTML = '';
                        var equipText = ui.create.div('.taixuhuanjing_lookEquipHomeBoxEquipDivText',''+name+'',equipDiv);
                        game.equipBuffUpdate(list1[equipDiv.nodes.num],false);
                        list2.push(list1[equipDiv.nodes.num]);
                        list1[equipDiv.nodes.num]=null;
                        boxComps.equipBody3.update();
                    }
                    return equipDiv;
                };
                equipBody.update = function(){
                    equipBody.innerHTML = '';
                    var list = ['武器栏','防具栏','宝物栏1','宝物栏2'];
                    while(list.length){
                        equipBody.appendChild(func(list.shift()));
                    };
                };
                equipBody.update();
                return equipBody;
            })(),
            equipBody2:(function(){
                var equipBody2 = ui.create.div('.taixuhuanjing_lookEquipHomeBoxEquipBody2');
                return equipBody2;
            })(),
            text2:(function(){
                var text2 = ui.create.div('.taixuhuanjing_lookEquipHomeBoxText2','备选装备');
                return text2;
            })(),
            equipBody3:(function(){
                var equipBody3 = ui.create.div('.taixuhuanjing_lookEquipHomeBoxEquipBody3');
                equipBody3.onmousewheel=function(evt){
                    var node=this;
                    var num=20;
                    var speed=20;
                    clearInterval(node.interval);
                    evt.preventDefault();
                    if(evt.detail > 0 || evt.wheelDelta < 0){
                        node.interval=setInterval(function(){
                            if(num--&&Math.abs(node.scrollLeft+node.clientWidth-node.scrollWidth)>0){
                                node.scrollLeft +=speed;
                            }
                            else{
                                clearInterval(node.interval);
                            }
                        },16);
                    }
                    else{
                        node.interval=setInterval(function(){
                            if(num--&&node.scrollLeft>0){
                                node.scrollLeft -=speed;
                            }
                            else{
                                clearInterval(node.interval);
                            }
                        },16);
                    }
                };
                function func2(equip){
                    var equipDiv = ui.create.div('.taixuhuanjing_lookEquipHomeBoxEquipDiv2');
                    var card2 = game.createCard(equip.name,equip.suit,equip.number);
                    equipDiv.nodes = {
                        use:false,
                    };
                    card2.style['font-size'] = '3px';
                    card2.style.width = '96%';
                    card2.style.height = '96%';
                    card2.style.zIndex = 1;
                    card2.style["transform-origin"] = "center center";
                    equipDiv.appendChild(card2);
                    for (var i = 0; i < list1.length; i++) {
                        if (list1[i]!=null) {
                            if (list1[i].name==equip.name&&list1[i].suit==equip.suit&&list1[i].number==equip.number) {
                                var equipText = ui.create.div('.taixuhuanjing_lookEquipHomeBoxEquipDivText','装备中',equipDiv);
                                equipDiv.nodes.use = true;
                                break;
                            }
                        }
                    }
                    equipDiv.addEventListener("click",function(){
                        game.txhj_playAudioCall('WinButton',null,true);
                        if (equipDiv.nodes.use==true) return;
                        if (get.subtype(equip.name)=='equip1') {
                            if (list1[0]!=null) {
                                list2.push(list1[0]);
                            }
                            list1[0]=equip;
                        } else if (get.subtype(equip.name)=='equip2') {
                            if (list1[1]!=null) {
                                list2.push(list1[1]);
                            }
                            list1[1]=equip;
                        } else {
                            if (list1[2]==null) {
                                if (list1[2]!=null) {
                                    list2.push(list1[2]);
                                }
                                list1[2]=equip;
                            } else {
                                if (list1[3]!=null) {
                                    list2.push(list1[3]);
                                }
                                list1[3]=equip;
                            }
                        }
                        list2.remove(equip);
                        boxComps.equipBody.update();
                        boxComps.equipBody3.update();
                        event.cancelBubble = true;
                        event.returnValue = false; 
                        return false;
                    });
                    return equipDiv;
                };
                equipBody3.update = function(){
                    equipBody3.innerHTML = '';
                    var list = list2.slice(0);
                    while(list.length){
                        equipBody3.appendChild(func2(list.shift()));
                    };
                };
                equipBody3.update();
                return equipBody3;
            })(),
            button:(function(){
                var button = ui.create.div('.taixuhuanjing_lookEquipHomeBoxButton','确认调整');
                button.addEventListener("click",function(){
                    game.txhj_playAudioCall('off',null,true);
                    var saveequip=false;
                    for (var i=0;i<4;i++) {
                        if(lib.config.taixuhuanjing['equip'+(i+1)]!=list1[i]) saveequip=true;
                    }
                    if(lib.config.taixuhuanjing.equips != list2) saveequip=true;
                    if (type&&saveequip) {
                        lib.config.taixuhuanjing.equip1 = list1[0];
                        lib.config.taixuhuanjing.equip2 = list1[1];
                        lib.config.taixuhuanjing.equip3 = list1[2];
                        lib.config.taixuhuanjing.equip4 = list1[3];
                        lib.config.taixuhuanjing.equips = list2;
                        var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                        setTimeout(function(){
                            view.update();
                        },1000);
                    }
                    home.delete();
                    lib.onresize.remove(reLookEventsize);
                    event.cancelBubble = true;
                    event.returnValue = false; 
                    return false;
                });
                return button;
            })(),
        }
        for(var i in boxComps){
            box.appendChild(boxComps[i]);
        }
        home.addEventListener("click",function(){
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
    };
    game.lookSkill = function (view,type) {
        //if (type&&!lib.config.taixuhuanjing.skills.length) return;
        var home = document.getElementById('taixuhuanjing_adjustHome');
        if (home) return;
        var home = ui.create.div('#taixuhuanjing_adjustHome');
        document.body.appendChild(home);
        var homeBody = ui.create.div('.taixuhuanjing_lookEventHomeBody',home);
        homeBody.addEventListener("click",function(){
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
        var setLookEventSize = function(){
            var screenWidth = ui.window.offsetWidth;
            var screenHeight = ui.window.offsetHeight;
            var whr = 1.8;
            var width;
            var height;
            if(screenWidth / whr > screenHeight){
                height = screenHeight;
                width = height * whr;
            }else{
                width = screenWidth;
                height = screenWidth/whr;
            }
            homeBody.style.height = Math.round(height)+"px";
            homeBody.style.width = Math.round(width)+"px";
            homeBody.style.transform = 'translate(-50%,-50%) scale(0.7)';
        };
        setLookEventSize();
        var reLookEventsize = function(){
            setTimeout(setLookEventSize,500);
        };
        lib.onresize.push(reLookEventsize);
        var rank = lib.config.taixuhuanjing.rank;
        var season = lib.config.taixuhuanjing.season;
        var chapter = lib.config.taixuhuanjing.chapter;
        var box = ui.create.div('.taixuhuanjing_lookEquipHomeBox',homeBody);
        var infoBox = ui.create.div('.taixuhuanjing_lookEquipHomeSkillInfoBox',homeBody);
        var skillInfo = ui.create.div('.taixuhuanjing_lookEquipHomeSkillInfo',infoBox);
        infoBox.style.display = 'none';

        var list1 = lib.config.taixuhuanjing.useSkills.slice(0);
        var list2 = lib.config.taixuhuanjing.skills.slice(0);
        var maxSkills = lib.config.taixuhuanjing.maxSkills;
        while(list1.length<maxSkills) {
            list1.push(null);
        }
        var boxComps = {
            title:(function(){
                var title = ui.create.div('.taixuhuanjing_lookEquipHomeBoxTitle','调整技能');
                return title;
            })(),
            text1:(function(){
                var text1 = ui.create.div('.taixuhuanjing_lookEquipHomeBoxText','当前携带技能');
                return text1;
            })(),
            skillBody:(function(){
                var skillBody = ui.create.div('.taixuhuanjing_lookEquipHomeBoxSkillBody');
                lib.setScroll(skillBody);
                function func(skillID,num){
                    var skillButton = ui.create.div('.taixuhuanjing_lookEquipHomeBoxSkillButton');
                    if (skillID!=null) {
                        skillButton.setBackgroundImage('extension/太虚幻境/image/icon/icon_skill_true.png');
                        var skillName = get.translation(skillID);
                        var divText2 = ui.create.div('.taixuhuanjing_lookEquipHomeBoxSkillButtonText2',''+skillName+'',skillButton);
                        var divText3 = ui.create.div('.taixuhuanjing_lookEquipHomeBoxSkillButtonText3',''+skillName+'',skillButton);
                    } else {
                        var divText = ui.create.div('.taixuhuanjing_lookEquipHomeBoxSkillButtonText1','技能槽',skillButton);
                    }
                    skillButton.addEventListener("click",function(){
                        game.txhj_playAudioCall('WinButton',null,true);
                        if (!type) return;
                        if (skillID==null) return;
                        skillButton.update();
                        event.cancelBubble = true;
                        event.returnValue = false; 
                        return false;
                    });
                    skillButton.update = function(){
                        skillButton.innerHTML = '';
                        skillButton.setBackgroundImage('extension/太虚幻境/image/icon/icon_skill_null.png');
                        var divText = ui.create.div('.taixuhuanjing_lookEquipHomeBoxSkillButtonText1','技能槽',skillButton);
                        if (!list2.contains(skillID)) {
                            list2.push(skillID);
                        }
                        list1[num]=null;
                        skillID=null;
                        boxComps.skillBody2.update();
                    }
                    skillButton.onmouseover = function() {
                        if (skillID==null) return;
                        var info = "<br>"+get.translation([skillID])+":<p>"+lib.translate[skillID+'_info'];
                        skillInfo.innerHTML = info;
                        infoBox.style.display = 'block';
                    };
                    skillButton.onmouseout = function() {
                        infoBox.style.display = 'none';
                    };
                    return skillButton;
                };
                skillBody.update = function(){
                    skillBody.innerHTML = '';
                    var list = list1.slice(0);
                    var num = 0;
                    while(list.length){
                        skillBody.appendChild(func(list.shift(),num));
                        num++;
                    };
                };
                skillBody.update();
                return skillBody;
            })(),
            skillBody2:(function(){
                var skillBody2 = ui.create.div('.taixuhuanjing_lookEquipHomeBoxEquipBody2');
                lib.setScroll(skillBody2);
                function func2(skillID){
                    var skillButton = ui.create.div('.taixuhuanjing_lookEquipHomeBoxSkillButton2');
                    skillButton.setBackgroundImage('extension/太虚幻境/image/icon/icon_skill_true.png');
                    var skillName = get.translation(skillID);
                    var divText2 = ui.create.div('.taixuhuanjing_lookEquipHomeBoxSkillButtonText2',''+skillName+'',skillButton);
                    var divText3 = ui.create.div('.taixuhuanjing_lookEquipHomeBoxSkillButtonText3',''+skillName+'',skillButton);
                    if (list1.contains(skillID)) {
                        skillButton.style.webkitFilter = 'grayscale(1)';
                    }
                    skillButton.addEventListener("click",function(){
                        game.txhj_playAudioCall('WinButton',null,true);
                        if (!type) return;
                        if (list1.contains(skillID)) return;
                        skillButton.update();
                        event.cancelBubble = true;
                        event.returnValue = false; 
                        return false;
                    });
                    skillButton.update = function(){
                        var num;
                        for (var i = 0; i < list1.length; i++) {
                            if(list1[i]==null){
                                list2.remove(skillID);
                                list1[i]=skillID;
                                boxComps.skillBody.update();
                                skillBody2.removeChild(skillButton);
                                skillButton.style.webkitFilter = 'grayscale(1)';
                                break;
                            }
                        }
                    }
                    skillButton.onmouseover = function() {
                        var info = "<br>"+get.translation([skillID])+":<p>"+lib.translate[skillID+'_info'];
                        skillInfo.innerHTML = info;
                        infoBox.style.display = 'block';
                    };
                    skillButton.onmouseout = function() {
                        infoBox.style.display = 'none';
                    };
                    return skillButton;
                };
                skillBody2.update = function(){
                    skillBody2.innerHTML = '';
                    var list = list2.slice(0);
                    while(list.length){
                        skillBody2.appendChild(func2(list.shift()));
                    };
                };
                skillBody2.update();
                return skillBody2;
            })(),
            text2:(function(){
                var text2 = ui.create.div('.taixuhuanjing_lookEquipHomeBoxText2','备选技能');
                return text2;
            })(),
            button:(function(){
                var button = ui.create.div('.taixuhuanjing_lookEquipHomeBoxButton','确认调整');
                button.addEventListener("click",function(){
                    game.txhj_playAudioCall('off',null,true);
                    var saveskill=false;
                    if(lib.config.taixuhuanjing.useSkills != list1) saveskill=true;
                    if(lib.config.taixuhuanjing.skills != list2) saveskill=true;
                    if (type) {
                        lib.config.taixuhuanjing.skills = [];
                        lib.config.taixuhuanjing.useSkills = [];
                        for (var i = 0; i < list1.length; i++) {
                            if (list1[i]!=null) {
                                lib.config.taixuhuanjing.useSkills.push(list1[i])
                            }
                        }
                        for (var i = 0; i < list2.length; i++) {
                            if (list2[i]!=null) {
                                lib.config.taixuhuanjing.skills.push(list2[i])
                            }
                        }
                        var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
                        setTimeout(function(){
                            view.update();
                        },1000);
                    }
                    home.delete();
                    lib.onresize.remove(reLookEventsize);
                    event.cancelBubble = true;
                    event.returnValue = false; 
                    return false;
                });
                return button;
            })(),
        }
        for(var i in boxComps){
            box.appendChild(boxComps[i]);
        }
        home.addEventListener("click",function(){
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        });
    };
    game.changeEvent = function (node,view) {
        var events = [];
        var change = [];
        if(lib.config.taixuhuanjing.optional1 != null){
            var optional = lib.config.taixuhuanjing.optional1;
            if (optional.seat!=node.seat&&optional.change==true) {
                change.push(1);
            }
        }
        if(lib.config.taixuhuanjing.optional2 != null){
            var optional = lib.config.taixuhuanjing.optional2;
            if (optional.seat!=node.seat&&optional.change==true) {
                change.push(2);
            }
        }
        if(lib.config.taixuhuanjing.optional3 != null){
            var optional = lib.config.taixuhuanjing.optional3;
            if (optional.seat!=node.seat&&optional.change==true) {
                change.push(3);
            }
        }
        for (var i in game.changePack){
            if (game.changePack[i].id) {
                if (node.level>=game.changePack[i].level) {
                    events.push(game.changePack[i].id);
                }
            }
        }
        events.randomSort();
        while(change.length){
            var num = change.shift();
            var event = events.shift();
            lib.config.taixuhuanjing['optional'+num] = game.changePack[event];
        }
    };
    game.addCharacterDivMobile =function(name,packs,view){
        var div = ui.create.div('.taixuhuanjing_characterDivMobile',view);
        var intro = lib.character[name];
        if(!intro){
            for(var i in lib.characterPack){
                if(lib.characterPack[i][name]){
                    intro=lib.characterPack[i][name];
                    break;
                }
            }
        }
        var rarity = game.getRarity(name);
        var star;
        switch(rarity){
            case 'legend':star=5;break;
            case 'epic':star=4;break;
            case 'rare':star=3;break;
            case 'common':star=2;break;
            default:star=1;
        }
        //星级修改
        if(lib.config.mode_config.taixuhuanjing.star&&lib.config.mode_config.taixuhuanjing.star!=0) star=lib.config.mode_config.taixuhuanjing.star;
            
        var playComps = {
            bg:(function(){
                var bg = ui.create.div('.taixuhuanjing_consoledeskPlayBg');
                bg.setBackgroundImage('extension/太虚幻境/image/style/name2_'+intro[1]+'.png');
                return bg;
            })(intro[1]),
            imp:(function(){
                var imp = ui.create.div('.taixuhuanjing_consoledeskPlayImp2');
                //适配千幻
                imp.classList.add("qh-not-replace");
                //适配千幻
                imp.setBackground(name,'character');
                const str = imp.style.backgroundImage;
                if(lib.device=='ios'||lib.device=='android') {
                    var tmp =  str.split('(')[1].split(')')[0];
                    if(tmp.indexOf('"') > -1) {
                        tmp = tmp.split('"')[1].split('"')[0];
                    }
                } else {
                    var tmp =  str.split('("')[1].split('")')[0];
                }
                var firstPromise = new Promise(function(resolve, reject){
                    var reader = new FileReader();
                    var img = new Image();
                    img.src = lib.assetURL+decodeURI(tmp);
                    if (lib.device=='ios'||lib.device=='android') {
                        img.src = tmp;
                    }
                    var isAlphaBackground = 0;
                    var canvas = document.createElement('canvas');
                    var context = canvas.getContext('2d');
                    img.onload = function () {
                        var originWidth = this.width;
                        var originHeight = this.height;
                        canvas.width = originWidth;
                        canvas.height = originHeight;
                        context.clearRect(0, 0, originWidth, originHeight);
                        context.drawImage(img, 0, 0);
                        isAlphaBackground = 0;
                        var imageData = context.getImageData(0, 0, 50, 50).data;
                        for (var index = 3; index < 100; index += 4) {
                            if (imageData[index] != 255) {
                                isAlphaBackground++;
                                if (isAlphaBackground>=25) {
                                    resolve();
                                    break;
                                }
                            }
                        }
                    };
                });
                firstPromise.then(function(successMessage){                         
                    imp.style.backgroundImage = 'none';
                    var imp2 = ui.create.div('.taixuhuanjing_consoledeskPlayImpL',imp);
                    imp2.setBackground(name,'character');
                });
                return imp;
            })(intro[1]),
            namebody: (function(name){
                var info = lib.translate[name];
                var namebody = ui.create.div(".taixuhuanjing_characterDivMobileName",info);
                return namebody;
            })(name),
            rank:(function(){
                var rankBody = ui.create.div(".taixuhuanjing_characterDivMobileRankBody");
                while(star--){
                    var starIcon = ui.create.div(".taixuhuanjing_characterDivMobileStarICON",rankBody);
                }
                return rankBody;
            })(),
        };
        for(var i in playComps){
            div.appendChild(playComps[i]);
        }
    };
    game.addCardStyle = function(card,view){
        var rank = get.cardRank(card.name);
        var div = ui.create.div('.taixuhuanjing_CardStyleDiv',view);
        if (rank>1) {
            if (rank==2) div.setBackgroundImage('extension/太虚幻境/image/style/goods_effect_rare.png');
            if (rank==3) div.setBackgroundImage('extension/太虚幻境/image/style/goods_effect_epic.png');
            if (rank>=4) div.setBackgroundImage('extension/太虚幻境/image/style/goods_effect_legend.png');
        };
        var divTitle= ui.create.div('.taixuhuanjing_CardStyleDivTitle',''+get.translation(card.name)+'',div);
        var divCard = ui.create.div('.taixuhuanjing_CardStyleDivCard',div);
        var card2 = game.createCard(card.name,card.suit,card.number,card.nature);
        card2.style['font-size'] = '3px';
        card2.style.width = '95%';
        card2.style.height = '95%';
        card2.style.zIndex = 1;
        card2.style["transform-origin"] = "center center";
        divCard.appendChild(card2);
        return div;
    };
    game.addBuffStyle = function(buff,view){
        var rank = game.buffPack[buff].rank;
        var div = ui.create.div('.taixuhuanjing_BuffStyleDiv',view);
        if (rank>1) {
            if (rank==2) div.setBackgroundImage('extension/太虚幻境/image/style/goods_effect_rare.png');
            if (rank==3) div.setBackgroundImage('extension/太虚幻境/image/style/goods_effect_epic.png');
            if (rank>=4) div.setBackgroundImage('extension/太虚幻境/image/style/goods_effect_legend.png');
        };
        var divTitle= ui.create.div('.taixuhuanjing_BuffStyleDivTitle',''+game.buffPack[buff].name+'',div);
        var divBg = ui.create.div('.taixuhuanjing_BuffStyleDivBg',div);
        var divIcon = ui.create.div('.taixuhuanjing_BuffStyleDivIcon',divBg);
        divIcon.setBackgroundImage('extension/太虚幻境/image/buff/'+buff+'.png');
        window.txhjBuffIcon(divIcon);
        var divInfo = ui.create.div('.taixuhuanjing_BuffStyleDivInfo',div);
        divInfo.innerHTML = game.buffPack[buff].info;
        return div;
    };
    game.addSkillStyle = function(skill,view){
        var rank = get.skillRank(skill);
        var div = ui.create.div('.taixuhuanjing_BuffStyleDiv',view);
        if (rank>1) {
            if (rank==2) div.setBackgroundImage('extension/太虚幻境/image/style/goods_effect_rare.png');
            if (rank==3) div.setBackgroundImage('extension/太虚幻境/image/style/goods_effect_epic.png');
            if (rank>=4) div.setBackgroundImage('extension/太虚幻境/image/style/goods_effect_legend.png');
        };
        var divTitle= ui.create.div('.taixuhuanjing_CardStyleDivTitle','武将技',div);
        var name = get.translation(skill);
        var skillInfo = '&emsp;&emsp;'+lib.translate[skill+'_info'];
        var skillTitle = ui.create.div('.taixuhuanjing_lookShopHomeBoxSkillTitle',div);
        var skillName1 = ui.create.div('.taixuhuanjing_lookShopHomeBoxSkillName1',''+name+'',skillTitle);
        var skillName2 = ui.create.div('.taixuhuanjing_lookShopHomeBoxSkillName2',''+name+'',skillTitle);
        var skillText1 = ui.create.div('.taixuhuanjing_lookShopHomeBoxSkillText1',div);
        var skillText2 = ui.create.div('.taixuhuanjing_lookShopHomeBoxSkillText2',''+skillInfo+'',skillText1);
        lib.setScroll(skillText2);
        skillText2.onmouseover = function() {
            _status.onmousewheel = false;
        };
        skillText2.onmouseout = function() {
            _status.onmousewheel = true;
        };
        return div;
    };
    game.messagePopup = function(info){
        var home = document.getElementById('taixuhuanjing_messagePopupHome');
        if (!home) {
            home = ui.create.div('#taixuhuanjing_messagePopupHome');
            document.body.appendChild(home);
            var setmessagePopupSize = function(){
                var screenWidth = ui.window.offsetWidth;
                var screenHeight = ui.window.offsetHeight;
                var whr = 2.4;
                var width;
                var height;
                if(screenWidth / whr > screenHeight){
                    height = screenHeight;
                    width = height * whr;
                }else{
                    width = screenWidth;
                    height = screenWidth/whr;
                }
                home.style.height = Math.round(height)+"px";
                home.style.width = Math.round(width)+"px";
            };
            setmessagePopupSize();
            var remessagePopupsize = function(){
                setTimeout(setmessagePopupSize,500);
            };
            lib.onresize.push(remessagePopupsize);
        }
        var div = ui.create.div('.taixuhuanjing_messagePopupDiv',home);
        var bg  = ui.create.div('.taixuhuanjing_messagePopupDivBg',div);
        var text  = ui.create.div('.taixuhuanjing_messagePopupDivText',info+'',div);
        setTimeout(function(){
            home.removeChild(div);
        },1600);
    };
    game.gamePremise = function(info){
        var home = document.getElementById('taixuhuanjing_gamePremiseHome');
        if (!home) {
            home = ui.create.div('#taixuhuanjing_gamePremiseHome');
            document.body.appendChild(home);
        }
        if(lib.config['extension_手杀ui_enable']&&lib.config.extension_手杀ui_yangShi == "on"){
            home.style.backgroundImage = 'none';
        } else {
            home.setBackgroundImage('extension/太虚幻境/image/icon/shenfen.png');
        }
        home.innerHTML = _status.TaiXuHuanJingGame.premise+'';
        home.style['line-height']='1.8rem';
    };
    game.purchasePrompt = function(value,info,view,onDown){
        var popup = ui.create.div('.taixuhuanjing_purchasePromptPopup',view);
        var body = ui.create.div('.taixuhuanjing_purchasePromptBody',popup);
        body.addEventListener('click',function(){
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;    
        });
        var comps = {
            title: ui.create.div('.taixuhuanjing_purchasePromptTitle',value),
            okButton: (function(){
                var okButton = ui.create.div('.taixuhuanjing_purchasePromptButton1','确认');
                okButton.addEventListener('click',function(){
                    if(typeof onDown == 'function'){
                        onDown(true);
                    } 
                    view.removeChild(popup);
                    event.cancelBubble = true;
                    event.returnValue = false; 
                    return false;
                });
                return okButton;
            })(),
            cancelButton: (function(){
                var cancelButton = ui.create.div('.taixuhuanjing_purchasePromptButton2','取消');
                cancelButton.addEventListener('click',function(){
                    if(typeof onDown == 'function'){
                        onDown(false);
                    } 
                    view.removeChild(popup);
                    event.cancelBubble = true;
                    event.returnValue = false; 
                    return false; 
                });
                return cancelButton;
            })(),
            text: ui.create.div('.taixuhuanjing_purchasePromptText',info+''),
        };
        for(var i in comps){
            body.appendChild(comps[i]);
        }
        popup.addEventListener('click',function(){
            view.removeChild(popup);
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;    
        });
        return body;
    };
    game.levelUp = function(str,list,result,view){
        game.txhj_playAudioCall('LevelUp',null,true);
        var homeBody = ui.create.div('.taixuhuanjing_StateHomeBody2',view);
        homeBody.oncontextmenu = function(e){/*右键*/
            event.cancelBubble = true;
            event.returnValue = false; 
            return false; 
        }
        var choice;
        var title = ui.create.div('.taixuhuanjing_StateHomeTitle',str+'',homeBody);
        var title2 = ui.create.div('.taixuhuanjing_StateHomeTitle2','请选择以下 1 项效果获取',homeBody);
        var box = ui.create.div('.taixuhuanjing_StateHomeBox',homeBody);
        function func(spoil){
            var div = ui.create.div('.taixuhuanjing_StateHomeBoxDiv');
            var bg1 = ui.create.div('.taixuhuanjing_StateHomeBoxDivBg1',div);
            var bg2 = ui.create.div('.taixuhuanjing_StateHomeBoxDivBg2',div);
            var name = spoil.name;
            var divName = ui.create.div('.taixuhuanjing_StateHomeBoxDivName',''+name+'',div);

            if (spoil.type=='randomSkill') {
                var skills = txhjPack.skillRank.filter(function(current){
                    return lib.skill[current.skillID]&&lib.translate[current.skillID];
                }).slice(0);
                var listm = get.character(lib.config.taixuhuanjing.name,3).slice(0);
                for (var i = 0; i < skills.length; i++) {
                    var skillID = skills[i].skillID;
                    if (!skillID) {
                        delete skills[i];
                    }
                    if (lib.config.taixuhuanjing.useSkills.contains(skillID)) {
                        delete skills[i];
                    } else if (listm.contains(skillID)) {
                        delete skills[i];
                    }
                }
                var skill = skills.randomGet();
                div.choice = {
                    return:true,
                    name:'技能',
                    effect:[{name:'skill',number:1,result:skill.skillID}],
                }
                var skillName = get.translation(skill.skillID);
                var skillInfo = lib.translate[skill.skillID+'_info'];
                var divSkill = ui.create.div('.taixuhuanjing_StateHomeBoxDivSkill',div);
                var divSkillNameShadow = ui.create.div('.taixuhuanjing_StateHomeBoxDivSkillNameShadow',''+skillName+'',divSkill);
                var divSkillName = ui.create.div('.taixuhuanjing_StateHomeBoxDivSkillName',''+skillName+'',divSkill);
                var divInfo = ui.create.div('.taixuhuanjing_StateHomeBoxDivInfo2',''+skillInfo+'',div);
            } else if (spoil.type=='randomCard') {
                var list = [];
                var cards = txhjPack.cardPack.slice(0);
                for (var i = 0; i < cards.length; i++) {
                    if(lib.translate[cards[i].cardID]&&get.type(cards[i].cardID)!='equip'){
                        list.push(cards[i].cardID);
                    }
                }
                var card = list.randomGet();
                div.choice = {
                    return:true,
                    name:'卡牌',
                    effect:[{name:'card',number:1,result:card}],
                }
                var divImp1 = ui.create.div('.taixuhuanjing_StateHomeBoxDivImp2',div);
                var card2 = game.createCard(card);
                card2.style.width = '80%';
                card2.style.left = '10%';
                card2.style.height = '100%';
                card2.style.zIndex = 5;
                card2.style.overflow = 'hidden';
                card2.style.pointerEvents = 'auto';
                card2.style["transform-origin"] = "center center";
                divImp1.appendChild(card2);
                var divImp2 = ui.create.div('.taixuhuanjing_StateHomeBoxDivImp3',divImp1);
                var cardImp = function (card){
                    if(lib.card[card].fullimage||lib.card[card].fullborder){
                        divImp2.style.height = '120%';
                    }
                    var src = lib.card[card].image;
                    if (src) {
                        if (src.indexOf('ext:') == 0) {
                            src=src.replace(/ext:/, 'extension/');
                        }
                        divImp2.setBackgroundImage(src);
                    } else {
                        var img=new Image();
                        img.src=lib.assetURL+'image/card/'+card+'.png';
                        img.onload=function(){
                            divImp2.setBackgroundImage('image/card/'+card+'.png');
                        }
                        img.onerror=function(){
                            divImp2.setBackgroundImage('image/card/'+card+'.png')
                            if (card=='yuheng_plus'||card=='yuheng_pro') {
                                divImp2.setBackgroundImage('image/card/yuheng.png');
                            }
                        }
                    }
                };
                if(lib.config['extension_'+'十周年UI'+'_enable']){
                    var type=lib.config['extension_'+'十周年UI'+'_cardPrettify'];
                    type=type?'.'+type:'.jpg';
                    var img=new Image();
                    img.src = lib.assetURL+'extension/十周年UI/image/card/'+card+type;
                    img.onload=function(){
                        divImp2.style.height = '120%';
                        divImp2.setBackgroundImage('extension/十周年UI/image/card/'+card+type)
                    }
                    img.onerror=function(){
                        cardImp(card);
                    }
                } else {
                    cardImp(card);
                }
                var cardName = get.translation(card);
                var cardInfo = lib.translate[card+'_info'];
                var desc = ui.create.div('.taixuhuanjing_StateHomeBoxDivDesc');
                divImp1.appendChild(desc);
                desc.innerHTML = "<p style='color: gold;margin: 2%;'>" + cardName + "</p>" +"<p style='margin: 2%;'>" + cardInfo + "</p>";
                divImp1.onmouseover = function(e) {
                    div.style.zIndex = '11';
                    var width = document.body.offsetWidth;
                    var height = document.body.offsetHeight;
                    var startX=e.clientX/game.documentZoom;
                    var startY=e.clientY/game.documentZoom;
                    var rise1 = Math.round(startX/width*10000)/100;
                    var rise2 = Math.round(startY/height*10000)/100;
                    if (rise1>70) {
                        desc.style.left = "-220%";
                    } else {
                        desc.style.left = "100%";
                    }
                    desc.style.top = "-"+rise2+"%";
                    desc.style.display = "block";
                };
                divImp1.onmouseout = function() {
                    div.style.zIndex = '10';
                    desc.style.display = "none";
                };
            } else if (spoil.type=='randomEquip') {
                var list = [];
                var cards = txhjPack.cardPack.slice(0);
                for (var i = 0; i < cards.length; i++) {
                    if (cards[i].unique==true) continue;
                    if(lib.translate[cards[i].cardID]&&get.type(cards[i].cardID)=='equip'){
                        list.push(cards[i].cardID);
                    }
                }
                var card = list.randomGet();
                div.choice = {
                    return:true,
                    name:'装备',
                    effect:[{name:'equip',number:1,result:card}],
                }
                var divImp1 = ui.create.div('.taixuhuanjing_StateHomeBoxDivImp2',div);
                var card2 = game.createCard(card);
                card2.style.width = '80%';
                card2.style.left = '10%';
                card2.style.height = '100%';
                card2.style.zIndex = 5;
                card2.style.overflow = 'hidden';
                card2.style.pointerEvents = 'auto';
                card2.style["transform-origin"] = "center center";
                divImp1.appendChild(card2);
                var divImp2 = ui.create.div('.taixuhuanjing_StateHomeBoxDivImp3',divImp1);
                var cardImp = function (card){
                    if(lib.card[card].fullimage||lib.card[card].fullborder){
                        divImp2.style.height = '120%';
                    }
                    var src = lib.card[card].image;
                    if (src) {
                        if (src.indexOf('ext:') == 0) {
                            src=src.replace(/ext:/, 'extension/');
                        }
                        divImp2.setBackgroundImage(src);
                    } else {
                        var img=new Image();
                        img.src=lib.assetURL+'image/card/'+card+'.png';
                        img.onload=function(){
                            divImp2.setBackgroundImage('image/card/'+card+'.png');
                        }
                        img.onerror=function(){
                            divImp2.setBackgroundImage('image/card/'+card+'.png')
                            if (card=='yuheng_plus'||card=='yuheng_pro') {
                                divImp2.setBackgroundImage('image/card/yuheng.png');
                            }
                        }
                    }
                };
                if(lib.config['extension_'+'十周年UI'+'_enable']){
                    var type=lib.config['extension_'+'十周年UI'+'_cardPrettify'];
                    type=type?'.'+type:'.jpg';
                    var img=new Image();
                    img.src = lib.assetURL+'extension/十周年UI/image/card/'+card+type;
                    img.onload=function(){
                        divImp2.style.height = '120%';
                        divImp2.setBackgroundImage('extension/十周年UI/image/card/'+card+type)
                    }
                    img.onerror=function(){
                        cardImp(card);
                    }
                } else {
                    cardImp(card);
                }
                var cardName = get.translation(card);
                var cardInfo = lib.translate[card+'_info'];
                var desc = ui.create.div('.taixuhuanjing_StateHomeBoxDivDesc');
                divImp1.appendChild(desc);
                desc.innerHTML = "<p style='color: gold;margin: 2%;'>" + cardName + "</p>" +"<p style='margin: 2%;'>" + cardInfo + "</p>";
                divImp1.onmouseover = function(e) {
                    div.style.zIndex = '11';
                    var width = document.body.offsetWidth;
                    var height = document.body.offsetHeight;
                    var startX=e.clientX/game.documentZoom;
                    var startY=e.clientY/game.documentZoom;
                    var rise1 = Math.round(startX/width*10000)/100;
                    var rise2 = Math.round(startY/height*10000)/100;
                    if (rise1>70) {
                        desc.style.left = "-220%";
                    } else {
                        desc.style.left = "100%";
                    }
                    desc.style.top = "-"+rise2+"%";
                    desc.style.display = "block";
                };
                divImp1.onmouseout = function() {
                    div.style.zIndex = '10';
                    desc.style.display = "none";
                };
            } else if (spoil.type=='randomBuff') {
                var buffs = [];
                for (var i in game.buffPack) {
                    if (game.buffPack[i].store==false) continue;
                    if (!lib.config.taixuhuanjing.buff.contains(i)){
                        buffs.push(i);
                    }
                }
                var buff = buffs.randomGet();
                div.choice = {
                    return:true,
                    name:'祝福',
                    effect:[{name:'buff',number:1,result:buff}],
                }
                var skillName = game.buffPack[buff].name;
                var divImpBg = ui.create.div('.taixuhuanjing_StateHomeBoxDivImpBg',div);
                var divImp = ui.create.div('.taixuhuanjing_StateHomeBoxDivImp',div);
                divImp.setBackgroundImage('extension/太虚幻境/image/buff/'+buff+'.png');
                window.txhjBuffIcon(divImp);
                var skillInfo = game.buffPack[buff].info;
                var desc = ui.create.div('.taixuhuanjing_StateHomeBoxDivDesc');
                desc.style.width = "330%";
                divImp.appendChild(desc);
                desc.innerHTML = "<p style='color: gold;margin: 2%;'>" + skillName + "</p>" +"<p style='margin: 2%;'>" + skillInfo + "</p>";
                divImp.onmouseover = function(e) {
                    div.style.zIndex = '11';
                    var width = document.body.offsetWidth;
                    var height = document.body.offsetHeight;
                    var startX=e.clientX/game.documentZoom;
                    var startY=e.clientY/game.documentZoom;
                    var rise1 = Math.round(startX/width*10000)/100;
                    var rise2 = Math.round(startY/height*10000)/100;
                    if (rise1>70) {
                        desc.style.left = "-330%";
                    } else {
                        desc.style.left = "100%";
                    }
                    desc.style.top = "-"+rise2+"%";
                    desc.style.display = "block";
                };
                divImp.onmouseout = function() {
                    div.style.zIndex = '10';
                    desc.style.display = "none";
                };
                var divInfo = ui.create.div('.taixuhuanjing_StateHomeBoxDivInfo1',skillName+'',div);
            } else {
                var divImp = ui.create.div('.taixuhuanjing_StateHomeBoxDivImp',div);
                if (spoil.type=='coin') {
                    var divImp = ui.create.div('.taixuhuanjing_StateHomeBoxDivImp',div);
                    divImp.setBackgroundImage('extension/太虚幻境/image/icon/coin.png');
                    var divInfo = ui.create.div('.taixuhuanjing_StateHomeBoxDivInfo1','金币+300',div);
                    div.choice = {
                        return:true,
                        name:'金币',
                        effect:[{name:'coin',number:300}],
                    }
                }
                if (spoil.type=='maxHp') {
                    divImp.setBackgroundImage('extension/太虚幻境/image/icon/maxHp.png');
                    var divInfo = ui.create.div('.taixuhuanjing_StateHomeBoxDivInfo1','体力上限+1',div);
                    div.choice = {
                        return:true,
                        name:'体力上限',
                        effect:[{name:'maxHp',number:1}],
                    }
                }
                if (spoil.type=='hp') {
                    divImp.setBackgroundImage('extension/太虚幻境/image/icon/'+spoil.type+'.png');
                    var divInfo = ui.create.div('.taixuhuanjing_StateHomeBoxDivInfo1','体力+1',div);
                    div.choice = {
                        return:true,
                        name:'体力',
                        effect:[{name:'hp',number:1}],
                    }
                }
                if (spoil.type=='minHs') {20562
                    divImp.setBackgroundImage('extension/太虚幻境/image/icon/minHs.png');
                    var divInfo = ui.create.div('.taixuhuanjing_StateHomeBoxDivInfo1','初始手牌+1',div);
                    div.choice = {
                        return:true,
                        name:'初始手牌',
                        effect:[{name:'minHs',number:1}],
                    }
                }
                if (spoil.type=='maxHs') {
                    divImp.setBackgroundImage('extension/太虚幻境/image/icon/maxHs.png');
                    var divInfo = ui.create.div('.taixuhuanjing_StateHomeBoxDivInfo1','手牌上限+2',div);
                    div.choice = {
                        return:true,
                        name:'手牌上限',
                        effect:[{name:'maxHs',number:2}],
                    }
                }
                if (spoil.type=='adjust') {
                    divImp.setBackgroundImage('extension/太虚幻境/image/icon/adjust.png');
                    var divInfo = ui.create.div('.taixuhuanjing_StateHomeBoxDivInfo1','调度次数+1',div);
                    div.choice = {
                        return:true,
                        name:'调度次数',
                        effect:[{name:'adjust',number:1}],
                    }
                }
            }
            div.listen(function(e){
                game.txhj_playAudioCall('WinButton',null,true);
                choice = div.choice;
                if(box.choosingNow){
                    box.choosingNow.noChoiced();
                }
                this.choiced();
                event.cancelBubble = true;
                event.returnValue = false; 
                return false;    
            });
            div.choiced = function(){
                box.choosingNow = this;
                bg1.setBackgroundImage('extension/太虚幻境/image/icon/icon_frame18.png');
            };
            div.noChoiced = function(){
                box.choosingNow = null;
                bg1.style.backgroundImage = 'none';
            };
            return div;
        };
        while(list.length){
            var spoil = list.shift();
            box.appendChild(func(spoil));
        }
        var button = ui.create.div('.taixuhuanjing_StateHomeBoxButton','确认选择',box);
        button.listen(function(e){
            if (!choice) {
                game.messagePopup('请选择一项效果');
                return;
            }
            game.txhj_playAudioCall('off',null,true);
            var list2 = [];
            if (result==true) {
                var season = lib.config.taixuhuanjing.season || _status.TaiXuHuanJingGame.season;
                var chapter = _status.TaiXuHuanJingGame.chapter;
                var id = _status.TaiXuHuanJingGame.event.id;

                var spoils = game.eventPack[season][chapter][id].spoils.slice(0);
                for (var i = 0; i < spoils.length; i++) {
                    if(Math.random()<=spoils[i].random){
                        list2.push(spoils[i]);
                    };
                };
                var enemys = game.eventPack[season][chapter][id].enemy.slice(0);
                for (var i = 0; i < enemys.length; i++) {
                    if (enemys[i].spoils.length) {
                        var spoils2 = enemys[i].spoils.slice(0);
                        for (var ii = 0; ii < spoils2.length; ii++) {
                            if(Math.random()<=spoils2[ii].random){
                                list2.push(spoils2[ii]);
                            }
                        }
                    }
                };
                if (lib.config.taixuhuanjing.buff.contains("txhj_aHaoSkill1")) {
                    list2.push({
                        result:true,
                        name:'随机装备',
                        effect:[{name:'randomEquip',number:1}],
                        random:1,
                    });
                }
            }
            list2.push(choice);
            view.update(list2);
            view.removeChild(homeBody);
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;    
        });
    };
    game.cardPileTx = function(){
        if (!txhj.isInitCardPileTx) {
            lib.card.list = [];
            var list = [
            /*黑桃*/
            ["spade","1","shandian"],
            ["spade","1","juedou"],
            ["spade","3","shunshou"],
            ["spade","3","guohe"],
            ["spade","3","jiu"],
            ["spade","4","guohe"],
            ["spade","4","shunshou"],
            ["spade","4","sha","thunder"],
            ["spade","5","sha","thunder"],
            ["spade","6","sha","thunder"],
            ["spade","7","nanman"],
            ["spade","7","sha"],
            ["spade","7","sha","thunder"],
            ["spade","8","sha"],
            ["spade","8","sha"],
            ["spade","8","sha","thunder"],
            ["spade","9","sha"],
            ["spade","9","sha"],
            ["spade","9","jiu"],
            ["spade","10","sha"],
            ["spade","10","sha"],
            ["spade","10","bingliang"],
            ["spade","11","wuxie"],
            ["spade","11","shunshou"],
            ["spade","11","tiesuo"],
            ["spade","12","guohe"],
            ["spade","12","tiesuo"],
            ["spade","13","nanman"],
            ["spade","13","wuxie"],
            /*红桃*/
            ["heart","1","taoyuan"],
            ["heart","1","wanjian"],
            ["heart","1","wuxie"],
            ["heart","2","shan"],
            ["heart","2","shan"],
            ["heart","2","huogong"],
            ["heart","3","wugu"],
            ["heart","3","tao"],
            ["heart","3","huogong"],
            ["heart","4","wugu"],
            ["heart","4","sha","fire"],
            ["heart","5","tao"],
            ["heart","6","tao"],
            ["heart","6","tao"],
            ["heart","6","lebu"],
            ["heart","7","wuzhong"],
            ["heart","7","wuzhong"],
            ["heart","7","sha","fire"],
            ["heart","8","tao"],
            ["heart","8","wuzhong"],
            ["heart","8","wuzhong"],
            ["heart","9","wuzhong"],
            ["heart","9","shan"],
            ["heart","10","sha"],
            ["heart","10","sha","fire"],
            ["heart","10","wuzhong"],
            ["heart","11","sha"],
            ["heart","11","shan"],
            ["heart","11","wuzhong"],
            ["heart","12","tao"],
            ["heart","12","guohe"],
            ["heart","12","shan"],
            ["heart","12","shandian"],
            ["heart","12","wuzhong"],
            ["heart","13","wuxie"],
            /*方块*/
            ["diamond","1","juedou"],
            ["diamond","2","shan"],
            ["diamond","2","shan"],
            ["diamond","2","tao"],
            ["diamond","3","shunshou"],
            ["diamond","4","shan"],
            ["diamond","4","shunshou"],
            ["diamond","4","sha","fire"],
            ["diamond","5","sha","fire"],
            ["diamond","6","sha"],
            ["diamond","6","shan"],
            ["diamond","6","shan"],
            ["diamond","7","sha"],
            ["diamond","7","shan"],
            ["diamond","7","shan"],
            ["diamond","8","sha"],
            ["diamond","8","shan"],
            ["diamond","9","sha"],
            ["diamond","9","shan"],
            ["diamond","9","jiu"],
            ["diamond","10","sha"],
            ["diamond","10","shan"],
            ["diamond","10","shan"],
            ["diamond","11","shan"],
            ["diamond","11","shan"],
            ["diamond","11","shan"],
            ["diamond","12","wuxie"],
            ["diamond","12","tao"],
            ["diamond","12","huogong"],
            ["diamond","13","sha"],
            /*梅花*/
            ["club","1","juedou"],
            ["club","2","sha"],
            ["club","3","sha"],
            ["club","3","guohe"],
            ["club","3","jiu"],
            ["club","4","guohe"],
            ["club","4","sha"],
            ["club","5","sha"],
            ["club","5","sha","thunder"],
            ["club","6","lebu"],
            ["club","6","sha"],
            ["club","6","sha","thunder"],
            ["club","7","sha"],
            ["club","7","sha","thunder"],
            ["club","7","nanman"],
            ["club","8","sha"],
            ["club","8","sha"],
            ["club","8","sha","thunder"],
            ["club","9","sha"],
            ["club","9","sha"],
            ["club","9","jiu"],
            ["club","10","sha"],
            ["club","10","sha"],
            ["club","10","tiesuo"],
            ["club","11","sha"],
            ["club","11","sha"],
            ["club","11","tiesuo"],
            ["club","12","tiesuo"],
            ["club","12","wuxie"],
            ["club","13","tiesuo"],
            ["club","13","wuxie"],

            /*额外增加*/
            ["heart","4","txhj_jiedao"],
            ["heart","8","txhj_huoshaolianying"],
            ["spade","5","diaohu"],
            ["heart","13","txhj_yuanjiao"],
            ["spade","1","txhj_yiyi"],
            ["diamond","6","txhj_zhijizhibi"],
            ["heart","9","txhj_caomu"],
            ["diamond","12","txhj_shuiyan"],
            ["club","3","txhj_shengdong"],
            ["diamond","7","fudichouxin"],
            ["spade","10","fudichouxin"],
            ["heart","5","huoshan"],   
            //["diamond","6","wuliu"], 
            ["diamond","1","diaobingqianjiang"],  
            /*["spade","2","diaobingqianjiang"],*/
            ["heart","7","dongzhuxianji"],
           /* ["diamond","12","wutiesuolian"],
            ["diamond","3","wuxinghelingshan"],
            ["club","2","heiguangkai"],
            ["club","13","tongque"],
            ["spade","5","tongque"],
            ["club","4","huxinjing"],
            ["club","12","suolianjia"],*/
            ["club","3","jiejia"],
            ["diamond","3","jiejia"],
        /*    ["heart","13","zhanxiang"],    
            ["club","13","yonglv"],
            ["club","5","yitianjian"],
            ["heart","4","xinge"],*/
            ["heart","9","tuixinzhifu"],
           // ["spade","6","kuwu"],
           // ["diamond","6","tiaojiyanmei"],
          /*  ["spade","11","zhungangshuo"],
            ["club","7","yinyueqiang"],
            ["spade","2","cixiong"],       
            ["diamond","8","mianju"],*/
           // ["diamond","6","chenhuodajie"],
            ["club","2","huoshan"], 
          //  ["diamond","12","fangtian"],
            ];

            list.randomSort();
            if(list.length) lib.card.list.addArray(list);
            txhj.isInitCardPileTx = true;
        } else {
            lib.card.list.randomSort();
        }
        return list;
    };
    game.TaiXuHuanJingState = function(type){
        'step 0'
        for(var i=0;i<game.players.length;i++){
           game.players[i].stopDynamic();
             //游戏结束停止播放动皮
        }
        //屏蔽暂停按钮
        _status.nopause=true;
        //关闭对局托管
        if(_status.auto) {
            game.txhj_auto=true;
            ui.click.auto();
        }else {
            game.txhj_auto=false;
        }
        //关闭手杀阶段提示遗留
        if(game.as_removeImage) game.as_removeImage();
        //进度条
        if(game.initJinDuTiao) game.initJinDuTiao('pause',true);
        
        game.saveConfig('taixuhuanjing',undefined);
        _status.modeNode.score.round += game.roundNumber;
        _status.modeNode.score.fight += 1;
        lib.config.taixuhuanjing = _status.modeNode;
        ui.arenalog.innerHTML='';/*清除历史记录*/
        ui.historybar.innerHTML='';/*清除出牌记录*/
        ui.cardPile.innerHTML=''; 
        ui.discardPile.innerHTML='';
        ui.sidebar.innerHTML='';/*清除暂停记录*/
        ui.sidebar3.innerHTML='';/*清除暂停记录*/
        var rank = lib.config.taixuhuanjing.rank;
        var season = lib.config.taixuhuanjing.season || _status.TaiXuHuanJingGame.season;
        var chapter = _status.TaiXuHuanJingGame.chapter;
        var num = lib.config.taixuhuanjing.exp;

        if (lib.config.taixuhuanjing.buff.contains('buff_txhj_aozhan')) {
            if (game.me.hp>0) {
                lib.config.taixuhuanjing.hp = game.me.hp;
                lib.config.taixuhuanjing.maxHp = game.me.maxHp;
            } else {
                lib.config.taixuhuanjing.hp = 1;
                lib.config.taixuhuanjing.maxHp = game.me.maxHp;
            }
        } else {
            if (type!=null&&lib.config.taixuhuanjing.buff.contains('buff_txhj_xianhujiqu')) {
                if (game.me.maxHp>lib.config.taixuhuanjing.maxHp) {
                    lib.config.taixuhuanjing.maxHp += game.me.maxHp-lib.config.taixuhuanjing.maxHp;
                }
            }
            lib.config.taixuhuanjing.hp = lib.config.taixuhuanjing.maxHp;
        }
        lib.config.taixuhuanjing.buff = _status.modeBuff.slice(0);
        lib.config.taixuhuanjing.useSkills = _status.modeSkill.slice(0);
        delete _status.modeNode;
        delete _status.modeBuff;
        delete _status.modeSkill;

        var str2 = '普通';
        if (rank==2) {
            str2 = '困难';
        } else if (rank==3) {
            str2 = '噩梦';
        } else if (rank==4) {
            str2 = '炼狱';
        } else if (rank==5) {
            str2 = '血战';
        }
        if (type==true&&game.eventPack[season][chapter][_status.TaiXuHuanJingGame.event.id].type == 'Ultimate') {
            if (typeof chapter == 'string' && chapter.indexOf('IF')!=-1) {
                if (!lib.config.taixuhuanjingRecord) lib.config.taixuhuanjingRecord = {};
                var timeID = (new Date()).getTime();
                lib.config.taixuhuanjing.time = timeID;
                if (!lib.config.taixuhuanjingRecord) lib.config.taixuhuanjingRecord = {};
                lib.config.taixuhuanjingRecord[timeID] = lib.config.taixuhuanjing;
                game.saveConfig('taixuhuanjingRecord',lib.config.taixuhuanjingRecord);
                _status.TaiXuHuanJingGame.return=true;
                /*game.updateModeData();
                game.over(true);
                return;*/
            }
            if (typeof chapter == 'number' && game.seasonPack[season][chapter+'IF']) {
                var premise = game.seasonPack[season][chapter+'IF'].premise.slice(0);
                var result = premise.length;
                for (var i = 0; i < premise.length; i++) {
                    for (var e = 0; e < lib.config.taixuhuanjing.events.length; e++) {
                        if(lib.config.taixuhuanjing.events[e].id==premise[i]){
                            result--;
                        }
                    }
                }
                if (result==0) {
                    var src = '恭喜您已通过：【'+game.seasonPack[season].name+'】（'+str2+'）赛季试炼，'+"是否继续体验隐藏内容?";
                    var d = confirm(src);
                    if (d==true){
                        lib.config.taixuhuanjing.chapter = chapter+'IF';
                        delete lib.config.taixuhuanjing.store;
                        lib.config.taixuhuanjing.procedure = null;
                        lib.config.taixuhuanjing.optional1 = null;
                        lib.config.taixuhuanjing.optional2 = null;
                        lib.config.taixuhuanjing.optional3 = null;
                        lib.config.taixuhuanjing.optionalExam = [];
                        if (lib.config.taixuhuanjingNode[season]&&lib.config.taixuhuanjingNode[season].rank&&rank>=lib.config.taixuhuanjingNode[season].rank) {
                            lib.config.taixuhuanjingNode[season].rank ++;
                            if (lib.config.taixuhuanjingNode[season].rank>5) lib.config.taixuhuanjingNode[season].rank=5;
                            if (lib.config.taixuhuanjingNode[season].reach&&lib.config.taixuhuanjingNode[season].reach[lib.config.taixuhuanjing.name]) {
                                lib.config.taixuhuanjingNode[season].reach[lib.config.taixuhuanjing.name] ++;
                            } else {
                                if (!lib.config.taixuhuanjingNode[season].reach) lib.config.taixuhuanjingNode[season].reach = {};
                                lib.config.taixuhuanjingNode[season].reach[lib.config.taixuhuanjing.name] = 1;
                            }
                        } else {
                            lib.config.taixuhuanjingNode[season] = {
                                rank:2,
                                reach:{},
                            }
                            lib.config.taixuhuanjingNode[season].reach[lib.config.taixuhuanjing.name] = 1;
                        }
                        lib.config.taixuhuanjingNode.reach[lib.config.taixuhuanjing.name] = 1;
                        game.saveConfig('taixuhuanjingNode',lib.config.taixuhuanjingNode);
                    } else {
                        if (lib.config.taixuhuanjingNode[season]&&lib.config.taixuhuanjingNode[season].rank&&rank>=lib.config.taixuhuanjingNode[season].rank) {
                            lib.config.taixuhuanjingNode[season].rank ++;
                            if (lib.config.taixuhuanjingNode[season].rank>5) lib.config.taixuhuanjingNode[season].rank=5;
                            if (lib.config.taixuhuanjingNode[season].reach&&lib.config.taixuhuanjingNode[season].reach[lib.config.taixuhuanjing.name]) {
                                lib.config.taixuhuanjingNode[season].reach[lib.config.taixuhuanjing.name] ++;
                            } else {
                                if (!lib.config.taixuhuanjingNode[season].reach) lib.config.taixuhuanjingNode[season].reach = {};
                                lib.config.taixuhuanjingNode[season].reach[lib.config.taixuhuanjing.name] = 1;
                            }
                        } else {
                            lib.config.taixuhuanjingNode[season] = {
                                rank:2,
                                reach:{},
                            }
                            lib.config.taixuhuanjingNode[season].reach[lib.config.taixuhuanjing.name] = 1;
                        }
                        game.saveConfig('taixuhuanjingNode',lib.config.taixuhuanjingNode);
                        var timeID = (new Date()).getTime();
                        lib.config.taixuhuanjing.time = timeID;
                        if (!lib.config.taixuhuanjingRecord) lib.config.taixuhuanjingRecord = {};
                        lib.config.taixuhuanjingRecord[timeID] = lib.config.taixuhuanjing;
                        game.saveConfig('taixuhuanjingRecord',lib.config.taixuhuanjingRecord);
                        _status.TaiXuHuanJingGame.return=true;
                        /*game.updateModeData();
                        game.over(true);*/
                    }
                }
            } else  {
                //alert('恭喜您已通过：【'+game.seasonPack[season].name+'】（'+str2+'）赛季试炼');
                if (lib.config.taixuhuanjingNode[season]&&lib.config.taixuhuanjingNode[season].rank&&rank>=lib.config.taixuhuanjingNode[season].rank) {
                    lib.config.taixuhuanjingNode[season].rank ++;
                    if (lib.config.taixuhuanjingNode[season].rank>5) lib.config.taixuhuanjingNode[season].rank=5;
                    if (lib.config.taixuhuanjingNode[season].reach&&lib.config.taixuhuanjingNode[season].reach[lib.config.taixuhuanjing.name]) {
                        lib.config.taixuhuanjingNode[season].reach[lib.config.taixuhuanjing.name] ++;
                    } else {
                        if (!lib.config.taixuhuanjingNode[season].reach) lib.config.taixuhuanjingNode[season].reach = {};
                        lib.config.taixuhuanjingNode[season].reach[lib.config.taixuhuanjing.name] = 1;
                    }
                } else {
                    lib.config.taixuhuanjingNode[season] = {
                        rank:2,
                        reach:{},
                    }
                    lib.config.taixuhuanjingNode[season].reach[lib.config.taixuhuanjing.name] = 1;
                }
                game.saveConfig('taixuhuanjingNode',lib.config.taixuhuanjingNode);
                var timeID = (new Date()).getTime();
                lib.config.taixuhuanjing.time = timeID;
                if (!lib.config.taixuhuanjingRecord) lib.config.taixuhuanjingRecord = {};
                lib.config.taixuhuanjingRecord[timeID] = lib.config.taixuhuanjing;
                game.saveConfig('taixuhuanjingRecord',lib.config.taixuhuanjingRecord);
                _status.TaiXuHuanJingGame.return=true;
                /*game.updateModeData();
                game.over(true);
                return;*/
            }
        } 
        'step 1'
        var home = ui.create.div('.taixuhuanjing_StateHome');
        home.oncontextmenu = function(e){
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;
        }
        document.body.appendChild(home);
        var homeBody = ui.create.div('.taixuhuanjing_StateHomeBody',home);
        var setStateSize = function(){
            var screenWidth = ui.window.offsetWidth;
            var screenHeight = ui.window.offsetHeight;
            var whr = 2.0;
            var width;
            var height;
            if(screenWidth / whr > screenHeight){
                height = screenHeight;
                width = height * whr;
            }else{
                width = screenWidth;
                height = screenWidth/whr;
            }
            homeBody.style.height = Math.round(height)+"px";
            homeBody.style.width = Math.round(width)+"px";
            homeBody.style.transform = 'translate(-50%,-50%) scale(0.9)';
        };
        setStateSize();
        var reStatesize = function(){
            setTimeout(setStateSize,500);
        };
        lib.onresize.push(reStatesize);
        var gameIcon = ui.create.div('.taixuhuanjing_StateHomeGameIcon',homeBody);
        var gameText = ui.create.div('.taixuhuanjing_StateHomeGameText',gameIcon);
        var gameInfo = ui.create.div('.taixuhuanjing_StateHomeGameInfo',gameIcon);
        var okButton = ui.create.div('.taixuhuanjing_StateHomeOkButton',homeBody);
        var okText = ui.create.div('.taixuhuanjing_StateHomeOkText',okButton);
        okButton.listen(function(e){
            game.txhj_playAudioCall('off',null,true);
            _status.gameStart = false;
            game.resume();
            setTimeout(function(){
                home.delete();
                lib.onresize.remove(reStatesize);
            },500);
            event.cancelBubble = true;
            event.returnValue = false; 
            return false;    
        });
        if (type==null) {
            gameIcon.setBackgroundImage('extension/太虚幻境/image/style/game_false_icon.png');
            gameText.setBackgroundImage('extension/太虚幻境/image/style/game_false_text.png');
            game.txhj_playAudioCall('Loss',null,true);
            var timeID = (new Date()).getTime();
            lib.config.taixuhuanjing.time = timeID;
            if (!lib.config.taixuhuanjingRecord) lib.config.taixuhuanjingRecord = {};
            lib.config.taixuhuanjingRecord[timeID] = lib.config.taixuhuanjing;
            game.saveConfig('taixuhuanjingRecord',lib.config.taixuhuanjingRecord);
            _status.TaiXuHuanJingGame.return=false;
            /*game.updateModeData();
            game.over(false);
            return;*/
        } else if (type==false) {
            gameIcon.setBackgroundImage('extension/太虚幻境/image/style/game_loss_icon.png');
            gameText.setBackgroundImage('extension/太虚幻境/image/style/game_loss_text.png');
            game.txhj_playAudioCall('Loss',null,true);
        } else {
            game.txhj_playAudioCall('Win',null,true);
        }
        'step 2'
        //上一局最后用的牌和敌人死后弃牌会在下一局时显示的bug
        if(ui.thrown && ui.thrown.length>0){
			for(var i=0;i<ui.thrown.length;i++){
					ui.thrown[i].remove();
			}				
		}
		//不知道会不会出其他bug
		if(lib.skill._changeJudges){
		let ss = document.querySelector(".skill-control");              
        ss.removeChild(game.me.node.judges)
        };
        //

        ui.clear();
        ui.mebg.remove();
        ui.me.remove();
        ui.handcards1Container.remove();
        ui.handcards2Container.remove();
        if (window.dui) {
            ui.equipSolts.remove();
        }
        function clearSLBuff() {
            var buffDesc = document.querySelectorAll(".SLBuffDesc");
            if (buffDesc.length > 0) {
                for (const ele of buffDesc) {
                    ele.parentNode.removeChild(ele);
                }
            }
            var ssui = document.getElementsByClassName("skill-control");
            var buffs = ssui.length > 0 ? document.querySelectorAll(".playerbuffstyle2") : document.querySelectorAll(".playerbuffstyle3");
            if (buffs.length > 0) {
                for (const buff of buffs) {
                    buff.parentNode.removeChild(buff);
                }
            }
        }
        clearSLBuff();

        delete game.me.buff;
        var players=game.players.concat(game.dead);
        for(var i=0;i<players.length;i++){
            (function(player){
                if (player.jiubuff) {
                    player.jiubuff.forEach(function(i) {
                        txcsanm.hstop(i);
                    });
                    delete player.jiubuff;
                }
                if(player.node.jiu){
                    player.node.jiu.delete();
                    player.node.jiu2.delete();
                    delete player.node.jiu;
                    delete player.node.jiu2;
                }
                player.discardPlayerCard(i,Infinity,'hej',true); 
                player.clearSkills();
                game.removePlayer(player);
            })(players[i]);
        }
        game.delay(1000);
        game.pause();
        'step 3'
        var rank = lib.config.taixuhuanjing.rank;
        var season = lib.config.taixuhuanjing.season || _status.TaiXuHuanJingGame.season;
        var chapter = _status.TaiXuHuanJingGame.chapter;
        var num = lib.config.taixuhuanjing.exp;
        var levelBody = ui.create.div('.taixuhuanjing_StateHomelevelBody',homeBody);
        var spoilsBody = ui.create.div('.taixuhuanjing_StateHomeSpoilsBody',homeBody);

        if (type!=null) num += game.eventPack[season][chapter][_status.TaiXuHuanJingGame.event.id].exp;
        var max = lib.config.taixuhuanjing.maxExp;
        var winrate = Math.round(num/max*10000)/100;
        if (winrate>100) winrate = 100;
        if (winrate<1) winrate = 1;
        var levelComps = {
            expbody:(function(){
                var expbody = ui.create.div('.taixuhuanjing_StateHomeExpBody');
                var attributeBody5Imp = ui.create.div('.taixuhuanjing_StateHomeExpBodyImp',expbody);
                attributeBody5Imp.style.width = ""+winrate+"%";
                return expbody;
            })(),
            title:(function(){
                var title = ui.create.div('.taixuhuanjing_StateHomelevelTitle','等级'+lib.config.taixuhuanjing.level);
                return title;
            })(),
        }
        for(var i in levelComps){
            levelBody.appendChild(levelComps[i]);
        }

        if (type==null) {
            var addExp = ui.create.div('.taixuhuanjing_StateHomeAddExp','经验+0',homeBody);
            var title = ui.create.div('.taixuhuanjing_StateHomeSpoilsTitle','获得战利品',spoilsBody);
            return;
        }
        var addExp = ui.create.div('.taixuhuanjing_StateHomeAddExp','经验+'+game.eventPack[season][chapter][_status.TaiXuHuanJingGame.event.id].exp,homeBody);
        homeBody.update = function (list){
            spoilsBody.innerHTML = '';
            var spoilsComps = {
                title:(function(){
                    var title = ui.create.div('.taixuhuanjing_StateHomeSpoilsTitle','获得战利品');
                    return title;
                })(),
                spoilsBox:(function(){
                    var spoilsBox = ui.create.div('.taixuhuanjing_StateHomeSpoilsBox');
                    function func(spoil){
                        var div = ui.create.div('.taixuhuanjing_StateHomeSpoilsBoxDiv');
                        var divImp = ui.create.div('.taixuhuanjing_StateHomeSpoilsBoxDivImp',div);
                        if (spoil.name!='skill'&&spoil.name!='card'&&spoil.name!='equip'&&spoil.name!='buff') {
                            if (spoil.name=='randomSkill'||spoil.name=='randomCard'||spoil.name=='randomEquip'||spoil.name=='randomBuff') {
                                divImp.setBackgroundImage('extension/太虚幻境/image/icon/random.png');
                            } else {
                                divImp.setBackgroundImage('extension/太虚幻境/image/icon/'+spoil.name+'.png');
                            }
                            var name = game.effectPack[spoil.name].name;
                            var num1 = spoil.number;
                            var divName = ui.create.div('.taixuhuanjing_StateHomeSpoilsBoxDivName',name+'+'+num1,div);
                        } else if (spoil.name=='skill') {
                            var name = get.translation(spoil.result);
                            var divImp3 = ui.create.div('.taixuhuanjing_StateHomeSpoilsBoxDivImp3',divImp);
                            var divName3 = ui.create.div('.taixuhuanjing_StateHomeSpoilsBoxDivName3',''+name+'',divImp3);
                        } else if (spoil.name=='card') {
                            var divImp2 = ui.create.div('.taixuhuanjing_StateHomeSpoilsBoxDivImp2',divImp);
                            var cardImp = function (card){
                                if(lib.card[card].fullimage||lib.card[card].fullborder){
                                    divImp2.style.height = '120%';
                                }
                                var src = lib.card[card].image;
                                if (src) {
                                    if (src.indexOf('ext:') == 0) {
                                        src=src.replace(/ext:/, 'extension/');
                                    }
                                    divImp2.setBackgroundImage(src);
                                } else {
                                    var img=new Image();
                                    img.src=lib.assetURL+'image/card/'+card+'.png';
                                    img.onload=function(){
                                        divImp2.setBackgroundImage('image/card/'+card+'.png');
                                    }
                                    img.onerror=function(){
                                        divImp2.setBackgroundImage('image/card/'+card+'.png')
                                        if (card=='yuheng_plus'||card=='yuheng_pro') {
                                            divImp2.setBackgroundImage('image/card/yuheng.png');
                                        }
                                    }
                                }
                            };
                            if(lib.config['extension_'+'十周年UI'+'_enable']){
                                var type=lib.config['extension_'+'十周年UI'+'_cardPrettify'];
                                type=type?'.'+type:'.jpg';
                                var img=new Image();
                                img.src = lib.assetURL+'extension/十周年UI/image/card/'+spoil.result+type;
                                img.onload=function(){
                                    divImp2.style.height = '120%';
                                    divImp2.setBackgroundImage('extension/十周年UI/image/card/'+spoil.result+type)
                                }
                                img.onerror=function(){
                                    cardImp(spoil.result);
                                }
                            } else {
                                cardImp(spoil.result);
                            }
                            var name = get.translation(spoil.result);
                            var divName = ui.create.div('.taixuhuanjing_StateHomeSpoilsBoxDivName',''+name+'',div);
                        } else if (spoil.name=='equip') {
                            var divImp2 = ui.create.div('.taixuhuanjing_StateHomeSpoilsBoxDivImp2',divImp);
                            var cardImp = function (card){
                                if(lib.card[card].fullimage||lib.card[card].fullborder){
                                    divImp2.style.height = '120%';
                                }
                                var src = lib.card[card].image;
                                if (src) {
                                    if (src.indexOf('ext:') == 0) {
                                        src=src.replace(/ext:/, 'extension/');
                                    }
                                    divImp2.setBackgroundImage(src);
                                } else {
                                    var img=new Image();
                                    img.src=lib.assetURL+'image/card/'+card+'.png';
                                    img.onload=function(){
                                        divImp2.setBackgroundImage('image/card/'+card+'.png');
                                    }
                                    img.onerror=function(){
                                        divImp2.setBackgroundImage('image/card/'+card+'.png')
                                        if (card=='yuheng_plus'||card=='yuheng_pro') {
                                            divImp2.setBackgroundImage('image/card/yuheng.png');
                                        }
                                    }
                                }
                            };
                            if(lib.config['extension_'+'十周年UI'+'_enable']){
                                var type=lib.config['extension_'+'十周年UI'+'_cardPrettify'];
                                type=type?'.'+type:'.jpg';
                                var img=new Image();
                                img.src = lib.assetURL+'extension/十周年UI/image/card/'+spoil.result+type;
                                img.onload=function(){
                                    divImp2.style.height = '120%';
                                    divImp2.setBackgroundImage('extension/十周年UI/image/card/'+spoil.result+type)
                                }
                                img.onerror=function(){
                                    cardImp(spoil.result);
                                }
                            } else {
                                cardImp(spoil.result);
                            }
                            var name = get.translation(spoil.result);
                            var divName = ui.create.div('.taixuhuanjing_StateHomeSpoilsBoxDivName',''+name+'',div);
                        } else if (spoil.name=='buff') {
                            divImp.setBackgroundImage('extension/太虚幻境/image/buff/'+spoil.result+'.png');
                            window.txhjBuffIcon(divImp);
                            var name = game.buffPack[spoil.result].name;
                            var info = game.buffPack[spoil.result].info;
                            var divName = ui.create.div('.taixuhuanjing_StateHomeSpoilsBoxDivName',''+name+'',div);
                        } 
                        return div;
                    };
                    var list2 = [];
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].effect.length) {
                            for (var ii = 0; ii < list[i].effect.length; ii++) {
                                list2.push(list[i].effect[ii]);
                            }
                        }
                    }
                    while(list2.length){
                        var spoil = list2.shift();
                        game.moveEffect(spoil);
                        spoilsBox.appendChild(func(spoil));
                    };
                    return spoilsBox;
                })(),
            }
            for(var i in spoilsComps){
                spoilsBody.appendChild(spoilsComps[i]);
            };
        };
        if (num>=max&&lib.config.taixuhuanjing.level<10) {
            var list = [
            {
                name:'技能',
                type:'randomSkill',
                info:'获得技能',
                num:1,
            },
            {
                name:'卡牌',
                type:'randomCard',
                info:'获得卡牌',
                num:1,
            },
            {
                name:'装备',
                type:'randomEquip',
                info:'获得装备',
                num:1,
            },
            {
                name:'调度次数',
                type:'adjust',
                info:'调度次数+1',
                num:1,
            },
            {
                name:'体力上限',
                type:'maxHp',
                info:'体力上限',
                num:1,
            },
            {
                name:'初始手牌',
                type:'minHs',
                info:'初始手牌+1',
                num:1,
            },
            {
                name:'手牌上限',
                type:'maxHs',
                info:'手牌上限+2',
                num:2,
            },
            {
                name:'金币',
                type:'coin',
                info:'金币+300',
                num:300,
            },
            {
                name:'祝福',
                type:'randomBuff',
                info:'获得祝福',
                num:1,
            },
            ].randomGets(4);
            game.levelUp('等级提升',list,type,homeBody);
            lib.config.taixuhuanjing.exp = 0;
            lib.config.taixuhuanjing.level += 1;
            if (lib.config.taixuhuanjing.level==2) {
                lib.config.taixuhuanjing.maxExp = 300;
            } else if (lib.config.taixuhuanjing.level==3) {
                lib.config.taixuhuanjing.maxExp = 700;
            } else if (lib.config.taixuhuanjing.level==4) {
                lib.config.taixuhuanjing.maxExp = 1200;
            } else if (lib.config.taixuhuanjing.level==5) {
                lib.config.taixuhuanjing.maxExp = 1800;
            } else if (lib.config.taixuhuanjing.level==6) {
                lib.config.taixuhuanjing.maxExp = 2300;
            } else if (lib.config.taixuhuanjing.level==7) {
                lib.config.taixuhuanjing.maxExp = 3000;
            } else if (lib.config.taixuhuanjing.level==8) {
                lib.config.taixuhuanjing.maxExp = 3500;
            } else if (lib.config.taixuhuanjing.level==9) {
                lib.config.taixuhuanjing.maxExp = 4000;
            }
            game.messagePopup('等级提升至'+get.cnNumber(lib.config.taixuhuanjing.level,true)+'级');
        } else {
            if (type==true) {
                var list = [];
                var spoils = game.eventPack[season][chapter][_status.TaiXuHuanJingGame.event.id].spoils.slice(0);
                for (var i = 0; i < spoils.length; i++) {
                    if(Math.random()<=spoils[i].random){
                        list.push(spoils[i]);
                    };
                };
                var enemys = game.eventPack[season][chapter][_status.TaiXuHuanJingGame.event.id].enemy.slice(0);
                for (var i = 0; i < enemys.length; i++) {
                    if (enemys[i].spoils&&enemys[i].spoils.length) {
                        var spoils2 = enemys[i].spoils.slice(0);
                        for (var ii = 0; ii < spoils2.length; ii++) {
                            if(Math.random()<=spoils2[ii].random){
                                list.push(spoils2[ii]);
                            }
                        }
                    }
                };
                if (lib.config.taixuhuanjing.buff.contains("txhj_aHaoSkill1")) {
                    list.push({
                        result:true,
                        name:'随机装备',
                        effect:[{name:'randomEquip',number:1}],
                        random:1,
                    });
                } 
                homeBody.update(list);
            }
            lib.config.taixuhuanjing.exp = num;
        }
        lib.config.taixuhuanjing.events.push(_status.TaiXuHuanJingGame.event);
        if (game.eventPack[season][chapter][_status.TaiXuHuanJingGame.event.id].type == 'boss') {
            if (typeof chapter == 'number' && game.seasonPack[season][chapter+'IF']) {
                var premise = game.seasonPack[season][chapter+'IF'].premise.slice(0);
                var result = premise.length;
                for (var i = 0; i < premise.length; i++) {
                    for (var e = 0; e < lib.config.taixuhuanjing.events.length; e++) {
                        if(lib.config.taixuhuanjing.events[e].id==premise[i]){
                            result--;
                        }
                    }
                }
                if (result==0) {
                    lib.config.taixuhuanjing.chapter = chapter+'IF';
                } else {
                    lib.config.taixuhuanjing.chapter++;
                }
            } else if (typeof chapter == 'string' && chapter.indexOf('IF')!=-1){
                lib.config.taixuhuanjing.chapter =  1 + parseInt(chapter.split('IF')[0]);
            } else {
                lib.config.taixuhuanjing.chapter++;
                /*if (!game.eventPack['ChongYingChuLin'][chapter]) {
                    lib.config.taixuhuanjing.season = ['HuangTianZhiNu','HeJinZhuHuan','HaiWaiFenghe','GFHuangJinZhiLuan','LiGuoZhiLuan','GFQiQinMengHuo','MGBaWangZhengCheng'].randomGet();
                }*/
            }
            delete lib.config.taixuhuanjing.store;
            lib.config.taixuhuanjing.procedure = null;
            lib.config.taixuhuanjing.optional1 = null;
            lib.config.taixuhuanjing.optional2 = null;
            lib.config.taixuhuanjing.optional3 = null;
            lib.config.taixuhuanjing.optionalExam = [];
        }
        if(lib.config.taixuhuanjing.optional1 != null&&lib.config.taixuhuanjing.optional1.id==_status.TaiXuHuanJingGame.event.id){
            lib.config.taixuhuanjing.optional1 = null;
        } else if(lib.config.taixuhuanjing.optional2 != null&&lib.config.taixuhuanjing.optional2.id==_status.TaiXuHuanJingGame.event.id){
            lib.config.taixuhuanjing.optional2 = null;
        } else if(lib.config.taixuhuanjing.optional3 != null&&lib.config.taixuhuanjing.optional3.id==_status.TaiXuHuanJingGame.event.id){
            lib.config.taixuhuanjing.optional3 = null;
        }
        var taixuCollect=lib.config.txhj_collect?lib.config.txhj_collect:{};
                            var seas=lib.config.taixuhuanjing.season?lib.config.taixuhuanjing.season:'none';
                            var chap=lib.config.taixuhuanjing.chapter?lib.config.taixuhuanjing.chapter:0;
                            var nowl=lib.config.taixuhuanjing.rank?lib.config.taixuhuanjing.rank:0;
                            var nowl2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].rank)?lib.config['txhj_collect'].rank:0;
                            var chap2=(lib.config['txhj_collect']&&lib.config['txhj_collect'].chap)?lib.config['txhj_collect'].chap:0;
                            var matx=0;
                            if(game.seasonPack[seas]) {
                                for(var o=0;game.seasonPack[seas][o];o++) {
                                    if(game.seasonPack[seas][o]) matx=o;
                                }
                            }
                            //var matx=game.seasonPack[seas]&&game.seasonPack[seas].
                            if(!taixuCollect[seas]) taixuCollect[seas]={};
                            taixuCollect[seas].chapter=chap;
                            taixuCollect[seas].maxchap=matx;
                            taixuCollect[seas].rank=nowl;
                            if(nowl>nowl2||chap>chap2) game.saveConfig('txhj_collect',taixuCollect);
                            game.saveConfig('taixuhuanjing',lib.config.taixuhuanjing);
    };
    game.chooseCharacterTaiXuHuanJing = function(){
        var next=game.createEvent('chooseCharacter',false);
        next.showConfig=true;
        next.setContent(function(){
            'step 0'
            _status.nopause=false;
            delete _status.roundStart;
            game.roundNumber = 0;
            ui.arena.show();
            ui.arena.classList.add('choose-character');
            ui.arenalog.innerHTML='';/*清除历史记录*/
            ui.historybar.innerHTML='';/*清除出牌记录*/
            ui.cardPile.innerHTML=''; 
            ui.discardPile.innerHTML='';
            ui.sidebar.innerHTML='';/*清除暂停记录*/
            ui.sidebar3.innerHTML='';/*清除暂停记录*/
            _status.txcs_yipoed = undefined; /*手杀特效*/
            game.cardPileTx();
            'step 1'
            _status.modeBuff = lib.config.taixuhuanjing.buff.slice(0);
            _status.modeSkill = lib.config.taixuhuanjing.useSkills.slice(0);
            game.prepareArena(_status.TaiXuHuanJingGame.number);
            if (window.dui) {
                dui.bodySensor.events.pop();
            }
            'step 2'
            var eventdon = function(){                
                game.resume();
            };
            if (_status.gameStart==false) {
                game.pause();
                game.transitionAnimation();
                setTimeout(function(){
                    game.consoledesk();
                },1000);
            } else {
                eventdon();
            }
            'step 3'
            if (_status.gameStart==undefined) {
                _status.modeNode = lib.config.taixuhuanjing;
                //这里游戏记录被清空了，备注一下
                //game.saveConfig('taixuhuanjing',undefined);
                //这里修复了上局托管不能取消的bug
                if(ui.auto.classList.contains('hidden')) ui.auto.classList.remove('hidden')
                _status.paused2=false;
                if(game.txhj_auto&&!_status.auto) ui.click.auto();
                if(_status.paused) ui.click.pause();
                lib.config.taixuhuanjing = _status.modeNode;
                game.me.side = true;
                for(var i=0;i<game.players.length;i++){
                    if (game.players[i]!=game.me) {
                        game.players[i].side = false;
                    }
                }

                var firstChoose = game.me;
                if(firstChoose.next.side==firstChoose.side){
                    firstChoose=firstChoose.next;
                }
                _status.firstAct=firstChoose;
                for(var i=0;i<10;i++){
                    firstChoose.node.name.innerHTML=get.verticalStr(get.cnNumber(i+1,true)+'号位');
                    firstChoose=firstChoose.next;
                }

                for(var i=0;i<game.players.length;i++){
                    game.players[i].getId();
                    if(game.players[i].side==game.me.side){
                        game.players[i].node.identity.firstChild.innerHTML='友';
                    }
                    else{
                        game.players[i].node.identity.firstChild.innerHTML='敌';
                    }
                    game.players[i].node.identity.dataset.color=game.players[i].side+'zhu';
                }
            };
            'step 4'
            if (_status.gameStart==undefined) {
                //原来是你在搞鬼！——helasisy
                if(!window.txhj_libCharacterChg) {
                    window.txhj_libCharacterChg={};
                }
                //存一个备份，服了
                if(!window.txhj_libCharacterChg[_status.choiceCharacter]) {
                    window.txhj_libCharacterChg[_status.choiceCharacter]=lib.character[_status.choiceCharacter].slice(0);
                }
                lib.character[_status.choiceCharacter][3] = _status.TaiXuHuanJingGame.skills.slice(0);
                //配置武将合集（不含玩家）
                var enemys = _status.TaiXuHuanJingGame.enemy.slice(0);//敌方
                var friends = _status.TaiXuHuanJingGame.friend.slice(0);//友方
                var players = enemys.concat(friends);
                players.sort(function(a,b){
                    //按设定的座位号自动排列
                    return a.seat-b.seat;
                });
                        
                //分发武将牌
                event.gameme=false;
                var seatnum = 0;
                while(players.length){
                    if (seatnum==players[0].seat||players[0].seat==-1) {
                        if (players[0].seat==-1) {
                            if (!event.gameme) {//中间缺失的座位号由玩家补上
                                game.players[0].init(_status.choiceCharacter);//玩家选定的武将
                                game.players[0].storage.seat = seatnum;//玩家的座位号
                                game.players[0].side = true;
                                event.gameme=game.players[0];
                            }
                            seatnum++;
                        }
                        var player = players.shift();
                        game.players[seatnum].init(player.name);
                        game.players[seatnum].exten = player;
                        game.players[seatnum].storage.seat = seatnum;//座位号
                        if (player.hp&&player.hp!=-1) {
                            var hp1 = get.infoHp(player.hp);
                            var maxHp1 = get.infoMaxHp(player.hp);
                            game.players[seatnum].maxHp = maxHp1;
                            game.players[seatnum].hp = hp1;
                        }
                        if (player.effect.contains('correct')&&player.level<lib.config.taixuhuanjing.level) {
                            var num = lib.config.taixuhuanjing.level-player.level;
                            if (lib.config.taixuhuanjing.rank>1) {
                                game.players[seatnum].maxHp += num*2;
                                game.players[seatnum].hp += num*2;
                            } else {
                                game.players[seatnum].maxHp += num;
                                game.players[seatnum].hp += num;
                            }
                        }
                        if (friends.contains(player)) {
                            game.players[seatnum].side = true;
                        } else {
                            game.players[seatnum].side = false;
                        }
                        if (seatnum==player.seat) {
                            seatnum++;
                        }
                    } else if (!event.gameme) {//中间缺失的座位号由玩家补上
                        game.players[seatnum].init(_status.choiceCharacter);//玩家选定的武将
                        game.players[seatnum].storage.seat = seatnum;//玩家的座位号
                        game.players[seatnum].side = true;
                        event.gameme=game.players[seatnum];
                        seatnum++;
                    }
                }
                if(!event.gameme){
                    game.players[seatnum].init(_status.choiceCharacter);
                    game.players[seatnum].storage.seat = seatnum;
                    game.players[seatnum].side = true;
                    event.gameme=game.players[seatnum];
                }
                //根据定义的数值自动排序
                game.players.sort(function(a,b){
                    return a.storage.seat-b.storage.seat;
                });
                if(event.gameme) {
                    if(_status.event.isMine()){
                        if(!ui.auto.classList.contains('hidden')){
                            setTimeout(function(){
                                ui.click.auto();
                                setTimeout(function(){
                                    ui.click.auto();
                                    game.swapPlayer(event.gameme);
                                },500);
                            });
                        }
                    } else{
                        game.swapPlayer(event.gameme);
                    }
                }
                
                for(var i=0;i<game.players.length;i++){
                    if(game.players[i].side==game.me.side){
                        game.players[i].node.identity.firstChild.innerHTML='友';
                        game.players[i].identity = 'friend';
                    }
                    else{
                        game.players[i].node.identity.firstChild.innerHTML='敌';
                        game.players[i].identity = 'enemy';
                        if (game.players[i].exten&&game.players[i].exten.type=='boss') {
                            game.players[i].node.identity.firstChild.innerHTML='神';
                        }
                    }
                    game.players[i].node.identity.dataset.color=game.players[i].side+'zhu';
                }
                if (game.me) {
                    if(document.getElementsByClassName('identity').length){
                        var dialogs = document.querySelectorAll('#arena > div.player > div.identity');
                        //不知为何按原来这样写会移动到下家去
                        //dialogs[game.me.storage.seat].setBackgroundImage('extension/十周年UI/image/decoration/identity_tx_gameme.png');
                        dialogs[game.me.previous.storage.seat].setBackgroundImage('extension/十周年UI/image/decoration/identity_tx_gameme.png');
                    }
                }
            };
            for(var i=0;i<game.players.length;i++){
                if(game.players[i]!=game.me&&game.players[i].name!=undefined) {
                        if(!lib.config['txhj_collect'].character[game.players[i].name]){
                            lib.config['txhj_collect'].character[game.players[i].name]=1;
                        }else {
                            lib.config['txhj_collect'].character[game.players[i].name]++;
                        }
                }
            }
            "step 5"
            event.justadded=[];
            event.xingdong=[];
            for(var i=0;i<game.players.length;i++){
                event.xingdong.push(game.players[i]);
                event.justadded.push(game.players[i]);
            }
            if (_status.gameStart==undefined) {
                game.gamePremise();
                game.gameDraw(_status.firstAct);
                event.trigger('gameStart');
                setTimeout(function(){
                    ui.arena.classList.remove('choose-character');
                },500);
                if (_status.enterGame!=undefined) {
                    for(var i=0;i<game.players.length;i++){
                        game.triggerEnter(game.players[i]);
                    }
                }
                _status.gameStart = true;
                _status.enterGame = true;
            }
            'step 6'
            if(!_status.xingdong){
                _status.xingdong = [];
            }
            if(event.xingdong.length){
                var toact=event.xingdong.shift();
                if(game.players.contains(toact)){
                    toact.phase();
                }
                if (!_status.xingdong.contains(toact)) {
                    _status.xingdong.push(toact);
                }
                event.redo();
            }
            'step 7'
            if (_status.gameStart==true||_status.gameStart==false){
                event.goto(2);
            }
        });
    };
    get.rawAttitude = function(from,to){
        if(from.side==to.side){
            if (from.exten&&from.exten.type=='boss') {
                return 10;
            } else {
                return 6;
            }
        } else {
            if (from!=game.me) {
                return -5;
            } else {
                return -10;
            }
        }
    };
    get.cardRank = function(card){
        for (var i = 0; i < txhjPack.cardRank.length; i++) {
            if (txhjPack.cardRank[i].cardID==card) {
                return txhjPack.cardRank[i].rank || 1;
                break;
            }
        }
    };
    get.cardValue = function(card){
        for (var i = 0; i < txhjPack.cardRank.length; i++) {
            if (txhjPack.cardRank[i].cardID==card) {
                return txhjPack.cardRank[i].value || 100;
                break;
            }
        }
    };
    get.skillRank = function(skill){
        for (var i = 0; i < txhjPack.skillRank.length; i++) {
        	if(!lib.skill[txhjPack.skillRank[i].skillID]||!lib.translate[txhjPack.skillRank[i].skillID]) continue;
            if(txhjPack.skillRank[i].skillID==skill&&txhjPack.skillRank[i].rank){
                return txhjPack.skillRank[i].rank;
                break;
            }
        }
        return 1;
    };
    get.skillValue = function(skill){
        for (var i = 0; i < txhjPack.skillRank.length; i++) {
        	if(!lib.skill[txhjPack.skillRank[i].skillID]||!lib.translate[txhjPack.skillRank[i].skillID]) continue;
            if(txhjPack.skillRank[i].skillID==skill&&txhjPack.skillRank[i].value){
                return txhjPack.skillRank[i].value;
                break;
            }
        }
        return 1;
    };
    get.eventState = function (event) {
        var events = lib.config.taixuhuanjing.events.slice(0);
        for (var i = 0; i < events.length; i++) {
            if (events[i].id==event.id&&events[i].season==event.season&&events[i].chapter==event.chapter&&events[i].seat==event.seat) {
                return true;
                break;
            }
        }
    };
    get.eventReserve = function (event) {
        var events = lib.config.taixuhuanjing.procedure.slice(0);
        for (var i = 0; i < events.length; i++) {
            if (events[i]==undefined) {
                return true;
                break;
            }
            if (events[i].id==event.id&&events[i].season==event.season&&events[i].chapter==event.chapter) {
                return true;
                break;
            }
        }
    };
    lib.element.player.dieAfter2 = function(source){
        if(_status.mode!='taixuhuanjing') return;
        //十常侍
        if(this.isOut()&&_status.mbmowang_return[this.playerid]) return;
        //bug修复
        var friend;
        for(var i=0;i<game.players.length;i++){
            if(game.players[i].side==this.side){
                friend=game.players[i];break;
            }
        }
        if(friend){
            if(source){
                if(source.side!=this.side){
                    if (source==game.me&&lib.config.taixuhuanjing.rank>1) {
                        if (lib.config.taixuhuanjing.rank<3) {
                            source.draw(1);
                        }
                    } else {
                        source.draw(2);
                    }
                }
            }
            else{
                game.delay();
            }
        }
    };
    lib.element.player.dieAfter = function(source){
        if(_status.mode!='taixuhuanjing') return;
        var event1 = _status.TaiXuHuanJingGame.event;
        var event2 = game.eventPack[event1.season][event1.chapter][event1.id];
        if (game.me.isDead()) {
            if (event2.unique&&event2.unique==true) {
                game.TaiXuHuanJingState(false);
            } else {
                game.TaiXuHuanJingState(null);
            }
            return;
        };

        if (event2.type=='choose') {
            var enemy;
            for(var i=0;i<game.players.length;i++){
                if(game.players[i].side==false){
                    enemy=game.players[i];
                    break;
                }
            }
            if (!enemy) {
                game.TaiXuHuanJingState(true);
            }
            return;
        }
        if (event2.target=='kill') {
            var enemys = event2.enemy.slice(0);
            for (var i = 0; i < enemys.length; i++) {
                if (enemys[i].type=='boss'&&enemys[i].name==this.name) {
                    game.TaiXuHuanJingState(true);
                    break;
                }
            }
        } else {
            var enemy;
            for(var i=0;i<game.players.length;i++){
                if(game.players[i].side==false){
                    enemy=game.players[i];
                    break;
                }
            }
            if (!enemy) {
                game.TaiXuHuanJingState(true);
            }
        }
    };
    game.tsymq_checkFileExist=function(path,callback){
        if(lib.node && lib.node.fs){
            try{
                var stat=lib.node.fs.statSync(__dirname+'/'+path);
                callback(stat);
            }catch(e){
                callback(false);
                return;
            }
        }else{
            resolveLocalFileSystemURL(lib.assetURL+path,(function(name){
                return function(entry){
                    callback(true);
                }
            }(name)),function(){
                callback(false);
            });
        }
    };
    game.addMode('taixuhuanjing', {
        name: 'taixuhuanjing',
        start:function(){
            "step 0"
            _status.mode = 'taixuhuanjing';
            game.seasonPack = {};
            game.eventPack = {};
            //Helasisy改：太虚幻境模式默认开启十周年牌名辅助显示
            if (window.decadeUI) ui.window.dataset.cardAlternateNameVisible = 'on';
            lib.init.js(lib.assetURL +'extension/太虚幻境/extension_character.js',null,function(){},function(){
                return;
            });
            lib.init.js(lib.assetURL +'extension/太虚幻境/extension_buff.js',null,function(){},function(){
                return;
            });
            lib.init.js(lib.assetURL +'extension/太虚幻境/extension_collect.js',null,function(){},function(){
                return;
            });
            lib.init.js(lib.assetURL +'extension/太虚幻境/event/event_universal.js',null,function(){},function(){
                return;
            });
            game.tsymq_checkFileExist('extension/太虚幻境/dlc/',function(s){
                if(s && game.getFileList){
                    game.getFileList('extension/太虚幻境/dlc/',function(folders,files){
                        if(folders){
                            for(var f of folders){
                                lib.init.js(lib.assetURL +'extension/太虚幻境/dlc/'+f+'/extension_season.js',null,function(){},function(){
                                    return;
                                });
                            }
                        }
                    });
                };
            });
            /*lib.init.js(txhjPack.path +'/extension_season.js',null,function(){},function(){
                return;
            });*/
            lib.init.js(txhjPack.path + '/extension_servant.js');
            "step 1"
            if (lib.config.taixuhuanjingNode==undefined) {
                lib.config.taixuhuanjingNode={
                    use:{},/*常用武将*/
                    forbidden:[],/*过滤部分问答*/
                };
                game.saveConfig('taixuhuanjingNode',lib.config.taixuhuanjingNode);
                game.updateModeData();
            };
            if (lib.config.taixuhuanjing==undefined) {
                game.updateModeData();
            }
            _status.TaiXuHuanJingGame = {
                event:null,
                number:2,
                premise:'',
                enemy:[],
                friend:[],
                cards:[],
                skills:[],
                return:null,
            }
            "step 2"
            game.pause();
            game.taixuhuanjingHome();
            "step 3"
            game.chooseCharacterTaiXuHuanJing();
        },
        init: function () {
            document.interval = setInterval(function(){
                if (_status.modeNode==undefined) return;
                if (_status.modeNode.score==undefined) return;
                if (_status.modeNode.score.time==undefined) return;
                if ( _status.gameStart == true && _status.enterGame == true ){
                    _status.modeNode.score.time++;
                }
            },1000);
        },

        game:{
            transitionAnimation:function(){
                var dialog = ui.create.div('.taixuhuanjing_transitionDialog');
                document.body.appendChild(dialog);
                var topBody = ui.create.div('.taixuhuanjing_transitionDialogTopBody',dialog);
                var bottomLeft1 = ui.create.div('.taixuhuanjing_transitionDialogBottomLeft1',dialog);
                var bottomRight1 = ui.create.div('.taixuhuanjing_transitionDialogBottomRight1',dialog);
                var bottomLeft2 = ui.create.div('.taixuhuanjing_transitionDialogBottomLeft2',dialog);
                var bottomRight2 = ui.create.div('.taixuhuanjing_transitionDialogBottomRight2',dialog);
                setTimeout(function(){
                    dialog.delete();
                },2600);
            },
            gameDraw:function(begin){
                if (get.mode() != 'taixuhuanjing') return;
                var next = game.createEvent('gameDraw');
                next.begin = begin;
                next.setContent(function(){
                    "step 0"
                    game.me.maxHp = lib.config.taixuhuanjing.maxHp;
                    game.me.hp = lib.config.taixuhuanjing.hp;
                    var target = event.begin;
                    while(true){
                        var num1 = 4;
                        if(target==game.me){
                            if (lib.config.taixuhuanjing.minHs>=0) {
                                num1 = lib.config.taixuhuanjing.minHs;
                            }
                        } else if (target.exten) {
                            num1 = target.exten.minHs;
                            if (lib.config.taixuhuanjing.rank>4) {
                                num1+=3;
                            } else if (lib.config.taixuhuanjing.rank>3) {
                                num1+=2;
                            } else if (lib.config.taixuhuanjing.rank>2) {
                                num1+=1;
                            }
                            if (lib.config.taixuhuanjing.effect=='chongfenbeizhan') {
                                num1+=2;
                            } else if (lib.config.taixuhuanjing.effect=='cangcuchuji') {
                                num1-=3;
                            } 
                        }
                        if(target==game.me&&lib.config.taixuhuanjing.buff.contains('buff_txhj_pofuchenzhou')){
                            num1 = 1;
                        }
                        if(target==game.me&&num1 != game.me.maxHp&&lib.config.taixuhuanjing.buff.contains('buff_txhj_fuzu')){
                            num1 = game.me.maxHp;
                        }
                        target.directgain(get.cards(num1));
                        target = target.next;
                        if(target == event.begin)break;
                    };
                    if (lib.config.taixuhuanjing.equip1!=null) {
                        var equip1 = lib.config.taixuhuanjing.equip1;
                        var info = get.translation(equip1);
                        if (info) {
                            game.me.equip(game.createCard(equip1.name,equip1.suit,equip1.number));
                        }
                    }
                    if (lib.config.taixuhuanjing.equip2!=null) {
                        var equip2 = lib.config.taixuhuanjing.equip2;
                        var info = get.translation(equip2);
                        if (info) {
                            game.me.equip(game.createCard(equip2.name,equip2.suit,equip2.number));
                        }
                    }
                    if (lib.config.taixuhuanjing.equip3!=null) {
                        var equip3 = lib.config.taixuhuanjing.equip3;
                        var info = get.translation(equip3);
                        if (info) {
                            game.me.equip(game.createCard(equip3.name,equip3.suit,equip3.number));
                        }
                    }
                    if (lib.config.taixuhuanjing.equip4!=null) {
                        var equip4 = lib.config.taixuhuanjing.equip4;
                        var info = get.translation(equip4);
                        if (info) {
                            game.me.equip(game.createCard(equip4.name,equip4.suit,equip4.number));
                        }
                    }
                    event.shouqika = lib.config.taixuhuanjing.adjust;
                    "step 1"
                    if (game.me.storage.seat==0&&event.shouqika>0) {
                        game.me.chooseBool('可以免费使用'+event.shouqika+'次手气卡，是否更换手牌？');
                        event.shouqika--;
                    } else {
                        event.goto(3);
                    }
                    "step 2"
                    if(result.bool){
                        var hs = game.me.getCards('h');
                        game.addVideo('lose',game.me,[get.cardsInfo(hs),[],[]]);
                        for(var i=0;i<hs.length;i++){
                            hs[i].discard(false);
                        }
                        game.me.directgain(get.cards(hs.length));
                        if (event.shouqika>0) {
                            event.goto(1);
                        }
                    }
                    'step 3'
                    var hs1 = [];
                    var list = _status.TaiXuHuanJingGame.cards.slice(0);
                    for (var i = 0; i < list.length; i++) {
                        hs1.push(game.createCard(list[i].name,list[i].suit,list[i].number,list[i].nature));
                    }
                    var hs2 = [];
                    var hs = game.me.getCards('h');
                    game.addVideo('lose',game.me,[get.cardsInfo(hs),[],[]]);
                    for(var i=0;i<hs.length;i++){
                        hs2.push(hs[i]);
                        hs[i].discard(false);
                    };
                    if(hs1.length){
                        game.me.directgain(hs1);
                    }
                    var hs3 = game.me.getCards('h');
                    for(var i=0;i<hs3.length;i++){
                        hs3[i].addGaintag('牌库');
                    };
                    if(hs2.length){
                        game.me.directgain(hs2);
                    }
                    "step 4"
                    var equips0 = [];
                    var equips1 = [];
                    var equips2 = [];
                    var equips3 = [];
                    for (var i = 0; i < txhjPack.cardPack.length; i++) {
                        equips0.push(txhjPack.cardPack[i].cardID);
                        var num = get.cardRank(txhjPack.cardPack[i].cardID);
                        if (num>=3) {
                            if (lib.translate[txhjPack.cardPack[i].cardID]&&get.type(txhjPack.cardPack[i].cardID)=='equip') {
                                if (get.subtype(txhjPack.cardPack[i].cardID)=='equip1') {
                                    equips1.push(txhjPack.cardPack[i].cardID);
                                } else if (get.subtype(txhjPack.cardPack[i].cardID)=='equip2') {
                                    equips2.push(txhjPack.cardPack[i].cardID);
                                } else {
                                    equips3.push(txhjPack.cardPack[i].cardID);
                                }
                            }
                        }
                    }
                    for(var i=0;i<game.players.length;i++){
                        if (game.players[i]!=game.me) {
                            if (game.players[i].exten) {
                                var exten = game.players[i].exten;
                                if (exten.maxHp) {
                                    game.players[i].maxHp += exten.maxHp;
                                    game.players[i].hp += exten.maxHp;
                                }
                                if (exten.cards.length) {
                                    var hs3 = [];
                                    for (var h = 0; h < exten.cards.length; h++) {
                                        hs3.push(game.createCard(exten.cards[h]));
                                    }
                                    if(hs3.length){
                                        game.players[i].directgain(hs3);
                                    }
                                }
                                if (exten.skills.length) {
                                    for (var ii = 0; ii < exten.skills.length; ii++) {
                                        game.players[i].addSkill(exten.skills[ii]);
                                    }
                                }
                                if (exten.equip.length) {
                                    for (var e = 0; e < exten.equip.length; e++) {
                                        game.players[i].equip(game.createCard(exten.equip[e]));
                                    }
                                }
                                if (game.players[i].side==false&&lib.config.taixuhuanjing.rank>1) {
                                    game.players[i].maxHp ++;
                                    game.players[i].hp ++;
                                }
                                if (game.players[i].side==false&&lib.config.taixuhuanjing.rank>2) {
                                    game.players[i].addSkill('reyingzi');
                                    game.players[i].addSkill('mashu');
                                }
                                var typelist = ['equip1','equip2','equip3'];
                                typelist.randomSort();
                                if (lib.config.taixuhuanjing.effect=='huanjingcaoge') {
                                    var equip = typelist.shift();
                                    if (equip=='equip1') {
                                        var equip1 = equips1.randomGet(1);
                                        game.players[i].equip(game.createCard(equip1));
                                        equips1.remove(equip1);
                                    }
                                    if (equip=='equip2') {
                                        var equip2 = equips2.randomGet(1);
                                        game.players[i].equip(game.createCard(equip2));
                                        equips2.remove(equip2);
                                    }
                                    if (equip=='equip3') {
                                        var equip3 = equips3.randomGet(1);
                                        game.players[i].equip(game.createCard(equip3));
                                        equips3.remove(equip3);
                                    }
                                } else {
                                    typelist.remove(typelist.randomGet());
                                }
                                if (game.players[i].side==false&&lib.config.taixuhuanjing.rank>3) {
                                    while(typelist.length){
                                        var equip = typelist.shift();
                                        if (equip=='equip1') {
                                            var equip1 = equips1.randomGet(1);
                                            game.players[i].equip(game.createCard(equip1));
                                            equips1.remove(equip1);
                                        }
                                        if (equip=='equip2') {
                                            var equip2 = equips2.randomGet(1);
                                            game.players[i].equip(game.createCard(equip2));
                                            equips2.remove(equip2);
                                        }
                                        if (equip=='equip3') {
                                            var equip3 = equips3.randomGet(1);
                                            game.players[i].equip(game.createCard(equip3));
                                            equips3.remove(equip3);
                                        }
                                    }
                                }
                            }
                        }
                        if (game.players[i]!=game.me&&lib.config.taixuhuanjing.effect=='lingqiyiman') {
                            game.players[i].maxHp+=2;
                            game.players[i].hp+=2;
                        } else if (game.players[i]!=game.me&&lib.config.taixuhuanjing.effect=='lingqikuijie') {
                            game.players[i].maxHp-=1;
                            game.players[i].hp-=1;
                        } else if (game.effectPack[lib.config.taixuhuanjing.effect]&&game.effectPack[lib.config.taixuhuanjing.effect].skill.length) {
                            var skills = game.effectPack[lib.config.taixuhuanjing.effect].skill.slice(0);
                            for (var ii = 0; ii < skills.length; ii++) {
                                if (game.players[i]!=game.me&&!game.players[i].hasSkill(skills[ii])) {
                                    game.players[i].addSkill(skills[ii]);
                                }
                            }
                        }
                        game.players[i].update();
                    }
                    'step 5'
                    var event1 = _status.TaiXuHuanJingGame.event;
                    var premise = _status.TaiXuHuanJingGame.premise;
                    game.messagePopup(''+premise+'');
                    if(lib.config['extension_'+'十周年UI'+'_enable']){
                        setTimeout(decadeUI.effect.gameStart, 51);
                    };
                });
            },
        },
        skill:{},
        characterPack:{},
        translate:{},
        cardPack:{},
        posmap:{},
    },{
        translate: '太虚幻境',
        extension: '太虚幻境',
        config: {
            quankuo:{
                name:'全扩将池',
                init:false,
                intro:'解除所有选择的限制',
            },
            suiji:{
                name:'随机将池',
                init:true,
                intro:'仅「全扩奖池」关闭时生效：在可选的将池内每个势力随机抽取14名武将提供选择（神势力抽取7名）',
            },
            pingheng:{
                name:'限制将池',
                init:true,
                intro:'仅「随机奖池」开启时生效：将池内随机抽取武将的星级不会超过该赛季解锁的难度',
            },
            star: {
				init: 0,
				intro: "每个武将星级的设置",
				name: "武将星级",
				item: {
					0: "系统默认",
					1: "全部一星",
					2: "全部二星",
					3: "全部三星",
					4: "全部四星",
					5: "全部五星",
				}
         	},
            deleteModeNode:{
                name:'重置记录',
                init:false,
                restart:true,
                unfrequent:true,
                intro:'删除所有统计记录',
                onclick: function(bool) {
                    if (bool) {
                        var src = "是否删除所有记录并重新启动游戏？";
                            var d = confirm(src);
                            if (d == true) {
                               game.saveConfig('taixuhuanjingNode', undefined)
                               game.saveConfig('taixuhuanjing', undefined);
                               game.saveConfig('txhj_collect', undefined);
                               game.reload()
                            }
                            /*confirms(src,function(){
                                game.saveConfig('taixuhuanjingNode', undefined)
                                game.saveConfig('taixuhuanjing', undefined);
                                game.reload()
                            });*/
                    }
                }
            },
            
        },
    });
    game.effectPack = {
        'correct':{
            name:'等级补正',
            type:'correct',
            effect:'buff',
            info:'等级补正：你每超出其一级，其额外+1体力及体力上限',
            num:1,
            skill:[],
            button:'等级补正',
        },
        'strengthen':{
            name:'难度补正',
            type:'strengthen',
            effect:'buff',
            info:'难度补正：额外+1体力及体力上限',
            num:1,
            skill:[],
            button:'难度补正',
        },
        'nightmare':{
            name:'难度补正',
            type:'nightmare',
            effect:'buff',
            info:'难度补正：额外+1体力及体力上限，拥有技能英姿、马术',
            num:1,
            skill:[],
            button:'难度补正',
        },
        'purgatory':{
            name:'难度补正',
            type:'purgatory',
            effect:'buff',
            info:'难度补正：额外+1体力及体力上限，装备一件随机装备并拥有技能英姿、马术',
            num:1,
            skill:[],
            button:'难度补正',
        },

        'pinganwushi':{
            name:'平安无事',
            type:'effect',
            effect:'buff',
            info:'无效果',
            num:0,
            skill:[],
            button:'平安无事',
        },
        'lingqiyiman':{
            name:'灵气溢满',
            type:'effect',
            effect:'buff',
            info:'所有角色体力及体力上限+2',
            num:200,
            skill:[],
            button:'灵气溢满',
        },
        'lingqikuijie':{
            name:'灵气匮竭',
            type:'effect',
            effect:'buff',
            info:'所有角色体力及体力上限-1',
            num:0.4,
            skill:[],
            button:'灵气匮竭',
        },
        'xueyan':{
            name:'血宴',
            type:'effect',
            effect:'buff',
            info:'所有角色获得技能【狂骨】',
            num:0.4,
            skill:['kuanggu'],
            button:'血宴',
        },
        'nanjianzhenxiong':{
            name:'难见真凶',
            type:'effect',
            effect:'buff',
            info:'所有角色获得技能【绝情】',
            num:0.4,
            skill:['jueqing'],
            button:'难见真凶',
        },
        'libengyuehuai':{
            name:'礼崩乐坏',
            type:'effect',
            effect:'buff',
            info:'所有角色获得技能【崩坏】',
            num:0.4,
            skill:['benghuai'],
            button:'礼崩乐坏',
        },
        'chongfenbeizhan':{
            name:'充分备战',
            type:'effect',
            effect:'buff',
            info:'所有角色初始手牌+2',
            num:0.4,
            skill:[],
            button:'充分备战',
        },
        'cangcuchuji':{
            name:'仓促出击',
            type:'effect',
            effect:'buff',
            info:'所有角色初始手牌-3',
            num:0.4,
            skill:[],
            button:'仓促出击',
        },
        'hongyanhuoshui':{
            name:'红颜祸水',
            type:'effect',
            effect:'buff',
            info:'所有角色获得技能【红颜】',
            num:0.4,
            skill:['hongyan'],
            button:'红颜祸水',
        },
        'daodaozhiming':{
            name:'刀刀致命',
            type:'effect',
            effect:'buff',
            info:'所有角色获得技能【贪食】【仇海】',
            num:0.4,
            skill:['txhj_tanshi','rechouhai'],
            button:'刀刀致命',
        },
        'xiaoxinxuanya':{
            name:'小心悬崖',
            type:'effect',
            effect:'buff',
            info:'所有角色获得技能【缠怨】',
            num:0.4,
            skill:['chanyuan'],
            button:'小心悬崖',
        },
        'jiuzhuangrendan':{
            name:'酒壮人胆',
            type:'effect',
            effect:'buff',
            info:'所有角色获得技能【醉酒】',
            num:0.4,
            skill:["txhj_zuijiu"],
            button:'酒壮人胆',
        },
        'pinsiduijue':{
            name:'拼死对决',
            type:'effect',
            effect:'buff',
            info:'所有角色获得技能【矢志】',
            num:0.4,
            skill:['shizhi'],
            button:'拼死对决',
        },
        'xincunbuliang':{
            name:'心存不良',
            type:'effect',
            effect:'buff',
            info:'所有角色获得技能【腹麟】',
            num:0.4,
            skill:['fulin'],
            button:'心存不良',
        },
        'bukelianzhan':{
            name:'不可恋战',
            type:'effect',
            effect:'buff',
            info:'所有角色获得技能【亡阻】',
            num:0.4,
            skill:['txhj_wangzu'],
            button:'不可恋战',
        },
        'jianxuefangxiu':{
            name:'见血方休',
            type:'effect',
            effect:'buff',
            info:'所有角色获得技能【虎啸】',
            num:0.4,
            skill:['txhj_oldhuxiao'],
            button:'见血方休',
        },
        'huanjingcaoge':{
            name:'幻境操戈',
            type:'effect',
            effect:'buff',
            info:'所有角色都会获得一件随机装备',
            num:0.4,
            skill:[],
            button:'幻境操戈',
        },
        'rulangshigu':{
            name:'如狼噬骨',
            type:'effect',
            effect:'buff',
            info:'所有角色获得技能【狼袭】',
            num:0.4,
            skill:['xinfu_langxi'],
            button:'如狼噬骨',
        },
        'yaowuyangwei':{
            name:'耀武扬威',
            type:'effect',
            effect:'buff',
            info:'所有角色获得技能【耀武】',
            num:0.4,
            skill:['yaowu'],
            button:'耀武扬威',
        },
        'xianzhenpocheng':{
            name:'陷阵破城',
            type:'effect',
            effect:'buff',
            info:'所有角色获得技能【陷阵】',
            num:0.4,
            skill:['xianzhen'],
            button:'陷阵破城',
        },
        'huangtiandangli':{
            name:'黄天当立',
            type:'effect',
            effect:'buff',
            info:'所有角色获得技能【黄巾】',
            num:0.4,
            skill:['txhj_huangjin'],
            button:'黄天当立',
        },
        'ganjinshajue':{
            name:'赶尽杀绝',
            type:'effect',
            effect:'buff',
            info:'所有角色获得技能【株连】',
            num:0.4,
            skill:['txzhulian'],
            button:'赶尽杀绝',
        },
     /*   'tanqiuwudu':{
            name:'贪求无度',
            type:'effect',
            effect:'buff',
            info:'所有角色获得技能【协贿】',
            num:0.4,
            skill:['txhj_xiehui'],
            button:'贪求无度',
        },
        'beigonghuanluan':{
            name:'北宫宦乱',
            type:'effect',
            effect:'buff',
            info:'所有角色获得技能【黄门】',
            num:0.4,
            skill:['txhj_txhj_xiehui'],
            button:'北宫宦乱',
        }, */
        'zhenfenjiang':{
            name:'情绪激昂',
            type:'effect',
            effect:'buff',
            info:'所有角色获得技能【激昂】',
            num:0.4,
            skill:['jiang'],
            button:'情绪激昂',
        },
        'xiangzhangbayi':{
            name:'嚣张跋扈',
            type:'effect',
            effect:'buff',
            info:'所有角色获得技能【挑衅】',
            num:0.4,
            skill:['tiaoxin'],
            button:'嚣张跋扈',
        },
        'rulianshi':{
            name:'入殓师',
            type:'effect',
            effect:'buff',
            info:'所有角色获得技能【行殇】',
            num:0.4,
            skill:['xingshang'],
            button:'入殓师',
        },
        'yinsheroumi':{
            name:'淫奢肉糜',
            type:'effect',
            effect:'buff',
            info:'所有角色获得技能【肉林】',
            num:0.4,
            skill:['roulin'],
            button:'淫奢肉糜',
        },
        'qianlizhuixi':{
            name:'千里追袭',
            type:'effect',
            effect:'buff',
            info:'所有角色获得技能【追袭】',
            num:0.4,
            skill:['zhuixi'],
            button:'千里追袭',
        },
        'fenhuoqinyin':{
            name:'烽火琴音',
            type:'effect',
            effect:'buff',
            info:'所有角色获得技能【琴音】',
            num:0.4,
            skill:['qinyin'],
            button:'烽火琴音',
        },
        'toulianghuanzhuy':{
            name:'偷梁换柱',
            type:'effect',
            effect:'buff',
            info:'所有角色获得技能【夺刀】',
            num:0.4,
            skill:['xinduodao'],
            button:'偷梁换柱',
        },
        'hengxingbadao':{
            name:'横行霸道',
            type:'effect',
            effect:'buff',
            info:'所有角色获得技能【横征】',
            num:0.4,
            skill:['hengzheng'],
            button:'横行霸道',
        },

        /*效果说明*/
        'randomBuff':{
            name:'随机祝福',
        },
        'randomCard':{
            name:'随机卡牌',
        },
        'randomEquip':{
            name:'随机装备',
        },
        'randomSkill':{
            name:'随机技能',
        },

        'removeBuff':{
            name:'移除随机祝福',
        },
        'removeCard':{
            name:'移除随机卡牌',
        },
        'removeEquip':{
            name:'移除随机装备',
        },
        'removeSkill':{
            name:'移除随机技能',
        },

        'buff':{
            name:'祝福',
        },
        'card':{
            name:'卡牌',
        },
        'equip':{
            name:'装备',
        },
        'skill':{
            name:'技能',
        },

        'hp':{
            name:'体力',
        },
        'maxHp':{
            name:'体力上限',
        },
        'minHs':{
            name:'初始手牌',
        },
        'maxHs':{
            name:'手牌上限',
        },

        'attack':{
            name:'攻击技能',
        },
        'defense':{
            name:'防御技能',
        },
        'assist':{
            name:'控制技能',
        },
        'burst':{
            name:'爆发技能',
        },

        'basic':{
            name:'基本牌',
        },
        'trick':{
            name:'锦囊牌',
        },
        'exp':{
            name:'经验',
        },
        'coin':{
            name:'金币',
        },
        'adjust':{
            name:'手气卡',
        },
        'maxSkills':{
            name:'技能插槽',
        },
        'equip1':{
            name:'武器',
        },
        'equip2':{
            name:'防具',
        },
        'equip5':{
            name:'宝物',
        },
    };
    return {};
});
