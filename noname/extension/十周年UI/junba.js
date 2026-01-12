'use strict';
decadeModule.import(function(lib, game, ui, get, ai, _status) {
    if (lib.config.mode == 'identity') {
        //明忠模式不适用特殊选将
        game.chooseCharacterOld=game.chooseCharacter;
        game.chooseCharacter = function() {
            if (_status.mode == 'purple') {
                game.chooseCharacterPurple();
                return;
            }
            if (_status.mode == 'zhong'||window.qnssReload) {
                game.chooseCharacterOld();
                return;
            }
            ui.background.style.zIndex = '6';
            var next = game.createEvent('chooseCharacter', false);
            next.showConfig = true;
            next.addPlayer = function(player) {
                var list = lib.config.mode_config.identity.identity[game.players.length - 3].slice(0);
                var list2 = lib.config.mode_config.identity.identity[game.players.length - 2].slice(0);
                for (var i = 0; i < list.length; i++) list2.remove(list[i]);
                player.identity = list2[0];
                player.setIdentity('cai');
            };
            next.removePlayer = function() {
                return game.players.randomGet(game.me, game.zhu);
            };
            next.ai = function(player, list, list2, back) {
                if (_status.brawl && _status.brawl.chooseCharacterAi) {
                    if (_status.brawl.chooseCharacterAi(player, list, list2, back) !== false) {
                        return;
                    }
                }
                if (_status.event.zhongmode) {
                    var listc = list.slice(0, 2);
                    for (var i = 0; i < listc.length; i++) {
                        var listx = lib.characterReplace[listc[i]];
                        if (listx && listx.length) listc[i] = listx.randomGet();
                    }
                    if (get.config('double_character')) {
                        player.init(listc[0], listc[1]);
                    } else {
                        player.init(listc[0]);
                    }
                    if (player.identity == 'mingzhong') {
                        player.hp++;
                        player.maxHp++;
                        player.update();
                    }
                } else if (player.identity == 'zhu') {
                    list2.randomSort();
                    var choice, choice2;
                    if (!_status.event.zhongmode && Math.random() - 0.8 < 0 && list2.length) {
                        choice = list2[0];
                        choice2 = list[0];
                        if (choice2 == choice) {
                            choice2 = list[1];
                        }
                    } else {
                        choice = list[0];
                        choice2 = list[1];
                    }
                    if (lib.characterReplace[choice] && lib.characterReplace[choice].length) choice = lib.characterReplace[choice].randomGet();
                    if (lib.characterReplace[choice2] && lib.characterReplace[choice2].length) choice2 = lib.characterReplace[choice2].randomGet();
                    if (get.config('double_character')) {
                        player.init(choice, choice2);
                    } else {
                        player.init(choice);
                    }
                    if (game.players.length > 4) {
                        player.hp++;
                        player.maxHp++;
                        player.update();
                    }
                //} else if (player.identity == 'zhong' && (Math.random() < 0.5 || ['sunliang', 'key_akane'].contains(game.zhu.name))) {
                //忠从主势优化
                } else if(player.identity=='zhong'&&((get.config('zhong_group_choose')!='none'&&lib.character[game.zhu.name]&&lib.character[game.zhu.name][4].contains('zhu')&&Math.random()*100<=parseFloat(get.config('zhong_group_choose')))||(get.config('zhong_group_choose')=='none'&&(Math.random()<0.5||['sunliang','key_akane'].contains(game.zhu.name))))){
                    var listc = list.slice(0);
                    for (var i = 0; i < listc.length; i++) {
                        var listx = lib.characterReplace[listc[i]];
                        if (listx && listx.length) listc[i] = listx.randomGet();
                    }
                    var choice = 0;
                    for (var i = 0; i < listc.length; i++) {
                        if (lib.character[listc[i]][1] == game.zhu.group) {
                            choice = i;
                            break;
                        }
                    }
                    if (get.config('double_character')) {
                        player.init(listc[choice], listc[choice == 0 ? choice + 1 : choice - 1]);
                    } else {
                        player.init(listc[choice]);
                    }
                } else {
                    var listc = list.slice(0, 2);
                    for (var i = 0; i < listc.length; i++) {
                        var listx = lib.characterReplace[listc[i]];
                        if (listx && listx.length) listc[i] = listx.randomGet();
                    }
                    if (get.config('double_character')) {
                        player.init(listc[0], listc[1]);
                    } else {
                        player.init(listc[0]);
                    }
                }
                if (back) {
                    list.remove(get.sourceCharacter(player.name1));
                    list.remove(get.sourceCharacter(player.name2));
                    for (var i = 0; i < list.length; i++) {
                        back.push(list[i]);
                    }
                }
                if (typeof lib.config.test_game == 'string' && player == game.me.next) {
                    player.init(lib.config.test_game);
                }
                if (get.is.double(player.name1)) {
                    player._groupChosen = true;
                    player.group = get.is.double(player.name1, true)
                        .randomGet();
                    player.node.name.dataset.nature = get.groupnature(player.group);
                } else if (get.config('choose_group') && (player.group == 'shen'||player.group == 'devil') && !player.isUnseen(0)) {
                    var list = lib.group.slice(0);
                    list.remove('shen');
                    list.remove('devil');
                    if (list.length) player.group = function() {
                        if (_status.mode != 'zhong' && game.zhu && game.zhu.group) {
                            if (['re_zhangjiao', 'liubei', 're_liubei', 'caocao', 're_caocao', 'sunquan', 're_sunquan', 'zhangjiao', 'sp_zhangjiao', 'caopi', 're_caopi', 'liuchen', 'caorui', 'sunliang', 'sunxiu', 'sunce', 're_sunben', 'ol_liushan', 're_liushan', 'key_akane', 'dongzhuo', 're_dongzhuo', 'ol_dongzhuo', 'jin_simashi', 'mb_caomao', 'v_sunquan'].contains(game.zhu.name)) return game.zhu.group;
                            if (game.zhu.name == 'yl_yuanshu') {
                                if (player.identity == 'zhong') list.remove('qun');
                                else return 'qun';
                            }
                            if (['sunhao', 'xin_yuanshao', 're_yuanshao', 're_sunce', 'ol_yuanshao', 'yuanshu', 'jin_simazhao', 'liubian'].contains(game.zhu.name)) {
                                if (player.identity != 'zhong') list.remove(game.zhu.group);
                                else return game.zhu.group;
                            }
                        }
                        if(game.zhu!=player&&game.zhu.isFriendsOf(player)) {
                            if(get.zhuFriendGroups()) return get.zhuFriendGroups().randomGet();
                        }else {
                            if(get.zhuFriendGroups(true)) {
                                var noG=get.zhuFriendGroups(true);
                                if(lib.character&&game.me.name&&lib.character[game.me.name]&&lib.character[game.me.name][4]) {
                                    for(var i=0;i<noG.length;i++) {
                                        if(lib.character[game.me.name][4].contains(noG[i])&&Math.random()<0.85) return noG[i];
                                    }
                                }
                                return noG.randomGet();
                            }
                        }
                        var noG=lib.group.slice(0);
                        if(lib.character&&game.me.name&&lib.character[game.me.name]&&lib.character[game.me.name][4]) {
                            for(var i=0;i<noG.length;i++) {
                                if(lib.character[game.me.name][4].contains(noG[i])&&Math.random()<0.75) return noG[i];
                            }
                        }
                        return list.randomGet();
                    }();
                }
                //这里重写一下设置双将
                player.node.name.dataset.nature = get.groupnature(player.group);
                //这里是主公
                player.node.name.dataset.nature2 = get.groupnature2(player);
            }
            next.setContent(function() {
                "step 0"
                //window.canNoShowSearch=true;
                //if(ui.Searcher) ui.Searcher.hide();
                ui.arena.classList.add('choose-character');
                //从choose-character往下修改background的图层
                var i;
                var list;
                var list2 = [];
                var list3 = [];
                var list4 = [];
                var identityList;
                var chosen = lib.config.continue_name || [];
                game.saveConfig('continue_name');
                event.chosen = chosen;
                if (_status.mode == 'zhong') {
                    event.zhongmode = true;
                    identityList = ['zhu', 'zhong', 'mingzhong', 'nei', 'fan', 'fan', 'fan', 'fan'];
                } else {
                    identityList = lib.config.mode_config.identity.identity[game.players.length - 2].slice(0);
                    if (get.config('double_nei')) {
                        switch (get.playerNumber()) {
                            case 8:
                                identityList.remove('fan');
                                identityList.push('nei');
                                break;
                            case 7:
                                identityList.remove('zhong');
                                identityList.push('nei');
                                break;
                            case 6:
                                identityList.remove('fan');
                                identityList.push('nei');
                                break;
                            case 5:
                                identityList.remove('fan');
                                identityList.push('nei');
                                break;
                            case 4:
                                identityList.remove('zhong');
                                identityList.push('nei');
                                break;
                            case 3:
                                identityList.remove('fan');
                                identityList.push('nei');
                                break;
                        }
                    }
                }
                var addSetting = function(dialog) {
                    dialog.add('选择身份')
                        .classList.add('add-setting');
                    var table = document.createElement('div');
                    table.classList.add('add-setting');
                    table.style.margin = '0';
                    table.style.width = '100%';
                    table.style.position = 'relative';
                    var listi;
                    if (event.zhongmode) {
                        listi = get.junbaIdeFilter(['random', 'zhu', 'mingzhong', 'zhong', 'nei', 'fan']);
                    } else {
                        listi = get.junbaIdeFilter(['random', 'zhu', 'zhong', 'nei', 'fan']);
                    }
                    var idelist= lib.config.mode_config.identity.identity[game.players.length - 2].slice(0);
                    if(idelist&&!event.zhongmode) for(var i=0;i<listi.length;i++) {
                        if(['random','mingzhong'].contains(listi[i])) continue;
                        if(!idelist.contains(listi[i])) listi.remove(listi[i]);
                    }

                    //设置点击间隔0.5s防止卡bug
                    var ideChoosing=false;
                    for (var i = 0; i < listi.length; i++) {
                        var td = ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
                        td.link = listi[i];
                        if (td.link === game.me.identity) {
                            td.classList.add('bluebg');
                        }
                        table.appendChild(td);
                        td.innerHTML = '<span>' + get.translation(listi[i] + '2') + '</span>';
                        td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function() {
                            if (_status.dragged) return;
                            if (_status.justdragged) return;
                            if(ideChoosing) return;
                            ideChoosing=true;
                            setTimeout(function(){
                                ideChoosing=false;
                            },500);
                            _status.tempNoButton = true;
                            setTimeout(function() {
                                _status.tempNoButton = false;
                            }, 500);
                            var link = this.link;
                            if (game.zhu) {
                                if (link != 'random') {
                                    _status.event.parent.fixedseat = get.distance(game.me, game.zhu, 'absolute');
                                }
                                if (game.zhu.name) game.zhu.uninit();
                                delete game.zhu.isZhu;
                                delete game.zhu.identityShown;
                            }
                            var current = this.parentNode.querySelector('.bluebg');
                            if (current) {
                                current.classList.remove('bluebg');
                            }
                            current = seats.querySelector('.bluebg');
                            if (current) {
                                current.classList.remove('bluebg');
                            }
                            if (link == 'random') {
                                if (event.zhongmode) {
                                    link = ['zhu', 'zhong', 'nei', 'fan', 'mingzhong'].randomGet();
                                } else {
                                    var linklist=['zhu', 'zhong', 'nei', 'fan'];
                                    var linklist2 = lib.config.mode_config.identity.identity[game.players.length - 2].slice(0);
                                    if(linklist2) {
                                        link=linklist2;
                                    }else {
                                        link=linklist;
                                    }
                                    link = link.randomGet();
                                }
                                /*var idelist=lib.config.mode_config.identity.identity[game.players.length - 2].slice(0);
                                if(idelist&&!event.zhongmode) for(var i=0;i<link.length;i++) {
                                    if(['random','mingzhong'].contains(link[i])) continue;
                                    if(!idelist.contains(link[i])) link.remove(link[i]);
                                }
                                //alert('1'+idelist);*/
                                for (var i = 0; i < this.parentNode.childElementCount; i++) {
                                    if (this.parentNode.childNodes[i].link == link) {
                                        this.parentNode.childNodes[i].classList.add('bluebg');
                                    }
                                }
                            } else {
                                this.classList.add('bluebg');
                            }
                            num = get.config('choice_' + link);
                            if (event.zhongmode) {
                                num = 6;
                                if (link == 'zhu' || link == 'nei' || link == 'mingzhong') {
                                    num = 8;
                                }
                            }
                            _status.event.parent.swapnodialog = function(dialog, list) {
                                var buttons = ui.create.div('.buttons');
                                var node = dialog.buttons[0].parentNode;
                                dialog.buttons = ui.create.buttons(list, 'characterx', buttons);
                                dialog.content.insertBefore(buttons, node);
                                buttons.animate('start');
                                node.remove();
                                game.uncheck();
                                game.check();
                                for (var i = 0; i < seats.childElementCount; i++) {
                                    if (get.distance(game.zhu, game.me, 'absolute') === seats.childNodes[i].link) {
                                        seats.childNodes[i].classList.add('bluebg');
                                    }
                                }
                            }
                            _status.event = _status.event.parent;
                            _status.event.step = 0;
                            _status.event.identity = link;
                            if (link != (event.zhongmode ? 'mingzhong' : 'zhu')) {
                                seats.previousSibling.style.display = '';
                                seats.style.display = '';
                            } else {
                                seats.previousSibling.style.display = 'none';
                                seats.style.display = 'none';
                            }
                            game.junbaupdate();
                            //  ui.create.cheat2();
                            game.resume();
                        });
                    }
                    dialog.content.appendChild(table);
                    dialog.add('选择座位')
                        .classList.add('add-setting');
                    var seats = document.createElement('div');
                    seats.classList.add('add-setting');
                    seats.style.margin = '0';
                    seats.style.width = '100%';
                    seats.style.position = 'relative';
                    for (var i = 2; i <= game.players.length; i++) {
                        var td = ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
                        td.innerHTML = get.cnNumber(i, true);
                        td.link = i - 1;
                        seats.appendChild(td);
                        if (get.distance(game.zhu, game.me, 'absolute') === i - 1) {
                            td.classList.add('bluebg');
                        }
                        td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function() {
                            if (_status.dragged) return;
                            if (_status.justdragged) return;
                            if (get.distance(game.zhu, game.me, 'absolute') == this.link) return;
                            var current = this.parentNode.querySelector('.bluebg');
                            if (current) {
                                current.classList.remove('bluebg');
                            }
                            this.classList.add('bluebg');
                            for (var i = 0; i < game.players.length; i++) {
                                if (get.distance(game.players[i], game.me, 'absolute') == this.link) {
                                    game.swapSeat(game.zhu, game.players[i], false);
                                    game.junbaupdate();
                                    return;
                                }
                            }
                        });
                    }
                    dialog.content.appendChild(seats);
                    if (game.me == game.zhu) {
                        seats.previousSibling.style.display = 'none';
                        seats.style.display = 'none';
                    }

                    dialog.add(ui.create.div('.placeholder.add-setting'));
                    dialog.add(ui.create.div('.placeholder.add-setting'));
                    if (get.is.phoneLayout()) dialog.add(ui.create.div('.placeholder.add-setting'));
                };
                var removeSetting = function() {
                    var dialog = _status.event.dialog;
                    if (dialog) {
                        dialog.style.height = '';
                        delete dialog._scrollset;
                        var list = Array.from(dialog.querySelectorAll('.add-setting'));
                        while (list.length) {
                            list.shift()
                                .remove();
                        }
                        ui.update();
                    }
                };
                event.addSetting = addSetting;
                event.removeSetting = removeSetting;
                event.list = [];
                identityList.randomSort();
                if (event.identity) {
                    identityList.remove(event.identity);
                    identityList.unshift(event.identity);
                    if (event.fixedseat) {
                        var zhuIdentity = (_status.mode == 'zhong') ? 'mingzhong' : 'zhu';
                        if (zhuIdentity != event.identity) {
                            identityList.remove(zhuIdentity);
                            identityList.splice(event.fixedseat, 0, zhuIdentity);
                        }
                        delete event.fixedseat;
                    }
                    delete event.identity;
                } else if (_status.mode != 'zhong' && (!_status.brawl || !_status.brawl.identityShown)) {
                    var ban_identity = [];
                    ban_identity.push(get.config('ban_identity') || 'off');
                    if (ban_identity[0] != 'off') {
                        ban_identity.push(get.config('ban_identity2') || 'off');
                        if (ban_identity[1] != 'off') {
                            ban_identity.push(get.config('ban_identity3') || 'off');
                        }
                    }
                    ban_identity.remove('off');
                    if (ban_identity.length) {
                        var identityList2 = identityList.slice(0);
                        for (var i = 0; i < ban_identity.length; i++) {
                            while (identityList2.remove(ban_identity[i]));
                        }
                        ban_identity = identityList2.randomGet();
                        identityList.remove(ban_identity);
                        identityList.splice(game.players.indexOf(game.me), 0, ban_identity);
                    }
                }
                for (i = 0; i < game.players.length; i++) {
                    if (_status.brawl && _status.brawl.identityShown) {
                        if (game.players[i].identity == 'zhu') game.zhu = game.players[i];
                        game.players[i].identityShown = true;
                    } else {
                        game.players[i].node.identity.classList.add('guessing');
                        game.players[i].identity = identityList[i];
                        game.players[i].setIdentity('cai');
                        if (event.zhongmode) {
                            if (identityList[i] == 'mingzhong') {
                                game.zhu = game.players[i];
                            } else if (identityList[i] == 'zhu') {
                                game.zhu2 = game.players[i];
                            }
                        } else {
                            if (identityList[i] == 'zhu') {
                                game.zhu = game.players[i];
                            }
                        }
                        game.players[i].identityShown = false;
                    }
                }

                if (get.config('special_identity') && !event.zhongmode && game.players.length == 8) {
                    for (var i = 0; i < game.players.length; i++) {
                        delete game.players[i].special_identity;
                    }
                    event.special_identity = [];
                    var zhongs = game.filterPlayer(function(current) {
                        return current.identity == 'zhong';
                    });
                    var fans = game.filterPlayer(function(current) {
                        return current.identity == 'fan';
                    });
                    if (fans.length >= 1) {
                        fans.randomRemove()
                            .special_identity = 'identity_zeishou';
                        event.special_identity.push('identity_zeishou');
                    }
                    if (zhongs.length > 1) {
                        zhongs.randomRemove()
                            .special_identity = 'identity_dajiang';
                        zhongs.randomRemove()
                            .special_identity = 'identity_junshi';
                        event.special_identity.push('identity_dajiang');
                        event.special_identity.push('identity_junshi');
                    } else if (zhongs.length == 1) {
                        if (Math.random() < 0.5) {
                            zhongs.randomRemove()
                                .special_identity = 'identity_dajiang';
                            event.special_identity.push('identity_dajiang');
                        } else {
                            zhongs.randomRemove()
                                .special_identity = 'identity_junshi';
                            event.special_identity.push('identity_junshi');
                        }
                    }
                }

                if (!game.zhu) game.zhu = game.me;
                else {
                    game.zhu.setIdentity();
                    game.zhu.identityShown = true;
                    game.zhu.isZhu = (game.zhu.identity == 'zhu');
                    game.zhu.node.identity.classList.remove('guessing');
                    game.me.setIdentity();
                    game.me.node.identity.classList.remove('guessing');
                }
                //选将框分配
                for (i in lib.characterReplace) {
                    var ix = lib.characterReplace[i];
                    for (var j = 0; j < ix.length; j++) {
                        if (chosen.contains(ix[j]) || lib.filter.characterDisabled(ix[j])) ix.splice(j--, 1);
                    }
                    if (ix.length) {
                        event.list.push(i);
                        list4.addArray(ix);
                        var bool = false;
                        for (var j of ix) {
                            if (lib.character[j][4] && lib.character[j][4].contains('zhu')) {
                                bool = true;
                                break;
                            }
                        }
                        (bool ? list2 : list3)
                            .push(i);
                    }
                }
                for (i in lib.character) {
                    if (list4.contains(i)) continue;
                    if (chosen.contains(i)) continue;
                    if (lib.filter.characterDisabled(i)) continue;
                    event.list.push(i);
                    list4.push(i);
                    if (lib.character[i][4] && lib.character[i][4].contains('zhu')) {
                        list2.push(i);
                    } else {
                        list3.push(i);
                    }
                };
                var getZhuList = function() {
                    var limit_zhu = get.config('limit_zhu');
                    if (!limit_zhu || limit_zhu == 'off') return list2.slice(0)
                        .sort(lib.sort.character);
                    if (limit_zhu != 'group') {
                        var num = (parseInt(limit_zhu) || 6);
                        return list2.randomGets(num)
                            .sort(lib.sort.character);
                    }
                    var getGroup = function(name) {
                        if (lib.characterReplace[name]) return lib.character[lib.characterReplace[name][0]][1];
                        return lib.character[name][1];
                    }
                    var list2x = list2.slice(0);
                    list2x.randomSort();
                    for (var i = 0; i < list2x.length; i++) {
                        for (var j = i + 1; j < list2x.length; j++) {
                            if (getGroup(list2x[i]) == getGroup(list2x[j])) {
                                list2x.splice(j--, 1);
                            }
                        }
                    }
                    list2x.sort(lib.sort.character);
                    return list2x;
                }
                event.list.randomSort();
                _status.characterlist = list4.slice(0)
                    .randomSort();
                list3.randomSort();
                if (_status.brawl && _status.brawl.chooseCharacterFilter) {
                    _status.brawl.chooseCharacterFilter(event.list, getZhuList(), list3);
                }
                var num = get.config('choice_' + game.me.identity);
                if (event.zhongmode) {
                    num = 6;
                    if (game.me.identity == 'zhu' || game.me.identity == 'nei' || game.me.identity == 'mingzhong') {
                        num = 8;
                    }
                }
                if (game.zhu != game.me) {
                    event.ai(game.zhu, event.list, getZhuList())
                    event.list.remove(get.sourceCharacter(game.zhu.name1));
                    event.list.remove(get.sourceCharacter(game.zhu.name2));
                    if (_status.brawl && _status.brawl.chooseCharacter) {
                        list = _status.brawl.chooseCharacter(event.list, num);
                        if (list === false || list === 'nozhu') {
                            list = event.list.slice(0, num);
                        }
                    } else {
                        list = event.list.slice(0, num);
                    }
                } else {
                    if (_status.brawl && _status.brawl.chooseCharacter) {
                        list = _status.brawl.chooseCharacter(getZhuList(), list3, num);
                        if (list === false) {
                            if (event.zhongmode) {
                                list = list3.slice(0, 6);
                            } else {
                                list = getZhuList()
                                    .concat(list3.slice(0, num));
                            }
                        } else if (list === 'nozhu') {
                            list = event.list.slice(0, num);
                        }
                    } else {
                        if (event.zhongmode) {
                            list = list3.slice(0, 8);
                        } else {
                            list = getZhuList()
                                .concat(list3.slice(0, num));
                        }
                    }
                }
                delete event.swapnochoose;
                var dialog;
                if (event.swapnodialog) {
                    dialog = ui.dialog;
                    event.swapnodialog(dialog, list);
                    delete event.swapnodialog;
                } else {
                    var str = '可选武将';
                    if (_status.brawl && _status.brawl.chooseCharacterStr) {
                        str = _status.brawl.chooseCharacterStr;
                    }
                    dialog = ui.create.dialog(str, 'hidden', [list, 'characterx']);
                    if(dialog._titles?.goldTitle) {
                        dialog._titles.goldTitle.classList.remove('contentGoldTitlePosition');
                        dialog._titles.goldTitle.innerHTML = dialog._titles.title.innerHTML;
                        dialog._titles.goldTitle.style.left = '3.5px';
                        dialog.contentContainer.style.setProperty('top','25px','important');
                    }

                    dialog.classList.add('noupdate')
                    dialog.id = 'identitychoose';
                    //  dialog.querySelector('.identity').style.backgroundImage = 'url("' + lib.assetURL + "extension/十周年UI/image/group/" +get.groupnature2(infoitem)+ '.png")';
                    if (!_status.brawl || !_status.brawl.noAddSetting) {
                        if (get.config('change_identity')) {
                            addSetting(dialog);
                        }
                    }
                    game.junbaupdate = function() {
                        setTimeout(function() {
                            if(dialog._titles?.goldTitle) {
                                let checkToFix = function(redo) {
                                    if(dialog.content.childNodes.length>2) {
                                        //选将列表
                                        dialog.content.childNodes[1].style.marginTop='15px';
                                        //改身份列表
                                        dialog.content.childNodes[2].style.marginTop='-80px';
                                    }else {
                                        setTimeout(function() {
                                            redo();
                                        },1000);
                                    }
                                };
                                checkToFix(checkToFix);
                            }
                            /*这里让主公也能选*/
                            if (game.me.identity != 'zhu') {
                                if (!ui.dialogk) ui.dialogk = ui.create.div(".junbazhu", ui.arena);
                                /*ui.dialogk是中间主公提示*/
                                var isDisPec=false;
                                if (!ui.leftPane) ui.leftPane = ui.create.div('.left', ui.dialogk);
                                if (!game.zhu.classList.contains('unseen')) setTimeout(() => {
                                    if (!game.zhu.classList.contains('unseen')&&ui.leftPane) {
                                        ui.leftPane.style.backgroundImage = game.zhu.node.avatar.style.backgroundImage;
                                        var name=game.zhu.name||'none';
                                        if(lib.character[name]&&lib.character[name][4]&&lib.character[name][4].indexOf('No_Outcrop')!=-1) {
            					            //原版高168px
            					            isDisPec=true;
            					            var disPec=(168/191);
            					            game.createCss(`.No_OutcropZhu {
                					            height: ${77*disPec}% !important;
                					        }`);
                					        ui.leftPane.classList.add('No_OutcropZhu');
        					            }else {
        					                ui.leftPane.classList.remove('No_OutcropZhu');
        					            }
                                    }
                                }, 1);
                                //删除背景图
                                if (game.zhu.classList.contains('unseen')) ui.leftPane.style.backgroundImage = '';
                                if (!ui.biankuang) ui.biankuang = ui.create.div('.biankuangname', ui.dialogk);
                                if (!ui.biankuang2) {
                                    ui.biankuang2 = ui.create.div('.biankuangname', ui.dialogk);
                                    ui.biankuang2.style.zIndex=20;
                                    ui.biankuang2.style.filter='drop-shadow(0 0 1px rgba(0, 0, 0, 0.5))';
                                }
                                ui.biankuang.setBackgroundImage('extension/十周年UI/assets/image/group/name2_' + game.zhu.group + '.png');
                                if (!ui.biao) ui.biao = ui.create.div('.biao', ui.dialogk);//ui.leftPane
                                if (ui.zhuover) ui.zhuover.remove();
                                delete ui.zhuover;
                                ui.zhuover = ui.create.div('.zhuover', ui.dialogk);
                                if (!ui.namek) ui.namek = ui.create.div('.name', ui.biankuang);
                                //适应高亮哈
                                ui.namek.innerHTML = get.prefixBoldName(game.zhu.name,'character');
                                //ui.namek.innerHTML = get.translation(game.zhu.name);
                                ui.namek.dataset.nature = get.groupnature2(game.zhu);
                                if (!ui.zhuhpWrap) ui.zhuhpWrap = ui.create.div('.hp-wrap', ui.biankuang2);
                                if (!ui.zhuhp && ui.zhuhpWrap) ui.zhuhp = ui.create.div('.hp', ui.biankuang2, ui.zhuhpWrap);
                                // ui.biankuang.insertBefore(ui.zhuhpWrap, ui.zhuhp);
                                //  ui.zhuhpWrap.appendChild(ui.zhuhp);
                                if (!game.zhu.classList.contains('unseen')) {
                                    var hpNode = ui.zhuhp;
                                    var infoitem = lib.character[game.zhu.name];
                                    /*var hp = get.infoHp(infoitem[2]),
                                        maxHp = get.infoMaxHp(infoitem[2]),
                                        hujia = get.infoHujia(infoitem[2]);*/
                                    //调整实际方案
                                    var hp = game.zhu.getHp()||get.infoHp(infoitem[2]),
                                        maxHp = game.zhu.maxHp||get.infoMaxHp(infoitem[2]),
                                        hujia = game.zhu.hujia||get.infoHujia(infoitem[2]);
                                    game.createCss(`.ZhuHp_ShowTop {
        					            z-index: 20 !important;
        					        }`);
                                    hpNode.classList.add('ZhuHp_ShowTop');
                                    if (maxHp > 5 || (hujia && maxHp > 3)) {
                                        hpNode.innerHTML = (isNaN(hp) ? '×' : (hp == Infinity ? '∞' : hp)) + '<br>' + '/' + '<br>' + (isNaN(maxHp) ? '×' : (maxHp == Infinity ? '∞' : maxHp)) + '<div class="morehp"></div>';
                                        if (hujia) hpNode.innerHTML += '<div class="morehujia">' + hujia + '</div>';

                                        hpNode.classList.add('textstyle');
                                    } else {
                                        hpNode.innerHTML = '';
                                        hpNode.classList.remove('textstyle');
                                        while (maxHp > hpNode.childNodes.length) ui.create.div(hpNode);
                                        //while (Math.max(0, maxHp) < hpNode.childNodes.length) hpNode.lastChild.remove();										
                                        for (var i = 0; i < Math.max(0, maxHp); i++) {
                                            var index = i;
                                            /*	if (get.is.newLayout()) {
                                                    index = maxHp - i - 1;
                                                }*/
                                            if (i < hp) {
                                                hpNode.childNodes[index].classList.remove('lost');
                                            } else {
                                                hpNode.childNodes[index].classList.add('lost');
                                            }
                                        }
                                    }
                                    if (hp > Math.round(maxHp / 2) || hp === maxHp) {
                                        hpNode.dataset.condition = 'high';
                                    } else if (hp > Math.floor(maxHp / 3)) {
                                        hpNode.dataset.condition = 'mid';
                                    } else {
                                        hpNode.dataset.condition = 'low';
                                    }
                                } else {
                                    if (ui.zhuhpWrap) ui.zhuhpWrap.remove();
                                    delete ui.zhuhpWrap;
                                    if (ui.zhuhp) ui.zhuhp.remove();
                                    delete ui.zhuhp;
                                }
                                /* if (!ui.zhuhp)
                                     ui.zhuhp = ui.create.div('.zhuhp', ui.biankuang);
                                 if (!game.zhu.classList.contains('unseen')) ui.zhuhp.innerHTML = lib.character[game.zhu.name][2];
                                 if (ui.zhuhp.innerHTML > 0.5) {
                                     ui.zhuhp.dataset.color = 'high';
                                 } else if (ui.zhuhp.innerHTML > 0.3) {
                                     ui.zhuhp.dataset.condition = 'mid';
                                 } else {
                                     ui.zhuhp.dataset.condition = 'low';
                                 }*/
                                if (!ui.rightPane) ui.rightPane = ui.create.div('.right', ui.dialogk);
                                if(lib.config.ui_zoom=='small') ui.rightPane.style.padding='11px 15px 20px 0';
                                if(lib.config.ui_zoom=='vsmall') ui.rightPane.style.padding='13px 15px 20px 0';
                                if(lib.config.ui_zoom=='esmall') ui.rightPane.style.padding='11px 15px 20px 0';
                                ui.rightPane.innerHTML = '<div></div>';
                                lib.setScroll(ui.rightPane.firstChild);
                                if (!game.zhu.classList.contains('unseen')) {
                                    var oSkills = game.zhu.skills;
                                    if (oSkills.length) {
                                        oSkills.forEach(function(name) {
                                            if(!get.skillInfoTranslation(name, player).length) return;
                                            ui.create.div('.xskill', '<div data-color>【' + get.translation(name) + '】</div>' + '<div>' + get.skillInfoTranslation(name, player) + '</div>', ui.rightPane.firstChild);
                                        });
                                    }
                                }
                                if (!ui.dialogg) ui.dialogg = ui.create.div(".junbaseat", ui.arena);
                                if (!ui.dialoggk) {
                                    ui.dialoggk = [];
                                    /*dialogg是右上角*/
                                    for (i = 0; i < 8; i++) {
                                        var k = ui.create.div('.num', ui.dialogg);
                                        k.classList.add('num' + [i]);
                                        ui.dialoggk.push(k);
                                        if (i == 0) k.classList.add(game.me.identity);
                                        if (i>=game.players.length) {
                                            k.classList.add('null');
                                            k.innerHTML = " ";
                                            continue;
                                        }
                                        var numk = get.distance(game.zhu, game.players[i], 'absolute') + 1;
                                        k.innerHTML = "<img src='" + lib.assetURL + 'extension/十周年UI/assets/image/identity/seat_' + numk + '.png' + "' style='position:relative;width:12px;height:12px;bottom:-18px;left:4px;'/>";
                                        if (game.players[i] == game.zhu) k.classList.add('zhu');
                                    }
                                }
                                if (ui.dialoggk && ui.dialoggk.length) {
                                    for (i = 0; i < ui.dialoggk.length; i++) {
                                        ui.dialoggk[i].className = 'num';
                                        ui.dialoggk[i].classList.add('num' + [i]);
                                        if (i == 0) ui.dialoggk[i].classList.add(game.me.identity);
                                        if (i>=game.players.length) {
                                            ui.dialoggk[i].classList.add('null');
                                            ui.dialoggk[i].innerHTML = " ";
                                            continue;
                                        }
                                        var numk = get.distance(game.zhu, game.players[i], 'absolute') + 1;
                                        ui.dialoggk[i].innerHTML = "<img src='" + lib.assetURL + 'extension/十周年UI/assets/image/identity/seat_' + numk + '.png' + "' style='position:relative;width:12px;height:12px;bottom:-18px;left:4px;'/>";
                                        if (game.players[i] == game.zhu) ui.dialoggk[i].classList.add('zhu');
                                    }
                                }
                                if (!ui.metip) ui.metip = ui.create.div('.metip', ui.dialogg);
                                if (game.me.identity == 'zhong') ui.metip.innerHTML = "<span style='color:#BFAF58;'>我(忠臣️)</span>";
                                if (game.me.identity == 'nei') ui.metip.innerHTML = "<span style='color:#87CEFA;'>我(内奸)️</span>";
                                if (game.me.identity == 'fan') ui.metip.innerHTML = "<span style='color:#5D7C48;'>我(反贼️)</span>";
                            } else if (game.me.identity == 'zhu') {
                                if (!ui.dialogk) ui.dialogk = ui.create.div(".junbazhu", ui.arena);
                                /*ui.dialogk是中间主公提示*/
                                if (!ui.leftPane) ui.leftPane = ui.create.div('.left', ui.dialogk);
                                //删除背景图
                                ui.leftPane.style.backgroundImage = '';
                                if (!ui.biankuang) ui.biankuang = ui.create.div('.biankuangname', ui.dialogk);
                                if (!ui.biankuang2) {
                                    ui.biankuang2 = ui.create.div('.biankuangname', ui.dialogk);
                                    ui.biankuang2.style.zIndex=20;
                                    ui.biankuang2.style.filter='drop-shadow(0 0 1px rgba(0, 0, 0, 0.5))';
                                }
                                ui.biankuang.style.backgroundImage = 'url("'+lib.assetURL+'extension/十周年UI/assets/image/identity/jiang.png")';
                                //ui.biankuang.setBackgroundImage("ext:十周年UI/assets/image/identity/jiang.png)");
                                if (ui.biao) ui.biao.remove();
                                delete ui.biao;
                                //if (!ui.biao) ui.biao = ui.create.div('.biao', ui.leftPane);
                                //if (!ui.zhuover) ui.zhuover = ui.create.div('.zhuover', ui.dialogk);
                                if (ui.zhuover) ui.zhuover.remove();
                                delete ui.zhuover;
                                ui.zhuover = ui.create.div(".xuanjiangwenzi", ui.dialogk);
                                ui.zhuover.insertAdjacentHTML("afterbegin", "您的身份是主公<br>请选择武将");
                                if (!ui.namek) ui.namek = ui.create.div('.name', ui.biankuang);
                                ui.namek.innerHTML = get.translation(game.zhu.name);
                                ui.namek.dataset.nature = get.groupnature2(game.zhu);
                                if (!ui.zhuhpWrap) ui.zhuhpWrap = ui.create.div('.hp-wrap', ui.biankuang2);
                                if (!ui.zhuhp && ui.zhuhpWrap) ui.zhuhp = ui.create.div('.hp', ui.biankuang2, ui.zhuhpWrap);
                                // ui.biankuang.insertBefore(ui.zhuhpWrap, ui.zhuhp);
                                //  ui.zhuhpWrap.appendChild(ui.zhuhp);
                                if (ui.zhuhpWrap) ui.zhuhpWrap.remove();
                                delete ui.zhuhpWrap;
                                if (ui.zhuhp) ui.zhuhp.remove();
                                delete ui.zhuhp;
                                /* if (!ui.zhuhp)
                                     ui.zhuhp = ui.create.div('.zhuhp', ui.biankuang);
                                 if (!game.zhu.classList.contains('unseen')) ui.zhuhp.innerHTML = lib.character[game.zhu.name][2];
                                 if (ui.zhuhp.innerHTML > 0.5) {
                                     ui.zhuhp.dataset.color = 'high';
                                 } else if (ui.zhuhp.innerHTML > 0.3) {
                                     ui.zhuhp.dataset.condition = 'mid';
                                 } else {
                                     ui.zhuhp.dataset.condition = 'low';
                                 }*/
                                if (!ui.rightPane) ui.rightPane = ui.create.div('.right', ui.dialogk);
                                if(lib.config.ui_zoom=='small') ui.rightPane.style.padding='11px 15px 20px 0';
                                if(lib.config.ui_zoom=='vsmall') ui.rightPane.style.padding='13px 15px 20px 0';
                                if(lib.config.ui_zoom=='esmall') ui.rightPane.style.padding='11px 15px 20px 0';
                                ui.rightPane.innerHTML = '<div></div>';
                                lib.setScroll(ui.rightPane.firstChild);
                                if (!game.zhu.classList.contains('unseen')) {
                                    var oSkills = game.zhu.skills;
                                    if (oSkills.length) {
                                        oSkills.forEach(function(name) {
                                            if(!get.skillInfoTranslation(name, player).length) return;
                                            ui.create.div('.xskill', '<div data-color>【' + get.translation(name) + '】</div>' + '<div>' + get.skillInfoTranslation(name, player) + '</div>', ui.rightPane.firstChild);
                                        });
                                    }
                                }
                                if (!ui.dialogg) ui.dialogg = ui.create.div(".junbaseat", ui.arena);
                                if (!ui.dialoggk) {
                                    ui.dialoggk = [];
                                    /*dialogg是右上角*/
                                    for (i = 0; i < 8; i++) {
                                        var k = ui.create.div('.num', ui.dialogg);
                                        k.classList.add('num' + [i]);
                                        ui.dialoggk.push(k);
                                        if (i == 0) k.classList.add(game.me.identity);
                                        if (i>=game.players.length) {
                                            k.classList.add('null');
                                            k.innerHTML = " ";
                                            continue;
                                        }
                                        var numk = get.distance(game.zhu, game.players[i], 'absolute') + 1;
                                        k.innerHTML = "<img src='" + lib.assetURL + 'extension/十周年UI/assets/image/identity/seat_' + numk + '.png' + "' style='position:relative;width:12px;height:12px;bottom:-18px;left:4px;'/>";
                                        if (game.players[i] == game.zhu) k.classList.add('zhu');
                                    }
                                }
                                if (ui.dialoggk && ui.dialoggk.length) {
                                    for (i = 0; i < ui.dialoggk.length; i++) {
                                        ui.dialoggk[i].className = 'num';
                                        ui.dialoggk[i].classList.add('num' + [i]);
                                        if (i == 0) ui.dialoggk[i].classList.add(game.me.identity);
                                        if (i>=game.players.length) {
                                            ui.dialoggk[i].classList.add('null');
                                            ui.dialoggk[i].innerHTML = " ";
                                            continue;
                                        }
                                        var numk = get.distance(game.zhu, game.players[i], 'absolute') + 1;
                                        ui.dialoggk[i].innerHTML = "<img src='" + lib.assetURL + 'extension/十周年UI/assets/image/identity/seat_' + numk + '.png' + "' style='position:relative;width:12px;height:12px;bottom:-18px;left:4px;'/>";
                                        if (game.players[i] == game.zhu) ui.dialoggk[i].classList.add('zhu');
                                    }
                                }
                                if (!ui.metip) ui.metip = ui.create.div('.metip', ui.dialogg);
                                if (game.me.identity == 'zhu') ui.metip.innerHTML = "<span style='color:#E17A2F;'>我(主公)</span>";
                                if (game.me.identity == 'zhong') ui.metip.innerHTML = "<span style='color:#BFAF58;'>我(忠臣)</span>";
                                if (game.me.identity == 'nei') ui.metip.innerHTML = "<span style='color:#87CEFA;'>我(内奸)️</span>";
                                if (game.me.identity == 'fan') ui.metip.innerHTML = "<span style='color:#5D7C48;'>我(反贼)</span>";
                            } else {
                                if (ui.dialogk) ui.dialogk.remove();
                                delete ui.dialogk;
                                if (ui.leftPane) ui.leftPane.remove();
                                delete ui.leftPane;
                                if (ui.biankuang) ui.biankuang.remove();
                                delete ui.biankuang;
                                if (ui.biao) ui.biao.remove();
                                delete ui.biao;
                                if (ui.zhuover) ui.zhuover.remove();
                                delete ui.zhuover;
                                if (ui.namek) ui.namek.remove();
                                delete ui.namek;
                                if (ui.zhuhpWrap) ui.zhuhpWrap.remove();
                                delete ui.zhuhpWrap;
                                if (ui.zhuhp) ui.zhuhp.remove();
                                delete ui.zhuhp;
                                if (ui.rightPane) ui.rightPane.remove();
                                delete ui.rightPane;
                                if (ui.dialogg) ui.dialogg.remove();
                                delete ui.dialogg;
                                if (ui.metip) ui.metip.remove();
                                delete ui.metip;
                                if (ui.dialoggk) delete ui.dialoggk;
                            }
                            if (!ui.dizhutip) ui.dizhutip = ui.create.div('.dizhutip', ui.arena);
                            ui.dizhutip.style.bottom = "55px";
                            if (!ui.nmjindutiao) ui.nmjindutiao = ui.create.div('.nmjindutiao', ui.arena);
                            ui.nmjindutiao.style.bottom = "35px";
                            if (!ui.nmjindutiaox) ui.nmjindutiaox = ui.create.div('.nmjindutiaox', ui.arena);
                            ui.nmjindutiaox.style.bottom = "35.2px";
                            var meidentity;
                            if (game.me.identity == 'zhu') meidentity = "<span style='color:red;font-size:24px;'>主公️</span>";
                            if (game.me.identity == 'zhong') meidentity = "<span style='color:#E9D670;font-size:24px;'>忠臣️</span>";
                            if (game.me.identity == 'nei') meidentity = "<span style='color:#87CEFA;font-size:24px;'>内奸️</span>";
                            if (game.me.identity == 'fan') meidentity = "<span style='color:#BAC58C;font-size:24px;'>反贼️</span>";
                            ui.dizhutip.innerHTML = "你的身份是" + meidentity + "，请选择你的武将";
                            //添加自由选将到选将框
                            if (ui.cheat2 && ui.dialog) ui.dialog.content.querySelector('.buttons')
                                .insertBefore(ui.cheat2, ui.dialog.content.querySelector('.buttons')
                                .firstChild)
                        }, 1);

                    }
                    if (!ui.hjk) ui.hjk = ui.create.div('.hjk', document.body);
                    ui.create.div('', ui.hjk)
                        .innerHTML = '可换将次数10';
                    ui.create.div('', ui.hjk)
                        .innerHTML = '免费换将3';

                    game.junbaupdate();
                }
                if (game.me.special_identity) {
                    dialog.setCaption('选择角色（' + get.translation(game.me.special_identity) + '）');
                    game.me.node.identity.firstChild.innerHTML = get.translation(game.me.special_identity + '_bg');
                } else {
                    dialog.setCaption('可选武将');
                    game.me.setIdentity();
                }
                if (!event.chosen.length) {
                    game.me.chooseButton(dialog, true)
                        .set('onfree', true)
                        .selectButton = function() {
                        if (_status.brawl && _status.brawl.doubleCharacter) return 2;
                        return get.config('double_character') ? 2 : 1
                    };
                } else {
                    lib.init.onfree();
                }
                ui.create.cheat = function() {
                    _status.createControl = ui.cheat2;
                    ui.cheat = ui.create.control('更换', function() {
                        if (ui.cheat2 && ui.cheat2.dialog == _status.event.dialog) {
                            return;
                        }
                        if (game.changeCoin) {
                            game.changeCoin(-3);
                        }
                        if (game.zhu != game.me) {
                            event.list.randomSort();
                            if (_status.brawl && _status.brawl.chooseCharacter) {
                                list = _status.brawl.chooseCharacter(event.list, num);
                                if (list === false || list === 'nozhu') {
                                    list = event.list.slice(0, num);
                                }
                            } else {
                                list = event.list.slice(0, num);
                            }
                        } else {
                            getZhuList()
                                .sort(lib.sort.character);
                            list3.randomSort();
                            if (_status.brawl && _status.brawl.chooseCharacter) {
                                list = _status.brawl.chooseCharacter(getZhuList(), list3, num);
                                if (list === false) {
                                    if (event.zhongmode) {
                                        list = list3.slice(0, 6);
                                    } else {
                                        list = getZhuList()
                                            .concat(list3.slice(0, num));
                                    }
                                } else if (list === 'nozhu') {
                                    event.list.randomSort();
                                    list = event.list.slice(0, num);
                                }
                            } else {
                                if (event.zhongmode) {
                                    list = list3.slice(0, 6);
                                } else {
                                    list = getZhuList()
                                        .concat(list3.slice(0, num));
                                }
                            }
                        }
                        var buttons = ui.create.div('.buttons');
                        var node = _status.event.dialog.buttons[0].parentNode;
                        _status.event.dialog.buttons = ui.create.buttons(list, 'characterx', buttons);
                        _status.event.dialog.content.insertBefore(buttons, node);
                        buttons.animate('start');
                        node.remove();
                        game.uncheck();
                        game.check();
                    });
                    ui.cheat.id = "identityHuan";
                    delete _status.createControl;
                };
                if (lib.onfree) {
                    lib.onfree.push(function() {
                        event.dialogxx = ui.create.characterDialog('heightset');
                        if (ui.cheat2) {
                            ui.cheat2.animate('controlpressdownx', 500);
                            ui.cheat2.classList.remove('disabled');
                        }
                    });
                } else {
                    event.dialogxx = ui.create.characterDialog('heightset');
                }

                ui.create.cheat2 = function() {
                    ui.cheat2 = ui.create.control('', function() {
                        let that = this;
                        if (this.dialog == _status.event.dialog) {
                            if (game.changeCoin) {
                                game.changeCoin(50);
                            }
                          if(ui.dialogk) {
                            ui.dialogk.style.transition='all 0.3s';
                            ui.dialogk.style.opacity='1';
                          }
                            this.dialog.close();
                            _status.event.dialog = this.backup;
                            this.backup.open();
                            delete this.backup;
                            if (ui.xuanback) ui.xuanback.remove();
                            delete ui.xuanback;
                            game.uncheck();
                            game.check();
                            if (ui.cheat) {
                                ui.cheat.animate('controlpressdownx', 500);
                                ui.cheat.classList.remove('disabled');
                            }
                        } else {
                            window.fobidBack=true;
                            setTimeout(function() {
                                window.fobidBack=false;
                            },3000);
                            if (game.changeCoin) {
                                game.changeCoin(-10);
                            }
                          if(ui.dialogk) {
                            ui.dialogk.style.transition='all 0.3s';
                            ui.dialogk.style.opacity='0.5';
                          }
                          if(ui.dialogg) {
                            ui.dialogg.style.transition='all 0.3s';
                            //ui.dialogg.style.transform='translateX(-375%)';
                            ui.dialogg.style.transform='translateY(-100%)';
                            ui.dialogg.style.opacity=0;
                            var yuan=375;
                            if(lib.config.ui_zoom=='small') yuan=390;
                            if(lib.config.ui_zoom=='vsmall') yuan=400;
                            if(lib.config.ui_zoom=='esmall') yuan=450;
                            setTimeout(function(){
                                ui.dialogg.style.transform='translateX(-'+yuan+'%) translateY(-100%)';
                                setTimeout(function(){
                                    ui.dialogg.style.opacity=1;
                                    ui.dialogg.style.transform='translateX(-'+yuan+'%) translateY(-60%)';
                                },400);
                            },400);
                          }
                            this.backup = _status.event.dialog;
                            _status.event.dialog.close();
                            _status.event.dialog = _status.event.parent.dialogxx;
                            this.dialog = _status.event.dialog;
                            if (!ui.xuanback) ui.xuanback = ui.create.div('.xuanback', document.body);
                            if(window.shoushaBlanks&&!window.shoushaBlanks.contains(ui.xuanback)) {
                                window.shoushaBlanks.add(ui.xuanback);
                            }
                            ui.xuanback.style.transform='translateX(100%)';
                            ui.xuanback.style.opacity=0;
                            ui.xuanback.style['z-index']=7;
                            //稍微修改
                            setTimeout(function(){
                                if(!ui.xuanback) return;
                                ui.xuanback.style.transition='all 0.3s';
                                ui.xuanback.style.transform='';
                                ui.xuanback.style.opacity=1;
                            },2500);
                            ui.xuanback.onclick = function() {
                                 if(window.fobidBack) return;
                                 ui.xuanback.style.transition='all 0.3s';
                                 ui.xuanback.style.transform='translateX(100%)';
                                 if (that.dialog == _status.event.dialog) {
                                    if (game.changeCoin) {
                                        game.changeCoin(50);
                                    }
                                  if(ui.dialogk) {
                                    ui.dialogk.style.transition='all 0.3s';
                                    ui.dialogk.style.opacity='1';
                                  }
                                  if(ui.dialogg) {
                                    ui.dialogg.style.transition='all 0.3s';
                                    ui.dialogg.style.opacity=0;
                                    var yuan=375;
                                    if(lib.config.ui_zoom=='small') yuan=390;
                                    if(lib.config.ui_zoom=='vsmall') yuan=400;
                                    if(lib.config.ui_zoom=='esmall') yuan=450;
                                    ui.dialogg.style.transform='translateX(-'+yuan+'%) translateY(-100%)';
                                    setTimeout(function(){
                                        ui.dialogg.style.transform='translateY(-100%)';
                                        setTimeout(function(){
                                            ui.dialogg.style.opacity=1;
                                            ui.dialogg.style.transform='';
                                        },400);
                                    },400);
                                  }
                                    that.dialog.close();
                                    _status.event.dialog = that.backup;
                                    that.backup.open();
                                    delete that.backup;
                                  setTimeout(function(){
                                    if (ui.xuanback) ui.xuanback.remove();
                                    delete ui.xuanback;
                                  },500);
                                    game.uncheck();
                                    game.check();
                                    if (ui.cheat) {
                                        ui.cheat.animate('controlpressdownx', 500);
                                        ui.cheat.classList.remove('disabled');
                                    }
                                }
                            }
                            this.dialog.open();
                            game.uncheck();
                            game.check();
                            if (ui.cheat) {
                                ui.cheat.classList.add('disabled');
                            }
                        }
                    });
                    if(!lib.config['extension_无名补丁_xindchoose_old']) {
                        ui.cheat2.id = "identityXuanNew";
                    }else {
                        ui.cheat2.id = "identityXuan";
                    }
                    ui.cheat2.classList.add('button');
                    ui.cheat2.classList.add('character');
                    dialog.content.querySelector('.buttons')
                        .insertBefore(ui.cheat2, dialog.content.querySelector('.buttons')
                        .firstChild)
                    if (lib.onfree) {
                        ui.cheat2.classList.add('disabled');
                    }
                }
                if (!_status.brawl || !_status.brawl.chooseCharacterFixed) {
                    if (!ui.cheat && get.config('change_choice')) ui.create.cheat();
                    if (!ui.cheat2 && get.config('free_choose')) ui.create.cheat2();
                }
                "step 1"
                if (ui.dialogk) ui.dialogk.remove();
                delete ui.dialogk;
                if (ui.leftPane) ui.leftPane.remove();
                delete ui.leftPane;
                if (ui.biankuang) ui.biankuang.remove();
                delete ui.biankuang;
                if (ui.biao) ui.biao.remove();
                delete ui.biao;
                if (ui.zhuover) ui.zhuover.remove();
                delete ui.zhuover;
                if (ui.namek) ui.namek.remove();
                delete ui.namek;
                if (ui.zhuhp) ui.zhuhp.remove();
                delete ui.zhuhp;
                if (ui.rightPane) ui.rightPane.remove();
                delete ui.rightPane;
                if (ui.dialogg) ui.dialogg.remove();
                delete ui.dialogg;
                if (ui.metip) ui.metip.remove();
                delete ui.metip;
                if (ui.dialoggk) delete ui.dialoggk;
                if (ui.xuanback) ui.xuanback.remove();
                delete ui.xuanback;
                if (ui.hjk) ui.hjk.remove();
                delete ui.hjk;
                if (ui.cheat) {
                    ui.cheat.close();
                    delete ui.cheat;
                }
                if (ui.cheat2) {
                    ui.cheat2.close();
                    delete ui.cheat2;
                }
                if (event.chosen.length) {
                    event.choosed = event.chosen;
                } else if (event.modchosen) {
                    if (event.modchosen[0] == 'random') event.modchosen[0] = result.buttons[0].link;
                    else event.modchosen[1] = result.buttons[0].link;
                    event.choosed = event.modchosen;
                } else if (result.buttons.length == 2) {
                    event.choosed = [result.buttons[0].link, result.buttons[1].link];
                    game.addRecentCharacter(result.buttons[0].link, result.buttons[1].link);
                } else {
                    event.choosed = [result.buttons[0].link];
                    game.addRecentCharacter(result.buttons[0].link);
                }
                var list = false;
                var name = event.choosed[0];
                if (get.is.double(name)) {
                    game.me._groupChosen = true;
                    list = get.is.double(name, true);
                } else if ((lib.character[name][1] == 'shen'||lib.character[name][1] == 'devil') && !lib.character[name][4].contains('hiddenSkill') && get.config('choose_group')) {
                    list = lib.group.slice(0);
                    list.remove('shen');
                    list.remove('devil');
                }
                if (list) {
                    game.me.initName=name;
                    //var dialog = ui.create.dialognew('#choosegroup', '选择国籍<img src=' + lib.assetURL + 'extension/十周年UI/assets/image/arrow.png' + ' style=width:30px;height:25px;margin-bottom:5px;left:2px;/>',' ',' ', [list, 'vcard']);//left:2px
                    var dialog = ui.create.dialognew('#choosegroup', game.changeToGoldTitle('选择国籍', true, 40),' ',' ', [list, 'vcard']);//left:2px
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
						        },2000);*/
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
                            if(game.zhu!=game.me) {
                                if(game.zhu.isFriendsOf(game.me)) {
                                    if(get.zhuFriendGroups()&&get.zhuFriendGroups().randomGet()==button.name) return 10;
                                }else {
                                    if(get.zhuFriendGroups(true)&&!get.zhuFriendGroups(true).contains(button.name)) return -1;
                                }
                            }
                            //alert(game.me.initName);
                            var name=game.me.initName;
                            if(lib.character&&name&&lib.character[name]&&lib.character[name][4]&&lib.character[name][4].contains(button.name)) return 5;
                            return 6*Math.random();
                        }).set('newconfirm1', true).set('auto', true)/*不展示确认按钮*/;
                    })
                    ui.dizhutip.innerHTML = "<span style='font-size:23px;color:rgba(255,255,255,1);opacity:0.8;margin-left:5px;'>请选择你要变成的势力️</span>";
                    //ui.dizhutip.innerHTML = "<span style='font-size:20px;color:#ebc914;;'>请选择你要变成的势力️</span>";
                    //ui.dizhutip.style.bottom = '110px';
                    ui.dizhutip.style.bottom = "125px";
                    ui.nmjindutiaox.hide();
                    ui.nmjindutiao.hide();
                    /*ui.nmjindutiaox.style.bottom = '140.2px';
                    ui.nmjindutiao.style.bottom = '140px';*/
                }
                "step 2"
                if (event.next1) event.group = event.next1._result.links[0][2];
                delete event.next1;
                if (event.choosed.length == 2) {
                    game.me.init(event.choosed[0], event.choosed[1]);
                } else {
                    game.me.init(event.choosed[0]);
                }
                ui.nmjindutiao.remove();
                delete ui.nmjindutiao;
                ui.dizhutip.remove();
                delete ui.dizhutip;
                ui.nmjindutiaox.remove();
                delete ui.nmjindutiaox;
                event.list.remove(get.sourceCharacter(game.me.name1));
                event.list.remove(get.sourceCharacter(game.me.name2));
                if (game.me == game.zhu && game.players.length > 4) {
                    game.me.hp++;
                    game.me.maxHp++;
                    game.me.update();
                }
                for (var i = 0; i < game.players.length; i++) {
                    if (game.players[i] != game.zhu && game.players[i] != game.me) {
                        event.list.randomSort();
                        event.ai(game.players[i], event.list.splice(0, get.config('choice_' + game.players[i].identity)), null, event.list)
                    }
                }
                "step 3"
                if (event.group) {
                    game.me.group = event.group;
                    console.log(game.me.group)
                    game.me.node.name.dataset.nature = get.groupnature(game.me.group);
                    game.me.update();
                }
                for (var i = 0; i < game.players.length; i++) {
                    _status.characterlist.remove(game.players[i].name);
                    _status.characterlist.remove(game.players[i].name1);
                    _status.characterlist.remove(game.players[i].name2);
                }
                "step 4"               
                setTimeout(function() {
                    ui.arena.classList.remove('choose-character');
                    //window.canNoShowSearch=false;
                    //if(ui.Searcher) ui.Searcher.show();
                }, 500);
                ui.background.style.zIndex = '-2';
                //   ui.control.classList.remove('choose-character');
                if (event.special_identity) {
                    for (var i = 0; i < event.special_identity.length; i++) {
                        game.zhu.addSkill(event.special_identity[i]);
                    }
                }
            });
        }

    }
})