decadeModule.import(function(lib, game, ui, get, ai, _status) {
    //不需要标记数量的
    lib.nonumberMark = ['xinzhoufu2', 'zhaxiang2', 'jiaoying2', 'juguan_draw', 'new_zhixi_mark2', 'dshj_lingren_Debuff', 'zhente2', 'drlt_zhenggu_mark', 'yufeng2', 'xinzhaofu_effect', 'dulie', 'zlshoufu2', 'spshanxi', 'taomie', 'drlt_jieying_mark', 'bifa2', 'zongkui_mark', 'xingbu_effect1', 'xingbu_effect2', 'xingbu_effect3', 'xionghuo_disable', 'xionghuo_low', 'fyjianyux', 'biaozhao', 'rebiaozhao', 'residi2', 'shencai_loseHp', 'shencai_weapon', 'shencai_respond', 'shencai_distance', 'dcsilve_self', 'dcsilve_target'];
    //不需要额外按钮的
    lib.noskillControl = ['twjichou_give', 'lianhuan2', 'ollianhuan5', 'lianhuan5'];
    Array.prototype.transSuit = function(a, b, c) {
        if (this.contains(a)) {
            this.remove(a);
            this.push(c);
        }
        if (this.contains(b)) {
            this.remove(b);
            this.push(c);
        }
        return this;
    }
    //按花色排
    Array.prototype.sortBySuit = function() {
        var arr = this.slice();
        var arr1 = [];
        if (arr.contains('heart') || arr.contains('♥︎') || arr.contains('♥️')) arr1.push('♥️');
        if (arr.contains('diamond') || arr.contains('♦︎') || arr.contains('♦️')) arr1.push('♦️');
        if (arr.contains('spade') || arr.contains('♠︎') || arr.contains('♠️')) arr1.push('♠️');
        if (arr.contains('club') || arr.contains('♣︎') || arr.contains('♣️')) arr1.push('♣️');
       /*
        arr.transSuit('heart', '♥︎', '♥️');
        arr.transSuit('diamond', "♦︎", '♦️');
        arr.transSuit('spade', "♠︎", '♠️');
        arr.transSuit('club', "♣︎", '♣️');*/
        /*   if (arr.contains('basic')) arr.remove('basic');
        if (arr.contains('equip')) arr.remove('equip');
        if (arr.contains('trick')) arr.remove('trick');*/
        return arr1;
    };
    //按type排
    Array.prototype.sortByType = function(a) {
        var arr = this.slice();
        var arr1 = [];
        if (!a) {
            if (arr.contains('basic')) arr1.push('基');
            if (arr.contains('trick')) arr1.push('锦');
            if (arr.contains('equip')) arr1.push('装');
        } else {
            if (arr.contains('basic')) arr1.push('basic');
            if (arr.contains('trick')) arr1.push('trick');
            if (arr.contains('equip')) arr1.push('equip');
        }
        return arr1;
    };
    //正则替换组
    lib.suitsymbols = {
        "♦️": "<span style='color:red;-webkit-text-stroke: 0.2px white;text-shadow:0 0 3px white;'>♦️</span>",
        "♥️": "<span style='color:red;-webkit-text-stroke: 0.2px white;text-shadow:0 0 3px white;'>♥</span>️️",
        "♠️": "<span style='color:black;-webkit-text-stroke:0.2px white;text-shadow:0 0 3px white;'>♠️</span>️️",
        "♣️": "<span style='color:black;-webkit-text-stroke:0.2px white;text-shadow:0 0 3px white;'>♣️</span>️️",
        "♥︎": "<span style='color:red;-webkit-text-stroke: 0.2px white;text-shadow:0 0 3px white;'>♥️</span>",
        "♦︎": "<span style='color:red;-webkit-text-stroke: 0.2px white;text-shadow:0 0 3px white;'>♦️</span>",
        "♠︎": "<span style='color:black;-webkit-text-stroke: 0.2px white;text-shadow:0 0 3px white;'>♠️</span>",
        "♣︎": "<span style='color:black;-webkit-text-stroke: 0.2px white;text-shadow:0 0 3px white;'>♣️</span>"
    };
    //移动按钮的函数
    //lib.dragmydiv
    lib.dragmydiv = function(node, click) {
        var myDiv = node;
        var isDragging = false;
        var startX, startY, offsetX = 0,
            offsetY = 0;
        var isMobile = navigator.userAgent.match(/(Android|iPhone|SymbianOS|Windows Phone|iPad|iPod)/i);
        var dragevent;

        if (isMobile) {
            dragevent = ['touchstart', 'touchmove', 'touchend'];
        } else {
            dragevent = ['mousedown', 'mousemove', 'mouseup'];
        }

        myDiv.addEventListener(dragevent[0], function(event) {
            isDragging = true;
            if (isMobile) {
                startX = event.touches[0].clientX;
                startY = event.touches[0].clientY;
            } else {
                startX = event.clientX;
                startY = event.clientY;
            }

            var transformStyle = window.getComputedStyle(myDiv)
                .getPropertyValue('transform');
            if (transformStyle !== 'none') {
                var transformMatrix = transformStyle.match(/matrix.*\((.+)\)/)[1].split(', ');
                offsetX = parseInt(transformMatrix[4], 10);
                offsetY = parseInt(transformMatrix[5], 10);
            }
        });

        document.addEventListener(dragevent[1], function(event) {
            if (isDragging) {
                var x, y;
                if (isMobile) {
                    x = (offsetX + event.touches[0].clientX - startX) / game.documentZoom;
                    y = (offsetY + event.touches[0].clientY - startY) / game.documentZoom;
                } else {
                    x = (offsetX + event.clientX - startX) / game.documentZoom;
                    y = (offsetY + event.clientY - startY) / game.documentZoom;
                }

                myDiv.style.transform = 'translate(' + x + 'px,' + y + 'px)';
            }
        });

        document.addEventListener(dragevent[2], function() {
            if (isDragging) {
                event.stopPropagation();
            }
            isDragging = false;
        });

        myDiv.onclick = click;
    }
    lib.element.player.cooperationWith = function(target, type, reason) {
        var player = this;
        if (!player.storage.cooperation) player.storage.cooperation = [];
        var info = {
            player: this,
            target: target,
            type: type,
            reason: reason,
        };
        player.storage.cooperation.add(info);
        player.addTempSkill('cooperation', {
            player: 'dieAfter'
        });
        player.addSkill('cooperation_' + type, {
            player: 'dieAfter'
        });
        game.log(player, '向', target, '发起了“协力”，合作类型是', '#g' + get.translation('cooperation_' + type));
        if (!ui.cooperationSquare) {
            ui.cooperationSquare = ui.create.div('.renkubeijinggua', ui.arena);
            ui.cooperationSquare.innerHTML = '协力';
            //EpicFX.utils.movableButton(ui.cooperationSquare, game.cooperationclick);
            lib.dragmydiv(ui.cooperationSquare, game.cooperationclick);
        }
    };
    lib.element.player.removeCooperation = function(info) {
        var player = this;
        var storage = player.getStorage('cooperation');
        if (!storage.contains(info)) return;
        storage.remove(info);
        var unmark = true,
            reason = info.type;
        if (!storage.length) {
            player.removeSkill('cooperation');
        } else {
            for (var i of storage) {
                if (i.type == reason) {
                    unmark = false;
                    break;
                }
            }
        }
        if (unmark) player.removeSkill('cooperation_' + reason);
        else player.markSkill('cooperation_' + reason);
        if (ui.cooperationSquare) {
            var num = 0;
            for (var i = 0; i < game.players.length; i++) {
                if (game.players[i].getStorage('cooperation')
                    .length > 0) break;
                else num++;
            }
            game.log(num);
            if (num == game.players.length) {
                ui.cooperationSquare.remove();
                ui.cooperationSquare = false;
            }
        }
    };
    lib.skill.cooperation.filter = function(event, player) {
        game.log(event.player);
        if (event.name == 'die' && event.player.isAlive()) return false;
        var storage = player.getStorage('cooperation');
        for (var info of storage) {
            if (info.target == event.player) return true;
        }
        return false;
    };
    lib.skill._removeXieli = {
        charlotte: true,
        trigger: {
            global: ["dieAfter"],
        },
        forced: true,
        lastDo: true,
        filter: function(event, player) {
            return !game.hasPlayer(function(current) {
                return current.getStorage('cooperation')
                    .length > 0;
            });
        },
        content: function() {
            if (ui.cooperationSquare) {
                ui.cooperationSquare.remove()
                ui.cooperationSquare = false;
            }
        },
    };
    lib.element.player.checkCooperationStatus = function(target, reason) {
        var storage = this.getStorage('cooperation');
        for (var info of storage) {
            if (info.target == target && info.reason == reason) {
                var skill = lib.skill['cooperation_' + info.type];
                if (skill && skill.checkx && skill.checkx(info)) return true;
            }
        }
        if (ui.cooperationDialog) {

        }
        return false;
    };
    Object.assign(game, {
        removeDialog: function() {
            if (window.cooperationDialog) {
                window.cooperationDialog.remove();
                window.cooperationDialog = false;
            }
        },
        cooperationclick: function() {
            if (!window.cooperationDialog) {
                if (ui.dialog) ui.dialog.static = true;
                window.cooperationDialog = ui.create.dialognew('#cooperationDialog');
                //    if(ui.dialog)ui.dialog.static=true;
                window.cooperationDialog.static = true;
                window.cooperationDialog.show();
                let topic = ui.create.div('.shangtiao', window.cooperationDialog);
                let Separator = ui.create.div('.fengefu', window.cooperationDialog);
                let cooperationTitle, performer;
                const topContent = ['发起者', '一同执行者', '协力进度'];
                for (var i = 0; i < 3; i++) {
                    cooperationTitle = ui.create.div('.topContent', topic);
                    cooperationTitle.innerHTML = topContent[i];
                }
                let concreteXTX, xtxBox, storagesTogether = [];
                game.players.forEach(function(player) {
                    let storages = player.getStorage('cooperation');
                    storagesTogether = [...storagesTogether, ...storages];
                });
                for (var storage = 0; storage < storagesTogether.length; storage++) {
                    concreteXTX = ui.create.div('.xiatiao', window.cooperationDialog);
                    for (var x = 0; x < 3; x++) {
                        xtxBox = ui.create.div('.xtxBox' + x, concreteXTX);
                        performer = ui.create.div('.downContent', xtxBox);
                        if (x == 0) {
                            performer.style.backgroundImage = storagesTogether[storage].player.node.avatar.style.backgroundImage;
                            let performerName = ui.create.div('.performerNamePlayer', performer);
                            performerName.innerHTML = get.rawName(storagesTogether[storage].player.name);
                        } else if (x == 1) {
                            performer.style.backgroundImage = storagesTogether[storage].target.isUnseen(0) ? 'linear-gradient(0deg, #000000, #000000)' : storagesTogether[storage].target.node.avatar.style.backgroundImage;
                            let performerName = ui.create.div('.performerNameTarget', performer);
                            performerName.innerHTML = get.rawName(storagesTogether[storage].target.name);
                        } else if (x == 2) {
                            if (storagesTogether[storage].type == 'draw') {
                                var num = storagesTogether[storage].draw || 0;
                                performer.innerHTML = num > 7 ? '协力完成' : '还需摸' + (8 - num) + '张牌';
                            } else if (storagesTogether[storage].type == 'damage') {
                                var num = storagesTogether[storage].damage || 0;
                                performer.innerHTML = num > 3 ? '协力完成' : '还需造成' + (4 - num) + '点伤害';
                            } else if (storagesTogether[storage].type == 'discard') {
                                var suits = storagesTogether[storage].discard || [];
                                var suits2 = ['spade', 'heart', 'club', 'diamond'];
                                suits2 = suits2.filter(i => !suits.includes(i));
                                performer.innerHTML = suits2.length > 0 ? '还需弃置' + get.translation(suits2) + '花色的牌' : '协力完成';
                            } else if (storagesTogether[storage].type == 'use') {
                                var suits = storagesTogether[storage].used || [];
                                var suits2 = ['spade', 'heart', 'club', 'diamond'];
                                suits2 = suits2.filter(i => !suits.includes(i));
                                performer.innerHTML = suits2.length > 0 ? '还需使用' + get.translation(suits2) + '花色的牌' : '协力完成';
                            }

                        }
                    }
                }

            } else {
                game.removeDialog()
            }
        },
    });
    game.updateRenku = function() {
        game.broadcast(function(renku) {
            _status.renku = renku;
        }, _status.renku);
        if (!window.rkbg) {
            window.rkbg = ui.create.div('.renkubeijinggua', ui.arena);
        }
        if (_status.renku.length < 6) {
            window.rkbg.innerHTML = '仁' + _status.renku.length;
        } else {
            window.rkbg.innerHTML = '仁' + '<b><font color=\"#FF5500\">' + _status.renku.length;
        }
        if (_status.renku.length == 0) {
            window.rkbg.remove(window.rkbg);
            window.rkbg = null;
            return;
        }
        window.rkbg.$give = lib.element.player.$give;
        let renkuonclick = function() {
            if (!window.dialogguagua) {
                //      if(ui.dialog)ui.dialog.static=true;
                window.dialogguagua = ui.create.dialog('仁库', _status.renku);
                window.dialogguagua.static = true;
                window.rkbg.innerHTML = '❌';
            } else {
                window.dialogguagua.close();
                window.dialogguagua.remove();
                window.dialogguagua = null;
                if (_status.renku.length < 6) {
                    window.rkbg.innerHTML = '仁' + _status.renku.length;
                } else {
                    window.rkbg.innerHTML = '仁' + '<b><font color=\"#FF5500\">' + _status.renku.length;
                }
            }
        };
        //    EpicFX.utils.movableButton(window.rkbg,renkuonclick)
        lib.dragmydiv(window.rkbg, renkuonclick);
    };
    lib.element.player.addMark = function(i, num, log) {
        if (!num) num = 1;
        var isNum=(typeof num!='string');
        if (this.storage[i] == undefined) this.storage[i] = 0;
        this.storage[i] += num;
        if (log !== false) {
            var str = false;
            var info = get.info(i);
            if (info && info.intro && (info.intro.name || info.intro.name2)) str = info.intro.name2 || info.intro.name;
            else str = lib.translate[i];
            if (str&&isNum) {
                if (!lib.nonumberMark.contains(i)) game.log(this, '获得了', get.cnNumber(num), '个', '#g【' + str + '】');
                else game.log(this, '获得了', '#g【' + str + '】标记');
            }
        }
        this.syncStorage(i);
        this.markSkill(i);
        var next = game.createEvent('addMark');
        next.setContent('emptyEvent');
        next.player = this;
        next.num = num;
        next.markname = i;
    };
    lib.element.player.removeMark = function(i, num, log) {
        if (!num) num = 1;
        var isNum=(typeof this.countMark("i")=='number');
        if (!this.storage[i]) return;
        if (num > this.storage[i]) num = this.storage[i];
        this.storage[i] -= num;
        if (log !== false) {
            var str = false;
            var info = get.info(i);
            if (info && info.intro && (info.intro.name || info.intro.name2)) str = info.intro.name2 || info.intro.name;
            else str = lib.translate[i];
            if (str&&isNum) {
                if (!lib.nonumberMark.contains(i)) game.log(this, '移去了', get.cnNumber(num), '个', '#g【' + str + '】');
                else game.log(this, '移去了', '#g【' + str + '】标记');
            }
        }
        this.syncStorage(i);
        this[(this.storage[i] || (lib.skill[i] && lib.skill[i].mark)) ? 'markSkill' : 'unmarkSkill'](i);
        var next = game.createEvent('removeMark');
        next.setContent('emptyEvent');
        next.player = this;
        next.num = num;
        next.markname = i;
    };
    lib.element.player.countMark = function(i) {
        if (this.storage[i] == undefined) return 0;
        if (this.storage[i] !== undefined) return this.storage[i];
        if (Array.isArray(this.storage[i])) return this.storage[i].length;
        return 0;
    };
    lib.element.player.hasMark = function(i) {
        return this.countMark(i) > 0;
    };
    lib.element.player.mark = function(item, info, skill) {
        if (get.itemtype(item) == 'cards') {
            var marks = new Array(item.length);
            for (var i = 0; i < item.length; i++) marks.push(this.mark(item[i], info));
            return marks;
        }

        var mark;
        if (get.itemtype(item) == 'card') {
            mark = item.copy('mark');
            mark.suit = item.suit;
            mark.number = item.number;
            if (item.classList.contains('fullborder')) {
                mark.classList.add('fakejudge');
                mark.classList.add('fakemark');
                if (!mark.node.mark) mark.node.mark = mark.querySelector('.mark-text') || decadeUI.element.create('mark-text', mark);
                mark.node.mark.innerHTML = lib.translate[name.name + '_bg'] || get.translation(name.name)[0];
            }
            item = item.name;
        } else {
            mark = ui.create.div('.card.mark');
            var markText = lib.translate[item + '_bg'];
            if (!markText || markText[0] == '+' || markText[0] == '-') {
                markText = get.translation(item)
                //   .substr(0, 2);
                if (decadeUI.config.playerMarkStyle != 'decade') {
                    markText = markText[0];
                }
            }
            mark.text = decadeUI.element.create('mark-text', mark);
            if (lib.skill[item] && lib.skill[item].markimage) {
                markText = '　';
                mark.text.style.animation = 'none';
                mark.text.setBackgroundImage(lib.skill[item].markimage);
                mark.text.style['box-shadow'] = 'none';
                mark.text.style.backgroundPosition = 'center';
                mark.text.style.backgroundSize = 'contain';
                mark.text.style.backgroundRepeat = 'no-repeat';
                mark.text.classList.add('before-hidden');
            } else if (markText.length == 2) mark.text.classList.add('small-text');
            if (lib.skill[item] && lib.skill[item].zhuanhuanji) {
                mark.text.style.animation = 'none';
                mark.text.classList.add('before-hidden');
            }
            Object.keys(lib.suitsymbols)
                .forEach((symbol) => {
                if (markText.toString()
                    .indexOf(symbol) !== -1) {
                    markText = markText.replace(new RegExp(symbol, "g"), lib.suitsymbols[symbol]);
                }
            });
            mark.text.innerHTML = markText;
        }

        mark.name = item;
        mark.skill = skill || item;
        if (typeof info == 'object') {
            mark.info = info;
        } else if (typeof info == 'string') {
            mark.markidentifer = info;
        }

        mark.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.card);
        if (!lib.config.touchscreen) {
            if (lib.config.hover_all) {
                lib.setHover(mark, ui.click.hoverplayer);
            }
            if (lib.config.right_info) {
                mark.oncontextmenu = ui.click.rightplayer;
            }
        }

        this.node.marks.appendChild(mark);
        this.updateMarks();
        ui.updatem(this);
        return mark;
    };
    lib.element.player.updateMark = function(i, storage) {
        var blanks='<span style="visibility: hidden;font-size: 10px">#</span>';
        var blankn='<span style="visibility: hidden;font-size: 5px">#</span>';
        //var blanks=' ';
        if (!this.marks[i]) {
            if (lib.skill[i] && lib.skill[i].intro && (lib.skill[i].zhuanhuanji || this.storage[i] || lib.skill[i].intro.markcount)) {
                //释放对storage的限制保证转换技的storage为false时能显示阴阳                                       
                this.markSkill(i);
                if (!this.marks[i]) return this;
            } else {
                return this;
            }
        }
        var mark = this.marks[i];
        if (storage && this.storage[i]) this.syncStorage(i);
        if (lib.skill[i] && lib.skill[i].intro && !lib.skill[i].intro.nocount && (this.storage[i] || lib.skill[i].intro.markcount || lib.skill[i].zhuanhuanji)) {
            var num = 0;
            if (typeof lib.skill[i].intro.markcount == 'function') {
                num = lib.skill[i].intro.markcount(this.storage[i], this);
            } else if (lib.skill[i].intro.markcount == 'expansion') {
                num = this.countCards('x', (card) => card.hasGaintag(i));
            } else if (typeof this.storage[i + '_markcount'] == 'number') {
                num = this.storage[i + '_markcount'];
            } else if (i == 'ghujia') {
                num = this.hujia;
            } else if (typeof this.storage[i] == 'number') {
                if (lib.skill[i].zhuanhuanji) {
                    if (this.storage[i] % 2 == 0) num = '阴';
                    else num = '阳';
                } else num = this.storage[i];
            } else if (Array.isArray(this.storage[i])) {
                num = this.storage[i].length;
            } else if (typeof this.storage[i] == 'string') { //修改这里
                if (this.storage[i] == "red" || this.storage[i] == "black") {
                    num = (this.storage[i] == "red") ? "红" : "黑"
                } else num = get.translation(this.storage[i]);
            } else if (lib.skill[i].zhuanhuanji) {
                num = this.storage[i] ? '阴' : '阳';
            }
            var numbers='０１２３４５６７８９';
            //if (num && typeof num == 'number'&&num<10&&num>=0) num=numbers[num];
            if (num && !lib.nonumberMark.contains(i)) {
                if(lib.config['extension_十周年UI_shoushaNewNewMark']) num+=blankn;
                if (!mark.markcount) mark.markcount = decadeUI.element.create('mark-count', mark);
                //正则上色
                Object.keys(lib.suitsymbols)
                    .forEach((symbol) => {
                    if (num.toString()
                        .indexOf(symbol) !== -1) {
                        num = num.replace(new RegExp(symbol, "g"), lib.suitsymbols[symbol]);
                    }
                });            
                mark.markcount.innerHTML = num; //textconten不能显示颜色

            } else {
            if(!lib.config['extension_十周年UI_shoushaNewNewMark']) {
              if (mark.markcount) {
                mark.markcount.delete();
                delete mark.markcount;
              }
            }else {
              if (!mark.markcount) mark.markcount = decadeUI.element.create('mark-count', mark);
              mark.markcount.innerHTML=blanks;
            }
            }
        } else {
            if(!lib.config['extension_十周年UI_shoushaNewNewMark']) {
              if (mark.markcount) {
                mark.markcount.delete();
                delete mark.markcount;
              }
            }else {
              if (!mark.markcount) mark.markcount = decadeUI.element.create('mark-count', mark);
              mark.markcount.innerHTML=blanks;
            }
            if (lib.skill[i].mark == 'auto') {
                this.unmarkSkill(i);
            }
        }
        return this;
    };
    lib.skill.nzry_chenglve = {
        locked: false,
        zhuanhuanji: true,
        enable: "phaseUse",
        usable: 1,
        audio: 2,
        content: function() {
            'step 0'
            if (player.storage.nzry_chenglve == true) {
                player.draw(2);
                player.chooseToDiscard('h', true);
            } else {
                player.draw();
                player.chooseToDiscard('h', 2, true);
            }
            player.changeZhuanhuanji('nzry_chenglve');
            'step 1'
            if (result.bool) {
                player.storage.nzry_chenglve1 = [];
                for (var i = 0; i < result.cards.length; i++) {
                    player.storage.nzry_chenglve1.add(get.suit(result.cards[i], player));
                }
                var str = player.storage.nzry_chenglve1.sortBySuit()
                    .join('');
                player.storage.nzry_chenglve2 = '';
                player.addTempSkill('nzry_chenglve1');
                player.addMark('nzry_chenglve2', str);
            };
        },
        ai: {
            order: 2.7,
            result: {
                player: function(player) {
                    if (!player.storage.nzry_chenglve && player.countCards('h') < 3) return 0;
                    return 1;
                },
            },
        },
    };
    lib.skill.nzry_chenglve1 = {
        mod: {
            cardUsable: function(card, player) {
                var cards = player.storage.nzry_chenglve1;
                for (var i = 0; i < cards.length; i++) {
                    if (cards[i] == get.suit(card)) return Infinity;
                };
            },
            targetInRange: function(card, player) {
                var cards = player.storage.nzry_chenglve1;
                for (var i = 0; i < cards.length; i++) {
                    if (cards[i] == get.suit(card)) return true;
                };
            }
        },
        onremove: function(player) {
            player.removeMark('nzry_chenglve2');
        },
    };
    lib.translate.nzry_chenglve2 = '成略';
    lib.skill.nzry_chenglve2 = {
        intro: {
            content: function(storage, player, skill) {
                var str = player.storage.nzry_chenglve ? '出牌阶段限一次，你可以摸两张牌，然后弃置一张手牌。若如此做，直到本回合结束，你使用与弃置牌花色相同的牌无距离和次数限制' : '出牌阶段限一次，你可以摸一张牌，然后弃置两张手牌。若如此做，直到本回合结束，你使用与弃置牌花色相同的牌无距离和次数限制';
                if (player.storage.nzry_chenglve1) {
                    str += '<br><li>当前花色：';
                    str += get.translation(player.storage.nzry_chenglve1);
                }
                return str;
            },
        },
    };
    lib.skill.xionghuo = {
        marktext: "暴戾",
        intro: {
            name: '暴戾',
            content: "mark",
        },
        locked: true,
    };
    lib.skill.taoluan = {
        audio: 2,
        enable: ["chooseToUse", "chooseToRespond"],
        filter: function(event, player) {
            if (!player.countCards('hse') || player.hasSkill('taoluan3')) return false;
            for (var i of lib.inpile) {
                var type = get.type(i);
                if ((type == 'basic' || type == 'trick') && lib.filter.filterCard({
                    name: i
                }, player, event)) return true;
            }
            return false;
        },
        hiddenCard: function(player, name) {
            return (!player.getStorage('taoluan')
                .contains(name) && player.countCards('hes') > 0 && !player.hasSkill('taoluan3') && lib.inpile.contains(name));
        },
        init: function(player) {
            if (!player.storage.taoluan) player.storage.taoluan = [];
        },
        onremove: true,
        chooseButton: {
            dialog: function(event, player) {
                var list = [];
                for (var i = 0; i < lib.inpile.length; i++) {
                    var name = lib.inpile[i];
                    if (player.storage.taoluan && player.storage.taoluan.contains(name)) continue;
                    if (name == 'sha') {
                        if (event.filterCard({
                            name: name
                        }, player, event)) list.push(['基本', '', 'sha']);
                        for (var j of lib.inpile_nature) {
                            if (event.filterCard({
                                name: name,
                                nature: j
                            }, player, event)) list.push(['基本', '', 'sha', j]);
                        }
                    } else if (get.type(name) == 'trick' && event.filterCard({
                        name: name
                    }, player, event)) list.push(['锦囊', '', name]);
                    else if (get.type(name) == 'basic' && event.filterCard({
                        name: name
                    }, player, event)) list.push(['基本', '', name]);
                }
                if (list.length == 0) {
                    return ui.create.dialog('滔乱已无可用牌');
                }
                return ui.create.dialog('滔乱', [list, 'vcard']);
            },
            filter: function(button, player) {
                return _status.event.getParent()
                    .filterCard({
                    name: button.link[2]
                }, player, _status.event.getParent());
            },
            check: function(button) {
                var player = _status.event.player;
                if (player.countCards('hs', button.link[2]) > 0) return 0;
                if (button.link[2] == 'wugu') return 0;
                var effect = player.getUseValue(button.link[2]);
                if (effect > 0) return effect;
                return 0;
            },
            backup: function(links, player) {
                return {
                    filterCard: true,
                    audio: 'taoluan',
                    selectCard: 1,
                    popname: true,
                    check: function(card) {
                        return 6 - get.value(card);
                    },
                    position: 'hes',
                    viewAs: {
                        name: links[0][2],
                        nature: links[0][3]
                    },
                    onuse: function(result, player) {
                        player.storage.taoluan.add(result.card.name);
                    },
                }
            },
            prompt: function(links, player) {
                return '将一张牌当做' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '使用';
            },
        },
        ai: {
            skillTagFilter: function(player) {
                if (!player.countCards('hes') || player.hasSkill('taoluan3')) return false;
                if (!player.storage.taoluan.contains('tao')) {} else if (player.isDying() && !player.storage.taoluan.contains('jiu')) {} else return false;
            },
            order: 4,
            result: {
                player: function(player) {
                    var allshown = true,
                        players = game.filterPlayer();
                    for (var i = 0; i < players.length; i++) {
                        if (players[i].ai.shown == 0) {
                            allshown = false;
                        }
                        if (players[i] != player && players[i].countCards('h') && get.attitude(player, players[i]) > 0) {
                            return 1;
                        }
                    }
                    if (allshown) return 1;
                    return 0;
                },
            },
            threaten: 1.9,
        },
        group: ["taoluan2"],
    };
    lib.skill.taoluan3 = {
        init: function(player) {
            player.shixiaoSkill("taoluan");
        },
        onremove: function(player) {
            player.unshixiaoSkill("taoluan");
        },
    };
    lib.skill.twtuidao = {
        audio: 2,
        trigger: {
            player: 'phaseZhunbeiBegin'
        },
        filter: function(event, player) {
            var targets = player.getStorage('twsuizheng');
            if (!targets.length) return false;
            return targets.some(target => target.hp <= 2 || !target.isIn());
        },
        check: function(event, player) {
            var targets = player.getStorage('twsuizheng');
            var val = 0;
            for (var target of targets) {
                if (target.hp <= 2 && target.isIn()) val -= get.attitude(player, target);
                else if (!target.isIn()) val += 6;
            }
            return val > 0;
        },
        limited: true,
        skillAnimation: true,
        animationColor: 'thunder',
        content: function() {
            'step 0'
            player.awakenSkill('twtuidao');
            var list1 = ['equip3', 'equip4'].map(i => get.translation(i)),
                list2 = ['basic', 'trick', 'equip'].map(i => get.translation(i));
            var targets = player.getStorage('twsuizheng'),
                str = get.translation(targets);
            if (targets.length) str = '与' + str;
            player.chooseButton(2, true, [
                '颓盗：废除你' + str + '的一个坐骑栏废除并选择一个类别',
                '坐骑栏', [list1, 'tdnodes'],
                '类别', [list2, 'tdnodes'], ])
                .set('filterButton', function(button) {
                var list = _status.event.list,
                    link = button.link;
                if (ui.selected.buttons.length) {
                    if (list.contains(ui.selected.buttons[0].link) && list.contains(link)) return false;
                    if (!list.contains(ui.selected.buttons[0].link) && !list.contains(link)) return false;
                }
                return true;
            })
                .set('ai', function(button) {
                var player = _status.event.player;
                var list = _status.event.list,
                    link = button.link;
                if (list.contains(link)) {
                    if (player.isDisabled(4)) return '攻击马';
                    if (player.isDisabled(3)) return '防御马';
                    return '攻击马';
                }
                if (!list.contains(link)) {
                    var player = _status.event.player;
                    var targets = player.getStorage('twsuizheng');
                    for (var target of targets) {
                        if (target.isIn()) {
                            var listx = [0, 0, 0],
                                list2 = ['basic', 'trick', 'equip'].map(i => get.translation(i));
                            for (var i of target.getCards('he')) listx[list2.indexOf(get.translation(get.type2(i)))]++;
                            return list2[listx.indexOf(Math.max.apply(Math, listx))];
                        }
                    }
                    return 1 + Math.random();
                }
            })
                .set('list', list1);
            'step 1'
            if (result.links[0].indexOf('马') == -1) result.links.reverse();
            var subtype = result.links[0] == '防御马' ? 'equip3' : 'equip4',
                type = {基本: 'basic',
                    锦囊: 'trick',
                    装备: 'equip'
                }[result.links[1]];
            player.disableEquip(subtype);
            var targets = player.getStorage('twsuizheng')
            for (var target of targets) {
                if (target && target.isIn()) {
                    target.disableEquip(subtype);
                    var cards = target.getCards('he', card => get.type2(card) == type);
                    player.gain(cards, target, 'give');
                    event.gainners = cards;
                } else {
                    var cards = [];
                    for (var i = 1; i <= 2; i++) {
                        var card = get.cardPile2(function(card) {
                            return !cards.contains(card) && get.type2(card) == type;
                        });
                        if (card) cards.push(card);
                        else break;
                    }
                    player.gain(cards, 'gain2');
                    event.gainners = cards;
                }
            }
            'step 2'
            player.chooseTarget('请重新选择【随征】目标', true, function(card, player, target) {
                return !player.getStorage('twsuizheng')
                    .contains(target);
            })
                .set('ai', function(target) {
                var player = _status.event.player;
                return Math.max(1 + get.attitude(player, target) * get.threaten(target), Math.random());
            });
            'step 3'
            if (result.bool) {
                var target = result.targets[0];
                player.line(target);
                game.log(player, '选择了', target, '作为', '“随征”角色');
                delete player.storage.twsuizheng
                player.markAuto('twsuizheng', [target]);
                player.storage.twsuizheng_mark = '';
                player.addMark('twsuizheng_mark', get.translation(target));
            }
        },
        ai: {
            combo: 'twsuizheng'
        },
    }
    lib.skill.mbaosi = {
        audio: 2,
        trigger: {
            source: 'damageSource'
        },
        forced: true,
        filter: function(event, player) {
            return player.inRange(event.player) && player.isPhaseUsing() && event.player.isIn() && !player.getStorage('mbaosi_inf')
                .contains(event.player);
        },
        logTarget: 'player',
        content: function() {
            player.addTempSkill('mbaosi_inf', 'phaseUseAfter');
            trigger.player.addSkill('mbaosi_mark');
            player.markAuto('mbaosi_inf', [trigger.player]);
        },
        subSkill: {
            inf: {
                charlotte: true,
                onremove: true,
                forced: true,
                //intro:{content:'对$使用牌无次数限制'},
                mod: {
                    cardUsableTarget: function(card, player, target) {
                        if (player.getStorage('mbaosi_inf')
                            .contains(target)) return true;
                    },
                },
            },
            mark: {
                group: 'mbaosi_clean',
                mark: true,
                onremove: true,
                intro: {},
            },
            clean: {
                silent: true,
                forced: true,
                lastDo: true,
                trigger: {
                    global: 'phaseUseEnd'
                },
                content: function() {
                    if (player.hasSkill('mbaosi_mark')) player.removeSkill('mbaosi_mark');
                },
            },
        }
    }
    lib.skill.yizan_use = {
        audio: 'yizan_respond_shan',
        intro: {
            content: "已发动过#次",
        },
        enable: ["chooseToUse", "chooseToRespond"],
        hiddenCard: function(player, name) {
            if (get.type(name) != 'basic') return false;
            if (!player.storage.yizan && player.countCards('hes') < 2) return false;
            return player.hasCard(function(card) {
                return get.type(card) == 'basic';
            }, 'hs');
        },
        filter: function(event, player) {
            if (!player.storage.yizan && player.countCards('hes') < 2) return false;
            if (!player.hasCard(function(card) {
                return get.type(card) == 'basic';
            }, 'hs')) return false;
            for (var name of lib.inpile) {
                if (get.type(name) != 'basic') continue;
                if (event.filterCard({
                    name: name
                }, player, event)) return true;
                if (name == 'sha') {
                    for (var nature of lib.inpile_nature) {
                        if (event.filterCard({
                            name: 'sha',
                            nature: nature
                        }, player, event)) return true;
                    }
                }
            }
            return false;
        },
        subSkill: {
            mark: {
                mark: true,
                marktext: '青刃可摸',
                intro: {},
                onremove: true,
            },
        },
        chooseButton: {
            dialog: function(event, player) {
                var list = [];
                for (var name of lib.inpile) {
                    if (get.type(name) != 'basic') continue;
                    if (event.filterCard({
                        name: name
                    }, player, event)) {
                        list.push(['基本', '', name]);
                    }
                    if (name == 'sha') {
                        for (var nature of lib.inpile_nature) {
                            if (event.filterCard({
                                name: name,
                                nature: nature
                            }, player, event)) list.push(['基本', '', 'sha', nature]);
                        }
                    }
                }
                return ui.create.dialog('翊赞', [list, 'vcard'], 'hidden');
            },
            check: function(button) {
                var player = _status.event.player;
                var card = {
                    name: button.link[2],
                    nature: button.link[3]
                };
                if (_status.event.getParent()
                    .type != 'phase' || game.hasPlayer(function(current) {
                    return player.canUse(card, current) && get.effect(current, card, player, player) > 0;
                })) {
                    switch (button.link[2]) {
                        case 'tao':
                        case 'shan':
                            return 5;
                        case 'jiu':
                            {
                                if (player.storage.yizan && player.countCards('hs', {
                                    type: 'basic'
                                }) > 2) return 3;
                            };
                        case 'sha':
                            if (button.link[3] == 'fire') return 2.95;
                            else if (button.link[3] == 'thunder' || button.link[3] == 'ice') return 2.92;
                            else return 2.9;
                    }
                }
                return 0;
            },
            backup: function(links, player) {
                return {
                    audio: 'yizan_respond_shan',
                    filterCard: function(card, player, target) {
                        if (player.storage.yizan) return get.type(card) == 'basic';
                        else if (ui.selected.cards.length) {
                            if (get.type(ui.selected.cards[0]) == 'basic') return true;
                            return get.type(card) == 'basic';
                        }
                        return true;
                    },
                    complexCard: true,
                    selectCard: function() {
                        var player = _status.event.player;
                        if (player.storage.yizan) return 1;
                        return 2;
                    },
                    check: function(card, player, target) {
                        if (!ui.selected.cards.length && get.type(card) == 'basic') return 6;
                        else return 6 - get.value(card);
                    },
                    viewAs: {
                        name: links[0][2],
                        nature: links[0][3]
                    },
                    position: 'hes',
                    popname: true,
                    precontent: function() {
                        player.addMark('yizan_use', 1, false);
                        if (_status.currentPhase == player) {
                            player.addTempSkill('yizan_use_mark');
                            player.addMark('yizan_use_mark', 1);
                        }
                    },
                }
            },
            prompt: function(links, player) {
                var str = player.storage.yizan ? '一张基本牌' : '两张牌(其中至少应有一张基本牌)';
                return '将' + str + '当做' + get.translation(links[0][3] || '') + get.translation(links[0][2]) + '使用或打出';
            },
        },
        ai: {
            order: function() {
                var player = _status.event.player;
                var event = _status.event;
                if (event.filterCard({
                    name: 'jiu'
                }, player, event) && get.effect(player, {
                    name: 'jiu'
                }) > 0 && player.storage.yizan && player.countCards('hs', {
                    type: 'basic'
                }) > 2) {
                    return 3.3;
                }
                return 3.1;
            },
            skillTagFilter: function(player, tag, arg) {
                if (tag == 'fireAttack') return true;
                if (!player.storage.yizan && player.countCards('hes') < 2) return false;
                if (!player.hasCard(function(card) {
                    return get.type(card) == 'basic';
                }, 'hes')) {
                    return false;
                }
            },
            result: {
                player: 1,
            },
            respondSha: true,
            respondShan: true,
            fireAttack: true,
        },
    }
    lib.skill.dcxiangmian = {
        audio: 2,
        enable: 'phaseUse',
        usable: 1,
        filterTarget: function(card, player, target) {
            return !player.getStorage('dcxiangmian')
                .contains(target) && player != target;
        },
        content: function() {
            'step 0'
            target.judge(card => -2 / Math.sqrt(get.number(card, false)))
                .set('judge2', result => result.bool === false ? true : false);
            'step 1'
            player.markAuto('dcxiangmian', [target]);
            target.addSkill('dcxiangmian_countdown');
            if (!target.storage['dcxiangmian_countdown']) target.storage['dcxiangmian_countdown'] = [];
            [player.playerid, result.suit, result.number].forEach(i => target.storage['dcxiangmian_countdown'].push(i));
            var str = '相面' + get.translation(result.suit);
            target.markSkill('dcxiangmian_countdown', '', str);
        },
        intro: {
            content: '已对$发动过技能'
        },
        ai: {
            expose: 0.3,
            order: 10,
            result: {
                target: -5
            }
        },
        subSkill: {
            countdown: {
                trigger: {
                    player: 'useCardAfter'
                },
                //mark:true,
                //marktext:'💀',
                silent: true,
                forced: true,
                charlotte: true,
                intro: {
                    markcount: function(storage) {
                        if (storage) {
                            var list = storage.filter((_, i) => i % 3 == 2);
                            return Math.min.apply(null, list);
                        }
                    },
                    content: function(storage, player) {
                        if (!storage) return;
                        var str = '使用';
                        str += get.cnNumber(Math.min.apply(null, storage.filter((_, i) => i % 3 == 2))) + '张牌后，或使用一张';
                        for (var i = 0; i < storage.length / 3; i++) {
                            str += get.translation(storage[i * 3 + 1]) + '、';
                        }
                        str = str.slice(0, -1);
                        str += '后，失去等同于体力值的体力';
                        return str;
                    },
                },
                filter: function(event, player) {
                    if (!player.getStorage('dcxiangmian_countdown')
                        .length) return false;
                    //return (player.getStorage('dcxiangmian_countdown').filter((_,i)=>i%3==1)).contains(get.suit(event.card,player));
                    return true;
                },
                content: function() {
                    'step 0'
                    var storage = player.getStorage('dcxiangmian_countdown');
                    for (var i = 0; i < storage.length / 3; i++) {
                        if (storage[i * 3 + 1] == get.suit(trigger.card, player)) {
                            storage[i * 3 + 2] = 0;
                        } else storage[i * 3 + 2]--;
                    }
                    var str = '相面' + get.translation(storage[1]);
                    player.markSkill('dcxiangmian_countdown', '', str);
                    'step 1'
                    var storage = player.getStorage('dcxiangmian_countdown');
                    for (var i = 0; i < storage.length / 3; i++) {
                        if (storage[i * 3 + 2] <= 0) {
                            if (!event.isMine() && !event.isOnline()) game.delayx();
                            player.logSkill('dcxiangmian_countdown');
                            player.storage['dcxiangmian_countdown'].splice(i * 3, 3);
                            if (!player.getStorage('dcxiangmian_countdown')
                                .length) {
                                player.removeSkill('dcxiangmian_countdown');
                            }
                            if (player.hp > 0) player.loseHp(player.hp);
                            i--;
                        }
                    }
                },
                ai: {
                    effect: {
                        player_use: function(card, player, target) {
                            if (typeof card != 'object') return;
                            var storage = player.getStorage('dcxiangmian_countdown');
                            for (var i = 0; i < storage.length / 3; i++) {
                                if ((storage[i * 3 + 2] == 1 || get.suit(card, player) == storage[i * 3 + 1]) && !player.canSave(player) && !get.tag(card, 'save')) return 'zeroplayertarget';
                            }
                        },
                    },
                }
            }
        }
    };
    lib.skill.smh_yeyan = {
        unique: true,
        enable: "phaseUse",
        audio: 3,
        skillAnimation: true,
        animationColor: 'gray',
        prompt: "限定技，出牌阶段，你可以对一至三名角色造成至多共3点火焰伤害（你可以任意分配每名目标角色受到的伤害点数），若你将对一名角色分配2点或更多的火焰伤害，你须先弃置四张不同花色的手牌再失去3点体力。",
        filter: function(event, player) {
            if (!game.hasPlayer(function(current) {
                return current.hasSkill('xinfu_jianjie');
            })) return false;
            return player.hasSkill('smh_lianhuan');
        },
        filterTarget: function(card, player, target) {
            var length = ui.selected.cards.length;
            return (length == 0 || length == 4);
        },
        filterCard: function(card) {
            var suit = get.suit(card);
            for (var i = 0; i < ui.selected.cards.length; i++) {
                if (get.suit(ui.selected.cards[i]) == suit) return false;
            }
            return true;
        },
        complexCard: true,
        selectCard: [0, 4],
        line: "fire",
        check: function() {
            return -1
        },
        selectTarget: function() {
            if (ui.selected.cards.length == 4) return [1, 2];
            if (ui.selected.cards.length == 0) return [1, 3];
            game.uncheck('target');
            return [1, 3];
        },
        multitarget: true,
        multiline: true,
        content: function() {
            "step 0"
            player.removeSkill('smh_huoji');
            player.removeSkill('smh_lianhuan');
            player.removeSkill('smh_yeyan');
            targets.sort(lib.sort.seat);
            event.num = 0;
            "step 1"
            if (cards.length == 4) event.goto(2);
            else {
                if (event.num < targets.length) {
                    targets[event.num].damage('fire', 1, 'nocard');
                    event.num++;
                }
                if (event.num == targets.length) event.finish();
                else event.redo();
            }
            "step 2"
            player.loseHp(3);
            if (targets.length == 1) event.goto(4);
            else {
                player.chooseTarget('请选择受到2点伤害的角色', true, function(card, player, target) {
                    return _status.event.targets.contains(target)
                })
                    .set('ai', function(target) {
                    return 1;
                })
                    .set('targets', targets)
                    .set('forceDie', true);
            }
            "step 3"
            if (event.num < targets.length) {
                var dnum = 1;
                if (result.bool && result.targets && targets[event.num] == result.targets[0]) dnum = 2;
                targets[event.num].damage('fire', dnum, 'nocard');
                event.num++;
            }
            if (event.num == targets.length) event.finish();
            else event.redo();
            "step 4"
            player.chooseControl("2点", "3点")
                .set('prompt', '请选择伤害点数')
                .set('ai', function() {
                return "3点";
            })
                .set('forceDie', true);
            "step 5"
            targets[0].damage('fire', result.control == "2点" ? 2 : 3, 'nocard');
        },
        ai: {
            order: 1,
            result: {
                target: 0,
                /*target:function (player,target){
                if(target.hasSkillTag('nofire')) return 0;
                if(lib.config.mode=='versus') return -1;
                if(player.hasUnknown()) return 0;
                return get.damageEffect(target,player);
            },*/
            },
        },
    };
    lib.skill.smh_huoji = {
        charlotte: true,
        //group:["smh_yeyan"],
        mark: true,
        marktext: "龙",
        intro: {
            name: "龙印",
            content: "<li>出牌阶段限三次，你可以将一张红色牌当【火攻】使用。<br><li>若你同时拥有「凤印」，则你视为拥有技能〖业炎〗。（发动〖业炎〗后，弃置龙印和凤印）",
        },
        usable: 3,
        audio: 2,
        enable: "chooseToUse",
        position: "hes",
        filterCard: function(card) {
            return get.color(card) == 'red';
        },
        viewAs: {
            name: "huogong",
            nature: "fire",
        },
        viewAsFilter: function(player) {
            if (player.hasSkill('huoji')) return false;
            if (!game.hasPlayer(function(current) {
                return current.hasSkill('xinfu_jianjie');
            })) return false;
            if (!player.countCards('hes', {
                color: 'red'
            })) return false;
        },
        prompt: "将一张红色牌当火攻使用",
        check: function(card) {
            var player = _status.currentPhase;
            if (player.countCards('h') > player.hp) {
                return 6 - get.value(card);
            }
            return 4 - get.value(card)
        },
        ai: {
            fireAttack: true,
        },
    }
    lib.skill.olfengji = {
        audio: 2,
        trigger: {
            player: 'phaseDrawBegin2'
        },
        forced: true,
        locked: false,
        filter: function(event, player) {
            return !player.numFixed;
        },
        content: function() {
            'step 0'
            player.chooseTarget('丰积：请选择增加摸牌的目标', '令自己本回合的额定摸牌数-1，且目标下回合的额定摸牌数+2。或者点击「取消」，令自己的额定摸牌数+1', lib.filter.notMe)
                .set('ai', function(target) {
                var player = _status.event.player;
                if (target.hasJudge('lebu') || target.hasJudge('bingliang')) return 0;
                var att = get.attitude(player, target),
                    dist = get.distance(player, target, 'absolute');
                if (_status.event.goon) {
                    return att / dist;
                }
                if (game.countPlayer(function(current) {
                    return current != player && current != target && get.attitude(player, current) < 0 && get.distance(player, current, 'absolute') < dist;
                }) >= target.hp) return 0;
                return att / dist;
            })
                .set('goon', player.skipList.contains('lebu'));
            'step 1'
            if (!player.storage.olfengji_draw) player.storage.olfengji_draw = 0;
            if (result.bool) {
                var target = result.targets[0];
                player.line(target, 'thunder');
                player.storage.olfengji_draw--;
                if (!target.storage.olfengji_draw) target.storage.olfengji_draw = 0;
                target.storage.olfengji_draw += 2;
                target.addTempSkill('olfengji_draw', {
                    player: 'phaseAfter'
                });
                var str = '丰积 摸牌' + (target.storage.olfengji_draw > 0 ? '+' : '');
                target.markSkill("olfengji_draw", '', str);
            } else {
                player.storage.olfengji_draw++;
            }
            player.addTempSkill('olfengji_draw');
            var str = '丰积 摸牌' + (player.storage.olfengji_draw > 0 ? '+' : '');
            player.markSkill("olfengji_draw", '', str);
            'step 2'
            player.chooseTarget('丰积：请选择增加使用杀次数的目标', '令自己本回合使用杀的次数上限-1，且目标下回合使用杀的次数上限+2。或者点击「取消」，令自己使用杀的次数上限+1', lib.filter.notMe)
                .set('ai', function(target) {
                var player = _status.event.player;
                if (target.countMark('olfengji_draw') > 0 && target.getCardUsable('sha') < 2) return get.attitude(player, target);
                return 0;
            });
            'step 3'
            if (!player.storage.olfengji_sha) player.storage.olfengji_sha = 0;
            if (result.bool) {
                var target = result.targets[0];
                player.line(target, 'fire');
                player.storage.olfengji_sha--;
                if (!target.storage.olfengji_sha) target.storage.olfengji_sha = 0;
                target.storage.olfengji_sha += 2;
                target.addTempSkill('olfengji_sha', {
                    player: 'phaseAfter'
                });
                var str = '丰积 出杀' + (target.storage.olfengji_sha > 0 ? '+' : '');
                target.markSkill("olfengji_sha", '', str);
            } else {
                player.storage.olfengji_sha++;
            }
            player.addTempSkill('olfengji_sha');
            var str = '丰积 出杀' + (player.storage.olfengji_sha > 0 ? '+' : '');
            player.markSkill("olfengji_sha", '', str);
        },
        subSkill: {
            sha: {
                charlotte: true,
                onremove: true,
                intro: {
                    content: function(storage) {
                        return '使用【杀】的次数上限' + (storage >= 0 ? '+' : '') + storage;
                    },
                },
                mod: {
                    cardUsable: function(card, player, num) {
                        if (card.name == 'sha') return num + player.storage.olfengji_sha;
                    },
                },
            },
            draw: {
                charlotte: true,
                onremove: true,
                intro: {
                    content: function(storage) {
                        return '额定摸牌数' + (storage >= 0 ? '+' : '') + storage;
                    },
                },
                trigger: {
                    player: 'phaseDrawBegin2'
                },
                forced: true,
                filter: function(event, player) {
                    return !event.numFixed;
                },
                content: function() {
                    trigger.num += player.storage.olfengji_draw;
                },
            },
        },
    }
    lib.skill.twyilie = {
        audio: 'spyilie',
        trigger: {
            player: 'phaseUseBegin'
        },
        direct: true,
        content: function() {
            'step 0'
            player.chooseControl('选项一', '选项二', '背水！', 'cancel2')
                .set('choiceList', [
                '本阶段内使用【杀】的次数上限+1',
                '本回合内使用【杀】指定处于连环状态的目标后，或使用【杀】被【闪】抵消时，摸一张牌',
                '背水！失去1点体力并依次执行上述所有选项', ])
                .set('ai', function() {
                if (player.countCards('hs', function(card) {
                    return get.name(card) == 'sha' && player.hasValueTarget(card);
                }) > player.getCardUsable({
                    name: 'sha'
                })) {
                    return player.hp > 2 ? 2 : 0;
                }
                return 1;
            })
                .set('prompt', get.prompt('twyilie'));
            'step 1'
            if (result.control != 'cancel2') {
                player.logSkill('twyilie');
                game.log(player, '选择了', '#g【毅烈】', '的', '#y' + result.control);
                if (result.index % 2 == 0) player.addTempSkill('twyilie_add', 'phaseUseEnd');
                if (result.index > 0) player.addTempSkill('twyilie_miss');
                if (result.index == 2) player.loseHp();
            }
        },
        subSkill: {
            add: {
                charlotte: true,
                mod: {
                    cardUsable: function(card, player, num) {
                        if (card.name == 'sha') return num + 1;
                    },
                },
                marktext: '毅烈 多出杀',
                mark: true,
                intro: {},
            },
            miss: {
                charlotte: true,
                audio: 'spyilie',
                trigger: {
                    player: ['useCardToTargeted', 'shaMiss']
                },
                filter: function(event, player, name) {
                    if (name == 'useCardToTargeted') return event.card.name == 'sha' && event.target.isLinked();
                    return true;
                },
                forced: true,
                content: function() {
                    player.draw();
                },
                marktext: '毅烈 响应指定摸牌',
                mark: true,
                intro: {},
            },
        },
    }
    lib.skill.twxingzhui = {
        audio: 2,
        enable: 'phaseUse',
        usable: 1,
        mahouSkill: true,
        filter: function(event, player) {
            return !player.hasSkill('twxingzhui_mahou');
        },
        content: function() {
            'step 0'
            player.loseHp();
            player.chooseControl('1回合', '2回合', '3回合')
                .set('prompt', '请选择施法时长')
                .set('ai', function() {
                return 2;
            });
            'step 1'
            player.storage.twxingzhui_mahou = [result.index + 1, result.index + 1];
            player.addTempSkill('twxingzhui_mahou', {
                player: 'die'
            });
            player.addTempSkill('twxingzhui_mark', {
                player: 'die'
            });
            player.storage.twxingzhui_mark = '';
            player.addMark('twxingzhui_mark', player.storage.twxingzhui_mahou[0] + ' - ' + player.storage.twxingzhui_mahou[1]);
        },
        ai: {
            order: 2,
            result: {
                player: function(player, target) {
                    if (!player.hasFriend()) return 0;
                    if (player.hp > 1) return 1;
                    return 0;
                },
            },
        },
        subSkill: {
            mark: {
                mark: true,
                onremove: true,
                intro: {
                    name: "施法：星坠",
                    content: function(s, p) {
                        var str = '施法：星坠-剩余回合：'
                        str += p.storage.twxingzhui_mahou[1];
                        str += '<br>施法：星坠-成功观看数：'
                        str += p.storage.twxingzhui_mahou[0];
                        return str;
                    },
                },
                sub: true,
            },
            mahou: {
                trigger: {
                    global: 'phaseEnd'
                },
                forced: true,
                popup: false,
                charlotte: true,
                content: function() {
                    'step 0'
                    var list = player.storage.twxingzhui_mahou;
                    list[1]--;
                    if (list[1] == 0) {
                        game.log(player, '的', '#g星坠', '魔法生效');
                        player.logSkill('twxingzhui');
                        var num = list[0];
                        event.num = num;
                        var cards = game.cardsGotoOrdering(get.cards(num * 2))
                            .cards;
                        event.cards = cards;
                        player.showCards(cards, get.translation(player) + '发动了【星坠】');
                        player.removeSkill('twxingzhui_mahou');
                        player.removeSkill('twxingzhui_mark');
                    } else {
                        game.log(player, '的', '#g星坠', '魔法剩余', '#g' + (list[1]) + '回合');
                        player.storage.twxingzhui_mark = '';
                        player.addMark('twxingzhui_mark', player.storage.twxingzhui_mahou[0] + ' - ' + player.storage.twxingzhui_mahou[1]);
                        event.finish();
                    }
                    'step 1'
                    var cards2 = [];
                    for (var card of event.cards) {
                        if (get.color(card, false) == 'black') cards2.push(card);
                    }
                    if (!cards2.length) event.finish();
                    else {
                        event.cards2 = cards2;
                        var str = '令一名其他角色获得其中的黑色牌（' + get.translation(cards2) + '）';
                        if (cards2.length >= event.num) str += '，然后对其造成' + get.cnNumber(event.num) + '点伤害';
                        player.chooseTarget('请选择〖星坠〗的目标', str, lib.filter.notMe)
                            .set('ai', function(target) {
                            var player = _status.event.player;
                            if (_status.event.getParent()
                                .cards2.length >= _status.event.getParent()
                                .num) return get.damageEffect(target, player, player, 'thunder');
                            return get.attitude(player, target);
                        });
                    }
                    'step 2'
                    if (result.bool) {
                        var target = result.targets[0];
                        player.line(target);
                        target.gain(event.cards2, 'gain2');
                        if (event.cards2.length >= num) target.damage(event.num, 'thunder');
                    }
                },
            },
        },
    };
    lib.skill.dcxuewei = {
        audio: 2,
        trigger: {
            player: 'phaseJieshuBegin'
        },
        direct: true,
        content: function() {
            'step 0'
            player.chooseTarget(get.prompt2('dcxuewei'), (card, player, target) => {
                return target.hp <= player.hp;
            })
                .set('ai', target => {
                var player = _status.event.player;
                return get.effect(target, {
                    name: 'tao'
                }, player, player) + 0.1;
            });
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                player.logSkill('dcxuewei', target);
                player.addTempSkill('dcxuewei_shelter', {
                    player: 'phaseBegin'
                });
                player.markAuto('dcxuewei_shelter', [target]);
                player.addTempSkill('dcxuewei_mark', {
                    player: 'phaseBegin'
                });
                player.storage.dcxuewei_mark = '';
                player.addMark('dcxuewei_mark', get.translation(target));
            }
        },
        ai: {
            threaten: 1.1
        },
        subSkill: {
            shelter: {
                audio: 'dcxuewei',
                trigger: {
                    global: 'damageBegin4'
                },
                filter: function(event, player) {
                    return player.getStorage('dcxuewei_shelter')
                        .contains(event.player);
                },
                charlotte: true,
                forced: true,
                onremove: true,
                logTarget: 'player',
                marktext: '卫',
                //intro:{content:'保护对象：$'},
                content: function() {
                    'step 0'
                    trigger.cancel();
                    'step 1'
                    player.loseHp();
                    if (trigger.player != player) game.asyncDraw([player, trigger.player]);
                    else player.draw(2);
                    'step 2'
                    game.delayx();
                },
                ai: {
                    filterDamage: true,
                    skillTagFilter: function(player, tag, arg) {
                        if (arg && arg.player && arg.player.hasSkillTag('jueqing', false, player)) return false;
                        return true;
                    }
                },
            },
            mark: {
                mark: true,
                marktext: '血卫 ',
                intro: {},
            },
        },
    };
    lib.skill.lkbushi = {
        audio: 2,
        getBushi: function(player) {
            if (!player.storage.lkbushi) return ['spade', 'heart', 'club', 'diamond'];
            return player.storage.lkbushi;
        },
        onremove: true,
        trigger: {
            player: 'phaseZhunbeiBegin'
        },
        direct: true,
        locked: false,
        content: function() {
            'step 0'
            var list = lib.skill.lkbushi.getBushi(player);
            list = list.map(function(i) {
                return ['', '', 'lukai_' + i];
            });
            var next = player.chooseToMove('卜筮：是否调整〖卜筮〗的花色顺序？');
            next.set('list', [
                ['无次数限制/使用打出摸牌<br>可弃牌无效/结束阶段获得', [list, 'vcard'], function(list) {
                    var list2 = list.map(function(i) {
                        return get.translation(i[2].slice(6));
                    });
                    return '你使用' + list2[0] + '牌时无次数限制；使用或打出' + list2[1] + '时，摸一张牌；<br>成为' + list2[2] + '牌目标后可弃一张牌无效；结束阶段获得一张' + list2[3] + '牌';
                }], ]);
            next.set('processAI', function() {
                var player = _status.event.player;
                var list = lib.skill.lkbushi.getBushi(player);
                var list2 = [];
                var hs = player.getCards('hs', function(card) {
                    return player.hasValueTarget(card);
                });
                list.sort(function(a, b) {
                    return hs.filter((i) => get.suit(i) == b)
                        .length - hs.filter((i) => get.suit(i) == a)
                        .length;
                });
                list2.push(list.shift());
                hs = player.getCards('hs', 'sha');
                list.sort(function(a, b) {
                    return hs.filter((i) => get.suit(i) == b)
                        .length - hs.filter((i) => get.suit(i) == a)
                        .length;
                });
                list2.unshift(list.shift());
                list.randomSort();
                list2.addArray(list);
                return [list2.map((i) => ['', '', 'lukai_' + i])]
            });
            'step 1'
            if (result.bool) {
                var list = lib.skill.lkbushi.getBushi(player),
                    list2 = result.moved[0].map(function(i) {
                        return i[2].slice(6);
                    });
                for (var i = 0; i < 4; i++) {
                    if (list[i] != list2[i]) {
                        player.logSkill('lkbushi');
                        player.storage.lkbushi = list2;
                        var str = '';
                        for (var j = 0; j < 4; j++) {
                            str += get.translation(list2[j]);
                        }
                        player.storage.lkbushi_mark = '';
                        player.addMark('lkbushi_mark', str);
                        game.delayx();
                        break;
                    }
                }
            }
        },
        mark: true,
        marktext: '筮',
        /*intro:{
        content:function(storage,player){
            var list=lib.skill.lkbushi.getBushi(player).map((i)=>get.translation(i));
            return '①你使用'+list[0]+'牌无次数限制。②当你使用或打出'+list[1]+'牌后，你摸一张牌。③当你成为'+list[2]+'牌的目标后，你可以弃置一张牌，令此牌对你无效。④结束阶段开始时，你从牌堆或弃牌堆获得一张'+list[3]+'牌。⑤准备阶段开始时，你可调整此技能中四种花色的对应顺序。';
        },
    },*/
        group: ['lkbushi_unlimit', 'lkbushi_draw', 'lkbushi_defend', 'lkbushi_gain', 'lkbushi_mark'],
        subSkill: {
            unlimit: {
                mod: {
                    cardUsable: function(card, player) {
                        var list = lib.skill.lkbushi.getBushi(player);
                        if (list[0] == get.suit(card)) return Infinity;
                    },
                },
                trigger: {
                    player: 'useCard1'
                },
                forced: true,
                popup: false,
                silent: true,
                firstDo: true,
                filter: function(event, player) {
                    if (event.addCount === false) return true;
                    var list = lib.skill.lkbushi.getBushi(player);
                    return (list[0] == get.suit(event.card));
                },
                content: function() {
                    trigger.addCount = false;
                    var stat = player.getStat()
                        .card,
                        name = trigger.card.name;
                    if (stat[name] && typeof stat[name] == 'number') stat[name]--;
                },
            },
            draw: {
                audio: 'lkbushi',
                trigger: {
                    player: ['useCard', 'respond']
                },
                forced: true,
                locked: false,
                filter: function(event, player) {
                    var list = lib.skill.lkbushi.getBushi(player);
                    return list[1] == get.suit(event.card);
                },
                content: function() {
                    player.draw();
                },
            },
            defend: {
                audio: 'lkbushi',
                trigger: {
                    target: 'useCardToTargeted'
                },
                direct: true,
                filter: function(event, player) {
                    var list = lib.skill.lkbushi.getBushi(player);
                    return list[2] == get.suit(event.card) && !event.excluded.contains(player) && player.countCards('he') > 0;
                },
                content: function() {
                    'step 0'
                    player.chooseToDiscard('he', get.prompt('lkbushi'), '弃置一张牌，令' + get.translation(trigger.card) + '对你无效')
                        .set('ai', function(card) {
                        if (_status.event.eff >= 0) return false;
                        return -_status.event.eff * 1.1 - get.value(card);
                    })
                        .set('eff', get.effect(player, trigger.card, trigger.player, player))
                        .logSkill = ['lkbushi_defend', trigger.player];
                    'step 1'
                    if (result.bool) {
                        trigger.excluded.add(player);
                    }
                },
            },
            gain: {
                audio: 'lkbushi',
                trigger: {
                    player: 'phaseJieshuBegin'
                },
                forced: true,
                locked: false,
                content: function() {
                    var list = lib.skill.lkbushi.getBushi(player);
                    var card = get.cardPile(function(card) {
                        return get.suit(card, false) == list[3];
                    });
                    if (card) player.gain(card, 'gain2');
                },
            },
            mark: {
                mark: true,
                marktext: "卜筮",
                intro: {},
                init: function(player) {
                    player.storage.lkbushi_mark = '';
                    var str = '';
                    //   str += get.translation('spade');
                    str += '♠️♥️♣️️♦️';
                    player.addMark('lkbushi_mark', str);
                },
                onremove: function(player) {
                    player.unmarkSkill('lkbushi_mark');
                },
                sub: true,
            },
        },
    };
    lib.skill.wangong = {
        audio: 2,
        trigger: {
            player: 'useCard'
        },
        forced: true,
        filter: function(event, player) {
            if (get.type(event.card, false) != 'basic') player.removeSkill('wangong_mark');
            return get.type(event.card, false) == 'basic';
        },
        content: function() {
            player.addSkill('wangong2');
            player.addSkill('wangong_mark');
        },
        subSkill: {
            mark: {
                mark: true,
                intro: {},
            },
        },
    }
    lib.skill.wangong2 = {
        trigger: {
            player: 'useCard1'
        },
        forced: true,
        popup: false,
        firstDo: true,
        charlotte: true,
        content: function() {
            player.removeSkill('wangong2');
            if (trigger.card.name == 'sha') trigger.baseDamage++;
        },
        mod: {
            cardUsable: function(card) {
                if (card.name == 'sha') return Infinity;
            },
            targetInRange: function(card) {
                if (card.name == 'sha') return true;
            },
        },
        mark: true,
    };
    lib.skill.clanlianhe = {
        audio: 2,
        trigger: {
            player: 'phaseUseBegin'
        },
        filter: function(event, player) {
            return game.hasPlayer(current => !current.isLinked());
        },
        direct: true,
        content: function() {
            'step 0'
            player.chooseTarget(get.prompt2('clanlianhe'), 2, (card, player, target) => {
                return !target.isLinked();
            })
                .set('ai', target => {
                var att = get.attitude(_status.event.player, target);
                if (att > 0) att /= 1.2;
                return Math.abs(att);
            });
            'step 1'
            if (result.bool) {
                var targets = result.targets.sortBySeat();
                targets.forEach(i => i.link(true));
                targets.forEach(i => i.addSkill('clanlianhe_mark'));
                player.logSkill('clanlianhe', targets);
                player.addSkill('clanlianhe_effect');
                player.markAuto('clanlianhe_effect', targets);
            }
        },
        subSkill: {
            effect: {
                trigger: {
                    global: ['phaseUseEnd', 'die']
                },
                charlotte: true,
                forced: true,
                locked: false,
                popup: false,
                onremove: true,
                filter: function(event, player) {
                    return player.getStorage('clanlianhe_effect')
                        .contains(event.player);
                },
                marktext: '连',
                //intro:{content:'已选择目标：$'},
                content: function() {
                    'step 0'
                    player.unmarkAuto('clanlianhe_effect', [trigger.player]);
                    trigger.player.removeSkill('clanlianhe_mark');
                    if (trigger.name == 'die') event.finish();
                    'step 1'
                    if (trigger.player.hasHistory('gain', evt => {
                        return evt.getParent()
                            .name == 'draw' && evt.getParent('phaseUse') == trigger;
                    })) event.finish();
                    else {
                        player.logSkill('clanlianhe_effect', trigger.player);
                        var num = 0;
                        trigger.player.getHistory('gain', evt => {
                            if (evt.getParent('phaseUse') != trigger) return false;
                            num += evt.cards.length;
                        });
                        num = Math.min(num, 3);
                        event.num = num;
                        if (num <= 1) event._result = {
                            bool: false
                        };
                        else {
                            var pos = player == trigger.player ? 'e' : 'he';
                            trigger.player.chooseCard('连和：交给' + get.translation(player) + get.cnNumber(num - 1) + '张牌，或点“取消”令其摸' + get.cnNumber(num + 1) + '张牌', num - 1, pos)
                                .set('ai', card => {
                                if (_status.event.draw) return 0;
                                return 5 - get.value(card);
                            })
                                .set('draw', get.attitude(trigger.player, player) >= 0);
                        }
                    }
                    'step 2'
                    if (result.bool) {
                        trigger.player.give(result.cards, player);
                    } else player.draw(num + 1);
                }
            },
            mark: {
                mark: true,
                marktext: '连和',
                intro: {},
            },
        }
    };
    lib.skill.rekuangcai = {
        audio: 2,
        forced: true,
        trigger: {
            player: 'phaseDiscardBegin'
        },
        filter: function(event, player) {
            return !player.getHistory('useCard')
                .length || !player.getHistory('sourceDamage')
                .length;
        },
        content: function() {
            lib.skill.rekuangcai.change(player, player.getHistory('useCard')
                .length ? -1 : 1);
            if (player.storage.rekuangcai_change == 0) player.unmarkSkill('rekuangcai_mark');
            else {
                player.storage.rekuangcai_mark = '';
                var str = '';
                if (player.storage.rekuangcai_change > 0) str += '+';
                str += player.storage.rekuangcai_change;
                player.addMark('rekuangcai_mark', str);
            }
        },
        mod: {
            targetInRange: function(card, player) {
                if (player == _status.currentPhase) return true;
            },
            cardUsable: function(card, player) {
                if (player == _status.currentPhase) return Infinity;
            },
        },
        change: function(player, num) {
            if (typeof player.storage.rekuangcai_change != 'number') player.storage.rekuangcai_change = 0;
            player.storage.rekuangcai_change += num;
            player.addSkill('rekuangcai_change');
        },
        group: ['rekuangcai_draw', 'rekuangcai_mark'],
        subSkill: {
            draw: {
                audio: 'rekuangcai',
                trigger: {
                    player: 'phaseJieshuBegin'
                },
                forced: true,
                filter: function(event, player) {
                    return player.getHistory('sourceDamage')
                        .length > 0;
                },
                content: function() {
                    player.draw(Math.min(5, player.getStat('damage')));
                },
            },
            change: {
                mod: {
                    maxHandcard: function(player, num) {
                        if (typeof player.storage.rekuangcai_change == 'number') return num + player.storage.rekuangcai_change;
                    },
                },
                charlotte: true,
                mark: true,
            },
            mark: {
                mark: true,
                marktext: '狂才',
                intro: {},
            },
        },
    };
    lib.skill.dcsilve = {
        audio: 2,
        trigger: {
            player: 'enterGame',
            global: 'phaseBefore',
        },
        forced: true,
        direct: true,
        onremove: ['dcsilve', 'dcsilve_self'],
        filter: function(event, player) {
            return (event.name != 'phase' || game.phaseNumber == 0);
        },
        content: function() {
            'step 0'
            player.chooseTarget('私掠：请选择一名其他角色', '选择一名其他角色（暂时仅你可见），称为“私掠”角色，且你获得后续效果', true, (card, player, target) => {
                return target != player && !player.getStorage('dcsilve')
                    .contains(target);
            })
                .set('ai', target => {
                var att = get.attitude(_status.event.player, target);
                if (att > 0) return att + 1;
                if (att == 0) return Math.random();
                return att;
            })
                .set('animate', false);
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                player.logSkill('dcsilve');
                player.markAuto('dcsilve', [target]);
                player.addSkill('dcsilve_rob');
                player.addSkill('dcsilve_revenge');
                target.addSkill('dcsilve_target');
                target.addSkill('dcsilve_mark');
                if (!target.storage.dcsilve_target) target.storage.dcsilve_target = [];
                target.storage.dcsilve_target.push(player);
            }
        },
        subSkill: {
            rob: {
                audio: 'dcsilve',
                trigger: {
                    global: 'damageSource'
                },
                filter: function(event, player) {
                    if (!player.getStorage('dcsilve')
                        .contains(event.source)) return false;
                    if (!event.player.isIn() || event.player == player) return false;
                    if (player.getStorage('dcsilve_robbed')
                        .contains(event.player)) return false;
                    return event.player.countCards('he') > 0;
                },
                charlotte: true,
                prompt2: function(event, player) {
                    return '获得' + get.translation(event.player) + '一张牌';
                },
                logTarget: 'player',
                content: function() {
                    player.addTempSkill('dcsilve_robbed');
                    player.markAuto('dcsilve_self', [trigger.player]);
                    if (trigger.player.countGainableCards(player, 'he') > 0) {
                        player.markAuto('dcsilve_robbed', [trigger.player]);
                        player.gainPlayerCard(trigger.player, 'he', true);
                    }
                    if (trigger.source && trigger.source != player) trigger.source.markSkill('dcsilve_target');
                }
            },
            revenge: {
                audio: 'dcsilve',
                trigger: {
                    global: 'damageEnd'
                },
                filter: function(event, player) {
                    if (!player.getStorage('dcsilve')
                        .contains(event.player)) return false;
                    if (!event.player.isIn() || !event.source || !event.source.isIn() || event.source == player) return false;
                    return true;
                },
                forced: true,
                locked: false,
                charlotte: true,
                direct: true,
                content: function() {
                    'step 0'
                    if (trigger.player && trigger.player != player) trigger.player.markSkill('dcsilve_target');
                    player.markAuto('dcsilve_self', [trigger.player]);
                    player.chooseToUse('私掠：对' + get.translation(trigger.source) + '使用一张【杀】，或弃置一张手牌', function(card, player, event) {
                        if (get.name(card) != 'sha') return false;
                        return lib.filter.filterCard.apply(this, arguments);
                    })
                        .set('targetRequired', true)
                        .set('complexSelect', true)
                        .set('filterTarget', function(card, player, target) {
                        if (target != _status.event.source && !ui.selected.targets.contains(_status.event.source)) return false;
                        return lib.filter.targetEnabled.apply(this, arguments);
                    })
                        .set('source', trigger.source)
                        .set('logSkill', 'dcsilve_revenge');
                    'step 1'
                    if (!result.bool) {
                        if (player.countCards('h') > 0) player.chooseToDiscard('h', true)
                            .set('logSkill', 'dcsilve_revenge');
                    }
                }
            },
            self: {
                marktext: '私',
            },
            target: {
                marktext: '掠',
            },
            mark: {
                mark: true,
                marktext: '私掠',
                intro: {},
                onremove: true,
            },
            robbed: {
                onremove: true,
                charlotte: true
            },
        }
    };
    lib.skill.dcshuaijie = {
        audio: 2,
        enable: 'phaseUse',
        limited: true,
        skillAnimation: true,
        animationColor: 'thunder',
        filter: function(event, player) {
            var targets = player.getStorage('dcsilve')
                .filter(i => i.isIn());
            if (!targets.length) return true;
            return targets.filter(target => {
                return player.hp > target.hp && player.countCards('e') > target.countCards('e');
            })
                .length == targets.length;
        },
        content: function() {
            'step 0'
            player.awakenSkill('dcshuaijie');
            player.loseMaxHp();
            var choices = [];
            var choiceList = [
                '获得“私掠”角色至多三张牌',
                '从牌堆中获得三张类型各不相同的牌'];
            var targets = player.getStorage('dcsilve')
                .filter(i => i.isIn());
            event.targets = targets;
            if (targets.length) choices.push('选项一');
            else choiceList[0] = '<span style="opacity:0.5; ">' + choiceList[0] + '</span>';
            choices.push('选项二');
            player.chooseControl(choices)
                .set('prompt', '衰劫：选择一项')
                .set('choiceList', choiceList)
                .set('ai', () => _status.event.choice)
                .set('choice', function() {
                var eff = 0;
                for (var target of targets) {
                    eff += get.effect(target, {
                        name: 'shunshou_copy2'
                    }, player, player) * 2;
                }
                eff -= get.effect(player, {
                    name: 'dongzhuxianji'
                }, player, player);
                return eff > 0 && choices.contains('选项一') ? '选项一' : '选项二';
            }());
            'step 1'
            if (result.control == '选项一') {
                if (targets.length) {
                    for (var target of targets) {
                        if (target.countGainableCards(player, 'he') > 0) {
                            player.line(target);
                            player.gainPlayerCard(target, 'he', true, [1, 3]);
                        }
                    }
                }
            } else {
                var cards = [];
                for (var i = 0; i < 3; i++) {
                    var card = get.cardPile(cardx => {
                        return cards.filter(cardxx => get.type2(cardxx) == get.type2(cardx))
                            .length == 0;
                    });
                    if (card) cards.push(card);
                }
                if (cards.length) player.gain(cards, 'gain2');
            }
            'step 2'
            var targets = player.getStorage('dcsilve')
                .filter(i => i.isIn());
            for (var target of targets) {
                target.unmarkAuto('dcsilve_target', [player]);
                target.removeSkill('dcsilve_mark');
            }
            delete player.storage.dcsilve;
            delete player.storage.dcsilve_self;
            player.addSkill('dcsilve_mark');
            player.markAuto('dcsilve', [player]);
            player.markAuto('dcsilve_self', [player]);
        },
        ai: {
            combo: 'dcsilve',
            order: 8,
            result: {
                player: function(player) {
                    var targets = player.getStorage('dcsilve')
                        .filter(i => i.isIn());
                    if (!targets.length) return 1;
                    var att = 0;
                    targets.forEach(i => att += get.attitude(player, i));
                    if (att < 0) return 1;
                    return 0;
                }
            }
        }
    };
    lib.skill.twsuizheng = {
        audio: 3,
        trigger: {
            global: 'phaseBefore',
            player: 'enterGame'
        },
        filter: function(event, player) {
            return event.name != 'phase' || game.phaseNumber == 0;
        },
        forced: true,
        content: function() {
            'step 0'
            player.chooseTarget('请选择【随征】的目标', lib.translate.twsuizheng_info, lib.filter.notMe, true)
                .set('ai', function(target) {
                var player = _status.event.player;
                return Math.max(1 + get.attitude(player, target) * get.threaten(target), Math.random());
            });
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                player.line(target);
                game.log(player, '选择了', target, '作为', '“随征”角色');
                player.markAuto('twsuizheng', [target]);
                player.addSkill('twsuizheng_mark');
                player.storage.twsuizheng_mark = '';
                player.addMark('twsuizheng_mark', get.translation(target));
                player.addSkill('twsuizheng_draw');
                player.addSkill('twsuizheng_xianfu');
            }
        },
        ai: {
            expose: 0.3
        },
        //intro:{content:'已选择$为“随征”角色'},
        subSkill: {
            mark: {
                mark: true,
                marktext: '随征 ',
                intro: {},
                onremove: true,
            },
            draw: {
                charlotte: true,
                audio: 'twsuizheng',
                trigger: {
                    global: 'damageSource'
                },
                filter: function(event, player) {
                    return player.getStorage('twsuizheng')
                        .contains(event.source);
                },
                forced: true,
                logTarget: 'source',
                content: function() {
                    player.draw();
                },
            },
            xianfu: {
                audio: 'twsuizheng',
                trigger: {
                    global: 'damageEnd'
                },
                filter: function(event, player) {
                    return player.getStorage('twsuizheng')
                        .contains(event.player) && event.player.isIn();
                },
                forced: true,
                charlotte: true,
                logTarget: 'player',
                content: function() {
                    'step 0'
                    player.chooseToDiscard(2, '随征：弃置两张基本牌', '若你弃牌，你令' + get.translation(trigger.player) + '回复1点体力；或点击“取消”失去1点体力，令' + get.translation(trigger.player) + '获得一张【杀】或【决斗】', {
                        type: 'basic'
                    })
                        .set('ai', function(card) {
                        if (_status.event.refuse) return -1;
                        return 6 - get.value(card);
                    })
                        .set('refuse', get.attitude(player, trigger.player) <= 0 || get.effect(player, {
                        name: 'losehp'
                    }) >= 0);
                    'step 1'
                    if (result.bool) trigger.player.recover();
                    else {
                        player.loseHp();
                        var card = get.cardPile(function(card) {
                            return card.name == 'sha' || card.name == 'juedou';
                        });
                        if (card) trigger.player.gain(card, 'gain2');
                    }
                },
            },
        },
    };
    lib.skill.twmouzhi = {
        audio: 'mjmouzhi',
        trigger: {
            player: 'damageBegin4'
        },
        forced: true,
        group: 'twmouzhi_mark',
        filter: function(event, player) {
            if (!event.card || get.color(event.card) == 'none') return false;
            var all = player.getAllHistory('damage');
            if (!all.length) return false;
            return all[all.length - 1].card && get.color(all[all.length - 1].card) == get.color(event.card);
        },
        content: function() {
            trigger.cancel();
        },
        ai: {
            effect: {
                target: function(card, player, target) {
                    if (get.tag(card, 'damage')) {
                        var color = get.color(card);
                        if (color == 'none') return;
                        var all = target.getAllHistory('damage');
                        if (!all.length || !all[all.length - 1].card) return;
                        if (get.color(all[all.length - 1].card) == color) return 'zerotarget';
                    }
                },
            },
        },
        subSkill: {
            mark: {
                trigger: {
                    player: 'damage'
                },
                silent: true,
                firstDo: true,
                mark: true,
                marktext: '谋识',
                intro: {},
                onremove: true,
                content: function() {
                    if (!trigger.card || get.color(trigger.card) == 'none') player.unmarkSkill('twmouzhi');
                    else {
                        player.storage.twmouzhi = get.color(trigger.card);
                        player.storage.twmouzhi_mark = '';
                        player.addMark('twmouzhi_mark', get.color(trigger.card) == 'red' ? '红' : '黑');
                    }
                },
            },
        },
    };
    lib.skill.rejingce = {
        audio: 'jingce',
        trigger: {
            player: 'phaseUseEnd'
        },
        frequent: true,
        filter: function(event, player) {
            return player.getHistory('useCard')
                .length > 0;
        },
        content: function() {
            var list = [];
            player.getHistory('useCard', function(evt) {
                list.add(get.type2(evt.card));
            });
            player.draw(list.length);
        },
        group: 'rejingce_add',
    };
    lib.skill.rejingce_add = {
        trigger: {
            player: 'loseEnd'
        },
        silent: true,
        firstDo: true,
        filter: function(event, player) {
            if (event.getParent()
                .name != 'useCard' || player != _status.currentPhase) return false;
            var list = player.getStorage('rejingce2');
            for (var i of event.cards) {
                if (!list.contains(get.suit(i, player))) return true;
                if (!list.contains(get.type2(i, player))) return true;
            }
            return false;
        },
        content: function() {
            if (!player.storage.rejingce2) player.storage.rejingce2 = [];
            for (var i of trigger.cards) {
                player.storage.rejingce2.add(get.suit(i, player));
                player.storage.rejingce2.add(get.type2(i, player));
            }
            player.storage.rejingce2.sort();
            var str = player.storage.rejingce2.sortBySuit()
                .join(''),
                str2 = player.storage.rejingce2.sortByType()
                    .join('');
            /*  if (player.storage.rejingce2.contains('heart')) str += '♥️️';
        if (player.storage.rejingce2.contains('diamond')) str += '♦️️';
        if (player.storage.rejingce2.contains('spade')) str += '♠️️';
        if (player.storage.rejingce2.contains('club')) str += '♣️️';
        if (player.storage.rejingce2.contains('basic')) str2 += '基';
        if (player.storage.rejingce2.contains('trick')) str2 += '锦';
        if (player.storage.rejingce2.contains('equip')) str2 += '装';*/
            player.addTempSkill('rejingce2');
            player.addTempSkill('rejingce_add_mark');
            player.storage.rejingce_add_mark = '';
            player.addMark('rejingce_add_mark', str);
            player.addTempSkill('rejingce_add_mark2');
            player.storage.rejingce_add_mark2 = '';
            player.addMark('rejingce_add_mark2', str2);
        },
        subSkill: {
            mark: {
                mark: true,
                marktext: '精策',
                onremove: true,
                intro: {},
            },
            mark2: {
                mark: true,
                marktext: '精策 ',
                onremove: true,
                intro: {},
            },
        },
    };
    lib.skill.rejingce2 = {
        onremove: true,
        intro: {
            content: '当前已使用花色：$',
        },
        mod: {
            maxHandcard: function(player, num) {
                var snum = 0;
                if (player.storage.rejingce2.contains('heart')) snum += 1;
                if (player.storage.rejingce2.contains('diamond')) snum += 1;
                if (player.storage.rejingce2.contains('spade')) snum += 1;
                if (player.storage.rejingce2.contains('club')) snum += 1;
                return num + snum;
            },
        },
    };
    lib.skill.twyangming = {
        audio: 2,
        trigger: {
            player: 'phaseUseEnd',
        },
        frequent: true,
        filter: function(event, player) {
            return player.hasHistory('useCard', evt => evt.getParent('phaseUse') == event);
        },
        content: function() {
            var types = [];
            var history = player.getHistory('useCard', evt => evt.getParent('phaseUse') == trigger);
            for (var evt of history) {
                types.add(get.type2(evt.card));
            }
            var num = types.length;
            player.draw(num);
            player.addTempSkill('twyangming_limit');
            player.addMark('twyangming_limit', num, false);
            game.log(player, '本回合的手牌上限', '#g+' + num);
        },
        subSkill: {
            limit: {
                charlotte: true,
                onremove: true,
                mod: {
                    maxHandcard: function(player, num) {
                        return num + player.countMark('twyangming_limit');
                    }
                }
            }
        },
        group: 'twyangming1',
    };
    lib.skill.twyangming1 = {
        trigger: {
            player: 'useCard2',
        },
        forced: true,
        silent: true,
        charlotte: true,
        filter: function(event, player) {
            var evt = event.getParent('phaseUse');
            if (!evt || player != evt.player) return false;
            return true;
        },
        content: function() {
            if (!player.storage.twyangming1_marked) player.storage.twyangming1_marked = [];
            if (!player.storage.twyangming1_marked.contains(get.type2(trigger.card))) player.storage.twyangming1_marked.add(get.type2(trigger.card));
            player.addTempSkill("twyangming1_mark");
            player.storage.twyangming1_mark = '';
            var str = '';
            if (player.storage.twyangming1_marked.contains('basic')) str += '基';
            if (player.storage.twyangming1_marked.contains('trick')) str += '锦';
            if (player.storage.twyangming1_marked.contains('equip')) str += '装';
            player.addMark('twyangming1_mark', str);
        },
        subSkill: {
            mark: {
                marktext: '扬名 ',
                intro: {
                    name: '扬名',
                },
                charlotte: true,
                mark: true,
                onremove: function(player) {
                    delete player.storage.twyangming1_marked;
                },
            },
        },
    };
    lib.skill.rexiemu = {
        audio: 2,
        trigger: {
            player: 'phaseJieshuBegin'
        },
        direct: true,
        filter: function(event, player) {
            return !game.hasPlayer(function(current) {
                return current.hasMark('rexiemu');
            });
        },
        content: function() {
            'step 0'
            player.chooseTarget(get.prompt2('rexiemu'), lib.filter.notMe)
                .set('ai', function(target) {
                var player = _status.event.player;
                return get.attitude(player, target) * Math.sqrt(Math.max(1 + player.countCards('h'), 1 + target.countCards('h')));
            });
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                player.logSkill('rexiemu', target);
                target.addMark('rexiemu', 1);
                //target.unmarkSkill('rexiemu');
                player.addSkill('rexiemu2');
                player.storage.rexiemu_mark = '';
                player.addSkill('rexiemu_mark');
                player.addMark('rexiemu_mark', get.translation(target));
            }
        },
        //intro:{content:'mark'},
        ai: {
            expose: 0.1,
        },
        subSkill: {
            mark: {
                mark: true,
                marktext: '协穆 ',
                intro: {},
                onremove: true,
            },
        },
    };
    lib.skill.rexiemu3 = {
        trigger: {
            player: 'phaseBegin'
        },
        forced: true,
        charlotte: true,
        silent: true,
        firstDo: true,
        content: function() {
            player.removeSkill('rexiemu2');
            player.removeSkill('rexiemu_mark');
            game.countPlayer(function(current) {
                var num = current.countMark('rexiemu');
                if (num) current.removeMark('rexiemu', num);
            });
        },
    };
    lib.skill.dawu2 = {
        trigger: {
            player: 'damageBegin4'
        },
        filter: function(event) {
            if (event.nature != 'thunder') return true;
            return false;
        },
        mark: true,
        forced: true,
        charlotte: true,
        content: function() {
            trigger.cancel();
        },
        ai: {
            nofire: true,
            nodamage: true,
            effect: {
                target: function(card, player, target, current) {
                    if (get.tag(card, 'damage') && !get.tag(card, 'thunderDamage')) return [0, 0];
                }
            },
        },
        intro: {
            content: '共有1个标记',
        },
    };
    lib.skill.kuangfeng2 = {
        trigger: {
            player: 'damageBegin3'
        },
        filter: function(event) {
            if (event.nature == 'fire') return true;
            return false;
        },
        mark: true,
        intro: {
            content: '共有1个标记'
        },
        forced: true,
        content: function() {
            trigger.num++;
        },
        ai: {
            effect: {
                target: function(card, player, target, current) {
                    if (get.tag(card, 'fireDamage')) return 1.5;
                }
            }
        },
    };
    lib.skill.yijin = {
        audio: 3,
        trigger: {
            player: 'phaseUseBegin'
        },
        forced: true,
        direct: true,
        group: ['yijin_upstart', 'yijin_die'],
        filter: function(event, player) {
            return lib.skill.yijin.getKane(player)
                .length;
        },
        getKane: function(player) {
            var list = lib.skill.yijin.derivation;
            return list.filter(mark => player.hasMark(mark));
        },
        derivation: ['yijin_wushi', 'yijin_jinmi', 'yijin_guxiong', 'yijin_tongshen', 'yijin_yongbi', 'yijin_houren'],
        getValue: function(player, mark, target) {
            var att = get.attitude(player, target);
            var dis = Math.sqrt(get.distance(player, target, 'absolute'));
            switch (mark.slice(6)) {
                case 'wushi':
                    return get.effect(target, {
                        name: 'wuzhong'
                    }, player, player) * 2.5 / dis;
                case 'jinmi':
                    if (target.hasJudge('lebu') && !target.hasCard({
                        name: 'wuxie'
                    }, 'hs')) return 1;
                    return get.effect(target, {
                        name: 'lebu'
                    }, player, player) / dis;
                case 'guxiong':
                    return get.effect(target, {
                        name: 'losehp'
                    }, player, player) * 2 / dis;
                case 'tongshen':
                    if (target.isMin()) return 0;
                    var eff = get.damageEffect(target, player, target);
                    if (eff >= 0) return 0;
                    if (att >= 4) {
                        if (target.hp == 1) return att * 5 / Math.max(0.1, 5 - dis);
                        if (target.hp == 2 && target.countCards('he') <= 2) return att * 3 / Math.max(0.1, 5 - dis);
                    }
                    if (att > 0) return 0;
                    return -eff / 5 * dis;
                case 'yongbi':
                    return get.effect(target, {
                        name: 'bingliang'
                    }, player, player) * 2;
                case 'houren':
                    return get.recoverEffect(target, player, player) / dis;
            }
        },
        content: function() {
            'step 0'
            player.chooseTarget('亿金：令一名其他角色获得1枚“金”', true, (card, player, target) => {
                return player != target && !lib.skill.yijin.getKane(target)
                    .length;
            })
                .set('ai', target => {
                var player = _status.event.player,
                    kane = lib.skill.yijin.getKane(player);
                return Math.abs(Math.max.apply(Math.max, kane.map(i => lib.skill.yijin.getValue(player, i, target))));
            });
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                event.target = target;
                player.logSkill('yijin', target);
                var kane = lib.skill.yijin.getKane(player);
                var choiceList = kane.map(i => {
                    return '<div class="skill">【' + get.translation(lib.translate[i + '_ab'] || get.translation(i)
                        .slice(0, 2)) + '】</div>' +
                        '<div>' + get.skillInfoTranslation(i, player) + '</div>';
                });
                player.chooseControl(kane)
                    .set('choiceList', choiceList)
                    .set('displayIndex', false)
                    .set('prompt', '选择令' + get.translation(target) + '获得的“金”')
                    .set('ai', () => {
                    var controls = _status.event.controls,
                        player = _status.event.player,
                        target = _status.event.getParent()
                            .target;
                    var list = controls.map(i => [i, lib.skill.yijin.getValue(player, i, target)]) //.filter(i=>i[1]>=0);
                    list.sort((a, b) => b[1] - a[1]);
                    if (list.length) return list[0][0];
                    return controls.randomGet();
                });
            } else event.finish();
            'step 2'
            var kane = result.control;
            player.removeMark(kane, 1);
            player.popup(kane, 'metal');
            player.addSkill('yijin_clear');
            target.addMark(kane, 1);
            target.storage.yijin_marked = '';
            target.addSkill('yijin_marked');
            target.addMark('yijin_marked', get.translation(kane));
            target.addAdditionalSkill('yijin_' + player.playerid, kane);
            game.delayx();
        },
        subSkill: {
            marked: {
                mark: true,
                marktext: '金 ',
                intro: {},
                onremove: true,
            },
            mark: {
                mark: true,
                marktext: '金',
                intro: {
                    name: '金(膴仕)',
                    name2: '金(膴仕)',
                    markcount: function(storage, player) {
                        return lib.skill.yijin.getKane(player)
                            .length;
                    },
                    content: function(storage, player) {
                        return '剩余金：' + get.translation(lib.skill.yijin.getKane(player));
                    },
                },
            },
            upstart: {
                audio: 'yijin',
                trigger: {
                    global: 'phaseBefore',
                    player: 'enterGame',
                },
                forced: true,
                filter: function(event, player) {
                    return (event.name != 'phase' || game.phaseNumber == 0);
                },
                content: function() {
                    var kane = lib.skill.yijin.derivation;
                    for (var mark of kane) {
                        player.addMark(mark, 1, false);
                    }
                    player.addSkill('yijin_mark');
                }
            },
            die: {
                audio: 'yijin',
                trigger: {
                    player: 'phaseBegin'
                },
                forced: true,
                check: () => false,
                filter: function(event, player) {
                    return !lib.skill.yijin.getKane(player)
                        .length;
                },
                content: function() {
                    player.die();
                }
            },
            clear: {
                trigger: {
                    global: 'phaseAfter',
                    player: 'die',
                },
                charlotte: true,
                forced: true,
                popup: false,
                forceDie: true,
                filter: function(event, player) {
                    if (event.name == 'die') return true;
                    if (!lib.skill.yijin.getKane(event.player)
                        .length) return false;
                    if (event.player.additionalSkills['yijin_' + player.playerid]) {
                        return true;
                    }
                    return false;
                },
                content: function() {
                    if (trigger.name == 'die') {
                        game.countPlayer(current => {
                            var skills = current.additionalSkills['yijin_' + player.playerid];
                            if (skills && skills.length) {
                                current.removeSkill('yijin_marked');
                                current.removeAdditionalSkill('yijin_' + player.playerid);
                                for (var i of skills) {
                                    trigger.player.removeSkill(i);
                                }
                            }
                        });
                    } else {
                        var skills = trigger.player.additionalSkills['yijin_' + player.playerid];
                        trigger.player.removeSkill('yijin_marked');
                        trigger.player.removeAdditionalSkill('yijin_' + player.playerid);
                        for (var i of skills) {
                            trigger.player.removeMark(i, 1);
                            trigger.player.removeSkill(i);
                        }
                    }
                }
            },
            wushi: {
                charlotte: true,
                forced: true,
                trigger: {
                    player: 'phaseDrawBegin2'
                },
                content: function() {
                    trigger.num += 4;
                },
                mod: {
                    cardUsable: function(card, player, num) {
                        if (card.name == 'sha') return num + 1;
                    },
                },
            },
            jinmi: {
                charlotte: true,
                forced: true,
                trigger: {
                    player: 'phaseBegin'
                },
                content: function() {
                    player.skip('phaseUse');
                    player.skip('phaseDiscard');
                },
            },
            guxiong: {
                charlotte: true,
                forced: true,
                trigger: {
                    player: 'phaseUseBegin'
                },
                content: function() {
                    player.loseHp();
                },
                mod: {
                    maxHandcard: function(player, num) {
                        return num - 3;
                    }
                },
            },
            tongshen: {
                charlotte: true,
                forced: true,
                trigger: {
                    player: 'damageBegin4'
                },
                filter: function(event) {
                    return event.nature != 'thunder';
                },
                content: function() {
                    trigger.cancel();
                },
                ai: {
                    nofire: true,
                    nodamage: true,
                    effect: {
                        target: function(card, player, target, current) {
                            if (get.tag(card, 'damage') && !get.tag(card, 'thunderDamage')) return [0, 0];
                        }
                    },
                },
            },
            yongbi: {
                charlotte: true,
                forced: true,
                trigger: {
                    player: 'phaseZhunbeiBegin'
                },
                content: function() {
                    player.skip('phaseDraw');
                },
            },
            houren: {
                charlotte: true,
                forced: true,
                trigger: {
                    player: 'phaseEnd'
                },
                content: function() {
                    player.recover(3);
                },
            }
        }
    };
    lib.skill.refenxun = {
        audio: 'fenxun',
        enable: 'phaseUse',
        usable: 1,
        position: 'he',
        filterTarget: function(card, player, target) {
            return target != player;
        },
        content: function() {
            player.markAuto('refenxun2', targets);
            player.addTempSkill('refenxun2');
            player.storage.refenxun_mark = '';
            player.addTempSkill('refenxun_mark');
            player.addMark('refenxun_mark', get.translation(targets));
        },
        subSkill: {
            mark: {
                mark: true,
                marktext: '奋迅 ',
                intro: {},
                onremove: true,
            },
        },
        ai: {
            order: 6.5,
            result: {
                player: function(player, target) {
                    if (get.distance(player, target) <= 1) return 0;
                    var hs = player.getCards('h', 'shunshou');
                    if (hs.length && player.canUse(hs[0], target, false)) {
                        return 1;
                    }
                    var geteff = function(current) {
                        return player.canUse('sha', current, false, true) && get.effect(current, {
                            name: 'sha'
                        }, player, player) > 0;
                    }
                    if (player.hasSha() && geteff(target)) {
                        var num = game.countPlayer(function(current) {
                            return current != player && get.distance(player, current) <= 1 && geteff(current);
                        });
                        if (num == 0) {
                            if (game.hasPlayer(function(current) {
                                return player.canUse('sha', current) && geteff(current) && current != target;
                            })) {
                                return 1;
                            }
                        } else if (num == 1) {
                            return 1;
                        }
                    }
                    return 0;
                }
            }
        }
    };
    lib.skill.refenxun2 = {
        audio: 'fenxun',
        trigger: {
            player: 'phaseJieshuBegin',
        },
        forced: true,
        charlotte: true,
        filter: function(event, player) {
            return player.getHistory('sourceDamage', function(evt) {
                return player.storage.refenxun2.contains(evt.player);
            })
                .length == 0 && player.countCards('he', function(card) {
                return lib.filter.cardDiscardable(card, player, 'refenxun2');
            }) > 0;
        },
        content: function() {
            player.chooseToDiscard('he', true);
        },
        onremove: true,
        mod: {
            globalFrom: function(from, to) {
                if (from.storage.refenxun2.contains(to)) {
                    return -Infinity;
                }
            }
        },
    };
    lib.skill.zhihu_mark = {
        onremove: function(player) {
            delete player.storage.zhihu_mark;
            player.removeSkill('zhihu');
        },
        trigger: {
            global: 'phaseBeginStart'
        },
        firstDo: true,
        charlotte: true,
        silent: true,
        filter: function(event, player) {
            return event.player == player.storage.zhihu_mark;
        },
        content: function() {
            player.removeSkill('zhihu_mark');
        },
    };
    lib.skill.naxiang = {
        audio: 2,
        trigger: {
            player: 'damageEnd',
            source: 'damageSource',
        },
        forced: true,
        preHidden: true,
        filter: function(event, player) {
            var target = lib.skill.naxiang.logTarget(event, player);
            return target && target != player && target.isAlive();
        },
        logTarget: function(event, player) {
            return player == event.player ? event.source : event.player;
        },
        content: function() {
            player.addTempSkill('naxiang2', {
                player: 'phaseBegin'
            });
            if (!player.storage.naxiang2) player.storage.naxiang2 = [];
            player.storage.naxiang2.add(lib.skill.naxiang.logTarget(trigger, player));
            lib.skill.naxiang.logTarget(trigger, player)
                .addSkill('naxiang_add');
            lib.skill.naxiang.logTarget(trigger, player)
                .storage.naxiang_add = player;
        },
        subSkill: {
            add: {
                onremove: function(player) {
                    delete player.storage.naxiang_add;
                },
                trigger: {
                    global: ['phaseBeginStart', 'die']
                },
                mark: true,
                marktext: '纳降',
                intro: {},
                firstDo: true,
                charlotte: true,
                silent: true,
                filter: function(event, player) {
                    return event.player == player.storage.naxiang_add;
                },
                content: function() {
                    player.removeSkill('naxiang_add');
                },
            },
        },
        ai: {
            combo: 'caiwang',
        },
    };
    lib.skill.xinfu_weilu = {
        audio: 2,
        trigger: {
            player: "damageEnd",
        },
        filter: function(event, player) {
            return event.source && event.source.isIn() && !player.getStorage('xinfu_weilu_effect')
                .contains(event.source)
        },
        check: function(event, player) {
            return (get.effect(target, {
                name: 'losehp'
            }, player, player) >= 0);
        },
        forced: true,
        logTarget: "source",
        content: function() {
            player.addTempSkill('xinfu_weilu_effect', {
                player: 'die'
            });
            player.markAuto('xinfu_weilu_effect', [trigger.source]);
            trigger.source.addSkill('xinfu_weilu_effected');
            trigger.source.storage.xinfu_weilu_effected = player;
            game.delayx();
        },
        ai: {
            maixie_defend: true,
            threaten: 0.85,
            effect: {
                target: function(card, player, target) {
                    if (player.hasSkillTag('jueqing', false, target)) return;
                    return 0.9;
                },
            },
        },
        subSkill: {
            effected: {
                onremove: function(player) {
                    delete player.storage.xinfu_weilu_effected;
                },
                trigger: {
                    global: ['phaseUseBegin', 'die']
                },
                mark: true,
                marktext: '威虏',
                intro: {},
                firstDo: true,
                charlotte: true,
                silent: true,
                filter: function(event, player) {
                    return event.player == player.storage.xinfu_weilu_effected;
                },
                content: function() {
                    player.removeSkill('xinfu_weilu_effected');
                },
            },
            effect: {
                audio: 'xinfu_weilu',
                trigger: {
                    player: 'phaseUseBegin'
                },
                charlotte: true,
                forced: true,
                logTarget: function(event, player) {
                    return player.getStorage('xinfu_weilu_effect')
                        .filter(function(current) {
                        return current.isAlive() && current.hp > 1;
                    });
                },
                content: function() {
                    'step 0'
                    var targets = player.getStorage('xinfu_weilu_effect');
                    player.removeSkill('xinfu_weilu_effect');
                    event.targets = targets.sortBySeat();
                    'step 1'
                    var target = targets.shift();
                    if (target.isAlive() && target.hp > 1) {
                        event._delay = true;
                        var num = target.hp - 1;
                        player.markAuto('xinfu_weilu_recover', [
                            [target, num]
                        ]);
                        target.loseHp(num);
                    }
                    if (targets.length > 0) event.redo();
                    else if (!event._delay) event.finish();
                    'step 2'
                    player.addTempSkill('xinfu_weilu_recover', {
                        player: ['phaseUseAfter', 'phaseAfter']
                    });
                    game.delayx();
                },
                onremove: true,
                //intro:{content:'已将$列入“威虏”战略打击目标'},
            },
            recover: {
                audio: 'xinfu_weilu',
                charlotte: true,
                trigger: {
                    player: 'phaseUseEnd'
                },
                forced: true,
                filter: function(event, player) {
                    var targets = player.getStorage('xinfu_weilu_recover');
                    for (var i of targets) {
                        if (i[0].isIn() && i[0].isDamaged()) return true;
                    }
                    return false;
                },
                onremove: true,
                logTarget: function(event, player) {
                    var logs = [],
                        targets = player.getStorage('xinfu_weilu_recover');
                    for (var i of targets) {
                        if (i[0].isIn() && i[0].isDamaged()) logs.add(i[0]);
                    }
                    return logs;
                },
                content: function() {
                    'step 0'
                    event.list = player.getStorage('xinfu_weilu_recover')
                        .slice(0);
                    event.list.sort(function(a, b) {
                        return lib.sort.seat(a[0], b[0]);
                    });
                    'step 1'
                    var group = event.list.shift();
                    if (group[0].isAlive() && group[0].isDamaged()) {
                        group[0].recover(group[1]);
                        event._delay = true;
                    }
                    if (event.list.length > 0) event.redo();
                    else if (!event._delay) event.finish();
                    'step 2'
                    game.delayx();
                },
            },
        },
    };
    lib.skill.dcfudao = {
        trigger: {
            global: 'phaseBefore',
            player: 'enterGame',
        },
        forced: true,
        locked: true,
        filter: function(event, player) {
            return (event.name != 'phase' || game.phaseNumber == 0) && game.hasPlayer((current) => current != player);
        },
        content: function() {
            'step 0'
            player.chooseTarget(true, lib.filter.notMe, '抚悼：请选择一名“继子”', '你或“继子”每回合首次使用牌指定对方为目标后各摸两张牌；杀死你或“继子”的角色称为“决裂”。你或“继子”对“决裂”造成的伤害+1。“决裂”对你使用牌后，其本回合内不能再使用牌。')
                .set('ai', function(target) {
                return get.attitude(_status.event.player, target);
            });
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                player.logSkill('dcfudao', target);
                game.log(target, '成为了', player, '的继子');
                player.addSkill('dcfudao_effect');
                target.addSkill('dcfudao_effect');
                player.storage.dcfudao_effected = [target];
                target.storage.dcfudao_effected = [player];
            }
        },
        group: 'dcfudao_refuse',
        subSkill: {
            effect: {
                trigger: {
                    player: 'useCardToPlayered'
                },
                forced: true,
                charlotte: true,
                usable: 1,
                filter: function(event, player) {
                    var target = event.target;
                    if (player == target || !target.isIn()) return false;
                    return player.getStorage('dcfudao_effected')
                        .contains(target);
                },
                logTarget: 'target',
                content: function() {
                    'step 0'
                    var list = [player, trigger.target];
                    list.sortBySeat();
                    game.asyncDraw(list, 2);
                    'step 1'
                    game.delayx();
                },
                mark: true,
                marktext: '抚悼',
                intro: {},
                group: ['dcfudao_revenge', 'dcfudao_deadmark'],
            },
            deadmark: {
                trigger: {
                    player: 'dieBegin'
                },
                forced: true,
                popup: false,
                lastDo: true,
                silent: true,
                filter: function(event, player) {
                    return get.itemtype(event.source) == 'player';
                },
                content: function() {
                    trigger.source.storage.dcfudao_deadmark = [player];
                    trigger.source.addSkill('dcfudao_deadrecord');
                },
            },
            deadrecord: {
                mark: true,
                marktext: '绝裂',
                intro: {},
                onremove: true,
                charlotte: true,
            },
            revenge: {
                trigger: {
                    source: 'damageBegin1'
                },
                forced: true,
                filter: function(event, player) {
                    var storage1 = event.player.getStorage('dcfudao_deadmark'),
                        storage2 = player.getStorage('dcfudao_effected');
                    for (var i of storage1) {
                        if (storage2.contains(i)) return true;
                    }
                    return false;
                },
                content: function() {
                    trigger.num++;
                },
                logTarget: 'player',
            },
            refuse: {
                trigger: {
                    target: 'useCardToTargeted'
                },
                forced: true,
                filter: function(event, player) {
                    var storage1 = event.player.getStorage('dcfudao_deadmark'),
                        storage2 = player.getStorage('dcfudao_effected');
                    for (var i of storage1) {
                        if (storage2.contains(i)) return true;
                    }
                    return false;
                },
                content: function() {
                    trigger.player.addTempSkill('dcfudao_blocker');
                },
                logTarget: 'player',
            },
            blocker: {
                charlotte: true,
                mod: {
                    cardEnabled: () => false,
                    cardSavable: () => false,
                },
            },
        },
    };
    lib.skill.twgongxin = {
        audio: 'gongxin',
        enable: 'phaseUse',
        filter: function(event, player) {
            return game.hasPlayer(function(current) {
                return current != player && current.countCards('h');
            });
        },
        filterTarget: function(card, player, target) {
            return target != player && target.countCards('h');
        },
        usable: 1,
        content: function() {
            'step 0'
            event.num = target.getCards('h')
                .reduce(function(arr, card) {
                return arr.add(get.suit(card, player)), arr;
            }, [])
                .length;
            'step 1'
            var cards = target.getCards('h');
            player.chooseButton(2, [
                '攻心',
            cards, [
                ['弃置此牌', '置于牌堆顶'], 'tdnodes'], ])
                .set('filterButton', function(button) {
                var type = typeof button.link;
                if (ui.selected.buttons.length && type == typeof ui.selected.buttons[0].link) return false;
                return true;
            })
                .set('ai', function(button) {
                var target = _status.event.target;
                var type = typeof button.link;
                if (type == 'object') return get.value(button.link, target);
            });
            'step 2'
            if (result.bool) {
                if (typeof result.links[0] != 'string') result.links.reverse();
                var card = result.links[1],
                    choice = result.links[0];
                if (choice == '弃置此牌') target.discard(card);
                else {
                    player.showCards(card, get.translation(player) + '对' + get.translation(target) + '发动了【攻心】');
                    target.lose(card, ui.cardPile, 'visible', 'insert');
                    game.log(card, '被置于了牌堆顶');
                }
            }
            'step 3'
            if (event.num == target.getCards('h')
                .reduce(function(arr, card) {
                return arr.add(get.suit(card, player)), arr;
            }, [])
                .length) event.finish();
            'step 4'
            var num1 = 0;
            for (var card of target.getCards('h')) {
                if (get.color(card) == 'red') num1++;
            }
            var num2 = target.countCards('h') - num1;
            player.chooseControl(['红色', '黑色', 'cancel2'])
                .set('prompt', '是否令' + get.translation(target) + '本回合无法使用一种颜色的牌？')
                .set('ai', function() {
                return num1 >= num2 ? '红色' : '黑色';
            });
            'step 5'
            if (result.control != 'cancel2') {
                player.line(target);
                target.storage.twgongxin3 = [result.control == '红色' ? 'red' : 'black'];
                target.addTempSkill('twgongxin2');
                target.storage.twgongxin2 = '';
                target.addMark('twgongxin2', result.control + '牌');
                game.log(target, '本回合无法使用' + result.control + '牌');
                if (!event.isMine() && !event.isOnline()) game.delayx();
            }
        },
        ai: {
            order: 10,
            expose: 0.25,
            result: {
                target: function(player, target) {
                    return -target.countCards('h');
                },
            },
        },
    };
    lib.skill.twgongxin2 = {
        mod: {
            cardEnabled2: function(card, player) {
                if (player.getStorage('twgongxin3')
                    .contains(get.color(card))) return false;
            },
        },
        mark: true,
        marktext: "攻心",
        charlotte: true,
        onremove: true,
        intro: {},
    };
    lib.skill.twshelie = {
        audio: 'shelie',
        inherit: 'shelie',
        group: 'twshelie_jingce',
        //什么精策技能啊喂！
        subSkill: {
            round: {
                charlotte: true
            },
            count: {
                mark: true,
                marktext: "涉猎",
                charlotte: true,
                onremove: true,
                intro: {},
            },
            jingce: {
                audio: 'shelie',
                trigger: {
                    player: ['phaseJieshuBegin', 'useCard1']
                },
                filter: function(event, player) {
                    if (player.hasSkill('twshelie_round') || player != _status.currentPhase) return false;
                    var list = [];
                    player.getHistory('useCard', function(evt) {
                        if (lib.suit.contains(get.suit(evt.card)) && !list.contains(get.suit(evt.card))) list.push(get.suit(evt.card));
                    });
                    if (list.length) {
                        player.addTempSkill("twshelie_count");
                        var str = list.sortBySuit()
                            .join('');
                        /*  if (list.contains('heart')) str += '♥️️';
                    if (list.contains('diamond')) str += '♦️️';
                    if (list.contains('spade')) str += '♠️️';
                    if (list.contains('club')) str += '♣️️';*/
                        player.storage.twshelie_count = '';
                        player.addMark("twshelie_count", str);
                    }
                    return event.name != 'useCard' && list.length >= player.hp;
                },
                forced: true,
                locked: false,
                content: function() {
                    'step 0'
                    player.addTempSkill('twshelie_round', 'roundStart');
                    player.chooseControl('摸牌阶段', '出牌阶段')
                        .set('prompt', '涉猎：请选择要执行的额外阶段');
                    'step 1'
                    if (result.index == 0) {
                        var next = player.phaseDraw();
                        event.next.remove(next);
                        trigger.getParent()
                            .next.push(next);
                    }
                    if (result.index == 1) {
                        var next = player.phaseUse();
                        event.next.remove(next);
                        trigger.getParent()
                            .next.push(next);
                    }
                },
            },
        },
    };
    lib.skill.shanduan = {
        audio: 2,
        init: function(player, name) {
            player.storage[name] = [1, 2, 3, 4];
        },
        trigger: {
            player: 'phaseBegin'
        },
        forced: true,
        popup: false,
        content: function() {
            trigger._shanduan = (player.storage.shanduan || [1, 2, 3, 4])
                .slice(0);
            player.storage.shanduan = [1, 2, 3, 4]
        },
        group: ['shanduan_draw', 'shanduan_use', 'shanduan_discard', 'shanduan_damage', 'shanduan_mark', 'shanduan_update'],
        ai: {
            notemp: true,
            threaten: 3.6,
        },
        subSkill: {
            damage: {
                audio: 'shanduan',
                trigger: {
                    player: 'damageEnd'
                },
                forced: true,
                locked: false,
                filter: (event, player) => player != _status.currentPhase,
                content: function() {
                    if (!player.storage.shanduan) player.storage.shanduan = [1, 2, 3, 4];
                    var list = player.storage.shanduan;
                    for (var i = 0; i < list.length; i++) {
                        var num = list[i],
                            add = true;
                        for (var j = 0; j < list.length; j++) {
                            if (list[j] < num) {
                                add = false;
                                break;
                            }
                        }
                        if (add) {
                            list[i]++;
                            break;
                        }
                    }
                    list.sort();
                    var f = 0;
                    for (var i = 0; i < list.length; i++) {
                        f += list[i] * Math.pow(10, list.length - 1 - i);
                    }
                    player.addMark('shanduan_mark', f - player.countMark('shanduan_mark'));
                    game.delayx();
                },
            },
            draw: {
                audio: 'shanduan',
                trigger: {
                    player: 'phaseDrawBegin'
                },
                forced: true,
                locked: false,
                filter: function(event, player) {
                    var list = event.getParent()
                        ._shanduan;
                    return list && list.length > 0;
                },
                content: function() {
                    'step 0'
                    var list = trigger.getParent()
                        ._shanduan;
                    if (list.length == 1) event._result = {
                        index: 0
                    };
                    else player.chooseControl(list)
                        .set('prompt', '善断：为摸牌阶段的摸牌数分配一个数值')
                        .set('choice', list.indexOf(Math.max.apply(Math, list)))
                        .set('ai', () => _status.event.choice);
                    'step 1'
                    var list = trigger.getParent()
                        ._shanduan;
                    var num = list[result.index];
                    trigger.num = num;
                    list.remove(num);
                    list.sort();
                    var f = 0;
                    for (var i = 0; i < list.length; i++) {
                        f += list[i] * Math.pow(10, list.length - 1 - i);
                    }
                    player.removeMark('shanduan_mark', player.countMark('shanduan_mark') - f);
                    game.log(player, '给', '#g摸牌阶段的摸牌数', '分配的数值是', '#y' + num);
                },
            },
            use: {
                audio: 'shanduan',
                trigger: {
                    player: 'phaseUseBegin'
                },
                forced: true,
                locked: false,
                filter: function(event, player) {
                    var list = event.getParent()
                        ._shanduan;
                    return list && list.length > 0;
                },
                content: function() {
                    'step 0'
                    var list = trigger.getParent()
                        ._shanduan;
                    if (list.length == 1) event._result = {
                        index: 0
                    };
                    else player.chooseControl(list)
                        .set('prompt', '善断：为攻击范围基数分配一个数值')
                        .set('list', list)
                        .set('ai', function() {
                        var player = _status.event.player,
                            list = _status.event.list,
                            card = {
                                name: 'sha'
                            };
                        if (player.hasSha() && (player.hasValueTarget(card, false, true) && !player.hasValueTarget(card, null, true))) {
                            var range = 1;
                            var equips = player.getCards('e');
                            for (var i = 0; i < equips.length; i++) {
                                var info = get.info(equips[i], false)
                                    .distance;
                                if (!info) continue;
                                if (info.attackFrom) {
                                    range -= info.attackFrom;
                                }
                            }
                            var listx = list.slice(0)
                                .sort();
                            for (var i of listx) {
                                if (i <= range) continue;
                                if (game.hasPlayer(function(current) {
                                    var distance = get.distance(player, current, 'attack');
                                    if (distance > 1 && distance <= (i - range)) return true;
                                    return false;
                                })) return list.indexOf(i);
                            }
                        }
                        return list.indexOf(Math.min.apply(Math, list));
                    });
                    'step 1'
                    var list = trigger.getParent()
                        ._shanduan;
                    var num = list[result.index];
                    if (!player.storage.shanduan_effect) player.storage.shanduan_effect = {};
                    player.storage.shanduan_effect.range = num;
                    player.addTempSkill('shanduan_effect');
                    list.remove(num);
                    list.sort();
                    var f = 0;
                    for (var i = 0; i < list.length; i++) {
                        f += list[i] * Math.pow(10, list.length - 1 - i);
                    }
                    player.removeMark('shanduan_mark', player.countMark('shanduan_mark') - f);
                    game.log(player, '给', '#g攻击范围的基数', '分配的数值是', '#y' + num);
                    if (list.length == 0) event.finish();
                    else if (list.length == 1) event._result = {
                        index: 0
                    };
                    else player.chooseControl(list)
                        .set('prompt', '为使用【杀】的次数上限分配一个数值')
                        .set('list', list)
                        .set('ai', function() {
                        var player = _status.event.player,
                            list = _status.event.list;
                        var sha = player.countCards('hs', function(card) {
                            return get.name(card) == 'sha' && player.hasValueTarget(card, null, true);
                        });
                        var max = player.getCardUsable('sha');
                        if (sha <= max) {
                            var listx = list.slice(0)
                                .sort();
                            for (var i of listx) {
                                if (max + i >= sha) return list.indexOf(i);
                            }
                            return list.indexOf(Math.max.apply(Math, list))
                        }
                        return list.indexOf(Math.min.apply(Math, list));
                    });
                    'step 2'
                    var list = trigger.getParent()
                        ._shanduan;
                    var num = list[result.index];
                    if (!player.storage.shanduan_effect) player.storage.shanduan_effect = {};
                    player.storage.shanduan_effect.sha = num;
                    game.log(player, '给', '#g使用【杀】的次数上限', '分配的数值是', '#y' + num);
                    list.remove(num);
                    list.sort();
                    var f = 0;
                    for (var i = 0; i < list.length; i++) {
                        f += list[i] * Math.pow(10, list.length - 1 - i);
                    }
                    player.removeMark('shanduan_mark', player.countMark('shanduan_mark') - f);
                },
            },
            discard: {
                audio: 'shanduan',
                trigger: {
                    player: 'phaseDiscardBegin'
                },
                forced: true,
                locked: false,
                filter: function(event, player) {
                    var list = event.getParent()
                        ._shanduan;
                    return list && list.length > 0;
                },
                content: function() {
                    'step 0'
                    var list = trigger.getParent()
                        ._shanduan;
                    if (list.length == 1) event._result = {
                        index: 0
                    };
                    else player.chooseControl(list)
                        .set('prompt', '善断：为手牌上限基数分配一个数值')
                        .set('choice', list.indexOf(Math.max.apply(Math, list)))
                        .set('ai', () => _status.event.choice);
                    'step 1'
                    var list = trigger.getParent()
                        ._shanduan;
                    var num = list[result.index];
                    if (!player.storage.shanduan_effect) player.storage.shanduan_effect = {};
                    player.storage.shanduan_effect.limit = num;
                    player.addTempSkill('shanduan_effect');
                    list.remove(num);
                    player.removeMark('shanduan_mark', player.countMark('shanduan_mark'));
                    game.log(player, '给', '#g手牌上限的基数', '分配的数值是', '#y' + num);
                },
            },
            effect: {
                charlotte: true,
                onremove: true,
                mod: {
                    attackRangeBase: function(player) {
                        var map = player.storage.shanduan_effect;
                        if (typeof map.range != 'number') return;
                        var range = 1;
                        var equips = player.getCards('e', function(card) {
                            return !ui.selected.cards || !ui.selected.cards.contains(card);
                        });
                        for (var i = 0; i < equips.length; i++) {
                            var info = get.info(equips[i], false)
                                .distance;
                            if (!info) continue;
                            if (info.attackFrom) {
                                range -= info.attackFrom;
                            }
                        }
                        return Math.max(range, map.range);
                    },
                    cardUsable: function(card, player, num) {
                        if (card.name == 'sha') {
                            var map = player.storage.shanduan_effect;
                            if (typeof map.sha != 'number') return;
                            return num - 1 + map.sha;
                        }
                    },
                    maxHandcardBase: function(player, num) {
                        var map = player.storage.shanduan_effect;
                        if (typeof map.limit != 'number') return;
                        return map.limit;
                    },
                },
            },
            update: {
                trigger: {
                    player: 'phaseAfter'
                },
                forced: true,
                silent: true,
                content: function() {
                    if (player.countMark('shanduan_mark') > 1234) player.removeMark('shanduan_mark', player.countMark('shanduan_mark') - 1234);
                    if (player.countMark('shanduan_mark') < 1234) player.addMark('shanduan_mark', 1234 - player.countMark('shanduan_mark'), false);
                },
            },
            mark: {
                mark: true,
                marktext: "善断",
                intro: {},
                init: function(player) {
                    player.addMark('shanduan_mark', 1234, false);
                },
                onremove: function(player) {
                    player.unmarkSkill('shanduan_mark');
                },
                sub: true,
            },
        },
    },
    lib.skill.clansankuang = {
        audio: 2,
        trigger: {
            player: 'useCardAfter'
        },
        direct: true,
        forced: true,
        filter: function(event, player) {
            var card = event.card,
                type = get.type2(card);
            for (var i = player.actionHistory.length - 1; i >= 0; i--) {
                var history = player.actionHistory[i].useCard;
                for (var evt of history) {
                    if (evt == event) continue;
                    if (get.type2(evt.card) == type) return false;
                }
                if (player.actionHistory[i].isRound) break;
            }
            if (!player.storage.clansankuang_marked) player.storage.clansankuang_marked = [];
            if (!player.storage.clansankuang_marked.contains(type)) player.storage.clansankuang_marked.add(type);
            player.addTempSkill("clansankuang_mark2", 'roundStart');
            player.storage.clansankuang_mark2 = '';
            var str = '';
            if (player.storage.clansankuang_marked.contains('basic')) str += '基';
            if (player.storage.clansankuang_marked.contains('trick')) str += '锦';
            if (player.storage.clansankuang_marked.contains('equip')) str += '装';
            player.addMark('clansankuang_mark2', str);
            return true;
        },
        getNum: function(player) {
            return (player.countCards('ej') > 0) + (player.isDamaged()) + (Math.max(0, player.hp) < player.countCards('h'));
        },
        content: function() {
            'step 0'
            player.chooseTarget('三恇：选择一名其他角色', '令其交给你至少X张牌，然后其获得' + get.translation(trigger.cards.filterInD('ejod')) + '（X为以下条件中其满足的项数：场上有牌、已受伤、体力值小于手牌数）', true, lib.filter.notMe)
                .set('ai', target => {
                var att = get.attitude(player, target),
                    num = lib.skill.clansankuang.getNum(target);
                if (num == 0) return att;
                if (_status.event.goon) return -att;
                return -Math.sqrt(Math.abs(att)) - lib.skill.clansankuang.getNum(target);
            })
                .set('goon', Math.max.apply(Math, trigger.cards.map(i => get.value(i))) <= 5 || trigger.cards.filterInD('ejod')
                .length == 0)
            'step 1'
            if (result.bool) {
                var target = result.targets[0],
                    num = lib.skill.clansankuang.getNum(target),
                    num2 = target.countCards('he');
                event.target = target;
                player.logSkill('clansankuang', target);
                if (num == 0 || num2 == 0) event._result = {
                    bool: false
                };
                else if (num2 <= num) event._result = {
                    bool: true,
                    cards: target.getCards('he')
                };
                else target.chooseCard('he', true, [num, Infinity])
                    .set('ai', get.unuseful);
            } else event.finish();
            'step 2'
            if (result.bool) {
                var cards = result.cards;
                target.give(cards, player);
                game.delayx();
            }
            'step 3'
            if (!player.storage.clansankuang_mark) {
                player.storage.clansankuang_mark = true;
                player.storage.clansankuang_mark = '';
                player.addMark("clansankuang_mark", get.translation(target));
            }
            if (trigger.cards.filterInD('ej')
                .length) target.gain(trigger.cards.filterInD('ejod'), get.owner(trigger.cards.filterInD('ej')[0]), 'giveAuto', 'bySelf');
            else if (trigger.cards.filterInD('od')
                .length) target.gain(trigger.cards.filterInD('od'), 'gain2', 'bySelf');
        },
        subSkill: {
            mark: {
                mark: true,
                marktext: "卑势",
                intro: {},
                sub: true,
                onremove: true
            },
            mark2: {
                marktext: '三恇 ',
                intro: {},
                charlotte: true,
                mark: true,
                onremove: function(player) {
                    delete player.storage.clansankuang_marked;
                },
            },
        },
        ai: {
            reverseOrder: true,
            skillTagFilter: function(player) {
                if (player.getHistory('useCard', evt => get.type(evt.card) == 'equip')
                    .length > 0) return false;
            },
            effect: {
                target: function(card, player, target) {
                    if (player == target && get.type(card) == 'equip' && !player.getHistory('useCard', evt => get.type(evt.card) == 'equip')
                        .length == 0) return [1, 3];
                },
            },
            threaten: 1.6,
        },
    };
    lib.skill.dcbingji = {
        audio: 2,
        enable: 'phaseUse',
        //usable:4,
        filter: function(event, player) {
            var hs = player.getCards('h'),
                suits = player.getStorage('dcbingji_mark');
            if (!hs.length) return false;
            var suit = get.suit(hs[0], player);
            if (suit == 'none' || suits.contains(suit)) return false;
            for (var i = 1; i < hs.length; i++) {
                if (get.suit(hs[i], player) != suit) return false;
            }
            return true;
        },
        ai: {
            order: 10,
            result: {
                player: 1
            },
        },
        chooseButton: {
            dialog: function(event, player) {
                return ui.create.dialog('秉纪', [
                    ['sha', 'tao'], 'vcard'], 'hidden');
            },
            filter: function(button, player) {
                return lib.filter.cardEnabled({
                    name: button.link[2],
                    isCard: true,
                    storage: {
                        dcbingji: true
                    },
                }, player, 'forceEnable');
            },
            check: function(button) {
                var card = {
                    name: button.link[2],
                    isCard: true,
                    storage: {
                        dcbingji: true
                    },
                }, player = _status.event.player;
                return Math.max.apply(Math, game.filterPlayer(function(target) {
                    if (player == target) return false;
                    return lib.filter.targetEnabled2(card, player, target) && lib.filter.targetInRange(card, player, target);
                })
                    .map(function(target) {
                    return get.effect(target, card, player, player);
                }));
            },
            backup: function(links, player) {
                return {
                    viewAs: {
                        name: links[0][2],
                        isCard: true,
                        storage: {
                            dcbingji: true
                        },
                    },
                    filterCard: () => false,
                    selectCard: -1,
                    filterTarget: function(card, player, target) {
                        if (!card) card = get.card();
                        if (player == target) return false;
                        return lib.filter.targetEnabled2(card, player, target) && lib.filter.targetInRange(card, player, target);
                    },
                    selectTarget: 1,
                    ignoreMod: true,
                    filterOk: () => true,
                    precontent: function() {
                        player.logSkill('dcbingji');
                        delete event.result.skill;
                        var hs = player.getCards('h');
                        player.showCards(hs, get.translation(player) + '发动了【秉纪】');
                        player.markAuto('dcbingji_mark', [get.suit(hs[0], player)]);
                        player.addTempSkill('dcbingji_mark');
                        player.addTempSkill("dcbingji_1");
                        if (!player.storage.dcbingji_1mark) player.storage.dcbingji_1mark = [];
                        player.storage.dcbingji_1mark.add(get.suit(hs[0], player));
                        var str = '';
                        str = player.storage.dcbingji_1mark.sortBySuit()
                            .join('');
                        /*    if(player.storage.dcbingji_1mark.indexOf('heart')!=-1)str+='♥️';
                    if(player.storage.dcbingji_1mark.indexOf('diamond')!=-1)str+='♦️️';
                    if(player.storage.dcbingji_1mark.indexOf('spade')!=-1)str+='♠️️';
                    if(player.storage.dcbingji_1mark.indexOf('club')!=-1)str+='♣️️';*/
                        player.storage.dcbingji_1 = '';
                        player.addMark("dcbingji_1", str);
                    },
                }
            },
            prompt: function(links, player) {
                return '请选择【' + get.translation(links[0][2]) + '】的目标';
            },
        },
        subSkill: {
            mark: {
                charlotte: true,
                onremove: true,
                trigger: {
                    player: 'useCard1'
                },
                forced: true,
                popup: false,
                firstDo: true,
                filter: function(event, player) {
                    return event.addCount !== false && event.card.name == 'sha' && event.card.storage && event.card.storage.dcbingji;
                },
                content: function() {
                    trigger.addCount = false;
                    player.getStat('card')
                        .sha--;
                },
            },
            1: {
                marktext: '秉纪',
                intro: {
                    name: '秉纪',
                },
                charlotte: true,
                onremove: function(player) {
                    player.removeMark('dcbingji_1');
                    delete player.storage.dcbingji_1mark;
                },
            },
        },
    }
    //去手杀ui skill main1 里搜索self.querySelector 上面加一行if(item.id=='twjichou_give') return;
    lib.skill.twjichou = {
        audio: 2,
        enable: 'chooseToUse',
        group: ['twjichou_ban', 'twjichou_give'],
        filter: function(event, player) {
            if (player.hasSkill('twjichou_used') && player.hasSkill('twjichou_given')) return false;
            if (!player.hasSkill('twjichou_used')) {
                var record = player.getStorage('twjichou');
                for (var i of lib.inpile) {
                    var type = get.type(i);
                    if (type == 'trick' && !record.contains(i) && event.filterCard({
                        name: i,
                        isCard: true
                    }, player, event)) return true;
                }
            }
            return !player.hasSkill('twjichou_given') && player.countCards('h', i => player.getStorage('twjichou')
                .contains(get.name(i))) && event.type == 'phase';
            return false;
        },
        chooseButton: {
            dialog: function(event, player) {
                var dialog = ui.create.dialog('急筹');
                if (!player.hasSkill('twjichou_given') && event.type == 'phase' && player.countCards('h', card => {
                    return player.getStorage('twjichou')
                        .contains(get.name(card));
                })) {
                    dialog._chosenOpt = [];
                    var table = document.createElement('div');
                    table.classList.add('add-setting');
                    table.style.margin = '0';
                    table.style.width = '100%';
                    table.style.position = 'relative';
                    var list = ['视为使用牌', '交出锦囊牌'];
                    for (var i of list) {
                        var td = ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
                        td.innerHTML = '<span>' + i + '</span>';
                        td.link = i;
                        if (i == list[0]) {
                            td.classList.add('bluebg');
                            dialog._chosenOpt.add(td);
                        }
                        td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function() {
                            if (_status.dragged) return;
                            if (_status.clicked) return;
                            if (_status.justdragged) return;
                            _status.tempNoButton = true;
                            _status.clicked = true;
                            setTimeout(function() {
                                _status.tempNoButton = false;
                            }, 500);
                            var link = this.link;
                            if (link == '交出锦囊牌') game.uncheck();
                            var current = this.parentNode.querySelector('.bluebg');
                            if (current) {
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
                }
                var list = [],
                    record = player.getStorage('twjichou');
                for (var name of lib.inpile) {
                    if (get.type(name) == 'trick' && !record.contains(name) && event.filterCard({
                        name: name,
                        isCard: true
                    }, player, event)) list.push(['锦囊', '', name]);
                }
                dialog.add([list, 'vcard']);
                return dialog;
            },
            filter: function(button, player) {
                var opts = _status.event.dialog._chosenOpt;
                if (opts && opts.length && opts[0].link == '交出锦囊牌' && typeof button.link != typeof opts[0].link) {
                    return false;
                }
                if (opts && opts.length && opts[0].link == '视为使用牌' && typeof button.link != typeof opts[0].link && player.hasSkill('twjichou_used')) {
                    return false;
                }
                return true;
            },
            select: function() {
                var opts = _status.event.dialog._chosenOpt;
                return opts && opts.length && opts[0].link == '交出锦囊牌' ? 0 : 1;
            },
            check: function(button) {
                if (_status.event.getParent()
                    .type != 'phase') return 1;
                var player = _status.event.player;
                if (['wugu', 'zhulu_card', 'yiyi', 'lulitongxin', 'lianjunshengyan', 'diaohulishan'].contains(button.link[2])) return 0.1;
                return player.getUseValue({
                    name: button.link[2]
                });
            },
            backup: function(links, player) {
                var isUse = links.length == 1;
                var backup = get.copy(lib.skill['twjichou_' + (isUse ? 'use' : 'give')]);
                if (isUse) backup.viewAs = {
                    name: links[0][2],
                    isCard: true
                };
                return backup;
            },
            prompt: function(links, player) {
                var isUse = links.length == 1;
                return '急筹：' + (isUse ? ('视为使用' + get.translation(links[0][2]) + '') : '选择要交出的牌和要交给的目标');
            }
        },
        hiddenCard: function(player, name) {
            if (player.hasSkill('twjichou_used')) return false;
            var type = get.type(name);
            return type == 'trick' && !player.getStorage('twjichou')
                .contains(name);
        },
        marktext: '筹',
        intro: {
            markcount: function(storage, player) {
                if (storage && storage.length) return storage.length;
                return 0;
            },
            content: '已记录牌名：$',
        },
        ai: {
            order: 1,
            result: {
                player: function(player) {
                    if (_status.event.dying) return get.attitude(player, _status.event.dying);
                    return 1;
                },
            },
        },
        subSkill: {
            backup: {},
            used: {
                charlotte: true
            },
            given: {
                charlotte: true
            },
            ban: {
                trigger: {
                    global: 'useCard1'
                },
                filter: function(event, player) {
                    return player.getStorage('twjichou')
                        .contains(event.card.name);
                },
                forced: true,
                locked: false,
                silent: true,
                content: function() {
                    trigger.directHit.add(player);
                },
                mod: {
                    cardEnabled: function(card, player) {
                        if (player.getStorage('twjichou')
                            .contains(card.name) && (get.position(card) == 'h' || card.cards && card.cards.some(i => get.position(i) == 'h'))) return false;
                    },
                    cardSavable: function(card, player) {
                        if (player.getStorage('twjichou')
                            .contains(card.name) && (get.position(card) == 'h' || card.cards && card.cards.some(i => get.position(i) == 'h'))) return false;
                    },
                    aiValue: function(player, card) {
                        if (get.type(card) != 'trick' || _status.twjichou_give_aiCheck) return;
                        if (!player.getFriends()
                            .length && player.getStorage('twjichou')
                            .contains(get.name(card))) return 0;
                    },
                    aiUseful: function() {
                        return lib.skill.twjichou_ban.mod.aiValue.apply(this, arguments);
                    },
                },
            },
            use: {
                filterCard: () => false,
                selectCard: -1,
                audio: 'twjichou',
                popname: true,
                onuse: function(links, player) {
                    player.markAuto('twjichou', [links.card.name]);
                    player.syncStorage('twjichou');
                    player.addTempSkill('twjichou_used');
                },
            },
            give: {
                audio: 'twjichou',
                enable: 'phaseUse',
                filter: function(event, player) {
                    return !player.hasSkill('twjichou_given') && player.countCards('h', i => player.getStorage('twjichou')
                        .contains(get.name(i)));
                },
                filterTarget: function(card, player, target) {
                    return target != player;
                },
                filterCard: function(card, player) {
                    return player.getStorage('twjichou')
                        .contains(get.name(card));
                },
                check: function(card) {
                    _status.twjichou_give_aiCheck = true;
                    var val = get.value(card);
                    delete _status.twjichou_give_aiCheck;
                    return val;
                },
                prompt: () => '选择要交出的牌和要交给的目标',
                selectCard: 1,
                discard: false,
                lose: false,
                delay: false,
                content: function() {
                    player.give(cards, target);
                    player.addTempSkill('twjichou_given', 'phaseUseAfter');
                },
                ai: {
                    order: 0.9,
                    result: {
                        target: function(player, target) {
                            if (target.hasSkillTag('nogain')) return 0;
                            if (target.hasJudge('lebu')) return 0;
                            return target.getCards('h', card => player.getStorage('twjichou')
                                .contains(get.name(card)))
                                .reduce((p, c) => p + (target.getUseValue(c) || 1), 0);
                        }
                    },
                }
            },
        }
    };
    lib.skill.jianying = {
        audio: 2,
        locked: false,
        mod: {
            aiOrder: function(player, card, num) {
                if (typeof card == 'object' && player.isPhaseUsing()) {
                    var evt = player.getLastUsed();
                    if (evt && evt.card && (get.suit(evt.card) && get.suit(evt.card) == get.suit(card) || evt.card.number && evt.card.number == card.number)) {
                        return num + 10;
                    }
                }
            },
        },
        trigger: {
            player: 'useCard'
        },
        frequent: true,
        filter: function(event, player) {
            var evt = player.getLastUsed(1);
            if (!player.isPhaseUsing()) return false;
            var suit = get.translation(get.suit(event.card)),
                num = get.strNumber(event.card.number)
                var str = suit + num;
            // str=str.toString();
            player.storage.jianying_mm = str;
            player.storage.jianying_mark = '';
            player.addMark('jianying_mark', str);
            player.addTempSkill('jianying_re');
            if (!evt || !evt.card) return false;
            var evt2 = evt.getParent('phaseUse');
            if (!evt2 || evt2.name != 'phaseUse' || evt2.player != player) return false;
            return get.suit(evt.card) && get.suit(evt.card) == get.suit(event.card) || evt.card.number && evt.card.number == event.card.number;
        },
        content: function() {
            player.draw();

        },
        subSkill: {
            mark: {
                onremove: function(player) {
                    delete player.storage.jianying_mark;
                },
                intro: {
                    content: function(s, p) {
                        var str = '上个花色点数为：';
                        str += p.storage.jianying_mm;
                        return str;
                    }
                }
            },
            re: {
                onremove: function(player) {
                    player.removeMark('jianying_mark');
                },
            },
        },
    };
    //==========尚俭==========//
    lib.skill.xinfu_shangjian = {
        trigger: {
            global: "phaseJieshuBegin",
            player: "loseAfter",
        },
        audio: 2,
        filter: function (event, player) {
            var num = 0;
            player.getHistory('lose', function (evt) {
                var evt2 = evt.getParent();
                if (evt2.name == 'useCard' && evt2.player == player && get.type(evt2.card, null, false) == 'equip') return;
                if (evt.cards2) num += evt.cards2.length;
            });
            player.storage.xinfu_shangjian_mark = num;
            player.addTempSkill('xinfu_shangjian_mark');
            player.markSkill('xinfu_shangjian_mark');

            if (event.name == 'phaseJieshu') return num > 0 && num <= player.hp
        },
        forced: true,
        content: function () {
            'step 0'
            var num = 0;
            player.getHistory('lose', function (evt) {
                var evt2 = evt.getParent();
                if (evt2.name == 'useCard' && evt2.player == player && get.type(evt2.card, null, false) == 'equip') return;
                if (evt.cards2) num += evt.cards2.length;
            });
            if (player.storage.xinfu_shangjian_mark > 0) player.draw(player.storage.xinfu_shangjian_mark);
        },
        subSkill: {
            mark: {
                onremove: function (player) {
                    delete player.storage.xinfu_shangjian_mark;
                },
                intro: {
                    content: function (s, p) {
                        var str = '已经使用牌数：';
                        str += get.translation(p.storage.xinfu_shangjian_mark);
                        return str;
                    }
                }
            },
        },
    };
    //==========尚俭==========//
    lib.skill.reluanji = {
        audio: 2,
        enable: 'phaseUse',
        viewAs: {
            name: 'wanjian'
        },
        filterCard: function(card, player) {
            if (!player.storage.reluanji) return true;
            return !player.storage.reluanji.contains(get.suit(card));
        },
        position: 'hs',
        selectCard: 2,
        check: function(card) {
            var player = _status.event.player;
            var targets = game.filterPlayer(function(current) {
                return player.canUse('wanjian', current);
            });
            var num = 0;
            for (var i = 0; i < targets.length; i++) {
                var eff = get.sgn(get.effect(targets[i], {
                    name: 'wanjian'
                }, player, player));
                if (targets[i].hp == 1) {
                    eff *= 1.5;
                }
                num += eff;
            }
            if (!player.needsToDiscard(-1)) {
                if (targets.length >= 7) {
                    if (num < 2) return 0;
                } else if (targets.length >= 5) {
                    if (num < 1.5) return 0;
                }
            }
            return 6 - get.value(card);
        },
        ai: {
            basic: {
                order: 8.9
            }
        },
        group: ['reluanji_count', 'reluanji_reset', 'reluanji_respond', 'reluanji_damage', 'reluanji_draw'],
        subSkill: {
            reset: {
                trigger: {
                    player: 'phaseAfter'
                },
                silent: true,
                content: function() {
                    delete player.storage.reluanji;
                    delete player.storage.reluanji2;
                }
            },
            count: {
                trigger: {
                    player: 'useCard'
                },
                silent: true,
                filter: function(event) {
                    return event.skill == 'reluanji';
                },
                content: function() {
                    player.storage.reluanji2 = trigger.card;
                    if (!player.storage.reluanji) {
                        player.storage.reluanji = [];
                        player.storage.reluanji_mark = [];
                    }
                    for (var i = 0; i < trigger.cards.length; i++) {
                        player.storage.reluanji.add(get.suit(trigger.cards[i]));

                        var color = get.suit(trigger.cards[i]);
                        if (!player.storage.reluanji_mark.contains(color)) {
                            player.storage.reluanji_mark.push(color);
                        }
                    }
                    player.storage.reluanji_mark.sort();
                    var str = '';
                    for (var color of player.storage.reluanji_mark) {
                        str += get.translation(color);
                    };
                    player.storage.reluanji_mark2 = '';
                    player.addMark('reluanji_mark2', str);
                    player.addTempSkill('reluanji_mark');
                }
            },
            respond: {
                trigger: {
                    global: 'respond'
                },
                silent: true,
                filter: function(event) {
                    return event.getParent(2)
                        .skill == 'reluanji';
                },
                content: function() {
                    trigger.player.draw();
                }
            },
            damage: {
                trigger: {
                    source: 'damage'
                },
                forced: true,
                silent: true,
                popup: false,
                filter: function(event, player) {
                    return player.storage.reluanji2 && event.card == player.storage.reluanji2;
                },
                content: function() {
                    delete player.storage.reluanji2;
                },
            },
            draw: {
                trigger: {
                    player: 'useCardAfter'
                },
                forced: true,
                silent: true,
                popup: false,
                filter: function(event, player) {
                    return player.storage.reluanji2 && event.card == player.storage.reluanji2;
                },
                content: function() {
                    player.draw(trigger.targets.length);
                    delete player.storage.reluanji2;
                },
            },
            mark: {
                onremove: function(player) {
                    player.removeMark('reluanji_mark2');
                },
            },
            mark2: {
                intro: {
                    content: function(storage, player, skill) {
                        var str = '';
                        for (var color of player.storage.reluanji_mark) {
                            str += get.translation(color);
                        }
                        return str;
                    }
                }
            },
        }
    };
    lib.skill.gzjili = { //蒺藜
        mod: {
            aiOrder: function(player, card, num) {
                if (player.isPhaseUsing() && get.subtype(card) == 'equip1' && !get.cardtag(card, 'gifts')) {
                    var range0 = player.getAttackRange();
                    var range = 0;
                    var info = get.info(card);
                    if (info && info.distance && info.distance.attackFrom) {
                        range -= info.distance.attackFrom;
                    }
                    if (player.getEquip(1)) {
                        var num = 0;
                        var info = get.info(player.getEquip(1));
                        if (info && info.distance && info.distance.attackFrom) {
                            num -= info.distance.attackFrom;
                        }
                        range0 -= num;
                    }
                    range0 += range;
                    if (range0 == (player.getHistory('useCard')
                        .length + player.getHistory('respond')
                        .length + 2) && player.countCards('h', function(cardx) {
                        return get.subtype(cardx) != 'equip1' && player.getUseValue(cardx) > 0;
                    })) return num + 10;
                }
            },
        },
        trigger: {
            player: ['useCard', 'respond']
        },
        frequent: true,
        locked: false,
        preHidden: true,
        filter: function(event, player) {
            player.storage.gzjili_mark = player.getHistory('useCard')
                .length + player.getHistory('respond')
                .length - 1;
            player.addMark('gzjili_mark');
            player.addTempSkill('gzjili_mark');
            // player.markSkill('gzjili_mark');
            return player.getHistory('useCard')
                .length + player.getHistory('respond')
                .length == player.getAttackRange();
        },
        audio: 2,
        content: function() {
            player.draw(player.getHistory('useCard')
                .length + player.getHistory('respond')
                .length);
        },
        subSkill: {
            mark: {
                intro: {
                    content: function(storage, player, skill) {
                        var str = '已使用牌数为：' + (player.getHistory('useCard')
                            .length + player.getHistory('respond')
                            .length);
                        return str.slice(0);
                    }
                },
                onremove: function(player) {
                    var num = player.countMark('gzjili_mark');
                    player.removeMark('gzjili_mark', num);
                },
            },
        },
        ai: {
            threaten: 1.8,
            effect: {
                target: function(card, player, target, current) {
                    if (player != target || !player.isPhaseUsing()) return;
                    if (get.subtype(card) == 'equip1' && !get.cardtag(card, 'gifts')) {
                        var range0 = player.getAttackRange();
                        var range = 0;
                        var info = get.info(card);
                        if (info && info.distance && info.distance.attackFrom) {
                            range -= info.distance.attackFrom;
                        }
                        if (player.getEquip(1)) {
                            var num = 0;
                            var info = get.info(player.getEquip(1));
                            if (info && info.distance && info.distance.attackFrom) {
                                num -= info.distance.attackFrom;
                            }
                            range0 -= num;
                        }
                        range0 += range;
                        var delta = range0 - (player.getHistory('useCard')
                            .length + player.getHistory('respond')
                            .length);
                        if (delta < 0) return;
                        var num = player.countCards('h', function(card) {
                            return (get.cardtag(card, 'gifts') || get.subtype(card) != 'equip1') && player.getUseValue(card) > 0;
                        });
                        if (delta == 2 && num > 0) return [1, 3];
                        if (num >= delta) return 'zeroplayertarget';
                    }
                },
            },
        }
    };
    //龙胆
    lib.skill.longdan = {
        mod: {
            aiValue: function(player, card, num) {
                if (card.name != 'sha' && card.name != 'shan') return;
                var geti = function() {
                    var cards = player.getCards('hs', function(card) {
                        return card.name == 'sha' || card.name == 'shan';
                    });
                    if (cards.contains(card)) {
                        return cards.indexOf(card);
                    }
                    return cards.length;
                };
                return Math.max(num, [7, 5, 5, 3][Math.min(geti(), 3)]);
            },
            aiUseful: function() {
                return lib.skill.ollongdan.mod.aiValue.apply(this, arguments);
            },
        },
        locked: false,
        audio: "longdan_sha",
        audioname:['re_zhaoyun','huan_zhaoyun'],
		audioname2:{tongyuan:'longdan_tongyuan'},
        /*"audioname2":{
            tongyuan:"longdan_tongyuan",
        },*/
        enable: ["chooseToUse", "chooseToRespond"],
        position: "hs",
        prompt: "将杀当做闪，或将闪当做杀",
        viewAs: function(cards, player) {
            var name = false;
            switch (get.name(cards[0], player)) {
                case 'sha':
                    name = 'shan';
                    break;
                case 'shan':
                    name = 'sha';
                    break;
            }
            if (name) return {
                name: name
            };
            return null;
        },
        check: function() {
            return 1
        },
        filterCard: function(card, player, event) {
            event = event || _status.event;
            var filter = event._backup.filterCard;
            var name = get.name(card, player);
            if (name == 'sha' && filter({
                name: 'shan',
                cards: [card]
            }, player, event)) return true;
            if (name == 'shan' && filter({
                name: 'sha',
                cards: [card]
            }, player, event)) return true;
            return false;
        },
        filter: function(event, player) {
            var filter = event.filterCard;
            if (filter({
                name: 'sha'
            }, player, event) && player.countCards('hs', 'shan')) return true;
            if (filter({
                name: 'shan'
            }, player, event) && player.countCards('hs', 'sha')) return true;
            return false;
        },
        subSkill: {
            sha: {},
        },
        ai: {
            respondSha: true,
            respondShan: true,
            skillTagFilter: function(player, tag) {
                var name;
                switch (tag) {
                    case 'respondSha':
                        name = 'shan';
                        break;
                    case 'respondShan':
                        name = 'sha';
                        break;
                }
                if (!player.countCards('hs', name)) return false;
            },
            order: function(item, player) {
                if (player && _status.event.type == 'phase') {
                    var max = 0;
                    var list = ['sha'];
                    var map = {
                        sha: 'shan'
                    }
                    for (var i = 0; i < list.length; i++) {
                        var name = list[i];
                        if (player.countCards('hs', map[name]) > (name == 'jiu' ? 1 : 0) && player.getUseValue({
                            name: name
                        }) > 0) {
                            var temp = get.order({
                                name: name
                            });
                            if (temp > max) max = temp;
                        }
                    }
                    if (max > 0) max += 0.3;
                    return max;
                }
                return 4;
            },
        },
    };
    lib.skill.nzry_shicai_2 = {};
    lib.skill.nzry_shicai = {
        audio: "nzry_shicai_2",
        trigger: {
            player: ['useCardAfter'],
            target: 'useCardToTargeted',
        },
        filter: function(event, player, name) {
            if (name == 'useCardToTargeted' && ('equip' != get.type(event.card) || event.player != player)) return false;
            if (name == 'useCardAfter' && ['equip', 'delay'].contains(get.type(event.card))) return false;
            if (event.cards.filterInD()
                .length <= 0) return false;
            var history = player.getHistory('useCard');
            var evt = name == 'useCardAfter' ? event : event.getParent();
            for (var i = 0; i < history.length; i++) {
                if (history[i] != evt && get.type2(history[i].card) == get.type2(event.card)) return false;
                else if (history[i] == evt) return true;
            }
            return false;
        },
        check: function(event, player) {
            if (get.type(event.card) == 'equip') {
                if (get.subtype(event.card) == 'equip6') return true;
                if (get.equipResult(player, event.target, event.card.name) <= 0) return true;
                var eff1 = player.getUseValue(event.card);
                var subtype = get.subtype(event.card);
                return player.countCards('h', function(card) {
                    return get.subtype(card) == subtype && player.getUseValue(card) >= eff1;
                }) > 0;
            }
            return true;
        },
        content: function() {
            "step 0"
            event.cards = trigger.cards.filterInD();
            if (event.cards.length > 1) {
                var next = player.chooseToMove('恃才：将牌按顺序置于牌堆顶');
                next.set('list', [
                    ['牌堆顶', event.cards]
                ]);
                next.set('reverse', ((_status.currentPhase && _status.currentPhase.next) ? get.attitude(player, _status.currentPhase.next) > 0 : false));
                next.set('processAI', function(list) {
                    var cards = list[0][1].slice(0);
                    cards.sort(function(a, b) {
                        return (_status.event.reverse ? 1 : -1) * (get.value(b) - get.value(a));
                    });
                    return [cards];
                });
            }
            "step 1"
            if (result.bool && result.moved && result.moved[0].length) cards = result.moved[0].slice(0);
            while (cards.length) {
                var card = cards.pop();
                if (get.position(card, true) == 'o') {
                    card.fix();
                    ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
                    game.log(player, '将', card, '置于牌堆顶');
                }
            }
            game.updateRoundNumber();
            player.draw();
            player.addTempSkill('nzry_shicai_mark');
            var type = get.type(trigger.card);
            if (!player.storage.nzry_shicai_mark1) player.storage.nzry_shicai_mark1 = [];
            player.storage.nzry_shicai_mark1.push(type);
            var num = player.storage.nzry_shicai_mark1.sortByType()
                .join('');
            /*   var str;
            if (type == 'trick') str = '锦';
            else if (type == 'basic') str = '基';
            else str = '装';*/
            /*   var num = '';
            if (player.storage.nzry_shicai_mark1.indexOf(str) == -1) player.storage.nzry_shicai_mark1 += str;
            if (player.storage.nzry_shicai_mark1.indexOf('基') != -1) num += '基';
            if (player.storage.nzry_shicai_mark1.indexOf('锦') != -1) num += '锦';
            if (player.storage.nzry_shicai_mark1.indexOf('装') != -1) num += '装';*/
            player.storage.nzry_shicai_mark = '';
            player.addMark('nzry_shicai_mark', num);
        },
        subSkill: {
            mark: {
                intro: {
                    content: function(storage, player, skill) {
                        return player.storage.nzry_shicai_mark1;
                    }
                },
                onremove: function(player) {
                    player.removeMark('nzry_shicai_mark');
                    delete player.storage.nzry_shicai_mark1;
                },
            },
        },
    };
    lib.translate.xinfu_falu_spade = '紫薇',
    lib.translate.xinfu_falu_heart = '玉清',
    lib.translate.xinfu_falu_club = '后土',
    lib.translate.xinfu_falu_diamond = '勾陈',
    lib.skill.xinfu_falu = {
        subSkill: {
            spade: {},
            spade1: {
                marktext: "紫薇︎️",
                intro: {
                    name: "紫薇",
                    content: "♠️，修改判定",
                },
                sub: true,
            },
            heart: {},
            heart1: {
                marktext: "玉清︎️",
                intro: {
                    name: "玉清",
                    content: "♥️，伤害+1"
                },
                sub: true,
            },
            club: {},
            club1: {
                marktext: "后土",
                intro: {
                    name: "后土",
                    content: "♣️️️，吃个桃子",
                },
                sub: true,
            },
            diamond: {},
            diamond1: {
                marktext: "勾陈",
                intro: {
                    name: "勾陈",
                    content: "♦️，得牌+3",
                },
                sub: true,
            },
        },
        forced: true,
        audio: 2,
        trigger: {
            player: ["loseAfter", "enterGame"],
            global: "phaseBefore",
        },
        filter: function(event, player) {
            if (event.name != 'lose') return (event.name != 'phase' || game.phaseNumber == 0);
            if (event.type != 'discard') return false;
            for (var i = 0; i < event.cards2.length; i++) {
                if (!player.hasMark('xinfu_falu_' + get.suit(event.cards2[i]))) return true;
            }
            return false;
        },
        content: function() {
            if (trigger.name != 'lose') {
                for (var i = 0; i < lib.suit.length; i++) {
                    if (!player.hasMark('xinfu_falu_' + lib.suit[i])) player.addMark('xinfu_falu_' + lib.suit[i]);
                    player.markSkill('xinfu_falu_' + lib.suit[i] + '1');
                }
                return;
            }
            for (var i = 0; i < trigger.cards2.length; i++) {
                var suit = get.suit(trigger.cards2[i]);
                if (!player.hasMark('xinfu_falu_' + suit)) player.addMark('xinfu_falu_' + suit);
                player.markSkill('xinfu_falu_' + suit + '1');
            }
        },
        ai: {
            threaten: 1.4,
        },
    };
    lib.skill.xinfu_zhenyi = {
        group: ["zhenyi_spade", "zhenyi_club", "zhenyi_heart"],
        trigger: {
            player: "damageEnd",
        },
        audio: 2,
        filter: function(event, player) {
            return player.hasMark('xinfu_falu_diamond');
        },
        "prompt2": "弃置「勾陈♦」标记，从牌堆中获得每种类型的牌各一张。",
        content: function() {
            'step 0'
            player.removeMark('xinfu_falu_diamond');
            player.unmarkSkill('xinfu_falu_diamond1');
            event.num = 0;
            event.togain = [];
            'step 1'
            var card = get.cardPile(function(card) {
                for (var i = 0; i < event.togain.length; i++) {
                    if (get.type(card, 'trick') == get.type(event.togain[i], 'trick')) return false;
                }
                return true;
            });
            if (card) {
                event.togain.push(card);
                event.num++;
                if (event.num < 3) event.redo();
            }
            'step 2'
            if (event.togain.length) {
                player.gain(event.togain, 'gain2');
            }
        },
    };
    lib.skill.zhenyi_spade = {
        trigger: {
            global: "judge",
        },
        direct: true,
        filter: function(event, player) {
            return player.hasMark('xinfu_falu_spade');
        },
        content: function() {
            "step 0"
            var str = get.translation(trigger.player) + '的' + (trigger.judgestr || '') + '判定为' + get.translation(trigger.player.judging[0]) + '，是否发动【真仪】，弃置「紫薇♠」标记并修改判定结果？';
            player.chooseControl('spade', 'heart', 'diamond', 'club', 'cancel2')
                .set('prompt', str)
                .set('ai', function() {
                //return '取消';
                var judging = _status.event.judging;
                var trigger = _status.event.getTrigger();
                var res1 = trigger.judge(judging);
                var list = lib.suit.slice(0);
                var attitude = get.attitude(player, trigger.player);
                if (attitude == 0) return 0;
                var getj = function(suit) {
                    return trigger.judge({
                        name: get.name(judging),
                        nature: get.nature(judging),
                        suit: suit,
                        number: 5,
                    })
                };
                list.sort(function(a, b) {
                    return (getj(b) - getj(a)) * get.sgn(attitude);
                });
                if ((getj(list[0]) - res1) * attitude > 0) return list[0];
                return 'cancel2';
            })
                .set('judging', trigger.player.judging[0]);
            "step 1"
            if (result.control != 'cancel2') {
                player.addExpose(0.25);
                player.removeMark('xinfu_falu_spade');
                player.unmarkSkill('xinfu_falu_spade1');
                player.logSkill('xinfu_zhenyi', trigger.player);
                //player.line(trigger.player);
                player.popup(result.control);
                game.log(player, '将判定结果改为了', '#y' + get.translation(result.control + 2) + 5);
                trigger.fixedResult = {
                    suit: result.control,
                    color: get.color({
                        suit: result.control
                    }),
                    number: 5,
                };
            }
        },
        ai: {
            rejudge: true,
            tag: {
                rejudge: 1,
            },
            expose: 0.5,
        },
    };
    lib.skill.zhenyi_club = {
        audio: "xinfu_zhenyi",
        enable: "chooseToUse",
        viewAsFilter: function(player) {
            if (player == _status.currentPhase) return false;
            return player.hasMark('xinfu_falu_club') && player.countCards('hs') > 0;
        },
        filterCard: true,
        position: "hs",
        viewAs: {
            name: "tao",
        },
        prompt: "弃置「后土♣」标记，将一张手牌当桃使用",
        check: function(card) {
            return 15 - get.value(card)
        },
        precontent: function() {
            player.removeMark('xinfu_falu_club');
            player.unmarkSkill('xinfu_falu_club1');
        },
        ai: {
            basic: {
                order: function(card, player) {
                    if (player.hasSkillTag('pretao')) return 5;
                    return 2;
                },
                useful: [6.5, 4, 3, 2],
                value: [6.5, 4, 3, 2],
            },
            result: {
                target: 2,
                "target_use": function(player, target) {
                    // if(player==target&&player.hp<=0) return 2;
                    if (player.hasSkillTag('nokeep', true, null, true)) return 2;
                    var nd = player.needsToDiscard();
                    var keep = false;
                    if (nd <= 0) {
                        keep = true;
                    } else if (nd == 1 && target.hp >= 2 && target.countCards('h', 'tao') <= 1) {
                        keep = true;
                    }
                    var mode = get.mode();
                    if (target.hp >= 2 && keep && target.hasFriend()) {
                        if (target.hp > 2 || nd == 0) return 0;
                        if (target.hp == 2) {
                            if (game.hasPlayer(function(current) {
                                if (target != current && get.attitude(target, current) >= 3) {
                                    if (current.hp <= 1) return true;
                                    if ((mode == 'identity' || mode == 'versus' || mode == 'chess') && current.identity == 'zhu' && current.hp <= 2) return true;
                                }
                            })) {
                                return 0;
                            }
                        }
                    }
                    if (target.hp < 0 && target != player && target.identity != 'zhu') return 0;
                    var att = get.attitude(player, target);
                    if (att < 3 && att >= 0 && player != target) return 0;
                    var tri = _status.event.getTrigger();
                    if (mode == 'identity' && player.identity == 'fan' && target.identity == 'fan') {
                        if (tri && tri.name == 'dying' && tri.source && tri.source.identity == 'fan' && tri.source != target) {
                            var num = game.countPlayer(function(current) {
                                if (current.identity == 'fan') {
                                    return current.countCards('h', 'tao');
                                }
                            });
                            if (num > 1 && player == target) return 2;
                            return 0;
                        }
                    }
                    if (mode == 'identity' && player.identity == 'zhu' && target.identity == 'nei') {
                        if (tri && tri.name == 'dying' && tri.source && tri.source.identity == 'zhong') {
                            return 0;
                        }
                    }
                    if (mode == 'stone' && target.isMin() && player != target && tri && tri.name == 'dying' && player.side == target.side && tri.source != target.getEnemy()) {
                        return 0;
                    }
                    return 2;
                },
            },
            tag: {
                recover: 1,
                save: 1,
            },
        },
    };
    lib.skill.zhenyi_heart = {
        trigger: {
            source: "damageBegin1",
        },
        audio: "xinfu_zhenyi",
        filter: function(event, player) {
            return player.hasMark('xinfu_falu_heart');
        },
        check: function(event, player) {
            if (get.attitude(player, event.player) >= 0) return false;
            if (event.player.hasSkillTag('filterDamage', null, {
                player: player,
                card: event.card,
            })) return false;
            return true;
            //return player.hasMark('xinfu_falu_spade')||get.color(ui.cardPile.firstChild)=='black';
        },
        "prompt2": function(event) {
            return '弃置「玉清♥」标记，令对' + get.translation(event.player) + '即将造成的伤害+1。';
        },
        logTarget: "player",
        content: function() {
            player.removeMark('xinfu_falu_heart');
            player.unmarkSkill('xinfu_falu_heart1');
            trigger.num++;
        },
    };
    lib.skill.gongsun = {
        audio: 2,
        trigger: {
            player: "phaseUseBegin",
        },
        direct: true,
        filter: function(event, player) {
            return player.countCards('he') > 1;
        },
        content: function() {
            'step 0'
            player.chooseCardTarget({
                prompt: get.prompt2('gongsun'),
                selectCard: 2,
                filterCard: lib.filter.cardDiscardable,
                filterTarget: lib.filter.notMe,
                position: 'he',
                ai1: function(card) {
                    var friend = 0,
                        enemy = 0,
                        player = _status.event.player;
                    var num = game.countPlayer(function(target) {
                        var att = get.attitude(player, target);
                        if (att < 0) enemy++;
                        if (target != player && att > 0) friend++;
                        return true;
                    });
                    if (num > (friend + enemy + 2)) return 0;
                    if (friend < enemy) return 0;
                    if (card.name == 'sha') return 10 - enemy;
                    return 10 - enemy - get.value(card);
                },
                ai2: function(target) {
                    return -get.attitude(_status.event.player, target) * (1 + target.countCards('h'));
                },
            });
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                event.target = target;
                player.logSkill('gongsun', target);
                player.discard(result.cards);
                player.addTempSkill('gongsun_shadow', {
                    player: ['phaseBegin', 'die']
                });
                var list = [];
                for (var i = 0; i < lib.inpile.length; i++) {
                    var name = lib.inpile[i];
                    if (get.type(name) == 'trick') list.push(['锦囊', '', name]);
                    else if (get.type(name) == 'basic') list.push(['基本', '', name]);
                }
                player.chooseButton(['请选择一个牌名', [list, 'vcard']], true)
                    .set('ai', function(button) {
                    return button.link[2] == 'sha' ? 1 : 0;
                });
            } else event.finish();
            'step 2'
            player.storage.gongsun_shadow.push([target, result.links[0][2]]);
            player.popup(result.links[0][2], 'soil');
            game.log(player, '选择了', '' + get.translation(result.links[0][2]));
            player.storage.gongsun_markk = '';
            target.storage.gongsun_markk = '';
            var num = get.translation(result.links[0][2])
                .slice(0, 2);
            player.storage.gongsun_target = target;
            player.addMark('gongsun_markk', num);
            target.addMark('gongsun_markk', num);
        },
        subSkill: {
            markk: {
                intro: {}
            },
        },
    };
    lib.skill.gongsun_shadow = {
        global: "gongsun_shadow2",
        init: function(player, skill) {
            if (!player.storage[skill]) player.storage[skill] = [];
        },
        onremove: function(player) {
            delete player.storage.gongsun_shadow;
            var targetk = player.storage.gongsun_target;
            targetk.removeMark('gongsun_markk');
            player.removeMark('gongsun_markk');
        },
        mod: {
            cardEnabled: function(card, player) {
                var list = player.storage.gongsun_shadow;
                for (var i = 0; i < list.length; i++) {
                    if (list[i][1] == card.name) return false;
                }
            },
            cardRespondable: function(card, player) {
                var list = player.storage.gongsun_shadow;
                for (var i = 0; i < list.length; i++) {
                    if (list[i][1] == card.name) return false;
                }
            },
            cardSavable: function(card, player) {
                var list = player.storage.gongsun_shadow;
                for (var i = 0; i < list.length; i++) {
                    if (list[i][1] == card.name) return false;
                }
            },
            cardDiscardable: function(card, player) {
                var list = player.storage.gongsun_shadow;
                for (var i = 0; i < list.length; i++) {
                    if (list[i][1] == card.name) return false;
                }
            },
        },
    };
    lib.skill.gongsun_shadow2 = {
        mod: {
            cardEnabled: function(card, player) {
                if (game.hasPlayer(function(current) {
                    var list = current.storage.gongsun_shadow;
                    if (!list) return false;
                    for (var i = 0; i < list.length; i++) {
                        if (list[i][0] == player && list[i][1] == card.name) return true;
                    }
                    return false;
                })) return false;
            },
            cardSavable: function(card, player) {
                if (game.hasPlayer(function(current) {
                    var list = current.storage.gongsun_shadow;
                    if (!list) return false;
                    for (var i = 0; i < list.length; i++) {
                        if (list[i][0] == player && list[i][1] == card.name) return true;
                    }
                    return false;
                })) return false;
            },
            cardRespondable: function(card, player) {
                if (game.hasPlayer(function(current) {
                    var list = current.storage.gongsun_shadow;
                    if (!list) return false;
                    for (var i = 0; i < list.length; i++) {
                        if (list[i][0] == player && list[i][1] == card.name) return true;
                    }
                    return false;
                })) return false;
            },
            cardDiscardable: function(card, player) {
                if (game.hasPlayer(function(current) {
                    var list = current.storage.gongsun_shadow;
                    if (!list) return false;
                    for (var i = 0; i < list.length; i++) {
                        if (list[i][0] == player && list[i][1] == card.name) return true;
                    }
                    return false;
                })) return false;
            },
        },
    };
    lib.translate.mozhi1 = "默识1-";
    lib.translate.mozhi2 = "默识2-";
    lib.skill.mozhi1 = {
        intro: {}
    };
    lib.skill.mozhi2 = {
        intro: {}
    };
    lib.skill.mozhit = {
        audio: 2,
        trigger: {
            player: "useCard",
        },
        direct: true,
        popup: false,
        init: function(player, skill) {
            player.storage.mozhi3 = 1;
            player.storage.mozhi1 = '';
            player.storage.mozhi2 = '';
        },
        filter: function(event, player) {
            if (!player.isPhaseUsing()) return false;
            if (player.storage.mozhi3 > 2) return false;
            return ['basic', 'trick'].contains(get.type(event.card));
        },
        content: function() {
            "step 0"
            var num = get.translation(trigger.card.name)
                .slice(0, 2);
            if (player.storage.mozhi3 == 1) player.addMark("mozhi1", num);
            else player.addMark("mozhi2", num);
            player.storage.mozhi3++;
        },

    };
    lib.skill.mozhip = {
        trigger: {
            player: "phaseJieshuBegin",
        },
        lastDo: true,
        direct: true,
        popup: false,
        content: function() {
            player.unmarkSkill('mozhi1');
            player.unmarkSkill('mozhi2');
        },
    };
    lib.skill.mozhi = {
        audio: 2,
        trigger: {
            player: "phaseJieshuBegin",
        },
        direct: true,
        group: ["mozhit", "mozhip"],
        filter: function(event, player) {
            return player.getHistory('useCard', function(evt) {
                return evt.isPhaseUsing() && ['basic', 'trick'].contains(get.type(evt.card));
            })
                .length > 0 && player.countCards('hs') > 0;
        },
        content: function() {
            "step 0"
            event.count = 2;
            event.history = player.getHistory('useCard', function(evt) {
                return evt.isPhaseUsing() && ['basic', 'trick'].contains(get.type(evt.card));
            })
            "step 1"
            event._result = {};
            if (event.count && event.history.length && player.countCards('hs')) {
                event.count--;
                player.removeMark('mozhi1');
                var card = event.history.shift()
                    .card;
                card = {
                    name: card.name,
                    nature: card.nature
                };
                if (card.name != 'jiu' && lib.filter.cardEnabled(card)) {
                    if (game.hasPlayer(function(current) {
                        return player.canUse(card, current);
                    })) {
                        lib.skill.mozhix.viewAs = card;
                        var next = player.chooseToUse();
                        if (next.isOnline()) {
                            player.send(function(card) {
                                lib.skill.mozhix.viewAs = card;
                            }, card)
                        }
                        next.logSkill = 'mozhi';
                        next.set('openskilldialog', '默识：将一张手牌当' + get.translation(card) + '使用');
                        next.set('norestore', true);
                        next.set('_backupevent', 'mozhix');
                        next.set('custom', {
                            add: {},
                            replace: {
                                window: function() {}
                            }
                        });
                        next.backup('mozhix');
                    }
                }
            }
            "step 2"
            if (result && result.bool) event.goto(1);
            "step 3"
            player.removeMark('mozhi2');
            player.storage.mozhi3 = 1;
            player.storage.mozhi1 = '';
            player.storage.mozhi2 = '';
        },
    };
    lib.skill.xianfu = {
        trigger: {
            global: "phaseBefore",
            player: "enterGame",
        },
        intro: {},
        forced: true,
        filter: function(event) {
            return game.players.length > 1 && (event.name != 'phase' || game.phaseNumber == 0);
        },
        audio: 6,
        content: function() {
            'step 0'
            player.chooseTarget('请选择【先辅】的目标', lib.translate.xianfu_info, true, function(card, player, target) {
                return target != player && (!player.storage.xianfu2 || !player.storage.xianfu2.contains(target));
            })
                .set('ai', function(target) {
                var att = get.attitude(_status.event.player, target);
                if (att > 0) return att + 1;
                if (att == 0) return Math.random();
                return att;
            })
                .animate = false;
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                player.storage.xianfu = '';
                //   num = get.translation(target);
                num = get.rawName(target.name);
                if (player == game.me) player.markSkill("xianfu", '', '先辅' + num);
                if (!player.storage.xianfu2) player.storage.xianfu2 = [];
                player.storage.xianfu2.push(target);
                player.addSkill('xianfu2');
            }
        },
    };
    lib.skill.xianfu2 = {
        audio: "xianfu",
        charlotte: true,
        trigger: {
            global: ["damageEnd", "recoverEnd"],
        },
        forced: true,
        filter: function(event, player) {
            if (event.player.isDead() || !player.storage.xianfu2 || !player.storage.xianfu2.contains(event.player) || event.num <= 0) return false;
            if (event.name == 'damage') return true;
            return player.isDamaged();
        },
        logTarget: "player",
        content: function() {
            'step 0'
            var target = trigger.player;
            if (!target.storage.xianfu_mark) target.storage.xianfu_mark = [];
            target.storage.xianfu_mark.add(player);
            target.storage.xianfu_mark.sortBySeat();
            player.markSkill("xianfu", '', '先辅' + get.translation(target));
            game.delayx();
            'step 1'
            player[trigger.name](trigger.num, 'nosource');
        },
        onremove: function(player) {
            if (!player.storage.xianfu2) return;
            game.countPlayer(function(current) {
                if (player.storage.xianfu2.contains(current) && current.storage.xianfu_mark) {
                    current.storage.xianfu_mark.remove(player);
                    if (!current.storage.xianfu_mark.length) current.unmarkSkill('xianfu_mark');
                    else current.markSkill('xianfu_mark');
                }
            });
            delete player.storage.xianfu2;
        },
        group: "xianfu3",
    }
    lib.skill.chouce = {
        trigger: {
            player: "damageEnd",
        },
        content: function() {
            'step 0'
            event.num = trigger.num;
            'step 1'
            player.judge();
            'step 2'
            event.color = result.color;
            if (event.color == 'black') {
                player.chooseTarget('弃置一名角色区域内的一张牌', function(card, player, target) {
                    return target.countCards('hej');
                })
                    .set('ai', function(target) {
                    var player = _status.event.player;
                    var att = get.attitude(player, target);
                    if (att < 0) {
                        att = -Math.sqrt(-att);
                    } else {
                        att = Math.sqrt(att);
                    }
                    return att * lib.card.guohe.ai.result.target(player, target);
                })
            } else {
                var next = player.chooseTarget('令一名角色摸一张牌');
                if (player.storage.xianfu2 && player.storage.xianfu2.length) {
                    next.set('prompt2', '（若目标为' + get.translation(player.storage.xianfu2) + '则改为摸两张牌）');
                }
                next.set('ai', function(target) {
                    var player = _status.event.player;
                    var att = get.attitude(player, target) / Math.sqrt(1 + target.countCards('h'));
                    if (target.hasSkillTag('nogain')) att /= 10;
                    if (player.storage.xianfu2 && player.storage.xianfu2.contains(target)) return att * 2;
                    return att;
                })
            }
            'step 3'
            if (result.bool) {
                var target = result.targets[0];
                player.line(target, 'green');
                if (event.color == 'black') {
                    player.discardPlayerCard(target, 'hej', true);
                } else {
                    if (player.storage.xianfu2 && player.storage.xianfu2.contains(target)) {
                        if (!target.storage.xianfu_mark) target.storage.xianfu_mark = [];
                        target.storage.xianfu_mark.add(player);
                        target.storage.xianfu_mark.sortBySeat();
                        player.markSkill("xianfu", '', '先辅' + get.translation(target));
                        target.draw(2);
                    } else {
                        target.draw();
                    }
                }
            }
            'step 4'
            if (--event.num > 0) {
                player.chooseBool(get.prompt2('chouce'));
            } else {
                event.finish();
            }
            'step 5'
            if (result.bool) {
                player.logSkill('chouce');
                event.goto(1);
            }
        },
        ai: {
            maixie: true,
            "maixie_hp": true,
            effect: {
                target: function(card, player, target) {
                    if (get.tag(card, 'damage')) {
                        if (player.hasSkillTag('jueqing', false, target)) return [1, -2];
                        if (!target.hasFriend()) return;
                        if (target.hp >= 4) return [1, get.tag(card, 'damage') * 1.5];
                        if (target.hp == 3) return [1, get.tag(card, 'damage') * 1];
                        if (target.hp == 2) return [1, get.tag(card, 'damage') * 0.5];
                    }
                },
            },
        },
    };
    lib.skill.shuangxiong = {
        audio: true,
        audioname: ["re_yanwen"],
        trigger: {
            player: "phaseDrawBegin1",
        },
        check: function(event, player) {
            if (player.countCards('h') > player.hp) return true;
            if (player.countCards('h') > 3) return true;
            return false;
        },
        filter: function(event, player) {
            return !event.numFixed;
        },
        preHidden: true,
        content: function() {
            player.judge()
                .set('callback', lib.skill.shuangxiong.callback);
            trigger.changeToZero();
        },
        subSkill: {
            m: {
                intro: {}
            },
        },
        callback: function() {
            player.gain(card, 'gain2');
            player.addTempSkill('shuangxiong2');
            player.storage.shuangxiong = event.judgeResult.color;
            player.storage.shuangxiong_m = '';
            num = player.storage.shuangxiong == 'red' ? "♠️️♣️️️决斗" : "♥️♦️决斗";
            player.addMark('shuangxiong_m', num)
        },
    };
    lib.skill.shuangxiong2 = {
        audio: true,
        audioname: ["re_yanwen"],
        enable: "chooseToUse",
        prompt: function() {
            var player = _status.event.player;
            var str = '将一张' + (player.storage.shuangxiong != 'red' ? '红' : '黑') + '色手牌当做【决斗】使用';
            return str;
        },
        viewAs: {
            name: "juedou",
        },
        position: "hs",
        onremove: function(player) {
            player.removeMark('shuangxiong_m');
        },
        filterCard: function(card, player) {
            return get.color(card) != player.storage.shuangxiong;
        },
        check: function(card) {
            return 8 - get.value(card);
        },
        ai: {
            basic: {
                order: 10,
                useful: 1,
                value: 5.5,
            },
            wuxie: function(target, card, player, viewer) {
                if (player == game.me && get.attitude(viewer, player) > 0) {
                    return 0;
                }
            },
            result: {
                target: -1.5,
                player: function(player, target, card) {
                    if (player.hasSkillTag('directHit_ai', true, {
                        target: target,
                        card: card,
                    }, true)) {
                        return 0;
                    }
                    if (get.damageEffect(target, player, target) > 0 && get.attitude(player, target) > 0 && get.attitude(target, player) > 0) {
                        return 0;
                    }
                    var hs1 = target.getCards('h', 'sha');
                    var hs2 = player.getCards('h', 'sha');
                    if (hs1.length > hs2.length + 1) {
                        return -2;
                    }
                    var hsx = target.getCards('h');
                    if (hsx.length > 2 && hs2.length == 0 && hsx[0].number < 6) {
                        return -2;
                    }
                    if (hsx.length > 3 && hs2.length == 0) {
                        return -2;
                    }
                    if (hs1.length > hs2.length && (!hs2.length || hs1[0].number > hs2[0].number)) {
                        return -2;
                    }
                    return -0.5;
                },
            },
            tag: {
                respond: 2,
                respondSha: 2,
                damage: 1,
            },
        },
    };
    lib.skill.reshuangxiong = {
        trigger: {
            player: "phaseDrawBegin1",
        },
        group: "reshuangxiong2",
        audio: "shuangxiong",
        audioname: ["re_yanwen"],
        check: function(event, player) {
            if (player.countCards('h') > player.hp) return true;
            if (player.countCards('h') > 3) return true;
            return false;
        },
        filter: function(event, player) {
            return !event.numFixed;
        },
        content: function() {
            "step 0"
            trigger.changeToZero();
            event.cards = get.cards(2);
            event.videoId = lib.status.videoId++;
            game.broadcastAll(function(player, id, cards) {
                var str;
                if (player == game.me && !_status.auto) {
                    str = '【双雄】选择获得其中一张牌';
                } else {
                    str = '双雄';
                }
                var dialog = ui.create.dialog(str, cards);
                dialog.videoId = id;
            }, player, event.videoId, event.cards);
            event.time = get.utc();
            game.addVideo('showCards', player, ['双雄', get.cardsInfo(event.cards)]);
            game.addVideo('delay', null, 2);
            "step 1"
            var next = player.chooseButton([1, 1], true);
            next.set('dialog', event.videoId);
            next.set('ai', function(button) {
                var player = _status.event.player;
                var color = get.color(button.link);
                var value = get.value(button.link, player);
                if (player.countCards('h', {
                    color: color
                }) > player.countCards('h', ['red', 'black'].remove(color)[0])) value += 5;
                return value;
            });
            "step 2"
            if (result.bool && result.links) {
                var cards2 = [];
                for (var i = 0; i < result.links.length; i++) {
                    cards2.push(result.links[i]);
                    cards.remove(result.links[i]);
                }
                game.cardsDiscard(cards);
                event.card2 = cards2[0];
            }
            var time = 1000 - (get.utc() - event.time);
            if (time > 0) {
                game.delay(0, time);
            }
            "step 3"
            game.broadcastAll('closeDialog', event.videoId);
            var card2 = event.card2;
            player.gain(card2, 'gain2');
            player.addTempSkill('shuangxiong2');
            player.storage.shuangxiong = get.color(card2);
            player.storage.shuangxiong_m = '';
            num = player.storage.shuangxiong == 'red' ? "♠️️♣️️️决斗" : "♦️♥️决斗";
            player.addMark('shuangxiong_m', num)
        },
    };
    lib.skill.qianxi = {
        audio: 2,
        trigger: {
            player: "phaseZhunbeiBegin",
        },
        preHidden: true,
        content: function() {
            "step 0"
            player.draw();
            player.chooseToDiscard('he', true);
            "step 1"
            if (!result.bool) {
                event.finish();
                return;
            }
            event.color = get.color(result.cards[0], result.cards[0].original == 'h' ? player : false);
            player.chooseTarget(function(card, player, target) {
                return player != target && get.distance(player, target) <= 1;
            }, true)
                .set('ai', function(target) {
                return -get.attitude(_status.event.player, target);
            });
            "step 2"
            if (result.bool && result.targets.length) {
                result.targets[0].storage.qianxi2 = event.color;
                result.targets[0].addTempSkill('qianxi2');
                var num = event.color == 'red' ? '红' : '黑';
                result.targets[0].storage.qianxi_m = '';
                result.targets[0].addMark('qianxi_m', num);
                player.line(result.targets, 'green');
                game.addVideo('storage', result.targets[0], ['qianxi2', event.color]);
            }
        },
        subSkill: {
            m: {
                intro: {
                    content: function(color) {
                        return '不能使用或打出' + get.translation(color) + '色的手牌';
                    },
                },
            },
        },
        ai: {
            "directHit_ai": true,
            skillTagFilter: function(player, tag, arg) {
                if (!arg.target.hasSkill('qianxi2')) return false;
                if (arg.card.name == 'sha') return arg.target.storage.qianxi2 == 'red' && (!arg.target.getEquip('bagua') || player.hasSkillTag('unequip', false, {
                    name: arg.card ? arg.card.name : null,
                    target: arg.target,
                    card: arg.card
                }) || player.hasSkillTag('unequip_ai', false, {
                    name: arg.card ? arg.card.name : null,
                    target: arg.target,
                    card: arg.card
                }));
                return arg.target.storage.qianxi2 == 'black';
            },
        },
    };
    lib.skill.qianxi2 = {
        forced: true,
        audio: false,
        content: function() {
            player.removeSkill('qianxi2');
            delete player.storage.qianxi2;
            player.removeMark('qianxi_m');
        },
        onremove: function(player) {
            player.removeMark('qianxi_m');
        },
        mod: {
            "cardEnabled2": function(card, player) {
                if (get.color(card) == player.storage.qianxi2 && get.position(card) == 'h') return false;
            },
        },
    };
    lib.skill.reqianxi = {
        audio: 2,
        trigger: {
            player: "phaseZhunbeiBegin",
        },
        frequent: true,
        content: function() {
            'step 0'
            player.draw();
            'step 1'
            if (player.hasCard((card) => lib.filter.cardDiscardable(card, player, 'reqianxi'), 'he')) player.chooseToDiscard('he', true);
            else event.finish();
            'step 2'
            if (result.bool && game.hasPlayer((current) => current != player && get.distance(player, current) <= 1)) {
                var color = get.color(result.cards[0], player);
                event.color = color;
                color = get.translation(color);
                player.chooseTarget(true, '选择【潜袭】的目标', '令其本回合不能使用或打出' + color + '牌，且' + color + '防具失效，且回复体力时，你摸两张牌', function(card, player, target) {
                    return target != player && get.distance(player, target) <= 1;
                })
                    .set('ai', function(target) {
                    return -get.attitude(_status.event.player, target) * Math.sqrt(1 + target.countCards('he'));
                });
            } else event.finish();
            'step 3'
            if (result.bool) {
                var target = result.targets[0];
                player.line(target, 'green');
                target.storage.reqianxi_effect = [event.color, player];
                target.addTempSkill('reqianxi_effect');
                target.storage.reqianxi_m = '';
                var num = event.color == 'red' ? '红' : '黑';
                target.addMark('reqianxi_m', num)
            }
        },
        subSkill: {
            effect: {
                charlotte: true,
                onremove: function(player) {
                    player.removeMark('reqianxi_m');
                },
                mod: {
                    "cardEnabled2": function(card, player) {
                        if (get.itemtype(card) == 'card' && get.color(card) == player.getStorage('reqianxi_effect')[0]) return false;
                    },
                },
                trigger: {
                    player: "recoverEnd",
                },
                forced: true,
                popup: false,
                filter: function(event, player) {
                    return player.storage.reqianxi_effect && player.storage.reqianxi_effect[1].isIn();
                },
                content: function() {
                    var target = player.storage.reqianxi_effect[1];
                    target.logSkill('reqianxi', player);
                    target.draw(2);
                },
                ai: {
                    "unequip2": true,
                    skillTagFilter: function(player) {
                        var evt = _status.event,
                            color = player.getStorage('reqianxi_effect')[0];
                        if (evt.name == 'lose' && evt.loseEquip) {
                            var card = evt.cards[evt.num];
                            if (card && get.subtype(card, false) == 'equip2' && get.color(card) == color) return true;
                            return false;
                        } else {
                            var equip = player.getEquip(2);
                            if (equip && get.color(equip) == color) return true;
                            return false;
                        }
                    },
                },
                sub: true,
            },
            m: {
                intro: {
                    content: function(storage, player) {
                        var color = get.translation(storage[0]),
                            source = get.translation(player.storage.reqianxi_effect[1]);
                        return '本回合不能使用或打出' + color + '色牌，且' + color + '色防具失效，且回复体力时，' + source + '摸两张牌';
                    },
                },
            },
        },
    };
    lib.skill.xinzhanyi = {
        audio: "zhanyi",
        enable: "phaseUse",
        usable: 1,
        filterCard: true,
        position: "he",
        check: function(card) {
            var player = _status.event.player;
            if (player.hp < 3) return 0;
            var type = get.type(card, 'trick');
            if (type == 'trick') {
                return 6 - get.value(card);
            } else if (type == 'equip') {
                if (player.hasSha() && game.hasPlayer(function(current) {
                    return (player.canUse('sha', current) && get.attitude(player, current) < 0 && get.effect(current, {
                        name: 'sha'
                    }, player, player) > 0)
                })) {
                    return 6 - get.value(card);
                }
            }
            return 0;
        },
        content: function() {
            player.loseHp();
            player.storage.xinzhanyi_m = '';
            switch (get.type(cards[0], 'trick', cards[0].original == 'h' ? player : false)) {
                case 'basic':
                    player.addTempSkill('xinzhanyi_basic');
                    player.addWhen({
                        trigger:{player:["useCard","phaseAfter"]},
        				filter:function(event,player){
        					return get.type(event.card,false)=='basic';
        				},
        				forced:true,
        				silent:true,
        				popup:false,
        				content:function(){
        					if(!trigger.baseDamage) trigger.baseDamage=1;
        					trigger.baseDamage++;
        					player.removeMark('xinzhanyi_basic1',num,false);
        					game.log(trigger.card,'的伤害值/回复值','#y+'+1);
        				},
        				cancelTrigger:'phaseAfter',
                    });
                    num = '基本牌';
                    break;
                case 'equip':
                    player.addTempSkill('xinzhanyi_equip');
                    num = '装备牌';
                    break;
                case 'trick':
                    player.addTempSkill('xinzhanyi_trick');
                    player.draw(3);
                    nun = '锦囊牌';
                    break;
            };
            player.addMark('xinzhanyi_m', num);
        },
        subSkill: {
            m: {
                intro: {},
            },
        },
        ai: {
            order: 9.1,
            result: {
                player: 1,
            },
        },
    };
    lib.skill.xinzhanyi_basic = {
        group: ["xinzhanyi_basic1"],
        onremove: function(p, s) {
            delete p.storage[s + 1];
        },
        hiddenCard: function(player, name) {
            return ['sha', 'tao', 'jiu'].contains(name) && player.countCards('h', {
                type: 'basic'
            }) > 0;
        },
        enable: "chooseToUse",
        filter: function(event, player) {
            if (event.filterCard({
                name: 'sha'
            }, player, event) || event.filterCard({
                name: 'jiu'
            }, player, event) || event.filterCard({
                name: 'tao'
            }, player, event)) {
                return player.hasCard(function(card) {
                    return get.type(card) == 'basic';
                }, 'hs');
            }
            return false;
        },
        chooseButton: {
            dialog: function(event, player) {
                var list = [];
                if (event.filterCard({
                    name: 'sha'
                }, player, event)) {
                    list.push(['基本', '', 'sha']);
                    for (var j of lib.inpile_nature) list.push(['基本', '', 'sha', j]);
                }
                if (event.filterCard({
                    name: 'tao'
                }, player, event)) {
                    list.push(['基本', '', 'tao']);
                }
                if (event.filterCard({
                    name: 'jiu'
                }, player, event)) {
                    list.push(['基本', '', 'jiu']);
                }
                return ui.create.dialog('战意', [list, 'vcard'], 'hidden');
            },
            check: function(button) {
                var player = _status.event.player;
                var card = {
                    name: button.link[2],
                    nature: button.link[3]
                };
                if (game.hasPlayer(function(current) {
                    return player.canUse(card, current) && get.effect(current, card, player, player) > 0;
                })) {
                    switch (button.link[2]) {
                        case 'tao':
                            return 5;
                        case 'jiu':
                            {
                                if (player.countCards('hs', {
                                    type: 'basic'
                                }) >= 2) return 3;
                            };
                        case 'sha':
                            if (button.link[3] == 'fire') return 2.95;
                            else if (button.link[3] == 'thunder' || button.link[3] == 'ice') return 2.92;
                            else return 2.9;
                    }
                }
                return 0;
            },
            backup: function(links, player) {
                return {
                    audio: 'zhanyi',
                    filterCard: function(card, player, target) {
                        return get.type(card) == 'basic';
                    },
                    check: function(card, player, target) {
                        return 9 - get.value(card);
                    },
                    viewAs: {
                        name: links[0][2],
                        nature: links[0][3]
                    },
                    position: 'hs',
                    popname: true,
                }
            },
            prompt: function(links, player) {
                return '将一张基本牌当做' + get.translation(links[0][3] || '') + get.translation(links[0][2]) + '使用';
            },
        },
        onremove: function(player) {
            player.removeMark('xinzhanyi_m');
        },
        ai: {
            order: function() {
                var player = _status.event.player;
                var event = _status.event;
                if (event.filterCard({
                    name: 'jiu'
                }, player, event) && get.effect(player, {
                    name: 'jiu'
                }) > 0 && player.countCards('hs', {
                    type: 'basic'
                }) >= 2) {
                    return 3.3;
                }
                return 3.1;
            },
            respondSha: true,
            skillTagFilter: function(player, tag, arg) {
                if (player.hasCard(function(card) {
                    return get.type(card) == 'basic';
                }, 'hs')) {
                    if (tag == 'respondSha') {
                        if (arg != 'use') return false;
                    }
                } else {
                    return false;
                }
            },
            result: {
                player: 1,
            },
        },
    };
    lib.skill.xinzhanyi_equip = {
        audio: "zhanyi",
        trigger: {
            player: "useCardToPlayered",
        },
        forced: true,
        filter: function(event, player) {
            return event.card.name == 'sha' && event.target.countCards('he') > 0 && event.targets.length == 1;
        },
        check: function(event, player) {
            return get.attitude(player, event.target) < 0;
        },
        onremove: function(player) {
            player.removeMark('xinzhanyi_m');
        },
        content: function() {
            'step 0'
            trigger.target.chooseToDiscard('he', true, 2);
            'step 1'
            if (result.bool && result.cards && result.cards.length) {
                if (result.cards.length == 1) {
                    event._result = {
                        bool: true,
                        links: result.cards.slice(0)
                    };
                } else player.chooseButton(['选择获得其中的一张牌', result.cards.slice(0)], true)
                    .ai = function(button) {
                    return get.value(button.link);
                };
            } else event.finish();
            'step 2'
            if (result.links) player.gain(result.links, 'gain2');
        },
    };
    lib.skill.xinzhanyi_trick = {
        mod: {
            wuxieRespondable: function() {
                return false;
            },
        },
        onremove: function(player) {
            player.removeMark('xinzhanyi_m');
        },
    };
    lib.skill.hongyi = {
        audio: 2,
        enable: "phaseUse",
        usable: 1,
        filterTarget: function(card, player, target) {
            return player != target;
        },
        check: function(card) {
            var num = Math.min(2, game.dead.length);
            if (!num) return 1;
            if (num == 1) return 7 - get.value(card);
            return 5 - get.value(card);
        },
        position: "he",
        content: function() {
            player.addTempSkill('hongyi2', {
                player: 'phaseBeginStart'
            });
            player.storage.hongyi2 = target;
            target.addSkill('hongyi_mark2');
            // player.storage.hongyi_mark='';
            // num=get.translation(target.name);
            // player.addMark('hongyi_mark',num);

        },
        onremove: function(player) {
            player.removeMark('hongyi_mark');
            for (var i of game.players) {
                game.log(i)
                i.removeSkill('hongyi_mark2')
            }
        },
        subSkill: {
            mark2: {
                mark: true,
                intro: {
                    content: '你每次造成伤害时你进行一次判定，若为黑色，此次伤害-1,若为红色，受伤角色摸一张牌'
                },
                sub: true,
            },
            mark: {
                intro: {
                    content: function(storage, player, skill) {
                        return player.storage.hongyi_mark;
                    }
                }
            },
        },
        ai: {
            order: 3,
            result: {
                target: function(player, target) {
                    if (target.hasJudge('lebu')) return -0.5;
                    return -1 - target.countCards('h');
                },
            },
        },
    };
    lib.skill.hongyi2 = {
        audio: "hongyi",
        trigger: {
            global: "damageBegin1",
        },
        charlotte: true,
        forced: true,
        logTarget: "source",
        filter: function(event, player) {
            return player.storage.hongyi2.contains(event.source);
        },
        content: function() {
            'step 0'
            trigger.source.judge();
            'step 1'
            if (result.color == 'black') trigger.num--;
            else trigger.player.draw();
        },
        onremove: function(player) {
            player.removeMark('hongyi_mark');
            for (var i of game.players) {
                i.removeSkill('hongyi_mark2')
            }
        },
        // intro:{
        // content:"已选中$为技能目标",
        // },
        init: function(player, skill) {
            if (!player.storage[skill]) player.storage[skill] = [];
        },
    };
    lib.translate.requanfeng_gain_info = true;
    lib.skill.requanfeng_gain = {
        audio: 'quanfeng',
        trigger: {
            global: 'die'
        },
        filter: function(event, player) {
            return event.player.getStockSkills('仲村由理', '天下第一')
                .filter(function(skill) {
                var info = get.info(skill);
                return info && !info.hiddenSkill && !info.zhuSkill && !info.charlotte;
            })
                .length > 0;
        },
        logTarget: 'player',
        limited: true,
        skillAnimation: true,
        animationColor: 'gray',
        prompt2: '（限定技）失去技能【弘仪】，并获得该角色武将牌上的所有技能，然后加1点体力上限并回复1点体力',
        content: function() {
            'step 0'
            player.awakenSkill('requanfeng');
            player.removeSkill('hongyi');
            for (var i of game.players) {
                i.removeSkill('hongyi_mark2')
            }
            player.storage.requanfeng_gain_mark = '';
            var str = get.translation(trigger.player);
            player.addMark("requanfeng_gain_mark", str);
            var skills = trigger.player.getStockSkills('仲村由理', '天下第一')
                .filter(function(skill) {
                var info = get.info(skill);
                return info && !info.hiddenSkill && !info.zhuSkill && !info.charlotte;
            });
            if (skills.length) {
                for (var i of skills) player.addSkillLog(i);
                game.broadcastAll(function(list) {
                    game.expandSkills(list);
                    for (var i of list) {
                        var info = lib.skill[i];
                        if (!info) continue;
                        if (!info.audioname2) info.audioname2 = {};
                        info.audioname2.yanghuiyu = 'quanfeng';
                    }
                }, skills);
            }
            player.gainMaxHp();
            player.recover();
        },
        subSkill: {
            mark: {
                intro: {
                    content: function(storage, player, skill) {
                        return '已获得：' + player.storage.requanfeng_gain_mark + '的技能';

                    }
                },
            },
        }
    };
    lib.skill.mjmouzhi = {
        audio: 2,
        trigger: {
            player: "damageBegin2",
        },
        forced: true,
        filter: function(event, player) {
            if (!event.card || get.suit(event.card) == 'none') return false;
            var all = player.getAllHistory('damage');
            if (!all.length) return false;
            return all[all.length - 1].card && get.suit(all[all.length - 1].card) == get.suit(event.card);
        },
        content: function() {
            trigger.cancel();
        },
        group: "mjmouzhi_mark",
        ai: {
            effect: {
                target: function(card, player, target) {
                    if (get.tag(card, 'damage')) {
                        var color = get.suit(card);
                        if (color == 'none') return;
                        var all = target.getAllHistory('damage');
                        if (!all.length || !all[all.length - 1].card) return;
                        if (get.suit(all[all.length - 1].card) == color) return 'zerotarget';
                    }
                },
            },
        },
        subSkill: {
            kk: {
                intro: {},
                sub: true,
            },
            mark: {
                trigger: {
                    player: "damage",
                },
                silent: true,
                firstDo: true,
                content: function() {
                    if (!trigger.card || get.suit(trigger.card) == 'none') player.unmarkSkill('mjmouzhi_kk');
                    else {
                        var xx = get.suit(trigger.card);
                        var cc = get.translation(xx);
                        player.storage.mjmouzhi_kk = '';
                        player.addSkill('mjmouzhi_kk');
                        player.addMark('mjmouzhi_kk', cc);
                        game.broadcastAll(function(player, suit) {
                            if (player.marks.mjmouzhi) player.marks.mjmouzhi.firstChild.innerHTML = get.translation(suit);
                            player.storage.mjmouzhi = suit;
                        }, player, get.suit(trigger.card))
                    }
                },
                sub: true,
                forced: true,
                popup: false,
            },
        },
    }
    lib.skill.zhuihuan = {
        audio: 2,
        trigger: {
            player: "phaseJieshuBegin",
        },
        direct: true,
        filter: function(event, player) {
            return game.hasPlayer(function(current) {
                return !current.hasSkill('zhuihuan2_new');
            });
        },
        content: function() {
            'step 0'
            player.chooseTarget(get.prompt('zhuihuan'), '令一名角色获得“追还”效果', function(card, player, target) {
                return !target.hasSkill('zhuihuan2_new');
            })
                .set('ai', function(target) {
                var player = _status.event.player,
                    att = get.attitude(player, target);
                if (target.hasSkill('maixie') || target.hasSkill('maixie_defend')) att /= 3;
                if (target != player) att /= Math.pow(game.players.length - get.distance(player, target, 'absolute'), 0.7);
                return att;
            })
                .set('animate', false);
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                player.logSkill('zhuihuan');
                target.addTempSkill('zhuihuan2_new', {
                    player: 'phaseZhunbei'
                });
                if (player == game.me || player.isUnderControl()) {
                    target.addTempSkill('zhuihuan_mark', {
                        player: 'phaseZhunbei'
                    });
                }
                game.delayx();
            }
        },
        subSkill: {
            mark: {
                mark: true,
                intro: {},
                sub: true,
            },
        },
    }
    lib.skill.bixiong = {
        trigger: {
            player: "loseAfter",
        },
        forced: true,
        filter: function(event, player) {
            return event.type == 'discard' && event.getParent('phaseDiscard')
                .player == player && event.hs && event.hs.length > 0;
        },
        content: function() {
            var cards = [];
            for (var i of trigger.hs) {
                cards.add(get.suit(i, player));
            }
            player.addTempSkill('bixiong2', {
                player: 'phaseBegin'
            });
            player.markAuto('bixiong2', cards);
            player.markAuto('bixiong_mark', cards);
            var str = '';
            str = cards.sortBySuit()
                .join('');
            /* if (cards.indexOf('heart') != -1) str += '♥️';
            if (cards.indexOf('diamond') != -1) str += '♦️️';
            if (cards.indexOf('spade') != -1) str += '♠️️';
            if (cards.indexOf('club') != -1) str += '♣️️';*/
            player.storage.bixiong_mark = '';
            player.addTempSkill('bixiong_mark', {
                player: 'phaseBegin'
            });
            player.addMark('bixiong_mark', str)
        },
        subSkill: {
            mark: {
                intro: {
                    content: "不能成为$牌的目标",
                },
                sub: true,
            },
        },
    }
    lib.skill.bixiong2 = {
        onremove: true,
        mod: {
            targetEnabled: function(card, player, target) {
                if (target.getStorage('bixiong2')
                    .contains(get.suit(card))) return false;
            },
        },
        // intro:{
        // content:"不能成为$牌的目标",
        // },
    }
    lib.skill.zhtongyuan = {
        audio: "tongyuan",
        trigger: {
            player: ["useCardAfter", "respondAfter"],
        },
        forced: true,
        filter: function(event, player) {
            var type = get.type2(event.card, false);
            return (type == 'basic' || type == 'trick') && get.color(event.card, false) == 'red' && !player.hasMark('zhtongyuan_' + type);
        },
        content: function() {
            var type = get.type2(trigger.card, false);
            if (!player.storage.zhtongyuan_xg1) player.storage.zhtongyuan_xg1 = [];
            var str = '';
            if (get.type2(trigger.card) == 'trick') str = '锦';
            else if (get.type2(trigger.card) == 'basic') str = '基';
            var num = '';
            if (player.storage.zhtongyuan_xg1.indexOf(str) == -1) player.storage.zhtongyuan_xg1 += str;
            if (player.storage.zhtongyuan_xg1.indexOf('基') != -1) num += '基';
            if (player.storage.zhtongyuan_xg1.indexOf('锦') != -1) num += '锦';
            player.storage.zhtongyuan_xg = '';
            if (!player.hasMark('zhtongyuan_' + type)) {
                player.addMark('zhtongyuan_' + type, 1, false);
                //  player.addTempSkill('zhtongyuan_xg');          
                player.addMark('zhtongyuan_xg', player.storage.zhtongyuan_xg1);
                game.log(player, '修改了技能', '#g【摧坚】');
            }
        },
        group: ["zhtongyuan_basic", "zhtongyuan_trick"],
        subSkill: {
            xg: {
                intro: {},
                sub: true,
            },
            basic: {
                trigger: {
                    player: "useCard2",
                },
                direct: true,
                locked: true,
                filter: function(event, player) {
                    if (!player.hasMark('zhtongyuan_basic') || !player.hasMark('zhtongyuan_trick')) return false;
                    var card = event.card;
                    if (get.color(card, false) != 'red' || get.type(card, null, true) != 'basic') return false;
                    var info = get.info(card);
                    if (info.allowMultiple == false) return false;
                    if (event.targets && !info.multitarget) {
                        if (game.hasPlayer(function(current) {
                            return !event.targets.contains(current) && lib.filter.targetEnabled2(card, player, current);
                        })) {
                            return true;
                        }
                    }
                    return false;
                },
                content: function() {
                    'step 0'
                    var prompt2 = '为' + get.translation(trigger.card) + '增加一个目标'
                    player.chooseTarget(get.prompt('zhtongyuan'), function(card, player, target) {
                        var player = _status.event.player;
                        return !_status.event.targets.contains(target) && lib.filter.targetEnabled2(_status.event.card, player, target);
                    })
                        .set('prompt2', prompt2)
                        .set('ai', function(target) {
                        var trigger = _status.event.getTrigger();
                        var player = _status.event.player;
                        return get.effect(target, trigger.card, player, player);
                    })
                        .set('card', trigger.card)
                        .set('targets', trigger.targets);
                    'step 1'
                    if (result.bool) {
                        if (!event.isMine() && !event.isOnline()) game.delayx();
                        event.targets = result.targets;
                    } else {
                        event.finish();
                    }
                    'step 2'
                    if (event.targets) {
                        player.logSkill('zhtongyuan', event.targets);
                        trigger.targets.addArray(event.targets);
                    }
                },
                sub: true,
            },
            trick: {
                audio: "zhtongyuan",
                trigger: {
                    player: "useCard",
                },
                forced: true,
                filter: function(event, player) {
                    if (!player.hasMark('zhtongyuan_basic') || !player.hasMark('zhtongyuan_trick')) return false;
                    var card = event.card;
                    return (get.color(card, false) == 'red' && get.type(card, null, false) == 'trick');
                },
                content: function() {
                    trigger.directHit.addArray(game.filterPlayer());
                    game.log(trigger.card, '不可被响应');
                },
                sub: true,
            },
        },
    }
    lib.skill.daiyan = {
        audio: 2,
        trigger: {
            player: "phaseJieshuBegin",
        },
        direct: true,
        init: function() {
            lib.onwash.push(function() {
                delete _status.daiyan_notao;
            });
        },
        content: function() {
            'step 0'
            player.chooseTarget(get.prompt2('daiyan'), function(card, player, target) {
                return target != player;
            })
                .set('ai', function(target) {
                var player = _status.event.player;
                var att = get.attitude(player, target);
                if (att > 0) {
                    if (_status.daiyan_notao) {
                        return 0;
                    } else {
                        if (target == player.storage.daiyan) return 0;
                        return 2 * att / Math.sqrt(1 + target.hp);
                    }
                } else {
                    if (_status.daiyan_notao) {
                        if (target == player.storage.daiyan) return -3 * att;
                        return -att;
                    } else {
                        return 0;
                    }
                }
            });
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                target.addSkill('daiyan_mark');
                player.logSkill('daiyan', target);
                var tao = get.cardPile2(function(card) {
                    return get.suit(card) == 'heart' && get.type(card) == 'basic';
                });
                if (tao) {
                    target.gain(tao, 'gain2');
                } else {
                    _status.daiyan_notao = true;
                }
                if (target == player.storage.daiyan) {
                    target.loseHp();
                }

            } else {
                if (player.storage.daiyan != undefined) {
                    player.storage.daiyan.removeSkill('daiyan_mark');
                    delete player.storage.daiyan;
                }
                event.finish();
            }
            'step 2'
            var target = result.targets[0];
            if (target != player.storage.daiyan && player.storage.daiyan != undefined) {
                player.storage.daiyan.removeSkill('daiyan_mark');
            }
            'step 3'
            var target = result.targets[0];
            player.storage.daiyan = target;
        },
        ai: {
            threaten: 1.5,
            expose: 0.2,
        },
        subSkill: {
            mark: {
                mark: true,
                intro: {},
                sub: true,
            },
        },
    }
    lib.skill.tongli = {
        audio: 2,
        trigger: {
            player: "useCardToPlayered",
        },
        filter: function(event, player) {
            if (!event.isFirstTarget || (event.card.storage && event.card.storage.tongli)) return false;
            var type = get.type(event.card);
            if (type != 'basic' && type != 'trick') return false;
            var hs = player.getCards('h');
            if (!hs.length) return false;
            var evt = event.getParent('phaseUse');
            if (!evt || evt.player != player) return false;
            var num1 = player.getHistory('useCard', function(evtx) {
                if (evtx.getParent('phaseUse') != evt) return false;
                return !evtx.card.storage || !evtx.card.storage.tongli;
            })
                .length;
            if (hs.length < num1) return false;
            var list = [];
            for (var i of hs) list.add(get.suit(i, player));
            return list.length == num1;
        },
        "prompt2": function(event, player) {
            var evt = event.getParent('phaseUse');
            var num = player.getHistory('useCard', function(evtx) {
                if (evtx.getParent('phaseUse') != evt) return false;
                return !evtx.card.storage || !evtx.card.storage.tongli;
            })
                .length;
            var str = '视为额外使用' + get.cnNumber(num) + '张'
            if (event.card.name == 'sha' && event.card.nature) str += get.translation(event.card.nature);
            return (str + '【' + get.translation(event.card.name) + '】');
        },
        check: function(event, player) {
            return !get.tag(event.card, 'norepeat')
        },
        content: function() {
            player.addTempSkill('tongli_effect');
            var evt = trigger.getParent('phaseUse');
            var num = player.getHistory('useCard', function(evtx) {
                if (evtx.getParent('phaseUse') != evt) return false;
                return !evtx.card.storage || !evtx.card.storage.tongli;
            })
                .length;
            trigger.getParent()
                .tongli_effect = [{
                name: trigger.card.name,
                nature: trigger.card.nature,
                isCard: true,
                storage: {
                    tongli: true
                },
            },
            num];
        },
        subSkill: {
            effect: {
                trigger: {
                    player: "useCardAfter",
                },
                forced: true,
                charlotte: true,
                filter: function(event, player) {
                    return event.tongli_effect != undefined;
                },
                content: function() {
                    'step 0'
                    event.card = trigger.tongli_effect[0];
                    event.count = trigger.tongli_effect[1];
                    'step 1'
                    event.count--;
                    player.storage.tongli_mark--;
                    for (var i of trigger.targets) {
                        if (!i.isIn() || !player.canUse(card, i, false)) return;
                    }
                    if (trigger.addedTarget && !trigger.addedTarget.isIn()) return;
                    if (trigger.addedTargets && trigger.addedTargetfs.length) {
                        for (var i of trigger.addedTargets) {
                            if (!i.isIn()) return;
                        }
                    }
                    var next = player.useCard(get.copy(card), trigger.targets, false);
                    if (trigger.addedTarget) next.addedTarget = trigger.addedTarget;
                    if (trigger.addedTargets && trigger.addedTargets.length) next.addedTargets = trigger.addedTargets.slice(0);
                    if (event.count > 0) event.redo();
                },
                sub: true,
            },
            mark: {
                intro: {},
                onremove: function(player) {
                    player.unmarkSkill('tongli_mark');
                    delete player.storage.tongli_mark;
                },
                sub: true,
            },
            mark2: {
                intro: {},
                sub: true,
            },
            cishu: {
                trigger: {
                    player: "useCardAfter",
                },
                filter: function(event, player) {
                    //    if (player == _status.currentPhase) return true;
                    var evt = event.getParent('phaseUse');
                    if (evt.player == player) return true;
                    var type = get.type(event.card);
                    if (type != 'basic' && type != 'trick') return false;
                },
                forced: true,
                priority: 10,
                silent: true,
                content: function() {
                    player.addTempSkill('tongli_mark');
                    player.addMark('tongli_mark');
                },
                sub: true,
            },
            huase: {
                trigger: {
                    player: ["useCard", "phaseUseEnd", "drawEnd", "gainBegin", ],
                },
                forced: true,
                priority: 10,
                silent: true,
                filter: function(event, player) {
                    if (player == _status.currentPhase) return true;
                },
                content: function() {
                    var cards = [];
                    for (var i of player.getCards('h')) {
                        cards.add(get.suit(i, player))
                    }
                    var str = '';
                    str = cards.sortBySuit()
                        .join('');
                    /*    if (cards.indexOf('heart') != -1) str += '♥️';
                    if (cards.indexOf('diamond') != -1) str += '♦️️';
                    if (cards.indexOf('spade') != -1) str += '♠️️';
                    if (cards.indexOf('club') != -1) str += '♣️️';*/
                    player.storage.tongli_mark2 = '';
                    player.addTempSkill('tongli_mark2');
                    player.addMark('tongli_mark2', str)
                },
                sub: true,
            },
        },
        group: ["tongli_cishu", "tongli_huase"],
    }
    //新杀骆统 进谏            
    lib.skill.jinjian = {
        audio: 2,
        trigger: {
            source: "damageBegin1",
        },
        logTarget: "player",
        filter: function(event, player) {
            return !event.jinjian_source2 && !player.hasSkill('jinjian_source2');
        },
        "prompt2": "令即将对其造成的伤害+1",
        check: function(event, player) {
            return get.attitude(player, event.player) < 0 && !event.player.hasSkillTag('filterDamage', null, {
                player: player,
                card: event.card,
            });
        },
        content: function() {
            trigger.jinjian_source = true;
            trigger.num++;
            player.addTempSkill('jinjian_source2');
        },
        group: "jinjian_player",
        subSkill: {
            player: {
                audio: "jinjian",
                trigger: {
                    player: "damageBegin3",
                },
                filter: function(event, player) {
                    return !event.jinjian_player2 && !player.hasSkill('jinjian_player2');
                },
                "prompt2": "令即将受到的伤害-1",
                content: function() {
                    trigger.jinjian_player = true;
                    trigger.num--;
                    player.addTempSkill('jinjian_player2')
                },
                sub: true,
            },
            "source2": {
                trigger: {
                    source: "damageBegin1",
                },
                forced: true,
                charlotte: true,
                filter: function(event, player) {
                    return !event.jinjian_source;
                },
                content: function() {
                    trigger.num--;
                    trigger.jinjian_source2 = true;
                    player.removeSkill('jinjian_source2');
                },
                mark: true,
                marktext: "伤害-1",
                intro: {
                    content: "下次造成的伤害-1",
                },
                sub: true,
            },
            "player2": {
                trigger: {
                    player: "damageBegin3",
                },
                forced: true,
                charlotte: true,
                filter: function(event, player) {
                    return !event.jinjian_player;
                },
                content: function() {
                    trigger.num++;
                    trigger.jinjian_player2 = true;
                    player.removeSkill('jinjian_player2');
                },
                mark: true,
                marktext: "受到+1",
                intro: {
                    content: "下次受到的伤害+1",
                },
                sub: true,
            },
        },
        ai: {
            "maixie_defend": true,
            threaten: 0.9,
            effect: {
                target: function(card, player, target) {
                    if (player.hasSkillTag('jueqing')) return;
                    if (target.hujia) return;
                    if (player._jinjian_tmp) return;
                    if (_status.event.getParent('useCard', true) || _status.event.getParent('_wuxie', true)) return;
                    if (get.tag(card, 'damage')) {
                        if (target.hasSkill('jinjian_player2')) {
                            return [1, -2];
                        } else {
                            if (get.attitude(player, target) > 0) {
                                return [0, 0.2];
                            }
                            if (get.attitude(player, target) < 0 && !player.hasSkillTag('damageBonus')) {
                                var sha = player.getCardUsable({
                                    name: 'sha'
                                });
                                player._jinjian_tmp = true;
                                var num = player.countCards('h', function(card) {
                                    if (card.name == 'sha') {
                                        if (sha == 0) {
                                            return false;
                                        } else {
                                            sha--;
                                        }
                                    }
                                    return get.tag(card, 'damage') && player.canUse(card, target) && get.effect(target, card, player, player) > 0;
                                });
                                delete player._jinjian_tmp;
                                if (player.hasSkillTag('damage')) {
                                    num++;
                                }
                                if (num < 2) {
                                    return [0, 0.8];
                                }
                            }
                        }
                    }
                },
            },
        },
    };
    lib.skill.dcmingfa = {
        trigger: {
            player: "useCardAfter",
        },
        filter: function(event, player) {
            if (!player.isPhaseUsing()) return false;
            if (player.getExpansions('dcmingfa')
                .length) return false;
            return get.name(event.card) == 'sha' || get.type(event.card) == 'trick';
        },
        audio: 2,
        direct: true,
        content: function() {
            'step 0'
            player.chooseTarget(get.prompt('dcmingfa'), lib.filter.notMe)
                .ai = (target) => {
                if (trigger.card.name == 'wuxie' || trigger.card.name == 'tiesuo' || trigger.card.name == 'jiedao') return 0;
                return get.effect(target, trigger.card, player, player) > 0;
            }
            'step 1'
            if (result.bool) {
                player.logSkill('dcmingfa', result.targets[0]);
                player.addToExpansion('give', trigger.cards)
                    .gaintag.add('dcmingfa');
                result.targets[0].storage.dcmingfaSource = player;
                result.targets[0].addTempSkill('dcmingfa_end', {
                    player: 'phaseAfter'
                });
                result.targets[0].storage.dcmingfa_mark = '';
                result.targets[0].addTempSkill('dcmingfa_mark', {
                    player: 'phaseAfter'
                });
                var cc = get.translation(trigger.card.name);
                if (cc.length > 2) cc = cc.slice(0, 2) + "...";
                result.targets[0].markSkill("dcmingfa_mark", '', '明伐 ' + cc);
                var xx = get.translation(result.targets[0]);
                player.storage.dcmingfa_mark2 = '';
                player.addSkill("dcmingfa_mark2")
                player.markSkill("dcmingfa_mark2", '', '明伐 ' + xx);
            }
        },
        subSkill: {
            mark: {
                intro: {},
                onremove: function(player) {
                    player.unmarkSkill('dcmingfa_mark');
                    player.unmarkSkill('dcmingfa_mark2');
                    delete player.dcmingfa_mark;
                    delete player.dcmingfa_mark2;
                },
                sub: true,
            },
            mark2: {
                intro: {},
                sub: true,
            },
            end: {
                trigger: {
                    player: "phaseEnd",
                },
                forced: true,
                direct: true,
                audio: "dcmingfa",
                filter: function(event, player) {
                    return player.storage.dcmingfaSource && player.storage.dcmingfaSource.isIn() && player.storage.dcmingfaSource.getExpansions('dcmingfa')
                        .length;
                },
                content: function() {
                    'step 0'
                    event.count = Math.min(player.countCards('h'), 5);
                    if (event.count == 0) event.count = 1;
                    player.storage.dcmingfaSource.logSkill('dcmingfa', player);
                    event.card = get.copy(player.storage.dcmingfaSource.getExpansions('dcmingfa')[0]);

                    'step 1'
                    player.storage.dcmingfaSource.useCard(event.card, player);
                    'step 2'
                    if (!player.isIn()) {
                        player.storage.dcmingfaSource.loseToDiscardpile(player.storage.dcmingfaSource.getExpansions('dcmingfa'));
                        event.finish();
                    }
                    'step 3'
                    event.count--;
                    if (event.count > 0 && player.storage.dcmingfaSource.isIn()) event.goto(1);
                    else player.storage.dcmingfaSource.loseToDiscardpile(player.storage.dcmingfaSource.getExpansions('dcmingfa'));
                    'step 4'
                    player.storage.dcmingfaSource.unmarkSkill('dcmingfa_mark2')
                },
                sub: true,
            },
        },
    }
    //司马徽 龙印
    lib.skill.smh_huoji = {
        charlotte: true,
        group: ["smh_yeyan"],
        mark: true,
        marktext: "龙印",
        intro: {
            name: "龙印",
            content: "<li>出牌阶段限三次，你可以将一张红色牌当【火攻】使用。<br><li>若你同时拥有「凤印」，则你视为拥有技能〖业炎〗。（发动〖业炎〗后，弃置龙印和凤印）",
        },
        usable: 3,
        audio: 2,
        enable: "chooseToUse",
        position: "hes",
        filterCard: function(card) {
            return get.color(card) == 'red';
        },
        viewAs: {
            name: "huogong",
            nature: "fire",
        },
        viewAsFilter: function(player) {
            if (player.hasSkill('huoji')) return false;
            if (!game.hasPlayer(function(current) {
                return current.hasSkill('xinfu_jianjie');
            })) return false;
            if (!player.countCards('hes', {
                color: 'red'
            })) return false;
        },
        prompt: "将一张红色牌当火攻使用",
        check: function(card) {
            var player = _status.currentPhase;
            if (player.countCards('h') > player.hp) {
                return 6 - get.value(card);
            }
            return 4 - get.value(card)
        },
        ai: {
            fireAttack: true,
            basic: {
                order: 4,
                value: [3, 1],
                useful: 1,
            },
            wuxie: function(target, card, player, current, state) {
                if (get.attitude(current, player) >= 0 && state > 0) return false;
            },
            result: {
                player: function(player) {
                    var nh = player.countCards('h');
                    if (nh <= player.hp && nh <= 4 && _status.event.name == 'chooseToUse') {
                        if (typeof _status.event.filterCard == 'function' && _status.event.filterCard({
                            name: 'huogong'
                        }, player, _status.event)) {
                            return -10;
                        }
                        if (_status.event.skill) {
                            var viewAs = get.info(_status.event.skill)
                                .viewAs;
                            if (viewAs == 'huogong') return -10;
                            if (viewAs && viewAs.name == 'huogong') return -10;
                        }
                    }
                    return 0;
                },
                target: function(player, target) {
                    if (target.hasSkill('huogong2') || target.countCards('h') == 0) return 0;
                    if (player.countCards('h') <= 1) return 0;
                    if (target == player) {
                        if (typeof _status.event.filterCard == 'function' && _status.event.filterCard({
                            name: 'huogong'
                        }, player, _status.event)) {
                            return -1.15;
                        }
                        if (_status.event.skill) {
                            var viewAs = get.info(_status.event.skill)
                                .viewAs;
                            if (viewAs == 'huogong') return -1.15;
                            if (viewAs && viewAs.name == 'huogong') return -1.15;
                        }
                        return 0;
                    }
                    return -1.15;
                },
            },
            tag: {
                damage: 1,
                fireDamage: 1,
                natureDamage: 1,
                norepeat: 1,
            },
        },
    };
    //司马徽 凤印
    lib.skill.smh_lianhuan = {
        audio: 2,
        charlotte: true,
        enable: "phaseUse",
        filter: function(event, player) {
            if (player.hasSkill('lianhuan') || player.hasSkill('xinlianhuan')) return false;
            if (!game.hasPlayer(function(current) {
                return current.hasSkill('xinfu_jianjie');
            })) return false;
            if ((player.getStat()
                .skill.smh_lianhuan || 0) + (player.getStat()
                .skill.smh_lianhuan1 || 0) >= 3) return false;
            return player.countCards('hs', {
                suit: 'club'
            }) > 0;
        },
        filterCard: function(card) {
            return get.suit(card) == 'club';
        },
        viewAs: {
            name: "tiesuo",
        },
        position: "hs",
        prompt: "将一张梅花牌当铁锁连环使用",
        check: function(card) {
            return 6 - get.value(card)
        },
        mark: true,
        marktext: "凤印",
        intro: {
            name: "凤印",
            content: "<li>出牌阶段限三次，你可以将你的任意一张梅花手牌当作【铁索连环】使用或重铸。",
        },
        group: ["smh_lianhuan1"],
        ai: {
            wuxie: function(target, card, player, viewer) {
                if (_status.event.getRand() < 0.5) return 0;
                if (player == game.me && get.attitude(viewer, player) > 0) {
                    return 0;
                }
            },
            basic: {
                useful: 4,
                value: 4,
                order: 7,
            },
            result: {
                target: function(player, target) {
                    if (target.isLinked()) {
                        if (target.hasSkillTag('link')) return 0;
                        var f = target.hasSkillTag('nofire');
                        var t = target.hasSkillTag('nothunder');
                        if (f && t) return 0;
                        if (f || t) return 0.5;
                        return 2;
                    }
                    if (get.attitude(player, target) >= 0) return -0.9;
                    if (ui.selected.targets.length) return -0.9;
                    if (game.hasPlayer(function(current) {
                        return get.attitude(player, current) <= -1 && current != target && !current.isLinked();
                    })) {
                        return -0.9;
                    }
                    return 0;
                },
            },
            tag: {
                multitarget: 1,
                multineg: 1,
                norepeat: 1,
            },
        },
    };
    lib.skill.guili = {
        audio: 2,
        trigger: {
            player: "phaseBegin",
        },
        forced: true,
        locked: false,
        filter: function(event, player) {
            return player.phaseNumber == 1 && game.hasPlayer((current) => current != player);
        },
        content: function() {
            'step 0'
            player.chooseTarget(lib.filter.notMe, true, '请选择【归离】的目标', lib.translate.guili_info)
                .set('ai', function(target) {
                return -get.threaten(target);
            });
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                player.line(target, 'green');
                game.log(player, '选择了', target);
                player.storage.guili = '';
                player.markSkill("guili", '', '归离 ' + get.translation(target));
                player.storage.guili_insert = target;
                player.storage.guili = target;
                player.addSkill('guili_insert');
                game.delayx();
            }
        },
        intro: {
            content: "$的回合没造成伤害，<br>你获得一个额外的回合。",
        },
        onremove: true,
        subSkill: {
            insert: {
                trigger: {
                    global: "phaseAfter",
                },
                audio: 'guili',
                forced: true,
                charlotte: true,
                logTarget: "player",
                filter: function(event, player) {
                    if (event.player != player.storage.guili_insert) return false;
                    if (event.player.getHistory('sourceDamage')
                        .length > 0) return false;
                    var history = event.player.actionHistory;
                    if (history[history.length - 1].isRound) return true;
                    for (var i = history.length - 2; i >= 0; i--) {
                        if (history[i].isMe) return false;
                        if (history[i].isRound) return true;
                    }
                    return false;
                },
                content: function() {
                    player.insertPhase();
                    //player.addTempSkill('guili_mark');             
                    game.log(player, '执行一个额外的回合');
                },
                sub: true,
            },
            // mark:{mark:true,marktext:"归离",intro:{name:'额外回合',content:'当前进行的是额外回合。',},sub:true,},  
        },
    }
    lib.skill.tongxie = {
        audio: 2,
        trigger: {
            player: "phaseUseBegin",
        },
        direct: true,
        onremove: function(player) {
            for (var i of game.players) i.removeSkill('tongxie_mark');
        },
        content: function() {
            'step 0'
            for (var i of game.players) i.removeSkill('tongxie_mark');
            player.chooseTarget(get.prompt('tongxie'), '选择至多两名其他角色作为“同协角色”', lib.filter.notMe, [1, 2])
                .set('ai', function(target) {
                return get.attitude(_status.event.player, target);
            });
            'step 1'
            if (result.bool) {
                var targets = result.targets;
                for (var i = 0; i < targets.length; i++) {
                    targets[i].addSkill('tongxie_mark');
                }
                player.addSkill('tongxie_mark');
                player.storage.tongxie = targets;
                targets.add(player);
                player.logSkill('tongxie', targets);
                player.addTempSkill('tongxie_effect', {
                    player: 'phaseBegin'
                });
                player.markAuto('tongxie_effect', targets);
                var min = player.countCards('h'),
                    min_player = player;
                for (var i of targets) {
                    if (i == player) continue;
                    var num = i.countCards('h');
                    if (num < min) {
                        min = num;
                        min_player = i;
                    } else if (num == min) min_player = false;
                }
                if (min_player) min_player.draw();
                else game.delayx();
            }
        },
        subSkill: {
            mark: {
                mark: true,
                intro: {},
                sub: true,
            },
            effect: {
                audio: "tongxie",
                charlotte: true,
                trigger: {
                    global: "useCardAfter",
                },
                onremove: true,
                forced: true,
                popup: false,
                filter: function(event, player) {
                    if (event.card.name != 'sha' || event.targets.length != 1 || !event.targets[0].isIn()) return false;
                    if (event.getParent(2)
                        .name == 'tongxie_effect') return false;
                    var list = player.getStorage('tongxie_effect'),
                        target = event.targets[0];
                    if (!list.contains(event.player)) return false;
                    for (var i of list) {
                        if (i == event.player || !i.isIn()) continue;
                        if (!i.canUse('sha', target, false)) continue;
                        if (_status.connectMode && i.countCards('hs') > 0) return true;
                        if (i.hasSha()) return true;
                    }
                    return false;
                },
                content: function() {
                    'step 0'
                    event.targets = player.getStorage('tongxie_effect')
                        .filter(function(i) {
                        return i !== trigger.player;
                    })
                        .sortBySeat();
                    event.target = trigger.targets[0];
                    'step 1'
                    var current = targets.shift();
                    if (current.isIn() && target.isIn() && current.canUse('sha', target, false) && (_status.connectMode || current.hasSha())) {
                        current.chooseToUse(function(card, player, event) {
                            if (get.name(card) != 'sha') return false;
                            return lib.filter.filterCard.apply(this, arguments);
                        }, '同协：是否对' + get.translation(target) + '使用一张杀？')
                            .set('targetRequired', true)
                            .set('complexSelect', true)
                            .set('filterTarget', function(card, player, target) {
                            if (target != _status.event.sourcex && !ui.selected.targets.contains(_status.event.sourcex)) return false;
                            return lib.filter.targetEnabled.apply(this, arguments);
                        })
                            .set('sourcex', target)
                            .set('logSkill', 'tongxie_effect')
                            .set('addCount', false);
                        if (targets.length > 0) event.redo();
                    }
                },
                group: ["tongxie_damage", "tongxie_count"],
                sub: true,
            },
            damage: {
                audio: "tongxie",
                charlotte: true,
                trigger: {
                    global: "damageBegin4",
                },
                filter: function(event, player) {
                    var list = player.getStorage('tongxie_effect');
                    if (!list.contains(event.player)) return false;
                    for (var i of list) {
                        if (i != event.player && i.isAlive() && !i.hasSkill('tongxie_count2', null, null, false)) return true;
                    }
                    return false;
                },
                forced: true,
                popup: false,
                content: function() {
                    'step 0'
                    event.targets = player.getStorage('tongxie_effect')
                        .filter(function(i) {
                        return i != trigger.player && i.isAlive() && !i.hasSkill('tongxie_count2', null, null, false);
                    })
                        .sortBySeat();
                    event.num = 0;
                    'step 1'
                    var target = targets[num];
                    event.num++;
                    event.target = target;
                    target.chooseBool('同协：是否为' + get.translation(trigger.player) + '阻挡伤害？', '失去1点体力，防止' + get.translation(trigger.player) + '即将受到的' + get.cnNumber(trigger.num) + '点伤害')
                        .set('ai', function() {
                        var player = _status.event.player,
                            target = _status.event.getTrigger()
                                .player;
                        var trigger = _status.event.getTrigger();
                        var eff1 = get.damageEffect(target, trigger.source, player, trigger.nature);
                        if (trigger.num > 1) eff1 = Math.min(-1, eff1) * trigger.num;
                        var eff2 = get.effect(player, {
                            name: 'losehp'
                        }, player, player);
                        return eff2 > eff1;
                    });
                    'step 2'
                    if (result.bool) {
                        target.logSkill('tongxie_damage', trigger.player);
                        trigger.cancel();
                        target.loseHp();
                    } else if (num < targets.length) event.goto(1);
                },
                sub: true,
            },
            count: {
                trigger: {
                    global: "loseHpEnd",
                },
                charlotte: true,
                forced: true,
                firstDo: true,
                popup: false,
                silent: true,
                filter: function(event, player) {
                    return player.getStorage('tongxie_effect')
                        .contains(event.player);
                },
                content: function() {
                    trigger.player.addTempSkill('tongxie_count2');
                },
                sub: true,
            },
            "count2": {
                charlotte: true,
                sub: true,
            },
        },
    }
    lib.skill.discretesidi = {
        audio: "disordersidi",
        trigger: {
            player: "useCardAfter",
        },
        direct: true,
        filter: function(event, player) {
            return get.type(event.card, false) != 'delay' && game.hasPlayer(function(current) {
                return player != current && (!player.storage.discretesidi || !player.storage.discretesidi.contains(current));
            });
        },
        content: function() {
            'step 0'
            player.chooseTarget(get.prompt('discretesidi'), '选择两名角色，或选择一名角色用牌为自己', [1, 2], function(card, player, target) {
                if (ui.selected.targets.length) return true;
                return target != player && (!player.storage.discretesidi || !player.storage.discretesidi.contains(target));
            })
                .set('complexTarget', true)
                .set('complexSelect', true)
                .set('targetprompt', ['司敌', '用牌目标'])
                .set('ai', function(target) {
                var player = _status.event.player;
                if (!ui.selected.targets.length) {
                    if (target.getEnemies()
                        .length == 1) return 2 + Math.random();
                    return 1 + Math.random();
                }
                var targetx = ui.selected.targets[0];
                if (targetx.getEnemies()
                    .contains(target) && targetx.inRange(target)) return Math.random() - 0.5;
                return 0;
            })
                .animate = false;
            'step 1'
            if (result.bool && result.targets.length) {
                var targets = result.targets;
                player.logSkill('discretesidi', targets[0]);
                if (targets.length == 1) targets.push(targets[0]);
                if (!player.storage.discretesidi) player.storage.discretesidi = [];
                if (!player.storage.discretesidi2) player.storage.discretesidi2 = [];
                player.storage.discretesidi.push(targets[0]);
                player.storage.discretesidi2.push(targets[1]);
                player.markSkill('discretesidi');
                if (player == game.me || player.isUnderControl()) {
                    targets[0].storage.discretesidi_mark = '';
                    targets[0].addSkill('discretesidi_mark')
                    targets[0].markSkill('discretesidi_mark', '', '司敌 ' + get.translation(targets[1]));
                }
                game.delayx();
            }
        },
        // intro:{
        // content:function(storage,player){
        // if((player==game.me||player.isUnderControl())&&!game.observe){
        // var str='R={ ';
        // for(var i=0;i<storage.length;i++){
        // str+=('&lt;'+get.translation(storage[i])+', '+get.translation(player.storage.discretesidi2[i])+'&gt;');
        // if(i<storage.length-1) str+=', ';
        // }
        // str+=' }'
        // return str;
        // }
        // return '已指定'+get.translation(storage)+'为目标';
        // },
        // },
        onremove: function(player) {
            delete player.storage.discretesidi;
            delete player.storage.discretesidi2;
        },
        group: ["discretesidi_clear", "discretesidi_exec"],
        subSkill: {
            mark: {
                intro: {},
                sub: true,
            },
            clear: {
                trigger: {
                    global: ["useCardToPlayered", "die"],
                },
                forced: true,
                popup: false,
                locked: false,
                filter: function(event, player) {
                    if (!player.storage.discretesidi || !player.storage.discretesidi.contains(event.player)) return false;
                    if (event.name == 'die') return true;
                    if (get.type(event.card, false) != 'delay') {
                        var index = player.storage.discretesidi.indexOf(event.player);
                        return index != -1 && (player.storage.discretesidi2[index] != event.target || event.targets.length != 1);
                    }
                    return false;
                },
                content: function() {
                    player.storage.discretesidi2.splice(player.storage.discretesidi.indexOf(trigger.player), 1);
                    player.unmarkAuto('discretesidi', [trigger.player]);
                    trigger.player.removeSkill('discretesidi_mark');
                    trigger.player.unmarkSkill('discretesidi_mark');
                },
                sub: true,
            },
            exec: {
                audio: "disordersidi",
                trigger: {
                    global: "useCardToPlayered",
                },
                forced: true,
                locked: false,
                filter: function(event, player) {
                    if (get.type(event.card, false) == 'delay' || !player.storage.discretesidi || event.targets.length != 1) return false;
                    var index = player.storage.discretesidi.indexOf(event.player);
                    return index != -1 && player.storage.discretesidi2[index] == event.target;
                },
                logTarget: "player",
                content: function() {
                    'step 0'
                    player.storage.discretesidi2.splice(player.storage.discretesidi.indexOf(trigger.player), 1);
                    player.unmarkAuto('discretesidi', [trigger.player]);
                    trigger.player.removeSkill('discretesidi_mark');
                    trigger.player.unmarkSkill('discretesidi_mark');
                    if (trigger.target == player) {
                        player.draw();
                        event.finish();
                        return;
                    }
                    var target = trigger.player;
                    event.target = target;
                    player.chooseControl('cancel2')
                        .set('choiceList', [
                        '取消' + get.translation(trigger.card) + '的所有目标并对' + get.translation(target) + '造成1点伤害',
                        '摸两张牌', ])
                        .set('ai', function() {
                        var player = _status.event.player,
                            evt = _status.event.getTrigger();
                        if (get.damageEffect(evt.player, player, player) > 0 && get.effect(evt.target, evt.card, evt.player, player) < 0) return 0;
                        return 1;
                    });
                    'step 1'
                    if (result.index == 0) {
                        trigger.cancel();
                        trigger.targets.length = 0;
                        trigger.getParent()
                            .triggeredTargets1.length = 0;
                        if (!_status.dying.length) target.damage();
                    } else if (result.index == 1) player.draw(2);
                },
                sub: true,
            },
        },
    }
    lib.skill.xinfu_jixu = {
        audio: 2,
        enable: "phaseUse",
        usable: 1,
        filter: function(event, player) {
            return player.countCards('h') > 0;
        },
        filterTarget: function(card, player, target) {
            if (player == target) return false;
            if (ui.selected.targets.length) {
                return target.hp == ui.selected.targets[0].hp;
            }
            return true;
        },
        selectTarget: [1, Infinity],
        multitarget: true,
        multiline: true,
        content: function() {
            "step 0"
            targets.sort(lib.sort.seat);
            "step 1"
            if (!event.num) event.num = 0;
            if (!event.caicuolist) event.caicuolist = [];
            targets[event.num].chooseBool("是否押杀？")
                .ai = function(event, player) {
                var evt = _status.event.getParent();
                if (get.attitude(targets[event.num], evt.player) > 0) return evt.player.countCards('h', 'sha') ? false : true;
                return Math.random() < 0.5;
            };
            "step 2"
            if (result.bool) {
                targets[event.num].chat('有杀');
                game.log(targets[event.num], '认为', player, '#g有杀');
                if (!player.countCards('h', 'sha')) {
                    event.caicuolist.add(targets[event.num]);
                    targets[event.num].addTempSkill('xinfu_jixu_caicuo')
                };
            } else {
                targets[event.num].chat('没杀');
                game.log(targets[event.num], '认为', player, '#y没有杀');
                if (player.countCards('h', 'sha')) {
                    event.caicuolist.add(targets[event.num]);
                    targets[event.num].addTempSkill('xinfu_jixu_caicuo')
                };
            }
            event.num++;
            game.delay();
            if (event.num < targets.length) event.goto(1);
            "step 3"
            player.popup(player.countCards('h', 'sha') ? "有杀" : "没杀");
            game.log(player, player.countCards('h', 'sha') ? "有杀" : "没杀");
            player.addTempSkill(player.countCards('h', 'sha') ? "xinfu_jixu_yousha" : "xinfu_jixu_meisha");
            if (event.caicuolist.length == 0) {
                //targets[event.num].addTempSkill('xinfu_jixu_caicuo');
                var evt = _status.event.getParent('phaseUse');
                if (evt && evt.name == 'phaseUse') {
                    evt.skipped = true;
                    event.finish();
                }
            } else {
                player.draw(event.caicuolist.length)
                if (player.countCards('h', 'sha')) {
                    player.addTempSkill('jixu_sha');
                    player.storage.jixu_sha = event.caicuolist;
                    event.finish();
                } else event.num = 0;
            }
            "step 4"
            if (event.num < event.caicuolist.length) {
                var target = event.caicuolist[event.num];
                player.discardPlayerCard(true, 'he', target);
                event.num++;
                event.redo();
            }
        },
        subSkill: {
            caicuo: {
                mark: true,
                marktext: "击虚 猜错",
                intro: {},
                sub: true,
            },
            meisha: {
                mark: true,
                marktext: "击虚 没杀",
                intro: {},
                sub: true,
            },
            yousha: {
                mark: true,
                marktext: "击虚 有杀",
                intro: {},
                sub: true,
            },
        },
        ai: {
            order: function() {
                return get.order({
                    name: 'sha'
                }) + 0.1;
            },
            result: {
                target: function(player, target) {
                    var raweffect = function(player, target) {
                        if (player.countCards('h', 'sha')) {
                            return get.effect(target, {
                                name: 'sha'
                            }, player, target);
                        } else {
                            var att = get.attitude(player, target);
                            var nh = target.countCards('h');
                            if (att > 0) {
                                if (target.getEquip('baiyin') && target.isDamaged() && get.recoverEffect(target, player, player) > 0) {
                                    if (target.hp == 1 && !target.hujia) return 1.6;
                                    if (target.hp == 2) return 0.01;
                                    return 0;
                                }
                            }
                            var es = target.getCards('e');
                            var noe = (es.length == 0 || target.hasSkillTag('noe'));
                            var noe2 = (es.length == 1 && es[0].name == 'baiyin' && target.isDamaged());
                            var noh = (nh == 0 || target.hasSkillTag('noh'));
                            if (noh && (noe || noe2)) return 0;
                            if (att <= 0 && !target.countCards('he')) return 1.5;
                            return -1.5;
                        }
                    }
                    var num = game.countPlayer(function(current) {
                        return current != player && current.hp == target.hp && (raweffect(player, current) * get.attitude(player, current)) > 0
                    });
                    return raweffect(player, target) * Math.max(0, num - 1);
                },
            },
            expose: 0.4,
        },
    };
    lib.skill.resghuishi = {
        audio: "sghuishi",
        inherit: "sghuishi",
        filterTarget: true,
        content: function() {
            'step 0'
            player.awakenSkill('resghuishi');
            var list = target.getSkills(null, false, false)
                .filter(function(skill) {
                var info = lib.skill[skill];
                return info && info.juexingji && !target.awakenedSkills.contains(skill);
            });
            if (player.maxHp >= game.players.length && list.length > 0) {
                if (list.length == 1) event._result = {
                    control: list[0]
                };
                else player.chooseControl(list)
                    .set('prompt', '选择一个觉醒技，令' + get.translation(target) + '可无视条件发动该技能');
            } else {
                target.draw(4);
                event.goto(2);
            }
            'step 1'
            target.storage.resghuishi = result.control;
            target.markSkill('resghuishi');
            target.addSkill('resghuishi_mark');
            target.markSkill('resghuishi_mark', '', '辉逝 ' + get.translation(result.control));
            var info = lib.skill[result.control];
            if (info.filter && !info.charlotte && !info.sghuishi_filter) {
                info.sghuishi_filter = info.filter;
                info.filter = function(event, player) {
                    if (player.storage.resghuishi) return true;
                    return this.sghuishi_filter.apply(this, arguments);
                }
            }
            'step 2'
            player.loseMaxHp(2);
        },
        intro: {
            content: "发动【$】时无视条件",
        },
        ai: {
            order: 0.1,
            expose: 0.2,
            result: {
                target: function(player, target) {
                    if (target != player && player.hasUnknown() || player.maxHp < (player.getDamagedHp() > 1 ? 5 : 6)) return 0;
                    if (target == player && player.hasSkill('resghuishi') && game.hasPlayer(function(current) {
                        return current.getAllHistory('damage')
                            .length == 0;
                    })) return 4;
                    var list = target.getSkills(null, false, false)
                        .filter(function(skill) {
                        var info = lib.skill[skill];
                        return info && info.juexingji && !target.awakenedSkills.contains(skill);
                    });
                    if (list.length || target.hasJudge('lebu') || target.hasSkillTag('nogain')) return 0;
                    return 4;
                },
            },
        },
        enable: "phaseUse",
        limited: true,
        skillAnimation: true,
        animationColor: "water",
        mark: true,
        init: function(player, skill) {
            player.storage[skill] = false;
        },
        subSkill: {
            mark: {
                intro: {},
                trigger: {
                    player: ['phaseZhunbeiBefore', 'dieBefore'],
                },
                forced: true,
                content: function() {
                    player.removeSkill('resghuishi_mark');
                    player.unmarkSkill('resghuishi_mark');
                },
                sub: true,
            },
        },
    };
    lib.skill.reqianxin2 = {
        trigger: {
            player: 'phaseZhunbeiBegin'
        },
        forced: true,
        popup: false,
        charlotte: true,
        init: function(player, skill) {
            if (!player.storage[skill]) player.storage[skill] = [];
        },
        mark: true,
        marktext: "遣信",
        intro: {
            name: '遣信',
        },
        onremove: true,
        filter: function(event, player) {
            var list = player.storage.reqianxin2;
            if (Array.isArray(list)) {
                var hs = player.getCards('h');
                for (var i = 0; i < list.length; i++) {
                    if (hs.contains(list[i][0]) && list[i][1].isIn()) return true;
                }
            }
            return false;
        },
        content: function() {
            'step 0'
            var current = player.storage.reqianxin2.shift();
            event.source = current[1];
            if (!event.source.isIn() || !player.getCards('h')
                .contains(current[0])) event.goto(3);
            'step 1'
            source.logSkill('reqianxin', player);
            player.chooseControl()
                .set('choiceList', [
                '令' + get.translation(source) + '摸两张牌',
                '令自己本回合的手牌上限-2', ])
                .set('prompt', get.translation(source) + '发动了【遣信】，请选择一项')
                .set('source', source)
                .set('ai', function() {
                var player = _status.event.player;
                if (get.attitude(player, _status.event.source) > 0) return 0;
                if (player.maxHp - player.countCards('h') > 1) return 1;
                return Math.random() > 0.5 ? 0 : 1;
            });
            'step 2'
            if (result.index == 0) source.draw(2);
            else {
                player.addTempSkill('reqianxin3')
                player.addMark('reqianxin3', 2, false)
            }
            'step 3'
            if (player.storage.reqianxin2.length) event.goto(0);
            else player.removeSkill('reqianxin2');
        },
    }
    lib.skill.reqianxin3 = {
        mark: true,
        marktext: "手牌上限-",
        intro: {
            name: '遣信',
            content: '手牌上限-#',
        },
        onremove: true,
        mod: {
            maxHandcard: function(player, num) {
                return num - player.countMark('reqianxin3');
            },
        },
    }
    lib.skill.yuanyu = {
        audio: 2,
        enable: 'phaseUse',
        usable: 1,
        content: function () {
            'step 0'
            player.draw();
            'step 1'
            if (player.countCards('h') > 0) {
                var suits = lib.suit.slice(0), cards = player.getExpansions('yuanyu');
                for (var i of cards) suits.remove(get.suit(i, false));
                var str = '选择一张手牌，作为“怨”置于武将牌上；同时选择一名其他角色，令该角色获得〖怨语〗的后续效果。'
                if (suits.length) {
                    str += '目前“怨”中未包含的花色：';
                    for (var i of suits) str += get.translation(i);
                }
                player.chooseCardTarget({
                    filterCard: true,
                    filterTarget: lib.filter.notMe,
                    position: 'h',
                    prompt: '怨语：选择置于武将牌上的牌和目标',
                    prompt2: str,
                    suits: suits,
                    forced: true,
                    ai1: function (card) {
                        var val = get.value(card), evt = _status.event;
                        if (evt.suits.contains(get.suit(card, false))) return 8 - get.value(card);
                        return 5 - get.value(card);
                    },
                    ai2: function (target) {
                        var player = _status.event.player;
                        if (player.storage.yuanyu_damage && player.storage.yuanyu_damage.contains(target)) return 0;
                        return -get.attitude(player, target);
                    },
                });
            }
            else event.finish();
            'step 2'
            var target = result.targets[0];
            player.addSkill('yuanyu_damage');
            player.markAuto('yuanyu_damage', result.targets);
            player.line(target, 'green');
            if (!target.storage.yuanyu_mark) {
                target.storage.yuanyu_mark = player;
                target.markSkillCharacter('yuanyu_mark', player, '怨语', '已获得〖怨语〗效果');
                target.addSkill('yuanyu_mark');
            }
            player.addToExpansion(result.cards, player, 'give').gaintag.add('yuanyu');
            if (!player.storage.yuanyu1) player.storage.yuanyu1 = [];
            player.storage.yuanyu1.add(get.suit(result.cards));
            var str = [];
            if (player.storage.yuanyu1.contains('heart')) str += '♥️️';
            if (player.storage.yuanyu1.contains('diamond')) str += '♦️️';
            if (player.storage.yuanyu1.contains('spade')) str += '♠️️';
            if (player.storage.yuanyu1.contains('club')) str += '♣️️';
            player.unmarkSkill('yuanyu');
            player.storage.yuanyu = '';
            player.markSkill("yuanyu", '', '怨语 ' + str);
        },
        marktext: "怨语",
        intro: {
            content: 'expansion',
            markcount: 'expansion',
        },
        onremove: function (player, skill) {
            var cards = player.getExpansions(skill);
            if (cards.length) player.loseToDiscardpile(cards);
            player.removeSkill('yuanyu_damage');
        },
        ai: {
            order: 7,
            result: {
                player: 1,
            },
        },
        subSkill: {
            mark: {
                mark: true,
                intro: {
                    content: '已获得〖怨语〗效果',
                    onunmark: true,
                },
            },
            damage: {
                trigger: { global: ['damageSource', 'phaseDiscardBegin'] },
                forced: true,
                charlotte: true,
                onremove: function (player, skill) {
                    if (player.storage[skill]) {
                        for (var i of player.storage[skill]) {
                            if (i.storage.yuanyu_mark == player) i.unmarkSkill('yuanyu_mark');
                        }
                    }
                    delete player.storage[skill];
                },
                filter: function (event, player) {
                    if (event.name == 'damage') {
                        var source = event.source;
                        return source && player.getStorage('yuanyu_damage').contains(source) && source.countCards('h') > 0;
                    }
                    else {
                        if (player == event.player) {
                            return player.getStorage('yuanyu_damage').some(function (target) {
                                return target.isIn() && target.countCards('h') > 0;
                            });
                        }
                        else if (player.getStorage('yuanyu_damage').contains(event.player)) {
                            return event.player.countCards('h') > 0;
                        }
                        return false;
                    }
                },
                content: function () {
                    'step 0'
                    if (trigger.name == 'phaseDiscard') {
                        if (trigger.player == player) {
                            event.targets = player.getStorage('yuanyu_damage').filter(function (target) {
                                return target.isIn() && target.countCards('h') > 0;
                            }).sortBySeat();
                        }
                        else event.targets = [trigger.player];
                    }
                    else event.targets = [trigger.source];
                    'step 1'
                    event.target = event.targets.shift();
                    event.count = trigger.name == 'damage' ? trigger.num : 1;
                    'step 2'
                    event.count--;
                    var suits = lib.suit.slice(0), cards = player.getExpansions('yuanyu');
                    for (var i of cards) suits.remove(get.suit(i, false));
                    var next = target.chooseCard('h', true, '将一张手牌置于' + get.translation(player) + '的武将牌上');
                    next.set('suits', suits);
                    next.set('ai', function (card) {
                        var val = get.value(card), evt = _status.event;
                        if (evt.suits.contains(get.suit(card, false))) return 5 - get.value(card);
                        return 8 - get.value(card);
                    });
                    if (suits.length) {
                        var str = '目前未包含的花色：';
                        for (var i of suits) str += get.translation(i);
                        next.set('prompt2', str);
                    }
                    'step 3'
                    player.addToExpansion(result.cards, target, 'give').gaintag.add('yuanyu');
                    if (!player.storage.yuanyu1) player.storage.yuanyu1 = [];
                    player.storage.yuanyu1.add(get.suit(result.cards));
                    var str = [];
                    if (player.storage.yuanyu1.contains('heart')) str += '♥️️';
                    if (player.storage.yuanyu1.contains('diamond')) str += '♦️️';
                    if (player.storage.yuanyu1.contains('spade')) str += '♠️️';
                    if (player.storage.yuanyu1.contains('club')) str += '♣️️';
                    player.unmarkSkill('yuanyu');
                    player.storage.yuanyu = '';
                    player.markSkill("yuanyu", '', '怨语 ' + str);
                    'step 4'
                    if (!player.hasSkill('yuanyu_damage')) event.finish();
                    else if (event.count > 0 && target.countCards('h') > 0) event.goto(2);
                    else if (event.targets.length > 0) event.goto(1);
                },
            },
        },
    }
    lib.skill.xiyan = {
        audio: 2,
        trigger: {
            player: "addToExpansionAfter",
        },
        filter: function (event, player) {
            if (!event.gaintag.contains('yuanyu')) return false;
            var cards = player.getExpansions('yuanyu');
            if (cards.length < lib.suit.length) return false;
            var suits = lib.suit.slice(0);
            for (var i of cards) {
                suits.remove(get.suit(i));
                if (!suits.length) return true;
            }
            return false;
        },
        logTarget: () => _status.currentPhase,
        prompt2: '获得所有“怨”',
        check: () => true,
        content: function () {
            'step 0'
            player.removeSkill('yuanyu_damage');
            delete player.storage.yuanyu1;
            var cards = player.getExpansions('yuanyu');
            player.gain(cards, 'gain2');

            'step 1'
            var target = _status.currentPhase;
            if (player == target) {
                player.addMark('xiyan_buff', 4, false);
                player.addTempSkill('xiyan_buff');
                delete player.getStat('skill').yuanyu;
                event.finish();
            }
            else {
                player.chooseBool('夕颜：是否令' + get.translation(target) + '本回合的手牌上限-4且不能使用基本牌？').set('ai', function () {
                    return _status.event.bool;
                }).set('bool', get.attitude(player, target) < 0);
            }
            'step 2'
            if (result.bool) {
                var target = _status.currentPhase;
                target.addMark('xiyan_debuff', 4, false);
                target.addTempSkill('xiyan_debuff');
            }
        },
        subSkill: {
            buff: {
                charlotte: true,
                mark: true,
                marktext: "手牌上限+",
                intro: {
                    content: "本回合手牌上限+4且使用牌无次数限制",
                },
                mod: {
                    maxHandcard: function (player, num) {
                        return num + player.countMark('xiyan_buff');
                    },
                    cardUsable: function (card, player) {
                        return Infinity;
                    },
                },
                sub: true,
            },
            debuff: {
                charlotte: true,
                mark: true,
                marktext: "手牌上限-",
                intro: {
                    content: "本回合手牌上限-#且不能使用基本牌",
                },
                mod: {
                    maxHandcard: function (player, num) {
                        return num - player.countMark('xiyan_debuff');
                    },
                    cardEnabled: function (card) {
                        if (get.type(card) == 'basic') return false;
                    },
                    cardSavable: function (card) {
                        if (get.type(card) == 'basic') return false;
                    },
                },
                sub: true,
            },
        },
    }
    lib.skill.twjingce = {
        marktext: "策",
        intro: {
            name: "策",
            content: "mark",
        },
        audio: 2,
        trigger: {
            player: "useCard",
        },
        filter: function(event, player) {
            var evt = event.getParent('phaseUse');
            if (!evt || evt.player != player) return false;
            var history = player.getHistory('useCard', function(evtx) {
                return evtx.getParent('phaseUse') == evt;
            });
            return history && history.indexOf(event) == player.hp - 1;
        },
        frequent: true,
        content: function() {
            'step 0'
            player.draw(player.hp);
            'step 1'
            if (player.getHistory('sourceDamage')
                .length || player.getHistory('gain', function(evt) {
                return evt.getParent('phaseUse') == trigger.getParent('phaseUse') && evt.getParent()
                    .name == 'draw';
            })
                .length > 1) player.addMark('twjingce', 1);
        },
        subSkill: {
            mark: {
                mark: true,
                intro: {},
                onremove: function(player) {
                    player.unmarkSkill('twjingce_mark');
                    delete player.storage.twjingce_mark;
                },
                sub: true,
            },
        },
        group: "xinfu_guagua1",
    }
    lib.skill.xinfu_guagua1 = {
        trigger: {
            player: "useCard2",
        },
        forced: true,
        filter: function(event, player) {
            var evt = event.getParent('phaseUse');
            if (evt.player == player) return true;
        },
        content: function() {
            player.addTempSkill("twjingce_mark");
            player.addMark('twjingce_mark');
        },
    }
    lib.skill.twgezhi = {
        audio: 2,
        trigger: {
            player: "useCard",
        },
        direct: true,
        filter: function(event, player) {
            if (!player.countCards('h')) return false;
            var evt = event.getParent('phaseUse');
            if (!evt || evt.player != player) return false;
            var type = get.type2(event.card, false);
            return !player.hasHistory('useCard', function(evtx) {
                return evtx != event && get.type2(evtx.card, false) == type && evtx.getParent('phaseUse') == evt;
            }, event);
        },
        content: function() {
            'step 0'
            if (!event.isMine() && !event.isOnline()) game.delayx();
            player.chooseCard('是否发动【革制】重铸一张牌？')
                .set('ai', function(card) {
                return 5.5 - get.value(card);
            });
            player.addTempSkill("twgezhi_mark");
            if (!player.storage.twgezhi_mark1) player.storage.twgezhi_mark1 = [];
            var str = '';
            if (get.type(trigger.card) == 'trick') str = '锦';
            if (get.type(trigger.card) == 'delay') str = '锦';
            else if (get.type(trigger.card) == 'basic') str = '基';
            else if (get.type(trigger.card) == 'equip') str = '装';
            var num = '';
            if (player.storage.twgezhi_mark1.indexOf(str) == -1) player.storage.twgezhi_mark1 += str;
            if (player.storage.twgezhi_mark1.indexOf('基') != -1) num += '基';
            if (player.storage.twgezhi_mark1.indexOf('锦') != -1) num += '锦';
            if (player.storage.twgezhi_mark1.indexOf('装') != -1) num += '装';
            player.storage.twgezhi_mark = '';
            player.addMark("twgezhi_mark", num);
            'step 1'
            if (result.bool) {
                player.logSkill('twgezhi');
                player.loseToDiscardpile(result.cards);
                player.draw();
            }
        },
        group: "twgezhi_buff",
        subSkill: {
            mark: {
                marktext: '革制 ',
                intro: {
                    name: '革制',
                },
                onremove: function(player) {
                    player.removeMark('twgezhi_mark');
                    delete player.storage.twgezhi_mark1;
                },
            },
            buff: {
                audio: "twgezhi",
                trigger: {
                    player: "phaseUseEnd",
                },
                direct: true,
                filter: function(event, player) {
                    return player.getHistory('lose', function(evt) {
                        return evt.getParent(2)
                            .name == 'twgezhi' && evt.getParent('phaseUse') == event;
                    })
                        .length > 1;
                },
                content: function() {
                    'step 0'
                    player.chooseTarget(get.prompt('twgezhi'), '你可以令一名角色选择获得一个其未获得过的效果：⒈攻击范围+2；⒉手牌上限+2；⒊加1点体力上限。', function(card, player, target) {
                        return !target.hasSkill('twgezhi_选项一') || !target.hasSkill('twgezhi_选项二') || !target.hasSkill('twgezhi_选项三');
                    })
                        .set('ai', function(target) {
                        return get.attitude(_status.event.player, target);
                    });
                    'step 1'
                    if (result.bool) {
                        var target = result.targets[0];
                        event.target = target;
                        player.logSkill('twgezhi', target);
                        var list = [];
                        for (var i = 1; i <= 3; i++) {
                            var str = '选项' + get.cnNumber(i, true);
                            if (!target.hasSkill('twgezhi_' + str)) list.push(str);
                        }
                        if (list.length == 1) event._result = {
                            control: list[0]
                        };
                        else target.chooseControl(list)
                            .set('choiceList', ['令自己的攻击范围+2', '令自己的手牌上限+2', '令自己的体力上限+1'])
                            .set('ai', function() {
                            var player = _status.event.player,
                                controls = _status.event.controls;
                            if (controls.contains('选项一') && game.hasPlayer(function(current) {
                                return (get.realAttitude || get.attitude)(player, current) < 0 && get.distance(player, current, 'attack') > 1;
                            })) return '选项一';
                            if (controls.contains('选项二') && player.needsToDiscard()) return '选项二';
                            if (controls.contains('选项三')) return '选项三';
                            return controls.randomGet();
                        });
                    } else {
                        event._triggered = null;
                        event.finish();
                    }
                    'step 2'
                    target.addSkill('twgezhi_' + result.control);
                    if (result.control == '选项三') target.gainMaxHp();
                    'step 3'
                    game.delayx();
                },
                sub: true,
            },
            "选项一": {
                charlotte: true,
                mod: {
                    attackFrom: function(from, to, distance) {
                        return distance - 2;
                    },
                },
                mark: true,
                marktext: "攻击范围+2",
                intro: {
                    content: "攻击范围+2",
                },
                sub: true,
            },
            "选项二": {
                charlotte: true,
                mod: {
                    maxHandcard: function(player, num) {
                        return num + 2;
                    },
                },
                mark: true,
                marktext: "手牌上限+2",
                intro: {
                    content: "手牌上限+2",
                },
                sub: true,
            },
            // "选项三":{
            // charlotte:true,
            // mark:true,
            // marktext:" 体限+1 ",
            // intro:{
            // content:"体力上限+1",
            // },
            // sub:true,
            // },
        },
    }
    lib.skill.twfengji = {
        audio: 2,
        mahouSkill: true,
        trigger: {
            player: "phaseUseBegin",
        },
        filter: function(event, player) {
            return !player.getExpansions('twfengji')
                .length && !player.hasSkill('twfengji_mahou') && player.countCards('he');
        },
        direct: true,
        content: function() {
            'step 0'
            player.chooseCard('he', get.prompt2('twfengji'))
                .set('ai', function(card) {
                var name = card.name,
                    num = 0;
                for (var i = 0; i < ui.cardPile.childNodes.length; i++) {
                    if (ui.cardPile.childNodes[i].name == name) num++;
                }
                if (num < 2) return false;
                return 8 - get.value(card);
            });
            'step 1'
            if (result.bool) {
                player.logSkill('twfengji');
                player.addToExpansion(result.cards, player, 'giveAuto')
                    .gaintag.add('twfengji');
                player.chooseControl('1回合', '2回合', '3回合')
                    .set('prompt', '请选择施法时长')
                    .set('ai', function() {
                    var player = _status.event.player;
                    var safe = Math.min(player.getHandcardLimit(), player.countCards('h', 'shan'));
                    if (safe < Math.min(3, game.countPlayer())) {
                        var next = player.next;
                        while (next != player && get.attitude(next, player) > 0) {
                            safe++;
                            next = next.next;
                        }
                    }
                    return Math.max(2, Math.min(safe, 3, game.countPlayer())) - 1;
                });
            } else event.finish();
            'step 2'
            player.storage.twfengji_mahou = [result.index + 1, result.index + 1];
            player.addTempSkill('twfengji_mahou', {
                player: 'die'
            });
            player.addTempSkill('twfengji_mark', {
                player: 'die'
            });
            player.storage.twfengji_mark = [];
            player.markSkill('twfengji_mark', '', '蜂集' + player.storage.twfengji_mahou[0] + ' - ' + player.storage.twfengji_mahou[1])
        },
        marktext: "示",
        onremove: function(player, skill) {
            var cards = player.getExpansions(skill);
            if (cards.length) player.loseToDiscardpile(cards);
        },
        intro: {
            content: "expansion",
            markcount: "expansion",
        },
        subSkill: {
            mark: {
                intro: {
                    name: "施法：蜂集",
                    content: function(s, p) {
                        var str = '施法：蜂集-剩余回合：'
                        str += p.storage.twfengji_mahou[1];
                        str += '<br>施法：蜂集-成功摸牌数：'
                        str += p.storage.twfengji_mahou[0];
                        return str;
                    },
                },
                sub: true,
            },
            mahou: {
                trigger: {
                    global: "phaseBegin",
                },
                forced: true,
                popup: false,
                charlotte: true,
                content: function() {
                    var list = player.storage.twfengji_mahou;
                    list[1]--;
                    if (list[1] == 0) {
                        game.log(player, '的“蜂集”魔法生效');
                        player.logSkill('twfengji');
                        var cards = player.getExpansions('twfengji');
                        if (cards.length) {
                            var cards2 = [],
                                num = list[0];
                            for (var card of cards) {
                                for (var i = 0; i < num; i++) {
                                    var card2 = get.cardPile2(function(cardx) {
                                        return cardx.name == card.name && !cards2.contains(cardx);
                                    });
                                    if (card2) cards2.push(card2);
                                    else break;
                                }
                            }
                            game.delayx();
                            if (cards2.length) player.gain(cards2, 'gain2');
                            player.loseToDiscardpile(cards);
                        }
                        player.removeSkill('twfengji_mahou');
                        player.removeSkill('twfengji_mark');
                    } else {
                        game.log(player, '的“蜂集”魔法剩余', '#g' + (list[1]) + '回合');
                        player.markSkill('twfengji_mahou');
                        player.unmarkSkill('twfengji_mark');
                        player.storage.twfengji_mark = [];
                        player.markSkill('twfengji_mark', '', '蜂集' + player.storage.twfengji_mahou[0] + ' - ' + player.storage.twfengji_mahou[1])
                    }
                },
                ai: {
                    threaten: 2.5,
                },
                sub: true,
            },
        },
    }
    lib.skill.twharvestinori = {
        audio: 2,
        mahouSkill: true,
        enable: "phaseUse",
        usable: 1,
        filter: function(event, player) {
            return !player.hasSkill('twharvestinori_mahou') && player.countCards('h', lib.skill.twharvestinori.filterCard) > 0;
        },
        filterCard: {
            color: "black",
        },
        check: function(card) {
            return 8 - get.value(card);
        },
        content: function() {
            'step 0'
            player.chooseControl('1回合', '2回合', '3回合')
                .set('prompt', '请选择施法时长')
                .set('ai', function() {
                var player = _status.event.player;
                var safe = player.hp;
                if (safe < Math.min(3, game.countPlayer())) {
                    var next = player.next;
                    while (next != player && get.attitude(next, player) > 0) {
                        safe++;
                        next = next.next;
                    }
                }
                return Math.max(1, Math.min(safe, 3, game.countPlayer())) - 1;
            });
            'step 1'
            player.storage.twharvestinori_mahou = [result.index + 1, result.index + 1];
            player.addTempSkill('twharvestinori_mahou', {
                player: 'die'
            });
            player.addTempSkill('twharvestinori_mark', {
                player: 'die'
            });
            player.storage.twharvestinori_mark = [];
            player.markSkill('twharvestinori_mark', '', '丰祈' + player.storage.twharvestinori_mahou[0] * 2 + ' - ' + player.storage.twharvestinori_mahou[1])
        },
        ai: {
            order: 8,
            result: {
                player: 1,
            },
        },
        subSkill: {
            mark: {
                intro: {
                    name: "施法：丰祈",
                    content: function(s, p) {
                        var str = '施法：丰祈-剩余回合：'
                        str += p.storage.twharvestinori_mahou[1];
                        str += '<br>施法：丰祈-摸牌数：'
                        str += p.storage.twharvestinori_mahou[0] * 2;
                        return str;
                    },
                },
                sub: true,
            },
            mahou: {
                trigger: {
                    global: "phaseEnd",
                },
                forced: true,
                popup: false,
                charlotte: true,
                content: function() {
                    var list = player.storage.twharvestinori_mahou;
                    list[1]--;
                    if (list[1] == 0) {
                        game.log(player, '的“丰祈”魔法生效');
                        player.logSkill('twharvestinori');
                        var num = list[0] * 2;
                        player.draw(num);
                        player.removeSkill('twharvestinori_mahou');
                        player.removeSkill('twharvestinori_mark');
                    } else {
                        game.log(player, '的“丰祈”魔法剩余', '#g' + (list[1]) + '回合');
                        player.markSkill('twharvestinori_mahou');
                        player.unmarkSkill('twharvestinori_mark');
                        player.storage.twharvestinori_mark = [];
                        player.markSkill('twharvestinori_mark', '', '丰祈' + player.storage.twharvestinori_mahou[0] * 2 + ' - ' + player.storage.twharvestinori_mahou[1])
                    }
                },
                sub: true,
            },
        },
    }
    lib.skill.twzhouhu = {
        audio: 2,
        mahouSkill: true,
        enable: "phaseUse",
        usable: 1,
        filter: function(event, player) {
            return !player.hasSkill('twzhouhu_mahou') && player.countCards('h', lib.skill.twzhouhu.filterCard) > 0;
        },
        filterCard: {
            color: "red",
        },
        check: function(card) {
            if (_status.event.player.isHealthy()) return 0;
            return 7 - get.value(card);
        },
        content: function() {
            'step 0'
            player.chooseControl('1回合', '2回合', '3回合')
                .set('prompt', '请选择施法时长')
                .set('ai', function() {
                var player = _status.event.player;
                var safe = 1;
                if (safe < Math.min(3, game.countPlayer(), player.getDamagedHp())) {
                    var next = player.next;
                    while (next != player && get.attitude(next, player) > 0) {
                        safe++;
                        next = next.next;
                    }
                }
                return Math.max(1, Math.min(safe, 3, game.countPlayer(), player.getDamagedHp())) - 1;
            });
            'step 1'
            player.storage.twzhouhu_mahou = [result.index + 1, result.index + 1];
            player.addTempSkill('twzhouhu_mahou', {
                player: 'die'
            });
            player.addTempSkill('twzhouhu_mark', {
                player: 'die'
            });
            player.storage.twzhouhu_mark = [];
            player.markSkill('twzhouhu_mark', '', '咒护' + player.storage.twzhouhu_mahou[0] + ' - ' + player.storage.twzhouhu_mahou[1]);
        },
        ai: {
            order: 2,
            result: {
                player: 1,
            },
        },
        subSkill: {
            mark: {
                intro: {
                    name: "施法：咒护",
                    content: function(s, p) {
                        var str = '施法：咒护-剩余回合：'
                        str += p.storage.twzhouhu_mahou[1];
                        str += '<br>施法：咒护-回复体力数：'
                        str += p.storage.twzhouhu_mahou[0];
                        return str;
                    },
                },
                sub: true,
            },
            mahou: {
                trigger: {
                    global: "phaseEnd",
                },
                forced: true,
                popup: false,
                charlotte: true,
                content: function() {
                    var list = player.storage.twzhouhu_mahou;
                    list[1]--;
                    if (list[1] == 0) {
                        game.log(player, '的“咒护”魔法生效');
                        player.logSkill('twzhouhu');
                        var num = list[0];
                        player.recover(num);
                        player.removeSkill('twzhouhu_mahou');
                        player.removeSkill('twzhouhu_mark');
                    } else {
                        game.log(player, '的“咒护”魔法剩余', '#g' + (list[1]) + '回合');
                        player.markSkill('twzhouhu_mahou');
                        player.unmarkSkill('twzhouhu_mark');
                        player.storage.twzhouhu_mark = [];
                        player.markSkill('twzhouhu_mark', '', '咒护' + player.storage.twzhouhu_mahou[0] + ' - ' + player.storage.twzhouhu_mahou[1])
                    }
                },
                sub: true,
            },
        },
    }
    //咒护
    lib.skill.twzuhuo = {
        audio: 2,
        mahouSkill: true,
        enable: "phaseUse",
        usable: 1,
        filter: function(event, player) {
            return !player.hasSkill('twzuhuo_mahou') && player.countCards('he', lib.skill.twzuhuo.filterCard) > 0;
        },
        filterCard: function(card) {
            return get.type(card) != 'basic';
        },
        position: "he",
        check: function(card) {
            return 7 - get.value(card);
        },
        content: function() {
            'step 0'
            player.chooseControl('1回合', '2回合', '3回合')
                .set('prompt', '请选择施法时长')
                .set('ai', function() {
                var player = _status.event.player;
                var safe = Math.min(player.getHandcardLimit(), player.countCards('h', 'shan'));
                if (safe < Math.min(3, game.countPlayer())) {
                    var next = player.next;
                    while (next != player && get.attitude(next, player) > 0) {
                        safe++;
                        next = next.next;
                    }
                }
                return Math.max(2, Math.min(safe, 3, game.countPlayer())) - 1;
            });
            'step 1'
            player.storage.twzuhuo_mahou = [result.index + 1, result.index + 1];
            player.addTempSkill('twzuhuo_mahou', {
                player: 'die'
            });
            player.addTempSkill('twzuhuo_mark', {
                player: 'die'
            });
            player.storage.twzuhuo_mark = [];
            player.markSkill('twzuhuo_mark', '', '阻祸' + player.storage.twzuhuo_mahou[0] + ' - ' + player.storage.twzuhuo_mahou[1]);
        },
        ai: {
            order: 2,
            result: {
                player: 1,
            },
        },
        subSkill: {
            mark: {
                intro: {
                    name: "施法：阻祸",
                    content: function(s, p) {
                        var str = '施法：阻祸-剩余回合：'
                        str += p.storage.twzuhuo_mahou[1];
                        str += '<br>施法：阻祸-可抵消次数：'
                        str += p.storage.twzuhuo_mahou[0];
                        return str;
                    },
                },
                sub: true,
            },
            mahou: {
                trigger: {
                    global: "phaseEnd",
                },
                forced: true,
                popup: false,
                charlotte: true,
                content: function() {
                    var list = player.storage.twzuhuo_mahou;
                    list[1]--;
                    if (list[1] == 0) {
                        game.log(player, '的“阻祸”魔法生效');
                        player.logSkill('twzuhuo');
                        var num = list[0];
                        player.addSkill('twzuhuo_effect');
                        player.addMark('twzuhuo_effect', num, false);
                        player.removeSkill('twzuhuo_mahou');
                        player.removeSkill('twzuhuo_mark');
                    } else {
                        game.log(player, '的“阻祸”魔法剩余', '#g' + (list[1]) + '回合');
                        player.markSkill('twzuhuo_mahou');
                        player.unmarkSkill('twzuhuo_mark');
                        player.storage.twzuhuo_mark = [];
                        player.markSkill('twzuhuo_mark', '', '阻祸' + player.storage.twzuhuo_mahou[0] + ' - ' + player.storage.twzuhuo_mahou[1])
                    }
                },
                sub: true,
            },
            effect: {
                charlotte: true,
                onremove: true,
                trigger: {
                    player: "damageBegin2",
                },
                forced: true,
                filter: function(event, player) {
                    return player.hasMark('twzuhuo_effect');
                },
                content: function() {
                    trigger.cancel();
                    player.removeMark('twzuhuo_effect', 1, false);
                    if (!player.countMark('twzuhuo_effect')) player.removeSkill('twzuhuo_effect');
                },
                marktext: "阻祸︎",
                intro: {
                    onremove: true,
                    content: "防止接下来的#次伤害",
                },
                sub: true,
            },
        },
    }
    lib.skill.rezaiqi = {
        count: function() {
            var num = 0;
            game.countPlayer2(function(current) {
                current.getHistory('lose', function(evt) {
                    if (evt.position == ui.discardPile) {
                        for (var i = 0; i < evt.cards.length; i++) {
                            if (get.color(evt.cards[i]) == 'red') num++;
                        }
                    }
                })
            });
            game.getGlobalHistory('cardMove', function(evt) {
                if (evt.name == 'cardsDiscard') {
                    for (var i = 0; i < evt.cards.length; i++) {
                        if (get.color(evt.cards[i]) == 'red') num++;
                    }
                }
            })
            return num;
        },
        audio: 2,
        direct: true,
        filter: function(event, player) {
            return lib.skill.rezaiqi.count() > 0;
        },
        trigger: {
            player: "phaseJieshuBegin",
        },
        content: function() {
            'step 0'
            player.chooseTarget([1, lib.skill.rezaiqi.count()], get.prompt2('rezaiqi'))
                .ai = function(target) {
                return get.attitude(_status.event.player, target);
            };
            player.unmarkSkill('rezaiqizheng');
            delete player.storage.rezaiqizheng;
            'step 1'
            if (result.bool) {
                var targets = result.targets;
                targets.sortBySeat();
                player.line(targets, 'fire');
                player.logSkill('rezaiqi', targets);
                event.targets = targets;
            } else event.finish();
            'step 2'
            event.current = targets.shift();
            if (player.isHealthy()) event._result = {
                index: 0
            };
            else event.current.chooseControl()
                .set('choiceList', [
                '摸一张牌',
                '令' + get.translation(player) + '回复一点体力', ])
                .set('ai', function() {
                if (get.attitude(event.current, player) > 0) return 1;
                return 0;
            });
            'step 3'
            if (result.index == 1) {
                event.current.line(player);
                player.recover();
            } else event.current.draw();
            game.delay();
            if (targets.length) event.goto(2);
        },
        group: "rezaiqizheng",
    }
    lib.skill.rezaiqizheng = {
        trigger: {
            global: ["loseAfter", "cardsDiscardAfter"],
        },
        marktext: "再起",
        intro: {
            name: '再起'
        },
        forced: true,
        filter: function(event, player) {
            if (player != _status.currentPhase) return false;
            if (event.name == 'lose' && event.position != ui.discardPile) return false;
            var num = event.cards.length;
            for (var i = 0; i < event.cards.length; i++) {
                var card = event.cards[i];
                if (get.color(card) == 'red') player.addMark('rezaiqizheng')
            }
        },
        content: function() {},
    }
    //晋张春华
    lib.skill.xuanmu2 = {
        trigger: {
            player: "damageBegin4",
        },
        forced: true,
        marktext: "宣穆",
        mark: true,
        intro: {
            name: "宣穆",
            content: '免疫伤害',
        },
        popup: false,
        content: function() {
            trigger.cancel();
        },
        ai: {
            effect: {
                target: function(card, player, target) {
                    if (get.tag(card, 'damage') && !player.hasSkillTag('jueqing', false, target)) return 'zerotarget';
                },
            },
        },
    }
    lib.skill.xinbenxi = {
        group: ["xinbenxi_summer", "xinbenxi_damage"],
        audio: 2,
        trigger: {
            player: "useCard2",
        },
        forced: true,
        mod: {
            globalFrom: function(from, to, distance) {
                if (_status.currentPhase == from) {
                    return distance - from.storage.xinbenxi;
                }
            },
            wuxieRespondable: function(card, player, target, current) {
                if (player != current && player.storage.xinbenxi_directHit.contains(card)) {
                    return false;
                }
            },
        },
        init: function(player) {
            player.storage.xinbenxi_directHit = [];
            player.storage.xinbenxi_damage = [];
            player.storage.xinbenxi_unequip = [];
            player.storage.xinbenxi = 0;
        },
        filter: function(trigger, player) {
            return _status.currentPhase == player && trigger.targets && trigger.targets.length == 1 && (get.name(trigger.card) == 'sha' || get.type(trigger.card) == 'trick') && !game.hasPlayer(function(current) {
                return get.distance(player, current) > 1;
            });
        },
        filterx: function(event, player) {
            var info = get.info(event.card);
            if (info.allowMultiple == false) return false;
            if (event.targets && !info.multitarget) {
                if (game.hasPlayer(function(current) {
                    return lib.filter.targetEnabled2(event.card, player, current) && !event.targets.contains(current);
                })) {
                    return true;
                }
            }
            return false;
        },
        content: function() {
            "step 0";
            event.videoId = lib.status.videoId++;
            var func = function(card, id, bool) {
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

            function(button) {
                if (button.link == 0) {
                    return _status.event.bool1;
                };
                return true;
            });
            next.set('bool1', lib.skill.xinbenxi.filterx(trigger, player));
            next.set('ai',

            function(button) {
                var player = _status.event.player;
                var event = _status.event.getTrigger();
                switch (button.link) {
                    case 0:
                        {
                            if (game.hasPlayer(function(current) {
                                return lib.filter.targetEnabled2(event.card, player, current) && !event.targets.contains(current) && get.effect(current, event.card, player, player) > 0;
                            })) return 1.6 + Math.random();
                            return 0;
                        }
                    case 1:
                        {
                            if (event.targets.filter(function(current) {
                                var eff1 = get.effect(current, event.card, player, player);
                                player._xinbenxi_ai = true;
                                var eff2 = get.effect(current, event.card, player, player);
                                delete player._xinbenxi_ai;
                                return eff1 > eff2;
                            })
                                .length) return 1.9 + Math.random();
                            return Math.random();
                        }
                    case 2:
                        {
                            var num = 1.3;
                            if (event.card.name == 'sha' && event.targets.filter(function(current) {
                                if (current.mayHaveShan() && get.attitude(player, current) <= 0) {
                                    if (current.hasSkillTag('useShan')) num = 1.9;
                                    return true;
                                }
                                return false;
                            })
                                .length) return num + Math.random();
                            return 0.5 + Math.random();
                        }
                    case 3:
                        {
                            return (get.tag(event.card, 'damage') || 0) + Math.random();
                        }
                }
            });
            "step 1";
            if (player.isOnline2()) {
                player.send('closeDialog', event.videoId);
            }
            event.dialog.close();
            var map = [function(trigger, player, event) {
                player.chooseTarget('请选择' + get.translation(trigger.card) + '的额外目标', true,

                function(card, player, target) {
                    var player = _status.event.player;
                    if (_status.event.targets.contains(target)) return false;
                    return lib.filter.targetEnabled2(_status.event.card, player, target);
                })
                    .set('targets', trigger.targets)
                    .set('card', trigger.card)
                    .set('ai',

                function(target) {
                    var trigger = _status.event.getTrigger();
                    var player = _status.event.player;
                    return get.effect(target, trigger.card, player, player);
                });
            },

            function(trigger, player, event) {
                player.storage.xinbenxi_unequip.add(trigger.card);
            },

            function(trigger, player, event) {
                player.storage.xinbenxi_directHit.add(trigger.card);
                trigger.nowuxie = true;
                trigger.customArgs.
                default.directHit2 = true;
            },

            function(trigger, player, event) {
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
        },
        ai: {
            unequip: true,
            "unequip_ai": true,
            "directHit_ai": true,
            skillTagFilter: function(player, tag, arg) {
                if (tag == 'unequip') {
                    if (arg && player.storage.xinbenxi_unequip.contains(arg.card)) return true;
                    return false;
                }
                if (_status.currentPhase != player || game.hasPlayer(function(current) {
                    return get.distance(player, current) > 1;
                })) return false;
                if (tag == 'directHit_ai') return arg.card.name == 'sha';
                if (arg.card.name != 'sha' && arg.card.name != 'chuqibuyi') return false;
                var card = arg.target.getEquip(2);
                if (card && card.name.indexOf('bagua') != -1) return true;
                if (player._xinbenxi_ai) return false;
            },
        },
        subSkill: {
            mark: {
                intro: {},
                sub: true,
            },
            mark2: {
                mark: true,
                marktext: "奔袭 生效",
                intro: {},
                sub: true,
            },
            damage: {
                sub: true,
                trigger: {
                    global: "damageBegin1",
                },
                audio: 2,
                forced: true,
                filter: function(event, player) {
                    return event.card && player.storage.xinbenxi_damage.contains(event.card);
                },
                content: function() {
                    player.draw()
                },
            },
            summer: {
                sub: true,
                trigger: {
                    player: ["phaseAfter", "useCardAfter", "useCard"],
                },
                silent: true,
                filter: function(event, player) {
                    return player == _status.currentPhase;
                },
                content: function() {
                    if (trigger.name == 'phase') {
                        player.storage.xinbenxi = 0;
                        return;
                    } else if (event.triggername == 'useCard') {
                        player.logSkill('xinbenxi');
                        player.storage.xinbenxi++;
                        player.syncStorage('xinbenxi');

                        return;
                    } else {
                        player.storage.xinbenxi_unequip.remove(event.card);
                        player.storage.xinbenxi_directHit.remove(event.card);
                        player.storage.xinbenxi_damage.remove(event.card);
                        // player.unmarkSkill('xinbenxi_mark')
                    }
                    if (game.hasPlayer(function(current) {
                        return get.distance(player, current) > 1;
                    })) {
                        var cc = player.storage.xinbenxi;
                        player.storage.xinbenxi_mark = '';
                        player.addTempSkill("xinbenxi_mark");
                        player.addMark('xinbenxi_mark', cc);
                    } else {
                        player.unmarkSkill('xinbenxi_mark');
                        player.addTempSkill("xinbenxi_mark2");
                    }
                },
                forced: true,
                popup: false,
            },
        },
    }
    lib.skill.xibing2 = {
        mark: true,
        marktext: "息兵",
        intro: {
            name: '息兵',
        },
        mod: {
            cardEnabled2: function(card) {
                if (get.position(card) == 'h') return false;
            },
        },
    },
    lib.skill.caozhao = {
        audio: 2,
        enable: "phaseUse",
        usable: 1,
        filter: function(event, player) {
            if (player.countCards('h') == 0 || !game.hasPlayer(function(current) {
                return current != player && current.hp <= player.hp;
            })) return false;
            var list = player.getStorage('caozhao');
            for (var i of lib.inpile) {
                if (!list.contains(i) && ['basic', 'trick'].contains(get.type(i))) return true;
            }
            return false;
        },
        chooseButton: {
            dialog: function(event, player) {
                var list = player.getStorage('caozhao'),
                    vcards = [];
                for (var i of lib.inpile) {
                    if (!list.contains(i)) {
                        var type = get.type(i);
                        if (type == 'basic' || type == 'trick') vcards.push([type, '', i]);
                    }
                }
                return ui.create.dialog('草诏', [vcards, 'vcard']);
            },
            check: function(button) {
                return _status.event.player.getUseValue({
                    name: button.link[2],
                    isCard: true
                }, null, true);
            },
            backup: function(links, player) {
                return {
                    audio: 'caozhao',
                    cardname: links[0][2],
                    filterCard: true,
                    position: 'h',
                    check: function(card) {
                        return player.getUseValue({
                            name: lib.skill.caozhao_backup.cardname
                        }) - ((player.getUseValue(card, null, true) + 0.1) / (get.value(card) / 6));
                    },
                    filterTarget: function(card, player, target) {
                        return target != player && target.hp <= player.hp;
                    },
                    discard: false,
                    lose: false,
                    content: function() {
                        'step 0'
                        player.showCards(cards, get.translation(player) + '发动【草诏】，声明' + get.translation(lib.skill.caozhao_backup.cardname));
                        if (!player.storage.caozhao) player.storage.caozhao = [];
                        player.storage.caozhao.push(lib.skill.caozhao_backup.cardname);
                        player.addSkill("caozhao_mark");
                        player.addMark("caozhao_mark");
                        'step 1'
                        target.chooseControl()
                            .set('choiceList', [
                            '令' + get.translation(player) + '将' + get.translation(cards[0]) + '的牌名改为' + get.translation(lib.skill.caozhao_backup.cardname),
                            '失去1点体力', ])
                            .set('ai', function(event, player) {
                            var target = _status.event.getParent()
                                .player;
                            if (get.attitude(player, target) > 0) return 0;
                            if (player.hp > 3 || (player.hp > 1 && player.hasSkill('zhaxiang'))) return 1;
                            if (player.hp > 2) return Math.random() > 0.5 ? 0 : 1;
                            return 0;
                        });
                        'step 2'
                        if (result.index == 1) {
                            target.addExpose(0.2);
                            target.loseHp();
                            event.finish();
                        } else {
                            player.chooseTarget('是否将' + get.translation(lib.skill.caozhao_backup.cardname) + '（' + get.translation(cards[0]) + '）交给一名其他角色？', lib.filter.notMe)
                                .set('ai', () => -1);
                        }
                        'step 3'
                        if (result.bool) {
                            var target = result.targets[0];
                            player.line(target, 'green');
                            if (!target.storage.caozhao_info) target.storage.caozhao_info = {};
                            target.storage.caozhao_info[cards[0].cardid] = lib.skill.caozhao_backup.cardname;
                            target.addSkill('caozhao_info');
                            target.gain(cards, player, 'give')
                                .gaintag.add('caozhao');
                        } else {
                            if (!player.storage.caozhao_info) player.storage.caozhao_info = {};
                            player.storage.caozhao_info[cards[0].cardid] = lib.skill.caozhao_backup.cardname;
                            player.addGaintag(cards, 'caozhao');
                            player.addSkill('caozhao_info');
                        }
                    },
                    ai: {
                        result: {
                            player: 2,
                            target: 0.1,
                        },
                    },
                }
            },
            prompt: function(links, player) {
                return '将一张手牌声明为' + get.translation(links[0][2]);
            },
        },
        ai: {
            order: 1,
            result: {
                player: 1,
            },
        },
        subSkill: {
            mark: {
                intro: {
                    content: function(s, p) {
                        var str = '已使用牌名：'
                        str += get.translation(p.storage.caozhao);
                        return str;
                    },
                },
                sub: true,
            },
        },
    }
    lib.skill.olxibing = {
        audio: 2,
        trigger: {
            player: "damageEnd",
            source: "damageSource",
        },
        filter: function(event, player) {
            return event.player && event.source && event.player != event.source && event.player.isAlive() && event.source.isAlive() && (event.player.countCards('he') > 0 || event.source.countCards('he') > 0);
        },
        direct: true,
        content: function() {
            'step 0'
            var target = (player == trigger.player ? trigger.source : trigger.player);
            event.target = target;
            player.chooseTarget(get.prompt('olxibing'), '弃置自己或' + get.translation(target) + '的两张牌，然后手牌数较少的角色摸两张牌且不能对你使用牌直到回合结束', function(card, player, target) {
                if (target != player && target != _status.event.target) return false;
                return target.countCards('he') > 0;
            })
                .set('target', target)
                .set('ai', function(targetx) {
                var player = _status.event.player,
                    target = _status.event.target;
                if (target == targetx) {
                    if (get.attitude(player, target) > 0) return 0;
                    var cards = target.getCards('he', function(card) {
                        return lib.filter.canBeDiscarded(card, player, target);
                    })
                        .sort(function(a, b) {
                        return get.buttonValue(b) - get.buttonValue(a);
                    });
                    if ((target.countCards('h') - player.countCards('h')) >= Math.max(0, Math.min(2, cards.length) - target.countCards('e', function(card) {
                        var index = cards.indexOf(card);
                        return index != -1 && index < 2;
                    }))) return 1;
                    return 0;
                }
                var cards = player.getCards('he', function(card) {
                    return lib.filter.cardDiscardable(card, player, 'olxibing')
                })
                    .sort(function(a, b) {
                    return get.useful(a) - get.useful(b);
                });
                if (player.countCards('h') - target.countCards('h') < Math.max(0, Math.min(cards.length, 2) - player.countCards('e', function(card) {
                    var index = cards.indexOf(card);
                    return index != -1 && index < 2;
                })) && (cards.length < 2 || get.value(cards[1]) < 5.5)) return 0.8;
                return 0;
            });
            'step 1'
            if (result.bool) {
                player.logSkill('olxibing', target);
                var target = result.targets[0];
                if (target == player) player.chooseToDiscard('he', 2, true);
                else player.discardPlayerCard(target, 'he', true, 2);
            } else event.finish();
            'step 2'
            if (player.isIn() && target.isIn()) {
                var hs = player.countCards('h'),
                    ts = target.countCards('h');
                if (hs != ts) {
                    var drawer = hs > ts ? target : player;
                    drawer.draw(2);
                    drawer.addTempSkill('olxibing_mark');
                    player.addTempSkill('olxibing2');
                    player.markAuto('olxibing2', [drawer]);
                }
            }
        },
        subSkill: {
            mark: {
                mark: true,
                intro: {},
                sub: true,
            },
        },
    }
    lib.skill.spdiancai = {
        audio: 2,
        trigger: {
            global: "phaseJieshuBegin",
        },
        direct: true,
        filter: function(event, player) {
            return player != event.player && player.hasHistory('lose', function(evt) {
                return evt.hs && evt.hs.length > 0;
            });
        },
        content: function() {
            'step 0'
            var num = 0;
            player.getHistory('lose', function(evt) {
                if (evt.hs) num += evt.hs.length;
            });
            num = Math.min(num, game.countPlayer());
            player.chooseTarget(get.prompt('spdiancai'), [1, num], '令至多' + get.cnNumber(num) + '名角色各摸一张牌')
                .set('ai', function(target) {
                return get.attitude(_status.event.player, target);
            });
            player.unmarkSkill('spdiancai_kk');
            delete player.storage.spdiancai_kk;
            'step 1'
            if (result.bool) {
                var targets = result.targets.sortBySeat(trigger.player);
                player.logSkill('spdiancai', targets);
                if (targets.length == 1) {
                    targets[0].draw();
                    event.finish();
                } else game.asyncDraw(targets);
            } else event.finish();
            'step 2'
            game.delayx();

        },
        group: "spdiancai_kk",
        subSkill: {
            kk: {
                intro: {
                    content: '回合结束可以选择#名角色摸一张牌'
                },
                trigger: {
                    player: "loseBegin",
                },
                forced: true,
                priority: 10,
                silent: true,
                filter: function(event, player) {
                    if (player != _status.currentPhase) return true;
                    return false;
                },
                content: function() {
                    var xx = trigger.cards.length;
                    player.addMark('spdiancai_kk', xx);
                },
                sub: true,
            },
        },
    }
    lib.skill.zlshoufu = {
        enable: "phaseUse",
        usable: 1,
        delay: false,
        content: function() {
            'step 0'
            player.draw();
            'step 1'
            var filterTarget = function(card, player, target) {
                return target != player && !target.hasSkill('zlshoufu2');
            };
            if (!player.countCards('h') || !game.hasPlayer(function(current) {
                return filterTarget(null, player, current);
            })) event.finish();
            else player.chooseCardTarget({
                forced: true,
                prompt: '将一张手牌作为“箓”置于其他角色的武将牌上',
                filterTarget: filterTarget,
                filterCard: true,
                position: 'h',
                ai1: function(card) {
                    if (get.type(card, false) == 'equip') return 1 - get.value(card);
                    return 7 - get.value(card);
                },
                ai2: function(target) {
                    var player = _status.event.player;
                    var att = get.attitude(player, target);
                    if (att > 0) return -att;
                    return -att / get.distance(player, target, 'absolute');
                },
            });
            'step 2'
            var target = result.targets[0];
            var cards = result.cards;
            target.addToExpansion(cards, player, 'give')
                .gaintag.add('zlshoufu2');
            var str = '';
            if (get.type2(result.cards[0]) == 'trick') str = '锦囊牌';
            else if (get.type2(result.cards[0]) == 'basic') str = '基本牌';
            else str = '装备牌';
            target.markSkill('zlshoufu2', '', '授符 ' + str)
            player.line(target, 'green');
            target.addSkill('zlshoufu2');
            'step 3'
            game.delayx();
        },
        ai: {
            notemp: true,
            order: 1,
            result: {
                player: function(player) {
                    if (game.hasPlayer(function(target) {
                        return target != player && !target.hasSkill('zlshoufu2') && get.attitude(player, target) < 0;
                    }) || !game.hasPlayer(function(target) {
                        return target != player && !target.hasSkill('zlshoufu2') && get.attitude(player, target) > 0;
                    })) return 1;
                    return 0;
                },
            },
        },
    }
    lib.skill.xinquanbian = {
        audio: "quanbian",
        preHidden: true,
        trigger: {
            player: ["useCard", "respond"],
        },
        filter: function(event, player) {
            var phase = event.getParent('phaseUse');
            if (!phase || phase.player != player) return false;
            var suit = get.suit(event.card);
            if (!lib.suit.contains(suit) || !lib.skill.quanbian.hasHand(event)) return false;
            return player.getHistory('useCard', function(evt) {
                return evt != event && get.suit(evt.card) == suit && lib.skill.quanbian.hasHand(evt) && evt.getParent('phaseUse') == phase;
            })
                .length + player.getHistory('respond', function(evt) {
                return evt != event && get.suit(evt.card) == suit && lib.skill.quanbian.hasHand(evt) && evt.getParent('phaseUse') == phase;
            })
                .length == 0;
        },
        content: function() {
            'step 0'
            var cc = get.suit(trigger.card);
            if (!player.storage.xinquanbian2) player.storage.xinquanbian2 = [];
            player.storage.xinquanbian2.add(cc);
            var str = player.storage.xinquanbian2.sortBySuit()
                .join('');
            /*   if (player.storage.xinquanbian2.contains('heart')) str += '♥️️';
            if (player.storage.xinquanbian2.contains('diamond')) str += '♦️️';
            if (player.storage.xinquanbian2.contains('spade')) str += '♠️️';
            if (player.storage.xinquanbian2.contains('club')) str += '♣️️';*/
            player.addTempSkill("xinquanbian_mark");
            player.storage.xinquanbian_mark = '';
            player.addMark("xinquanbian_mark", str);
            var cards = get.cards(Math.min(5, player.maxHp));
            game.cardsGotoOrdering(cards);
            var suit = get.suit(trigger.card);
            var next = player.chooseToMove('权变：获得一张不为' + get.translation(suit) + '花色的牌并排列其他牌');
            next.set('suit', suit);
            next.set('list', [
                ['牌堆顶', cards],
                ['获得'], ])
            next.set('filterMove', function(from, to, moved) {
                var suit = _status.event.suit;
                if (moved[0].contains(from.link)) {
                    if (typeof to == 'number') {
                        if (to == 1) {
                            if (moved[1].length) return false;
                            return get.suit(from.link, false) != suit;
                        }
                        return true;
                    }
                    if (moved[1].contains(to.link)) return get.suit(from.link, false) != suit;
                    return true;
                } else {
                    if (typeof to == 'number') return true;
                    return get.suit(to.link, false) != suit;
                }
            });
            next.set('processAI', function(list) {
                var cards = list[0][1].slice(0)
                    .sort(function(a, b) {
                    return get.value(b) - get.value(a);
                }),
                    gains = [];
                for (var i of cards) {
                    if (get.suit(i, false) != _status.event.suit) {
                        cards.remove(i);
                        gains.push(i);
                        break;
                    }
                }
                return [cards, gains];
            });

            'step 1'
            if (result.bool) {
                var list = result.moved;
                if (list[1].length) player.gain(list[1], 'gain2');
                while (list[0].length) {
                    ui.cardPile.insertBefore(list[0].pop(), ui.cardPile.firstChild);
                }
                game.updateRoundNumber();
            }
        },
        group: ["xinquanbian_count", "xinquanbian_xg"],
        subSkill: {
            mark: {
                intro: {},
                onremove: function(player) {
                    player.unmarkSkill('xinquanbian_mark');
                    delete player.storage.xinquanbian2;
                    delete player.storage.xinquanbian_mark;
                },
                sub: true,
            },
        },
    }
    lib.skill.xinquanbian_xg = {
        trigger: {
            player: "phaseZhunbeiBegin",
        },
        forced: true,
        audio: false,
        content: function() {
            var cc = player.maxHp;
            player.storage.xinquanbian_count_mark = '';
            player.addTempSkill("xinquanbian_count_mark");
            player.markSkill("xinquanbian_count_mark", '', '权变 ' + cc);
        },
    }
    lib.skill.xinquanbian_count = {
        trigger: {
            player: 'useCard1'
        },
        silent: true,
        firstDo: true,
        filter: function(event, player) {
            return player.isPhaseUsing() && lib.skill.quanbian.hasHand(event) && get.type(event.card) != 'equip';
        },
        content: function() {
            var stat = player.getStat('skill');
            if (!stat.quanbian) stat.quanbian = 0;
            stat.quanbian++;
            var cc = player.maxHp - stat.quanbian;
            player.storage.xinquanbian_count_mark = '';
            player.unmarkSkill("xinquanbian_count_mark");
            player.addTempSkill("xinquanbian_count_mark");
            player.markSkill("xinquanbian_count_mark", '', '权变 ' + cc);
        },
        mod: {
            cardEnabled2: function(card, player) {
                var stat = player.getStat('skill');
                if (stat.quanbian && stat.quanbian >= player.maxHp && get.position(card) == 'h' && get.type(card, player) != 'equip') return false;
            },
        },
        subSkill: {
            mark: {
                marktext: "权变",
                intro: {
                    name: "权变"
                },
                sub: true,
            },
        },
    },
    lib.skill.gxlianhua = {
        derivation: ["reyingzi", "reguanxing", "xinzhiyan", "gongxin"],
        audio: 2,
        init: function(player, skill) {
            if (!player.storage[skill]) player.storage[skill] = {
                red: 0,
                black: 0,
            }
        },
        marktext: "丹血",
        intro: {
            name: "丹血",
            markcount: function(storage) {
                return storage.red + storage.black;
            },
            content: function(storage) {
                return '共有' + (storage.red + storage.black) + '个标记';
            },
        },
        trigger: {
            global: "damageEnd",
        },
        forced: true,
        filter: function(event, player) {
            return event.player != player && event.player.isAlive() && _status.currentPhase != player;
        },
        content: function() {
            player.storage.gxlianhua[player.getFriends()
                .contains(trigger.player) ? 'red' : 'black']++;
            player.markSkill('gxlianhua');
        },
        group: "gxlianhua_harmonia",
        subSkill: {
            harmonia: {
                forced: true,
                audio: "gxlianhua",
                sub: true,
                trigger: {
                    player: "phaseZhunbeiBegin",
                },
                content: function() {
                    var cards = [];
                    var cards2 = [];
                    var skill = '';
                    var red = player.storage.gxlianhua.red;
                    var black = player.storage.gxlianhua.black;
                    player.storage.gxlianhua = {
                        red: 0,
                        black: 0
                    };
                    player.unmarkSkill('gxlianhua');
                    if (red + black < 4) {
                        cards = ['tao'];
                        skill = 'reyingzi';
                    } else if (red > black) {
                        cards = ['wuzhong'];
                        skill = 'reguanxing';
                    } else if (red < black) {
                        cards = ['shunshou'];
                        skill = 'xinzhiyan';
                    } else {
                        cards = ['sha', 'juedou'];
                        skill = 'gongxin';
                    }
                    for (var i = 0; i < cards.length; i++) {
                        var card = get.cardPile(function(shiona) {
                            return shiona.name == cards[i];
                        });
                        if (card) cards2.push(card);
                    }
                    player.addTempSkill(skill);
                    if (cards2.length) player.gain(cards2, 'gain2', 'log');
                },
            },
        },
    }
    lib.skill.zhafu = {
        audio: 2,
        enable: "phaseUse",
        limited: true,
        skillAnimation: true,
        animationColor: "wood",
        filterTarget: function(card, player, target) {
            return player != target;
        },
        content: function() {
            player.awakenSkill('zhafu');
            target.addSkill('zhafu_hf');
            target.storage.zhafu_hf = player;
        },
        subSkill: {
            hf: {
                trigger: {
                    player: "phaseDiscardBegin",
                },
                forced: true,
                popup: false,
                charlotte: true,
                mark: true,
                marktext: "扎符",
                intro: {},
                onremove: true,
                content: function() {
                    'step 0'
                    if (player.countCards('h') <= 1 || player.storage.zhafu_hf.isDead()) event.finish();
                    'step 1'
                    player.storage.zhafu_hf.logSkill('zhafu_hf', player);
                    player.chooseCard('h', true, '选择保留一张手牌，将其余的手牌交给' + get.translation(player.storage.zhafu_hf))
                        .ai = get.value;
                    'step 2'
                    var cards = player.getCards('h');
                    cards.remove(result.cards[0]);
                    player.storage.zhafu_hf.gain(cards, player, 'giveAuto');
                    'step 3'
                    player.removeSkill('zhafu_hf');
                },
                sub: true,
            },
        },
        mark: true,
        intro: {
            content: "limited",
        },
        init: function(player, skill) {
            player.storage[skill] = false;
        },
    }
    lib.skill.yechou2 = {
        mark: true,
        marktext: "业仇",
        intro: {
            content: "每个回合结束时失去1点体力直到回合开始",
        },
        trigger: {
            global: "phaseAfter",
        },
        forced: true,
        content: function() {
            player.loseHp()
        },
    }
    lib.skill.huamu = {
        audio: 2,
        trigger: {
            player: "useCardAfter",
        },
        filter: function(event, player) {
            var color = get.color(event.card);
            if (color == 'none') return false;
            if (!player.hasHistory('lose', function(evt) {
                return evt.hs.length > 0 && evt.getParent() == event;
            }) || !event.cards.filterInD('oe')
                .length) return false;
            var history = game.getGlobalHistory('useCard');
            var index = history.indexOf(event);
            if (index < 1) return false;
            var evt = history[index - 1],
                color2 = get.color(evt.card);
            return color != color2 && color2 != 'none';
        },
        "prompt2": (event) => '将' + get.translation(event.cards.filterInD('oe')) + '置于武将牌上',
        check: function(event, player) {
            if (!game.hasPlayer(function(current) {
                return current.hasSkill('qianmeng', null, null, false) && get.attitude(player, current) > 0;
            })) return false;
            var cards = event.cards.filterInD('e');
            if (!cards.length) return true;
            var card = cards[0];
            if (get.owner(card) == player) {
                if (get.value(card, player) <= 0) return true;
                var subtype = get.subtype(card);
                if (player.hasCard('hs', function(card) {
                    return get.subtype(card) == subtype && player.canUse(card, player) && get.effect(player, card, player, player) > 0;
                })) return true;
            }
            return false;
        },
        content: function() {
            var cards = trigger.cards.filterInD('oe');
            player.addToExpansion(cards, 'gain2')
                .gaintag.add('huamu');
        },
        ai: {
            reverseOrder: true,
            combo: "qianmeng",
        },
        mod: {
            aiOrder: function(player, card, num) {
                if (typeof card == 'object') {
                    var history = game.getGlobalHistory('useCard');
                    if (!history.length) return;
                    var evt = history[history.length - 1];
                    if (evt && evt.card && get.color(evt.card) != 'none' && get.color(card) != 'none' && get.color(evt.card) != get.color(card)) {
                        return num + 4;
                    }
                }
            },
        },
        marktext: "\0",
        intro: {
            name: "灵杉&玉树",
            markcount: function(storage, player) {
                var red = [],
                    black = [];
                var cards = player.getExpansions('huamu');
                for (var i of cards) {
                    var color = get.color(i, false);
                    (color == 'red' ? red : black)
                        .push(i);
                }
                return ('灵杉' + black.length + ' ' + '玉树' + red.length);
            },
            content: "expansion",
            mark: function(dialog, storage, player) {
                var red = [],
                    black = [];
                var cards = player.getExpansions('huamu');
                for (var i of cards) {
                    var color = get.color(i, false);
                    (color == 'red' ? red : black)
                        .push(i);
                }
                if (black.length) {
                    dialog.addText('灵杉(黑)');
                    dialog.addSmall(black);
                }
                if (red.length) {
                    dialog.addText('玉树(红)');
                    dialog.addSmall(red);
                }
            },
        },
    }
    lib.skill.biaozhao = {
        audio: 2,
        intro: {
            content: "expansion",
            markcount: "expansion",
        },
        onremove: function(player, skill) {
            var cards = player.getExpansions(skill);
            if (cards.length) player.loseToDiscardpile(cards);
        },
        trigger: {
            player: "phaseJieshuBegin",
        },
        direct: true,
        filter: function(event, player) {
            return player.countCards('he') > 0 && !player.getExpansions('biaozhao')
                .length;
        },
        content: function() {
            'step 0'
            player.chooseCard('he', get.prompt('biaozhao'), '将一张牌置于武将牌上作为“表”')
                .ai = function(card) {
                return 6 - get.value(card);
            }
            'step 1'
            if (result.bool) {
                player.logSkill('biaozhao');
                player.addToExpansion(result.cards, player, 'give')
                    .gaintag.add('biaozhao');
                var cc = get.translation(get.suit(result.cards[0]));
                var xx = get.strNumber(result.cards[0].number)
                player.markSkill('biaozhao', '', '表召 ' + cc + xx)
            }
        },
        ai: {
            notemp: true,
        },
        group: ["biaozhao2", "biaozhao3"],
    }
    lib.skill.rebiaozhao = {
        audio: "biaozhao",
        intro: {
            content: "expansion",
            markcount: "expansion",
        },
        trigger: {
            player: "phaseJieshuBegin",
        },
        direct: true,
        filter: function(event, player) {
            return player.countCards('he') > 0 && !player.getExpansions('rebiaozhao')
                .length;
        },
        content: function() {
            'step 0'
            player.chooseCard('he', get.prompt('rebiaozhao'), '将一张牌置于武将牌上作为“表”')
                .ai = function(card) {
                return 6 - get.value(card);
            }
            'step 1'
            if (result.bool) {
                player.logSkill('rebiaozhao');
                player.addToExpansion(player, 'give', result.cards)
                    .gaintag.add('rebiaozhao');
                var cc = get.translation(get.suit(result.cards[0]));
                var xx = get.strNumber(result.cards[0].number)
                player.markSkill('rebiaozhao', '', '表召 ' + cc + xx)
            }
        },
        onremove: function(player, skill) {
            var cards = player.getExpansions(skill);
            if (cards.length) player.loseToDiscardpile(cards);
        },
        ai: {
            notemp: true,
        },
        group: ["rebiaozhao2", "rebiaozhao3"],
    }
    lib.skill.liezhi = {
        audio: 2,
        group: "liezhi_damage",
        trigger: {
            player: "phaseZhunbeiBegin",
        },
        direct: true,
        filter: function(event, player) {
            return !player.hasSkill('liezhi_disable');
        },
        content: function() {
            'step 0'
            player.chooseTarget(get.prompt('liezhi'), '弃置至多两名其他角色区域内的各一张牌', [1, 2], function(card, player, target) {
                return target != player && target.countDiscardableCards(player, 'hej') > 0;
            })
                .ai = function(target) {
                var player = _status.event.player;
                return get.effect(target, {
                    name: 'guohe'
                }, player, player);
            };
            'step 1'
            if (result.bool) {
                result.targets.sortBySeat();
                event.targets = result.targets;
                player.line(result.targets, 'green');
                player.logSkill('liezhi', result.targets);
            } else event.finish();
            'step 2'
            event.current = targets.shift();
            player.discardPlayerCard(event.current, 'hej', true)
            if (targets.length) event.redo();
        },
        subSkill: {
            disable: {
                sub: true,
                trigger: {
                    player: "phaseAfter",
                },
                forced: true,
                mark: true,
                marktext: "烈直 失效",
                intro: {
                    name: '烈直'
                },
                silent: true,
                popup: false,
                charlotte: true,
                content: function() {
                    player.removeSkill('liezhi_disable')
                },
            },
            damage: {
                trigger: {
                    player: "damage",
                },
                forced: true,
                silent: true,
                popup: false,
                content: function() {
                    player.addSkill('liezhi_disable')
                },
                sub: true,
            },
        },
    }
    lib.skill.juguan = {
        audio: 2,
        enable: "phaseUse",
        usable: 1,
        filter: function(event, player) {
            return event.filterCard({
                name: 'sha',
            }, player, event) || event.filterCard({
                name: 'juedou',
            }, player, event);
        },
        chooseButton: {
            dialog: function() {
                return ui.create.dialog('拒关', [
                    ['sha', 'juedou'], 'vcard']);
            },
            filter: function(button, player) {
                var evt = _status.event.getParent();
                return evt.filterCard({
                    name: button.link[2],
                }, player, evt);
            },
            check: function(button) {
                return _status.event.player.getUseValue({
                    name: button.link[2],
                }) * (button.link[2] == 'juedou' ? 3 : 1);
            },
            backup: function(links) {
                return {
                    audio: 'juguan',
                    viewAs: {
                        name: links[0][2]
                    },
                    filterCard: true,
                    check: function(card) {
                        return 6 - get.value(card);
                    },
                    position: 'h',
                    onuse: function(result, player) {
                        player.addTempSkill('juguan_effect');
                    },
                }
            },
            prompt: function(links) {
                return '将一张手牌当做' + get.translation(links[0][2]) + '使用';
            },
        },
        ai: {
            order: function(item, player) {
                return Math.max(get.order({
                    name: 'sha'
                }), get.order({
                    name: 'juedou'
                })) + 0.2;
            },
            result: {
                player: 1,
            },
        },
        subSkill: {
            effect: {
                trigger: {
                    global: "damage",
                },
                forced: true,
                charlotte: true,
                firstDo: true,
                silent: true,
                popup: false,
                filter: function(event, player) {
                    var evt = event.getParent('useCard');
                    return event.card && evt && event.card == evt.card && evt.skill == 'juguan_backup' && evt.player == player;
                },
                content: function() {
                    player.addSkill('juguan_draw');
                    player.markSkill('juguan_draw', '', '拒关 ' + get.translation(trigger.player))
                    player.markAuto('juguan_draw', [trigger.player]);
                },
                sub: true,
            },
            draw: {
                audio: "juguan",
                trigger: {
                    player: "phaseDrawBegin",
                },
                forced: true,
                charlotte: true,
                onremove: true,
                content: function() {
                    player.removeSkill('juguan_draw');
                    if (!trigger.numFixed) trigger.num += 2;
                },
                group: "juguan_clear",
                intro: {
                    content: "若没有受到$的伤害，则下个摸牌阶段多摸两张牌",
                },
                sub: true,
            },
            clear: {
                trigger: {
                    player: "damage",
                },
                forced: true,
                charlotte: true,
                firstDo: true,
                silent: true,
                popup: false,
                filter: function(event, player) {
                    return player.storage.juguan_draw && player.storage.juguan_draw.contains(event.source);
                },
                content: function() {
                    player.unmarkAuto('juguan_draw', [trigger.source]);
                    if (!player.storage.juguan_draw || !player.storage.juguan_draw.length) player.removeSkill('juguan_draw');
                },
                sub: true,
            },
        },
    }
    lib.skill.shouxi = {
        audio: 2,
        trigger: {
            target: "useCardToTargeted",
        },
        direct: true,
        init: function(player) {
            if (!player.storage.shouxi) player.storage.shouxi = [];
        },
        filter: function(event, player) {
            return event.card.name == 'sha' && event.player.isAlive();
        },
        content: function() {
            'step 0'
            var list = lib.inpile.filter(function(i) {
                if (player.storage.shouxi.contains(i)) return false;
                var type = get.type(i);
                if (type == 'basic' || type == 'trick') return true;
                return false;
            });
            for (var i = 0; i < list.length; i++) {
                list[i] = [get.type(list[i]), '', list[i]];
            }
            player.chooseButton([get.prompt('shouxi', trigger.player), [list, 'vcard']])
                .set('ai', function(button) {
                return Math.random();
            });
            'step 1'
            if (result.bool) {
                player.logSkill('shouxi');
                var name = result.links[0][2];
                event.vcard = result.links;
                event.cardname = name;
                player.storage.shouxi.add(name);
                player.addSkill("shouxi_mark");
                player.addMark("shouxi_mark");
            } else {
                event.finish();
            }
            'step 2'
            var name = event.cardname;
            trigger.player.chooseToDiscard(function(card) {
                return card.name == _status.event.cardname;
            })
                .set('ai', function(card) {
                if (_status.event.att < 0) {
                    return 10 - get.value(card);
                }
                return 0;
            })
                .set('att', get.attitude(trigger.player, player))
                .set('cardname', name)
                .set('dialog', ['守玺：请弃置一张【' + get.translation(name) + '】，否则此【杀】对' + get.translation(player) + '无效', [event.vcard, 'vcard']]);
            'step 3'
            if (result.bool == false) {
                trigger.excluded.push(player);
            } else {
                trigger.player.gainPlayerCard(player);
            }
        },
        ai: {
            effect: {
                target: function(card, player, target, current) {
                    if (card.name == 'sha' && get.attitude(player, target) < 0) {
                        return 0.3;
                    }
                },
            },
        },
        subSkill: {
            mark: {
                intro: {
                    content: function(s, p) {
                        var str = '已记录牌名：'
                        str += get.translation(p.storage.shouxi);
                        return str;
                    },
                },
                sub: true,
            },
        },
    }
    lib.skill.reluoyi2 = {
        trigger: {
            source: "damageBegin1",
        },
        marktext: '裸衣',
        mark: true,
        intro: {
            name: '裸衣',
            content: '你使用【杀】或【决斗】造成伤害时，伤害+1。'
        },
        filter: function(event) {
            return event.card && (event.card.name == 'sha' || event.card.name == 'juedou') && event.notLink();
        },
        forced: true,
        content: function() {
            trigger.num++;
        },
        ai: {
            damageBonus: true,
        },
    }
    lib.skill.duanchang = {
        audio: 2,
        audioname: ["re_caiwenji"],
        forbid: ["boss"],
        trigger: {
            player: "die",
        },
        forced: true,
        forceDie: true,
        skillAnimation: true,
        animationColor: "gray",
        filter: function(event) {
            return event.source && event.source.isIn();
        },
        content: function() {
            trigger.source.clearSkills();
            trigger.source.addSkill('duanchang_mark')
        },
        logTarget: "source",
        ai: {
            threaten: function(player, target) {
                if (target.hp == 1) return 0.2;
                return 1.5;
            },
            effect: {
                target: function(card, player, target, current) {
                    if (!target.hasFriend()) return;
                    if (target.hp <= 1 && get.tag(card, 'damage')) return [1, 0, 0, -2];
                },
            },
        },
        subSkill: {
            mark: {
                marktext: "断肠",
                mark: true,
                intro: {
                    name: '断肠'
                },
                sub: true,
            },
        },
    }
    lib.skill.rezongshi_paoxiao = {
        mark: true,
        marktext: "杀 不限次数",
        intro: {
            name: '无限杀',
        },
        mod: {
            cardUsable: function(card, player, num) {
                if (card.name == 'sha') return Infinity;
            },
        },
    },
    lib.skill.rezishou = {
        audio: "zishou",
        audioname: ["re_liubiao"],
        trigger: {
            player: "phaseDrawBegin2",
        },
        check: function(event, player) {
            return player.countCards('h') <= (player.hasSkill('zongshi') ? player.maxHp : (player.hp - 2)) || player.skipList.contains('phaseUse') || !player.countCards('h', function(card) {
                return get.tag(card, 'damage') && player.hasUseTarget(card);
            });
        },
        filter: function(event, player) {
            return !event.numFixed;
        },
        content: function() {
            trigger.num += game.countGroup();
            player.addTempSkill('rezishou2');
            player.addTempSkill("rezishou_mark");
            player.markSkill("rezishou_mark", '', '自守');
        },
        ai: {
            threaten: 1.5,
        },
        subSkill: {
            mark: {
                intro: {},
                sub: true,
            },
        },
    }
    lib.skill.decadezishou = {
        audio: 2,
        inherit: "rezishou",
        group: "decadezishou_zhiheng",
        ai: {
            threaten: 1.8,
        },
        audioname: ["re_liubiao"],
        trigger: {
            player: "phaseDrawBegin2",
        },
        check: function(event, player) {
            return player.countCards('h') <= (player.hasSkill('zongshi') ? player.maxHp : (player.hp - 2)) || player.skipList.contains('phaseUse') || !player.countCards('h', function(card) {
                return get.tag(card, 'damage') && player.hasUseTarget(card);
            });
        },
        filter: function(event, player) {
            return !event.numFixed;
        },
        content: function() {
            trigger.num += game.countGroup();
            player.addTempSkill('rezishou2');
            player.addTempSkill("decadezishou_mark");
            player.markSkill("decadezishou_mark", '', '自守');
        },
        subSkill: {
            mark: {
                intro: {},
                sub: true,
            },
        },
    }
    lib.skill.zishou = {
        audio: 2,
        audioname: ["re_liubiao"],
        trigger: {
            player: "phaseDrawBegin2",
        },
        check: function(event, player) {
            return player.countCards('h') <= (player.hasSkill('zongshi') ? player.maxHp : (player.hp - 2)) || player.skipList.contains('phaseUse');
        },
        filter: function(event, player) {
            return !event.numFixed;
        },
        content: function() {
            trigger.num += game.countGroup();
            player.addTempSkill('zishou2');
            player.unmarkSkill('rezongshi_paoxiao');
            player.addTempSkill("zishou_mark");
            player.markSkill("zishou_mark", '', '自守');
        },
        ai: {
            threaten: 1.5,
        },
        subSkill: {
            mark: {
                intro: {},
                sub: true,
            },
        },
    }
    lib.skill.xinfu_duanfa = {
        init: function(player) {
            player.storage.xinfu_duanfa = 0;
        },
        audio: 2,
        enable: "phaseUse",
        position: "he",
        filter: function(card, player) {
            return player.storage.xinfu_duanfa < player.maxHp;
        },
        filterCard: function(card) {
            return get.color(card) == 'black';
        },
        selectCard: function() {
            var player = _status.event.player;
            return [1, player.maxHp - player.storage.xinfu_duanfa];
        },
        check: function(card) {
            return 6 - get.value(card)
        },
        delay: false,
        content: function() {
            player.draw(cards.length);
            player.storage.xinfu_duanfa += cards.length;
            player.addTempSkill('xinfu_duanfa_mark');
            player.addMark('xinfu_duanfa_mark', cards.length)
        },
        group: "xinfu_duanfa_clear",
        subSkill: {
            mark: {
                intro: {},
                onremove: function(player) {
                    player.unmarkSkill('xinfu_duanfa_mark');
                    delete player.storage.xinfu_duanfa_mark;
                },
                sub: true,
            },
            clear: {
                trigger: {
                    player: "phaseBefore",
                },
                forced: true,
                silent: true,
                popup: false,
                content: function() {
                    player.storage.xinfu_duanfa = 0;
                },
                sub: true,
            },
        },
        ai: {
            order: 1,
            result: {
                player: 1,
            },
        },
    }
    lib.skill.xinchoufa = {
        audio: "choufa",
        inherit: "choufa",
        content: function() {
            'step 0'
            player.choosePlayerCard(target, 'h', true);
            'step 1'
            player.showCards(result.cards, get.translation(player) + '对' + get.translation(target) + '发动了【筹伐】');
            var type = get.type2(result.cards[0], target),
                hs = target.getCards('h', function(card) {
                    return card != result.cards[0] && get.type2(card, target) != type;
                });
            if (hs.length) {
                target.addGaintag(hs, 'xinchoufa');
                target.addTempSkill('xinchoufa2', {
                    player: 'phaseAfter'
                });
                target.addTempSkill('xinchoufa_mark', {
                    player: 'phaseAfter'
                });
                var str;
                if (get.type2(result.cards[0], target) == 'trick') str = '锦囊牌';
                else if (get.type2(result.cards[0], target) == 'basic') str = '基本牌';
                else str = '装备牌';
                target.storage.xinchoufa_mark = '';
                target.markSkill("xinchoufa_mark", '', '筹伐 ' + str);
            }
        },
        enable: "phaseUse",
        usable: 1,
        filter: function(event, player) {
            return game.hasPlayer(function(current) {
                return lib.skill.choufa.filterTarget(null, player, current);
            });
        },
        filterTarget: function(card, player, target) {
            return target != player && !target.hasSkill('choufa2') && target.countCards('h') > 0;
        },
        ai: {
            order: 9,
            result: {
                target: function(player, target) {
                    return -target.countCards('h');
                },
            },
        },
        subSkill: {
            mark: {
                intro: {},
                sub: true,
            },
        },
    }
    lib.skill.zhaoran2 = {
        audio: "zhaoran",
        global: "zhaoran3",
        trigger: {
            player: "loseAfter",
            global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
        },
        forced: true,
        charlotte: true,
        init: function(player, skill) {
            if (!player.storage[skill]) player.storage[skill] = [];
        },
        onremove: true,
        filter: function(event, player) {
            var evt = event.getl(player);
            if (!evt || !evt.hs || !evt.hs.length) return false;
            var list = player.getStorage('zhaoran2');
            for (var i of evt.hs) {
                var suit = get.suit(i, player);
                if (!list.contains(suit) && !player.countCards('h', {
                    suit: suit
                })) return true;
            }
            return false;
        },
        content: function() {
            'step 0'
            if (trigger.delay === false) game.delayx();
            var list = [];
            var suits = get.copy(player.storage.zhaoran2);
            suits.addArray(player.getCards('h')
                .map(function(card) {
                return get.suit(card);
            }));
            var evt = trigger.getl(player);
            for (var i of evt.hs) {
                var suit = get.suit(i, player);
                if (!suits.contains(suit)) list.add(suit);
            }
            event.count = list.length;
            player.markAuto('zhaoran2', list);
            player.addTempSkill("zhaoran2_mark");
            if (!player.storage.zhaoran22) player.storage.zhaoran22 = [];
            player.storage.zhaoran22.add(suit);
            var str = player.storage.zhaoran22.sortBySuit()
                .join('');
            /*   if (player.storage.zhaoran22.contains('heart')) str += '♥️️';
            if (player.storage.zhaoran22.contains('diamond')) str += '♦️️';
            if (player.storage.zhaoran22.contains('spade')) str += '♠️️';
            if (player.storage.zhaoran22.contains('club')) str += '♣️️';*/
            player.storage.zhaoran2_mark = '';
            player.addMark("zhaoran2_mark", str);
            'step 1'
            event.count--;
            var filterTarget = function(card, player, target) {
                return target != player && target.countDiscardableCards(player, 'he') > 0;
            }
            if (!game.hasPlayer(function(current) {
                return filterTarget(null, player, current);
            })) event._result = {
                bool: false
            };
            else player.chooseTarget(filterTarget, '弃置一名其他角色的一张牌或摸一张牌')
                .set('ai', function(target) {
                var att = get.attitude(player, target);
                if (att >= 0) return 0;
                if (target.countCards('he', function(card) {
                    return get.value(card) > 5;
                })) return -att;
                return 0;
            });
            'step 2'
            if (!result.bool) player.draw();
            else {
                var target = result.targets[0];
                player.line(target, 'green');
                player.discardPlayerCard(target, true, 'he');
            }
            if (event.count > 0) event.goto(1);
        },
        subSkill: {
            mark: {
                intro: {},
                onremove: function(player) {
                    player.removeMark('zhaoran22');
                    player.unmarkSkill('zhaoran2_mrk');
                    delete player.storage.zhaoran22;
                    delete player.storage.zhaoran2_mark;
                },
                sub: true,
            },
        },
    }
    lib.skill.zhishi = {
        audio: 2,
        trigger: {
            player: "phaseJieshuBegin",
        },
        direct: true,
        content: function() {
            'step 0'
            player.chooseTarget(get.prompt2('zhishi'))
                .set('ai', function(target) {
                var player = _status.event.player;
                var att = get.attitude(player, target);
                if (att <= 4) return 0;
                if (target.hasSkillTag('nogain')) att /= 10;
                return att;
            });
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                player.logSkill('zhishi', target);
                player.storage.zhishi_mark = target;
                player.addTempSkill('zhishi_mark', {
                    player: 'phaseBegin'
                });
                player.addTempSkill('zhishi_xg', {
                    player: 'phaseBegin'
                });
                player.storage.zhishi_xg = '';
                player.markSkill("zhishi_xg", '', '指誓 ' + get.translation(target));
            }
        },
        ai: {
            expose: 0.3,
        },
        subSkill: {
            xg: {
                intro: {},
                sub: true,
            },
            mark: {
                trigger: {
                    global: ["dying", "useCardToTargeted"],
                },
                direct: true,
                charlotte: true,
                filter: function(event, player) {
                    if (!player.getExpansions('xunli')
                        .length) return false;
                    var target = player.storage.zhishi_mark;
                    if (event.name == 'dying') return event.player == target;
                    return event.card.name == 'sha' && event.target == target;
                },
                content: function() {
                    'step 0'
                    var target = player.storage.zhishi_mark;
                    event.target = target;
                    player.chooseButton([get.prompt('zhishi', target), '<div class="text center">弃置任意张“疠”并令其摸等量的牌</div>', player.getExpansions('xunli')], [1, Infinity])
                        .set('ai', function(button) {
                        var player = _status.event.player,
                            target = player.storage.zhishi_mark;
                        if (target.hp < 1 && target != get.zhu(player)) return 0;
                        if (target.hasSkillTag('nogain')) return 0;
                        return 3 - player.getUseValue(card, false);
                    });
                    'step 1'
                    if (result.bool) {
                        player.logSkill('zhishi', target);
                        player.loseToDiscardpile(result.links);
                        target.draw(result.links.length);
                    }
                },
                // mark:"character",
                // intro:{
                // content:"决定帮助$，具体帮不帮另说",
                // },
                sub: true,
            },
        },
    }
    lib.skill.neifa_basic = {
        mark: true,
        marktext: '内伐 基本牌',
        onremove: true,
        intro: {
            name: '内伐 - 基本牌',
            content: '本回合内不能使用锦囊牌和装备牌，且使用【杀】选择目标时可以多选择1个目标，且使用【杀】的目标次数上限+#。',
        },
        mod: {
            cardEnabled: function(card, player) {
                if (['trick', 'equip'].contains(get.type(card, 'trick'))) return false;
            },
            cardSavable: function(card, player) {
                if (['trick', 'equip'].contains(get.type(card, 'trick'))) return false;
            },
            cardUsable: function(card, player, num) {
                if (card.name == 'sha') {
                    return num + player.countMark('neifa_basic');
                }
            },
        },
        trigger: {
            player: 'useCard2'
        },
        filter: function(event, player) {
            if (event.card.name != 'sha') return false;
            return game.hasPlayer(function(current) {
                return !event.targets.contains(current) && player.canUse(event.card, current);
            });
        },
        direct: true,
        content: function() {
            'step 0'
            player.chooseTarget(get.prompt('neifa'), '为' + get.translation(trigger.card) + '额外指定一个目标', function(card, player, target) {
                return !_status.event.sourcex.contains(target) && player.canUse(_status.event.card, target);
            })
                .set('sourcex', trigger.targets)
                .set('ai', function(target) {
                var player = _status.event.player;
                return get.effect(target, _status.event.card, player, player);
            })
                .set('card', trigger.card);
            'step 1'
            if (result.bool) {
                if (!event.isMine() && !event.isOnline()) game.delayx();
                event.targets = result.targets;
            } else {
                event.finish();
            }
            'step 2'
            player.logSkill('neifa', event.targets);
            trigger.targets.addArray(event.targets);
        },
    },
    lib.skill.neifa_nobasic = {
        trigger: {
            player: 'useCard2'
        },
        direct: true,
        mark: true,
        marktext: '内伐 非基本',
        onremove: true,
        mod: {
            cardEnabled: function(card, player) {
                if (get.type(card) == 'basic') return false;
            },
            cardSavable: function(card, player) {
                if (get.type(card) == 'basic') return false;
            },
        },
        intro: {
            name: '内伐 - 非基本牌',
            content: '本回合内不能使用基本牌，且使用普通锦囊牌选择目标时可以多选择1个目标，且本回合的出牌阶段内前两次使用装备牌时摸#张牌。'
        },
        filter: function(event, player) {
            if (get.type(event.card) != 'trick') return false;
            if (event.targets && event.targets.length > 0) return true;
            var info = get.info(event.card);
            if (info.allowMultiple == false) return false;
            if (event.targets && !info.multitarget) {
                if (game.hasPlayer(function(current) {
                    return !event.targets.contains(current) && lib.filter.targetEnabled2(event.card, player, current) && lib.filter.targetInRange(event.card, player, current);
                })) {
                    return true;
                }
            }
            return false;
        },
        content: function() {
            'step 0'
            var prompt2 = '为' + get.translation(trigger.card) + '增加或减少一个目标'
            player.chooseTarget(get.prompt('neifa'), function(card, player, target) {
                var player = _status.event.player;
                if (_status.event.targets.contains(target)) return true;
                return lib.filter.targetEnabled2(_status.event.card, player, target) && lib.filter.targetInRange(_status.event.card, player, target);
            })
                .set('prompt2', prompt2)
                .set('ai', function(target) {
                var trigger = _status.event.getTrigger();
                var player = _status.event.player;
                return get.effect(target, trigger.card, player, player) * (_status.event.targets.contains(target) ? -1 : 1);
            })
                .set('targets', trigger.targets)
                .set('card', trigger.card);
            'step 1'
            if (result.bool) {
                if (!event.isMine() && !event.isOnline()) game.delayx();
                event.targets = result.targets;
            } else {
                event.finish();
            }
            'step 2'
            if (event.targets) {
                player.logSkill('neifa', event.targets);
                if (trigger.targets.contains(event.targets[0])) trigger.targets.removeArray(event.targets);
                else trigger.targets.addArray(event.targets);
            }
        },
        group: 'neifa_use',
        ai: {
            reverseOrder: true,
            skillTagFilter: function(player) {
                if (player.storage.counttrigger && player.storage.counttrigger.neifa_use >= 2) return false;
            },
            effect: {
                target: function(card, player, target) {
                    if ((!player.storage.counttrigger || !player.storage.counttrigger.neifa_use || player.storage.counttrigger.neifa_use < 2) && player == target && get.type(card) == 'equip') return [1, 3];
                },
            },
        },
    },
    lib.skill.xinfu_guanchao = {
        subSkill: {
            dizeng: {
                trigger: {
                    player: "useCard",
                },
                audio: "xinfu_guanchao",
                forced: true,
                mod: {
                    aiOrder: function(player, card, num) {
                        if (typeof card.number != 'number') return;
                        var history = player.getHistory('useCard', function(evt) {
                            return evt.isPhaseUsing();
                        });
                        if (history.length == 0) return num + 10 * (14 - card.number);
                        var num = get.number(history[0].card);
                        if (!num) return;
                        for (var i = 1; i < history.length; i++) {
                            var num2 = get.number(history[i].card);
                            if (!num2 || num2 <= num) return;
                            num = num2;
                        }
                        if (card.number > num) return num + 10 * (14 - card.number);
                    },
                },
                filter: function(event, player) {
                    var history = player.getHistory('useCard', function(evt) {
                        return evt.isPhaseUsing();
                    });
                    if (history.length < 2) return false;
                    if (!num2 || num2 <= num) {
                        player.unmarkSkill('xinfu_guanchaog2_mark2')
                    };
                    var num = get.number(history[0].card);
                    if (!num) return false;
                    for (var i = 1; i < history.length; i++) {
                        var num2 = get.number(history[i].card);
                        if (!num2 || num2 <= num) return false;
                        num = num2;
                    }
                    return true;
                },
                content: function() {
                    player.draw();
                    var number = get.number(trigger.card, player);
                    player.storage.xinfu_guanchaog2_mark2 = '';
                    player.addMark("xinfu_guanchaog2_mark2", number);
                },
                sub: true,
            },
            dijian: {
                init: function(player) {
                    player.storage.guanchao = 0;
                },
                onremove: function(player) {
                    delete player.storage.guanchao;
                },
                trigger: {
                    player: "useCard",
                },
                audio: "xinfu_guanchao",
                forced: true,
                mod: {
                    aiOrder: function(player, card, num) {
                        if (typeof card.number != 'number') return;
                        var history = player.getHistory('useCard', function(evt) {
                            return evt.isPhaseUsing();
                        });
                        if (history.length == 0) return num + 10 * card.number;
                        var num = get.number(history[0].card);
                        if (!num) return;
                        for (var i = 1; i < history.length; i++) {
                            var num2 = get.number(history[i].card);
                            if (!num2 || num2 >= num) return;
                            num = num2;
                        }
                        if (card.number < num) return num + 10 * card.number;
                    },
                },
                filter: function(event, player) {
                    var history = player.getHistory('useCard', function(evt) {
                        return evt.isPhaseUsing();
                    });
                    if (history.length < 2) return false;
                    if (!num2 || num2 >= num) {
                        player.unmarkSkill('xinfu_guanchaog2_mark')
                    };
                    var num = get.number(history[0].card);
                    if (!num) return false;
                    for (var i = 1; i < history.length; i++) {
                        var num2 = get.number(history[i].card);
                        if (!num2 || num2 >= num) return false;
                        num = num2;
                    }
                    return true;
                },
                content: function() {
                    player.draw();
                    var number = get.number(trigger.card, player);
                    player.storage.xinfu_guanchaog2_mark = '';
                    player.addMark("xinfu_guanchaog2_mark", number);
                },
                sub: true,
            },
        },
        audio: 2,
        trigger: {
            player: "phaseUseBegin",
        },
        direct: true,
        content: function() {
            'step 0'
            var list = ['递增', '递减', '取消'];
            player.chooseControl(list)
                .set('prompt', get.prompt2('xinfu_guanchao'))
                .set('ai', function() {
                return [0, 1].randomGet();
            });
            'step 1'
            switch (result.control) {
                case '递增':
                    {
                        player.logSkill('xinfu_guanchao');
                        player.addTempSkill('xinfu_guanchao_dizeng', 'phaseUseEnd');
                        player.addTempSkill('xinfu_guanchaog3', 'phaseUseEnd');
                        player.addTempSkill('xinfu_guanchaog2_mark2', 'phaseUseEnd');

                        break;
                    }
                case '递减':
                    {
                        player.logSkill('xinfu_guanchao');
                        player.addTempSkill('xinfu_guanchao_dijian', 'phaseUseEnd');
                        player.addTempSkill('xinfu_guanchaog2', 'phaseUseEnd');
                        player.addTempSkill('xinfu_guanchaog2_mark', 'phaseUseEnd');
                        break;
                    }
                case '取消':
                    {
                        break;
                    }
            }
        },
    }
    lib.skill.xinfu_guanchaog2 = {
        trigger: {
            player: "useCard2",
        },
        forced: true,
        usable: 1,
        content: function() {
            var number = get.number(trigger.card, player);
            player.storage.xinfu_guanchaog2_mark = '';
            player.addMark("xinfu_guanchaog2_mark", number);
        },
        subSkill: {
            mark: {
                marktext: "观潮 减",
                mark: true,
                intro: {
                    name: '观潮'
                },
                onremove: function(player) {
                    player.unmarkSkill('xinfu_guanchaog2_mark');
                    delete player.storage.xinfu_guanchaog2_mark;
                },
                sub: true,
            },
            mark2: {
                marktext: "观潮 增",
                mark: true,
                intro: {
                    name: '观潮'
                },
                onremove: function(player) {
                    player.unmarkSkill('xinfu_guanchaog2_mark2');
                    delete player.storage.xinfu_guanchaog2_mark2;
                },
                sub: true,
            },
        },
    }
    lib.skill.xinfu_guanchaog3 = {
        trigger: {
            player: "useCard2",
        },
        forced: true,
        usable: 1,
        content: function() {
            var number = get.number(trigger.card, player);
            player.storage.xinfu_guanchaog2_mark2 = '';
            player.addMark("xinfu_guanchaog2_mark2", number);
        },
    }
    lib.skill.spyilie = {
        audio: 2,
        trigger: {
            player: "phaseUseBegin",
        },
        direct: true,
        content: function() {
            'step 0'
            player.chooseControl('选项一', '选项二', '背水！', 'cancel2')
                .set('choiceList', [
                '本阶段内使用【杀】的次数上限+1',
                '本回合内使用【杀】被【闪】抵消时摸一张牌',
                '背水！失去1点体力并依次执行上述所有选项', ])
                .set('ai', function() {
                if (player.countCards('hs', function(card) {
                    return get.name(card) == 'sha' && player.hasValueTarget(card);
                }) > player.getCardUsable({
                    name: 'sha'
                })) return 0;
                return 1;
            });
            'step 1'
            if (result.control != 'cancel2') {
                player.logSkill('spyilie');
                game.log(player, '选择了', '#g【毅烈】', '的', '#y' + result.control);
                if (result.index % 2 == 0) player.addTempSkill('spyilie_add', 'phaseUseEnd');
                if (result.index > 0) player.addTempSkill('spyilie_miss');
                if (result.index == 2) player.loseHp();
            }
        },
        subSkill: {
            add: {
                charlotte: true,
                mark: true,
                marktext: "毅烈 次数+1",
                intro: {},
                mod: {
                    cardUsable: function(card, player, num) {
                        if (card.name == 'sha') return num + 1;
                    },
                },
                sub: true,
            },
            miss: {
                charlotte: true,
                audio: "spyilie",
                mark: true,
                marktext: "毅烈 被闪摸牌",
                intro: {},
                trigger: {
                    player: "shaMiss",
                },
                forced: true,
                content: function() {
                    player.draw();
                },
                sub: true,
            },
        },
    }
    lib.skill.zhishi = {
        audio: 2,
        trigger: {
            player: "phaseJieshuBegin",
        },
        direct: true,

        content: function() {
            'step 0'
            player.chooseTarget(get.prompt2('zhishi'))
                .set('ai', function(target) {
                var player = _status.event.player;
                var att = get.attitude(player, target);
                if (att <= 4) return 0;
                if (target.hasSkillTag('nogain')) att /= 10;
                return att;
            });
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                player.logSkill('zhishi', target);
                player.storage.zhishi_mark = target;
                player.addTempSkill('zhishi_mark', {
                    player: 'phaseBegin'
                });
                player.addTempSkill('zhishi_xg', {
                    player: 'phaseBegin'
                });
                player.storage.zhishi_xg = '';
                player.markSkill("zhishi_xg", '', '指誓 ' + get.translation(target));
            }
        },
        ai: {
            expose: 0.3,
        },
        subSkill: {
            xg: {
                intro: {},
                sub: true,
            },
            mark: {
                trigger: {
                    global: ["dying", "useCardToTargeted"],
                },
                direct: true,
                charlotte: true,
                filter: function(event, player) {
                    if (!player.getExpansions('xunli')
                        .length) return false;
                    var target = player.storage.zhishi_mark;
                    if (event.name == 'dying') return event.player == target;
                    return event.card.name == 'sha' && event.target == target;
                },
                content: function() {
                    'step 0'
                    var target = player.storage.zhishi_mark;
                    event.target = target;
                    player.chooseButton([get.prompt('zhishi', target), '<div class="text center">弃置任意张“疠”并令其摸等量的牌</div>', player.getExpansions('xunli')], [1, Infinity])
                        .set('ai', function(button) {
                        var player = _status.event.player,
                            target = player.storage.zhishi_mark;
                        if (target.hp < 1 && target != get.zhu(player)) return 0;
                        if (target.hasSkillTag('nogain')) return 0;
                        return 3 - player.getUseValue(card, false);
                    });
                    'step 1'
                    if (result.bool) {
                        player.logSkill('zhishi', target);
                        player.loseToDiscardpile(result.links);
                        target.draw(result.links.length);
                    }
                },
                // mark:"character",
                // intro:{
                // content:"决定帮助$，具体帮不帮另说",
                // },
                sub: true,
            },
        },
    }
    lib.skill.taoluan = {
        audio: 2,
        enable: ["chooseToUse", "chooseToRespond"],
        filter: function(event, player) {
            if (!player.countCards('hse') || player.hasSkill('taoluan3')) return false;
            for (var i of lib.inpile) {
                var type = get.type(i);
                if ((type == 'basic' || type == 'trick') && lib.filter.filterCard({
                    name: i
                }, player, event)) return true;
            }
            return false;
        },
        hiddenCard: function(player, name) {
            return (!player.getStorage('taoluan')
                .contains(name) && player.countCards('hes') > 0 && !player.hasSkill('taoluan3') && lib.inpile.contains(name));
        },
        init: function(player) {
            if (!player.storage.taoluan) player.storage.taoluan = [];
        },
        onremove: true,
        chooseButton: {
            dialog: function(event, player) {
                var list = [];
                for (var i = 0; i < lib.inpile.length; i++) {
                    var name = lib.inpile[i];
                    if (player.storage.taoluan && player.storage.taoluan.contains(name)) continue;
                    if (name == 'sha') {
                        if (event.filterCard({
                            name: name
                        }, player, event)) list.push(['基本', '', 'sha']);
                        for (var j of lib.inpile_nature) {
                            if (event.filterCard({
                                name: name,
                                nature: j
                            }, player, event)) list.push(['基本', '', 'sha', j]);
                        }
                    } else if (get.type(name) == 'trick' && event.filterCard({
                        name: name
                    }, player, event)) list.push(['锦囊', '', name]);
                    else if (get.type(name) == 'basic' && event.filterCard({
                        name: name
                    }, player, event)) list.push(['基本', '', name]);
                }
                if (list.length == 0) {
                    return ui.create.dialog('滔乱已无可用牌');
                }
                return ui.create.dialog('滔乱', [list, 'vcard']);
            },
            filter: function(button, player) {
                return _status.event.getParent()
                    .filterCard({
                    name: button.link[2]
                }, player, _status.event.getParent());
            },
            check: function(button) {
                var player = _status.event.player;
                if (player.countCards('hs', button.link[2]) > 0) return 0;
                if (button.link[2] == 'wugu') return 0;
                var effect = player.getUseValue(button.link[2]);
                if (effect > 0) return effect;
                return 0;
            },
            backup: function(links, player) {
                return {
                    filterCard: true,
                    audio: 'taoluan',
                    selectCard: 1,
                    popname: true,
                    check: function(card) {
                        return 6 - get.value(card);
                    },
                    position: 'hes',
                    viewAs: {
                        name: links[0][2],
                        nature: links[0][3]
                    },
                    onuse: function(result, player) {
                        player.storage.taoluan.add(result.card.name);
                        player.addSkill("taoluan_mark");
                        player.addMark("taoluan_mark");

                    },
                }
            },
            prompt: function(links, player) {
                return '将一张牌当做' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '使用';
            },
        },
        ai: {
            skillTagFilter: function(player) {
                if (!player.countCards('hes') || player.hasSkill('taoluan3')) return false;
                if (!player.storage.taoluan.contains('tao')) {} else if (player.isDying() && !player.storage.taoluan.contains('jiu')) {} else return false;
            },
            order: 4,
            result: {
                player: function(player) {
                    var allshown = true,
                        players = game.filterPlayer();
                    for (var i = 0; i < players.length; i++) {
                        if (players[i].ai.shown == 0) {
                            allshown = false;
                        }
                        if (players[i] != player && players[i].countCards('h') && get.attitude(player, players[i]) > 0) {
                            return 1;
                        }
                    }
                    if (allshown) return 1;
                    return 0;
                },
            },
            threaten: 1.9,
        },
        group: ["taoluan2"],
        subSkill: {
            mark: {
                intro: {
                    content: function(s, p) {
                        var str = '已使用牌名：'
                        str += get.translation(p.storage.taoluan);
                        return str;
                    },
                },
                sub: true,
            },
        },
    };
    lib.skill.taoluan3 = {
        init: function(player) {
            player.shixiaoSkill("taoluan");
        },
        onremove: function(player) {
            player.unshixiaoSkill("taoluan");
        }
    };
    lib.skill.yinyi = {
        audio: 2,
        trigger: {
            player: "damageBegin1",
        },
        forced: true,
        usable: 1,
        filter: function(event, player) {
            return event.source && event.source.hp != player.hp && !lib.linked.contains(event.nature) && event.source.countCards('h') != player.countCards('h');
        },
        content: function() {
            player.unmarkSkill('yinyi1_mark')
            trigger.cancel();
        },
        ai: {
            effect: {
                target: function(card, player, target, current) {
                    if (get.tag(card, 'damage')) {
                        if (player.hp == target.hp) return;
                        var cards = [card];
                        if (card.cards && card.cards.length) cards.addArray(card.cards);
                        if (ui.selected.cards.length) cards.addArray(ui.selected.cards);
                        if (player.countCards('h', function(card) {
                            return !cards.contains(card);
                        }) == target.countCards('h')) return;
                        return 'zerotarget';
                    }
                },
            },
        },
        group: "yinyi1",
    }
    lib.skill.yinyi1 = {
        trigger: {
            global: "phaseZhunbeiBegin",
        },
        forced: true,
        audio: false,
        content: function() {
            player.addSkill("yinyi1_mark");
            player.markSkill("yinyi1_mark");
        },
        subSkill: {
            mark: {
                marktext: "隐逸",
                mark: true,
                intro: {
                    name: '隐逸',
                },
                sub: true,
            },
        },
    };
    lib.skill.spyajun = {
        audio: 2,
        trigger: {
            player: "phaseUseBegin",
        },
        direct: true,
        filter: function(event, player) {
            var hs = player.getCards('h');
            return hs.length > 0 && !player.hasSkillTag('noCompareSource') && player.hasHistory('gain', function(evt) {
                for (var i of evt.cards) {
                    if (hs.contains(i)) return true;
                }
                return false;
            }) && game.hasPlayer(function(current) {
                return current != player && player.canCompare(current);
            });
        },
        content: function() {
            'step 0'
            var cards = [],
                hs = player.getCards('h');
            player.getHistory('gain', function(evt) {
                cards.addArray(evt.cards);
            });
            cards = cards.filter(function(i) {
                return hs.contains(i);
            });
            player.chooseCardTarget({
                prompt: get.prompt('spyajun'),
                prompt2: '操作提示：选择一张本回合新获得的牌作为拼点牌，然后选择一名拼点目标',
                cards: cards,
                filterCard: function(card) {
                    return _status.event.cards.contains(card);
                },
                filterTarget: function(card, player, target) {
                    return player.canCompare(target);
                },
                ai1: function(card) {
                    return get.number(card) - get.value(card);
                },
                ai2: function(target) {
                    return -get.attitude(_status.event.player, target) * Math.sqrt(5 - Math.min(4, target.countCards('h'))) * (target.hasSkillTag('noh') ? 0.5 : 1);
                },
            });
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                player.logSkill('spyajun', target);
                var next = player.chooseToCompare(target);
                if (!next.fixedResult) next.fixedResult = {};
                next.fixedResult[player.playerid] = result.cards[0];
            } else event.finish();
            'step 2'
            if (result.bool) {
                var cards = [result.player, result.target].filterInD('d');
                if (cards.length) {
                    player.chooseButton(['是否将一张牌置于牌堆顶？', cards])
                        .set('ai', function(button) {
                        if (get.color(button.link) == 'black') return 1;
                        return 0;
                    });
                } else event.finish();
            } else {
                // player.addMark('spyajun_less',1,false);
                player.addTempSkill('spyajun_less');
                event.finish();
            }
            'step 3'
            if (result.bool) {
                var card = result.links[0];
                card.fix();
                ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
                game.updateRoundNumber();
                game.log(player, '将', card, '置于牌堆顶');
            }
        },
        group: "spyajun_draw",
        subSkill: {
            draw: {
                audio: "spyajun",
                trigger: {
                    player: "phaseDrawBegin2",
                },
                forced: true,
                locked: false,
                filter: function(event, player) {
                    return !event.numFixed;
                },
                content: function() {
                    trigger.num++;
                },
                sub: true,
            },
            less: {
                onremove: true,
                charlotte: true,
                marktext: "雅俊 没赢",
                mark: true,
                intro: {
                    content: "手牌上限-1",
                },
                mod: {
                    maxHandcard: function(player, num) {
                        return num - 1;
                    },
                },
                sub: true,
            },
        },
    }
    lib.skill.bingjie = {
        trigger: {
            player: "phaseUseBegin",
        },
        check: function(event, player) {
            return player.maxHp > 3 && player.isDamaged() && player.hasCard(function(card) {
                return game.hasPlayer(function(current) {
                    return current != player && get.attitude(player, current) < 0 && player.canUse(card, current, null, true) && get.effect(current, card, player, player) > 0;
                }) && player.hasValueTarget(card);
            }, 'hs');
        },
        content: function() {
            'step 0'
            player.loseMaxHp();
            'step 1'
            player.addTempSkill('bingjie_effect');
            game.delayx();
        },
        subSkill: {
            effect: {
                audio: "bingjie",
                trigger: {
                    player: "useCardToPlayered",
                },
                mark: true,
                intro: {
                    name: '秉节'
                },
                forced: true,
                charlotte: true,
                logTarget: "target",
                filter: function(event, player) {
                    return event.target != player && (event.card.name == 'sha' || get.type(event.card, false) == 'trick') && event.target.countCards('he') > 0;
                },
                content: function() {
                    trigger.target.chooseToDiscard('he', true);
                },
                sub: true,
            },
        },
    }
    lib.skill.cslilu = {
        audio: 2,
        trigger: {
            player: "phaseDrawBegin1",
        },
        filter: function(event, player) {
            return !event.numFixed;
        },
        check: function(event, player) {
            return Math.min(player.maxHp, 5) - player.countCards('h') > 3 || game.hasPlayer(function(current) {
                return current != player && get.attitude(player, current) > 0;
            });
        },
        content: function() {
            'step 0'
            trigger.changeToZero();
            'step 1'
            player.drawTo(Math.min(player.maxHp, 5));
            'step 2'
            if (player.countCards('h') > 0) {
                var str = '将至少一张手牌交给一名其他角色';
                var num = player.countMark('cslilu');
                if (num < player.countCards('h')) {
                    if (num > 0) str += ('。若给出的牌数大于' + get.cnNumber(num) + '张，则你');
                    else str += '，并';
                    str += '加1点体力上限并回复1点体力'
                }
                player.chooseCardTarget({
                    prompt: str,
                    filterCard: true,
                    filterTarget: lib.filter.notMe,
                    selectCard: [1, Infinity],
                    forced: true,
                    ai1: function(card) {
                        if (ui.selected.cards.length < _status.event.goon) {
                            if (get.tag(card, 'damage') && game.hasPlayer(function(current) {
                                current != player && get.attitude(player, current) > 0 && !current.hasSkillTag('nogain') && !current.hasJudge('lebu') && current.hasValueTarget(card);
                            })) return 1;
                            return 1 / Math.max(0.1, get.value(card));
                        }
                        return 0;
                    },
                    ai2: function(target) {
                        return Math.sqrt(5 - Math.min(4, target.countCards('h'))) * get.attitude(_status.event.player, target);
                    },
                    goon: function() {
                        if (!game.hasPlayer(function(current) {
                            return current != player && get.attitude(player, current) > 0 && !current.hasSkillTag('nogain') && !current.hasJudge('lebu');
                        })) return 1;
                        if (num < player.countCards('h')) return num + 1;
                        return 1;
                    }(),
                });
            } else event.finish();
            'step 3'
            if (result.bool) {
                var num = player.countMark('cslilu');
                result.targets[0].gain(result.cards, player, 'giveAuto');
                if (result.cards.length > num) {
                    player.storage.cslilu_mark = '';
                    player.addSkill('cslilu_mark');
                    player.addMark('cslilu_mark', result.cards.length);
                    player.gainMaxHp();
                    player.recover();
                } else {
                    player.storage.cslilu_mark = '';
                    player.addSkill('cslilu_mark');
                    player.addMark('cslilu_mark', result.cards.length);
                }
                player.storage.cslilu = result.cards.length;
                player.markSkill('cslilu');
            }
        },
        subSkill: {
            mark: {
                intro: {},
                sub: true,
            },
        },
    }
    lib.skill.jinglve = {
        audio: 2,
        enable: "phaseUse",
        usable: 1,
        filter: function(event, player) {
            if (player.hasSkill('jinglve2')) return false;
            return game.hasPlayer(function(current) {
                return current != player && current.countCards('h') > 0;
            });
        },
        filterTarget: function(card, player, target) {
            return target != player && target.countCards('h') > 0;
        },
        content: function() {
            'step 0'
            if (!player.storage.jinglve4) player.storage.jinglve4 = [];
            player.storage.jinglve4.add(target);
            player.chooseButton(['选择一张牌作为「死士」', target.getCards('h')], true)
                .set('ai', function(button) {
                var target = _status.event.getParent()
                    .target;
                var card = button.link;
                var val = target.getUseValue(card);
                if (val > 0) return val;
                return get.value(card);
            });
            'step 1'
            if (result.bool) {
                var gg = ' ';
                if (player == game.me || player.isUnderControl()) {
                    var xx = get.translation(result.links[0].name)
                        .slice(0, 2);
                    var cc = get.translation(get.suit(result.links[0]));
                    var zz = get.number(result.links[0]);
                    if (zz == undefined) zz = '';
                    else {
                        if ([1, 11, 12, 13].contains(zz)) {
                            zz = {
                                '1': 'A',
                                '11': 'J',
                                '12': 'Q',
                                '13': 'K'
                            }[zz];
                        }
                    }
                    var gg = cc + zz + xx;
                }
                target.storage.jinglve_mark = '';
                target.addSkill("jinglve_mark");
                target.markSkill("jinglve_mark", '', '死士 ' + gg);
                player.storage.jinglve2 = target;
                player.storage.jinglve3 = result.links[0];
                player.addSkill('jinglve2');
            }
        },
        ai: {
            order: 12,
            result: {
                target: -1,
            },
        },
        subSkill: {
            mark: {
                intro: {
                    name: '死士',
                },
                sub: true,
            },
        },
    }
    lib.skill.jinglve2 = {
        mark: true,
        intro: {
            name: "死士",
            mark: function(dialog, content, player) {
                dialog.addText('记录目标');
                dialog.add([content]);
                if (player == game.me || player.isUnderControl()) {
                    dialog.addText('死士牌');
                    dialog.add([player.storage.jinglve3]);
                }
            },
        },
        onremove: function(player) {
            player.storage.jinglve2.unmarkSkill('jinglve_mark');
            delete player.storage.jinglve2;
            delete player.storage.jinglve3;
        },
        trigger: {
            global: ["dieEnd", "loseEnd", "gainEnd"],
        },
        silent: true,
        lastDo: true,
        charlotte: true,
        filter: function(event, player) {
            if (event.name != 'gain' && event.player != player.storage.jinglve2) return false;
            return event.name == 'die' || (event.cards.contains(player.storage.jinglve3) && (event.name == 'gain' || event.position != ui.ordering && event.position != ui.discardPile));
        },
        content: function() {
            'step 0'
            player.storage.jinglve2.removeSkill('jinglve_mark');
            'step 1'
            player.removeSkill('jinglve2');
        },
        group: "jinglve3",
        forced: true,
        popup: false,
    }
    lib.skill.jinglve3 = {
        audio: "jinglve",
        trigger: {
            global: ["loseAfter", "useCard", "phaseAfter", "cardsDiscardAfter"],
        },
        filter: function(event, player) {
            if (event.player && event.player != player.storage.jinglve2) return false;
            if (event.name == 'phase') return event.player.getCards('hej')
                .contains(player.storage.jinglve3);
            if (!event.cards.contains(player.storage.jinglve3)) return false;
            return event.name == 'useCard' || get.position(player.storage.jinglve3, true) == 'd' || event.position == ui.discardPile;
        },
        forced: true,
        charlotte: true,
        logTarget: "player",
        content: function() {
            if (trigger.name == 'useCard') {
                trigger.all_excluded = true;
                trigger.targets.length = 0;
            } else {
                if (trigger.name == 'phase') {
                    player.gain(player.storage.jinglve3, trigger.player, 'giveAuto');
                } else if (get.position(player.storage.jinglve3, true) == 'd') player.gain(player.storage.jinglve3, 'gain2');
            }
            player.removeSkill('jinglve2');
        },
    }
    lib.skill.rezhoufu = {
        audio: "zhoufu",
        enable: "phaseUse",
        usable: 1,
        filter: function(event, player) {
            return player.countCards('he') > 0;
        },
        filterCard: true,
        filterTarget: function(card, player, target) {
            return target != player && !target.getExpansions('rezhoufu2')
                .length;
        },
        check: function(card) {
            return 6 - get.value(card)
        },
        position: "he",
        discard: false,
        lose: false,
        delay: false,
        content: function() {
            if (!target.storage.rezhoufu2_markcount) target.storage.rezhoufu2_markcount = 0;
            target.addToExpansion(cards, player, 'give')
                .gaintag.add('rezhoufu2');
            var cc = get.suit(cards, player, 'give');
            var xx = get.translation(cc);
            target.storage.rezhoufu2 = '';
            target.addSkill("rezhoufu2");
            target.markSkill("rezhoufu2", '', '咒缚 ' + xx);
        },
        ai: {
            order: 1,
            result: {
                target: -1,
            },
        },
        group: ["rezhoufu_judge", "rezhoufu_losehp"],
        subSkill: {
            judge: {
                audio: "zhoufu",
                trigger: {
                    global: "judgeBefore",
                },
                forced: true,
                filter: function(event, player) {
                    return !event.directresult && event.player.getExpansions('rezhoufu2')
                        .length;
                },
                logTarget: "player",
                content: function() {
                    var cards = [trigger.player.getExpansions('rezhoufu2')[0]];
                    trigger.directresult = cards[0];
                    trigger.player.unmarkSkill("rezhoufu2");
                },
                sub: true,
            },
            losehp: {
                audio: "zhoufu",
                trigger: {
                    global: "phaseEnd",
                },
                forced: true,
                filter: function(event, player) {
                    return game.hasPlayer(function(current) {
                        return current.hasHistory('lose', function(evt) {
                            if (!evt || !evt.xs || !evt.xs.length) return false;
                            for (var i in evt.gaintag_map) {
                                if (evt.gaintag_map[i].contains('rezhoufu2')) return true;
                            }
                            return false;
                        });
                    });
                },
                logTarget: function(current) {
                    return game.filterPlayer(function(current) {
                        return current.hasHistory('lose', function(evt) {
                            if (!evt || !evt.xs || !evt.xs.length) return false;
                            for (var i in evt.gaintag_map) {
                                if (evt.gaintag_map[i].contains('rezhoufu2')) return true;
                            }
                            return false;
                        });
                    })
                        .sortBySeat();
                },
                content: function() {
                    var targets = game.filterPlayer(function(current) {
                        return current.hasHistory('lose', function(evt) {
                            if (!evt || !evt.xs || !evt.xs.length) return false;
                            for (var i in evt.gaintag_map) {
                                if (evt.gaintag_map[i].contains('rezhoufu2')) return true;
                            }
                            return false;
                        });
                    })
                        .sortBySeat();
                    while (targets.length) {
                        targets.shift()
                            .loseHp();
                    }
                },
                sub: true,
            },
        },
    }
    lib.skill.xinzhoufu = {
        audio: "zhoufu",
        enable: "phaseUse",
        usable: 1,
        filter: function(event, player) {
            return player.countCards('he') > 0;
        },
        filterCard: true,
        filterTarget: function(card, player, target) {
            return target != player && !target.getExpansions('xinzhoufu2')
                .length;
        },
        check: function(card) {
            return 6 - get.value(card)
        },
        position: "he",
        discard: false,
        lose: false,
        delay: false,
        content: function() {
            target.addToExpansion(cards, player, 'give')
                .gaintag.add('xinzhoufu2');
            var cc = get.suit(cards, player, 'give');
            var xx = get.translation(cc);
            target.storage.xinzhoufu2 = '';
            target.addSkill("xinzhoufu2");
            target.markSkill("xinzhoufu2", '', '咒缚 ' + xx);
        },
        ai: {
            order: 9,
            result: {
                target: function(player, target) {
                    if (player.inRange(target)) return -1.3;
                    return -1;
                },
            },
        },
        group: ["xinzhoufu_judge"],
        subSkill: {
            judge: {
                audio: "zhoufu",
                trigger: {
                    global: "judgeBefore",
                },
                forced: true,
                filter: function(event, player) {
                    return !event.directresult && event.player.getExpansions('xinzhoufu2')
                        .length;
                },
                logTarget: "player",
                content: function() {
                    var cards = [trigger.player.getExpansions('xinzhoufu2')[0]];
                    trigger.directresult = cards[0];
                },
                sub: true,
            },
        },
    }
    lib.skill.zhuitao = {
        audio: 2,
        direct: true,
        locked: false,
        trigger: {
            player: "phaseZhunbeiBegin",
        },
        filter: function(event, player) {
            var storage = player.getStorage('zhuitao');
            return game.hasPlayer(function(current) {
                return current != player && !storage.contains(current);
            });
        },
        content: function() {
            'step 0'
            player.chooseTarget(get.prompt('zhuitao'), '令自己至一名其他角色的距离-1', function(card, player, target) {
                return target != player && !player.getStorage('zhuitao')
                    .contains(target);
            })
                .set('ai', function(target) {
                var player = _status.event.player;
                var att = get.attitude(player, target);
                if (att < 0 && get.distance(player, target) == 2) return 100;
                return get.distance(player, target) * (1 - get.sgn(att) / 3);
            });
            'step 1'
            if (result.bool) {
                player.logSkill('zhuitao', result.targets[0]);
                player.markAuto('zhuitao', result.targets);
                var target = result.targets[0];
                target.addSkill('zhuitao_c')
                game.delayx();
            }
        },
        mod: {
            globalFrom: function(player, target, distance) {
                if (player.getStorage('zhuitao')
                    .contains(target)) return distance - 1;
            },
        },
        group: "zhuitao_remove",
        subSkill: {
            c: {
                mark: true,
                marktext: "追讨",
                intro: {},
                sub: true,
            },
            remove: {
                audio: "zhuitao",
                trigger: {
                    source: "damageSource",
                },
                forced: true,
                filter: function(event, player) {
                    return player.getStorage('zhuitao')
                        .contains(event.player);
                    if (target.hasSkill('zhuitao_c')) return true;
                },
                logTarget: "player",
                content: function() {
                    player.unmarkAuto('zhuitao', [trigger.player]);
                    var target = trigger.player;
                    if (target.hasSkill('zhuitao_c')) target.removeSkill('zhuitao_c');
                },
                sub: true,
            },
        },
    }
    lib.skill.decadejingce = {
        audio: 2,
        trigger: {
            player: "phaseJieshuBegin",
        },
        frequent: true,
        filter: function(event, player) {
            return player.getHistory('useCard')
                .length >= player.hp;
        },
        content: function() {
            'step 0'
            var list = [],
                history = player.getHistory('useCard');
            for (var i of history) {
                list.add(get.suit(i.card));
                if (list.length >= player.hp) break;
            }
            if (list.length >= player.hp) event.goon = true;
            else player.chooseControl('摸牌阶段', '出牌阶段')
                .set('prompt', '精策：选择要执行的额外阶段');
            'step 1'
            if (event.goon || result.index == 0) {
                var next = player.phaseDraw();
                event.next.remove(next);
                trigger.getParent()
                    .next.push(next);
                player.unmarkSkill('decadejingce1_mark');
                player.removeSkill('decadejingce1_xg');
                player.unmarkSkill('decadejingce1_xg');
            }
            if (event.goon || result.index == 1) {
                var next = player.phaseUse();
                event.next.remove(next);
                trigger.getParent()
                    .next.push(next);
                player.unmarkSkill('decadejingce1_mark');
                player.removeSkill('decadejingce1_xg');
                player.unmarkSkill('decadejingce1_xg');
                player.addMark('decadejingce', 1, false)
            }
        },
        group: ['decadejingce1'],
    }
    lib.skill.decadejingce1 = {
        trigger: {
            player: 'useCard2',
        },
        forced: true,
        audio: false,
        filter: function(event, player) {
            if (event.name == 'phase') return true;
            if (player != _status.currentPhase) return false;
            return true;
        },
        content: function() {
            if (player.countMark('decadejingce') == 0) {
                player.addTempSkill("decadejingce1_xg");
                player.addMark("decadejingce1_xg")
            }
            player.addTempSkill("decadejingce1_mark");
            if (!player.storage.decadejingce1_mark1) player.storage.decadejingce1_mark1 = [];
            player.storage.decadejingce1_mark1.add(get.suit(trigger.card));
            var str = player.storage.decadejingce1_mark1.sortBySuit()
                .join('');
            var cc = get.suit(trigger.card);
            /*     if (player.storage.decadejingce1_mark1.contains('heart')) str += '♥️️';
            if (player.storage.decadejingce1_mark1.contains('diamond')) str += '♦️️';
            if (player.storage.decadejingce1_mark1.contains('spade')) str += '♠️️';
            if (player.storage.decadejingce1_mark1.contains('club')) str += '♣️️';*/
            player.storage.decadejingce1_mark = '';
            if (player.countMark('decadejingce') == 0) {
                player.addMark("decadejingce1_mark", str);
            }
        },
        subSkill: {
            mark: {
                marktext: '精策',
                intro: {
                    name: '精策',
                },
                onremove: function(player) {
                    player.removeMark('decadejingce1_mark1');
                    player.removeMark('decadejingce1_xg');
                    delete player.storage.decadejingce1_mark1;
                    delete player.storage.decadejingce1_xg;
                    delete player.storage.decadejingce;
                },
            },
            xg: {
                marktext: '精策',
                intro: {
                    name: '精策',
                },
                onremove: function(player) {
                    player.removeMark('decadejingce1_mark1');
                    player.removeMark('decadejingce1_xg');
                    delete player.storage.decadejingce1_mark1;
                    delete player.storage.decadejingce1_xg;
                    delete player.storage.decadejingce;
                },
                sub: true,
            },
        },
    };
    lib.skill.fengjie = {
        audio: 2,
        trigger: {
            player: "phaseZhunbeiBegin",
        },
        forced: true,
        filter: function(event, player) {
            return game.hasPlayer((current) => (current != player));
        },
        content: function() {
            'step 0'
            player.chooseTarget('请选择【奉节】的目标', '选择一名其他角色并获得如下效果直到你下回合开始：一名角色的结束阶段开始时，你将手牌摸至（至多摸至四张）或弃置至与其体力值相等。', lib.filter.notMe, true)
                .set('ai', function(target) {
                return (target.hp - player.countCards('h')) / get.threaten(target);
            });
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                player.line(target, 'green');
                game.log(player, '选择了', target);
                player.storage.fengjie2 = target;
                player.addTempSkill('fengjie2', {
                    player: 'phaseBegin'
                });
                game.delayx();
                player.storage.fengjie_mark = '';
                player.addTempSkill("fengjie_mark", {
                    player: 'phaseBegin'
                });
                player.markSkill("fengjie_mark", '', '奉节 ' + get.translation(target));
            }
        },
        subSkill: {
            mark: {
                intro: {},
                sub: true,
            },
        },
    }
    lib.skill.xingbu = {
        audio: 2,
        trigger: {
            player: "phaseJieshuBegin",
        },
        "prompt2": "展示牌堆顶的三张牌，并根据其中红色牌的数量，令一名其他角色获得一种效果",
        check: function(event, player) {
            return game.hasPlayer(function(current) {
                return current != player && get.attitude(player, current) > 0;
            });
        },
        content: function() {
            'step 0'
            var cards = get.cards(3);
            for (var i = cards.length - 1; i--; i >= 0) {
                ui.cardPile.insertBefore(cards[i], ui.cardPile.firstChild);
            }
            game.updateRoundNumber();
            event.cards = cards;
            //game.cardsGotoOrdering(cards);
            player.showCards(cards, get.translation(player) + '发动了【星卜】');
            'step 1'
            var num = 0;
            for (var i of cards) {
                if (get.color(i, false) == 'red') num++;
            }
            player.chooseTarget('选择一名其他角色获得星卜效果（' + get.cnNumber(num) + '张）', lib.filter.notMe, true)
                .set('ai', function(target) {
                var player = _status.event.player,
                    num = _status.event.getParent()
                        .num;
                var att = get.attitude(player, target);
                if (num < 3) att *= (-1);
                if (num == 2 && target.hasJudge('lebu')) att *= (-1.4);
                return att;
            });
            if (num == 0) num = 1;
            event.num = num;
            'step 2'
            if (result.bool) {
                var skill = 'xingbu_effect' + num,
                    target = result.targets[0];
                player.line(target, 'green');
                game.log(player, '选择了', target);
                target.addTempSkill(skill, {
                    player: 'phaseEnd'
                });
                target.addMark(skill, 1, false);
                game.delayx();
            }
        },
        subSkill: {
            "effect1": {
                charlotte: true,
                onremove: true,
                marktext: "星卜 荧惑守心",
                intro: {
                    content: "准备阶段开始时弃置#张手牌",
                },
                trigger: {
                    player: "phaseZhunbeiBegin",
                },
                forced: true,
                filter: function(event, player) {
                    return player.countCards('h') > 0;
                },
                content: function() {
                    player.chooseToDiscard('h', true, player.countMark('xingbu_effect1'));
                },
                sub: true,
            },
            "effect2": {
                charlotte: true,
                onremove: true,
                marktext: "星卜 白虹贯日",
                intro: {
                    content: "使用【杀】的次数上限-#，跳过弃牌阶段",
                },
                mod: {
                    cardUsable: function(card, player, num) {
                        if (card.name == 'sha') return num - player.countMark('xingbu_effect2');
                    },
                },
                trigger: {
                    player: "phaseDiscardBegin",
                },
                forced: true,
                content: function() {
                    trigger.cancel();
                },
                sub: true,
            },
            "effect3": {
                charlotte: true,
                onremove: true,
                marktext: "星卜 五星连珠",
                intro: {
                    content: "摸牌阶段多摸2*#张牌，使用【杀】的次数上限+#。",
                },
                trigger: {
                    player: ["phaseDrawBegin2"],
                },
                forced: true,
                filter: function(event, player) {
                    return !event.numFixed;
                },
                content: function() {
                    if (trigger.name == 'phaseDraw') trigger.num += (player.countMark('xingbu_effect3') * 2);
                },
                mod: {
                    cardUsable: function(card, player, num) {
                        if (card.name == 'sha') return num + player.countMark('xingbu_effect3');
                    },
                },
                sub: true,
            },
        },
    }
    lib.skill.xuezhao = {
        enable: "phaseUse",
        usable: 1,
        filter: function(event, player) {
            return player.maxHp > 0 && player.countCards('h') > 0;
        },
        filterCard: true,
        position: "h",
        filterTarget: function(card, player, target) {
            return player != target;
        },
        selectTarget: function() {
            return [1, _status.event.player.maxHp];
        },
        check: function(card) {
            return 2 * (_status.event.player.maxHp + 2) - get.value(card);
        },
        content: function() {
            'step 0'
            if (!target.countCards('he')) event._result = {
                bool: false
            };
            else target.chooseCard('he', '交给' + get.translation(player) + '一张牌并摸一张牌，或不能响应其使用的牌直到回合结束')
                .set('ai', function(card) {
                var player = _status.event.player,
                    target = _status.event.getParent()
                        .player,
                    val = get.value(card);
                if (get.attitude(player, target) > 0) {
                    if (get.name(card, target) == 'sha' && target.hasValueTarget(card)) return 30 - val;
                    return 20 - val;
                }
                return -val;
            });
            'step 1'
            if (result.bool) {
                player.addTempSkill('xuezhao_sha');
                player.addMark('xuezhao_sha', 1, false);
                player.gain(result.cards, target, 'giveAuto');
                target.draw();
            } else {
                player.addTempSkill('xuezhao_hit');
                target.addTempSkill('xuezhao_mark');
                player.markAuto('xuezhao_hit', [target]);
            }
        },
        ai: {
            threaten: 2.4,
            order: 3.6,
            result: {
                player: function(player, target) {
                    if (get.attitude(target, player) > 0) {
                        if (target.countCards('e', function(card) {
                            return get.value(card, target) < 0;
                        })) return 3;
                        return Math.sqrt(target.countCards('he'));
                    }
                    if (target.mayHaveShan() && player.countCards('hs', function(card) {
                        return !ui.selected.cards.contains(card) && get.name(card) == 'sha' && player.canUse(card, target) && get.effect(target, card, player, player) != 0;
                    })) return -Math.sqrt(Math.abs(get.attitude(player, target))) / 2;
                    return 0.1;
                },
            },
        },
        subSkill: {
            mark: {
                mark: true,
                marktext: "血昭 不可响应",
                intro: {},
                sub: true,
            },
            sha: {
                charlotte: true,
                onremove: true,
                marktext: "血昭 次数+",
                intro: {
                    content: "多杀#刀，誓诛曹贼！",
                },
                mod: {
                    cardUsable: function(card, player, num) {
                        if (card.name == 'sha') return num + player.countMark('xuezhao_sha');
                    },
                },
                sub: true,
            },
            hit: {
                charlotte: true,
                onremove: true,
                // marktext:"诏",
                // intro:{
                // content:"$篡汉，其心可诛！",
                // },
                trigger: {
                    player: "useCard1",
                },
                forced: true,
                popup: false,
                content: function() {
                    trigger.directHit.addArray(player.getStorage('xuezhao_hit'));
                },
                ai: {
                    "directHit_ai": true,
                    skillTagFilter: function(player, tag, arg) {
                        return player.getStorage('xuezhao_hit')
                            .contains(arg.target);
                    },
                },
                sub: true,
            },
        },
    }
    lib.skill.guowu = {
        trigger: {
            player: "phaseUseBegin",
        },
        filter: function(event, player) {
            return player.countCards('h') > 0;
        },
        preHidden: true,
        content: function() {
            'step 0'
            var hs = player.getCards('h');
            player.showCards(hs, get.translation(player) + '发动了【帼舞】');
            var list = [];
            for (var i of hs) {
                list.add(get.type2(i, player));
                if (list.length >= 3) break;
            }
            if (list.length >= 1) {
                var card = get.discardPile(function(i) {
                    return i.name == 'sha';
                });
                if (card) player.gain(card, 'gain2');
            }
            if (list.length >= 2) player.addTempSkill('guowu_dist', 'phaseUseAfter');
            if (list.length >= 3) player.addTempSkill('guowu_add', 'phaseUseAfter');
            player.addTempSkill('guowu_mark', 'phaseUseAfter');
            player.addMark("guowu_mark", list.length)
        },
        subSkill: {
            mark: {
                intro: {},
                onremove: function(player) {
                    delete player.storage.guowu_mark;
                },
                sub: true,
            },
            dist: {
                charlotte: true,
                mod: {
                    targetInRange: () => true,
                },
                sub: true,
            },
            add: {
                charlotte: true,
                trigger: {
                    player: "useCard1",
                },
                direct: true,
                filter: function(event, player) {
                    var info = get.info(event.card, false);
                    if (info.allowMultiple == false) return false;
                    //if (event.card.name != 'sha' && info.type != 'trick') return false;
					if (event.card.name!='sha'&&(info.type!='trick'||get.mode()=='guozhan')) return false;
                    if (event.targets && !info.multitarget) {
                        if (game.hasPlayer(function(current) {
                            return !event.targets.contains(current) && lib.filter.targetEnabled2(event.card, player, current) && lib.filter.targetInRange(event.card, player, current);
                        })) {
                            return true;
                        }
                    }
                    return false;
                },
                content: function() {
                    'step 0'
                    var num = game.countPlayer(function(current) {
                        return !trigger.targets.contains(current) && lib.filter.targetEnabled2(trigger.card, player, current) && lib.filter.targetInRange(trigger.card, player, current);
                    });
                    player.chooseTarget('帼舞：是否为' + get.translation(trigger.card) + '增加' + (num > 1 ? '至多两个' : '一个') + '目标？', [1, Math.min(2, num)], function(card, player, target) {
                        var trigger = _status.event.getTrigger();
                        var card = trigger.card;
                        return !trigger.targets.contains(target) && lib.filter.targetEnabled2(card, player, target) && lib.filter.targetInRange(card, player, target);
                    })
                        .set('ai', function(target) {
                        var player = _status.event.player;
                        var card = _status.event.getTrigger()
                            .card;
                        return get.effect(target, card, player, player);
                    });
                    'step 1'
                    if (result.bool) {
                        if (player != game.me && !player.isOnline()) game.delayx();
                    } else event.finish();
                    'step 2'
                    var targets = result.targets.sortBySeat();
                    player.logSkill('guowu_add', targets);
                    trigger.targets.addArray(targets);
                    if (get.mode() == 'guozhan') player.removeSkill('guowu_add');
                },
                sub: true,
            },
        },
    }
    lib.skill.xinfu_daigong = {
        usable: 1,
        audio: 2,
        trigger: {
            player: "damageBegin4",
        },
        filter: function(event, player) {
            return event.source != undefined && player.countCards('h') > 0;
        },
        content: function() {
            'step 0'
            player.showHandcards();
            player.unmarkSkill('xinfu_daigong1_mark');
            'step 1'
            var cards = player.getCards('h');
            var suits = [];
            for (var i = 0; i < cards.length; i++) {
                suits.add(get.suit(cards[i]));
            }
            trigger.source.chooseCard('he', '交给' + get.translation(player) + '一张满足条件的牌，否则防止此伤害。', function(card) {
                return !_status.event.suits.contains(get.suit(card));
            })
                .set('suits', suits)
                .ai = function(card) {
                var player = _status.event.player;
                var target = _status.event.getParent('xinfu_daigong')
                    .player;
                if (get.damageEffect(target, player, player) > 0) return 6.5 - get.value(card);
                return 0;
            };
            'step 2'
            if (result.bool) {
                trigger.source.give(result.cards, player, true);
            } else trigger.cancel();
        },
        group: ["xinfu_daigong1"],
    }
    lib.skill.xinfu_daigong1 = {
        trigger: {
            global: "phaseZhunbeiBegin",
        },
        forced: true,
        audio: false,
        content: function() {
            player.addSkill("xinfu_daigong1_mark");
            player.markSkill("xinfu_daigong1_mark");
        },
        subSkill: {
            mark: {
                marktext: "怠攻",
                mark: true,
                intro: {
                    name: '怠攻',
                },
                sub: true,
            },
        },
    };
    lib.skill.bingqing = {
        audio: 2,
        trigger: {
            player: "useCardAfter",
        },
        direct: true,
        filter: function(event, player) {
            var suit = get.suit(event.card);
            if (!lib.suit.contains(suit)) return false;
            var evt = event.getParent('phaseUse');
            if (!evt || player != evt.player) return false;
            var list = [],
                history = player.getHistory('useCard');
            if (history.length < 2) return false;
            for (var i of history) {
                if (i.getParent('phaseUse') != evt) continue;
                var suit2 = get.suit(i.card);
                if (!lib.suit.contains(suit2)) continue;
                if (i != event && suit2 == suit) return false;
                list.add(suit2);
            }
            return list.length > 1 && list.length < 5;
        },
        content: function() {
            'step 0'
            var suit = get.suit(trigger.card);
            var evt = event.getParent('phaseUse');
            var list = [],
                history = player.getHistory('useCard');
            for (var i of history) {
                if (i.getParent('phaseUse') != evt) continue;
                var suit2 = get.suit(i.card);
                if (!lib.suit.contains(suit2)) continue;
                list.add(suit2);
            };
            var prompt, filterTarget, ai;
            switch (list.length) {
                case 2:
                    prompt = '令一名角色摸两张牌';
                    filterTarget = function(card, player, target) {
                        return true;
                    };
                    ai = function(target) {
                        var player = _status.event.player;
                        var att = get.attitude(player, target);
                        if (target.hasSkill('nogain')) att /= 10;
                        return att / Math.sqrt(Math.min(5, 1 + target.countCards('h')));
                    }
                    break;
                case 3:
                    prompt = '弃置一名角色区域内的一张牌';
                    filterTarget = function(card, player, target) {
                        return target.hasCard(function(card) {
                            return lib.filter.canBeDiscarded(card, player, target);
                        }, 'hej');
                    };
                    ai = function(target) {
                        var player = _status.event.player;
                        return get.effect(target, {
                            name: 'guohe_copy'
                        }, player, player);
                    }
                    break;
                case 4:
                    prompt = '对一名其他角色造成1点伤害';
                    filterTarget = function(card, player, target) {
                        return target != player;
                    };
                    ai = function(target) {
                        var player = _status.event.player;
                        return get.damageEffect(target, player, player);
                    }
                    break;
                default:
                    event.finish();
                    return;
            }
            event.num = list.length;
            player.chooseTarget(get.prompt('bingqing'), prompt, filterTarget)
                .set('ai', ai);
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                player.logSkill('bingqing', target);
                event.target = target;
                event.goto(num);
            } else event.finish();
            'step 2'
            target.draw(2);
            event.finish();
            'step 3'
            player.discardPlayerCard(target, true, 'hej');
            event.finish();
            'step 4'
            target.damage();
        },
        group: ["bingqing1"],
    };
    lib.skill.bingqing1 = {
        trigger: {
            player: 'useCard2',
        },
        forced: true,
        audio: false,
        filter: function(event, player) {
            //  if (event.name == 'phaseUse') return true;
            var evt = event.getParent('phaseUse');
            if (evt.player == player) return true
            //  if (player != _status.currentPhase) return false; return true;
        },
        content: function() {
            player.addTempSkill("bingqing1_mark");
            if (!player.storage.bingqing1_mark1) player.storage.bingqing1_mark1 = [];
            player.storage.bingqing1_mark1.add(get.suit(trigger.card));
            var str = player.storage.bingqing1_mark1.sortBySuit()
                .join('');
            var cc = get.suit(trigger.card);
            /*   if (player.storage.bingqing1_mark1.contains('heart')) str += '♥️️';
            if (player.storage.bingqing1_mark1.contains('diamond')) str += '♦️️';
            if (player.storage.bingqing1_mark1.contains('spade')) str += '♠️️';
            if (player.storage.bingqing1_mark1.contains('club')) str += '♣️️';*/
            player.storage.bingqing1_mark = '';
            player.addMark("bingqing1_mark", str);
        },
        subSkill: {
            mark: {
                marktext: '秉清',
                intro: {
                    name: '秉清',
                },
                onremove: function(player) {
                    player.removeMark('bingqing1_mark1');
                    delete player.storage.bingqing1_mark1;
                },
            },
        },
    };
    lib.skill.remeibu = {
        audio: "meibu",
        trigger: {
            global: "phaseUseBegin",
        },
        filter: function(event, player) {
            return event.player != player && event.player.isAlive() && event.player.inRange(player) && player.countCards('he') > 0;
        },
        direct: true,
        derivation: ["rezhixi"],
        checkx: function(event, player) {
            if (get.attitude(player, event.player) >= 0) return false;
            return event.player.countCards('h') > event.player.hp;
        },
        content: function() {
            "step 0"
            var check = lib.skill.new_meibu.checkx(trigger, player);
            player.chooseToDiscard(get.prompt2('remeibu', trigger.player), 'he')
                .set('ai', function(card) {
                if (_status.event.check) return 6 - get.value(card);
                return 0;
            })
                .set('check', check)
                .set('logSkill', ['remeibu', trigger.player]);
            "step 1"
            if (result.bool) {
                var target = trigger.player;
                var card = result.cards[0];
                player.line(target, 'green');
                player.markAuto('remeibu_gain', [get.suit(card, player)]);
                player.addTempSkill('remeibu_gain');
                target.addTempSkill('rezhixi', 'phaseUseEnd');
                var suit = get.suit(card);
                var cc = get.translation(suit);
                target.storage.remeibu_mark = '';
                target.addTempSkill("remeibu_mark");
                target.addMark("remeibu_mark", cc);
            }
        },
        ai: {
            expose: 0.2,
        },
        subSkill: {
            mark: {
                intro: {},
                sub: true,
            },
            gain: {
                trigger: {
                    global: "loseAfter",
                },
                forced: true,
                charlotte: true,
                popup: false,
                onremove: true,
                filter: function(event, player) {
                    return event.getParent(3)
                        .name == 'rezhixi' && player.getStorage('remeibu_gain')
                        .contains(get.suit(event.cards[0], event.player)) && get.position(event.cards[0]) == 'd';
                },
                content: function() {
                    player.gain(trigger.cards[0], 'gain2');
                },
                sub: true,
            },
        },
    }
    lib.skill.olhaoshi = {
        trigger: {
            player: "phaseDrawBegin2",
        },
        filter: function(event, player) {
            return !event.numFixed;
        },
        check: function(event, player) {
            return (player.countCards('h') + 2 + event.num) <= 5 || game.hasPlayer(function(target) {
                return !game.hasPlayer(function(current) {
                    return current != player && current != target && current.countCards('h') < target.countCards('h');
                    player.unmarkSkill('olhaoshi_mark');
                }) && get.attitude(player, target) > 0;
            });
        },
        content: function() {
            trigger.num += 2;
            player.addTempSkill('olhaoshi_give', 'phaseDrawAfter');
        },
        subSkill: {
            mark: {
                intro: {},
                sub: true,
            },
            give: {
                trigger: {
                    player: "phaseDrawEnd",
                },
                forced: true,
                charlotte: true,
                popup: false,
                filter: function(event, player) {
                    return player.countCards('h') > 5;
                },
                content: function() {
                    'step 0'
                    var targets = game.filterPlayer(function(target) {
                        return target != player && !game.hasPlayer(function(current) {
                            return current != player && current != target && current.countCards('h') < target.countCards('h');
                        });
                    }),
                        num = Math.floor(player.countCards('h') / 2);
                    player.chooseCardTarget({
                        position: 'h',
                        filterCard: true,
                        filterTarget: function(card, player, target) {
                            return _status.event.targets.contains(target);
                        },
                        targets: targets,
                        selectTarget: targets.length == 1 ? -1 : 1,
                        selectCard: num,
                        prompt: '将' + get.cnNumber(num) + '张手牌交给一名手牌数最少的其他角色',
                        forced: true,
                        ai1: function(card) {
                            var goon = false,
                                player = _status.event.player;
                            for (var i of _status.event.targets) {
                                if (get.attitude(i, target) > 0 && get.attitude(target, i) > 0) goon = true;
                                break;
                            }
                            if (goon) {
                                if (!player.hasValueTarget(card) || card.name == 'sha' && player.countCards('h', function(cardx) {
                                    return cardx.name == 'sha' && !ui.selected.cards.contains(cardx);
                                }) > player.getCardUsable('sha')) return 2;
                                return Math.max(2, get.value(card) / 4);
                            }
                            return 1 / Math.max(1, get.value(card));
                        },
                        ai2: function(target) {
                            return get.attitude(_status.event.player, target);
                        },
                    });
                    'step 1'
                    if (result.bool) {
                        var target = result.targets[0];
                        player.line(target, 'green');
                        target.gain(result.cards, player, 'giveAuto');
                        player.markAuto('olhaoshi_help', [target]);
                        player.addTempSkill('olhaoshi_help', {
                            player: 'phaseBeginStart'
                        });
                        player.unmarkSkill('olhaoshi_mark');
                        player.storage.olhaoshi_mark = '';
                        player.addTempSkill("olhaoshi_mark", {
                            player: 'phaseBeginStart'
                        });
                        player.markSkill("olhaoshi_mark", '', '好施 ' + get.translation(target));
                    }
                },
                sub: true,
            },
            help: {
                trigger: {
                    target: "useCardToTargeted",
                },
                direct: true,
                charlotte: true,
                onremove: true,
                filter: function(event, player) {
                    if (!player.storage.olhaoshi_help || !player.storage.olhaoshi_help.length) return false;
                    if (event.card.name != 'sha' && get.type(event.card) != 'trick') return false;
                    for (var i of player.storage.olhaoshi_help) {
                        if (i.countCards('h') > 0) return true;
                    }
                    return false;
                },
                content: function() {
                    'step 0'
                    if (!event.targets) event.targets = player.storage.olhaoshi_help.slice(0)
                        .sortBySeat();
                    event.target = event.targets.shift();
                    event.target.chooseCard('h', '好施：是否将一张手牌交给' + get.translation(player) + '？')
                        .set('ai', function(card) {
                        var player = _status.event.player,
                            target = _status.event.getTrigger()
                                .player;
                        if (!_status.event.goon) {
                            if (get.value(card, player) < 0 || get.value(card, target) < 0) return 1;
                            return 0;
                        }
                        var cardx = _status.event.getTrigger()
                            .card;
                        if (card.name == 'shan' && get.tag(cardx, 'respondShan') && target.countCards('h', 'shan') < player.countCards('h', 'shan')) return 2;
                        if (card.name == 'sha' && (cardx.name == 'juedou' || get.tag(card, 'respondSha') && (target.countCards('h', 'sha') < player.countCards('h', 'sha')))) return 2;
                        if (get.value(card, target) > get.value(card, player) || target.getUseValue(card) > player.getUseValue(card)) return 1;
                        if (player.hasSkillTag('noh')) return 0.5 / Math.max(1, get.value(card, player));
                        return 0;
                    })
                        .set('goon', get.attitude(event.target, player) > 0);
                    'step 1'
                    if (result.bool) {
                        target.logSkill('olhaoshi_help', player);
                        player.gain(result.cards, target, 'giveAuto');
                    }
                    if (targets.length) event.goto(0);
                },
                sub: true,
            },
        },
    }
    lib.skill.decadexianzhen = {
        audio: 2,
        enable: "phaseUse",
        usable: 1,
        filterTarget: function(card, player, target) {
            return player.canCompare(target);
        },
        filter: function(event, player) {
            return player.countCards('h') > 0 && !player.hasSkill('decadexianzhen2') && !player.hasSkill('decadexianzhen3');
        },
        content: function() {
            "step 0"
            player.chooseToCompare(target);
            "step 1"
            if (result.bool) {
                player.storage.decadexianzhen2 = target;
                player.addTempSkill('decadexianzhen2');
                target.addTempSkill('decadexianzhen_mark')
            } else {
                player.addTempSkill('decadexianzhen3');
                player.addTempSkill('decadexianzhen_mark2');
            }
        },
        ai: {
            order: function(name, player) {
                var cards = player.getCards('h');
                if (player.countCards('h', 'sha') == 0) {
                    return 1;
                }
                for (var i = 0; i < cards.length; i++) {
                    if (cards[i].name != 'sha' && get.number(cards[i]) > 11 && get.value(cards[i]) < 7) {
                        return 9;
                    }
                }
                return get.order({
                    name: 'sha'
                }) - 1;
            },
            result: {
                player: function(player) {
                    if (player.countCards('h', 'sha') > 0) return 0;
                    var num = player.countCards('h');
                    if (num > player.hp) return 0;
                    if (num == 1) return -2;
                    if (num == 2) return -1;
                    return -0.7;
                },
                target: function(player, target) {
                    var num = target.countCards('h');
                    if (num == 1) return -1;
                    if (num == 2) return -0.7;
                    return -0.5
                },
            },
            threaten: 1.3,
        },
        subSkill: {
            mark: {
                marktext: "陷阵",
                mark: true,
                intro: {
                    name: "陷阵",
                    content: '你对其使用牌无次数限制和距离限制',
                },
                sub: true,
            },
            mark2: {
                marktext: "陷阵 没赢",
                mark: true,
                intro: {
                    name: "陷阵 没赢",
                    content: '不能使用牌',
                },
                sub: true,
            },
        },
    }
    lib.skill.xinxianzhen = {
        audio: "xianzhen",
        inherit: "xianzhen",
        enable: "phaseUse",
        usable: 1,
        filterTarget: function(card, player, target) {
            return player.canCompare(target);
        },
        filter: function(event, player) {
            return player.countCards('h') > 0;
        },
        content: function() {
            "step 0"
            player.chooseToCompare(target);
            "step 1"
            if (result.bool) {
                player.storage[event.name] = target;
                player.addTempSkill(event.name + 2);
                target.addTempSkill('xinxianzhen_mark')
            } else {
                player.addTempSkill(event.name + 3);
                player.addTempSkill('xinxianzhen_mark2');
            }
        },
        ai: {
            order: function(name, player) {
                var cards = player.getCards('h');
                if (player.countCards('h', 'sha') == 0) {
                    return 1;
                }
                for (var i = 0; i < cards.length; i++) {
                    if (cards[i].name != 'sha' && get.number(cards[i]) > 11 && get.value(cards[i]) < 7) {
                        return 9;
                    }
                }
                return get.order({
                    name: 'sha'
                }) - 1;
            },
            result: {
                player: function(player) {
                    if (player.countCards('h', 'sha') > 0) return 0;
                    var num = player.countCards('h');
                    if (num > player.hp) return 0;
                    if (num == 1) return -2;
                    if (num == 2) return -1;
                    return -0.7;
                },
                target: function(player, target) {
                    var num = target.countCards('h');
                    if (num == 1) return -1;
                    if (num == 2) return -0.7;
                    return -0.5
                },
            },
            threaten: 1.3,
        },
        subSkill: {
            mark: {
                marktext: "陷阵",
                mark: true,
                intro: {
                    name: "陷阵",
                    content: '你对其使用牌无次数限制和距离限制',
                },
                sub: true,
            },
            mark2: {
                marktext: "陷阵 没赢",
                mark: true,
                intro: {
                    name: "陷阵 没赢",
                    content: '不能使用牌',
                },
                sub: true,
            },
        },
    }
    lib.skill.rexianzhen = {
        audio: 2,
        enable: "phaseUse",
        usable: 1,
        filterTarget: function(card, player, target) {
            return player.canCompare(target);
        },
        filter: function(event, player) {
            return player.countCards('h') > 0;
        },
        content: function() {
            "step 0"
            player.chooseToCompare(target);
            "step 1"
            if (result.player && get.name(result.player, player) == 'sha') player.addTempSkill('rexianzhen4');
            if (result.bool) {
                player.storage[event.name] = target;
                player.addTempSkill(event.name + 2);
                target.addTempSkill('rexianzhen_mark')
            } else {
                player.addTempSkill(event.name + 3);
                player.addTempSkill('rexianzhen_mark2');
            }
        },
        ai: {
            order: function(name, player) {
                var cards = player.getCards('h');
                if (player.countCards('h', 'sha') == 0) {
                    return 1;
                }
                for (var i = 0; i < cards.length; i++) {
                    if (cards[i].name != 'sha' && get.number(cards[i]) > 11 && get.value(cards[i]) < 7) {
                        return 9;
                    }
                }
                return get.order({
                    name: 'sha'
                }) - 1;
            },
            result: {
                player: function(player) {
                    if (player.countCards('h', 'sha') > 0) return 0;
                    var num = player.countCards('h');
                    if (num > player.hp) return 0;
                    if (num == 1) return -2;
                    if (num == 2) return -1;
                    return -0.7;
                },
                target: function(player, target) {
                    var num = target.countCards('h');
                    if (num == 1) return -1;
                    if (num == 2) return -0.7;
                    return -0.5
                },
            },
            threaten: 1.3,
        },
        subSkill: {
            mark: {
                marktext: "陷阵",
                mark: true,
                intro: {
                    name: "陷阵",
                    content: '你对其使用牌无次数限制和距离限制',
                },
                sub: true,
            },
            mark2: {
                marktext: "陷阵 没赢",
                mark: true,
                intro: {
                    name: "陷阵 没赢",
                    content: '不能使用牌',
                },
                sub: true,
            },
        },
    }
    lib.skill.jiaozhao = {
        mod: {
            targetEnabled: function(card, player, target) {
                if (card.storage && card.storage.jiaozhao && card.storage.jiaozhao == target) return false;
            },
        },
        enable: "phaseUse",
        usable: 1,
        audio: 2,
        check: function(card) {
            return 8 - get.value(card);
        },
        filter: function(event, player) {
            return player.countMark('xindanxin') < 2 && player.countCards('h') > 0;
        },
        filterCard: true,
        discard: false,
        lose: false,
        delay: false,
        locked: false,
        content: function() {
            'step 0'
            player.showCards(cards);
            'step 1'
            if (player.countMark('xindanxin') > 1) {
                event.target = player;
            } else {
                var targets = game.filterPlayer();
                targets.remove(player);
                targets.sort(function(a, b) {
                    return Math.max(1, get.distance(player, a)) - Math.max(1, get.distance(player, b));
                });
                var distance = Math.max(1, get.distance(player, targets[0]));
                for (var i = 1; i < targets.length; i++) {
                    if (Math.max(1, get.distance(player, targets[i])) > distance) {
                        targets.splice(i);
                        break;
                    }
                }
                player.chooseTarget('请选择【矫诏】的目标', true, function(card, player, target) {
                    return _status.event.targets.contains(target);
                })
                    .set('ai', function(target) {
                    return get.attitude(_status.event.player, target);
                })
                    .set('targets', targets);
            }
            'step 2'
            if (!event.target) {
                event.target = result.targets[0];
                player.line(result.targets, 'green');
            }
            if (!event.target) {
                event.finish();
                return;
            }
            var list = [];
            for (var i = 0; i < lib.inpile.length; i++) {
                var name = lib.inpile[i];
                if (name == 'sha') {
                    list.push(['基本', '', 'sha']);
                    for (var j of lib.inpile_nature) list.push(['基本', '', 'sha', j]);
                } else if (get.type(name) == 'basic') list.push(['基本', '', name]);
                else if (player.countMark('xindanxin') > 0 && get.type(name) == 'trick') list.push(['锦囊', '', name]);
            }
            event.target.chooseButton(['矫诏', [list, 'vcard']], true)
                .set('ai', function(button) {
                var player = _status.event.getParent()
                    .player,
                    card = {
                        name: button.link[2],
                        nature: button.link[3],
                        storage: {
                            jiaozhao: player,
                        }
                    };
                return player.getUseValue(card, null, true) * _status.event.att;
            })
                .set('att', get.attitude(event.target, player) > 0 ? 1 : -1);
            'step 3'
            var chosen = result.links[0][2];
            var nature = result.links[0][3];
            var fakecard = {
                name: chosen,
                storage: {
                    jiaozhao: player
                },
            };
            if (nature) fakecard.nature = nature;
            event.target.showCards(game.createCard({
                name: chosen,
                nature: nature,
                suit: cards[0].suit,
                number: cards[0].number,
            }), get.translation(event.target) + '声明了' + get.translation(chosen));
            player.storage.jiaozhao = cards[0];
            player.storage.jiaozhao_card = fakecard;
            game.broadcastAll(function(name, card) {
                lib.skill.jiaozhao2.viewAs = fakecard;
                card.addGaintag('jiaozhao');
            }, fakecard, cards[0]);
            player.addTempSkill('jiaozhao2', 'phaseUseEnd');
            player.storage.jiaozhao_mark = '';
            player.addTempSkill("jiaozhao_mark");
            player.markSkill("jiaozhao_mark", '', '矫诏-' + get.translation(chosen));
        },
        ai: {
            order: 9,
            result: {
                player: 1,
            },
        },
        group: "jiaozhao3",
        subSkill: {
            mark: {
                intro: {},
                sub: true,
            },
        },
    }
    lib.skill.rejiaozhao = {
        audio: 2,
        enable: "phaseUse",
        group: "rejiaozhao_base",
        mod: {
            targetEnabled: function(card, player, target) {
                if (player == target && card.storage && card.storage.rejiaozhao) return false;
            },
        },
        filter: function(event, player) {
            return (player.hasMark('redanxin') && player.countCards('h') && player.getStorage('rejiaozhao_clear')
                .length < player.countMark('redanxin'));
        },
        chooseButton: {
            dialog: function(event, player) {
                var list = [],
                    storage = player.getStorage('rejiaozhao_clear');
                for (var name of lib.inpile) {
                    var type = get.type(name);
                    if ((type == 'basic' || type == 'trick') && !storage.contains(type)) {
                        list.push([type, '', name]);
                        if (name == 'sha') {
                            for (var nature of lib.inpile_nature) list.push([type, '', name, nature]);
                        }
                    }
                }
                return ui.create.dialog('惮心', [list, 'vcard']);
            },
            filter: function(button, player) {
                var card = {
                    name: button.link[2],
                    nature: button.link[3]
                };
                if (player.countMark('redanxin') < 2) card.storage = {
                    rejiaozhao: true
                };
                var evt = _status.event.getParent();
                return evt.filterCard(card, player, evt);
            },
            check: function(button) {
                var card = {
                    name: button.link[2],
                    nature: button.link[3]
                }, player = _status.event.player;
                if (player.countMark('redanxin') < 2) card.storage = {
                    rejiaozhao: true
                };
                return player.getUseValue(card, null, true);
            },
            backup: function(links, player) {
                var next = {
                    audio: 'redanxin',
                    viewAs: {
                        name: links[0][2],
                        nature: links[0][3]
                    },
                    filterCard: true,
                    position: 'h',
                    popname: true,
                    ai1: (card) => 8 - get.value(card),
                    onuse: function(result, player) {
                        player.addTempSkill('rejiaozhao_clear', 'phaseUseAfter');
                        player.markAuto('rejiaozhao_clear', [get.type(result.card)])
                    },
                }
                if (player.countMark('redanxin') < 2) next.viewAs.storage = {
                    rejiaozhao: true
                };
                return next;
            },
            prompt: function(links) {
                return '将一张手牌当做' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '使用';
            },
        },
        ai: {
            order: 6,
            result: {
                player: 1,
            },
        },
        derivation: ["rejiaozhao_lv2", "rejiaozhao_lv3"],
        subSkill: {
            clear: {
                onremove: true,
                sub: true,
            },
            base: {
                audio: "rejiaozhao",
                enable: "phaseUse",
                usable: 1,
                filter: function(event, player) {
                    if (player.hasMark('redanxin')) return false;
                    return player.countCards('h') > 0 && game.hasPlayer((current) => current != player);
                },
                filterCard: true,
                position: "h",
                discard: false,
                lose: false,
                check: function(card) {
                    return 1 / Math.max(1, _status.event.player.getUseValue(card));
                },
                prompt: "出牌阶段限一次。你可以展示一张手牌，并令一名距离你最近的角色选择一种基本牌或普通锦囊牌的牌名。你可将此牌当做其声明的牌使用直到此阶段结束（你不是此牌的合法目标）。",
                content: function() {
                    'step 0'
                    player.showCards(cards);
                    'step 1'
                    var targets = game.filterPlayer();
                    targets.remove(player);
                    targets.sort(function(a, b) {
                        return Math.max(1, get.distance(player, a)) - Math.max(1, get.distance(player, b));
                    });
                    var distance = Math.max(1, get.distance(player, targets[0]));
                    for (var i = 1; i < targets.length; i++) {
                        if (Math.max(1, get.distance(player, targets[i])) > distance) {
                            targets.splice(i);
                            break;
                        }
                    }
                    player.chooseTarget('请选择【矫诏】的目标', true, function(card, player, target) {
                        return _status.event.targets.contains(target);
                    })
                        .set('ai', function(target) {
                        return get.attitude(_status.event.player, target);
                    })
                        .set('targets', targets);
                    'step 2'
                    if (!result.bool) {
                        event.finish();
                        return;
                    }
                    var target = result.targets[0];
                    event.target = target;
                    var list = [];
                    for (var i = 0; i < lib.inpile.length; i++) {
                        var name = lib.inpile[i];
                        if (name == 'sha') {
                            list.push(['基本', '', 'sha']);
                            for (var j of lib.inpile_nature) list.push(['基本', '', 'sha', j]);
                        } else if (get.type(name) == 'basic') list.push(['基本', '', name]);
                        else if (get.type(name) == 'trick') list.push(['锦囊', '', name]);
                    }
                    target.chooseButton(['矫诏', [list, 'vcard']], true)
                        .set('ai', function(button) {
                        var player = _status.event.getParent()
                            .player,
                            card = {
                                name: button.link[2],
                                nature: button.link[3],
                                storage: {
                                    rejiaozhao: true,
                                }
                            };
                        return player.getUseValue(card, null, true) * _status.event.att;
                    })
                        .set('att', get.attitude(event.target, player) > 0 ? 1 : -1);
                    'step 3'
                    var chosen = result.links[0][2];
                    var nature = result.links[0][3];
                    var fakecard = {
                        name: chosen,
                        storage: {
                            rejiaozhao: true
                        },
                    };
                    if (nature) fakecard.nature = nature;
                    event.target.showCards(game.createCard({
                        name: chosen,
                        nature: nature,
                        suit: cards[0].suit,
                        number: cards[0].number,
                    }), get.translation(event.target) + '声明了' + get.translation(chosen));
                    player.storage.rejiaozhao_viewas = fakecard;
                    cards[0].addGaintag('rejiaozhao')
                    player.addTempSkill('rejiaozhao_viewas', 'phaseUseEnd');
                    var cc = get.translation(chosen);
                    player.storage.rejiaozhao_mark = '';
                    player.addTempSkill("rejiaozhao_mark");
                    player.markSkill("rejiaozhao_mark", '', '矫诏-' + cc);
                },
                ai: {
                    order: 9,
                    result: {
                        player: 1,
                    },
                },
                sub: true,
            },
            backup: {
                audio: "rejiaozhao",
                sub: true,
            },
            mark: {
                intro: {},
                sub: true,
            },
            viewas: {
                enable: "phaseUse",
                mod: {
                    targetEnabled: function(card, player, target) {
                        if (player == target && card.storage && card.storage.rejiaozhao) return false;
                    },
                },
                filter: function(event, player) {
                    if (!player.storage.rejiaozhao_viewas) return false;
                    var cards = player.getCards('h', function(card) {
                        return card.hasGaintag('rejiaozhao');
                    });
                    if (!cards.length) return false;
                    if (!game.checkMod(cards[0], player, 'unchanged', 'cardEnabled2', player)) return false;
                    var card = get.autoViewAs(player.storage.rejiaozhao_viewas, cards);
                    return event.filterCard(card, player, event);
                },
                viewAs: function(cards, player) {
                    return player.storage.rejiaozhao_viewas;
                },
                filterCard: function(card) {
                    return card.hasGaintag('rejiaozhao');
                },
                selectCard: -1,
                position: "h",
                popname: true,
                prompt: function() {
                    return '将“矫诏”牌当做' + get.translation(_status.event.player.storage.rejiaozhao_viewas) + '使用';
                },
                onremove: function(player) {
                    player.removeGaintag('rejiaozhao');
                    delete player.storage.rejiaozhao_viewas;
                },
                ai: {
                    order: 8,
                },
                sub: true,
            },
        },
    }
    lib.skill.olhaoshi = {
        trigger: {
            player: "phaseDrawBegin2",
        },
        filter: function(event, player) {
            return !event.numFixed;
        },
        check: function(event, player) {
            return (player.countCards('h') + 2 + event.num) <= 5 || game.hasPlayer(function(target) {
                return !game.hasPlayer(function(current) {
                    return current != player && current != target && current.countCards('h') < target.countCards('h');
                    player.unmarkSkill('olhaoshi_mark');
                }) && get.attitude(player, target) > 0;
            });
        },
        content: function() {
            trigger.num += 2;
            player.addTempSkill('olhaoshi_give', 'phaseDrawAfter');
        },
        subSkill: {
            mark: {
                intro: {},
                sub: true,
            },
            give: {
                trigger: {
                    player: "phaseDrawEnd",
                },
                forced: true,
                charlotte: true,
                popup: false,
                filter: function(event, player) {
                    return player.countCards('h') > 5;
                },
                content: function() {
                    'step 0'
                    var targets = game.filterPlayer(function(target) {
                        return target != player && !game.hasPlayer(function(current) {
                            return current != player && current != target && current.countCards('h') < target.countCards('h');
                        });
                    }),
                        num = Math.floor(player.countCards('h') / 2);
                    player.chooseCardTarget({
                        position: 'h',
                        filterCard: true,
                        filterTarget: function(card, player, target) {
                            return _status.event.targets.contains(target);
                        },
                        targets: targets,
                        selectTarget: targets.length == 1 ? -1 : 1,
                        selectCard: num,
                        prompt: '将' + get.cnNumber(num) + '张手牌交给一名手牌数最少的其他角色',
                        forced: true,
                        ai1: function(card) {
                            var goon = false,
                                player = _status.event.player;
                            for (var i of _status.event.targets) {
                                if (get.attitude(i, target) > 0 && get.attitude(target, i) > 0) goon = true;
                                break;
                            }
                            if (goon) {
                                if (!player.hasValueTarget(card) || card.name == 'sha' && player.countCards('h', function(cardx) {
                                    return cardx.name == 'sha' && !ui.selected.cards.contains(cardx);
                                }) > player.getCardUsable('sha')) return 2;
                                return Math.max(2, get.value(card) / 4);
                            }
                            return 1 / Math.max(1, get.value(card));
                        },
                        ai2: function(target) {
                            return get.attitude(_status.event.player, target);
                        },
                    });
                    'step 1'
                    if (result.bool) {
                        var target = result.targets[0];
                        player.line(target, 'green');
                        target.gain(result.cards, player, 'giveAuto');
                        player.markAuto('olhaoshi_help', [target]);
                        player.addTempSkill('olhaoshi_help', {
                            player: 'phaseBeginStart'
                        });
                        player.unmarkSkill('olhaoshi_mark');
                        player.storage.olhaoshi_mark = '';
                        player.addTempSkill("olhaoshi_mark", {
                            player: 'phaseBeginStart'
                        });
                        player.markSkill("olhaoshi_mark", '', '好施 ' + get.translation(target));
                    }
                },
                sub: true,
            },
            help: {
                trigger: {
                    target: "useCardToTargeted",
                },
                direct: true,
                charlotte: true,
                onremove: true,
                filter: function(event, player) {
                    if (!player.storage.olhaoshi_help || !player.storage.olhaoshi_help.length) return false;
                    if (event.card.name != 'sha' && get.type(event.card) != 'trick') return false;
                    for (var i of player.storage.olhaoshi_help) {
                        if (i.countCards('h') > 0) return true;
                    }
                    return false;
                },
                content: function() {
                    'step 0'
                    if (!event.targets) event.targets = player.storage.olhaoshi_help.slice(0)
                        .sortBySeat();
                    event.target = event.targets.shift();
                    event.target.chooseCard('h', '好施：是否将一张手牌交给' + get.translation(player) + '？')
                        .set('ai', function(card) {
                        var player = _status.event.player,
                            target = _status.event.getTrigger()
                                .player;
                        if (!_status.event.goon) {
                            if (get.value(card, player) < 0 || get.value(card, target) < 0) return 1;
                            return 0;
                        }
                        var cardx = _status.event.getTrigger()
                            .card;
                        if (card.name == 'shan' && get.tag(cardx, 'respondShan') && target.countCards('h', 'shan') < player.countCards('h', 'shan')) return 2;
                        if (card.name == 'sha' && (cardx.name == 'juedou' || get.tag(card, 'respondSha') && (target.countCards('h', 'sha') < player.countCards('h', 'sha')))) return 2;
                        if (get.value(card, target) > get.value(card, player) || target.getUseValue(card) > player.getUseValue(card)) return 1;
                        if (player.hasSkillTag('noh')) return 0.5 / Math.max(1, get.value(card, player));
                        return 0;
                    })
                        .set('goon', get.attitude(event.target, player) > 0);
                    'step 1'
                    if (result.bool) {
                        target.logSkill('olhaoshi_help', player);
                        player.gain(result.cards, target, 'giveAuto');
                    }
                    if (targets.length) event.goto(0);
                },
                sub: true,
            },
        },
    }
    lib.skill.dcjianying = {
        audio: 2,
        locked: false,
        mod: {
            aiOrder: function(player, card, num) {
                if (typeof card == 'object' && player.isPhaseUsing()) {
                    var evt = lib.skill.dcjianying.getLastUsed(player);
                    if (evt && evt.card && (get.suit(evt.card) && get.suit(evt.card) == get.suit(card) || evt.card.number && evt.card.number == get.number(card))) {
                        return num + 10;
                    }
                }
            },
        },
        trigger: {
            player: "useCard",
        },
        frequent: true,
        getLastUsed: function(player, event) {
            var history = player.getAllHistory('useCard');
            var index;
            if (event) index = history.indexOf(event) - 1;
            else index = history.length - 1;//怎么会-2呢？Helasisy修
            if (index >= 0) return history[index];
            return false;
        },
        filter: function(event, player) {
            var evt = lib.skill.dcjianying.getLastUsed(player, event);
            if (!evt || !evt.card) return false;
            return get.suit(evt.card) != 'none' && get.suit(evt.card) == get.suit(event.card) || typeof get.number(evt.card, false) == 'number' && get.number(evt.card, false) == get.number(event.card);
        },
        content: function() {
            player.draw();
        },
        group: "dcjianying2",
    }
    lib.skill.dcjianying2 = {
        trigger: {
            player: "useCard2",
        },
        forced: true,
        content: function() {
            var suit = get.suit(trigger.card, player);
            if (suit == undefined) suit = '无色';
            var number = get.number(trigger.card, player);
            if (number == undefined) number = '';
            else {
                if ([1, 11, 12, 13].contains(number)) {
                    number = {
                        '1': 'A',
                        '11': 'J',
                        '12': 'Q',
                        '13': 'K'
                    }[number];
                }
            }
            var cc = get.translation(suit) + number;
            player.storage.dcjianying2_mark = '';
            player.addSkill("dcjianying2_mark");
            player.addMark("dcjianying2_mark", cc);
        },
        subSkill: {
            mark: {
                marktext: "渐营",
                intro: {
                    name: '渐营'
                },
                sub: true,
            },
        },
    }
    //杨怡 狷狭
    lib.skill.oljuanxia = {
        trigger: {
            player: "phaseJieshuBegin",
        },
        direct: true,
        content: function() {
            'step 0'
            player.chooseTarget(get.prompt2('oljuanxia'), lib.filter.notMe)
                .set('ai', function(target) {
                var player = _status.event.player,
                    list = [];
                for (var name of lib.inpile) {
                    var info = lib.card[name];
                    if (!info || info.type != 'trick' || info.notarget || (info.selectTarget && info.selectTarget != 1)) continue;
                    if (!player.canUse(name, target)) continue;
                    var eff = get.effect(target, {
                        name: name
                    }, player, player)
                    if (eff > 0) list.push(eff);
                }
                list.sort()
                    .reverse();
                if (!list.length) return 0;
                return list[0] + (list[1] || 0) + (list[2] || 0);
            });
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                event.target = target;
                player.logSkill('oljuanxia', target);
            } else event.finish();
            'step 2'
            var list = [];
            for (var name of lib.inpile) {
                var info = lib.card[name];
                if (!info || info.type != 'trick' || info.notarget || (info.selectTarget && info.selectTarget != 1)) continue;
                list.push(name);
            }
            if (!list.length) event.finish();
            else {
                event.list = list;
                event.count = 0;
            }
            'step 3'
            var list = event.list.filter(function(name) {
                return player.canUse(name, target);
            });
            if (list.length) {
                var next = player.chooseButton(['视为对' + get.translation(target) + '使用一张牌', [list, 'vcard']])
                    .set('ai', function(button) {
                    var evt = _status.event.getParent();
                    return get.effect(evt.target, {
                        name: button.link[2]
                    }, evt.player, evt.player);
                });
                if (event.count == 0) next.set('forced', true);
            } else {
                event.stopped = true;
                event.goto(5);
            }
            'step 4'
            if (result.bool) {
                event.count++;
                target.addMark('oljuanxia_mark')
                var name = result.links[0][2];
                event.list.remove(name);
                player.useCard({
                    name: name,
                    isCard: true
                }, target, false);
            } else event.stopped = true;
            'step 5'
            if (target.isIn() && event.count > 0) {
                if (event.count < 3 && !event.stopped && event.list.length > 0) event.goto(3);
                else {
                    target.addTempSkill('oljuanxia_counter', {
                        player: 'phaseAfter'
                    });
                    if (!target.storage.oljuanxia_counter) target.storage.oljuanxia_counter = {};
                    if (!target.storage.oljuanxia_counter[player.playerid]) target.storage.oljuanxia_counter[player.playerid] = 0;
                    target.storage.oljuanxia_counter[player.playerid] += event.count;
                }
            }
        },
        subSkill: {
            mark: {
                marktext: '狷侠',
                intro: {
                    content: "回合结束后使用#张杀",
                },
                sub: true,
            },
            counter: {
                trigger: {
                    player: "phaseEnd",
                },
                forced: true,
                charlotte: true,
                onremove: true,
                filter: function(event, player) {
                    var map1 = (_status.connectMode ? lib.playerOL : game.playerMap),
                        map2 = player.storage.oljuanxia_counter;
                    if (!map2) return false;
                    for (var i in map2) {
                        if (map1[i] && map1[i].isIn() && player.canUse('sha', map1[i], false)) return true;
                    }
                    return false;
                },
                logTarget: function(event, player) {
                    var list = [];
                    var map1 = (_status.connectMode ? lib.playerOL : game.playerMap),
                        map2 = player.storage.oljuanxia_counter;
                    if (!map2) return false;
                    for (var i in map2) {
                        if (map1[i] && map1[i].isIn()) list.push(map1[i]);
                    }
                    return list;
                },
                content: function() {
                    'step 0'
                    var list = [];
                    var map1 = (_status.connectMode ? lib.playerOL : game.playerMap),
                        map2 = player.storage.oljuanxia_counter;
                    if (!map2) return false;
                    for (var i in map2) {
                        if (map1[i] && map1[i].isIn()) list.push(map1[i]);
                    }
                    list.sortBySeat();
                    event.num = 0;
                    event.targets = list;
                    'step 1'
                    var target = targets[num];
                    event.target = target;
                    if (target.isIn() && player.canUse('sha', target, false)) player.chooseBool('狷狭：是否视为对' + get.translation(target) + '依次使用' + get.cnNumber(player.storage.oljuanxia_counter[target.playerid]) + '张【杀】？')
                        .set('goon', get.effect(target, {
                        name: 'sha'
                    }, player, player) > 0)
                        .set('ai', () => _status.event.goon);
                    'step 2'
                    event.num++;
                    if (result.bool) event.count = player.storage.oljuanxia_counter[target.playerid];
                    else if (event.num < targets.length) event.goto(1);
                    else event.finish();
                    'step 3'
                    event.count--;
                    player.removeMark('oljuanxia_mark');
                    if (player.canUse('sha', target, false)) player.useCard({
                        name: 'sha',
                        isCard: true
                    }, target, false);
                    if (event.count > 0) event.redo();
                    else if (event.num < targets.length) event.goto(1);
                },
                sub: true,
            },
        },
    }
    lib.skill.zhenge = {
        audio: 2,
        trigger: {
            player: "phaseZhunbeiBegin",
        },
        direct: true,
        content: function() {
            'step 0'
            player.chooseTarget(get.prompt('zhenge'), '令一名角色的攻击范围+1')
                .set('ai', function(target) {
                var player = _status.event.player,
                    att = get.attitude(player, target)
                    if (att > 0) {
                        if (!target.hasMark('zhenge_effect')) att *= 1.5;
                        if (!game.hasPlayer(function(current) {
                            return get.distance(target, current, 'attack') > 2;
                        })) {
                            var usf = Math.max.apply(Math, function(current) {
                                if (target.canUse('sha', current, false)) return get.effect(current, {
                                    name: 'sha'
                                }, target, player);
                                return 0;
                            });
                            return att + usf;
                        }
                        return att;
                    }
                return 0;
            });
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                event.target = target;
                player.logSkill('zhenge', target);
                target.addSkill('zhenge_effect');
                if (target.countMark('zhenge_effect') < 5) target.addMark('zhenge_effect', 1, false);
                if (!game.hasPlayer(function(current) {
                    return current != target && !target.inRange(current);
                })) {
                    player.chooseTarget('是否令' + get.translation(target) + '视为对另一名角色使用【杀】？', function(card, player, target) {
                        return _status.event.source.canUse('sha', target);
                    })
                        .set('source', target)
                        .set('ai', function(target) {
                        var evt = _status.event;
                        return get.effect(target, {
                            name: 'sha'
                        }, evt.source, evt.player);
                    });
                } else {
                    game.delayx();
                    event.finish();
                }
            } else event.finish();
            'step 2'
            if (result.bool) {
                target.useCard({
                    name: 'sha',
                    isCard: true
                }, result.targets[0], false);
            }
            'step 3'
            game.delayx();
        },
        subSkill: {
            effect: {
                charlotte: true,
                onremove: true,
                mod: {
                    attackRange: function(player, num) {
                        return num + player.countMark('zhenge_effect');
                    },
                },
                mark: true,
                marktext: "枕戈 范围+",
                intro: {
                    content: "攻击范围+#",
                },
                sub: true,
            },
        },
    }
    lib.skill.qimei = {
        audio: 2,
        trigger: {
            player: "phaseZhunbeiBegin",
        },
        direct: true,
        content: function() {
            'step 0'
            player.chooseTarget(get.prompt('qimei'), '选择一名其他角色并获得“齐眉”效果', lib.filter.notMe)
                .set('', function(target) {
                var player = _status.event.player;
                return get.attitude(player, target) / (Math.abs(player.countCards('h') + 2 - target.countCards('h')) + 1)
            });
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                player.logSkill('qimei', target);
                player.storage.qimei_draw = target;
                player.addTempSkill('qimei_draw', {
                    player: 'phaseBegin'
                });
                player.storage.qimei_mark = '';
                player.addTempSkill('qimei_mark', {
                    player: 'phaseBegin'
                });
                player.markSkill("qimei_mark", '', '齐眉 ' + get.translation(target));
                game.delayx();
            }
        },
        subSkill: {
            mark: {
                intro: {},
                sub: true,
            },
            draw: {
                audio: "qimei",
                charlotte: true,
                forced: true,
                trigger: {
                    global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "loseAfter", "gainAfter", "addToExpansionAfter"],
                },
                logTarget: function(event, player) {
                    return player.storage.qimei_draw;
                },
                usable: 1,
                filter: function(event, player) {
                    var target = player.storage.qimei_draw;
                    if (!target || !target.isIn()) return false;
                    if (event.name != 'gain' || (event.player != player && event.player != target)) {
                        var evt1 = event.getl(player);
                        if (!evt1 || !evt1.hs || !evt1.hs.length) {
                            var evt2 = event.getl(target);
                            if (!evt2 || !evt2.hs || !evt2.hs.length) return false;
                        }
                    }
                    return player.countCards('h') == target.countCards('h');
                },
                content: function() {
                    if (trigger.delay === false) game.delayx();
                    var evt1 = trigger.getl(player);
                    if ((trigger.name == 'gain' && player == trigger.player) || (evt1 && evt1.hs && evt1.hs.length)) player.storage.qimei_draw.draw();
                    var evt2 = trigger.getl(player.storage.qimei_draw);
                    if ((trigger.name == 'gain' && player == player.storage.qimei_draw) || evt2 && evt2.hs && evt2.hs.length) player.draw();
                },
                group: "qimei_hp",
                onremove: true,
                sub: true,
            },
            hp: {
                audio: "qimei",
                trigger: {
                    global: "changeHp",
                },
                charlotte: true,
                forced: true,
                logTarget: function(event, player) {
                    return player.storage.qimei_draw;
                },
                usable: 1,
                filter: function(event, player) {
                    var target = player.storage.qimei_draw;
                    if (!target || !target.isIn()) return false;
                    if (player != event.player && target != event.player) return false;
                    return player.hp == target.hp;
                },
                content: function() {
                    game.delayx();
                    (player == trigger.player ? player.storage.qimei_draw : player)
                        .draw();
                },
                sub: true,
            },
        },
    }
    lib.skill.ybzhuiji = {
        audio: 2,
        trigger: {
            player: "phaseUseBegin",
        },
        direct: true,
        content: function() {
            'step 0'
            var list = ['摸两张牌，并于出牌阶段结束时失去1点体力'];
            if (player.isDamaged()) list.push('回复1点体力，并于出牌阶段结束时弃置两张牌');
            player.chooseControl('cancel2')
                .set('choiceList', list)
                .set('prompt', get.prompt('ybzhuiji'))
                .set('ai', function() {
                var player = _status.event.player;
                if (player.isDamaged() && player.countCards('h', 'tao') < player.getDamagedHp()) return 1;
                return 'cancel2';
            });
            'step 1'
            if (result.control != 'cancel2') {
                if (result.index == 0) player.draw(2);
                else player.recover();
                player.addTempSkill('ybzhuiji_' + result.index, 'phaseUseAfter');
            }
        },
        subSkill: {
            "0": {
                trigger: {
                    player: "phaseUseEnd",
                },
                mark: true,
                marktext: '追姬 摸牌',
                intro: {
                    name: '追姬 摸牌',
                    content: 'mark',
                },
                forced: true,
                charlotte: true,
                content: function() {
                    player.loseHp();
                },
                sub: true,
            },
            "1": {
                trigger: {
                    player: "phaseUseEnd",
                },
                mark: true,
                marktext: '追姬 回血',
                intro: {
                    name: '追姬 回血',
                    content: 'mark',
                },
                forced: true,
                charlotte: true,
                content: function() {
                    player.chooseToDiscard('he', 2, true);
                },
                sub: true,
            },
        },
    }
    lib.skill.xunyi = {
        audio: 2,
        trigger: {
            global: ["phaseBefore", "dieAfter"],
            player: "enterGame",
        },
        direct: true,
        filter: function(event, player) {
            if (event.name == 'die') return event.player == player.storage.xunyi2;
            return !player.storage.xunyi2 && (event.name != 'phase' || game.phaseNumber == 0);
        },
        content: function() {
            'step 0'
            player.unmarkSkill('xunyi_mark');
            player.removeSkill('xunyi2');
            player.chooseTarget(lib.filter.notMe, get.prompt2('xunyi'))
                .set('ai', function(target) {
                var player = _status.event.player;
                return Math.max(1 + get.attitude(player, target) * get.threaten(target), Math.random());
            });
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                player.logSkill('xunyi', target);
                player.storage.xunyi2 = target;
                player.addSkill('xunyi2');
                player.storage.xunyi_mark = '';
                player.addSkill("xunyi_mark");
                player.markSkill("xunyi_mark", '', '殉义 ' + get.translation(target));
            }
        },
        subSkill: {
            mark: {
                intro: {},
                sub: true,
            },
        },
    }
    lib.skill.xunyi2 = {
        audio: "xunyi",
        trigger: {
            global: "damageSource",
        },
        forced: true,
        charlotte: true,
        filter: function(event, player) {
            var list = [player, player.storage.xunyi2];
            return list.contains(event.source) && !list.contains(event.player);
        },
        logTarget: function(event, player) {
            return player.storage.xunyi2;
        },
        content: function() {
            (player == trigger.source ? player.storage.xunyi2 : player)
                .draw();
        },
        group: "xunyi3",
    }
    lib.skill.zhiwei = {
        audio: 2,
        trigger: {
            player: ["enterGame", "showCharacterAfter", "phaseBegin"],
            global: ["phaseBefore"],
        },
        direct: true,
        filter: function(event, player, name) {
            if (player.hasSkill('zhiwei2')) return false;
            if (get.mode() == 'guozhan') return event.name == 'showCharacter' && (event.toShow.contains('gz_luyusheng') || event.toShow.contains('luyusheng'));
            return event.name != 'showCharacter' && (name != 'phaseBefore' || game.phaseNumber == 0);
        },
        content: function() {
            'step 0'
            player.chooseTarget('请选择【至微】的目标', '选择一名其他角色。该角色造成伤害后，你摸一张牌，该角色受到伤害后，你随机弃置一张手牌。你弃牌阶段弃置的牌均被该角色获得。', true, lib.filter.notMe)
                .set('ai', function(target) {
                var att = get.attitude(_status.event.player, target);
                if (att > 0) return 1 + att;
                return Math.random();
            });
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                player.logSkill('zhiwei', target);
                player.storage.zhiwei2 = target;
                player.addSkill('zhiwei2');
                player.storage.zhiwei_mark = '';
                player.addSkill("zhiwei_mark");
                player.markSkill("zhiwei_mark", '', '至微 ' + get.translation(target));
            }
        },
        subSkill: {
            mark: {
                silent: true,
                intro: {},
                sub: true,
            },
        },
    }
    lib.skill.zhiwei2 = {
        group: ["zhiwei2_draw", "zhiwei2_discard", "zhiwei2_gain", "zhiwei2_clear"],
        charlotte: true,
        onremove: true,
        // mark:"character",
        // intro:{
        // content:"$造成伤害后你摸一张牌；$受到伤害后你弃置一张牌；你于弃牌阶段弃置牌后交给$",
        // },
        subSkill: {
            draw: {
                audio: "zhiwei",
                trigger: {
                    global: "damageSource",
                },
                forced: true,
                filter: function(event, player) {
                    return event.source == player.storage.zhiwei2;
                },
                logTarget: "source",
                content: function() {
                    player.draw();
                },
                sub: true,
            },
            discard: {
                audio: "zhiwei",
                trigger: {
                    global: "damageEnd",
                },
                forced: true,
                filter: function(event, player) {
                    return event.player == player.storage.zhiwei2 && player.countCards('h', function(card) {
                        return lib.filter.cardDiscardable(card, player, 'zhiwei2_discard');
                    });
                },
                logTarget: "player",
                content: function() {
                    player.discard(player.getCards('h', function(card) {
                        return lib.filter.cardDiscardable(card, player, 'zhiwei2_discard');
                    })
                        .randomGet());
                },
                sub: true,
            },
            gain: {
                audio: "zhiwei",
                trigger: {
                    player: "loseAfter",
                },
                forced: true,
                filter: function(event, player) {
                    return event.type == 'discard' && event.getParent('phaseDiscard')
                        .player == player && player.storage.zhiwei2 && player.storage.zhiwei2.isIn() && event.cards2.filterInD('d')
                        .length > 0;
                },
                logTarget: function(event, player) {
                    return player.storage.zhiwei2;
                },
                content: function() {
                    if (trigger.delay === false) game.delay();
                    player.storage.zhiwei2.gain(trigger.cards2.filterInD('d'), 'gain2');
                },
                sub: true,
            },
            clear: {
                audio: "zhiwei",
                trigger: {
                    global: "die",
                    player: ["hideCharacterEnd", "removeCharacterEnd"],
                },
                forced: true,
                filter: function(event, player) {
                    if (event.name == 'die') return event.player == player.storage.zhiwei2;
                    if (event.name == 'removeCharacter') return event.toRemove == 'luyusheng' || event.toRemove == 'gz_luyusheng';
                    return event.toHide == 'luyusheng' || event.toHide == 'gz_luyusheng';
                },
                content: function() {
                    'step 0'
                    player.removeSkill('zhiwei2');
                    player.unmarkSkill('zhiwei_mark');
                    if (trigger.name != 'die' || get.mode() != 'guozhan') event.finish();
                    'step 1'
                    if (player.name1 == 'gz_luyusheng' || player.name1 == 'luyusheng') player.hideCharacter(0);
                    if (player.name2 == 'gz_luyusheng' || player.name2 == 'luyusheng') player.hideCharacter(1);
                },
                sub: true,
            },
        },
    }
    lib.skill.huguan = {
        audio: 2,
        audioname: ["wangyue"],
        trigger: {
            global: "useCard",
        },
        direct: true,
        filter: function(event, player) {
            if (get.color(event.card, false) != 'red') return false;
            var evt = event.getParent('phaseUse');
            if (!evt || evt.player != event.player) return false;
            return event.player.getHistory('useCard', function(event) {
                return event.getParent('phaseUse') == evt;
            })
                .indexOf(event) == 0;
        },
        content: function() {
            'step 0'
            player.chooseControl(lib.suit, 'cancel2')
                .set('prompt', get.prompt('huguan', trigger.player))
                .set('prompt2', '令某种花色的手牌不计入其本回合的手牌上限')
                .set('ai', function() {
                var player = _status.event.player,
                    target = _status.event.getTrigger()
                        .player;
                if (get.attitude(player, target) <= 0) return 'cancel2';
                var list = lib.suit.slice(0);
                list.removeArray(target.getStorage('huguan_add'));
                if (list.length) return list.randomGet();
                return 'cancel2';
            });
            'step 1'
            if (result.control != 'cancel2') {
                var target = trigger.player;
                player.logSkill('huguan', target);
                game.log(player, '选择了', '#g' + get.translation(result.control), '花色')
                target.addTempSkill('huguan_add');
                var cc = get.translation(result.control);
                target.storage.huguan_mark = '';
                target.addTempSkill("huguan_mark");
                target.markSkill("huguan_mark", '', '护关 ' + cc);
                target.markAuto('huguan_add', [result.control]);
            }
        },
        subSkill: {
            mark: {
                intro: {},
                sub: true,
            },
            add: {
                charlotte: true,
                onremove: true,
                mod: {
                    ignoredHandcard: function(card, player) {
                        if (player.getStorage('huguan_add')
                            .contains(get.suit(card, player))) return true;
                    },
                    cardDiscardable: function(card, player, name) {
                        if (name == 'phaseDiscard' && player.getStorage('huguan_add')
                            .contains(get.suit(card, player))) return false;
                    },
                },
                //       intro:{
                //content:"本回合$花色的牌不计入手牌上限",
                //    },
                sub: true,
            },
        },
    }
    lib.skill.zhente = {
        audio: 2,
        trigger: {
            target: "useCardToTargeted",
        },
        logTarget: "player",
        usable: 1,
        preHidden: true,
        filter: function(event, player) {
            var color = get.color(event.card);
            if (player == event.player || event.player.isDead() || color == 'none' || (get.mode() == 'guozhan' && color != 'black')) return false;
            var type = get.type(event.card);
            return type == 'basic' || type == 'trick';
        },
        check: function(event, player) {
            return !event.excluded.contains(player) && get.effect(player, event.card, event.player, player) < 0;
        },
        content: function() {
            'step 0'
            trigger.player.chooseControl()
                .set('choiceList', [
                '本回合内不能再使用' + get.translation(get.color(trigger.card)) + '牌',
                '令' + get.translation(trigger.card) + '对' + get.translation(player) + '无效', ])
                .set('prompt', get.translation(player) + '发动了【贞特】，请选择一项')
                .set('ai', function() {
                var player = _status.event.player;
                var target = _status.event.getParent()
                    .player;
                var card = _status.event.getTrigger()
                    .card,
                    color = get.color(card);
                if (get.effect(target, card, player, player) <= 0) return 1;
                var hs = player.countCards('h', function(card) {
                    return get.color(card, player) == color && player.hasValueTarget(card, null, true);
                });
                if (!hs.length) return 0;
                if (hs > 1) return 1;
                return Math.random() > 0.5 ? 0 : 1;
            });
            'step 1'
            if (result.index == 0) {
                trigger.player.addTempSkill('zhente2');
                trigger.player.storage.zhente2.add(get.color(trigger.card));
                player.storage.zhente5 = get.color(trigger.card) == 'red' ? '红色牌' : '黑色牌';
                player.storage.zhente2 = '';
                player.addTempSkill("zhente2");
                trigger.player.markSkill('zhente2', '', '贞特 ' + player.storage.zhente5);
            } else trigger.excluded.add(player);
        },
    }
    //阎柔
    lib.skill.xiangshu = {
        audio: 2,
        trigger: {
            player: "phaseJieshuBegin",
        },
        direct: true,
        limited: true,
        skillAnimation: true,
        animationColor: "gray",
        filter: function(event, player) {
            player.unmarkSkill('xiangshu_mark');
            delete player.storage.xiangshu_mark;
            return (player.getStat('damage') || 0) > 0 && game.hasPlayer((current) => current.isDamaged());
        },
        content: function() {
            'step 0'
            event.num = player.getStat('damage');
            player.chooseTarget('是否发动限定技【襄戍】？', '令一名角色回复' + event.num + '点体力并摸' + get.cnNumber(event.num) + '张牌', function(card, player, target) {
                return target.isDamaged();
            })
                .set('ai', function(target) {
                var num = _status.event.getParent()
                    .num,
                    player = _status.event.player;
                var att = get.attitude(player, target);
                if (att > 0 && num >= Math.min(player.hp, 2)) return att * Math.sqrt(target.getDamagedHp());
                return 0;
            });
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                player.awakenSkill('xiangshu');
                player.logSkill('xiangshu', target);
                target.recover(num);
                target.draw(num);
                if (player != target) player.addExpose(0.2);
            }
        },
        mark: true,
        intro: {
            content: "limited",
        },
        init: function(player, skill) {
            player.storage[skill] = false;
        },
        group: "xiangshu_mark",
        subSkill: {
            mark: {
                intro: {
                    content: "回合结束时可以选择一名角色回复#点体力，摸#张牌",
                },
                trigger: {
                    source: "damageSource",
                },
                init: function(player) {
                    player.storage.xiangshu_mark = 0;
                },
                onremove: function(player) {
                    player.unmarkSkill('xiangshu_mark');
                    delete player.storage.xiangshu_mark;
                },
                audio: false,
                forced: true,
                content: function() {
                    player.addMark('xiangshu_mark', trigger.num);
                },
                sub: true,
            },
        },
    }
    lib.skill.xingongji = {
        enable: "phaseUse",
        usable: 1,
        audio: 2,
        position: "he",
        filterCard: true,
        filter: function(event, player) {
            return player.countCards('h') > 0;
        },
        check: function(card) {
            var base = 0,
                player = _status.event.player,
                suit = get.suit(card, player),
                added = false,
                added2 = false,
                added3;
            if (get.type(card) == 'equip' && game.hasPlayer(function(target) {
                var att = get.attitude(player, target);
                if (att >= 0) return 0;
                if (target.countCards('he', function(card) {
                    return get.value(card) > 5;
                })) return -att;
            })) base += 6;
            var hs = player.getCards('h');
            var muniu = player.getEquip('muniu');
            if (muniu && card != muniu && muniu.cards) hs = hs.concat(muniu.cards);
            for (var i of hs) {
                if (i != card && get.name(i) == 'sha') {
                    if (get.suit(i, player) == suit) {
                        if (player.hasValueTarget(i, false)) {
                            added3 = true;
                            base += 5.5;
                        }
                    } else {
                        if (player.hasValueTarget(i, false)) added2 = true;
                        if (!added && !player.hasValueTarget(i, null, true) && player.hasValueTarget(i, false, true)) {
                            base += 4;
                            added = true;
                        }
                    }
                }
            }
            if (added3 && !added2) base -= 4.5;
            return base - get.value(card);
        },
        content: function() {
            "step 0"
            if (!player.storage.xingongji2) player.storage.xingongji2 = [];
            player.storage.xingongji2.add(get.suit(cards[0], player));
            player.addTempSkill('xingongji2');
            var str = player.storage.xingongji2.sortBySuit()
                .join('');
            /*     if (player.storage.xingongji2.contains('heart')) str += '♥️️';
            if (player.storage.xingongji2.contains('diamond')) str += '♦️️';
            if (player.storage.xingongji2.contains('spade')) str += '♠️️';
            if (player.storage.xingongji2.contains('club')) str += '♣️️';*/
            player.storage.xingongji_mark = '';
            player.addTempSkill("xingongji_mark");
            player.addMark("xingongji_mark", str);
            //  player.markSkill("xingongji_mark", '', '弓骑 ' + str);
            "step 1"
            if (get.type(cards[0], null, cards[0].original == 'h' ? player : false) == 'equip') {
                player.chooseTarget('是否弃置一名角色的一张牌？', function(card, player, target) {
                    return player != target && target.countCards('he') > 0;
                })
                    .set('ai', function(target) {
                    var att = get.attitude(player, target);
                    if (att >= 0) return 0;
                    if (target.countCards('he', function(card) {
                        return get.value(card) > 5;
                    })) return -att;
                    return -att * 0.8;
                });
            } else {
                event.finish();
            }
            "step 2"
            if (result.bool) {
                player.line(result.targets, 'green');
                player.discardPlayerCard(result.targets[0], 'he', true);
            }
        },
        ai: {
            order: 4.5,
            result: {
                player: 1,
            },
        },
        subSkill: {
            mark: {
                intro: {},
                sub: true,
            },
        },
    }
    lib.skill.xingongji2 = {
        charlotte: true,
        onremove: true,
        mod: {
            attackRangeBase: function() {
                return Infinity;
            },
            cardUsable: function(card, player) {
                if (card.name == 'sha' && player.storage.xingongji2.contains(get.suit(card))) return Infinity;
            },
            aiOrder: function(player, card, num) {
                if (get.name(card) == 'sha' && !player.storage.xingongji2.contains(get.suit(card))) return num + 1;
            },
        },
        // mark:true,
        // intro:{
        // content:"使用$花色的杀无次数限制",
        // },
    }
    /*赵襄 芳魂*/
    lib.skill.fanghun = {
        mod: {
            aiValue: function(player, card, num) {
                if (card.name != 'sha' && card.name != 'shan') return;
                var geti = function() {
                    var cards = player.getCards('hs', function(card) {
                        return card.name == 'sha' || card.name == 'shan';
                    });
                    if (cards.contains(card)) {
                        return cards.indexOf(card);
                    }
                    return cards.length;
                };
                return Math.max(num, [7, 5, 5, 3][Math.min(geti(), 3)]);
            },
        },
        locked: false,
        audio: 2,
        inherit: "fanghun",
        trigger: {
            player: "useCard",
            target: "useCardToTargeted",
        },
        hiddenCard: function(player, name) {
            if (!player.storage.fanghun || player.storage.fanghun <= 0) return false;
            if (name == 'tao') return player.countCards('hs', 'jiu') > 0;
            if (name == 'jiu') return player.countCards('hs', 'tao') > 0;
            return false;
        },
        marktext: "梅影",
        intro: {
            content: "mark",
            name: "梅影",
        },
        forced: true,
        filter: function(event) {
            return event.card && event.card.name == 'sha';
        },
        content: function() {
            player.addMark('fanghun', trigger.num || 1);
            player.addMark('fanghun2', trigger.num || 1, false);
        },
        group: ["fanghun_sha", "fanghun_draw"],
        subSkill: {
            draw: {
                trigger: {
                    player: ["useCardAfter", "respondAfter"],
                },
                forced: true,
                popup: false,
                filter: function(event) {
                    return event.skill == 'fanghun_sha' || event.skill == 'fanghun_shan';
                },
                content: function() {
                    player.draw();
                },
                sub: true,
            },
            sha: {
                audio: "fanghun",
                enable: ["chooseToUse", "chooseToRespond"],
                prompt: "弃置一枚【梅影】标记，将杀当做闪，或将闪当做杀，或将桃当做酒，或将酒当做桃使用或打出",
                viewAs: function(cards, player) {
                    var name = false;
                    switch (get.name(cards[0], player)) {
                        case 'sha':
                            name = 'shan';
                            break;
                        case 'shan':
                            name = 'sha';
                            break;
                        case 'tao':
                            name = 'jiu';
                            break;
                        case 'jiu':
                            name = 'tao';
                            break;
                    }
                    if (name) return {
                        name: name
                    };
                    return null;
                },
                position: "hs",
                check: function(card) {
                    var player = _status.event.player;
                    if (_status.event.type == 'phase') {
                        var max = 0;
                        var name2;
                        var list = ['sha', 'tao', 'jiu'];
                        var map = {
                            sha: 'shan',
                            tao: 'jiu',
                            jiu: 'tao'
                        }
                        for (var i = 0; i < list.length; i++) {
                            var name = list[i];
                            if (player.countCards('hs', map[name]) > (name == 'jiu' ? 1 : 0) && player.getUseValue({
                                name: name
                            }) > 0) {
                                var temp = get.order({
                                    name: name
                                });
                                if (temp > max) {
                                    max = temp;
                                    name2 = map[name];
                                }
                            }
                        }
                        if (name2 == get.name(card, player)) return 1;
                        return 0;
                    }
                    return 1;
                },
                filterCard: function(card, player, event) {
                    event = event || _status.event;
                    var filter = event._backup.filterCard;
                    var name = get.name(card, player);
                    if (name == 'sha' && filter({
                        name: 'shan',
                        cards: [card]
                    }, player, event)) return true;
                    if (name == 'shan' && filter({
                        name: 'sha',
                        cards: [card]
                    }, player, event)) return true;
                    if (name == 'tao' && filter({
                        name: 'jiu',
                        cards: [card]
                    }, player, event)) return true;
                    if (name == 'jiu' && filter({
                        name: 'tao',
                        cards: [card]
                    }, player, event)) return true;
                    return false;
                },
                filter: function(event, player) {
                    if (!player.storage.fanghun || player.storage.fanghun <= 0) return false;
                    var filter = event.filterCard;
                    if (filter({
                        name: 'sha'
                    }, player, event) && player.countCards('hs', 'shan')) return true;
                    if (filter({
                        name: 'shan'
                    }, player, event) && player.countCards('hs', 'sha')) return true;
                    if (filter({
                        name: 'tao'
                    }, player, event) && player.countCards('hs', 'jiu')) return true;
                    if (filter({
                        name: 'jiu'
                    }, player, event) && player.countCards('hs', 'tao')) return true;
                    return false;
                },
                onrespond: function() {
                    return this.onuse.apply(this, arguments)
                },
                onuse: function(result, player) {
                    player.removeMark('fanghun', 1);
                },
                ai: {
                    respondSha: true,
                    respondShan: true,
                    skillTagFilter: function(player, tag) {
                        if (!player.storage.fanghun || player.storage.fanghun < 0) return false;
                        var name;
                        switch (tag) {
                            case 'respondSha':
                                name = 'shan';
                                break;
                            case 'respondShan':
                                name = 'sha';
                                break;
                        }
                        if (!player.countCards('hs', name)) return false;
                    },
                    order: function(item, player) {
                        if (player && _status.event.type == 'phase') {
                            var max = 0;
                            var list = ['sha', 'tao', 'jiu'];
                            var map = {
                                sha: 'shan',
                                tao: 'jiu',
                                jiu: 'tao'
                            }
                            for (var i = 0; i < list.length; i++) {
                                var name = list[i];
                                if (player.countCards('hs', map[name]) > (name == 'jiu' ? 1 : 0) && player.getUseValue({
                                    name: name
                                }) > 0) {
                                    var temp = get.order({
                                        name: name
                                    });
                                    if (temp > max) max = temp;
                                }
                            }
                            if (max > 0) max += ((player.storage.refuhan || player.storage.twfuhan) ? 0.3 : -0.3);
                            return max;
                        }
                        if (!player) player = _status.event.player;
                        return (player.storage.refuhan || player.storage.twfuhan) ? 4 : 1;
                    },
                },
                sub: true,
            },
        },
    };
    /*徐荣 暴戾*/
    lib.skill.xinfu_xionghuo = {
        group: ["xinfu_xionghuo_damage", "xinfu_xionghuo_begin", "xinfu_xionghuo_init"],
        subSkill: {
            begin: {
                audio: "xinfu_xionghuo",
                logTarget: "player",
                line: false,
                forced: true,
                trigger: {
                    global: "phaseUseBegin",
                },
                filter: function(event, player) {
                    return event.player.countMark('xionghuo') > 0 && event.player != player;
                },
                content: function() {
                    'step 0'
                    trigger.player.removeMark('xionghuo', trigger.player.countMark('xionghuo'));
                    var list = [1, 2, 3];
                    var num = list.randomGet();
                    event.goto(num);
                    'step 1'
                    player.line(trigger.player, 'fire');
                    trigger.player.damage('fire');
                    if (!trigger.player.storage.xionghuo_disable) trigger.player.storage.xionghuo_disable = [];
                    trigger.player.storage.xionghuo_disable.push(player);
                    trigger.player.addTempSkill('xionghuo_disable', 'phaseAfter');
                    event.goto(4);
                    'step 2'
                    player.line(trigger.player, 'water');
                    trigger.player.loseHp();
                    trigger.player.addMark('xionghuo_low', 1, false);
                    trigger.player.addTempSkill('xionghuo_low', 'phaseAfter');
                    event.goto(4);
                    'step 3'
                    player.line(trigger.player, 'green');
                    var card1 = trigger.player.getCards('h')
                        .randomGet();
                    var card2 = trigger.player.getCards('e')
                        .randomGet();
                    var list = [];
                    if (card1) list.push(card1);
                    if (card2) list.push(card2);
                    if (list.length > 0) {
                        player.gain(list, trigger.player, 'giveAuto', 'bySelf');
                    }
                    'step 4'
                    game.delay();
                    if (trigger.player.storage.xionghuo == 0) {
                        trigger.player.unmarkSkill("xionghuo");
                    }
                },
                sub: true,
            },
            damage: {
                audio: "xinfu_xionghuo",
                sub: true,
                forced: true,
                trigger: {
                    source: "damageBegin1",
                },
                filter: function(event, player) {
                    return event.player.countMark('xionghuo') > 0;
                },
                content: function() {
                    trigger.num++;
                },
            },
            init: {
                audio: "xinfu_xionghuo",
                trigger: {
                    global: "phaseBefore",
                    player: "enterGame",
                },
                forced: true,
                locked: false,
                filter: function(event, player) {
                    return (event.name != 'phase' || game.phaseNumber == 0);
                },
                content: function() {
                    player.addMark("xionghuo", 3);
                },
                sub: true,
            },
        },
        audio: 2,
        enable: "phaseUse",
        filter: function(event, player) {
            return player.countMark('xionghuo') > 0;
        },
        filterTarget: function(card, player, target) {
            if (target.hasMark('xionghuo')) return false;
            return player != target > 0;
        },
        content: function() {
            player.removeMark('xionghuo', 1);
            if (player.storage.xionghuo == 0) {
                player.unmarkSkill("xionghuo");
            }
            target.addMark('xionghuo', 1);
        },
        ai: {
            order: 11,
            result: {
                target: function(player, target) {
                    if ((player.countMark('xionghuo') >= 2 || !game.hasPlayer(function(current) {
                        return current != player && get.attitude(player, current) < 0 && current.hasMark('xionghuo');
                    })) && player.countCards('h', function(card) {
                        return get.tag(card, 'damage') && player.canUse(card, target, null, true) && player.getUseValue(card) > 0 && get.effect_use(target, card, player) > 0 && target.hasSkillTag('filterDamage', null, {
                            player: player,
                            card: card,
                        });
                    })) return 3 / Math.max(1, target.hp);
                    if ((!player.hasUnknown() && game.countPlayer(function(current) {
                        return get.attitude(player, current) < 0;
                    }) <= 1) || player.countMark('xionghuo') >= 2) {
                        return -1;
                    }
                    return 0;
                },
            },
            effect: {
                player: function(card, player, target) {
                    if (player != target && get.tag(card, 'damage') && target && target.hasMark('xionghuo') && !target.hasSkillTag('filterDamage', null, {
                        player: player,
                        card: card,
                    })) return [1, 0, 1, -2];
                },
            },
            threaten: 1.6,
        },
    };
    lib.skill.xionghuo = {
        marktext: "暴戾",
        mark: true,
        intro: {
            name: '暴戾',
            content: "mark",
        },
        locked: true,
    };
    lib.skill.xionghuo_disable = {
        mod: {
            playerEnabled: function(card, player, target) {
                if (card.name == 'sha' && (player.storage.xionghuo_disable && player.storage.xionghuo_disable.contains(target))) return false;
            },
        },
        onremove: true,
        charlotte: true,
        mark: true,
        marktext: "凶镬 禁止用杀",
        intro: {
            content: "本回合内不能对$使用【杀】",
        },
    },
    lib.skill.xionghuo_low = {
        mod: {
            maxHandcard: function(player, num) {
                return num - player.countMark('xionghuo_low');
            },
        },
        marktext: "凶镬 减手牌上限",
        mark: true,
        onremove: true,
        charlotte: true,
        intro: {
            content: "本回合内手牌上限-#",
        },
    };
    lib.skill.xinfu_shajue = {
        audio: 2,
        trigger: {
            global: "dying",
        },
        filter: function(event, player) {
            return event.player.hp < 0 && event.player != player;
        },
        forced: true,
        //priority:7,
        content: function() {
            if (trigger.parent.name == 'damage' && get.itemtype(trigger.parent.cards) == 'cards' && get.position(trigger.parent.cards[0], true) == 'o') {
                player.gain(trigger.parent.cards, "gain2");
            }
            player.addMark('xionghuo', 1);
        },
    };
    //吉本 寻厉
    lib.skill.xunli = {
        audio: 2,
        trigger: {
            global: 'loseAfter'
        },
        forced: true,
        filter: function(event, player) {
            if (event.type != 'discard' || player.getExpansions('xunli')
                .length >= 9) return false;
            for (var i of event.cards) {
                if (get.color(i, event.cards2.contains(i) ? event.player : false) == 'black') return true;
            }
            return false;
        },
        content: function() {
            'step 0'
            var num = 9 - player.getExpansions('xunli')
                .length;
            var cards = [];
            for (var i of trigger.cards) {
                if (get.color(i, trigger.cards2.contains(i) ? trigger.player : false) == 'black') cards.push(i);
            }
            if (cards.length <= num) event._result = {
                bool: true,
                links: cards,
            };
            else player.chooseButton(true, num, ['寻疠：将' + get.cnNumber(num) + '张牌置于武将牌上', cards])
                .set('forceAuto', true)
                .set('ai', function(button) {
                return get.value(button.link, _status.event.player);
            });
            'step 1'
            if (result.bool) {
                player.addToExpansion('gain2', result.links)
                    .gaintag.add('xunli');
            }
        },
        marktext: '寻疠',
        intro: {
            content: 'expansion',
            markcount: 'expansion',
        },
        group: 'xunli_exchange',
        subSkill: {
            exchange: {
                audio: 2,
                trigger: {
                    player: 'phaseUseBegin'
                },
                direct: true,
                filter: function(event, player) {
                    return player.getExpansions('xunli')
                        .length > 0 && player.hasCard((card) => get.color(card, player) == 'black', 'h');
                },
                content: function() {
                    "step 0"
                    var cards = player.getExpansions('xunli');
                    if (!cards.length || !player.countCards('h')) {
                        event.finish();
                        return;
                    }
                    var next = player.chooseToMove('寻疠：是否交换“疠”和手牌？');
                    next.set('list', [
                        [get.translation(player) + '（你）的疠', cards],
                        ['手牌区', player.getCards('h', (card) => get.color(card, player) == 'black')], ]);
                    next.set('filterMove', function(from, to) {
                        return typeof to != 'number';
                    });
                    next.set('processAI', function(list) {
                        var player = _status.event.player;
                        var getv = function(card) {
                            if (get.info(card)
                                .toself) return 0;
                            return player.getUseValue(card, false);
                        };
                        var cards = list[0][1].concat(list[1][1])
                            .sort(function(a, b) {
                            return getv(b) - getv(a);
                        }),
                            cards2 = cards.splice(0, player.getExpansions('xunli')
                                .length);
                        return [cards2, cards];
                    });
                    "step 1"
                    if (result.bool) {
                        var pushs = result.moved[0],
                            gains = result.moved[1];
                        pushs.removeArray(player.getExpansions('xunli'));
                        gains.removeArray(player.getCards('h'));
                        if (!pushs.length || pushs.length != gains.length) return;
                        player.logSkill('xunli_exchange');
                        player.addToExpansion(pushs, player, 'giveAuto')
                            .gaintag.add('xunli');
                        game.log(player, '将', pushs, '作为“疠”置于武将牌上');
                        player.gain(gains, 'gain2');
                    }
                },
            },
        },
    };
    //丁原 弑叛
    lib.skill.panshi = {
        audio: 2,
        mark: true,
        marktext: '义子',
        intro: {
            content: '$'
        },
        trigger: {
            player: 'phaseZhunbeiBegin'
        },
        forced: true,
        filter: function(event, player) {
            return player.countCards('h') > 0 && game.hasPlayer(function(current) {
                return current != player && current.hasSkill('cixiao');
            });
        },
        content: function() {
            'step 0'
            var targets = game.filterPlayer(function(current) {
                return current != player && current.hasSkill('cixiao');
            });
            if (targets.length == 1) {
                event.target = targets[0];
                player.chooseCard('h', true, '叛弑：将一张手牌交给' + get.translation(targets));
            } else player.chooseCardTarget({
                prompt: '叛弑：将一张手牌交给' + get.translation(targets) + '中的一名角色',
                filterCard: true,
                position: 'h',
                targets: targets,
                forced: true,
                filterTarget: function(card, player, target) {
                    return _status.event.targets.contains(target);
                },
            });
            'step 1'
            if (result.bool) {
                if (!target) target = result.targets[0];
                player.line(target);
                target.gain(result.cards, player, 'giveAuto');
            }
        },
        group: 'panshi_damage',
    };
    //九伐
    lib.skill.jiufa = {
        audio: 2,
        trigger: {
            player: 'useCardAfter'
        },
        frequent: true,
        filter: function(event, player) {
            return event.jiufa_counted && player.getStorage('jiufa')
                .length >= 9;
        },
        content: function() {
            'step 0'
            player.unmarkSkill('jiufa');
            event.cards = get.cards(9);
            event.cards.sort(function(a, b) {
                return get.number(b) - get.number(a);
            })
            game.cardsGotoOrdering(event.cards);
            event.videoId = lib.status.videoId++;
            game.broadcastAll(function(player, id, cards) {
                var str;
                if (player == game.me && !_status.auto) {
                    str = '九伐：选择任意张点数满足条件的牌';
                } else {
                    str = '九伐';
                }
                var dialog = ui.create.dialog(str, cards);
                dialog.videoId = id;
            }, player, event.videoId, event.cards);
            event.time = get.utc();
            game.addVideo('showCards', player, ['涉猎', get.cardsInfo(event.cards)]);
            game.addVideo('delay', null, 2);
            "step 1"
            var next = player.chooseButton([0, 9], true);
            next.set('dialog', event.videoId);
            next.set('filterButton', function(button) {
                var num = get.number(button.link),
                    cards = _status.event.getParent()
                        .cards;
                for (var i of ui.selected.buttons) {
                    if (get.number(i.link) == num) return false;
                }
                for (var i of cards) {
                    if (i != button.link && get.number(i) == num) return true;
                }
                return false;
            });
            next.set('ai', function(button) {
                return get.value(button.link, _status.event.player)
            });
            "step 2"
            if (result.bool && result.links && result.links.length) {
                event.cards2 = result.links;
            }
            var time = 1000 - (get.utc() - event.time);
            if (time > 0) {
                game.delay(0, time);
            }
            "step 3"
            game.broadcastAll('closeDialog', event.videoId);
            var cards2 = event.cards2;
            if (cards2 && cards2.length) player.gain(cards2, 'log', 'gain2');
        },
        marktext: '九伐',
        intro: {
            content: '已记录牌名：$',
            onunmark: true,
        },
        group: 'jiufa_count',
        subSkill: {
            count: {
                trigger: {
                    player: 'useCard1'
                },
                forced: true,
                charlotte: true,
                popup: false,
                firstDo: true,
                filter: function(event, player) {
                    return !player.getStorage('jiufa')
                        .contains(event.card.name);
                },
                content: function() {
                    player.logSkill('jiufa');
                    trigger.jiufa_counted = true;
                    player.markAuto('jiufa', [trigger.card.name]);
                },
            },
        },
    };
    //英霸
    lib.skill.yingba = {
        audio: 2,
        enable: 'phaseUse',
        usable: 1,
        filter: (event, player) => (game.hasPlayer((current) => (current != player && current.maxHp > 1))),
        filterTarget: (card, player, target) => (target != player && target.maxHp > 1),
        content: function() {
            'step 0'
            target.loseMaxHp();
            'step 1'
            if (target.isIn()) target.addMark('yingba_mark', 1);
            player.loseMaxHp();
        },
        locked: false,
        //global:'yingba_mark',
        mod: {
            targetInRange: function(card, player, target) {
                if (target.hasMark('yingba_mark')) return true;
            },
        },
        ai: {
            combo: 'scfuhai',
            threaten: 3,
            order: 2,
            result: {
                target: function(player, target) {
                    if (target.isHealthy()) return -2;
                    return -1;
                },
            },
        },
        subSkill: {
            mark: {
                marktext: '平定',
                intro: {
                    name: '平定',
                    content: 'mark',
                    onunmark: true,
                },
                mod: {
                    maxHandcard: function(player, numx) {
                        var num = player.countMark('yingba_mark');
                        if (num) return numx + num * game.countPlayer(function(current) {
                            return current.hasSkill('yingba');
                        });
                    },
                },
            },
        },
    };
    //梦魇
    lib.skill.new_wuhun = {
        audio: "wuhun",
        group: ["new_wuhun_mark", "new_wuhun_die", "wuhun22", "wuhun23"],
        trigger: {
            player: "damageEnd",
        },
        forced: true,
        filter: function(event, player) {
            return event.source != undefined;
        },
        content: function() {
            trigger.source.addMark('new_wuhun_mark', trigger.num);
        },
        subSkill: {
            die: {
                audio: "wuhun2",
                skillAnimation: true,
                animationColor: 'soil',
                trigger: {
                    player: "die",
                },
                forced: true,
                forceDie: true,
                direct: true,
                filter: function(event, player) {
                    return game.hasPlayer(function(current) {
                        return current != player && current.hasMark('new_wuhun_mark');
                    });
                },
                content: function() {
                    "step 0"
                    var num = 0;
                    for (var i = 0; i < game.players.length; i++) {
                        var current = game.players[i];
                        if (current != player && current.countMark('new_wuhun_mark') > num) {
                            num = current.countMark('new_wuhun_mark');
                        }
                    }
                    player.chooseTarget(true, '请选择【武魂】的目标', function(card, player, target) {
                        return target != player && target.countMark('new_wuhun_mark') == _status.event.num;
                    })
                        .set('ai', function(target) {
                        return -get.attitude(_status.event.player, target);
                    })
                        .set('forceDie', true)
                        .set('num', num);
                    "step 1"
                    if (result.bool && result.targets && result.targets.length) {
                        var target = result.targets[0];
                        event.target = target;
                        player.logSkill(Math.random() < 0.5 ? 'wuhun22' : 'wuhun23', target);
                        player.line(target, {
                            color: [255, 255, 0]
                        });
                        game.delay(2);
                    }
                    "step 2"
                    target.judge(function(card) {
                        if (['tao', 'taoyuan'].contains(card.name)) return 10;
                        return -10;
                    })
                        .judge2 = function(result) {
                        return result.bool == false ? true : false;
                    };
                    "step 3"
                    if (!result.bool) {
                        lib.element.player.die.apply(target, []);
                    }
                },
                sub: true,
            },
            mark: {
                marktext: "梦魇",
                intro: {
                    name: "梦魇",
                    content: "mark",
                },
                sub: true,
            },
        },
        ai: {
            threaten: 0.01,
            notemp: true,
        },
    };
    //暴怒			
    lib.skill.baonu = {
        audio: 2,
        marktext: '暴怒',
        unique: true,
        trigger: {
            source: 'damageSource',
            player: ['damageEnd', 'enterGame'],
            global: 'phaseBefore',
        },
        forced: true,
        filter: function(event) {
            return (event.name != 'damage' && (event.name != 'phase' || game.phaseNumber == 0)) || event.num > 0;
        },
        content: function() {
            player.addMark('baonu', trigger.name == 'damage' ? trigger.num : 2);
        },
        intro: {
            name: '暴怒',
            content: 'mark'
        },
        ai: {
            combo: 'ol_shenfen',
            maixie: true,
            maixie_hp: true
        }
    };
    //定仪			
    lib.skill.mjdingyi = {
        audio: 2,
        trigger: {
            global: 'phaseBefore',
            player: 'enterGame',
        },
        forced: true,
        locked: false,
        filter: function(event, player) {
            return (event.name != 'phase' || game.phaseNumber == 0);
        },
        logTarget: function() {
            return game.players;
        },
        content: function() {
            'step 0'
            var list = [];
            for (var i = 0; i < 4; i++) list.push(lib.skill['mjdingyi_' + i].title);
            player.chooseControl()
                .set('choiceList', list)
                .set('prompt', '定仪：请选择一个全局效果')
                .set('ai', function(target) {
                var list1 = player.getEnemies()
                    .length;
                var list2 = game.players.length - list1;
                if (list2 - list1 > 1) return 0;
                if (game.players.length < 6) return 2;
                return 3;
            });
            'step 1'
            if (typeof result.index == 'number') {
                var skill = 'mjdingyi_' + result.index;
                game.log(player, '选择了', '#g' + lib.skill[skill].title);
                for (var i of game.players) i.addSkill(skill);
                game.delayx();
            }
        },
        subSkill: {
            0: {
                title: '摸牌阶段的额定摸牌数+1',
                charlotte: true,
                mark: true,
                marktext: '定仪 额外摸牌',
                trigger: {
                    player: 'phaseDrawBegin'
                },
                forced: true,
                filter: function(event, player) {
                    return !event.numFixed;
                },
                content: function() {
                    trigger.num += ((player.storage.mjdingyi_plus || 0) + 1);
                },
                intro: {
                    content: function(storage, player) {
                        return '摸牌阶段的额定摸牌数+' + (1 * ((player.storage.mjdingyi_plus || 0) + 1));
                    },
                },
            },
            1: {
                title: '手牌上限+2',
                charlotte: true,
                mark: true,
                marktext: '定仪 手牌上限',
                mod: {
                    maxHandcard: function(player, num) {
                        return num + 2 * ((player.storage.mjdingyi_plus || 0) + 1);
                    },
                },
                intro: {
                    content: function(storage, player) {
                        return '手牌上限+' + (2 * ((player.storage.mjdingyi_plus || 0) + 1));
                    },
                },
            },
            2: {
                title: '攻击范围+1',
                charlotte: true,
                mark: true,
                marktext: '定仪 攻击范围',
                mod: {
                    attackRange: function(player, num) {
                        return num + ((player.storage.mjdingyi_plus || 0) + 1);
                    },
                },
                intro: {
                    content: function(storage, player) {
                        return '攻击范围+' + ((player.storage.mjdingyi_plus || 0) + 1);
                    },
                },
            },
            3: {
                title: '脱离濒死状态后回复1点体力',
                charlotte: true,
                mark: true,
                marktext: '定仪 额外回复',
                trigger: {
                    player: 'dyingAfter'
                },
                forced: true,
                filter: function(event, player) {
                    return player.isDamaged();
                },
                content: function() {
                    player.recover((player.storage.mjdingyi_plus || 0) + 1);
                },
                intro: {
                    content: function(storage, player) {
                        return '脱离濒死状态后回复' + ((player.storage.mjdingyi_plus || 0) + 1) + '点体力';
                    },
                },
            },
        },
    };
    //罪辞			
    lib.skill.zuici = {
        audio: 2,
        trigger: {
            player: "damageEnd",
        },
        filter: function(event, player) {
            if (!event.source || !event.source.isIn()) return false;
            for (var i = 0; i < 4; i++) {
                if (event.source.hasSkill('mjdingyi_' + i)) return true;
            }
            return false;
        },
        logTarget: "source",
        check: () => false,
        content: function() {
            'step 0'
            var target = trigger.source;
            event.target = target;
            for (var i = 0; i < 4; i++) {
                if (target.hasSkill('mjdingyi_' + i)) target.removeSkill('mjdingyi_' + i);
                if (target.hasSkill('fanbei')) target.removeSkill('fanbei');
            }
            'step 1'
            var list = get.zhinangs();
            if (list.length) {
                player.chooseButton(['选择要令' + get.translation(target) + '获得的智囊', [list, 'vcard']], true);
            } else event.finish();
            'step 2'
            if (result.bool) {
                var card = get.cardPile2(function(card) {
                    return card.name == result.links[0][2];
                })
                if (card) target.gain(card, 'gain2');
            }
        },
    }
    //辅弼
    lib.skill.mjfubi = {
        audio: 2,
        enable: 'phaseUse',
        filter: function(event, player) {
            if (player.hasSkill('mjfubi_round')) return false;
            return game.hasPlayer(function(current) {
                for (var i = 0; i < 4; i++) {
                    if (current.hasSkill('mjdingyi_' + i)) return true;
                }
            });
        },
        filterCard: true,
        selectCard: [0, 1],
        filterTarget: function(card, player, target) {
            if (ui.selected.cards.length) {
                for (var i = 0; i < 4; i++) {
                    if (target.hasSkill('mjdingyi_' + i)) return true;
                }
            }
            var num = 0;
            for (var i = 0; i < 4; i++) {
                if (target.hasSkill('mjdingyi_' + i)) return true;
            }
            return num > 1 && num < 4;
        },
        check: () => false,
        position: 'he',
        content: function() {
            'step 0'
            player.addTempSkill('mjfubi_round', 'roundStart');
            if (cards.length) {
                player.addSkill('mjfubi_clear');
                player.markAuto('mjfubi_clear', [target]);
                target.addMark('mjdingyi_plus', 1, false);
                target.addSkill('fanbei');
                game.log(target, '的', '#g【定仪】', '效果翻倍');
                event.finish();
                return;
            }
            var list = [],
                nums = [];
            for (var i = 0; i < 4; i++) {
                if (!target.hasSkill('mjdingyi_' + i)) {
                    list.push(lib.skill['mjdingyi_' + i].title);
                    nums.push(i);
                }
            }
            if (list.length) {
                event.nums = nums;
                player.chooseControl()
                    .set('choiceList', list)
                    .set('prompt', '辅弼：请选择为' + get.translation(target) + '更换的〖定仪〗效果')
                    .set('ai', function() {
                    var player = _status.event.player,
                        target = _status.event.getParent()
                            .target;
                    if (get.attitude(player, target) > 0 && !target.hasSkill('mjdingyi_0')) return 0;
                    return _status.event.getParent()
                        .nums.length - 1;
                });
            } else event.finish();
            'step 1'
            for (var i = 0; i < 4; i++) {
                if (target.hasSkill('mjdingyi_' + i)) target.removeSkill('mjdingyi_' + i);
            }
            target.addSkill('mjdingyi_' + event.nums[result.index]);
            game.log(target, '的效果被改为', '#g' + lib.skill['mjdingyi_' + event.nums[result.index]].title);
        },
        ai: {
            order: 10,
            expose: 0,
            result: {
                target: function(player, target) {
                    if (target.hasSkill('mjdingyi_0')) return -1;
                    return 2;
                },
            },
        },
        subSkill: {
            round: {},
            clear: {
                trigger: {
                    player: ['phaseBegin', 'dieBegin']
                },
                forced: true,
                popup: false,
                charlotte: true,
                content: function() {
                    while (player.storage.mjfubi_clear && player.storage.mjfubi_clear.length) {
                        var target = player.storage.mjfubi_clear.shift();
                        if (target.hasMark('mjdingyi_plus')) target.removeMark('mjdingyi_plus', 1, false);
                        if (target.hasSkill('fanbei')) target.removeSkill('fanbei');
                    }
                    delete player.storage.mjfubi_clear;
                    player.removeSkill('mjfubi_clear');

                },
            },
        },
    };
    //翻倍标记			
    lib.skill.fanbei = {
        mark: true,
        marktext: '定仪 翻倍',
        intro: {
            name: '翻倍',
            content: 'mark'
        },
    };
    //杜预 武库									
    lib.skill.spwuku = {
        audio: 2,
        trigger: {
            global: 'useCard'
        },
        forced: true,
        preHidden: true,
        filter: function(event, player) {
            if (get.type(event.card) != 'equip') return false;
            var gz = get.mode() == 'guozhan';
            if (gz && event.player.isFriendOf(player)) return false;
            return player.countMark('spwuku') < (gz ? 2 : 3);
        },
        content: function() {
            player.addMark('spwuku', 1);
        },
        marktext: '武库',
        intro: {
            content: 'mark',
        },
    };
    //陆抗 决堰									
    lib.skill.drlt_jueyan1 = {
        mod: {
            cardUsable: function(card, player, num) {
                if (card.name == 'sha') return num + 3;
            },
        },
        mark: true,
        marktext: '杀的次数+3',
        intro: {
            name: '决堰 - 武器',
            content: '本回合内可以多使用三张【杀】'
        },
    },
    lib.skill.drlt_jueyan2 = {
        mod: {
            targetInRange: function(card, player, target, now) {
                return true;
            },
        },
        mark: true,
        marktext: '无限距离',
        intro: {
            name: '决堰 - 坐骑',
            content: '本回合内使用牌没有距离限制'
        },
    },
    lib.skill.drlt_jueyan3 = {
        mod: {
            maxHandcard: function(player, num) {
                return num + 3;
            },
        },
        mark: true,
        marktext: '手牌上限+3',
        intro: {
            name: '决堰 - 防具',
            content: '本回合内手牌上限+3'
        },
    },
    //郝昭 镇骨			
    lib.skill.drlt_zhenggu_mark = {
        init: function(player, skill) {
            if (!player.storage[skill]) player.storage[skill] = [];
        },
        marktext: '镇骨',
        intro: {
            name: '镇骨',
            content: '已成为$〖镇骨〗的目标',
        },
    };
    //腾公主 流年	
    //Helasisy修：你是真无聊啊					                    		
    /*lib.skill.liunian = {
        audio: 2,
        trigger: {
            global: 'washCard'
        },
        forced: true,
        filter: function(event, player) {
            return game.shuffleNumber <= 2;
        },
        content: function() {
            if (game.shuffleNumber == 1) player.addTempSkill('liunian_shuffle1');
            else player.addTempSkill('liunian_shuffle2');
            game.delayx();
        },
        subSkill: {
            shuffle1: {
                charlotte: true,
                forced: true,
                trigger: {
                    player: 'phaseEnd'
                },
                content: function() {
                    player.gainMaxHp();
                    game.delayx();
                },
            },
            shuffle2: {
                charlotte: true,
                forced: true,
                trigger: {
                    player: 'phaseEnd'
                },
                content: function() {
                    'step 0'
                    player.recover();
                    game.delayx();
                    'step 1'
                    player.addSkill('liunian_effect');
                    player.addMark('liunian_effect', 10, false);
                },
            },
            effect: {
                charlotte: true,
                mod: {
                    maxHandcard: function(player, num) {
                        return num + player.countMark('liunian_effect');
                    },
                },
                marktext: '流年',
                intro: {
                    content: '手牌上限+#',
                },
            },
        },
    };*/
    //陈琳 笔伐						
    lib.skill.bifa2 = {
        trigger: {
            player: "phaseZhunbeiBegin",
        },
        forced: true,
        charlotte: true,
        audio: false,
        filter: function(event, player) {
            return player.storage.bifa2 && player.getExpansions('bifa2')
                .contains(player.storage.bifa2[0]);
        },
        content: function() {
            "step 0"
            if (player.storage.bifa2[1].isAlive() && player.countCards('h')) {
                player.chooseCard(get.translation(player.storage.bifa2[1]) + '的笔伐牌为：', function(card) {
                    return get.type(card, 'trick') == _status.event.type;
                })
                    .set('ai', function(card) {
                    return 8 - get.value(card);
                })
                    .set('type', get.type(player.storage.bifa2[0], 'trick'))
                    .set('promptx', [
                    [player.storage.bifa2[0]], '请交给其一张与此牌类别相同的手牌，否则失去1点体力']);
            } else {
                event.directfalse = true;
            }
            "step 1"
            if (result.bool && !event.directfalse) {
                player.storage.bifa2[1].gain(result.cards, player, 'giveAuto');
                player.gain(player.storage.bifa2[0], 'draw');
            } else {
                player.loseHp();
            }
            "step 2"
            player.removeSkill('bifa2');
        },
        marktext: "笔伐",
        intro: {
            markcount: 1,
            name: "笔伐",
            content: "已成为〖笔伐〗的目标",
        },
        onremove: function(player, skill) {
            var cards = player.getExpansions(skill);
            if (cards.length) player.loseToDiscardpile(cards);
            delete player.storage[skill];
        },
    };
    /*神诸葛亮 三件套*/
    lib.translate.qixing_bg = '七星'
    lib.translate.dawu2_bg = '大雾'
    lib.translate.kuangfeng2_bg = '狂风'
    //刘封
    lib.translate.xiansi_bg = '陷嗣'
    //嵇康
    lib.translate.juexiang_club_bg = '绝响'

    /*刘琦 问计*/
    lib.skill.rewenji = {
        audio: 'spwenji',
        trigger: {
            player: "phaseUseBegin",
        },
        direct: true,
        filter: function(event, player) {
            return game.hasPlayer(function(current) {
                return current != player && current.countCards('he');
            });
        },
        content: function() {
            'step 0'
            player.chooseTarget(get.prompt2('rewenji'), function(card, player, target) {
                return target != player && target.countCards('he');
            })
                .set('ai', function(target) {
                var att = get.attitude(_status.event.player, target);
                if (att > 0) return Math.sqrt(att) / 10;
                return 5 - att;
            });
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                event.target = target;
                player.logSkill('rewenji', target);
                target.chooseCard('he', true, '问计：将一张牌交给' + get.translation(player));
            } else {
                event.finish();
            }
            'step 2'
            if (result.bool) {
                player.addTempSkill('rewenji_respond');
                player.storage.rewenji_respond = get.type2(result.cards[0], target);
                event.target.give(result.cards, player, true);
                var cc = get.translation(result.cards[0].name);
                player.storage.rewenji_mark = '';
                player.addTempSkill("rewenji_mark");
                player.markSkill("rewenji_mark", '', '问计 ' + cc);
            }
        },
        subSkill: {
            respond: {
                onremove: true,
                trigger: {
                    player: "useCard",
                },
                forced: true,
                charlotte: true,
                audio: 'spwenji',
                filter: function(event, player) {
                    return get.type2(event.card) == player.storage.rewenji_respond;
                },
                content: function() {
                    trigger.directHit.addArray(game.filterPlayer(function(current) {
                        return current != player;
                    }));
                },
                ai: {
                    "directHit_ai": true,
                    skillTagFilter: function(player, tag, arg) {
                        return get.type2(arg.card) == player.storage.rewenji_respond;
                    },
                },
                sub: true,
            },
            mark: {
                onremove: function(player) {
                    delete player.storage.rewenji_mark;
                    player.removeMark('rewenji_mark');
                },
                intro: {},
                sub: true,
            },
        },
    }
    //王朗 鼓舌
    lib.skill.regushe = {
        audio: "gushe",
        enable: "phaseUse",
        filterTarget: function(card, player, target) {
            return player.canCompare(target);
        },
        selectTarget: [1, 3],
        filter: function(event, player) {
            return (player.countMark('regushe') + player.countMark('regushe2') < 7) && player.countCards('h') > 0;
        },
        multitarget: true,
        multiline: true,
        content: function() {
            player.addTempSkill('regushe2');
            player.chooseToCompare(targets)
                .callback = lib.skill.regushe.callback;
            player.unmarkSkill('regushe_mark2');
            var mark2 = 7 - (player.countMark('regushe') + player.countMark('regushe2'));
            if (mark2 <= 0) {
                var mark2 = 0;
            }
            player.storage.regushe_mark2 = '';
            player.addTempSkill("regushe_mark2");
            player.markSkill("regushe_mark2", '', '鼓舌可用: ' + mark2);
        },
        marktext: "饶舌",
        intro: {
            name: "饶舌",
            content: "mark",
        },
        callback: function() {
            'step 0'
            if (event.num1 <= event.num2) {
                target.chat(lib.skill.gushe.chat[player.countMark('regushe')]);
                game.delay();
                player.addMark('regushe', 1);
                if (player.countMark('regushe') >= 7) {
                    player.die();
                }
            } else player.addMark('regushe2', 1, false);
            'step 1'
            if (event.num1 >= event.num2) {
                target.chooseToDiscard('he', '弃置一张牌，或令' + get.translation(player) + '摸一张牌')
                    .set('ai', function(card) {
                    if (_status.event.goon) return 6 - get.value(card);
                    return 0;
                })
                    .set('goon', get.attitude(target, player) < 0);
            } else {
                event.goto(3);
            }
            player.unmarkSkill('regushe_mark2');
            var mark2 = 7 - (player.countMark('regushe') + player.countMark('regushe2'));
            if (mark2 <= 0) {
                var mark2 = 0;
            }
            player.storage.regushe_mark2 = '';
            player.addTempSkill("regushe_mark2");
            player.markSkill("regushe_mark2", '', '鼓舌可用: ' + mark2);
            'step 2'
            if (!result.bool) {
                player.draw();
            }
            'step 3'
            if (event.num1 <= event.num2) {
                player.chooseToDiscard('he', '弃置一张牌，或摸一张牌')
                    .set('ai', function() {
                    return -1;
                });
            } else {
                event.finish();
            }
            'step 4'
            if (!result.bool) player.draw();
        },
        ai: {
            order: 7,
            result: {
                target: function(player, target) {
                    var num = ui.selected.targets.length + 1;
                    if (num + player.countMark('regushe') <= 6) return -1;
                    var hs = player.getCards('h');
                    for (var i = 0; i < hs.length; i++) {
                        if (get.value(hs[i]) <= 6) {
                            switch (hs[i].number) {
                                case 13:
                                    return -1;
                                case 12:
                                    if (player.countMark('regushe') + num <= 8) return -1;
                                    break;
                                case 11:
                                    if (player.countMark('regushe') + num <= 7) return -1;
                                    break;
                                default:
                                    if (hs[i].number > 5 && player.countMark('regushe') + num <= 6) return -1;
                            }
                        }
                    }
                    return 0;
                },
            },
        },
        subSkill: {
            mark: {
                onremove: function(player) {
                    delete player.storage.rewenji_mark;
                    player.removeMark('regushe_mark');
                },
                intro: {},
                sub: true,
            },
            mark2: {
                intro: {},
                sub: true,
            },
        },
    }
    //小虎 魅步
    lib.skill.new_meibu = {
        audio: "meibu",
        trigger: {
            global: "phaseUseBegin",
        },
        filter: function(event, player) {
            return event.player != player && event.player.isAlive() && player.countCards('he') > 0 && event.player.inRange(player);
        },
        direct: true,
        derivation: ["new_zhixi"],
        checkx: function(event, player) {
            if (get.attitude(player, event.player) >= 0) return false;
            var e2 = player.getEquip(2);
            if (e2) {
                if (e2.name == 'tengjia') return true;
                if (e2.name == 'bagua') return true;
            }
            return event.player.countCards('h') > event.player.hp;
        },
        content: function() {
            "step 0"
            var check = lib.skill.new_meibu.checkx(trigger, player);
            player.chooseToDiscard(get.prompt2('new_meibu', trigger.player), 'he')
                .set('ai', function(card) {
                if (_status.event.check) return 6 - get.value(card);
                return 0;
            })
                .set('check', check)
                .set('logSkill', 'new_meibu');
            "step 1"
            if (result.bool) {
                var target = trigger.player;
                var card = result.cards[0];
                player.line(target, 'green');
                target.addTempSkill('new_zhixi', 'phaseUseEnd');
                target.addTempSkill('new_zhixi_recover', 'phaseUseEnd');
                if (card.name != 'sha' && get.type(card) != 'trick' && get.color(card) != 'black') {
                    target.addTempSkill('new_meibu_range', 'phaseUseEnd');
                    target.storage.meibu = player;
                }
                /*   target.markSkillCharacter('new_meibu',player,'止息','锁定技，出牌阶段，你至多可使用X张牌，你使用了锦囊牌后不能再使用牌（X为你的体力值）。');*/
                var mark = target.hp - target.countMark('new_zhixi');
                player.storage.new_zhixi_mark = '';
                target.addTempSkill("new_zhixi_mark");
                target.markSkill("new_zhixi_mark", '', '止息 ' + mark);
            }
        },
        ai: {
            expose: 0.2,
        },
        subSkill: {
            range: {
                mod: {
                    globalFrom: function(from, to, num) {
                        if (to == from.storage.meibu) {
                            return -Infinity;
                        }
                    },
                },
                sub: true,
            },
        },
    };
    //小虎 止息		
    lib.skill.new_zhixi = {
        mod: {
            cardEnabled: function(card, player) {
                if (player.storage.new_zhixi2 || player.countMark('new_zhixi') >= player.hp) return false;
            },
            cardUsable: function(card, player) {
                if (player.storage.new_zhixi2 || player.countMark('new_zhixi') >= player.hp) return false;
            },
            cardRespondable: function(card, player) {
                if (player.storage.new_zhixi2 || player.countMark('new_zhixi') >= player.hp) return false;
            },
        },
        trigger: {
            player: "useCard",
        },
        forced: true,
        popup: false,
        onremove: function(player) {
            player.unmarkSkill('new_meibu');
            player.unmarkSkill('new_zhixi_mark');
            player.unmarkSkill('new_zhixi_mark2');
            delete player.storage.new_zhixi;
            delete player.storage.new_zhixi2;
        },
        firstDo: true,
        content: function() {
            'step 0'
            player.addMark('new_zhixi', 1, false);
            if (get.type2(trigger.card) == 'trick') {
                player.storage.new_zhixi2 = true;
                player.addMark('new_zhixi_mark2', 1, false);
            }
            'step 1'
            player.unmarkSkill('new_zhixi_mark');
            var mark = player.hp - player.countMark('new_zhixi');
            player.storage.new_zhixi_mark = '';
            player.addTempSkill("new_zhixi_mark");
            player.markSkill("new_zhixi_mark", '', '止息 ' + mark);
        },
        subSkill: {
            mark: true,
            mark: {
                intro: {},
                sub: true,
            },
            mark2: {
                marktext: '止息 锦',
                mark: true,
                intro: {
                    name: '止息',
                    content: '你使用过锦囊牌，不能再用牌啦'
                },
                sub: true,
            },
        },
        ai: {
            presha: true,
            pretao: true,
            nokeep: true,
        },
    };
    lib.skill.new_zhixi_recover = {
        trigger: {
            player: "changeHp",
        },
        forced: true,
        content: function() {
            if (player.hp > player.countMark('new_zhixi')) {
                player.unmarkSkill('new_zhixi_mark');
            }
            var mark = player.hp - player.countMark('new_zhixi');
            player.storage.new_zhixi_mark = '';
            player.addTempSkill("new_zhixi_mark");
            player.markSkill("new_zhixi_mark", '', '止息 ' + mark);
        },
    };
    //神张辽 夺锐   
    lib.skill.drlt_duorui = {
        audio: 2,
        init: function(player, skill) {
            if (!player.storage.drlt_duorui) player.storage.drlt_duorui = [];
        },
        trigger: {
            source: "damageSource",
        },
        filter: function(event, player) {
            if (player.storage.drlt_duorui.length) return false;
            return player != event.player && event.player.isAlive() && _status.currentPhase == player;
        },
        check: function(event, player) {
            if (player.countDisabled() < 5 && player.isDisabled(5)) return false;
            return true;
        },
        bannedList: ["bifa", "buqu", "gzbuqu", "songci", "funan", "xinfu_guhuo", "reguhuo", "huashen", "rehuashen", "old_guhuo", "shouxi", "xinpojun", "taoluan", "xintaoluan", "yinbing", "xinfu_yingshi", "zhenwei", "zhengnan", "xinzhengnan", "zhoufu"],
        content: function() {
            'step 0'
            var list = [];
            var listm = [];
            var listv = [];
            if (trigger.player.name1 != undefined) listm = lib.character[trigger.player.name1][3];
            else listm = lib.character[trigger.player.name][3];
            if (trigger.player.name2 != undefined) listv = lib.character[trigger.player.name2][3];
            listm = listm.concat(listv);
            var func = function(skill) {
                var info = get.info(skill);
                if (!info || info.charlotte || info.hiddenSkill || info.zhuSkill || info.juexingji || info.limited || info.dutySkill || (info.unique && !info.gainable) || lib.skill.drlt_duorui.bannedList.contains(skill)) return false;
                return true;
            };
            for (var i = 0; i < listm.length; i++) {
                if (func(listm[i])) list.add(listm[i]);
            }
            event.skills = list;
            if (player.countDisabled() < 5) {
                player.chooseToDisable()
                    .ai = function(event, player, list) {
                    if (list.contains('equip5')) return 'equip5';
                    return list.randomGet();
                };
            }
            'step 1'
            if (event.skills.length > 0) {
                player.chooseControl(event.skills)
                    .set('prompt', '请选择要获得的技能')
                    .set('ai', function() {
                    return event.skills.randomGet()
                });
            } else event.finish();
            'step 2'
            player.addTempSkill(result.control, {
                player: 'dieAfter'
            });
            player.popup(result.control, 'thunder');
            player.storage.drlt_duorui = [result.control];
            player.storage.drlt_duorui_player = trigger.player;
            trigger.player.storage.drlt_duorui = [result.control];
            trigger.player.addTempSkill('drlt_duorui1', {
                player: 'phaseAfter'
            });
            game.log(player, '获得了技能', '#g【' + get.translation(result.control) + '】')
            player.unmarkSkill('drlt_duorui_mark');
            var mark = get.translation(result.control);
            player.storage.drlt_duorui_mark = '';
            player.addSkill("drlt_duorui_mark", );
            player.markSkill("drlt_duorui_mark", '', '夺锐 ' + mark);
            trigger.player.addTempSkill("drlt_duorui_mark", {
                player: 'phaseAfter'
            });
            trigger.player.markSkill("drlt_duorui_mark", '', '被夺锐 ' + mark);
        },
        group: ["duorui_clear"],
        subSkill: {
            mark: true,
            mark: {
                intro: {},
                sub: true,
            },
        },
    };
    lib.skill.duorui_clear = {
        trigger: {
            global: ['phaseAfter', 'dieAfter'],
        },
        filter: function(event, player) {
            if (!player.storage.drlt_duorui_player || !player.storage.drlt_duorui) return false;
            return player.storage.drlt_duorui_player == event.player && player.storage.drlt_duorui.length;
        },
        silent: true,
        forced: true,
        popup: false,
        content: function() {
            player.removeSkill(player.storage.drlt_duorui[0]);
            delete player.storage.drlt_duorui_player;
            player.storage.drlt_duorui = [];
            player.unmarkSkill('drlt_duorui_mark');
        },
    },
    lib.skill.drlt_duorui1 = {
        init: function(player, skill) {
            player.disableSkill(skill, player.storage.drlt_duorui);
            player.shixiaoSkill('drlt_duorui');
        },
        onremove: function(player, skill) {
            player.enableSkill(skill);
            player.unshixiaoSkill('drlt_duorui');
        },
        locked: true,
        // mark:true,
        charlotte: true,
        /* intro:{
                               content:function(storage,player,skill){
                                     var list=[];
                                     for(var i in player.disabledSkills){
                                         if(player.disabledSkills[i].contains(skill)) list.push(i);
                                     };
                                     if(list.length){
                                         var str='被夺锐：';
                                         for(var i=0;i<list.length;i++){
                                             if(lib.translate[list[i]+'_info']) str+=get.translation(list[i])+'、';
                                         };
                                         return str.slice(0,str.length-1);
                                     };
                                 },
                             },*/
    }
    lib.skill.shenzhu = {
        audio: 2,
        trigger: {
            player: "useCardAfter",
        },
        forced: true,
        filter: function(event, player) {
            return event.card.name == 'sha' && event.card.isCard && event.cards.length == 1;
        },
        content: function() {
            'step 0'
            player.chooseControl()
                .set('choiceList', [
                '摸一张牌，且本回合使用【杀】的次数上限+1',
                '摸三张牌，且本回合不能再使用【杀】', ])
                .set('ai', () => _status.event.player.hasSha() ? 0 : 1);
            'step 1'
            if (result.index == 0) {
                player.draw();
                player.addTempSkill('shenzhu_more');
                player.addMark('shenzhu_more', 1, false);
            } else {
                player.draw(3);
                player.addTempSkill('shenzhu_less');
            }
        },
        subSkill: {
            more: {
                charlotte: true,
                onremove: true,
                mod: {
                    cardUsable: function(card, player, num) {
                        if (card.name == 'sha') return num + player.countMark('shenzhu_more');
                    },
                },
                sub: true,
            },
            less: {
                mark: true,
                marktext: '神著 不能出杀',
                intro: {
                    name: '不能出杀',
                    content: 'mark'
                },
                charlotte: true,
                mod: {
                    cardEnabled: function(card) {
                        if (card.name == 'sha') return false;
                    },
                },
                sub: true,
            },
        },
    }
    //十周年留赞 奋音
    lib.skill.refenyin = {
        audio: 2,
        trigger: {
            global: ["loseAfter", "cardsDiscardAfter"],
        },
        forced: true,
        filter: function(event, player) {
            if (player != _status.currentPhase) return false;
            if (event.name == 'lose' && event.position != ui.discardPile) return false;
            var list = [];
            var num = event.cards.length;
            for (var i = 0; i < event.cards.length; i++) {
                var card = event.cards[i];
                list.add(get.suit(card, (event.cards2 && event.cards2.contains(card)) ? event.player : false));
            }
            game.getGlobalHistory('cardMove', function(evt) {
                if (evt == event || (evt.name != 'lose' && evt.name != 'cardsDiscard')) return false;
                if (evt.name == 'lose' && evt.position != ui.discardPile) return false;
                num += evt.cards.length;
                for (var i = 0; i < evt.cards.length; i++) {
                    var card = evt.cards[i];
                    list.remove(get.suit(card, (evt.cards2 && evt.cards2.contains(card)) ? evt.player : false));
                }
            }, event);
            player.storage.refenyin_mark2 = num;
            return list.length > 0;
        },
        content: function() {
            var list = [];
            var list2 = [];
            for (var i = 0; i < trigger.cards.length; i++) {
                var card = trigger.cards[i];
                var suit = get.suit(card, (trigger.cards2 && trigger.cards2.contains(card)) ? trigger.player : false);
                list.add(suit);
                list2.add(suit);
            }
            game.getGlobalHistory('cardMove', function(evt) {
                if (evt == trigger || (evt.name != 'lose' && evt.name != 'cardsDiscard')) return false;
                if (evt.name == 'lose' && evt.position != ui.discardPile) return false;
                for (var i = 0; i < evt.cards.length; i++) {
                    var card = evt.cards[i];
                    var suit = get.suit(card, (evt.cards2 && evt.cards2.contains(card)) ? evt.player : false);
                    list.remove(suit);
                    list2.add(suit);
                    player.storage.refenyin_mark1 = suit;
                }
            }, trigger);
            list2.sort();
            player.draw(list.length);
            var str = list2.sortBySuit()
                .join('');
            player.storage.refenyin_mark = '';
            player.addTempSkill('refenyin_mark');
            player.removeMark('refenyin_mark');
            player.addMark('refenyin_mark', str);
        },
        group: ["refenyin_1"],
        subSkill: {
            mark: {
                onremove: function(player) {
                    delete player.storage.refenyin_mark;
                    delete player.storage.refenyin_mark2;
                    player.removeMark('refenyin_mark');
                },
                intro: {
                    content: function(s, p) {
                        var str = '本回合已经进入过弃牌堆的卡牌的花色：';
                        for (var i = 0; i < s.length; i++) {
                            str += get.translation(s[i]);
                        }
                        str += '<br>本回合进入过弃牌堆的牌数：'
                        str += p.storage.refenyin_mark2;
                        return str;
                    },
                },
                sub: true,
            },
        },
    };
    lib.skill.refenyin_1 = {
        trigger: {
            global: ["loseAfter", "cardsDiscardAfter"],
        },
        forced: true,
        //      silent:true,
        filter: function(event, player) {
            if (player == _status.currentPhase) return true;
            return false;
        },
        content: function() {
            if (player.storage.refenyin_mark2 > 0) {
                var mark = player.storage.refenyin_mark2;
                player.storage.refenyin_1_mark = '';
                player.addTempSkill("refenyin_1_mark");
                player.addMark("refenyin_1_mark", mark)
            }
        },
        subSkill: {
            mark: {
                marktext: '奋音弃牌:',
                intro: {
                    name: '奋音',
                },
                onremove: function(player) {
                    player.unmarkSkill('refenyin_1_mark');
                    delete player.storage.refenyin_1_mark;
                },
                sub: true,
            },
        },
    };
    //曹真 司敌            
    lib.skill.residi_push = {
        trigger: {
            global: "phaseUseBegin",
        },
        direct: true,
        filter: function(event, player) {
            return event.player != player && player.getExpansions('residi')
                .length > 0;
        },
        content: function() {
            'step 0'
            player.chooseButton([get.prompt('residi', trigger.player), player.getExpansions('residi')])
                .set('ai', function(button) {
                var player = _status.event.player;
                var target = _status.event.getTrigger()
                    .player;
                if (get.attitude(player, target) > -1) return 0;
                var card = button.link;
                var color = get.color(button.link, false);
                var eff = target.countCards('h', function(card) {
                    return get.color(card, target) == color && target.hasValueTarget(card);
                });
                if (!target.countCards('h', function(card) {
                    return get.color(card, target) == color && get.name(card, target) == 'sha' && target.hasValueTarget(card);
                })) eff += 1.5;
                if (!target.countCards('h', function(card) {
                    return get.color(card, target) == color && get.type2(card, target) == 'trick' && target.hasValueTarget(card);
                })) eff += 1.5;
                return eff - 1;
            });
            'step 1'
            if (result.bool) {
                if (!trigger.residi) trigger.residi = [];
                trigger.residi.push(player);
                var card = result.links[0];
                var target = trigger.player;
                player.logSkill('residi', target);
                player.loseToDiscardpile(card);
                var color = get.color(card, false);
                if (!target.storage.residi2) target.storage.residi2 = [];
                target.storage.residi2.add(color);
                target.addTempSkill('residi2', 'phaseUseAfter');
                player.storage.residi_push = color == 'red' ? '红色牌' : '黑色牌';
                var cc = player.storage.residi_push
                target.markSkill('residi2', '', '司敌 ' + cc);
                player.addTempSkill('residi3', 'phaseUseAfter');
            }
        },
    }
    //诸葛瞻 父荫
    lib.skill.xinfu_fuyin1 = {
        trigger: {
            global: "phaseZhunbeiBegin",
        },
        forced: true,
        audio: false,
        content: function() {
            player.addSkill("xinfu_fuyin1_mark");
            player.markSkill("xinfu_fuyin1_mark");
        },
        subSkill: {
            mark: {
                marktext: "父荫",
                mark: true,
                intro: {
                    name: '父荫',
                },
                sub: true,
            },
        },
    };
    lib.skill.xinfu_fuyin2 = {
        trigger: {
            target: "useCardToTargeted",
        },
        filter: function(event, player) {
            if ((event.card.name == 'juedou' || event.card.name == 'sha')) return true;
        },
        forced: true,
        audio: false,
        content: function() {
            player.unmarkSkill('xinfu_fuyin1_mark');
        },
    };
    lib.skill.xinfu_fuyin = {
        trigger: {
            target: "useCardToTargeted",
        },
        forced: true,
        audio: 2,
        filter: function(event, player) {
            if (event.player.countCards('h') < player.countCards('h')) return false;
            if (event.card.name != 'sha' && event.card.name != 'juedou') return false;
            return !game.hasPlayer2(function(current) {
                return current.getHistory('useCard', function(evt) {
                    return evt != event.getParent() && evt.card && ['sha', 'juedou'].contains(evt.card.name) && evt.targets.contains(player);
                })
                    .length > 0;
            });
        },
        content: function() {
            trigger.getParent()
                .excluded.add(player);
        },
        group: ["xinfu_fuyin1", "xinfu_fuyin2"],
    }
    //新服朱灵
    lib.skill.dczhanyi = {
        audio: 2,
        trigger: {
            player: "phaseUseBegin",
        },
        direct: true,
        filter: function(event, player) {
            var list = ['basic', 'trick', 'equip'];
            var list2 = [];
            var hs = player.getCards('he');
            for (var card of hs) {
                var type = get.type2(card, player);
                if (list.contains(type)) {
                    var bool = lib.filter.cardDiscardable(card, player, 'dczhanyi');
                    if (bool) list2.add(type);
                    else {
                        list.remove(type);
                        list2.remove(type);
                    }
                }
            }
            return list2.length > 0;
        },
        content: function() {
            'step 0'
            var list = ['basic', 'trick', 'equip'];
            var list2 = [];
            var hs = player.getCards('he');
            for (var card of hs) {
                var type = get.type2(card, player);
                if (list.contains(type)) {
                    var bool = lib.filter.cardDiscardable(card, player, 'dczhanyi');
                    if (bool) list2.add(type);
                    else {
                        list.remove(type);
                        list2.remove(type);
                    }
                }
            }
            player.chooseControl(list2, 'cancel2')
                .set('prompt', get.prompt('dczhanyi'))
                .set('prompt2', '弃置一种类型的所有牌')
                .set('ai', function() {
                var player = _status.event.player;
                var getval = function(control) {
                    if (control == 'cancel2') return 0;
                    var hs = player.getCards('h'),
                        eff = 0;
                    var es = player.getCards('e');
                    var ss = player.getCards('s');
                    var sha = player.getCardUsable({
                        name: 'sha'
                    });
                    for (var i of hs) {
                        var type = get.type2(i);
                        if (type == control) {
                            eff -= get.value(i, player);
                        } else {
                            switch (type) {
                                case 'basic':
                                    if (sha > 0 && get.name(card) == 'sha') {
                                        sha--;
                                        var add = 3;
                                        if (!player.hasValueTarget(card) && player.hasValueTarget(card, false)) add += player.getUseValue(card, false);
                                        eff += add;
                                    }
                                    break
                                case 'trick':
                                    if (player.hasValueTarget(card)) eff += 6;
                                    break;
                                case 'equip':
                                    if (player.hasValueTarget({
                                        name: 'guohe_copy2'
                                    })) eff += player.getUseValue({
                                        name: 'guohe_copy2'
                                    });
                                    break;
                            }
                        }
                    }
                    if (control == 'equip') {
                        for (var i of es) eff -= get.value(i, player);
                    } else {
                        for (var i of ss) {
                            var type = get.type2(i);
                            if (type == control) continue;
                            switch (type) {
                                case 'basic':
                                    if (sha > 0 && get.name(card) == 'sha') {
                                        sha--;
                                        var add = 3;
                                        if (!player.hasValueTarget(card) && player.hasValueTarget(card, false)) add += player.getUseValue(card, false);
                                        eff += add;
                                    }
                                    break
                                case 'trick':
                                    if (player.hasValueTarget(card)) eff += 6;
                                    break;
                                case 'equip':
                                    if (player.hasValueTarget({
                                        name: 'guohe_copy2'
                                    })) eff += player.getUseValue({
                                        name: 'guohe_copy2'
                                    });
                                    break;
                            }
                        }
                    }
                    return eff;
                };
                var controls = _status.event.controls.slice(0);
                var eff = 0,
                    current = 'cancel2';
                for (var i of controls) {
                    var effx = getval(i);
                    if (effx > eff) {
                        eff = effx;
                        current = i;
                    }
                }
                return current;
            });
            'step 1'
            var type = result.control;
            if (type != 'cancel2') {
                event.type = type;
                var cards = player.getCards('he', function(card) {
                    return get.type2(card, player) == type;
                });
                if (cards.length) {
                    player.logSkill('dczhanyi');
                    player.discard(cards);
                } else event.finish();
            } else event.finish();
            'step 2'
            var list = ['basic', 'trick', 'equip'];
            for (var i of list) {
                if (i != event.type) player.addTempSkill('dczhanyi_' + i);
            }
        },
        subSkill: {
            basic: {
                charlotte: true,
                marktext: "战意 基本牌",
                mark: true,
                intro: {
                    content: "使用基本牌无距离限制，且伤害值和回复值基数+1",
                },
                trigger: {
                    source: ["damageBegin1", "recoverBegin"],
                },
                forced: true,
                filter: function(event, player) {
                    var evt = event.getParent();
                    return evt.type == 'card' && get.type(evt.card, false) == 'basic';
                },
                logTarget: "player",
                content: function() {
                    trigger.num++;
                },
                mod: {
                    targetInRange: function(card) {
                        if (get.type(card) == 'basic') return true;
                    },
                },
                ai: {
                    damageBonus: true,
                },
                sub: true,
            },
            trick: {
                charlotte: true,
                marktext: "战意 锦囊牌",
                mark: true,
                intro: {
                    content: "使用锦囊牌时摸一张牌，且锦囊牌不计入本回合的手牌上限",
                },
                trigger: {
                    player: "useCard",
                },
                forced: true,
                filter: function(event, player) {
                    return get.type2(event.card) == 'trick';
                },
                content: function() {
                    player.draw();
                },
                mod: {
                    ignoredHandcard: function(card, player) {
                        if (get.type2(card, player) == 'trick') return true;
                    },
                    cardDiscardable: function(card, player, name) {
                        if (name == 'phaseDiscard' && get.type2(card, player) == 'trick') return false;
                    },
                },
                sub: true,
            },
            equip: {
                charlotte: true,
                marktext: "战意 装备牌",
                mark: true,
                intro: {
                    content: "使用装备牌时，可弃置一名其他角色的一张牌",
                },
                trigger: {
                    player: "useCard",
                },
                direct: true,
                filter: function(event, player) {
                    return get.type(event.card) == 'equip' && game.hasPlayer((target) => (target != player && target.countDiscardableCards(player, 'he') > 0));
                },
                content: function() {
                    'step 0'
                    player.chooseTarget('战意：是否弃置一名其他角色的一张牌？', function(card, player, target) {
                        return target != player && target.countDiscardableCards(player, 'he') > 0;
                    })
                        .set('ai', function(target) {
                        var player = _status.event.player;
                        return get.effect(target, {
                            name: 'guohe_copy2'
                        }, player, player);
                    });
                    'step 1'
                    if (result.bool) {
                        var target = result.targets[0];
                        player.logSkill('dczhanyi_equip', target);
                        player.discardPlayerCard(target, 'he', true);
                    }
                },
                sub: true,
            },
        },
    }
    //伏皇后 惶恐
    lib.skill.rezhuikong = {
        audio: 2,
        trigger: {
            global: "phaseZhunbeiBegin",
        },
        check: function(event, player) {
            if (get.attitude(player, event.player) < -2) {
                var cards = player.getCards('h');
                if (cards.length > player.hp) return true;
                for (var i = 0; i < cards.length; i++) {
                    var useful = get.useful(cards[i]);
                    if (useful < 5) return true;
                    if (get.number(cards[i]) > 7 && useful < 7) return true;
                }
            }
            return false;
        },
        logTarget: "player",
        filter: function(event, player) {
            return player.hp < player.maxHp && player.canCompare(event.player);
        },
        content: function() {
            "step 0"
            player.chooseToCompare(trigger.player)
                .set('small', (player.hp > 1 && get.effect(player, {
                name: 'sha'
            }, trigger.player, player) > 0 && Math.random() < 0.9));
            "step 1"
            if (result.bool) {
                trigger.player.addTempSkill('zishou2');
                trigger.player.addTempSkill('rezhuikong_makr');
                event.finish();
            } else if (result.target && get.position(result.target) == 'd') player.gain(result.target, 'gain2', 'log');
            "step 2"
            var card = {
                name: 'sha',
                isCard: true
            };
            if (trigger.player.canUse(card, player, false)) trigger.player.useCard(card, player, false);
        },
        subSkill: {
            makr: {
                mark: true,
                marktext: '惶恐',
                intro: {
                    name: '你很害怕',
                    content: 'mark'
                },
            },
        },
    };
    //陈到 往烈
    lib.skill.drlt_wanglie2 = {
        mark: true,
        marktext: '往烈',
        intro: {
            name: '不能用牌啦',
            content: 'mark'
        },
        mod: {
            cardEnabled: function(card, player) {
                return false;
            },
        },
    },
    //杨修 鸡肋			
    lib.skill.jilei = {
        trigger: {
            player: "damageEnd",
        },
        audio: 2,
        direct: true,
        filter: function(event) {
            return event.source && event.source.isIn();
        },
        content: function() {
            'step 0'
            player.chooseControl('basic', 'trick', 'equip', 'cancel2', function() {
                var source = _status.event.source;
                if (get.attitude(_status.event.player, source) > 0) return 'cancel2';
                var list = ['basic', 'trick', 'equip'].filter(function(name) {
                    return (!source.storage.jilei2 || !source.storage.jilei2.contains(name));
                });
                if (!list.length) return 'cancel2';
                if (list.contains('trick') && source.countCards('h', function(card) {
                    return get.type(card, source) == 'trick' && source.hasValueTarget(card);
                }) > 1) return 'trick';
                return list[0];
            })
                .set('prompt', get.prompt2('jilei', trigger.source))
                .set('source', trigger.source);
            'step 1'
            if (result.control != 'cancel2') {
                player.logSkill('jilei', trigger.source);
                player.popup(get.translation(result.control) + '牌');
                trigger.source.addTempSkill('jilei2', {
                    player: 'phaseBegin'
                });
                trigger.source.storage.jilei2.add(result.control);
                trigger.source.updateMarks('jilei2');
                if (!trigger.source.storage.jilei3) trigger.source.storage.jilei3 = [];
                var str = '';
                if (result.control == 'trick') str = '锦';
                else if (result.control == 'basic') str = '基';
                else if (result.control == 'equip') str = '装';
                var num = '';
                if (trigger.source.storage.jilei3.indexOf(str) == -1) trigger.source.storage.jilei3 += str;
                if (trigger.source.storage.jilei3.indexOf('基') != -1) num += '基';
                if (trigger.source.storage.jilei3.indexOf('锦') != -1) num += '锦';
                if (trigger.source.storage.jilei3.indexOf('装') != -1) num += '装';
                trigger.source.addTempSkill('jilei2_mark', {
                    player: 'phaseBegin'
                });
                trigger.source.storage.jilei2_mark = '';
                trigger.source.addMark('jilei2_mark', num);
            }
        },
        ai: {
            "maixie_defend": true,
            threaten: 0.7,
        },
    }
    lib.skill.jilei2 = {
        unique: true,
        charlotte: true,
        /*  intro:{
                              content:function(storage){
                                  return '不能使用、打出或弃置'+get.translation(storage)+'牌';
                              },
                          },*/
        init: function(player, skill) {
            if (!player.storage[skill]) player.storage[skill] = [];
        },
        onremove: function(player) {
            player.unmarkSkill('jilei2_mark');
            delete player.storage.jilei2_mark;
            delete player.storage.jilei2;
            delete player.storage.jilei3;
            delete player.storage.gzjilei3;
        },
        /*  mark:true,*/
        /*onremove:true,*/
        mod: {
            cardDiscardable: function(card, player) {
                if (player.storage.jilei2.contains(get.type(card, 'trick'))) return false;
            },
            cardEnabled: function(card, player) {
                if (player.storage.jilei2.contains(get.type(card, 'trick'))) return false;
            },
            cardRespondable: function(card, player) {
                if (player.storage.jilei2.contains(get.type(card, 'trick'))) return false;
            },
            cardSavable: function(card, player) {
                if (player.storage.jilei2.contains(get.type(card, 'trick'))) return false;
            },
        },
        subSkill: {
            mark: {
                mark: true,
                intro: {},
                sub: true,
            },
        },
    }
    lib.skill.gzjilei = {
        inherit: "jilei",
        content: function() {
            'step 0'
            player.chooseControl('basic', 'trick', 'equip', 'cancel2', function() {
                var source = _status.event.source;
                if (get.attitude(_status.event.player, source) > 0) return 'cancel2';
                var list = ['basic', 'trick', 'equip'].filter(function(name) {
                    return (!source.storage.jilei2 || !source.storage.jilei2.contains(name));
                });
                if (!list.length) return 'cancel2';
                if (list.contains('trick') && source.countCards('h', function(card) {
                    return get.type(card, source) == 'trick' && source.hasValueTarget(card);
                }) > 1) return 'trick';
                return list[0];
            })
                .set('prompt', get.prompt2('jilei', trigger.source))
                .set('source', trigger.source)
                .setHiddenSkill('gzjilei');
            'step 1'
            if (result.control != 'cancel2') {
                player.logSkill('gzjilei', trigger.source);
                player.chat(get.translation(result.control) + '牌');
                game.log(player, '声明了', '#y' + get.translation(result.control) + '牌');
                trigger.source.addTempSkill('jilei2', {
                    player: 'phaseBegin'
                });
                trigger.source.storage.jilei2.add(result.control);
                trigger.source.updateMarks('jilei2');
                game.delayx();
                if (!trigger.source.storage.gzjilei3) trigger.source.storage.gzjilei3 = [];
                var str = '';
                if (result.control == 'trick') str = '锦';
                else if (result.control == 'basic') str = '基';
                else if (result.control == 'equip') str = '装';
                var num = '';
                if (trigger.source.storage.gzjilei3.indexOf(str) == -1) trigger.source.storage.gzjilei3 += str;
                if (trigger.source.storage.gzjilei3.indexOf('基') != -1) num += '基';
                if (trigger.source.storage.gzjilei3.indexOf('锦') != -1) num += '锦';
                if (trigger.source.storage.gzjilei3.indexOf('装') != -1) num += '装';
                trigger.source.addTempSkill('jilei2_mark', {
                    player: 'phaseBegin'
                });
                trigger.source.storage.jilei2_mark = '';
                trigger.source.addMark('jilei2_mark', num);
            }
        },
        trigger: {
            player: "damageEnd",
        },
        audio: 2,
        direct: true,
        filter: function(event) {
            return event.source && event.source.isIn();
        },
        ai: {
            "maixie_defend": true,
            threaten: 0.7,
        },
    }
    /*界黄盖 诈降*/
    lib.skill.zhaxiang2 = {
        mark: true,
        marktext: '诈降',
        intro: {
            name: '诈降',
            content: 'mark'
        },
        mod: {
            targetInRange: function(card, player, target, now) {
                if (card.name == 'sha' && get.color(card) == 'red') return true;
            },
            cardUsable: function(card, player, num) {
                if (card.name == 'sha') return num + player.storage.zhaxiang2;
            },
        },
        onremove: true,
        trigger: {
            player: "useCard",
        },
        forced: true,
        filter: function(event, player) {
            return event.card && event.card.name == 'sha' && get.color(event.card) == 'red';
        },
        content: function() {
            trigger.directHit.addArray(game.players);
        },
        ai: {
            "directHit_ai": true,
            skillTagFilter: function(player, tag, arg) {
                return arg.card.name == 'sha' && get.color(arg.card) == 'red';
            },
        },
    },
    //张松 献图
    lib.skill.xiantu = {
        audio: "xiantu1",
        group: "xiantu2",
        trigger: {
            global: "phaseUseBegin",
        },
        filter: function(event, player) {
            return event.player != player;
        },
        logTarget: "player",
        check: function(event, player) {
            if (get.attitude(player, event.player) < 5) return false;
            if (player.maxHp - player.hp >= 2) return false;
            if (player.hp == 1) return false;
            if (player.hp == 2 && player.countCards('h') < 2) return false;
            if (event.player.countCards('h') >= event.player.hp) return false;
            return true;
        },
        content: function() {
            "step 0"
            player.draw(2);
            player.addTempSkill('xiantu_mark');
            "step 1"
            player.chooseCard(2, 'he', true, '交给' + get.translation(trigger.player) + '两张牌')
                .set('ai', function(card) {
                if (ui.selected.cards.length && card.name == ui.selected.cards[0].name) return -1;
                if (get.tag(card, 'damage')) return 1;
                if (get.type(card) == 'equip') return 1;
                return 0;
            });
            "step 2"
            trigger.player.gain(result.cards, player, 'giveAuto');
            trigger.player.addSkill('xiantu4');
            trigger.player.storage.xiantu4.push(player);
        },
        ai: {
            threaten: 1.1,
            expose: 0.3,
        },
        subSkill: {
            mark: {
                mark: true,
                marktext: '献图',
                intro: {},
                sub: true,
            },
        },
    };
    lib.skill.xianghai = {
        audio: 2,
        global: "xianghai_g",
        mark: true,
        marktext: '乡害',
        intro: {},
        mod: {
            cardname: function(card) {
                if (get.type(card, null, false) == 'equip') return 'jiu';
            },
        },
        ai: {
            threaten: 2,
        },
    }
    //岑昏 极奢           
    lib.skill.jishe = {
        audio: 2,
        enable: "phaseUse",
        filter: function(event, player) {
            return player.getHandcardLimit() > 0;
        },
        init: function(player) {
            player.storage.jishe = 0;
        },
        usable: 20,
        content: function() {
            player.draw();
            player.storage.jishe++;
            player.unmarkSkill('jishe_mark');
            var mark = player.getHandcardLimit();
            player.storage.jishe_mark = '';
            player.addTempSkill("jishe_mark");
            player.markSkill("jishe_mark", '', '极奢 ' + mark);
        },
        ai: {
            order: 10,
            result: {
                player: function(player) {
                    if (!player.needsToDiscard(1)) {
                        return 1;
                    }
                    return 0;
                },
            },
        },
        mod: {
            maxHandcard: function(player, num) {
                return num - player.storage.jishe;
            },
        },
        group: [/*"jishe2",*/"jishe3"],
        subSkill: {
            mark: {
                //  mark:true,            
                intro: {},
                sub: true,
                onremove:function(player) {
                    player.storage.jishe=0;
                },
            },
        },
    }
    //曹彰 将驰
    lib.skill.rejiangchi = {
        audio: 2,
        trigger: {
            player: "phaseUseBegin",
        },
        direct: true,
        content: function() {
            "step 0"
            var list = ['弃牌', '摸牌', '取消'];
            if (!player.countCards('he')) list.remove('弃牌');
            player.chooseControl(list, function() {
                var player = _status.event.player;
                if (list.contains('弃牌')) {
                    if (player.countCards('h') > 3 && player.countCards('h', 'sha') > 1) {
                        return '弃牌';
                    }
                    if (player.countCards('h', 'sha') > 2) {
                        return '弃牌';
                    }
                }
                if (!player.countCards('h', 'sha')) {
                    return '摸牌';
                }
                return 'cancel2';
            })
                .set('prompt', get.prompt2('rejiangchi'));
            "step 1"
            if (result.control == '弃牌') {
                player.chooseToDiscard(true, 'he');
                player.addTempSkill('jiangchi2', 'phaseUseEnd');
                player.addTempSkill('rejiangchi_mark', 'phaseUseEnd');
                player.logSkill('rejiangchi');
            } else if (result.control == '摸牌') {
                player.draw();
                player.addTempSkill('rejiangchi3', 'phaseUseEnd');
                player.addTempSkill('rejiangchi_mark2', 'phaseUseEnd');
                player.logSkill('rejiangchi');
            }
        },
        subSkill: {
            mark: {
                mark: true,
                marktext: '将驰 多出杀',
                intro: {},
                sub: true,
            },
            mark2: {
                mark: true,
                marktext: '将驰 不能出杀',
                intro: {},
                sub: true,
            },
        },
    }
    //魏延 奇谋
    lib.skill.qimou = {
        unique: true,
        limited: true,
        audio: 2,
        enable: "phaseUse",
        filter: function(event, player) {
            return !player.storage.qimou;
        },
        init: function(player) {
            player.storage.qimou = false;
        },
        mark: true,
        intro: {
            content: "limited",
        },
        skillAnimation: true,
        animationColor: "orange",
        content: function() {
            'step 0'
            var shas = player.getCards('h', 'sha');
            var num;
            if (player.hp >= 4 && shas.length >= 3) {
                num = 3;
            } else if (player.hp >= 3 && shas.length >= 2) {
                num = 2;
            } else {
                num = 1
            }
            var map = {};
            var list = [];
            for (var i = 1; i <= player.hp; i++) {
                var cn = get.cnNumber(i, true);
                map[cn] = i;
                list.push(cn);
            }
            event.map = map;
            player.awakenSkill('qimou');
            player.storage.qimou = true;
            player.chooseControl(list, function() {
                return get.cnNumber(_status.event.goon, true);
            })
                .set('prompt', '失去任意点体力')
                .set('goon', num);
            'step 1'
            var num = event.map[result.control] || 1;
            player.storage.qimou2 = num;
            player.loseHp(num);
            player.addTempSkill('qimou2');
            player.storage.qimou_mark = '';
            var cc = num;
            player.addTempSkill("qimou_mark");
            player.markSkill("qimou_mark", '', '奇谋 ' + cc);
        },
        subSkill: {
            mark: {
                // mark:true,            
                intro: {},
                sub: true,
            },
        },
        ai: {
            order: 2,
            result: {
                player: function(player) {
                    if (player.hp == 1) return 0;
                    var shas = player.getCards('h', 'sha');
                    if (!shas.length) return 0;
                    var card = shas[0];
                    if (!lib.filter.cardEnabled(card, player)) return 0;
                    if (lib.filter.cardUsable(card, player)) return 0;
                    var mindist;
                    if (player.hp >= 4 && shas.length >= 3) {
                        mindist = 4;
                    } else if (player.hp >= 3 && shas.length >= 2) {
                        mindist = 3;
                    } else {
                        mindist = 2;
                    }
                    if (game.hasPlayer(function(current) {
                        return (current.hp <= mindist - 1 && get.distance(player, current, 'attack') <= mindist && player.canUse(card, current, false) && get.effect(current, card, player, player) > 0);
                    })) {
                        return 1;
                    }
                    return 0;
                },
            },
        },
    }
    lib.skill.dcxianzhu = {
        audio: 2,
        trigger: {
            source: "damageSource",
        },
        direct: true,
        filter: function(event, player) {
            if (!event.card || event.card.name != 'sha') return false;
            var card = player.getEquip('dagongche');
            if (!card) return false;
            var num = 0;
            for (var i = 1; i <= 3; i++) {
                var key = '大攻车选项' + get.cnNumber(i, true);
                if (card.storage[key]) num += card.storage[key];
            }
            return num < 5;
        },
        content: function() {
            'step 0'
            var choiceList = [
                '令【杀】无距离限制且无视防具',
                '令【杀】的可选目标数+1',
                '令后续的弃牌数量+1', ];
            var list = [];
            var card = player.getEquip('dagongche');
            for (var i = 1; i <= 3; i++) {
                var key = '大攻车选项' + get.cnNumber(i, true);
                var num = card.storage[key];
                if (i == 1) {
                    if (!num) list.push('选项一');
                    else choiceList[0] = ('<span style="opacity:0.5; ">' + choiceList[0] + '（已强化）</span>');
                } else {
                    list.push('选项' + get.cnNumber(i, true));
                    if (num) choiceList[i - 1] += ('（已强化' + num + '次）');
                }
            }
            player.chooseControl(list, 'cancel2')
                .set('prompt', '是否发动【陷筑】强化【大攻车】？')
                .set('choiceList', choiceList)
                .set('ai', function() {
                var player = _status.event.player,
                    controls = _status.event.controls.slice(0);
                var getval = function(choice) {
                    var card = player.getEquip('dagongche');
                    if (choice == '选项一') {
                        card.storage.大攻车选项一 = 1;
                        var goon = false;
                        if (game.hasPlayer(function(current) {
                            var eff1 = 0,
                                eff2 = 0;
                            var cardx = {
                                name: 'sha',
                                isCard: true
                            };
                            if (player.canUse(cardx, current)) eff1 = get.effect(current, cardx, player, player);
                            cardx.storage = {
                                dagongche: true
                            };
                            if (player.canUse(cardx, current)) eff2 = get.effect(current, cardx, player, player);
                            return (eff2 > eff1);
                        })) goon = true;
                        delete card.storage.大攻车选项一;
                        if (goon) return 5;
                        return 0;
                    } else if (choice == '选项二') {
                        var num = 1;
                        if (card.storage.大攻车选项二) num += card.storage.大攻车选项二;
                        var cardx = {
                            name: 'sha',
                            isCard: true
                        };
                        if (game.countPlayer(function(current) {
                            return player.canUse(cardx, current) && get.effect(current, cardx, player, player) > 0;
                        }) > num) return 2;
                    } else if (choice == '选项三') return 1;
                    return 0;
                };
                var eff = 0,
                    current = 'cancel2';
                for (var i of controls) {
                    var effx = getval(i);
                    if (effx > eff) {
                        eff = effx;
                        current = i;
                    }
                }
                return current;
            });
            'step 1'
            if (result.control != 'cancel2') {
                player.addMark('dcxianzhu');
                player.logSkill('dcxianzhu');
                var card = player.getEquip('dagongche'),
                    key = '大攻车' + result.control;
                if (!card.storage[key]) card.storage[key] = 0;
                card.storage[key]++;
                lib.skill.dcwanglu.broadcast(player);
            }
            if (card.storage.大攻车选项一 != undefined) {
                player.storage.大攻车选项一 = '已强化'
            } else {
                player.storage.大攻车选项一 = '未强化'
            }
            if (card.storage.大攻车选项二 != undefined) {
                player.storage.大攻车选项二 = card.storage.大攻车选项二;
            }
            if (card.storage.大攻车选项三 != undefined) {
                player.storage.大攻车选项三 = card.storage.大攻车选项三 + 1;
            }
        },
        mark: true,
        init: function(player) {
            player.storage.dcxianzhu = 0, player.storage.大攻车选项一 = '未强化', player.storage.大攻车选项二 = 0, player.storage.大攻车选项三 = 1
        },
        intro: {
            mark: function(dialog, storage, player) {
                if (player.storage.dcxianzhu < 5) {
                    str = '大攻车升级了 :' + "<font color=\"#FFD700\">" + player.storage.dcxianzhu + "<font color=\"#FFFFFF\">" + '次';
                } else {
                    str = '大攻车升级了 :' + "<font color=\"#FF3300\">" + player.storage.dcxianzhu + "<font color=\"#FFFFFF\">" + '次';
                }
                str += '<br>无视距离和防具: '
                str += "<font color=\"#66FF00\">" + player.storage.大攻车选项一 + "<font color=\"#FFFFFF\">";
                str += '<br>额外选择角色: '
                str += "<font color=\"#66FF00\">" + player.storage.大攻车选项二 + "<font color=\"#FFFFFF\">" + '名';
                str += '<br>造成伤害弃置: '
                str += "<font color=\"#66FF00\">" + player.storage.大攻车选项三 + "<font color=\"#FFFFFF\">" + '张牌';
                if (player.getEquip('dagongche')) {
                    return str;
                } else {
                    return '未装备大攻车';
                }
            },
        },
    }
    lib.skill.olzeyue = {
        audio: 2,
        trigger: {
            player: "phaseZhunbeiBegin",
        },
        limited: true,
        skillAnimation: true,
        animationColor: "water",
        direct: true,
        filter: function(event, player) {
            var sources = [],
                history = player.actionHistory;
            for (var i = history.length - 1; i >= 0; i--) {
                if (i < history.length - 1 && history[i].isMe) break;
                for (var evt of history[i].damage) {
                    if (evt.source && evt.source != player && evt.source.isIn()) sources.add(evt.source);
                }
            }
            for (var source of sources) {
                var skills = source.getStockSkills('一！', '五！');
                for (var skill of skills) {
                    var info = get.info(skill);
                    if (info && !info.charlotte && !get.is.locked(skill, source) && source.hasSkill(skill, null, null, false)) return true;
                }
            }
            return false;
        },
        content: function() {
            'step 0'
            var sources = [],
                history = player.actionHistory;
            for (var i = history.length - 1; i >= 0; i--) {
                if (i < history.length - 1 && history[i].isMe) break;
                for (var evt of history[i].damage) {
                    if (evt.source && evt.source != player && evt.source.isIn()) sources.add(evt.source);
                }
            }
            sources = sources.filter(function(source) {
                var skills = source.getStockSkills('一！', '五！');
                for (var skill of skills) {
                    var info = get.info(skill);
                    if (info && !info.charlotte && !get.is.locked(skill, source) && source.hasSkill(skill, null, null, false)) return true;
                }
                return false;
            });
            player.chooseTarget(get.prompt('olzeyue'), '令一名可选角色的一个非锁定技失效', function(card, player, target) {
                return _status.event.sources.contains(target);
            })
                .set('sources', sources)
                .set('ai', function(target) {
                var player = _status.event.player,
                    att = get.attitude(player, target);
                if (att >= 0) return 0;
                return get.threaten(target, player);
            });
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                player.logSkill('olzeyue', target);
                player.awakenSkill('olzeyue');
                event.target = target;
                var skills = target.getStockSkills('一！', '五！');
                skills = skills.filter(function(skill) {
                    var info = get.info(skill);
                    if (info && !info.charlotte && !get.is.locked(skill, target) && target.hasSkill(skill, null, null, false)) return true;
                });
                if (skills.length == 1) event._result = {
                    control: skills[0]
                };
                else player.chooseControl(skills)
                    .set('prompt', '令' + get.translation(target) + '的一个技能失效');
            } else event.finish();
            'step 2'
            var skill = result.control;
            target.disableSkill('olzeyue_' + player.playerid, skill);
            target.storage['olzeyue_' + player.playerid] = true;
            player.addSkill('olzeyue_round');
            player.markAuto('olzeyue_round', [target]);
            if (!player.storage.olzeyue_map) player.storage.olzeyue_map = {};
            player.storage.olzeyue_map[target.playerid] = 0;
            game.log(target, '的技能', '#g【' + get.translation(skill) + '】', '被失效了');
            target.unmarkSkill('olzeyue_mark');
            target.storage.olzeyue_mark = '';
            target.addSkill("olzeyue_mark");
            target.markSkill("olzeyue_mark", '', '迮阅 ' + get.translation(skill));

        },
        ai: {
            threaten: 3,
        },
        subSkill: {
            mark: {
                intro: {},
                sub: true,
            },
            round: {
                trigger: {
                    global: "roundStart",
                },
                forced: true,
                charlotte: true,
                popup: false,
                filter: function(event, player) {
                    var storage = player.getStorage('olzeyue_round');
                    for (var source of storage) {
                        if (source.isIn() && source.canUse('sha', player, false)) return true;
                    }
                    return false;
                },
                content: function() {
                    'step 0'
                    event.targets = player.storage.olzeyue_round.slice(0)
                        .sortBySeat();
                    event.target = event.targets.shift();
                    'step 1'
                    var map = player.storage.olzeyue_map;
                    if (target.storage['olzeyue_' + player.playerid]) map[target.playerid]++;
                    event.num = map[target.playerid] - 1;
                    if (event.num <= 0) event.finish();
                    'step 2'
                    event.num--;
                    target.useCard(player, {
                        name: 'sha',
                        isCard: true
                    }, false, 'olzeyue_round');
                    'step 3'
                    var key = 'olzeyue_' + player.playerid;
                    if (target.storage[key] && player.hasHistory('damage', function(evt) {
                        return evt.card.name == 'sha' && evt.getParent()
                            .type == 'card' && evt.getParent(3) == event;
                    })) {
                        for (var skill in target.disabledSkills) {
                            if (target.disabledSkills[skill].contains(key)) {
                                game.log(target, '恢复了技能', '#g【' + get.translation(skill) + '】');
                                target.removeSkill('olzeyue_mark');
                            }
                        }
                        delete target.storage[key];
                        target.enableSkill(key);
                    }
                    if (event.num > 0 && player.isIn() && target.isIn() && target.canUse('sha', player, false)) {
                        event.goto(2);
                    } else if (event.targets.length > 0) {
                        event.target = event.targets.shift();
                        event.goto(1);
                    }
                },
                sub: true,
            },
        },
        mark: true,
        intro: {
            content: "limited",
        },
        init: function(player, skill) {
            player.storage[skill] = false;
        },
    }
    lib.skill.dcchaixie = {
        audio: 2,
        trigger: {
            player: ["loseAfter"],
            global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
        },
        forced: true,
        filter: function(event, player) {
            var evt = event.getl(player);
            if (!evt || !evt.es || !evt.es.length) return false;
            for (var card of evt.es) {
                if (card.name == 'dagongche') {
                    for (var i = 1; i <= 3; i++) {
                        if (card.storage['大攻车选项' + get.cnNumber(i, true)]) return true;
                    }
                }
            }
            return false;
        },
        content: function() {
            var num = 0;
            var evt = trigger.getl(player);
            for (var card of evt.es) {
                if (card.name == 'dagongche') {
                    for (var i = 1; i <= 3; i++) {
                        var key = '大攻车选项' + get.cnNumber(i, true);
                        if (card.storage[key]) num += card.storage[key];
                    }
                }
            }
            player.draw(num);
            player.storage.大攻车选项一 = '未强化';
            player.storage.大攻车选项二 = 0;
            player.storage.大攻车选项三 = 1;
            player.storage.dcxianzhu = 0;
        },
    }
    //界魏延 奇谋
    lib.skill.reqimou = {
        unique: true,
        limited: true,
        audio: 2,
        enable: "phaseUse",
        filter: function(event, player) {
            return !player.storage.reqimou;
        },
        init: function(player) {
            player.storage.reqimou = false;
        },
        mark: true,
        intro: {
            content: "limited",
        },
        skillAnimation: true,
        animationColor: "orange",
        content: function() {
            'step 0'
            var shas = player.getCards('h', 'sha');
            var num;
            if (player.hp >= 4 && shas.length >= 3) {
                num = 3;
            } else if (player.hp >= 3 && shas.length >= 2) {
                num = 2;
            } else {
                num = 1
            }
            var map = {};
            var list = [];
            for (var i = 1; i <= player.hp; i++) {
                var cn = get.cnNumber(i, true);
                map[cn] = i;
                list.push(cn);
            }
            event.map = map;
            player.awakenSkill('reqimou');
            player.storage.reqimou = true;
            player.chooseControl(list, function() {
                return get.cnNumber(_status.event.goon, true);
            })
                .set('prompt', '失去任意点体力')
                .set('goon', num);
            'step 1'
            var num = event.map[result.control] || 1;
            player.storage.reqimou2 = num;
            player.loseHp(num);
            player.draw(num);
            player.addTempSkill('reqimou2');
            player.storage.reqimou_mark = '';
            var cc = num;
            player.addTempSkill("reqimou_mark");
            player.markSkill("reqimou_mark", '', '奇谋 ' + cc);
        },
        subSkill: {
            mark: {
                // mark:true,            
                intro: {},
                sub: true,
            },
        },
        ai: {
            order: 2,
            result: {
                player: function(player) {
                    if (player.hp == 1) return 0;
                    var shas = player.getCards('h', 'sha');
                    if (!shas.length) return 0;
                    var card = shas[0];
                    if (!lib.filter.cardEnabled(card, player)) return 0;
                    if (lib.filter.cardUsable(card, player)) return 0;
                    var mindist;
                    if (player.hp >= 4 && shas.length >= 3) {
                        mindist = 4;
                    } else if (player.hp >= 3 && shas.length >= 2) {
                        mindist = 3;
                    } else {
                        mindist = 2;
                    }
                    if (game.hasPlayer(function(current) {
                        return (current.hp <= mindist - 1 && get.distance(player, current, 'attack') <= mindist && player.canUse(card, current, false) && get.effect(current, card, player, player) > 0);
                    })) {
                        return 1;
                    }
                    return 0;
                },
            },
        },
    }

    lib.skill.wfyuyan = {
        audio: 2,
        derivation: "refenyin",
        trigger: {
            global: "roundStart",
        },
        forced: true,
        content: function() {
            'step 0'
            var next = player.chooseTarget('请选择【预言】的目标', true)
                .set('animate', false)
                .set('ai', function() {
                return Math.random();
            });
            'step 1'
            if (result.bool) {
                player.storage.wfyuyan = result.targets[0];
                player.addSkill('wfyuyan_dying');
                player.addSkill('wfyuyan_damage');
                if (player == game.me || player.isUnderControl()) {
                    player.unmarkSkill('wfyuyan_mark');
                    player.storage.wfyuyan_mark = '';
                    player.addTempSkill("wfyuyan_mark");
                    player.markSkill("wfyuyan_mark", '', '预言 ' + get.translation(result.targets[0]));
                }
            }
        },
        subSkill: {
            mark: {
                intro: {},
                sub: true,
            },
            dying: {
                trigger: {
                    global: "dying",
                },
                forced: true,
                charlotte: true,
                popup: false,
                content: function() {
                    if (trigger.player == player.storage.wfyuyan) {
                        player.logSkill('wfyuyan', trigger.player);
                        player.addTempSkill('iwasawa_refenyin', {
                            player: 'phaseEnd'
                        });
                    }
                    player.removeSkill('wfyuyan_dying');
                },
                sub: true,
            },
            damage: {
                trigger: {
                    global: "damageSource",
                },
                forced: true,
                popup: false,
                charlotte: true,
                filter: function(event, player) {
                    return event.source && event.source.isIn();
                },
                content: function() {
                    if (trigger.source == player.storage.wfyuyan) {
                        player.logSkill('wfyuyan', trigger.source);
                        player.draw(2);
                    }
                    player.removeSkill('wfyuyan_damage');
                },
                sub: true,
            },
        },
    }
    lib.skill.qinggang2 = {
        firstDo: true,
        ai: {
            "unequip2": true,
        },
        init: function(player, skill) {
            if (!player.storage[skill]) player.storage[skill] = [];
        },
        onremove: true,
        trigger: {
            player: ["damage", "damageCancelled", "damageZero"],
            source: ["damage", "damageCancelled", "damageZero"],
            target: ["shaMiss", "useCardToExcluded", "useCardToEnd"],
            global: ["useCardEnd"],
        },
        charlotte: true,
        filter: function(event, player) {
            return player.storage.qinggang2 && event.card && player.storage.qinggang2.contains(event.card) && (event.name != 'damage' || event.notLink());
        },
        silent: true,
        forced: true,
        popup: false,
        priority: 12,
        content: function() {
            player.storage.qinggang2.remove(trigger.card);
            if (!player.storage.qinggang2.length) player.removeSkill('qinggang2');
        },
    }
    //张星彩 枪舞
    lib.skill.qiangwu = {
        audio: 2,
        enable: "phaseUse",
        usable: 1,
        content: function() {
            "step 0"
            player.judge();
            "step 1"
            player.storage.qiangwu = result.number;
            player.addTempSkill('qiangwu3', 'phaseUseEnd');
            var zz = result.number;
            if (zz == undefined) zz = '';
            else {
                if ([1, 11, 12, 13].contains(zz)) {
                    zz = {
                        '1': 'A',
                        '11': 'J',
                        '12': 'Q',
                        '13': 'K'
                    }[zz];
                }
            }
            player.storage.qiangwu_mark = '';
            player.addTempSkill("qiangwu_mark");
            player.markSkill("qiangwu_mark", '', '枪舞 ' + zz);
        },
        ai: {
            result: {
                player: 1,
            },
            order: 11,
        },
        subSkill: {
            mark: {
                intro: {},
                sub: true,
            },
        },
    }
    //曹植 成章
    lib.skill.chengzhang = {
        trigger: {
            player: "phaseZhunbeiBegin",
        },
        derivation: "rejiushi_mark",
        forced: true,
        unique: true,
        juexingji: true,
        skillAnimation: true,
        animationColor: "water",
        filter: function(event, player) {
            var num = 0;
            player.getAllHistory('sourceDamage', function(evt) {
                num += evt.num;
            });
            if (num >= 7) return true;
            player.getAllHistory('damage', function(evt) {
                num += evt.num;
            });
            return num >= 7;
        },
        content: function() {
            player.unmarkSkill('chengzhang_a');
            player.markSkill('rejiushi_mark');
            player.awakenSkill('chengzhang');
            player.storage.chengzhang = true;
            player.recover();
            player.draw();
        },
        group: ["chengzhang_a"],
    }
    lib.skill.chengzhang_a = {
        marktext: '成章',
        intro: {
            name: '成章',
            content: "当前有#个标记",
        },
        trigger: {
            player: "damageAfter",
            source: "damageSource",
        },
        forced: true,
        content: function() {
            player.addMark('chengzhang_a', trigger.num);
        },
    }
    lib.skill.rejiushi_mark = {
        mark: true,
        marktext: "酒诗 2级",
        intro: {
            content: "当你需要使用【酒】时，若你的武将牌正面向上，你可以翻面，视为使用一张【酒】。当你受到伤害后，若你的武将牌背面向上，你可以翻面。当你翻面时，你获得牌堆中的一张随机锦囊。",
        },
    }
    //花蔓 嬉战
    lib.skill.spxizhan = {
        trigger: {
            global: "phaseBegin",
        },
        forced: true,
        locked: false,
        logTarget: "player",
        filter: function(event, player) {
            return player != event.player;
        },
        content: function() {
            'step 0'
            player.chooseToDiscard('he', '嬉战：弃置一张牌或失去1点体力', '根据弃置的牌对' + get.translation(trigger.player) + '视为使用如下牌：<br>♠，其使用【酒】；♥，你使用【无中生有】<br>♣，对其使用【铁索连环】；♦：对其使用火【杀】')
                .set('ai', function(card) {
                var player = _status.event.player,
                    target = _status.event.getTrigger()
                        .player;
                var suit = get.suit(card, player),
                    list;
                switch (suit) {
                    case 'spade':
                        list = [{
                            name: 'jiu'
                        },
                        target, target];
                        break;
                    case 'heart':
                        list = [{
                            name: 'wuzhong'
                        },
                        player, player];
                        break;
                    case 'club':
                        list = [{
                            name: 'tiesuo'
                        },
                        player, target];
                        break;
                    case 'diamond':
                        list = [{
                            name: 'sha',
                            nature: 'fire'
                        },
                        player, target];
                        break;
                }
                list[0].isCard = true;
                var eff = 0;
                if (list[1].canUse(list[0], list[2], false)) eff = get.effect(list[2], list[0], list[1], player);
                if (eff >= 0 || suit == 'club') eff = Math.max(eff, 5);
                return eff * 1.5 - get.value(card);
            });
            'step 1'
            if (result.bool) {
                player.addTempSkill('spxizhan_spfangzong');
                player.shixiaoSkill('spfangzong');
                var target = trigger.player,
                    card = result.cards[0],
                    suit = get.suit(card, player);
                if ((!target || !target.isIn()) && suit != 'heart') return;
                switch (suit) {
                    case 'spade':
                        target.chooseUseTarget('jiu', true);
                        break;
                    case 'heart':
                        player.chooseUseTarget('wuzhong', true);
                        break;
                    case 'club':
                        if (player.canUse('tiesuo', target)) player.useCard({
                            name: 'tiesuo',
                            isCard: true,
                        }, target);
                        break;
                    case 'diamond':
                        if (player.canUse({
                            name: 'sha',
                            isCard: true,
                            nature: 'fire',
                        }, target, false)) player.useCard({
                            name: 'sha',
                            isCard: true,
                            nature: 'fire',
                        }, target, false);
                        break;
                }
            } else player.loseHp();
        },
        subSkill: {
            spfangzong: {
                mark: true,
                marktext: '芳踪 失效',
                intro: {
                    name: '芳踪 失效',
                    content: 'mark',
                },
                charlotte: true,
                sub: true,
                onremove: function(player) {
                    player.unshixiaoSkill("spfangzong");
                },
            },
        },
    };
    //手杀朱然 胆守
    lib.skill.mobiledanshou = {
        trigger: {
            global: "phaseJieshuBegin",
        },
        audio: 2,
        direct: true,
        filter: function(event, player) {
            if (player == event.player) return false;
            var num = event.player.getHistory('useCard', function(evt) {
                return evt.targets.contains(player);
            })
                .length;
            return num == 0 || event.player.isAlive() && num <= player.countCards('he');
        },
        content: function() {
            'step 0'
            var num = trigger.player.getHistory('useCard', function(evt) {
                return evt.targets.contains(player);
            })
                .length;
            event.num = num;
            if (num == 0) {
                if (player.hasSkill('mobiledanshou')) event._result = {
                    bool: true
                };
                else player.chooseBool('是否发动【胆守】摸一张牌？', lib.translate.mobiledanshou_info);
            } else event.goto(2);
            'step 1'
            if (result.bool) {
                player.logSkill('mobiledanshou');
                player.draw();
            }
            event.finish();
            'step 2'
            player.chooseToDiscard(num, get.prompt('mobiledanshou', trigger.player), '弃置' + get.translation(num) + '张牌并对其造成1点伤害', 'he')
                .set('ai', function(card) {
                if (!_status.event.goon) return 0;
                var num = _status.event.getParent()
                    .num;
                if (num == 1) return 8 - get.value(card);
                if (num == 2) return 6.5 - get.value(card);
                return 5 - get.value(card);
            })
                .set('goon', get.damageEffect(trigger.player, player, player) > 0)
                .logSkill = ['mobiledanshou', trigger.player];
            'step 3'
            if (result.bool) {
                player.addExpose(0.2);
                trigger.player.damage();
            }
        },
        group: ["mobiledanshou_cc"],
    };
    lib.skill.mobiledanshou_cc = {
        trigger: {
            target: "useCardToTarget",
        },
        forced: true,
        content: function() {
            var num = trigger.player.getHistory('useCard', function(evt) {
                return evt.targets.contains(player) && trigger.player != player;
            })
                .length;
            event.num = num;
            if (num > 0) {
                player.unmarkSkill('mobiledanshou_cc_mark');
                player.storage.mobiledanshou_cc_mark = '';
                player.addTempSkill('mobiledanshou_cc_mark');
                player.markSkill('mobiledanshou_cc_mark', '', '胆守 ' + num);
            }
        },
        subSkill: {
            mark: {
                intro: {
                    name: '胆守',
                },
                sub: true,
            },
        },
    };
    //樊玉凤 醮影             
    lib.skill.jiaoying = {
        audio: 2,
        trigger: {
            source: "gainEnd",
        },
        forced: true,
        filter: function(event, player) {
            if (player == event.player) return false;
            var evt = event.getl(player);
            return evt && evt.hs && evt.hs.length;
        },
        logTarget: "player",
        content: function() {
            var target = trigger.player;
            if (!target.storage.jiaoying2) target.storage.jiaoying2 = [];
            var cs = trigger.getl(player)
                .hs;
            for (var i of cs) target.storage.jiaoying2.add(get.color(i, player));
            player.storage.jiaoying5 = target.storage.jiaoying2 == 'red' ? '' : '黑';
            player.storage.jiaoying6 = target.storage.jiaoying2 == 'black' ? '' : '红';
            var cc = player.storage.jiaoying5 + player.storage.jiaoying6 + '色牌';
            target.unmarkSkill('jiaoying2');
            target.addTempSkill('jiaoying2');
            target.markSkill('jiaoying2', '', '醮影 ' + cc);
            player.addTempSkill('jiaoying3');
            if (!player.storage.jiaoying3) player.storage.jiaoying3 = [];
            player.storage.jiaoying3.add(target);
        },
        ai: {
            "directHit_ai": true,
            skillTagFilter: function(player, tag, arg) {
                var target = arg.target;
                if (target.getStorage('jiaoying2')
                    .contains('red') && get.tag(arg.card, 'respondShan') && !target.hasSkillTag('respondShan', true, null, true)) return true;
                return false;
            },
        },
    }
    //祢衡 狂才
    lib.skill.kuangcai = {
        audio: 2,
        trigger: {
            player: "phaseUseBegin",
        },
        filter: function(event, player) {
            return !event.player.isMad();
        },
        content: function() {
            game.broadcastAll(function(player) {
                player.forceCountChoose = {
                    phaseUse: 5
                };
            }, player)
            player.addSkill('kuangcai_use');
            player.addSkill('kuangcai_cancel');
            player.addTempSkill('kuangcai_mark')
            //ui.auto.hide();
        },
        subSkill: {
            use: {
                mod: {
                    cardUsable: function(card) {
                        if (get.info(card) && get.info(card)
                            .forceUsable) return;
                        return Infinity;
                    },
                    targetInRange: function() {
                        return true;
                    },
                    aiOrder: function(player, card, num) {
                        var name = get.name(card);
                        if (name == 'tao') return num + 7 + Math.pow(player.getDamagedHp(), 2);
                        if (name == 'sha') return num + 6;
                        if (get.subtype(card) == 'equip2') return num + get.value(card) / 3;
                    },
                },
                trigger: {
                    player: "useCard",
                },
                forced: true,
                charlotte: true,
                silent: true,
                popup: false,
                onremove: function(player) {
                    player.unmarkSkill('kuangcai_use');
                    delete player.storage.kuangcai_use;
                },
                marktext: '狂才',
                intro: {
                    name: '狂才',
                    content: 'mark'
                },
                filter: function(event, player) {
                    if (!player.forceCountChoose || !player.forceCountChoose.phaseUse) {
                        return false;
                    }
                    return true;
                },
                content: function() {
                    player.unmarkSkill('kuangcai_mark', )
                    player.addMark('kuangcai_use', 1);
                    player.draw();
                    if (player.forceCountChoose.phaseUse == 1) {
                        var evt = event.getParent('phaseUse');
                        if (evt) evt.skipped = true;
                    } else game.broadcastAll(function(player) {
                        player.forceCountChoose.phaseUse--;
                    }, player);
                },
                sub: true,
            },
            cancel: {
                trigger: {
                    player: "phaseUseEnd",
                },
                priority: 50,
                silent: true,
                charlotte: true,
                content: function() {
                    game.broadcastAll(function(player) {
                        delete player.forceCountChoose;
                    }, player);
                    //ui.auto.show();
                    player.removeSkill('kuangcai_use');
                    player.removeSkill('kuangcai_cancel');
                },
                sub: true,
                forced: true,
                popup: false,
            },
            mark: {
                mark: true,
                marktext: '狂才 0',
                intro: {
                    name: '狂才',
                },
                sub: true,
            },
        },
        ai: {
            threaten: 4.5,
        },
    }
    //唐姬 抗歌
    lib.skill.jielie = {
        audio: 2,
        trigger: {
            player: "phaseBegin",
        },
        direct: true,
        filter: function(event, player) {
            return player.phaseNumber == 1 && !player.storage.jielie;
        },
        content: function() {
            'step 0'
            player.chooseTarget('请选择【抗歌】的目标', '其于回合外摸牌后，你摸等量的牌；其进入濒死状态时，你可令其回复体力至1点；其死亡后，你弃置所有牌并失去1点体力', lib.filter.notMe, true)
                .set('ai', function(target) {
                return get.attitude(_status.event.player, target) > 0;
            });
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                player.logSkill('jielie', target);
                player.addSkill('jielie_clear');
                player.storage.jielie = target;
                player.markSkill('jielie', '', '抗歌 ' + get.translation(result.targets[0]));
                game.delayx();
            }
        },
        intro: {
            content: "已指定$为目标",
        },
        group: ["jielie_draw", "jielie_dying", "jielie_die"],
        subSkill: {
            draw: {
                audio: "jielie",
                trigger: {
                    global: "gainAfter",
                },
                forced: true,
                filter: function(event, player) {
                    return player.countMark('jielie_draw') < 3 && event.player == player.storage.jielie && event.player != _status.currentPhase && event.cards && event.cards.length > 0;
                },
                logTarget: "player",
                content: function() {
                    var num = Math.min(3 - player.countMark('jielie_draw'), trigger.cards.length);
                    player.addMark('jielie_draw', num, false);
                    player.draw(num);
                },
                sub: true,
            },
            clear: {
                trigger: {
                    global: "phaseBeginStart",
                },
                forced: true,
                firstDo: true,
                popup: false,
                charlotte: true,
                filter: function(event, player) {
                    return player.countMark('jielie_draw') > 0;
                },
                content: function() {
                    player.removeMark('jielie_draw', player.countMark('jielie_draw'), false);
                },
                sub: true,
            },
            dying: {
                audio: "jielie",
                trigger: {
                    global: "dying",
                },
                logTarget: "player",
                filter: function(event, player) {
                    return event.player == player.storage.jielie && event.player.hp < 1 && !player.hasSkill('jielie_temp');
                },
                check: function(event, player) {
                    return get.attitude(player, event.player) > 0;
                },
                "prompt2": "令其将体力值回复至1点",
                content: function() {
                    trigger.player.recover(1 - trigger.player.hp);
                    player.addTempSkill('jielie_temp', 'roundStart');
                },
                sub: true,
            },
            temp: {
                sub: true,
            },
            die: {
                audio: "jielie",
                trigger: {
                    global: "dieAfter",
                },
                filter: function(event, player) {
                    return event.player == player.storage.jielie;
                },
                forced: true,
                content: function() {
                    var cards = player.getCards('he');
                    if (cards.length) player.discard(cards);
                    player.loseHp();
                },
                sub: true,
            },
        },
        ai: {
            threaten: 2,
        },
    }
    //张翼 执义
    lib.skill.rezhiyi = {
        audio: "zhiyi",
        trigger: {
            global: "phaseJieshuBegin",
        },
        forced: true,
        filter: function(event, player) {
            return player.getHistory('useCard', function(card) {
                return get.type(card.card) == 'basic';
            })
                .length > 0 || player.getHistory('respond', function(card) {
                return get.type(card.card) == 'basic';
            })
                .length > 0;
        },
        content: function() {
            'step 0'
            var list = [];
            player.getHistory('useCard', function(evt) {
                if (get.type(evt.card) != 'basic') return;
                var name = evt.card.name;
                if (name == 'sha') {
                    var nature = evt.card.nature;
                    switch (nature) {
                        case 'fire':
                            name = 'huosha';
                            break;
                        case 'thunder':
                            name = 'leisha';
                            break;
                        case 'kami':
                            name = 'kamisha';
                            break;
                        case 'ice':
                            name = 'icesha';
                            break;
                        case 'stab':
                            name = 'cisha';
                            break;
                    }
                }
                list.add(name);
            });
            player.getHistory('respond', function(evt) {
                if (get.type(evt.card) != 'basic') return;
                var name = evt.card.name;
                if (name == 'sha') {
                    var nature = evt.card.nature;
                    switch (nature) {
                        case 'fire':
                            name = 'huosha';
                            break;
                        case 'thunder':
                            name = 'leisha';
                            break;
                        case 'kami':
                            name = 'kamisha';
                            break;
                        case 'ice':
                            name = 'icesha';
                            break;
                        case 'stab':
                            name = 'cisha';
                            break;
                    }
                }
                list.add(name);
            });
            player.chooseButton(['执义：选择要使用的牌，或点取消摸一张牌', [list.map(function(name) {
                return ['基本', '', name];
            }), 'vcard']], function(button) {
                return _status.event.player.getUseValue({
                    name: button.link[2],
                    nature: button.link[3]
                });
            }, function(button) {
                return _status.event.player.hasUseTarget({
                    name: button.link[2],
                    nature: button.link[3]
                });
            });
            'step 1'
            if (!result.bool) player.draw();
            else player.chooseUseTarget({
                name: result.links[0][2],
                isCard: true,
                nature: result.links[0][3]
            });
        },
        group: ["rezhiyi1"],
    };
    lib.skill.rezhiyi1 = {
        trigger: {
            player: ['respondBegin', 'useCardBegin'],
        },
        filter: function(event, player) {
            if (event.card.name == 'sha' || event.card.name == 'shan' || event.card.name == 'tao' || event.card.name == 'jiu') return true;
        },
        forced: true,
        content: function() {
            player.addTempSkill("rezhiyi1_mark");
        },
        subSkill: {
            mark: {
                marktext: '执义',
                mark: true,
                intro: {
                    name: '执义',
                },
                sub: true,
            },
        },
    }
    //界吕蒙 博图
    lib.skill.rebotu = {
        audio: "botu",
        trigger: {
            player: "phaseJieshuBegin",
        },
        frequent: true,
        filter: function(event, player) {
            if (player.countMark('rebotu_count') >= Math.min(3, game.countPlayer())) return false;
            var suits = [];
            game.getGlobalHistory('cardMove', function(evt) {
                if (suits.length >= 4) return;
                if (evt.name == 'lose') {
                    if (evt.position == ui.discardPile) {
                        for (var i of evt.cards) suits.add(get.suit(i, false));
                    }
                } else {
                    if (evt.name == 'cardsDiscard') {
                        for (var i of evt.cards) suits.add(get.suit(i, false));
                    }
                }
            });
            return suits.length >= 4;
        },
        content: function() {
            player.addTempSkill('rebotu_count', 'roundStart');
            player.addMark('rebotu_count', 1, false);
            player.insertPhase();
        },
        group: "rebotu_mark",
        subSkill: {
            count: {
                onremove: true,
                sub: true,
            },
            mark: {
                trigger: {
                    global: ["loseAfter", "cardsDiscardAfter"],
                    player: "phaseAfter",
                },
                forced: true,
                firstDo: true,
                silent: true,
                filter: function(event, player) {
                    if (event.name == 'phase') return true;
                    if (player != _status.currentPhase) return false;
                    if (event.name == 'lose') return event.position == ui.discardPile;
                    return true;
                },
                content: function() {
                    if (trigger.name == 'phase') {
                        player.unmarkSkill('rebotu_mark');
                        return;
                    }
                    var suits = [];
                    game.getGlobalHistory('cardMove', function(evt) {
                        if (suits.length >= 4) return;
                        if (evt.name == 'lose') {
                            if (evt.position == ui.discardPile) {
                                for (var i of evt.cards) suits.add(get.suit(i, false));
                            }
                        } else {
                            if (evt.name == 'cardsDiscard') {
                                for (var i of evt.cards) suits.add(get.suit(i, false));
                            }
                        }
                    });
                    player.storage.rebotu_mark = suits;
                    //     player.markSkill('rebotu_mark');                 
                    var str = '';
                    str = player.storage.rebotu_mark.sortBySuit()
                        .join('');
                    //    player.unmarkSkill('rebotu_mark2');
                    player.addTempSkill("rebotu_mark2");
                    player.storage.rebotu_mark2 = '';
                    //       player.removeMark('rebotu_mark2')
                    player.addMark('rebotu_mark2', str)
                    //  player.markSkill("rebotu_mark2", '', '博图 ' + str);
                },
                intro: {
                    onunmark: true,
                    content: "本回合已有$花色的牌进入过弃牌堆",
                },
                sub: true,
                popup: false,
            },
            mark2: {
                intro: {},
                sub: true,
            },
        },
    }
    // lib.translate.rebotu_mark2='博图';
    //王元姬 谦冲
    lib.skill.xinfu_qianchong = {
        audio: 3,
        mod: {
            targetInRange: function(card, player, target) {
                if (player.storage.xinfu_qianchong.contains(get.type(card, 'trick'))) {
                    return true;
                }
            },
            cardUsable: function(card, player, num) {
                if (player.storage.xinfu_qianchong.contains(get.type(card, 'trick'))) return Infinity;
            },
        },
        group: ["xinfu_qianchong_clear", "qc_weimu", "qc_mingzhe"],
        subSkill: {
            clear: {
                sub: true,
                forced: true,
                silent: true,
                popup: false,
                trigger: {
                    player: "phaseAfter",
                },
                content: function() {
                    player.storage.xinfu_qianchong = [];
                },
            },
            mark: {
                intro: {},
                sub: true,
            },
        },
        init: function(event, player) {
            event.storage[player] = [];
        },
        trigger: {
            player: "phaseUseBegin",
        },
        locked: false,
        direct: true,
        filter: function(event, player) {
            var es = player.getCards('e');
            if (!es.length) return true;
            var col = get.color(es[0]);
            for (var i = 0; i < es.length; i++) {
                if (get.color(es[i]) != col) return true;
            }
            return false;
        },
        content: function() {
            'step 0'
            var list = ['basic', 'trick', 'equip', 'cancel2'];
            for (var i = 0; i < player.storage.xinfu_qianchong.length; i++) {
                list.remove(player.storage.xinfu_qianchong[i]);
            }
            if (list.length > 1) {
                player.chooseControl(list)
                    .set('ai', function() {
                    return list[0];
                })
                    .set('prompt', get.prompt('xinfu_qianchong'))
                    .set('prompt2', get.translation('xinfu_qianchong_info'));
            } else event.finish();
            'step 1'
            if (result.control && result.control != 'cancel2') {
                player.logSkill('xinfu_qianchong');
                player.storage.xinfu_qianchong.add(result.control);
                var str = get.translation(result.control) + '牌';
                game.log(player, '声明了', '#y' + str);
                player.popup(str, 'thunder');
                player.storage.xinfu_qianchong_mark = '';
                player.addTempSkill("xinfu_qianchong_mark");
                player.markSkill("xinfu_qianchong_mark", '', '谦冲 ' + str);
            }
        },
    }
    //关索 撷芳
    lib.skill.xiefang = {
        trigger: {
            global: ["dieEnd", "gameDrawEnd"],
        },
        forced: true,
        content: function() {
            var cc = (game.countPlayer(function(current) {
                return current.hasSex('female');
            }));
            player.unmarkSkill('xiefang_mark');
            if (cc > 0) {
                player.storage.xiefang_mark = '';
                player.addSkill("xiefang_mark");
                player.markSkill("xiefang_mark", "", "撷芳- " + cc)
            };
        },
        subSkill: {
            mark: {
                intro: {},
                sub: true,
            },
        },
        mod: {
            globalFrom: function(from, to, distance) {
                return distance - game.countPlayer(function(current) {
                    return current.hasSex('female');
                });
            },
        },
    }
    //鲁芝 清忠
    lib.skill.qingzhongx = {
        audio: "weijing",
        trigger: {
            player: "phaseUseBegin",
        },
        check: function(event, player) {
            if (game.hasPlayer(function(current) {
                return current != player && current.isMinHandcard() && get.attitude(player, current) > 0;
            })) {
                return true;
            }
            if (player.countCards('h') <= 2) return true;
            // if(player.countCards('h')<=3&&!player.countCards('h','shan')) return true;
            //if(player.countCards('h',{type:'basic'})<=1) return true;
            return false;
        },
        content: function() {
            player.draw(2);
            player.addTempSkill('qingzhongx_give');
            player.addTempSkill('qingzhongx_mark');
        },
        subSkill: {
            give: {
                trigger: {
                    player: "phaseUseEnd",
                },
                filter: function(event, player) {
                    return !player.isMinHandcard(true);
                },
                audio: "weijing",
                forced: true,
                content: function() {
                    'step 0'
                    var list = game.filterPlayer(function(current) {
                        return current.isMinHandcard();
                    });
                    if (list.length == 1) {
                        if (list[0] != player) {
                            player.line(list[0], 'green');
                            player.swapHandcards(list[0]);
                        }
                        event.finish();
                    } else {
                        player.chooseTarget(true, '清忠：选择一名手牌最少的角色与其交换手牌', function(card, player, target) {
                            return target.isMinHandcard();
                        })
                            .set('ai', function(target) {
                            return get.attitude(_status.event.player, target);
                        });
                    }
                    'step 1'
                    if (result.bool) {
                        var target = result.targets[0];
                        if (target != player) {
                            player.line(target, 'green');
                            player.swapHandcards(target);
                        }
                    }
                },
                sub: true,
            },
            mark: {
                mark: true,
                marktext: '清忠',
                intro: {
                    name: '清忠',
                    content: 'mark',
                },
                sub: true,
            },
        },
    }
    //蔡贞姬 天音
    lib.skill.tianyin = {
        audio: 2,
        trigger: {
            player: "phaseJieshuBegin",
        },
        forced: true,
        filter: function(event, player) {
            var list = [];
            player.getHistory('useCard', function(evt) {
                list.add(get.type2(evt.card, false));
            });
            for (var i = 0; i < ui.cardPile.childNodes.length; i++) {
                if (!list.contains(get.type2(ui.cardPile.childNodes[i], false))) return true;
            }
            return false;
        },
        content: function() {
            var list = [],
                cards = [];
            player.getHistory('useCard', function(evt) {
                list.add(get.type2(evt.card, false));
            });
            for (var i = 0; i < ui.cardPile.childNodes.length; i++) {
                var type = get.type2(ui.cardPile.childNodes[i], false);
                if (!list.contains(type)) {
                    list.push(type);
                    cards.push(ui.cardPile.childNodes[i])
                };
            }
            player.gain(cards, 'gain2');
        },
        group: ["tianyin1"],
    }
    lib.skill.tianyin1 = {
        trigger: {
            player: 'useCardBegin',
        },
        forced: true,
        audio: false,
        filter: function(event, player) {
            if (event.name == 'phase') return true;
            if (player != _status.currentPhase) return false;
            return true;
        },
        content: function() {
            player.addTempSkill("tianyin1_mark");
            if (!player.storage.tianyin1_mark1) player.storage.tianyin1_mark1 = [];
            var str = '';
            if (get.type(trigger.card) == 'trick') str = '锦';
            if (get.type(trigger.card) == 'delay') str = '锦';
            else if (get.type(trigger.card) == 'basic') str = '基';
            else if (get.type(trigger.card) == 'equip') str = '装';
            var num = '';
            if (player.storage.tianyin1_mark1.indexOf(str) == -1) player.storage.tianyin1_mark1 += str;
            if (player.storage.tianyin1_mark1.indexOf('基') != -1) num += '基';
            if (player.storage.tianyin1_mark1.indexOf('锦') != -1) num += '锦';
            if (player.storage.tianyin1_mark1.indexOf('装') != -1) num += '装';
            player.storage.tianyin1_mark = '';
            player.addMark("tianyin1_mark", num);
        },
        subSkill: {
            mark: {
                marktext: '天音',
                intro: {
                    name: '天音',
                    content: function(storage, player, skill) {
                        return player.storage.tianyin1_mark1;
                    }
                },
                onremove: function(player) {
                    player.removeMark('tianyin1_mark1');
                    delete player.storage.tianyin1_mark1;
                },
            },
        },
    };
    //刘烨 筹略                            
    lib.skill.choulve = {
        audio: 2,
        trigger: {
            player: "phaseUseBegin",
        },
        direct: true,
        filter: function(event, player) {
            return game.hasPlayer(function(current) {
                return current != player && current.countCards('he');
            })
        },
        content: function() {
            'step 0'
            var str = '令一名其他角色交给你一张牌';
            var history = player.getAllHistory('damage', function(evt) {
                return evt.card && evt.card.name && lib.card[evt.card.name];
            })
            if (history.length) event.cardname = history[history.length - 1].card.name;
            if (event.cardname) {
                str += '若其如此做，视为你使用【' + get.translation(event.cardname) + '】';
            }
            var goon = true;
            if (event.cardname) {
                goon = game.hasPlayer(function(current) {
                    return player.canUse(event.cardname, current) && get.effect(current, {
                        name: event.cardname
                    }, player, player) > 0;
                });
            }
            player.chooseTarget(get.prompt('choulve'), str, function(card, player, target) {
                return target != player && target.countCards('he');
            })
                .set('ai', function(target) {
                if (!_status.event.goon) return 0;
                var player = _status.event.player;
                if (get.attitude(player, target) >= 0 && get.attitude(target, player) >= 0) {
                    return Math.sqrt(target.countCards('he'));
                }
                return 0;
            })
                .set('goon', goon);
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                player.logSkill('choulve', target);
                target.chooseCard('he', '是否交给' + get.translation(player) + '一张牌？',
                event.cardname ? ('若如此做，视为' + get.translation(player) +
                    '使用【' + get.translation(event.cardname) + '】') : null)
                    .set('ai', function(card) {
                    if (_status.event.goon) return 7 - get.value(card);
                    return 0;
                })
                    .set('goon', get.attitude(target, player) > 1);
                event.target = target;
            } else {
                event.finish();
            }
            'step 2'
            if (result.bool) {
                event.target.give(result.cards, player);
                if (event.cardname) {
                    player.chooseUseTarget(event.cardname, true, false);
                }
            }
        },
        group: ["choulve1"],
    }
    lib.skill.choulve1 = {
        trigger: {
            player: "damageBegin",
        },
        forced: true,
        filter: function(event, player) {
            return event.card&&event.card.name;
        },
        content: function() {
            var kk = get.translation(trigger.card.name);
            player.storage.choulve1_mark = '';
            player.addSkill("choulve1_mark");
            player.addMark("choulve1_mark", kk);
        },
        subSkill: {
            mark: {
                marktext: "筹略",
                intro: {
                    name: '筹略',
                },
                sub: true,
            },
        },
    };
    //手杀羊祜 明伐
    lib.skill.mingfa = {
        audio: 2,
        trigger: {
            player: "phaseUseBegin",
        },
        direct: true,
        filter: function(event, player) {
            return player.storage.mingfa && player.countCards('h') > 0 && player.getCards('he')
                .contains(player.storage.mingfa) && !player.hasSkillTag('noCompareSource') && game.hasPlayer(function(current) {
                return current != player && player.canCompare(current);
            });
        },
        content: function() {
            'step 0'
            player.unmarkSkill('mingfa_xg');
            event.card = player.storage.mingfa;
            delete player.storage.mingfa;
            player.chooseTarget(get.prompt('mingfa'), '用' + get.translation(event.card) + '和一名其他角色拼点', function(card, player, target) {
                return player.canCompare(target);
            })
                .set('ai', function(target) {
                var player = _status.event.player,
                    card = _status.event.getParent()
                        .card;
                if (card.number > 9 || !target.countCards('h', function(cardx) {
                    return cardx.number >= card.number + 2;
                })) return -get.attitude(player, target) / Math.sqrt(target.countCards('h'));
                return 0;
            });
            'step 1'
            if (result.bool) {
                var target = result.targets[0];
                event.target = target;
                player.logSkill('mingfa', target);
                var next = player.chooseToCompare(target);
                if (!next.fixedResult) next.fixedResult = {};
                next.fixedResult[player.playerid] = event.card;
            } else {
                player.removeGaintag('mingfa');
                event.finish();
            }
            'step 2'
            if (result.bool) {
                player.gainPlayerCard(target, true, 'he');
                if (event.card.number == 1) event.finish();
            } else {
                player.addTempSkill('mingfa_block');
                event.finish();
            }
            'step 3'
            var card = get.cardPile2(function(card) {
                return card.number == event.card.number - 1;
            });
            if (card) player.gain(card, 'gain2');
        },
        group: ["mingfa_choose", "mingfa_add", "mingfa_mark"],
        subSkill: {
            xg: {
                intro: {},
                sub: true,
            },
            block: {
                mod: {
                    playerEnabled: function(card, player, target) {
                        if (player != target) return false;
                    },
                },
                sub: true,
            },
            choose: {
                trigger: {
                    player: "phaseJieshuBegin",
                },
                direct: true,
                filter: function(event, player) {
                    return player.countCards('he') > 0;
                },
                content: function() {
                    'step 0'
                    player.chooseCard('he', get.prompt('mingfa'), '选择展示自己的一张牌')
                        .set('ai', function(card) {
                        return Math.min(13, get.number(card) + 2) / Math.pow(Math.min(2, get.value(card)), 0.25);
                    });
                    'step 1'
                    if (result.bool) {
                        var card = result.cards[0];
                        player.logSkill('mingfa');
                        player.removeGaintag('mingfa');
                        player.addGaintag(card, 'mingfa');
                        player.storage.mingfa = card;
                        player.showCards(card, get.translation(player) + '发动了【明伐】');
                        player.unmarkSkill('mingfa_xg');
                        var xx = get.translation(result.cards[0].name)
                            .slice(0, 2);
                        var cc = get.translation(get.suit(result.cards[0]));
                        var zz = get.number(result.cards[0]);
                        if (zz == undefined) zz = '';
                        else {
                            if ([1, 11, 12, 13].contains(zz)) {
                                zz = {
                                    '1': 'A',
                                    '11': 'J',
                                    '12': 'Q',
                                    '13': 'K'
                                }[zz];
                            }
                        }
                        var xxgg = cc + zz + xx;
                        player.storage.mingfa_xg = '';
                        player.addTempSkill("mingfa_xg", {
                            player: 'phaseZhunbeiBegin'
                        });
                        player.markSkill("mingfa_xg", '', '明伐' + xxgg);
                    }
                },
                sub: true,
            },
            add: {
                trigger: {
                    player: "compare",
                    target: "compare",
                },
                filter: function(event) {
                    return !event.iwhile;
                },
                forced: true,
                locked: false,
                content: function() {
                    if (player == trigger.player) {
                        trigger.num1 += 2;
                        if (trigger.num1 > 13) trigger.num1 = 13;
                    } else {
                        trigger.num2 += 2;
                        if (trigger.num2 > 13) trigger.num2 = 13;
                    }
                    game.log(player, '的拼点牌点数+2')
                },
                sub: true,
            },
            mark: {
                trigger: {
                    player: "gainEnd",
                },
                silent: true,
                firstDo: true,
                filter: function(event, player) {
                    return player.storage.mingfa && event.cards.contains(player.storage.mingfa) && player.getCards('h')
                        .contains(player.storage.mingfa);
                },
                content: function() {
                    player.addGaintag(player.storage.mingfa, 'mingfa');
                },
                sub: true,
                forced: true,
                popup: false,
            },
        },
    }
    //王基 奇制
    lib.skill.qizhi = {
        audio: 2,
        trigger: {
            player: "useCardToPlayered",
        },
        direct: true,
        filter: function(event, player) {
            if (!event.targets) return false;
            if (!event.isFirstTarget) return false;
            if (_status.currentPhase != player) return false;
            var type = get.type(event.card, 'trick');
            if (type != 'basic' && type != 'trick') return false;
            if (event.noai) return false;
            return game.hasPlayer(function(target) {
                return !event.targets.contains(target) && target.countCards('he') > 0;
            });
        },
        content: function() {
            'step 0'
            player.chooseTarget(get.prompt('qizhi'), '弃置一名角色的一张牌，然后其摸一张牌', function(card, player, target) {
                return !_status.event.targets.contains(target) && target.countCards('he') > 0;
            })
                .set('ai', function(target) {
                var player = _status.event.player;
                if (target == player) return 2;
                if (get.attitude(player, target) <= 0) {
                    return 1
                }
                return 0.5;
            })
                .set('targets', trigger.targets);
            'step 1'
            if (result.bool) {
                player.getHistory('custom')
                    .push({
                    qizhi: true
                });
                player.logSkill('qizhi', result.targets);
                player.discardPlayerCard(result.targets[0], true, 'he');
                event.target = result.targets[0];
            } else {
                event.finish();
            }
            'step 2'
            event.target.draw();
            player.addTempSkill('qizhi_mark');
            player.addMark('qizhi_mark', 1);
        },
        subSkill: {
            mark: {
                marktext: '奇制',
                intro: {
                    name: '奇制',
                    content: 'mark',
                },
                onremove: function(player) {
                    player.unmarkSkill('qizhi_mark');
                    delete player.storage.qizhi_mark;
                },
                sub: true,
            },
        },
    }
    //OL羊祜 怀远
    lib.skill.huaiyuan = {
        audio: 2,
        trigger: {
            player: "loseAfter",
            global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
        },
        filter: function(event, player) {
            var evt = event.getl(player);
            if (!evt || !evt.hs || !evt.hs.length) return false;
            if (event.name == 'lose') {
                for (var i in event.gaintag_map) {
                    if (event.gaintag_map[i].contains('huaiyuanx')) return true;
                }
                return false;
            }
            return player.hasHistory('lose', function(evt) {
                if (event != evt.getParent()) return false;
                for (var i in evt.gaintag_map) {
                    if (evt.gaintag_map[i].contains('huaiyuanx')) return true;
                }
                return false;
            });
        },
        forced: true,
        content: function() {
            'step 0'
            var num = 0;
            if (trigger.name == 'lose') {
                for (var i in trigger.gaintag_map) {
                    if (trigger.gaintag_map[i].contains('huaiyuanx')) num++;
                };
            } else player.getHistory('lose', function(evt) {
                if (trigger != evt.getParent()) return false;
                for (var i in evt.gaintag_map) {
                    if (evt.gaintag_map[i].contains('huaiyuanx')) num++;
                }
                return false;
            });
            event.count = num;
            'step 1'
            event.count--;
            player.chooseTarget(true, '请选择【怀远】的目标', '令一名角色执行一项：⒈其的手牌上限+1。⒉其的攻击范围+1。⒊其摸一张牌。')
                .set('ai', function(target) {
                var player = _status.event.player,
                    att = get.attitude(player, target);
                if (att <= 0) return 0;
                if (target.hasValueTarget({
                    name: 'sha'
                }, false) && !target.hasValueTarget({
                    name: 'sha'
                })) att *= 2.2;
                if (target.needsToDiscard()) att *= 1.3;
                return att * Math.sqrt(Math.max(1, 4 - target.countCards('h')));
            });
            'step 2'
            if (result.bool) {
                var target = result.targets[0];
                event.target = target;
                player.line(target, 'green');
                var str = get.translation(target)
                player.chooseControl()
                    .set('choiceList', [
                    '令' + str + '的手牌上限+1',
                    '令' + str + '的攻击范围+1',
                    '令' + str + '摸一张牌', ])
                    .set('ai', function() {
                    var player = _status.event.player,
                        target = _status.event.getParent()
                            .target;
                    if (target.hasValueTarget({
                        name: 'sha'
                    }, false) && !target.hasValueTarget({
                        name: 'sha'
                    })) return 1;
                    if (target.needsToDiscard()) return 0;
                    return 2;
                });
            } else event.finish();
            'step 3'
            if (result.index == 2) target.draw();
            else {
                target.addSkill('huaiyuan_effect' + result.index);
                target.addMark('huaiyuan_effect' + result.index, 1, false);
                game.log(target, '的', '#g' + ['手牌上限', '攻击范围'][result.index], '+1')
                game.delayx();
            }
            if (event.count > 0) event.goto(1);
        },
        group: ["huaiyuan_init", "huaiyuan_die"],
        subSkill: {
            init: {
                trigger: {
                    global: "phaseBefore",
                    player: "enterGame",
                },
                forced: true,
                locked: false,
                filter: function(event, player) {
                    return (event.name != 'phase' || game.phaseNumber == 0) && player.countCards('h') > 0;
                },
                content: function() {
                    var hs = player.getCards('h');
                    if (hs.length) player.addGaintag(hs, 'huaiyuanx');
                },
                sub: true,
            },
            die: {
                trigger: {
                    player: "die",
                },
                direct: true,
                forceDie: true,
                skillAnimation: true,
                animationColor: "water",
                filter: function(event, player) {
                    return player.hasMark('huaiyuan_effect0') || player.hasMark('huaiyuan_effect1');
                },
                content: function() {
                    'step 0'
                    var str = '令一名其他角色',
                        num1 = player.countMark('huaiyuan_effect0'),
                        num2 = player.countMark('huaiyuan_effect1');
                    if (num1 > 0) {
                        str += '手牌上限+';
                        str += num1;
                        if (num2 > 0) str += '且';
                    }
                    if (num2 > 0) {
                        str += '攻击范围+';
                        str += num2;
                    }
                    player.chooseTarget(lib.filter.notMe, get.prompt('huaiyuan'), str)
                        .set('forceDie', true)
                        .set('ai', function(target) {
                        return get.attitude(_status.event.player, target) + 114514;
                    });
                    'step 1'
                    if (result.bool) {
                        var target = result.targets[0];
                        player.logSkill('huaiyuan_die', target);
                        var num1 = player.countMark('huaiyuan_effect0'),
                            num2 = player.countMark('huaiyuan_effect1');
                        if (num1 > 0) {
                            target.addSkill('huaiyuan_effect0');
                            target.addMark('huaiyuan_effect0', num1, false);
                        }
                        if (num2 > 0) {
                            target.addSkill('huaiyuan_effect1');
                            target.addMark('huaiyuan_effect1', num2, false);
                        }
                        game.delayx();
                    }
                },
                sub: true,
            },
            "effect0": {
                charlotte: true,
                onremove: true,
                mod: {
                    maxHandcard: function(player, num) {
                        return num + player.countMark('huaiyuan_effect0');
                    },
                },
                marktext: "上限+",
                intro: {
                    content: "手牌上限+#",
                },
                sub: true,
            },
            "effect1": {
                charlotte: true,
                onremove: true,
                mod: {
                    attackRange: function(player, num) {
                        return num + player.countMark('huaiyuan_effect1');
                    },
                },
                marktext: "距离+",
                intro: {
                    content: "攻击范围+#",
                },
                sub: true,
            },
        },
    }

    //界郭图 急攻
    lib.skill.rejigong = {
        audio: 2,
        direct: true,
        trigger: {
            player: "phaseUseBegin",
        },
        content: function() {
            'step 0'
            player.chooseControl('一张', '两张', '三张', 'cancel2')
                .set('prompt', get.prompt2('rejigong'))
                .set('ai', () => '三张');
            'step 1'
            if (result.control != 'cancel2') {
                player.logSkill('rejigong');
                player.addTempSkill('rejigong2');
                player.addTempSkill('rejigong_mark');
                player.addTempSkill('rejigong_mark2');
                player.draw(1 + result.index);
            }
        },
        subSkill: {
            mark2: {
                mark: true,
                marktext: "急攻 0",
                intro: {},
                sub: true,
            },
            mark: {
                intro: {
                    content: "你的手牌上限为#",
                },
                trigger: {
                    source: "damageSource",
                },
                init: function(player) {
                    player.storage.rejigong_mark = 0;
                },
                onremove: function(player) {
                    player.unmarkSkill('rejigong_mark');
                    delete player.storage.rejigong_mark;
                },
                audio: false,
                forced: true,
                content: function() {
                    player.unmarkSkill('rejigong_mark2')
                    player.addMark('rejigong_mark', trigger.num);

                },
                sub: true,
            },
        },
    }
    //钟繇 活墨
    lib.skill.huomo_a = {
        marktext: '活墨',
        intro: {
            name: '活墨',
            content: 'mark',
        },
        onremove: function(player) {
            player.removeMark('huomo_a1');
            delete player.storage.huomo_a1;
            player.storage.huomo_a;
        },
    }
    lib.skill.huomo_use = {
        enable: 'chooseToUse',
        hiddenCard: function(player, name) {
            return (['sha', 'shan', 'tao', 'jiu'].contains(name) && (!player.storage.huomo || !player.storage.huomo[name]) && player.hasCard(function(card) {
                return get.color(card) == 'black' && get.type(card) != 'basic';
            }, 'he'));
        },
        filter: function(event, player) {
            if (!player.storage.huomo) player.storage.huomo = {};
            if ((!player.storage.huomo.sha && event.filterCard({
                name: 'sha'
            }, player, event)) || (!player.storage.huomo.jiu && event.filterCard({
                name: 'jiu'
            }, player, event)) || (!player.storage.huomo.shan && event.filterCard({
                name: 'shan'
            }, player, event)) || (!player.storage.huomo.tao && event.filterCard({
                name: 'tao'
            }, player, event))) {
                return player.hasCard(function(card) {
                    return get.color(card) == 'black' && get.type(card) != 'basic';
                }, 'he');
            }
            return false;
        },
        chooseButton: {
            dialog: function(event, player) {
                var list = [];
                if (!player.storage.huomo.sha && event.filterCard({
                    name: 'sha'
                }, player, event)) {
                    list.push(['基本', '', 'sha']);
                    for (var j of lib.inpile_nature) list.push(['基本', '', 'sha', j]);
                }
                if (!player.storage.huomo.tao && event.filterCard({
                    name: 'tao'
                }, player, event)) {
                    list.push(['基本', '', 'tao']);
                }
                if (!player.storage.huomo.shan && event.filterCard({
                    name: 'shan'
                }, player, event)) {
                    list.push(['基本', '', 'shan']);
                }
                if (!player.storage.huomo.jiu && event.filterCard({
                    name: 'jiu'
                }, player, event)) {
                    list.push(['基本', '', 'jiu']);
                }
                return ui.create.dialog('活墨', [list, 'vcard'], 'hidden');
            },
            check: function(button) {
                var player = _status.event.player;
                var card = {
                    name: button.link[2],
                    nature: button.link[3]
                };
                if (game.hasPlayer(function(current) {
                    return player.canUse(card, current) && get.effect(current, card, player, player) > 0;
                })) {
                    switch (button.link[2]) {
                        case 'tao':
                            return 5;
                        case 'jiu':
                            return 3.01;
                        case 'shan':
                            return 3.01;
                        case 'sha':
                            if (button.link[3] == 'fire') return 2.95;
                            else if (button.link[3] == 'fire') return 2.92;
                            else return 2.9;
                    }
                }
                return 0;
            },
            backup: function(links, player) {
                return {
                    check: function(card) {
                        return 1 / Math.max(0.1, get.value(card));
                    },
                    filterCard: function(card) {
                        return get.type(card) != 'basic' && get.color(card) == 'black';
                    },
                    viewAs: {
                        name: links[0][2],
                        nature: links[0][3],
                        suit: 'none',
                        number: null,
                        isCard: true,
                    },
                    position: 'he',
                    popname: true,
                    ignoreMod: true,
                    precontent: function() {
                        'step 0'
                        player.logSkill('huomo');
                        var card = event.result.cards[0];
                        event.card = card;
                        player.$throw(card, 1000);
                        game.log(player, '将', card, '置于牌堆顶');
                        event.result.card = {
                            name: event.result.card.name,
                            nature: event.result.card.nature
                        };
                        event.result.cards = [];
                        player.lose(card, ui.cardPile, 'visible', 'insert');
                        if (!player.storage.huomo_a1) player.storage.huomo_a1 = '';
                        var cc = get.translation(event.result.card);
                        var num = '';
                        if (player.storage.huomo_a1.indexOf(cc) == -1) player.storage.huomo_a1 += cc;
                        if (player.storage.huomo_a1.indexOf('杀') != -1) num += '杀';
                        //    if(player.storage.huomo_a1.indexOf('火杀')!=-1)num+='火杀';
                        //     if(player.storage.huomo_a1.indexOf('雷杀')!=-1)num+='雷杀';
                        if (player.storage.huomo_a1.indexOf('桃') != -1) num += '桃';
                        if (player.storage.huomo_a1.indexOf('闪') != -1) num += '闪';
                        if (player.storage.huomo_a1.indexOf('酒') != -1) num += '酒';
                        player.storage.huomo_a = '';
                        player.addTempSkill("huomo_a");
                        player.addMark("huomo_a", num);
                        'step 1'
                        game.delay();
                    },
                }
            },
            prompt: function(links, player) {
                return '将一张黑色非基本牌置于牌堆顶并视为使用一张' + get.translation(links[0][3] || '') + get.translation(links[0][2]);
            }
        },
        ai: {
            order: function() {
                var player = _status.event.player;
                var event = _status.event;
                if (!player.storage.huomo.jiu && event.filterCard({
                    name: 'jiu'
                }, player, event) && get.effect(player, {
                    name: 'jiu'
                }) > 0) {
                    return 3.1;
                }
                return 2.9;
            },
            respondSha: true,
            fireAttack: true,
            respondShan: true,
            skillTagFilter: function(player, tag, arg) {
                if (tag == 'fireAttack') return true;
                if (player.hasCard(function(card) {
                    return get.color(card) == 'black' && get.type(card) != 'basic';
                }, 'he')) {
                    if (!player.storage.huomo) player.storage.huomo = {};
                    if (tag == 'respondSha') {
                        if (arg != 'use') return false;
                        if (player.storage.huomo.sha) return false;
                    } else if (tag == 'respondShan') {
                        if (player.storage.huomo.shan) return false;
                    } else {
                        if (player.storage.huomo.tao && player.storage.huomo.jiu) return false;
                    }
                } else {
                    return false;
                }
            },
            result: {
                player: 1
            }
        }
    }

    //谋黄忠 烈弓			
    lib.skill.sbliegong = {
        audio: 2,
        mod: {
            cardnature: function(card, player) {
                if (!player.getEquip(1) && get.name(card, player) == 'sha') return false;
            },
        },
        trigger: {
            player: "useCardToPlayered",
        },
        filter: function(event, player) {
            return !event.getParent()
                ._sbliegong_player && event.targets.length == 1 && event.card.name == 'sha' && player.getStorage('sbliegong')
                .length > 0;
        },
        "prompt2": function(event, player) {
            var str = '',
                storage = player.getStorage('sbliegong');
            if (storage.length > 1) {
                str += ('展示牌堆顶的' + get.cnNumber(storage.length - 1) + '张牌并增加伤害；且');
            }
            str += ('令' + get.translation(event.target) + '不能使用花色为');
            for (var i = 0; i < storage.length; i++) {
                str += get.translation(storage[i]);
            }
            str += ('的牌响应' + get.translation(event.card));
            return str;
        },
        logTarget: "target",
        check: function(event, player) {
            var target = event.target;
            if (get.attitude(player, target) > 0) return false;
            if (target.hasSkillTag('filterDamage', null, {
                player: player,
                card: event.card,
            })) return false;
            var storage = player.getStorage('sbliegong');
            if (storage.length >= 4) return true;
            if (storage.length < 3) return false;
            if (target.hasShan()) return storage.contains('heart') && storage.contains('diamond');
            return true;
        },
        content: function() {
            var storage = player.getStorage('sbliegong')
                .slice(0);
            var num = storage.length - 1;
            var evt = trigger.getParent();
            if (num > 0) {
                if (typeof evt.baseDamage != 'number') evt.baseDamage = 1;
                var cards = get.cards(num);
                player.showCards(cards.slice(0), get.translation(player) + '发动了【烈弓】');
                while (cards.length > 0) {
                    var card = cards.pop();
                    if (storage.contains(get.suit(card, false))) evt.baseDamage++;
                    ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
                }
                game.updateRoundNumber();
            }
            evt._sbliegong_player = player;
            player.addTempSkill('sbliegong_clear');
            var target = trigger.target;
            target.addTempSkill('sbliegong_block');
            if (!target.storage.sbliegong_block) target.storage.sbliegong_block = [];
            target.storage.sbliegong_block.push([evt.card, storage]);
            //   player.unmarkSkill('sbliegong_mark');
        },
        ai: {
            threaten: 3.5,
            "directHit_ai": true,
            halfneg: true,
            skillTagFilter: function(player, tag, arg) {
                if (arg && arg.card && arg.card.name == 'sha') {
                    var storage = player.getStorage('sbliegong');
                    if (storage.length < 3 || !storage.contains('heart') || !storage.contains('diamond')) return false;
                    var target = arg.target;
                    if (target.hasSkill('bagua_skill') || target.hasSkill('bazhen') || target.hasSkill('rw_bagua_skill')) return false;
                    return true;
                }
                return false;
            },
        },

        group: "sbliegong_count",
        subSkill: {
            mark: {
                intro: {},
                sub: true,
            },
            clear: {
                trigger: {
                    player: "useCardAfter",
                },
                forced: true,
                charlotte: true,
                popup: false,
                filter: function(event, player) {
                    return event._sbliegong_player == player;
                },
                content: function() {
                    player.unmarkSkill('sbliegong');
                    player.unmarkSkill('sbliegong_mark');
                    player.storage.sbliegong = [];
                },
                sub: true,
            },
            block: {
                mod: {
                    cardEnabled: function(card, player) {
                        if (!player.storage.sbliegong_block) return;
                        var suit = get.suit(card);
                        if (suit == 'none') return;
                        var evt = _status.event;
                        if (evt.name != 'chooseToUse') evt = evt.getParent('chooseToUse');
                        if (!evt || !evt.respondTo || evt.respondTo[1].name != 'sha') return;
                        for (var i of player.storage.sbliegong_block) {
                            if (i[1].contains(suit)) return false;
                        }
                    },
                },
                trigger: {
                    player: ["damageBefore", "damageCancelled", "damageZero"],
                    target: ["shaMiss", "useCardToExcluded", "useCardToEnd"],
                    global: ["useCardEnd"],
                },
                forced: true,
                firstDo: true,
                charlotte: true,
                onremove: true,
                filter: function(event, player) {
                    if (!event.card || !player.storage.sbliegong_block) return false;
                    for (var i of player.storage.sbliegong_block) {
                        if (i[0] == event.card) return true;
                    }
                    return false;
                },
                content: function() {
                    var storage = player.storage.sbliegong_block;
                    for (var i = 0; i < storage.length; i++) {
                        if (storage[i][0] == trigger.card) {
                            storage.splice(i--, 1);
                        }
                    }
                    if (!storage.length) player.removeSkill('sbliegong_block');
                },
                sub: true,
            },
            count: {
                trigger: {
                    player: "useCard",
                    target: "useCardToTargeted",
                },
                silent: true,
                forced: true,
                filter: function(event, player, name) {
                    if (name != 'useCard' && player == event.player) return false;
                    var suit = get.suit(event.card);
                    if (!lib.suit.contains(suit)) return false;
                    if (player.storage.sbliegong && player.storage.sbliegong.contains(suit)) return false;
                    return true;
                },
                content: function() {
                    player.markAuto('sbliegong', [get.suit(trigger.card)]);
                    if (!player.storage.sbliegong) player.storage.sbliegong = [];
                    player.storage.sbliegongx = player.storage.sbliegong.sortBySuit()
                        .join('');
                    player.storage.sbliegong_mark = '';
                    player.addMark("sbliegong_mark", player.storage.sbliegongx);
                },
                sub: true,
            },
        },
    };
     lib.skill.ruyijingubang_skill = {
        equipSkill: true,
        enable: "phaseUse",
        usable: 1,
        prompt:'是否发动【如意棒】，改变攻击距离并获得对应效果？',
        content: function () {
            "step 0"
            var listJinGu = ['1', '2', '3', '4', 'cancel2'];
            let choiceList=[                
                '⒈【杀】无次数限制',
                '⒉【杀】的伤害值+1',
                '⒊【杀】不可被响应',
                '⒋【杀】的目标数+1']
            var index = listJinGu.indexOf(player.storage.ruyijingubang_skill.toString());
            listJinGu.splice(index, 1);
            choiceList.splice(index,1)
            player.chooseControl(listJinGu).set('choiceList', choiceList).set('ai', function () {
                if (listJinGu.includes('1')) return '1';

                return '3';
            });
            "step 1"
            if (result.control != 'cancel2') {
                var num = parseInt(result.control);
                player.storage.ruyijingubang_skill = num;
                var card = player.getEquip(1);
                if (card && card.name == 'ruyijingubang') {
                    card.storage.ruyijingubang_skill = num;
                    game.log(player, '将', card, '的攻击范围改为' + num)
                }
                player.markSkill('ruyijingubang_skill');
            } else {
                player.getStat().skill.ruyijingubang_skill--;
            }
        },
        mod: {
            /*attackRange: function (player, range) {
                if (player.storage.ruyijingubang_skill) return range - 3 + player.storage.ruyijingubang_skill;
            },*/
            cardUsable: function (card, player, num) {
                if (player.storage.ruyijingubang_skill == 1 && card.name == 'sha') return Infinity;
            },
        },
        ai: {
            order: 1,
            "directHit_ai": true,
            skillTagFilter: function (player, tag, arg) {
                return player.storage.ruyijingubang_skill == 3;
            },
            effect: {
                player: function (card, player, target, current) {
                    if (get.tag(card, 'damage') > 0 && player != target) {
                        if (player.getStat('skill').ruyijingubang_skill && player.storage.ruyijingubang_skill != 1) return;
                        if (player.hasSkill('dccibei') && !player.hasHistory('useSkill', function (evt) {
                            return evt.skill == 'dccibei' && evt.targets.contains(target);
                        })) {
                            return [1, 3];
                        }
                    }
                },
            },
            result: {
                player: function (player) {
                    if (player.storage.ruyijingubang_skill == 1) {
                        if (!player.hasSha()) return 1;
                        return 0;
                    }
                    else {
                        if (player.hasSha() && player.getCardUsable('sha') <= 0) return 1;
                        return 0;
                    }
                },
            },
        },
        intro: {
            name: "如意金箍棒",
            content: function (storage) {
                if (!storage) storage = 3;
                return '<li>攻击范围：' + storage + '<br><li>' + ['你使用【杀】无次数限制。', '你使用的【杀】伤害+1。', '你使用的【杀】不可被响应。', '你使用【杀】选择目标后，可以增加一个额外目标。'][storage - 1]
            },
        },
        subSkill: {
            backup: {
                sub: true,
            },
        },
    };
    //==========神裁==========//
    lib.skill.shencai = {
        audio: 2,
        enable: 'phaseUse',
        usable: 1,
        filter: function (event, player) {
            var count = player.getStat('skill').shencai;
            if (count && count > player.countMark('shencai')) return false;
            return true;
        },
        filterTarget: lib.filter.notMe,
        onremove: true,
        prompt: '请选择一名其他角色',
        content: function () {
            var next = target.judge();
            next.callback = lib.skill.shencai.contentx;
        },
        ai: {
            order: 8,
            result: { target: -1 },
        },
        contentx: function () {
            var card = event.judgeResult.card;
            var player = event.getParent(2).player;
            var target = event.getParent(2).target;
            var list = [], str = lib.skill.shencai.getStr(card);
            player.gain(card, 'gain2');
            for (var i in lib.skill.shencai.filterx) {
                if (str.indexOf(lib.skill.shencai.filterx[i]) != -1) list.push('shencai_' + i);
            }
            if (list.length) {
                for (var i in lib.skill.shencai.filterx) {
                    var num = target.countMark('shencai_' + i);
                    if (num > 0) {
                        target.removeMark('shencai_' + i, num);
                        target.removeSkill('shencai_' + i);
                    }
                }
                if (target.isIn()) {
                    for (var i of list) {
                        target.addSkill(i);
                        target.addMark(i, 1);
                    }
                }
            }
            else if (target.isIn()) {
                player.gainPlayerCard(target, true, 'hej');
                target.addMark('shencai_death', 1);
                target.addSkill('shencai_death');
            }
        },
        filterx: {
            losehp: '体力',
            weapon: '武器',
            respond: '打出',
            distance: '距离',
        },
        getStr: function (node) {
            var str = '', name = node.name;
            if (lib.translate[name + '_info']) {
                if (lib.card[name].type && lib.translate[lib.card[name].type]) str += ('' + get.translation(lib.card[name].type) + '牌|');
                if (get.subtype(name)) {
                    str += ('' + get.translation(get.subtype(name)) + '|');
                }
                if (lib.card[name] && lib.card[name].addinfomenu) {
                    str += ('' + lib.card[name].addinfomenu + '|');
                }
                if (get.subtype(name) == 'equip1') {
                    var added = false;
                    if (lib.card[node.name] && lib.card[node.name].distance) {
                        var dist = lib.card[node.name].distance;
                        if (dist.attackFrom) {
                            added = true;
                            str += ('攻击范围：' + (-dist.attackFrom + 1) + '|');
                        }
                    }
                    if (!added) {
                        str += ('攻击范围：1|');
                    }
                }
            }
            if (lib.card[name].cardPrompt) {
                str += ('' + lib.card[name].cardPrompt(node) + '|');
            }
            else if (lib.translate[name + '_info']) {
                str += ('' + lib.translate[name + '_info'] + '|');
            }
            if (lib.card[name].yingbian_prompt && get.is.yingbian(node)) {
                if (typeof lib.card[name].yingbian_prompt == 'function') str += ('应变：' + lib.card[name].yingbian_prompt(node) + '|');
                else str += ('应变：' + lib.card[name].yingbian_prompt + '|');
            }
            return str;
        },
        subSkill: {
            losehp: {
                charlotte: true,
                marktext: '笞',
                trigger: { player: 'damageEnd' },
                forced: true,
                content: function () {
                    player.loseHp(trigger.num);
                },
                ai: {
                    effect: {
                        target: function (card, player, target, current) {
                            if (get.tag(card, 'damage') && current < 0) return 1.6;
                        },
                    },
                },
                intro: {
                    name: '神裁 - 体力',
                    name2: '笞',
                    content: '锁定技。当你受到伤害后，你失去等量的体力。',
                    onunmark: true,
                },
            },
            weapon: {
                charlotte: true,
                marktext: '杖',
                trigger: { target: 'useCardToTargeted' },
                forced: true,
                filter: function (event, player) {
                    return event.card.name == 'sha';
                },
                content: function () {
                    trigger.directHit.add(player);
                    game.log(player, '不可响应', trigger.card);
                },
                intro: {
                    name: '神裁 - 武器',
                    name2: '杖',
                    content: '锁定技。当你成为【杀】的目标后，你不能使用牌响应此【杀】。',
                    onunmark: true,
                },
                global: 'shencai_weapon_ai',
            },
            ai: {
                ai: {
                    directHit_ai: true,
                    skillTagFilter: function (player, tag, arg) {
                        if (!arg || !arg.card || arg.card.name != 'sha') return false;
                        if (!arg.target || !arg.target.hasSkill('shencai_weapon')) return false;
                        return true;
                    },
                },
            },
            respond: {
                charlotte: true,
                marktext: '徒',
                trigger: {
                    player: 'loseAfter',
                    global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
                },
                forced: true,
                filter: function (event, player) {
                    if (!player.hasCard(function (card) {
                        return lib.filter.cardDiscardable(card, player, 'shencai_respond');
                    }, 'h')) return false;
                    var evt = event.getParent('shencai_respond');
                    if (evt && evt.player == player) return false;
                    evt = event.getl(player);
                    return evt && evt.hs && evt.hs.length > 0;
                },
                content: function () {
                    var cards = player.getCards('h', function (card) {
                        return lib.filter.cardDiscardable(card, player, 'shencai_respond');
                    });
                    if (cards.length > 0) player.discard(cards.randomGet());
                },
                intro: {
                    name: '神裁 - 打出',
                    name2: '徒',
                    content: '锁定技。当你失去手牌后，你随机弃置一张手牌（不嵌套触发）。',
                    onunmark: true,
                },
            },
            distance: {
                charlotte: true,
                marktext: '流',
                trigger: { player: 'phaseJieshuBegin' },
                forced: true,
                content: function () {
                    player.turnOver();
                },
                intro: {
                    name: '神裁 - 距离',
                    name2: '流',
                    content: '锁定技。结束阶段开始时，你翻面。',
                    onunmark: true,
                },
            },
            death: {
                charlotte: true,
                marktext: '死',
                mod: {
                    maxHandcard: function (player, num) {
                        return num - player.countMark('shencai_death');
                    },
                },
                trigger: { player: 'phaseEnd' },
                forced: true,
                filter: function (event, player) {
                    return player.countMark('shencai_death') > game.countPlayer();
                },
                content: function () {
                    player.die();
                },
                intro: {
                    name: '神裁 - 死',
                    name2: '死',
                    content: '锁定技。你的角色手牌上限-#；回合结束时，若场上存活人数小于#，则你死亡。',
                    onunmark: true,
                },
            },
        },
    };
    //==========神裁==========//
    //==========巡使==========//
    lib.skill.xunshi = {
        audio: 2,
        mod: {
            cardname: function (card) {
                if (lib.skill.xunshi.isXunshi(card) && get.position(card) == 'h') return 'sha';
            },
            cardnature: function (card) {
                if (lib.skill.xunshi.isXunshi(card) && get.position(card) == 'h') return false;
            },
            suit: function (card) {
                if (lib.skill.xunshi.isXunshi(card) && get.position(card) == 'h') return 'none';
            },
            targetInRange: function (card) {
                if (get.color(card) == 'none') return true;
            },
            cardUsable: function (card) {
                if (get.color(card) == 'none') return Infinity;
            },
        },
        isXunshi: function (card) {
            var info = lib.card[card.name];
            if (!info || (info.type != 'trick' && info.type != 'delay')) return false;
            if (info.notarget) return false;
            if (info.selectTarget != undefined) {
                if (Array.isArray(info.selectTarget)) {
                    if (info.selectTarget[0] < 0) return !info.toself;
                    return info.selectTarget[0] != 1 || info.selectTarget[1] != 1;
                }
                else {
                    if (info.selectTarget < 0) return !info.toself;
                    return info.selectTarget != 1;
                }
            }
            return false;
        },
        trigger: { player: 'useCard2' },
        forced: true,
        filter: function (event, player) {
            return get.color(event.card) == 'none';
        },
        content: function () {
            'step 0'
            if (player.countMark('shencai') < 4 && player.hasSkill('shencai', null, null, false)) {
                player.addMark('shencai', 1, false);
                lib.skill.shencai.usable++;
            };
            var level = player.countMark('shencai');
            if (level == 1) {
                lib.translate['shencai_info'] = '出牌阶段限两次，你可以令一名其他角色进行判定且你获得判定牌。若判定牌包含以下内容，其获得（已有标记则改为修改）对应标记：{⒈体力：“笞”标记，每次受到伤害后失去等量体力；⒉武器：“杖”标记，无法响应【杀】；⒊打出：“徒”标记，以此法外失去手牌后随机弃置一张手牌；⒋距离：“流”标记，结束阶段将武将牌翻面}；若判定牌不包含以上内容，该角色获得一个“死”标记且手牌上限-X、X大于场上存活人数的角色回合结束时，其直接死亡（X为其“死”标记数）。';
            } if (level == 2) {
                lib.translate['shencai_info'] = '出牌阶段限三次，你可以令一名其他角色进行判定且你获得判定牌。若判定牌包含以下内容，其获得（已有标记则改为修改）对应标记：{⒈体力：“笞”标记，每次受到伤害后失去等量体力；⒉武器：“杖”标记，无法响应【杀】；⒊打出：“徒”标记，以此法外失去手牌后随机弃置一张手牌；⒋距离：“流”标记，结束阶段将武将牌翻面}；若判定牌不包含以上内容，该角色获得一个“死”标记且手牌上限-X、X大于场上存活人数的角色回合结束时，其直接死亡（X为其“死”标记数）。';
            }
            if (level == 3) {
                lib.translate['shencai_info'] = '出牌阶段限四次，你可以令一名其他角色进行判定且你获得判定牌。若判定牌包含以下内容，其获得（已有标记则改为修改）对应标记：{⒈体力：“笞”标记，每次受到伤害后失去等量体力；⒉武器：“杖”标记，无法响应【杀】；⒊打出：“徒”标记，以此法外失去手牌后随机弃置一张手牌；⒋距离：“流”标记，结束阶段将武将牌翻面}；若判定牌不包含以上内容，该角色获得一个“死”标记且手牌上限-X、X大于场上存活人数的角色回合结束时，其直接死亡（X为其“死”标记数）。';
            }
            if (level == 4) {
                lib.translate['shencai_info'] = '出牌阶段限五次，你可以令一名其他角色进行判定且你获得判定牌。若判定牌包含以下内容，其获得（已有标记则改为修改）对应标记：{⒈体力：“笞”标记，每次受到伤害后失去等量体力；⒉武器：“杖”标记，无法响应【杀】；⒊打出：“徒”标记，以此法外失去手牌后随机弃置一张手牌；⒋距离：“流”标记，结束阶段将武将牌翻面}；若判定牌不包含以上内容，该角色获得一个“死”标记且手牌上限-X、X大于场上存活人数的角色回合结束时，其直接死亡（X为其“死”标记数）。';
            }
            if (trigger.addCount !== false) {
                trigger.addCount = false;
                var stat = player.getStat().card, name = trigger.card.name;
                if (typeof stat[name] == 'number') stat[name]--;
            }
            var info = get.info(trigger.card);
            if (info.allowMultiple == false) event.finish();
            else if (trigger.targets && !info.multitarget) {
                if (!game.hasPlayer(function (current) {
                    return !trigger.targets.contains(current) && lib.filter.targetEnabled2(trigger.card, player, current);
                })) event.finish();
            }
            else event.finish();
            'step 1'
            var prompt2 = '为' + get.translation(trigger.card) + '增加任意个目标'
            player.chooseTarget(get.prompt('xunshi'), function (card, player, target) {
                var player = _status.event.player;
                return !_status.event.targets.contains(target) && lib.filter.targetEnabled2(_status.event.card, player, target);
            }, [1, Infinity]).set('prompt2', prompt2).set('ai', function (target) {
                var trigger = _status.event.getTrigger();
                var player = _status.event.player;
                return get.effect(target, trigger.card, player, player);
            }).set('card', trigger.card).set('targets', trigger.targets);
            'step 2'
            if (result.bool) {
                if (!event.isMine() && !event.isOnline()) game.delayx();
                event.targets = result.targets;
            }
            else {
                event.finish();
            }
            'step 3'
            if (event.targets) {
                player.line(event.targets, 'fire');
                trigger.targets.addArray(event.targets);
            }
        },
    };
    //==========巡使==========//
    //==========奋音==========//
    lib.skill.fenyin = {
        locked: false,
        mod: {
            aiOrder: function (player, card, num) {
                if (typeof card == 'object' && player == _status.currentPhase) {
                    var evt = player.getLastUsed();
                    if (evt && evt.card && get.color(evt.card) != 'none' && get.color(card) != 'none' && get.color(evt.card) != get.color(card)) {
                        return num + 10;
                    }
                }
            },
        },
        audio: 2,
        trigger: {
            player: 'useCard'
        },
        frequent: true,
        //usable:3,
        filter: function (event, player) {
            if (_status.currentPhase != player) return false;
            var evt = player.getLastUsed(1);
            var color2 = get.color(event.card);
            //            player.storage.fenyin_mark = '';
            player.storage.fenyin_mark = color2 == 'red' ? '红' : '黑';
            //          var    str=color2 == 'red' ? '红' : '黑';
            //     player.addMark('fenyin_mark',str);
            player.addTempSkill('fenyin_mark');
            if (!evt) return false;
            var color1 = get.color(evt.card);
            return color1 && color2 && color1 != 'none' && color2 != 'none' && color1 != color2;
        },
        content: function () {
            player.draw();
        },
        ai: {
            threaten: 3,
        },
        subSkill: {
            mark: {
                onremove: true,
                /* function (player) {  
              player.removeMark("fenyin_mark");
                 },*/
                mark: true,
                intro: {
                    content: function (storage, player, skill) {
                        return player.storage.fenyin_mark;
                    }
                }
            },
        },
    };
    //==========奋音==========//
    //==========缮甲==========//
    lib.skill.xinshanjia = {
        group: ["xinshanjia_count", "xinshanjia_mark"],
        locked: false,
        mod: {
            aiValue: function (player, card, num) {
                if ((player.storage.xinshanjia || 0) < 3 && get.type(card) == 'equip' && !get.cardtag(card, 'gifts')) {
                    return num / player.hp;
                }
            },
        },
        subSkill: {
            count: {
                forced: true,
                silent: true,
                popup: false,
                trigger: {
                    player: "loseEnd",
                },
                filter: function (event, player) {
                    return event.cards2 && event.cards2.length > 0;
                },
                content: function () {
                    lib.skill.xinshanjia.sync(player);
                },
                sub: true,
            },
            mark: {
                mark: true,
                marktext: "缮甲 弃牌",
                intro: {},
                init: function (player) { player.addMark('xinshanjia_mark', 3); },
                onremove: function (player) {
                    player.unmarkSkill('xinshanjia_mark');
                },
                sub: true,
            },
            sha:{
                mark:true,
                marktext: "杀次数+1",
                charlotte:true,
                intro:{content:'使用【杀】的次数上限+1'},
                mod:{
                    cardUsable:function(card,player,num){
                        if(card.name=='sha') return num+1;
                    }
                }
            },
            nodis:{
                mark:true,
                marktext: "无距离限制",
                charlotte:true,
                intro:{content:'使用牌无距离限制'},
                mod:{
                    targetInRange:()=>true
                }
            }
        },
        audio: "shanjia",
        trigger: {
            player: "phaseUseBegin",
        },
        // intro:{
        // content:"本局游戏内已失去过#张装备牌",
        // },
        frequent: true,
        sync: function (player) {
            var history = player.actionHistory;
            var num = 0;
            var mm = 3;
            for (var i = 0; i < history.length; i++) {
                for (var j = 0; j < history[i].lose.length; j++) {
                    if (history[i].lose[j].parent.name == 'useCard') continue;
                    num += history[i].lose[j].cards2.filter(function (card) {
                        return get.type(card, false) == 'equip';
                    }).length;
                    mm -= history[i].lose[j].cards2.filter(function (card) {
                        return get.type(card, false) == 'equip';
                    }).length;
                }
            }
            player.storage.xinshanjia = num;
            if (mm > 0) {
                player.storage.xinshanjia_mark = mm;
                player.markSkill('xinshanjia_mark');
            }
            if (mm <= 0) {
                player.unmarkSkill('xinshanjia_mark');
                player.removeSkill('xinshanjia_mark');
            }
            if (num >= 3) { player.removeSkill('xinshanjia_mark'); }

            //  if(num>0) player.markSkill('xinshanjia');
        },
        content:function (){
            'step 0'
            player.draw(3);
            'step 1'
            lib.skill.xinshanjia.sync(player);
            var num=3-player.storage.xinshanjia;
            if(num>0){
                player.chooseToDiscard('he',true,num).ai=get.disvalue;
            }
            'step 2'
            var bool1=true,bool2=true;
            if(result.cards){
                var cards=result.cards;
                for(var i=0;i<result.cards.length;i++){
                    var type=get.type(result.cards[i],'trick',result.cards[i].original=='h'?player:false);
                    if(type=='basic') bool1=false;
                    if(type=='trick') bool2=false;
                }
            }
            if(bool1) player.addTempSkill('xinshanjia_sha','phaseUseAfter');
            if(bool2) player.addTempSkill('xinshanjia_nodis','phaseUseAfter');
            if(bool1&&bool2){
                player.chooseUseTarget({name:'sha'},'是否视为使用一张【杀】？',false);
            }
        },
        ai:{
            threaten:3,
            noe:true,
            reverseOrder:true,
            skillTagFilter:function(player){
                if(player.storage.xinshanjia>2) return false;
            },
            effect:{
                target:function(card,player,target){
                    if(player.storage.xinshanjia<3&&get.type(card)=='equip'&&!get.cardtag(card,'gifts')) return [1,3];
                },
            },
        },
    }
    //==========缮甲==========//
    //==========败移==========//
    lib.skill.baiyi = {
        enable: "phaseUse",
        usable: 1,
        filterTarget: function (card, player, target) {
            return player != target;
        },
        selectTarget: 2,
        limited: true,
        skillAnimation: true,
        filter: function (event, player) {
            return player.isDamaged() && game.players.length > 2;
        },
        multitarget: true,
        multiline: true,
        changeSeat: true,
        // contentBefore:function(){
        // player.$fullscreenpop('败移','thunder');
        // },
        content:function(){
			'step 0'
			player.awakenSkill('baiyi');
			if(lib.config.extension_十周年UI_enable&&lib.config.effect_simashi) {
			    decadeUI.animation.playSpine({ name: 'Ss_SMS_zhuanchang', scale: 1 });
                game.delay(1);
            }
            'step 1'
			game.broadcastAll(function(target1,target2){
				game.swapSeat(target1,target2);
			},targets[0],targets[1]);
			if(lib.config.extension_十周年UI_enable&&lib.config.effect_simashi) {
				targets.forEach(tar=>{
			        tar.createHighLight([[255,255,255],[255,255,0],[255,200,0]],7,{level:3}).style.transition='transform 5s ease-out, opacity 3.5s 0.5s linear';
			        setTimeout(function(){
					    tar.createHighLight([],0,{level:3}).style.transform='scale(1.2)';
                        tar.createHighLight([],0,{level:3}).style.opacity=0;
                    },0);
			    });
			}
		},
        ai: {
            order: 1,
            result: {
                target: function (player, target) {
                    if (player.hasUnknown() && target != player.next && target != player.previous) return 0;
                    var distance = Math.pow(get.distance(player, target, 'absolute'), 2);
                    if (!ui.selected.targets.length) return distance;
                    var distance2 = Math.pow(get.distance(player, ui.selected.targets[0], 'absolute'), 2);
                    return Math.min(0, distance - distance2);
                },
            },
        },
        mark: true,
        intro: {
            content: "limited",
        },
        init: function (player, skill) {
            player.storage[skill] = false;
        },
    }
    //==========败移==========//
    //==========傲才==========//
    lib.skill.aocai = {
        audio: 2,
        audioname: ["gz_zhugeke"],
        enable: ["chooseToUse", "chooseToRespond"],
        hiddenCard: function(player, name) {
            if (player != _status.currentPhase && get.type(name) == 'basic' && lib.inpile.contains(name)) return true;
        },
        filter: function(event, player) {
            if (event.responded || player == _status.currentPhase || event.aocai) return false;
            for (var i of lib.inpile) {
                if (get.type(i) == 'basic' && event.filterCard({
                    name: i
                }, player, event)) return true;
            }
            return false;
        },
        delay: false,
        content: function() {
            "step 0"
            event.cards = get.cards((get.mode() != 'guozhan' && player.countCards('h') == 0) ? 4 : 2);
            player.directgains(event.cards, null, 'aocai');
            "step 1"
            var evt = event.getParent(2);
            evt.set('aocai', true);
            evt.goto(0);
            var next = player.lose(event.cards, ui.cardPile, 'visible', 'insert');
            event.next.remove(next);
            evt.after.unshift(next)
            evt.onresult = function(result) {
                evt.after.remove(next);
                evt.next.unshift(next);

            };
        },
        ai: {
            respondShan: true,
            respondSha: true,
            save: true,
            result: {
                player: function(player) {
                    return 1;
                },
            },
            useful: -1,
            value: -1,
        },
    }
    //==========傲才==========//
    //==========乱击==========//
    lib.skill.new_luanji = { //不知道谁的技能
        audio: "luanji",
        enable: "phaseUse",
        viewAs: {
            name: "wanjian",
        },
        filterCard: function(card, player) {
            if (!player.storage.new_luanji) return true;
            return !player.storage.new_luanji.contains(get.suit(card));
        },
        selectCard: 2,
        position: 'hs',
        filter: function(event, player) {
            return player.countCards('hs', function(card) {
                return !player.storage.new_luanji || !player.storage.new_luanji.contains(get.suit(card));
            }) > 1;
        },
        check: function(card) {
            var player = _status.event.player;
            var targets = game.filterPlayer(function(current) {
                return player.canUse('wanjian', current);
            });
            var num = 0;
            for (var i = 0; i < targets.length; i++) {
                var eff = get.sgn(get.effect(targets[i], {
                    name: 'wanjian'
                }, player, player));
                if (targets[i].hp == 1) {
                    eff *= 1.5;
                }
                num += eff;
            }
            if (!player.needsToDiscard(-1)) {
                if (targets.length >= 7) {
                    if (num < 2) return 0;
                } else if (targets.length >= 5) {
                    if (num < 1.5) return 0;
                }
            }
            return 6 - get.value(card);
        },
        group: ["new_luanji_count", "new_luanji_reset", "new_luanji_respond"],
        subSkill: {
            reset: {
                trigger: {
                    player: "phaseAfter",
                },
                silent: true,
                filter: function(event, player) {
                    return player.storage.new_luanji ? true : false;
                },
                content: function() {
                    delete player.storage.new_luanji;
                },
                sub: true,
                forced: true,
                popup: false,
            },
            count: {
                trigger: {
                    player: "useCard",
                },
                silent: true,
                filter: function(event) {
                    return event.skill == 'new_luanji';
                },
                content: function() {
                    if (!player.storage.new_luanji) {
                        player.storage.new_luanji = [];
                        player.storage.new_luanji_mark = [];
                    }
                    for (var i = 0; i < trigger.cards.length; i++) {
                        player.storage.new_luanji.add(get.suit(trigger.cards[i]));

                        var color = get.suit(trigger.cards[i]);
                        if (!player.storage.new_luanji_mark.contains(color)) player.storage.new_luanji_mark.push(color);
                    }
                    player.storage.new_luanji_mark.sort();
                    var str = '';
                    for (var color of player.storage.new_luanji_mark) {
                        str += get.translation(color);
                    };
                    player.storage.new_luanji_mark2 = '';
                    player.addMark('new_luanji_mark2', str);
                    player.addTempSkill('new_luanji_mark');
                },
                sub: true,
                forced: true,
                popup: false,
            },
            respond: {
                trigger: {
                    global: "respond",
                },
                silent: true,
                filter: function(event) {
                    if (event.player.isUnseen()) return false;
                    return event.getParent(2)
                        .skill == 'new_luanji' && event.player.sameIdentityAs(_status.currentPhase);
                },
                content: function() {
                    trigger.player.draw();
                },
                sub: true,
                forced: true,
                popup: false,
            },
            mark: {
                onremove: function(player) {
                    player.removeMark('new_luanji_mark2');
                },
            },
            mark2: {
                intro: {
                    content: function(storage, player, skill) {
                        var str = '';
                        for (var color of player.storage.new_luanji_mark) {
                            str += get.translation(color);
                        }
                        return str;
                    }
                }
            },
        },
    }
    //==========乱击==========//
    //==========据辽==========//
    lib.skill.juliao = { //不知道是谁的
        mod: {
            globalTo: function(from, to, distance) {
                return distance + game.countGroup() - 1;
            },
        },
        forced: true,
        trigger: {
            global: ['gameStart', 'die']
        },
        content: function() {
            player.storage.juliao = game.countGroup() - 1;
        },
        marktext: '据辽',
        intro: {
            content: '其他角色距离你+#'
        },
    }
    //==========据辽==========//
    //==========拜假==========//
    lib.skill.baijia = { //不用改
        audio: 2,
        audioname: ['tw_beimihu'],
        unique: true,
        derivation: 'bmcanshi',
        juexingji: true,
        ai: {
            combo: 'guju'
        },
        trigger: {
            player: 'phaseZhunbeiBegin'
        },
        forced: true,
        skillAnimation: true,
        animationColor: 'thunder',
        filter: function(event, player) {
            return player.storage.guju >= 7;
        },
        content: function() {
            player.awakenSkill('baijia');
            player.gainMaxHp();
            player.recover();
            var list = game.filterPlayer();
            for (var i = 0; i < list.length; i++) {
                if (list[i] != player && !list[i].hasMark('zongkui_mark')) {
                    list[i].addMark('zongkui_mark', 1);
                    player.line(list[i], 'green');
                }
            }
            player.removeSkill('guju');
            player.addSkill('bmcanshi');
        }
    }
    //==========拜假==========//
    //==========spjungong==========//
    lib.skill.spjungong = {
        enable: "phaseUse",
        filter: function(event, player) {
            var num = (player.getStat('skill')
                .spjungong || 0);
            return (num < player.hp || num <= player.countCards('he')) && !player.hasSkill('spjungong_block');
        },
        filterTarget: function(card, player, target) {
            return target != player && player.canUse('sha', target, false);
        },
        filterCard: true,
        position: "he",
        selectCard: function() {
            var player = _status.event.player,
                num = (player.getStat('skill')
                    .spjungong || 0) + 1;
            if (ui.selected.cards.length || num > player.hp) return num;
            return [0, num];
        },
        check: function(card) {
            return 6 - get.value(card);
        },
        prompt: function() {
            var player = _status.event.player,
                num = get.cnNumber((player.getStat('skill')
                    .spjungong || 0) + 1);
            return '弃置' + num + '张牌或失去' + num + '点体力，视为使用杀';
        },
        content: function() {
            'step 0'
            if (!cards.length) player.loseHp(player.getStat('skill')
                .spjungong || 1);
            player.useCard({
                name: 'sha',
                isCard: true
            }, target, false);
            //        player.storage.spjungong_block='';
            player.addMark("spjungong_block");
            'step 1'
            if (player.hasHistory('sourceDamage', function(evt) {
                var card = evt.card;
                if (!card || card.name != 'sha') return false;
                var evtx = evt.getParent('useCard');
                return evtx.card == card && evtx.getParent() == event;
            })) {
                player.addTempSkill('spjungong_block');
                player.shixiaoSkill('spjungong');
            };
        },
        ai: {
            order: function(item, player) {
                return get.order({
                    name: 'sha'
                }, player) + 1;
            },
            result: {
                target: function(player, target) {
                    if (!ui.selected.cards.length) return 0;
                    return get.effect(target, {
                        name: 'sha'
                    }, player, target);
                },
            },
        },
        subSkill: {
            block: {
                charlotte: true,
                sub: true,
                intro: {
                    content: function(storage, player, skill) {
                        return '啥也没有';
                    }
                },
                onremove: function(player) {
                    var num = player.countMark('spjungong_block');
                    player.removeMark('spjungong_block', num);
                    player.unshixiaoSkill("spjungong");
                },
            },
        },
    }
    //==========spjungong==========//
    game.stopAudio = function() { var audios = document.getElementsByTagName('audio'); for (var i = 0; i < audios.length; i++) { audios[i].pause(); audios[i].remove(); } };
    game.loopAudio = function(audioFile, interval) { setInterval(function() { game.playAudio(audioFile); }, interval * 1000); };
    lib.skill.mbjuejin = {
        mark: true,
        intro: {
            content: "limited"
        },
        audio: 2,
        enable: 'phaseUse',
        limited: true,
        forever: true,
        owner: 'mb_caomao',
        /*precontent: function() {
            game.helaAudio('../extension/十周年UI/audio/effect_caomao_skill.mp3');
        },*/
        content: function() {
            "step 0"
            //然后把这个放进决进技能里的step0里
            //game.stopAudio();
            //game.playAudio('../extension/十周年UI/audio/effect_caomaoBJM.mp3');
            //game.loopAudio('../extension/十周年UI/audio/effect_caomaoBJM.mp3', 52);
            _status.tempMusic='effect_mb_caomao';
            game.playBackgroundMusic();
            var cmFireMap = ui.create.div('.cmFireMap', ui.arena);
            window.EpicFX.showXscwBtn = true;
            var targets = game.filterPlayer();
            player.awakenSkill('mbjuejin');
            //game.playAudio('../extension/十周年UI/audio/effect_caomao_skill.mp3');
            game.helaAudio('../extension/十周年UI/audio/effect_caomao_skill.mp3');
            var cmFireMap = ui.create.div('.cmFireMap', ui.arena);
            decadeUI.animation.playSpine({
                name: 'SS_cmskill',
                speed: 1,
            }, {
                parent: ui.window,
                scale: 1,
                action: 'play',
            });
            game.pause();
            setTimeout(() => {
                game.resume();
            }, 5800);
            game.stopAudio();
            //game.playAudio('../extension/十周年UI/audio/effect_caomaoBJM.mp3');
            //game.loopAudio('../extension/十周年UI/audio/effect_caomaoBJM.mp3', 52);
            //新版两分钟的loop music
            if(get.mode()!='taixuhuanjing') {
                game.playAudio('../extension/十周年UI/audio/effect_caomaoBGM.mp3');
                game.loopAudio('../extension/十周年UI/audio/effect_caomaoBGM.mp3', 142);
            }else {
                game.playAudio('../extension/十周年UI/audio/effect_caomaoBJM.mp3');
            }
            event.list = game.players.slice().sortBySeat(event.player);
            
            var list=[];
            /*if(player.name&&get.character(player.name)[3].includes('mbqianlong')) list.add(player.name);
            if(player.name1&&get.character(player.name1)[3].includes('mbqianlong')) list.add(player.name1);
            if(player.name2&&get.character(player.name2)[3].includes('mbqianlong')) list.add(player.name2);
            if(list.length) list.forEach(name=>player.reinit(name,'mb_epic_caomao'));*/
            //player.changeAvatarTo('mb_caomao','mb_epic_caomao');
            player.changePlayerTo('mb_caomao','mb_epic_caomao');
            var next = game.createEvent('mbqianlong_refresh');
		    next.player = player;
		    next.setContent(lib.skill.mbqianlong.subSkill['5'].content);
            "step 1"
            /*var target = event.list.shift();
            if (target) {
                if (target.hp > 1) {
                    var num = (target.hp - 1);
                    target.changeHp(0 - num);
                    if (target != player) target.changeHujia(num);
                    else target.changeHujia(num + 2);
                } else if (target.hp < 1) {
                    var num = (1 - target.hp);
                    target.change(num);
                    target.changeHujia(num);
                }
                event.redo();
            }*///1血也能拿护甲了孩子
            var target = event.list.shift();
            if (target) {
                var plus=target==player?2:0;
                if (target.hp > 1) {
                    var num = (target.hp - 1);
                    target.changeHp(0 - num);
                    target.changeHujia(num+plus,null,true);
                } else if (target.hp < 1) {
                    var num = (1 - target.hp);
                    target.changeHp(num);
                    target.changeHujia(num+plus,null,true);
                } else if (plus>0) {
                    target.changeHujia(plus,null,true);
                }
                event.redo();
            }
            "step 2"
            //以下是修改玩家开始弃牌
            window.needClearout = true; //这里发送接口
            var cards = [];
            for (var i = 0; i < game.players.length; i++) {
                var hs = game.players[i].getCards("h");
                for (var j = 0; j < hs.length; j++) {
                    if (["shan", "tao", "jiu"].includes(get.name(hs[j]))) {
                        cards.push(hs[j]);
                    }
                }
                game.players[i].discard(cards);
            }

            "step 3"
            cards = [];
            for (var k = 0; k < ui.cardPile.childNodes.length; k++) {
                var card = ui.cardPile.childNodes[k];
                if (["shan", "tao", "jiu"].includes(get.name(card))) {
                    cards.push(card);
                }
            }
            for (var j = 0; j < ui.discardPile.childNodes.length; j++) {
                var card = ui.discardPile.childNodes[j];
                if (["shan", "tao", "jiu"].includes(get.name(card))) {
                    cards.push(card);
                }
            }
            game.cardsGotoSpecial(cards);
            game.log(cards, '被移出了游戏');
            window.needClearout = false; //停止发送
            //这里是播放摧毁闪桃酒骨骼，骨骼是夕酱自己做的（
            game.pause();
            //需要把名字放十周年里的animation.js里
            decadeUI.animation.playSpine({
                name: 'SS_CM_DestoryCard',
                speed: 1.3,
            }, {
                parent: ui.window,
                scale: 0.72,
                x: [0, 0.575],
                action: 'play',
            });
            setTimeout(() => {
                game.resume();
            }, 1000);
            "step 4"
            game.updateRoundNumber();
            //game.sortCard(true);
            game.addGlobalSkill('mbcmxscw');
            game.delay(3);
            //player.swapBackground('mbjuejin');
        },
        ai: {
            threaten: 2.6,
            order:6,
            result:{
                player:function(player) {
                    var disValue=0;
                    game.players.forEach(him=>{
                        if(!him.countCards('h')) return;
                        var cards=him.getCards('h');
                        if(get.attitude(player,him)>2) {
                            cards.forEach(card=>{
                                if(['shan','tao','jiu'].contains(card.name)) disValue-=get.value(card,him);
                            });
                        }else {
                            cards.forEach(card=>{
                                if(['shan','tao','jiu'].contains(card.name)) disValue+=get.value(card,him);
                            });
                        }
                    });
                    if(player.getHp()<=2) disValue+=2;
                    if(player.getHp()<=1) disValue+=3;
                    return disValue-1;
                },
            },
        },
    };
    //曹髦阵亡特效（不用了加到龙血玄黄里面了）
    /*lib.skill._CMzhenwang = {
        trigger: {
            player: "die",
        },
        silent: true,
        charlotte: true,
        forced: true,
		forceDie:true,
        priority: -999999999,
        lastDo: true,
        filter: function(event, player) {
            return player.hasSkill('mbqianlong')&&player==game.me;
        },
        content: function() {
            decadeUI.animation.playSpine({
                name: 'SS_CM_zhenwang',
                speed: 1,
            }, {
                parent: ui.window,
                scale: 1,
                action: 'play',
            });
            //game.playAudio('../extension/十周年UI/audio/effect_caomao_dead.mp3');
            game.pause();
            setTimeout(() => {
                game.resume();
            }, 5300);
        }
    };*/
})