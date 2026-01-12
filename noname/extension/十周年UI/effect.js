'use strict';
decadeModule.import(function(lib, game, ui, get, ai, _status){
	decadeUI.effect = {
		dialog:{
			create:function(titleText){
				return decadeUI.dialog.create('effect-dialog dui-dialog');
			},
			compare:function(source, target){
				var dialog = this.create();
				
				dialog.characters = [
					decadeUI.dialog.create('player1 character', dialog),
					decadeUI.dialog.create('player2 character', dialog)
				];
				
				decadeUI.dialog.create('back', dialog.characters[0]),
				decadeUI.dialog.create('back', dialog.characters[1]),
				
				dialog.content = decadeUI.dialog.create('content', dialog),
				dialog.buttons = decadeUI.dialog.create('buttons', dialog.content)
				
				dialog.cards = [
					decadeUI.dialog.create('player1 card', dialog.buttons),
					decadeUI.dialog.create('player2 card', dialog.buttons)
				];
				
				dialog.names = [
					decadeUI.dialog.create('player1 name', dialog.buttons),
					decadeUI.dialog.create('player2 name', dialog.buttons)
				];

				dialog.buttons.vs = decadeUI.dialog.create('vs', dialog.buttons);
				dialog.names[0].innerHTML = get.translation(source) + '发起';
				dialog.names[1].innerHTML = get.translation(target);
				
				dialog.set = function(attr, value){
					switch (attr) {
						case 'player1':
						case 'source':
							if (get.itemtype(value) != 'player' || value.isUnseen()) {
								dialog.characters[0].firstChild.style.backgroundImage = '';
								dialog.names[0].innerHTML = get.translation(value) + '发起';
								return false;
							} 
							
							var avatar = value.isUnseen(0) ? value.node.avatar2 : value.node.avatar;
							dialog.characters[0].firstChild.style.backgroundImage =  avatar.style.backgroundImage;
							dialog.names[0].innerHTML = get.translation(value) + '发起';
							break;
						
						case 'player2':
						case 'target':
							if (get.itemtype(value) != 'player' || value.isUnseen()) {
								dialog.characters[1].firstChild.style.backgroundImage = '';
								dialog.names[1].innerHTML = get.translation(value);
								return false;
							} 
							
							var avatar = value.isUnseen(0) ? value.node.avatar2 : value.node.avatar;
							dialog.characters[1].firstChild.style.backgroundImage =  avatar.style.backgroundImage;
							dialog.names[1].innerHTML = get.translation(value);
							break;
						
						case 'card1':
						case 'sourceCard':
							if (dialog.cards[0].firstChild) dialog.cards[0].removeChild(dialog.cards[0].firstChild);
							dialog.cards[0].appendChild(value);
							break;
						
						case 'card2':
						case 'targetCard':
							if (dialog.cards[1].firstChild) dialog.cards[1].removeChild(dialog.cards[1].firstChild);
							dialog.cards[1].appendChild(value);
							break;
						
						default:
							return false;
					}
					
					return true;
				},
				
				dialog.set('source', source);
				dialog.set('target', target);
				return dialog;
			},
		},
		line:function(dots){
			decadeUI.animate.add(function(source, target, e){
				var ctx = e.context;
				//ctx.shadowColor = 'Blue';
				ctx.shadowBlur = 1;
				
				if (!this.head) this.head = 0;
				if (!this.tail) this.tail = -1;
				
				this.head += 0.07 * (e.deltaTime / 17);
				if (this.head >= 1) {
					this.head = 1;
					this.tail += (0.07 * (e.deltaTime / 17));
				}
				//指示线
				var tail = this.tail < 0 ? 0 : this.tail;
				var head = this.head;
				if (this.tail <= 1) {
					var x1 = decadeUI.get.lerp(source.x, target.x, tail);
					var y1 = decadeUI.get.lerp(source.y, target.y, tail);
					var x2 = decadeUI.get.lerp(source.x, target.x, head);
					var y2 = decadeUI.get.lerp(source.y, target.y, head);
					e.drawLine(x1, y1, x2, y2, 'rgb(255,220,231)', 2.8);
					return false;
				} else {
					return true;
				}
			}, true, { x: dots[0], y: dots[1] }, { x: dots[2], y: dots[3] });
		},
		
		kill:function(source, target){
			if (get.itemtype(source) != 'player' || get.itemtype(target) != 'player') throw 'arguments';
			if (source == target) return;
			
			if (source.isUnseen() || target.isUnseen()) return;
			
			var sourceAvatar = source.isUnseen(0) ? source.node.avatar2 : source.node.avatar;
			var targetAvatar = target.isUnseen(0) ? target.node.avatar2 : target.node.avatar;
			
			var effect = decadeUI.dialog.create('effect-window');
			var killerWarpper = decadeUI.dialog.create('killer-warpper', effect);
			killerWarpper.killer = decadeUI.dialog.create('killer', killerWarpper);
			killerWarpper.killer.style.backgroundImage = sourceAvatar.style.backgroundImage;
			
			
			var victim = decadeUI.dialog.create('victim', effect);
			victim.back = decadeUI.dialog.create('back', victim);
			victim.back.part1 = decadeUI.dialog.create('part1', victim.back);
			victim.back.part2 = decadeUI.dialog.create('part2', victim.back);
			victim.back.part1.style.backgroundImage = targetAvatar.style.backgroundImage;
			victim.back.part2.style.backgroundImage = targetAvatar.style.backgroundImage;
			
			effect.style.backgroundColor = 'rgba(0,0,0,0.7)';
			effect.style.transition = 'all 4s';
			effect.style.zIndex = 7;
			
			var anim = decadeUI.animation;
			var bounds = anim.getSpineBounds('effect_jisha1');
			var bounds = anim.getSpineBounds('SF_guanjie_eff_jisha');
			
			game.playAudio('../extension', decadeUI.extensionName, 'audio/kill_effect_sound.mp3');
			if (bounds == void 0) {
				var lightLarge = decadeUI.dialog.create('li-big', effect);
				victim.rout = decadeUI.dialog.create('rout', victim);
				victim.rout2 = decadeUI.dialog.create('rout', victim);
				victim.rout.innerHTML = '破敌';
				victim.rout2.innerHTML = '破敌';
				victim.rout2.classList.add('shadow');
				ui.window.appendChild(effect);
				var height = ui.window.offsetHeight;
				var x, y , scale;
				for (var i = 0; i < 10; i++) {
					x = decadeUI.getRandom(0, 100) + 'px';
					y = decadeUI.getRandom(0, height / 4) + 'px';
					x = decadeUI.getRandom(0, 1) == 1 ? x : '-' + x;
					y = decadeUI.getRandom(0, 1) == 1 ? y : '-' + y;
					scale = decadeUI.getRandom(1, 10) / 10;
					
					setTimeout(function(mx, my, mscale, meffect){
						var light = decadeUI.dialog.create('li', meffect);
						light.style.transform = 'translate(' + mx + ', ' + my + ')' + 'scale(' + mscale + ')';
					}, decadeUI.getRandom(50, 300), x, y, scale, effect);
				}
			} else {
				var sz = bounds.size;
				var scale = anim.canvas.width / sz.x * 0.5;
				anim.playSpine('effect_jisha1', { scale: scale });
				var num = [1,2,3,4,5,6,7].randomGet();
                        if(num==1){  
                        anim.playSpine({name:'SF_guanjie_eff_jisha',action:'play'}, {scale: 0.6 });
                        }  
                        if(num==2){
                         anim.playSpine({name:'SF_guanjie_eff_jisha',action:'play2'}, {scale: 0.6 });
                        }
                        if(num==3){  
                        anim.playSpine({name:'SF_guanjie_eff_jisha',action:'play3'}, {scale: 0.6 });
                        }
                        if(num==4){  
                        anim.playSpine({name:'SF_guanjie_eff_jisha',action:'play4'}, {scale: 0.6 });
                        }
                        if(num==5){  
                        anim.playSpine({name:'SF_guanjie_eff_jisha',action:'play5'}, {scale: 0.6 });
                        }
                        if(num==6){  
                        anim.playSpine({name:'SF_guanjie_eff_jisha',action:'play6'}, {scale: 0.6 });
                        }
                        if(num==7){  
                        anim.playSpine({name:'SF_guanjie_eff_jisha',action:'play7'}, {scale: 0.6 });
                        }
				ui.window.appendChild(effect);
				ui.refresh(effect);
			}
			
			decadeUI.delay(2000);
			effect.style.backgroundColor = 'rgba(0,0,0,0)';
			effect.close(3000);
			effect = null;
		},
		
		skill:function(player, skillName, vice){
		if (lib.config.extension_十周年UI_newDecadeStyle == 'on') {
			if (get.itemtype(player) != 'player') return console.error('player');
			
			var animation = decadeUI.animation;
			var asset = animation.spine.assets['effect_xianding'];
			if (!asset) return console.error('[effect_xianding]特效未加载');
			if (!asset.ready) animation.prepSpine('effect_xianding');
			
			var camp = player.group;
			var playerName, playerAvatar;
			if (vice === 'vice') {
				playerName = get.translation(player.name2);
				playerAvatar = player.node.avatar2;
			} else {
				playerName = get.translation(player.name);
				playerAvatar = player.node.avatar;
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

					var effect = decadeUI.element.create('effect-window');
					effect.view.skillName = decadeUI.element.create('skill-name', effect);
					effect.view.skillName.innerHTML = skillName;
					effect.view.skillName.style.top = 'calc(50% + ' + 165 * sprite.scale + 'px)';
			
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
		} else {
		var listm=[];          
        if(player.name1!=undefined) listm=lib.character[player.name1][3];
        var juexingji='';
        var xiandingji='';
        var shimingji ='';
        for(var i=0;i<listm.length;i++){
        if(get.info(listm[i]).juexingji){
        var juexingji=true;
        }else if(get.info(listm[i]).limited){
        var xiandingji=true;
        }else if(get.info(listm[i]).dutySkill){
        var shimingji=true;
        }       
        }         
        var zoomlist={
            normal:1,
            small:0.95,
            vsmall:0.9,
            esmall:0.8,
        }
        var scales=1;
        if(zoomlist[lib.config.ui_zoom]) scales=1/zoomlist[lib.config.ui_zoom];
        if(juexingji==true){
          if(lib.config.ui_zoom.indexOf('small')==-1) {
            decadeUI.animation.playSpine({ name:'juexingji',speed:1.2,},{ scale:0.8*scales,y:[0,0.523]});
          }else {
            decadeUI.animation.playSpine({ name:'juexingji',speed:1.2,},{ scale:0.8*scales,y:[0,0.523],x:[0,0.497]});
          }
        var avatar_wenzhi = ui.create.div('.guaguazhendeshuai',ui.arena);}
        else if(xiandingji==true){
        decadeUI.animation.playSpine({ name:'xiandingji',speed:1.2,},{ scale:1*scales});
        var avatar_wenzhi = ui.create.div('.xiguazhendeshuai',ui.arena);}
        else if(shimingji==true){
        decadeUI.animation.playSpine({ name:'shimingji',speed:1.2,},{ scale:1*scales});
        var avatar_wenzhi = ui.create.div('.xixizhendeshuai',ui.arena);}
        else{
        decadeUI.animation.playSpine({ name:'xiandingji',speed:1.2,},{ scale:1*scales});
        var avatar_wenzhi = ui.create.div('.xiguazhendeshuai',ui.arena);
        }        
	       var avatar = ui.create.div('.guaguadashuaibi',ui.arena);
           avatar.style.backgroundImage = player.node.avatar.style.backgroundImage;
           avatar_wenzhi.innerHTML = skillName;}}

	};
});

