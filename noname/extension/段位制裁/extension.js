game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"段位制裁",content:function(config,pack){
    //游戏开始时进行替换
    lib.skill._eloMechanism={
        trigger:{
            global:"gameStart",
        },
        firstDo:true,
        direct:true,
        popup:false,
        usable:1,
        charlotte:true,
        filter:function(event,player) {
            return !game.hasInitEloFunction&&player==game.me;
        },
        content:function() {
            //这里有个钩子函数的bug，刚刚给修
            game.hasInitEloFunction=true;
            //①标记所有人为塞入的卡牌（isEloKnown）
            if(ui.cardPile.insertBefore) {
                ui.cardPile.eloInsertBefore=ui.cardPile.insertBefore;
                ui.cardPile.insertBefore=function(newElement,targetElement,noMark) {
                    if(!newElement) return;
                    try {
                        if(!noMark) newElement.isEloKnown=true;
                        return this.eloInsertBefore(newElement,targetElement);
                    }catch {
                        return false;
                    }
                };
            }
            if(ui.cardPile.appendChild) {
                ui.cardPile.eloAppendChild=ui.cardPile.appendChild;
                ui.cardPile.appendChild=function(newElement,noMark) {
                    if(!newElement) return;
                    try {
                        if(!noMark) newElement.isEloKnown=true;
                        return this.eloAppendChild(newElement);
                    }catch {
                        return false;
                    }
                };
            }
            //②洗牌时清空所有标记
            if(game.washCard) {
                game.eloWashCard=game.washCard;
                game.washCard=function() {
                    var cards=game.eloWashCard();
                    if(cards&&cards.length) {
                        cards.forEach(card=>{
                            card.isEloKnown=undefined;
                        });
                    }
                    return cards;
                };
            }
        },
    };
    //新增一个标记初始手牌的
    lib.skill._eloInitCards={
        trigger:{
			player:'enterGame',
			global:'phaseBefore',
		},
		filter:function(event,player){
		    if(!player.countCards('he')) return false;
			return event.name!='phase'||game.phaseNumber==0;
		},
		priority:-Infinity,
        lastDo:true,
        direct:true,
        popup:false,
        charlotte:true,
        content:function() {
            player.getCards('he').forEach(card=>{
                card.isEloKnown=true;
            });
        },
    };
    //玉如意的效果，此处供参考
    /*yuruyi:{
		trigger:{player:'drawBegin'},
		silent:true,
		filter:function(){
			return ui.cardPile.childElementCount>1;
		},
		content:function(){
			var value=get.value(ui.cardPile.firstChild);
			var num=Math.min(20,ui.cardPile.childElementCount);
			var list=[],list2=[],list3=[];
			for(var i=1;i<num;i++){
				var val=get.value(ui.cardPile.childNodes[i]);
				if(val>value){
					list.push(ui.cardPile.childNodes[i]);
					if(val>value+1&&val>=7){
						list2.push(ui.cardPile.childNodes[i]);
					}
					if(val>value+1&&val>=8){
						list3.push(ui.cardPile.childNodes[i]);
					}
				}
			}
			var card;
			if(list3.length){
				card=list3.randomGet();
			}
			else if(list2.length){
				card=list2.randomGet();
			}
			else if(list.length){
				card=list.randomGet();
			}
			if(card){
				ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
			}
		}
	},*/
	game.orderEloCards=function(cards,order,enemy){
	    if(!cards.length) return [];
	    var eloCards=[];
	    var unlockCards=cards.filter(card=>!card.isEloKnown);
        if(!unlockCards.length) return cards;
        var value=enemy?-1:1;
        unlockCards.sort((a,b)=>{
            return order(a,b)*value;
        });
        if(game.eloGetDifficulty(true)==-1) {
            unlockCards.reverse();
        }
        for(var i=0;i<cards.length;i++) {
            var card=cards[i];
            if(card.isEloKnown) {
                eloCards.push(card);
            }else {
                eloCards.push(unlockCards.shift());
            }
        }
        return eloCards;
	};
	game.eloGetDifficulty=function(getEH,isEnemy){
	    var diff=1;
	    var eh=0;
	    var offline=sessionStorage.getItem('Network');
        if(!offline) offline='online';
	    switch(lib.config["extension_段位制裁_eloDifficulty"]) {
	        case "eeasy":
	        diff=4;eh=1;break;
	        case "veasy":
	        diff=3;eh=1;break;
	        case "easy":
	        diff=2;eh=1;break;
	        case "normal":
	        diff=1;break;
	        case "hard":
	        diff=2;eh=-1;break;
	        case "vhard":
	        diff=3;eh=-1;break;
	        case "ehard":
	        diff=4;eh=-1;break;
	        case "paiwei":
	        if(typeof window.helasisy_getPaiWeiInfo=='function') {
	            diff=3-window.helasisy_getPaiWeiInfo('level');
	        }
	        if(diff>0) {
	            eh=1;
	        }else if(diff<0) {
	            eh=-1;
	            diff=Math.abs(diff);
	        }
	        diff+=1;
            if(offline!='online'||(get.mode&&get.mode()=='taixuhuanjing')) {
                eh=0;
    	        diff=1;
            }
	        break;
	        default:
	        diff=4;break;
	    }
	    if(getEH) return eh;
	    return diff;
	};
	get.eloCards = function(num, putBack) {
        // 清理等待中的卡片
        if (_status.waitingForCards) {
            ui.create.cards.apply(ui.create, _status.waitingForCards);
            delete _status.waitingForCards;
        }
    
        // 参数校验和标准化
        if (typeof num !== 'number' || isNaN(num)) num = 1;
        if (num < 0) num = 1;
        const returnSingleCard = (num === 0); // 0表示返回单张卡片
        if (returnSingleCard) num = 1;
    
        const cardPile = ui.cardPile;
        const list = [];
        
        // 安全取牌：检查牌堆是否有足够卡片
        for (let i = 0; i < num && cardPile.children.length > 0; i++) {
            const card = cardPile.firstChild;
            cardPile.removeChild(card);
            card.original = 'c';
            list.push(card);
        }
    
        // 放回逻辑优化
        if (putBack && list.length > 0) {
            // 使用文档片段减少重排
            const fragment = document.createDocumentFragment();
            //list.forEach(card => fragment.appendChild(card));
            list.forEach(card => fragment.eloAppendChild(card));
            //cardPile.insertBefore(fragment, cardPile.firstChild);
            cardPile.eloInsertBefore(fragment, cardPile.firstChild);
        }
    
        game.updateRoundNumber();
        
        // 返回结果处理
        return returnSingleCard 
            ? (list[0] || null)  // 无卡时返回null避免undefined
            : list;               // 始终返回数组
    };
	lib.skill._eloDraw={
	    trigger:{
	        player:['drawBegin','judgeBegin'],
	    },
		silent:true,
		filter:function(event,player){
			if(game.eloGetDifficulty(true)==0) return false;
			if(event.name=='draw') {
			    if(event.num<1) return false;
			    event.eloNum=event.num;
			}else {
			    if(typeof event.judge!='function') return false;
			    event.eloNum=1;
			}
			return ui.cardPile.childElementCount>1&&game.me;
		},
        lastDo:true,
        priority:-Infinity,
        direct:true,
        charlotte:true,
        content:function() {
            'step 0'
            event.str="";
            event.isEnemy=!player.isFriendsOf(game.me);
            event.diff=game.eloGetDifficulty(false,event.isEnemy);
            if(event.diff<=1) event.finish();
            'step 1'
            var cards=get.eloCards(Math.ceil(trigger.eloNum*event.diff));
            var method=trigger.name=='draw'?function(a,b){
                return get.value(b,player)-get.value(a,player);
            }:function(a,b){
                return trigger.judge(b)-trigger.judge(a);
            };
            event.elfCards=game.orderEloCards(cards,method,event.isEnemy);
            event.elfCards.reverse();
            'step 2'
            for(;event.elfCards.length>0;) {
                var card=event.elfCards.shift();
                ui.cardPile.eloInsertBefore(card,ui.cardPile.firstChild,true);
            }
        },
	};
	lib.skill._eloHandcard={
	    trigger:{
	        player:['gainPlayerCardBegin','discardPlayerCardBegin'],
	    },
		silent:true,
		direct:true,
		charlotte:true,
		filter:function(event,player){
			if(game.eloGetDifficulty(true)==0) return false;
			if(!game.me||player==game.me||player.isUnderControl(true)) return false;
			if(game.eloGetDifficulty()<3) return false;
			if(game.eloGetDifficulty()<4&&[1,0,0].randomGet()!=1) return false;
			var isFriend=player.isFriendsOf(game.me);
			return ((game.eloGetDifficulty(true)==1&&isFriend)||(game.eloGetDifficulty(true)==-1&&!isFriend));
		},
        lastDo:true,
        priority:-Infinity,
        direct:true,
        charlotte:true,
        content:function() {
            'step 0'
            trigger.visible=true;
        },
	};
	game.eloTimeKillerType=function(){
	    var time=2;
	    var offline=sessionStorage.getItem('Network');
        if(!offline) offline='online';
        if(offline!='online') return 0;
	    switch(lib.config["extension_段位制裁_timeKiller"]) {
	        case "none":
	        time=0;break;
	        case "light":
	        time=1;break;
	        case "middle":
	        time=2;break;
	        case "heavy":
	        time=3;break;
	        default:
	        time=0;
        }
	    return time;
	};
	lib.skill._timeKiller={
	    trigger:{
	        player:['chooseToUseBefore','chooseToRespondBefore','chooseToDiscardBefore'],
	    },
	    firstDo:true,
		silent:true,
		direct:true,
		charlotte:true,
		filter:function(event,player){
			if(game.eloTimeKillerType()==0) return false;
			return !lib.skill._timeKiller.isMine(player);
		},
		isMine:function(target){
			var player=target||_status.event?.player;
			return (player&&(player==game.me||player.isUnderControl())/*&&!_status.auto&&!player.isMad()*/&&!game.notMe);
		},
        lastDo:true,
        priority:-Infinity,
        direct:true,
        charlotte:true,
        content:function() {
            'step 0'
            event.ranSet=Math.random();
            var time=game.eloTimeKillerType()*1.5*event.ranSet;
            if(lib.config['extension_祖安设置_enable']&&lib.skill._zuanSTARTsayskill&&lib.skill._zuanSTARTsayskill.filter(trigger,player)) {
                event.time=time;
            }else {
                game.delay(time);
                event.finish();
            }
            'step 1'
            //概率随机模块
            if(event.ranSet<0.75||Math.random()*100>=parseFloat(lib.config['extension_祖安设置_ransay'])) {
                event.goto(6);
            }
            'step 2'
            //加载说话宝典
            //['别急，等我思考一下。','待我稍作思量，更益奇巧','待我稍作思量','容我思考一下','让我再想一想','你别急','等一下','我想一想'];
            //【男性角色扩充】
            event.male=[
                '兵者诡道，待吾筹谋', 
                '深谋远虑，方得始终',
                '静心思索，以静制动',
                '此局不可轻举妄动',
                '韬光养晦，静观其变',
                '稍安勿躁，计将安出',
                '谋定而后动，且待片刻',
                '容某推演一番战局',
                '棋局千变，需慎思之',
                '虎豹之驹，未成文而有食牛之气',
                //史诗级别扩充
                '明修栈道者，暗度亦须谋',  //韩信典故双关
                '上兵伐谋，待某运筹帷幄',  //孙子兵法化用
                '单刀观沧海，静待浪破时',  //关羽意象重构
                '八阵图未现，岂可妄动兵',  //诸葛亮阵法铺垫
                '昔子房运筹，今某亦需三思',//张良历史呼应
                '火攻未济，当待东南风起',  //赤壁之战典故
                '观星七巡，方知杀破狼位',  //观星技能化用
                '昔淮阴忍胯下，今且效之',  //韩信忍辱典故
                '未闻金柝声，不可乱角徵',  //周瑜音律兵法双关
                '黄石公三试，某当一虑三叹',//张良师承典故
                '昔渭水垂竿，今执牌亦钓龙',//姜太公现代转义
                '且容某推演九宫八卦方位',  //阵法术语升级
                '兵法十三篇，正在翻检中',  //幽默型知识具象
                '此非华容道，仍需巧安排',  //关羽曹操典故复用
                '墨守成规者，岂能破鬼谷阵', //墨家与纵横家结合
                //通用语句扩充
                '弈道九品，正在参详入神',
                '墨迹未干处，忽现万甲兵',
                '观鱼知乐时，悟得破阵法',
                '茶过三沸，计上心头',
                '砚中墨旋处，胸中甲兵生',
                '观檐下冰锥，悟穿刺之法',
                '昔庖丁解牛，今某解牌势',
                '嗅得檀香燃尽前，必出杀招',
                '屏风十八叠，叠叠藏玄机',
                '待我焚香沐浴，以通牌灵'
            ];
            
            //【女性角色扩充】
            event.female=[
                '容奴家细细思量呀～',
                '嗯……容妾身再想想啦',
                '此中奥妙，待奴参详',
                '哎呀，好难选呀～',
                '芳心巧思，且待片刻',
                '小女子要好好想想呢',
                '这般抉择，当真磨人',
                '容奴执棋沉吟可好？',
                '锦囊妙计，待我寻来',
                '云鬓微垂，思君此着',
                //史诗级别扩充
                '愁肠百转间，忽有玲珑计～',//情感化思考过程
                '昔年甄宓赋，今作破敌策',  //才女典故活用
                '绣帕藏机锋，且待奴解开',  //女子物件妙用
                '琴心三叠后，方显剑胆来',  //道家术语柔化
                '铜雀春深时，最宜巧设谋',  //杜牧诗境化用
                '素手拨迷雾，青丝绕良筹',  //身体意象策略化
                '昔貂蝉闭月，今奴闭心推演',//美人计现代演绎
                '待取西窗烛，照破局中局',  //李商隐诗境重构
                '红线千千结，终成绝杀阵',  //月老意象战术化
                '对镜贴花黄，亦贴破敌策',  //生活场景策略化
                '莲步生八卦，袖藏五行机',  //身法融合阵法
                '昔文姬辨弦，今奴辨杀机',  //蔡文姬能力延伸
                '画眉深浅处，忽得破阵法',  //闺房情趣策略化
                '团扇半遮面，巧思已过江',  //器物与谋略结合
                '花影移三寸，杀机现七分',  //自然意象战术化
                //通用语句扩充
                '弈道九品，正在参详入神',
                '墨迹未干处，忽现万甲兵',
                '观鱼知乐时，悟得破阵法',
                '茶过三沸，计上心头',
                '砚中墨旋处，胸中甲兵生',
                '观檐下冰锥，悟穿刺之法',
                '昔庖丁解牛，今某解牌势',
                '嗅得檀香燃尽前，必出杀招',
                '屏风十八叠，叠叠藏玄机',
                '待我焚香沐浴，以通牌灵'
            ];
            'step 3'
            //判断角色性别
            if(player.hasSex('female')) {
                if(player.hasSex('male')) {
                    event.sex=['male','female'].randomGet();
                }else {
                    event.sex='female';
                }
            }else {
                event.sex='male';
            }
            'step 4'
            //组装语言模块
            event.said=event[event.sex];
            event.chat=event.said.randomGet();
            'step 5'
            //最后一道关卡，加载失败就不说话了
            if(lib.config['extension_祖安设置_zuantype']=='new_chg') {
                var ransec=(2+[0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,12,13,14,15,15,15,20,40].randomGet())*1000+[0,0,3,5,7].randomGet()*100;
                if(!game.zuanSayCold.contains(player)) game.zuanSayCold.push(player);
                if(ransec>0) setTimeout(function(){
                    if(game.zuanSayCold.contains(player)) game.zuanSayCold.remove(player);
                }, ransec);
                setTimeout(function(){
                    player.say(event.chat);
                },Math.ceil(Math.random()*2000));
            }else {
                player.say(event.chat);
            }
            'step 6'
            game.delay(event.time);
        },
	};
},precontent:function(){
    
},config:{
    "eloPlayers":{
        "name":"排位将池",
        "init":true,
        "intro":"在排位中根据段位限制你匹配的将池，低段位少一些抽象武将的概率",
    },
    "eloDifficulty":{
        "name":"制裁力度",
        "init":"paiwei",
        "intro":"暗箱操作摸牌、判定、拆牌和顺牌，影响你的对局体验，不信邪可以开到最难，保证让你飞起来<li>默认选择“段位”，同步如真似幻的排位效果，此效果单机模式不生效<br><span style='opacity: 0.6'>kk：在无名杀我也能体会到高血压的牌堆制裁了</span>",
        "item":{
            "eeasy":"①仁济",
            "veasy":"②爽局",
            "easy":"③简易",
            "normal":"✘关闭",
            "hard":"⑤困难",
            "vhard":"⑥炼狱",
            "ehard":"⑦逆天",
            "paiwei":"☆段位",
        }
    },
    "timeKiller":{
        "name":"烧条思考",
        "init":"none",
        "intro":"现在，人机也会烧条思考了<li>开启此选项，人机会在做出牌和回应前进行短暂地思考（纯呆），如果思考时间相对较长还有一定的几率触发台词（需配合祖安武将扩展）<br><span style='opacity: 0.6'>心如止水：蚌埠住了</span>",
        "item":{
            "none":"○关闭",
            "light":"●轻度",
            "middle":"●正常",
            "heavy":"●重度",
        }
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
    intro:`<li>本扩展将为你还原最“真实”的排位赛体验！
<li>通过动态调整玩家与AI的摸牌红利、判定天过、拆顺透视等隐藏机制，让牌堆制裁效果如影随形。
<li>系统会根据你的隐藏难度自动调整制裁力度，高段位玩家将享受：垃圾控牌的支配、必中闪电的绝望、关键牌被精准拆除的血压飙升等尊贵待遇。
<li>多档可调制裁力度中，「⑦逆天」模式将触发AI因果律武器，建议搭配速效救心丸使用。`,
    author:"Helasisy",
    diskURL:"",
    forumURL:"",
    version:"1.0",
},files:{"character":[],"card":[],"skill":[]}}})