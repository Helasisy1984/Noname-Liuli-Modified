'use strict';
window.qhly_import(function(lib, game, ui, get, ai, _status){
    game.qhly_initShoushaView = function (name, view, page, cplayer) {
        //自动跳转预设白板武将
        if(name==null||!name) name='unknown';
        var currentViewSkin = lib.qhly_viewskin[lib.config.qhly_currentViewSkin];
        var subView = {};
        if (!page || page == 'skin') {
          page = 'skill';
        }
        var cPlayer;
        if (cplayer) cPlayer = cplayer;
        else cPlayer = game.qhly_getCurrentPlayer(name)[0][0];
        var shoushaBg = ui.create.div('.qh-shoushabg', view);
        ui.create.div('.qh-shoushabgbody', view);
        shoushaBg.addEventListener(lib.config.touchscreen ? 'touchend' : 'mouseup', function () {
          var shoushaBg = document.getElementsByClassName('qh-shoushabg');
          if (shoushaBg.length) {
            if (!shoushaBg[0].classList.contains('suoxiao')) return;
            shoushaBg[0].classList.remove('suoxiao');
          }
          var shoushaBgBody = document.getElementsByClassName('qh-shoushabgbody');
          if (shoushaBgBody.length) {
            shoushaBgBody[0].classList.remove('suoxiao');
          }
          var shoushaBgTail = document.getElementsByClassName('qh-shoushabgtail');
          if (shoushaBgTail.length) {
            shoushaBgTail[0].classList.remove('suoxiao');
          }
          var skinBg = document.getElementsByClassName('qh-page-skin');
          if (skinBg.length) {
            skinBg[0].classList.remove('skinbgfangda');
          }
        })
        if (!lib.config.qhly_shoushaBigFlip) lib.config.qhly_shoushaBigFlip = {};
        if (!lib.config.qhly_shoushaBigFlip[name]) lib.config.qhly_shoushaBigFlip[name] = {};
        ui.create.div('.qh-shoushabgtail', view);
        var refreshRank = function () { };
        subView.avatar = ui.create.div('.qh-shousha-big-avatar', view);
        if (lib.config.qhly_lutouType && lib.config.qhly_lutouType == 'shousha') subView.avatar.classList.add('shousha');
        subView.avatar.id = 'mainView';
        subView.pageButton = {
          introduce: ui.create.div('.qh-button', view),
          skill: ui.create.div('.qh-button.skillB', view),
          skin: ui.create.div('.qh-button.skinB', view),
          config: ui.create.div('.qh-button.configB', view),
        };
        subView.skinType = ui.create.div('.qh-shousha-skintype', subView.avatar);
        let skintype = new Array(3);
        let hasJjc = false;
        let hasGuozhan = false;
        for (var i of ['standard', 'old', 'shenhua']) {
          if (lib.characterPack && lib.characterPack[i] && lib.characterPack[i][name]) {
            hasJjc = true;
          }
        }
        var slimName = name.split('_');
        slimName = slimName[slimName.length - 1];
        if (get.mode() == 'guozhan' || game.thunderFileExist(lib.assetURL + 'image/character/gz_' + slimName + '.jpg') && name.indexOf('shen') < 0) hasGuozhan = true;
        for (var i = 0; i < 3; i++) {
          if (i == 0 || i == 1 && hasGuozhan || i == 2 && hasJjc) {
            skintype[i] = ui.create.div('.qh-shousha-skintype' + i, subView.skinType);
            skintype[i].id = 'qh_skintype' + i;
            skintype[i].listen(function () {
              if (this.classList.contains('sel')) return;
              for (var j = 0; j < skintype.length; j++) {
                if (skintype[j]) skintype[j].classList.remove('sel');
              }
              this.classList.add('sel');
              this.parentNode.skintype = this.id;
              let originName, guozhanName, currentName;
              if (name.indexOf('gz_') == 0) {
                originName = name.slice(3);
                guozhanName = name;
              } else {
                originName = name;
                guozhanName = 'gz_' + slimName;
              }
              if (this.id == 'qh_skintype1') {
                subView.skinTypeGuozhan = true;//用于标记当前显示的是否是国战皮肤
                currentName = guozhanName;
              }
              else {
                subView.skinTypeGuozhan = false;
                currentName = originName;
              }
              game.qhly_refreshSShp(state);
              game.qhly_setOriginSkin(currentName, null, subView.avatarImage, state, game.qhly_getPlayerStatus(subView.avatarImage, null, name) == 2);
              //切换皮肤
              if(state.mainView.avatarImage.BlurImage) {
                  game.qhly_setOriginSkin(currentName, null, state.mainView.avatarImage.BlurImage, state, game.qhly_getPlayerStatus(state.mainView.avatarImage.BlurImage, null, name) == 2, true);
              }
            })
          }
        }
        if (get.mode() == 'guozhan') {
          subView.skinTypeGuozhan = true;
          skintype[1].classList.add('sel');
          subView.skinType.skintype = 'qh_skintype1';
        }
        else {
          skintype[0].classList.add('sel');
        }
        subView.hpWrap = ui.create.div('.qhhp-decade-big-wrap', subView.avatar);
        subView.skininfoWrap = ui.create.div('.qhhp-decade-big-skininfo-wrap', subView.avatar);
        subView.skininfoText = ui.create.div('.qhhp-decade-big-skininfotext-wrap', subView.skininfoWrap);
        subView.avatar.belowText = ui.create.div('.qh-skinchange-decade-big-skin-text', subView.hpWrap);
        subView.menuCover = ui.create.div();
        subView.menuCover.style.width = "100%";
        subView.menuCover.style.height = "100%";
        subView.menuCover.style.zIndex = 38;
        subView.avatarImage = ui.create.div('.qh-image-standard', subView.avatar);
        if (game.qhly_getPlayerStatus(cplayer, cplayer && cplayer.name2 && cplayer.name2 == name) == 2) game.qhly_setPlayerStatus(subView.avatarImage, undefined, 2);
        subView.avatarImage.stopDynamic = lib.qhly_stopdynamic;
        subView.avatarImage.classList.add('qh-must-replace');
        subView.avatarImage.classList.add('qh-isBigAvatar');
        subView.rank = ui.create.div('.qh-avatar-rank', subView.avatar);
        subView.skinRank = ui.create.div('.qh-skin-rank', subView.avatar);
        subView.avatarLabel = ui.create.div('.qh-avatar-label', subView.avatar);
        subView.avatarLabelOther = ui.create.div('.qh-avatar-label-other', subView.avatar);
        subView.name = ui.create.div('.qh-avatar-label-name', subView.avatar);
        subView.characterTitle = ui.create.div('.qh-avatar-label-title', subView.avatar);
        subView.hp = ui.create.div('.qh-hp', view);
        var dibuhuo = document.getElementsByClassName('qh-dibuhuo');
        if (dibuhuo) {
          dibuhuo = dibuhuo[0];
          subView.lingyu = ui.create.div('.qh-lingyu', dibuhuo);
          subView.jianghun = ui.create.div('.qh-jianghun', dibuhuo);
          subView.lingyuText = ui.create.div('.qh-lingyutext', subView.lingyu);
          subView.jianghunText = ui.create.div('.qh-jianghuntext', subView.jianghun);
          if (!_status.qhly_lingyu) _status.qhly_lingyu = Math.round(Math.random() * 100) * 10;
          subView.lingyuText.innerHTML = _status.qhly_lingyu;
          subView.jianghunText.innerHTML = lib.config.qhly_jianghun;
        }
        subView.dragontail = ui.create.div('.qh-avatar-dragontail', subView.avatar);
        subView.jindutiao = ui.create.div('.qh-avatar-jindutiao', subView.dragontail);
        subView.jindutiao.id = 'qhly_shoushajindutiao';
        ui.create.div('.qh-avatar-jindufenge', subView.dragontail);
        subView.avatarImage.$dynamicWrap = ui.create.div('.qhdynamic-big-wrap', subView.avatarImage);

        subView.avatarImage.name = name;  // 还需要添加当前角色name
        // if (window.shoushaBigAvatarDynamic) {
        //     subView.avatar.dynamic = window.shoushaBigAvatarDynamic
        //     subView.avatar.$dynamicWrap.appendChild(window.shoushaBigAvatarDynamic.canvas)
        // }
        var timer = null;
        subView.avatarImage.addEventListener(lib.config.touchscreen ? "touchstart" : "mousedown", function (e) {
          e.stopPropagation();
          if (!subView.avatarImage.dynamic || subView.avatarImage.dynamic && subView.avatarImage.dynamic.primary == null) {
            if (!subView.avatarImage.classList.contains('qh-image-standard')) return;
          }
          timer = setTimeout(function () {
            e.preventDefault();
            if (_status.bigEditing) return;
            game.qhly_bigEdit(state);
          }, 800);
        });
        subView.avatarImage.addEventListener(lib.config.touchscreen ? "touchmove" : 'mousemove', function (e) {
          e.stopPropagation();
          clearTimeout(timer);
        });
        subView.avatarImage.addEventListener(lib.config.touchscreen ? "touchend" : "mouseup", function (e) {
          e.stopPropagation();
          clearTimeout(timer);
        });
        subView.skinBar = ui.create.div('.qh-skinchange-big-skinBar', subView.avatar);
        subView.dynamicToggle = ui.create.div('.qh-skinchange-big-dynamicChange', subView.avatar);
        subView.dynamicToggle.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
          clearInterval(_status.texiaoTimer);
          clearTimeout(_status.texiaoTimer2);
          var skinStr = state.mainView.avatar.belowText.innerHTML.substring(0, state.mainView.avatar.belowText.innerHTML.lastIndexOf('*'));
          if (this.classList.contains('jing')) {
            this.classList.remove('jing');
            game.qhly_changeDynamicSkin(state.mainView.avatarImage, skinStr, name);
            if (lib.config.qhly_skinset.djtoggle[name] && lib.config.qhly_skinset.djtoggle[name][skinStr]) delete lib.config.qhly_skinset.djtoggle[name][skinStr];
            if (state.mainView.avatarImage.dynamic && state.mainView.avatarImage.dynamic.primary && state.mainView.avatarImage.dynamic.primary.name) _status.currentTexiao = state.mainView.avatarImage.dynamic.primary.name;
            if (_status.currentTexiao) {
              _status.texiaoTimer2 = setTimeout(function () {
                game.playShoushaAvatar(state.mainView.avatarImage, lib.config.qhly_shoushaBigFlip[name][game.qhly_getSkin(name)], state.name);
                _status.texiaoTimer = setInterval(() => {
                  game.playShoushaAvatar(state.mainView.avatarImage, lib.config.qhly_shoushaBigFlip[name][game.qhly_getSkin(name)], state.name);
                }, Math.random() * 3000 + 10000);
              }, 5000)
            }
          }
          else {
            this.classList.add('jing');
            if (state.mainView.avatarImage.stopDynamic) state.mainView.avatarImage.stopDynamic();
            if (!lib.config.qhly_skinset.djtoggle[name]) lib.config.qhly_skinset.djtoggle[name] = {};
            lib.config.qhly_skinset.djtoggle[name][skinStr] = true;
          }
          game.qhlySyncConfig();
          if (!_status['qhly_primarySkin_' + name] || _status['qhly_primarySkin_' + name] && _status['qhly_primarySkin_' + name] == game.qhly_getSkin(name)) game.qhly_changeDynamicSkin(name);
        });
        subView.ball = ui.create.div('.qh-avatar-dragontailball', subView.dragontail);
        ui.create.div('.qh-avatar-dragontailballguangmangnei', subView.dragontail);
        ui.create.div('.qh-avatar-dragontailballguangmangwai', subView.dragontail);
        ui.create.div('.qh-avatar-dragontailjinjie', subView.dragontail);
        subView.cur = ui.create.div('.qh-avatar-dragontailcur', subView.dragontail);
        subView.total = ui.create.div('.qh-avatar-dragontailtotal', subView.dragontail);
        var currentjinjie = game.qhly_getShoushajinjie(name);
        subView.cur.innerHTML = currentjinjie[1];
        subView.total.innerHTML = _status.qhly_shoushajinjie[currentjinjie[0]] || _status.qhly_shoushajinjie[currentjinjie[0] - 1];
        var currentbaifenbi = subView.cur.innerHTML / subView.total.innerHTML;
        subView.jindutiao.style.height = currentbaifenbi * 60.3 + '%';
        subView.cur.style.top = ((1 - currentbaifenbi) * 60.6 - 1.2) + '%';
        var shoushaButtons = ui.create.div('.qh-avatar-shoushabuttons', view);
        ui.create.div('.qh-avatar-share', shoushaButtons);
        var defaultButton = ui.create.div('.qh-avatar-default', shoushaButtons);
        subView.ball.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
          game.playAudio('..', 'extension', '千幻聆音', 'theme/shousha', 'click');
          var yuandengjie = game.qhly_getShoushajinjie(name);
          if (yuandengjie[0] == 4) return;
          //if (lib.config.qhly_jianghun <= 0) alert("可用将魂不足，请完成对局增加将魂。（完成一局增加5w将魂，上限80w）")
          if (lib.config.qhly_jianghun <= 0) alert("当前可用将魂不足，无法完成进阶，请完成对局以获得更多的将魂。\n　　○每局可获得5万将魂，最高上限为80万")
          if (_status.qhly_jinjieing) return;
          _status.qhly_jinjieing = true;
          var currentJinjie = Math.min(6000, lib.config.qhly_jianghun, yuandengjie[2]);
          lib.config.qhly_shoushadengjie[name] += currentJinjie;
          lib.config.qhly_jianghun -= currentJinjie;
          //同步如真
          if(game.rzsh_jianghun) game.rzsh_jianghun.text = lib.config.qhly_jianghun;
          subView.jianghunText.innerHTML = lib.config.qhly_jianghun;
          game.saveConfig('qhly_shoushadengjie', lib.config['qhly_shoushadengjie']);
          game.saveConfig('qhly_jianghun', lib.config['qhly_jianghun']);
          setTimeout(function () {
            game.playAudio('..', 'extension', '千幻聆音', 'theme/shousha', 'jinjie');
          }, 100);
          var meici = _status.qhly_shoushajinjie[yuandengjie[0]] / 100;
          function jinjie() {
            var jindutiao = document.getElementById('qhly_shoushajindutiao');
            var benci = Math.min(meici, lib.config.qhly_jianghun, currentJinjie);
            if (yuandengjie[0] < 3 && benci >= _status.qhly_shoushajinjie[yuandengjie[0]] - yuandengjie[1]) {
              benci -= _status.qhly_shoushajinjie[yuandengjie[0]] - yuandengjie[1];
              yuandengjie[0]++;
              yuandengjie[1] = 0;
              subView.cur.innerHTML = yuandengjie[1];
              meici = _status.qhly_shoushajinjie[yuandengjie[0]] / 100;
              subView.total.innerHTML = _status.qhly_shoushajinjie[yuandengjie[0]];
              subView.cur.style.top = '58.4%';
              subView.jindutiao.style.height = '0%';
            }
            currentJinjie -= benci;
            yuandengjie[1] += benci;
            subView.cur.innerHTML = yuandengjie[1];
            var currentbaifenbi = yuandengjie[1] / _status.qhly_shoushajinjie[yuandengjie[0]];
            subView.cur.style.top = ((1 - currentbaifenbi) * 60.6 - 1.2) + '%';
            subView.jindutiao.style.height = currentbaifenbi * 60.3 + '%';
            _status.qhly_jinjietiao = setTimeout(function () {
              if (!jindutiao || currentJinjie <= 0) {
                delete _status.qhly_jinjieing;
                clearTimeout(_status.qhly_jinjietiao);
                if (!jindutiao) return;
                else {
                  for (var i = 0; i < game.qhly_getShoushajinjie(name)[0]; i++) {
                    var starNode = document.getElementById('qhly_shoushaStar' + i);
                    if (starNode) starNode.classList.add('jinjie');
                  }
                }
                return;
              }
              jinjie();
            }, 30)
          }
          jinjie();
        })
        defaultButton.hide();
        defaultButton.listen(function () {
          this.hide()
          var currentSkin = state.mainView.page.skin.getCurrentSkin(name);
          if (currentSkin) {
            game.qhly_setCurrentSkin(name, currentSkin.skinId, function () {
              _status.qhly_skillAudioWhich = {};
              state.mainView.page.skin.refresh(name, state);
              if (state.onChangeSkin) {
                state.onChangeSkin();
              }
              game.qhly_changeDynamicSkin(name);
              game.qhly_playQhlyAudio('qhly_voc_click3', null, true);
              //game.qhly_playQhlyAudio('qhly_voc_dec_fanshu', null, true);
              _status['qhly_primarySkin_' + name] = game.qhly_getSkin(name);
            }, true);
          }
        })
        _status.texiaoTimer = null;
        _status.texiaoTimer2 = null;
        ui.create.div('.qh-avatar-shiyong', shoushaButtons);
        ui.create.div('.qh-avatar-guofu', shoushaButtons);
        subView.star = ui.create.div('.qh-avatar-dragontailstar', subView.dragontail);
        for (var i = 0; i < 4; i++) {
          if (i >= 4 - game.qhly_getShoushajinjie(name)[0]) var starNode = ui.create.div('.qh-avatar-dragontailstartext.jinjie', subView.star);
          else var starNode = ui.create.div('.qh-avatar-dragontailstartext', subView.star);
          starNode.id = 'qhly_shoushaStar' + (3 - i);
        }
        //subView.dragonhead = ui.create.div('.qh-avatar-dragonhead', subView.avatar);
        subView.pageButton.introduce.innerHTML = "简介";
        subView.pageButton.skill.innerHTML = "技能";
        //subView.pageButton.skin.innerHTML = "皮肤";
        subView.pageButton.config.innerHTML = "选项";
        subView.pageButton.introduce.downButton = ui.create.div('.qh-otherinfoarrow', subView.pageButton.introduce);
        var swipe_up = lib.config.swipe_up;
        lib.config.swipe_up = '';
        var swipe_down = lib.config.swipe_down;
        lib.config.swipe_down = '';
        var swipe_left = lib.config.swipe_left;
        lib.config.swipe_left = '';
        var swipe_right = lib.config.swipe_right;
        lib.config.swipe_right = '';
        subView.backButton = document.getElementsByClassName('qh-back')[0];
        //从这里开始微调按钮
        subView.backButton.style.right='-4px';
        subView.backButton.style.top='-0.5px';
        subView.backButton.style.width='130px';
        subView.backButton.style.height='105px';
        subView.backButton.style.backgroundPosition='top right';
        subView.backButton.style.backgroundSize='contain';
        //结束
        /*subView.backButton.style.transform='scale(1.3)';*/
        subView.backButton.listen(function () {
          lib.config.swipe_up = swipe_up;
          lib.config.swipe_down = swipe_down;
          lib.config.swipe_left = swipe_left;
          lib.config.swipe_right = swipe_right;
          clearInterval(_status.texiaoTimer);
          clearTimeout(_status.texiaoTimer2);
          game.qhly_checkPlayerImageAudio(name, game.qhly_getSkin(name), cplayer, function () {
            let avatar;
            let playerName = game.qhly_getRealName(name);
            if (cplayer && !cplayer.doubleAvatar) avatar = 'avatar';
            else avatar = cplayer.name1 == name ? 'avatar' : 'avatar2';
            let skin = game.qhly_getSkin(name);
            cplayer.node[avatar].qhly_origin_setBackgroundImage(cplayer._qhly_skinChange[avatar == 'avatar2' ? 1 : 0]);
            if (!_status.qhly_replaceSkin[playerName]) _status.qhly_replaceSkin[playerName] = {};
            _status.qhly_replaceSkin[playerName][skin] = cplayer._qhly_skinChange[avatar == 'avatar2' ? 1 : 0];
            if (window.decadeUI && !game.qhly_hasExtension('皮肤切换') && !game.qhly_hasExtension('EpicFX')) game.qhly_changeDynamicSkin(cplayer, undefined, undefined, avatar == 'avatar2');
          });
          if (subView.avatarImage.dynamic && subView.avatarImage.dynamic.renderer.postMessage) {
            subView.avatarImage.dynamic.renderer.postMessage({
              message: "DESTROY",
              id: subView.avatarImage.dynamic.id,
            })
            subView.avatarImage.dynamic.renderer.capacity--;
          }
          if (_status['qhly_primarySkin_' + name] !== undefined) game.qhly_setCurrentSkin(name, _status['qhly_primarySkin_' + name]);
          delete _status['qhly_primarySkin_' + name];
        });
        subView.page = {
          introduce: {
            pageView: ui.create.div('.qh-page-introduce', shoushaBg),
            refresh: function (name, state) {
              if (!this.inited) this.init(name, state);
              var that = this;
              this.text.refresh = function(){
                that.refresh(name,state);
              };
              if (!state.introduceExtraPage || state.introduceExtraPage == '简介') {
                subView.pageButton.introduce.innerHTML = "简介";
                var intro = get.qhly_getIntroduce(name, state.pkg);
                this.text.innerHTML = intro + "<br><br><br><br><br><br><br>";
                subView.pageButton.introduce.appendChild(subView.pageButton.introduce.downButton);
              } else {
                var ret = '';
                var handleView = null;
                if (state.introduceExtraFunc) {
                  var func = null;
                  if (typeof state.introduceExtraFunc == 'function') {
                    func = state.introduceExtraFunc;
                  } else {
                    func = state.pkg[state.introduceExtraFunc];
                  }
                  if (typeof func == 'function') {
                    var fc = func(name);
                    if (fc) {
                      if (typeof fc == 'string') {
                        ret = fc + "<br><br><br><br><br><br><br>";
                      } else {
                        if (fc.content) {
                          ret = fc.content + "<br><br><br><br><br><br><br>";
                        }
                        if (fc.handleView && typeof fc.handleView == 'function') {
                          handleView = fc.handleView;
                        }
                      }
                    }
                  }
                }
                this.text.innerHTML = ret;
                if (handleView) {
                  handleView(this.text, name);
                }
                var btname = state.introduceExtraPage;
                // if (currentViewSkin.buttonTextSpace !== false && btname.length == 2) {
                //     btname = btname.charAt(0) + ' ' + btname.charAt(1);
                // }
                subView.pageButton.introduce.innerHTML = btname;
                subView.pageButton.introduce.appendChild(subView.pageButton.introduce.downButton);
              }
            },
            init: function (name, state) {
              this.text = ui.create.div('.qh-page-introduce-text', this.pageView);
              if (lib.config.qhly_vMiddle === false && (currentViewSkin.isQiLayout || currentViewSkin.isLolBigLayout)) {
                this.text.style.height = "100%";
                this.text.style.maxHeight = "none";
              }
              lib.setScroll(this.text);
              ui.qhly_fixTextSize(this.text);
              game.qhly_changeViewPageSkin('introduce', this.pageView);
              this.inited = true;
            }
          },
          skill: {
            pageView: ui.create.div('.qh-page-skill', shoushaBg),
            refresh: function (name, state) {
              // if (_status['qhly_primarySkin_' + name] !== undefined) {
              //     game.qhly_setCurrentSkin(name, _status['qhly_primarySkin_' + name]);
              // }
              if (!this.inited) this.init(name, state);
            },
            init: function (name, state) {
              this.button = ui.create.div('.qh-page-skill-button', this.pageView);
              this.text = ui.create.div('.qh-page-skill-text', this.pageView);
              this.voice = ui.create.div('.qh-page-skill-voice', this.pageView);
              this.taici = ui.create.div('.qh-page-skill-taici', view);
              this.taicineirong = ui.create.div('.qh-page-skill-taicineirong', this.taici);
              this.taici.hide();
              var that = this;
              this.voice.listen(function () {
                if (_status.qhly_shoushaBigVoice) return;
                _status.qhly_shoushaBigVoice = true;
                var taiciblackBg = ui.create.div('', view);
                taiciblackBg.style.cssText = 'z-index: 66;left: 0;top: 0;width:500px;height: 500px;background-color: black;opacity: 0.7;transition:none;position:absolute;transform: translateY(500px)';
                var setSize = function () {
                  taiciblackBg.style.top = 0;
                  taiciblackBg.style.left = 0;
                  taiciblackBg.style.width = document.body.offsetWidth + 'px';
                  taiciblackBg.style.height = document.body.offsetHeight + 'px';
                  taiciblackBg.style.transform = 'translateY(' + (view.offsetHeight - document.body.offsetHeight) * 0.5 + 'px)';
                };
                setSize();
                var resize = function () {
                  setTimeout(setSize, 600);
                };
                lib.onresize.push(resize);
                taiciblackBg.listen(function () {
                  that.taici.hide();
                  if (_status.qhly_shoushaBigVoice) delete _status.qhly_shoushaBigVoice;
                  this.remove();
                })
                that.taici.show();
              })
              lib.setScroll(this.text);
              if (lib.config.qhly_vMiddle === false && (currentViewSkin.isQiLayout || currentViewSkin.isLolBigLayout)) {
                this.text.style.maxHeight = 'none';
                this.text.style.height = '100%';
              }
              ui.qhly_fixTextSize(this.text);
              var skills = get.character(name, 3);
              var viewSkill = [];
              var derivation = [];
              for (var skill of skills) {
                var info = get.info(skill);
                if (!info || info.nopop || !get.translation(skill + '_info')) {
                  continue;
                }
                viewSkill.add(skill);
                if (info.derivation) {
                  if (typeof info.derivation === 'string') {
                    viewSkill.add(info.derivation);
                    derivation.add(info.derivation);
                  } else {
                    for (var s of info.derivation) {
                      viewSkill.add(s);
                      derivation.add(s);
                    }
                  }
                }
              }
              var pkg = state.pkg;
              if (pkg && pkg.characterTaici) {
                var taici = pkg.characterTaici(name);
                if (taici) {
                  for (var key in taici) {
                    var m = taici[key];
                    if (!m || m.hide) continue;
                    if (key != 'die') {
                      viewSkill.add(key);
                    }
                  }
                  viewSkill.sort(function (a, b) {
                    var orderA = (taici[a] && taici[a].order) ? taici[a].order : Infinity;
                    var orderB = (taici[b] && taici[b].order) ? taici[b].order : Infinity;
                    return orderA - orderB;
                  });
                }
              }
              var tempSkill = [];
              if (cPlayer && lib.config.qhly_skillingame) {
                var skills = cPlayer.getSkills(false, false);
                for (var tskill of skills) {
                  if (viewSkill.contains(tskill)) continue;
                  var info = get.info(tskill);
                  if (!info) continue;
                  if (!lib.translate[tskill]) continue;
                  if (info.popup === false) continue;
                  if (info.nopop === true) continue;
                  viewSkill.add(tskill);
                  tempSkill.add(tskill);
                }
              }
              var skilljishu = 0;
              for (var skill of viewSkill) {
                if (!lib.translate[skill + "_info"]) continue;
                var detail = get.translation(skill + "_info");
                if (detail) {
                  var skillInfoAudio = get.info(skill);
                  var skillInfoHead = ui.create.div('.qh-skillinfohead', this.button);
                  skillInfoHead.id = 'qhly_skillv_' + skill;
                  //介绍技能
                  if(derivation.contains(skill)) {
                      skillInfoHead.style.opacity=0.5;
                  }
                  if (get.translation(skill).length > 2) skillInfoHead.style.width = get.translation(skill).length * 29 + 'px';
                  var skillInfoHeadContent = ui.create.div('.qh-skillinfoheadcontent', skillInfoHead);
                  skillInfoHeadContent.innerHTML = get.translation(skill);
                  var skillVoiceNum = 0;
                  if (skillInfoAudio) {
                    var audioinfo = skillInfoAudio.audio;
                    if (audioinfo) {
                      if (typeof audioinfo == 'number') skillVoiceNum = audioinfo;
                      else if (typeof audioinfo == 'string') {
                        if (audioinfo.indexOf('ext:') == 0) {
                          audioinfo = audioinfo.split(':');
                          if (audioinfo.length == 3) {
                            if (audioinfo[2] != 'true') skillVoiceNum = parseInt(audioinfo[2]);
                          }
                        } else if (lib.skill[audioinfo]) {
                          if (get.info(audioinfo)) {
                            if (get.info(audioinfo).audio) var audioinfo2 = get.info(audioinfo).audio;
                            if (audioinfo2) {
                              if (typeof audioinfo2 == 'number') skillVoiceNum = audioinfo2;
                              else if (typeof audioinfo2 == 'string') {
                                audioinfo2 = audioinfo2.slice(0);
                                if (audioinfo2.indexOf('ext:') == 0) {
                                  audioinfo2 = audioinfo2.split(':');
                                  if (audioinfo2.length == 3) {
                                    if (audioinfo2[2] != 'true') skillVoiceNum = parseInt(audioinfo2[2]);
                                  }
                                }
                              }
                            }
                          }
                          else if (!audioinfo.audio && (audioinfo.enable || audioinfo.trigger)) skillVoiceNum = 2;
                        }
                      }
                    } else {
                      if (skillInfoAudio.enable || skillInfoAudio.trigger) skillVoiceNum = 2;
                    }
                    if (skillVoiceNum != 0) {
                      var skillTaiciContent = ui.create.div('.qh-skillTaiciContent', this.taicineirong);
                      skillTaiciContent.innerHTML = get.translation(skill);
                      if (lib.config.qhly_editmode && !game.qhly_isForbidEditTaici(name) && skillTaiciContent) {
                        skillTaiciContent.id = "qhly_skin_skill_edit_" + skill;
                      }
                    }
                  }
                  if (skillVoiceNum != 0) {
                    for (var i = 1; i <= skillVoiceNum; i++) {
                      var skillTaicibg = ui.create.div('.qh-skillTaicibg', this.taicineirong);
                      if (i % 2 == 0) skillTaicibg.setAttribute('data-type', 'right');
                      var trumpet = ui.create.div('.qh-trumpet', skillTaicibg);
                      var taiciinner = ui.create.div('.qh-taiciinner', skillTaicibg);
                      trumpet.id = 'qhly_skin_skill_' + skill + '_' + i;
                      taiciinner.id = 'qhly_skilltaici_' + skill + '_' + i;
                    }
                  }

                  var skillInfoBody = ui.create.div('.qh-skillinfobody', this.text);
                  skillInfoBody.id = 'data-shoushaSkillInfo' + skill;
                  var dynamicTranslate = null;
                  var content = '';
                  if (cPlayer && lib.config.qhly_skillingame) {
                    var dtrans = lib.dynamicTranslate[skill];
                    if (dtrans) {
                      dtrans = dtrans(cPlayer, skill);
                    }
                    if (dtrans && lib.qhly_filterPlainText(dtrans) != lib.qhly_filterPlainText(detail)) {
                      dynamicTranslate = dtrans;
                      content += "<span style=opacity:0.4>";
                    } else {
                      if (dtrans && dtrans.length) {
                        detail = dtrans;
                      }
                    }
                    // if (!cPlayer.hasSkill(skill)) {
                    // }
                  }
                  content += lib.qhly_keyMark(detail);
                  if (dynamicTranslate) {
                    content += "</span><br>";
                    content += dynamicTranslate;
                  }
                  //else skillInfoBody.innerHTML = detail;
                  var info = get.info(skill);
                  if (info && (info.frequent || info.subfrequent)) {
                    content += "<br>&nbsp;&nbsp;<img style='vertical-align:middle;' id='qhly_autoskill_" + skill + "'/><b id='qhly_autoskill_text_" + skill + "'>自动发动</b>"
                  }
                  skillInfoBody.innerHTML = content;
                  var zhubeidong = ui.create.div('.qh-zhubeidong', skillInfoBody);

                  if (get.info(skill) && get.info(skill).trigger) zhubeidong.setBackgroundImage("extension/千幻聆音/theme/shousha/beidong.png");
                  else zhubeidong.setBackgroundImage("extension/千幻聆音/theme/shousha/zhudong.png");
                  var zhubeidongContent = ui.create.div('.qh-zhubeidongcontent', skillInfoBody);
                  zhubeidongContent.innerHTML = get.translation(skill) + '：';
                  if (skilljishu == 0) {
                    skillInfoHead.classList.add('sel');
                    skillInfoBody.classList.add('show');
                    var count = _status.qhly_skillAudioWhich[skill];
                    if (!count) {
                      _status.qhly_skillAudioWhich[skill] = 0;
                      count = 0;
                    }
                    _status.qhly_skillAudioWhich[skill]++;
                    window.qhly_TrySkillAudio(skill, { name: name }, null, count);
                  }
                  skilljishu++;
                }
              }
              var dieContent = ui.create.div('.qh-skillTaiciContent', this.taicineirong);
              dieContent.innerHTML = '阵亡台词';
              var skilltaicibg = ui.create.div('.qh-skillTaicibg', this.taicineirong);
              skilltaicibg.setAttribute('data-type', 'bottom');
              var trumpet = ui.create.div('.qh-trumpet', skilltaicibg);
              trumpet.id = 'qhly_skin_skill_die';
              var taiciinner = ui.create.div('.qh-taiciinner', skilltaicibg);
              taiciinner.id = 'qhly_skilltaici_die';
              dieContent.id = 'qhly_skin_skill_edit_die';

              var skilltaicibg = ui.create.div('.qh-skillTaicibg', this.taicineirong);
              skilltaicibg.setAttribute('data-type', 'end');
              skilltaicibg.id = 'qh-victoryBg';
              var vicContent = ui.create.div('.qh-victoryName', skilltaicibg, '胜利台词');
              var trumpet = ui.create.div('.qh-trumpet', skilltaicibg);
              trumpet.id = 'qhly_skin_skill_victory';
              var taiciinner = ui.create.div('.qh-taiciinner', skilltaicibg);
              taiciinner.id = 'qhly_skilltaici_victory';
              vicContent.id = 'qhly_skin_skill_edit_victory';
              //skilltaicibg.hide();


              var bindFunc = function (checkbox, text) {
                if (!text) return;
                ui.qhly_addListenFunc(text);
                text.listen(function () {
                  game.qhly_playQhlyAudio('qhly_voc_check', null, true);
                  checkbox.qhly_setChecked(!checkbox.qhly_checked, true);
                });
              };
              for (var skill of viewSkill) {
                var detail = get.translation(skill + "_info");
                if (detail) {
                  (function (skill) {
                    var img = document.getElementById('qhly_skillv_' + skill);
                    if (img) {
                      img.classList.add('qh-skillinfoimg');
                      ui.qhly_addListenFunc(img);
                      img.listen(function () {
                        if (this.classList.contains('sel')) return;
                        var buttons = document.getElementsByClassName('qh-skillinfohead');
                        var skillinfos = document.getElementsByClassName('qh-skillinfobody');
                        for (var i = 0; i < buttons.length; i++) {
                          buttons[i].classList.remove('sel')
                        }
                        for (var i = 0; i < skillinfos.length; i++) {
                          skillinfos[i].classList.remove('show')
                        }
                        this.classList.add('sel');
                        var skillinfo = document.getElementById('data-shoushaSkillInfo' + skill);
                        if (skillinfo) skillinfo.classList.add('show');
                        var count = _status.qhly_skillAudioWhich[skill];
                        if (!count) {
                          _status.qhly_skillAudioWhich[skill] = 0;
                          count = 0;
                        }
                        _status.qhly_skillAudioWhich[skill]++;
                        window.qhly_TrySkillAudio(skill, { name: name }, null, count);
                        var skillSkin = game.qhly_getSkillSkin(name, game.qhly_getSkin(name), skill);
                        if (skillSkin) {
                          if (skillSkin === 1) {
                            state.mainView.avatarImage.setBackground(name, 'character');
                          } else if (Array.isArray(skillSkin)) {
                            state.mainView.avatarImage.setBackgroundImage(skillSkin[count % skillSkin.length]);
                          } else {
                            state.mainView.avatarImage.setBackgroundImage(skillSkin);
                          }
                        }
                      });
                    }
                    var check = document.getElementById('qhly_autoskill_' + skill);
                    if (check) {
                      var list = [];
                      var info = get.info(skill);
                      if (info.frequent) {
                        list.add(skill);
                      }
                      if (info.subfrequent) {
                        for (var sub of info.subfrequent) {
                          list.add(skill + "_" + sub);
                        }
                      }
                      ui.qhly_initCheckBox(check, list.filter(function (sk) {
                        return !lib.config.autoskilllist || !lib.config.autoskilllist.contains(sk);
                      }).length != 0);
                      bindFunc(check, document.getElementById('qhly_autoskill_text_' + skill));
                      check.qhly_onchecked = function (checked) {
                        var list = [];
                        var info = get.info(skill);
                        if (info.frequent) {
                          list.add(skill);
                        }
                        if (info.subfrequent) {
                          for (var sub of info.subfrequent) {
                            list.add(skill + "_" + sub);
                          }
                        }
                        if (!lib.config.autoskilllist) {
                          lib.config.autoskilllist = [];
                        }
                        if (!checked) {
                          for (var s of list) {
                            lib.config.autoskilllist.add(s);
                          }
                        } else {
                          for (var s of list) {
                            lib.config.autoskilllist.remove(s);
                          }
                        }
                        game.saveConfig('autoskilllist', lib.config.autoskilllist);
                      };
                    }
                  })(skill);
                }
              }
              game.qhly_changeViewPageSkin('skill', this.pageView);
              this.inited = true;
            }
          },
          skin: {
            pageView: ui.create.div('.qh-page-skin', view),
            skinList: [],
            currentIndex: 0,
            skinListGot: false,
            firstRefresh: true,
            hideSkinMode: false,
            getCurrentSkin: function (name) {
              var skinId = game.qhly_getSkin(name);
              for (var skin of this.skinList) {
                if (skin && skin.skinId == skinId) {
                  return skin;
                }
                if (!skinId && !skin.skinId) {
                  return skin;
                }
              }
              return null;
            },
            // getSkinAt: function (num) {
            //     return this.skinList[num + this.currentIndex];
            // },
            onClickSkin: function (num, name, state) {
              var skin = this.skinList[num];
              if (!skin) {
                return;
              }
              if (game.qhly_skinLock(name, skin.skinId)) {
                var lock = game.qhly_skinLock(name, skin.skinId);
                if (lock.tryUnlock) {
                  lock.tryUnlock();
                }
                if (game.qhly_skinLock(name, skin.skinId)) {
                  return;
                }
              }
              if (_status['qhly_primarySkin_' + name] !== undefined) {
                if (skin.skinId == _status['qhly_primarySkin_' + name]) defaultButton.hide();
                else defaultButton.show();
              }
            },
            refresh: function (name, state) {
              if (!this.inited) this.init(name, state);
              if (this.skinListGot) {
                this.refreshAfterGot(name, state);
              } else {
                game.qhly_getSkinList(name, function (ret, list) {
                  this.afterGetSkinList(list, name, state);
                  this.refreshAfterGot(name, state);
                }.bind(this), true, true);
              }

            },
            packObject: function (name, state) {
              var packObj = {
                name: name,
                origin: {
                  skill: {

                  },
                },
                skin: {

                }
              };
              for (var skin of this.skinList) {
                if (!skin.skinId) {
                  var taici = game.qhly_getCharacterTaici(name, null, state.pkg);
                  if (taici) {
                    packObj.origin.skill = taici;
                  }
                } else {
                  var skinInfo = game.qhly_getSkinInfo(name, skin.skinId, state.pkg);
                  if (skinInfo) {
                    packObj.skin[game.qhly_earse_ext(skin.skinId)] = skinInfo;
                  }
                }
              }
              return packObj;
            },
            editOpen: function (name, skin, skill, state) {
              var obj = this.packObject(name, state);
              var title = "台词编辑";
              var detail = "编辑【" + ((skill == 'die') ? "阵亡" : get.translation(skill)) + "】的台词：";
              var initValue = "";
              var realSkill = skill;
              if (lib.qhly_skinShare[name] && lib.qhly_skinShare[name].skills && lib.qhly_skinShare[name].skills[skill]) realSkill = lib.qhly_skinShare[name].skills[skill];
              if (skin) {
                var skinInfo = obj.skin[game.qhly_earseExt(skin)];
                if (skinInfo && skinInfo.skill) {
                  if (skinInfo.skill[realSkill] && skinInfo.skill[realSkill].content) {
                    if (skinInfo.skill[realSkill].content2) {
                      initValue = skinInfo.skill[realSkill].content1 + '+' + skinInfo.skill[realSkill].content2;
                    } else initValue = skinInfo.skill[realSkill].content;
                  }
                }
              } else {
                var sskill = obj.origin.skill;
                if (sskill[realSkill] && sskill[realSkill].content) {
                  initValue = sskill[realSkill].content;
                }
              }
              var that = this;
              game.qhly_editDialog(title, detail, initValue, function (value, dialog) {
                if (!value) value = "";
                // while (value.indexOf("/") >= 0) {
                //     value = value.replace("/", "<br>");
                // }
                if (skin) {
                  if (value.indexOf("+") >= 0) {
                    value = value.split('+');
                  }
                  var m = obj.skin[game.qhly_earseExt(skin)];
                  if (m) {
                    if (!m.skill) m.skill = {};
                    if (!m.skill[realSkill]) {
                      m.skill[realSkill] = {};
                    }
                    if (Array.isArray(value)) {
                      m.skill[realSkill].content = value[0];
                      m.skill[realSkill].content1 = value[0];
                      m.skill[realSkill].content2 = value[1];
                    } else m.skill[realSkill].content = value;
                  }
                } else {
                  if (!obj.origin.skill[realSkill]) {
                    obj.origin.skill[realSkill] = { content: '' };
                  }
                  obj.origin.skill[realSkill].content = value;
                }
                var realName = game.qhly_getRealName(name);
                var obj2 = Object.assign(obj, { name: realName });
                var strobj = JSON.stringify(obj2, null, 4);
                game.qhly_readFileAsText("extension/千幻聆音/data/skininfomodel.txt", function (ret, str) {
                  if (ret) {
                    str = str.replace("_REPLACE_OBJECT_", strobj);
                    var path = game.qhly_getSkinImagePath(name, state.pkg);
                    game.qhly_writeTextFile(str, path + realName, "skininfo.js", function (err) {
                      if (!err) {
                        alert("保存成功");
                        lib.qhly_dirskininfo[name] = obj;
                        that.refresh(name, state, true);
                        dialog.delete();
                      } else {
                        alert("保存失败：" + JSON.stringify(err));
                      }
                    });
                  } else {
                    alert("保存失败：无法读取模板。");
                  }
                });
              }, function (dialog) {
                return true;
              });
            },
            refreshAfterGot: function (name, state) {
              var content = this.viewState.content;
              var viewState = this.viewState;
              var that = this;
              viewState.skinPerWidth = that.pageView.offsetWidth / 4.134;
              viewState.skinGap = that.pageView.offsetWidth / 16.5;
              viewState.skinTotalWidth = (viewState.skinPerWidth + viewState.skinGap) * this.skinList.length - viewState.skinGap + 20;
              viewState.lArrow.style.top = viewState.rArrow.style.top = viewState.skinPerWidth * 0.7 + 'px';
              viewState.lArrow.style.height = viewState.rArrow.style.height = viewState.skinPerWidth * 0.4 + 'px';
              var setSize = function () {
                viewState.skinPerWidth = that.pageView.offsetWidth * 0.242;
                viewState.skinGap = that.pageView.offsetWidth * 0.06;
                for (var i = 0; i < viewState.skinViews.length; i++) {
                  viewState.skinViews[i].style.width = viewState.skinPerWidth + 'px';
                  viewState.skinViews[i].style.height = viewState.skinPerWidth * 1.5 + 'px';
                  viewState.skinViews[i].style.left = Math.round((viewState.skinPerWidth + viewState.skinGap) * i + 5) + "px";
                }
                viewState.lArrow.style.top = viewState.rArrow.style.top = viewState.skinPerWidth * 0.7 + 'px';
                viewState.lArrow.style.height = viewState.rArrow.style.height = viewState.skinPerWidth * 0.4 + 'px';
                viewState.skinTotalWidth = (viewState.skinPerWidth + viewState.skinGap) * viewState.skinViews.length - viewState.skinGap + 20;
              };
              if (this.firstRefresh) {
                this.firstRefresh = false;
                const path = state.pkg.skin.standard;
                for (var i = 0; i < this.skinList.length; i++) {
                  var skin = this.skinList[i].skinId;
                  var skinView = ui.create.div('.qh-skinchange-shousha-big-skin', content);
                  if (lib.config.qhly_lutouType && lib.config.qhly_lutouType == 'shousha') skinView.classList.add('shousha');
                  skinView.id = 'qhly_bigSkin' + i;
                  skinView.skin = this.skinList[i];
                  skinView.avatar = ui.create.div('.primary-avatar', skinView);
                  skinView.campBack = ui.create.div('.qhcamp-shousha-big-back', skinView);
                  skinView.campBack.setAttribute('data-pinzhi', game.qhly_getSkinLevel(name, skin));
                  var hpWrap = ui.create.div('.qhhp-shousha-big-wrap', skinView);
                  skinView.belowText = ui.create.div('.qh-skinchange-shousha-big-skin-text', hpWrap);
                  viewState.skinViews.push(skinView);
                  skinView.style.left = Math.round((viewState.skinPerWidth + viewState.skinGap) * i + 5) + "px";
                  skinView.style.width = Math.round(viewState.skinPerWidth) + "px";
                  skinView.style.height = Math.round(viewState.skinPerWidth * 1.5) + "px";
                  skinView.avatar.classList.add('qh-not-replace');
                  skinView.toImageBtn = ui.create.div('.qh-domtoimage', skinView);
                  skinView.toImageBtn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    game.qhly_dom2image(cplayer, name, this, path, state);
                  });//3
                  skinView.dynamicTrue = ui.create.div('.qh-dynamictrue', skinView);
                  if (skin) {
                    var info = game.qhly_getSkinInfo(name, skin);
                    if (info) {
                      //skinView.belowText.innerHTML = info.translation;
                      skinView.belowText.innerHTML = game.qhly_rename(info.translation);
                      skinView.belowText.realName = info.translation;
                      if (game.qhly_skinIs(name, skin)) {
                        currentSkinView = skinView;
                        //state.mainView.avatar.belowText.innerHTML = (info.translation + '*' + get.translation(name));
                        state.mainView.avatar.belowText.innerHTML = (game.qhly_rename(info.translation,true) + '*' + get.translation(name));
                        state.mainView.hpWrap.style.width = state.mainView.avatar.belowText.innerHTML.length * 1.25 + 'em';
                        state.mainView.dragontail.hide();
                        state.mainView.skinType.hide();
                        state.mainView.hp.hide();
                        state.mainView.hpWrap.show();
                        if (this.skinList[i].bothSkin) {
                          state.mainView.dynamicToggle.setAttribute('toggle', true);
                          if (lib.config.qhly_skinset && lib.config.qhly_skinset.djtoggle && (!lib.config.qhly_skinset.djtoggle[name] || lib.config.qhly_skinset.djtoggle[name] && !lib.config.qhly_skinset.djtoggle[name][info.translation])) state.mainView.dynamicToggle.classList.remove('jing');
                          else state.mainView.dynamicToggle.classList.add('jing');
                        }
                        else state.mainView.dynamicToggle.setAttribute('toggle', false);
                        if (this.skinList[i].single && lib.config['extension_千幻聆音_qhly_dom2image']) skinView.toImageBtn.setAttribute('single', true);//6
                      }
                    }
                    if ((!lib.config.qhly_skinset.djtoggle[name] || lib.config.qhly_skinset.djtoggle[name] && !lib.config.qhly_skinset.djtoggle[name][skin.substring(0, skin.lastIndexOf('.'))]) && window.decadeUI && decadeUI.dynamicSkin && decadeUI.dynamicSkin[name] && Object.keys(decadeUI.dynamicSkin[name]).contains(info.translation)) {
                      if (game.qhly_skinIs(name, skin)) {
                        currentSkinView = skinView;
                        game.qhly_changeDynamicSkin(state.mainView.avatarImage, info.translation, name);
                        if (state.mainView.avatarImage.dynamic && state.mainView.avatarImage.dynamic.primary && state.mainView.avatarImage.dynamic.primary.name) _status.currentTexiao = state.mainView.avatarImage.dynamic.primary.name;
                        if (_status.currentTexiao) {
                          _status.texiaoTimer2 = setTimeout(function () {
                            game.playShoushaAvatar(state.mainView.avatarImage, lib.config.qhly_shoushaBigFlip[name][game.qhly_getSkin(name)], state.name);
                            _status.texiaoTimer = setInterval(() => {
                              game.playShoushaAvatar(state.mainView.avatarImage, lib.config.qhly_shoushaBigFlip[name][game.qhly_getSkin(name)], state.name);
                            }, Math.random() * 3000 + 10000);
                          }, 5000)
                        }
                      }
                    }
                    if (window.decadeUI && decadeUI.dynamicSkin && decadeUI.dynamicSkin[name] && Object.keys(decadeUI.dynamicSkin[name]).contains(info.translation)) skinView.dynamicTrue.setAttribute('dynamic', true);
                    else skinView.dynamicTrue.setAttribute('dynamic', false);
                  } else {
                    skinView.belowText.innerHTML = "经典形象";
                    skinView.belowText.realName = "经典形象";
                    if (game.qhly_skinIs(name, skin)) {
                      state.mainView.avatar.belowText.innerHTML = ("经典形象" + '*' + get.translation(name));
                      state.mainView.dragontail.show();
                      state.mainView.skinType.show();
                      state.mainView.hp.show();
                      state.mainView.hpWrap.hide();
                      if (this.skinList[0].bothSkin) {
                        state.mainView.dynamicToggle.setAttribute('toggle', true);
                        if (lib.config.qhly_skinset && lib.config.qhly_skinset.djtoggle && (!lib.config.qhly_skinset.djtoggle[name] || lib.config.qhly_skinset.djtoggle[name] && !lib.config.qhly_skinset.djtoggle[name]['经典形象'])) state.mainView.dynamicToggle.classList.remove('jing');
                        else state.mainView.dynamicToggle.classList.add('jing');
                      }
                      else state.mainView.dynamicToggle.setAttribute('toggle', false);
                      if (this.skinList[0].skinId == null && this.skinList[0].bothSkin && lib.config.qhly_skinset && lib.config.qhly_skinset.djtoggle && (!lib.config.qhly_skinset.djtoggle[name] || lib.config.qhly_skinset.djtoggle[name] && !lib.config.qhly_skinset.djtoggle[name]['经典形象'])) game.qhly_changeDynamicSkin(state.mainView.avatarImage, '经典形象', name);
                    }
                    if (window.decadeUI && decadeUI.dynamicSkin && decadeUI.dynamicSkin[name] && Object.keys(decadeUI.dynamicSkin[name]).contains('经典形象')) skinView.dynamicTrue.setAttribute('dynamic', true);
                    else skinView.dynamicTrue.setAttribute('dynamic', false);
                  }
                  skinView.skinQua = ui.create.div('.qh-page-skinavatarlevel', skinView);
                  var level = this.skinList[i].skinInfo.level;
                  var style = this.skinList[i].skinInfo.levelStyle;
                  if (style) {
                    if (!skinView.skinQua.qh_savedStyle) {
                      skinView.skinQua.qh_savedStyle = {};
                      for (var m in skinView.skinQua.style) {
                        skinView.skinQua.qh_savedStyle[m] = skinView.skinQua.style[m];
                      }
                    }
                    for (var s in style) {
                      skinView.skinQua.style[s] = style[s];
                    }
                    var es = ['left', 'bottom', 'top', 'right'];
                    for (var m of es) {
                      if (!style[m]) {
                        skinView.skinQua.style[m] = "";
                      }
                    }
                  } else {
                    if (skinView.skinQua.qh_savedStyle) {
                      for (var m in skinView.skinQua.qh_savedStyle) {
                        skinView.skinQua.style[m] = skinView.skinQua.qh_savedStyle[m];
                      }
                    }
                  }
                  if (this.skinList[i].skinId) {
                    if (lib.qhly_level[name + '_' + this.skinList[i].skinId]) {
                      level = lib.qhly_level[name + '_' + this.skinList[i].skinId];
                    }
                  }
                  if (level) {
                    var map = {
                      '原画': '原画',
                      '普通': '普通',
                      '稀有': '稀有',
                      '精良': '精良',
                      '史诗': '史诗',
                      '传说': '传说',
                      '动态': '传说',
                      '限定': '传说',
                      '绝版': '传说',
                    };
                    var img = null;
                    if (map[level]) {
                      img = "extension/千幻聆音/image/" + map[level] + ".png";
                    } else if (level.indexOf("#") == 0) {
                      var l2 = level.replace("#", "");
                      img = "extension/千幻聆音/image/" + l2 + ".png";
                    } else if (level.indexOf("$") == 0) {
                      var l2 = level.replace("$", "");
                      img = l2;
                    }
                    if (img) {
                      skinView.skinQua.show();
                      skinView.skinQua.setBackgroundImage(img);
                    } /* else {
                                            //skinView.skinQua.hide();
                                        } */
                  } /* else {
                                        skinView.skinQua.hide();
                                    } */
                  //skinView.skinQua = ui.create.div('.qhly-skinQua-shousha-big', skinView);
                  //skinView.skinQua.style['background-image'] = 'url(' + lib.qhly_path+'image/' + game.qhly_getSkinLevel(name, skin) + '.png)';
                  skinView.skinQua.id = 'qhly_skinQua' + i;
                  // viewState.offset = (viewState.skinPerWidth + viewState.skinGap) * 0.5 - Math.round((viewState.skinPerWidth + viewState.skinGap) * that.currentIndex);
                  if (game.qhly_skinIs(name, skin)) {
                    skinView.classList.add('sel');
                    currentIndex = i;
                    if (this.skinList[i].bothSkin) state.mainView.dynamicToggle.setAttribute('toggle', true);
                    //state.mainView.rank.style.backgroundImage = skinView.skinQua.style.backgroundImage;
                    if (skinView.offsetLeft > viewState.visibleWidth()) viewState.offset = viewState.visibleWidth() - (skinView.offsetLeft + 20 + viewState.skinPerWidth);
                    var extInfo = "";
                    if (this.skinList[i].skinInfo.info) {
                      extInfo = this.skinList[i].skinInfo.info;
                    } else {
                      if (state.pkg && state.pkg.originSkinInfo) {
                        var pig = state.pkg.originSkinInfo(name);
                        if (pig) {
                          extInfo = pig;
                        }
                      }
                    }
                    if (extInfo) {
                      state.mainView.skininfoWrap.show();
                      state.mainView.skininfoText.innerHTML = extInfo;
                    } else state.mainView.skininfoWrap.hide();
                  } else {
                    skinView.classList.remove('sel');
                  }
                  // skinView.style.left = Math.round((viewState.skinPerWidth + viewState.skinGap) * i + 104) + "em";
                  // skinView.style.width = viewState.skinPerWidth + "em";

                  if (skin) {
                    let file = game.qhly_getSkinFile(name, skin);
                    let skinView2 = skinView.avatar;
                    game.qhly_checkFileExist(file, function (s) {
                      if (s) {
                        skinView2.qhly_origin_setBackgroundImage(file);
                      } else {
                        var prefix = state.pkg.prefix;
                        if (typeof prefix == 'function') {
                          prefix = prefix(name);
                        }
                        if (lib.config.qhly_noSkin == 'origin') skinView2.qhly_origin_setBackgroundImage(prefix + name + '.jpg');//原画
                        else skinView2.qhly_origin_setBackgroundImage('extension/千幻聆音/image/noSkin.png');//noskin
                      }
                    })
                  } else {
                    skinView.avatar.qhly_origin_setBackground(name, 'character');
                  }
                  if (game.qhly_skinLock(name, skin)) {
                    ui.create.div('.qh-lock', skinView);
                    skinView.isLocked = true;
                    skinView.style.filter = "grayscale(100%)";
                  } else {
                    skinView.style.filter = "grayscale(0%)";
                  }
                  skinView.listen(function () {
                    if (this.classList.contains('sel')) return;
                    if (!this.isLocked) {
                      for (var i = 0; i < viewState.skinViews.length; i++) {
                        viewState.skinViews[i].classList.remove('sel');
                      }
                      this.classList.add('sel');
                      clearInterval(_status.texiaoTimer);
                      clearTimeout(_status.texiaoTimer2);
                      //state.mainView.avatar.belowText.innerHTML = (this.belowText.innerHTML + '*' + get.translation(name));
                      state.mainView.avatar.belowText.innerHTML = (game.qhly_rename(this.belowText.realName,true) + '*' + get.translation(name));
                      state.mainView.hpWrap.style.width = state.mainView.avatar.belowText.innerHTML.length * 1.25 + 'em';
                      var extInfo = "";
                      if (this.skin.skinInfo.info) {
                        extInfo = this.skin.skinInfo.info;
                      } else {
                        if (state.pkg && state.pkg.originSkinInfo) {
                          var pig = state.pkg.originSkinInfo(name);
                          if (pig) {
                            extInfo = pig;
                          }
                        }
                      }
                      if (extInfo.length) {
                        state.mainView.skininfoWrap.show();
                        state.mainView.skininfoText.innerHTML = extInfo;
                      } else state.mainView.skininfoWrap.hide();
                      var originSkin = this.skin.skinId;
                      var now = this;
                      game.qhly_setCurrentSkin(name, originSkin, function () {
                        if (now.belowText.innerHTML != '经典形象') {
                          state.mainView.dragontail.hide();
                          state.mainView.skinType.hide();
                          state.mainView.hp.hide();
                          state.mainView.hpWrap.show();
                          if ((!lib.config.qhly_skinset.djtoggle[name] || lib.config.qhly_skinset.djtoggle[name] && !lib.config.qhly_skinset.djtoggle[name][now.belowText.innerHTML]) && window.decadeUI && decadeUI.dynamicSkin && decadeUI.dynamicSkin[name] && Object.keys(decadeUI.dynamicSkin[name]).contains(now.belowText.innerHTML)) {
                            game.qhly_changeDynamicSkin(state.mainView.avatarImage, now.belowText.innerHTML, name);
                            if (state.mainView.avatarImage.dynamic && state.mainView.avatarImage.dynamic.primary && state.mainView.avatarImage.dynamic.primary.name) _status.currentTexiao = state.mainView.avatarImage.dynamic.primary.name;
                            if (_status.currentTexiao) {
                              _status.texiaoTimer2 = setTimeout(function () {
                                game.playShoushaAvatar(state.mainView.avatarImage, lib.config.qhly_shoushaBigFlip[name][game.qhly_getSkin(name)], state.name);
                                _status.texiaoTimer = setInterval(() => {
                                  game.playShoushaAvatar(state.mainView.avatarImage, lib.config.qhly_shoushaBigFlip[name][game.qhly_getSkin(name)], state.name);
                                }, Math.random() * 3000 + 10000);
                              }, 5000)
                            }
                          }
                          else if (state.mainView.avatarImage.stopDynamic) state.mainView.avatarImage.stopDynamic();
                          if (that.skinList[now.id.slice(12)].bothSkin && window.decadeUI && decadeUI.dynamicSkin && decadeUI.dynamicSkin[name] && Object.keys(decadeUI.dynamicSkin[name]).contains(now.belowText.innerHTML)) {
                            state.mainView.dynamicToggle.setAttribute('toggle', true);
                            if (lib.config.qhly_skinset && lib.config.qhly_skinset.djtoggle && (!lib.config.qhly_skinset.djtoggle[name] || lib.config.qhly_skinset.djtoggle[name] && !lib.config.qhly_skinset.djtoggle[name][now.belowText.innerHTML])) state.mainView.dynamicToggle.classList.remove('jing');
                            else state.mainView.dynamicToggle.classList.add('jing');
                          }
                          else state.mainView.dynamicToggle.setAttribute('toggle', false);
                        } else {
                          state.mainView.dragontail.show();
                          state.mainView.skinType.show();
                          state.mainView.hp.show();
                          state.mainView.hpWrap.hide();
                          if (that.skinList[0].skinId == null && that.skinList[0].bothSkin && lib.config.qhly_skinset && lib.config.qhly_skinset.djtoggle && (!lib.config.qhly_skinset.djtoggle[name] || lib.config.qhly_skinset.djtoggle[name] && !lib.config.qhly_skinset.djtoggle[name]['经典形象'])) game.qhly_changeDynamicSkin(state.mainView.avatarImage, '经典形象', name);
                          else if (state.mainView.avatarImage.stopDynamic) state.mainView.avatarImage.stopDynamic();
                          if (that.skinList[0].skinId == null && that.skinList[0].bothSkin) {
                            state.mainView.dynamicToggle.setAttribute('toggle', true);
                            if (lib.config.qhly_skinset && lib.config.qhly_skinset.djtoggle && (!lib.config.qhly_skinset.djtoggle[name] || lib.config.qhly_skinset.djtoggle[name] && !lib.config.qhly_skinset.djtoggle[name]['经典形象'])) state.mainView.dynamicToggle.classList.remove('jing');
                            else state.mainView.dynamicToggle.classList.add('jing');
                          }
                          else state.mainView.dynamicToggle.setAttribute('toggle', false);
                        }
                        game.qhly_syncChangeSkinButton(name, originSkin, state);
                        var skills = get.character(name, 3);
                        if (skills && skills.length) {
                          var count = _status.qhly_skillAudioWhich[skills[0]];
                          if (!count) {
                            _status.qhly_skillAudioWhich[skills[0]] = 0;
                            count = 0;
                          }
                          _status.qhly_skillAudioWhich[skills[0]]++;
                          window.qhly_TrySkillAudio(skills[0], { name: name }, null, count);
                          state.mainView.page.config.refresh(name, state);
                          //that.refresh(name, state);
                          if (state.pkg.isLutou || lib.config.qhly_lutou) {
                            subView.avatarImage.classList.remove('qh-image-standard');
                            subView.avatarImage.classList.add('qh-image-lutou');
                          } else {
                            subView.avatarImage.classList.remove('qh-image-lutou');
                            subView.avatarImage.classList.add('qh-image-standard');
                          }
                          let originName, guozhanName, currentName;
                          if (name.indexOf('gz_') == 0) {
                            originName = name.slice(3);
                            guozhanName = name;
                          } else {
                            originName = name;
                            guozhanName = 'gz_' + name;
                          }
                          if (state.mainView.skinType.skintype && state.mainView.skinType.skintype == 'qh_skintype1') currentName = guozhanName;
                          else currentName = originName;
                          game.qhly_setOriginSkin(currentName, originSkin, state.mainView.avatarImage, state, game.qhly_getPlayerStatus(state.mainView.avatarImage, null, state.name) == 2);
                          //切换皮肤
                          if(state.mainView.avatarImage.BlurImage) {
                              game.qhly_setOriginSkin(currentName, originSkin, state.mainView.avatarImage.BlurImage, state, game.qhly_getPlayerStatus(state.mainView.avatarImage.BlurImage, null, state.name) == 2, true);
                          }
                          refreshRank();
                        }
                      });
                      //state.mainView.rank.style.backgroundImage = this.skinQua.style.backgroundImage;
                    }
                    that.onClickSkin(parseInt(this.id.slice(12)), name, state);
                  });
                }
                if (viewState.skinTotalWidth + viewState.offset > viewState.visibleWidth()) viewState.rArrow.setAttribute('data-visiable', true);
                else viewState.rArrow.setAttribute('data-visiable', false);
                if (viewState.offset < 0) viewState.lArrow.setAttribute('data-visiable', true);
                else viewState.lArrow.setAttribute('data-visiable', false);
                viewState.refresh();
                //setSize();
              }
              var resize = function () {
                setTimeout(setSize, 600);
              };
              lib.onresize.push(resize);
              if (lib.config.touchscreen) {
                content.addEventListener('touchstart', function (event) {
                  if (event.touches && event.touches.length) {
                    viewState.handleMouseDown(event.touches[0].clientX, event.touches[0].clientY);
                  }
                });
                content.addEventListener('touchend', function (event) {
                  viewState.handleMouseUp();
                });
                content.addEventListener('touchcancel', function (event) {
                  viewState.handleMouseUp();
                });
                content.addEventListener('touchmove', function (event) {
                  if (event.touches && event.touches.length)
                    viewState.handleMouseMove(event.touches[0].clientX, event.touches[0].clientY);
                });
              } else {
                content.addEventListener('mousewheel', function (event) {
                  viewState.handleMouseDown(event.clientX, event.clientY);
                  if (event.wheelDelta > 0) {
                    viewState.handleMouseMove(event.clientX - 30, event.clientY);
                    viewState.handleMouseUp(event.clientX - 30, event.clientY);
                  } else {
                    viewState.handleMouseMove(event.clientX + 30, event.clientY);
                    viewState.handleMouseUp(event.clientX + 30, event.clientY);
                  }
                });
                content.addEventListener('mousedown', function (event) {
                  viewState.handleMouseDown(event.clientX, event.clientY);
                });
                content.addEventListener('mouseup', function (event) {
                  viewState.handleMouseUp(event.clientX, event.clientY);
                });
                content.addEventListener('mouseleave', function (event) {
                  viewState.handleMouseUp(event.clientX, event.clientY);
                });
                content.addEventListener('mousemove', function (event) {
                  viewState.handleMouseMove(event.clientX, event.clientY);
                });
              }
              //viewState.skinAudioList.innerHTML = '';
              var addButton = [];
              var currentSkin = this.getCurrentSkin(name);
              _status.currentSkin = currentSkin;
              var currentSkinView = document.querySelectorAll('.qh-skinchange-shousha-big-skin.sel')[0];
              var currentIndex;
              if (currentSkinView) currentIndex = currentSkinView.id.slice(12);
              else currentIndex = 0;
              var Vicpath = `${state.pkg.audio}${game.qhly_getRealName(name)}/`;
              if (game.qhly_getSkin(name)) Vicpath += `${game.qhly_earse_ext(game.qhly_getSkin(name))}/`;
              var victoryBg = document.querySelector('#qh-victoryBg');
              if (game.thunderFileExist(lib.assetURL + Vicpath + 'victory.mp3')) victoryBg.show();
              else victoryBg.hide();
              if (currentSkin && currentSkin.audios) {
                for (var audio of currentSkin.audios) {
                  var objx = this.packObject(name, state);
                  var initValuex = "";
                  var realSkill = audio.id;
                  if (lib.qhly_skinShare[name] && lib.qhly_skinShare[name].skills && lib.qhly_skinShare[name].skills[audio.id]) realSkill = lib.qhly_skinShare[name].skills[audio.id];
                  var skillTaici = document.querySelectorAll("div[id^='qhly_skilltaici_" + audio.id + "']");
                  var trumpet = document.querySelectorAll("div[id^='qhly_skin_skill_" + audio.id + "']");
                  if (currentSkin.skinId) {
                    var skinInfox = objx.skin[game.qhly_earseExt(currentSkin.skinId)];
                    if (skinInfox && skinInfox.skill) {
                      if (skinInfox.skill[realSkill] && skinInfox.skill[realSkill].content) {
                        if (skinInfox.skill[realSkill].content2) {
                          initValuex = skinInfox.skill[realSkill]['content' + game.qhly_getPlayerStatus(state.mainView.avatarImage, (cplayer && cplayer.name2 && cplayer.name2 == state.name), state.name)];
                        }
                        else initValuex = skinInfox.skill[realSkill].content;
                      }
                    }
                    if (trumpet) {
                      for (var i = 0; i < trumpet.length; i++) {
                        trumpet[i].classList.remove('origin');
                      }
                    }
                  } else {
                    var sskillx = objx.origin.skill;
                    if (sskillx[realSkill] && sskillx[realSkill].content) {
                      initValuex = sskillx[realSkill].content;
                    }
                    if (trumpet) {
                      for (var i = 0; i < trumpet.length; i++) {
                        trumpet[i].classList.add('origin');
                      }
                    }
                  }
                  if (skillTaici) {
                    if (initValuex) {
                      if (initValuex.indexOf('/') != -1) {
                        initValuex = initValuex.split('/');
                      } else if (initValuex.indexOf('<br>') != -1) {
                        initValuex = initValuex.split('<br>');
                      } else initValuex = [initValuex]
                    }
                    for (var i = 0; i < skillTaici.length; i++) {
                      skillTaici[i].innerHTML = '点击播放配音';//不再空空如也
                      if (initValuex && initValuex[i]) skillTaici[i].innerHTML = initValuex[i];
                    }
                  }
                  addButton.add(audio.id);
                }
                if (lib.config.qhly_skinconfig) {
                  if (currentSkin.skinId) {
                    var levelSelect = document.getElementById('qhconfig_level_select');
                    var opt = document.createElement('option');
                    opt.innerHTML = "默认";
                    opt.setAttribute('name', 'default');
                    levelSelect.appendChild(opt);
                    var levels = ['原画', '普通', '精良', '稀有', '史诗', '传说', '限定', '动态', '绝版'];
                    var map = {
                      '原画': 'yuanhua',
                      '普通': 'putong',
                      '精良': 'jingliang',
                      '稀有': 'xiyou',
                      '史诗': 'shishi',
                      '传说': 'chuanshuo',
                      '限定': 'xianding',
                      '动态': 'dongtai',
                      '绝版': 'jueban',
                    };
                    if (!lib.qhly_level[name + '_' + currentSkin.skinId]) {
                      opt.selected = 'selected';
                    }
                    for (var l of levels) {
                      var opt = document.createElement('option');
                      opt.innerHTML = l;
                      opt.setAttribute('name', l);
                      if (lib.qhly_level[name + '_' + currentSkin.skinId] == l) {
                        opt.selected = 'selected';
                      }
                      levelSelect.appendChild(opt);
                    }
                    levelSelect.onchange = function (e) {
                      var event = e ? e : window.event;
                      if (event.target) {
                        var target = event.target;
                        var opt = target[target.selectedIndex];
                        if (opt) {
                          var l = opt.getAttribute('name');
                          if (l == 'default') {
                            delete lib.qhly_level[name + '_' + currentSkin.skinId];
                            game.saveConfig('qhly_level', lib.qhly_level);
                            return;
                          }
                          var lm = map[l];
                          if (lm) {
                            lib.qhly_level[name + '_' + currentSkin.skinId] = l;
                            game.saveConfig('qhly_level', lib.qhly_level);
                          }
                        }
                        if (currentSkinView) currentSkinView.campBack.setAttribute('data-pinzhi', game.qhly_getSkinLevel(name, currentSkin.skinId));
                        var skinQua = document.getElementById('qhly_skinQua' + currentIndex);
                        if (skinQua) {
                          skinQua.setBackgroundImage('extension/千幻聆音/image/' + game.qhly_getSkinLevel(name, currentSkin.skinId) + '.png');
                          //skinQua.show();
                        }
                      }
                      refreshRank();
                    };

                    var orderSelect = document.getElementById('qhconfig_order_select');
                    var opt = document.createElement('option');
                    opt.innerHTML = "默认";
                    opt.setAttribute('order', 'default');
                    orderSelect.appendChild(opt);
                    if (lib.config.qhly_order[name + '-' + currentSkin.skinId] === undefined) {
                      opt.selected = 'selected';
                    }
                    for (var i = 0; i < 50; i++) {
                      var opt = document.createElement('option');
                      opt.innerHTML = "" + i;
                      opt.setAttribute('order', i);
                      if (lib.config.qhly_order[name + '-' + currentSkin.skinId] == i) {
                        opt.selected = 'selected';
                      }
                      orderSelect.appendChild(opt);
                    }
                    orderSelect.onchange = function (e) {
                      var event = e ? e : window.event;
                      if (event.target) {
                        var target = event.target;
                        var opt = target[target.selectedIndex];
                        if (opt) {
                          var o = opt.getAttribute('order');
                          if (o == 'default') {
                            game.qhly_setOrder(name, currentSkin.skinId);
                          } else {
                            game.qhly_setOrder(name, currentSkin.skinId, o);
                          }
                        }
                      }
                    };

                  }
                  var banInRandomCheckbox = document.getElementById('qhconfig_checkbox_banInRandom');
                  var bindFunc = function (checkbox, text) {
                    if (!text) return;
                    ui.qhly_addListenFunc(text);
                    text.listen(function () {
                      game.qhly_playQhlyAudio('qhly_voc_check', null, true);
                      checkbox.qhly_setChecked(!checkbox.qhly_checked, true);
                    });
                  };
                  ui.qhly_initCheckBox(banInRandomCheckbox, game.qhly_skinIsBanned(name, currentSkin.skinId));
                  bindFunc(banInRandomCheckbox, document.getElementById('qhconfig_checkbox_banInRandom_text'));
                  banInRandomCheckbox.qhly_onchecked = function (checked) {
                    game.qhly_banSkin(name, currentSkin.skinId, checked);
                  };
                }
                if (!this.firstAddAudio) for (var vid of addButton) {
                  this.firstAddAudio = true;
                  //var img = document.getElementById('qhly_skin_skill_' + vid);
                  //var img = document.querySelectorAll("div[id^='qhly_skin_skill_" + vid + "']");
                  //Helasisy修：AI给出的精确匹配技能id修复方案
                  var allElements = document.querySelectorAll("div[id^='qhly_skin_skill_" + vid + "']");
                    var img = Array.from(allElements).filter(element => {
                        var id = element.id;
                        // 匹配格式: qhly_skin_skill_rende 或 qhly_skin_skill_rende_数字
                        var regex = new RegExp(`^qhly_skin_skill_${vid}(_\\d+)?$`);
                        return regex.test(id);
                    });
                  if (img) {
                    // if (Array.isArray(img)) img.sort(function (a, b) {
                    //     return parseInt(a.id.substring(a.id.lastIndexOf('_') + 1)) - parseInt(b.id.substring(b.id.lastIndexOf('_') + 1));
                    // })
                    for (var i = 0; i < img.length; i++) {
                      ui.qhly_addListenFunc(img[i]);
                      var that = this;
                      (function (id) {
                        var vclick = function(){
                          that.consumeTextClick = true;
                          if (id == 'die') window.qhly_playDieAudio(name);
                          else if (id == 'victory') window.qhly_playVictoryAudio(name);
                          else {
                            window.qhly_TrySkillAudio(id, { name: name }, null, parseInt(this.id.substring(this.id.lastIndexOf('_') + 1) - 1));
                            var skillSkin = game.qhly_getSkillSkin(name, game.qhly_getSkin(name), id);
                            if (skillSkin) {
                              // var currentAvatar = document.getElementById('qh-skillskin-' + parseInt(this.id.substring(this.id.lastIndexOf('_') + 1) - 1));
                              // if(current)
                              if (skillSkin === 1) {
                                state.mainView.avatarImage.setBackground(name, 'character');
                              } else if (Array.isArray(skillSkin)) {
                                state.mainView.avatarImage.setBackgroundImage(skillSkin[parseInt(this.id.substring(this.id.lastIndexOf('_') + 1) - 1) % skillSkin.length]);
                              } else {
                                state.mainView.avatarImage.setBackgroundImage(skillSkin);
                              }
                            }
                          }
                        };
                        if(lib.config.qhly_audioPlus){
                          if(lib.config.touchscreen){
                            lib.setLongPress(img[i],function(){
                              _status.qh_volmode = true;
                            });
                          }else{
                            var imgi = img[i];
                            img[i].addEventListener('mousedown',function(e){
                              if(e.button==2){
                                _status.qh_volmode = true;
                                vclick.apply(imgi,[]);
                              }
                            });
                          }
                        }
                        img[i].listen(vclick);
                      })(vid);
                    }
                  }
                  if (lib.config.qhly_editmode && !game.qhly_isForbidEditTaici(name)) {
                    var imgEdit = document.getElementById('qhly_skin_skill_edit_' + vid);
                    if (imgEdit) {
                      ui.qhly_addListenFunc(imgEdit);
                      (function (id) {
                        imgEdit.listen(function () {
                          that.editOpen(name, _status.currentSkin.skinId, id, state);
                        });
                      })(vid);
                    }
                  }
                }
              }
            },
            afterGetSkinList: function (list, name, state) {
              var retList = [];
              if (list) {
                for (var skin of list) {
                  var info = game.qhly_getSkinInfo(name, skin, state.pkg);
                  var obj = {
                    order: info.order,
                    skinId: skin,
                    skinInfo: info,
                    audios: get.qhly_getAudioInfoInSkin(name, state.pkg, skin),
                  };
                  retList.push(obj);
                }
              }
              this.skinList = [];
              this.skinList.push({
                skinId: null,
                skinInfo: game.qhly_getSkinInfo(name, null, state.pkg),
                audios: get.qhly_getAudioInfoInSkin(name, state.pkg, null),
              });
              retList.sort(function (a, b) {
                var orderA = game.qhly_getOrder(name, a.skinId, state.pkg);
                var orderB = game.qhly_getOrder(name, b.skinId, state.pkg);
                if (orderA > orderB) return 1;
                if (orderA == orderB) return 0;
                return -1;
              });
              for (var r of retList) {
                this.skinList.push(r);
              }
              var dynamicSkinList = [];
              if (window.decadeUI) {
                if (decadeUI.dynamicSkin[name]) dynamicSkinList = Object.keys(decadeUI.dynamicSkin[name]);
                for (var i of this.skinList) {
                  if (i.skinId) {
                    var skin = i.skinId.substring(0, i.skinId.lastIndexOf('.'));
                    if (dynamicSkinList.contains(skin)) i.bothSkin = true;
                  }
                }
                if (dynamicSkinList.length) {
                  var duibiList = [];
                  for (var i of this.skinList) {
                    if (i.skinId && i.skinId != null) duibiList.push(i.skinId.substring(0, i.skinId.lastIndexOf('.')));
                  }
                  for (var i of dynamicSkinList) {
                    if (i == '经典形象') {
                      this.skinList['0'].bothSkin = true;
                      subView.skinType.style.cssText += 'transform:translateY(32%);';
                    }
                    else if (!duibiList.contains(i)) {
                      var dyskin = i + '.jpg';
                      var dyinfo = game.qhly_getSkinInfo(name, dyskin, state.pkg);
                      this.skinList.push({
                        order: dyinfo.order,
                        skinId: dyskin,
                        skinInfo: dyinfo,
                        audios: get.qhly_getAudioInfoInSkin(name, state.pkg, dyskin),
                        single: true,//11
                      })
                    }
                  }
                }
              }
              this.viewState.skins = this.skinList;
              this.skinListGot = true;
              if (dynamicSkinList && dynamicSkinList.length > 3) this.dynamicSkinMore = true;
            },
            init: function (name, state) {
              /* this.text = ui.create.div('.qh-page-skin-text', this.pageView);
              lib.setScroll(this.text);
              fixTextSize(this.text); */
              var dialog = ui.create.div('.qh-skinchange-decade-big-dialog', this.pageView);
              if (lib.config.qhly_lutouType && lib.config.qhly_lutouType == 'shousha') dialog.classList.add('shousha');
              ui.create.div('.qh-skinchange-decade-big-dibuhuo', dialog);
              var cover = ui.create.div('.qh-skinchange-decade-big-cover', dialog);
              var content = ui.create.div('.qh-skinchange-decade-big-area', cover);
              //var skinTitle = ui.create.div('.qh-skinchange-decade-big-title', this.text);
              //var skinAudioList = ui.create.div('.qh-skinchange-decade-big-skinaudiolist', this.text);
              //if (lib.config.qhly_lutou) dialog.setAttribute('data-outcrop-skin', 'on');
              // if (state.pkg.isLutou || lib.config.qhly_lutou) {
              //     content.setAttribute('data-outcrop-skin', 'on');
              // }
              //小图片露头
              if (lib.config.qhly_lutou) {
                  //dialog.setAttribute('data-outcrop-skin', 'on');
                  if(lib.config.extension_千幻聆音_lutouFixx&&lib.config.extension_千幻聆音_lutouFixx!='off') {
                      dialog.setAttribute('data-outcrop-skin', 'fix');
                  }else {
                      dialog.setAttribute('data-outcrop-skin', 'on');
                  }
              }
              if (!_status['qhly_primarySkin_' + name]) _status['qhly_primarySkin_' + name] = game.qhly_getSkin(name);
              var rArrow = ui.create.div('.qh-skinchange-shousha-bigarrow', dialog);
              var lArrow = ui.create.div('.qh-skinchange-shousha-bigarrow.left', dialog);
              this.viewState = {
                offset: 0,
                skinPerWidth: 100,
                skinGap: 25,
                skins: [],
                skinViews: [],
                //skinTitle: skinTitle,
                //skinAudioList: skinAudioList,
                visibleWidth: function () {
                  var rect = cover.getBoundingClientRect();
                  return rect.width;
                },
                cover: cover,
                content: content,
                rArrow: rArrow,
                lArrow: lArrow,
                refresh: function () {
                  if (!this.offset) this.offset = 0;
                  content.style.width = Math.round(this.skinTotalWidth) + 'px';
                  content.style.left = Math.round(this.offset) + "px";
                },
                handleMouseDown: function (x, y) {
                  if (this.skinTotalWidth <= this.visibleWidth()) {
                    return;
                  }
                  this.mouseDownX = x;
                  this.mouseDownY = y;
                  this.isTouching = true;
                  this.cancelClick = false;
                  if (!this.offset) this.offset = content.offsetLeft;
                  this.tempoffset = this.offset;
                },
                handleMouseMove: function (x, y) {
                  if (this.isTouching) {
                    var slideX = x - this.mouseDownX;
                    this.tempoffset = this.offset + slideX;
                    if (this.tempoffset > 0) {
                      this.tempoffset = 0;
                    } else if (this.skinTotalWidth - this.visibleWidth() < -this.tempoffset) {
                      this.tempoffset = -(this.skinTotalWidth - this.visibleWidth());
                    }
                    this.content.style.left = Math.round(this.tempoffset) + "px";
                    if (this.skinTotalWidth + this.tempoffset > this.visibleWidth()) this.rArrow.setAttribute('data-visiable', true);
                    else this.rArrow.setAttribute('data-visiable', false);
                    if (this.tempoffset < 0) this.lArrow.setAttribute('data-visiable', true);
                    else this.lArrow.setAttribute('data-visiable', false);
                    return true;
                  }
                },
                handleMouseUp: function (x, y) {
                  var shoushaBg = document.getElementsByClassName('qh-shoushabg');
                  if (shoushaBg.length) {
                    shoushaBg[0].classList.add('suoxiao');
                  }
                  var shoushaBgBody = document.getElementsByClassName('qh-shoushabgbody');
                  if (shoushaBgBody.length) {
                    shoushaBgBody[0].classList.add('suoxiao');
                  }
                  var shoushaBgTail = document.getElementsByClassName('qh-shoushabgtail');
                  if (shoushaBgTail.length) {
                    shoushaBgTail[0].classList.add('suoxiao');
                  }
                  var skinBg = document.getElementsByClassName('qh-page-skin');
                  if (skinBg.length) {
                    skinBg[0].classList.add('skinbgfangda');
                  }
                  if (this.isTouching) {
                    this.isTouching = false;
                    if (x && y) {
                      var slideX = x - this.mouseDownX;
                      this.tempoffset = this.offset + slideX;
                      if (this.tempoffset > 0) {
                        this.tempoffset = 0;
                      } else if (this.skinTotalWidth - this.visibleWidth() < -this.tempoffset) {
                        this.tempoffset = -(this.skinTotalWidth - this.visibleWidth());
                      }
                    }
                    this.cancelClick = Math.abs(this.offset - this.tempoffset) > 50;
                    this.content.style.left = Math.round(this.tempoffset) + "px";
                  } else {
                    this.cancelClick = false;
                  }
                  this.offset = this.tempoffset;
                  this.refresh();
                  this.previousX = this.mouseDownX;
                  this.previousY = this.mouseDownY;
                  delete this.mouseDownX;
                  delete this.mouseDownY;
                }
              };
              this.inited = true;
            }
          },
          config: {
            pageView: ui.create.div('.qh-page-config', shoushaBg),
            refresh: function (name, state) {
                            /* if (!this.inited)  */this.init(name, state);
              state.mainView.page.skin.refresh(name, state);
            },
            init: function (name, state) {
              if (!this.firstInit) this.innerConfig = ui.create.div('.qh-page-config-text', this.pageView);
              this.firstInit = true;
              ui.qhly_fixTextSize(this.innerConfig);
              var that = this;
              var content = "";
              if (lib.config.qhly_skinconfig) {
                content += "<h2><img src='" + lib.assetURL + get.qhly_getCurrentViewSkinValue('skinImage', 'extension/千幻聆音/image/newui_fav.png') + "' style='width:50px;margin-bottom:-4px;'/>皮肤设置</h2>";;
                content += "<p><span style='display:inline-block;height:30px;'><span id='qhconfig_checkbox_banInRandom_text' style='display:inline-block;position:relative;bottom:25%;'>随机切换禁用&nbsp;&nbsp;</span><img id='qhconfig_checkbox_banInRandom'/></span></p>";
                if (game.qhly_getSkin(name)) {
                  content += "<p><span style='display:inline-block;height:30px;'><span id='qhconfig_checkbox_dwflip_text' style='display:inline-block;position:relative;bottom:25%;'>出框翻转&nbsp;&nbsp;</span><img id='qhconfig_checkbox_dwflip'/></span></p>";
                  content += "<p><span style='display:inline-block;height:30px;'><span id='qhconfig_checkbox_changeSex_text' style='display:inline-block;position:relative;bottom:25%;'>性转皮肤&nbsp;&nbsp;</span><img id='qhconfig_checkbox_changeSex'/></span></p>";
                  content += "<p><span>皮肤品质&nbsp;&nbsp;</span><select style='font-size:22px;font-family:'qh_youyuan';' id='qhconfig_level_select'></select></p>";
                  content += "<p><span>皮肤顺序&nbsp;&nbsp;</span><select style='font-size:22px;font-family:'qh_youyuan';' id='qhconfig_order_select'></select></p>";
                }
                content += "<br><br>";
              }
              content += "<h2><img src='" + lib.assetURL + get.qhly_getCurrentViewSkinValue('favouriteImage', 'extension/千幻聆音/image/newui_fav.png') + "' style='width:50px;margin-bottom:-4px;'/>收藏设置</h2>";
              content += "<p>可以选择收藏此武将。进行自由选将操作时，可以更快找到此武将。</p>";
              content += "<p><span style='display:inline-block;height:30px;'><img id='qhconfig_checkbox_fav'/><span id='qhconfig_checkbox_text_fav' style='display:inline-block;position:relative;bottom:25%;'>收藏" + get.translation(name) + "</span></span></p>";

              var group = state.group, group1, group2;
              const groupList = ['jin', 'wei', 'shu', 'wu', 'qun', 'jin'];
              if (Array.isArray(group)) {
                group1 = group[0];
                group2 = group[1];
              } else if (lib.config.qhly_doubleGroup && lib.config.qhly_doubleGroup[name]) {
                group1 = lib.config.qhly_doubleGroup[name][0];
                group2 = lib.config.qhly_doubleGroup[name][1];
              } else if (get.is.double(name)) {
                var groupx = get.is.double(name, true);
                group1 = groupx[0];
                group2 = groupx[1];
              } else if (groupList.contains(group)) {
                group1 = group;
                group2 = groupList[groupList.indexOf(group) + 1];
              } else {
                group1 = 'jin';
                group2 = 'wei';
              }
              content += "<p><span style='display:inline-block;height:30px;'><img id='qhconfig_checkbox_doubleGroup'/><span id='qhconfig_checkbox_text_doubleGroup' style='display:inline-block;position:relative;bottom:25%;'>双势力</span></span></p>";
              content += "<p id='qhly_dgselect'>势力一：<input type='radio' name='group1' value='jin' id=qhly_dgselectjin1><label for='qhly_dgselectjin1'>晋  </label><input type='radio' name='group1' value='wei' id=qhly_dgselectwei1><label for='qhly_dgselectwei1'>魏  </label><input type='radio' name='group1' id=qhly_dgselectshu1 value='shu'><label for='qhly_dgselectshu1'>蜀  </label><input type='radio' id=qhly_dgselectwu1 name='group1' value='wu'><label for='qhly_dgselectwu1'>吴  </label><input type='radio' id=qhly_dgselectqun1 name='group1' value='qun' checked='true'><label for='qhly_dgselectqun1'>群  </label>"
              content += "<br>势力二：<input type='radio' name='group2' value='jin' id=qhly_dgselectjin2><label for='qhly_dgselectjin2'>晋  </label><input type='radio' name='group2' value='wei' id=qhly_dgselectwei2><label for='qhly_dgselectwei2'>魏  </label><input type='radio' name='group2' id=qhly_dgselectshu2 value='shu'><label for='qhly_dgselectshu2'>蜀  </label><input type='radio' id=qhly_dgselectwu2 name='group2' value='wu'><label for='qhly_dgselectwu2'>吴  </label><input type='radio' id=qhly_dgselectqun2 name='group2' value='qun'><label for='qhly_dgselectqun2'>群  </label></p>"

              content += "<h2><img src='" + lib.assetURL + get.qhly_getCurrentViewSkinValue('forbidImage', 'extension/千幻聆音/image/newui_forbid.png') + "' style='width:50px;margin-bottom:-4px;'/>禁用设置</h2>";
              content += "<p>可以选择在某模式下禁用或启用该武将。该设置将在重启游戏后生效。</p>"
              content += "<p><span style='display:inline-block;height:30px;'><img id='qhconfig_checkbox_banned_mode_all'/><span id='qhconfig_checkbox_text_all' style='display:inline-block;position:relative;bottom:25%;'>所有模式禁用</span></span></p>";
              for (var mode in lib.mode) {
                if (mode != 'connect') {
                  var translatemode = get.translation(mode);
                  if (mode == 'tafang') translatemode = '塔防';
                  else if (mode == 'chess') translatemode = '战棋';
                  content += "<p><span style='display:inline-block;height:30px;'><img id='qhconfig_checkbox_banned_mode_" + mode + "'/><span id='qhconfig_checkbox_text_" + mode + "' style='display:inline-block;position:relative;bottom:25%;'>" + translatemode + "模式禁用</span></span></p>";
                }
              }
              content += "<p><span style='display:inline-block;height:30px;'><img id='qhconfig_checkbox_banned_ai'/><span id='qhconfig_checkbox_text_ai' style='display:inline-block;position:relative;bottom:25%;'>仅自由选将可选</span></span></p>";

              content += "<h2><img src='" + lib.assetURL + get.qhly_getCurrentViewSkinValue('rankImage', 'extension/千幻聆音/image/newui_rank_icon.png') + "' style='width:50px;margin-bottom:-4px;'/>等阶设置</h2>";
              content += "<p>可以设置" + get.translation(name) + "的等阶，重启后生效。</p>";
              content += "<p><select style='font-size:22px;font-family:'qh_youyuan';' id='qhconfig_rank_select'></select></p>";

              if (lib.config.qhly_enableCharacterMusic) {
                content += "<h2><img src='" + lib.assetURL + get.qhly_getCurrentViewSkinValue('musicImage', 'extension/千幻聆音/image/newui_music_icon.png') + "' style='width:50px;margin-bottom:-4px;'/>音乐设置</h2>";
                content += "<p>可以设置" + get.translation(name) + "的专属背景音乐，在游戏开始时将自动切换。</p>";
                content += "<p><select style='font-size:22px;font-family:'qh_youyuan';' id='qhconfig_music_select'></select></p>";
              }
              var extraConfigs = [];
              if (state.pkg.characterConfigExtra) {
                var characterConfigExtra = state.pkg.characterConfigExtra(name);
                if (characterConfigExtra) {
                  for (var extc of characterConfigExtra) {
                    var extobj = game.qhly_parseConfig(extc);
                    content += extobj.content;
                    extraConfigs.push(extobj);
                  }
                }
              }
              content += "<br><br><br><br><br><br>";
              this.innerConfig.innerHTML = content;
              for (var extraConfig of extraConfigs) {
                if (extraConfig.onfinish) {
                  extraConfig.onfinish(this.innerConfig);
                }
              }
              var bindFunc = function (checkbox, text, forbid) {
                if (!text) return;
                ui.qhly_addListenFunc(text);
                text.listen(function () {
                  if (forbid) return;
                  game.qhly_playQhlyAudio('qhly_voc_check', null, true);
                  checkbox.qhly_setChecked(!checkbox.qhly_checked, true);
                });
              };
              if (game.qhly_getSkin(name)) {
                var dwflip = document.getElementById('qhconfig_checkbox_dwflip');
                if (dwflip) {
                  ui.qhly_initCheckBox(dwflip, lib.config.qhly_shoushaBigFlip[name][game.qhly_getSkin(name)]);
                  bindFunc(dwflip, document.getElementById('qhconfig_checkbox_dwflip_text'));
                  dwflip.qhly_onchecked = function (check) {
                    if (!check) {
                      if (lib.config.qhly_shoushaBigFlip[name][game.qhly_getSkin(name)]) {
                        lib.config.qhly_shoushaBigFlip[name][game.qhly_getSkin(name)] = false;
                      }
                    } else {
                      lib.config.qhly_shoushaBigFlip[name][game.qhly_getSkin(name)] = true;
                    }
                    game.saveConfig('qhly_shoushaBigFlip', lib.config.qhly_shoushaBigFlip);
                  };
                }
                var changeSex = document.getElementById('qhconfig_checkbox_changeSex');
                if (!lib.config.qhly_changeSex[name]) lib.config.qhly_changeSex[name] = {};
                if (changeSex) {
                  ui.qhly_initCheckBox(changeSex, lib.config.qhly_changeSex[name][game.qhly_getSkin(name)]);
                  bindFunc(changeSex, document.getElementById('qhconfig_checkbox_changeSex_text'));
                  changeSex.qhly_onchecked = function (check) {
                    if (!check) {
                      if (lib.config.qhly_changeSex && lib.config.qhly_changeSex[name] && lib.config.qhly_changeSex[name][game.qhly_getSkin(name)]) {
                        lib.config.qhly_changeSex[name][game.qhly_getSkin(name)] = false;
                      }
                    } else {
                      if (!lib.config.qhly_changeSex[name]) {
                        lib.config.qhly_changeSex[name] = {};
                      }
                      lib.config.qhly_changeSex[name][game.qhly_getSkin(name)] = true;
                    }
                    game.saveConfig('qhly_changeSex', lib.config.qhly_changeSex);
                  };
                }
              }
              var checkboxFav = document.getElementById('qhconfig_checkbox_fav');
              ui.qhly_initCheckBox(checkboxFav, lib.config.favouriteCharacter && lib.config.favouriteCharacter.contains(name));
              bindFunc(checkboxFav, document.getElementById('qhconfig_checkbox_text_fav'));
              checkboxFav.qhly_onchecked = function (check) {
                if (!check) {
                  if (lib.config.favouriteCharacter && lib.config.favouriteCharacter.contains(name)) {
                    lib.config.favouriteCharacter.remove(name);
                  }
                } else {
                  if (!lib.config.favouriteCharacter) {
                    lib.config.favouriteCharacter = [name];
                  } else {
                    lib.config.favouriteCharacter.add(name);
                  }
                }
                game.saveConfig('favouriteCharacter', lib.config.favouriteCharacter);
              };
              var checkboxdG = document.getElementById('qhconfig_checkbox_doubleGroup');
              var dgselect = document.getElementById('qhly_dgselect');
              if ((!lib.config.doubleGroupCharacter || lib.config.doubleGroupCharacter && !lib.config.doubleGroupCharacter.contains(name)) || get.is.double(name)) dgselect.classList.add('selectless');
              ui.qhly_initCheckBox(checkboxdG, lib.config.doubleGroupCharacter && lib.config.doubleGroupCharacter.contains(name) || get.is.double(name), get.is.double(name));
              bindFunc(checkboxdG, document.getElementById('qhconfig_checkbox_text_doubleGroup'), get.is.double(name));
              checkboxdG.qhly_onchecked = function (check) {
                if (!check) {
                  if (lib.config.doubleGroupCharacter && lib.config.doubleGroupCharacter.contains(name) && !get.is.double(name)) {
                    lib.config.doubleGroupCharacter.remove(name);
                    dgselect.classList.add('selectless');
                  }
                } else if (!get.is.double(name)) {
                  if (!lib.config.doubleGroupCharacter) {
                    lib.config.doubleGroupCharacter = [name];
                  } else {
                    lib.config.doubleGroupCharacter.add(name);
                  }
                  dgselect.classList.remove('selectless');
                }
                game.saveConfig('doubleGroupCharacter', lib.config.doubleGroupCharacter);
                game.qhly_setDoubleGroup(state);
              };
              var groupselcet1 = document.getElementById('qhly_dgselect' + group1 + '1');
              var groupselcet2 = document.getElementById('qhly_dgselect' + group2 + '2');
              if (groupselcet1) {
                groupselcet1.setAttribute('checked', true);
                if (document.getElementById('qhly_dgselect' + group1 + '2')) document.getElementById('qhly_dgselect' + group1 + '2').disabled = true;
              }
              else if (document.getElementById('qhly_dgselectwei1')) {
                document.getElementById('qhly_dgselectwei1').setAttribute('checked', true);
                if (document.getElementById('qhly_dgselectwei2')) document.getElementById('qhly_dgselectwei2').disabled = true;
              }
              if (groupselcet2) {
                groupselcet2.setAttribute('checked', true);
                if (document.getElementById('qhly_dgselect' + group2 + '1')) document.getElementById('qhly_dgselect' + group2 + '1').disabled = true;
              }
              else if (document.getElementById('qhly_dgselectshu2')) {
                document.getElementById('qhly_dgselectshu2').setAttribute('checked', true);
                if (document.getElementById('qhly_dgselectshu1')) document.getElementById('qhly_dgselectshu1').disabled = true;
              }
              let groups1 = document.getElementsByName('group1');
              if (groups1.length) groups1.forEach(v => {
                v.addEventListener('change', function () {
                  group1 = this.value;
                  if (group1 == 'key') {
                    group2 = 'shen';
                  } else if (group2 == 'shen') {
                    group2 = groupList[groupList.indexOf(group1) + 1];
                  }
                  document.getElementById('qhly_dgselect' + group2 + '2').setAttribute('checked', true);
                  document.getElementsByName('group2').forEach(l => l.disabled = false);
                  if (document.querySelector('#qhly_dgselect' + this.value + '2')) document.querySelector('#qhly_dgselect' + this.value + '2').disabled = true;
                  lib.config.qhly_doubleGroup[name] = [group1, group2];
                  game.saveConfig('qhly_doubleGroup', lib.config.qhly_doubleGroup);
                  game.qhly_setDoubleGroup(state);
                })
              })
              let groups2 = document.getElementsByName('group2');
              if (groups2.length) groups2.forEach(v => {
                v.addEventListener('change', function () {
                  group2 = this.value;
                  if (group2 == 'shen') {
                    group1 = 'key';
                  } else if (group1 == 'key') {
                    group1 = groupList[groupList.indexOf(group2) + 1];
                  }
                  document.getElementById('qhly_dgselect' + group1 + '1').setAttribute('checked', true);
                  document.getElementsByName('group1').forEach(l => l.disabled = false);
                  if (document.querySelector('#qhly_dgselect' + this.value + '1')) document.querySelector('#qhly_dgselect' + this.value + '1').disabled = true;
                  lib.config.qhly_doubleGroup[name] = [group1, group2];
                  game.saveConfig('qhly_doubleGroup', lib.config.qhly_doubleGroup);
                  game.qhly_setDoubleGroup(state);
                })
              })

              var checkboxAll = document.getElementById('qhconfig_checkbox_banned_mode_all');
              var allForbid = true;
              for (var mode in lib.mode) {
                if (mode != 'connect') {
                  if (lib.config[mode + '_banned'] && lib.config[mode + '_banned'].contains(mode)) {
                    continue;
                  }
                  allForbid = false;
                  break;
                }
              }

              ui.qhly_initCheckBox(checkboxAll, allForbid);
              bindFunc(checkboxAll, document.getElementById('qhconfig_checkbox_text_all'));
              checkboxAll.qhly_onchecked = function (check) {
                if (check) {
                  for (var mode in lib.mode) {
                    if (mode == 'connect') continue;
                    if (that['banned_checkbox_mode_' + mode]) {
                      that['banned_checkbox_mode_' + mode].qhly_setChecked(true, true);
                    }
                  }
                } else {
                  for (var mode in lib.mode) {
                    if (mode == 'connect') continue;
                    if (that['banned_checkbox_mode_' + mode]) {
                      that['banned_checkbox_mode_' + mode].qhly_setChecked(false, true);
                    }
                  }
                }
              };
              this.banned_checkbox_mode_all = checkboxAll;
              var checkboxBanai = document.getElementById('qhconfig_checkbox_banned_ai');

              ui.qhly_initCheckBox(checkboxBanai, game.qhly_isForbidAI(name));

              bindFunc(checkboxBanai, document.getElementById('qhconfig_checkbox_text_ai'));
              checkboxBanai.qhly_onchecked = function (check) {
                if (check) {
                  game.qhly_setForbidAI(name, true);
                } else {
                  game.qhly_setForbidAI(name, false);
                }
              };
              for (var mode in lib.mode) {
                if (mode != 'connect') {
                  var checkbox = document.getElementById('qhconfig_checkbox_banned_mode_' + mode);
                  this['banned_checkbox_mode_' + mode] = checkbox;
                  if (checkbox) {
                    ui.qhly_initCheckBox(checkbox, lib.config[mode + '_banned'] && lib.config[mode + '_banned'].contains(name));
                    bindFunc(checkbox, document.getElementById('qhconfig_checkbox_text_' + mode));
                    (function (mode) {
                      checkbox.qhly_onchecked = function (checked) {
                        if (!checked) {
                          that.banned_checkbox_mode_all.qhly_setChecked(false, true);
                          if (lib.config[mode + '_banned'] && lib.config[mode + '_banned'].contains(name)) {
                            lib.config[mode + '_banned'].remove(name);
                          }
                        } else {
                          if (lib.config[mode + '_banned']) {
                            lib.config[mode + '_banned'].add(name);
                          } else {
                            lib.config[mode + '_banned'] = [name];
                          }
                        }
                        game.saveConfig(mode + '_banned', lib.config[mode + '_banned']);
                      };
                    })(mode);
                  }
                }
              }
              lib.setScroll(this.innerConfig);
              game.qhly_changeViewPageSkin('config', this.pageView);
              var rankSelect = document.getElementById('qhconfig_rank_select');
              var rankList = ['默认', '普通', '史诗', '传说', '稀有', '精品'];
              var rankToEng = {
                '默认': "default",
                '普通': 'common',
                '史诗': "epic",
                '传说': "legend",
                '稀有': 'rare',
                '精品': "junk",
              };
              /* var rankToIcon = {
                  '默认': "",
                  '稀有': 'A+',
                  '史诗': "SS",
                  '传说': "SSS",
                  '精品': 'S',
                  '精良': "A",
              }; */
              var rank = null;
              if (lib.config.qhly_rarity && lib.config.qhly_rarity[name]) {
                rank = lib.config.qhly_rarity[name];
              }
              for (var r of rankList) {
                var opt = document.createElement('option');
                opt.innerHTML = r;
                opt.setAttribute('rank', rankToEng[r]);
                if (!rank && r == '默认') {
                  opt.selected = 'selected';
                } else if (rankToEng[r] == rank) {
                  opt.selected = 'selected';
                }
                rankSelect.appendChild(opt);
              }
              rankSelect.onchange = function (e) {
                var event = e ? e : window.event;
                if (event.target) {
                  var target = event.target;
                  var opt = target[target.selectedIndex];
                  if (opt) {
                    var rank = opt.getAttribute('rank');
                    if (!lib.config.qhly_rarity) {
                      lib.config.qhly_rarity = {};
                    }
                    if (rank == 'default') {
                      if (lib.config.qhly_rarity[name]) {
                        delete lib.config.qhly_rarity[name];
                      }
                    } else {
                      lib.config.qhly_rarity[name] = rank;
                    }
                    game.saveConfig('qhly_rarity', lib.config.qhly_rarity);
                  }
                }
                refreshRank();
              };
              if (lib.config.qhly_enableCharacterMusic) {
                var select = document.getElementById('qhconfig_music_select');
                var currentMusic = game.qhly_getCharacterMusic(name);
                var opt = document.createElement('option');
                opt.innerHTML = "无";
                opt.setAttribute('musicpath', '');
                if (!currentMusic) {
                  opt.selected = 'selected';
                }
                select.appendChild(opt);
                for (var p in lib.qhlyMusic) {
                  var opt = document.createElement('option');
                  opt.innerHTML = lib.qhlyMusic[p].name;
                  opt.setAttribute('musicpath', p);
                  if (currentMusic == p) {
                    opt.selected = 'selected';
                  }
                  select.appendChild(opt);
                }
                select.onchange = function (e) {
                  var event = e ? e : window.event;
                  if (event.target) {
                    var target = event.target;
                    var opt = target[target.selectedIndex];
                    if (opt) {
                      var path = opt.getAttribute('musicpath');
                      if (path) {
                        lib.config.qhly_characterMusic[name] = path;
                      } else {
                        delete lib.config.qhly_characterMusic[name];
                      }
                      game.saveConfig('qhly_characterMusic', lib.config.qhly_characterMusic);
                      game.qhly_switchBgm();
                    }
                  }
                };
              }
              this.inited = true;
            }
          }
        };
        //subView.pageButton[page].setBackgroundImage(get.qhly_getIf(currentViewSkin.buttonPressedImage, 'extension/千幻聆音/newui_button_selected.png'));
        //view.appendChild(subView.mp);
        var state = {
          name: name,
          currentPage: page,
          skinScrollIndex: 0,
          pkg: game.qhly_foundPackage(name),
          intro: get.character(name),
          mainView: subView,
        };
        subView.menuCover.listen(function (current) {
          if (state.extraMenu) {
            state.extraMenu.delete();
            delete state.extraMenu;
          }
          view.removeChild(subView.menuCover);
        });
        refreshRank = function () {
          if (subView.rank) {
            if (lib.config.qhly_showrarity && game.qhly_getSkin(state.name) == null) {
              subView.rank.show();
              subView.skinRank.hide();
              var rarity = game.getRarity(state.name);
              if (rarity) {
                subView.rank.setBackgroundImage('extension/千幻聆音/image/rarity_' + game.getRarity(state.name) + '.png');
              }
            } else {
              subView.rank.hide();
            }
          }
          if (subView.skinRank) {
            if (game.qhly_getSkin(state.name)) {
              subView.rank.hide();
              subView.skinRank.show();
              subView.skinRank.setBackgroundImage('extension/千幻聆音/image/' + game.qhly_getSkinLevel(state.name, game.qhly_getSkin(state.name)) + '.png');
            } else {
              subView.skinRank.hide();
            }
          }
        };
        var showPage = function (pagename) {
          var tpage = subView.page[pagename];
          subView.currentPage = pagename;
          state.currentPage = pagename;
          if (tpage) {
            tpage.refresh(name, state);
          }
          //state.useLihuiLayout(state.useLihui());
          for (var p in subView.page) {
            if (p == pagename) {
              subView.page[p].pageView.show();
            } else if (p != 'skin') {
              subView.page[p].pageView.hide();
            }
          }
          for (var k in subView.pageButton) {
            if (k == pagename) {
              subView.pageButton[k].classList.add('sel');
            } else {
              subView.pageButton[k].classList.remove('sel');
            }
          }
        };
        state.useLihui = function () {
          return false;
        };
        for (var k in subView.pageButton) {
          (function (m) {
            subView.pageButton[m].listen(function () {
              if (subView.currentPage != m) {
                document.getElementsByClassName('qh-otherinfoarrow')[0].classList.remove('sel');
                showPage(m);
                if (state.extraMenu) {
                  state.extraMenu.delete();
                  delete state.extraMenu;
                }
                game.qhly_playQhlyAudio('qhly_voc_dec_press', null, true);
              } else if (m == 'introduce') {
                if (state.extraMenu) {
                  state.extraMenu.delete();
                  document.getElementsByClassName('qh-otherinfoarrow')[0].classList.remove('sel');
                  delete state.extraMenu;
                } else {
                  document.getElementsByClassName('qh-otherinfoarrow')[0].classList.add('sel');
                  var extra = game.qhly_getIntroduceExtraPage(name, state.pkg);
                  if (extra) {
                    game.qhly_playQhlyAudio('qhly_voc_click2', null, true);
                    var arr = [{
                      name: '简介',
                      onchange: function () {
                        document.getElementsByClassName('qh-otherinfoarrow')[0].classList.remove('sel');
                        state.introduceExtraPage = "简介";
                        subView.page.introduce.refresh(name, state);
                        if (state.extraMenu) {
                          state.extraMenu.delete();
                          delete state.extraMenu;
                          view.removeChild(subView.menuCover);
                        }
                      }
                    }];
                    for (var obj of extra) {
                      (function (obj) {
                        arr.push({
                          name: obj.name,
                          onchange: function () {
                            document.getElementsByClassName('qh-otherinfoarrow')[0].classList.remove('sel');
                            state.introduceExtraPage = obj.name;
                            if (obj.qh_func) {
                              state.introduceExtraFunc = game[obj.qh_func];
                            } else {
                              state.introduceExtraFunc = obj.func;
                            }
                            subView.page.introduce.refresh(name, state);
                            if (state.extraMenu) {
                              state.extraMenu.delete();
                              delete state.extraMenu;
                              view.removeChild(subView.menuCover);
                            }
                          }
                        });
                      })(obj);
                    }
                    state.extraMenu = game.qhly_createBelowMenu(arr, view);
                    view.appendChild(subView.menuCover);
                  }
                }
              }
            });
          })(k);
        }
        var refreshView = function (state, subView) {
          if (state.pkg.isLutou || lib.config.qhly_lutou) {
            subView.avatarImage.classList.remove('qh-image-standard');
            subView.avatarImage.classList.add('qh-image-lutou');
            /*if(lib.config.extension_千幻聆音_lutouFixx&&lib.config.extension_千幻聆音_lutouFixx=='all') {
                subView.avatarImage.style.height='106%';
                subView.avatarImage.style.backgroundPosition='center top';
            }*/
          } else {
            subView.avatarImage.classList.remove('qh-image-lutou');
            subView.avatarImage.classList.add('qh-image-standard');
          }
          //创造形象
          //subView.avatarImage.setBackground(name, 'character', undefined, undefined, true);
          game.qhly_setOriginSkin(name, game.qhly_getSkin(name), state.mainView.avatarImage, state, game.qhly_getPlayerStatus(state.mainView.avatarImage, null, state.name) == 2);
          if(lib.config.extension_千幻聆音_lvjingFixx&&!state.mainView.avatarImage.BlurImage&&lib.config.extension_千幻聆音_lutouFixx!='yuanhua') {
              state.mainView.avatarImage.BlurImage=ui.create.div();
              game.qhly_setOriginSkin(name, game.qhly_getSkin(name), state.mainView.avatarImage.BlurImage, state, game.qhly_getPlayerStatus(state.mainView.avatarImage.BlurImage, null, state.name) == 2, true);
              state.mainView.avatarImage.BlurImage.style.width='100%';
              state.mainView.avatarImage.BlurImage.style.height='100%';
              state.mainView.avatarImage.BlurImage.style.backgroundPosition='center';
              /*if(lib.config.extension_千幻聆音_lutouFixx&&lib.config.extension_千幻聆音_lutouFixx!='off') {
                  state.mainView.avatarImage.BlurImage.style.backgroundPosition='center top';
              }*/
              state.mainView.avatarImage.BlurImage.style.filter='blur(2px) contrast(110%)';
              state.mainView.avatarImage.BlurImage.style.opacity=0.6;
              state.mainView.avatarImage.BlurImage.style.transition='all 0.5s ease';
              state.mainView.avatarImage.appendChild(state.mainView.avatarImage.BlurImage);
          }
          if(lib.config.extension_千幻聆音_lutouFixx&&lib.config.extension_千幻聆音_lutouFixx=='all'&&subView.avatarImage.classList.contains('qh-image-lutou')) {
            subView.avatarImage.classList.add('qh_lutou_refreshview');
          }else {
            subView.avatarImage.classList.remove('qh_lutou_refreshview');
          }
          state.onChangeSkin = function () {
            if (!subView.characterTitle) return;
            var ctitle;
            if (state.pkg && state.pkg.characterTitle) {
              ctitle = state.pkg.characterTitle(name);
              if (ctitle && ctitle[0] === '#' && ctitle.length >= 2) {
                switch (ctitle[1]) {
                  case 'r':
                    subView.characterTitle.style.color = 'red';
                    break;
                  case 'g':
                    subView.characterTitle.style.color = 'green';
                    break;
                  case 'p':
                    subView.characterTitle.style.color = 'legend';
                    break;
                  case 'b':
                    subView.characterTitle.style.color = 'blue';
                    break;
                }
                ctitle = ctitle.slice(2);
              }
            } else if (subView.characterTitle && lib.characterTitle[name]) {
              ctitle = lib.characterTitle[name];
              if (ctitle && ctitle[0] === '#' && ctitle.length >= 2) {
                switch (ctitle[1]) {
                  case 'r':
                    subView.characterTitle.style.color = 'red';
                    break;
                  case 'g':
                    subView.characterTitle.style.color = 'green';
                    break;
                  case 'p':
                    subView.characterTitle.style.color = 'legend';
                    break;
                  case 'b':
                    subView.characterTitle.style.color = 'blue';
                    break;
                }
                ctitle = ctitle.slice(2);
              }
            }
            subView.characterTitle.innerHTML = get.qhly_verticalStr(lib.qhly_filterPlainText(ctitle));
          };
          state.onChangeSkin();
          game.qhly_setDoubleGroup(state);
          refreshRank();
          var chname;
          if (state.pkg.characterNameTranslate) {
            chname = state.pkg.characterNameTranslate(state.name);
          } else {
            chname = get.translation(state.name);
            if (!chname) {
              if (state.name.indexOf("gz_") == 0) {
                chname = get.translation(state.name.silce(3));
              }
            }
            if (!chname) {
              chname = "未命名武将";
            }
          }
          if (game.qhly_getIntroduceExtraPage(name, state.pkg)) {
            subView.pageButton.introduce.downButton.show();
          } else {
            subView.pageButton.introduce.downButton.hide();
          }
          var vname = get.qhly_verticalStr(chname);
          var reg = new RegExp('<br>', 'g');
          var cleanName = vname.replace(reg, '');
          //有新版函数了不需要你了
          const prefixList = ['SP', 'OL', 'TW'];
          if(lib.config.prefixname_highlight) {
            var isArr=function(s) {
                // 判断是否是大写字母
                if (s >= 'A' && s <= 'Z') {
                    return true;
                }
            
                // 判断是否是小写字母
                if (s >= 'a' && s <= 'z') {
                    return true;
                }
            
                // 判断是否是数字
                if (s >= '0' && s <= '9') {
                    return true;
                }
                
                return false;
            };
            if(get.prefixNameConfig(state.name,'unsave')) {
                var prefixs=get.prefixNameConfig(state.name,'unsave');
                if(chname.indexOf(prefixs)==0) {
                    vname = '';
                    for(var i=0;i<prefixs.length;i++) {
                        if(isArr(prefixs[i])) {
                            var danc=prefixs[i];
                            for(var c=i+1;c<prefixs.length;c++) {
                                if(isArr(prefixs[c])) {
                                    danc+=prefixs[c];
                                    i++;
                                }else {
                                    break;
                                }
                            }
                            vname += '<span style="font-weight: bold;">'+danc+'</span>';
                            continue;
                        }
                        vname += '<span style="font-weight: bold;">'+prefixs[i]+'</span>';
                    }
                    vname += get.qhly_verticalStr(chname.slice(prefixs.length));
                }
            }
            cleanName = vname.replace(reg, '');
          }else {
              for (var i of prefixList) {
                let k = cleanName.indexOf(i);
                if (k > -1) {
                  for (var j = 0; j < cleanName.length; j++) {
                    if (j - 1 == k) continue;
                    if (j == k) {
                      let preName = ui.create.div('.qh-shoushaName-pre', subView.name);
                      preName.style.backgroundImage = `url('${lib.qhly_path}theme/shousha/chr_name_${i}.png')`;
                    }
                    else ui.create.div('.qh-shoushaName-other', subView.name, cleanName.charAt(j));
                  }
                }
              }
          }
          if (subView.name.innerText == '') {
            subView.name.innerHTML = vname;
            subView.name.style.cssText += 'filter:drop-shadow(1px 0 0 rgb(36, 35, 35)) drop-shadow(-1px 0 0 rgb(36, 35, 35)) drop-shadow(0 1px 0 rgb(36, 35, 35)) drop-shadow(0 -1px 0 rgb(36, 35, 35));';
          }
          var hp = state.intro[2];
          game.qhly_refreshSShp(state);
          /* if (typeof hp == 'number' && !isFinite(hp)) {
              hp = '∞';
          }*/
          if (get.infoHujia(hp)) {
            var hujiaNode = ui.create.div('.qh-hujianode', subView.hp);
            hujiaNode.innerHTML = get.infoHujia(hp);
          }
          var mp = get.qhly_getMp(state.name, state.pkg);
          if (mp) {
            var mpNode = ui.create.div('.qh-mpnode', subView.hp);
            mpNode.innerHTML = mp;
          }
        };
        refreshView(state, subView);
        game.qhly_changeViewSkin(subView);
        showPage('skill');
        showPage('config');
        showPage('skin');
        showPage(page);
        game.qhly_syncChangeSkinButton(name, game.qhly_getSkin(name), state);
      };
});