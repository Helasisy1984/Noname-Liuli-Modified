'use strict';
decadeModule.import(function (lib, game, ui, get, ai, _status) {
    decadeUI.animateSkill = {
    	//涉及game.start自定义brawl模式无法播放开局动画，故搬运到此处做成技能播放
		mx_start:{
			trigger:{global:'gameDrawAfter'},
			filter:function(event,player){
				return lib.config.extension_十周年UI_gameAnimationEffect;
			},
			direct:true,
			priority:Infinity+114514+1919810,
			firstDo:true,
			content:function(){
				game.removeGlobalSkill('mx_start');
				if (decadeUI.config.SanGuoShaGameStart == 'shizhounian') {
			game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start.mp3');
			var animation = decadeUI.animation;
			var bounds = animation.getSpineBounds('effect_youxikaishi_SZN');
			if (bounds == null) return;
			var sz = bounds.size;
			var scale = 0.9;
			animation.playSpine({
					name:'effect_youxikaishi_SZN',
					scale: scale
				});
				} //十周年
			if (decadeUI.config.SanGuoShaGameStart == 'shizhounian_dys') {
				game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
				var animation = decadeUI.animation;
				var bounds = animation.getSpineBounds('effect_youxikaishi_SZNdys');
				if (bounds == null) return;
				var sz = bounds.size;
				var scale = 0.6;
				animation.playSpine({
						name:'effect_youxikaishi_SZNdys',
						scale: scale,
						speed:1.2,
				});
				} //十周年大元帅
			if (decadeUI.config.SanGuoShaGameStart == 'shizhounian_djj') {
				game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
				var animation = decadeUI.animation;
				var bounds = animation.getSpineBounds('effect_youxikaishi_SZNdjj');
				if (bounds == null) return;
				var sz = bounds.size;
				var scale = 0.6;
				animation.playSpine({
						name:'effect_youxikaishi_SZNdjj',
						scale: scale
				});
				} //十周年大将军
			if (decadeUI.config.SanGuoShaGameStart == 'shizhounian_zf') {
				game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
				var animation = decadeUI.animation;
				var bounds = animation.getSpineBounds('effect_youxikaishi_SZNzf');
				if (bounds == null) return;
				var sz = bounds.size;
				var scale = 0.6;
				animation.playSpine({
						name:'effect_youxikaishi_SZNzf',
						scale: scale,
						speed:0.8,
				});
				} //十周年中锋
			if (decadeUI.config.SanGuoShaGameStart == 'shizhounian_qfz') {
				game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
				var animation = decadeUI.animation;
				var bounds = animation.getSpineBounds('effect_youxikaishi_SZNqfz');
				if (bounds == null) return;
				var sz = bounds.size;
				var scale = 0.6;
				animation.playSpine({
						name:'effect_youxikaishi_SZNqfz',
						scale: scale,
						speed:0.8,
				});
				} //十周年千夫长
			if (decadeUI.config.SanGuoShaGameStart == 'shousha_dys') {
				game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
				var animation = decadeUI.animation;
				var bounds = animation.getSpineBounds('effect_youxikaishi_SSdys');
				if (bounds == null) return;
				var sz = bounds.size;
				var scale = 0.8;
				animation.playSpine({
						name:'effect_youxikaishi_SSdys',
						scale: scale,
						speed:1.0,
				});
				} //手杀大元帅
			if (decadeUI.config.SanGuoShaGameStart == 'shousha_djj') {
				game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
				var animation = decadeUI.animation;
				var bounds = animation.getSpineBounds('shoushakaizhan');
				if (bounds == null) return;
				var sz = bounds.size;
				var scale = 0.8;
				    animation.playSpine({
						name:'shoushakaizhan',
						action: 'play3',
						speed: 0.8,
						scale: scale
				});
				} //手杀大将军
		    if (decadeUI.config.SanGuoShaGameStart == 'shousha_jj') {
				game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
				var animation = decadeUI.animation;
				var bounds = animation.getSpineBounds('shoushakaizhan');
				if (bounds == null) return;
				var sz = bounds.size;
				var scale = 0.8;
				    animation.playSpine({
						name:'shoushakaizhan',
						action: 'play2',
						speed: 0.8,
						scale: scale
				});
				} //手杀将军
			if (decadeUI.config.SanGuoShaGameStart == 'shousha_xw') {
				game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
				var animation = decadeUI.animation;
				var bounds = animation.getSpineBounds('shoushakaizhan');
				if (bounds == null) return;
				var sz = bounds.size;
				var scale = 0.9;
				    animation.playSpine({
						name:'shoushakaizhan',
						action: 'play1',
						speed: 0.8,
						scale: scale
				});
				} //手杀校尉
			if (decadeUI.config.SanGuoShaGameStart == 'SF_kaizhan_eff_putong') {
				game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
				var animation = decadeUI.animation;
				var bounds = animation.getSpineBounds('SF_kaizhan_eff_putong');
				if (bounds == null) return;
				var sz = bounds.size;
				var scale = 1;
				    animation.playSpine({
						name:'SF_kaizhan_eff_putong',
						speed:1.0,
						scale: scale
				});
				} //新十周年普通
			if (decadeUI.config.SanGuoShaGameStart == 'SF_kaizhan_eff_jiangjun') {
				game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
				var animation = decadeUI.animation;
				var bounds = animation.getSpineBounds('SF_kaizhan_eff_jiangjun');
				if (bounds == null) return;
				var sz = bounds.size;
				var scale = 1;
				    animation.playSpine({
						name:'SF_kaizhan_eff_jiangjun',
						speed:1.0,
						scale: scale
				});
				} //新十周年将军
			if (decadeUI.config.SanGuoShaGameStart == 'SF_kaizhan_eff_weijiangjun') {
				game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
				var animation = decadeUI.animation;
				var bounds = animation.getSpineBounds('SF_kaizhan_eff_weijiangjun');
				if (bounds == null) return;
				var sz = bounds.size;
				var scale = 1;
				    animation.playSpine({
						name:'SF_kaizhan_eff_weijiangjun',
						speed:1.0,
						scale: scale
				});
				} //新十周年卫将军
			if (decadeUI.config.SanGuoShaGameStart == 'SF_kaizhan_eff_cheqijiangjun') {
				game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
				var animation = decadeUI.animation;
				var bounds = animation.getSpineBounds('SF_kaizhan_eff_cheqijiangjun');
				if (bounds == null) return;
				var sz = bounds.size;
				var scale = 1;
				    animation.playSpine({
						name:'SF_kaizhan_eff_cheqijiangjun',
						speed:1.0,
						scale: scale
				});
				} //新十周年车骑将军
			if (decadeUI.config.SanGuoShaGameStart == 'SF_kaizhan_eff_piaoqijiangjun') {
				game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
				var animation = decadeUI.animation;
				var bounds = animation.getSpineBounds('SF_kaizhan_eff_piaoqijiangjun');
				if (bounds == null) return;
				var sz = bounds.size;
				var scale = 1;
				    animation.playSpine({
						name:'SF_kaizhan_eff_piaoqijiangjun',
						speed:1.0,
						scale: scale
				});
				} //新十周年骠骑将军
			if (decadeUI.config.SanGuoShaGameStart == 'SF_kaizhan_eff_dajiangjun') {
				game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
				var animation = decadeUI.animation;
				var bounds = animation.getSpineBounds('SF_kaizhan_eff_dajiangjun');
				if (bounds == null) return;
				var sz = bounds.size;
				var scale = 0.75;
				    animation.playSpine({
						name:'SF_kaizhan_eff_dajiangjun',
						speed:1,
						scale: scale
				});
				} //新十周年大将军
			if (decadeUI.config.SanGuoShaGameStart == 'SF_kaizhan_eff_dasima') {
				game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
				var animation = decadeUI.animation;
				var bounds = animation.getSpineBounds('SF_kaizhan_eff_dasima');
				if (bounds == null) return;
				var sz = bounds.size;
				var scale = 0.75;
				    animation.playSpine({
						name:'SF_kaizhan_eff_dasima',
						speed:1.2,
						scale: scale
				});
				} //新十周年大司马
				
				
				
			if (decadeUI.config.SanGuoShaGameStart == 'shizhounian_SJ') {
				var num=[0,1,2,3].randomGet();
		            if(num==0){
						game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
						var animation = decadeUI.animation;
						var bounds = animation.getSpineBounds('effect_youxikaishi_SZNdys');
						if (bounds == null) return;
						var sz = bounds.size;
						var scale = 0.6;
						animation.playSpine({
								name:'effect_youxikaishi_SZNdys',
								scale: scale,
								speed:1.2,
							}); 
					}//十周年大元帅
					if(num==1){
						game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
						var animation = decadeUI.animation;
						var bounds = animation.getSpineBounds('effect_youxikaishi_SZNdjj');
						if (bounds == null) return;
						var sz = bounds.size;
						var scale = 0.6;
						animation.playSpine({
								name:'effect_youxikaishi_SZNdjj',
								scale: scale
							}); 
					}//十周年大将军
					if(num==2){
						game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
						var animation = decadeUI.animation;
						var bounds = animation.getSpineBounds('effect_youxikaishi_SZNzf');
						if (bounds == null) return;
						var sz = bounds.size;
						var scale = 0.6;
						animation.playSpine({
								name:'effect_youxikaishi_SZNzf',
								scale: scale,
								speed:0.8,
							}); 
					}//十周年中锋
					if(num==3){
						game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
						var animation = decadeUI.animation;
						var bounds = animation.getSpineBounds('effect_youxikaishi_SZNqfz');
						if (bounds == null) return;
						var sz = bounds.size;
						var scale = 0.6;
						animation.playSpine({
								name:'effect_youxikaishi_SZNqfz',
								scale: scale,
								speed:0.8,
							}); 
					}//十周年千夫长
				} //十周年样式随机



			if (decadeUI.config.SanGuoShaGameStart == 'shousha_SJ') {
				var num=[0,1,2,3].randomGet();
		            if(num==0){
						game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
						var animation = decadeUI.animation;
						var bounds = animation.getSpineBounds('effect_youxikaishi_SSdys');
						if (bounds == null) return;
						var sz = bounds.size;
						var scale = 0.8;
						animation.playSpine({
								name:'effect_youxikaishi_SSdys',
								scale: scale,
								speed:1.0,
							}); 
					}//手杀大元帅
					if(num==1){
						game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
						var animation = decadeUI.animation;
						var bounds = animation.getSpineBounds('shoushakaizhan');
						if (bounds == null) return;
						var sz = bounds.size;
						var scale = 0.8;
					animation.playSpine({
						name:'shoushakaizhan',
						action: 'play3',
						speed: 0.8,
						scale: scale
							}); 
					}//手杀大将军
					if(num==2){
						game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
						var animation = decadeUI.animation;
						var bounds = animation.getSpineBounds('shoushakaizhan');
						if (bounds == null) return;
						var sz = bounds.size;
						var scale = 0.8;
					animation.playSpine({
						name:'shoushakaizhan',
						action: 'play2',
						speed: 0.8,
						scale: scale
							}); 
					}//手杀将军
					if(num==3){
						game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
						var animation = decadeUI.animation;
						var bounds = animation.getSpineBounds('shoushakaizhan');
						if (bounds == null) return;
						var sz = bounds.size;
						var scale = 0.9;
					animation.playSpine({
						name:'shoushakaizhan',
						action: 'play1',
						speed: 0.8,
						scale: scale
							}); 
					}//手杀校尉
				} //手杀样式随机
				
				
			if (decadeUI.config.SanGuoShaGameStart == 'xinshizhounian_SJ') {
				var num=[0,1,2,3,4,5,6].randomGet();
		            if(num==0){
						game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
						var animation = decadeUI.animation;
						var bounds = animation.getSpineBounds('SF_kaizhan_eff_putong');
						if (bounds == null) return;
						var sz = bounds.size;
						var scale = 1;
						animation.playSpine({
								name:'SF_kaizhan_eff_putong',
								scale: scale,
								speed:1.0,
							}); 
					}//新十周年普通
					if(num==1){
						game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
						var animation = decadeUI.animation;
						var bounds = animation.getSpineBounds('SF_kaizhan_eff_jiangjun');
						if (bounds == null) return;
						var sz = bounds.size;
						var scale = 1;
					animation.playSpine({
						name:'SF_kaizhan_eff_jiangjun',
						speed:1.0,
						scale: scale
							}); 
					}//新十周年将军
					if(num==2){
						game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
						var animation = decadeUI.animation;
						var bounds = animation.getSpineBounds('SF_kaizhan_eff_weijiangjun');
						if (bounds == null) return;
						var sz = bounds.size;
						var scale = 1;
					animation.playSpine({
						name:'SF_kaizhan_eff_weijiangjun',
						speed:1.0,
						scale: scale
							}); 
					}//新十周年卫将军
					if(num==3){
						game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
						var animation = decadeUI.animation;
						var bounds = animation.getSpineBounds('SF_kaizhan_eff_cheqijiangjun');
						if (bounds == null) return;
						var sz = bounds.size;
						var scale = 1;
					animation.playSpine({
						name:'SF_kaizhan_eff_cheqijiangjun',
						speed:1.0,
						scale: scale
							}); 
					}//新十周年车骑将军
					if(num==4){
						game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
						var animation = decadeUI.animation;
						var bounds = animation.getSpineBounds('SF_kaizhan_eff_piaoqijiangjun');
						if (bounds == null) return;
						var sz = bounds.size;
						var scale = 1;
					animation.playSpine({
						name:'SF_kaizhan_eff_piaoqijiangjun',
						speed:1.0,
						scale: scale
							}); 
					}//新十周年骠骑将军
					if(num==5){
						game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
						var animation = decadeUI.animation;
						var bounds = animation.getSpineBounds('SF_kaizhan_eff_dajiangjun');
						if (bounds == null) return;
						var sz = bounds.size;
						var scale = 0.75;
					animation.playSpine({
						name:'SF_kaizhan_eff_dajiangjun',
						speed:1,
						scale: scale
							}); 
					}//新十周年大将军
					if(num==6){
						game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start_shousha.mp3');
						var animation = decadeUI.animation;
						var bounds = animation.getSpineBounds('SF_kaizhan_eff_dasima');
						if (bounds == null) return;
						var sz = bounds.size;
						var scale = 0.75;
					animation.playSpine({
						name:'SF_kaizhan_eff_dasima',
						speed:1.2,
						scale: scale
							}); 
					}//新十周年大司马
				} //新十周年样式随机
				
				
			if (decadeUI.config.SanGuoShaGameStart == 'off') {				
				} //关闭
			},
		},
	};
    decadeUI.skill = {
        guanxing: {
            audio: 2,
            audioname: ['jiangwei', 're_jiangwei', 're_zhugeliang', 'ol_jiangwei'],
            trigger: {
                player: 'phaseZhunbeiBegin'
            },
            frequent: true,
            content: function () {
                'step 0';
                if (player.isUnderControl()) {
                    game.modeSwapPlayer(player);
                }
                
                var num = Math.min(5, game.countPlayer());
                if (player.hasSkill('yizhi') && player.hasSkill('guanxing')) {
                    num = 5;
                }
                var player = event.player;
                if (player.isUnderControl()) game.modeSwapPlayer(player);
                
                var cards = get.cards(num);
                var guanXing = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
                game.broadcast(function (player, cards) {
                    if (!window.decadeUI) return;
                    decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
                }, player, cards);
                
                event.switchToAuto = function () {
                    var cards = guanXing.cards[0].concat();
                    var cheats = [];
                    var judges = player.node.judges.childNodes;
                    
                    if (judges.length) {
                        cheats = decadeUI.get.cheatJudgeCards(cards, judges, true);
                    }
                    
                    if (cards.length && cheats.length == judges.length) {
                        for (var i = 0; i >= 0 && i < cards.length; i++) {
                            if (get.value(cards[i], player) >= 5) {
                                cheats.push(cards[i]);
                                cards.splice(i, 1);
                            }
                        }
                    }
                    
                    var time = 500;
                    for (var i = 0; i < cheats.length; i++) {
                        setTimeout(function (card, index, finished) {
                            guanXing.move(card, index, 0);
                            if (finished) guanXing.finishTime(1000);
                        }, time, cheats[i], i, (i >= cheats.length - 1) && cards.length == 0);
                        time += 500;
                    }
                    
                    for (var i = 0; i < cards.length; i++) {
                        setTimeout(function (card, index, finished) {
                            guanXing.move(card, index, 1);
                            if (finished) guanXing.finishTime(1000);
                        }, time, cards[i], i, (i >= cards.length - 1));
                        time += 500;
                    }
                };
                
                if (event.isOnline()) {
                    event.player.send(function () {
                        if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                    }, event.player);
                    
                    event.player.wait();
                    decadeUI.game.wait();
                } else if (!event.isMine()) {
                    event.switchToAuto();
                }
                'step 1';
                player.popup(get.cnNumber(event.num1) + '上' + get.cnNumber(event.num2) + '下');
                game.log(player, '将' + get.cnNumber(event.num1) + '张牌置于牌堆顶，' + get.cnNumber(event.num2) + '张牌置于牌堆底');
                game.updateRoundNumber();
            },
            ai: {
                threaten: 1.2
            }
        },
        reguanxing: {
            audio: 'guanxing',
            audioname: ['jiangwei', 're_jiangwei', 're_zhugeliang', 'gexuan', 'ol_jiangwei'],
            frequent: true,
            trigger: {
                player: ['phaseZhunbeiBegin', 'phaseJieshuBegin']
            },
            filter: function (event, player, name) {
                if (name == 'phaseJieshuBegin') {
                    return player.hasSkill('reguanxing_on');
                }
                return true;
            },
            content: function () {
                'step 0';
                var player = event.player;
                if (player.isUnderControl()) game.modeSwapPlayer(player);
                
                var cards = get.cards(game.countPlayer() < 4 ? 3 : 5);
                var guanXing = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
                game.broadcast(function (player, cards) {
                    if (!window.decadeUI) return;
                    decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
                }, player, cards);
                
                event.switchToAuto = function () {
                    var cheats = [];
                    var cards = guanXing.cards[0].concat();
                    var judges;
                    
                    var next = player.getNext();
                    var friend = player;
                    if (event.triggername == 'phaseJieshuBegin') {
                        friend = next;
                        judges = friend.node.judges.childNodes;
                        if (get.attitude(player, friend) < 0) friend = null;
                    } else {
                        judges = player.node.judges.childNodes;
                    }
                    
                    if (judges.length) {
                        cheats = decadeUI.get.cheatJudgeCards(cards, judges, friend != null);
                    }
                    
                    if (cards.length && cheats.length == judges.length) {
                        for (var i = 0; i >= 0 && i < cards.length; i++) {
                            if (friend) {
                                if (get.value(cards[i], friend) >= 5) {
                                    cheats.push(cards[i]);
                                    cards.splice(i, 1);
                                }
                            } else {
                                if (get.value(cards[i], next) < 4) {
                                    cheats.push(cards[i]);
                                    cards.splice(i, 1);
                                }
                            }
                        }
                    }
                    
                    var time = 500;
                    for (var i = 0; i < cheats.length; i++) {
                        setTimeout(function (card, index, finished) {
                            guanXing.move(card, index, 0);
                            if (finished) guanXing.finishTime(1000);
                        }, time, cheats[i], i, (i >= cheats.length - 1) && cards.length == 0);
                        time += 500;
                    }
                    
                    for (var i = 0; i < cards.length; i++) {
                        setTimeout(function (card, index, finished) {
                            guanXing.move(card, index, 1);
                            if (finished) guanXing.finishTime(1000);
                        }, time, cards[i], i, (i >= cards.length - 1));
                        time += 500;
                    }
                };
                
                if (event.isOnline()) {
                    // 判断其他玩家是否有十周年UI，否则直接给他结束，不知道有没有效果
                    event.player.send(function () {
                        if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                    }, event.player);
                    
                    // 等待其他玩家操作
                    event.player.wait();
                    // 暂停主机端游戏
                    decadeUI.game.wait();
                } else if (!event.isMine()) {
                    event.switchToAuto();
                    /*
                    注释说明
                    var guanXing = decadeUI.content.chooseGuanXing(
                        控制观星的玩家,            	  	// 必选
                        [顶部初始化的牌],            	// 必选，可为null，但底部不能为null
                        顶部允许控制的牌数范围,        	// 可选，不填根据初始化的牌数量
                        [底部初始化的牌],            	// 必选，可为null，但顶部不能为null
                        底部允许控制的牌数范围,        	// 可选，不填根据初始化的牌数量
                        第一个参数的玩家是否可见);      	// 可选，不设置则根据控制观星的玩家来显示
                    
                    // undefined 均为可设置，其他为只读或调用
                    var properties = {
                        caption: undefined,        	// 设置标题
                        header1: undefined,			// 牌堆顶的文字
                        header2: undefined,			// 牌堆底的文字
                        cards: [[],[]],            	// 获取当前观星的牌，不要瞎改
                        callback: undefined,    	// 回调函数，返回 true 表示可以点击【确认】按钮，例：guanXing.callback = function(){ return guanXing.cards[1].length == 1; }
                                                    // 注意：此值一旦设置，观星finish后不会自己置顶牌堆顶和牌堆底，需要自行实现
                        infohide: undefined,    	// 设置上面第1个参数的玩家是否可见观星的牌
                        confirmed: undefined,		// 是否按下确认按钮
                        doubleSwitch: undefined,	// 双击切换牌
                        finishTime:function(time),	// 指定的毫秒数后完成观星
                        finish:function(),        	// 观星完成，在下一个step 中，可以通过 event.cards1 与 event.cards2 访问观星后的牌
                        swap:function(s, t),    	// 交换观星中的两个牌
                        switch:function(card),   	// 将观星中的牌切换到另一方
                        move:function(card, index, moveDown)	// 移动观星的牌到指定的一方位置
                    }
                    */
                }
                'step 1';
                if (event.triggername == 'phaseZhunbeiBegin' && event.num1 == 0) player.addTempSkill('reguanxing_on');
                player.popup(get.cnNumber(event.num1) + '上' + get.cnNumber(event.num2) + '下');
                game.log(player, '将' + get.cnNumber(event.num1) + '张牌置于牌堆顶，' + get.cnNumber(event.num2) + '张牌置于牌堆底');
                game.updateRoundNumber();
            },
            subSkill: {
                on: {}
            }
        },
        chengxiang: {
            audio: 2,
            frequent: true,
            trigger: {
                player: 'damageEnd'
            },
            content: function () {
                'step 0';
                var chengxiangNum=(event.name=='oldchengxiang'?12:13);
                var cards = get.cards(4);
                var guanXing = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, 4, false);
                guanXing.doubleSwitch = true;
                //guanXing.caption = '【称象】';
                guanXing.caption = game.changeToGoldTitle('称象',false,37);
                guanXing.header2 = '获得的牌';
                guanXing.callback = function () {
                    var num = 0;
                    for (var i = 0; i < this.cards[1].length; i++) {
                        num += get.number(this.cards[1][i]);
                    }
                    
                    return num > 0 && num <= chengxiangNum;
                };
                
                game.broadcast(function (player, cards, callback) {
                    if (!window.decadeUI) return;
                    var guanXing = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, 4, false);
                    //guanXing.caption = '【称象】';
                    guanXing.caption = game.changeToGoldTitle('称象',false,37);
                    guanXing.header2 = '获得的牌';
                    guanXing.callback = callback;
                }, player, cards, guanXing.callback);
                
                var player = event.player;
                event.switchToAuto = function () {
                    var cards = guanXing.cards[0];
                    var num, sum, next;
                    var index = 0;
                    var results = [];
                    
                    for (var i = 0; i < cards.length; i++) {
                        num = 0;
                        sum = 0;
                        next = i + 1;
                        for (var j = i; j < cards.length; j++) {
                            if (j != i && j < next)
                                continue;
                            
                            num = sum + get.number(cards[j]);
                            if (num <= chengxiangNum) {
                                sum = num;
                                if (!results[index]) results[index] = [];
                                results[index].push(cards[j]);
                            }
                            
                            if (j >= cards.length - 1) index++;
                        }
                        
                        if (results[index] && results[index].length == cards.length) break;
                    }
                    
                    var costs = [];
                    for (var i = 0; i < results.length; i++) {
                        costs[i] = {
                            value: 0,
                            index: i
                        };
                        for (var j = 0; j < results[i].length; j++) {
                            costs[i].value += get.value(results[i][j], player);
                            // 如果有队友且有【仁心】且血量不低，优先选择装备牌
                            if (player.hasFriend() && player.hasSkill('renxin') && get.type(results[i][j]) == 'equip' && player.hp > 1) {
                                costs[i].value += 5;
                            }
                            
                            // 如果自己有延时牌且没有无懈可击，优先选择无懈可击
                            if (player.node.judges.childNodes.length > 0 && !player.hasWuxie() && results[i][j] == 'wuxie') {
                                costs[i].value += 5;
                            }
                        }
                    }
                    
                    costs.sort(function (a, b) {
                        return b.value - a.value;
                    });
                    
                    var time = 500;
                    var result = results[costs[0].index];
                    
                    for (var i = 0; i < result.length; i++) {
                        setTimeout(function (move, finished) {
                            guanXing.move(move, guanXing.cards[1].length, 1);
                            if (finished) guanXing.finishTime(1000);
                        }, time, result[i], (i >= result.length - 1));
                        time += 500;
                    }
                };
                
                if (event.isOnline()) {
                    event.player.send(function () {
                        if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                    }, event.player);
                    
                    event.player.wait();
                    decadeUI.game.wait();
                } else if (!event.isMine()) {
                    event.switchToAuto();
                }
                'step 1';
                if (event.result && event.result.bool) {
                    game.cardsDiscard(event.cards1);
                    player.gain(event.cards2, 'log', 'gain2');
                }
            },
            ai: {
                maixie: true,
                maixie_hp: true,
                effect: {
                    target: function (card, player, target) {
                        if (get.tag(card, 'damage')) {
                            if (player.hasSkillTag('jueqing', false, target)) return [1, -2];
                            if (!target.hasFriend()) return;
                            if (target.hp >= 4) return [1, 2];
                            if (target.hp == 3) return [1, 1.5];
                            if (target.hp == 2) return [1, 0.5];
                        }
                    }
                }
            }
        },
        xinfu_zuilun: {
            audio: 2,
            trigger: {
                player: 'phaseJieshuBegin'
            },
            check: function (event, player) {
                var num = 0;
                if (player.getHistory('lose', function (evt) {
                    return evt.type == 'discard';
                }).length) num++;
                if (!player.isMinHandcard()) num++;
                if (!player.getStat('damage')) num++;
                if (num == 3) return player.hp >= 2;
                return true;
            },
            prompt: function (event, player) {
                var num = 3;
                if (player.getHistory('lose', function (evt) {
                    return evt.type == 'discard';
                }).length) num--;
                if (!player.isMinHandcard()) num--;
                if (!player.getStat('damage')) num--;
                return get.prompt('xinfu_zuilun') + '（可获得' + get.cnNumber(num) + '张牌）';
            },
            content: function () {
                'step 0';
                event.num = 0;
                event.cards = get.cards(3);
                if (player.getHistory('lose', function (evt) {
                    return evt.type == 'discard';
                }).length) event.num++;
                if (!player.isMinHandcard()) event.num++;
                if (!player.getStat('damage')) event.num++;
                'step 1';
                if (event.num == 0) {
                    player.gain(event.cards, 'draw');
                    event.finish();
                    return;
                }
                
                var cards = event.cards;
                var gains = cards.length - event.num;
                
                var zuiLun = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, gains);
                //zuiLun.caption = '【罪论】';
                zuiLun.caption = game.changeToGoldTitle('罪论',false,37);
                zuiLun.header2 = '获得的牌';
                zuiLun.tip = '可获得' + gains + '张牌<br>' + zuiLun.tip;
                zuiLun.callback = function () {
                    return this.cards[1].length == gains;
                };
                
                game.broadcast(function (player, cards, gains, callback) {
                    if (!window.decadeUI) return;
                    var zuiLun = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, gains);
                    //zuiLun.caption = '【罪论】';
                    zuiLun.caption = game.changeToGoldTitle('罪论',false,37);
                    zuiLun.header2 = '获得的牌';
                    zuiLun.tip = '可获得' + gains + '张牌<br>' + zuiLun.tip;
                    zuiLun.callback = callback;
                }, player, cards, gains, zuiLun.callback);
                
                var player = event.player;
                event.switchToAuto = function () {
                    var cheats = [];
                    var cards = zuiLun.cards[0].concat();
                    var stopped = false;
                    
                    var next = player.getNext();
                    var hasFriend = get.attitude(player, next) > 0;
                    
                    // 判断下家是不是队友，令其生效或者失效
                    var judges = next.node.judges.childNodes;
                    if (judges.length > 0) cheats = decadeUI.get.cheatJudgeCards(cards, judges, hasFriend);
                    
                    // 如果有【父荫】优先把好牌给队友
                    if (hasFriend && player.hasSkill('xinfu_fuyin')) {
                        cards = decadeUI.get.bestValueCards(cards, next);
                    } else {
                        cards.sort(function (a, b) {
                            return get.value(a, player) - get.value(b, player);
                        });
                    }
                    
                    cards = cheats.concat(cards);
                    var time = 500;
                    var gainNum = gains;
                    for (var i = cards.length - 1; i >= 0; i--) {
                        setTimeout(function (card, index, finished, moveDown) {
                            zuiLun.move(card, index, moveDown ? 1 : 0);
                            if (finished) zuiLun.finishTime(1000);
                        }, time, cards[i], i, i == 0, gainNum > 0);
                        time += 500;
                        gainNum--;
                    }
                };
                
                if (event.isOnline()) {
                    event.player.send(function () {
                        if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                    }, event.player);
                    
                    event.player.wait();
                    decadeUI.game.wait();
                } else if (!event.isMine()) {
                    event.switchToAuto();
                }
                'step 2';
                event.cards = event.cards2;
                if (event.result && event.result.bool) {
                    var cards = event.cards1;
                    var first = ui.cardPile.firstChild;
                    for (var i = 0; i < cards.length; i++) {
                        ui.cardPile.insertBefore(cards[i], first);
                    }
                }
                'step 3';
                game.updateRoundNumber();
                if (event.cards.length) {
                    player.gain(event.cards, 'draw');
                    event.finish();
                } else {
                    player.chooseTarget('请选择一名角色，与其一同失去1点体力', true, function (card, player, target) {
                        return target != player;
                    }).ai = function (target) {
                        return -get.attitude(_status.event.player, target);
                    };
                }
                'step 4';
                player.line(result.targets[0], 'fire');
                player.loseHp();
                result.targets[0].loseHp();
            }
        },
        xunxun: {
            audio: 2,
            trigger: {
                player: 'phaseDrawBegin1'
            },
            content: function () {
                'step 0';
                var cards = get.cards(4);
                var player = event.player;
                var xunxun = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, 2);
                //xunxun.caption = '【恂恂】';
                xunxun.caption = game.changeToGoldTitle('恂恂',false,37);
                xunxun.header1 = '牌堆底';
                xunxun.header2 = '牌堆顶';
                xunxun.callback = function () {
                    return this.cards[0].length == 2 && this.cards[1].length == 2;
                };
                
                game.broadcast(function (player, cards, callback) {
                    if (!window.decadeUI) return;
                    var xunxun = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, 2);
                    //xunxun.caption = '【恂恂】';
                    xunxun.caption = game.changeToGoldTitle('恂恂',false,37);
                    xunxun.header1 = '牌堆底';
                    xunxun.header2 = '牌堆顶';
                    xunxun.callback = callback;
                }, player, cards, xunxun.callback);
                
                event.switchToAuto = function () {
                    var cards = decadeUI.get.bestValueCards(xunxun.cards[0].concat(), player);
                    var time = 500;
                    for (var i = 0; i < 2; i++) {
                        setTimeout(function (card, index, finished) {
                            xunxun.move(card, index, 1);
                            if (finished) xunxun.finishTime(1000);
                        }, time, cards[i], i, i >= 1);
                        time += 500;
                    }
                };
                
                if (event.isOnline()) {
                    event.player.send(function () {
                        if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                    }, event.player);
                    
                    event.player.wait();
                    decadeUI.game.wait();
                } else if (!event.isMine()) {
                    event.switchToAuto();
                }
                
                'step 1';
                var first = ui.cardPile.firstChild;
                var cards = event.cards2;
                for (var i = 0; i < cards.length; i++) {
                    ui.cardPile.insertBefore(cards[i], first);
                }
                
                cards = event.cards1;
                for (var i = 0; i < cards.length; i++) {
                    ui.cardPile.appendChild(cards[i]);
                }
            }
            
        },
        
        xinfu_dianhua: {
            audio: 2,
            frequent: true,
            trigger: {
                player: ["phaseZhunbeiBegin", "phaseJieshuBegin"]
            },
            filter: function (event, player) {
                for (var i = 0; i < lib.suit.length; i++) {
                    if (player.hasMark('xinfu_falu_' + lib.suit[i])) return true;
                }
                return false;
            },
            content: function () {
                'step 0';
                var num = 0;
                var player = event.player;
                for (var i = 0; i < lib.suit.length; i++) {
                    if (player.hasMark('xinfu_falu_' + lib.suit[i])) num++;
                }
                
                var cards = get.cards(num);
                var dialog = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
                //dialog.caption = '【点化】';
                dialog.caption = game.changeToGoldTitle('点化',false,37);
                game.broadcast(function (player, cards) {
                    if (!window.decadeUI) return;
                    //decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length).caption = '【点化】';
                    decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length).caption = game.changeToGoldTitle('点化',false,37);
                }, player, cards);
                
                event.switchToAuto = function () {
                    var cheats = [];
                    var cards = dialog.cards[0].concat();
                    var judges;
                    
                    var next = player.getNext();
                    var friend = player;
                    if (event.triggername == 'phaseJieshuBegin') {
                        friend = next;
                        judges = friend.node.judges.childNodes;
                        if (get.attitude(player, friend) < 0) friend = null;
                    } else {
                        judges = player.node.judges.childNodes;
                    }
                    
                    if (judges.length) {
                        cheats = decadeUI.get.cheatJudgeCards(cards, judges, friend != null);
                    }
                    
                    if (cards.length && cheats.length == judges.length) {
                        for (var i = 0; i >= 0 && i < cards.length; i++) {
                            if (friend) {
                                if (get.value(cards[i], friend) >= 5) {
                                    cheats.push(cards[i]);
                                    cards.splice(i, 1);
                                }
                            } else {
                                if (get.value(cards[i], next) < 4) {
                                    cheats.push(cards[i]);
                                    cards.splice(i, 1);
                                }
                            }
                        }
                    }
                    
                    var time = 500;
                    for (var i = 0; i < cheats.length; i++) {
                        setTimeout(function (card, index, finished) {
                            dialog.move(card, index, 0);
                            if (finished) dialog.finishTime(1000);
                        }, time, cheats[i], i, (i >= cheats.length - 1) && cards.length == 0);
                        time += 500;
                    }
                    
                    for (var i = 0; i < cards.length; i++) {
                        setTimeout(function (card, index, finished) {
                            dialog.move(card, index, 1);
                            if (finished) dialog.finishTime(1000);
                        }, time, cards[i], i, (i >= cards.length - 1));
                        time += 500;
                    }
                };
                // var dianhua = decadeUI.content.chooseGuanXing(player, cards, cards.length);
                // dianhua.caption = '【点化】';
                // game.broadcast(function(player, cards, callback){
                // if (!window.decadeUI) return;
                // var dianhua = decadeUI.content.chooseGuanXing(player, cards, cards.length);
                // dianhua.caption = '【点化】';
                // dianhua.callback = callback;
                // }, player, cards, dianhua.callback);
                
                // event.switchToAuto = function(){
                // var cards = dianhua.cards[0].concat();
                // var cheats = [];
                // var judges;
                
                // var next = player.getNext();
                // var friend = player;
                // if (event.triggername == 'phaseJieshuBegin') {
                // friend = next;
                // judges = friend.node.judges.childNodes;
                // if (get.attitude(player, friend) < 0) friend = null;
                // } else {
                // judges = player.node.judges.childNodes;
                // }
                
                // if (judges.length > 0) cheats = decadeUI.get.cheatJudgeCards(cards, judges, friend != null);
                
                // if (friend) {
                // cards = decadeUI.get.bestValueCards(cards, friend);
                // } else {
                // cards.sort(function(a, b){
                // return get.value(a, next) - get.value(b, next);
                // });
                // }
                
                // cards = cheats.concat(cards);
                // var time = 500;
                // for (var i = 0; i < cards.length; i++) {
                // setTimeout(function(card, index, finished){
                // dianhua.move(card, index, 0);
                // if (finished) dianhua.finishTime(1000);
                // }, time, cards[i], i, i >= cards.length - 1);
                // time += 500;
                // }
                // }
                
                if (event.isOnline()) {
                    event.player.send(function () {
                        if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                    }, event.player);
                    
                    event.player.wait();
                    decadeUI.game.wait();
                } else if (!event.isMine()) {
                    event.switchToAuto();
                }
                
                'step 1';
                player.popup(get.cnNumber(event.num1) + '上' + get.cnNumber(event.num2) + '下');
                game.log(player, '将' + get.cnNumber(event.num1) + '张牌置于牌堆顶，' + get.cnNumber(event.num2) + '张牌置于牌堆底');
                game.updateRoundNumber();
            }
            
        },
        zongxuan: {
            audio: 2,
            frequent: false,
            trigger: {
                player: 'loseAfter'
            },
            check: function (event) {
                var cards = [];
                for (var i = 0; i < event.cards2.length; i++) {
                    if (get.position(event.cards2[i]) == 'd') {
                        cards.push(event.cards2[i]);
                    }
                }
                
                var player = event.player;
                
                if (_status.currentPhase == player) {
                    for (var i = 0; i < cards.length; i++) {
                        if (get.value(cards[i], event.player) > 4) return true;
                    }
                } else if (_status.currentPhase) {
                    var next = _status.currentPhase.getNext();
                    var judges = next.node.judges.childNodes;
                    if (get.attitude(player, next) > 0) {
                        if (judges.length > 0) {
                            for (var j = 0; j < judges.length; j++) {
                                var judge = get.judge(judges[j]);
                                for (var i = 0; i < cards.length; i++) {
                                    if (judge(cards[i]) >= 0) return true;
                                }
                            }
                        } else {
                            for (var i = 0; i < cards.length; i++) if (get.value(cards[i], next) > 4) return true;
                        }
                    } else {
                        if (judges.length > 0) {
                            for (var j = 0; j < judges.length; j++) {
                                var judge = get.judge(judges[j]);
                                for (var i = 0; i < cards.length; i++) {
                                    if (judge(cards[i]) < 0) return true;
                                }
                            }
                        } else {
                            for (var i = 0; i < cards.length; i++) if (get.value(cards[i], next) < 4) return true;
                        }
                        
                    }
                }
                
                return false;
            },
            filter: function (event, player) {
                if (event.type != 'discard') return false;
                for (var i = 0; i < event.cards2.length; i++) {
                    if (get.position(event.cards2[i]) == 'd') {
                        return true;
                    }
                }
                return false;
            },
            content: function () {
                'step 0';
                var cards = [];
                for (var i = 0; i < trigger.cards2.length; i++) {
                    var card = trigger.cards2[i];
                    if (get.position(card, true) == 'd') {
                        cards.push(card);
                        clearTimeout(card.timeout);
                        card.classList.remove('removing');
                        // 防止因为限制结算速度，而导致牌提前进入弃牌堆
                    }
                }
                
                if (!cards.length) return;
                var dialog = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
                //dialog.caption = '【纵玄】';
                dialog.caption = game.changeToGoldTitle('纵玄',false,37);
                dialog.header1 = '弃牌堆';
                dialog.header2 = '牌堆顶';
                dialog.lockCardsOrder(0);
                dialog.callback = function () {
                    return this.cards[1].length > 0;
                };
                game.broadcast(function (player, cards, callback) {
                    if (!window.decadeUI) return;
                    var zongxuan = decadeUI.content.chooseGuanXing(player, cards, cards.length);
                    //dialog.caption = '【纵玄】';
                    dialog.caption = game.changeToGoldTitle('纵玄',false,37);
                    dialog.header1 = '弃牌堆';
                    dialog.header2 = '牌堆顶';
                    dialog.lockCardsOrder(0);
                    dialog.callback = callback;
                }, player, cards, dialog.callback);
                
                event.switchToAuto = function () {
                    var parent = event.parent;
                    while (parent != null && parent.name != 'phaseDiscard') parent = parent.parent;
                    
                    var cards = dialog.cards[0].concat();
                    var cheats = [];
                    var next = player.getNext();
                    var hasFriend = get.attitude(player, next) > 0;
                    
                    if (parent) {
                        var hasZhiYan = player.hasSkill('zhiyan');	//如果有【直言】，AI 1000%肯定会用这个技能
                        var judges = next.node.judges.childNodes;
                        if (judges > 0 && hasZhiYan && cards.length > 1) {
                            cheats = decadeUI.get.cheatJudgeCards(cards, judges, hasFriend);
                        }
                    }
                    
                    if (cards.length > 0) {
                        cards.sort(function (a, b) {
                            return get.value(b, player) - get.value(a, player);
                        });
                        cheats.splice(0, 0, cards.shift());
                        
                        var cost;
                        for (var i = 0; i < cards.length; i++) {
                            if (hasFriend) {
                                if (get.value(cards[i], next) >= 5) cheats.push(cards[i]);
                            } else {
                                if (get.value(cards[i], next) < 5) cheats.push(cards[i]);
                            }
                        }
                    }
                    
                    var time = 500;
                    for (var i = 0; i < cheats.length; i++) {
                        setTimeout(function (card, index, finished) {
                            dialog.move(card, index, 1);
                            if (finished) dialog.finishTime(cards.length <= 1 ? 250 : 1000);
                            ;
                        }, time, cheats[i], i, (i >= cheats.length - 1));
                        time += 500;
                    }
                };
                
                if (event.isOnline()) {
                    event.player.send(function () {
                        if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                    }, event.player);
                    
                    event.player.wait();
                    decadeUI.game.wait();
                } else if (!event.isMine()) {
                    event.switchToAuto();
                }
                
                'step 1';
                var first = ui.cardPile.firstChild;
                var cards = event.cards2;
                for (var i = 0; i < cards.length; i++) {
                    ui.cardPile.insertBefore(cards[i], first);
                }
                
                cards = event.cards1;
                for (var i = 0; i < cards.length; i++) {
                    ui.discardPile.appendChild(cards[i]);
                }
                
                game.log(player, '将' + get.cnNumber(event.num2) + '张牌置于牌堆顶');
            }
        },
        identity_junshi: {
            name: '军师',
            mark: true,
            silent: true,
            intro: {content: '准备阶段开始时，可以观看牌堆顶的三张牌，然后将这些牌以任意顺序置于牌堆顶或牌堆底'},
            trigger: {
                player: 'phaseBegin'
            },
            content: function () {
                "step 0";
                if (player.isUnderControl()) {
                    game.modeSwapPlayer(player);
                }
                var num = 3;
                var cards = get.cards(num);
                var guanxing = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
                //guanxing.caption = '【军师】';
                guanxing.caption = game.changeToGoldTitle('军师',false,37);
                game.broadcast(function (player, cards, callback) {
                    if (!window.decadeUI) return;
                    var guanxing = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
                    //guanxing.caption = '【军师】';
                    guanxing.caption = game.changeToGoldTitle('军师',false,37);
                    guanxing.callback = callback;
                }, player, cards, guanxing.callback);
                
                event.switchToAuto = function () {
                    var cards = guanxing.cards[0].concat();
                    var cheats = [];
                    var judges = player.node.judges.childNodes;
                    
                    if (judges.length) cheats = decadeUI.get.cheatJudgeCards(cards, judges, true);
                    if (cards.length) {
                        for (var i = 0; i >= 0 && i < cards.length; i++) {
                            if (get.value(cards[i], player) >= 5) {
                                cheats.push(cards[i]);
                                cards.splice(i, 1);
                            }
                        }
                    }
                    
                    var time = 500;
                    for (var i = 0; i < cheats.length; i++) {
                        setTimeout(function (card, index, finished) {
                            guanxing.move(card, index, 0);
                            if (finished) guanxing.finishTime(1000);
                        }, time, cheats[i], i, (i >= cheats.length - 1) && cards.length == 0);
                        time += 500;
                    }
                    
                    for (var i = 0; i < cards.length; i++) {
                        setTimeout(function (card, index, finished) {
                            guanxing.move(card, index, 1);
                            if (finished) guanxing.finishTime(1000);
                        }, time, cards[i], i, (i >= cards.length - 1));
                        time += 500;
                    }
                };
                
                if (event.isOnline()) {
                    event.player.send(function () {
                        if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                    }, event.player);
                    
                    event.player.wait();
                    decadeUI.game.wait();
                } else if (!event.isMine()) {
                    event.switchToAuto();
                }
                "step 1";
                player.popup(get.cnNumber(event.num1) + '上' + get.cnNumber(event.num2) + '下');
                game.log(player, '将' + get.cnNumber(event.num1) + '张牌置于牌堆顶，' + get.cnNumber(event.num2) + '张牌置于牌堆底');
                game.updateRoundNumber();
            }
        },
        wuxin: {
            audio: 2,
            trigger: {
                player: 'phaseDrawBegin1'
            },
            content: function () {
                var num = get.population('qun');
                if (player.hasSkill('huangjintianbingfu')) {
                    num += player.getExpansions('huangjintianbingfu').length;
                }
                
                var cards = get.cards(num);
                var dialog = decadeUI.content.chooseGuanXing(player, cards, cards.length);
                //dialog.caption = '【悟心】';
                dialog.caption = game.changeToGoldTitle('悟心',false,37);
                game.broadcast(function (player, cards, callback) {
                    if (!window.decadeUI) return;
                    var dialog = decadeUI.content.chooseGuanXing(player, cards, cards.length);
                    //dialog.caption = '【悟心】';
                    dialog.caption = game.changeToGoldTitle('悟心',false,37);
                    dialog.callback = callback;
                }, player, cards, dialog.callback);
                
                event.switchToAuto = function () {
                    var cards = dialog.cards[0].concat();
                    var cheats = [];
                    
                    var next = player.getNext();
                    var friend = player;
                    var judges = friend.node.judges.childNodes;
                    if (judges.length > 0) cheats = decadeUI.get.cheatJudgeCards(cards, judges, friend != null);
                    
                    if (friend) {
                        cards = decadeUI.get.bestValueCards(cards, friend);
                    } else {
                        cards.sort(function (a, b) {
                            return get.value(a, next) - get.value(b, next);
                        });
                    }
                    
                    cards = cheats.concat(cards);
                    var time = 500;
                    for (var i = 0; i < cards.length; i++) {
                        setTimeout(function (card, index, finished) {
                            dialog.move(card, index, 0);
                            if (finished) dialog.finishTime(cards.length <= 1 ? 250 : 1000);
                            ;
                        }, time, cards[i], i, i >= cards.length - 1);
                        time += 500;
                    }
                };
                
                if (event.isOnline()) {
                    event.player.send(function () {
                        if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                    }, event.player);
                    
                    event.player.wait();
                    decadeUI.game.wait();
                } else if (!event.isMine()) {
                    event.switchToAuto();
                }
            }
        },
        luoying: {
            group: ['luoying_discard', 'luoying_judge'],
            subfrequent: ['judge'],
            subSkill: {
                discard: {
                    audio: 2,
                    trigger: {
                        global: 'loseAfter'
                    },
                    filter: function (event, player) {
                        if (event.type != 'discard') return false;
                        if (event.player == player) return false;
                        for (var i = 0; i < event.cards2.length; i++) {
                            if (get.suit(event.cards2[i], event.player) == 'club' && get.position(event.cards2[i], true) == 'd') {
                                return true;
                            }
                        }
                        return false;
                    },
                    // direct: true,
                    content: function () {
                        "step 0";
                        if (trigger.delay == false) game.delay();
                        "step 1";
                        var cards = [];
                        for (var i = 0; i < trigger.cards2.length; i++) {
                            var card = trigger.cards2[i];
                            if (get.suit(card, trigger.player) == 'club' && get.position(card, true) == 'd') {
                                cards.push(card);
                                clearTimeout(card.timeout);
                                card.classList.remove('removing');
                                // 防止因为限制结算速度，而导致牌提前进入弃牌堆
                            }
                        }
                        
                        var dialog = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length, false);
                        //dialog.caption = '【落英】';
                        dialog.caption = game.changeToGoldTitle('落英',false,37);
                        dialog.header1 = '弃牌堆';
                        dialog.header2 = '获得牌';
                        dialog.tip = '请选择要获得的牌';
                        dialog.lockCardsOrder(0);
                        dialog.cards[1] = dialog.cards[0];
                        dialog.cards[0] = [];
                        dialog.update();
                        dialog.onMoved();
                        dialog.callback = function () {
                            return true;
                        };
                        game.broadcast(function (player, cards, callback) {
                            if (!window.decadeUI) return;
                            var dialog = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length, false);
                            //dialog.caption = '【落英】';
                            dialog.caption = game.changeToGoldTitle('落英',false,37);
                            dialog.header1 = '弃牌堆';
                            dialog.header2 = '获得牌';
                            dialog.tip = '请选择要获得的牌';
                            dialog.lockCardsOrder(0);
                            dialog.cards[1] = dialog.cards[0];
                            dialog.cards[0] = [];
                            dialog.update();
                            dialog.onMoved();
                            dialog.callback = callback;
                        }, player, cards, dialog.callback);
                        
                        event.switchToAuto = function () {
                            var cards = dialog.cards[1].concat();
                            var time = 500;
                            
                            if (cards.length) {
                                var discards = [];
                                for (var i = 0; i < cards.length; i++) {
                                    if (get.value(cards[i]) < 0) {
                                        discards.push(cards[i]);
                                    }
                                }
                                
                                if (discards.length) {
                                    for (var i = 0; i < discards.length; i++) {
                                        setTimeout(function (card, index, finished) {
                                            dialog.move(card, index, 0);
                                            if (finished) dialog.finishTime(1000);
                                        }, time, discards[i], i, i >= discards.length - 1);
                                        time += 500;
                                    }
                                } else {
                                    dialog.finishTime(1000);
                                }
                                
                            } else {
                                dialog.finishTime(1000);
                            }
                        };
                        
                        if (event.isOnline()) {
                            event.player.send(function () {
                                if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                            }, event.player);
                            
                            event.player.wait();
                            decadeUI.game.wait();
                        } else if (!event.isMine()) {
                            event.switchToAuto();
                        }
                        "step 2";
                        game.cardsDiscard(event.cards1);
                        if (event.cards2) {
                            // player.logSkill(event.name);
                            player.gain(event.cards2, 'gain2', 'log');
                        }
                    }
                },
                judge: {
                    audio: 2,
                    trigger: {
                        global: 'cardsDiscardAfter'
                    },
                    // direct: true,
                    check: function (event, player) {
                        return event.cards[0].name != 'du';
                    },
                    filter: function (event, player) {
                        var evt = event.getParent().relatedEvent;
                        if (!evt || evt.name != 'judge') return;
                        if (evt.player == player) return false;
                        if (get.position(event.cards[0], true) != 'd') return false;
                        return (get.suit(event.cards[0]) == 'club');
                    },
                    content: function () {
                        "step 0";
                        var cards = trigger.cards;
                        
                        var dialog = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length, false);
                        //dialog.caption = '【落英】';
                        dialog.caption = game.changeToGoldTitle('落英',false,37);
                        dialog.header1 = '弃牌堆';
                        dialog.header2 = '获得牌';
                        dialog.tip = '请选择要获得的牌';
                        dialog.lockCardsOrder(0);
                        dialog.callback = function () {
                            return true;
                        };
                        game.broadcast(function (player, cards, callback) {
                            if (!window.decadeUI) return;
                            var dialog = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length, false);
                            //dialog.caption = '【落英】';
                            dialog.caption = game.changeToGoldTitle('落英',false,37);
                            dialog.header1 = '弃牌堆';
                            dialog.header2 = '获得牌';
                            dialog.tip = '请选择要获得的牌';
                            dialog.lockCardsOrder(0);
                            dialog.callback = callback;
                        }, player, cards, dialog.callback);
                        
                        event.switchToAuto = function () {
                            var cards = dialog.cards[0].concat();
                            var time = 500;
                            for (var i = 0; i < cards.length; i++) {
                                if (get.value(cards[i], player) < 0) continue;
                                setTimeout(function (card, index, finished) {
                                    dialog.move(card, index, 1);
                                    if (finished) dialog.finishTime(cards.length <= 1 ? 250 : 1000);
                                    ;
                                }, time, cards[i], i, i >= cards.length - 1);
                                time += 500;
                            }
                        };
                        
                        if (event.isOnline()) {
                            event.player.send(function () {
                                if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                            }, event.player);
                            
                            event.player.wait();
                            decadeUI.game.wait();
                        } else if (!event.isMine()) {
                            event.switchToAuto();
                        }
                        "step 1";
                        game.cardsDiscard(event.cards1);
                        if (event.cards2) {
                            // player.logSkill(event.name);
                            player.gain(event.cards2, 'gain2', 'log');
                        }
                    }
                }
            }
        }
    };
    
    decadeUI.inheritSkill = {
        xz_xunxun: {
            audio: 2,
            trigger: {
                player: 'phaseDrawBegin1'
            },
            filter: function (event, player) {
                var num = game.countPlayer(function (current) {
                    return current.isDamaged();
                });
                return num >= 1 && !player.hasSkill('xunxun');
            },
            content: decadeUI.skill.xunxun.content
        },
        reluoying: {
            subSkill: {
                discard: {
                    audio: 'reluoying',
                    trigger: {
                        global: 'loseAfter'
                    },
                    filter: decadeUI.skill.luoying.subSkill.discard.filter,
                    // direct: true,
                    content: decadeUI.skill.luoying.subSkill.discard.content
                },
                judge: {
                    audio: 'reluoying',
                    trigger: {
                        global: 'cardsDiscardAfter'
                    },
                    // direct: true,
                    check: decadeUI.skill.luoying.subSkill.judge.check,
                    filter: decadeUI.skill.luoying.subSkill.judge.filter,
                    content: decadeUI.skill.luoying.subSkill.judge.content
                }
            }
        },
        dddfenye:{
            $compareFenye:function(players,cards1,targets,cards2){
                game.broadcast(function(players,cards1,targets,cards2){
                    lib.skill.dddfenye.$compareFenye(players,cards1,targets,cards2);
                },players,cards1,targets,cards2);
                game.addVideo('compareFenye',[get.targetsInfo(players),get.cardsInfo(cards1),get.targetsInfo(targets),get.cardsInfo(cards2)]);
                for(var i=players.length-1;i>=0;i--){
                    players[i].$throwordered2(cards1[i].copy(false));
                }
                for(var i=targets.length-1;i>=0;i--){
                    targets[i].$throwordered2(cards2[i].copy(false));
                }
            },
        },
        juanjia:{
				audio:2,
				trigger:{
        			player:"enterGame",
        			global:"phaseBefore",
    			},
    			forced:true,
    			filter:function(event,player){
					if(event.name=='phase'&&game.phaseNumber!=0) return false;
					return !player.isDisabled(2)||!player.storage.juanjia;
				},
				content:function(){
					player.disableEquip(2);
					player.storage.juanjia=true;
				},
				group:'juanjia_1',
				subSkill:{
					1:{
						trigger:{
                    		player:"equipBegin",
                		},
                		forced:true,
                		silent:true,
                		filter:function(event,player){
        					return player.storage.juanjia&&get.subtype(event.card)=="equip1"
    					},
                		content:function (){
                    		"step 0"
                    		trigger.untrigger();
                    		trigger.finish();
                    		player.$equip(trigger.card);
							if(player.countCards('e',{subtype:"equip1"})>1){
								//trigger.card.style.left = 'calc(0%)';
    							trigger.card.style.top = 'calc('+-(player.countCards('e',{subtype:"equip1"})-2)*20+'% )';
							}
							else player.storage.juanjia_style=trigger.card.style.top;
                    		game.addVideo('equip',player,get.cardInfo(trigger.card));
                    		game.log(player,'装备了',trigger.card);
                    		"step 1"
                    		var info=get.info(trigger.card);
                    		if(info.onEquip&&(!info.filterEquip||info.filterEquip(trigger.card,player))){
                        		var next=game.createEvent('equip_'+trigger.card.name);
                        		next.setContent(info.onEquip);
                        		next.player=player;
                        		next.trigger.card=trigger.card;
                        		game.delayx();
                    		}
                    		delete player.equiping;
                    		"step 2"
                    		if(player.countCards('e',{subtype:"equip1"})>2) player.chooseButton(['选择一张武器牌弃置', player.getCards('e',{subtype:"equip1"})], 1,true);
                    		"step 3"
                    		if(result.bool){
								player.discard(result.links);
							}
							"step 4"
							for(var i=player.countCards('e',{subtype:"equip1"})-1;i>=0;i--){
								var card=player.getCards('e',{subtype:"equip1"})[i];
								if(i==player.countCards('e',{subtype:"equip1"})-1) card.style.top = player.storage.juanjia_style;
								else card.style.top = 'calc('+(i)*20+'% )';
							}
                    		"step 5"
                    		if(player.countCards('e',{subtype:"equip1"})>2) event.goto(2);
                		},
                        popup:false,
						sub:true,
					},
				},
            },
            qiexie:{
				audio:2,
				trigger:{
        			player:"phaseZhunbeiBegin",
    			},
				init:function(){
					lib.translate['shencai_info']='出牌阶段限一次，你可以令一名其他角色进行判定。你获得此判定牌，然后若此判定牌：包含以下要素中的任意一个，则其失去已有的下列效果，并获得对应的效果：{⒈体力：当其受到伤害后，其失去等量的体力、⒉武器：其不能使用牌响应【杀】、⒊打出：当其失去手牌后，其再随机弃置一张手牌（不嵌套触发）、⒋距离：其的结束阶段开始时，其翻面}；若均不包含，你获得其区域里的一张牌，其获得一枚“死”并获得如下效果：其的角色手牌上限-X、其的回合结束时，若X大于场上存活人数，则其死亡（X为其“死”标记数）。';
				},
    			forced:true,
				content:function(){
					'step 0'
					if(!_status.characterlist){
						if(get.mode()=='guozhan'){
            				_status.characterlist=[];
            				for(var i in lib.characterPack.mode_guozhan) _status.characterlist.push(i);
        				}
        				else if(_status.connectMode) _status.characterlist=get.charactersOL();
						else{
            				_status.characterlist=[];
            				for(var i in lib.character){
                				if(lib.filter.characterDisabled2(i)||lib.filter.characterDisabled(i)) continue;
                				_status.characterlist.push(i);
            				}
        				}
					}
					'step 1'
					//event.list=['re_xusheng','sb_huangzhong','shen_zhangfei','guanning','re_wuyi'];
					event.list=_status.characterlist.randomRemove(5);
					player.chooseButton([0,5],true).set('filterButton',function(button){
						var list=[];
						for(var i of lib.character[button.link][3]){
							var info=get.info(i);
							var translate=lib.translate[i+'_info'];
							if(info&&!info.juexingji&&!info.hiddenSkill&&!info.zhuSkill&&!info.limited&&!info.dutySkill&&!info.zhuanhuanji&&!info.groupSkill&&!info.clanSkill&&translate&&translate.indexOf('【杀】')!=-1) list.add(i);
						}
						if(typeof lib.character[button.link][2]=='number') rangeNum=lib.character[button.link][2];
						else rangeNum=lib.character[button.link][2][2];
						if(lib.config.extensions&&lib.config.extensions.contains('十周年UI')&&lib.config['extension_十周年UI_enable']){
							button.childNodes[2].innerHTML='范围'+rangeNum;
							if(list.length) button.childNodes[0].innerHTML=get.translation(list);
						}
						else{
							button.childNodes[1].innerHTML='范围'+rangeNum;
							button.childNodes[2].innerHTML=get.translation(list);
						}
						return true;
					}).set('ai',function(button){
						if(ui.selected.buttons.length>1) return false;
						var num=0;
						for(var i of lib.character[button.link][3]){
							var info=get.info(i);
							var translate=lib.translate[i+'_info'];
							if(info&&!info.juexingji&&!info.hiddenSkill&&!info.zhuSkill&&!info.limited&&!info.dutySkill&&!info.zhuanhuanji&&!info.groupSkill&&!info.clanSkill&&translate&&translate.indexOf('【杀】')!=-1) num++;
						}
						if(typeof lib.character[button.link][2]=='number') rangeNum=lib.character[button.link][2];
						else rangeNum=lib.character[button.link][2][2];
            			return get.rank(button.link,true)+rangeNum+num;
        			}).set('createDialog',['挈挟','<div class="text center">将任意张武将牌当武器牌置于你的装备区中</div>',[event.list,'character']]);
					'step 2'
					if(result.bool){
						event.list.removeArray(result.links);
						_status.characterlist.addArray(event.list);
						var SerialNumber=function(num){
							if(num==Infinity) return '∞';
							if(isNaN(num)) return '';
							if(typeof num=='number'){
								var str=""+num+"";
								return str.replace("1", "①").replace("2", "②").replace("3", "③").replace("4","④").replace("5", "⑤").replace("6", "⑥").replace("7", "⑦").replace("8", "⑧").replace("9", "⑨");
							}
							else return num;
						};
						for(var i=0;i<result.links.length;i++){
							var skills=[],str='';
							for(var j of lib.character[result.links[i]][3]){
								var info=get.info(j),translate=lib.translate[j+'_info'];
								if(info&&!info.juexingji&&!info.hiddenSkill&&!info.zhuSkill&&!info.limited&&!info.dutySkill&&!info.zhuanhuanji&&!info.groupSkill&&!info.clanSkill&&translate&&translate.indexOf('【杀】')!=-1) skills.add(j);
							}
							for(var j=0;j<skills.length;j++){
								if(j>0) str+=SerialNumber(j+1);
								else if(skills.length>1) str+='①';
								str+='<span class=thundertext>'+lib.translate[skills[j]]+'</span>：'+lib.translate[skills[j]+'_info'];
								if(j<skills.length) str+='<br>';
							}
							if(!str.length) str='无效果。';
							var name='qiexie_'+result.links[i];
							if(typeof lib.character[result.links[i]][2]=='number') rangeNum=lib.character[result.links[i]][2];
							else rangeNum=lib.character[result.links[i]][2][2];
							lib.card[name]={
								fullskin:true,
								enable:true,
								type:'equip',
								subtype:'equip1',
								distance:{attackFrom:-rangeNum+1},
								vanish:true,
								filterTarget:function(card,player,target){
                                	return target==player;
                            	},
                            	selectTarget:-1,
                            	modTarget:true,
                            	toself:true,
                            	content:lib.element.content.equipCard,
								skills:skills,
								//clearLose:true,
								onLose:function(){
									game.log(card,'被销毁了');
									game.cardsGotoSpecial(card);
									card.fix();
									card.remove();
									card.destroyed=true;
									for(var i=player.countCards('e',{subtype:"equip1"})-1;i>=0;i--){
										var he=player.getCards('e',{subtype:"equip1"})[i];
										if(i==player.countCards('e',{subtype:"equip1"})-1) he.style.top = player.storage.juanjia_style;
										else he.style.top = 'calc('+(i)*20+'% )';
									}
								},
								ai:{
									basic:{
										equipValue:(rangeNum+skills.length)*10,
									}
								},
							},
							lib.translate[name]=lib.translate[result.links[i]];
							lib.translate[name+'_info']=str;
							var card=game.createCard(name,'none',NaN);
							card.setBackground(result.links[i],'character');
							player.$gain2(card);
            				game.delayx();
            				player.equip(card);
						}
					}
				},
            },
            cuijue:{
				audio:2,
				enable:'phaseUse',
				filterTarget:function(card,player,target){
					if(target==player||!player.inRange(target)) return false;
					var targets=game.filterPlayer(function(current){
						return player.inRange(current);
					});
					for(var i of targets) if(get.distance(player,i)>get.distance(player,target)) return false;
					return !player.storage.cuijue||!player.storage.cuijue.contains(target);
				},
				filterCard:true,
				content:function (){
        			"step 0"
					if(!player.storage.cuijue) player.storage.cuijue=[];
					player.storage.cuijue.add(target);
        			target.damage('nocard');
    			},
    			check:function(card){
        			return 10-get.value(card);
    			},
				ai:{
        			order:8.5,
        			result:{
            			target:function (player,target){
                			return get.damageEffect(target,player);
            			},
        			},
    			},
				group:'cuijue_init',
				subSkill:{
					init:{
						trigger:{
							global:'phaseAfter',
						},
						filter:function(event,player){
							player.storage.cuijue=[];
						},
						direct:true,
						charlotte:true,
					},
				},
    			position:"he",
            },
        huashen:{
            intro:{
                markcount:function(storage,player){
                    if(storage&&storage.owned) return Object.keys(storage.owned).length;
                    return 0;
                },
                content:function(storage,player){
                    var str='';
                    var slist=storage.owned;
                    var list=[];
                    for(var i in slist){
                        list.push(i);
                    }
                    if(list.length){
                        str+=get.translation(list[0]);
                        for(var i=1;i<list.length;i++){
                            str+='、'+get.translation(list[i]);
                        }
                    }
                    var skill=player.storage.huashen.current2;
                    if(skill){
                        str+='<p>当前技能：'+get.translation(skill);
                    }
                    return str;
                },
                mark:function(dialog,content,player){
                    var slist=content.owned;
                    var list=[];
                    for(var i in slist){
                        list.push(i);
                    }
                    if(list.length){
                        dialog.addSmall([list,'character']);
                    }
                    for(var i=0;i<dialog.buttons.length;i++){	
                        if(!player.isUnderControl(true)){
                            if(!content.shown.contains(dialog.buttons[i].link)){
                                dialog.buttons[i].node.group.remove();
                                dialog.buttons[i].node.hp.remove();
                                dialog.buttons[i].node.intro.remove();
                                dialog.buttons[i].node.name.innerHTML=get.verticalStr('未知');
                                dialog.buttons[i].node.name.dataset.nature='';
                                dialog.buttons[i].style.background='';
                                dialog.buttons[i]._nointro=true;
                                dialog.buttons[i].classList.add('menubg');
                            }
                        }
                        if(dialog.buttons[i].link==player.storage.huashen.current){
                            dialog.buttons[i].classList.add('glow2');
                        }
                    }
                    var skill=player.storage.huashen.current2;
                    if(skill){
                        dialog.add('<div><div class="skill">【'+get.translation(lib.translate[skill+'_ab']||get.translation(skill).slice(0,2))+'】</div>'+
                        '<div>'+get.skillInfoTranslation(skill,player)+'</div></div>');
                    }
                },
            },
        },
		huashen2:{
			content:function(){
				'step 0'
				if(event.triggername=='huashen'){
					player.logSkill('huashen');
					lib.skill.huashen.addHuashens(player,2);
					player.syncStorage('huashen');
					player.markSkill('huashen');
					event.logged=true;
				}
				var cards=[];
				var skills=[];
				for(var i in player.storage.huashen.owned){
					cards.push(i);
					skills.addArray(player.storage.huashen.owned[i]);
				}
				var cond=event.triggername=='phaseBegin'?'in':'out';
				skills.randomSort();
				skills.sort(function(a,b){
					return get.skillRank(b,cond)-get.skillRank(a,cond);
				});
				if(player.isUnderControl()){
					game.swapPlayerAuto(player);
				}
				var switchToAuto=function(){
					_status.imchoosing=false;
					var skill=skills[0],character;
					for(var i in player.storage.huashen.owned){
						if(player.storage.huashen.owned[i].contains(skill)){
						character=i; break;
						}
					}
					event._result={
						bool:true,
						skill:skill,
						character:character
					};
					if(event.dialog) event.dialog.close();
					if(event.control) event.control.close();
				};
				var chooseButton=function(player,list,forced){
					var event=_status.event;
					player=player||event.player;
					if(!event._result) event._result={};
					var prompt=forced?'化身：选择获得一项技能':get.prompt('huashen');
					var dialog=ui.create.dialog(prompt,[list,'character']);
					event.dialog=dialog;
					event.forceMine=true;
					event.button=null;
					for(var i=0;i<event.dialog.buttons.length;i++){
						event.dialog.buttons[i].classList.add('pointerdiv');
						event.dialog.buttons[i].classList.add('selectable');
					}
					event.dialog.open();
					event.custom.replace.button=function(button){
						if(!event.dialog.contains(button.parentNode)) return;
						if(event.control) event.control.style.opacity=1;
						if(button.classList.contains('selectedx')){
						event.button=null;
						button.classList.remove('selectedx');
						if(event.control){
							event.control.replacex(['cancel2']);
						}
						}
						else{
						if(event.button){
							event.button.classList.remove('selectedx');
						}
						button.classList.add('selectedx');
						event.button=button;
						if(event.control&&button.link){
							event.control.replacex(player.storage.huashen.owned[button.link]);
						}
						}
						game.check();
					}
					event.custom.replace.window=function(){
						if(event.button){
						event.button.classList.remove('selectedx');
						event.button=null;
						}
						event.control.replacex(['cancel2']);
					}
					
					event.switchToAuto=function(){
						var cards=[];
						var skills=[];
						for(var i in player.storage.huashen.owned){
						cards.push(i);
						skills.addArray(player.storage.huashen.owned[i]);
						}
						var cond=event.triggername=='phaseBegin'?'in':'out';
						skills.randomSort();
						skills.sort(function(a,b){
						return get.skillRank(b,cond)-get.skillRank(a,cond);
						});
						_status.imchoosing=false;
						var skill=skills[0],character;
						for(var i in player.storage.huashen.owned){
						if(player.storage.huashen.owned[i].contains(skill)){
							character=i; break;
						}
						}
						event._result={
						bool:true,
						skill:skill,
						character:character
						};
						if(event.dialog) event.dialog.close();
						if(event.control) event.control.close();
					}
					var controls=[];
					event.control=ui.create.control();
					event.control.replacex=function(){
						var args=Array.from(arguments)[0];
						if(args.contains('cancel2')&&forced){
						args.remove('cancel2');
						this.style.opacity='';
						}
						args.push(function(link){
						var result=event._result;
						if(link=='cancel2') result.bool=false;
						else{
							if(!event.button) return;
							result.bool=true;
							result.skill=link;
							result.character=event.button.link;
						}
						event.dialog.close();
						event.control.close();
						game.resume();
						_status.imchoosing=false;
						});
						return this.replace.apply(this,args);
					}
					if(!forced){
						controls.push('cancel2');
						event.control.style.opacity=1;
					}
					event.control.replacex(controls);
					game.pause();
					game.countChoose();
				};
				if(event.isMine()){
					chooseButton(player,cards,event.triggername=='huashen');
				}
				else if(event.isOnline()){
					event.player.send(chooseButton,event.player,cards,event.triggername=='huashen');
					event.player.wait();
					game.pause();
				}
				else{
					switchToAuto();
				}
				'step 1'
				var map=event.result||result;
				if(map.bool){
					if(!event.logged) player.logSkill('huashen');
					var skill=map.skill,character=map.character;
					if(character!=player.storage.huashen.current){
						player.storage.huashen.current=character;
						player.storage.huashen.shown.add(character);
						player.markSkill('huashen');
						game.broadcastAll(function(character,player){
						player.sex=lib.character[character][0];
						},character,player);
						game.log(player,'将性别变为了','#y'+get.translation(lib.character[character][0])+'性');
						player.changeGroup(lib.character[character][1]);
					}
					player.storage.huashen.current2=skill;
					if(!player.additionalSkills.huashen||!player.additionalSkills.huashen.contains(skill)){
						player.addAdditionalSkill('huashen',skill);
						player.flashAvatar('huashen',character);
						game.log(player,'获得了技能','#g【'+get.translation(skill)+'】');
						player.popup(skill);
						player.syncStorage('huashen');
						player.updateMarks('huashen');
					}
				}
			}
		},
        nk_shekong: {
            content: function () {
                'step 0';
                event.cardsx = cards.slice(0);
                var num = get.cnNumber(cards.length);
                var trans = get.translation(player);
                var prompt = ('弃置' + num + '张牌，然后' + trans + '摸一张牌');
                if (cards.length > 1) prompt += ('；或弃置一张牌，然后' + trans + '摸' + num + '张牌');
                var next = target.chooseToDiscard(prompt, 'he', true);
                next.numx = cards.length;
                next.selectCard = function () {
                    if (ui.selected.cards.length > 1) return _status.event.numx;
                    return [1, _status.event.numx];
                };
                next.complexCard = true;
                next.ai = function (card) {
                    if (ui.selected.cards.length == 0 || (_status.event.player.countCards('he',
                        function (cardxq) {
                            return get.value(cardxq) < 7;
                        }) >= _status.event.numx)) return 7 - get.value(card);
                    return -1;
                };
                'step 1';
                if (result.bool) {
                    if (result.cards.length == cards.length) player.draw();
                    else player.draw(cards.length);
                    event.cardsx.addArray(result.cards);
                    for (var i = 0; i < event.cardsx.length; i++) {
                        if (get.position(event.cardsx[i]) != 'd') event.cardsx.splice(i--, 1);
                    }
                } else event.finish();
                'step 2';
                if (event.cardsx.length) {
                    var cards = event.cardsx;
                    var dialog = decadeUI.content.chooseGuanXing(player, cards, cards.length);
                    //dialog.caption = '【设控】';
                    dialog.caption = game.changeToGoldTitle('设控',false,37);
                    game.broadcast(function (player, cards, callback) {
                        if (!window.decadeUI) return;
                        var dialog = decadeUI.content.chooseGuanXing(player, cards, cards.length);
                        //dialog.caption = '【设控】';
                        dialog.caption = game.changeToGoldTitle('设控',false,37);
                        dialog.callback = callback;
                    }, player, cards, dialog.callback);
                    
                    event.switchToAuto = function () {
                        var cards = dialog.cards[0].concat();
                        var cheats = [];
                        var judges;
                        
                        var next = player.getNext();
                        var friend = (get.attitude(player, next) < 0) ? null : next;
                        judges = next.node.judges.childNodes;
                        
                        if (judges.length > 0) cheats = decadeUI.get.cheatJudgeCards(cards, judges, friend != null);
                        
                        if (friend) {
                            cards = decadeUI.get.bestValueCards(cards, friend);
                        } else {
                            cards.sort(function (a, b) {
                                return get.value(a, next) - get.value(b, next);
                            });
                        }
                        
                        cards = cheats.concat(cards);
                        var time = 500;
                        for (var i = 0; i < cards.length; i++) {
                            setTimeout(function (card, index, finished) {
                                dialog.move(card, index, 0);
                                if (finished) dialog.finishTime(cards.length <= 1 ? 250 : 1000);
                                ;
                            }, time, cards[i], i, i >= cards.length - 1);
                            time += 500;
                        }
                    };
                    
                    if (event.isOnline()) {
                        event.player.send(function () {
                            if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                        }, event.player);
                        
                        event.player.wait();
                        decadeUI.game.wait();
                    } else if (!event.isMine()) {
                        event.switchToAuto();
                    }
                } else event.finish();
            }
        },
        kamome_huanmeng: {
            content: function () {
                "step 0";
                if (player.isUnderControl()) {
                    game.modeSwapPlayer(player);
                }
                var num = 1 + player.countCards('e');
                ;
                var cards = get.cards(num);
                var guanxing = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
                //guanxing.caption = '【幻梦】';
                guanxing.caption = game.changeToGoldTitle('幻梦',false,37);
                game.broadcast(function (player, cards, callback) {
                    if (!window.decadeUI) return;
                    var guanxing = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
                    //guanxing.caption = '【幻梦】';
                    guanxing.caption = game.changeToGoldTitle('幻梦',false,37);
                    guanxing.callback = callback;
                }, player, cards, guanxing.callback);
                
                event.switchToAuto = function () {
                    var cards = guanxing.cards[0].concat();
                    var cheats = [];
                    var judges = player.node.judges.childNodes;
                    
                    if (judges.length) cheats = decadeUI.get.cheatJudgeCards(cards, judges, true);
                    if (cards.length) {
                        for (var i = 0; i >= 0 && i < cards.length; i++) {
                            if (get.value(cards[i], player) >= 5) {
                                cheats.push(cards[i]);
                                cards.splice(i, 1);
                            }
                        }
                    }
                    
                    var time = 500;
                    for (var i = 0; i < cheats.length; i++) {
                        setTimeout(function (card, index, finished) {
                            guanxing.move(card, index, 0);
                            if (finished) guanxing.finishTime(1000);
                        }, time, cheats[i], i, (i >= cheats.length - 1) && cards.length == 0);
                        time += 500;
                    }
                    
                    for (var i = 0; i < cards.length; i++) {
                        setTimeout(function (card, index, finished) {
                            guanxing.move(card, index, 1);
                            if (finished) guanxing.finishTime(1000);
                        }, time, cards[i], i, (i >= cards.length - 1));
                        time += 500;
                    }
                };
                
                if (event.isOnline()) {
                    event.player.send(function () {
                        if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                    }, event.player);
                    
                    event.player.wait();
                    decadeUI.game.wait();
                } else if (!event.isMine()) {
                    event.switchToAuto();
                }
                "step 1";
                player.popup(get.cnNumber(event.num1) + '上' + get.cnNumber(event.num2) + '下');
                game.log(player, '将' + get.cnNumber(event.num1) + '张牌置于牌堆顶，' + get.cnNumber(event.num2) + '张牌置于牌堆底');
                game.updateRoundNumber();
            }
        },
        nsanruo: {
            unique: true,
            init: function (player) {
                if (!player.node.handcards1.cardMod) {
                    player.node.handcards1.cardMod = {};
                }
                if (!player.node.handcards2.cardMod) {
                    player.node.handcards2.cardMod = {};
                }
                var cardMod = function (card) {
                    if (get.info(card).multitarget) return;
                    if (card.name == 'sha' || get.type(card) == 'trick') return ['暗弱', '杀或普通锦囊牌对你不可见'];
                };
                player.node.handcards1.cardMod.nsanruo = cardMod;
                player.node.handcards2.cardMod.nsanruo = cardMod;
                player.node.handcards1.classList.add('nsanruo');
                player.node.handcards2.classList.add('nsanruo');
                if (!ui.css.nsanruo) {
                    ui.css.nsanruo = lib.init.sheet(
                        '.handcards.nsanruo>.card[data-card-type="trick"]:not(*[data-card-multitarget="1"])>*,' +
                        '.handcards.nsanruo>.card[data-card-name="sha"]>*{visibility:hidden !important;}',
                        '.handcards.nsanruo>.card[data-card-type="trick"]:not(*[data-card-multitarget="1"]),' +
                        '.handcards.nsanruo>.card[data-card-name="sha"]{background-size:0 0 !important;box-shadow:inset 0 0 0 2px white;}'
                    );
                }
            },
            onremove: function (player) {
                player.node.handcards1.classList.remove('nsanruo');
                player.node.handcards2.classList.remove('nsanruo');
                delete player.node.handcards1.cardMod.nsanruo;
                delete player.node.handcards2.cardMod.nsanruo;
            },
            ai: {
                neg: true
            }
        },
        xinfu_pingcai: {
			subSkill: { backup: {} },
			wolong_card: function () {
				'step 0'
				var ingame = game.hasPlayer(function (current) {
					return ['sp_zhugeliang', 're_sp_zhugeliang', 'ol_sp_zhugeliang', 'prp_zhugeliang'].contains(current.name) || ['sp_zhugeliang', 're_sp_zhugeliang', 'ol_sp_zhugeliang', 'prp_zhugeliang'].contains(current.name2);
				}) ? true : false;
				var prompt = '请选择';
				prompt += ingame ? '至多两名' : '一名';
				prompt += '角色，对其造成1点火焰伤害';
				var range = ingame ? [1, 2] : [1, 1]
				player.chooseTarget(prompt, range).set('ai', function (target) {
					var player = _status.event.player;
					return get.damageEffect(target, player, player, 'fire');
				});
				'step 1'
				if (result.bool && result.targets.length) {
					player.line(result.targets, 'fire');
					result.targets.sortBySeat();
					for (var i = 0; i < result.targets.length; i++) {
						result.targets[i].damage('fire');
					}
				}
			},
			fengchu_card: function () {
				'step 0'
				var ingame = game.hasPlayer(function (current) {
					return ['re_pangtong', 'pangtong', 'ol_pangtong'].contains(current.name) || ['re_pangtong', 'pangtong', 'ol_pangtong'].contains(current.name2);
				}) ? true : false;
				var prompt = '请选择';
				prompt += ingame ? '至多四名' : '至多三名';
				prompt += '要横置的角色';
				var range = ingame ? [1, 4] : [1, 3]
				player.chooseTarget(prompt, range).set('ai', function (target) {
					var player = _status.event.player;
					return get.effect(target, { name: 'tiesuo' }, player, player)
				});
				'step 1'
				if (result.bool && result.targets.length) {
					player.line(result.targets, 'green');
					result.targets.sortBySeat();
					for (var i = 0; i < result.targets.length; i++) {
						result.targets[i].link();
					}
				}
			},
			xuanjian_card: function () {
				'step 0'
				event.ingame = game.hasPlayer(function (current) {
					return ['re_xushu', 'xin_xushu', 'xushu', 'dc_xushu'].contains(current.name) || ['re_xushu', 'xin_xushu', 'xushu', 'dc_xushu'].contains(current.name2);
				}) ? true : false;
				var prompt = '请选择一名角色，令其回复一点体力并摸一张牌';
				prompt += event.ingame ? '，然后你摸一张牌。' : '。';
				player.chooseTarget(prompt).set('ai', function (target) {
					var player = _status.event.player;
					return get.attitude(player, target) * (target.isDamaged() ? 2 : 1);
				});
				'step 1'
				if (result.bool && result.targets.length) {
					var target = result.targets[0];
					player.line(target, 'thunder');
					target.draw();
					target.recover();
					if (event.ingame) player.draw();
				}
			},
			shuijing_card: function () {
				'step 0'
				event.ingame = game.hasPlayer(function (current) {
					return current.name == 'simahui' || current.name2 == 'simahui';
				}) ? true : false;
				var prompt = '将一名角色装备区中的';
				prompt += event.ingame ? '一张牌' : '防具牌';
				prompt += '移动到另一名角色的装备区中';
				var next = player.chooseTarget(2, function (card, player, target) {
					if (ui.selected.targets.length) {
						if (!_status.event.ingame) {
							return target.isEmpty(2) ? true : false;
						}
						var from = ui.selected.targets[0];
						if (target.isMin()) return false;
						var es = from.getCards('e');
						for (var i = 0; i < es.length; i++) {
							if (['equip3', 'equip4'].contains(get.subtype(es[i])) && target.getEquip('liulongcanjia')) continue;
							if (es[i].name == 'liulongcanjia' && target.countCards('e', { subtype: ['equip3', 'equip4'] }) > 1) continue;
							if (target.isEmpty(get.subtype(es[i]))) return true;
						}
						return false;
					}
					else {
						if (!event.ingame) {
							if (target.getEquip(2)) return true;
							return false;
						}
						return target.countCards('e') > 0;
					}
				});
				next.set('ingame', event.ingame)
				next.set('ai', function (target) {
					var player = _status.event.player;
					var att = get.attitude(player, target);
					if (ui.selected.targets.length == 0) {
						if (att < 0) {
							if (game.hasPlayer(function (current) {
								if (get.attitude(player, current) > 0) {
									var es = target.getCards('e');
									for (var i = 0; i < es.length; i++) {
										if (['equip3', 'equip4'].contains(get.subtype(es[i])) && current.getEquip('liulongcanjia')) continue;
										else if (es[i].name == 'liulongcanjia' && target.countCards('e', { subtype: ['equip3', 'equip4'] }) > 1) continue;
										else if (current.isEmpty(get.subtype(es[i]))) return true;
									}
									return false;
								}
							})) return -att;
						}
						return 0;
					}
					if (att > 0) {
						var es = ui.selected.targets[0].getCards('e');
						var i;
						for (i = 0; i < es.length; i++) {
							if (['equip3', 'equip4'].contains(get.subtype(es[i])) && target.getEquip('liulongcanjia')) continue;
							if (es[i].name == 'liulongcanjia' && target.countCards('e', { subtype: ['equip3', 'equip4'] }) > 1) continue;
							if (target.isEmpty(get.subtype(es[i]))) break;
						}
						if (i == es.length) return 0;
					}
					return -att * get.attitude(player, ui.selected.targets[0]);
				});
				next.set('multitarget', true);
				next.set('targetprompt', ['被移走', '移动目标']);
				next.set('prompt', prompt);
				'step 1'
				if (result.bool) {
					player.line2(result.targets, 'green');
					event.targets = result.targets;
				}
				else event.finish();
				'step 2'
				game.delay();
				'step 3'
				if (targets.length == 2) {
					if (!event.ingame) {
						event._result = {
							bool: true,
							links: [targets[0].getEquip(2)],
						};
					}
					else {
						player.choosePlayerCard('e', true, function (button) {
							return get.equipValue(button.link);
						}, targets[0]).set('targets0', targets[0]).set('targets1', targets[1]).set('filterButton', function (button) {
							var targets1 = _status.event.targets1;
							if (['equip3', 'equip4'].contains(get.subtype(button.link)) && targets1.getEquip('liulongcanjia')) return false;
							if (button.link.name == 'liulongcanjia' && targets1.countCards('e', { subtype: ['equip3', 'equip4'] }) > 1) return false;
							return !targets1.countCards('e', { subtype: get.subtype(button.link) });

						});
					}
				}
				else event.finish();
				'step 4'
				if (result.bool && result.links.length) {
					var link = result.links[0];
					if (get.position(link) == 'e') event.targets[1].equip(link);
					else if (link.viewAs) event.targets[1].addJudge({ name: link.viewAs }, [link]);
					else event.targets[1].addJudge(link);
					event.targets[0].$give(link, event.targets[1], false)
					game.delay();
				}
			},
			audio: true,
			enable: "phaseUse",
			usable: 1,
			chooseButton: {
				dialog: function () {
					var list = ["wolong", "fengchu", "xuanjian", "shuijing"];
					for (var i = 0; i < list.length; i++) {
						list[i] = ['', '', list[i] + '_card'];
					}
					return ui.create.dialog('评才', [list, 'vcard']);
				},
				check: function (button) {
					var name = button.link[2];
					var player = _status.event.player;
					if (name == 'xuanjian_card') {
						if (game.hasPlayer(function (current) {
							return current.isDamaged() && current.hp < 3 && get.attitude(player, current) > 1;
						})) return 1 + Math.random();
						else return 1;
					}
					else if (name == 'wolong_card') {
						if (game.hasPlayer(function (current) {
							return get.damageEffect(current, player, player, 'fire') > 0;
						})) return 1.2 + Math.random();
						else return 0.5;
					}
					else return 0.6;
				},
				backup: function (links, player) {
					return {
						audio: 'xinfu_pingcai',
						filterCard: () => false,
						selectCard: -1,
						takara: links[0][2],
						content: lib.skill.xinfu_pingcai.contentx,
					}
				},
			},
			contentx: function () {
				"step 0"
				event.pingcai_delayed = true;
				var name = lib.skill.xinfu_pingcai_backup.takara;
				event.cardname = name;
				event.videoId = lib.status.videoId++;
				if (player.isUnderControl()) {
					game.swapPlayerAuto(player);
				}
				var switchToAuto = function () {
					game.pause();
					game.countChoose();
					setTimeout(function () {
						_status.imchoosing = false;
						event._result = {
							bool: true,
						};
						game.resume();
					}, 9000);
				};
				var createDialog = function (player, id, name) {
					if (player == game.me) return;
					var dialog = ui.create.dialog('forcebutton', 'hidden');
					var str = get.translation(player) + '正在擦拭宝物上的灰尘…';
					var canSkip = (!_status.connectMode);
					if (canSkip) str += '<br>（点击宝物可以跳过等待AI操作）';
					dialog.textPrompt = dialog.add('<div class="text center">' + str + '</div>');
					dialog.classList.add('fixed');
					dialog.classList.add('scroll1');
					dialog.classList.add('scroll2');
					dialog.classList.add('fullwidth');
					dialog.classList.add('fullheight');
					dialog.classList.add('noupdate');
					dialog.videoId = id;

					var canvas2 = document.createElement('canvas');
					dialog.canvas_viewer = canvas2;
					dialog.appendChild(canvas2);
					canvas2.classList.add('grayscale');
					canvas2.style.position = "absolute";
					canvas2.style.width = '249px';
					canvas2.style.height = '249px';
					canvas2.style['border-radius'] = '6px';
					canvas2.style.left = "calc(50% - 125px)";
					canvas2.style.top = "calc(50% - 125px)";
					canvas2.width = 249;
					canvas2.height = 249;
					canvas2.style.border = '3px solid';

					var ctx2 = canvas2.getContext('2d');
					var img = new Image();
					img.src = lib.assetURL + 'image/card/' + name + '.png';
					img.onload = function () {
						ctx2.drawImage(this, 0, 0, this.width, this.height, 0, 0, canvas2.width, canvas2.height);
					}
					if (canSkip) {
						var skip = function () {
							if (event.pingcai_delayed) {
								delete event.pingcai_delayed;
								event._result = {
									bool: true,
								};
								game.resume();
								canvas2.removeEventListener(lib.config.touchscreen ? 'touchend' : 'click', skip);
							}
						};
						canvas2.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', skip);
					}
					dialog.open();
				};
				var chooseButton = function (id, name) {
					var event = _status.event;
					_status.xinfu_pingcai_finished = false;

					var dialog = ui.create.dialog('forcebutton', 'hidden');
					dialog.textPrompt = dialog.add('<div class="text center">擦拭掉宝物上的灰尘吧！</div>');
					event.switchToAuto = function () {
						event._result = {
							bool: _status.xinfu_pingcai_finished,
						};
						game.resume();
						_status.imchoosing = false;
						_status.xinfu_pingcai_finished = true;
					};
					dialog.classList.add('fixed');
					dialog.classList.add('scroll1');
					dialog.classList.add('scroll2');
					dialog.classList.add('fullwidth');
					dialog.classList.add('fullheight');
					dialog.classList.add('noupdate');
					dialog.videoId = id;

					var canvas = document.createElement('canvas');
					var canvas2 = document.createElement('canvas');

					dialog.appendChild(canvas2);
					dialog.appendChild(canvas);

					canvas.style.position = "absolute";
					canvas.style.width = '249px';
					canvas.style.height = '249px';
					canvas.style['border-radius'] = '6px';
					canvas.style.left = "calc(50% - 125px)";
					canvas.style.top = "calc(50% - 125px)";
					canvas.width = 249;
					canvas.height = 249;
					canvas.style.border = '3px solid';

					canvas2.style.position = "absolute";
					canvas2.style.width = '249px';
					canvas2.style.height = '249px';
					canvas2.style['border-radius'] = '6px';
					canvas2.style.left = "calc(50% - 125px)";
					canvas2.style.top = "calc(50% - 125px)";
					canvas2.width = 249;
					canvas2.height = 249;
					canvas2.style.border = '3px solid';

					var ctx = canvas.getContext('2d');
					var ctx2 = canvas2.getContext('2d');

					var img = new Image();
					img.src = lib.assetURL + 'image/card/' + name + '.png';
					img.onload = function () {
						ctx2.drawImage(this, 0, 0, this.width, this.height, 0, 0, canvas2.width, canvas2.height);
					}

					ctx.fillStyle = 'lightgray';
					ctx.fillRect(0, 0, canvas.width, canvas.height);

					canvas.onmousedown = function (ev) {
						//if(_status.xinfu_pingcai_finished) return;
						canvas.onmousemove = function (e) {
							if (_status.xinfu_pingcai_finished) return;
							ctx.beginPath();
							ctx.clearRect(e.offsetX / game.documentZoom - 16, e.offsetY / game.documentZoom - 16, 32, 32);
							var data = ctx.getImageData(canvas.width * 0.1, canvas.height * 0.1, canvas.width * 0.8, canvas.height * 0.8).data;
							var sum = 0;
							for (var i = 3; i < data.length; i += 4) {
								if (data[i] == 0) {
									sum++;
								}
							}
							if (sum >= (canvas.width * canvas.height) * 0.6) {
								//ctx.clearRect(0,0,canvas.width,canvas.height);
								if (!_status.xinfu_pingcai_finished) {
									_status.xinfu_pingcai_finished = true;
									event.switchToAuto();
								}
							}
						}
					}
					canvas.ontouchstart = function (ev) {
						//if(_status.xinfu_pingcai_finished) return;
						canvas.ontouchmove = function (e) {
							if (_status.xinfu_pingcai_finished) return;
							ctx.beginPath();
							var rect = canvas.getBoundingClientRect();
							var X = ((e.touches[0].clientX / game.documentZoom - rect.left) / rect.width * canvas.width);
							var Y = ((e.touches[0].clientY / game.documentZoom - rect.top) / rect.height * canvas.height);
							ctx.clearRect(X - 16, Y - 16, 32, 32);
							var data = ctx.getImageData(canvas.width * 0.1, canvas.height * 0.1, canvas.width * 0.8, canvas.height * 0.8).data;
							var sum = 0;
							for (var i = 3; i < data.length; i += 4) {
								if (data[i] == 0) {
									sum++;
								}
							}
							if (sum >= (canvas.width * canvas.height) * 0.6) {
								if (!_status.xinfu_pingcai_finished) {
									_status.xinfu_pingcai_finished = true;
									event.switchToAuto();
								}
							}
						}
					}
					canvas.onmouseup = function (ev) {
						canvas.onmousemove = null;
					}
					canvas.ontouchend = function (ev) {
						canvas.ontouchmove = null;
					}

					dialog.open();

					game.pause();
					game.countChoose();
				};
				//event.switchToAuto=switchToAuto;
				game.broadcastAll(createDialog, player, event.videoId, name);
				if (event.isMine()) {
					chooseButton(event.videoId, name);
				}
				else if (event.isOnline()) {
					event.player.send(chooseButton, event.videoId, name);
					event.player.wait();
					game.pause();
				}
				else {
					switchToAuto();
				}
				"step 1"
				var result = event.result || result;
				if (!result) result = { bool: false };
				event._result = result;
				game.broadcastAll(function (id, result, player) {
					_status.xinfu_pingcai_finished = true;
					var dialog = get.idDialog(id);
					if (dialog) {
						dialog.textPrompt.innerHTML = '<div class="text center">' + (get.translation(player) + '擦拭宝物' + (result.bool ? '成功！' : '失败…')) + '</div>';
						if (result.bool && dialog.canvas_viewer) dialog.canvas_viewer.classList.remove('grayscale');
					}
					if (!_status.connectMode) delete event.pingcai_delayed;
				}, event.videoId, result, player);
				game.delay(2.5);
				"step 2"
				game.broadcastAll('closeDialog', event.videoId);
				if (result.bool) {
					player.logSkill('pcaudio_' + event.cardname);
					event.insert(lib.skill.xinfu_pingcai[event.cardname], {
						player: player,
					});
				}
			},
			ai: {
				order: 7,
				fireAttack: true,
				threaten: 1.7,
				result: {
					player: 1,
				},
			},
		},
        
        xinbenxi: {
            content: function () {
                "step 0";
                event.videoId = lib.status.videoId++;
                var func = function (card, id, bool) {
                    var list = ['为XXX多指定一个目标', '令XXX无视防具', '令XXX不可被抵消', '当XXX造成伤害时摸一张牌'];
                    var choiceList = ui.create.dialog('【奔袭】：请选择一至两项', 'forcebutton');
                    choiceList.videoId = id;
                    for (var i = 0; i < list.length; i++) {
                        list[i] = list[i].replace(/XXX/g, card);
                        var str = '<div class="popup text" style="width:calc(100% - 10px);display:inline-block">';
                        if (i == 0 && !bool) str += '<div style="opacity:0.5">';
                        str += list[i];
                        if (i == 0 && !bool) str += '</div>';
                        str += '</div>';
                        var next = choiceList.add(str);
                        next.firstChild.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.button);
                        next.firstChild.link = i;
                        for (var j in lib.element.button) {
                            next[j] = lib.element.button[j];
                        }
                        choiceList.buttons.add(next.firstChild);
                    }
                    return choiceList;
                };
                if (player.isOnline2()) {
                    player.send(func, get.translation(trigger.card), event.videoId, lib.skill.xinbenxi.filterx(trigger, player));
                }
                event.dialog = func(get.translation(trigger.card), event.videoId, lib.skill.xinbenxi.filterx(trigger, player));
                if (player != game.me || _status.auto) {
                    event.dialog.style.display = 'none';
                }
                var next = player.chooseButton();
                next.set('dialog', event.videoId);
                next.set('forced', true);
                next.set('selectButton', [1, 2]);
                next.set('filterButton',
                    function (button) {
                        if (button.link == 0) {
                            return _status.event.bool1;
                        }
                        ;
                        return true;
                    });
                next.set('bool1', lib.skill.xinbenxi.filterx(trigger, player));
                next.set('ai',
                    function (button) {
                        var player = _status.event.player;
                        var event = _status.event.getTrigger();
                        switch (button.link) {
                            case 0: {
                                if (game.hasPlayer(function (current) {
                                    return lib.filter.targetEnabled2(event.card, player, current) && !event.targets.contains(current) && get.effect(current, event.card, player, player) > 0;
                                })) return 1.6 + Math.random();
                                return 0;
                            }
                            case 1: {
                                if (event.targets.filter(function (current) {
                                    var eff1 = get.effect(current, event.card, player, player);
                                    player._xinbenxi_ai = true;
                                    var eff2 = get.effect(current, event.card, player, player);
                                    delete player._xinbenxi_ai;
                                    return eff1 > eff2;
                                }).length) return 1.9 + Math.random();
                                return Math.random();
                            }
                            case 2: {
                                var num = 1.3;
                                if (event.card.name == 'sha' && event.targets.filter(function (current) {
                                    if (current.mayHaveShan() && get.attitude(player, current) <= 0) {
                                        if (current.hasSkillTag('useShan')) num = 1.9;
                                        return true;
                                    }
                                    return false;
                                }).length) return num + Math.random();
                                return 0.5 + Math.random();
                            }
                            case 3: {
                                return (get.tag(event.card, 'damage') || 0) + Math.random();
                            }
                        }
                    });
                "step 1";
                if (player.isOnline2()) {
                    player.send('closeDialog', event.videoId);
                }
                event.dialog.close();
                var map = [function (trigger, player, event) {
                    player.chooseTarget('请选择' + get.translation(trigger.card) + '的额外目标', true,
                        function (card, player, target) {
                            var player = _status.event.player;
                            if (_status.event.targets.contains(target)) return false;
                            return lib.filter.targetEnabled2(_status.event.card, player, target);
                        }).set('targets', trigger.targets).set('card', trigger.card).set('ai',
                        function (target) {
                            var trigger = _status.event.getTrigger();
                            var player = _status.event.player;
                            return get.effect(target, trigger.card, player, player);
                        });
                },
                    function (trigger, player, event) {
                        player.storage.xinbenxi_unequip.add(trigger.card);
                    },
                    function (trigger, player, event) {
                        player.storage.xinbenxi_directHit.add(trigger.card);
                        trigger.nowuxie = true;
                        trigger.customArgs.default.directHit2 = true;
                    },
                    function (trigger, player, event) {
                        player.storage.xinbenxi_damage.add(trigger.card);
                    }];
                for (var i = 0; i < result.links.length; i++) {
                    game.log(player, '选择了', '#g【奔袭】', '的', '#y选项' + get.cnNumber(result.links[i] + 1, true));
                    map[result.links[i]](trigger, player, event);
                }
                if (!result.links.contains(0)) event.finish();
                "step 2";
                if (result.targets) {
                    player.line(result.targets);
                    trigger.targets.addArray(result.targets);
                }
            }
        },
        
			guhuo_guess:{
				audio:2,
				trigger:{
					player:['useCardBefore','respondBefore'],
				},
				forced:true,
				silent:true,
				popup:false,
				firstDo:true,
				filter:function(event,player){
					return event.skill&&(event.skill.indexOf('guhuo_')==0||event.skill.indexOf('xinfu_guhuo_')==0);
				},
				content:function(){
					'step 0'
					player.addTempSkill('guhuo_phase');
					event.fake=false;
					event.betrayer=null;
					var card=trigger.cards[0];
					if(card.name!=trigger.card.name||(card.name=='sha'&&(trigger.card.nature||card.nature)&&trigger.card.nature!=card.nature)) event.fake=true;
					player.popup(trigger.card.name,'metal');
					player.lose(card,ui.ordering).relatedEvent=trigger;
					trigger.throw=false;
					trigger.skill='xinfu_guhuo_backup';
					event.prompt=get.translation(player)+'声明'+(trigger.targets&&trigger.targets.length?'对'+get.translation(trigger.targets):'')+
						'使用'+(get.translation(trigger.card.nature)||'')+get.translation(trigger.card.name)+'，是否质疑？';
					event.targets=game.filterPlayer(function(current){
						return current!=player&&!current.hasSkill('chanyuan');
					}).sortBySeat(_status.currentPhase);
					if(!event.targets.length) event.goto(4);
					'step 1'
					event.target=event.targets.shift();
					event.target.chooseButton([event.prompt,[['reguhuo_ally','reguhuo_betray'],'vcard']],true).set('ai',function(button){
						var player=_status.event.player;
						var evt=_status.event.getParent('guhuo_guess'),evtx=evt.getTrigger();
						if(!evt) return Math.random();
						var card={name:evtx.card.name,nature:evtx.card.nature,isCard:true};
						var ally=button.link[2]=='reguhuo_ally';
						if(ally&&(player.hp<=1||get.attitude(player,evt.player)>=0)) return 1.1;
						if(!ally&&get.attitude(player,evt.player)<0&&evtx.name=='useCard'){
							var eff=0;
							var targetsx=evtx.targets||[];
							for(var target of targetsx){
								var isMe=target==evt.player;
								eff+=get.effect(target,card,evt.player,player)/(isMe?1.5:1);
							}
							eff/=(1.5*targetsx.length)||1;
							if(eff>0) return 0;
							if(eff<-7) return Math.random()+Math.pow(-(eff+7)/8,2);
							return Math.pow((get.value(card,evt.player,'raw')-4)/(eff==0?5:10),2);
						}
						return Math.random();
					});
					'step 2'
					if(result.links[0][2]=='reguhuo_betray'){
						target.addExpose(0.2);
						game.log(target,'#y质疑');
						target.popup('质疑！','fire');
						event.betrayer=target;
					}
					else{
						game.log(target,'#g不质疑');
						target.popup('不质疑','wood');
					}
					'step 3'
					game.delay();
					if(!event.betrayer&&targets.length) event.goto(1);
					'step 4'
					player.showCards(trigger.cards);
					if(!event.betrayer) event.finish();
					'step 5'
					if(event.fake){
						event.betrayer.popup('质疑正确','wood');
						game.log(player,'声明的',trigger.card,'作废了');
						trigger.cancel();
						trigger.getParent().goto(0);
						trigger.line=false;
					}
					else{
						event.betrayer.popup('质疑错误','fire');
						event.betrayer.addSkillLog('chanyuan');
					}
					'step 6'
					game.delayx();
				},
			},
        
			old_guhuo_guess:{
				audio:'old_guhuo',
				trigger:{
					player:['useCardBefore','respondBefore'],
				},
				forced:true,
				silent:true,
				popup:false,
				firstDo:true,
				filter:function(event,player){
					return event.skill&&event.skill.indexOf('old_guhuo_')==0;
				},
				content:function(){
					'step 0'
					event.fake=false;
					event.goon=true;
					event.betrayers=[];
					var card=trigger.cards[0];
					if(card.name!=trigger.card.name||(card.name=='sha'&&(trigger.card.nature||card.nature)&&trigger.card.nature!=card.nature)) event.fake=true;
					if(event.fake){
						player.addSkill('old_guhuo_cheated');
						player.markAuto('old_guhuo_cheated',[trigger.card.name+trigger.card.nature]);
					}
					player.popup(trigger.card.name,'metal');
					player.lose(card,ui.ordering).relatedEvent=trigger;
					trigger.throw=false;
					trigger.skill='old_guhuo_backup';
					game.log(player,'声明',trigger.targets&&trigger.targets.length?'对':'',trigger.targets,'使用',trigger.card);
					event.prompt=get.translation(player)+'声明'+(trigger.targets&&trigger.targets.length?'对'+get.translation(trigger.targets):'')+
						'使用'+(get.translation(trigger.card.nature)||'')+get.translation(trigger.card.name)+'，是否质疑？';
					event.targets=game.filterPlayer(i=>i!=player&&i.hp>0).sortBySeat(_status.currentPhase);
					if(!event.targets.length) event.goto(4);
					'step 1'
					event.target=event.targets.shift();
					event.target.chooseButton([event.prompt,[['reguhuo_ally','reguhuo_betray'],'vcard']],true).set('ai',function(button){
						var player=_status.event.player;
						var evt=_status.event.getParent('old_guhuo_guess'),evtx=evt.getTrigger();
						if(!evt) return Math.random();
						var card={name:evtx.card.name,nature:evtx.card.nature,isCard:true};
						var ally=button.link[2]=='reguhuo_ally';
						if(ally&&(player.hp<=1||get.attitude(player,evt.player)>=0)) return 1.1;
						if(!ally&&get.effect(player,{name:'losehp'},player,player)>=0) return 10;
						if(!ally&&get.attitude(player,evt.player)<0){
							if(evtx.name=='useCard'){
								var eff=0;
								var targetsx=evtx.targets||[];
								for(var target of targetsx){
									var isMe=target==evt.player;
									eff+=get.effect(target,card,evt.player,player)/(isMe?1.35:1);
								}
								eff/=(1.5*targetsx.length)||1;
								if(eff>0) return 0;
								if(eff<-7) return (Math.random()+Math.pow(-(eff+7)/8,2))/Math.sqrt(evt.betrayers.length+1)+(player.hp-3)*0.05+Math.max(0,4-evt.player.hp)*0.05-(player.hp==1&&!get.tag(card,'damage')?0.2:0);
								return Math.pow((get.value(card,evt.player,'raw')-4)/(eff==0?3.1:10),2)/Math.sqrt(evt.betrayers.length||1)+(player.hp-3)*0.05+Math.max(0,4-evt.player.hp)*0.05;
							}
							if(evt.player.getStorage('old_guhuo_cheated').contains(card.name+card.nature)) return Math.random()+0.3;
						}
						return Math.random();
					});
					'step 2'
					if(result.links[0][2]=='reguhuo_betray'){
						target.addExpose(0.2);
						game.log(target,'#y质疑');
						target.popup('质疑！','fire');
						event.betrayers.push(target);
					}
					else{
						game.log(target,'#g不质疑');
						target.popup('不质疑','wood');
					}
					if(targets.length) event.goto(1);
					'step 3'
					game.delayx();
					game.broadcastAll(function(onEnd){
						_status.event.onEnd01=onEnd;
						if(_status.old_guhuoNode) _status.old_guhuoNode.listenTransition(onEnd,300);
					},event.onEnd01);
					'step 4'
					game.delay(2);
					'step 5'
					if(!event.betrayers.length){
						event.goto(7);
					}
					'step 6'
					if(event.fake){
						for(var target of event.betrayers){
							target.popup('质疑正确','wood');
						}
						event.goon=false;
					}
					else{
						for(var target of event.betrayers){
							target.popup('质疑错误','fire');
							target.loseHp();
						}
						if(get.suit(trigger.cards[0],player)!='heart'){
							event.goon=false;
						}
					}
					'step 7'
					if(!event.goon){
						game.log(player,'声明的',trigger.card,'作废了');
						trigger.cancel();
						trigger.getParent().goto(0);
						trigger.line=false;
					}
					'step 8'
					game.delay();
					'step 9'
					if(!event.goon){
						if(event.fake) game.asyncDraw(event.betrayers);
						game.broadcastAll(ui.clear);
					}
				},
			},
    };
    
    if (!_status.connectMode) {
        for (var key in decadeUI.animateSkill) {
            lib.skill[key] = decadeUI.animateSkill[key];
            game.addGlobalSkill(key);
        }
        for (var key in decadeUI.skill) {
            if (lib.skill[key]) lib.skill[key] = decadeUI.skill[key];
        }
        for (var key in decadeUI.inheritSkill) {
            if (lib.skill[key]) {
                for (var j in decadeUI.inheritSkill[key]) {
                    lib.skill[key][j] = decadeUI.inheritSkill[key][j];
                }
            }
        }
    }
    
});

