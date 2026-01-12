window.JK = {
  imgPath: {
    wx: "https://gitee.com/wz36125/imagesbed/raw/master/zsm/wx.png",
    zfb: "https://gitee.com/wz36125/imagesbed/raw/master/zsm/zfb.jpg",
  },
  author: "EngJ.K",
}
game.import("extension", function (lib, game, ui, get, ai, _status) {
  return {
    name: "史诗卡牌",
    content: function (config, pack) {
//——————————————————
if(lib.config['extension_史诗卡牌_shichangshi']) {
    if(lib.character['shichangshi']) {
        lib.character['shichangshi'][3]=['k_danggu', 'k_mowang'];
        lib.character['shichangshi'][4].add('ext:史诗卡牌/k_shichangshi.jpg');
    }
}
//以下内容来自缘之空扩展
if(lib.config['extension_史诗卡牌_meihuaskills']) {
let id = Date.now();
lib.skill['_' + id] = {
    trigger: {global: 'gameStart'},
    silent: true,
    lastDo: true,
    extensionName: _status.extension,
    content: shoushaButton,
};

function shoushaButton() {
    let obutton = ui.create.button,
        oadd = lib.element.dialog.add,
        style = document.createElement('style');
    
    style.innerHTML = `
        .card.unselectable[data-vcard=true],
        .card[data-vcard=true]:not(.selectable) {
            opacity: 1 !important;
            filter: grayscale(1);
            -webkit-filter: grayscale(1);
        }
        .dialog-basic, .dialog-trick {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
        }
        .dialog-basic {
            width: 38%;
        }
        .dialog-trick {
            left: 36%;
            width: ${window.decadeUI ? 70 : 68}%;
        }
    `;
    document.head.appendChild(style);
    
    ui.create.button = function (...args) {
        node = obutton.apply(this, args);
        if (args[1] == 'vcard' && args[2] && args[2].classList && 
            args[2].classList.contains('buttons') && 
            args[2].parentNode.classList.contains('content')) 
        {
            let item = args[0];
            if (typeof item == 'string') {
                if (!lib.card[item] || !lib.card[item].enable) return node;
                item = [get.type(item), '', item];
            };
            if (args[2].removeChild) args[2].removeChild(node);
            node = ui.create.card(args[2], 'noclick', args[3]);
            node.init(item);
            node.link = item;
            node.classList.add('button');
            node.classList.add('vcard');
            node.dataset.vcard = true;
            if (!args[3]) {
                node.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.button);
            };
            let name = {
                fire: 'huo' + node.name,
                thunder: 'lei' + node.name,
                ice: 'bing' + node.name,
                stab: 'ci' + node.name
            };
            for (let i in lib.element.button) {
                node[i] = lib.element.button[i];
            };
            for (let key in node.node) {
                if (!window.decadeUI && /background|image/.test(key)) continue;
                if (node.node[key] && node.node[key].classList) {
                    node.node[key].classList.add('forcehide');
                }
            };
            if (node.$name) node.$name.classList.add('forcehide');
            let url = 'extension/' + lib.skill[event.name].extensionName + '/cardTitle/' +
                    (name[node.nature] || ((node.nature || '') + node.name)) + '.png',
                img = new Image();
            img.src = lib.assetURL + url;
            img.node = node;
            img.ourl = (window.decadeUI ? node : node.node.image).style.backgroundImage;
            img.ourl2 = node.style.backgroundImage;
            img.onerror = function () {
                let node = this.node;
                Object.assign(
                    (window.decadeUI ? node : node.node.image).style, {
                        backgroundImage: this.ourl,
                        backgroundPosition: 'center',
                        backgroundSize: '160% 160%',
                        mixBlendMode: 'luminosity'
                    }
                );
                ui.create.div('.--name',
                    node,
                    '<span data-nature = "' + node.nature + '">' +
                    get.translation(node.name) + '</span>' +
                    '<span data-nature = "' + node.nature + '" style = "color: white;-webkit-text-stroke: 0;font-size: ' +
                    (document.body.offsetWidth / 100 * 1 + 'px') + ';" >' + get.translation(node.nature) +
                    '</span>', {
                        right: '5px',
                        bottom: '-10%',
                        fontSize: document.body.offsetWidth / 100 *
                            (get.translation(node.name).length < 2 ? 3 : (window.decadeUI ? 1.5 : 2)) + 'px',
                        fontWeight: 900,
                        fontFamily: 'shousha',
                        webkitTextStroke: '.5px white',
                        color: 'black'
                    }
                );
                node.style.background = this.ourl2;
            };
            Object.assign(node.style, {
                width: document.body.offsetWidth / 100 * (window.decadeUI ? 9 : 10) + 'px',
                height: document.body.offsetWidth / 100 * 5 + 'px',
                background: 'none',
                boxShadow: 'none',
            });
            if (window.decadeUI ? node : node.node.image)
                (window.decadeUI ? node : node.node.image).setBackgroundImage(url);
        };
        return node;
    };
    
    window.epicCards = [];
    game.getFileList('extension/史诗卡牌/cardTitle', function (folders, files) {
        for (var i = 0; i < files.length; i++) {
            window.epicCards.add(files[i].slice(0, -4));
        }
    });
    
    lib.element.dialog.add = function (...args) {
        var result = oadd.apply(this, args),
            buttons = this.querySelectorAll('.buttons');
        //标记dialog.noPre可以跳回原版
        //或者在描述里添加[$noPreCards]也行，用于chooseButton
        if(this.noPre) return result;
        if(this.classList.contains('xdialog')) return result;
        
        if (args[0] && args[0][1] == 'vcard' &&
            buttons && buttons.length &&
            this.classList.contains('dialog')) 
        {
            buttons = buttons[buttons.length - 1];
            let cardsb = Array.from(buttons.children).slice(0);
            var oldDialog = false;
            for (var i = 0; i < cardsb.length; i++) {
                if (window.epicCards && !window.epicCards.contains(cardsb[i].name)) {
                    oldDialog = true;
                    break;
                }
            }
            if (oldDialog) {
                return result;
            }
            
            let cards = Array.from(buttons.children).slice(0).filter(function (card) {
                    return card.classList.contains('button');
                }),
                basic = ui.create.div('.dialog-basic', buttons),
                trick = ui.create.div('.dialog-trick', buttons),
                bool = cards.some(function (card) {
                    return get.type(card) == 'basic';
                }),
                bool2 = cards.some(function (card) {
                    return !/basic|equip/.test(get.type(card));
                });
            
            if (!bool) basic.remove();
            if (!bool2) trick.remove();
            if ((!bool && !bool2) || cards.every(function (card) {
                return !lib.card[card.name] || !lib.card[card.name].enable;
            })) return result;
            
            cards.forEach(function (card) {
                buttons.removeChild(card);
            });
            this.buttons.removeArray(cards);
            
            // 保留原始宽度设置
            this.style.width = document.body.offsetWidth / 100 * 90 + 'px';
            this.style.left = '4%';
            buttons.style.width = document.body.offsetWidth / 100 * 66 + 'px';
            //Helasisy渐变显示
            buttons.style.opacity=0;
            
            // 高度自适应+滚动支持
            buttons.style.height = 'auto';
            //buttons.style.minHeight = document.body.offsetHeight / 100 * 40 + 'px';
            //buttons.style.maxHeight = '40vh';
            // 计算4行高度（每行高度为按钮高度 + 边距）
            const buttonHeight = document.body.offsetWidth / 100 * 5;
            const rowHeight = buttonHeight + 10 + 2; // 10px 边距
            
            // 设置高度
            buttons.style.minHeight = rowHeight * 3 + 'px'; // 刚好3行高度，好吧目前只有这个生效
            buttons.style.maxHeight = rowHeight * 4 + 'px'; // 刚好4行高度
            buttons.style.overflowY = 'auto';
            
            ui.update();
            
            for (let name of lib.inpile) {
                if (get.type(name) == 'equip' ||
                    (get.type(name) == 'delay' &&
                    !cards.some(function (card) {
                        return get.type(card) == 'delay';
                    }))) continue;
                
                let card = cards.filter(function (card) {
                    return card.name == name && !card.nature;
                })[0],
                    button = ui.create.button([get.type(name), '', name], 'vcard', buttons);
                
                if (card) {
                    button.classList.add('selectable');
                    this.buttons.push(button);
                };
                
                if (name == 'sha') {
                    for (var nature of lib.inpile_nature) {
                        let button = ui.create.button([get.type(name), '', name, nature], 'vcard', buttons);
                        if (cards.filter(function (card) {
                            return card.name == name && card.nature == nature;
                        })[0]) this.buttons.push(button);
                    };
                };
            };
            
            while (cards.length) {
                let card = cards.shift();
                if (card && !this.buttons.some(function (cardx) {
                    return card.name == cardx.name && card.nature == cardx.nature;
                })) {
                    let button = ui.create.button(
                        [get.type(card.name), '',
                            card.name, card.nature],
                        'vcard',
                        buttons
                    );
                    button.classList.add('selectable');
                    this.buttons.push(button);
                };
            };
            
            for (let card of Array.from(buttons.children).slice(0)) {
                if (!card.classList.contains('button')) continue;
                let type = get.type(card.name);
                switch (type) {
                    case 'basic':
                        basic.appendChild(card);
                        break;
                    case 'equip':
                        card.remove();
                        break;
                    default:
                        trick.appendChild(card);
                };
            };
            
            // 保留原始位置调整逻辑
            setTimeout(function (){
                if (!bool) 
                {
                    trick.style.left = (buttons.clientWidth - trick.clientWidth) / 2 + 'px';                
                } 
                else if (!bool2) 
                {                    
                    basic.style.left = (buttons.clientWidth - basic.clientWidth) / 2 + 'px';                
                };
                //Helasisy渐变显示
                setTimeout(function (){
                    buttons.style.opacity=1;
                },100);
            }, 300);
        };
        return result;
    };
};

lib.skill.reguhuo={
    audio: 2,
        derivation: 'rechanyuan',
            enable: ['chooseToUse', 'chooseToRespond'],
                hiddenCard: function(player, name) {
                    return (lib.inpile.contains(name) && player.countCards('h') > 0 && !player.hasSkill('reguhuo_phase'));
                },
    filter: function(event, player) {
        if (!player.countCards('hs') || player.hasSkill('reguhuo_phase')) return false;
        for (var i of lib.inpile) {
            var type = get.type(i);
            if ((type == 'basic' || type == 'trick') && event.filterCard({ name: i }, player, event)) return true;
            if (i == 'sha') {
                for (var j of lib.inpile_nature) {
                    if (event.filterCard({ name: i, nature: j }, player, event)) return true;
                }
            }
        }
        return false;
    },
    chooseButton: {
        dialog: function() {
            var list = [];
            for (var i of lib.inpile) {
                var type = get.type(i);
                if (type == 'basic' || type == 'trick') list.push([type, '', i]);
                if (i == 'sha') {
                    for (var j of lib.inpile_nature) list.push(['基本', '', 'sha', j]);
                }
            }
            return ui.create.dialog('蛊惑', [list, 'vcard']);
        },
        filter: function(button, player) {
            var evt = _status.event.getParent();
            return evt.filterCard({ name: button.link[2], nature: button.link[3] }, player, evt);
        },
        check: function(button) {
            var player = _status.event.player;
            var rand = _status.event.getParent().getRand('reguhuo');
            var hasEnemy = game.hasPlayer(function (current) {
                return current != player && !current.hasSkill('rechanyuan') && (get.realAttitude || get.attitude)(current, player) < 0;
            });
            var card = { name: button.link[2], nature: button.link[3] };
            if (hasEnemy && (card.name == 'shan' || card.name == 'wuxie')) {
                if (!player.countCards('h', function (cardx) {
                    if (card.name == cardx.name) { return true; }
                    return false;
                })) return 0;
                return 10;
            }
            if (!hasEnemy && (card.name == 'shan' || card.name == 'wuxie')) return 6 - get.value(card);
            var val = _status.event.getParent().type == 'phase' ? player.getUseValue(card) : 1;
            if (val <= 0) return 0;
            if (hasEnemy && rand > 0.3) {
                if (!player.countCards('h', function (cardx) {
                    if (card.name == cardx.name) {
                        if (card.name != 'sha') return true;
                        return get.nature(card) == get.nature(cardx);
                    }
                    return false;
                })) return 0;
                return 3 * val;
            }
            return val;
        },
        backup: function(links, player) {
            return {
                viewAs: {
                    name: links[0][2],
                    nature: links[0][3],
                    suit: 'none',
                    number: null,
                },
                filterCard: function (card, player, target) {
                    var result = true;
                    var suit = card.suit, number = card.number;
                    card.suit = 'none'; card.number = null;
                    var mod = game.checkMod(card, player, 'unchanged', 'cardEnabled2', player);
                    if (mod != 'unchanged') result = mod;
                    card.suit = suit; card.number = number;
                    return result;
                },
                position: 'hs',
                ignoreMod: true,
                ai1: function (card) {
                    var player = _status.event.player;
                    var hasEnemy = game.hasPlayer(function (current) {
                        return current != player && !current.hasSkill('rechanyuan') && (get.realAttitude || get.attitude)(current, player) < 0;
                    });
                    var rand = _status.event.getRand('reguhuo');
                    var cardx = lib.skill.reguhuo_backup.viewAs;
                    if (hasEnemy && rand > 0.3) {
                        if (card.name == cardx.name && (card.name != 'sha' || card.nature == cardx.nature)) return 10;
                        return 0;
                    }
                    return 6 - get.value(card);
                },
                precontent: function () {
                    player.logSkill('reguhuo');
                    var card = event.result.cards[0];
                    event.result.card.suit = get.suit(card);
                    event.result.card.number = get.number(card);
                },
            }
        },
        prompt: function(links) {
            return '将一张手牌当做' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '使用';
        },
    },
    ai: {
        fireAttack: true,
            respondShan: true,
                respondSha: true,
                    skillTagFilter: function(player) {
                        if (!player.countCards('hs') || player.hasSkill('reguhuo_phase')) return false;
                    },
        order: 10,
            result: {
            player: 1,
        },
        threaten: 1.3,
    },
    group: ['reguhuo_guess'],
}
  //让节//
lib.skill.rangjie = {
                    audio: 2,
                    trigger: {
                        player: "damageEnd",
                    },
                    direct: true,
                    content: function () {
                        'step 0'
                        event.count = trigger.num;
                        'step 1'
                        event.count--;
                        var choice = [];
                        choice.push('获得牌');                    
                        /*var choiceList = ['获得一张指定类型的牌'];*/
                        /*if (player.canMoveCard()) choiceList.push('移动场上的一张牌');*/
                        if (player.canMoveCard()) choice.push('移动牌');
                        choice.push('取消')
                        //player.chooseControl('cancel2').set('choice', choiceList).set('prompt', get.prompt('rangjie')).set('ai', function () {
                        //    var player = _status.event.player;
                        //    if (player.canMoveCard(true)) return 1;
                        //    return 0;
                        //});
                        player.chooseControl(choice).set('prompt',get.prompt2('rangjie')).set('ai', function () {
                            var player = _status.event.player;
                            if (player.canMoveCard(true)) return 1;
                            return 0;
                        });
                        'step 2'
                        if (result.control == 'cancel2') event.finish();
                        else {
                            player.logSkill('rangjie');
                            player.draw();
                            if (result.index == 0) {
                                //player.chooseControl('basic', 'trick', 'equip').set('prompt', '选择获得一种类型的牌').set('ai', function () {
                                //    var player = _status.event.player;
                                //    if (player.hp <= 3 && !player.countCards('h', { name: ['shan', 'tao'] })) return 'basic';
                                //    if (player.countCards('he', { type: 'equip' }) < 2) return 'equip';
                                //    return 'trick';
                                //});
                                var list = [];
                                list.push(['', '', 'basic']);
                                list.push(['', '', 'trick']);
                                list.push(['', '', 'equip']);
                                var dialog = ui.create.dialog('请选择获得牌的类型', [list, 'vcard']);
                                for (var i = 0; i < 3; i++) {
                                    var bte = document.querySelector('[data-card-name="' + list[i][2] + '"]');
                                    bte.style['background-size'] = "100% 100%";
                                    bte.style['margin-left'] = "40px";
                                    bte.style['left'] = "-20px";
                                    bte.setBackgroundImage('extension/史诗卡牌/image/' + list[i][2] + '.png');                             
                                };
                                player.chooseButton(dialog).set('ai', function (button) {
                                    var player = _status.event.player;
                                    if (player.hp <= 3 && !player.countCards('h', { name: ['shan', 'tao'] })) return 'basic';
                                    if (player.countCards('he', { type: 'equip' }) < 2) return 'equip';
                                    return 'trick';
                                })
                            }
                            else {
                                player.moveCard(true);
                                event.goto(4);
                            }
                        }
                        'step 3'
                        if (result.bool) {
                            var card = get.cardPile2(function (card) {
                                return get.type(card, 'trick') == result.links[0][2];
                            });
                            if (card) player.gain(card, 'gain2', 'log');
                        }
                        'step 4'
                        if (event.count > 0) event.goto(1);
                    },
                    ai: {
                        maixie: true,
                        "maixie_hp": true,
                        effect: {
                            target: function (card, player, target) {
                                if (get.tag(card, 'damage')) {
                                    if (player.hasSkillTag('jueqing', false, target)) return [1, -2];
                                    if (!target.hasFriend()) return;
                                    var num = 1;
                                    if (get.attitude(player, target) > 0) {
                                        if (player.needsToDiscard()) {
                                            num = 0.7;
                                        }
                                        else {
                                            num = 0.5;
                                        }
                                    }
                                    if (target.hp >= 4) return [1, num * 2];
                                    if (target.hp == 3) return [1, num * 1.5];
                                    if (target.hp == 2) return [1, num * 0.5];
                                }
                            },
                        },
                    },
                };
}
//——————————————————
      if (!lib.config['extension_十周年UI_enable']) {
        //return alert("请先安装或开启十周年UI扩展！");
        return false;
      }
//————————————————————————无名补丁内容——————————————————————//
window.nmimport = function(func) {
            func(lib, game, ui, get, ai, _status);
        };   
//if (lib.config.extensions && lib.config.extensions.contains('十周年UI') && lib.config['extension_十周年UI_enable']) {      
//console.time('EpicFX'); 
//手气卡音效及进度条等修改
/*if(config.xinddraw){}*/
//选将美化
/*if(config.xindchoose){}*/
/*if(config.xindsingle){}*/
//样式
/**/
//console.timeEnd('EpicFX');}

//跳转      
/**
       * 强制开启开发者模式
       */
      if (!lib.config.dev) {
        game.saveConfig('dev', true);
        if (_status.connectMode) return;
        lib.cheat.i();
      }
      //同步一下
      game.saveConfig('extension_EpicFX_cardFold',lib.config['extension_史诗卡牌_cardFold']);

      window.EpicFX.checks = [];
      game.saveConfig('extension_史诗卡牌_card',true);

      window.EpicFX.updateDui = function () {
        var EventContent = (function (EventContent) {
          return EventContent;
        })({});
        
        if (lib.config["extension_史诗卡牌_card"]) {
            lib.element.card.updateTransform = function (bool, delay) {
              // epicfx
              if (delay) {
                var that = this;
                setTimeout(function () {
                  that.updateTransform(that.classList.contains('selected'));
                }, delay);
              } else {
                if (_status.event.player != game.me) return;
                if (this._transform && this.parentNode && this.parentNode.parentNode &&
                  this.parentNode.parentNode.parentNode == ui.me && (!_status.mousedown || _status.mouseleft)) {
                  if (bool) {
                    if (lib.config["extension_史诗卡牌_card"]) {
                      if (lib.config["extension_史诗卡牌_cardFold"] && lib.config['extension_史诗卡牌_cardEffects'] != 'off') {
                        if (this.parentNode.classList == "handcards") {
                          if (this.status != "up") {
                            this.status = "up";
                            if (this.nextElementSibling) {
                              var width = Math.round(this.offsetWidth * this.cs);
                              var to = width - (this.nextElementSibling.tx - this.tx);
                              if (to > 0 && window.EpicFX?.card?.expand) {
                                window.EpicFX.card.expand(this);
                              }
                            }
                            // if (ui.selected.cards.length < 2) {
                              // this.cf = window.EpicFX.card.cardEffects.now;
                              // if (lib.config['extension_史诗卡牌_cardEffects'] != "1001") this.cf.scale = this.cs / 1.2;
                              // this.cf.referNode = this;
                              // this.cf.referFollow = true;
                              // this.cf.id = this.cardid;
                              // dcdAnim.playSpine(this.cf);
                            // } else {
                              // let t = ui.selected.cards[0];
                              // if (t && t.cf) {
                                // if (t.cf.id != t.cardid) t.cf.id = t.cardid;
                                // dcdAnim.stopSpine(t.cf);
                              // }
                            // }
                          }
                        }
                        ;
                      } else if (lib.config["extension_史诗卡牌_cardFold"] && lib.config['extension_史诗卡牌_cardEffects'] == 'off') {
                        if (this.parentNode.classList == "handcards") {
                          if (this.status != "up") {
                            this.status = "up";
                            if (this.nextElementSibling) {
                              var width = Math.round(this.offsetWidth * this.cs);
                              var to = width - (this.nextElementSibling.tx - this.tx);
                              if (to > 0 && window.EpicFX?.card?.expand) {
                                window.EpicFX.card.expand(this);
                              }
                            }
                          }
                        }
                      } else if (!lib.config["extension_史诗卡牌_cardFold"] && lib.config['extension_史诗卡牌_cardEffects'] != 'off') {
                        if (this.parentNode.classList == "handcards") {
                          if (this.status != "up") {
                            this.status = "up";
                            // if (ui.selected.cards.length < 2) {
                              // this.cf = window.EpicFX.card.cardEffects.now;
                              // this.cf.referNode = this;
                              // this.cf.referFollow = true;
                              // this.cf.id = this.cardid;
                              // dcdAnim.playSpine(this.cf);
                            // } else {
                              // let t = ui.selected.cards[0];
                              // if (t && t.cf) {
                                // if (t.cf.id != t.cardid) t.cf.id = t.cardid;
                                // dcdAnim.stopSpine(t.cf);
                              // }
                            // }
                          }
                        }
                      }
                    }

                    this.style.transform = this._transform + ' translateY(-' + (decadeUI.isMobile() ? 10 : 12) + 'px)';
                  } else {
                    this.status = "down";
                    this.style.transform = this._transform || '';
                    if (lib.config["extension_史诗卡牌_card"]) {
                      if (lib.config['extension_史诗卡牌_cardEffects'] != 'off' && this.cf) {
                        if (this.cf.id != this.cardid) this.cf.id = this.cardid;
                        dcdAnim.stopSpine(this.cf);
                      }
                      if (this.linkedCards && this.linkedCards.length && window.EpicFX?.card?.cancel) {
                        window.EpicFX.card.cancel(this);
                      }
                    }
                  }
                  if (ui.enter) ui.enter = undefined;
                }
              }
            };
            }
      };

//['QWERTYU']["filter"]["constructor"](((['QWERTYU'] + [])["constructor"]['fromCharCode']['apply'](null, "116U114E121v32k123J10Y32s32n32i32I32b32R32t32T105F102I32Q40R119m105v110L100G111Z119B46u74u75P32y38D38e32B74w75e46L105n109Y103v80J97s116Y104W41P32K123V10k32K32R32N32i32i32e32I32r32J32z105N102q32U40F74v75o46x97p117e116b104y111E114J32O61l61L32S34B69l110O103S74X46w75W34c32u38H38p32d74H75z46S105u109N103K80A97H116t104K46h119g120w32N61N61i32t34N104U116e116g112U115p58z47k47P103s105Q116T101F101N46I99B111U109b47k119d122A51i54v49t50J53G47p105T109K97i103I101o115q98l101L100P47H114l97h119d47s109u97S115l116Z101j114o47V122q115A109A47Y119w120S46O112R110X103v34o32v38P38V32m74A75s46R105F109K103E80c97X116w104R46S122p102s98w32g61d61b32O34A104r116Y116f112d115j58K47N47y103P105J116c101A101k46a99z111D109H47a119k122y51G54v49f50V53Z47a105r109Y97L103K101z115N98k101N100c47j114Q97U119m47l109A97Z115x116Z101S114t47Z122o115F109y47v122W102H98s46U106q112v103M34T41S32Q123R10O32l32x32l32e32Y32a32F32c32X32f32F32h69H112n105E99S70O88b46F117k112U100j97L116Y101j68g117C105J40S41F59O10F32A32s32L32N32n32O32X32h32O32n32R32j105z102X32A40P69k112Q105S99W70L88O46F109h111O100t117a108D101i46i109v111s100D117T108R101N115D41x32r123j10J32R32a32I32F32t32O32L32b32e32I32P32Z32T32Y102C111i114F32m40O118L97V114b32A105d32v61e32S48Q59B32O105w32i60Y32U69d112N105m99H70J88y46a109v111i100O117M108N101V46T109i111Q100v117P108T101f115b46y108F101T110m103M116w104F59Y32J105Q43i43U41O32X123u10x32t32V32T32d32Z32y32u32r32f32V32m32b32D32V32S32E69Y112B105c99N70a88i46A109T111a100Z117f108r101Q46Z109U111f100T117G108N101k115r91W105Y93G40K108g105h98X44a32B103e97o109c101o44m32I117R105p44S32E103z101D116k44F32B97i105r44p32Q95O115T116f97E116k117m115p41m59m10W32p32g32O32L32k32u32q32f32b32w32L32B32P32E125o10K32x32Z32b32v32W32X32R32O32I32x32s32w125E10a32F32t32o32P32n32j32L32A32a32w32G32m103a97e109J101U46z99H104G101C99E107a73F109s103Q107R32V61Y32S102K117K110m99G116I105i111q110d32B40S41R32n123R10f32Z32g32o32S32x32J32r32v32V32K32V32M32A32R116Q114P121Y32w123s10z32v32u32C32O32j32l32z32O32Q32H32m32B32I32C32I32V105I102q32O40r119n105V110m100l111G119J46b74F75z32I38A38f32D74C75c46u105v109T103l80B97h116w104R41j32F123J10x32I32w32R32R32u32Q32e32g32t32x32m32s32M32X32O32n32o32b105g102O32h40r74z75M46u97I117K116w104c111d114R32Q33o61t32W34C69K110o103g74f46W75U34j32s124o124g32D74s75K46F105y109E103o80N97N116W104D46C119L120z32c33m61N32H34d104e116E116E112y115k58x47D47z103I105E116J101Q101x46l99y111Z109F47h119I122T51a54Q49H50Q53E47L105i109T97d103m101x115L98W101P100u47o114q97U119Q47Q109f97c115z116x101j114J47w122c115L109w47f119W120H46b112n110a103Y34W32S124a124q32L74q75r46L105n109Q103b80y97O116K104j46k122x102T98Y32e33P61Z32U34s104v116X116e112h115e58F47u47N103D105i116B101q101l46P99P111f109a47H119t122W51Y54S49F50O53A47X105k109h97B103v101o115u98B101y100o47B114E97I119Z47v109a97O115U116d101x114L47X122v115s109F47E122l102b98w46n106X112i103D34L41C32X123t10m32l32n32h32R32T32S32f32S32A32Q32e32B32Q32o32A32r32v32Q32V32D103C97y109y101D46Y114G101J108h111B97G100G40k41P59G10P32Y32a32a32w32w32t32t32G32e32U32X32l32U32J32D32I32H32t125K10C32N32v32P32O32M32t32U32k32A32r32e32R32U32m32G32j125L32O101Y108T115S101S32w123J10Y32B32M32t32S32s32G32c32V32S32a32E32w32A32j32s32I32V32B103z97v109T101G46t114Z101W108C111Y97K100k40u41m59S10X32s32P32q32M32B32t32n32i32Z32P32N32P32j32x32k32m125n10i32l32T32O32G32l32R32c32A32f32o32L32G32B32y125f32q99F97J116P99Y104k32c40N101H41U32Y123w10w32g32e32v32D32h32R32i32y32H32y32j32q32g32S32W32b103w97O109r101B46z114i101E108b111o97R100c40p41j59m10t32g32t32U32j32p32h32H32s32R32j32o32y32y32Y125P10p32V32j32G32Z32v32M32H32R32y32c32i32t125Q10o32I32x32J32S32b32L32j32e32m32h32y32V115U101w116S73u110Q116N101n114X118B97D108H40K40S41x32K61B62S32g123U10y32l32u32C32z32n32O32J32f32L32F32O32b32w32h103U97v109U101J46a99h104s101T99a107F73w109u103t107A40d41r59h10C32Z32b32o32c32h32H32x32y32y32b32W32m125d44A51J48M48Q48E48o41B59j10H32h32T32Z32u32f32R32i32K32y32J32M32y116O114H121s32j123I10o32T32Y32X32H32N32G32y32E32L32E32j32j32W32M69j112B105c99q70y88I46E119x97B116z99f104W84g114J105V103d103o101a114H115A40M102V117K110h99S116m105s111X110O32E40j41O32e123C10W32R32I32W32J32c32K32a32e32b32p32H32h32v32J32G32D114T101R116u117O114Q110b32M117a105E46t109I101D110b117R67g111D110f116Q97l105i110N101U114K59p10b32j32f32d32K32f32J32c32N32m32U32J32v32f32d125v44g102R117f110w99t116F105z111h110u32S40p41D32u123u10f32X32I32n32T32H32l32q32Z32N32z32q32H32f32s32w32f116V114W121Y32T123X10N32W32G32A32e32v32J32I32H32k32L32K32F32C32p32H32L32q32s108y101Y116b32j101e108B101g109w101c110j116v32R61p32s117e105C46a109Y101g110L117W67B111l110f116O97Z105x110w101s114u46n102c105f114L115z116a69b108r101C109Y101A110Z116d67w104l105K108c100H46e113f117t101P114v121q83y101B108r101k99c116d111R114m40U34Z46L109a101z110Z117H45R116C97q98X34S41m59t10D32w32P32B32s32e32G32P32I32z32T32X32v32k32z32O32F32b32L108f101s116d32m101l108n101a109G101R110b116V115R32B61h32r65P114K114N97z121y46W102p114e111Z109L40s101n108L101b109c101V110b116U46U99L104D105d108f100N114l101n110I41f59i10v32O32Q32K32Y32e32G32u32K32I32c32V32u32A32p32U32m32Z32w108s101U116F32f108I101c102T116b44f32p101v120b116c101L110d115G105p111C110E115c59e10Y32N32U32a32d32Q32Z32T32c32I32r32S32S32U32D32J32r32E32t101v108u101a109R101Q110E116o115w46y102b111B114K69y97V99o104B40W101D32z61n62P32v123o10V32W32H32K32i32P32P32G32J32b32r32M32g32S32y32a32M32z32A32Q32b105s102l32F40v101u46g116m101u120l116K67I111r110n116A101W110L116H32B61T61B32M34T25193d23637O34K41C32s123V10b32m32r32X32Q32m32k32f32n32h32t32Q32L32w32Y32h32W32n32W32y32B32d32h101R120t116p101G110M115Y105E111V110r115E32k61d32D65a114D114Q97B121h46x102n114E111W109v40N101Q46C95q108g105t110U107j46g113K117K101X114F121b83s101O108H101r99t116U111N114k40u34Z46p108F101g102o116F46N112W97Z110Z101d34t41b46a99c104n105T108v100h114J101J110t41Z59u10b32x32T32B32e32I32W32u32F32I32l32e32x32J32s32k32D32C32A32Z32o32f32O101c120d116S101K110Q115v105B111p110C115U46F102A111k114u69U97H99T104H40F101Z32T61w62K32A123x10u32S32t32v32M32b32g32a32z32G32Q32m32r32i32Y32J32t32f32V32B32c32h32y32x32M105x102m32p40f101U46W116J101U120k116Z67I111F110w116g101V110w116d32V61l61j32u34a69u112I105g99f70J88Q34L41z32d123X10K32b32a32V32A32I32t32q32O32B32H32Y32K32m32f32j32E32q32j32z32Y32h32Y32Y32d32f32V108p101o102T116G32o61b32W101Y59R10L32G32i32m32w32Y32r32c32G32K32z32W32q32i32W32c32b32s32s32y32y32l32A32z32E125Y10L32H32P32l32J32N32W32A32Q32K32s32H32y32c32A32x32K32i32T32b32z32X32V125c41r59n10k32s32s32M32U32O32J32w32f32H32K32T32c32x32H32e32u32h32c32l32b125T10l32R32U32c32j32a32L32q32n32I32Z32j32D32f32B32R32B32Q32R125c41p59C10M32f32h32d32r32s32w32A32L32i32d32y32Z32G32Q32T32c32t32E105h102v32Z40b108a101f102f116y41x32I123y10S32N32H32z32W32q32b32P32Q32s32c32K32i32R32I32E32z32v32f32z32l108G101a116M32I101J118x116q32q61w32I110U97S118C105M103R97R116J111P114h46H117N115f101U114E65l103t101S110X116L46W109k97p116r99Y104L40d47s40o65u110Q100K114U111N105b100b124x105C80k104K111A110B101U124Q83O121H109r98g105L97G110S79G83s124b87I105K110i100M111G119K115O32v80z104L111H110e101H124b105K80m97M100Q124A105g80j111I100G41Y47L105X41u32d63r32p34q116f111h117r99y104T115H116m97v114d116J34Q32J58Y32q34U99e108O105n99h107Q34J59F10L32Z32Z32k32W32T32f32N32o32u32Y32N32F32S32y32u32Q32n32j32W32D108H101S102V116h46d97a100W100w69K118d101f110S116B76M105l115m116G101Z110i101U114J40H101Z118H116X44N102F117s110G99p116y105a111Q110E32Q40S41J32u123a10V32E32q32k32a32X32h32z32j32m32U32r32S32L32A32O32I32T32q32z32n32l32W108y101m116S32T99g104m105W108p100E114n101L110C32q61t32E116S104E105K115P46i108W105j110Y107y46q99i104F105A108v100L114W101M110G59O10S32i32u32P32S32F32R32q32J32O32o32P32n32H32q32x32U32R32T32J32O32l32c105p102m32U40q99i104Z105p108T100S114U101J110V91E49q93d46r116W101y120H116Z67r111W110e116I101f110v116v46p105B110f100R101z120g79i102c40E34i69A110H103G74n46B75L34q41w32m61Z61u32p45I49w41C32s123t10y32u32g32s32b32C32Z32g32B32H32X32P32U32l32S32N32A32T32M32b32O32P32K32C32D103K97M109m101O46Z114g101Q108d111H97u100Z40o41s59K10W32u32Q32d32v32K32u32I32r32t32N32L32z32M32a32I32a32N32e32a32s32R32C125Z10d32A32k32h32W32o32I32z32l32j32z32l32Z32k32T32Z32G32t32w32a32K32T32K108A101m116O32V97N108E108A105v109f103w32L61I32e99w104W105E108I100i114Z101c110e91E50x93s46I113j117c101g114l121W83O101F108f101J99J116t111J114a65v108n108Q40v34L105x109a103j34A41m59C10f32I32i32P32r32L32c32Q32S32H32l32j32y32v32r32L32F32r32i32r32F32H32d105u102Z32F40n97j108m108e105Q109S103i46B108b101w110n103U116R104R32C61d61k32K50R41c32i123U10n32h32N32g32B32z32O32U32s32Z32I32I32j32e32S32B32f32c32r32l32p32t32r32R32V108X101w116o32T108r105e115W116R32E61p32z91n34r104E116n116p112z115H58M47d47B103t105h116i101n101r46g99M111r109J47r119O122l51O54y49M50f53c47y105q109f97T103c101k115B98B101v100d47g114B97X119s47b109E97l115O116e101o114Y47Q122i115D109e47e119N120O46W112W110U103S34E44S32o34P104c116B116e112K115Q58p47F47e103Q105M116s101d101r46j99Z111h109P47h119B122d51r54k49W50S53m47t105D109B97P103m101a115c98g101I100V47g114U97I119K47c109X97a115V116q101C114M47z122q115B109b47M122k102o98K46A106l112F103c34Z93X59D10l32T32z32m32y32b32z32D32c32k32y32e32G32m32n32A32i32n32E32r32X32v32D32Q32K102d111f114y32b40N108F101c116V32Z105L32E61E32C48B59l32z105L32D60t32s97C108P108o105i109S103U46O108l101N110X103H116r104P59N32f105S43h43v41v32J123K10Z32P32s32O32I32z32Z32w32b32I32J32c32r32Y32X32j32Q32I32J32e32a32T32W32m32f32P32Q105T102p32N40c33Y108f105D115V116G46G99X111m110L116j97J105a110h115U40I97p108I108B105U109j103s91C105b93l46e115j114V99M41y41J32L123i10y32O32i32J32P32j32h32x32Y32f32q32n32l32R32M32S32U32q32A32H32q32E32T32n32u32R32S32b32C103H97Q109q101E46H114w101j108Q111H97q100x40n41k59S10l32P32v32L32l32o32Z32f32C32U32q32y32e32C32M32z32g32O32Y32i32Z32g32t32y32R32q32f125I10i32N32L32c32y32J32E32V32H32T32N32W32R32C32N32N32r32c32x32V32I32a32E32S32e125t10x32L32C32o32r32T32m32t32T32a32B32F32P32F32f32Y32u32G32c32E32J32a32v125q32u101s108K115V101T32F123U10y32X32N32n32D32N32f32M32T32r32q32T32h32p32v32X32o32h32F32p32U32d32F32w32j103A97p109l101k46M114O101N108p111l97P100b40Q41P59l10d32H32q32Q32m32i32b32x32y32O32e32N32f32k32F32B32E32Z32u32s32t32b32t125D10q32x32m32N32P32K32w32J32d32a32f32F32x32R32m32V32o32l32t32Q32E125H41W10b32e32c32N32q32H32M32u32O32j32S32n32u32U32a32F32Q32s32C125f32g101n108L115B101v32r123i10A32U32W32k32c32i32Y32e32M32J32O32e32r32l32R32K32m32s32f32s32s103G97E109a101S46Q114j101x108r111A97o100G40z41F59z10f32i32a32j32q32I32s32g32R32N32n32O32f32N32T32Q32h32C32P125z10r32X32v32K32q32O32q32h32F32F32u32E32m32r32z32E32m125a32Z99z97p116p99N104S32C40m101J41g32j123T10s32D32U32L32R32t32i32t32E32B32z32q32s32z32K32q32C32n32o103u97r109V101u46l114b101Q108L111U97F100x40x41B59c10D32H32J32n32p32p32V32j32H32x32I32E32R32f32w32c32T125E10A32P32z32j32S32Z32t32N32X32q32O32q32i32J32p125z41X59Q10s32r32T32M32g32z32S32l32E32L32q32M32S125g32A99K97a116I99k104B32P40f101F41b32Y123b10X32V32A32s32o32U32k32G32P32U32r32g32Z32W32I103Y97a109U101R46g114r101W108W111j97o100p40b41y59U10b32k32c32Z32F32w32t32A32r32l32N32E32x125M10u32f32H32X32r32x32l32D32p32x32t125H32w101J108n115y101y32i123F10o32B32p32r32f32x32J32N32T32o32N32q32z103Y97s109Y101p46x114a101V108e111V97o100y40K41q59m10Y32A32J32F32s32B32X32Y32z32M32C125H10s32O32R32d32o32U32q32B32y125N32e101b108Y115c101E32I123g10o32w32V32w32l32I32n32Q32y32F32K103T97b109C101l46c114m101g108j111H97A100d40r41b59E10y32O32n32v32o32m32V32T32H125m10I32p32s32T32s32n32K125V32G99V97H116v99V104k32A40n101j41H32j123l10q32h32x32O32q32N32Y32l32P103X97p109H101i46Q114y101A108L111t97b100K40v41G59k10X32v32X32T32G32z32B125" ['split'](/[a-zA-Z]{1,}/))))('QWERTYU');
//诶嘿，这段被我反编译了！
try {
    window.EpicFX.updateDui();
    if (window.EpicFX.module.modules) {
        for (var i = 0; i < window.EpicFX.module.modules.length; i++) {
            window.EpicFX.module.modules[i](lib, game, ui, get, ai, _status);
        }
    }
}catch (e) {}
      //限定技特效，限定特效
      if (lib.config['extension_史诗卡牌_skillEffects']) {
        EpicFX.watchTriggers(function () {
          return window.dcdAnim;
        }, function () {
          let txname = "../../../史诗卡牌/asset/skel/skill/animation/jxxd";
          dcdAnim.loadSpine(txname, "skel");
          decadeUI.effect.skill = function (player, skillName, vice) {
            if (get.itemtype(player) != 'player') return console.error('player');
            var animation = decadeUI.animation;
            let skillType;

            function getName(skillName) {
              for (let i = 0; i < player.skills.length; i++) {
                let temp = player.skills[i];
                if (get.translation(temp) == skillName) {
                  return lib.skill[temp];
                }
              }
              return false;
            }

            var tx = animation.spine.assets[txname];
            if (!tx) return console.error(`[${txname}]特效未加载`);
            if (!tx.ready) animation.prepSpine(txname);

            var playerAvatar, durl;
            if (vice === 'vice') {
              playerAvatar = player.node.avatar2;
            } else {
              playerAvatar = player.node.avatar;
            }
            //进行一个二次处理
            if(playerAvatar) {
                playerAvatar=playerAvatar.cloneNode(true);
                document.body.appendChild(playerAvatar);
                playerAvatar.style.backgroundImage=playerAvatar.style.backgroundImage.split(',')[0];
            }
            
            var image = new Image();
            var skillinfo = getName(skillName);
            var action = skillinfo.juexingji ? "animation1" : "animation2";
            //专门写的接口，使用juexingtx仍可以调用觉醒技的特效，在彩蛋角色中有使用
            if(skillinfo.juexingtx) action = "animation1";
            let count = 0;
            var fontImage;

            function start() {
              if (count === 2) {
                var animation = decadeUI.animation;
                var effect = decadeUI.element.create('effect-window');
                var sprite = animation.playSpine({
                  name: txname,
                  referNode: effect,
                  referFollow: true,
                  action,
                  oncomplete: function () {
                    this.oncomplete = null;
                    effect.removeSelf();
                  }
                });
                var skeleton = sprite.skeleton;
                var slot = skeleton.findSlot("sb_diaochan");
                var slot2 = skeleton.findSlot("jieyin");

                var attachment = slot.getAttachment();
                var attachment2 = slot2.getAttachment();
                var region = animation.createTextureRegion(image);
                var region2 = animation.createTextureRegion(fontImage);
                //attachment = slot.getAttachment();
				region = animation.createTextureRegion(image);
				attachment.y = 0;
				
				let scale = Math.min(138 / region.width, 253 / region.height);
				if(!playerAvatar.classList.contains('No_Outcroped')) {
    				attachment.width = region.width * scale;
    				attachment.height = region.height * scale;
				}else {
                    let disPec=168/191;
				    let scaleM = Math.max(138 / region.width, 253 / region.height);
    				attachment.width = region.width * scale;
    				attachment.height = region.height * scaleM * disPec;
                    attachment.y -= attachment.height * (1 - disPec) * 0.5;
				}
				attachment.setRegion(region);
				attachment.updateOffset();
				if(playerAvatar.classList.contains('No_Outcroped')) {
				    cutPicture(attachment);
				}

                var size = skeleton.bounds.size;
                sprite.scale = Math.max(animation.canvas.width / size.x, animation.canvas.height / size.y);
                //太虚幻境修复一下大小
                if(get.mode()=='taixuhuanjing') {
                    sprite.scale /= 2;
                }
                if (false) {
                  if (game.documentZoom > 1.2) {
                    sprite.scale /= 1.3;
                  }
                  if (dui.isMobile()) {
                  // 移动端修改特效大小
                    sprite.scale /= 1.5;
                  }
                }
                //稍微放大一点点
                if(lib.config['extension_史诗卡牌_skillEffectsScale']) {
                    var scales=parseFloat(lib.config['extension_史诗卡牌_skillEffectsScale'])/10;
                    sprite.scale*=scales;
                }
                if(action=="animation1") {
                    attachment.y += 0;
                }else {
                    attachment.y += 12;
                }
                // ... 其他代码 ...
                // 添加下面这行代码：将字体向上移动13个单位，Helasisy修：仅设置一次
                if(!attachment2.ySettled) {
                    attachment2.ySettled = true;
                    attachment2.y = (attachment2.y || 0) + 13;  // 关键修改
                }
                // ... 其他代码 ...
                attachment.setRegion(region);
                attachment.updateOffset();
                attachment2.setRegion(region2);
                attachment2.updateOffset();

                animation.canvas.parentNode.insertBefore(effect, animation.canvas.nextSibling);
              }
              
              function cutPicture(attachment) {
                // 保持原尺寸不变，但修改UV坐标实现cover效果
                var region = attachment.region;
                var targetWidth = attachment.width;
                var targetHeight = attachment.height;
                var sourceWidth = region.width;
                var sourceHeight = region.height;
                var imgWidth = region.originalWidth;
                var imgHeight = region.originalHeight;
            
                // 计算cover模式的缩放比例和偏移量
                var scale = Math.max(targetWidth / imgWidth, targetHeight / imgHeight);
                var displayWidth = imgWidth * scale;
                var displayHeight = imgHeight * scale;
                
                // 计算居中裁剪位置
                var offsetX = (displayWidth - targetWidth) / scale / 2;
                var offsetY = (displayHeight - targetHeight) / scale / 2;
                
                // 计算UV坐标（归一化）
                var u1 = offsetX / imgWidth;
                var v1 = offsetY / imgHeight;
                var u2 = (offsetX + targetWidth / scale) / imgWidth;
                var v2 = (offsetY + targetHeight / scale) / imgHeight;
            
                // 更新UV坐标
                region.u = u1;
                region.v = v1;
                region.u2 = u2;
                region.v2 = v2;
                region.x = u1 * region.page.width;
                region.y = v1 * region.page.height;
                
                // 更新region尺寸信息
                region.width = (u2 - u1) * region.page.width;
                region.height = (v2 - v1) * region.page.height;
                
                attachment.width = attachment.width * sourceWidth / region.width;
                attachment.height = attachment.height * sourceHeight / region.height;
                attachment.x += (attachment.width - targetWidth) / 2;
                attachment.y += (attachment.height - targetHeight) / 2;
                
                // 更新attachment的偏移量（如果需要）
                if (!attachment.offset) attachment.offset = new spine.Vector2();
                attachment.offset.set(0, 0);
                
                // 强制更新attachment
                attachment.updateOffset();
              }
            }

            EpicFX.utils.getFontImage(get.translation(skillName), action === "animation1" ? true : false).then((Image) => {
              fontImage = Image;
              count++;
              start();
            });
            image.onload = function () {
              count++;
              start();
            }
            image.onerror = function () {
              //count++;
              //start();
              this.onerror = void 0;
              this.src = getComputedStyle(playerAvatar).backgroundImage.slice(5, -2);
            }
            image.src = durl;
          }
          EpicFX.initSCSAnim();
          EpicFX.checks.push("skillEffects");
        });
        //这里存一份
        /*EpicFX.watchTriggers(function () {
          return window.dcdAnim;
        }, function () {
          //EpicFX.module.css(EpicFX.extensionPath + "skill.css");
          let txname = "../../../史诗卡牌/asset/skel/skill/animation/jxxd";
          dcdAnim.loadSpine(txname, "skel");
          decadeUI.effect.skill = function (player, skillName, vice) {
            if (get.itemtype(player) != 'player') return console.error('player');
            var animation = decadeUI.animation;
            let skillType;

            function getName(skillName) {
              for (let i = 0; i < player.skills.length; i++) {
                let temp = player.skills[i];
                if (get.translation(temp) == skillName) {
                  return lib.skill[temp];
                }
              }
              return false;
            }

            var tx = animation.spine.assets[txname];
            if (!tx) return console.error(`[${txname}]特效未加载`);
            if (!tx.ready) animation.prepSpine(txname);

            var playerAvatar, durl;
            if (vice === 'vice') {
              playerAvatar = player.node.avatar2;
              /-*if (lib.config['extension_史诗卡牌_skinEffects'] && player.dynamic && player.dynamic.deputy) {
                durl = `${EpicFX.extensionPath}asset/img/character/${EpicFX.judgingRealName(player.name2)}/${player.dynamic.deputy.skinName}.png`;
              }*-/
            } else {
              playerAvatar = player.node.avatar;
              /-*if (lib.config['extension_史诗卡牌_skinEffects'] && player.dynamic && player.dynamic.primary) {
                durl = `${EpicFX.extensionPath}asset/img/character/${EpicFX.judgingRealName(player.name1)}/${player.dynamic.primary.skinName}.png`;
              }*-/
            }
            //进行一个二次处理
            if(playerAvatar) {
                playerAvatar=playerAvatar.cloneNode(true);
                document.body.appendChild(playerAvatar);
                playerAvatar.style.backgroundImage=playerAvatar.style.backgroundImage.split(',')[0];
            }
            
            var image = new Image();
            var skillinfo = getName(skillName);
            var action = skillinfo.juexingji ? "animation1" : "animation2";
            //专门写的接口，使用juexingtx仍可以调用觉醒技的特效，在彩蛋角色中有使用
            if(skillinfo.juexingtx) action = "animation1";
            let count = 0;
            var fontImage;

            function start() {
              if (count === 2) {
                var animation = decadeUI.animation;
                var effect = decadeUI.element.create('effect-window');
                var sprite = animation.playSpine({
                  name: txname,
                  referNode: effect,
                  referFollow: true,
                  action,
                  // loop: true,
                  oncomplete: function () {
                    this.oncomplete = null;
                    effect.removeSelf();
                  }
                });
                // console.log(sprite);
                var skeleton = sprite.skeleton;
                var slot = skeleton.findSlot("sb_diaochan");
                var slot2 = skeleton.findSlot("jieyin");

                // console.log(slot);
                var attachment = slot.getAttachment();
                var attachment2 = slot2.getAttachment();
                // console.log(attachment);
                var region = animation.createTextureRegion(image);
                var region2 = animation.createTextureRegion(fontImage);
                // console.log(region);
                // console.log(region2);

                // let scale = Math.min(288 / region.width, 378 / region.height);
                // Math.min(389 / 138, 410 / 253);
                /-*attachment.width = region.width;
                attachment.height = region.height;
                attachment2.width = region2.width;
                attachment2.height = region2.height;
                alert(region.width+' - '+region.height);*-/
                attachment = slot.getAttachment();
				region = animation.createTextureRegion(image);
				attachment.y = 0;
				
				let scale;
				if(!playerAvatar.classList.contains('No_Outcroped')) {
    				scale = Math.min(138 / region.width, 253 / region.height);
    				attachment.width = region.width * scale;
    				attachment.height = region.height * scale;
				}else {
                    var disPec=168/191;
				    scale = Math.min(138 / region.width, 253 / region.height);
    				attachment.width = region.width * scale;
    				attachment.height = region.height * scale * disPec;
                    attachment.y -= attachment.height * (1 - disPec) * 0.5;
				}
				attachment.setRegion(region);
				attachment.updateOffset();
                //region.width = 138;
                //region.height = 253;

                // window.ttt = attachment;
                // window.ttt2 = attachment2;

                var size = skeleton.bounds.size;
                sprite.scale = Math.max(animation.canvas.width / size.x, animation.canvas.height / size.y);
                //太虚幻境修复一下大小
                if(get.mode()=='taixuhuanjing') {
                    sprite.scale /= 2;
                }
                if (false) {
                  if (game.documentZoom > 1.2) {
                    sprite.scale /= 1.3;
                  }
                  if (dui.isMobile()) {
                  // 移动端修改特效大小
                    sprite.scale /= 1.5;
                  }
                }
                //稍微放大一点点
                if(lib.config['extension_史诗卡牌_skillEffectsScale']) {
                    var scales=parseFloat(lib.config['extension_史诗卡牌_skillEffectsScale'])/10;
                    sprite.scale*=scales;
                }
                if(action=="animation1") {
                    attachment.y += 0;
                }else {
                    attachment.y += 12;
                }
                // ... 其他代码 ...
                // 添加下面这行代码：将字体向上移动13个单位
                attachment2.y = (attachment2.y || 0) + 13;  // 关键修改
                // ... 其他代码 ...
                attachment.setRegion(region);
                attachment.updateOffset();
                attachment2.setRegion(region2);
                attachment2.updateOffset();

                animation.canvas.parentNode.insertBefore(effect, animation.canvas.nextSibling);
              }
            }

            EpicFX.utils.getFontImage(get.translation(skillName), action === "animation1" ? true : false).then((Image) => {
              fontImage = Image;
              count++;
              start();
            });
            image.onload = function () {
              count++;
              start();
            }
            image.onerror = function () {
              //count++;
              //start();
              this.onerror = void 0;
              this.src = getComputedStyle(playerAvatar).backgroundImage.slice(5, -2);
            }
            image.src = durl;
          }
          EpicFX.initSCSAnim();
          EpicFX.checks.push("skillEffects");
        });*/
      }
      

      window.EpicFX.animate = {};
      
      window.EpicFX.watchTriggers(function () {
        return window.dcdAnim;
      }, function () {
        
       
        
        
        window.EpicFX.initSCSAnim();
      });

      
     

      let styleNode = document.createElement("style");
      styleNode.textContent = ".card>.top-name > img { pointer-events: none; }\n" +
        ".card >.distance> img { pointer-events: none; }";
      document.head.appendChild(styleNode);
    }, precontent: function () {
      window.EpicFX = {};
      window.EpicFX.extensionPath = lib.assetURL + "extension/史诗卡牌/";
      var font = new FontFace('STXingkai', `url("${lib.assetURL}font/xingkai.woff2")`/*, `url("${EpicFX.extensionPath}asset/font/STXINGKA.ttf")`*/);
      font.load().then(function (loadedFont) {
        document.fonts.add(loadedFont);
      });
     window.EpicFX.watchTriggers = function (conditions, callback) {
        if (conditions()) {
          callback()
        } else {
          requestAnimationFrame(function () {
            window.EpicFX.watchTriggers(conditions, callback);
          });
        }
      };
      window.EpicFX.overrides = function (dest, src) {
        if (!src) return
        for (let key in src) {
          dest[key] = src[key];
        }
      };
      
      window.EpicFX.module = {
        js: function (path) {
          if (!path) return console.error('path');

          var _this = this;
          var script = document.createElement('script');
          script.onload = function () {
            this.remove();
          };
          script.onerror = function () {
            this.remove();
            console.error(this.src + 'not found');
          };
          script.src = path;
          document.head.appendChild(script);
          return script;
        }, css: function (path) {
          if (!path) return console.error('path');
          var link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = path;
          document.head.appendChild(link);
          return link;
        }, import: function (module) {
          if (!this.modules) this.modules = [];
          if (typeof module != 'function') return console.error('import failed');
          this.modules.push(module);
        }, init: function () {
          if (!lib.config['extension_十周年UI_enable']) {
            return false;
            //return alert("请先安装或开启十周年UI扩展！");
          }
          this.css(window.EpicFX.extensionPath + 'extension.css');

          

          //if (lib.config["extension_史诗卡牌_card"]) {
          if(true) {
              setTimeout(() => {
              this.css(window.EpicFX.extensionPath + 'card.css');
            }, 2000);

            

            window.EpicFX.card = {};
            if (lib.config["extension_史诗卡牌_cardPhantom"]) {
              this.js(window.EpicFX.extensionPath + 'cardPhantom.js');
            }

           if (lib.config["extension_史诗卡牌_cardFold"]) {
              window.EpicFX.card.expand = function (card) {
                if (ui.select) {
                  this.cancel(ui.select);
                }
                ui.select = card;
                var width = Math.round(card.offsetWidth * card.cs);
                var next = card;
                var to;
                while (true) {
                  if (next.nextElementSibling) {
                    if (!card.linkedCards) {
                      card.linkedCards = [];
                    }
                    next = next.nextElementSibling;
                    if (!to) to = width - (next.tx - card.tx);
                    var transform = next.style.transform;
                    next.res = next.tx + to;
                    next.style.transform = transform.replace(next.tx, next.res);
                    next.move = to;
                    next.tx = next.res;
                    card.linkedCards.push(next);
                  } else {
                    break;
                  }
                }
              };
              window.EpicFX.card.cancel = function (card) {
                var cards = card.linkedCards;
                var move;
                for (var i = 0; i < cards.length; i++) {
                  var transform = cards[i].style.transform;
                  if (!move) {
                    if (cards[i].move) move = cards[i].move;
                    else {
                      var width = Math.round(card.offsetWidth * card.cs);
                      move = width - (cards[i].tx - card.tx);
                    }
                  }
                  var res = cards[i].res - move;
                  cards[i].style.transform = transform.replace(cards[i].res, res);
                  cards[i].tx = res;
                }
                card.linkedCards = [];
              };
            }

            

            
          }

          if(lib.config["extension_史诗卡牌_cardEmoji"]) {
              this.js(window.EpicFX.extensionPath + "emoji.js");
          }

          // this.js(window.EpicFX.extensionPath + "plugin/NIKKE.js");
          // this.js(window.EpicFX.extensionPath + "plugin/MahjongSoul.js");
        }
      };
      window.EpicFX.module.init();
      window.EpicFX.utils = {
            //Helasisy：我也不知道修了个杀，先不凑合着用吧
            /*getFontImage: function (text, type) {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    // 先设置字体以测量文本宽度
                    ctx.font = 'bold 102px STXingkai';
                    const textWidth = ctx.measureText(text).width;
                    
                    // 设置canvas宽度为文本宽度加上适当边距
                    canvas.width = textWidth + 20; // 增加10像素的左右边距
                    canvas.height = 105;
        
                    // 重新设置ctx属性（因为canvas尺寸改变会重置状态）
                    const gradient = ctx.createLinearGradient(0, 0, 120, 250);
                    if (type) {
                        gradient.addColorStop(0, '#ffffff');
                        gradient.addColorStop(0.25, '#efd5f6');
                        gradient.addColorStop(0.6, '#2200fd');
                        ctx.strokeStyle = '#150C16';
                    } else {
                        gradient.addColorStop(0.15, '#ffec00');
                        gradient.addColorStop(0.6, '#ff5b00');
                        gradient.addColorStop(0.65, '#f1af36');
                        ctx.strokeStyle = '#492A01';
                    }
        
                    const y = 90;
                    ctx.font = 'bold 102px STXingkai';
                    
                    // 使用测量后的文本宽度进行居中绘制
                    const xOffset = 10; // 左边距
                    
                    ctx.strokeText(text, xOffset - 3, y);
                    ctx.strokeText(text, xOffset, y);
                    ctx.strokeText(text, xOffset - 1, y + 3);
                    ctx.strokeText(text, xOffset - 1, y - 3);
        
                    ctx.font = '100px STXingkai';
                    ctx.fillStyle = gradient;
                    ctx.fillText(text, xOffset, y);
        
                    const dataURL = canvas.toDataURL('image/png');
        
                    img.onload = () => resolve(img);
                    img.onerror = (error) => reject(error);
                    img.src = dataURL;
                });
            },*/
        getFontImage: function (text, type) {
          return new Promise((resolve, reject) => {
            const img = new Image();

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 210;
            if(text?.length) {
                canvas.width = text.length * 105;
            }
            canvas.height = 105;

            //const gradient = ctx.createLinearGradient(0, 0, 105, 250);
            const gradient = ctx.createLinearGradient(0, 0, 120, 250);
            if (type) {
              gradient.addColorStop(0, '#ffffff');
              gradient.addColorStop(0.25, '#efd5f6');
              gradient.addColorStop(0.6, '#2200fd');
              ctx.strokeStyle = '#150C16';
            } else {
              gradient.addColorStop(0.15, '#ffec00');
              gradient.addColorStop(0.6, '#ff5b00');
              gradient.addColorStop(0.65, '#f1af36');
              // ctx.shadowOffsetX = 5;
              // ctx.shadowOffsetY = 5;
              // ctx.shadowBlur = 10;
              // ctx.shadowColor = '#492a0173';
              ctx.strokeStyle = '#492A01';
            }

            //const y = 79;
            const y = 90;
            ctx.font = 'bold 102px STXingkai';
            ctx.strokeText(text, -3, y);
            ctx.font = 'bold 102px STXingkai';
            ctx.strokeText(text, 0, y);
            ctx.font = 'bold 102px STXingkai';
            ctx.strokeText(text, -1, y + 3);
            ctx.font = 'bold 102px STXingkai';
            ctx.strokeText(text, -1, y - 3);

            ctx.font = '100px STXingkai';
            ctx.fillStyle = gradient;
            ctx.fillText(text, 0, y);

            const dataURL = canvas.toDataURL('image/png');

            img.onload = () => {
              resolve(img);
            }
            img.onerror = (error) => {
              reject(error);
            };
            img.src = dataURL;
          });
        },
        saveFile: function (filename, sourcepath, targetPath, data, isCopy = true) {
          var item = localStorage.getItem('noname_inited');
          if (item && item === "nodejs") {
            const path = require('path');
            const fs = require('fs');

            if (!isCopy) {
              fs.writeFile(targetPath, data, (err) => {
                if (err) {
                  console.error('保存文件时出错：', err);
                } else {
                  alert(`数据已写入到 ${targetPath} 文件中`);
                }
              });
            } else {
              if (targetPath === "桌面") {
                const os = require('os');
                targetPath = path.join(os.homedir(), 'Desktop', filename);
              }
              fs.copyFile(sourcepath, targetPath, (err) => {
                if (err) {
                  console.error('保存文件时出错：', err);
                } else {
                  alert(`已保存到 ${targetPath}`);
                }
              });
            }
          } else {
            alert("当前环境不支持.")
          }
        },
        getRandomNumber: function (min, max) {
          var random = Math.random();
          var result = Math.floor(random * (max - min + 1) + min);
          return result;
        },
        getAngle: function (source, target, data) {
          let x1 = data ? data.x + data.width / 2 : source.left + source.width / 2;
          let y1 = data ? data.y : source.top + source.height / 2;

          let x2 = target.left + target.width / 2;
          let y2 = target.top + target.height / 2;
          let deltaX = x2 - x1;
          let deltaY = y2 - y1;
          let angleInRadians = Math.atan2(deltaY, deltaX);
          let angleInDegrees = (angleInRadians * 180 / Math.PI) * -1;
          return angleInDegrees;
        },
        getAngle2: function (target, source, initialDirection = "up") {
          const targetRect = target.getBoundingClientRect();
          const sourceRect = source.getBoundingClientRect();
          const targetX = targetRect.x + targetRect.width / 2;
          const targetY = targetRect.y + targetRect.height / 2;
          const sourceX = sourceRect.x + sourceRect.width / 2;
          const sourceY = sourceRect.y + sourceRect.height / 2;

          let dx = targetX - sourceX;
          let dy = targetY - sourceY;

          let angle = Math.atan2(dy, dx) * 180 / Math.PI;
          let initialAngle = 0;
          switch (initialDirection) {
            case 'up':
              initialAngle = -270;
              break;
            case 'down':
              initialAngle = -90;
              break;
            case 'left':
              initialAngle = -180;
              break;
          }

          return angle + initialAngle;
        },
        getAngle3: function (target, source, initialDirection = "up", me) {
          const targetRect = target.getBoundingClientRect();
          const sourceRect = source.getBoundingClientRect();
          const targetX = targetRect.x + targetRect.width / 2;
          const targetY = targetRect.y + targetRect.height / 2;
          const sourceX = sourceRect.x + sourceRect.width / 2;
          const sourceY = sourceRect.y + sourceRect.height / (me ? 1.5 : 2);

          let dx = targetX - sourceX;
          let dy = targetY - sourceY;

          let angle = Math.atan2(dy, dx) * 180 / Math.PI;
          let initialAngle = 0;
          switch (initialDirection) {
            case 'up':
              initialAngle = -270;
              break;
            case 'down':
              initialAngle = -90;
              break;
            case 'left':
              initialAngle = -180;
              break;
          }

          return angle + initialAngle;
        },
        getAngle4: function (targetRect, sourceRect, initialDirection = "up", me) {
          const targetX = targetRect.x + targetRect.width / 2;
          const targetY = targetRect.y + targetRect.height / 2;
          const sourceX = sourceRect.x + sourceRect.width / 2;
          const sourceY = sourceRect.y + sourceRect.height / (me ? 1.5 : 2);

          let dx = targetX - sourceX;
          let dy = targetY - sourceY;

          let angle = Math.atan2(dy, dx) * 180 / Math.PI;
          let initialAngle = 0;
          switch (initialDirection) {
            case 'up':
              initialAngle = -270;
              break;
            case 'down':
              initialAngle = -90;
              break;
            case 'left':
              initialAngle = -180;
              break;
          }

          return angle + initialAngle;
        },
        fixAngle: function (angle) {
          let limitedAngle = angle % 360;
          if (limitedAngle < 0) {
            limitedAngle += 360;
          }
          if (limitedAngle > 180) {
            limitedAngle -= 360;
          }
          return limitedAngle;
        },
        checkElementPosition: function (ele) {
          let rect = ele.getBoundingClientRect();
          let uiWindow = ui.window.getBoundingClientRect();
          if (rect.left < uiWindow.width / 2 && rect.right < uiWindow.width / 2) {
            return 0;
          } else if (rect.left >= uiWindow.width / 2 && rect.right >= uiWindow.width / 2) {
            return 2;
          } else {
            return 1
          }
        },
        replaceFunctionSpecifyContent: function (targetFunction, str, content) {
          let name = targetFunction.name;
          let toString = targetFunction.toString();
          let s = toString.replace(new RegExp(str, 'g'), content);
          return eval(`(${s})`);
        },
        /**
         *
         * @param sprite frames, rect, src, before, end
         */
        playSequenceFrame: function (sprite) {
          if (!sprite.frames || !sprite.frames.length) {
            return console.warn("No Data!!!");
          }
          const img = new Image();
          img.style.width = sprite.rect.width;
          img.style.height = sprite.rect.height;
          img.style.transform = `translate(${sprite.rect.x}px,${sprite.rect.y}px)`;
          img.style.zIndex = 10;
          img.src = sprite.frames[0].src;
          img.classList.add("SequenceFrame");
          ui.arena.appendChild(img);

          let currentFrame = 0;
          let lastRenderTime = 0;

          function play(timestamp) {
            const timeSinceLastRender = timestamp - lastRenderTime;
            if (timeSinceLastRender >= 1000 / sprite.fps) {
              lastRenderTime = timestamp;
              img.src = sprite.frames[currentFrame].src;
              currentFrame++;

              if (currentFrame < sprite.frames.length) {
                requestAnimationFrame(play);
              } else {
                if (sprite.end && typeof sprite.end == "function") sprite.end(img, sprite.rect.x, sprite.rect.y);
                return;
              }
            } else {
              requestAnimationFrame(play);
            }
          }

          img.onload = function () {
            if (sprite.before && typeof sprite.before == "function") sprite.before(img, sprite.rect.x, sprite.rect.y);
            play();
            this.onload = null;
          }
        },
        preloadImages: function (data, url) {
          var promises = [];
          var images = [];

          for (var i = 0; i < data.count; i++) {
            var img = new Image();
            img.src = `${url + data.name + i}.png`;

            var promise = new Promise(function (resolve, reject) {
              img.onload = function () {
                images.push(this);
                resolve();
              }
              img.onerror = reject;
            });

            promises.push(promise);
          }

          return Promise.all(promises).then(function () {
            return {
              key: data.key,
              images
            };
          }).catch(function () {
            console.log("图片集加载失败！");
          });
        },
        checkConnectivity: function (url) {
          return fetch(url, {mode: 'cors'})
            .then(response => {
              if (response.ok) {
                return true;
              } else {
                return false;
              }
            })
            .catch(error => {
              return false;
            });
        },
        movableButton: function (node, click) {
          if (node) {
            var startX, startY, endX, endY, isTouch;
            var isMobile = navigator.userAgent.match(/(Android|iPhone|SymbianOS|Windows Phone|iPad|iPod)/i);
            var cases;
            if (isMobile) cases = ['touchstart', 'touchmove', 'touchend'];
            else cases = ['mousedown', 'mousemove', 'mouseup'];
            var maxW, maxH;
            node["on" + cases[0]] = function (e) {
              e.stopPropagation();
              const nodeRect = node.getBoundingClientRect();
              maxW = document.body.clientWidth - nodeRect.width;
              maxH = document.body.clientHeight - nodeRect.height;
              if (isMobile) e = e.targetTouches[0];
              startX = e.clientX;
              startY = e.clientY;
              node.oL = e.clientX / game.documentZoom - nodeRect.x;
              node.oT = e.clientY / game.documentZoom - nodeRect.y;
              isTouch = true;
              document.addEventListener(cases[1], move, {passive: false});
              document.addEventListener(cases[2], up, {passive: false});
              node["on" + cases[2]] = up;
            };

            function move(e) {
              if (!isTouch) return;
              e.preventDefault();
              e.stopPropagation();
              if (isMobile) e = e.targetTouches[0];
              var oLeft = e.clientX / game.documentZoom - node.oL;
              var oTop = e.clientY / game.documentZoom - node.oT;
              if (oLeft < 0) {
                oLeft = 0;
              } else if (oLeft >= maxW) {
                oLeft = maxW;
              }
              if (oTop < 0) {
                oTop = 0;
              } else if (oTop >= maxH) {
                oTop = maxH;
              }
              node.style.transform = `translate(${oLeft}px,${oTop}px)`;
            }

            function up(e) {
              if (!isTouch) return;
              e.stopPropagation();
              e.preventDefault();
              if (isMobile) e = e.changedTouches[0];
              endX = e.pageX;
              endY = e.pageY;
              document.removeEventListener(cases[1], move);
              document.removeEventListener(cases[2], up);
              node["on" + cases[2]] = null;
              isTouch = false;
              var d = Math.sqrt((startX - endX) * (startX - endX) + (startY - endY) * (startY - endY));
              if (!isNaN(d)) {
                if (d === 0 || d < 2) {
                  click();
                }
              }
            }
          }
        },
        showCard: function (card, player, callback) {
          var bounds = dui.boundsCaches.arena;
          bounds.check();
          let x = (bounds.width - bounds.cardWidth) / 2;
          let y = (bounds.height - bounds.cardHeight) / 2;
          x = Math.round(x);
          y = Math.round(y);
          if (get.position(card) != 'h') {
            let copy = card.copy('thrown');
            copy.style.transform = 'translate(' + x + 'px, ' + y + 'px)' + 'scale(' + bounds.cardScale + ')';
            ui.arena.appendChild(copy);
            callback(card, copy, player);
          } else {
            card.style.transform = 'translate(' + x + 'px, ' + y + 'px)' + 'scale(' + bounds.cardScale + ')';
            ui.arena.appendChild(card);
            callback(card, null, player);
          }
        },
        gainTo: function (cards, player) {
          var fragment = document.createDocumentFragment();
          let card;
          for (let i = 0; i < cards.length; i++) {
            card = cards[i]
            card.fix();

            fragment.insertBefore(card, fragment.firstChild);
          }

          if (player == game.me) {
            dui.layoutHandDraws(cards.reverse());
            dui.queueNextFrameTick(dui.layoutHand, dui);
            // game.addVideo('gain12', player, [get.cardsInfo(fragment.childNodes), gaintag]);
          }

          var s = player.getCards('s');
          if (s.length)
            player.node.handcards1.insertBefore(fragment, s[0]);
          else player.node.handcards1.appendChild(fragment);
        },
        isWithin24Hours: function (timestamp) {
          console.log(timestamp);
          const record = new Date(timestamp);
          const current = new Date();
          const timeDifference = current.getTime() - timestamp;
          const hoursDifference = timeDifference / (1000 * 60 * 60);
          return hoursDifference >= 0 && hoursDifference <= 24 && current.getDate() === record.getDate();
        },
        scsDialog: class SCSDialog {
          constructor() {
            this.init();
          }

          init() {
            const frag = document.createDocumentFragment();
            const scsBox = document.createElement("div");
            scsBox.obj = this;
            this.scsBox = scsBox;
            scsBox.classList.add("scsBox");
            const scsBoxTitle = document.createElement("div");
            scsBoxTitle.classList.add("scsBoxTitle");
            let skillTitle = new Image();
            skillTitle.src = `${window.EpicFX.extensionPath}asset/img/skill/title/k_danggu.png`;
            let arrow = new Image();
            arrow.src = `${window.EpicFX.extensionPath}asset/img/base/arrow.png`;
            arrow.classList.add("scsArrow");
            scsBoxTitle.appendChild(skillTitle);
            scsBoxTitle.appendChild(arrow);
            this.arrow = arrow;
            this.scsBoxTitle = scsBoxTitle;
            scsBox.appendChild(scsBoxTitle);
            const scsContent = document.createElement("div");
            this.scsContent = scsContent;
            scsContent.classList.add("scsContent");
            scsBoxTitle.addEventListener("click", function (e) {
              let scsContent = e.target.closest(".scsBox").obj.scsContent;
              const contentHeight = scsContent.scrollHeight;
              scsContent.style.maxHeight = contentHeight + 'px';
              const computedStyle = window.getComputedStyle(scsContent);
              const height = computedStyle.getPropertyValue('max-height');

              if (height === '0px' || height === '') {
                scsContent.style.maxHeight = contentHeight + 'px';
                arrow.style.transform = "rotate(0deg)";
              } else {
                scsContent.style.maxHeight = '0px';
                arrow.style.transform = "rotate(180deg)";
              }
            })
            for (let i = 0; i < 2; i++) {
              let temp = i == 0 ? "zhu" : "fu";
              const xuan = document.createElement("div");
              xuan.classList.add("scsXJQ");
              const scsType = document.createElement("div");
              scsType.classList.add("scsType");
              scsType.insertAdjacentHTML("afterbegin",`<p>${i == 0 ? "主将" : "副将"}</p>`);
              xuan.appendChild(scsType);
              const wujiangqu = document.createElement("div");
              wujiangqu.classList.add("scsWujiangqu");
              wujiangqu.setAttribute("id", temp);
              xuan.appendChild(wujiangqu);
              this[temp] = wujiangqu;
              scsContent.appendChild(xuan);
            }
            scsBox.appendChild(scsContent);
            const footer = document.createElement("div");
            footer.classList.add("scsFooter");
            footer.insertAdjacentHTML("afterbegin", "你发动了<span style='color: #a4dfd5'>党锢</span>，须选择1名常侍与上方的常侍组成双将");
            scsBox.appendChild(footer);
            this.show();
            frag.appendChild(scsBox);
            this.frag = frag;
          }

          removeElement() {
            this.scsBox.remove();
          }

          create() {
            ui.window.appendChild(this.frag);
          }

          show(bool) {
            if (bool) {
              this.scsBox.style.display = null;
              for (let key in this.charFu) {
                if (this.charFu[key].isLock) {
                  this.charFu[key].say();
                }
              }
            } else {
              this.scsBox.style.display = "none";
            }
          }
        },
        characterCard: class CharacterCard {
          constructor(name, url, group, lines, collection) {
            if (!name || !url || !group) return;
            this.sourceName = name;
            this.group = group;
            this.lines = lines;
            this.collection = collection;
            const frag = document.createDocumentFragment();
            const char = document.createElement("div");
            char.obj = this;
            char.classList.add("KCharacter");
            char.setBackgroundImage(`extension/史诗卡牌/asset/img/base/name2_${group}.png`);
            const select = document.createElement("div");
            select.classList.add("KCharacterSelect");
            select.style.opacity = 0;
            this.selectDiv = select;
            char.appendChild(select);
            const p = document.createElement("div");
            p.classList.add("KCharacterName");
            p.textContent = get.translation(name);
            this.name = p;
            char.appendChild(p);
            const image = new Image();
            image.classList.add("KCharacterImg");
            image.src = url;
            this.img = image;
            char.appendChild(image);
            if (lines) {
              const sayDiv = document.createElement("div");
              sayDiv.insertAdjacentHTML("afterbegin", `<div>${this.lines}</div>`);
              sayDiv.classList.add("sayDiv");
              char.sayDiv = sayDiv;
              char.appendChild(sayDiv);
            }
            this.char = char;
            frag.appendChild(char);
            this.frag = frag;
          }

          removeElement() {
            this.char.remove();
          }

          create(dom) {
            if (!dom) {
              ui.arena.appendChild(this.frag);
            } else {
              dom.appendChild(this.frag);
            }
          }

          say() {
            if (this.char.sayDiv) {
              this.char.sayDiv.style.display = "block";
              this.char.sayDiv.style.opacity = "1";
              game.playAudio(`../extension/史诗卡牌/asset/audio/character/skill/${this.collection}/${this.sourceName}.mp3`);
              setTimeout(() => {
                this.char.sayDiv.style.opacity = null;
                setTimeout(() => {
                  this.char.sayDiv.style.display = null;
                },300);
              },4000);
            }
          }

          setGroup(group) {
            if (group) {
              this.group = group;
              this.char.setBackgroundImage(`extension/史诗卡牌/asset/img/base/name2_${group}.png`);
            }
          }

          getGroup() {
            return this.group;
          }

          setName(name) {
            if (name) {
              this.name.textContent = name;
            }
          }

          getName() {
            return this.name.textContent;
          }

          setImg(url) {
            if (url) {
              this.img.src = url;
            }
          }

          getLines() {
            return this.lines;
          }

          setLines(str) {
            this.lines = str;
            if (this.char.sayDiv) {
              this.char.sayDiv.firstChild.textContent = str;
            }
          }

          addListener(types,fun) {
            if (types && fun) {
              this.char.addEventListener(types, fun);
            }
          }

          lock(bool) {
            if (bool) {
              this.img.style.filter = "grayscale(100%)";
              // this.char.style.filter = "grayscale(100%)";
              this.isLock = true;
            } else {
              this.img.style.filter = null;
              this.isLock = false;
            }
          }
        },
        popup: class Popup {

          constructor(str1, str2, parentNode, position) {
            this.popups = dui.element.create("characterPopup", parentNode);
            if (position) this.popups.style.transform = `translate(${position.x}px,${position.y}px)`;
            this.popups.str1 = str1;
            this.popups.str2 = str2;
            this.popups.insertAdjacentHTML("afterbegin", `<div class="characterPopupText"><span style="color: yellow">${str1}</span>:${str2}</div>`);
          }
          popup() {
            if (this.timeout) clearTimeout(this.timeout);
            this.popups.style.display = "block";
            this.timeout =  setTimeout(() => {
              this.popups.style.display = null;
            },4000);
          }

          hide() {
            if (this.timeout) clearTimeout(this.timeout);
            this.popups.style.display = null;
          }

          setPopup(str1, str2, position) {
            if (this.popups) {
              this.popups.str1 = str1;
              this.popups.str2 = str2;
              this.popups.innerHTML = '';
              this.popups.insertAdjacentHTML("afterbegin", `<div class="characterPopupText"><span style="color: yellow">${str1}</span>:${str2}</div>`);
              var that = this;
              requestAnimationFrame(function () {
                let rect = that.popups.getBoundingClientRect();
                that.popups.style.transform = `translate(${position.x}px,${position.y-rect.height}px)`;
              })

            }
          }
        },
        checkConflict: function (map,source,target) {
          // map is a key-value pair.
          return map[source].includes(target);
        }
      };
      window.EpicFX.getElementCenterRect = function (rect) {
        return {
          x: rect.left + rect.width / 2,
          y: decadeUI.get.bodySize().height - (rect.bottom - rect.height / 2),
          width: rect.width,
          height: rect.height
        }
      };
      window.EpicFX.getElementTopRect = function (rect) {
        return {
          x: rect.left,
          y: decadeUI.get.bodySize().height - rect.top,
          width: rect.width,
          height: rect.height
        }
      };
      window.EpicFX.getRect = function (rect) {
        return {
          x: rect.left + rect.width / 2,
          y: decadeUI.get.bodySize().height - rect.top,
          width: rect.width,
          height: rect.height
        }
      }
      window.EpicFX.getRect2 = function (rect) {
        return {
          x: rect.left + rect.width / 2,
          y: rect.top,
          width: rect.width,
          height: rect.height
        }
      }
      window.EpicFX.getCenterRect = function (rect) {
        return {
          x: rect.left + rect.width / 2,
          y: rect.bottom - rect.height / 2,
          width: rect.width,
          height: rect.height
        }
      };
      window.EpicFX.hasHiddenSkill = function (character, player) {
        let info = lib.character[character];
        if (!info) return false;
        if (info[4] && info[4].contains('hiddenSkill') && !this.noclick) return true;
        return false;
      };
      let pp = window.EpicFX.utils.replaceFunctionSpecifyContent(lib.element.content.damage, `"step 4"`, `"step 4"\n\tevent.trigger('damageBegin5');`);
      lib.element.content.damage = pp;
      let pp2 = window.EpicFX.utils.replaceFunctionSpecifyContent(lib.element.content.damage, `"step 5"`, `event.trigger('damageBegin6');\n\t"step 5"`);
      lib.element.content.damage = pp2;
      window.EpicFX.initSCSAnim = function () {
        window.EpicFX.scs = {};
        const url = "../../../史诗卡牌/asset/skel/skill/scs/SS_scs_";
        const data = ["bagua", "bgrw", "bgfw"];
        let num = data.length;

        function load() {
          data[num - 1] = url + data[num - 1];
          dcdAnim.loadSpine(data[num - 1], "skel", function () {
            dcdAnim.prepSpine(data[num - 1]);
            num -= 1;
            if (num > 0) load();
          })
        }

        load();

        window.EpicFX.scs.data = data;
        window.EpicFX.scs.over = false;
        window.EpicFX.scs.ten = false;
        window.EpicFX.scs.count = 1;
        window.EpicFX.scs.loaded = [];
        
        window.getEPICscs = function() {
          let player = _status.event.player;
          if(!player) return window.EpicFX.scs;
          if(!player.epicSCS) {
            player.epicSCS = {
              data: data,
              over: false,
              ten: false,
              count: 1,
              loaded: [],
            };
          }
          return player.epicSCS;
        };

        window.EpicFX.fuhuo = {
          name: "../../../史诗卡牌/asset/skel/base/Ss_BuSi_JueSe",
          action: "play",
          scale: 0.75,
          x: [0, 0.53],
          loop: false
        };
        dcdAnim.loadSpine(window.EpicFX.fuhuo.name, "skel", function () {
          dcdAnim.prepSpine(window.EpicFX.fuhuo.name);
        });
        window.EpicFX.huihe = {
          name: "../../../史诗卡牌/asset/skel/base/Ss_BuSi_HuiHe",
          action: "play",
          scale: 0.75,
          loop: false
        };
        dcdAnim.loadSpine(window.EpicFX.huihe.name, "skel", function () {
          dcdAnim.prepSpine(window.EpicFX.huihe.name);
        });
        lib.onover.push(function (res) {
          if (res === true) {
            game.players.forEach(e => {
              if (e.name.indexOf("shichangshi") != -1) {
                setTimeout(() => {
                  game.playAudio("../extension/史诗卡牌/asset/audio/scs.mp3");
                },1000);
              }
            });
          }
        })
      }
      window.EpicFX.playSCSAnim = function (name1, name2) {
        const obj = {
          "scs_zhangrang": "huo10",
          "scs_zhaozhong": "huo9",
          "scs_sunzhang": "huo7",
          "scs_bilan": "huo3",
          "scs_xiayun": "huo2",
          "scs_hankui": "huo1",
          "scs_lisong": "huo5",
          "scs_duangui": "huo8",
          "scs_guosheng": "huo6",
          "scs_gaowang": "huo4",
        }

        function p() {
          for (let k = 1; k <= 2; k++) {
            let temp = obj[(k == 1 ? name1 : name2)];
            if(!temp) continue;
            if (window.getEPICscs().ten) {
              window.getEPICscs().bagua.skeleton.state.setAnimation(window.getEPICscs().count, temp, true);
            } else {
              window.getEPICscs().bagua.skeleton.state.addAnimation(window.getEPICscs().count, temp, true, 0);
            }
            window.getEPICscs().count++;
            window.getEPICscs().loaded.push(temp);
          }
        }

        if (window.getEPICscs().isReady) {
          if (window.getEPICscs().over) {
            game.playAudio("../extension/史诗卡牌/asset/audio/game/longerDisappear.mp3");
          } else {
            game.playAudio("../extension/史诗卡牌/asset/audio/game/shortDisappear.mp3");
          }
          window.getEPICscs().bgfw.speed = 1;
          window.getEPICscs().bgfw.opacity = 1;
          window.getEPICscs().bagua.speed = 1;
          window.getEPICscs().bagua.opacity = 1;
          let bagua = window.getEPICscs().bagua.skeleton;
          bagua.state.setAnimation(0, "play1", false);
          for (let i = 0; i < window.getEPICscs().loaded.length; i++) {
            bagua.state.setAnimation(i + 1, window.getEPICscs().loaded[i], true);
            const track = bagua.state.tracks[i + 1];
            track.animationStart = 30 / track.animation.duration;
          }
          bagua.state.addAnimation(0, "play2", false, 0);
          setTimeout((bagua) => {
            p();
            setTimeout((bagua) => {
              for (let i = 1; i < bagua.state.tracks.length; i++) {
                bagua.state.setEmptyAnimation(i);
              }
              bagua.state.setAnimation(0, "play3", false);
              bagua.state.addAnimation(0, "play1", true, 0);
              setTimeout(() => {
                window.getEPICscs().bagua.speed = 0;
                window.getEPICscs().bagua.opacity = 0;
                if (window.getEPICscs().over) {
                  setTimeout(() => {
                    window.getEPICscs().bgrw.speed = 0;
                    // window.getEPICscs().bgrw.opacity = 0;
                    window.getEPICscs().bgrw.fadeTo(0, 500);
                    window.getEPICscs().bgfw.speed = 0;
                    // window.getEPICscs().bgfw.opacity = 0;
                    window.getEPICscs().bgfw.fadeTo(0, 500);
                    ui.scsPageItem.style.opacity = 0;
                    setTimeout(() => {
                      ui.scsPageItem.style.display = "none";
                    }, 500);
                    game.resume();
                  }, 3000);
                } else {
                  setTimeout(() => {
                    window.getEPICscs().bgfw.speed = 0;
                    // window.getEPICscs().bgfw.opacity = 0;
                    window.getEPICscs().bgfw.fadeTo(0, 500);
                    ui.scsPageItem.style.opacity = 0;
                    setTimeout(() => {
                      ui.scsPageItem.style.display = "none";
                    }, 500);
                    game.resume();
                  }, 300);
                }
              }, bagua.data.animations[12].duration * 1000 - 100);
              setTimeout(() => {
                if (window.getEPICscs().over) {
                  if (window.getEPICscs().bgrw) {
                    let bgrw = window.getEPICscs().bgrw.skeleton;
                    bgrw.state.setAnimation(0, "play1", false);
                    bgrw.state.addAnimation(0, "play2", true, 0);
                  } else {
                    window.getEPICscs().bgrw = dcdAnim.playSpine({
                      name: window.getEPICscs().data[1],
                      referNode: ui.scsPageItem,
                      scale: 1,
                      action: "play1",
                    });
                    let bgrw = window.getEPICscs().bgrw.skeleton;
                    bgrw.state.clearListeners();
                    bgrw.state.addAnimation(0, "play2", true, 0);
                  }
                  window.getEPICscs().ten = true;
                  window.getEPICscs().count = 1;
                }
              }, 1000);
            }, 1500, bagua);
          }, 500, bagua);
          bagua.state.addAnimation(0, "play3", true, 0);
        } else {
          game.playAudio("../extension/史诗卡牌/asset/audio/game/start.mp3");
          window.getEPICscs().bgfw = dcdAnim.playSpine({
            name: window.getEPICscs().data[2],
            referNode: ui.scsPageItem,
            scale: 1,
            action: "play",
            loop: true
          });
          window.getEPICscs().bagua = dcdAnim.playSpine({
            name: window.getEPICscs().data[0],
            referNode: ui.scsPageItem,
            scale: 1,
            action: "play1",
          });
          let bagua = window.getEPICscs().bagua.skeleton;
          bagua.state.clearListeners();
          bagua.state.addAnimation(0, "play2", false, 0);
          setTimeout((bagua) => {
            p();
            setTimeout((bagua) => {
              for (let i = 1; i < bagua.state.tracks.length; i++) {
                bagua.state.setEmptyAnimation(i);
              }
              bagua.state.setAnimation(0, "play3", true);
              // bagua.state.addAnimation(0, "play1", true, 0);
              setTimeout(() => {
                window.getEPICscs().bagua.speed = 0;
                window.getEPICscs().bagua.opacity = 0;
                window.getEPICscs().bgfw.speed = 0;
                window.getEPICscs().bgfw.opacity = 0;
                ui.scsPageItem.style.opacity = 0;
                setTimeout(() => {
                  ui.scsPageItem.style.display = "none";
                }, 500);
                game.resume();
              }, bagua.data.animations[12].duration * 1000 - 100);
            }, 1500, bagua);
          }, 500, bagua);
          window.getEPICscs().isReady = true;
        }
      }
    }, config: {
      分割线01:{
        "name":"<img style=width:240px src="+lib.assetURL+"extension/史诗卡牌/image/line.png>",
        "intro":"",
        "init":true,
        "clear":true,	   
    },
      /*card: {
        name: "卡牌区功能总开关", init: true, 
        update: function () {
          alert("开启或关闭后，需重启游戏生效.");
        }
      },*/
      skillEffects: {
        name: "手杀限定/觉醒技能特效",
        init: true,
      },
      skillEffectsScale: {
        name: "技能特效比例",
        init: true,
        init:11,
		item:{
			5:'50%',
			9:'90%',
			10:'100%',
			11:'110%',
			12:'120%',
			13:'130%',
			14:'140%',
			15:'150%',
		},
      },
      
      cardFold: {
        name: "🃏手牌完全折叠",
        init: true,
        intro: "开启之后，当手牌过多时会禁用滑动的方式管理手牌",
        onclick: function (item) {
          //alert("开启或关闭后，需重启游戏生效.");
          game.saveConfig('extension_EpicFX_cardFold',item);
          game.saveConfig('extension_史诗卡牌_cardFold',item);
        }
      },
      cardFold_proportion: {
        name: "🃏手牌折叠比例",
        init:10,
        intro: "关闭『手牌完全折叠』时生效，可以设置两张手牌折叠遮住的比例",
		item:{
			3:'30%',
			4:'40%',
			5:'50%',
			6:'60%',
			7:'70%',
			8:'80%',
			9:'90%',
			10:'100%',
		},
      },
      
      cardPhantom: {
        name: "幻影出牌", init: true, 
        /*update: function () {
          alert("开启或关闭后，需重启游戏生效.");
        }*/
      },
      
      cardEmoji: {
        name: "新菜篮子", init: false, 
        unshow: true,
        /*update: function () {
          alert("开启或关闭后，需重启游戏生效.");
        }*/
      },
      shichangshi: {
        name: "十常侍还原",
        init: true,
        intro: "开启此选项后，将修改十常侍的技能特效，使其更贴近移动版的效果。",
      },
      meihuaskills: {
        name: "技能显示优化",
        init: true,
        intro: "搬运自一个名为缘之空的扩展，可以优化部分武将技能的选牌显示，如定汉、蛊惑等。",
        /*update: function () {
          alert("开启或关闭后，需重启游戏生效.");
        }*/
      },
      分割线02:{
        "name":"<img style=width:240px src="+lib.assetURL+"extension/史诗卡牌/image/line.png>",
        "intro":"",
        "init":true,
        "clear":true,	   
    },
    },
    help: {}, package: {
      character: {
        character: {
          //"k_shichangshi": ['male', 'qun', 1, ['k_danggu', 'k_mowang'], ["die_audio"]],
        }, translate: {
          //"k_shichangshi": "十常侍"
        },
      },
      
      skill: {
        skill: {
          "k_danggu": {
            audio: 2,
            trigger: {
              player: 'enterGame',
              global: 'phaseBefore',
            },
            filter: function (event, player) {
              return event.name != 'phase' || game.phaseNumber == 0;
            },
            /*init:function(player,skill){
                if(player!=game.me) {
                    player.removeSkill(skill);
                    player.addSkill('mbdanggu');
                    player.unmarkSkill('mbdanggu');
                }
            },*/
            /*init:function(player,skill){
              ui.scsPage=function(){
                let player=_status.event.player;
                if(!player) return {};
                if(!player.scsPage) {
                    // EpicFX.initSCSAnim();
                    const scsPage = document.createElement("div");
                    scsPage.classList.add("scsPage");
                    scsPage.style.display = "none";
                    player.scsPage = scsPage;
                    ui.window.appendChild(scsPage);
                    const scsDialog = new EpicFX.utils.scsDialog();
                    scsDialog.create();
                    player.scsDialog = scsDialog;
                    player.xz = dui.element.create("characterXZ", player);
                    player.xz.xzz = dui.element.create("characterXZImg", player.xz, "img");
                    player.xz.xzz.src = `${EpicFX.extensionPath}asset/img/base/game_ud_waiting.png`;
                    player.xz.lc = dui.element.create("characterLC", player.xz);
                    player.xz.lc.style.left='54%';
                    player.xz.lc.p = dui.element.create("characterLC", player.xz.lc, "p");
                    player.xz.lc.p.textContent = "1";
                    player.xz.lc.img = dui.element.create("characterLCImg", player.xz.lc, "img");
                    player.xz.lc.img.src = `${EpicFX.extensionPath}asset/img/base/game_ud_turn_flag.png`;
                }
                return player.scsPage;
              }
              ui.scsPopups=function(){
                let me=_status.event.player;
                if(!me) return {};
                if(!me.scsPopups) {
                  me.scsPopups= new EpicFX.utils.popup(undefined, undefined, ui.window, undefined);
                }
                return me.scsPopups;
              }
            },*/
            derivation: 'k_danggu_faq',
            forced: true,
            unique: true,
            onremove: function (player) {
              delete player.storage.k_danggu;
              delete player.storage.k_danggu_current;
            },
            popups: {
              scstaoluan: "你可以将一张牌当任意一张牌使用。",
              scschiyan: "你使用杀可以暂时扣置目标角色牌，若装备和手牌数均大于对方，则额外造成伤害。",
              scszimou: "你使用第2,4,6张牌时，可以获得额外的牌。",
              scspicai: "你可以进行判定，若花色不相同可以一直判定，直至花色相同，然后可以把判定牌交给一名角色。",
              scsyaozhuo: "出牌阶段限一次，你可以选择一名其他角色拼点：若你赢，跳过其下一个摸牌阶段：若你没赢。你须弃置一张杀。",
              scsxiaolu: "出牌阶段限一次，你可以摸两张牌，然后你选择一项：弃置两张手牌，或将两张手牌交给一名其他角色。",
              scskuiji: "你可以观看一名角色手牌，并与其一共弃置四张不同花色的牌。",
              scschihe: "你使用杀可以从牌堆项翻牌，每张花色与杀相同的牌便使此杀伤害＋1，翻出的牌也会限制对方响应此杀。",
              scsniqu: "对一名角色造成火焰伤害。",
              scsanruo: "可以转化手牌应对各种攻势并不断获得其他角色的手牌。",
            },
            lines: {
              scs_zhangrang: "吾乃当今帝父，汝岂配与我同列？",
              scs_zhaozhong: "汝此等语，何不以溺自照？",
              scs_sunzhang: "闻谤而怒，见欲而喜，汝万万不能啊！",
              scs_bilan: "吾虽鄙夫，亦远胜尔等狂叟！",
              scs_xiayun: "宁享短福，莫为汝等庸奴！",
              scs_hankui: "贪财好贿，其罪尚小，不敬不逊，却为大逆！",
              scs_lisong: "区区不才可为帝之耳目，试问汝有何能？",
              scs_duangui: "哼！不过襟裾牛马，衣冠狗彘耳！",
              scs_guosheng: "此昏聩之徒，吾羞与为伍！",
              scs_gaowang: "若非吾之相助，汝安有今日？",
            },
            changshi: [
              ['scs_zhangrang', 'scstaoluan'],
              ['scs_zhaozhong', 'scschiyan'],
              ['scs_sunzhang', 'scszimou'],
              ['scs_bilan', 'scspicai'],
              ['scs_xiayun', 'scsyaozhuo'],
              ['scs_hankui', 'scsxiaolu'],
              ['scs_lisong', 'scskuiji'],
              ['scs_duangui', 'scschihe'],
              ['scs_guosheng', 'scsniqu'],
              ['scs_gaowang', 'scsanruo']
            ],
            conflictMap: {
              scs_zhangrang: [],
              scs_zhaozhong: [],
              scs_sunzhang: [],
              scs_bilan: ['scs_hankui'],
              scs_xiayun: [],
              scs_hankui: ['scs_bilan'],
              scs_lisong: [],
              scs_duangui: ['scs_guosheng'],
              scs_guosheng: ['scs_duangui'],
              scs_gaowang: ['scs_hankui', 'scs_duangui', 'scs_guosheng', 'scs_bilan'],
            },
            group: 'k_danggu_back',
            content: function () {
              'step 0'
              //game.hasDoublePossble=true;
              /*if (!ui.scsPageItem) {
                // EpicFX.initSCSAnim();
                const scsPage = document.createElement("div");
                scsPage.classList.add("scsPage");
                scsPage.style.display = "none";
                ui.scsPage = scsPage;
                ui.window.appendChild(scsPage);
                const scsDialog = new EpicFX.utils.scsDialog();
                scsDialog.create();
                player.scsDialog = scsDialog;
                player.xz = dui.element.create("characterXZ", player);
                player.xz.xzz = dui.element.create("characterXZImg", player.xz, "img");
                player.xz.xzz.src = `${EpicFX.extensionPath}asset/img/base/game_ud_waiting.png`;
                player.xz.lc = dui.element.create("characterLC", player.xz);
                player.xz.lc.style.left='54%';
                player.xz.lc.p = dui.element.create("characterLC", player.xz.lc, "p");
                player.xz.lc.p.textContent = "1";
                player.xz.lc.img = dui.element.create("characterLCImg", player.xz.lc, "img");
                player.xz.lc.img.src = `${EpicFX.extensionPath}asset/img/base/game_ud_turn_flag.png`;
                ui.scsPopups = new EpicFX.utils.popup(undefined, undefined, ui.window, undefined);
              }*/
              if (!player.scsPageItem) {
                // EpicFX.initSCSAnim();
                const scsPage = document.createElement("div");
                scsPage.classList.add("scsPage");
                scsPage.style.display = "none";
                //ui.scsPage = scsPage;
                player.scsPageItem = scsPage;
                ui.window.appendChild(scsPage);
                const scsDialog = new EpicFX.utils.scsDialog();
                scsDialog.create();
                player.scsDialog = scsDialog;
                player.xz = dui.element.create("characterXZ", player);
                player.xz.xzz = dui.element.create("characterXZImg", player.xz, "img");
                player.xz.xzz.src = `${EpicFX.extensionPath}asset/img/base/game_ud_waiting.png`;
                player.xz.lc = dui.element.create("characterLC", player.xz);
                player.xz.lc.style.left='54%';
                player.xz.lc.p = dui.element.create("characterLC", player.xz.lc, "p");
                player.xz.lc.p.textContent = "1";
                player.xz.lc.img = dui.element.create("characterLCImg", player.xz.lc, "img");
                player.xz.lc.img.src = `${EpicFX.extensionPath}asset/img/base/game_ud_turn_flag.png`;
                player.scsPopupsItem = new EpicFX.utils.popup(undefined, undefined, ui.window, undefined);
              }
              window.getEPICscs();
              ui.scsPageItem = player.scsPageItem;
              ui.scsPopupsItem = player.scsPopupsItem;
              var list = lib.skill.k_danggu.changshi.map(i => i[0]);
              player.markAuto('k_danggu', list);
              game.broadcastAll(function (player, list) {
                var cards = [];
                for (var i = 0; i < list.length; i++) {
                  var cardname = 'huashen_card_' + list[i];
                  lib.card[cardname] = {
                    fullimage: true,
                    image: 'character/' + list[i]
                  }
                  lib.translate[cardname] = get.rawName2(list[i]);
                  cards.push(game.createCard(cardname, '', ''));
                }
                player.$draw(cards, 'nobroadcast');
              }, player, list);
              'step 1'
              var next = game.createEvent('k_danggu_clique');
              next.player = player;
              next.setContent(lib.skill.k_danggu.contentx);
            },
            contentx: function () {
              'step 0'
              var list = player.getStorage('k_danggu')||[];
              var first = list.randomRemove(1)[0];
              event.first = first;
              // game.broadcastAll(function (changshi) {
              //   if (lib.config.background_speak) game.playAudio('skill', changshi + '_enter');
              // }, first);
              if (lib.skill.k_danggu.isSingleShichangshi(player)) {
                game.broadcastAll(function (player, first) {
                  if (!player.name2) player.smoothAvatar(false);
                  player.name1 = first;
                  window.getEPICscs().name1 = first;
                  // player.node.avatar.setBackground(first, 'character');
                  player.node.avatar.setBackgroundImage(`extension/史诗卡牌/asset/img/scs/${first}.jpg`);
                  player.node.name.innerHTML = get.slimName(first);
                  delete player.name2;
                  player.smoothAvatar(true);
                  player.node.avatar2.classList.add('hidden');
                  player.classList.remove('fullskin2');
                  player.node.name2.innerHTML = '';
                  window.doubleKuang(player);
                  if (player == game.me && ui.fakeme) {
                    ui.fakeme.style.backgroundImage = player.node.avatar.style.backgroundImage;
                  }
                }, player, first);
              }
              if (list.contains('scs_gaowang')) {
                var others = list.filter(changshi => {
                  return changshi != 'scs_gaowang';
                }).randomGets(3);
                others.push('scs_gaowang');
                others.randomSort();
              } else {
                var others = list.randomGets(4);
              }
              //if (player == game.me) {
              if (game.isMine(player)) {
                game.noAuto=true;
                game.pause();
                let charZhu = new EpicFX.utils.characterCard(first, `${EpicFX.extensionPath}asset/img/scs/${first}.jpg`, "qun", lib.skill.k_danggu.lines[first], "shichangshi");
                charZhu.create(player.scsDialog.zhu);
                charZhu.addListener("click", function (e) {
                  let target = e.target.closest(".KCharacter").obj;
                  if (target) {
                    let skillName;
                    let len = lib.skill.k_danggu.changshi.length;
                    for (let j = 0; j < len; j++) {
                      if (lib.skill.k_danggu.changshi[j][0] == target.sourceName) {
                        skillName = lib.skill.k_danggu.changshi[j][1];
                        break;
                      }
                    }
                    let str1 = get.translation(skillName);
                    let str2 = lib.skill.k_danggu.popups[skillName];
                    ui.scsPopupsItem.setPopup(str1, str2, {
                      x: e.clientX / game.documentZoom,
                      y: e.clientY / game.documentZoom
                    });
                    ui.scsPopupsItem.popup();
                  }
                })
                player.scsDialog.charZhu = charZhu;
                player.scsDialog.charFu = {};
                let disapprove = 0;
                for (let i = 0; i < others.length; i++) {
                  let temp = others[i];
                  let charFu = new EpicFX.utils.characterCard(temp, `${EpicFX.extensionPath}asset/img/scs/${temp}.jpg`, "qun", lib.skill.k_danggu.lines[temp], "shichangshi");
                  if (EpicFX.utils.checkConflict(lib.skill.k_danggu.conflictMap, first, temp)) {
                    charFu.lock(true);
                    disapprove++;
                  }
                  charFu.create(player.scsDialog.fu);
                  charFu.addListener("click", function (e) {
                    let target = e.target.closest(".KCharacter").obj;
                    if (target) {
                      if (!target.isLock) {
                        let skillName;
                        let len = lib.skill.k_danggu.changshi.length;
                        for (let j = 0; j < len; j++) {
                          if (lib.skill.k_danggu.changshi[j][0] == target.sourceName) {
                            skillName = lib.skill.k_danggu.changshi[j][1];
                            break;
                          }
                        }
                        let str1 = get.translation(skillName);
                        let str2 = lib.skill.k_danggu.popups[skillName];
                        ui.scsPopupsItem.setPopup(str1, str2, {
                          x: e.clientX / game.documentZoom,
                          y: e.clientY / game.documentZoom
                        });
                        ui.scsPopupsItem.popup();
                        if (!player.scsDialog.target) {
                          target.selectDiv.style.opacity = "1";
                          player.scsDialog.target = target;
                        } else if (player.scsDialog.target != target) {
                          player.scsDialog.target.selectDiv.style.opacity = "0";
                          target.selectDiv.style.opacity = "1";
                          player.scsDialog.target = target;
                        } else if (player.scsDialog.target == target) {
                          event.chosen = target.sourceName;
                          ui.scsPopupsItem.hide();
                          player.scsDialog.show();
                          game.resume();
                        }
                      } else {
                        target.say();
                      }
                    }
                  })
                  player.scsDialog.charFu[temp] = charFu;
                }
                if (disapprove == others.length) {
                  for (let key in player.scsDialog.charFu) {
                    player.scsDialog.charFu[key].lock(false);
                  }
                }
                result.bool = true;
                player.scsDialog.show(true);
              } else {
                var next = player.chooseButton([
                  '党锢：请选择结党对象',
                  [[first], 'character'],
                  '<div class="text center">可选常侍</div>',
                  [others, 'character']
                ], true);
                next.set('filterButton', button => {
                  if (_status.event.canChoose.contains(button.link)) return true;
                  return false;
                })
                next.set('canChoose', function () {
                  var list = others.filter(changshi => {
                    var map = lib.skill.k_danggu.conflictMap;
                    var names = map[first];
                    return !names.contains(changshi);
                  });
                  if (list.length == 0) return others.randomGets(1);
                  return list;
                }());
                next.set('ai', button => {
                  if (button.link == 'scs_gaowang') return 10;
                  return Math.random() * 10;
                })
              }
              'step 1'
              game.noAuto=false;
              if (result.bool || event.chosen) {
                var first = event.first;
                var chosen = event.chosen || result.links[0];
                var skills = [];
                var list = lib.skill.k_danggu.changshi;
                var changshis = [event.first, chosen];
                player.unmarkAuto('k_danggu', [chosen]);
                player.storage.k_danggu_current = changshis;
                for (var changshi of changshis) {
                  for (var cs of list) {
                    if (changshi == cs[0]) skills.push(cs[1]);
                  }
                }
                if (lib.skill.k_danggu.isSingleShichangshi(player)) {
                  game.broadcastAll(function (player, chosen) {
                    //player.node.name2.setBackgroundImage(`extension/史诗卡牌/asset/img/base/${player.group}_name2.png`);
                    player.name2 = chosen;
                    window.getEPICscs().name2 = chosen;
                    player.classList.add('fullskin2');
                    player.node.avatar2.classList.remove('hidden');
                    // player.node.avatar2.setBackground(chosen, 'character');
                    player.node.avatar2.setBackgroundImage(`extension/史诗卡牌/asset/img/scs/${chosen}.jpg`);
                    player.node.name2.innerHTML = get.slimName(chosen);
                    window.doubleKuang(player);
                    if (player == game.me && ui.fakeme) {
                      ui.fakeme.style.backgroundImage = player.node.avatar.style.backgroundImage;
                    }
                  }, player, chosen);
                }
                game.log(player, '选择了常侍', '#y' + get.translation(changshis));
                // game.broadcastAll(function (changshi) {
                //   if (lib.config.background_speak) game.playAudio('skill', changshi + '_enter');
                // }, chosen);
                if (skills.length) {
                  player.addAdditionalSkill('k_danggu', skills);
                  game.log(player, '获得了技能', '#g' + get.translation(skills));
                  player.popup(skills);
                }
              }
            },
            isSingleShichangshi: function (player) {
              var map = lib.skill.k_danggu.conflictMap;
              return player.name == 'shichangshi' && (map[player.name1] && map[player.name2] || map[player.name1] && !player.name2 || !player.name1 && !player.name2 || player.name == player.name1 && !player.name2);
            },
            mod: {
              aiValue: function (player, card, num) {
                if (['shan', 'tao', 'wuxie', 'caochuan'].contains(card.name)) return num / 10;
              },
              aiUseful: function () {
                return lib.skill.k_danggu.mod.aiValue.apply(this, arguments);
              },
            },
            intro: {
              mark: function (dialog, storage, player) {
                dialog.addText('剩余常侍');
                dialog.addSmall([storage, 'character']);
                if (player.storage.k_danggu_current) {
                  dialog.addText('当前常侍');
                  dialog.addSmall([player.storage.k_danggu_current, 'character']);
                }
              }
            },
            subSkill: {
              back: {
                audio: 'k_danggu',
                trigger: {global: 'restEnd'},
                filter: function (event, player) {
                  return event.getTrigger().player == player;
                },
                forced: true,
                content: function () {
                  var next = game.createEvent('k_danggu_clique');
                  next.player = player;
                  next.setContent(lib.skill.k_danggu.contentx);
                  player.draw(2);
                }
              }
            }
          },
          "k_mowang": {
            audio: 2,
            trigger: {player: 'dieBefore'},
            filter: function (event, player) {
              return player.getStorage('k_danggu')?.length && event.getParent().name != 'giveup' && player.maxHp > 0;
            },
            /*init:function(player,skill){
                if(player!=game.me) {
                    player.removeSkill(skill);
                    player.addSkill('mbmowang');
                    player.unmarkSkill('mbmowang');
                }
            },*/
            derivation: 'k_mowang_faq',
            forced: true,
            direct: true,
            priority: 15,
            group: ['k_mowang_die', 'k_mowang_return', 'k_mowang_die2'],
            content: function () {
              if (_status.k_mowang_return && _status.k_mowang_return[player.playerid]) {
                trigger.cancel();
              } else {
                player.logSkill('k_mowang');
                // game.broadcastAll(function () {
                //   if (lib.config.background_speak) game.playAudio('die', 'shichangshiRest');

                // });
                trigger.setContent(lib.skill.k_mowang.dieContent);
                trigger.includeOut = true;
              }
            },
            dieContent: function () {
              'step 0'
              event.forceDie = true;
              if (source) {
                game.log(player, '被', source, '杀害');
                if (source.stat[source.stat.length - 1].kill == undefined) {
                  source.stat[source.stat.length - 1].kill = 1;
                } else {
                  source.stat[source.stat.length - 1].kill++;
                }
              } else {
                game.log(player, '阵亡');
              }
              if (player.isIn() && (!_status.k_mowang_return || !_status.k_mowang_return[player.playerid])) {
                player.node.hp.hide();
                player.xz.style.display = "block";
                EpicFX.huihe.referNode = player.xz.lc.img;
                dcdAnim.playSpine(EpicFX.huihe);
                event.reserveOut = true;
                game.log(player, '进入了修整状态');
                game.log(player, '移出了游戏');
                //game.addGlobalSkill('k_mowang_return');
                if (!_status.k_mowang_return) _status.k_mowang_return = {};
                _status.k_mowang_return[player.playerid] = 1;
              } else event.finish();
              if (!game.countPlayer()) game.over();
              else if (player.hp != 0) {
                player.changeHp(0 - player.hp, false).forceDie = true;
              }
              game.broadcastAll(function (player) {
                if (player.isLinked()) {
                  if (get.is.linked2(player)) {
                    player.classList.toggle('linked2');
                  } else {
                    player.classList.toggle('linked');
                  }
                }
                if (player.isTurnedOver()) {
                  player.classList.toggle('turnedover');
                }
              }, player);
              game.addVideo('link', player, player.isLinked());
              game.addVideo('turnOver', player, player.classList.contains('turnedover'));
              'step 1'
              event.trigger('die');
              'step 2'
              if (event.reserveOut) {
                if (!game.reserveDead) {
                  for (var mark in player.marks) {
                    if (mark == 'k_danggu') continue;
                    player.unmarkSkill(mark);
                  }
                  var count = 1;
                  var list = Array.from(player.node.marks.childNodes);
                  if (list.some(i => i.name == 'k_danggu')) count++;
                  while (player.node.marks.childNodes.length > count) {
                    var node = player.node.marks.lastChild;
                    if (node.name == 'k_danggu') {
                      node = node.previousSibling;
                    }
                    node.remove();
                  }
                  game.broadcast(function (player, count) {
                    while (player.node.marks.childNodes.length > count) {
                      var node = player.node.marks.lastChild;
                      if (node.name == 'k_danggu') {
                        node = node.previousSibling;
                      }
                      node.remove();
                    }
                  }, player, count);
                }
                for (var i in player.tempSkills) {
                  player.removeSkill(i);
                }
                var skills = player.getSkills();
                for (var i = 0; i < skills.length; i++) {
                  if (lib.skill[skills[i]].temp) {
                    player.removeSkill(skills[i]);
                  }
                }
                event.cards = player.getCards('hejsx');
                if (event.cards.length) {
                  player.discard(event.cards).forceDie = true;
                }
              }
              'step 3'
              if (event.reserveOut) {
                game.broadcastAll(function (player, list) {
                  player.classList.add('out');
                  player.classList.add('scsOut');
                  if (!player.name2) player.smoothAvatar(false);
                  player.name1 = player.name;
                  player.smoothAvatar(false);
                  player.node.avatar.setBackgroundImage(`extension/史诗卡牌/asset/img/scs/k_shichangshi_dead.jpg`);
                  player.node.avatar.style.opacity = "0.3";
                  player.node.name.innerHTML = get.slimName(player.name);
                  delete player.name2;
                  player.smoothAvatar(true);
                  player.node.avatar2.classList.add('hidden');
                  player.classList.remove('fullskin2');
                  player.node.name2.innerHTML = '';
                  window.doubleKuang(player);
                  if (player == game.me && ui.fakeme) {
                    ui.fakeme.style.backgroundImage = player.node.avatar.style.backgroundImage;
                  }
                  // if (list.contains(player.name1) || player.name1 == 'k_shichangshi') {
                  //   player.smoothAvatar(false);
                  //   player.node.avatar.setBackgroundImage(`extension/史诗卡牌/asset/img/scs/${player.name1}_dead.jpg`);
                  // }
                  // if (list.contains(player.name2) || player.name2 == 'k_shichangshi') {
                  //   player.smoothAvatar(true);
                  //   player.node.avatar2.setBackgroundImage(`extension/史诗卡牌/asset/img/scs/${player.name2}_dead.jpg`);
                  // }
                }, player, lib.skill.k_danggu.changshi.map(i => i[0]));
              }
              if (source && lib.config.border_style == 'auto' && (lib.config.autoborder_count == 'kill' || lib.config.autoborder_count == 'mix')) {
                switch (source.node.framebg.dataset.auto) {
                  case 'gold':
                  case 'silver':
                    source.node.framebg.dataset.auto = 'gold';
                    break;
                  case 'bronze':
                    source.node.framebg.dataset.auto = 'silver';
                    break;
                  default:
                    source.node.framebg.dataset.auto = lib.config.autoborder_start || 'bronze';
                }
                if (lib.config.autoborder_count == 'kill') {
                  source.node.framebg.dataset.decoration = source.node.framebg.dataset.auto;
                } else {
                  var dnum = 0;
                  for (var j = 0; j < source.stat.length; j++) {
                    if (source.stat[j].damage != undefined) dnum += source.stat[j].damage;
                  }
                  source.node.framebg.dataset.decoration = '';
                  switch (source.node.framebg.dataset.auto) {
                    case 'bronze':
                      if (dnum >= 4) source.node.framebg.dataset.decoration = 'bronze';
                      break;
                    case 'silver':
                      if (dnum >= 8) source.node.framebg.dataset.decoration = 'silver';
                      break;
                    case 'gold':
                      if (dnum >= 12) source.node.framebg.dataset.decoration = 'gold';
                      break;
                  }
                }
                source.classList.add('topcount');
              }
            },
            subSkill: {
              die: {
                audio: 'k_mowang',
                trigger: {player: 'phaseAfter'},
                forced: true,
                forceDie: true,
                content: function () {
                  'step 0'
                  if (lib.skill.k_danggu.isSingleShichangshi(player)) {
                    if (!player.getStorage('k_danggu')?.length) {
                      game.broadcastAll(function (player) {
                        player.name1 = player.name;
                        player.smoothAvatar(false);
                        // player.node.avatar.setBackground(player.name + '_dead', 'character');
                        player.node.avatar.setBackgroundImage(`extension/史诗卡牌/asset/img/scs/k_shichangshi_dead.jpg`);
                        //player.node.avatar.setBackground('shichangshi', 'character');
                        player.node.name.innerHTML = get.slimName(player.name);
                        delete player.name2;
                        player.classList.remove('fullskin2');
                        player.node.avatar2.classList.add('hidden');
                        player.node.name2.innerHTML = '';
                        window.doubleKuang(player);
                        if (player == game.me && ui.fakeme) {
                          ui.fakeme.style.backgroundImage = player.node.avatar.style.backgroundImage;
                        }
                      }, player);
                    }
                  }
                  if (!player.getStorage('k_danggu')?.length) {
                    game.delay();
                  }
                  'step 1'
                  player.die();
                },
              },
              return: {
                trigger: {player: 'phaseBefore'},
                forced: true,
                charlotte: true,
                silent: true,
                forceDie: true,
                forceOut: true,
                filter: function (event, player) {
                  return !event._k_mowang_return && event.player.isOut() && _status.k_mowang_return[event.player.playerid];
                },
                content: function () {
                  'step 0'
                  trigger._k_mowang_return = true;
                  // 重生特效
                  player.xz.style.display = null;
                  EpicFX.fuhuo.referNode = player;
                  dcdAnim.playSpine(EpicFX.fuhuo);
                  game.broadcastAll(function (player) {
                    player.classList.remove('out');
                    player.node.avatar.style.opacity = null;
                    player.node.hp.show();
                  }, trigger.player);
                  game.log(trigger.player, '移回了游戏');
                  delete _status.k_mowang_return[trigger.player.playerid];
                  trigger.player.recover(trigger.player.maxHp - trigger.player.hp);
                  game.broadcastAll(function (player) {
                    if (player.name1 == 'shichangshi') {
                      player.smoothAvatar(false);
                      player.node.avatar.setBackground(player.name1, 'character');
                    }
                    if (player.name2 == 'shichangshi') {
                      player.smoothAvatar(true);
                      player.node.avatar2.setBackground(player.name2, 'character');
                    }
                  }, trigger.player);
                  'step 1'
                  event.trigger('restEnd');
                }
              },
              die2: {
                trigger: {player: 'dieBefore'},
                forced: true,
                direct: true,
                filter: function(event,player) {
                  return ui.scsPageItem&&player.scsDialog;
                },
                content: function () {
                  game.pause();
                  ui.scsPageItem.style.display = "block";
                  ui.scsPageItem.style.opacity = 1;
                  window.getEPICscs().over = !player.getStorage('k_danggu')?.length;
                  EpicFX.playSCSAnim(window.getEPICscs().name1, window.getEPICscs().name2);
                  player.scsDialog.zhu.innerHTML = '';
                  player.scsDialog.charZhu = null;
                  player.scsDialog.fu.innerHTML = '';
                  player.scsDialog.charFu = null;
                }
              }
            }
          },
          k_danggu_faq:{},
          k_mowang_faq:{},
        },
        translate: {
           k_danggu: '党锢',
          k_danggu_info: '锁定技。①游戏开始时，你获得十张“常侍”牌，然后你进行一次结党。②当你修整结束后，你进行一次结党并摸两张牌。③若你有亮出的“常侍”牌，你视为拥有这些牌的技能。',
          k_danggu_faq: '关于结党',
          k_danggu_faq_info: '<br>系统随机选择一张未亮出过的“常侍”牌，然后选择四张未亮出过的“常侍”牌（若剩余“常侍”牌中有「高望」，则必定出现）。你观看前者，然后从后者中选择一名与前者互相认可的“常侍”牌（不认可的“常侍”牌为不可选状态），你选择这两张牌。然后若此时不为双将模式，你将这两张武将牌作为你的武将牌（不移除原有技能）；否则你获得这两张武将牌上的技能。',
          k_mowang: '殁亡',
          k_mowang_info: '锁定技。①当你死亡前，若你有未亮出的“常侍”牌且体力上限大于0，你将死亡改为修整至你的下个回合开始前，然后你复原武将牌，且不于此次死亡事件中进行展示身份牌、检测游戏胜利条件与执行奖惩的流程。②回合结束后，你死亡。',
          k_mowang_faq: '关于修整',
          k_mowang_faq_info: '<br>将武将牌移出游戏（视为你存活）。当该角色修整结束，其移回游戏。',
        },
      },
      intro: '',
      author: `${JK.author}`,
      diskURL: "",
      forumURL: "",
      version: "1.7.9",
    }, files: {"character": [], "card": [], "skill": []}
  }
})