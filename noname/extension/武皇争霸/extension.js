'use strict';
game.import("extension", function (lib, game, ui, get, ai, _status) {
    return {
        name: "武皇争霸", content: function (config, pack) {

        }, precontent: function (config) {
            if (!config.enable) { return; }
            if (this.package.changelog) {
                game.showExtensionChangeLog(this.package.changelog);
            }
            lib.init.css(lib.assetURL + 'extension/' + _status.extension, "hiddenAvatar");
            var martial_mode = {
                startBefore: function () {
                },
                onreinit: function () {
                },
                start: function () {
                    "step 0"
                    var playback = localStorage.getItem(lib.configprefix + 'playback');
                    if (playback) {
                        ui.create.me();
                        ui.arena.style.display = 'none';
                        ui.system.style.display = 'none';
                        _status.playback = playback;
                        localStorage.removeItem(lib.configprefix + 'playback');
                        var store = lib.db.transaction(['video'], 'readwrite').objectStore('video');
                        store.get(parseInt(playback)).onsuccess = function (e) {
                            if (e.target.result) {
                                game.playVideoContent(e.target.result.video);
                            }
                            else {
                                alert('播放失败：找不到录像');
                                game.reload();
                            }
                        }
                        event.finish();
                    }
                    if (_status.connectMode) {
                        game.waitForPlayer(function () {
                            lib.configOL.number = 2;
                        });
                    } else {
                        // included when prepareArena
                        // ui.create.cardsAsync();
                        // game.finishCards();
                    }
                    "step 1"
                    lib.init.js(lib.assetURL +'extension/武皇', 'mightyFoe', function() {
                        if (lib && window.mightyFoe) {
                            window.mightyFoe = JSON.parse(atob(window.mightyFoe));
                            lib.config.mode_config['martial'].mightyFoe = window.mightyFoe;
                            delete window.mightyFoe;
                        }
                    });
                    //_status.mode = _status.connectMode ? lib.configOL.martial_mode : get.config('martial_mode');
                    _status.mode = 'normal';
                    game.broadcastAll(function (currentMode) {
                        _status.mode = currentMode;
                    }, _status.mode);
                    if (_status.connectMode) {
                        lib.configOL.number = 2;
                        game.randomMapOL();
                    }
                    else { // offline choose character
                        game.chooseCharacter();
                    }
                    "step 2"
                    for (var i = 0; i < game.players.length; i++) {
                        game.players[i].getId();
                    }
                    game.players.forEach(player => player.init(player.getbackupCharacters().shift()));
                    "step 3"
                    game.syncState();
                    event.trigger('gameStart');
                    // TODO: ask players altogether in online mode
                    game.players.forEach(player => player.askJoin());
                    var players = get.players(lib.sort.position);
                    var info = [];
                    for (var i = 0; i < players.length; i++) {
                        info.push({
                            name: players[i].name1,
                            name2: players[i].name2,
                            identity: players[i].identity
                        });
                    }
                    _status.videoInited = true;
                    game.addVideo('init', null, info);
                    game.gameDraw(game.zhu, function (player) {
                        return player == game.fan ? 5 : 4;
                    });
                    game.phaseLoop(game.zhu);
                },
                game: {
                    addRecord: function (bool) {
                        if (typeof bool == 'boolean') {
                            // currently martial is treated as a dirivation of single mode
                            var mode = _status.mode;
                            var data = lib.config.gameRecord.single.data;
                            if (!get.is.object(data[mode])) data[mode] = {};
                            var data2 = data[mode]
                            var identity = game.me.identity;
                            if (!data2[identity]) {
                                data2[identity] = [0, 0];
                            }
                            if (bool) {
                                data2[identity][0]++;
                            }
                            else {
                                data2[identity][1]++;
                            }
                            var list = ['zhu', 'fan'];
                            var str = '';
                            for (var j in data) {
                                str += get.translation(j + 2) + '：<br>';
                                for (var i = 0; i < list.length; i++) {
                                    if (data[j][list[i]]) {
                                        str += lib.translate[list[i] + '2'] + '：' + data[j][list[i]][0] + '胜' + ' ' + data[j][list[i]][1] + '负<br>';
                                    }
                                }
                            }
                            lib.config.gameRecord.single.str = str;
                            game.saveConfig('gameRecord', lib.config.gameRecord);
                        }
                    },
                    getState: function () {
                        var state = {};
                        for (var i in lib.playerOL) {
                            var player = lib.playerOL[i];
                            state[i] = { identity: player.identity };
                        }
                        return state;
                    },
                    updateState: function (state) {
                        for (var i in state) {
                            var player = lib.playerOL[i];
                            if (player) {
                                player.identity = state[i].identity;
                            }
                        }
                    },
                    getRoomInfo: function (uiintro) {
                        if (lib.configOL.bannedcards.length) {
                            uiintro.add('<div class="text chat">禁用卡牌：' + get.translation(lib.configOL.bannedcards));
                        }
                        uiintro.style.paddingBottom = '8px';
                    },
                    getVideoName: function () {
                        var str = get.translation(game.me.name);
                        if (game.me.name2) {
                            str += '/' + get.translation(game.me.name2);
                        }
                        var name = [
                            str,
                            get.translation(_status.mode + 2) + ' - ' + lib.translate[game.me.identity + '2']
                        ];
                        return name;
                    },
                    showIdentity: function () { },
                    checkResult: function () {
                        var me = game.me._trueMe || game.me;
                        if (me.enemy.hasSkill('martial_qiangdi')) {
                            if (me.isAlive() && game.changeCoin) {
                                game.changeCoin(150);
                            }
                            game.over(true);
                        } else {
                            game.over(me.isAlive());
                        }
                    },
                    checkOnlineResult: function (player) {
                        return player.isAlive();
                    },
                    chooseCharacter: function () {
                        var next = game.createEvent('chooseCharacter', false);
                        next.setContent(function () {
                            'step 0'
                            if(game.ui_identityShow_init) game.ui_identityShow_init();
                            let battleNum = _status.connectMode ? lib.configOL.battle_number : get.config('battle_number');
                            let showNum = get.config('show_number') || 5;
                            let hideNum = get.config('hide_number') || 2;
                            event.first = [0, 1].randomGet();
                            var chooseCharacterConfig = {
                                width: Math.max(showNum, battleNum),
                                num: battleNum,
                                hiddenNum: Math.min(hideNum, Math.max(showNum, battleNum)) * 2,
                                first: !!event.first,
                            };
                            //game.chooseCharacterDouble(chooseCharacterConfig, _status.mode != 'normal' ? Object.keys(lib.character) : undefined);
                            game.chooseCharacterDouble(chooseCharacterConfig);
                            "step 1"
                            if (game.addRecentCharacter) {
                                game.addRecentCharacter.apply(this, result.friend);
                            }
                            event.friendList = result.friend;
                            event.enemyList = result.enemy;
                            "step 2"
                            game.prepareArena(2);
                            _status.friendBackup = event.friendList.slice(0);
                            _status.enemyBackup = event.enemyList.slice(0);
                            _status.coinCoeff = get.coinCoeff(event.friendList);
                            game.players[1 - event.first].identity = 'zhu';
                            game.players[event.first].identity = 'fan';
                            game.broadcastAll(function (p, t) {
                                p.enemy = t; t.enemy = p;
                            }, game.players[0], game.players[1]);
                            for (var i = 0; i < game.players.length; i++) {
                                game.players[i].showIdentity();
                            }
                            _status.characterChoice = {
                                zhu: event.first ? event.friendList : event.enemyList,
                                fan: event.first ? event.enemyList : event.friendList,
                            };

                        }); // next.setContent
                    },
                    chooseCharacterOL: function () {
                        var next = game.createEvent('chooseCharacterOL', false);
                        next.setContent(function () {
                            'step 0'
                            if(game.ui_identityShow_init) game.ui_identityShow_init();
                            game.additionaldead = [];
                            var list = get.charactersOL();
                            list = list.randomGets(10);
                            event.videoId = lib.status.videoId++;
                            if (Math.random() < 0.5) {
                                event.choosing = game.players[0];
                            }
                            else {
                                event.choosing = game.players[1];
                            }
                            var createDialog = function (list, id, list1, list2) {
                                var dialog = ui.create.dialog('选择角色', [list, 'character']);
                                dialog.classList.add('fullwidth');
                                dialog.classList.add('fullheight');
                                dialog.classList.add('noslide');
                                dialog.classList.add('fixed');
                                dialog.videoId = id;
                                if (list2 && list2) {
                                    ui.arena.classList.add('playerhidden');
                                    for (var i = 0; i < dialog.buttons.length; i++) {
                                        var button = dialog.buttons[i];
                                        if (list1.contains(button.link)) {
                                            button.classList.add('selectedx');
                                        }
                                        else if (list2.contains(button.link)) {
                                            button.classList.add('glow');
                                        }
                                    }
                                }
                                else {
                                    if (list1 != game.me) {
                                        dialog.content.firstChild.innerHTML = '等待对手选择';
                                    }
                                }
                            };
                            game.broadcastAll(createDialog, list, event.videoId, event.choosing);
                            game.players[0].storage.versuslist = [];
                            game.players[1].storage.versuslist = [];
                            event.selected = [];
                            _status.firstChoose = event.choosing;
                            event.num = (parseInt(lib.configOL.replace_number) + 1) * 2;
                            _status.onreconnect = [createDialog, list, event.videoId,
                                _status.firstChoose.storage.versuslist,
                                _status.firstChoose.next.storage.versuslist];
                            game.broadcastAll(function (player) {
                                player.setIdentity('truezhu');
                                player.next.setIdentity('falsezhu');
                            }, _status.firstChoose);
                            'step 1'
                            var next = event.choosing.chooseButton(event.videoId, 1, true);
                            next.set('filterButton', function (button) {
                                if (_status.event.selected.contains(button.link)) return false;
                                return true;
                            });
                            next.set('selected', event.selected);
                            next.set('ai', function () {
                                return Math.random();
                            });
                            'step 2'
                            event.choosing.storage.versuslist.push(result.links[0]);
                            game.broadcastAll(function (link, choosing, first, id) {
                                var dialog = get.idDialog(id);
                                if (dialog) {
                                    if (choosing == game.me) {
                                        choosing = '你';
                                    }
                                    else {
                                        choosing = '对手';
                                    }
                                    dialog.content.firstChild.innerHTML = choosing + '选择了' + get.translation(link);
                                    for (var i = 0; i < dialog.buttons.length; i++) {
                                        if (dialog.buttons[i].link == link) {
                                            if (first) {
                                                dialog.buttons[i].classList.add('selectedx');
                                            }
                                            else {
                                                dialog.buttons[i].classList.add('glow');
                                            }
                                        }
                                    }
                                }
                            }, result.links[0], event.choosing, event.choosing == _status.firstChoose, event.videoId);
                            event.selected.push(result.links[0]);
                            event.choosing = event.choosing.next;
                            event.num--;
                            if (event.num) {
                                event.goto(1);
                            }
                            'step 3'
                            game.delay(2)
                            'step 4'
                            game.broadcastAll(function (id) {
                                ui.arena.classList.remove('playerhidden');
                                var dialog = get.idDialog(id);
                                if (dialog) {
                                    dialog.close();
                                }
                            }, event.videoId);

                            _status.friendDied = [];
                            _status.enemyDied = [];

                            _status.friend = game.players[0].storage.versuslist;
                            _status.enemy = game.players[1].storage.versuslist;

                            delete game.players[0].storage.versuslist;
                            delete game.players[1].versuslist;

                            _status.enemyCount = ui.create.system('杀敌: ' + get.cnNumber(0, true), null, true);
                            _status.friendCount = ui.create.system('阵亡: ' + get.cnNumber(0, true), null, true);

                            lib.setPopped(_status.friendCount, game.versusHoverFriend);
                            lib.setPopped(_status.enemyCount, game.versusHoverEnemy);

                            game.me.side = true;
                            game.players[0].side = true;
                            game.players[1].side = false;

                            var func = function (list1, list2, list3, list4, func1, func2, playerid) {
                                if (game.me.playerid == playerid) {
                                    game.me.side = true;
                                    game.me.next.side = false;
                                }
                                else {
                                    game.me.side = false;
                                    game.me.next.side = true;
                                }

                                if (game.me.side) {
                                    _status.enemyDied = list1;
                                    _status.friendDied = list2;

                                    _status.enemy = list3;
                                    _status.friend = list4;
                                }
                                else {
                                    _status.friendDied = list1;
                                    _status.enemyDied = list2;

                                    _status.friend = list3;
                                    _status.enemy = list4;
                                }

                                _status.enemyCount = ui.create.system('杀敌: ' + get.cnNumber(_status.enemyDied.length, true), null, true);
                                _status.friendCount = ui.create.system('阵亡: ' + get.cnNumber(_status.friendDied.length, true), null, true);

                                lib.setPopped(_status.friendCount, func1);
                                lib.setPopped(_status.enemyCount, func2);
                            };
                            _status.onreconnect = [func, _status.enemyDied, _status.friendDied,
                                _status.enemy, _status.friend, game.versusHoverFriend, game.versusHoverEnemy, game.players[0].playerid];
                            game.broadcast(func, _status.enemyDied, _status.friendDied,
                                _status.enemy, _status.friend, game.versusHoverFriend, game.versusHoverEnemy, game.players[0].playerid);

                            var list = [[game.players[0], ['选择出场角色', [_status.friend, 'character']]], [game.players[1], ['选择出场角色', [_status.enemy, 'character']]]];
                            game.me.chooseButtonOL(list, function (player, result) {
                                if (game.online || player == game.me) player.init(result.links[0]);
                            });
                            'step 5'
                            var result1;
                            var friend = result[game.players[0].playerid];
                            if (friend && friend.links && friend.links.length) {
                                result1 = friend.links[0];
                            }
                            else {
                                result1 = _status.friend.randomGet();
                            }
                            var result2;
                            var enemy = result[game.players[1].playerid];
                            if (enemy && enemy.links && enemy.links.length) {
                                result2 = enemy.links[0];
                            }
                            else {
                                result2 = _status.enemy.randomGet();
                            }
                            if (!game.players[0].name1) game.players[0].init(result1);
                            if (!game.players[1].name1) game.players[1].init(result2);
                            _status.friend.remove(result1);
                            _status.enemy.remove(result2);
                            game.broadcast(function (result1, result2) {
                                if (game.me.side) {
                                    if (!game.me.name1) game.me.init(result1);
                                    if (!game.me.next.name1) game.me.next.init(result2);
                                    _status.friend.remove(result1);
                                    _status.enemy.remove(result2);
                                }
                                else {
                                    if (!game.me.name1) game.me.init(result2);
                                    if (!game.me.next.name1) game.me.next.init(result1);
                                    _status.friend.remove(result2);
                                    _status.enemy.remove(result1);
                                }
                            }, result1, result2);
                        });
                    },
                    chooseCharacterDouble: function () {
                        var next = game.createEvent('chooseCharacter', false);
                        var config, width, num, ratio, func, update, list, first;
                        for (var i = 0; i < arguments.length; i++) {
                            if (typeof arguments[i] == 'number') {
                                if (!width) {
                                    width = arguments[i];
                                }
                                else if (!num) {
                                    num = arguments[i];
                                }
                                else {
                                    ratio = arguments[i];
                                }
                            }
                            else if (typeof arguments[i] == 'function') {
                                if (!func) {
                                    func = arguments[i];
                                }
                                else {
                                    update = arguments[i];
                                }
                            }
                            else if (Array.isArray(arguments[i])) {
                                list = arguments[i];
                            }
                            else if (get.objtype(arguments[i]) == 'object') {
                                config = arguments[i];
                            }
                        }
                        if (!config) {
                            list = config;
                            config = {};
                        }
                        config.width = config.width || width || 8;
                        config.height = 4;
                        config.size = config.width * config.height;
                        config.num = config.num || num || 3;
                        config.ratio = config.ratio || ratio || 1.2;
                        config.update = config.update || update;
                        config.hiddenNum = config.hiddenNum || 0;
                        if (!config.hasOwnProperty('first')) {
                            if (typeof first == 'boolean') {
                                config.first = first;
                            }
                            else {
                                config.first = 'rand';
                            }
                        }
                        if (!list) {
                            list = [];
                            for (var i in lib.character) {
                                if (typeof func == 'function') {
                                    if (!func(i)) continue;
                                }
                                else {
                                    if (lib.filter.characterDisabled(i)) continue;
                                }
                                list.push(i);
                            }
                        }
                        next.config = config;
                        next.list = list;
                        next.setContent(function () {
                            'step 0'
                            if(game.ui_identityShow_init) game.ui_identityShow_init();
                            event.nodes = [];
                            event.avatars = [];
                            event.friend = [];
                            event.enemy = [];
                            event.blank = [];
                            for (var i = 0; i < event.config.size; i++) {
                                event.nodes.push(ui.create.div('.shadowed.reduce_radius.choosedouble'));
                            }
                            event.moveAvatar = function (node, i) {
                                if (!node.classList.contains('moved')) {
                                    event.blank.push(node.index);
                                }
                                if (i > event.config.width * 2 && node.classList.contains("hiddenAvatar")) {
                                    node.classList.remove("hiddenAvatar");
                                    lib.setIntro(node);
                                } 
                                event.nodes[node.index].style.display = '';
                                event.nodes[node.index].show();
                                clearTimeout(event.nodes[node.index].choosetimeout);
                                event.moveNode(node, i);
                                var nodex = event.nodes[node.index];
                                nodex.choosetimeout = setTimeout(function () {
                                    nodex.hide();
                                    nodex.choosetimeout = setTimeout(function () {
                                        nodex.show();
                                        nodex.style.display = 'none';
                                    }, 300);
                                }, 400);
                            };
                            event.aiMove = function (friend) {
                                var list = [];
                                for (var i = 0; i < event.avatars.length; i++) {
                                    if (!event.avatars[i].classList.contains('moved')) {
                                        list.push(event.avatars[i]);
                                    }
                                }
                                for (var i = 0; i < list.length; i++) {
                                    if (Math.random() < 0.7 || i == list.length - 1) {
                                        if (friend) {
                                            event.moveAvatar(list[i], event.friend.length + event.config.width * (event.config.height - 1));
                                            event.friend.push(list[i]);
                                        }
                                        else {
                                            event.moveAvatar(list[i], event.enemy.length);
                                            event.enemy.push(list[i]);
                                        }
                                        list[i].classList.add('moved');
                                        break;
                                    }
                                }
                            };
                            event.promptbar = ui.create.div('.hidden', ui.window);
                            event.promptbar.style.width = '100%';
                            event.promptbar.style.left = 0;
                            if (get.is.phoneLayout()) {
                                event.promptbar.style.top = '20px';
                            }
                            else {
                                event.promptbar.style.top = '58px';
                            }
                            event.promptbar.style.pointerEvents = 'none';
                            event.promptbar.style.textAlign = 'center';
                            event.promptbar.style.zIndex = '2';
                            ui.create.div('.shadowed.reduce_radius', event.promptbar);
                            event.promptbar.firstChild.style.fontSize = '18px';
                            event.promptbar.firstChild.style.padding = '6px 10px';
                            event.promptbar.firstChild.style.position = 'relative';
                            event.prompt = function (str) {
                                event.promptbar.firstChild.innerHTML = str;
                                event.promptbar.show();
                            };
                            event.moveNode = function (node, i) {
                                var width = event.width, height = event.height, margin = event.margin;
                                var left = -(width + 10) * event.config.width / 2 + 5 + (i % event.config.width) * (width + 10);
                                var top = -(height + 10) * event.config.height / 2 + 5 + Math.floor(i / event.config.width) * (height + 10) + margin / 2;
                                node.style.transform = 'translate(' + left + 'px,' + top + 'px)';
                                node.index = i;
                            };
                            event.resize = function () {
                                var margin = 0;
                                if (!get.is.phoneLayout()) {
                                    margin = 38;
                                }
                                var height = (ui.window.offsetHeight - 10 * (event.config.height + 1) - margin) / event.config.height;
                                var width = (ui.window.offsetWidth - 10 * (event.config.width + 1)) / event.config.width;
                                if (width * event.config.ratio < height) {
                                    height = width * event.config.ratio;
                                }
                                else {
                                    width = height / event.config.ratio;
                                }
                                event.width = width;
                                event.height = height;
                                event.margin = margin;
                                for (var i = 0; i < event.config.size; i++) {
                                    event.moveNode(event.nodes[i], i);
                                    event.nodes[i].style.width = width + 'px';
                                    event.nodes[i].style.height = height + 'px';
                                    if (event.avatars[i]) {
                                        event.moveNode(event.avatars[i], event.avatars[i].index);
                                        event.avatars[i].style.width = width + 'px';
                                        event.avatars[i].style.height = height + 'px';
                                        event.avatars[i].nodename.style.fontSize = Math.max(14, Math.round(width / 5.6)) + 'px';
                                    }
                                }
                                if (event.deciding) {
                                    var str = 'px,' + (event.margin / 2 - event.height * 0.5) + 'px)';
                                    for (var i = 0; i < event.friendlist.length; i++) {
                                        event.friendlist[i].style.transform = 'scale(1.2) translate(' + (-(event.width + 14) * event.friendlist.length / 2 + 7 + i * (event.width + 14)) + str;
                                    }
                                }
                            };
                            lib.onresize.push(event.resize);
                            event.clickAvatar = function () {
                                if (event.deciding) {
                                    if (this.index < event.config.width) return;
                                    if (event.friendlist.contains(this)) {
                                        event.friendlist.remove(this);
                                        event.moveNode(this, this.index);
                                        this.nodename.innerHTML = get.slimName(this.link);
                                    }
                                    else {
                                        event.friendlist.push(this);
                                    }
                                    if (event.friendlist.length == event.config.num) {
                                        event.deciding = false;
                                        event.prompt('比赛即将开始');
                                        setTimeout(game.resume, 1000);
                                    }
                                    if (event.config.update) {
                                        for (var i = 0; i < event.friendlist.length; i++) {
                                            event.friendlist[i].nodename.innerHTML = event.config.update(i, event.friendlist.length) || event.friendlist[i].nodename.innerHTML;
                                        }
                                    }
                                    var str = 'px,' + (event.margin / 2 - event.height * 0.5) + 'px)';
                                    for (var i = 0; i < event.friendlist.length; i++) {
                                        event.friendlist[i].style.transform = 'scale(1.2) translate(' + (-(event.width + 14) * event.friendlist.length / 2 + 7 + i * (event.width + 14)) + str;
                                    }
                                }
                                else {
                                    if (!event.imchoosing) return;
                                    if (event.replacing) {
                                        this.link = event.replacing;
                                        this.setBackground(event.replacing, 'character');

                                        this.nodename.innerHTML = get.slimName(event.replacing);
                                        this.nodename.dataset.nature = get.groupnature(lib.character[event.replacing][1]);

                                        delete event.replacing;
                                        if (this.classList.contains('moved')) {
                                            event.custom.add.window();
                                        }
                                    }
                                    if (this.classList.contains('moved')) return;
                                    event.moveAvatar(this, event.friend.length + event.config.width * (event.config.height - 1));
                                    event.friend.push(this.link);
                                    this.classList.add('moved');
                                    game.resume();
                                }
                            };
                            event.skipnode = ui.create.system('跳过', function () {
                                this.remove();
                                event._skiprest = true;
                                if (event.imchoosing) {
                                    game.resume();
                                }
                            });
                            if (get.config('change_choice')) {
                                event.replacenode = ui.create.system('换将', function () {
                                    event.promptbar.hide();
                                    while (event.avatars.length) {
                                        event.avatars.shift().remove();
                                    }
                                    for (var i = 0; i < event.config.size; i++) {
                                        event.nodes[i].show();
                                        event.nodes[i].style.display = '';
                                        clearTimeout(event.nodes[i].choosetimeout);
                                    }
                                    delete event.list2;
                                    event.friend.length = 0;
                                    event.enemy.length = 0;
                                    event.blank.length = 0;
                                    event.redoing = true;
                                    if (event.imchoosing) {
                                        game.resume();
                                    }
                                }, true);
                            }
                            if (get.config('change_choice')) {
                                event.reselectnode = ui.create.system('重选', function () {
                                    event.promptbar.hide();
                                    event.list2 = event.list2.concat(event.friend).concat(event.enemy);
                                    event.friend.length = 0;
                                    event.enemy.length = 0;
                                    for (var i = 0; i < event.avatars.length; i++) {
                                        if (event.avatars[i].classList.contains('moved')) {
                                            event.moveAvatar(event.avatars[i], event.blank.randomRemove());
                                            event.avatars[i].classList.remove('moved');
                                        }
                                    }
                                    event.redoing = true;
                                    if (event.imchoosing) {
                                        game.resume();
                                    }
                                }, true);
                            }
                            if (get.config('free_choose')) {
                                var createCharacterDialog = function () {
                                    event.freechoosedialog = ui.create.characterDialog();
                                    event.freechoosedialog.style.height = '80%';
                                    event.freechoosedialog.style.top = '10%';
                                    event.freechoosedialog.style.transform = 'scale(0.8)';
                                    event.freechoosedialog.style.transition = 'all 0.3s';
                                    event.freechoosedialog.listen(function (e) {
                                        if (!event.replacing) {
                                            event.dialoglayer.clicked = true;
                                        }
                                    });
                                    event.freechoosedialog.classList.add('pointerdialog');
                                    event.dialoglayer = ui.create.div('.popup-container.hidden', function (e) {
                                        if (this.classList.contains('removing')) return;
                                        if (this.clicked) {
                                            this.clicked = false;
                                            return;
                                        }
                                        ui.window.classList.remove('modepaused');
                                        this.delete();
                                        e.stopPropagation();
                                        event.freechoosedialog.style.transform = 'scale(0.8)';
                                        if (event.replacing) {
                                            event.prompt('用' + get.translation(event.replacing) + '替换一名武将');
                                        }
                                        else {
                                            if (event.side == 0) {
                                                event.prompt('请选择两名武将');
                                            }
                                            else {
                                                event.prompt('请选择一名武将');
                                            }
                                        }
                                    });
                                    event.dialoglayer.classList.add('modenopause');
                                    event.dialoglayer.appendChild(event.freechoosedialog);
                                    event.freechoosenode.classList.remove('hidden');
                                }

                                event.custom.replace.button = function (button) {
                                    event.replacing = button.link;
                                };
                                event.custom.add.window = function () {
                                    if (event.replacing) {
                                        delete event.replacing;
                                        if (event.side == 0) {
                                            event.prompt('请选择两名武将');
                                        }
                                        else {
                                            event.prompt('请选择一名武将');
                                        }
                                    }
                                };
                                game.shoushaDialogBackgroundWH=function(dialog) {
                				    if(!lib.config.extension_手杀ui_enable) return;
                				    dialog.style["background"]='none';
                				    dialog.style["box-shadow"]='none';
                				    dialog.style["background-image"]=('url("'+lib.assetURL+'image/dialog_large.png")');
                				    dialog.style["background-position"]='top center';
                				    dialog.style["background-size"]='cover';
                				    dialog.style["background-repeat"]='no-repeat';
                				    //dialog.style.transform='scale(0.9)';
                				};
                                event.freechoosenode = ui.create.system('自由选将', function () {
                                    if (this.classList.contains('hidden')) return;
                                    if (!event.imchoosing) {
                                        event.prompt('请等待敌方选将');
                                        return;
                                    }
                                    delete event.replacing;
                                    ui.window.classList.add('modepaused');
                                    ui.window.appendChild(event.dialoglayer);
                                    ui.refresh(event.dialoglayer);
                                    event.dialoglayer.show();
                                    event.freechoosedialog.style.transform = 'scale(1)';
                                    game.shoushaDialogBackgroundWH(event.freechoosedialog);
                                    event.promptbar.hide();
                                }, true);
                                if (lib.onfree) {
                                    event.freechoosenode.classList.add('hidden');
                                    lib.onfree.push(createCharacterDialog);
                                }
                                else {
                                    createCharacterDialog();
                                }
                            }
                            event.checkredo = function () {
                                if (event.redoing) {
                                    event.goto(1);
                                    delete event.redoing;
                                    return true;
                                }
                            };
                            // if(ui.cardPileButton) ui.cardPileButton.style.display='none';
                            ui.auto.hide();
                            ui.wuxie.hide();
                            event.resize();
                            for (var i = 0; i < event.config.size; i++) {
                                ui.window.appendChild(event.nodes[i]);
                            }
                            'step 1'
                            var rand = event.config.first;
                            if (rand == 'rand') {
                                rand = (Math.random() < 0.5);
                            }
                            if (rand) {
                                _status.color = true;
                                event.side = 1;
                            }
                            else {
                                _status.color = false;
                                event.side = 3;
                            }
                            if (!event.list2) {
                                event.list2 = event.list.randomGets(event.config.width * 2);
                                event.listHidden = Object.keys(event.list2).randomGets(event.config.hiddenNum);
                                for (var i = 0; i < event.config.width * 2; i++) {
                                    event.avatars.push(ui.create.div('.shadowed.shadowed2.reduce_radius.character.choosedouble', event.clickAvatar));
                                    var name = event.list2[i];
                                    event.avatars[i].setBackground(name, 'character');
                                    event.avatars[i].link = name;
                                    event.avatars[i].nodename = ui.create.div('.name', event.avatars[i], get.slimName(name));
                                    event.avatars[i].nodename.style.fontFamily = lib.config.name_font;
                                    event.avatars[i].index = i + event.config.width;
                                    event.avatars[i].animate('start');
                                    event.nodes[event.avatars[i].index].style.display = 'none';
                                    event.avatars[i].nodename.dataset.nature = get.groupnature(lib.character[name][1]);
                                    if (event.listHidden.contains(String(i))) {
                                        event.avatars[i].classList.add("hiddenAvatar");
                                    } else {
                                        lib.setIntro(event.avatars[i]);
                                    }
                                }
                                event.resize();
                                for (var i = 0; i < event.avatars.length; i++) {
                                    ui.window.appendChild(event.avatars[i]);
                                }
                                // sort avatars for AI choosing
                                var visible = event.avatars.filter(n => !n.classList.contains('hiddenAvatar')).map(n => n.link);
                                var invisible = event.avatars.filter(n => !n.classList.contains('hiddenAvatar')).map(n => n.link);
                                var avgRank1 = visible.reduce((a, b) => a + get.rank(b, true), 0) / visible.length;
                                var avgRank2 = invisible.reduce((a, b) => a + get.rank(b, true), 0) / visible.length;
                                var avgRank = (avgRank1 + avgRank2) / 2;
                                var ranks = {}
                                for (var it of event.avatars) {
                                    if (it.classList.contains('hiddenAvatar')) {
                                        ranks[it.link] = avgRank;
                                    } else {
                                        ranks[it.link] = get.rank(it.link, true);
                                    }
                                }
                                // console.log(ranks);
                                event.avatars.sort(function (a, b) {
                                    return ranks[b.link] - ranks[a.link];
                                })
                                // event.avatars.sort(function (a, b) {
                                //     return get.rank(b.link, true) - get.rank(a.link, true);
                                // })
                            }
                            game.delay();
                            lib.init.onfree();
                            'step 2'
                            if (event.checkredo()) return;
                            if (event._skiprest) return;
                            if (event.side < 2) {
                                event.imchoosing = true;
                                if (event.side == 0) {
                                    event.prompt('请选择两名武将');
                                }
                                else {
                                    event.prompt('请选择一名武将');
                                    event.fast = get.time();
                                }
                                game.pause();
                            }
                            else {
                                event.aiMove();
                                game.delay();
                            }
                            'step 3'
                            if (typeof event.fast == 'number' && get.time() - event.fast <= 1000) {
                                event.fast = true;
                            }
                            else {
                                event.fast = false;
                            }
                            delete event.imchoosing;
                            if (event.checkredo()) return;
                            if (event._skiprest) {
                                while (event.enemy.length < event.config.width) {
                                    event.aiMove();
                                }
                                while (event.friend.length < event.config.width) {
                                    event.aiMove(true);
                                }
                            }
                            else if (event.friend.length + event.enemy.length < event.config.width * 2 - 1) {
                                if (event.side == 1) {
                                    game.delay(event.fast ? 1 : 2);
                                    event.promptbar.hide();
                                }
                                event.side++;
                                if (event.side > 3) {
                                    event.side = 0;
                                }
                                event.goto(2);
                            }
                            else {
                                event.promptbar.hide();
                                event.side++;
                                if (event.side > 3) {
                                    event.side = 0;
                                }
                                if (event.side >= 2) {
                                    game.delay()
                                }
                            }
                            'step 4'
                            if (event.checkredo()) return;
                            if (event.skipnode) event.skipnode.delete();
                            if (event.replacenode) event.replacenode.delete();
                            if (event.reselectnode) event.reselectnode.delete();
                            if (event.freechoosenode) event.freechoosenode.delete();
                            for (var i = 0; i < event.avatars.length; i++) {
                                if (!event.avatars[i].classList.contains('moved')) {
                                    if (event.side < 2) {
                                        event.moveAvatar(event.avatars[i], event.friend.length + event.config.width * (event.config.height - 1));
                                        event.friend.push(event.avatars[i]);
                                    }
                                    else {
                                        event.moveAvatar(event.avatars[i], event.enemy.length);
                                        event.enemy.push(event.avatars[i]);
                                    }
                                    event.avatars[i].classList.add('moved');
                                }
                            }
                            game.delay();
                            'step 5'
                            event.prompt('选择' + get.cnNumber(event.config.num) + '名出场武将');
                            event.enemylist = [];
                            for (var i = 0; i < event.avatars.length; i++) {
                                if (event.avatars[i].index > event.config.width) {
                                    event.avatars[i].classList.add('selecting');
                                }
                            }
                            var rand = [];
                            for (var i = 0; i < event.config.width; i++) {
                                for (var j = 0; j < event.config.width - i; j++) {
                                    rand.push(i);
                                }
                            }
                            for (var i = 0; i < event.config.num; i++) {
                                var rand2 = rand.randomGet();
                                for (var j = 0; j < rand.length; j++) {
                                    if (rand[j] == rand2) {
                                        rand.splice(j--, 1);
                                    }
                                }
                                event.enemylist.push(event.enemy[rand2]);
                            }
                            event.enemylist.randomSort();
                            event.friendlist = [];
                            event.deciding = true;
                            for (var i = 0; i < event.config.size; i++) {
                                event.nodes[i].hide();
                            }
                            game.pause();
                            'step 6'
                            event.promptbar.delete();
                            if (ui.cardPileButton) ui.cardPileButton.style.display = '';
                            lib.onresize.remove(event.resize);
                            ui.wuxie.show();
                            ui.auto.show();
                            for (var i = 0; i < event.avatars.length; i++) {
                                event.avatars[i].delete();
                            }
                            for (var i = 0; i < event.nodes.length; i++) {
                                event.nodes[i].delete();
                            }
                            event.result = { friend: [], enemy: [] };
                            for (var i = 0; i < event.config.num; i++) {
                                event.result.friend[i] = event.friendlist[i].link;
                                event.result.enemy[i] = event.enemylist[i].link;
                            }
                        });
                    },
                    tryMightyFoe() {
                        var mightyFoes = get.config("mightyFoe");
                        if (!mightyFoes || !mightyFoes.length) {
                            game.checkResult();
                            return;
                        }
                        mightyFoes = mightyFoes.filter(pair => lib.character[pair.name1] && lib.character[pair.name2]);
                        if (!mightyFoes.length) {
                            game.checkResult();
                            return;
                        }
                        var names = mightyFoes.randomGet();
                        var next = game.createEvent('tryMightyFoe', false);
                        next.player = game.me;
                        next.name1 = names.name1;
                        next.name2 = names.name2;
                        next.setContent(function () {
                            'step 0'
                            player.chooseBool("是否要挑战强敌？", ()=>true);
                            'step 1'
                            if (!result.bool) {
                                event.finish();
                                game.checkResult();
                            }
                            'step 2'
                            player.enemy.revive(null, false);
                            player.enemy.uninit();
                            player.enemy.draw(4);
                            player.enemy.init(event.name1, event.name2);
                            if (player.isPhaseUsing()) {
                                event.getParent('phaseUse').skipped=true;
                            }
                            'step 3'
                            player.showGiveup();
                            var evt = event.getParent('dying');
                            if (evt && evt.parent) evt.parent.untrigger(false, player.enemy);
                            game.triggerEnter(player.enemy);
                            player.enemy.addSkill('martial_qiangdi');
                        });
                    }
                },
                element: {
                    player: {
                        hasZhuSkill: function () { return false; },
                        dieAfter: function () {
                            // if (_status.mode != 'normal') throw "Not implemented";
                            if (_status.characterChoice[this.identity].length == 0) {
                                // 挑战强敌条件：对手阵亡，且己方双将
                                if (this == game.me || game.me.isDying() || !game.me.name2 || this.hasSkill('martial_qiangdi')) {
                                    game.checkResult();
                                }
                            } 

                        },
                        dieAfter2: function () {
                            // if (_status.mode != 'normal') throw "Not implemented";
                            if (_status.characterChoice[this.identity].length == 0) {
                                game.tryMightyFoe();
                                return;
                            }
                            var next = game.createEvent('replacePlayerMartial', false, _status.event.getParent());
                            next.player = this;
                            next.forceDie = true;
                            next.setContent(function () {
                                "step 0"
                                game.delay();
                                "step 1"
                                var source = player;
                                var name = source.getbackupCharacters().shift();
                                var color = source.node.identity.dataset.color;

                                game.broadcastAll(function (source, name, color) {
                                    source.revive(null, false);
                                    source.uninit();
                                    source.init(name);
                                    source.node.identity.dataset.color = color;
                                }, source, name, color);
                                game.log(source, '出场');
                                source.askJoin();
                                "step 2"
                                var source = player;
                                var name = source.name;
                                var color = source.node.identity.dataset.color;
                                var num = 4;
                                if (player.hasSkill('cuorui')) {
                                    player.logSkill('cuorui');
                                    num = 2 + _status.characterChoice[player.identity].length;
                                }
                                source.draw(num);
                                var evt = event.getParent('dying');
                                if (evt && evt.parent) evt.parent.untrigger(false, source);
                                game.addVideo('reinit', source, [name, color]);
                                game.triggerEnter(source);
                            });
                        },
                        logAi: function (targets, card) { },
                        showIdentity: function () {
                            game.broadcastAll(function (player, identity) {
                                player.identity = identity;
                                game[identity] = player;
                                player.side = identity == 'zhu';
                                player.node.identity.classList.remove('guessing');
                                player.identityShown = true;
                                player.ai.shown = 1;
                                player.setIdentity();
                                if (player.identity == 'zhu') {
                                    player.isZhu = true;
                                }
                                if (_status.clickingidentity) {
                                    for (var i = 0; i < _status.clickingidentity[1].length; i++) {
                                        _status.clickingidentity[1][i].delete();
                                        _status.clickingidentity[1][i].style.transform = '';
                                    }
                                    delete _status.clickingidentity;
                                }
                            }, this, this.identity);
                        },
                        getbackupCharacters() {
                            return _status.characterChoice[this.identity];
                        },
                        askJoin() {
                            if(game.ui_identityShow_update) game.ui_identityShow_update();
                            var double = _status.connectMode ? lib.configOL.double_character : get.config('double_character');
                            if (!double) return;
                            if (this.getbackupCharacters().length <= 0) return;
                            if (this.name2) return;
                            var next = game.createEvent('joinDouble', false);
                            next.player = this;
                            next.setContent(function () {
                                "step 0"
                                game.delay();
                                "step 1"
                                player.chooseBool(`是否要令${lib.translate[player.name1]}与${lib.translate[player.getbackupCharacters()[0]]}组成双将？`)
                                    .set("ai", () => Math.random() < 0.75);
                                "step 2"
                                if (result.bool) {
                                    player.init(player.name1, player.getbackupCharacters().shift());
                                }
                                // if (result.bool) {
                                //     // force minus three hp
                                //     player._update = player.update;
                                //     player.update = function () { return this; };
                                //     player.init(player.name1, player.getbackupCharacters().shift());
                                //     var info = lib.character[player.name1];
                                //     if (!info) {
                                //         info = ['', '', 1, [], []];
                                //     }
                                //     var hp1 = get.infoHp(info[2]);
                                //     var maxHp1 = get.infoMaxHp(info[2]);
                                //     var info2 = lib.character[player.name2];
                                //     if (!info2) {
                                //         info2 = ['', '', 1, [], []];
                                //     }
                                //     var hp2 = get.infoHp(info2[2]);
                                //     var maxHp2 = get.infoMaxHp(info2[2]);
                                //     player.maxHp = maxHp1 + maxHp2 - 3;
                                //     player.hp = hp1 + hp2 - 3;
                                //     delete player.singleHp;
                                //     player.update = player._update;
                                //     delete player._update;
                                //     player.update();
                                // }
                                "step 3"
                                if(game.ui_identityShow_update) game.ui_identityShow_update();
                            });
                            return next;
                        },
                    }
                },
                get: {
                    attitude: function (from, to) {
                        if (from == to) return 10;
                        return -10;
                    },
                },
                skill: {
                    martial_qiangdi: {
                        mark: true,
                        marktext: '戾',
                        intro: {
                            content: `<span style= "font-family: xingkai, xinwei;font-size:large">此乃天下难见之强敌！</span>`,
                        },
                    }
                },
                translate: {
                    zhu: "先",
                    fan: "后",
                    zhu2: "先手",
                    fan2: "后手",
                    normal2: '新1v1',
                    changban2: '血战长坂坡',
                    dianjiang2: '点将单挑',
                    martial_qiangdi: '来袭强敌',
                },
                help: {
                    '武皇争霸': `\
武皇模式。暂不支持联机。<br>
<p>  进入此模式后你可以选择5个武将（选完后可以排列出场顺序，其中有若干个个是不出场的），其中在牌堆里会有翻面武将（玩家看不到的武将）或是正面的武将（玩家可以看到的），\
武将是按照玩家排列的顺序出场的，不像是对决模式一样通完第一关就可以随便换将。当有一名武将阵亡，重置所有状态和卡牌后替换下一名武将出场并摸四张牌；当一名玩家的所有上场武将全部阵亡，\
游戏结束，敌方获胜。
武皇自用目前没有强敌功能ORZ感觉有这个需要的可以提。</p>
`,
                }
            };

            var info2 = {
                config: {
                    update: function (config, map) {
                        if(config.double_character){
                            map.double_hp.show();
                        }
                        else{
                            map.double_hp.hide();
                        }
                    },
                    /*martial_mode: {
                        name: '游戏模式',
                        init: 'normal',
                        item: {
                            normal: '标准',
                            //wild: '狂野',
                        },
                        restart: true,
                        frequent: true,
                        intro: '假装有两个模式'
                    },*/
                    show_number: {
                        name: '选池人数',
                        init: '5',
                        item: {
                            '2': '两人',
                            '3': '三人',
                            '4': '四人',
                            '5': '五人',
                            '6': '六人',
                            '7': '七人',
                            '8': '八人',
                        },
                        frequent: true,
                        restart: true,
                        intro: '其中一方抽出武将牌的数量，不会少于出场人数的数量',
                    },
                    battle_number: {
                        name: '出场人数',
                        init: '5',
                        item: {
                            '2': '两人',
                            '3': '三人',
                            '4': '四人',
                            '5': '五人',
                            '6': '六人',
                            '7': '七人',
                            '8': '八人',
                        },
                        frequent: true,
                        restart: true,
                        intro: '最终选择出场的武将数量，重启后生效',
                    },
                    hide_number: {
                        name: '隐藏人数',
                        init: '2',
                        item: {
                            '2': '两人',
                            '3': '三人',
                            '4': '四人',
                            '5': '五人',
                            '6': '六人',
                            '7': '七人',
                            '8': '八人',
                        },
                        frequent: true,
                        restart: true,
                        intro: '其中一方抽出后武将牌是背面的数量，不会多于选池人数',
                    },
                    double_character: {
                        name: '双将模式',
                        intro: "开启后，武将可以与队列中下一位武将组成双将。<br>血量上限为和减三。",
                        init: false,
                        frequent: true,
                        restart: false,
                    },
                    double_hp:{
						name:'双将体力上限',
						init:'hejiansan',
						item:{
							hejiansan:'和减三',
							pingjun:'平均值',
							zuidazhi:'最大值',
							zuixiaozhi:'最小值',
							zonghe:'相加',
						},
						restart:true,
					},
                    free_choose: {
                        name: '自由选将',
                        intro: "设置自由选将",
                        init: false,
                        frequent: true,
                        restart: false,
                    },
                    change_choice: {
                        name: '换选',
                        init: false,
                        frequent: true,
                        restart: false,
                    },
                },
                translate: '武皇争霸'
            };
            info2.connect = {update: info2.config.update};
            for (var i in info2.config) {
                if (i != "update") {
                    info2.connect['connect_' + i] = info2.config[i];
                }
            }
            game.addMode('martial', martial_mode, info2);
            lib.mode['martial'].connect = false; // connect mode is still not supported

        }, config: {}, help: {}, package: {
            character: {
                character: {
                },
                translate: {
                },
            },
            card: {
                card: {
                },
                translate: {
                },
                list: [],
            },
            skill: {
                skill: {
                },
                translate: {
                },
            },
            intro: `<span style='opacity: 0.6;'>2022.06.07更新<br>
&ensp; 加入换将&重选选项。<br>
&ensp; 修复AI选将时存在透视的问题。<br>
&ensp; 去掉了强敌SR华佗&黄盖，添加了几组强敌。<br>
2021.12.01更新<br>
&ensp; 修复牌堆翻倍的问题。<br>
2021.07.17更新<br>
&ensp; 修复ai态度可能报错。<br>
历史：<br>
2021.03.18更新<br>
&ensp; 优化体力上限计算方式,允许玩家自行设置。<br>
&ensp; 加入了挑战强敌时的投降按钮(=・ω・=)<br>
&ensp; 挑战强敌时时失败会正确的计算为游戏胜利。<br>
&ensp; 并且挑战强敌成功有了一<span style="font-size: 150%">大</span>笔奖金。<br>
2021.02.23更新<br>
&ensp; 更改替补上阵摸牌数为4。<br>
&ensp; 窃闻诸武皇使用者不满足于常规敌人的强度, 欲挑战强敌以砥砺兵马, 吾心甚慰<span style="white-space: nowrap;">(●'◡'●)</span><br>
&ensp; 余思虑再三，写四五行代码为诸君送来一二挑战：<br>
&ensp; ————添加了强敌来袭！<br>
&ensp; ————为了取得最好的强敌体验，请安装极略拓展，并打开游戏内置的角色包。如果不希望角色通过其他方式选到可以设为AI禁用。<br>
2021.02.19更新<br>
&ensp; 暂时加入了一张隐藏武将的贴图。<br>
&ensp; 修复了隐藏武将可以查看技能信息的漏洞。<br></span>`,
            author: "xiaoas",
            diskURL: "",
            forumURL: "",
            version: "1.3",
            /*changelog: `\
2022.06.07更新<br>
&ensp; 加入换将&重选选项。<br>
&ensp; 修复AI选将时存在透视的问题。<br>
&ensp; 去掉了强敌SR华佗&黄盖，添加了几组强敌。<br>
2021.12.01更新<br>
&ensp; 修复牌堆翻倍的问题。<br>
2021.07.17更新<br>
&ensp; 修复ai态度可能报错。<br>
历史：<br>
2021.03.18更新<br>
&ensp; 优化体力上限计算方式,允许玩家自行设置。<br>
&ensp; 加入了挑战强敌时的投降按钮(=・ω・=)<br>
&ensp; 挑战强敌时时失败会正确的计算为游戏胜利。<br>
&ensp; 并且挑战强敌成功有了一<span style="font-size: 150%">大</span>笔奖金。<br>
2021.02.23更新<br>
&ensp; 更改替补上阵摸牌数为4。<br>
&ensp; 窃闻诸武皇使用者不满足于常规敌人的强度, 欲挑战强敌以砥砺兵马, 吾心甚慰<span style="white-space: nowrap;">(●'◡'●)</span><br>
&ensp; 余思虑再三，写四五行代码为诸君送来一二挑战：<br>
&ensp; ————添加了强敌来袭！<br>
&ensp; ————为了取得最好的强敌体验，请安装极略拓展，并打开游戏内置的角色包。如果不希望角色通过其他方式选到可以设为AI禁用。<br>
2021.02.19更新<br>
&ensp; 暂时加入了一张隐藏武将的贴图。<br>
&ensp; 修复了隐藏武将可以查看技能信息的漏洞。<br>
`,*/
        }, files: { "character": [], "card": [], "skill": [] }
    }
})