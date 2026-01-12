'use strict';
decadeModule.import(function(lib, game, ui, get, ai, _status) {
    //转译双势力
    get.groupnature2 = function(infoitemZero) {
        if(!infoitemZero) return undefined;
        var infoitem = infoitemZero;
        if(get.itemtype(infoitem)=='player') {
            var name = infoitem.name||infoitem.name1;
            infoitem = lib.character[name];
            if(!infoitem) return undefined;
        }
        var group = infoitem[1];
        if (infoitem[4] && infoitem[4][0] && infoitem[4][0].toString()
            .indexOf('double') != -1) {
            let doublegroup = infoitem[4][0].toString()
                .split(':')
                .slice(1);
            group = doublegroup[0] + doublegroup[1];
        }

        return group;
    };
    game.heiheiARRAY = function() {
        return `<span style='opacity: 0;'>▾</span>`;
    }
    //文件的存在性判断
    game.dcd_checkFileExist = function(path, callback) {
        if (lib.node && lib.node.fs) {
            try {
                var stat = lib.node.fs.statSync(__dirname + '/' + path);
                callback(stat);
            } catch (e) {
                callback(false);
                return;
            }
        } else {
            resolveLocalFileSystemURL(lib.assetURL + path, (function(name) {
                return function(entry) {
                    callback(true);
                }
            }(name)), function() {
                callback(false);
            });
        }
    };
    //创建专属dialog
    ui.create.dialognew = function() {
        var i;
        var hidden = false;
        var notouchscroll = false;
        var forcebutton = false;
        var noforcebutton = false;
        var dialog = decadeUI.element.create('dialog');
        dialog.classList.add('noupdate');
        dialog.contentContainer = decadeUI.element.create('content-container', dialog);
        dialog.content = decadeUI.element.create('content', dialog.contentContainer);
        dialog.buttons = [];
        for (i in lib.element.dialog) dialog[i] = lib.element.dialog[i];
        for (i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == 'boolean') dialog.static = arguments[i];
            else if (arguments[i] == 'hidden') hidden = true;
            else if (arguments[i] == 'notouchscroll') notouchscroll = true;
            else if (arguments[i] == 'forcebutton') forcebutton = true;
            else if (arguments[i] == 'noforcebutton') noforcebutton = true;
            else if (arguments[i].indexOf('#') != -1 && arguments[i].indexOf('>') == -1) dialog.id = arguments[i].slice(1);
            else dialog.add(arguments[i]);
        }
        if (!hidden) dialog.open();
        if (!lib.config.touchscreen) dialog.contentContainer.onscroll = ui.update;
        if (!notouchscroll) {
            dialog.contentContainer.ontouchstart = ui.click.dialogtouchStart;
            dialog.contentContainer.ontouchmove = ui.click.touchScroll;
            dialog.contentContainer.style.WebkitOverflowScrolling = 'touch';
            dialog.ontouchstart = ui.click.dragtouchdialog;
        }

        if(noforcebutton){
			dialog.noforcebutton=true;
		}
        if (forcebutton) {
            dialog.forcebutton = true;
            dialog.classList.add('forcebutton');
        }
        return dialog;
    };
    ui.bbutton = ui.create.button;
    ui.create.button = function(item, type, position, noclick, node) {
        if (type != 'vcard' && type != 'character' && type != 'characterx') {
            var button = ui.bbutton.apply(this, arguments);
            if (position) position.appendChild(button);
            return button;
        }
        if (type != 'vcard') {
            if (node) {
                node.classList.add('button');
                node.classList.add('character');
                node.classList.add('decadeUI');
                node.style.display = '';
            } else {
                node = ui.create.div('.button.character.decadeUI');
            }
            node._link = item;
            if (type == 'characterx') {
                if (_status.noReplaceCharacter) {
                    type = 'character';
                } else if (lib.characterReplace[item] && lib.characterReplace[item].length) {
                    item = lib.characterReplace[item][0];
                }
            }
            node.link = item;
            var doubleCamp = get.is.double(node._link, true);
            var character = dui.element.create('character', node);

            if (doubleCamp) node._changeGroup = true;
                if (type == 'characterx') {
                //换将修改为原来版本
                /*if (type == 'characterx' && lib.characterReplace[node._link] && lib.characterReplace[node._link].length > 1) {*/
                node._replaceButton = true;
            }
            node.refresh = function(node, item, intersection) {
                if (intersection) {
                    node.awaitItem = item;
                    intersection.observe(node);
                } else {
                    node.setBackground(item, 'character');
                }

                if (node.node) {
                    node.node.name.remove();
                    node.node.hp.remove();
                    node.node.hpWrap.remove();
                    node.node.group.remove();
                    node.node.intro.remove();
                    if (node.node.replaceButton) node.node.replaceButton.remove();
                }
                node.node = {
                    name: decadeUI.element.create('name', node),
                    hpWrap: decadeUI.element.create('hp-wrap'),
                    hp: decadeUI.element.create('hp', node),
                    group: decadeUI.element.create('identity', node),
                    intro: decadeUI.element.create('intro', node),
                };

                node.insertBefore(node.node.hpWrap, node.node.hp);
                node.node.hpWrap.appendChild(node.node.hp);
                //if (!ui.arena.classList.contains('choose-character')) node.node.hpWrap.style.display = 'none';
                var infoitem = lib.character[item];
                if (!infoitem) {
                    for (var itemx in lib.characterPack) {
                        if (lib.characterPack[itemx][item]) {
                            infoitem = lib.characterPack[itemx][item];
                            break;
                        }
                    }
                }

                /*node.node.name.innerText = get.slimName(item)
                    .replace(/<br>/g, '\n');*/
                //使用这个鬼的新函数，可以让武将显示加粗高亮的前缀名
                node.node.name.innerHTML = get.prefixBoldName(item);
                if (lib.config.buttoncharacter_style == 'default' || lib.config.buttoncharacter_style == 'simple') {
                    if (lib.config.buttoncharacter_style == 'simple') {
                        node.node.group.style.display = 'none';
                    }
                    node.node.name.dataset.nature = get.groupnature(infoitem[1]);
                    if (infoitem[4] && infoitem[4].toString()
                        .indexOf('double') != -1) node.node.name.dataset.double = 'on';
                    node.node.group.dataset.nature = get.groupnature(infoitem[1], 'raw');
                    node.classList.add('newstyle');
                    if (doubleCamp && doubleCamp.length) {
                        node.node.name.dataset.nature = get.groupnature(doubleCamp[0]);
                        node.node.group.dataset.nature = get.groupnature(doubleCamp[doubleCamp.length == 2 ? 1 : 0]);
                    }
                    var hpNode = node.node.hp;
                    var hp = get.infoHp(infoitem[2]),
                        maxHp = get.infoMaxHp(infoitem[2]),
                        hujia = get.infoHujia(infoitem[2]);
                    if (maxHp > 5 || (hujia && maxHp > 3)) {
                        hpNode.innerHTML = (isNaN(hp) ? '×' : (hp == Infinity ? '∞' : hp)) + '<br>' + '/' + '<br>' + (isNaN(maxHp) ? '×' : (maxHp == Infinity ? '∞' : maxHp)) + '<div class="morehp"></div>';
                        if (hujia) hpNode.innerHTML += '<div class="morehujia">' + hujia + '</div>';

                        hpNode.classList.add('textstyle');
                    } else {
                        hpNode.innerHTML = '';
                        hpNode.classList.remove('textstyle');
                        while (maxHp > hpNode.childNodes.length) ui.create.div(hpNode);

                        for (var i = 0; i < Math.max(0, maxHp); i++) {
                            var index = i;

                            if (i < hp) {
                                hpNode.childNodes[index].classList.remove('lost');
                            } else {
                                hpNode.childNodes[index].classList.add('lost');
                            }
                        }
                        //新修的护甲
                        if (hujia) {
                            game.createCss(`.threehp_hujia {
                                height: 16px !important;
                                width: 16px !important;
                                margin-left: 2px !important;
                                margin-bottom: 4px !important;
                                background-image: url("${lib.assetURL}extension/十周年UI/image/decoration/shield.png") !important;
                                background-size: 100% 100% !important;
                                background-repeat: no-repeat;
                                text-align: center;
                                color: rgb(230, 220, 130) !important;
                                font-family: 'shousha';
                                text-shadow: 0 0 1.5px #000000, 0 0 1.5px #000000, 0 0 1.5px #000000, 0 0 1.5px #000000 !important;
                                font-size: 15.5px;/*16px*/
                                font-weight: 900;
                            }`);
                            var hujiat=ui.create.div(hpNode);
                            hujiat.classList.add('threehp_hujia');
                            //hujiat.style.marginLeft=' 0px !important';
                            hujiat.innerHTML=hujia;
                            // += '<div class="morehujia">' + hujia + '</div>';
                        }
                    }
                    /*	if (hpNode.classList.contains('room')) {
											hpNode.dataset.condition = 'high';
										} else if (hp == 0) {
											hpNode.dataset.condition = '';
										} else */
                    if (hp > Math.round(maxHp / 2) || hp === maxHp) {
                        hpNode.dataset.condition = 'high';
                    } else if (hp > Math.floor(maxHp / 3)) {
                        hpNode.dataset.condition = 'mid';
                    } else {
                        hpNode.dataset.condition = 'low';
                    }
                } else {
                    var hp = get.infoHp(infoitem[2]);
                    var maxHp = get.infoMaxHp(infoitem[2]);
                    var shield = get.infoHujia(infoitem[2]);
                    if (maxHp > 14) {
                        if (typeof infoitem[2] == 'string') node.node.hp.innerHTML = infoitem[2];
                        else node.node.hp.innerHTML = get.numStr(infoitem[2]);
                        node.node.hp.classList.add('text');
                    } else {
                        for (var i = 0; i < maxHp; i++) {
                            var next = ui.create.div('', node.node.hp);
                            if (i >= hp) next.classList.add('exclude');
                        }
                        for (var i = 0; i < shield; i++) {
                            ui.create.div(node.node.hp, '.shield');
                        }
                    }
                }
                if (node.node.hp.childNodes.length == 0) {
                    node.node.name.style.top = '8px';
                }
                if (node.node.name.querySelectorAll('br')
                    .length >= 4) {
                    node.node.name.classList.add('long');
                    if (lib.config.buttoncharacter_style == 'old') {
                        node.addEventListener('mouseenter', ui.click.buttonnameenter);
                        node.addEventListener('mouseleave', ui.click.buttonnameleave);
                    }
                }

                node.node.intro.innerText = lib.config.intro;
                if (!noclick) lib.setIntro(node);
                if (infoitem[1]) {
                    if (doubleCamp) {
                        var text = '';
                        if (doubleCamp.length == 2) {
                            for (var i = 0; i < doubleCamp.length; i++) text += get.translation(doubleCamp[i]);
                        } else {
                            text = get.translation(doubleCamp[0]);
                        }
                        node.node.group.innerText = text;
                    } else {
                        node.node.group.innerText = get.translation(infoitem[1]);
                    }
                    node.node.group.style.backgroundColor = get.translation(infoitem[1] + 'Color');

                    //node.node.group.style.cssText = 'background-image:url("' + lib.assetURL + "extension/十周年UI/assets/image/group/" + get.groupnature2(infoitem) + '.png") !important';
                } else {
                    node.node.group.style.display = 'none';
                }
                if (node._replaceButton) {
                    var intro = ui.create.div('.button.replaceButton', node);
                    node.node.replaceButton = intro;
                    intro.id = 'but2';
                    intro._node = node;
                    intro.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function() {
                        //防止一直点卡了bug
                        if(_status.tempNoButton) return false;
                        var nodel=this._node;
                        var txs=lib.config.extension_十周年UI_changeWujiangTX;
                        if(txs=='shine') {
                            nodel.style.transition='all 0.2s ease';
                            nodel.style.filter='drop-shadow(0px 0px 3px rgba(255, 255, 255, 1)) contrast(0) brightness(1.7)';
                        }else if(txs=='blur') {
                            nodel.style.transition='all 1s ease';
                        }
                        //nodel.style.filter='blur(5px)';
					    //nodel.style.filter='drop-shadow(0px 0px 3px rgba(0, 0, 0, .3)) brightness(2) blur(2px)';
					    //nodel.node.replaceButton.style.filter='';
					    _status.tempNoButton = true;
                        game.playAudio('../extension/十周年UI/audio/huan.mp3');
                        //var node = this._node;
                        if(txs=='shine') {
                            nodel.node.replaceButton.style.transition='all 0.3s ease';
                            nodel.node.replaceButton.style.opacity='0';
                            nodel.node.replaceButton.style.transform='scale(0.7)';
                        }else {
                            nodel.node.replaceButton.style.filter='grayscale(1) !important';
                            nodel.node.replaceButton.style.transition='all 0.3s ease';
                            nodel.node.replaceButton.style.transform='scale(0.85)';
                        }
                        //nodel.node.replaceButton.style.filter='grayscale(1)';
                        //var node = nodel;
                        var list = Object.keys(lib.character)
                            .filter(function(character) {
                            return !lib.filter.characterDisabled(character);
                        });
					  
                    /*    if (ui.dialog && ui.dialog.buttons) for (let i = 0; i < ui.dialog.buttons.length; i++) {

                            if (ui.dialog.buttons[i].link) list.remove(ui.dialog.buttons[i].link)
                        }*/
                      setTimeout(function(){
                       nodel.style.transition='all 1s ease';
                       setTimeout(function(){
                          nodel.style.filter='';
                        var node = nodel;
                        var link = node.link;
                        link = list.randomGet();
                        node.link = link;
                        node.refresh(node, link);
                        if(typeof node.changeDiZhuQiangDu=='function') {
                            node.changeDiZhuQiangDu();
                        }
                        if (!node.cishu) node.cishu = 0;
                        node.cishu++;
                        if (node.cishu == 1) {
                            var txs=lib.config.extension_十周年UI_changeWujiangTX;
                            if(txs!='shine') {
                               nodel.node.replaceButton.style.filter='grayscale(1)';
                               node.node.replaceButton.style.transform='';
                               setTimeout(function() {
                                 node.node.replaceButton.style.opacity=0;
                               },300);
                               setTimeout(function() {
                                 node.node.replaceButton.remove();
                               },600);
                            }else {
                                node.node.replaceButton.remove();
                            }
                           
                        }
                        setTimeout(function(_status) {
                            _status.tempNoButton = undefined;
                        }, 200, _status);
                       },0);
                      },300);
                    });
                }
            };

            node.refresh(node, item, position ? position.intersection : undefined);
        } else {
            if (typeof item == 'string') {
                item = [get.type(item), '', item];
            }

            node = ui.create.card(position, 'noclick', noclick);
            node.classList.add('button');
            node.init(item);
            if (!lib.card[item[2]] || !lib.card[item[2]].intro) {
                let path1 = 'extension/十周年UI/image/vdcard/' + item[2] + '.png';
                let path2 = 'extension/十周年UI/image/vdcard/' + get.translation(item[2]) + '.png';
                game.dcd_checkFileExist(path1, function(a) {
                    if (a) {
                        node.innerHTML = '';
                        node.setBackgroundImage(path1);
                    } else game.dcd_checkFileExist(path2, function(b) {

                        if (b) {
                            node.innerHTML = '';
                            node.setBackgroundImage(path2);
                        }
                    })
                })
            }

            node.link = item;

        }
        if (!noclick) {
            node.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.button);
        } else {
            node.classList.add('noclick');
            if (node.querySelector('.intro')) {
                node.querySelector('.intro')
                    .remove();
            }
        }

        for (var i in lib.element.button) node[i] = lib.element.button[i];
                if (position) position.appendChild(node);
                //双势力框添加开始
                var FileExist = function (url) {
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
                                }
                var infoitem = lib.character[item];

                if (infoitem && infoitem[4] && infoitem[4].length>0) {
                    for(var i=0;i<infoitem[4].length;i++){
                       if (infoitem[4][i].indexOf('doublegroup') != -1) {
                          var groups = infoitem[4][i].split(":");
                          if (groups.contains('doublegroup')) {
                             groups.remove('doublegroup');
                    }
                    var name = groups.join("_");
                    if (decadeUI.config.newDecadeStyle == 'off') {
                    var path = lib.assetURL + "extension/十周年UI/image/decorations/doubleBorder/" + name + ".png";} else {
                    var path = lib.assetURL + "extension/十周年UI/image/decorations/doubleBorder2/" + name + ".png";}
                    if (FileExist(path)) {
                        //node.node.group.dataset.nature = name;
                        node.node.name.classList.add('doubleGroup');
                        node.node.name.dataset.nature = name;
                        node.node.group.style.setProperty('background-image', "url(" + path + ")", "important")
                       }
                    }
                }
                                    
          }
		//双势力框添加结束
                return node;
        },
    lib.onover.push(function(bool) {
        if (ui.cardDialog) ui.cardDialog.remove();
        //  game.check();
    })
    //卡牌提示文字，出牌阶段拿起牌时显示的文字，
    //具体的创建方法是lib.card.卡牌id.prompt=你想显示的文字   
    //用个括号更方便
    lib.myprompt={
    card:{
        sha: '选择1名角色，作为杀的目标',
        shandian: '挂上闪电，所有人轮流判定，可能掉3血',
        jiu: '使用酒，令自己的下1张使用的【杀】伤害+1',
        lebu: '选择你要使用乐不思蜀的目标，他可能被跳过出牌',
        nanman: '使用南蛮入侵，每个人都要出杀，否则掉血',
        bagua: '装备效果，需要出闪时可以判定，如果是红色则免费出闪',
        bingliang: '选择1个目标兵粮寸断，让他可能摸不了牌',
        taoyuan: '所有受伤的角色将恢复1点体力',
        juedou: '任意1名决斗目标，你们轮流出杀，出不下去的人受1伤害',
        baiyin: '装备效果，不会受到超过1的伤害；失去装备时可以回1血',
        wuzhong: '使用后你可再摸2张牌',
        guohe: '选择1名目标，弃掉他1张牌',
        wugu: '使用后所有人轮流拿1张牌',
        dilu: '装备的卢马，防守时与其他玩家的距离+1',
        shunshou: '选择1名距离为1的目标，获得其1张牌',
        wanjian: '使用万箭齐发，每个人都要出闪，否则掉血',
        fangtian: '装备效果，如果最后1张手牌是杀，可以额外杀2个人',
        renwang: '装备效果，黑杀对你无效',
        qinggang: '装备效果，无视对方防具',
        hualiu: '装备骅骝，防守时与其他玩家的距离+1',
        zhuahuang: '装备爪黄飞电马，防守时与其他玩家的距离+1',
        tao: '你可以回复1点体力',
        qinglong: '装备效果，杀被闪后可以继续追杀',
        dawan: '装备大宛马，攻击时与其他玩家的距离-1',
        tengjia: '装备效果，不受普通杀伤害；但受到火焰伤害+1',
        tiesuo: '直接重铸，或选择1至2个角色作为连环的目标',
        qilin: '装备效果，杀中后可以弃置目标1匹马',
        guding: '装备效果，如果目标没牌则杀伤害+1',
        jueying: '装备绝影，防守时与其他玩家的距离+1',
        zhuge: '装备效果，可以无限出杀',
        zixin: '装备紫骍马，攻击时与其他玩家的距离-1',
        chitu: '装备赤兔马。攻击时与其他玩家的距离-1',
        huogong: '选择1名有手牌的目标火攻，他给你看1张牌，你弃掉同花色则他掉1血',
        zhangba: '装备效果，把任意2张手牌当杀',
        guanshi: '装备效果，可以弃2张牌强制命中',
        cixiong: '装备效果，如果杀的是异性，则他弃1张牌或你摸1张牌',
        muniu: '装备效果，你可以将卡牌放在木牛里当作手牌使用',
        zhuque: '装备效果，可以将普通杀转化为火焰杀',
        jiedao: '选择2名角色，借角色1的武器杀角色2，偌角色1不出杀则将武器给你',
        hanbing: '装备效果，杀中后可以不造成伤害改为弃他2张牌',
        },
        skill:{
        reluoshen:("<span data-suit-type='black'>♠♣</span>" + '：甄姬获得此牌' + '<br>' + "<span data-suit-type='red'>♥♦</span>" + '：无事发生'),//界洛神
        luoshen:("<span data-suit-type='black'>♠♣</span>" + '：甄姬获得此牌' + '<br>' + "<span data-suit-type='red'>♥♦</span>" + '：无事发生'),//洛神
        shencai:('包含体力:其获得笞标记' + '<br>' + '包含武器:其获得杖标记' + '<br>' + '包含打出:其获得徒标记' + '<br>' + '包含距离:其获得流标记' + '<br>' + '其他:其获得死标记' ),//神裁
        bazhen_bagua:( "<span data-suit-type='red'>♥♦</span>" +'：视为使用一张闪' + '<br>' + "<span data-suit-type='black'>♠♣</span>" + '：无事发生'),//八阵
        qiangwu:'小于判定结果点数的杀不受距离限制，大于判定结果点数的杀不受次数限制。',//枪舞
        zundi:( "<span data-suit-type='red'>♥♦</span>" + '：其可以移动场上一张牌' + '<br>' + "<span data-suit-type='black'>♠♣</span>" + '：其摸三张牌' ),//尊嫡
        wuhun:'不为桃或桃园结义，其死亡',//武魂
        huayi:( "<span data-suit-type='red'>♥♦</span>" +':其他角色回合结束摸牌' + '<br>' + "<span data-suit-type='black'>♠♣</span>" + ':受到伤害后摸两张牌'),//华衣
        xunde:('点数大于5:其获得此牌' + '<br>' + '点数小于7:伤害来源弃一张牌'),//勋德
        ganglie:("<span data-suit-type='red'>♥</span>" + ':无事发生' + '<br>' + "<span data-suit-type='red'>♦</span>" +"<span data-suit-type='black'>♠♣</span>" + ':伤害来源弃牌或受到伤害'),//刚烈
        reganglie:( "<span data-suit-type='red'>♥♦</span>" + '：对伤害来源造成一点伤害' + '<br>' + "<span data-suit-type='black'>♠♣</span>" + '：弃置伤害来源一张牌'),//界刚烈
        spchijie:'点数大于6:取消此牌所有目标',//持节
        hongyi2:( "<span data-suit-type='red'>♥♦</span>" + '：受伤角色摸一张牌' + '<br>' + "<span data-suit-type='black'>♠♣</span>" + '：此伤害减一'),//弘仪
        tieji:( "<span data-suit-type='red'>♥♦</span>" + '对方无法使用闪' + '<br>' + "<span data-suit-type='black'>♠♣</span>" + '无事发生'),//铁骑
        retieji:'目标需弃置判定牌同花色牌才可用闪响应此杀',//界铁骑
        chexuan:("<span data-suit-type='black'>♠♣</span>" + '装备一张随机的舆' + '<br>' + "<span data-suit-type='red'>♥♦</span>" + '无事发生'),//车悬
        lslixun:'点数小于珠:弃置牌，若牌不够则失去体力',//利熏
        shuangxiong:'获得此牌并可用不同颜色牌当决斗',//双雄
        zlhuji:( "<span data-suit-type='red'>♥♦</span>" + '：张陵对其使用一张杀' + '<br>' +"<span data-suit-type='black'>♠♣</span>" +'：无事发生' ),//虎骑
        leiji:( "<span data-suit-type='black'>♠</span>" + ':对其造成两点雷电伤害' + '<br>' + "<span data-suit-type='black'>♣</span>"  + "<span data-suit-type='red'>♥♦</span>" + ':无事发生'),//雷击
        releiji:( "<span data-suit-type='black'>♠</span>" + ':对其造成两点雷电伤害' + '<br>' + "<span data-suit-type='black'>♣️</span>"+':对其造成一点雷电伤害并使张角恢复一点体力'+'<br>'+"<span data-suit-type='red'>♥♦</span>"+':无事发生'),//界雷击
        yufeng2:( "<span data-suit-type='black'>♠♣️</span>" + ':其跳过出牌和弃牌阶段' + '<br>' + "<span data-suit-type='red'>♥♦</span>" + ':其跳过摸牌阶段' ),//御风
        shhlianhua:( "<span data-suit-type='black'>♠</span>" + ':此杀对孙寒华无效' +     '<br>'+  "<span data-suit-type='red'>♥♦</span>" +"<span data-suit-type='black'>♣</span>" +':无事发生' ),//莲华
        huituo:( "<span data-suit-type='red'>♥♦</span>" + ':其恢复一点体力' + '<br>' +"<span data-suit-type='black'>♠♣️</span>" + ':其摸伤害值等量牌' ),//恢拓
        beige:(  "<span data-suit-type='red'>♥</span>" + ':其恢复一点体力' + '<br>' +"<span data-suit-type='red'>♦</span>" + ':其摸两张牌' + '<br>' + "<span data-suit-type='black'>♠</span>" + ':伤害来源翻面' + '<br>' + "<span data-suit-type='black'>♣️</span>" + ':伤害来源弃两张牌' ),//悲歌
        rebeige:(  "<span data-suit-type='red'>♥</span>" + ':其恢复伤害值等量体力' + '<br>' +"<span data-suit-type='red'>♦</span>" + ':其摸三张牌'+ '<br>' +  "<span data-suit-type='black'>♠</span>" + ':伤害来源翻面' + '<br>' + "<span data-suit-type='black'>♣️</span>" + ':伤害来源弃两张牌' ),//界悲歌
        chouce:( "<span data-suit-type='black'>♠♣️</span>" + ':弃置任意角色一张牌' +'<br>' +"<span data-suit-type='red'>♥♦</span>" + ':令一名角色摸一张牌（若为先辅则摸两张）'),//筹策
        tuntian:( "<span data-suit-type='red'>♦</span>" +"<span data-suit-type='black'>♠♣</span>" + ':作为田置于武将牌上'+ '<br>' +   "<span data-suit-type='red'>♥</span>" + ':无事发生' ),//屯田
        retuntian:("<span data-suit-type='red'>♦</span>" +"<span data-suit-type='black'>♠♣</span>" + ':作为田置于武将牌上' + '<br>' +  "<span data-suit-type='red'>♥</span>" + ':邓艾获得之' ),//界屯田
        xinfu_jijun:'置于武将牌上作为方。',
        dulie:("<span data-suit-type='red'>♥</span>" + ':取消此杀目标' + '<br>' + "<span data-suit-type='red'>♦</span>" +"<span data-suit-type='black'>♠♣</span>" +':无事发生'),//笃烈
        baonue:("<span data-suit-type='black'>♠</span>" + '董卓恢复一点体力并获得此牌' + '<br>' +  "<span data-suit-type='red'>♥♦</span>" + "<span data-suit-type='black'>♣</span>" + ':无事发生'),//暴虐
        rebaonue:("<span data-suit-type='black'>♠</span>" + '董卓恢复一点体力并获得此牌' + '<br>' +  "<span data-suit-type='red'>♥♦</span>" + "<span data-suit-type='black'>♣</span>" + ':无事发生'),//界暴虐
        olbaonue:("<span data-suit-type='black'>♠</span>" + '董卓恢复一点体力并获得此牌' + '<br>' +  "<span data-suit-type='red'>♥♦</span>" + "<span data-suit-type='black'>♣</span>" + ':无事发生'),//ol暴虐
        dcxiangmian:'对其进行死亡审判',//相面
        xinfu_lveming:( '点数相同：对其造成两点伤害' + '<br>' + '点数不同:获得其一张牌'),
        }
    };
    //不能乱用的函数，主要是解决类似火攻的setcontent为一个空函数的问题
    //需要判断function是不是为空
    function isFunctionEmpty(func) {
        var funcAsString;
        if (func) funcAsString = func.toString();
        var codeInsideFunction = funcAsString.match(/{([\s\S]*)}/);
        return codeInsideFunction === null || /^\s*$/.test(codeInsideFunction[1]);
    };
    //这个东西影响可能比较大，勿滥用
    lib.element.event.setContent = function(name) {
        if (typeof name == 'function') {
            if (name && isFunctionEmpty(name) && this.content && !isFunctionEmpty(this.content)) return this;
            this.content = lib.init.parsex(name);
        } else {
            if (!lib.element.content[name]._parsed) {
                lib.element.content[name] = lib.init.parsex(lib.element.content[name]);
                lib.element.content[name]._parsed = true;
            }
            this.content = lib.element.content[name];
        }
        return this;
    };
    get.slimName = function(str) {
        var str2 = lib.translate[str];
        if (lib.translate[str + '_ab']) str2 = lib.translate[str + '_ab'];
        if (!str2) return '';
        if (str2.indexOf('SP') == 0) {
            str2 = str2.slice(2);
        } else if (str2.indexOf('TW') == 0) {
            str2 = str2.slice(2);
        } else if (str2.indexOf('OL') == 0) {
            str2 = str2.slice(2);
        } else if (str2.indexOf('JSP') == 0) {
            str2 = str2.slice(3);
        } else if (str2.indexOf('☆SP') == 0) {
            str2 = str2.slice(3);
        } else if (str2.indexOf('手杀') == 0) {
            str2 = str2.slice(2);
        } else if (str2.indexOf('☆') == 0) {
            str2 = '星' + str2.slice(1);
        }
        return get.verticalStr(str2, true);
    };
    get.rawName = function(str) {
        if (lib.translate[str + '_ab']) return lib.translate[str + '_ab'];
        var str2 = lib.translate[str];
        if (!str2) return '';
        if (str2.indexOf('SP') == 0) {
            str2 = str2.slice(2);
        } else if (str2.indexOf('TW') == 0) {
            str2 = str2.slice(2);
        } else if (str2.indexOf('OL') == 0) {
            str2 = str2.slice(2);
        } else if (str2.indexOf('JSP') == 0) {
            str2 = str2.slice(3);
        } else if (str2.indexOf('☆SP') == 0) {
            str2 = str2.slice(3);
        } else if (str2.indexOf('手杀') == 0) {
            str2 = str2.slice(2);
        } else if (str2.indexOf('界') == 0 && lib.characterPack.refresh && lib.characterPack.refresh[str]) {
            str2 = str2.slice(1);
        } else if (str2.indexOf('旧') == 0 && (lib.characterPack.old || lib.characterPack.mobile) && (lib.characterPack.old[str] || lib.characterPack.mobile[str])) {
            str2 = str2.slice(1);
        } else if (str2.indexOf('新') == 0 && (str.indexOf('re_') == 0 || str.indexOf('new_') == 0)) {
            str2 = str2.slice(1);
        } else if (str2.indexOf('☆') == 0) {
            str2 = '星' + str2.slice(1);
        }
        return str2;
    };
    //player 类
    lib.arenaReady.push(function() {
        //    lib.skill.dcsilve_target.marktext='私掠';
        // lib.skill.dcsilve_self.marktext='私掠';
        let Player = lib.element.player;
        /*       Player.getCards=function(arg1,arg2){
                   if(typeof arg1!='string'){
                       arg1='h';
                   }
                   var cards=[],cards1=[];
                   var i,j;
                   for(i=0;i<arg1.length;i++){
                       if(arg1[i]=='h'){
                           for(j=0;j<this.node.handcards1.childElementCount;j++){
                               if(!this.node.handcards1.childNodes[j].classList.contains('removing')&&!this.node.handcards1.childNodes[j].classList.contains('glows')&&!this.node.handcards1.childNodes[j].truecard){
                                   cards.push(this.node.handcards1.childNodes[j]);
                               }
                           }
                           for(j=0;j<this.node.handcards2.childElementCount;j++){
                               if(!this.node.handcards2.childNodes[j].classList.contains('removing')&&!this.node.handcards2.childNodes[j].classList.contains('glows')&&!this.node.handcards1.childNodes[j].truecard){
                                   cards.push(this.node.handcards2.childNodes[j]);
                               }
                           }
                       }
                       else if(arg1[i]=='s'){
                           for(j=0;j<this.node.handcards1.childElementCount;j++){
                               if(!this.node.handcards1.childNodes[j].classList.contains('removing')&&this.node.handcards1.childNodes[j].classList.contains('glows')){
                                   cards.push(this.node.handcards1.childNodes[j]);
                               }
                           }
                           for(j=0;j<this.node.handcards2.childElementCount;j++){
                               if(!this.node.handcards2.childNodes[j].classList.contains('removing')&&this.node.handcards2.childNodes[j].classList.contains('glows')){
                                   cards.push(this.node.handcards2.childNodes[j]);
                               }
                           }
                       }
                       else if(arg1[i]=='e'){
                           for(j=0;j<this.node.equips.childElementCount;j++){
                               if(!this.node.equips.childNodes[j].classList.contains('removing')&&!this.node.equips.childNodes[j].classList.contains('feichu')){
                                   if(this.node.equips.childNodes[j].falsecard)cards.push(this.node.equips.childNodes[j].falsecard);
                                   else cards.push(this.node.equips.childNodes[j]);
                               }
                           }
                       }
                       else if(arg1[i]=='j'){
                           for(j=0;j<this.node.judges.childElementCount;j++){
                               if(!this.node.judges.childNodes[j].classList.contains('removing')&&!this.node.judges.childNodes[j].classList.contains('feichu')){
                                   cards.push(this.node.judges.childNodes[j]);
                                   if(this.node.judges.childNodes[j].viewAs&&arguments.length>1){
                                       this.node.judges.childNodes[j].tempJudge=this.node.judges.childNodes[j].name;
                                       this.node.judges.childNodes[j].name=this.node.judges.childNodes[j].viewAs;
                                       cards1.push(this.node.judges.childNodes[j]);
                                   }
                               }
                           }
                       }
                       else if(arg1[i]=='x'){
                           for(j=0;j<this.node.expansions.childElementCount;j++){
                               if(!this.node.expansions.childNodes[j].classList.contains('removing')){
                                   cards.push(this.node.expansions.childNodes[j]);
                               }
                           }
                       }
                       else if(arg1[i]=='f'){
                           for(j=0;j<this.node.handcards1.childElementCount;j++){
                               if(this.node.handcards1.childNodes[j].truecard){
                                   cards.push(this.node.handcards1.childNodes[j]);
                               }
                           }
                           for(j=0;j<this.node.handcards2.childElementCount;j++){
                               if(this.node.handcards1.childNodes[j].truecard){
                                   cards.push(this.node.handcards2.childNodes[j]);
                               }
                           }
                       }
                   }
                   if(arguments.length==1){
                       return cards;
                   }
                   if(arg2){
                       if(typeof arg2=='string'){
                           for(i=0;i<cards.length;i++){
                               if(get.name(cards[i])!=arg2){
                                   cards.splice(i,1);i--;
                               }
                           }
                       }
                       else if(typeof arg2=='object'){
                           for(i=0;i<cards.length;i++){
                               for(j in arg2){
                                   var value;
                                   if(j=='type'||j=='subtype'||j=='color'||j=='suit'||j=='number'){
                                       value=get[j](cards[i]);
                                   }
                                   else{
                                       value=cards[i][j];
                                   }
                                   if((typeof arg2[j]=='string'&&value!=arg2[j])||
                                       (Array.isArray(arg2[j])&&!arg2[j].contains(value))){
                                       cards.splice(i--,1);break;
                                   }
                               }
                           }
                       }
                       else if(typeof arg2=='function'){
                           for(i=0;i<cards.length;i++){
                               if(!arg2(cards[i])){
                                   cards.splice(i--,1);
                               }
                           }
                       }
                   }
                   for(i=0;i<cards1.length;i++){
                       if(cards1[i].tempJudge){
                           cards1[i].name=cards1[i].tempJudge;
                           delete cards1[i].tempJudge;
                       }
                   }
                   return cards;
               };*/
        //修改的dialog.add函数，主要是为了更好的控制样式，添加第四个参数ac，用来控制按钮的位置

        if(lib.config.dialog_gold_title) {
            let size = 45;
            game.createCss(`
            .changeGoldDialogFix {
                margin-top: -10px !important;
                margin-bottom: -5px !important;
            }
            .contentContainerFixed {
                top: ${size}px !important;
                height: auto !important;
                bottom: 0 !important;
            }
            .contentContainerHide {
                display: none !important;
            }
            .contentGoldTitlePosition {
                top: 0;
                left: 50%;
                transform: translateX(-50%);
            }
            `);
            lib.element.dialog.add = function(item, noclick, zoom, ac, gold) {
                if(!this.addHistory) {
                    this.addHistory=[];
                    this.getAddHistory=function() {
                        return JSON.stringify(this.addHistory,null,2);
                    };
                }
                const thisDialog = this;
                const addToGoldTitle = function(str) {
                    let goldText = game.changeToGoldTitle(str);
                    let goldTitle = ui.create.caption(goldText, thisDialog);
                    goldTitle.classList.add('contentGoldTitlePosition');
                    return goldTitle;
                };
                this.addAGoldTitle = addToGoldTitle;
                if(!this._titles) {
                    /*this.changGoldTitle={
                        'from':false,
                        'to':false,
                        'deletes':[],
                    };*/
                    this._titles={
                        //金色标题（不在content内）✓
                        'goldTitle':false,
                        //原版标题×
                        'title':false,
                        //新增显示✓
                        'additions':[],
                        //本窗口
                        'dialog':thisDialog,
                    };
                    let theContent = this._titles;
                    this.changeToGoldTitleDialog = function(toGold) {
                        let bool = theContent.goldTitle ? toGold : false;
                        //显示金色标题
                        if(theContent.goldTitle) {
                            theContent.goldTitle.classList[bool?'remove':'add']('contentContainerHide');
                        }
                        //隐藏原本标题
                        if(theContent.title) {
                            theContent.title.classList[bool?'add':'remove']('contentContainerHide');
                        }
                        //显示额外内容
                        if(theContent.additions?.length) {
                            theContent.additions.forEach(obj=>obj.classList[bool?'remove':'add']('contentContainerHide'));
                        }
                        //调整窗口大小
                        if(theContent.dialog?.contentContainer) {
                            theContent.dialog.contentContainer.classList[bool?'add':'remove']('contentContainerFixed');
                        }
                    }
                }
                var sths=item;
                var sttype='none';
                if (typeof item == 'string') {
                    //识别[$noPreCards]标签（史诗卡牌的美化关闭）
                    if(item.indexOf('[$noPreCards]') != -1) {
                        item = item.replace('[$noPreCards]', '');
                        this.noPre = true;
                    }
                    //识别这个特殊的dialog标签
                    let specialTips = {
                        'noforcebutton': 'noforcebutton',
                    };
                    if (specialTips[item]) {
                        this[specialTips[item]] = true;
                        ui.update();
                        return item;
                    }
                    if (item.indexOf('###') == 0) {
                        var items = item.slice(3)
                            .split('###');
                        var title=items[0];
                        /*if(!this.classList.contains('prompt')&&!game.hasGoldFont(title)) {
                            title=game.changeToGoldTitle(title);
                        }
                        alert('①'+title);*/
                        this.add(items[0], noclick, zoom);
                        this.addText(items[1], items[1].length <= 20, zoom);
                        sttype='###';
                    } else if (noclick) {
                        var strstr = item;
                        item = ui.create.div('', this.content);
                        item.innerHTML = strstr;
                        sttype='noclick';
                    } else {
                        //第一次加的标题尝试转化成金色传说
                        var isATitle='no';
                        //获取本人技能池
                        var skillsTras=[];
                        if(_status.event) {
                            if(_status.event.player&&_status.event.player.getSkills) {
                                var skss=_status.event.player.getSkills(true,false);
                                skss.forEach(s=>{
                                    skillsTras.add(get.translation(s));
                                });
                            }
                            if(game.me&&game.me.getSkills) {
                                var skss=game.me.getSkills(true,false);
                                skss.forEach(s=>{
                                    skillsTras.add(get.translation(s));
                                });
                            }
                        }
                        if(item&&item.slice(-1)=='▾') {
                            //原生的“▾”不要动了
                        }else if(gold === true) {
                            //这个纯加金的，没有任何用处
                            item=game.changeToGoldTitle(item);
                            sttype='gold';
                        }else if(gold === false) {
                            //这个加addition的，会被记录
                            isATitle='addition';
                            sttype='addition';
                        }else if(['战斗胜利','战斗失败','战斗结束','自由选将'].contains(item)) {
                            //特殊标题直接开绿灯了
                            this._titles.goldTitle = addToGoldTitle(item);
                            isATitle='yes';
                            sttype='extra';
                        }else if(skillsTras.contains(item)) {
                            //无框技能这里有点bug，在这里放个旧老头看看效果怎么样
                            //this.changGoldTitle.to=item;
                            //item=game.changeToGoldTitle(item);
                            this._titles.goldTitle = addToGoldTitle(item);
                            isATitle='yes';
                            sttype='skills';
                        }else if(!this.isNoTouch&&!this.addHistory.length&&!game.hasGoldFont(item)) {
                            //var nog=false;
                            var stevtname=false;
                            sttype='change';
                            if(game.specialModeTitle) {
                                stevtname=game.specialModeTitle;
                                sttype='specialTitle';
                            }
                            if(_status.event) {
                                //卡牌也可以吧（比如火攻）
                                if(_status.event.name&&lib.card[_status.event.name]&&lib.translate[_status.event.name]) {
                                    stevtname=_status.event.name;
                                    sttype='eventNameCard';
                                }
                                if(_status.event.getParent()&&_status.event.getParent().name&&lib.card[_status.event.getParent().name]&&lib.translate[_status.event.getParent().name]) {
                                    stevtname=_status.event.getParent().name;
                                    sttype='eventParentCard';
                                }
                                //技能也可以
                                if(_status.event.name&&lib.skill[_status.event.name]&&lib.translate[_status.event.name]) {
                                    stevtname=_status.event.name;
                                    sttype='eventName';
                                }
                                if(_status.event.getParent()&&_status.event.getParent().name&&lib.skill[_status.event.getParent().name]&&lib.translate[_status.event.getParent().name]) {
                                    stevtname=_status.event.getParent().name;
                                    sttype='eventParent';
                                }
                                if(_status.event.goldTitle) {
                                    stevtname=_status.event.goldTitle;
                                    sttype='goldTitle';
                                }
                            }
                            //if(_status.event&&_status.event.name&&lib.skill[_status.event.name]) {
                            //检测到有名称
                            if(stevtname&&get.translation(stevtname).length) {
                                var sktt=get.translation(stevtname);
                                this._titles.goldTitle = addToGoldTitle(sktt);
                                //名称在item内存在
                                if(item.indexOf(sktt)==0) {
                                    //this.changGoldTitle.to=item;
                                    isATitle='yes';
                                    if(item.length>sktt.length) {
                                        var idx=item.indexOf(sktt)+sktt.length;
                                        if([':','：'].contains(item[idx])) {
                                            idx++;
                                        }
                                        let additions = item.slice(idx);
                                        this.add(additions, noclick, zoom, ac, false);
                                        //nog=true;
                                    }else {
                                    
                                    }
                                //名称独立存在
                                }else {
                                    //this.changGoldTitle.to=item;
                                    //nog=true;
                                    //isATitle='second';
                                }
                            //判定此内容为标题
                            }else if(item.length>0&&item!=" "&&item.length<=8) {
                                //this.changGoldTitle.to=item;
                                this._titles.goldTitle = addToGoldTitle(item);
                                isATitle='yes';
                                sttype='666';
                            }else {
                                //nog=true;
                            }
                            /*if(!nog) {
                                //item=game.changeToGoldTitle(item);
                                this._titles.goldTitle = addToGoldTitle(item);
                                isATitle='first';
                            }*/
                        }
                        item = ui.create.caption(item, this.content);
                        //item作为标题被转换
                        if(isATitle=='yes') {
                            //this.changGoldTitle.from=item;
                            this._titles.title=item;
                        //item作为额外显示而被加入
                        }else if(isATitle=='addition') {
                            //this.changGoldTitle.deletes.push(item);
                            item.classList.add('changeGoldDialogFix');
                            this._titles.additions.push(item);
                        }
                    }
                    this.addHistory.push({
                        'string':sths,
                        'type':sttype,
                    });
                    this.changeToGoldTitleDialog(true);
                } else if (get.objtype(item) == 'div') {
                    this.content.appendChild(item);
                    this.addHistory.push({
                        'div':sths,
                    });
                } else if (get.itemtype(item) == 'cards') {
                    var buttons = ui.create.div('.buttons', this.content);
                    if (zoom) buttons.classList.add('smallzoom');
                    //如果有ac属性，那么就是ac来appendChild
                    if (ac) ac.appendChild(buttons);
                    this.buttons = this.buttons.concat(ui.create.buttons(item, 'card', buttons, noclick));
                    this.addHistory.push({
                        'cards':sths,
                    });
                } else if (get.itemtype(item) == 'players') {
                    var buttons = ui.create.div('.buttons', this.content);
                    if (zoom) buttons.classList.add('smallzoom');
                    //如果有ac属性，那么就是ac来appendChild
                    if (ac) ac.appendChild(buttons);
                    this.buttons = this.buttons.concat(ui.create.buttons(item, 'player', buttons, noclick));
                    this.addHistory.push({
                        'players':sths,
                    });
                } else if (item[1] == 'textbutton') {
                    ui.create.textbuttons(item[0], this, noclick);
                    this.addHistory.push({
                        'textbutton':sths,
                    });
                } else {
                    var buttons = ui.create.div('.buttons', this.content);
                    if (zoom) buttons.classList.add('smallzoom');
                    //如果有ac属性，那么就是ac来appendChild
                    if (ac) ac.appendChild(buttons);
                    if (item[1] && item[1].indexOf('character') != -1) {
                        if (this.intersection == undefined && self.IntersectionObserver) {
                            this.intersection = new IntersectionObserver(function(entries) {
                                for (var i = 0; i < entries.length; i++) {
                                    if (entries[i].intersectionRatio > 0) {
                                        var target = entries[i].target;
                                        target.setBackground(target.awaitItem, 'character');
                                        this.unobserve(target);
                                    }
                                }
                            }, {
                                root: this,
                                rootMargin: '0px',
                                thresholds: 0.01,
                            });
                        }
                        buttons.intersection = this.intersection;
                    }
                    this.buttons = this.buttons.concat(ui.create.buttons(item[0], item[1], buttons, noclick));
                    this.addHistory.push({
                        'other':sths,
                    });
                }
                if (this.buttons.length) {
                    if (this.forcebutton !== false) this.forcebutton = true;
                    if (this.buttons.length > 3 || (zoom && this.buttons.length > 5)) {
                        this.classList.remove('forcebutton-auto');
                    } else if (!this.noforcebutton) {
                        this.classList.add('forcebutton-auto');
                    }
                }
                ui.update();
                return item;
            };
        }else {
            lib.element.dialog.add = function(item, noclick, zoom, ac) {
                if (typeof item == 'string') {
                    if (item.indexOf('###') == 0) {
                        var items = item.slice(3)
                            .split('###');
                        this.add(items[0], noclick, zoom);
                        this.addText(items[1], items[1].length <= 20, zoom);
                    } else if (noclick) {
                        var strstr = item;
                        item = ui.create.div('', this.content);
                        item.innerHTML = strstr;
                    } else {
                        item = ui.create.caption(item, this.content);
                    }
                } else if (get.objtype(item) == 'div') {
                    this.content.appendChild(item);
                } else if (get.itemtype(item) == 'cards') {
                    var buttons = ui.create.div('.buttons', this.content);
                    if (zoom) buttons.classList.add('smallzoom');
                    //如果有ac属性，那么就是ac来appendChild
                    if (ac) ac.appendChild(buttons);
                    this.buttons = this.buttons.concat(ui.create.buttons(item, 'card', buttons, noclick));
                } else if (get.itemtype(item) == 'players') {
                    var buttons = ui.create.div('.buttons', this.content);
                    if (zoom) buttons.classList.add('smallzoom');
                    //如果有ac属性，那么就是ac来appendChild
                    if (ac) ac.appendChild(buttons);
                    this.buttons = this.buttons.concat(ui.create.buttons(item, 'player', buttons, noclick));
                } else if (item[1] == 'textbutton') {
                    ui.create.textbuttons(item[0], this, noclick);
                } else {
                    var buttons = ui.create.div('.buttons', this.content);
                    if (zoom) buttons.classList.add('smallzoom');
                    //如果有ac属性，那么就是ac来appendChild
                    if (ac) ac.appendChild(buttons);
                    if (item[1] && item[1].indexOf('character') != -1) {
                        if (this.intersection == undefined && self.IntersectionObserver) {
                            this.intersection = new IntersectionObserver(function(entries) {
                                for (var i = 0; i < entries.length; i++) {
                                    if (entries[i].intersectionRatio > 0) {
                                        var target = entries[i].target;
                                        target.setBackground(target.awaitItem, 'character');
                                        this.unobserve(target);
                                    }
                                }
                            }, {
                                root: this,
                                rootMargin: '0px',
                                thresholds: 0.01,
                            });
                        }
                        buttons.intersection = this.intersection;
                    }
                    this.buttons = this.buttons.concat(ui.create.buttons(item[0], item[1], buttons, noclick));
                }
                if (this.buttons.length) {
                    if (this.forcebutton !== false) this.forcebutton = true;
                    if (this.buttons.length > 3 || (zoom && this.buttons.length > 5)) {
                        this.classList.remove('forcebutton-auto');
                    } else if (!this.noforcebutton) {
                        this.classList.add('forcebutton-auto');
                    }
                }
                ui.update();
                return item;
            };
        }
        //展示手牌，将它变为使用新的showcards函数
        Player.showHandcards = function(str) {
            let player = this;
            if (player.countCards('h') == 0) {
                //Helasisy改·都没有event哪来finish？
                //event.finish();
                return;
            }
            var cards = player.getCards('h');
            player.showCards(cards);

        };
        //展示牌
        Player.showCards = function(cards, str) {
            var next = game.createEvent('showCards');
            next.player = this;
            next.str = str;
            if (typeof cards == 'string') {
                str = cards;
                cards = next.str;
                next.str = str;
            }
            if (get.itemtype(cards) == 'card') next.cards = [cards];
            else if (get.itemtype(cards) == 'cards') next.cards = cards.slice(0);
            else _status.event.next.remove(next);
            next.setContent('showCards');
            next._args = Array.from(arguments);
            next.delay = false;
            next.delayx = false;
            return next;
        };
        //展示牌的具体函数
        lib.element.content.showCards = function() {
            //自动关闭火攻框的函数，但是，由于火攻代码里有game.delay，所以他会先显示，在delay时间结束后才执行这个操作
            if (_status.event.parent && _status.event.parent.dialog) _status.event.parent.dialog.close();
            if (get.itemtype(cards) != 'cards') {
                event.finish();
                return;
            }
            var cards2 = cards.slice(0);
            if (event.hiddencards) {
                for (var i = 0; i < event.hiddencards.length; i++) {
                    cards2.remove(event.hiddencards[i]);
                }
            }
            //这里对牌调用一个扔牌操作
            player.$showCards(cards2);

        };
        //这里实际上是复刻了throw
        Player.$showCards = function(cards, time, record, nosource) {
            //删掉火攻那个框
            //if(_status.event.parent&&_status.event.parent.dialog)_status.event.parent.dialog.close();
            var duiMod = (cards.duiMod && game.me == this && !nosource);
            var card;
            var clone;
            var player = this;
            var hand = dui.boundsCaches.hand;
            hand.check();
            for (var i = 0; i < cards.length; i++) {
                card = cards[i];
                if (card) {
                    clone = card.copy('thrown');
                    if (get.owner(card) == game.me && player == game.me) {
                        clone.tx = Math.round(hand.x + card.tx);
                        if (card.tx == undefined) clone.tx = Math.round(hand._width * 0.6);
                        clone.tx -= 90 * i;
                        clone.ty = Math.round(hand.y + 30 + card.ty);
                        if (card.ty == undefined) clone.ty = Math.round(hand.y + 60);
                        clone.scaled = true;
                        clone.throwordered = true;
                        clone.style.transform = 'translate(' + clone.tx + 'px,' + clone.ty + 'px) scale(' + hand.cardScale + ')';
                        if (lib.config["extension_史诗卡牌_cardPhantom"]) EpicFX.card.phantom4(clone);
                    } else if (get.owner(card) == undefined && player == game.me) {
                        clone.tx = Math.round(dui.boundsCaches.arena.width * 0.5);
                        clone.tx -= 90 * i;
                        clone.ty = Math.round(hand.y + 60);
                        clone.scaled = true;
                        clone.throwordered = true;
                        clone.style.transform = 'translate(' + clone.tx + 'px,' + clone.ty + 'px) scale(' + hand.cardScale + ')';
                        if (lib.config["extension_史诗卡牌_cardPhantom"]) EpicFX.card.phantom4(clone);
                    }
                    card = clone;
                } else {
                    card = dui.element.create('card infohidden infoflip');
                    card.moveTo = lib.element.card.moveTo;
                    card.moveDelete = lib.element.card.moveDelete;
                }

                cards[i] = card;
            }
            game.log(player, '展示了', cards);
            game.addVideo('showCards', player, [get.cardsInfo(cards), 0, nosource]);
            if (duiMod && cards.length > 2) {
                cards.sort(function(a, b) {
                    if (a.tx == undefined && b.tx == undefined) return 0;

                    if (a.tx == undefined) return duicfg.rightLayout ? -1 : 1;

                    if (b.tx == undefined) return duicfg.rightLayout ? 1 : -1;

                    return b.tx - a.tx;
                });
            }
            for (var i = 0; i < cards.length; i++)
            player.$showCards2(cards[i], nosource);
            if (game.chess) this.chessFocus();
            return cards[cards.length - 1];
        };
        //同样的，复刻了throwordered2
        Player.$showCards2 = function(card, nosource) {
            if (_status.event.parent && _status.event.parent.dialog) _status.event.parent.dialog.close();
            if (card._tempName) card._tempName.remove();
            //      if (ui.cardDialog) ui.cardDialog.remove();
            //    if (_status.event.handTip) _status.event.handTip.show();
            let cardsob = game.me.getCards('hes',false,true);
            for (i = 0; i < cardsob.length; i++) {
                if (cardsob[i].falsecard) {
                    cardsob[i].falsecard.fix();
                    cardsob[i].falsecard.remove();
                    cardsob[i].falsecard.destroyed = true;
                    delete cardsob[i].falsecard;
                    dui.queueNextFrameTick(dui.layoutHand, dui);
                }
            };
            if (card.cheats) {
                card.listenTransition(function() {
                    decadeUI.animation.playSpine('kapaizhuanhuan', {
                        scale: 0.56,
                        parent: "card",
                        speed: 0.75
                    });
                    setTimeout(function() {
                        card.cheats.remove();
                    }, 200);
                });

            }
            if (_status.connectMode) ui.todiscard = [];
            if (card.throwordered == undefined) {
                var x, y;
                var bounds = dui.boundsCaches.arena;
                if (!bounds.updated) bounds.update();
                this.checkBoundsCache();
                if (nosource) {
                    x = ((bounds.width - bounds.cardWidth) / 2 - bounds.width * 0.08);
                    y = ((bounds.height - bounds.cardHeight) / 2);
                } else {
                    x = ((this.cacheWidth - bounds.cardWidth) / 2 + this.cacheLeft);
                    y = ((this.cacheHeight - bounds.cardHeight) / 2 + this.cacheTop);
                }
                x = Math.round(x);
                y = Math.round(y);
                card.tx = x;
                card.ty = y;
                card.scaled = true;
                card.classList.add('thrown');
                card.style.transform = 'translate(' + x + 'px, ' + y + 'px)' + 'scale(' + 0.88 * bounds.cardScale + ')';
                if (lib.config["extension_史诗卡牌_cardPhantom"]) EpicFX.card.phantom4(card);
            } else {
                card.throwordered = undefined;
            }

            if (card.fixed) return ui.arena.appendChild(card);
            var before;
            for (var i = 0; i < ui.thrown; i++) {
                if (ui.thrown[i].parentNode == ui.arena) {
                    before = ui.thrown[i];
                    break;
                }
            }
            var tagNode = card.querySelector('.used-info');
            if (tagNode == null) tagNode = card.appendChild(dui.element.create('used-info'));
            //来自幻影卡牌的函数
            if (lib.config["extension_史诗卡牌_cardPhantom"]) {
                if (card.smp) {
                    tagNode.setAttribute('style', 'display:block !important');
                    let path = EpicFX.extensionPath + "asset/img/cardTitle/";
                    let imageElement = new Image();

                    function typeEval(name, nature) {
                        if (nature && name == "sha") {
                            let str;
                            if (nature == "fire") {
                                str = "huosha";
                            } else if (nature == "thunder") {
                                str = "leisha";
                            } else if (nature == "kami") {
                                str = "shensha";
                            } else if (nature == "ice") {
                                str = "bingsha";
                            } else if (nature == "stab") {
                                str = "cisha";
                            }
                            return str;
                        } else {
                            return name;
                        }
                    }

                    imageElement.classList.add("cardTitle");
                    imageElement.src = path + typeEval(card.smp.name, card.smp.nature) + ".png";
                    imageElement.onerror = function() {
                        this.remove()
                    }
                    card.appendChild(imageElement);
                }
            }
            card.$usedtag = tagNode;
            ui.thrown.unshift(card);
            if (before) ui.arena.insertBefore(before, card);
            else ui.arena.appendChild(card);

            dui.tryAddPlayerCardUseTag(card, this, _status.event);
            dui.queueNextFrameTick(dui.layoutDiscard, dui);
            return card;
        };
        //相应牌的虚拟
        lib.element.content.respond = function() {
            "step 0"
            var cardaudio = true;
            if (event.skill) {
                if (lib.skill[event.skill].audio) {
                    cardaudio = false;
                }
                player.logSkill(event.skill);
                player.checkShow(event.skill, true);
                if (lib.skill[event.skill].onrespond && !game.online) {
                    lib.skill[event.skill].onrespond(event, player);
                }
            } else if (!event.nopopup) player.tryCardAnimate(card, card.name, 'wood');
            if (cardaudio && event.getParent(3)
                .name == 'useCard') {
                game.broadcastAll(function(player, card) {
                    if (lib.config.background_audio) {
                        var sex = player.sex == 'female' ? 'female' : 'male';
                        var audioinfo = lib.card[card.name].audio;
                        if (typeof audioinfo == 'string' && audioinfo.indexOf('ext:') == 0) {
                            game.playAudio('..', 'extension', audioinfo.slice(4), card.name + '_' + sex);
                        } else {
                            game.playAudio('card', sex, card.name);
                        }
                    }
                }, player, card);
            }
            if (event.skill) {
                if (player.stat[player.stat.length - 1].skill[event.skill] == undefined) {
                    player.stat[player.stat.length - 1].skill[event.skill] = 1;
                } else {
                    player.stat[player.stat.length - 1].skill[event.skill]++;
                }
                var sourceSkill = get.info(event.skill)
                    .sourceSkill;
                if (sourceSkill) {
                    if (player.stat[player.stat.length - 1].skill[sourceSkill] == undefined) {
                        player.stat[player.stat.length - 1].skill[sourceSkill] = 1;
                    } else {
                        player.stat[player.stat.length - 1].skill[sourceSkill]++;
                    }
                }
            }
            if (cards.length && (cards.length > 1 || cards[0].name != card.name)) {
                game.log(player, '打出了', card, '（', cards, '）');
            } else {
                game.log(player, '打出了', card);
            }
            player.actionHistory[player.actionHistory.length - 1].respond.push(event);
            var cards2 = cards.concat();
            if (cards2.length) {
                var next = player.lose(cards2, ui.ordering, 'visible');
                cards2.removeArray(next.cards);
                if (event.noOrdering) next.noOrdering = true;

                if (event.animate != false && event.
                throw !==false) {
                    next.animate = true;
                    next.blameEvent = event;
                }

                if (cards2.length) {
                    var next2 = game.cardsGotoOrdering(cards2);
                    if (event.noOrdering) next2.noOrdering = true;

                    player.$throw(cards2);
                }
            } else {
                //响应
                var evt = _status.event;
                if (evt && evt.card && evt.cards === cards) {


                    var card = ui.create.card()
                        .init([
                    evt.card.suit,
                    evt.card.number,
                    evt.card.name,
                    evt.card.nature, ]);
                    if (evt.card.suit == 'none') card.node.suitnum.style.display = 'none';

                    card.dataset.virtualCard = true;
                    cards2 = [card];
                    card.virtualMark = ui.create.div('.virtualMark', card);
                }
                player.$throw(cards2);
            }
            event.trigger('respond');
            "step 1"
            game.delayx(0.5);
        };
        //扔牌函数，改动较多，转化，虚拟都在这个地方
        //关于转化，现在在转化牌上额外创建一个相同的原牌，然后定时闪光，删除原牌
        //神黄月英驾到，统统闪开！
        //关于转化，现在在转化牌上额外创建一个相同的原牌，然后定时闪光，删除原牌
        Player.$throw = function(cards, time, record, nosource) {
            //meihua
            var itemtype;
            var card;
            var duiMod = (cards.duiMod && game.me == this && !nosource);
            if (typeof cards == 'number') {
                itemtype = 'number';
                cards = new Array(cards);
            } else {
                itemtype = get.itemtype(cards);
                if (itemtype == 'cards') {
                    cards = cards.concat();
                } else if (itemtype == 'card') {
                    cards = [cards];
                } else {
                    //虚拟牌相关
                    var evt = _status.event;
                    if (evt && evt.card && evt.cards === cards) {
                        var card = ui.create.card()
                            .init([
                        evt.card.suit,
                        evt.card.number,
                        evt.card.name,
                        evt.card.nature, ]);
                        if (evt.card.suit == 'none') card.node.suitnum.style.display = 'none';
                        card.dataset.virtualCard = true;
                        cards = [card];
                        card.virtualMark = ui.create.div('.virtualMark', card);
                    }
                }
            }
            var clone;
            var player = this;
            var hand = dui.boundsCaches.hand;
            hand.check();
            //对应的事件的上级事件的卡牌，一般情况这是达成实际效果的卡牌而不是卡牌实例
            if (_status.event.parent) var cardk = _status.event.parent.card;
            for (var i = 0; i < cards.length; i++) {
                card = cards[i];
                if (card) {
                    //这里与手牌显示装备区有关，删掉实体卡牌映射的虚假卡牌
                    if (card.falsecard) {
                        card.falsecard.fix();
                        card.falsecard.remove();
                        card.falsecard.destroyed = true;
                        delete card.falsecard;
                        //刷新手牌
                        dui.queueNextFrameTick(dui.layoutHand, dui);
                    }
                    //清除打出去的牌的横tag，以免进入弃牌堆里有tag，洗牌后tag跟着牌一起回来
                    if (card._tempName) card._tempName.remove();
                    //如果没有bianhua（主动）和bianhua2（被动））且没有cardk或者有cardk但card和cardk完全相同 
                    if (card.bianhua != true && card.bianhua2 != true && (!cardk || (card.name == cardk.name && card.nature == cardk.nature && card.number == cardk.number))) clone = card.copy('thrown');
                    //否则的话如果此时是usecard事件和respond事件就从克隆卡牌变为创建新卡牌
                    else if ((_status.event.parent.name == 'useCard' || _status.event.parent.name == 'respond') && _status.event.type != 'card') {
                        clone = ui.create.card()
                            .init([
                        cardk.suit,
                        cardk.number,
                        cardk.name,
                        cardk.nature, ]);
                        //添加thrown类名才能正确显示
                        clone.classList.add('thrown');
                        //转标记
                        clone._tempNamed = ui.create.div('.temp-name', clone)
                        clone._tempNamed.innerHTML = '<div style="width:33px; height:31px; left:71px; top:5px; position:absolute; background-image: url(' + lib.assetURL + 'extension/十周年UI/image/vcard/zhuan.png);background-size: 100% 100%;"></div>';
                        //无色有点数
                        if (cardk.suit == 'none' && cardk.number) clone.querySelector('.suit-num')
                            .querySelectorAll('span.suit')[0].innerHTML = "<img src='" + lib.assetURL + "extension/十周年UI/image/vcard/none.png" + "' style='position:relative;width:20px;height:35px;bottom:0px;left:3px;'/>";
                        //颜色变化
                        //无点数且牌数大于1
                        else if (get.color(cardk) == 'none' && cardk.cards && cardk.cards.length > 1 && get.suit(cardk) == 'none') clone.getElementsByClassName("suit-num")[0].innerHTML = "<img src='" + lib.assetURL + "extension/十周年UI/image/vcard/none.png" + "' style='position:relative;width:20px;height:35px;bottom:0px;left:3px;'/>";
                        else if (get.color(cardk) == 'red' && cardk.cards && cardk.cards.length > 1) clone.getElementsByClassName("suit-num")[0].innerHTML = "<img src='" + lib.assetURL + "extension/十周年UI/image/vcard/red.png" + "' style='position:relative;width:20px;height:35px;bottom:0px;left:3px;'/>";
                        else if (get.color(cardk) == 'black' && cardk.cards && cardk.cards.length > 1) clone.getElementsByClassName("suit-num")[0].innerHTML = "<img src='" + lib.assetURL + "extension/十周年UI/image/vcard/black.png" + "' style='position:relative;width:20px;height:35px;bottom:0px;left:3px;'/>";
                        //试试添加一个原牌皮
                        let cheats = card.copy('thrown');
                        clone.appendChild(cheats)
                        clone.cheats = cheats;
        
                        // 添加对 game._tempViewAs 的判断（最后判断）
                        if (game._tempViewAs && game._tempViewAs[cardk.name]) {
                            let tempCardName = game._tempViewAs[cardk.name];
                            //storage/emulated/0/Android/data/com.helasisy.liulikillTest/extension/十周年UI/image/card/zc26_bagua.png
                            clone.style.backgroundImage = 'url("' + lib.assetURL + "extension/十周年UI/image/card/" + tempCardName + ".png" + '")';
                            
                            // 隐藏原来的花色点数显示
                            if (clone.querySelector('.suit-num')) {
                                clone.querySelector('.suit-num').style.display = 'none';
                            }
                            
                            // 修改转标记为显示 game._tempViewAs 的牌名
                            if (clone._tempNamed) {
                                clone._tempNamed.remove();
                            }
                            clone._tempNamed = ui.create.div('.temp-name', clone);
                            let nameText = get.translation(tempCardName) || tempCardName;
                            clone._tempNamed.innerHTML = '<div style="width:100%; height:100%; position:absolute; display:flex; align-items:center; justify-content:center; color:white; font-size:12px; text-shadow:1px 1px 2px black;">' + nameText + '</div>';
                        }
        
                    } else clone = card.copy('thrown');
                    
                    // 对于第一种情况（直接复制的牌），也添加 game._tempViewAs 支持
                    if (clone && !clone._tempNamed && game._tempViewAs && game._tempViewAs[card.name]) {
                        let tempCardName = game._tempViewAs[card.name];
                        clone.style.backgroundImage = 'url("' + lib.assetURL + "extension/十周年UI/image/card/" + tempCardName + ".png" + '")';
                        
                        if (clone.querySelector('.suit-num')) {
                            clone.querySelector('.suit-num').style.display = 'none';
                        }
                        
                        clone._tempNamed = ui.create.div('.temp-name', clone);
                        let nameText = get.translation(tempCardName) || tempCardName;
                        clone._tempNamed.innerHTML = '<div style="width:100%; height:100%; position:absolute; display:flex; align-items:center; justify-content:center; color:white; font-size:12px; text-shadow:1px 1px 2px black;">' + nameText + '</div>';
                    }
                    
                    //这里添加一个从装备区扔牌的位置，还有火攻展示事件的牌的位置
                    if (duiMod && (card.throwWith == 'h' || card.throwWith == 's') || (_status.event.name == 'useSkill' && player == game.me && card.throwWith != 'e') || (_status.event.type == 'card' && player == game.me)) {
                        clone.tx = Math.round(hand.x + card.tx);
                        clone.ty = Math.round(hand.y + 30 + card.ty);
                        clone.scaled = true;
                        clone.throwordered = true;
                        clone.style.transform = 'translate(' + clone.tx + 'px,' + clone.ty + 'px) scale(' + hand.cardScale + ')';
                        if (lib.config["extension_史诗卡牌_cardPhantom"]) EpicFX.card.phantom4(clone);
                        //装备区和虚拟牌从底下仍
                    } else if ((card.throwWith == 'e' || card.dataset.virtualCard) && player == game.me && _status.event.getParent(2)
                        .name != 'discardPlayerCard') {
                        clone.tx = Math.round(hand._width * 0.6);
                        clone.ty = Math.round(hand.y + 60);
                        clone.scaled = true;
                        clone.throwordered = true;
                        clone.style.transform = 'translate(' + clone.tx + 'px,' + clone.ty + 'px) scale(' + hand.cardScale + ')';
                        if (lib.config["extension_史诗卡牌_cardPhantom"]) EpicFX.card.phantom4(clone);
                    }
                    card = clone;
                } else {
                    card = dui.element.create('card infohidden infoflip');
                    card.moveTo = lib.element.card.moveTo;
                    card.moveDelete = lib.element.card.moveDelete;
                }
                cards[i] = card;
            }
            if (record !== false) {
                if (record !== 'nobroadcast') {
                    game.broadcast(function(player, cards, time, record, nosource) {
                        player.$throw(cards, time, record, nosource);
                    }, this, cards, 0, record, nosource);
                }
        
                game.addVideo('throw', this, [get.cardsInfo(cards), 0, nosource]);
            }
        
            if (duiMod && cards.length > 2) {
                cards.sort(function(a, b) {
                    if (a.tx == undefined && b.tx == undefined) return 0;
        
                    if (a.tx == undefined) return duicfg.rightLayout ? -1 : 1;
        
                    if (b.tx == undefined) return duicfg.rightLayout ? 1 : -1;
        
                    return b.tx - a.tx;
                });
            }
            //调换i的顺序
            for (var i = cards.length - 1; i >= 0; i--)
            player.$throwordered2(cards[i], nosource);
        
            if (game.chess) this.chessFocus();
            return cards[cards.length - 1];
        };
        /*Player.$throw = function(cards, time, record, nosource) {
            //meihua
            var itemtype;
            var card;
            var duiMod = (cards.duiMod && game.me == this && !nosource);
            if (typeof cards == 'number') {
                itemtype = 'number';
                cards = new Array(cards);
            } else {
                itemtype = get.itemtype(cards);
                if (itemtype == 'cards') {
                    cards = cards.concat();
                } else if (itemtype == 'card') {
                    cards = [cards];
                } else {
                    //虚拟牌相关
                    var evt = _status.event;
                    if (evt && evt.card && evt.cards === cards) {
                        var card = ui.create.card()
                            .init([
                        evt.card.suit,
                        evt.card.number,
                        evt.card.name,
                        evt.card.nature, ]);
                        if (evt.card.suit == 'none') card.node.suitnum.style.display = 'none';
                        card.dataset.virtualCard = true;
                        cards = [card];
                        card.virtualMark = ui.create.div('.virtualMark', card);
                    }
                }
            }
            var clone;
            var player = this;
            var hand = dui.boundsCaches.hand;
            hand.check();
            //对应的事件的上级事件的卡牌，一般情况这是达成实际效果的卡牌而不是卡牌实例
            if (_status.event.parent) var cardk = _status.event.parent.card;
            for (var i = 0; i < cards.length; i++) {
                card = cards[i];
                if (card) {
                    //这里与手牌显示装备区有关，删掉实体卡牌映射的虚假卡牌
                    if (card.falsecard) {
                        card.falsecard.fix();
                        card.falsecard.remove();
                        card.falsecard.destroyed = true;
                        delete card.falsecard;
                        //刷新手牌
                        dui.queueNextFrameTick(dui.layoutHand, dui);
                    }
                    //清除打出去的牌的横tag，以免进入弃牌堆里有tag，洗牌后tag跟着牌一起回来
                    if (card._tempName) card._tempName.remove();
                    //如果没有bianhua（主动）和bianhua2（被动））且没有cardk或者有cardk但card和cardk完全相同 
                    if (card.bianhua != true && card.bianhua2 != true && (!cardk || (card.name == cardk.name && card.nature == cardk.nature && card.number == cardk.number))) clone = card.copy('thrown');
                    //否则的话如果此时是usecard事件和respond事件就从克隆卡牌变为创建新卡牌
                    else if ((_status.event.parent.name == 'useCard' || _status.event.parent.name == 'respond') && _status.event.type != 'card') {
                        clone = ui.create.card()
                            .init([
                        cardk.suit,
                        cardk.number,
                        cardk.name,
                        cardk.nature, ]);
                        //添加thrown类名才能正确显示
                        clone.classList.add('thrown');
                        //转标记
                        clone._tempNamed = ui.create.div('.temp-name', clone)
                        clone._tempNamed.innerHTML = '<div style="width:33px; height:31px; left:71px; top:5px; position:absolute; background-image: url(' + lib.assetURL + 'extension/十周年UI/image/vcard/zhuan.png);background-size: 100% 100%;"></div>';
                        //无色有点数
                        if (cardk.suit == 'none' && cardk.number) clone.querySelector('.suit-num')
                            .querySelectorAll('span.suit')[0].innerHTML = "<img src='" + lib.assetURL + "extension/十周年UI/image/vcard/none.png" + "' style='position:relative;width:20px;height:35px;bottom:0px;left:3px;'/>";
                        //颜色变化
                        //无点数且牌数大于1
                        else if (get.color(cardk) == 'none' && cardk.cards && cardk.cards.length > 1 && get.suit(cardk) == 'none') clone.getElementsByClassName("suit-num")[0].innerHTML = "<img src='" + lib.assetURL + "extension/十周年UI/image/vcard/none.png" + "' style='position:relative;width:20px;height:35px;bottom:0px;left:3px;'/>";
                        else if (get.color(cardk) == 'red' && cardk.cards && cardk.cards.length > 1) clone.getElementsByClassName("suit-num")[0].innerHTML = "<img src='" + lib.assetURL + "extension/十周年UI/image/vcard/red.png" + "' style='position:relative;width:20px;height:35px;bottom:0px;left:3px;'/>";
                        else if (get.color(cardk) == 'black' && cardk.cards && cardk.cards.length > 1) clone.getElementsByClassName("suit-num")[0].innerHTML = "<img src='" + lib.assetURL + "extension/十周年UI/image/vcard/black.png" + "' style='position:relative;width:20px;height:35px;bottom:0px;left:3px;'/>";
                        //试试添加一个原牌皮
                        let cheats = card.copy('thrown');
                        clone.appendChild(cheats)
                        clone.cheats = cheats;

                    } else clone = card.copy('thrown');
                    //这里添加一个从装备区扔牌的位置，还有火攻展示事件的牌的位置
                    if (duiMod && (card.throwWith == 'h' || card.throwWith == 's') || (_status.event.name == 'useSkill' && player == game.me && card.throwWith != 'e') || (_status.event.type == 'card' && player == game.me)) {
                        clone.tx = Math.round(hand.x + card.tx);
                        clone.ty = Math.round(hand.y + 30 + card.ty);
                        clone.scaled = true;
                        clone.throwordered = true;
                        clone.style.transform = 'translate(' + clone.tx + 'px,' + clone.ty + 'px) scale(' + hand.cardScale + ')';
                        if (lib.config["extension_史诗卡牌_cardPhantom"]) EpicFX.card.phantom4(clone);
                        //装备区和虚拟牌从底下仍
                    } else if ((card.throwWith == 'e' || card.dataset.virtualCard) && player == game.me && _status.event.getParent(2)
                        .name != 'discardPlayerCard') {
                        clone.tx = Math.round(hand._width * 0.6);
                        clone.ty = Math.round(hand.y + 60);
                        clone.scaled = true;
                        clone.throwordered = true;
                        clone.style.transform = 'translate(' + clone.tx + 'px,' + clone.ty + 'px) scale(' + hand.cardScale + ')';
                        if (lib.config["extension_史诗卡牌_cardPhantom"]) EpicFX.card.phantom4(clone);
                    }
                    card = clone;
                } else {
                    card = dui.element.create('card infohidden infoflip');
                    card.moveTo = lib.element.card.moveTo;
                    card.moveDelete = lib.element.card.moveDelete;
                }
                cards[i] = card;
            }
            if (record !== false) {
                if (record !== 'nobroadcast') {
                    game.broadcast(function(player, cards, time, record, nosource) {
                        player.$throw(cards, time, record, nosource);
                    }, this, cards, 0, record, nosource);
                }

                game.addVideo('throw', this, [get.cardsInfo(cards), 0, nosource]);
            }

            if (duiMod && cards.length > 2) {
                cards.sort(function(a, b) {
                    if (a.tx == undefined && b.tx == undefined) return 0;

                    if (a.tx == undefined) return duicfg.rightLayout ? -1 : 1;

                    if (b.tx == undefined) return duicfg.rightLayout ? 1 : -1;

                    return b.tx - a.tx;
                });
            }
            //调换i的顺序
            for (var i = cards.length - 1; i >= 0; i--)
            player.$throwordered2(cards[i], nosource);

            if (game.chess) this.chessFocus();
            return cards[cards.length - 1];
        };*/
        //这里主要修改扔牌，牌从手上刚出去的大小和位置
        Player.$throwordered2 = function(card, nosource) {
            //同样的，这里处理因为其他方式仍牌的横向转化tag
            //于吉老骗子的tag似乎不太正确，因为不是通过这个函数仍的
            if (card._tempName) card._tempName.remove();
            //明伐删假牌
            //     if (ui.cardDialog) ui.cardDialog.remove();
            //     if (_status.event.handTip) _status.event.handTip.show();
            let cardsob = game.me.getCards('hes',false,true);
            for (i = 0; i < cardsob.length; i++) {
                if (cardsob[i].falsecard) {
                    cardsob[i].falsecard.fix();
                    cardsob[i].falsecard.remove();
                    cardsob[i].falsecard.destroyed = true;
                    delete cardsob[i].falsecard;
                    //刷新手牌
                    dui.queueNextFrameTick(dui.layoutHand, dui);
                }
            };
            if (card.cheats) {
                card.listenTransition(function() {
                    decadeUI.animation.playSpine('kapaizhuanhuan', {
                        scale: 0.62,
                        parent: card
                    });
                    setTimeout(function() {
                        card.cheats.remove();
                    }, 200)
                });
            }
            if (_status.connectMode) ui.todiscard = [];
            if (card.throwordered == undefined) {
                var x, y;
                var bounds = dui.boundsCaches.arena;
                if (!bounds.updated) bounds.update();
                this.checkBoundsCache();
                if (nosource) {
                    x = ((bounds.width - bounds.cardWidth) / 2 - bounds.width * 0.08);
                    y = ((bounds.height - bounds.cardHeight) / 2);
                } else {
                    x = ((this.cacheWidth - bounds.cardWidth) / 2 + this.cacheLeft);
                    y = ((this.cacheHeight - bounds.cardHeight) / 2 + this.cacheTop);
                }
                x = Math.round(x);
                y = Math.round(y);
                card.tx = x;
                card.ty = y;
                card.scaled = true;
                card.classList.add('thrown');
                card.style.transform = 'translate(' + x + 'px, ' + y + 'px)' + 'scale(' + 0.88 * bounds.cardScale + ')';
                if (lib.config["extension_史诗卡牌_cardPhantom"]) EpicFX.card.phantom4(card);
            } else {
                card.throwordered = undefined;
            }

            if (card.fixed) return ui.arena.appendChild(card);
            var before;
            for (var i = 0; i < ui.thrown; i++) {
                if (ui.thrown[i].parentNode == ui.arena) {
                    before = ui.thrown[i];
                    break;
                }
            }
            var tagNode = card.querySelector('.used-info');
            if (tagNode == null) tagNode = card.appendChild(dui.element.create('used-info'));
            //来自幻影卡牌的函数
            if (lib.config["extension_史诗卡牌_cardPhantom"]) {
                if (card.smp) {
                    tagNode.setAttribute('style', 'display:block !important');
                    let path = EpicFX.extensionPath + "asset/img/cardTitle/";
                    let imageElement = new Image();

                    function typeEval(name, nature) {
                        if (nature && name == "sha") {
                            let str;
                            if (nature == "fire") {
                                str = "huosha";
                            } else if (nature == "thunder") {
                                str = "leisha";
                            } else if (nature == "kami") {
                                str = "shensha";
                            } else if (nature == "ice") {
                                str = "bingsha";
                            } else if (nature == "stab") {
                                str = "cisha";
                            }
                            return str;
                        } else {
                            return name;
                        }
                    }

                    imageElement.classList.add("cardTitle");
                    imageElement.src = path + typeEval(card.smp.name, card.smp.nature) + ".png";
                    imageElement.onerror = function() {
                        this.remove()
                    }
                    card.appendChild(imageElement);
                }
            }
            card.$usedtag = tagNode;
            ui.thrown.unshift(card);
            if (before) ui.arena.insertBefore(before, card);
            else ui.arena.appendChild(card);
            dui.tryAddPlayerCardUseTag(card, this, _status.event);
            dui.queueNextFrameTick(dui.layoutDiscard, dui);
            return card;
        };
        //弃牌刷新函数，用来修改打出去的弃牌区域
        //主要修改出牌方向和弃牌区卡牌大小
        dui.layout.updateDiscard = function () {//主要修改出牌方向和弃牌区卡牌大小
      if (!ui.thrown)
        ui.thrown = [];

      for (var i = ui.thrown.length - 1; i >= 0; i--) {
        if (ui.thrown[i].classList.contains('drawingcard') ||
          ui.thrown[i].classList.contains('removing') ||
          ui.thrown[i].parentNode != ui.arena || ui.thrown[i].fixed) {
          ui.thrown.splice(i, 1);
        } else {
          ui.thrown[i].classList.remove('removing');
        }
      }

      if (!ui.thrown.length)
        return;

      var cards = ui.thrown;
      var bounds = dui.boundsCaches.arena;
      bounds.check();

      var pw = 0.86 * bounds.width;
      var ph = bounds.height;
      var cw = bounds.cardWidth;
      var ch = bounds.cardHeight;
      var cs = 0.86 * bounds.cardScale;//修改大小

      var csw = cw * cs;
      var x;
      var y = Math.round((ph - ch) / 2);

      var xMargin = csw + 2;//每张卡牌的宽度加卡牌距离
      var xStart = (csw - 0.86 * cw) / 2; //x初始坐标，显而易见为0，后面会自动加上(limitW + totalW) / 2。
      var totalW = cards.length * csw + (cards.length - 1) * 2; //每张卡牌之间距离为2，n张卡牌有（n-1）* 2的距离，n为cards.length，即（csw+2)*n -2
      var limitW = pw; 
      if (totalW >= limitW) {
        xMargin = csw - Math.abs(cards.length * csw - limitW -csw) / (cards.length - 1); //这是当卡牌数目过多，卡牌宽度乘以数量超过屏幕长度的时候，为使得卡牌不会超出框外，计算得到的每张卡牌要折叠得到的宽度
        xStart += (limitW + xMargin * (cards.length - 1) + csw + xMargin/2) / 2 ; //弃牌量多时，totalW大于limitW，为使两者相等，totalW采用折叠后卡牌宽度计算得到。
	  } else {
        xStart += (1.08 * limitW + totalW) / 2; //可知xstart逐渐向着x轴正方向移动，牌数少时居中弃之
      }

      var card;
      for (var i = 0; i < cards.length; i++) {
        x = Math.round(xStart - i * xMargin - xMargin/2);
        card = cards[i];
        card.tx = x;
        card.ty = y;
        card.scaled = true;
        card.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + cs + ')';
        if (lib.config["extension_史诗卡牌_cardPhantom"]) {
            EpicFX.card.phantom3(card);
            EpicFX.card.clearPhantom2(card, 680);
        }
        delete card.phantom;
      }
    };
        //最重要的check函数
        if(game.createCss) {
            let sgType = lib.config['extension_十周年UI_gold_suitnum'];
            //十字阴影filter: drop-shadow(${CGCpx}px 0px ${CGCdrop}px ${CGCcolor}) drop-shadow(-${CGCpx}px 0px ${CGCdrop}px ${CGCcolor}) drop-shadow(0px ${CGCpx}px ${CGCdrop}px ${CGCcolor}) drop-shadow(0px -${CGCpx}px ${CGCdrop}px ${CGCcolor});
            //交叉阴影filter: drop-shadow(${CGCpx}px ${CGCpx}px ${CGCdrop}px ${CGCcolor}) drop-shadow(${CGCpx}px -${CGCpx}px ${CGCdrop}px ${CGCcolor}) drop-shadow(-${CGCpx}px ${CGCpx}px ${CGCdrop}px ${CGCcolor}) drop-shadow(-${CGCpx}px -${CGCpx}px ${CGCdrop}px ${CGCcolor});
            //测试：game.me.addSkill(['tuxi','dcjuewu','hongyan']);
            if(sgType == 'gold') {
                let CGCpx = 1, CGCdrop = 0, CGCcolor = 'rgba(0, 0, 0, 0.35)';
                game.createCss(`
                    .card:not(.thrown) .cardGoldChanged {
                        background-image: radial-gradient(circle at top left, 
                            rgb(255, 230, 140) 30%, 
                            rgb(195, 160, 60) 60%, 
                            rgb(200, 185, 100) 90%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        white-space: nowrap;
                        -webkit-text-stroke: 0px rgba(38,37,34,0.5);
                        text-shadow: none;
                        
                        padding: 3px;
                        margin: -3px;
                        display: inline-block;
                        position: relative;
                        z-index: 1;
                        filter: drop-shadow(${CGCpx}px ${CGCpx}px ${CGCdrop}px ${CGCcolor}) drop-shadow(${CGCpx}px -${CGCpx}px ${CGCdrop}px ${CGCcolor}) drop-shadow(-${CGCpx}px ${CGCpx}px ${CGCdrop}px ${CGCcolor}) drop-shadow(-${CGCpx}px -${CGCpx}px ${CGCdrop}px ${CGCcolor});
                }`);
            }
            if(sgType == 'blue') {
                let CGCpx = 1, CGCdrop = 0, CGCcolor = 'rgba(0, 0, 255, 0.35)';
                game.createCss(`
                    .card:not(.thrown) .cardGoldChanged {
                        background-image: radial-gradient(circle at top left, 
                            rgb(255, 255, 255) 30%, 
                            rgb(225, 225, 225) 60%, 
                            rgb(195, 195, 195) 90%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        white-space: nowrap;
                        -webkit-text-stroke: 0px rgba(38,37,34,0.5);
                        text-shadow: none;
                        
                        padding: 3px;
                        margin: -3px;;
                        filter: drop-shadow(${CGCpx}px ${CGCpx}px ${CGCdrop}px ${CGCcolor}) drop-shadow(${CGCpx}px -${CGCpx}px ${CGCdrop}px ${CGCcolor}) drop-shadow(-${CGCpx}px ${CGCpx}px ${CGCdrop}px ${CGCcolor}) drop-shadow(-${CGCpx}px -${CGCpx}px ${CGCdrop}px ${CGCcolor});
                }`);
                /*game.createCss(`
                    .cardGoldChanged {
                        background-image: radial-gradient(circle at top left, rgb(255, 255, 255) 30%, rgb(225, 225, 225) 60%, rgb(195, 195, 195) 90%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        white-space: nowrap;
                        -webkit-text-stroke: 0px rgba(38,37,34,0.5);
                        text-shadow: none;
                        filter: drop-shadow(${CGCpx}px ${CGCpx}px ${CGCdrop}px ${CGCcolor}) drop-shadow(${CGCpx}px -${CGCpx}px ${CGCdrop}px ${CGCcolor}) drop-shadow(-${CGCpx}px ${CGCpx}px ${CGCdrop}px ${CGCcolor}) drop-shadow(-${CGCpx}px -${CGCpx}px ${CGCdrop}px ${CGCcolor});
                    }
                `);*/
            }
        }
        //所有的关于检测，装备牌入手牌区，主动转化手牌显示，确认按钮的分情况显示，出牌阶段拿起牌的提示文字
        game.check = function (event) {
            var i, j, range;
            if (event == undefined) event = _status.event;
            //   console.log(event.handTip)
            var custom = event.custom || {};
            var ok = true,
                auto = true;
            //meihua   
            var player = event.player;
            var auto_confirm = lib.config.auto_confirm;
            var players = game.players.slice(0);
            if (event.deadTarget) players.addArray(game.dead);
            if (!event.filterButton && !event.filterCard && !event.filterTarget && (!event.skill || !event._backup)) {
                if (event.choosing) {
                    _status.imchoosing = true;
                }
                return;
            }
            player.node.equips.classList.remove('popequip');
            //  如果不是我的回合，清除我手上的假牌
            //实际上用不上
            if (player != game.me) {
                let cardsob = game.me.getCards('hes',false,true);
                /*cardsob.forEach(c=>{
                    if(!c.falsecard) return;
                    var falseCard=c.falsecard;
                    falseCard.fix();
                    falseCard.remove();
                    falseCard.destroyed = true;
                    delete c.falsecard;
                });*/
                cardsob.forEach(c=>{
                    if(!c.truecard) return;
                    var falseCard=c;
                    falseCard.fix();
                    falseCard.remove();
                    falseCard.destroyed = true;
                    if(falseCard.truecard?.falsecard) delete falseCard.truecard.falsecard;
                    //刷新手牌
                    dui.queueNextFrameTick(dui.layoutHand, dui);
                });
                /*for (i = 0; i < cardsob.length; i++) {
                    if (cardsob[i].falsecard) {
                        cardsob[i].falsecard.fix();
                        cardsob[i].falsecard.remove();
                        cardsob[i].falsecard.destroyed = true;
                        delete cardsob[i].falsecard;
                        //刷新手牌
                        dui.queueNextFrameTick(dui.layoutHand, dui);
                    }
                }*/
            }
            if (event.filterButton) {
                var dialog = event.dialog;
                range = get.select(event.selectButton);
                var selectableButtons = false;
                if (event.forceAuto && ui.selected.buttons.length == range[1]) auto = true;
                else if (range[0] != range[1] || range[0] > 1) auto = false;
                //Helasisy修：增加判断防止报错
                if(dialog.buttons) for (i = 0; i < dialog.buttons.length; i++) {
                    if (dialog.buttons[i].classList.contains('unselectable')) continue;
                    if (event.filterButton(dialog.buttons[i], player) && lib.filter.buttonIncluded(dialog.buttons[i])) {
                        if (ui.selected.buttons.length < range[1]) {
                            dialog.buttons[i].classList.add('selectable');
                        } else if (range[1] == -1) {
                            dialog.buttons[i].classList.add('selected');
                            ui.selected.buttons.add(dialog.buttons[i]);
                        } else {
                            dialog.buttons[i].classList.remove('selectable');
                        }
                    } else {
                        dialog.buttons[i].classList.remove('selectable');
                        if (range[1] == -1) {
                            dialog.buttons[i].classList.remove('selected');
                            ui.selected.buttons.remove(dialog.buttons[i]);
                        }
                    }
                    if (dialog.buttons[i].classList.contains('selected')) {
                        dialog.buttons[i].classList.add('selectable');
                    } else if (!selectableButtons && dialog.buttons[i].classList.contains('selectable')) {
                        selectableButtons = true;
                    }
                }
                if (ui.selected.buttons.length < range[0]) {
                    if (!event.forced || selectableButtons) {
                        ok = false;
                    }
                    if (event.complexSelect || event.getParent().name == 'chooseCharacter' || event.getParent().name == 'chooseButtonOL') {
                        ok = false;
                    }
                }
                if (custom.add.button) {
                    custom.add.button();
                }
            }
            if (event.filterCard) {
                if (ok == false) {
                    game.uncheck('card');
                } else {
                    var cards = player.getCards(event.position);
                    let cardes = player.getCards('e');
                    //       var cardf=player.getCards('f');
                    //         if(cardf.length&&cardf.length>0)cards=cards.concat(cardf)
                    if (!cards) {
                        let cardsob = player.getCards('hes',false,true);
                        cardsob.forEach(c=>{
                            if(!c.truecard) return;
                            var falseCard=c;
                            falseCard.fix();
                            falseCard.remove();
                            falseCard.destroyed = true;
                            if(falseCard.truecard?.falsecard) delete falseCard.truecard.falsecard;
                            //刷新手牌
                            dui.queueNextFrameTick(dui.layoutHand, dui);
                        });
                        /*for (i = 0; i < cardsob.length; i++) {
                            if (cardsob[i].truecard) {
                                cardsob[i].fix();
                                cardsob[i].remove();
                                cardsob[i].destroyed = true;
                                delete cardsob[i].falsecard;
                                //刷新手牌
                                dui.queueNextFrameTick(dui.layoutHand, dui);
                            }
                        }*/
                    }
                    //获取装备区的卡牌
                    var firstCheck = false;
                    //    if(event.selectCard==undefined)event.selectCard=[0,1]
                    range = get.select(event.selectCard);
                    //选中卡牌时，转化相关
                    //这里的处理逻辑是，如果是技能事件，而且存在这个技能，而且这个技能存在viewAs而且存在这个技能viewAs的卡牌名						
                    if (event.skill && get.info(event.skill) && get.info(event.skill)
                        .viewAs) {
                        //如果选中的卡牌数量不为0
                        if (ui.selected.cards.length != 0) {
                            var cardsk = ui.selected.cards;
                            for (i = 0; i < cardsk.length; i++) {
                                //这里是为了处理该卡牌是否是手牌区假牌还是真实的牌
                                //判断一下卡牌是否有falsecard属性
                                let cardskk = cardsk[i].falsecard;
                                let cardskb;
                                if (typeof get.info(event.skill)
                                    .viewAs == 'function') cardskb = get.info(event.skill)
                                    .viewAs([cardsk[i]], event.player);
                                else cardskb = get.info(event.skill)
                                    .viewAs;
                                cardsk[i].nameb = cardskb.name;
                                if (cardskb.nature) cardsk[i].natureb = cardskb.nature;
                                if (cardskb.suit && cardskb.suit != 'none') cardsk[i].suitb = cardskb.suit;
                                if (cardskb.number) cardsk[i].numberb = cardskb.number;
                                if (typeof get.info(cardskb)
                                    .recastable == 'function') cardsk[i].recastable = get.info(cardskb)
                                    .recastable();
                                else cardsk[i].recastable = get.info(cardskb)
                                    .recastable;
                                cardsk[i].bianhua = true;
                                //这里是为了执行，如果这个牌有转化tag就显示一下                    
                                if (cardsk[i]._tempName) cardsk[i]._tempName.style.display = 'block';
                                //如果这个牌没有转化tag，它的变化2属性就是fales，这是为了在扔牌的时候判断是不是转化
                                if (!cardsk[i]._tempName) cardsk[i].bianhua2 = false;
                                //如果存在falsecard属性，就对指向的假牌赋予同样的视为属性，对假牌执行相同操作
                                if (cardskk) {
                                    cardskk.recastable = cardsk[i].recastable;
                                    cardskk.nameb = cardsk[i].nameb;
                                    cardskk.natureb = cardsk[i].natureb;
                                    cardskk.suitb = cardsk[i].suitb;
                                    cardskk.numberb = cardsk[i].numberb;
                                    cardskk.bianhua = true;
                                    if (cardskk._tempName) cardskk._tempName.style.display = 'block';
                                    if (!cardskk._tempName) cardskk.bianhua2 = false;
                                }
                            }
                            //Helasisy修：对所有牌过一遍，把没有选的去除属性
                            for (i = 0; i < cards.length; i++) {
                                if(cardsk.contains(cards[i])) continue;
                                //如果它的bianhua属性是true，这代表他是主动转化牌，那么放下去的时候清除他的转化tag，假牌不用管，因为自动跟着真牌走
                                if (cards[i].bianhua == true) {
                                    if (cards[i]._tempName) cards[i]._tempName.style.display = 'none';
                                    cards[i].bianhua = false;
                                }
                                if (!lib.card[cards[i].name].recastable) cards[i].recastable = false;
                            }
                        } else if (ui.selected.cards.length == 0) {
                            //如果没有选中的卡牌，对全体卡牌进行判断
                            for (i = 0; i < cards.length; i++) {
                                //如果它的bianhua属性是true，这代表他是主动转化牌，那么放下去的时候清除他的转化tag，假牌不用管，因为自动跟着真牌走
                                if (cards[i].bianhua == true) {
                                    if (cards[i]._tempName) cards[i]._tempName.style.display = 'none';
                                    cards[i].bianhua = false;
                                }
                                if (!lib.card[cards[i].name].recastable) cards[i].recastable = false;
                            }
                        }

                    }
                    //这里需要再执行一次选中卡牌的判定，因为丢下去的时候如果结束了技能就会丢失上面的判定
                    if (ui.selected.cards.length == 0) {
                        for (i = 0; i < cards.length; i++) {
                            if (cards[i].bianhua == true) {
                                if (cards[i]._tempName) cards[i]._tempName.style.display = 'none';
                                cards[i].bianhua = false;
                            }
                            if (!lib.card[cards[i].name].recastable) cards[i].recastable = false;
                            player.storage.recastablecard = [];

                        }

                    }
                    try {
                        //这里，判断选中的卡牌是否有重铸属性，如果有就亮出cz按钮
                        var cz = document.getElementById('_recasting');
                        if (ui.selected.cards.length == 1) {
                            let cardp = ui.selected.cards[0];
                            let name = {
                                name: get.name(cardp)//直接使用cardp.name的话神庞统得炸
                            }
                            if (cardp.nameb) name = {
                                name: cardp.nameb
                            }
                            if ((typeof get.info(name)
                                .recastable == 'function' && get.info(name)
                                .recastable()) || (typeof get.info(name)
                                .recastable != 'function' && get.info(name)
                                .recastable)) {
                                cz.style.display = 'flex';
                                if ((!player.storage.recastablecard || player.storage.recastablecard.length == 0) && player == game.me) player.storage.recastablecard = ui.selected.cards.slice();
                            }
                        } else {
                            cz.style.display = 'none';
                            player.storage.recastablecard = [];
                        }
                    } catch (e) {}
                    if (!event._cardChoice && typeof event.selectCard != 'function' && !event.complexCard && range[1] != -1 && !lib.config.compatiblemode) {
                        event._cardChoice = [];
                        firstCheck = true;
                    }
                    if (event.isMine() && event.name == 'chooseToUse' && event.parent.name == 'phaseUse' && !event.skill && !event._targetChoice && !firstCheck && window.Map && !lib.config.compatiblemode) {
                        event._targetChoice = new Map();
                        for (var i = 0; i < event._cardChoice.length; i++) {
                            if (!lib.card[event._cardChoice[i].name].complexTarget) {
                                var targets = [];
                                for (var j = 0; j < players.length; j++) {
                                    if (event.filterTarget(event._cardChoice[i], player, players[j])) {
                                        targets.push(players[j]);
                                    }
                                }
                                event._targetChoice.set(event._cardChoice[i], targets);
                            }
                        }
                    }
                    var selectableCards = false;
                    if (range[0] != range[1] || range[0] > 1) auto = false;
                    for (i = 0; i < cards.length; i++) {
                        //在这里判定，当前区域是否不存在或者当前区域是否不存在装备区，如果不存在就删除假牌
                        if (!event.position || !event.position.includes('e')) {
                            if (cards[i].truecard) {
                                cards[i].fix();
                                cards[i].remove();
                                cards[i].destroyed = true;
                                delete cards[i].falsecard;
                                //刷新手牌
                                dui.queueNextFrameTick(dui.layoutHand, dui);
                                //似乎应该删掉真牌的falsecard属性，不确定，再看看
                                //应该不用，当它的指向没了的时候就没了
                            }
                        }
                        //专门适配神黄月英，game._tempViewAs添加个视为牌名
                        if (lib.config.cardtempname != 'off') {
                            //视为牌转换，手牌区开始
                            var cardname = get.name(cards[i]);
                            if ((cards[i].nameb && cards[i].bianhua)) cardname = cards[i].nameb;
                            var cardnature = get.nature(cards[i]);
                            if (cards[i].natureb && cards[i].bianhua) cardnature = cards[i].natureb;
                            if (!cards[i].natureb && cards[i].bianhua) cardnature = undefined;
                            var cardsuit = get.suit(cards[i]);
                            if ((cards[i].suitb && cards[i].bianhua)) cardsuit = cards[i].suitb;
                            var cardnumber = get.number(cards[i]);
                            if ((cards[i].numberb && cards[i].bianhua)) cardnumber = cards[i].numberb;
                            //属性不同，牌名不同，花色不同，点数不同
                            if ((cards[i].bianhua) || (cards[i].name != cardname) || (cards[i].nature != cardnature) || (cards[i].suit != cardsuit) || (cards[i].number != cardnumber) || (game._tempViewAs && game._tempViewAs[cards[i].name])) {
                                //变化2用来区分主动和被动转化
                                //如果只有花色不同，那么不改变bianhua2为true
                                //if ((cards[i].suit != cardsuit) && (cards[i].name == cardname) && (cards[i].nature == cardnature) && (cards[i].number == cardnumber)) cards[i].bianhua2 = false;
                                //else cards[i].bianhua2 = true;
                                //Helasisy改：我一改，改个条件看看
                                var suitC = (cards[i].suit != cardsuit), 
                                    nameC = (cards[i].name != cardname), 
                                    natureC = (cards[i].nature != cardnature), 
                                    numberC = (cards[i].number != cardnumber),
                                    tempC = (game._tempViewAs && game._tempViewAs[cards[i].name]);
                                cards[i].bianhua2 = true;
                                if (!nameC && !natureC && !tempC) cards[i].bianhua2 = false;
                                if (!cards[i]._tempName) cards[i]._tempName = ui.create.div('.temp-handCard', cards[i]); //卡牌属性名称修改，注意这个地方的名称
                                cards[i]._tempName.style.display = 'block';
                                var tempname = '';
                                var suitNode = cards[i]?.node?.suitnum?.$suit;
                                var numNode = cards[i]?.node?.suitnum?.$num;
                                if (cards[i].suit != cardsuit) {
                                    var suitData = {
                                        'heart': "<span style='color:red;'>♥</span>",
                                        'diamond': "<span style='color:red;'>♦</span>",
                                        'spade': "<span style='color:black;'>♠</span>",
                                        'club': "<span style='color:black;'>♣</span>",
                                    };
                                    tempname += suitData[cardsuit];
                                }
                                if (cards[i].suit != cardsuit && typeof cardsuit=='string' && ['spade', 'heart', 'club', 'diamond'].contains(cardsuit)) {
                                    if(suitNode) suitNode.classList.add('cardGoldChanged');
                                }else {
                                    if(suitNode) suitNode.classList.remove('cardGoldChanged');
                                }
                                if (cards[i].number != cardnumber) {
                                    tempname += "<b>" + cardnumber + "</b>";
                                    cards[i].querySelector('.suit-num')
                                        .querySelectorAll('span')[0].innerText = get.strNumber(cardnumber);
                                    if(numNode) numNode.classList.add('cardGoldChanged');
                                }else {
                                    if(numNode) numNode.classList.remove('cardGoldChanged');
                                }
                                if (cardsuit != cards[i].suit) {
                                    //手牌花色变化
                                    //改变手牌的花色
                                    cards[i].querySelector('.suit-num')
                                        .querySelectorAll('span')[1].innerText = get.translation(cardsuit);
                        
                                    if (cardsuit == 'none') cards[i].querySelector('.suit-num')
                                        .style['filter'] = 'grayscale(100%)';
                        
                                    else if (cardsuit == 'heart' || cardsuit == 'diamond') cards[i].querySelector('.suit-num')
                                        .style['color'] = 'red';
                                    else if (cardsuit == 'club' || cardsuit == 'spade') cards[i].querySelector('.suit-num')
                                        .style['color'] = 'black';
                                }
                                if ((cards[i].bianhua || cards[i].bianhua2 || (game._tempViewAs && game._tempViewAs[cards[i].name])) && get.position(cards[i]) != 'e') {
                                    if (!cards[i]._tempName) cards[i]._tempName = ui.create.div('.temp-handCard', cards[i]);
                                    /*cards[i]._tempName.style.opacity=0;
                                    cards[i]._tempName.style.transition='all 0.3s';
                                    setTimeout(function(){
                                        if(cards[i]._tempName) cards[i]._tempName.style.opacity=1;
                                    },0);*/
                                    let cardname2 = cardname;
                                    
                                    // 优先使用 game._tempViewAs 中的设置
                                    if (game._tempViewAs && game._tempViewAs[cards[i].name]) {
                                        cardname2 = game._tempViewAs[cards[i].name];
                                        tempname = get.translation(cardname2) || tempname;
                                    } else if (cardnature && cardname == 'sha') {
                                        cardname2 += '_' + cardnature;
                                        tempname = get.translation(cardnature) + tempname;
                                    } else if (cardsuit == 'none' && cardname == 'sha') {
                                        cardname2 += '_' + cardsuit;
                                        tempname = get.translation(cardsuit) + tempname;
                                    }
                                    
                                    if (!(game._tempViewAs && game._tempViewAs[cards[i].name])) {
                                        tempname += get.translation(cardname);
                                    }
                                    
                                    cards[i]._tempName.style.backgroundImage = 'url("' + lib.assetURL + "extension/十周年UI/image/vcard/" + cardname2 + ".png" + '")';
                                    //--------------------------//
                                } else {
                                    if (cards[i]._tempName) {
                                        cards[i]._tempName.remove();
                                        cards[i]._tempName = undefined;
                                    }
                                }
                        
                                /*转化牌*/
                                if (cards[i]._tempName) {
                                    cards[i]._tempName.innerHTML = tempname;
                                    cards[i]._tempName.tempname = tempname;
                                } /* }*/
                            }
                            //坤坤 开始
                            else {
                                //失去技能进入木牛流马等因素 非转化牌转回
                                //进入木马的时候需要把变化2变为false
                                //bianhua目前不确定，再看看
                                cards[i].bianhua2 = false;
                                var suitNode = cards[i]?.node?.suitnum?.$suit;
                                var numNode = cards[i]?.node?.suitnum?.$num;
                                if(suitNode?.classList) suitNode.classList.remove('cardGoldChanged');
                                if(numNode?.classList) numNode.classList.remove('cardGoldChanged');
                                if (cards[i]._tempName) {
                                    cards[i]._tempName.remove();
                                    cards[i]._tempName = undefined;
                                }
                                if (cards[i].querySelector('.suit-num')) {
                                    if (cards[i].suit == 'heart' || cards[i].suit == 'diamond') {
                                        cards[i].querySelector('.suit-num')
                                            .style.color = 'red';
                                        cards[i].querySelector('.suit-num')
                                            .querySelectorAll('span')[1].style['color'] = 'red';
                                    } else if (cardsuit == 'club' || cardsuit == 'spade') {
                                        cards[i].querySelector('.suit-num')
                                            .querySelectorAll('span')[1].style['color'] = 'black';
                                        cards[i].querySelector('.suit-num')
                                            .style.color = 'black';
                                    }
                                    if (cards[i].querySelector('.suit-num')
                                        .querySelectorAll('span')[1]) {
                                        cards[i].querySelector('.suit-num')
                                            .querySelectorAll('span')[1].style.display = 'inline';
                                        cards[i].querySelector('.suit-num')
                                            .querySelectorAll('span')[1].innerText = get.translation(cards[i].suit);
                                        cards[i].querySelector('.suit-num')
                                            .style['filter'] = ''; //取消原来的花色改变导致的颜色改变
                                    }
                                }
                            }
                            if (!cards[i]._tempName || cards[i]._tempName.style.display == 'none') {
                                cards[i].bianhua2 = false;
                            }
                            //坤坤 结尾
                        }
                        /*if (lib.config.cardtempname != 'off') {
                            //视为牌转换，手牌区开始
                            var cardname = get.name(cards[i]);
                            if ((cards[i].nameb && cards[i].bianhua)) cardname = cards[i].nameb;
                            var cardnature = get.nature(cards[i]);
                            if (cards[i].natureb && cards[i].bianhua) cardnature = cards[i].natureb;
                            if (!cards[i].natureb && cards[i].bianhua) cardnature = undefined;
                            var cardsuit = get.suit(cards[i]);
                            if ((cards[i].suitb && cards[i].bianhua)) cardsuit = cards[i].suitb;
                            var cardnumber = get.number(cards[i]);
                            if ((cards[i].numberb && cards[i].bianhua)) cardnumber = cards[i].numberb;
                            //属性不同，牌名不同，花色不同，点数不同
                            if ((cards[i].bianhua) || (cards[i].name != cardname) || (cards[i].nature != cardnature) || (cards[i].suit != cardsuit) || (cards[i].number != cardnumber)) {
                                //变化2用来区分主动和被动转化
                                //如果只有花色不同，那么不改变bianhua2为true
                                if ((cards[i].suit != cardsuit) && (cards[i].name == cardname) && (cards[i].nature == cardnature) && (cards[i].number == cardnumber)) cards[i].bianhua2 = false;
                                else cards[i].bianhua2 = true;
                                if (!cards[i]._tempName) cards[i]._tempName = ui.create.div('.temp-handCard', cards[i]); //卡牌属性名称修改，注意这个地方的名称
                                cards[i]._tempName.style.display = 'block';
                                var tempname = '';
                                if (cards[i].suit != cardsuit) {
                                    var suitData = {
                                        'heart': "<span style='color:red;'>♥</span>",
                                        'diamond': "<span style='color:red;'>♦</span>",
                                        'spade': "<span style='color:black;'>♠</span>",
                                        'club': "<span style='color:black;'>♣</span>",
                                    };
                                    tempname += suitData[cardsuit];

                                }
                                if (cards[i].number != cardnumber) {
                                    tempname += "<b>" + cardnumber + "</b>";
                                    cards[i].querySelector('.suit-num')
                                        .querySelectorAll('span')[0].innerText = get.strNumber(cardnumber);
                                }
                                if (cardsuit != cards[i].suit) {
                                    //手牌花色变化
                                    //改变手牌的花色
                                    cards[i].querySelector('.suit-num')
                                        .querySelectorAll('span')[1].innerText = get.translation(cardsuit);

                                    if (cardsuit == 'none') cards[i].querySelector('.suit-num')
                                        .style['filter'] = 'grayscale(100%)';

                                    else if (cardsuit == 'heart' || cardsuit == 'diamond') cards[i].querySelector('.suit-num')
                                        .style['color'] = 'red';
                                    else if (cardsuit == 'club' || cardsuit == 'spade') cards[i].querySelector('.suit-num')
                                        .style['color'] = 'black';
                                }
                                if ((cards[i].bianhua || cards[i].bianhua2) && get.position(cards[i]) != 'e') {
                                    if (!cards[i]._tempName) cards[i]._tempName = ui.create.div('.temp-handCard', cards[i]);
                                    /-cards[i]._tempName.style.opacity=0;
                                    cards[i]._tempName.style.transition='all 0.3s';
                                    setTimeout(function(){
                                        if(cards[i]._tempName) cards[i]._tempName.style.opacity=1;
                                    },0);-/
                                    let cardname2 = cardname;
                                    if (cardnature && cardname == 'sha') {
                                        cardname2 += '_' + cardnature;
                                        tempname = get.translation(cardnature) + tempname;
                                    } else if (cardsuit == 'none' && cardname == 'sha') {
                                        cardname2 += '_' + cardsuit;
                                        tempname = get.translation(cardsuit) + tempname;
                                    }
                                    tempname += get.translation(cardname);
                                    cards[i]._tempName.style.backgroundImage = 'url("' + lib.assetURL + "extension/十周年UI/image/vcard/" + cardname2 + ".png" + '")';
                                    //--------------------------//
                                } else {
                                    if (cards[i]._tempName) {
                                        cards[i]._tempName.remove();
                                        cards[i]._tempName = undefined;
                                    }
                                }

                                //转化牌
                                if (cards[i]._tempName) {
                                    cards[i]._tempName.innerHTML = tempname;
                                    cards[i]._tempName.tempname = tempname;
                                }
                            }
                            //坤坤 开始
                            else {
                                //失去技能进入木牛流马等因素 非转化牌转回
                                //进入木马的时候需要把变化2变为false
                                //bianhua目前不确定，再看看
                                cards[i].bianhua2 = false;
                                if (cards[i]._tempName) {
                                    cards[i]._tempName.remove();
                                    cards[i]._tempName = undefined;
                                }
                                if (cards[i].querySelector('.suit-num')) {
                                    if (cards[i].suit == 'heart' || cards[i].suit == 'diamond') {
                                        cards[i].querySelector('.suit-num')
                                            .style.color = 'red';
                                        cards[i].querySelector('.suit-num')
                                            .querySelectorAll('span')[1].style['color'] = 'red';
                                    } else if (cardsuit == 'club' || cardsuit == 'spade') {
                                        cards[i].querySelector('.suit-num')
                                            .querySelectorAll('span')[1].style['color'] = 'black';
                                        cards[i].querySelector('.suit-num')
                                            .style.color = 'black';
                                    }
                                    if (cards[i].querySelector('.suit-num')
                                        .querySelectorAll('span')[1]) {
                                        cards[i].querySelector('.suit-num')
                                            .querySelectorAll('span')[1].style.display = 'inline';
                                        cards[i].querySelector('.suit-num')
                                            .querySelectorAll('span')[1].innerText = get.translation(cards[i].suit);
                                        cards[i].querySelector('.suit-num')
                                            .style['filter'] = ''; //取消原来的花色改变导致的颜色改变
                                    }
                                }
                            }
                            if (!cards[i]._tempName || cards[i]._tempName.style.display == 'none') {
                                cards[i].bianhua2 = false;
                            }
                            //坤坤 结尾
                        }*/
                        var nochess = true;
                        if (!lib.filter.cardAiIncluded(cards[i])) {
                            nochess = false;
                        } else if (event._cardChoice && !firstCheck) {
                            if (!event._cardChoice.contains(cards[i])) {
                                nochess = false;
                            }
                        } else {
                            if (player.isOut() || !lib.filter.cardRespondable(cards[i], player) || cards[i].classList.contains('uncheck') || !event.filterCard(cards[i], player)) {
                                nochess = false;
                            }
                        }
                        //     if(event.isMine()&&cardf.length>0)nochess=true;
                        if (nochess) {
                            //如果已经存在就删除假牌，然后重新创建
                            if (ui.selected.cards.length < range[1]) {
                                cards[i].classList.add('selectable');
                                if ((event._cardChoice && firstCheck) || event.complexCard) {
                                    //event._cardChoice是可选择的卡牌
                                    //  if (!cards[i].truecard) 
                                    if (event._cardChoice && firstCheck) event._cardChoice.push(cards[i]);
                                    //如果存在装备区的牌，而且装备区的卡牌的length大于0，而且该牌在装备区，并且玩家非托管
                                    if (event.player == game.me && cardes && cardes.length > 0 && cardes.includes(cards[i])&& !_status.auto) {
                                        if (cards[i].falsecard) {
                                            let cardoo = cards[i].falsecard;
                                            cardoo.fix();
                                            cardoo.remove();
                                            cardoo.destroyed = true;
                                            delete cards[i].falsecard;
                                            //刷新手牌
                                            dui.queueNextFrameTick(dui.layoutHand, dui);
                                        }
                                        var items=[
                                        cards[i].suit,
                                        cards[i].number,
                                        cards[i].name,
                                        cards[i].nature, ];
                                        //神典韦改好看点
                                        if(cards[i].name.indexOf('qiexie_')==0){
                                            items=[
                                        '武器',
                                        '◈',
                                        cards[i].name,
                                        'thunder', ];
                                        }
                                        //假牌按照真牌的info创建
                                        let equipclone = ui.create.card().init(items);
                                        //equipclone.style.backgroundImage=lib.assetURL+'image/character/'+cards[i].name.slice(7)+'.jpg';
                                        //神典韦修复：人肉牌能够正常显示
                                        if(cards[i].name.indexOf('qiexie_')==0){
                                            /*alert_old(JSON.stringify(equipclone.style,null,2));
                                            equipclone.style['background-image']='url('+lib.assetURL+'image/character/'+cards[i].name.slice(7)+'.jpg)';
                                            equipclone.style['background-size']='100% 200%';
                                            equipclone.style['background-repeat']='no-repeat';*/
                                            equipclone.setBackground(cards[i].name.slice(7),'character');
                                        }
                                        //equipclone.style.opacity=0.5;
                                        //alert_old(JSON.stringify(equipclone,null,2));
                                        //直接获得假牌
                                        game.me.directgain2([equipclone], null);
                                        ui.create.div('.equiped', equipclone);
                                        //还是要经过s区
                                        equipclone.classList.add('glows')
                                        //     event._cardChoice.push(equipclone);
                                        cards[i].falsecard = equipclone;
                                        equipclone.truecard = cards[i];
                                        //   equipclone.updateTransform();
                                        //  game.check();
                                    }
                                }
                                /*else {
                                
                                if(event.complexCard && event.position && event.position.includes('e') && event.player == game.me && cardes && cardes.length > 0 && cardes.includes(cards[i])){                            
                                if (cards[i].falsecard) {
                                            let cardoo = cards[i].falsecard;
                                            cardoo.fix();
                                            cardoo.remove();
                                            cardoo.destroyed = true;
                                            cards[i].falsecard=undefined;
                                            delete cards[i].falsecard;
                                            //刷新手牌
                                            dui.queueNextFrameTick(dui.layoutHand, dui);
                                        }
                                        //假牌按照真牌的info创建
                                        let equipclone = ui.create.card().init([
                                            cards[i].suit,
                                            cards[i].number,
                                            cards[i].name,
                                            cards[i].nature,
                                        ]);
                                        //直接获得假牌
                                        game.me.directgain2([equipclone], null);
                                        ui.create.div('.equiped', equipclone);
                                        //还是要经过s区
                                        equipclone.classList.add('glows')
                                        //     event._cardChoice.push(equipclone);
                                        cards[i].falsecard = equipclone;
                                        equipclone.truecard = cards[i];
                                        //   equipclone.updateTransform();
                                     //   game.check();
                                
                                
                                }                                                
                                }*/

                            } else if (range[1] == -1) {
                                cards[i].classList.add('selected');
                                cards[i].updateTransform(true);
                                ui.selected.cards.add(cards[i]);
                            } else {
                                cards[i].classList.remove('selectable');
                            }
                            if (event.player == game.me && cardes && cardes.length > 0 && cardes.includes(cards[i]) && event._cardChoice && !event._cardChoice.includes(cards[i])&& !_status.auto) {
                                if (cards[i].falsecard) {
                                    let cardoo = cards[i].falsecard;
                                    cardoo.fix();
                                    cardoo.remove();
                                    cardoo.destroyed = true;
                                    cards[i].falsecard = undefined;
                                    delete cards[i].falsecard;
                                    //刷新手牌
                                    dui.queueNextFrameTick(dui.layoutHand, dui);
                                }
                            }
                        } else {
                            cards[i].classList.remove('selectable');


                            if (range[1] == -1) {
                                cards[i].classList.remove('selected');
                                cards[i].updateTransform();
                                ui.selected.cards.remove(cards[i]);
                            }
                        }
                        //这里如果是假牌也为它添加selsectable属性
                        if (cards[i].classList.contains('selected')) {
                            cards[i].classList.add('selectable');
                        } else if (!selectableCards && cards[i].classList.contains('selectable')) {
                            selectableCards = true;
                        }
                        if (cards[i].falsecard) {
                            if (event._cardChoice && event._cardChoice.contains(cards[i])) event._cardChoice.push(cards[i].falsecard);
                            else if (event._cardChoice && !event._cardChoice.contains(cards[i])) event._cardChoice.remove(cards[i].falsecard);
                            if (cards[i].classList.contains('selectable')) {
                                cards[i].falsecard.classList.add('selectable');
                                cards[i].falsecard.updateTransform(true);
                            } else if (!cards[i].classList.contains('selectable')) {
                                cards[i].falsecard.classList.remove('selectable');
                                cards[i].falsecard.updateTransform();
                            }
                            if (cards[i].classList.contains('selected')) {
                                cards[i].falsecard.classList.add('selected');
                                cards[i].falsecard.updateTransform(true);
                            } else if (!cards[i].classList.contains('selected')) {
                                cards[i].falsecard.classList.remove('selected');
                                cards[i].falsecard.updateTransform();
                            }
                        }
                        //如果卡牌已经不是可选的就删除假牌
                        if (event.player == game.me && cardes && cardes.length > 0 && cardes.includes(cards[i]) && event._cardChoice && !event._cardChoice.includes(cards[i])&& !_status.auto) {
                            if (cards[i].falsecard) {
                                let cardoo = cards[i].falsecard;
                                cardoo.fix();
                                cardoo.remove();
                                cardoo.destroyed = true;
                                cards[i].falsecard = undefined;
                                delete cards[i].falsecard;
                                //刷新手牌
                                dui.queueNextFrameTick(dui.layoutHand, dui);
                            }
                        }
                    }
                    if (ui.selected.cards.length < range[0]) {
                        if (!event.forced || selectableCards || event.complexSelect) {
                            ok = false;
                        }
                    }
                }
                if (custom.add.card) {
                    custom.add.card();
                }
            }
            if (event.filterTarget) {
                if (ok == false) {
                    game.uncheck('target');
                } else {
                    var card = get.card();
                    var firstCheck = false;
                    range = get.select(event.selectTarget);
                    var selectableTargets = false;
                    if (range[0] != range[1] || range[0] > 1) auto = false;
                    for (i = 0; i < players.length; i++) {
                        var nochess = true;
                        if (game.chess && !event.chessForceAll && player && get.distance(player, players[i], 'pure') > 7) {
                            nochess = false;
                        } else if (players[i].isOut()) {
                            nochess = false;
                        } else if (event._targetChoice && event._targetChoice.has(card)) {
                            var targetChoice = event._targetChoice.get(card);
                            if (!Array.isArray(targetChoice) || !targetChoice.contains(players[i])) {
                                nochess = false;
                            }
                        } else if (!event.filterTarget(card, player, players[i])) {
                            nochess = false;
                        }
                        if (nochess) {
                            if (ui.selected.targets.length < range[1]) {
                                players[i].classList.add('selectable');
                                if (Array.isArray(event._targetChoice)) {
                                    event._targetChoice.push(players[i]);
                                }
                            } else if (range[1] <= -1) {
                                players[i].classList.add('selected');
                                ui.selected.targets.add(players[i]);
                            } else {
                                players[i].classList.remove('selectable');
                            }
                        } else {
                            players[i].classList.remove('selectable');
                            if (range[1] <= -1) {
                                players[i].classList.remove('selected');
                                ui.selected.targets.remove(players[i]);
                            }
                        }

                        if (players[i].classList.contains('selected')) {
                            players[i].classList.add('selectable');
                        } else if (!selectableTargets && players[i].classList.contains('selectable')) {
                            selectableTargets = true;
                        }

                        if (players[i].classList.contains('selected') || players[i].classList.contains('selectable')) {
                            players[i].classList.remove('un-selectable');
                        } else {
                            players[i].classList.add('un-selectable');
                        }

                        if (players[i].instance) {
                            if (players[i].classList.contains('selected')) {
                                players[i].instance.classList.add('selected');
                            } else {
                                players[i].instance.classList.remove('selected');
                            }
                            if (players[i].classList.contains('selectable')) {
                                players[i].instance.classList.add('selectable');
                            } else {
                                players[i].instance.classList.remove('selectable');
                            }
                        }
                    }
                    if (ui.selected.targets.length < range[0]) {
                        if (!event.forced || selectableTargets || event.complexSelect) {
                            ok = false;
                        }
                    }
                    if (range[1] <= -1 && ui.selected.targets.length == 0 && event.targetRequired) {
                        ok = false;
                    }
                }
                if (custom.add.target) {
                    custom.add.target();
                }
            }
            if (!event.skill && get.noSelected() && !_status.noconfirm) {
                var skills = [],

                    enable,
                    info;
                var skills2;
                if (event._skillChoice) {
                    skills2 = event._skillChoice;
                    for (var i = 0; i < skills2.length; i++) {
                        if (event.isMine() || !event._aiexclude.contains(skills2[i])) {
                            skills.push(skills2[i]);
                        }
                    }
                } else {
                    var skills2;
                    if (get.mode() == 'guozhan' && player.hasSkillTag('nomingzhi', false, null, true)) {
                        skills2 = player.getSkills(false, true, false);
                    } else {
                        skills2 = player.getSkills('invisible', true, false); //122
                    }
                    skills2 = game.filterSkills(skills2.concat(lib.skill.global), player, player.getSkills('e')
                        .concat(lib.skill.global));
                    event._skillChoice = [];
                    game.expandSkills(skills2);
                    for (i = 0; i < skills2.length; i++) {
                        info = get.info(skills2[i]);
                        enable = false;
                        if (info&&info.enable) {
                            if(typeof info.enable == 'function') enable = info.enable(event);
                            else if (typeof info.enable == 'object') enable = info.enable.contains(event.name);
                            else if (info.enable == 'phaseUse') enable = (event.type == 'phase');
                            else if (typeof info.enable == 'string') enable = (info.enable == event.name);
                        }

                        if (enable) {
                            if (!game.expandSkills(player.getSkills(false)
                                .concat(lib.skill.global))
                                .contains(skills2[i]) && (info.noHidden || get.mode() != 'guozhan' || player.hasSkillTag('nomingzhi', false, null, true))) enable = false;
                            if (info.filter && !info.filter(event, player)) enable = false; //122
                            if (info.viewAs && typeof info.viewAs != 'function' && event.filterCard && !event.filterCard(info.viewAs, player, event)) enable = false;
                            if (info.viewAs && typeof info.viewAs != 'function' && info.viewAsFilter && info.viewAsFilter(player) == false) enable = false;

                            if (info.usable && get.skillCount(skills2[i]) >= info.usable) enable = false;
                            if (info.chooseButton && _status.event.noButton) enable = false;
                            if (info.round && (info.round - (game.roundNumber - player.storage[skills2[i] + '_roundcount']) > 0)) enable = false;
                        }

                        if (enable) {
                            if (event.isMine() || !event._aiexclude.contains(skills2[i])) {
                                skills.add(skills2[i]);
                            }
                            event._skillChoice.add(skills2[i]);
                        }
                    }
                }

                var globalskills = [];
                var globallist = lib.skill.global.slice(0);
                game.expandSkills(globallist);
                for (var i = 0; i < skills.length; i++) {
                    if (globallist.contains(skills[i])) {
                        globalskills.push(skills.splice(i--, 1)[0]);
                    }
                }
                var equipskills = [];
                var ownedskills = player.getSkills('invisible', false); //122
                game.expandSkills(ownedskills);
                for (var i = 0; i < skills.length; i++) {
                    if (!ownedskills.contains(skills[i])) {
                        equipskills.push(skills.splice(i--, 1)[0]);
                    }
                }
                if (equipskills.length) {
                    ui.create.skills3(equipskills);
                } else if (ui.skills3) {
                    ui.skills3.close();
                }
                if (skills.length) {
                    ui.create.skills(skills);
                } else if (ui.skills) {
                    ui.skills.close();
                }
                if (globalskills.length) {
                    ui.create.skills2(globalskills);
                } else if (ui.skills2) {
                    ui.skills2.close();
                }
            } else {
                if (ui.skills) {
                    ui.skills.close()
                }
                if (ui.skills2) {
                    ui.skills2.close()
                }
                if (ui.skills3) {
                    ui.skills3.close()
                }
            }
            _status.multitarget = false;
            var skillinfo = get.info(_status.event.skill);
            if (_status.event.name == 'chooseToUse') {
                if (skillinfo && skillinfo.multitarget && !skillinfo.multiline) {
                    _status.multitarget = true;
                }
                if ((skillinfo && skillinfo.viewAs && typeof skillinfo.viewAs != 'function') || !_status.event.skill) {
                    var cardinfo = get.info(get.card());
                    if (cardinfo && cardinfo.multitarget && !cardinfo.multiline) {
                        _status.multitarget = true;
                    }
                }
            } else if (_status.event.multitarget) {
                _status.multitarget = true;
            }
            if (event.isMine()) {
                if (game.chess && game.me && get.config('show_distance')) {
                    for (var i = 0; i < players.length; i++) {
                        if (players[i] == game.me) {
                            players[i].node.action.hide();
                        } else {
                            players[i].node.action.show();
                            var dist = get.distance(game.me, players[i], 'pure');
                            var dist2 = get.distance(game.me, players[i]);
                            players[i].node.action.innerHTML = '距离：' + dist2 + '/' + dist;
                            if (dist > 7) {
                                players[i].node.action.classList.add('thunder');
                            } else {
                                players[i].node.action.classList.remove('thunder');
                            }
                        }
                    }
                }
                //这里要添加一个对重铸的直接确定按钮
                if (ok && (!event.filterOk || event.filterOk()) && auto && (auto_confirm || (skillinfo && skillinfo.direct) || (_status.event.skill == '_recasting' && _status.auto == false && player == game.me) || event.auto) && (!_status.mousedragging || !_status.mouseleft) && !_status.mousedown && !_status.touchnocheck) {
                    if (ui.confirm) {
                        if (!skillinfo || !skillinfo.preservecancel) {
                            ui.confirm.close();
                        }
                    }
                    if (skillinfo && skillinfo.preservecancel && !ui.confirm) {
                        ui.create.confirm('c');
                    }
                    if (event.skillDialog == true) event.skillDialog = false;
                    ui.click.ok();
                    _status.mousedragging = null;
                } else {
                    ui.arena.classList.add('selecting');
                    if (event.filterTarget && (!event.filterCard || !event.position || (typeof event.position == 'string' && event.position.indexOf('e') == -1))) {
                        ui.arena.classList.add('tempnoe');
                    }
                    game.countChoose();
                    if (!_status.noconfirm && !_status.event.noconfirm) {
                        if (!_status.mousedown || _status.mouseleft) {
                            var str = '';
                            if (ok && (!event.filterOk || event.filterOk())) str += 'o';
                            if (!event.forced && !event.fakeforce && get.noSelected()) str += 'c';
                            ui.create.confirm(str);
                        }
                    }
                }
                /*       if (!_status.event.type == 'phase'&&!event){
                       if (ui.promptDialog) ui.promptDialog.close();
                       }*/
                if (event.type == 'phase' && !event.skill && event.name == 'chooseToUse') {
                    //不在技能里时
                    if (player == game.me) {
                        if (ui.cardDialog) ui.cardDialog.close();
                        delete ui.cardDialog;
                        var handTip2 = ui.cardDialog = dui.showHandTip();
                        handTip2.appendText('出牌阶段', 'phase');
                        let tipText = '，请选择1张卡牌';
                        tipText = tipText = tipText.replace(/<\/?.+?\/?>/g, '');
								//去掉＃适应
								tipText=window.getDecPrompt(tipText);
                        handTip2.appendText(tipText);
                        handTip2.strokeText();
                        handTip2.show();
                        if (ui.selected.cards.length == 1 && lib.myprompt.card[get.name(ui.selected.cards[0])]) {
                            if (ui.cardDialog) ui.cardDialog.close();
                            delete ui.cardDialog;
                            var handTip1 = ui.cardDialog = dui.showHandTip();
                            var info = lib.myprompt.card[get.name(ui.selected.cards[0])];
                            let tipText = info;
                            tipText = tipText = tipText.replace(/<\/?.+?\/?>/g, '');
								//去掉＃适应
								tipText=window.getDecPrompt(tipText);
                            handTip1.appendText(tipText);
                            handTip1.strokeText();
                            handTip1.show();
                        } else {
                            if (ui.cardDialog) ui.cardDialog.close();
                            delete ui.cardDialog;
                        }
                    }
                }
                if (ui.confirm && ui.confirm.lastChild.link == 'cancel') {
                    if (_status.event.type == 'phase' && !_status.event.skill) {
                        //不在技能里时
                        /*  if (player == game.me) {
                              if (ui.cardDialog) ui.cardDialog.close();
                              var handTip2 = ui.promptDialog = dui.showHandTip();
                              handTip2.appendText('出牌阶段', 'phase');
                              let tipText = '，请选择1张卡牌';
                              tipText = tipText = tipText.replace(/<\/?.+?\/?>/g, '');
								//去掉＃适应
								tipText=window.getDecPrompt(tipText);
                              handTip2.appendText(tipText);
                              handTip2.strokeText();
                              handTip2.show();
                              if (ui.selected.cards.length == 1 && lib.card[get.name(ui.selected.cards[0])].prompt) {
                                  if (ui.promptDialog) ui.promptDialog.close();
                                  var handTip1 = ui.cardDialog = dui.showHandTip();
                                  var info = lib.card[get.name(ui.selected.cards[0])];
                                  let tipText = info.prompt;
                                  tipText = tipText = tipText.replace(/<\/?.+?\/?>/g, '');
								//去掉＃适应
								tipText=window.getDecPrompt(tipText);
                                  handTip1.appendText(tipText);
                                  handTip1.strokeText();
                                  handTip1.show();
                              }
                              else {
                                  if (ui.cardDialog) ui.cardDialog.close();
                              }
                          }*/
                        /*-----------------分割线-----------------*/
                        // 弹出按钮 根据手杀ui选项开关调用不同样式
                        if (lib.config['extension_手杀ui_yangshi'] == 'on') {
                            //这里在选中卡牌或者选中目标时，将结束回合变为取消
                            if (ui.selected.cards.length == 0 && ui.selected.targets.length == 0) ui.confirm.lastChild.innerHTML = "<img style='width: 140px;height: 36px' src=" + lib.assetURL + "extension/十周年UI/image/decoration/jscp.png >";
                            else ui.confirm.lastChild.innerHTML = "<image style=width: 80px height 15px src=" + lib.assetURL + "extension/十周年UI/image/decoration/QX.png>";
                        } else if (lib.config['extension_手杀ui_yangshi'] == 'off') {
                            ui.confirm.lastChild.innerHTML = '回合结束';
                        } else {
                            ui.confirm.lastChild.innerHTML = '结束';
                        }
                        /*-----------------分割线-----------------*/
                    } else {
                    if (lib.config['extension_手杀ui_yangshi'] == 'on') {
                        ui.confirm.lastChild.innerHTML = "<image style=width: 80px height 15px src=" + lib.assetURL + "extension/十周年UI/image/decoration/QX.png>";
                        } else {
                            ui.confirm.lastChild.innerHTML = '取消';
                        }
                    }
                    if (event.forced) ui.confirm.node.cancel.style.display = 'none';
                    else ui.confirm.node.cancel.style.display = 'block';
                }
                //隐藏按钮
                if (event.auto && ui.confirm) ui.confirm.close();
                else if (event.newconfirm1 && ui.confirm) {
                    ui.confirm.classList.add('newconfirm1');
                    if(event.newconfirm2 && event.dialog) {
                        ui.confirm.style.transform='translateY(-70px)';
                        var addHeight = ui.create.div();
                        addHeight.style.height='30px';
                        event.dialog.add(addHeight);
                    }
                }
            }
            //这个是在选将的时候改变位置的
            if (_status.event.parent && _status.event.parent.name == 'chooseCharacter' || _status.event.name == 'chooseCharacter') {
                //对决身份单挑斗地主隐藏确认按钮
                if (ui.confirm && !get.config('double_character') && (get.mode() == 'doudizhu' || get.mode() == 'identity' || get.mode() == 'single')) ui.confirm.close();
                ui.arena.dataset.mode = get.mode();
                ui.background.dataset.mode = get.mode();
                if (get.mode() == 'doudizhu') ui.arena.setAttribute("data-pldistance", get.distance(game.me, game.zhu, 'absolute'))
                if (get.mode() == 'versus') {
                    if (game.me.isFriendOf(game.me.next)) ui.arena.setAttribute('data-pldistance', '1');
                    else ui.arena.setAttribute('data-pldistance', '2');
                }
            }
            /*虚拟框架测试版
            let skillt=event.skill;       
if(player==game.me&&skillt&&get.info(skillt).viewAs){
if(!ui.carda){
let name=get.info(skillt).viewAs.name;
let suit=get.info(skillt).viewAs.suit;
let number=get.info(skillt).viewAs.number;
let nature=get.info(skillt).viewAs.nature;
ui.carda = ui.create.card().init([
suit,
number,
name,
nature]);
    ui.carda.dataset.virtualCard = true;
    ui.carda.virtualMark = ui.create.div('.virtualMark', ui.carda);
    player.directgains([ui.carda]);
    ui.carda.classList.add('selected');
    ui.carda.classList.add('selectable');
    ui.carda.updateTransform();
}}else{
if(ui.carda){
ui.carda.fix();
ui.carda.remove();
ui.carda.destroyed = true;
ui.carda=false;
}
}*/
            //meihua            
            return ok;
        };
        //helasisy偷偷暗改一下uncheck
        game.uncheck = function(){
			var i, j;
			if (game.chess) {
				var shadows = ui.chessContainer.getElementsByClassName('playergrid temp');
				while (shadows.length) {
					shadows[0].remove();
				}
			}
			
			if(lib.config.enable_touchdragline) {
				// 拖拽指示线修复Helasisy
				// 在现有代码中找到这两个地方：
                _status.mousedragging = null;
                _status.mousedragorigin = null;
                
                // 在这两个赋值语句后添加：
                if(ui.ctx&&ui.canvas) ui.ctx.clearRect(0, 0, ui.canvas.width, ui.canvas.height);
                if(ui.canvas) ui.canvas.width = ui.canvas.width; // 可选强制清空
            }
			//清除假牌（我新增了这）//目前使用_status.event.skill来判断是否应该清除，似乎有点用了
			if(game.me&&game.me.getCards&&!_status.event.skill) {
    			let cardsob = game.me.getCards('hes',false,true);
                /*cardsob.forEach(c=>{
                    if(!c.falsecard) return;
                    var falseCard=c.falsecard;
                    falseCard.fix();
                    falseCard.remove();
                    falseCard.destroyed = true;
                    delete c.falsecard;
                });*/
                cardsob.forEach(c=>{
                    if(!c.truecard) return;
                    var falseCard=c;
                    falseCard.fix();
                    falseCard.remove();
                    falseCard.destroyed = true;
                    if(falseCard.truecard?.falsecard) delete falseCard.truecard.falsecard;
                    //刷新手牌
                    dui.queueNextFrameTick(dui.layoutHand, dui);
                });
            }
			
			var args = new Array(arguments.length);
			for (var i = 0; i < args.length; i++) args[i] = arguments[i];
			if ((args.length == 0 || args.contains('card')) && _status.event.player) {
				var cards = _status.event.player.getCards('hejs');
				for (j = 0; j < cards.length; j++) {
					cards[j].classList.remove('selected');
					cards[j].classList.remove('selectable');
					if (cards[j]._tempName) {
						cards[j]._tempName.innerHTML = '';
					}
					cards[j].updateTransform();
				}
				ui.selected.cards.length = 0;
				_status.event.player.node.equips.classList.remove('popequip');
			}
			var players = game.players.slice(0);
			if (_status.event.deadTarget) players.addArray(game.dead);
			if ((args.length == 0 || args.contains('target'))) {
				for (j = 0; j < players.length; j++) {
					players[j].classList.remove('selected');
					players[j].classList.remove('selectable');
					players[j].classList.remove('un-selectable');
					if (players[j].instance) {
						players[j].instance.classList.remove('selected');
						players[j].instance.classList.remove('selectable');
					}
				}
				ui.selected.targets.length = 0;
			}
			if ((args.length == 0 || args.contains('button')) && _status.event.dialog && _status.event.dialog.buttons) {
				for (j = 0; j < _status.event.dialog.buttons.length; j++) {
					_status.event.dialog.buttons[j].classList.remove('selectable');
					_status.event.dialog.buttons[j].classList.remove('selected');
				}
				ui.selected.buttons.length = 0;
			}
			if (args.length == 0) {
				ui.arena.classList.remove('selecting');
				ui.arena.classList.remove('tempnoe');
				_status.imchoosing = false;
				_status.lastdragchange.length = 0;
				_status.mousedragging = null;
				_status.mousedragorigin = null;

				while (ui.touchlines.length) {
					ui.touchlines.shift().delete();
				}
			}
			
			for (var i = 0; i < players.length; i++) {
				players[i].unprompt();
			}
			for (var i = 0; i < _status.dragline.length; i++) {
				if (_status.dragline[i]) _status.dragline[i].remove();
			}
			ui.arena.classList.remove('dragging');
			_status.dragline.length = 0;
		};
        //在这里把中间区域的跟技能无关的log记录屏蔽掉，让中间更清爽
        game.log = function() {
            var str = '',
                str2 = '',
                logvid = null;
            if(lib.config.boldFontText) {
                 var boldFontText='style="font-weight:bold"';
            }else {
                 var boldFontText=' ';
            }
            for (var i = 0; i < arguments.length; i++) {
                var itemtype = get.itemtype(arguments[i]);
                if (itemtype == 'player' || itemtype == 'players') {
                    str += '<span class="bluetext"'+boldFontText+'>' + get.translation(arguments[i]) + '</span>';
                    str2 += get.translation(arguments[i]);
                } else if (itemtype == 'cards' || itemtype == 'card' || (typeof arguments[i] == 'object' && arguments[i] && arguments[i].name)) {
                    str += '<span class="yellowtext"'+boldFontText+'>' + get.translation(arguments[i]) + '</span>';
                    str2 += get.translation(arguments[i]);
                } else if (typeof arguments[i] == 'object') {
                    if (arguments[i]) {
                        if (arguments[i].parentNode == ui.historybar) {
                            logvid = arguments[i].logvid;
                        } else {
                            str += get.translation(arguments[i]);
                            str2 += get.translation(arguments[i]);
                        }
                    }
                } else if (typeof arguments[i] == 'string') {
                    if (arguments[i][0] == '【' && arguments[i][arguments[i].length - 1] == '】') {
                        str += '<span class="greentext"'+boldFontText+'>' + get.translation(arguments[i]) + '</span>';
                        str2 += get.translation(arguments[i]);
                    } else if (arguments[i][0] == '#') {
                        var color = '';
                        switch (arguments[i][1]) {
                            case 'b':
                                color = 'blue';
                                break;
                            case 'y':
                                color = 'yellow';
                                break;
                            case 'g':
                                color = 'green';
                                break;
                        }
                        str += '<span class="' + color + 'text"'+boldFontText+'>' + get.translation(arguments[i].slice(2)) + '</span>';
                        str2 += get.translation(arguments[i].slice(2));
                    } else {
                        if (arguments[i].indexOf('使命') != -1 && arguments[i].indexOf('失败') != -1) {
                            let playerp = _status.event.player;
                            let skillp = lib.skill[_status.event.name].parentskill;
                            setTimeout(function() {
                                if (skillp) var mark = playerp.node.xSkillMarks.querySelector('[data-id="' + skillp + '"]');
                                if (mark) mark.classList.add('fail');
                            }, 0)
                        }
                        str += get.translation(arguments[i]);
                        str2 += get.translation(arguments[i]);
                    }
                } else {
                    str += arguments[i];
                    str2 += arguments[i];
                }
            }
            if(!window.isNaN(Number(str))&&str!="") {
                var nums=Number(str);
                //var tralist='○ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ';
                var tralist='○１２３４５６７８９';
                if(tralist[nums]) nums=tralist[nums];
                str='- '+'<span class=\"newbluetext\" style=\"color:#87CEFA\">'+nums+'</span>'+' -';
                str2='- '+nums+' -';
            }
            var node = ui.create.div();
            node.innerHTML = lib.config.log_highlight ? str : str2;
            ui.sidebar.insertBefore(node, ui.sidebar.firstChild);
            game.addVideo('log', null, lib.config.log_highlight ? str : str2);
            game.broadcast(function(str, str2) {
                game.log(lib.config.log_highlight ? str : str2);
            }, str, str2);
            if (!_status.video && !game.online) {
                if (!logvid&&typeof _status.event.getLogv=='function') {
                    logvid = _status.event.getLogv();
                }
                if (logvid) {
                    game.logv(logvid, '<div class="text center">' + lib.config.log_highlight ? str : str2 + '</div>');
                }
            }
            //屏蔽聊天信息在局内显示
            if(arguments[0]&&typeof arguments[0] == 'string'&&arguments[0].indexOf('<span isChat=\"true\"')==0) return;
            
            // 烦人的记录bug找半天找不到位置，原来在这里，Helasisy
            if (lib.config.tenUIonlySkill&&!_status.event.skill) return;
            //这里，清除使用卡牌在中间的显示
            if (lib.config.tenUIonlySkill&&_status.event == 'useCard') return;
            //这里，清除重铸的显示
            if (lib.config.tenUIonlySkill&&_status.event.skill == '_recasting') return;
            if (lib.config.show_log != 'off' && !game.chess) {
                var nodeentry = node.cloneNode(true);
                //颜色改一下rgb(193,173,146);
                if(lib.config.brownFontText) nodeentry.innerHTML = '<span style="color: rgb(220,200,170)">'+nodeentry.innerHTML+'</span>';
                ui.arenalog.insertBefore(nodeentry, ui.arenalog.firstChild);
                if (!lib.config.clear_log) {
                    while (ui.arenalog.childNodes.length && ui.arenalog.scrollHeight > ui.arenalog.offsetHeight) {
                        ui.arenalog.lastChild.remove();
                    }
                }
                if (!lib.config.low_performance) {
                    nodeentry.style.transition = 'all 0s';
                    nodeentry.style.marginBottom = (-nodeentry.offsetHeight) + 'px';
                    ui.refresh(nodeentry);
                    nodeentry.style.transition = '';
                    nodeentry.style.marginBottom = '';
                }
                if (lib.config.clear_log) {
                    nodeentry.timeout = setTimeout(function() {
                        nodeentry.delete();
                    }, 1000);
                    for (var i = 0; i < ui.arenalog.childElementCount; i++) {
                        if (!ui.arenalog.childNodes[i].timeout) {
                            ui.arenalog.childNodes[i].remove();
                        }
                    }
                }
            }
        };
        //取消按钮
        //主要是为了在出牌阶段，拿起牌时，取消是取消拿牌，而不是结束回合
        ui.click.cancel = function(node) {
            var event = _status.event;
            if (event.custom.replace.confirm) {
                event.custom.replace.confirm(false);
                return;
            }
            if (event.skill && !event.norestore) {
                if (event.skillDialog && get.objtype(event.skillDialog) == 'div') {
                    event.skillDialog.close();
                }
                if (typeof event.dialog == 'string' && event.isMine()) {
                    event.dialog = ui.create.dialog(event.dialog);
                }
                if (_status.event.type == 'phase' && ui.confirm) {
                    ui.confirm.classList.add('removing');
                }
                // ui.control.animate('nozoom',100);
                event.restore();
                var cards = event.player.getCards('hej');
                for (var i = 0; i < cards.length; i++) {
                    cards[i].recheck('useSkill');
                }
                game.uncheck();
                game.check();
                return;
                //这里是对取消按钮的修改，在选中卡牌时，如果是回合内那么就变为取消效果
            } else if (_status.event.type == 'phase' && ui.confirm && (ui.selected.cards.length != 0 || ui.selected.targets.length != 0)) {
                ui.confirm.classList.add('removing');
                event.restore();
                var cards = event.player.getCards('hej');
                for (var i = 0; i < cards.length; i++) {
                    cards[i].recheck('useSkill');
                }
                game.uncheck();
                game.check();
                return;
            }
            event.result = {
                confirm: 'cancel',
                bool: false
            };
            if (node) {
                node.parentNode.close();
            }
            if (ui.skills) ui.skills.close();
            if (ui.skills2) ui.skills2.close();
            if (ui.skills3) ui.skills3.close();
            game.uncheck();
            if (event.custom.add.confirm) {
                event.custom.add.confirm(true);

            }
            game.resume();
        };
        //去除nature对木牛卡牌的影响，解决神刘备等mod技能的异常属性转化
        //没有去除其他s区，因为不知道是否有需要使用s区的mod
        get.nature = function(card, player) {
            if (get.itemtype(player) == 'player' || player !== false) {
                var owner = get.owner(card);
                if (owner) {
                    if (card.hasGaintag('muniu')) return card.nature;
                    return game.checkMod(card, owner, card.nature, 'cardnature', owner);
                }
            }
            return card.nature;
        };
        //重铸修改
        if (lib.config['extension_手杀ui_yangshi'] == 'on') {
        lib.translate['_chongzhu']='重铸';
        lib.skill._recasting = {
            enable: 'phaseUse',
            logv: false,
            visible: true,
            //	prompt:'将要重铸的牌置入弃牌堆并摸一张牌',
            init: function(player) {
                if (player == game.me) player.storage.recastablecard = [];
            },
            filter: function(event, player) {
                if (game.isMine()) {
                    lib.skill._recasting.filterCard = false;
                    return !window.isAutoing;
                }else {
                    lib.skill._recasting.filterCard = lib.skill._recasting.fCard;
                    return player.hasCard(function(card) {
                        return lib.skill._recasting.filterCard(card, player);
                    });
                }
            },
            fCard: function(card, player) {
                var mod = game.checkMod(card, player, 'unchanged', 'cardrecastableable', player);
                if (mod != 'unchanged') return mod;
                var info = get.info(card);
                if (typeof info.recastable == 'function') {
                    return info.recastable(event, player);
                }
                return info.recastable;
            },
            prepare: function(cards, player) {
                if(window.hasCheat) return;
                if (player == game.me && !_status.auto) {
                    if (player.storage.recastablecard[0] && player.storage.recastablecard[0]._tempName) player.storage.recastablecard[0]._tempName.remove();
                    player.$throw(player.storage.recastablecard, 1000);
                    player.lose(player.storage.recastablecard);
                    game.log(player, '将', player.storage.recastablecard, '置入了弃牌堆');
                } else {
                    player.$throw(cards, 1000);
                    game.log(player, '将', cards, '置入了弃牌堆');
                }
                /*      var sex = player.sex == 'female' ? 'female' : 'male';
                game.playAudio('card', sex, 'recastable');*/
            },
            check: function(card) {
                return 1;
            },
            discard: false,
            loseTo: 'discardPile',
            delay: false,
            //播放重铸语音
            precontent:function() {
                if(game.playqysstx&&!window.hasCheat) game.playqysstx('qy_chongzhu_' + (player.sex == 'female' ? 'female' : 'male'));
            },
            content: function() {
                if(window.hasCheat) return;
                if (lib.config.mode == 'stone' && _status.mode == 'deck' && !player.isMin() && get.type(cards[0])
                    .indexOf('stone') == 0) {
                    var list = get.stonecard(1, player.career);
                    if (list.length) {
                        player.gain(game.createCard(list.randomGet()), 'draw');
                    } else {
                        player.draw({
                            drawDeck: 1
                        })
                    }
                } else if (get.subtype(cards[0]) == 'spell_gold') {
                    var list = get.libCard(function(info) {
                        return info.subtype == 'spell_silver';
                    });
                    if (list.length) {
                        player.gain(game.createCard(list.randomGet()), 'draw');
                    } else {
                        player.draw();
                    }
                } else if (get.subtype(cards[0]) == 'spell_silver') {
                    var list = get.libCard(function(info) {
                        return info.subtype == 'spell_bronze';
                    });
                    if (list.length) {
                        player.gain(game.createCard(list.randomGet()), 'draw');
                    } else {
                        player.draw();
                    }
                } else {
                    player.draw();
                }

            },
            ai: {
                basic: {
                    order: 6
                },
                result: {
                    player: 1,
                },
            }
        };
        }
        //从本体提取的转换技文字显示而不是太极图，不需要去改本体了
        game.oldfinishSkill = game.finishSkill;
        game.finishSkill = function(i, sub) {
            var info = lib.skill[i];
            if (info.zhuanhuanji) {
                if (info.mark === undefined) info.mark = true;
                if (info.marktext) info.marktext = info.name;
            }
            if (info.subSkill && !sub) {
                for (var j in info.subSkill) {
                    lib.skill[i + '_' + j] = info.subSkill[j];
                    lib.skill[i + '_' + j].sub = true;
                    lib.skill[i + '_' + j].parentskill = i;
                    if (info.subSkill[j].name) {
                        lib.translate[i + '_' + j] = info.subSkill[j].name;
                    } else {
                        lib.translate[i + '_' + j] = lib.translate[i + '_' + j] || lib.translate[i];
                    }
                    if (info.subSkill[j].description) {
                        lib.translate[i + '_' + j + '_info'] = info.subSkill[j].description;
                    }
                    if (info.subSkill[j].marktext) {
                        lib.translate[i + '_' + j + '_bg'] = info.subSkill[j].marktext;
                    }
                    game.oldfinishSkill(i + '_' + j, true);
                }
            }
            return game.oldfinishSkill(i, sub);
        };
        //鸟鸟的虚拟马，我用有点bug，无码有码的情况下🐎飞了
        if (decadeUI.config.newDecadeStyle == 'off') {
        /*lib.skill._xunizhuangbei_gua_gua = {
            trigger: {
                global: ["gameStart", 'die', 'phaseEnd', 'phaseBefore', 'equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter', "useCardAfter", 'addSkillAfter', 'disableSkillAfter', 'removeSkillAfter', 'enableSkillAfter', 'removeSkillBlockerAfter', 'addSkillBlockerAfter', 'damageAfter', 'recoverAfter', 'logSkill', 'disableEquipAfter', 'enableEquipAfter', 'useSkillAfter'],
            },
            filter: function(event, player) {
                return true;
            },
            firstDo: true,
            forceDie: true,
            charlotte: true,
            silent: true,
            forced: true,
            content: function() {
                'step 0'
                if (ui.updateSkillControl) ui.updateSkillControl(game.me, true);
                if (event.triggername == 'die' && !player.isAlive()) {
                    var scbgz = document.getElementsByClassName(player.name + 'from')[0];
                    if (scbgz) {
                        scbgz.parentNode.removeChild(scbgz);
                    }
                    var scbgz = document.getElementsByClassName(player.name + 'to')[0];
                    if (scbgz) {
                        scbgz.parentNode.removeChild(scbgz);
                    }
                    var scbgz = document.getElementsByClassName(player.name + 'bg')[0];
                    if (scbgz) {
                        scbgz.parentNode.removeChild(scbgz);
                    }
                    var scbgz = document.getElementsByClassName(player.name + '-')[0];
                    if (scbgz) {
                        scbgz.parentNode.removeChild(scbgz);
                    }
                    var scbgz = document.getElementsByClassName(player.name + '+')[0];
                    if (scbgz) {
                        scbgz.parentNode.removeChild(scbgz);
                    }
                }
                if (player.isAlive()) {
                    if (player.hasSkill("bazhen_bagua") || player.hasSkill('linglong_bagua')) {
                        var scbgz = document.getElementsByClassName(player.name + 'bg')[0];
                        if (scbgz) {
                            scbgz.parentNode.removeChild(scbgz);
                        }
                        player.storage.xnbagua = true;
                        if (player.isEmpty(2)) {
                            var bgz = ui.create.div('.bazhen_bagua', player);
                            bgz.classList.add(player.name + 'bg');
                            bgz.innerHTML = '八卦阵';
                        }
                    } else if (player.storage.xnbagua) {
                        player.storage.xnbagua = false;
                        var scbgz = document.getElementsByClassName(player.name + 'bg')[0];
                        if (scbgz) {
                            scbgz.parentNode.removeChild(scbgz);
                        }
                    }
                    var from = -game.checkMod(player, player, 0, 'globalFrom', player);
                    //if(player.getExpansions('duwang').filter(i=>i.name!='sha').length) from+=player.getExpansions('duwang').filter(i=>i.name!='sha').length;
                    var to = game.checkMod(player, player, 0, 'globalTo', player);
                    if (from == 'Infinity') from = 0;
                    if (!player.isEmpty(4) && !player.isDisabled('equip4')) from < 0 ? from = 1 : from += 1;
                    if (!player.isEmpty(3) && !player.isDisabled('equip3')) to < 0 ? to = 1 : to += 1;
                    var changefrombool = false;
                    var changetobool = false;
                    if (player.storage.nowfrom == from) {
                        var ymyma = document.getElementsByClassName(player.name + '-')[0];
                        if (player.isEmpty(4) && ymyma) changefrombool = true;
                        if (!player.isEmpty(4) && !player.isDisabled('equip4') && !ymyma) changefrombool = true;
                    }
                    if (player.storage.nowto == to) {
                        var ymyma = document.getElementsByClassName(player.name + '+')[0];
                        if (player.isEmpty(3) && ymyma) changetobool = true;
                        if (!player.isEmpty(3) && !player.isDisabled('equip3') && !ymyma) changetobool = true;
                    }
                    if (from > 0 && (player.storage.nowfrom != from || !player.storage.xnfrom || changefrombool)) {
                        var scbgz = document.getElementsByClassName(player.name + 'from')[0];
                        if (scbgz) {
                            scbgz.parentNode.removeChild(scbgz);
                        }
                        var scbgz = document.getElementsByClassName(player.name + '-')[0];
                        if (scbgz) {
                            scbgz.parentNode.removeChild(scbgz);
                        }
                        player.storage.nowfrom = from;
                        player.storage.xnfrom = true;
                        //和本来的装备显示冲突了
                        if (!player.isEmpty(4) && !player.isDisabled('equip4')) {
                            /*var ma = document.createElement("img");
                            ma.src = decadeUIPath + "/assets/image/neg.png";
                            ma.classList.add(player.name + '-');
                            ma.style.display = "block";
                            ma.style.position = "absolute";
                            ma.style.top = "auto";
                            ma.style.bottom = "8px";
                            ma.style.left = "94px";
                            ma.style.height = "4px";
                            ma.style.width = "8px";
                            ma.style.zIndex = "65";
                            player.appendChild(ma);
                            var ma = document.createElement("img");
                            ma.src = from < 10 ? decadeUIPath + "/assets/image/" + from + ".png" : decadeUIPath + "/assets/image/over.png";
                            ma.classList.add(player.name + 'from');
                            ma.style.display = "block";
                            ma.style.position = "absolute";
                            ma.style.top = "auto";
                            ma.style.bottom = from < 10 ? "3.3px" : "4.3px";
                            ma.style.left = from < 10 ? "99px" : "93px";
                            ma.style.height = from < 10 ? "13.6px" : "12px";
                            ma.style.width = from < 10 ? "8px" : "12px";
                            ma.style.zIndex = "65";
                            player.appendChild(ma);/
                        } else {
                            var jlmk = ui.create.div('.game_xunijingongma', player);
                            jlmk.classList.add(player.name + 'from');
                            jlmk.style.opacity='0.8';
                            jlmk.style.transform='translateY(-1.5px)';
                            jlmk.innerHTML = '-' + from;
                        }
                    } else if (player.storage.xnfrom && from <= 0) {
                        player.storage.xnfrom = false;
                        var scbgz = document.getElementsByClassName(player.name + 'from')[0];
                        if (scbgz) {
                            scbgz.parentNode.removeChild(scbgz);
                        }
                        var scbgz = document.getElementsByClassName(player.name + '-')[0];
                        if (scbgz) {
                            scbgz.parentNode.removeChild(scbgz);
                        }
                    }
                    if (to > 0 && (player.storage.nowto != to || !player.storage.xnto || changetobool)) {
                        var scbgz = document.getElementsByClassName(player.name + 'to')[0];
                        if (scbgz) {
                            scbgz.parentNode.removeChild(scbgz);
                        }
                        var scbgz = document.getElementsByClassName(player.name + '+')[0];
                        if (scbgz) {
                            scbgz.parentNode.removeChild(scbgz);
                        }
                        player.storage.nowto = to;
                        player.storage.xnto = true;
                        //和本来的装备显示冲突了
                        if (!player.isEmpty(3) && !player.isDisabled('equip3')) {
                            /*var ma = document.createElement("img");
                            ma.src = decadeUIPath + "/assets/image/pos.png";
                            ma.classList.add(player.name + '+');
                            ma.style.display = "block";
                            ma.style.position = "absolute";
                            ma.style.top = "auto";
                            ma.style.bottom = "6px";
                            ma.style.left = "35px";
                            ma.style.height = "8px";
                            ma.style.width = "8px";
                            ma.style.zIndex = "65";
                            player.appendChild(ma);
                            var ma = document.createElement("img");
                            ma.src = to < 10 ? decadeUIPath + "/assets/image/" + to + ".png" : decadeUIPath + "/assets/image/over.png";
                            ma.classList.add(player.name + 'to');
                            ma.style.display = "block";
                            ma.style.position = "absolute";
                            ma.style.top = "auto";
                            ma.style.bottom = to < 10 ? "3.3px" : "4.3px";
                            ma.style.left = to < 10 ? "40px" : "34px";
                            ma.style.height = to < 10 ? "13.6px" : "12px";
                            ma.style.width = to < 10 ? "8px" : "12px";
                            ma.style.zIndex = "65";
                            player.appendChild(ma);/
                        } else {
                            var jlmk = ui.create.div('.game_xunifangyuma', player);
                            jlmk.classList.add(player.name + 'to');
                            jlmk.style.opacity='0.8';
                            jlmk.style.transform='translateY(-1.5px)';
                            jlmk.innerHTML = '+' + to;
                        }
                    } else if (player.storage.xnto && to <= 0) {
                        player.storage.xnto = false;
                        var scbgz = document.getElementsByClassName(player.name + 'to')[0];
                        if (scbgz) {
                            scbgz.parentNode.removeChild(scbgz);
                        }
                        var scbgz = document.getElementsByClassName(player.name + '+')[0];
                        if (scbgz) {
                            scbgz.parentNode.removeChild(scbgz);
                        }
                    }
                }
            },
        };*/
        lib.skill._xunizhuangbei_gua_gua = {
            trigger: {
                global: ["gameStart", 'die', 'phaseEnd', 'phaseBefore', 'equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter', "useCardAfter", 'addSkillAfter', 'disableSkillAfter', 'removeSkillAfter', 'enableSkillAfter', 'removeSkillBlockerAfter', 'addSkillBlockerAfter', 'damageAfter', 'recoverAfter', 'logSkill', 'disableEquipAfter', 'enableEquipAfter', 'useSkillAfter'],
            },
            filter: function(event, player) {
                return true;
            },
            firstDo: true,
            forceDie: true,
            charlotte: true,
            silent: true,
            forced: true,
            content: function() {
                'step 0'
                if (ui.updateSkillControl) ui.updateSkillControl(game.me, true);
                if(!player.xuniEquip) player.xuniEquip={};
                if (event.triggername == 'die' && !player.isAlive() && player.xuniEquip) {
                    for(var e in player.xuniEquip) {
                        if(!player.xuniEquip[e]||!player.xuniEquip[e].remove) continue;
                        player.xuniEquip[e].remove();
                        player.xuniEquip[e]=false;
                    }
                }
                if (player.isAlive()) {
                    if (player.isEmpty(2) && (player.hasSkill("bazhen_bagua") || player.hasSkill('linglong_bagua'))) {
                        var equip2;
                        if(player.xuniEquip['equip2']) {
                            equip2=player.xuniEquip['equip2'];
                        }else {
                            equip2=ui.create.div('.bazhen_bagua', player);
                            player.xuniEquip['equip2']=equip2;
                        }
                        equip2.innerHTML = '八卦阵';
                    } else if (player.xuniEquip['equip2']) {
                        player.xuniEquip['equip2'].remove();
                        player.xuniEquip['equip2']=false;
                    }
                    var from = -game.checkMod(player, player, 0, 'globalFrom', player);
                    var to = game.checkMod(player, player, 0, 'globalTo', player);
                    if (from == 'Infinity') from = 0;
                    if (!player.isEmpty(4) && !player.isDisabled('equip4')) from < 0 ? from = 1 : from += 1;
                    if (!player.isEmpty(3) && !player.isDisabled('equip3')) to < 0 ? to = 1 : to += 1;
                    
                    if(from > 0 && (player.isEmpty(4) || player.isDisabled('equip4'))) {
                        var equip4;
                        if(player.xuniEquip['equip4']) {
                            equip4=player.xuniEquip['equip4'];
                        }else {
                            equip4=ui.create.div('.game_xunijingongma', player);
                            player.xuniEquip['equip4']=equip4;
                        }
                        if(player.isDisabled('equip4')) {
                            equip4.style.transform='translateY(-1.5px) translateX(15px)';
                            equip4.style.color='rgb(165,160,150)';
                            equip4.style.opacity='0.9';
                            equip4.innerHTML = '⁻' + from;
                        }else {
                            equip4.style.transform='translateY(-1.5px)';
                            equip4.style.color='#FFFFFF';
                            equip4.style.opacity='0.8';
                            equip4.innerHTML = '-' + from;
                        }
                    }else if (player.xuniEquip['equip4']) {
                        player.xuniEquip['equip4'].remove();
                        player.xuniEquip['equip4']=false;
                    }
                    if(to > 0 && (player.isEmpty(3) || player.isDisabled('equip3'))) {
                        var equip3;
                        if(player.xuniEquip['equip3']) {
                            equip3=player.xuniEquip['equip3'];
                        }else {
                            equip3=ui.create.div('.game_xunifangyuma', player);
                            player.xuniEquip['equip3']=equip3;
                        }
                        equip3.style.opacity='0.8';
                        equip3.style.transform='translateY(-1.5px)';
                        equip3.innerHTML = '-' + from;
                        if(player.isDisabled('equip3')) {
                            equip3.style.transform='translateY(-1.5px) translateX(28px)';
                            equip3.style.color='rgb(165,160,150)';
                            equip3.style.opacity='0.9';
                            equip3.innerHTML = '⁺' + to;
                        }else {
                            equip3.style.transform='translateY(-1.5px)';
                            equip3.style.color='#FFFFFF';
                            equip3.style.opacity='0.8';
                            equip3.innerHTML = '+' + to;
                        }
                    }else if (player.xuniEquip['equip3']) {
                        player.xuniEquip['equip3'].remove();
                        player.xuniEquip['equip3']=false;
                    }
                }
            },
        };
        }
        //明置看牌
        lib.skill._gshoupai = {
            trigger: {
                player: ["gainEnd", "loseEnd", "dieBefore", "useCardEnd", "respondEnd",'gameDraw'],
                global: "gameStart",
            },
            silent: true,
            forced: true,
            charlotte: true,
            filter: function(event) {
                return   (get.mode()=='versus'&&_status.mode=='two') || (get.mode()=='boss') || !game.observe && game.me && /*game.me.hasSkillTag('viewHandcard', null, event.player, true)*/(game.me.hasSkill("dcjinjing")||game.isVersusTwo);
            },
            content: function() {
            var judgeRemove=function(pl) {
                if (pl.shoupai) {
                    pl.shoupai.remove();
                    pl.shoupai=undefined;
                }
            }
            //2v2模式永久开启，玩家阵亡不阻碍刷新
            if(get.mode()=='versus'&&_status.mode=='two') game.isVersusTwo=true;
            //挑战模式永久开启，玩家阵亡不阻碍刷新
            if(get.mode()=='boss') game.isVersusTwo=true;
            /*if(true&&game.players.length>=8&&!game.players[0].style['z-index']) {
                for(let i = 0;i<game.players.length;i++){
                    game.players[i].style['z-index']=game.players.length-i;
                }
            }*/
            for(let i = 0;i<game.players.length;i++){
                //排除问题啦：game.me有时候不一定是game.players[0]
                //if(game.players[i]==game.me) continue;
                let pl=game.players[i];
                if(pl==game.me) {
                    judgeRemove(pl);
                    continue;
                }
                if(get.mode()=='versus'&&_status.mode=='two'&&pl.isEnemiesOf(game.me)&&!game.me.hasSkill("dcjinjing")) {
                    judgeRemove(pl);
                    continue;
                }
                if(get.mode()=='boss'&&pl.isEnemiesOf(game.me)&&!game.me.hasSkill("dcjinjing")) {
                    judgeRemove(pl);
                    continue;
                }
                if(!pl.shoupai&&!pl.isDead()&&pl!=game.me){
                pl.shoupai=ui.create.div('.gshoupai',pl);
                var totalPlayers=game.players.concat(game.dead);
                //可以规避显示遮挡
                if(totalPlayers.length>=8||(get.mode()=='boss'&&!pl.isEnemiesOf(game.me)&&game.me.ideneity=='zhu')) {
                    //pl.style.transform='scale(0.9)';
                    if(lib.config.ui_zoom.indexOf('small')==-1) pl.shoupai.style.transform='scale(0.7) translate(265%, -20%)';
                    if(lib.config.ui_zoom=='small') {
                        //这里需要斟酌一下
                        //pl.shoupai.style.transform='scale(0.7) translate(265%, -20%)';
                        //pl.shoupai.style.transform='scale(0.8) translate(8%, -15%)';
                        pl.shoupai.style.transform='scale(0.65) translate(13%, -14.5%)';
                    }
                    if(lib.config.ui_zoom=='vsmall') pl.shoupai.style.transform='scale(0.7) translate(10%, -10%)';
                }
                if(get.mode()=='versus'&&_status.mode=='two'&&pl.isEnemiesOf(game.me)) {
                    if(lib.config.ui_zoom.indexOf('small')==-1) pl.shoupai.style.transform='scale(0.7) translate(265%, -20%)';
                    if(lib.config.ui_zoom=='small') pl.shoupai.style.transform='scale(0.8) translate(8%, -15%)';
                    if(lib.config.ui_zoom=='vsmall') pl.shoupai.style.transform='scale(0.7) translate(10%, -10%)';
                }
                if(get.mode()=='boss'&&(!pl.isEnemiesOf(game.me)||game.me.hasSkill("dcjinjing"))&&game.me.identity!='zhu') {
                    pl.shoupai.style.transform='scale(0.7) translate(265%, -20%)';
                }
                setTimeout(function(){  
                pl.shoupai.innerHTML = '';
                        for (var j = 0; j < pl.getCards('h').length; j++) {
                            if (j <= 3) {
                                pl.shoupai.innerHTML += get.translation(pl.getCards('h')[j].name)
                                    .slice(0, 2) + '<br>'
                            }
                            if (j == 4) {
                                pl.shoupai.innerHTML += '…'
                            }
                        } },0)             
                pl.shoupai.onclick = function() {
                            if (pl.getCards('h')
                                .length > 0) {
                                var popuperContainer = ui.create.div('.popup-container', ui.window);
                                //金色查看手牌
                                var arrowHide = '<img src=' + lib.assetURL + 'extension/十周年UI/assets/image/arrow.png' + ' style=opacity:0;position:relative;width:30px;height:25px;margin-bottom:-5px;left:2px;/>';
                                var shoupai = ui.create.dialog(arrowHide+'<font color=\"#f1d977\",font size=5px,font family=HYZLSJ,font weight=bolder,top=-10px,>'+game.addGoldFont('查看手牌','font-size:35px;#shadow;')+'<img src=' + lib.assetURL + 'extension/十周年UI/assets/image/arrow.png' + ' style=position:relative;width:30px;height:25px;margin-bottom:-5px;left:2px;/>', pl.getCards('h'));
                                shoupai.static=true;
                                //微不足道的一修
                                ui.update();
                                popuperContainer.addEventListener('click', event => {
                                    popuperContainer.delete(200);
                                    shoupai.close();
                                    shoupai.delete(200);
                                });
                            }
    
                }}
                else   if (pl.shoupai) {
                    pl.shoupai.innerHTML = '';
                    for (var j = 0; j < pl.getCards('h').length; j++) {
                        if (j <= 3) {
                            pl.shoupai.innerHTML += get.translation(pl.getCards('h')[j].name)
                                .slice(0, 2) + '<br>'
                        }
                        if (j == 4) {
                            pl.shoupai.innerHTML += '…'
                        }
                    }
                    if (pl==game.me||(event.triggername == "dieBefore"&&event.player==pl)) {
                        if (pl.shoupai) {
                            pl.shoupai.remove();
                            pl.shoupai=undefined;
                        }
                    }
                }                    
            }
            },
        }
        //木马
        lib.translate.muniu_skill_bg = '木马';
        //顺框
        lib.element.content.gainPlayerCard = function() {
            "step 0"
            if (event.directresult) {
                event.result = {
                    buttons: [],
                    cards: event.directresult.slice(0),
                    links: event.directresult.slice(0),
                    targets: [],
                    confirm: ['ok','cancel'],
                    bool: true
                };
                if(event.forced) event.result.confirm = 'ok';
                event.cards = event.directresult.slice(0);
                event.goto(2);
                return;
            }
            if (!event.dialog) {
                event.dialog = ui.create.dialog('hidden');
                //noupdate是为了不让游戏的样式刷新它，有noupdate的框可以自己随意设定
                event.dialog.classList.add('noupdate')
                event.dialog.id = 'shunshouDialog';
            } else if (!event.isMine()) {
                event.dialog.style.display = 'none';
            }
            var shunshouTitle = ui.create.div('.shunshouTitle');
            let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g")
            var num = 1;
            while (true) {
                if (reg.test(get.translation(this.getParent(num)
                    .name))) {
                    /*shunshouTitle.innerHTML = game.heiheiARRAY() + get.translation(this.getParent(num)
                        .name) + '▾';*/
                    shunshouTitle.innerHTML = game.changeToGoldTitle(get.translation(this.getParent(num).name), {noshadow: true, margin: '-5px'}, 40);
                    num = 1;
                    break;
                } else num++;
                if (!this.getParent(num)) {
                    //shunshouTitle.innerHTML = game.heiheiARRAY() + '拿牌▾';
                    shunshouTitle.innerHTML = game.changeToGoldTitle('拿牌', {noshadow: true, margin: '-5px'}, 40);
                    break;
                }
                if (num > 10) break;
            }
            event.dialog.appendChild(shunshouTitle);
            var directh = (!lib.config.unauto_choose && !event.complexSelect);
            event.join_h = function() {
                var hs = target.getGainableCards(player, 'h');
                var hArea = ui.create.div('.hArea', event.dialog);
                var hTitle = ui.create.div('.hTitle', event.dialog);
                hTitle.innerHTML = '手牌';
                if (event.position && event.position.includes('h')) {
                    if (hs.length) {
                        hs.randomSort();
                        if (event.visible || target.isUnderControl(true) || player.hasSkillTag('viewHandcard', null, target, true)) {
                            event.dialog.add(hs, '', '', hArea);
                            directh = false;
                        } else {
                            event.dialog.add([hs, 'blank'], '', '', hArea);
                        }
                    }
                }
            }
            event.join_e = function() {
                var es = target.getGainableCards(player, 'e');
                var eArea = ui.create.div('.eArea', event.dialog),
                    eTitle = ui.create.div('.eTitle', event.dialog);
                eTitle.innerHTML = '装备牌';
                var equipList = ['武器牌', '防具牌', '+1马', '-1马', '宝物牌'];
                for (var x = 1; x < 6; x++) {
                    var eAreaCard;
                    eAreaCard = ui.create.div('.eAreaCard', eArea);
                    eAreaCard.innerHTML = equipList[x - 1];
                    eAreaCard.setAttribute('id', 'equip' + x);
                    if (event.position && event.position.includes('e')) {
                        if (target.getEquip(x) != null && es.length && es.includes(target.getEquip(x))) {
                            event.dialog.add([target.getEquip(x)], '', '', eAreaCard);
                        }
                        if (x == 3 && target.getEquip(6) != null && es.length && es.includes(target.getEquip(6))) {
                            event.dialog.add([target.getEquip(6)], '', '', eAreaCard);
                        }
                    }
                }
                if (es.length) {
                    directh = false;
                }
            }
            event.join_j = function() {
                var js = target.getGainableCards(player, 'j');
                var jArea = ui.create.div('.jArea', event.dialog),
                    jTitle = ui.create.div('.jTitle', event.dialog);
                jTitle.innerHTML = '延时锦囊牌';
                for (var x = 0; x < 3; x++) {
                    var jAreaCard = ui.create.div('.jAreaCard', jArea);
                    jAreaCard.setAttribute('id', 'judgeCard' + x);
                    jAreaCard.innerHTML = '单张牌' + '<br>' + '延时锦囊';
                    if (event.position && event.position.includes('j')) {
                        if (js.length && js[x]) event.dialog.add([js[x]], '', '', jAreaCard);
                    }
                }
                if (js.length) {
                    directh = false;
                }
            }
            let pst = '';
            if (event.position.indexOf('h') != -1) {
                event.join_h();
                pst += 'h';
            }
            if (event.position.indexOf('e') != -1) {
                event.join_e();
                pst += 'e';
            }
            if (event.position.indexOf('j') != -1) {
                event.join_j();
                pst += 'j';
            }
            
            if (pst != 'hej') event.dialog.dataset.pst = pst;
            
            if(event.position=='h'||event.position.indexOf('h')==-1) {
                event.newconfirm2 = true;
                if(event.position=='h') event.dialog.dataset.pst = 'hok';
                else if(event.position=='e'||event.position=='j') event.dialog.dataset.pst = 'ook';
                else event.dialog.dataset.pst = 'eok';
            }

            if (event.dialog.buttons.length == 0) {
                event.dialog.close();
                event.finish();
                return;
            }
            var cs = target.getCards(event.position);
            var select = get.select(event.selectButton);
            if (event.forced && select[0] >= cs.length) {
                event.result = {
                    bool: true,
                    buttons: event.dialog.buttons,
                    links: cs
                }
            } else if (event.forced && directh && !event.isOnline() && select[0] == select[1]) {
                event.result = {
                    bool: true,
                    buttons: event.dialog.buttons.randomGets(select[0]),
                    links: []
                }
                for (var i = 0; i < event.result.buttons.length; i++) {
                    event.result.links[i] = event.result.buttons[i].link;
                }
            } else {
                if (event.isMine()) {
                    if (false/*!event.forced*/) {
                        var str = '是否发动【' + get.translation(event.parent.name) + '】获得' + get.translation(target);
                        var range = get.select(event.selectButton);
                        if (range[0] == range[1]) str += get.cnNumber(range[0]);
                        else if (range[1] == Infinity) str += '至少' + get.cnNumber(range[0]);
                        else str += get.cnNumber(range[0]) + '至' + get.cnNumber(range[1]);
                        str += '张牌';
                        game.me.chooseBool(str);
                    } else {
                        var range = get.select(event.selectButton);
                        if (range[0] == range[1] && range[0] == 1 && event.forced) event.auto = true;
                        else event.newconfirm1 = true;
                        event.dialog.open();
                        game.check();
                        game.pause();
                    }
                } else if (event.isOnline()) {
                    event.send();
                } else {
                    event.result = 'ai';
                }
            }
            "step 1"
            if (event.result == 'ai') {
                game.check();
                if ((ai.basic.chooseButton(event.ai) || forced) && (!event.filterOk || event.filterOk())) ui.click.ok();
                else ui.click.cancel();
            } else if (result && result.bool) {
                //event.forced = true;
                var range = get.select(event.selectButton);
                if (range[0] == range[1] && range[0] == 1 && event.forced) event.auto = true;
                else event.newconfirm1 = true;
                event.dialog.open();
                game.check();
                game.pause();
            } else if (result && result.bool == false) {
                event.finish();
                return;
            }
            "step 2"
            event.dialog.close();
            "step 3"
            event.resume();
            if (game.online || !event.result.bool) {
                event.finish();
            }
            "step 4"
            if (event.logSkill && event.result.bool && !game.online) {
                if (typeof event.logSkill == 'string') {
                    player.logSkill(event.logSkill);
                } else if (Array.isArray(event.logSkill)) {
                    player.logSkill.apply(player, event.logSkill);
                }
            }
            var cards = [];
            for (var i = 0; i < event.result.links.length; i++) {
                cards.push(event.result.links[i]);
            }
            event.result.cards = event.result.links.slice(0);
            event.cards = cards;
            event.trigger("rewriteGainResult");
            "step 5"
            if (event.boolline) {
                player.line(target, 'green');
            }
            if (!event.chooseonly) {
                if (event.delay !== false) {
                    var next = player.gain(event.cards, target, event.visibleMove ? 'give' : 'giveAuto', 'bySelf');
                    event.done = next;
                } else {
                    var next = player.gain(event.cards, target, 'bySelf');
                    event.done = next;
                    target[event.visibleMove ? '$give' : '$giveAuto'](cards, player);
                    if (event.visibleMove) next.visible = true;
                }
            } else target[event.visibleMove ? '$give' : '$giveAuto'](cards, player);
        };
        //拆框
        lib.element.content.discardPlayerCard = function() {
            "step 0"
            if (event.directresult) {
                event.result = {
                    buttons: [],
                    cards: event.directresult.slice(0),
                    links: event.directresult.slice(0),
                    targets: [],
                    confirm: ['ok','cancel'],
                    bool: true
                };
                if(event.forced) event.result.confirm = 'ok';
                event.cards = event.directresult.slice(0);
                event.goto(2);
                return;
            }
            if (!event.dialog) {
                event.dialog = ui.create.dialog('hidden');
                event.dialog.classList.add('noupdate')
                event.dialog.id = 'shunshouDialog';
            } else if (!event.isMine()) {
                event.dialog.style.display = 'none';
            }
            var shunshouTitle = ui.create.div('.shunshouTitle');
            let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g")
            var num = 1;
            while (true) {
                if (reg.test(get.translation(this.getParent(num)
                    .name))) {
                    /*shunshouTitle.innerHTML = game.heiheiARRAY() + get.translation(this.getParent(num)
                        .name) + '▾';*/
                    shunshouTitle.innerHTML = game.changeToGoldTitle(get.translation(this.getParent(num).name), {noshadow: true, margin: '-5px'}, 40);
                    num = 1;
                    break;
                } else num++;
                if (!this.getParent(num)) {
                    //shunshouTitle.innerHTML = game.heiheiARRAY() + '弃牌▾';
                    shunshouTitle.innerHTML = game.changeToGoldTitle('弃牌', {noshadow: true, margin: '-5px'}, 40);
                    break;
                }
                if (num > 10) break;
            }
            event.dialog.appendChild(shunshouTitle);
            var directh = (!lib.config.unauto_choose && !event.complexSelect);
            event.join_h = function() {
                var hs = target.getDiscardableCards(player, 'h');
                var hArea = ui.create.div('.hArea', event.dialog);
                var hTitle = ui.create.div('.hTitle', event.dialog);
                hTitle.innerHTML = '手牌';
                if (event.position && event.position.includes('h')) {
                    if (hs.length) {
                        hs.randomSort();
                        if (event.visible || target.isUnderControl(true) || player.hasSkillTag('viewHandcard', null, target, true)) {
                            event.dialog.add(hs, '', '', hArea);
                            directh = false;
                        } else {
                            event.dialog.add([hs, 'blank'], '', '', hArea);
                        }
                    }
                }
            }
            event.join_e = function() {
                var es = target.getDiscardableCards(player, 'e');
                var eArea = ui.create.div('.eArea', event.dialog),
                    eTitle = ui.create.div('.eTitle', event.dialog);
                eTitle.innerHTML = '装备牌';
                var equipList = ['武器牌', '防具牌', '+1马', '-1马', '宝物牌'];
                for (var x = 1; x < 6; x++) {
                    var eAreaCard;
                    eAreaCard = ui.create.div('.eAreaCard', eArea);
                    eAreaCard.innerHTML = equipList[x - 1];
                    eAreaCard.setAttribute('id', 'equip' + x);
                    if (event.position && event.position.includes('e')) {
                        if (target.getEquip(x) != null && es.length && es.includes(target.getEquip(x))) {
                            event.dialog.add([target.getEquip(x)], '', '', eAreaCard);
                        }
                        if (x == 3 && target.getEquip(6) != null && es.length && es.includes(target.getEquip(6))) {
                            event.dialog.add([target.getEquip(6)], '', '', eAreaCard);
                        }
                    }
                }
                if (es.length) {
                    directh = false;
                }
            }
            event.join_j = function() {
                var js = target.getDiscardableCards(player, 'j');
                var jArea = ui.create.div('.jArea', event.dialog),
                    jTitle = ui.create.div('.jTitle', event.dialog);
                jTitle.innerHTML = '延时锦囊牌';
                for (var x = 0; x < 3; x++) {
                    var jAreaCard = ui.create.div('.jAreaCard', jArea);
                    jAreaCard.setAttribute('id', 'judgeCard' + x);
                    jAreaCard.innerHTML = '单张牌' + '<br>' + '延时锦囊';
                    if (event.position && event.position.includes('j')) {
                        if (js.length && js[x]) event.dialog.add([js[x]], '', '', jAreaCard);
                    }
                }

                if (js.length) {
                    directh = false;
                }
            }
            let pst = '';
            if (event.position.indexOf('h') != -1) {
                event.join_h();
                pst += 'h';
            }
            if (event.position.indexOf('e') != -1) {
                event.join_e();
                pst += 'e';
            }
            if (event.position.indexOf('j') != -1) {
                event.join_j();
                pst += 'j';
            }
            
            if (pst != 'hej') event.dialog.dataset.pst = pst;
            
            if(event.position=='h'||event.position.indexOf('h')==-1) {
                event.newconfirm2 = true;
                if(event.position=='h') event.dialog.dataset.pst = 'hok';
                else if(event.position=='e'||event.position=='j') event.dialog.dataset.pst = 'ook';
                else event.dialog.dataset.pst = 'eok';
            }
            
            if (event.dialog.buttons.length == 0) {
                event.dialog.close();
                event.finish();
                return;
            }
            var cs = target.getCards(event.position);
            var select = get.select(event.selectButton);
            if (event.forced && select[0] >= cs.length) {
                event.result = {
                    bool: true,
                    buttons: event.dialog.buttons,
                    links: cs
                }
            } else if (event.forced && directh && !event.isOnline() && select[0] == select[1]) {
                event.result = {
                    bool: true,
                    buttons: event.dialog.buttons.randomGets(select[0]),
                    links: []
                }
                for (var i = 0; i < event.result.buttons.length; i++) {
                    event.result.links[i] = event.result.buttons[i].link;
                }
            } else {
                if (event.isMine()) {
                    if (false/*!event.forced*/) {
                        var str = '是否发动【' + get.translation(event.parent.name) + '】弃置' + get.translation(target);
                        var range = get.select(event.selectButton);
                        if (range[0] == range[1]) str += get.cnNumber(range[0]);
                        else if (range[1] == Infinity) str += '至少' + get.cnNumber(range[0]);
                        else str += get.cnNumber(range[0]) + '至' + get.cnNumber(range[1]);
                        str += '张牌';
                        game.me.chooseBool(str);
                    } else {
                        var range = get.select(event.selectButton);
                        if (range[0] == range[1] && range[0] == 1 && event.forced) event.auto = true;
                        else event.newconfirm1 = true;
                        event.dialog.open();
                        game.check();
                        game.pause();
                    }
                } else if (event.isOnline()) {
                    event.send();
                } else {
                    event.result = 'ai';
                }
            }
            "step 1"
            if (event.result == 'ai') {
                game.check();
                if ((ai.basic.chooseButton(event.ai) || forced) && (!event.filterOk || event.filterOk())) ui.click.ok();
                else ui.click.cancel();
            } else if (result && result.bool) {
                //event.forced = true;
                var range = get.select(event.selectButton);
                if (range[0] == range[1] && range[0] == 1 && event.forced) event.auto = true;
                else event.newconfirm1 = true;
                event.dialog.open();
                game.check();
                game.pause();
            } else if (result && result.bool == false) {
                event.finish();
                return;
            }
            "step 2"
            event.dialog.close();
            "step 3"
            event.resume();
            if (event.result.bool && event.result.links && !game.online) {
                if (event.logSkill) {
                    if (typeof event.logSkill == 'string') {
                        player.logSkill(event.logSkill);
                    } else if (Array.isArray(event.logSkill)) {
                        player.logSkill.apply(player, event.logSkill);
                    }
                }
                var cards = [];
                for (var i = 0; i < event.result.links.length; i++) {
                    cards.push(event.result.links[i]);
                }
                event.result.cards = event.result.links.slice(0);
                event.cards = cards;
                event.trigger("rewriteDiscardResult");
            }
            "step 4"
            if (event.boolline) {
                player.line(target, 'green');
            }
            if (!event.chooseonly) {
                var next = target.discard(event.cards);
                if (player != target) next.notBySelf = true;
                next.discarder = player;
                event.done = next;
                if (event.delay === false) {
                    next.set('delay', false);
                }
            }
        };
        //选卡框
        lib.element.content.choosePlayerCard = function() {
            "step 0"
            if (!event.dialog) {
                event.dialog = ui.create.dialog('hidden');
                event.dialog.classList.add('noupdate')
                event.dialog.id = 'shunshouDialog';
            } else if (!event.isMine()) {
                event.dialog.style.display = 'none';
            }

            var directh = !lib.config.unauto_choose;
            var shunshouTitle = ui.create.div('.shunshouTitle');
            let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g")
            var num = 1;
            while (true) {
                if (reg.test(get.translation(this.getParent(num)
                    .name))) {
                    /*shunshouTitle.innerHTML = game.heiheiARRAY() + get.translation(this.getParent(num)
                        .name) + '▾';*/
                    shunshouTitle.innerHTML = game.changeToGoldTitle(get.translation(this.getParent(num).name), {noshadow: true, margin: '-5px'}, 40);
                    num = 1;
                    break;
                } else num++;
                if (!this.getParent(num)) {
                    //shunshouTitle.innerHTML = game.heiheiARRAY() + '选牌▾';
                    shunshouTitle.innerHTML = game.changeToGoldTitle('选牌', {noshadow: true, margin: '-5px'}, 40);
                    break;
                }
                if (num > 10) break;
            }
            event.dialog.appendChild(shunshouTitle);
            var directh = (!lib.config.unauto_choose && !event.complexSelect);
            event.join_h = function() {
                var hs = target.getCards('h');
                var hArea = ui.create.div('.hArea', event.dialog);
                var hTitle = ui.create.div('.hTitle', event.dialog);
                hTitle.innerHTML = '手牌';
                if (event.position && event.position.includes('h')) {
                    if (hs.length) {
                        hs.randomSort();
                        if (event.visible || target.isUnderControl(true) || player.hasSkillTag('viewHandcard', null, target, true)) {
                            event.dialog.add(hs, '', '', hArea);
                            directh = false;
                        } else {
                            event.dialog.add([hs, 'blank'], '', '', hArea);
                        }
                    }
                }
            }
            event.join_e = function() {
                var es = target.getCards('e');
                var eArea = ui.create.div('.eArea', event.dialog),
                    eTitle = ui.create.div('.eTitle', event.dialog);
                eTitle.innerHTML = '装备牌';
                var equipList = ['武器牌', '防具牌', '+1马', '-1马', '宝物牌'];
                for (var x = 1; x < 6; x++) {
                    var eAreaCard;
                    eAreaCard = ui.create.div('.eAreaCard', eArea);
                    eAreaCard.innerHTML = equipList[x - 1];
                    eAreaCard.setAttribute('id', 'equip' + x);
                    if (event.position && event.position.includes('e')) {
                        if (target.getEquip(x) != null && es.length && es.includes(target.getEquip(x))) {
                            event.dialog.add([target.getEquip(x)], '', '', eAreaCard);
                        }
                        if (x == 3 && target.getEquip(6) != null && es.length && es.includes(target.getEquip(6))) {
                            event.dialog.add([target.getEquip(6)], '', '', eAreaCard);
                        }
                    }
                }
                if (es.length) {
                    directh = false;
                }
            }
            event.join_j = function() {
                var js = target.getCards('j');
                var jArea = ui.create.div('.jArea', event.dialog),
                    jTitle = ui.create.div('.jTitle', event.dialog);
                jTitle.innerHTML = '延时锦囊牌';
                for (var x = 0; x < 3; x++) {
                    var jAreaCard = ui.create.div('.jAreaCard', jArea);
                    jAreaCard.setAttribute('id', 'judgeCard' + x);
                    jAreaCard.innerHTML = '单张牌' + '<br>' + '延时锦囊';
                    if (event.position && event.position.includes('j')) {
                        if (js.length && js[x]) event.dialog.add([js[x]], '', '', jAreaCard);
                    }
                }

                if (js.length) {
                    directh = false;
                }
            }
            let pst = '';
            if (event.position.indexOf('h') != -1) {
                event.join_h();
                pst += 'h';
            }
            if (event.position.indexOf('e') != -1) {
                event.join_e();
                pst += 'e';
            }
            if (event.position.indexOf('j') != -1) {
                event.join_j();
                pst += 'j';
            }

            if (pst != 'hej') event.dialog.dataset.pst = pst;
            
            if(event.position=='h'||event.position.indexOf('h')==-1) {
                event.newconfirm2 = true;
                if(event.position=='h') event.dialog.dataset.pst = 'hok';
                else if(event.position=='e'||event.position=='j') event.dialog.dataset.pst = 'ook';
                else event.dialog.dataset.pst = 'eok';
            }
            
            if (event.dialog.buttons.length == 0) {
                event.dialog.close();
                event.finish();
                return;
            }
            var cs = target.getCards(event.position);
            var select = get.select(event.selectButton);
            if (event.forced && select[0] >= cs.length) {
                event.result = {
                    bool: true,
                    buttons: event.dialog.buttons,
                    links: cs
                }
            } else if (event.forced && directh && !event.isOnline() && select[0] == select[1]) {
                event.result = {
                    bool: true,
                    buttons: event.dialog.buttons.randomGets(select[0]),
                    links: []
                }
                for (var i = 0; i < event.result.buttons.length; i++) {
                    event.result.links[i] = event.result.buttons[i].link;
                }
            } else {
                if (event.isMine()) {
                    if (event.hsskill && !event.forced && _status.prehidden_skills.contains(event.hsskill)) {
                        ui.click.cancel();
                        return;
                    }
                    if (false/*!event.forced*/) {
                        var str = '是否发动【' + get.translation(event.parent.name) + '】';
                        game.me.chooseBool(str);
                    } else {
                        var range = get.select(event.selectButton);
                        if (range[0] == range[1] && range[0] == 1 && event.forced) event.auto = true;
                        else event.newconfirm1 = true;
                        event.dialog.open();
                        game.check();
                        game.pause();
                    }
                } else if (event.isOnline()) {
                    event.send();
                } else {
                    event.result = 'ai';
                }
            }
            "step 1"
            if (event.result == 'ai') {
                game.check();
                if ((ai.basic.chooseButton(event.ai) || forced) && (!event.filterOk || event.filterOk())) ui.click.ok();
                else ui.click.cancel();
            } else if (result && result.bool) {
                //event.forced = true;
                var range = get.select(event.selectButton);
                if (range[0] == range[1] && range[0] == 1 && event.forced) event.auto = true;
                else event.newconfirm1 = true;
                event.dialog.open();
                game.check();
                game.pause();
            } else if (result && result.bool == false) {
                event.finish();
                return;
            }
            "step 2"
            event.dialog.close();
            if (event.result.links) {
                event.result.cards = event.result.links.slice(0);
            }
            event.resume();
        };
        //使用卡牌
        //这里好像没改啥，就改了一个装备牌的语音，可以去掉，在使用装备牌时就有语音
   /*     lib.element.content.useCard = function(){
					"step 0"
					if(!card){
						console.log('err: no card',get.translation(event.player));
						event.finish();
						return;
					}
					if(!get.info(card,false).noForceDie) event.forceDie=true;
					if(cards.length){
						var owner=(get.owner(cards[0])||player);
						var next=owner.lose(cards,'visible',ui.ordering).set('type','use');
						var directDiscard=[];
						for(var i=0;i<cards.length;i++){
							if(!next.cards.contains(cards[i])){
								directDiscard.push(cards[i]);
							}
						}
						if(directDiscard.length) game.cardsGotoOrdering(directDiscard);
					}
					//player.using=cards;
					var cardaudio=true;
					if(event.skill){
						if(lib.skill[event.skill].audio){
							cardaudio=false;
						}
						if(lib.skill[event.skill].log!=false){
							player.logSkill(event.skill);
						}
						if(get.info(event.skill).popname){
							player.tryCardAnimate(card,event.card.name,'metal',true);
						}
					}
					else if(!event.nopopup){
						if(lib.translate[event.card.name+'_pop']){
							player.tryCardAnimate(card,lib.translate[event.card.name+'_pop'],'metal');
						}
						else{
							player.tryCardAnimate(card,event.card.name,'metal');
						}
					}	
					if(event.audio===false){
						cardaudio=false;
					}
					if(cardaudio){
						game.broadcastAll(function(player,card){
							if(lib.config.background_audio){
								if(get.type(card)=='equip'&&!lib.config.equip_audio) return;
								var sex=player.sex=='female'?'female':'male';
								var audioinfo=lib.card[card.name].audio;
								// if(audioinfo||true){
									if(card.name=='sha'&&(card.nature=='fire'||card.nature=='thunder'||card.nature=='ice'||card.nature=='stab')){
										game.playAudio('card',sex,card.name+'_'+card.nature);
									}
									else{
										if(typeof audioinfo=='string'){
											if(audioinfo.indexOf('ext:')==0) game.playAudio('..','extension',audioinfo.slice(4),card.name+'_'+sex);
											else game.playAudio('card',sex,audioinfo);
										}
										else{
									        if (get.type(card) == 'equip') game.playAudio('card', 'equip1');
										else	game.playAudio('card',sex,card.name);
										}
									}
								// }
								// else if(get.type(card)!='equip'){
								// 	game.playAudio('card/default');
								// }
							}
						},player,card);
					}
					if(event.animate!=false&&event.line!=false){
						if(card.name=='wuxie'&&event.getParent()._info_map){
							var evtmap=event.getParent()._info_map;
							if(evtmap._source) evtmap=evtmap._source;
							var lining=(evtmap.multitarget?evtmap.targets:evtmap.target)||event.player;
							if(Array.isArray(lining)&&event.getTrigger().name=='jiedao'){
								player.line(lining[0],'green');
							}
							else{
								player.line(lining,'green');
							}
						}
						else if(card.name=='youdishenru'&&event.getParent().source){
							var lining=event.getParent().sourcex||event.getParent().source2||event.getParent().source;
							if(lining==player&&event.getParent().sourcex2){
								lining=event.getParent().sourcex2;
							}
							if(Array.isArray(lining)&&event.getTrigger().name=='jiedao'){
								player.line(lining[0],'green');
							}
							else{
								player.line(lining,'green');
							}
						}
						else{
							var config={};
							if(card.nature=='fire'||
								(card.classList&&card.classList.contains('fire'))){
								config.color='fire';
							}
							else if(card.nature=='thunder'||
								(card.classList&&card.classList.contains('thunder'))){
								config.color='thunder';
							}
							if(event.addedTarget){
								player.line2(targets.concat(event.addedTargets),config);
							}
							else if(get.info(card,false).multitarget&&targets.length>1&&!get.info(card,false).multiline){
								player.line2(targets,config);
							}
							else{
								player.line(targets,config);
							}
						}
						if(event.throw!==false) player.$throw(cards);
						if(lib.config.sync_speed&&cards[0]&&cards[0].clone){
							var waitingForTransition=get.time();
							event.waitingForTransition=waitingForTransition;
							cards[0].clone.listenTransition(function(){
								if(_status.waitingForTransition==waitingForTransition&&_status.paused){
									game.resume();
								}
								delete event.waitingForTransition;
							});
						}
					}
					event.id=get.id();
					event.excluded=[];
					event.directHit=[];
					event.customArgs={default:{}};
					if(typeof event.baseDamage!='number') event.baseDamage=get.info(card,false).baseDamage||1;
					if(event.oncard){
						event.oncard(event.card,event.player);
					}
					player.actionHistory[player.actionHistory.length-1].useCard.push(event);
					game.getGlobalHistory().useCard.push(event);
					if(event.addCount!==false){
						if(player.stat[player.stat.length-1].card[card.name]==undefined){
							player.stat[player.stat.length-1].card[card.name]=1;
						}
						else{
							player.stat[player.stat.length-1].card[card.name]++;
						}
					}
					if(event.skill){
						if(player.stat[player.stat.length-1].skill[event.skill]==undefined){
							player.stat[player.stat.length-1].skill[event.skill]=1;
						}
						else{
							player.stat[player.stat.length-1].skill[event.skill]++;
						}
						var sourceSkill=get.info(event.skill).sourceSkill;
						if(sourceSkill){
							if(player.stat[player.stat.length-1].skill[sourceSkill]==undefined){
								player.stat[player.stat.length-1].skill[sourceSkill]=1;
							}
							else{
								player.stat[player.stat.length-1].skill[sourceSkill]++;
							}
						}
					}
					if(targets.length){
						var str=(targets.length==1&&targets[0]==player)?'#b自己':targets;
						if(cards.length&&!card.isCard){
							if(event.addedTarget){
								game.log(player,'对',str,'使用了',card,'（',cards,'，指向',event.addedTargets,'）');
							}
							else{
								game.log(player,'对',str,'使用了',card,'（',cards,'）');
							}
						}
						else{
							if(event.addedTarget){
								game.log(player,'对',str,'使用了',card,'（指向',event.addedTargets,'）');
							}
							else{
								game.log(player,'对',str,'使用了',card);
							}
						}
					}
					else{
						if(cards.length&&!card.isCard){
							if(event.addedTarget){
								game.log(player,'使用了',card,'（',cards,'，指向',event.addedTargets,'）');
							}
							else{
								game.log(player,'使用了',card,'（',cards,'）');
							}
						}
						else{
							if(event.addedTarget){
								game.log(player,'使用了',card,'（指向',event.addedTargets,'）');
							}
							else{
								game.log(player,'使用了',card);
							}
						}
					}
					if(card.name=='wuxie'){							game.logv(player,[card,cards],[event.getTrigger().card]);
						}
					else{
						game.logv(player,[card,cards],targets);
					}
					event.trigger('useCard1');
					"step 1"
					event.trigger('useCard2');
					"step 2"
					event.trigger('useCard');
					event._oncancel=function(){
						game.broadcastAll(function(id){
							if(ui.tempnowuxie&&ui.tempnowuxie._origin==id){
								ui.tempnowuxie.close();
								delete ui.tempnowuxie;
							}
						},event.id);
					};
					"step 3"
					event.sortTarget=function(animate,sort){
						var info=get.info(card,false);
						if(num==0&&targets.length>1){
							if(!info.multitarget){
								if(!event.fixedSeat&&!sort){
									targets.sortBySeat((_status.currentPhase||player));
								}
								if(animate)	for(var i=0;i<targets.length;i++){
									targets[i].animate('target');
								}
							}
							else if(animate){
								for(var i=0;i<targets.length;i++){
									targets[i].animate('target');
								}
							}
						}
					}
					event.sortTarget();
					event.getTriggerTarget=function(list1,list2){
						var listx=list1.slice(0).sortBySeat((_status.currentPhase||player));
						for(var i=0;i<listx.length;i++){
							if(get.numOf(list2,listx[i])<get.numOf(listx,listx[i])) return listx[i];
						}
						return null;
					}
					"step 4"
					if(event.all_excluded) return;
					if(!event.triggeredTargets1) event.triggeredTargets1=[];
					var target=event.getTriggerTarget(targets,event.triggeredTargets1);
					if(target){
						event.triggeredTargets1.push(target);
						var next=game.createEvent('useCardToPlayer',false);
						if(event.triggeredTargets1.length==1) next.isFirstTarget=true;
						next.setContent('emptyEvent');
						next.targets=targets;
						next.target=target;
						next.card=card;
						next.cards=cards;
						next.player=player;
						next.excluded=event.excluded;
						next.directHit=event.directHit;
						next.customArgs=event.customArgs;
						if(event.forceDie) next.forceDie=true;
						event.redo();
					}
					"step 5"
					if(event.all_excluded) return;
					if(!event.triggeredTargets2) event.triggeredTargets2=[];
					var target=event.getTriggerTarget(targets,event.triggeredTargets2);
					if(target){
						event.triggeredTargets2.push(target);
						var next=game.createEvent('useCardToTarget',false);
						if(event.triggeredTargets2.length==1) next.isFirstTarget=true;
						next.setContent('emptyEvent');
						next.targets=targets;
						next.target=target;
						next.card=card;
						next.cards=cards;
						next.player=player;
						next.excluded=event.excluded;
						next.directHit=event.directHit;
						next.customArgs=event.customArgs;
						if(event.forceDie) next.forceDie=true;
						event.redo();
					}
					"step 6"
					var info=get.info(card,false);
					if(!info.nodelay&&event.animate!=false){
						if(event.delayx!==false){
							if(event.waitingForTransition){
								_status.waitingForTransition=event.waitingForTransition;
								game.pause();
							}
							else{
								game.delayx();
							}
						}
					}
					"step 7"
					if(event.all_excluded) return;
					if(!event.triggeredTargets3) event.triggeredTargets3=[];
					var target=event.getTriggerTarget(targets,event.triggeredTargets3);
					if(target){
						event.triggeredTargets3.push(target);
						var next=game.createEvent('useCardToPlayered',false);
						if(event.triggeredTargets3.length==1) next.isFirstTarget=true;
						next.setContent('emptyEvent');
						next.targets=targets;
						next.target=target;
						next.card=card;
						next.cards=cards;
						next.player=player;
						next.excluded=event.excluded;
						next.directHit=event.directHit;
						next.customArgs=event.customArgs;
						if(event.forceDie) next.forceDie=true;
						event.redo();
					}
					"step 8"
					if(event.all_excluded) return;
					if(!event.triggeredTargets4) event.triggeredTargets4=[];
					var target=event.getTriggerTarget(targets,event.triggeredTargets4);
					if(target){
						event.triggeredTargets4.push(target);
						var next=game.createEvent('useCardToTargeted',false);
						if(event.triggeredTargets4.length==1) next.isFirstTarget=true;
						next.setContent('emptyEvent');
						next.targets=targets;
						next.target=target;
						next.card=card;
						next.cards=cards;
						next.player=player;
						next.excluded=event.excluded;
						next.directHit=event.directHit;
						next.customArgs=event.customArgs;
						if(event.forceDie) next.forceDie=true;
						if(targets.length==event.triggeredTargets4.length){
							event.sortTarget();
						}
						event.redo();
					}
					"step 9"
					var info=get.info(card,false);
					if(info.contentBefore){
						var next=game.createEvent(card.name+'ContentBefore');
						next.setContent(info.contentBefore);
						next.targets=targets;
						next.card=card;
						next.cards=cards;
						next.player=player;
						next.type='precard';
						if(event.forceDie) next.forceDie=true;
					}
					else if(info.reverseOrder&&get.is.versus()&&targets.length>1){
						var next=game.createEvent(card.name+'ContentBefore');
						next.setContent('reverseOrder');
						next.targets=targets;
						next.card=card;
						next.cards=cards;
						next.player=player;
						next.type='precard';
						if(event.forceDie) next.forceDie=true;
					}
					else if(info.singleCard&&info.filterAddedTarget&&event.addedTargets&&event.addedTargets.length<targets.length){
						var next=game.createEvent(card.name+'ContentBefore');
						next.setContent('addExtraTarget');
						next.target=target;
						next.targets=targets;
						next.card=card;
						next.cards=cards;
						next.player=player;
						next.type='precard';
						next.addedTarget=event.addedTarget;
						next.addedTargets=event.addedTargets;
						if(event.forceDie) next.forceDie=true;
					}
					"step 10"
					if(event.all_excluded) return;
					var info=get.info(card,false);
					if(num==0&&targets.length>1){
						event.sortTarget(true,true);
					}
					if(targets[num]&&targets[num].isDead()) return;
					if(targets[num]&&targets[num].isOut()) return;
					if(targets[num]&&targets[num].removed) return;
					if(targets[num]&&info.ignoreTarget&&info.ignoreTarget(card,player,targets[num])) return;
					if(targets.length==0&&!info.notarget) return;
					if(targets[num]&&event.excluded.contains(targets[num])){
					var next=game.createEvent('useCardToExcluded',false);
						next.setContent('emptyEvent');
						next.targets=targets;
						next.target=targets[num];
						next.num=num;
						next.card=card;
						next.cards=cards;
						next.player=player;
						return;
					};
					var next=game.createEvent(card.name);
					next.setContent(info.content);
					next.targets=targets;
					next.card=card;
					next.cards=cards;
					next.player=player;
					next.num=num;
					next.type='card';
					next.skill=event.skill;
					next.multitarget=info.multitarget;
					next.preResult=event.preResult;
					next.baseDamage=event.baseDamage;
					if(event.forceDie) next.forceDie=true;
					if(event.addedTargets){
						next.addedTargets=event.addedTargets;
						next.addedTarget=event.addedTargets[num];
						next._targets=event._targets;
					}
					if(info.targetDelay===false){
						event.targetDelay=false;
					}
					next.target=targets[num];
					for(var i in event.customArgs.default) next[i]=event.customArgs.default[i];
					if(next.target&&event.customArgs[next.target.playerid]){
						var customArgs=event.customArgs[next.target.playerid];
						for(var i in customArgs) next[i]=customArgs[i];
					}
					if(next.target&&event.directHit.contains(next.target)) next.directHit=true;
					if(next.target&&!info.multitarget){
						if(num==0&&targets.length>1){
							// var ttt=next.target;
							// setTimeout(function(){ttt.animate('target');},0.5*lib.config.duration);
						}
						else{
							next.target.animate('target');
						}
					}
					if(!info.nodelay&&num>0){
						if(event.targetDelay!==false){
							game.delayx(0.5);
						}
					}
					"step 11"
					if(event.all_excluded) return;
					if(!get.info(event.card,false).multitarget&&num<targets.length-1&&!event.cancelled){
						event.num++;
						event.goto(10);
					}
					"step 12"
					if(get.info(card,false).contentAfter){
						var next=game.createEvent(card.name+'ContentAfter');
						next.setContent(get.info(card,false).contentAfter);
						next.targets=targets;
						next.card=card;
						next.cards=cards;
						next.player=player;
						next.preResult=event.preResult;
						next.type='postcard';
						if(event.forceDie) next.forceDie=true;
					}
					"step 13"
					if(event.postAi){
						event.player.logAi(event.targets,event.card);
					}
					if(event._result){
						event.result=event._result;
					}
					//delete player.using;
					if(document.getElementsByClassName('thrown').length){
						if(event.delayx!==false&&get.info(event.card,false).finalDelay!==false) game.delayx();
					}
					else{
						event.finish();
					}
					"step 14"
					event._oncancel();
				};*/
        //位置切换
        //位置切换函数，直接让斗地主位置无缝切换
        game.swapSeat = function(player1, player2, prompt, behind, noanimate) {
            if (noanimate) {
                player1.style.transition = 'all 0s';
                player2.style.transition = 'all 0s';
                ui.refresh(player1);
                ui.refresh(player2);
            }
            if (behind) {
                var totalPopulation = game.players.length + game.dead.length + 1;
                for (var iwhile = 0; iwhile < totalPopulation; iwhile++) {
                    if (player1.next != player2) {
                        game.swapSeat(player1, player1.next, false, false);
                    } else {
                        break;
                    }
                }
                if (prompt != false) {
                    game.log(player1, '将座位移至', player2, '后');
                }
            } else {
                game.addVideo('swapSeat', null, [player1.dataset.position, player2.dataset.position]);

                var seat1 = player1.seatNum;
                var seat2 = player2.seatNum;
                player2.seatNum = seat1;
                player1.seatNum = seat2;
                //座次标记更新
                if(player1.node&&player1.node.seat) {
                    player1.node.seat.innerHTML=get.cnNumber(player1.seatNum, true);
                }
                if(player2.node&&player2.node.seat) {
                    player2.node.seat.innerHTML=get.cnNumber(player2.seatNum, true);
                }
                var temp1, pos, i, num;
                temp1 = player1.dataset.position;
                player1.dataset.position = player2.dataset.position;
                player2.dataset.position = temp1;
                game.arrangePlayers();
                if (!game.chess) {
                    if (player1.dataset.position == '0' || player2.dataset.position == '0') {
                        pos = parseInt(player1.dataset.position);
                        if (pos == 0) pos = parseInt(player2.dataset.position);
                        num = game.players.length + game.dead.length;
                        for (i = 0; i < game.players.length; i++) {
                            temp1 = parseInt(game.players[i].dataset.position) - pos;
                            if (temp1 < 0) temp1 += num;
                            game.players[i].dataset.position = temp1;
                        }
                        for (i = 0; i < game.dead.length; i++) {
                            temp1 = parseInt(game.dead[i].dataset.position) - pos;
                            if (temp1 < 0) temp1 += num;
                            game.dead[i].dataset.position = temp1;
                        }
                    }
                }
                if (prompt != false) {
                    game.log(player1, '和', player2, '交换了座位');
                }
            }
            if (noanimate) {
                setTimeout(function() {
                    player1.style.transition = '';
                    player2.style.transition = '';
                }, 200);
            }
            if (_status.event.parent && _status.event.parent.name == 'chooseCharacter' || _status.event.name == 'chooseCharacter') {
                ui.arena.dataset.mode = get.mode();
                ui.background.dataset.mode = get.mode();
                if (get.mode() == 'doudizhu') ui.arena.setAttribute("data-pldistance", get.distance(game.me, game.zhu, 'absolute'))
                if (get.mode() == 'versus') {
                    if (game.me.isFriendOf(game.me.next)) ui.arena.setAttribute('data-pldistance', '1');
                    else ui.arena.setAttribute('data-pldistance', '2');
                }
            }
            //meihua
        };
        //点击卡牌
        //这个是为了让装备牌入手后，点击指向为原卡牌
        ui.click.card = function(e) {
            delete this._waitingfordrag;
            if (_status.dragged) return;
            if (_status.clicked) return;
            if (ui.intro) return;
            _status.clicked = true;
            if (this.parentNode && (this.parentNode.classList.contains('judges') || this.parentNode.classList.contains('dui-marks') || this.parentNode.classList.contains('SSJudges'))) {
                if (!(e && e instanceof MouseEvent)) {
                    var rect = this.getBoundingClientRect();
                    e = {
                        clientX: (rect.left + 10) * game.documentZoom,
                        clientY: (rect.top + 10) * game.documentZoom,
                    };
                }
                ui.click.touchpop();
                var dialog = ui.click.intro.call(this, e);
                if (this.parentNode.classList.contains('judges') || this.parentNode.classList.contains('SSJudges')) {
                    dialog.style.height = '340px';
                    dialog.style.top = 'auto';
                    dialog.style.bottom = '140px';

                    if (this.bianhua || this.bianhua2) {
                        dialog.content.childNodes[2].remove();
                        dialog.content.childNodes[1].remove();
                    }
                    console.log(dialog.content)

                    dialog.setCaption(get.translation(this.getAttribute('keywards')))
                    if (this.bianhua || this.bianhua2) {
                        dialog.addText('(' + this.getAttribute('cardName') + ')');
                        dialog.addText(this.getAttribute('cardPrompt'));
                    }

                    dialog.add(this.cloneNode(true));
                }
                _status.clicked = false;
                return;
            }
            var custom = _status.event.custom;
            if (custom.replace.card) {
                custom.replace.card(this);
                return;
            }
            if (this.classList.contains('selectable') == false) return;
            if (this.classList.contains('selected')) {
                ui.selected.cards.remove(this.truecard || this);
                if (_status.multitarget || _status.event.complexSelect) {
                    game.uncheck();
                    game.check();
                } else {
                    if (this.truecard) {
                        this.truecard.classList.remove('selected');
                    } else {
                        this.classList.remove('selected');
                        this.updateTransform(true);
                        this.updateTransform();
                    }
                }
            } else {
                ui.selected.cards.add(this.truecard || this);
                if (this.truecard) {
                    this.truecard.classList.add('selected');
                } else {
                    this.classList.add('selected');
                    this.updateTransform();
                    this.updateTransform(true);
                }
            }
            if (game.chess && get.config('show_range') && !_status.event.skill && this.classList.contains('selected') && _status.event.isMine() && _status.event.name == 'chooseToUse') {
                var player = _status.event.player;
                var range = get.info(this)
                    .range;
                if (range) {
                    if (typeof range.attack === 'number') {
                        player.createRangeShadow(Math.min(8, player.getAttackRange(true) + range.attack - 1));
                    } else if (typeof range.global === 'number') {
                        player.createRangeShadow(Math.min(8, player.getGlobalFrom() + range.global));
                    }
                }
            }
            if (custom.add.card) {
                custom.add.card();
            }
            game.check();

            if (lib.config.popequip && get.is.phoneLayout() && arguments[0] != 'popequip' && ui.arena && ui.arena.classList.contains('selecting') && this.parentNode && this.parentNode.classList.contains('popequip')) {
                var rect = this.getBoundingClientRect();
                ui.click.touchpop();
                ui.click.intro.call(this.parentNode, {
                    clientX: rect.left + 18,
                    clientY: rect.top + 12
                });
            }
        };
        //点击按钮的函数，主要是为了在选将界面，如果是单将，不是国战的情况下，可以直接切换武将，而不用在选中后，再点一下才能重新选择，
        //改成了跟手杀一样的选中后出现确认标记，再次点击就是确认选择
        //保留一个原版设定
        /*ui.click.button = function() {
            if (_status.dragged) return;
            if (_status.clicked && _status.event.name != 'chooseCharacter' && _status.event.parent.name != 'chooseCharacter') return;
            if (_status.tempNoButton) return;
            if (_status.draggingtouchdialog) return;
            if (this.classList.contains('noclick')) return;
            if (_status.justdragged) return;
            _status.clicked = true;
            var custom = _status.event.custom;
            if (custom && custom.replace.button) {
                custom.replace.button(this);
                return;
            }
            if (!_status.event.isMine()) return;
            if (this.classList.contains('selectable') == false) return;
            if (this.classList.contains('selected')) {
                if (!get.config('double_character') && (_status.event.name == 'chooseCharacter' || _status.event.parent.name == 'chooseCharacter') && (get.mode() == 'doudizhu' || get.mode() == 'identity' || get.mode() == 'single')) {
                    ui.click.ok();
                    delete _status.cho;
                    return game.check();
                }
                ui.selected.buttons.remove(this);
                this.classList.remove('selected');
                if (_status.multitarget || _status.event.complexSelect) {
                    game.uncheck();
                    game.check();
                }
            } else {
                if (!get.config('double_character') && (_status.event.name == 'chooseCharacter' || _status.event.parent.name == 'chooseCharacter') && (get.mode() == 'doudizhu' || get.mode() == 'identity' || get.mode() == 'single')) {
                    if (_status.cho) {
                        ui.selected.buttons.remove(_status.cho);
                        _status.cho.classList.remove('selected');
                    }
                    _status.cho = this;
                    this.classList.add('selected');
                    ui.selected.buttons.add(this);
                    return
                } else this.classList.add('selected');
                ui.selected.buttons.add(this);
            }
            if (custom && custom.add && custom.add.button) {
                custom.add.button();
            }
            game.check();
            //meihua
        };*/
        //双击确认选将在此
        ui.click.button = function () {
            if (_status.dragged) return;
            if (_status.clicked && _status.event.name !== 'chooseCharacter' && _status.event.parent.name !== 'chooseCharacter') return;
            if (_status.tempNoButton) return;
            if (_status.draggingtouchdialog) return;
            if (this.classList.contains('noclick')) return;
            if (_status.justdragged) return;
            _status.clicked = true;
            var custom = _status.event.custom;
            if (custom && custom.replace.button) {
                custom.replace.button(this);
                return;
            }
            var slb=_status.event.selectButton;
            if(typeof slb=='function') {
                slb=_status.event.selectButton();
            }
            //最后那个修复对决模式的那些问题
            var toSingleSelect=(slb==null||slb==1||(slb.length==2&&slb[0]==1&&slb[1]==1));
            if (!_status.event.isMine()) return;
            //if (this.classList.contains('selectable') === false) return;
            if (this.classList.contains('selectable') === false) {
                //单选，选将界面，给你一次机会看你中不中用
                //给你一个机会，设置_status.event.isMoreButton为true可以单独避免这个选的
                if(toSingleSelect && !_status.event.isMoreButton && !get.config('double_character') && (_status.event.name === 'chooseCharacter' || _status.event.parent.name === 'chooseCharacter') && ui.selected.buttons.length==0) {
                    game.uncheck();
                    game.check();
                    if(this.classList.contains('selectable') === false) {
                        return;
                    }
                }else {
                    return;
                }
            }
            if (this.classList.contains('selected')) {
                if (toSingleSelect && !_status.event.isMoreButton && !get.config('double_character') && (_status.event.name === 'chooseCharacter' || _status.event.parent.name === 'chooseCharacter')/* && (get.mode() === 'doudizhu' || get.mode() === 'versus' || get.mode() === 'identity' || get.mode() === 'single')*/) {
                    ui.click.ok();
                    delete _status.cho;
                    return game.check();
                }
                ui.selected.buttons.remove(this);
                this.classList.remove('selected');
                if (_status.multitarget || _status.event.complexSelect) {
                    game.uncheck();
                    game.check();
                }
            } else {
                if (toSingleSelect && !_status.event.isMoreButton && !get.config('double_character') && (_status.event.name === 'chooseCharacter' || _status.event.parent.name === 'chooseCharacter')/* && (get.mode() === 'doudizhu' || get.mode() === 'versus' || get.mode() === 'identity' || get.mode() === 'single')*/) {
                    if (_status.cho) {
                        ui.selected.buttons.remove(_status.cho);
                        _status.cho.classList.remove('selected');
                    }
                    _status.cho = this;
                    this.classList.add('selected');
                    ui.selected.buttons.add(this);
                    return
                } else this.classList.add('selected');
                ui.selected.buttons.add(this);
            }
            if (custom && custom.add && custom.add.button) {
                custom.add.button();
            }
            game.check();
            //meihua
        };
        //这里是为了改无懈和无懈的提示文字，让他带颜色
        lib.element.content.chooseToUse = function() {
            "step 0"
            if (event.responded) return;
            if (game.modeSwapPlayer && !_status.auto && player.isUnderControl() && !lib.filter.wuxieSwap(event)) {
                game.modeSwapPlayer(player);
            }
            var skills = player.getSkills('invisible')
                .concat(lib.skill.global); //122
            game.expandSkills(skills);
            if (event.getParent()
                .state == undefined) event.getParent()
                .state = true;
            for (var i = 0; i < skills.length; i++) {
                var info = lib.skill[skills[i]];
                if (info && info.onChooseToUse) {
                    info.onChooseToUse(event);
                }
            }
            _status.noclearcountdown = true;
            if (event.type == 'phase') {
                if (event.isMine()) {
                    event.endButton = ui.create.control('结束回合', 'stayleft',

                    function() {
                        if (_status.event.skill) {
                            ui.click.cancel();
                        }
                        ui.click.cancel();
                    });
                    event.fakeforce = true;
                } else {
                    if (event.endButton) {
                        event.endButton.close();
                        delete event.endButton;
                    }
                    event.fakeforce = false;
                }
            }
            if (event.player.isUnderControl() && !_status.auto) {
                event.result = {
                    bool: false
                }
                return;
            } else if (event.isMine()) {
                if (event.hsskill && !event.forced && _status.prehidden_skills.contains(event.hsskill)) {
                    ui.click.cancel();
                    return;
                }
                if (event.type == 'wuxie') {
                    if (ui.tempnowuxie) {
                        ui.tempnowuxie.classList.add('primary3');
                    if (lib.config['extension_手杀ui_yangshi'] == 'on') {
                        ui.tempnowuxie.firstChild.innerHTML = "<img style='width: 140px;height: 36px' src=" + lib.assetURL + "extension/十周年UI/image/decoration/WX.png >";}
                        var triggerevent = event.getTrigger();
                        if (triggerevent && triggerevent.targets && triggerevent.num == triggerevent.targets.length - 1) {
                            ui.tempnowuxie.close();
                        }
                    }
                    if (lib.filter.wuxieSwap(event)) {
                        event.result = {
                            bool: false
                        }
                        return;
                    }
                }
                var ok = game.check();
                if (!ok || !lib.config.auto_confirm) {
                    game.pause();
                    if (lib.config.enable_vibrate && player._noVibrate) {
                        delete player._noVibrate;
                        game.vibrate();
                    }
                }
                if (!ok) {
                    var tipText;
                    var handTip = event.handTip = dui.showHandTip();
                    if (event.openskilldialog) {
                        tipText = event.openskilldialog;
                        event.openskilldialog = undefined;
                    } else if (event.prompt !== false) {
                           //进度条修改1
                        if (game.Jindutiaoplayer) game.Jindutiaoplayer();
                        //结束
                        if (typeof event.prompt == 'function') {
                            tipText = event.prompt(event);
                        } else if (typeof event.prompt == 'string') {

                            //这里调整wuxie文字
                           if (event.type == 'wuxie') {       
                           //无懈提示修改2
						var evtmap=event.getParent()._info_map;
					    var state=evtmap.state;
						if(evtmap._source) evtmap=evtmap._source;
						if(evtmap.isJudge){
							handTip.appendText(get.translation(evtmap.target), 'player');
			                if (evtmap.target == game.me) handTip.appendText('(你)', 'player');      
							handTip.appendText('的');
							handTip.appendText(get.translation(evtmap.card), 'card');
						    handTip.appendText('即将');
							handTip.appendText(state>0?'生':'失');
							handTip.appendText('效');
						}
						else{
							handTip.appendText(get.translation(evtmap.player), 'player');
							if (evtmap.player == game.me) handTip.appendText('(你)', 'player');      
							if(evtmap.multitarget){
								if(evtmap.targets.length){
									handTip.appendText('对');
									handTip.appendText(get.translation(evtmap.targets), 'player');
								}
							}
							else if(evtmap.target){
								handTip.appendText('对');
								handTip.appendText(evtmap.target==evtmap.player?'自己':get.translation(evtmap.target), 'player');
								if (evtmap.target == game.me&&evtmap.target!=evtmap.player) handTip.appendText('(你)', 'player');     
							}
							handTip.appendText('使用的');
							handTip.appendText(get.translation(evtmap.card), 'card');
							handTip.appendText('即将');
							handTip.appendText(state>0?'生':'失');
							handTip.appendText('效，');
						}
					      	handTip.appendText('是否无懈？');
				    		tipText = '';
				     //修改2结束
                            } else {
                                let num1, num2, num3, num4
                                if (event.prompt.indexOf('请使用') != -1 && event.prompt.indexOf('张') != -1) num1 = event.prompt.indexOf('张') + 1;
                                if (event.prompt.indexOf('响应') != -1) num2 = event.prompt.indexOf('响应')
                                if (num1 && num2) {
                                    //请使用一张
                                    let str1 = event.prompt.slice(0, num1);
                                    //闪
                                    let str2 = event.prompt.slice(num1, num2);
                                    //响应
                                    let str3 = event.prompt.slice(num2, num2 + 2);
                                    let str4 = event.prompt.slice(num2 + 2);
                                    handTip.appendText(str1);
                                    handTip.appendText(str2, 'card');
                                    handTip.appendText(str3);
                                    handTip.appendText(str4, 'card');
                                    tipText = '';

                                } else tipText = event.prompt;
                            }
                        } else {
                            if (typeof event.filterCard == 'object') {
                                var filter = event.filterCard;
                                tipText = '请使用' + get.cnNumber(event.selectCard[0]) + '张'
                                if (filter.name) {
                                    tipText += get.translation(filter.name);
                                } else {
                                    tipText += '牌';
                                }
                            } else {
                                tipText = '请选择1张卡牌';
                            }

                            if (event.type == 'phase' && event.isMine()) {
                                handTip.appendText('出牌阶段', 'phase');
                                tipText = '，' + tipText
                            }
                        }

                        if (event.prompt2) {
                            if (tipText == null) tipText = ''

                            handTip.setInfomation(event.prompt2);
                        }
                    }

                    if (tipText != undefined) {
                        event.dialog = handTip;
                        tipText = tipText.replace(/<\/?.+?\/?>/g, '');
								//去掉＃适应
								tipText=window.getDecPrompt(tipText);
                        handTip.appendText(tipText);
                        handTip.strokeText();
                        handTip.show();
                    } else {
                        handTip.close();
                    }
                }
            } else if (event.isOnline()) {
                event.send();
            } else {
                event.result = 'ai';
            }
            "step 1"
            if (event.result == 'ai') {
                var ok = game.check();
                if (ok) {
                    ui.click.ok();
                } else if (ai.basic.chooseCard(event.ai1)) {
                    if (ai.basic.chooseTarget(event.ai2) && (!event.filterOk || event.filterOk())) {
                        ui.click.ok();
                        event._aiexcludeclear = true;
                    } else {
                        if (!event.norestore) {
                            if (event.skill) {
                                var skill = event.skill;
                                ui.click.cancel();
                                event._aiexclude.add(skill);
                                var info = get.info(skill);
                                if (info.sourceSkill) {
                                    event._aiexclude.add(info.sourceSkill);
                                }
                            } else {
                                get.card(true)
                                    .aiexclude();
                                game.uncheck();
                            }
                            event.redo();
                            game.resume();
                        } else {
                            ui.click.cancel();
                        }
                    }
                } else if (event.skill && !event.norestore) {
                    var skill = event.skill;
                    ui.click.cancel();
                    event._aiexclude.add(skill);
                    var info = get.info(skill);
                    if (info.sourceSkill) {
                        event._aiexclude.add(info.sourceSkill);
                    }
                    event.redo();
                    game.resume();
                } else {
                    ui.click.cancel();
                }
                if (event.aidelay && event.result && event.result.bool) {
                    game.delayx();
                }
            }
            "step 2"
            if (event.endButton) {
                event.endButton.close();
                delete event.endButton;
            }
            event.resume();
            if (event.result) {
                if (event.result._sendskill) {
                    lib.skill[event.result._sendskill[0]] = event.result._sendskill[1];
                }
                if (event.result.skill) {
                    var info = get.info(event.result.skill);
                    if (info && info.chooseButton) {
                        if (event.dialog && typeof event.dialog == 'object') event.dialog.close();
                        var dialog = info.chooseButton.dialog(event, player);
                        if (info.chooseButton.chooseControl) {
                            var next = player.chooseControl(info.chooseButton.chooseControl(event, player));
                            next.dialog = dialog;
                            next.set('ai', info.chooseButton.check || function() {
                                return 0;
                            });
                            if (event.id) next._parent_id = event.id;
                            next.type = 'chooseToUse_button';
                        } else {
                            var next = player.chooseButton(dialog);
                            next.set('ai', info.chooseButton.check || function() {
                                return 1;
                            });
                            next.set('filterButton', info.chooseButton.filter || function() {
                                return true;
                            });
                            next.set('selectButton', info.chooseButton.select || 1);
                            if (event.id) next._parent_id = event.id;
                            next.type = 'chooseToUse_button';
                        }
                        event.buttoned = event.result.skill;
                    } else if (info && info.precontent && !game.online && !event.nouse) {
                        var next = game.createEvent('pre_' + event.result.skill);
                        next.setContent(info.precontent);
                        next.set('result', event.result);
                        next.set('player', player);
                    }
                }
            }
            "step 3"
            if (event.buttoned) {
                if (result.bool || result.control && result.control != 'cancel2') {
                    var info = get.info(event.buttoned)
                        .chooseButton;
                    lib.skill[event.buttoned + '_backup'] = info.backup(info.chooseControl ? result : result.links, player);
                    lib.skill[event.buttoned + '_backup'].sourceSkill = event.buttoned;
                    if (game.online) {
                        event._sendskill = [event.buttoned + '_backup', lib.skill[event.buttoned + '_backup']];
                    }
                    event.backup(event.buttoned + '_backup');
                    if (info.prompt) {
                        event.openskilldialog = info.prompt(info.chooseControl ? result : result.links, player);
                    }
                } else {
                    ui.control.animate('nozoom', 100);
                    event._aiexclude.add(event.buttoned);
                }
                event.goto(0);
                delete event.buttoned;
            }
            "step 4"
            if (event._aiexcludeclear) {
                delete event._aiexcludeclear;
                event._aiexclude.length = 0;
            }
            delete _status.noclearcountdown;
            if (event.skillDialog && get.objtype(event.skillDialog) == 'div') {
                event.skillDialog.close();
            }
            if (event.result && event.result.bool && !game.online && !event.nouse) {
                player.useResult(event.result, event);
            } else if (event._sendskill) {
                event.result._sendskill = event._sendskill;
            }
            if (event.dialog && typeof event.dialog == 'object') event.dialog.close();
            if (!_status.noclearcountdown) {
                game.stopCountChoose();
            }
            "step 5"
            if (event._result && event.result) {
                event.result.result = event._result;
            }
            //meihua
        };
        //专供给装备区拉到手牌的函数						
        Player.directgain2 = function(cards, broadcast, gaintag) {
            var player = this;
            var handcards = player.node.handcards1;
            var fragment = document.createDocumentFragment();
            var card;
            for (var i = 0; i < cards.length; i++) {
                card = cards[i];
                card.fix();
                if (card.parentNode == handcards) {
                    cards.splice(i--, 1);
                    continue;
                }

                if (gaintag) card.addGaintag(gaintag);

                fragment.insertBefore(card, fragment.firstChild);
            }

            if (player == game.me) {
                if (cards && cards.length) dui.layoutHandDraws2(cards.reverse()); //120.3
                dui.queueNextFrameTick(dui.layoutHand, dui);
            }

            var s = player.getCards('s');
            handcards.appendChild(fragment);

            if (!_status.video) {
                game.addVideo('directgain2', this, get.cardsInfo(cards));
                this.update();
            }

            if (broadcast !== false) game.broadcast(function(player, cards) {
                player.directgain2(cards);
            }, this, cards);
            return this;
        };
        //专供给装备区拉到手牌的刷新手牌函数
        dui.layoutHandDraws2 = function(cards) {
            var card;
            var cardt;
            var hand = dui.boundsCaches.hand;
            hand.check();
            for (var i = 0; i < cards.length; i++) {
                card = cards[i];
                card.tx = Math.round(hand._width + hand.cardScale * hand.cardWidth);
                card.ty = Math.round(-9);
                card.scaled = true;
                card.style.transition = 'all 0.25s';
                card.style.transform = 'translate(' + card.tx + 'px,' + card.ty + 'px) scale(' + hand.cardScale + ')';
            }
        };
        //修改手牌大小适配一下90%缩放
        //这个要修改是因为我在缩放90%的时候，为dialog设置了一个1.1的zoom，用来保持dialog里的大小
        //打出去的大小在updatediscard，这个会自动刷新区域卡牌大小
        dui.getHandCardSize = function(canUseDefault) {
            var style = decadeUI.sheet.getStyle('.media_defined > .card');
            if (style == null) style = decadeUI.sheet.getStyle('.hand-cards > .handcards > .card');
            if (style == null) return canUseDefault ? {
                width: 108,
                height: 150
            } : {
                width: 0,
                height: 0
            };
            var size = {
                width: 0.95 * parseFloat(style.width),
                height: 0.95 * parseFloat(style.height)
            };
            return size;
        };
        //弃牌提示
        lib.element.content.chooseTarget = function() {
            "step 0"
            if (event.isMine()) {
                if (event.hsskill && !event.forced && _status.prehidden_skills.contains(event.hsskill)) {
                    ui.click.cancel();
                    return;
                }
                game.check();
                game.pause();
                if (event.createDialog && !event.dialog && Array.isArray(event.createDialog)) {
                    event.dialog = ui.create.dialog.apply(this, event.createDialog);
                } else if (event.prompt !== false) {
                    //进度条，修改3
                        if (game.Jindutiaoplayer) game.Jindutiaoplayer();
                        //结束
                    var tipText;
                    var handTip = event.handTip = dui.showHandTip();
                    if (typeof event.prompt == 'function') {
                        tipText = event.prompt(event);
                    } else if (typeof event.prompt == 'string') {
                    
                        tipText = event.prompt;
                    } else {
                        tipText = '请选择';
                        var range = get.select(event.selectTarget);
                        if (range[0] == range[1]) tipText += get.cnNumber(range[0]);
                        else if (range[1] == Infinity) tipText += '至少' + get.cnNumber(range[0]);
                        else tipText += get.cnNumber(range[0]) + '至' + get.cnNumber(range[1]);

                        tipText += '个目标';
                    }

                    if (event.prompt2) {
                        if (tipText == null) tipText = ''

                        handTip.setInfomation(event.prompt2);
                    }

                    if (tipText != undefined) {
                        event.dialog = handTip;
                        tipText = tipText.replace(/<\/?.+?\/?>/g, '');
								//去掉＃适应
								tipText=window.getDecPrompt(tipText);
                        handTip.appendText(tipText);
                        if (event.promptbar != 'none') {
                            event.promptbar = handTip.appendText(' 0 - ' + get.select(event.selectTarget)[1]);
                            event.promptbar.sels = 0;
                            event.promptbar.reqs = get.numStr(get.select(event.selectTarget)[1], 'target');
                            event.custom.add.target = function() {
                                var handTip = _status.event.dialog;
                                var promptbar = _status.event.promptbar;
                                if (promptbar.sels == ui.selected.cards.length) return;

                                promptbar.sels = ui.selected.targets.length;
                                promptbar.textContent = ' ' + promptbar.sels + ' - ' + promptbar.reqs;
                                handTip.strokeText();
                            }
                        }
                        handTip.strokeText();
                        handTip.show();
                    } else {
                        handTip.close();
                    }
                } else if (get.itemtype(event.dialog) == 'dialog') {
                    event.dialog.open();
                }
            } else if (event.isOnline()) {
                event.send();
            } else {
                event.result = 'ai';
            }
            "step 1"
            if (event.result == 'ai') {
                game.check();
                if ((ai.basic.chooseTarget(event.ai) || forced) && (!event.filterOk || event.filterOk())) {
                    ui.click.ok();
                } else {
                    ui.click.cancel();
                }
            }
            if (event.result.bool && event.animate !== false) {
                for (var i = 0; i < event.result.targets.length; i++) {
                    event.result.targets[i].animate('target');
                }
            }
            if (event.dialog) event.dialog.close();
            event.resume();
            "step 2"
            if (event.onresult) {
                event.onresult(event.result);
            }
            if (event.result.bool && event.autodelay && !event.isMine()) {
                if (typeof event.autodelay == 'number') {
                    game.delayx(event.autodelay);
                } else {
                    game.delayx();
                }
            }
        };
        //弃牌提示
        lib.element.content.chooseToDiscard = function() {
            "step 0"
            if (event.autochoose()) {
                event.result = {
                    bool: true,
                    autochoose: true,
                    cards: player.getCards(event.position),
                    rawcards: player.getCards(event.position),
                }
                for (var i = 0; i < event.result.cards.length; i++) {
                    if (!lib.filter.cardDiscardable(event.result.cards[i], player, event)) {
                        event.result.cards.splice(i--, 1);
                    }
                }
            } else {
                if (game.modeSwapPlayer && !_status.auto && player.isUnderControl()) {
                    game.modeSwapPlayer(player);
                }
                event.rangecards = player.getCards(event.position);
                for (var i = 0; i < event.rangecards.length; i++) {
                    if (lib.filter.cardDiscardable(event.rangecards[i], player, event)) {
                        event.rangecards.splice(i--, 1);
                    } else {
                        event.rangecards[i].uncheck('chooseToDiscard');
                    }
                }
                var range = get.select(event.selectCard);
                game.check();
                //修复未知原因的“取消”按钮消失
                setTimeout(function(){
                     game.check();
                },10);
                //   console.log(event)
                //    console.log(event.parent)
                if (event.isMine()) {
                    if (event.hsskill && !event.forced && _status.prehidden_skills.contains(event.hsskill)) {
                        ui.click.cancel();
                        return;
                    }
                    game.pause();
                    if (range[1] > 1 && typeof event.selectCard != 'function') {
                        event.promptdiscard = ui.create.control('提示', function() {
                            //提示必须修改，在选中假牌时自动转为真牌
                            ai.basic.chooseCard(event.ai);
                            if (_status.event.custom.add.card) {
                                _status.event.custom.add.card();
                            }
                            for (var i = 0; i < ui.selected.cards.length; i++) {

                                ui.selected.cards[i].updateTransform(true);
                                let cardf = ui.selected.cards[i];
                                let cardt = cardf.truecard;
                                if (cardt) {
                                    ui.selected.cards.remove(cardf)
                                    ui.selected.cards[i] = cardt;
                                    ui.selected.cards[i].updateTransform(true);
                                }

                            }
                        });
                        event.promptdiscard.id = 'aitips';
                    }

                    if (Array.isArray(event.dialog)) {
                        event.dialog = ui.create.dialog.apply(this, event.dialog);
                        event.dialog.open();
                        event.dialog.classList.add('noselect');
                    } else if (event.prompt !== false) {
                        var tipText;
                        var handTip = event.handTip = dui.showHandTip();
                        if (typeof event.prompt == 'function') {
                            tipText = event.prompt(event);
                        } else if (typeof event.prompt == 'string') {
                            tipText = event.prompt;
                        } else {
                            tipText = '请弃置';
                            if (range[0] == range[1]) tipText += get.cnNumber(range[0]);
                            else if (range[1] == Infinity) tipText += '至少' + get.cnNumber(range[0]);
                            else tipText += get.cnNumber(range[0]) + '至' + get.cnNumber(range[1]);

                            tipText += '张';
                            if (event.position == 'h' || event.position == undefined) tipText += '手';
                            if (event.position == 'e') tipText += '装备';
                            tipText += '牌';
                        }

                        if (event.prompt2) {
                            if (tipText == null) tipText = ''

                            handTip.setInfomation(event.prompt2);
                        }

                        if (tipText != undefined) {
                            event.dialog = handTip;
                            tipText = tipText.replace(/<\/?.+?\/?>/g, '');
								//去掉＃适应
								tipText=window.getDecPrompt(tipText);
                            handTip.appendText(tipText);
                            var from = event.selectCard[0];
                            var to = event.selectCard[1];
                            if (!isFinite(to)) {
                                to = '∞';
                            }
                            if (Array.isArray(event.selectCard)) {
                                event.promptbar = handTip.appendText(' ' + from + ' - ' + to);
                                event.promptbar.sels = 0;
                                event.promptbar.reqs = get.numStr(event.selectCard[1], 'card');
                                event.custom.add.card = function() {
                                    var handTip = _status.event.dialog;
                                    var promptbar = _status.event.promptbar;
                                    if (promptbar.sels == ui.selected.cards.length) return;
                                    promptbar.sels = ui.selected.cards.length;
                                    promptbar.textContent = ' ' + promptbar.sels + ' - ' + promptbar.reqs;
                                    handTip.strokeText();
                                }
                            }

                            handTip.strokeText();
                            handTip.show();
                        } else {
                            handTip.close();
                        }
                    } else if (event.parent.name == 'huogong') {
                        //   console.log(event._cardChoice)

                        var tipText;
                        var handTip = event.handTip = dui.showHandTip();

                        tipText = '，选择1张同花色手牌';
                        handTip.appendText(get.translation(event.parent.target), 'player');
                        handTip.appendText('展示手牌');
                        handTip.appendText(get.translation(event.parent.card2), 'card');
                        if (tipText != undefined) {
                            event.dialog = handTip;
                            tipText = tipText.replace(/<\/?.+?\/?>/g, '');
								//去掉＃适应
								tipText=window.getDecPrompt(tipText);
                            handTip.appendText(tipText);

                            handTip.strokeText();
                            handTip.show();
                        } else {
                            handTip.close();
                        }
                    } else if (get.itemtype(event.dialog) == 'dialog') {
                        event.dialog.style.display = '';
                        event.dialog.open();

                    }
                } else if (event.isOnline()) {
                    event.send();
                } else {
                    event.result = 'ai';
                }
            }
            "step 1"

            if (event.result == 'ai') {
                game.check();
                if ((ai.basic.chooseCard(event.ai) || forced) && (!event.filterOk || event.filterOk())) {
                    ui.click.ok();
                } else if (event.skill) {
                    var skill = event.skill;
                    ui.click.cancel();
                    event._aiexclude.add(skill);
                    event.redo();
                    game.resume();
                } else {
                    ui.click.cancel();
                }
            }
            if (event.rangecards) {
                for (var i = 0; i < event.rangecards.length; i++) {
                    event.rangecards[i].recheck('chooseToDiscard');
                }
            }
            "step 2"
            event.resume();
            if (event.promptdiscard) {
                event.promptdiscard.close();
            }
            "step 3"
            if (event.result.bool && event.result.cards && event.result.cards.length && !game.online && event.autodelay && !event.isMine()) {
                if (typeof event.autodelay == 'number') {
                    game.delayx(event.autodelay);
                } else {
                    game.delayx();
                }
            }
            "step 4"
            if (event.logSkill && event.result.bool && !game.online) {
                if (typeof event.logSkill == 'string') {
                    player.logSkill(event.logSkill);
                } else if (Array.isArray(event.logSkill)) {
                    player.logSkill.apply(player, event.logSkill);
                }
            }
            if (!game.online) {
                if (typeof event.delay == 'boolean') {
                    event.done = player.discard(event.result.cards)
                        .set('delay', event.delay);
                } else {
                    event.done = player.discard(event.result.cards);
                }
                event.done.discarder = player;
            }
            if (event.dialog && event.dialog.close) event.dialog.close();
        };
        //五谷丰登
    lib.card.wugu.contentBefore = function () {
        "step 0"
        if (!targets.length) {
            event.finish();
            return;
        }
        if (get.is.versus()) {
            player.chooseControl('顺时针', '逆时针', function (event, player) {
                if (player.next.side == player.side) return '逆时针';
                return '顺时针';
            }).set('prompt', '选择' + get.translation(card) + '的结算方向');
        }
        else {
            event.goto(2);
        }
        "step 1"
        if (result && result.control == '顺时针') {
            var evt = event.getParent(), sorter = (_status.currentPhase || player);
            evt.fixedSeat = true;
            evt.targets.sortBySeat(sorter);
            evt.targets.reverse();
            if (evt.targets[evt.targets.length - 1] == sorter) {
                evt.targets.unshift(evt.targets.pop());
            }
        }
        "step 2"
        ui.clear();
        var num;
        if (event.targets) {
            num = event.targets.length;
        }
        else {
            num = game.countPlayer();
        }
        var cards = get.cards(num);
        game.cardsGotoOrdering(cards).relatedEvent = event.getParent();
        var dialog = ui.create.dialog(/*game.heiheiARRAY() + '五谷丰登▾'*/'<span style="white-space: nowrap; display: inline-block; padding-top: 7px;">'+game.changeToGoldTitle('五谷丰登', {noshadow: true, margin: '-5px'}, 40)+'</div>', cards, true);
        //var dialog = ui.create.dialog(/*game.heiheiARRAY() + '五谷丰登▾'*/game.changeToGoldTitle('五谷丰登', {noshadow: true, margin: '-5px'}, 40), cards, true);
        var jindutiao = ui.create.div('.jindutiao_wugu', dialog);
        var jindutiaox = ui.create.div('.jindutiaox_wugu', jindutiao);
        dialog.setAttribute('dialog-name', "wugu");
        dialog.buttons.forEach(function (button) {
            button.setAttribute("sourceCard", "wugu");
        });
        _status.dieClose.push(dialog);
        dialog.videoId = lib.status.videoId++;
        game.addVideo('cardDialog', null, ['五谷丰登', get.cardsInfo(cards), dialog.videoId]);
        event.getParent().preResult = dialog.videoId;
        game.broadcast(function (cards, id) {
            var dialog = ui.create.dialog('五谷丰登', cards, true);
            _status.dieClose.push(dialog);
            dialog.videoId = id;
        }, cards, dialog.videoId);
        game.log(event.card, '亮出了', cards);
    };
    lib.card.wugu.content = function () {
        "step 0"
        for (var i = 0; i < ui.dialogs.length; i++) {
            if (ui.dialogs[i].videoId == event.preResult) {
                event.dialog = ui.dialogs[i]; break;
            }
        }
        if (!event.dialog) {
            event.finish();
            return;
        }
        if (event.dialog.buttons.length > 1) {
            var next = target.chooseButton(true, function (button) {
                return get.value(button.link, _status.event.player);
            });
            next.set('dialog', event.preResult);
            next.set('closeDialog', false);
            next.set('dialogdisplay', true);
        }
        else {
            event.directButton = event.dialog.buttons[0];
        }
        "step 1"
        var dialog = event.dialog;
        var card;
        if (event.directButton) {
            card = event.directButton.link;
        }
        else {
            for (var i of dialog.buttons) {
                if (i.link == result.links[0]) {
                    card = i.link;
                    break;
                }
            }
            if (!card) card = event.dialog.buttons[0].link;
        }

        var button;
        for (var i = 0; i < dialog.buttons.length; i++) {
            if (dialog.buttons[i].link == card) {
                button = dialog.buttons[i];
                button.style.transition = 'transform 0.01s ease-in-out';
                button.style.transform = 'scale(0.8)';
                var xtx = ui.create.div('.xtx', button), xtxName = ui.create.div('.xtxName', xtx);
                xtx.style.backgroundImage = /*target.node.avatar.style.backgroundImage;*/
                //修改五谷丰登国战暗将拿牌
                xtx.style.backgroundImage = target.isUnseen(0) ? target.isUnseen(1) ? 'linear-gradient(0deg, #000000, #000000)' : target.node.avatar2.style.backgroundImage : target.node.avatar.style.backgroundImage;
                //修改结束    xtxName.innerHTML = get.translation(target.name);
                var hm = ui.create.div('.huise', button);
                dialog.buttons.remove(button);
                break;
            }
        }
        var capt = get.translation(target) + '选择了' + get.translation(button.link);
        if (card) {
            target.gain(card, 'visible');
            target.$gain2(card);
            game.broadcast(function (card, id, name, capt) {
                var dialog = get.idDialog(id);
                if (dialog) {
                    dialog.content.firstChild.innerHTML = capt;
                    for (var i = 0; i < dialog.buttons.length; i++) {
                        if (dialog.buttons[i].link == card) {
                            dialog.buttons[i].querySelector('.info').innerHTML = name;
                            dialog.buttons.splice(i--, 1);
                            break;
                        }
                    }
                }
            }, card, dialog.videoId, function (target) {
                if (target._tempTranslate) return target._tempTranslate;
                var name = target.name;
                if (lib.translate[name + '_ab']) return lib.translate[name + '_ab'];
                return get.translation(name);
            }(target), capt);
        }
        game.addVideo('dialogCapt', null, [dialog.videoId, dialog.content.firstChild.innerHTML]);
        game.log(target, '选择了', button.link);
        game.delay();
    };
        //修改折叠手牌的手牌区域大小
        dui.layout.updateHand = function() {
            // epicfx（实际上我在十周年UI的meihua.js）
            if (!game.me) return;

            var handNode = ui.handcards1;
            if (!handNode) return console.error('hand undefined');

            var card;
            var cards = [];
            var childs = handNode.childNodes;
            for (var i = 0; i < childs.length; i++) {
                card = childs[i];
                if (!card.classList.contains('removing')) {
                    cards.push(card);
                } else {
                    card.scaled = false;
                }
            }
            if (!cards.length) return;
            var bounds = dui.boundsCaches.hand;
            bounds.check();

            var pw = ui.skillControl.node.enable.childNodes.length > 2 ? 0.95 * bounds.width : 0.996 * bounds.width;
            var ph = bounds.height;
            var cw = bounds.cardWidth;
            var ch = bounds.cardHeight;
            var cs = bounds.cardScale;

            var csw = cw * cs;
            var x;
            var y = Math.round((ch * cs - ch) / 2);

            var xMargin = csw;
            // var xMargin = csw + 2;
            var xStart = (csw - cw) / 2;
            var totalW = cards.length * csw + (cards.length - 1) * 2;
            var limitW = pw;
            var expand;

            if (totalW > limitW) {
                xMargin = csw - Math.abs(limitW - csw * cards.length) / (cards.length - 1);
                if (/*lib.config.fold_card && */!lib.config["extension_史诗卡牌_cardFold"]) {
                    var proportion = lib.config.extension_史诗卡牌_cardFold_proportion || 10;
                    var min = proportion * 10.8 * cs;//默认是27，这里调成满吧
                    if (xMargin < min) {
                        expand = true;
                        xMargin = min;
                    }
                }
            } else {
                //-----------------分割线-----------------
                // 手牌折叠方式
                //let cardAlign = lib.config["extension_史诗卡牌_cardAlign"] == 'right' ? (limitW - totalW) / 1 : lib.config["extension_史诗卡牌_cardAlign"] == 'center' ? (limitW - totalW) / 2 : 0;
                //xStart += cardAlign;
                xStart += 0;
            }

            var card;
            for (var i = 0; i < cards.length; i++) {
                x = Math.round(xStart + i * xMargin);
                card = cards[i];
                card.tx = x;
                card.ty = y;
                card.cs = cs;
                card.scaled = true;
                card.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + cs + ')';
                card._transform = card.style.transform;
                if (card.linkedCards && card.linkedCards.length > 0) {
                    card.linkedCards = [];
                }
            }

            if (!lib.config["extension_史诗卡牌_cardFold"]) {
                if (expand) {
                    //-----------------分割线-----------------
                    // 手牌滑动，咸鱼大佬提供代码
                    ui.handcards1Container.classList.add("scrollh");
                    ui.handcards1Container.style.overflowX = 'scroll';
                    ui.handcards1Container.style.overflowY = 'hidden';
                    handNode.style.width = Math.round(cards.length * xMargin + (csw - xMargin)) + 'px';
                } else {
                    //-----------------分割线-----------------
                    // 手牌滑动，咸鱼大佬提供代码
                    ui.handcards1Container.classList.remove("scrollh");
                    ui.handcards1Container.style.overflowX = '';
                    ui.handcards1Container.style.overflowY = '';
                    handNode.style.width = '100%';
                }
            }
        }
        Player.judge = function() {
            var next = game.createEvent('judge');
            //meihua
            next.player = this;
            for (var i = 0; i < arguments.length; i++) {
                if (get.itemtype(arguments[i]) == 'card') {
                    next.card = arguments[i];
                } else if (typeof arguments[i] == 'string') {
                    next.skill = arguments[i];
                } else if (typeof arguments[i] == 'function') {
                    next.judge = arguments[i];
                } else if (typeof arguments[i] == 'boolean') {
                    next.clearArena = arguments[i];
                } else if (get.objtype(arguments[i]) == 'div') {
                    next.position = arguments[i];
                }
            }
            if (next.card && next.judge == undefined) {
                next.judge = get.judge(next.card);
                next.judge2 = get.judge2(next.card);
            }
            if (next.judge == undefined) next.judge = function() {
                return 0
            };
            if (next.position == undefined) next.position = ui.discardPile;
            if (next.card) next.cardname = next.card.viewAs || next.card.name;
            var str = '';
            if (next.card) str = next.card.viewAs || next.card.name;
            else if (next.skill) str = next.skill;
            else str = _status.event.name;
            next.judgestr2 = str;
            next.judgestr = get.translation(str);
            next.setContent('judge');
            return next;
        };
        lib.element.content.judge = function() {
            "step 0"
            //meihua
            var judgestr = get.translation(player) + '的' + event.judgestr + '判定';
            event.videoId = lib.status.videoId++;
            var cardj = event.directresult;
            if (!cardj) {
                if (player.getTopCards) cardj = player.getTopCards()[0];
                else cardj = get.cards()[0];
            }
            var nextj = game.cardsGotoOrdering(cardj);
            if (event.position != ui.discardPile) nextj.noOrdering = true;
            player.judging.unshift(cardj);
            game.addVideo('judge1', player, [get.cardInfo(player.judging[0]), judgestr, event.videoId]);
            if (!ui.judgeBox) ui.judgeBox = ui.create.dialognew('#judgeBox');
            ui.judgeBox.classList.add('judgeBox');
            ui.judgeBox.show();
            //防止框消失的堆叠
            ui.judgeBox.static = true;
            event.dialog = ui.judgeBox;
            if (!ui.judgeTitle) ui.judgeTitle = ui.create.div('.title', ui.judgeBox); //标题
            //ui.judgeTitle.innerHTML = game.heiheiARRAY() + event.judgestr + '▾'; //判定名
            ui.judgeTitle.innerHTML = game.changeToGoldTitle(event.judgestr, {noshadow: true, margin: '-5px'}, 40);
            //介绍是复用的
            if (!ui.judgeResultIntroduce) ui.judgeResultIntroduce = ui.create.div('.judgeResultIntroduce', ui.judgeBox);
            ui.judgeResultIntroduce.innerText = '判定结果';
            //判定需要的牌
            //需要判定的卡牌框，是复用的
            if (!ui.judgeCardArea) ui.judgeCardArea = ui.create.div('.judgeCardArea', ui.judgeBox);
            ui.judgeCardArea.setAttribute('id', 'judgeCardArea');
            if (!ui.introduce_card) ui.introduce_card = ui.create.div('.introduce_card', ui.judgeBox); //判定的介绍
            //变量要存储起来，方便后面调用
            //复用的用ui（框），私有的用event（牌）
            if (event.card) { //是否由延时锦囊引起判定
                //左边牌的框              
                if (!ui.judgeDelayCard) ui.judgeDelayCard = ui.create.div('.judgeDelayCard', ui.judgeBox); //延时锦囊
                ui.judgeResultIntroduce.dataset.type = 'card';
                ui.judgeCardArea.dataset.type = 'card';
                //小头像
                if (!ui.smallCharacter) ui.smallCharacter = ui.create.div('.smallCharacter', ui.judgeDelayCard);
                ui.smallCharacter.dataset.type = 'card';
                if (!ui.smallCharacterName) ui.smallCharacterName = ui.create.div('.smallCharacterName', ui.smallCharacter);
                ui.smallCharacterName.innerHTML = get.translation(player.name);
                ui.smallCharacter.style.backgroundImage = player.isUnseen(0) ? player.isUnseen(1) ? 'linear-gradient(0deg, #000000, #000000)' : player.node.avatar2.style.backgroundImage : player.node.avatar.style.backgroundImage;;
                if (event.card.bianhua || event.card.bianhua2 || (event.card.viewAs && event.card.viewAs != event.card.name)) { //是否为转化牌
                    event.zcard = ui.create.card()
                        .init([
                    event.card.suit, event.card.number, event.card.name, event.card.nature, ]);
                    event.zcard_true = ui.create.card()
                        .init([ //先根据bianhua和bianhua2赋予的属性判断，界大乔的需要使用card.viewAs
                    event.card.suitb || event.card.suit, event.card.numberb || event.card.number, event.card.nameb || event.card.viewAs || event.card.name, event.card.natureb || event.card.nature, ]);
                    ui.judgeDelayCard.appendChild(event.zcard);
                    setTimeout(function() {
                        decadeUI.animation.playSpine('kapaizhuanhuan', {
                            scale: 0.83,
                            speed: 0.4,
                            parent: event.zcard
                        })
                        setTimeout(function() {
                            ui.judgeDelayCard.removeChild(event.zcard);
                            ui.judgeDelayCard.appendChild(event.zcard_true);
                            event.zcard.noCard = ui.create.div('.zhuanbj', ui.judgeDelayCard);
                        }, 200);
                    }, 400);
                } else {
                    //这是卡牌本身
                    event.judgeDelayCard2 = event.card.cloneNode(true); //延时锦囊牌
                    event.judgeDelayCard2.card = event.card;
                    ui.judgeDelayCard.appendChild(event.judgeDelayCard2);
                }

                ui.introduce_card.dataset.type = 'card';
                let cardtname = event.card.nameb || event.card.viewAs || event.name;
                switch (cardtname) {
                    case 'lebu':
                        ui.introduce_card.innerHTML = "<span data-suit-type='red'>♦</span>" + "<span data-suit-type='black'>♠♣</span>" + '：' + get.translation(player.name) + '跳过出牌阶段' + '<br>' + "<span data-suit-type='red'>♥</span>" + '：乐不思蜀失效';
                        break;
                    case 'bingliang':
                        ui.introduce_card.innerHTML = "<span data-suit-type='red'>♥♦</span>" + "<span data-suit-type='black'>♠</span>" + '：' + get.translation(player.name) + '跳过摸牌阶段' + '<br>' + "<span data-suit-type='black'>♣</span>" + '：兵粮寸断失效';
                        break;
                    case 'caomu':
                        ui.introduce_card.innerHTML = "<span data-suit-type='red'>♥♦</span>" + "<span data-suit-type='black'>♠</span>" + '：' + get.translation(player.name) + '抑制摸牌效果' + '<br>' + "<span data-suit-type='black'>♣</span>" + '：草木皆兵失效';
                        break;
                    case 'shandian':
                        ui.introduce_card.innerHTML = "<span data-suit-type='black'>♠</span>" + '2~9闪电生效' + '<br>' + "其他：闪电失效";
                        break;
                    case 'fulei':
                        ui.introduce_card.innerHTML = "<span data-suit-type='black'>♠</span>" + '浮雷生效' + '<br>' + "其他：浮雷失效";
                        break;
                    case 'huoshan':
                        ui.introduce_card.innerHTML = "<span data-suit-type='red'>♥</span>" + '火山生效' + '<br>' + "其他：火山失效";
                        break;
                    case 'hongshui':
                        ui.introduce_card.innerHTML = "<span data-suit-type='black'>♣</span>" + '洪水生效' + '<br>' + "其他：洪水失效";
                        break;
                    case 'dczixi_card':
                        ui.introduce_card.innerHTML = "无任何判定效果。";
                        break;
                    default:
                        ui.introduce_card.innerHTML = "未知判定牌效果。";
                        break;

                }
            }

            if (!event.card) { //判定由技能引起，改变位置
                //头像和介绍是复用的
                ui.judgeResultIntroduce.dataset.type = 'skill';
                // ui.judgeResultIntroduce.style['left'] = '45%';
                if (!ui.smallCharacter) ui.smallCharacter = ui.create.div('.smallCharacter', ui.judgeBox);
                ui.judgeCardArea.dataset.type = 'skill';
                ui.smallCharacter.dataset.type = 'skill';
                ui.smallCharacter.style.backgroundImage = player.node.avatar.style.backgroundImage;
                /*     if (!ui.introduce_card) ui.introduce_card = ui.create.div('.introduce_card', ui.judgeBox);*/
                ui.introduce_card.dataset.type = 'skill';
                var skillIntroduce = event.getParent()
                    .name;
                if (lib.myprompt.skill[skillIntroduce]) ui.introduce_card.innerHTML = lib.myprompt.skill[skillIntroduce];
                else ui.introduce_card.innerHTML = '正在进行判定。';
            }

            /*      if (!event.card) {
                ui.judgeCardArea.style['right'] = '455px';
            }*/
            player.judging[0].setAttribute('id', 'judgeCard');
            //卡面，卡面是私有的，长判定需要移动
            event.judgeCard = player.judging[0].cloneNode(true);
            event.judgeCard.card = player.judging[0];
            event.judgeCard.style.setProperty('transform', 'translate(0px, 0px) scale(1)', '');
            //卡牌出现在框中
            game.delay(0.5);
            "step 1"
            ui.judgeCardArea.appendChild(event.judgeCard);
            game.log(player, '进行' + event.judgestr + '判定，亮出的判定牌为', player.judging[0]);
            //插入结算改判事件      
            if (!event.noJudgeTrigger) event.trigger('judge');
            game.delay(2);
            "step 2"
            //这里分一步用来延时显示处理区的牌
            //    console.log(event)
            game.broadcastAll(function(player, card, str, id, cardid) {
                var event = game.online ? {} : _status.event;
                if (game.chess) event.node = card.copy('thrown', 'center', ui.arena)
                    .animate('start');
                else {
                    var c = card.copy();
                    c.judge = true;
                    event.node = player.$throwordered2(c, true);
                    if (ui.thrown && ui.thrown.length > 6) {
                        ui.clear.delay = false;
                        ui.clear()
                    }
                }

                if (lib.cardOL) lib.cardOL[cardid] = event.node;
                event.node.cardid = cardid;
                // if (event.dialog) ui.dialogs.push(event.dialog);
                if (!window.decadeUI) {
                    ui.arena.classList.add('thrownhighlight');
                    event.node.classList.add('thrownhighlight');
                    //        event.dialog = ui.create.dialog(str);
                    //        event.dialog.classList.add('center');
                } else {
                    //        event.dialog = dui.showHandTip(str);
                    //      event.dialog.strokeText();
                    if (game.online) ui.dialogs.push(event.dialog);
                }

                //   event.dialog.videoId = id;
            }, player, player.judging[0], judgestr, event.videoId, get.id());
            "step 3"
            event.result = {
                card: player.judging[0],
                name: player.judging[0].name,
                number: get.number(player.judging[0]),
                suit: get.suit(player.judging[0]),
                color: get.color(player.judging[0]),
                id: player.judging[0].cardid, //用id判定是否改判，有瑕疵
                overjudge: false,
                node: event.node
            };
            if (event.fixedResult) {
                for (var i in event.fixedResult) {
                    event.result[i] = event.fixedResult[i];
                }
            }
            event.result.judge = event.judge(event.result);

            if (event.result.judge > 0) event.result.bool = true;
            else if (event.result.judge < 0) event.result.bool = false;
            else event.result.bool = null;
            player.judging.shift();
            game.checkMod(player, event.result, 'judge', player);
            if (event.judge2) {
                var judge2 = event.judge2(event.result);
                if (typeof judge2 == 'boolean') player.tryJudgeAnimate(judge2);
            };
            if (event.clearArena != false) {
                game.broadcastAll(ui.clear);
            }

            //     event.dialog.close();
            game.delay();
            "step 4"
            game.broadcast(function(id) {
                //      var dialog = get.idDialog(id);
                //      if (dialog) dialog.close();

                if (!window.decadeUI) ui.arena.classList.remove('thrownhighlight');
            }, event.videoId);

            game.addVideo('judge2', null, event.videoId);
            if (event.judgeCard.card.cardid != event.result.card.cardid) { //是否改判
                event.result.overjudge = true;
                let bottom = 0;

                function eraseCard() {
                    bottom += 10;
                    clipPathPoints = 'polygon(0 0,100% 0,100%' + (100 - bottom) + '%,0 ' + (100 - bottom) + '%)';
                    event.judgeCard.style.clipPath = clipPathPoints;
                    if (bottom >= 50) {
                        clearInterval(eraseCardAnimation);

                    }

                }
                let eraseCardAnimation = setInterval(eraseCard, 20);


                decadeUI.animation.playSpine({
                    name: 'gaipan',
                    speed: 2.4
                }, {
                    parent: event.judgeCard,
                    scale: 0.3
                });
                setTimeout(function() {
                    ui.judgeCardArea.removeChild(event.judgeCard);
                }, 500);

                event.judgeCard2 = event.result.card.cloneNode(true);
                event.judgeCard2.card = event.result.card;
                event.judgeCard2.style.setProperty('transform', 'translate(0px, 0px) scale(1)', '');
                event.judgeCard2.style.zIndex = 0;
                ui.judgeCardArea.appendChild(event.judgeCard2);
                game.delay(2)
            }
            "step 5"
            var judgeValue;
            var getEffect = event.judge2;
            if (getEffect) {
                judgeValue = getEffect(event.result);
            } else {
                judgeValue = decadeUI.get.judgeEffect(event.judgestr, event.result.judge);
            }
            if ((typeof judgeValue == 'boolean')) {
                judgeValue = judgeValue ? 1 : -1;
            } else {
                judgeValue = event.result.judge;
            }
            if (decadeUI.config.newDecadeStyle == 'on') {
            if (judgeValue >= 0) {
                decadeUI.animation.playSpine({
                    name: 'effect_panding_SZN',
                    action: 'play4',
                    speed: 2.5,
                }, {
                    parent: ui.judgeCardArea,
                    scale: 1.1
                });
            } else {
                decadeUI.animation.playSpine({
                    name: 'effect_panding_SZN',
                    action: 'play5',
                    speed: 2.5,
                }, {
                    parent: ui.judgeCardArea,
                    scale: 1.1
                });
            }
            } else {
            if (judgeValue >= 0) {
                decadeUI.animation.playSpine({
                    name: 'effect_panding_SS',
                    action: 'play4',
                    speed: 3,
                }, {
                    parent: ui.judgeCardArea,
                    scale: 1.1
                });
            } else {
                decadeUI.animation.playSpine({
                    name: 'effect_panding_SS',
                    action: 'play5',
                    speed: 3,
                }, {
                    parent: ui.judgeCardArea,
                    scale: 1.1
                });
            }
            }
            game.delay(1);
            "step 6"
            //---------测试
            event.triggerMessage('judgeresult');
            event.trigger('judgeFixing'); //120.2           
            "step 7"

            if (event.callback) {
                next = game.createEvent('judgeCallback', false);
                next.player = player;
                next.card = event.result.card;
                next.judgeResult = get.copy(event.result);
                next.setContent(event.callback);
                event.next1 = next;
                event.judgeCard3 = event.judgeCard2 || event.judgeCard;
                //卡牌移动  
                //神张飞
                if (event.result.bool == null) ui.judgeBoxdel();
            } else {
                if (!get.owner(event.result.card)) {
                    if (event.position != ui.discardPile) event.position.appendChild(event.result.card);
                }
                //  ui.judgeBoxdel();
                //  game.delay();
            }

            //    if (event._triggered == 2) game.delay(2);
            "step 8"
            //处理judgeend事件
            //处理判定结束事件
            //方统
            if (!event.judge2) ui.judgeBoxdel();
            console.log()
            if (event.parent.finished == true || !event.next1 || (event.next1 && (!event.result.bool || event.result.bool == null || event.next1._result.bool == false))) ui.judgeBoxdel();
            if (ui.judgeBox && event.next1) {
                if (event.result.bool) ui.judgeCardmove(event.judgeCard3);
                else game.delay(1.5)
            };
            "step 9"
            //张角
            if (event._triggered == 2) event.dialog.hide();
        };
        //移动判定牌
        ui.judgeCardmove = function(element) {
            if (!ui.judgeBox) return;
            if (!ui.judgeCardgets) ui.judgeCardgets = [];
            ui.judgeCardgets.push(element);
            element.style.zIndex = 100;
            //Helasisy修改：偏移5%防止看不见
            var widMax=window.innerWidth;
            for (let i = 0; i < ui.judgeCardgets.length; i++) {
                let st = i * 108 - 540;
                let xm = i * (Math.max(0, 108 - 324 / (ui.judgeCardgets.length)))
                let am = parseFloat(st - xm)
                ui.judgeCardgets[i].style.zIndex = i;
                // if(i>3&&i== ui.judgeCardgets.length-1)am=-250;
                ui.judgeCardgets[i].style.transform = 'translateX(' + (widMax*0.05+am) + 'px)';
            }
        }
        //清除判定框
        ui.judgeBoxdel = function() {
            if (ui.judgeBox) ui.judgeBox.remove();
            delete ui.judgeBox;
            delete ui.judgeTitle;
            delete ui.judgeDelayCard;
            delete ui.smallCharacter;
            delete ui.smallCharacterName;
            delete ui.introduce_card;
            delete ui.judgeResultIntroduce;
            delete ui.judgeCardArea;
            if (ui.judgeCardgets) for (let i = 0; i < ui.judgeCardgets.length; i++) {
                ui.judgeCardgets[i].remove();
                delete ui.judgeCardgets[i];
            }
            delete ui.judgeCardgets;
        }
        //添加牌到特殊区
        lib.element.content.addToExpansion = function() {
            "step 0"
            if (event.animate == 'give') event.visible = true;
            if (cards) {
                var map = {};
                for (var i of cards) {
                    var owner = get.owner(i, 'judge');
                    if (owner && (owner != player || get.position(i) != 'x')) {
                        var id = owner.playerid;
                        if (!map[id]) map[id] = [
                            [],
                            [],
                            []
                        ];
                        map[id][0].push(i);
                        var position = get.position(i);
                        if (position == 'h') map[id][1].push(i);
                        else map[id][2].push(i);
                    } else if (!event.updatePile && get.position(i) == 'c') event.updatePile = true;
                }
                event.losing_map = map;
                for (var i in map) {
                    var owner = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
                    var next = owner.lose(map[i][0], ui.special)
                        .set('type', 'loseToExpansion')
                        .set('forceDie', true)
                        .set('getlx', false);
                    if (event.visible == true) next.visible = true;
                    event.relatedLose = next;
                }
            } else {
                event.finish();
            }
            "step 1"
            for (var i = 0; i < cards.length; i++) {
                if (cards[i].destroyed) {
                    if (player.hasSkill(cards[i].destroyed)) {
                        delete cards[i].destroyed;
                    } else {
                        cards.splice(i--, 1);
                    }
                } else if (event.losing_map) {
                    for (var id in event.losing_map) {
                        if (event.losing_map[id][0].contains(cards[i])) {
                            var source = (_status.connectMode ? lib.playerOL : game.playerMap)[id];
                            var hs = source.getCards('hejsx');
                            if (hs.contains(cards[i])) {
                                cards.splice(i--, 1);
                            }
                        }
                    }
                }
            }
            if (cards.length == 0) {
                event.finish();
                return;
            }
            "step 2"
            var hs = player.getCards('x');
            for (var i = 0; i < cards.length; i++) {
                if (hs.contains(cards[i])) {
                    cards.splice(i--, 1);
                }
            }
            for (var num = 0; num < cards.length; num++) {
                if (_status.discarded) {
                    _status.discarded.remove(cards[num]);
                }
                for (var num2 = 0; num2 < cards[num].vanishtag.length; num2++) {
                    if (cards[num].vanishtag[num2][0] != '_') {
                        cards[num].vanishtag.splice(num2--, 1);
                    }
                }
            }
            if (event.animate == 'draw') {
                player.$draw(cards.length);
                game.log(player, '将', get.cnNumber(cards.length), '张牌置于了武将牌上');
                game.pause();
                setTimeout(function() {
                    player.$addToExpansion(cards, null, event.gaintag);
                    for (var i of event.gaintag) player.markSkill(i);
                    game.resume();
                }, get.delayx(500, 500));
            } else if (event.animate == 'gain') {
                player.$gain(cards, false);
                game.pause();
                setTimeout(function() {
                    player.$addToExpansion(cards, null, event.gaintag);
                    for (var i of event.gaintag) player.markSkill(i);
                    game.resume();
                }, get.delayx(700, 700));
            } else if (event.animate == 'gain2' || event.animate == 'draw2') {
                var gain2t = 300;
                if (player.$gain2(cards) && player == game.me) {
                    gain2t = 500;
                }
                game.pause();
                setTimeout(function() {
                    player.$addToExpansion(cards, null, event.gaintag);
                    for (var i of event.gaintag) player.markSkill(i);
                    game.resume();
                }, get.delayx(gain2t, gain2t));
            } else if (event.animate == 'give' || event.animate == 'giveAuto') {
                var evtmap = event.losing_map;
                if (event.animate == 'give') {
                    for (var i in evtmap) {
                        var source = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
                        //处理钟会
                        for (let k = 0; k < evtmap[i][0].length; k++) {
                            let cardd = evtmap[i][0][k].falsecard;
                            if (cardd) {
                                source.$give([cardd], player);
                                cardd.remove();
                                delete evtmap[i][0][k].falsecard;
                                dui.queueNextFrameTick(dui.layoutHand, dui);
                            }
                        }
                        source.$give(evtmap[i][0], player);
                        game.log(player, '将', get.cnNumber(evtmap[i][0]), '置于了武将牌上');
                    }
                } else {
                    for (var i in evtmap) {
                        var source = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
                        if (evtmap[i][1].length) {
                            source.$giveAuto(evtmap[i][1], player, false);
                            game.log(player, '将', get.cnNumber(evtmap[i][1].length), '张牌置于了武将牌上');
                        }
                        if (evtmap[i][2].length) {
                            source.$give(evtmap[i][2], player, false);
                            game.log(player, '将', get.cnNumber(evtmap[i][2]), '置于了武将牌上');
                        }
                    }
                }
                game.pause();
                setTimeout(function() {
                    player.$addToExpansion(cards, null, event.gaintag);
                    for (var i of event.gaintag) player.markSkill(i);
                    game.resume();
                }, get.delayx(500, 500));
            } else if (typeof event.animate == 'function') {
                var time = event.animate(event);
                game.pause();
                setTimeout(function() {
                    player.$addToExpansion(cards, null, event.gaintag);
                    for (var i of event.gaintag) player.markSkill(i);
                    game.resume();
                }, get.delayx(time, time));
            } else {
                player.$addToExpansion(cards, null, event.gaintag);
                for (var i of event.gaintag) player.markSkill(i);
                event.finish();
            }
            if (event.log) {
                game.log(player, '将', cards, '置于了武将牌上');
            }
            "step 4"
            game.delayx();
            if (event.updatePile) game.updateRoundNumber();
        };
        //魄袭重构
        lib.skill.drlt_poxi = {
            audio: 2,
            enable: 'phaseUse',
            usable: 1,
            filterTarget: function(card, player, target) {
                return target != player && target.countCards('h') > 0;
            },
            content: function() {
                'step 0'
                event.list1 = [];
                event.list2 = [];
                //	if(player.countCards('h')>0){
                //框
                event.dialog = ui.create.dialognew('#newdialog1');
                //标题
                var eventtitle = ui.create.div('.newTitle1', event.dialog);
                eventtitle.innerHTML = '魄袭<img src=' + lib.assetURL + 'extension/十周年UI/assets/image/arrow.png' + ' style=width:30px;height:25px;margin-bottom:5px;left:2px;/>';
                //目标名字
                var targetname = ui.create.div('.targetname1', event.dialog);
                targetname.innerText = get.translation(target.name);
                //我的名字
                var myname = ui.create.div('.myname1', event.dialog);
                myname.innerText = get.translation(player.name);
                //目标手牌区
                var targetarea = ui.create.div('.targetarea1', event.dialog);
                //我的手牌区
                var myarea = ui.create.div('.myarea1', event.dialog);
                if (target.countCards('h') > 0) event.dialog.add(target.getCards('h'), '', '', targetarea);
                if (player.countCards('h') > 0) {
                    event.dialog.add(player.getCards('h'), '', '', myarea);
                }
                var chooseButton = player.chooseButton(4, event.dialog)
                    .set('newconfirm1', true);

                chooseButton.set('target', target);
                chooseButton.set('ai', function(button) {
                    var player = _status.event.player;
                    var target = _status.event.target;
                    var ps = [];
                    var ts = [];
                    for (var i = 0; i < ui.selected.buttons.length; i++) {
                        var card = ui.selected.buttons[i].link;
                        if (target.getCards('h')
                            .contains(card)) ts.push(card);
                        else ps.push(card);
                    }
                    var card = button.link;
                    var owner = get.owner(card);
                    var val = get.value(card) || 1;
                    if (owner == target) {
                        if (ts.length > 1) return 0;
                        if (ts.length == 0 || player.hp > 3) return val;
                        return 2 * val;
                    }
                    return 7 - val;
                });
                chooseButton.set('filterButton', function(button) {
                    for (var i = 0; i < ui.selected.buttons.length; i++) {
                        if (get.suit(button.link) == get.suit(ui.selected.buttons[i].link)) return false;
                    };
                    return true;
                });
                'step 1'
                if (result.bool) {
                    var list = result.links;
                    for (var i = 0; i < list.length; i++) {
                        if (get.owner(list[i]) == player) {
                            event.list1.push(list[i]);
                        } else {
                            event.list2.push(list[i]);
                        };
                    };
                    if (event.list1.length && event.list2.length) {
                        game.loseAsync({
                            lose_list: [
                                [player, event.list1],
                                [target, event.list2]
                            ],
                            discarder: player,
                        })
                            .setContent('discardMultiple');
                    } else if (event.list2.length) {
                        target.discard(event.list2);
                    } else player.discard(event.list1);
                };
                'step 2'
                if (event.list1.length + event.list2.length == 4) {
                    if (event.list1.length == 0) player.loseMaxHp();
                    if (event.list1.length == 1) {
                        var evt = _status.event;
                        for (var i = 0; i < 10; i++) {
                            if (evt && evt.getParent) evt = evt.getParent();
                            if (evt.name == 'phaseUse') {
                                evt.skipped = true;
                                break;
                            };
                        };
                        player.addTempSkill('drlt_poxi1', {
                            player: 'phaseAfter'
                        });
                    };
                    if (event.list1.length == 3) player.recover();
                    if (event.list1.length == 4) player.draw(4);
                };
            },
            ai: {
                order: 13,
                result: {
                    target: function(target, player) {
                        return -1;
                    },
                },
            },
        };
        
        lib.skill.pro_drlt_poxi = {
            audio: 'drlt_poxi',
            enable: 'phaseUse',
            usable: 1,
            filterTarget: function(card, player, target) {
                return target != player && target.countCards('h') > 0;
            },
            content: function() {
                'step 0'
                event.list1 = [];
                event.list2 = [];
                //	if(player.countCards('h')>0){
                //框
                event.dialog = ui.create.dialognew('#newdialog1');
                //标题
                var eventtitle = ui.create.div('.newTitle1', event.dialog);
                eventtitle.innerHTML = '魄袭<img src=' + lib.assetURL + 'extension/十周年UI/assets/image/arrow.png' + ' style=width:30px;height:25px;margin-bottom:5px;left:2px;/>';
                //目标名字
                var targetname = ui.create.div('.targetname1', event.dialog);
                targetname.innerText = get.translation(target.name);
                //我的名字
                var myname = ui.create.div('.myname1', event.dialog);
                myname.innerText = get.translation(player.name);
                //目标手牌区
                var targetarea = ui.create.div('.targetarea1', event.dialog);
                //我的手牌区
                var myarea = ui.create.div('.myarea1', event.dialog);
                if (target.countCards('h') > 0) event.dialog.add(target.getCards('h'), '', '', targetarea);
                if (player.countCards('h') > 0) {
                    event.dialog.add(player.getCards('h'), '', '', myarea);
                }
                var chooseButton = player.chooseButton([1,4], event.dialog)
                    .set('newconfirm1', true);

                chooseButton.set('target', target);
                chooseButton.set('ai', function(button) {
                    var player = _status.event.player;
                    var target = _status.event.target;
                    var ps = [];
                    var ts = [];
                    for (var i = 0; i < ui.selected.buttons.length; i++) {
                        var card = ui.selected.buttons[i].link;
                        if (target.getCards('h')
                            .contains(card)) ts.push(card);
                        else ps.push(card);
                    }
                    var card = button.link;
                    var owner = get.owner(card);
                    var val = get.value(card) || 1;
                    if (owner == target) {
                        if (ts.length > 1) return 0;
                        if (ts.length == 0 || player.hp > 3) return val;
                        return 2 * val;
                    }
                    return 7 - val;
                });
                chooseButton.set('filterButton', function(button) {
                    for (var i = 0; i < ui.selected.buttons.length; i++) {
                        if (get.suit(button.link) == get.suit(ui.selected.buttons[i].link)) return false;
                    };
                    return true;
                });
                'step 1'
                if (result.bool) {
                    var list = result.links;
                    for (var i = 0; i < list.length; i++) {
                        if (get.owner(list[i]) == player) {
                            event.list1.push(list[i]);
                        } else {
                            event.list2.push(list[i]);
                        };
                    };
                    if (event.list1.length && event.list2.length) {
                        game.loseAsync({
                            lose_list: [
                                [player, event.list1],
                                [target, event.list2]
                            ],
                            discarder: player,
                        })
                            .setContent('discardMultiple');
                    } else if (event.list2.length) {
                        target.discard(event.list2);
                    } else player.discard(event.list1);
                }else event.finish();
                'step 2'
                var num=event.list1.length + event.list2.length;
                if (num <= 4) {
                    if (event.list1.length == 0) player.loseMaxHp();
                    if (event.list1.length == 1) player.loseHp();
                    if (event.list1.length == 3) player.recover();
                    if (event.list1.length == 4) player.changeHujia(3,null,true);
                }
                if(event.list2.length){
				    var card=get.cardPile(function(card){
                        return get.name(card)=='sha';
                    });
                    if(!card){
                        event.finish();
                        return;
                    }
                    event.card=card;
                    player.gain(card,'gain2');
				}
            },
            ai: {
                order: 13,
                result: {
                    target: function(target, player) {
                        return -1;
                    },
                },
            },
        };

    })
})