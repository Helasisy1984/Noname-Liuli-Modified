game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"笨蛋插件",content:function(config,pack){
    lib.arenaReady.push(()=>{
		var url = lib.assetURL + 'extension/笨蛋插件';
		lib.init.css(url, 'extension');//调用CSS
		
		if(config.Fool_throwEmotion){//表情函数优化 已经pr进了本体 固注释
			lib.element.player.$throwEmotion=function(target,name){
				if(this==target) return;
				let anitype='ease';
				//缓冲一下，防止跟不上处理
				const delayTime=20;
				if(!this.throwing_forbid) {
    				if(window.throwing) return;
    				window.throwing=true;
    				setTimeout(function(){
    				    window.throwing=false;
    				},20);
				}
				game.addVideo('throwEmotion',this,[target.dataset.position,name]);
				let getLeft=function(player){
					//if(player==game.me&&!ui.fakeme&&!ui.chess) return player.getLeft()+player.node.avatar.offsetWidth/2;
					if(player==game.me&&player!=target&&!ui.fakeme&&!ui.chess) return ui.window.getBoundingClientRect().width/2;
					return player.getLeft()+player.offsetWidth/2;
				}
				let getTop=function(player){
					//if(player==game.me&&!ui.fakeme&&!ui.chess) return player.getLeft()+player.node.avatar.offsetWidth/2;
					if(player==game.me&&player!=target&&!ui.fakeme&&!ui.chess) return ui.window.getBoundingClientRect().height*0.7;
					return player.getTop()+player.offsetHeight/3;
				}
				let player=this;
				let emotion=ui.create.div('','<div style="text-align:center"> <img src="'+lib.assetURL+'image/emotion/throw_emotion/'+name+'1.png"> </div>',game.chess?ui.chess:ui.window);
				emotion.style.width='60px';
				emotion.style.height='60px';
				emotion.style.pointerEvents='none';
				emotion.style.willChange='opacity, transform, transition, filter'; /* 提示浏览器优化 */
                emotion.style.backfaceVisibility='hidden'; /* 避免闪动 */
				let width=emotion.offsetWidth/2;
				let height=emotion.offsetHeight/2;
				if(game.chess) width+=60;
				let left=getLeft(player)-width;
				let top=getTop(player)-height;
				let getAnglez=function(x1, y1, x2, y2) {
                  const dx = x2 - x1;
                  const dy = y2 - y1;
                  const radians = Math.atan2(dy, dx);
                  let degrees = radians * (180 / Math.PI);
                  degrees = (degrees + 360) % 360; // 转换为 0-360 度
                  return degrees;
                }
                let rotate=getAnglez(getLeft(player),getTop(player),getLeft(target),getTop(target))+90;
                if(['flower'].contains(name)) {
                    emotion.firstElementChild.style.transform = 'rotate('+rotate+'deg) scale(0.8)';
                    emotion.firstElementChild.style.transition = 'none'; // 禁用过渡
                }
                //if(name=='egg') emotion.firstElementChild.style.transform='scale(0.9)';
                emotion.style.left=left+'px';
				emotion.style.top=top+'px';
				emotion.style['z-index']=10;
				let moveTime = 0.7;
				//改成linear效果更好
				if(this.throwing_forbid) {
				    if(name=='flower') anitype='linear';
				    if(name=='wine') moveTime = 0.9;
				}
				let drops=['egg','shoe'];
				let left2=getLeft(target)-width;
				let top2=getTop(target)-height;
				if(['egg','flower','shoe','jiaozi','snow'].contains(name)){
					/*let num1=0.95+Math.random()*(1.1-0.95);
					let num2=1+Math.random()*(3-1);
					let left2=getLeft(target)/num1-width;
					let top2=target.getTop()+target.offsetHeight/num2-height;*/
					let leftHH=(Math.random()-0.5)*100;
					let topHH=(Math.random()-0.3)*120;
					left2=leftHH+getLeft(target)-width;
					top2=topHH+getTop(target)-height;
				}
				if(name=='shoe') {
				    let parentNode=emotion.parentNode;
				    let liuer=emotion.cloneNode(true);
				    parentNode.appendChild(liuer);
				    let sunwukong=emotion;
				    emotion=liuer;
				    emotion.brother=sunwukong;
    				emotion.brother.style.opacity=0;
    				emotion.brother.style.filter='brightness(0)';
    				emotion.brother.style.transition='none';
    				emotion.brother.style.transform='translateY('+(top2-top)+'px) translateX('+(left2-left)+'px)';
				}
				emotion.style.transition = 'all '+moveTime+'s '+anitype;
				setTimeout(function(){
				    emotion.style.transform='translateY('+(top2-top)+'px) translateX('+(left2-left)+'px)';
				
    				if(['egg','shoe','jiaozi','snow'].contains(name)) {
    				    let rot='rotate('+3*360+'deg)';
    				    if(name=='egg') rot+=' scale(0.85)';
    				    emotion.firstElementChild.style.transition='all '+moveTime*0.9+'s '+anitype;
    				    emotion.firstElementChild.style.transform=rot;//'rotate(1440deg)';
    				}
				},delayTime);
				//if(['flower'].contains(name)) emotion.firstElementChild.style.transform='rotate(0deg)';
				if(lib.config.background_audio) game.playAudio('effect','throw_'+name+get.rand(1,2));
				let emotion2=ui.create.div('','<div style="text-align:center"> <img src="'+lib.assetURL+'image/emotion/throw_emotion/'+name+'2.png"> </div>',emotion);
				emotion2.style.opacity=0;
				emotion2.style.pointerEvents='none';
				if(name=='wine') {
				    emotion.brother=ui.create.div('','<div style="text-align:center"> <img src="'+lib.assetURL+'image/emotion/throw_emotion/'+name+'1.png"> </div>',emotion);
    				emotion.brother.style.opacity=0;
    				emotion.brother.style.pointerEvents='none';
    				emotion.brother.style.transform='translateX( 30px) scaleX( -1)';
				}
				setTimeout(function(){
					emotion2.style.opacity=1;
					if(drops.contains(name)) {
					    let ranss=[0.7,0.8,0.9,1,1.1,1.2,1.3,1.4,1.5].randomGet();
					    if(name=='shoe') {
				            ranss+=0.3;
				            if(emotion.brother) emotion.brother.style.opacity=0.8;
				        }
					    setTimeout(function(){
					        emotion.style.transition='all '+ranss+'s ease-in';
					        emotion.style.transform='translateY('+(top2-top+40)+'px) translateX('+(left2-left)+'px)';
					        emotion.style.opacity=0;
					        if(name=='egg') {
					            emotion2.style.transition=emotion.style.transition;
					            emotion2.style.transform='scaleY(1.15)';
					        }
					        if(name=='shoe'&&emotion.brother) {
					            emotion.brother.style.transition='all '+(ranss+0.2)+'s linear';
					            emotion.brother.style.opacity=0;
					        }
					        setTimeout(function(){
						        if(emotion.brother) emotion.brother.delete();
						        emotion.delete();
					        },ranss*1000+200);//1200
					    },100);
					}else if(name=='snow'){
					    emotion.style.transition='all 0.1s linear';
					    emotion.style.filter='blur(5px)';
					    setTimeout(function(){
						    emotion.innerHTML=('<div style="text-align:center"> <img src="'+lib.assetURL+'image/emotion/throw_emotion/'+name+'2.png"> </div>');
						    emotion.style.filter='blur(3px)';
						    setTimeout(function(){
						        emotion.style.filter='blur(0px)';
						        emotion.style.transition='all 0.3s linear';
						        setTimeout(function(){
						            emotion.delete();
						        },400);//1200
						    },0);//1200
					    },100);//1200
					}else {
					    let deleteTime = 0.4;
					    emotion.style.transition='all '+deleteTime+'s '+anitype;
					    if(name=='wine'&&emotion.brother) {
				            deleteTime+=0.3;
				            emotion.style.transform='translateY('+(top2-top)+'px) translateX('+(left2-left+50)+'px)';
				            emotion.brother.style.transition='all '+deleteTime+'s ease';
				            emotion.brother.style.transform='translateX( 10px) scaleX( -1)';
				            emotion.brother.style.opacity=1;
				        }
					    setTimeout(function(){
						    emotion.delete();
					    },deleteTime*1000+200);//1200
					}
				},moveTime*1000+delayTime/*400*/);
				if(['flower'].contains(name)) {
                    setTimeout(()=>{
                        emotion.firstElementChild.style.transition = 'all '+moveTime*0.6+'s '+anitype; // 禁用过渡
                        emotion.firstElementChild.style.transform = 'rotate(360deg) scale(1)';
                    },moveTime*400+delayTime/*400*/);
                }
                if(['egg'].contains(name)) {
                    setTimeout(()=>{
                        emotion.firstElementChild.style.transition = 'all '+moveTime*0.3+'s '+anitype; // 禁用过渡
                        //emotion.firstElementChild.style.transform='scale(1)';
                        emotion2.style.transition='all 0.3s '+anitype;
                        emotion2.style.opacity=1;
                    },moveTime*700+delayTime/*400*/);
                }
				/*setTimeout(function(){
					emotion.style.opacity=0;
					setTimeout(function(){
					    emotion.innerHTML=('<div style="text-align:center"> <img src="'+lib.assetURL+'image/emotion/throw_emotion/'+name+'2.png"> </div>');
					    emotion.style.opacity=1;
					    setTimeout(function(){
						    emotion.delete();
					    },600);//1200
					},200);
				},600);*/
			}
		}
		/*存一份在这方便回档
		lib.element.player.$throwEmotion=function(target,name){
				if(this==target) return;
				let anitype='ease';
				if(!this.throwing_forbid) {
    				if(window.throwing) return;
    				window.throwing=true;
    				setTimeout(function(){
    				    window.throwing=false;
    				},20);
				}
				game.addVideo('throwEmotion',this,[target.dataset.position,name]);
				var getLeft=function(player){
					if(player==game.me&&player!=target&&!ui.fakeme&&!ui.chess) return ui.window.getBoundingClientRect().width/2;
					return player.getLeft()+player.offsetWidth/2;
				}
				var getTop=function(player){
					if(player==game.me&&player!=target&&!ui.fakeme&&!ui.chess) return ui.window.getBoundingClientRect().height*0.7;
					return player.getTop()+player.offsetHeight/3;
				}
				var player=this;
				var emotion=ui.create.div('','<div style="text-align:center"> <img src="'+lib.assetURL+'image/emotion/throw_emotion/'+name+'1.png"> </div>',game.chess?ui.chess:ui.window);
				emotion.style.width='60px';
				emotion.style.height='60px';
				emotion.style.pointerEvents='none';
				var width=emotion.offsetWidth/2;
				var height=emotion.offsetHeight/2;
				if(game.chess) width+=60;
				var left=getLeft(player)-width;
				var top=getTop(player)-height;
				var getAnglez=function(x1, y1, x2, y2) {
                  const dx = x2 - x1;
                  const dy = y2 - y1;
                  const radians = Math.atan2(dy, dx);
                  let degrees = radians * (180 / Math.PI);
                  degrees = (degrees + 360) % 360;
                  return degrees;
                }
                var rotate=getAnglez(getLeft(player),getTop(player),getLeft(target),getTop(target))+90;
                if(['flower'].contains(name)) {
                    emotion.firstElementChild.style.transform = 'rotate('+rotate+'deg) scale(0.8)';
                    emotion.firstElementChild.style.transition = 'none';
                }
                emotion.style.left=left+'px';
				emotion.style.top=top+'px';
				var moveTime = this.throwing_forbid?0.8:0.6;
				emotion.style.transition = 'all '+moveTime+'s '+anitype;
				var drops=['egg','shoe'];
				if(['egg','flower','shoe','jiaozi','snow'].contains(name)){
					var leftHH=(Math.random()-0.5)*100;
					var topHH=(Math.random()-0.3)*120;
					var left2=leftHH+getLeft(target)-width;
					var top2=topHH+getTop(target)-height;
				}
				else{
					var left2=getLeft(target)-width;
					var top2=getTop(target)-height;
				}
				emotion.style['z-index']=10;
				emotion.style.transform='translateY('+(top2-top)+'px) translateX('+(left2-left)+'px)';
				if(['egg','shoe','jiaozi','snow'].contains(name)) {
				    var rot='rotate('+3*360+'deg)';
				    if(name=='egg') rot+=' scale(0.85)';
				    emotion.firstElementChild.style.transition='all '+moveTime*0.9+'s '+anitype;
				    emotion.firstElementChild.style.transform=rot;
				}
				if(lib.config.background_audio) game.playAudio('effect','throw_'+name+get.rand(1,2));
				var emotion2=ui.create.div('','<div style="text-align:center"> <img src="'+lib.assetURL+'image/emotion/throw_emotion/'+name+'2.png"> </div>',emotion);
				emotion2.style.opacity=0;
				emotion2.style.pointerEvents='none';
				if(name=='wine') {
				    emotion.brother=ui.create.div('','<div style="text-align:center"> <img src="'+lib.assetURL+'image/emotion/throw_emotion/'+name+'1.png"> </div>',emotion);
    				emotion.brother.style.opacity=0;
    				emotion.brother.style.pointerEvents='none';
    				emotion.brother.style.transform='translateX( 30px) scaleX( -1)';
				}
				setTimeout(function(){
					emotion2.style.opacity=1;
					if(drops.contains(name)) {
					    var ranss=[0.7,0.8,0.9,1,1.1,1.2,1.3,1.4,1.5].randomGet();
					    if(name=='shoe') ranss+=0.3;
					    setTimeout(function(){
					        emotion.style.transition='all '+ranss+'s ease-in';
					        emotion.style.transform='translateY('+(top2-top+40)+'px) translateX('+(left2-left)+'px)';
					        emotion.style.opacity=0;
					        if(name=='egg') {
					            emotion2.style.transition=emotion.style.transition;
					            emotion2.style.transform='scaleY(1.15)';
					        }
					        setTimeout(function(){
						        emotion.delete();
					        },ranss*1000+200);
					    },100);
					}else if(name=='snow'){
					    emotion.style.transition='all 0.1s '+anitype;
					    emotion.style.filter='blur(5px)';
					    setTimeout(function(){
						    emotion.innerHTML=('<div style="text-align:center"> <img src="'+lib.assetURL+'image/emotion/throw_emotion/'+name+'2.png"> </div>');
						    emotion.style.filter='blur(3px)';
						    setTimeout(function(){
						        emotion.style.filter='blur(0px)';
						        emotion.style.transition='all 0.3s '+anitype;
						        setTimeout(function(){
						            emotion.delete();
						        },400);
						    },0);
					    },100);
					}else {
					    var deleteTime = 0.4;
					    emotion.style.transition='all '+deleteTime+'s '+anitype;
					    if(name=='wine') {
				            deleteTime+=0.3;
				            emotion.style.transform='translateY('+(top2-top)+'px) translateX('+(left2-left+50)+'px)';
				            emotion.brother.style.transition='all '+ranss+'s ease';
				            emotion.brother.style.transform='translateX( 10px) scaleX( -1)';
				            emotion.brother.style.opacity=1;
				        }
					    setTimeout(function(){
						    emotion.delete();
					    },deleteTime*1000+200);
					}
				},moveTime*1000);
				if(['flower'].contains(name)) {
                    setTimeout(()=>{
                        emotion.firstElementChild.style.transition = 'all '+moveTime*0.6+'s '+anitype;
                        emotion.firstElementChild.style.transform = 'rotate(360deg) scale(1)';
                    },moveTime*400);
                }
                if(['egg'].contains(name)) {
                    setTimeout(()=>{
                        emotion.firstElementChild.style.transition = 'all '+moveTime*0.3+'s '+anitype;
                        emotion2.style.transition='all 0.3s '+anitype;
                        emotion2.style.opacity=1;
                    },moveTime*700/);
                }
			}*/
		
		if(config.Fool_skill){
		//资援优化
	    	lib.skill['ziyuan'].filterCard=function(card){
		    	var dialog=ui.dialog;
		    	var num=0;
            	for(var i=0;i<ui.selected.cards.length;i++){
                	num+=get.number(ui.selected.cards[i]);
            	}
		    	if(ui.selected.cards.length){
			    	if(num==13) str='资援<div class="text center">当前点数和：<span class=greentext>'+get.translation(num)+'</span>';
			    	else str='资援<div class="text center">当前点数和：<span class=firetext>'+get.translation(num)+'</span>';
		    	}
		    	else str='资援';
		    	/*仅dialog的判断有时会报错*/if(dialog&&dialog.content&&dialog.content.firstChild) dialog.content.firstChild.innerHTML=str;
            	return get.number(card)+num<=13;
	    	}
	    	//敏思优化
	    	lib.skill['minsi'].filterCard=function(card){
		    	var dialog=ui.dialog;
            	var num=0;
            	for(var i=0;i<ui.selected.cards.length;i++){
                	num+=get.number(ui.selected.cards[i]);
            	}
		    	if(ui.selected.cards.length){
			    	if(num==13) str='敏思<div class="text center">当前点数和：<span class=greentext>'+get.translation(num)+'</span>';
			    	else str='敏思<div class="text center">当前点数和：<span class=firetext>'+get.translation(num)+'</span>';
		    	}
		    	else str='敏思';
		    	/*仅dialog的判断有时会报错*/if(dialog&&dialog.content&&dialog.content.firstChild) dialog.content.firstChild.innerHTML=str;
            	return get.number(card)+num<=13;
        	}
	    	//方统优化
	    	lib.skill['xinfu_fangtong'].content=function(){
            	'step 0'
            	var list=[];
		    	for(var i of player.getExpansions('xinfu_jijun')){
			    	list.push(i);
		    	}
            	if(player.countCards('h')){
			    	for(var i of player.getCards('h')){
				    	list.push(i);
			    	}
            	}
            	if(player.countCards('e')){
                	for(var i of player.getCards('e')){
				    	list.push(i);
			    	}
            	}
		    	event.videoId=lib.status.videoId++;
		    	game.broadcastAll(function(cards,id,player){ 
                	var dialog=ui.create.dialog('方统<br>请弃置点数之和为36的牌',list);
			    	dialog.classList.add('fullheight');
                	dialog.videoId=id;
			    	for(var i=0;i<cards.length;i++){
				    	//if(lib.skill.xinfu_fangtong.getAuto(player).contains(cards[i])) dialog.buttons[i].classList.add('glow');
				    	if(player.getExpansions('xinfu_jijun').contains(cards[i])) dialog.buttons[i].querySelector('.info').innerHTML='方'+get.translation(get.suit(cards[i]))+get.number(cards[i]);
				    	if(player.getCards('h').contains(cards[i])) dialog.buttons[i].querySelector('.info').innerHTML='手牌'+get.translation(get.suit(cards[i]))+get.number(cards[i]);
				    	if(player.getCards('e').contains(cards[i])) dialog.buttons[i].querySelector('.info').innerHTML='装备'+get.translation(get.suit(cards[i]))+get.number(cards[i]);
			    	}
		    	},list,event.videoId,player);
		    	var dialog=get.idDialog(event.videoId);
            	var next=player.chooseButton(dialog);
            	next.set('selectButton',function (){
                	var num=0;
                	for(var i=0;i<ui.selected.buttons.length;i++){
                    	num+=get.number(ui.selected.buttons[i]);
                	}
			    	var dialog=get.idDialog(event.videoId);
			    	/*仅dialog的判断有时会报错*/if(dialog&&dialog.content&&dialog.content.firstChild){
				    	if(ui.selected.buttons.length){
					    	if(num!=36) dialog.content.firstChild.innerHTML='是否发动【方统】？<br><div class="text center">结束阶段，你可以弃置总点数之和为36的一张牌与任意张「方」，并对一名其他角色造成3点雷电伤害</div><div class="popup center">当前点数之和：<span class=firetext>'+get.translation(num)+'</span>';
					    	else dialog.content.firstChild.innerHTML='是否发动【方统】？<br><div class="text center">结束阶段，你可以弃置总点数之和为36的一张牌与任意张「方」，并对一名其他角色造成3点雷电伤害</div><div class="popup center">当前点数之和：<span class=greentext>'+get.translation(num)+'</span>';
				    	}
				    	else{
					    	dialog.content.firstChild.innerHTML='是否发动【方统】？<br><div class="text center">结束阶段，你可以弃置总点数之和为36的一张牌与任意张「方」，并对一名其他角色造成3点雷电伤害</div>';
				    	}
			    	}
                	if(num==36) return ui.selected.buttons.length;
                	return ui.selected.buttons.length+2;
            	});
		    	next.set('filterButton',function(button){
			    	var dialog=get.idDialog(event.videoId);
                	var player=_status.event.player,cards=player.getExpansions('xinfu_jijun');
			    	if(!ui.selected.buttons.length){
				    	for(var i=0;i<_status.event.buttonlist.length;i++){
					    	if(_status.event.autolist.contains(_status.event.buttonlist[i])) dialog.buttons[i].classList.add('glow');
				    	}
			    	}
			    	else{
				    	for(var i=0;i<_status.event.buttonlist.length;i++){
					    	if(_status.event.autolist.contains(_status.event.buttonlist[i])&&!ui.selected.buttons.contains(_status.event.buttonlist[i])) dialog.buttons[i].classList.remove('glow');
				    	}
			    	}
                	if(ui.selected.buttons.length){
                    	if(!cards.contains(button.link)) return false;
                	}
                	else if(cards.contains(button.link)) return false;
                	var num=0;
                	for(var i=0;i<ui.selected.buttons.length;i++){
                    	num+=get.number(ui.selected.buttons[i]);
                	}
                	return get.number(button.link)+num<=36;
            	});
		    	next.set('buttonlist',list);
            	next.set('autolist',lib.skill.xinfu_fangtong.getAuto(player));
            	next.set('processAI',function(){
                	if(_status.event.autolist&&_status.event.autolist.length>0){
                    	return {
                        	bool:true,
                        	links:_status.event.autolist,
                    	}
                	}
            	});
            	next.set('complexSelect',true);
            	'step 1'
            	if(result.bool){
                	player.logSkill('xinfu_fangtong');
                	var tothrow=[];
                	var cards=result.links.slice(0);
                	for(var i=0;i<cards.length;i++){
                    	if(get.position(cards[i])=='x'){
                        	tothrow.push(cards[i]);
                    	}
                    	else{
                        	player.discard(cards[i]).delay=false;
                    	}
                	}
                	player.loseToDiscardpile(tothrow);
                	player.chooseTarget('选择一个目标并对其造成3点雷电伤害',true,function(card,player,target){
                    	return target!=player;
                	}).set('ai',function(target){
                    	return get.damageEffect(target,_status.event.player,_status.event.player,'thunder');
                	});
            	}
            	else{
                	event.finish();
            	}
            	'step 2'
            	var target=result.targets[0];
            	player.line(target,'thunder');
            	target.damage(3,'thunder');
        	}
		}
		
		if(config.Fool_liegong!='close'){
			var Fool_ShafilterTarget=lib.card['sha'].filterTarget;
			lib.card['sha'].filterTarget=function(card,player,target){
				//添加新条件，出现提示的角色必须是玩家，可以考虑是否再加_status.auto的判定
				if(game.me==player&&_status.event.name=='chooseToUse'){
					for(var i of game.filterPlayer()){
						let str='';
						if(i==player) continue;
						var Fool_liegong=false,Fool_qiangming=false,Fool_shanghai=false;
						if(player.hasSkill('DIY_liegong')||player.hasSkill('liegong')||player.hasSkill('xinliegong')){//烈弓
							var num=ui.selected.cards.length||0;
							if(i!=player){
								if(((i.countCards('h')<=player.countCards('h')-num&&player.hasSkill('DIY_liegong'))||
								((i.countCards('h')>=player.hp||i.countCards('h')<=player.getAttackRange())&&player.hasSkill('liegong'))||
								((i.countCards('h')<=player.countCards('h')-num||i.hp>=player.hp)&&player.hasSkill('xinliegong')))&&lib.filter.targetInRange(card,player,i)){
									Fool_liegong=true;
									if(player.hasSkill('xinliegong')){
										if(i.countCards('h')<=player.countCards('h')-num) Fool_qiangming=true;
										if(i.hp>=player.hp) Fool_shanghai=true;
									}
								}
							}
						}
						if(player.hasSkill('spshidi')&&get.color(card,false)=='black'&&player.countMark('spshidi')%2==0){//势敌
							if(lib.filter.targetInRange(card,player,i)&&Fool_ShafilterTarget(card,player,i)) Fool_qiangming=true;
						}
						if(player.hasSkill('fuqi')){//伏骑
							if(lib.filter.targetInRange(card,player,i)&&Fool_ShafilterTarget(card,player,i)&&get.distance(i,player)<=1) Fool_qiangming=true;
						}
						if(player.hasSkill('refuqi')){//伏骑
							if(lib.filter.targetInRange(card,player,i)&&Fool_ShafilterTarget(card,player,i)&&get.distance(player,i)<=1) Fool_qiangming=true;
						}
						if(player.hasSkill('wushen')&&get.suit(card)=='heart'){//武神
							if(lib.filter.targetInRange(card,player,i)&&Fool_ShafilterTarget(card,player,i)) Fool_qiangming=true;
						}
						if(player.hasSkill('sbpaoxiao')&&player.hasHistory('useCard',function(evtx){
							var evt=_status.event.getParent('phaseUse');
							if(!evt||evt.player!=player) return false;
            				return evtx.card.name=='sha'&&evtx.getParent('phaseUse')==evt;
        				})){//谋咆哮
							if(lib.filter.targetInRange(card,player,i)&&Fool_ShafilterTarget(card,player,i)) Fool_qiangming=true;
						}
						if(player.hasSkill('liyong2')){//厉勇
							if(lib.filter.targetInRange(card,player,i)&&Fool_ShafilterTarget(card,player,i)) Fool_qiangming=true;
						}
						if(player.hasSkill('zhaxiang2')&&get.color(card)=='red'){//诈降
							if(lib.filter.targetInRange(card,player,i)&&Fool_ShafilterTarget(card,player,i)) Fool_qiangming=true;
						}
						if(player.hasSkill('sbzhaxiang')&&player.getHistory('useCard').length<player.getDamagedHp()){//谋诈降
							if(lib.filter.targetInRange(card,player,i)&&Fool_ShafilterTarget(card,player,i)) Fool_qiangming=true;
						}
						if(player.hasSkill('relinglong')&&player.hasEmptySlot(2)&&player.hasEmptySlot(3)&&player.hasEmptySlot(4)&&player.hasEmptySlot(5)&&player.hasEmptySlot(6)){//界玲珑
							if(lib.filter.targetInRange(card,player,i)&&Fool_ShafilterTarget(card,player,i)) Fool_qiangming=true;
						}
						if(player.hasSkill('jintao')&&[0,1].contains(player.getHistory('useCard',function(evtx){
							var evt=_status.event.getParent('phaseUse');
							if(!evt||evt.player!=player) return false;
            				return evtx.card.name=='sha'&&evtx.getParent('phaseUse')==evt;
        				}).length)){//进讨
							var num=player.getHistory('useCard',function(evtx){
								var evt=_status.event.getParent('phaseUse');
								if(!evt||evt.player!=player) return false;
            					return evtx.card.name=='sha'&&evtx.getParent('phaseUse')==evt;
        					}).length;
							if(num==0) Fool_shanghai=true;
							else Fool_qiangming=true;
						}
						if(player.hasSkill('dcgonghu')&&player.hasMark('dcgonghu_basic')&&player.hasMark('dcgonghu_damage')&&get.color(card,false)=='red'){//共护
							if(lib.filter.targetInRange(card,player,i)&&Fool_ShafilterTarget(card,player,i)) Fool_qiangming=true;
						}
						if(Fool_liegong){
							str+='可烈弓';
							if(Fool_qiangming){
								if(config.Fool_liegong=='shousha') str='烈弓强中';
								else str+=' 不可响应';
								if(Fool_shanghai){
									if(config.Fool_liegong=='shousha') str='强中加伤';
									else str+=' 伤害+1';
								}
							}
							else if(Fool_shanghai){
								if(config.Fool_liegong=='shousha') str='烈弓加伤';
								else str+=' 伤害+1';
							}
						}
						else{
							if(Fool_qiangming){
								str='不可响应';
								if(Fool_shanghai){
									if(config.Fool_liegong=='shousha') str='强中加伤';
									else str+=' 伤害+1';
								}
							}
							else{
								if(Fool_shanghai){
									if(config.Fool_liegong=='shousha') str='加伤';
									else str+=' 伤害+1';
								}
							}
						}
						
						var node;
						if(i.node.prompt){
							node=i.node.prompt;
							node.innerHTML='';
							//node.className='damage damageadded';
						}
						else{
							node=ui.create.div('.damage.normal-font',i);
							i.node.prompt=node;
							ui.refresh(node);
							node.classList.add('damageadded');
						}
						if(config.Fool_liegong=='shousha'){
							node.style.zIndex='100';
							node.style.fontSize='24px';
							node.style.textShadow='2px 2px 5px black';
							node.style.fontFamily='HYZLSJ';
							node.style.color='#fcfc91';
							node.style.writingMode='vertical-rl';
							//node.style.transform='translate(-40%,-38%)';
							node.style.transform='translate(-35%,-38%)';
							node.dataset.nature='fire';
						}
						else if(config.Fool_liegong=='olten'){
							node.style.zIndex='100';
							if(Fool_liegong&&Fool_qiangming&&Fool_shanghai) node.style.fontSize='13px';
							else node.style.fontSize='15px';
							node.style.fontFamily='xinwei';
							node.style.color='#fff700';
							node.style.background='linear-gradient(to right, transparent 0%, rgba(100,0,0,0.5) 35%, rgba(100,0,0,0.5) 65%, transparent 100%)';
						}
						else{
							node.style.zIndex='80';
							if(str.length&&Fool_liegong) str='可烈弓';
							node.style.fontSize='20px';
							node.style.fontFamily='songhei';
							node.style.color='#c8a253';
							node.style.transform='translateY(300%)';
							node.style.backgroundImage='url('+lib.assetURL+'"extension/笨蛋插件/image/ui/liegong_ol.png")';
							//node.style.background='linear-gradient(rgba(0,0,0,0.7),rgba(100,0,0,0.7))';
						}
						node.style.textAlign='center';
						node.innerHTML=str;
                        var biaoji = ui.create.div('.biaoji'+config.Fool_liegong,node);
						biaoji.innerHTML=str;
					}
				}
				return Fool_ShafilterTarget.apply(this,arguments);
			}
		}
		
		//点击详细信息-感谢 雷 的技术支持 感谢 萌新(转型中) 的授权
		game.getFoolPhone=function(){
			//获取浏览器navigator对象的userAgent属性（浏览器用于HTTP请求的用户代理头的值）
			var info=navigator.userAgent;
			//通过正则表达式的test方法判断是否包含“Mobile”字符串
			var isPhone=/mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(info);
			//如果包含“Mobile”（是手机设备）则返回true
			return isPhone;
		};
		get.Fool_skillTips=function(tipname,id){
			var dibeijing=ui.create.div('.Fool-dibeijing',document.body);
			dibeijing.style.zIndex=16;
			var skilltip=ui.create.div('.Fool-skilltip',dibeijing);//另外写了个skilltip2格式，可自行替换，十周年样式不知道怎么写，先鸽着
			skilltip.innerHTML=tipname;
			var herf=document.getElementById(id);
			if(herf){
				var left=herf.getBoundingClientRect().left;
				if(game.getFoolPhone()) left+=herf.offsetParent.offsetLeft;
				left+=document.body.offsetWidth*0.15;
				skilltip.style.left=left+'px';
				skilltip.style.top=(herf.getBoundingClientRect().top+30)+'px';
			}
			dibeijing.listen(function(e){
				e.stopPropagation();
				this.remove();
			})
		};
		get.Fool_InformX=function(str1,str2){
			var temp='',numx=1;
			while(numx!=10000){
				temp+=get.rand(1,9)/numx;
				numx=numx*10;
			}
			return "<a id='"+temp+"' style='color:unset' href=\"javascript:get.Fool_skillTips('"+str2+"','"+temp+"');\">※"+str1+"</a>";
		};
		get.Fool_InformY=function(str1,str2){
			var temp='',numx=1;
			while(numx!=10000){
				temp+=get.rand(1,9)/numx;
				numx=numx*10;
			}
			return "<a id='"+temp+"' style='color:unset' href=\"javascript:get.Fool_skillTips('"+str2+"','"+temp+"');\">"+str1+"</a>";
		};
		
		if(lib.config.extension_笨蛋插件_Fool_derivationSkill){//衍生技能详细显示
			var characterSkills=[];
			for(var i in lib.characterPack){
				for(var j in lib.characterPack[i]){
					characterSkills.addArray(lib.characterPack[i][j][3]);
				}
			}//先把所有技能拿出来，避免多武将同技能重复修改
			for(var k of characterSkills){
				if(lib.skill[k]){
					var skill=lib.translate[k],content=lib.skill[k].content,inherit=lib.skill[k].inherit,info=lib.translate[k+'_info'];
					if(inherit&&!content&&lib.skill[inherit]) content=lib.skill[inherit].content;
					if(skill&&content&&info){
						var skills1=content.toString().matchAll(/Skill\((?:'|")(.+?)(?:'|")\)/g);//检索技能的content中的Skill
						var skills2=content.toString().matchAll(/SkillLog\((?:'|")(.+?)(?:'|")\)/g);//检索技能的content中的SkillLog
						var ls=[],names=[];
						if(skills1){
							for(var l of skills1){//得到衍生技组，避免重复修改
								var name=lib.translate[l[1]];
								if(!names.contains(name)){//多个同名技能则都修改为第一个
									ls.add(l[1]);
									names.add(name);
								}
							}
						}
						if(skills2){
							for(var l of skills2){
								var name=lib.translate[l[1]];
								if(!names.contains(name)){
									ls.add(l[1]);
									names.add(name);
								}
							}
						}
						if(ls){
							for(var l of ls){
								var name=lib.translate[l],info2=lib.translate[l+'_info'];
								if(name&&info2&&info.indexOf(name)!=-1&&skill!=name){
									var matches = info.split(/(>[^<>]*<)/g);
									var replace = get.Fool_InformX(name,name+'：'+info2+'');
									matches = matches.map(i => {
    									if((i.substring(0, 1) == '>' && i.substring(i.length - 1) == '<')||(i.substring(0, 1) == "'" && i.substring(i.length - 1) == "：")){
        									return i;
    									} else {
        									return i.replace(new RegExp(name, 'g'), replace);
    									}
									});

									var info = matches.join('');
									//info=info.replace(new RegExp(name, "g"), get.Fool_InformX(name,name+'：'+info2+''));
									lib.translate[k+'_info']=info;
								}
							}
						}
					}
				}
			}//目前只存在group或中derivation的技能还是无法获取，先村了
			
			/*for(var i in lib.characterPack){//这个无derivation不能检索
				for(var j in lib.characterPack[i]){
					for(var k of lib.characterPack[i][j][3]){
						var derivation=lib.skill[k].derivation,info=lib.translate[k+'_info'];
						if(derivation&&info){
							if(Array.isArray(derivation)){
								for(var l of derivation){
									var skill=lib.translate[l],info2=lib.translate[l+'_info'];
									if(skill&&info2) info=info.replace(new RegExp(skill, "g"), get.Fool_InformX(skill,skill+'：'+info2));
								}
							}
							else{
								var skill=lib.translate[derivation],info2=lib.translate[derivation+'_info'];
								if(skill&&info2) info=info.replace(new RegExp(skill, "g"), get.Fool_InformX(skill,skill+'：'+info2));
							}
							lib.translate[k+'_info']=info;
						}
					}
				}
			}*/
			
			/*for(var i in lib.characterPack){//这个多武将同技能会重复修改
				for(var j in lib.characterPack[i]){
					for(var k of lib.characterPack[i][j][3]){
						var skill=lib.translate[k],content=lib.skill[k].content,info=lib.translate[k+'_info'];
						if(skill&&content&&info){
							var skills=content.toString().matchAll(/Skill\((?:'|")(.+?)(?:'|")\)/g);
							for(var l of skills){
								var name=lib.translate[l[1]],info2=lib.translate[l[1]+'_info'];
								if(name&&info2&&info.indexOf(name)!=-1&&skill!=name){
									var matches = info.split(/(>[^<>]*<)/g);
									var replace = get.Fool_InformX(name,name+'：'+info2+'');
									matches = matches.map(i => {
    									if((i.substring(0, 1) == '>' && i.substring(i.length - 1) == '<')||(i.substring(0, 1) == '' && i.substring(i.length - 1) == '<')){
        									return i;
    									} else {
        									return i.replace(new RegExp(name, 'g'), replace);
    									}
									});

									var info = matches.join('');
									//info=info.replace(new RegExp(name, "g"), get.Fool_InformX(name,name+'：'+info2));
									lib.translate[k+'_info']=info;
								}
							}
						}
					}
				}
			}*/
		}
		
		//由于ui.create.menu里是没接口的，只能通过直接改元素的方式；并且因为懒加载的原因，只能循环遍历寻找每一个武将的元素。否则就要改选将函数了，这样就和很多扩展不兼容了
		/*if(lib.config.extension_笨蛋插件_Fool_chooseAudio){
			lib.Fool_characterLength=Object.keys(lib.character).length;
			lib.Fool_chooseLength=[];
			lib.Fool_freeChoose=false;
			
			Fool_updateChoose=function(){
				Fool_choose = [ ].find.call(document.getElementsByTagName( 'div' ), function(i){
					if(i.onclick) return false;
					if(i.offsetParent&&i.offsetParent.previousElementSibling&&typeof i.offsetParent.previousElementSibling.innerText=='string'&&['选择身份','选择座位'].contains(i.offsetParent.previousElementSibling.innerText)) return true;
					return typeof i.link=='string'&&['自由选将','更换','切换'].contains(i.link);
				});
				if(Fool_choose){
					if((Fool_choose.link!='自由选将'&&(Object.keys(lib.character).length-lib.Fool_characterLength)<50)||(Object.keys(lib.character).length-lib.Fool_characterLength)<100){
						Fool_choose.onclick=(link)=>{
							if(link.path) button=link.path[0].link;
							else button=link.target.link;
							if(lib.Fool_freeChoose&&(button!='自由选将'||(Object.keys(lib.character).length-lib.Fool_characterLength)<50)){
								Fool_updateChooseAudio();
							}
						};
					}
					Fool_updateChoose();//只要找到一个就开始找下一个，直至找完
				}
			};
			
			Fool_updateChooseAudio=function(){
				for(var name in lib.character){//遍历所有武将，会导致初次点击自由选将时变卡
					Fool_selectable = [ ].find.call(document.getElementsByTagName( 'div' ), function(i){
						if(i.onclick) return false;
						return typeof i.link=='string'&&i.link==name;
					});
					if(Fool_selectable){
						Fool_selectable.onclick=(link)=>{
							if(link.path) button=link.path[0].link;
							else button=link.target.link;
							for(var i of ui.selected.buttons){
								if(i.link==button){
									game.getFileList('extension/笨蛋插件/audio',(folders,files) => {
										if(files.contains(button+'_choose.mp3')){
											game.playAudio('..','extension','笨蛋插件/audio/',button+'_choose');
										}
										else{
											var playAudio=function(skill,player){
												var info=get.info(skill);
												if(!info) return;
												if(!lib.config.background_speak) return;
												let list=parseSkillAudio(skill,player);
												if(!list.length) return;
												let audio=list[Math.floor(Math.random()*list.length)];
												if(Array.isArray(audio)) return game.playSkillAudio(audio[0]);
												return game.playAudio(audio);
											};
											var parseSkillAudio=function(skill,player){
												if(typeof player=='string') player={name:player};
												else if(get.itemtype(player)!='player') player={};
												
													* 处理 audioInfo 外的参数
													* @param {String} skill  技能名 
													* @param {Player|{name:string}} player  角色
													* @param {Array<string>} audioname  audioname历史
													* @param {Array<string>} history  判断deadlock
													* @param {Number} fixedNum  [audioname, number] 中的第二个参数，用来限制语音数
													* @returns {Array<string|[string]>} 音频地址数组（有需要playSkillAudio的为[skillname])
													*
												function getAudioList(skill,player,audioname,history,fixedNum){
													let info=lib.skill[skill];
													if(!info) return [];
													if(!history) history=[];
													if(history.includes(skill)){//判断deadlock
														console.trace(`${skill} in ${history} forms a deadlock`);
														if(info.audio!==false) return [[skill]];
														return [];
													}
													history.push(skill);
													
													let audioInfo=info.audio;
													if(info.audioname2){
														if(info.audioname2[player.name]) audioInfo=info.audioname2[player.name];
														else if(info.audioname2[player.name1]) audioInfo=info.audioname2[player.name1];
														else if(info.audioname2[player.name2]) audioInfo=info.audioname2[player.name2];
													}
													if(typeof audioInfo=='function') audioInfo=audioInfo(player);
													
													if(!audioname) audioname=[];
													if(Array.isArray(info.audioname)) audioname.addArray(info.audioname);
													
													let audioList=parseAudio(skill,audioInfo,audioname,player,history,fixedNum);		
													if(fixedNum&&fixedNum<audioList.length) audioList.length=fixedNum;
													if(audioList.length) return audioList;
													if(info.audio!==false) return [[skill]];
													return [];
												}
													* 分析 audioInfo 获取音频地址数组
													* @param {String} skill  技能名 
													* @param {any} audioInfo  info.audio
													* @param {Array<string>} audioname  要判断的audioname
													* @param {Player|{name:string}} player  角色
													* @param {Array<string>} history  判断deadlock
													* @param {Number} fixedNum  [audioname, number] 中的第二个参数，用来限制语音数
													* @returns {Array<string|[string]>} 音频地址数组（有需要playSkillAudio的为[skillname])
													*
												function parseAudio(skill,audioInfo,audioname,player,history,fixedNum){
													if(Array.isArray(audioInfo)){
														if(typeof audioInfo[0]=='string'&&typeof audioInfo[1]=='number'){// [audioname, number]
															if(lib.skill[audioInfo[0]]) return getAudioList(audioInfo[0],player,audioname,history,fixedNum||audioInfo[1]);
															return parseAudio(audioInfo[0],audioInfo[1],audioname,player,history,fixedNum||audioInfo[1]);
														}
														return audioInfo.reduce((total,i)=>total.addArray(parseAudio(skill,i,audioname,player,history,fixedNum)),[]);
													}
													
													if(!['string','number','boolean'].includes(typeof audioInfo)) return [];
													if(audioInfo===false) return [];
													if(typeof audioInfo=='string'&&lib.skill[audioInfo]) return getAudioList(audioInfo,player,audioname,history,fixedNum);
													
													let audioList=[];
													audioInfo=String(audioInfo);
													let list=audioInfo.match(/(?:(.*):|^)(true|\d*)(?::(.*)|$)/);
													if(list&&list[2]){
														let _audioname='';
														if(audioname.includes(player.name)) _audioname=`_${player.name}`;
														else if(audioname.includes(player.name1)) _audioname=`_${player.name1}`;
														else if(audioname.includes(player.name2)) _audioname=`_${player.name2}`;
														
														list=list.slice(1);//[路径,number/true,格式]
														if(list[1]=='true') audioList.add(`${list[0]||'skill'}/${skill}${_audioname}.${list[2]||'mp3'}`);
														else{
															list[1]=parseInt(list[1]);
															for(let i=1;i<=list[1];i++){
																audioList.add(`${list[0]||'skill'}/${skill}${_audioname}${i}.${list[2]||'mp3'}`);
															}
														}
													}
													else audioList.add(`${/(?:^db:|^ext:|\/)/.test(audioInfo)?'':'skill/'}${audioInfo}`);
													return audioList;
												}
		
												return getAudioList(skill,player);
											};
											var skill=lib.character[button][3].filter(function(skill){
												var info=get.info(skill);
												if(!info) return;
												if(!lib.config.background_speak) return;
												let list=parseSkillAudio(skill,button);
												if(!list.length) return;
												return true;
											}).randomGet();
											console.log(skill);
											var that=link;
											playAudio(skill,button);
										}
									});
								}
							}
						};
						lib.Fool_characterLength--;
					}
					else{
						continue;
					}
				}
				var num=Object.keys(lib.character).length-lib.Fool_characterLength;
				lib.Fool_chooseLength.push(num);
				if(num>0){
					console.log(num+'个武将选中语音已全部加载完成');
				}
			};
			
			Fool_chooseAudio = setInterval(function(){
				Fool_updateChoose();
				Fool_updateChooseAudio();
				var num=Object.keys(lib.character).length-lib.Fool_characterLength;
				lib.Fool_chooseLength.push(num);
				if(num>0){
					if(num>=5||lib.Fool_chooseLength.filter(i=>i==num).length>=10) clearInterval(Fool_chooseAudio);//找到五个武将就可以关闭循环了，后续加载靠其他按钮再加载
					lib.Fool_freeChoose=true;
				}
			},1000);
		}*/
		if(lib.config.extension_笨蛋插件_Fool_chooseAudio){//选将语音
			lib.Fool_characterLength=Object.keys(lib.character).length;
			lib.Fool_chooseLength=[];
			lib.Fool_freeChoose=false;
			var Fool_playAudio=function(skill,player){
				var info=get.info(skill);
				if(!info) return;
				if(!lib.config.background_speak) return;
				let list=Fool_parseSkillAudio(skill,player);
				if(!list.length) return;
				let audio=list[Math.floor(Math.random()*list.length)];
				if(Array.isArray(audio)) return game.playSkillAudio(audio[0]);
				return game.playAudio(audio);
			};
			/*var getIndex=function(i){
				if(typeof that.audioindex!='number'){
					that.audioindex=i;
				}
				that.audioindex++;
				if(that.audioindex>i){
					that.audioindex=0;
				}
				return that.audioindex;
			};*/
			var Fool_parseSkillAudio=function(skill,player){
				if(typeof player=='string') player={name:player};
				else if(get.itemtype(player)!='player') player={};
				
				/**
					* 处理 audioInfo 外的参数
					* @param {String} skill  技能名 
					* @param {Player|{name:string}} player  角色
					* @param {Array<string>} audioname  audioname历史
					* @param {Array<string>} history  判断deadlock
					* @param {Number} fixedNum  [audioname, number] 中的第二个参数，用来限制语音数
					* @returns {Array<string|[string]>} 音频地址数组（有需要playSkillAudio的为[skillname])
					*/
				function getAudioList(skill,player,audioname,history,fixedNum){
					let info=lib.skill[skill];
					if(!info) return [];
					//在技能处标记noChoosingAudio: true, 避免这条语音被算上
					if(info.noChoosingAudio) return [];
					if(!history) history=[];
					if(history.includes(skill)){//判断deadlock
						console.trace(`${skill} in ${history} forms a deadlock`);
						if(info.audio!==false) return [[skill]];
						return [];
					}
					history.push(skill);
					
					let audioInfo=info.audio;
					if(info.audioname2){
						if(info.audioname2[player.name]) audioInfo=info.audioname2[player.name];
						else if(info.audioname2[player.name1]) audioInfo=info.audioname2[player.name1];
						else if(info.audioname2[player.name2]) audioInfo=info.audioname2[player.name2];
					}
					if(typeof audioInfo=='function') audioInfo=audioInfo(player);
					
					if(!audioname) audioname=[];
					if(Array.isArray(info.audioname)) audioname.addArray(info.audioname);
					
					let audioList=parseAudio(skill,audioInfo,audioname,player,history,fixedNum);		
					if(fixedNum&&fixedNum<audioList.length) audioList.length=fixedNum;
					if(audioList.length) return audioList;
					if(info.audio!==false) return [[skill]];
					return [];
				}

				/**
					* 分析 audioInfo 获取音频地址数组
					* @param {String} skill  技能名 
					* @param {any} audioInfo  info.audio
					* @param {Array<string>} audioname  要判断的audioname
					* @param {Player|{name:string}} player  角色
					* @param {Array<string>} history  判断deadlock
					* @param {Number} fixedNum  [audioname, number] 中的第二个参数，用来限制语音数
					* @returns {Array<string|[string]>} 音频地址数组（有需要playSkillAudio的为[skillname])
					*/
				function parseAudio(skill,audioInfo,audioname,player,history,fixedNum){
					if(Array.isArray(audioInfo)){
						if(typeof audioInfo[0]=='string'&&typeof audioInfo[1]=='number'){// [audioname, number]
							if(lib.skill[audioInfo[0]]) return getAudioList(audioInfo[0],player,audioname,history,fixedNum||audioInfo[1]);
							return parseAudio(audioInfo[0],audioInfo[1],audioname,player,history,fixedNum||audioInfo[1]);
						}
						return audioInfo.reduce((total,i)=>total.addArray(parseAudio(skill,i,audioname,player,history,fixedNum)),[]);
					}
					
					if(!['string','number','boolean'].includes(typeof audioInfo)) return [];
					if(audioInfo===false) return [];
					if(typeof audioInfo=='string'&&lib.skill[audioInfo]) return getAudioList(audioInfo,player,audioname,history,fixedNum);
					
					let audioList=[];
					audioInfo=String(audioInfo);
					let list=audioInfo.match(/(?:(.*):|^)(true|\d*)(?::(.*)|$)/);
					if(list&&list[2]){
						let _audioname='';
						if(audioname.includes(player.name)) _audioname=`_${player.name}`;
						else if(audioname.includes(player.name1)) _audioname=`_${player.name1}`;
						else if(audioname.includes(player.name2)) _audioname=`_${player.name2}`;
						
						list=list.slice(1);//[路径,number/true,格式]
						if(list[1]=='true') audioList.add(`${list[0]||'skill'}/${skill}${_audioname}.${list[2]||'mp3'}`);
						else{
							list[1]=parseInt(list[1]);
							for(let i=1;i<=list[1];i++){
								audioList.add(`${list[0]||'skill'}/${skill}${_audioname}${i}.${list[2]||'mp3'}`);
							}
						}
					}
					else audioList.add(`${/(?:^db:|^ext:|\/)/.test(audioInfo)?'':'skill/'}${audioInfo}`);
					return audioList;
				}

				return getAudioList(skill,player);
			};
			// var Fool_updateChoose=function(){
				// var Fool_choose = [ ].find.call(document.getElementsByTagName( 'div' ), function(i){
					// if(i.onclick) return false;
					// if(i.offsetParent&&i.offsetParent.previousElementSibling&&typeof i.offsetParent.previousElementSibling.innerText=='string'&&['选择身份','选择座位'].includes(i.offsetParent.previousElementSibling.innerText)) return true;
					// return typeof i.link=='string'&&['自由选将','更换','切换'].includes(i.link);
				// });
				// if(Fool_choose){
					// if((Fool_choose.link!='自由选将'&&(Object.keys(lib.character).length-lib.Fool_characterLength)<50)||(Object.keys(lib.character).length-lib.Fool_characterLength)<100){
						// Fool_choose.onclick=(link)=>{
							// if(link.path) var button=link.path[0].link;
							// else var button=link.target.link;
							// if(lib.Fool_freeChoose&&(button!='自由选将'||(Object.keys(lib.character).length-lib.Fool_characterLength)<50)){
								// Fool_updateChooseAudio();
							// }
						// };
					// }
					// Fool_updateChoose();//只要找到一个就开始找下一个，直至找完
				// }
			// };
			
			// var Fool_updateChooseAudio=function(){
				// var Fool_selectable = [ ].find.call(document.getElementsByTagName( 'div' ), function(i){
					// if(i.onclick) return false;
					// return typeof i.link=='string'&&lib.character[i.link];
				// });
				// if(Fool_selectable){
					// Fool_selectable.onclick=(link)=>{
						// if(link.path) var button=link.path[0].link;
						// else var button=link.target.link;
						// for(var i of ui.selected.buttons){
							// if(i.link==button){
								// game.getFileList('extension/笨蛋插件/audio',(folders,files) => {
									// if(files.includes(button+'_choose.mp3')){
										// game.playAudio('..','extension','笨蛋插件/audio/',button+'_choose');
									// }
									// else{
										// var skill=lib.character[button][3].filter(function(skill){
											// var info=get.info(skill);
											// if(!info) return;
											// if(!lib.config.background_speak) return;
											// let list=Fool_parseSkillAudio(skill,button);
											// if(!list.length) return;
											// return true;
										// }).randomGet();
										// console.log(skill);
										// var that=link;
										// Fool_playAudio(skill,button);
									// }
								// });
							// }
						// }
					// };
					// lib.Fool_characterLength--;
				// }
				// var num=Object.keys(lib.character).length-lib.Fool_characterLength;
				// lib.Fool_chooseLength.push(num);
				// if(num>0){
					// console.log(num+'个武将选中语音已全部加载完成');
				// }
			// };
			
			// var Fool_chooseAudio = setInterval(function(){
				// Fool_updateChoose();
				// Fool_updateChooseAudio();
				// var num=Object.keys(lib.character).length-lib.Fool_characterLength;
				// lib.Fool_chooseLength.push(num);
				// if(num>0){
					// if(_status.gameStarted||lib.Fool_chooseLength.filter(i=>i==num).length>=3000) clearInterval(Fool_chooseAudio);
					// lib.Fool_freeChoose=true;
				// }
			// },1);
			let currentAudio;
			const smoothOutAudio = function(audio) {
                if (!audio || audio.ended) return;
                
                const initialVolume = audio.volume;
                const fadeOutDuration = 2000; // 2秒
                const startTime = Date.now();
                
                function fadeOut() {
                    if (audio.ended || !audio.parentNode) return;
                    
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / fadeOutDuration, 1);
                    audio.volume = initialVolume * (1 - progress);
                    
                    if (progress < 1) {
                        requestAnimationFrame(fadeOut);
                    } else {
                        audio.pause();
                        if (audio.parentNode) {
                            audio.parentNode.removeChild(audio);
                        }
                    }
                }
                
                fadeOut();
            }
			_status.playChooseCharacterAudio = [];
            const playCharacterAudio = function (character) {
                if (!lib.character[character]) return false;
                const skills = lib.character[character][3].filter(function(skill){
						var info=get.info(skill);
						if(!info) return;
						if(!lib.config.background_speak) return;
						let list=Fool_parseSkillAudio(skill,character);
						if(!list.length) return;
					return true;
				});
                if (!skills.length) return false;
                return skills.randomGet();
            };
            const playChooseCharacterAudio = function () {
                const bg = document.getElementsByTagName('div');
                if (!bg.length) return;
                for (let i = 0; i < bg.length; i++) {
                    _status.playChooseCharacterAudio.addArray(bg[i].querySelectorAll('.button.character'));
                }
                if (!_status.playChooseCharacterAudio.length) return;
                _status.playChooseCharacterAudio.forEach(button => {
                    if (button.onclick) return;
                    button.onclick = function () {
                        //如果已经在播着配音了，那就慢慢停止这个再播新的
                        if(currentAudio) {
                            smoothOutAudio(currentAudio);
                        }
                        //逻辑混乱成这样
                        //if ((!lib.config.auto_confirm||get.config("double_character")) && !this.classList.contains('selected')) return;
                        if(!this.classList.contains('selected')) return;
                        const character = button.link;
                        const skill = playCharacterAudio(character);
                        currentAudio = Fool_playAudio(skill, character);
                        let thisAudio = currentAudio;
                        setTimeout(function() {
                            if(thisAudio) smoothOutAudio(thisAudio);
                        }, 6000);//最长播放6秒（实际上是8秒，2秒渐变消失）
                    }
                });
            };
            const chooseCharacterAudio = setInterval(function () {
                playChooseCharacterAudio();
                if (_status.gameStarted) clearInterval(chooseCharacterAudio);
            }, 1000);
		}
		
		//if(lib.config.extension_笨蛋插件_Fool_chooseCard){//选择卡牌优化
		if(false) {
			if(!lib.hooks||!lib.hooks.checkBegin||!lib.hooks.uncheckBegin){
				lib.skill._Fool_chooseCard={
					trigger:{
						player:["chooseToDiscardBegin","chooseToUseBegin","chooseToRespondBegin","chooseCardBegin"],
					},
					charlotte:true,
					ruleSkill:true,
					forced:true,
					popup:false,
					lastDo:true,
					/*hiddenCard:function(player,name){
						if(player==_status.currentPhase) return false;
						var cards=[];
						game.getGlobalHistory('cardMove',evt=>{
							if(evt.name=='lose'&&evt.position==ui.discardPile||evt.name=='cardsDiscard'){
								cards.addArray(evt.cards.filterInD('d'));
							}
						});
						if(!cards.length) return false;
						return cards.some(i=>i.name==name);
					},*/
					filter:function(event,player){
						if(!event.position||typeof event.position!='string'||!event.position.includes('e')||!player.countCards('e')) return false;
						//if(event.name=='chooseCard'&&event.type!='compare') return false;
						if(event.parent.name=='phaseDiscard') return false;
						if(event.responded||event.skill) return false;
						return true;
					},
					mod:{
						/*"cardEnabled2":function(card,player,name){
							if(get.position(card)=='s'&&get.itemtype(card)=='card'&&!card.hasGaintag('已装备')&&!['chooseToUse','chooseToRespond'].includes(_status.event.name)) return false;
						},*/
						/*cardDiscardable:function (card, player, name) {
							if(get.position(card)=='s'&&get.itemtype(card)=='card'&&!card.hasGaintag('已装备')) return false;
						},*/
					},
					copy:function(cards){
						var result=[];
						/*var getName=function(target){
							if(target._tempTranslate) return target._tempTranslate;
							var name=target.name;
							if(lib.translate[name+'_ab']) return lib.translate[name+'_ab'];
							return get.translation(name);
						}*/
						for(var i of cards){
							var card=ui.create.card(ui.special);
							card.init([
								i.suit,
								i.number,
								i.name,
								i.nature,
							]);
							card.cardid=i.cardid,
							card.wunature=i.wunature,
							card.storage=i.storage,
							card.relatedCard=i;
							card.owner=get.owner(i);
							result.push(card);
						};
						return result;
					},
					contentx:function(){
						"step 0"
						if(trigger.result.bool){
							if(trigger.onresult){
								trigger.onresult(trigger.result);
								delete trigger.onresult;
							}; 
						};
						"step 1"
						player.lose(event.cards,ui.special)._triggered=null;
						"step 2"
						for(var i of event.cards){
							i.destroyed=true;
						};
					},
					content:function(){
						"step 0"
						if(!trigger.position.includes('s')){
							trigger.position+='s';
							var Fool_chooseCard_filterCard=trigger.filterCard;
							trigger.filterCard=function(card,player,target){
								let relatedCard=card.relatedCard?card.relatedCard:card
								if(get.position(card)=='e') return false;
								if(get.position(card)=='s'&&get.itemtype(card)=='card'&&!card.hasGaintag('已装备')) return false;
								return Fool_chooseCard_filterCard(relatedCard,player,target);
							};
						}
						else {
							var Fool_chooseCard_filterCard=trigger.filterCard;
							trigger.filterCard=function(card,player,target){
								let relatedCard=card.relatedCard?card.relatedCard:card
								if(get.position(card)=='e') return false;
								return Fool_chooseCard_filterCard(relatedCard,player,target);
							};
						}
						var cards=player.getCards('e');
						event.cards=lib.skill._Fool_chooseCard.copy(cards);
						player.directgains(event.cards,null,'已装备');
						var sort2=function(b,a){
							if(a.name!=b.name) return lib.sort.card(a.name,b.name);
							else if(a.suit != b.suit) return lib.suit.indexOf(a)-lib.suit.indexOf(b);
							else return a.number-b.number;
						};
						event.cards.sort(sort2);
						for(var i of event.cards){
							//i.node.gaintag.classList.remove('gaintag');
							i.node.gaintag.classList.remove('info');
							
							i.node.gaintag.style.bottom='35px';
							i.node.gaintag.style.left='5px';
							i.node.gaintag.style.textAlign='left';
							i.node.gaintag.style.fontFamily='shousha';
							if(lib.config.extensions&&lib.config.extensions.includes('十周年UI')&&lib.config['extension_十周年UI_enable']) i.node.gaintag.style.fontSize='20px';
							i.node.gaintag.style.color='white';
							i.node.gaintag.style.background='linear-gradient(to right, transparent 0%, rgba(255, 120, 0, 0.9) 5%, rgba(255, 120, 0, 0.5) 80%, transparent 100%)';
							i.node.gaintag.style.textShadow='rgba(255, 120, 0, 0.5) 0 0 2px, rgba(255, 120, 0, 0.5) 0 0 2px, rgba(255, 120, 0, 0.5) 0 0 2px,rgba(255, 120, 0, 0.5) 0 0 2px, black 0 0 1px';
							//console.log(i.node.gaintag);
						}
						"step 1"
						var evt=trigger;
						var onresult=false;
						if(evt.onresult){
							onresult=evt.onresult;
						};
						var next2=game.createEvent('_Fool_chooseCard_clear',false);
						next2.cards=event.cards;
						next2.player=player;
						next2._trigger=evt;
						next2.setContent(lib.skill._Fool_chooseCard.contentx);
						event.next.remove(next2);
						evt.after.push(next2);
						evt.onresult=function(result){
							if(evt.after.includes(next2)){
								evt.after.remove(next2);
								evt.next.push(next2);
							};
							if(result.cards&&result.cards.length&&event.cards.includes(result.cards[0])){
								//player.logSkill('_Fool_chooseCard');
								var card2=result.cards[0];
								result.cards[0]=result.cards[0].relatedCard;
								var cardx=result.cards[0];
								result.card={
									name:get.name(card2),
									suit:get.suit(card2),
									number:get.number(card2),
									nature:get.nature(card2),
									isCard:true,
									cardid:cardx.cardid,
									wunature:cardx.wunature,
									storage:cardx.storage,
									cards:[cardx],
								};
								game.cardsDiscard(result.cards);
							};
							if(onresult) onresult.apply(evt,arguments);
							delete evt.onresult;
						};
						game.delay(1);
						/*var cards=player.getCards("hs");
						var sort2=function(b,a){
							if(a.name!=b.name) return lib.sort.card(a.name,b.name);
							else if(a.suit != b.suit) return lib.suit.indexOf(a)-lib.suit.indexOf(b);
							else return a.number-b.number;
						};
						if(cards.length>1){
							cards.sort(sort2);
							cards.forEach(function(i,j){
								player.node.handcards1.insertBefore(cards[j], player.node.handcards1.firstChild);
							});
							try{
								dui.queueNextFrameTick(dui.layoutHand,dui);
							}
							catch(e){
							}
						}*/
					},
					"_priority":0,
				};
			}
			else{
				lib.hooks.checkBegin.add(function(event){
					let player=event.player
					if (event.position && typeof event.position=='string' && event.position.includes('e') && player.countCards('e')&&!event.copyCards&&['chooseCard','chooseToUse','chooseToRespond','chooseToDiscard'].includes(event.name)) {
						event.copyCards=true
						if(!event.position.includes('s')){
							event.position+='s'
							if(event.filterCard){
								var chooseCard_filterCard=event.filterCard
								var eventFilterCard=function(card,player,target){
									let relatedCard=card.relatedCard?card.relatedCard:card
									if(get.position(card)=='e') return false
									if(get.position(card)=='s'&&get.itemtype(card)=='card'&&!card.hasGaintag('已装备')) return false
									return chooseCard_filterCard(relatedCard,player,target)
								}
								//console.log(event,chooseCard_filterCard)
							}
						}
						else {
							if(event.filterCard){
								var chooseCard_filterCard=event.filterCard
								var eventFilterCard=function(card,player,target){
									let relatedCard=card.relatedCard?card.relatedCard:card
									if(get.position(card)=='e') return false
									return chooseCard_filterCard(relatedCard,player,target)
								}
								//console.log(event,chooseCard_filterCard)
							}
						}
						let cards=player.getCards('e')
						let copy = function(cards){
							let result=[]
							for(let i of cards){
								let card=ui.create.card(ui.special)
								card.init([
									i.suit,
									i.number,
									i.name,
									i.nature
								])
								card.cardid=i.cardid
								card.wunature=i.wunature
								card.storage=i.storage
								card.relatedCard=i
								card.owner=get.owner(i)
								result.push(card)
							}
							return result
						}
						let cardx=copy(cards)
						let cardxF=[],cardxF2=[]
						if(chooseCard_filterCard){
							cardxF=cardx.filter(function(j){
								let relatedCard=j.relatedCard?j.relatedCard:j
								return chooseCard_filterCard(relatedCard,player,event.target);
							})
							if(typeof event.selectCard=='object'||event.selectCard>1){
								cardxF2.addArray(cardxF)
								for(var cardF of player.getCards('he',function(j){
									let relatedCard=j.relatedCard?j.relatedCard:j
									if(!event.position.includes(get.position(relatedCard))) return false
									return chooseCard_filterCard(relatedCard,player,event.target)
								})){
									if(!ui.selected.cards) ui.selected.cards=[]
									ui.selected.cards.add(cardF)
									cardxF2.addArray(cardx.filter(function(j){
										if(cardxF2.includes(j)) return false
										let relatedCard=j.relatedCard?j.relatedCard:j
										if(!event.position.includes(get.position(relatedCard))) return false
										return chooseCard_filterCard(relatedCard,player,event.target)
									}))
									ui.selected.cards.remove(cardF)
								}
								if(cardxF2.length){
									player.directgains(cardxF2,null,'已装备')
									if(eventFilterCard) event.filterCard=eventFilterCard
								}
							}
							else if(cardxF.length){
								player.directgains(cardxF,null,'已装备')
								if(eventFilterCard) event.filterCard=eventFilterCard
							}
						}
						else if(cardx.length){
							player.directgains(cardx,null,'已装备')
							if(eventFilterCard) event.filterCard=eventFilterCard
						}
						for(var i of cardx.concat(cardxF).concat(cardxF2)){
							i.node.gaintag.classList.remove('gaintag');
							i.node.gaintag.classList.remove('info');
							
							i.node.gaintag.style.bottom='35px';
							i.node.gaintag.style.left='5px';
							i.node.gaintag.style.textAlign='left';
							i.node.gaintag.style.fontFamily='shousha';
							if(lib.config.extensions&&lib.config.extensions.includes('十周年UI')&&lib.config['extension_十周年UI_enable']) i.node.gaintag.style.fontSize='20px';
							i.node.gaintag.style.color='white';
							i.node.gaintag.style.background='linear-gradient(to right, transparent 0%, rgba(255, 120, 0, 0.9) 5%, rgba(255, 120, 0, 0.5) 80%, transparent 100%)';
							i.node.gaintag.style.textShadow='rgba(255, 120, 0, 0.5) 0 0 2px, rgba(255, 120, 0, 0.5) 0 0 2px, rgba(255, 120, 0, 0.5) 0 0 2px,rgba(255, 120, 0, 0.5) 0 0 2px, black 0 0 1px';
						}
						let sort2=function(b,a){
							if(a.name!=b.name) return lib.sort.card(a.name,b.name)
							else if(a.suit != b.suit) return lib.suit.indexOf(a)-lib.suit.indexOf(b)
							else return a.number-b.number
						}
						cardx.sort(sort2)
					}
				});
				lib.hooks.uncheckBegin.add(function(event,args){
					let player=event.player;
					//if(args.includes('card')&&event.copyCards) console.log(event.name,event.skill,event.result);
					if(args.includes('card')&&(event.name=='chooseToUse'||event.result||event.name=='chooseToRespond'&&!event.skill&&!event.result)){
						let cards=event.result?.cards
						if(cards)
							for(let i=0;i<cards.length;i++)
								if(cards[i].hasGaintag('已装备')) cards[i]=player.getCards('e',card=>card.cardid==cards[i].cardid)[0];
						if(player) player.getCards('s',card=>card.hasGaintag('已装备')).forEach(card=>card.delete());
						event.copyCards=false
					}
				});
			}
		}
	});
	
	
	
	//alert('我在');
	//宏伟配音计划
	var chgs=[];
	if(config.Fool_peiyinFix) {
	    for(var sks in lib.skill) {
	        var pack=lib.skill[sks];
	        //翻译同名技能无配音问题
	        if(!pack.audio&&lib.translate[sks]) {
	            var tra=lib.translate[sks];
	            for(var skg in lib.skill) {
	                //判断，无中文名或无描述的跳过，公共技能跳过
	                if(!lib.translate[skg]) continue;
	                if(!lib.translate[skg+'_info']) continue;
	                if(skg.indexOf('_')==0) continue;
	                //中文名与无配音技能名不同的跳过
	                if(lib.translate[skg]!=tra) continue;
	                //无配音的跳过
	                if(!lib.skill[skg].audio) continue;
	                if(typeof lib.skill[skg].audio!= 'number') continue;
	                lib.skill[sks].audio=skg;
	                //alert(sks);
	                chgs.add(sks);
	            }
	        }
	        //group缺失配音问题
	        if(!pack.audio||!pack.group) continue;
	        var group=pack.group;
	        for(var i=0;i<group.length;i++) {
	            var skme=group[i];
	            //判断，技能名不带父技能id的跳过
	            if(skme.indexOf(sks)==-1) continue;
	            //无此技能或已有配音的跳过
	            if(!lib.skill[skme]||lib.skill[skme].audio) continue;
	            lib.skill[skme].audio=sks;
	            chgs.add(skme);
	        }
	    }
	}
	//alert(chgs);
	//检测：存到window.audioSkillsChg里面了
	window.audioSkillsChg=chgs;
},precontent:function(){
    
},config:{
	"Fool_throwEmotion":{
		"name":"<b><font color=\"#00FF00\">表情",
		"init":true,
		"intro":"<font color=\"#00FF00\">开启后，砸蛋、送花这些表情会随机落点、空中旋转，更像手杀的砸蛋功能",
	},
	"Fool_skill":{
		"name":"<b><font color=\"#FF9000\">计算优化",
		"init":true,
		"intro":"<font color=\"#FF9000\">开启后，会优化部分包含计算的本体技能。现已有技能：</font><br>资援：计算显示；<br>敏思：计算显示；<br>方统：计算显示、系统推荐方案高亮。",
	},
	"Fool_chooseAudio":{
		"name":"<b><font color=\"#00FF00\">选将语音",
		"init":true,
		"intro":"开启后，选将时会播放对应的语音。<br>可将音频命名为<br><span style='font-family: yuanli'>武将id+'_choose'</span><br>并放置在本扩展<span style='font-family: yuanli'>'audio'</span>文件夹下自行配置，未配置选中语音的武将将随机播放技能语音。<br>由于开启自动确认后，会导致选中就直接进入游戏，故不播放选中语音。",
	},
	"Fool_peiyinFix":{//Helasisy新增，出了事不管扩展原作者的事儿
		"name":"<b><font color=\"#00FF00\">配音修复",
		"init":false,
		"intro":"开启后，会优化部分无配音技能的配音，寻找合适的音源。",
	},
	"Fool_liegong":{
		"name":"<b><font color=\"#c90000\">选中卡牌提示",
		"intro":"在有本体部分技能的情况下（目前仅有烈弓、势敌、伏骑、武神、谋咆哮、厉勇、诈降、界玲珑、进讨、共护），选中【杀】时，会在符合技能的目标身上出现“不可响应”（或“伤害+1”）的样式，可能与部分美化扩展不兼容。<br><font color=\"#FF0000\">手杀样式可能不适合原版和部分魔改十周年UI使用</font><br>可根据个人喜好切换<br>切换后，重启生效",
		"init":"shousha",
		"item":{
			"shousha":"<b><font color=\"#FF6020\">手杀样式",
			"olten":"<b><font color=\"#FFFF00\">十周年样式",
			//"ol":"<b><font color=\"#dc9619\">OL样式",
			"close":"<b><font color=\"#FF0000\">关闭",
		},
		"textMenu":function(node,link){
			lib.setScroll(node.parentNode);
			node.parentNode.style.transform = "translateY(-100px)";
			node.parentNode.style.height = "380px";
			node.parentNode.style.width = "100px";
			//node.style.width="400px";
			switch(link){
				case "shousha":
					node.innerHTML = "<img style=width:60px src=" + lib.assetURL +
						"extension/笨蛋插件/image/ui/烈弓（手杀）.png><br><b><font color=\"#FF6020\">手杀样式";
					break;
				case "olten":
					node.innerHTML = "<img style=width:60px src=" + lib.assetURL +
						"extension/笨蛋插件/image/ui/烈弓（十周年）.png><br><b><font color=\"#FFFF00\">十周年样式";
					break;
				case "ol":
					node.innerHTML = "<img style=width:60px src=" + lib.assetURL +
						"extension/笨蛋插件/image/ui/烈弓（OL）.png><br><b><font color=\"#dc9619\">OL样式";
					break;
			}
		},
		onclick:function(value){
			game.saveConfig('extension_笨蛋插件_Fool_liegong',value);
			lib.config.Fool_liegong=value;
			game.saveConfig("Fool_liegong",value);
			//if(confirm("设置完毕重启后生效\n是否重启？")) game.reload();
		},
	},
	//此功能有bug，已弃用
	/*"Fool_chooseCard":{
		"name":"<b><font color=\"#ab89d4\">选择卡牌优化",
		"init":false,
		"intro":"开启后，在需要选择装备区内的牌时，会复制牌进手牌区，方便点击选择。<br>开启后，重启生效",
		onclick:function(value){
			game.saveConfig('extension_笨蛋插件_Fool_chooseCard',value);
			lib.config.Fool_chooseCard=value;
			game.saveConfig("Fool_chooseCard",value);
			if(confirm("设置完毕重启后生效\n是否重启？")) game.reload();
		},
	},*/
	"Fool_derivationSkill":{
		"name":"<b><font color=\"#ccad76\">衍生技能详细显示",
		"init":false,
		"intro":"开启后，将在扩展加载时为技能的衍生技添加详细显示功能（只能检索技能<span style='font-family: yuanli'>content</span>中<span style='font-family: yuanli'>Skill()</span>和<span style='font-family: yuanli'>SkillLog()</span>内的衍生技能）<br>适配手杀ui资料页和其他武将界面美化扩展的资料页<br><font color=\"#FF0000\">注：部分玄学bug问题待修复，可能与部分魔改的手杀ui（已知萌修版无问题）和如真似幻不兼容。",
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
    intro:"总之就是优化优化！统统优化一遍！如果你是笨蛋的话，一定不要错过哦～",
    author:"铝宝<br>版本：v2.0.2",
    diskURL:"",
    forumURL:"",
    version:"2.0.2",
},files:{"character":[],"card":[],"skill":[]},
        editable: false
    };
});