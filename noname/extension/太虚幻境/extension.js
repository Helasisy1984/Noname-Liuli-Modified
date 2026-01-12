game.import("extension", function (lib, game, ui, get, ai, _status) {
    if (lib.config['extension_' + '太虚幻境' + '_enable']) {
        lib.txhjExten = [];
        window.txhjModeImport = function (func) {
            lib.txhjExten.push(func);
        };
        lib.init.js(lib.assetURL + 'extension/太虚幻境/extension_framework.js', null, function () {
        }, function () {
            return;
        });
    } else {
        return {
            name: "太虚幻境",
            editable: false,
            content: function () {
            },
            precontent: function () {
            },
            config: {},
            package: {
                intro: ""
                    + "开发版：2.0.3.4",
                author: "太虚幻境攻坚小分队",
                diskURL: "",
                forumURL: "",
                version: "2.0.3.4",
            },
        }
    }

    window.txhjPack={};
    window.txhj={};
    txhj.isInitCardPileTx=![];
    txhjPack.path=lib.assetURL+'extension/太虚幻境';
    lib.init.css(''+lib.assetURL+'extension/太虚幻境','extension_style');
    lib.init.css(txhjPack.path,'extension_servant');
    lib.init.js(lib.assetURL+'extension/太虚幻境/extension_csrank.js',null,function(){
        txhjPack.cardPack=txhjPack.cardRank.slice(0);
    },function(){return;});
    
    return {
        name: "太虚幻境",
        editable: false,
        content: function (config, pack) {
            //跟十周年做联动，排除出原本位置的马
            if(!window.tenUItraNP) window.tenUItraNP={};
            for(var i in lib.card) {
                var ma=lib.card[i];
                if(ma.subtype&&ma.subtype=='equip3') window.tenUItraNP[i]='pos1';
                if(ma.subtype&&ma.subtype=='equip4') window.tenUItraNP[i]='neg1';
            }
            delete lib.extensionMenu['extension_太虚幻境'].delete; 
            lib.extensionMenu['extension_太虚幻境'].author = {
                name: '制作组：太虚幻境攻坚小分队',
                clear: true,
                nopointer: true,
            };
            //---------制作小组-------//
            lib.extensionMenu.extension_太虚幻境.chengyuan2={
                "name":'<div class="hth_menu">二期开发组▶</div>',
                "clear": true,
                "onclick":function(){
                    if(this.txhj_more==undefined){
                        var more=ui.create.div('.txhj_more',
                            '<div style="text-align:left"><font size=3px>'+
                            '<br>【技能、祝福】：无中一无中'+
                            '<br>【侍灵、特效】：EngJ.K'+
                            '<br>【技能创作】：铝宝'+
                            '<br>【机制整合】：糖送'+
                            '<br>【摸鱼大佬】：咸鱼'+
                            '<br>【资料整理】：紫乔'+
                            '<br>【代码摸鱼】：GfNin'+
                            '<br>【技能池兼优化整理】：某个不为人知的萌新'+
                            '<br>【魔改缝合】：爱摸鱼的无名萌新'+
                            '<br>【魔改标题素材】：行者'+
                            '<br>【魔改指导】：很多大佬，记不太清了'+
                            '</font></div>');
                        this.parentNode.insertBefore(more,this.nextSibling);
                        this.txhj_more=more;
                        this.innerHTML='<div class="hth_menu">二期开发组▼</div>';
                    }
                    else{
                        this.parentNode.removeChild(this.txhj_more);
                        delete this.txhj_more;
                        this.innerHTML='<div class="hth_menu">二期开发组▶</div>';
                    };
                },
            };
            lib.extensionMenu.extension_太虚幻境.chengyuan1={
                "name":'<div class="hth_menu">一期开发组▶</div>',
                "clear": true,
                "onclick":function(){
                    if(this.txhj_more==undefined){
                        var more=ui.create.div('.txhj_more',
                            '<div style="text-align:left"><font size=3px>'+
                            '<br>【技能、祝福】：无中一无中'+
                            '<br>【侍灵、特效】：EngJ.K'+
                            '<br>【卡牌、装备】：零二'+
                            '<br>【勤务、测试】：远道'+
                            '<br>【素材、文案】：喋血长歌'+
                            '<br>【技术支持】：Helasisy'+
                            '<br>【技术顾问】：俺杀'+
                            '<br>【机制整合】：糖送盐萌青'+
                            '<br>【摸鱼大佬】：咸鱼大佬'+
                            '</font></div>');
                        this.parentNode.insertBefore(more,this.nextSibling);
                        this.txhj_more=more;
                        this.innerHTML='<div class="hth_menu">一期开发组▼</div>';
                    }
                    else{
                        this.parentNode.removeChild(this.txhj_more);
                        delete this.txhj_more;
                        this.innerHTML='<div class="hth_menu">一期开发组▶</div>';
                    };
                },
            };
            //--------------------------// 
            
      if (get.mode() != 'taixuhuanjing') {
                if (lib.config.cards.contains('太虚幻境')) {
                    lib.config.cards.remove('太虚幻境');
                }
                if (lib.config.all.cards.contains('太虚幻境')) {
                    lib.config.all.cards.remove('太虚幻境');
                }
                for (var i in lib.card){
                    if (i.indexOf('txhj_')!=-1) {
                        delete lib.card[i];
                    }
                }
                delete lib.characterPack.mode_extension_太虚幻境;
            } else {
            //屏蔽禁将、全能搜索
            setTimeout(function(){
                if(ui.Searcher) ui.Searcher.hide();
                if(ui.JinJiang) ui.JinJiang.hide();
            },2000);
                if (lib.config['extension_EngEX_enable']) {
                    var check = 0;
                    if (lib.config['extension_EngEX_SSServant']) {
                        game.saveConfig('extension_EngEX_SSServant', false);
                        check++;
                    }
                    if (lib.config['extension_EngEX_shop']) {
                        game.saveConfig('extension_EngEX_shop', false);
                        check++;
                    }
                    if (check > 0) {
                        game.reload();
                    }
                }
                if (lib.config['extension_十周年UI_enable']) {
                    if (!lib.config['extension_十周年UI_rightLayout']) {
                        game.saveConfig('extension_十周年UI_rightLayout', true);
                        game.reload();
                    }
                }
                if (!lib.config.dev) game.saveConfig('dev', true);
                lib.cheat.i();
                lib.txhjExten.forEach(item => item(lib, game, ui, get, ai, _status, config));
            /*非专属模式屏蔽武将/卡牌包*/
           /* if (get.mode() != 'taixuhuanjing') {
                if (lib.config.cards.contains('太虚幻境')) {
                    lib.config.cards.remove('太虚幻境');
                }
                if (lib.config.all.cards.contains('太虚幻境')) {
                    lib.config.all.cards.remove('太虚幻境');
                }
                for (var i in lib.card){
                    if (i.indexOf('txhj_')!=-1) {
                        delete lib.card[i];
                    }
                }
                delete lib.characterPack.mode_extension_太虚幻境;
            } else {
                if (lib.config['extension_EngEX_enable']) {
                    var check = 0;
                    if (lib.config['extension_EngEX_SSServant']) {
                        game.saveConfig('extension_EngEX_SSServant', false);
                        check++;
                    }
                    if (lib.config['extension_EngEX_shop']) {
                        game.saveConfig('extension_EngEX_shop', false);
                        check++;
                    }
                    if (check > 0) {
                        game.reload();
                    }
                }
                if (lib.config['extension_十周年UI_enable']) {
                    if (!lib.config['extension_十周年UI_rightLayout']) {
                        game.saveConfig('extension_十周年UI_rightLayout', true);
                        game.reload();
                    }
                }
                if (!lib.config.dev) game.saveConfig('dev', true);
                lib.cheat.i();
                lib.txhjExten.forEach(item => item(lib, game, ui, get, ai, _status, config)); */
                /*将素材复制到十周年*/
                /*if(game.getFileList){
                    game.getFileList('extension/太虚幻境/copy/decadeUI',function(folders,files){
                        if (folders) {
                            var arr1 = Array.from(folders);
                            arr1.forEach(function (s) {
                                var path = 'extension/太虚幻境/copy/decadeUI/'+s;
                                (function (path,foldername){
                                    game.getFileList(path,function(folders,files){
                                        if (files) {
                                            var arr = Array.from(files);
                                            arr.forEach(function (j) {
                                                (function (){
                                                    game.ensureDirectory('extension/十周年UI/image/'+foldername,function(){});
                                                    game.readFile(path+ '/' + j, function (data) {
                                                        game.writeFile(data, 'extension/十周年UI/image/'+foldername, j,function () {
                                                            game.removeFile(path+ '/' + j);
                                                        });
                                                    });
                                                })(j);
                                            });
                                        }
                                    });
                                })(path,s);
                            });
                        }
                    });
                }*/
                /*赛季名称*/
                window.seasonPacks = [];
                lib.translate['ChongYingChuLin'] = '初涉幻境';
                game.txhj_checkFileExist('extension/太虚幻境/dlc',function(s){
                    if(s && game.getFileList){
                        game.getFileList('extension/太虚幻境/dlc',function(folders,files){
                            if (folders) {
                                for(var s of folders){
                                    if(lib.translate[s]){
                                        seasonPacks.push(s);
                                    }
                                }
                            }
                        });
                    };
                });
            };
            console.log('太虚幻境完成加载');
        },
        precontent: function () {
            game.extension_太虚幻境_copy = function (sdir /*源文件夹路径*/, fn /*文件名*/, ddir /*目标文件夹路径*/, callback) {
                game.ensureDirectory(ddir, function () {
                });
                game.readFile(sdir + '/' + fn, function (data) {
                    game.writeFile(data, ddir, fn, (callback || function () {
                    }));
                });
            };
            lib.init.js(lib.assetURL +'extension/太虚幻境/extension_character.js',null,function(){},function(){
                return;
            });

            lib.init.js(lib.assetURL + 'extension/太虚幻境/extension_skill.js', null, function () {
            }, function () {
                return;
            });
            lib.init.js(lib.assetURL + 'extension/太虚幻境/extension_card.js', null, function () {
                lib.translate['太虚幻境_card_config'] = '太虚幻境';
                lib.config.all.cards.push('太虚幻境');
                if (!lib.config.cards.contains('太虚幻境')) lib.config.cards.remove('太虚幻境');
            }, function () {
                return;
            });
            game.txhj_playAudioCall = function (name, num, repeat) {
                if (!repeat) {
                    if (num === undefined || num === null) {
                        game.playAudio('..', 'extension', '太虚幻境', 'image', 'audio', name);
                    } else {
                        game.playAudio('..', 'extension', '太虚幻境', 'image', 'audio', name + Math.ceil(Math.random() * num));
                    }
                } else {
                    if (num === undefined || num === null) {
                        game.txhj_playGameAudio('..', 'extension', '太虚幻境', 'image', 'audio', name);
                    } else {
                        game.txhj_playGameAudio('..', 'extension', '太虚幻境', 'image', 'audio', name + Math.ceil(Math.random() * num));
                    }
                }
            };
            game.txhj_playGameAudio = function () {
                if (_status.video && arguments[1] != 'video') return;
                var str = '';
                var onerror = null;
                for (var i = 0; i < arguments.length; i++) {
                    if (typeof arguments[i] === 'string' || typeof arguments[i] == 'number') {
                        str += '/' + arguments[i];
                    } else if (typeof arguments[i] == 'function') {
                        onerror = arguments[i]
                    }
                    if (_status.video) break;
                }
                _status.skillaudio.add(str);
                game.addVideo('playAudio', null, str);
                setTimeout(function () {
                    _status.skillaudio.remove(str);
                }, 1000);
                var audio = document.createElement('audio');
                audio.autoplay = true;
                audio.volume = lib.config.volumn_audio / 8;
                if (str.indexOf('.mp3') != -1 || str.indexOf('.ogg') != -1) {
                    audio.src = lib.assetURL + 'audio' + str;
                } else {
                    audio.src = lib.assetURL + 'audio' + str + '.mp3';
                }
                audio.addEventListener('ended', function () {
                    this.remove();
                });
                audio.onerror = function () {
                    if (this._changed) {
                        this.remove();
                        if (onerror) {
                            onerror();
                        }
                    } else {
                        this.src = lib.assetURL + 'audio' + str + '.ogg';
                        this._changed = true;
                    }
                };
                ui.window.appendChild(audio);
                return audio;
            };
            game.txhj_TrySkillAudio = function (skill, player, directaudio, which, skin) {
                if (_status.qhly_viewRefreshing) return;
                var info = get.info(skill);
                if (!info) return;
                _status.qhly_previewAudio = true;
                if (true) {
                    var audioname = skill;
                    if (info.audioname2 && info.audioname2[player.name]) {
                        audioname = info.audioname2[player.name];
                        info = lib.skill[audioname];
                    }
                    var audioinfo = info.audio;
                    if (typeof audioinfo == 'string' && lib.skill[audioinfo]) {
                        audioname = audioinfo;
                        audioinfo = lib.skill[audioname].audio;
                    }
                    if (typeof audioinfo == 'string') {
                        if (audioinfo.indexOf('ext:') == 0) {
                            audioinfo = audioinfo.split(':');
                            if (audioinfo.length == 3) {
                                if (audioinfo[2] == 'true') {
                                    game.playAudio('..', 'extension', audioinfo[1], audioname);
                                } else {
                                    audioinfo[2] = parseInt(audioinfo[2]);
                                    if (audioinfo[2]) {
                                        if (typeof which == 'number') {
                                            game.playAudio('..', 'extension', audioinfo[1], audioname + (which % audioinfo[2] + 1));
                                        } else {
                                            game.playAudio('..', 'extension', audioinfo[1], audioname + Math.ceil(audioinfo[2] * Math.random()));
                                        }
                                    }
                                }
                            }
                            delete _status.qhly_previewAudio;
                            return;
                        }
                    } else if (Array.isArray(audioinfo)) {
                        audioname = audioinfo[0];
                        audioinfo = audioinfo[1];
                    }
                    if (Array.isArray(info.audioname) && player) {
                        if (info.audioname.contains(player.name)) {
                            audioname += '_' + player.name;
                        } else if (info.audioname.contains(player.name1)) {
                            audioname += '_' + player.name1;
                        } else if (info.audioname.contains(player.name2)) {
                            audioname += '_' + player.name2;
                        }
                    }
                    if (typeof audioinfo == 'number') {
                        if (typeof which == 'number') {
                            game.playAudio('skill', audioname + (which % audioinfo + 1));
                        } else {
                            game.playAudio('skill', audioname + Math.ceil(audioinfo * Math.random()));
                        }
                    } else if (audioinfo) {
                        game.playAudio('skill', audioname);
                    } else if (true && info.audio !== false) {
                        game.playSkillAudio(audioname);
                    }
                }
            };
            game.txhj_checkFileExist=function(path,callback){
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
        },
        config: {},
        package: {
            character: {
                character: {},
                translate: {},
            },
            card: {
                card: {},
                translate: {},
                list: [],
            },
            skill: {
                skill: {
                  //------------------------------------//

            //待援
            "txhj_daiyuan":{
                global:"txhj_daiyuan2",//全场调用此技能  
                forced:true,
                ai:{
                    threaten:2,
                },
            },

            "txhj_daiyuan2": {
                enable: 'phaseUse',
                direct: true,
                filter: function(event, player) {
                    if (player.hasSkill("txhj_daiyuan") || !game.hasPlayer(function(target) {
                        return target.hasSkill("txhj_daiyuan") && target.isDamaged();
                    })) return false;
                        if (player.hasSkill('txhj_daiyuanA') && player.hasSkill('txhj_daiyuanB')) return false;
                        var num = player.countCards("he");
                        if (num < 2) return false;
                        var c = player.getCards("he")[0];
                        var num1 = player.countCards("he", ca => get.color(ca, player) == get.color(c, player));
                        var num2 = player.countCards("he", ca => get.type2(ca, player) == get.type2(c, player));
                        if (player.hasSkill('txhj_daiyuanB') && num1 == num) return false;
                        else if (player.hasSkill('txhj_daiyuanA') && num2 == num) return false;
                        else return num1 + num2 < 2 * num;
                },
                content: function() {
                    "step 0"
                     var list=['选项一','选项二','cancel2'];
                            if(player.hasSkill('txhj_daiyuanA')){
                                list.remove('选项一');
                            }
                            if(player.hasSkill('txhj_daiyuanB')){
                                list.remove('选项二');
                            }
                            
                            var str='弃置两张XX不同的牌，令【待援】角色回复一点体力';
                            str=[str.replace(/XX/g, '颜色'),str.replace(/XX/g, '类型')];
                            player.chooseControl(list).set('choiceList',str).set('ai',function(){
                                if(player.countCards('he',card=>get.value(card)<6&&player.countCards('he',card1=>card!=card1&&get.color(card,player)!=get.color(card1,player)&&get.value(card1)<6)>0)&&list.contains('选项一'))return '选项一';
                                if(player.countCards('he',card=>get.value(card)<6&&player.countCards('he',card1=>card!=card1&&get.type2(card,player)!=get.type2(card1,player)&&get.value(card1)<6)>0)&&list.contains('选项二'))return '选项二';
                                return 'cancel2';
                            });
                            "step 1"
                            if(result.control!='cancel2'){
                                event.control=result.control;
                                event.filter1=function(card){
                                    var color=get.color(card);
                                    for (var i = 0; i<ui.selected.cards.length; i++) {
                                        if (get.color(ui.selected.cards[i])==color) return false;
                                    }
                                    return true;
                                };
                                event.filter2=function(card){
                                    var type2=get.type2(card);
                                    for (var i = 0; i<ui.selected.cards.length; i++) {
                                        if (get.type2(ui.selected.cards[i])==type2) return false;
                                    } return true;
                                };
                                var next=player.chooseToDiscard(2,'he');
                                next.set('ai',function(card){
                                    return 6-get.value(card);
                                });
                                next.set('complexCard',true);
                                if(result.control=='选项一'){
                                    next.set('filterCard',event.filter1);
                                    next.set('prompt2','弃置两张颜色不同的牌');
                                }else if(result.control=='选项二'){
                                    next.set('filterCard',event.filter2);
                                    next.set('prompt2','弃置两张类型不同的牌');
                                }
                            }else event.finish();
                            "step 2"
                            if(result.bool){
                                if(event.control=='选择一'){
                                    player.addTempSkill('txhj_daiyuanA');
                                }else if(event.control=='选择二'){
                                    player.addTempSkill('txhj_daiyuanB');
                                }
                                var target=game.findPlayer(function(current){
                                    return current.hasSkill('txhj_daiyuan')&&current.isDamaged();
                                });
                                player.line(target,'green');
                                player.logSkill('txhj_daiyuan',target);
                                target.recover();
                            };
                     },
                ai: {
                    order: 1,
                    result: {
                        player: function(player) {
                            var target = game.findPlayer(function(target) {
                                return target.hasSkill("txhj_daiyuan") && target.isDamaged();
                            });
                            if (get.attitude(player, target) < 0) return 0;
                            var list = ['选项一', '选项二', 'cancel2'];
                            if (player.hasSkill('txhj_daiyuanA')) {
                                list.remove('选项一');
                            }
                            if (player.hasSkill('txhj_daiyuanB')) {
                                list.remove('选项二');
                            }
                            if (player.countCards("he", ca => get.value(ca) < 6 && player.countCards("he", c => ca != c && get.color(ca, player) != get.color(c, player) && get.value(c) < 6)) > 0 && list.contains('选项一')) return 1;
                            if (player.countCards("he", ca => get.value(ca) < 6 && player.countCards("he", c => ca != c && get.type2(ca, player) != get.type2(c, player) && get.value(c) < 6)) > 0 && list.contains('选项二')) return 1;
                            return 0;
                        },
                    },
                    threaten: 5.7,
                },
            },
        
        "txhj_daiyuanA":{
    mark:true,
    marktext:"★️",
    intro:{
        name:"待援·颜色",
        content:"本回合已发动过【待援】选项一",
    },
        },
        
        "txhj_daiyuanB":{
    mark:true,
    marktext:"○",
    intro:{
        name:"待援·类型",
        content:"本回合已发动【待援】选项二",
    },
        },
                    //------------------------//
                    //醉酒
                    "txhj_zuijiu": {
                        trigger: {
                            source: 'damageBegin1',
                        },
                        filter: function (event) {
                            //限制事件卡牌必须为杀，notlink限制没有相关的加伤事件叠加。如果两个加伤技能的过滤器里面都有notlink判断，只触发其中一个。
                            return event.card && event.card.name == 'sha' && event.notLink();
                        },
                        forced: true,
                        content: function () {
                            trigger.num++;
                        },
                        ai: {
                            damageBonus: true
                        },
                    },
                    //-------------------------//
                    //暴击
                    "txhj_baoji": {
                        trigger: {
                            source: 'damageBegin1',
                        },
                        filter: function (event, player) {
                            //醉酒改动一下，就OK。默认概率40%触发。如果选项里开启了幸运星模式则百分百触发。
                            return get.isLuckyStar(player) || (event.card && event.card.name == 'sha' && event.getRand() < 0.4);
                        },
                        forced: true,
                        content: function () {
                            trigger.num++;
                        },
                        ai: {
                            damageBonus: true
                        },
                    },
                    //-------------------------//
                    //拘魂
                    "txhj_juhun": {
                        group: ['txhj_juhun_phase', 'txhj_juhun_die'],
                        subSkill: {
                            phase: {
                                trigger: {
                                    player: "phaseAfter",
                                },
                                priority: -15,
                                direct: true,
                                content: function () {
                                    player.storage.txhj_juhun = true;
                                },
                                sub: true,
                            },
                            die: {
                                trigger: {
                                    global: "die",
                                },
                                priority: -15,
                                marktext: "拘魂",
                                direct: true,
                                filter: function (event, player) {
                                    if (!player.storage.txhj_juhun) return false;
                                    return event.player.side == player.side;
                                },
                                content: function () {
                                    'step 0'
                                    if(!player.storage.txhj_juhun_die){
                                        player.storage.txhj_juhun_die = []
                                    };
                                    'step 1'
                                    player.storage.txhj_juhun_die.push(trigger.player);
                                    player.markSkill('txhj_juhun_die');
                                },
                                intro: {
                                    name: "上回合阵亡的友军",
                                    content: "player",
                                },
                                sub: true,
                            },
                        },
                        trigger: {
                            player: "phaseBegin",
                        },
                        priority: 1,
                        forced: true,
                        locked: true,
                        filter: function (event, player) {
                            player.storage.txhj_juhun = false;
                            if (!player.storage.txhj_juhun_die) player.storage.txhj_juhun_die = [];
                            return player.storage.txhj_juhun_die.length > 0;
                        },
                        init: function (player, skill) {
                            player.storage.txhj_juhun = false;
                        },
                        content: function () {
                            'step 0'
                            var revive=player.storage.txhj_juhun_die.randomGet();
                            revive.revive(3);
                            game.addVideo('revive',revive);
                            revive.draw(3);
                            'step 1'
                            player.storage.txhj_juhun_die= [];
                            player.unmarkSkill('txhj_juhun_die');
                        },
                    },
                    //----------------------------//
                    //鬼魅
                    "txhj_guimei": {
                        forced:true,
                        mod: {
                            targetEnabled: function (card, player, target) {
                                if (get.type(card) == 'delay') {
                                    return false;
                                }
                            },
                        },
                        ai: {
                            threaten: 2.7
                        }
                    },
                    //--------------------------//
                    //暴敛
                    "txhj_baolian": {
                        trigger: {player: 'phaseJieshuBegin'},
                        frequent: true,
                        forced:true,
                        preHidden: true,
                        content: function () {
                            player.draw(2);
                        },
                    },
                    //-------------------------//
                    //悲鸣
                    "txhj_beiming": {
                        trigger: {player: 'dieBegin'},
                        forced: true,
                        filter: function (event) {
                            return event.source != undefined;
                        },
                        content: function () {
                            trigger.source.discard(trigger.source.getCards('h'));
                        },
                        ai: {
                            threaten: 0.7
                        }
                    },
                    //----------------------//
                    //狂暴
                    "txhj_kuangbao": {
                        trigger: {
                            source: "damageBegin",
                        },
                     
                        forced: true,
                        init: function (player, storage) {
                            player.storage.txhj_kuangbao = 0;
                            player.syncStorage('txhj_kuangbao');
                            player.markSkill('txhj_kuangbao');
                        },
                        mark: true,
                        marktext: "狂暴",
                        intro: {
                            name: "狂暴",
                            content: "造成的伤害+#",
                        },
                        filter: function (event, player) {
                            return player.storage.txhj_kuangbao >= 1;

                        },
                        content: function () {
                            var num = player.storage.txhj_kuangbao;
                            trigger.num += n;
                        },
                        group: ["txhj_add", "txhj_clear"],
                        ai: {
                            threaten: 3.7
                        },
                    },

                    //每轮开始记录一次，如果满足七轮条件，增加伤害收益
                    "txhj_add": {
                        trigger: {
                            global: "roundStart",
                        },
                        mark: true,
                        marktext: "⑦",
                        intro: {
                            name: "⑦",
                            content: "已经连续#轮未进入濒死状态。",
                        },
                        init: function (player, storage) {
                            player.storage.txhj_add = 0;
                            player.syncStorage('txhj_add');
                            player.markSkill('txhj_add');
                        },
                        forced: true,
                        priority: 10,
                        filter: function (event, player) {
                            return !player.hasSkill("txhj_debuff") && game.roundNumber != 1;
                        },
                        content: function () {
                            "step 0"
                            player.storage.txhj_add++;
                            player.syncStorage('txhj_add');
                            player.markSkill('txhj_add');
                            "step 1"
                            if(player.storage.txhj_add== 7){
                                var num=player.storage.txhj_add;
                                player.storage.txhj_add-= num;
                                player.syncStorage('txhj_add');
                                player.unmarkSkill('txhj_add');
                                player.storage.txhj_kuangbao++;
                                player.syncStorage('txhj_kuangbao');
                                player.markSkill('txhj_kuangbao');
                            }
                        },
                    },

                    //进入濒死时，清空记录，并加上一个临时技能，用于判断。
                    "txhj_clear": {
                        trigger: {
                            player: "dying",
                        },
                        forced: true,
                        content: function () {
                            "step 0"
                            if(player.storage['txhj_add']> 0){
                                var num=player.storage.txhj_add;
                                player.storage['txhj_add']-= num;
                                player.syncStorage('txhj_add');
                                player.unmarkSkill('txhj_add')
                            };
                            "step 1"
                            if(!player.hasSkill('txhj_debuff')){
                                player.addSkill('txhj_debuff')
                            };
                        },

                    },

                    //进入濒死时，加上这个临时技能。
                    "txhj_debuff": {
                        trigger: {
                            global: "roundStart",
                        },
                        forced: true,
                        mark: true,
                        marktext: "溃败",
                        intro: {
                            name: "溃败",
                            content: "已进入过濒死状态，【狂暴】将于新的一轮重新计算。",
                        },
                        priority: 1,/*技能发动的优先级，考虑到要判断轮数结算，把它排在狂暴技能结算之后。*/
                        content: function () {
                            player.removeSkill("txhj_debuff");
                        },
                    },

                    //--------------------------//
                    //吞噬
                    "txhj_tunshi": {
                        trigger: {
                            player: "phaseBegin",
                        },
                        forced: true,
                        
                        filter: function (event, player, target) {

                            return game.hasPlayer(function (target) {
                                return target.isEnemyOf(player) && target.countCards('h') > player.countCards('h');
                            });

                        },
                        content: function () {
                            "step 0"
                            player.chooseTarget(get.prompt('txhj_tunshi'), function (card, player, target) {
                                return target.isEnemyOf(player) && target.countCards('h') > player.countCards('h');
                            }, true).ai = function (target) {
                                var att = get.attitude(player, target);

                                return -att;
                            };
                            "step 1"
                            if (result.bool) {
                                player.logSkill('txhj_tunshi', result.targets);
                                result.targets[0].damage();
                            }
                        },
                        ai: {
                            threaten: 2.7,
                        },
                    },

                    //--------------------------//
                    //穿云
                    "txhj_chuanyun": {
                        trigger: {
                            player: "phaseEnd",
                        },
                        direct: true,
                        
                        filter: function (event, player, target) {

                            return game.hasPlayer(function (target) {
                                return target.isEnemyOf(player) && target.hp > player.hp;
                            });

                        },
                        content: function () {
                            "step 0"
                            player.chooseTarget(get.prompt('txhj_chuanyun'), function (card, player, target) {
                                return target.isEnemyOf(player) && target.hp > player.hp;
                            }).ai = function (target) {
                                var att = get.attitude(player, target);

                                return -att;
                            };
                            "step 1"
                            if (result.bool) {
                                player.logSkill('txhj_chuanyun', result.targets);
                                result.targets[0].damage();
                            }
                        },
                        ai: {
                            threaten: 1.7,
                        },
                    },

                    //------------------------//
                    //鬼火
                    "txhj_guihuo": {
                        trigger: {player: 'phaseJieshuBegin'},
                        direct: true,
                        content: function () {
                            "step 0"
                            player.chooseTarget(get.prompt('txhj_guihuo'), function (card, player, target) {
                                return player != target;
                            }).ai = function (target) {
                                return get.damageEffect(target, player, player, 'fire');
                            }
                            "step 1"
                            if (result.bool) {
                                player.logSkill('txhj_guihuo', result.targets);
                                result.targets[0].damage('fire');
                            }
                        },
                    },

                    //-----------------------//
                    //落雷
                    "txhj_luolei": {
                        trigger: {player: 'phaseZhunbeiBegin'},
                        direct: true,
                        content: function () {
                            "step 0"
                            player.chooseTarget(get.prompt('txhj_luolei'), function (card, player, target) {
                                return player != target;
                            }).ai = function (target) {
                                return get.damageEffect(target, player, player, 'thunder');
                            }
                            "step 1"
                            if (result.bool) {
                                player.logSkill('txhj_luolei', result.targets);
                                result.targets[0].damage('thunder');
                            }
                        },
                    },
    
    
                        //亡阻
                        "txhj_wangzu": {
                            trigger: {
                                player: "dieBegin",
                            },
                            filter: function (event, player) {
                                return _status.currentPhase != player;
                            },
                            forced: true,
                            priority: 10,
                            content: function () {
                                var evt = _status.event.getParent('phaseUse');
                                if (evt && evt.name == 'phaseUse') {
                                    evt.skipped = true;
                                    game.log(player, '发动了【亡阻】');
                                    event.finish();
                                }
                            },
                            ai: {
                                threaten: 5.7,
                            },
                        },
                        /*黄天之怒*/
                        //------黄巾------//
                        "txhj_huangjin": {
                            trigger: {
                                target: 'useCardToTarget'
                            },
                            filter: function(event, player) {
                                return get.name(event.card) == 'sha';
                            },
                            frequent:true,
                            content: function() {
                                'step 0'
                                player.judge(function(result) {
                                    var a=Math.abs(get.number(trigger.card)-result.number);
                                    if (a<=1) return 1;
                                    return -1;
                                });
                                'step 1'
                                if (result.bool) {
                                    trigger.getParent().targets.length = 0;
                                    trigger.getParent().all_excluded = true;
                                    game.log(trigger.card,'对',player,'无效');
                                }
                            },
                            ai:{
                                threaten:1.5,   
                            },
                        },
                        //------咒诅------//
                        'txhj_zhouzu':{
                            audio:2,
                            mahouSkill:true,
                            enable:'phaseUse',
                            usable:1,
                            filter:function(event,player){
                                return game.hasPlayer(function(current){
                                    return current!=player&&!current.hasSkill('txhj_zhouzu_mahou');      
                                });
                            },
                            filterTarget:function(card,player,target){
                                return target!=player&&!target.hasSkill('txhj_zhouzu_mahou');
                            },
                            content:function(){
                                'step 0'
                                player.chooseControl('1回合','2回合','3回合').set('prompt','请选择施法时长').set('ai',function(){
                                    var player=_status.event.player;
                                    var safe=player.hp;
                                    if(safe<Math.min(3,game.countPlayer())){
                                        var next=player.next;
                                        while(next!=player&&get.attitude(next,player)>0){
                                            safe++;
                                            next=next.next;
                                        }
                                    }
                                    return Math.max(1,Math.min(safe,3,game.countPlayer()))-1;
                                });
                                'step 1'
                                if(!player.storage.txhj_zhouzu_mahou){
                                    player.storage.txhj_zhouzu_mahou=[result.index+1,result.index+1,target];
                                }
                                player.addTempSkill('txhj_zhouzu_mahou',{player:'die'});
                            },
                            ai:{
                                damage:true,
                                thunderAttack:true,
                                threaten:2.5,
                                order:7,
                                result:{
                                    target:function(player,target){
                                        var eff=get.damageEffect(target,player,target,'thunder');

                                        return eff;

                                    },
                                },
                            },
                            subSkill:{
                                mahou:{
                                    trigger:{global:'phaseEnd'},
                                    forced:true,
                                    popup:false,
                                    charlotte:true,
                                    content:function(){
                                        var list=player.storage.txhj_zhouzu_mahou;
                                        list[1]--;
                                        if(list[1]==0){
                                            game.log(player,'的“咒诅”魔法生效');
                                            player.logSkill('txhj_zhouzu');
                                            var num=list[0];
                                            var target=list[2];
                                            if(target&&target.isAlive()){
                                                player.line(target,'thunder');
                                                target.chooseToDiscard(num,true,'he');
                                                target.damage(1,'thunder');
                                            }
                                            player.removeSkill('txhj_zhouzu_mahou');
                                        }
                                        else{
                                            game.log(player,'的“咒诅”魔法剩余','#g'+(list[1])+'回合');
                                            player.markSkill('txhj_zhouzu_mahou');
                                        }
                                    },
                                    mark:true,
                                    onremove:true,
                                    marktext:'诅',
                                    intro:{
                                        name:'施法：咒诅',
                                        markcount:function(storage){
                                            if(storage) return storage[0]+'-'+storage[1];
                                            return 0;
                                        },
                                        content:function(storage){
                                            if(storage){
                                                return '经过'+storage[1]+'个回合结束时，施法目标:'+get.translation(storage[2])+'受到一点雷电伤害，弃置'+storage[0]+'张牌';
                                            }
                                            return '未指定施法效果';
                                        },
                                    },
                                },
                            },
                        },
                        //------鬼门------//
                        "txhj_guimen":{
                            trigger:{
                                player:'loseAfter'
                            },
                            forced:true,
                            filter:function(event,player){
                                if(event.type!='discard') return false;
                                if(event.cards2){
                                    for(var i=0;i<event.cards2.length;i++){
                                        if(get.suit(event.cards2[i],player)=='spade')return true;
                                    } 
                                }
                            },
                            content:function(){
                                'step 0'
                                event.list=[];
                                for(var i=0;i<trigger.cards2.length;i++){
                                    if(get.suit(trigger.cards2[i],player)=='spade')event.list.push(trigger.cards2[i]);
                                    game.log(player,'弃置了',get.translation(trigger.cards2[i]));
                                } 
                                event.count=event.list.length;
                                'step 1'
                                if(event.list.length){
                                    var card=event.list[0];
                                    game.log('即将对失去的',card,'进行判定');
                                    player.judge(function(result) {
                                        var a=Math.abs(get.number(card)-result.number);
                                        if (a<=1){
                                          if(player.storage.txhj_guimen==undefined) player.storage.txhj_guimen=0;
                                          player.markSkill('txhj_guimen');
                                          player.storage.txhj_guimen+=1;
                                          game.log('鬼门临时选择次数+1');
                                          player.syncStorage('txhj_guimen');                      return 1;
                                      }
                                      return -1;
                                  });
                                    event.count--;
                                    if(event.count>0){
                                        event.list.remove(event.list[0]);
                                        event.redo();
                                    }
                                }
                                'step 2'
                                if(player.storage.txhj_guimen>0){
                                    player.chooseTarget(true,'选择一个目标对其造成两点雷电伤害',function(card,player,target){
                                        return player!=target;
                                    }).ai=function(target){
                                        return get.damageEffect(target,player,player,'thunder');
                                    }

                                }else{
                                    event.finish();
                                }
                                'step 3'
                                if(result.targets.length){
                                    player.line(result.targets,'thunder');
                                    result.targets[0].damage(2,'thunder');
                                    player.storage.txhj_guimen--;
                                    player.syncStorage('txhj_guimen');
                                    event.goto(2);
                                }else{
                                    var x = player.storage.txhj_guimen;
                                    player.storage.txhj_guimen -= x;
                                    player.syncStorage('txhj_guimen');
                                    player.unmarkSkill('txhj_guimen');
                                    game.log('我佛慈悲');
                                    event.finish();

                                }

                            },
                            ai:{
                                effect:{
                                    target:function(card){
                                        if(get.tag(card,'loseCard')){
                                            return [0.5,1];
                                        }
                                    }
                                }
                            }
                        },
                        //------妖术------//
                        'txhj_yaoshu':{
                            mahouSkill:true,
                            enable:'phaseUse',
                            usable:1,
                            filter:function(event,player){
                                return game.hasPlayer(function(current){
                                    return current!=player&&!current.hasSkill('txhj_yaoshu_mahou');      
                                });
                            },
                            filterTarget:function(card,player,target){
                                return target!=player&&!target.hasSkill('txhj_yaoshu_mahou');
                            },
                            content:function(){
                                'step 0'
                                player.chooseControl('1回合','2回合','3回合').set('prompt','请选择施法时长').set('ai',function(){
                                    var player=_status.event.player;
                                    var safe=Math.min(player.getHandcardLimit(),player.countCards('h','shan'));
                                    if(safe<Math.min(3,game.countPlayer())){
                                        var next=player.next;
                                        while(next!=player&&get.attitude(next,player)>0){
                                            safe++;
                                            next=next.next;
                                        }
                                    }
                                    return Math.max(2,Math.min(safe,3,game.countPlayer()))-1;
                                });
                                'step 1'
                                if(!target.storage.txhj_yaoshu_mahou){
                                    target.storage.txhj_yaoshu_mahou=[result.index+1,result.index+1];
                                }
                                target.addTempSkill('txhj_yaoshu_mahou',{player:'die'});
                            },
                            ai:{
                                order:2,
                                result:{
                                    player:1,
                                    target:-0.5,
                                },
                            },
                            subSkill:{
                                mahou:{
                                    trigger:{global:'phaseEnd'},
                                    forced:true,
                                    popup:false,
                                    charlotte:true,
                                    content:function(){
                                        var list=player.storage.txhj_yaoshu_mahou;
                                        list[1]--;
                                        if(list[1]==0){
                                            game.log(player,'的“妖术”魔法生效');
                                            player.logSkill('txhj_yaoshu');
                                            var num=list[0];
                                            player.addSkill('txhj_yaoshu_effect');
                                            player.addMark('txhj_yaoshu_effect',num,false);
                                            player.removeSkill('txhj_yaoshu_mahou');
                                        }
                                        else{
                                            game.log(player,'的“妖术”魔法剩余','#g'+(list[1])+'回合');
                                            player.markSkill('txhj_yaoshu_mahou');
                                        }
                                    },
                                    mark:true,
                                    onremove:true,
                                    marktext:'妖',
                                    intro:{
                                        name:'施法：妖术',
                                        markcount:function(storage){
                                            if(storage) return storage[0]+'-'+storage[1];
                                            return 0;
                                        },
                                        content:function(storage){
                                            if(storage){
                                                return '经过'+storage[1]+'个回合结束后，获得'+storage[0]+'层“卡牌无效”的效果';
                                            }
                                            return '未指定施法效果';
                                        },
                                    },
                                },
                                effect:{
                                    charlotte:true,
                                    onremove:true,
                                    trigger:{player:['useCardToBefore','useCard']},
                                    forced:true,
                                    filter:function(event,player){
                                        return player.hasMark('txhj_yaoshu_effect');
                                    },
                                    content:function(){
                                        trigger.targets.length=0;
                                        trigger.all_excluded=true;
                                        game.log(trigger.card,'无效');
                                        player.removeMark('txhj_yaoshu_effect',1,false);
                                        if(!player.countMark('txhj_yaoshu_effect')) player.removeSkill('txhj_yaoshu_effect');
                                    },
                                    marktext:'妖︎',
                                    intro:{
                                        onremove:true,
                                        content:'接下来使用或打出的#张牌无效',
                                    },
                                },
                            },
                        },
                        //------咒法------//
                        'txhj_zhoufa':{
                            mahouSkill:true,
                            enable:'phaseUse',
                            usable:1,
                            filter:function(event,player){
                                return game.hasPlayer(function(current){
                                    return current!=player&&!current.hasSkill('txhj_zhoufa_mahou');      
                                });
                            },
                            filterTarget:function(card,player,target){
                                return target!=player&&!target.hasSkill('txhj_zhoufa_mahou');
                            },
                            content:function(){
                                'step 0'
                                player.chooseControl('1回合','2回合','3回合').set('prompt','请选择施法时长').set('ai',function(){
                                    var player=_status.event.player;
                                    var safe=1;
                                    if(safe<Math.min(3,game.countPlayer(),player.getDamagedHp())){
                                        var next=player.next;
                                        while(next!=player&&get.attitude(next,player)>0){
                                            safe++;
                                            next=next.next;
                                        }
                                    }
                                    return Math.max(1,Math.min(safe,3,game.countPlayer(),player.getDamagedHp()))-1;
                                });
                                'step 1'

                                if(!player.storage.txhj_zhoufa_mahou){
                                    player.storage.txhj_zhoufa_mahou=[result.index+1,result.index+1,target];
                                }
                                player.addTempSkill('txhj_zhoufa_mahou',{player:'die'});
                            },
                            ai:{
                                damage:true,
                                thunderAttack:true,
                                threaten:5.5,
                                order:8,
                                result:{
                                    target:function(player,target){
                                        var eff=get.damageEffect(target,player,target,'thunder');
                                        if(target.isLinked()){
                                            return eff/10;
                                        }
                                        else{
                                            return eff;
                                        }
                                    },
                                },
                            },
                            subSkill:{
                                mahou:{
                                    trigger:{global:'phaseEnd'},
                                    forced:true,
                                    popup:false,
                                    charlotte:true,
                                    content:function(){
                                        var list=player.storage.txhj_zhoufa_mahou;
                                        list[1]--;
                                        if(list[1]==0){
                                            game.log(player,'的“咒法”魔法生效');
                                            player.logSkill('txhj_zhoufa');
                                            var num=list[0];
                                            var
                                            target=list[2];
                                            if(target&&target.isAlive()){
                                                player.line(target,'thunder');
                                                target.damage(num,'thunder');
                                            }
                                            player.removeSkill('txhj_zhoufa_mahou');
                                        }
                                        else{
                                            game.log(player,'的“咒法”魔法剩余','#g'+(list[1])+'回合');
                                            player.markSkill('txhj_zhoufa_mahou');
                                        }
                                    },
                                    mark:true,
                                    onremove:true,
                                    marktext:'法',
                                    intro:{
                                        name:'施法：咒法',
                                        markcount:function(storage){
                                            if(storage) return storage[0]+'-'+storage[1];
                                            return 0;
                                        },
                                        content:function(storage){
                                            if(storage){
                                                return '经过'+storage[1]+'个回合结束时后，施法目标:'+get.translation(storage[2])+'受到'+storage[0]+'点雷电伤害';
                                            }
                                            return '未指定施法效果';
                                        },
                                    },
                                },
                            },
                        },
                        //------尸怨------//
                        "txhj_shiyuan":{
                            forced:true,
                            priority:1,
                            trigger:{
                                source:"damageBegin1"
                            },
                            group:["txhj_shiyuan_die","txhj_shiyuan_fuhuo"],
                            content:function(){
                                trigger.num++;
                            },
                            subSkill:{
                                die:{
                                    trigger:{
                                        player:"dying"
                                    },
                                    forced:true,
                                    priority:4,
                                    content:function(){
                                        player.die();
                                        game.log(player,'因【尸怨】直接死亡。');
                                    },
                                },
                                fuhuo:{
                                    trigger:{
                                        source:["dieAfter"],
                                    },
                                    priority:5,
                                    forced:true,
                                    filter:function(event,player){
                                        if(player.identity=='zhu'||event.player.identity=='zhu')return false;
                                        return event.player!=player;
                                    },
                                    content:function(){
                                        'step 0'
                                        var target=trigger.player;
                                        target.side=player.side;
                                        target.identity=player.identity;
                                        target.setIdentity(get.translation(player.identity));
                                        target.node.identity.dataset.color=player.identity;
                                        target.init('txhj_zhangyuanshibing');
                                        target.maxHp=3;
                                        target.revive(Infinity);
                                        target.draw(4);
                                        target.update();
                                    },
                                }, 
                            },
                        },
                        //------人望------//
                        "txhj_renwang":{
                            trigger:{
                                player:"loseAfter",
                                global:"cardsDiscardAfter",
                            },
                            forced:true,
                            marktext:"方",
                            intro:{
                                content:"expansion",
                                markcount:"expansion",
                            },
                            mod:{
                                maxHandcard:function (player,num){
                                    if(player.getExpansions('txhj_renwang')){
                                        return num+player.getExpansions('txhj_renwang').length;
                                    }else{
                                        return num;
                                    }
                                },          
                                cardUsable:function(card,player,num){
                                    if(card.name=='sha'){
                                        if(player.getExpansions('txhj_renwang')){       
                                            return num+Math.ceil(player.getExpansions('txhj_renwang').length/5);
                                        }else{
                                            return num;
                                        }       
                                    }
                                },
                            },
                            filter:function(event,player){
                                if(event.type=='discard') return false;
                                var evt=event.getParent();
                                if(evt.name!='orderingDiscard'||!evt.relatedEvent||evt.relatedEvent.player!=player||!['useCard','respond'].contains(evt.relatedEvent.name)) return false;
                                return (event.cards2||event.cards).filterInD('d').length>0;
                            },
                            content:function(){
                                var card=trigger.cards[0];
                                player.addToExpansion(card,'gain2').gaintag.add('txhj_renwang');
                            },
                        },
                        //------人方------//
                        "txhj_renfang":{
                            audio:2,
                            mahouSkill:true,
                            enable:'phaseUse',
                            usable:1,
                            filter:function(event,player){
                                return !player.hasSkill('txhj_renfang_mahou')&&player.getExpansions('txhj_renwang').length>=36;
                            },
                            prompt:"是否移去36张“方”，并施法？",
                            content:function(){
                                'step 0'
                                var list=player.getExpansions('txhj_renwang');
                                player.loseToDiscardpile(list.slice(0,36));
                                player.chooseControl('1回合','2回合','3回合').set('prompt','请选择施法时长').set('ai',function(){
                                    var player=_status.event.player;
                                    var safe=1;
                                    if(safe<Math.min(3,game.countPlayer(),player.getDamagedHp())){
                                        var next=player.next;
                                        while(next!=player&&get.attitude(next,player)>0){
                                            safe++;
                                            next=next.next;
                                        }
                                    }
                                    return Math.max(1,Math.min(safe,3,game.countPlayer(),player.getDamagedHp()))-1;
                                });
                                'step 1'
                                player.storage.txhj_renfang_mahou=[result.index+1,result.index+1];
                                player.addTempSkill('txhj_renfang_mahou',{player:'die'});
                            },
                            ai:{
                                order:9,
                                result:{
                                    player:1,
                                },
                            },
                            subSkill:{
                                mahou:{
                                    trigger:{global:'phaseEnd'},
                                    priority:2,
                                    forced:true,
                                    popup:false,
                                    charlotte:true,
                                    content:function(){
                                        "step 0"
                                        var list=player.storage.txhj_renfang_mahou;
                                        list[1]--;
                                        if(list[1]==0){
                                            game.log(player,'的“人方”魔法生效');
                                            player.logSkill('txhj_renfang');
                                            player.markSkill('txhj_renfang_mahou');
                                            event.count=list[0];
                                            event.goto(1);                  
                                        }
                                        else{
                                            game.log(player,'的“人方”魔法剩余','#g'+(list[1])+'回合');
                                            player.markSkill('txhj_renfang_mahou');
                                            event.finish();
                                        }
                                        "step 1"
                                        event.count--;              
                                        player.chooseTarget(true,'选择一个目标对其造成36点雷电伤害',function(card,player,target){
                                            return player!=target&&!target.hasSkill('txhj_renfang_miss');
                                        }).ai=function(target){
                                            return get.damageEffect(target,player,player,'thunder');
                                        }       
                                        "step 2"
                                        if(result.targets.length){
                                            player.line(result.targets,'thunder');
                                            result.targets[0].damage(36,'thunder');
                                            result.targets[0].addTempSkill('txhj_renfang_miss');
                                            if(event.count>0){
                                                event.goto(1);
                                            }else{
                                                player.removeSkill('txhj_renfang_mahou');
                                                event.finish();
                                            }
                                        }else{
                                            player.removeSkill('txhj_renfang_mahou');
                                            event.finish();
                                        }
                                    },
                                    mark:true,
                                    onremove:true,
                                    marktext:'⚡️',
                                    intro:{
                                        name:'施法：人方',
                                        markcount:function(storage){
                                            if(storage) return storage[0]+'-'+storage[1];
                                            return 0;
                                        },
                                        content:function(storage){
                                            if(storage){
                                                return '经过'+storage[1]+'个“回合结束时”后，依次选择'+storage[0]+'名其他角色，对其各造成36点雷电伤害';
                                            }
                                            return '未指定施法效果';
                                        },
                                    },
                                },
                                miss:{
                                    forced:true,
                                },
                            },
                        },
                        //------地咒------//
                        "txhj_dizhou":{
                            trigger:{
                                player:['phaseBegin','phaseEnd']
                            },
                            filter:function(event,player){
                                return player.countCards('he')>0;
                            },
                            frequent:true,
                            content:function(){
                                'step 0'
                                player.chooseCard('he',get.prompt('txhj_dizhou'),'将一张牌作为“地咒”置于武将牌上').set('ai',function(card){
                                    if(player.getExpansions('txhj_dizhou')){
                                        var suit=get.suit(card);
                                        for(var i of player.getExpansions('txhj_dizhou')){
                                            if(get.suit(i,false)==suit) return 4-get.value(card);
                                        }
                                    }
                                    return 5.5-get.value(card);
                                });
                                'step 1'
                                if(result.bool){
                                    var card=result.cards[0];
                                    player.addToExpansion(card,'gain2').gaintag.add('txhj_dizhou');
                                }
                                else event.finish();
                                'step 2'
                                game.delayx();

                            },
                            intro:{
                                content:"expansion",
                                markcount:"expansion",
                            },
                            onremove:function(player,skill){
                                var cards=player.getExpansions(skill);
                                if(cards.length) player.loseToDiscardpile(cards);
                            },
                            group:['txhj_dizhou_use','txhj_dizhou_clear'],
                            subSkill:{
                                use:{
                                    trigger:{global:['useCardToBefore']},
                                    forced:true,
                                    locked:false,
                                    filter:function(event,player){
                                        if(event.player==player||event.player.isFriendsOf(player))return false;
                                        var cards=player.getExpansions('txhj_dizhou');
                                        if(!player.getExpansions('txhj_dizhou')||!cards.length) return false;
                                        var suit=get.suit(event.card,false);

                                        if(suit=='none') return false;
                                        for(var i of player.getExpansions('txhj_dizhou')){
                                            if(get.suit(i,false)==suit) return true;
                                        }
                                        return false;
                                    },
                                    content:function(){
                                        'step 0'
                                        game.log('地咒:即将对',trigger.player,'使用的',trigger.card,'进行判定');
                                        trigger.player.judge(function(card){
                                            if(get.color(card)=='black')return 1;
                                            return -1;                  
                                        });
                                        'step 1'
                                        if(get.color(result.card)=='black'){
                                            if(trigger.player&&trigger.player.isIn()&&!trigger._notrigger.contains(trigger.player)){
                                                trigger.player.randomDiscard(true);
                                            }   
                                        }
                                        if(get.suit(result.card)=='spade'){
                                            trigger.targets.length = 0;
                                            trigger.all_excluded = true;
                                            trigger.cancel();
                                            game.log(trigger.card,'无效');
                                        }
                                        if(get.number(result.card)>1&&get.number(result.card)<10&&get.suit(result.card)=='spade'){
                                            trigger.player.loseHp(1,true);
                                        }   

                                    },
                                },
                                clear:{
                                    trigger:{
                                        player:'damageEnd'
                                    },
                                    forced:true,
                                    filter:function(event,player){  
                                        if(!player.getExpansions('txhj_dizhou').length) return false;
                                        return true;
                                    },
                                    content:function(){
                                        var cards=player.getExpansions('txhj_dizhou').randomGet();
                                        player.loseToDiscardpile(cards);
                                    },
                                },
                            },
                        },
                        //------地遁------//
                        "txhj_didun":{
                            trigger:{global:'judge'},
                            filter:function(event,player){
                                return player.countCards('hes',{color:'black'})>0;
                            },
                            direct:true,
                            content:function(){
                                "step 0"
                                player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
                                get.translation(trigger.player.judging[0])+'，'+get.prompt('txhj_didun'),'hes',function(card){
                                    if(get.color(card)!='black') return false;
                                    var player=_status.event.player;
                                    var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
                                    if(mod2!='unchanged') return mod2;
                                    var mod=game.checkMod(card,player,'unchanged','cardRespondable',player);
                                    if(mod!='unchanged') return mod;
                                    return true;
                                }).set('ai',function(card){
                                    var trigger=_status.event.getTrigger();
                                    var player=_status.event.player;
                                    var judging=_status.event.judging;
                                    var result=trigger.judge(card)-trigger.judge(judging);
                                    var attitude=get.attitude(player,trigger.player);
                                    if(attitude==0||result==0){
                                        if(trigger.player!=player) return 0;
                                        if(game.hasPlayer(function(current){
                                            return get.attitude(player,current)<0;
                                        })){
                                            var checkx=lib.skill.xinleiji.judgeCheck(card,true)-lib.skill.xinleiji.judgeCheck(judging);
                                            if(checkx>0) return checkx;
                                        }
                                        return 0;
                                    };
                                    if(attitude>0){
                                        return result;
                                    }
                                    else{
                                        return -result;
                                    }
                                }).set('judging',trigger.player.judging[0]);
                                "step 1"
                                if(result.bool){
                                    player.respond(result.cards,'highlight','txhj_didun','noOrdering');
                                }
                                else{
                                    event.finish();
                                }
                                "step 2"
                                if(result.bool){
                                    var card=trigger.player.judging[0];
                                    player.$gain2(card);
                                    player.gain(card);
                                    if(get.color(card)=='black') player.draw();
                                    trigger.player.judging[0]=result.cards[0];
                                    trigger.orderingCards.addArray(result.cards);
                                    game.log(trigger.player,'的判定牌改为',result.cards[0]);
                                }
                                "step 3"
                                game.delay(2);
                            },
                            ai:{
                                rejudge:true,
                                tag:{
                                    rejudge:1
                                }
                            }
                        },
                        //------亡怨------//
                        "txhj_wangyuan":{
                            trigger:{global:'dieAfter'},
                            forced:true,
                            group:["txhj_wangyuan_add"],
                            init: function(player, skill) {
                                player.storage.txhj_wangyuan = 0;
                                player.syncStorage('txhj_wangyuan');
                                player.markSkill('txhj_wangyuan');
                            },
                            marktext: "亡怨",
                            intro: {
                                name: "亡怨",
                                content: "本局游戏，你造成的属性伤害基数+#",
                            },
                            content:function(){
                                player.gainMaxHp();
                                player.recover();
                                player.storage.txhj_wangyuan++;
                                player.syncStorage('txhj_wangyuan');
                                player.markSkill('txhj_wangyuan');
                            },
                            ai:{
                                threaten:1.5
                            },
                            subSkill:{
                                add:{
                                    forced:true,
                                    priority:4,
                                    trigger:{
                                        source:"damageBegin1",
                                    },
                                    filter:function(event,player){
                                        if(!event.nature)return false;
                                        return event.notLink()&&player.storage.txhj_wangyuan>0; 
                                    },
                                    content:function(){
                                        var n=player.storage.txhj_wangyuan;
                                        trigger.num+=n;
                                        if(trigger.card){
                                            game.log('亡怨:',trigger.card,'的属性伤害基数+'+n);
                                        }else{
                                            game.log('亡怨:属性伤害基数+'+n);
                                        }
                                    },
                                },
                            },
                        },
                        //------注魂------//
                        "txhj_zhuhun": {
                            enable: "phaseUse",
                            group:["txhj_zhuhun_die"],
                            usable: 1,
                            filter: function (event, player) {
                                if (!player.storage.txhj_zhuhun_die) player.storage.txhj_zhuhun_die = [];
                                return  player.storage.txhj_zhuhun_die.length>0;
                            },
                            content: function () {
                                "step 0"
                                var list = player.storage.txhj_zhuhun_die;
                                player.chooseButton(ui.create.dialog('选择一名已阵亡的同阵营角色令其复活为【长怨尸兵】',list,), function (button) {
                                    return ai.get.attitude(_status.event.player);
                                });
                                "step 1"
                                if (result.bool) {  
                                    var target = result.buttons[0].link;

                                    target.init('txhj_zhangyuanshibing');
                                    target.maxHp = 3;
                                    target.revive(Infinity);
                                    target.draw(4);
                                    target.update();
                                    player.storage.txhj_zhuhun_die.remove(result.buttons[0].link);
                                    player.markSkill('txhj_zhuhun_die');       
                                }
                            },
                            subSkill: {
                                die: {
                                    trigger: {
                                        global: "die",
                                    },
                                    priority: -15,
                                    forced:true,
                                    marktext: "注魂",
                                    direct: true,
                                    filter: function (event, player) {

                                        return event.player.side == player.side;
                                    },
                                    content: function () {
                                        'step 0'
                                        if (!player.storage.txhj_zhuhun_die) player.storage.txhj_zhuhun_die = [];
                                        'step 1'
                                        player.storage.txhj_zhuhun_die.push(trigger.player);
                                        player.markSkill('txhj_zhuhun_die'); 
                                    },
                                    intro: {
                                        name: "已阵亡的同阵营角色",
                                        content: "player",
                                    },
                                    sub: true,
                                },
                            },
                            ai:{
                                order:9,
                                result:{
                                    player:1,
                                },
                                threaten:2.5,
                            },
                        },
                        //------咒雷------//
                        "txhj_zhoulei":{
                            trigger:{global:'drawAfter'},
                            forced:true,
                            logTarget:'player',
                            filter:function(event,player){
                                if(event.player==player)return false;
                                var a=event.player.countCards('h');
                                if(!player.countMark('txhj_zhoulei')){
                                    var b=0;
                                }else{
                                    var b=player.countMark('txhj_zhoulei');
                                }
                                var c=5-b;
                                return Math.abs(a-b)>=c;
                            },
                            content:function(){
                                player.line(trigger.player,'thunder');
                                trigger.player.damage(1,'thunder');
                                if(player.countMark('txhj_zhoulei')<5){ 
                                    player.addMark('txhj_zhoulei',1,false);
                                    game.log(player,'的【咒雷】已发动次数+1');
                                }

                            },
                            intro:{
                                name:"咒雷",          
                                content:function(storage,player){
                                    if(!player.countMark('txhj_zhoulei')){
                                        var num=0;
                                    }else{
                                        var num=player.countMark("txhj_zhoulei");
                                    }
                                    var c=5-num;
                                    var str='当一名其他角色摸牌后，若其与你的手牌数之差>='+'<b>'+c+'</b>'+'，你对其造成1点雷电伤害。';
                                    return str;
                                },
                            },
                            mark:true,
                            marktext:'咒雷',
                        },
                        //------诡炎------//
                        "txhj_guiyan": {
                            trigger: {
                                player: "phaseZhunbeiBegin",
                            },
                            direct: true,
                            priority:2,
                            forced:true,
                            filter: function (event, player, target) {
                                return game.hasPlayer(function (target) {
                                    return  target.hp>=player.hp&&target!=player;
                                });
                            },
                            content: function () {
                                "step 0"
                                player.chooseTarget(get.prompt('txhj_guiyan'),true, function (card, player, target) {
                                    return target.hp>=player.hp&&target!=player;
                                }).ai = function (target) {
                                    var att = get.attitude(player, target);

                                    return -att;
                                };
                                "step 1"
                                if (result.bool) {
                                    var target=result.targets[0];
                                    player.logSkill('txhj_guiyan', result.targets);
                                    player.line(target,'fire');
                                    player.addTempSkill('txhj_guiyan_yan');

                                    player.storage.txhj_guiyan_yan=[];
                                    player.storage.txhj_guiyan_yan.push(target);
                                    player.markSkill('txhj_guiyan_yan');
                                    target.addTempSkill('txhj_guiyan_huo');
                                    if(!target.hasSkill('ranshang')){
                                        target.addSkill('ranshang');
                                    }else{
                                        if(player.canUse('huogong',target)){
                                            player.useCard({name:'huogong',isCard:true},target); 
                                            game.log('【诡炎】:',player,'即将对',target,'使用【火攻】');
                                        }else{
                                            event.finish(); 
                                        }

                                    }
                                }
                            },
                            ai: {
                                threaten: 1.7,
                            },
                            subSkill:{
                                yan:{
                                    mark:true,
                                    marktext:'诡炎',
                                    onremove: function(player, skill) {

                                        player.storage.txhj_guiyan_yan=[];
                                        player.unmarkSkill('txhj_guiyan_yan');
                                    },
                                    intro:{
                                        name:'诡炎：标记目标',
                                        markcount:function(storage){
                                            if(storage) return get.translation(storage[0]);
                                            return 0;
                                        },
                                        content:function(storage){
                                            if(storage){
                                                return '本回合对'+get.translation(storage[0])+'造成的伤害均视为火属性，且伤害+1';
                                            }
                                            return '无效果';
                                        },
                                    },
                                    forced:true,
                                    priority:30,
                                    trigger:{
                                        source:"damageBegin1",
                                    },
                                    filter:function(event,player){
                                        if(event.player==player)return false;
                                        return event.player&&event.player.hasSkill('txhj_guiyan_huo');
                                    },
                                    content:function(){
                                        player.line(trigger.player,'fire'); 
                                        trigger.nature='fire';
                                        trigger.num++;  
                                    },
                                },
                                huo:{
                                    forced:true,
                                },
                            },
                        },
                        //------邪风------//
                        "txhj_xiefeng":{
                            trigger:{player:'phaseAfter'},
                            direct:true,
                            filter:function(event,player){
                                return player.countCards('he')>0;
                            },
                            content:function(){
                                'step 0'
                                var prompt2='弃置至多三张牌并摸一张牌';
                                var next=player.chooseToDiscard('he',[1,3],get.prompt('txhj_xiefeng'),prompt2);
                                next.set('ai',function(card){
                                    return 6-get.value(card);
                                })
                                next.logSkill='txhj_xiefeng';
                                'step 1'
                                if(result.bool){
                                    var cards=result.cards;
                                    player.draw(1,true);
                                    player.addTempSkill('txhj_xiefeng_miss',{player:'die'});
                                    player.addTempSkill('txhj_xiefeng_mianshang',{player:'die'});
                                    if(player.storage.txhj_xiefeng_miss==undefined){
                                        player.storage.txhj_xiefeng_miss=0;
                                    }
                                    player.storage.txhj_xiefeng_miss+=cards.length;
                                    player.syncStorage('txhj_xiefeng_miss');
                                    player.markSkill('txhj_xiefeng_miss');
                                }
                            },
                            subSkill:{
                                miss:{
                                    trigger:{global:'phaseEnd'},
                                    forced:true,
                                    popup:false,
                                    charlotte:true,
                                    content:function(){
                                        player.storage.txhj_xiefeng_miss--;
                                        player.syncStorage('txhj_xiefeng_miss');
                                        player.markSkill('txhj_xiefeng_miss');  
                                        if(player.storage.txhj_xiefeng_miss==0){
                                            game.log(player,'的【邪风】免伤效果失效');
                                            player.logSkill('txhj_xiefeng');

                                            player.unmarkSkill('txhj_xiefeng_miss');
                                            player.removeSkill('txhj_xiefeng_miss');
                                            player.removeSkill('txhj_xiefeng_mianshang');
                                        }
                                        else{
                                            var a=player.storage.txhj_xiefeng_miss;
                                            game.log(player,'的【邪风】免伤效果剩余','#g'+a+'回合');
                                            player.markSkill('txhj_xiefeng_miss');
                                        }
                                    },
                                    mark:true,
                                    onremove:true,
                                    marktext: "邪风",
                                    intro: {
                                        name: "邪风",
                                        content: "接下来的#个回合，防止你受到的非雷电伤害。",
                                    },
                                },
                                mianshang:{
                                    trigger:{player:'damageBegin4'},
                                    filter:function(event){
                                        if(event.nature!='thunder') return true;
                                        return false;
                                    },
                                    mark:true,
                                    forced:true,
                                    content:function(){
                                        trigger.cancel();
                                    },
                                    ai:{
                                        nofire:true,
                                        nodamage:true,
                                        effect:{
                                            target:function(card,player,target,current){
                                                if(get.tag(card,'damage')&&!get.tag(card,'thunderDamage')) return [0,0];
                                            }
                                        },
                                    },
                                },
                            },
                        },
                        //侍灵
                        // 金鸡独立
                        datongSkill1: {
                            trigger: {player: 'dying'},
                            forced: true,
                            charlotte: true,
                            init: function (player) {
                                player.datongSkill1 = false;
                            },
                            filter: function (event, player) {
                                return !player.datongSkill1;
                            },
                            content: function () {
                                var num = 1 - player.hp;
                                if (num) player.recover(num);
                                player.datongSkill1 = true;
                                // game.log(player, '触发了【金鸡独立】');
                                if (player.buff) {
                                    player.buff['datongSkill1'].update();
                                }
    
                            }
                        },
                        //祥云瑞气
        "txhj_ruiSkill1":{
        trigger:{
            player:"phaseUseEnd",
        },
        forced:true,
        filter:function (event,player,target){     
                            
                           return game.hasPlayer(function(target){
                            return target.isEnemiesOf(player)&&target.countCards('h')<player.countCards('h');
                        });
     
           }, 
        content:function(){
            "step 0"
                        var players=game.filterPlayer(function(current){
                    return current.countCards('h')<=player.countCards('h')&&current.isEnemiesOf(player);    
                        });
                        players.remove(player);
                        event.players=players;
                        player.line(players,'green');
                        "step 1"
                        if(event.players.length){
                            var current=event.players.shift();
                                 current.damage(1,'fire');
                        if (player.buff) {
                                    player.buff['txhj_ruiSkill1'].update();
                                }   
                            event.redo();
                        }
        },
        ai:{
            threaten:3.7,
        },
    },
                        // 神妙
                        "txhj_ruiSkill2":{
                            trigger: {
                                player: ['phaseBegin', 'phaseEnd']
                            },
                            filter: function (event, player) {
                                return player.countCards('h') > 0;
                            },
                            forced: true,
                            charlotte: true,
                            content: function () {
                                "step 0"
                                event.numm = player.countCards('h') % 2;
                                event.list1=player.getEnemies().sortBySeat();
                                event.list2=player.getFriends().sortBySeat();
                                "step 1"
    
                                if (event.numm == 1&&event.list2.length){
                                    var target=event.list2.randomGet(1);
                                    game.log('神妙·奇:随机令一名我方角色摸一张牌');
                                    player.line(target,'green');
                                    target.draw();
                                }else if (event.list1.length){
                                    var target=event.list1.randomGet(1);
                                    game.log('神妙·偶:随机令一名敌方角色随机弃置一张牌');
                                    player.line(target,'green');
                                    target.discard(target.getCards('he').randomGet());
                                }
                                if (player.buff) {
                                    player.buff['txhj_ruiSkill2'].update();
                                }
                            },
                        },
                        //洞若观火
                        "txhj_ruiSkill3": {
                            trigger: {target: 'useCardToTargeted'},
                            filter: function (event, player) {
                                return get.type(event.card) == 'trick' && event.player != player;
                            },
                            forced: true,
                            charlotte: true,
                            content: function () {
                                "step 0"
                                player.judge(function (result) {
                                    if (get.color(result) == 'red') return 2;
                                    return -1;
                                }).judge2 = function (result) {
                                    return result.bool;
                                };
                                "step 1"
                                if (result.bool) {
                                   
      trigger.getParent().excluded.add(player);      player.gain(trigger.parent.cards, "gain2");
                                    if (player.buff) {
                                        player.buff['txhj_ruiSkill3'].update();
                                    }
                                }
                            }
                        },
                        // 神鬼不测
                        "txhj_yanSkill1": {
                            trigger: {target: 'useCardToTargeted'},
                            forced: true,
                            charlotte: true,
                            filter: function (event, player) {
                                return get.type(event.card) == 'trick' && event.player != player && event.targets.length == 1;
                            },
                            content: function () {
                                "step 0"
                                player.judge(function (result) {
                                    if (get.color(result) == 'black') return 2;
                                    return -1;
                                }).judge2 = function (result) {
                                    return result.bool;
                                };
                                "step 1"
                                if (result.bool) {
                                    trigger.targets.remove(player);
                                    trigger.getParent().triggeredTargets2.remove(player);
                                    trigger.untrigger();
                                    if (trigger.parent.card.name == "jiedao" && trigger.player.getEquip(1) == null) {
                                        event.finish();
                                    }
                                    player.useCard(trigger.parent.card, trigger.player);
                                    // game.log(player, '触发了【神鬼不测】');
                                    if (player.buff) {
                                        player.buff['txhj_yanSkill1'].update();
                                    }
                                }
                            }
                        },
                        "txhj_yanSkill2": {
                            trigger: {player: 'damageEnd'},
                            usable: 1,
                            forced: true,
                            charlotte: true,
                            filter: function (event, player) {
                                return event.source && event.source != player && event.source.isAlive();
                            },
                            content: function () {
                                player.useCard({name: 'sha'}, trigger.source, false);
                                // game.log(player, '触发了【反计】');
                                if (player.buff) {
                                    player.buff['txhj_yanSkill2'].update();
                                }
                            },
                            group: ['txhj_yanSkill2_recover'],
                            subSkill: {
                                recover: {
                                    trigger: {source: 'damageAfter'},
                                    forced: true,
                                    popup: false,
                                    charlotte: true,
                                    filter: function (event) {
                                        return event.parent.parent.parent.name == 'txhj_yanSkill2';
                                    },
                                    content: function () {
                                        player.recover();
                                        // game.log(player, '触发了【反计】');
                                        if (player.buff) {
                                            player.buff['txhj_yanSkill2'].update();
                                        }
                                    }
                                }
                            }
                        },
                        "txhj_yanSkill3": {
                            trigger: {source: 'damageEnd'},
                            usable: 1,
                            forced: true,
                            charlotte: true,
                            content: function () {
                                "step 0"
                                player.judge();
                                "step 1"
                                if (result.color == 'red') {
                                    player.draw(2);
                                } else if (result.color == 'black') {
                                    player.gainPlayerCard(trigger.player, 'he', true);
                                }
                                // game.log(player, '触发了【天外之火】');
                                if (player.buff) {
                                    player.buff['txhj_yanSkill3'].update();
                                }
                            }
                        },
                      
                        // 神勇
                        "txhj_aHaoSkill2":{
                            trigger: {
                                player: 'loseAfter',
                                global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter']
                            },
                            forced: true,
                            charlotte: true,
                            filter: function (event, player) {
                                var evt = event.getl(player);
                                return evt && evt.player == player && evt.es && evt.es.length > 0;
                            },
                            content: function () {
                                "step 0"
                                event.list=player.getEnemies().sortBySeat();
                                "step 1"
                                if(event.list.length){
                                    var target=event.list.shift();
                                    player.line(target,'green');
                                    target.damage();
                                    event.redo();
                                    if (player.buff) {
                                        player.buff['txhj_aHaoSkill2'].update();
                                    }
                                }
                            },
                        },
                        // 攫戾執猛
                        "txhj_aHaoSkill3": {
                            trigger: {
                                player: 'phaseDrawBegin2'
                            },
                            forced: true,
                            charlotte: true,
                            filter: function (event, player) {
                                return !event.numFixed;
                            },
                            content: function () {
                                trigger.num += player.countCards('e');
                                if (player.buff) {
                                    player.buff['txhj_aHaoSkill3'].update();
                                }
                            },
                            mod: {
                                cardUsable: function (card, player, num) {
                                    if (card.name == 'sha') {
                                        return num + player.countCards('e');
                                    }
                                },
                                maxHandcardBase: function (player, num) {
                                    return num + player.countCards('e');
                                }
                            }
                        },
                        "txhj_luluSkill1": {
                            trigger: {
                                player: 'phaseUseBegin'
                            },
                            forced: true,
                            charlotte: true,
                            content: function () {
                                player.draw(2);
                                // game.log(player, '触发了【如虎添翼】');
                                if (player.buff) {
                                    player.buff['txhj_luluSkill1'].update();
                                }
                            }
                        },
                        "txhj_luluSkill2": {
                            trigger: {
                                player: 'useCardToPlayered'
                            },
                            forced: true,
                            charlotte: true,
                            filter: function (event, player) {
                                if (event.card.name != 'sha') return false;
                                var hp = player.hp;
                                var he = player.getCards('h');
                                var list = [];
                                player.getHistory('gain', function (evt) {
                                    if (evt && evt.cards) {
                                        for (var i = 0; i < evt.cards.length; i++) {
                                            if (he.contains(evt.cards[i])) list.add(evt.cards[i]);
                                        }
                                    }
                                });
                                return list.length >= hp && player.countUsed('sha', true) <= 1;
                            },
                            content: function () {
                                var target = trigger.target;
                                trigger.directHit.add(target);
                                var id = target.playerid;
                                var map = trigger.customArgs;
                                if (!map[id]) map[id] = {};
                                if (!map[id].extraDamage) map[id].extraDamage = 0;
                                map[id].extraDamage++;
                                
                                if (player.buff) {
                                    player.buff['txhj_luluSkill2'].update();
                                }
                            }
                        },
                        // 乐不可支
                        "txhj_aleSkill1": {
                            trigger: {
                                target: "useCardToTargeted"
                            },
                            direct: true,
                            charlotte: true,
                            usable: 1,
                            filter: function (event, player) {
                                return event.target == player && get.type(event.card) == 'basic';
                            },
                            content: function () {
                                player.getHistory('custom').push({aleSkill1: true, e: trigger.getParent()});
    
                                if (player.buff) {
                                    player.buff['txhj_aleSkill1'].update();
                                }
                            },
                            group: ['txhj_aleSkill1_after'],
                            subSkill: {
                                after: {
                                    trigger: {
                                        global: ['useCardAfter']
                                    },
                                    direct: true,
                                    charlotte: true,
                                    usable: 1,
                                    filter: function (event, player) {
                                        var damage = player.getHistory('damage', function (evt) {
                                            return event.card && evt.card == event.card;
                                        }).length;
                                        var s = player.getHistory('custom', function (evt) {
                                            return evt.aleSkill1 && evt.e == event;
                                        }).length;
                                        return !damage && s;
                                    },
                                    content: function () {
                                        player.draw();
                                        player.logSkill('txhj_aleSkill1');
    
                                        if (player.buff) {
                                            player.buff['txhj_aleSkill1'].update();
                                        }
                                    }
                                }
                            }
                        },
                        // 饞嘴王
                        "txhj_aleSkill2": {
                            trigger: {player: 'phaseZhunbeiBegin'},
                            direct: true,
                            charlotte: true,
                            filter: function (event, player) {
                                return player.isDamaged() && !player.isMaxHp();
                            },
                            content: function () {
                                player.recover();
                                
                                if (player.buff) {
                                    player.buff['txhj_aleSkill2'].update();
                                }
                            }
                        },
                        // 花容月貌
                        "txhj_yueerSkill1": {
                            trigger: {global: 'damageEnd'},
                            direct: true,
                            charlotte: true,
                            filter: function (event, player) {
                                return event.player.hasSex('male') && player.storage.yueerSkill1;
                            },
                            content: function () {
                                player.recover();
                                player.draw();
                                player.storage.yueerSkill1 = false;
                                
                                if (player.buff) {
                                    player.buff['txhj_yueerSkill1'].update();
                                }
                            },
                            group: ['yueerSkillOver']
                        },
                        yueerSkillOver: {
                            trigger: {global: ['roundStart']},
                            forced: true,
                            charlotte: true,
                            filter: function (event, player) {
                                return !player.storage.yueerSkill1;
                            },
                            content: function () {
                                player.storage.yueerSkill1 = true;
                            }
                        },
                        // 娇面
                        "txhj_yueerSkill2": {
                            trigger: {player: 'phaseDiscardEnd'},
                            forced: true,
                            charlotte: true,
                            content: function () {
                                player.draw(2);
                                // game.log(player, '触发了【娇面】');
                                if (player.buff) {
                                    player.buff['txhj_yueerSkill2'].update();
                                }
                            }
                        },
                        // 墨玉点雪
                        "txhj_liuliSkill1": {
                            usable: 1,
                            trigger: {
                                player: 'loseEnd'
                            },
                            forced: true,
                            charlotte: true,
                            filter: function (event, player) {
                                return _status.currentPhase && player != _status.currentPhase;
                            },
                            content: function () {
                                _status.currentPhase.damage();
                                // game.log(player, '触发了【墨玉点雪】');
                                if (player.buff) {
                                    player.buff['txhj_liuliSkill1'].update();
                                }
                            }
                        },
                        "txhj_liuliSkill2": {
                            usable: 1,
                            trigger: {global: 'phaseDiscardEnd'},
                            forced: true,
                            charlotte: true,
                            filter: function (event, player) {
                                return event.player != player && event.player.getHistory('lose', function (evt) {
                                    if (evt.type == 'discard' && evt.getParent('phaseDiscard') == event) return true;
                                }).length > 0;
                            },
                            content: function () {
                                var card = get.discardPile(function (i) {
                                    return i;
                                });
                                if (card) player.gain(card, 'gain2');
                                // game.log(player, '触发了【伶俐】');
                                if (player.buff) {
                                    player.buff['txhj_liuliSkill2'].update();
                                }
                            }
                        },
                        "txhj_manmanSkill1": {
                            trigger: {player: 'phaseBegin'},
                            forced: true,
                            charlotte: true,
                            content: function () {
                                player.chooseUseTarget({name: 'nanman', isCard: true}, "弄鬼掉猴:回合开始时，你视为使用一张【南蛮入侵】");
                                // game.log(player, '触发了【弄鬼掉猴】');
                                if (player.buff) {
                                    player.buff['txhj_manmanSkill1'].update();
                                }
                            },
                            group: ['txhj_manmanSkill1_damage'],
                            subSkill: {
                                damage: {
                                    trigger: {global: 'damageAfter'},
                                    forced: true,
                                    charlotte: true,
                                    filter: function (event, player) {
                                        return event.card && event.card.name == "nanman" && player.getHistory('sourceDamage', function (evt) {
                                            return evt.card == event.card;
                                        }).length > 0;
                                    },
                                    content: function () {
                                        player.draw(trigger.num);
                                        // game.log(player, '触发了【弄鬼掉猴】');
                                        if (player.buff) {
                                            player.buff['txhj_manmanSkill1'].update();
                                        }
                                    }
                                }
                            }
                        },
                        "txhj_manmanSkill2": {
                            trigger: {source: 'damageAfter'},
                            usable: 1,
                            forced: true,
                            charlotte: true,
                            filter: function (event, player) {
                                return event.player.isAlive() && event.player.countCards("he") > 0;
                            },
                            content: function () {
                                player.gainPlayerCard(trigger.player, 'he', true);
                                // game.log(player, '触发了【捣蛋】');
                                if (player.buff) {
                                    player.buff['txhj_manmanSkill2'].update();
                                }
                            }
                        },
                        //矢无虚发
                        "txhj_xiaoxiaoSkill1": {
                            trigger: {
                                target: "useCardToTargeted",
                            },
                            usable: 1,
                            charlotte: true,
                            filter: function (event, player) {
                                return get.type(card, 'trick') == 'trick' && event.player != player && event.targets && event.targets.length && game.countPlayer2(function (current) {
                                    return current.getHistory('damage').length > 0;
                                }) == 0;
                            },
                            prompt: "是否发动【矢无虚发】，回血或摸牌？",
                            content: function () {
    
                                if (player.hp < player.maxHp) {
                                    player.recover();
                                    game.log(player, '发动【矢无虚发】回复了一点体力');
                                } else {
                                    player.draw();
                                    game.log(player, '未受伤。摸了一张牌');
                                }
                                // game.log(player, '触发了【矢无虚发】');
                                if (player.buff) {
                                    player.buff['txhj_xiaoxiaoSkill1'].update();
                                }
                            },
                        },
                        //弓上弦
                        "txhj_xiaoxiaoSkill2": {
                            trigger: {player: 'phaseJieshuBegin'},
                            forced: true,
                            unique: true,
                            charlotte: true,
                            filter: function (event, player) {
                                return game.hasPlayer(function (current) {
                                    return current != player && current.countCards('h');
                                });
                            },
                            content: function () {
                                "step 0"
                                var players = game.filterPlayer(function (current) {
                                    return current.countCards('e') <= player.countCards('e');
                                });
                                players.remove(player);
                                event.players = players;
                                player.line(players, 'green');
                                "step 1"
                                if (event.players.length) {
                                    var current = event.players.shift();
                                    var hs = current.getCards('h')
                                    if (hs.length) {
                                        var card = hs.randomGet();
                                        player.gain(card, current);
                                        current.$giveAuto(card, player);
                                    }
                                    event.redo();
                                }
                                // game.log(player, '触发了【弓上弦】');
                                if (player.buff) {
                                    player.buff['txhj_xiaoxiaoSkill2'].update();
                                }
                            }
                        },
                        //轻舞飞扬
                        "txhj_xuerenSkill1": {
                            trigger: {player: 'phaseEnd'},
                            forced: true,
                            charlotte: true,
                            filter: function (event, player) {
                                return player.getStat('damage');
                            },
                            content: function () {
                                player.draw(1, true);
                                // game.log(player, '发动了【轻舞飞扬】');
                                if (player.buff) {
                                    player.buff['txhj_xuerenSkill1'].update();
                                }
                            },
                        },
                        //倚天拔地
                        "txhj_xuanwuSkill1": {
                            trigger: {
                                global: "recoverBefore",
                            },
                            forced: true,
                            charlotte: true,
                            filter: function (event, player) {
    
                                return event.player != player && !player.isHealthy();
                            },
                            content: function () {
                                player.recover();
                                // game.log(player, '发动了【倚天拔地】');
                                if (player.buff) {
                                    player.buff['txhj_xuanwuSkill1'].update();
                                }
                            },
                        },
                        //蛇影
                        "txhj_xuanwuSkill2": {
                            trigger: {
                                player: "loseAfter",
                            },
                            usable: 1,
                            forced: true,
                            charlotte: true,
                            filter: function (event, player) {
                                if (event.name != 'lose' || event.type != 'discard') return false;
                                var evt = event.getl(player);
                                return evt && evt.player == player && evt.hs && evt.hs.length > 0;
                            },
                            content: function () {
                                "step 0"
                                player.draw(Math.ceil(trigger.getl(player).hs.length / 2));
                                event.count = Math.ceil(trigger.getl(player).hs.length / 2);
                                "step 1"
                                event.list = player.getEnemies().sortBySeat();
                                "step 2"
                                if (event.list.length) {
                                    var target = event.list.shift();
                                    player.line(target, 'green');
                                    target.damage(1, true);
                                    event.count--;
                                    if (event.count > 0) {
                                        event.redo();
                                    } else {
                                        event.finish();
                                    }
                                }
                                // game.log(player, '发动了【蛇影】');
                                if (player.buff) {
                                    player.buff['txhj_xuanwuSkill2'].update();
                                }
                            },
                        },
                        //玄冥真主
                        "txhj_xuanwuSkill3": {
                            trigger: {
                                target: "useCardToTargeted",
                            },
                            forced: true,
                            charlotte: true,
                            filter: function (event, player, card) {
                                return get.number(event.card) <= player.countCards('h') && get.type(event.card, 'trick') == 'trick' && event.player != player && event.targets && event.targets.length;
                            },
                            content: function () {
                                trigger.cancel();
                                trigger.targets.remove(player);
                                trigger.getParent().triggeredTargets2.remove(player);
                                trigger.untrigger();
                                // game.log(player, '发动了【玄冥真主】');
                                if (player.buff) {
                                    player.buff['txhj_xuanwuSkill3'].update();
                                }
                            },
                        },
                        //勇往直前
                        "txhj_dundunSkill1": {
            trigger: {player: 'useCardToPlayered'},
            forced: true,
            charlotte: true,
            filter: function (event, player) {
              if (!(player == game.me)) return false;
              return event.card.name=='sha';
            },
            content: function () {
              player.draw(1, true);
              if (player.buff && player.buff["txhj_dundunSkill1"]) {
                player.buff['txhj_dundunSkill1'].update();
              }
            },
          },
          //忠誌
          "txhj_dundunSkill2": {
            trigger: {player: 'damageBegin4'},
            forced: true,
            charlotte: true,
            filter: function (event, player) {
              if (!(player == game.me)) return false;
              return event.num > 1;
            },
            content: function () {
              trigger.num--;
              if (player.buff && player.buff["txhj_dundunSkill2"]) {
                player.buff['txhj_dundunSkill2'].update();
              }
            },
          },
          //狐火灵气
          "txhj_jiuweiSkill1": {
            forced:true,
            charlotte: true,
            trigger:{global: 'phaseBegin'},
            filter:function(event,player){
              if (!(player == game.me)) return false;
              return player != event.player ;
            },
            content:function(){
              if(!trigger.player.storage.txhj_jiuweiSkill1_disable) trigger.player.storage.txhj_jiuweiSkill1_disable=[];
              trigger.player.storage.txhj_jiuweiSkill1_disable.push(player);
              trigger.player.addTempSkill('txhj_jiuweiSkill1_disable','phaseAfter');
            },
          },
          "txhj_jiuweiSkill1_disable": {
            trigger:{
              player:'useCardToTarget'
            },
            priority: -7,
            filter:function(event,player){
              return event.targets.length == 1 && event.targets.contains(player.storage.txhj_jiuweiSkill1_disable[0]) && get.type(event.card, "trick") == 'trick';
            },
            content:function(){
              trigger.excluded.add(player.storage.txhj_jiuweiSkill1_disable[0]);
              if (get.type(trigger.card, 'delay') == "delay") {
                var owner=get.owner(trigger.card);
                if(owner&&owner.getCards('hej').contains(trigger.card)) owner.lose(trigger.card,ui.discardPile);
                else game.cardsDiscard(trigger.card);
                game.log(trigger.card,'进入了弃牌堆');
              }
              if (player.storage.txhj_jiuweiSkill1_disable[0].buff) {
                player.storage.txhj_jiuweiSkill1_disable[0].buff['txhj_jiuweiSkill1'].update();
              }
            },
            forced:true,
            onremove:true,
            charlotte:true,
            mark:true,
            marktext:"失",
            intro:{
              content:"本回合内对$使用锦囊牌会失效.",
            },
          },
          //秘思
          "txhj_jiuweiSkill2": {
            forced:true,
            charlotte: true,
            trigger:{global: 'useCard'},
            filter:function(event,player){
              if (!(player == game.me)) return false;
              if (player != _status.currentPhase || event.player == player) return false;
              let res = event.player.getHistory("useCard",function (evt) {
                return get.type(evt.card) != 'trick';
              });
              return res.length == 1;
            },
            content:function(){
              trigger.targets = [];
              trigger.all_excluded = true;
              if (player.buff && player.buff["txhj_jiuweiSkill2"]) {
                player.buff['txhj_jiuweiSkill2'].update();
              }
            }
          },
          //九尾之命
          "txhj_jiuweiSkill3": {
            forced:true,
            charlotte: true,
            trigger:{player: 'damageEnd'},
            init: function (player) {
              player.storage.txhj_jiuweiSkill3_count = 0;
            },
            filter:function(event,player){
              if (!(player == game.me)) return false;
              return event.num > 0 && player.storage.txhj_jiuweiSkill3_count < 9;
            },
            content:function(){
              let count = (9 - player.storage.txhj_jiuweiSkill3_count) * trigger.num;
              player.draw(count);
              player.storage.txhj_jiuweiSkill3_count++;
              if (player.buff && player.buff["txhj_jiuweiSkill3"]) {
                player.buff['txhj_jiuweiSkill3'].update();
              }
            }
          },
          //雷奔云谲
          "txhj_tengsheSkill1": {
            trigger: {player: 'damageEnd'},
            forced: true,
            unique: true,
            charlotte: true,
            usable:1,
            filter: function (event, player) {
              if (!(player == game.me)) return false;
              return _status.currentPhase != player && !event.nature && event.source;
            },
            content: function () {
              player.useCard({name:'sha', nature: 'thunder',isCard: true},trigger.source);
              if (player.buff && player.buff["txhj_tengsheSkill1"]) {
                player.buff['txhj_tengsheSkill1'].update();
              }
            }
          },
          //紫电
          "txhj_tengsheSkill2": {
            trigger: {player: 'phaseAfter'},
            forced: true,
            unique: true,
            charlotte: true,
            filter: function (event, player) {
              if (!(player == game.me)) return false;
              let count = 0;
              event["txhj_tengsheSkill2"] = player.getEnemies();
              event["txhj_tengsheSkill2"].forEach(e => {
                if (e.isDamaged()) count++;
              });
              return count;
            },
            content: function () {
              let len = trigger["txhj_tengsheSkill2"].length;
              trigger["txhj_tengsheSkill2"].forEach(e => {
                e.damage(len == 1 ? 2 : 1, 'thunder', player);
              });
              if (player.buff && player.buff["txhj_tengsheSkill2"]) {
                player.buff['txhj_tengsheSkill2'].update();
              }
            }
          },
          //迅雷风烈
          "txhj_tengsheSkill3": {
            trigger: {source: 'damageEnd'},
            forced: true,
            unique: true,
            charlotte: true,
            usable: 1,
            filter: function (event, player) {
              if (!(player == game.me)) return false;
              return event.player != player && event.nature == "thunder";
            },
            content: function () {
              player.recover();
              player.draw(2);
              if (player.buff && player.buff["txhj_tengsheSkill3"]) {
                player.buff['txhj_tengsheSkill3'].update();
              }
            }
          },
          //慷慨鸭昂
          "txhj_yayaSkill1": {
            trigger: {
              player: 'useCard',
              target: "useCardToTargeted"
            },
            usable: 4,
            forced: true,
            charlotte: true,
            init: function (player) {
              player.storage["txhj_yayaSkill1_count"] = 0;
            },
            filter: function (event, player) {
              if (!(player == game.me)) return false;
              if (event.name == 'useCard') {
                return get.color(event.card) == "red";
              }
              return event.player != player && get.color(event.card) == "red";
            },
            content: function () {
              player.draw(1).gaintag = ["txhj_yayaSkill1"];
              player.storage["txhj_yayaSkill1_count"]++;
              if (player.buff && player.buff["txhj_yayaSkill1"]) {
                player.buff['txhj_yayaSkill1'].update();
              }
            },
            group:["txhj_yayaSkill1_damage"],
            subSkill: {
              damage: {
                trigger: {
                  player: 'gainAfter',
                },
                forced: true,
                charlotte: true,
                filter: function (event, player) {
                  if (!(player == game.me)) return false;
                  return player.storage["txhj_yayaSkill1_count"] >= 4;
                },
                content: function () {
                  player.getEnemies().randomGet().damage();
                  player.storage["txhj_yayaSkill1_count"] = 0;
                  if (player.buff && player.buff["txhj_yayaSkill1"]) {
                    player.buff['txhj_yayaSkill1'].update();
                  }
                }
              }
            }
          },
          //鸭立
          "txhj_yayaSkill2": {
            trigger: {
              player: "dying"
            },
            forced: true,
            charlotte: true,
            init: function (player) {
              player.storage["txhj_yayaSkill2"] = false;
            },
            filter: function (event, player) {
              if (!(player == game.me)) return false;
              return !player.storage["txhj_yayaSkill2"];
            },
            content: function () {
             "step 0"
              var num = 1 - player.hp;
              if(num) player.recover(num);
              player.update();
              "step 1"
              player.addTempSkill("txhj_yayaSkill2_protected", {player: "phaseBegin"});
              player.storage["txhj_yayaSkill2"] = true;
            }
          },
          "txhj_yayaSkill2_protected": {
            trigger: {
              player: ['damageBegin3','loseHpBefore','recoverBefore']
            },
            forced: true,
            charlotte: true,
            mark:true,
            marktext:"保",
            intro:{
              content:'你不能失去/回复体力和受到伤害'
            },
            content:function(){
              trigger.cancel();
            },
          },
          //承天之佑
          "txhj_youyouSkill1": {
            trigger: {player: 'damageAfter'},
            usable: 1,
            forced: true,
            charlotte: true,
            filter: function (event, player) {
              if (!(player == game.me)) return false;
              return _status.currentPhase != player;
            },
            content: function () {
              player.draw(2);
              if (player.buff && player.buff["txhj_youyouSkill1"]) {
                player.buff['txhj_youyouSkill1'].update();
              }
            }
          },
          //守护
          "txhj_youyouSkill2": {
            trigger: {player: 'gainAfter'},
            usable: 1,
            forced: true,
            charlotte: true,
            filter: function (event, player) {
              if (!(player == game.me)) return false;
              let evt = event.getParent('phaseDraw');
              return Object.keys(evt).length == 0 && event.getg(player).length > 1;
            },
            content: function () {
              let players = [];
              player.getFriends().forEach(e => {
                if (!e.isHealthy()) players.push(e);
              });
              if (players.length) players.randomGet().recover();
              if (player.buff && player.buff["txhj_youyouSkill2"]) {
                player.buff['txhj_youyouSkill2'].update();
              }
            }
          },
          //麒麟之姿
          "txhj_qilinSkill1": {
            trigger: {player: 'phaseDrawEnd'},
            forced: true,
            charlotte: true,
            filter: function (event, player) {
              if (!(player == game.me)) return false;
              event.gains = player.getHistory('gain',function(evt){
                if(evt.getParent().name!='draw'||evt.getParent('phaseDraw')!=event) return false;
                return true;
              });
              return event.gains.length && event.gains[0].parent.num > 0;
            },
            content: function () {
              player.draw(trigger.gains[0].parent.num);
              if (player.buff && player.buff["txhj_qilinSkill1"]) {
                player.buff['txhj_qilinSkill1'].update();
              }
            }
          },
          //掌火
          "txhj_qilinSkill2": {
            trigger: {source: 'damageEnd'},
            usable: 2,
            forced: true,
            charlotte: true,
            filter: function (event, player) {
              if (!(player == game.me)) return false;
              return event.nature == 'fire';
            },
            content: function () {
              player.recover();
              player.gainPlayerCard(trigger.player, 'he', true);
              if (player.buff && player.buff["txhj_qilinSkill2"]) {
                player.buff['txhj_qilinSkill2'].update();
              }
            }
          },
          //腾焰飞芒
          "txhj_qilinSkill3": {
            trigger: {player: ['phaseUseBegin','phaseUseEnd']},
            forced: true,
            charlotte: true,
            filter: function (event, player) {
              if (!(player == game.me)) return false;
              return true;
            },
            content: function () {
              player.useCard({name: 'huogong',isCard: true}, player.getEnemies().randomGet());
              if (player.buff && player.buff["txhj_qilinSkill3"]) {
                player.buff['txhj_qilinSkill3'].update();
              }
            }
          },
          //娉婷万種
          "txhj_minminSkill1": {
            trigger: {player: 'damageEnd'},
            forced: true,
            charlotte: true,
            usable:1,
            filter: function (event, player) {
              if (!(player == game.me)) return false;
              return event.num > 0 ;
            },
            content: function () {
              player.draw(trigger.num);
              if (player.buff && player.buff["txhj_minminSkill1"]) {
                player.buff['txhj_minminSkill1'].update();
              }
            },
          },
          //依人
          "txhj_minminSkill2": {
            trigger: {player: 'gainAfter'},
            forced: true,
            charlotte: true,
            usable:2,
            filter: function (event, player) {
              if (!(player == game.me)) return false;
              return event.getParent('draw').num >= 2;
            },
            content: function () {
              let friends = [];
              player.getFriends().forEach(e => {
                if (!e.isHealthy()) friends.push(e);
              });
              if (friends.length) friends.randomGet().recover();
              if (player.buff && player.buff["txhj_minminSkill2"]) {
                player.buff['txhj_minminSkill2'].update();
              }
            },
          },
          //披坚执锐
          "txhj_ditingSkill1": {
            trigger: {source: 'damageEnd'},
            forced: true,
            charlotte: true,
            filter: function (event, player) {
              if (!(player == game.me)) return false;
              return true;
            },
            content: function () {
              player.recover();
              if (player.buff && player.buff["txhj_ditingSkill1"]) {
                player.buff['txhj_ditingSkill1'].update();
              }
            },
          },
          //轻健
          "txhj_ditingSkill2": {
            trigger: {player: 'damageEnd'},
            forced: true,
            charlotte: true,
            filter: function (event, player) {
              if (!(player == game.me)) return false;
              return true;
            },
            content: function () {
              player.gainMaxHp(1);
              if (player.buff && player.buff["txhj_ditingSkill2"]) {
                player.buff['txhj_ditingSkill2'].update();
              }
            },
          },
          //巧捷万端
          "txhj_ditingSkill3": {
            trigger: {player: 'phaseEnd'},
            forced: true,
            charlotte: true,
            filter: function (event, player) {
              if (!(player == game.me)) return false;
              return player.getHistory("useCard",function (evt) {
                return get.number(evt.card);
              }).length;
            },
            content: function () {
              let evts = player.getHistory("useCard",function (evt) {
                return get.number(evt.card);
              });
              function sum(arr) {
                let evt = [...new Set(arr.map(obj => get.number(obj.card)))];
                return evt.length;
              }
              let num = sum(evts);
              player.draw(num);
              let enemies = player.getEnemies();
              if (enemies.length < num) num = enemies.length;
              for (let i = 0; i < num; i++) {
                enemies[i].damage(1, player);
              }
              if (player.buff && player.buff["txhj_ditingSkill3"]) {
                player.buff['txhj_ditingSkill3'].update();
              }
            },
          },
          //慧心巧思
          "txhj_qiaoqiaoSkill1": {
            trigger: {
              global: 'addJudgeBefore',
            },
            forced: true,
            charlotte: true,
            usable:1,
            filter: function (event, player) {
              if (!(player == game.me)) return false;
              return event.player != player;
            },
            content: function () {
              player.getEnemies().randomGet().loseHp();
              if (player.buff && player.buff["txhj_qiaoqiaoSkill1"]) {
                player.buff['txhj_qiaoqiaoSkill1'].update();
              }
            },
          },
          //清婉
          "txhj_qiaoqiaoSkill2": {
            trigger: {
              player: 'phaseEnd',
            },
            forced: true,
            charlotte: true,
            usable:1,
            filter: function (event, player) {
              if (!(player == game.me)) return false;
              return true;
            },
            content: function () {
              player.drawTo((player.hp > 5 ? 5 : player.hp));
              if (player.buff && player.buff["txhj_qiaoqiaoSkill2"]) {
                player.buff['txhj_qiaoqiaoSkill2'].update();
              }
            },
          },
                        /*贪食 来源剑阁模式boss技能*/
                        'txhj_tanshi': {
                            trigger: {player: 'phaseEnd'},
                            forced: true,
                            check: function () {
                                return false;
                            },
                            filter: function (event, player) {
                                return player.countCards('h') > 0;
                            },
                            content: function () {
                                player.chooseToDiscard('h', true);
                            }
                        },
                        tx_modao:{
	trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				content:function(){
					player.draw(2);
				}
			},
			tx_mojian:{
		trigger:{player:'phaseUseBegin'},
				content:function(){
					var list=game.filterPlayer(function(current){
						return player.canUse('wanjian',current)&&current.isEnemyOf(player);
					});
					list.sort(lib.sort.seat);
					player.useCard({name:'wanjian'},list);
				},
				ai:{
					threaten:1.8
				}
			},
			tx_yushou:{
		trigger:{player:'phaseUseBegin'},
				content:function(){
					var list=game.filterPlayer(function(current){
						return player.canUse('nanman',current)&&current.isEnemyOf(player);
					});
					list.sort(lib.sort.seat);
					player.useCard({name:'nanman'},list);
				}
			},
			tx_moyany:{
				trigger:{player:'loseEnd'},
				frequent:true,
				unique:true,
				filter:function(event,player){
			        if(player.hasSkill('boss_moyany_ing')) return false;
			        return _status.currentPhase!=player;
		        },
		        content:function(){
			        "step 0"
			        player.addTempSkill('boss_moyany_ing');
			        player.judge(function(card){
				        return get.color(card)=='red'?1:0;
			        });
			        "step 1"
			        if(result.bool){
				        player.chooseTarget(true,'选择一个目标对其造成两点火焰伤害',function(card,player,target){
					        return player!=target;
				        }).ai=function(target){
					        return get.damageEffect(target,player,player,'fire');
				        }
			        } else{
				        //event.finish();
				        event.goto(3);
			        }
			        "step 2"
			        if(result.targets.length){
				        player.line(result.targets,'fire');
				        result.targets[0].damage(2,'fire');
			        }
			        "step 3"
			        if(player.hasSkill('boss_moyany_ing')) player.removeSkill('boss_moyany_ing');
		        },
				ai:{
					effect:{
						target:function(card){
							if(get.tag(card,'loseCard')){
								return [0.5,1];
							}
						}
					}
				}
			},
			tx_danshu:{
				trigger:{player:'loseEnd'},
				frequent:true,
				unique:true,
				filter:function(event,player){
					return _status.currentPhase!=player&&player.hp<player.maxHp;
				},
				content:function(){
					"step 0"
					player.judge(function(card){
						return get.color(card)=='red'?1:0;
					});
					"step 1"
					if(result.color=='red'){
						player.recover();
					}
				},
				ai:{
					effect:{
						target:function(card){
							if(get.tag(card,'loseCard')){
								return [0.5,1];
							}
						}
					}
				}
			},
			txyirang:{
				audio:'yirang',
		trigger:{player:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					if(!player.countCards('he',function(card){
						return get.type(card)!='basic';
					})){
						return false;
					}
					return game.hasPlayer(function(current){
						return current.maxHp>player.maxHp;
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('txyirang'),function(card,player,target){
						return target.maxHp>player.maxHp;
					}).set('ai',function(target){
						return (get.attitude(_status.event.player,target)-2)*target.maxHp;
					});
					'step 1'
					if(result.bool){
						var cards=player.getCards('he',function(card){
							return get.type(card)!='basic';
						});
						var target=result.targets[0];
						var types=[];
						for(var i=0;i<cards.length;i++){
							types.add(get.type(cards[i],'trick'));
						}
						player.logSkill('txyirang',target);
						player.give(cards,target);
						player.gainMaxHp(target.maxHp-player.maxHp,true);			
						game.delay();
					}
				}
			},
			txayboji: {
  trigger: { player: "useCardToBefore" },
    usable:1,
   // direct: true,
    filter: function (event, player) {
      return event.card.name == "sha" && event.targets.length == 1 && event.targets[0] != player;
    },
    content: function () {
      "step 0";     
      player.chooseToDiscard(trigger.targets[0].get("h"), true);
      "step 1";
      if (result.bool) {
        trigger.targets[0].discard(trigger.targets[0].get("h"));
        player.draw(1);
      }
    },
  },
        txayhanji: {
// 触发时机：造成伤害
        trigger: { source: 'damageBefore' },
        usable:1,
        forced: true,
        // 触发效果
        filter: function (event, player) {
          // 对其他角色造成伤害
          return event.player != player;
        },
        content: function () {
          // 造成的伤害+1
          trigger.num++;
        },
      },
      tx_dqtianzi:{
     trigger: { player:['damageEnd','phaseUseBegin']},
     usable:1,
    direct: true,   
    content: function () {
      'step 0';
      player.chooseTarget('选择一名其他角色进行判定', function (card, player, target) {
        return target != player;
      }).ai = function (target) {
      	var player=_status.event.player;
						return get.damageEffect(target,player,player);
      };
      'step 1';
      if (result.bool) {
        player.logSkill('tx_dqtianzi', result.targets);
        event.target = result.targets[0];
        player.judge(function (card) {
          return get.color(card);
        });
      } else {
        event.finish();
      }
      'step 2';
      if (result.suit == 'diamond') {
        event.target.skip('phaseUse');
      } else if(result.color=='black'){
        player.gainPlayerCard(event.target, 'h',[0,Infinity]);
      }
    },
  },
  xinmingjian:{
          audio:2,
          usable:2,
                enable:"phaseUse",
                filterTarget:function(card,player,target){
        return player!=target;
    },
                filter:function(event,player){
        return player.countCards('h')>0;
    },
                filterCard:true,
                selectCard:[1,Infinity],
                discard:false,
                lose:false,
                delay:false,
                content:function(){
        target.gain(cards,player,'giveAuto');
        target.addTempSkill('xinmingjian2',{player:'phaseAfter'});
        target.storage.xinmingjian2++;
        target.updateMarks('xinmingjian2');
    },
                ai:{
                    order:1,
                    result:{
                        target:function(player,target){
                if(target.hasSkillTag('nogain')) return 0;
                if(player.countCards('h')==player.countCards('h','du')) return -1;
                if(target.hasJudge('lebu')) return 0;
                if(get.attitude(player,target)>3){
                    var basis=get.threaten(target);
                    if(player==get.zhu(player)&&player.hp<=2&&player.countCards('h','shan')&&!game.hasPlayer(function(current){
                        return get.attitude(current,player)>3&&current.countCards('h','tao')>0;
                    })) return 0;
                    if(target.countCards('h')+player.countCards('h')>target.hp+2) return basis*0.8;
                    return basis;
                }
                return 0;
            },
                    },
                },
            },
            "xinmingjian2":{
                charlotte:true,
                mark:true,
                intro:{
                    content:"手牌上限不限制，出杀次数不限制",
                },
                init:function(player,skill){
        if(!player.storage[skill]) player.storage[skill]=0;
    },
                onremove:true,
                mod:{
                    maxHandcard:function(player,num){
            return num+Infinity;
        },
                    cardUsable:function(card,player,num){
            if(card.name=='sha') return num+Infinity;
        },
                },
            },
            txmazhan:{
locked:true,
mod:{
globalFrom:function(from,to,distance){
return distance-2;
},
globalTo:function(from,to,distance){
return distance+1;
},
},
},
txlieji:{        
             trigger: {
        player: "useCardAfter"
        },
        usable: 1,
        priority: 9,
        direct: true,
        filter: function (event, player) {
          return event.targets && event.targets.length == 1 && (event.card.name == "sha" || get.type(event.card) == "trick");
        },
        content: function () {
          "step 0";
          player.draw();
          "step 1";
          game.log(player, "裂击效果发动，可以再次结算一次【", trigger.card.name, "】");
          player.useCard(trigger.card, trigger.targets, true);
        }
      },
      diycuidu:{
			audio:2,
			trigger:{source:'damageEnd'},
				derivation:['diyzhongdu'],
				forced:true,
				unique:true,
				filter:function(event,player){
					if(event._notrigger.contains(event.player)) return false;
					return event.player.isIn()&&event.player.isEnemyOf(player)&&!event.player.hasSkill('diyzhongdu');
				},
				logTarget:'player',
				content:function(){
					trigger.player.addSkill('diyzhongdu');	
					player.draw(2);		
					if(player){
						player.draw(0);
					}
				}
			},
      diychunxiao:{
            audio:1,
                forced:true,
                trigger:{
               player:"phaseJieshuBegin",
                },
                filter:function(event,player){
 return player.hp<player.maxHp&&Math.random()<=0.50;
 },
                content:function(){
 player.recover(player.maxHp-player.hp);
},
            },          
			diyzhongdu:{
	trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				mark:true,
				nopop:true,
				temp:true,
				intro:{
					content:'锁定技，回合开始时，你进行判定，若结果不为红桃，你受到1点无来源的伤害，若结果不为黑桃，此中毒效果失效。'
				},
				content:function(){
					'step 0'
					player.judge(function(card){
						var suit=get.suit(card);
						if(suit=='spade') return -1;
						if(suit=='heart') return 1;
						return 0;
					});
					'step 1'
					if(result.suit!='heart'){
						player.damage('nosource');
					}
					if(result.suit!='spade'){
						player.removeSkill('diyzhongdu');
					}
				}
			},
		 diyzhuiling:{
	  audio:1,				trigger:{player:'damageEnd'},		
				filter:function(event){
					return event.source!=undefined;
				},
				logTarget:'source',
				content:function(){
					trigger.source.damage(1).nature=['fire','thunder','ice','poison'].randomGet();
				},
			},
			diyfeihua:{
		trigger:{player:'phaseUseBegin'},
				content:function(){
					var name=['zhibi','wanjian'].randomGet();
					player.useCard({name:name},game.filterPlayer(function(current){
						return player.canUse({name:name},current)
					}),'noai');
				},
			},
			txclanxieshu:{
                audio:2,
                trigger:{
                    player:"damageEnd",
                    source:"damageSource",
                },
                filter:function(event,player){
                return (event.card)&&player.countCards('he')>=lib.skill.dcweidang.getLength(event.card);
            },
                content:function(){             
        var card=trigger.card       
        var num=lib.skill.dcweidang.getLength(card)
        player.chooseToDiscard(num,'he',true)
        if(player.hp<player.maxHp)
        player.draw(player.getDamagedHp());
    },
                ai:{
                    maixie:true,
                    "maixie_hp":true,
                    effect:{
                        target:function(card,player,target){
                if(player.hasSkillTag('jueqing',false,target)) return [1,-1];
                if(get.tag(card,'damage')) return [1,0.55];
            },
                    },
                },
            },
            txshixin: {
                        audio:2,
                        filter: function (event, player) {
                            return event.player != player && get.type(event.card) == 'trick' || get.type(event.card) == 'delay';
                        },
                        trigger: {
                            target: "useCardToBefore",
                        },
                        content: function () {
                            "step 0"
                            player.judge(function (card) {
                                if (get.color(card) == 'black') return 1;
                                return 0;
                            });
                            "step 1"
                            if (result.color) {
                                if (result.color == 'black') {
                                    trigger.cancel();
                                }
                                else {
                                    player.addTempSkill('txshixin_red', {
                                        target: 'useCardToAfter',
                                    });
                                }
                            }
                        },
                        subSkill: {
                            red: {
                                trigger: {
                                    target: "useCardToAfter",
                                },
                                content: function () {
                                    player.gain(trigger.cards);
                                    player.$gain2(trigger.cards);
                                },
                                sub: true,
                            },
                        },
                    },
                    txqyyouji:{
				audio:2,
	trigger:{player:'useCardToTargeted'},
				shaRelated:true,
				filter:function(event,player){
					return event.isFirstTarget&&event.targets.length==1&&get.type(event.card,'trick')=='trick';
				},
				content:function(){
					trigger.getParent().targets=trigger.getParent().targets.concat(trigger.targets);
					trigger.getParent().triggeredTargets4=trigger.getParent().triggeredTargets4.concat(trigger.targets);
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(player._txqyyouji_aiChecking) return;
							if(target==player){
								player._txqyyouji_aiChecking=true;
								var eff=get.effect(target,card,player,player);
								delete player._txqyyouji_aiChecking;
								if(eff<3) return 'zerotarget';
							}
						}
					}
				},
				mod:{
					attackRange:function(player,num){
						return num+0;
					},
				}
			},
			txmouduan:{
				trigger:{
			player:"phaseJieshuBegin",
				},
				//priority:2,
				audio:2,
				filter:function(event,player){
					var history=player.getHistory('useCard');
					var suits=[];
					var types=[];
					for(var i=0;i<history.length;i++){
						var suit=get.suit(history[i].card);
						if(suit) suits.add(suit);
						types.add(get.type(history[i].card))
					}
					return suits.length>=4||types.length>=3;
				},
				check:function(event,player){
					return player.canMoveCard(true);
				},
				content:function(){
					player.moveCard();
				},
			},
			txkaikang:{
				audio:"kaikang",
	trigger:{global:'useCardToTargeted'},
				filter:function(event,player){
					return event.card.name=='sha'&&event.target.isIn();
				},
				check:function(event,player){
					return get.attitude(player,event.target)>=0;
				},
				logTarget:'target',
				content:function(){
					"step 0"
					player.draw();
					if(trigger.target!=player){
						player.chooseCard(true,'he','交给'+get.translation(trigger.target)+'一张牌').set('ai',function(card){
							if(get.position(card)=='e') return -1;
							if(card.name=='shan') return 1;
							if(get.type(card)=='equip') return 0.5;
							return 0;
						});
					}
					else{
						event.finish();
					}
					"step 1"
					player.give(result.cards,trigger.target,'give');
					game.delay();
					event.card=result.cards[0];
					"step 2"
					if(trigger.target.getCards('h').contains(card)&&get.type(card)=='equip'){
						trigger.target.chooseUseTarget(card);
					}
				},
				ai:{
					threaten:1.1
				}
			},
			txhuangfu:{
				audio:2,
		trigger:{player:'damageBegin4'},
				filter:function(event){
					return event.nature=='thunder';
				},
				forced:true,
				content:function(){
					trigger.cancel();
				},
				ai:{
					nofire:true,
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'thunderDamage')) return 'zerotarget';
						}
					}
				}
			},
			txleizhen:{
				audio:2,
				trigger:{player:'die'},
				forced:true,
				forceDie:true,
				filter:function(event){
					return event.source&&event.source.isIn();
				},
				logTarget:'source',
				skillAnimation:true,
				animationColor:'thunder',
				content:function(){
					trigger.source.damage(1,'thunder');
				},
				ai:{
					threaten:0.7
				}
			},
			txxiebi:{	
		trigger:{player:'damageBegin4'},
				forced:true,
				audio:true,
				filter:function(event,player){
					if(event.num<=1) return false;
					if(player.hasSkillTag('unequip2')) return false;
					if(event.source&&event.source.hasSkillTag('unequip',false,{
						name:event.card?event.card.name:null,
						target:player,
						card:event.card
					})) return false;
					return true;
				},
				//priority:-10,
				content:function(){
					trigger.num=1;
				},
				ai:{
					filterDamage:true,
					skillTagFilter:function(player,tag,arg){
						if(player.hasSkillTag('unequip2')) return false;
						if(arg&&arg.player){
							if(arg.player.hasSkillTag('unequip',false,{
								name:arg.card?arg.card.name:null,
								target:player,
								card:arg.card,
							})) return false;
							if(arg.player.hasSkillTag('unequip_ai',false,{
								name:arg.card?arg.card.name:null,
								target:player,
								card:arg.card,
							})) return false;
							if(arg.player.hasSkillTag('jueqing',false,player)) return false;
						}
					},
				},
			},
			txlianbi:{
				audio:2,
				locked:true,	
				ai:{
					effect:{
						target:function(card){
							if(card.name=='tiesuo') return 'zeroplayertarget';
						},
					},
				},
				group:["txlianbi_1"],
				subSkill:{
					'1':{
						audio:2,
						trigger:{
							player:['linkBefore','enterGame'],
							global:'phaseBefore',
						},
						forced:true,
						filter:function(event,player){
							if(event.name=='link') return player.isLinked();
							return (event.name!='phase'||game.phaseNumber==0)&&!player.isLinked();
						},
						content:function(){
							if(trigger.name!='link') player.link(true);
							else trigger.cancel();
						},	
					},		
				},
			},
			txfeiyan:{
                trigger:{
                global:"useCardToPlayer",
                },
                filter:function (event,player){
                    return event.card&&event.card.name=='sha'&&event.player!=player&&event.targets.length==1&&
                    get.distance(player,event.player,'attack')<=1&&player.countCards('h','sha')>0;
                },
                direct:true,
                content:function (){
                    "step 0"
                    var check=get.attitude(player,trigger.player)<0;
                    player.chooseToUse({name:'sha'},'飞燕：是否对'+get.translation(trigger.player)+'使用一张【杀】？').set('targetRequired',true).set('complexSelect',true).set('filterTarget',function(card,player,target){
                        if(target!=_status.event.sourcex&&!ui.selected.targets.contains(_status.event.sourcex)) return false;
                        return lib.filter.filterTarget.apply(this,arguments);
                    }).set('ai',function(){
                        if(_status.event.check) return 1;
                        return 0;
                    }).set('sourcex',trigger.player).set('check',check);
                    "step 1"
                    if(result.bool){
                        player.draw(2);
                    }
                    else event.finish();
                },
				mod:{
			    	aiValue:function(player,card,num){
						if(card.name=='sha') return 10;
					},
				},
            },
        txleili:{
        audio:2,
		trigger:{source:'damageEnd'},
		direct:true,
		filter:function(event){
			return event.card&&event.card.name=='sha';
		},
		content:function(){
			"step 0"
			player.chooseTarget(get.prompt('diyleili'),function(card,player,target){
				if(target==trigger.player) return false;
				return target.isEnemyOf(player);
			}).ai=function(target){
				return get.damageEffect(target,player,player,'thunder');
			}
			"step 1"
			if(result.bool){
				player.logSkill('txleili',result.targets);
				result.targets[0].damage('thunder');
			}
		},
		ai:{
			expose:0.2,
			threaten:1.3
		}
	},
	cxyMoJun:{
          trigger:{global:"damageEnd"},
          filter:function(event,player){
            if(!event.source||!event.source.isAlive())return false;
            if(get.attitude(player,event.source) < 2)return false;
            if(!event.card||event.card.name!="sha")return false;
            return event.notLink();
          },
          forced:true,
          content:function(){
            'step 0'
            trigger.source.judge(function(card){
              return get.color(card)=='black'?2:0;
            });
            'step 1'
            if(result.bool){
              event.targets = game.filterPlayer(function(current){
                return get.attitude(player,current) > 0;
              });
              event.targets.sort(lib.sort.seat);
              game.asyncDraw(event.targets);
            }
          },
        },
        cxyKuangXi:{
          enable:"phaseUse",
          filter:function(event,player){
            return !player.hasSkill("cxyKuangXi_filter");
          },
          selectTarget:1,
          filterTarget:function(card,player,target){
            return target!=player;
          },
          contentBefore:function(){
            player.addSkill("cxyKuangXi_temp");
          },
          content:function(){
            "step 0"
            player.loseHp();
            "step 1"
            target.damage(player);
          },
          contentAfter:function(){
            if(player.hasSkill("cxyKuangXi_temp")){
              player.removeSkill('cxyKuangXi_temp');
            } else {
              player.addTempSkill("cxyKuangXi_filter","phaseBefore");
            }
          },
          ai:{
            order: 7,
            result:{
              target:function(player,target){
                if(player.hp+player.countCards('hs',{name:['jiu','tao']})+game.countPlayer(function(current){
                  return current.hasSkill('cxyBaoYing')&&!current.awakenedSkills.contains('cxyBaoYing');
                })<=0) return 0;
                return get.damageEffect(target,player);
              },
              player:1,
            },
          },
          subSkill:{
            temp:{
              trigger:{global:"dying"},
              priority: 15,
              filter:function(event,player){
                return event.reason&&event.reason.getParent().name=='cxyKuangXi';
              },
              silent:true,
              content:function(){
                player.removeSkill('cxyKuangXi_temp');
              }
            },
            filter:{},
          },
        },
        txbaobian:{
                audio:"baobian",
                trigger:{
                    player:["phaseBefore","changeHp"],
                },
                forced:true,
                popup:false,
                init:function(player){
        if(game.online) return;
        player.removeAdditionalSkill('txbaobian');
        var list=[];
        if(player.hp<=3){
            //if(trigger.num!=undefined&&trigger.num<0&&player.hp-trigger.num>1) player.logSkill('txbaobian');
            list.push('tiaoxin');
        }
        if(player.hp<=2){
            list.push('paoxiao');
        }
        if(player.hp<=1){
            list.push('shensu');
        }
        if(list.length){
            player.addAdditionalSkill('txbaobian',list);
        }
    },
                derivation:["tiaoxin","paoxiao","shensu"],
                content:function(){
        player.removeAdditionalSkill('txbaobian');
        var list=[];
        if(player.hp<=3){
            if(trigger.num!=undefined&&trigger.num<0&&player.hp-trigger.num>1) player.logSkill('txbaobian');
            list.push('tiaoxin');
        }
        if(player.hp<=2){
            list.push('paoxiao');
        }
        if(player.hp<=1){
            list.push('shensu');
        }
        if(list.length){
            player.addAdditionalSkill('txbaobian',list);
        }
    },
                ai:{
                    maixie:true,
                    effect:{
                        target:function(card,player,target){
                if(get.tag(card,'damage')){
                    if(!target.hasFriend()) return;
                    if(target.hp>=4) return [0,1];
                }
                if(get.tag(card,'recover')&&player.hp>=player.maxHp-1) return [0,0];
            },
                    },
                },
            },
            //*搬运自诸侯伐董扩展，作者为程序员//
            cxy_BaoYing:{
skillAnimation:true,
animationColor:'fire',
mark:true,
intro:{content:'limited'},
trigger:{global:'dying'},
filter:function(event,player){
if(player.storage.cxy_BaoYing) return false;
if(get.mode()=='identity') return get.attitude(player,event.player)>0;
return event.player.isFriendOf(player);
},
logTarget:'player',
content:function(){
player.awakenSkill('cxy_BaoYing');
trigger.player.recover(1-trigger.player.hp);
},
},
    cxyYangWu:{
    trigger:{player:"phaseZhunbeiBegin"},
          direct:true,
          content:function(){
            "step 0"
            event.targets = game.filterPlayer(function(current){
              return current!=player;
            });
            event.targets.sort(lib.sort.seat);
            player.logSkill("cxyYangWu",event.targets);
            for(var i=0;i<event.targets.length;i++){
              event.targets[i].damage(player);
              game.delay();
            }
            "step 1"
            player.loseHp();
          },
        },
        cxyJingQi:{
          trigger:{global:"gameStart"},
          priority: 16,
          direct:true,
          content:function(){
            event.targets = game.filterPlayer(function(current){
              return get.attitude(player,current) > 2;
            });
            event.targets.sort(lib.sort.seat);
            for(var i=0;i<event.targets.length;i++){
              event.targets[i].addSkill("cxyJingQi_buff");
              event.targets[i].markSkillCharacter('cxyJingQi',player,'精骑','你计算与敌方角色的距离-1');
            }
          },
          subSkill:{
            buff:{
              mod:{
                globalFrom:function(from,to,distance){
                  if(game.hasPlayer(function(current){
                    return current.hasSkill("cxyJingQi")&&get.attitude(current,from) > 2;
                  })){
                    return distance - 1;
                  }
                },
              },
              temp:true,
              onremove:function(player){
                player.unmarkSkill('cxyJingQi');
              },
              trigger:{global:"dieAfter"},
              direct:true,
              filter:function(event,player){
                return !game.hasPlayer(function(current){
                  return current.hasSkill("cxyJingQi")&&get.attitude(current,player) > 2;
                });
              },
              content:function(){
                player.removeSkill("cxyJingQi_buff");
              },
            },
          },
        },
        cxyRuiQi:{
          trigger:{global:"phaseDrawBegin"},
          filter:function(event,player){
            return get.attitude(player,event.player) > 2;
          },
          logTarget:'player',
          forced:true,
          content:function(){
            trigger.num++;
          },
          ai:{
            threaten:2.5,
          }
        },
        cxyJiaoXia:{
          trigger:{global:"phaseDiscardBefore"},
          filter:function(event,player){
            return get.attitude(player,event.player) > 2;
          },
          forced:true,
          logTarget:'player',
          content:function(){
            trigger.player.addTempSkill("cxyJiaoXia_buff","phaseDiscardEnd");
          },
          subSkill:{
            buff:{
              mod:{
                maxHandcard:function(player,num){
                  var hs=player.getCards('h');
                  for(var i=0;i<hs.length;i++){
                    if(get.color(hs[i])=='black'){
                      num++;
                    }
                  }
                  return num;
                },
                cardDiscardable:function(card,player,name){
                  if(name=='phaseDiscard'&&get.color(card)=='black') return false;
                }
              },
            },
          },
        },
        cxyTunJun:{
          trigger:{global:"roundStart"},
          filter:function(event,player){
            return player.maxHp!=1;
          },
          forced:true,
          content:function(){
            "step 0"
            player.loseMaxHp();
            "step 1"
            player.draw(player.maxHp);
          },
        },
        cxyFengYing:{
          trigger:{global:"gameStart"},
          priority: 15,
          direct:true,
          content:function(){
            event.targets = game.filterPlayer(function(current){
              return get.attitude(player,current) > 2;
            });
            event.targets.sort(lib.sort.seat);
            for(var i=0;i<event.targets.length;i++){
              event.targets[i].addSkill("cxyFengYing_buff");
              event.targets[i].markSkillCharacter('cxyFengYing',player,'凤营','若你是体力值唯一最少的角色，则敌方角色不能使用牌指定你为目标');
            }
          },
          ai:{threaten:3},
          subSkill:{
            buff:{
              mod:{
                targetEnabled:function(card,player,target){
                  if(game.hasPlayer(function(current){
                    return current.hasSkill("cxyFengYing")&&get.attitude(current,target)>0;
                  })){
                    if(get.attitude(player,target)<0&&!game.hasPlayer(function(current){
                      return current!=target&&current.hp <= target.hp;
                    }))return false;
                  }
                },
              },
              temp:true,
              onremove:function(player){
                player.unmarkSkill('cxyFengYing');
              },
              trigger:{global:"dieAfter"},
              direct:true,
              filter:function(event,player){
                return !game.hasPlayer(function(current){
                  return current.hasSkill("cxyFengYing")&&get.attitude(current,player) > 2;
                });
              },
              content:function(){
                player.removeSkill("cxyFengYing_buff");
              },
            },
          },
        },
        cxyFanGong:{
         trigger:{target:"useCardToAfter"},
          filter:function(event,player){
            return get.attitude(player,event.player) < 0;
          },
          direct:true,
          content:function(){
            player.chooseToUse("是否发动反攻，对"+get.translation(trigger.player)+"使用一张[杀]？",{name:"sha"}).set("filterTarget",function(card,player,target){
              return target == _status.event.source;
            }).set("selectTarget",-1).set('source',trigger.player).set("logSkill","cxyFanGong");
          },
        },
        cxyJieLve:{
          trigger:{source:"damageEnd"},
          filter:function(event,player){
            if(!event.player.isAlive() || event.player==player)return false;
            return event.player.num("hej") > 0;
          },
          logTarget:"player",
          content:function(){
            "step 0"
            var num = 0;
            if(trigger.player.num("h"))num++;
            if(trigger.player.num("e"))num++;
            if(trigger.player.num("j"))num++;
            if(num){
              player.gainPlayerCard(trigger.player,"hej",num,true).set("filterButton",function(button){
                for(var i=0;i<ui.selected.buttons.length;i++){
                  if(get.position(button.link)==get.position(ui.selected.buttons[i].link)) return false;
                }
                return true;
              });
            } else {
              event.finish();
            }
            "step 1"
            player.link();
          },
        },
        cxyMoQu:{
          group:["cxyMoQu_sub1","cxyMoQu_sub2"],
          subSkill:{
            sub1:{
              trigger:{global:"phaseEnd"},
              filter:function(event,player){
                return player.num('h') <= player.hp;
              },
              forced:true,
              content:function(){
                player.draw(2);
              },
            },
            sub2:{
              trigger:{global:"damageEnd"},
              filter:function(event,player){
                return event.player!=player&&get.attitude(player,event.player)>0;
              },
              forced:true,
              content:function(){
                player.chooseToDiscard("魔躯：其他友方角色受到伤害后，你弃置一张牌","he",true);
              },
            },
          },
        },
        cxyYaoWu:{
          trigger:{player:"damageBegin"},
          filter:function(event,player){
            if(!event.source||!event.source.isAlive())return false;
            return event.card&&event.card.name=="sha"&&get.color(event.card)=="red";
          },
          forced:true,
          content:function(){
            "step 0"
            if(trigger.source.hp==trigger.source.maxHp){
              trigger.source.draw();
              event.finish();
            } else {
              trigger.source.chooseControl("回血","摸牌",function(event,player){
                return "回血";
              }).prompt="耀武：请选择回血或摸牌";
            }
            "step 1"
            if(result.control=="回血"){
              trigger.source.recover();
            } else {
              trigger.source.draw();
            }
          },
        },
        cxyYingHun:{
          trigger:{player:"phaseZhunbeiBegin"},
          filter:function(event,player){
            return player.hp < player.maxHp;
          },
          direct:true,
          content:function(){
            "step 0"
            player.chooseTarget("是否发动英魂？",function(card,player,target){
              return target!=player;
            }).ai=function(target){
              if(get.attitude(player,target)>2)return 5 + Math.random();
              var draw = player.maxHp - player.hp;
              var num = target.num('he') + 1;
              if(num==draw)return 4;
              if(num < draw)return Math.min(1,4 - (draw-num));
              return Math.min(1,4 - (draw-num)*0.5);
            };
            "step 1"
            if(result.bool){
              event.num = player.maxHp - player.hp;
              event.target = result.targets[0];
              event.list = ["摸"+event.num+"弃1","摸1弃"+event.num];
              player.chooseControl(event.list,function(event,player){
                if(get.attitude(player,event.target)>0)return event.list[0];
                return event.list[1];
              }).prompt="英魂：请选择一项";
            } else {
              event.finish();
            }
            "step 2"
            player.logSkill("cxyYingHun",event.target);
            if(result.control==event.list[0]){
              event.target.draw(event.num);
              event.num = 1;
            } else {
              event.target.draw(1);
            }
            "step 3"
            event.target.chooseToDiscard("英魂：请弃置"+event.num+"张牌",event.num,"he",true);
          },
          ai:{
            //优先攻击孙坚
    				threaten:80,
          },
        },
        cxyPoLu:{
          group:["cxyPoLu_sub1","cxyPoLu_sub2"],
          ai:{
            //优先攻击孙坚
            threaten:80,
          },
          subSkill:{
            sub1:{
              trigger:{player:"dieBegin"},
              forced:true,
              content:function(){
                "step 0"
                if(player.storage.cxyPoLu==undefined){
                  player.storage.cxyPoLu = 0;
                }
                player.storage.cxyPoLu++;
                event.targets = game.filterPlayer(function(target){
                  return target!=player&&get.attitude(player,target)>0;
                });
                event.targets.sort(lib.sort.seat);
                "step 1"
                player.line(event.targets);
                game.asyncDraw(event.targets,player.storage.cxyPoLu);
              },
            },
            sub2:{
              trigger:{global:"dieAfter"},
              filter:function(event,player){
                return event.source&&get.attitude(player,event.player)<0&&get.attitude(player,event.source)>0;
              },
              forced:true,
              content:function(){
                "step 0"
                if(player.storage.cxyPoLu==undefined){
                  player.storage.cxyPoLu = 0;
                }
                player.storage.cxyPoLu++;
                event.targets = game.filterPlayer(function(target){
                  return get.attitude(player,target)>0;
                });
                event.targets.sort(lib.sort.seat);
                "step 1"
                player.line(event.targets);
                game.asyncDraw(event.targets,player.storage.cxyPoLu);
              }
            },
          },
        },      
        //搬运诸侯伐董扩展到这.*//
        oldfuman:{
                audio:"fuman",
                enable:"phaseUse",
                filterTarget:function(card,player,target){
        return !target.hasSkill('oldfuman2')&&target!=player;
    },
                filter:function(event,player){
        return player.countCards('h','sha');
    },
                discard:false,
                lose:false,
                delay:false,
                filterCard:{
                    name:"sha",
                },
                content:function(){
        target.gain(cards,player,'giveAuto').gaintag.add('oldfuman');
        target.storage.oldfuman2=player;
        target.addTempSkill('oldfuman2',{player:'phaseAfter'});
    },
                check:function(card){
        return 6-get.value(card);
    },
                ai:{
                    order:2,
                    result:{
                        target:function(player,target){
                if(!target.hasSha()) return 1.2;
                return 1;
            },
                    },
                },
            },
        "oldfuman2":{
                mod:{
                    aiOrder:function(player,card,num){
            if(get.itemtype(card)=='card'&&card.hasGaintag('oldfuman')&&player.storage.oldfuman2.isIn()) return num+get.sgn(get.attitude(player,player.storage.oldfuman2));
        },
                },
                trigger:{
                    player:"useCard",
                },
                forced:true,
                filter:function(event,player){
        if(!player.storage.oldfuman2.isIn()) return false;
        return player.getHistory('lose',function(evt){
            if(evt.getParent()!=event) return false;
            for(var i in evt.gaintag_map){
                if(evt.gaintag_map[i].contains('oldfuman')) return true;
            }
            return false;
        }).length>0;
    },
                mark:true,
                intro:{
                    content:"下个回合结束之前使用“抚蛮”牌时，令$摸一张牌",
                },
                content:function(){
        'step 0'
        game.delayx();
        'step 1'
        player.line(player.storage.oldfuman2,'green');
        player.storage.oldfuman2.draw();
    },
                onremove:function(player){
        delete player.storage.oldfuman2;
        player.removeGaintag('oldfuman');
    },
            },
            txhuao:{
			trigger:{player:'phaseBegin'},
				forced:true,
				audio:1,	
				content:function(){
					'step 0'
					var card=get.cardPile(function(card){
						return card.name=='sha';
					});
					if(card) player.gain(card,'gain2');		
				},
			},
			hgkurou:{
				audio:"kurou",
				enable:"phaseUse",
				usable:1,
				filterCard:true,
				check:function(card){
					return 8-get.value(card);
				},
				position:"he",
				content:function(){
					player.loseHp();
					player.draw(3);
					player.addTempSkill('hgkurou_effect','phaseAfter');
				},
				ai:{
					order:8,
					result:{
						player:function(player){
							if(player.hp<=2) return player.countCards('h')==0?1:0;
							if(player.countCards('h',{name:'sha',color:'red'})) return 1;
							return player.countCards('h')<=player.hp?1:0;
						},
					},
				},
			},
			hgkurou_effect:{
				mod:{
					cardUsable:function(card,player,num){
						if(card.name=='sha') return num+1;
					},
				},
			},
			gdsanchen:{
				audio:'sanchen',
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					var stat=player.getStat('sanchen');
					return game.hasPlayer(function(current){
						return (!stat||!stat.contains(current));
					});
				},
				filterTarget:function(card,player,target){
					var stat=player.getStat('sanchen');
					return (!stat||!stat.contains(target));
				},
				content:function(){
					'step 0'
					var stat=player.getStat();
					if(!stat.sanchen) stat.sanchen=[];
					stat.sanchen.push(target);
					target.draw(3);
					'step 1'
					if(!target.countCards('he')) event.finish();
					else target.chooseToDiscard('he',true,3).set('ai',function(card){
						var list=ui.selected.cards.map(function(i){
							return get.type2(i);
						});
						if(!list.contains(get.type2(card))) return 7-get.value(card);
						return -get.value(card);
					});
					'step 2'
					if(result.bool&&result.cards&&result.cards.length){
						var list=[];
						for(var i of result.cards) list.add(get.type2(i));
						if(list.length==result.cards.length){
							target.draw();
							player.getStat('skill').gdsanchen--;
							player.addMark('gdsanchen',1);
						}
					}
					else{
						target.draw();
						player.getStat('skill').sanchen--;
						player.addMark('gdsanchen',1);
					}
				},
				ai:{
					order:9,
					threaten:1.7,
					result:{
						target:function(player,target){
							if(target.hasSkillTag('nogain')) return 0.1;
							return Math.sqrt(target.countCards('he'));
						},
					},
				},
				marktext:'陈',
				intro:{
					name2:'陈',
					content:'mark',
				},
			},
			txlveming:{
				init:function(player){
					player.storage.txlveming=0;
				},
				mark:true,
				intro:{
					content:"已发动过#次",
				},
				audio:"xinfu_lveming",
				enable:"phaseUse",
				usable:1,
				filterTarget:function(card,player,target){
					return player!=target&&target.countCards('e')>player.countCards('e');
				},
				content:function(){
					"step 0"
					var list=[1,2,3,4,5,6,7,8,9,10,11,12,13].map((i)=>get.strNumber(i));
					target.chooseControl(list).set('ai',function(){
						return get.rand(0,12);
					}).set('prompt','请选择一个点数');
					"step 1"
					if(result.control){
						target.$damagepop(result.control,'thunder');
						var num=result.index+1;
						event.num=num;
					}
					else{
						target.$damagepop('K','thunder');
						event.num=13;
					};
					game.log(target,'选择的点数是','#y'+get.strNumber(event.num));
					player.storage.txlveming++;
					player.judge(function(card){
						if(card.number==_status.event.getParent('txlveming').num) return 4;
						return 0;
					});
					"step 2"
					if(result.bool==true){
						target.damage(3);
					}
					else{
						var card=target.getCards('hej').randomGet();
						player.gain(card,target,'giveAuto','bySelf');
						target.damage(1);
					}
				},
				ai:{
					order:9,
					result:{
						target:function(player,target){
							var numj=target.countCards('j');
							var numhe=target.countCards('he');
							if(numhe==0) return numj>0?6:-6;
							return -6-(numj+1)/numhe;
						},
					},
					threaten:1.1,
				},
			},	
			txdaoxi:{
				audio:"jixi",
				usable:3,
				filter:function(event,player){
					return player.countCards('hes',{color:'red'})>0;
				},
				enable:'chooseToUse',
				filterCard:function(card){
					return get.color(card)=='red';
				},
				position:'hes',
				viewAs:{name:'shunshou'},
				prompt:'将一张红色牌当顺手牵羊使用',
				check:function(card){return 6-get.value(card)},
				ai:{
					threaten:1.5
				}
			},
			txlangxi:{
				audio:"xinfu_langxi",
				trigger:{
			player:"phaseZhunbeiBegin",
				},
				direct:true,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current!=player;
					});
				},
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('txlangxi'),'对一名体力值不大于你的其他角色造成2-4点随机伤害',function(card,player,target){
						return target!=player;
					}).set('ai',function(target){
						var player=_status.event.player;
						return get.damageEffect(target,player,player);
					});
					"step 1"
					if(result.bool&&result.targets&&result.targets.length){
						player.logSkill('txlangxi',result.targets);
						var num=[2,3,4].randomGet();
						if(get.isLuckyStar(player)) num=4;
						player.line(result.targets[0],'green');
						result.targets[0].damage(num);
					}
				},
				ai:{
					expose:0.25,
					threaten:1.7,
				},
			},	
			txkuangyi:{
				usable:1,
				audio:"xinfu_yisuan",
				trigger:{
					player:"useCardEnd",
				},
				check:function(event,player){
					return get.value(event.cards)+player.maxHp*2-18>0;
				},
				prompt2:function(event,player){
					return '你横置武将牌，然后获得'+get.translation(event.cards.filterInD())+'。';
				},
				filter:function(event,player){
					return player.isPhaseUsing()&&get.type(event.card)!=='trick'&&get.type(event.card)=='basic'&&event.cards.filterInD().length>0;
				},
				content:function(){
					player.link();
					player.gain(trigger.cards.filterInD(),'gain2','log');
				},
			},			
			txtanbei:{
				audio:"xinfu_tanbei",
				enable:"phaseUse",
				usable:1,
				filterTarget:function(card,player,target){
					return player!=target;
				},
				content:function(){
					"step 0"
					if(target.countCards('hej')==0){
						event._result={index:1};
					}
					else{
						target.chooseControl().set('choiceList',[
				'令'+get.translation(player)+'随机获得你区域内的一张牌，然后其本回合内不能再对你使用牌。',
				'令'+get.translation(player)+'本回合内对你使用牌没有次数与距离限制。',
						]).set('ai',function(){
							var list=[0,1];
							return list.randomGet();
						});
					}
					"step 1"
			     	player.addTempSkill('txtanbei_effect3');	
					if(result.index==0){
						var card=target.getCards('hej').randomGet();
						player.gain(card,target,'giveAuto','bySelf');
						target.addTempSkill('txtanbei_effect2');	
					}
					else{
						target.addTempSkill('txtanbei_effect1');
						target.addTempSkill('fengyin');
					}
				},
				ai:{
					order:function(){
						return [2,4,6,8,10].randomGet();
					},
					result:{
						target:function(player,target){
							return -2-target.countCards('h');
						},
					},
					threaten:1.1,
				},
			},
			txtanbei_effect3:{
				charlotte:true,
				mod:{
					targetInRange:function(card,player,target){
						if(target.hasSkill('txtanbei_effect1')){
							return true;
						}
					},
					cardUsableTarget:function(card,player,target){
						if(target.hasSkill('txtanbei_effect1')) return true;
					},
					playerEnabled:function(card,player,target){
						if(target.hasSkill('txtanbei_effect2')) return true;
					},
				},
			},
			"txtanbei_effect1":{
				charlotte:true,
			},
			"txtanbei_effect2":{
				charlotte:true,
			},
			ljxuechi:{
				audio:2,
		trigger:{global:'recoverBefore'},
				filter:function(event,player){
					return player.countCards('h')<3;
				},
				forced:true,
				direct:true,
				content:function(){
					trigger.player.logSkill('ljxuechi',player);
					trigger.cancel();
					player.draw();
				}
			},
			txzhuxin: {
                        trigger: {
                            global: "dying",
                        },
                        filter: function (event, player) {
                            return event.source == player;
                        },
                        forced: true,
                        content: function () {
                            trigger.player.die()._triggered = null;
                        },
                    },
               txyicheng:{
				audio:"gzyicheng",
	trigger:{global:'useCardToTargeted'},
				filter:function(event,player){
					return event.card.name=='sha';
				},
				preHidden:true,			
				content:function(){
					'step 0'
					trigger.target.draw();
					'step 1'
					trigger.target.chooseToDiscard('he',true);
				}
			},
			txnianrui:{
		trigger:{player:'phaseDrawBegin'},
				forced:true,
				content:function(){
					trigger.num+=2;
				},
				ai:{
					threaten:1.6
				}
			},
			txmengtai:{
		group:['txmengtai_begin','txmengtai_draw','txmengtai_use',
				'txmengtai_discard','txmengtai_end'],
				subSkill:{
					begin:{
						trigger:{player:'phaseZhunbeiBegin'},
						forced:true,
						popup:false,
						content:function(){
							player.storage.txmengtai_draw=true;
							player.storage.txmengtai_use=true;
						}
					},
					draw:{
						trigger:{player:'phaseDrawBegin'},
						forced:true,
						popup:false,
						content:function(){
							player.storage.txmengtai_draw=false;
						}
					},
					use:{
						trigger:{player:'phaseUseBegin'},
						forced:true,
						popup:false,
						content:function(){
							player.storage.txmengtai_use=false;
						}
					},
					discard:{
						trigger:{player:'phaseDiscardBefore'},
						forced:true,
						filter:function(event,player){
							if(player.storage.txmengtai_use) return true;
							return false;
						},
						content:function(){
							trigger.cancel();
						}
					},
					end:{
						trigger:{player:'phaseJieshuBegin'},
						forced:true,
						filter:function(event,player){
							if(player.storage.txmengtai_draw) return true;
							return false;
						},
						content:function(){
							player.draw(3);
						}
					}
				}
			},
			txshouyi:{
				mod:{
					targetInRange:function(){
						return true;
					}
				},
			},
			txrenxing:{
				trigger:{global:['damageEnd','recoverEnd']},
				forced:true,
				filter:function(event,player){
					return _status.currentPhase!=player;
				},
				content:function(){
					player.draw();
				}
			},
			txyinli:{
				audio:2,
			trigger:{global:'phaseEnd'},
				forced:true,
				filter:function(event,player){
					return player!=event.player&&game.getGlobalHistory('cardMove',function(evt){
						if(evt.name!='lose'||evt.type!='discard') return false;
						for(var i of evt.cards){
							if(get.type(i,false)=='equip'&&get.position(i,true)=='d') return true;
						}
						return false;
					}).length>0;
				},
				content:function(){
					'step 0'
					var cards=[];
					game.getGlobalHistory('cardMove',function(evt){
						if(evt.name!='lose'||evt.type!='discard') return false;
						for(var i of evt.cards){
							if(get.type(i,false)=='equip'&&get.position(i,true)=='d') cards.push(i);
						}
					});				
					player.chooseButton(['姻礼：获得装备牌',cards],[1,Infinity]).set('ai',function(button){
						return get.value(button.link,_status.event.player);
					});
					'step 1'
					if(result.bool) player.gain(result.links,'gain2');
				},
			},
			txzhulian: {
                            audio: "mouzhu",
                            trigger: {
                                global: "gameStart",
                            },
                            forced: true,
                            content: function() {
                                if (!player.isLinked()) player.link();
                            },
                            ai: {
                                result: {
                                    player: function(player, target) {
                                        return 1;
                                    }
                                }
                            },
                            group: ["txzhulian_link", "txzhulian_damage"],
                            subSkill: {

                                link: {
                                    audio: "mouzhu",
                                    trigger: {
                                        player: "linkAfter",
                                    },
                                    filter: function(event, player) {
                                        return !player.isLinked();
                                    },
                                    forced: true,
                                    content: function() {
                                        player.link();
                                    },
                                },
                                damage: {
                                    audio: "mouzhu",
                                    trigger: {
                                        player: "damageBegin",
                                    },
                                    forced: true,
                                    content: function() {
                                        var players = game.filterPlayer();
                                        for (var i = 0; i < players.length; i++) {
                                            if (players[i] == player) continue;
                                            if (get.distance(player, players[i], 'attack') > 1) continue;
                                            if (players[i].isLinked()) continue;
                                            players[i].link();
                                        }
                                    },
                                    ai: {
                                        effect: {
                                            target: function(card, player, target, current) {
                                                if (card.name == 'tiesuo') return 'zerotarget';
                                                if (get.tag(card, 'damage') && get.tag(card, 'natureDamage')) {
                                                    var players = game.filterPlayer();
                                                    var count = 0;
                                                    for (var i = 0; i < players.length; i++) {
                                                        if (players[i] == target) continue;
                                                        if (get.distance(target, players[i], 'attack') > 1) continue;
                                                        if (players[i].isLinked()) continue;
                                                        count += get.damageEffect(players[i], player, target);
                                                    }
                                                    return [1, count];
                                                }
                                            },
                                        },
                                    },
                                },
                            },
                        },
               txkeji:{
				audio:"keji",
				forced:true,
				trigger:{
			player:"phaseDiscardBegin",
				},
				filter:function(event,player){
					var list=[];
					player.getHistory('useCard',function(evt){
						if(evt.isPhaseUsing(player)){
							var color=get.color(evt.card);
							if(color!='nocolor') list.add(color);
						}
					});
					return list.length<=1;
				},
				content:function(){
					player.addTempSkill('txkeji_add','phaseAfter');
				},
			},
			txkeji_add:{
				mod:{
		maxHandcard:function(player,num){
						return num+4;
					},
				},
			},
			txnangce: {
            audio:1,
                            trigger: {
                                player: "useCard",
                            },
                            filter: function(event, player) {
                                return get.type(event.card) == 'trick';
                            },
                            check: function(event, player) {
                                return get.attitude(player, _status.currentPhase) > 0;
                            },
                            content: function() {
                                player.line(_status.currentPhase, 'green');
                                _status.currentPhase.draw();
                            },
                            ai: {
                                threaten: 1.4,
                                noautowuxie: true,
                            },
                        },
           txduanzui:{
			skillAnimation:true,
			animationColor:'fire',
			audio:true,
			trigger:{player:'phaseEnd'},
			//forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].num('h')) return true;
				}
				return false;
			},
			content:function(){
				"step 0"
				var players=get.players(player);
				players.remove(player);
				event.players=players;
				"step 1"
				if(event.players.length){
					var current=event.players.shift();
					var hs=current.get('h')
					if(hs.length&&hs.length<3){
						current.damage('fire',3-hs.length);
					}
					event.redo();
				}
			}			
		},
		txyingyang:{
				audio:2,
				trigger:{player:'compare',target:'compare'},
				filter:function(event){
					return !event.iwhile;
				},
				direct:true,
				preHidden:true,
				content:function(){
					'step 0'
					player.chooseControl('点数+3','点数-3','cancel2').set('prompt',get.prompt2('txyingyang')).set('ai',function(){
						if(_status.event.small) return 1;
						else return 0;
					}).set('small',trigger.small);
					'step 1'
					if(result.index!=2){
						player.logSkill('txyingyang');
						if(result.index==0){
							game.log(player,'拼点牌点数+3');
							if(player==trigger.player){
								trigger.num1+=3;
								if(trigger.num1>13) trigger.num1=13;
							}
							else{
								trigger.num2+=3;
								if(trigger.num2>13) trigger.num2=13;
							}
						}
						else{
							game.log(player,'拼点牌点数-3');
							if(player==trigger.player){
								trigger.num1-=3;
								if(trigger.num1<1) trigger.num1=1;
							}
							else{
								trigger.num2-=3;
								if(trigger.num2<1) trigger.num2=1;
							}
						}
					}

				}
			},
			mdqianxi7:{
				audio:"qianxi",
	trigger:{player:'phaseZhunbeiBegin'},
				preHidden:true,
				content:function(){
					"step 0"
					player.draw();
					player.chooseToDiscard('he',true);
					"step 1"
					if(!result.bool){
						event.finish();
						return;
					}
					event.color=get.color(result.cards[0],result.cards[0].original=='h'?player:false);
					player.chooseTarget(function(card,player,target){
						return player!=target&&get.distance(player,target)<=1;
					},true).set('ai',function(target){
						return -get.attitude(_status.event.player,target);
					});
					"step 2"
					if(result.bool&&result.targets.length){
						result.targets[0].storage.mdqianxi72=event.color;
						result.targets[0].addTempSkill('mdqianxi72');
						player.line(result.targets,'green');
						game.addVideo('storage',result.targets[0],['mdqianxi72',event.color]);
					}
				},
				ai:{
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						if(!arg.target.hasSkill('mdqianxi72')) return false;
						if(arg.card.name=='sha') return arg.target.storage.mdqianxi72=='red'&&(!arg.target.getEquip('bagua')||player.hasSkillTag('unequip',false,{
							name:arg.card?arg.card.name:null,
							target:arg.target,
							card:arg.card
						})||player.hasSkillTag('unequip_ai',false,{
							name:arg.card?arg.card.name:null,
							target:arg.target,
							card:arg.card
						}));
						return arg.target.storage.mdqianxi72=='black';
					}
				},
			},
			mdqianxi72:{
				//trigger:{global:'phaseAfter'},
				forced:true,
				mark:true,
				audio:false,
				content:function(){
					player.removeSkill('mdqianxi72');
					delete player.storage.mdqianxi72;
				},
				mod:{
					cardEnabled2:function(card,player){
						if(get.color(card)==player.storage.mdqianxi72&&get.position(card)=='h') return false;
					},
				},
				intro:{
					content:function(color){
						return '不能使用或打出'+get.translation(color)+'的手牌';
					}
				}
			},
			mdqianxi:{
				audio:"qianxi",
	trigger:{player:'phaseZhunbeiBegin'},
				content:function(){
					"step 0"
					player.judge();
					"step 1"
					event.color=result.color;
					player.chooseTarget(function(card,player,target){
						return player!=target&&get.distance(player,target)<=1;
					},true).set('ai',function(target){
						return -get.attitude(_status.event.player,target);
					});
					"step 2"
					if(result.bool&&result.targets.length){
						result.targets[0].storage.mdqianxi72=event.color;
						result.targets[0].addSkill('mdqianxi72');
						player.line(result.targets,'green');
						game.addVideo('storage',result.targets[0],['mdqianxi72',event.color]);
					}
				},
			},
			zylongdan:{
				group:["zylongdan_sha","zylongdan_shan","zylongdan_draw","zylongdan_shamiss","zylongdan_shanafter"],
				subSkill:{
					shanafter:{
						sub:true,
						audio:"longdan_sha",
						trigger:{
							player:"useCard",
						},
						//priority:1,
						filter:function(event,player){
							return event.skill=='zylongdan_shan'&&event.getParent(2).name=='sha';
						},
						direct:true,
						content:function(){
							"step 0"
							player.chooseTarget("是否发动【龙胆】令一名其他角色回复1点体力？",function(card,player,target){
								return target!=_status.event.source&&target!=player&&target.isDamaged();
							}).set('ai',function(target){
								return get.attitude(_status.event.player,target);
							}).set('source',trigger.getParent(2).player);
							"step 1"
							if(result.bool&&result.targets&&result.targets.length){
								player.logSkill('zylongdan',result.targets[0]);
								result.targets[0].recover();
							}
						},
					},
					shamiss:{
						sub:true,
						audio:"longdan_sha",
						trigger:{
							player:"shaMiss",
						},
						direct:true,
						filter:function(event,player){
							return event.skill=='zylongdan_sha';
						},
						content:function(){
							"step 0"
							player.chooseTarget("是否发动【龙胆】对一名其他角色造成1点伤害？",function(card,player,target){
								return target!=_status.event.target&&target!=player;
							}).set('ai',function(target){
								return -get.attitude(_status.event.player,target);
							}).set('target',trigger.target);
							"step 1"
							if(result.bool&&result.targets&&result.targets.length){
								player.logSkill('zylongdan',result.targets[0]);
								result.targets[0].damage();
							}
						},
					},
					draw:{
						trigger:{
							player:["useCard","respond"],
						},
						audio:"longdan_sha",
						forced:true,
						locked:false,
						filter:function(event,player){
							if(!get.zhu(player,'shouyue')) return false;
							return event.skill=='zylongdan_sha'||event.skill=='zylongdan_shan';
						},
						content:function(){
							player.draw();
							//player.storage.fanghun2++;
						},
						sub:true,
					},
					sha:{
						audio:"longdan_sha",
						enable:["chooseToUse","chooseToRespond"],
						filterCard:{
							name:"shan",
						},
						viewAs:{
							name:"sha",
						},
						position:'hs',
						viewAsFilter:function(player){
							if(!player.countCards('hs','shan')) return false;
						},
						prompt:"将一张闪当杀使用或打出",
						check:function(){return 1},
						ai:{
							effect:{
								target:function(card,player,target,current){
									if(get.tag(card,'respondSha')&&current<0) return 0.6
								},
							},
							respondSha:true,
							skillTagFilter:function(player){
								if(!player.countCards('hs','shan')) return false;
							},
							order:function(){
								return get.order({name:'sha'})+0.1;
							},
						},
						sub:true,
					},
					shan:{
						audio:"longdan_sha",
						enable:['chooseToRespond','chooseToUse'],
						filterCard:{
							name:"sha",
						},
						viewAs:{
							name:"shan",
						},
						position:'hs',
						prompt:"将一张杀当闪使用或打出",
						check:function(){return 1},
						viewAsFilter:function(player){
							if(!player.countCards('hs','sha')) return false;
						},
						ai:{
							respondShan:true,
							skillTagFilter:function(player){
								if(!player.countCards('hs','sha')) return false;
							},
							effect:{
								target:function(card,player,target,current){
									if(get.tag(card,'respondShan')&&current<0) return 0.6
								},
							},
						},
						sub:true,
					},
				},
			},
			zglkongcheng:{
        audio:2,
			group:["zglkongcheng_gain","zglkongcheng_got"],
				subSkill:{
					gain:{
						audio:"zglkongcheng",
						trigger:{
							player:"gainBefore",
						},
						filter:function(event,player){
							return event.source&&event.source!=player&&player!=_status.currentPhase&&!event.bySelf&&player.countCards('h')==0;
						},
						content:function(){
							trigger.name='addToExpansion';
							trigger.setContent('addToExpansion');
							trigger.gaintag=['zglkongcheng'];
							trigger.untrigger();
							trigger.trigger('addToExpansionBefore');
						},
						sub:true,
						forced:true,
					},
					got:{
						trigger:{
							player:"phaseDrawBegin1",
						},
						filter:function(event,player){
							return player.getExpansions('zglkongcheng').length>0;
						},
						content:function(){
							player.gain(player.getExpansions('zglkongcheng'),'draw');
						},
						sub:true,
						forced:true,
					},
				},
			audio:"zglkongcheng",
				trigger:{
					target:"useCardToTarget",
				},
				forced:true,
				check:function(event,player){
					return get.effect(event.target,event.card,event.player,player)<0;
				},
				filter:function(event,player){
					return player.countCards('h')==0&&(event.card.name=='sha'||event.card.name=='juedou');
				},
				content:function(){
					trigger.getParent().targets.remove(player);
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(target.countCards('h')==0&&(card.name=='sha'||card.name=='juedou')) return 'zeroplayertarget';
						},
					},
				},
				intro:{
					markcount:'expansion',
					mark:function(dialog,content,player){
						var content=player.getExpansions('zglkongcheng');
						if(content&&content.length){
							if(player==game.me||player.isUnderControl()){
								dialog.addAuto(content);
							}
							else{
								return '共有'+get.cnNumber(content.length)+'张牌';
							}
						}
					},
					content:function(content,player){
						var content=player.getExpansions('zglkongcheng');
						if(content&&content.length){
							if(player==game.me||player.isUnderControl()){
								return get.translation(content);
							}
							return '共有'+get.cnNumber(content.length)+'张牌';
						}
					},
				},
				onremove:function(player,skill){
					var cards=player.getExpansions(skill);
					if(cards.length) player.loseToDiscardpile(cards);
				},
			},
			txjuxiang:{
				audio:"sbjuxiang",
				trigger:{
					player:'phaseJieshuBegin',
				},
				forced:true,
				direct:true,
				filter:function(event,player){
					return !player.hasHistory('useCard',evt=>evt.card.name=='nanman')&&(!_status.txjuxiang_nanman||_status.txjuxiang_nanman.length);
				},
				group:['txjuxiang_cancel','txjuxiang_gain'],
				content:function(){
					'step 0'
					if(!_status.txjuxiang_nanman){
						_status.txjuxiang_nanman=[
							{name:'nanman',number:7,suit:'spade'},				
  {name:'nanman',number:9,suit:'club'},
						];
						game.broadcastAll(function(){
							if(!lib.inpile.contains('nanman')) lib.inpile.add('nanman');
						});
					}
					player.chooseTarget(get.prompt('txjuxiang'),'将游戏外的随机一张【南蛮入侵】交给一名角色（剩余'+get.cnNumber(_status.txjuxiang_nanman.length)+'张）').set('ai',target=>{
						var player=_status.event.player;
						return Math.max(0,target.getUseValue({name:'nanman'}))*get.attitude(player,target)*(target==player?0.5:1);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('txjuxiang',target);
						if(!_status.txjuxiang_nanman.length) return;
						var info=_status.txjuxiang_nanman.randomRemove();
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
			txdaoji:{
				audio:'daoji',
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.hasCard(lib.skill.txdaoji.filterCard,'he');
				},
				filterCard:function(card){
					return get.type(card)!='basic';
				},
				position:'he',
				filterTarget:function(card,player,target){
					return target!=player&&target.hasCard((card)=>lib.filter.canBeGained(card,target,player),'he');
				},
				check:function(card){
					return 8-get.value(card);
				},
				content:function(){
					'step 0'
					player.gainPlayerCard(target,'he',true);
					'step 1'
					if(result.bool&&result.cards&&result.cards.length==1){
						var card=result.cards[0];
						if(player.getCards('h').contains(card)){
							var type=get.type(card);
							if(type=='basic') player.draw();
							else if(type=='equip'){
								if(player.hasUseTarget(card)) player.chooseUseTarget(card,'nopopup',true);
								target.damage('nocard');
							}
						}
					}
				},
				ai:{
					order:6,
					result:{
						target:function(player,target){
							var eff=get.effect(target,{name:'shunshou_copy2'},player,target);
							if(target.countCards('e')>0) eff+=get.damageEffect(target,player,target);
							return eff;
						},
					},
				},
			},
			txhj_suoming:{
	trigger:{player:'phaseJieshuBegin'},
				direct:true,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current!=player&&!current.isLinked();
					});
				},
				content:function(){
					"step 0"
					var num=game.countPlayer(function(current){
						return current!=player&&!current.isLinked();
					});
					player.chooseTarget(get.prompt('txhj_suoming'),[1,num],function(card,player,target){
						return !target.isLinked()&&player!=target;
					}).ai=function(target){
						return -get.attitude(player,target);
					}
					"step 1"
					if(result.bool){
						player.logSkill('txhj_suoming',result.targets);
						event.targets=result.targets;
						event.num=0;
					}
					else{
						event.finish();
					}
					"step 2"
					if(event.num<event.targets.length){
						event.targets[event.num].link();
						event.num++;
						event.redo();
					}
				},
			},
	  txhj_huangmen:{
        trigger:{
        player:["phaseZhunbeiBegin","phaseJieshuBegin"],
    },
    forced:true,
    filter:function(event,player){
    return player.countCards('h') === 0;
    },
    content:function(){
    var players= player.getEnemies();
    'step 0'
    player.chooseControl(['摸两张牌', '随机获得一名敌方角色的一张牌。']).set('prompt','黄门：请选择一项').set('ai',function(){
        return Math.random() < 0.5 ? 0 : 1;
    });
    'step 1'
    if(result.index === 0){
        player.draw(2);
    } else {
        var target = players.randomGet();
        var cards = target.getCards('he');
        if(cards.length > 0){
            player.gain(cards.randomGet(), 'gain2');
        }
     }
    }
 },
 txhj_mouqiang:{
            audio:2,
			trigger:{player:'damageEnd'},
					filter:function(event,player){
					return event.num>1&&event.source;
				},
					content:function(){
					'step 0'
					player.chooseTarget(get.prompt('txhj_mouqiang'),function(card,player,target){
						return true;
					}).set('ai',function(target){
						return get.attitude(player,target);
					});
					'step 1'
					if(result.bool){
						player.logSkill('txhj_mouqiang',result.targets);
						player.gainPlayerCard(result.targets[0],Math.floor(trigger.num/2),'he',true);
						result.targets[0].damage();
					}
					'step 2'
					if(result.bool){
					result.cards.forEach(i => get.type(i) === 'basic' ? player.recover() : trigger.source.damage());
					}
				}
			},
			txhj_suzhi:{
		audio:'gzsuzhi',
		derivation:'fankui',
		mod:{
			targetInRange:function(card,player,target){
				if(player==_status.currentPhase&&player.countMark('txhj_suzhi_count')<3&&get.type2(card)=='trick') return true;
			},
		},
		trigger:{player:'phaseJieshuBegin'},
		forced:true,
		filter:function(event,player){
			return player.countMark('txhj_suzhi_count')<3;
		},
		content:function(){
			player.addTempSkill('fankui',{player:'phaseBegin'});
		},
		group:['txhj_suzhi_damage','txhj_suzhi_draw','txhj_suzhi_gain'],
		preHidden:['txhj_suzhi_damage','txhj_suzhi_draw','txhj_suzhi_gain'],
		subSkill:{
			damage:{
				audio:'txhj_suzhi',
				trigger:{source:'damageBegin1'},
				forced:true,
				filter:function(event,player){
					return player==_status.currentPhase&&player.countMark('txhj_suzhi_count')<3&&event.card&&
					(event.card.name=='sha'||event.card.name=='juedou')&&event.getParent().type=='card';
				},
				content:function(){
					trigger.num++;
					player.addTempSkill('txhj_suzhi_count');
					player.addMark('txhj_suzhi_count',1,false);
				},
			},
			draw:{
				audio:'txhj_suzhi',
				trigger:{player:'useCard'},
				forced:true,
				filter:function(event,player){
					return player==_status.currentPhase&&player.countMark('txhj_suzhi_count')<3&&event.card.isCard&&get.type2(event.card)=='trick';
				},
				content:function(){
					player.draw();
					player.addTempSkill('txhj_suzhi_count');
					player.addMark('txhj_suzhi_count',1,false);
				},
			},
			gain:{
				audio:'txhj_suzhi',
				trigger:{global:'loseAfter'},
				forced:true,
				filter:function(event,player){
					if(player!=_status.currentPhase||event.type!='discard'||player==event.player||player.countMark('txhj_suzhi_count')>=3) return false;
					return event.player.countGainableCards(player,'he')>0;
				},
				logTarget:'player',
				content:function(){
					'step 0'
					player.addTempSkill('txhj_suzhi_count');
					player.addMark('txhj_suzhi_count',1,false);
					if(trigger.delay==false) game.delay();
					'step 1'
					player.gainPlayerCard(trigger.player,'he',true);
				},
			},
			count:{
				onremove:true,
			},
		},
	},
	txmanjia:{
				group:['txmanjia1','txmanjia2']
			},
			txmanjia1:{
	trigger:{target:['useCardToBefore','shaBegin']},
				forced:true,
				priority:6,
				filter:function(event,player,name){
					if(player.getEquip(2)) return false;
					if(name=='shaBegin') return lib.skill.tengjia3.filter(event,player);
					return lib.skill.tengjia1.filter(event,player);
				},
				content:function(){
					trigger.cancel();
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(target.getEquip(2)) return;
							return lib.skill.tengjia1.ai.effect.target.apply(this,arguments);
						}
					}
				}
			},
			txmanjia2:{
		trigger:{player:'damageBegin3'},
				filter:function(event,player){
					if(player.getEquip(2)) return false;
					if(event.nature=='fire') return true;
				},
				forced:true,
				check:function(){
					return false;
				},
				content:function(){
					trigger.num++;
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(target.getEquip(2)) return;
							return lib.skill.tengjia2.ai.effect.target.apply(this,arguments);
						}
					}
				}
			},
			//以下此技能是搬运自云将扩展的云花鬘蛮氏技能。
		txmanzhen:{
audio:2,
trigger:{
target:"useCardToBefore",
},
forced:true,
priority:15,
filter:function(event,player){
return event.card.name=='nanman';
},
content:function(){
trigger.cancel();
},
ai:{
effect:{
target:function(card,player,target){
if(card.name=='nanman') return "zeroplayertarget";
},
},
},
group:["txmanzhen_Use","txmanzhen_damage"],
subSkill:{
Use:{
audio:"txmanzhen",
enable:"phaseUse",
viewAs:{
name:"nanman",
},
usable:1,
filterCard:true,
prompt:"将任意张手牌当做【南蛮入侵】并指定等量的角色使用",
selectCard:function(){
if(ui.selected.targets.length) return [ui.selected.targets.length,Math.min(ui.selected.targets.length+1,game.players.length-1)];
return [1,game.countPlayer()-1];
},
check:function(card){
var player=_status.event.player;
if(game.countPlayer(function(current){
return current!=player&&player.canUse('nanman',current)&&get.effect(current,{
name:'nanman'
},player,player)>0;
})<=ui.selected.cards.length) return 0;
return 7-get.value(card);
},
selectTarget:function(){
return ui.selected.cards.length;
},
ai:{
basic:{
order:9,
useful:[5,1],
value:5,
},
result:{
"target_use":function(player,target){
var nh=target.countCards('h');
if(nh==0) return -2;
if(nh==1) return -1.7
return -1.5;
},
target:function(player,target){
var nh=target.countCards('h');
if(nh==0) return -2;
if(nh==1) return -1.7
return -1.5;
},
},
tag:{
respond:1,
respondSha:1,
damage:1,
multitarget:1,
multineg:1,
},
},
sub:true,
},
damage:{
audio: 'txmanzhen',
trigger:{
source:"damageBegin1",
},
check:function(event,player){
if(get.attitude(player,event.player)<0&&player.storage.yunzhanyuan==false&&player.hp>1) return true;
if(get.attitude(player,event.player)<0&&player.storage.yunzhanyuan==true&&player.hp>2) return true;
return false;
},
filter:function(event,player){
return event.player.hp>=player.hp&&event.card&&event.card.name=='nanman';
},
preHidden:true,
prompt:function(event,player){
var str='';
str +='是否失去一点体力令'+get.translation(event.player)+'受到的伤害加一？'
return str;
},
content:function(){
player.loseHp();
trigger.num++;
},
sub:true,
},
},
},
//到这。
           txfusha:{
				audio:1,
				trigger:{source:'damageBegin1'},
				filter:function(event){
					return event.card&&event.card.name=='sha'&&event.notLink();
				},
				forced:true,
				content:function(){
					trigger.num++;
				}
			},
			txleizhou:{
	trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				content:function(){
					var list=game.players.slice(0);
					list.remove(player);
					if(list.length){
						var target=list.randomGet();
						player.line(target);
						target.damage('thunder');
					}
				}
			},
			//小震怒
			txzhennu:{
	trigger:{player:'phaseZhunbeiBegin'},
				direct:true,
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('txzhennu'),function(card,player,target){
						return player!=target;
					}).ai=function(target){
						return get.damageEffect(target,player,player);
					}
					"step 1"
					if(result.bool){
						player.logSkill('txzhennu',result.targets);
						result.targets[0].damage();
					}
				},
			},
			txyongguan:{
				audio:2,
				forced:true,
		trigger:{player:'damageBegin4'},
				marktext:'勇',
				intro:{
					name2:'勇',
					content:'共有#个“勇”',
				},
				content:function(){
					trigger.cancel();
					player.addMark('txyongguan',trigger.num);
				},
				group:'txyongguan_fate',
			},
			txyongguan_fate:{
				audio:'txyongguan',
        trigger:{player:'phaseEnd'},
				forced:true,
				filter:function(event,player){
					return player.countMark('txyongguan')>0;
				},
				content:function(){
					'step 0'
					event.forceDie=true;
					_status.txyongguan=player.countMark('txyongguan');
				/*	player.judge(function(card){
						if(get.number(card)<_status.txyongguan) return -_status.txyongguan;
						return 1;
					}).judge2=function(result){
						return result.bool?true:false;
					};*/
					'step 1'
					delete _status.txyongguan;
					if(!result.bool){
						player.chooseToDiscard([1,player.countMark('txyongguan')],'h').ai=lib.skill.qiangxi.check;
					}
					else event.finish();
					'step 2'
					var num=player.countMark('txyongguan');
					if(result.cards&&result.cards.length) num-=result.cards.length;
					if(num) player.loseHp(num);
					player.removeMark('txyongguan',99999);
				},
			},
     	txchengyuan:{
				audio:"hanyong",
				group:['txchengyuan_color','txchengyuan_color2'],
				subSkill:{
					color:{
						trigger:{player:'phaseZhunbeiBegin'},
						silent:true,
						content:function(){
							player.storage.txchengyuan_color=['black','red'];
						}
					},
					color2:{
						trigger:{player:'useCard'},
						silent:true,
						filter:function(event,player){
							return Array.isArray(player.storage.txchengyuan_color)&&_status.currentPhase==player;
						},
						content:function(){
							player.storage.txchengyuan_color.remove(get.color(trigger.card));
						}
					}
				},
				trigger:{player:'phaseDiscardBegin'},
				direct:true,
				filter:function(event,player){
					if(!player.storage.txchengyuan_color) return false;
					var length=player.storage.txchengyuan_color.length;
					if(length==0) return false;
					var hs=player.getCards('h');
					if(hs.length==0) return false;
					if(length==2) return true;
					var color=player.storage.txchengyuan_color[0];
					for(var i=0;i<hs.length;i++){
						if(get.color(hs[i])==color) return true;
					}
					return false;
				},
				intro:{
					content:'cards'
				},
				init:function(player){
					player.storage.txchengyuan=[];
				},
				content:function(){
					'step 0'
					player.chooseCard(get.prompt('txchengyuan'),function(card){
						return _status.event.player.storage.txchengyuan_color.contains(get.color(card));
					}).set('ai',function(card){
						var player=_status.event.player;
						if(player.storage.txchengyuan.length==2){
							if(!game.hasPlayer(function(current){
								return (current!=player&&
									get.damageEffect(current,player,player)>0&&
									get.attitude(player,current)<0)
							})) return 0;
						}
						return 7-get.value(card);
					});
					'step 1'
					if(result.bool){
						player.logSkill('txchengyuan');
						if(player.storage.txchengyuan.length<2){
							player.$give(result.cards,player);
						}
						player.lose(result.cards,ui.special);
						player.storage.txchengyuan=player.storage.txchengyuan.concat(result.cards);
						player.markSkill('txchengyuan');
						player.syncStorage('txchengyuan');
					}
					else{
						event.finish();
					}
					'step 2'
					if(player.storage.txchengyuan.length==3){
						player.$throw(player.storage.txchengyuan);
						while(player.storage.txchengyuan.length){
							player.storage.txchengyuan.shift().discard();
						}
						player.unmarkSkill('txchengyuan');
						player.chooseTarget(function(card,player,target){
							return target!=player;
						},'对一名其他角色造成两点伤害并弃置其装备区内的牌').set('ai',function(target){
							var player=_status.event.player;
							if(get.attitude(player,target)>0) return -1;
							return get.damageEffect(target,player,player)+target.countCards('e')/2;
						});
					}
					else{
						event.finish();
					}
					'step 3'
					if(result.bool){
						var target=result.targets[0];
						target.damage(2);
						event.target=target;
						player.line(target,'green');
					}
					else{
						event.finish();
					}
					'step 4'
					if(event.target&&event.target.isIn()){
						var es=event.target.getCards('e');
						if(es.length){
							event.target.discard(es);
						}
					}
				},
				ai:{
					threaten:1.5
				}
			},
			txbenji:{
	trigger:{player:'phaseZhunbeiBegin'},
				forceDie:true,
				forced:true,
				content:function(){
					'step 0'
					player.chooseTarget('【奔激】：请选择一名角色，令其受到X点伤害（X为你损失的体力值）。',function(card,player,target){
				return game.hasPlayer(function(current){
						return current!=player;
						})
					}).set('forceDie',true).ai=function(target){
						return -get.attitude(_status.event.player,target);
					};
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.line(target);
						target.damage(player.getDamagedHp());
						if(target.isIn()&&!target.hasHistory('damage',function(evt){
							return evt.getParent('txbenji')==event&&evt._dyinged;
						})) player.loseHp();
					}
				},
			},
			txyonglve:{
				audio:2,
				enable:"chooseCard",
				check:function(event,player){
					var player=_status.event.player;
					return (!player.hasCard(function(card){
						var val=get.value(card);
						return val<0||(val<=4&&(get.number(card)>=11||get.suit(card)=='heart'));
					},'h'))?20:0;
				},
				filter:function(event){
					return event.type=='compare'&&!event.directresult;
				},
				onCompare:function(player){
					return game.cardsGotoOrdering(get.cards()).cards;
			    },					
			},	
			txjiang:{
				shaRelated:true,
				audio:"sbjiang",
				//preHidden:true,	
				usable:1,	
				trigger:{
					player:'useCardToPlayered',
					target:'useCardToTargeted',
				},
				filter:function(event,player){
					if(!(event.card.name=='juedou'||(event.card.name=='sha'))) return false;
					return player==event.target||event.getParent().triggeredTargets3.length==1;
				},
				frequent:true,
				content:function(){
					player.draw(2);
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(card.name=='sha') return [1,0.6];
						},
						player:function(card,player,target){
							if(card.name=='sha') return [1,1];
						}
					}
				}
			},	
			//区分线
			'txhj_oldhuxiao': {
                            shaRelated: true,
                            audio: 'huxiao',
                            trigger: {player: 'shaMiss'},
                            forced: true,
                            content: function () {
                                if (player.stat[player.stat.length - 1].card.sha > 0) {
                                    player.stat[player.stat.length - 1].card.sha--;
                                }
                            }
                        },
                        //--------------------------------------//







                },
                translate: {
                    /*黄天之怒*/
                    "txhj_yaoshu":"妖术",
                    "txhj_yaoshu_info":"出牌阶段限一次，你可以对一名其他角色施法，令其打出或使用的下X张牌无效。",
                    "txhj_zhoufa":"咒法",
                    "txhj_zhoufa_info":"出牌阶段限一次，你可以对一名其他角色施法，对其造成X点雷电伤害。",
                    "txhj_zhouzu":"咒诅",
                    "txhj_zhouzu_info":"出牌阶段限一次，你可以对一名其他角色施法，令其弃置X张牌（不足则全弃），对其造成一点雷电伤害。",
                    "txhj_huangjin":"黄巾",
                    "txhj_huangjin_info":"当你成为【杀】的目标时，你可以判定，若结果与此杀点数之差小于等于1，此【杀】对你无效。",
                    "txhj_guimen":"鬼门",
                    "txhj_guimen_info":"锁定技，当你因弃置而失去♠️牌后，你判定，若结果与失去的牌点数之差小于等于1，你对一名其他角色造成2点雷电伤害。",
                    "txhj_dizhou":"地咒",
                    "txhj_dizhou_info":"准备阶段或结束阶段，你可以将一张牌置于武将牌上，敌方使用与“地咒”牌花色相同的牌时，其判定，若为:黑色，其随机弃置一张牌;♠️，此牌无效;♠️2～9，其失去一点体力。当你受到伤害后，随机移去一张“地咒”",
                    "txhj_didun":"地遁",
                    "txhj_didun_info":"当一名角色的判定牌生效前，你可以打出一张黑色牌替换之，若被替换的判定牌为黑色，你摸一张牌。",
                    "txhj_renwang":"人望",
                    "txhj_renwang_info":"当你使用或打出的牌置入弃牌堆后，将此牌置于武将牌上，称为“方”;你的手牌上限+X;你可以多使用X/5张【杀】(X为“方”数)。",
                    "txhj_renfang":"人方",
                    "txhj_renfang_info":"出牌阶段限一次，你可以移去36张“方”，然后施法：对X名角色造成36点伤害。",
                    "txhj_wangyuan":"亡怨",
                    "txhj_wangyuan_info":"锁定技，当一名角色死亡时，你增加1点体力上限并回复1点体力，然后你本局造成的属性伤害基数+1",
                    "txhj_shiyuan":"尸怨",
                    "txhj_shiyuan_info":"锁定技，你造成的伤害+1;当你进入濒死状态时，你死亡;你杀死的角色复活为【长怨尸兵】并加入你的阵营。",
                    "txhj_zhuhun":"注魂",
                    "txhj_zhuhun_info":"出牌阶段限一次，你可以令一名已死亡的同阵营角色复活为【长怨尸兵】。",
                    "txhj_zhoulei":"咒雷",
                    "txhj_zhoulei_info":"锁定技，当一名角色摸牌后，若该角色与你的手牌数之差大于等于（5-X），你对其造成一点雷电伤害（X为此技能发动次数且至多为5）。",
                    "txhj_guiyan":"诡炎",
                    "txhj_guiyan_info":"锁定技，准备阶段，你选择一名体力值大于等于你的角色，令其获得“燃殇”。若其已拥有“燃殇”，改为你视为对其使用一张【火攻】。本回合你对此角色造成的伤害均视为火焰伤害且伤害+1。",
                    "txhj_xiefeng":"邪风",
                    "txhj_xiefeng_info":"结束阶段，你可弃置至多三张牌，然后摸一张牌。防止你于下X回合受到的非雷电伤害（X为你弃置的牌数）",

                    'txhj_oldhuxiao': '虎啸',
                    'txhj_oldhuxiao_info': '锁定技，当你使用的【杀】被【闪】抵消后，你令此【杀】不计入使用次数',
                    "txhj_datongSkill1": "金鸡独立",
                    // "txhj_datongSkill1_info": "当你进入濒死状态时，你回复体力至1点 (每局游戏限一次).",
                    "txhj_ruiSkill1": "祥云瑞氣",
                    // "txhj_ruiSkill1_info": "出牌阶段结束时，你可以选择x名手牌数小于你的其他角色，对其各造成1点火焰伤害.",
                    "txhj_ruiSkill2": "神妙",
                    // "txhj_ruiSkill2_info": "准备阶段和结束阶段，若你的手牌数为奇数，你令一名角色摸一张牌；若手牌数为偶数，你令一名角色随机弃一张牌.",
                    "txhj_ruiSkill3": "洞若观火",
                    // "txhj_ruiSkill3_info": "当你成为其他角色使用的普通锦囊牌的目标时，你进行判定：若为红色，则此锦囊无效且你获得之.",
                    "txhj_yanSkill1": "神鬼不测",
                    // "txhj_yanSkill1_info": "当你成为其他角色使用的普通锦囊的唯一目标时，你进行判定：若为黑色，则改为你对使用者使用该锦囊.",
                    "txhj_yanSkill2": "反计",
                    // "txhj_yanSkill2_info": "每回合限一次，当你受到其他角色的伤害后，你视为对伤害来源使用一张杀，若该杀造成伤害，则你回复1点体力.",
                    "txhj_yanSkill3": "天外之火",
                    // "txhj_yanSkill3_info": "每回合限一次，当你对其他角色造成伤害后，进行一次判定：黑色你获得其一张牌，红色你摸两张牌.",
                    "aHaoSkill1": "豪门贵胄",
                    // "aHaoSkill1_info": "游戏开始时，你的每个空置的装备区均随机获得并使用一张装备.",
                    "txhj_aHaoSkill2": "神勇",
                    // "txhj_aHaoSkill2_info": "当你失去装备区的牌时，你可以选择x名角色对其各造成1点伤害(x为场上存活的角色数).",
                    "txhj_aHaoSkill3": "攫戾執猛",
                    // "txhj_aHaoSkill3_info": "你摸牌阶段摸牌数、出杀次数、手牌上限+x (x为装备区的个数).",
                    "txhj_luluSkill1": "如虎添翼",
                    // "txhj_luluSkill1_info": "出牌阶段开始时，你摸两张牌.",
                    "txhj_luluSkill2": "虎威",
                    // "txhj_luluSkill2_info": "你于回合内使用第一张[杀]时，若你本回合获得牌数不小于x (x为你的当前体力值)，则你此[杀]不可响应且伤害+1.",
                    "txhj_aleSkill2": "饞嘴王",
                    // "txhj_aleSkill2_info": "准备阶段，若你已受伤且体力值不是全场最高，你回复1点体力.",
                    "txhj_aleSkill1": "乐不可支",
                    // "txhj_aleSkill1_info": "当你于一个回合第一次成为一张基本牌的目标后，若此牌未对你造成伤害，你摸一张牌.",
                    "txhj_yueerSkill1": "花容月貌",
                    // "txhj_yueerSkill1_info": "每轮限一次，当男性角色受到伤害后，你回复一点体力并摸一张牌.",
                    "txhj_yueerSkill2": "娇面",
                    // "txhj_yueerSkill2_info": "弃牌阶段结束时，你摸两张牌.",
                    "txhj_liuliSkill1": "墨玉点雪",
                    // "txhj_liuliSkill1_info": "其他角色的回合限一次，当你失去牌时，对当前回合角色造成1点伤害.",
                    "txhj_liuliSkill2": "伶俐",
                    // "txhj_liuliSkill2_info": "每回合限一次，其他角色在弃牌阶段弃牌后，你从弃牌堆获得一张牌.",
                    "txhj_manmanSkill1": "弄鬼掉猴",
                    "txhj_manmanSkill2": "捣蛋",
                    "txhj_xiaoxiaoSkill1": "矢无虚发",
                    "txhj_xiaoxiaoSkill2": "弓上弦",
                    "txhj_xuerenSkill1": "轻舞飞扬",
                    "txhj_xuanwuSkill1": "倚天拔地",
                    "txhj_xuanwuSkill2": "蛇影",
                    "txhj_xuanwuSkill3": "玄冥真主",
                    "aHaoSkill1":"豪门贵胄",
                    "txhj_aHaoSkill2":"神勇",
                    "txhj_aHaoSkill3":"攫戾執猛",
                    // "shenyong_info":"当你于牌局内失去装备牌时，对所有敌人造成一点伤害。",
                    "txhj_dundunSkill1": "勇往直前",
                    "txhj_dundunSkill2": "忠誌",
                    "txhj_jiuweiSkill1": "狐火灵气",
                    "txhj_jiuweiSkill1_disable": "狐火灵气",
                    "txhj_jiuweiSkill2": "秘思",
                    "txhj_jiuweiSkill3": "九尾之命",
                    "txhj_tengsheSkill1": "雷奔云谲",
                    "txhj_tengsheSkill2": "紫电",
                    "txhj_tengsheSkill3": "迅雷风烈",
                    "txhj_qilinSkill1": "麒麟之姿",
                    "txhj_qilinSkill2": "掌火",
                    "txhj_qilinSkill3": "腾焰飞芒",
                    "txhj_ditingSkill1": "披坚执锐",
                    "txhj_ditingSkill2": "轻健",
                    "txhj_ditingSkill3": "巧捷万端",
                    "txhj_youyouSkill1": "承天之佑",
                    "txhj_youyouSkill2": "守护",
                    "txhj_minminSkill1": "娉婷万種",
                    "txhj_minminSkill2": "依人",
                    "txhj_qiaoqiaoSkill1": "慧心巧思",
                    "txhj_qiaoqiaoSkill2": "清婉",
                    "txhj_yayaSkill1": "慷慨鸭昂",
                    "txhj_yayaSkill2": "鸭立",
                    "txhj_yayaSkill2_protected": "鸭立",
                    
                    'txhj_tanshi': '贪食',
                    'txhj_tanshi_info': '锁定技，结束阶段开始时，你须弃置一张手牌',

                    "txhj_daiyuan": "待援",
                    "txhj_daiyuan_info": "每名角色的出牌阶段每项限一次，其可以弃置两张颜色或类型不同的牌，令你回复一点体力。。",
                    "txhj_daiyuan2": "待援",
                    "txhj_daiyuan2_info": "每名角色的出牌阶段每项限一次，其可以弃置两张颜色或类型不同的牌，令你回复一点体力。",
                    "txhj_zuijiu": "醉酒",
                    "txhj_zuijiu_info": "锁定技，你使用【杀】伤害+1。",
                    "txhj_baoji": "爆击",
                    "txhj_baoji_info": "锁定技，你使用【杀】造成伤害时，有低概率令此伤害+1。",
                    "txhj_juhun": "拘魂",
                    "txhj_juhun_info": "锁定技，准备阶段，你随机令一名于你上回合结束后阵亡的己方角色复活，将体力回复至三点，摸三张牌。",
                    "txhj_guimei": "鬼魅",
                    "txhj_guimei_info": "锁定技，你不能成为延时锦囊的目标。",
                    "txhj_baolian": "暴敛",
                    "txhj_baolian_info": "锁定技，结束阶段，你摸两张牌。",
                    "txhj_beiming": "悲鸣",
                    "txhj_beiming_info": "锁定技，你死亡时，杀死你的角色弃置所有手牌。",

                    "txhj_kuangbao": "狂暴",
                    "txhj_add": "狂暴",
                    "txhj_clear": "狂暴",
                    "txhj_kuangbao_info": "锁定技，若你连续七轮未进入濒死状态，本局游戏中，你造成的伤害+1。（可叠加）",
                    "txhj_debuff": "溃败",

                    "txhj_tunshi": "吞噬",
                    "txhj_tunshi_info": "锁定技，准备阶段，你对一名手牌数大于你的敌方角色造成一点伤害。",
                    "txhj_chuanyun": "穿云",
                    "txhj_chuanyun_info": "结束阶段，你可以对一名体力值大于你的敌方角色造成一点伤害。",

                    "txhj_guihuo": "鬼火",
                    "txhj_guihuo_info": "结束阶段，你可以对一名其他角色造成1点火焰伤害",

                    "txhj_luolei": "落雷",
                    "txhj_luolei_info": "准备阶段，你可以对一名其他角色造成1点雷电伤害",

                    "txhj_wangzu": "亡阻",
                    "txhj_wangzu_info": "锁定技，你死亡后，若此时为其他角色的出牌阶段，则立刻结束此阶段。",

                    "shiwuxufa": "矢无虚发",
                    "shiwuxufa_info": "每回合限一次，当你成为其他角色使用的普通锦囊牌的目标时，若你本回合未受伤，回复一点体力（满体力则摸一张牌）",

                    "gongshangxian": "弓上弦",
                    "gongshangxian_info": "弃牌阶段结束时，你从每名装备区装备数不大于你的其他角色处随机获得1张手牌",

                    "qingwufeiyang": "轻舞飞扬",
                    "qingwufeiyang_info": "回合结束时，若你本回合造成过伤害，摸一张牌。",

                    "yitianbadi": "倚天拔地",
                    "yitianbadi_info": "每当其他角色回复体力时，你回复一点体力。",

                    "txhj_sheying": "蛇影",
                    "txhj_sheying_info": "每回合限一次，当你弃置手牌或手牌被弃置时，你随机对X名敌方角色造成1点伤害并摸X张牌。（X为你本次弃置手牌数除以2向上取整）",

                    "xuanminzhenzhu": "玄冥真主",
                    "xuanminzhenzhu_info": "当其他角色使用锦囊牌指定你为目标时，若该牌点数小于等于你的手牌数，则该锦囊无效",
                    tx_modao:"魔道",
			"tx_modao_info":"锁定技，准备阶段，你摸两张牌。",
			tx_mojian:"魔箭",
			"tx_mojian_info":"出牌阶段开始时，你可以对所有敌方角色使用一张【万箭齐发】。",
			tx_danshu:"丹术",
			"tx_danshu_info":"每当你于回合外失去牌时，你可以进行一次判定，若结果为红色，你回复1点体力。",
			tx_yushou:"驭兽",
			"tx_yushou_info":"出牌阶段开始时，你可以对所有敌方角色使用一张【南蛮入侵】。",
			tx_moyany:"魔炎",
			"tx_moyany_info":"每当你于回合外失去牌时，你可以进行一次判定，若结果为红色，你对一名其他角色造成2点火焰伤害。",
			txyirang:"揖让",
			"txyirang_info":"出牌阶段开始时，你可以将所有非基本牌交给一名体力上限大于你的其他角色，然后调整体力上限至与该角色相同（X为你以此法交给其的牌的类别数）。",
			xinmingjian:"明鉴",
            "xinmingjian_info":"出牌阶段限两次，你可以将任意张手牌交给一名其他角色，若如此做，该角色于其下个回合的手牌上限不限制，且使用【杀】的次数上限不限制。",
			txayhanji:"悍激",
            "txayhanji_info":"每回合限一次，你对其他角色造成伤害时，造成的伤害+1。",
            txayboji:"搏激",
            "txayboji_info":"每回合限一次，当你使用【杀】指定其他角色时，你可以弃置一张牌然后令目标角色弃置所有手牌，然后你摸一张牌。",
            tx_dqtianzi:"天姿",
            "tx_dqtianzi_info":"每名角色的回合限一次，当你受到伤害后或出牌阶段开始时，你可以选择一名其他角色进行判定，若结果为方块，其跳过出牌阶段（若不是在其回合，则改为跳过其下个出牌阶段）；若结果为黑色，你获得其所有手牌。",
            txmazhan:"马战",
           "txmazhan_info":"锁定技，你计算与其他角色的距离-2，其他角色计算与你的距离+1。",
           txlieji:"裂击",
           "txlieji_info":"每回合限一次，当你使用【杀】或锦囊牌指定唯一目标后，你可以摸1张牌，然后此牌多结算一次。",
           "diychunxiao":"春晓",
            //"diychunxiao_info":"你的回合结束时，你若为受伤状态，额外有50%的几率恢复至满体力值。",
            "diycuidu":"淬毒",
			//"diycuidu_info":"锁定技，你对一名其他角色造成伤害后，若其没有“中毒”，你令其获得“中毒”，然后你摸两张牌。",
			diyzhongdu:"中毒",
			diyzhongdu_bg:"毒",
			"diyzhongdu_info":"锁定技，回合开始时，你进行判定，若结果不为红桃，你受到1点无来源的伤害，若结果不为黑桃，此“中毒”效果失效。",
			"diyzhuiling":"追灵",
			//"diyzhuiling_info":"当你受到伤害时，你可以对伤害来源造成伤害的角色造成1点随机属性伤害（雷或火、冰或毒随机）。",
			"diyfeihua":"飞花",
			//"diyfeihua_info":"你的出牌阶段开始时，你可以视为随机使用一张【知己知彼】或【万箭齐发】。",
			txclanxieshu:"挟术",
            "txclanxieshu_info":"当你造成或受到牌的伤害后，你可以弃置X张牌(X为此牌牌名字数)并摸你已损失体力值张牌。",
            txshixin: "释心",
           "txshixin_info": "当你成为其他角色使用的锦囊牌目标时，你可以进行一次判定，若结果为黑色，此牌对你无效；若结果为红色，此牌结算完成后，你获得之。",
           txqyyouji:"游击",
		   "txqyyouji_info":'当你使用单目标锦囊牌指定目标后，你可以令此牌的效果额外结算一次。',
		    txmouduan:"谋断",
			"txmouduan_info":"结束阶段，若你于本回合内使用过四种花色或三种类别的牌，则你可以移动场上的一张牌。",
			txkaikang:"慷慨",	
			"txkaikang_info":"当一名角色成为【杀】的目标后，你可以摸一张牌。若如此做，你交给其一张牌并展示之。若为装备牌，该角色可以使用此牌。",
			txhuangfu:"黄符",
			"txhuangfu_info":"锁定技，当你受到雷属性伤害时，你防止此伤害。",
		    txleizhen:"震雷",
	       "txleizhen_info":"锁定技，你死亡时，杀死你的角色受到1点无来源的雷属性伤害。",
	     txxiebi:"邪庇",
		"txxiebi_info":"锁定技，当你受到伤害时，若此伤害大于1，则你将伤害值改为1。",
		txlianbi:"联璧",
		"txlianbi_info":"锁定技，当你登场时，你处于连环状态。其他武将的技能和卡牌令你解除连环状态的效果失效，当你受到属性伤害结算后立即进入连环状态。",
	     txfeiyan:"飞燕",
        "txfeiyan_info":"一名其他角色使用【杀】指定目标时，若其在你的攻击范围内，你可以立即对其使用一张【杀】，若如此做，你摸两张牌。",
         txleili:"雷厉",
		"txleili_info":"每当你的【杀】造成伤害后，你可以对另一名敌方角色造成1点雷电伤害。",
		cxyMoJun:"魔军",
		"cxyMoJun_info":"锁定技，当友方角色使用【杀】对目标角色造成伤害后，其进行判定，若结果为黑色，友方角色各摸一张牌。",
		cxyKuangXi:"狂袭",
		"cxyKuangXi_info":"出牌阶段，你可以失去1点体力，然后对一名其他角色造成1点伤害，若其因受到此伤害而进入濒死状态，当此濒死结算结束后，此技能于此回合内无效。",
		"txbaobian":"豹变",
        "txbaobian_info":"锁定技，若你的体力值为3或更少，你视为拥有技能〖挑衅〗；若你的体力值为2或更少；你视为拥有技能〖咆哮〗；若你的体力值为1，你视为拥有技能〖神速〗。",
        cxy_BaoYing:"豹营",
        "cxy_BaoYing_info":"限定技，友方角色进入濒死状态时，你可以令其体力回复至1。",
        cxyYangWu:"扬武",
        "cxyYangWu_info":"锁定技，准备阶段开始时，你对所有其他角色造成1点伤害，然后失去1点体力。",
        cxyRuiQi:"锐骑",
        cxyJingQi:"精骑",
        "cxyRuiQi_info":"锁定技，友方角色摸牌阶段额外摸一张牌",
        "cxyJingQi_info":"锁定技，友方角色计算与敌方角色距离-1。",
        cxyTunJun:"屯军",
        cxyJiaoXia:"狡黠",
        cxyFengYing:"凤营",
        "cxyTunJun_info":"锁定技，每轮游戏开始，若你的体力上限不为1，则你须扣减1点体力上限，然后摸X张牌（X为你的体力上限）。",
        "cxyJiaoXia_info":"锁定技，友方角色的黑色手牌不计入手牌上限。",
        "cxyFengYing_info":"锁定技，敌方角色不能使用牌指定体力值唯一最少的友方角色。",
        cxyFanGong:"反攻",
        "cxyFanGong_info":"当你成为一名敌方角色使用牌的目标且该牌结算完成后，你可以对其使用一张【杀】（无距离限制）。",
            oldfuman:"抚蛮",
            "oldfuman_info":"出牌阶段，你可以将一张【杀】交给一名本回合未获得过〖抚蛮〗牌的其他角色，其于下个回合结束之前使用〖抚蛮〗牌时，你摸一张牌。",
            "oldfuman2":"抚蛮",
            "oldfuman2_info":"",
            txhuao:"虎傲",
			"txhuao_info":"锁定技，回合开始时，你从牌堆中获得一张【杀】。",
			cxyJieLve:"劫掠",
        	"cxyJieLve_info":"当你对一名其他角色造成伤害后，你可以获得其区域内的各一张牌，然后你横置。",
        	hgkurou:"苦肉",
			"hgkurou_info":"出牌阶段限一次，你可以弃置一张牌，然后失去1点体力并摸三张牌，本回合使用【杀】的次数上限+1。",
			hgkurou_effect:"苦肉",
			"hgkurou_effect_info":"",
			gdsanchen:"三陈",
			"gdsanchen_info":"出牌阶段，你可选择一名本回合内未选择过的角色。其摸三张牌，然后弃置三张牌。若其未以此法弃置牌或以此法弃置的牌的类别均不相同，则你获得一枚“陈”且其摸一张牌；否则你本阶段内不能再发动〖三陈〗。",		
			 txlveming:"掠命",
			"txlveming_info":"出牌阶段限一次，你可以选择一名装备区装备比你多的角色，令其选择一个点数，然后你进行判定：<br>若点数相同，你对其造成3点伤害；<br>若点数不同，则你对其造成1点伤害且随机获得其区域内的一张牌。",	
			cxyMoQu:'魔躯',
			cxyMoQu_info:"锁定技，每名角色的回合结束时，若你的手牌数不大于当前体力值，你摸两张牌；其他友方角色受到伤害后，你弃置一张牌。",
			cxyYaoWu:"耀武",
			cxyYaoWu_info:"锁定技，当一名角色使用红色【杀】对你造成伤害时，该角色可以回复1点体力或摸一张牌。",
			cxyYingHun:"英魂",
			cxyPoLu:"破掳",
			cxyYingHun_info:"准备阶段，若你已受伤，你可以选择一名其他角色并选择一项：1.令其摸X张牌，然后弃置一张牌；2.令其摸一张牌，然后弃置X张牌。（X为你已损失的体力值）",
			cxyPoLu_info:"锁定技，友方角色杀死一名敌方角色或你死亡时，你令友方角色各摸X张牌（X为此技能发动的次数）。",
			txdaoxi:"盗袭",
			"txdaoxi_info":"出牌阶段限三次，你可以将一张红色牌当做【顺手牵羊】对一名其他角色使用。",
			 txlangxi:"狼疾",
			"txlangxi_info":"准备阶段，你可以选择对一名其他角色造成2～4点随机伤害。",
			 txkuangyi:"狂亦",
			"txkuangyi_info":"每回合限一次。当你于出牌阶段内使用的非装备牌结算结束后，你可以横置武将牌并获得此牌对应的所有实体牌。",
			txtanbei:"贪狈",
			"txtanbei_info":"出牌阶段限一次，你可以令一名其他角色选择一项：1.令你随机获得其区域内的一张牌。2.令你此回合内对其使用牌没有次数与距离限制且其非锁定技失效直到回合结束。",
			"txtanbei_effect1":"贪狈",
			"txtanbei_effect1_info":"",
			"txtanbei_effect2":"贪狈",
			"txtanbei_effect2_info":"",	
			ljxuechi:"血池",
			"ljxuechi_info":"锁定技，一名角色回复体力前，若你手牌小于3，改为令你摸一张牌。",		
			txzhuxin:"诛心",
            "txzhuxin_info": "锁定技，当你对其他造成伤害后若使其进入濒死状态，你令其不能被救活且直接进入结算判定为没有奖惩分明的死亡。",
            txyicheng:"疑城",
			"txyicheng_info":"当一名角色成为【杀】的目标后，你可以令该角色摸一张牌，然后弃置一张牌。",
			txnianrui:'年瑞',
			txnianrui_info:'锁定技，摸牌阶段，你额外摸两张牌',
			txmengtai:'萌态',
			txmengtai_info:'锁定技，若你的出牌阶段被跳过，你跳过本回合的弃牌阶段；若你的摸牌阶段被跳过，结束阶段开始时，你摸三张牌',
			txshouyi:'兽裔',
			txshouyi_info:'锁定技，你使用牌无距离限制',
			txrenxing:'任性',
			txrenxing_info:'锁定技，你的回合外，一名角色受到1点伤害后或回复1点体力时，你摸一张牌',
			txyinli:"姻礼",
			"txyinli_info":"锁定技。其他角色的回合结束时，若弃牌堆中有于本回合内因弃置而进入弃牌堆的装备牌，则你获得任意张。",
			txzhulian: "株连",
            "txzhulian_info": "锁定技，你的武将牌始终横置；每当你受到伤害时，你横置攻击范围内所有角色的武将牌。",
            txkeji:"克己",
			"txkeji_info":"锁定技，若你没有在出牌阶段内使用过颜色不同的牌，则你本回合的手牌上限+4。",
			txkeji_add:"克己",
			"txkeji_add_info":"",
			txnangce: "囊策",
            "txnangce_info": "你使用普通锦囊牌时，可令当前回合角色摸一张牌。",
            txduanzui:'断罪',
	     	txduanzui_info:'回合结束时，若除你以外的其他角色有手牌且小于3，你可以对所有符合条件的角色造成3-X的火焰伤害（X为其现有手牌数）。',
	     /*	dualside:'整顿',
	     	dualside_info:'武将整顿，死亡后会有隐藏武将代替其加入。',*/
	     	txyingyang:"鹰扬",
			"txyingyang_info":"当你的拼点牌亮出后，你可以令此牌的点数+3或-3（至多为K，至少为1）。",
			mdqianxi7:"潜袭",
			mdqianxi72:"潜袭",
			mdqianxi72_bg:"袭",
			"mdqianxi7_info":"准备阶段，你可以摸一张牌，并弃置一张牌，然后令一名距离为1的角色不能使用或打出与你弃置的牌颜色相同的手牌直到回合结束。",
			mdqianxi:"潜袭",
			"mdqianxi_info":"准备阶段开始时，你可以进行判定，然后你选择距离为1的一名角色，直到回合结束，该角色不能使用或打出与结果颜色相同的手牌。",
			zylongdan:"龙胆",
			"zylongdan_info":"你可以将【杀】当【闪】，【闪】当【杀】使用或打出。当你发动〖龙胆〗使用的【杀】被【闪】抵消时，你可以对另一名角色造成1点伤害；当你发动〖龙胆〗使用的【闪】抵消了【杀】时，你可以令一名其他角色回复1点体力（不能是【杀】的使用者）。",
			zglkongcheng:"空城",
			"zglkongcheng_info":"锁定技，若你没有手牌，1.当你成为【杀】或【决斗】的目标时，取消之；2.你的回合外，其他角色交给你牌后，你将这些牌置于你的武将牌上。摸牌阶段开始时，你获得武将牌上的这些牌。",
			txjuxiang:'巨象',
			txjuxiang_info:'锁定技。①【南蛮入侵】对你无效。②当其他角色使用【南蛮入侵】结算结束后，你获得此牌对应的所有实体牌。③结束阶段，若你未于本回合使用过【南蛮入侵】，你可以将一张游戏外的随机【南蛮入侵】（共2张）交给一名角色。',
			txdaoji:'盗戟',
			txdaoji_info:'出牌阶段限一次，你可以弃置一张非基本牌并选择一名其他角色，获得其一张牌。若你以此法获得的牌为：基本牌，你摸一张牌；装备牌，你使用此牌并对其造成1点伤害。',
			txhj_suoming:'索命',
			txhj_suoming_info:'结束阶段，将任意名未被横置的其他角色的武将牌横置。',
			txhj_huangmen:"黄门",
            "txhj_huangmen_info":"准备或结束阶段，若你没有手牌，你选择一项:1.摸两张牌；2.随机获得一名敌方角色的一张牌。",
            txhj_mouqiang:"谋强",
            "txhj_mouqiang_info":"锁定技，当你受到大于1点的伤害后，你获得伤害来源X张牌（X为伤害值一半，向下取整），每有一张基本牌，你回复1点体力；每有一张非基本牌，你对其造成1点伤害。",
          txhj_suzhi:'夙智',
	      txhj_suzhi_info:'锁定技，每回合累计限三次；①当你于回合内因执行【杀】或【决斗】造成伤害时，此伤害+1；②你于回合内使用非转化的锦囊牌时摸一张牌，且无距离限制；③当有其他角色于你的回合内弃置牌后，你获得该角色的一张牌；④结束阶段，你获得〖反馈〗直到下回合开始。',
	      txmanjia:'蛮甲',
		  txmanjia_info:'锁定技，若你的装备区内没有防具牌，则你视为装备了【藤甲】。',
		  txmanzhen:"蛮阵",
          "txmanzhen_info":"①出牌阶段限一次：你可将任意张牌当做【南蛮入侵】对等量的角色使用；②你使用【南蛮入侵】对体力值不小于你的角色造成伤害时，你可失去一点体力令此伤害加一；③【南蛮入侵】对你无效。",  
          txfusha:'赋杀',
		  txfusha_info:'锁定技，当你使用【杀】造成伤害时，此伤害+1。',
		  txleizhou:'雷咒',
		  txleizhou_info:'锁定技，准备阶段，你对随机一名其他角色造成1点雷属性伤害。',
		  txzhennu:'震怒',
		  txzhennu_info:'准备阶段，你可以对一名敌方角色造成1点伤害。',
		  txyongguan:'勇冠',
		  txyongguan_fate:'勇冠',
	      txyongguan_info:'锁定技，当你受到伤害时，你防止此伤害，然后获得等同于伤害值的“勇”标记。你的回合结束时，你弃置等同于“勇”数量的手牌并弃置所有“勇”标记。（若弃牌的牌数不够，则失去剩余数量的体力值）',
	      txchengyuan:'成渊',
	      txchengyuan_info:'弃牌阶段开始时，你可以将一张与你本回合使用的牌颜色均不同的手牌置于武将牌上：若你有至少三张“成渊”牌，你移去“成渊”牌并选择一名其他角色，该角色受到2点伤害并弃置其装备区的所有牌。',
	      txbenji:'奔激',
		  txbenji_info:'你的回合开始时，你可以选择对一名其他角色造成X点伤害。（X为你损失的体力值）若其未因此伤害进入濒死阶段，你失去1点体力。',
		  txyonglve:'勇略',
		  txyonglve_info:'你拼点时，可以改为用牌堆顶的一张牌进行拼点。',
		  txjiang:'激昂',
		  txjiang_info:'每名角色的回合限一次，每当你使用或被使用一张【决斗】或【杀】时（指定目标或成为目标后），你可以摸2张牌。',
                },
            },
            intro: ""
                + "先行魔改版：2.0.3.4",
            author: "太虚幻境攻坚小分队",
            diskURL: "",
            forumURL: "",
            version: "2.0.3.4",
        },
    }
});