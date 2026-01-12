'use strict';
decadeModule.import(function(lib, game, ui, get, ai, _status) {
    /*直接检索手杀的斗地主豆子*/
    game.jiaojia = function(a) {
       try{var adiv = document.getElementById('arena');
        if (!adiv) return;
        var bElement = document.getElementById('message-container');
        if (!bElement) return;
        var nextElement = bElement.nextElementSibling;
        nextElement.style.zIndex = 8;
        if (nextElement&&nextElement.innerText && typeof nextElement.innerText == 'string' && nextElement.innerText.indexOf('00') != -1) nextElement.innerText = a;}
        catch(e){}
    }
    game.dizhudu = function() {
     try{ var adiv = document.body;
        if (!adiv) return;
        var bElement = document.getElementById('statusbg');
        if (!bElement) return;
        var nextElement = bElement.nextElementSibling;
      //  if(!bElement.nextElementSibling)return;
        var nextElement1 = nextElement.nextElementSibling;
        if (tipshow) tipshow.style.zIndex = 6;
        if (nextElement&&nextElement.innerText && typeof nextElement.innerText == 'string' && nextElement.innerText.indexOf('本场') != -1) {
            nextElement.style.zIndex = 6;
            if (nextElement.innerText == '本场叫价') nextElement.innerText = '本场底注';
            else nextElement.innerText = '本场叫价';
            if(window.shoushaBlanks&&!window.shoushaBlanks.contains(nextElement)) {
                window.shoushaBlanks.add(nextElement);
            }
            return
        }
        if (nextElement1&&nextElement1.innerText && typeof nextElement1.innerText == 'string' && nextElement1.innerText.indexOf('本场') != -1) {
            nextElement1.style.zIndex = 6;
            if (nextElement1.innerText == '本场叫价') nextElement1.innerText = '本场底注';
            else nextElement1.innerText = '本场叫价';
            if(window.shoushaBlanks&&!window.shoushaBlanks.contains(nextElement1)) {
                window.shoushaBlanks.add(nextElement1);
            }
            return
        }}
        catch(e){}
    }
    //重构choosecontrol框架
    //提供一个新接口
    //传入参数里添加newpng，src=和.jpg可以指定新样式使用指定位置的图片
    lib.element.player.chooseControl = function() {
        var next = game.createEvent('chooseControl');
        next.controls = [];
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == 'string') {
                if (arguments[i] == 'dialogcontrol') {
                    next.dialogcontrol = true;
                } else if (arguments[i] == 'seperate') {
                    next.seperate = true;
                } else if (arguments[i] == 'newpng') {
                    next.newpng = true;
                } else if (arguments[i].indexOf('src=')!=-1) {
                    next.picsrc = arguments[i].slice(4);
                } else if (arguments[i] == 'jpg') {
                    next.pictype = 'jpg';
                } else {
                    next.controls.push(arguments[i]);
                }
            } else if (Array.isArray(arguments[i])) {
                next.controls = next.controls.concat(arguments[i]);
            } else if (typeof arguments[i] == 'function') {
                next.ai = arguments[i];
            } else if (typeof arguments[i] == 'number') {
                next.choice = arguments[i];
            } else if (get.itemtype(arguments[i]) == 'dialog') {
                next.dialog = arguments[i];
            }
        }
        next.player = this;
        if (next.choice == undefined) next.choice = 0;
        if (!next.picsrc) next.picsrc = 'extension/十周年UI/image/vdcard/';
        if (!next.pictype) next.pictype = '.png';
        if (next.newpng) next.setContent('chooseControlnew');
        else next.setContent('chooseControl');
        next._args = Array.from(arguments);
        next.forceDie = true;
        return next;
    };
    lib.element.content.chooseControlnew = function() { //新样式control
        "step 0"
        if (event.controls.length == 0) {
            event.finish();
            return;
        }
        //window.canNoShowSearch=true;
        var olds='';
        if(lib.config['extension_无名补丁_xindchoose_old']) olds='_old';
        if (event.isMine()) {
                event.controlbars = [];
                for (var i = 0; i < event.controls.length; i++) {
                    let cl = ui.create.control([event.controls[i]]);
                    cl.classList.add('dou');
                    cl.childNodes[0].setBackgroundImage(event.picsrc + cl.innerText + olds + event.pictype);
                    event.controlbars.push(cl);
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
            event.result = {};
            if (event.ai) {
                var result = event.ai(event.getParent(), player);
                if (typeof result == 'number') event.result.control = event.controls[result];
                else event.result.control = result;
            } else event.result.control = event.controls[event.choice];
        }
        event.result.index = event.controls.indexOf(event.result.control);
        event.choosing = false;
        _status.imchoosing = false;
        if (event.controlbar) event.controlbar.close();
        if (event.controlbars) {
            for (var i = 0; i < event.controlbars.length; i++) {
                event.controlbars[i].close();
            }
        }
        event.resume();
        //window.canNoShowSearch=false;
    };
    game.chooseCharacterHuanle = function() { //修改欢乐斗地主选将函数，包括但不限于进度条，倍率，左上角数字变化等
        ui.background.style.zIndex = '6';
        //.dataset.mode = get.mode();
        var next = game.createEvent('chooseCharacter', false);
        next.setContent(function() {
            "step 0"
            //window.canNoShowSearch=true;
            game.no_continue_game = true;
            lib.init.onfree();
            game.jiaojia(100);
            game.dizhudu();
            "step 1"
            ui.arena.classList.add('choose-character');
            game.no_continue_game = true;
            var i;
            event.list = [];
            event.list2 = [];
            var list4 = [];
            if (!event.map) event.map = {};
            for (i in lib.characterReplace) {
                var ix = lib.characterReplace[i];
                for (var j = 0; j < ix.length; j++) {
                    if (lib.filter.characterDisabled(ix[j])) ix.splice(j--, 1);
                }
                if (ix.length) {
                    var name = ix.randomGet();
                    event.list.push(name);
                    if (game.recommendDizhu.contains(name)) event.list2.push(name);
                    list4.addArray(ix);
                }
            }
            for (i in lib.character) {
                if (list4.contains(i) || lib.filter.characterDisabled(i)) continue;
                event.list.push(i);
                if (game.recommendDizhu.contains(i)) event.list2.push(i);
            }
            event.list.randomSort();
            _status.characterlist = event.list.slice(0);
            event.controls = ['不叫', '一倍', '两倍', '三倍'];
            for (var player of game.players) {
                var id = player.playerid;
                if (!event.map[id]) event.map[id] = [];
                event.map[id].addArray(event.list2.randomRemove(1));
                event.list.removeArray(event.map[id]);
                event.map[id].addArray(event.list.randomRemove(4 - event.map[id].length));
                event.list2.removeArray(event.map[id]);
            }
            event.listk = event.map[game.me.playerid].slice(0, 3)
            event.dialog = ui.create.dialognew('', [event.listk, 'character'], '#chooseable');
            for (let i = 0; i < event.listk.length; i++) {
                for (j in dizhuqiangdu) {
                    if (dizhuqiangdu[j].indexOf(event.listk[i]) != -1) {
                        let k = ui.create.div('.dizhuqiangdu', ui.dialog.buttons[i]);
                        k.setBackgroundImage('extension/十周年UI/assets/image/' + j + '.png');
                        break;
                    }
                }
            }
            let zhuanshu = ui.create.div('.zhuanshu');
            ui.create.div('.zhuanshubiao', zhuanshu);
            zhuanshu.classList.add('button');
            zhuanshu.classList.add('character');
            ui.dialog.content.querySelector('.buttons')
                .appendChild(zhuanshu);
            let zhuanshu2 = ui.create.div('.zhuanshu');
            ui.create.div('.zhuanshubiao', zhuanshu2);
            zhuanshu2.classList.add('button');
            zhuanshu2.classList.add('character');
            ui.dialog.content.querySelector('.buttons')
                .appendChild(zhuanshu2)
            event.start = game.players.randomGet();
            event.current = event.start;
            game.delay(5);
            ui.dizhutip = ui.create.div('.dizhutip', ui.arena);
            ui.nmjindutiao = ui.create.div('.nmjindutiao', ui.arena);
            ui.nmjindutiaox = ui.create.div('.nmjindutiaox', ui.arena);
            "step 2"
            event.current.classList.add('glow_phase');
            ui.nmjindutiaox.remove();
            delete ui.nmjindutiaox;
            //ui.nmjindutiaox.style.animation = 'none';
            //void ui.nmjindutiaox.offsetWidth; // 强制重绘
            ui.nmjindutiaox = ui.create.div('.nmjindutiaox', ui.arena);
            if (event.current == game.me) {
                ui.dizhutip.innerHTML = '请选择押注倍数，叫3倍直接成为地主';
            } else {
                ui.dizhutip.innerHTML = '正在等待其他人压注';
                game.delay(2);
            }
            event.current.chooseControl(event.controls, 'newpng')
                .set('ai', function() {
                return _status.event.getParent()
                    .controls.randomGet();
            });
            "step 3"
            event.current.classList.remove('glow_phase');
            event.current._control = result.control;
            event.current.chat(result.control);
            if (result.control == '三倍') {
                game.jiaojia(300);
                game.zhu = event.current;
                return;
            } else if (result.control != '不叫') {
                event.controls.splice(0, event.controls.indexOf(result.control) + 1);
                event.controls.unshift('不叫');
                event.tempDizhu = event.current;
                if (result.control == '两倍') game.jiaojia(200)
            }
            event.current = event.current.next;
            if (event.current == event.start) {
                game.zhu = event.tempDizhu || event.start.previous;
            } else event.goto(2);
            if (event.current == event.start.previous && !event.tempDizhu) event.controls.remove('不叫');
            "step 4"
            for (var player of game.players) {
                player.identity = player == game.zhu ? 'zhu' : 'fan';
                player.showIdentity();
            }
            event.dialog.close();
            event.map[game.zhu.playerid].addArray(event.list.randomRemove(3));
            "step 5"
            ui.nmjindutiaox.remove();
            delete ui.nmjindutiaox;
            //ui.nmjindutiaox.style.animation = 'none';
            //void ui.nmjindutiaox.offsetWidth; // 强制重绘
            ui.nmjindutiaox = ui.create.div('.nmjindutiaox', ui.arena);
            if (game.me == game.zhu) event.listc = event.map[game.me.playerid].slice(0, 5);
            else event.listc = event.map[game.me.playerid].slice(0, 3);
            //dialog = ui.create.dialog('可选武将', 'hidden', [event.listc, 'characterx']);
            dialog = ui.create.dialog('hidden');
            dialog.isNoTouch = true;
            ['可选武将', [event.listc, 'characterx']].forEach(item=>{
                dialog.add(item);
            });
            let checkToFix = function(redo) {
                if(dialog.content.childNodes.length>1) {
                    //选将列表
                    dialog.content.childNodes[1].style.marginTop='45px';
                }else {
                    setTimeout(function() {
                        redo();
                    },1000);
                }
            };
            checkToFix(checkToFix);
            if (game.me == game.zhu) {
                for (let i = 0; i < dialog.buttons.length; i++) {
                    for (j in dizhuqiangdu) {
                        if (dizhuqiangdu[j].indexOf(event.listc[i]) != -1) {
                            if (!dialog.buttons[i].qiangdu) dialog.buttons[i].qiangdu = ui.create.div('.dizhuqiangdu', dialog.buttons[i]);
                            dialog.buttons[i].qiangdu.setBackgroundImage('extension/十周年UI/assets/image/' + j + '.png');
                            break;
                        } else {
                            if (dialog.buttons[i].qiangdu) dialog.buttons[i].qiangdu.remove();
                            delete dialog.buttons[i].qiangdu;
                        }
                    }
                }
                for (let t = 0; t < dialog.buttons.length; t++) {
                    /*if (dialog.buttons[t].node.replaceButton) dialog.buttons[t].node.replaceButton.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function() {
                        for (j in dizhuqiangdu) {
                            if (dizhuqiangdu[j].indexOf(dialog.buttons[t].link) != -1) {
                                if (!dialog.buttons[t].qiangdu) dialog.buttons[t].qiangdu = ui.create.div('.dizhuqiangdu', dialog.buttons[t]);
                                dialog.buttons[t].qiangdu.setBackgroundImage('extension/十周年UI/assets/image/' + j + '.png');
                                break;
                            } else {
                                if (dialog.buttons[t].qiangdu) dialog.buttons[t].qiangdu.remove();
                                delete dialog.buttons[t].qiangdu;
                            }
                        }
                    })*/
                    if (dialog.buttons[t].node.replaceButton) {
                        dialog.buttons[t].changeDiZhuQiangDu = function() {
                            for (j in dizhuqiangdu) {
                                if (dizhuqiangdu[j].indexOf(dialog.buttons[t].link) != -1) {
                                    if (!dialog.buttons[t].qiangdu) dialog.buttons[t].qiangdu = ui.create.div('.dizhuqiangdu', dialog.buttons[t]);
                                    dialog.buttons[t].qiangdu.setBackgroundImage('extension/十周年UI/assets/image/' + j + '.png');
                                    break;
                                } else {
                                    if (dialog.buttons[t].qiangdu) dialog.buttons[t].qiangdu.remove();
                                    delete dialog.buttons[t].qiangdu;
                                }
                            }
                        }
                    }
                }
            }
            dialog.classList.add('noupdate')
            dialog.id = 'identitychoose';
            dialog.classList.add('doudizhuxuan')
            game.me.chooseButton(dialog, true);
            ui.weizhitip = ui.create.div('.weizhitip', ui.arena);
            if (!ui.hjk) ui.hjk = ui.create.div('.hjk', document.body);
            ui.create.div('', ui.hjk)
                .innerHTML = '可换将次数10';
            ui.create.div('', ui.hjk)
                .innerHTML = '免费换将3';

            var num;
            if (game.me.identity == "zhu") {
                num = "<span style='color:orange;font-size:24px;'>第一个️</span>";
                ui.weizhitip.setBackgroundImage('extension/十周年UI/assets/image/1hao.png');
            }
            if (game.me.getPrevious()
                .identity == "zhu") {
                num = "<span style='color:green;font-size:24px;'>第二个️</span>";
                ui.weizhitip.setBackgroundImage('extension/十周年UI/assets/image/2hao.png');
            }
            if (game.me.getNext()
                .identity == "zhu") {
                num = "<span style='color:green;font-size:24px;'>第三个️</span>";
                ui.weizhitip.setBackgroundImage('extension/十周年UI/assets/image/3hao.png');
            }
            ui.dizhutip.innerHTML = "你是" + num + "行动，请选择你的武将";
            game.dizhudu();
            //    jiaojia.innerText = "本场叫价";
            //选将提示并将左上角从底注改为叫价	
            "step 6"
            event.rename = result.links[0];
            var name = event.rename;
            var list = false;
            if (get.is.double(name)) {
                game.me._groupChosen = true;
                list = get.is.double(name, true);
            } else if (get.config('choose_group') && (lib.character[name][1] == 'shen'||lib.character[name][1] == 'devil') && !lib.character[name][4].contains('hiddenSkill')) {
                list = lib.group.slice(0);
                list.remove('shen');
                list.remove('devil');
            }
            if (list) {
                /*var dialog = ui.create.dialognew('#choosegroup', '选择国籍<img src=' + lib.assetURL + 'extension/十周年UI/assets/image/arrow.png' + ' style=width:30px;height:25px;margin-bottom:5px;left:2px;/>', [list, 'vcard']);
                event.next1 = game.createEvent('chooseGroup');
                event.next1.dialog = dialog;
                event.next1.setContent(function() {
                    game.me.chooseButton(1, event.dialog, true)
                        .set('newconfirm1', true);
                })
                ui.dizhutip.innerHTML = "<span style='font-size:20px;color:#ebc914;;'>请选择你要变成的势力️</span>";
                ui.dizhutip.style.bottom = '110px';
                ui.nmjindutiaox.style.bottom = '140.2px';
                ui.nmjindutiao.style.bottom = '140px';*/
                //var dialog = ui.create.dialognew('#choosegroup', '选择国籍<img src=' + lib.assetURL + 'extension/十周年UI/assets/image/arrow.png' + ' style=width:30px;height:25px;margin-bottom:5px;left:2px;/>',' ',' ', [list, 'vcard']);//left:2px
                var dialog = ui.create.dialognew('#choosegroup', game.changeToGoldTitle('选择国籍', true, 40),' ',' ', [list, 'vcard']);//left:2px
                    event.next1 = game.createEvent('chooseGroup');
                    event.next1.dialog = dialog;
                    event.next1.setContent(function() {
                        //game.me.chooseButton(1, event.dialog, true).set('newconfirm1', true).set('auto', true)/*不展示确认按钮*/;
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
                                setTimeout(function(){
						            ui.click.ok();
						        },500);
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
                        }).set('newconfirm1', true).set('auto', true)/*不展示确认按钮*/;
                    })
                    ui.dizhutip.innerHTML = "<span style='font-size:23px;color:rgba(255,255,255,1);opacity:0.8'>请选择你要变成的势力️</span>";
                    //ui.dizhutip.innerHTML = "<span style='font-size:20px;color:#ebc914;;'>请选择你要变成的势力️</span>";
                    //ui.dizhutip.style.bottom = '110px';
                    ui.dizhutip.style.bottom = "125px";
                    ui.nmjindutiaox.hide();
                    ui.nmjindutiao.hide();
                    /*ui.nmjindutiaox.style.bottom = '140.2px';
                    ui.nmjindutiao.style.bottom = '140px';*/
            }
            "step 7"
            if (event.next1) event.group = event.next1._result.links[0][2];
            game.me.init(event.rename);
            ui.nmjindutiao.remove();
            delete ui.nmjindutiao;
            ui.nmjindutiaox.remove();
            delete ui.nmjindutiaox;
            if (ui.weizhitip) ui.weizhitip.remove();
            delete ui.weizhitip;
            if (ui.dizhutip) ui.dizhutip.remove();
            delete ui.dizhutip;
            if (ui.hjk) ui.hjk.remove();
            delete ui.hjk;
            /*for (var player of game.players) {
                if (player != game.me) {
                    player.init(event.map[player.playerid].randomGet());
                    if (player.group == 'shen') {
                        player.group = lib.group.slice(0)
                            .remove('shen')
                            .randomGet();
                        player.node.name.dataset.nature = get.groupnature(player.group);

                    }
                }
            }*/
            var offline=sessionStorage.getItem('Network');
            if(!offline) offline='online';
            if(offline=='online'&&lib.config.extension_斗转星移_AIqianghuaXuanjiang&&window.dzxy){
			    for(var player of game.players){
    			//修改开始
    				if(player!=game.me){
    				    //game.log('强化选将生效');
				        //game.log('已匹配高强度对手…');
    				    var listc;
        		        if(player==game.zhu){
        			        listc=dzxy.charSort(event.map[player.playerid],'地主');
        			        //80%概率选第一个
            		        if(Math.random()<0.8) player.init(listc[0]);
            		        else{
            		            let score1=dzxy.getRankScore(listc[0],'地主');
            		            let score2=dzxy.getRankScore(listc[1],'地主');
            		            //差距1分以内
            		            if(score1-score2<=1&&score2!=0) player.init(listc[1]);
            		            else player.init(listc[0]);
            		        }
        			    }
        			    else{
        			        listc=dzxy.charSort(event.map[player.playerid],'农民');
            			    //70%概率选第一个
            		        if(Math.random()<0.7) player.init(listc[0]);
            		        else{
            		            let score1=dzxy.getRankScore(listc[0],'农民');
            		            let score2=dzxy.getRankScore(listc[1],'农民');
            		            //差距2分以内
            		            if(score1-score2<=2&&score2!=0) player.init(listc[1]);
            		            else player.init(listc[0]);
            		        }
        			    }
        			    if (get.config('choose_group') && (player.group == 'shen'||player.group == 'devil')) {
                            var noG=lib.group.slice(0)
                                .remove('shen')
                                .remove('devil');
                            if(lib.character&&player.name&&lib.character[player.name]&&lib.character[player.name][4]&&Math.random()<0.75) {
                                for(var i=0;i<noG.length;i++) {
                                    if(lib.character[player.name][4].contains(noG[i])) {
                                        player.group = noG[i];
                                    }
                                }
                            }
                            if (player.group == 'shen'||player.group == 'devil') {
                                player.group = lib.group.slice(0)
                                    .remove('shen')
                                    .remove('devil')
                                    .randomGet();
                            }
                            player.node.name.dataset.nature = get.groupnature(player.group);
                        }
    				    //player.init(event.map[player.playerid].randomGet());
    				}
    		    //修改结束
    			}
			}else {
				for(var player of game.players){
					//if(player!=game.me) player.init(event.map[player.playerid].randomGet());
					if (player != game.me) {
                        player.init(event.map[player.playerid].randomGet());
                        if(get.config('choose_group')) {
                            if(lib.character&&player.name&&lib.character[player.name]&&lib.character[player.name][4]&&Math.random()<0.75) {
                                var noG=lib.group.slice(0)
                                    .remove('shen')
                                    .remove('devil');
                                for(var i=0;i<noG.length;i++) {
                                    if(lib.character[player.name][4].contains(noG[i])) {
                                        player.group = noG[i];
                                        player.node.name.dataset.nature = get.groupnature(player.group);
                                    }
                                }
                            }
                            if (player.group == 'shen'||player.group == 'devil') {
                                player.group = lib.group.slice(0)
                                    .remove('shen')
                                    .remove('devil')
                                    .randomGet();
                                player.node.name.dataset.nature = get.groupnature(player.group);
                            }
                        }
                    }
				}
			}
			//Helasisy修：进行一轮检测
			//alert(_status.characterlist);
			for(var player of game.players){
				if (player != game.me) {
				    if(!player.name||game.hasPlayer(p=>p.name==player.name)) {
				        var name=_status.characterlist.filter(n=>!game.hasPlayer(p=>p.name==n)).randomGet();
				        player.init(name);
				        //神势力神势力！
				        if(get.config('choose_group')) {
    				        if(lib.character&&player.name&&lib.character[player.name]&&lib.character[player.name][4]&&Math.random()<0.75) {
                                var noG=lib.group.slice(0)
                                    .remove('shen')
                                    .remove('devil');
                                for(var i=0;i<noG.length;i++) {
                                    if(lib.character[player.name][4].contains(noG[i])) {
                                        player.group = noG[i];
                                        player.node.name.dataset.nature = get.groupnature(player.group);
                                    }
                                }
                            }
                            if (player.group == 'shen'||player.group == 'devil') {
                                player.group = lib.group.slice(0)
                                    .remove('shen')
                                    .remove('devil')
                                    .randomGet();
                                player.node.name.dataset.nature = get.groupnature(player.group);
                            }
                        }
				    }
				}
			}
            game.zhu.hp++;
            game.zhu.maxHp++;
            game.zhu.update();
            "step 8"
            if (event.group) {
                game.me.group = event.group;
                game.me.node.name.dataset.nature = get.groupnature(game.me.group);
                game.me.update();
            }
            for (var i = 0; i < game.players.length; i++) {
                _status.characterlist.remove(game.players[i].name1);
                _status.characterlist.remove(game.players[i].name2);
            }
            ui.background.style.zIndex = '-2'
            setTimeout(function() {
                ui.arena.classList.remove('choose-character');
                //window.canNoShowSearch=false;
            }, 500);
        });
    }
})