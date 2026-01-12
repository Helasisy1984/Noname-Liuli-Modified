'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		//strategy and battle, "sb" in short
		name:'sb',
		connect:true,
		character:{
			sb_luxun: ["male", "wu", 3, ["sbqianxun", "sblianying"]],
            sb_caopi: ["male","wei",3,["sbxingshang", "sbfangzhu", "sbsongwei"],["zhu"]],
        	sb_zhanghe:['male','wei',4,['sbqiaobian']],
			sb_yujin:['male','wei',4,['sbxiayuan','sbjieyue']],
			sb_huaxiong:['male','qun','3/4/1',['new_reyaowu','sbyangwei']],
			liucheng:['female','qun',3,['splveying','spyingwu']],
			sp_yangwan:['female','qun',3,['spmingxuan','spxianchou']],
			sb_huangzhong:['male','shu',4,['sbliegong']],
			sb_lvmeng:['male','wu',4,['sbkeji','sbdujiang']],
			sb_sunshangxiang:['female','shu',4,['sbjieyin','sbliangzhu','sbxiaoji'],['border:wu']],
			sb_sunquan:['male','wu',4,['sbzhiheng','sbtongye','sbjiuyuan'],['zhu']],
			sb_huanggai:['male','wu',4,['sbkurou','sbzhaxiang']],
			sb_zhouyu:['male','wu',3,['sbyingzi','sbfanjian']],
			sb_caoren:['male','wei','4/4/1',['sbjushou','sbjiewei']],
			sb_xiahoushi:['female','shu',3,['sbqiaoshi','sbyanyu']],
			sb_zhangjiao:['male','qun',3,['sbleiji','sbguidao','sbhuangtian'],['zhu']],
			sb_caocao:['male','wei',4,['sbjianxiong','sbqingzheng','sbhujia'],['zhu']],
			sb_zhenji:['female','wei',3,['sbluoshen','qingguo']],
			sb_ganning:['male','wu',4,['sbqixi','sbfenwei']],
			sb_machao:['male','shu',4,['mashu','sbtieji']],
			sb_xuhuang:['male','wei',4,['sbduanliang','sbshipo']],
			sb_zhangfei:['male','shu',4,['sbpaoxiao','sbxieji']],
			sb_zhaoyun:['male','shu',4,['sblongdan','sbjizhu']],
			sb_liubei:['male','shu',4,['sbrende','sbzhangwu','sbjijiang'],['zhu']],
			sb_jiangwei:['male','shu','4/4/1',['sbtiaoxin','sbzhiji']],
			sb_fazheng:['male','shu',3,['sbxuanhuo','sbenyuan']],
			sb_chengong:['male','qun',3,['sbmingce','sbzhichi']],
			sb_diaochan:['female','qun',3,['sblijian','sbbiyue']],
			sb_yuanshao:['male','qun',4,['sbluanji','sbxueyi'],['zhu']],
			sb_pangtong:['male','shu',3,['sblianhuan','sbniepan']],
			sb_sunce:['male','wu',4,['sbjiang','sbhunzi','sbzhiba'],['zhu']],
			sb_daqiao:['female','wu',3,['sbguose','sbliuli']],
			sb_liubiao:['male','qun',3,['sbzishou','sbzongshi']],
			sb_zhurong:['female','shu',4,['sblieren','sbjuxiang']],
			sb_menghuo:['male','shu',4,['sbhuoshou','sbzaiqi']],
		    sb_xiaoqiao:['female','wu',3,['sbtianxiang','xinhongyan']],
            sb_zhugeliang:['male','shu',3,['sbguanxing','sbkongcheng']],
	    	sb_sp_zhugeliang:['male','shu',3,['sbhuoji','sbkanpo']],
		    sb_luzhi:['male','qun',3,['nzry_mingren','sbzhenliang']],
			sb_guanyu:['male','shu',4,['sbwusheng','sbyijue']],
			sb_huangyueying:['female','shu',3,['sbjizhi','sbqicai']],
			sb_handang: ["male", "wu", 4, ["sbgongqi", "sbjiefan"]],
        	sb_gongsunzan: ["male", "qun", 4, ["sbyicong", "sbqiaomeng"], []],
        	sb_gaoshun: ["male", "qun", 4, ["sbxianzhen", "sbjinjiu"]],
        	sb_xiahoudun: ["male", "wei", 4, ["sbganglie", "sbqingjian"], []],
        	sb_jiaxu: ["male", "qun", 3, ["sbwansha", "sbweimu", "sbluanwu"]],
		},
		characterTitle:{
    		sb_sunquan: '#y江东大帝',
    		sb_zhouyu: '#y江淮之杰',
    		sb_zhangjiao: '#y驱雷掣电',
    		sb_caocao: '#y魏武大帝',
    		sb_zhenji: '#y薄幸幽兰',
    		sb_liubei: '#y雄才盖世',
    		sb_daqiao: '#y国色芳华',
    		sb_liubiao: '#y荆襄霸主',
    		sb_sp_zhugeliang: '#y忠武侯',
    		sb_zhugeliang: '#y忠武侯',
    		sb_xuhuang: '#y径行载辎',
    		sb_machao: '#y阻戎负勇',
    		sb_fazheng: '#y经学思谋',
    		sb_chengong: '#y刚直壮烈',
    		sb_diaochan: '#y离间计',
    		sb_pangtong: '#y铁索连舟',
    		sb_zhanghe: '#y料敌机先',
    		sb_caopi: '#y魏文帝',
    		sb_handang: '#y石城侯',
    		sb_jiaxu: '#y计深似海',
    		liucheng: '#y泣梧的湘女',
    		sp_yangwan: '#y迷计惑心',
    		sb_xiahoushi: '#y燕语呢喃',
    		sb_zhangfei: '#y义付桃园',
    		sb_zhaoyun: '#y七进七出',
    		sb_sunce: '#y江东的小霸王',
    		sb_zhurong: '#y野性的女王',
    		sb_xiaoqiao: '#y矫情之花',
    		sb_xiahoudun: '#y独眼的罗刹',
    		sb_yujin: '#y威严毅重',
    		sb_lvmeng: '#y苍江一笠',
    		sb_huangzhong: '#y没金铩羽',
    		sb_huanggai: '#y轻身为国',
    		sb_zhouyu: '#y江淮之杰',
    		sb_caoren: '#y固若金汤',
    		sb_ganning: '#y兴王定霸',
    		sb_luzhi: '#y国之桢干',
    		sb_huangyueying: '#y足智多谋',
    		sb_luxun: '#y儒生雄才',
    		sb_huaxiong: '#y跋扈雄狮',
    		sb_sunshangxiang: '#y骄豪明俏',
    		sb_jiangwei: '#y见危授命',
    		sb_yuanshao: '#y高贵的名门',
    		sb_menghuo: '#y南蛮王',
    		sb_guanyu: '#y关圣帝君',
    		sb_gaoshun: '#y攻无不克',
    		sb_gongsunzan: '#y劲镇幽土',
		},
		characterSort:{
			sb:{
				sb_zhi:['sb_sunquan','sb_zhouyu','sb_zhangjiao','sb_caocao','sb_zhenji','sb_liubei','sb_daqiao','sb_liubiao','sb_sp_zhugeliang','sb_zhugeliang'],
				sb_shi:['sb_xuhuang','sb_machao','sb_fazheng','sb_chengong','sb_diaochan','sb_pangtong','sb_zhanghe','sb_caopi','sb_handang','sb_jiaxu'],
				sb_tong:['liucheng','sp_yangwan','sb_xiahoushi','sb_zhangfei','sb_zhaoyun','sb_sunce','sb_zhurong','sb_xiaoqiao','sb_xiahoudun'],
				sb_yu:['sb_yujin','sb_lvmeng','sb_huangzhong','sb_huanggai','sb_zhouyu','sb_caoren','sb_ganning','sb_luzhi','sb_huangyueying','sb_luxun'],
				sb_neng:['sb_huaxiong','sb_sunshangxiang','sb_jiangwei','sb_yuanshao','sb_menghuo','sb_guanyu','sb_gaoshun','sb_gongsunzan'],
			}
		},
		skill:{
		    //贾诩
        	sbwansha: {
        		audio: 2,
        		trigger: {
        			global: "dying",
        		},
        		filter: function(event, player) {
        			const position = player.storage.sbwansha ? "hej" : "h";
        			return event.player.countCards(position);
        		},
        		check: function(event, player) {
        			return get.attitude(player, event.player) <= 0;
        		},
        		logTarget: "player",
        		content: function() {
        			'step 0'
        			event.position = player.storage.sbwansha ? "hej" : "h";
        			player.choosePlayerCard(trigger.player, event.position, [0, 2], true).set("visible", true);
        			'step 1'
        			if (result.cards&&result.cards.length) {
        				event.resultCards=result.cards;
        				if (trigger.player.getCards(event.position).some(card => !event.resultCards.includes(card)))
        					trigger.player.chooseControl()
        						.set("choiceList", [`${get.translation(player)}将${get.translation(event.resultCards)}分配给其他角色`, `弃置不为${get.translation(cards)}的牌`])
        						.set("ai", () => {
        							//if(event.resultCards.length <= trigger.player.countCards(event.position) || get.attitude(trigger.player, player) > 0) {
        							if(event.resultCards.length < trigger.player.countCards(event.position)*0.5 || get.attitude(trigger.player, player) > 0) {
        							    return 0;
        							}else {
        							    return 1;
        							}
        						});
        				else result = { index: 0 };
        			} else {
        				trigger.player.discard(trigger.player.getCards(event.position));
        				event.finish();
        			}
        			'step 2'
        			if (result.index != 0) {
        			    trigger.player.discard(trigger.player.getCards(event.position).removeArray(event.resultCards));
        			    event.finish();
        			}else {
        			    event.count=1;
        			}
        			'step 3'
        			event.cards=event.resultCards;
        			if(_status.connectMode) game.broadcastAll(function(){_status.noclearcountdown=true});
        			event.given_map={};
        			event.count--;
        			'step 4'
        			if(event.cards.length>1){
        				player.chooseCardButton('完杀：请选择要分配的牌',true,event.cards,[1,event.cards.length]).set('ai',function(button){
        					if(ui.selected.buttons.length==0) return 1;
        					return 0;
        				});
        			}
        			else if(event.cards.length==1){
        				event._result={links:event.cards.slice(0),bool:true};
        			}
        			else{
        				event.finish();
        			}
        			'step 5'
        			if(result.bool){
        				event.cards.removeArray(result.links);
        				event.togive=result.links.slice(0);
        				player.chooseTarget('选择一名角色获得'+get.translation(result.links),true).set('ai',function(target){
        					var att=get.attitude(_status.event.player,target);
        					if(_status.event.enemy){
        						return -att;
        					}
        					else if(att>0){
        						return att/(1+target.countCards('h'));
        					}
        					else{
        						return att/100;
        					}
        				}).set('enemy',get.value(event.togive[0],player,'raw')<0);
        			}
        			'step 6'
        			if(result.targets.length){
        				var id=result.targets[0].playerid,map=event.given_map;
        				if(!map[id]) map[id]=[];
        				map[id].addArray(event.togive);
        			}
        			if(event.cards.length>0) event.goto(4);
        			'step 7'
        			if(_status.connectMode){
        				game.broadcastAll(function(){delete _status.noclearcountdown;game.stopCountChoose()});
        			}
        			var list=[];
        			for(var i in event.given_map){
        				var source=(_status.connectMode?lib.playerOL:game.playerMap)[i];
        				player.line(source,'green');
        				list.push([source,event.given_map[i]]);
        			}
        			game.loseAsync({
        				gain_list:list,
        				giver:player,
        				animate:'draw',
        			}).setContent('gaincardMultiple');
        			'step 8'
        			if(event.count>0&&player.hasSkill(event.name)){
        				player.chooseBool(get.prompt2(event.name)).set('frequentSkill',event.name);
        			}
        			else event.finish();
        			'step 9'
        			if(result.bool){
        				player.logSkill(event.name);
        				event.goto(3);
        			}
        		},
        		global: "sbwansha_global",
        		subSkill: {
        			global: {
        				mod: {
        					cardEnabled(card, player) {
        						var source = _status.currentPhase;
        						if (card.name == "tao" && source && source != player && source.hasSkill("sbwansha") && !player.isDying()) return false;
        					},
        					cardSavable(card, player) {
        						var source = _status.currentPhase;
        						if (card.name == "tao" && source && source != player && source.hasSkill("sbwansha") && !player.isDying()) return false;
        					},
        				},
        			},
        		},
        	},
        	sbluanwu: {
        		audio: 4,
        		/*inherit: "luanwu",*/
        		contentBefore() {
        			player.addTempSkill("sbluanwu_add");
        		},
				unique:true,
				enable:'phaseUse',
				limited:true,
				skillAnimation:'epic',
				animationColor:'thunder',
				filterTarget:function(card,player,target){
					return target!=player;
				},
				selectTarget:-1,
				multitarget:true,
				multiline:true,
				content:function(){
					"step 0"
					player.awakenSkill('sbluanwu');
					event.current=player.next;
					event.currented=[];
					event.me=player;
					"step 1"
					event.currented.push(event.current);
					event.current.animate('target');
					event.current.chooseToUse('乱武：使用一张杀或失去一点体力',function(card){
						if(get.name(card)!='sha') return false;
						return lib.filter.cardEnabled.apply(this,arguments)
					},function(card,player,target){
						if(player==target) return false;
						//Fix不能指定自己为目标
						if(event.me==target) return false;
						var dist=get.distance(player,target);
						if(dist>1){
							if(game.hasPlayer(function(current){
								return current!=player&&get.distance(player,current)<dist;
							})){
								return false;
							}
						}
						return lib.filter.filterTarget.apply(this,arguments);
					}).set('ai2',function(){
						return get.effect_use.apply(this,arguments)+0.01;
					}).set('addCount',false);
					"step 2"
					if(result.bool==false) event.current.loseHp();
					event.current=event.current.next;
					if(event.current!=player&&!event.currented.contains(event.current)){
						game.delay(0.5);
						event.goto(1);
					}
				},
				ai:{
					order:1,
					result:{
						player:function(player){
							if(lib.config.mode=='identity'&&game.zhu.isZhu&&player.identity=='fan'){
								if(game.zhu.hp==1&&game.zhu.countCards('h')<=2) return 1;
							}
							var num=0;
							var players=game.filterPlayer();
							for(var i=0;i<players.length;i++){
								var att=get.attitude(player,players[i]);
								if(att>0) att=1;
								if(att<0) att=-1;
								if(players[i]!=player&&players[i].hp<=3){
									if(players[i].countCards('h')==0) num+=att/players[i].hp;
									else if(players[i].countCards('h')==1) num+=att/2/players[i].hp;
									else if(players[i].countCards('h')==2) num+=att/4/players[i].hp;
								}
								if(players[i].hp==1) num+=att*1.5;
							}
							if(player.hp==1){
								return -num;
							}
							if(player.hp==2){
								return -game.players.length/4-num;
							}
							return -game.players.length/3-num;
						}
					}
				},
        		subSkill: {
        			add: {
        				trigger: {
        					global: "loseHpEnd",
        				},
        				filter: function(event, player) {
        					if (event.getParent().name != "sbluanwu") return false;
        					return ["sbwansha", "sbweimu"].some(skill => player.hasSkill(skill, null, null, false) && !player.storage[skill]);
        				},
        				direct:true,
        				content: function() {
        					'step 0'
        					var choices = [],
        						list = ["sbwansha", "sbweimu"];
        					const choiceList = ["修改【完杀】", "修改【帷幕】"];
        					for (let i = 0; i < 2; i++) {
        						if (!player.hasSkill(list[i], null, null, false) || player.storage[list[i]]) {
        							choiceList[i] = '<span style="opacity:0.5;">' + choiceList[i] + "</span>";
        						} else choices.push(`选项${get.cnNumber(i + 1, true)}`);
        					}
        					player.chooseControl(choices, "cancel2")
        						.set("choiceList", choiceList)
        						.set("prompt", get.prompt("sbluanwu"/*event.name.slice(0, -5)*/))
        						.set("ai", () => {
        							const choices = _status.event.controls.slice().remove("cancel2");
        							return choices.randomGet();
        						});
        					'step 1'
        					if(result.control=='cancel2') {
        					    event.finish();
        					}else {
        					    player.logSkill(event.name);
        					}
        					'step 2'
        					var list = ["sbwansha", "sbweimu"],
        						index = ["选项一", "选项二"].indexOf(result.control);
        					player.storage[list[index]] = true;
        				},
        			},
        		},
        		derivation: ["sbwansha_rewrite", "sbweimu_rewrite"],
        	},
        	sbweimu: {
        		audio: 4,
        		trigger: {
        			player: "addJudgeBefore",
        			target: "useCardToTarget",
        			global: "roundStart",
        		},
        		filter: function(event, player) {
        			if (event.name == "useCardToTarget") return get.type(event.card, null, false) == "trick" && get.color(event.card) == "black";
        			if (event.name == "addJudge") return get.color(event.card) == "black";
        			if (!player.storage.sbweimu || game.roundNumber < 2) return false;
        			let num = 0;
        			game.countPlayer2(current => {
        				if (player == current) return false;
        				num += current.getRoundHistory("useCard", evt => evt.targets?.includes(player), 1).length;
        			});
        			return num <= 2 && Array.from(ui.discardPile.childNodes).some(card => get.info("sbweimu").filterCardx(card));
        		},
        		filterCardx(card) {
        			return get.subtype(card) == "equip2" || (get.type(card) == "trick" && get.color(card) == "black");
        		},
        		forced: true,
        		content: function() {
        			if (trigger.name == "useCardToTarget") {
        				trigger.targets.remove(player);
        				trigger.getParent().triggeredTargets2.remove(player);
        				trigger.untrigger();
        			} else if (trigger.name == "addJudge") {
        				trigger.cancel();
        				const owner = get.owner(trigger.card);
        				if (owner?.getCards("hej").includes(trigger.card)) owner.lose(trigger.card, ui.discardPile);
        				else game.cardsDiscard(trigger.card);
        				game.log(trigger.card, "进入了弃牌堆");
        			} else {
        				const cards = Array.from(ui.discardPile.childNodes).filter(card => get.info("sbweimu").filterCardx(card));
        				player.gain(cards.randomGet(), "gain2");
        			}
        		},
        		ai: {
        			effect: {
        				target: function (card, player, target, current) {
        					if (get.type(card, "trick") == "trick" && get.color(card) == "black") return "zeroplayertarget";
        				},
        			},
        		},
        	},
		    //公孙瓒
        	sbyicong: {
        		audio: 2,
        		trigger: {
        			player: "enterGame",
        			global: ["phaseBefore","roundStart"],
        		},
        		filter: function(event, player, name) {
        			if(!(event.name != "phase" || game.phaseNumber == 0 || name == "roundStart")) return false;
        			return player.hasMark("charge");
        		},
        		chargeSkill: true,
        		group: "sbyicong_init",
        		direct: true,
        		content: function() {
        			'step 0'
        			event.len = player.countMark("charge");
        			event.numbers = Array.from({ length: event.len }, (_, i) => get.cnNumber(i + 1, true));
        			if (_status.connectMode) {
        				game.broadcastAll(() => {
        					_status.noclearcountdown = true;
        				});
        			}
        			'step 1'
        			player.chooseControl(event.numbers, "cancel2")
        				.set("prompt", get.prompt("sbyicong"))
        				.set("prompt2", "你可以消耗任意点蓄力值并选择一项：⒈你于本轮内至其他角色的距离-1，令系统选择牌堆中的X张【杀】；⒉其他角色于本轮内至你的距离+1，令系统选择牌堆中的X张【闪】（X为你消耗的蓄力值）。然后若你的“扈”数小于4，你将系统选择的牌置于武将牌上，称为“扈”。")
        				.set("ai", () => {
    						if (
    							!game.hasPlayer(current => {
    								return (
    									get.distance(player, current) >= 2 &&
    									player.countCards("hs", card => {
    										const list = ["shunshou", "bingliang", "zhujinqiyuan"];
    										if (!player.inRange(current)) list.add("sha");
    										return list.includes(get.name(card)) && get.effect(current, card, player, player) > 0;
    									}) > 0
    								);
    							})
    						)
    							return 0;
    						return Math.ceil(event.len / 2) - 1;
        				});
        			'step 2'
        				if (result.control === "cancel2") return;
        				event.result1 = result.control;
        				//const num = result.index + 1;
        				var num = get.intNumber(result.control);
        				player.chooseControl(["选项一", "选项二", "返回"])
        					.set("prompt", "义从：请选择一项")
        					.set("choiceList", [
        						`你于本轮内至其他角色的距离-1${
        							player.countCards("s", card => {
        								return card.hasGaintag("sbyicong");
        							}) >= 4
        								? ""
        								: `，将牌堆中的${get.cnNumber(
        										Math.min(
        											num,
        											4 -
        												player.countCards("s", card => {
        													return card.hasGaintag("sbyicong");
        												})
        										)
        								  )}张【杀】置于你的武将牌上，称为“扈”`
        						}`,
        						`其他角色于本轮内至你的距离+1${
        							player.countCards("s", card => {
        								return card.hasGaintag("sbyicong");
        							}) >= 4
        								? ""
        								: `，将牌堆中的${get.cnNumber(
        										Math.min(
        											num,
        											4 -
        												player.countCards("s", card => {
        													return card.hasGaintag("sbyicong");
        												})
        										)
        								  )}张【闪】置于你的武将牌上，称为“扈”`
        						}`,
        					])
        					.set("ai", () => {
        						const player = get.player();
        						if (player.getHp() > 2 || player.countCards("hsx", ["shan", "caochuan"]) >= 3) return 0;
        						return 1;
        					});
        			'step 3'
        			if (result.control !== "返回") {
        			    event.result2 = result.control;
        			}else {
        			    event.goto(1);
        			}
        			'step 4'
        			if (_status.connectMode) {
        				game.broadcastAll(() => {
        					delete _status.noclearcountdown;
        					game.stopCountChoose();
        				});
        			}
        			event.result = {
        				bool: true,
        				cost_data: {
        					num: get.intNumber(event.result1),
        					choice: get.choiceIndex(event.result2)-1,
        				},
        			};
        			'step 5'
        			player.logSkill(event.name);
        			var { num, choice } = event.result.cost_data;
        			const skill = choice === 0 ? "sbyicong_to" : "sbyicong_from";
        			player.removeMark("charge", num);
        			player.addTempSkill(skill, "roundStart");
        			player.addMark(skill, 1, false);
        			let cards = [];
        			while (cards.length < num && cards.length + player.countCards("s", card => card.hasGaintag("sbyicong")) < 4) {
        				const name = choice === 0 ? "sha" : "shan";
        				const card = get.cardPile2(card => card.name == name && !cards.includes(card));
        				if (card) cards.push(card);
        				else break;
        			}
        			if (cards.length) {
        				player.$gain2(cards, false);
        				game.log(player, "将", cards, "置于了武将牌上");
        				player.loseToSpecial(cards, "sbyicong");
        				player.markSkill("sbyicong");
        			}
        		},
        		marktext: "扈",
        		intro: {
        			name: "扈(义从)",
        			mark(dialog, storage, player) {
        				const cards = player.getCards("s", card => {
        					return card.hasGaintag("sbyicong");
        				});
        				if (cards.length) dialog.addAuto(cards);
        				else dialog.addText("暂无卡牌");
        			},
        			markcount(storage, player) {
        				return player.countCards("s", card => {
        					return card.hasGaintag("sbyicong");
        				});
        			},
        			onunmark(storage, player) {
        				const cards = player.getCards("s", card => {
        					return card.hasGaintag("sbyicong");
        				});
        				if (cards.length) {
        					player.loseToDiscardpile(cards);
        				}
        			},
        		},
        		subSkill: {
        			init: {
        				audio: "sbyicong",
        				trigger: {
        					player: "enterGame",
        					global: "phaseBefore",
        				},
        				filter: function(event, player) {
        					return event.name != "phase" || game.phaseNumber == 0;
        				},
        				priority: 5,
        				forced: true,
        				locked: false,
        				content: function() {
        					player.addMark("charge", 2);
        				},
        			},
        			to: {
        				charlotte: true,
        				mod: {
        					globalFrom(from, to, distance) {
        						return distance - from.countMark("sbyicong_to");
        					},
        				},
        				onremove: true,
        				marktext: "从",
        				intro: {
        					content: "本轮你至其他角色的距离-#",
        				},
        			},
        			from: {
        				charlotte: true,
        				mod: {
        					globalTo(from, to, distance) {
        						return distance + to.countMark("sbyicong_from");
        					},
        				},
        				onremove: true,
        				marktext: "从",
        				intro: {
        					content: "本轮其他角色至你的距离+#",
        				},
        			},
        		},
        		ai: {
        			combo: "sbqiaomeng"
        		},
        	},
        	sbqiaomeng: {
        		audio: 2,
        		trigger: {
        			source: "damageSource",
        		},
        		filter: function(event, player) {
        			if (!event.card || event.card.name !== "sha") return false;
        			return player.hasSkill("sbyicong", null, false, false);
        		},
        		direct: true,
        		content: function() {
        			'step 0'
        			const list = ["蓄力", "cancel2"];
        			const choiceList = [`弃置${get.translation(trigger.player)}区域里的一张牌，你摸一张牌`, `获得3点蓄力值`];
        			if (trigger.player.isIn() && trigger.player.countDiscardableCards(player, "hej")) {
        				list.unshift("弃牌");
        			} else {
        				choiceList[0] = `<span style="opacity:0.5">${choiceList[0]}</span>`;
        			}
        			player.chooseControl(list)
        				.set("prompt", get.prompt("sbqiaomeng"))
        				.set("choiceList", choiceList)
        				.set("ai", () => {
    						if (!list.includes("弃牌")) return "蓄力";
    						const eff = get.effect(trigger.player, { name: "guohe" }, player, player);
    						if (player.countMark("charge") >= 2 && eff >= 0) return "弃牌";
    						return "蓄力";
    					});
        			'step 1'
        			if (result.control == "cancel2") {
        				event.finish();
        			}
        			'step 2'
        			player.logSkill(event.name);
        			if (result.control === "弃牌") {
        				player.line(trigger.player);
        				player.discardPlayerCard(trigger.player, "hej", true);
        				player.draw();
        			} else {
        				const num = Math.min(3, 4 - player.countMark("charge"));
        				if (num > 0) player.addMark("charge", num);
        			}
        		},
        		ai: {
        			combo: "sbyicong"
        		},
        	},
		    //韩当
        	sbgongqi: {
        		audio: 2,
        		trigger: {
        			player: "phaseUseBegin",
        		},
        		locked: false,
        		direct: true,
        		content: function() {
        			'step 0'
        			player.chooseToDiscard(get.prompt("sbgongqi"), "你可以弃置一张牌，令你本阶段使用牌时，其他角色不能使用或打出与你弃置的牌颜色不同的手牌进行响应。", "he")
        				.set("ai", card => {
        					var colorss=(() => {
        						if (!player.countCards("hs", card => player.hasValueTarget(card))) return [];
        						const colors = Object.keys(lib.color);
        						const infos = colors.map(color => {
        							return [
        								color,
        								game.filterPlayer().map(current => {
        									const att = get.attitude(player, current);
        									return current
        										.getCards("hes", card => {
        											if (get.color(card) !== color) return false;
        											if (current.hasUseTarget(card, false, false)) return false;
        											if (!lib.filter.cardEnabled(card, current, "forceEnable")) return false;
        											return true;
        										})
        										.map(card => {
        											return get.value(card) * (att > 0 ? -0.2 : 1);
        										})
        										.reduce((p, c) => p + c, 0);
        								}),
        							];
        						});
        						infos.sort((a, b) => {
        							return a[1] - b[1];
        						});
        						return infos.map(info => info[0]);
        					})();
        					const ind = colorss.indexOf(get.color(card)) + 1;
        					if (ind <= 0) return 0;
        					return 1.5 + 2 * ind - get.value(card);
        				});
        			'step 1'
        			if(!result.bool) event.finish();
        			'step 2'
        			player.logSkill(event.name);
        			player.discard(result.cards);
        			game.delayx();
        			'step 3'
        			player.addTempSkill("sbgongqi_effect", {player:"phaseUseAfter"});//"phaseChange"
        			player.markAuto("sbgongqi_effect", [get.color(result.cards[0], player)]);
        			player.line(game.filterPlayer());
        			game.delayx();
        		},
        		updateBlocker(player) {
        			const list = [],
        				storage = player.storage.sbgongqi_block;
        			if (storage && storage.length) {
        				list.addArray(...storage.map(i => i[1]));
        			}
        			player.storage.sbgongqi_blocker = list;
        		},
        		mod: {
        			attackRange(player, num) {
        				return num + 4;
        			},
        		},
        		containsSome: function(card, cards) {
        		    var includes = false;
        		    card.forEach(cc=>{
        		        if(cards.contains(cc)) includes = true;
        		    });
        		    return includes;
        		},
        		subSkill: {
        			effect: {
        				trigger: {
        					player: "useCard",
        				},
        				onremove: true,
        				charlotte: true,
        				forced: true,
        				content: function() {
        					game.countPlayer(current => {
        						if (current === player) return;
        						current.addTempSkill("sbgongqi_block", "phaseChange");
        						if (!current.storage.sbgongqi_block) current.storage.sbgongqi_block = [];
        						current.storage.sbgongqi_block.push([trigger.card, player.getStorage("sbgongqi_effect")]);
        						lib.skill.sbgongqi.updateBlocker(current);
        					});
        				},
        				intro: {
        					content: "所有其他角色不能使用或打出不为$的手牌响应你使用的牌",
        				},
        			},
        			block: {
        				trigger: {
        					player: ["damageBefore", "damageCancelled", "damageZero"],
        					target: ["shaMiss", "useCardToExcluded", "useCardToEnd"],
        					global: ["useCardEnd"],
        				},
        				forced: true,
        				firstDo: true,
        				popup: false,
        				charlotte: true,
        				onremove: ["sbgongqi_block", "sbgongqi_blocker"],
        				filter: function(event, player) {
        					if (!event.card || !player.storage.sbgongqi_block) return false;
        					return player.getStorage("sbgongqi_block").some(info => {
        						return info[0] === event.card;
        					});
        				},
        				content: function() {
        					const storage = player.storage.sbgongqi_block;
        					for (let i = 0; i < storage.length; i++) {
        						if (storage[i][0] === trigger.card) {
        							storage.splice(i--, 1);
        						}
        					}
        					if (!storage.length) player.removeSkill("sbgongqi_block");
        					else lib.skill.sbgongqi.updateBlocker(trigger.target);
        				},
        				mod: {
        					cardEnabled(card, player) {
        						if (!player.storage.sbgongqi_blocker) return;
        						const color = get.color(card);
        						if (color == "none") return;
        						const hs = player.getCards("h"),
        							cards = [card];
        						if (Array.isArray(card.cards)) cards.addArray(card.cards);
        						if (/*cards.containsSome(...hs)*/lib.skill.sbgongqi.containsSome(cards, hs) && !player.storage.sbgongqi_blocker.includes(color)) return false;
        					},
        					cardRespondable(card, player) {
        						if (!player.storage.sbgongqi_blocker) return;
        						const color = get.color(card);
        						if (color == "none") return;
        						const hs = player.getCards("h"),
        							cards = [card];
        						if (Array.isArray(card.cards)) cards.addArray(card.cards);
        						const evt = _status.event;
        						if (evt.name == "chooseToRespond" && /*cards.containsSome(...hs)*/lib.skill.sbgongqi.containsSome(cards, hs) && !player.storage.sbgongqi_blocker.includes(color)) return false;
        					},
        				},
        			},
        		},
        	},
        	sbjiefan: {
        		audio: 2,
        		enable: "phaseUse",
        		usable: 1,
        		filterTarget: true,
        		content: function() {
        			'step 0'
        			event.targets = game.filterPlayer(current => {
        				return current.inRange(target);
        			});
        			event.count = event.targets.length+2;
        			if (event.count<=2) {
        				target.chat("没人打得到我喔！");
        				return;
        			}
        			'step 1'
        			const controls = ["选项一", "选项二", "背水！"];
        			target.chooseControl(controls)
        				.set("choiceList", [`令所有攻击范围内含有你的角色依次弃置两张牌（${get.translation(targets)}）`, `你摸等同于攻击范围内含有你的角色数+2的牌（${get.cnNumber(event.count)}张牌）`, `背水！令${get.translation(player)}的〖解烦〗失效直到其杀死一名角色，然后你依次执行上述所有选项`])
        				.set("ai", () => {
    						const eff1 = event.targets
    							.map(current => {
    								let position = "h";
    								if (!current.countCards("h")) position += "e";
    								return get.effect(current, { name: "guohe", position }, target, target);
    							})
    							.reduce((p, c) => p + c, 0);
    						const eff2 = (get.effect(target, { name: "wuzhong" }, target) * event.count) / 2;
    						if (
    							game.hasPlayer(current => {
    								const att1 = get.attitude(player, current),
    									att2 = get.attitude(target, current);
    								if (att1 < 0 && att2 < 0) {
    									return current.getHp() <= 1;
    								}
    								return false;
    							}) &&
    							eff1 > 15 &&
    							eff2 > 0
    						)
    							return "背水！";
    						if (eff1 > 3 * eff2) return "选项一";
    						return "选项二";
    					});
        			'step 2'
        			game.log(target, "选择了", "#g" + result.control);
        			if (result.control === "背水！") {
        				player.tempBanSkill("sbjiefan", { source: "die" });
        			}
        			if (result.control !== "选项二") {
        				for (const current of event.targets) {
        					target.line(current, "thunder");
        					current.chooseToDiscard("解烦：请弃置一张牌", "he", true);
        					current.chooseToDiscard("解烦：请弃置一张牌", "he", true);
        				}
        			}
        			if (result.control !== "选项一") {
        				target.draw(event.count);
        			}
        		},
        		ai: {
        			order: 8,
        			result: {
        				target(player, target) {
        					const targets = game.filterPlayer(current => {
        						return current.inRange(target);
        					});
        					return Math.min(2, targets.length) / 2;
        				},
        			}
        		}
        	},
        	//高顺
        	sbxianzhen: {
        		audio: 2,
        		enable: "phaseUse",
        		usable: 1,
        		filterTarget: function(card, player, target) {
        			if (get.mode() === "identity" && target.getHp() >= player.getHp()) return false;
        			return target !== player;
        		},
        		content: function() {
        			'step 0'
        			player.addTempSkill("sbxianzhen_attack", {player: "phaseUseAfter"});
        			'step 1'
        			player.markAuto("sbxianzhen_attack", target);
        		},
        		ai: {
        			expose: 0.2,
        			order(item, player) {
        				return get.order({ name: "sha" }) + 1;
        			},
        			result: {
        				target(player, target) {
        					if (
        						!player.countCards("hs", card => {
        							return get.name(card) === "sha" && player.canUse(card, target, false);
        						})
        					)
        						return -0.1;
        					if (target.countCards("h") === 1 && player.canCompare(target)) return -2;
        					return -1.5;
        				},
        			},
        		},
        		subSkill: {
        			attack: {
        				audio: "sbxianzhen",
        				trigger: { player: "useCardToPlayered" },
        				filter: function(event, player) {
        					if (event.card.name !== "sha") return false;
        					return player.getStorage("sbxianzhen_attack").includes(event.target) && event.target.isIn() && player.canCompare(event.target);
        				},
        				charlotte: true,
        				onremove: true,
        				logTarget: "target",
        				check(event, player) {
        					return get.attitude(player, event.target) < 0;
        				},
        				prompt(event, player) {
        					return `陷阵：是否与${get.translation(event.target)}拼点？`;
        				},
        				prompt2(event, player) {
        					const target = event.target,
        						card = event.card;
        					return `若你赢，${get.translation(card)}无视防具且不计入次数，且若你本回合未以此法造成过伤害，你对其造成1点伤害；<br>若其拼点牌为【杀】，则你获得之；<br>若其拼点牌为其最后的手牌，则${get.translation(card)}对其造成伤害时，此伤害+1。`;
        				},
        				group: "sbxianzhen_record",
        				content: function() {
        					'step 0'
        					var target = trigger.target,
        						card = trigger.card;
        					player.chooseToCompare(target);
        					'step 1'
        					var target = trigger.target,
        						card = trigger.card;
        					event.lose_list=[
        					    [target,result.target],
        					    [player,result.player]
        					];
        					if (result.bool) {
        						target.addTempSkill("qinggang2");
        						target.storage.qinggang2.add(card);
        						if (trigger.addCount !== false) {
        							trigger.addCount = false;
        							const stat = player.getStat("card");
        							if (stat[card.name] && stat[card.name] > 0) stat[card.name]--;
        						}
        						game.log(card, "无视防具且不计入次数限制");
        						if (!player.storage.sbxianzhen_damaged) {
        							player.storage.sbxianzhen_damaged = (player.storage.sbxianzhen_damaged || 0) + 1;
        							/*player.when("phaseAfter").then(() => {
        								delete player.storage.sbxianzhen_damaged;
        							});*/
        							player.addWhen({
        							    content: function() {
        							        delete player.storage.sbxianzhen_damaged;
        							    },
        							});
        						}
        						if (player.storage.sbxianzhen_damaged <= 2) {
        							target.damage();
        							game.delayx();
        						}
        					}
        					'step 2'
        					var target = trigger.target,
        						card = trigger.card;
        					const toGain = [];
        					for (const lose_list of event.lose_list) {
        						let [comparer, cards] = lose_list;
        						if (!Array.isArray(cards)) cards = [cards];
        						if (comparer === player) continue;
        						for (const card of cards) {
        							if (get.name(card, comparer) == "sha" && get.position(card, true) == "d") {
        								toGain.push(card);
        							}
        						}
        					}
        					if (toGain.length) player.gain(toGain, "gain2");
        					if (player.getStorage("sbxianzhen_recorded").includes(target)) {
        						const id = target.playerid;
        						const map = trigger.getParent().customArgs;
        						if (!map[id]) map[id] = {};
        						if (typeof map[id].extraDamage != "number") {
        							map[id].extraDamage = 0;
        						}
        						map[id].extraDamage++;
        						game.log(card, "对", target, "造成的伤害+1");
        					}
        				},
        				intro: {
        					content: "本阶段对$使用牌无距离限制，且使用杀指定其为目标后可以与其拼点",
        				},
        				mod: {
        					targetInRange(card, player, target) {
        						if (player.getStorage("sbxianzhen_attack").includes(target)) return true;
        					},
        				},
        			},
        			record: {
        				trigger: {
        					global: "loseAsyncEnd",
        				},
        				charlotte: true,
        				silent: true,
        				filter: function(event, player) {
        					if (event.getParent(2).name !== "sbxianzhen_attack") return false;
        					return game.hasPlayer(current => {
        						if (current.countCards("h")) return false;
        						const evt = event.getl(current);
        						return evt && evt.hs && evt.hs.length;
        					});
        				},
        				content: function() {
        					const targets = [];
        					game.countPlayer(current => {
        						if (current.countCards("h")) return false;
        						const evt = trigger.getl(current);
        						if (evt && evt.hs && evt.hs.length) targets.add(current);
        					});
        					if (!player.storage.sbxianzhen_recorded) {
        						player.when("sbxianzhen_attackAfter").then(() => {
        							delete player.storage.sbxianzhen_recorded;
        						});
        					}
        					player.markAuto("sbxianzhen_recorded", targets);
        				},
        			},
        		},
        	},
        	sbjinjiu: {
        		audio: 2,
        		inherit: "rejinjiu",
        		group: ["sbjinjiu_decrease", "sbjinjiu_compare"],
        		global: "sbjinjiu_global",
        		subSkill: {
        			decrease: {
        				audio: "sbjinjiu",
        				forced: true,
        				trigger: { player: "damageBegin4" },
        				filter: function(event, player) {
        					return event.getParent(2).jiu;
        				},
        				content: function() {
        					trigger.num = 1;
        				},
        				ai: {
        					filterDamage: true,
        					skillTagFilter(player, tag, arg) {
        						return arg && arg.jiu;
        					},
        				},
        			},
        			global: {
        				mod: {
        					cardEnabled(card, player) {
        						if (card.name == "jiu" && _status.currentPhase && _status.currentPhase != player && _status.currentPhase.hasSkill("sbjinjiu")) return false;
        					},
        					cardSavable(card, player) {
        						if (card.name == "jiu" && _status.currentPhase && _status.currentPhase != player && _status.currentPhase.hasSkill("sbjinjiu")) return false;
        					},
        				},
        			},
        			compare: {
        				trigger: {
        					global: "compare",
        				},
        				filter: function(event, player) {
        					const participant = [event.player];
        					if (event.targets) participant.addArray(event.targets);
        					else participant.add(event.target);
        					if (!participant.includes(player)) return false;
        					if (event.player !== player && event.card1 && event.card1.name === "jiu") return true;
        					if (event.target !== player && event.card2 && event.card2.name === "jiu") return true;
        					return false;
        				},
        				forced: true,
        				direct: true,
        				content: function() {
        					for (const [role, ind] of [
        						["player", 1],
        						["target", 2],
        					]) {
        						const current = trigger[role],
        							card = trigger[`card${ind}`];
        						if (current !== player && card && card.name === "jiu") {
        							player.logSkill("sbjinjiu_compare", current);
        							game.log(current, "拼点牌点数视为", "#yA");
        							trigger[`num${ind}`] = 1;
        						}
        					}
        				},
        			},
        		},
        	},
        	//夏侯惇
        	sbganglie: {
        		audio: 2,
        		enable: "phaseUse",
        		usable: 1,
        		filter: function(event, player) {
        			if (!event.sbganglie_enabledTargets) return false;
        			return game.hasPlayer(current => {
        				return lib.skill.sbganglie.filterTarget(null, player, current);
        			});
        		},
        		onChooseToUse: function(event) {
        			if (game.online || event.type !== "phase") return;
        			const player = event.player;
        			/*const chosen = player
        				.getAllHistory("useSkill", evt => evt.skill === "sbganglie")
        				.map(evt => {
        					return evt.targets[0];
        				});*/
        			const chosen = player.getStorage('sbganglie');
        			let targets = player
        				.getAllHistory("damage", evt => evt.source && evt.source.isIn())
        				.map(evt => evt.source);
        			targets.removeArray(chosen);
        			event.sbganglie_enabledTargets=targets;
        			//event.set("sbganglie_enabledTargets", targets);
        		},
        		filterTarget: function(card, player, target) {
        			return _status.event&&_status.event.sbganglie_enabledTargets&&_status.event.sbganglie_enabledTargets.contains(target);
        			//return get.event("sbganglie_enabledTargets").includes(target);
        		},
        		content: function() {
        			//event.targets[0].damage(2);
        			target.damage(2);
        			player.markAuto('sbganglie',[target]);
        		},
        		ai: {
        			order: 6,
        			result: {
        				target: -2,
        			},
        		},
        	},
        	sbqingjian: {
        		audio: 2,
        		trigger: {
        			global: ["loseAfter", "cardsDiscardAfter", "loseAsyncAfter", "equipAfter"],
        		},
        		forced: true,
        		locked: false,
        		filter: function(event, player) {
        			if (event.skill&&event.skill=='sbqingjian_give') return false;
        			if (player.getExpansions("sbqingjian").length >= Math.max(1, player.getHp() - 1)) return false;
        			if (event.name !== "cardsDiscard") {
        				if (event.position !== ui.discardPile) return false;
        				if (
        					!game.hasPlayer(current => {
        						const evt = event.getl(current);
        						return evt.cards?.filterInD("od");
        					})
        				)
        					return false;
        			} else {
        				const evt = event.getParent();
        				if (evt.relatedEvent && evt.relatedEvent.name === "useCard") return false;
        			}
        			return true;
        		},
        		group: "sbqingjian_give",
        		content: function() {
        			let cards = trigger.cards.filterInD("od").slice();
        			const maxNum = Math.max(1, player.getHp() - 1);
        			const myLen = player.getExpansions("sbqingjian").length,
        				cardsLen = trigger.cards.length;
        			const num = Math.min(cardsLen, maxNum - myLen);
        			if (num > 0) cards = cards.randomGets(num);
        			const next = player.addToExpansion(cards, "gain2");
        			next.gaintag.add("sbqingjian");
        		},
        		marktext: "俭",
        		intro: {
        			content: "expansion",
        			markcount: "expansion",
        		},
        		subSkill: {
        			give: {
        				audio: "sbqingjian",
        				trigger: { player: "phaseUseEnd" },
        				filter: function(event, player) {
        					return player.getExpansions("sbqingjian").length > 0;
        				},
        				forced: true,
        				locked: false,
        				content: function() {
        					'step 0'
        					event.count=1;
        					'step 1'
        					event.cards=player.getExpansions("sbqingjian");
        					if(_status.connectMode) game.broadcastAll(function(){_status.noclearcountdown=true});
        					event.given_map={};
        					event.count--;
        					'step 2'
        					if(event.cards.length>1){
        						player.chooseCardButton('清俭：请选择要分配的牌',true,event.cards,[1,event.cards.length]).set('ai',function(button){
        							if(ui.selected.buttons.length==0) return 1;
        							return 0;
        						});
        					}
        					else if(event.cards.length==1){
        						event._result={links:event.cards.slice(0),bool:true};
        					}
        					else{
        						event.finish();
        					}
        					'step 3'
        					if(result.bool){
        						event.cards.removeArray(result.links);
        						event.togive=result.links.slice(0);
        						player.chooseTarget('选择一名角色获得'+get.translation(result.links),true).set('ai',function(target){
        							var att=get.attitude(_status.event.player,target);
        							if(_status.event.enemy){
        								return -att;
        							}
        							else if(att>0){
        								return att/(1+target.countCards('h'));
        							}
        							else{
        								return att/100;
        							}
        						}).set('enemy',get.value(event.togive[0],player,'raw')<0);
        					}
        					'step 4'
        					if(result.targets.length){
        						var id=result.targets[0].playerid,map=event.given_map;
        						if(!map[id]) map[id]=[];
        						map[id].addArray(event.togive);
        					}
        					if(cards.length>0) event.goto(2);
        					'step 5'
        					if(_status.connectMode){
        						game.broadcastAll(function(){delete _status.noclearcountdown;game.stopCountChoose()});
        					}
        					var list=[];
        					for(var i in event.given_map){
        						var source=(_status.connectMode?lib.playerOL:game.playerMap)[i];
        						player.line(source,'green');
        						list.push([source,event.given_map[i]]);
        					}
        					game.loseAsync({
        						gain_list:list,
        						giver:player,
        						animate:'draw',
        					}).setContent('gaincardMultiple');
        					'step 6'
        					if(event.count>0&&player.hasSkill(event.name)){
        						player.chooseBool(get.prompt2(event.name)).set('frequentSkill',event.name);
        					}
        					else event.finish();
        					'step 7'
        					if(result.bool){
        						player.logSkill(event.name);
        						event.goto(1);
        					}
        				},
        			},
        		},
        	},
		    //陆逊
        	sbqianxun: {
        		audio: 2,
        		trigger: {
        			target: "useCardToBegin",
        			player: "judgeBefore",
        		},
        		filter: function (event, player) {
        			if (!event.card || player.getStorage("sbqianxun").includes(event.card.viewAs || event.card.name)) return false;
        			if (event.getParent().name == "phaseJudge") return true;
        			if (event.name == "judge") return false;
        			if (get.type(event.card) == "trick" && event.player != player) return true;
        		},
        		forced: true,
        		locked: false,
        		content: function() {
        			'step 0'
        			player.markAuto("sbqianxun", [trigger.card.viewAs || trigger.card.name]);
        			if (player.countCards("he")) {
        				const num = Math.min(5, player.getStorage("sbqianxun").length);
        				player.chooseCard(get.prompt(event.name), "将至多" + get.cnNumber(num) + "张牌置于武将牌上", "he", [1, num]).set("ai", function (card) {
        					return 4 - get.value(card);
        				});
        			}else event.finish();
        			'step 1'
        			if (result.bool) {
        				player.addToExpansion(result.cards, "giveAuto", player).gaintag.add("sbqianxun_gain");
        				player.addSkill("sbqianxun_gain");
        			}
        		},
        		onremove: true,
        		intro: {
        			content: "已记录牌名：$",
        		},
        		group: "sbqianxun_use",
        		subSkill: {
        			use: {
        				audio: "sbqianxun",
        				trigger: {
        					player: "phaseUseBegin",
        				},
        				direct: true,
        				filter: function (event, player) {
        					return player.getStorage("sbqianxun").some(name => {
        						if (get.type(name) != "trick") return false;
        						return player.hasUseTarget(name);
        					});
        				},
        				content: function() {
        					'step 0'
        					const list = player.getStorage("sbqianxun").map(name => ["锦囊", "", name]);
        					player.chooseButton([get.prompt("sbqianxun"), "移去一个记录的牌名，若为普通锦囊牌则可以视为使用之", [list, "vcard"]]).set("ai", function (button) {
        						const card = { name: button.link[2], isCard: true };
        						return player.getUseValue(card);
        					}).set("filterButton", function (button) {
        						return true;
        					});
        					'step 1'
        					if(!result.bool) {
        					    event.finish();
        					}else {
        					    event.cost_data= result.bool ? result.links[0][2] : [];
        					}
        					'step 2'
        					player.logSkill(event.name);
        					const name = event.cost_data;
        					player.unmarkAuto("sbqianxun", [name]);
        					const card = { name: name, isCard: true };
        					if (get.type(card) == "trick" && player.hasUseTarget(card)) player.chooseUseTarget(card,`是否视为使用【${get.translation(name)}】？`);
        				},
        			},
        			gain: {
        				trigger: {
        					global: "phaseEnd",
        				},
        				forced: true,
        				charlotte: true,
        				content: function() {
        					'step 0'
        					var cards = player.getExpansions("sbqianxun_gain");
        					if (cards.length) player.gain(cards, "draw");
        					'step 1'
        					player.removeSkill("sbqianxun_gain");
        				},
        				intro: {
        					mark: function (dialog, storage, player) {
        						var cards = player.getExpansions("sbqianxun_gain");
        						if (player.isUnderControl(true)) dialog.addAuto(cards);
        						else return "共有" + get.cnNumber(cards.length) + "张牌";
        					},
        					markcount: "expansion",
        				},
        			},
        		},
        	},
        	sblianying: {
        		audio: 2,
        		trigger: {
        			global: "phaseEnd",
        		},
        		filter:function(event,player){
        			if(player==event.player) return false;
        			return player.getHistory("lose",evt=>evt.cards2 && evt.cards2.length ).length;
        		},
        		content:function(){
					'step 0'
					event.count=1;
					'step 1'
					event.num = 0;
        			player.getHistory("lose", evt => {
        				if (evt.cards2) event.num += evt.cards2.length;
        			});
        			event.num = Math.min(5, event.num);
					event.cards=game.cardsGotoOrdering(get.cards(event.num)).cards;
					if(_status.connectMode) game.broadcastAll(function(){_status.noclearcountdown=true});
					event.given_map={};
					event.count--;
					'step 2'
					if(event.cards.length>1){
						player.chooseCardButton('连营：请选择要分配的牌',true,event.cards,[1,event.cards.length]).set('ai',function(button){
							if(ui.selected.buttons.length==0) return 1;
							return 0;
						});
					}
					else if(event.cards.length==1){
						event._result={links:event.cards.slice(0),bool:true};
					}
					else{
						event.finish();
					}
					'step 3'
					if(result.bool){
						event.cards.removeArray(result.links);
						event.togive=result.links.slice(0);
						player.chooseTarget('选择一名角色获得'+get.translation(result.links),true).set('ai',function(target){
							var att=get.attitude(_status.event.player,target);
							if(_status.event.enemy){
								return -att;
							}
							else if(att>0){
								return att/(1+target.countCards('h'));
							}
							else{
								return att/100;
							}
						}).set('enemy',get.value(event.togive[0],player,'raw')<0);
					}
					'step 4'
					if(result.targets.length){
						var id=result.targets[0].playerid,map=event.given_map;
						if(!map[id]) map[id]=[];
						map[id].addArray(event.togive);
					}
					if(cards.length>0) event.goto(2);
					'step 5'
					if(_status.connectMode){
						game.broadcastAll(function(){delete _status.noclearcountdown;game.stopCountChoose()});
					}
					var list=[];
					for(var i in event.given_map){
						var source=(_status.connectMode?lib.playerOL:game.playerMap)[i];
						player.line(source,'green');
						list.push([source,event.given_map[i]]);
					}
					game.loseAsync({
						gain_list:list,
						giver:player,
						animate:'draw',
					}).setContent('gaincardMultiple');
					'step 6'
					if(event.count>0&&player.hasSkill(event.name)){
						player.chooseBool(get.prompt2(event.name)).set('frequentSkill',event.name);
					}
					else event.finish();
					'step 7'
					if(result.bool){
						player.logSkill(event.name);
						event.goto(1);
					}
				},
        	},
		    //曹丕
        	sbxingshang: {
        		getLimit: 9,
        		getList: [
        			{
        				cost: 2,
        				prompt: () => "令一名角色复原武将牌",
        				show: '复原武将牌',
        				filter: () => game.hasPlayer(target => target.isLinked() || target.isTurnedOver()),
        				filterTarget: (card, player, target) => target.isLinked() || target.isTurnedOver(),
        				content: function(player, target) {
        					if (target.isLinked()) target.link(false);
        					if (target.isTurnedOver()) target.turnOver(false);
        				},
        				ai: {
        					result: {
        						target: function(player, target) {
        							let res = 0;
        							if (target.isLinked()) res = 0.3;
        							if (target.isTurnedOver()) res += 3.5 * get.threaten(target, player);
        							return res;
        						},
        					},
        				},
        			},
        			{
        				cost: 2,
        				prompt: () => "令一名角色摸" + get.cnNumber(Math.min(5, Math.max(2, game.dead.length))) + "张牌",
        				show: '摸' + Math.min((Math.max(game.dead.length, 2)), 5) + '张牌',
        				filter: () => true,
        				filterTarget: true,
        				content: function(player, target) {
        					target.draw(Math.min(5, Math.max(2, game.dead.length)));
        				},
        				ai: {
        					result: {
        						target: function(player, target) {
        							return Math.min(5, Math.max(2, game.dead.length));
        						},
        					},
        				},
        			},
        			{
        				cost: 5,
        				prompt: () => "令一名体力上限小于10的角色增加1点体力上限，回复1点体力，随机恢复一个废除的装备栏",
        				show: '恢复体力与区域',
        				filter: () => game.hasPlayer(target => target.maxHp < 10),
        				filterTarget: true,
        				content: function(player, target) {
        					'step 0'
        					target.gainMaxHp();
        					'step 1'
        					target.recover();
        					'step 2'
        					let list = Array.from({ length: 13 }).map((_, i) => "equip" + parseFloat(i + 1));
        					list = list.filter(i => target.hasDisabledSlot(i));
        					if (list.length) target.enableEquip(list.randomGet());
        				},
        				ai: {
        					result: {
        						target: function(player, target) {
        							let res = 0.2;
        							if (target.isHealthy()) res += 0.4;
        							if (
        								Array.from({ length: 5 })
        								.map((_, i) => "equip" + parseFloat(i + 1))
        								.some(i => target.hasDisabledSlot(i))
        							) res += 0.3;
        							return res + get.recoverEffect(target, target, target) / 16;
        						},
        					},
        				},
        			},
        			{
        				cost: 5,
        				prompt: () => "获得一名已阵亡角色的武将牌上的所有技能，然后失去〖行殇〗〖放逐〗〖颂威〗",
        				show: '追思技能',
        				filter: () => game.dead.some(target => target.getStockSkills(true, true).some(i => get.info(i) && !get.info(i).charlotte)),
        				filterTarget: false,
        				content: function(player) {
        					'step 0'
        					player.chooseTarget(
        						"行殇：请选择一名已阵亡角色",
        						(card, player, target) => {
        							return target.isDead() && target.getStockSkills(true, true).some(i => get.info(i) && !get.info(i).charlotte);
        						},
        						true,
        						"获得一名已阵亡角色的武将牌上的所有技能，然后失去〖行殇〗〖放逐〗〖颂威〗"
        					).set("ai", target => {
        						return ["name", "name1", "name2"].reduce((sum, name) => {
        							if (!target[name] || !lib.character[target[name]] || (name == "name1" && target.name1 == target.name)) return sum;
        							return sum + get.rank(target[name], true);
        						}, 0);
        					}).set("deadTarget", true);//.forResult();
        					/*'step 1'
        					if (result.bool) {
        						const target = result.targets[0];
        						player.line(target);
        						game.log(player, "选择了", target);
        						player.changeSkills(
        							target.getStockSkills(true, true).filter(i => get.info(i) && !get.info(i).charlotte),
        							["sbxingshang", "sbfangzhu", "sbsongwei"]
        						);
        					}*/
        				},
        				content_next: function(player, none, result) {
        					const target = result.targets[0];
        					player.line(target);
        					//game.log(player, "选择了", target);
        					game.log(player, "对", target, "进行了「追思」");
        					player.changeSkills(
        						target.getStockSkills(true, true).filter(i => get.info(i) && !get.info(i).charlotte),
        						["sbxingshang", "sbfangzhu", "sbsongwei"]
        					);
        				},
        				ai: {},
        			},
        		],
        		marktext: "颂",
        		intro: {
        			name: "颂",
        			content: "mark",
        		},
        		audio: 2,
        		enable: "phaseUse",
        		getEffect: function(button){
        		    var list=get.info("sbxingshang").getList.slice();
        			var splt='sb_caopi_fz_';
        			var i=button.name.slice(splt.length);
        			var effect=list[i];
        			return effect;
        		},
        		filter: function(event, player) {
        			return get.info("sbxingshang").getList.some(effect => {
        				return player.countMark("sbxingshang") >= effect.cost && effect.filter(player);
        			});
        		},
        		usable: 2,
        		chooseButton: {
        			dialog: function() {
        				//这这这
        				const list = get.info("sbxingshang").getList.slice();
        				if(lib.config.effect_sb_caopi) {
        				    var dialog = ui.create.dialog('行殇', "hidden");
        				    var buttons=[];
        				    for(var i=0;i<list.length;i++) {
        				        var name='sb_caopi_xx_'+i;
        				        lib.card[name]={
                                    fullskin:true,
                                    opacity:1,
                                    textShadow:'black 0 0 2px',
                                };
                                lib.translate[name]='行殇';
                                lib.translate[name+'_info']=list[i].prompt();
        				        var button=game.createCard({name:name,suit:'　',number:'　'});
        				        buttons.push(button);
        				    }
        				    dialog.add([buttons.slice(0,2),"vcard"]);
        				    dialog.add([buttons.slice(2,4),"vcard"]);
        				    return dialog;
        				}else {
        				    var dialog = ui.create.dialog("行殇：请选择一项", "hidden");
        				    dialog.add([
        					    list.map(effect => {
        				    		return [effect, "移去" + effect.cost + "个“颂”标记，" + effect.prompt()];
        				    	}),
        				    	"textbutton",
        				    ]);
        				    return dialog;
        				}
        			},
        			filter: function(button, player) {
        				if(lib.config.effect_sb_caopi) {
        			        if(!button.initStyle) {
        			            button.initStyle=true;
        			            button.innerText='';
        			        }
        			        var list=get.info("sbxingshang").getList.slice();
        			        var splt='sb_caopi_xx_';
        			        var i=button.name.slice(splt.length);
        			        if(!button.isInit) {
        			            button.style.transition='none';
        			        }else {
        			            button.style.transition='all 0.3s ease';
        			        }
        			        button.node.cardMask.style.display='none';
        			        //实锤了就是这个整的点击范围溢出
                            button.node.image.style.pointerEvents='none';
        			        var effect=list[i];
        			        if(ui.selected.buttons.contains(button)) {
        			            button.style.backgroundImage='url('+lib.assetURL+'image/card/sb_caopi_button_cho.png)';
        			        }else {
        			            button.style.backgroundImage='url('+lib.assetURL+'image/card/sb_caopi_button.png)';
        			        }
        				    button.classList.add('noselect');
        				    button.style.backgroundSize='contain';
        				    button.style.boxShadow='none';
        				    button.style.width='250px';
        				    button.style.marginLeft='25px';
        				    button.style.marginRight='25px';
        				    button.style.marginTop='5px';
        				    button.style.marginBottom='5px';
        			    	button.style.height='60px';
        			    	button.style.transform='scale(1.1)';
        			    	var creatText=function(str) {
        				    	var string=ui.create.div(button);
        				    	string.innerHTML=str;
        				    	string.style.width='77%';
        				    	string.style.height='20px';
        				    	string.style.left='0';
        				    	string.style.top='calc( 50% - 10px)';
        				    	string.style.fontSize='20px';
        				    	string.style.textAlign='center';
        				    	return string;
        				    };
        				    
        				    if(!button.isInit) {
        				    button.infoS=creatText(effect.show);
        				    
        				    button.infoW=creatText('颂标记');
        				    button.infoW.style.width='80px';
        				    button.infoW.style.left='calc( 85% - 40px)';
        				    button.infoW.style.color='rgba(255, 230, 200, 1)';
        				    button.infoW.style['text-shadow']='black 0 0 4px, black 0 0 4px';
        				    button.infoW.style.fontSize='14px';
        				    button.infoW.style.transform='translateY(15px)';
        				    button.infoW.style.opacity=0.8;
        				    
        				    button.infoB=creatText(effect.cost);
        				    button.infoB.style.width='80px';
        				    button.infoB.style.left='calc( 85% - 40px)';
        				    button.infoB.style.color='rgba(255, 230, 200, 1)';
        				    button.infoB.style['text-shadow']='black 0 0 4px, black 0 0 4px';
        				    button.infoB.style.fontSize='22px';
        				    button.infoB.style.transform='translateY(-5px)';
        				    button.infoB.style.zIndex=1;
        				    }
        				    button.isInit=true;
        				    
        				    if(player.countMark("sbxingshang") >= effect.cost && effect.filter(player)) {
        				        button.style.filter='grayscale(0)';
        				        return true;
        				    }else {
        				        button.style.filter='grayscale(1)';
        				        return false;
        				    }
        				}else {
        				    const effect = button.link;
        				    return player.countMark("sbxingshang") >= effect.cost && effect.filter(player);
        				}
        			},
        			select:function(){
        			    if(lib.config.effect_sb_caopi) {
        			        if(ui.selected.buttons.length) {
        			            return [0,1];
        			        }else {
        			            return [1,2];
        			        }
        			    }else {
        			        return 1;
        			    }
        			},
        			check: function(button) {
        				/*var player = _status.event.player,
        					effect = button.link;*/
        				var player = _status.event.player,
        					effect = button.link;
        				if(lib.config.effect_sb_caopi) {
        				    effect = lib.skill.sbxingshang.getEffect(button);
        				}
        				return Math.max(
        					...game
        						.filterPlayer(target => {
        							const filterTarget = effect.filterTarget;
        							if (!filterTarget) return target == player;
        							if (typeof filterTarget == "function") return filterTarget(null, player, target);
        							return true;
        						})
        						.map(target => {
        							game.broadcastAll(effect => (lib.skill["sbxingshang_aiSkill"].ai = effect.ai), effect);
        							return get.effect(target, "sbxingshang_aiSkill", player, player);
        						})
        				);
        			},
        			backup: function(links, player) {
        				var effect = links[0];
        				if(lib.config.effect_sb_caopi) {
        				    effect = lib.skill.sbxingshang.getEffect(links[0]);
        				}
        				return {
        					effect: effect,
        					audio: "sbxingshang",
        					filterCard: () => false,
        					selectCard: -1,
        					filterTarget: effect.filterTarget,
        					content: function(event, trigger, player) {
        						'step 0'
        						event.target = event.targets[0];
        						event.effect = lib.skill.sbxingshang_backup.effect;
        						player.removeMark("sbxingshang", event.effect.cost);
        						event.effect.content(player, event.target);
        						'step 1'
        						if(result.bool&&event.effect.content_next) {
        						    event.effect.content_next(player, event.target, result);
        						}
        					},
        					ai: effect.ai,
        				};
        			},
        			prompt: function(links, player) {
        				var effect = links[0],
        					str = "###行殇###";
        				if(lib.config.effect_sb_caopi) {
        				    effect = lib.skill.sbxingshang.getEffect(links[0]);
        				}
        				return str + '<div class="text center">' + "移去" + effect.cost + "个“颂”标记，" + effect.prompt() + "</div>";
        			},
        		},
        		ai: {
        			combo: "sbxingshang",
        			order: 8,
        			result: {
        				player: function(player) {
        					const list = get.info("sbxingshang").getList.filter(effect => {
        						return player.countMark("sbxingshang") >= effect.cost && effect.filter(player);
        					});
        					return Math.max(
        						...list.map(effect => {
        							return Math.max(
        								...game
        									.filterPlayer(target => {
        										const filterTarget = effect.filterTarget;
        										if (!filterTarget) return target == player;
        										if (typeof filterTarget == "function") return filterTarget(null, player, target);
        										return true;
        									})
        									.map(target => {
        										game.broadcastAll(effect => (lib.skill["sbxingshang_aiSkill"].ai = effect.ai), effect);
        										return get.effect(target, "sbxingshang_aiSkill", player, player);
        									})
        							);
        						})
        					);
        				},
        			},
        		},
        		group: "sbxingshang_gain",
        		subSkill: {
        			aiSkill: {},
        			backup: {},
        			gain: {
        				audio: "sbxingshang",
        				trigger: { global: ["die", "damageEnd"] },
        				filter: function(event, player) {
        					if (player.countMark("sbxingshang") >= get.info("sbxingshang").getLimit) return false;
        					return event.name == "die" || !player.getHistory("custom", evt => evt.sbxingshang).length;
        				},
        				forced: true,
        				locked: false,
        				content: function(event, trigger, player) {
        					player.addMark("sbxingshang", Math.min(2, get.info("sbxingshang").getLimit - player.countMark("sbxingshang")));
        					if (trigger.name == "damage") player.getHistory("custom").push({ sbxingshang: true });
        				},
        			},
        		},
        	},
        	sbfangzhu: {
        		getList: [
        			{
        				cost: 1,
        				prompt: () => "令一名其他角色于手牌中只能使用基本牌直到其回合结束",
        				show: '只可使用基本牌',
        				filter: player => /*get.mode() != "doudizhu" &&*/ game.hasPlayer(target => target != player && !target.getStorage("sbfangzhu_ban").includes("basic")),
        				filterTarget: (card, player, target) => target != player && !target.getStorage("sbfangzhu_ban").includes("basic"),
        				content: function(player, target) {
        					target.addTempSkill("sbfangzhu_ban", { player: "phaseEnd" });
        					target.markAuto("sbfangzhu_ban", ["basic"]);
        				},
        				ai: {
        					result: {
        						target: function(player, target) {
        							return -(target.countCards("hs") + 2) / 3;
        						},
        					},
        				},
        			},
        			{
        				cost: 2,
        				prompt: () => "令一名其他角色于手牌中只能使用锦囊牌直到其回合结束",
        				show: '只可使用锦囊牌',
        				filter: player => game.hasPlayer(target => target != player && !target.getStorage("sbfangzhu_ban").includes("trick")),
        				filterTarget: (card, player, target) => target != player && !target.getStorage("sbfangzhu_ban").includes("trick"),
        				content: function(player, target) {
        					target.addTempSkill("sbfangzhu_ban", { player: "phaseEnd" });
        					target.markAuto("sbfangzhu_ban", ["trick"]);
        				},
        				ai: {
        					result: {
        						target: function(player, target) {
        							return -(target.countCards("hs") + 2) / 2;
        						},
        					},
        				},
        			},
        			{
        				cost: 3,
        				prompt: () => "令一名其他角色于手牌中只能使用装备牌直到其回合结束",
        				show: '只可使用装备牌',
        				filter: player => /*get.mode() != "doudizhu" &&*/ game.hasPlayer(target => target != player && !target.getStorage("sbfangzhu_ban").includes("equip")),
        				filterTarget: (card, player, target) => target != player && !target.getStorage("sbfangzhu_ban").includes("equip"),
        				content: function(player, target) {
        					target.addTempSkill("sbfangzhu_ban", { player: "phaseEnd" });
        					target.markAuto("sbfangzhu_ban", ["equip"]);
        				},
        				ai: {
        					result: {
        						target: function(player, target) {
        							return -target.countCards("hs") - 2;
        						},
        					},
        				},
        			},
        			{
        				cost: 2,
        				prompt: () => "令一名其他角色的非Charlotte技能失效直到其回合结束",
        				show: '武将技能失效',
        				filter: player => /*get.mode() != "doudizhu" &&*/ game.hasPlayer(target => target != player),
        				filterTarget: lib.filter.notMe,
        				content: function(player, target) {
        					target.addTempSkill("baiban", { player: "phaseEnd" });
        				},
        				ai: {
        					result: {
        						target: function(player, target) {
        							return -target.getSkills(null, false).filter(i => get.info(i) && !get.info(i).charlotte).length * get.threaten(target, player);
        						},
        					},
        				},
        			},
        			{
        				cost: 2,
        				prompt: () => "令一名其他角色不能响应除其外的角色使用的牌直到其回合结束",
        				show: '不可响应他人牌',
        				filter: player => /*get.mode() != "doudizhu" &&*/ game.hasPlayer(target => target != player && !target.hasSkill("sbfangzhu_kill")),
        				filterTarget: lib.filter.notMe,
        				content: function(player, target) {
        					target.addTempSkill("sbfangzhu_kill", { player: "phaseEnd" });
        				},
        				ai: {
        					result: {
        						target: function(player, target) {
        							return -(target.countCards("hs") + 2) / target.hp;
        						} 
        					}
        				},
        			},
        			{
        				cost: 3,
        				prompt: () => "令一名其他角色将武将牌翻面",
        				show: '翻面',
        				filter: player => /*get.mode() != "doudizhu" &&*/ game.hasPlayer(target => target != player),
        				filterTarget: lib.filter.notMe,
        				content: function(player, target) {
        					target.turnOver();
        				},
        				ai: {
        					result: {
        						target: function(player, target) {
        							return target.isTurnedOver() ? 3.5 : -3.5;
        						},
        					},
        				},
        			},
        		],
        		audio: 2,
        		audioname: ["mb_caomao"],
        		enable: "phaseUse",
        		filter: function(event, player) {
        			return get.info("sbfangzhu").getList.some(effect => {
        				return player.countMark("sbxingshang") >= effect.cost && effect.filter(player);
        			});
        		},
        		getEffect: function(button){
        		    var list=get.info("sbfangzhu").getList.slice();
        			var splt='sb_caopi_fz_';
        			var i=button.name.slice(splt.length);
        			var effect=list[i];
        			return effect;
        		},
        		usable: 1,
        		chooseButton: {
        			dialog: function() {
        				//这这这
        				const list = get.info("sbfangzhu").getList.slice();
        				if(lib.config.effect_sb_caopi) {
        				    var dialog = ui.create.dialog('放逐', "hidden");
        				    var buttons=[];
        				    for(var i=0;i<list.length;i++) {
        				        var name='sb_caopi_fz_'+i;
        				        lib.card[name]={
                                    fullskin:true,
                                    opacity:1,
                                    textShadow:'black 0 0 2px',
                                };
                                lib.translate[name]='放逐';
                                lib.translate[name+'_info']=list[i].prompt();
        				        var button=game.createCard({name:name,suit:'　',number:'　'});
        				        buttons.push(button);
        				    }
        				    dialog.add([buttons.slice(0,2),"vcard"]);
        				    dialog.add([buttons.slice(2,4),"vcard"]);
        				    dialog.add([buttons.slice(4,6),"vcard"]);
        				    return dialog;
        				}else {
        				    var dialog = ui.create.dialog("放逐：请选择一项", "hidden");
        				    dialog.add([
        					    list.map(effect => {
        						    return [effect, "移去" + effect.cost + "个“颂”标记，" + effect.prompt()];
        					    }),
        					    "textbutton",
        				    ]);
        				    return dialog;
        				}
        			},
        			filter: function(button, player) {
        				if(lib.config.effect_sb_caopi) {
        			        if(!button.initStyle) {
        			            button.initStyle=true;
        			            button.innerText='';
        			        }
        			        var list=get.info("sbfangzhu").getList.slice();
        			        var splt='sb_caopi_fz_';
        			        var i=button.name.slice(splt.length);
        			        if(!button.isInit) {
        			            button.style.transition='none';
        			        }else {
        			            button.style.transition='all 0.3s ease';
        			        }
        			        button.node.cardMask.style.display='none';
        			        //实锤了就是这个整的点击范围溢出
                            button.node.image.style.pointerEvents='none';
        			        var effect=list[i];
        			        if(ui.selected.buttons.contains(button)) {
        			            button.style.backgroundImage='url('+lib.assetURL+'image/card/sb_caopi_button_cho.png)';
        			        }else {
        			            button.style.backgroundImage='url('+lib.assetURL+'image/card/sb_caopi_button.png)';
        			        }
        				    button.classList.add('noselect');
        				    button.style.backgroundSize='contain';
        				    button.style.boxShadow='none';
        				    button.style.width='250px';
        				    button.style.marginLeft='25px';
        				    button.style.marginRight='25px';
        				    button.style.marginTop='5px';
        				    button.style.marginBottom='5px';
        				    if(i>3) {
        				        button.style.marginTop='-3px';
        				    }
        			    	button.style.height='60px';
        			    	button.style.transform='scale(1.1)';
        			    	var creatText=function(str) {
        				    	var string=ui.create.div(button);
        				    	string.innerHTML=str;
        				    	string.style.width='77%';
        				    	string.style.height='20px';
        				    	string.style.left='0';
        				    	string.style.top='calc( 50% - 10px)';
        				    	string.style.fontSize='20px';
        				    	string.style.textAlign='center';
        				    	return string;
        				    };
        				    
        				    if(!button.isInit) {
        				    button.infoS=creatText(effect.show);
        				    
        				    button.infoW=creatText('颂标记');
        				    button.infoW.style.width='80px';
        				    button.infoW.style.left='calc( 85% - 40px)';
        				    button.infoW.style.color='rgba(255, 230, 200, 1)';
        				    button.infoW.style['text-shadow']='black 0 0 4px, black 0 0 4px';
        				    button.infoW.style.fontSize='14px';
        				    button.infoW.style.transform='translateY(15px)';
        				    button.infoW.style.opacity=0.8;
        				    
        				    button.infoB=creatText(effect.cost);
        				    button.infoB.style.width='80px';
        				    button.infoB.style.left='calc( 85% - 40px)';
        				    button.infoB.style.color='rgba(255, 230, 200, 1)';
        				    button.infoB.style['text-shadow']='black 0 0 4px, black 0 0 4px';
        				    button.infoB.style.fontSize='22px';
        				    button.infoB.style.transform='translateY(-5px)';
        				    button.infoB.style.zIndex=1;
        				    }
        				    button.isInit=true;
        				    
        				    if(player.countMark("sbxingshang") >= effect.cost && effect.filter(player)) {
        				        button.style.filter='grayscale(0)';
        				        return true;
        				    }else {
        				        button.style.filter='grayscale(1)';
        				        return false;
        				    }
        				}else {
        				    const effect = button.link;
        				    return player.countMark("sbxingshang") >= effect.cost && effect.filter(player);
        				}
        			},
        			select:function(){
        			    if(lib.config.effect_sb_caopi) {
        			        if(ui.selected.buttons.length) {
        			            return [0,1];
        			        }else {
        			            return [1,2];
        			        }
        			    }else {
        			        return 1;
        			    }
        			},
        			check: function(button) {
        				/*var player = _status.event.player,
        					effect = button.link;*/
        				var player = _status.event.player,
        					effect = button.link;
        				if(lib.config.effect_sb_caopi) {
        				    effect = lib.skill.sbfangzhu.getEffect(button);
        				}
        				return Math.max(
        					...game
        						.filterPlayer(target => {
        							const filterTarget = effect.filterTarget;
        							if (!filterTarget) return target == player;
        							if (typeof filterTarget == "function") return filterTarget(null, player, target);
        							return true;
        						})
        						.map(target => {
        							game.broadcastAll(effect => (lib.skill["sbxingshang_aiSkill"].ai = effect.ai), effect);
        							return get.effect(target, "sbxingshang_aiSkill", player, player);
        						})
        				);
        			},
        			backup: function(links, player) {
        				var effect = links[0];
        				if(lib.config.effect_sb_caopi) {
        				    effect = lib.skill.sbfangzhu.getEffect(links[0]);
        				}
        				return {
        					effect: effect,
        					audio: "sbfangzhu",
        					audioname: ["mb_caomao"],
        					filterCard: () => false,
        					selectCard: -1,
        					filterTarget: effect.filterTarget,
        					content: function(event, trigger, player) {
        						const target = event.targets[0],
        							effect = lib.skill.sbfangzhu_backup.effect;
        						player.removeMark("sbxingshang", effect.cost);
        						effect.content(player, target);
        					},
        					ai: effect.ai,
        				};
        			},
        			prompt: function(links, player) {
        				var effect = links[0],
        					str = "###放逐###";
        				if(lib.config.effect_sb_caopi) {
        				    effect = lib.skill.sbfangzhu.getEffect(links[0]);
        				}
        				return str + '<div class="text center">' + "移去" + effect.cost + "个“颂”标记，" + effect.prompt() + "</div>";
        			},
        		},
        		ai: {
        			combo: "sbxingshang",
        			order: 7,
        			result: {
        				player: function(player) {
        					const list = get.info("sbfangzhu").getList.filter(effect => {
        						return player.countMark("sbxingshang") >= effect.cost && effect.filter(player);
        					});
        					return Math.max(
        						...list.map(effect => {
        							return Math.max(
        								...game
        									.filterPlayer(target => {
        										const filterTarget = effect.filterTarget;
        										if (!filterTarget) return target == player;
        										if (typeof filterTarget == "function") return filterTarget(null, player, target);
        										return true;
        									})
        									.map(target => {
        										game.broadcastAll(effect => (lib.skill["sbxingshang_aiSkill"].ai = effect.ai), effect);
        										return get.effect(target, "sbxingshang_aiSkill", player, player);
        									})
        							);
        						})
        					);
        				},
        			},
        		},
        		containsSome: function(card, cards) {
        		    var includes = false;
        		    card.forEach(cc=>{
        		        if(cards.contains(cc)) includes = true;
        		    });
        		    return includes;
        		},
        		subSkill: {
        			backup: {},
        			kill: {
        				charlotte: true,
        				mark: true,
        				marktext: "禁",
        				intro: { content: "不能响应其他角色使用的牌" },
        				trigger: { global: "useCard1" },
        				filter: function(event, player) {
        					return event.player != player;
        				},
        				forced: true,
        				popup: false,
        				content: function(event, trigger, player) {
        					trigger.directHit.add(player);
        				},
        			},
        			ban: {
        				charlotte: true,
        				onremove: true,
        				mark: true,
        				marktext: "禁",
        				intro: {
        					markcount: () => 0,
        					content: function(storage) {
        						if (storage.length > 1) return "不能使用手牌";
        						return "于手牌中只能使用" + get.translation(storage[0]) + "牌";
        					},
        				},
        				mod: {
        					cardEnabled: function(card, player) {
        						const storage = player.getStorage("sbfangzhu_ban");
        						const hs = player.getCards("h"),
        							cards = [card];
        						if (Array.isArray(card.cards)) cards.addArray(card.cards);
        						if (/*cards.containsSome(...hs)*/lib.skill.sbfangzhu.containsSome(cards, hs) && (storage.length > 1 || !storage.includes(get.type2(card)))) return false;
        					},
        					cardSavable: function(card, player) {
        						const storage = player.getStorage("sbfangzhu_ban");
        						const hs = player.getCards("h"),
        							cards = [card];
        						if (Array.isArray(card.cards)) cards.addArray(card.cards);
        						if (/*cards.containsSome(...hs)*/lib.skill.sbfangzhu.containsSome(cards, hs)  && (storage.length > 1 || !storage.includes(get.type2(card)))) return false;
        					},
        				},
        			},
        		},
        	},
        	sbsongwei: {
        		audio: 2,
        		trigger: { player: "phaseUseBegin" },
        		filter: function(event, player) {
        			if (!player.hasZhuSkill('sbsongwei')) return false;
        			if (player.countMark("sbxingshang") >= get.info("sbxingshang").getLimit) return false;
        			return game.hasPlayer(target => target.group == "wei" && target != player);
        		},
        		zhuSkill: true,
        		forced: true,
        		locked: false,
        		content: function(event, trigger, player) {
        			player.addMark("sbxingshang", Math.min(get.info("sbxingshang").getLimit - player.countMark("sbxingshang"), 2 * game.countPlayer(target => target.group == "wei" && target != player)));
        		},
        		group: "sbsongwei_delete",
        		subSkill: {
        			delete: {
        				audio: "sbsongwei",
        				enable: "phaseUse",
        				filter: function(event, player) {
        					if (!player.hasZhuSkill('sbsongwei')) return false;
        					if (player.storage.sbsongwei_delete) return false;
        					return game.hasPlayer(target => lib.skill.sbsongwei.subSkill.delete.filterTarget(null, player, target));
        				},
        				filterTarget: function(card, player, target) {
        					return target != player && target.group == "wei" && target.getStockSkills(false, true).length;
        				},
        				skillAnimation: true,
        				animationColor: "thunder",
        				content: function(event, trigger, player) {
        					player.storage.sbsongwei_delete = true;
        					player.awakenSkill("sbsongwei_delete");
        					//event.target.removeSkills(event.target.getStockSkills(false, true));
        					event.target.getStockSkills(false, true).forEach(skill=>{
        					    event.target.removeSkill(skill);
        					});
        				},
        				ai: {
        					order: 13,
        					result: {
        						target: function(player, target) {
        							return -target.getStockSkills(false, true).length;
        					    },
        					},
        			  	},
        			},
        	    },
        	},
		    //关羽
			//矢
			//就由本Helasisy来给你通衢一下吧
			sbwusheng:{
				audio:3,
				trigger:{player:'phaseUseBegin'},
				filter:function(event,player){
					return game.hasPlayer(target=>target!=player&&!target.isZhu2());
				},
				direct:true,
				content:function(){
					'step 0'
					var num=get.mode()=='identity'?'两':'一';
					player.chooseTarget(get.prompt('sbwusheng'),'选择一名非主公的其他角色，本阶段对其使用【杀】无距离和次数限制，使用【杀】指定其为目标后摸'+num+'张牌，对其使用三张【杀】后不能对其使用【杀】',(card,player,target)=>{
						return target!=player&&!target.isZhu2();
					}).set('ai',target=>{
						var player=_status.event.player;
						return get.effect(target,{name:'sha'},player,player);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						if(lib.config.extension_十周年UI_enable&&lib.config.effect_sb_guanyu) {
						    decadeUI.animation.playSpine({ name: 'SS_gyskill', scale: 1 });
						    game.playAudio('../extension/标记补充/audio/effect_sbguanyu_skill.mp3');
						    game.players.forEach(cur=>{
						        if(cur==player) return;
						        cur.classList.add('sbwusheng_smooth');
						        //var eff=target==cur?'sbwusheng_target':'sbwusheng_notarget';
							    //cur.classList.add(eff);
							    if(target==cur) {
							        cur.createHighLight([[255,255,255],[255,255,50],[255,50,50]],6);
							    }else {
							        cur.classList.add('sbwusheng_notarget');
							    }
							});
						}
						player.logSkill('sbwusheng',target);
						player.addTempSkill('sbwusheng_effect',{player:'phaseUseAfter'});
						player.storage.sbwusheng_effect[target.playerid]=0;
					}
				},
				init:function(player){
					game.createCss(`.sbwusheng_target {
					    filter: drop-shadow(0px 0px 2px rgb(255,255,200)) drop-shadow(0px 0px 5px rgb(255,200,50)) drop-shadow(0px 0px 10px rgb(255,30,30));
					}`);
					game.createCss(`.sbwusheng_smooth {
					    transition: filter 0.7s ease;
					}`);
					game.createCss(`.sbwusheng_notarget {
					    filter: brightness(0.6);
					}`);
					//player.classList.add('sbwusheng_target');
					//player.classList.add('sbwusheng_smooth');
				},
				group:'sbwusheng_wusheng',
				subSkill:{
					wusheng:{
						audio:'sbwusheng',
						enable:['chooseToUse','chooseToRespond'],
						hiddenCard:function(player,name){
							return name=='sha'&&player.countCards('hs');
						},
						filter:function(event,player){
							return event.filterCard({name:'sha'},player,event)||lib.inpile_nature.some(nature=>event.filterCard({name:'sha',nature:nature},player,event));
						},
						chooseButton:{
							dialog:function(event,player){
								var list=[];
								if(event.filterCard({name:'sha'},player,event)) list.push(['基本','','sha']);
								for(var j of lib.inpile_nature){
									if(event.filterCard({name:'sha',nature:j},player,event)) list.push(['基本','','sha',j]);
								}
								var dialog=ui.create.dialog('武圣',[list,'vcard'],'hidden');
								dialog.direct=true;
								return dialog;
							},
							check:function(button){
								var player=_status.event.player;
								var card={name:button.link[2],nature:button.link[3]};
								if(_status.event.getParent().type=='phase'&&game.hasPlayer(function(current){
									return player.canUse(card,current)&&get.effect(current,card,player,player)>0;
								})){
									switch (button.link[2]){
										case 'sha':
											if(button.link[3]=='fire') return 2.95;
											else if(button.link[3]=='thunder'||button.link[3]=='ice') return 2.92;
											else return 2.9;
									}
								}
								return 1+Math.random();
							},
							backup:function(links,player){
								return {
									audio:'sbwusheng',
									filterCard:true,
									check:function(card){
										return 6-get.value(card);
									},
									viewAs:{name:links[0][2],nature:links[0][3]},
									position:'hs',
									popname:true,
								}
							},
							prompt:function(links,player){
								return '将一张手牌当作'+get.translation(links[0][3]||'')+'【'+get.translation(links[0][2])+'】'+(_status.event.name=='chooseToUse'?'使用':'打出');
							},
						},
						ai:{
							respondSha:true,
							fireAttack:true,
							skillTagFilter:function(player,tag){
								if(!player.countCards('hs')) return false;
							},
							order:function(item,player){
								if(player&&_status.event.type=='phase'){
									var max=0;
									if(lib.inpile_nature.some(i=>player.getUseValue({name:'sha',nature:i})>0)){
										var temp=get.order({name:'sha'});
										if(temp>max) max=temp;
									}
									if(max>0) max+=0.3;
									return max;
								}
								return 4;
							},
							result:{player:1},
						},
					},
					effect:{
						charlotte:true,
						init:function(player){
							//if(!player.storage.sbwusheng_effect) 
							player.storage.sbwusheng_effect={};
						},
						onremove:function(player){
						    if(!(lib.config.extension_十周年UI_enable&&lib.config.effect_sb_guanyu)) return;
						    var players=game.players.concat(game.dead);
						    players.forEach(target=>{
						        target.classList.remove('sbwusheng_notarget');
						        //target.classList.remove('sbwusheng_target');
						        //if(target.highLightBox&&target.highLightBox.level<=5) target.createHighLight([],0,0);
						        target.createHighLight([],0,{level:5,opacity:0});
						    });
						},
						mod:{
							targetInRange:function(card,player,target){
								if(card.name=='sha'&&typeof player.storage.sbwusheng_effect[target.playerid]=='number') return true;
							},
							cardUsableTarget:function(card,player,target){
								if(card.name=='sha'&&typeof player.storage.sbwusheng_effect[target.playerid]=='number') return true;
							},
							playerEnabled:function(card,player,target){
								if(card.name!='sha'||typeof player.storage.sbwusheng_effect[target.playerid]!='number') return;
								if(player.storage.sbwusheng_effect[target.playerid]>=3/*5*/) return false;
							},
						},
						audio:'sbwusheng',
						trigger:{player:['useCardToPlayered','useCardAfter']},
						filter:function(event,player){
							if(event.card.name!='sha') return false;
							if(event.name=='useCard') return event.targets?.filter(target=>typeof player.storage.sbwusheng_effect[target.playerid]=='number')?.length;
							return typeof player.storage.sbwusheng_effect[event.target.playerid]=='number';
						},
						direct:true,
						content:function(){
							if(trigger.name=='useCard'){
								var targets=trigger.targets.filter(target=>typeof player.storage.sbwusheng_effect[target.playerid]=='number');
								targets.forEach(target=>{
								    player.storage.sbwusheng_effect[target.playerid]++;
								});
							}
							else{
								player.logSkill('sbwusheng_effect',trigger.target);
								var num=get.mode()=='identity'?2:1;
								player.draw(num);
							}
						},
					},
				},
				ai:{threaten:2.5},
				//ai:{threaten:114514},
			},
			sbyijue:{
				audio:2,
				trigger:{source:'damageBegin2'},
				filter:function(event,player){
					return event.num>=(event.player.getHp(true)+event.player.hujia)/*event.num>=event.player.hp*/&&!player.getStorage('sbyijue').includes(event.player);
				},
				forced:true,
				logTarget:'player',
				content:function(){
					trigger.cancel();
					player.addTempSkill('sbyijue_effect');
					player.markAuto('sbyijue',[trigger.player]);
					player.markAuto('sbyijue_effect',[trigger.player]);
				},
				marktext:'绝',
				intro:{content:'已放$一马'},
				subSkill:{
					effect:{
						charlotte:true,
						onremove:true,
						audio:'sbyijue',
						trigger:{player:'useCardToPlayered'},
						filter:function(event,player){
							return player.getStorage('sbyijue_effect').includes(event.target);
						},
						forced:true,
						logTarget:'target',
						content:function(){
							trigger.getParent().excluded.add(trigger.target);
						},
						ai:{
							effect:{
								player:function(card,player,target){
									if(player.getStorage('sbyijue_effect').includes(target)) return 'zeroplayertarget';
								},
							},
						},
						marktext:'义',
						intro:{content:'本回合放$一马'},
					},
				},
			},
			//黄月英
			sbqicai:{
				mod:{
					targetInRange:function(card,player,target){
						if(get.type2(card)=='trick') return true;
					},
				},
				locked:false,
				getLimit:3,
				audio:2,
				enable:'phaseUse',
				onChooseToUse:function(event){
					if(!event.sbqicai&&!game.online){
						const player=get.player();
						const cards=Array.from(ui.discardPile.childNodes).filter(card=>lib.skill.sbqicai.filterCardx(card,player));
						event.set('sbqicai',cards);
					}
				},
				filter:function(event,player){
					if(!game.hasPlayer(target=>target!=player&&target.hasEmptySlot(2))) return false;
					return player.countCards('h',card=>lib.skill.sbqicai.filterCardx(card,player))||event.sbqicai&&event.sbqicai.length;
				},
				filterCardx:function(card,player){
					if(player.getStorage('sbqicai').includes(card.name)) return false;
					return get.type(card)=='equip'&&(get.mode()!='doudizhu'||get.subtype(card)=='equip2');
				},
				usable:1,
				chooseButton:{
					dialog:function(event,player){
						const list1=player.getCards('h',card=>lib.skill.sbqicai.filterCardx(card,player));
						const list2=event.sbqicai;
						//var dialog=ui.create.dialog('###奇才###<div class="text center">请选择一张防具牌置入一名其他角色的装备区</div>');
						var dialog=ui.create.dialog();
						var etype=get.mode()!='doudizhu'?'装备牌':'防具牌';
						dialog.add('奇才');
						dialog.add('<div class="text center">请选择一张'+etype+'置入一名其他角色的装备区</div>');
						if(list1.length){
							dialog.add('<div class="text center">手牌区</div>');
							dialog.add(list1);
						}
						if(list2.length){
							dialog.add('<div class="text center">弃牌堆</div>');
							dialog.add(list2);
							if(list1.length) dialog.classList.add('fullheight');
						}
						return dialog;
					},
					check:function(button){
						var player=_status.event.player;
						var num=get.value(button.link);
						if(!game.hasPlayer(target=>target!=player&&target.hasEmptySlot(2)&&get.attitude(player,target)>0)) num=1/(get.value(button.link)||0.5);
						if(get.owner(button.link)) return num;
						return num*5;
					},
					backup:function(links,player){
						return {
							audio:'sbqicai',
							card:links[0],
							filterCard:function(card,player){
								var cardx=lib.skill.sbqicai_backup.card;
								if(get.owner(cardx)) return card==cardx;
								return false;
							},
							selectCard:-1,
							filterTarget:function(card,player,target){
								return target!=player&&target.canEquip(lib.skill.sbqicai_backup.card);
							},
							check:()=>1,
							discard:false,
							lose:false,
							prepare:function(cards,player,targets){
								if(cards&&cards.length) player.$give(cards,targets[0],false);
							},
							content:function(){
								if(!cards||!cards.length){
									cards=[lib.skill.sbqicai_backup.card];
									target.$gain2(cards);
									game.delayx();
								}
								player.markAuto('sbqicai',[cards[0].name]);
								target.equip(cards[0]);
								player.addSkill('sbqicai_gain');
								lib.skill.sbqicai.updateCounter(player,target,0);
							},
							ai:{
								result:{
									target:function(player,target){
										var att=get.attitude(player,target);
										if(att>0) return 3;
										if(att<0) return -1;
										return 0;
									},
								},
							},
						}
					},
					prompt:function(links,player){
						return '请选择置入'+get.translation(links)+'的角色';
					},
				},
				updateCounter:function(player,target,num){
					const skill=`sbqicai_${player.playerid}`;
					game.broadcastAll(lib.skill.sbqicai.initSkill,skill);
					if(!target.hasSkill(skill)) target.addSkill(skill);
					/*if(num==0) target.clearMark(skill,false);*/
					if(num==0) {
					    target.storage[skill]=undefined;
					    target.unmarkSkill(skill);
					}
					else if(num>0) target.addMark(skill,num,false);
					if(target.countMark(skill)>=lib.skill.sbqicai.getLimit) target.removeSkill(skill);
					if(!_status.postReconnect.sbqicai){
						_status.postReconnect.sbqicai=[
							lib.skill.sbqicai.initSkill,
							[]
						];
					}
					_status.postReconnect.sbqicai[1].add(skill);
				},
				initSkill:skill=>{
					if(!lib.skill[skill]){
						lib.skill[skill]={
							onremove:true,
							mark:true,
							marktext:'奇',
							intro:{
								markcount:function(storage){
									return (storage||0).toString();
								},
								content:function(storage){
									return '已被掠夺'+get.cnNumber(storage||0)+'张普通锦囊牌';
								},
							},
						};
						lib.translate[skill]='奇才';
						lib.translate[skill+'_bg']='奇';
					}
				},
				ai:{
					order:7,
					result:{
						player:function(player){
							if(!game.hasPlayer(target=>target!=player&&target.hasEmptySlot(2)&&get.attitude(player,target)!=0)) return 0;
							return 1;
						},
					},
				},
				marktext:'才',
				intro:{content:'已使用$发动过此技能'},
				subSkill:{
					gain:{
						audio:'sbqicai',
						trigger:{global:['gainAfter','loseAsyncAfter']},
						filter:function(event,player){
							return game.hasPlayer(function(current){
								if(!event.getg(current).length||!current.hasSkill('sbqicai_'+player.playerid)) return false;
								if(current.countMark('sbqicai_'+player.playerid)>=lib.skill.sbqicai.getLimit) return false;
								return event.getg(current).some(card=>get.type(card)=='trick'&&lib.filter.canBeGained(card,current,player));
							});
						},
						forced:true,
						direct:true,
						charlotte:true,
						content:function(){
							'step 0'
							if(!event.checkedTargets) event.checkedTargets=[];
							var target=game.findPlayer(function(current){
								if(!trigger.getg(current).length||!current.hasSkill('sbqicai_'+player.playerid)) return false;
								if(event.checkedTargets.includes(current)) return false;
								if(current.countMark('sbqicai_'+player.playerid)>=lib.skill.sbqicai.getLimit) return false;
								return trigger.getg(current).some(card=>get.type(card)=='trick'&&lib.filter.canBeGained(card,current,player));
							});
							if(!target){
								event.finish();
                                return;
							}
							event.target=target;
							player.logSkill('sbqicai_gain',target);
							event.checkedTargets.add(target);
							var cards=trigger.getg(target).filter(card=>get.type(card)=='trick'&&lib.filter.canBeGained(card,target,player));
							if(cards.length<=lib.skill.sbqicai.getLimit-target.countMark('sbqicai_'+player.playerid)) event._result={bool:true,links:cards};
							else{
								var num=(lib.skill.sbqicai.getLimit-target.countMark('sbqicai_'+player.playerid));
								target.chooseButton(['奇才：将其中'+get.cnNumber(num)+'张牌交给'+get.translation(player),cards],num,true).set('ai',function(button){
									return get.value(button.link)*get.sgn(_status.event.att);
								}).set('att',get.attitude(target,player));
							}
							'step 1'
							if(result.bool){
								game.delaye(0.5);
								target.give(result.links,player);
								lib.skill.sbqicai.updateCounter(player,target,result.links.length);
							}
							event.goto(0);
						},
					},
				},
			},
			sbjizhi:{
				audio:2,
				trigger:{player:'useCard'},
				filter:function(event,player){
					return get.type(event.card)=='trick';
				},
				forced:true,
				content:function(){
					player.draw().gaintag=['sbjizhi'];
					player.addTempSkill('sbjizhi_mark')
				},
				subSkill:{
					mark:{
						charlotte:true,
						onremove:function(player){
							player.removeGaintag('sbjizhi');
						},
						mod:{
							ignoredHandcard:function(card,player){
								if(card.hasGaintag('sbjizhi')) return true;
							},
							cardDiscardable:function(card,player,name){
								if(name=='phaseDiscard'&&card.hasGaintag('sbjizhi')) return false;
							},
						},
					},
				},
			},
		    //卢植
		    sbzhenliang:{
				mark:true,
				locked:false,
				zhuanhuanji:true,
				marktext:'☯',
				intro:{
					content:function(storage,player,skill){
						if(player.storage.sbzhenliang==true) return '你的回合外，当你使用或打出的牌结算结束后，若此牌与“任”类别相同，则你可令一名角色摸一张牌。';
						return '出牌阶段限一次，你可以选择一名攻击范围内的其他角色并弃置X张与“任”颜色相同的牌对其造成1点伤害（X为你与其体力值之差且至少为1）。';
					},
				},
				group:["sbzhenliang_1","sbzhenliang_2"],
				subSkill:{
					1:{
						prompt:'弃置X张与“任”颜色相同的牌（X为你与其体力值之差且至少为1），并对攻击范围内的一名角色造成1点伤害。',
						audio:2,
						enable:'phaseUse',
						filter:function(event,player){
							if(player.storage.sbzhenliang) return false;
							var storage=player.getExpansions('nzry_mingren');
							if(!storage.length) return false;
							var color=get.color(storage[0]);
							if(player.countCards('he',function(card){
								return get.color(card)==color;
							})==0) return false;
							return game.hasPlayer(function(current){
								return player.inRange(current);
							});
						},
						position:'he',
						filterCard:function(card,player){
							return get.color(card)==get.color(player.getExpansions('nzry_mingren')[0]);
						},
						filterTarget:function(card,player,target){
							return player.inRange(target)&&ui.selected.cards.length==Math.max(1,Math.abs(player.hp-target.hp));
						},
						selectCard:[1,Infinity],
						check:function(card){
							return 6.5-get.value(card);
						},
						content:function(){
							player.changeZhuanhuanji('sbzhenliang');
							target.damage('nocard');
						},
						ai:{
							order:7,
							result:{
								player:function(player,target){
									return get.damageEffect(target,player,player);
								},
							},
						},
					},
					2:{
						audio:2,
						trigger:{
							player:['useCardAfter','respondAfter'],
						},
						filter:function(event,player){
							if(_status.currentPhase==player||!player.storage.sbzhenliang) return false;
							var card=player.getExpansions('nzry_mingren')[0];
							return card&&get.type2(event.card)==get.type2(card);
						},
						direct:true,
						content:function(){
							"step 0"
							player.chooseTarget(get.prompt('sbzhenliang'),'令一名角色摸一张牌').ai=function(target){
								if(target.hasSkillTag('nogain')) return 0.1;
								var att=get.attitude(player,target);
								return att*(Math.max(5-target.countCards('h'),2)+3);
							};
							"step 1"
							if(result.bool){
								player.changeZhuanhuanji('sbzhenliang');
								player.logSkill('sbzhenliang',result.targets);
								result.targets[0].draw();
							}
						},
					},
				},
				ai:{
					combo:'nzry_mingren',
				},
			},
		    //诸葛亮
			sbhuoji:{
				audio:2,
				dutySkill:true,
				enable:'phaseUse',
				filterTarget:lib.filter.notMe,
				prompt:'选择一名其他角色，对其与其势力相同的所有其他角色各造成1点火属性伤害',
				usable:1,
				line:'fire',
				content:function(){
					'step 0'
					target.damage('fire');
					'step 1'
					var targets=game.filterPlayer(current=>{
						if(current==player||current==target) return false;
						return current.group==target.group;
					});
					if(targets.length){
						game.delayx();
						player.line(targets,'fire');
						targets.forEach(i=>i.damage('fire'));
					}
				},
				ai:{
					order:7,
					fireAttack:true,
					result:{
						target:function(player,target){
							var att=get.attitude(player,target);
							return get.sgn(att)*game.filterPlayer(current=>{
								if(current==player) return false;
								return current.group==target.group;
							}).reduce((num,current)=>num+get.damageEffect(current,player,player,'fire'),0);
						},
					},
				},
				derivation:['sbguanxing','sbkongcheng'],
				group:['sbhuoji_achieve','sbhuoji_fail','sbhuoji_mark'],
				subSkill:{
					achieve:{
						audio:'sbhuoji',
						trigger:{player:'phaseZhunbeiBegin'},
						filter:function(event,player){
							return player.getAllHistory('sourceDamage',evt=>(/*evt.hasNature('fire')*/evt.nature&&evt.nature=='fire')).reduce((num,evt)=>num+evt.num,0)>=game.players.length+game.dead.length;
						},
						forced:true,
						locked:false,
						skillAnimation:true,
						animationColor:'fire',
						content:function(){
							'step 0'
							player.awakenSkill('sbhuoji');
							game.log(player,'成功完成使命');
							player.changePlayerTo('sb_sp_zhugeliang','sb_zhugeliang');
							'step 1'
							player.changeSkills(['sbguanxing','sbkongcheng'], ['sbhuoji','sbkanpo'], true);
							/*var list=[];
							if(player.name&&get.character(player.name)[3].includes('sbhuoji')) list.add(player.name);
							if(player.name1&&get.character(player.name1)[3].includes('sbhuoji')) list.add(player.name1);
							if(player.name2&&get.character(player.name2)[3].includes('sbhuoji')) list.add(player.name2);
							if(list.length) list.forEach(name=>player.reinit(name,'sb_zhugeliang'));
							else{
								player.removeSkill(['sbhuoji','sbkanpo']);
								//player.addSkill(['sbguanxing','sbkongcheng']);
								player.addSkillLog('sbguanxing');
								player.addSkillLog('sbkongcheng');
							}*/
						},
					},
					fail:{
						audio:'sbhuoji',
						trigger:{player:'dying'},
						forced:true,
						locked:false,
						content:function(){
							player.awakenSkill('sbhuoji');
							game.log(player,'使命失败');
						},
					},
					mark:{
						charlotte:true,
						trigger:{source:'damage'},
						filter:function(event,player){
							//return event.hasNature('fire');
							return event.nature&&event.nature=='fire';
						},
						firstDo:true,
						forced:true,
						popup:false,
						content:function(){
							player.addTempSkill('sbhuoji_count',{player:['sbhuoji_achieveBegin','sbhuoji_failBegin']});
							player.storage.sbhuoji_count=player.getAllHistory('sourceDamage',evt=>(/*evt.hasNature('fire')*/evt.nature&&evt.nature=='fire')).reduce((num,evt)=>num+evt.num,0);
							player.markSkill('sbhuoji_count');
						},
					},
					count:{
						charlotte:true,
						intro:{content:'本局游戏已造成过#点火属性伤害'},
					},
				},
			},
			sbkanpo:{
				audio:2,
				trigger:{global:'roundStart'},
				forced:true,
				locked:false,
				get getNumber(){
					return 3;
				},
				init:function(player,skill) {
				    game.getEvent=function() {return _status.event;}
				},
				content:function(){
					'step 0'
					//var player=map.player;
					var storage=player.getStorage('sbkanpo').slice();
					if(storage.length){
						player.unmarkAuto('sbkanpo',storage);
					}
					var inpileVCardList=function(filter){
					    let list=[];
						for(const name of lib.inpile){
							const type=get.type(name);
							const info=[type,'',name];
							if(!filter||filter(info)) list.push(info);
							if(name=='sha'){
								for(const nature of lib.inpile_nature){
									const info=[type,'',name,nature];
									if(!filter||filter(info)) list.push(info);
								}
							}
						}
						return list;
					};
					const list=inpileVCardList(function(info){
						if(info[2]=='sha'&&info[3]) return false;
						return info[0]!='equip';
					});
					
					const func=()=>{
						//game.getEvent=function() {return _status.event;}
						const event=game.getEvent();
						const controls=[link=>{
							const evt=game.getEvent();
							if(link=='cancel2') ui.click.cancel();
							else{
								if(evt.dialog&&evt.dialog.buttons){
									for(let i=0;i<evt.dialog.buttons.length;i++){
										const button=evt.dialog.buttons[i];
										button.classList.remove('selectable');
										button.classList.remove('selected');
										const counterNode=button.querySelector('.caption');
										if(counterNode){
											counterNode.childNodes[0].innerHTML=``;
										}
									}
									ui.selected.buttons.length=0;
									game.check();
								}
								return;
							}
						}];
						event.controls=['清除选择','cancel2'].map(control=>{
							return ui.create.control(controls.concat(control=='清除选择'?[control,'stayleft']:control));
						});
					};
					if(event.isMine()) func();
					else if(event.isOnline()) event.player.send(func);
					/*var result=yield */player.chooseButton(['看破：是否记录三个牌名？',[list,'vcard']],[1,3],true).set('ai',function(button){
						switch(button.link[2]){
							case 'wuxie':return 5+Math.random();
							case 'sha':return 5+Math.random();
							case 'tao':return 4+Math.random();
							case 'jiu':return 3+Math.random();
							case 'lebu':return 3+Math.random();
							case 'shan':return 4.5+Math.random();
							case 'wuzhong':return 4+Math.random();
							case 'shunshou':return 2.7+Math.random();
							case 'nanman':return 2+Math.random();
							case 'wanjian':return 1.6+Math.random();
							default:return 1.5+Math.random();
						}
					}).set('filterButton',button=>{
						if(ui.selected.buttons&&ui.selected.buttons.contains(button)) {
							game.highLightCard(button,true,false/*[[255,220,170],[255,150,100],[255,50,0]]*/);
						}else {
							game.highLightCard(button,false);
						}
						return !_status.event.names.includes(button.link[2]);
					}).set('names',storage).set('custom',{
						add:{
							confirm:function(bool){
								if(bool!=true) return;
								const event=game.getEvent().parent;
								if(event.controls) event.controls.forEach(i=>i.close());
								if(ui.confirm) ui.confirm.close();
								game.uncheck();
							},
							button:function(){
								if(ui.selected.buttons.length) return;
								const event=game.getEvent();
								if(event.dialog&&event.dialog.buttons){
									for(let i=0;i<event.dialog.buttons.length;i++){
										const button=event.dialog.buttons[i];
										const counterNode=button.querySelector('.caption');
										if(counterNode){
											counterNode.childNodes[0].innerHTML=``;
										}
									}
								}
								if(!ui.selected.buttons.length){
									const evt=event.parent;
									if(evt.controls) evt.controls[0].hide();
								}
							},
						},
						replace:{
							button:function(button){
								const event=game.getEvent();
								if(!event.isMine()) return;
								if(button.classList.contains('selectable')==false) return;
								if(ui.selected.buttons.length>=lib.skill.sbkanpo.getNumber) return false;
								button.classList.add('selected');
								ui.selected.buttons.push(button);
								let counterNode=button.querySelector('.caption');
								const count=ui.selected.buttons.filter(i=>i==button).length;
								if(counterNode){
									counterNode=counterNode.childNodes[0];
									counterNode.innerHTML=`×${count}`;
								}
								else{
									counterNode=ui.create.caption(`<span style="font-size:24px; font-family:xinwei; text-shadow:#FFF 0 0 4px, #FFF 0 0 4px, rgba(74,29,1,1) 0 0 3px;">×${count}</span>`,button);
									counterNode.style.right='5px';
									counterNode.style.bottom='2px';
								}
								const evt=event.parent;
								if(evt.controls) evt.controls[0].show();
								game.check();
							},
						}
					});
					'step 1'
					if(result.bool){
						var names=result.links.map(link=>link[2]);
						//player.setStorage('sbkanpo',names);
						player.storage.sbkanpo=names;
						player.markSkill('sbkanpo');
					}
				},
				marktext:'破',
				intro:{
					markcount:function(storage,player){
						if(player.isUnderControl(true)&&storage) return storage.length;
						return '?';
					},
					mark:function(dialog,content,player){
						if(player.isUnderControl(true)){
							const storage=player.getStorage('sbkanpo');
							dialog.addText('已记录牌名：');
							dialog.noPre=true;
							dialog.addSmall([storage,'vcard']);
						}
						else{
							return `${get.translation(player)}记录了一些牌名`;
						}
					},
				},
				group:'sbkanpo_kanpo',
				subSkill:{
					kanpo:{
						audio:'sbkanpo',
						trigger:{global:'useCard'},
						filter:function(event,player){
							return event.player!=player&&player.getStorage('sbkanpo').includes(event.card.name);
						},
						prompt2:function(event,player){
							return '移除'+get.translation(event.card.name)+'的记录，令'+get.translation(event.card)+'无效';
						},
						check:function(event,player){
							var effect=0;
							if(event.card.name=='wuxie'||event.card.name=='shan'){
								if(get.attitude(player,event.player)<-1) effect=-1;
							}
							else if(event.targets&&event.targets.length){
								for(var i=0;i<event.targets.length;i++){
									effect+=get.effect(event.targets[i],event.card,event.player,player);
								}
							}
							if(effect<0){
								if(event.card.name=='sha'){
									var target=event.targets[0];
									if(target==player) return !player.countCards('h','shan');
									else return target.hp==1||(target.countCards('h')<=2&&target.hp<=2);
								}
								else return true;
							}
							return false;
						},
						logTarget:'player',
						content:function(){
							player.unmarkAuto('sbkanpo',[trigger.card.name]);
							trigger.targets.length=0;
							trigger.all_excluded=true;
						},
					},
				},
			},
			sbguanxing:{
				audio:2,
				trigger:{player:['phaseZhunbeiBegin','phaseJieshuBegin']},
				filter:function(event,player){
					return event.name=='phaseZhunbei'||(player.hasSkill('sbguanxing_on')&&player.countCards('s',card=>card.hasGaintag('sbguanxing')));
				},
				forced:true,
				locked:false,
				content:function(){
					'step 0'
					if(trigger.name=='phaseJieshu'){
						event.goto(2);
						return;
					}
					var cards=player.getCards('s',card=>card.hasGaintag('sbguanxing'));
					if(cards.length) player.loseToDiscardpile(cards);
					var bool=player.getAllHistory('useSkill',evt=>evt.skill=='sbguanxing').length>1;
					event.num=Math.min(7,bool?cards.length+1:7);
					'step 1'
					var cards2=get.cards(num);
					player.$gain2(cards2,false);
					game.log(player,'将',cards2,'置于了武将牌上');
					player.loseToSpecial(cards2,'sbguanxing').visible=true;
					player.markSkill('sbguanxing');
					'step 2'
					var cards=player.getCards('s',card=>card.hasGaintag('sbguanxing'));
					if(cards.length){
						player.chooseToMove().set('list',[
							['你的“星”',cards],
							['牌堆顶'],
						]).set('prompt','观星：点击将牌移动到牌堆顶').set('processAI',function(list){
							var cards=list[0][1].slice(),player=_status.event.player;
							var name=_status.event.getTrigger().name;
							var target=(name=='phaseZhunbei'?player:player.getNext());
							var judges=target.getCards('j');
							var top=[],att=get.sgn(get.attitude(player,target));
							if(judges.length&&att!=0&&(target!=player||!player.hasWuxie())){
								for(var i=0;i<judges.length;i++){
									var judge=(card,num)=>get.judge(card)*num;
									cards.sort((a,b)=>judge(b,att)-judge(a,att));
									if(judge(cards[0],att)<0) break;
									else top.unshift(cards.shift());
								}
							}
							return [cards,top];
						}).set('filterOk',function(moved){
							return moved[1].length;
						});
					}
					else event._result={bool:false};
					'step 3'
					if(result.bool){
						var cards=result.moved[1];
						//player.loseToDiscardpile(cards,ui.cardPile,'insert').log=false;
						//置于牌堆顶老写法
						player.lose(cards,ui.cardPile,'insert');
						game.log(player,'将',cards,'置于了牌堆顶');
					}
					else if(trigger.name=='phaseZhunbei') player.addTempSkill('sbguanxing_on');
				},
				group:'sbguanxing_unmark',
				subSkill:{
					on:{charlotte:true},
					unmark:{
						trigger:{player:'loseAfter'},
						filter:function(event,player){
							if(!event.ss||!event.ss.length) return false;
							return !player.countCards('s',card=>card.hasGaintag('sbguanxing'));
						},
						charlotte:true,
						forced:true,
						silent:true,
						content:function(){
							player.unmarkSkill('sbguanxing');
						},
					},
				},
				marktext:'星',
				intro:{
					mark:function(dialog,storage,player){
						var cards=player.getCards('s',card=>card.hasGaintag('sbguanxing'));
						if(!cards||!cards.length) return;
						dialog.addAuto(cards);
					},
					markcount:function(storage,player){
						return player.countCards('s',card=>card.hasGaintag('sbguanxing'));
					},
					onunmark:function(storage,player){
						var cards=player.getCards('s',card=>card.hasGaintag('sbguanxing'));
						if(cards.length) player.loseToDiscardpile(cards);
					},
				},
				mod:{
					aiOrder:function(player,card,num){
						var cards=player.getCards('s',card=>card.hasGaintag('sbguanxing'));
						if(get.itemtype(card)=='card'&&card.hasGaintag('sbguanxing')) return num+(cards.length>1?0.5:-0.0001);
					},
				},
			},
			sbkongcheng:{
				audio:2,
				trigger:{player:['damageBegin3','damageBegin4']},
				filter:function(event,player,name){
					if(!player.hasSkill('sbguanxing')) return false;
					const num=player.countCards('s',card=>card.hasGaintag('sbguanxing'));
					if(name=='damageBegin3'&&!num) return true;
					if(name=='damageBegin4'&&num) return true;
					return false;
				},
				forced:true,
				content:function(){
					'step 0'
					var num=player.countCards('s',card=>card.hasGaintag('sbguanxing'));
					if(!num&&event.triggername=='damageBegin3'){
						//trigger.increase('num');
						trigger.num++;
					}
					else if(num&&event.triggername=='damageBegin4'){
						player.judge(function(result){
							if(get.number(result)<=get.player().countCards('s',card=>card.hasGaintag('sbguanxing'))) return 2;
							return -1;
						}).set('judge2',result=>result.bool).set('callback',function(){
							if(event.judgeResult.number<=player.countCards('s',card=>card.hasGaintag('sbguanxing'))){
								//event.getParent('sbkongcheng').getTrigger().decrease('num');
								event.getParent('sbkongcheng').getTrigger().num--;
							}
						});
					}
				},
			},
		    //小乔
		    sbtianxiang:{
				audio:2,
				enable:'phaseUse',
				usable:3,
				discard:false,
				filter:function(event,player){
					return game.hasPlayer(current=>{
						return !current.hasMark('sbtianxiang_heart')||!current.hasMark('sbtianxiang_diamond');
					})
				},
				filterCard:function(card,player){
					return get.color(card,player)=='red';
				},
				filterTarget:function(card,player,target){
					return target!=player&&!target.hasMark('sbtianxiang_heart')&&!target.hasMark('sbtianxiang_diamond');
				},
				prompt:'将一张红色牌交给一名角色并令其获得此花色的“天香”标记',
				content:function(){
					player.give(cards,target);
					var suit=get.suit(cards[0],player);
					target.addMark('sbtianxiang_'+suit);
				},
				ai:{
					order:3,
					result:{target:-0.6},
				},
				group:['sbtianxiang_draw','sbtianxiang_tianxiang'],
				subSkill:{
					heart:{
						marktext:'天香♥',
						markcount:function(storage,player){
							return '';
						},
						intro:{
							content:function(storage,player){return '';}
						},
					},
					diamond:{
						marktext:'天香♦',
						markcount:function(storage,player){
							return '';
						},
						intro:{
							content:function(storage,player){return '';}
						},
					},
					draw:{
						trigger:{player:'phaseZhunbeiBegin'},
						locked:false,
						forced:true,
						filter:function(event,player){
							return game.hasPlayer(current=>{
								return current.hasMark('sbtianxiang_heart')||current.hasMark('sbtianxiang_diamond');
							})
						},
						content:function(){
							var num=game.countPlayer(current=>{
								return current.hasMark('sbtianxiang_heart')||current.hasMark('sbtianxiang_diamond');
							});
							game.players.forEach(current=>{
								if(current.hasMark('sbtianxiang_heart')) current.removeMark('sbtianxiang_heart');
								if(current.hasMark('sbtianxiang_diamond')) current.removeMark('sbtianxiang_diamond');
							})
							player.draw(num);
						}
					},
					tianxiang:{
						audio:'sbtianxiang',
						trigger:{
							player:"damageBegin3",
						},
						direct:true,
						filter:function(event,player){
							return game.hasPlayer(current=>{
								return current.hasMark('sbtianxiang_heart')||current.hasMark('sbtianxiang_diamond');
							})
						},
						content:function(){
							'step 0'
							player.chooseTarget('天香：是否发动〖天香〗并选择一名有“天香”标记的其他角色',function(card,player,target){
								return target!=player&(target.hasMark('sbtianxiang_heart')||target.hasMark('sbtianxiang_diamond'))
							}).set('ai',function(target){
								var player=_status.event.player;
								return -get.attitude(player,target);
							});
							'step 1'
							if(result.bool){
								var target=result.targets[0];
								player.logSkill('sbtianxiang',target);
								if(target.hasMark('sbtianxiang_heart')){
									target.removeMark('sbtianxiang_heart');
									trigger.num=0;
									target.damage(trigger.source);
									event.finish();
								}
								if(target.hasMark('sbtianxiang_diamond')){
									target.removeMark('sbtianxiang_diamond');
									event.target=target;
									if(target.countCards('he')>0) target.chooseCard(Math.min(2,target.countCards('he')),'he','天香：请交给'+get.translation(player)+'两张牌',true);
								}
							}
							'step 2'
							if(result.bool){
								event.target.give(result.cards,player);
							}
						}
					},
				},
			},
			//张郃
			sbqiaobian:{
				audio:2,
				trigger:{player:['phaseJudgeBefore','phaseDrawBefore','phaseUseBefore']},
				usable:1,
				direct:true,
				content:function(){
					'step 0'
					switch(trigger.name){
						case 'phaseJudge':
						player.chooseTarget(get.prompt('sbqiaobian'),'失去1点体力并跳过判定阶段，将判定区里的牌移动给一名其他角色',lib.filter.notMe).set('ai',function(target){
							var player=_status.event.player;
							if(player.hp+player.countCards('h',function(card){
								var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
								if(mod2!='unchanged') return mod2;
								var mod=game.checkMod(card,player,player,'unchanged','cardSavable',player);
								if(mod!='unchanged') return mod;
								var savable=get.info(card).savable;
								if(typeof savable=='function') savable=savable(card,player,player);
								return savable;
							})<=1) return 0;
							var eff=0;
							for(var card of player.getCards('j')){
								var cardx;
								if(card.viewAs) cardx=get.autoViewAs({name:card.viewAs},[card]);
								else cardx=card;
								if(target.canAddJudge(cardx)) eff+=get.effect(target,cardx,player,player);
								else eff-=get.attitude(player,target)/114514;
							}
							return eff;
						}).setHiddenSkill('sbqiaobian');
						break;
						case 'phaseDraw':
						player.chooseBool(get.prompt('sbqiaobian'),'跳过摸牌阶段，于下个准备阶段摸两张牌并回复1点体力').setHiddenSkill('sbqiaobian');
						break;
						case 'phaseUse':
						var num=(player.countCards('h')-6);
						if(num<=0) player.chooseBool(get.prompt('sbqiaobian'),'跳过出牌阶段和弃牌阶段，然后移动场上的一张牌').set('choice',player.canMoveCard(true)).setHiddenSkill('sbqiaobian');
						else player.chooseToDiscard(get.prompt('sbqiaobian'),num,'弃置'+get.cnNumber(num)+'张手牌并跳过出牌阶段和弃牌阶段，然后移动场上的一张牌').set('ai',function(card){
							var player=_status.event.player;
							if(!player.canMoveCard(true)||player.countCards('hs',card=>player.hasValueTarget(card))>=9) return 0;
							return 7-get.value(card);
						}).setHiddenSkill('sbqiaobian').logSkill='sbqiaobian';
						break;
					}
					'step 1'
					if(result.bool){
						trigger.cancel();
						switch(trigger.name){
							case 'phaseJudge':
							var target=result.targets[0];
							player.logSkill('sbqiaobian',target);
							player.loseHp();
							game.log(player,'跳过了判定阶段');
							for(var card of player.getCards('j')){
								if(target.canAddJudge(card)){
									player.$give(card,target,false);
									if(card.viewAs) target.addJudge({name:card.viewAs},[card]);
									else target.addJudge(card);
								}
								else player.discard(card);
							}
							break;
							case 'phaseDraw':
							player.logSkill('sbqiaobian');
							game.log(player,'跳过了摸牌阶段');
							player.addSkill('sbqiaobian_draw');
							break;
							case 'phaseUse':
							if(!result.cards||!result.cards.length) player.logSkill('sbqiaobian',target);
							player.skip('phaseDiscard');
							game.log(player,'跳过了出牌阶段');
							game.log(player,'跳过了弃牌阶段');
							player.moveCard();
							break;
						}
					}
					else player.storage.counttrigger.sbqiaobian--;
				},
				subSkill:{
					draw:{
						charlotte:true,
						mark:true,
						intro:{content:'准备阶段摸两张牌并回复1点体力'},
						audio:'sbqiaobian',
						trigger:{player:'phaseZhunbeiBegin'},
						forced:true,
						content:function(){
							player.removeSkill('sbqiaobian_draw');
							player.draw(2);
							player.recover();
						},
					},
				},
			},
			//萌货
			sbhuoshou:{
				audio:2,
				trigger:{
					player:'phaseUseBegin',
				},
				filter:function(event,player){
					return true;
				},
				forced:true,
				onremove:true,
				group:['sbhuoshou_cancel','sbhuoshou_source','sbhuoshou_nanmaned'],
				content:function(){
					'step 0'
					var card=get.discardPile(card=>{
						return card.name=='nanman';
					});
					if(card){
						player.gain(card,'gain2');
					}
					else{
						game.log('但是弃牌堆里并没有','#y南蛮入侵','！');
						player.addMark('sbhuoshou',1,false);
						if(player.countMark('sbhuoshou')>=5&&Math.random()<0.25) player.chat('我南蛮呢');
					}
				},
				subSkill:{
					cancel:{
						audio:'sbhuoshou',
						trigger:{target:'useCardToBefore'},
						forced:true,
						priority:15,
						filter:function(event,player){
							return (event.card.name=='nanman');
						},
						content:function(){
							trigger.cancel();
						},
					},
					source:{
						audio:'sbhuoshou',
						trigger:{global:'useCardToPlayered'},
						forced:true,
						filter:function(event,player){
							return event.isFirstTarget&&event.card&&event.card.name=='nanman'&&event.player!=player;
						},
						content:function(){
							trigger.getParent().customArgs.default.customSource=player;
						}
					},
					nanmaned:{
						trigger:{
							player:'useCard1',
						},
						filter:function(event,player){
							return event.card.name=='nanman';
						},
						forced:true,
						popup:false,
						charlotte:true,
						content:function(){
							'step 0'
							player.addTempSkill('sbhuoshou_ban','phaseUseAfter');
						}
					},
					ban:{
						charlotte:true,
						intro:{
							content:'此阶段不能再使用【南蛮入侵】',
						}
					},
				},
				mod:{
					cardEnabled:function(card,player){
						if(player.hasSkill('sbhuoshou_ban')&&card.name=='nanman') return false;
					},
				},
				ai:{
					threaten:1.9,
				}
			},
			sbzaiqi:{
				audio:2,
				trigger:{
					player:'phaseDiscardEnd',
				},
				chargeSkill:true,
				filter:function(event,player){
					return player.hasMark('charge');
				},
				group:'sbzaiqi_backflow',
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('sbzaiqi'),'选择任意名角色并消耗等量蓄力值，令这些角色选择一项：1.令你摸一张牌；2.弃置一张牌，然后你回复1点体力',[1,player.countMark('charge')]).set('ai',function(target){
						var player=_status.event.player;
						return get.attitude(player,target)+player.getDamagedHp()*3.5;
					});
					'step 1'
					if(result.bool){
						var targets=result.targets;
						targets.sortBySeat();
						event.targets=targets;
						player.logSkill('sbzaiqi',targets);
						player.removeMark('charge',targets.length);
					}
					else event.finish();
					'step 2'
					var target=targets.shift();
					event.target=target;
					if(!target.countCards('he')) event._result={bool:false};
					else target.chooseToDiscard(get.translation(player)+'对你发动了【再起】','是否弃置一张牌令其回复1点体力？或者点击“取消”，令该角色摸一张牌。','he').set('ai',card=>{
						var eff=_status.event.eff,att=_status.event.att;
						if(eff>0&&att>0||eff<=0&&att<0) return 5.5-get.value(card);
						return 0;
					}).set('eff',get.recoverEffect(player,player,target)).set('att',get.attitude(target,player));
					'step 3'
					target.line(player);
					if(result.bool){
						player.recover();
					}
					else{
						player.draw();
					}
					game.delayex();
					if(targets.length) event.goto(2);
				},
				subSkill:{
					backflow:{
						audio:'sbzaiqi',
						trigger:{
							player:'enterGame',
							source:'damageSource',
							global:'phaseBefore',
						},
						usable:window.getStrength(1,undefined,'sb_menghuo'),
						forced:true,
						locked:false,
						filter:window.getStrength(function(event,player){
							if(event.name=='damage') return true;
							return (event.name!='phase'||game.phaseNumber==0);
						},function(event,player){
							if(event.name=='phase' || !player.storage.sbzaiqi_record) {
							    player.storage.sbzaiqi_record={};
							}
							if(event.name=='damage') return event.card?.cardid;
							return (event.name!='phase'||game.phaseNumber==0);
						},'sb_menghuo'),
						content:window.getStrength(function(){
							if(player.countMark('charge')<7) player.addMark('charge',1);
						},function(){
							if(trigger.name=='damage') {
							    var markNum = trigger.num;
							    var stgNum = player.storage.sbzaiqi_record[trigger.card.cardid] || 0;
							    if(stgNum<markNum) {
							        var addNum = markNum - stgNum;
							        if(player.countMark('charge')<7) player.addMark('charge',Math.min(addNum, 7-player.countMark('charge')));
							        player.storage.sbzaiqi_record[trigger.card.cardid] = markNum;
						        }
							}else {
							    if(player.countMark('charge')<7) player.addMark('charge',Math.min(3, 7-player.countMark('charge')));
							}
						},'sb_menghuo'),
					}
				}
			},
			//祝融
			sblieren:{
				audio:2,
				trigger:{player:'useCardToPlayered'},
				filter:function(event,player){
					return event.targets.length==1&&event.card.name=='sha'&&player.canCompare(event.target);
				},
				check:function(event,player){
					return get.attitude(player,event.target)<0||game.hasPlayer(current=>{
						return get.damageEffect(current,player,player)>0;
					});
				},
				shaRelated:true,
				logTarget:'target',
				content:function(){
					'step 0'
					if(player.canCompare(trigger.target)) player.chooseToCompare(trigger.target);
					'step 1'
					if(result.bool){
						player.addTempSkill('sblieren_damage');
						if(!trigger.card.storage) trigger.card.storage={};
						trigger.card.storage.sblieren=[player,trigger.target];
					}
				},
				subSkill:{
					damage:{
						audio:'sblieren',
						trigger:{global:'useCardAfter'},
						filter:function(event,player){
							return event.card.name=='sha'&&event.card.storage&&event.card.storage.sblieren&&event.card.storage.sblieren[0]==player&&game.hasPlayer(current=>{
								return !event.card.storage.sblieren.contains(current);
							});
						},
						direct:true,
						charlotte:true,
						content:function(){
							'step 0'
							var target=trigger.card.storage.sblieren[1];
							player.chooseTarget('烈刃：是否对除'+get.translation(target)+'外的一名其他角色造成1点伤害？',(card,player,target)=>{
								return target!=_status.event.targeted&&target!=player;
							}).set('targeted',target);
							'step 1'
							if(result.bool){
								var target=result.targets[0];
								player.logSkill('sblieren_damage',target);
								target.damage();
							}
						}
					}
				}
			},
			sbjuxiang:{
				audio:2,
				trigger:{
					player:'phaseJieshuBegin',
				},
				forced:true,
				direct:true,
				filter:function(event,player){
					return !player.hasHistory('useCard',evt=>evt.card.name=='nanman')&&(!_status.sbjuxiang_nanman||_status.sbjuxiang_nanman.length);
				},
				group:['sbjuxiang_cancel','sbjuxiang_gain'],
				content:function(){
					'step 0'
					if(!_status.sbjuxiang_nanman){
						_status.sbjuxiang_nanman=[
							{name:'nanman',number:7,suit:'spade'},
							{name:'nanman',number:7,suit:'club'},
						];
						game.broadcastAll(function(){
							if(!lib.inpile.contains('nanman')) lib.inpile.add('nanman');
						});
					}
					player.chooseTarget(get.prompt('sbjuxiang'),'将游戏外的随机一张【南蛮入侵】交给一名角色（剩余'+get.cnNumber(_status.sbjuxiang_nanman.length)+'张）').set('ai',target=>{
						var player=_status.event.player;
						return Math.max(0,target.getUseValue({name:'nanman'}))*get.attitude(player,target)*(target==player?0.5:1);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('sbjuxiang',target);
						if(!_status.sbjuxiang_nanman.length) return;
						var info=_status.sbjuxiang_nanman.randomRemove();
						var card=game.createCard2(info);
						target.gain(card,'gain2').giver=player;
					}
				},
				ai:{
					expose:0.05,
					effect:{
						target:function(card){
							if(card.name=='nanman') return [0,1];
						}
					}
				},
				subSkill:{
					cancel:{
						audio:'sbjuxiang',
						trigger:{target:'useCardToBefore'},
						forced:true,
						priority:15,
						filter:function(event,player){
							return event.card.name=='nanman';
						},
						content:function(){
							trigger.cancel();
						}
					},
					gain:{
						audio:'sbjuxiang',
						trigger:{global:'useCardAfter'},
						forced:true,
						filter:function(event,player){
							return event.card.name=='nanman'&&event.player!=player&&event.cards.filterInD().length;
						},
						content:function(){
							player.gain(trigger.cards.filterInD(),'gain2');
						}
					}
				}
			},
			//阿笨
			sbjiang:{
				audio:2,
				trigger:{
					player:'useCardToPlayered',
					target:'useCardToTargeted',
				},
				shaRelated:true,
				filter:function(event,player){
					if(!(event.card.name=='juedou'||(event.card.name=='sha'&&get.color(event.card)=='red'))) return false;
					return true;
				},
				frequent:true,
				onremove:true,
				group:['sbjiang_add','sbjiang_qiben'],
				content:function(){
					player.draw();
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(card.name=='sha'&&get.color(card)=='red') return [1,0.6];
						},
						player:function(card,player,target){
							if(card.name=='sha'&&get.color(card)=='red') return [1,1];
						}
					}
				},
				subSkill:{
					add:{
						audio:'sbjiang',
						trigger:{player:'useCard2'},
						direct:true,
						filter:function(event,player){
							if(event.card.name!='juedou') return false;
							var info=get.info(event.card);
							if(info.allowMultiple==false) return false;
							if(event.targets&&!info.multitarget){
								if(game.hasPlayer(function(current){
									return !event.targets.contains(current)&&lib.filter.targetEnabled2(event.card,player,current)&&lib.filter.targetInRange(event.card,player,current);
								})){
									return true;
								}
							}
							return false;
						},
						content:function(){
							'step 0'
							var prompt2='为'+get.translation(trigger.card)+'额外指定一个目标，然后失去1点体力';
							player.chooseTarget(get.prompt('sbjiang_add'),function(card,player,target){
								var player=_status.event.player;
								if(_status.event.targets.contains(target)) return false;
								return lib.filter.targetEnabled2(_status.event.card,player,target);
							}).set('prompt2',prompt2).set('ai',function(target){
								var trigger=_status.event.getTrigger();
								var player=_status.event.player;
								var eff=get.effect(target,trigger.card,player,player);
								if(player.hasZhuSkill('sbzhiba')&&!player.hasMark('sbjiang')) return eff;
								if(eff+get.effect(player,{name:'losehp'},player)/8>0) return eff;
								return 0;
							}).set('targets',trigger.targets).set('card',trigger.card);
							'step 1'
							if(result.bool){
								if(!event.isMine()&&!event.isOnline()) game.delayx();
								event.targets=result.targets;
							}
							else{
								event.finish();
							}
							'step 2'
							if(event.targets){
								player.logSkill('sbjiang_add',event.targets);
								trigger.targets.addArray(event.targets);
								player.loseHp();
							}
						}
					},
					qiben:{
						audio:'sbjiang',
						enable:'phaseUse',
						viewAs:{name:'juedou'},
						filterCard:true,
						position:'h',
						selectCard:-1,
						prompt:function(){
							var player=_status.event.player;
							var limit=(player.hasMark('sbjiang')?(game.countPlayer(current=>{
								return current.group=='wu'&&current!=player;
							})+1):1);
							return '出牌阶段限'+get.cnNumber(limit)+'次。你可以将所有手牌当【决斗】使用';
						},
						filter:function(event,player){
							var limit=player.hasMark('sbjiang')?(game.countPlayer(current=>{
								return current.group=='wu'&&current!=player;
							})+1):1;
							if((player.getStat('skill').sbjiang_qiben||0)>=limit) return false;
							var hs=player.getCards('h');
							if(!hs.length) return false;
							for(var i=0;i<hs.length;i++){
								var mod2=game.checkMod(hs[i],player,'unchanged','cardEnabled2',player);
								if(mod2===false) return false;
							}
							return event.filterCard(get.autoViewAs({name:'juedou'},hs));
						},
						ai:{order:0.001},
					}
				},
			},
			sbhunzi:{
				audio:2,
				trigger:{player:'dyingAfter'},
				juexingji:true,
				forced:true,
				skillAnimation:true,
				animationColor:'wood',
				derivation:['sbyingzi','gzyinghun'],
				content:function(){
					'step 0'
					player.awakenSkill('sbhunzi');
					player.loseMaxHp();
					'step 1'
					player.changeHujia(1,null,true);
					'step 2'
					player.draw(3);
					'step 3'
					player.addSkillLog('sbyingzi');
					player.addSkillLog('gzyinghun');
				},
				ai:{
					threaten:function(player,target){
						if(target.hp==1) return 2;
						return 0.5;
					},
					maixie:true,
					effect:{
						target:function(card,player,target){
							if(!target.hasFriend()||target.hp>1) return;
							if(get.tag(card,'damage')==1&&((target.hasZhuSkill('sbzhiba')&&game.countPlayer(current=>current!=target&&current.group=='wu'))||player.countCards('hs',card=>player.canSaveCard(card,target))+target.countCards('hs',card=>target.canSaveCard(card,target))>0)&&!target.isTurnedOver()&&_status.currentPhase!=target&&get.distance(_status.currentPhase,target,'absolute')<=3) return [0.5,1];
						}
					}
				}
			},
			sbzhiba:{
				audio:2,
				trigger:{player:'dying'},
				filter:function(event,player){
					if(!player.hasZhuSkill('sbzhiba')) return false;
					return player.hp<=0;
				},
				zhuSkill:true,
				limited:true,
				mark:true,
				skillAnimation:true,
				animationColor:'wood',
				content:function(){
					'step 0'
					player.awakenSkill('sbzhiba');
					event.targets=game.filterPlayer(current=>{
						return current.group=='wu'&&current!=player;
					}).sortBySeat(_status.currentPhase);
					var num=event.targets.length;
					if(num>0) player.recover(num);
					player.addMark('sbjiang',1,false);
					player.addTempSkill('sbzhiba_draw');
					if(!event.targets.length) event.finish();
					'step 1'
					var target=targets.shift();
					target.damage('nosource');
					if(targets.length) event.redo();
				},
				subSkill:{
					draw:{
						trigger:{global:'dieAfter'},
						filter:function(event,player){
							return event.getParent(3).name=='sbzhiba';
						},
						forced:true,
						charlotte:true,
						content:function(){
							player.draw(3);
						}
					}
				}
			},
			//大乔
			sbguose:{
				audio:2,
				enable:'phaseUse',
				usable:4,
				discard:false,
				lose:false,
				delay:false,
				filter:function(event,player){
					return player.countCards('hes',{suit:'diamond'})>0||game.hasPlayer(current=>{
					    return current.hasJudge('lebu');
					});
				},
				position:'hes',
				filterCard:{suit:'diamond'},
				selectCard:[0,1],
				filterTarget:function(card,player,target){
					if(!ui.selected.cards.length){
						if(target.hasJudge('lebu')) return true;
						return false;
					}
					if(player==target) return false;
					var mod=game.checkMod(ui.selected.cards[0],player,'unchanged','cardEnabled2',player);
					if(!mod) return false;
					return player.canUse({name:'lebu',cards:ui.selected.cards},target);
				},
				check:function(card){
					return 7-get.value(card);
				},
				content:function(){
					'step 0'
					if(target.hasJudge('lebu')){
						target.discard(target.getJudge('lebu'));
					}
					else{
						player.useCard({name:'lebu'},target,cards).audio=false;
					}
					'step 1'
					player.draw();
				},
				ai:{
					result:{
						target:function(player,target){
							if(target.hasJudge('lebu')) return -get.effect(target,{name:'lebu'},player,target);
							return get.effect(target,{name:'lebu'},player,target);
						}
					},
					order:9,
				}
			},
			sbliuli:{
				audio:2,
				inherit:'liuli',
				group:'sbliuli_heart',
				subSkill:{
					heart:{
						trigger:{player:'logSkill'},
						filter:function(event,player){
							if(event.skill!='sbliuli') return false;
							if(player.hasSkill('sbliuli_used')) return false;
							var evt=event.log_event;
							return player.hasHistory('lose',evtx=>{
								return evtx.getParent(2)==evt&&get.suit(evtx.cards[0])=='heart';
							});
						},
						direct:true,
						content:function(){
							'step 0'
							var sourcex=trigger.log_event.getTrigger().player;
							player.chooseTarget('流离：是否令一名不为'+get.translation(sourcex)+'的其他角色获得“流离”标记？',(card,player,target)=>{
								return target!=player&&target!=_status.event.sourcex;
							}).set('ai',target=>{
								return get.attitude(_status.event.player,target);
							}).set('sourcex',sourcex);
							'step 1'
							if(result.bool){
								var target=result.targets[0];
								player.line(target,'green');
								game.countPlayer(i=>i.removeSkill('sbliuli_dangxian'));
								target.addSkill('sbliuli_dangxian');
								player.addTempSkill('sbliuli_used');
							}
						}
					},
					used:{charlotte:true},
					dangxian:{
						trigger:{player:'phaseBegin'},
						forced:true,
						charlotte:true,
						mark:true,
						marktext:'流',
						intro:{content:'回合开始时，执行一个额外的出牌阶段'},
						content:function(){
							var next=player.phaseUse();
							event.next.remove(next);
							trigger.next.push(next);
							player.removeSkill('sbliuli_dangxian');
						}
					}
				}
			},
			//刘表
			sbzishou:{
				audio:2,
				trigger:{global:'phaseJieshuBegin'},
				filter:function(event,player){
					if(player==event.player) return false;
					if(!event.player.countCards('he')) return false;
					return !event.player.hasAllHistory('sourceDamage',evt=>{
						return evt.player==player;
					})&&!event.player.hasAllHistory('damage',evt=>{
						return evt.source==player;
					});
				},
				forced:true,
				logTarget:'player',
				content:function(){
					'step 0'
					trigger.player.chooseCard(true,get.translation(player)+'对你发动了【自守】','交给其一张牌','he');
					'step 1'
					if(result.bool){
						trigger.player.give(result.cards,player);
					}
				},
				ai:{
					threaten:3,
				}
			},
			sbzongshi:{
				audio:2,
				trigger:{player:'damageEnd'},
				filter:function(event,player){
					if(!event.source||!event.source.isIn()) return false;
					return !player.getStorage('sbzongshi').contains(event.source);
				},
				forced:true,
				onremove:true,
				logTarget:'source',
				content:function(){
					trigger.source.chooseToDiscard(true,trigger.source.countCards('h'));
					player.markAuto('sbzongshi',[trigger.source]);
				},
				intro:{
					content:'已扒过目标：$'
				},
				ai:{
					threaten:0.5,
					effect:{
						target:function(card,player,target,current){
							if(player._sbzongshi_aiChecking) return;
							if(!get.tag(card,'damage')) return;
							var cards=player.getCards('h');
							if(!target.hasFriend()) return;
							player._sbzongshi_aiChecking=true;
							var value=cards.reduce((p,c)=>{
								return p+get.value(c);
							},0);
							delete player._sbzongshi_aiChecking;
							if(cards.length>5||value>5*cards.length) return [1,0,0,-cards.length/2];
							return [1,0,0,-0.5];
						}
					}
				}
			},
			//貂蝉
			sblijian:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return game.countPlayer(current=>{
						return current!=player;
					})>1;
				},
				//Helasisy修：修好不发动技能的bug，方法很蠢，但有效
				check:function(card){
				    return 10-get.value(card);
				},
				filterCard:true,
				selectCard:function(){
				    var player=_status.event.player;
				    if((game.me!=player&&player.isUnderControl())||_status.auto) {
				        var players=game.countPlayer(function(current){
				            return get.attitude(player,current)<-1;
				        })-1;
				        var cards=player.countCards('h',function(card){
				            return get.value(card,player)<10;
				        });
				        var num=Math.min(players,cards);
				        window.nimabi=num;
				        return Math.max(1,num);
				    } 
				    return [1,Infinity];
				},
				position:'he',
				filterTarget:lib.filter.notMe,
				selectTarget:function(){
				    var player=_status.event.player;
				    if((game.me!=player&&player.isUnderControl())||_status.auto) {
				        var players=game.countPlayer(function(current){
				            return get.attitude(player,current)<-1;
				        })-1;
				        var cards=player.countCards('h',function(card){
				            return get.value(card,player)<10;
				        });
				        var num=Math.min(players,cards);
				        return Math.max(1,num)+1;
				    }
					return ui.selected.cards.length+1;
				},
				filterOk:function(){
					//var player=_status.event.player;
					//if((game.me!=player&&player.isUnderControl())||_status.auto) return false;
					return ui.selected.targets.length==ui.selected.cards.length+1;
				},
				multiline:true,
				content:function(){
					var targetx=targets.slice().sortBySeat(target)[1];
					var card={name:'juedou',isCard:true};
					if(target.canUse(card,targetx)) target.useCard(card,targetx);
				},
				ai:{
					threaten:3,
					order:7,
					result:{target:-1}
				}
			},
			sbbiyue:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				forced:true,
				content:function(){
					player.draw(Math.min(4,game.countPlayer2(current=>{
						return current.getHistory('damage').length>0;
					})+1));
				}
			},
			//陈宫
			sbmingce:{
				audio:2,
				enable:'phaseUse',
				usable:window.getStrength(1,2,'sb_chengong'),
				position:'he',
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				filterCard:true,
				check:function(card){
					return 8-get.value(card)
				},
				filterTarget:lib.filter.notMe,
				selectTarget:1,
				discard:false,
				lose:false,
				delay:false,
				onremove:true,
				group:'sbmingce_hit',
				content:function(){
					'step 0'
					player.give(cards,target);
					'step 1'
					var choices=['选项二'];
					var choiceList=[
						'失去1点体力，令'+get.translation(player)+'摸两张牌并获得1枚“策”',
						'摸一张牌'
					];
					if(target.hp>0) choices.unshift('选项一');
					else choiceList[0]='<span style="opacity:0.5">'+choiceList[0]+'</span>';
					target.chooseControl(choices).set('choiceList', choiceList).set('prompt',get.translation(player)+'对你发动了【明策】，请选择一项').set('ai',()=>{
						return _status.event.choice;
					}).set('choice',target.hp<=0||((target.hp+target.countCards('hs','tao')>2&&get.attitude(target,player)>0)||get.effect(target,{name:'losehp'},target,target)>0)&&target.hp>0?0:1);
					'step 2'
					if(result.control=='选项一'){
						target.loseHp();
						player.draw(2);
					}
					else{
						target.draw();
						event.finish();
					}
					'step 3'
					player.addMark('sbmingce',1);
				},
				marktext:'策',
				intro:{
					name:'明策',
					name2:'策',
					content:'mark'
				},
				ai:{
					result:{
						player:0.5,
						target:1,
					},
					order:8.5,
					expose:0.2
				},
				subSkill:{
					hit:{
						audio:'sbmingce',
						trigger:{player:'phaseUseBegin'},
						filter:function(event,player){
							return player.hasMark('sbmingce');
						},
						direct:true,
						content:function(){
							'step 0'
							var num=player.countMark('sbmingce');
							event.num=num;
							player.chooseTarget(get.prompt('sbmingce'),'移去所有“策”，对一名其他角色造成'+num+'点伤害',lib.filter.notMe).set('ai',target=>{
								var player=_status.event.player;
								var eff=get.damageEffect(target,player,player);
								var num=player.countMark('sbmingce');
								if(target.hasSkillTag('filterDamage',null,{player:player})) num=1;
								return eff*num;
							});
							'step 1'
							if(result.bool){
								var target=result.targets[0];
								player.logSkill('sbmingce_hit',target);
								player.removeMark('sbmingce',num);
								target.damage(num);
							}
						}
					}
				}
			},
			sbzhichi:{
				audio:2,
				trigger:{player:'damageEnd'},
				forced:true,
				content:function(){
					player.addTempSkill('sbzhichi_muteki');
				},
				subSkill:{
					muteki:{
						audio:'sbzhichi',
						trigger:{player:'damageBegin4'},
						charlotte:true,
						forced:true,
						group:'sbzhichi_egg',
						content:function(){
							trigger.cancel();
						},
						mark:true,
						intro:{content:'我无敌啦！'},
						ai:{
							maixie:true,
							maixie_hp:true,
							nofire:true,
							nothunder:true,
							nodamage:true,
							effect:{
								target:function(card,player,target,current){
									if(get.tag(card,'damage')) return 'zeroplayertarget';
								}
							},
						}
					},
					egg:{
						trigger:{player:'die'},
						charlotte:true,
						forced:true,
						silent:true,
						forceDie:true,
						content:function(){
							player.chat('你是真滴牛批');
						}
					}
				}
			},
			//袁绍
			sbluanji:{
				audio:2,
				enable:'phaseUse',
				trigger:{global:'respond'},
				viewAs:{name:'wanjian'},
				forced:true,
				locked:false,
				filter:function(event,player){
					if(event.name=='chooseToUse') return player.countCards('hs')>1&&!player.hasSkill('sbluanji_used');
					var evt=event.getParent(2);
					return evt.name=='wanjian'&&evt.getParent().player==player&&event.player!=player&&player.getHistory('gain',function(evt){
						return evt.getParent(2).name=='sbluanji';
					}).length<3;
				},
				filterCard:true,
				selectCard:2,
				position:'hs',
				prompt:'将两张手牌当【万箭齐发】使用',
				check:function(card){
					var player=_status.event.player;
					var targets=game.filterPlayer(function(current){
						return player.canUse('wanjian',current);
					});
					var num=0;
					for(var i=0;i<targets.length;i++){
						var eff=get.sgn(get.effect(targets[i],{name:'wanjian'},player,player));
						if(targets[i].hp==1){
							eff*=1.5;
						}
						if(get.attitude(player,targets[i])==0||targets[i].group=='qun'){
							eff+=0.5;
						}
						num+=eff;
					}
					if(!player.needsToDiscard(-1)){
						if(targets.length>=7){
							if(num<1) return 0;
						}
						else if(targets.length>=5){
							if(num<0.5) return 0;
						}
					}
					return 6-get.value(card);
				},
				content:function(){
					player.draw();
				},
				precontent:function(){
					player.addTempSkill('sbluanji_used','phaseUseAfter');
				},
				ai:{
					threaten:1.6,
				},
				subSkill:{used:{charlotte:true}}
			},
			sbxueyi:{
				audio:2,
				trigger:{player:'useCardToTargeted'},
				filter:function(event,player){
					return player.hasZhuSkill('sbxueyi')&&event.target!=player&&event.target.group=='qun';
				},
				zhuSkill:true,
				forced:true,
				usable:2,
				logTarget:'target',
				content:function(){
					player.draw();
				},
				mod:{
					maxHandcard:function(player,num){
						if(player.hasZhuSkill('sbxueyi')){
							return num+2*game.countPlayer(current=>player!=current&&current.group=='qun');
						}
					}
				},
				ai:{
					effect:{
						player:function(card,player,target){
							if(player!=target&&target&&target.group=='qun'&&card.name!='tao') return [1,0.1];
						},
					},
				}
			},
			//庞统
			sblianhuan:window.getStrength({
				audio:2,
				enable:'phaseUse',
				filterCard:{suit:'club'},
				filter:(event,player)=>player.hasCard(card=>lib.skill.sblianhuan.filterCard(card,player),lib.skill.sblianhuan.position),
				filterTarget:function(card,player,target){
					if(player.hasSkill('sblianhuan_blocker')) return false;
					if(!ui.selected.cards.length) return false;
					card=get.autoViewAs({name:'tiesuo'},[ui.selected.cards[0]]);
					return player.canUse(card,target);
				},
				filterCard:(card,player)=>get.suit(card)=='club'&&(!player.hasSkill('sblianhuan_blocker')||player.canRecast(card)),
				selectCard:1,
				position:'hs',
				derivation:'sblianhuan_lv2',
				selectTarget:function(){
					var card=get.card(),player=get.player();
					if(player.hasSkill('sblianhuan_blocker')) return 0;
					if(card==undefined) return;
					var range=[0,2];
					game.checkMod(card,player,range,'selectTarget',player);
					return range;
				},
				filterOk:function(){
					var card=ui.selected.cards[0];
					if(!card) return false;
					if(get.position(card)=='s'&&!ui.selected.targets.length) return false;
					return true;
				},
				check:function(card){
					return 6-get.value(card);
				},
				prompt:function(){
					var player=_status.event.player,use=!player.hasSkill('sblianhuan_blocker');
					return '重铸一张♣手牌'+(use?'；或将一张♣手牌当【铁索连环】使用':'');
				},
				group:['sblianhuan_use','sblianhuan_add','sblianhuan_discard2'],
				multitarget:true,
				multiline:true,
				discard:false,
				lose:false,
				delay:false,
				content:function(){
					'step 0'
					if(targets.length){
						player.addTempSkill('sblianhuan_blocker','phaseUseAfter');
						var card=get.autoViewAs({name:'tiesuo'},cards);
						player.useCard(card,cards,targets);
					}
					else{
						player.loseToDiscardpile(cards);
						player.draw(cards.length);
					}
				},
				subSkill:{
					blocker:{charlotte:true},
					use:{
						audio:'sblianhuan',
						trigger:{player:'useCard'},
						filter:function(event,player){
							return event.card.name=='tiesuo'&&!player.storage.sblianhuan;
						},
						check:function(event,player){
							var eff=0,targets=event.targets.filter(i=>!i.isLinked());
							for(var target of targets){
								eff+=get.attitude(player,target);
							}
							return eff<-1;
						},
						prompt2:'失去1点体力，然后当此牌指定第一个目标后，你随机弃置所有不处于连环状态的目标角色各一张手牌',
						content:function(){
							'step 0'
							player.loseHp();
							'step 1'
							if(!trigger.card.storage) trigger.card.storage={};
							trigger.card.storage.sblianhuan=true;
							trigger._sblianhuan=true;
							player.addTempSkill('sblianhuan_discard','phaseUseAfter');
						}
					},
					discard:{
						trigger:{global:'useCardToPlayered'},
						forced:true,
						locked:false,
						popup:false,
						charlotte:true,
						filter:function(event,player){
							return event.isFirstTarget&&event.card.storage&&event.card.storage.sblianhuan;
						},
						content:function(){
							'step 0'
							event.targets=trigger.targets.filter(i=>!i.isLinked());
							player.logSkill('sblianhuan_discard',event.targets);
							'step 1'
							var target=targets.shift();
							if(target!=undefined) {
    							var cards=target.getCards('h',card=>{
    								return lib.filter.cardDiscardable(card,player,'sblianhuan');
    							});
    							if(cards.length>0){
    								player.line(target);
    								target.discard(cards.randomGet());
    							}
							}
							if(targets.length) event.redo();
						}
					},
					add:{
						trigger:{player:'useCard2'},
						filter:function(event,player){
							return event.card.name=='tiesuo'&&player.storage.sblianhuan&&game.hasPlayer(current=>{
								return !event.targets.contains(current)&&player.canUse(event.card,current);
							});
						},
						direct:true,
						content:function(){
							'step 0'
							player.chooseTarget(get.prompt('sblianhuan_add'),'为'+get.translation(trigger.card)+'额外指定任意个目标',[1,Infinity],function(card,player,target){
								return !_status.event.sourcex.contains(target)&&player.canUse(_status.event.card,target);
							}).set('sourcex',trigger.targets).set('ai',function(target){
								var player=_status.event.player;
								return get.effect(target,_status.event.card,player,player);
							}).set('card',trigger.card);
							'step 1'
							if(result.bool){
								if(!event.isMine()&&!event.isOnline()) game.delayx();
								event.targets=result.targets;
							}
							else{
								event.finish();
							}
							'step 2'
							player.logSkill('sblianhuan_add',event.targets);
							trigger.targets.addArray(event.targets);
						}
					},
					discard2:{
						trigger:{player:'useCardToPlayered'},
						forced:true,
						locked:false,
						popup:false,
						filter:function(event,player){
							return event.isFirstTarget&&event.card.name=='tiesuo'&&player.storage.sblianhuan&&!event.getParent()._sblianhuan;
						},
						content:function(){
							'step 0'
							event.targets=trigger.targets.filter(i=>!i.isLinked());
							if(!event.targets.length) event.finish();
							else player.logSkill('sblianhuan_discard2',event.targets);
							'step 1'
							var target=targets.shift();
							if(target!=undefined) {
    							var cards=target.getCards('h',card=>{
    								return lib.filter.cardDiscardable(card,player,'sblianhuan');
    							});
    							if(cards.length>0){
    								player.line(target);
    								target.discard(cards.randomGet());
    							}
							}
							if(targets.length) event.redo();
						}
					},
				}
			},{
				audio:2,
				enable:'phaseUse',
				filterCard:{suit:'club'},
				filter:(event,player)=>player.hasCard(card=>lib.skill.sblianhuan.filterCard(card,player),lib.skill.sblianhuan.position),
				filterTarget:function(card,player,target){
					if(player.hasSkill('sblianhuan_blocker')) return false;
					if(!ui.selected.cards.length) return false;
					card=get.autoViewAs({name:'tiesuo'},[ui.selected.cards[0]]);
					return player.canUse(card,target);
				},
				filterCard:(card,player)=>get.suit(card)=='club'&&(!player.hasSkill('sblianhuan_blocker')||player.canRecast(card)),
				selectCard:1,
				position:'hes',
				derivation:'sblianhuan_lv2',
				selectTarget:function(){
					var card=get.card(),player=get.player();
					if(player.hasSkill('sblianhuan_blocker')) return 0;
					if(card==undefined) return;
					var range=[0,2];
					game.checkMod(card,player,range,'selectTarget',player);
					return range;
				},
				filterOk:function(){
					var card=ui.selected.cards[0];
					if(!card) return false;
					if(get.position(card)=='s'&&!ui.selected.targets.length) return false;
					return true;
				},
				check:function(card){
					return 6-get.value(card);
				},
				prompt:function(){
					var player=_status.event.player,use=!player.hasSkill('sblianhuan_blocker');
					return '重铸一张♣️牌'+(use?'；或将一张♣️牌当【铁索连环】使用':'');
				},
				group:['sblianhuan_use','sblianhuan_add','sblianhuan_discard2'],
				multitarget:true,
				multiline:true,
				discard:false,
				lose:false,
				delay:false,
				content:function(){
					'step 0'
					if(targets.length){
						//player.addTempSkill('sblianhuan_blocker','phaseUseAfter');
						var card=get.autoViewAs({name:'tiesuo'},cards);
						player.useCard(card,cards,targets);
					}
					else{
						player.loseToDiscardpile(cards);
						player.draw(cards.length);
					}
				},
				ai:{
				    basic:{
				        order:1,
				    },
				    result:{
				        player:1,
				        target:function(player,target){
				            var hastarget=game.hasPlayer(function(current){
						        return get.attitude(player,current)<0;
						    });
						    if((player.storage.sbniepan||player.getHp()==1)&&target==player&&hastarget) {
				                if(target.isLinked()) {
				                    return -2;
				                }else {
				                    return 2;
				                }
				            }
				            if(target.isLinked()){
				                return 2;
				            }else {
				                return -2;
				            }
				        }
				    },
				},
				subSkill:{
					blocker:{charlotte:true},
					use:{
						audio:'sblianhuan',
						trigger:{player:'useCard'},
						filter:function(event,player){
							return event.card.name=='tiesuo'&&!player.storage.sblianhuan;
						},
						check:function(event,player){
							var eff=0,targets=event.targets.filter(i=>!i.isLinked());
							var eff2=0;
							for(var target of targets){
								eff+=get.attitude(player,target);
								if(player!=target) eff2+=get.attitude(player,target);
							}
							if((eff!=eff2||(eff==eff2&&player.isLinked()))&&player.getHp()==1) {
							    return eff<0;
							}
							return eff<-1;
						},
						prompt2:'失去1点体力，然后当此牌指定第一个目标后，你随机弃置所有不处于连环状态的目标角色各一张手牌',
						content:function(){
							'step 0'
							player.loseHp();
							'step 1'
							if(!trigger.card.storage) trigger.card.storage={};
							trigger.card.storage.sblianhuan=true;
							trigger._sblianhuan=true;
							player.addTempSkill('sblianhuan_discard','phaseUseAfter');
						}
					},
					discard:{
						trigger:{global:'useCardToPlayered'},
						forced:true,
						locked:false,
						popup:false,
						charlotte:true,
						filter:function(event,player){
							return event.isFirstTarget&&event.card.storage&&event.card.storage.sblianhuan;
						},
						content:function(){
							'step 0'
							event.targets=trigger.targets.filter(i=>!i.isLinked());
							player.logSkill('sblianhuan_discard',event.targets);
							'step 1'
							var target=targets.shift();
							if(target!=undefined) {
    							var cards=target.getCards('h',card=>{
    								return lib.filter.cardDiscardable(card,player,'sblianhuan');
    							});
    							if(cards.length>0){
    								player.line(target);
    								target.discard(cards.randomGet());
    							}
							}
							if(targets.length) event.redo();
						}
					},
					add:{
						trigger:{player:'useCard2'},
						filter:function(event,player){
							return event.card.name=='tiesuo'&&player.storage.sblianhuan&&game.hasPlayer(current=>{
								return !event.targets.contains(current)&&player.canUse(event.card,current);
							});
						},
						direct:true,
						content:function(){
							'step 0'
							player.chooseTarget(get.prompt('sblianhuan_add'),'为'+get.translation(trigger.card)+'额外指定任意个目标',[1,Infinity],function(card,player,target){
								return !_status.event.sourcex.contains(target)&&player.canUse(_status.event.card,target);
							}).set('sourcex',trigger.targets).set('ai',function(target){
								var player=_status.event.player;
								return get.effect(target,_status.event.card,player,player);
							}).set('card',trigger.card);
							'step 1'
							if(result.bool){
								if(!event.isMine()&&!event.isOnline()) game.delayx();
								event.targets=result.targets;
							}
							else{
								event.finish();
							}
							'step 2'
							player.logSkill('sblianhuan_add',event.targets);
							trigger.targets.addArray(event.targets);
						}
					},
					discard2:{
						trigger:{player:'useCardToPlayered'},
						forced:true,
						locked:false,
						popup:false,
						filter:function(event,player){
							return event.isFirstTarget&&event.card.name=='tiesuo'&&player.storage.sblianhuan&&!event.getParent()._sblianhuan;
						},
						content:function(){
							'step 0'
							event.targets=trigger.targets.filter(i=>!i.isLinked());
							if(!event.targets.length) event.finish();
							else player.logSkill('sblianhuan_discard2',event.targets);
							'step 1'
							var target=targets.shift();
							if(target!=undefined) {
    							var cards=target.getCards('h',card=>{
    								return lib.filter.cardDiscardable(card,player,'sblianhuan');
    							});
    							if(cards.length>0){
    								player.line(target);
    								target.discard(cards.randomGet());
    							}
							}
							if(targets.length) event.redo();
						}
					},
				}
			},'sb_pangtong'),
			sbniepan:window.getStrength({
				audio:2,
				enable:'chooseToUse',
				mark:true,
				skillAnimation:true,
				limited:true,
				animationColor:'orange',
				filter:function(event,player){
					return event.type=='dying'&&player==event.dying;
				},
				content:function(){
					'step 0'
					player.awakenSkill('sbniepan');
					player.discard(player.getCards('hej'));
					'step 1'
					player.draw(2);
					'step 2'
					if(player.hp<2) player.recover(2-player.hp);
					'step 3'
					player.turnOver(false);
					'step 4'
					player.link(false);
					'step 5'
					player.storage.sblianhuan=true;
					game.log(player,'修改了','#g【连环】');
				},
				ai:{
					order:1,
					skillTagFilter:function(player,arg,target){
						if(player!=target||player.storage.sbniepan) return false;
					},
					save:true,
					result:{
						player:function(player){
							if(player.hp<=0) return 10;
							return 0;
						}
					},
					threaten:function(player,target){
						if(!target.storage.sbniepan) return 0.6;
						return 1.5;//觉醒后嘲讽很高
					}
				}
			},{
				audio:2,
				enable:'chooseToUse',
				mark:true,
				skillAnimation:true,
				limited:true,
				animationColor:'orange',
				filter:function(event,player){
					return event.type=='dying'&&player==event.dying;
				},
				content:function(){
					'step 0'
					player.awakenSkill('sbniepan');
					player.discard(player.getCards('hej'));
					'step 1'
					player.draw(3);
					'step 2'
					if(player.hp<3) player.recover(3-player.hp);
					'step 3'
					player.changeHujia(3,null,true);
					'step 3'
					player.turnOver(false);
					'step 4'
					player.link(false);
					'step 5'
					player.storage.sblianhuan=true;
					game.log(player,'修改了','#g【连环】');
					'step 6'
					player.addSkill('sbniepan_damage');
				},
				ai:{
					order:1,
					skillTagFilter:function(player,arg,target){
						if(player!=target||player.storage.sbniepan) return false;
					},
					save:true,
					result:{
						player:function(player){
							if(player.hp<=0) return 10;
							return 0;
						}
					},
					threaten:function(player,target){
						if(!target.storage.sbniepan) return 0.6;
						return 1.5;//觉醒后嘲讽很高
					}
				},
				subSkill:{
				    damage:{
				        trigger:{player:'phaseJieshuBegin'},
						forced:true,
						popup:false,
						charlotte:true,
						filter:function(event,player){
							return player.storage.sbniepan;
						},
						content:function(){
						    player.damage(1,'fire','nosource');
						},
						mark:true,
						marktext:'浴火',
						intro:{
						    content:'结束阶段，你受到1点无来源的火焰伤害',
						},
						ai:{
						    effect:{
						        target:function(card,player,target,current){
						            var hastarget=game.hasPlayer(function(current){
						                return get.attitude(target,current)<0;
						            });
						            if(hastarget&&card.name=='tiesuo'&&target.storage.sbniepan) {
						                if(target.isLinked()) {
						                    return [1,-1];
						                }else {
						                    return [1,2];
						                }
						            }
						        },
						    },
						},
						sub:true,
				    },
				},
			},'sb_pangtong'),
			//法正
			sbxuanhuo:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				group:'sbxuanhuo_rob',
				filterTarget:function(card,player,target){
					return !target.hasMark('sbxuanhuo_mark')&&player!=target;
				},
				filterCard:true,
				position:'he',
				discard:false,
				lose:false,
				delay:false,
				onremove:function(player){
					delete player.storage.sbxuanhuo;
					player.unmarkSkill('sbxuanhuo');
				},
				check:function(card){
					return 6.5-get.value(card);
				},
				content:function(){
					'step 0'
					player.give(cards,target);
					if(player.storage.sbxuanhuo&&player.storage.sbxuanhuo[target.playerid]) delete player.storage.sbxuanhuo[target.playerid];
					'step 1'
					target.addMark('sbxuanhuo_mark');
					var history=target.getAllHistory('lose');
					if(history.length){
						history[history.length-1].sbxuanhuo_mark=true;
					}
				},
				getNum:function(current,skill){
					var num=0;
					var history=current.getAllHistory('lose');
					if(history.length){
						for(var i=history.length-1;i>=0;i--){
							var evt=history[i];
							if(evt.sbxuanhuo_mark) break;
							if(typeof skill=='string'){
								if(evt.getParent(2).name==skill) num+=evt.cards2.length;
							}
							else{
								var evtx=evt.getParent(),player=skill;
								if(evtx.name=='gain'){
									var cards=evtx.cards;
									if(evtx.player==player&&cards.length>0) num+=cards.length;
								}
								else if(evtx.name=='loseAsync'){
									if(evtx.type!='gain'||evtx.giver) return false;
									var cards=evtx.getl(current).cards2;
									var cardsx=evtx.getg(player);
									if(cardsx.length>0) num+=cardsx.length;
								}
							}
						}
					}
					return num;
				},
				ai:{
					order:9,
					result:{
						target:function(player,target){
							return -Math.sqrt(Math.max(target.hp,1));
						}
					}
				},
				marktext:'惑',
				intro:{
					content:function(storage,player){
						if(!storage||get.is.empty(storage)) return '未得到过牌';
						var map=(_status.connectMode?lib.playerOL:game.playerMap);
						var str='已得到';
						for(var i in storage){
							str+=get.translation(map[i])+'的'+get.cnNumber(storage[i])+'张牌、';
						}
						return str.slice(0,-1);
					}
				},
				subSkill:{
					mark:{
						marktext:'眩',
						intro:{
							name:'眩惑',
							name2:'眩',
							markcount:()=>0,
							content:'已获得“眩”标记',
						}
					},
					rob:{
						audio:'sbxuanhuo',
						trigger:{
							global:['gainAfter','loseAsyncAfter'],
						},
						forced:true,
						locked:false,
						direct:true,
						filter:function(event,player){
							var evt=event.getParent('phaseDraw');
							if(evt&&evt.name=='phaseDraw') return false;
							return game.hasPlayer(current=>{
								if(!event.getg(current).length||!current.hasMark('sbxuanhuo_mark')) return false;
								if(evt&&evt.player==current) return false;
								if(lib.skill.sbxuanhuo.getNum(current,'sbxuanhuo_rob')>=5) return false;
								return current.hasCard(card=>lib.filter.canBeGained(card,current,player),'he');
							});
						},
						content:function(){
							'step 0'
							var evt=trigger.getParent('phaseDraw');
							var targets=game.filterPlayer(current=>{
								if(!trigger.getg(current).length||!current.hasMark('sbxuanhuo_mark')) return false;
								if(evt&&evt.player==current) return false;
								if(lib.skill.sbxuanhuo.getNum(current,'sbxuanhuo_rob')>=5) return false;
								return current.hasCard(card=>lib.filter.canBeGained(card,current,player),'he');
							});
							event.targets=targets;
							'step 1'
							var target=targets.shift();
							player.logSkill('sbxuanhuo',target);
							var hs=target.getCards('h',card=>lib.filter.canBeGained(card,target,player));
							if(hs.length){
								player.gain(hs.randomGet(),target,'giveAuto');
								if(!player.storage.sbxuanhuo) player.storage.sbxuanhuo={};
								player.storage.sbxuanhuo[target.playerid]=lib.skill.sbxuanhuo.getNum(target,'sbxuanhuo_rob')+1;
								player.markSkill('sbxuanhuo');
							}
							if(targets.length>0) event.redo();
						},
					}
				}
			},
			sbenyuan:{
				audio:2,
				forced:true,
				direct:true,
				trigger:{player:'phaseZhunbeiBegin'},
				filter:function(event,player){
					return game.hasPlayer(current=>current.hasMark('sbxuanhuo_mark'));
				},
				content:function(){
					'step 0'
					var targets=game.filterPlayer(current=>current.hasMark('sbxuanhuo_mark'));
					event.targets=targets;
					'step 1'
					var target=targets.shift();
					event.target=target;
					player.logSkill('sbenyuan',target);
					target.removeMark('sbxuanhuo_mark',target.countMark('sbxuanhuo_mark'));
					game.players.forEach(current=>{
						var storage=current.storage.sbxuanhuo;
						if(storage&&storage[target.playerid]) delete storage[target.playerid];
						if(storage&&get.is.empty(storage)){
							delete current.storage.sbxuanhuo;
							current.unmarkSkill('sbxuanhuo');
						}
					});
					var num=lib.skill.sbxuanhuo.getNum(target,player);
					if(num>=3){
						var cards=player.getCards('he');
						if(!cards.length) event._result={bool:false};
						else if(cards.length<=3) event._result={bool:true,cards:cards};
						else player.chooseCard('恩怨：交给'+get.translation(target)+'三张牌',true,3,'he');
					}
					else{
						target.loseHp();
						player.recover();
						event.goto(3);
					}
					'step 2'
					if(result.bool) player.give(result.cards,target);
					'step 3'
					if(targets.length) event.goto(1);
				}
			},
			//姜维
			sbtiaoxin:window.getStrength({
				audio:2,
				enable:'phaseUse',
				usable:1,
				chargeSkill:true,
				filter:function(event,player){
					return player.hasMark('charge');
				},
				filterTarget:lib.filter.notMe,
				selectTarget:function(){
					return [1,_status.event.player.countMark('charge')];
				},
				multiline:true,
				group:'sbtiaoxin_backflow',
				content:function(){
					'step 0'
					target.chooseToUse(function(card,player,event){
						if(get.name(card)!='sha') return false;
						return lib.filter.filterCard.apply(this,arguments);
					},'挑衅：对'+get.translation(player)+'使用一张杀，或交给其一张牌').set('targetRequired',true).set('complexSelect',true).set('filterTarget',function(card,player,target){
						if(target!=_status.event.sourcex&&!ui.selected.targets.contains(_status.event.sourcex)) return false;
						return lib.filter.targetEnabled.apply(this,arguments);
					}).set('sourcex',player);
					'step 1'
					if(!result.bool&&target.countCards('he')>0){
						target.chooseCard('he','交给'+get.translation(player)+'一张牌',true);
					}
					else event.finish();
					'step 2'
					if(result.bool){
						target.give(result.cards,player);
					}
				},
				contentAfter:function(){
					player.removeMark('charge',targets.length);
				},
				ai:{
					threaten:1.2,
					order:4,
					expose:0.2,
					result:{
						target:function(player,target){
							if(target.countGainableCards(player,'he')==0) return 0;
							return -1;
						},
						player:function(player,target){
							if(!target.canUse('sha',player)) return 0;
							if(target.countCards('h')==0) return 0;
							if(target.countCards('h')==1) return -0.1;
							if(player.hp<=2) return -2;
							if(player.countCards('h','shan')==0) return -1;
							return -0.5;
						}
					},
				},
				subSkill:{
					backflow:{
						audio:'sbtiaoxin',
						trigger:{
							player:['loseAfter','enterGame'],
							global:['loseAsyncAfter','phaseBefore']
						},
						forced:true,
						filter:function(event,player){
							if(player.countMark('charge')>=4) return false;
							if(event.name.indexOf('lose')==0){
								if(event.type!='discard') return false;
								var evt=event.getParent('phaseDiscard');
								return evt&&evt.player==player&&event.getl(player).cards2.length>0;
							}
							else{
								return (event.name!='phase'||game.phaseNumber==0);
							}
						},
						content:function(){
							var num=Math.min(4-player.countMark('charge'),trigger.name.indexOf('lose')==0?trigger.getl(player).cards2.length:4);
							if(num>0) player.addMark('charge',num);
						}
					}
				}
			},{
				audio:2,
				enable:'phaseUse',
				usable:1,
				chargeSkill:true,
				filter:function(event,player){
					return player.hasMark('charge');
				},
				filterTarget:lib.filter.notMe,
				selectTarget:function(){
					return [1,_status.event.player.countMark('charge')];
				},
				multiline:true,
				group:'sbtiaoxin_backflow',
				content:function(){
					'step 0'
					target.chooseToUse(function(card,player,event){
						if(get.name(card)!='sha') return false;
						return lib.filter.filterCard.apply(this,arguments);
					},'挑衅：对'+get.translation(player)+'使用一张杀，或交给其一张牌').set('targetRequired',true).set('complexSelect',true).set('filterTarget',function(card,player,target){
						if(target!=_status.event.sourcex&&!ui.selected.targets.contains(_status.event.sourcex)) return false;
						return lib.filter.targetEnabled.apply(this,arguments);
					}).set('sourcex',player);
					'step 1'
					if(!result.bool&&target.countCards('he')>0){
						target.chooseCard('he','交给'+get.translation(player)+'一张牌',true);
					}
					else if(!player.getHistory('damage',function(evt){
					    return evt.getParent().player==target&&evt.getParent().type=='card'&&evt.getParent(4)==event;
					}).length>0&&target.countCards('he')>0) {
					    //player.choosePlayerCard(target,'he');
					    player.gainPlayerCard(target,'he',true);
					    event.finish();
					}else event.finish();
					'step 2'
					if(result.bool){
						target.give(result.cards,player);
					}
				},
				contentAfter:function(){
					player.removeMark('charge',targets.length);
				},
				ai:{
					threaten:1.2,
					order:4,
					expose:0.2,
					result:{
						target:function(player,target){
							if(target.countGainableCards(player,'he')==0) return 0;
							return -1;
						},
						player:function(player,target){
							if(!target.canUse('sha',player)) return 0;
							if(target.countCards('h')==0) return 0;
							if(target.countCards('h')==1) return -0.1;
							if(player.hp<=2) return -2;
							if(player.countCards('h','shan')==0) return -1;
							return -0.5;
						}
					},
				},
				subSkill:{
					backflow:{
						audio:'sbtiaoxin',
						trigger:{
							player:['phaseJieshuBegin','enterGame'],
							global:['phaseBefore']
						},
						forced:true,
						filter:function(event,player,name){
							if(player.countMark('charge')>=4) return false;
							if(name=='phaseJieshuBegin'){
								return true;
							}
							else{
								return (event.name!='phase'||game.phaseNumber==0);
							}
						},
						content:function(){
						    var add=player.getDamagedHp()>0?1:2;
							var num=Math.min(4-player.countMark('charge'),(event.triggername=='phaseJieshuBegin')?add:4);
							if(num>0) player.addMark('charge',num);
						}
					}
				}
			},'sb_jiangwei'),
			sbzhiji:window.getStrength({
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				juexingji:true,
				forced:true,
				skillAnimation:true,
				animationColor:'fire',
				filter:function(event,player){
					var len=0;
					player.getAllHistory('useSkill',evt=>{
						if(evt.skill!='sbtiaoxin') return false;
						len+=evt.targets.length;
					});
					return len>=4;
				},
				content:function(){
					'step 0'
					player.awakenSkill('sbzhiji');
					player.loseMaxHp();
					'step 1'
					player.chooseTarget('志继：令至少一名角色获得“北伐”标记',true,[1,Infinity]).set('ai',target=>-get.attitude(player,target));
					'step 2'
					if(result.bool){
						player.line(result.targets,'fire');
						result.targets.forEach(target=>{
							target.addAdditionalSkill('sbzhiji_'+player.playerid,'sbzhiji_beifa');
							target.markAuto('sbzhiji_beifa',[player]);
						});
						player.addTempSkill('sbzhiji_clear',{player:'phaseBegin'});
						if(!event.isMine()&&!event.isOnline()) game.delayx();
					}
				},
				subSkill:{
					beifa:{
						charlotte:true,
						mark:true,
						marktext:'伐',
						intro:{
							name:'北伐',
							name2:'北伐',
							content:'使用牌只能指定$和自己为目标',
						},
						mod:{
							playerEnabled:function(card,player,target){
								if(player!=target&&!player.getStorage('sbzhiji_beifa').contains(target)) return false;
							}
						}
					},
					clear:{
						charlotte:true,
						onremove:function(player){
							game.countPlayer(function(current){
								current.removeAdditionalSkill('sbzhiji_'+player.playerid);
							});
						}
					}
				}
			},{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				juexingji:true,
				forced:true,
				skillAnimation:true,
				animationColor:'fire',
				derivation:['bazhen'],
				filter:function(event,player){
					var len=0;
					player.getAllHistory('useSkill',evt=>{
						if(evt.skill!='sbtiaoxin') return false;
						len+=evt.targets.length;
					});
					return len>=4;
				},
				content:function(){
					'step 0'
					player.awakenSkill('sbzhiji');
					player.loseMaxHp();
					player.addSkillLog('bazhen');
					'step 1'
					player.chooseTarget('志继：令至少一名角色获得“北伐”标记',true,[1,Infinity]).set('ai',target=>-get.attitude(player,target));
					'step 2'
					if(result.bool){
						player.line(result.targets,'fire');
						result.targets.forEach(target=>{
							target.addAdditionalSkill('sbzhiji_'+player.playerid,'sbzhiji_beifa');
							target.markAuto('sbzhiji_beifa',[player]);
						});
						player.addTempSkill('sbzhiji_clear',{player:'dying'});
						if(!event.isMine()&&!event.isOnline()) game.delayx();
					}
				},
				subSkill:{
					beifa:{
						charlotte:true,
						mark:true,
						marktext:'伐',
						intro:{
							name:'北伐',
							name2:'北伐',
							content:'使用牌只能指定$和自己为目标',
						},
						mod:{
							playerEnabled:function(card,player,target){
								if(player!=target&&!player.getStorage('sbzhiji_beifa').contains(target)) return false;
							}
						}
					},
					clear:{
						charlotte:true,
						onremove:function(player){
							game.countPlayer(function(current){
								current.removeAdditionalSkill('sbzhiji_'+player.playerid);
							});
						}
					}
				}
			},'sb_jiangwei'),
			//刘备
			sbrende:{
				audio:3,
				enable:['chooseToUse','chooseToRespond'],
				maxNum:8,
				filter:function(event,player){
					if(event.type=='wuxie'||player.hasSkill('sbrende_used')) return false;
					if(player.countMark('sbrende')<2) return false;
					for(var name of lib.inpile){
						if(get.type(name)!='basic') continue;
						var card={name:name,isCard:true};
						if(event.filterCard(card,player,event)) return true;
						if(name=='sha'){
							for(var nature of lib.inpile_nature){
								card.nature=nature;
								if(event.filterCard(card,player,event)) return true;
							}
						}
					}
					return false;
				},
				group:['sbrende_give','sbrende_gain'],
				chooseButton:{
					dialog:function(event,player){
						var dialog=ui.create.dialog('仁德');
						dialog.noPre=true;
						if(event.type=='phase'){
							dialog._chosenOpt=[];
							var table=document.createElement('div');
							table.classList.add('add-setting');
							table.style.margin='0';
							table.style.width='100%';
							table.style.position='relative';
							var list=['视为使用基本牌','交给其他角色牌'];
							for(var i of list){
								var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
								td.innerHTML='<span>'+i+'</span>';
								td.link=i;
								if(i==list[0]){
									td.classList.add('bluebg');
									dialog._chosenOpt.add(td);
								}
								td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
									if(_status.dragged) return;
									if(_status.clicked) return;
									if(_status.justdragged) return;
									_status.tempNoButton=true;
									_status.clicked=true;
									setTimeout(function(){
										_status.tempNoButton=false;
									},500);
									var link=this.link;
									if(link=='交给其他角色牌') game.uncheck();
									var current=this.parentNode.querySelector('.bluebg');
									if(current){
										current.classList.remove('bluebg');
										dialog._chosenOpt.remove(current);
									}
									dialog._chosenOpt.add(this);
									this.classList.add('bluebg');
									game.check();
								});
								table.appendChild(td);
								dialog.buttons.add(td);
							}
							dialog.content.appendChild(table);
						}else if(!lib.config.auto_confirm) {
						    //自动确认的bug，这里修一下
						    lib.config.auto_confirm = true;
						    player.addWhen({
						        trigger:{
						            player:['chooseToUseAfter','chooseToRespondAfter'],
						        },
						        content:function(){
						            lib.config.auto_confirm = false;
						        },
						    });
						}
						var cards=[];
						for(var name of lib.inpile){
							if(get.type(name)!='basic') continue;
							var card={name:name,isCard:true};
							if(event.filterCard(card,player,event)) cards.push(['基本','',name]);
							if(name=='sha'){
								for(var nature of lib.inpile_nature){
									card.nature=nature;
									if(event.filterCard(card,player,event)) cards.push(['基本','',name,nature]);
								}
							}
						}
						dialog.add([cards,'vcard']);
						dialog.style.minHeight='263px';
						return dialog;
					},
					check:function(button,player){
						if(typeof button.link=='string') return -1;
						if(_status.event.getParent().type!='phase') return 1;
						return _status.event.player.getUseValue({name:button.link[2],nature:button.link[3]});
					},
					select:function(){
						var opts=_status.event.dialog._chosenOpt;
						return opts&&opts.length&&opts[0].link=='交给其他角色牌'?0:1;
					},
					backup:function(links,player){
						var isUse=links.length==1;
						var backup=get.copy(lib.skill['sbrende_'+(isUse?'use':'give')]);
						if(isUse) backup.viewAs={name:links[0][2],nature:links[0][3],isCard:true};
						return backup;
					},
					prompt:function(links,player){
						var isUse=links.length==1;
						return (isUse?('移去2枚“仁望”，视为使用或打出'+(get.translation(links[0][3])||'')+get.translation(links[0][2]))
							:'###仁德###出牌阶段每名角色限一次。你可以将任意张牌交给一名其他角色，然后你获得等量“仁望”标记（至多为'+lib.skill.sbrende.maxNum+'）');
					}
				},
				hiddenCard:function(player,name){
					return get.type(name)=='basic'&&player.countMark('sbrende')>1&&player.hasSkill('sbrende_used');
				},
				marktext:'仁',
				intro:{
					name:'仁望',
					name2:'仁望',
					content:'mark',
				},
				ai:{
					respondSha:true,
					respondShan:true,
					save:true,
					skillTagFilter:function(player){
						return player.countMark('sbrende')>1&&!player.hasSkill('sbrende_used');
					},
					order:function(item,player){
						if(_status.event.type=='phase'&&lib.skill.sbzhangwu.ai.result.player(player)>0) return 9.1;
						return 0.5;
					},
					result:{
						player:function(player){
							if(_status.event.dying){
								return get.attitude(player,_status.event.dying);
							}
							return _status.event.type=='phase'&&player.countMark('sbrende')<=2?0:1;
						},
					},
				},
				subSkill:{
					backup:{},
					used:{charlotte:true},
					given:{onremove:true},
					use:{
						audio:'sbrende',
						filterCard:()=>false,
						selectCard:-1,
						popname:true,
						precontent:function(){
							player.logSkill('sbrende_use');
							delete event.result.skill;
							player.removeMark('sbrende',2);
							player.addTempSkill('sbrende_used');
						}
					},
					give:{
						audio:'sbrende',
						enable:'phaseUse',
						filterCard:true,
						selectCard:[1,Infinity],
						position:'he',
						discard:false,
						lose:false,
						delay:false,
						filter:function(event,player){
							if(player.countMark('sbrende')<2||player.hasSkill('sbrende_used')) return true;
							for(var name of lib.inpile){
								if(get.type(name)!='basic') continue;
								var card={name:name,isCard:true};
								if(event.filterCard(card,player,event)) return false;
								if(name=='sha'){
									for(var nature of lib.inpile_nature){
										card.nature=nature;
										if(event.filterCard(card,player,event)) return false;
									}
								}
							}
							return true;
						},
						filterTarget:function(card,player,target){
							if(player.getStorage('sbrende_given').contains(target)) return false;
							return player!=target;
						},
						prompt:function(event){
							return '出牌阶段每名角色限一次。你可以将任意张牌交给一名其他角色，然后你获得等量“仁望”标记（至多为'+lib.skill.sbrende.maxNum+'）';
						},
						check:function(card){
							var player=get.owner(card);
							if(ui.selected.cards.length&&ui.selected.cards[0].name=='du') return 0;
							if(ui.selected.cards.length+player.countMark('sbrende')>lib.skill.sbrende.maxNum) return 0;
							if(!ui.selected.cards.length&&card.name=='du') return 20;
							if(ui.selected.cards.length>=Math.max(2,player.countCards('he')-player.hp)) return 0;
							if(player.countCards('he')<=1){
								var players=game.filterPlayer();
								for(var i=0;i<players.length;i++){
									if(players[i].hasSkill('haoshi')&&
										!players[i].isTurnedOver()&&
										!players[i].hasJudge('lebu')&&
										get.attitude(player,players[i])>=3&&
										get.attitude(players[i],player)>=3){
										return 11-get.value(card);
									}
								}
								if(player.countCards('he')>player.hp) return 10-get.value(card);
								if(player.countCards('he')>2) return 6-get.value(card);
								return -1;
							}
							return 18-(ui.selected.cards.length+player.countMark('sbrende'))-get.value(card);
						},
						content:function(){
							player.addTempSkill('sbrende_given','phaseUseAfter');
							player.markAuto('sbrende_given',[target]);
							player.markAuto('sbrende_givenx',[target]);
							player.give(cards,target);
							var num=Math.min(lib.skill.sbrende.maxNum-player.countMark('sbrende'),cards.length);
							if(num>0) player.addMark('sbrende',num);
						},
						ai:{
							order:function(skill,player){
								return player.countMark('sbrende')<2?6.8:5.8;
							},
							result:{
								target:function(player,target){
									if(!player.hasFriend()&&player.hasSkill('sbzhangwu')&&ui.selected.cards.length&&
										get.value(ui.selected.cards[0])>(lib.skill.sbzhangwu.filterTarget(null,player,target)?3:5)) return -0.1;
									if(target.hasSkillTag('nogain')) return 0;
									if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
										if(target.hasSkillTag('nodu')) return 0;
										return -10;
									}
									if(target.hasJudge('lebu')) return 0;
									var nh=target.countCards('h');
									return Math.max(1,5-nh);
								}
							},
							threaten:1.1
						},
					},
					gain:{
						audio:'sbrende',
						trigger:{player:'phaseUseBegin'},
						forced:true,
						locked:false,
						filter:function(event,player){
							return player.countMark('sbrende')<lib.skill.sbrende.maxNum;
						},
						content:function(){
							var num=Math.min(lib.skill.sbrende.maxNum-player.countMark('sbrende'),2);
							if(num>0) player.addMark('sbrende',num);
						}
					},
				},
			},
			sbzhangwu:{
				audio:2,
				enable:'phaseUse',
				skillAnimation:'epic',
				animationColor:'orange',
				limited:true,
				filter:function(event,player){
					if(game.roundNumber<=1) return false;
					if(!game.hasPlayer(current=>lib.skill.sbzhangwu.filterTarget(null,player,current))) return false;
					return true;
				},
				filterTarget:function(card,player,target){
					if(target==player) return false;
					return player.getStorage('sbrende_givenx').contains(target);
				},
				selectTarget:[-1,-2],
				multiline:true,
				content:function(){
					'step 0'
					player.awakenSkill('sbzhangwu');
					var num=Math.min(game.roundNumber-1,3);
					var cards=target.getCards('he'),count=cards.length;
					if(count==0) event.finish();
					else if(count<=num) event._result={bool:true,cards:cards};
					else target.chooseCard('章武：交给'+get.translation(player)+get.cnNumber(num)+'张牌',true,'he',num);
					'step 1'
					if(result.bool){
						target.give(result.cards,player);
					}
				},
				contentAfter:function(){
					'step 0'
					player.recover(3);
					'step 1'
					player.removeSkill('sbrende');
					game.log(player,'失去了技能','#g【'+get.translation('sbrende')+'】');
					game.delayx();
				},
				ai:{
					order:9,
					combo:'sbrende',
					result:{
						player:function(player,target){
							var targets=game.filterPlayer(current=>lib.skill.sbzhangwu.filterTarget(null,player,current));
							if(!targets.length) return 0;
							var eff=0;
							for(var target of targets){
								eff+=get.effect(target,{name:'shunshou_copy2'},player,player);
							}
							eff+=15-5*Math.max(0,3-player.getDamagedHp());
							return eff>15?1:0;
						},
					}
				}
			},
			sbjijiang:{
				audio:2,
				trigger:{player:'phaseUseEnd'},
				zhuSkill:true,
				unique:true,
				direct:true,
				filter:function(event,player){
					if(!player.hasZhuSkill('sbjijiang')) return false;
					return game.hasPlayer(current=>{
						if(current.group!='shu'||player==current||current.hp<player.hp) return false;
						return game.hasPlayer(currentx=>current.inRange(currentx));
					});
				},
				content:function(){
					'step 0'
					var next=player.chooseTarget(get.prompt2('sbjijiang'),2);
					next.set('filterTarget',(card,player,target)=>{
						if(!ui.selected.targets.length) return true;
						var current=ui.selected.targets[0];
						if(current.group=='shu'&&current.hp>=player.hp&&current!=player){
							return current.inRange(target);
						}
						else{
							return target.group=='shu'&&target.hp>=player.hp&&target.inRange(current)&&target!=player;
						}
					})
					next.set('targetprompt',target=>{
						var player=_status.event.player;
						if(target.group=='shu'&&target.hp>=player.hp&&target!=player&&!ui.selected.targets.some(i=>{
							return i!=target&&i.hp>=player.hp&&i.group=='shu';
						})) return '进行选择';
						return '出杀对象';
					});
					next.set('ai',target=>{
						var player=_status.event.player;
						if(ui.selected.targets.length){
							var current=ui.selected.targets[0];
							if(current.group=='shu'&&current.hp>=player.hp&&current!=player){
								return -get.attitude(player,target);
							}
							return Math.abs(get.attitude(player,current));
						}
						else{
							if(target.group=='shu'&&target.hp>=player.hp&&target!=player&&game.hasPlayer(current=>{
								return get.attitude(player,current)<0;
							})) return 10;
							return 1;
						}
					})
					'step 1'
					if(result.bool){
						var targets=result.targets;
						event.targets=targets;
						if(targets[0].group!='shu'||targets[0].hp<player.hp||targets[0]==player) targets.reverse();
						player.logSkill('sbjijiang',targets,false);
						player.line2(targets);
						var choiceList=[
							'视为对'+get.translation(targets[1])+'使用一张【杀】',
							'你的下一个出牌阶段开始前，跳过此阶段'
						];
						targets[0].chooseControl().set('choiceList',choiceList).set('ai',()=>{
							return _status.event.choice;
						}).set('choice',get.effect(targets[1],{name:'sha'},targets[0],targets[0])>get.effect(targets[0],{name:'lebu'},targets[0],targets[0])?0:1);
					}
					else event.finish();
					'step 2'
					if(result.index==0){
						targets[0].useCard({name:'sha',isCard:true},targets[1],false);
					}
					else{
						targets[0].addSkill('sbjijiang_skip');
					}
				},
				subSkill:{
					skip:{
						trigger:{player:'phaseUseBefore'},
						charlotte:true,
						forced:true,
						content:function(){
							trigger.cancel();
							player.removeSkill('sbjijiang_skip');
						}
					},
				}
			},
			//赵云
			sblongdan:{
				audio:2,
				enable:['chooseToUse','chooseToRespond'],
				chargeSkill:true,
				filter:function(event,player){
					if(event.type=='wuxie'||!player.hasMark('charge')) return false;
					var marked=player.hasSkill('sblongdan_mark',null,null,false);
					for(var name of lib.inpile){
						if(!marked&&name!='sha'&&name!='shan') continue;
						if(get.type(name)!='basic') continue;
						if(player.hasCard(lib.skill.sblongdan.getFilter(name,player),'hs')){
							if(event.filterCard({name:name},player,event)) return true;
							if(marked&&name=='sha'){
								for(var nature of lib.inpile_nature){
									if(event.filterCard({name:name,nature:nature},player,event)) return true;
								}
							}
						}
					}
					return false;
				},
				chooseButton:{
					dialog:function(event,player){
						var list=[];
						var marked=player.hasSkill('sblongdan_mark',null,null,false);
						for(var name of lib.inpile){
							if(!marked&&name!='sha'&&name!='shan') continue;
							if(get.type(name)!='basic') continue;
							if(player.hasCard(lib.skill.sblongdan.getFilter(name,player),'hs')){
								if(event.filterCard({name:name},player,event)) list.push(['基本','',name]);
									if(marked&&name=='sha'){
									for(var nature of lib.inpile_nature){
										if(event.filterCard({name:name,nature:nature},player,event)) list.push(['基本','',name,nature])
									}
								}
							}
						}
						return ui.create.dialog('龙胆',[list,'vcard'],'hidden');
					},
					check:function(button){
						if(_status.event.getParent().type!='phase') return 1;
						var player=_status.event.player,card={name:button.link[2],nature:button.link[3]};
						if(card.name=='jiu'&&Math.min(player.countMark('charge'),player.countCards('h',{type:'basic'}))<2) return 0;
						return player.getUseValue(card,null,true);
					},
					backup:function(links,player){
						return {
							viewAs:{
								name:links[0][2],
								nature:links[0][3],
							},
							filterCard:lib.skill.sblongdan.getFilter(links[0][2],player),
							position:'he',
							popname:true,
							check:function(card){
								return 6/Math.max(1,get.value(card));
							},
							precontent:function(){
								player.removeMark('charge',1);
								player.addTempSkill('sblongdan_draw');
							},
						}
					},
					prompt:function(links,player){
						var marked=player.hasSkill('sblongdan_mark',null,null,false);
						var card={
							name:links[0][2],
							nature:links[0][3],
							isCard:true,
						};
						if(marked) return '将一张基本牌当做'+get.translation(card)+'使用';
						return '将一张'+(card.name=='sha'?'闪':'杀')+'当做'+get.translation(card)+'使用';
					},
				},
				hiddenCard:function(player,name){
					if(get.type(name)!='basic'||!player.hasMark('charge')) return false;
					var marked=player.hasSkill('sblongdan_mark',null,null,false);
					if(!marked&&name!='sha'&&name!='shan') return false;
					return player.hasCard(lib.skill.sblongdan.getFilter(name,player),'hs');
				},
				ai:{
					respondSha:true,
					respondShan:true,
					skillTagFilter:function(player,tag){
						return lib.skill.sblongdan.hiddenCard(player,tag=='respondSha'?'sha':'shan')
					},
					order:9,
					result:{
						player:function(player){
							if(_status.event.dying) return get.attitude(player,_status.event.dying);
							return 1;
						},
					},
				},
				getFilter:function(name,player){
					if(!player.hasSkill('sblongdan_mark',null,null,false)){
						if(name=='sha') return {name:'shan'};
						if(name=='shan') return {name:'sha'};
						return (()=>false);
					}
					return {type:'basic'};
				},
				group:'sblongdan_charge',
				onremove:function(player){
					player.removeSkill('sblongdan_mark');
				},
				subSkill:{
					backup:{audio:'sblongdan'},
					mark:{charlotte:true},
					draw:{
						charlotte:true,
						trigger:{player:['useCardAfter']},
						forced:true,
						popup:false,
						filter:function(event,player){
							return event.skill=='sblongdan_backup';
						},
						content:function(){
							player.draw();
						},
					},
					charge:{
						audio:'sblongdan',
						trigger:{
							global:['phaseBefore','phaseEnd'],
							player:'enterGame',
						},
						forced:true,
						filter:function(event,player,name){
							if(player.countMark('charge')>2) return false;
							return (name!='phaseBefore'||game.phaseNumber==0);
						},
						content:function(){
							player.addMark('charge',1);
						},
					},
				},
			},
			sbjizhu:{
				audio:3,
				trigger:{player:'phaseZhunbeiBegin'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(lib.filter.notMe,get.prompt('sbjizhu'),'和一名其他角色进行“协力”').set('ai',function(target){
						return get.threaten(target)*Math.sqrt(1+target.countCards('h'))*((target.isTurnedOver()||target.hasJudge('lebu'))?0.1:1);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('sbjizhu',target);
						player.chooseCooperationFor(target,'sbjizhu').set('ai',function(button){
							var base=0;
							switch(button.link){
								case 'cooperation_damage':base=0.1;break;
								case 'cooperation_draw':base=0.6;break;
								case 'cooperation_discard':base=0.1;break;
								case 'cooperation_use':base=0.6;break;
							}
							return base+Math.random();
						});
						player.addAdditionalSkill('cooperation','sbjizhu_effect');
					}
					else event.finish();
					'step 2'
					game.delayx();
				},
				subSkill:{
					effect:{
						audio:'sbjizhu',
						charlotte:true,
						trigger:{global:'phaseJieshuBegin'},
						forced:true,
						logTarget:'player',
						filter:function(event,player){
							return player.checkCooperationStatus(event.player,'sbjizhu')&&player.hasSkill('sblongdan',null,null,false);
						},
						content:function(){
							game.log(player,'和',trigger.player,'的协力成功');
							player.addTempSkill('sblongdan_mark',{player:'phaseJieshuBegin'});
							game.delayx();
						},
					},
				},
				derivation:'sblongdan_shabi',
			},
			//张飞
			sbpaoxiao:{
				audio:2,
				mod:{
					cardUsable:function(card){
						if(card.name=='sha') return Infinity;
					},
					targetInRange:function(card,player,target){
						if(card.name=='sha'&&player.getEquips(1).length>0) return true;
					},
				},
				trigger:{player:'useCard'},
				forced:true,
				filter:function(event,player){
					if(event.card.name!='sha') return false;
					var evt=event.getParent('phaseUse');
					if(!evt||evt.player!=player) return false;
					return player.hasHistory('useCard',function(evtx){
						return evtx!=event&&evtx.card.name=='sha'&&evtx.getParent('phaseUse')==evt;
					},event);
				},
				content:function(){
					if(!trigger.card.storage) trigger.card.storage={};
					trigger.card.storage.sbpaoxiao=true;
					trigger.baseDamage++;
					trigger.directHit.addArray(game.players);
					player.addTempSkill('sbpaoxiao_effect','phaseUseAfter');
				},
				subSkill:{
					effect:{
						charlotte:true,
						trigger:{player:'useCardToPlayered'},
						forced:true,
						popup:false,
						filter:function(event,player){
							return event.card.storage&&event.card.storage.sbpaoxiao&&event.target.isIn();
						},
						content:function(){
							trigger.target.addTempSkill('fengyin');
						},
						group:'sbpaoxiao_recoil',
					},
					recoil:{
						charlotte:true,
						trigger:{source:'damageSource'},
						forced:true,
						filter:function(event,player){
							return event.card&&event.card.storage&&event.card.storage.sbpaoxiao&&event.player.isIn();
						},
						content:function(){
							'step 0'
							player.loseHp();
							'step 1'
							var hs=player.getCards('h',function(card){
								return lib.filter.cardDiscardable(card,player,'sbpaoxiao_recoil');
							});
							if(hs.length>0) player.discard(hs.randomGet());
						},
					},
				},
			},
			sbxieji:{
				audio:3,
				trigger:{player:'phaseZhunbeiBegin'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(lib.filter.notMe,get.prompt('sbxieji'),'和一名其他角色进行“协力”').set('ai',function(target){
						return get.threaten(target)*Math.sqrt(1+target.countCards('h'))*((target.isTurnedOver()||target.hasJudge('lebu'))?0.1:1);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('sbxieji',target);
						//选择对方的协击条件
						player.chooseCooperationFor(target,'sbxieji').set('ai',function(button){
							var base=0;
							switch(button.link){
								case 'cooperation_damage':base=0.8;break;
								case 'cooperation_draw':base=0.1;break;
								case 'cooperation_discard':base=0.1;break;
								case 'cooperation_use':base=0.1;break;
							}
							return base+Math.random();
						});
						//保证技能cooperation被移除之后 失去该技能
						player.addAdditionalSkill('cooperation','sbxieji_effect');
					}
					else event.finish();
					'step 2'
					game.delayx();
				},
				subSkill:{
					effect:{
						audio:'sbxieji',
						charlotte:true,
						trigger:{global:'phaseJieshuBegin'},
						direct:true,
						filter:function(event,player){
							//判断自己是否有目标为该角色 且已经完成的协力记录
							return player.checkCooperationStatus(event.player,'sbxieji');
						},
						content:function(){
							'step 0'
							game.log(player,'和',trigger.player,'的协力成功');
							player.chooseTarget('协击：请选择【杀】的目标','你和'+get.translation(trigger.player)+'协力成功，可以视为对至多三名其他角色使用一张【杀】，且此【杀】造成伤害时，你摸等同于伤害值的牌',[1,3],true,function(card,player,target){
								return player.canUse('sha',target,false);
							}).set('ai',function(target){
								var player=_status.event.player;
								return get.effect(target,{name:'sha'},player,player);
							});
							'step 1'
							if(result.bool){
								player.addTempSkill('sbxieji_reward','sbxieji_effectAfter');
								player.useCard({
									name:'sha',
									isCard:true,
									storage:{sbxieji:true},
								},'sbxieji_effect',result.targets);
							}
						},
					},
					reward:{
						charlotte:true,
						trigger:{source:'damageSource'},
						forced:true,
						popup:false,
						filter:function(event,player){
							return event.card&&event.card.storage&&event.card.storage.sbxieji&&event.getParent().type=='card';
						},
						content:function(){
							player.draw(trigger.num);
						},
					},
				},
			},
			//徐晃
			sbduanliang:{
				audio:1,
				enable:'phaseUse',
				usable:1,
				filterTarget:lib.filter.notMe,
				content:function(){
					'step 0'
					player.chooseToDuiben(target).set('title','谋弈').set('namelist',[
						'固守城池','突出重围','围城断粮','擂鼓进军'
					]).set('ai',button=>{
						var source=_status.event.getParent().player,target=_status.event.getParent().target;
						if(get.effect(target,{name:'juedou'},source,source)>=10&&button.link[2]=='db_def2'&&Math.random()<0.5) return 10;
						return 1+Math.random();
					});
					'step 1'
					if(result.bool){
						if(result.player=='db_def1'){
							if(target.hasJudge('bingliang')) player.gainPlayerCard(target,'he',true);
							else{
								if(ui.cardPile.childNodes.length>0) {
									if(player.canUse(get.autoViewAs({name:'bingliang'},[ui.cardPile.firstChild]),target,false)){
										player.useCard({name:'bingliang'},target,get.cards());
									}
								}
							}
						}
						else{
							var card={name:'juedou',isCard:true};
							if(player.canUse(card,target)) player.useCard(card,target);
						}
					}
				},
				ai:{
					threaten:1.2,
					order:5.5,
					result:{
						player:1,
						target:-1
					}
				},
				subSkill:{
					true1:{audio:true},
					true2:{audio:true},
					false:{audio:true},
				}
			},
			sbshipo:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				direct:true,
				filter:function(event,player){
					return game.hasPlayer(current=>{
						return current.hp<player.hp||current.hasJudge('bingliang');
					});
				},
				content:function(){
					'step 0'
					var list=[];
					var choiceList=['选择一名体力少于你的角色','选择所有判定区有兵粮寸断的其他角色'];
					var bool=false,bool2=false;
					game.filterPlayer(current=>{
						if(current.hp<player.hp) bool=true;
						if(current.hasJudge('bingliang')) bool2=true;
					});
					if(bool) list.push('选项一');
					else choiceList[0]='<span style="opacity:0.5">'+choiceList[0]+'</span>';
					if(bool2) list.push('选项二');
					else choiceList[1]='<span style="opacity:0.5">'+choiceList[1]+'</span>';
					if(_status.connectMode) game.broadcastAll(function(){_status.noclearcountdown=true});
					player.chooseControl(list,'cancel2').set('prompt',get.prompt2('sbshipo')).set('choiceList',choiceList).set('ai',()=>{
						return _status.event.choice;
					}).set('choice',(function(){
						var eff=0,eff2=0;
						if(!list.contains('选项一')) eff=Infinity;
						if(!list.contains('选项二')) eff2=Infinity;
						game.countPlayer(current=>{
							if(current.hp<player.hp){
								var effx=get.attitude(player,current)/Math.sqrt(Math.max(0.1,2*current.hp+current.countCards('h')));
								if(effx<eff) eff=effx;
							}
							if(current.hasJudge('bingliang')) eff2+=get.attitude(player,current)/Math.sqrt(Math.max(0.1,2*current.hp+current.countCards('h')));
						});
						if(eff>0&&eff2>0) return 'cancel2';
						return eff<eff2?'选项一':'选项二';
					})());
					'step 1'
					if(result.control=='cancel2'){
						game.broadcastAll(function(){delete _status.noclearcountdown;game.stopCountChoose()});
						event.finish();return;
					}
					if(result.control=='选项一'){
						player.chooseTarget('选择一名体力少于你的角色',(card,player,target)=>target.hp<player.hp,true).set('ai',target=>-get.attitude(player,target)/Math.sqrt(Math.max(0.1,2*target.hp+target.countCards('h'))));
					}
					else{
						event._result={bool:true,targets:game.filterPlayer(current=>current.hasJudge('bingliang'))};
					}
					'step 2'
					game.broadcastAll(function(){delete _status.noclearcountdown;game.stopCountChoose()});
					if(result.bool){
						var targets=result.targets;
						player.logSkill('sbshipo',targets);
						event.targets=targets.sortBySeat();
						event.cards=[];
					}
					else event.finish();
					'step 3'
					var target=event.targets.shift();
					event.target=target;
					target.chooseCard('交给'+get.translation(player)+'一张手牌，或受到1点伤害').set('ai',card=>{
						var player=_status.event.player,source=_status.event.getParent().player;
						if(get.damageEffect(player,source,player)>0) return 0;
						if(get.attitude(player,source)>0) return 1;
						if(get.tag(card,'recover')>0) return 0;
						return (player.hp<2?7:5.5)-get.value(card);
					});
					'step 4'
					if(result.bool){
						event.cards.addArray(result.cards);
						target.give(result.cards,player);
					}
					else{
						target.damage();
					}
					'step 5'
					if(event.targets.length) event.goto(3);
					else{
						var cards=event.cards.filter(card=>get.owner(card)==player&&get.position(card)=='h');
						if(!cards.length) event.finish();
						else event.cards=cards;
					}
					'step 6'
					player.chooseCardTarget({
						filterCard:function(card,player,target){
							return _status.event.getParent().cards.contains(card);
						},
						filterTarget:lib.filter.notMe,
						selectCard:[1,event.cards.length],
						prompt:'是否将任意张得到的牌交给一名其他角色？',
						ai1:function(card){
							var player=_status.event.player;
							var val=player.getUseValue(card);
							if(val>0) return 2;
							if(player.hp<=2&&val==0&&get.value(card)>5) return 0;
							return Math.random()>0.5?1:0;
						},
						ai2:function(target){
							var player=_status.event.player,cards=ui.selected.cards;
							var val=0;
							for(var card of cards){
								val+=target.getUseValue(card);
							}
							if(val>0) return val*get.attitude(player,target)*2;
							return get.value(card,target)*get.attitude(player,target);
						},
					});
					'step 7'
					if(result.bool){
						var cards=result.cards,target=result.targets[0];
						player.give(cards,target);
					}
				}
			},
			//马超
			sbtieji:{
				audio:1,
				trigger:{player:'useCardToPlayered'},
				logTarget:'target',
				filter:function(event,player){
					return player!=event.target&&event.card.name=='sha'&&event.target.isIn();
				},
				check:function(event,player){
					return get.attitude(player,event.target)<0;
				},
				content:function(){
					'step 0'
					var target=trigger.target;
					event.target=target;
					target.addTempSkill('fengyin');
					trigger.directHit.add(target);
					player.chooseToDuiben(target).set('title','谋弈').set('namelist',[
						'出阵迎战','拱卫中军','直取敌营','扰阵疲敌'
					]);
					'step 1'
					if(result.bool){
						if(result.player=='db_def1') player.gainPlayerCard(target,'he',true);
						else player.draw(2);
					}
				},
				shaRelated:true,
				ai:{
					ignoreSkill:true,
					skillTagFilter:function(player,tag,arg){
						if(tag=='directHit_ai'){
							return get.attitude(player,arg.target)<=0;
						}
						if(!arg||arg.isLink||!arg.card||arg.card.name!='sha') return false;
						if(!arg.target||get.attitude(player,arg.target)>=0) return false;
						if(!arg.skill||!lib.skill[arg.skill]||lib.skill[arg.skill].charlotte||get.is.locked(arg.skill)||!arg.target.getSkills(true,false).contains(arg.skill)) return false;
					},
					directHit_ai:true,
				},
				subSkill:{
					true1:{audio:true},
					true2:{audio:true},
					false:{audio:true},
				}
			},
			//甘宁
			sbqixi:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				filterTarget:lib.filter.notMe,
				content:function(){
					'step 0'
					event.list=lib.suit.slice();
					event.suits=[];
					event.num=0;
					var cards=player.getCards('h'),map={},max=-Infinity;
					for(var card of cards){
						var suit=get.suit(card,player);
						if(!map[suit]) map[suit]=0;
						map[suit]++;
						if(map[suit]>max) max=map[suit];
					}
					for(var i in map){
						if(map[i]==max) event.suits.push(i);
					}
					'step 1'
					target.chooseControl(event.list).set('prompt','奇袭：猜测'+get.translation(player)+'手牌中最多的花色').set('ai',()=>{
						var player=_status.event.getParent().player,controls=_status.event.controls;
						if(player.countCards('h')<=3&&controls.contains('diamond')&&Math.random()<0.3) return 'diamond';
						return controls.randomGet();
					});
					'step 2'
					var control=result.control;
					target.chat('我猜是'+get.translation(control)+'！');
					game.log(target,'猜测为','#y'+control);
					if(!event.isMine()&&!event.isOnline()) game.delayx();
					'step 3'
					var control=result.control;
					if(!event.suits.contains(control)){
						player.chat('猜错了！');
						game.log(target,'猜测','#y错误');
						event.num++;
						event.list.remove(control);
						player.chooseBool('是否令其重新选择一个花色继续猜测？').set('ai',()=>1);
					}
					else {
						player.chat(event.num==0?'这么准？':'猜对了！');
						game.log(target,'猜测','#g正确');
						player.showHandcards();
						event.goto(4);
					}
					'step 4'
					if(result.bool){
						event.goto(1);
					}
					'step 5'
					if(event.num>0&&target.countDiscardableCards(player,'hej')){
						player.line(target);
						player.discardPlayerCard(target,event.num,true,'hej');
					}
				},
				ai:{
					order:10,
					result:{
						player:1,
						target:function(player,target){
							return get.effect(target,{name:'guohe'},player,target)*(5-get.attitude(player,target)/2);
						}
					}
				}
			},
			sbfenwei:window.getStrength({
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				skillAnimation:true,
				animationColor:'wood',
				limited:true,
				position:'he',
				filterCard:true,
				selectCard:[1,3],
				filterTarget:true,
				selectTarget:function(){
					return ui.selected.cards.length;
				},
				delay:false,
				discard:false,
				lose:false,
				complexSelect:true,
				filterOk:function(){
					return ui.selected.targets.length==ui.selected.cards.length;
				},
				multitarget:true,
				multiline:true,
				check:function(card){
					return 7-get.value(card);
				},
				content:function(){
					'step 0'
					player.awakenSkill('sbfenwei');
					for(var i=0; i<cards.length; i++){
						targets[i].addToExpansion(cards[i],player,'give').gaintag.add('sbfenwei_effect');
					}
					'step 1'
					player.addSkill('sbfenwei_effect');
					player.draw(cards.length);
				},
				intro:{
					content:'limited'
				},
				ai:{
					order:6.9,
					result:{
						target:function(player,target){
							if(game.hasPlayer(current=>{
								return get.rawAttitude(player,current)>0&&current!=player&&get.attitude(player,current)<=0;
							})&&game.countPlayer(current=>{
								return get.attitude(player,current)>0;
							})<=2) return 0;
							return 1;
						},
					}
				},
				subSkill:{
					effect:{
						audio:'sbfenwei',
						trigger:{
							global:'useCardToTarget',
						},
						charlotte:true,
						forced:true,
						filter:function(event,player){
							return event.target.getExpansions('sbfenwei_effect').length>0&&get.type2(event.card)=='trick';
						},
						content:function(){
							'step 0'
							var choiceList=['令'+get.translation(trigger.target)+'获得其“威”','移去'+ get.translation(trigger.target) +'的“威”，取消'+get.translation(trigger.card)+'对其的目标'];
							player.chooseControl().set('choiceList',choiceList).set('prompt','奋威：请选择一项').set('ai',()=>{
								var player=_status.event.player,evt=_status.event.getTrigger();
								if(get.effect(evt.target,evt.card,evt.player,player)<-10) return 1;
								return 0;
							});
							'step 1'
							var cards=trigger.target.getExpansions('sbfenwei_effect');
							if(result.index==0){
								trigger.target.gain(cards,'gain2','fromStorage');
							}
							else {
								trigger.target.loseToDiscardpile(cards);
								trigger.targets.remove(trigger.target);
								trigger.getParent().triggeredTargets2.remove(trigger.target);
								trigger.untrigger();
							}
						},
						marktext:'威',
						intro:{
							name:'威',
							markcount:'expansion',
							content:'expansion',
						},
					}
				}
			},{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				group:['sbfenwei_effect','sbfenwei_backflow'],
				usable:2,
				position:'he',
				filter:function(event,player){
				    return player.countMark('charge')>0;
				},
				filterCard:true,
				selectCard:function(){
				    return 1;
				    //return [1,_status.event.player.countMark('charge')];
				},
				filterTarget:true,
				selectTarget:function(){
					return ui.selected.cards.length;
				},
				delay:false,
				discard:false,
				lose:false,
				complexSelect:true,
				filterOk:function(){
					return ui.selected.targets.length==ui.selected.cards.length;
				},
				multitarget:true,
				multiline:true,
				check:function(card){
					return 7-get.value(card);
				},
				content:function(){
					'step 0'
					player.removeMark('charge',cards.length);
					for(var i=0; i<cards.length; i++){
						targets[i].addToExpansion(cards[i],player,'give').gaintag.add('sbfenwei_effect');
					}
					'step 1'
					//player.addSkill('sbfenwei_effect');
					player.draw(cards.length);
				},
				ai:{
					order:6.9,
					result:{
						target:function(player,target){
							if(game.hasPlayer(current=>{
								return get.rawAttitude(player,current)>0&&current!=player&&get.attitude(player,current)<=0;
							})&&game.countPlayer(current=>{
								return get.attitude(player,current)>0;
							})<=2) return 0;
							return 1;
						},
					}
				},
				subSkill:{
					effect:{
						audio:'sbfenwei',
						trigger:{
							global:'useCardToTarget',
						},
						charlotte:true,
						forced:true,
						filter:function(event,player){
							return event.target.getExpansions('sbfenwei_effect').length>0&&get.type2(event.card)=='trick';
						},
						content:function(){
							'step 0'
							if(player.countMark('charge')<2) player.addMark('charge',1);
							var choiceList=['令'+get.translation(trigger.target)+'获得其随机一张“威”','移去'+ get.translation(trigger.target) +'的随机一张“威”，取消'+get.translation(trigger.card)+'对其的目标'];
							player.chooseControl().set('choiceList',choiceList).set('prompt','奋威：请选择一项').set('ai',()=>{
								var player=_status.event.player,evt=_status.event.getTrigger();
								if(get.effect(evt.target,evt.card,evt.player,player)<-10) return 1;
								return 0;
							});
							'step 1'
							var cards=trigger.target.getExpansions('sbfenwei_effect').randomGets(1);
							if(result.index==0){
								trigger.target.gain(cards,'gain2','fromStorage');
							}
							else {
								trigger.target.loseToDiscardpile(cards);
								trigger.targets.remove(trigger.target);
								trigger.getParent().triggeredTargets2.remove(trigger.target);
								trigger.untrigger();
							}
						},
						marktext:'威',
						intro:{
							name:'威',
							markcount:'expansion',
							content:'expansion',
						},
					},
					backflow:{
						audio:'sbfenwei',
						trigger:{
							player:['enterGame'],
							global:['phaseBefore']
						},
						forced:true,
						filter:function(event,player,name){
							return (event.name!='phase'||game.phaseNumber==0);
						},
						content:function(){
							var num=2-player.countMark('charge')
							if(num>0) player.addMark('charge',num);
						}
					}
				}
			},'sb_ganning'),
			//甄宓
			sbluoshen:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('sbluoshen')).set('ai',target=>{
						var eff=0;
						var num=Math.ceil(game.countPlayer()/2),players=game.filterPlayer(current=>current!=player).sortBySeat(target).slice(0,num);
						for(var targetx of players){
							eff+=get.attitude(player,targetx)*Math.sqrt(targetx.countCards('h'));
						}
						return 1-eff;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('sbluoshen',target);
						player.addTempSkill('sbluoshen_add');
						event.targets=game.filterPlayer(current=>current!=player).sortBySeat(target).slice(0,Math.ceil(game.countPlayer()/2));
					} else event.finish();
					'step 2'
					var target=event.targets.shift();
					event.target=target;
					player.line(target);
					if(!target.countCards('h')) event._result={bool:false};
					else target.chooseCard('展示一张手牌',true).set('ai',card=>{
						var val=get.attitude(target,player)>0?15:5;
						if(get.color(card)=='black') return val-get.value(card);
						return 7-get.value(card);
					});//.set('goon',get.attitude(target,player)>0);
					'step 3'
					if(result.bool){
						var card=result.cards[0];
						target.showCards(card,get.translation(target)+'【洛神】展示');
						if(get.color(card)=='black'){
							player.gain(card,target,'give','bySelf').gaintag.add('sbluoshen');
						}
						else if(get.color(card)=='red'){
							target.discard(card);
						}
					}
					'step 4'
					if(targets.length) event.goto(2);
				},
				subSkill:{
					add:{
						mod:{
							ignoredHandcard:function(card,player){
								if(card.hasGaintag('sbluoshen')){
									return true;
								}
							},
							cardDiscardable:function(card,player,name){
								if(name=='phaseDiscard'&&card.hasGaintag('sbluoshen')){
									return false;
								}
							},
						},
						onremove:function(player){
							player.removeGaintag('sbluoshen');
						},
					}
				}
			},
			//曹操
			sbjianxiong:{
				audio:2,
				trigger:{player:'damageEnd'},
				group:'sbjianxiong_mark',
				filter:function(event,player){
					return get.itemtype(event.cards)=='cards'&&event.cards.some(i=>get.position(i,true)=='o')||1-player.countMark('sbjianxiong')>0;
				},
				prompt2:function(event,player){
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
					maixie_hp:true,
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
						}
					}
				},
				marktext:'治',
				intro:{
					name:'治世',
					name2:'治世',
					content:'mark',
				},
				subSkill:{
					mark:{
						audio:'sbjianxiong',
						trigger:{global:'phaseBefore',player:'enterGame'},
						forced:true,
						filter:function(event,player){
							return (event.name!='phase'||game.phaseNumber==0);
						},
						content:function(){
							'step 0'
							var map={};
							var list=[];
							for(var i=1; i<=2; i++){
								var cn=get.cnNumber(i,true);
								map[cn]=i;
								list.push(cn);
							}
							event.map=map;
							list.push('cancel2');
							player.chooseControl(list,function(){
								return get.cnNumber(2,true);
							}).set('prompt','奸雄：获得任意枚“治世”标记');
							'step 1'
							if(result.control!='cancel2') player.addMark('sbjianxiong',event.map[result.control]);
						}
					}
				},
			},
			sbqingzheng:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				direct:true,
				content:function(){
					'step 0'
					var num=3-player.countMark('sbjianxiong');
					var prompt='###'+get.prompt('sbqingzheng')+'###弃置'+get.cnNumber(num)+'种花色的所有牌';
					var next=player.chooseButton([prompt,[lib.suit.map(i=>['','','lukai_'+i]),'vcard']],num);
					next.set('filterButton',button=>{
						var player=_status.event.player;
						var cards=player.getCards('h',{suit:button.link[2].slice(6)});
						return cards.length>0&&cards.filter(card=>lib.filter.cardDiscardable(card,player,'sbqingzheng')).length==cards.length;
					});
					next.set('ai',button=>{
						var player=_status.event.player;
						return player.countMark('sbjianxiong')*15-player.getCards('h',{suit:button.link[2].slice(6)}).map(i=>get.value(i)).reduce((p,c)=>p+c,0);
					});
					next.set('custom',{
						replace:{
							button:function(button){
								if(!_status.event.isMine()) return;
								if(button.classList.contains('selectable')==false) return;
								var cards=_status.event.player.getCards('h',{suit:button.link[2].slice(6)});
								if(cards.length){
									var chosen=cards.filter(i=>ui.selected.cards.contains(i)).length==cards.length;
									if(chosen){
										ui.selected.cards.removeArray(cards);
										cards.forEach(card=>{
											card.classList.remove('selected');
											card.updateTransform(false);
										});
									}else{
										ui.selected.cards.addArray(cards);
										cards.forEach(card=>{
											card.classList.add('selected');
											card.updateTransform(true);
										});
									}
								}
								if(button.classList.contains('selected')){
									ui.selected.buttons.remove(button);
									button.classList.remove('selected');
									if(_status.multitarget||_status.event.complexSelect){
										game.uncheck();
										game.check();
									}
								}
								else{
									button.classList.add('selected');
									ui.selected.buttons.add(button);
								}
								var custom=_status.event.custom;
								if(custom&&custom.add&&custom.add.button){
									custom.add.button();
								}
								game.check();
							}
						},
						add:next.custom.add
					});
					'step 1'
					if(result.bool){
						var cards=result.cards;
						if(!cards.length){
							var suits=result.links.map(i=>i[2].slice(6));
							cards=player.getCards('h',card=>suits.contains(get.suit(card,player)));
						}
						event.cards=cards;
						if(!cards.length) event.finish();
						else player.chooseTarget('清正：观看一名其他角色的手牌并弃置其中一种花色的所有牌',(card,player,target)=>{
							return target!=player&&target.countCards('h');
						}).set('ai',target=>{
							var player=_status.event.player,att=get.attitude(player,target);
							if(att>=0) return 0;
							return 1-att/2+Math.sqrt(target.countCards('h'));
						});
					} else event.finish();
					'step 2'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('sbqingzheng',target);
						player.discard(cards);
						var list=[];
						var dialog=['清正：弃置'+get.translation(target)+'一种花色的所有牌'];
						for(var suit of lib.suit.concat('none')){
							if(target.countCards('h',{suit:suit})){
								dialog.push('<div class="text center">'+get.translation(suit+'2')+'牌</div>');
								dialog.push(target.getCards('h',{suit:suit}));
								list.push(suit);
							}
						}
						if(list.length){
							player.chooseControl(list).set('dialog',dialog).set('ai',()=>{
								return _status.event.control;
							}).set('control',(()=>{
								var getv=(cards)=>cards.map(i=>get.value(i)).reduce((p,c)=>p+c,0);
								return list.sort((a,b)=>{
									return getv(target.getCards('h',{suit:b}))-getv(target.getCards('h',{suit:a}));
								})[0];
							})());
						}
					} else event.finish();
					'step 3'
					var cards2=target.getCards('h',{suit:result.control});
					event.cards2=cards2;
					target.discard(cards2,'notBySelf').set('discarder',player);
					'step 4'
					if(event.cards2.length<cards.length) target.damage();
					'step 5'
					if(player.countMark('sbjianxiong')<2&&player.hasSkill('sbjianxiong')){
						player.chooseBool('是否获得1枚“治世”？').set('ai',()=>Math.random()<0.5?0:1);
					} else event.finish();
					'step 6'
					if(result.bool){
						player.addMark('sbjianxiong',1);
					}
				},
				ai:{combo:'sbjianxiong'}
			},
			sbhujia:{
				audio:2,
				trigger:{player:'damageBegin4'},
				zhuSkill:true,
				direct:true,
				filter:function(event,player){
					return !player.hasSkill('sbhujia_used')&&game.hasPlayer(current=>{
						return current!=player&&current.group=='wei'&&player.hasZhuSkill('sbhujia',current);
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('sbhujia'),'将'+get.translation(trigger.source)+'即将对你造成的'+trigger.num+'点伤害转移给一名其他魏势力角色',(card,player,target)=>{
						return target!=player&&target.group=='wei'&&player.hasZhuSkill('sbhujia',target);
					}).set('ai',target=>{
						var player=_status.event.player,evt=_status.event.getTrigger();
						return get.damageEffect(target,evt.source,player,evt.nature)-_status.event.eff;
					}).set('eff',get.damageEffect(player,trigger.source,player,trigger.nature));
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('sbhujia',target);
						player.addTempSkill('sbhujia_used','roundStart');
						trigger.cancel();
						if(trigger.source) target.damage(trigger.source,trigger.nature,trigger.num).set('card',trigger.card).set('cards',trigger.cards);
						else target.damage('nosource',trigger.nature,trigger.num).set('card',trigger.card).set('cards',trigger.cards);
					}
				},
				ai:{
					maixie_defend:true,
					effect:{
						target:function(card,player,target){
							if(player.hasSkillTag('jueqing',false,target)) return;
							if(get.tag(card,'damage')&&!target.hasSkill('sbhujia_used')&&game.hasPlayer(current=>{
								return current!=target&&current.group=='wei'&&target.hasZhuSkill('sbhujia',current);
							})) return 0.8;
						}
					},
					threaten:function(player,target){
						if(target.countCards('h')==0) return 2;
					}
				},
				subSkill:{
					used:{charlotte:true},
				},
			},
			//张角
			sbleiji:{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return player.countMark('sbguidao')>=4;
				},
				filterTarget:lib.filter.notMe,
				content:function(){
					player.removeMark('sbguidao',4);
					target.damage('thunder');
				},
				ai:{
					order:9,
					result:{
						target:function(player,target){
							return get.damageEffect(target,player,target,'thunder');
						}
					}
				}
			},
			sbguidao:{
				audio:2,
				trigger:{
					global:['phaseBefore','damageEnd'],
					player:'enterGame',
				},
				forced:true,
				locked:false,
				group:'sbguidao_defend',
				filter:function(event,player){
					if(player.countMark('sbguidao')>=8) return false;
					if(event.name=='damage') return event.nature&&!player.hasSkill('sbguidao_forbid');
					return (event.name!='phase'||game.phaseNumber==0);
				},
				content:function(){
					var num=2;
					if(trigger.name!='damage') num+=2;
					num=Math.min(8-player.countMark('sbguidao'),num);
					player.addMark('sbguidao',num);
				},
				marktext:'兵',
				intro:{
					name:'道兵',
					name2:'道兵',
					content:'共有$枚“道兵”',
				},
				subSkill:{
					defend:{
						audio:'sbguidao',
						trigger:{player:'damageBegin4'},
						filter:function(event,player){
							return player.countMark('sbguidao')>=2;
						},
						prompt2:'弃2枚“道兵”，防止伤害',
						check:function(event,player){
							return event.num>=2||player.hp<=event.num;
						},
						content:function(){
							trigger.cancel();
							player.removeMark('sbguidao',2);
							if(player!=_status.currentPhase){
								player.addTempSkill('sbguidao_forbid',{player:'phaseBegin'});
							}
						},
					},
					forbid:{charlotte:true},
				}
			},
			sbhuangtian:{
				audio:2,
				trigger:{
					player:'phaseBegin',
				},
				forced:true,
				zhuSkill:true,
				group:'sbhuangtian_mark',
				filter:function(event,player){
					if(player.phaseNumber>1||game.phaseNumber>1) return false;
					if(!player.hasZhuSkill('sbhuangtian')) return false;
					return !game.hasPlayer(function(current){
						return current.countCards('hej','taipingyaoshu');
					})&&!Array.from(ui.cardPile.childNodes).concat(Array.from(ui.discardPile.childNodes)).concat(Array.from(ui.ordering.childNodes)).map(i=>i.name).contains('taipingyaoshu');
				},
				content:function(){
					'step 0'
					if(!lib.inpile.contains('taipingyaoshu')){
						lib.inpile.push('taipingyaoshu');
					}
					event.card=game.createCard2('taipingyaoshu','heart',3);
					'step 1'
					if(card) player.equip(card);
				},
				subSkill:{
					mark:{
						audio:'sbhuangtiang',
						trigger:{global:'damageSource'},
						forced:true,
						zhuSkill:true,
						filter:function(event,player){
							if(!player.hasZhuSkill('sbhuangtian')||!player.hasSkill('sbguidao',null,false,false)) return false;
							if(!event.source||player==event.source||event.source.group!='qun') return false;
							if(player.hasSkill('sbguidao')&&player.countMark('sbguidao')>=8) return false;
							// if(player.countMark('sbhuangtian_count')>999) return false;
							return true;
						},
						content:function(){
							player.addMark('sbguidao',1);
							// player.addTempSkill('sbhuangtian_count','roundStart');
							// player.addMark('sbhuangtian_count',1,false);
						}
					},
					count:{onremove:true}
				}
			},
			//夏侯氏
			sbqiaoshi:{
				audio:2,
				trigger:{player:'damageEnd'},
				usable:1,
				direct:true,
				filter:function(event,player){
					return event.source&&event.source!=player&&event.source.isIn();
				},
				content:function(){
					'step 0'
					trigger.source.chooseBool('樵拾：是否令'+get.translation(player)+'回复'+trigger.num+'点体力，然后你摸两张牌？').set('ai',()=>{
						return _status.event.bool;
					}).set('bool',get.recoverEffect(player,trigger.source,trigger.source)+get.effect(trigger.source,{name:'wuzhong'},trigger.source)>5);
					'step 1'
					if(result.bool){
						player.logSkill('sbqiaoshi');
						trigger.source.line(player,'green');
						player.recover(trigger.num);
						trigger.source.draw(2);
					}
					else player.storage.counttrigger.sbqiaoshi--;
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'damage')){
								if(get.attitude(target,player)<=0||target==player) return;
								if(target.storage.counttrigger&&target.storage.counttrigger.sbqiaoshi) return;
								if(target.hp<=1&&!player.canSave(target)) return;
								return [0,0.5,0,0.5];
							}
						},
					},
				}
			},
			sbyanyu:{
				enable:'phaseUse',
				usable:2,
				filterCard:{name:'sha'},
				selectCard:1,
				group:'sbyanyu_draw',
				check:()=>1,
				content:function(){
					player.draw();
				},
				subSkill:{
					draw:{
						trigger:{player:'phaseUseEnd'},
						filter:function(event,player){
							return player.getHistory('useSkill',evt=>{
								if(evt.skill!='sbyanyu') return false;
								var evtx=evt.event.getParent('phaseUse');
								if(!evtx||evtx!=_status.event.getParent('phaseUse')) return;
								return true;
							}).length;
						},
						direct:true,
						content:function(){
							'step 0'
							event.num=3*player.getHistory('useSkill',evt=>{
								if(evt.skill!='sbyanyu') return false;
								var evtx=evt.event.getParent('phaseUse');
								if(!evtx||evtx!=_status.event.getParent('phaseUse')) return;
								return true;
							}).length;
							player.chooseTarget(get.prompt('sbyanyu'),'令一名其他角色摸'+get.cnNumber(event.num)+'张牌',lib.filter.notMe).set('ai',target=>{
								var player=_status.event.player;
								return get.effect(target,{name:'wuzhong'},player,player);
							});
							'step 1'
							if(result.bool){
								var target=result.targets[0];
								player.logSkill('sbyanyu_draw',target);
								target.draw(num);
							}
						}
					}
				},
				ai:{
					order:function(obj,player){
						if(game.hasPlayer(current=>current!=player&&get.attitude(player,current)>0)&&player.getHistory('useSkill',evt=>{
							if(evt.skill!='sbyanyu') return false;
							var evtx=evt.event.getParent('phaseUse');
							if(!evtx||evtx!=_status.event.getParent('phaseUse')) return;
							return true;
						}).length<2) return 9;
						return 2;
					},
					result:{
						player:1
					},
				}
			},
			//曹仁
			sbjushou:{
				audio:3,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return !player.isTurnedOver();
				},
				filterCard:true,
				selectCard:[1,2],
				check:function(card){
					if(ui.selected.cards.length+_status.event.player.hujia>=5) return 0;
					return 6.5-get.value(card);
				},
				position:'he',
				group:['sbjushou_damage','sbjushou_draw'],
				content:function(){
					player.turnOver();
					player.changeHujia(cards.length,null,true);
				},
				ai:{
					order:5,
					result:{
						player:1,
					}
				},
				subSkill:{
					damage:{
						audio:'sbjushou',
						trigger:{
							player:'damageEnd',
						},
						filter:function(event,player){
							return player.isTurnedOver();
						},
						direct:true,
						content:function(){
							'step 0'
							player.chooseControl('翻面','获得1点护甲','cancel2').set('ai',()=>{
								if(_status.event.player.hujia>=3) return 0;
								return 1;
							}).set('prompt',get.prompt('sbjushou')).set('prompt2','选择一项');
							'step 1'
							if(result.control=='cancel2'){
								event.finish();
								return;
							}
							player.logSkill('sbjushou');
							if(result.control=='翻面'){
								player.turnOver();
							}
							else {
								player.changeHujia(1,null,true);
							}
						},
						ai:{
							effect:{
								target:function(card,player,target){
									if(!target.isTurnedOver()) return;
									if(get.tag(card,'damage')){
										if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
										if((card.name=='sha'&&!player.hasSkill('jiu'))||target.hasSkillTag('filterDamage',null,{
											player:player,
											card:card,
										})) return 'zerotarget';
									}
								},
							},
						},
					},
					draw:{
						audio:'sbjushou',
						trigger:{player:'turnOverAfter'},
						forced:true,
						locked:false,
						filter:function(event,player){
							return !player.isTurnedOver()&&player.hujia>0;
						},
						content:function(){
							player.draw(player.hujia);
						},
					}
				}
			},
			sbjiewei:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.hujia>0;
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h');
				},
				content:function(){
					player.changeHujia(-1);
					player.gainPlayerCard(target,'visible',true,'h').set('ai',function(button){
						return get.value(button.link,_status.event.target);
					});
				},
				ai:{
					order:8,
					result:{
						target:-1,
					}
				}
			},
			//周瑜
			sbyingzi:{
				audio:2,
				audioname:['sb_sunce'],
				trigger:{player:'phaseDrawBegin2'},
				forced:true,
				getNum:function(player){
					return (player.countCards('h')>=2)+(player.hp>=2)+(player.countCards('e')>=1);
				},
				filter:function(event,player){
					return !event.numFixed&&lib.skill.sbyingzi.getNum(player)>0;
				},
				content:function(){
					var num=lib.skill.sbyingzi.getNum(player);
					trigger.num+=num;
					player.addTempSkill('sbyingzi_limit');
					player.addMark('sbyingzi_limit',num,false);
				},
				ai:{
					threaten:2
				},
				subSkill:{
					limit:{
						charlotte:true,
						forced:true,
						onremove:true,
						marktext:'英',
						intro:{
							content:'本回合手牌上限+#',
						},
						mod:{
							maxHandcard:function(player,num){
								return num+player.countMark('sbyingzi_limit');
							}
						},
					}
				}
			},
			sbfanjian:{
				audio:2,
				enable:'phaseUse',
				usable:5,
				filter:function(event,player){
					return !player.hasSkill('sbfanjian_ban');
				},
				chooseButton:{
					dialog:function(){
						return ui.create.dialog('###反间###'+get.translation('sbfanjian_info'));
					},
					chooseControl:function(event,player){
						var suits=lib.suit.slice();
						suits.push('cancel2');
						return suits;
					},
					check:function(event,player){
						var suits=lib.suit.slice();
						suits=suits.filter(suit=>!player.getStorage('sbfanjian_guessed').contains(suit));
						return suits.randomGet();
					},
					backup:function(result,player){
						return {
							audio:'sbfanjian',
							filterCard:function(card,player){
								return !player.getStorage('sbfanjian_guessed').contains(get.suit(card,player));
							},
							suit:result.control,
							position:'h',
							filterTarget:lib.filter.notMe,
							check:function(card){
								return 6-get.value(card);
							},
							discard:false,
							lose:false,
							delay:false,
							content:function(){
								'step 0'
								var suit=get.suit(cards,player);
								event.claimSuit=lib.skill.sbfanjian_backup.suit;
								event.cardSuit=suit;
								player.addTempSkill('sbfanjian_guessed');
								var claim=get.translation(event.claimSuit+'2');
								player.chat('我声明'+claim);
								game.log(player,'声明了','#y'+claim);
								var choiceList=['猜测此牌花色为'+claim,'猜测此牌花色不为'+claim,'不猜测，你翻面并令其〖反间〗失效'];
								target.chooseControl().set('choiceList',choiceList).set('prompt',get.translation(player)+'对你发动了【反间】并选择了一张牌，请选择一项').set('ai',()=>{
									var player=_status.event.player,user=_status.event.getParent().player,claim=_status.event.getParent().claimSuit,suit=_status.event.getParent().cardSuit;
									if(player.isTurnedOver()) return 2;
									var lose=get.effect(player,{name:'losehp'},user,player);
									if(user.getStorage('sbfanjian_guessed').contains(claim)&&claim==suit) return lose<=0?0:1;
									if(get.attitude(player,user)>0) return 0;
									var list=[0,1];
									if(player.hp<=1&&player.getFriends().length>0) list.push(2);
									return list.randomGet();
								});
								'step 1'
								player.markAuto('sbfanjian_guessed',[event.cardSuit]);
								if(result.index==2){
									game.log(target,'选择','#y不猜测');
									target.chat('不猜！');
									target.turnOver();
								}
								else {
									var claim=get.translation(event.claimSuit+'2');
									target.chat('我猜花色'+(result.index==1?'不':'')+'为'+claim);
									game.log(target,'猜测花色','#g'+(result.index==1?'不':'')+'为'+claim);
								}
								if(event.isMine()&&!event.isOnline()) game.delayx();
								'step 2'
								target.gain(cards,player,'giveAuto','bySelf');
								'step 3'
								if(result.index==0&&event.claimSuit!=event.cardSuit||result.index==1&&event.claimSuit==event.cardSuit){
									game.log(target,'猜测','#y错误');
									target.loseHp();
								}
								else {
									if(result.index!=2) game.log(target,'猜测','#g正确');
									player.addTempSkill('sbfanjian_ban');
								}
							},
							ai:{
								result:{
									target:function(player,target){
										if(!ui.selected.cards.length) return 0;
										var val=get.value(ui.selected.cards,target);
										if(val<0) return val+get.effect(target,{name:'losehp'},player,target);
										if(val>5||get.value(ui.selected.cards,player)>5) return target.isTurnedOver()?5:0;
										return get.effect(target,{name:'losehp'},player,target);
									},
								},
							},
						}
					},
					prompt:function(result){
						return '你选择了'+get.translation(result.control)+'，请选择一张手牌和【反间】的目标';
					},
				},
				subSkill:{
					guessed:{onremove:true,charlotte:true},
					ban:{charlotte:true},
					backup:{},
				},
				ai:{
					order:4,
					result:{player:1}
				}
			},
			//黄盖
			sbkurou:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				direct:true,
				group:'sbkurou_gain',
				content:function(){
					'step 0'
					player.chooseCardTarget({
						prompt:get.prompt('sbkurou'),
						prompt2:'交给其他角色一张牌，若此牌为【桃】或【酒】，你失去2点体力，否则你失去1点体力',
						filterCard:true,
						position:'he',
						filterTarget:lib.filter.notMe,
						ai1:function(card){
							if(player.hp<=1&&!player.canSave(player)||player.hujia>=5) return 0;
							if(get.value(card,player)>6&&!game.hasPlayer(current=>{
								return current!=player&&get.attitude(current,player)>0&&!current.hasSkillTag('nogain');
							})) return 0;
							if(player.hp>=2&&(card.name=='tao'||(card.name=='jiu'&&player.countCards('hs',cardx=>{
								return cardx!=card&&get.tag(cardx,'save');
							})))&&player.hujia<=1) return 10;
							if(player.hp<=1&&!player.canSave(player)) return 0;
							return 1/Math.max(0.1,get.value(card));
						},
						ai2:function(target){
							var player=_status.event.player,att=get.attitude(player,target);
							if(ui.selected.cards.length){
								var val=get.value(ui.selected.cards[0]);
								att*=val>=0?1:-1;
							}
							if(target.hasSkillTag('nogain')) att/=9;
							return 15+att;
						},
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0],card=result.cards[0];
						player.logSkill('sbkurou',target);
						player.give(card,target);
						player.loseHp(['tao','jiu'].contains(get.name(card,target))?2:1);
					}
				},
				subSkill:{
					gain:{
						audio:'sbkurou',
						trigger:{player:'loseHpEnd'},
						forced:true,
						locked:false,
						filter:function(event,player){
							return player.isIn()&&player.hujia<5;
						},
						content:function(){
							'step 0'
							event.count=trigger.num;
							'step 1'
							player.changeHujia(2,null,true);
							'step 2'
							if(--event.count>0){
								player.logSkill('sbkurou_gain');
								event.goto(1);
							}
						},
						ai:{
							maihp:true,
							effect:function(card,player,target){
								if(get.tag(card,'damage')){
									if(player.hasSkillTag('jueqing',false,target)) return [1,1];
									return 1.2;
								}
								if(get.tag(card,'loseHp')){
									if(target.hp<=1||target.hujia>=5) return;
									return [1,1];
								}
							}
						}
					},
				}
			},
			sbzhaxiang:{
				audio:2,
				trigger:{player:'useCard'},
				forced:true,
				group:'sbzhaxiang_draw',
				filter:function(event,player){
					return player.getHistory('useCard').length<=player.getDamagedHp();
				},
				content:function(){
					trigger.directHit.addArray(game.filterPlayer());
				},
				ai:{
					threaten:1.5,
					directHit_ai:true,
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
						audio:'sbzhaxiang',
						trigger:{player:'phaseDrawBegin2'},
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
									if(get.tag(card,'recover')&&target.hp>=target.maxHp-1&&target.maxHp>1) return [0,0];
								}
							}
						}
					}
				}
			},
			//孙权
			sbzhiheng:{
				audio:2,
				audioname:['shen_caopi'],
				enable:'phaseUse',
				usable:1,
				position:'he',
				filterCard:lib.filter.cardDiscardable,
				discard:false,
				lose:false,
				delay:false,
				selectCard:[1,Infinity],
				prompt:function(event){
					var count=_status.event.player.countMark('sbtongye');
					var str='出牌阶段限一次。你可以弃置任意张牌并摸等量的牌，若你以此法弃置的牌包括你所有手牌，则你多摸'+get.cnNumber(count+1)+'张牌';
					if(count>0) str+='，并弃1枚“业”';
					str+='。';
					return str;
				},
				check:function(card){
					var player=_status.event.player;
					if(get.position(card)=='h'&&!player.countCards('h','du')&&(player.hp>2||!player.countCards('h',function(card){
						return get.value(card)>=8;
					}))){
						return 1;
					}
					return 6-get.value(card);
				},
				content:function(){
					'step 0'
					player.discard(cards);
					event.num=1;
					var hs=player.getCards('h');
					if(!hs.length) event.num=0;
					for(var i=0; i<hs.length; i++){
						if(!cards.contains(hs[i])){
							event.num=0; break;
						}
					}
					'step 1'
					var all=event.num;
					player.draw((all?1+player.countMark('sbtongye'):0)+cards.length);
					if(all) player.removeMark('sbtongye',1);
				},
				ai:{
					order:1,
					result:{
						player:1
					},
					threaten:1.56
				},
			},
			sbtongye:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				forced:true,
				onremove:true,
				content:function(){
					'step 0'
					player.chooseControl('变化','不变').set('prompt','统业：猜测场上装备数是否于你下回合准备阶段前发生变化').set('ai',()=>Number((game.countPlayer()<=4?Math.random():1)<0.4));
					'step 1'
					if(result.control=='变化'){
						player.addSkill('sbtongye_change',1);
						player.chat('变！');
					}else{
						player.addSkill('sbtongye_nochange',1);
						player.chat('不变！');
					}
					var num=game.filterPlayer().map(i=>i.countCards('e')).reduce((p,c)=>p+c,0);
					player.removeMark('sbtongye_count',player.countMark('sbtongye_count'),false);
					if(num>0) player.addMark('sbtongye_count',num,false);
					player.addSkill('sbtongye_settle');
				},
				marktext:'业',
				intro:{
					name:'统业',
					name2:'业',
					content:'mark',
				},
				subSkill:{
					broadcast:{
						trigger:{
							global:['loseAfter','equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
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
						},
					},
					settle:{
						audio:'sbtongye',
						init:function(player){
							player.addSkill('sbtongye_broadcast');
						},
						trigger:{player:'phaseZhunbeiBegin'},
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
						}
					},
					change:{
						charlotte:true,
						mark:true,
						marktext:'变',
						intro:{
							markcount:function(storage,player){
								return game.filterPlayer().map(i=>i.countCards('e')).reduce((p,c)=>p+c,0)-player.countMark('sbtongye_count');
							},
							mark:function(dialog,storage,player){
								dialog.addText(get.translation(player)+'猜测场上装备数发生变化');
								var delta=game.filterPlayer().map(i=>i.countCards('e')).reduce((p,c)=>p+c,0)-player.countMark('sbtongye_count');
								if(delta==0) dialog.addText('(当前未发生变化)');
								else dialog.addText('(当前已'+(delta>0?'增加':'减少')+get.cnNumber(Math.abs(delta))+'张装备牌)');
							}
						}
					},
					nochange:{
						charlotte:true,
						mark:true,
						marktext:'<span style="text-decoration:line-through;">变</span>',
						intro:{
							markcount:function(storage,player){
								return game.filterPlayer().map(i=>i.countCards('e')).reduce((p,c)=>p+c,0)-player.countMark('sbtongye_count');
							},
							mark:function(dialog,storage,player){
								dialog.addText(get.translation(player)+'猜测场上装备数不发生变化');
								var delta=game.filterPlayer().map(i=>i.countCards('e')).reduce((p,c)=>p+c,0)-player.countMark('sbtongye_count');
								if(delta==0) dialog.addText('(当前未发生变化)');
								else dialog.addText('(当前已'+(delta>0?'增加':'减少')+get.cnNumber(Math.abs(delta))+'张装备牌)');
							}
						}
					},
				}
			},
			sbjiuyuan:{
				audio:2,
				trigger:{global:'useCard'},
				forced:true,
				zhuSkill:true,
				group:'sbjiuyuan_recover',
				filter:function(event,player){
					return event.card.name=='tao'&&player!=event.player&&event.player.group=='wu'&&
						event.player.isIn()&&player.hasZhuSkill('sbjiuyuan',event.player);
				},
				content:function(){
					player.draw();
				},
				subSkill:{
					recover:{
						audio:'sbjiuyuan',
						trigger:{target:'taoBegin'},
						zhuSkill:true,
						forced:true,
						filter:function(event,player){
							if(event.player==player) return false;
							if(!player.hasZhuSkill('sbjiuyuan',event.player)) return false;
							if(event.player.group!='wu') return false;
							return true;
						},
						content:function(){
							trigger.baseDamage++;
						}
					}
				},
			},
			//孙尚香
			sbjieyin:{
				trigger:{player:'phaseUseBegin'},
				forced:true,
				locked:false,
				dutySkill:true,
				group:['sbjieyin_init','sbjieyin_fail'],
				filter:function(event,player){
					return game.hasPlayer(current=>current.hasMark('sbjieyin_mark'));
				},
				content:function(){
					'step 0'
					var targets=game.filterPlayer(current=>current.hasMark('sbjieyin_mark'));
					event.targets=targets;
					'step 1'
					var target=targets.shift();
					event.target=target;
					var str=target.hasSkill('sbjieyin_marked')?'移去':'移动或移去';
					var num=Math.min(2,Math.max(1,target.countCards('h')));
					target.chooseCard('交给'+get.translation(player)+get.cnNumber(num)+'张手牌，然后获得1点护甲；或令其'+str+'你的所有“助”标记',num).set('ai',card=>{
						if(get.attitude(target,player)>1) return 100-get.value(card);
						return 0;
					});//.set('goon',get.attitude(target,player)>1);
					'step 2'
					if(result.bool){
						target.give(result.cards,player);
						target.changeHujia(1,null,true);
						event.goto(4);
					}else{
						if(!game.hasPlayer(current=>current!=player&&current!=target)||target.hasSkill('sbjieyin_marked')) event._result={bool:false};
						else player.chooseTarget('结姻：是否移动'+get.translation(target)+'的“助”？',(card,player,target)=>{
							return target!=player&&target!=_status.event.getParent().target;
						}).set('ai',target=>get.attitude(_status.event.player,target)-1);
						target.addSkill('sbjieyin_marked');
					}
					'step 3'
					if(result.bool){
						var targetx=result.targets[0];
						var num=target.countMark('sbjieyin_mark');
						target.removeSkill('sbjieyin_mark');
						targetx.addSkill('sbjieyin_mark');
						targetx.addMark('sbjieyin_mark',num,false);
						player.line2([target,targetx],'green');
						game.log(player,'将',target,'的'+get.cnNumber(num)+'枚“助”移动至',targetx);
					}else{
						target.removeSkill('sbjieyin_mark');
						game.log(player,'移去了',target,'的'+get.cnNumber(num)+'枚“助”');
						game.createEvent('sbjieyin_fail').setContent(lib.skill.sbjieyin_fail.content).player=player;
					}
					'step 4'
					if(targets.length) event.goto(1);
				},
				subSkill:{
					fail:{
						audio:'sbjieyin',
						trigger:{global:'dieAfter'},
						dutySkill:true,
						forced:true,
						locked:false,
						direct:true,
						filter:function(event,player){
							return event.player.hasMark('sbjieyin_mark');
						},
						content:function(){
							player.logSkill('sbjieyin_fail');
							player.awakenSkill('sbjieyin');
							game.log(player,'使命失败');
							player.changeGroup('wu');
							player.recover();
							player.gain(player.getExpansions('sbliangzhu'),'gain2');
							player.loseMaxHp();
						}
					},
					mark:{
						charlotte:true,
						mark:true,
						marktext:'助',
						onremove:true,
						intro:{
							name:'结姻(助)',
							name2:'助',
							content:'mark'
						}
					},
					marked:{charlotte:true},
					init:{
						audio:'sbjieyin',
						trigger:{
							global:'phaseBefore',
							player:'enterGame',
						},
						forced:true,
						locked:false,
						direct:true,
						dutySkill:true,
						filter:function(event,player){
							return game.hasPlayer(current=>current!=player)&&(event.name!='phase'||game.phaseNumber==0);
						},
						content:function(){
							'step 0'
							player.chooseTarget('结姻：令一名其他角色获得1枚“助”',lib.filter.notMe,true).set('ai',target=>get.attitude(_status.event.player,target));
							'step 1'
							if(result.bool){
								var target=result.targets[0];
								player.logSkill('sbjieyin_init',target);
								target.addSkill('sbjieyin_mark');
								target.addMark('sbjieyin_mark',1);
							}
							'step 2'
							game.delayx();
						}
					},
				}
			},
			sbliangzhu:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.group=='shu'&&game.hasPlayer(current=>current!=player&&current.countCards('e'));
				},
				groupSkill:true,
				filterTarget:function(card,player,target){
					return target.countCards('e')&&target!=player;
				},
				content:function(){
					'step 0'
					player.choosePlayerCard(target,'e',true);
					'step 1'
					if(result.bool){
						player.addToExpansion(result.cards,target,'give').gaintag.add('sbliangzhu');
					} else event.finish();
					'step 2'
					for(var target of game.filterPlayer(current=>current.hasMark('sbjieyin_mark'))){
						target.chooseDrawRecover(2,true);
					}
				},
				marktext:'妆',
				intro:{
					name:'良助(妆)',
					name2:'妆',
					content:'expansion',
					markcount:'expansion',
				},
				onremove:function(player,skill){
					var cards=player.getExpansions(skill);
					if(cards.length) player.loseToDiscardpile(cards);
				},
				ai:{
					order:9,
					result:{
						player:function(player){
							var num=0,targets=game.filterPlayer(current=>current.hasMark('sbjieyin_mark'));
							for(var current of targets){
								num+=get.effect(current,{name:'wuzhong'},player,player);
							}
							if(num>0) return 3;
							return 1;
						},
						target:-1,
					}
				}
			},
			sbxiaoji:{
				audio:2,
				audioname:['sp_sunshangxiang','re_sunshangxiang','db_sunshangxiang'],
				trigger:{
					player:'loseAfter',
					global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
				},
				forced:true,
				locked:false,
				groupSkill:true,
				filter:function(event,player){
					if(player.group!='wu') return false;
					var evt=event.getl(player);
					return evt&&evt.player==player&&evt.es&&evt.es.length>0;
				},
				content:function(){
					'step 0'
					event.count=trigger.getl(player).es.length;
					'step 1'
					event.count--;
					player.draw(2);
					player.chooseTarget('是否弃置场上的一张牌？',(card,player,target)=>{
						return target.countDiscardableCards(player,'ej');
					}).set('ai',target=>{
						var player=_status.event.player;
						var att=get.attitude(player,target);
						if(att>0&&(target.countCards('j')>0||target.countCards('e',function(card){
							return get.value(card,target)<0;
						}))) return 2;
						if(att<0&&target.countCards('e')>0&&!target.hasSkillTag('noe')) return -1;
						return 0;
					});
					'step 2'
					if(result.bool){
						player.discardPlayerCard(result.targets[0],'ej',true);
					}
					'step 3'
					if(event.count>0){
						player.logSkill('sbxiaoji');
						event.goto(1);
					}
				},
				ai:{
					noe:true,
					reverseEquip:true,
					effect:{
						target:function(card,player,target,current){
							if(get.type(card)=='equip'&&!get.cardtag(card,'gifts')) return [1,3];
						}
					}
				},
			},
			//吕蒙
			sbkeji:{
				audio:2,
				enable:'phaseUse',
				filterCard:true,
				selectCard:function(){
					var player=_status.event.player;
					if(player.hasSkill('sbkeji_discard')) return [0,0];
					if(player.hasSkill('sbkeji_losehp')) return [1,1];
					return [0,1];
				},
				locked:false,
				usable:2,
				prompt:function(event){
					var player=_status.event.player,str='出牌阶段'+(player.storage.sbkeji?'':'各')+'限一次。你可以';
					var discard=player.hasSkill('sbkeji_discard'),losehp=player.hasSkill('sbkeji_losehp');
					if(!discard) str+='弃置一张手牌并获得1点护甲';
					if(!losehp) str+=(!discard?'，或':'')+'点击“确定”失去1点体力并获得2点护甲';
					return str;
				},
				filter:function(event,player){
					return (player.getStat('skill').sbkeji||0)<(player.storage.sbkeji?1:2);
				},
				check:function(card){
					var player=_status.event.player;
					if(_status.event.player.hp==1&&player.canSave(player)&&player.hujia<=3) return 0;
					return 6-get.value(card);
				},
				content:function(){
					'step 0'
					if(cards.length){
						player.changeHujia(1,null,true);
						player.addTempSkill('sbkeji_discard','phaseUseAfter');
						event.finish();
					}
					else{
						player.loseHp();
					}
					'step 1'
					player.changeHujia(2,null,true);
					player.addTempSkill('sbkeji_losehp','phaseUseAfter');
				},
				mod:{
					maxHandcard:function(player,num){
						return num+player.hujia;
					},
					cardEnabled:function(card,player){
						if(player!=_status.event.dying&&card.name=='tao') return false;
					},
					cardSavable:function(card,player){
						if(player!=_status.event.dying&&card.name=='tao') return false;
					},
				},
				ai:{
					order:1,
					result:{
						player:function(player,target){
							if(player.hujia>=5) return 0;
							if(player.hp==1&&!player.canSave(player)&&!player.hasCard(card=>{
								return lib.filter.cardDiscardable(card,player,'sbkeji')&&get.value(card)<6;
							},'h')){
								return 0;
							}
							return 1;
						}
					},
				},
				subSkill:{
					discard:{charlotte:true},
					losehp:{charlotte:true},
				}
			},
			sbdujiang:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				derivation:'sbduojing',
				juexingji:true,
				forced:true,
				skillAnimation:true,
				animationColor:'wood',
				filter:function(event,player){
					return player.hujia>=3;
				},
				content:function(){
					player.awakenSkill('sbdujiang');
					player.addSkillLog('sbduojing');
					player.storage.sbkeji=true;
				}
			},
			sbduojing:{
				audio:2,
				trigger:{player:'useCardToPlayer'},
				filter:function(event,player){
					return player.hujia>0&&event.card.name=='sha';
				},
				check:function(event,player){
					return event.target.countGainableCards(player,'he')>0||player.countCards('hs',{name:'sha'})>0;
				},
				logTarget:'target',
				content:function(){
					'step 0'
					player.changeHujia(-1);
					if(!trigger.card.storage) trigger.card.storage={};
					trigger.card.storage.sbduojing=true;
					'step 1'
					var target=trigger.target;
					if(target.countGainableCards(player,'he')>0) player.gainPlayerCard(target,'he',true);
					player.addTempSkill('sbduojing_add','phaseUseAfter');
					player.addMark('sbduojing_add',1,false);
					player.markSkill('sbduojing_add');
				},
				subSkill:{
					add:{
						charlotte:true,
						marktext:'夺',
						onremove:true,
						intro:{
							content:'本阶段使用杀次数上限+$'
						},
						mod:{
							cardUsable:function(card,player,num){
								if(card.name=='sha') return num+player.countMark('sbduojing_add');
							},
						},
					},
				},
				ai:{
					unequip:true,
					unequip_ai:true,
					skillTagFilter:function(player,tag,arg){
						if(player.hujia<=0) return;
						if(tag=='unequip'&&(!arg||!arg.card||!arg.card.storage||!arg.card.storage.sbduojing)) return false;
						if(tag=='unequip_ai'&&(!arg||arg.name!='sha')) return false;
					},
				},
			},
			//于禁
			sbxiayuan:{
				audio:2,
				trigger:{global:'damageEnd'},
				direct:true,
				filter:function(event,player){
					return event.hujia&&!event.player.hujia&&event.player.isIn()&&player.countCards('h')>1&&!player.hasSkill('sbxiayuan_round',null,false,false);
				},
				content:function(){
					'step 0'
					player.addTempSkill('sbxiayuan_round','roundStart');
					player.chooseToDiscard(2,'h',get.prompt('sbxiayuan',trigger.player),'弃置两张手牌，令其获得'+get.cnNumber(trigger.hujia)+'点护甲')/*.set('goon',get.attitude(player,trigger.player)>0)*/.set('ai',function(card){
						if(!get.attitude(player,trigger.player)>0) return 0;
						return 5-get.value(card);
					}).logSkill=['sbxiayuan',trigger.player];
					'step 1'
					if(result.bool){
						var target=trigger.player;
						target.changeHujia(trigger.hujia,null,true);
						game.delayx();
					}
					else player.removeSkill('sbxiayuan_round');
				},
				subSkill:{round:{charlotte:true}},
				ai:{expose:0.2},
			},
			sbjieyue:{
				audio:4,
				trigger:{player:'phaseJieshuBegin'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(lib.filter.notMe,get.prompt('sbjieyue'),'令一名其他角色获得1点护甲，然后该角色可以交给你一张牌。').set('ai',function(target){
						return get.attitude(_status.event.player,target)/Math.sqrt(Math.min(1,target.hp+target.hujia));
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('sbjieyue',target);
						target.changeHujia(1,null,true);
						target.chooseCard('he','是否交给'+get.translation(player)+'一张牌？').set('ai',(card)=>0.1-get.value(card));
					}
					else event.finish();
					'step 2'
					if(result.bool){
						target.give(result.cards,player);
					}
				},
				ai:{
					threaten:2.7,
					expose:0.2,
				},
			},
			//华雄
			sbyangwei:{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return !player.hasSkill('sbyangwei_counter',null,null,false);
				},
				content:function(){
					player.draw(2);
					player.addTempSkill('sbyangwei_effect');
					player.addSkill('sbyangwei_counter');
				},
				ai:{
					order:9,
					result:{player:1},
				},
				subSkill:{
					effect:{
						audio:'sbyangwei',
						equipSkill:false,
						inherit:'qinggang_skill',
						charlotte:true,
						nopop:true,
						mod:{
							targetInRange:function(card){
								if(card.name=='sha') return true;
							},
							cardUsable:function(card,player,num){
								if(card.name=='sha') return num+1;
							},
						},
						mark:true,
						marktext:'威',
						intro:{content:'使用【杀】的次数上限+1且无距离限制且无视防具'},
					},
					counter:{
						trigger:{player:'phaseJieshu'},
						silent:true,
						popup:false,
						forced:true,
						charlotte:true,
						onremove:true,
						content:function(){
							if(!player.storage.sbyangwei_counter) player.storage.sbyangwei_counter=true;
							else player.removeSkill('sbyangwei_counter');
						},
					},
				},
			},
			//黄忠
			sbliegong:{
				audio:2,
				mod:{
					cardnature:function(card,player){
						if(player.hasEmptySlot(1)&&get.name(card,player)=='sha') return false;
					},
				},
				trigger:{player:'useCardToPlayered'},
				filter:function(event,player){
					return !event.getParent()._sbliegong_player&&event.targets.length==1&&event.card.name=='sha'&&player.getStorage('sbliegong').length>0;
				},
				prompt2:function(event,player){
					var str='',storage=player.getStorage('sbliegong');
					if(storage.length>1){
						str+=('展示牌堆顶的'+get.cnNumber(storage.length-1)+'张牌并增加伤害；且');
					}
					str+=('令'+get.translation(event.target)+'不能使用花色为');
					for(var i=0;i<storage.length;i++){
						str+=get.translation(storage[i]);
					}
					str+=('的牌响应'+get.translation(event.card));
					return str;
				},
				logTarget:'target',
				locked:false,
				check:function(event,player){
					var target=event.target;
					if(get.attitude(player,target)>0) return false;
					if(target.hasSkillTag('filterDamage',null,{
						player:player,
						card:event.card,
					})) return false;
					var storage=player.getStorage('sbliegong');
					if(storage.length>=4) return true;
					if(storage.length<3) return false;
					if(target.hasShan()) return storage.contains('heart')&&storage.contains('diamond');
					return true;
				},
				content:function(){
					var storage=player.getStorage('sbliegong').slice(0);
					var num=storage.length-1;
					var evt=trigger.getParent();
					if(num>0){
						if(typeof evt.baseDamage!='number') evt.baseDamage=1;
						var cards=get.cards(num);
						player.showCards(cards.slice(0),get.translation(player)+'发动了【烈弓】');
						while(cards.length>0){
							var card=cards.pop();
							if(storage.contains(get.suit(card,false))) evt.baseDamage++;
							ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
						}
						game.updateRoundNumber();
					}
					evt._sbliegong_player=player;
					player.addTempSkill('sbliegong_clear');
					var target=trigger.target;
					target.addTempSkill('sbliegong_block');
					if(!target.storage.sbliegong_block) target.storage.sbliegong_block=[];
					target.storage.sbliegong_block.push([evt.card,storage]);
					lib.skill.sbliegong.updateBlocker(target);
				},
				updateBlocker:function(player){
					var list=[],storage=player.storage.sbliegong_block;
					if(storage&&storage.length){
						for(var i of storage) list.addArray(i[1]);
					}
					player.storage.sbliegong_blocker=list;
				},
				ai:{
					threaten:3.5,
					directHit_ai:true,
					halfneg:true,
					skillTagFilter:function(player,tag,arg){
						if(arg&&arg.card&&arg.card.name=='sha'){
							var storage=player.getStorage('sbliegong');
							if(storage.length<3||!storage.contains('heart')||!storage.contains('diamond')) return false;
							var target=arg.target;
							if(target.hasSkill('bagua_skill')||target.hasSkill('bazhen')||target.hasSkill('rw_bagua_skill')) return false;
							return true;
						}
						return false;
					},
				},
				intro:{
					content:'已记录花色：$',
					onunmark:true,
				},
				group:'sbliegong_count',
				subSkill:{
					clear:{
						trigger:{player:'useCardAfter'},
						forced:true,
						charlotte:true,
						popup:false,
						filter:function(event,player){
							return event._sbliegong_player==player;
						},
						content:function(){
							player.unmarkSkill('sbliegong');
						},
					},
					block:{
						mod:{
							cardEnabled:function(card,player){
								if(!player.storage.sbliegong_blocker) return;
								var suit=get.suit(card);
								if(suit=='none') return;
								var evt=_status.event;
								if(evt.name!='chooseToUse') evt=evt.getParent('chooseToUse');
								if(!evt||!evt.respondTo||evt.respondTo[1].name!='sha') return;
								if(player.storage.sbliegong_blocker.contains(suit)) return false;
							},
						},
						trigger:{
							player:['damageBefore','damageCancelled','damageZero'],
							target:['shaMiss','useCardToExcluded','useCardToEnd'],
							global:['useCardEnd'],
						},
						forced:true,
						firstDo:true,
						charlotte:true,
						onremove:function(player){
							delete player.storage.sbliegong_block;
							delete player.storage.sbliegong_blocker;
						},
						filter:function(event,player){
							if(!event.card||!player.storage.sbliegong_block) return false;
							for(var i of player.storage.sbliegong_block){
								if(i[0]==event.card) return true;
							}
							return false;
						},
						content:function(){
							var storage=player.storage.sbliegong_block;
							for(var i=0;i<storage.length;i++){
								if(storage[i][0]==trigger.card){
									storage.splice(i--,1);
								}
							}
							if(!storage.length) player.removeSkill('sbliegong_block');
							else lib.skill.sbliegong.updateBlocker(target);
						},
					},
					count:{
						trigger:{
							player:'useCard',
							target:'useCardToTargeted',
						},
						forced:true,
						filter:function(event,player,name){
							if(name!='useCard'&&player==event.player) return false;
							var suit=get.suit(event.card);
							if(!lib.suit.contains(suit)) return false;
							if(player.storage.sbliegong&&player.storage.sbliegong.contains(suit)) return false;
							return true;
						},
						content:function(){
							player.markAuto('sbliegong',[get.suit(trigger.card)]);
						},
					},
				},
			},
			//刘赪
			splveying:{
				audio:2,
				trigger:{player:'useCardAfter'},
				forced:true,
				filter:function(event,player){
					return event.card.name=='sha'&&player.countMark('splveying')>1;
				},
				content:function(){
					'step 0'
					player.removeMark('splveying',2);
					player.draw();
					'step 1'
					player.chooseUseTarget('guohe');
				},
				marktext:'椎',
				intro:{
					name:'椎(掠影/莺舞)',
					name2:'椎',
					content:'mark',
				},
				group:'splveying_add',
				subSkill:{
					add:{
						trigger:{player:'useCardToPlayered'},
						forced:true,
						usable:2,
						filter:function(event,player){
							return event.card.name=='sha'&&player.isPhaseUsing();
						},
						content:function(){
							player.addMark('splveying',1);
						},
					},
				},
			},
			spyingwu:{
				group:'spyingwu_add',
				audio:2,
				trigger:{player:'useCardAfter'},
				forced:true,
				locked:false,
				filter:function(event,player){
					return player.hasSkill('splveying')&&(get.type(event.card)=='trick'&&!get.tag(event.card,'damage'))&&player.countMark('splveying')>1;
				},
				content:function(){
					player.removeMark('splveying',2);
					player.draw();
					player.chooseUseTarget('sha',false);
				},
				ai:{combo:'splveying'},
				subSkill:{
					add:{
						trigger:{player:'useCardToPlayered'},
						forced:true,
						locked:false,
						usable:2,
						filter:function(event,player){
							return player.hasSkill('splveying')&&(get.type(event.card)=='trick'&&!get.tag(event.card,'damage'))&&player.isPhaseUsing();
						},
						content:function(){
							player.addMark('splveying',1);
						},
					},
				},
			},
			//手杀杨婉
			spmingxuan:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				forced:true,
				filter:function(event,player){
					var list=player.getStorage('spmingxuan');
					return player.countCards('h')>0&&game.hasPlayer(function(current){
						return current!=player&&!list.contains(current);
					});
				},
				content:function(){
					'step 0'
					var suits=[],hs=player.getCards('h');
					for(var i of hs) suits.add(get.suit(i,player));
					var list=player.getStorage('spmingxuan'),num=Math.min(suits.length,game.countPlayer(function(current){
						return current!=player&&!list.contains(current);
					}));
					player.chooseCard('h',true,[1,num],'瞑昡：请选择至多'+get.cnNumber(num)+'张花色各不相同的手牌',function(card,player){
						if(!ui.selected.cards.length) return true;
						var suit=get.suit(card);
						for(var i of ui.selected.cards){
							if(get.suit(i,player)==suit) return false;
						}
						return true;
					}).set('complexCard',true).set('ai',(card)=>6-get.value(card));
					'step 1'
					if(result.bool){
						var list=player.getStorage('spmingxuan'),cards=result.cards.randomSort();
						var targets=game.filterPlayer((current)=>(current!=player&&!list.contains(current))).randomGets(cards.length).sortBySeat();
						player.line(targets,'green');
						var map=[];
						for(var i=0;i<targets.length;i++){
							map.push([targets[i],cards[i]]);
						}
						game.loseAsync({
							gain_list:map,
							player:player,
							cards:cards,
							giver:player,
							animate:'giveAuto',
						}).setContent('gaincardMultiple');
						event.targets=targets;
						event.num=0;
					}
					else event.finish();
					'step 2'
					game.delayx();
					'step 3'
					if(num<targets.length){
						var target=targets[num];
						event.num++;
						if(target.isIn()){
							event.target=target;
							target.chooseToUse(function(card,player,event){
								if(get.name(card)!='sha') return false;
									return lib.filter.filterCard.apply(this,arguments);
								},'对'+get.translation(player)+'使用一张杀，否则交给其一张牌，且其摸一张牌').set('targetRequired',true).set('complexSelect',true).set('filterTarget',function(card,player,target){
								if(target!=_status.event.sourcex&&!ui.selected.targets.contains(_status.event.sourcex)) return false;
								return lib.filter.targetEnabled.apply(this,arguments);
							}).set('sourcex',player).set('addCount',false);
						}
						else{
							if(event.num<targets.length) event.redo();
							else event.finish();
						}
					}
					'step 4'
					if(result.bool){
						player.markAuto('spmingxuan',[target]);
						if(event.num<targets.length) event.goto(3);
						else event.finish();
					}
					else{
						var he=target.getCards('he');
						if(he.length){
							if(he.length==1) event._result={bool:true,cards:he};
							else target.chooseCard('he',true,'交给'+get.translation(player)+'一张牌')
						}
						else{
							if(event.num<targets.length) event.goto(3);
							else event.finish();
						}
					}
					'step 5'
					if(result.bool){
						target.give(result.cards,player);
						player.draw();
					}
					if(event.num<targets.length) event.goto(3);
				},
				intro:{content:'已被$使用过杀'},
			},
			spxianchou:{
				audio:2,
				trigger:{player:'damageEnd'},
				direct:true,
				filter:function(event,player){
					return event.source&&event.source.isIn()&&game.hasPlayer(function(current){
						return current!=player&&current!=event.source;
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('spxianchou'),function(card,player,target){
						return target!=player&&target!=_status.event.getTrigger().source;
					}).set('ai',function(target){
						return get.attitude(target,_status.event.player)*Math.sqrt(target.countCards('he'));
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('spxianchou',target);
						player.line2([target,trigger.source]);
						target.chooseToDiscard('he','是否弃置一张牌，视为对'+get.translation(trigger.source)+'使用一张【杀】？').set('ai',function(card){
							if(((target.canUse('sha',trigger.source,false)?get.effect(trigger.source,{name:'sha',isCard:true},target,target):0)+get.recoverEffect(player,target,target))>0) return 8-get.value(card);
							return 0;
						});//.set('goon',((target.canUse('sha',trigger.source,false)?get.effect(trigger.source,{name:'sha',isCard:true},target,target):0)+get.recoverEffect(player,target,target))>0);
					}
					else event.finish();
					'step 2'
					if(result.bool){
						if(target.canUse('sha',trigger.source,false)) target.useCard({name:'sha',isCard:true},trigger.source,false);
						else event.finish();
					}
					else event.finish();
					'step 3'
					if(target.hasHistory('sourceDamage',function(evt){
						var card=evt.card;
						if(!card||card.name!='sha') return false;
						var evtx=evt.getParent('useCard');
						return evtx.card==card&&evtx.getParent()==event;
					})){
						target.draw();
						player.recover();
					}
				},
			},
		},
		dynamicTranslate:{
			sbkeji:function(player){
				return '①出牌阶段' + (player.storage.sbkeji ? '' :'各') + '限一次。你可以选择一项：1.弃置一张手牌，然后获得1点护甲；2.失去1点体力，然后获得2点护甲。②你的手牌上限+X（X为你的护甲数）。③若你不为正在结算濒死流程的角色，你不能使用【桃】。';
			},
			sbwusheng:function(player){
				var num=get.mode()=='identity'?'两':'一';
				return '你可以将一张手牌当作任意【杀】使用或打出。出牌阶段开始时，你可以选择一名非主公的其他角色，本阶段对其使用【杀】无距离和次数限制，使用【杀】指定其为目标后摸'+num+'张牌，对其使用三张【杀】后不能对其使用【杀】。';
			},
			sblongdan:function(player){
				if(player.hasSkill('sblongdan_mark',null,null,false)) return '蓄力技（1/3）。①你可以消耗1点蓄力值，将一张基本牌当做任意基本牌使用或打出，然后若你以此法使用牌，你摸一张牌。②一名角色的回合结束时，你获得1点蓄力值。';
				return '蓄力技（1/3）。①你可以消耗1点蓄力值，将【杀】当做【闪】或将【闪】当做【杀】使用或打出，然后若你以此法使用牌，你摸一张牌。②一名角色的回合结束时，你获得1点蓄力值。';
			},
			sblianhuan:window.getStrength(function(player){
				var str='①出牌阶段，你可以重铸一张♣手牌。②出牌阶段限一次。你可以将一张♣手牌当【铁索连环】使用。';
				if(!player.storage.sblianhuan) str+='③当你使用【铁索连环】时，你可以失去1点体力，然后当此牌指定第一个目标后，你随机弃置每名不处于连环状态的目标角色一张手牌。';
				else str+='③当你使用【铁索连环】时，你可以额外指定任意名角色为目标。④当你使用【铁索连环】指定第一个目标后，你随机弃置每名不处于连环状态的目标角色一张手牌。';
				return str;
			},function(player){
				var str='①出牌阶段，你可以重铸一张♣️牌或将一张♣️牌当【铁索连环】使用。';
				if(!player.storage.sblianhuan) str+='②当你使用【铁索连环】时，你可以失去1点体力，然后当此牌指定第一个目标后，你随机弃置每名不处于连环状态的目标角色一张手牌。';
				else str+='②当你使用【铁索连环】时，你可以额外指定任意名角色为目标。③当你使用【铁索连环】指定第一个目标后，你随机弃置每名不处于连环状态的目标角色一张手牌。';
				return str;
			},'sb_pangtong'),
			sbjiang:function(player){
				var str='①当你使用【决斗】或红色【杀】指定目标后，或当你成为【决斗】或红色【杀】的目标后，你摸一张牌。②当你使用【决斗】时，你可以额外指定一名目标，然后你失去1点体力。③出牌阶段限';
				if(player.countMark('sbjiang')) str+='X次。你可以将所有手牌当【决斗】使用（X为场上其他吴势力角色数+1）。';
				else str+='一次。你可以将所有手牌当【决斗】使用。';
				return str;
			},
			sbwansha:function(player) {
        		const storage = player.storage.sbwansha;
        		var str = "①你的回合内，不处于濒死状态的其他角色不能使用【桃】。②一名角色进入濒死状态时，你可以观看其手牌并选择其";
        		str += storage ? "区域内" : "中";
        		str += "零至两张牌，然后其选择一项：1.你将这些牌分配给任意名不为其的角色；2.其弃置除这些牌以外的牌。";
        		return str;
        	},
        	sbweimu:function(player) {
        		const storage = player.storage.sbweimu;
        		var str = "锁定技。";
        		str += storage ? "①" : "";
        		str += "当你成为黑色锦囊牌的目标时，取消之。";
        		if (storage) str += "②每轮开始时，若你上一轮成为其他角色使用牌的目标的次数不大于2，你从弃牌堆中随机获得一张黑色锦囊牌或防具牌。";
        		return str;
        	},
		},
		translate:{
			sp_yangwan:'谋杨婉',
			spmingxuan:'瞑昡',
			spmingxuan_info:'锁定技。出牌阶段开始时，你须选择至多X张花色各不相同的手牌（X为未选择过选项一的角色），将这些牌随机交给这些角色中的等量角色。然后这些角色依次选择一项：⒈对你使用一张【杀】。⒉交给你一张牌，然后你摸一张牌。',
			spxianchou:'陷仇',
			spxianchou_info:'当你受到有来源的伤害后，你可选择一名不为伤害来源的其他角色。该角色可以弃置一张牌，然后视为对伤害来源使用一张【杀】（无距离限制）。若其因此【杀】造成了伤害，则其摸一张牌，你回复1点体力。',
			liucheng:'谋刘赪',
			splveying:'掠影',
			splveying_info:'锁定技。①每回合限两次，当你使用【杀】指定目标后，你获得一个“椎”。②当你使用的【杀】结算结束后，若你的“椎”数大于1，则你弃置两个“椎”并摸一张牌，然后可以视为使用一张【过河拆桥】。',
			spyingwu:'莺舞',
			spyingwu_info:'若你拥有〖掠影〗，则：①每回合限两次，当你使用非伤害类普通锦囊牌指定目标后，你获得一个“椎”。②当你使用的非伤害类普通锦囊牌结算结束后，若你的“椎”数大于1，则你弃置两个“椎”并摸一张牌，然后可以视为使用一张【杀】。',
			sb_huangzhong:'谋黄忠',
			sbliegong:'烈弓',
			sbliegong_info:'①若你的装备区内没有武器牌，则你手牌区内所有【杀】的属性视为无属性。②当你使用牌时，或成为其他角色使用牌的目标后，你记录此牌的花色。③当你使用【杀】指定唯一目标后，若你〖烈弓②〗的记录不为空，则你可亮出牌堆顶的X张牌（X为你〖烈弓②〗记录过的花色数-1），令此【杀】的伤害值基数+Y（Y为亮出牌中被〖烈弓②〗记录过花色的牌的数量），且目标角色不能使用〖烈弓②〗记录过花色的牌响应此【杀】。此【杀】使用结算结束后，你清除〖烈弓②〗的记录。',
			sb_huaxiong:'谋华雄',
			sbyangwei:'扬威',
			sbyangwei_info:'出牌阶段，你可以摸两张牌，令此技能于你的下下个结束阶段前失效，且你获得如下效果直到回合结束：使用【杀】无距离限制，次数上限+1且无视防具。',
			sb_yujin:'谋于禁',
			sbxiayuan:'狭援',
			sbxiayuan_info:'每轮限一次。其他角色受到伤害后，若其因此伤害触发过护甲效果且其没有护甲，则你可弃置两张手牌，令其获得X点护甲（X为其因此伤害触发护甲效果而失去的护甲数量）。',
			sbjieyue:'节钺',
			sbjieyue_info:'结束阶段，你可以令一名其他角色获得1点护甲。然后其可以交给你一张牌。',
			sb_lvmeng:'谋吕蒙',
			sbkeji:'克己',
			sbkeji_info:'①出牌阶段各限一次。你可以选择一项：1.弃置一张手牌，然后获得1点护甲；2.失去1点体力，然后获得2点护甲。②你的手牌上限+X（X为你的护甲数）。③若你不为正在结算濒死流程的角色，你不能使用【桃】。',
			sbdujiang:'渡江',			
			sbdujiang_info:'觉醒技。准备阶段，若你的护甲数不少于3，你获得〖夺荆〗，修改〖克己①〗为“出牌阶段限一次”。',
			sbduojing:'夺荆',
			sbduojing_info:'当你使用【杀】指定目标时，你可以失去1点护甲。然后令此【杀】无视防具，你获得目标角色一张牌，本回合使用【杀】的次数上限+1。',
			sb_sunshangxiang:'谋孙尚香',
			sbjieyin:'结姻',
			sbjieyin_info:'使命技。①游戏开始时，你令一名其他角色获得1枚“助”。②出牌阶段开始时，有“助”的角色选择一项：1.交给你X张手牌（X=min(2,其手牌数)且至少为1），然后获得1点护甲；2.令你将“助”移动给另一名其他角色，或移去其“助”（若其此前获得过“助”，则只能移去）。③失败：当一名角色死亡后，若其于死亡时有“助”，或当你因〖结姻②〗移去“助”后，你将势力改为吴，回复1点体力，获得所有“妆”并减1点体力上限。',
			sbliangzhu:'良助',
			sbliangzhu_info:'蜀势力技。出牌阶段限一次，你可以将一名其他角色装备区里的一张牌置于武将牌上，称为“妆”，然后有“助”的角色须选择回复1点体力或摸两张牌。',
			sbxiaoji:'枭姬',
			sbxiaoji_info:'吴势力技。当你失去装备区里的一张牌后，你摸两张牌，然后可以弃置场上的一张牌。',
			sb_sunquan:'谋孙权',
			sbzhiheng:'制衡',
			sbzhiheng_info:'出牌阶段限一次。你可以弃置任意张牌并摸等量的牌，若你以此法弃置的牌包括你所有手牌，则你多摸X张牌（X为你的“业”数+1），并弃1枚“业”。',
			sbtongye:'统业',
			sbtongye_info:'锁定技。结束阶段，你猜测场上装备牌数与你下一个准备阶段的场上装备牌数是否相等，并获得以下效果：你下一个准备阶段，若你猜对且“业”数小于2，你获得1枚“业”；若你猜错，你弃1枚“业”。',
			sbjiuyuan:'救援',
			sbjiuyuan_info:'主公技，锁定技。①其他吴势力角色使用【桃】时，你摸一张牌。②其他吴势力角色对你使用的【桃】的回复量+1。',
			sb_huanggai:'谋黄盖',
			sbkurou:'苦肉',
			sbkurou_info:'①出牌阶段开始时，你可以交给其他角色一张牌，若此牌于对方手牌区内为【桃】或【酒】，你失去2点体力，否则你失去1点体力。②当你失去1点体力后，你获得2点护甲。',
			sbzhaxiang:'诈降',
			sbzhaxiang_info:'锁定技。①摸牌阶段，你多摸X张牌。②你每回合使用的前X张牌无距离与次数限制且不能被响应（X为你已损失的体力值）。',
			sb_zhouyu:'谋周瑜',
			sbyingzi:'英姿',
			sbyingzi_info:'锁定技。摸牌阶段，你多摸X张牌，且令你本回合手牌上限+X（X为以下条件中你满足的项数：手牌数不小于2、体力值不小于2、装备区里的牌数不小于1）。',
			sbfanjian:'反间',
			sbfanjian_info:'出牌阶段，你可以声明一个花色并选择一张牌和一名其他角色（每种花色的牌每回合限一次）。其须选择一项：1.猜测此牌花色与你所声明花色是否相同；2.翻面。然后其正面向上获得此牌。若其选择猜测且猜测错误，其失去1点体力，否则其令你〖反间〗于本回合失效。',
			sb_caoren:'谋曹仁',
			sbjushou:'据守',
			sbjushou_info:'①出牌阶段限一次。若你的武将牌正面朝上，你可以弃置至多两张牌，然后你翻面并获得等量护甲。②当你受到伤害后，若你的武将牌背面朝上，你选择一项：1.翻面；2.获得1点护甲。③当你翻面后，若你的武将牌正面朝上，你摸X张牌（X为你的护甲数）。',
			sbjiewei:'解围',
			sbjiewei_info:'出牌阶段限一次。你可以失去1点护甲并选择一名其他角色。你观看其手牌并获得其中一张。',
			sb_xiahoushi:'谋夏侯氏',
			sbqiaoshi:'樵拾',
			sbqiaoshi_info:'每回合限一次。当你受到其他角色造成的伤害后，其可以令你回复等同于此次伤害值的体力，然后其摸两张牌。',
			sbyanyu:'燕语',
			sbyanyu_info:'①出牌阶段限两次。你可以弃置一张【杀】，然后摸一张牌。②出牌阶段结束时，你可以令一名其他角色摸3X张牌（X为你于此阶段发动〖燕语①〗的次数）。',
			sb_zhangjiao:'谋张角',
			sbleiji:'雷击',
			sbleiji_info:'出牌阶段，你可以选择一名其他角色并弃4枚“道兵”，对其造成1点雷电伤害。',
			sbguidao:'鬼道',
			sbguidao_info:'①游戏开始时，你获得4枚“道兵”标记。②“道兵”上限为8。③一名角色受到属性伤害后，你获得2枚“道兵”。④当你受到伤害时，你可以弃2枚“道兵”并防止此伤害。然后若当前回合角色不为你，〖鬼道③〗于你下回合开始前无效。',
			sbhuangtian:'黄天',
			sbhuangtian_info:'主公技，锁定技。①回合开始时，若本回合为你的第一个回合且游戏轮数为1，且游戏内没有【太平要术】，你装备【太平要术】。②其他群势力角色造成伤害后，若你拥有〖鬼道〗，你获得1枚“道兵”。',
			sb_caocao:'谋曹操',
			sbjianxiong:'奸雄',
			sbjianxiong_info:'①游戏开始时，你可获得至多2枚“治世”标记。②当你受到伤害后，你可获得伤害牌，摸1-X张牌（X为“治世”数），然后你可弃1枚“治世”。',
			sbqingzheng:'清正',
			sbqingzheng_info:'出牌阶段开始时，你可以弃置3-X种花色的所有手牌（X为“治世”数），并观看一名有手牌的其他角色的手牌，你弃置其中一种花色的所有牌。若其被弃置的牌数小于你以此法弃置的牌数，你对其造成1点伤害。然后若X小于2且你拥有技能〖奸雄〗，你可以获得1枚“治世”。',
			sbhujia:'护驾',
			sbhujia_info:'主公技，每轮限一次。当你受到伤害时，你可以将此伤害转移给一名其他魏势力角色。',
			sb_zhenji:'谋甄宓',
			sbluoshen:'洛神',
			sbluoshen_info:'准备阶段，你可以选择一名角色。从其开始按逆时针方向的X名其他角色依次执行（X为角色数的一半，向上取整）：展示一张手牌，若此牌为黑色，你获得之且此牌不计入本回合手牌上限；若此牌为红色，其弃置之。',
			sb_ganning:'谋甘宁',
			sbqixi:'奇袭',
			sbqixi_info:'出牌阶段限一次。若你有手牌，你可以令一名其他角色猜测你手牌中最多的花色。若其猜对，你展示所有手牌；若其猜错，你可令其从其未选择过的花色中再次猜测，重复此流程。然后你弃置其区域内的X张牌（X为其于本次〖奇袭〗中猜错的次数）。',
			sbfenwei:'奋威',
			sbfenwei_info:window.getStrength('限定技。①出牌阶段，你可以将至多三张牌分别置于等量名角色的武将牌上，称为“威”，然后你摸等量牌。②当一名角色成为锦囊牌的目标时，若其有“威”，你须选择：1.令其获得其“威”；2.令其移去“威”，并取消此目标。',
			'蓄力技（2/2）。①出牌阶段限两次，你可以消耗1点蓄力值，然后将一张牌置于一名角色的武将牌上，称为“威”，然后你摸一张牌。②当一名角色成为锦囊牌的目标时，若其有“威”，你获得1点蓄力值并须选择：1.令其获得其随机一张“威”；2.令其移去随机一张“威”，并取消此目标。','sb_ganning'),
			sb_machao:'谋马超',
			sbtieji:'铁骑',
			sbtieji_info:'当你使用【杀】指定其他角色为目标后，你可以令目标角色不能响应此【杀】，且其所有非锁定技失效直到回合结束。然后你与其进行谋弈。若你赢，且你选择的选项为：“直取敌营”，则你获得其一张牌；“扰阵疲敌”，你摸两张牌。',
			sb_xuhuang:'谋徐晃',
			sbduanliang:'断粮',
			sbduanliang_info:'出牌阶段限一次。你可以与一名其他角色进行谋弈。若你赢，且你选择的选项为：“围城断粮”，若其判定区没有【兵粮寸断】，你将牌堆顶牌当【兵粮寸断】对其使用，否则你获得其一张牌；“擂鼓进军”，你视为对其使用一张【决斗】。',
			sbshipo:'势迫',
			sbshipo_info:'结束阶段，你可以令一名体力少于你的角色或所有判定区有【兵粮寸断】的其他角色选择一项：1.交给你一张手牌；2.受到1点伤害。所有目标角色选择完成后，你可以将任意张你以此法得到的牌交给一名其他角色。',
			sb_zhangfei:'谋张飞',
			sbpaoxiao:'咆哮',
			sbpaoxiao_info:'锁定技。①你使用【杀】无次数限制。②若你的装备区内有武器牌，则你使用【杀】无距离限制。③当你于出牌阶段内使用第二张及以后【杀】时，你获得如下效果：{此【杀】不可被响应且伤害值基数+1；此【杀】指定目标后，目标角色的非锁定技于本回合内失效；此【杀】造成伤害后，若目标角色存活，则你失去1点体力并随机弃置一张手牌。}',
			sbxieji:'协击',
			sbxieji_info:'准备阶段开始时，你可以和一名其他角色进行协力。其的下个结束阶段开始时，若你与其协力成功，则你可以选择至多三名其他角色。你对这些角色视为使用一张【杀】，且当此【杀】因执行牌面效果造成伤害后，你摸X张牌（X为伤害值）。',
			sb_zhaoyun:'谋赵云',
			sblongdan:'龙胆',
			sblongdan_info:'蓄力技（1/3）。①你可以消耗1点蓄力值，将【杀】当做【闪】或将【闪】当做【杀】使用或打出，然后若你以此法使用牌，你摸一张牌。②一名角色的回合结束时，你获得1点蓄力值。',
			sbjizhu:'积著',
			sbjizhu_info:'准备阶段开始时，你可以和一名其他角色进行协力。其的下个结束阶段开始时，若你与其协力成功，则你修改〖龙胆〗直到你的下个结束阶段开始。',
			sblongdan_shabi:'龙胆',
			sblongdan_shabi_info:'蓄力技（1/3）。①你可以消耗1点蓄力值，将一张基本牌当做任意基本牌使用或打出，然后摸一张牌。②一名角色的回合结束时，你获得1点蓄力值。',
			sb_liubei:'谋刘备',
			sbrende:'仁德',
			sbrende_info:'①出牌阶段每名角色限一次。你可以将任意张牌交给一名其他角色，然后你获得等量“仁望”标记（至多为8）。②每回合限一次。你可以移去2枚“仁望”，视为使用或打出一张基本牌。③出牌阶段开始时，你获得2枚“仁望”。',
			sbzhangwu:'章武',
			sbzhangwu_info:'限定技。出牌阶段，你可以令所有于本局游戏成为过〖仁德①〗目标的其他角色依次交给你X张牌，然后你回复3点体力并失去〖仁德〗（X为游戏轮数-1，且至多为3）。',
			sbjijiang:'激将',
			sbjijiang_info:'主公技。出牌阶段结束时，你可以选择一名体力值不小于你的其他蜀势力角色A和一名在A攻击范围内的角色B。A选择一项：1.视为对B使用一张【杀】；2.下一个出牌阶段开始前，跳过此阶段。',
			sb_jiangwei:'谋姜维',
			sbtiaoxin:'挑衅',
			sbtiaoxin_info:window.getStrength('蓄力技（4/4）。①出牌阶段限一次。你可以选择至多X名角色（X为你的蓄力值），令这些角色选择一项：1.对你使用一张【杀】（无距离限制）；2.交给你一张牌。然后你消耗等同于你选择的目标数的蓄力值。②当你于弃牌阶段弃置牌后，你获得等量蓄力值。',
			'蓄力技（4/4）。①出牌阶段限一次。你可以选择至多X名角色（X为你的蓄力值），令这些角色选择一项：1.对你使用一张【杀】（无距离限制），若此【杀】未造成伤害，你可以获得其一张牌；2.交给你一张牌。然后你消耗等同于你选择的目标数的蓄力值。②结束阶段，你若你的体力值为满，你获得2点蓄力值，否则你获得1点蓄力值。','sb_jiangwei'),
			sbzhiji:'志继',
			sbzhiji_info:window.getStrength('觉醒技。准备阶段，若你因〖挑衅①〗消耗过至少4点蓄力值，你减1点体力上限，令至少一名角色获得“北伐”标记并获得如下效果直到你的下回合开始：其使用牌只能指定你或其为目标。',
			'觉醒技。准备阶段，若你因〖挑衅①〗消耗过至少4点蓄力值，你减1点体力上限，获得技能〖八阵〗，然后令至少一名角色获得“北伐”标记并获得如下效果直到你进入濒死状态：其使用牌只能指定你或其为目标。','sb_jiangwei'),
			sb_fazheng:'谋法正',
			sbxuanhuo:'眩惑',
			sbxuanhuo_info:'①出牌阶段限一次。你可以将一张牌交给一名没有“眩”标记的其他角色，然后令其获得“眩”标记。②当有“眩”的其他角色于摸牌阶段外得到牌后，若你以此法于其本次获得“眩”的期间内得到其的牌数小于5，你随机获得其一张手牌。',
			sbenyuan:'恩怨',
			sbenyuan_info:'锁定技。准备阶段，若场上存在有“眩”的角色，你移去该角色的“眩”，且你于其本次获得“眩”的期间内得到其的牌数：不小于3，你交给其三张牌；小于3，其失去1点体力，你回复1点体力。',
			sb_chengong:'谋陈宫',
			sbmingce:'明策',
			sbmingce_info:window.getStrength('①出牌阶段限一次。你可以将一张牌交给一名其他角色，其选择一项：1.失去1点体力，令你摸两张牌并获得1枚“策”；2.摸一张牌。②出牌阶段开始时，你可以移去所有“策”并对一名其他角色造成等量伤害。',
			'①出牌阶段限两次。你可以将一张牌交给一名其他角色，其选择一项：1.失去1点体力，令你摸两张牌并获得1枚“策”；2.摸一张牌。②出牌阶段开始时，你可以移去所有“策”并对一名其他角色造成等量伤害。','sb_chengong'),
			sbzhichi:'智迟',
			sbzhichi_info:'锁定技。当你受到伤害后，防止你本回合受到的伤害。',
			sb_yuanshao:'谋袁绍',
			sbluanji:'乱击',
			sbluanji_info:'①出牌阶段限一次。你可以将两张手牌当【万箭齐发】使用。②每回合限三次，当其他角色因响应你使用的【万箭齐发】而打出【闪】时，你摸一张牌。',
			sbxueyi:'血裔',
			sbxueyi_info:'主公技，锁定技。①你的手牌上限+2X（X为场上其他群势力角色数）。②每回合限两次，当你使用牌指定其他群势力角色为目标后，你摸一张牌。',
			sb_diaochan:'谋貂蝉',
			sblijian:'离间',
			sblijian_info:'出牌阶段限一次。你可以选择至少两名其他角色并弃置X张牌（X为你选择的角色数-1）。然后每名你选择的角色依次视为对这些角色中与其逆时针座次最近的另一名角色使用一张【决斗】。',
			sbbiyue:'闭月',
			sbbiyue_info:'锁定技。结束阶段，你摸Y张牌（Y为本回合包括已死亡角色在内受到过伤害的角色数+1且至多为4）。',
			sb_pangtong:'谋庞统',
			sblianhuan:'连环',
			sblianhuan_info:window.getStrength('①出牌阶段，你可以重铸一张♣手牌。②出牌阶段限一次。你可以将一张♣手牌当【铁索连环】使用。③当你使用【铁索连环】时，你可以失去1点体力，然后当此牌指定第一个目标后，你随机弃置每名不处于连环状态的目标角色一张手牌。',
			'①出牌阶段，你可以重铸一张♣️牌或将一张♣️牌当【铁索连环】使用。②当你使用【铁索连环】时，你可以失去1点体力，然后当此牌指定第一个目标后，你随机弃置每名不处于连环状态的目标角色一张手牌。','sb_pangtong'),
			sblianhuan_lv2:'连环·改',
			sblianhuan_lv2_info:window.getStrength('①出牌阶段，你可以重铸一张♣手牌。②出牌阶段限一次。你可以将一张♣手牌当【铁索连环】使用。③当你使用【铁索连环】时，你可以额外指定任意名角色为目标。④当你使用【铁索连环】指定第一个目标后，你随机弃置每名不处于连环状态的目标角色一张手牌。',
			'①出牌阶段，你可以重铸一张♣️牌或将一张♣️牌当【铁索连环】使用。②当你使用【铁索连环】时，你可以额外指定任意名角色为目标。③当你使用【铁索连环】指定第一个目标后，你随机弃置每名不处于连环状态的目标角色一张手牌。','sb_pangtong'),
			sbniepan:'涅槃',
			sbniepan_info:window.getStrength('限定技。当你处于濒死状态时，你可以弃置区域里的所有牌，摸两张牌，将体力回复至2点，复原武将牌，然后修改〖连环〗。',
			'限定技。当你处于濒死状态时，你可以弃置区域里的所有牌，摸三张牌，将体力回复至3点并获得3点护甲，复原武将牌，然后修改〖连环〗，此后你的每个回合结束阶段受到一点无来源的火焰伤害。','sb_pangtong'),
			sb_sunce:'谋孙策',
			sbjiang:'激昂',
			sbjiang_info:'①当你使用【决斗】或红色【杀】指定目标后，或当你成为【决斗】或红色【杀】的目标后，你摸一张牌。②当你使用【决斗】时，你可以额外指定一名目标，然后你失去1点体力。③出牌阶段限一次。你可以将所有手牌当【决斗】使用。',
			sbhunzi:'魂姿',
			sbhunzi_info:'觉醒技。当你脱离濒死状态后，你减1点体力上限，获得1点护甲，摸三张牌。然后你获得〖英姿〗和〖英魂〗。',
			sbzhiba:'制霸',
			sbzhiba_info:'主公技，限定技。当你进入濒死状态时，你可以回复X-1点体力并修改〖激昂③〗为“出牌阶段限X次”（X为场上其他吴势力角色数+1）。然后其他吴势力角色依次受到1点无来源伤害，且当有角色因此死亡后，你摸三张牌。',
			sb_daqiao:'谋大乔',
			sbguose:'国色',
			sbguose_info:'出牌阶段限四次。你可以选择一项：1.将一张♦牌当【乐不思蜀】使用；2.弃置场上一张【乐不思蜀】。然后你摸一张牌。',
			sbliuli:'流离',
			sbliuli_info:'当你成为【杀】的目标时，你可以弃置一张牌并选择你攻击范围内的一名不为此【杀】使用者的角色，将此【杀】转移给该角色。若你以此法弃置了♥牌，则你可以令一名不为此【杀】使用者的其他角色获得“流离”标记，且移去场上所有其他的“流离”（每回合限一次）。有“流离”的角色回合开始时，其移去其“流离”并执行一个额外的出牌阶段。',
			sb_liubiao:'谋刘表',
			sbzishou:'自守',
			sbzishou_info:'锁定技。其他角色的结束阶段，若其与你于本局游戏内均未对对方造成过伤害，其须交给你一张牌。',
			sbzongshi:'宗室',
			sbzongshi_info:'锁定技。每名角色限一次。当你受到伤害后，你令伤害来源弃置所有手牌。',
			sb_zhurong:'谋祝融',
			sblieren:'烈刃',
			sblieren_info:'当你使用【杀】指定唯一目标后，你可以与其拼点。若你赢，此【杀】结算结束后，你可以对另一名其他角色造成1点伤害。',
			sbjuxiang:'巨象',
			sbjuxiang_info:'锁定技。①【南蛮入侵】对你无效。②当其他角色使用【南蛮入侵】结算结束后，你获得此牌对应的所有实体牌。③结束阶段，若你未于本回合使用过【南蛮入侵】，你可以将一张游戏外的随机【南蛮入侵】（共2张）交给一名角色。',
			sb_menghuo:'谋孟获',
			sbhuoshou:'祸首',
			sbhuoshou_info:'锁定技。①【南蛮入侵】对你无效。②当其他角色使用【南蛮入侵】指定第一个目标后，你代替其成为此牌的伤害来源。③出牌阶段开始时，你随机获得弃牌堆中的一张【南蛮入侵】。④出牌阶段，若你于此阶段使用过【南蛮入侵】，你不能使用【南蛮入侵】。',
			sbzaiqi:'再起',
			sbzaiqi_info:window.getStrength('蓄力技（1/7）。①弃牌阶段结束时，你可以消耗任意点蓄力值并选择等量名角色，然后令这些角色选择一项：1.令你摸一张牌；2.弃置一张牌，然后你回复1点体力。②每回合限一次。当你造成伤害后，你获得1点蓄力值。',
			'蓄力技（3/7）。①弃牌阶段结束时，你可以消耗任意点蓄力值并选择等量名角色，然后令这些角色选择一项：1.令你摸一张牌；2.弃置一张牌，然后你回复1点体力。②当你使用牌造成伤害后，你获得X点蓄力值（X为这张牌造成最高的伤害）。','sb_menghuo'),
			sb_zhanghe:'谋张郃',
			sbqiaobian:'巧变',
			sbqiaobian_info:'每回合限一次。①你可以失去1点体力并跳过判定阶段，将判定区的所有牌移动给一名其他角色（无法置入其判定区的牌改为弃置之）。②你可以跳过摸牌阶段，于下个准备阶段摸两张牌并回复1点体力。③你可以将手牌数弃置至六张（若手牌数少于六张则跳过之）并跳过出牌阶段和弃牌阶段，然后移动场上的一张牌。',
            sb_xiaoqiao:'谋小乔',
			sbtianxiang:'天香',
			sbtianxiang_info:'准备阶段，你清除场上所有“天香”标记，并摸等量的牌。出牌阶段限三次，你可将一张红色牌交给一名没有“天香”标记的其他角色，开令其获得对应花色的“天香”标记，当你受到伤常时，你可以选择一名拥有“天香”标记的角色，移除其“天香”标记并根据移除的“天香”花色发动：红桃，你防止此伤害，然后令其受到防止伤害的来源角色造成的1点伤害；方块，其交给你两张牌。',
			sbhongyan:'红颜',
			sbhongyan_info:'锁定技、你的手牌和判定牌中的黑桃牌只能当做红桃牌。当一张判定牌生效前，如果此判定牌为红桃，你将判定结果改为由你指定的一种花色',
			sb_sp_zhugeliang:'谋卧龙',
			sb_zhugeliang:'谋诸葛亮',
			sbhuoji:'火计',
			sbhuoji_info:'使命技。①使命：出牌阶段限一次。你可以对一名其他角色造成1点火焰伤害，然后你对所有与其势力相同的不为其的其他角色各造成1点火焰伤害。②成功：准备阶段，若你本局游戏已造成的火焰伤害不小于本局游戏总角色数，则你失去〖火计〗和〖看破〗，然后获得〖观星〗和〖空城〗。③失败：使命成功前进入濒死状态。',
			sbkanpo:'看破',
			sbkanpo_info:'①一轮游戏开始时，你清除〖看破①〗记录的牌名，然后你可以依次记录共计三个未于本次清除过的非装备牌牌名（对其他角色不可见）。②当其他角色使用你〖看破①〗记录过的牌名的牌时，你可以移去一个〖看破①〗中的此牌名的记录，令此牌无效。',
			sbguanxing:'观星',
			sbguanxing_info:'①准备阶段，你将所有“星”置入弃牌堆，将牌堆顶的X张牌置于你的武将牌上，称为“星”。然后你可以将任意张“星”置于牌堆顶（X为你此次移去的“星”数+1且至多为7，若你此前未发动过〖观星①〗则X为7）。②结束阶段，若你未于本回合的准备阶段将“星”置于过牌堆顶，你可以将任意张“星”置于牌堆顶。③你可以如手牌般使用或打出“星”。',
			sbkongcheng:'空城',
			sbkongcheng_info:'锁定技。当你受到伤害时，若你有〖观星〗，且若你：有“星”，你判定，若结果点数不大于你的“星”数，此伤害-1；没有“星”，此伤害+1。',
			sb_luzhi:'谋卢植',
			sbzhenliang:'贞良',
			sbzhenliang_info:'转换技，阳：出牌阶段限一次，你可以选择一名攻击范围内的其他角色并弃置X张与“任”颜色相同的牌对其造成1点伤害（X为你与其体力值之差且至少为1)；阴：你的回合外，当你使用或打出的牌结算结束后，若此牌与“任”类别相同，则你可令一名角色摸一张牌。',sbkongcheng_info:'锁定技。当你受到伤害时，若你拥有技能〖观星〗，且若你：有“星”，你判定，若结果点数不大于你的“星”数，此伤害-1；没有“星”，此伤害+1。',
			sb_huangyueying:'谋黄月英',
			sbqicai:'奇才',
			sbqicai_backup:'奇才',
			sbqicai_info:'①出牌阶段限一次。你可以将手牌中或弃牌堆中的一张装备牌置于一名其他角色的防具栏（斗地主模式改为防具牌），然后其获得如下效果：当其得到普通锦囊牌后，其将此牌交给你（限三张）。②你使用锦囊牌无距离限制。',
			sbjizhi:'集智',
			sbjizhi_info:'锁定技，当你使用一张普通锦囊牌时，你摸一张牌，且此牌本回合不计入你的手牌上限。',
			sb_guanyu:'谋关羽',
			sbwusheng:'武圣',
			sbwusheng_wusheng_backup:'武圣',
			sbwusheng_info:'你可以将一张手牌当作任意【杀】使用或打出。出牌阶段开始时，你可以选择一名非主公的其他角色，本阶段对其使用【杀】无距离和次数限制，使用【杀】指定其为目标后摸一张牌（若为身份模式则改为摸两张），对其使用三张【杀】后不能对其使用【杀】。',
			sbyijue:'义绝',
			sbyijue_info:'锁定技，每名角色每局游戏限一次，当你对一名角色造成不小于其体力值与护甲之和的伤害时，你防止此伤害，且本回合你使用牌指定其为目标后，取消之。',
			sb_caopi: "谋曹丕",
			sbxingshang: "行殇",
			sbxingshang_info: "①当一名角色受到伤害后（每回合限一次）或死亡时，你获得2个“颂”标记（你至多拥有9个“颂”标记）。②出牌阶段限两次，你可以：1.移去2个“颂”标记，令一名角色复原武将牌；2.移去2个“颂”标记，令一名角色摸X张牌（X为场上阵亡角色数，且X至少为2，至多为5）；3.移去5个“颂”标记，令一名体力上限小于10的角色加1点体力上限，回复1点体力，随机恢复一个已废除的装备栏；4.移去5个“颂”标记，获得一名阵亡角色武将牌上的所有技能，然后你失去〖行殇〗〖放逐〗〖颂威〗。",
			sbfangzhu: "放逐",
			sbfangzhu_info: "出牌阶段限一次，你可以：1.移去1个“颂”标记，令一名其他角色于手牌中只能使用基本牌直到其回合结束；2.移去2个“颂”标记，令一名其他角色于手牌中只能使用锦囊牌直到其回合结束。3.移去3个“颂”标记，令一名其他角色于手牌中只能使用装备牌直到其回合结束；4.移去2个“颂”标记，令一名其他角色的非Charlotte技能失效直到其回合结束；5.移去2个“颂”标记，令一名其他角色不能响应除其以外的角色使用的牌直到其回合结束；6.移去3个“颂”标记，令一名其他角色将武将牌翻面；",
			sbfangzhu_info_doudizhu: "出牌阶段限一次，你可以：1.移去2个“颂”标记，令一名其他角色于手牌中只能使用锦囊牌直到其回合结束。2.移去2个“颂”标记，令一名其他角色不能响应除其以外的角色使用的牌直到其回合结束；3.移去3个“颂”标记，令一名其他角色将武将牌翻面；",
			sbsongwei: "颂威",
			sbsongwei_info: "主公技。①出牌阶段开始时，你获得Y个“颂”标记（Y为场上其他魏势力角色数的两倍）。②每局游戏限一次，出牌阶段，你可以令一名其他魏势力角色失去所有其武将牌上的技能。",
			sb_luxun: "谋陆逊",
        	sbqianxun: "谦逊",
        	sbqianxun_info: "当一张锦囊牌对你生效时，若此牌名未记录且你不是使用者，则你记录之，然后可将至多X张牌置于你的武将牌上，此回合结束时获得（X为“谦逊”记录的牌名数且至多为5）。出牌阶段开始时，你可以移去一个记录的牌名，若为普通锦囊牌则可以视为使用此牌。",
        	sblianying: "连营",
        	sblianying_info: "其他角色的回合结束时，你可以观看牌堆顶的X张牌，然后将这些牌交给任意角色（X为你本回合失去的牌数，至多为5）。",
        	sb_xiahoudun: "谋夏侯惇",
        	sbganglie: "刚烈",
        	sbganglie_info: "出牌阶段限一次。你可以选择一名本局游戏对你造成过伤害且你未以此法选择过的角色，你对其造成2点伤害。",
        	sbqingjian: "清俭",
        	sbqingjian_info: "①当有一张牌不因使用而进入弃牌堆后，若你的“清俭”数小于X，你将此牌置于你的武将牌上，称为“清俭”（X为你的体力值-1，且至少为1）。②出牌阶段结束时，你将所有“清俭”分配给任意角色。",
        	sb_gaoshun: "谋高顺",
        	sbxianzhen: "陷阵",
        	sbxianzhen_info_identity: "出牌阶段限一次。你可以选择一名体力值小于你的角色，你于本阶段获得如下效果：⒈你对其使用牌无距离限制；⒉当你使用【杀】指定其为目标后，你可以与其拼点：若你赢，此【杀】无视防具且不计入次数，且若你本回合以此法对其造成的伤害小于2，你对其造成1点伤害；若其拼点牌为【杀】，则你获得之；若其拼点牌为其最后的手牌，则此【杀】对其造成伤害时，此伤害+1。",
        	sbxianzhen_info: "出牌阶段限一次。你可以选择一名其他角色，你于本阶段获得如下效果：⒈你对其使用牌无距离限制；⒉当你使用【杀】指定其为目标后，你可以与其拼点：若你赢，此【杀】无视防具且不计入次数，且若你本回合以此法对其造成的伤害小于2，你对其造成1点伤害；若其拼点牌为【杀】，则你获得之；若其拼点牌为其最后的手牌，则此【杀】对其造成伤害时，此伤害+1。",
        	sbjinjiu: "禁酒",
        	sbjinjiu_info: "锁定技。①你的【酒】均视为【杀】。②当你受到酒【杀】的伤害时，你令此伤害减至1。③其他角色不能于你的回合内使用【酒】。④当一名其他角色的拼点牌亮出后，若你为发起者或参与者且此牌为【酒】，则此牌的点数视为A。",
        	sb_handang: "谋韩当",
        	sbgongqi: "弓骑",
        	sbgongqi_info: "①出牌阶段开始时，你可以弃置一张牌，然后本阶段你获得如下效果：当你使用牌时，你令所有其他角色不能使用或打出与你弃置牌颜色不同的手牌响应此牌。②你的攻击范围+4。",
        	sbjiefan: "解烦",
        	sbjiefan_info: "出牌阶段限一次。你可以令一名角色选择一项：⒈令所有攻击范围内含有其的角色依次弃置两张牌；⒉其摸等同于攻击范围内含有其的角色数+2的牌；⒊背水：此技能失效直到你杀死一名角色，然后依次执行上述所有选项。",
        	sb_gongsunzan: "谋公孙瓒",
        	sbyicong: "义从",
        	sbyicong_info: "蓄力技（2/4）。①一轮游戏开始时，你可以消耗任意点蓄力值并选择一项：⒈你于本轮内至其他角色的距离-1，令系统选择牌堆中的X张【杀】；⒉其他角色于本轮内至你的距离+1，令系统选择牌堆中的X张【闪】（X为你消耗的蓄力值）。然后若你的“扈”数小于4，你将系统选择的牌置于武将牌上，称为“扈”。②你可以将“扈”如手牌般使用或打出。",
        	sbqiaomeng: "趫猛",
        	sbqiaomeng_info: "当你使用【杀】造成伤害后，若你有〖义从〗，你可以选择一项：⒈弃置受伤角色区域里的一张牌并摸一张牌；⒉获得3点蓄力值。",
        	sb_jiaxu: "谋贾诩",
        	sbwansha: "完杀",
        	sbwansha_info: "①你的回合内，不处于濒死状态的其他角色不能使用【桃】。②一名角色进入濒死状态时，你可以观看其手牌并选择其中零至两张牌，然后其选择一项：1.你将这些牌分配给任意名不为其的角色；2.其弃置除这些牌以外的牌。",
        	sbwansha_rewrite: "完杀·改",
        	sbwansha_rewrite_info: "①你的回合内，不处于濒死状态的其他角色不能使用【桃】。②一名角色进入濒死状态时，你可以观看其手牌并选择其区域内零至两张牌，然后其选择一项：1.你将这些牌分配给任意名不为其的角色；2.其弃置除这些牌以外的牌。",
        	sbluanwu: "乱武",
        	sbluanwu_info: "限定技，出牌阶段，你可令所有其他角色依次选择一项：①对距离最近（或之一）的其他角色使用一张【杀】；②失去1点体力。一名角色因此失去体力后，你可以修改〖完杀〗或者〖帷幕〗。",
        	sbweimu: "帷幕",
        	sbweimu_info: "锁定技。当你成为黑色锦囊牌的目标时，取消之。",
        	sbweimu_rewrite: "帷幕·改",
        	sbweimu_rewrite_info: "锁定技。①当你成为黑色锦囊牌的目标时，取消之。②每轮开始时，若你上一轮成为其他角色使用牌的目标的次数不大于2，你从弃牌堆中随机获得一张黑色锦囊牌或防具牌。",


			sb_zhi:'谋攻篇·知',
			sb_shi:'谋攻篇·识',
			sb_tong:'谋攻篇·同',
			sb_yu:'谋攻篇·虞',
			sb_neng:'谋攻篇·能',
		},
	};
});
