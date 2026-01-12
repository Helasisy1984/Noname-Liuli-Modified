game.import("extension", function (lib, game, ui, get, ai, _status) {
    return {
        name: "手杀MVP",
        editable: false,
        content: function (config, pack) {
        //结算界面
       if(lib.config.extension_手杀MVP_shoushajiesuan==true){
        lib.init.css(lib.assetURL + 'extension/手杀MVP/', 'extension');
            //mvp分数抄自mvp扩展
            ['jiesuanGongji', 'jiesuanZhiLiao', 'jiesuanFuZhu', 'jiesuanChengFa'].forEach(value => {
                HTMLDivElement.prototype[value] = 0;
            });
            HTMLDivElement.prototype.jiesuanJushi = 100;
            Object.defineProperty(HTMLDivElement.prototype, 'JieSuanmvpCount', {
                get: function () {
                    return this.jiesuanGongji + this.jiesuanZhiLiao + this.jiesuanFuZhu + this.jiesuanJushi - this.jiesuanChengFa;
                },
                set: function () {
                },
            });
            lib.skill['_shoushajiesuan-effect1'] = {
                trigger: {
                    player: 'useCard',
                    source: 'damageSource',
                },
                direct: true,
                forced: true,
                firstDo: true,
                silent: true,
                popup: false,
                filter: function (event, player, name) {
                    if (name === 'useCard') {
                        if (!event.card) return false;
                        if (get.tag({ name: event.card.name }, 'damage')) return true;
                        if (event.card.name === 'wuxie') return true;
                        if (get.info(event.card).toself || get.type(event.card) !== 'trick') return false;
                        if (get.info(event.card).selectTarget === -1 || get.info(event.card).selectTarget > 1) return true;
                        return false;
                    }
                    if (event.player == event.source) return false;
                    if (event.source.identity == 'nei') return true;
                    return get.attitude(event.source, event.player) < 0;
                },
                content: function () {
                    if (event.triggername === 'damageSource') {
                        if (get.attitude(trigger.source, trigger.player) < 0 || trigger.source.identity == 'nei') trigger.num > 5 ? trigger.source.jiesuanGongji += 15 : trigger.source.jiesuanGongji += 3 * trigger.num;
                    } else if (trigger.card) {
                        if (get.tag({ name: trigger.card.name }, 'damage'))
                            player.jiesuanGongji += 2
                        if (trigger.card.name === 'wuxie')
                            player.jiesuanFuZhu += 2;
                        if ((get.info(trigger.card).selectTarget === -1 || get.info(trigger.card).selectTarget > 1) && (!get.info(trigger.card).toself && get.type(trigger.card) === 'trick'))
                            player.jiesuanFuZhu += 1;
                    }
                }
            }
            lib.skill['_shoushajiesuan-effect2'] = {
                trigger: { player: ['gainEnd', 'discardEnd'] },
                direct: true,
                forced: true,
                firstDo: true,
                silent: true,
                popup: false,
                filter: function (event, player, name) {
                    if (name === 'gainEnd') {
                        if (!event.source || event.source == player || !event.source.isIn()) return false;
                        //var evt=event.getl(event.source);
                        //if(!evt&&!evt.cards2&&evt.cards2.length===0) return false;
                        if (!event.cards || event.cards.length == 0) return false;
                        if (event.source.identity == 'nei') return true;
                        return event.player.getEnemies().contains(event.source);
                    }
                    if (name === 'discardEnd') {
                        if (!event.source || event.source == player || !event.source.isIn()) return false;
                        //var evt=event.getl(event.source);
                        //if(!evt&&!evt.cards2&&evt.cards2.length===0) return false;
                        if (!event.cards || event.cards.length == 0) return false;
                        if (event.source.identity == 'nei') return true;
                        return event.player.getEnemies().contains(event.source);
                    }
                },
                content: function () {
                    if (event.triggername == 'gainEnd') trigger.player.jiesuanFuZhu += 1 * trigger.cards.length;
                    if (event.triggername == 'discardEnd') trigger.source.jiesuanFuZhu += 1 * trigger.cards.length;
                },
            }
            lib.skill['_shoushajiesuan-effect3'] = {
                trigger: { player: 'recoverEnd' },
                direct: true,
                forced: true,
                firstDo: true,
                silent: true,
                popup: false,
                filter: function (event, player) {
                    if (!event.source || !event.source.isIn()) return false;
                    if (event.source.identity == 'nei') return true;
                    return event.player.getFriends().contains(event.source) || event.player == event.source;
                },
                content: function () {
                    trigger.num > 5 ? trigger.source.jiesuanZhiLiao += 10 : trigger.source.jiesuanZhiLiao += 2 * trigger.num;
                },
            }
            lib.skill['_shoushajiesuan-effect4'] = {
                trigger: { source: 'dieBegin' },
                direct: true,
                forced: true,
                firstDo: true,
                silent: true,
                popup: false,
                filter: function (event, player) {
                    return (event.source && event.source.isIn());
                },
                content: function () {
                    if (trigger.player.getFriends().contains(trigger.source)) {
                        trigger.source.jiesuanChengFa += 5;
                        if (trigger.source.identity == 'nei' && trigger.player.identity != 'zhu') {
                            trigger.source.jiesuanChengFa -= 5;
                            trigger.source.jiesuanGongji += 3;
                        }
                    }
                    if (trigger.player.getEnemies().contains(trigger.source)) {
                        trigger.source.jiesuanGongji += 3;
                    }
                },
            }
            lib.skill['_shoushajiesuan-effect5'] = {
                trigger: {
                    player: "enterGame",
                    global: ["roundStart", "gameStart"],
                },
                direct: true,
                forced: true,
                priority: Infinity,
                firstDo: true,
                silent: true,
                popup: false,
                content: function () {
                    if (!_status._shoushajiesuan_effect5) {
                        try {
                            var changValue = false;
                            var input = ui.commandnode.link.querySelector("input");
                            var Opt = Object.getOwnPropertyDescriptor(input.__proto__, "value");
                            Object.defineProperty(input, 'value', {
                                get: function () {
                                    var value = (Opt.get && Opt.get.call(this)) || '';
                                    if (value === '') changValue = false;
                                    else changValue = true
                                    return value;
                                },
                                set: function (v) {
                                    Opt.set.call(this, v);
                                },
                                configurable: true,
                            })
                            Array.from(ui.commandnode.parentElement.parentElement.querySelectorAll(".menubutton.round.highlight")).forEach(value => {
                                value.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function (event) {
                                    if ('作' === value.innerText && this.classList.contains('glowing')) {
                                        game.me.jiesuanChengFa += 3;
                                    } else if ('执' === value.innerText && changValue) {
                                        game.me.jiesuanChengFa += 3;
                                    }
                                }, true);
                            })
                        } catch (e) {
                            console.error("作弊加载失败：", e)
                        }
                        _status._shoushajiesuan_effect5 = true;
                    }
                },
            };
            game.over = function (result) {
                if (_status.over) return;
                //这里修一下托管的bug
                if(_status.auto) ui.click.auto();
                if (game.me._trueMe) game.swapPlayer(game.me._trueMe);
                var i, j, k, num, table, tr, td, dialog;
                _status.over = true;
                ui.control.show();
                ui.clear();
                game.stopCountChoose();
                game.pause();
                //清除本来的其他按钮
                //关闭按钮的函数：close
                if(ui.control&&ui.control.childNodes) {
                    ui.control.childNodes.forEach(node=>node.close());
                }
                if (ui.time3) {
                    clearInterval(ui.time3.interval);
                }
                if ((game.layout == 'long2' || game.layout == 'nova') && !game.chess) {
                    ui.arena.classList.add('choose-character');
                    ui.me.hide();
                    ui.mebg.hide()
                    ui.autonode.hide();
                    if (lib.config.radius_size != 'off') {
                        ui.historybar.style.borderRadius = '0 0 0 4px';
                    }
                }
                if (game.online) {
                    var dialog = ui.create.dialog();
                    dialog.noforcebutton = true;
                    dialog.content.innerHTML = result;
                    dialog.forcebutton = true;
                    var result2 = arguments[1];
                    if (result2 == true) {
                        dialog.content.firstChild.innerHTML = '战斗胜利';
                    }
                    else if (result2 == false) {
                        dialog.content.firstChild.innerHTML = '战斗失败';
                    }
                    ui.update();
                    dialog.add(ui.create.div('.placeholder'));
                    for (var i = 0; i < game.players.length; i++) {
                        var hs = game.players[i].getCards('h');
                        if (hs.length) {
                            dialog.add('<div class="text center">' + get.translation(game.players[i]) + '</div>');
                            dialog.addSmall(hs);
                        }
                    }
                    for (var j = 0; j < game.dead.length; j++) {
                        var hs = game.dead[j].getCards('h');
                        if (hs.length) {
                            dialog.add('<div class="text center">' + get.translation(game.dead[j]) + '</div>');
                            dialog.addSmall(hs);
                        }
                    }

                    dialog.add(ui.create.div('.placeholder.slim'));
                    if (lib.config.background_audio) {
                        if (result2 === true) {
                            game.playAudio('effect', 'win');
                        }
                        else if (result2 === false) {
                            game.playAudio('effect', 'lose');
                        }
                        else {
                            game.playAudio('effect', 'tie');
                        }
                    }
                    if (!ui.exit) {
                        ui.create.exit();
                    }
                    if (ui.giveup) {
                        ui.giveup.remove();
                        delete ui.giveup;
                    }
                    if (game.servermode) {
                        ui.exit.firstChild.innerHTML = '返回房间';
                        setTimeout(function () {
                            ui.exit.firstChild.innerHTML = '退出房间';
                            _status.roomtimeout = true;
                            lib.config.reconnect_info[2] = null;
                            game.saveConfig('reconnect_info', lib.config.reconnect_info);
                        }, 10000);
                    }
                    if (ui.tempnowuxie) {
                        ui.tempnowuxie.close();
                        delete ui.tempnowuxie;
                    }
                    if (ui.auto) ui.auto.hide();
                    if (ui.wuxie) ui.wuxie.hide();
                    if (game.getIdentityList) {
                        for (var i = 0; i < game.players.length; i++) {
                            game.players[i].setIdentity();
                        }
                    }
                    return;
                }
                if (lib.config.background_audio) {
                    if (result === true) {
                        game.playAudio('effect', 'win');
                    }
                    else if (result === false) {
                        game.playAudio('effect', 'lose');
                    }
                    else {
                        game.playAudio('effect', 'tie');
                    }
                }
                var resultbool = result;
                if (typeof resultbool !== 'boolean') {
                    resultbool = null;
                }
                window.addGoldFont=function(str,add){
                    //if(!add) add='';
                    //return '<span style="'+add+'background-image: linear-gradient(180deg, #f0d775 30%, #ab8c31 57%, #b0a04d 67%);	font-weight:bold; -webkit-background-clip: text; -webkit-text-fill-color: transparent; white-space: nowrap; -webkit-text-stroke: 0px rgba(38,37,34,0.5); text-shadow: none;">'+str+'</span>';
                    return game.addGoldFont(str,add+"#shadow;");
                }
                if (window.gzbjbg&&window.gzbjbg.style) window.gzbjbg.style.opacity=0;
                if (result === true) result = '战斗胜利';
                if (result === false) result = '战斗失败';
                if (result == undefined) result = '战斗结束';
                /*var resultCHG=function(result){
                    return addGoldFont(result,'font-size:27px;')+addGoldFont('▼','font-size:17px;');
                };
                result=game.modeGoldTitle(result);*/
                dialog = ui.create.dialog(result);
                //dialog.style.filter='drop-shadow(0 0 5px rgba(0,0,0,0.8))'; 
                dialog.noforcebutton = true;
                dialog.forcebutton = true;
                if (game.addOverDialog) {
                    game.addOverDialog(dialog, result);
                }
                if (typeof _status.coin == 'number' && !_status.connectMode) {
                    var coeff = Math.random() * 0.4 + 0.8;
                    var added = 0;
                    var betWin = false;
                    if (result.indexOf('战斗胜利')!=-1) {
                        result=game.modeGoldTitle(result);
                        if (_status.betWin) {
                            betWin = true;
                            _status.coin += 10;
                        }
                        _status.coin += 20;
                        if (_status.additionalReward) {
                            _status.coin += _status.additionalReward();
                        }
                        switch (lib.config.mode) {
                            case 'identity': {
                                switch (game.me.identity) {
                                    case 'zhu': case 'zhong': case 'mingzhong':
                                        if (get.config('enhance_zhu')) {
                                            added = 10;
                                        }
                                        else {
                                            added = 20;
                                        }
                                        break;
                                    case 'fan':
                                        if (get.config('enhance_zhu')) {
                                            added = 16;
                                        }
                                        else {
                                            added = 8;
                                        }
                                        break;
                                    case 'nei':
                                        added = 40;
                                        break;
                                }
                                added = added * (game.players.length + game.dead.length) / 8;
                                break;
                            }
                            case 'guozhan':
                                if (game.me.identity == 'ye') {
                                    added = 8;
                                }
                                else {
                                    added = 5 / get.totalPopulation(game.me.identity);
                                }
                                added = added * (game.players.length + game.dead.length);
                                break;
                            case 'versus':
                                if (_status.friend) {
                                    added = 5 * (game.players.length + _status.friend.length);
                                }
                                break;
                            default:
                                added = 10;
                        }
                    }
                    else {
                    added = 10;
                    }
                    if (lib.config.mode == 'chess' && _status.mode == 'combat' && get.config('additional_player')) {
                        added = 2;
                    }
                    _status.coin += added * coeff;
                    if (_status.coinCoeff) {
                        _status.coin *= _status.coinCoeff;
                    }
                    _status.coin = Math.ceil(_status.coin);
                    dialog.add(ui.create.div('', '获得' + _status.coin + '金'));
                    if (betWin) {
                        game.changeCoin(20);
                        dialog.content.appendChild(document.createElement('br'));
                        dialog.add(ui.create.div('', '（下注赢得10金）'));
                    }
                    game.changeCoin(_status.coin);
                }
                if (get.mode() == 'versus' && _status.ladder) {
                    var mmr = _status.ladder_mmr;
                    mmr += 10 - get.rank(game.me.name, true) * 2;
                    if (result.indexOf('战斗胜利')!=-1) {
                        result=game.modeGoldTitle(result);
                        mmr = 20 + Math.round(mmr);
                        if (mmr > 40) {
                            mmr = 40;
                        }
                        else if (mmr < 10) {
                            mmr = 10;
                        }
                        dialog.add(ui.create.div('', '获得 ' + mmr + ' 积分'));
                    }
                    else {
                        mmr = -30 + Math.round(mmr / 2);
                        if (mmr > -20) {
                            mmr = -20;
                        }
                        else if (mmr < -35) {
                            mmr = -35;
                        }
                        if (lib.storage.ladder.current < 900) {
                            mmr = Math.round(mmr / 4);
                        }
                        else if (lib.storage.ladder.current < 1400) {
                            mmr = Math.round(mmr / 2);
                        }
                        else if (lib.storage.ladder.current < 2000) {
                            mmr = Math.round(mmr / 1.5);
                        }
                        else if (lib.storage.ladder.current > 2500) {
                            mmr = Math.round(mmr * 1.5);
                        }
                        dialog.add(ui.create.div('', '失去 ' + (-mmr) + ' 积分'));
                    }
                    if (_status.ladder_tmp) {
                        lib.storage.ladder.current += 40;
                        delete _status.ladder_tmp;
                    }
                    lib.storage.ladder.current += mmr;
                    if (lib.storage.ladder.top < lib.storage.ladder.current) {
                        lib.storage.ladder.top = lib.storage.ladder.current;
                    }
                    game.save('ladder', lib.storage.ladder);
                    if (ui.ladder && game.getLadderName) {
                        ui.ladder.innerHTML = game.getLadderName(lib.storage.ladder.current);
                    }
                }


                // 添加升段信息展示（向你抛出橄榄枝）
                if(game.rz_isPaiWeiing) {
                    var promotionDiv = document.createElement('div');
                    game.promotionDiv = promotionDiv;
                    dialog.content.appendChild(promotionDiv);
                    game.promotionDiv.holder = ui.create.div('.placeholder');
                    dialog.add(game.promotionDiv.holder);
                }
                // if(true){
                if (game.players.length) {
                    table = document.createElement('table');
                    tr = document.createElement('tr');
                    //tr.appendChild(document.createElement('td'));
                    var titles=['玩家名称','武将','伤害','受伤','摸牌','出牌','杀敌'];
                    for(var p=0;p<titles.length;p++) {
                        td = document.createElement('td');
                        td.innerHTML = addGoldFont(titles[p],'font-size:20px;');
                        tr.appendChild(td);
                    }
                    /*td = document.createElement('td');
                    td.innerHTML = '<span style="font-weight:bold">武将</span>';
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.innerHTML = '<span style="font-weight:bold">伤害</span>';
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.innerHTML = '<span style="font-weight:bold">受伤</span>';
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.innerHTML = '<span style="font-weight:bold">摸牌</span>';
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.innerHTML = '<span style="font-weight:bold">出牌</span>';
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.innerHTML = '<span style="font-weight:bold">杀敌</span>';
                    tr.appendChild(td);*/
                    table.appendChild(tr);
                    for (i = 0; i < game.players.length; i++) {
                        tr = document.createElement('tr');
                        td = document.createElement('td');
                        //td.innerHTML=get.translation(game.players[i]);
						var names=get.translation(game.players[i]);
						if(game.players[i].nickname) {
						    if(game.players[i]==game.me) {
						        names=lib.config.connect_nickname;
						    }else {
						        names=game.players[i].nickname;
						    }
						    names='<span style="color:rgba(130,210,240,1)">'+names+'</span>';
						}
						td.innerHTML=names;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        td.innerHTML=get.translation(game.players[i]);
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.players[i].stat.length; j++) {
                            if (game.players[i].stat[j].damage != undefined) num += game.players[i].stat[j].damage;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.players[i].stat.length; j++) {
                            if (game.players[i].stat[j].damaged != undefined) num += game.players[i].stat[j].damaged;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.players[i].stat.length; j++) {
                            if (game.players[i].stat[j].gain != undefined) num += game.players[i].stat[j].gain;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.players[i].stat.length; j++) {
                            for (k in game.players[i].stat[j].card) {
                                num += game.players[i].stat[j].card[k];
                            }
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.players[i].stat.length; j++) {
                            if (game.players[i].stat[j].kill != undefined) num += game.players[i].stat[j].kill;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        table.appendChild(tr);
                    }
                    dialog.add(ui.create.div('.placeholder'));
                    dialog.content.appendChild(table);
                }
                if (game.dead.length) {
                    table = document.createElement('table');
                    table.style.opacity = '0.5';
                    if (game.players.length == 0) {
                        tr = document.createElement('tr');
                        //tr.appendChild(document.createElement('td'));
                        var titles=['玩家名称','武将','伤害','受伤','摸牌','出牌','杀敌'];
                        for(var p=0;p<titles.length;p++) {
                            td = document.createElement('td');
                            td.innerHTML = addGoldFont(titles[p],'font-size:20px;');
                            tr.appendChild(td);
                        }
                        /*td = document.createElement('td');
                        td.innerHTML = '<span style="font-weight:bold">武将</span>';
                        tr.appendChild(td);
                        td = document.createElement('td');
                        td.innerHTML = '<span style="font-weight:bold">伤害</span>';
                        tr.appendChild(td);
                        td = document.createElement('td');
                        td.innerHTML = '<span style="font-weight:bold">受伤</span>';
                        tr.appendChild(td);
                        td = document.createElement('td');
                        td.innerHTML = '<span style="font-weight:bold">摸牌</span>';
                        tr.appendChild(td);
                        td = document.createElement('td');
                        td.innerHTML = '<span style="font-weight:bold">出牌</span>';
                        tr.appendChild(td);
                        td = document.createElement('td');
                        td.innerHTML = '<span style="font-weight:bold">杀敌</span>';
                        tr.appendChild(td);*/
                        table.appendChild(tr);
                    }
                    for (i = 0; i < game.dead.length; i++) {
                        tr = document.createElement('tr');
                        td = document.createElement('td');
                        //td.innerHTML=get.translation(game.dead[i]);
						var names=get.translation(game.dead[i]);
						if(game.dead[i].nickname) {
						    if(game.dead[i]==game.me) {
						        names=lib.config.connect_nickname;
						    }else {
						        names=game.dead[i].nickname;
						    }
						    names='<span style="color:rgba(130,210,240,1)">'+names+'</span>';
						}
						td.innerHTML=names;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        td.innerHTML=get.translation(game.dead[i]);
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.dead[i].stat.length; j++) {
                            if (game.dead[i].stat[j].damage != undefined) num += game.dead[i].stat[j].damage;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.dead[i].stat.length; j++) {
                            if (game.dead[i].stat[j].damaged != undefined) num += game.dead[i].stat[j].damaged;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.dead[i].stat.length; j++) {
                            if (game.dead[i].stat[j].gain != undefined) num += game.dead[i].stat[j].gain;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.dead[i].stat.length; j++) {
                            for (k in game.dead[i].stat[j].card) {
                                num += game.dead[i].stat[j].card[k];
                            }
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.dead[i].stat.length; j++) {
                            if (game.dead[i].stat[j].kill != undefined) num += game.dead[i].stat[j].kill;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        table.appendChild(tr);
                    }
                    dialog.add(ui.create.div('.placeholder'));
                    dialog.content.appendChild(table);
                    }
                if (game.additionaldead && game.additionaldead.length) {
                    table = document.createElement('table');
                    table.style.opacity = '0.5';
                    for (i = 0; i < game.additionaldead.length; i++) {
                        tr = document.createElement('tr');
                        td = document.createElement('td');
                        //td.innerHTML=get.translation(game.dead[i]);
						var names=get.translation(game.additionaldead[i]);
						if(game.additionaldead[i].nickname) {
						    if(game.additionaldead[i]==game.me) {
						        names=lib.config.connect_nickname;
						    }else {
						        names=game.additionaldead[i].nickname;
						    }
						    names='<span style="color:rgba(130,210,240,1)">'+names+'</span>';
						}
						td.innerHTML=names;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        td.innerHTML = get.translation(game.additionaldead[i]);
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.additionaldead[i].stat.length; j++) {
                            if (game.additionaldead[i].stat[j].damage != undefined) num += game.additionaldead[i].stat[j].damage;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.additionaldead[i].stat.length; j++) {
                            if (game.additionaldead[i].stat[j].damaged != undefined) num += game.additionaldead[i].stat[j].damaged;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.additionaldead[i].stat.length; j++) {
                            if (game.additionaldead[i].stat[j].gain != undefined) num += game.additionaldead[i].stat[j].gain;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.additionaldead[i].stat.length; j++) {
                            for (k in game.additionaldead[i].stat[j].card) {
                                num += game.additionaldead[i].stat[j].card[k];
                            }
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.additionaldead[i].stat.length; j++) {
                            if (game.additionaldead[i].stat[j].kill != undefined) num += game.additionaldead[i].stat[j].kill;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        table.appendChild(tr);
                    }
                    dialog.add(ui.create.div('.placeholder'));
                    dialog.content.appendChild(table);
                }
                // }
                dialog.add(ui.create.div('.placeholder'));
                if (get.mode() == 'identity' || get.mode() == 'doudizhu' || get.mode() == 'guozhan') {//暂时只支持斗地主和身份场
                    dialog.style.display = 'none';
                    var shouShaJieSuanDiv = document.createElement("div");
                    shouShaJieSuanDiv.id = 'shouShaJieSuanDiv';
                    if(window.shoushaBlanks&&!window.shoushaBlanks.contains(shouShaJieSuanDiv)) window.shoushaBlanks.add(shouShaJieSuanDiv);
                    shouShaJieSuanDiv.style['z-index']=7;
                    
                    if(game.createCss) {
                        game.createCss(`.shousha-dialog-up{
                            left: -100% !important;
                            pointer-events: none;
                        }`);
                        /*game.createCss(`.shousha-dbutton-up {
                            left: -100%;
                        }`);*/
                        game.createCss(`.shousha-dbutton {
                            left: 0;
                            top: 68%;
                            transform: translateY( -50%);
                            width: 150px;
                            height: 95px;
                            background-image: url('${lib.assetURL}extension/手杀MVP/image/open.png');
                            background-position: left center;
                            background-size: contain;
                            background-repeat: no-repeat;
                            z-index: 7;
                            cursor: pointer; /* 添加鼠标指针样式 */
                        }`);
                        
                        let button = ui.create.div(ui.window);
                        if(window.shoushaBlanks&&!window.shoushaBlanks.contains(button)) window.shoushaBlanks.add(button);
                        button.classList.add('shousha-dbutton');
                        button.classList.add('shousha-dialog-up');
                        
                        // 初始化坐标存储变量
                        let touchStartX = 0;
                        let touchStartY = 0;
                        let isMouseDown = false; // 鼠标按下状态标志
                        
                        // ========== 触摸事件处理 ==========
                        
                        // 触摸开始事件：记录初始坐标
                        shouShaJieSuanDiv.addEventListener('touchstart', e => {
                            touchStartX = e.touches[0].clientX;
                        }, { passive: true });
                        
                        // 触摸移动事件：检测滑动方向
                        shouShaJieSuanDiv.addEventListener('touchmove', e => {
                            const currentX = e.touches[0].clientX;
                            const deltaX = currentX - touchStartX;
                        
                            if (Math.abs(deltaX) > 30) {
                                if (deltaX < 0) {
                                    // 左滑操作：隐藏对话框
                                    shouShaJieSuanDiv.classList.add('shousha-dialog-up');
                                    button.classList.remove('shousha-dialog-up');
                                    if(shouShaJieSuanDiv.testText) {
                                        game.saveConfig('shouShaJieSuanInfo', true);
                                        shouShaJieSuanDiv.testText.hide();
                                    }
                                } else {
                                    // 右滑操作：显示对话框
                                    shouShaJieSuanDiv.classList.remove('shousha-dialog-up');
                                    button.classList.add('shousha-dialog-up');
                                }
                                touchStartX = currentX;
                            }
                        }, { passive: true });
                        
                        // 按钮触摸事件
                        button.addEventListener('touchstart', e => {
                            touchStartX = e.touches[0].clientX;
                            touchStartY = e.touches[0].clientY;
                        }, { passive: true });
                        
                        button.addEventListener('touchend', e => {
                            const currentX = e.changedTouches[0].clientX;
                            const currentY = e.changedTouches[0].clientY;
                            const deltaX = currentX - touchStartX;
                            const deltaY = currentY - touchStartY;
                        
                            if (Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2)) < 15) {
                                // 点击按钮：显示对话框
                                button.classList.add('shousha-dialog-up');
                                shouShaJieSuanDiv.classList.remove('shousha-dialog-up');
                            }
                            touchStartX = 0;
                            touchStartY = 0;
                        }, { passive: true });
                        
                        // ========== 鼠标事件适配 ==========
                        
                        // 鼠标按下事件
                        shouShaJieSuanDiv.addEventListener('mousedown', e => {
                            isMouseDown = true;
                            touchStartX = e.clientX;
                        });
                        
                        // 鼠标移动事件：检测拖拽方向
                        shouShaJieSuanDiv.addEventListener('mousemove', e => {
                            if (!isMouseDown) return;
                            
                            const currentX = e.clientX;
                            const deltaX = currentX - touchStartX;
                        
                            if (Math.abs(deltaX) > 30) {
                                if (deltaX < 0) {
                                    // 向左拖拽：隐藏对话框
                                    shouShaJieSuanDiv.classList.add('shousha-dialog-up');
                                    button.classList.remove('shousha-dialog-up');
                                    if(shouShaJieSuanDiv.testText) {
                                        game.saveConfig('shouShaJieSuanInfo', true);
                                        shouShaJieSuanDiv.testText.hide();
                                    }
                                } else {
                                    // 向右拖拽：显示对话框
                                    shouShaJieSuanDiv.classList.remove('shousha-dialog-up');
                                    button.classList.add('shousha-dialog-up');
                                }
                                touchStartX = currentX;
                            }
                        });
                        
                        // 鼠标释放事件
                        document.addEventListener('mouseup', () => {
                            isMouseDown = false;
                        });
                        
                        // 按钮鼠标事件
                        button.addEventListener('mousedown', e => {
                            touchStartX = e.clientX;
                            touchStartY = e.clientY;
                        });
                        
                        button.addEventListener('click', e => {
                            // 点击按钮：显示对话框
                            button.classList.add('shousha-dialog-up');
                            shouShaJieSuanDiv.classList.remove('shousha-dialog-up');
                            touchStartX = 0;
                            touchStartY = 0;
                        });
                        
                        // 触摸结束事件（可选）
                        shouShaJieSuanDiv.addEventListener('touchend', () => {
                            // 可根据需要添加触摸结束后的处理
                        });
                    }
                    
                    var hongqiDiv = document.createElement("div");
                    hongqiDiv.id = 'hongqiDiv';
                    var hongqiTextTitle1 = document.createElement("div");
                    hongqiTextTitle1.id = 'hongqiTextTitle1';
                    // hongqiText.innerHTML='等级经验加成<br/>会员<br/>多多益善<br/>皮肤<br/>星级</br>工会组队</br></br>星级经验加成<br/>工会组队<br/>星级</br>皮肤';
                    hongqiTextTitle1.innerHTML = '等级经验加成';

                    var hongqiText1Content = document.createElement("div");
                    hongqiText1Content.id = 'hongqiText1Content';
                    var hongqiText1 = document.createElement("div");
                    hongqiText1.id = 'hongqiText1';
                    var hongqiText1Left = document.createElement("div");
                    hongqiText1Left.id = 'hongqiText1Left';
                    hongqiText1Left.innerText = '会员';
                    hongqiText1.appendChild(hongqiText1Left);
                    var hongqiText1Right = document.createElement("div");
                    hongqiText1Right.id = 'hongqiText1Right';
                    hongqiText1Right.innerText = '(+' + (Math.round(Math.random(2)) * 5) + ')';
                    hongqiText1.appendChild(hongqiText1Right);
                    hongqiText1Content.appendChild(hongqiText1);


                    var hongqiText2 = document.createElement("div");
                    hongqiText2.id = 'hongqiText2';
                    var hongqiText2Left = document.createElement("div");
                    hongqiText2Left.id = 'hongqiText2Left';
                    hongqiText2Left.innerText = '多多益善';
                    hongqiText2.appendChild(hongqiText2Left);
                    var hongqiText2Right = document.createElement("div");
                    hongqiText2Right.id = 'hongqiText2Right';
                    hongqiText2Right.innerText = '(+' + (Math.round(Math.random(2)) * 3) + ')';
                    hongqiText2.appendChild(hongqiText2Right);
                    hongqiText1Content.appendChild(hongqiText2);

                    var hongqiText3 = document.createElement("div");
                    hongqiText3.id = 'hongqiText3';
                    var hongqiText3Left = document.createElement("div");
                    hongqiText3Left.id = 'hongqiText3Left';
                    hongqiText3Left.innerText = '皮肤';
                    hongqiText3.appendChild(hongqiText3Left);
                    var hongqiText3Right = document.createElement("div");
                    hongqiText3Right.id = 'hongqiText3Right';
                    hongqiText3Right.innerText = '(+' + (Math.round(Math.random(2)) * 4) + ')';
                    hongqiText3.appendChild(hongqiText3Right);
                    hongqiText1Content.appendChild(hongqiText3);

                    var hongqiText4 = document.createElement("div");
                    hongqiText4.id = 'hongqiText4';
                    var hongqiText4Left = document.createElement("div");
                    hongqiText4Left.id = 'hongqiText4Left';
                    hongqiText4Left.innerText = '星级';
                    hongqiText4.appendChild(hongqiText4Left);
                    var hongqiText4Right = document.createElement("div");
                    hongqiText4Right.id = 'hongqiText4Right';
                    hongqiText4Right.innerText = '(+' + (Math.round(Math.random(2)) * 3) + ')';
                    hongqiText4.appendChild(hongqiText4Right);
                    hongqiText1Content.appendChild(hongqiText4);

                    var hongqiText5 = document.createElement("div");
                    hongqiText5.id = 'hongqiText5';
                    var hongqiText5Left = document.createElement("div");
                    hongqiText5Left.id = 'hongqiText5Left';
                    hongqiText5Left.innerText = '公会组队';
                    hongqiText5.appendChild(hongqiText5Left);
                    var hongqiText5Right = document.createElement("div");
                    hongqiText5Right.id = 'hongqiText5Right';
                    hongqiText5Right.innerText = '(+' + (Math.round(Math.random(2)) * 3) + ')';
                    hongqiText5.appendChild(hongqiText5Right);
                    hongqiText1Content.appendChild(hongqiText5);

                    hongqiDiv.appendChild(hongqiTextTitle1);
                    hongqiDiv.appendChild(hongqiText1Content);
                    var hongqiTextTitle2 = document.createElement("div");
                    hongqiTextTitle2.id = 'hongqiTextTitle2';
                    hongqiTextTitle2.innerHTML = '星级经验加成';
                    var hongqiText2Content = document.createElement("div");
                    hongqiText2Content.id = 'hongqiText2Content';

                    var hongqiText6 = document.createElement("div");
                    hongqiText6.id = 'hongqiText6';
                    var hongqiText6Left = document.createElement("div");
                    hongqiText6Left.id = 'hongqiText6Left';
                    hongqiText6Left.innerText = '公会组队';
                    hongqiText6.appendChild(hongqiText6Left);
                    var hongqiText6Right = document.createElement("div");
                    hongqiText6Right.id = 'hongqiText6Right';
                    hongqiText6Right.innerText = '(+' + (Math.round(Math.random(2)) * 2) + ')';
                    hongqiText6.appendChild(hongqiText6Right);
                    hongqiText2Content.appendChild(hongqiText6);

                    var hongqiText7 = document.createElement("div");
                    hongqiText7.id = 'hongqiText7';
                    var hongqiText7Left = document.createElement("div");
                    hongqiText7Left.id = 'hongqiText6Left';
                    hongqiText7Left.innerText = '星级';
                    hongqiText7.appendChild(hongqiText7Left);
                    var hongqiText7Right = document.createElement("div");
                    hongqiText7Right.id = 'hongqiText7Right';
                    hongqiText7Right.innerText = '(+' + (Math.round(Math.random(2)) * 3) + ')';
                    hongqiText7.appendChild(hongqiText7Right);
                    hongqiText2Content.appendChild(hongqiText7);


                    var hongqiText8 = document.createElement("div");
                    hongqiText8.id = 'hongqiText8';
                    var hongqiText8Left = document.createElement("div");
                    hongqiText8Left.id = 'hongqiText6Left';
                    hongqiText8Left.innerText = '皮肤';
                    hongqiText8.appendChild(hongqiText8Left);
                    var hongqiText8Right = document.createElement("div");
                    hongqiText8Right.id = 'hongqiText8Right';
                    hongqiText8Right.innerText = '(+' + (Math.round(Math.random(2)) * 4) + ')';
                    hongqiText8.appendChild(hongqiText8Right);
                    hongqiText2Content.appendChild(hongqiText8);

                    hongqiDiv.appendChild(hongqiTextTitle2);
                    hongqiDiv.appendChild(hongqiText2Content);

                    shouShaJieSuanDiv.appendChild(hongqiDiv);
                    
                    //给你点提示让你知道可以收起
                    if(game.createCss && !lib.config.shouShaJieSuanInfo) {
                        var testText = ui.create.div(shouShaJieSuanDiv);
                        shouShaJieSuanDiv.testText = testText;
                        
                        // 添加CSS动画样式
                        game.createCss(`
                            .shouShaJieSuanInfo{
                                bottom: 8%;
                                right: 5%;
                                font-size: 23px;
                                font-family: shousha;
                                opacity: 0;
                                animation: fadeInOut 6s ease-in-out infinite;
                            }
                            
                            @keyframes fadeInOut {
                                0% { opacity: 0; }
                                50% { opacity: 0.6; }
                                100% { opacity: 0; }
                            }
                        `);
                        
                        testText.classList.add('shouShaJieSuanInfo');
                        testText.innerHTML = '← 向左滑动收起结算栏';
                    }

                    var shouShaJieSuanTable = document.createElement('div')
                    shouShaJieSuanTable.id = "shouShaJieSuanTable";
                    
                    
                    var tableTitle = document.createElement('div')
                    //阵营
                    tableTitle.id = "tableTitle";
                    var tableTitle1 = document.createElement('div')
                    tableTitle1.id = "tableTitle1";
                    tableTitle1.innerText = "阵营";
                    tableTitle.appendChild(tableTitle1);
                    //玩家姓名
                    var tableTitle2 = document.createElement('div')
                    tableTitle2.id = "tableTitle2";
                    tableTitle2.innerText = "玩家姓名";
                    tableTitle.appendChild(tableTitle2);

                    //等级经验
                    var tableTitle3 = document.createElement('div')
                    tableTitle3.id = "tableTitle3";
                    tableTitle3.innerText = "等级";
                    tableTitle.appendChild(tableTitle3);

                    //武将
                    var tableTitle4 = document.createElement('div')
                    tableTitle4.id = "tableTitle4";
                    tableTitle4.innerText = "武将";
                    tableTitle.appendChild(tableTitle4);

                    //星级经验
                    var tableTitle5 = document.createElement('div')
                    tableTitle5.id = "tableTitle5";
                    tableTitle5.innerText = "星级";
                    tableTitle.appendChild(tableTitle5);

                    //手牌
                    var tableTitle6 = document.createElement('div')
                    tableTitle6.id = "tableTitle6";
                    tableTitle6.innerText = "手牌";
                    tableTitle.appendChild(tableTitle6);
                    shouShaJieSuanTable.appendChild(tableTitle);
                    shouShaJieSuanDiv.appendChild(shouShaJieSuanTable);



                    var victoryPlayer = [];//胜利者
                    var failPlayer = [];//失败者
                    var tiePlayer = [];//平局
                    //var meIdentity=['zhu','zhong','mingzhong'].contains(game.me.identity)?'zhu':game.me.identity;
                    var getIdeOf=function(him,only) {
                        var ide=['zhu','zhong','mingzhong'].contains(him.identity)?'zhu':him.identity;
                        if(ide=='nei'&&!only) ide='nei'+him.playerid;
                        return ide;
                    }
                    if (get.mode() == 'guozhan') {
                        if (game.players && game.players.length) {
                            game.players.forEach(function (item) {
                                if(result.indexOf('战斗胜利')==-1&&result.indexOf('战斗失败')==-1) {
                                    tiePlayer.push(item);
                                }else {
                                    victoryPlayer.push(item);
                                }
                            });
                        }
                        if (game.dead && game.dead.length) {
                            game.dead.forEach(function (item) {
                                failPlayer.push(item);
                            });
                        }
                    }else {
                        if (result.indexOf('战斗胜利')!=-1) {
                            if (game.players && game.players.length) {
                                game.players.forEach(function (item) {
                                    /*if(game.me.isFriendOf(item)) {
                                        victoryPlayer.push(item);
                                    }else if(game.me.isEnemyOf(item)){
                                        failPlayer.push(item);
                                    }else {
                                        tiePlayer.push(item);
                                    }*/
                                  if(!lib.config.extension_手杀MVP_jiesuanfix) {
                                    if ((item.identity == game.me.identity ||
                                        (game.me.identity == 'zhu' && (item.identity == 'zhong' || item.identity == 'mingzhong')
                                            || ((game.me.identity == 'zhong' || game.me.identity == 'mingzhong') && item.identity == 'zhu')
                                        ))
                                        && (game.me == item || game.me.identity != 'nei')) {
                                        victoryPlayer.push(item)
                                    } else {
                                        failPlayer.push(item)
                                    }
                                  }else {
                                    if(getIdeOf(game.me)==getIdeOf(item)) {
                                        victoryPlayer.push(item);
                                    }else {
                                        failPlayer.push(item);
                                    }
                                  }
                                })
                            }
                            if (game.dead && game.dead.length) {
                                game.dead.forEach(function (item) {
                                    /*if(game.me.isFriendOf(item)) {
                                        victoryPlayer.push(item);
                                    }else if(game.me.isEnemyOf(item)){
                                        failPlayer.push(item);
                                    }else {
                                        tiePlayer.push(item);
                                    }*/
                                  if(!lib.config.extension_手杀MVP_jiesuanfix) {
                                    if ((item.identity == game.me.identity ||
                                        (game.me.identity == 'zhu' && (item.identity == 'zhong' || item.identity == 'mingzhong')
                                            || ((game.me.identity == 'zhong' || game.me.identity == 'mingzhong') && item.identity == 'zhu')))
                                        && (game.me == item || game.me.identity != 'nei')) {
                                        victoryPlayer.push(item)
                                    } else {
                                        failPlayer.push(item)
                                    }
                                  }else {
                                    if(getIdeOf(game.me)==getIdeOf(item)) {
                                        victoryPlayer.push(item);
                                    }else {
                                        failPlayer.push(item);
                                    }
                                  }
                                })
                            }
    
                        } else {
                            var cunhuoPlayerGroup = [];//所有存活者阵营
                            var cunhuoPlayerGroups = {};
                            if (game.players && game.players.length) {
                                game.players.forEach(function (item) {
                                    cunhuoPlayerGroup.push(item.identity)
                                    cunhuoPlayerGroups[getIdeOf(item,true)]=cunhuoPlayerGroups[getIdeOf(item)]?cunhuoPlayerGroups[getIdeOf(item)]+1:1;
                                })
                            }
                            if (result.indexOf('战斗失败')!=-1) {
                                if (game.players && game.players.length) {
                                    game.players.forEach(function (item) {
                                        /*if(game.me.isFriendOf(item)) {
                                            failPlayer.push(item);
                                        }else {
                                            if(cunhuoPlayerGroup.includes('zhu')) {
                                            }
                                        }*/
                                      if(!lib.config.extension_手杀MVP_jiesuanfix) {
                                        if ((item.identity == game.me.identity ||
                                            (game.me.identity == 'zhu' && (item.identity == 'zhong' || item.identity == 'mingzhong')))
                                            && (!(game.me != item && item.identity == 'nei'))) {
                                            failPlayer.push(item)
                                        } else {
                                            if ((cunhuoPlayerGroup.includes(item.identity)
                                            && !(cunhuoPlayerGroup.includes('fan') && item.identity == 'zhong')
                                            && !(cunhuoPlayerGroup.includes('fan') && item.identity == 'mingzhong')
                                            && !(cunhuoPlayerGroup.includes('fan') && item.identity == 'nei'))) {
                                        
                                                victoryPlayer.push(item)
                                       
                                            } else {
                                                failPlayer.push(item)
                                            }
                                        }
                                      }else {
                                        if(getIdeOf(game.me)==getIdeOf(item)) {
                                            failPlayer.push(item);
                                        }else {
                                            if(getIdeOf(game.me)=='zhu') {
                                                if(cunhuoPlayerGroup.includes('fan')||cunhuoPlayerGroup.includes('zhong')||cunhuoPlayerGroups['nei']>1) {
                                                    if(getIdeOf(item)=='fan') {
                                                        victoryPlayer.push(item);
                                                    }else {
                                                        failPlayer.push(item);
                                                    }
                                                }else if(cunhuoPlayerGroups['nei']==1){
                                                    if(getIdeOf(item,true)=='nei') {
                                                        victoryPlayer.push(item);
                                                    }else {
                                                        failPlayer.push(item);
                                                    }
                                                }
                                            }else if(getIdeOf(game.me)=='fan') {
                                                if(cunhuoPlayerGroup.includes('zhu')) {
                                                    if(getIdeOf(item)=='zhu') {
                                                        victoryPlayer.push(item);
                                                    }else {
                                                        failPlayer.push(item);
                                                    }
                                                }else {
                                                    if(getIdeOf(item,true)=='nei') {
                                                        victoryPlayer.push(item);
                                                    }else {
                                                        failPlayer.push(item);
                                                    }
                                                }
                                            }else {
                                                if(cunhuoPlayerGroup.includes('zhu')) {
                                                    if(getIdeOf(item)=='zhu') {
                                                        victoryPlayer.push(item);
                                                    }else {
                                                        failPlayer.push(item);
                                                    }
                                                }else if(cunhuoPlayerGroup.includes('fan')||cunhuoPlayerGroup.includes('zhong')||cunhuoPlayerGroups['nei']>1) {
                                                    if(getIdeOf(item)=='fan') {
                                                        victoryPlayer.push(item);
                                                    }else {
                                                        failPlayer.push(item);
                                                    }
                                                }else if(cunhuoPlayerGroups['nei']==1) {
                                                    if(getIdeOf(item,true)=='nei') {
                                                        victoryPlayer.push(item);
                                                    }else {
                                                        failPlayer.push(item);
                                                    }
                                                }
                                            }
                                        }
                                      }
                                    })
                                }
                                if (game.dead && game.dead.length) {
                                    game.dead.forEach(function (item) {
                                        /*if(game.me.isFriendOf(item)) {
                                            failPlayer.push(item);
                                        }else if(game.me.isEnemyOf(item)){
                                            victoryPlayer.push(item);
                                        }else {
                                            tiePlayer.push(item);
                                        }*/
                                      if(!lib.config.extension_手杀MVP_jiesuanfix) {
                                        if ((item.identity == game.me.identity ||
                                            (game.me.identity == 'zhu' && (item.identity == 'zhong' || item.identity == 'mingzhong')))
                                            && (!(game.me != item && item.identity == 'nei'))) {
                                            failPlayer.push(item)
                                        } else {
                                            if ((cunhuoPlayerGroup.includes(item.identity)
                                                && !(cunhuoPlayerGroup.includes('fan') && item.identity == 'zhong')
                                                && !(cunhuoPlayerGroup.includes('fan') && item.identity == 'mingzhong')
                                                && !(cunhuoPlayerGroup.includes('fan') && item.identity == 'nei'))||(cunhuoPlayerGroup.includes('zhu')&&['zhong','mingzhong'].contains(item.identity))) {
                                                // if(cunhuoPlayerGroup.length>1){
                                                //     tiePlayer.push(item)
                                                // }else{
                                                victoryPlayer.push(item)
                                                // }
                                            } else {
                                                failPlayer.push(item)
                                            }
                                        }
                                      }else {
                                        if(getIdeOf(game.me)==getIdeOf(item)) {
                                            failPlayer.push(item);
                                        }else {
                                            if(getIdeOf(game.me)=='zhu') {
                                                if(cunhuoPlayerGroup.includes('fan')||cunhuoPlayerGroup.includes('zhong')||cunhuoPlayerGroups['nei']>1) {
                                                    if(getIdeOf(item)=='fan') {
                                                        victoryPlayer.push(item);
                                                    }else {
                                                        failPlayer.push(item);
                                                    }
                                                }else if(cunhuoPlayerGroups['nei']==1){
                                                    if(getIdeOf(item,true)=='nei') {
                                                        victoryPlayer.push(item);
                                                    }else {
                                                        failPlayer.push(item);
                                                    }
                                                }
                                            }else if(getIdeOf(game.me)=='fan') {
                                                if(cunhuoPlayerGroup.includes('zhu')) {
                                                    if(getIdeOf(item)=='zhu') {
                                                        victoryPlayer.push(item);
                                                    }else {
                                                        failPlayer.push(item);
                                                    }
                                                }else {
                                                    if(getIdeOf(item,true)=='nei') {
                                                        victoryPlayer.push(item);
                                                    }else {
                                                        failPlayer.push(item);
                                                    }
                                                }
                                            }else {
                                                if(cunhuoPlayerGroup.includes('zhu')) {
                                                    if(getIdeOf(item)=='zhu') {
                                                        victoryPlayer.push(item);
                                                    }else {
                                                        failPlayer.push(item);
                                                    }
                                                }else if(cunhuoPlayerGroup.includes('fan')||cunhuoPlayerGroup.includes('zhong')||cunhuoPlayerGroups['nei']>1) {
                                                    if(getIdeOf(item)=='fan') {
                                                        victoryPlayer.push(item);
                                                    }else {
                                                        failPlayer.push(item);
                                                    }
                                                }else if(cunhuoPlayerGroups['nei']==1) {
                                                    if(getIdeOf(item,true)=='nei') {
                                                        victoryPlayer.push(item);
                                                    }else {
                                                        failPlayer.push(item);
                                                    }
                                                }
                                            }
                                        }
                                      }
                                    })
                                }
                            } else {
                                //平局平局
                                if (game.players && game.players.length) {
                                    game.players.forEach(function (item) {
                                        if (cunhuoPlayerGroup.includes(item.identity) ||(cunhuoPlayerGroup.contains('zhu') && ['zhong','mingzhong'].contains(item.identity))) {
                                            //victoryPlayer.push(item)
                                            tiePlayer.push(item);
                                        }else{
                                            failPlayer.push(item);
                                        }
                                    })
                                    game.dead.forEach(function (item) {
                                        if (cunhuoPlayerGroup.includes(item.identity) ||(cunhuoPlayerGroup.contains('zhu') && ['zhong','mingzhong'].contains(item.identity))) {
                                            //victoryPlayer.push(item)
                                            tiePlayer.push(item);
                                        }else{
                                            failPlayer.push(item);
                                        }
                                    })
                                }
                            }
                        }
                    }
                    var players = game.players.slice(0);
                    game.players = game.players.concat(game.dead);
                    game.players.forEach(value => {
                        if (game.dead.contains(value)) {
                            value.jiesuanJushi -= 20;
                        }
                        value.getEnemies().forEach(current => {
                            if (game.dead.contains(current) || current.isDead()) {
                                value.jiesuanJushi += 2;
                            }
                        })
                        value.getFriends().forEach(current => {
                            if (current.isDead() || game.dead.contains(current))
                                value.jiesuanJushi -= 2;
                        })
                    })
                    game.players = players;
                    /**
                     * 冒泡排序
                     * @param arr
                     * @param len
                     */
                    var sort = function (arr) {
                        var temp, len = arr.length;
                        var i, j;
                        for (i = 0; i < len - 1; i++) /* 外循环为排序趟数，len个数进行len-1趟 */
                            for (j = 0; j < len - 1 - i; j++) { /* 内循环为每趟比较的次数，第i趟比较len-i次 */
                                if (arr[j].JieSuanmvpCount > arr[j + 1].JieSuanmvpCount) { /* 相邻元素比较，若逆序则交换（升序为左大于右，降序反之） */
                                    temp = arr[j];
                                    arr[j] = arr[j + 1];
                                    arr[j + 1] = temp;
                                }
                            }
                        return arr;
                    }
                    var sorts = sort(game.players.concat(game.dead)).reverse();
                    var player = sorts[0];

                    var tableContentDiv = document.createElement('div');
                    tableContentDiv.id = 'tableContentDiv';
                    shouShaJieSuanTable.appendChild(tableContentDiv);



                    var randomName = ['蔡徐坤', '明月栖木', 'duoyun', '萝卜🥕', '缘空', '风回太初', 'ENGJ.K', '只因无中'
                        , '柚子丶奶茶', 'Itms', '知寒', '女装·蝙蝠', '香蕉', '晚舟', '果·文姬'
                        , '女宝', '悦夜', '木木枭', 'Lonely', '阙诗', 'Empty', '涩涩头子','枫林残夜','雷','萌新','元姬','阿泽','小才子','白狼哥','夕子','黄小花','无常','西瓜🍉','姜阿姨','微笑...R苆','林柒柒','辉烬贺流年','长安','铝宝','猫敏','神·思不语','土回太初','91蒸先生','洛神','果空','斩铁老色批'
                        , '幸运女神','朝夕盼兮','地老天荒','貌美如花','心伤','旧梦残颜','绣花男神','君惜沂瑾','一人一心','泽畔东篱','故事裏沒我','故莋颩蕥','紫竹情','月光爱人','终生不用','向日葵执着','寡欢ペ','宅','待妳安好','梦里梦惊梦','姌冰','跋千山','门庭若市','对她痴','籹子請蒥荹','顾瑶韵','水晶之音','baby☆娃','江微雨','泪湿罗衣','半身死灵','純情小骚包','妖精的绣舞','遗失的白狐','星星熄灯了','江南走过','瞬间补的情','老巷钟声','孤己','青瓷埋骨灰','雾中熊','王的羁绊','风有归','扶苏','折梅千山','优雅的小猪','嫑忈','闲云池中敛','芷舞影裳','海屿日光','语风','狂扁特点','当里个当','滴不尽相思','菟子','在苦也不哭','岛川奈','始终隐身','补天裂','情感导师','陪我笑我闹','落日下温柔','复仇之王','如烟长廊','骷髅','伴我暖','芥末盖泪','酒肆饮几壶','遲暮花未央','重逢','半夜成仙','纸鸢','痴爱','忆暖','曲终散','清酒孤欢','浅笑伤无痕','花落君离开','转让半張床','丶陌尕鬼','国下着雪ゃ','゛夜已渐冷','寂寞如风','至死都卖萌','户川柰子','明白就放弃','随风而去','十夏九黎','對你的依賴','牧野留姬','上纲上线','醉话酒烈','蜜棕马尾','月野兔','馨彤','凉己未安','語無倫次','旧城凉','我他妈兔了','临风纵欢','闲揽烟雨','窗边的豆豆','忆往昔流年','仙狸','奶兔大魔王','汐へ萌','低吟归去兮','吃德芙丝带','感到悲伤','桀骜不驯','昨日恋人','晚安我爱他','心心相随','随疯奔跑','牌去人安乐','风吹蛋蛋凉'
                        ];
                    randomName = randomName.filter(name => name != lib.config.connect_nickname);


                    if (victoryPlayer.length > 0) {
                        var victoryPlayerDiv = document.createElement('div');
                        victoryPlayerDiv.id = 'victoryPlayerDiv';
                        victoryPlayer.forEach(function (item) {
                            var playerDiv = document.createElement('div');
                            playerDiv.classList.add('playerDiv');
                            if (player == item) {
                                var mvpPiaoDaiDiv = document.createElement('div');
                                mvpPiaoDaiDiv.classList.add('mvpPiaoDaiDiv')
                                playerDiv.appendChild(mvpPiaoDaiDiv)

                                // playerDiv.setBackgroundImage('extension/手杀MVP/image/mvp.png')
                            }
                            var playerIdentity = document.createElement('div');
                            playerIdentity.classList.add('playerIdentity');

                            if (game.dead.contains(item)) {
                                playerIdentity.classList.add('die');
                            }

                            if(get.mode() == 'guozhan') {
                                var allGroups = ['wei','shu','wu','qun','jin','ye'];
                                if(item.group && allGroups.contains(item.group)) {
                                    playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/group_'+item.group+'.png');
                                }else {
                                    playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/group_unknow.png');
                                }
                            } else switch (item.identity) {
                                case 'zhu':
                                if (get.mode() == 'identity') {
                                        playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/identity_zhu.png');
                                    } else if (get.mode() == 'doudizhu') {
                                        playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/identity_dizhu.png');
                                    }
                                    break;
                                case 'zhong':
                                    playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/identity_zhong.png');
                                    break;
                                case 'mingzhong':
                                    playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/identity_zhong.png');
                                    break;
                                case 'fan':
                                    if (get.mode() == 'identity') {
                                        playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/identity_fan.png');
                                    } else if (get.mode() == 'doudizhu') {
                                        playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/identity_nongmin.png');
                                    }
                                    break;
                                case 'nei':
                                    playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/identity_nei.png');
                                    break;
                            }
                            playerDiv.appendChild(playerIdentity);

                            var playerName = document.createElement('div');
                            if (item === game.me) {
                                playerName.innerText = lib.config.connect_nickname;
                            } else {
                                if (item.nickname) {
                                    playerName.innerText = item.nickname;
                                }else if (randomName.length > 0) {
                                    var name = randomName.randomGet();
                                    randomName.remove(name);
                                    playerName.innerText = name;
                                } else {
                                    playerName.innerText = get.translation(item.name2 ? item.name2 : item.name);
                                }


                            }
                            playerName.classList.add('playerName');
                            playerDiv.appendChild(playerName);
                            //本人
                            if (item == game.me) {
                                var IsMeDiv = document.createElement('div');
                                IsMeDiv.classList.add('IsMeDiv');
                                playerName.classList.add('IsMe');
                                playerName.appendChild(IsMeDiv);
                            }


                            var playerNum1 = document.createElement('div');
                            playerNum1.classList.add('playerNum1');
                            playerNum1.innerHTML = '+' + (Math.floor((Math.random() * 5)) + 20);
                            if (Math.random() > 0.3) {
                                playerNum1.innerHTML = playerNum1.innerHTML + '<font color="#a79032">(+' + (Math.floor((Math.random() * 5)) + 2) + ')</font>';
                            }
                            playerDiv.appendChild(playerNum1);


                            var playerGeneral = document.createElement('div');
                            playerGeneral.classList.add('playerGeneral')
                            var playerGeneralName = document.createElement('div');
                            playerGeneralName.classList.add('playerGeneralName');
                            //playerGeneralName.innerText = get.translation(item.name2 ? item.name2 : item.name);
                            playerGeneralName.innerText = get.translation(item);
                            playerGeneral.appendChild(playerGeneralName);

                            var playerXing = document.createElement('div');
                            if(!lib.config.five_gold_sj) {
                                playerXing.style.transform='translateX(6px)';
                            }
                            playerXing.style.zIndex = 7;
                            var num = 1, rarity = game.getRarity(item.name);

                            switch (rarity) {
                                case 'legend':
                                    num = 5;
                                    break;
                                case 'epic':
                                    num = 4;
                                    break;
                                case 'common':
                                    num = 3;
                                    break;
                                case 'rare':
                                    num = 2;
                                    break;
                                case 'junk':
                                    num = 1;
                                    break;
                                default:
                                    num = 0;
                                    break;
                            }
                            //星星fix
                            num = get.rankNum(item.name);
                            var sumR=lib.config.five_gold_sj?5:4;
                            for (var numKey = 0; numKey < num; numKey++) {
                                var xing = document.createElement('div');
                                xing.classList.add('xing');
                                playerXing.appendChild(xing);

                            }
                            for (var numKey = 0; numKey < sumR - num; numKey++) {
                                var xing = document.createElement('div');
                                xing.classList.add('xing', 'whiteXing');
                                playerXing.appendChild(xing);
                            }
                            playerXing.classList.add('playerXing');
                            playerGeneral.appendChild(playerXing);
                            playerDiv.appendChild(playerGeneral);




                            var playerNum2 = document.createElement('div');
                            playerNum2.classList.add('playerNum2');
                            playerNum2.innerText = '+' + (Math.floor((Math.random() * 25)) + 100);
                            playerDiv.appendChild(playerNum2);

                            var playerViewhand = document.createElement('div');
                            playerViewhand.classList.add('playerViewhand');
                            playerDiv.appendChild(playerViewhand);

                            var viewhand = document.createElement('div');
                            viewhand.classList.add('viewhand');
                            var cards = item.getCards('h');
                            if (cards && cards.length) {
                                cards.forEach(function (card) {
                                    card.style.transform = 'none';
                                    viewhand.appendChild(card);
                                })
                            } else {
                                // viewhand.innerText ='手牌已经出完了'
                            }
                            viewhand.style.display = 'none';
                            playerDiv.appendChild(viewhand);


                            playerViewhand.addEventListener('click', function (e) {
                                e.stopPropagation();
                                if (shouShaJieSuanDiv.querySelectorAll('.viewhand')) {
                                    shouShaJieSuanDiv.querySelectorAll('.viewhand').forEach(function (item) {
                                        item.style.display = 'none';
                                    })
                                }
                                viewhand.style.display = 'block';
                            })
                            victoryPlayerDiv.appendChild(playerDiv);
                        })

                        var victoryTextDiv = document.createElement('div')
                        victoryTextDiv.classList.add('victoryTextDiv')
                        victoryPlayerDiv.appendChild(victoryTextDiv);

                        tableContentDiv.appendChild(victoryPlayerDiv);
                    }


                    if (failPlayer.length > 0) {
                        var failPlayerDiv = document.createElement('div');
                        failPlayerDiv.id = 'failPlayerDiv';
                        failPlayer.forEach(function (item) {
                            var playerDiv = document.createElement('div');
                            playerDiv.classList.add('playerDiv');
                            //mvp
                            if (player == item) {
                                var mvpPiaoDaiDiv = document.createElement('div');
                                mvpPiaoDaiDiv.classList.add('mvpPiaoDaiDiv')
                                playerDiv.appendChild(mvpPiaoDaiDiv)

                                // playerDiv.setBackgroundImage('extension/手杀MVP/image/mvp.png')
                            }
                            var playerIdentity = document.createElement('div');
                            playerIdentity.classList.add('playerIdentity');
                            if (game.dead.contains(item)) {
                                playerIdentity.classList.add('die');
                            }
                            if(get.mode() == 'guozhan') {
                                var allGroups = ['wei','shu','wu','qun','jin','ye'];
                                if(item.group && allGroups.contains(item.group)) {
                                    playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/group_'+item.group+'.png');
                                }else {
                                    playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/group_unknow.png');
                                }
                            } else switch (item.identity) {
                                case 'zhu':
                                    if (get.mode() == 'identity') {
                                        playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/identity_zhu.png');
                                    } else if (get.mode() == 'doudizhu') {
                                        playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/identity_dizhu.png');
                                    }
                                    break;
                                case 'zhong':
                                    playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/identity_zhong.png');
                                    break;
                                case 'mingzhong':
                                    playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/identity_zhong.png');
                                    break;
                                case 'fan':
                                    if (get.mode() == 'identity') {
                                        playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/identity_fan.png');
                                    } else if (get.mode() == 'doudizhu') {
                                        playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/identity_nongmin.png');
                                    }
                                    break;
                                case 'nei':
                                playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/identity_nei.png');
                                    break;
                            }
                            playerDiv.appendChild(playerIdentity);

                            var playerName = document.createElement('div');

                            if (item === game.me) {
                                playerName.innerText = lib.config.connect_nickname;
                            } else {
                                if (item.nickname) {
                                    playerName.innerText = item.nickname;
                                }else if (randomName.length > 0) {
                                    var name = randomName.randomGet();
                                    randomName.remove(name);
                                    playerName.innerText = name;
                                } else {
                                    playerName.innerText = get.translation(item.name2 ? item.name2 : item.name);
                                }
                            }
                            playerName.classList.add('playerName');
                            playerDiv.appendChild(playerName);

                            //本人
                            if (item == game.me) {
                                var IsMeDiv = document.createElement('div');
                                IsMeDiv.classList.add('IsMeDiv');
                                playerName.classList.add('IsMe');
                                // var MyNameDiv = document.createElement('div');
                                // MyNameDiv.classList.add('MyNameDiv');
                                // MyNameDiv.innerText=playerName.innerText;
                                // playerName.innerText='';
                                // playerName.appendChild(MyNameDiv);
                                playerName.appendChild(IsMeDiv);
                            }
                            var playerNum1 = document.createElement('div');
                            playerNum1.classList.add('playerNum1');
                            playerNum1.innerHTML = '+' + (Math.floor((Math.random() * 5)) + 20);
                            if (Math.random() > 0.3) {
                                playerNum1.innerHTML = playerNum1.innerHTML + '<font color="#a79032">(+' + (Math.floor((Math.random() * 5)) + 2) + ')</font>';
                            }

                            playerDiv.appendChild(playerNum1);

                            var playerGeneral = document.createElement('div');
                            playerGeneral.classList.add('playerGeneral')
                            var playerGeneralName = document.createElement('div');
                            playerGeneralName.classList.add('playerGeneralName');
                            //playerGeneralName.innerText = get.translation(item.name2 ? item.name2 : item.name);
                            playerGeneralName.innerText = get.translation(item);
                            playerGeneral.appendChild(playerGeneralName);

                            var playerXing = document.createElement('div');
                            if(!lib.config.five_gold_sj) {
                                playerXing.style.transform='translateX(6px)';
                            }
                            playerXing.style.zIndex = 7;
                            var num = 1, rarity = game.getRarity(item.name);
                            switch (rarity) {
                                case 'legend':
                                num = 5;
                                    break;
                                case 'epic':
                                    num = 4;
                                    break;
                                case 'common':
                                    num = 3;
                                    break;
                                case 'rare':
                                    num = 2;
                                    break;
                                case 'junk':
                                    num = 1;
                                    break;
                                default:
                                    num = 0;
                                    break;
                            }
                            //星星fix
                            num = get.rankNum(item.name);
                            var sumR=lib.config.five_gold_sj?5:4;
                            for (var numKey = 0; numKey < num; numKey++) {
                                var xing = document.createElement('div');
                                xing.classList.add('xing');
                                playerXing.appendChild(xing);

                            }
                            for (var numKey = 0; numKey < sumR - num; numKey++) {
                                var xing = document.createElement('div');
                                xing.classList.add('xing', 'whiteXing');
                                playerXing.appendChild(xing);
                            }
                            playerXing.classList.add('playerXing');
                            playerGeneral.appendChild(playerXing);
                            playerDiv.appendChild(playerGeneral);



                            var playerNum2 = document.createElement('div');
                            playerNum2.classList.add('playerNum2');
                            playerNum2.innerText = '-' + (Math.floor((Math.random() * 25)) + 100);
                            playerDiv.appendChild(playerNum2);

                            var playerViewhand = document.createElement('div');
                            playerViewhand.classList.add('playerViewhand');
                            playerDiv.appendChild(playerViewhand);

                            var viewhand = document.createElement('div');
                            viewhand.classList.add('viewhand');
                            var cards = item.getCards('h');
                            if (cards && cards.length) {
                                cards.forEach(function (card) {
                                    card.style.transform = 'none';
                                    viewhand.appendChild(card);
                                })
                            } else {
                                // viewhand.innerText ='手牌已经出完了'
                            }
                            viewhand.style.display = 'none';
                            playerDiv.appendChild(viewhand);


                            playerViewhand.addEventListener('click', function (e) {
                                e.stopPropagation();
                                if (shouShaJieSuanDiv.querySelectorAll('.viewhand')) {
                                    shouShaJieSuanDiv.querySelectorAll('.viewhand').forEach(function (item) {
                                        item.style.display = 'none';
                                    })
                                }
                                viewhand.style.display = 'block';
                            })


                            failPlayerDiv.appendChild(playerDiv);
                        })
                        var failTextDiv = document.createElement('div')
                        failTextDiv.classList.add('failTextDiv')
                        failPlayerDiv.appendChild(failTextDiv);

                        tableContentDiv.appendChild(failPlayerDiv);
                    }

                    if (tiePlayer.length > 0) {
                        var tiePlayerDiv = document.createElement('div');
                        tiePlayerDiv.id = 'tiePlayerDiv';
                        tiePlayer.forEach(function (item) {
                            var playerDiv = document.createElement('div');
                            playerDiv.classList.add('playerDiv');
                            //mvp
                            if (player == item) {
                                var mvpPiaoDaiDiv = document.createElement('div');
                                mvpPiaoDaiDiv.classList.add('mvpPiaoDaiDiv')
                                playerDiv.appendChild(mvpPiaoDaiDiv)

                                // playerDiv.setBackgroundImage('extension/手杀MVP/image/mvp.png')
                            }
                            var playerIdentity = document.createElement('div');
                            playerIdentity.classList.add('playerIdentity');
                            if (game.dead.contains(item)) {
                                playerIdentity.classList.add('die');
                            }
                            if(get.mode() == 'guozhan') {
                                var allGroups = ['wei','shu','wu','qun','jin','ye'];
                                if(item.group && allGroups.contains(item.group)) {
                                    playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/group_'+item.group+'.png');
                                }else {
                                    playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/group_unknow.png');
                                }
                            } else switch (item.identity) {
                                case 'zhu':
                                    if (get.mode() == 'identity') {
                                        playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/identity_zhu.png');
                                    } else if (get.mode() == 'doudizhu') {
                                        playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/identity_dizhu.png');
                                    }
                                    break;
                                case 'zhong':
                                    playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/identity_zhong.png');
                                    break;
                                case 'mingzhong':
                                    playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/identity_zhong.png');
                                    break;
                                case 'fan':
                                if (get.mode() == 'identity') {
                                        playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/identity_fan.png');
                                    } else if (get.mode() == 'doudizhu') {
                                        playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/identity_nongmin.png');
                                    }
                                    break;
                                case 'nei':
                                    playerIdentity.setBackgroundImage('extension/手杀MVP/image/identity/identity_nei.png');
                                    break;
                            }
                            playerDiv.appendChild(playerIdentity);

                            var playerName = document.createElement('div');
                            if (item === game.me) {
                                playerName.innerText = lib.config.connect_nickname;
                            } else {
                                if (item.nickname) {
                                    playerName.innerText = item.nickname;
                                }else if (randomName.length > 0) {
                                    var name = randomName.randomGet();
                                    randomName.remove(name);
                                    playerName.innerText = name;
                                } else {
                                    playerName.innerText = get.translation(item.name2 ? item.name2 : item.name);
                                }
                            }
                            playerName.classList.add('playerName');
                            playerDiv.appendChild(playerName);
                            //本人
                            if (item == game.me) {
                                var IsMeDiv = document.createElement('div');
                                IsMeDiv.classList.add('IsMeDiv');
                                playerName.classList.add('IsMe');
                                // var MyNameDiv = document.createElement('div');
                                // MyNameDiv.classList.add('MyNameDiv');
                                // MyNameDiv.innerText=playerName.innerText;
                                // playerName.innerText='';
                                // playerName.appendChild(MyNameDiv);
                                playerName.appendChild(IsMeDiv);
                            }
                            var playerNum1 = document.createElement('div');
                            playerNum1.classList.add('playerNum1');
                            playerNum1.innerHTML = '+' + (Math.floor((Math.random() * 5)) + 20);
                            if (Math.random() > 0.3) {
                            playerNum1.innerHTML = playerNum1.innerHTML + '<font color="#a79032">(+' + (Math.floor((Math.random() * 5)) + 2) + ')</font>';
                            }
                            playerDiv.appendChild(playerNum1);


                            var playerGeneral = document.createElement('div');
                            playerGeneral.classList.add('playerGeneral')
                            var playerGeneralName = document.createElement('div');
                            playerGeneralName.classList.add('playerGeneralName');
                            //playerGeneralName.innerText = get.translation(item.name2 ? item.name2 : item.name);
                            playerGeneralName.innerText = get.translation(item);
                            playerGeneral.appendChild(playerGeneralName);

                            var playerXing = document.createElement('div');
                            if(!lib.config.five_gold_sj) {
                                playerXing.style.transform='translateX(6px)';
                            }
                            playerXing.style.zIndex = 7;
                            var num = 1, rarity = game.getRarity(item.name);

                            switch (rarity) {
                                case 'legend':
                                    num = 5;
                                    break;
                                case 'epic':
                                    num = 4;
                                    break;
                                case 'common':
                                    num = 3;
                                    break;
                                case 'rare':
                                    num = 2;
                                    break;
                                case 'junk':
                                    num = 1;
                                    break;
                                default:
                                    num = 0;
                                    break;
                            }
                            //星星fix
                            num = get.rankNum(item.name);
                            var sumR=lib.config.five_gold_sj?5:4;

                            for (var numKey = 0; numKey < num; numKey++) {
                                var xing = document.createElement('div');
                                xing.classList.add('xing');
                                playerXing.appendChild(xing);

                            }
                            for (var numKey = 0; numKey < sumR - num; numKey++) {
                                var xing = document.createElement('div');
                                xing.classList.add('xing', 'whiteXing');
                                playerXing.appendChild(xing);
                            }
                            playerXing.classList.add('playerXing');
                            playerGeneral.appendChild(playerXing);
                            playerDiv.appendChild(playerGeneral);


                            var playerNum2 = document.createElement('div');
                            playerNum2.classList.add('playerNum2');
                            playerNum2.innerText = '-' + (Math.floor((Math.random() * 25)) + 100);
                            playerDiv.appendChild(playerNum2);

                            var playerViewhand = document.createElement('div');
                            playerViewhand.classList.add('playerViewhand');
                            playerDiv.appendChild(playerViewhand);
                            var viewhand = document.createElement('div');
                            viewhand.classList.add('viewhand');
                            var cards = item.getCards('h');
                            if (cards && cards.length) {
                                cards.forEach(function (card) {
                                    card.style.transform = 'none';
                                    viewhand.appendChild(card);
                                })
                            } else {
                                // viewhand.innerText ='手牌已经出完了'
                            }
                            viewhand.style.display = 'none';
                            playerDiv.appendChild(viewhand);


                            playerViewhand.addEventListener('click', function (e) {
                                e.stopPropagation();
                                if (shouShaJieSuanDiv.querySelectorAll('.viewhand')) {
                                    shouShaJieSuanDiv.querySelectorAll('.viewhand').forEach(function (item) {
                                        item.style.display = 'none';
                                    })
                                }
                                viewhand.style.display = 'block';
                            })

                            var tieTextDiv = document.createElement('div')
                            tieTextDiv.classList.add('tieTextDiv')
                            tiePlayerDiv.appendChild(tieTextDiv);
                            tiePlayerDiv.appendChild(playerDiv);
                        })


                        tableContentDiv.appendChild(tiePlayerDiv);
                    }
                    shouShaJieSuanDiv.addEventListener('click', function (e) {
                        e.stopPropagation();
                        if (shouShaJieSuanDiv.querySelectorAll('.viewhand')) {
                            shouShaJieSuanDiv.querySelectorAll('.viewhand').forEach(function (item) {
                                item.style.display = 'none';
                            })
                        }
                    })
                    document.body.appendChild(shouShaJieSuanDiv);


                }
                var clients = game.players.concat(game.dead);
                for (var i = 0; i < clients.length; i++) {
                    if (clients[i].isOnline2()) {
                        clients[i].send(game.over, dialog.content.innerHTML, game.checkOnlineResult(clients[i]));
                    }
                }

                dialog.add(ui.create.div('.placeholder'));

                for (var i = 0; i < game.players.length; i++) {
                    if (!_status.connectMode && game.players[i].isUnderControl(true) && game.layout != 'long2') continue;
                    var hs = game.players[i].getCards('h');
                    if (hs.length) {
                        dialog.add('<div class="text center">' + get.translation(game.players[i]) + '</div>');
                        dialog.addSmall(hs);
                    }
                }
                for (var i = 0; i < game.dead.length; i++) {
                    if (!_status.connectMode && game.dead[i].isUnderControl(true) && game.layout != 'long2') continue;
                    var hs = game.dead[i].getCards('h');
                    if (hs.length) {
                        dialog.add('<div class="text center">' + get.translation(game.dead[i]) + '</div>');
                        dialog.addSmall(hs);
                    }
                }
                dialog.add(ui.create.div('.placeholder.slim'));
                game.addVideo('over', null, dialog.content.innerHTML);
                var vinum = parseInt(lib.config.video);
                if (!_status.video && vinum && game.getVideoName && window.indexedDB && _status.videoInited) {
                    var store = lib.db.transaction(['video'], 'readwrite').objectStore('video');
                    var videos = lib.videos.slice(0);
                    for (var i = 0; i < videos.length; i++) {
                        if (videos[i].starred) {
                            videos.splice(i--, 1);
                        }
                    }
                    for (var deletei = 0; deletei < 5; deletei++) {
                        if (videos.length >= vinum) {
                            var toremove = videos.pop();
                            lib.videos.remove(toremove);
                            store.delete(toremove.time);
                        }
                        else {
                            break;
                        }
                    }
                    var me = game.me || game.players[0];
                    if (!me) return;
                    var newvid = {
                        name: game.getVideoName(),
                        mode: lib.config.mode,
                        video: lib.video,
                        win: result.indexOf('战斗胜利')!=-1,
                        name1: me.name1 || me.name,
                        name2: me.name2,
                        time: lib.getUTC(new Date())
                    };
                    var modecharacters = lib.characterPack['mode_' + get.mode()];
                    if (modecharacters) {
                        if (get.mode() == 'guozhan') {
                            if (modecharacters[newvid.name1]) {
                                if (newvid.name1.indexOf('gz_shibing') == 0) {
                                    newvid.name1 = newvid.name1.slice(3, 11);
                                }
                                else {
                                    newvid.name1 = newvid.name1.slice(3);
                                }
                            }
                            if (modecharacters[newvid.name2]) {
                                if (newvid.name2.indexOf('gz_shibing') == 0) {
                                    newvid.name2 = newvid.name2.slice(3, 11);
                                }
                                else {
                                    newvid.name2 = newvid.name2.slice(3);
                                }
                            }
                        }
                        else {
                            if (modecharacters[newvid.name1]) {
                                newvid.name1 = get.mode() + '::' + newvid.name1;
                            }
                            if (modecharacters[newvid.name2]) {
                                newvid.name2 = get.mode() + '::' + newvid.name2;
                            }
                        }
                    }
                    if (newvid.name1 && newvid.name1.indexOf('subplayer_') == 0) {
                        newvid.name1 = newvid.name1.slice(10, newvid.name1.lastIndexOf('_'));
                    }
                    if (newvid.name2 && newvid.name2.indexOf('subplayer_') == 0) {
                        newvid.name1 = newvid.name2.slice(10, newvid.name1.lastIndexOf('_'));
                    }
                    lib.videos.unshift(newvid);
                    store.put(newvid);
                    ui.create.videoNode(newvid, true);
                }
                // _status.auto=false;
                if (ui.auto) {
                    // ui.auto.classList.remove('glow');
                    ui.auto.hide();
                }
                if (ui.wuxie) ui.wuxie.hide();
                if (ui.giveup) {
                    ui.giveup.remove();
                    delete ui.giveup;
                }
                if (lib.config.test_game && !_status.connectMode) {
                    if (typeof lib.config.test_game !== 'string') {
                        switch (lib.config.mode) {
                            case 'identity': game.saveConfig('mode', 'guozhan'); break;
                            case 'guozhan': game.saveConfig('mode', 'versus'); break;
                            case 'versus': game.saveConfig('mode', 'boss'); break;
                            case 'boss': game.saveConfig('mode', 'chess'); break;
                            case 'chess': game.saveConfig('mode', 'stone'); break;
                            case 'stone': game.saveConfig('mode', 'identity'); break;
                        }
                    }
                    setTimeout(game.reload, 500);
                }
                if (game.controlOver) {
                    game.controlOver(); return;
                }
                if (!_status.brawl) {
                    if (lib.config.mode == 'boss') {
                        //不弄再战了
                        /*ui.create.control('再战', function () {
                            var pointer = game.boss;
                            var map = { boss: game.me == game.boss, links: [] };
                            for (var iwhile = 0; iwhile < 10; iwhile++) {
                                pointer = pointer.nextSeat;
                                if (pointer == game.boss) {
                                    break;
                                }
                                if (!pointer.side) {
                                    map.links.push(pointer.name);
                                }
                            }
                            game.saveConfig('continue_name_boss', map);
                            game.saveConfig('mode', lib.config.mode);
                            localStorage.setItem(lib.configprefix + 'directstart', true);
                            game.reload();
                        });*/
                    }
                    else if (lib.config.mode == 'versus') {
                        if (_status.mode == 'standard' || _status.mode == 'three') {
                            ui.create.control('再战', function () {
                                game.saveConfig('continue_name_versus' + (_status.mode == 'three' ? '_three' : ''), {
                                    friend: _status.friendBackup,
                                    enemy: _status.enemyBackup,
                                    color: _status.color
                                });
                                game.saveConfig('mode', lib.config.mode);
                                localStorage.setItem(lib.configprefix + 'directstart', true);
                                game.reload();
                            });
                        }
                    }
                    else if (!_status.connectMode && get.config('continue_game') && !ui.continue_game && !_status.brawl && !game.no_continue_game) {
                        ui.continue_game = ui.create.control('再战', game.reloadCurrent);
                    }
                }
                //此处修改存疑，如果不注释的话提前蹦出“重新开始”会导致这个MVP弹不出来
                //if (!ui.restart) {
                    if (game.onlineroom && typeof game.roomId == 'string') {
                        ui.restart = ui.create.control('restart', function () {
                            game.broadcastAll(function () {
                                if (ui.exit) {
                                    ui.exit.stay = true;
                                    ui.exit.firstChild.innerHTML = '返回房间';
                                }
                            });
                            game.saveConfig('tmp_owner_roomId', game.roomId);
                            setTimeout(game.reload, 100);
                        });
                    }
                    else {
                        var offline=sessionStorage.getItem('Network');
						if(!offline) offline='online';
						lib.translate['gotoMenu']='返回大厅';
						lib.translate['leftRoom']='离开房间';
						lib.translate['oneMore']='再来一局';
						if(game.rz_isPaiWeiing) {
							lib.translate['oneMore']='继续匹配';
						}
						if(lib.config['extension_如真似幻_enable']&&offline!='offline') {
						    if(game.isBrawl) {
						        ui.restart = ui.create.control('leftRoom', function(){
					    	        game.reload();
						        });
						    }else {
						        ui.restart = ui.create.control('gotoMenu', function(){
					    	        game.reload3();
						        });
						        if(lib.config['extension_手杀MVP_oneMore']) {
						            ui.restart2 = ui.create.control('oneMore', function(){
					    	            if(game.rz_isPaiWeiing) {
					    	                game.saveConfig('rz_nextIsPaiwei',true);
					    	            }
					    	            game.reload();
						            });
						        }
						    }
						}else {
							ui.restart = ui.create.control('restart', game.reload);
						}
                        
                    }
                //}
                if (ui.tempnowuxie) {
                    ui.tempnowuxie.close();
                    delete ui.tempnowuxie;
                }

                if (ui.revive) {
                    ui.revive.close();
                    delete ui.revive;
                }
                if (ui.swap) {
                    ui.swap.close();
                    delete ui.swap;
                }
                for (var i = 0; i < lib.onover.length; i++) {
                    lib.onover[i](resultbool);
                }
                if (game.addRecord) {
                    game.addRecord(resultbool);
                }
                if (window.isNonameServer) {
                    lib.configOL.gameStarted = false;
                    game.saveConfig('pagecfg' + window.isNonameServer, [lib.configOL, game.roomId, _status.onlinenickname, _status.onlineavatar]);
                    game.reload();
                }
                else if (_status.connectMode && !game.online) {
                    setTimeout(game.reload, 15000)
                }
            }
        }
        //全场最佳
        Object.assign(game, {

            LiHuiFileExist:function(url) {
                if (window.XMLHttpRequest) {
                    var http = new XMLHttpRequest();
                }
                else {
                    var http = new ActiveXObject("Microsoft.XMLHTTP");
                }
                http.open('HEAD', url, false);
                try {
                    http.send();
                } catch (err) {
                    return false;
                }
                return http.status != 404;
            },
            getFileName2:function(path) {
                var pos1 = path.lastIndexOf('/');
                var pos2 = path.lastIndexOf('\\');
                var pos = Math.max(pos1, pos2);
                if (pos < 0) {
                  return path;
                }else {
                  let tempPath = path.substring(pos + 1);
                  return tempPath.substring(0, tempPath.lastIndexOf("."));
                }
            },

            getLiHuiPath:function(player,assetURL){
              
                var LiHuiMapping = lib.LiHuiMapping; 
                var SkinName = game.getFileName2(player.node.avatar.style.backgroundImage);
                var Name = player.name==""?player.name2:player.name;
                if(LiHuiMapping[Name]) Name = LiHuiMapping[Name];
                var LihuiPath = assetURL + Name + "/" + SkinName+".png";
                if(game.LiHuiFileExist(LihuiPath)){
                    return LihuiPath;
                }else{
                    LihuiPath = assetURL + Name + "/" + Name +".png";
                    if(game.LiHuiFileExist(LihuiPath)){
                        return LihuiPath;
                    }else{
                        return assetURL + "未知.png";
                    }
                }
            }
        
})
            game.playqysstx = function (fn, dir, sex) {
                if (lib.config.background_speak) {
                    if (dir && sex) game.playAudio(dir, sex, fn);
                    else if (dir) game.playAudio(dir, fn);
                    else game.playAudio('..', 'extension', '手杀MVP', fn);
                }
            };
            String.prototype.newFedit = function (ins) {
                var CAFst = this;
                var CAFstr = CAFst.slice(CAFst.indexOf("{") + 1).slice(0, -1);
                return ins(CAFstr);
            }
            if (config.qingyao_shoushapeiyin) {
        if (lib.skill.qilin_skill) lib.skill.qilin_skill.audio = "ext:手杀MVP:true";
        if (lib.skill.qibaodao2) lib.skill.qibaodao2.audio = "ext:手杀MVP:true";
        if (lib.skill.lanyinjia) lib.skill.lanyinjia.audio = "ext:手杀MVP:true";
        if (lib.skill.cixiong_skill) lib.skill.cixiong_skill.audio = "ext:手杀MVP:true";
        lib.skill._qy_chongzhu = {
            trigger: {
                player: "_chongzhuBegin",
            },
            direct: true,
            popup: false,
            silent: true,
            priority: 0,
            content: function () {
                game.playqysstx('qy_chongzhu_' + (player.sex == 'female' ? 'female' : 'male'));
            },
        };
        // 铁锁
        let CAFst = lib.element.content.link.toString();
        let ins = function (str) {
            return str.replace(/game.playAudio\('effect','link'\);/g,
                `if(!player.isLinked()){
                            game['playAudio']('effect','link');
                        }else {
                            game.playqysstx('qy_tiesuo');
                        }`
            );
        };
        /*eval("lib.element.content.link=function(){" + CAFst.newFedit(ins) + "}");
        // 伤害
        CAFst = lib.element.content.damage.toString();
        ins = function (str) {
            return str.replace(/game.playAudio\('effect','damage'\+\(num\>1\?'2'\:''\)\);/g,
                `;if(num > player.hujia){
                    if(event.card&&event.card.name=='shandian'){
                        game.playqysstx('qy_shandian');
                    }else if(['fire','thunder','ice','kami'].contains(event.nature)){
                        game.playqysstx('qy_damage_'+event.nature+(num>1?'2':''));
                    }else {
                        game.playqysstx('qy_damage'+(num>1?'2':''));
                    }
                };`
            );
        };
        eval("lib.element.content.damage=function(){" + CAFst.newFedit(ins) + "}");*/
        // 流失体力
        /*CAFst = lib.element.content.loseHp.toString();
        ins = function (str) {
            return str.replace(/game.playAudio\('effect','loseHp'\);/g,
                `game.playqysstx('qy_loseHp');`
            );
        };
        eval("lib.element.content.loseHp=function(){" + CAFst.newFedit(ins) + "}");*/
    }
        },
        precontent: function (config) {
            if (config.qingyao_shoushaMVP) {
                "use strict;"
                lib.onover.push(resultbool => {
                    var 全场最佳 = function () {
                        if (_status.showShoushaMvp) return false;
                        if(ui.roundmenu) ui.roundmenu.hide();
                        _status.showShoushaMvp = true;
                        if(!window.mvpTime) window.mvpTime=2000;
                        setTimeout(item => {
                            var dialog = Array.from(ui.arena.querySelectorAll(".dialog"));
                            dialog.forEach(value => value.hide());
                            //game.playqysstx('images/asqx.mp3');
                            var players = game.players.slice(0);
                            game.players = game.players.concat(game.dead);
                            if (!_status.showShouSha局势) {
                                game.players.forEach(value => {
                                    if (game.dead.contains(value)) {
                                        value.局势分数 -= 20;
                                    }
                                    value.getEnemies().forEach(current => {
                                        if (game.dead.contains(current) || current.isDead()) {
                                            value.局势分数 += 2;
                                        }
                                    })
                                    value.getFriends().forEach(current => {
                                        if (current.isDead() || game.dead.contains(current))
                                            value.局势分数 -= 2;
                                    })
                                })
                            }
                            _status.showShouSha局势 = true;
                            game.players = players;
                            /**
                             * 冒泡排序
                             * @param arr
                             * @param len
                             */
                            var sort = function (arr) {
                                var temp, len = arr.length;
                                var i, j;
                                for (i = 0; i < len - 1; i++) /* 外循环为排序趟数，len个数进行len-1趟 */
                                    for (j = 0; j < len - 1 - i; j++) { /* 内循环为每趟比较的次数，第i趟比较len-i次 */
                                        if (arr[j].mvpCount > arr[j + 1].mvpCount) { /* 相邻元素比较，若逆序则交换（升序为左大于右，降序反之） */
                                            temp = arr[j];
                                            arr[j] = arr[j + 1];
                                            arr[j + 1] = temp;
                                        }
                                    }
                                return arr;
                            }
                            var sorts = sort(game.players.concat(game.dead)).reverse();
                            var player = sorts[0];
                            var popuperContainer = ui.create.div('.popup-container', {background: "rgb(0,0,0,.7)"}, ui.window);
                            popuperContainer.addEventListener('click', event => {
                                if(ui.roundmenu) ui.roundmenu.show();
                                event.stopPropagation();
                                popuperContainer.delete(200);
                                dialog.forEach(value => value.show());
                                _status.showShoushaMvp = false;
                            });
                            var skills = player.skills.filter(value => lib.skill[value].audio);
                            skills.length && game.trySkillAudio(skills.randomGet(), player, true);
                            var qycontainer = ui.create.div('.qy-mvp-container', popuperContainer);

                            var backgroundRight = ui.create.div('.qy-mvp-piaodai-right', qycontainer);
                            var container = ui.create.div('.qy-center-container', qycontainer);
                            var backgroundLeft = ui.create.div('.qy-mvp-piaodai-left', qycontainer);

                            var avatarbox = ui.create.div('.qy-mvp-avatarbox', container);
                            //赫拉震怒
                            //if (navigator.userAgent.match(/(Android|iPhone|SymbianOS|Windows Phone|iPad|iPod)/i) !== null) {
                                avatarbox.css({
                                    height: '120%',
                                    top: '-4%',
                                });
                            //}
                            var avatarborder = ui.create.div('.qy-mvp-avatarborder', avatarbox);
                            avatarborder.dataset.name = get.translation(player.name);
                            avatarborder.setBackgroundImage(`extension/手杀MVP/images/border_${player.group}.png`);
                            var image = new Image();
                            image.src = `${lib.assetURL}extension/手杀MVP/images/border_${player.group}.png`;
                            image.onerror = function () {
                                avatarborder.setBackgroundImage(`extension/手杀MVP/images/border_qun.png`);
                            }
                            var xing = ui.create.div(avatarbox, '.qy-mvp-xing');
                            var zoom;
				            switch(lib.config.ui_zoom){
								case 'esmall':zoom=27.2;break;
								case 'vsmall':zoom=26.7;break;
								case 'small':zoom=26.6;break;
								default:zoom=26.1;
							}
							xing.style.left=zoom*0.99+'%';
                            //修改开始
                            /*var num = 1, rarity = game.getRarity(player.name);
                            switch (rarity) {
                                case 'legend':
                                    num = 5;
                                    break;
                                case 'epic':
                                    num = 4;
                                    break;
                                case 'rare':
                                    num = 3;
                                    break;
                                case 'junk':
                                    num = 2;
                                    break;
                                default:
                                    num = 1;
                                    break;
                            }
                            for (var numKey = 0; numKey < num; numKey++)
                                ui.create.div('.item', xing);*/
                            /* 获取武将评级，并转为数字 */
                            get.qyRateNum = function (name) {
                                var rarity = game.getRarity(name);
                                let num = 1;
                                var rateCharacter = game.getExtensionConfig('手杀MVP', 'rateCharacter') || {};
                                if (rateCharacter[name]) num = rateCharacter[name];
                                if (num !== 1) return num;
                                switch (rarity) {
                                    case 'legend':
                                        num = 5;
                                        break;
                                    case 'epic':
                                        num = 4;
                                        break;
                                    case 'rare':
                                        num = 3;
                                        break;
                                    case 'junk':
                                        num = 2;
                                        break;
                                    default:
                                        num = 1;
                                        break;
                                }
                                return num;
                            }
                            var num = get.qyRateNum(player.name);
                            //星星fix
                            num = get.rankNum(player.name);
                            var sumR=lib.config.five_gold_sj?5:4;
                            for (var numKey = 0; numKey < num; numKey++)
                                ui.create.div('.item.on', xing);
                            for (numKey = 0; numKey < sumR - num; numKey++)
                                ui.create.div('.item.off', xing);
                            //修改结束
                            var avatar = ui.create.div('.qy-mvp-avatar', avatarbox);
    //分享开始
 ui.create.div('.qy-mvp-share-button', popuperContainer).addEventListener('click', event => {
    event.stopPropagation();});
    //分享结束    
                            //mvp读取大图
                    var playername = get.name(player);
                    var skinname = game.getFileName2(player.node.avatar.style.backgroundImage);
                    var skin = lib.assetURL + "extension/千幻聆音/sanguoyuanhua/" + playername + "/" + skinname + ".jpg";
                    var yuanhua = lib.assetURL + "extension/千幻聆音/sanguoyuanhua/" + playername + "/" + playername + ".jpg";
                    if (game.LiHuiFileExist(skin)) {
                        avatar.style.backgroundImage = 'url("' + lib.assetURL + "extension/千幻聆音/sanguoyuanhua/" + playername + "/" + skinname +  ".jpg" + '")';
                        avatar.style['top'] = '22.5%';
                        avatar.style['height'] = '56.6%';
                        avatar.style['left'] = '35.8%';
                        avatar.style['width'] = '38.6%';
                    }
                    //允许原画了现在
                    else if (game.LiHuiFileExist(yuanhua)) avatar.style.backgroundImage = 'url("' + lib.assetURL + "extension/千幻聆音/sanguoyuanhua/" + playername + "/" + playername + ".jpg" + '")';
                    else {
                        avatar.style.backgroundImage = player.node.avatar.style.backgroundImage;
                        avatar.style['background-size'] = '108% 108%';
                        var nameP=playername||'none';
                        if(lib.character[nameP]&&lib.character[nameP][4]&&lib.character[nameP][4].indexOf('No_Outcrop')!=-1) {
                            avatar.style['top'] = '22.5%';
                            avatar.style['height'] = '56.6%';
                            avatar.style['left'] = '35.8%';
                            avatar.style['width'] = '38.6%';
                        }else if (config.mvplutou == 'shizhounian') {
                            avatar.style['top'] = '20%';
                            avatar.style['height'] = '57.8%';
                            avatar.style['left'] = '36%';
                            avatar.style['width'] = '37%';
                        }
                        else if (config.mvplutou == 'shousha'){
                            avatar.style['top'] = '14%';
                            avatar.style['height'] = '64.8%';
                            avatar.style['width'] = '38.5%';
                            avatar.style['left'] = '36.9%';
                            //avatar.style['top'] = '15%';
                            //avatar.style['height'] = '62.8%';
                        }
                        else {
                            /*avatar.style['top'] = '23.6%';
                            avatar.style['height'] = '54%';
                            avatar.style['width'] = '38.5%';
                            avatar.style['left'] = '36.9%';*/
                            avatar.style['top'] = '22.5%';
                            avatar.style['height'] = '56.6%';
                            avatar.style['left'] = '35.8%';
                            avatar.style['width'] = '38.6%';
                        }
                        
                    }
                            var qyInfo = ui.create.div('.qy-mvp-qyInfo', container);
                            ui.create.div('.qy-mvp-title', qyInfo);
                            var qycenter = ui.create.div('.qy-mvp-center', qyInfo);
                            var qyIcon = ui.create.div('.qy-mvp-icon', qycenter);
                            if(player.guanjie) {
                                var gjs=player.guanjie;
                                if(player==game.me) gjs='dayuanshuai';
                                qyIcon.setBackgroundImage('extension/手杀ui/character/images/n_'+gjs+'.png');
                            }
                            var qyPlayerInfo = ui.create.div('.qy-player-info', qycenter);
                            ui.create.div(qyPlayerInfo, '.qy-mvp-name-title', '玩家昵称');
                            //增加本人图标开始修改
                            //var nickname = ui.create.div('.qy-mvp-player-nickname', qyPlayerInfo, player === game.me ? lib.config.connect_nickname : get.translation(player.name));
                            var nknames=player.nickname?player.nickname:get.translation(player.name);
                            var nickname = ui.create.div('.qy-mvp-player-nickname', qyPlayerInfo, player === game.me ? lib.config.connect_nickname : nknames);
                            if (game.me === player) ui.create.node('img', nickname).src = lib.assetURL + 'extension/手杀MVP/images/mvp_me_tag.png';
                            //增加本人图标修改结束
                            ui.create.div(qyPlayerInfo, '.qy-mvp-name-title', `技术分：${player.mvpCount || 0}`);
                            var qyScoreInfo = ui.create.div('.qy-mvp-scoreInfo', qyInfo);
                            var table = ui.create.node('table', qyScoreInfo, {width: "100%"});
                            var list = ['攻击分数', '治疗分数', '辅助分数', '局势分数', '惩罚扣分'];
                            list.forEach(value => {
                                var tr = ui.create.node('tr', table);
                                tr.style.colo = 'rgb(234, 138, 76)';
                                var td = ui.create.node('td', tr, value);
                                var num = (player[value] || 0);
                                var num2 = (sorts[1][value]);
                                td = ui.create.node('td', tr).innerHTML = num + (num - num2 >= 30 ? '(遥遥领先)' : '');
                            })
                            window.mvpTime=800;
                        },window.mvpTime)//结算时延迟出现时间
                        //同步音效放出的时间
                        setTimeout(function(){
                            game.playqysstx('images/asqx.mp3');
                        },Math.max(0,window.mvpTime-800));
                    }
                    ui.create.control("全场最佳", 全场最佳);
                    全场最佳();
                });
                ['攻击分数', '治疗分数', '辅助分数', '惩罚扣分'].forEach(value => {
                    HTMLDivElement.prototype[value] = 0;
                });
                HTMLDivElement.prototype.局势分数 = 100;
                Object.defineProperty(HTMLDivElement.prototype, 'mvpCount', {
                    get: function () {
                        return this.攻击分数 + this.治疗分数 + this.辅助分数 + this.局势分数 - this.惩罚扣分;
                    },
                    set: function () {
                    },
                });
                lib.skill['_qy-mvp-effect1'] = {
                    trigger: {
                        player: 'useCard',
                        source: 'damageSource',
                    },
                    direct: true,
                    forced: true,
                    firstDo: true,
                    silent: true,
                    popup: false,
                    filter: function (event, player, name) {
                        if (name === 'useCard') {
                            if (!event.card) return false;
                            if (get.tag({name: event.card.name}, 'damage')) return true;
                            if (event.card.name === 'wuxie') return true;
                            if (get.info(event.card).toself || get.type(event.card) !== 'trick') return false;
                            if (get.info(event.card).selectTarget === -1 || get.info(event.card).selectTarget > 1) return true;
                            return false;
                        }
                        if (event.player == event.source) return false;
                        if (event.source.identity == 'nei') return true;
                        return get.attitude(event.source, event.player) < 0;
                    },
                    content: function () {
                        if (event.triggername === 'damageSource') {
                            if (get.attitude(trigger.source, trigger.player) < 0 || trigger.source.identity == 'nei') trigger.num > 5 ? trigger.source.攻击分数 += 15 : trigger.source.攻击分数 += 3 * trigger.num;
                        } else if (trigger.card) {
                            if (get.tag({name: trigger.card.name}, 'damage'))
                                player.攻击分数 += 2
                            if (trigger.card.name === 'wuxie')
                                player.辅助分数 += 2;
                            if ((get.info(trigger.card).selectTarget === -1 || get.info(trigger.card).selectTarget > 1) && (!get.info(trigger.card).toself && get.type(trigger.card) === 'trick'))
                                player.辅助分数 += 1;
                        }
                    }
                }
                lib.skill['_qy-mvp-effect2'] = {
                    trigger: {player: ['gainEnd', 'discardEnd']},
                    direct: true,
                    forced: true,
                    firstDo: true,
                    silent: true,
                    popup: false,
                    filter: function (event, player, name) {
                        if (name === 'gainEnd') {
                            if (!event.source || event.source == player || !event.source.isIn()) return false;
                            //var evt=event.getl(event.source);
                            //if(!evt&&!evt.cards2&&evt.cards2.length===0) return false;
                            if (!event.cards || event.cards.length == 0) return false;
                            if (event.source.identity == 'nei') return true;
                            return event.player.getEnemies().contains(event.source);
                        }
                        if (name === 'discardEnd') {
                            if (!event.source || event.source == player || !event.source.isIn()) return false;
                            //var evt=event.getl(event.source);
                            //if(!evt&&!evt.cards2&&evt.cards2.length===0) return false;
                            if (!event.cards || event.cards.length == 0) return false;
                            if (event.source.identity == 'nei') return true;
                            return event.player.getEnemies().contains(event.source);
                        }
                    },
                    content: function () {
                        if (event.triggername == 'gainEnd') trigger.player.辅助分数 += 1 * trigger.cards.length;
                        if (event.triggername == 'discardEnd') trigger.source.辅助分数 += 1 * trigger.cards.length;
                    },
                }
                lib.skill['_qy-mvp-effect3'] = {
                    trigger: {player: 'recoverEnd'},
                    direct: true,
                    forced: true,
                    firstDo: true,
                    silent: true,
                    popup: false,
                    filter: function (event, player) {
                        if (!event.source || !event.source.isIn()) return false;
                        if (event.source.identity == 'nei') return true;
                        return event.player.getFriends().contains(event.source) || event.player == event.source;
                    },
                    content: function () {
                        trigger.num > 5 ? trigger.source.治疗分数 += 10 : trigger.source.治疗分数 += 2 * trigger.num;
                    },
                }
                lib.skill['_qy-mvp-effect4'] = {
                    trigger: {source: 'dieBegin'},
                    direct: true,
                    forced: true,
                    firstDo: true,
                    silent: true,
                    popup: false,
                    filter: function (event, player) {
                        return (event.source && event.source.isIn());
                    },
                    content: function () {
                        if (trigger.player.getFriends().contains(trigger.source)) {
                            trigger.source.惩罚扣分 += 5;
                            if (trigger.source.identity == 'nei' && trigger.player.identity != 'zhu') {
                                trigger.source.惩罚扣分 -= 5;
                                trigger.source.攻击分数 += 3;
                            }
                        }
                        if (trigger.player.getEnemies().contains(trigger.source)) {
                            trigger.source.攻击分数 += 3;
                        }
                    },
                }
                lib.skill['_qy-mvp-effect5'] = {
                    trigger: {
                        player: "enterGame",
                        global: ["roundStart", "gameStart"],
                    },
                    direct: true,
                    forced: true,
                    priority: Infinity,
                    firstDo: true,
                    silent: true,
                    popup: false,
                    content: function () {
                        if (!_status._qy_mvp_effect5) {
                            try {
                                var changValue = false;
                                var input = ui.commandnode.link.querySelector("input");
                                var Opt = Object.getOwnPropertyDescriptor(input.__proto__, "value");
                                Object.defineProperty(input, 'value', {
                                    get: function () {
                                        var value = (Opt.get && Opt.get.call(this)) || '';
                                        if (value === '') changValue = false;
                                        else changValue = true
                                        return value;
                                    },
                                    set: function (v) {
                                        Opt.set.call(this, v);
                                    },
                                    configurable: true,
                                })
                                Array.from(ui.commandnode.parentElement.parentElement.querySelectorAll(".menubutton.round.highlight")).forEach(value => {
                                    value.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function (event) {
                                        if ('作' === value.innerText && this.classList.contains('glowing')) {
                                            game.me.惩罚扣分 += 3;
                                        } else if ('执' === value.innerText && changValue) {
                                            game.me.惩罚扣分 += 3;
                                        }
                                    }, true);
                                })
                            } catch (e) {
                                console.error("作弊加载失败：", e)
                            }
                            _status._qy_mvp_effect5 = true;
                        }
                    },
                };
                //样式
                if (lib.config.extension_手杀MVP_yangshi == 'on') {
		        lib.init.css(lib.assetURL + 'extension/手杀MVP', 'extension');
		        };
		        if (lib.config.extension_手杀MVP_yangshi == 'off') {
		        lib.init.css(lib.assetURL + 'extension/手杀MVP', 'extension_new');
	            };
            }
        },
        help: {
        },
        config: {
            "qingyao_shoushaMVP": {
                name: '手杀MVP',
                init: true,
                intro: '开启后，游戏结算后可展示手杀MVP界面。',
            },
            "yangshi": {
                name: 'MVP样式',
                init: 'on',
                item: {
                 on: '<div style="width:64px;height:36px;position:relative;background-image: url(' + lib.assetURL + 'extension/手杀MVP/images/样式1.jpg);background-size: 100% 100%;"></div>',
                 off: '<div style="width:64px;height:36px;position:relative;background-image: url(' + lib.assetURL + 'extension/手杀MVP/images/样式2.jpg);background-size: 100% 100%;"></div>'
                },
            },
            "mvplutou": {
                name: '无原画时MVP露头',
                init: 'shousha',
                item: {
                 shizhounian: '十周年露头',
                 shousha: '手杀露头',
                 off: '无露头'
                },
                unshow:true,//隐藏这个设置
            },
            /*"qingyao_AIxuanjiang": {
                name: 'AI选将',
                init: false,
                intro: '开启后，游戏开始时玩家可以为AI或自己重新选将。(限身份场、斗地主、国战)',
            },*/
            "qingyao_shoushapeiyin": {
                "name": "手杀配音",
                "intro": "开启后，部分游戏音效将替换成手杀音效。",
                "init": true,
            },
        
        "shoushajiesuan": {
                "name": "手杀结算",
                "intro": "开启后，结算面板替换成手杀样式。",
                "init": true,
            },
        "jiesuanfix": {
             "name":"结算优化",
             "intro":"仅开启手杀结算生效，使用新版代码进行结算，能适应身份局的各种罕见胜负情况。",
             "init":true,
        },
        "oneMore": {
                "name": "再来一局",
                "intro": "开启后，结算面板出现“再来一局”按钮。",
                "init": true,
            },
        },
        package: {
            intro: "",
            author: "清瑶的“徒弟”、神秘喵",
            diskURL: "",
            forumURL: "",
            version: "1.1.7",
        },
        files: {
            "character": [],
            "card": [],
            "skill": []
        }
    }
})
